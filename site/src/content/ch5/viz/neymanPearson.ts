import type { Viz } from '../../types'
import { vizFrame, slider, segmented } from '../../../core/ui'
import { plot, lineTrace, areaTrace, hline, COLORS, hexToRgba } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { normalCdf, normalPdf, normalQuantile, linspace } from '../../../sim/stats'

type Region = 'np' | 'droite' | 'gauche' | 'centre' | 'bilat'
type Interval = [number, number]

const MU0 = 0
const S0 = 1

/** Probabilité d'une union d'intervalles disjoints sous N(mu, s^2). */
function probIntervals(iv: Interval[], mu: number, s: number): number {
  let p = 0
  for (const [l, u] of iv) p += normalCdf((u - mu) / s) - normalCdf((l - mu) / s)
  return Math.min(1, Math.max(0, p))
}

/** Coefficients du log-rapport log r(z) = a z^2 + b z + c (deux gaussiennes). */
function logRatioCoefs(mu1: number, s1: number): { a: number; b: number; c: number } {
  return {
    a: 1 / (2 * S0 * S0) - 1 / (2 * s1 * s1),
    b: mu1 / (s1 * s1) - MU0 / (S0 * S0),
    c: Math.log(S0 / s1) - (mu1 * mu1) / (2 * s1 * s1) + (MU0 * MU0) / (2 * S0 * S0),
  }
}

/** Région {a z^2 + b z + c > k} sous forme d'intervalles. */
function regionAbove(a: number, b: number, c: number, k: number): Interval[] {
  if (Math.abs(a) < 1e-10) {
    if (Math.abs(b) < 1e-12) return c > k ? [[-Infinity, Infinity]] : []
    const r = (k - c) / b
    return b > 0 ? [[r, Infinity]] : [[-Infinity, r]]
  }
  const D = b * b - 4 * a * (c - k)
  if (D <= 0) return a > 0 ? [[-Infinity, Infinity]] : []
  const sq = Math.sqrt(D)
  const r1 = (-b - sq) / (2 * a)
  const r2 = (-b + sq) / (2 * a)
  const lo = Math.min(r1, r2)
  const hi = Math.max(r1, r2)
  return a > 0 ? [[-Infinity, lo], [hi, Infinity]] : [[lo, hi]]
}

/** Régions de taille alpha sous N(0,1). */
function fixedRegion(r: Exclude<Region, 'np'>, alpha: number): Interval[] {
  if (r === 'droite') return [[normalQuantile(1 - alpha), Infinity]]
  if (r === 'gauche') return [[-Infinity, normalQuantile(alpha)]]
  if (r === 'centre') {
    const c = normalQuantile((1 + alpha) / 2)
    return [[-c, c]]
  }
  const c = normalQuantile(1 - alpha / 2)
  return [[-Infinity, -c], [c, Infinity]]
}

const LABELS: Record<Region, string> = {
  np: 'Neyman-Pearson {r > c_α}',
  droite: 'queue droite {z > z₁₋α}',
  gauche: 'queue gauche {z < z_α}',
  centre: 'centrale {|z| < c}',
  bilat: 'bilatérale {|z| > z₁₋α/₂}',
}

