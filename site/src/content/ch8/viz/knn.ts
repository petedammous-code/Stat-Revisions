import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, hline, vline, COLORS, hexToRgba } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, type Rng } from '../../../sim/rng'
import { type Gauss2, type Pt, logDens, sampleGauss2, grid, zMatrix, frontierTrace } from './outils2d'

type Loi = 'gauss' | 'xor'

/** Une loi du couple : tirage et fonction de régression exacte (pour R* et la frontière de Bayes). */
interface Loi2d {
  draw: (rng: Rng) => Pt
  eta: (x: number, y: number) => number
}

const I = (s: number): Gauss2['S'] => [s * s, 0, s * s]

function makeLoi(l: Loi): Loi2d {
  if (l === 'gauss') {
    const g1: Gauss2 = { mu: [1, 0.6], S: I(1) }
    const gm1: Gauss2 = { mu: [-1, -0.4], S: I(1) }
    return {
      draw: (rng) => {
        const lab: 1 | -1 = rng() < 0.5 ? 1 : -1
        const [x, y] = sampleGauss2(rng, lab === 1 ? g1 : gm1)
        return { x, y, label: lab }
      },
      eta: (x, y) => 1 / (1 + Math.exp(logDens(gm1, x, y) - logDens(g1, x, y))),
    }
  }
  // « XOR » : chaque classe est un mélange de deux gaussiennes sur des diagonales opposées
  const c1: Gauss2[] = [
    { mu: [1.3, 1.3], S: I(0.7) },
    { mu: [-1.3, -1.3], S: I(0.7) },
  ]
  const cm1: Gauss2[] = [
    { mu: [1.3, -1.3], S: I(0.7) },
    { mu: [-1.3, 1.3], S: I(0.7) },
  ]
  const mix = (cs: Gauss2[], x: number, y: number) => 0.5 * Math.exp(logDens(cs[0], x, y)) + 0.5 * Math.exp(logDens(cs[1], x, y))
  return {
    draw: (rng) => {
      const lab: 1 | -1 = rng() < 0.5 ? 1 : -1
      const comp = rng() < 0.5 ? 0 : 1
      const [x, y] = sampleGauss2(rng, (lab === 1 ? c1 : cm1)[comp])
      return { x, y, label: lab }
    },
    eta: (x, y) => {
      const a = mix(c1, x, y)
      const b = mix(cm1, x, y)
      return a + b > 0 ? a / (a + b) : 0.5
    },
  }
}

/** Pour chaque point requête, labels des voisins triés par distance croissante (au plus kmax). */
function sortedLabels(train: Pt[], qx: number, qy: number, kmax: number): Int8Array {
  const n = train.length
  const d = new Float64Array(n)
  for (let i = 0; i < n; i++) {
    const dx = train[i].x - qx
    const dy = train[i].y - qy
    d[i] = dx * dx + dy * dy
  }
  const m = Math.min(kmax, n)
  // tri numérique natif des distances, puis tri fin des seuls candidats (≈ m indices)
  const thr = d.slice().sort()[m - 1]
  const cand: number[] = []
  for (let i = 0; i < n; i++) if (d[i] <= thr) cand.push(i)
  cand.sort((a, b) => d[a] - d[b])
  const out = new Int8Array(m)
  for (let j = 0; j < m; j++) out[j] = train[cand[j]].label
  return out
}

/** Erreurs (apprentissage et test) des k-PPV pour tous les k impairs ≤ kmax. */
function errorCurves(train: Pt[], test: Pt[], kmax: number): { ks: number[]; trainErr: number[]; testErr: number[] } {
  const ks: number[] = []
  for (let k = 1; k <= kmax; k += 2) ks.push(k)
  const count = (pts: Pt[]) => {
    const errs = new Array<number>(ks.length).fill(0)
    for (const q of pts) {
      const labs = sortedLabels(train, q.x, q.y, kmax)
      let s = 0
      let j = 0
      for (let r = 0; r < ks.length; r++) {
        while (j < ks[r] && j < labs.length) s += labs[j++]
        const pred = s >= 0 ? 1 : -1
        if (pred !== q.label) errs[r]++
      }
    }
    return errs.map((e) => e / pts.length)
  }
  return { ks, trainErr: count(train), testErr: count(test) }
}

