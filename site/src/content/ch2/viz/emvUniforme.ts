import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, uniform, exponential } from '../../../sim/rng'
import { linspace, mean } from '../../../sim/stats'

/** EMV non regulier : vraisemblance en escalier de U([0,theta]) (maximum en X_(n)) contre le pic lisse du modele exponentiel. */
export const vizEmvUniforme: Viz = {
  id: 'ch2-emv-uniforme',
  title: 'EMV non régulier : vraisemblance en escalier de l’uniforme contre pic lisse de l’exponentielle',
  description:
    'À gauche, modèle $\\mathcal{U}([0,\\theta])$ : $\\mathrm{L}_n(\\vartheta)=\\vartheta^{-n}\\mathbb{1}_{[X_{n:n},+\\infty[}(\\vartheta)$ (tracée divisée par son maximum) est **nulle** à gauche de la plus grande observation, **saute** en $X_{n:n}$ puis décroît : l’EMV est $X_{n:n}$ et l’équation de vraisemblance n’a pas de sens (Ex. 1.11). On compare à l’estimateur des moments $2\\bar X_n$ (trait vert), qui peut être inférieur à certaines observations. À droite, modèle $\\mathcal{E}(\\theta)$ : vraisemblance **lisse**, maximum intérieur en $1/\\bar X_n$ (Ex. 1.7). Curseur $n$ : le saut devient une falaise, le pic se resserre.',
  source: 'Poly ch.2, Ex. 1.11 et Ex. 1.7 ; Méthode 1.2 (cas 1 et cas 2) ; animation p. 20',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let theta = 2
    let n = 8
    let seed = 3
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})

    const draw = () => {
      const rng = makeRng(300 + seed)
      const xu = new Array<number>(n)
      const xe = new Array<number>(n)
      for (let i = 0; i < n; i++) {
        xu[i] = uniform(rng, 0, theta)
        xe[i] = exponential(rng, 1 / theta) // intensite 1/theta : moyenne theta, pour comparer les echelles
      }
      const xmax = Math.max(...xu)
      const mom = 2 * mean(xu)
      // --- uniforme
      const g1 = linspace(0.02, 2 * theta, 500)
      const L1 = g1.map((v) => (v < xmax ? 0 : Math.pow(xmax / v, n)))
      hLeft.update(
        [
          lineTrace(g1, L1, 'Lₙ(ϑ) / max Lₙ', COLORS.blue, { line: { color: COLORS.blue, width: 2.5, shape: 'hv' } }),
          pointsTrace(xu, xu.map(() => 0), 'observations', COLORS.gray, { marker: { color: COLORS.gray, size: 7, symbol: 'line-ns-open' } }),
          pointsTrace([xmax], [1], 'EMV = X₍ₙ₎', COLORS.blue, { marker: { color: COLORS.blue, size: 11, symbol: 'diamond' } }),
        ],
        {
          title: `U([0, θ]) : Lₙ(ϑ) = ϑ⁻ⁿ 𝟙{ϑ ≥ X₍ₙ₎}, n = ${n}`,
          xaxis: { title: 'ϑ', range: [0, 2 * theta] },
          yaxis: { title: 'Lₙ(ϑ) / max Lₙ', range: [-0.05, 1.1] },
          shapes: [vline(theta, COLORS.red, 'dash'), vline(mom, COLORS.green, 'dot')],
          showlegend: false,
        },
      )
      // --- exponentielle (intensite 1/theta) : L_n(v) = v^n exp(-v sum x)
      const sx = xe.reduce((a, b) => a + b, 0)
      const emvE = n / sx
      const g2 = linspace(0.02, 3 / theta, 500)
      const L2 = g2.map((v) => Math.exp(n * Math.log(v) - v * sx - (n * Math.log(emvE) - emvE * sx)))
      hRight.update(
        [
          lineTrace(g2, L2, 'Lₙ(ϑ) / max Lₙ', COLORS.orange),
          pointsTrace([emvE], [1], 'EMV = 1/X̄ₙ', COLORS.orange, { marker: { color: COLORS.orange, size: 11, symbol: 'diamond' } }),
        ],
        {
          title: `E(θ⁻¹) : Lₙ(ϑ) = ϑⁿ e^(−ϑ ΣXᵢ), n = ${n}`,
          xaxis: { title: 'ϑ', range: [0, 3 / theta] },
          yaxis: { title: 'Lₙ(ϑ) / max Lₙ', range: [-0.05, 1.1] },
          shapes: [vline(1 / theta, COLORS.red, 'dash')],
          showlegend: false,
        },
      )
      const nbOut = xu.filter((x) => x > mom).length
      info.innerHTML = richToHtml(
        `**Uniforme (Ex. 1.11, cas non régulier).** $X_{n:n}=${xmax.toFixed(3)}$ est l’EMV (vraie valeur $\\theta=${theta}$) : toute valeur $\\vartheta<X_{n:n}$ est **impossible** (vraisemblance nulle), toute valeur $>X_{n:n}$ dilue la densité ($\\vartheta^{-n}$). La fonction n’est pas dérivable en son maximum : **ne pas dériver**, étudier directement (Méthode 1.2, cas 2). Comme $X_{n:n}\\le\\theta$ toujours, l’EMV sous-estime : $\\mathbb{E}_\\theta[X_{n:n}]=\\frac n{n+1}\\theta=${((n / (n + 1)) * theta).toFixed(3)}$. L’estimateur des moments $2\\bar X_n=${mom.toFixed(3)}$ (trait vert, $e(\\theta)=\\theta/2$) ignore la contrainte $X_i\\le\\theta$ : ici ${nbOut} observation(s) le dépassent. **Exponentielle (Ex. 1.7, cas régulier).** $\\ell_n(\\vartheta)=\\log\\vartheta-\\vartheta\\bar X_n$ strictement concave, EMV $1/\\bar X_n=${emvE.toFixed(3)}$ (vraie intensité $1/\\theta=${(1 / theta).toFixed(3)}$) obtenu par annulation du score : pic lisse, qui se resserre quand $n$ augmente.`,
      )
    }

    controls.append(
      slider({
        label: '$\\theta$',
        min: 0.5,
        max: 4,
        step: 0.1,
        value: theta,
        format: (v) => v.toFixed(1),
        onChange: (v) => {
          theta = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$n$',
        min: 2,
        max: 60,
        step: 1,
        value: n,
        onChange: (v) => {
          n = v
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
