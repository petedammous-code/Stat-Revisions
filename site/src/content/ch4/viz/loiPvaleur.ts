import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, barTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, binomial } from '../../../sim/rng'
import { normalCdf, binomialCdf, histogram, linspace } from '../../../sim/stats'

type Kind = 'continu' | 'discret'

const N_SIM = 5000
const N_GAUSS = 20
const THETA0_GAUSS = 2
const N_BIN = 30
const THETA0_BIN = 0.5

/** Loi de la p-valeur sous H0 (uniforme ou dominée) et sous H1 (concentrée près de 0). */
export const vizLoiPvaleur: Viz = {
  id: 'ch4-loi-pvaleur',
  title: 'Loi de la p-valeur : uniforme sous H₀, concentrée près de 0 sous H₁',
  description:
    'On simule $5000$ $p$-valeurs. **Cas continu** (figure p. 31 du poly) : $n=20$ observations $\\mathcal{N}(\\theta,1)$, test de $H_0:\\theta\\le\\theta_0=2$ de région de rejet $\\{\\bar X_n\\ge\\theta_0+z_{1-\\alpha}/\\sqrt n\\}$, $p$-valeur $\\hat\\alpha(Z)=1-\\Phi(\\sqrt n(\\bar X_n-\\theta_0))$. **Cas discret** (sondage, Ex. 2.5) : $n=30$ Bernoulli, $H_0:\\theta\\le1/2$, $p$-valeur $\\mathbb{P}_{1/2}(S_n\\ge s_{\\mathrm{obs}})$. À gauche, l’histogramme (densité) ; à droite, la fonction de répartition empirique $u\\mapsto\\mathbb{P}_\\theta(\\hat\\alpha(Z)\\le u)$ comparée à la diagonale. Curseur $\\theta$ : au bord $\\theta=\\theta_0$ du cas continu la loi est **uniforme** ; à l’intérieur de $\\Theta_0$ ou pour une statistique discrète elle est seulement **dominée** ($\\mathbb{P}_\\theta(\\hat\\alpha\\le u)\\le u$) ; sous $H_1$ elle se concentre près de $0$.',
  source: 'Poly ch.4, Prop. 2.2 et figure p. 31 ; Ex. 2.5',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    let kind: Kind = 'continu'
    let thetaG = 2
    let thetaB = 0.5
    let seed = 2
    const hL = plot(plots[0], [], {})
    const hR = plot(plots[1], [], {})
    // queue binomiale sous θ0 : P(S ≥ s), s = 0..N_BIN
    const tail = Array.from({ length: N_BIN + 2 }, (_, s) => (s === 0 ? 1 : 1 - binomialCdf(s - 1, N_BIN, THETA0_BIN)))

    const thetaSlider = slider({
      label: '$\\theta$',
      min: 1.5,
      max: 2.8,
      step: 0.01,
      value: thetaG,
      format: (v) => v.toFixed(2),
      onChange: (v) => {
        if (kind === 'continu') thetaG = v
        else thetaB = v
        draw()
      },
    })

    const draw = () => {
      const rng = makeRng(5100 + seed)
      const ps = new Array<number>(N_SIM)
      for (let r = 0; r < N_SIM; r++) {
        if (kind === 'continu') {
          // X̄_n ~ N(θ, 1/n) exactement : on tire directement la moyenne
          const xbar = normal(rng, thetaG, 1 / Math.sqrt(N_GAUSS))
          ps[r] = 1 - normalCdf(Math.sqrt(N_GAUSS) * (xbar - THETA0_GAUSS))
        } else {
          ps[r] = tail[binomial(rng, N_BIN, thetaB)]
        }
      }
      const h = histogram(ps, 20, 0, 1)
      hL.update([barTrace(h.centers, h.density, 'densité empirique des p-valeurs', COLORS.blue), lineTrace([0, 1], [1, 1], 'densité de U([0,1])', COLORS.gray, { line: { color: COLORS.gray, dash: 'dash', width: 2 } })], {
        title: { text: `histogramme de ${N_SIM} p-valeurs` },
        xaxis: { title: { text: 'p-valeur' }, range: [0, 1] },
        yaxis: { title: { text: 'densité' }, rangemode: 'tozero' },
        bargap: 0.02,
      })
      const us = linspace(0, 1, 101)
      const sorted = [...ps].sort((a, b) => a - b)
      let j = 0
      const ecdf = us.map((u) => {
        while (j < sorted.length && sorted[j] <= u + 1e-12) j++
        return j / sorted.length
      })
      hR.update([lineTrace(us, ecdf, 'u ↦ P(p-valeur ≤ u) (empirique)', COLORS.orange, { line: { color: COLORS.orange, width: 2.5, shape: 'hv' } }), lineTrace([0, 1], [0, 1], 'diagonale (loi uniforme)', COLORS.gray, { line: { color: COLORS.gray, dash: 'dash', width: 2 } })], {
        title: { text: 'fonction de répartition de la p-valeur' },
        xaxis: { title: { text: 'u' }, range: [0, 1] },
        yaxis: { title: { text: 'P(p-valeur ≤ u)' }, range: [0, 1.02] },
      })
      const at = (u: number) => ps.filter((p) => p <= u).length / N_SIM
      const th = kind === 'continu' ? thetaG : thetaB
      const t0 = kind === 'continu' ? THETA0_GAUSS : THETA0_BIN
      let regime: string
      if (Math.abs(th - t0) < 1e-9)
        regime =
          kind === 'continu'
            ? '$\\theta=\\theta_0$ et la taille vaut exactement $\\alpha$ pour tout $\\alpha$ (condition (2) de la Prop. 2.2) : la $p$-valeur est **uniforme** sur $]0,1[$ — elle ne porte aucune information.'
            : '$\\theta=\\theta_0$ mais la statistique est **discrète** : la condition (2) échoue, la loi n’est que **dominée** par $\\mathcal{U}([0,1])$ (escalier sous la diagonale, histogramme non plat).'
      else if (th < t0) regime = '$\\theta\\in\\Theta_0$ à l’intérieur : $\\mathbb{P}_\\theta(\\hat\\alpha\\le u)<u$, la $p$-valeur est **stochastiquement plus grande** qu’une uniforme (domination (1)).'
      else regime = '$\\theta\\in\\Theta_1$ : les petites $p$-valeurs deviennent fréquentes, la fonction de répartition passe **au-dessus** de la diagonale ; $\\mathbb{P}_\\theta(\\hat\\alpha\\le\\alpha)$ est la puissance du test de niveau $\\alpha$.'
      info.innerHTML = richToHtml(
        `${regime} Fréquences empiriques : $\\mathbb{P}_\\theta(\\hat\\alpha\\le0{,}05)\\approx${at(0.05).toFixed(3)}$, $\\mathbb{P}_\\theta(\\hat\\alpha\\le0{,}1)\\approx${at(0.1).toFixed(3)}$, $\\mathbb{P}_\\theta(\\hat\\alpha\\le0{,}5)\\approx${at(0.5).toFixed(3)}$. C’est ce contraste entre $H_0$ et $H_1$ qui autorise à lire une petite $p$-valeur comme une indication défavorable à $H_0$ — et rien de plus.`,
      )
    }

    controls.append(
      segmented<Kind>(
        [
          { value: 'continu', label: 'Continu (gaussien)' },
          { value: 'discret', label: 'Discret (binomial)' },
        ],
        kind,
        (v) => {
          kind = v
          if (v === 'continu') thetaSlider.configure({ min: 1.5, max: 2.8, step: 0.01, value: thetaG })
          else thetaSlider.configure({ min: 0.3, max: 0.8, step: 0.01, value: thetaB })
          draw()
        },
      ),
    )
    controls.append(thetaSlider.root)
    controls.append(
      button('Nouvelles simulations', () => {
        seed++
        draw()
      }),
    )
    draw()
    return () => {
      hL.destroy()
      hR.destroy()
    }
  },
}
