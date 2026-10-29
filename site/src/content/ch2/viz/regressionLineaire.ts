import type { Viz } from '../../types'
import { vizFrame, slider, button, toggle } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, barTrace, segmentsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, type Rng } from '../../../sim/rng'
import { linspace, histogram, chi2Pdf, mean } from '../../../sim/stats'

/** Ajuste la droite des moindres carres ; renvoie (b1, b2, sigma2 = SCR/n). */
function fit(xs: number[], ys: number[]): { b1: number; b2: number; s2: number } {
  const n = xs.length
  const xb = mean(xs)
  const yb = mean(ys)
  let sxy = 0
  let sxx = 0
  for (let i = 0; i < n; i++) {
    sxy += (xs[i] - xb) * (ys[i] - yb)
    sxx += (xs[i] - xb) * (xs[i] - xb)
  }
  const b2 = sxy / sxx
  const b1 = yb - b2 * xb
  let scr = 0
  for (let i = 0; i < n; i++) {
    const r = ys[i] - b1 - b2 * xs[i]
    scr += r * r
  }
  return { b1, b2, s2: scr / n }
}

function design(n: number): number[] {
  return linspace(0, 10, n)
}

function sampleY(rng: Rng, xs: number[], b1: number, b2: number, sigma: number): number[] {
  return xs.map((x) => b1 + b2 * x + normal(rng, 0, sigma))
}

