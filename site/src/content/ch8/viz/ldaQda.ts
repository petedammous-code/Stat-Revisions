import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng } from '../../../sim/rng'
import { type DiscFit, type Gauss2, type Pt, fitDisc, fitLogistic, phiDisc, sampleMixture, grid, zMatrix, frontierTrace } from './outils2d'

type Scen = 'iso' | 'ellipse' | 'diff' | 'croix'
type Regle = 'lda' | 'qda' | 'logit'

/** Quatre configurations inspirées de la Figure 1 de la PC8 (lignes 1 à 4) et de la Figure 2 du corrigé. */
function scenario(s: Scen): { g1: Gauss2; gm1: Gauss2; label: string } {
  switch (s) {
    case 'iso':
      return { g1: { mu: [1.6, 1.2], S: [1, 0, 1] }, gm1: { mu: [-0.6, -0.6], S: [1, 0, 1] }, label: 'Σ₁ = Σ₋₁ = I' }
    case 'ellipse':
      return { g1: { mu: [1.2, -0.4], S: [1.6, 1.1, 1.2] }, gm1: { mu: [-0.8, 0.6], S: [1.6, 1.1, 1.2] }, label: 'Σ₁ = Σ₋₁ (elliptique)' }
    case 'diff':
      return { g1: { mu: [1.2, 0.6], S: [0.35, 0.1, 2.2] }, gm1: { mu: [-0.6, -0.4], S: [2.0, -0.5, 0.6] }, label: 'Σ₁ ≠ Σ₋₁' }
    default:
      return { g1: { mu: [0, 0], S: [3, 0, 0.08] }, gm1: { mu: [0, 0], S: [0.08, 0, 3] }, label: 'même centre, en croix' }
  }
}

