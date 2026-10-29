import type { Viz } from '../../types'
import { vizFrame, slider } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, hline, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { normalCdf, normalQuantile } from '../../../sim/stats'

/** Taille d'effet (§1.10) : puissance 1 − Φ(z_{1−α} − √n m/σ) en fonction de n, et effet minimal détectable en n^{−1/2}. */
export const vizTailleEffet: Viz = {
  id: 'ch5-taille-effet',
  title: 'Taille d’effet : l’effet détectable décroît en 1/√n',
  description:
    'Test U.P.P. de l’Ex. 1.3 (gaussien, $\\sigma$ connu). À gauche : puissance $\\beta(n)=1-\\Phi\\big(z_{1-\\alpha}-\\sqrt n\\,m/\\sigma\\big)$ en fonction de $n$ (échelle log) pour l’effet $m=\\mu_1-\\mu_0$ choisi. À droite : effet minimal détectable à puissance $\\pi$ fixée, $m_{\\min}(n)=\\sigma(z_{1-\\alpha}+z_\\pi)/\\sqrt n$ (échelles log-log : droite de pente $-1/2$). Curseurs $m$, $\\sigma$, $\\alpha$, $\\pi$.',
  source: 'Poly ch.5, §1.10 « Statistiquement significatif, et taille d’effet » ; Ex. 1.3 (figure p. 18) ; Poly ch.4, Ex. 2.14',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})
    let m = 0.2
    let sigma = 1
    let alpha = 0.05
    let pi = 0.8

    const draw = () => {
      const za = normalQuantile(1 - alpha)
      const zp = normalQuantile(pi)
      const ns: number[] = []
      for (let e = 0; e <= 4.0001; e += 0.02) ns.push(Math.pow(10, e))
      const pow = ns.map((nn) => 1 - normalCdf(za - (Math.sqrt(nn) * m) / sigma))
      const nStar = Math.pow(((za + zp) * sigma) / m, 2)
      hLeft.update(
        [lineTrace(ns, pow, `puissance pour m = ${m.toFixed(2)}`, COLORS.blue), pointsTrace([nStar], [pi], 'n nécessaire', COLORS.red, { marker: { color: COLORS.red, size: 10 } })],
        {
          title: { text: `Puissance β(n), m = ${m.toFixed(2)}` },
          xaxis: { title: { text: 'n' }, type: 'log' },
          yaxis: { title: { text: 'puissance β(n)' }, range: [0, 1.02] },
          shapes: [hline(pi, COLORS.red, 'dash'), hline(alpha, COLORS.gray, 'dot')],
          showlegend: false,
        },
      )
      const mmin = ns.map((nn) => (sigma * (za + zp)) / Math.sqrt(nn))
      hRight.update(
        [lineTrace(ns, mmin, `m_min(n), puissance ${pi.toFixed(2)}`, COLORS.purple), pointsTrace([1e4], [(sigma * (za + zp)) / 100], 'n = 10 000', COLORS.orange, { marker: { color: COLORS.orange, size: 10 } })],
        {
          title: { text: 'Effet minimal détectable m_min(n)' },
          xaxis: { title: { text: 'n' }, type: 'log' },
          yaxis: { title: { text: 'effet minimal m_min(n)' }, type: 'log' },
          shapes: [vline(1e4, COLORS.orange, 'dot')],
          showlegend: false,
        },
      )
      info.innerHTML = richToHtml(
        `Pour détecter $m=${m.toFixed(2)}$ avec probabilité $\\pi=${pi.toFixed(2)}$ au niveau $\\alpha=${alpha.toFixed(2)}$, il faut $n\\ge\\big(\\sigma(z_{1-\\alpha}+z_\\pi)/m\\big)^2\\approx${Math.ceil(nStar)}$. Avec $n=10\\,000$, l’effet minimal détectable est $m_{\\min}\\approx${((sigma * (za + zp)) / 100).toFixed(4)}$ : un très grand essai **ne fabrique pas** d’effets inexistants (sous $H_0$, il rejette avec probabilité $\\alpha$ quel que soit $n$), il détecte des effets **petits**. Inversement, un résultat significatif sur peu de participants signifie que l’effet est grand. **La conclusion d’un test se lit toujours avec la taille d’effet à côté** (Poly ch.5, §1.10).`,
      )
    }

    controls.append(slider({ label: '$m$ (effet)', min: 0.01, max: 2, step: 0.01, value: m, format: (v) => v.toFixed(2), onChange: (v) => { m = v; draw() } }).root)
    controls.append(slider({ label: '$\\sigma$', min: 0.2, max: 3, step: 0.1, value: sigma, format: (v) => v.toFixed(1), onChange: (v) => { sigma = v; draw() } }).root)
    controls.append(slider({ label: '$\\alpha$', min: 0.001, max: 0.2, step: 0.001, value: alpha, format: (v) => v.toFixed(3), onChange: (v) => { alpha = v; draw() } }).root)
    controls.append(slider({ label: 'puissance visée $\\pi$', min: 0.5, max: 0.99, step: 0.01, value: pi, format: (v) => v.toFixed(2), onChange: (v) => { pi = v; draw() } }).root)
    draw()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
