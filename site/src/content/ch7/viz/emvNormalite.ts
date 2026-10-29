import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, type SliderHandle } from '../../../core/ui'
import { plot, lineTrace, barTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, poisson, gamma, normal, cauchy, type Rng } from '../../../sim/rng'
import { normalPdf, linspace } from '../../../sim/stats'
import { histDensity, cauchyMle, meanOf, varOf, fr } from './common'

type Model = 'poisson' | 'gamma2' | 'lognorm' | 'cauchy'

interface ModelSpec {
  label: string
  tex: string
  emvTex: string
  infoTex: string
  min: number
  max: number
  def: number
  /** Information de Fisher d'une observation. */
  fisher: (t: number) => number
  /** Simule un échantillon et renvoie l'EMV. */
  emv: (rng: Rng, n: number, t: number) => number
  source: string
}

const MODELS: Record<Model, ModelSpec> = {
  poisson: {
    label: 'Poisson',
    tex: '\\mathcal{P}\\mathrm{oi}(\\theta)',
    emvTex: '\\hat\\theta_n^{\\mathrm{MV}}=\\bar X_n',
    infoTex: '\\mathbb{I}(\\theta)=1/\\theta',
    min: 0.5,
    max: 6,
    def: 2,
    fisher: (t) => 1 / t,
    emv: (r, n, t) => {
      let s = 0
      for (let i = 0; i < n; i++) s += poisson(r, t)
      return s / n
    },
    source: 'Poly ch.7, Ex. 1.7–1.8',
  },
  gamma2: {
    label: 'Gamma(2, θ)',
    tex: '\\Gamma(2,\\theta)',
    emvTex: '\\hat\\theta_n=2/\\bar X_n',
    infoTex: '\\mathbb{I}(\\theta)=2/\\theta^2',
    min: 0.5,
    max: 5,
    def: 2,
    fisher: (t) => 2 / (t * t),
    emv: (r, n, t) => {
      let s = 0
      for (let i = 0; i < n; i++) s += gamma(r, 2, t)
      return (2 * n) / s
    },
    source: 'PC7 Ex. 2',
  },
  lognorm: {
    label: 'Log-normale (θ, θ)',
    tex: 'LN(\\theta,\\theta)',
    emvTex: '\\hat\\theta_n=-\\tfrac12+\\sqrt{\\tfrac14+\\tfrac1n\\sum_iY_i^2}',
    infoTex: '\\mathbb{I}(\\theta)=\\frac{1+2\\theta}{2\\theta^2}',
    min: 0.2,
    max: 3,
    def: 1,
    fisher: (t) => (1 + 2 * t) / (2 * t * t),
    emv: (r, n, t) => {
      let s = 0
      const sd = Math.sqrt(t)
      for (let i = 0; i < n; i++) {
        const y = normal(r, t, sd)
        s += y * y
      }
      return -0.5 + Math.sqrt(0.25 + s / n)
    },
    source: 'PC7 Ex. 3',
  },
  cauchy: {
    label: 'Cauchy (translation)',
    tex: '\\text{Cauchy}(\\theta,1)',
    emvTex: '\\hat\\theta_n^{\\mathrm{MV}}\\ \\text{(calcul numerique)}',
    infoTex: '\\mathbb{I}(\\theta)=1/2',
    min: -2,
    max: 4,
    def: 2,
    fisher: () => 0.5,
    emv: (r, n, t) => {
      const xs = new Array<number>(n)
      for (let i = 0; i < n; i++) xs[i] = cauchy(r, t, 1)
      return cauchyMle(xs)
    },
    source: 'Poly ch.7, Ex. 1.9 et §4.8',
  },
}

