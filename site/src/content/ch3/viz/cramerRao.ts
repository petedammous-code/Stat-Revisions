import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential, bernoulli, poisson, uniform, type Rng } from '../../../sim/rng'

type Scen = 'bern' | 'pois' | 'gauss' | 'exp' | 'unif'

interface Series {
  name: string
  /** Une réalisation de l'estimateur sur un n-échantillon. */
  sample: (r: Rng, t: number, n: number) => number
  /** n · Var (ou n · risque) exact. */
  exact: (t: number, n: number) => number
  /** true : on trace n · risque (estimateur biaisé) ; false : n · variance. */
  risk: boolean
  color: string
}

interface ScenSpec {
  label: string
  tex: string
  tMin: number
  tMax: number
  tDefault: number
  /** 1 / I_1(θ) : n fois la borne de Cramér-Rao pour g(θ) = θ. */
  bound: (t: number) => number
  boundTex: string
  series: Series[]
  regular: boolean
}

function supTau(n: number): number {
  let best = 0
  for (let k = 1; k < 400; k++) {
    const c = (k / 400) * Math.min(n, 8)
    if (c >= n) break
    const tau = (c * c) / (Math.pow(1 - c / n, -n) - 1)
    if (tau > best) best = tau
  }
  return best
}

const SCEN: Record<Scen, ScenSpec> = {
  bern: {
    label: 'Bernoulli',
    tex: '\\mathcal{B}\\mathrm{er}(\\theta)',
    tMin: 0.05,
    tMax: 0.95,
    tDefault: 0.3,
    bound: (t) => t * (1 - t),
    boundTex: '\\theta(1-\\theta)',
    regular: true,
    series: [{ name: 'X̄ₙ', color: COLORS.blue, risk: false, exact: (t) => t * (1 - t), sample: (r, t, n) => { let s = 0; for (let i = 0; i < n; i++) s += bernoulli(r, t); return s / n } }],
  },
  pois: {
    label: 'Poisson',
    tex: '\\mathcal{P}\\mathrm{oi}(\\theta)',
    tMin: 0.5,
    tMax: 8,
    tDefault: 2,
    bound: (t) => t,
    boundTex: '\\theta',
    regular: true,
    series: [{ name: 'X̄ₙ (EMV)', color: COLORS.blue, risk: false, exact: (t) => t, sample: (r, t, n) => { let s = 0; for (let i = 0; i < n; i++) s += poisson(r, t); return s / n } }],
  },
  gauss: {
    label: 'Gaussien N(θ, 1)',
    tex: '\\mathcal{N}(\\theta,\\sigma_0^2)\\ (\\sigma_0=1)',
    tMin: -2,
    tMax: 2,
    tDefault: 0,
    bound: () => 1,
    boundTex: '\\sigma_0^2=1',
    regular: true,
    series: [{ name: 'X̄ₙ', color: COLORS.blue, risk: false, exact: () => 1, sample: (r, t, n) => { let s = 0; for (let i = 0; i < n; i++) s += normal(r, t, 1); return s / n } }],
  },
  exp: {
    label: 'Exponentielle (intensité)',
    tex: '\\mathcal{E}(\\theta)',
    tMin: 0.3,
    tMax: 4,
    tDefault: 1,
    bound: (t) => t * t,
    boundTex: '\\theta^2',
    regular: true,
    series: [
      { name: '(n−1)/(n X̄ₙ) (sans biais) : n·Var', color: COLORS.blue, risk: false, exact: (t, n) => (n * t * t) / (n - 2), sample: (r, t, n) => { let s = 0; for (let i = 0; i < n; i++) s += exponential(r, t); return (n - 1) / s } },
      { name: '1/X̄ₙ (EMV, biaisé) : n·risque', color: COLORS.orange, risk: true, exact: (t, n) => (n * t * t * (n + 2)) / ((n - 1) * (n - 2)), sample: (r, t, n) => { let s = 0; for (let i = 0; i < n; i++) s += exponential(r, t); return n / s } },
    ],
  },
  unif: {
    label: 'Uniforme U([0, θ]) (non régulier)',
    tex: '\\mathcal{U}([0,\\theta])',
    tMin: 0.5,
    tMax: 3,
    tDefault: 1,
    bound: (t) => t * t,
    boundTex: '\\theta^2\\ (\\text{formelle})',
    regular: false,
    series: [{ name: '(n+1)/n · X(n:n) (sans biais) : n·Var', color: COLORS.blue, risk: false, exact: (t, n) => (t * t) / (n + 2), sample: (r, t, n) => { let mx = 0; for (let i = 0; i < n; i++) mx = Math.max(mx, uniform(r, 0, t)); return ((n + 1) / n) * mx } }],
  },
}

