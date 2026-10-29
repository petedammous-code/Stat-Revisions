import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, areaTrace, vline, hline, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal } from '../../../sim/rng'
import { normalCdf, normalQuantile, studentCdf, studentQuantile, linspace } from '../../../sim/stats'

type Kind = 'z' | 'student'

/** Dualité intervalle de confiance ↔ test bilatéral : l'IC est l'ensemble des μ0 non rejetés. */
export const vizDualite: Viz = {
  id: 'ch4-dualite',
  title: 'Dualité : l’intervalle de confiance est l’ensemble des valeurs non rejetées',
  description:
    'Modèle $\\mathcal{N}(\\mu,\\sigma^2)$, vraie valeur $\\mu=1$, $\\sigma=1$. Pour **chaque** valeur testée $\\mu_0$, on calcule la $p$-valeur du test bilatéral de $H_0:\\mu=\\mu_0$ contre $H_1:\\mu\\ne\\mu_0$ ($z$-test si $\\sigma$ est connu, Ex. 2.10 ; test de Student sinon, Ex. 2.11) : la courbe $\\mu_0\\mapsto\\hat\\alpha(Z;\\mu_0)$ culmine à $1$ en $\\mu_0=\\bar X_n$. Les $\\mu_0$ **non rejetés** au niveau $\\alpha$ (courbe au-dessus de la droite $y=\\alpha$) forment exactement l’intervalle de confiance de niveau $1-\\alpha$ (bande verte) : on rejette $H_0:\\mu=\\mu_0$ si et seulement si $\\mu_0\\notin\\mathcal{I}(Z)$ (§2.6, Compléments Ex. 5.1). Curseurs $\\alpha$, $n$ et $\\mu_0$ ; bouton pour un nouvel échantillon.',
  source: 'Poly ch.4, §2.6, Ex. 2.10, Ex. 2.11, Ex. 2.15 ; Compléments, Ex. 5.1 et dualité (hors programme)',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let n = 20
    let alpha = 0.05
    let mu0 = 1.4
    let kind: Kind = 'z'
    let seed = 5
    const handle = plot(plotEl, [], {})
    let xbar = 0
    let sn = 1

    const resample = () => {
      const rng = makeRng(8200 + seed)
      let s = 0
      const xs: number[] = []
      for (let i = 0; i < n; i++) {
        const x = normal(rng, 1, 1)
        xs.push(x)
        s += x
      }
      xbar = s / n
      let ss = 0
      for (const x of xs) ss += (x - xbar) * (x - xbar)
      sn = Math.sqrt(ss / (n - 1))
    }

    const pval = (m: number) => {
      if (kind === 'z') return 2 * (1 - normalCdf(Math.sqrt(n) * Math.abs(xbar - m)))
      return 2 * (1 - studentCdf((Math.sqrt(n) * Math.abs(xbar - m)) / sn, n - 1))
    }

    const draw = () => {
      const q = kind === 'z' ? normalQuantile(1 - alpha / 2) : studentQuantile(1 - alpha / 2, n - 1)
      const half = (q * (kind === 'z' ? 1 : sn)) / Math.sqrt(n)
      const lo = xbar - half
      const hi = xbar + half
      const xs = linspace(-0.5, 2.5, 600)
      const ps = xs.map(pval)
      const band = xs.map((x) => (x >= lo && x <= hi ? 1 : 0))
      const p0 = pval(mu0)
      const rejected = p0 <= alpha
      handle.update(
        [
          areaTrace(xs, band, `IC de niveau ${(100 * (1 - alpha)).toFixed(0)} %`, COLORS.green),
          lineTrace(xs, ps, 'p-valeur du test de H₀ : μ = μ₀', COLORS.blue),
          pointsTrace([mu0], [p0], 'μ₀ testé', rejected ? COLORS.red : COLORS.green, { marker: { color: rejected ? COLORS.red : COLORS.green, size: 12, symbol: 'diamond' } }),
        ],
        {
          title: { text: `X̄ₙ = ${xbar.toFixed(3)}, IC = [${lo.toFixed(3)} ; ${hi.toFixed(3)}]` },
          xaxis: { title: { text: 'valeur testée μ₀' }, range: [-0.5, 2.5] },
          yaxis: { title: { text: 'p-valeur' }, range: [0, 1.05] },
          shapes: [hline(alpha, COLORS.red, 'dash'), vline(1, COLORS.gray, 'dot'), vline(mu0, rejected ? COLORS.red : COLORS.green, 'solid')],
        },
      )
      const ic =
        kind === 'z'
          ? `$\\mathcal{I}_{n,\\alpha}=[\\bar X_n\\pm z_{1-\\alpha/2}\\sigma/\\sqrt n]=[${lo.toFixed(3)};${hi.toFixed(3)}]$`
          : `$[\\bar X_n\\pm S_n\\mathrm{t}^{(n-1)}_{1-\\alpha/2}/\\sqrt n]=[${lo.toFixed(3)};${hi.toFixed(3)}]$ ($S_n=${sn.toFixed(3)}$)`
      info.innerHTML = richToHtml(
        `Intervalle de niveau $1-\\alpha=${(1 - alpha).toFixed(2)}$ : ${ic}. Valeur testée $\\mu_0=${mu0.toFixed(2)}$ : $p$-valeur $${p0.toFixed(4)}$ ⇒ ${rejected ? `**rejet** de $H_0:\\mu=\\mu_0$ au niveau $\\alpha$, et $\\mu_0\\notin$ IC` : `**on échoue à rejeter** $H_0:\\mu=\\mu_0$, et $\\mu_0\\in$ IC`}. Les deux énoncés sont toujours simultanément vrais ou faux : c’est la **dualité**. La vraie valeur $\\mu=1$ (pointillés) est rejetée à tort avec probabilité $\\alpha$ — c’est la même chose que « l’IC rate $\\mu$ ». Un test **unilatéral** correspondrait, lui, à une **borne** de confiance.`,
      )
    }

    controls.append(
      segmented<Kind>(
        [
          { value: 'z', label: '$\\sigma$ connu ($z$-test)' },
          { value: 'student', label: '$\\sigma$ inconnu (Student)' },
        ],
        kind,
        (v) => {
          kind = v
          draw()
        },
      ),
    )
    controls.append(
      slider({
        label: '$\\alpha$',
        min: 0.01,
        max: 0.3,
        step: 0.005,
        value: alpha,
        format: (v) => v.toFixed(3),
        onChange: (v) => {
          alpha = v
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$n$',
        min: 3,
        max: 200,
        step: 1,
        value: n,
        onChange: (v) => {
          n = v
          resample()
          draw()
        },
      }).root,
    )
    controls.append(
      slider({
        label: '$\\mu_0$ testé',
        min: -0.5,
        max: 2.5,
        step: 0.01,
        value: mu0,
        format: (v) => v.toFixed(2),
        onChange: (v) => {
          mu0 = v
          draw()
        },
      }).root,
    )
    controls.append(
      button('Tirer un échantillon', () => {
        seed++
        resample()
        draw()
      }),
    )
    resample()
    draw()
    return () => handle.destroy()
  },
}
