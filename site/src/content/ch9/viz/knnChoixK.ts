import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, type Rng } from '../../../sim/rng'
import { debounced } from './outils'

/** eta(x) = P(Y = 1 | X = x) sur [0,1]^2. */
const eta = (x1: number, x2: number) => 0.5 + 0.4 * Math.sin(2 * Math.PI * x1) * Math.cos(Math.PI * x2)
const G = 30
const GRID: [number, number][] = []
for (let i = 0; i < G; i++) for (let j = 0; j < G; j++) GRID.push([(j + 0.5) / G, (i + 0.5) / G])
const RSTAR = GRID.reduce((s, [a, b]) => s + Math.min(eta(a, b), 1 - eta(a, b)), 0) / GRID.length
const KMAX = 150

interface Sample {
  x1: Float64Array
  x2: Float64Array
  y: Int8Array
}

function drawSample(rng: Rng, n: number): Sample {
  const x1 = new Float64Array(n)
  const x2 = new Float64Array(n)
  const y = new Int8Array(n)
  for (let i = 0; i < n; i++) {
    x1[i] = rng()
    x2[i] = rng()
    y[i] = rng() < eta(x1[i], x2[i]) ? 1 : -1
  }
  return { x1, x2, y }
}

/** Pour un point de requête, sommes cumulées des labels de ses kmax plus proches voisins (dans l'échantillon d'apprentissage). */
function neighborSums(tr: Sample, q1: number, q2: number, kmax: number): Int32Array {
  const n = tr.y.length
  const d = new Float64Array(n)
  const idx = new Array<number>(n)
  for (let i = 0; i < n; i++) {
    const a = tr.x1[i] - q1
    const b = tr.x2[i] - q2
    d[i] = a * a + b * b
    idx[i] = i
  }
  idx.sort((i, j) => d[i] - d[j])
  const out = new Int32Array(kmax)
  let s = 0
  for (let k = 0; k < kmax; k++) {
    s += tr.y[idx[k]]
    out[k] = s
  }
  return out
}

