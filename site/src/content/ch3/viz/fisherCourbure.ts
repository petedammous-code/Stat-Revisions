import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, barTrace, vline, COLORS, hexToRgba } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential, bernoulli, poisson, type Rng } from '../../../sim/rng'
import { histogram, linspace, normalPdf } from '../../../sim/stats'

type Law = 'bern' | 'pois' | 'exp' | 'gauss'

interface LawSpec {
  label: string
  tex: string
  tMin: number
  tMax: number
  tDefault: number
  draw: (r: Rng, t: number) => number
  /** log p_θ(x) à une constante (indépendante de θ) près. */
  logp: (t: number, x: number) => number
  score: (t: number, x: number) => number
  d2: (t: number, x: number) => number
  info: (t: number) => number
  kl: (ts: number, t: number) => number
  infoTex: string
  /** Demi-largeur de la fenêtre en θ autour de θ*. */
  width: (ts: number) => number
  clamp: (t: number) => boolean
}

const LAWS: Record<Law, LawSpec> = {
  bern: {
    label: 'Bernoulli',
    tex: '\\mathcal{B}\\mathrm{er}(\\theta)',
    tMin: 0.05,
    tMax: 0.95,
    tDefault: 0.3,
    draw: (r, t) => bernoulli(r, t),
    logp: (t, x) => x * Math.log(t) + (1 - x) * Math.log(1 - t),
    score: (t, x) => x / t - (1 - x) / (1 - t),
    d2: (t, x) => -x / (t * t) - (1 - x) / ((1 - t) * (1 - t)),
    info: (t) => 1 / (t * (1 - t)),
    kl: (s, t) => s * Math.log(s / t) + (1 - s) * Math.log((1 - s) / (1 - t)),
    infoTex: '\\frac1{\\theta(1-\\theta)}',
    width: (s) => Math.min(0.25, 0.9 * Math.min(s, 1 - s)),
    clamp: (t) => t > 0 && t < 1,
  },
  pois: {
    label: 'Poisson',
    tex: '\\mathcal{P}\\mathrm{oi}(\\theta)',
    tMin: 0.5,
    tMax: 10,
    tDefault: 3,
    draw: (r, t) => poisson(r, t),
    logp: (t, x) => -t + x * Math.log(t),
    score: (t, x) => x / t - 1,
    d2: (t, x) => -x / (t * t),
    info: (t) => 1 / t,
    kl: (s, t) => t - s + s * Math.log(s / t),
    infoTex: '\\frac1\\theta',
    width: (s) => Math.min(0.9 * s, 2 * Math.sqrt(s)),
    clamp: (t) => t > 0,
  },
  exp: {
    label: 'Exponentielle (intensité)',
    tex: '\\mathcal{E}(\\theta)',
    tMin: 0.3,
    tMax: 5,
    tDefault: 1,
    draw: (r, t) => exponential(r, t),
    logp: (t, x) => Math.log(t) - t * x,
    score: (t, x) => 1 / t - x,
    d2: (t) => -1 / (t * t),
    info: (t) => 1 / (t * t),
    kl: (s, t) => Math.log(s / t) + t / s - 1,
    infoTex: '\\frac1{\\theta^2}',
    width: (s) => 0.8 * s,
    clamp: (t) => t > 0,
  },
  gauss: {
    label: 'Gaussienne N(θ, 1)',
    tex: '\\mathcal{N}(\\theta,1)',
    tMin: -2,
    tMax: 2,
    tDefault: 0,
    draw: (r, t) => normal(r, t, 1),
    logp: (t, x) => -0.5 * (x - t) * (x - t),
    score: (t, x) => x - t,
    d2: () => -1,
    info: () => 1,
    kl: (s, t) => 0.5 * (t - s) * (t - s),
    infoTex: '1',
    width: () => 2,
    clamp: () => true,
  },
}

