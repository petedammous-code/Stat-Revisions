import type { Viz } from '../../types'
import { vizFrame, slider, button, toggle } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, uniform, normal } from '../../../sim/rng'
import { linspace } from '../../../sim/stats'
import { polyLeastSquares, polyEval, debounced } from './outils'

/** Fonction de régression simulée et écart-type du bruit. */
const f = (x: number) => Math.sin(Math.PI * x) + 0.3 * x
const SIGMA = 0.3
const GRID = linspace(-1, 1, 401)
const sub = (k: number) => String(k).replace(/\d/g, (c) => '₀₁₂₃₄₅₆₇₈₉'[Number(c)])

/** Risque quadratique exact d'un prédicteur g pour X ~ U([-1,1]) : sigma² + E[(f(X) - g(X))²]. */
function trueRisk(c: number[]): number {
  let s = 0
  for (const x of GRID) {
    const d = f(x) - polyEval(c, x)
    s += d * d
  }
  return SIGMA * SIGMA + s / GRID.length
}

function empRisk(c: number[], xs: number[], ys: number[]): number {
  let s = 0
  for (let i = 0; i < xs.length; i++) {
    const d = ys[i] - polyEval(c, xs[i])
    s += d * d
  }
  return s / xs.length
}

/** Sur-apprentissage polynomial (Fig. 3 et tableau p. 10) et sélection du degré par validation (Méthode 1.2). */
export const vizSurApprentissage: Viz = {
  id: 'ch9-sur-apprentissage',
  title: 'Sur-apprentissage : MRE dans les polynômes de degré p, risque empirique, risque et validation',
  description:
    'Régression, perte quadratique, $\\mathbf X\\sim\\mathcal U([-1,1])$, $Y=f(\\mathbf X)+\\varepsilon$, $\\varepsilon\\sim\\mathcal N(0;0{,}3^2)$. À gauche : les données, la fonction de régression $f=g^\\star$ (bleu) et le MRE $\\hat g^*_{n,\\mathcal C}$ dans $\\mathcal C=\\mathbb{R}_p[X]$ (orange). À droite, en fonction du degré $p$ : risque empirique $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})$, risque $R(\\hat g^*_{n,\\mathcal C})$ (calculé exactement) et, si la validation est activée, risque de validation sur un tiers des données mises de côté. Curseurs $p$ et $n$, bouton « Tirer un échantillon ».',
  source: 'Poly ch.9, §1.2 (Ex. 1.1, Fig. 3, tableau p. 10) et Méthode 1.2',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let deg = 3
    let n = 24
    let seed = 1
    let useVal = true
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})

    const draw = () => {
      const rng = makeRng(9100 + seed)
      const xs: number[] = []
      const ys: number[] = []
      for (let i = 0; i < n; i++) {
        const x = uniform(rng, -1, 1)
        xs.push(x)
        ys.push(f(x) + normal(rng, 0, SIGMA))
      }
      const nVal = useVal ? Math.max(2, Math.round(n / 3)) : 0
      const nFit = n - nVal
      const xFit = xs.slice(0, nFit)
      const yFit = ys.slice(0, nFit)
      const xVal = xs.slice(nFit)
      const yVal = ys.slice(nFit)
      const maxDeg = Math.min(20, nFit - 1)
      const p = Math.min(deg, maxDeg)
      // courbes de risque en fonction du degré
      const degs: number[] = []
      const rEmp: number[] = []
      const rTrue: number[] = []
      const rVal: number[] = []
      for (let k = 0; k <= maxDeg; k++) {
        const c = polyLeastSquares(xFit, yFit, k)
        degs.push(k)
        rEmp.push(Math.max(1e-6, empRisk(c, xFit, yFit)))
        rTrue.push(trueRisk(c))
        if (useVal) rVal.push(empRisk(c, xVal, yVal))
      }
      const cur = polyLeastSquares(xFit, yFit, p)
      const yFitCurve = GRID.map((x) => Math.max(-3, Math.min(3, polyEval(cur, x))))
      hLeft.update(
        [
          lineTrace(GRID, GRID.map(f), 'fonction de régression f = g★', COLORS.blue),
          lineTrace(GRID, yFitCurve, `MRE dans ℝ${sub(p)}[X]`, COLORS.orange),
          pointsTrace(xFit, yFit, 'données d’ajustement', COLORS.red),
          ...(useVal ? [pointsTrace(xVal, yVal, 'données de validation', COLORS.gray, { marker: { color: COLORS.gray, size: 7, symbol: 'x' } })] : []),
        ],
        {
          title: `Degré p = ${p} (d = ${p + 1} paramètres), ${nFit} points d’ajustement`,
          xaxis: { title: 'x', range: [-1.05, 1.05] },
          yaxis: { title: 'y', range: [-2.5, 2.5] },
        },
      )
      const kVal = useVal ? rVal.indexOf(Math.min(...rVal)) : -1
      const kTrue = rTrue.indexOf(Math.min(...rTrue))
      const shapes: Record<string, unknown>[] = [vline(p, COLORS.orange, 'solid')]
      if (useVal) shapes.push(vline(kVal, COLORS.green, 'dot'))
      hRight.update(
        [
          lineTrace(degs, rEmp, 'risque empirique (ajustement)', COLORS.red, { mode: 'lines+markers' }),
          lineTrace(degs, rTrue, 'risque R (exact)', COLORS.blue, { mode: 'lines+markers' }),
          ...(useVal ? [lineTrace(degs, rVal, 'risque de validation', COLORS.green, { mode: 'lines+markers' })] : []),
          lineTrace([0, maxDeg], [SIGMA * SIGMA, SIGMA * SIGMA], 'risque bayésien R★ = σ²', COLORS.gray, { line: { color: COLORS.gray, dash: 'dash', width: 1.5 } }),
        ],
        {
          title: 'Risques en fonction du degré p',
          xaxis: { title: 'degré p' },
          yaxis: { title: 'risque (échelle log)', type: 'log', range: [-2.3, 1.5] },
          shapes,
        },
      )
      const regime = p <= 1 ? 'sous-apprentissage' : p >= Math.min(12, maxDeg - 1) ? 'sur-apprentissage' : 'compromis'
      info.innerHTML = richToHtml(
        `**Degré $p=${p}$** ($d=${p + 1}$ paramètres) : $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})=${rEmp[p].toFixed(3)}$, $R(\\hat g^*_{n,\\mathcal C})=${rTrue[p].toFixed(3)}$ (risque bayésien $R^\\star=\\sigma^2=0{,}09$). Régime : **${regime}**. Le risque empirique décroît toujours avec $p$ (classes emboîtées)${maxDeg === nFit - 1 ? ` et s’annule pour $p=${maxDeg}$ (interpolation des ${nFit} points, comme $\\mathbb{R}_{20}[X]$ dans le tableau du poly)` : ` ; avec ${nFit} points, même $\\mathbb{R}_{20}[X]$ ne peut plus les interpoler (réduire $n$ pour voir le risque empirique s’annuler)`} ; le risque, lui, décrit une courbe en U : minimum en $p=${kTrue}$.` +
          (useVal
            ? ` **Validation (Méthode 1.2)** : le degré qui minimise le risque de validation est $p=${kVal}$ (pointillé vert). Le risque de validation est un estimateur sans biais du risque de chaque règle ajustée (PC9 Ex. 1), contrairement au risque empirique d’ajustement, biaisé vers le bas (Prop. 1.1).`
            : ' Activez la validation pour choisir le degré sans connaître $f$.'),
      )
    }
    const later = debounced(draw, 60)

    const degSlider = slider({ label: 'degré $p$', min: 0, max: 20, step: 1, value: deg, onChange: (v) => { deg = v; later.call() } })
    controls.append(degSlider.root)
    controls.append(slider({ label: '$n$', min: 8, max: 80, step: 1, value: n, onChange: (v) => { n = v; later.call() } }).root)
    controls.append(toggle('validation : un tiers des points mis de côté', useVal, (v) => { useVal = v; draw() }))
    controls.append(button('Tirer un échantillon', () => { seed++; draw() }))
    draw()
    return () => {
      later.cancel()
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
