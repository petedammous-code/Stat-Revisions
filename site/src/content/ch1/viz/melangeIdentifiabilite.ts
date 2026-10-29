import type { Viz } from '../../types'
import { vizFrame, slider, button, toggle } from '../../../core/ui'
import { plot, lineTrace, areaTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { normalPdf, linspace } from '../../../sim/stats'

const fmt = (v: number) => v.toFixed(2).replace('.', ',')

/** Melange gaussien : (pi, mu1, mu2) et (1-pi, mu2, mu1) donnent la meme densite ; contrainte mu1 < mu2. */
export const vizMelangeIdentifiabilite: Viz = {
  id: 'ch1-melange-identifiabilite',
  title: 'Mélange gaussien : deux paramètres distincts, une seule loi (non-identifiabilité)',
  description:
    'Densité $p_{\\pi,\\mu_1,\\mu_2}=\\pi\\,p_{\\mathcal{N}(\\mu_1,\\sigma^2)}+(1-\\pi)\\,p_{\\mathcal{N}(\\mu_2,\\sigma^2)}$ avec $\\sigma^2=1$ connu. Curseurs $\\pi$, $\\mu_1$, $\\mu_2$ ; le bouton « Échanger les composantes » remplace $(\\pi,\\mu_1,\\mu_2)$ par $(1-\\pi,\\mu_2,\\mu_1)$ : la courbe ne bouge pas. L’option « imposer $\\mu_1<\\mu_2$ » restreint l’espace des paramètres et rétablit l’identifiabilité.',
  source: 'Poly ch.1, Déf. 2 et Ex. 1.7 ; PC1 Ex. 7',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let pi = 0.3
    let mu1 = -1
    let mu2 = 1.5
    let constrain = false
    const handle = plot(plotEl, [], {})
    let sliders: ReturnType<typeof slider>[] = []

    const density = (x: number, p: number, a: number, b: number) => p * normalPdf(x, a, 1) + (1 - p) * normalPdf(x, b, 1)

    const draw = () => {
      const grid = linspace(-6, 6, 400)
      const traces: Record<string, unknown>[] = [
        areaTrace(grid, grid.map((x) => pi * normalPdf(x, mu1, 1)), 'π · N(μ₁, 1)', COLORS.blue),
        areaTrace(grid, grid.map((x) => (1 - pi) * normalPdf(x, mu2, 1)), '(1−π) · N(μ₂, 1)', COLORS.green),
        lineTrace(grid, grid.map((x) => density(x, pi, mu1, mu2)), 'mélange p_{π,μ₁,μ₂}', COLORS.orange),
        lineTrace(grid, grid.map((x) => density(x, 1 - pi, mu2, mu1)), 'mélange p_{1−π,μ₂,μ₁} (échangé)', COLORS.red, { line: { color: COLORS.red, width: 2, dash: 'dash' } }),
      ]
      handle.update(traces, { title: `π = ${fmt(pi)}, μ₁ = ${fmt(mu1)}, μ₂ = ${fmt(mu2)}`, xaxis: { title: 'x', range: [-6, 6] }, yaxis: { title: 'densité' } })
      const violated = constrain && mu1 >= mu2
      info.innerHTML = richToHtml(
        `**Deux paramètres, une loi.** $(\\pi,\\mu_1,\\mu_2)=(${fmt(pi)},${fmt(mu1)},${fmt(mu2)})$ et $(1-\\pi,\\mu_2,\\mu_1)=(${fmt(1 - pi)},${fmt(mu2)},${fmt(mu1)})$ donnent exactement la même densité (courbes orange et rouge superposées) : la fonction $\\theta\\mapsto\\mathbb{P}_\\theta$ n’est **pas injective**, le modèle n’est pas identifiable au sens de la Déf. 2 (« label switching », Ex. 1.7). Aucune quantité d’observations ne permettra de distinguer ces deux valeurs du paramètre.` +
          (constrain
            ? violated
              ? Math.abs(mu1 - mu2) < 1e-9
                ? `\n\n**Cas de bord $\\mu_1=\\mu_2$** : aucun des deux triplets n’est dans l’espace restreint $\\{\\pi\\in\\,]0,1[,\\ \\mu_1<\\mu_2\\}$ ; la loi $\\mathcal{N}(\\mu_1,1)$ ne dépend alors plus de $\\pi$ (« conventions au bord à préciser », poly p. 13).`
                : `\n\n**Contrainte $\\mu_1<\\mu_2$ violée** : le paramètre courant n’appartient pas à l’espace restreint ; dans l’espace $\\{\\pi\\in\\,]0,1[,\\ \\mu_1<\\mu_2\\}$, un seul des deux triplets est admissible : $(${fmt(1 - pi)},${fmt(mu2)},${fmt(mu1)})$.`
              : `\n\n**Avec la contrainte $\\mu_1<\\mu_2$** (et $\\pi\\in\\,]0,1[$), le triplet échangé $(1-\\pi,\\mu_2,\\mu_1)$ n’est plus dans $\\Theta$ : l’identifiabilité est rétablie (démontrée rigoureusement par les fonctions caractéristiques et un système de Vandermonde, PC1 Ex. 7). Attention aux bords : si $\\pi\\in\\{0,1\\}$ une moyenne disparaît, si $\\mu_1=\\mu_2$ c’est $\\pi$ qui disparaît (« conventions au bord à préciser », poly p. 13).`
            : `\n\nPour rendre le modèle identifiable, on **restreint l’espace des paramètres** (par exemple $\\mu_1<\\mu_2$) : activez l’option.`),
      )
    }

    const build = () => {
      for (const s of sliders) s.root.remove()
      sliders = [
        slider({ label: '$\\pi$', min: 0.02, max: 0.98, step: 0.01, value: pi, format: fmt, onChange: (v) => { pi = v; draw() } }),
        slider({ label: '$\\mu_1$', min: -4, max: 4, step: 0.1, value: mu1, format: fmt, onChange: (v) => { mu1 = v; draw() } }),
        slider({ label: '$\\mu_2$', min: -4, max: 4, step: 0.1, value: mu2, format: fmt, onChange: (v) => { mu2 = v; draw() } }),
      ]
      for (const s of sliders) controls.insertBefore(s.root, swapBtn)
    }

    const swapBtn = button('Échanger les composantes', () => {
      const p = pi
      pi = 1 - p
      const a = mu1
      mu1 = mu2
      mu2 = a
      build()
      draw()
    })
    controls.append(swapBtn)
    build()
    controls.append(
      toggle('imposer $\\mu_1<\\mu_2$ (espace des paramètres restreint)', constrain, (v) => {
        constrain = v
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
