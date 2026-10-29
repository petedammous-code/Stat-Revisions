import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, areaTrace, barTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential, poisson } from '../../../sim/rng'
import { normalCdf, normalPdf, chi2Cdf, chi2Pdf, poissonCdf, poissonPmf, linspace } from '../../../sim/stats'

type Test = 'zuni' | 'zbi' | 'chi2' | 'poisson'

interface Spec {
  label: string
  min: number
  max: number
  step: number
  init: number
  /** p-valeur pour la valeur observée t. */
  pval: (t: number) => number
  /** Statement du test (Rich). */
  text: string
  /** Formule de la p-valeur (Rich). */
  formula: string
  /** Tirage de la statistique sous H0 (h1 = false) ou sous l'alternative indiquée. */
  draw: (seed: number, h1: boolean) => number
  h1: string
}

const SPECS: Record<Test, Spec> = {
  zuni: {
    label: 'z unilatéral',
    min: -3.5,
    max: 4,
    step: 0.01,
    init: 1,
    pval: (t) => 1 - normalCdf(t),
    text: 'Ex. 2.13 : $\\mathcal{N}(\\theta,\\sigma^2)$, $\\sigma=1$, $n=100$, $H_0:\\theta\\le0$ contre $H_1:\\theta>0$, $T(Z)=\\sqrt n\\bar X_n/\\sigma$, rejet si $T\\ge z_{1-\\alpha}$.',
    formula: '$\\hat\\alpha(Z)=1-\\Phi(T(Z))$ : aire à **droite** de la valeur observée sous la densité $\\mathcal{N}(0,1)$.',
    draw: (seed, h1) => {
      const rng = makeRng(seed)
      let s = 0
      for (let i = 0; i < 100; i++) s += normal(rng, h1 ? 0.2 : 0, 1)
      return Math.sqrt(100) * (s / 100)
    },
    h1: '$\\theta=0{,}2$',
  },
  zbi: {
    label: 'z bilatéral',
    min: 0,
    max: 4,
    step: 0.01,
    init: 1.5,
    pval: (t) => 2 * (1 - normalCdf(t)),
    text: 'PC4 Ex. 2 Q1–Q3 : $\\mathcal{N}(\\mu,\\sigma^2)$, $\\sigma$ connu, $H_0:\\mu=\\mu_0$ contre $H_1:\\mu\\ne\\mu_0$, $T(Z)=\\sqrt n|\\bar X_n-\\mu_0|/\\sigma$, rejet si $T\\ge z_{1-\\alpha/2}$.',
    formula: '$\\hat\\alpha(Z)=2(1-\\Phi(T(Z)))$ : aire des **deux** queues $\\{|x|\\ge T(Z)\\}$ sous la densité $\\mathcal{N}(0,1)$.',
    draw: (seed, h1) => {
      const rng = makeRng(seed)
      let s = 0
      for (let i = 0; i < 100; i++) s += normal(rng, h1 ? 0.25 : 0, 1)
      return Math.abs(Math.sqrt(100) * (s / 100))
    },
    h1: '$\\mu=\\mu_0+0{,}25$ ($n=100$, $\\sigma=1$)',
  },
  chi2: {
    label: 'χ²(2n) (PC4 Ex. 1)',
    min: 2,
    max: 50,
    step: 0.1,
    init: 28.1,
    pval: (t) => 1 - chi2Cdf(t, 20),
    text: 'PC4 Ex. 1 : modèle $\\mathcal{E}(1/\\theta)$ ($\\theta$ = espérance), $n=10$, $H_0:\\theta=\\theta_0=2$ contre $H_1:\\theta>\\theta_0$, $T(Z)=2\\theta_0^{-1}\\sum_iX_i\\sim\\chi^2(20)$ sous $H_0$, rejet si $T\\ge\\chi^2_{1-\\alpha}(20)$.',
    formula: '$\\hat\\alpha(Z)=\\mathbb{P}(\\chi^2(2n)\\ge T(Z))$ ; données de la PC : $T=28{,}1$, $\\hat\\alpha\\approx0{,}107$.',
    draw: (seed, h1) => {
      const rng = makeRng(seed)
      let s = 0
      for (let i = 0; i < 10; i++) s += exponential(rng, 1 / (h1 ? 4 : 2))
      return (2 * s) / 2
    },
    h1: '$\\theta=4$',
  },
  poisson: {
    label: 'Poisson (PC4 Ex. 4)',
    min: 0,
    max: 35,
    step: 1,
    init: 18,
    pval: (t) => 1 - poissonCdf(Math.round(t) - 1, 10),
    text: 'PC4 Ex. 4 : $\\mathrm{Poi}(\\theta)$, $n=10$, $H_0:\\theta=1$ contre $H_1:\\theta=2$, $T(Z)=\\sum_iX_i\\sim\\mathrm{Poi}(10)$ sous $H_0$, rejet si $T>c_\\alpha$ (inégalité **stricte**).',
    formula: '$\\hat\\alpha(Z)=\\mathbb{P}(\\mathrm{Poi}(10)>T(Z)-1)=\\mathbb{P}(\\mathrm{Poi}(10)\\ge T(Z))$ : somme des barres **à partir de** la valeur observée (incluse). Données de la PC : $T=18$, $\\hat\\alpha\\approx0{,}0143$ ; $T=13$, $\\hat\\alpha\\approx0{,}208$.',
    draw: (seed, h1) => {
      const rng = makeRng(seed)
      let s = 0
      for (let i = 0; i < 10; i++) s += poisson(rng, h1 ? 2 : 1)
      return s
    },
    h1: '$\\theta=2$',
  },
}

