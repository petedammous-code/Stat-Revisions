import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, boxTrace, barTrace, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, laplace, uniform, cauchy, type Rng } from '../../../sim/rng'
import { quantile } from '../../../sim/stats'

type Noise = 'gauss' | 'laplace' | 'unif' | 'cauchy'

interface NoiseSpec {
  label: string
  tex: string
  draw: (r: Rng) => number
  /** Limites de n·Var (moyenne, médiane) quand elles existent ; null si infinie / non disponible. */
  nVarMean: number | null
  nVarMed: number
}

const NOISES: Record<Noise, NoiseSpec> = {
  gauss: { label: 'Gaussien', tex: 'p(x)=(2\\pi)^{-1/2}e^{-x^2/2}', draw: (r) => normal(r, 0, 1), nVarMean: 1, nVarMed: Math.PI / 2 },
  laplace: { label: 'Laplace', tex: 'p(x)=e^{-|x|}/2', draw: (r) => laplace(r, 0, 1), nVarMean: 2, nVarMed: 1 },
  unif: { label: 'Uniforme', tex: 'p=\\mathbb{1}_{[-1/2,1/2]}', draw: (r) => uniform(r, -0.5, 0.5), nVarMean: 1 / 12, nVarMed: 1 / 4 },
  cauchy: { label: 'Cauchy', tex: 'p(x)=1/(\\pi(1+x^2))', draw: (r) => cauchy(r, 0, 1), nVarMean: null, nVarMed: (Math.PI * Math.PI) / 4 },
}

const NAMES = ['moyenne', 'médiane', 'demi-somme des extrêmes']
const COLS = [COLORS.blue, COLORS.orange, COLORS.green]

function medianOf(buf: Float64Array): number {
  const s = Float64Array.from(buf).sort()
  const n = s.length
  return n % 2 === 1 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2
}

/** Ex. 1.1 et compléments : trois estimateurs du centre d'un modèle de translation, quatre bruits. */
export const vizMedianeMoyenne: Viz = {
  id: 'ch3-mediane-moyenne',
  title: 'Translation : moyenne, médiane ou demi-somme des extrêmes ?',
  description:
    'Modèle $X_i=\\theta+\\varepsilon_i$ avec $\\theta=0$ et $m=1000$ échantillons de taille $n$. À gauche : boîtes à moustaches des trois estimateurs de l’Ex. 1.1. À droite : $n$ fois le risque quadratique empirique $\\frac1m\\sum T^2$ (échelle logarithmique) et, en losanges, les limites théoriques de $n\\,\\mathrm{Var}$ (moyenne : variance du bruit ; médiane : $1/(4p(0)^2)$). Choisir le bruit, faire varier $n$, retirer.',
  source: 'Poly ch.3, Ex. 1.1 (p. 9–10) et Compléments « quatre lois de bruit » (p. 47)',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let noise: Noise = 'gauss'
    let n = 100
    let seed = 1
    const m = 1000
    const hBox = plot(plots[0], [], {})
    const hBar = plot(plots[1], [], {})

    const draw = () => {
      const spec = NOISES[noise]
      const rng = makeRng(31 + 1000 * seed)
      const est: number[][] = [[], [], []]
      const buf = new Float64Array(n)
      for (let k = 0; k < m; k++) {
        let s = 0
        let mn = Infinity
        let mx = -Infinity
        for (let i = 0; i < n; i++) {
          const x = spec.draw(rng)
          buf[i] = x
          s += x
          if (x < mn) mn = x
          if (x > mx) mx = x
        }
        est[0].push(s / n)
        est[1].push(medianOf(buf))
        est[2].push((mn + mx) / 2)
      }
      const nR = est.map((v) => (n * v.reduce((a, x) => a + x * x, 0)) / m)
      let r = 0
      for (const v of est) r = Math.max(r, quantile(v.map(Math.abs), 0.95))
      r = Math.max(1.25 * r, 1e-3)
      hBox.update(
        est.map((v, i) => boxTrace(v, NAMES[i], COLS[i])),
        { title: `${m} estimations, n = ${n}, bruit ${spec.label.toLowerCase()} (θ = 0)`, yaxis: { title: 'valeur de l’estimateur', range: [-r, r] }, showlegend: false },
      )
      const theo: { x: string; y: number }[] = []
      if (spec.nVarMean !== null) theo.push({ x: NAMES[0], y: spec.nVarMean })
      theo.push({ x: NAMES[1], y: spec.nVarMed })
      hBar.update(
        [
          { ...barTrace([0, 1, 2], nR, 'n · risque empirique', COLORS.blue, { marker: { color: COLS, opacity: 0.7 } }), x: NAMES },
          { ...pointsTrace([], [], 'limite théorique de n·Var', COLORS.red, { marker: { color: COLORS.red, size: 12, symbol: 'diamond' } }), x: theo.map((t) => t.x), y: theo.map((t) => t.y) },
        ],
        { title: 'n · R(0, T) (échelle log)', yaxis: { type: 'log', title: 'n · risque' } },
      )
      const fmt = (x: number) => (x > 1e4 ? x.toExponential(1) : x.toFixed(3))
      const best = nR.indexOf(Math.min(...nR))
      const extra: Record<Noise, string> = {
        gauss: 'Bruit gaussien : $n\\mathrm{Var}(\\bar X_n)=1$ contre $\\pi/2\\approx1{,}571$ pour la médiane : **la moyenne gagne** (c’est l’estimateur efficace, §6).',
        laplace: 'Bruit de Laplace (variance $2$) : $n\\mathrm{Var}(\\bar X_n)=2$ contre $1/(4p(0)^2)=1$ pour la médiane : **la médiane gagne**.',
        unif: 'Bruit uniforme : moyenne $1/12$, médiane $\\approx1/4$, mais la **demi-somme des extrêmes** a une variance d’ordre $n^{-2}$ (modèle non régulier, comme $X_{n:n}$ à l’Ex. 1.9) : $n\\cdot$risque $\\to0$.',
        cauchy: 'Bruit de Cauchy : la moyenne et la demi-somme n’ont **pas d’espérance** ($\\bar X_n$ a la même loi de Cauchy pour tout $n$ : son « risque » ne diminue pas) ; seule la **médiane** est utilisable, $n\\mathrm{Var}\\to\\pi^2/4\\approx2{,}47$.',
      }
      info.innerHTML = richToHtml(
        `Bruit $${spec.tex}$, $n=${n}$. Valeurs de $n\\cdot R(0,T)$ sur $m=${m}$ échantillons : moyenne ${fmt(nR[0])}, médiane ${fmt(nR[1])}, demi-somme ${fmt(nR[2])} — meilleur ici : **${NAMES[best]}**. ${extra[noise]}

**Lecture (poly p. 10)** : une simulation à une seule valeur de $\\theta$ et une seule taille $n$ n’est pas une comparaison ; il faut une mesure définie **pour tout** $\\theta$, le risque $R(\\theta,T)$ (ici indépendant de $\\theta$ car les trois estimateurs sont équivariants par translation, compléments).`,
      )
    }

    controls.append(
      segmented<Noise>(
        [
          { value: 'gauss', label: 'Gaussien' },
          { value: 'laplace', label: 'Laplace' },
          { value: 'unif', label: 'Uniforme' },
          { value: 'cauchy', label: 'Cauchy' },
        ],
        noise,
        (v) => {
          noise = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$n$',
        min: Math.log10(5),
        max: Math.log10(500),
        step: 0.02,
        value: Math.log10(n),
        log: true,
        integer: true,
        onChange: (v) => {
          n = Math.max(5, v)
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
