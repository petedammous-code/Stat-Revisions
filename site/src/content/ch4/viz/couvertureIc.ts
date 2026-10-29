import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, hline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential, type Rng } from '../../../sim/rng'
import { normalQuantile, studentQuantile, chi2Quantile } from '../../../sim/stats'

type Model = 'gauss' | 'exp'
type Method = 'z' | 'student' | 'naif' | 'chi2' | 'asymp'

const METHODS: Record<Model, { value: Method; label: string }[]> = {
  gauss: [
    { value: 'z', label: '$\\sigma$ connu ($z$)' },
    { value: 'student', label: 'Student exact' },
    { value: 'naif', label: '$S_n$ + quantile $z$' },
  ],
  exp: [
    { value: 'chi2', label: 'Pivot $\\chi^2(2n)$ exact' },
    { value: 'asymp', label: 'Asymptotique' },
  ],
}

/** Paramètres fixés de la simulation. */
const MU = 1
const SIGMA = 1
const THETA = 2 // espérance de l'exponentielle (PC4 Ex. 1 : modèle E(1/θ))

interface Quantiles {
  z: number
  t: number
  cLo: number
  cHi: number
}

function quantiles(n: number, level: number): Quantiles {
  const a = 1 - level
  return {
    z: normalQuantile(1 - a / 2),
    t: studentQuantile(1 - a / 2, n - 1),
    cLo: chi2Quantile(a / 2, 2 * n),
    cHi: chi2Quantile(1 - a / 2, 2 * n),
  }
}

function interval(xs: number[], model: Model, method: Method, q: Quantiles): [number, number] {
  const n = xs.length
  let s = 0
  for (const x of xs) s += x
  const m = s / n
  if (model === 'gauss') {
    if (method === 'z') {
      const h = (q.z * SIGMA) / Math.sqrt(n)
      return [m - h, m + h]
    }
    let ss = 0
    for (const x of xs) ss += (x - m) * (x - m)
    const sn = Math.sqrt(ss / (n - 1))
    const k = method === 'student' ? q.t : q.z
    return [m - (k * sn) / Math.sqrt(n), m + (k * sn) / Math.sqrt(n)]
  }
  if (method === 'chi2') {
    // 2θ^{-1} ΣX_i ~ χ²(2n) : IC [2ΣX/χ²_{1-α/2}(2n), 2ΣX/χ²_{α/2}(2n)]
    return [(2 * s) / q.cHi, (2 * s) / q.cLo]
  }
  // asymptotique (ch.6) : X̄_n ± z_{1-α/2} X̄_n/√n (variance θ² estimée par X̄_n²)
  const h = (q.z * m) / Math.sqrt(n)
  return [m - h, m + h]
}

function drawSample(rng: Rng, n: number, model: Model): number[] {
  const xs = new Array<number>(n)
  for (let i = 0; i < n; i++) xs[i] = model === 'gauss' ? normal(rng, MU, SIGMA) : exponential(rng, 1 / THETA)
  return xs
}

