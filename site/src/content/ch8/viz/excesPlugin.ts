import type { Viz } from '../../types'
import { vizFrame, slider, segmented } from '../../../core/ui'
import { plot, lineTrace, areaTrace, hline, COLORS, hexToRgba } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { normalPdf, linspace } from '../../../sim/stats'

type Loi = 'gauss' | 'pc8'
type Err = 'decalage' | 'logit' | 'bruit'

const sigm = (t: number) => 1 / (1 + Math.exp(-t))
const logit = (u: number) => {
  const v = Math.min(1 - 1e-9, Math.max(1e-9, u))
  return Math.log(v / (1 - v))
}

/** Vraie loi : densité marginale p_X et vraie fonction de régression η*. */
function truth(loi: Loi): { pX: (x: number) => number; eta: (x: number) => number; lo: number; hi: number } {
  if (loi === 'gauss') {
    // p = 1/2, X | Y = 1 ~ N(1, 1), X | Y = -1 ~ N(-1, 1) : η*(x) = sigm(2x)
    return { pX: (x) => 0.5 * normalPdf(x, 1, 1) + 0.5 * normalPdf(x, -1, 1), eta: (x) => sigm(2 * x), lo: -4, hi: 4 }
  }
  // PC8 Ex. 5 : X | Y = -1 ~ U([0,2]), X | Y = 1 ~ U([1,4]), p = 1/2
  return {
    pX: (x) => (x < 0 || x > 4 ? 0 : x <= 1 ? 0.25 : x <= 2 ? 5 / 12 : 1 / 6),
    eta: (x) => (x <= 1 ? 0 : x <= 2 ? 0.4 : 1),
    lo: -0.5,
    hi: 4.5,
  }
}

