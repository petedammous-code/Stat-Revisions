import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, toggle, type SliderHandle } from '../../../core/ui'
import { plot, lineTrace, barTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, bernoulli, binomial, poisson, exponential, gamma, normal, uniform, student, chi2, type Rng } from '../../../sim/rng'
import { histogram, normalPdf, linspace, binomialPmf, poissonPmf, expPdf, gammaPdf, studentPdf, chi2Pdf, mean, variance } from '../../../sim/stats'

type Law = 'bern' | 'bin' | 'pois' | 'exp' | 'gamma' | 'gauss' | 'unif' | 'student' | 'chi2'

interface ParamSpec {
  key: string
  label: string
  min: number
  max: number
  step: number
  value: number
}

interface LawSpec {
  label: string
  discrete: boolean
  params: ParamSpec[]
  /** Densité (ou fonction de masse). */
  pdf: (x: number, p: Record<string, number>) => number
  draw: (rng: Rng, p: Record<string, number>) => number
  mean: (p: Record<string, number>) => number
  variance: (p: Record<string, number>) => number
  support: (p: Record<string, number>) => [number, number]
  tex: (p: Record<string, number>) => string
  densityTex: string
  comment: string
}

const fmt = (v: number) => (Number.isInteger(v) ? String(v) : v.toFixed(2).replace('.', ','))

