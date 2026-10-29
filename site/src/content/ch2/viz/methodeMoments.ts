import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, hline, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, exponential } from '../../../sim/rng'
import { linspace, mean, quantile } from '../../../sim/stats'

type Moment = 'x' | 'x2'

/** Methode des moments dans le modele exponentiel : courbe e(theta) vs moment empirique, et dispersion des deux estimateurs (figure p. 11). */
export const vizMethodeMoments: Viz = {
  id: 'ch2-methode-moments',
  title: 'Méthode des moments : moment exact contre moment empirique (modèle exponentiel)',
  description:
    'À gauche : la courbe du **moment exact** $e(\\vartheta)=\\mathbb{E}_\\vartheta[T(X_1)]$ ($1/\\vartheta$ pour $T(x)=x$, $2/\\vartheta^2$ pour $T(x)=x^2$) et le niveau du **moment empirique** $\\frac1n\\sum_iT(X_i)$ (trait horizontal) : l’estimateur des moments est l’abscisse de leur intersection (Déf. 1.2). À droite : boîtes à moustaches de $\\hat\\theta_{n,1}=1/\\bar X_n$ et $\\hat\\theta_{n,2}=(2/\\overline{X^2}_n)^{1/2}$ sur $500$ échantillons simulés (figure p. 11) : les deux se concentrent autour de $\\theta$, le second est plus dispersé. Curseurs $\\theta$ et $n$, bouton « Tirer ».',
  source: 'Poly ch.2, Déf. 1.2, Méthode 1.1, Ex. 1.4 (figure p. 11)',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let theta = 1
    let n = 20
    let mom: Moment = 'x'
    let seed = 7
    const M = 500
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})

    const draw = () => {
      const rng = makeRng(200 + seed)
      const xs = new Array<number>(n)
      for (let i = 0; i < n; i++) xs[i] = exponential(rng, theta)
      const m1 = mean(xs)
      const m2 = mean(xs.map((x) => x * x))
      const th1 = 1 / m1
      const th2 = Math.sqrt(2 / m2)
      const grid = linspace(0.15 * theta, 3 * theta, 300)
      const e = mom === 'x' ? grid.map((v) => 1 / v) : grid.map((v) => 2 / (v * v))
      const emp = mom === 'x' ? m1 : m2
      const est = mom === 'x' ? th1 : th2
      const yMax = mom === 'x' ? 3 / theta : 6 / (theta * theta)
      hLeft.update(
        [
          lineTrace(grid, e.map((y) => Math.min(y, yMax * 1.5)), mom === 'x' ? 'e(ϑ) = 1/ϑ' : 'ẽ(ϑ) = 2/ϑ²', COLORS.blue),
          pointsTrace([est], [emp], 'estimateur des moments', COLORS.orange, { marker: { color: COLORS.orange, size: 11, symbol: 'diamond' } }),
        ],
        {
          title: mom === 'x' ? `T(x) = x : résoudre 1/ϑ = X̄ₙ (n = ${n})` : `T(x) = x² : résoudre 2/ϑ² = X²̄ₙ (n = ${n})`,
          xaxis: { title: 'ϑ', range: [grid[0], grid[grid.length - 1]] },
          yaxis: { title: mom === 'x' ? 'moment d’ordre 1' : 'moment d’ordre 2', range: [0, yMax] },
          shapes: [hline(emp, COLORS.orange, 'dash'), vline(theta, COLORS.red, 'dot'), vline(est, COLORS.orange, 'dot')],
          showlegend: false,
        },
      )
      // repetitions
      const a1 = new Array<number>(M)
      const a2 = new Array<number>(M)
      for (let m = 0; m < M; m++) {
        let s = 0
        let s2 = 0
        for (let i = 0; i < n; i++) {
          const x = exponential(rng, theta)
          s += x
          s2 += x * x
        }
        a1[m] = n / s
        a2[m] = Math.sqrt((2 * n) / s2)
      }
      hRight.update(
        [
          { type: 'box', y: a1, name: 'θ̂ₙ,₁ = 1/X̄ₙ', marker: { color: COLORS.blue }, boxpoints: 'outliers' },
          { type: 'box', y: a2, name: 'θ̂ₙ,₂ = (2/X²̄ₙ)^½', marker: { color: COLORS.purple }, boxpoints: 'outliers' },
        ],
        {
          title: `${M} répétitions, n = ${n}, θ = ${theta}`,
          yaxis: { title: 'valeur de l’estimateur', range: [0, Math.max(3 * theta, quantile(a2, 0.99) * 1.05)] },
          shapes: [hline(theta, COLORS.red, 'dash')],
          showlegend: false,
        },
      )
      const iqr1 = quantile(a1, 0.75) - quantile(a1, 0.25)
      const iqr2 = quantile(a2, 0.75) - quantile(a2, 0.25)
      info.innerHTML = richToHtml(
        `**Échantillon tiré** : $\\bar X_n=${m1.toFixed(3)}$, $\\overline{X^2}_n=${m2.toFixed(3)}$ ; $\\hat\\theta_{n,1}=1/\\bar X_n=${th1.toFixed(3)}$ et $\\hat\\theta_{n,2}=(2/\\overline{X^2}_n)^{1/2}=${th2.toFixed(3)}$ (vraie valeur $\\theta=${theta}$). Les deux estimateurs des moments **ne coïncident pas** : le résultat dépend de la fonction $T$ choisie (Méthode 1.1, commentaire (b)). **Sur ${M} répétitions** : médiane de $\\hat\\theta_{n,1}$ : ${quantile(a1, 0.5).toFixed(3)} (moyenne ${mean(a1).toFixed(3)}, biais théorique $n\\theta/(n-1)-\\theta=${((n * theta) / (n - 1) - theta).toFixed(3)}$ pour $n\\ge2$), écart interquartile ${iqr1.toFixed(3)} ; médiane de $\\hat\\theta_{n,2}$ : ${quantile(a2, 0.5).toFixed(3)}, écart interquartile ${iqr2.toFixed(3)}. Le moment d’ordre 2 introduit plus de variabilité ; le ch.6 quantifie : variances asymptotiques $\\theta^2$ contre $\\frac54\\theta^2$ (PC6 Ex. 1). L’EMV coïncide avec $\\hat\\theta_{n,1}$ (Ex. 1.7).`,
      )
    }

    controls.append(
      segmented<Moment>(
        [
          { value: 'x', label: '$T(x)=x$' },
          { value: 'x2', label: '$T(x)=x^2$' },
        ],
        mom,
        (v) => {
          mom = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$\\theta$',
        min: 0.5,
        max: 3,
        step: 0.1,
        value: theta,
        format: (v) => v.toFixed(1),
        onChange: (v) => {
          theta = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$n$',
        min: Math.log10(3),
        max: 3,
        step: 0.05,
        value: Math.log10(n),
        log: true,
        format: (v) => String(Math.round(v)),
        onChange: (v) => {
          n = Math.max(3, Math.round(v))
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer un échantillon', () => {
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
