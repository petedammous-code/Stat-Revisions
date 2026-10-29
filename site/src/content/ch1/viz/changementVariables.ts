import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, barTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential, uniform, type Rng } from '../../../sim/rng'
import { histogram, normalPdf, linspace, expPdf } from '../../../sim/stats'

type Law = 'gauss' | 'exp' | 'unif'
type Transform = 'affine' | 'square' | 'exp' | 'log' | 'power'

interface LawSpec {
  label: string
  tex: string
  pdf: (x: number) => number
  draw: (rng: Rng) => number
  range: [number, number]
  positive: boolean
}

const LAWS: Record<Law, LawSpec> = {
  gauss: { label: 'X ~ N(0,1)', tex: '\\mathcal{N}(0,1)', pdf: (x) => normalPdf(x), draw: (r) => normal(r), range: [-4, 4], positive: false },
  exp: { label: 'X ~ E(1)', tex: '\\mathcal{E}(1)', pdf: (x) => expPdf(x, 1), draw: (r) => exponential(r, 1), range: [0, 6], positive: true },
  unif: { label: 'X ~ U([0,1])', tex: '\\mathcal{U}([0,1])', pdf: (x) => (x >= 0 && x <= 1 ? 1 : 0), draw: (r) => uniform(r, 0, 1), range: [-0.1, 1.1], positive: true },
}

const fmt = (v: number) => v.toFixed(2).replace('.', ',')

