import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng } from '../../../sim/rng'
import { debounced } from './outils'

/** eta(x) = P(Y = 1 | X = x), X ~ U([0,1]). */
const eta = (x: number) => 0.5 + 0.4 * Math.sin(9 * x)
const NG = 4096
const LOG2M = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]
const MS = LOG2M.map((l) => 2 ** l)

/** Intégrales exactes (à la grille près) de eta et 1 - eta sur chaque cellule Q_j = [j/m, (j+1)/m[. */
function cellIntegrals(m: number): { A: number[]; B: number[] } {
  const A = new Array<number>(m).fill(0)
  const B = new Array<number>(m).fill(0)
  for (let g = 0; g < NG; g++) {
    const x = (g + 0.5) / NG
    const j = Math.min(m - 1, Math.floor(x * m))
    A[j] += eta(x) / NG
    B[j] += (1 - eta(x)) / NG
  }
  return { A, B }
}
const INTEGRALS = MS.map(cellIntegrals)
let rs = 0
for (let g = 0; g < NG; g++) {
  const x = (g + 0.5) / NG
  rs += Math.min(eta(x), 1 - eta(x)) / NG
}
const RSTAR = rs
/** Risque de l'oracle de la classe C_m (vote « en population » dans chaque cellule). */
const ORACLE = INTEGRALS.map(({ A, B }) => A.reduce((s, a, j) => s + Math.min(a, B[j]), 0))

