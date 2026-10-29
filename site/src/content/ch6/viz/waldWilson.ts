import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, el } from '../../../core/ui'
import { plot, lineTrace, hline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, binomial } from '../../../sim/rng'
import { normalQuantile, binomialPmf, linspace } from '../../../sim/stats'

type Method = 'wald' | 'wilson' | 'arcsin'

function ic(k: number, n: number, z: number, method: Method): [number, number] {
  const p = k / n
  if (method === 'wald') {
    const h = (z * Math.sqrt(p * (1 - p))) / Math.sqrt(n)
    return [p - h, p + h]
  }
  if (method === 'wilson') {
    const c = p + (z * z) / (2 * n)
    const h = z * Math.sqrt((p * (1 - p)) / n + (z * z) / (4 * n * n))
    const d = 1 + (z * z) / n
    return [Math.max(0, (c - h) / d), Math.min(1, (c + h) / d)]
  }
  // stabilisation de la variance : arcsin(sqrt(.)), variance 1/4 (Ex. 1.13)
  const a = Math.asin(Math.sqrt(p))
  const lo = Math.min(Math.PI / 2, Math.max(0, a - z / (2 * Math.sqrt(n))))
  const hi = Math.min(Math.PI / 2, Math.max(0, a + z / (2 * Math.sqrt(n))))
  return [Math.sin(lo) ** 2, Math.sin(hi) ** 2]
}

/** Couverture exacte (calcul binomial) de l'IC en fonction de theta. */
function exactCoverage(theta: number, n: number, z: number, method: Method): number {
  let c = 0
  for (let k = 0; k <= n; k++) {
    const [a, b] = ic(k, n, z, method)
    if (a <= theta && theta <= b) c += binomialPmf(k, n, theta)
  }
  return c
}

