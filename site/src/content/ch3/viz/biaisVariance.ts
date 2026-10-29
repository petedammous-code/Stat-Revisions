import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, barTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, uniform, type Rng } from '../../../sim/rng'
import { histogram, linspace } from '../../../sim/stats'

type Fam = 'var' | 'unif' | 'shrink'

interface FamSpec {
  label: string
  coefTex: string
  coefMin: number
  coefMax: number
  coefDefault: number
  thetaMin: number
  thetaMax: number
  thetaDefault: number
  thetaTex: string
  /** Une réalisation de l'estimateur (coefficient c, paramètre θ, taille n). */
  sample: (r: Rng, c: number, theta: number, n: number) => number
  target: (theta: number) => number
  /** Biais et variance théoriques. */
  bias: (c: number, theta: number, n: number) => number
  vari: (c: number, theta: number, n: number) => number
  /** Coefficients remarquables à marquer sur la courbe. */
  marks: (n: number, theta: number) => { c: number; name: string }[]
}

const FAMS: Record<Fam, FamSpec> = {
  var: {
    label: 'c·S²ₙ (gaussien)',
    coefTex: 'c',
    coefMin: 0.5,
    coefMax: 1.5,
    coefDefault: 1,
    thetaMin: 0.25,
    thetaMax: 4,
    thetaDefault: 1,
    thetaTex: '\\sigma^2',
    sample: (r, c, s2, n) => {
      const s = Math.sqrt(s2)
      let a = 0
      let b = 0
      for (let i = 0; i < n; i++) {
        const x = normal(r, 0, s)
        a += x
        b += x * x
      }
      return (c * (b - (a * a) / n)) / (n - 1)
    },
    target: (s2) => s2,
    bias: (c, s2) => (c - 1) * s2,
    vari: (c, s2, n) => (c * c * 2 * s2 * s2) / (n - 1),
    marks: (n) => [
      { c: 1, name: 'S²ₙ (sans biais)' },
      { c: (n - 1) / n, name: 'σ̂²ₙ (EMV)' },
      { c: (n - 1) / (n + 1), name: 'optimum (n−1)/(n+1)' },
    ],
  },
  unif: {
    label: 'a·X(n:n) (uniforme)',
    coefTex: 'a',
    coefMin: 0.8,
    coefMax: 1.4,
    coefDefault: 1,
    thetaMin: 0.25,
    thetaMax: 4,
    thetaDefault: 1,
    thetaTex: '\\theta',
    sample: (r, a, th, n) => {
      let mx = 0
      for (let i = 0; i < n; i++) mx = Math.max(mx, uniform(r, 0, th))
      return a * mx
    },
    target: (th) => th,
    bias: (a, th, n) => th * ((a * n) / (n + 1) - 1),
    vari: (a, th, n) => (a * a * th * th * n) / ((n + 1) * (n + 1) * (n + 2)),
    marks: (n) => [
      { c: 1, name: 'X(n:n) (EMV)' },
      { c: (n + 1) / n, name: '(n+1)/n (sans biais)' },
      { c: (n + 2) / (n + 1), name: 'a⋆ = (n+2)/(n+1)' },
    ],
  },
  shrink: {
    label: 'γ·X̄ₙ (rétrécissement)',
    coefTex: '\\gamma',
    coefMin: 0,
    coefMax: 1.2,
    coefDefault: 1,
    thetaMin: -2,
    thetaMax: 2,
    thetaDefault: 0.5,
    thetaTex: '\\theta',
    sample: (r, g, th, n) => {
      let a = 0
      for (let i = 0; i < n; i++) a += normal(r, th, 1)
      return (g * a) / n
    },
    target: (th) => th,
    bias: (g, th) => (g - 1) * th,
    vari: (g, _th, n) => (g * g) / n,
    marks: (n, th) => [
      { c: 1, name: 'X̄ₙ (sans biais)' },
      { c: (th * th) / (th * th + 1 / n), name: 'optimum θ²/(θ²+1/n) (dépend de θ)' },
    ],
  },
}

