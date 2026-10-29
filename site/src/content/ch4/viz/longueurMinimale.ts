import type { Viz } from '../../types'
import { vizFrame, slider, segmented } from '../../../core/ui'
import { plot, lineTrace, areaTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { chi2Pdf, chi2Quantile, linspace } from '../../../sim/stats'

type Pivot = 'chi2' | 'unif'

/** Bornes [q_{p1}, q_{p1+1−α}] de A_α et longueur normalisée de l'intervalle obtenu par inversion. */
function bounds(pivot: Pivot, n: number, alpha: number, p1: number): { lo: number; hi: number; len: number } {
  const p2 = p1 + 1 - alpha
  if (pivot === 'chi2') {
    const lo = chi2Quantile(Math.max(p1, 1e-9), n - 1)
    const hi = chi2Quantile(Math.min(p2, 1 - 1e-9), n - 1)
    // IC pour σ² : [(n−1)S²/hi, (n−1)S²/lo] ; longueur / ((n−1)S²)
    return { lo, hi, len: 1 / lo - 1 / hi }
  }
  // pivot X_{n:n}/θ de f.d.r. x^n sur [0,1] : quantile d'ordre p = p^{1/n}
  const lo = Math.pow(p1, 1 / n)
  const hi = Math.pow(p2, 1 / n)
  // IC pour θ : [X_{n:n}/hi, X_{n:n}/lo] ; longueur / X_{n:n}
  return { lo, hi, len: lo > 0 ? 1 / lo - 1 / hi : Infinity }
}

/** Le choix de A_α : intervalle symétrique en probabilité ou intervalle le plus court. */
export const vizLongueurMinimale: Viz = {
  id: 'ch4-longueur-minimale',
  title: 'Le choix de $A_\\alpha$ : symétrique en probabilité ou le plus court ?',
  description:
    'Méthode 1.1, étape 3 : $A_\\alpha=]q_{p_1},q_{p_2}]$ avec $p_2-p_1=1-\\alpha$ convient pour **tout** $p_1\\in[0,\\alpha]$ ; le choix symétrique $p_1=\\alpha/2$ n’est qu’une convention. **Pivot $\\chi^2(n-1)$** (Ex. 1.6, variance gaussienne) : intervalle $[(n-1)S_n^2/\\chi^2_{p_2}(n-1),\\ (n-1)S_n^2/\\chi^2_{p_1}(n-1)]$. **Pivot $X_{n:n}/\\theta$** (PC4 Ex. 3, loi uniforme, densité $nx^{n-1}$ sur $[0,1]$) : intervalle $[X_{n:n}/q_{p_2},\\ X_{n:n}/q_{p_1}]$ avec $q_p=p^{1/n}$. À gauche, la densité du pivot et $A_\\alpha$ ombré (aire $1-\\alpha$) ; à droite, la longueur (normalisée) de l’intervalle en fonction de $p_1$. Pour l’uniforme, l’optimum est au bord $p_1=\\alpha$ : $A_\\alpha=[\\alpha^{1/n},1]$ et l’intervalle $[X_{n:n},X_{n:n}\\alpha^{-1/n}]$.',
  source: 'Poly ch.4, Remarque « Le choix de A_α » p. 12, Ex. 1.6 ; PC4 Ex. 3',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let pivot: Pivot = 'unif'
    let n = 10
    let alpha = 0.05
    let frac = 0.5 // p1 = frac · α
    const hL = plot(plots[0], [], {})
    const hR = plot(plots[1], [], {})

    const draw = () => {
      const p1 = frac * alpha
      const b = bounds(pivot, n, alpha, p1)
      const xs = pivot === 'chi2' ? linspace(0, chi2Quantile(0.9995, n - 1) * 1.05, 400) : linspace(0, 1, 400)
      const f = xs.map((x) => (pivot === 'chi2' ? chi2Pdf(x, n - 1) : n * Math.pow(x, n - 1)))
      const shade = xs.map((x, i) => (x >= b.lo && x <= b.hi ? f[i] : 0))
      hL.update([areaTrace(xs, shade, 'A_α (aire 1 − α)', COLORS.green), lineTrace(xs, f, pivot === 'chi2' ? `densité de χ²(${n - 1})` : 'densité n xⁿ⁻¹ de X₍ₙ:ₙ₎/θ', COLORS.blue)], {
        title: { text: `A_α = [${b.lo.toFixed(3)} ; ${b.hi.toFixed(3)}], p₁ = ${p1.toFixed(4)}` },
        xaxis: { title: { text: 'valeur du pivot' } },
        yaxis: { title: { text: 'densité' }, rangemode: 'tozero' },
        shapes: [vline(b.lo, COLORS.green, 'dot'), vline(b.hi, COLORS.green, 'dot')],
      })
      const fr = linspace(0.02, 1, 50)
      const lens = fr.map((u) => bounds(pivot, n, alpha, u * alpha).len)
      let best = 0
      for (let i = 1; i < lens.length; i++) if (lens[i] < lens[best]) best = i
      const sym = bounds(pivot, n, alpha, alpha / 2).len
      hR.update(
        [
          lineTrace(fr.map((u) => u * alpha), lens, 'longueur normalisée', COLORS.blue),
          pointsTrace([p1], [b.len], 'choix courant', COLORS.red),
          pointsTrace([alpha / 2], [sym], 'choix symétrique p₁ = α/2', COLORS.orange, { marker: { color: COLORS.orange, size: 9, symbol: 'square' } }),
        ],
        {
          title: { text: pivot === 'chi2' ? 'longueur / ((n−1)S²) en fonction de p₁' : 'longueur / X₍ₙ:ₙ₎ en fonction de p₁' },
          xaxis: { title: { text: 'p₁ (risque laissé à gauche)' }, range: [0, alpha * 1.02] },
          yaxis: { title: { text: 'longueur normalisée' }, range: [0, Math.min(Math.max(...lens.filter(Number.isFinite)), 4 * lens[best]) * 1.05] },
        },
      )
      const ic =
        pivot === 'chi2'
          ? `$\\big[(n-1)S_n^2/${b.hi.toFixed(3)},\\ (n-1)S_n^2/${b.lo.toFixed(3)}\\big]$`
          : `$\\big[X_{n:n}/${b.hi.toFixed(3)},\\ X_{n:n}/${b.lo.toFixed(3)}\\big]=\\big[${(1 / b.hi).toFixed(3)}\\,X_{n:n},\\ ${(1 / b.lo).toFixed(3)}\\,X_{n:n}\\big]$`
      const comment =
        pivot === 'chi2'
          ? `Longueur minimale vers $p_1\\approx${(fr[best] * alpha).toFixed(4)}$ (longueur ${lens[best].toFixed(4)}) contre ${sym.toFixed(4)} pour le choix symétrique : l’optimum n’est qu’**approximativement** symétrique, d’autant plus que $n$ est grand (le poly retient $\\alpha_1=\\alpha_2=\\alpha/2$ en pratique).`
          : `La densité $nx^{n-1}$ est **croissante** : il faut placer $A_\\alpha$ contre $1$, d’où l’optimum $p_1=\\alpha$, $A_\\alpha=[\\alpha^{1/n},1]$ et l’intervalle $[X_{n:n},X_{n:n}\\alpha^{-1/n}]$ de longueur $${(Math.pow(alpha, -1 / n) - 1).toFixed(4)}\\,X_{n:n}$, contre $${sym.toFixed(4)}\\,X_{n:n}$ pour le choix symétrique.`
      info.innerHTML = richToHtml(`Intervalle obtenu (niveau exactement $1-\\alpha$ pour tout $p_1$) : ${ic}. ${comment}`)
    }

    controls.append(
      segmented<Pivot>(
        [
          { value: 'unif', label: 'Pivot $X_{n:n}/\\theta$ (uniforme)' },
          { value: 'chi2', label: 'Pivot $\\chi^2(n-1)$ (variance)' },
        ],
        pivot,
        (v) => {
          pivot = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$p_1/\\alpha$',
        min: 0.02,
        max: 1,
        step: 0.01,
        value: frac,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          frac = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$n$',
        min: 3,
        max: 60,
        step: 1,
        value: n,
        onChange: (v) => {
          n = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$\\alpha$',
        min: 0.01,
        max: 0.3,
        step: 0.01,
        value: alpha,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          alpha = v
          draw()
        },
      }).root,
    )
    draw()
    return () => {
      hL.destroy()
      hR.destroy()
    }
  },
}
