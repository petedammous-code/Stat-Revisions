import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, barTrace, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential, uniform, type Rng } from '../../../sim/rng'
import { histogram, linspace, chi2Pdf, studentPdf, normalPdf, mean, variance } from '../../../sim/stats'

type Law = 'gauss' | 'exp' | 'unif'
type View = 'chi2' | 'student' | 'moyenne'

interface LawSpec {
  label: string
  tex: string
  mu: number
  sigma2: number
  draw: (rng: Rng) => number
}

const LAWS: Record<Law, LawSpec> = {
  gauss: { label: 'Gaussienne N(1, 1)', tex: '\\mathcal{N}(1,1)', mu: 1, sigma2: 1, draw: (r) => normal(r, 1, 1) },
  exp: { label: 'Exponentielle E(1)', tex: '\\mathcal{E}(1)', mu: 1, sigma2: 1, draw: (r) => exponential(r, 1) },
  unif: { label: 'Uniforme U([0, 2])', tex: '\\mathcal{U}([0,2])', mu: 1, sigma2: 1 / 3, draw: (r) => uniform(r, 0, 2) },
}

/** Gosset : nuage (X̄n, S²n) sans dependance, histogramme de (n-1)S²/σ² vs χ²(n-1), de Tn vs t(n-1) — uniquement pour un bruit gaussien. */
export const vizGosset: Viz = {
  id: 'ch1-gosset',
  title: 'Théorème de Gosset : indépendance de X̄ₙ et S²ₙ, lois χ²(n−1) et t(n−1)',
  description:
    'Sur $M=3000$ échantillons de taille $n$, à gauche le nuage des couples $(\\bar X_n,S_n^2)$ avec sa corrélation empirique ; à droite, au choix, l’histogramme de $(n-1)S_n^2/\\sigma^2$ contre la densité $\\chi^2(n-1)$, de $T_n=\\sqrt n(\\bar X_n-\\mu)/S_n$ contre $t(n-1)$, ou de $\\bar X_n$ contre $\\mathcal{N}(\\mu,\\sigma^2/n)$. Changer la loi des observations : pour un bruit exponentiel ou uniforme, le nuage se déforme et les histogrammes décrochent — Gosset est propre au modèle gaussien.',
  source: 'Poly ch.1, Thm 1.3 (Gosset), Ex. 1.11, Ex. 1.14 ; animation p. 21',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let law: Law = 'gauss'
    let view: View = 'chi2'
    let n = 5
    let seed = 2
    const M = 3000
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})

    const draw = () => {
      const spec = LAWS[law]
      const rng = makeRng(400 + seed)
      const means = new Array<number>(M)
      const vars = new Array<number>(M)
      const ts = new Array<number>(M)
      for (let m = 0; m < M; m++) {
        let s = 0
        let s2 = 0
        for (let i = 0; i < n; i++) {
          const x = spec.draw(rng)
          s += x
          s2 += x * x
        }
        const mu = s / n
        const v = (s2 - n * mu * mu) / (n - 1)
        means[m] = mu
        vars[m] = Math.max(v, 0)
        ts[m] = (Math.sqrt(n) * (mu - spec.mu)) / Math.sqrt(Math.max(v, 1e-12))
      }
      const mm = mean(means)
      const mv = mean(vars)
      let cov = 0
      for (let m = 0; m < M; m++) cov += (means[m] - mm) * (vars[m] - mv)
      cov /= M - 1
      const corr = cov / Math.sqrt(variance(means) * variance(vars))
      const show = 1200
      hLeft.update([pointsTrace(means.slice(0, show), vars.slice(0, show), '(X̄ₙ, S²ₙ)', COLORS.blue, { marker: { color: COLORS.blue, size: 4, opacity: 0.45 } })], {
        title: `Nuage (X̄ₙ, S²ₙ), n = ${n} : corrélation empirique ${corr.toFixed(3)}`,
        xaxis: { title: 'X̄ₙ' },
        yaxis: { title: 'S²ₙ' },
      })
      let traces: Record<string, unknown>[]
      let title: string
      if (view === 'chi2') {
        const z = vars.map((v) => ((n - 1) * v) / spec.sigma2)
        const hi = Math.max(n - 1 + 4 * Math.sqrt(2 * (n - 1)) + 2, 6)
        const h = histogram(z, 40, 0, hi)
        const grid = linspace(0.02, hi, 300)
        traces = [barTrace(h.centers, h.density, '(n−1)S²ₙ/σ²', COLORS.blue, { width: h.width }), lineTrace(grid, grid.map((x) => chi2Pdf(x, n - 1)), `densité χ²(${n - 1})`, COLORS.orange)]
        title = `(n−1)S²ₙ/σ² : moyenne ${mean(z).toFixed(2)} (attendu ${n - 1}), variance ${variance(z).toFixed(2)} (attendu ${2 * (n - 1)})`
      } else if (view === 'student') {
        const h = histogram(ts, 50, -6, 6)
        const grid = linspace(-6, 6, 400)
        traces = [barTrace(h.centers, h.density, 'Tₙ = √n(X̄ₙ−μ)/Sₙ', COLORS.blue, { width: h.width }), lineTrace(grid, grid.map((x) => studentPdf(x, n - 1)), `densité t(${n - 1})`, COLORS.orange), lineTrace(grid, grid.map((x) => normalPdf(x)), 'densité N(0,1)', COLORS.gray, { line: { color: COLORS.gray, width: 1.5, dash: 'dot' } })]
        const out = ts.filter((t) => Math.abs(t) > 3).length / M
        title = `Tₙ : fréquence de |Tₙ| > 3 : ${(100 * out).toFixed(1)} %`
      } else {
        const sd = Math.sqrt(spec.sigma2 / n)
        const h = histogram(means, 40, spec.mu - 4.5 * sd, spec.mu + 4.5 * sd)
        const grid = linspace(spec.mu - 4.5 * sd, spec.mu + 4.5 * sd, 300)
        traces = [barTrace(h.centers, h.density, 'X̄ₙ', COLORS.blue, { width: h.width }), lineTrace(grid, grid.map((x) => normalPdf(x, spec.mu, sd)), 'densité N(μ, σ²/n)', COLORS.orange)]
        title = `X̄ₙ : moyenne ${mm.toFixed(3)}, variance ${variance(means).toFixed(4)} (attendu σ²/n = ${(spec.sigma2 / n).toFixed(4)})`
      }
      hRight.update(traces, { title, xaxis: { title: 'valeur' }, yaxis: { title: 'densité' }, barmode: 'overlay' })
      info.innerHTML = richToHtml(
        law === 'gauss'
          ? `**Théorème de Gosset (Thm 1.3)**, $X_1,\\dots,X_n$ i.i.d. $${spec.tex}$, $n=${n}\\ge2$ : (i) $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$ ; (ii) $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ ; (iii) $\\bar X_n$ et $S_n^2$ sont **indépendantes** (nuage sans structure, corrélation $${corr.toFixed(3)}$) ; (iv) $T_n=\\sqrt n(\\bar X_n-\\mu)/S_n\\sim t(n-1)$. Preuve : Cochran sur $\\mathbb{R}^n=\\mathbb{R}\\mathbf{1}_n\\oplus(\\mathbb{R}\\mathbf{1}_n)^\\perp$ : $P_FX=\\bar X_n\\mathbf{1}_n$ et $\\|P_{F^\\perp}X\\|^2=(n-1)S_n^2$ vivent dans des sous-espaces orthogonaux, d’où $n-1$ degrés de liberté et l’indépendance. La loi $t(n-1)$ a des queues plus lourdes que $\\mathcal{N}(0,1)$ (pointillé gris), d’autant plus que $n$ est petit.`
          : `**Hors du modèle gaussien, Gosset est faux.** Observations $${spec.tex}$ : le nuage $(\\bar X_n,S_n^2)$ montre une dépendance (corrélation $${corr.toFixed(3)}$ ; pour une loi dissymétrique, une grande moyenne va avec une grande variance), $(n-1)S_n^2/\\sigma^2$ ne suit pas $\\chi^2(n-1)$ et $T_n$ ne suit pas $t(n-1)$ à $n$ fixé. L’indépendance de $\\bar X_n$ et $S_n^2$ **caractérise** même la loi gaussienne parmi les lois à variance finie (théorème de Lukacs, 1942). Seule la loi **asymptotique** de $T_n$ (chapitre 6, Ex. 1.14) redevient universelle : $\\mathcal{N}(0,1)$ quand $n\\to\\infty$.`,
      )
    }

    controls.append(
      segmented<Law>(
        (Object.keys(LAWS) as Law[]).map((k) => ({ value: k, label: LAWS[k].label })),
        law,
        (v) => {
          law = v
          draw()
        },
      ),
    )
    controls.append(
      segmented<View>(
        [
          { value: 'chi2', label: '$(n-1)S_n^2/\\sigma^2$ vs $\\chi^2(n-1)$' },
          { value: 'student', label: '$T_n$ vs $t(n-1)$' },
          { value: 'moyenne', label: '$\\bar X_n$ vs $\\mathcal{N}(\\mu,\\sigma^2/n)$' },
        ],
        view,
        (v) => {
          view = v
          draw()
        },
      ),
    )
    controls.append(slider({ label: '$n$', min: 2, max: 60, step: 1, value: n, onChange: (v) => { n = v; draw() } }).root)
    controls.append(button('Tirer 3000 échantillons', () => { seed++; draw() }))
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