/** Trois IC pour une proportion : Wald, Wilson, arcsin ; 50 intervalles + couverture exacte. */
export const vizWaldWilson: Viz = {
  id: 'ch6-wald-wilson',
  title: 'Proportion : intervalles de Wald, de Wilson et par stabilisation de la variance',
  description:
    'Modèle de Bernoulli. À gauche : cinquante intervalles de niveau asymptotique $1-\\alpha$ (comme les Figures 3–4 du poly), rouges s’ils ratent $\\theta$. À droite : la **probabilité de couverture exacte** $\\theta\\mapsto\\sum_k\\binom nk\\theta^k(1-\\theta)^{n-k}\\mathbb{1}\\{\\theta\\in\\mathcal{C}_n(k)\\}$ des trois intervalles pour le $n$ courant. Curseurs $\\theta$, $n$, $1-\\alpha$. Près de $0$, l’intervalle de Wald s’effondre ($\\bar X_n=0$ donne l’intervalle $\\{0\\}$) alors que Wilson reste proche du niveau.',
  source: 'Poly ch.6, Ex. 1.11 (Wilson), Ex. 1.12 (Wald), Ex. 1.13 (arcsin) ; Compléments §4.4, Figures 3–4',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    const left = el('div')
    const right = el('div')
    left.style.minHeight = '320px'
    right.style.minHeight = '320px'
    plotEl.style.display = 'grid'
    plotEl.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))'
    plotEl.style.gap = '8px'
    plotEl.append(left, right)
    const hLeft = plot(left, [], {})
    const hRight = plot(right, [], {})
    let theta = 0.025
    let n = 100
    let level = 0.95
    let method: Method = 'wald'
    let seed = 21

    const draw = () => {
      const z = normalQuantile(1 - (1 - level) / 2)
      const rng = makeRng(6000 + seed)
      const xsOk: (number | null)[] = []
      const ysOk: (number | null)[] = []
      const xsKo: (number | null)[] = []
      const ysKo: (number | null)[] = []
      let covered = 0
      let degenerate = 0
      for (let j = 0; j < 50; j++) {
        const k = binomial(rng, n, theta)
        const [a, b] = ic(k, n, z, method)
        const ok = a <= theta && theta <= b
        if (ok) covered++
        if (k === 0 || k === n) degenerate++
        ;(ok ? xsOk : xsKo).push(j + 1, j + 1, null)
        ;(ok ? ysOk : ysKo).push(a, b, null)
      }
      const name = method === 'wald' ? 'Wald' : method === 'wilson' ? 'Wilson' : 'arcsin'
      hLeft.update(
        [
          { x: xsOk, y: ysOk, type: 'scatter', mode: 'lines', name: `contient θ (${covered})`, line: { color: COLORS.green, width: 2 } },
          { x: xsKo, y: ysKo, type: 'scatter', mode: 'lines', name: `rate θ (${50 - covered})`, line: { color: COLORS.red, width: 2.5 } },
        ],
        { title: `50 intervalles de ${name}, θ = ${theta}, n = ${n}`, xaxis: { title: 'échantillon n°' }, yaxis: { title: 'intervalle', range: [Math.min(-0.02, theta - 0.15), Math.max(0.2, theta + 0.15)] }, shapes: [hline(theta, COLORS.gray, 'dash')] },
      )
      const grid = linspace(0.005, 0.5, 120)
      const covW = grid.map((t) => exactCoverage(t, n, z, 'wald'))
      const covS = grid.map((t) => exactCoverage(t, n, z, 'wilson'))
      const covA = grid.map((t) => exactCoverage(t, n, z, 'arcsin'))
      hRight.update(
        [lineTrace(grid, covW, 'Wald (Ex. 1.12)', COLORS.red), lineTrace(grid, covS, 'Wilson (Ex. 1.11)', COLORS.blue), lineTrace(grid, covA, 'arcsin (Ex. 1.13)', COLORS.green)],
        { title: `Couverture exacte en fonction de θ, n = ${n}`, xaxis: { title: 'θ' }, yaxis: { title: 'P(θ ∈ Cₙ)', range: [0.5, 1.02] }, shapes: [hline(level, COLORS.gray, 'dash'), { type: 'line', x0: theta, x1: theta, y0: 0, y1: 1, yref: 'paper', line: { color: COLORS.gray, width: 1, dash: 'dot' } }] },
      )
      const cw = exactCoverage(theta, n, z, 'wald')
      const cs = exactCoverage(theta, n, z, 'wilson')
      const ca = exactCoverage(theta, n, z, 'arcsin')
      const p0 = Math.pow(1 - theta, n)
      info.innerHTML = richToHtml(
        `**Même niveau asymptotique $1-\\alpha=${level.toFixed(2)}$, couvertures réelles différentes à $n=${n}$, $\\theta=${theta}$** : Wald ${(100 * cw).toFixed(1)} %, Wilson ${(100 * cs).toFixed(1)} %, arcsin ${(100 * ca).toFixed(1)} %. Les trois viennent du même pivot (5) $\\sqrt n(\\bar X_n-\\theta)/\\sqrt{\\theta(1-\\theta)}\\Rightarrow\\mathcal{N}(0,1)$ : Wilson **résout** l’inégalité en $\\theta$ (trinôme), Wald remplace $\\theta(1-\\theta)$ par $\\bar X_n(1-\\bar X_n)$ (Slutsky), arcsin stabilise la variance par la méthode-δ ($g(\\theta)=\\arcsin\\sqrt\\theta$, variance $1/4$). Probabilité que $\\bar X_n=0$ : $(1-\\theta)^n=${p0.toFixed(3)}$ ; dans ce cas l’intervalle de Wald est réduit à $\\{0\\}$ et rate $\\theta$ (${degenerate} échantillon(s) dégénéré(s) parmi les 50). L’explication (Compléments §4.4) : l’approximation gaussienne de la binomiale est mauvaise près de $0$ (constante de Berry-Esseen $\\to\\infty$), et Wald ajoute l’erreur d’estimation de la variance.`,
      )
    }

    controls.append(
      segmented<Method>(
        [
          { value: 'wald', label: 'Wald' },
          { value: 'wilson', label: 'Wilson' },
          { value: 'arcsin', label: 'arcsin (stab. variance)' },
        ],
        method,
        (v) => {
          method = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$\\theta$',
        min: 0.005,
        max: 0.5,
        step: 0.005,
        value: theta,
        format: (v) => v.toFixed(3),
        onChange: (v) => {
          theta = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$n$',
        min: 10,
        max: 500,
        step: 10,
        value: n,
        onChange: (v) => {
          n = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$1-\\alpha$',
        min: 0.8,
        max: 0.99,
        step: 0.01,
        value: level,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          level = v
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer 50 échantillons', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