const NS = [5, 10, 20, 50, 100, 200, 500]

/** Thm 1.1 / Cor. 1.3 : variance empirique de l'estimateur contre la borne 1/(n I_1(θ)). */
export const vizCramerRao: Viz = {
  id: 'ch3-cramer-rao',
  title: 'Cramér-Rao : variance de l’estimateur contre la borne $1/(n\\,\\mathbb{I}_1(\\theta))$',
  description:
    'Pour $n\\in\\{5,\\dots,500\\}$, $600$ répétitions : $n$ fois la variance empirique (points) et $n$ fois la variance exacte (trait) d’un estimateur sans biais, comparées à $n$ fois la borne de Cramér-Rao, $1/\\mathbb{I}_1(\\theta)$ (pointillés rouges). Bernoulli, Poisson, gaussien : $\\bar X_n$ est **efficace** (égalité). Exponentielle : l’estimateur sans biais reste au-dessus, l’EMV biaisé n’est pas concerné. Uniforme : le modèle n’est **pas régulier**, la variance passe sous la « borne formelle » à la vitesse $n^{-2}$ ; la borne sans régularité de PC3 Ex. 3 (violet) reste valable.',
  source: 'Poly ch.3, Thm 1.1, Cor. 1.3, Déf. 1.10, Ex. 1.16–1.19 ; PC3 Ex. 3',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let scen: Scen = 'bern'
    let t = SCEN[scen].tDefault
    let seed = 1
    const M = 600
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const S = SCEN[scen]
      const rng = makeRng(5 + 389 * seed)
      const traces: Record<string, unknown>[] = []
      const nsFine: number[] = []
      for (let k = 0; k <= 60; k++) nsFine.push(Math.round(5 * Math.pow(100, k / 60)))
      const summary: string[] = []
      for (const se of S.series) {
        const ys = NS.map((n) => {
          const v = new Array<number>(M)
          for (let k = 0; k < M; k++) v[k] = se.sample(rng, t, n)
          const m = v.reduce((a, x) => a + x, 0) / M
          if (se.risk) return (n * v.reduce((a, x) => a + (x - t) * (x - t), 0)) / M
          return (n * v.reduce((a, x) => a + (x - m) * (x - m), 0)) / (M - 1)
        })
        traces.push(pointsTrace(NS, ys, `${se.name} (simulé)`, se.color, { marker: { color: se.color, size: 9 } }))
        traces.push(lineTrace(nsFine, nsFine.map((n) => se.exact(t, n)), `${se.name} (exact)`, se.color, { line: { color: se.color, width: 2 }, showlegend: false }))
        summary.push(`${se.name} : ${ys[ys.length - 1].toFixed(4)} en $n=500$ (exact ${se.exact(t, 500).toFixed(4)})`)
      }
      const b = S.bound(t)
      traces.push(lineTrace(nsFine, nsFine.map(() => b), S.regular ? 'n × borne de Cramér-Rao = 1/I₁(θ)' : 'borne « formelle » θ² (ne s’applique pas)', COLORS.red, { line: { color: COLORS.red, width: 2.5, dash: 'dash' } }))
      if (scen === 'unif') {
        traces.push(lineTrace(nsFine, nsFine.map((n) => (t * t * supTau(n)) / n), 'n × borne sans régularité θ² sup τₙ(c) / n²', COLORS.purple, { line: { color: COLORS.purple, width: 2.5, dash: 'dot' } }))
      }
      handle.update(traces, {
        title: `n · Var(Tₙ) contre n × borne, ${S.label}, θ = ${t.toFixed(2)}`,
        xaxis: { title: 'n (échelle log)', type: 'log' },
        yaxis: scen === 'unif' ? { title: 'n · variance (échelle log)', type: 'log' } : { title: 'n · variance', rangemode: 'tozero' },
      })
      const text: Record<Scen, string> = {
        bern: '$\\mathbb{I}(\\theta)=n/(\\theta(1-\\theta))$ (Ex. 1.15) et $\\mathrm{Var}_\\theta(\\bar X_n)=\\theta(1-\\theta)/n$ : la borne est **atteinte** pour tout $\\theta$, $\\bar X_n$ est **efficace**, donc E.S.B.V.M. (Ex. 1.17).',
        pois: '$\\mathbb{I}(\\mathcal{M}^n,\\theta)=n/\\theta$ et $\\mathrm{Var}_\\theta(\\bar X_n)=\\theta/n$ : l’EMV est **efficace** (Ex. 1.18).',
        gauss: '$\\mathbb{I}_1=1/\\sigma_0^2$ (dérivée seconde constante) : $\\bar X_n$ est efficace (Ex. 1.19). Même résultat pour $\\hat\\mu_{ML}=\\bar Y_n$ à l’Examen 2025 Ex. 2 Q3.',
        exp: 'Borne $\\theta^2/n$ (Examen 2025 Ex. 1 Q1). L’estimateur sans biais $\\frac{n-1}{n\\bar X_n}$ a pour variance $\\frac{\\theta^2}{n-2}$ : **au-dessus** de la borne pour tout $n$, il n’est pas efficace (aucun estimateur de $\\theta$ ne l’est ici, Thm 4.1). L’EMV $1/\\bar X_n$ est **biaisé** : Cramér-Rao ne s’applique pas à lui ; son risque est encore plus grand à $n$ fini, mais $n\\cdot$risque $\\to\\theta^2$ : efficacité **asymptotique** (ch.7).',
        unif: 'Le support dépend de $\\theta$ : modèle **non régulier** (Ex. 1.12). Le calcul formel $\\ell=-\\log\\theta$, « $\\mathbb{I}=1/\\theta^2$ » donnerait la borne $\\theta^2/n$ ; or $\\mathrm{Var}_\\theta(\\frac{n+1}nX_{n:n})=\\frac{\\theta^2}{n(n+2)}$ passe en dessous (Ex. 1.16) : **pas de contradiction**, le Thm 1.1 ne s’applique pas. La borne sans régularité (PC3 Ex. 3) est d’ordre $\\theta^2/n^2$ et reste sous la courbe.',
      }
      info.innerHTML = richToHtml(
        `Modèle $${S.tex}$, $\\theta=${t.toFixed(2)}$ ; $n$ fois la borne : $${S.boundTex}=${b.toFixed(4)}$. ${summary.join(' ; ')}.

${text[scen]}`,
      )
    }

    const sT = slider({
      label: '$\\theta$',
      min: SCEN[scen].tMin,
      max: SCEN[scen].tMax,
      step: 0.01,
      value: t,
      onChange: (v) => {
        t = v
        draw()
      },
    })
    controls.append(
      segmented<Scen>(
        [
          { value: 'bern', label: 'Bernoulli' },
          { value: 'pois', label: 'Poisson' },
          { value: 'gauss', label: 'Gaussien' },
          { value: 'exp', label: 'Exponentielle' },
          { value: 'unif', label: 'Uniforme' },
        ],
        scen,
        (v) => {
          scen = v
          t = SCEN[v].tDefault
          sT.configure({ min: SCEN[v].tMin, max: SCEN[v].tMax, value: t })
          draw()
        },
      ),
    )
    controls.append(sT.root)
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
