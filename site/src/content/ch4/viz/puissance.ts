import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, areaTrace, vline, hline, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal } from '../../../sim/rng'
import { normalCdf, normalPdf, normalQuantile, linspace } from '../../../sim/stats'

type Side = 'uni' | 'bi'

/** Puissance du z-test (σ = 1) : unilatéral H0 : θ ≤ θ0 (Ex. 2.3–2.4) ou bilatéral H0 : θ = θ0 (Ex. 2.10). */
function power(theta: number, theta0: number, n: number, c: number, side: Side): number {
  const d = Math.sqrt(n) * (theta - theta0)
  if (side === 'uni') return 1 - normalCdf(c - d)
  return 1 - normalCdf(c - d) + normalCdf(-c - d)
}

/** Région de rejet, erreurs de première et seconde espèce, fonction puissance du test gaussien. */
export const vizPuissance: Viz = {
  id: 'ch4-puissance',
  title: 'Région de rejet, erreurs de 1re et 2e espèce, fonction puissance',
  description:
    'Modèle $\\mathcal{N}(\\theta,1)$, $n$-échantillon, $\\theta_0=2$ ; statistique $T(Z)=\\sqrt n(\\bar X_n-\\theta_0)$, de loi $\\mathcal{N}(0,1)$ sous $\\mathbb{P}_{\\theta_0}$ et $\\mathcal{N}(\\sqrt n(\\theta-\\theta_0),1)$ sous $\\mathbb{P}_\\theta$. **À gauche** : densités de $T(Z)$ sous $\\theta_0$ (bleu) et sous le $\\theta$ choisi (orange) ; la région de rejet $\\{T\\ge c\\}$ (unilatéral, $H_0:\\theta\\le\\theta_0$) ou $\\{|T|\\ge c\\}$ (bilatéral, $H_0:\\theta=\\theta_0$) est ombrée : aire rouge = **taille**, aire verte = **puissance** en $\\theta$, aire orange = **risque de seconde espèce** $1-\\beta_\\phi(\\theta)$. **À droite** : la fonction puissance $\\theta\\mapsto\\beta_\\phi(\\theta)$. Curseurs $\\theta$, $n$ et valeur critique $c$ (ou niveau $\\alpha$) : baisser $c$ augmente **à la fois** la taille et la puissance (Ex. 2.4). Bouton : tirer un échantillon sous $\\mathbb{P}_\\theta$ et lire la décision.',
  source: 'Poly ch.4, Déf. 2.2–2.3, Ex. 2.3, Ex. 2.4, Ex. 2.10 ; PC4 Ex. 2 Q1–Q2',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const theta0 = 2
    let theta = 2.3
    let n = 50
    let alpha = 0.05
    let side: Side = 'uni'
    let freeC = false
    let cFree = 1.645
    let obs: number | null = null
    let seed = 3
    const hL = plot(plots[0], [], {})
    const hR = plot(plots[1], [], {})

    const critical = () => (freeC ? cFree : side === 'uni' ? normalQuantile(1 - alpha) : normalQuantile(1 - alpha / 2))

    const draw = () => {
      const c = critical()
      const d = Math.sqrt(n) * (theta - theta0)
      const lo = Math.min(-4, d - 4)
      const hi = Math.max(4, d + 4)
      const xs = linspace(lo, hi, 400)
      const f0 = xs.map((x) => normalPdf(x))
      const f1 = xs.map((x) => normalPdf(x, d, 1))
      const inR = (x: number) => (side === 'uni' ? x >= c : Math.abs(x) >= c)
      const traces: Record<string, unknown>[] = []
      // aires : taille (sous H0 dans R), puissance (sous θ dans R), 2e espèce (sous θ hors R)
      const pieces = (pred: (x: number) => boolean, ys: number[]) => xs.map((x, i) => (pred(x) ? ys[i] : 0))
      traces.push(areaTrace(xs, pieces((x) => !inR(x), f1), '2e espèce', COLORS.orange))
      traces.push(areaTrace(xs, pieces(inR, f1), 'puissance', COLORS.green))
      traces.push(areaTrace(xs, pieces(inR, f0), 'taille', COLORS.red))
      traces.push(lineTrace(xs, f0, 'T sous θ₀', COLORS.blue))
      traces.push(lineTrace(xs, f1, 'T sous θ', COLORS.orange, { line: { color: COLORS.orange, width: 2.5, dash: 'dot' } }))
      if (obs !== null) traces.push(pointsTrace([obs], [0.02], 'T observé', COLORS.purple, { marker: { color: COLORS.purple, size: 12, symbol: 'diamond' } }))
      const shapes = [vline(c, COLORS.gray, 'dash')]
      if (side === 'bi') shapes.push(vline(-c, COLORS.gray, 'dash'))
      hL.update(traces, {
        title: { text: side === 'uni' ? `densités de T(Z) ; R = {T ≥ ${c.toFixed(3)}}` : `densités de T(Z) ; R = {|T| ≥ ${c.toFixed(3)}}` },
        xaxis: { range: [lo, hi] },
        yaxis: { title: { text: 'densité' }, rangemode: 'tozero' },
        shapes,
        legend: { orientation: 'h', y: -0.12 },
      })
      const grid = linspace(theta0 - 1.2, theta0 + 1.2, 241)
      const pw = (nn: number) => grid.map((t) => power(t, theta0, nn, c, side))
      const rTraces: Record<string, unknown>[] = [
        lineTrace(grid, pw(n), `β(θ), n = ${n}`, COLORS.blue),
        lineTrace(grid, pw(Math.max(2, Math.round(n / 4))), `β(θ), n = ${Math.max(2, Math.round(n / 4))}`, COLORS.teal, { line: { color: COLORS.teal, width: 1.5, dash: 'dot' } }),
        pointsTrace([theta], [power(theta, theta0, n, c, side)], 'θ choisi', COLORS.orange),
      ]
      const size = side === 'uni' ? 1 - normalCdf(c) : 2 * (1 - normalCdf(c))
      hR.update(rTraces, {
        title: { text: 'fonction puissance θ ↦ β(θ)' },
        xaxis: {},
        yaxis: { title: { text: 'β(θ)' }, range: [0, 1.02] },
        shapes: [vline(theta0, COLORS.gray, 'dot'), hline(size, COLORS.red, 'dot')],
        legend: { orientation: 'h', y: -0.12 },
      })
      const b = power(theta, theta0, n, c, side)
      const inH0 = side === 'uni' ? theta <= theta0 : theta === theta0
      let decision = ''
      if (obs !== null)
        decision = ` **Échantillon tiré sous $\\theta=${theta.toFixed(2)}$ :** $T(Z)=${obs.toFixed(2)}$ ⇒ ${inR(obs) ? '**on rejette** $H_0$' : '**on échoue à rejeter** $H_0$'}${inR(obs) && inH0 ? ' — erreur de **première espèce** !' : ''}${!inR(obs) && !inH0 ? ' — erreur de **seconde espèce** !' : ''}.`
      info.innerHTML = richToHtml(
        `${side === 'uni' ? '$H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$, $\\beta_\\phi(\\theta)=1-\\Phi(c-\\sqrt n(\\theta-\\theta_0))$ (Ex. 2.3).' : '$H_0:\\theta=\\theta_0$ contre $H_1:\\theta\\ne\\theta_0$, $\\beta_\\phi(\\theta)=1-\\Phi(c-\\sqrt n(\\theta-\\theta_0))+\\Phi(-c-\\sqrt n(\\theta-\\theta_0))$ (Ex. 2.10).'} Valeur critique $c=${c.toFixed(3)}$ ; **taille** $\\overline{\\alpha}(\\phi)=${size.toFixed(4)}$. En $\\theta=${theta.toFixed(2)}$ : ${inH0 ? `$\\theta\\in\\Theta_0$, probabilité de rejeter à tort $\\beta_\\phi(\\theta)=${b.toFixed(4)}$ (risque de première espèce, $\\le$ taille).` : `$\\theta\\in\\Theta_1$, **puissance** $\\beta_\\phi(\\theta)=${b.toFixed(4)}$, risque de seconde espèce $1-\\beta_\\phi(\\theta)=${(1 - b).toFixed(4)}$.`} La puissance est continue en $\\theta_0$ : impossible de sauter de $0$ à $1$, le test idéal n’existe pas.${decision}`,
      )
    }

    const cSlider = slider({
      label: 'valeur critique $c$',
      min: 0,
      max: 3.5,
      step: 0.01,
      value: cFree,
      format: (v) => v.toFixed(2),
      onChange: (v) => {
        cFree = v
        freeC = true
        modeCtl.setValue?.('c')
        draw()
      },
    })
    const aSlider = slider({
      label: 'niveau $\\alpha$',
      min: 0.005,
      max: 0.3,
      step: 0.005,
      value: alpha,
      format: (v) => v.toFixed(3),
      onChange: (v) => {
        alpha = v
        freeC = false
        modeCtl.setValue?.('alpha')
        draw()
      },
    })
    const modeCtl = segmented<'alpha' | 'c'>(
      [
        { value: 'alpha', label: '$c$ calibré par $\\alpha$' },
        { value: 'c', label: '$c$ libre' },
      ],
      'alpha',
      (v) => {
        freeC = v === 'c'
        draw()
      },
    )
    controls.append(
      segmented<Side>(
        [
          { value: 'uni', label: 'Unilatéral' },
          { value: 'bi', label: 'Bilatéral' },
        ],
        side,
        (v) => {
          side = v
          obs = null
          draw()
        },
      ),
    )
    controls.append(modeCtl, aSlider.root, cSlider.root)
    controls.append(
      slider({
        label: '$\\theta$',
        min: 1,
        max: 3,
        step: 0.01,
        value: theta,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          theta = v
          obs = null
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$n$',
        min: Math.log10(2),
        max: Math.log10(500),
        step: 0.02,
        value: Math.log10(n),
        log: true,
        integer: true,
        format: (v) => String(v),
        onChange: (v) => {
          n = Math.max(2, v)
          obs = null
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer un échantillon sous θ', () => {
        seed++
        const rng = makeRng(9100 + seed)
        let s = 0
        for (let i = 0; i < n; i++) s += normal(rng, theta, 1)
        obs = Math.sqrt(n) * (s / n - theta0)
        draw()
      }),
    )
    draw()
    return () => {
      hL.destroy()
      hR.destroy()
    }
  },
}