/** Choix de k pour les k plus proches voisins : erreur d'apprentissage, de validation et risque en fonction de k. */
export const vizKnnChoixK: Viz = {
  id: 'ch9-knn-choix-k',
  title: 'Choisir k pour les k plus proches voisins : apprentissage, validation, risque',
  description:
    'Classification binaire sur $[0,1]^2$ ($d=2$), $\\eta(\\mathbf x)=\\mathbb P(Y=1\\mid\\mathbf X=\\mathbf x)$ connue (simulation). Le classifieur des $k$ plus proches voisins est le plug-in $2\\mathbf{1}_{\\{\\hat\\eta_{n,k}\\ge1/2\\}}-1$ (Examen 2025 Ex. 3 Q4). À gauche, en fonction de $k$ : erreur sur l’échantillon d’apprentissage (nulle pour $k=1$ : sur-apprentissage), erreur de validation sur $400$ points frais (Méthode 1.2) et risque $R(\\hat g_{n,k})$ calculé exactement avec $\\eta$. À droite : prédiction du $k$-ppv sur une grille et frontière bayésienne $\\{\\eta=1/2\\}$. Curseurs $n$ et $k$, bouton « Tirer ».',
  source: 'Poly ch.9, Méthode 1.2 et éq. (1) ; Examen 2025 Ex. 3 Q4, Q8–Q9',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let n = 400
    let k = 15
    let seed = 1
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    // cache des sommes cumulées
    let cache: { trainS: Int32Array[]; valS: Int32Array[]; gridS: Int32Array[]; tr: Sample; va: Sample; kmax: number } | null = null

    const compute = () => {
      const rng = makeRng(9200 + seed)
      const tr = drawSample(rng, n)
      const va = drawSample(rng, 400)
      const kmax = Math.min(KMAX, n)
      const trainS: Int32Array[] = []
      for (let i = 0; i < n; i++) trainS.push(neighborSums(tr, tr.x1[i], tr.x2[i], kmax))
      const valS: Int32Array[] = []
      for (let i = 0; i < va.y.length; i++) valS.push(neighborSums(tr, va.x1[i], va.x2[i], kmax))
      const gridS = GRID.map(([a, b]) => neighborSums(tr, a, b, kmax))
      cache = { trainS, valS, gridS, tr, va, kmax }
    }

    const render = () => {
      if (!cache) return
      const { trainS, valS, gridS, tr, va, kmax } = cache
      const ks: number[] = []
      const eTr: number[] = []
      const eVa: number[] = []
      const rT: number[] = []
      const pred = (s: Int32Array, kk: number) => (s[kk - 1] >= 0 ? 1 : -1)
      for (let kk = 1; kk <= kmax; kk++) {
        ks.push(kk)
        let a = 0
        for (let i = 0; i < trainS.length; i++) if (pred(trainS[i], kk) !== tr.y[i]) a++
        eTr.push(a / trainS.length)
        let b = 0
        for (let i = 0; i < valS.length; i++) if (pred(valS[i], kk) !== va.y[i]) b++
        eVa.push(b / valS.length)
        let r = 0
        for (let g = 0; g < GRID.length; g++) {
          const e = eta(GRID[g][0], GRID[g][1])
          r += pred(gridS[g], kk) === 1 ? 1 - e : e
        }
        rT.push(r / GRID.length)
      }
      const kk = Math.min(k, kmax)
      const kVal = ks[eVa.indexOf(Math.min(...eVa))]
      const kTh = Math.sqrt(n)
      hLeft.update(
        [
          lineTrace(ks, eTr, 'erreur d’apprentissage', COLORS.red),
          lineTrace(ks, eVa, 'erreur de validation (400 points)', COLORS.green),
          lineTrace(ks, rT, 'risque R(ĝ) (exact)', COLORS.blue),
          lineTrace([1, kmax], [RSTAR, RSTAR], 'risque bayésien R★', COLORS.gray, { line: { color: COLORS.gray, dash: 'dash', width: 1.5 } }),
        ],
        {
          title: `Erreurs en fonction de k (n = ${n})`,
          xaxis: { title: 'k (échelle log)', type: 'log' },
          yaxis: { title: 'erreur', range: [0, 0.55] },
          shapes: [vline(kk, COLORS.orange, 'solid'), vline(kVal, COLORS.green, 'dot'), vline(kTh, COLORS.purple, 'dash')],
        },
      )
      // carte des prédictions
      const z: number[][] = []
      for (let i = 0; i < G; i++) {
        const row: number[] = []
        for (let j = 0; j < G; j++) row.push(pred(gridS[i * G + j], kk))
        z.push(row)
      }
      const axis = Array.from({ length: G }, (_, j) => (j + 0.5) / G)
      const fine = Array.from({ length: 61 }, (_, j) => j / 60)
      const zEta = fine.map((b) => fine.map((a) => eta(a, b)))
      const show = Math.min(n, 300)
      const posX: number[] = []
      const posY: number[] = []
      const negX: number[] = []
      const negY: number[] = []
      for (let i = 0; i < show; i++) {
        if (tr.y[i] === 1) {
          posX.push(tr.x1[i])
          posY.push(tr.x2[i])
        } else {
          negX.push(tr.x1[i])
          negY.push(tr.x2[i])
        }
      }
      hRight.update(
        [
          { type: 'heatmap', x: axis, y: axis, z, zmin: -1, zmax: 1, colorscale: [[0, 'rgba(234,88,12,0.35)'], [1, 'rgba(37,99,235,0.35)']], showscale: false, name: 'prédiction', hoverinfo: 'skip' },
          { type: 'contour', x: fine, y: fine, z: zEta, contours: { start: 0.5, end: 0.5, size: 1, coloring: 'none' }, line: { color: '#111827', width: 2, dash: 'dash' }, showscale: false, name: 'frontière bayésienne η = 1/2', hoverinfo: 'skip' },
          pointsTrace(posX, posY, 'Y = +1', COLORS.blue, { marker: { color: COLORS.blue, size: 5 } }),
          pointsTrace(negX, negY, 'Y = −1', COLORS.orange, { marker: { color: COLORS.orange, size: 5, symbol: 'x' } }),
        ],
        {
          title: `Prédiction du ${kk}-ppv (bleu : +1, orange : −1)`,
          xaxis: { title: 'x⁽¹⁾', range: [0, 1] },
          yaxis: { title: 'x⁽²⁾', range: [0, 1] },
        },
      )
      info.innerHTML = richToHtml(
        `Pour $k=${kk}$ : erreur d’apprentissage $${eTr[kk - 1].toFixed(3)}$, erreur de validation $${eVa[kk - 1].toFixed(3)}$, risque $R(\\hat g_{n,k})=${rT[kk - 1].toFixed(3)}$, risque bayésien $R^\\star=${RSTAR.toFixed(3)}$. **Petit $k$** : prédiction très variable (terme $1/k$ de l’Examen 2025 Q8), l’erreur d’apprentissage est optimiste (nulle en $k=1$ : chaque point est son propre voisin). **Grand $k$** : on moyenne $\\eta$ sur une boule trop grande (biais en $(k/n)^{1/d}$, biais au carré en $(k/n)^{2/d}$) et la frontière est lissée. La validation choisit $k=${kVal}$ (pointillé vert) ; l’ordre théorique $k^\\star\\asymp n^{2/(d+2)}=\\sqrt n\\approx${kTh.toFixed(0)}$ est en tirets violets (Q9).`,
      )
    }
    const recompute = () => {
      compute()
      render()
    }
    const later = debounced(recompute, 150)
    const kSlider = slider({ label: '$k$', min: 0, max: Math.log10(KMAX), step: 0.01, value: Math.log10(k), log: true, integer: true, onChange: (v) => { k = Math.max(1, v); render() } })
    controls.append(slider({ label: '$n$', min: Math.log10(50), max: 3, step: 0.01, value: Math.log10(n), log: true, integer: true, onChange: (v) => { n = v; later.call() } }).root)
    controls.append(kSlider.root)
    controls.append(button('Tirer un échantillon', () => { seed++; recompute() }))
    recompute()
    return () => {
      later.cancel()
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
