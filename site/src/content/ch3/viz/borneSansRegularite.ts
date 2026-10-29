import type { Viz } from '../../types'
import { vizFrame, slider } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { linspace } from '../../../sim/stats'

const tau = (c: number, n: number) => (c * c) / (Math.pow(1 - c / n, -n) - 1)
const tauLim = (c: number) => (c * c) / (Math.exp(c) - 1)

/** PC3 Ex. 3 (Poly ch.3, Exercice 3) : borne de type covariance sans régularité dans le modèle uniforme. */
export const vizBorneSansRegularite: Viz = {
  id: 'ch3-borne-sans-regularite',
  title: 'Une borne sans régularité : $\\tau_n(c)$ dans le modèle uniforme',
  description:
    'À gauche : $c\\mapsto\\tau_n(c)=\\frac{c^2}{(1-c/n)^{-n}-1}$ pour le $n$ choisi, sa limite $\\frac{c^2}{e^c-1}$ et la valeur au $c$ choisi : tout estimateur sans biais de $\\theta$ vérifie $\\mathrm{Var}_\\theta(T)\\ge\\theta^2\\tau_n(c)/n^2$. À droite : le rapport $\\frac{n}{(n+2)\\tau_n(c)}$ entre le risque $\\frac{\\theta^2}{n(n+2)}$ de $\\frac{n+1}nX_{n:n}$ et la borne. Curseurs $n$ et $c$.',
  source: 'Poly ch.3, Exercice 3 (Figure 2) ; PC3 Ex. 3 Q5–Q6',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let n = 10
    let c = 1
    const hTau = plot(plots[0], [], {})
    const hRatio = plot(plots[1], [], {})

    const draw = () => {
      const cMax = Math.min(n - 1e-3, 5)
      const cs = linspace(0.01, cMax, 300)
      const tn = cs.map((x) => tau(x, n))
      const tl = cs.map(tauLim)
      let iBest = 0
      for (let i = 1; i < tn.length; i++) if (tn[i] > tn[iBest]) iBest = i
      const cc = Math.min(c, cMax)
      hTau.update(
        [
          lineTrace(cs, tn, `τₙ(c), n = ${n}`, COLORS.blue),
          lineTrace(cs, tl, 'limite c²/(eᶜ − 1)', COLORS.gray, { line: { color: COLORS.gray, width: 2, dash: 'dash' } }),
          pointsTrace([cs[iBest]], [tn[iBest]], 'maximum', COLORS.red, { marker: { color: COLORS.red, size: 11, symbol: 'star' } }),
          pointsTrace([cc], [tau(cc, n)], 'c choisi', COLORS.orange, { marker: { color: COLORS.orange, size: 10 } }),
        ],
        { title: 'Facteur de la borne', xaxis: { title: 'c' }, yaxis: { title: 'τ', rangemode: 'tozero' }, shapes: [vline(cc, COLORS.orange, 'dot')] },
      )
      const ratio = cs.map((x) => n / ((n + 2) * tau(x, n)))
      let iMin = 0
      for (let i = 1; i < ratio.length; i++) if (ratio[i] < ratio[iMin]) iMin = i
      hRatio.update(
        [
          lineTrace(cs, ratio, 'risque de (n+1)/n·X(n:n) / borne', COLORS.purple),
          pointsTrace([cs[iMin]], [ratio[iMin]], 'minimum', COLORS.red, { marker: { color: COLORS.red, size: 11, symbol: 'star' } }),
        ],
        { title: 'Écart entre le risque de (n+1)/n·X(n:n) et la borne', xaxis: { title: 'c' }, yaxis: { title: 'rapport', range: [1, 4] } },
      )
      info.innerHTML = richToHtml(
        `$n=${n}$, $c=${cc.toFixed(2)}$ : $\\tau_n(c)=${tau(cc, n).toFixed(3)}$, donc pour $\\theta=1$ la borne vaut $${(tau(cc, n) / (n * n)).toExponential(3)}$, contre $\\mathrm{Var}(\\frac{n+1}nX_{n:n})=\\frac1{n(n+2)}=${(1 / (n * (n + 2))).toExponential(3)}$. Meilleure borne : $\\sup_c\\tau_n(c)\\approx${tn[iBest].toFixed(3)}$ en $c\\approx${cs[iBest].toFixed(2)}$ (limite $\\approx0{,}648$ en $c\\approx1{,}59$) ; rapport minimal $\\approx${ratio[iMin].toFixed(2)}$ (limite $\\approx1{,}54$).

**Conclusion de l’exercice** : sans **aucune** hypothèse de régularité (Cauchy-Schwarz avec $\\Psi=p_{\\theta-\\delta}/p_\\theta-1$, $\\delta=c\\theta/n$), la variance des estimateurs sans biais de $\\theta$ est minorée par une quantité d’ordre $\\theta^2/n^2$ ; $\\frac{n+1}nX_{n:n}$ atteint cet ordre, à une constante $\\approx1{,}5$ près. La vitesse $n^{-2}$ « interdite » par Cramér-Rao est donc la bonne vitesse dans ce modèle non régulier (Ex. 1.16).`,
      )
    }

    controls.append(
      slider({
        label: '$n$',
        min: Math.log10(2),
        max: Math.log10(500),
        step: 0.02,
        value: Math.log10(n),
        log: true,
        integer: true,
        onChange: (v) => {
          n = Math.max(2, v)
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$c$',
        min: 0.05,
        max: 5,
        step: 0.05,
        value: c,
        onChange: (v) => {
          c = v
          draw()
        },
      }).root,
    )
    draw()
    return () => {
      hTau.destroy()
      hRatio.destroy()
    }
  },
}
