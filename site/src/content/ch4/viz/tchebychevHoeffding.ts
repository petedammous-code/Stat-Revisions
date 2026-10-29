import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, vline, hline, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, binomial } from '../../../sim/rng'
import { binomialPmf, linspace } from '../../../sim/stats'

const deltaBT = (n: number, a: number) => 1 / (2 * Math.sqrt(n * a))
const deltaH = (n: number, a: number) => Math.sqrt(Math.log(2 / a) / (2 * n))

/** Couverture exacte θ ↦ Pθ(|X̄n − θ| ≤ δ) pour une demi-largeur δ fixe. */
function coverage(theta: number, n: number, delta: number): number {
  let c = 0
  for (let k = 0; k <= n; k++) if (Math.abs(k / n - theta) <= delta) c += binomialPmf(k, n, theta)
  return c
}

/** Intervalles pour une proportion sans pivot : Bienaymé-Tchebychev contre Hoeffding. */
export const vizTchebychevHoeffding: Viz = {
  id: 'ch4-tchebychev-hoeffding',
  title: 'Proportion sans pivot : Bienaymé-Tchebychev contre Hoeffding',
  description:
    'Modèle de Bernoulli, aucun pivot explicite (Ex. 1.8). Deux intervalles $[\\bar X_n\\pm\\delta]$ de niveau **au moins** $1-\\alpha$ : Bienaymé-Tchebychev $\\delta_{n,\\alpha}=1/(2\\sqrt{n\\alpha})$ (variance majorée par $1/(4n)$) et Hoeffding $\\delta(\\alpha,n)=\\sqrt{\\log(2/\\alpha)/(2n)}$ (Cor. 3.1). **À gauche** : les deux demi-largeurs en fonction de $\\alpha$ (échelle logarithmique) ; leur rapport $\\sqrt{2\\alpha\\log(2/\\alpha)}$ ne dépend pas de $n$. **À droite** : la probabilité de couverture **exacte** $\\theta\\mapsto\\mathbb{P}_\\theta(\\theta\\in[\\bar X_n\\pm\\delta])$ calculée avec la loi binomiale : toujours au-dessus de $1-\\alpha$ — les deux intervalles sont **conservatifs** (plus longs que nécessaire). Curseurs $n$, $\\alpha$, $\\theta$ ; bouton : un sondage simulé.',
  source: 'Poly ch.4, Ex. 1.8 ; Outils, Thm 3.1 et Cor. 3.1',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let n = 100
    let alpha = 0.05
    let theta = 0.3
    let seed = 0
    let sample: number | null = null
    const hL = plot(plots[0], [], {})
    const hR = plot(plots[1], [], {})

    const draw = () => {
      const as = linspace(-3, -0.3, 120).map((e) => Math.pow(10, e))
      hL.update(
        [
          lineTrace(as, as.map((a) => deltaBT(n, a)), 'Bienaymé-Tchebychev 1/(2√(nα))', COLORS.orange),
          lineTrace(as, as.map((a) => deltaH(n, a)), 'Hoeffding √(log(2/α)/(2n))', COLORS.blue),
          pointsTrace([alpha, alpha], [deltaBT(n, alpha), deltaH(n, alpha)], 'α choisi', COLORS.red),
        ],
        {
          title: { text: `demi-largeurs pour n = ${n}` },
          xaxis: { title: { text: 'α (échelle log)' }, type: 'log' },
          yaxis: { title: { text: 'demi-largeur δ' }, rangemode: 'tozero' },
          shapes: [vline(alpha, COLORS.gray, 'dot')],
        },
      )
      const thetas = linspace(0.005, 0.995, 100)
      const dB = deltaBT(n, alpha)
      const dH = deltaH(n, alpha)
      hR.update(
        [
          lineTrace(thetas, thetas.map((t) => coverage(t, n, dB)), 'couverture exacte, Tchebychev', COLORS.orange, { line: { color: COLORS.orange, width: 2, shape: 'linear' } }),
          lineTrace(thetas, thetas.map((t) => coverage(t, n, dH)), 'couverture exacte, Hoeffding', COLORS.blue, { line: { color: COLORS.blue, width: 2, shape: 'linear' } }),
        ],
        {
          title: { text: 'probabilité de couverture θ ↦ Pθ(θ ∈ I)' },
          xaxis: { title: { text: 'θ' } },
          yaxis: { title: { text: 'couverture' }, range: [Math.max(0, 1 - 3 * alpha - 0.05), 1.005] },
          shapes: [hline(1 - alpha, COLORS.red, 'dash')],
        },
      )
      let s = ''
      if (sample !== null) {
        const xb = sample / n
        const inB = Math.abs(xb - theta) <= dB
        const inH = Math.abs(xb - theta) <= dH
        s = ` **Sondage simulé** ($\\theta=${theta.toFixed(2)}$) : $\\bar X_n=${xb.toFixed(3)}$ ; Tchebychev $[${(xb - dB).toFixed(3)};${(xb + dB).toFixed(3)}]$ ${inB ? 'contient' : 'ne contient pas'} $\\theta$ ; Hoeffding $[${(xb - dH).toFixed(3)};${(xb + dH).toFixed(3)}]$ ${inH ? 'contient' : 'ne contient pas'} $\\theta$.`
      }
      info.innerHTML = richToHtml(
        `Pour $n=${n}$ et $\\alpha=${alpha.toFixed(3)}$ : $\\delta_{n,\\alpha}=${dB.toFixed(4)}$, $\\delta(\\alpha,n)=${dH.toFixed(4)}$, rapport des longueurs $\\sqrt{2\\alpha\\log(2/\\alpha)}=${(dH / dB).toFixed(3)}$ (0,61 à 5 %, 0,33 à 1 %). Tchebychev paie le niveau en $\\alpha^{-1/2}$, Hoeffding seulement en $\\sqrt{\\log(1/\\alpha)}$ mais exige des observations **bornées** ; l’avantage de Hoeffding vaut pour les petits $\\alpha$ (pour $\\alpha$ au-delà d’environ $0{,}23$, le rapport dépasse 1). Les deux décroissent en $n^{-1/2}$ ; aucun n’est exact (ce sont des majorations).${s}`,
      )
    }

    controls.append(
      slider({
        label: '$n$',
        min: 10,
        max: 500,
        step: 10,
        value: n,
        onChange: (v) => {
          n = v
          sample = null
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$\\alpha$ (log)',
        min: -3,
        max: -0.4,
        step: 0.02,
        value: Math.log10(alpha),
        log: true,
        format: (v) => v.toFixed(3),
        onChange: (v) => {
          alpha = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$\\theta$',
        min: 0.02,
        max: 0.98,
        step: 0.01,
        value: theta,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          theta = v
          sample = null
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer un sondage', () => {
        seed++
        sample = binomial(makeRng(6600 + seed), n, theta)
        draw()
      }),
    )
    draw()
    return () => {
      hL.destroy()
      hR.destroy()
    }
  },
}
