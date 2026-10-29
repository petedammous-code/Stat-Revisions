import type { Viz } from '../../types'
import { vizFrame, slider, button } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, hline, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, uniform } from '../../../sim/rng'
import { linspace } from '../../../sim/stats'

/** Modèle uniforme : deux tests U.P.P. distincts (pur φ et randomisé φ'), même fonction puissance (Ex. 4.5, Exercice 7). */
export const vizUniforme: Viz = {
  id: 'ch5-uniforme',
  title: 'Modèle uniforme : deux tests U.P.P. de même puissance mais de décisions différentes',
  description:
    '$n$-échantillon $\\mathcal{U}([0,\\theta])$, $H_0:\\theta\\le\\theta_0=1$ contre $H_1:\\theta>1$. Test pur $\\phi=\\mathbb{1}_{\\{X_{n:n}>(1-\\alpha)^{1/n}\\}}$ et test randomisé $\\phi\'$ (rejet si $X_{n:n}>1$, sinon rejet avec probabilité $\\alpha$). À gauche : leurs fonctions puissance, **identiques**. À droite : 30 échantillons tirés sous $\\mathbb{P}_\\theta$, la valeur de $X_{n:n}$ et les décisions des deux tests. Curseurs $n$, $\\alpha$, $\\theta$ ; bouton « Tirer 30 échantillons ».',
  source: 'Poly ch.5, Compléments, Ex. 4.5, p. 54–55 ; Exercice 7 (corrigé p. 46)',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    const theta0 = 1
    let n = 5
    let alpha = 0.1
    let theta = 1.1
    let seed = 1

    const draw = () => {
      const d = theta0 * Math.pow(1 - alpha, 1 / n)
      const grid = linspace(0.5, 2, 300)
      const bPhi = grid.map((t) => (t <= d ? 0 : 1 - Math.pow(d / t, n)))
      const bPhiP = grid.map((t) => (t <= theta0 ? alpha : 1 - Math.pow(theta0 / t, n) + alpha * Math.pow(theta0 / t, n)))
      hLeft.update(
        [
          lineTrace(grid, bPhiP, "φ′ (randomisé)", COLORS.orange, { line: { color: COLORS.orange, width: 6 } }),
          lineTrace(grid, bPhi, 'φ (pur)', COLORS.blue, { line: { color: COLORS.blue, width: 2.5, dash: 'dash' } }),
        ],
        {
          title: { text: `Fonctions puissance, n = ${n}, α = ${alpha.toFixed(2)}` },
          xaxis: { title: { text: 'θ' } },
          yaxis: { title: { text: 'β(θ)' }, range: [-0.02, 1.02] },
          shapes: [hline(alpha, COLORS.red, 'dash'), vline(theta0, COLORS.gray, 'dot'), vline(theta, COLORS.purple, 'dot')],
        },
      )
      const rng = makeRng(2600 + seed)
      const M = 30
      const xs: number[] = []
      const ys: number[] = []
      const colPhi: string[] = []
      const colPhiP: string[] = []
      let disagree = 0
      let rejPhi = 0
      let rejPhiP = 0
      for (let j = 0; j < M; j++) {
        let mx = 0
        for (let i = 0; i < n; i++) mx = Math.max(mx, uniform(rng, 0, theta))
        const rPhi = mx > d
        const rPhiP = mx > theta0 ? true : rng() < alpha
        if (rPhi !== rPhiP) disagree++
        if (rPhi) rejPhi++
        if (rPhiP) rejPhiP++
        xs.push(mx)
        ys.push(j + 1)
        colPhi.push(rPhi ? COLORS.red : COLORS.green)
        colPhiP.push(rPhiP ? COLORS.red : COLORS.green)
      }
      hRight.update(
        [
          pointsTrace(xs, ys, '● φ (vert : garde H₀, rouge : rejet)', COLORS.blue, { marker: { color: colPhi, size: 7, symbol: 'circle' } }),
          pointsTrace(xs, ys.map((y) => y + 0.5), '◆ φ′, décalé de +0,5 (même code)', COLORS.orange, { marker: { color: colPhiP, size: 7, symbol: 'diamond' } }),
        ],
        {
          title: { text: `30 échantillons sous θ = ${theta.toFixed(2)} : Xₙ:ₙ et décisions` },
          xaxis: { title: { text: 'Xₙ:ₙ = max Xᵢ' }, range: [0, Math.max(1.05, theta * 1.05)] },
          yaxis: { title: { text: 'échantillon (● φ, ◆ φ′)' } },
          shapes: [vline(d, COLORS.blue, 'dash'), vline(theta0, COLORS.orange, 'dash')],
        },
      )
      info.innerHTML = richToHtml(
        `Seuil du test pur : $d_\\alpha=\\theta_0(1-\\alpha)^{1/n}=${d.toFixed(3)}$ (tiret bleu) ; le test $\\phi\'$ rejette d’office au-delà de $\\theta_0=1$ (tiret orange) et tire à pile ou face (probabilité $\\alpha$) en dessous. Pour $\\theta>\\theta_0$ : $\\beta_\\phi(\\theta)=1-(1-\\alpha)(\\theta_0/\\theta)^n=\\beta_{\\phi\'}(\\theta)$ ; pour $\\theta\\le\\theta_0$, $\\beta_{\\phi\'}=\\alpha$ et $\\beta_\\phi\\le\\alpha$. Les deux sont U.P.P.($\\alpha$). Sur ces 30 échantillons : $\\phi$ rejette ${rejPhi} fois, $\\phi\'$ ${rejPhiP} fois, et ils **sont en désaccord ${disagree} fois**. L’unicité du Th. 1.2 tombe parce que $\\{r(Z)=c\\}=\\{X_{n:n}\\le\\theta_0\\}$ n’est pas négligeable : le rapport de vraisemblance n’est croissant qu’au sens large (Déf. 1.4 non satisfaite, absence d’atome en défaut).`,
      )
    }

    controls.append(slider({ label: '$n$', min: 1, max: 30, step: 1, value: n, onChange: (v) => { n = v; draw() } }).root)
    controls.append(slider({ label: '$\\alpha$', min: 0.01, max: 0.3, step: 0.01, value: alpha, format: (v) => v.toFixed(2), onChange: (v) => { alpha = v; draw() } }).root)
    controls.append(slider({ label: '$\\theta$', min: 0.5, max: 2, step: 0.05, value: theta, format: (v) => v.toFixed(2), onChange: (v) => { theta = v; draw() } }).root)
    controls.append(button('Tirer 30 échantillons', () => { seed++; draw() }))
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