/** Neyman-Pearson : densités sous θ0 et θ1, rapport de vraisemblance, seuil c_α, aires α et puissance. */
export const vizNeymanPearson: Viz = {
  id: 'ch5-neyman-pearson',
  title: 'Neyman-Pearson : acheter la région où le rapport de vraisemblance est le plus grand',
  description:
    'Une observation $Z$ ; $p_{\\theta_0}=\\mathcal{N}(0,1)$ (rouge) contre $p_{\\theta_1}=\\mathcal{N}(\\mu_1,\\sigma_1^2)$ (vert). À gauche : la région de rejet choisie, l’aire rouge $=\\mathbb{P}_{\\theta_0}(Z\\in\\mathcal{R})$ (taille, réglée à $\\alpha$) et l’aire verte $=\\mathbb{P}_{\\theta_1}(Z\\in\\mathcal{R})$ (puissance). À droite : le log-rapport $\\log r(z)$ et le seuil $\\log c_\\alpha$. Curseurs $\\mu_1$, $\\sigma_1$, $\\alpha$ ; boutons pour comparer la région de Neyman-Pearson aux autres régions de même taille (figure p. 10 du poly). Avec $\\sigma_1\\ne1$, la région optimale devient un intervalle ou le complémentaire d’un intervalle (Ex. 1.2).',
  source: 'Poly ch.5, Th. 1.1, §1.1 (figure p. 10), §1.5 (énigme), Ex. 1.1–1.2',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    let mu1 = 2
    let s1 = 1
    let alpha = 0.1
    let region: Region = 'np'

    const draw = () => {
      const { a, b, c } = logRatioCoefs(mu1, s1)
      const degenerate = Math.abs(mu1 - MU0) < 1e-9 && Math.abs(s1 - S0) < 1e-9
      // seuil k = log c_alpha par dichotomie : P0(log r > k) = alpha (fonction décroissante de k)
      let lo = -300
      let hi = 300
      for (let i = 0; i < 200; i++) {
        const mid = (lo + hi) / 2
        if (probIntervals(regionAbove(a, b, c, mid), MU0, S0) > alpha) lo = mid
        else hi = mid
      }
      const kAlpha = (lo + hi) / 2
      const npIv = regionAbove(a, b, c, kAlpha)
      const iv = region === 'np' ? npIv : fixedRegion(region, alpha)
      const size = probIntervals(iv, MU0, S0)
      const power = probIntervals(iv, mu1, s1)
      const xmin = Math.min(-4, mu1 - 4 * s1)
      const xmax = Math.max(4, mu1 + 4 * s1)
      const grid = linspace(xmin, xmax, 500)
      const p0 = grid.map((x) => normalPdf(x, MU0, S0))
      const p1 = grid.map((x) => normalPdf(x, mu1, s1))
      const traces: Record<string, unknown>[] = [lineTrace(grid, p0, 'p(θ₀) = N(0,1)', COLORS.red), lineTrace(grid, p1, `p(θ₁) = N(${mu1.toFixed(1)}, ${(s1 * s1).toFixed(2)})`, COLORS.green)]
      iv.forEach(([l, u], j) => {
        const L = Math.max(l, xmin)
        const U = Math.min(u, xmax)
        if (U <= L) return
        const g = linspace(L, U, 120)
        traces.push(areaTrace(g, g.map((x) => normalPdf(x, MU0, S0)), 'taille (aire sous p(θ₀))', COLORS.red, { showlegend: j === 0, fillcolor: hexToRgba(COLORS.red, 0.45) }))
        traces.push(areaTrace(g, g.map((x) => normalPdf(x, mu1, s1)), 'puissance (aire sous p(θ₁))', COLORS.green, { showlegend: j === 0, fillcolor: hexToRgba(COLORS.green, 0.3) }))
      })
      const bands = iv
        .map(([l, u]) => ({ x0: Math.max(l, xmin), x1: Math.min(u, xmax) }))
        .filter((s) => s.x1 > s.x0)
        .map((s) => ({ type: 'rect', x0: s.x0, x1: s.x1, y0: 0, y1: 1, yref: 'paper', fillcolor: hexToRgba(COLORS.purple, 0.1), line: { width: 0 } }))
      hLeft.update(traces, {
        title: { text: `Région : ${LABELS[region]}` },
        xaxis: { title: { text: 'z' }, range: [xmin, xmax] },
        yaxis: { title: { text: 'densité' } },
        shapes: bands,
      })
      const lr = grid.map((x) => a * x * x + b * x + c)
      const lrClip = lr.map((v) => Math.max(-12, Math.min(12, v)))
      hRight.update(
        [lineTrace(grid, lrClip, 'log r(z)', COLORS.blue)],
        {
          title: { text: 'Log-rapport de vraisemblance et seuil log c_α' },
          xaxis: { title: { text: 'z' }, range: [xmin, xmax] },
          yaxis: { title: { text: 'log r(z)' }, range: [-12, 12] },
          shapes: [...bands, hline(Math.max(-12, Math.min(12, kAlpha)), COLORS.orange, 'dash')],
        },
      )
      const others = (['droite', 'gauche', 'centre', 'bilat'] as const)
        .map((r) => `${LABELS[r]} : puissance ${probIntervals(fixedRegion(r, alpha), mu1, s1).toFixed(3)}`)
        .join(' ; ')
      const npPow = probIntervals(npIv, mu1, s1)
      const shape =
        Math.abs(a) < 1e-10
          ? b > 0
            ? 'une **demi-droite** $\\{z>d_\\alpha\\}$ (log-rapport affine croissant, comme dans l’Ex. 1.1)'
            : 'une **demi-droite** $\\{z<d_\\alpha\\}$ (log-rapport affine décroissant)'
          : a < 0
            ? 'un **intervalle** (trinôme de coefficient dominant $\\frac12(\\sigma_0^{-2}-\\sigma_1^{-2})<0$ car $\\sigma_1<\\sigma_0$, Ex. 1.2)'
            : 'le **complémentaire d’un intervalle** (coefficient dominant $>0$ car $\\sigma_1>\\sigma_0$, Ex. 1.2)'
      info.innerHTML = degenerate
        ? richToHtml('Les deux lois sont identiques : tout test de niveau $\\alpha$ a une puissance $\\le\\alpha$ ; le rapport de vraisemblance vaut $1$ partout (atome !). Déplacer $\\mu_1$ ou $\\sigma_1$.')
        : richToHtml(
            `**Région affichée** : taille $\\mathbb{P}_{\\theta_0}(Z\\in\\mathcal{R})=${size.toFixed(3)}$, puissance $\\mathbb{P}_{\\theta_1}(Z\\in\\mathcal{R})=${power.toFixed(3)}$.

**Neyman-Pearson** (Th. 1.1) : $\\log c_\\alpha\\approx${kAlpha.toFixed(2)}$, région $\\{p_{\\theta_1}(z)>c_\\alpha p_{\\theta_0}(z)\\}$ = ${shape}, puissance ${npPow.toFixed(3)} — la plus grande parmi **tous** les tests de niveau $\\alpha=${alpha.toFixed(2)}$.

Autres régions de même taille : ${others}. Le budget $\\alpha$ (coût $\\int_{\\mathcal{R}}p_{\\theta_0}$) est le même pour toutes ; le gain $\\int_{\\mathcal{R}}p_{\\theta_1}$ est maximal quand on achète les points de plus grand rapport gain/coût $r(z)$ (§1.5).`,
          )
    }

    controls.append(
      segmented<Region>(
        [
          { value: 'np', label: 'Neyman-Pearson' },
          { value: 'droite', label: 'queue droite' },
          { value: 'gauche', label: 'queue gauche' },
          { value: 'centre', label: 'centrale' },
          { value: 'bilat', label: 'bilatérale' },
        ],
        region,
        (v) => {
          region = v
          draw()
        },
      ),
    )
    controls.append(slider({ label: '$\\mu_1$', min: -3, max: 3, step: 0.1, value: mu1, format: (v) => v.toFixed(1), onChange: (v) => { mu1 = v; draw() } }).root)
    controls.append(slider({ label: '$\\sigma_1$', min: 0.4, max: 2.5, step: 0.05, value: s1, format: (v) => v.toFixed(2), onChange: (v) => { s1 = v; draw() } }).root)
    controls.append(slider({ label: '$\\alpha$', min: 0.01, max: 0.3, step: 0.01, value: alpha, format: (v) => v.toFixed(2), onChange: (v) => { alpha = v; draw() } }).root)
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
