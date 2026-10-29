import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, toggle } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, exponential, poisson, bernoulli, normal, type Rng } from '../../../sim/rng'
import { linspace, mean } from '../../../sim/stats'

type Model = 'exp' | 'poisson' | 'bern' | 'gauss'

interface Spec {
  label: string
  /** Nom du parametre et densite (LaTeX). */
  paramTex: string
  densTex: string
  ellTex: string
  emvTex: string
  min: number
  max: number
  step: number
  def: number
  draw: (rng: Rng, theta: number) => number
  /** log q_theta(x) */
  logq: (theta: number, x: number) => number
  /** grille de vartheta en fonction du vrai parametre */
  grid: (theta: number) => number[]
  /** EMV explicite (NaN si non defini) */
  emv: (xs: number[]) => number
}

function logFact(k: number): number {
  let s = 0
  for (let i = 2; i <= k; i++) s += Math.log(i)
  return s
}

const SPECS: Record<Model, Spec> = {
  exp: {
    label: 'Exponentielle E(θ)',
    paramTex: '\\theta',
    densTex: 'q_\\vartheta(x)=\\vartheta\\mathrm{e}^{-\\vartheta x}\\mathbb{1}_{\\mathbb{R}_+}(x)',
    ellTex: '\\ell_n(\\vartheta)=\\log\\vartheta-\\vartheta\\bar X_n',
    emvTex: '\\hat\\theta_n^{\\mathrm{MV}}=1/\\bar X_n',
    min: 0.2,
    max: 5,
    step: 0.1,
    def: 2,
    draw: (r, th) => exponential(r, th),
    logq: (th, x) => Math.log(th) - th * x,
    grid: (th) => linspace(0.02, 3 * th, 400),
    emv: (xs) => 1 / mean(xs),
  },
  poisson: {
    label: 'Poisson P(θ)',
    paramTex: '\\theta',
    densTex: 'q_\\vartheta(x)=\\mathrm{e}^{-\\vartheta}\\vartheta^x/x!',
    ellTex: '\\ell_n(\\vartheta)=-\\vartheta+\\bar X_n\\log\\vartheta-\\tfrac1n\\log\\prod_iX_i!',
    emvTex: '\\hat\\theta_n^{\\mathrm{MV}}=\\bar X_n\\ (\\text{si }\\bar X_n>0)',
    min: 0.2,
    max: 8,
    step: 0.1,
    def: 2,
    draw: (r, th) => poisson(r, th),
    logq: (th, x) => -th + x * Math.log(th) - logFact(x),
    grid: (th) => linspace(0.02, 3 * th, 400),
    emv: (xs) => {
      const m = mean(xs)
      return m > 0 ? m : NaN
    },
  },
  bern: {
    label: 'Bernoulli(p)',
    paramTex: 'p',
    densTex: 'q_\\vartheta(x)=\\vartheta^x(1-\\vartheta)^{1-x}',
    ellTex: '\\ell_n(\\vartheta)=\\bar X_n\\log\\vartheta+(1-\\bar X_n)\\log(1-\\vartheta)',
    emvTex: '\\hat p_n^{\\mathrm{MV}}=\\bar X_n',
    min: 0.05,
    max: 0.95,
    step: 0.01,
    def: 0.3,
    draw: (r, th) => bernoulli(r, th),
    logq: (th, x) => (x === 1 ? Math.log(th) : Math.log(1 - th)),
    grid: () => linspace(0.005, 0.995, 400),
    emv: (xs) => mean(xs),
  },
  gauss: {
    label: 'Gaussienne N(μ, 1)',
    paramTex: '\\mu',
    densTex: 'q_\\vartheta(x)=(2\\pi)^{-1/2}\\mathrm{e}^{-(x-\\vartheta)^2/2}',
    ellTex: '\\ell_n(\\vartheta)=-\\tfrac12\\log(2\\pi)-\\tfrac1{2n}\\sum_i(X_i-\\vartheta)^2',
    emvTex: '\\hat\\mu_n^{\\mathrm{MV}}=\\bar X_n',
    min: -3,
    max: 3,
    step: 0.1,
    def: 1,
    draw: (r, th) => normal(r, th, 1),
    logq: (th, x) => -0.5 * Math.log(2 * Math.PI) - 0.5 * (x - th) * (x - th),
    grid: (th) => linspace(th - 3, th + 3, 400),
    emv: (xs) => mean(xs),
  },
}