const LAWS: Record<Law, LawSpec> = {
  bern: {
    label: 'Bernoulli',
    discrete: true,
    params: [{ key: 'theta', label: '$\\theta$', min: 0.02, max: 0.98, step: 0.01, value: 0.3 }],
    pdf: (x, p) => (x === 1 ? p.theta : x === 0 ? 1 - p.theta : 0),
    draw: (r, p) => bernoulli(r, p.theta),
    mean: (p) => p.theta,
    variance: (p) => p.theta * (1 - p.theta),
    support: () => [0, 1],
    tex: (p) => `\\mathcal{B}\\mathrm{er}(${fmt(p.theta)})`,
    densityTex: '\\mathbb{P}(\\{1\\})=\\theta,\\ \\mathbb{P}(\\{0\\})=1-\\theta',
    comment: 'Loi d’une observation du modèle de sondage (Ex. 1.4) ; densité $\\theta^x(1-\\theta)^{1-x}$ par rapport à la mesure de comptage sur $\\{0,1\\}$.',
  },
  bin: {
    label: 'Binomiale',
    discrete: true,
    params: [
      { key: 'n', label: '$n$', min: 1, max: 40, step: 1, value: 10 },
      { key: 'theta', label: '$\\theta$', min: 0.02, max: 0.98, step: 0.01, value: 0.3 },
    ],
    pdf: (x, p) => binomialPmf(x, p.n, p.theta),
    draw: (r, p) => binomial(r, p.n, p.theta),
    mean: (p) => p.n * p.theta,
    variance: (p) => p.n * p.theta * (1 - p.theta),
    support: (p) => [0, p.n],
    tex: (p) => `\\mathrm{Bin}(${p.n},${fmt(p.theta)})`,
    densityTex: '\\mathbb{P}(\\{k\\})=\\binom nk\\theta^k(1-\\theta)^{n-k}',
    comment: 'Loi du nombre de « piles » (Ex. 1.1) : modèle induit par $S_n=\\sum_iX_i$ dans le $n$-échantillon de Bernoulli (Ex. 1.12).',
  },
  pois: {
    label: 'Poisson',
    discrete: true,
    params: [{ key: 'lambda', label: '$\\lambda$', min: 0.2, max: 20, step: 0.1, value: 3 }],
    pdf: (x, p) => poissonPmf(x, p.lambda),
    draw: (r, p) => poisson(r, p.lambda),
    mean: (p) => p.lambda,
    variance: (p) => p.lambda,
    support: (p) => [0, Math.ceil(p.lambda + 4 * Math.sqrt(p.lambda) + 3)],
    tex: (p) => `\\mathcal{P}\\mathrm{oi}(${fmt(p.lambda)})`,
    densityTex: 'p_\\lambda(k)=e^{-\\lambda}\\frac{\\lambda^k}{k!}',
    comment: 'Comptage (Ex. 1.5, PC1 Ex. 1 et 5) ; densité par rapport à la mesure de comptage sur $\\mathbb{N}$ ; moyenne $=$ variance $=\\lambda$ (d’où le diagnostic de sur-dispersion de l’Exercice 5).',
  },
  exp: {
    label: 'Exponentielle',
    discrete: false,
    params: [{ key: 'lambda', label: '$\\lambda$ (intensité)', min: 0.2, max: 5, step: 0.1, value: 1 }],
    pdf: (x, p) => expPdf(x, p.lambda),
    draw: (r, p) => exponential(r, p.lambda),
    mean: (p) => 1 / p.lambda,
    variance: (p) => 1 / (p.lambda * p.lambda),
    support: (p) => [0, 6 / p.lambda],
    tex: (p) => `\\mathcal{E}(${fmt(p.lambda)})`,
    densityTex: 'q_\\lambda(x)=\\lambda e^{-\\lambda x}\\mathbb{1}_{\\mathbb{R}_+}(x)',
    comment: 'Temps d’attente sans mémoire (Ex. 1.3) ; **paramétrée par l’intensité** : moyenne $1/\\lambda$. C’est $\\mathrm{Gamma}(1,\\lambda)$.',
  },
  gamma: {
    label: 'Gamma',
    discrete: false,
    params: [
      { key: 'p', label: '$p$ (forme)', min: 0.5, max: 10, step: 0.5, value: 2 },
      { key: 'lambda', label: '$\\lambda$ (intensité)', min: 0.2, max: 5, step: 0.1, value: 1 },
    ],
    pdf: (x, p) => gammaPdf(x, p.p, p.lambda),
    draw: (r, p) => gamma(r, p.p, p.lambda),
    mean: (p) => p.p / p.lambda,
    variance: (p) => p.p / (p.lambda * p.lambda),
    support: (p) => [0, (p.p + 4 * Math.sqrt(p.p) + 1) / p.lambda],
    tex: (p) => `\\mathrm{Gamma}(${fmt(p.p)},${fmt(p.lambda)})`,
    densityTex: 'f_{p,\\lambda}(x)=\\frac{\\lambda^p}{\\Gamma(p)}e^{-\\lambda x}x^{p-1}\\mathbb{1}_{\\mathbb{R}_+^*}(x)',
    comment: 'Loi de $Z/\\lambda$ avec $Z\\sim\\mathrm{Gamma}(p)$ ; espérance $p/\\lambda$, variance $p/\\lambda^2$ ; **additivité** en $p$ à $\\lambda$ fixé (la somme de $n$ exponentielles $\\mathcal{E}(\\lambda)$ suit $\\mathrm{Gamma}(n,\\lambda)$).',
  },
  gauss: {
    label: 'Gaussienne',
    discrete: false,
    params: [
      { key: 'mu', label: '$\\mu$', min: -3, max: 3, step: 0.1, value: 0 },
      { key: 'sigma', label: '$\\sigma$', min: 0.2, max: 3, step: 0.1, value: 1 },
    ],
    pdf: (x, p) => normalPdf(x, p.mu, p.sigma),
    draw: (r, p) => normal(r, p.mu, p.sigma),
    mean: (p) => p.mu,
    variance: (p) => p.sigma * p.sigma,
    support: (p) => [p.mu - 4 * p.sigma, p.mu + 4 * p.sigma],
    tex: (p) => `\\mathcal{N}(${fmt(p.mu)},${fmt(p.sigma * p.sigma)})`,
    densityTex: 'g_{\\mu,\\sigma^2}(x)=\\frac{1}{\\sigma\\sqrt{2\\pi}}\\exp\\Big(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\Big)',
    comment: 'Loi de $\\sigma X_r+\\mu$ avec $X_r\\sim\\mathcal{N}(0,1)$ (Déf. 9) ; moments $\\mathbb{E}[X_r^4]=3$ ; le cas $\\sigma^2=0$ (Dirac) est autorisé par le poly mais n’a pas de densité.',
  },
  unif: {
    label: 'Uniforme',
    discrete: false,
    params: [{ key: 'theta', label: '$\\theta$', min: 0.5, max: 5, step: 0.1, value: 2 }],
    pdf: (x, p) => (x >= 0 && x <= p.theta ? 1 / p.theta : 0),
    draw: (r, p) => uniform(r, 0, p.theta),
    mean: (p) => p.theta / 2,
    variance: (p) => (p.theta * p.theta) / 12,
    support: (p) => [-0.2, p.theta + 0.2],
    tex: (p) => `\\mathcal{U}([0,${fmt(p.theta)}])`,
    densityTex: 'p_\\theta(x)=\\frac1\\theta\\mathbb{1}_{[0,\\theta]}(x)',
    comment: 'Attente d’un bus à horaire régulier (Ex. 1.3). Le **support dépend de $\\theta$** : modèle non régulier (chapitre 3), EMV $X_{(n)}$ (ch.2, Ex. 1.11 ; sa loi : Ex. 1.13).',
  },
  student: {
    label: 'Student',
    discrete: false,
    params: [{ key: 'r', label: '$r$ (degrés de liberté)', min: 1, max: 30, step: 1, value: 3 }],
    pdf: (x, p) => studentPdf(x, p.r),
    draw: (r, p) => student(r, p.r),
    mean: (p) => (p.r > 1 ? 0 : NaN),
    variance: (p) => (p.r > 2 ? p.r / (p.r - 2) : NaN),
    support: () => [-6, 6],
    tex: (p) => `t(${p.r})`,
    densityTex: 'f_r(t)=\\frac{\\Gamma(\\frac{r+1}2)}{\\Gamma(\\frac r2)\\sqrt{r\\pi}}\\Big(1+\\frac{t^2}r\\Big)^{-\\frac{r+1}2}',
    comment: 'Loi de $X/\\sqrt{Y/r}$, $X\\sim\\mathcal{N}(0,1)$ et $Y\\sim\\chi^2(r)$ indépendantes (Déf. 12) ; queues polynomiales, $t(1)$ = Cauchy (pas d’espérance) ; $t(r)\\to\\mathcal{N}(0,1)$ quand $r\\to\\infty$.',
  },
  chi2: {
    label: 'χ²',
    discrete: false,
    params: [{ key: 'nu', label: '$\\nu$ (degrés de liberté)', min: 1, max: 30, step: 1, value: 4 }],
    pdf: (x, p) => chi2Pdf(x, p.nu),
    draw: (r, p) => chi2(r, p.nu),
    mean: (p) => p.nu,
    variance: (p) => 2 * p.nu,
    support: (p) => [0, p.nu + 4 * Math.sqrt(2 * p.nu) + 2],
    tex: (p) => `\\chi^2(${p.nu})`,
    densityTex: 'f_\\nu(x)=\\frac{1}{2^{\\nu/2}\\Gamma(\\nu/2)}x^{\\nu/2-1}e^{-x/2}\\mathbb{1}_{\\mathbb{R}_+^*}(x)',
    comment: 'Loi de $\\sum_{i=1}^\\nu X_i^2$, $X_i$ i.i.d. $\\mathcal{N}(0,1)$ (Déf. 11) ; c’est $\\mathrm{Gamma}(\\nu/2,1/2)$ (Prop. 2.8) : espérance $\\nu$, variance $2\\nu$. Loi de $(n-1)S_n^2/\\sigma^2$ dans Gosset avec $\\nu=n-1$.',
  },
}