/** Regression lineaire gaussienne : nuage, droite des moindres carres (= EMV), residus ; loi chi2(n-2) de n sigma^2 / sigma^2. */
export const vizRegressionLineaire: Viz = {
  id: 'ch2-regression-lineaire',
  title: 'Régression linéaire gaussienne : EMV = moindres carrés, résidus et loi χ²(n−2) de nσ̂²/σ²',
  description:
    'Modèle $Y_i\\sim\\mathcal{N}(\\beta_1+\\beta_2x_i,\\sigma^2)$ indépendants, $x_i$ fixés dans $[0,10]$. À gauche : le nuage $(x_i,Y_i)$, la vraie droite (rouge, pointillés), la droite des **moindres carrés** $\\hat\\beta_1+\\hat\\beta_2x$ (bleu) — c’est l’EMV de $(\\beta_1,\\beta_2)$ — et les résidus $Y_i-\\hat\\beta_1-\\hat\\beta_2x_i$ (segments orange) dont la somme des carrés donne $n\\hat\\sigma^2$. À droite : histogramme de $n\\hat\\sigma^2/\\sigma^2$ sur $2000$ répétitions, superposé à la densité $\\chi^2(n-2)$ (Cochran, PC2 Ex. 1 Q5). Curseurs $n$, $\\sigma$, $\\beta_2$ ; bouton « Tirer ».',
  source: 'PC2 Ex. 1 Q2–Q5 ; Poly ch.2, Exercice 1 (corrigé p. 39–41) ; Ex. 4.7',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let n = 12
    let sigma = 1.5
    const b1 = 1
    let b2 = 0.8
    let showRes = true
    let seed = 5
    const R = 2000
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})

    const draw = () => {
      const rng = makeRng(400 + seed)
      const xs = design(n)
      const ys = sampleY(rng, xs, b1, b2, sigma)
      const f = fit(xs, ys)
      const gx = [0, 10]
      const traces: Record<string, unknown>[] = [
        pointsTrace(xs, ys, '(xᵢ, Yᵢ)', COLORS.blue),
        lineTrace(gx, gx.map((x) => b1 + b2 * x), 'vraie droite β₁ + β₂x', COLORS.red, { line: { color: COLORS.red, width: 2, dash: 'dash' } }),
        lineTrace(gx, gx.map((x) => f.b1 + f.b2 * x), 'moindres carrés (EMV)', COLORS.blue),
      ]
      if (showRes) traces.push(segmentsTrace(xs, ys, xs.map((x) => f.b1 + f.b2 * x), 'résidus', COLORS.orange))
      const yAll = ys.concat([b1, b1 + 10 * b2])
      hLeft.update(traces, {
        title: `n = ${n}, σ = ${sigma.toFixed(1)} : β̂₁ = ${f.b1.toFixed(2)}, β̂₂ = ${f.b2.toFixed(2)}, σ̂² = ${f.s2.toFixed(2)}`,
        xaxis: { title: 'x', range: [-0.3, 10.3] },
        yaxis: { title: 'Y', range: [Math.min(...yAll) - 1, Math.max(...yAll) + 1] },
      })
      // repetitions : n sigma^2 / sigma^2
      const stat = new Array<number>(R)
      for (let r = 0; r < R; r++) {
        const yy = sampleY(rng, xs, b1, b2, sigma)
        stat[r] = (n * fit(xs, yy).s2) / (sigma * sigma)
      }
      const k = n - 2
      const hi = Math.max(k + 5 * Math.sqrt(2 * k), 6)
      const h = histogram(stat, 40, 0, hi)
      const grid = linspace(0.05, hi, 300)
      hRight.update(
        [barTrace(h.centers, h.density, 'nσ̂²/σ² (2000 répétitions)', COLORS.blue, { width: h.width }), lineTrace(grid, grid.map((x) => chi2Pdf(x, k)), `densité χ²(${k})`, COLORS.orange)],
        { title: `Loi de nσ̂²/σ² : χ²(n − 2) = χ²(${k})`, xaxis: { title: 'nσ̂²/σ²', range: [0, hi] }, yaxis: { title: 'densité' }, barmode: 'overlay' },
      )
      const xb = mean(xs)
      let sxx = 0
      for (const x of xs) sxx += (x - xb) * (x - xb)
      info.innerHTML = richToHtml(
        `**EMV (PC2 Ex. 1 Q2).** À $\\sigma^2$ fixé, maximiser $\\ell_n$ revient à minimiser $\\|\\mathbf{Y}-\\mathbf{X}b\\|^2$ : équations normales $\\mathbf{X}^T\\mathbf{X}b=\\mathbf{X}^T\\mathbf{Y}$, d’où $\\hat\\beta_2=\\frac{\\sum_i(x_i-\\bar x)(Y_i-\\bar Y)}{\\sum_i(x_i-\\bar x)^2}=${f.b2.toFixed(3)}$ et $\\hat\\beta_1=\\bar Y-\\hat\\beta_2\\bar x=${f.b1.toFixed(3)}$ (vraies valeurs $\\beta_1=${b1}$, $\\beta_2=${b2.toFixed(2)}$) ; puis $\\hat\\sigma^2=\\frac1n\\|\\mathbf{Y}-\\mathbf{X}\\hat\\beta\\|^2=${f.s2.toFixed(3)}$ (diviseur $n$, pas $n-2$ ; vraie valeur $\\sigma^2=${(sigma * sigma).toFixed(2)}$). **Lois exactes (Q3, Q5).** $\\hat\\beta\\sim\\mathcal{N}(\\beta,\\sigma^2(\\mathbf{X}^T\\mathbf{X})^{-1})$, ici $\\mathrm{Var}(\\hat\\beta_2)=\\sigma^2/\\sum_i(x_i-\\bar x)^2=${((sigma * sigma) / sxx).toFixed(4)}$ ; par Cochran ($\\mathbf{X}\\hat\\beta=P\\mathbf{Y}$, $n\\hat\\sigma^2=\\|(I_n-P)\\mathbf{Y}\\|^2$, $\\dim F^\\perp=n-2$), $n\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(${k})$ : moyenne empirique ${mean(stat).toFixed(2)} sur ${R} répétitions pour une espérance $n-2=${k}$. Donc $\\mathbb{E}[\\hat\\sigma^2]=\\frac{n-2}n\\sigma^2=${(((n - 2) / n) * sigma * sigma).toFixed(3)}$ : **biaisé**. IC de niveau $1-\\alpha$ pour $\\sigma^2$ (Q7) : $[n\\hat\\sigma^2/q^{n-2}_{1-\\alpha/2},\\,n\\hat\\sigma^2/q^{n-2}_{\\alpha/2}]$.`,
      )
    }

    controls.append(
      slider({
        label: '$n$',
        min: 3,
        max: 100,
        step: 1,
        value: n,
        onChange: (v) => {
          n = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$\\sigma$',
        min: 0.2,
        max: 4,
        step: 0.1,
        value: sigma,
        format: (v) => v.toFixed(1),
        onChange: (v) => {
          sigma = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$\\beta_2$',
        min: -2,
        max: 2,
        step: 0.1,
        value: b2,
        format: (v) => v.toFixed(1),
        onChange: (v) => {
          b2 = v
          draw()
        },
      }).root,
    )
    controls.append(
      toggle('afficher les résidus', showRes, (v) => {
        showRes = v
        draw()
      }),
    )
    controls.append(
      button('Tirer un échantillon', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
