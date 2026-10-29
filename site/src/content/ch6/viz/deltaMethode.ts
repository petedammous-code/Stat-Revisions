import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, el } from '../../../core/ui'
import { plot, lineTrace, barTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential, type Rng } from '../../../sim/rng'
import { histogram, normalPdf, linspace, chi2Pdf, variance } from '../../../sim/stats'

type G = 'square' | 'exp' | 'inv'

interface GSpec {
  label: string
  tex: string
  g: (x: number) => number
  dg: (x: number) => number
  /** Loi des observations (moyenne mu, variance sigma2) et tirage. */
  lawTex: string
  sigma2: (mu: number) => number
  draw: (rng: Rng, mu: number) => number
  muMin: number
  muMax: number
  muDefault: number
}

const SPECS: Record<G, GSpec> = {
  square: {
    label: 'g(x) = x²',
    tex: 'g(x)=x^2',
    g: (x) => x * x,
    dg: (x) => 2 * x,
    lawTex: '\\mathcal{N}(\\mu,1)',
    sigma2: () => 1,
    draw: (r, mu) => normal(r, mu, 1),
    muMin: -1.5,
    muMax: 1.5,
    muDefault: 1,
  },
  exp: {
    label: 'g(x) = e^{−x}',
    tex: 'g(x)=e^{-x}',
    g: (x) => Math.exp(-x),
    dg: (x) => -Math.exp(-x),
    lawTex: '\\mathcal{N}(\\mu,1)',
    sigma2: () => 1,
    draw: (r, mu) => normal(r, mu, 1),
    muMin: -1,
    muMax: 3,
    muDefault: 1,
  },
  inv: {
    label: 'g(x) = 1/x (EMV exponentiel)',
    tex: 'g(x)=1/x',
    g: (x) => 1 / x,
    dg: (x) => -1 / (x * x),
    lawTex: '\\mathcal{E}(1/\\mu)',
    sigma2: (mu) => mu * mu,
    draw: (r, mu) => exponential(r, 1 / mu),
    muMin: 0.5,
    muMax: 3,
    muDefault: 1,
  },
}

