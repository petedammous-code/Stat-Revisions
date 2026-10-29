import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, type Rng } from '../../../sim/rng'
import { debounced } from './outils'

type Rule = 'memo' | 'ppv'

/**
 * Risque moyen (sur l'étiquetage b uniforme et sur D_n) d'une règle, sous P_b :
 * X uniforme sur {a_1, ..., a_K} (a_j = j/K), Y = b_X. Estimation Monte-Carlo.
 */
export function nflRisk(rng: Rng, K: number, n: number, rule: Rule, M: number): number {
  let err = 0
  const seenLabel = new Int8Array(K)
  for (let r = 0; r < M; r++) {
    seenLabel.fill(0)
    // étiquetage b tiré uniformément : on ne tire que les labels utiles (paresseusement)
    const b = new Map<number, number>()
    const lab = (j: number) => {
      let v = b.get(j)
      if (v === undefined) {
        v = rng() < 0.5 ? 1 : -1
        b.set(j, v)
      }
      return v
    }
    const seenIdx: number[] = []
    for (let i = 0; i < n; i++) {
      const j = Math.floor(rng() * K)
      if (seenLabel[j] === 0) seenIdx.push(j)
      seenLabel[j] = lab(j)
    }
    const J = Math.floor(rng() * K)
    const y = lab(J)
    let pred: number
    if (seenLabel[J] !== 0) pred = seenLabel[J]
    else if (rule === 'memo') pred = 1
    else {
      // plus proche voisin parmi les points observés (positions j/K)
      let best = Infinity
      pred = 1
      for (const j of seenIdx) {
        const d = Math.abs(j - J)
        if (d < best) {
          best = d
          pred = seenLabel[j]
        }
      }
    }
    if (pred !== y) err++
  }
  return err / M
}

const KS = [5, 10, 20, 50, 100, 200, 500, 1000, 2000, 5000, 10000, 20000]

/** No free lunch (Th. 1.1) : sur K points sans régularité, aucune règle ne fait mieux que pile ou face. */
export const vizNoFreeLunch: Viz = {
  id: 'ch9-no-free-lunch',
  title: 'No free lunch : K points, étiquettes sans régularité, aucune règle n’apprend',
  description:
    'Loi $\\mathbb P_{\\mathbf b}$ de la preuve du Th. 1.1 : $\\mathbf X$ uniforme sur $K$ points distincts, $Y=b_j$ si $\\mathbf X=a_j$ (donc $R^\\star=0$), l’étiquetage $\\mathbf b\\in\\{-1,1\\}^K$ étant tiré au hasard. Pour deux règles (mémoriser les labels vus et prédire $+1$ ailleurs ; plus proche voisin observé), on estime par Monte-Carlo le risque moyen $\\frac1{2^K}\\sum_{\\mathbf b}\\mathbb E_{\\mathbf b}[R(\\widehat g_n)]$ et on le compare à $\\frac12(1-1/K)^n$ et à la probabilité $(1-1/K)^n$ qu’un point test n’ait pas été observé. Curseurs $n$ et $K$.',
  source: 'Poly ch.9, Th. 1.1 et Compléments §4.1 ; PC9 Ex. 6',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let n = 50
    let K = 1000
    let rule: Rule = 'ppv'
    let seed = 1
    const M = 600
    const h = plot(plotEl, [], {})

    const draw = () => {
      const rng = makeRng(9800 + seed)
      const kGrid: number[] = []
      for (let k = 2; k <= 20000; k = Math.ceil(k * 1.15)) kGrid.push(k)
      const lower = kGrid.map((k) => 0.5 * Math.pow(1 - 1 / k, n))
      const unseen = kGrid.map((k) => Math.pow(1 - 1 / k, n))
      const mc = KS.map((k) => nflRisk(rng, k, n, rule, M))
      const cur = nflRisk(rng, K, n, rule, 2000)
      h.update(
        [
          lineTrace(kGrid, unseen, 'P(point test non observé) = (1 − 1/K)ⁿ', COLORS.gray, { line: { color: COLORS.gray, dash: 'dash', width: 2 } }),
          lineTrace(kGrid, lower, 'minorant ½ (1 − 1/K)ⁿ', COLORS.red),
          pointsTrace(KS, mc, `risque moyen (Monte-Carlo), règle « ${rule === 'memo' ? 'mémoriser, +1 ailleurs' : 'plus proche voisin'} »`, COLORS.blue, { marker: { color: COLORS.blue, size: 9 } }),
          lineTrace([2, 20000], [0.5, 0.5], 'pile ou face : 1/2', COLORS.green, { line: { color: COLORS.green, dash: 'dot', width: 1.5 } }),
        ],
        {
          title: `n = ${n} observations ; R★ = 0 pour chaque étiquetage`,
          xaxis: { title: 'nombre de points K (échelle log)', type: 'log' },
          yaxis: { title: 'probabilité / risque', range: [0, 1.02] },
          shapes: [vline(K, COLORS.orange, 'solid')],
        },
      )
      info.innerHTML = richToHtml(
        `Pour $K=${K}$ et $n=${n}$ : risque moyen estimé $${cur.toFixed(3)}$, minorant $\\frac12(1-1/K)^n=${(0.5 * Math.pow(1 - 1 / K, n)).toFixed(3)}$, alors que $R^\\star=0$. Un point test déjà observé est bien classé ; un point **non observé** a un label $b_J$ indépendant des labels vus : toute règle se trompe avec probabilité $1/2$ (étape 4 de la preuve). Quand $K\\gg n$, presque tous les points tests sont nouveaux et le risque moyen tend vers $1/2$. Comme **une moyenne est majorée par le maximum**, il existe un étiquetage $\\mathbf b$ pour lequel $\\mathbb E_{\\mathbf b}[R(\\widehat g_n)]\\ge\\frac12(1-1/K)^n\\ge\\frac12-\\varepsilon$ : c’est le Th. 1.1. La loi difficile **dépend de $n$** (il faut $K\\gg n$).`,
      )
    }
    const later = debounced(draw, 150)
    controls.append(
      segmented<Rule>(
        [
          { value: 'ppv', label: 'plus proche voisin' },
          { value: 'memo', label: 'mémoriser, +1 ailleurs' },
        ],
        rule,
        (v) => {
          rule = v
          draw()
        },
      ),
    )
    controls.append(slider({ label: '$n$', min: 0, max: Math.log10(500), step: 0.01, value: Math.log10(n), log: true, integer: true, onChange: (v) => { n = Math.max(1, v); later.call() } }).root)
    controls.append(slider({ label: '$K$', min: 1, max: Math.log10(20000), step: 0.01, value: Math.log10(K), log: true, integer: true, onChange: (v) => { K = Math.max(2, v); later.call() } }).root)
    controls.append(button('Relancer la simulation', () => { seed++; draw() }))
    draw()
    return () => {
      later.cancel()
      h.destroy()
    }
  },
}
