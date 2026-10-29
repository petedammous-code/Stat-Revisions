import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, toggle } from '../../../core/ui'
import { plot, lineTrace, barTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, exponential, bernoulli, uniform, cauchy, type Rng } from '../../../sim/rng'
import { histogram, normalPdf, linspace, mean, variance } from '../../../sim/stats'

type Law = 'bern' | 'exp' | 'unif' | 'cauchy'

interface LawSpec {
  label: string
  tex: string
  mu: number
  sigma: number
  draw: (rng: Rng) => number
}

const LAWS: Record<Law, LawSpec> = {
  bern: { label: 'Bernoulli(0,2)', tex: '\\mathcal{B}\\mathrm{er}(0{,}2)', mu: 0.2, sigma: Math.sqrt(0.16), draw: (r) => bernoulli(r, 0.2) },
  exp: { label: 'Exponentielle E(1)', tex: '\\mathcal{E}(1)', mu: 1, sigma: 1, draw: (r) => exponential(r, 1) },
  unif: { label: 'Uniforme U([0,1])', tex: '\\mathcal{U}([0,1])', mu: 0.5, sigma: Math.sqrt(1 / 12), draw: (r) => uniform(r, 0, 1) },
  cauchy: { label: 'Cauchy (pas de moment)', tex: '\\text{Cauchy}(0,1)', mu: 0, sigma: 1, draw: (r) => cauchy(r, 0, 1) },
}

