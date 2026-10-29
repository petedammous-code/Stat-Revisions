import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, areaTrace, hline, COLORS, hexToRgba } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { normalPdf, linspace } from '../../../sim/stats'

type Loi = 'gauss' | 'unif'

/** Densité de classe : gaussienne N(m, s²) ou uniforme de même moyenne et même écart-type. */
function dens(loi: Loi, x: number, m: number, s: number): number {
  if (loi === 'gauss') return normalPdf(x, m, s)
  const h = Math.sqrt(3) * s
  return x >= m - h && x <= m + h ? 1 / (2 * h) : 0
}

/** Intervalles {x : g*(x) = 1} lus sur une grille (bornes approchées au pas de grille). */
function regions(xs: number[], dec: boolean[]): [number, number][] {
  const out: [number, number][] = []
  let start: number | null = null
  for (let i = 0; i < xs.length; i++) {
    if (dec[i] && start === null) start = xs[i]
    if (!dec[i] && start !== null) {
      out.push([start, xs[i - 1]])
      start = null
    }
  }
  if (start !== null) out.push([start, xs[xs.length - 1]])
  return out
}

/** Classifieur de Bayes en dimension 1 : densités de classe pondérées, η(x), seuil 1/2, risque de Bayes comme aire. */
export const vizBayes1d: Viz = {
  id: 'ch8-bayes-1d',
  title: 'Classifieur de Bayes en dimension 1 : η(x), seuil 1/2 et risque de Bayes',
  description:
    'Deux classes, $p=\\mathbb{P}(Y=1)$, densités de classe $q_1$ et $q_{-1}$ gaussiennes ou uniformes (curseurs : moyennes, écarts-types, $p$). À gauche : $p\\,q_1$ et $(1-p)\\,q_{-1}$ ; l’aire grise sous leur minimum est le **risque de Bayes** $R^\\star=\\int\\min(p\\,q_1,(1-p)\\,q_{-1})$. À droite : la fonction de régression $\\eta(x)$ (Prop. 1.4), le seuil $1/2$ et les zones où $g^\\star$ prédit 1. Préréglages : Ex. 1.6 du poly et PC8 Ex. 5.',
  source: 'Poly ch.8, Th. 1.2, Prop. 1.2–1.4, éq. (9), Ex. 1.6 (Figure 2) ; PC8 Ex. 5',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hL = plot(plots[0], [], {})
    const hR = plot(plots[1], [], {})
    let loi: Loi = 'gauss'
    let m1 = 2
    let mm1 = 0
    let s1 = 1
    let sm1 = 1
    let p = 0.5

    const draw = () => {
      const lo = Math.min(m1 - 4 * s1, mm1 - 4 * sm1)
      const hi = Math.max(m1 + 4 * s1, mm1 + 4 * sm1)
      const xs = linspace(lo, hi, 1601)
      const a = xs.map((x) => p * dens(loi, x, m1, s1))
      const b = xs.map((x) => (1 - p) * dens(loi, x, mm1, sm1))
      const mn = a.map((v, i) => Math.min(v, b[i]))
      const dx = xs[1] - xs[0]
      let rstar = 0
      for (let i = 0; i < xs.length; i++) rstar += mn[i] * dx
      const dec = a.map((v, i) => v + b[i] > 0 && v >= b[i])
      const eta = a.map((v, i) => (v + b[i] > 1e-12 ? v / (v + b[i]) : NaN))
      const zones = regions(xs, dec)
      const ymax = Math.max(...a, ...b) * 1.1
      const shapes = zones.map(([u, v]) => ({ type: 'rect', x0: u, x1: v, y0: 0, y1: 1, yref: 'paper', fillcolor: hexToRgba(COLORS.red, 0.08), line: { width: 0 }, layer: 'below' }))
      hL.update(
        [
          areaTrace(xs, mn, 'aire = R* (risque de Bayes)', COLORS.gray),
          lineTrace(xs, a, 'p q₁ (classe 1)', COLORS.red),
          lineTrace(xs, b, '(1 − p) q₋₁ (classe −1)', COLORS.blue),
        ],
        { title: 'Densités de classe pondérées', xaxis: { title: 'x' }, yaxis: { title: 'densité', range: [0, ymax] }, shapes },
      )
      hR.update(
        [lineTrace(xs, eta, 'η(x) = P(Y = 1 | X = x)', COLORS.purple, { connectgaps: false })],
        { title: 'Fonction de régression et décision de g*', xaxis: { title: 'x', range: [lo, hi] }, yaxis: { title: 'η(x)', range: [-0.02, 1.02] }, shapes: [...shapes, hline(0.5, COLORS.gray, 'dash')] },
      )
      const zonesTxt = zones.length
        ? zones.map(([u, v]) => `$[${u.toFixed(2)};${v.toFixed(2)}]$`).join(', ')
        : 'aucune (on prédit toujours $-1$)'
      const mid = (m1 + mm1) / 2
      const equal = loi === 'gauss' && Math.abs(s1 - sm1) < 1e-9
      const extra = equal
        ? Math.abs(p - 0.5) < 1e-9
          ? `Mêmes variances et $p=1/2$ : le seuil est au **milieu** $\\frac{\\mu_1+\\mu_{-1}}2=${mid.toFixed(2)}$ (Ex. 1.6).`
          : `Mêmes variances mais $p\\ne1/2$ : le seuil se décale de $\\sigma^2\\log\\frac{1-p}p/(\\mu_1-\\mu_{-1})$ vers la classe la moins probable.`
        : 'Variances différentes (ou lois uniformes) : la zone « classe 1 » peut être formée de plusieurs intervalles (cas QDA, Figure 2 du poly).'
      info.innerHTML = richToHtml(
        `**Risque de Bayes** $R^\\star=\\mathbb{E}[\\min(\\eta(X),1-\\eta(X))]=\\int\\min(p\\,q_1,(1-p)\\,q_{-1})\\approx${rstar.toFixed(4)}$, à comparer au meilleur classifieur constant $\\min(p,1-p)=${Math.min(p, 1 - p).toFixed(3)}$. Zone(s) où $g^\\star$ prédit $1$ (fond rose) : ${zonesTxt}. Par (9), $g^\\star(x)=1\\iff p\\,q_1(x)\\ge(1-p)\\,q_{-1}(x)\\iff\\eta(x)\\ge1/2$. ${extra} L’erreur ne descend pas à 0 tant que les deux densités pondérées se recouvrent : c’est l’**erreur irréductible**.`,
      )
    }

    const seg = segmented<Loi>(
      [
        { value: 'gauss', label: 'gaussiennes' },
        { value: 'unif', label: 'uniformes' },
      ],
      loi,
      (v) => {
        loi = v
        draw()
      },
    )
    const fmt = (v: number) => v.toFixed(2)
    const sM1 = slider({ label: '$\\mu_1$', min: -3, max: 5, step: 0.05, value: m1, format: fmt, onChange: (v) => ((m1 = v), draw()) })
    const sMm1 = slider({ label: '$\\mu_{-1}$', min: -3, max: 5, step: 0.05, value: mm1, format: fmt, onChange: (v) => ((mm1 = v), draw()) })
    const sS1 = slider({ label: '$\\sigma_1$', min: 0.2, max: 3, step: 0.001, value: s1, format: fmt, onChange: (v) => ((s1 = v), draw()) })
    const sSm1 = slider({ label: '$\\sigma_{-1}$', min: 0.2, max: 3, step: 0.001, value: sm1, format: fmt, onChange: (v) => ((sm1 = v), draw()) })
    const sP = slider({ label: '$p$', min: 0.05, max: 0.95, step: 0.01, value: p, format: fmt, onChange: (v) => ((p = v), draw()) })
    const preset = (l: Loi, a: number, b: number, c: number, d: number, q: number) => {
      loi = l
      seg.setValue?.(l)
      m1 = a
      mm1 = b
      s1 = c
      sm1 = d
      p = q
      sM1.set(a)
      sMm1.set(b)
      sS1.set(c)
      sSm1.set(d)
      sP.set(q)
      draw()
    }
    controls.append(
      seg,
      sM1.root,
      sMm1.root,
      sS1.root,
      sSm1.root,
      sP.root,
      button('Ex. 1.6 (seuil au milieu)', () => preset('gauss', 2, 0, 1, 1, 0.5)),
      button('PC8 Ex. 5 (uniformes)', () => preset('unif', 2.5, 1, 3 / Math.sqrt(12), 2 / Math.sqrt(12), 0.5)),
    )
    draw()
    return () => {
      hL.destroy()
      hR.destroy()
    }
  },
}
