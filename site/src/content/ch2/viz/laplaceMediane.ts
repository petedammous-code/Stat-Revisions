import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, laplace } from '../../../sim/rng'
import { linspace } from '../../../sim/stats'

/** Modele de Laplace : la somme des ecarts absolus, plateau pour n pair, minimiseur unique pour n impair (Ex. 1.13). */
export const vizLaplaceMediane: Viz = {
  id: 'ch2-laplace-mediane',
  title: 'Modèle de Laplace : EMV = médiane, unique ou non selon la parité de n',
  description:
    'Pour un échantillon de la loi de Laplace $q_\\theta(x)=\\frac12\\mathrm{e}^{-|x-\\theta|}$, on trace $\\varphi(\\vartheta)=\\sum_i|X_i-\\vartheta|$, dont les minima sont les EMV (Ex. 1.13). Fonction convexe affine par morceaux, de pente $2k-n$ entre $X_{k:n}$ et $X_{k+1:n}$ : pour $n$ impair, minimum unique en la médiane $X_{m+1:n}$ ; pour $n$ pair, **plateau** $[X_{m:n},X_{m+1:n}]$ : tout point est un EMV. Le bouton « Ajouter une observation » change la parité.',
  source: 'Poly ch.2, Ex. 1.13 (figure p. 22) et Ex. 1.6 ; Ex. 1.15',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    const theta = 1
    let n = 6
    let seed = 9
    let extra = 0
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const rng = makeRng(600 + seed)
      const total = n + extra
      const xs = new Array<number>(total)
      for (let i = 0; i < total; i++) xs[i] = laplace(rng, theta, 1)
      const sorted = xs.slice().sort((a, b) => a - b)
      const lo = sorted[0] - 1
      const hi = sorted[total - 1] + 1
      const grid = linspace(lo, hi, 600)
      const phi = grid.map((v) => {
        let s = 0
        for (const x of xs) s += Math.abs(x - v)
        return s
      })
      const m = Math.floor(total / 2)
      const odd = total % 2 === 1
      const a = odd ? sorted[m] : sorted[m - 1]
      const b = odd ? sorted[m] : sorted[m]
      const phiMin = xs.reduce((s, x) => s + Math.abs(x - a), 0)
      const traces: Record<string, unknown>[] = [
        lineTrace(grid, phi, 'φ(ϑ) = Σ|Xᵢ − ϑ|', COLORS.blue),
        pointsTrace(sorted, sorted.map(() => phiMin * 0.95), 'observations', COLORS.gray, { marker: { color: COLORS.gray, size: 8, symbol: 'line-ns-open' } }),
      ]
      if (odd) traces.push(pointsTrace([a], [phiMin], 'EMV unique = médiane', COLORS.orange, { marker: { color: COLORS.orange, size: 12, symbol: 'diamond' } }))
      else traces.push(lineTrace([a, b], [phiMin, phiMin], 'ensemble des EMV (plateau)', COLORS.orange, { line: { color: COLORS.orange, width: 7 } }))
      handle.update(traces, {
        title: `n = ${total} (${odd ? 'impair' : 'pair'}) : ${odd ? 'minimiseur unique' : 'plateau de minimiseurs'}`,
        xaxis: { title: 'ϑ', range: [lo, hi] },
        yaxis: { title: 'φ(ϑ)', range: [phiMin * 0.9, Math.max(...phi) * 1.02] },
        shapes: [vline(theta, COLORS.red, 'dash')],
        legend: { orientation: 'h', y: -0.25 },
      })
      const med = odd ? sorted[m] : 0.5 * (sorted[m - 1] + sorted[m])
      info.innerHTML = richToHtml(
        `**Ex. 1.13.** $\\ell_n(\\vartheta)=-\\log2-\\frac1n\\varphi(\\vartheta)$ : maximiser la vraisemblance = minimiser $\\varphi$. Hors des observations, $\\varphi\'(\\vartheta)=-\\sum_i\\mathrm{signe}(X_i-\\vartheta)=2k-n$ sur $]X_{k:n},X_{k+1:n}[$. ${
          odd
            ? `$n=${total}=2m+1$ avec $m=${m}$ : $\\varphi$ décroît strictement jusqu’à $X_{m+1:n}=${a.toFixed(3)}$ puis croît strictement : **EMV unique**, égal à la médiane empirique $${med.toFixed(3)}$ (vraie valeur $\\theta=${theta}$).`
            : `$n=${total}=2m$ avec $m=${m}$ : pente $2m-n=0$ sur $[X_{m:n},X_{m+1:n}]=[${a.toFixed(3)},\\ ${b.toFixed(3)}]$ : **infinité d’EMV** (intervalle **fermé**) ; la médiane $\\frac12(X_{m:n}+X_{m+1:n})=${med.toFixed(3)}$ en est un parmi d’autres. Le Z-estimateur de l’Ex. 1.6 ($\\psi=\\mathrm{signe}(x-\\vartheta)$) n’est défini que sur l’intervalle **ouvert** : aux extrémités, $\\sum_i\\mathrm{signe}(X_i-X_{m:n})=1\\ne0$.`
        } La médiane minimise la somme des écarts absolus (perte absolue), comme la moyenne minimise la somme des carrés (Ex. 1.15) ; elle est M-estimateur et Z-estimateur mais pas estimateur des moments.`,
      )
    }

    controls.append(
      slider({
        label: '$n$ initial',
        min: 3,
        max: 40,
        step: 1,
        value: n,
        onChange: (v) => {
          n = v
          extra = 0
          draw()
        },
      }).root,
    )
    controls.append(
      button('Ajouter une observation', () => {
        extra++
        draw()
      }),
    )
    controls.append(
      button('Tirer un échantillon', () => {
        seed++
        extra = 0
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