/** Prop. 1.1 : biais² + variance = risque, vérifié sur simulations répétées, pour trois familles d'estimateurs à un coefficient. */
export const vizBiaisVariance: Viz = {
  id: 'ch3-biais-variance',
  title: 'Biais² + variance = risque quadratique, en direct',
  description:
    'Trois familles à un coefficient : $c\\,S_n^2$ pour $\\sigma^2$ en gaussien (Ex. 1.8), $aX_{n:n}$ pour $\\theta$ en uniforme (Ex. 1.9, PC3 Ex. 1), $\\gamma\\bar X_n$ pour $\\theta$ dans $\\mathcal{N}(\\theta,1)$ (rétrécissement). À gauche : histogramme de $2000$ réalisations de l’estimateur, cible $g(\\theta)$ (rouge) et moyenne empirique (bleu). À droite : courbes théoriques biais², variance et risque en fonction du coefficient, et les valeurs empiriques au coefficient choisi. Curseurs $n$, paramètre, coefficient ; bouton « Tirer ».',
  source: 'Poly ch.3, Prop. 1.1, Ex. 1.8, Ex. 1.9 et rétrécissement p. 13 / éq. (17)',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let fam: Fam = 'var'
    let n = 10
    let theta = FAMS[fam].thetaDefault
    let coef = FAMS[fam].coefDefault
    let seed = 1
    const M = 2000
    const hHist = plot(plots[0], [], {})
    const hCurve = plot(plots[1], [], {})

    const draw = () => {
      const spec = FAMS[fam]
      const rng = makeRng(7 + 977 * seed)
      const vals = new Array<number>(M)
      for (let k = 0; k < M; k++) vals[k] = spec.sample(rng, coef, theta, n)
      const target = spec.target(theta)
      const mean = vals.reduce((a, x) => a + x, 0) / M
      const varEmp = vals.reduce((a, x) => a + (x - mean) * (x - mean), 0) / M
      const biasEmp = mean - target
      const riskEmp = vals.reduce((a, x) => a + (x - target) * (x - target), 0) / M
      const bT = spec.bias(coef, theta, n)
      const vT = spec.vari(coef, theta, n)
      // histogramme
      const lo = Math.min(...vals)
      const hi = Math.max(...vals)
      const pad = 0.05 * (hi - lo + 1e-9)
      const h = histogram(vals, 40, Math.min(lo, target) - pad, Math.max(hi, target) + pad)
      hHist.update([barTrace(h.centers, h.density, 'estimateur', COLORS.blue, { width: h.width })], {
        title: `${M} réalisations, n = ${n}`,
        xaxis: { title: 'valeur de l’estimateur' },
        yaxis: { title: 'densité' },
        showlegend: false,
        shapes: [vline(target, COLORS.red, 'solid'), vline(mean, COLORS.blue, 'dash')],
      })
      // courbes en fonction du coefficient
      const cs = linspace(spec.coefMin, spec.coefMax, 200)
      const b2 = cs.map((c) => spec.bias(c, theta, n) ** 2)
      const vv = cs.map((c) => spec.vari(c, theta, n))
      const rr = cs.map((_, i) => b2[i] + vv[i])
      const marks = spec.marks(n, theta).filter((mk) => mk.c >= spec.coefMin && mk.c <= spec.coefMax)
      hCurve.update(
        [
          lineTrace(cs, b2, 'biais² (théorie)', COLORS.orange),
          lineTrace(cs, vv, 'variance (théorie)', COLORS.green),
          lineTrace(cs, rr, 'risque = biais² + variance', COLORS.purple, { line: { color: COLORS.purple, width: 3 } }),
          pointsTrace([coef, coef, coef], [biasEmp * biasEmp, varEmp, riskEmp], 'valeurs empiriques', COLORS.red, { marker: { color: [COLORS.orange, COLORS.green, COLORS.purple], size: 11, symbol: 'circle-open', line: { width: 3 } } }),
          pointsTrace(
            marks.map((mk) => mk.c),
            marks.map((mk) => spec.bias(mk.c, theta, n) ** 2 + spec.vari(mk.c, theta, n)),
            'coefficients remarquables',
            COLORS.gray,
            { marker: { color: COLORS.gray, size: 9, symbol: 'diamond' }, text: marks.map((mk) => mk.name), hoverinfo: 'text+y' },
          ),
        ],
        { title: 'Décomposition en fonction du coefficient', xaxis: { title: 'coefficient' }, yaxis: { title: 'risque', rangemode: 'tozero' }, shapes: [vline(coef, COLORS.red, 'dot')] },
      )
      const f = (x: number) => (Math.abs(x) < 1e-3 && x !== 0 ? x.toExponential(2) : x.toFixed(4))
      const comment: Record<Fam, string> = {
        var: `En gaussien, $\\mathrm{Var}(c\\,S_n^2)=2c^2\\sigma^4/(n-1)$ (Gosset). Le risque est minimal en $c=\\frac{n-1}{n+1}$, **indépendamment de** $\\sigma^2$ : $\\frac1{n+1}\\sum_i(X_i-\\bar X_n)^2$ domine $\\hat\\sigma_n^2$, qui domine $S_n^2$ (Ex. 1.8).`,
        unif: `Risque $\\theta^2\\{\\frac{na^2}{n+2}-\\frac{2an}{n+1}+1\\}$, minimal en $a_\\star=\\frac{n+2}{n+1}$ **quel que soit** $\\theta$ : $\\frac{n+1}nX_{n:n}$ (sans biais) est inadmissible (PC3 Ex. 1 Q5).`,
        shrink: `Rétrécissement : biais $(\\gamma-1)\\theta$, variance $\\gamma^2/n$. Le $\\gamma$ optimal $\\frac{\\theta^2}{\\theta^2+1/n}$ **dépend de** $\\theta$ (inconnu) : pour $\\theta$ proche de $0$, rétrécir aide beaucoup ; pour $|\\theta|$ grand, le biais l’emporte (compléments, seuil $\\gamma_{\\min}(\\theta)$).`,
      }
      info.innerHTML = richToHtml(
        `Famille ${spec.label}, $${spec.coefTex}=${coef.toFixed(3)}$, $${spec.thetaTex}=${theta.toFixed(2)}$, $n=${n}$. **Empirique** ($${M}$ répétitions) : biais ${f(biasEmp)}, biais² ${f(biasEmp * biasEmp)} + variance ${f(varEmp)} = ${f(biasEmp * biasEmp + varEmp)} et risque $\\frac1M\\sum(T-g(\\theta))^2$ = ${f(riskEmp)} (l’identité est exacte sur l’échantillon : c’est la Prop. 1.1 appliquée à la loi empirique). **Théorie** : biais ${f(bT)}, variance ${f(vT)}, risque ${f(bT * bT + vT)}.

Losanges gris (coefficients remarquables) : ${marks.map((mk) => `${mk.name} en ${mk.c.toFixed(3)}, risque ${f(spec.bias(mk.c, theta, n) ** 2 + spec.vari(mk.c, theta, n))}`).join(' ; ')}.

${comment[fam]}`,
      )
    }

    const sN = slider({
      label: '$n$',
      min: 2,
      max: 60,
      step: 1,
      value: n,
      onChange: (v) => {
        n = Math.round(v)
        draw()
      },
    })
    const sTheta = slider({
      label: 'paramètre $\\sigma^2$',
      min: FAMS[fam].thetaMin,
      max: FAMS[fam].thetaMax,
      step: 0.05,
      value: theta,
      onChange: (v) => {
        theta = v
        draw()
      },
    })
    const sCoef = slider({
      label: 'coefficient $c$',
      min: FAMS[fam].coefMin,
      max: FAMS[fam].coefMax,
      step: 0.005,
      value: coef,
      onChange: (v) => {
        coef = v
        draw()
      },
    })
    controls.append(
      segmented<Fam>(
        [
          { value: 'var', label: '$c\\,S_n^2$ (gaussien)' },
          { value: 'unif', label: '$a\\,X_{n:n}$ (uniforme)' },
          { value: 'shrink', label: '$\\gamma\\,\\bar X_n$ (rétrécissement)' },
        ],
        fam,
        (v) => {
          fam = v
          const s = FAMS[v]
          theta = s.thetaDefault
          coef = s.coefDefault
          sTheta.configure({ min: s.thetaMin, max: s.thetaMax, label: `paramètre $${s.thetaTex}$`, value: theta })
          sCoef.configure({ min: s.coefMin, max: s.coefMax, label: `coefficient $${s.coefTex}$`, value: coef })
          draw()
        },
      ),
    )
    controls.append(sN.root, sTheta.root, sCoef.root)
    controls.append(
      button('Tirer', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => {
      hHist.destroy()
      hCurve.destroy()
    }
  },
}
