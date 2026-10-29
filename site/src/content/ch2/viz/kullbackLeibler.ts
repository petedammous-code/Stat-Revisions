import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, segmentsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, bernoulli, normal } from '../../../sim/rng'
import { linspace, mean } from '../../../sim/stats'

type Model = 'bern' | 'gauss'

function klBern(p: number, q: number): number {
  return p * Math.log(p / q) + (1 - p) * Math.log((1 - p) / (1 - q))
}

/** Convergence de ell_n vers M_theta* et divergence de Kullback-Leibler (Prop. 1.3, Ex. 4.4). */
export const vizKullbackLeibler: Viz = {
  id: 'ch2-kullback-leibler',
  title: 'Log-vraisemblance ℓₙ, limite M_θ⋆ et divergence de Kullback-Leibler',
  description:
    'À gauche : $\\ell_n(\\vartheta)$ pour un échantillon tiré sous $\\theta^\\star$ (bleu) et sa limite $M_{\\theta^\\star}(\\vartheta)=\\mathbb{E}_{\\theta^\\star}[\\log q_\\vartheta(X_1)]$ (orange), maximale en $\\theta^\\star$ (Prop. 1.3) ; le segment vertical au point $\\vartheta$ choisi mesure $M_{\\theta^\\star}(\\theta^\\star)-M_{\\theta^\\star}(\\vartheta)=\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)$. À droite : les deux divergences $\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)$ et $\\mathrm{KL}(\\mathbb{Q}_\\vartheta,\\mathbb{Q}_{\\theta^\\star})$ en fonction de $\\vartheta$ : **non symétriques** pour Bernoulli, symétriques pour $\\mathcal{N}(\\mu,1)$. Curseurs $\\theta^\\star$, $\\vartheta$, $n$ ; bouton « Tirer ».',
  source: 'Poly ch.2, §1.4, Déf. 1.7, Thm 1.1, Prop. 1.3 ; Compléments Ex. 4.4 (Bernoulli)',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let model: Model = 'bern'
    let thetaStar = 1 / 3
    let vt = 0.6
    let n = 30
    let seed = 2
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    let starSlider: ReturnType<typeof slider> | null = null
    let vtSlider: ReturnType<typeof slider> | null = null

    const draw = () => {
      const rng = makeRng(500 + seed)
      const grid = model === 'bern' ? linspace(0.01, 0.99, 300) : linspace(thetaStar - 3, thetaStar + 3, 300)
      let xs: number[]
      let ell: number[]
      let Mlim: number[]
      let kl01: number[]
      let kl10: number[]
      let ellAt: number
      let Mat: number
      let Mstar: number
      let klAt: number
      let klRev: number
      let bound: number
      if (model === 'bern') {
        xs = new Array<number>(n)
        for (let i = 0; i < n; i++) xs[i] = bernoulli(rng, thetaStar)
        const xb = mean(xs)
        const ellF = (v: number) => xb * Math.log(v) + (1 - xb) * Math.log(1 - v)
        const MF = (v: number) => thetaStar * Math.log(v) + (1 - thetaStar) * Math.log(1 - v)
        ell = grid.map(ellF)
        Mlim = grid.map(MF)
        kl01 = grid.map((v) => klBern(thetaStar, v))
        kl10 = grid.map((v) => klBern(v, thetaStar))
        ellAt = ellF(vt)
        Mat = MF(vt)
        Mstar = MF(thetaStar)
        klAt = klBern(thetaStar, vt)
        klRev = klBern(vt, thetaStar)
        const lg = Math.log(vt / (1 - vt))
        bound = Math.min(1, (thetaStar * (1 - thetaStar) * lg * lg) / (n * 0.1 * 0.1))
      } else {
        xs = new Array<number>(n)
        for (let i = 0; i < n; i++) xs[i] = normal(rng, thetaStar, 1)
        const c = -0.5 * Math.log(2 * Math.PI)
        const ellF = (v: number) => {
          let s = 0
          for (const x of xs) s += (x - v) * (x - v)
          return c - s / (2 * n)
        }
        const MF = (v: number) => c - 0.5 - ((v - thetaStar) * (v - thetaStar)) / 2
        ell = grid.map(ellF)
        Mlim = grid.map(MF)
        kl01 = grid.map((v) => ((v - thetaStar) * (v - thetaStar)) / 2)
        kl10 = kl01
        ellAt = ellF(vt)
        Mat = MF(vt)
        Mstar = MF(thetaStar)
        klAt = ((vt - thetaStar) * (vt - thetaStar)) / 2
        klRev = klAt
        // Var(log q_v(X)) = Var((X-v)^2/2) = Var((G + d)^2)/4 avec d = theta* - v : (2 + 4 d^2)/4
        const d = thetaStar - vt
        bound = Math.min(1, (0.5 + d * d) / (n * 0.1 * 0.1))
      }
      const yMin = Math.min(Mstar - 2.5, ellAt - 0.5, Mat - 0.5)
      const tracesL: Record<string, unknown>[] = [
        lineTrace(grid, ell.map((e) => Math.max(e, yMin)), 'ℓₙ(ϑ) (échantillon)', COLORS.blue),
        lineTrace(grid, Mlim.map((e) => Math.max(e, yMin)), 'M_θ⋆(ϑ) (limite)', COLORS.orange),
        segmentsTrace([vt], [Mat], [Mstar], 'KL(Q_θ⋆, Q_ϑ)', COLORS.red),
        pointsTrace([vt, vt], [Mat, Mstar], 'écart', COLORS.red, { marker: { color: COLORS.red, size: 8 } }),
      ]
      const emv = mean(xs)
      if (model === 'gauss' || (emv > 0 && emv < 1)) tracesL.push(pointsTrace([emv], [Math.max(...ell)], 'EMV', COLORS.blue, { marker: { color: COLORS.blue, size: 10, symbol: 'diamond' } }))
      hLeft.update(tracesL, {
        title: `ℓₙ et sa limite M_θ⋆ (θ⋆ = ${thetaStar.toFixed(2)}, n = ${n})`,
        xaxis: { title: 'ϑ', range: [grid[0], grid[grid.length - 1]] },
        yaxis: { title: 'log-vraisemblance normalisée', range: [yMin, Mstar + 0.4] },
        shapes: [vline(thetaStar, COLORS.red, 'dash')],
        showlegend: false,
      })
      const klMax = model === 'bern' ? 2.5 : 4.5
      hRight.update(
        [
          lineTrace(grid, kl01.map((k) => Math.min(k, klMax)), 'KL(Q_θ⋆, Q_ϑ)', COLORS.red),
          lineTrace(grid, kl10.map((k) => Math.min(k, klMax)), 'KL(Q_ϑ, Q_θ⋆)', COLORS.purple, { line: { color: COLORS.purple, width: 2.5, dash: 'dash' } }),
          pointsTrace([vt], [Math.min(klAt, klMax)], 'KL au point ϑ', COLORS.red, { marker: { color: COLORS.red, size: 9 } }),
        ],
        {
          title: model === 'bern' ? 'Divergences de Kullback-Leibler entre Ber(θ⋆) et Ber(ϑ)' : 'Divergence entre N(θ⋆,1) et N(ϑ,1) : (θ⋆ − ϑ)²/2',
          xaxis: { title: 'ϑ', range: [grid[0], grid[grid.length - 1]] },
          yaxis: { title: 'KL', range: [0, klMax] },
          shapes: [vline(thetaStar, COLORS.red, 'dash')],
          legend: { orientation: 'h', y: -0.25 },
        },
      )
      info.innerHTML = richToHtml(
        `**Prop. 1.3.** Au point $\\vartheta=${vt.toFixed(2)}$ : $\\ell_n(\\vartheta)=${ellAt.toFixed(3)}$ (échantillon de taille $n=${n}$, EMV $\\bar X_n=${emv.toFixed(3)}$) et $M_{\\theta^\\star}(\\vartheta)=${Mat.toFixed(3)}$ ; $M_{\\theta^\\star}(\\theta^\\star)=${Mstar.toFixed(3)}$ et $\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)=M_{\\theta^\\star}(\\theta^\\star)-M_{\\theta^\\star}(\\vartheta)=${klAt.toFixed(3)}\\ge0$ (Thm 1.1), nulle ssi $\\vartheta=\\theta^\\star$ (modèle identifiable). **Asymétrie :** $\\mathrm{KL}(\\mathbb{Q}_\\vartheta,\\mathbb{Q}_{\\theta^\\star})=${klRev.toFixed(3)}$${model === 'bern' ? ' : la divergence n’est pas une distance' : ' : pour deux gaussiennes de même variance, elle est exceptionnellement symétrique'}. **Convergence (LGN) :** pour $\\vartheta$ fixé, $\\ell_n(\\vartheta)\\to M_{\\theta^\\star}(\\vartheta)$ en $\\mathbb{P}_{\\theta^\\star}$-probabilité ; borne de Bienaymé-Tchebychev $\\mathbb{P}_{\\theta^\\star}(|\\ell_n(\\vartheta)-M_{\\theta^\\star}(\\vartheta)|\\ge0{,}1)\\le${bound.toFixed(3)}$${model === 'bern' ? ' (Ex. 4.4)' : ' (Bienaymé-Tchebychev, $\\mathrm{Var}(\\log q_\\vartheta(X_1))=\\frac12+(\\theta^\\star-\\vartheta)^2$)'}. La convergence du **point de maximum** (consistance de l’EMV) demande une convergence uniforme en $\\vartheta$ : ch.6–7.${model === 'bern' ? ' $M_{\\theta^\\star}(\\vartheta)=\\theta^\\star\\log\\vartheta+(1-\\theta^\\star)\\log(1-\\vartheta)$, et $M_{\\theta^\\star}(\\theta^\\star)=\\mathrm{Ent}(\\mathcal{B}\\mathrm{er}(\\theta^\\star))$ est l’opposé de l’entropie de Shannon.' : ''}`,
      )
    }

    const rebuildSliders = () => {
      const isB = model === 'bern'
      const s1 = slider({
        label: '$\\theta^\\star$ (vraie valeur)',
        min: isB ? 0.05 : -2,
        max: isB ? 0.95 : 2,
        step: isB ? 0.01 : 0.1,
        value: thetaStar,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          thetaStar = v
          draw()
        },
      })
      const s2 = slider({
        label: '$\\vartheta$ (candidat)',
        min: isB ? 0.02 : -3,
        max: isB ? 0.98 : 3,
        step: isB ? 0.01 : 0.1,
        value: vt,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          vt = v
          draw()
        },
      })
      if (starSlider) controls.replaceChild(s1.root, starSlider.root)
      else controls.append(s1.root)
      if (vtSlider) controls.replaceChild(s2.root, vtSlider.root)
      else controls.append(s2.root)
      starSlider = s1
      vtSlider = s2
    }

    controls.append(
      segmented<Model>(
        [
          { value: 'bern', label: 'Bernoulli' },
          { value: 'gauss', label: '$\\mathcal{N}(\\mu,1)$' },
        ],
        model,
        (v) => {
          model = v
          thetaStar = model === 'bern' ? 1 / 3 : 0
          vt = model === 'bern' ? 0.6 : 1
          rebuildSliders()
          draw()
        },
      ),
    )
    rebuildSliders()
    controls.append(
      slider({
        label: '$n$',
        min: Math.log10(5),
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
      button('Tirer un échantillon', () => {
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