/** LGN et TCL : histogramme de M = 400 moyennes empiriques, brutes ou renormalisees en sqrt(n). */
export const vizLgnTcl: Viz = {
  id: 'ch6-lgn-tcl',
  title: 'LGN et TCL : la loi de la moyenne empirique quand n grandit',
  description:
    'On tire $M=400$ échantillons de taille $n$ et on trace l’histogramme des $400$ valeurs de $\\bar X_n$ (mode « LGN ») ou de $\\sqrt n(\\bar X_n-\\mu)/\\sigma$ (mode « TCL »), avec la densité limite superposée. Curseur $n$, choix de la loi $Q$ (la loi de Cauchy n’a pas de moment : ni LGN ni TCL), bouton « Tirer ». Ce qui converge est la **loi à $n$ fixé**, pas une trajectoire.',
  source: 'Poly ch.6, Thm 1.2 (LGN faible) et Thm 1.6 (TCL) ; animations p. 13 et 18',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let n = 30
    let law: Law = 'exp'
    let tcl = true
    let seed = 1
    const M = 400
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const rng = makeRng(1000 + seed)
      const spec = LAWS[law]
      const means = new Array<number>(M)
      for (let m = 0; m < M; m++) {
        let s = 0
        for (let i = 0; i < n; i++) s += spec.draw(rng)
        means[m] = s / n
      }
      const traces: Record<string, unknown>[] = []
      const shapes: Record<string, unknown>[] = []
      let layout: Record<string, unknown>
      if (tcl) {
        const z = means.map((x) => (Math.sqrt(n) * (x - spec.mu)) / spec.sigma)
        const lo = law === 'cauchy' ? -6 : Math.min(-4, ...z)
        const hi = law === 'cauchy' ? 6 : Math.max(4, ...z)
        const h = histogram(z, 40, lo, hi)
        traces.push(barTrace(h.centers, h.density, 'histogramme de √n(X̄ₙ−μ)/σ', COLORS.blue, { width: h.width }))
        const xs = linspace(lo, hi, 200)
        traces.push(lineTrace(xs, xs.map((x) => normalPdf(x)), 'densité N(0,1)', COLORS.orange))
        layout = { title: `TCL : ${M} valeurs de √n(X̄ₙ−μ)/σ, n = ${n}, loi ${spec.label}`, xaxis: { title: '√n(X̄ₙ−μ)/σ', range: [lo, hi] }, yaxis: { title: 'densité' }, barmode: 'overlay' }
        const v = variance(z)
        info.innerHTML = richToHtml(
          law === 'cauchy'
            ? `**Échec du TCL.** La loi de Cauchy n’a pas de moment d’ordre 2 (ni même d’ordre 1) : l’hypothèse du Thm 1.6 n’est pas satisfaite. L’histogramme de $\\sqrt n(\\bar X_n-\\mu)/\\sigma$ (tracé sur $[-6,6]$) reste étalé et ne se rapproche pas de la gaussienne : en fait $\\bar X_n$ suit elle-même une loi de Cauchy quelle que soit la valeur de $n$. Variance empirique des ${M} valeurs : ${v.toFixed(2)} (au lieu de 1).`
            : `**TCL (Thm 1.6).** Sous $Q=${spec.tex}$, de moyenne $\\mu=${spec.mu}$ et de variance $\\sigma^2=${(spec.sigma ** 2).toFixed(4)}$, $\\sqrt n(\\bar X_n-\\mu)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\sigma^2)$. L’histogramme des ${M} valeurs renormalisées épouse la densité de $\\mathcal{N}(0,1)$ : variance empirique ${v.toFixed(3)} (attendu : 1). Pour la loi de Bernoulli, l’approximation est mauvaise aux petits $n$ (loi discrète, dissymétrique : cf. Berry-Esseen, compléments).`,
        )
      } else {
        const lo = law === 'cauchy' ? -6 : Math.min(...means)
        const hi = law === 'cauchy' ? 6 : Math.max(...means)
        const h = histogram(means, 40, lo, hi)
        traces.push(barTrace(h.centers, h.density, 'histogramme de X̄ₙ', COLORS.blue, { width: h.width }))
        if (law !== 'cauchy') {
          const xs = linspace(lo, hi, 200)
          traces.push(lineTrace(xs, xs.map((x) => normalPdf(x, spec.mu, spec.sigma / Math.sqrt(n))), 'densité N(μ, σ²/n)', COLORS.orange))
        }
        shapes.push(vline(spec.mu, COLORS.red, 'dash'))
        layout = { title: `LGN : ${M} valeurs de X̄ₙ, n = ${n}, loi ${spec.label}`, xaxis: { title: 'X̄ₙ' }, yaxis: { title: 'densité' }, shapes, barmode: 'overlay' }
        const eps = 0.1
        const out = means.filter((x) => Math.abs(x - spec.mu) > eps).length / M
        info.innerHTML = richToHtml(
          law === 'cauchy'
            ? `**Pas de loi des grands nombres** pour la loi de Cauchy : $\\bar X_n$ ne se concentre pas autour de 0 quand $n$ croît (fréquence hors de $[-0{,}1;0{,}1]$ : ${(100 * out).toFixed(0)} %). L’hypothèse de carré intégrable du Thm 1.2 (et même l’intégrabilité, Thm 4.2) est violée.`
            : `**LGN faible (Thm 1.2).** $\\bar X_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}\\mu=${spec.mu}$ (trait rouge) : la dispersion des ${M} valeurs se resserre comme $\\sigma/\\sqrt n=${(spec.sigma / Math.sqrt(n)).toFixed(3)}$. Fréquence empirique de $\\{|\\bar X_n-\\mu|>0{,}1\\}$ : ${(100 * out).toFixed(1)} % ; borne de Bienaymé-Tchebychev $\\sigma^2/(n\\varepsilon^2)=${Math.min(1, spec.sigma ** 2 / (n * eps * eps)).toFixed(3)}$. Moyenne des ${M} valeurs : ${mean(means).toFixed(3)}.`,
        )
      }
      handle.update(traces, layout)
    }

    controls.append(
      segmented<Law>(
        [
          { value: 'bern', label: 'Bernoulli' },
          { value: 'exp', label: 'Exponentielle' },
          { value: 'unif', label: 'Uniforme' },
          { value: 'cauchy', label: 'Cauchy' },
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
        min: 0,
        max: 3,
        step: 0.05,
        value: Math.log10(n),
        log: true,
        format: (v) => String(Math.round(v)),
        onChange: (v) => {
          n = Math.max(1, Math.round(v))
          draw()
        },
      }).root,
    )
    controls.append(
      toggle('échelle TCL : $\\sqrt n(\\bar X_n-\\mu)/\\sigma$', tcl, (v) => {
        tcl = v
        draw()
      }),
    )
    controls.append(
      button('Tirer 400 échantillons', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
