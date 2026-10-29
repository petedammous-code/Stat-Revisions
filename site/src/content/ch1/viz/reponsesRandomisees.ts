import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, barTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng } from '../../../sim/rng'
import { histogram, linspace, variance, mean } from '../../../sim/stats'

const fmt = (v: number) => v.toFixed(2).replace('.', ',')

/** Reponses randomisees : histogramme de l'estimateur et variance en fonction de q (explosion en q = 1/2). */
export const vizReponsesRandomisees: Viz = {
  id: 'ch1-reponses-randomisees',
  title: 'Réponses randomisées : confidentialité contre variance',
  description:
    'Chaque participant répond la vérité avec probabilité $q$ (connue) et l’inverse sinon : on observe $\\mathrm{RR}_i\\sim\\mathcal{B}\\mathrm{er}(\\theta q+(1-\\theta)(1-q))$ et on estime $\\theta$ par $\\hat\\theta_n=(\\overline{\\mathrm{RR}}_n-(1-q))/(2q-1)$. À gauche : histogramme de $\\hat\\theta_n$ sur $M=2000$ enquêtes simulées. À droite : la borne $q(1-q)/(n(2q-1)^2)$ de la variance en fonction de $q$, qui explose quand $q\\to1/2$ (le modèle devient non identifiable). Curseurs $q$, $n$, $\\theta$.',
  source: 'Poly ch.1, §1.8 « Question sensible et réponses randomisées », p. 18–19',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let q = 0.75
    let n = 200
    let theta = 0.3
    let seed = 11
    const M = 2000
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})

    const draw = () => {
      const rng = makeRng(900 + seed)
      const p = theta * q + (1 - theta) * (1 - q)
      const est = new Array<number>(M)
      for (let m = 0; m < M; m++) {
        let s = 0
        for (let i = 0; i < n; i++) if (rng() < p) s++
        est[m] = (s / n - (1 - q)) / (2 * q - 1)
      }
      const sd = Math.sqrt((p * (1 - p)) / (n * (2 * q - 1) ** 2))
      const lo = Math.min(-0.2, theta - 4.5 * sd)
      const hi = Math.max(1.2, theta + 4.5 * sd)
      const h = histogram(est, 40, lo, hi)
      hLeft.update(
        [barTrace(h.centers, h.density, 'histogramme de θ̂ₙ (2000 enquêtes)', COLORS.blue, { width: h.width })],
        { title: `θ̂ₙ pour q = ${fmt(q)}, n = ${n}`, xaxis: { title: 'θ̂ₙ', range: [lo, hi] }, yaxis: { title: 'densité' }, shapes: [vline(theta, COLORS.red, 'dash')] },
      )
      const qs = linspace(0.505, 1, 200).concat(linspace(0, 0.495, 200)).sort((a, b) => a - b)
      const bound = (qq: number) => (qq * (1 - qq)) / (n * (2 * qq - 1) ** 2)
      const ys = qs.map(bound)
      const ymax = Math.max(bound(0.6), 4 * bound(q)) * 1.2
      hRight.update(
        [lineTrace(qs, ys.map((y) => Math.min(y, ymax * 2)), 'q(1−q)/(n(2q−1)²)', COLORS.orange), pointsTrace([q], [bound(q)], 'q choisi', COLORS.red, { marker: { color: COLORS.red, size: 10 } })],
        { title: 'Borne inférieure de la variance de θ̂ₙ en fonction de q', xaxis: { title: 'q', range: [0, 1] }, yaxis: { title: 'variance', range: [0, ymax] }, shapes: [vline(0.5, COLORS.gray, 'dot')] },
      )
      const v = variance(est)
      info.innerHTML = richToHtml(
        `**Modèle induit** : $\\mathrm{RR}_i\\sim\\mathcal{B}\\mathrm{er}(\\theta q+(1-\\theta)(1-q))$ ; ici $\\theta q+(1-\\theta)(1-q)=${fmt(p)}$ pour $\\theta=${fmt(theta)}$ (trait rouge) et $q=${fmt(q)}$. L’estimateur des moments $\\hat\\theta_n=(\\overline{\\mathrm{RR}}_n-(1-q))/(2q-1)$ est **sans biais** : moyenne des $2000$ valeurs $${mean(est).toFixed(3)}$. Sa variance $\\mathrm{Var}_\\theta(\\mathrm{RR}_1)/(n(2q-1)^2)=${(sd * sd).toFixed(5)}$ (empirique : $${v.toFixed(5)}$) est minorée par $q(1-q)/(n(2q-1)^2)=${bound(q).toFixed(5)}$, contre $\\theta(1-\\theta)/n=${((theta * (1 - theta)) / n).toFixed(5)}$ si l’on observait directement les $X_i$.\n\n**Prix de la confidentialité** : le facteur $(2q-1)^{-2}$ explose quand $q\\to1/2$ ; en $q=1/2$ la loi de $\\mathrm{RR}_i$ ne dépend plus de $\\theta$ (modèle **non identifiable**, question courte 9). À l’opposé, $q=1$ redonne l’enquête directe, sans protection : un « oui » révèle la vraie réponse. Remarque : $\\hat\\theta_n$ peut sortir de $[0,1]$ ; le poly suggère de le tronquer.`,
      )
    }

    controls.append(slider({ label: '$q$', min: 0.55, max: 1, step: 0.01, value: q, format: fmt, onChange: (v) => { q = v; draw() } }).root)
    controls.append(slider({ label: '$n$', min: 20, max: 2000, step: 20, value: n, onChange: (v) => { n = v; draw() } }).root)
    controls.append(slider({ label: '$\\theta$ (vraie proportion)', min: 0.02, max: 0.98, step: 0.01, value: theta, format: fmt, onChange: (v) => { theta = v; draw() } }).root)
    controls.append(button('Tirer 2000 enquêtes', () => { seed++; draw() }))
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