/** Changement de variables : densite de Y = phi(X) par la formule q(y) = p(phi^{-1}(y)) |(phi^{-1})'(y)| (somme sur les branches). */
export const vizChangementVariables: Viz = {
  id: 'ch1-changement-variables',
  title: 'Changement de variables : la densité de φ(X) par la fonction muette',
  description:
    'À gauche : densité de $X$ et histogramme de $5000$ tirages. À droite : histogramme des $Y=\\phi(X)$ et la densité **prédite** par la formule $q(y)=\\mathbb{1}_{\\phi(I)}(y)\\,p(\\phi^{-1}(y))\\,|(\\phi^{-1})\'(y)|$ (sommée sur les branches quand $\\phi$ n’est pas injective). Choisir la loi de $X$ et la transformation : affine $a+bX$ (curseurs $a$, $b$, avec $b<0$ possible : la valeur absolue est indispensable), $X^2$ (deux branches, $\\chi^2(1)$ pour une gaussienne), $e^X$ (log-normale, Examen 2025), $\\ln X$, $X^c$ (Weibull, CC 2022).',
  source: 'Poly ch.1, Outils Prop. 2.1, Ex. 2.1, Ex. 2.2 ; PC1 Ex. 2 ; Examen 2025 Ex. 2 Q1 ; CC 2022 Ex. 1 Q1',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let law: Law = 'gauss'
    let tr: Transform = 'affine'
    let a = 1
    let b = -2
    let c = 2
    let seed = 3
    const M = 5000
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    const paramArea = document.createElement('div')
    paramArea.className = 'viz-controls'

    /** Applique la transformation ; NaN si hors domaine. */
    const phi = (x: number): number => {
      switch (tr) {
        case 'affine':
          return a + b * x
        case 'square':
          return x * x
        case 'exp':
          return Math.exp(x)
        case 'log':
          return x > 0 ? Math.log(x) : NaN
        case 'power':
          return x >= 0 ? Math.pow(x, c) : NaN
      }
    }
    /** Densité théorique de Y par la formule du changement de variables. */
    const qY = (y: number, p: (x: number) => number): number => {
      switch (tr) {
        case 'affine':
          return p((y - a) / b) / Math.abs(b)
        case 'square':
          return y > 0 ? (p(Math.sqrt(y)) + p(-Math.sqrt(y))) / (2 * Math.sqrt(y)) : 0
        case 'exp':
          return y > 0 ? p(Math.log(y)) / y : 0
        case 'log':
          return p(Math.exp(y)) * Math.exp(y)
        case 'power':
          return y > 0 ? p(Math.pow(y, 1 / c)) * (Math.pow(y, 1 / c - 1) / c) : 0
      }
    }
    const formulaTex = (): string => {
      switch (tr) {
        case 'affine':
          return `q(y)=\\frac{1}{|b|}\\,p\\Big(\\frac{y-a}{b}\\Big)\\quad(a=${fmt(a)},\\ b=${fmt(b)})`
        case 'square':
          return 'q(y)=\\frac{p(\\sqrt y)+p(-\\sqrt y)}{2\\sqrt y}\\mathbb{1}_{y>0}\\quad\\text{(deux branches)}'
        case 'exp':
          return 'q(y)=\\frac{1}{y}\\,p(\\ln y)\\,\\mathbb{1}_{y>0}'
        case 'log':
          return 'q(y)=e^{y}\\,p(e^{y})'
        case 'power':
          return `q(y)=\\frac{1}{c}\\,y^{1/c-1}\\,p(y^{1/c})\\,\\mathbb{1}_{y>0}\\quad(c=${fmt(c)})`
      }
    }
    const commentTex = (): string => {
      if (tr === 'square' && law === 'gauss') return 'Pour $X\\sim\\mathcal{N}(0,1)$, on obtient $q(y)=\\frac{1}{\\sqrt{2\\pi y}}e^{-y/2}$ : la densité de $\\chi^2(1)=\\mathrm{Gamma}(1/2,1/2)$ (Ex. 2.2, Prop. 2.8). $\\phi$ n’est pas injective : on découpe en $]-\\infty,0[$ et $]0,+\\infty[$ et on **somme** les deux contributions (égales par parité).'
      if (tr === 'exp' && law === 'gauss') return 'C’est la **loi log-normale** de l’Examen 2025 Ex. 2 Q1 : $Y=e^{\\mu+\\sigma\\xi}$ a pour densité $\\frac{1}{y\\sqrt{2\\pi\\sigma^2}}e^{-(\\ln y-\\mu)^2/(2\\sigma^2)}\\mathbb{1}_{y>0}$ ; ici $\\mu=0$, $\\sigma=1$. Le facteur $1/y$ est $|(\\phi^{-1})\'(y)|$ avec $\\phi^{-1}=\\ln$.'
      if (tr === 'power' && law === 'exp') return 'Lecture inverse du CC 2022 Ex. 1 Q1 : si $X$ est Weibull de densité $\\frac c\\theta x^{c-1}e^{-x^c/\\theta}$, alors $X^c$ est exponentielle d’échelle $\\theta$ ; ici on part de $X\\sim\\mathcal{E}(1)$ et $Y=X^c$ est une Weibull de paramètre $c$.'
      if (tr === 'affine') return `Translation $a$, échelle $b$ (Ex. 2.1, PC1 Ex. 2) : pour $X\\sim\\mathcal{N}(0,1)$ on retrouve $\\mathcal{N}(a,b^2)$. ${b < 0 ? '**Ici $b<0$** : sans la valeur absolue la « densité » serait négative — c’est l’erreur classique relevée dans le corrigé de la PC1.' : 'Passez $b$ en négatif pour voir pourquoi la valeur absolue $|b|$ est indispensable.'}`
      if (tr === 'log') return 'Pour $X\\sim\\mathcal{E}(1)$, $Y=\\ln X$ a une loi de Gumbel (asymétrique) ; c’est la transformation utilisée pour le modèle de Pareto ($\\ln(X/\\alpha)$ exponentielle, PC6 Ex. 2).'
      return 'La masse se conserve : là où $\\phi$ « étire » ($|\\phi\'|$ grand), la densité de $Y$ baisse ; là où elle « comprime », elle monte. La formule n’est valable que si $\\phi$ est $\\mathcal{C}^1$ et strictement monotone sur chaque morceau.'
    }

    const draw = () => {
      const spec = LAWS[law]
      const rng = makeRng(300 + seed)
      const xs = Array.from({ length: M }, () => spec.draw(rng))
      const ys = xs.map(phi).filter((y) => Number.isFinite(y))
      const [lo, hi] = spec.range
      const hX = histogram(xs, 40, lo, hi)
      const gridX = linspace(lo + 1e-6, hi, 300)
      hLeft.update([barTrace(hX.centers, hX.density, 'histogramme de X', COLORS.blue, { width: hX.width }), lineTrace(gridX, gridX.map(spec.pdf), 'densité p de X', COLORS.orange)], {
        title: `X de loi ${spec.label.replace('X ~ ', '')}`,
        xaxis: { title: 'x', range: [lo, hi] },
        yaxis: { title: 'densité' },
        barmode: 'overlay',
      })
      const sorted = ys.slice().sort((u, v) => u - v)
      const yl = sorted[Math.floor(0.002 * sorted.length)]
      const yh = sorted[Math.min(sorted.length - 1, Math.floor(0.995 * sorted.length))]
      const padding = 0.05 * (yh - yl || 1)
      const ylo = yl - padding
      const yhi = yh + padding
      const hY = histogram(ys, 50, ylo, yhi)
      const gridY = linspace(ylo + 1e-6, yhi, 400)
      const qs = gridY.map((y) => qY(y, spec.pdf))
      const qmax = Math.max(...qs.filter(Number.isFinite))
      hRight.update(
        [barTrace(hY.centers, hY.density, 'histogramme de Y = φ(X)', COLORS.blue, { width: hY.width }), lineTrace(gridY, qs.map((v) => (Number.isFinite(v) ? Math.min(v, 3 * Math.max(...hY.density, 1e-3)) : 0)), 'densité q prédite', COLORS.orange)],
        {
          title: 'Y = φ(X) et la densité q du changement de variables',
          xaxis: { title: 'y', range: [ylo, yhi] },
          yaxis: { title: 'densité', range: [0, Math.min(qmax, 3 * Math.max(...hY.density, 1e-3)) * 1.1] },
          barmode: 'overlay',
        },
      )
      info.innerHTML = richToHtml(
        `**Méthode de la fonction muette (Outils, Prop. 2.1).** Pour $h$ mesurable positive, $\\mathbb{E}[h(\\phi(X))]=\\int h(\\phi(x))p(x)\\,\\mathrm{d}x$ (transfert) ; le changement de variable $y=\\phi(x)$ donne $\\int h(y)\\,p(\\phi^{-1}(y))|(\\phi^{-1})\'(y)|\\,\\mathrm{d}y$, et l’égalité pour **toute** $h$ identifie la densité de $Y$ :\n\n$$${formulaTex()}$$\n\n${commentTex()} Sur ${ys.length} tirages, l’histogramme suit la densité prédite. Ce calcul est exactement celui d’un **modèle induit** (Déf. 5) : la loi image $\\mathbb{P}^\\phi$ de chaque $\\mathbb{P}\\in\\mathcal{C}$.`,
      )
    }

    const rebuildParams = () => {
      paramArea.innerHTML = ''
      if (tr === 'affine') {
        paramArea.append(slider({ label: '$a$ (translation)', min: -3, max: 3, step: 0.1, value: a, format: fmt, onChange: (v) => { a = v; draw() } }).root)
        paramArea.append(slider({ label: '$b$ (échelle, $b\\ne0$)', min: -3, max: 3, step: 0.1, value: b, format: fmt, onChange: (v) => { b = Math.abs(v) < 0.05 ? 0.1 : v; draw() } }).root)
      } else if (tr === 'power') {
        paramArea.append(slider({ label: '$c$', min: 0.5, max: 4, step: 0.1, value: c, format: fmt, onChange: (v) => { c = v; draw() } }).root)
      }
    }

    controls.append(
      segmented<Law>(
        (Object.keys(LAWS) as Law[]).map((k) => ({ value: k, label: LAWS[k].label })),
        law,
        (v) => {
          law = v
          if (!LAWS[law].positive && (tr === 'log' || tr === 'power')) tr = 'affine'
          rebuildParams()
          draw()
        },
      ),
    )
    controls.append(
      segmented<Transform>(
        [
          { value: 'affine', label: '$a+bX$' },
          { value: 'square', label: '$X^2$' },
          { value: 'exp', label: '$e^X$' },
          { value: 'log', label: '$\\ln X$ ($X>0$)' },
          { value: 'power', label: '$X^c$ ($X>0$)' },
        ],
        tr,
        (v) => {
          tr = v
          if ((tr === 'log' || tr === 'power') && !LAWS[law].positive) law = 'exp'
          rebuildParams()
          draw()
        },
      ),
    )
    controls.append(paramArea)
    controls.append(button('Tirer 5000 valeurs', () => { seed++; draw() }))
    rebuildParams()
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