/** Lois usuelles : densite/fonction de masse avec curseurs, echantillon simule, gaussienne de memes moments superposee. */
export const vizLoisUsuelles: Viz = {
  id: 'ch1-lois-usuelles',
  title: 'Lois usuelles : densités, paramètres et échantillons simulés',
  description:
    'Choisir une loi (Bernoulli, binomiale, Poisson, exponentielle, Gamma, gaussienne, uniforme, Student, χ²) et régler ses paramètres : la densité (ou la fonction de masse) est tracée avec la convention du poly (exponentielle et Gamma **paramétrées par l’intensité**). Bouton « Tirer un échantillon » : histogramme de $n$ observations i.i.d. ; option : superposer la gaussienne de mêmes espérance et variance.',
  source: 'Poly ch.1, Outils « Lois usuelles » p. 25 ; Déf. 8–12 ; Prop. 2.8',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let law: Law = 'gauss'
    let params: Record<string, number> = {}
    let n = 200
    let showSample = true
    let showGauss = false
    let seed = 7
    const handle = plot(plotEl, [], {})
    const paramSliders: SliderHandle[] = []
    const paramArea = document.createElement('div')
    paramArea.className = 'viz-controls'

    const resetParams = () => {
      params = {}
      for (const p of LAWS[law].params) params[p.key] = p.value
    }

    const draw = () => {
      const spec = LAWS[law]
      const [lo, hi] = spec.support(params)
      const traces: Record<string, unknown>[] = []
      const rng = makeRng(100 + seed)
      let xs: number[] = []
      if (showSample) xs = Array.from({ length: n }, () => spec.draw(rng, params))
      if (spec.discrete) {
        const ks = Array.from({ length: hi - lo + 1 }, (_, i) => lo + i)
        if (showSample) {
          const counts = ks.map((k) => xs.filter((x) => x === k).length / n)
          traces.push(barTrace(ks, counts, 'fréquences observées (n = ' + n + ')', COLORS.blue, { width: 0.6 }))
        }
        traces.push({ x: ks, y: ks.map((k) => spec.pdf(k, params)), name: 'fonction de masse', type: 'scatter', mode: 'markers+lines', marker: { color: COLORS.orange, size: 8 }, line: { color: COLORS.orange, width: 1.5, dash: 'dot' } })
      } else {
        if (showSample) {
          const h = histogram(xs, 40, lo, hi)
          traces.push(barTrace(h.centers, h.density, 'histogramme (n = ' + n + ')', COLORS.blue, { width: h.width }))
        }
        const grid = linspace(lo + 1e-6, hi, 300)
        traces.push(lineTrace(grid, grid.map((x) => spec.pdf(x, params)), 'densité', COLORS.orange))
      }
      const m = spec.mean(params)
      const v = spec.variance(params)
      if (showGauss && Number.isFinite(m) && Number.isFinite(v) && v > 0) {
        const grid = linspace(lo, hi, 300)
        traces.push(lineTrace(grid, grid.map((x) => normalPdf(x, m, Math.sqrt(v))), 'gaussienne de mêmes moments', COLORS.green, { line: { color: COLORS.green, width: 2, dash: 'dash' } }))
      }
      handle.update(traces, {
        title: `Loi ${spec.label} : ${spec.params.map((p) => p.label.replace(/\$/g, '').replace(/\\/g, '') + ' = ' + fmt(params[p.key])).join(', ')}`,
        xaxis: { title: 'x', range: [lo - (spec.discrete ? 0.6 : 0), hi + (spec.discrete ? 0.6 : 0)] },
        yaxis: { title: spec.discrete ? 'probabilité' : 'densité' },
        barmode: 'overlay',
      })
      const moments = Number.isFinite(m) ? `Espérance $${fmt(m)}$, variance ${Number.isFinite(v) ? '$' + fmt(v) + '$' : 'infinie'}` : 'Pas d’espérance (queues trop lourdes)'
      const sampleTxt = showSample ? ` Échantillon : moyenne empirique $${xs.length ? mean(xs).toFixed(3) : '-'}$, variance empirique $${xs.length > 1 ? variance(xs).toFixed(3) : '-'}$.` : ''
      info.innerHTML = richToHtml(
        `**Loi $${spec.tex(params)}$.** Densité ${spec.discrete ? 'par rapport à la mesure de comptage' : 'par rapport à la mesure de Lebesgue'} : $${spec.densityTex}$. ${moments}.${sampleTxt}\n\n${spec.comment} Rappel (Ex. 1.5) : la densité est une **fonction**, la loi est la **mesure** obtenue en l’intégrant contre la mesure de référence ; la densité ne coïncide avec la probabilité d’un singleton que pour la mesure de comptage.`,
      )
    }

    const rebuildParams = () => {
      paramSliders.length = 0
      paramArea.innerHTML = ''
      for (const p of LAWS[law].params) {
        const s = slider({
          label: p.label,
          min: p.min,
          max: p.max,
          step: p.step,
          value: params[p.key],
          format: fmt,
          onChange: (v) => {
            params[p.key] = v
            draw()
          },
        })
        paramSliders.push(s)
        paramArea.append(s.root)
      }
    }

    controls.append(
      segmented<Law>(
        (Object.keys(LAWS) as Law[]).map((k) => ({ value: k, label: LAWS[k].label })),
        law,
        (v) => {
          law = v
          resetParams()
          rebuildParams()
          draw()
        },
      ),
    )
    controls.append(paramArea)
    controls.append(
      slider({
        label: '$n$ (taille de l’échantillon)',
        min: 1,
        max: 4,
        step: 0.1,
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
      toggle('afficher un échantillon simulé', showSample, (v) => {
        showSample = v
        draw()
      }),
    )
    controls.append(
      toggle('superposer la gaussienne de mêmes moments', showGauss, (v) => {
        showGauss = v
        draw()
      }),
    )
    controls.append(
      button('Tirer un échantillon', () => {
        seed++
        draw()
      }),
    )
    resetParams()
    rebuildParams()
    draw()
    return () => handle.destroy()
  },
}