/** Methode-delta : linearisation de g autour de mu et loi limite de sqrt(n)(g(X̄n) - g(mu)). */
export const vizDeltaMethode: Viz = {
  id: 'ch6-delta-methode',
  title: 'Méthode-δ : linéariser g autour de μ, cas dégénéré (dérivée nulle)',
  description:
    'À gauche : la courbe de $g$, sa tangente en $\\mu$ et $200$ points $(\\bar X_n,g(\\bar X_n))$. À droite : l’histogramme de $\\sqrt n\\,(g(\\bar X_n)-g(\\mu))$ sur $2000$ répétitions et la densité $\\mathcal{N}(0,\\dot g(\\mu)^2\\sigma^2)$ prédite par le Thm 1.7. Curseur $\\mu$ : pour $g(x)=x^2$, amener $\\mu$ en $0$ montre le cas dégénéré ($\\dot g(0)=0$) : la bonne échelle devient $n$ et la loi limite $\\sigma^2\\chi^2(1)$ (Ex. 1.8).',
  source: 'Poly ch.6, Thm 1.7 (méthode-δ scalaire), Ex. 1.7 et Ex. 1.8',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    const left = el('div')
    const right = el('div')
    left.style.minHeight = '320px'
    right.style.minHeight = '320px'
    plotEl.style.display = 'grid'
    plotEl.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))'
    plotEl.style.gap = '8px'
    plotEl.append(left, right)
    const hLeft = plot(left, [], {})
    const hRight = plot(right, [], {})

    let kind: G = 'square'
    let mu = SPECS[kind].muDefault
    let n = 50
    let seed = 3
    let muSlider: ReturnType<typeof slider> | null = null

    const draw = () => {
      const spec = SPECS[kind]
      const rng = makeRng(2000 + seed)
      const M = 2000
      const means = new Array<number>(M)
      for (let m = 0; m < M; m++) {
        let s = 0
        for (let i = 0; i < n; i++) s += spec.draw(rng, mu)
        means[m] = s / n
      }
      const sigma2 = spec.sigma2(mu)
      const sigma = Math.sqrt(sigma2)
      const dg = spec.dg(mu)
      const degenerate = Math.abs(dg) < 0.15 && kind === 'square'
      // --- figure de gauche : g, tangente, points
      const half = 3.5 * sigma / Math.sqrt(n)
      const lo = kind === 'inv' ? Math.max(0.05, mu - Math.max(half, 0.6)) : mu - Math.max(half, 0.8)
      const hi = mu + Math.max(half, kind === 'inv' ? 0.6 : 0.8)
      const xs = linspace(lo, hi, 200)
      const gmu = spec.g(mu)
      const tracesL: Record<string, unknown>[] = [
        lineTrace(xs, xs.map(spec.g), spec.label, COLORS.blue),
        lineTrace(xs, xs.map((x) => gmu + dg * (x - mu)), 'tangente en μ', COLORS.orange, { line: { dash: 'dash', color: COLORS.orange, width: 2 } }),
        pointsTrace(means.slice(0, 200), means.slice(0, 200).map(spec.g), '(X̄ₙ, g(X̄ₙ))', COLORS.green, { marker: { color: COLORS.green, size: 5, opacity: 0.5 } }),
      ]
      hLeft.update(tracesL, { title: `g et sa tangente en μ = ${mu.toFixed(2)}`, xaxis: { title: 'x', range: [lo, hi] }, yaxis: { title: 'g(x)' }, shapes: [vline(mu, COLORS.red, 'dot')] })
      // --- figure de droite : histogramme
      let tracesR: Record<string, unknown>[]
      let title: string
      let text: string
      if (degenerate && Math.abs(dg) < 1e-9) {
        const z = means.map((x) => (n * (spec.g(x) - gmu)) / sigma2)
        const h = histogram(z, 40, 0, 8)
        const grid = linspace(0.02, 8, 300)
        tracesR = [barTrace(h.centers, h.density, 'n(X̄ₙ²−μ²)/σ²', COLORS.blue, { width: h.width }), lineTrace(grid, grid.map((x) => chi2Pdf(x, 1)), 'densité χ²(1)', COLORS.orange)]
        title = `Cas dégénéré : n·g(X̄ₙ)/σ² (échelle n), n = ${n}`
        text = `**Cas dégénéré (Ex. 1.8).** Ici $\\mu=0$ et $\\dot g(0)=2\\mu=0$ : la méthode-δ ne donne que $\\sqrt n\\,\\bar X_n^2\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0$, une limite dégénérée. La bonne échelle est $r_n^2=n$ : par **transformation continue** (Thm 1.4) avec $x\\mapsto x^2$, $\\sigma^{-2}n\\bar X_n^2=(\\sigma^{-1}\\sqrt n\\bar X_n)^2\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\chi^2(1)$ : la loi limite n’est **pas gaussienne** (même phénomène : CC 2022 Ex. 2 Q7).`
      } else {
        const z = means.map((x) => Math.sqrt(n) * (spec.g(x) - gmu))
        const sd = Math.abs(dg) * sigma
        const range = degenerate ? Math.max(4 * sd, 1.5) : 4.5 * sd
        const h = histogram(z, 40, -range, range)
        const grid = linspace(-range, range, 300)
        tracesR = [barTrace(h.centers, h.density, '√n(g(X̄ₙ)−g(μ))', COLORS.blue, { width: h.width })]
        if (sd > 0) tracesR.push(lineTrace(grid, grid.map((x) => normalPdf(x, 0, sd)), 'densité N(0, ġ(μ)²σ²)', COLORS.orange))
        title = `√n(g(X̄ₙ)−g(μ)) sur 2000 répétitions, n = ${n}`
        const v = variance(z)
        text = degenerate
          ? `**Approche du cas dégénéré.** $\\dot g(\\mu)=${dg.toFixed(2)}$ est petit : la variance limite $\\dot g(\\mu)^2\\sigma^2=${(sd * sd).toFixed(3)}$ est presque nulle et l’histogramme est dissymétrique (le terme de reste $r_n(T_n-\\theta)\\varepsilon(T_n-\\theta)$ n’est pas encore négligeable à ce $n$). Variance empirique : ${v.toFixed(3)}. Amenez $\\mu$ exactement en $0$ pour voir l’échelle $n$ et la loi $\\chi^2(1)$.`
          : `**Thm 1.7.** Observations de loi $${spec.lawTex}$ : par le TCL, $\\sqrt n(\\bar X_n-\\mu)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\sigma^2)$ avec $\\sigma^2=${sigma2.toFixed(3)}$. Avec $${spec.tex}$ dérivable en $\\mu=${mu.toFixed(2)}$, $\\dot g(\\mu)=${dg.toFixed(3)}$, la méthode-δ donne $\\sqrt n(g(\\bar X_n)-g(\\mu))\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\dot g(\\mu)^2\\sigma^2)$, variance ${(sd * sd).toFixed(3)} ; variance empirique des $2000$ valeurs : ${v.toFixed(3)}. Géométriquement : à l’échelle $1/\\sqrt n$, $g$ se confond avec sa tangente, et la gaussienne est simplement **dilatée du facteur $|\\dot g(\\mu)|$**.${kind === 'inv' ? ' C’est l’Ex. 1.7 : $\\hat\\theta_n=1/\\bar X_n$ pour $\\mathcal{E}(\\theta)$, $\\theta=1/\\mu$, variance asymptotique $\\theta^2$.' : ''}`
      }
      hRight.update(tracesR, { title, xaxis: { title: 'valeur' }, yaxis: { title: 'densité' }, barmode: 'overlay' })
      info.innerHTML = richToHtml(text)
    }

    const rebuildMuSlider = () => {
      const spec = SPECS[kind]
      const s = slider({
        label: '$\\mu$',
        min: spec.muMin,
        max: spec.muMax,
        step: 0.05,
        value: mu,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          mu = Math.abs(v) < 1e-9 ? 0 : v
          draw()
        },
      })
      if (muSlider) controls.replaceChild(s.root, muSlider.root)
      else controls.append(s.root)
      muSlider = s
    }

    controls.append(
      segmented<G>(
        [
          { value: 'square', label: '$g(x)=x^2$' },
          { value: 'exp', label: '$g(x)=e^{-x}$' },
          { value: 'inv', label: '$g(x)=1/x$' },
        ],
        kind,
        (v) => {
          kind = v
          mu = SPECS[kind].muDefault
          rebuildMuSlider()
          draw()
        },
      ),
    )
    rebuildMuSlider()
    controls.append(
      slider({
        label: '$n$',
        min: 10,
        max: 500,
        step: 10,
        value: n,
        onChange: (v) => {
          n = v
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer', () => {
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
