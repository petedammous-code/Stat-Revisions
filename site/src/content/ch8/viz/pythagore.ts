import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, COLORS } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal } from '../../../sim/rng'
import { linspace } from '../../../sim/stats'

type Fonction = 'sinus' | 'parabole' | 'affine'

const F: Record<Fonction, (x: number) => number> = {
  sinus: (x) => Math.sin(2 * Math.PI * x),
  parabole: (x) => 4 * (x - 0.5) ** 2 - 0.5,
  affine: (x) => 1.5 * x - 0.5,
}

/** Théorème 1.1 : risque d’une droite = erreur incompressible + distance à l’espérance conditionnelle. */
export const vizPythagore: Viz = {
  id: 'ch8-pythagore',
  title: 'Régression quadratique : le théorème de Pythagore du Th. 1.1',
  description:
    'Modèle $Y=f(X)+\\varepsilon$, $X\\sim\\mathcal{U}([0,1])$, $\\varepsilon\\sim\\mathcal{N}(0,\\sigma^2)$ indépendant : $g^\\star(X)=\\mathbb{E}[Y\\mid X]=f(X)$. On propose une droite $g(x)=a+bx$ (curseurs $a$, $b$). À gauche : un échantillon, $g^\\star$ et $g$. À droite : $R_2(g)$ décomposé en **erreur incompressible** $\\mathbb{E}[(Y-g^\\star(X))^2]=\\sigma^2$ et **distance** $\\mathbb{E}[(g^\\star(X)-g(X))^2]$, plus le risque empirique de $g$ sur l’échantillon. Bouton « meilleure droite » : projection de $f$ sur les fonctions affines.',
  source: 'Poly ch.8, Th. 1.1 et Outils Th. 2.2 (Figure 6) ; Ex. 1.5',
  mount(container) {
    const { controls, plots, info } = vizFrame(container, { plots: 2 })
    const hL = plot(plots[0], [], {})
    const hR = plot(plots[1], [], {})
    let fn: Fonction = 'sinus'
    let a = 0
    let b = 0
    let sigma = 0.5
    let seed = 1
    const xs = linspace(0, 1, 401)
    const dx = xs[1] - xs[0]

    const dist = (f: (x: number) => number) => {
      let s = 0
      for (let i = 0; i < xs.length; i++) {
        const w = i === 0 || i === xs.length - 1 ? 0.5 : 1
        s += w * (f(xs[i]) - (a + b * xs[i])) ** 2 * dx
      }
      return s
    }

    const draw = () => {
      const f = F[fn]
      const rng = makeRng(6400 + seed)
      const n = 200
      const px: number[] = []
      const py: number[] = []
      let emp = 0
      for (let i = 0; i < n; i++) {
        const x = rng()
        const y = f(x) + normal(rng, 0, sigma)
        px.push(x)
        py.push(y)
        emp += (y - (a + b * x)) ** 2 / n
      }
      const d = dist(f)
      const s2 = sigma * sigma
      hL.update(
        [
          pointsTrace(px, py, 'échantillon (X, Y)', COLORS.gray, { marker: { color: COLORS.gray, size: 5, opacity: 0.6 } }),
          lineTrace(xs, xs.map(f), 'g*(x) = E[Y | X = x]', COLORS.green),
          lineTrace(xs, xs.map((x) => a + b * x), 'g(x) = a + b x', COLORS.orange),
        ],
        { title: 'Données, espérance conditionnelle et prédicteur g', xaxis: { title: 'x', range: [0, 1] }, yaxis: { title: 'y' } },
      )
      hR.update(
        [
          { type: 'bar', x: ['R₂(g*)', 'R₂(g)'], y: [s2, s2], name: 'erreur incompressible σ²', marker: { color: '#9ca3af' } },
          { type: 'bar', x: ['R₂(g*)', 'R₂(g)'], y: [0, d], name: 'distance E[(g* − g)²]', marker: { color: COLORS.orange } },
          { type: 'scatter', mode: 'markers', x: ['R₂(g)'], y: [emp], name: 'risque empirique de g', marker: { color: '#111827', size: 12, symbol: 'diamond' } },
        ],
        { title: 'Décomposition du risque quadratique', barmode: 'stack', yaxis: { title: 'risque', rangemode: 'tozero' } },
      )
      info.innerHTML = richToHtml(
        `$R_2(g)=\\sigma^2+\\mathbb{E}[(g^\\star(X)-g(X))^2]=${s2.toFixed(3)}+${d.toFixed(3)}=${(s2 + d).toFixed(3)}$ ; risque empirique sur l’échantillon : $${emp.toFixed(3)}$ (il fluctue autour de $R_2(g)$ : LGN pour $g$ **fixée**). Aucune droite ne descend sous $R^\\star_2=\\sigma^2=${s2.toFixed(3)}$ : c’est l’**erreur incompressible**, la part de $Y$ que $X$ n’explique pas. Le terme croisé $2\\,\\mathbb{E}[(Y-g^\\star(X))(g^\\star(X)-g(X))]$ est nul par **orthogonalité** de la projection (Th. 2.2 (ii)). La « meilleure droite » minimise la distance parmi les fonctions affines mais ne l’annule pas si $f$ n’est pas affine : restreindre la classe crée une erreur d’approximation (ch.9).`,
      )
    }

    const sA = slider({ label: '$a$', min: -2, max: 2, step: 0.01, value: a, format: (v) => v.toFixed(2), onChange: (v) => ((a = v), draw()) })
    const sB = slider({ label: '$b$', min: -4, max: 4, step: 0.01, value: b, format: (v) => v.toFixed(2), onChange: (v) => ((b = v), draw()) })
    controls.append(
      segmented<Fonction>(
        [
          { value: 'sinus', label: '$f(x)=\\sin(2\\pi x)$' },
          { value: 'parabole', label: 'parabole' },
          { value: 'affine', label: 'affine' },
        ],
        fn,
        (v) => ((fn = v), draw()),
      ),
      sA.root,
      sB.root,
      slider({ label: '$\\sigma$', min: 0.05, max: 1.5, step: 0.05, value: sigma, format: (v) => v.toFixed(2), onChange: (v) => ((sigma = v), draw()) }).root,
      button('Meilleure droite', () => {
        // projection L² de f sur Vect(1, x) pour X uniforme sur [0, 1] : b = 12 Cov(X, f(X)), a = E f - b/2
        const f = F[fn]
        let ef = 0
        let exf = 0
        for (let i = 0; i < xs.length; i++) {
          const w = (i === 0 || i === xs.length - 1 ? 0.5 : 1) * dx
          ef += w * f(xs[i])
          exf += w * xs[i] * f(xs[i])
        }
        b = 12 * (exf - 0.5 * ef)
        a = ef - b / 2
        sA.set(Math.max(-2, Math.min(2, a)))
        sB.set(Math.max(-4, Math.min(4, b)))
        draw()
      }),
      button('Tirer un échantillon', () => {
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