/** Excès de risque d’une règle seuillant une approximation η̃ de η* : formule (4) contre majoration (13). */
export const vizExcesPlugin: Viz = {
  id: 'ch8-exces-plugin',
  title: 'Excès de risque d’un classifieur plug-in : formule (4) et majoration (13)',
  description:
    'On remplace la vraie fonction de régression $\\eta^\\star$ par une approximation $\\tilde\\eta$ (curseur $\\delta$ : amplitude de l’erreur ; trois types d’erreur) et l’on classe par $\\tilde g=2\\,\\mathbb{1}_{\\{\\tilde\\eta\\ge1/2\\}}-1$. À gauche : $\\eta^\\star$, $\\tilde\\eta$ et la zone de désaccord $\\{\\tilde g\\ne g^\\star\\}$. À droite : l’intégrande $|2\\eta^\\star-1|\\,p_X$ de l’excès de risque (4) sur cette zone (aire orange) et l’intégrande $2|\\eta^\\star-\\tilde\\eta|\\,p_X$ de la majoration (13) (courbe verte).',
  source: 'Poly ch.8, Th. 1.2 éq. (4), majoration (13), Prop. 4.2 ; PC8 Ex. 2 Q4 et Ex. 7 ; Examen 2025 Ex. 3 Q2–Q3',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hL = plot(plots[0], [], {})
    const hR = plot(plots[1], [], {})
    let loi: Loi = 'gauss'
    let err: Err = 'decalage'
    let delta = 0.4

    const etaTilde = (eta: (x: number) => number, x: number): number => {
      if (err === 'decalage') return eta(x - 2 * delta)
      if (err === 'logit') return sigm(logit(eta(x)) + 3 * delta)
      return Math.min(1, Math.max(0, eta(x) + 0.5 * Math.abs(delta) * Math.sin(4 * x)))
    }

    const draw = () => {
      const T = truth(loi)
      const xs = linspace(T.lo, T.hi, 1801)
      const dx = xs[1] - xs[0]
      const e = xs.map(T.eta)
      const et = xs.map((x) => etaTilde(T.eta, x))
      const px = xs.map(T.pX)
      const dis = xs.map((_, i) => (e[i] >= 0.5) !== (et[i] >= 0.5))
      const integrand = xs.map((_, i) => (dis[i] ? Math.abs(2 * e[i] - 1) * px[i] : 0))
      const bound = xs.map((_, i) => 2 * Math.abs(e[i] - et[i]) * px[i])
      let excess = 0
      let fine = 0
      let coarse = 0
      for (let i = 0; i < xs.length; i++) {
        excess += integrand[i] * dx
        if (dis[i]) fine += bound[i] * dx
        coarse += bound[i] * dx
      }
      const shapes: Record<string, unknown>[] = []
      let start: number | null = null
      for (let i = 0; i < xs.length; i++) {
        if (dis[i] && start === null) start = xs[i]
        if ((!dis[i] || i === xs.length - 1) && start !== null) {
          shapes.push({ type: 'rect', x0: start, x1: xs[i], y0: 0, y1: 1, yref: 'paper', fillcolor: hexToRgba(COLORS.orange, 0.15), line: { width: 0 }, layer: 'below' })
          start = null
        }
      }
      hL.update(
        [lineTrace(xs, e, 'η* (vraie)', COLORS.purple), lineTrace(xs, et, 'η̃ (approchée)', COLORS.teal, { line: { color: COLORS.teal, width: 2.5, dash: 'dash' } })],
        { title: 'η*, η̃ et zone de désaccord {g̃ ≠ g*}', xaxis: { title: 'x' }, yaxis: { title: 'probabilité', range: [-0.02, 1.02] }, shapes: [...shapes, hline(0.5, COLORS.gray, 'dot')] },
      )
      hR.update(
        [areaTrace(xs, integrand, '|2η* − 1| p_X sur {g̃ ≠ g*} : aire = excès', COLORS.orange), lineTrace(xs, bound, '2|η* − η̃| p_X : aire = borne (13)', COLORS.green)],
        { title: 'Intégrandes de l’excès de risque et de la borne', xaxis: { title: 'x' }, yaxis: { title: 'intégrande' }, shapes },
      )
      const typeTxt =
        err === 'decalage'
          ? `$\\tilde\\eta(x)=\\eta^\\star(x-${(2 * delta).toFixed(2)})$ (décalage)`
          : err === 'logit'
            ? `$\\tilde\\eta=\\mathrm{sigm}(\\mathrm{logit}\\,\\eta^\\star+${(3 * delta).toFixed(2)})$ (biais sur le logit)`
            : `$\\tilde\\eta=\\eta^\\star+${(0.5 * Math.abs(delta)).toFixed(2)}\\sin(4x)$ tronqué à $[0,1]$ (bruit)`
      info.innerHTML = richToHtml(
        `${typeTxt}. **Excès de risque** (4) : $R(\\tilde g)-R^\\star=\\mathbb{E}[|2\\eta^\\star(X)-1|\\mathbb{1}_{\\{\\tilde g\\ne g^\\star\\}}]\\approx${excess.toFixed(4)}$ ; borne fine (PC8 Ex. 2 Q4) $2\\,\\mathbb{E}[|\\eta^\\star-\\tilde\\eta|\\mathbb{1}_{\\{\\tilde g\\ne g^\\star\\}}]\\approx${fine.toFixed(4)}$ ; majoration (13) $2\\,\\mathbb{E}|\\eta^\\star-\\tilde\\eta|\\approx${coarse.toFixed(4)}$. On ne paie que sur la zone orange, et peu là où $\\eta^\\star\\approx1/2$. Avec l’erreur « bruit », $\\tilde\\eta$ peut s’écarter de $\\eta^\\star$ sans changer la décision : la borne (13) est alors très pessimiste. Si $\\tilde\\eta_n\\to\\eta^\\star$, la borne tend vers 0 : c’est la Prop. 1.5.`,
      )
    }

    controls.append(
      segmented<Loi>(
        [
          { value: 'gauss', label: 'gaussiennes (η* = sigm(2x))' },
          { value: 'pc8', label: 'uniformes (PC8 Ex. 5)' },
        ],
        loi,
        (v) => ((loi = v), draw()),
      ),
      segmented<Err>(
        [
          { value: 'decalage', label: 'décalage' },
          { value: 'logit', label: 'biais du logit' },
          { value: 'bruit', label: 'bruit' },
        ],
        err,
        (v) => ((err = v), draw()),
      ),
      slider({ label: 'erreur $\\delta$', min: -1, max: 1, step: 0.01, value: delta, format: (v) => v.toFixed(2), onChange: (v) => ((delta = v), draw()) }).root,
    )
    draw()
    return () => {
      hL.destroy()
      hR.destroy()
    }
  },
}
