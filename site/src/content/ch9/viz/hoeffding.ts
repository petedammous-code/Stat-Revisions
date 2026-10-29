import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, barTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, beta, type Rng } from '../../../sim/rng'
import { histogram, binomialPmf } from '../../../sim/stats'
import { debounced } from './outils'

type Law = 'bern' | 'unif' | 'u'

interface LawSpec {
  label: string
  tex: (p: number) => string
  mean: (p: number) => number
  variance: (p: number) => number
  draw: (rng: Rng, p: number) => number
}

const LAWS: Record<Law, LawSpec> = {
  bern: { label: 'Bernoulli(p)', tex: (p) => `\\mathcal{B}\\mathrm{er}(${p.toFixed(2)})`, mean: (p) => p, variance: (p) => p * (1 - p), draw: (r, p) => (r() < p ? 1 : 0) },
  unif: { label: 'Uniforme [0,1]', tex: () => '\\mathcal U([0,1])', mean: () => 0.5, variance: () => 1 / 12, draw: (r) => r() },
  u: { label: 'Bêta(0,2 ; 0,2)', tex: () => '\\mathrm{Beta}(0{,}2;0{,}2)', mean: () => 0.5, variance: () => 0.25 / 1.4, draw: (r) => beta(r, 0.2, 0.2) },
}

/** P(|S/n - p| > eps) exactement pour S ~ Bin(n,p). */
function exactTail(n: number, p: number, eps: number): number {
  let s = 0
  for (let k = 0; k <= n; k++) if (Math.abs(k / n - p) > eps + 1e-12) s += binomialPmf(k, n, p)
  return Math.min(1, s)
}

