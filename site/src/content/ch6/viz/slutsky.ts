import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, el } from '../../../core/ui'
import { plot, lineTrace, barTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, exponential, normal } from '../../../sim/rng'
import { histogram, normalPdf, linspace, variance } from '../../../sim/stats'

type Mode = 'quotient' | 'contre'

/** Slutsky : quotient X_n / Y_n avec Y_n -> 1 ; et contre-exemple Y_n = (-1)^n X_n (Prop. 2.1). */
export const vizSlutsky: Viz = {
  id: 'ch6-slutsky',
  title: 'Lemme de Slutsky : limite constante, et le contre-exemple du couple',
  description:
    'Mode « quotient » : $X_n=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\Rightarrow\\mathcal{N}(0,1)$ et $Y_n=S_n/\\sigma\\to1$ en probabilité (observations $\\mathcal{E}(1)$) ; histogrammes de $Y_n$ (qui se concentre en $1$) et de $X_n/Y_n$ (statistique de Student asymptotique, Ex. 1.14), avec la densité $\\mathcal{N}(0,1)$. Mode « contre-exemple » : $X_n\\sim\\mathcal{N}(0,1)$, $Y_n=(-1)^nX_n$ : chaque marginale converge en loi, mais $X_n+Y_n$ vaut $2X_n$ ou $0$ selon la parité de $n$ : pas de convergence du couple (Prop. 2.1). Curseur $n$.',
  source: 'Poly ch.6, Lemme 1.1 (Slutsky) et Remarques p. 20 ; Outils Prop. 2.1 ; Ex. 1.14',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    const left = el('div')
    const right = el('div')
    left.style.minHeight = '300px'
    right.style.minHeight = '300px'
    plotEl.style.display = 'grid'
    plotEl.style.gridTemplateColumns = 'repeat(auto-fit, minmax(300px, 1fr))'
    plotEl.style.gap = '8px'
    plotEl.append(left, right)
    const hLeft = plot(left, [], {})
    const hRight = plot(right, [], {})
    let n = 20
    let mode: Mode = 'quotient'
    let seed = 9
    const M = 2000

    const draw = () => {
      const rng = makeRng(5000 + seed)
      if (mode === 'quotient') {
        const ys = new Array<number>(M)
        const ratios = new Array<number>(M)
        for (let m = 0; m < M; m++) {
          let s = 0
          let s2 = 0
          for (let i = 0; i < n; i++) {
            const x = exponential(rng, 1)
            s += x
            s2 += x * x
          }
          const mean = s / n
          const sn = Math.sqrt(Math.max(1e-12, (s2 - n * mean * mean) / (n - 1)))
          const xn = Math.sqrt(n) * (mean - 1)
          ys[m] = sn
          ratios[m] = xn / sn
        }
        const hY = histogram(ys, 40, 0, 2.5)
        hLeft.update([barTrace(hY.centers, hY.density, 'Yₙ = Sₙ/σ', COLORS.teal, { width: hY.width })], {
          title: `Yₙ = Sₙ/σ, n = ${n} : se concentre en c = 1`,
          xaxis: { title: 'Yₙ', range: [0, 2.5] },
          yaxis: { title: 'densité' },
          shapes: [{ type: 'line', x0: 1, x1: 1, y0: 0, y1: 1, yref: 'paper', line: { color: COLORS.red, width: 2, dash: 'dash' } }],
        })
        const hR = histogram(ratios, 40, -4.5, 4.5)
        const grid = linspace(-4.5, 4.5, 300)
        hRight.update([barTrace(hR.centers, hR.density, 'Xₙ / Yₙ', COLORS.blue, { width: hR.width }), lineTrace(grid, grid.map((x) => normalPdf(x)), 'densité N(0,1)', COLORS.orange)], {
          title: `Xₙ/Yₙ = √n(X̄ₙ−μ)/Sₙ, n = ${n}`,
          xaxis: { title: 'Xₙ / Yₙ', range: [-4.5, 4.5] },
          yaxis: { title: 'densité' },
          barmode: 'overlay',
        })
        const vY = variance(ys)
        info.innerHTML = richToHtml(
          `**Lemme 1.1 (iii).** Observations $\\mathcal{E}(1)$ ($\\mu=\\sigma=1$). Par le TCL, $X_n:=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,1)$ ; par la Prop. 1.2, $Y_n:=S_n/\\sigma\\xrightarrow{\\mathbb{P}_n\\text{-prob}}1$, c’est-à-dire $Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\delta_1$ (variance empirique de $Y_n$ : ${vY.toFixed(4)}, qui tend vers 0). Slutsky donne $X_n/Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,1)$ : c’est la statistique de Student asymptotique (Ex. 1.14), valable sans hypothèse gaussienne. Variance empirique de $X_n/Y_n$ : ${variance(ratios).toFixed(3)} (attendu 1) ; aux petits $n$, la loi est encore dissymétrique et plus étalée (le dénominateur aléatoire n’est pas encore « une constante »).`,
        )
      } else {
        const xs = new Array<number>(M)
        const sums = new Array<number>(M)
        const sign = n % 2 === 0 ? 1 : -1
        for (let m = 0; m < M; m++) {
          const x = normal(rng)
          xs[m] = x
          sums[m] = x + sign * x
        }
        const hX = histogram(xs, 40, -4, 4)
        const grid = linspace(-4, 4, 300)
        hLeft.update([barTrace(hX.centers, hX.density, 'Xₙ (et Yₙ a la même loi)', COLORS.teal, { width: hX.width }), lineTrace(grid, grid.map((x) => normalPdf(x)), 'N(0,1)', COLORS.orange)], {
          title: `Marginales : Xₙ ~ N(0,1), Yₙ = (−1)ⁿXₙ ~ N(0,1) (n = ${n})`,
          xaxis: { title: 'valeur', range: [-4, 4] },
          yaxis: { title: 'densité' },
          barmode: 'overlay',
        })
        const hS = histogram(sums, 40, -8, 8)
        const tr: Record<string, unknown>[] = [barTrace(hS.centers, hS.density, 'Xₙ + Yₙ', COLORS.blue, { width: hS.width })]
        if (sign === 1) tr.push(lineTrace(linspace(-8, 8, 300), linspace(-8, 8, 300).map((x) => normalPdf(x, 0, 2)), 'N(0,4)', COLORS.orange))
        hRight.update(tr, {
          title: sign === 1 ? `n = ${n} pair : Xₙ + Yₙ = 2Xₙ ~ N(0,4)` : `n = ${n} impair : Xₙ + Yₙ = 0 (masse de Dirac)`,
          xaxis: { title: 'Xₙ + Yₙ', range: [-8, 8] },
          yaxis: { title: 'densité' },
          barmode: 'overlay',
        })
        info.innerHTML = richToHtml(
          `**Contre-exemple (Outils, Prop. 2.1).** $X_n\\sim\\mathcal{N}(0,1)$ et $Y_n:=(-1)^nX_n$ : chaque composante converge en loi vers $\\mathcal{N}(0,1)$, mais le couple $(X_n,Y_n)$ **ne converge pas en loi** : $X_n+Y_n$ vaut $2X_n\\sim\\mathcal{N}(0,4)$ pour $n$ pair et $0$ pour $n$ impair, donc $\\mathbb{E}[f(X_n+Y_n)]$ oscille. Ici $n=${n}$ (${sign === 1 ? 'pair' : 'impair'}) : faites varier $n$ d’une unité. C’est pourquoi le lemme de Slutsky exige que la limite de $Y_n$ soit une **constante** $c$ (loi $\\delta_c$) : la preuve établit alors la convergence en loi du **couple** vers $\\mu\\otimes\\delta_c$, puis applique la transformation continue.`,
        )
      }
    }

    controls.append(
      segmented<Mode>(
        [
          { value: 'quotient', label: 'Quotient $X_n/Y_n$, $Y_n\\to1$' },
          { value: 'contre', label: 'Contre-exemple $Y_n=(-1)^nX_n$' },
        ],
        mode,
        (v) => {
          mode = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$n$',
        min: 2,
        max: 400,
        step: 1,
        value: n,
        onChange: (v) => {
          n = v
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