/** Déf. 1.7–1.8, Prop. 1.2 et intuition KL : le score est une pente centrée, l'information une courbure moyenne. */
export const vizFisherCourbure: Viz = {
  id: 'ch3-fisher-courbure',
  title: 'Information de Fisher : dispersion du score, courbure de la log-vraisemblance',
  description:
    'À gauche : pour $15$ échantillons de taille $n$, la log-vraisemblance normalisée $\\theta\\mapsto\\frac1n\\{\\ell_n(\\theta)-\\ell_n(\\theta^\\star)\\}$ (traits fins), sa moyenne exacte $-\\mathrm{KL}(\\theta^\\star,\\theta)$ (trait épais) et la parabole $-\\frac12\\mathbb{I}_1(\\theta^\\star)(\\theta-\\theta^\\star)^2$ (pointillés). À droite : histogramme du score normalisé $\\frac1{\\sqrt n}\\sum_iS(\\theta^\\star,X_i)$ sur $3000$ échantillons et la densité $\\mathcal{N}(0,\\mathbb{I}_1(\\theta^\\star))$. Choisir la loi, $\\theta^\\star$ et $n$ ; « Tirer » renouvelle les échantillons.',
  source: 'Poly ch.3, Déf. 1.7–1.8, Prop. 1.2, Ex. 1.13–1.15, Intuition KL p. 23–24',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let law: Law = 'bern'
    let ts = LAWS[law].tDefault
    let n = 20
    let seed = 1
    const hLik = plot(plots[0], [], {})
    const hScore = plot(plots[1], [], {})

    const draw = () => {
      const L = LAWS[law]
      const rng = makeRng(17 + 613 * seed)
      const w = L.width(ts)
      const grid = linspace(ts - w, ts + w, 161).filter(L.clamp)
      const traces: Record<string, unknown>[] = []
      // log-vraisemblances de 15 échantillons
      for (let k = 0; k < 15; k++) {
        const xs: number[] = []
        for (let i = 0; i < n; i++) xs.push(L.draw(rng, ts))
        const base = xs.reduce((a, x) => a + L.logp(ts, x), 0)
        const ys = grid.map((t) => (xs.reduce((a, x) => a + L.logp(t, x), 0) - base) / n)
        traces.push(lineTrace(grid, ys, k === 0 ? 'échantillons' : '', COLORS.blue, { line: { color: hexToRgba(COLORS.blue, 0.35), width: 1.2 }, showlegend: k === 0 }))
      }
      const I = L.info(ts)
      traces.push(lineTrace(grid, grid.map((t) => -L.kl(ts, t)), '−KL(θ*, θ) (moyenne)', COLORS.red, { line: { color: COLORS.red, width: 3.5 } }))
      traces.push(lineTrace(grid, grid.map((t) => -0.5 * I * (t - ts) * (t - ts)), '−½ I(θ*)(θ−θ*)²', COLORS.green, { line: { color: COLORS.green, width: 2.5, dash: 'dash' } }))
      const lows = traces.flatMap((tr) => (tr.y as number[]))
      const yMin = Math.max(Math.min(...lows), -3 * 0.5 * I * w * w - 0.5)
      hLik.update(traces, {
        title: `log-vraisemblances normalisées, n = ${n}`,
        xaxis: { title: 'θ' },
        yaxis: { title: '(ℓₙ(θ) − ℓₙ(θ*)) / n', range: [yMin, 0.25 * I * w * w + 0.05] },
        shapes: [vline(ts, COLORS.gray, 'dot')],
      })
      // score normalisé
      const M = 3000
      const sc = new Array<number>(M)
      let d2sum = 0
      for (let k = 0; k < M; k++) {
        let s = 0
        for (let i = 0; i < n; i++) {
          const x = L.draw(rng, ts)
          s += L.score(ts, x)
          if (k < 200) d2sum += L.d2(ts, x)
        }
        sc[k] = s / Math.sqrt(n)
      }
      const mean = sc.reduce((a, x) => a + x, 0) / M
      const vr = sc.reduce((a, x) => a + (x - mean) * (x - mean), 0) / (M - 1)
      const sd = Math.sqrt(I)
      const h = histogram(sc, 45, -4.5 * sd, 4.5 * sd)
      const g = linspace(-4.5 * sd, 4.5 * sd, 200)
      hScore.update(
        [
          barTrace(h.centers, h.density, 'score normalisé', COLORS.blue, { width: h.width }),
          lineTrace(g, g.map((x) => normalPdf(x, 0, sd)), 'N(0, I(θ*))', COLORS.orange),
        ],
        { title: `score normalisé en θ* = ${ts.toFixed(2)}`, xaxis: { title: 'Σᵢ S(θ*, Xᵢ) / √n' }, yaxis: { title: 'densité' }, barmode: 'overlay' },
      )
      const minusD2 = -d2sum / (200 * n)
      info.innerHTML = richToHtml(
        `Loi $${L.tex}$, $\\theta^\\star=${ts.toFixed(2)}$ : $\\mathbb{I}_1(\\theta^\\star)=${L.infoTex}=${I.toFixed(3)}$. Sur $${M}$ échantillons : moyenne du score normalisé ${mean.toFixed(3)} ($\\approx0$, **score centré**, Prop. 1.2 (i)) ; variance ${vr.toFixed(3)} ($\\approx\\mathbb{I}_1(\\theta^\\star)$, Déf. 1.8) ; moyenne de $-\\partial_\\theta^2\\ell$ : ${minusD2.toFixed(3)} ($\\approx\\mathbb{I}_1(\\theta^\\star)$, Prop. 1.2 (ii)).

**Lecture.** Chaque courbe fine a une pente aléatoire en $\\theta^\\star$ (le score) ; en moyenne elle est nulle et la courbe moyenne $-\\mathrm{KL}(\\theta^\\star,\\cdot)$ est maximale en $\\theta^\\star$, de courbure $\\mathbb{I}_1(\\theta^\\star)$ : la parabole verte l’épouse près de $\\theta^\\star$. Plus l’information est grande, plus la courbe est pointue, plus $\\theta^\\star$ est facile à localiser — d’où $\\mathbb{I}$ au dénominateur de Cramér-Rao.${law === 'bern' ? ' En Bernoulli, l’information est minimale en $\\theta=1/2$.' : ''}${law === 'gauss' ? ' En gaussien à variance connue, la dérivée seconde vaut $-1$ : courbure constante, information indépendante de $\\theta$ (Ex. 1.19).' : ''} Quand $n$ augmente, les courbes fines se resserrent autour de la courbe moyenne (LGN).`,
      )
    }

    const sT = slider({
      label: '$\\theta^\\star$',
      min: LAWS[law].tMin,
      max: LAWS[law].tMax,
      step: 0.01,
      value: ts,
      onChange: (v) => {
        ts = v
        draw()
      },
    })
    controls.append(
      segmented<Law>(
        [
          { value: 'bern', label: 'Bernoulli' },
          { value: 'pois', label: 'Poisson' },
          { value: 'exp', label: 'Exponentielle' },
          { value: 'gauss', label: 'Gaussienne' },
        ],
        law,
        (v) => {
          law = v
          ts = LAWS[v].tDefault
          sT.configure({ min: LAWS[v].tMin, max: LAWS[v].tMax, value: ts })
          draw()
        },
      ),
    )
    controls.append(sT.root)
    controls.append(
      slider({
        label: '$n$',
        min: 0,
        max: Math.log10(300),
        step: 0.02,
        value: Math.log10(n),
        log: true,
        integer: true,
        onChange: (v) => {
          n = Math.max(1, v)
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
      hLik.destroy()
      hScore.destroy()
    }
  },
}
