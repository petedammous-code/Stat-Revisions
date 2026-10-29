import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng } from '../../../sim/rng'
import { debounced } from './outils'

const DIMS = [1, 2, 3, 5, 8, 10, 15, 20, 30, 50, 100]

/** Fléau de la dimension : distance au plus proche voisin, vitesse des k-ppv et des histogrammes. */
export const vizFleauDimension: Viz = {
  id: 'ch9-fleau-dimension',
  title: 'Fléau de la dimension : le plus proche voisin s’éloigne, les échantillons nécessaires explosent',
  description:
    'À gauche : $n$ points uniformes dans $[0,1]^d$ ; pour $50$ points de requête, distance moyenne au plus proche voisin et distance moyenne à un point quelconque, divisées par le diamètre $\\sqrt d$, en fonction de $d$. Quand $d$ grandit, le plus proche voisin n’est presque pas plus proche qu’un point pris au hasard : « voisin » perd son sens. À droite : taille d’échantillon nécessaire pour une précision $\\varepsilon$ selon la vitesse $n^{-1/(d+2)}$ des $k$-ppv (Examen 2025 Ex. 3 Q9) et selon la borne $\\sqrt{(m+1)\\log 2/(2n)}$ du classifieur par histogramme à $m=q^d$ cellules (Compléments §4.3). Curseurs $n$, $\\varepsilon$ et $q$.',
  source: 'Examen 2025 Ex. 3 Q9 ; Poly ch.9, Th. 1.8 et Compléments §4.3',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let n = 500
    let eps = 0.1
    let q = 4
    let seed = 1
    const Q = 50
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    let nnRatio: number[] = []
    let meanRatio: number[] = []

    const simulate = () => {
      const rng = makeRng(9500 + seed)
      nnRatio = []
      meanRatio = []
      for (const d of DIMS) {
        const pts = new Float64Array(n * d)
        for (let i = 0; i < n * d; i++) pts[i] = rng()
        let sNN = 0
        let sMean = 0
        const qv = new Float64Array(d)
        for (let t = 0; t < Q; t++) {
          for (let c = 0; c < d; c++) qv[c] = rng()
          let best = Infinity
          let tot = 0
          for (let i = 0; i < n; i++) {
            let s = 0
            const off = i * d
            for (let c = 0; c < d; c++) {
              const a = pts[off + c] - qv[c]
              s += a * a
            }
            const dist = Math.sqrt(s)
            if (dist < best) best = dist
            tot += dist
          }
          sNN += best
          sMean += tot / n
        }
        nnRatio.push(sNN / Q / Math.sqrt(d))
        meanRatio.push(sMean / Q / Math.sqrt(d))
      }
    }

    const render = () => {
      hLeft.update(
        [
          lineTrace(DIMS, nnRatio, 'distance au plus proche voisin / √d', COLORS.blue, { mode: 'lines+markers' }),
          lineTrace(DIMS, meanRatio, 'distance moyenne à un point / √d', COLORS.orange, { mode: 'lines+markers' }),
        ],
        {
          title: `n = ${n} points uniformes dans [0,1]^d`,
          xaxis: { title: 'dimension d (échelle log)', type: 'log' },
          yaxis: { title: 'distance / diamètre', range: [0, 0.6] },
        },
      )
      const ds = Array.from({ length: 20 }, (_, i) => i + 1)
      const knn = ds.map((d) => (d + 2) * Math.log10(1 / eps))
      const histo = ds.map((d) => Math.log10(((Math.pow(q, d) + 1) * Math.LN2) / (2 * eps * eps)))
      const param = ds.map(() => Math.log10(1 / (eps * eps)))
      hRight.update(
        [
          lineTrace(ds, knn, 'k-ppv : n ≈ ε^−(d+2)', COLORS.purple, { mode: 'lines+markers' }),
          lineTrace(ds, histo, `histogramme q = ${q} : n ≥ (q^d + 1) log2 / (2ε²)`, COLORS.green, { mode: 'lines+markers' }),
          lineTrace(ds, param, 'vitesse paramétrique : n ≈ ε^−2', COLORS.gray, { line: { color: COLORS.gray, dash: 'dash', width: 1.5 } }),
        ],
        {
          title: `Taille d’échantillon pour une précision ε = ${eps.toFixed(2)}`,
          xaxis: { title: 'dimension d' },
          yaxis: { title: 'log₁₀ n nécessaire' },
        },
      )
      const i10 = DIMS.indexOf(10)
      info.innerHTML = richToHtml(
        `En $d=1$, le plus proche voisin est à $${nnRatio[0].toFixed(3)}$ diamètre contre $${meanRatio[0].toFixed(3)}$ pour un point quelconque ; en $d=10$ : $${nnRatio[i10].toFixed(3)}$ contre $${meanRatio[i10].toFixed(3)}$ ; en $d=100$ : $${nnRatio[nnRatio.length - 1].toFixed(3)}$ contre $${meanRatio[meanRatio.length - 1].toFixed(3)}$. Le biais des $k$-ppv, contrôlé par le rayon $\\mathfrak R_k(x)$ (Examen 2025 Q7–Q8 : $\\mathbb E_n[\\mathfrak R_k(x)^d]\\asymp k/n$, d’où un biais en $(k/n)^{1/d}$), ne diminue donc que très lentement : avec $k^\\star\\asymp n^{2/(d+2)}$, l’excès de risque est en $n^{-1/(d+2)}$ et une précision $\\varepsilon=${eps.toFixed(2)}$ demande $n\\approx\\varepsilon^{-(d+2)}$, soit $10^{${knn[9].toFixed(0)}}$ observations en $d=10$. Même phénomène pour l’histogramme : $m=q^d$ cellules, $\\log|\\mathcal C|=q^d\\log2$ explose avec $d$.`,
      )
    }
    const recompute = () => {
      simulate()
      render()
    }
    const later = debounced(recompute, 150)
    controls.append(slider({ label: '$n$', min: 2, max: Math.log10(3000), step: 0.01, value: Math.log10(n), log: true, integer: true, onChange: (v) => { n = v; later.call() } }).root)
    controls.append(slider({ label: '$\\varepsilon$', min: 0.02, max: 0.3, step: 0.01, value: eps, format: (v) => v.toFixed(2), onChange: (v) => { eps = v; render() } }).root)
    controls.append(slider({ label: '$q$ (intervalles par axe)', min: 2, max: 10, step: 1, value: q, onChange: (v) => { q = v; render() } }).root)
    controls.append(button('Tirer un échantillon', () => { seed++; recompute() }))
    recompute()
    return () => {
      later.cancel()
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
