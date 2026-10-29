import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, barTrace, COLORS, hexToRgba } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, bernoulli, exponential, normal, uniform, type Rng } from '../../../sim/rng'
import { histogram, normalPdf, linspace, expPdf, mean } from '../../../sim/stats'

type Model = 'bern' | 'exp' | 'gauss' | 'unif'

interface ModelSpec {
  label: string
  thetaLabel: string
  min: number
  max: number
  step: number
  value: number
  /** Valeur « vraie » cachée (inconnue du statisticien) pour la simulation. */
  truth: number
  discrete: boolean
  pdf: (x: number, th: number) => number
  draw: (rng: Rng, th: number) => number
  support: (th: number) => [number, number]
  triplet: string
  loiTex: (th: number) => string
  estim: (xs: number[]) => number
  estimTex: string
}

const fmt = (v: number) => v.toFixed(2).replace('.', ',')

const MODELS: Record<Model, ModelSpec> = {
  bern: {
    label: 'Sondage (Bernoulli)',
    thetaLabel: '$\\theta$',
    min: 0.02,
    max: 0.98,
    step: 0.01,
    value: 0.5,
    truth: 0.3,
    discrete: true,
    pdf: (x, th) => (x === 1 ? th : 1 - th),
    draw: (r, th) => bernoulli(r, th),
    support: () => [0, 1],
    triplet: '\\big(\\{0,1\\}^n,\\ \\mathcal{P}(\\{0,1\\}^n),\\ \\{\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n},\\ \\theta\\in[0,1]\\}\\big)',
    loiTex: (th) => `\\mathcal{B}\\mathrm{er}(${fmt(th)})`,
    estim: (xs) => mean(xs),
    estimTex: '\\hat\\theta_n=\\bar X_n',
  },
  exp: {
    label: 'Temps d’attente (exponentielle)',
    thetaLabel: '$\\lambda$ (intensité)',
    min: 0.2,
    max: 4,
    step: 0.05,
    value: 1,
    truth: 2,
    discrete: false,
    pdf: (x, th) => expPdf(x, th),
    draw: (r, th) => exponential(r, th),
    support: () => [0, 4],
    triplet: '\\big(\\mathbb{R}_+^n,\\ \\mathcal{B}(\\mathbb{R}_+^n),\\ \\{\\mathcal{E}(\\lambda)^{\\otimes n},\\ \\lambda>0\\}\\big)',
    loiTex: (th) => `\\mathcal{E}(${fmt(th)})`,
    estim: (xs) => 1 / mean(xs),
    estimTex: '\\hat\\lambda_n=1/\\bar X_n',
  },
  gauss: {
    label: 'Tailles (gaussienne, σ² = 1)',
    thetaLabel: '$\\mu$',
    min: -3,
    max: 3,
    step: 0.05,
    value: 0,
    truth: 1.2,
    discrete: false,
    pdf: (x, th) => normalPdf(x, th, 1),
    draw: (r, th) => normal(r, th, 1),
    support: () => [-5, 6],
    triplet: '\\big(\\mathbb{R}^n,\\ \\mathcal{B}(\\mathbb{R}^n),\\ \\{\\mathcal{N}(\\mu\\mathbf{1}_n,\\mathrm{I}_n),\\ \\mu\\in\\mathbb{R}\\}\\big)',
    loiTex: (th) => `\\mathcal{N}(${fmt(th)},1)`,
    estim: (xs) => mean(xs),
    estimTex: '\\hat\\mu_n=\\bar X_n',
  },
  unif: {
    label: 'Bus (uniforme sur [0, θ])',
    thetaLabel: '$\\theta$',
    min: 0.5,
    max: 5,
    step: 0.05,
    value: 3,
    truth: 2,
    discrete: false,
    pdf: (x, th) => (x >= 0 && x <= th ? 1 / th : 0),
    draw: (r, th) => uniform(r, 0, th),
    support: () => [0, 5.2],
    triplet: '\\big(\\mathbb{R}_+^n,\\ \\mathcal{B}(\\mathbb{R}_+^n),\\ \\{\\mathcal{U}([0,\\theta])^{\\otimes n},\\ \\theta>0\\}\\big)',
    loiTex: (th) => `\\mathcal{U}([0,${fmt(th)}])`,
    estim: (xs) => Math.max(...xs),
    estimTex: '\\hat\\theta_n=X_{(n)}',
  },
}