/** Cent intervalles de confiance simulés ; comptage de ceux qui contiennent le paramètre ; exact vs asymptotique. */
export const vizCouvertureIc: Viz = {
  id: 'ch4-couverture-ic',
  title: 'Cent intervalles de confiance : qui est aléatoire ?',
  description:
    'Interprétation fréquentiste du niveau de couverture (Poly ch.4, « Qui est aléatoire ? », figure p. 10) : on répète l’expérience pour une **même** valeur du paramètre et on trace les cent intervalles $\\mathcal{C}(Z^{(1)}),\\dots,\\mathcal{C}(Z^{(100)})$ (verts s’ils contiennent le paramètre, rouges sinon). **Modèle gaussien** ($\\mu=1$, $\\sigma=1$) : pivot $\\sqrt n(\\bar X_n-\\mu)/\\sigma\\sim\\mathcal{N}(0,1)$ (Ex. 1.4), pivot de Student (Ex. 1.5) ou remplacement *naïf* de $\\sigma$ par $S_n$ en gardant $z_{1-\\alpha/2}$ (intervalle seulement asymptotique). **Modèle exponentiel** d’espérance $\\theta=2$ (PC4 Ex. 1) : pivot exact $2\\theta^{-1}\\sum_iX_i\\sim\\chi^2(2n)$ ou intervalle asymptotique $\\bar X_n(1\\pm z_{1-\\alpha/2}/\\sqrt n)$. Curseurs $n$ et $1-\\alpha$ ; la couverture est aussi estimée sur 2000 répétitions.',
  source: 'Poly ch.4, Déf. 1.1, Ex. 1.4, Ex. 1.5 ; PC4 Ex. 1 Q3',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let n = 10
    let level = 0.9
    let model: Model = 'gauss'
    let method: Method = 'student'
    let seed = 7
    const handle = plot(plotEl, [], {})

    const methodCtl = segmented<Method>(METHODS.gauss, method, (v) => {
      method = v
      draw()
    })
    const methodWrap = document.createElement('div')
    methodWrap.append(methodCtl)

    const rebuildMethods = () => {
      method = METHODS[model][0].value === 'z' ? 'student' : 'chi2'
      methodWrap.innerHTML = ''
      methodWrap.append(
        segmented<Method>(METHODS[model], method, (v) => {
          method = v
          draw()
        }),
      )
    }

    const draw = () => {
      const target = model === 'gauss' ? MU : THETA
      const rng = makeRng(4100 + seed)
      const q = quantiles(n, level)
      const xsOk: (number | null)[] = []
      const ysOk: (number | null)[] = []
      const xsKo: (number | null)[] = []
      const ysKo: (number | null)[] = []
      let covered = 0
      for (let k = 0; k < 100; k++) {
        const [a, b] = interval(drawSample(rng, n, model), model, method, q)
        const ok = a <= target && target <= b
        if (ok) covered++
        ;(ok ? xsOk : xsKo).push(k + 1, k + 1, null)
        ;(ok ? ysOk : ysKo).push(a, b, null)
      }
      const R = 2000
      let cov = 0
      let len = 0
      for (let r = 0; r < R; r++) {
        const [a, b] = interval(drawSample(rng, n, model), model, method, q)
        if (a <= target && target <= b) cov++
        len += b - a
      }
      const covFreq = cov / R
      const yr = model === 'gauss' ? [MU - 2.6, MU + 2.6] : [0, 3 * THETA + 1]
      handle.update(
        [
          { x: xsOk, y: ysOk, type: 'scatter', mode: 'lines', name: `contiennent le paramètre (${covered})`, line: { color: COLORS.green, width: 2 } },
          { x: xsKo, y: ysKo, type: 'scatter', mode: 'lines', name: `le ratent (${100 - covered})`, line: { color: COLORS.red, width: 2.5 } },
        ],
        {
          title: { text: `100 répétitions, n = ${n}, niveau nominal ${(100 * level).toFixed(0)} %` },
          xaxis: { title: { text: 'répétition n°' } },
          yaxis: { title: { text: model === 'gauss' ? 'intervalle pour μ' : 'intervalle pour θ' }, range: yr },
          shapes: [hline(target, COLORS.gray, 'dash')],
        },
      )
      const names: Record<Method, string> = {
        z: '$[\\bar X_n\\pm z_{1-\\alpha/2}\\sigma/\\sqrt n]$ (Ex. 1.4, niveau exact)',
        student: '$[\\bar X_n\\pm S_n\\mathrm{t}^{(n-1)}_{1-\\alpha/2}/\\sqrt n]$ (Ex. 1.5, niveau exact)',
        naif: '$[\\bar X_n\\pm z_{1-\\alpha/2}S_n/\\sqrt n]$ (remplacement naïf, niveau seulement asymptotique)',
        chi2: '$[2\\sum_iX_i/\\chi^2_{1-\\alpha/2}(2n),\\ 2\\sum_iX_i/\\chi^2_{\\alpha/2}(2n)]$ (PC4 Ex. 1, niveau exact)',
        asymp: '$[\\bar X_n(1\\pm z_{1-\\alpha/2}/\\sqrt n)]$ (ch.6, niveau asymptotique)',
      }
      let comment = ''
      if (method === 'naif' && n <= 20)
        comment = ' Pour $n$ petit, l’intervalle naïf est **trop court** : remplacer $\\sigma$ par $S_n$ ajoute de l’aléa, il faut le quantile de Student, plus grand (Ex. 1.5).'
      if (method === 'asymp' && n <= 20) comment = ' Pour $n$ petit, la couverture de l’intervalle asymptotique s’écarte du niveau visé ; le pivot $\\chi^2(2n)$ donne, lui, une couverture exacte pour tout $n$.'
      if (method === 'student' || method === 'chi2' || method === 'z')
        comment = ' Le pivot a une loi connue et indépendante du paramètre : la couverture vaut **exactement** $1-\\alpha$ pour tout $n$ (Prop. 1.1) ; l’écart observé n’est que du bruit de simulation.'
      info.innerHTML = richToHtml(
        `**Intervalle :** ${names[method]}. Sur les 100 intervalles tracés, **${covered}** contiennent ${model === 'gauss' ? '$\\mu=1$' : '$\\theta=2$'} (on attend environ $100(1-\\alpha)=${(100 * level).toFixed(0)}$). Sur ${R} répétitions : couverture **${(100 * covFreq).toFixed(1)} %**, longueur moyenne ${(len / R).toFixed(3)}.${comment} Le paramètre est fixe (ligne grise) ; ce sont les intervalles qui bougent d’un tirage à l’autre.`,
      )
    }

    controls.append(
      segmented<Model>(
        [
          { value: 'gauss', label: 'Gaussien' },
          { value: 'exp', label: 'Exponentiel' },
        ],
        model,
        (v) => {
          model = v
          rebuildMethods()
          draw()
        },
      ),
    )
    controls.append(methodWrap)
    controls.append(
      slider({
        label: '$n$',
        min: Math.log10(3),
        max: Math.log10(300),
        step: 0.02,
        value: Math.log10(n),
        log: true,
        integer: true,
        format: (v) => String(v),
        onChange: (v) => {
          n = Math.max(3, v)
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$1-\\alpha$',
        min: 0.5,
        max: 0.99,
        step: 0.01,
        value: level,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          level = v
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer 100 échantillons', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
