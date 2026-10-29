import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, barTrace, lineTrace, pointsTrace, hline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, binomial, poisson } from '../../../sim/rng'
import { binomialPmf, poissonPmf } from '../../../sim/stats'

type Law = 'bin' | 'pois'

interface Setup {
  pmf: number[]
  d: number
  gamma: number
  pGreater: number
  pEq: number
}

/** d = inf{c : P(T > c) <= alpha}, gamma = (alpha - P(T > d)) / P(T = d). */
function construct(pmf: number[], alpha: number): Setup {
  const surv: number[] = new Array(pmf.length)
  let acc = 0
  for (let k = pmf.length - 1; k >= 0; k--) {
    surv[k] = acc // P(T > k)
    acc += pmf[k]
  }
  let d = 0
  while (d < pmf.length - 1 && surv[d] > alpha) d++
  const pEq = pmf[d]
  const gamma = pEq > 0 ? Math.min(1, Math.max(0, (alpha - surv[d]) / pEq)) : 0
  return { pmf, d, gamma, pGreater: surv[d], pEq }
}

/** Test randomisé dans un modèle discret : construction de (d_α, γ_α) et taille exacte α (Th. 4.1, Ex. 4.1–4.2). */
export const vizRandomise: Viz = {
  id: 'ch5-randomise',
  title: 'Test randomisé : atteindre la taille exacte α avec une statistique discrète',
  description:
    'Test unilatéral à droite sur $T=\\sum_iX_i$ dans le modèle de Bernoulli ($T\\sim\\mathrm{Bin}(n,\\theta_0)$ sous $H_0$) ou de Poisson ($T\\sim\\mathrm{Poi}(n\\theta_0)$). À gauche : loi de $T$ sous $H_0$ ; rouge = rejet ($T>d_\\alpha$), orange = rejet avec probabilité $\\gamma_\\alpha$ ($T=d_\\alpha$), gris = non-rejet. À droite : fonction de survie $c\\mapsto\\mathbb{P}_{\\theta_0}(T>c)$ en escalier : $\\alpha$ tombe dans un saut, et $\\gamma_\\alpha$ « coupe le pixel » pour atteindre exactement $\\alpha$. Curseurs $n$, $\\theta_0$, $\\alpha$ ; préréglages des exemples du poly ; boutons de simulation.',
  source: 'Poly ch.5, Compléments, Déf. 4.1, Th. 4.1, Ex. 4.1 (Poisson), Ex. 4.2 (sondage) ; PC4 Ex. 4 ; PC5 Ex. 6',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    let law: Law = 'pois'
    let n = 100
    let theta0 = 0.01
    let alpha = 0.05
    let seed = 1
    let sim = ''

    const pmfOf = (): number[] => {
      if (law === 'bin') return Array.from({ length: n + 1 }, (_, k) => binomialPmf(k, n, theta0))
      const lam = n * theta0
      const kmax = Math.ceil(lam + 10 * Math.sqrt(lam) + 10)
      return Array.from({ length: kmax + 1 }, (_, k) => poissonPmf(k, lam))
    }

    const draw = () => {
      const S = construct(pmfOf(), alpha)
      const { pmf, d, gamma } = S
      const mean = law === 'bin' ? n * theta0 : n * theta0
      const sd = Math.sqrt(law === 'bin' ? n * theta0 * (1 - theta0) : n * theta0)
      const lo = Math.max(0, Math.floor(Math.min(mean - 5 * sd, d - 8)))
      const hi = Math.min(pmf.length - 1, Math.ceil(Math.max(mean + 5 * sd, d + 8)))
      const ks: number[] = []
      for (let k = lo; k <= hi; k++) ks.push(k)
      const col = ks.map((k) => (k > d ? COLORS.red : k === d ? COLORS.orange : COLORS.gray))
      hLeft.update(
        [{ ...barTrace(ks, ks.map((k) => pmf[k]), 'P_θ₀(T = k)', COLORS.gray), marker: { color: col, opacity: 0.85 } }],
        {
          title: { text: `Loi de T sous H₀ : ${law === 'bin' ? `Bin(${n}, ${theta0})` : `Poi(${(n * theta0).toFixed(2)})`}` },
          xaxis: { title: { text: 'k' } },
          yaxis: { title: { text: 'probabilité' } },
          showlegend: false,
        },
      )
      // tracé « marche » : P(T > c) pour c dans [k, k+1[
      const stepX: number[] = []
      const stepY: number[] = []
      for (let k = lo; k <= hi; k++) {
        let s = 0
        for (let j = k + 1; j < pmf.length; j++) s += pmf[j]
        stepX.push(k, k + 1)
        stepY.push(s, s)
      }
      hRight.update(
        [
          lineTrace(stepX, stepY, 'c ↦ P_θ₀(T > c)', COLORS.blue, { line: { color: COLORS.blue, width: 2.5, shape: 'hv' } }),
          pointsTrace([d, d], [S.pGreater, S.pGreater + S.pEq], 'P(T > d_α) et P(T ≥ d_α)', COLORS.orange, { marker: { color: COLORS.orange, size: 10 } }),
          pointsTrace([d], [alpha], 'α = P(T > d_α) + γ_α P(T = d_α)', COLORS.red, { marker: { color: COLORS.red, size: 11, symbol: 'x' } }),
        ],
        {
          title: { text: 'Fonction de survie sous H₀ et niveau α' },
          xaxis: { title: { text: 'c' }, range: [Math.max(lo, d - 8), Math.min(hi + 1, d + 9)] },
          yaxis: { title: { text: 'P_θ₀(T > c)' }, range: [0, Math.min(1, Math.max(3 * alpha, S.pGreater + S.pEq) * 1.15)] },
          shapes: [hline(alpha, COLORS.red, 'dash')],
        },
      )
      info.innerHTML = richToHtml(
        `$d_\\alpha=\\inf\\{c:\\ \\mathbb{P}_{\\theta_0}(T>c)\\le\\alpha\\}=${d}$ ; $\\mathbb{P}_{\\theta_0}(T>d_\\alpha)=${S.pGreater.toFixed(4)}$, $\\mathbb{P}_{\\theta_0}(T=d_\\alpha)=${S.pEq.toFixed(4)}$.

- **Test pur** $\\mathbb{1}_{\\{T>d_\\alpha\\}}$ : niveau $\\alpha$ mais **taille** $${S.pGreater.toFixed(4)}<\\alpha=${alpha.toFixed(3)}$ : il ne dépense pas tout le budget, et le Th. 1.1 ne s’applique pas (atomes).
- **Test randomisé** (Th. 4.1) : rejet si $T>d_\\alpha$, rejet avec probabilité $\\gamma_\\alpha=\\dfrac{\\alpha-\\mathbb{P}_{\\theta_0}(T>d_\\alpha)}{\\mathbb{P}_{\\theta_0}(T=d_\\alpha)}=${gamma.toFixed(4)}$ si $T=d_\\alpha$ : taille **exactement** $\\alpha$, U.P.P.($\\alpha$).

Repères du poly : Ex. 4.1 ($\\mathrm{Poi}(1)$, $\\alpha=0{,}05$) : $d=3$, taille pure $0{,}019$, $\\gamma\\approx0{,}5$ ; Ex. 4.2 ($n=1000$, $\\theta_0=1/2$) : $d=526$, $\\gamma=0{,}4832$ ; PC4 Ex. 4 ($\\mathrm{Poi}(10)$) : $d=15$, taille pure $0{,}049$.${sim}`,
      )
    }

    const nSlider = slider({ label: '$n$', min: 1, max: 1000, step: 1, value: n, onChange: (v) => { n = v; sim = ''; draw() } })
    const tSlider = slider({ label: '$\\theta_0$', min: 0.005, max: 0.95, step: 0.005, value: theta0, format: (v) => v.toFixed(3), onChange: (v) => { theta0 = v; sim = ''; draw() } })
    const aSlider = slider({ label: '$\\alpha$', min: 0.005, max: 0.2, step: 0.005, value: alpha, format: (v) => v.toFixed(3), onChange: (v) => { alpha = v; sim = ''; draw() } })
    const lawCtl = segmented<Law>(
      [
        { value: 'bin', label: 'Bernoulli (Bin)' },
        { value: 'pois', label: 'Poisson' },
      ],
      law,
      (v) => {
        law = v
        sim = ''
        draw()
      },
    )
    const preset = (l: Law, nn: number, t0: number, a: number) => {
      law = l
      n = nn
      theta0 = t0
      alpha = a
      lawCtl.setValue?.(l)
      nSlider.set(nn)
      tSlider.set(t0)
      aSlider.set(a)
      sim = ''
      draw()
    }
    controls.append(lawCtl, nSlider.root, tSlider.root, aSlider.root)
    controls.append(button('Ex. 4.1 (Poisson)', () => preset('pois', 100, 0.01, 0.05)))
    controls.append(button('Ex. 4.2 (sondage)', () => preset('bin', 1000, 0.5, 0.05)))
    controls.append(button('PC4 Ex. 4', () => preset('pois', 10, 1, 0.05)))
    controls.append(
      button('Simuler 4000 tests sous H₀', () => {
        const rng = makeRng(4400 + seed++)
        const S = construct(pmfOf(), alpha)
        const R = 4000
        let pure = 0
        let rand = 0
        for (let r = 0; r < R; r++) {
          const t = law === 'bin' ? binomial(rng, n, theta0) : poisson(rng, n * theta0)
          if (t > S.d) {
            pure++
            rand++
          } else if (t === S.d && rng() < S.gamma) rand++
        }
        sim = `

**Simulation (4000 tests sous $H_0$)** : fréquence de rejet du test pur ${(pure / R).toFixed(4)}, du test randomisé ${(rand / R).toFixed(4)} (cible $\\alpha=${alpha.toFixed(3)}$, écart-type Monte-Carlo $\\approx${Math.sqrt((alpha * (1 - alpha)) / R).toFixed(4)}$). La randomisation utilise un tirage uniforme indépendant de $Z$ (Déf. 4.1).`
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
