import type { MonteCarloCheck } from '../types'
import { normal, exponential, uniform, bernoulli, poisson } from '../../sim/rng'

/**
 * Vérifications Monte-Carlo des résultats du chapitre 3.
 * Chaque `run` est déterministe (le générateur `rng` est fourni par le test) et rapide.
 */
export const monteCarlo: MonteCarloCheck[] = [
  {
    name: 'ch3-ecart-risques-variance-gaussienne',
    claim: 'Ex. 1.8 : R(θ, S²ₙ) − R(θ, σ̂²ₙ) = (3n−1)σ⁴/((n−1)n²) = 29/900 pour n = 10, σ² = 1 (20 000 répétitions, risques calculés sur les mêmes échantillons)',
    run(rng) {
      const n = 10
      const R = 20000
      let d = 0
      for (let r = 0; r < R; r++) {
        let a = 0
        let b = 0
        for (let i = 0; i < n; i++) {
          const x = normal(rng, 3, 1)
          a += x
          b += x * x
        }
        const ss = b - (a * a) / n
        const s2 = ss / (n - 1)
        const sh = ss / n
        d += (s2 - 1) * (s2 - 1) - (sh - 1) * (sh - 1)
      }
      // écart-type MC ≈ 0,085/√R ≈ 0,0006 (méthode-δ sur D = (19/81)V² − (2/9)V)
      return { observed: d / R, expected: 29 / 900, tolerance: 0.003 }
    },
  },
  {
    name: 'ch3-risque-astar-uniforme',
    claim: 'Ex. 1.9 / PC3 Ex. 1 Q5 : R(θ, a⋆X(n:n)) = θ²/(n+1)² avec a⋆ = (n+2)/(n+1) ; n = 5, θ = 1 : 1/36 (20 000 répétitions)',
    run(rng) {
      const n = 5
      const theta = 1
      const a = (n + 2) / (n + 1)
      const R = 20000
      let s = 0
      for (let r = 0; r < R; r++) {
        let mx = 0
        for (let i = 0; i < n; i++) mx = Math.max(mx, uniform(rng, 0, theta))
        const e = a * mx - theta
        s += e * e
      }
      // écart-type MC ≈ 0,04/√R ≈ 0,0003
      return { observed: s / R, expected: 1 / 36, tolerance: 0.0015 }
    },
  },
  {
    name: 'ch3-variance-score-bernoulli',
    claim: 'Prop. 1.2 (i) et Ex. 1.15 : le score de Bernoulli est centré et Var_θ(S(θ, X)) = I₁(θ) = 1/(θ(1−θ)) ; θ = 0,3 : 4,762 (50 000 tirages)',
    run(rng) {
      const t = 0.3
      const N = 50000
      let m = 0
      let q = 0
      for (let k = 0; k < N; k++) {
        const x = bernoulli(rng, t)
        const sc = x / t - (1 - x) / (1 - t)
        m += sc
        q += sc * sc
      }
      m /= N
      const v = q / N - m * m
      // écart-type MC de la variance empirique ≈ √(Var(S²)/N) ≈ 4,16/224 ≈ 0,019
      return { observed: v, expected: 1 / (t * (1 - t)), tolerance: 0.08 }
    },
  },
  {
    name: 'ch3-score-centre-exponentielle',
    claim: 'Prop. 1.2 (i) et Ex. 1.13 : E_θ[S(θ, X)] = E_θ[1/θ − X] = 0 dans le modèle E(θ) (intensité θ = 2, 50 000 tirages)',
    run(rng) {
      const t = 2
      const N = 50000
      let s = 0
      for (let k = 0; k < N; k++) s += 1 / t - exponential(rng, t)
      // écart-type MC = (1/θ)/√N ≈ 0,0022
      return { observed: s / N, expected: 0, tolerance: 0.01 }
    },
  },
  {
    name: 'ch3-efficacite-poisson',
    claim: 'Ex. 1.18 : n·Var_θ(X̄ₙ) = θ = 1/I₁(θ) dans le modèle de Poisson (borne de Cramér-Rao atteinte) ; θ = 3, n = 20 (5 000 répétitions)',
    run(rng) {
      const t = 3
      const n = 20
      const R = 5000
      const xs = new Array<number>(R)
      let m = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += poisson(rng, t)
        xs[r] = s / n
        m += xs[r]
      }
      m /= R
      let v = 0
      for (const x of xs) v += (x - m) * (x - m)
      v /= R - 1
      // écart-type MC de n·Var ≈ θ·√(2/R) ≈ 0,06
      return { observed: n * v, expected: t, tolerance: 0.25 }
    },
  },
  {
    name: 'ch3-sans-biais-exponentielle-non-efficace',
    claim: 'Examen 2025 Ex. 1 (prolongement) : Var_θ((n−1)/ΣXᵢ) = θ²/(n−2) > θ²/n (borne non atteinte) ; θ = 2, n = 10 : 0,5 (20 000 répétitions)',
    run(rng) {
      const t = 2
      const n = 10
      const R = 20000
      const xs = new Array<number>(R)
      let m = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, t)
        xs[r] = (n - 1) / s
        m += xs[r]
      }
      m /= R
      let v = 0
      for (const x of xs) v += (x - m) * (x - m)
      v /= R - 1
      // écart-type MC ≈ 0,5·√((κ−1)/R) ≈ 0,01 (κ ≈ 6 pour l’inverse d’une loi Gamma(10)) ; la borne θ²/n = 0,4 est à 10 écarts-types
      return { observed: v, expected: (t * t) / (n - 2), tolerance: 0.04 }
    },
  },
  {
    name: 'ch3-retrecissement-exponentielle-moyenne',
    claim: 'PC3 Ex. 5 Q6 : avec θ = moyenne, R(θ, ΣXᵢ/(n+1)) = θ²/(n+1) < θ²/n = R(θ, X̄ₙ) ; θ = 2, n = 10 : 4/11 (20 000 répétitions)',
    run(rng) {
      const t = 2
      const n = 10
      const R = 20000
      let s2 = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, 1 / t)
        const e = s / (n + 1) - t
        s2 += e * e
      }
      // écart-type MC ≈ 0,55/√R ≈ 0,004
      return { observed: s2 / R, expected: (t * t) / (n + 1), tolerance: 0.016 }
    },
  },
]
