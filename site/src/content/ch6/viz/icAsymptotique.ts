import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, hline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential, bernoulli, type Rng } from '../../../sim/rng'
import { normalQuantile, studentQuantile } from '../../../sim/stats'

type Law = 'gauss' | 'exp' | 'bern'
type Method = 'known' | 'slutsky' | 'student'

const LAWS: Record<Law, { label: string; tex: string; mu: number; sigma: number; draw: (r: Rng) => number }> = {
  gauss: { label: 'N(1, 1)', tex: '\\mathcal{N}(1,1)', mu: 1, sigma: 1, draw: (r) => normal(r, 1, 1) },
  exp: { label: 'E(1)', tex: '\\mathcal{E}(1)', mu: 1, sigma: 1, draw: (r) => exponential(r, 1) },
  bern: { label: 'Bernoulli(0,1)', tex: '\\mathcal{B}\\mathrm{er}(0{,}1)', mu: 0.1, sigma: Math.sqrt(0.09), draw: (r) => bernoulli(r, 0.1) },
}

function interval(xs: number[], method: Method, sigma: number, level: number): [number, number] {
  const n = xs.length
  let s = 0
  for (const x of xs) s += x
  const m = s / n
  if (method === 'known') {
    const z = normalQuantile(1 - (1 - level) / 2)
    return [m - (z * sigma) / Math.sqrt(n), m + (z * sigma) / Math.sqrt(n)]
  }
  let ss = 0
  for (const x of xs) ss += (x - m) * (x - m)
  const sn = Math.sqrt(ss / (n - 1))
  const q = method === 'student' ? studentQuantile(1 - (1 - level) / 2, n - 1) : normalQuantile(1 - (1 - level) / 2)
  return [m - (q * sn) / Math.sqrt(n), m + (q * sn) / Math.sqrt(n)]
}

