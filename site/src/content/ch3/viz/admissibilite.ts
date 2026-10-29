import type { Viz } from '../../types'
import { vizFrame, slider, button, segmented } from '../../../core/ui'
import { plot, lineTrace, pointsTrace, PALETTE } from '../../../core/plot'
import { richToHtml } from '../../../core/rich'
import { makeRng, normal, uniform, bernoulli, type Rng } from '../../../sim/rng'
import { linspace } from '../../../sim/stats'

type Scen = 'unif' | 'bern' | 'gvar'

interface Est {
  name: string
  risk: (theta: number, n: number, v: number) => number
  sample: (r: Rng, theta: number, n: number, v: number) => number
}

interface ScenSpec {
  label: string
  paramTex: string
  pMin: number
  pMax: number
  target: (theta: number) => number
  est: Est[]
  note: string
}

function sumUnif(r: Rng, th: number, n: number): { s: number; mx: number } {
  let s = 0
  let mx = 0
  for (let i = 0; i < n; i++) {
    const x = uniform(r, 0, th)
    s += x
    if (x > mx) mx = x
  }
  return { s, mx }
}

function sumGauss(r: Rng, s2: number, n: number): number {
  const s = Math.sqrt(s2)
  let a = 0
  let b = 0
  for (let i = 0; i < n; i++) {
    const x = normal(r, 0, s)
    a += x
    b += x * x
  }
  return b - (a * a) / n
}

const SCEN: Record<Scen, ScenSpec> = {
  unif: {
    label: 'Uniforme U([0, θ])',
    paramTex: '\\theta',
    pMin: 0.02,
    pMax: 2,
    target: (t) => t,
    est: [
      { name: '2X̄ₙ (moments)', risk: (t, n) => (t * t) / (3 * n), sample: (r, t, n) => (2 * sumUnif(r, t, n).s) / n },
      { name: 'X(n:n) (EMV)', risk: (t, n) => (2 * t * t) / ((n + 1) * (n + 2)), sample: (r, t, n) => sumUnif(r, t, n).mx },
      { name: '(n+1)/n · X(n:n) (sans biais)', risk: (t, n) => (t * t) / (n * (n + 2)), sample: (r, t, n) => ((n + 1) / n) * sumUnif(r, t, n).mx },
      { name: '(n+2)/(n+1) · X(n:n)', risk: (t, n) => (t * t) / ((n + 1) * (n + 1)), sample: (r, t, n) => ((n + 2) / (n + 1)) * sumUnif(r, t, n).mx },
    ],
    note: 'Toutes les courbes sont proportionnelles à $\\theta^2$ : elles sont **emboîtées**, la comparaison est uniforme. $2\\bar X_n$, $X_{n:n}$ et $\\frac{n+1}nX_{n:n}$ sont inadmissibles (PC3 Ex. 1 Q4–Q5 ; inadmissibilité transitive).',
  },
  bern: {
    label: 'Bernoulli B(θ)',
    paramTex: '\\theta',
    pMin: 0,
    pMax: 1,
    target: (t) => t,
    est: [
      { name: 'X̄ₙ', risk: (t, n) => (t * (1 - t)) / n, sample: (r, t, n) => { let s = 0; for (let i = 0; i < n; i++) s += bernoulli(r, t); return s / n } },
      { name: 'constant ϑ', risk: (t, _n, v) => (t - v) * (t - v), sample: (_r, _t, _n, v) => v },
      { name: '(nX̄ₙ+1)/(n+2)', risk: (t, n) => (n * t * (1 - t) + (1 - 2 * t) * (1 - 2 * t)) / ((n + 2) * (n + 2)), sample: (r, t, n) => { let s = 0; for (let i = 0; i < n; i++) s += bernoulli(r, t); return (s + 1) / (n + 2) } },
    ],
    note: 'Les courbes **se croisent** : aucun des trois n’en domine un autre. L’estimateur constant $\\hat\\theta_\\vartheta$ a un risque nul en $\\vartheta$ : il est **admissible** (Ex. 1.10) mais ignore les données ; d’où l’absence d’estimateur uniformément optimal. ($(n\\bar X_n+1)/(n+2)$ est une variante hors poly, biaisée vers $1/2$.)',
  },
  gvar: {
    label: 'Gaussien, estimation de σ²',
    paramTex: '\\sigma^2',
    pMin: 0.05,
    pMax: 2,
    target: (t) => t,
    est: [
      { name: 'S²ₙ (sans biais)', risk: (s2, n) => (2 * s2 * s2) / (n - 1), sample: (r, s2, n) => sumGauss(r, s2, n) / (n - 1) },
      { name: 'σ̂²ₙ (EMV)', risk: (s2, n) => ((2 * n - 1) * s2 * s2) / (n * n), sample: (r, s2, n) => sumGauss(r, s2, n) / n },
      { name: 'Σ(Xᵢ−X̄ₙ)²/(n+1)', risk: (s2, n) => (2 * s2 * s2) / (n + 1), sample: (r, s2, n) => sumGauss(r, s2, n) / (n + 1) },
    ],
    note: 'Courbes proportionnelles à $\\sigma^4$ : $S_n^2$ est dominé par $\\hat\\sigma_n^2$ (Ex. 1.8, écart $\\frac{(3n-1)\\sigma^4}{(n-1)n^2}$), lui-même dominé par $\\frac1{n+1}\\sum_i(X_i-\\bar X_n)^2$. L’E.S.B.V.M. $S_n^2$ est **inadmissible** pour le risque quadratique.',
  },
}

