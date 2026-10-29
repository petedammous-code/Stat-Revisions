import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented, toggle } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal } from '../../../sim/rng'
import { linspace } from '../../../sim/stats'
import { sigm, log2OnePlusExp } from './outils'

type Loss = 'hinge' | 'exp' | 'logist' | 'quad'

const LOSSES: Record<Loss, { label: string; tex: string; phi: (z: number) => number; color: string }> = {
  hinge: { label: 'charnière', tex: '\\max(1+z,0)', phi: (z) => Math.max(1 + z, 0), color: '#111827' },
  exp: { label: 'exponentielle', tex: 'e^{z}', phi: (z) => Math.exp(z), color: COLORS.red },
  logist: { label: 'logistique', tex: '\\log_2(1+e^{z})', phi: (z) => log2OnePlusExp(z), color: COLORS.green },
  quad: { label: 'quadratique', tex: '(z+1)^2', phi: (z) => (z + 1) * (z + 1), color: COLORS.purple },
}
const phi1 = (z: number) => (z >= 0 ? 1 : 0)

/** Pertes de substitution (Fig. 6) et risque 0-1 en escalier contre φ-risque convexe (Fig. 5 et 7). */
export const vizPertesConvexes: Viz = {
  id: 'ch9-pertes-convexes',
  title: 'Convexifier la perte 0-1 : pertes de substitution, risque en escalier contre φ-risque convexe',
  description:
    'À gauche (Fig. 6) : la perte 0-1 $\\varphi_1=\\mathbf{1}_{[0,+\\infty[}$ et les pertes de substitution $\\varphi$ en fonction de $z=-y\\,h(\\mathbf x)$ (moins la marge) ; cases à cocher pour chaque perte. À droite (Fig. 5 et 7) : données 1D, famille de classifieurs doux $h_\\theta(x)=2(x-\\theta)$ ; en fonction de $\\theta$, le risque empirique 0-1 de $\\operatorname{signe}(h_\\theta)$ (constant par morceaux, en paliers) et le $\\varphi$-risque empirique $\\widehat{\\mathrm R}_{n,\\varphi}(h_\\theta)$ (convexe), avec leurs minimiseurs. Choix de la perte, curseur $n$, bouton « Tirer ».',
  source: 'Poly ch.9, §1.4 : éq. (4), tableau et Fig. 6 p. 23, Déf. 1.3, Prop. 1.3, Fig. 5 et 7',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const shown: Record<Loss, boolean> = { hinge: true, exp: true, logist: true, quad: false }
    let loss: Loss = 'logist'
    let n = 30
    let seed = 1
    const hLeft = plot(plots[0], [], {})
    const hRight = plot(plots[1], [], {})

    const drawLeft = () => {
      const zs = linspace(-3, 2, 501)
      const traces = [lineTrace(zs, zs.map(phi1), 'perte 0-1 : 𝟙[0,+∞[(z)', COLORS.blue, { line: { color: COLORS.blue, width: 3, shape: 'hv' } })]
      for (const k of Object.keys(LOSSES) as Loss[]) {
        if (!shown[k]) continue
        traces.push(lineTrace(zs, zs.map(LOSSES[k].phi), LOSSES[k].label, LOSSES[k].color))
      }
      hLeft.update(traces, {
        title: 'Pertes en fonction de z = −y h(x)',
        xaxis: { title: 'z = −y h(x)  (z < 0 : bonne prédiction)', range: [-3, 2] },
        yaxis: { title: 'φ(z)', range: [-0.1, 4] },
        shapes: [vline(0, COLORS.gray, 'dot'), vline(-1, COLORS.gray, 'dot')],
      })
    }

    const drawRight = () => {
      const rng = makeRng(9600 + seed)
      const xs: number[] = []
      const ys: number[] = []
      for (let i = 0; i < n; i++) {
        const x = normal(rng, 0, 1)
        xs.push(x)
        ys.push(rng() < sigm(1.2 * x) ? 1 : -1)
      }
      const thetas = linspace(-2.5, 2.5, 501)
      const sgn = (t: number) => (t > 0 ? 1 : -1)
      const r01 = thetas.map((th) => xs.reduce((s, x, i) => s + (sgn(2 * (x - th)) !== ys[i] ? 1 : 0), 0) / n)
      const L = LOSSES[loss]
      const rphi = thetas.map((th) => xs.reduce((s, x, i) => s + L.phi(-ys[i] * 2 * (x - th)), 0) / n)
      const min01 = Math.min(...r01)
      const i01 = r01.indexOf(min01)
      const iphi = rphi.indexOf(Math.min(...rphi))
      hRight.update(
        [
          lineTrace(thetas, r01, 'risque empirique 0-1 (en paliers)', COLORS.orange, { line: { color: COLORS.orange, width: 2.5, shape: 'hv' } }),
          lineTrace(thetas, rphi, `φ-risque empirique (${L.label})`, COLORS.blue),
          pointsTrace(xs, xs.map((_, i) => (ys[i] === 1 ? -0.05 : -0.12)), 'observations (haut : +1, bas : −1)', COLORS.gray, { marker: { color: COLORS.gray, size: 7, symbol: 'line-ns-open' } }),
        ],
        {
          title: `n = ${n} : minimiseurs θ = ${thetas[i01].toFixed(2)} (0-1) et ${thetas[iphi].toFixed(2)} (${L.label})`,
          xaxis: { title: 'θ (classifieur doux h_θ(x) = 2(x − θ))' },
          yaxis: { title: 'risque empirique', range: [-0.2, Math.min(4, Math.max(1.2, Math.min(...rphi) * 2.2))] },
          shapes: [vline(thetas[i01], COLORS.orange, 'dot'), vline(thetas[iphi], COLORS.blue, 'dash')],
        },
      )
      const atPhi = r01[iphi]
      info.innerHTML = richToHtml(
        `**Perte ${L.label}** $\\varphi(z)=${L.tex}$. ${loss === 'quad' ? 'Elle est convexe, vaut 1 en 0 et majore $\\varphi_1$, mais **n’est pas croissante** (elle décroît sur $]-\\infty,-1]$) : elle pénalise aussi les prédictions correctes de grande marge, ce que montre la remontée du $\\varphi$-risque.' : 'Elle est convexe, croissante, vaut 1 en 0 et majore $\\varphi_1$ : ce sont les hypothèses du poly.'} À droite, le risque 0-1 est **constant par morceaux** (il ne change que lorsque $\\theta$ franchit une observation) : sa dérivée est nulle presque partout, et sa minimisation est combinatoire. Le $\\varphi$-risque empirique est **convexe** en $\\theta$ (composée de $\\varphi$ convexe et d’une application affine, Ex. 1.3). Par la Prop. 1.3, il majore le risque 0-1 en tout $\\theta$. Son minimiseur ($\\theta=${thetas[iphi].toFixed(2)}$, risque 0-1 $${atPhi.toFixed(3)}$) est voisin mais en général distinct de celui du risque 0-1 ($\\theta=${thetas[i01].toFixed(2)}$, risque $${min01.toFixed(3)}$).`,
      )
    }

    for (const k of Object.keys(LOSSES) as Loss[]) {
      controls.append(
        toggle(LOSSES[k].label, shown[k], (v) => {
          shown[k] = v
          drawLeft()
        }),
      )
    }
    controls.append(
      segmented<Loss>(
        (Object.keys(LOSSES) as Loss[]).map((k) => ({ value: k, label: `φ-risque : ${LOSSES[k].label}` })),
        loss,
        (v) => {
          loss = v
          drawRight()
        },
      ),
    )
    controls.append(slider({ label: '$n$', min: 5, max: 200, step: 1, value: n, onChange: (v) => { n = v; drawRight() } }).root)
    controls.append(button('Tirer un échantillon', () => { seed++; drawRight() }))
    drawLeft()
    drawRight()
    return () => {
      hLeft.destroy()
      hRight.destroy()
    }
  },
}
