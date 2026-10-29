import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, hline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, cauchy } from '../../../sim/rng'
import { linspace, normalQuantile } from '../../../sim/stats'
import { gammaFn, gammaPrime, zEstimate, transLaw, fr, type GammaKind } from './common'

type Law = 'gauss' | 'cauchy'

const THETA_STAR = 2
const NMAX = 1000
const HUBER_K = 1

const LABELS: Record<GammaKind, string> = {
  signe: 'γ₀ = signe (médiane)',
  identite: 'γ∞(x) = x (moyenne)',
  huber: 'γ₁ (Huber, k = 1)',
  arctan: 'arctan',
}

/** Quantile de la loi centrée (pour intégrer E[γ(U − s)] par la transformation des quantiles). */
function quantileFn(law: Law): (p: number) => number {
  return law === 'gauss' ? (p) => normalQuantile(p) : (p) => Math.tan(Math.PI * (p - 0.5))
}

/** Z-estimateur : θ ↦ Ψ̂ₙ(θ), son zéro, la courbe limite Ψ_θ⋆ et la pente en θ⋆ (identité (3)). */
export const vizZEstimateur: Viz = {
  id: 'ch7-z-estimateur',
  title: 'Z-estimateur : la fonction d’estimation Ψ̂ₙ(θ) et son zéro',
  description:
    'Modèle de translation $q_\\theta(x)=f(x-\\theta)$, $\\theta^\\star=2$, fonction d’influence $\\psi(\\theta,x)=\\gamma(x-\\theta)$. On trace $\\theta\\mapsto\\widehat\\Psi_n(\\theta)=\\frac1n\\sum_i\\gamma(X_i-\\theta)$ (gris), son zéro $\\hat\\theta_n$ (rouge), la courbe limite $\\Psi_{\\theta^\\star}(\\theta)=\\mathbb{E}_{\\theta^\\star}[\\gamma(X_1-\\theta)]$ (bleu) et sa tangente en $\\theta^\\star$ (pente $-\\mathbb{E}[\\gamma\'(X_1-\\theta^\\star)]$). Choix de $\\gamma$ et de la loi, curseur $n$, bouton « Tirer ». Les trois termes de l’identité (3) sont affichés.',
  source: 'Poly ch.7, Déf. 1.2, Ex. 1.2–1.4, §1.5 (identité (3)), Thm 1.4 ; PC7 Ex. 5 (Figure 3)',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let kind: GammaKind = 'huber'
    let law: Law = 'gauss'
    let n = 30
    let seed = 1
    let sample: number[] = []
    const handle = plot(plotEl, [], {})
    const grid = linspace(-1, 5, 361)
    const P = 3000
    const probs = Array.from({ length: P }, (_, i) => (i + 0.5) / P)

    const regen = () => {
      const rng = makeRng(9100 + seed)
      sample = new Array<number>(NMAX)
      for (let i = 0; i < NMAX; i++) sample[i] = law === 'gauss' ? normal(rng, THETA_STAR, 1) : cauchy(rng, THETA_STAR, 1)
    }

    const draw = () => {
      const g = gammaFn(kind, HUBER_K)
      const gp = gammaPrime(kind, HUBER_K)
      const xs = sample.slice(0, n)
      const psiN = (t: number) => {
        let s = 0
        for (const x of xs) s += g(x - t)
        return s / n
      }
      const hasLimit = !(kind === 'identite' && law === 'cauchy')
      const q = quantileFn(law)
      const us = probs.map(q)
      const limit = (t: number) => {
        let s = 0
        for (const u of us) s += g(u + THETA_STAR - t)
        return s / P
      }
      const spec = transLaw(law)
      // pente moyenne E[γ'(X − θ⋆)] (pour signe : « dérivée » 2δ₀, donc 2 f(0), calcul formel PC7 Ex. 5 Q6)
      let slope = 0
      if (kind === 'signe') slope = 2 * spec.pdf(0)
      else {
        for (const u of us) slope += gp(u)
        slope /= P
      }
      let e2 = 0
      for (const u of us) e2 += g(u) * g(u)
      e2 /= P
      const vpsi = hasLimit ? e2 / (slope * slope) : Infinity
      const thetaHat = zEstimate(xs, kind, HUBER_K)
      const traces: Record<string, unknown>[] = []
      if (hasLimit) {
        traces.push(lineTrace(grid, grid.map(limit), 'Ψ_θ⋆(θ) (limite)', COLORS.blue, { line: { color: COLORS.blue, width: 3.5 } }))
        const tg = linspace(THETA_STAR - 1.2, THETA_STAR + 1.2, 2)
        traces.push(lineTrace(tg, tg.map((t) => -slope * (t - THETA_STAR)), 'tangente en θ⋆ (pente −E[γ′])', COLORS.teal, { line: { color: COLORS.teal, width: 2, dash: 'dot' } }))
      }
      const yVals = grid.map(psiN)
      traces.push(lineTrace(grid, yVals, `Ψ̂ₙ(θ), n = ${n}`, '#6b7280', { line: { color: '#6b7280', width: 2, shape: kind === 'signe' ? 'hv' : 'linear' } }))
      traces.push(pointsTrace([thetaHat], [0], 'zéro θ̂ₙ', COLORS.red, { marker: { color: COLORS.red, size: 11 } }))
      const yMax = kind === 'identite' ? 4 : kind === 'arctan' ? 1.7 : kind === 'huber' ? 1.2 : 1.1
      handle.update(traces, {
        title: `${LABELS[kind]}, loi ${law === 'gauss' ? 'N(θ⋆, 1)' : 'Cauchy(θ⋆, 1)'}`,
        xaxis: { title: 'θ', range: [-1, 5] },
        yaxis: { title: 'Ψ', range: [-yMax, yMax] },
        shapes: [hline(0, '#9ca3af', 'solid'), vline(THETA_STAR, COLORS.blue, 'dot'), vline(Math.max(-1, Math.min(5, thetaHat)), COLORS.red, 'dash')],
      })
      const num = -Math.sqrt(n) * psiN(THETA_STAR)
      let empSlope = 0
      for (const x of xs) empSlope += gp(x - THETA_STAR)
      empSlope /= n
      const err = Math.sqrt(n) * (thetaHat - THETA_STAR)
      const parts: string[] = []
      parts.push(`$\\hat\\theta_n=${fr(thetaHat)}$, erreur renormalisée $\\sqrt n(\\hat\\theta_n-\\theta^\\star)=${fr(err)}$.`)
      if (kind === 'signe') {
        parts.push(`**Médiane** : $\\widehat\\Psi_n$ est en escalier (valeurs dans $[-1,1]$), un zéro exact peut ne pas exister (on prend le changement de signe, PC7 Ex. 5 Q1) et $\\psi$ n’est pas dérivable : le Thm 1.4 ne s’applique pas, mais la « pente » $2f(0)=${fr(slope)}$ (dérivée formelle $\\operatorname{signe}\'=2\\delta_0$) donne la bonne variance $1/(4f(0)^2)=${fr(vpsi)}$ (statistiques d’ordre, §4.8).`)
      } else if (!hasLimit) {
        parts.push(`**Moyenne sous Cauchy** : $\\mathbb{E}|X_1|=+\\infty$, $\\psi(\\theta,x)=x-\\theta$ n’est **pas intégrable** : pas de fonction limite, pas de LGN, et $\\hat\\theta_n=\\bar X_n$ ne converge pas (essayer plusieurs tirages et de grands $n$). Il faut une fonction d’influence **bornée**.`)
      } else {
        parts.push(`Identité (3) : $\\sqrt n(\\hat\\theta_n-\\theta^\\star)\\approx\\dfrac{-\\sqrt n\\,\\widehat\\Psi_n(\\theta^\\star)}{\\widehat\\Psi_n\'(\\theta^\\star)}$ avec numérateur $-\\sqrt n\\,\\widehat\\Psi_n(\\theta^\\star)=${fr(num)}$ (TCL : $\\approx\\mathcal{N}(0,\\mathbb{E}[\\psi^2])$, $\\mathbb{E}[\\psi^2]=${fr(e2)}$) et pente $\\widehat\\Psi_n\'(\\theta^\\star)=-\\frac1n\\sum_i\\gamma\'(X_i-\\theta^\\star)=${fr(-empSlope)}$ (LGN : $\\to\\mathbb{E}[\\psi\']=${fr(-slope)}$) ; quotient $${fr(num / (-empSlope || NaN))}$ contre $${fr(err)}$ (l’écart est le reste $R_n$). Variance asymptotique $v_\\psi=\\mathbb{E}[\\psi^2]/(\\mathbb{E}[\\psi\'])^2=${fr(vpsi)}$${law === 'gauss' ? ' (borne $1/\\mathbb{I}=1$ : atteinte par la moyenne seulement)' : ' (borne $1/\\mathbb{I}=2$ pour Cauchy)'}. Plus la courbe bleue traverse 0 avec une **pente raide**, moins une perturbation de $\\widehat\\Psi_n$ déplace le zéro.`)
      }
      info.innerHTML = richToHtml(parts.join(' '))
    }

    controls.append(
      segmented<GammaKind>(
        [
          { value: 'signe', label: 'signe' },
          { value: 'identite', label: 'x (moyenne)' },
          { value: 'huber', label: 'Huber k = 1' },
          { value: 'arctan', label: 'arctan' },
        ],
        kind,
        (v) => {
          kind = v
          draw()
        },
      ),
    )
    controls.append(
      segmented<Law>(
        [
          { value: 'gauss', label: 'gaussienne' },
          { value: 'cauchy', label: 'Cauchy' },
        ],
        law,
        (v) => {
          law = v
          regen()
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$n$',
        min: 0.3,
        max: 3,
        step: 0.02,
        value: Math.log10(n),
        log: true,
        integer: true,
        onChange: (v) => {
          n = Math.max(2, Math.min(NMAX, v))
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer un échantillon', () => {
        seed++
        regen()
        draw()
      }),
    )
    regen()
    draw()
    return () => handle.destroy()
  },
}
