import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, hline, COLORS, PALETTE } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, exponential, bernoulli, cauchy, type Rng } from '../../../sim/rng'

type Law = 'exp' | 'bern' | 'cauchy'
const LAWS: Record<Law, { label: string; tex: string; mu: number; sigma2: number; draw: (r: Rng) => number }> = {
  exp: { label: 'E(1)', tex: '\\mathcal{E}(1)', mu: 1, sigma2: 1, draw: (r) => exponential(r, 1) },
  bern: { label: 'Bernoulli(0,3)', tex: '\\mathcal{B}\\mathrm{er}(0{,}3)', mu: 0.3, sigma2: 0.21, draw: (r) => bernoulli(r, 0.3) },
  cauchy: { label: 'Cauchy', tex: '\\text{Cauchy}(0,1)', mu: 0, sigma2: NaN, draw: (r) => cauchy(r, 0, 1) },
}

/** Trajectoires n -> X̄n et bande mu ± eps : convergence en probabilite (Def. 1.2) vs trajectoires. */
export const vizConvergenceProba: Viz = {
  id: 'ch6-convergence-proba',
  title: 'Consistance : trajectoires de la moyenne empirique et bande μ ± ε',
  description:
    'Huit trajectoires $n\\mapsto\\bar X_n$ d’une même loi, la bande $\\mu\\pm\\varepsilon$ (curseur $\\varepsilon$) et, pour $n=N$ (curseur), la fréquence sur $1000$ répétitions de l’événement $\\{|\\bar X_n-\\mu|\\ge\\varepsilon\\}$ dont la définition de la consistance (Déf. 1.2) demande qu’elle tende vers $0$. Comparer à la borne de Bienaymé-Tchebychev $\\sigma^2/(n\\varepsilon^2)$ utilisée dans la preuve du Thm 1.2.',
  source: 'Poly ch.6, Déf. 1.2, Thm 1.2 et animation p. 13 ; Outils Déf. 2.1',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let N = 300
    let eps = 0.2
    let law: Law = 'exp'
    let seed = 7
    const K = 8
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const spec = LAWS[law]
      const rng = makeRng(500 + seed)
      const traces: Record<string, unknown>[] = []
      const xs = Array.from({ length: N }, (_, i) => i + 1)
      let outAtN = 0
      for (let k = 0; k < K; k++) {
        const ys = new Array<number>(N)
        let s = 0
        for (let i = 0; i < N; i++) {
          s += spec.draw(rng)
          ys[i] = s / (i + 1)
        }
        if (Math.abs(ys[N - 1] - spec.mu) >= eps) outAtN++
        traces.push(lineTrace(xs, ys, `trajectoire ${k + 1}`, PALETTE[k % PALETTE.length], { line: { width: 1.4, color: PALETTE[k % PALETTE.length] }, showlegend: false }))
      }
      // Frequence de sortie de bande a n = N sur 1000 repetitions
      const R = 1000
      let out = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < N; i++) s += spec.draw(rng)
        if (Math.abs(s / N - spec.mu) >= eps) out++
      }
      const freq = out / R
      const shapes = [
        hline(spec.mu, COLORS.red, 'solid'),
        { type: 'rect', xref: 'paper', x0: 0, x1: 1, y0: spec.mu - eps, y1: spec.mu + eps, fillcolor: 'rgba(220,38,38,0.08)', line: { width: 0 } },
      ]
      const yr = law === 'cauchy' ? [-4, 4] : [spec.mu - 4 * Math.sqrt(spec.sigma2) / 2, spec.mu + 4 * Math.sqrt(spec.sigma2) / 2]
      handle.update(traces, {
        title: `${K} trajectoires de X̄ₙ, loi ${spec.label}`,
        xaxis: { title: 'n' },
        yaxis: { title: 'X̄ₙ', range: yr },
        shapes,
        showlegend: false,
      })
      const bt = law === 'cauchy' ? null : Math.min(1, spec.sigma2 / (N * eps * eps))
      info.innerHTML = richToHtml(
        law === 'cauchy'
          ? `**Loi de Cauchy : pas de consistance.** Les trajectoires de $\\bar X_n$ ne se stabilisent pas (sauts dus aux valeurs extrêmes) et la fréquence de $\\{|\\bar X_n-\\mu|\\ge\\varepsilon\\}$ à $n=${N}$ vaut ${(100 * freq).toFixed(1)} % sur ${R} répétitions : elle ne tend pas vers 0. La LGN faible (Thm 1.2) exige un moment d’ordre 2 (la version admise du Thm 4.2, l’intégrabilité) : Cauchy n’a ni l’un ni l’autre.`
          : `**Déf. 1.2 (consistance).** Pour $Q=${spec.tex}$, $\\mu=${spec.mu}$, $\\sigma^2=${spec.sigma2}$. À $n=${N}$ et $\\varepsilon=${eps}$ : fréquence empirique de $\\{|\\bar X_n-\\mu|\\ge\\varepsilon\\}$ sur ${R} répétitions : **${(100 * freq).toFixed(1)} %** ; borne de Bienaymé-Tchebychev (preuve du Thm 1.2) : $\\sigma^2/(n\\varepsilon^2)=${bt!.toFixed(3)}$ ; parmi les ${K} trajectoires tracées, ${outAtN} sont hors de la bande à $n=N$. La convergence en probabilité porte sur cette **fréquence à $n$ fixé**, pas sur le fait qu’une trajectoire donnée reste dans la bande (ce serait la convergence presque sûre, hors programme : Thm 4.3).`,
      )
    }

    controls.append(
      segmented<Law>(
        [
          { value: 'exp', label: 'Exponentielle' },
          { value: 'bern', label: 'Bernoulli' },
          { value: 'cauchy', label: 'Cauchy' },
        ],
        law,
        (v) => {
          law = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$N$ (horizon)',
        min: 50,
        max: 2000,
        step: 50,
        value: N,
        onChange: (v) => {
          N = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$\\varepsilon$',
        min: 0.02,
        max: 0.5,
        step: 0.02,
        value: eps,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          eps = v
          draw()
        },
      }).root,
    )
    controls.append(
      button('Nouvelles trajectoires', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
