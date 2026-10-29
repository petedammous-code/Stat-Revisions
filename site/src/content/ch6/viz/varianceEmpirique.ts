import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, toggle } from '../../../core/ui'
import { plot, lineTrace, barTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential, uniform, type Rng } from '../../../sim/rng'
import { histogram, normalPdf, linspace, mean, variance } from '../../../sim/stats'

type Law = 'gauss' | 'exp' | 'unif'
/** mu4 = moment centre d'ordre 4 ; gamma = mu4 - sigma^4 (Ex. 1.6). */
const LAWS: Record<Law, { label: string; tex: string; mu: number; sigma2: number; mu4: number; draw: (r: Rng) => number }> = {
  gauss: { label: 'N(0, 1)', tex: '\\mathcal{N}(0,1)', mu: 0, sigma2: 1, mu4: 3, draw: (r) => normal(r, 0, 1) },
  exp: { label: 'E(1)', tex: '\\mathcal{E}(1)', mu: 1, sigma2: 1, mu4: 9, draw: (r) => exponential(r, 1) },
  unif: { label: 'U([0,1])', tex: '\\mathcal{U}([0,1])', mu: 0.5, sigma2: 1 / 12, mu4: 1 / 80, draw: (r) => uniform(r, 0, 1) },
}

/** Variance empirique : consistance (Prop. 1.2) et TCL de variance limite gamma = mu4 - sigma^4 (Ex. 1.6). */
export const vizVarianceEmpirique: Viz = {
  id: 'ch6-variance-empirique',
  title: 'Variance empirique : consistance et loi limite gaussienne de variance γ',
  description:
    'Histogramme sur $2000$ répétitions de $\\hat\\sigma_n^2=\\frac1n\\sum_i(X_i-\\bar X_n)^2$ (mode « consistance », Prop. 1.2) ou de $\\sqrt n(\\hat\\sigma_n^2-\\sigma^2)$ (mode « TCL », Ex. 1.6) avec la densité $\\mathcal{N}(0,\\gamma)$, $\\gamma=\\int(x-\\mu)^4Q(\\mathrm{d}x)-\\sigma^4$. Curseur $n$ et choix de la loi : $\\gamma=2\\sigma^4$ pour une gaussienne, $8$ pour $\\mathcal{E}(1)$ (queue lourde : convergence lente), $1/180$ pour $\\mathcal{U}([0,1])$.',
  source: 'Poly ch.6, Ex. 1.6 (TCL pour la variance empirique) et Prop. 1.2',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let n = 50
    let law: Law = 'gauss'
    let tcl = true
    let seed = 5
    const M = 2000
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const spec = LAWS[law]
      const rng = makeRng(4000 + seed)
      const vals = new Array<number>(M)
      for (let m = 0; m < M; m++) {
        let s = 0
        let s2 = 0
        for (let i = 0; i < n; i++) {
          const x = spec.draw(rng)
          s += x
          s2 += x * x
        }
        const mu = s / n
        vals[m] = s2 / n - mu * mu
      }
      const gamma = spec.mu4 - spec.sigma2 * spec.sigma2
      const traces: Record<string, unknown>[] = []
      let layout: Record<string, unknown>
      if (tcl) {
        const z = vals.map((v) => Math.sqrt(n) * (v - spec.sigma2))
        const sd = Math.sqrt(gamma)
        const h = histogram(z, 40, -4 * sd, 4 * sd)
        const grid = linspace(-4 * sd, 4 * sd, 300)
        traces.push(barTrace(h.centers, h.density, '√n(σ̂ₙ²−σ²)', COLORS.blue, { width: h.width }))
        traces.push(lineTrace(grid, grid.map((x) => normalPdf(x, 0, sd)), 'densité N(0, γ)', COLORS.orange))
        layout = { title: `√n(σ̂ₙ²−σ²) sur ${M} répétitions, n = ${n}, loi ${spec.label}`, xaxis: { title: '√n(σ̂ₙ²−σ²)' }, yaxis: { title: 'densité' }, barmode: 'overlay' }
        info.innerHTML = richToHtml(
          `**Ex. 1.6.** Pour $Q=${spec.tex}$ : $\\sigma^2=${spec.sigma2.toFixed(4)}$, $\\int(x-\\mu)^4Q(\\mathrm{d}x)=${spec.mu4.toFixed(4)}$, donc $\\gamma=${gamma.toFixed(4)}$. Variance empirique des ${M} valeurs de $\\sqrt n(\\hat\\sigma_n^2-\\sigma^2)$ : ${variance(z).toFixed(4)} ; moyenne ${mean(z).toFixed(3)} (le biais $-\\sigma^2/n$ de $\\hat\\sigma_n^2$ donne une moyenne $\\approx-\\sigma^2/\\sqrt n=${(-spec.sigma2 / Math.sqrt(n)).toFixed(3)}$, négligeable à la limite). La preuve passe par la décomposition (2) : $\\sqrt n(\\hat\\sigma_n^2-\\sigma^2)=\\frac1{\\sqrt n}\\sum_i\\{(X_i-\\mu)^2-\\sigma^2\\}-\\sqrt n(\\bar X_n-\\mu)^2$, TCL sur le premier terme et Slutsky pour le second.${law === 'exp' ? ' Pour la loi exponentielle, $(X_i-\\mu)^2$ a une queue lourde : l’histogramme reste nettement dissymétrique aux $n$ modérés (il faut un moment d’ordre 4, ici fini, mais grand).' : ''}`,
        )
      } else {
        const h = histogram(vals, 40)
        traces.push(barTrace(h.centers, h.density, 'σ̂ₙ²', COLORS.blue, { width: h.width }))
        layout = { title: `σ̂ₙ² sur ${M} répétitions, n = ${n}, loi ${spec.label}`, xaxis: { title: 'σ̂ₙ²' }, yaxis: { title: 'densité' }, shapes: [vline(spec.sigma2, COLORS.red, 'dash')] }
        const eps = 0.2 * spec.sigma2
        const out = vals.filter((v) => Math.abs(v - spec.sigma2) > eps).length / M
        info.innerHTML = richToHtml(
          `**Prop. 1.2 (consistance).** $\\hat\\sigma_n^2=\\frac1n\\sum_iX_i^2-\\bar X_n^2\\xrightarrow{\\mathbb{P}_n\\text{-prob}}\\sigma^2=${spec.sigma2.toFixed(4)}$ (trait rouge) par la LGN appliquée à $X_i$ et $X_i^2$ et le théorème de continuité avec $(u,w)\\mapsto w-u^2$. Moyenne des ${M} valeurs : ${mean(vals).toFixed(4)} (espérance exacte $\\frac{n-1}n\\sigma^2=${(((n - 1) / n) * spec.sigma2).toFixed(4)}$) ; fréquence de $\\{|\\hat\\sigma_n^2-\\sigma^2|>0{,}2\\,\\sigma^2\\}$ : ${(100 * out).toFixed(1)} %.`,
        )
      }
      handle.update(traces, layout)
    }

    controls.append(
      segmented<Law>(
        [
          { value: 'gauss', label: 'Gaussienne' },
          { value: 'exp', label: 'Exponentielle' },
          { value: 'unif', label: 'Uniforme' },
        ],
        law,
        (v) => {
          law = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$n$',
        min: 1,
        max: 3,
        step: 0.05,
        value: Math.log10(n),
        log: true,
        format: (v) => String(Math.round(v)),
        onChange: (v) => {
          n = Math.max(2, Math.round(v))
          draw()
        },
      }).root,
    )
    controls.append(
      toggle('échelle TCL : $\\sqrt n(\\hat\\sigma_n^2-\\sigma^2)$', tcl, (v) => {
        tcl = v
        draw()
      }),
    )
    controls.append(
      button('Tirer', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