/** Un modele = une famille de lois : courbe p_theta pour theta choisi, famille en filigrane, echantillon issu d'un theta inconnu. */
export const vizModeleFamille: Viz = {
  id: 'ch1-modele-famille',
  title: 'Un modèle statistique = un espace d’observations et une famille de lois',
  description:
    'Les données (histogramme bleu) sont tirées sous une valeur **inconnue** du paramètre. Le curseur $\\theta$ parcourt la famille $\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\}$ : chaque position est une **hypothèse** sur le mécanisme qui a produit les données (courbe orange ; la famille entière est esquissée en gris). Choisir le modèle (sondage, temps d’attente, tailles, bus), la taille $n$, tirer un nouvel échantillon, et comparer avec l’estimateur naturel. Reprend l’animation du poly (p. 10).',
  source: 'Poly ch.1, Déf. 1.1, Ex. 1.1–1.4 et encart « Intuition » p. 10',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let model: Model = 'exp'
    let theta = MODELS[model].value
    let n = 100
    let seed = 1
    let thetaSlider: ReturnType<typeof slider> | null = null
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const spec = MODELS[model]
      const rng = makeRng(500 + seed)
      const xs = Array.from({ length: n }, () => spec.draw(rng, spec.truth))
      const [lo, hi] = spec.support(theta)
      const traces: Record<string, unknown>[] = []
      if (spec.discrete) {
        const freq1 = xs.filter((x) => x === 1).length / n
        traces.push(barTrace([0, 1], [1 - freq1, freq1], 'fréquences observées', COLORS.blue, { width: 0.5 }))
        for (const th of [0.1, 0.3, 0.5, 0.7, 0.9]) {
          traces.push({ x: [0, 1], y: [1 - th, th], name: 'famille', type: 'scatter', mode: 'markers', marker: { color: hexToRgba(COLORS.gray, 0.35), size: 6 }, showlegend: th === 0.1 })
        }
        traces.push({ x: [0, 1], y: [1 - theta, theta], name: 'P_θ pour le θ choisi', type: 'scatter', mode: 'markers+lines', marker: { color: COLORS.orange, size: 10 }, line: { color: COLORS.orange, dash: 'dot' } })
      } else {
        const h = histogram(xs, 30, lo, hi)
        traces.push(barTrace(h.centers, h.density, 'histogramme des données', COLORS.blue, { width: h.width }))
        const grid = linspace(lo + 1e-6, hi, 400)
        const fam = linspace(spec.min, spec.max, 7)
        fam.forEach((th, i) => {
          traces.push(lineTrace(grid, grid.map((x) => spec.pdf(x, th)), 'famille {p_θ}', hexToRgba(COLORS.gray, 0.35), { line: { color: hexToRgba(COLORS.gray, 0.35), width: 1 }, showlegend: i === 0 }))
        })
        traces.push(lineTrace(grid, grid.map((x) => spec.pdf(x, theta)), 'p_θ pour le θ choisi', COLORS.orange))
      }
      let ymax = 1.05
      if (!spec.discrete) {
        const h = histogram(xs, 30, lo, hi)
        const grid = linspace(lo + 1e-6, hi, 400)
        ymax = 1.25 * Math.max(...h.density, ...grid.map((x) => spec.pdf(x, theta)), ...grid.map((x) => spec.pdf(x, spec.truth)))
      }
      handle.update(traces, {
        title: `${spec.label} : n = ${n}, θ choisi = ${fmt(theta)}`,
        xaxis: { title: 'x', range: spec.discrete ? [-0.6, 1.6] : [lo, hi] },
        yaxis: { title: spec.discrete ? 'probabilité' : 'densité', range: [0, ymax] },
        barmode: 'overlay',
      })
      const est = spec.estim(xs)
      info.innerHTML = richToHtml(
        `**Modèle** $${spec.triplet}$ : l’espace des observations ne change pas quand $\\theta$ bouge ; seule la **loi** change. La courbe orange est $${spec.loiTex(theta)}$, l’hypothèse « les données ont été produites par $\\mathbb{P}_\\theta$ avec $\\theta=${fmt(theta)}$ ». Les gris sont d’autres membres de la même famille.\n\n**Problème inverse** (§1.3) : en probabilités, la loi est connue et on calcule ; en statistique, on observe une réalisation et on cherche quel $\\theta$ est plausible. Ici l’estimateur $${spec.estimTex}$ vaut $${est.toFixed(3)}$ pour cet échantillon (la vraie valeur est cachée : déplacez $\\theta$ jusqu’à ce que la courbe épouse l’histogramme). Plus la famille est grande, moins on fait d’hypothèses, mais moins la réponse est précise.`,
      )
    }

    const rebuildThetaSlider = () => {
      const spec = MODELS[model]
      const s = slider({
        label: spec.thetaLabel,
        min: spec.min,
        max: spec.max,
        step: spec.step,
        value: theta,
        format: fmt,
        onChange: (v) => {
          theta = v
          draw()
        },
      })
      if (thetaSlider) controls.replaceChild(s.root, thetaSlider.root)
      else controls.append(s.root)
      thetaSlider = s
    }

    controls.append(
      segmented<Model>(
        (Object.keys(MODELS) as Model[]).map((k) => ({ value: k, label: MODELS[k].label })),
        model,
        (v) => {
          model = v
          theta = MODELS[model].value
          rebuildThetaSlider()
          draw()
        },
      ),
    )
    rebuildThetaSlider()
    controls.append(
      slider({
        label: '$n$',
        min: 1,
        max: 3,
        step: 0.1,
        value: Math.log10(n),
        log: true,
        format: (v) => String(Math.round(v)),
        onChange: (v) => {
          n = Math.max(5, Math.round(v))
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
    return () => handle.destroy()
  },
}