/** Normalité asymptotique de l'EMV : histogramme de √n(θ̂ − θ⋆) contre N(0, 1/𝕀(θ⋆)). */
export const vizEmvNormalite: Viz = {
  id: 'ch7-emv-normalite',
  title: 'Normalité asymptotique de l’EMV : √n(θ̂ₙ − θ⋆) contre N(0, 1/𝕀(θ⋆))',
  description:
    'Pour un modèle au choix, on simule $R$ échantillons de taille $n$ sous $\\mathbb{P}_{n,\\theta^\\star}$, on calcule l’EMV et on trace l’histogramme de $\\sqrt n(\\hat\\theta_n^{\\mathrm{MV}}-\\theta^\\star)$ avec la densité de $\\mathcal{N}(0,1/\\mathbb{I}(\\theta^\\star))$ (Thm 1.6). Curseurs $n$ et $\\theta^\\star$, bouton « Tirer ». Pour Cauchy, l’EMV n’a pas de forme explicite : il est calculé par score de Fisher itéré depuis la médiane.',
  source: 'Poly ch.7, Thm 1.6–1.7, Ex. 1.8–1.9 ; PC7 Ex. 2–3',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let model: Model = 'gamma2'
    let n = 50
    let theta = MODELS[model].def
    let seed = 1
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const spec = MODELS[model]
      const R = model === 'cauchy' ? 500 : 1500
      const rng = makeRng(31000 + seed * 97 + Math.round(theta * 100))
      const z = new Array<number>(R)
      for (let r = 0; r < R; r++) z[r] = Math.sqrt(n) * (spec.emv(rng, n, theta) - theta)
      const v = 1 / spec.fisher(theta)
      const sd = Math.sqrt(v)
      const lo = -4.5 * sd
      const hi = 4.5 * sd
      const h = histDensity(z, 45, lo, hi)
      const xs = linspace(lo, hi, 200)
      handle.update(
        [
          barTrace(h.centers, h.density, `√n(θ̂ₙ−θ⋆), ${R} répétitions`, COLORS.blue, { width: h.width }),
          lineTrace(xs, xs.map((x) => normalPdf(x, 0, sd)), 'densité N(0, 1/𝕀(θ⋆))', COLORS.orange),
        ],
        {
          title: `${spec.label} : n = ${n}, θ⋆ = ${theta.toFixed(2)}`,
          xaxis: { title: '√n(θ̂ₙ − θ⋆)', range: [lo, hi] },
          yaxis: { title: 'densité' },
          barmode: 'overlay',
        },
      )
      const ve = varOf(z)
      const m = meanOf(z)
      info.innerHTML = richToHtml(
        `**${spec.label}** ($${spec.tex}$, ${spec.source}) : $${spec.emvTex}$, $${spec.infoTex}$. Thm 1.6 : $\\sqrt n(\\hat\\theta_n-\\theta^\\star)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}(0,1/\\mathbb{I}(\\theta^\\star))$ avec $1/\\mathbb{I}(\\theta^\\star)=${fr(v)}$. Sur les ${R} répétitions : variance empirique $${fr(ve)}$ (rapport $${fr(ve / v, 2)}$), moyenne $${fr(m)}$ (biais à $n$ fini, en $1/\\sqrt n$ à cette échelle${model === 'gamma2' ? ` ; ici le biais exact vaut $\\theta/(2n-1)$, soit $\\sqrt n\\,\\theta/(2n-1)=${fr((Math.sqrt(n) * theta) / (2 * n - 1))}$` : ''}).${h.outside > 0 ? ` ${h.outside} valeurs hors du cadre.` : ''} Par le Thm 1.7, **aucun** Z-estimateur régulier n’a une variance asymptotique plus petite que $1/\\mathbb{I}$.${model === 'poisson' ? ' Pour $n\\theta$ petit, la loi discrète de $\\bar X_n$ se voit encore (paliers).' : ''}`,
      )
    }

    const thetaSlider: SliderHandle = slider({
      label: '$\\theta^\\star$',
      min: MODELS[model].min,
      max: MODELS[model].max,
      step: 0.05,
      value: theta,
      format: (v) => v.toFixed(2),
      onChange: (v) => {
        theta = v
        draw()
      },
    })
    controls.append(
      segmented<Model>(
        [
          { value: 'poisson', label: 'Poisson' },
          { value: 'gamma2', label: 'Gamma(2, θ)' },
          { value: 'lognorm', label: 'Log-normale (θ, θ)' },
          { value: 'cauchy', label: 'Cauchy' },
        ],
        model,
        (v) => {
          model = v
          theta = MODELS[v].def
          thetaSlider.configure({ min: MODELS[v].min, max: MODELS[v].max, value: theta })
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$n$',
        min: 1,
        max: 3,
        step: 0.02,
        value: Math.log10(n),
        log: true,
        integer: true,
        onChange: (v) => {
          n = v
          draw()
        },
      }).root,
    )
    controls.append(thetaSlider.root)
    controls.append(
      button('Tirer de nouveaux échantillons', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
