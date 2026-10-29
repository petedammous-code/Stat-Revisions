import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, hline, vline, COLORS, hexToRgba } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, exponential } from '../../../sim/rng'
import { normalCdf, normalQuantile, chi2Cdf, chi2Quantile, linspace } from '../../../sim/stats'

type Model = 'gauss' | 'expo'

const fmtP = (p: number): string => (p >= 0.001 ? p.toFixed(3) : p.toExponential(1).replace('e', '\\cdot10^{') + '}')

/** Fonction puissance du test unilatéral U.P.P. (Th. 1.3) : modèle gaussien (Ex. 1.3) ou exponentiel de moyenne θ (Exercice 1 / PC5 Ex. 1). */
export const vizPuissanceUpp: Viz = {
  id: 'ch5-puissance-upp',
  title: 'Fonction puissance du test U.P.P. unilatéral',
  description:
    'Test U.P.P.($\\alpha$) de $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$. Modèle gaussien $\\mathcal{N}(\\theta,1)$ : rejet si $\\bar X_n>\\theta_0+z_{1-\\alpha}/\\sqrt n$, $\\beta(\\theta)=1-\\Phi(z_{1-\\alpha}-\\sqrt n(\\theta-\\theta_0))$. Modèle exponentiel de **moyenne** $\\theta$ (Exercice 1, PC5 Ex. 1) : rejet si $\\sum_iX_i>\\frac{\\theta_0}2\\chi^2_{1-\\alpha}(2n)$, $\\beta(\\theta)=\\mathbb{P}\\big(\\chi^2(2n)>\\theta_0\\chi^2_{1-\\alpha}(2n)/\\theta\\big)$. Curseurs $\\theta_0$, $n$, $\\alpha$ ; le bouton simule 400 tests sous $\\mathbb{P}_\\theta$ (curseur $\\theta$) et ajoute la fréquence de rejet observée.',
  source: 'Poly ch.5, Th. 1.3, Ex. 1.3 (figure p. 18), Exercice 1 ; PC5 Ex. 1 ; CC 2022 Ex. 1 Q4',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    const h = plot(plotEl, [], {})
    let model: Model = 'gauss'
    let theta0 = 1
    let n = 10
    let alpha = 0.05
    let thetaSim = 1.5
    let seed = 1
    let pts: { t: number; f: number }[] = []

    const power = (t: number): number => {
      if (model === 'gauss') return 1 - normalCdf(normalQuantile(1 - alpha) - Math.sqrt(n) * (t - theta0))
      const q = chi2Quantile(1 - alpha, 2 * n)
      return 1 - chi2Cdf((theta0 * q) / t, 2 * n)
    }
    const range = (): [number, number] => (model === 'gauss' ? [theta0 - 2, theta0 + 2] : [0.05, 3 * theta0])

    const draw = () => {
      const [a, b] = range()
      const grid = linspace(a, b, 300)
      const beta = grid.map(power)
      h.update(
        [
          lineTrace(grid, beta, 'β(θ) théorique', COLORS.blue),
          pointsTrace(pts.map((p) => p.t), pts.map((p) => p.f), 'fréquence de rejet simulée (400 tests)', COLORS.orange, { marker: { color: COLORS.orange, size: 9, symbol: 'diamond' } }),
        ],
        {
          title: { text: model === 'gauss' ? `N(θ,1), n = ${n} : rejet si X̄ₙ > θ₀ + z₁₋α/√n` : `Exponentielle de moyenne θ, n = ${n} : rejet si ΣXᵢ > θ₀χ²₁₋α(2n)/2` },
          xaxis: { title: { text: 'θ' }, range: [a, b] },
          yaxis: { title: { text: 'β(θ) = P_θ(rejeter H₀)' }, range: [-0.02, 1.02] },
          shapes: [
            { type: 'rect', x0: a, x1: theta0, y0: 0, y1: 1, yref: 'paper', fillcolor: hexToRgba(COLORS.red, 0.07), line: { width: 0 } },
            hline(alpha, COLORS.red, 'dash'),
            vline(theta0, COLORS.gray, 'dot'),
            vline(thetaSim, COLORS.orange, 'dot'),
          ],
        },
      )
      const thr = model === 'gauss' ? theta0 + normalQuantile(1 - alpha) / Math.sqrt(n) : (theta0 * chi2Quantile(1 - alpha, 2 * n)) / 2
      const bLow = power(model === 'gauss' ? theta0 - 0.5 : theta0 / 2)
      info.innerHTML = richToHtml(
        `Seuil calculé **sous $\\mathbb{P}_{\\theta_0}$** : ${model === 'gauss' ? `$d_\\alpha=\\theta_0+z_{1-\\alpha}/\\sqrt n=${thr.toFixed(3)}$` : `$c=\\frac{\\theta_0}2\\chi^2_{1-\\alpha}(2n)=${thr.toFixed(3)}$ (pour $n=10$, $\\theta_0=1$, $\\alpha=0{,}05$ : $15{,}705$)`}. La puissance vaut $\\alpha=${alpha.toFixed(2)}$ en $\\theta_0$ et elle est **croissante** (Lemme 2.1) : sur toute la zone rouge $H_0=\\{\\theta\\le\\theta_0\\}$ elle reste $\\le\\alpha$ (par ex. $\\beta=${fmtP(bLow)}$ en $\\theta=${(model === 'gauss' ? theta0 - 0.5 : theta0 / 2).toFixed(2)}$), d’où un niveau $\\alpha$ sur l’hypothèse composite en ne contrôlant la taille qu’en $\\theta_0$ (Th. 1.3, temps 3). En $\\theta=${thetaSim.toFixed(2)}$ : $\\beta=${power(thetaSim).toFixed(3)}$. Augmenter $n$ rend la courbe plus raide : l’alternative est mieux détectée, à niveau inchangé.`,
      )
    }

    const reset = () => {
      pts = []
      draw()
    }
    const thetaSlider = slider({ label: '$\\theta$ simulé', min: 0.05, max: 3, step: 0.05, value: thetaSim, format: (v) => v.toFixed(2), onChange: (v) => { thetaSim = v; draw() } })
    const syncTheta = () => {
      const [a, b] = range()
      thetaSlider.configure({ min: Math.round(a * 20) / 20, max: Math.round(b * 20) / 20, value: Math.min(b, Math.max(a, thetaSim)) })
      thetaSim = thetaSlider.get()
    }
    controls.append(
      segmented<Model>(
        [
          { value: 'gauss', label: 'gaussien (Ex. 1.3)' },
          { value: 'expo', label: 'exponentiel, moyenne θ (PC5 Ex. 1)' },
        ],
        model,
        (v) => {
          model = v
          syncTheta()
          reset()
        },
      ),
    )
    controls.append(slider({ label: '$\\theta_0$', min: 0.5, max: 2, step: 0.1, value: theta0, format: (v) => v.toFixed(1), onChange: (v) => { theta0 = v; syncTheta(); reset() } }).root)
    controls.append(slider({ label: '$n$', min: 1, max: 60, step: 1, value: n, onChange: (v) => { n = v; reset() } }).root)
    controls.append(slider({ label: '$\\alpha$', min: 0.01, max: 0.2, step: 0.01, value: alpha, format: (v) => v.toFixed(2), onChange: (v) => { alpha = v; reset() } }).root)
    controls.append(thetaSlider.root)
    controls.append(
      button('Simuler 400 tests en θ', () => {
        const rng = makeRng(9100 + seed++)
        const R = 400
        let rej = 0
        const thr = model === 'gauss' ? theta0 + normalQuantile(1 - alpha) / Math.sqrt(n) : (theta0 * chi2Quantile(1 - alpha, 2 * n)) / 2
        for (let r = 0; r < R; r++) {
          let s = 0
          for (let i = 0; i < n; i++) s += model === 'gauss' ? normal(rng, thetaSim, 1) : exponential(rng, 1 / thetaSim)
          const stat = model === 'gauss' ? s / n : s
          if (stat > thr) rej++
        }
        pts.push({ t: thetaSim, f: rej / R })
        draw()
      }),
    )
    controls.append(button('Effacer les points', reset))
    syncTheta()
    draw()
    return () => h.destroy()
  },
}
