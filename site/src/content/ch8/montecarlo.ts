import type { MonteCarloCheck } from '../types'
import { normal } from '../../sim/rng'
import { normalCdf } from '../../sim/stats'

/** Tirage du couple (X, Y) de PC8 Ex. 5 : Y = ±1 équiprobables, X | Y = −1 ~ U([0,2]), X | Y = 1 ~ U([1,4]). */
function drawPc8(rng: () => number): [number, number] {
  const y = rng() < 0.5 ? 1 : -1
  const x = y === 1 ? 1 + 3 * rng() : 2 * rng()
  return [x, y]
}

/**
 * Vérifications Monte-Carlo des résultats du chapitre 8.
 * Chaque `run` est déterministe (le générateur `rng` est fourni par le test) et rapide.
 */
export const monteCarlo: MonteCarloCheck[] = [
  {
    name: 'ch8-pc8-ex5-risque-bayesien',
    claim: 'Th. 1.2 et PC8 Ex. 5 Q3 : le classifieur bayésien g*(x) = 1 ssi x > 2 a pour risque R* = 1/6 (200 000 tirages)',
    run(rng) {
      const N = 200000
      let err = 0
      for (let i = 0; i < N; i++) {
        const [x, y] = drawPc8(rng)
        const pred = x > 2 ? 1 : -1
        if (pred !== y) err++
      }
      // écart-type MC = sqrt(p(1-p)/N) ≈ 0,00083
      return { observed: err / N, expected: 1 / 6, tolerance: 0.004 }
    },
  },
  {
    name: 'ch8-pc8-ex5-exces',
    claim: 'Th. 1.2 éq. (4) et PC8 Ex. 5 Q4 : la règle g(x) = 2·1{x ≥ 1} − 1 a un excès de risque R(g) − R(g*) = 1/12 (mêmes tirages pour les deux règles)',
    run(rng) {
      const N = 200000
      let diff = 0
      for (let i = 0; i < N; i++) {
        const [x, y] = drawPc8(rng)
        const eg = (x >= 1 ? 1 : -1) !== y ? 1 : 0
        const es = (x > 2 ? 1 : -1) !== y ? 1 : 0
        diff += eg - es
      }
      // la différence ne vaut ±1 que sur [1,2] : écart-type MC ≈ sqrt(5/12/N) ≈ 0,0014
      return { observed: diff / N, expected: 1 / 12, tolerance: 0.006 }
    },
  },
  {
    name: 'ch8-pythagore',
    claim: 'Th. 1.1 : pour Y = sin(2πX) + ε, X ~ U([0,1]), σ = 0,5 et g(x) = x, R₂(g) = σ² + E[(g*(X) − g(X))²] = 0,25 + 1/2 + 1/π + 1/3 ≈ 1,4016',
    run(rng) {
      const N = 100000
      let s = 0
      for (let i = 0; i < N; i++) {
        const x = rng()
        const y = Math.sin(2 * Math.PI * x) + normal(rng, 0, 0.5)
        s += (y - x) ** 2
      }
      // écart-type de (Y − X)² ≈ 1,5 : écart-type MC ≈ 0,005
      return { observed: s / N, expected: 0.25 + 0.5 + 1 / Math.PI + 1 / 3, tolerance: 0.02 }
    },
  },
  {
    name: 'ch8-ex-4-1',
    claim: 'Compléments Ex. 4.1 : X ~ U([−1,1]), η = 0,9 sur [0,1] et 0,1 sur [−1,0[ ; le classifieur bayésien 2·1{x ≥ 0} − 1 a un risque R* = E[min(η, 1 − η)] = 0,1',
    run(rng) {
      const N = 200000
      let err = 0
      for (let i = 0; i < N; i++) {
        const x = -1 + 2 * rng()
        const eta = x >= 0 ? 0.9 : 0.1
        const y = rng() < eta ? 1 : -1
        if ((x >= 0 ? 1 : -1) !== y) err++
      }
      // écart-type MC ≈ 0,00067
      return { observed: err / N, expected: 0.1, tolerance: 0.004 }
    },
  },
  {
    name: 'ch8-perte-asymetrique',
    claim: 'PC8 Ex. 1 : avec la perte asymétrique de coût c = 2 sur le modèle de PC8 Ex. 5, la règle 2·1{η ≥ 1/(c+1)} − 1 (prédit 1 sur ]1,4]) a un risque E[min(cη, 1 − η)] = 1/4',
    run(rng) {
      const N = 200000
      const c = 2
      let loss = 0
      for (let i = 0; i < N; i++) {
        const [x, y] = drawPc8(rng)
        const pred = x > 1 ? 1 : -1
        if (pred === -1 && y === 1) loss += c
        else if (pred === 1 && y === -1) loss += 1
      }
      // perte dans {0,1,2} ; écart-type MC ≈ 0,001
      return { observed: loss / N, expected: 0.25, tolerance: 0.006 }
    },
  },
  {
    name: 'ch8-prop-1-5-plugin',
    claim: 'Prop. 1.5 : pour X | Y = ±1 ~ N(±1, 1), p = 1/2 (modèle LDA bien spécifié), le risque moyen de la règle plug-in LDA estimée sur n = 1000 points est proche de R* = Φ(−1) ≈ 0,1587 (100 ensembles d’apprentissage, risque calculé exactement)',
    run(rng) {
      const n = 1000
      const R = 100
      let mean = 0
      for (let r = 0; r < R; r++) {
        let n1 = 0
        let s1 = 0
        let sm1 = 0
        let q1 = 0
        let qm1 = 0
        for (let i = 0; i < n; i++) {
          if (rng() < 0.5) {
            const x = normal(rng, 1, 1)
            n1++
            s1 += x
            q1 += x * x
          } else {
            const x = normal(rng, -1, 1)
            sm1 += x
            qm1 += x * x
          }
        }
        const nm1 = n - n1
        const m1 = s1 / n1
        const mm1 = sm1 / nm1
        const v = (q1 - n1 * m1 * m1 + qm1 - nm1 * mm1 * mm1) / n
        const p = n1 / n
        // phi(x) = log(p/(1-p)) + (m1 - mm1)/v (x - (m1 + mm1)/2) >= 0  <=>  x >= t (m1 > mm1 ici avec probabilité ~1)
        const t = (m1 + mm1) / 2 - (v * Math.log(p / (1 - p))) / (m1 - mm1)
        // risque exact sous la vraie loi : P(Y=1, X<t) + P(Y=-1, X>=t)
        mean += 0.5 * normalCdf(t - 1) + 0.5 * (1 - normalCdf(t + 1))
      }
      // excès de risque moyen d’ordre 1/n ≈ 0,001 ; dispersion MC négligeable
      return { observed: mean / R, expected: normalCdf(-1), tolerance: 0.004 }
    },
  },
]