/** Log-vraisemblance normalisee d'un echantillon tire, avec l'EMV ; le pic se resserre avec n. */
export const vizLogVraisemblance: Viz = {
  id: 'ch2-log-vraisemblance',
  title: 'Vraisemblance et log-vraisemblance ℓₙ(ϑ) d’un échantillon tiré',
  description:
    'On tire un $n$-échantillon sous la vraie valeur du paramètre (trait rouge) et on trace $\\vartheta\\mapsto\\ell_n(\\vartheta)=\\frac1n\\sum_i\\log q_\\vartheta(X_i)$ (ou la vraisemblance normalisée $\\mathrm{L}_n(\\vartheta)/\\max\\mathrm{L}_n$). Le point de maximum (trait bleu) est l’EMV : il bouge d’un tirage à l’autre et se rapproche de la vraie valeur quand $n$ augmente, tandis que le pic de $\\mathrm{L}_n$ se resserre. Choix du modèle, curseurs $n$ et paramètre, bouton « Tirer ».',
  source: 'Poly ch.2, Déf. 1.4–1.5, Ex. 1.7–1.10 ; §1.4 (convergence de ℓₙ)',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let model: Model = 'exp'
    let theta = SPECS[model].def
    let n = 20
    let showL = false
    let seed = 1
    const handle = plot(plotEl, [], {})
    let thetaSlider: ReturnType<typeof slider> | null = null

    const draw = () => {
      const spec = SPECS[model]
      const rng = makeRng(100 + seed)
      const xs = new Array<number>(n)
      for (let i = 0; i < n; i++) xs[i] = spec.draw(rng, theta)
      const grid = spec.grid(theta)
      const ell = grid.map((v) => {
        let s = 0
        for (const x of xs) s += spec.logq(v, x)
        return s / n
      })
      const emv = spec.emv(xs)
      let iMax = 0
      for (let i = 1; i < ell.length; i++) if (ell[i] > ell[iMax]) iMax = i
      const ellMax = ell[iMax]
      const traces: Record<string, unknown>[] = []
      let yTitle: string
      let yRange: [number, number] | undefined
      if (showL) {
        const L = ell.map((e) => Math.exp(n * (e - ellMax)))
        traces.push(lineTrace(grid, L, 'Lₙ(ϑ) / max Lₙ', COLORS.blue))
        yTitle = 'Lₙ(ϑ) / max Lₙ'
        yRange = [0, 1.08]
      } else {
        const finite = ell.filter((e) => Number.isFinite(e))
        const lo = Math.max(Math.min(...finite), ellMax - 4)
        traces.push(lineTrace(grid, ell.map((e) => (e < lo - 0.5 ? lo - 0.5 : e)), 'ℓₙ(ϑ)', COLORS.blue))
        yTitle = 'ℓₙ(ϑ)'
        yRange = [lo - 0.5, ellMax + 0.3]
      }
      if (Number.isFinite(emv)) traces.push(pointsTrace([emv], [showL ? 1 : ellMax], 'EMV', COLORS.blue, { marker: { color: COLORS.blue, size: 10, symbol: 'diamond' } }))
      const shapes = [vline(theta, COLORS.red, 'dash')]
      if (Number.isFinite(emv)) shapes.push(vline(emv, COLORS.blue, 'dot'))
      handle.update(traces, {
        title: `${spec.label}, n = ${n} : ${showL ? 'vraisemblance normalisée' : 'log-vraisemblance normalisée'}`,
        xaxis: { title: 'ϑ', range: [grid[0], grid[grid.length - 1]] },
        yaxis: { title: yTitle, range: yRange },
        shapes,
        showlegend: false,
      })
      const emvTxt = Number.isFinite(emv)
        ? `EMV observé : $${emv.toFixed(3)}$ (vraie valeur $${spec.paramTex}=${theta}$, écart $${(emv - theta).toFixed(3)}$).`
        : `**EMV non défini** pour cet échantillon : toutes les observations sont nulles ($\\bar X_n=0$, probabilité $\\mathrm{e}^{-n\\theta}=${Math.exp(-n * theta).toExponential(2)}$) et $\\vartheta\\mapsto-\\vartheta$ n’a pas de maximum sur $\\mathbb{R}_+^\\ast$ (Ex. 1.9).`
      info.innerHTML = richToHtml(
        `**Modèle** : $${spec.densTex}$ ; **log-vraisemblance normalisée** (Déf. 1.5) : $${spec.ellTex}$ ; EMV (Méthode 1.2) : $${spec.emvTex}$. ${emvTxt} ${
          showL
            ? 'La vraisemblance est tracée **divisée par son maximum** (sinon elle est de l’ordre de $\\mathrm{e}^{n\\ell_n}$, inexploitable) : $\\mathrm{L}_n$ et $\\ell_n$ ont le **même argmax** (log strictement croissant). Le pic se resserre comme $1/\\sqrt n$.'
            : 'Pour chaque $\\vartheta$ fixé, $\\ell_n(\\vartheta)$ est une **moyenne empirique** : elle converge (LGN) vers $M_{\\theta^\\star}(\\vartheta)$, maximale en $\\theta^\\star$ (Prop. 1.3) : c’est l’heuristique de consistance de l’EMV.'
        }${model === 'bern' && (mean(xs) === 0 || mean(xs) === 1) ? ' Ici $S_n\\in\\{0,n\\}$ : le maximum est **au bord** de $[0,1]$ et le log n’y est pas défini (Ex. 1.8).' : ''}`,
      )
    }

    const rebuildTheta = () => {
      const spec = SPECS[model]
      const s = slider({
        label: `$${spec.paramTex}$ (vraie valeur)`,
        min: spec.min,
        max: spec.max,
        step: spec.step,
        value: theta,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          theta = v
          draw()
        },
      })
      if (thetaSlider) controls.replaceChild(s.root, thetaSlider.root)
      else controls.append(s.root)
      thetaSlider = s
    }

    controls.append(
      segmented<Model>(
        [
          { value: 'exp', label: 'Exponentielle' },
          { value: 'poisson', label: 'Poisson' },
          { value: 'bern', label: 'Bernoulli' },
          { value: 'gauss', label: 'Gaussienne' },
        ],
        model,
        (v) => {
          model = v
          theta = SPECS[model].def
          rebuildTheta()
          draw()
        },
      ),
    )
    rebuildTheta()
    controls.append(
      slider({
        label: '$n$',
        min: 0,
        max: 3,
        step: 0.05,
        value: Math.log10(n),
        log: true,
        format: (v) => String(Math.round(v)),
        onChange: (v) => {
          n = Math.max(1, Math.round(v))
          draw()
        },
      }).root,
    )
    controls.append(
      toggle('afficher $\\mathrm{L}_n(\\vartheta)/\\max\\mathrm{L}_n$ au lieu de $\\ell_n$', showL, (v) => {
        showL = v
        draw()
      }),
    )
    controls.append(
      button('Tirer un échantillon', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
