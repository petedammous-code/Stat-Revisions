import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, barTrace, boxTrace, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng } from '../../../sim/rng'
import { transLaw, vHuber, vMedian, zEstimate, meanOf, medianOf, varOf, fr } from './common'

const K = 1.345
const THETA_STAR = 0

/** Moyenne, médiane et Huber sous contamination (1 − ε) N(θ⋆, 1) + ε N(θ⋆, τ²). */
export const vizMedianeMoyenne: Viz = {
  id: 'ch7-mediane-moyenne',
  title: 'Moyenne, médiane, Huber : robustesse sous contamination',
  description:
    'Observations i.i.d. de loi $(1-\\varepsilon)\\mathcal{N}(\\theta^\\star,1)+\\varepsilon\\mathcal{N}(\\theta^\\star,\\tau^2)$ (PC7 Ex. 5 Q7). Trois Z-estimateurs de translation : moyenne ($\\gamma_\\infty$), médiane ($\\gamma_0$), Huber ($\\gamma_k$, $k=1{,}345$). À gauche : boîtes à moustaches de $\\sqrt n(\\hat\\theta_n-\\theta^\\star)$ sur $R$ répétitions ; à droite : $n\\times$ variance empirique contre la variance asymptotique théorique $V[\\gamma]$. Curseurs $\\varepsilon$ (proportion de données aberrantes), $\\tau$ (leur écart-type), $n$ ; bouton « Tirer ».',
  source: 'PC7 Ex. 5 Q5–Q7 ; Poly ch.7, Ex. 1.4 et Ex. 1.9',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let eps = 0.05
    let tau = 10
    let n = 100
    let seed = 1
    const R = 400
    const hBox = plot(plots[0], [], {})
    const hBar = plot(plots[1], [], {})

    const draw = () => {
      const spec = transLaw('contam', eps, tau)
      const rng = makeRng(52000 + seed)
      const zm: number[] = []
      const zmed: number[] = []
      const zh: number[] = []
      const xs = new Array<number>(n)
      for (let r = 0; r < R; r++) {
        for (let i = 0; i < n; i++) xs[i] = THETA_STAR + spec.draw(rng)
        const s = Math.sqrt(n)
        zm.push(s * (meanOf(xs) - THETA_STAR))
        zmed.push(s * (medianOf(xs) - THETA_STAR))
        zh.push(s * (zEstimate(xs, 'huber', K) - THETA_STAR))
      }
      const vInf = spec.variance
      const v0 = vMedian(spec)
      const vk = vHuber(spec, K)
      const emp = [varOf(zm), varOf(zmed), varOf(zh)]
      const theo = [vInf, v0, vk]
      const names = ['moyenne (γ∞)', 'médiane (γ₀)', `Huber (k = ${K})`]
      const lim = Math.max(4, 3.5 * Math.sqrt(Math.min(vInf, 25)))
      hBox.update(
        [
          boxTrace(zm, names[0], COLORS.orange),
          boxTrace(zmed, names[1], COLORS.blue),
          boxTrace(zh, names[2], COLORS.green),
        ],
        { title: `√n(θ̂ₙ − θ⋆), n = ${n}, ${R} répétitions`, yaxis: { title: '√n(θ̂ₙ − θ⋆)', range: [-lim, lim] }, showlegend: false },
      )
      hBar.update(
        [
          { ...barTrace([], [], 'n × variance empirique', COLORS.purple), x: names, y: emp },
          { ...pointsTrace([], [], 'V[γ] théorique', COLORS.red, { marker: { color: COLORS.red, size: 12, symbol: 'diamond' } }), x: names, y: theo },
        ],
        { title: 'Variances asymptotiques', yaxis: { title: 'variance', rangemode: 'tozero' } },
      )
      const best = theo.indexOf(Math.min(...theo))
      info.innerHTML = richToHtml(
        `Avec $\\varepsilon=${fr(eps, 2)}$ et $\\tau=${fr(tau, 1)}$ : $V[\\gamma_\\infty]=(1-\\varepsilon)+\\varepsilon\\tau^2=${fr(vInf)}$ (empirique $${fr(emp[0])}$), $V[\\gamma_0]=\\dfrac1{4f(0)^2}=${fr(v0)}$ (empirique $${fr(emp[1])}$), $V[\\gamma_k]=\\dfrac{\\int\\min(|x|,k)^2f}{(\\int_{|x|<k}f)^2}=${fr(vk)}$ (empirique $${fr(emp[2])}$). Meilleur ici : **${names[best]}**. La variance de la moyenne **explose** avec $\\varepsilon\\tau^2$ (fonction d’influence non bornée) ; celles de la médiane et de Huber restent bornées **uniformément en $\\tau$** : une fonction d’influence bornée rend l’estimateur robuste. Sans contamination ($\\varepsilon=0$), la moyenne est l’EMV, optimale ($V=1=1/\\mathbb{I}$), la médiane perd 36 % ($\\pi/2$) et Huber presque rien ($\\approx1{,}05$).`,
      )
    }

    controls.append(
      slider({
        label: '$\\varepsilon$',
        min: 0,
        max: 0.2,
        step: 0.01,
        value: eps,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          eps = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$\\tau$',
        min: 1,
        max: 30,
        step: 0.5,
        value: tau,
        format: (v) => v.toFixed(1),
        onChange: (v) => {
          tau = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$n$',
        min: 20,
        max: 400,
        step: 10,
        value: n,
        onChange: (v) => {
          n = v
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer de nouveaux échantillons', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => {
      hBox.destroy()
      hBar.destroy()
    }
  },
}