/** Compromis approximation / estimation pour le classifieur par histogramme (Compléments §4.3). */
export const vizApproxEstimation: Viz = {
  id: 'ch9-approx-estimation',
  title: 'Compromis approximation / estimation : classifieur par histogramme à m cellules',
  description:
    'Classification sur $\\mathsf X=[0,1]$, partition en $m$ intervalles égaux, classe $\\mathcal C_m$ des $2^m$ règles constantes sur chaque cellule ; le MRE est le **vote majoritaire** dans chaque cellule. À gauche, en fonction de $m$ : erreur d’approximation $R(g^*_{\\mathcal C})-R^\\star$ (exacte, décroissante car les classes sont emboîtées), erreur d’estimation moyenne $\\mathbb E[R(\\hat g^*_{n,\\mathcal C})]-R(g^*_{\\mathcal C})$ (Monte-Carlo, 200 échantillons), leur somme (excès de risque moyen) et la borne $\\sqrt{(m+1)\\log2/(2n)}$ du Th. 1.8 avec $|\\mathcal C|=2^m$. À droite : $\\eta$, l’oracle de la classe et un MRE pour le $m$ choisi. Curseurs $n$ et $m$.',
  source: 'Poly ch.9, éq. (1) et tableau p. 12 ; Th. 1.8 ; Compléments §4.3 (histogrammes)',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let n = 200
    let im = 3
    let seed = 1
    const M = 200
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})

    const draw = () => {
      const rng = makeRng(9300 + seed)
      const estim = new Array<number>(MS.length).fill(0)
      let lastX: number[] = []
      let lastY: number[] = []
      let lastRule: number[] = []
      for (let r = 0; r < M; r++) {
        const xs = new Float64Array(n)
        const ys = new Int8Array(n)
        for (let i = 0; i < n; i++) {
          xs[i] = rng()
          ys[i] = rng() < eta(xs[i]) ? 1 : -1
        }
        for (let t = 0; t < MS.length; t++) {
          const m = MS[t]
          const vote = new Int32Array(m)
          for (let i = 0; i < n; i++) vote[Math.min(m - 1, Math.floor(xs[i] * m))] += ys[i]
          const { A, B } = INTEGRALS[t]
          let risk = 0
          for (let j = 0; j < m; j++) risk += vote[j] >= 0 ? B[j] : A[j]
          estim[t] += (risk - ORACLE[t]) / M
          if (r === M - 1 && t === im) {
            lastRule = Array.from(vote, (v) => (v >= 0 ? 1 : -1))
            lastX = Array.from(xs)
            lastY = Array.from(ys)
          }
        }
      }
      const approx = ORACLE.map((o) => o - RSTAR)
      const total = approx.map((a, t) => a + estim[t])
      const bound = MS.map((m) => Math.sqrt(((m + 1) * Math.LN2) / (2 * n)))
      const best = total.indexOf(Math.min(...total))
      hLeft.update(
        [
          lineTrace(MS, approx, 'erreur d’approximation', COLORS.blue, { mode: 'lines+markers' }),
          lineTrace(MS, estim, 'erreur d’estimation (moyenne)', COLORS.green, { mode: 'lines+markers' }),
          lineTrace(MS, total, 'excès de risque moyen (somme)', COLORS.red, { mode: 'lines+markers', line: { color: COLORS.red, width: 3.5 } }),
          lineTrace(MS, bound, 'borne du Th. 1.8 : √((m+1)log2 / 2n)', COLORS.gray, { line: { color: COLORS.gray, dash: 'dash', width: 1.5 } }),
        ],
        {
          title: `Décomposition (1) de l’excès de risque, n = ${n}`,
          xaxis: { title: 'nombre de cellules m (échelle log)', type: 'log' },
          yaxis: { title: 'erreur', range: [0, 0.32] },
          shapes: [vline(MS[im], COLORS.orange, 'solid')],
        },
      )
      const m = MS[im]
      const xs = Array.from({ length: 401 }, (_, i) => i / 400)
      const oracleRule = INTEGRALS[im].A.map((a, j) => (a >= INTEGRALS[im].B[j] ? 1 : -1))
      const step = (rule: number[]) => xs.map((x) => (rule[Math.min(m - 1, Math.floor(x * m))] === 1 ? 1 : 0))
      const show = Math.min(lastX.length, 300)
      hRight.update(
        [
          lineTrace(xs, xs.map(eta), 'η(x) = P(Y = 1 | X = x)', COLORS.blue),
          lineTrace(xs, xs.map((x) => (eta(x) >= 0.5 ? 1 : 0)), 'classifieur bayésien (1 ↔ +1)', COLORS.gray, { line: { color: COLORS.gray, width: 1.5, dash: 'dot', shape: 'hv' } }),
          lineTrace(xs, step(oracleRule).map((v) => v * 0.96 + 0.02), 'oracle de la classe g*_C', COLORS.purple, { line: { color: COLORS.purple, width: 2, shape: 'hv' } }),
          lineTrace(xs, step(lastRule).map((v) => v * 0.92 + 0.04), 'MRE (vote majoritaire)', COLORS.orange, { line: { color: COLORS.orange, width: 2.5, shape: 'hv' } }),
          pointsTrace(lastX.slice(0, show), lastY.slice(0, show).map((y) => (y === 1 ? 1.08 : -0.08)), 'observations (Y = ±1)', COLORS.gray, { marker: { color: COLORS.gray, size: 6, symbol: 'line-ns-open' } }),
        ],
        {
          title: `m = ${m} cellules : |C| = 2^${m} règles`,
          xaxis: { title: 'x', range: [0, 1] },
          yaxis: { title: 'η(x) ; règles (1 ↔ +1, 0 ↔ −1)', range: [-0.15, 1.15] },
        },
      )
      info.innerHTML = richToHtml(
        `Pour $m=${m}$ : erreur d’approximation $R(g^*_{\\mathcal C})-R^\\star=${approx[im].toFixed(3)}$ (**déterministe**, ne dépend pas des données), erreur d’estimation moyenne $${estim[im].toFixed(3)}$ (**aléatoire**, moyennée sur ${M} échantillons), excès de risque moyen $${total[im].toFixed(3)}$ ; borne du Th. 1.8 : $\\sqrt{(m+1)\\log 2/(2n)}=${bound[im].toFixed(3)}$. Quand $m$ grandit, l’approximation décroît (classes emboîtées : $\\mathcal C_m\\subset\\mathcal C_{2m}$) et l’estimation croît (moins de points par cellule pour voter) : l’excès de risque est minimal pour une complexité intermédiaire, ici $m=${MS[best]}$. Augmenter $n$ ne change pas l’approximation et fait baisser l’estimation : l’optimum se déplace vers des classes plus riches.`,
      )
    }
    const later = debounced(draw, 120)
    controls.append(slider({ label: '$n$', min: Math.log10(20), max: Math.log10(5000), step: 0.01, value: Math.log10(n), log: true, integer: true, onChange: (v) => { n = v; later.call() } }).root)
    controls.append(slider({ label: '$\\log_2 m$', min: 0, max: LOG2M.length - 1, step: 1, value: im, format: (v) => `m = ${2 ** v}`, onChange: (v) => { im = v; later.call() } }).root)
    controls.append(button('Tirer 200 échantillons', () => { seed++; draw() }))
    draw()
    return () => {
      later.cancel()
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
