import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, toggle } from '../../../core/ui'
import { plot, lineTrace, barTrace, vline, hline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, type Rng } from '../../../sim/rng'
import { normalCdf, normalPdf, histogram, linspace, mean } from '../../../sim/stats'

type Modele = 'bien' | 'mal'
type Regle = 'lda' | 'qda'

interface Vraie {
  p: number
  m1: number
  s1: number
  mm1: number
  sm1: number
}

const VRAIES: Record<Modele, Vraie> = {
  bien: { p: 0.5, m1: 1, s1: 1, mm1: -1, sm1: 1 },
  mal: { p: 0.5, m1: 1, s1: 2.2, mm1: 0, sm1: 0.5 },
}

/** Risque de Bayes par intégration numérique de min(p q1, (1-p) q-1). */
function bayesRisk(v: Vraie): number {
  const xs = linspace(-15, 15, 6001)
  const dx = xs[1] - xs[0]
  let s = 0
  for (const x of xs) s += Math.min(v.p * normalPdf(x, v.m1, v.s1), (1 - v.p) * normalPdf(x, v.mm1, v.sm1)) * dx
  return s
}

/** Ensemble {x : a x² + b x + c ≥ 0} comme réunion d’intervalles (bornes ±∞ possibles). */
function positiveSet(a: number, b: number, c: number): [number, number][] {
  const INF = Infinity
  if (Math.abs(a) < 1e-12) {
    if (Math.abs(b) < 1e-12) return c >= 0 ? [[-INF, INF]] : []
    const t = -c / b
    return b > 0 ? [[t, INF]] : [[-INF, t]]
  }
  const D = b * b - 4 * a * c
  if (D <= 0) return a > 0 ? [[-INF, INF]] : []
  const r1 = (-b - Math.sqrt(D)) / (2 * a)
  const r2 = (-b + Math.sqrt(D)) / (2 * a)
  const lo = Math.min(r1, r2)
  const hi = Math.max(r1, r2)
  return a > 0 ? [[-INF, lo], [hi, INF]] : [[lo, hi]]
}

/** Probabilité qu’une N(m, s²) tombe dans une réunion d’intervalles. */
function probIn(set: [number, number][], m: number, s: number): number {
  let r = 0
  for (const [u, v] of set) r += normalCdf((v - m) / s) - normalCdf((u - m) / s)
  return r
}

/** Ajuste la règle plug-in (LDA ou QDA 1D) : coefficients de phi(x) = a x² + b x + c ; renvoie aussi l’erreur d’apprentissage. */
function fitRule(rng: Rng, v: Vraie, n: number, regle: Regle): { a: number; b: number; c: number; trainErr: number } {
  const xs = new Float64Array(n)
  const ys = new Int8Array(n)
  let n1 = 0
  let s1 = 0
  let sm1 = 0
  for (let i = 0; i < n; i++) {
    const lab = rng() < v.p ? 1 : -1
    ys[i] = lab
    xs[i] = lab === 1 ? normal(rng, v.m1, v.s1) : normal(rng, v.mm1, v.sm1)
    if (lab === 1) (n1++, (s1 += xs[i]))
    else sm1 += xs[i]
  }
  const nm1 = n - n1
  const p = Math.min(1 - 1e-3, Math.max(1e-3, n1 / n))
  const mu1 = n1 > 0 ? s1 / n1 : 0
  const mum1 = nm1 > 0 ? sm1 / nm1 : 0
  let v1 = 0
  let vm1 = 0
  for (let i = 0; i < n; i++) {
    if (ys[i] === 1) v1 += (xs[i] - mu1) ** 2
    else vm1 += (xs[i] - mum1) ** 2
  }
  let var1 = Math.max(v1 / Math.max(n1, 1), 1e-4)
  let varm1 = Math.max(vm1 / Math.max(nm1, 1), 1e-4)
  if (regle === 'lda') {
    const pooled = Math.max((v1 + vm1) / n, 1e-4)
    var1 = pooled
    varm1 = pooled
  }
  // phi(x) = log(p/(1-p)) + log q1(x) - log q-1(x)
  const a = -0.5 / var1 + 0.5 / varm1
  const b = mu1 / var1 - mum1 / varm1
  const c = Math.log(p / (1 - p)) - 0.5 * Math.log(var1 / varm1) - (mu1 * mu1) / (2 * var1) + (mum1 * mum1) / (2 * varm1)
  let err = 0
  for (let i = 0; i < n; i++) {
    const x = xs[i]
    const pred = a * x * x + b * x + c >= 0 ? 1 : -1
    if (pred !== ys[i]) err++
  }
  return { a, b, c, trainErr: err / n }
}