/** Inégalité de Hoeffding : histogramme de la moyenne empirique et comparaison des bornes (Fig. 8 du poly). */
export const vizHoeffding: Viz = {
  id: 'ch9-hoeffding',
  title: 'Inégalité de Hoeffding : déviations de la moyenne empirique de variables bornées',
  description:
    'À gauche : histogramme de $\\frac1n\\sum_{i=1}^n\\{X_i-\\mathbb E[X_i]\\}$ sur $2000$ échantillons de $n$ variables indépendantes à valeurs dans $[0,1]$ (loi au choix), avec les seuils $\\pm\\varepsilon$ ; la fréquence des dépassements est comparée à la borne de Hoeffding $2e^{-2n\\varepsilon^2}$ (Th. 1.3) et à celle de Bienaymé-Tchebychev $\\mathrm{Var}(X_1)/(n\\varepsilon^2)$. À droite (loi de Bernoulli, Fig. 8 du poly) : probabilité **exacte** $\\mathbb P(|\\bar Z_n-p|>\\varepsilon)$ en fonction de $n$, les deux bornes, et l’écriture **fausse** $2e^{-2n\\varepsilon}$. Curseurs $n$, $\\varepsilon$, $p$.',
  source: 'Poly ch.9, Th. 1.3 et 1.4, remarques p. 17–18 ; Outils §2.5 (Fig. 8)',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let n = 50
    let eps = 0.1
    let p = 0.5
    let law: Law = 'bern'
    let seed = 1
    const R = 2000
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})

    const draw = () => {
      const spec = LAWS[law]
      const mu = spec.mean(p)
      const rng = makeRng(9400 + seed)
      const dev = new Array<number>(R)
      let out = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += spec.draw(rng, p)
        dev[r] = s / n - mu
        if (Math.abs(dev[r]) >= eps) out++
      }
      const lo = Math.min(-0.5, -eps * 1.3)
      const hi = Math.max(0.5, eps * 1.3)
      const h = histogram(dev, Math.min(80, Math.max(20, law === 'bern' ? n + 1 : 60)), lo, hi)
      const hoeff = 2 * Math.exp(-2 * n * eps * eps)
      const bt = spec.variance(p) / (n * eps * eps)
      hLeft.update(
        [barTrace(h.centers, h.density, 'moyenne empirique centrée', COLORS.blue, { width: h.width })],
        {
          title: `${R} moyennes de n = ${n} variables ${spec.label}`,
          xaxis: { title: '(1/n) Σ (Xᵢ − E[Xᵢ])', range: [lo, hi] },
          yaxis: { title: 'densité' },
          shapes: [vline(eps, COLORS.red, 'dash'), vline(-eps, COLORS.red, 'dash')],
          showlegend: false,
        },
      )
      // panneau droit : Bernoulli(p), en fonction de n
      const nmax = Math.max(60, Math.min(1000, Math.ceil((4 * Math.log(2 / 0.001)) / (2 * eps * eps))))
      const ns: number[] = []
      for (let k = 1; k <= nmax; k += Math.max(1, Math.floor(nmax / 150))) ns.push(k)
      const ex = ns.map((k) => Math.max(1e-12, exactTail(k, p, eps)))
      const hb = ns.map((k) => Math.min(1, 2 * Math.exp(-2 * k * eps * eps)))
      const bb = ns.map((k) => Math.min(1, (p * (1 - p)) / (k * eps * eps)))
      const wrong = ns.map((k) => Math.min(1, 2 * Math.exp(-2 * k * eps)))
      hRight.update(
        [
          lineTrace(ns, ex, 'probabilité exacte (binomiale)', '#111827', { mode: 'markers', marker: { color: '#111827', size: 4 } }),
          lineTrace(ns, hb, 'Hoeffding 2·exp(−2nε²)', COLORS.blue),
          lineTrace(ns, bb, 'Bienaymé-Tchebychev p(1−p)/(nε²)', COLORS.orange),
          lineTrace(ns, wrong, 'écriture FAUSSE 2·exp(−2nε)', COLORS.red, { line: { color: COLORS.red, dash: 'dot', width: 2 } }),
        ],
        {
          title: `Bernoulli(${p.toFixed(2)}), ε = ${eps.toFixed(3)} : P(|Z̄ₙ − p| > ε)`,
          xaxis: { title: 'n' },
          yaxis: { title: 'probabilité (échelle log)', type: 'log', range: [-6, 0.05] },
          shapes: [vline(n, COLORS.gray, 'dot')],
        },
      )
      const nNeed = Math.ceil(Math.log(2 / 0.05) / (2 * eps * eps))
      info.innerHTML = richToHtml(
        `**Loi** $${spec.tex(p)}$,$n=${n}$, $\\varepsilon=${eps.toFixed(3)}$ : fréquence observée de $\\{|\\frac1n\\sum(X_i-\\mathbb E X_i)|\\ge\\varepsilon\\}$ = $${(out / R).toFixed(4)}$ ; Hoeffding $2e^{-2n\\varepsilon^2}=${Math.min(1, hoeff).toFixed(4)}$ ; Bienaymé-Tchebychev $${Math.min(1, bt).toFixed(4)}$. Hoeffding ne voit que le **support** $[0,1]$ : il remplace la variance par son maximum $1/4$ ; il est donc d’autant plus pessimiste que la variance est petite (essayez $p=0{,}05$, ou la loi uniforme de variance $1/12$). Mais il décroît **exponentiellement** en $n$, BT seulement en $1/n$. À droite, l’écriture $2e^{-2n\\varepsilon}$ passe **sous** la probabilité exacte pour $\\varepsilon$ petit : elle est fausse. Forme « $\\delta$ » (Th. 1.4) : pour $\\delta=0{,}05$ il suffit de $n\\ge\\ln(2/\\delta)/(2\\varepsilon^2)=${nNeed}$.`,
      )
    }
    const later = debounced(draw, 80)
    controls.append(
      segmented<Law>(
        [
          { value: 'bern', label: 'Bernoulli(p)' },
          { value: 'unif', label: 'Uniforme' },
          { value: 'u', label: 'Bêta(0,2 ; 0,2)' },
        ],
        law,
        (v) => {
          law = v
          draw()
        },
      ),
    )
    controls.append(slider({ label: '$n$', min: 0, max: 3, step: 0.01, value: Math.log10(n), log: true, integer: true, onChange: (v) => { n = Math.max(1, v); later.call() } }).root)
    controls.append(slider({ label: '$\\varepsilon$', min: 0.01, max: 0.4, step: 0.005, value: eps, format: (v) => v.toFixed(3), onChange: (v) => { eps = v; later.call() } }).root)
    controls.append(slider({ label: '$p$', min: 0.02, max: 0.98, step: 0.01, value: p, format: (v) => v.toFixed(2), onChange: (v) => { p = v; later.call() } }).root)
    controls.append(button('Tirer 2000 échantillons', () => { seed++; draw() }))
    draw()
    return () => {
      later.cancel()
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
