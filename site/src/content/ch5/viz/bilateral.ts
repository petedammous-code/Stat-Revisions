import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, hline, vline, COLORS, hexToRgba } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal } from '../../../sim/rng'
import { normalCdf, normalQuantile, linspace } from '../../../sim/stats'

/** Absence de test U.P.P. bilatéral : puissances des tests à droite, à gauche et bilatéral (Exercice 5 / PC5 Ex. 2). */
export const vizBilateral: Viz = {
  id: 'ch5-bilateral',
  title: 'Pas de test U.P.P. bilatéral : trois fonctions puissance qui se croisent',
  description:
    'Modèle $\\mathcal{N}(\\theta,1)$, $n$ observations, $H_0:\\theta=\\theta_0$. Fonctions puissance de $\\phi^{\\star,1}$ (rejet si $\\bar X_n>\\theta_0+z_{1-\\alpha}/\\sqrt n$, bleu), $\\phi^{\\star,2}$ (rejet si $\\bar X_n<\\theta_0-z_{1-\\alpha}/\\sqrt n$, orange) et $\\phi^{\\star,3}$ (rejet si $|\\bar X_n-\\theta_0|>z_{1-\\alpha/2}/\\sqrt n$, vert). Les bandes colorées sous la ligne $\\alpha$ montrent où un test unilatéral a une puissance $<\\alpha$ (test **biaisé**). Curseurs $n$, $\\alpha$, $\\theta$ ; le bouton tire un échantillon sous $\\mathbb{P}_\\theta$ et affiche les trois décisions.',
  source: 'Poly ch.5, Prop. 1.1, Ex. 1.6, Exercice 5 (figures p. 41) ; Déf. 1.2 (figure p. 11) ; PC5 Ex. 2',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    const h = plot(plotEl, [], {})
    const theta0 = 0
    let n = 10
    let alpha = 0.05
    let theta = 0.5
    let seed = 1
    let lastDraw: { xbar: number; d: [boolean, boolean, boolean] } | null = null

    const b1 = (t: number) => 1 - normalCdf(Math.sqrt(n) * (theta0 - t) + normalQuantile(1 - alpha))
    const b2 = (t: number) => normalCdf(Math.sqrt(n) * (theta0 - t) - normalQuantile(1 - alpha))
    const b3 = (t: number) => {
      const z = normalQuantile(1 - alpha / 2)
      return 1 - normalCdf(z + Math.sqrt(n) * (theta0 - t)) + normalCdf(-z + Math.sqrt(n) * (theta0 - t))
    }

    const draw = () => {
      const w = Math.max(1, 4 / Math.sqrt(n))
      const grid = linspace(theta0 - w, theta0 + w, 400)
      const traces: Record<string, unknown>[] = [
        lineTrace(grid, grid.map(b1), 'φ*,1 (à droite) : U.P.P. pour θ > θ₀', COLORS.blue),
        lineTrace(grid, grid.map(b2), 'φ*,2 (à gauche) : U.P.P. pour θ < θ₀', COLORS.orange),
        lineTrace(grid, grid.map(b3), 'φ*,3 (bilatéral) : sans biais, U.M.P.U.', COLORS.green),
        pointsTrace([theta], [b3(theta)], 'θ courant', COLORS.gray, { marker: { color: COLORS.gray, size: 9 }, showlegend: false }),
      ]
      h.update(traces, {
        title: { text: `Puissances, n = ${n}, α = ${alpha.toFixed(2)}, θ₀ = 0` },
        xaxis: { title: { text: 'θ' }, range: [theta0 - w, theta0 + w] },
        yaxis: { title: { text: 'β(θ)' }, range: [-0.02, 1.02] },
        legend: { orientation: 'h', y: -0.3 },
        shapes: [
          { type: 'rect', x0: theta0 - w, x1: theta0, y0: 0, y1: alpha, fillcolor: hexToRgba(COLORS.blue, 0.12), line: { width: 0 } },
          { type: 'rect', x0: theta0, x1: theta0 + w, y0: 0, y1: alpha, fillcolor: hexToRgba(COLORS.orange, 0.12), line: { width: 0 } },
          hline(alpha, COLORS.red, 'dash'),
          vline(theta0, COLORS.gray, 'dot'),
          vline(theta, COLORS.gray, 'dash'),
        ],
      })
      const fmt = (p: number) => (p >= 0.001 ? p.toFixed(3) : p.toExponential(1).replace('e', '\\cdot10^{') + '}')
      const dec = lastDraw
        ? `

**Échantillon tiré sous $\\mathbb{P}_{${theta.toFixed(2)}}$** : $\\bar X_n=${lastDraw.xbar.toFixed(3)}$. Décisions : $\\phi^{\\star,1}$ ${lastDraw.d[0] ? '**rejette**' : 'ne rejette pas'}, $\\phi^{\\star,2}$ ${lastDraw.d[1] ? '**rejette**' : 'ne rejette pas'}, $\\phi^{\\star,3}$ ${lastDraw.d[2] ? '**rejette**' : 'ne rejette pas'}.`
        : ''
      info.innerHTML = richToHtml(
        `En $\\theta=${theta.toFixed(2)}$ : $\\beta_{\\phi^{\\star,1}}=${fmt(b1(theta))}$, $\\beta_{\\phi^{\\star,2}}=${fmt(b2(theta))}$, $\\beta_{\\phi^{\\star,3}}=${fmt(b3(theta))}$ (pour $n=10$, $\\theta=0{,}5$ : $0{,}475$ ; $0{,}0006$ ; $0{,}353$). Les trois valent $\\alpha$ en $\\theta_0$. À droite de $\\theta_0$, $\\phi^{\\star,1}$ domine tout test de niveau $\\alpha$ ; à gauche, c’est $\\phi^{\\star,2}$. Un test U.P.P. pour $\\theta\\ne\\theta_0$ devrait coïncider avec **les deux** (unicité, Th. 1.2) : impossible (Prop. 1.1). Le test bilatéral est un compromis : sa courbe en U a une **tangente horizontale** en $\\theta_0$ ($\\beta\'(\\theta_0)=0$, condition (5)) et reste $\\ge\\alpha$ partout (sans biais), mais elle est dominée de chaque côté.${dec}`,
      )
    }

    controls.append(slider({ label: '$n$', min: 1, max: 50, step: 1, value: n, onChange: (v) => { n = v; lastDraw = null; draw() } }).root)
    controls.append(slider({ label: '$\\alpha$', min: 0.01, max: 0.2, step: 0.01, value: alpha, format: (v) => v.toFixed(2), onChange: (v) => { alpha = v; lastDraw = null; draw() } }).root)
    controls.append(slider({ label: '$\\theta$', min: -1.5, max: 1.5, step: 0.05, value: theta, format: (v) => v.toFixed(2), onChange: (v) => { theta = v; lastDraw = null; draw() } }).root)
    controls.append(
      button('Tirer un échantillon', () => {
        const rng = makeRng(7300 + seed++)
        let s = 0
        for (let i = 0; i < n; i++) s += normal(rng, theta, 1)
        const xbar = s / n
        const z1 = normalQuantile(1 - alpha) / Math.sqrt(n)
        const z2 = normalQuantile(1 - alpha / 2) / Math.sqrt(n)
        lastDraw = { xbar, d: [xbar > theta0 + z1, xbar < theta0 - z1, Math.abs(xbar - theta0) > z2] }
        draw()
      }),
    )
    draw()
    return () => h.destroy()
  },
}
