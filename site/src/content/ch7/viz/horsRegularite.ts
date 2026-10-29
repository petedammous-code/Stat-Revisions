import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, toggle, type SliderHandle } from '../../../core/ui'
import { plot, lineTrace, barTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, uniform } from '../../../sim/rng'
import { normalPdf, normalCdf, linspace } from '../../../sim/stats'
import { histDensity, meanOf, fr } from './common'

type Case = 'pareto' | 'bord'

/** Hors des modèles réguliers : Pareto (vitesse n, limite exponentielle) et vraie valeur au bord de Θ (PC7 Ex. 4). */
export const vizHorsRegularite: Viz = {
  id: 'ch7-hors-regularite',
  title: 'Hors régularité : support dépendant du paramètre (Pareto) et vraie valeur au bord',
  description:
    '**Pareto** ($\\alpha=1$) : histogramme de $n\\eta(\\hat\\alpha_n-\\alpha)$ avec $\\hat\\alpha_n=\\min_iX_i$ et densité de $\\alpha\\,\\mathcal{E}(1)$ ; l’interrupteur montre l’échelle $\\sqrt n$, qui écrase tout en 0 (vitesse trop lente). **Bord** : $\\mathcal{N}(\\theta,1)$ avec $\\Theta=\\mathbb{R}_+$, $\\hat\\theta_n=\\max(\\bar X_n,0)$ ; histogramme de $\\sqrt n(\\hat\\theta_n-\\theta^\\star)$ ; amener $\\theta^\\star$ à 0 fait apparaître un atome de masse $1/2$. Curseurs $n$, $\\eta$ ou $\\theta^\\star$, bouton « Tirer ».',
  source: 'Poly ch.7, Ex. 1.10, remarque (a) après le Thm 1.4, §4.9 ; PC7 Ex. 4',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let which: Case = 'pareto'
    let n = 100
    let eta = 2
    let thetaStar = 0.1
    let sqrtScale = false
    let seed = 1
    const R = 2000
    const handle = plot(plotEl, [], {})

    const drawPareto = () => {
      const rng = makeRng(61000 + seed)
      const alpha = 1
      const vals = new Array<number>(R)
      for (let r = 0; r < R; r++) {
        let m = Infinity
        for (let i = 0; i < n; i++) {
          // X = α U^{-1/η} suit la loi de Pareto d'échelle α et d'indice η
          let u = 0
          while (u === 0) u = uniform(rng)
          const x = alpha * Math.pow(u, -1 / eta)
          if (x < m) m = x
        }
        vals[r] = (sqrtScale ? Math.sqrt(n) : n * eta) * (m - alpha)
      }
      const hi = sqrtScale ? 1 : 6 * alpha
      const h = histDensity(vals, 50, 0, hi)
      const traces: Record<string, unknown>[] = [barTrace(h.centers, h.density, sqrtScale ? '√n(α̂ₙ − α)' : 'nη(α̂ₙ − α)', COLORS.blue, { width: h.width })]
      if (!sqrtScale) {
        const xs = linspace(0, hi, 200)
        traces.push(lineTrace(xs, xs.map((x) => Math.exp(-x / alpha) / alpha), 'densité de α·E(1)', COLORS.orange))
      }
      handle.update(traces, {
        title: `Pareto (α = 1, η = ${eta.toFixed(1)}), n = ${n}, ${R} répétitions`,
        xaxis: { title: sqrtScale ? '√n(α̂ₙ − α)' : 'nη(α̂ₙ − α)', range: [0, hi] },
        yaxis: { title: 'densité' },
        barmode: 'overlay',
      })
      const m = meanOf(vals)
      info.innerHTML = richToHtml(
        sqrtScale
          ? `À l’échelle $\\sqrt n$, $\\sqrt n(\\hat\\alpha_n-\\alpha)=\\frac{1}{\\eta\\sqrt n}\\cdot n\\eta(\\hat\\alpha_n-\\alpha)\\to0$ en probabilité : toute la masse s’écrase en 0 (moyenne $${fr(m, 4)}$). La vitesse $\\sqrt n$ est **trop lente** : l’erreur est d’ordre $1/n$ (EQM en $O(n^{-2})$).`
          : `**Ex. 1.10.** $\\hat\\alpha_n=\\min_iX_i\\ge\\alpha$ et $n\\eta\\log(\\hat\\alpha_n/\\alpha)\\sim\\mathcal{E}(1)$ exactement ; par la méthode-δ (ch.6, Thm 1.7) à la vitesse $r_n=n\\eta$, $n\\eta(\\hat\\alpha_n-\\alpha)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\alpha\\,\\mathcal{E}(1)$. Moyenne empirique $${fr(m)}$ (théorie à $n$ fini : $\\alpha\\,n\\eta/(n\\eta-1)=${fr((n * eta) / (n * eta - 1))}$). Loi limite **exponentielle, non gaussienne**, vitesse $n$ : le support $[\\alpha,+\\infty[$ dépend du paramètre, (R-1)–(R-2) sont violées, ni Cramér-Rao ni le Thm 1.7 ne s’appliquent.`,
      )
    }

    const drawBord = () => {
      const rng = makeRng(62000 + seed)
      const vals = new Array<number>(R)
      let atZero = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += normal(rng, thetaStar, 1)
        const xbar = s / n
        const est = Math.max(xbar, 0)
        if (est === 0) atZero++
        vals[r] = Math.sqrt(n) * (est - thetaStar)
      }
      const lo = -4
      const hi = 4
      const h = histDensity(vals, 64, lo, hi)
      const xs = linspace(lo, hi, 200)
      const atomX = -Math.sqrt(n) * thetaStar
      handle.update(
        [
          barTrace(h.centers, h.density, '√n(θ̂ₙ − θ⋆)', COLORS.blue, { width: h.width }),
          lineTrace(xs, xs.map((x) => normalPdf(x)), 'densité N(0,1) (cas intérieur)', COLORS.orange),
        ],
        {
          title: `N(θ⋆,1), Θ = ℝ₊, θ⋆ = ${thetaStar.toFixed(2)}, n = ${n}`,
          xaxis: { title: '√n(θ̂ₙ − θ⋆)', range: [lo, hi] },
          yaxis: { title: 'densité' },
          barmode: 'overlay',
          shapes: atomX >= lo ? [vline(atomX, COLORS.red, 'dash')] : [],
        },
      )
      const pTheo = normalCdf(-Math.sqrt(n) * thetaStar)
      info.innerHTML = richToHtml(
        `**PC7 Ex. 4.** $\\hat\\theta_n=\\max(\\bar X_n,0)$. Fréquence de $\\{\\hat\\theta_n=0\\}$ : $${fr(atZero / R)}$ (théorie $\\Phi(-\\sqrt n\\theta^\\star)=${fr(pTheo)}$) ; cette masse se trouve au point $-\\sqrt n\\theta^\\star=${fr(atomX, 2)}$ (trait rouge). ${thetaStar > 0 ? `Pour $\\theta^\\star>0$ fixé, $\\Phi(-\\sqrt n\\theta^\\star)\\to0$ : quand $n$ croît, l’atome disparaît et l’histogramme rejoint $\\mathcal{N}(0,1)$ (Thm 1.4 en un point **intérieur**). Près du bord ($\\sqrt n\\theta^\\star$ petit), l’approximation gaussienne est mauvaise.` : `En $\\theta^\\star=0$ (bord de $\\Theta$), $\\sqrt n\\hat\\theta_n$ a la loi de $\\max(Z,0)$ pour **tout** $n$ : atome de masse $1/2$ en 0, loi non gaussienne et non centrée (moyenne $1/\\sqrt{2\\pi}\\approx0{,}40$, ici $${fr(meanOf(vals))}$). Le Thm 1.4, dont les hypothèses sont locales en $\\theta^\\star\\in\\Theta^o$, ne dit rien au bord.`}`,
      )
    }

    const draw = () => (which === 'pareto' ? drawPareto() : drawBord())

    const paramSlider: SliderHandle = slider({
      label: '$\\eta$',
      min: 0.5,
      max: 4,
      step: 0.1,
      value: eta,
      format: (v) => v.toFixed(2),
      onChange: (v) => {
        if (which === 'pareto') eta = v
        else thetaStar = v
        draw()
      },
    })
    const scaleToggle = toggle('échelle $\\sqrt n$ (au lieu de $n\\eta$)', sqrtScale, (v) => {
      sqrtScale = v
      draw()
    })
    controls.append(
      segmented<Case>(
        [
          { value: 'pareto', label: 'Pareto (support)' },
          { value: 'bord', label: 'Paramètre au bord' },
        ],
        which,
        (v) => {
          which = v
          if (v === 'pareto') paramSlider.configure({ label: '$\\eta$', min: 0.5, max: 4, step: 0.1, value: eta })
          else paramSlider.configure({ label: '$\\theta^\\star$', min: 0, max: 0.6, step: 0.01, value: thetaStar })
          scaleToggle.style.display = v === 'pareto' ? '' : 'none'
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$n$',
        min: 1,
        max: 2.7,
        step: 0.02,
        value: Math.log10(n),
        log: true,
        integer: true,
        onChange: (v) => {
          n = v
          draw()
        },
      }).root,
    )
    controls.append(paramSlider.root, scaleToggle)
    controls.append(
      button('Tirer de nouveaux échantillons', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