/** Déf. 1.4 : courbes de risque, domination et admissibilité. */
export const vizAdmissibilite: Viz = {
  id: 'ch3-admissibilite',
  title: 'Admissibilité : comparer des fonctions de risque θ ↦ R(θ, T)',
  description:
    'Courbes exactes $\\theta\\mapsto R(\\theta,T)$ pour plusieurs estimateurs de trois modèles ; le bouton « Simuler » ajoute des risques empiriques ($400$ répétitions en $9$ valeurs du paramètre). Le texte indique quels estimateurs sont **dominés** (inadmissibles, Déf. 1.4) parmi ceux affichés. En Bernoulli, le curseur $\\vartheta$ déplace l’estimateur constant.',
  source: 'Poly ch.3, Déf. 1.4, Ex. 1.8, Ex. 1.9, Ex. 1.10 ; PC3 Ex. 1',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let scen: Scen = 'unif'
    let n = 5
    let vt = 0.3
    let seed = 0
    let simulate = false
    const handle = plot(plotEl, [], {})

    const draw = () => {
      const spec = SCEN[scen]
      const grid = linspace(spec.pMin, spec.pMax, 201)
      const traces: Record<string, unknown>[] = spec.est.map((e, i) =>
        lineTrace(grid, grid.map((t) => e.risk(t, n, vt)), e.name, PALETTE[i]),
      )
      if (simulate) {
        const rng = makeRng(101 + 31 * seed)
        const pts = linspace(spec.pMin + 0.05 * (spec.pMax - spec.pMin), spec.pMax - 0.05 * (spec.pMax - spec.pMin), 9)
        spec.est.forEach((e, i) => {
          const ys = pts.map((t) => {
            let s = 0
            for (let k = 0; k < 400; k++) {
              const d = e.sample(rng, t, n, vt) - spec.target(t)
              s += d * d
            }
            return s / 400
          })
          traces.push(pointsTrace(pts, ys, `${e.name} (simulé)`, PALETTE[i], { showlegend: false, marker: { color: PALETTE[i], size: 8, symbol: 'circle-open', line: { width: 2 } } }))
        })
      }
      // domination sur la grille
      const R = spec.est.map((e) => grid.map((t) => e.risk(t, n, vt)))
      const dominated: string[] = []
      spec.est.forEach((e, j) => {
        const by = spec.est.findIndex((_, i) => {
          if (i === j) return false
          let le = true
          let lt = false
          for (let k = 0; k < grid.length; k++) {
            if (R[i][k] > R[j][k] + 1e-12) le = false
            if (R[i][k] < R[j][k] - 1e-12) lt = true
          }
          return le && lt
        })
        if (by >= 0) dominated.push(`**${e.name}** est dominé par ${spec.est[by].name}`)
      })
      handle.update(traces, {
        title: `Risque quadratique, ${spec.label}, n = ${n}`,
        xaxis: { title: scen === 'gvar' ? 'σ²' : 'θ' },
        yaxis: { title: 'R(θ, T)', rangemode: 'tozero' },
      })
      info.innerHTML = richToHtml(
        `${dominated.length ? `Sur la grille affichée : ${dominated.join(' ; ')} — donc inadmissible(s) (Déf. 1.4 : risque $\\le$ partout, $<$ quelque part).` : 'Aucun estimateur affiché n’en domine un autre : les fonctions de risque **se croisent**, l’ordre est partiel.'}

${spec.note}`,
      )
    }

    const sN = slider({
      label: '$n$',
      min: 2,
      max: 40,
      step: 1,
      value: n,
      onChange: (v) => {
        n = Math.round(v)
        draw()
      },
    })
    const sV = slider({
      label: 'constante $\\vartheta$ (Bernoulli)',
      min: 0.05,
      max: 0.95,
      step: 0.01,
      value: vt,
      onChange: (v) => {
        vt = v
        draw()
      },
    })
    controls.append(
      segmented<Scen>(
        [
          { value: 'unif', label: 'Uniforme' },
          { value: 'bern', label: 'Bernoulli' },
          { value: 'gvar', label: 'Gaussien ($\\sigma^2$)' },
        ],
        scen,
        (v) => {
          scen = v
          draw()
        },
      ),
    )
    controls.append(sN.root, sV.root)
    controls.append(
      button('Simuler des risques empiriques', () => {
        simulate = true
        seed++
        draw()
      }),
    )
    draw()
    return () => handle.destroy()
  },
}