/** LDA, QDA et régression logistique : frontières estimées sur un même échantillon. */
export const vizLdaQda: Viz = {
  id: 'ch8-lda-qda-logistique',
  title: 'LDA, QDA et régression logistique : frontières de décision estimées',
  description:
    'Données simulées selon le modèle de l’analyse discriminante (Cadre 1.2) : $\\mathbf{X}\\mid Y=i\\sim\\mathcal{N}(\\mu_i,\\Sigma_i)$, $\\mathbb{P}(Y=1)=p$. Les trois règles *plug-in* sont estimées sur le même échantillon : **LDA** (covariance poolée, frontière droite), **QDA** (une covariance par classe, frontière conique), **logistique** ($\\mathrm{sigm}(\\theta^\\top\\mathbf{x})$ avec ordonnée à l’origine, EMV (12) par Newton, avec une très faible pénalité ridge pour garantir l’existence du minimum quand les classes sont séparables : réglage numérique hors poly). Pointillés gris : frontière de Bayes. Étoiles : moyennes estimées $\\widehat\\mu_{i,n}$ ; croix : points mal classés par la règle choisie.',
  source: 'Poly ch.8, Cadres 1.2–1.3, éq. (11)–(12), Figures 3–5 ; PC8 Ex. 3 (Figure 1) ; Examen 2025 Ex. 4 Q8',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    plotEl.style.minHeight = '460px'
    const h = plot(plotEl, [], {})
    let scen: Scen = 'iso'
    let regle: Regle = 'lda'
    let n = 200
    let p = 0.5
    let seed = 3

    const draw = () => {
      const sc = scenario(scen)
      const truth: DiscFit = { p, g1: sc.g1, gm1: sc.gm1 }
      const rng = makeRng(4200 + 31 * seed)
      const train: Pt[] = sampleMixture(rng, n, p, sc.g1, sc.gm1)
      const test: Pt[] = sampleMixture(makeRng(99 + seed), 4000, p, sc.g1, sc.gm1)
      const lda = fitDisc(train, true)
      const qda = fitDisc(train, false)
      const w = fitLogistic(train)
      const rules: Record<Regle, (x: number, y: number) => number> = {
        lda: (x, y) => phiDisc(lda, x, y),
        qda: (x, y) => phiDisc(qda, x, y),
        logit: (x, y) => w[0] + w[1] * x + w[2] * y,
      }
      const err = (f: (x: number, y: number) => number, pts: Pt[]) => pts.filter((q) => (f(q.x, q.y) >= 0 ? 1 : -1) !== q.label).length / pts.length
      const bayes = (x: number, y: number) => phiDisc(truth, x, y)
      const L = 5
      const gs = grid(-L, L, 121)
      const pos = train.filter((q) => q.label === 1)
      const neg = train.filter((q) => q.label === -1)
      const f = rules[regle]
      const bad = train.filter((q) => (f(q.x, q.y) >= 0 ? 1 : -1) !== q.label)
      h.update(
        [
          pointsTrace(neg.map((q) => q.x), neg.map((q) => q.y), 'Y = −1', COLORS.blue, { marker: { color: COLORS.blue, size: 6, opacity: 0.75 } }),
          pointsTrace(pos.map((q) => q.x), pos.map((q) => q.y), 'Y = 1', COLORS.red, { marker: { color: COLORS.red, size: 6, opacity: 0.75 } }),
          pointsTrace(bad.map((q) => q.x), bad.map((q) => q.y), 'mal classés (règle choisie)', '#111827', { marker: { symbol: 'x-thin-open', size: 11, color: '#111827', line: { width: 2, color: '#111827' } } }),
          pointsTrace([lda.gm1.mu[0], lda.g1.mu[0]], [lda.gm1.mu[1], lda.g1.mu[1]], 'moyennes estimées', COLORS.yellow, { marker: { symbol: 'star', size: 16, color: COLORS.yellow, line: { width: 1, color: '#111827' } } }),
          frontierTrace(gs, gs, zMatrix(gs, gs, bayes), 'Bayes (vraie loi)', COLORS.gray, 'dot'),
          frontierTrace(gs, gs, zMatrix(gs, gs, rules.lda), 'LDA', COLORS.teal),
          frontierTrace(gs, gs, zMatrix(gs, gs, rules.qda), 'QDA', COLORS.orange),
          frontierTrace(gs, gs, zMatrix(gs, gs, rules.logit), 'logistique', COLORS.purple, 'dash'),
        ],
        { title: `${sc.label}, n = ${n}, p = ${p.toFixed(2)}`, xaxis: { title: 'x⁽¹⁾', range: [-L, L] }, yaxis: { title: 'x⁽²⁾', range: [-L, L] } },
      )
      const rTest = { lda: err(rules.lda, test), qda: err(rules.qda, test), logit: err(rules.logit, test) }
      const rTrain = { lda: err(rules.lda, train), qda: err(rules.qda, train), logit: err(rules.logit, train) }
      const rBayes = err(bayes, test)
      const mis = scen === 'diff' || scen === 'croix'
      info.innerHTML = richToHtml(
        `**Erreurs** (apprentissage / test sur 4 000 points neufs) — LDA : $${rTrain.lda.toFixed(3)}$ / $${rTest.lda.toFixed(3)}$ ; QDA : $${rTrain.qda.toFixed(3)}$ / $${rTest.qda.toFixed(3)}$ ; logistique : $${rTrain.logit.toFixed(3)}$ / $${rTest.logit.toFixed(3)}$ ; règle de Bayes (vraie loi) : $${rBayes.toFixed(3)}$ sur le même test. ` +
          (mis
            ? 'Ici $\\Sigma_1\\ne\\Sigma_{-1}$ : le modèle LDA (et le modèle logistique linéaire) est **mal spécifié**, sa frontière reste une droite et son excès de risque ne tend pas vers 0 quand $n$ augmente (Prop. 1.5, avertissement 1) ; la QDA, bien spécifiée, s’approche de la frontière de Bayes. Dans la configuration « croix », $\\Sigma_1^{-1}-\\Sigma_{-1}^{-1}$ a des valeurs propres de signes opposés : la frontière QDA est une paire d’hyperboles.'
            : 'Ici $\\Sigma_1=\\Sigma_{-1}$ : la frontière de Bayes est une droite de vecteur normal $\\mathbf{w}_\\theta=\\Sigma^{-1}(\\mu_1-\\mu_{-1})$ ; LDA et QDA **ne coïncident pas** pour autant (les estimations de covariance diffèrent), la QDA est plus variable. Avec $p\\ne1/2$, la frontière se translate parallèlement à elle-même (terme $\\log\\frac p{1-p}$).') +
          ' La logistique ne modélise que $Y\\mid\\mathbf{X}$ : sa frontière est linéaire, comme la LDA, mais sans hypothèse sur la loi de $\\mathbf{X}$ (Examen 2025 Ex. 4 Q8).',
      )
    }

    controls.append(
      segmented<Scen>(
        [
          { value: 'iso', label: 'Σ = I' },
          { value: 'ellipse', label: 'même Σ' },
          { value: 'diff', label: 'Σ différentes' },
          { value: 'croix', label: 'croix' },
        ],
        scen,
        (v) => ((scen = v), draw()),
      ),
      segmented<Regle>(
        [
          { value: 'lda', label: '× : LDA' },
          { value: 'qda', label: '× : QDA' },
          { value: 'logit', label: '× : logistique' },
        ],
        regle,
        (v) => ((regle = v), draw()),
      ),
      slider({ label: '$n$', min: 1.3, max: 3.3, step: 0.05, log: true, integer: true, value: Math.log10(n), format: (v) => String(Math.round(v)), onChange: (v) => ((n = v), draw()) }).root,
      slider({ label: '$p$', min: 0.2, max: 0.8, step: 0.05, value: p, format: (v) => v.toFixed(2), onChange: (v) => ((p = v), draw()) }).root,
      button('Tirer un échantillon', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => h.destroy()
  },
}
