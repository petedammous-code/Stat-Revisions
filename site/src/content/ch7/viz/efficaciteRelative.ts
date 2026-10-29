import type { Viz } from '../../types'
import { vizFrame, slider, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { linspace } from '../../../sim/stats'
import { transLaw, vHuber, vMedian, fr, type TransLaw } from './common'

/** Efficacité asymptotique relative : V[γ_k] (Huber) contre la borne 1/𝕀 (Thm 1.7). */
export const vizEfficaciteRelative: Viz = {
  id: 'ch7-efficacite-relative',
  title: 'Efficacité asymptotique relative : variances V[γₖ] et borne 1/𝕀',
  description:
    'Pour une loi de translation $f$ symétrique, on trace $k\\mapsto V[\\gamma_k]$ (variance asymptotique de l’estimateur de Huber, PC7 Ex. 5), qui relie la médiane ($k\\to0$, $V[\\gamma_0]=1/(4f(0)^2)$) à la moyenne ($k\\to\\infty$, $V[\\gamma_\\infty]=\\mathrm{Var}(X)$), et la borne $1/\\mathbb{I}$ du Thm 1.7 (pointillés), jamais franchie. Choix de la loi ; pour le mélange contaminé, curseurs $\\varepsilon$ et $\\tau$ (Figure 4 de la PC7). L’efficacité relative $(1/\\mathbb{I})/V$ et la taille d’échantillon équivalente sont affichées.',
  source: 'Poly ch.7, Thm 1.7, Ex. 1.9, §4.8 ; PC7 Ex. 5 Q6–Q7 (Figure 4)',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let law: TransLaw = 'contam'
    let eps = 0.01
    let tau = 10
    const handle = plot(plotEl, [], {})
    const ks = linspace(Math.log10(0.05), Math.log10(8), 120).map((u) => Math.pow(10, u))

    const draw = () => {
      const spec = transLaw(law, eps, tau)
      const vs = ks.map((k) => vHuber(spec, k))
      const bound = 1 / spec.fisher
      const v0 = vMedian(spec)
      const vInf = spec.variance
      let iMin = 0
      for (let i = 1; i < vs.length; i++) if (vs[i] < vs[iMin]) iMin = i
      const yTop = Math.min(Math.max(...vs, v0, Number.isFinite(vInf) ? vInf : 0) * 1.1, Math.max(4 * bound, v0 * 1.3))
      const traces: Record<string, unknown>[] = [
        lineTrace(ks, vs, 'V[γₖ] (Huber)', COLORS.blue),
        lineTrace([ks[0], ks[ks.length - 1]], [bound, bound], 'borne 1/𝕀 (EMV)', COLORS.red, { line: { color: COLORS.red, width: 2, dash: 'dash' } }),
        pointsTrace([ks[0]], [v0], 'médiane V[γ₀]', COLORS.green, { marker: { color: COLORS.green, size: 11, symbol: 'square' } }),
        pointsTrace([ks[iMin]], [vs[iMin]], 'minimum en k', COLORS.purple, { marker: { color: COLORS.purple, size: 11 } }),
      ]
      if (Number.isFinite(vInf)) traces.push(lineTrace([ks[0], ks[ks.length - 1]], [vInf, vInf], 'moyenne V[γ∞] = Var(X)', COLORS.orange, { line: { color: COLORS.orange, width: 2, dash: 'dot' } }))
      handle.update(traces, {
        title: spec.label,
        xaxis: { title: 'k (échelle log)', type: 'log' },
        yaxis: { title: 'variance asymptotique', range: [0, yTop] },
      })
      const effMed = bound / v0
      const effMean = Number.isFinite(vInf) ? bound / vInf : 0
      info.innerHTML = richToHtml(
        `**${spec.label}** ($${spec.tex}$). Information de Fisher $\\mathbb{I}=${fr(spec.fisher)}$, borne $1/\\mathbb{I}=${fr(bound)}$ (variance asymptotique de l’EMV, Thm 1.6–1.7). Médiane : $V[\\gamma_0]=${fr(v0)}$, efficacité relative $(1/\\mathbb{I})/V[\\gamma_0]=${fr(effMed, 2)}$ (il faut $${fr(1 / effMed, 2)}\\,n$ observations pour la précision de l’EMV avec $n$). Moyenne : $V[\\gamma_\\infty]=${fr(vInf)}$${Number.isFinite(vInf) ? `, efficacité $${fr(effMean, 2)}$` : ' : **pas de moment d’ordre 2**, la moyenne n’est même pas asymptotiquement normale'}. Meilleur Huber : $k\\approx${fr(ks[iMin], 2)}$, $V=${fr(vs[iMin])}$. Toutes les courbes restent **au-dessus** de $1/\\mathbb{I}$ : c’est le Thm 1.7 ($v_\\psi\\ge1/\\mathbb{I}$ par Cauchy-Schwarz, égalité ssi $\\psi\\propto\\dot\\ell$). ${law === 'gauss' ? 'Gaussien : $\\dot\\ell\\propto x-\\theta$, donc la moyenne atteint la borne et $k\\mapsto V[\\gamma_k]$ décroît (PC7 Ex. 5 Q6).' : law === 'cauchy' ? 'Cauchy : $8/\\pi^2\\approx0{,}81$ pour la médiane (Ex. 1.9).' : law === 'contam' ? 'Contamination : la moyenne s’effondre ($\\varepsilon\\tau^2$), un $k$ intermédiaire est le meilleur compromis (PC7 Ex. 5 Q7).' : law === 'laplace' ? 'Laplace : le score est $\\operatorname{signe}(x-\\theta)$, la médiane **est** l’EMV et atteint la borne quand $k\\to0$ (cas d’égalité $\\psi\\propto\\dot\\ell$).' : 'Student : le score $-f\'/f=4x/(3+x^2)$ est borné et redescend : les fonctions d’influence bornées (Huber) sont proches de l’optimum.'}`,
      )
    }

    const epsSlider = slider({
      label: '$\\varepsilon$ (mélange)',
      min: 0,
      max: 0.2,
      step: 0.005,
      value: eps,
      format: (v) => v.toFixed(3),
      onChange: (v) => {
        eps = v
        draw()
      },
    })
    const tauSlider = slider({
      label: '$\\tau$ (mélange)',
      min: 1,
      max: 30,
      step: 0.5,
      value: tau,
      format: (v) => v.toFixed(1),
      onChange: (v) => {
        tau = v
        draw()
      },
    })
    const toggleMix = () => {
      const show = law === 'contam'
      epsSlider.root.style.display = show ? '' : 'none'
      tauSlider.root.style.display = show ? '' : 'none'
    }
    controls.append(
      segmented<TransLaw>(
        [
          { value: 'gauss', label: 'gaussienne' },
          { value: 'contam', label: 'contaminée' },
          { value: 'laplace', label: 'Laplace' },
          { value: 'student3', label: 'Student t(3)' },
          { value: 'cauchy', label: 'Cauchy' },
        ],
        law,
        (v) => {
          law = v
          toggleMix()
          draw()
        },
      ),
    )
    controls.append(epsSlider.root, tauSlider.root)
    toggleMix()
    draw()
    return () => handle.destroy()
  },
}