/** p-valeur vue comme une aire sous la densité de la statistique de test sous H0. */
export const vizPvaleurAire: Viz = {
  id: 'ch4-pvaleur-aire',
  title: 'La p-valeur, une aire sous la loi de la statistique sous H₀',
  description:
    'Pour une famille de tests $\\mathcal{R}_\\alpha=\\{T(Z)\\ge c_\\alpha\\}$ emboîtés, la $p$-valeur $\\hat\\alpha(Z)=\\inf\\{\\alpha,\\ Z\\in\\mathcal{R}_\\alpha\\}$ (Déf. 2.4, Prop. 2.1) est la probabilité, **sous $H_0$**, d’observer une statistique au moins aussi extrême que la valeur observée : c’est l’aire ombrée. Quatre tests du chapitre : $z$ unilatéral (Ex. 2.13), $z$ bilatéral (PC4 Ex. 2), pivot $\\chi^2(2n)$ (PC4 Ex. 1), Poisson discret (PC4 Ex. 4). Déplacer la valeur observée, ou tirer un échantillon sous $H_0$ ou sous une alternative ; les décisions aux niveaux 1 %, 5 %, 10 % s’affichent.',
  source: 'Poly ch.4, Déf. 2.4, Prop. 2.1, Ex. 2.13 ; PC4 Ex. 1 Q1(e), Ex. 2 Q3, Ex. 4 Q4',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let test: Test = 'chi2'
    let t = SPECS[test].init
    let seed = 1
    let lastDraw = ''
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const spec = SPECS[test]
      const p = spec.pval(t)
      const traces: Record<string, unknown>[] = []
      let title = ''
      if (test === 'poisson') {
        const ks = Array.from({ length: 36 }, (_, k) => k)
        const pm = ks.map((k) => poissonPmf(k, 10))
        const tk = Math.round(t)
        traces.push(barTrace(ks.filter((k) => k < tk), pm.filter((_, k) => k < tk), 'P(T = k) sous H₀', COLORS.blue))
        traces.push(barTrace(ks.filter((k) => k >= tk), pm.filter((_, k) => k >= tk), 'aire = p-valeur', COLORS.red, { marker: { color: COLORS.red, opacity: 0.8 } }))
        title = 'loi de T sous H₀ : Poi(10)'
      } else {
        const lo = test === 'chi2' ? 0 : test === 'zbi' ? -4.5 : -4
        const hi = test === 'chi2' ? 55 : 4.5
        const xs = linspace(lo, hi, 500)
        const f = xs.map((x) => (test === 'chi2' ? chi2Pdf(x, 20) : normalPdf(x)))
        const shade = xs.map((x, i) => {
          const tail = test === 'zbi' ? Math.abs(x) >= t : x >= t
          return tail ? f[i] : 0
        })
        traces.push(areaTrace(xs, shade, 'aire = p-valeur', COLORS.red))
        traces.push(lineTrace(xs, f, test === 'chi2' ? 'densité de χ²(20) (sous H₀)' : 'densité de N(0,1) (sous H₀)', COLORS.blue))
        title = test === 'chi2' ? 'loi de T sous H₀ : χ²(20)' : 'loi de T sous H₀ : N(0,1)'
      }
      const shapes = [vline(t, COLORS.purple, 'solid')]
      if (test === 'zbi') shapes.push(vline(-t, COLORS.purple, 'dot'))
      handle.update(traces, {
        title: { text: `${title} — p-valeur = ${p < 1e-4 ? p.toExponential(2) : p.toFixed(4)}` },
        xaxis: { title: { text: 'valeur de la statistique de test T(Z)' } },
        yaxis: { title: { text: test === 'poisson' ? 'probabilité' : 'densité' }, rangemode: 'tozero' },
        shapes,
        bargap: 0.1,
      })
      const dec = (a: number) => `${(100 * a).toFixed(0)} % : ${p <= a ? '**rejet**' : 'non-rejet'}`
      info.innerHTML = richToHtml(
        `${spec.text} ${spec.formula} Valeur observée $T(Z)=${test === 'poisson' ? Math.round(t) : t.toFixed(2)}$ ⇒ $\\hat\\alpha(Z)=${p < 1e-4 ? p.toExponential(2) : p.toFixed(4)}$. Décision au niveau ${dec(0.01)} ; ${dec(0.05)} ; ${dec(0.1)} : on rejette pour tout $\\alpha>\\hat\\alpha(Z)$ et l’on échoue à rejeter pour tout $\\alpha<\\hat\\alpha(Z)$.${lastDraw} **Ce n’est pas** la probabilité que $H_0$ soit vraie : $\\theta$ est fixé, la probabilité porte sur l’observation.`,
      )
    }

    const tSlider = slider({
      label: 'valeur observée $T(Z)$',
      min: SPECS[test].min,
      max: SPECS[test].max,
      step: SPECS[test].step,
      value: t,
      format: (v) => (test === 'poisson' ? String(Math.round(v)) : v.toFixed(2)),
      onChange: (v) => {
        t = v
        lastDraw = ''
        draw()
      },
    })

    controls.append(
      segmented<Test>(
        (Object.keys(SPECS) as Test[]).map((k) => ({ value: k, label: SPECS[k].label })),
        test,
        (v) => {
          test = v
          const s = SPECS[v]
          t = s.init
          lastDraw = ''
          tSlider.configure({ min: s.min, max: s.max, step: s.step, value: s.init })
          draw()
        },
      ),
    )
    controls.append(tSlider.root)
    const fromSample = (h1: boolean) => {
      seed++
      const s = SPECS[test]
      const v = s.draw(7300 + seed * 13, h1)
      t = Math.min(s.max, Math.max(s.min, v))
      tSlider.set(t)
      lastDraw = ` *Échantillon tiré ${h1 ? `sous l’alternative ${s.h1}` : 'sous $H_0$'}.*`
      draw()
    }
    controls.append(button('Tirer sous H₀', () => fromSample(false)))
    controls.append(button('Tirer sous H₁', () => fromSample(true)))
    draw()
    return () => handle.destroy()
  },
}
