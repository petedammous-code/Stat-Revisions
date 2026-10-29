import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, cauchy } from '../../../sim/rng'
import { linspace } from '../../../sim/stats'
import { fr } from './common'

type Mode = 'gauss-mc' | 'cauchy-mv' | 'cauchy-mc'

const THETA_STAR = 2
const NMAX = 1000

/** « Deux courbes » : critère empirique θ ↦ M̂n(θ) contre critère limite θ ↦ M_{θ⋆}(θ), et leurs points de maximum. */
export const vizCriteresEmpiriques: Viz = {
  id: 'ch7-criteres-empiriques',
  title: 'Critère empirique et critère limite : convergence uniforme et argmax',
  description:
    'On trace $\\theta\\mapsto\\widehat{M}_n(\\theta)=\\frac1n\\sum_i m(\\theta,X_i)$ (noir) et la fonction limite $\\theta\\mapsto\\mathsf{M}_{\\theta^\\star}(\\theta)=\\mathbb{E}_{\\theta^\\star}[m(\\theta,X_1)]$ (bleu), $\\theta^\\star=2$, avec leurs points de maximum (rouge). Curseur $n$ : les $n$ premières observations d’un même échantillon. Trois réglages : moindres carrés sous $\\mathcal{N}(\\theta,1)$ (Figure 1 du poly), log-vraisemblance de Cauchy (EMV), et moindres carrés sous Cauchy, où la domination échoue.',
  source: 'Poly ch.7, introduction p. 7–8, Ex. 1.1, 1.3 et 1.5, Thm 1.1–1.2',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let mode: Mode = 'gauss-mc'
    let n = 20
    let seed = 1
    let sample: number[] = []
    const handle = plot(plotEl, [], {})
    const grid = linspace(-2, 6, 401)

    const regen = () => {
      const rng = makeRng(7000 + seed)
      sample = new Array<number>(NMAX)
      for (let i = 0; i < NMAX; i++) sample[i] = mode === 'gauss-mc' ? normal(rng, THETA_STAR, 1) : cauchy(rng, THETA_STAR, 1)
    }

    const mFn = (t: number, x: number): number => {
      if (mode === 'cauchy-mv') return -Math.log(Math.PI) - Math.log(1 + (x - t) * (x - t))
      return -0.5 * (x - t) * (x - t)
    }
    const limit = (t: number): number => {
      if (mode === 'gauss-mc') return -0.5 * (1 + (THETA_STAR - t) * (THETA_STAR - t))
      if (mode === 'cauchy-mv') return -Math.log(Math.PI) - Math.log(4 + (t - THETA_STAR) * (t - THETA_STAR))
      return NaN
    }

    const draw = () => {
      const xs = sample.slice(0, n)
      const mn = grid.map((t) => {
        let s = 0
        for (const x of xs) s += mFn(t, x)
        return s / n
      })
      let iMax = 0
      for (let i = 1; i < grid.length; i++) if (mn[i] > mn[iMax]) iMax = i
      let thetaHat = grid[iMax]
      if (mode !== 'cauchy-mv') {
        let s = 0
        for (const x of xs) s += x
        thetaHat = s / n
      }
      const mHatAt = (() => {
        let s = 0
        for (const x of xs) s += mFn(thetaHat, x)
        return s / n
      })()
      const traces: Record<string, unknown>[] = []
      const shapes: Record<string, unknown>[] = [vline(THETA_STAR, COLORS.blue, 'dot')]
      let supGap = NaN
      if (mode !== 'cauchy-mc') {
        const lim = grid.map(limit)
        supGap = Math.max(...grid.map((_, i) => Math.abs(mn[i] - lim[i])))
        traces.push(lineTrace(grid, lim, 'M_θ⋆(θ) (limite)', COLORS.blue, { line: { color: COLORS.blue, width: 3.5 } }))
        traces.push(pointsTrace([THETA_STAR], [limit(THETA_STAR)], 'maximum limite θ⋆', COLORS.blue, { marker: { color: COLORS.blue, size: 10, symbol: 'diamond' } }))
      }
      traces.push(lineTrace(grid, mn, `M̂ₙ(θ), n = ${n}`, '#111827', { line: { color: '#6b7280', width: 2 } }))
      if (thetaHat >= -2 && thetaHat <= 6) traces.push(pointsTrace([thetaHat], [mHatAt], 'maximum empirique θ̂ₙ', COLORS.red, { marker: { color: COLORS.red, size: 11 } }))
      shapes.push(vline(Math.max(-2, Math.min(6, thetaHat)), COLORS.red, 'dash'))
      const yLo = mode === 'cauchy-mv' ? -5 : mode === 'gauss-mc' ? -10 : Math.max(Math.min(...mn), -200)
      const yHi = mode === 'cauchy-mv' ? -2 : 0.5
      handle.update(traces, {
        title: mode === 'gauss-mc' ? 'Moindres carrés, N(θ⋆,1)' : mode === 'cauchy-mv' ? 'Log-vraisemblance de Cauchy (EMV)' : 'Moindres carrés sous Cauchy : pas de limite',
        xaxis: { title: 'θ', range: [-2, 6] },
        yaxis: { title: 'critère', range: [yLo, yHi] },
        shapes,
      })
      const err = Math.abs(thetaHat - THETA_STAR)
      if (mode === 'gauss-mc') {
        info.innerHTML = richToHtml(
          `**Moindres carrés** $m(\\theta,x)=-\\frac12(x-\\theta)^2$ (Ex. 1.3) : $\\mathsf{M}_{\\theta^\\star}(\\theta)=-\\frac12-\\frac12(\\theta^\\star-\\theta)^2$, maximum au seul point $\\theta^\\star=2$, et $\\hat\\theta_n=\\bar X_n=${fr(thetaHat)}$. Écart uniforme sur $[-2,6]$ : $\\sup_\\theta|\\widehat{M}_n(\\theta)-\\mathsf{M}_{\\theta^\\star}(\\theta)|=${fr(supGap)}$ ; erreur $|\\hat\\theta_n-\\theta^\\star|=${fr(err)}$. Sur un **compact**, l’écart uniforme est majoré par $|\\frac1n\\sum(X_i-\\theta^\\star)^2-1|+2\\,\\mathrm{diam}(\\Theta)|\\bar X_n-\\theta^\\star|$ (Ex. 1.5) et tend vers 0 : c’est (H-1) ; le pic est franc : (H-2). Le Thm 1.1 donne la consistance.`,
        )
      } else if (mode === 'cauchy-mv') {
        info.innerHTML = richToHtml(
          `**Log-vraisemblance de Cauchy** $m(\\theta,x)=\\log q_\\theta(x)=-\\log\\pi-\\log(1+(x-\\theta)^2)$ (Ex. 1.1 et 1.9). Ici $\\mathsf{M}_{\\theta^\\star}(\\theta)=-\\log\\pi-\\log(4+(\\theta-\\theta^\\star)^2)$, maximum $\\mathrm{Ent}(q_{\\theta^\\star})$ en $\\theta^\\star$ ; l’écart à ce maximum est $\\mathrm{KL}(q_{\\theta^\\star},q_\\theta)=\\log(1+(\\theta-\\theta^\\star)^2/4)$. EMV (maximum sur la grille) : $\\hat\\theta_n^{\\mathrm{MV}}\\approx${fr(thetaHat, 2)}$, écart uniforme $${fr(supGap)}$, erreur $${fr(err)}$. Sur un compact $K$, $\\sup_{\\theta\\in K}|\\log(1+(x-\\theta)^2)|$ croît comme $2\\log|x|$, fonction **intégrable** sous Cauchy : la domination du Cor. 1.1 est vérifiée. Pour $n$ petit, $\\widehat{M}_n$ peut avoir **plusieurs maxima locaux**.`,
        )
      } else {
        info.innerHTML = richToHtml(
          `**Hypothèse violée.** Sous Cauchy, $\\mathbb{E}_{\\theta^\\star}[(X_1-\\theta)^2]=+\\infty$ : $m(\\theta,x)=-\\frac12(x-\\theta)^2$ n’est pas intégrable, $\\mathsf{M}_{\\theta^\\star}\\equiv-\\infty$ et la Déf. 1.1 ne s’applique pas. La courbe empirique (noire) n’a pas de limite : son niveau plonge à chaque grande observation, et son maximum $\\bar X_n=${fr(thetaHat, 2)}$ ne se stabilise pas quand $n$ croît (la moyenne d’un échantillon de Cauchy suit encore une loi de Cauchy). Comparer avec le réglage « EMV de Cauchy », où le même échantillon donne un estimateur consistant.`,
        )
      }
    }

    controls.append(
      segmented<Mode>(
        [
          { value: 'gauss-mc', label: 'Moindres carrés, gaussien' },
          { value: 'cauchy-mv', label: 'EMV, Cauchy' },
          { value: 'cauchy-mc', label: 'Moindres carrés, Cauchy' },
        ],
        mode,
        (v) => {
          mode = v
          regen()
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$n$',
        min: 0,
        max: 3,
        step: 0.02,
        value: Math.log10(n),
        log: true,
        integer: true,
        onChange: (v) => {
          n = Math.max(1, Math.min(NMAX, v))
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
