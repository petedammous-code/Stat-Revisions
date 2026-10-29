import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, barTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng } from '../../../sim/rng'
import { histogram } from '../../../sim/stats'
import { debounced } from './outils'

/** X uniforme sur K = 16 points ; eta_j = P(Y = 1 | X = j). */
export const ETA_BIAIS = [0.8, 0.75, 0.7, 0.3, 0.2, 0.65, 0.35, 0.9, 0.1, 0.6, 0.4, 0.85, 0.25, 0.55, 0.45, 0.7]
const K = 16
const NRULES = 1 << 15
const RSTAR = ETA_BIAIS.reduce((s, e) => s + Math.min(e, 1 - e), 0) / K

/** Classe emboîtée : les N premières règles d'une liste fixée de 2^15 règles tirées au hasard (bit j = 1 : prédire +1 en j). */
const RULES = (() => {
  const rng = makeRng(777)
  const r = new Uint16Array(NRULES)
  for (let i = 0; i < NRULES; i++) r[i] = Math.floor(rng() * 65536)
  return r
})()
const riskOf = (g: number) => {
  let s = 0
  for (let j = 0; j < K; j++) s += (g >> j) & 1 ? 1 - ETA_BIAIS[j] : ETA_BIAIS[j]
  return s / K
}
const RISK = Float64Array.from(RULES, riskOf)
/** inf_{g ∈ C_N} R(g) pour N = 2^l, l = 0..15 ; l = 16 : toutes les règles (inf = R*). */
const LOGS = Array.from({ length: 17 }, (_, l) => l)
const INF = LOGS.map((l) => {
  if (l === 16) return RSTAR
  let m = Infinity
  for (let i = 0; i < 1 << l; i++) m = Math.min(m, RISK[i])
  return m
})

