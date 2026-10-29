import type { Viz } from '../../types'
import { vizFrame, slider, segmented } from '../../../core/ui'
import { plot, lineTrace, barTrace, vline, COLORS, hexToRgba } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { normalPdf, gammaPdf, binomialPmf, lgamma, linspace } from '../../../sim/stats'

type Family = 'gauss' | 'bern' | 'expoMoy' | 'expoInt' | 'geom' | 'unif'

interface FamilyDef {
  label: string
  /** bornes de θ' et pas */
  min: number
  max: number
  step: number
  init: number
  /** écart Δ = θ − θ' */
  dmin: number
  dmax: number
  dinit: number
  /** borne supérieure de θ (exclue) */
  cap?: number
  discrete: boolean
  /** log ψ(t;θ)/ψ(t;θ') */
  logRatio: (t: number, th: number, thp: number, n: number) => number
  /** loi de T sous θ : densité ou masse */
  law: (t: number, th: number, n: number) => number
  /** fenêtre de t */
  window: (th: number, thp: number, n: number) => [number, number]
  stat: string
  verdict: string
}

const negBinPmf = (k: number, n: number, th: number): number => Math.exp(lgamma(n + k) - lgamma(k + 1) - lgamma(n) + n * Math.log(th) + k * Math.log(1 - th))

const FAMILIES: Record<Family, FamilyDef> = {
  gauss: {
    label: 'N(θ,1)',
    min: -2, max: 2, step: 0.1, init: 0, dmin: 0.1, dmax: 2, dinit: 0.5,
    discrete: false,
    logRatio: (t, th, thp, n) => n * (th - thp) * t - (n / 2) * (th * th - thp * thp),
    law: (t, th, n) => normalPdf(t, th, 1 / Math.sqrt(n)),
    window: (th, thp, n) => [thp - 4 / Math.sqrt(n), th + 4 / Math.sqrt(n)],
    stat: '$T(z)=\\bar x_n$ (Ex. 1.4)',
    verdict: '**strictement croissant** (exponentielle d’une fonction affine de pente $n(\\theta-\\theta\')>0$) : on rejette $\\theta\\le\\theta_0$ quand $\\bar X_n$ est grand.',
  },
  bern: {
    label: 'Bernoulli',
    min: 0.05, max: 0.8, step: 0.05, init: 0.3, dmin: 0.05, dmax: 0.5, dinit: 0.2, cap: 0.95,
    discrete: true,
    logRatio: (t, th, thp, n) => n * Math.log((1 - th) / (1 - thp)) + t * Math.log((th * (1 - thp)) / (thp * (1 - th))),
    law: (t, th, n) => binomialPmf(t, n, th),
    window: (_th, _thp, n) => [0, n],
    stat: '$T(z)=\\sum_ix_i$ (Ex. 1.5)',
    verdict: '**strictement croissant** (la cote $\\theta/(1-\\theta)$ croît) — mais $T$ est **discrète** : le test U.P.P. est randomisé (Ex. 4.2).',
  },
  expoMoy: {
    label: 'Exp. de moyenne θ',
    min: 0.3, max: 3, step: 0.1, init: 1, dmin: 0.1, dmax: 3, dinit: 1,
    discrete: false,
    logRatio: (t, th, thp, n) => n * Math.log(thp / th) + t * (1 / thp - 1 / th),
    law: (t, th, n) => gammaPdf(t, n, 1 / th),
    window: (th, _thp, n) => [0, n * th + 4 * Math.sqrt(n) * th],
    stat: '$T(z)=\\sum_ix_i$, $p_\\theta(x)=\\theta^{-1}e^{-x/\\theta}$ (Exercice 1, PC5 Ex. 1)',
    verdict: '**strictement croissant** (pente $\\theta\'^{-1}-\\theta^{-1}>0$) : on rejette $\\theta\\le\\theta_0$ quand $\\sum_iX_i$ est grand.',
  },
  expoInt: {
    label: 'Exp. d’intensité θ',
    min: 0.3, max: 3, step: 0.1, init: 1, dmin: 0.1, dmax: 3, dinit: 1,
    discrete: false,
    logRatio: (t, th, thp, n) => n * Math.log(th / thp) - (th - thp) * t,
    law: (t, th, n) => gammaPdf(t, n, th),
    window: (_th, thp, n) => [0, n / thp + (4 * Math.sqrt(n)) / thp],
    stat: '$T(z)=\\sum_ix_i$, $p_\\theta(x)=\\theta e^{-\\theta x}$ (Examen 2025 Ex. 1)',
    verdict: '**strictement décroissant** (pente $-(\\theta-\\theta\')<0$, Déf. 1.5) : on rejette $\\theta\\le\\theta_0$ quand $\\sum_iX_i$ est **petit** (Th. 1.4).',
  },
  geom: {
    label: 'Géométrique',
    min: 0.1, max: 0.8, step: 0.05, init: 0.3, dmin: 0.05, dmax: 0.5, dinit: 0.2, cap: 0.95,
    discrete: true,
    logRatio: (t, th, thp, n) => n * Math.log(th / thp) + t * Math.log((1 - th) / (1 - thp)),
    law: (t, th, n) => negBinPmf(t, n, th),
    window: (_th, thp, n) => [0, Math.ceil((n * (1 - thp)) / thp + 4 * Math.sqrt((n * (1 - thp)) / (thp * thp)))],
    stat: '$T(z)=\\sum_iy_i$ (nombres d’échecs, Exercice 3, PC5 Ex. 6)',
    verdict: '**strictement décroissant** ($\\log(1-\\theta)<\\log(1-\\theta\')$) : grand $\\theta$ = peu d’échecs ; on rejette $\\theta\\le\\theta_0$ quand $T$ est **petit**, avec randomisation ($T$ entière).',
  },
  unif: {
    label: 'Uniforme U([0,θ])',
    min: 0.5, max: 3, step: 0.1, init: 1, dmin: 0.1, dmax: 2, dinit: 0.5,
    discrete: false,
    logRatio: (t, th, thp, n) => (t <= thp ? n * Math.log(thp / th) : Infinity),
    law: (t, th, n) => (t >= 0 && t <= th ? (n * Math.pow(t, n - 1)) / Math.pow(th, n) : 0),
    window: (th) => [0, th * 1.05],
    stat: '$T(z)=x_{n:n}=\\max_ix_i$ (Ex. 4.5, Exercice 7)',
    verdict: 'croissant **au sens large seulement** : constant $=(\\theta\'/\\theta)^n$ sur $[0,\\theta\']$, puis $+\\infty$ sur $]\\theta\',\\theta]$. La Déf. 1.4 n’est **pas** satisfaite ; le test U.P.P. existe mais n’est pas unique.',
  },
}