/** 100 intervalles de confiance simules ; couverture empirique ; exact (Student) vs asymptotique (Slutsky). */
export const vizIcAsymptotique: Viz = {
  id: 'ch6-ic-asymptotique',
  title: 'Intervalles de confiance asymptotiques : couverture réelle à n fini',
  description:
    'Cent échantillons de taille $n$ ; pour chacun, l’intervalle $[\\bar X_n\\pm q\\,\\hat s/\\sqrt n]$ est tracé (vert s’il contient $\\mu$, rouge sinon). Trois constructions : $\\sigma$ connu (Cor. 1.1, $q=z_{1-\\alpha/2}$), $\\sigma$ remplacé par $S_n$ (Slutsky, Méthode 1.1), et l’intervalle de Student exact ($q=t_{1-\\alpha/2}(n-1)$, exact seulement si la loi est gaussienne). Curseurs $n$ et $1-\\alpha$ ; la couverture est aussi estimée sur $2000$ répétitions. Comparer les petits $n$.',
  source: 'Poly ch.6, Cor. 1.1, Lemme 1.1 (iii), Méthode 1.1, Déf. 1.8 ; ch.1 (Student exact)',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let n = 20
    let level = 0.95
    let law: Law = 'exp'
    let method: Method = 'slutsky'
    let seed = 11
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const spec = LAWS[law]
      const rng = makeRng(3000 + seed)
      const traces: Record<string, unknown>[] = []
      let covered = 0
      const xsOk: (number | null)[] = []
      const ysOk: (number | null)[] = []
      const xsKo: (number | null)[] = []
      const ysKo: (number | null)[] = []
      for (let k = 0; k < 100; k++) {
        const xs = new Array<number>(n)
        for (let i = 0; i < n; i++) xs[i] = spec.draw(rng)
        const [a, b] = interval(xs, method, spec.sigma, level)
        const ok = a <= spec.mu && spec.mu <= b
        if (ok) covered++
        const X = ok ? xsOk : xsKo
        const Y = ok ? ysOk : ysKo
        X.push(k + 1, k + 1, null)
        Y.push(a, b, null)
      }
      traces.push({ x: xsOk, y: ysOk, type: 'scatter', mode: 'lines', name: `contient μ (${covered})`, line: { color: COLORS.green, width: 2 } })
      traces.push({ x: xsKo, y: ysKo, type: 'scatter', mode: 'lines', name: `ne contient pas μ (${100 - covered})`, line: { color: COLORS.red, width: 2.5 } })
      // couverture sur 2000 repetitions
      const R = 2000
      let cov = 0
      let lenSum = 0
      for (let r = 0; r < R; r++) {
        const xs = new Array<number>(n)
        for (let i = 0; i < n; i++) xs[i] = spec.draw(rng)
        const [a, b] = interval(xs, method, spec.sigma, level)
        if (a <= spec.mu && spec.mu <= b) cov++
        lenSum += b - a
      }
      const covFreq = cov / R
      const yr = law === 'bern' ? [-0.15, 0.4] : [spec.mu - 2.2 * spec.sigma, spec.mu + 2.2 * spec.sigma]
      handle.update(traces, {
        title: `100 intervalles, n = ${n}, niveau nominal ${(100 * level).toFixed(0)} %, loi ${spec.label}`,
        xaxis: { title: 'échantillon n°' },
        yaxis: { title: 'intervalle', range: yr },
        shapes: [hline(spec.mu, COLORS.gray, 'dash')],
      })
      const mName = method === 'known' ? '$\\sigma$ connu (Cor. 1.1)' : method === 'slutsky' ? '$\\sigma$ estimé par $S_n$, quantile gaussien (Slutsky, Méthode 1.1)' : 'Student exact $t_{1-\\alpha/2}(n-1)$'
      let comment = ''
      if (method === 'student' && law !== 'gauss') comment = ' L’intervalle de Student n’est **exact** que pour des observations gaussiennes ; ici il n’est, lui aussi, que de niveau asymptotique $1-\\alpha$ (car $t_{1-\\alpha/2}(n-1)\\to z_{1-\\alpha/2}$).'
      if (method === 'slutsky' && n <= 30) comment = ' Aux petits $n$, remplacer $\\sigma$ par $S_n$ **et** garder le quantile gaussien sous-couvre : Slutsky ne garantit la couverture qu’à la limite (Déf. 1.8 : $\\inf_\\theta\\liminf_n$).'
      if (law === 'bern' && method !== 'known') comment += ' Pour une proportion proche de 0, l’intervalle peut être **dégénéré** quand $\\bar X_n=0$ (Ex. 1.12, intervalle de Wald) : cf. la visualisation Wald / Wilson.'
      info.innerHTML = richToHtml(
        `**Méthode : ${mName}.** Loi $Q=${spec.tex}$, $\\mu=${spec.mu}$. Sur les 100 intervalles tracés, **${covered}** contiennent $\\mu$ ; sur ${R} répétitions, couverture empirique **${(100 * covFreq).toFixed(1)} %** pour un niveau nominal de ${(100 * level).toFixed(0)} % ; longueur moyenne ${(lenSum / R).toFixed(3)}.${comment} Rappel : c’est l’intervalle qui est aléatoire, pas $\\mu$.`,
      )
    }

    controls.append(
      segmented<Law>(
        [
          { value: 'gauss', label: 'Gaussienne' },
          { value: 'exp', label: 'Exponentielle' },
          { value: 'bern', label: 'Bernoulli' },
        ],
        law,
        (v) => {
          law = v
          draw()
        },
      ),
    )
    controls.append(
      segmented<Method>(
        [
          { value: 'known', label: '$\\sigma$ connu' },
          { value: 'slutsky', label: 'Slutsky ($S_n$)' },
          { value: 'student', label: 'Student' },
        ],
        method,
        (v) => {
          method = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$n$',
        min: Math.log10(5),
        max: Math.log10(500),
        step: 0.05,
        value: Math.log10(n),
        log: true,
        format: (v) => String(Math.round(v)),
        onChange: (v) => {
          n = Math.max(3, Math.round(v))
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$1-\\alpha$',
        min: 0.8,
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