/** Biais optimiste du risque empirique du MRE (Prop. 1.1) et borne en espérance (Th. 1.8) sur une classe finie. */
export const vizBiaisOptimiste: Viz = {
  id: 'ch9-biais-optimiste',
  title: 'Biais optimiste du MRE et borne en √(log|C|/n) sur une classe finie',
  description:
    'Classification avec $\\mathbf X$ uniforme sur $K=16$ points et $\\eta$ fixée ; la classe $\\mathcal C$ est formée des $|\\mathcal C|$ premières règles d’une liste de règles tirées au hasard (classes **emboîtées**), et $|\\mathcal C|=2^{16}$ correspond à **toutes** les règles (MRE = vote majoritaire, PC9 Ex. 4). Sur $200$ échantillons de taille $n$ : à gauche, histogrammes de $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})$ et de $R(\\hat g^*_{n,\\mathcal C})$ autour de $\\inf_{\\mathcal C}R$ ; à droite, en fonction de $\\log_2|\\mathcal C|$, les moyennes de ces deux quantités, $\\inf_{\\mathcal C}R$, $R^\\star$ et la borne $\\inf_{\\mathcal C}R+\\sqrt{\\log(2|\\mathcal C|)/(2n)}$ du Th. 1.8. Curseurs $n$ et $\\log_2|\\mathcal C|$.',
  source: 'Poly ch.9, Prop. 1.1, Th. 1.2 (3), Th. 1.8 ; PC9 Ex. 4',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let n = 100
    let lc = 8
    let seed = 1
    const M = 200
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    let empAt: number[][] = []
    let riskAt: number[][] = []

    const simulate = () => {
      const rng = makeRng(9700 + seed)
      empAt = LOGS.map(() => [])
      riskAt = LOGS.map(() => [])
      const plus = new Int32Array(K)
      const minus = new Int32Array(K)
      const low = new Int32Array(256)
      const high = new Int32Array(256)
      for (let r = 0; r < M; r++) {
        plus.fill(0)
        minus.fill(0)
        for (let i = 0; i < n; i++) {
          const j = Math.floor(rng() * K)
          if (rng() < ETA_BIAIS[j]) plus[j]++
          else minus[j]++
        }
        // nombre d'erreurs de la règle g : sum_j (bit_j ? minus_j : plus_j) = base + sum_{bit_j = 1} (minus_j - plus_j)
        let base = 0
        for (let j = 0; j < K; j++) base += plus[j]
        for (let b = 0; b < 256; b++) {
          let sl = 0
          let sh = 0
          for (let j = 0; j < 8; j++) {
            if ((b >> j) & 1) {
              sl += minus[j] - plus[j]
              sh += minus[j + 8] - plus[j + 8]
            }
          }
          low[b] = sl
          high[b] = sh
        }
        let best = Infinity
        let bestIdx = 0
        let next = 1
        let l = 0
        for (let i = 0; i < NRULES; i++) {
          const g = RULES[i]
          const e = base + low[g & 255] + high[g >> 8]
          if (e < best) {
            best = e
            bestIdx = i
          }
          if (i + 1 === next) {
            empAt[l].push(best / n)
            riskAt[l].push(RISK[bestIdx])
            l++
            next *= 2
          }
        }
        // toutes les règles : vote majoritaire dans chaque cellule (égalité : +1)
        let e = 0
        let g = 0
        for (let j = 0; j < K; j++) {
          if (plus[j] >= minus[j]) {
            g |= 1 << j
            e += minus[j]
          } else e += plus[j]
        }
        empAt[16].push(e / n)
        riskAt[16].push(riskOf(g))
      }
    }

    const avg = (a: number[]) => a.reduce((s, x) => s + x, 0) / a.length

    const render = () => {
      const emp = empAt[lc]
      const risk = riskAt[lc]
      const lo = Math.min(...emp, ...risk) - 0.02
      const hi = Math.max(...emp, ...risk) + 0.02
      const he = histogram(emp, 30, lo, hi)
      const hr = histogram(risk, 30, lo, hi)
      hLeft.update(
        [
          barTrace(he.centers, he.density, 'risque empirique du MRE', COLORS.orange, { width: he.width }),
          barTrace(hr.centers, hr.density, 'risque R du MRE', COLORS.blue, { width: hr.width }),
        ],
        {
          title: `|C| = 2^${lc}, n = ${n} : ${M} échantillons`,
          xaxis: { title: 'risque', range: [lo, hi] },
          yaxis: { title: 'densité' },
          barmode: 'overlay',
          shapes: [vline(INF[lc], '#111827', 'dash'), vline(RSTAR, COLORS.gray, 'dot')],
        },
      )
      const mEmp = empAt.map(avg)
      const mRisk = riskAt.map(avg)
      const bound = LOGS.map((l) => INF[l] + Math.sqrt(Math.log(2 * Math.pow(2, l)) / (2 * n)))
      hRight.update(
        [
          lineTrace(LOGS, mRisk, 'E[R(ĝ*)]', COLORS.blue, { mode: 'lines+markers' }),
          lineTrace(LOGS, INF, 'inf_C R (oracle)', '#111827', { mode: 'lines+markers' }),
          lineTrace(LOGS, mEmp, 'E[risque empirique de ĝ*]', COLORS.orange, { mode: 'lines+markers' }),
          lineTrace(LOGS, bound, 'inf_C R + √(log(2|C|)/2n) (Th. 1.8)', COLORS.red, { line: { color: COLORS.red, dash: 'dash', width: 2 } }),
          lineTrace([0, 16], [RSTAR, RSTAR], 'R★ (bayésien)', COLORS.gray, { line: { color: COLORS.gray, dash: 'dot', width: 1.5 } }),
        ],
        {
          title: 'Moyennes en fonction de la taille de la classe',
          xaxis: { title: 'log₂ |C|' },
          yaxis: { title: 'risque', range: [0, Math.min(0.9, Math.max(...bound.slice(0, 17)) + 0.05)] },
          shapes: [vline(lc, COLORS.gray, 'solid')],
        },
      )
      info.innerHTML = richToHtml(
        `Pour $|\\mathcal C|=2^{${lc}}$ et $n=${n}$ : $\\mathbb E[\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})]\\approx${mEmp[lc].toFixed(3)}\\le\\inf_{\\mathcal C}R=${INF[lc].toFixed(3)}\\le\\mathbb E[R(\\hat g^*_{n,\\mathcal C})]\\approx${mRisk[lc].toFixed(3)}$ : c’est exactement la **Prop. 1.1** (biais optimiste). L’erreur d’estimation moyenne vaut $${(mRisk[lc] - INF[lc]).toFixed(3)}$, sous la borne $\\sqrt{\\log(2|\\mathcal C|)/(2n)}=${(bound[lc] - INF[lc]).toFixed(3)}$ du **Th. 1.8**. Quand la classe grandit, l’oracle s’améliore (erreur d’approximation $\\inf_{\\mathcal C}R-R^\\star$ décroissante) mais le hasard de l’échantillon a plus de règles à favoriser : l’écart entre risque empirique et risque du MRE se creuse, comme $\\sqrt{\\log|\\mathcal C|/n}$.`,
      )
    }
    const recompute = () => {
      simulate()
      render()
    }
    const later = debounced(recompute, 150)
    controls.append(slider({ label: '$n$', min: 1, max: Math.log10(3000), step: 0.01, value: Math.log10(n), log: true, integer: true, onChange: (v) => { n = v; later.call() } }).root)
    controls.append(slider({ label: '$\\log_2|\\mathcal C|$', min: 0, max: 16, step: 1, value: lc, onChange: (v) => { lc = v; render() } }).root)
    controls.append(button('Tirer 200 échantillons', () => { seed++; recompute() }))
    recompute()
    return () => {
      later.cancel()
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