/** k plus proches voisins en dimension 2 : frontière de décision, erreurs d’apprentissage et de test en fonction de k. */
export const vizKnn: Viz = {
  id: 'ch8-knn',
  title: 'k plus proches voisins sur données 2D : frontière, erreur d’apprentissage et de test',
  description:
    'La règle des $k$-PPV prédit la classe majoritaire parmi les $k$ points de $\\mathcal{D}_n$ les plus proches : c’est le *plug-in* de $\\hat\\eta_{n,k}(\\mathbf{x})=\\frac1k\\sum_{i\\in N_k(\\mathbf{x})}\\mathbb{1}_{\\{Y_i=1\\}}$ (Examen 2025 Ex. 3 Q4). Curseurs $k$ et $n$, choix de la loi, bouton « Tirer un échantillon ». À gauche : zones de décision (fond coloré), données d’apprentissage, frontière de Bayes $\\{\\eta=1/2\\}$ en pointillés. À droite : erreur d’apprentissage et erreur de test (1 000 points neufs) en fonction de $k$, et le risque de Bayes $R^\\star$.',
  source: 'Poly ch.8, Méthode 1.1 (k-PPV parmi les modèles de Y | X), Compléments Déf. 4.1 et Ex. 4.2 ; Examen 2025 Ex. 3 Q4–Q5',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hL = plot(plots[0], [], {})
    const hR = plot(plots[1], [], {})
    let loiName: Loi = 'gauss'
    let n = 150
    let k = 15
    let seed = 1
    let train: Pt[] = []
    let curves: ReturnType<typeof errorCurves> = { ks: [], trainErr: [], testErr: [] }
    let rstar = 0
    let gridLabels: Int8Array[][] = []
    const KMAX = 61
    const L = 3.6
    const gx = grid(-L, L, 61)
    const fineX = grid(-L, L, 81)

    const resample = () => {
      const loi = makeLoi(loiName)
      const rng = makeRng(8100 + 37 * seed)
      train = Array.from({ length: n }, () => loi.draw(rng))
      const test = Array.from({ length: 1000 }, () => loi.draw(rng))
      curves = errorCurves(train, test, Math.min(KMAX, n % 2 === 0 ? n - 1 : n))
      gridLabels = gx.map((y) => gx.map((x) => sortedLabels(train, x, y, KMAX)))
      // risque de Bayes par Monte-Carlo (graine fixe par loi) : E[min(eta, 1 - eta)]
      const rngB = makeRng(loiName === 'gauss' ? 777 : 778)
      let s = 0
      const M = 20000
      for (let i = 0; i < M; i++) {
        const q = loi.draw(rngB)
        const e = loi.eta(q.x, q.y)
        s += Math.min(e, 1 - e)
      }
      rstar = s / M
    }

    const draw = () => {
      const loi = makeLoi(loiName)
      const kk = Math.min(k, train.length % 2 === 0 ? train.length - 1 : train.length)
      const z = gridLabels.map((row) =>
        row.map((labs) => {
          let s = 0
          for (let j = 0; j < Math.min(kk, labs.length); j++) s += labs[j]
          return s >= 0 ? 1 : -1
        }),
      )
      const zB = zMatrix(fineX, fineX, (x, y) => loi.eta(x, y) - 0.5)
      const pos = train.filter((q) => q.label === 1)
      const neg = train.filter((q) => q.label === -1)
      hL.update(
        [
          {
            type: 'heatmap',
            x: gx,
            y: gx,
            z,
            showscale: false,
            hoverinfo: 'skip',
            zmin: -1,
            zmax: 1,
            colorscale: [
              [0, hexToRgba(COLORS.blue, 0.18)],
              [1, hexToRgba(COLORS.red, 0.18)],
            ],
            name: 'zones de décision',
          },
          frontierTrace(fineX, fineX, zB, 'frontière de Bayes η = 1/2', COLORS.gray, 'dash'),
          pointsTrace(pos.map((q) => q.x), pos.map((q) => q.y), 'Y = 1', COLORS.red, { marker: { color: COLORS.red, size: 6 } }),
          pointsTrace(neg.map((q) => q.x), neg.map((q) => q.y), 'Y = −1', COLORS.blue, { marker: { color: COLORS.blue, size: 6 } }),
        ],
        { title: `${kk}-PPV, n = ${train.length}`, xaxis: { title: 'x⁽¹⁾', range: [-L, L] }, yaxis: { title: 'x⁽²⁾', range: [-L, L] } },
      )
      hR.update(
        [
          lineTrace(curves.ks, curves.trainErr, 'erreur d’apprentissage', COLORS.orange),
          lineTrace(curves.ks, curves.testErr, 'erreur de test', COLORS.purple),
        ],
        { title: 'Erreurs en fonction de k', xaxis: { title: 'k' }, yaxis: { title: 'proportion d’erreurs', rangemode: 'tozero' }, shapes: [hline(rstar, COLORS.gray, 'dash'), vline(kk, COLORS.teal, 'dot')] },
      )
      const r = curves.ks.indexOf(kk)
      const tr = r >= 0 ? curves.trainErr[r] : NaN
      const te = r >= 0 ? curves.testErr[r] : NaN
      let best = 0
      for (let i = 1; i < curves.ks.length; i++) if (curves.testErr[i] < curves.testErr[best]) best = i
      info.innerHTML = richToHtml(
        `Pour $k=${kk}$ : erreur d’apprentissage $${tr.toFixed(3)}$, erreur de test $${te.toFixed(3)}$ ; risque de Bayes $R^\\star\\approx${rstar.toFixed(3)}$ (ligne pointillée). Meilleur $k$ sur ce test : $k=${curves.ks[best]}$ (erreur $${curves.testErr[best].toFixed(3)}$). Pour $k=1$, chaque point d’apprentissage est son propre voisin : **erreur d’apprentissage nulle**, comme la règle « par cœur » $g_{\\mathrm{bad},n}$ (Compléments, Déf. 4.1), mais l’erreur de test reste au-dessus de $R^\\star$ : **sur-apprentissage**. Quand $k$ grandit, la frontière se lisse (moins de variance, plus de biais). L’erreur d’apprentissage n’est pas une bonne estimation du risque : seule l’erreur sur des points **indépendants** de $\\mathcal{D}_n$ l’est (Prop. 2.5).`,
      )
    }

    const sK = slider({ label: '$k$', min: 1, max: KMAX, step: 2, value: k, onChange: (v) => ((k = v), draw()) })
    controls.append(
      segmented<Loi>(
        [
          { value: 'gauss', label: 'deux gaussiennes' },
          { value: 'xor', label: '« XOR » (mélanges)' },
        ],
        loiName,
        (v) => {
          loiName = v
          resample()
          draw()
        },
      ),
      sK.root,
      slider({
        label: '$n$',
        min: 20,
        max: 400,
        step: 10,
        value: n,
        onChange: (v) => {
          n = v
          resample()
          draw()
        },
      }).root,
      button('Tirer un échantillon', () => {
        seed++
        resample()
        draw()
      }),
    )
    resample()
    draw()
    return () => {
      hL.destroy()
      hR.destroy()
    }
  },
}