/** Vrai risque R(ĝ_n) = P(ĝ_n(X) ≠ Y | D_n), calculé exactement sous la vraie loi (Prop. 2.5 : on gèle D_n). */
function trueRisk(v: Vraie, f: { a: number; b: number; c: number }): number {
  const set = positiveSet(f.a, f.b, f.c)
  return v.p * (1 - probIn(set, v.m1, v.s1)) + (1 - v.p) * probIn(set, v.mm1, v.sm1)
}

const NS = [10, 20, 50, 100, 200, 500, 1000, 2000, 5000]

/** Risque empirique et vrai risque d’une règle plug-in quand n augmente ; distribution de R(ĝ_n). */
export const vizRisqueN: Viz = {
  id: 'ch8-risque-n',
  title: 'Risque empirique et risque réel d’une règle plug-in quand n augmente',
  description:
    'Classification en dimension 1 avec deux classes gaussiennes ; règle *plug-in* LDA (variance commune) ou QDA (une variance par classe), estimée par EMV sur $\\mathcal{D}_n$. À gauche, en fonction de $n$ (échelle log, 60 ensembles d’apprentissage par $n$) : erreur d’apprentissage moyenne, **risque moyen** $\\mathbb{E}_n[R_{01}(\\widehat g_n)]$ (calculé exactement en gelant $\\mathcal{D}_n$) et risque de Bayes $R^\\star$. À droite : histogramme de la variable aléatoire $R_{01}(\\widehat g_n)$ pour le $n$ choisi. Choix « bien spécifié » / « mal spécifié » (variances différentes) ; bouton « Tirer de nouveaux ensembles ».',
  source: 'Poly ch.8, Prop. 1.5 et ses deux avertissements, p. 22–23 ; Compléments §4.4, Déf. 4.1–4.2',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hL = plot(plots[0], [], {})
    const hR = plot(plots[1], [], {})
    let modele: Modele = 'bien'
    let regle: Regle = 'lda'
    let nHist = 100
    let seed = 1
    let showBad = false

    const draw = () => {
      const v = VRAIES[modele]
      const rstar = bayesRisk(v)
      const rng = makeRng(5300 + 13 * seed + (modele === 'mal' ? 1000 : 0) + (regle === 'qda' ? 2000 : 0))
      const R = 60
      const meanTrain: number[] = []
      const meanTrue: number[] = []
      for (const n of NS) {
        let st = 0
        let sr = 0
        for (let r = 0; r < R; r++) {
          const f = fitRule(rng, v, n, regle)
          st += f.trainErr
          sr += trueRisk(v, f)
        }
        meanTrain.push(st / R)
        meanTrue.push(sr / R)
      }
      const rngH = makeRng(9100 + seed)
      const risks: number[] = []
      for (let r = 0; r < 200; r++) risks.push(trueRisk(v, fitRule(rngH, v, nHist, regle)))
      const lo = Math.min(rstar, ...risks)
      const hi = Math.max(...risks)
      const hst = histogram(risks, 25, lo - 1e-4, hi + 1e-3)
      const traces = [
        lineTrace(NS, meanTrain, 'erreur d’apprentissage moyenne', COLORS.orange, { mode: 'lines+markers' }),
        lineTrace(NS, meanTrue, 'risque moyen E[R(ĝₙ)]', COLORS.purple, { mode: 'lines+markers' }),
      ]
      if (showBad) {
        traces.push(lineTrace(NS, NS.map(() => 0), 'règle « par cœur » : erreur d’apprentissage', COLORS.red, { line: { color: COLORS.red, width: 2, dash: 'dot' } }))
        traces.push(lineTrace(NS, NS.map(() => v.p), 'règle « par cœur » : vrai risque', COLORS.red, { line: { color: COLORS.red, width: 2, dash: 'dash' } }))
      }
      hL.update(traces, {
        title: 'Erreurs moyennes en fonction de n',
        xaxis: { title: 'n', type: 'log' },
        yaxis: { title: 'proportion d’erreurs', rangemode: 'tozero' },
        shapes: [hline(rstar, COLORS.gray, 'dash')],
      })
      hR.update([barTrace(hst.centers, hst.density, `R(ĝₙ), n = ${nHist}`, COLORS.purple)], {
        title: `Loi de R(ĝₙ) sur 200 ensembles, n = ${nHist}`,
        xaxis: { title: 'risque conditionnel R(ĝₙ)' },
        yaxis: { title: 'densité' },
        bargap: 0.05,
        shapes: [vline(rstar, COLORS.gray, 'dash'), vline(mean(risks), COLORS.purple, 'dot')],
      })
      const last = meanTrue[meanTrue.length - 1]
      const verdict =
        modele === 'bien' || regle === 'qda'
          ? `Modèle **bien spécifié** pour la règle choisie : le risque moyen tend vers $R^\\star$ (excès moyen $\\approx${(last - rstar).toFixed(5)}$ pour $n=5000$), conformément à la Prop. 1.5.`
          : `La LDA suppose une variance commune alors que $\\sigma_1\\ne\\sigma_{-1}$ : modèle **mal spécifié**, le risque moyen **plafonne** au-dessus de $R^\\star$ (excès $\\approx${(last - rstar).toFixed(5)}$ même pour $n=5000$) : avertissement 1 de la Prop. 1.5. Passer à la QDA (bien spécifiée) fait disparaître le plateau.`
      info.innerHTML = richToHtml(
        `Risque de Bayes $R^\\star\\approx${rstar.toFixed(4)}$ (pointillés). ${verdict} À droite, $R_{01}(\\widehat g_n)=\\mathbb{P}(\\widehat g_n(X)\\ne Y\\mid\\mathcal{D}_n)$ est une **variable aléatoire** (fonction de $\\mathcal{D}_n$), toujours $\\ge R^\\star$ ; sa moyenne (pointillé violet, $\\approx${mean(risks).toFixed(4)}$) est le risque moyen : c’est le **double aléa**. L’erreur d’apprentissage sous-estime le risque, surtout pour $n$ petit (biais d’optimisme). La règle « par cœur » a une erreur d’apprentissage nulle mais un vrai risque $p=${v.p}$ (Déf. 4.1).`,
      )
    }

    controls.append(
      segmented<Modele>(
        [
          { value: 'bien', label: 'σ₁ = σ₋₁ (bien spécifié)' },
          { value: 'mal', label: 'σ₁ ≠ σ₋₁' },
        ],
        modele,
        (x) => ((modele = x), draw()),
      ),
      segmented<Regle>(
        [
          { value: 'lda', label: 'LDA' },
          { value: 'qda', label: 'QDA' },
        ],
        regle,
        (x) => ((regle = x), draw()),
      ),
      slider({ label: '$n$ (histogramme)', min: 1, max: 3.7, step: 0.05, log: true, integer: true, value: Math.log10(nHist), format: (x) => String(Math.round(x)), onChange: (x) => ((nHist = Math.max(10, x)), draw()) }).root,
      toggle('règle « par cœur »', showBad, (b) => ((showBad = b), draw())),
      button('Tirer de nouveaux ensembles', () => {
        seed++
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