/** Familles à rapport de vraisemblance monotone : t ↦ ψ(t;θ)/ψ(t;θ') et loi de T sous θ' et θ. */
export const vizRvm: Viz = {
  id: 'ch5-rvm',
  title: 'Rapport de vraisemblance monotone : t ↦ ψ(t;θ)/ψ(t;θ′)',
  description:
    'Choisir une famille. À gauche : $\\log\\big(\\psi(t;\\theta)/\\psi(t;\\theta\')\\big)$ pour $\\theta>\\theta\'$ (factorisation (2) $p_\\theta(z)=h(z)\\psi(T(z);\\theta)$) ; diagnostic strictement croissant / décroissant / non strict. À droite : loi de la statistique $T$ sous $\\theta\'$ (bleu) et sous $\\theta$ (orange) : quand le rapport est croissant, $T$ « glisse vers la droite » quand $\\theta$ augmente (dominance stochastique, Lemme 2.1). Curseurs $\\theta\'$, $\\theta-\\theta\'$, $n$.',
  source: 'Poly ch.5, Déf. 1.4–1.5, Ex. 1.4–1.5, Lemme 2.1, Exercices 1, 3, 7, Ex. 4.5',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    let fam: Family = 'gauss'
    let thp = FAMILIES.gauss.init
    let delta = FAMILIES.gauss.dinit
    let n = 5

    const draw = () => {
      const F = FAMILIES[fam]
      let th = thp + delta
      if (F.cap !== undefined) th = Math.min(F.cap, th)
      const [a, b] = F.window(th, thp, n)
      const ts = F.discrete ? Array.from({ length: Math.floor(b - a) + 1 }, (_, i) => a + i) : linspace(a, b, 400)
      const lr = ts.map((t) => F.logRatio(t, th, thp, n))
      const finite = lr.map((v) => (Number.isFinite(v) ? v : null))
      const shapes: Record<string, unknown>[] = []
      const annotations: Record<string, unknown>[] = []
      if (fam === 'unif') {
        shapes.push({ type: 'rect', x0: thp, x1: th, y0: 0, y1: 1, yref: 'paper', fillcolor: hexToRgba(COLORS.red, 0.12), line: { width: 0 } })
        shapes.push(vline(thp, COLORS.red, 'dash'))
        annotations.push({ x: (thp + th) / 2, y: 0.9, yref: 'paper', text: 'rapport = +∞', showarrow: false, font: { color: COLORS.red } })
      }
      hLeft.update(
        [
          lineTrace(ts, finite as number[], 'log ψ(t;θ)/ψ(t;θ′)', COLORS.purple, F.discrete ? { mode: 'lines+markers', marker: { size: 6, color: COLORS.purple } } : { connectgaps: false }),
        ],
        {
          title: { text: `${F.label} : θ′ = ${thp.toFixed(2)}, θ = ${th.toFixed(2)}, n = ${n}` },
          xaxis: { title: { text: 't (valeur de T)' } },
          yaxis: { title: { text: 'log du rapport' } },
          shapes,
          annotations,
          showlegend: false,
        },
      )
      const lawP = ts.map((t) => F.law(t, thp, n))
      const lawQ = ts.map((t) => F.law(t, th, n))
      hRight.update(
        F.discrete
          ? [barTrace(ts, lawP, `loi de T sous θ′ = ${thp.toFixed(2)}`, COLORS.blue), barTrace(ts, lawQ, `loi de T sous θ = ${th.toFixed(2)}`, COLORS.orange)]
          : [lineTrace(ts, lawP, `loi de T sous θ′ = ${thp.toFixed(2)}`, COLORS.blue), lineTrace(ts, lawQ, `loi de T sous θ = ${th.toFixed(2)}`, COLORS.orange)],
        { title: { text: 'Loi de la statistique T' }, xaxis: { title: { text: 't' } }, yaxis: { title: { text: F.discrete ? 'probabilité' : 'densité' } }, barmode: 'overlay' },
      )
      info.innerHTML = richToHtml(
        `**${F.label}** — statistique ${F.stat}. Le rapport $t\\mapsto\\psi(t;\\theta)/\\psi(t;\\theta\')$ est ${F.verdict}

Lecture : $h(z)$ se simplifie dans tout rapport ; seule $T$ porte l’information sur $\\theta$. Dans une famille à rapport **strictement** monotone, $\\{p_{\\theta_1}>c\\,p_{\\theta_0}\\}=\\{T>d\\}$ (ou $\\{T<d\\}$) quel que soit $\\theta_1>\\theta_0$ : le seuil, fixé sous $\\theta_0$, ne dépend pas de $\\theta_1$ (Th. 1.3).`,
      )
    }

    const thpSlider = slider({ label: '$\\theta\'$', min: FAMILIES.gauss.min, max: FAMILIES.gauss.max, step: FAMILIES.gauss.step, value: thp, format: (v) => v.toFixed(2), onChange: (v) => { thp = v; draw() } })
    const dSlider = slider({ label: '$\\theta-\\theta\'$', min: FAMILIES.gauss.dmin, max: FAMILIES.gauss.dmax, step: 0.05, value: delta, format: (v) => v.toFixed(2), onChange: (v) => { delta = v; draw() } })
    controls.append(
      segmented<Family>(
        (Object.keys(FAMILIES) as Family[]).map((k) => ({ value: k, label: FAMILIES[k].label })),
        fam,
        (v) => {
          fam = v
          const F = FAMILIES[v]
          thpSlider.configure({ min: F.min, max: F.max, step: F.step, value: F.init })
          dSlider.configure({ min: F.dmin, max: F.dmax, value: F.dinit })
          thp = thpSlider.get()
          delta = dSlider.get()
          draw()
        },
      ),
    )
    controls.append(thpSlider.root, dSlider.root)
    controls.append(slider({ label: '$n$', min: 1, max: 30, step: 1, value: n, onChange: (v) => { n = v; draw() } }).root)
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
