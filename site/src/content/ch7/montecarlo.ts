import type { MonteCarloCheck } from '../types'
import { exponential, normal, cauchy, uniform } from '../../sim/rng'
import { transLaw, vHuber, zEstimate, cauchyMle, medianOf, meanOf, varOf } from './viz/common'

/**
 * Vérifications Monte-Carlo des résultats du chapitre 7.
 * Chaque `run` est déterministe (le générateur `rng` est fourni par le test) et rapide (< 0,5 s).
 */
export const monteCarlo: MonteCarloCheck[] = [
  {
    name: 'ch7-emv-gamma-fisher',
    claim: 'Thm 1.6 et PC7 Ex. 2 : pour Γ(2, θ), n·Var(2/X̄n) → 1/𝕀(θ) = θ²/2 (θ = 2, n = 400, 2000 répétitions)',
    run(rng) {
      const theta = 2
      const n = 400
      const R = 2000
      const z = new Array<number>(R)
      for (let r = 0; r < R; r++) {
        let s = 0
        // Γ(2, θ) = somme de deux exponentielles indépendantes d'intensité θ
        for (let i = 0; i < n; i++) s += exponential(rng, theta) + exponential(rng, theta)
        z[r] = Math.sqrt(n) * ((2 * n) / s - theta)
      }
      // n·Var exacte à n = 400 : 4n³θ²/((2n−1)²(2n−2)) ≈ 2,010 ; écart-type MC ≈ 2·√(2/R) ≈ 0,063
      return { observed: varOf(z), expected: (theta * theta) / 2, tolerance: 0.25 }
    },
  },
  {
    name: 'ch7-mediane-cauchy',
    claim: 'Ex. 1.9 et §4.8 : pour Cauchy, n·Var(médiane) → 1/(4 q(θ)²) = π²/4 ≈ 2,47 (n = 201, 3000 répétitions)',
    run(rng) {
      const n = 201
      const R = 3000
      const z = new Array<number>(R)
      const xs = new Array<number>(n)
      for (let r = 0; r < R; r++) {
        for (let i = 0; i < n; i++) xs[i] = cauchy(rng, 0, 1)
        z[r] = Math.sqrt(n) * medianOf(xs)
      }
      // écart-type MC ≈ 2,47·√(2/R) ≈ 0,064 ; correction à n fini de l'ordre de 1 %
      return { observed: varOf(z), expected: (Math.PI * Math.PI) / 4, tolerance: 0.3 }
    },
  },
  {
    name: 'ch7-emv-cauchy',
    claim: 'Thm 1.6–1.7 et Ex. 1.9 : pour Cauchy, n·Var(EMV) → 1/𝕀 = 2 < π²/4 (n = 201, 1500 répétitions)',
    run(rng) {
      const n = 201
      const R = 1500
      const z = new Array<number>(R)
      const xs = new Array<number>(n)
      for (let r = 0; r < R; r++) {
        for (let i = 0; i < n; i++) xs[i] = cauchy(rng, 0, 1)
        z[r] = Math.sqrt(n) * cauchyMle(xs)
      }
      // écart-type MC ≈ 2·√(2/R) ≈ 0,073 ; légère surestimation à n fini
      return { observed: varOf(z), expected: 2, tolerance: 0.3 }
    },
  },
  {
    name: 'ch7-huber-contamine',
    claim: 'PC7 Ex. 5 Q5–Q7 : sous (1−ε)N(0,1)+εN(0,τ²) (ε = 0,05, τ = 10), n·Var(Huber k = 1,345) ≈ V[γₖ] (n = 200, 1500 répétitions)',
    run(rng) {
      const eps = 0.05
      const tau = 10
      const k = 1.345
      const spec = transLaw('contam', eps, tau)
      const n = 200
      const R = 1500
      const z = new Array<number>(R)
      const xs = new Array<number>(n)
      for (let r = 0; r < R; r++) {
        for (let i = 0; i < n; i++) xs[i] = rng() < eps ? normal(rng, 0, tau) : normal(rng)
        z[r] = Math.sqrt(n) * zEstimate(xs, 'huber', k)
      }
      // V[γₖ] ≈ 1,22 ; écart-type MC ≈ 1,22·√(2/R) ≈ 0,045
      return { observed: varOf(z), expected: vHuber(spec, k), tolerance: 0.2 }
    },
  },
  {
    name: 'ch7-moyenne-contaminee',
    claim: 'PC7 Ex. 5 Q7(a) : sous la même contamination, n·Var(X̄n) = V[γ∞] = (1−ε)+ετ² = 5,95 (n = 200, 2000 répétitions)',
    run(rng) {
      const eps = 0.05
      const tau = 10
      const n = 200
      const R = 2000
      const z = new Array<number>(R)
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += rng() < eps ? normal(rng, 0, tau) : normal(rng)
        z[r] = s / Math.sqrt(n)
      }
      // égalité exacte pour tout n ; écart-type MC ≈ 5,95·√(2/R) ≈ 0,19
      return { observed: varOf(z), expected: 1 - eps + eps * tau * tau, tolerance: 0.8 }
    },
  },
  {
    name: 'ch7-bord-max',
    claim: 'PC7 Ex. 4 Q3 : N(0,1) avec Θ = ℝ₊, E[√n·max(X̄n, 0)] = E[max(Z,0)] = 1/√(2π) ≈ 0,399 (n = 50, 4000 répétitions)',
    run(rng) {
      const n = 50
      const R = 4000
      const z = new Array<number>(R)
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += normal(rng)
        z[r] = Math.sqrt(n) * Math.max(s / n, 0)
      }
      // écart-type de max(Z,0) ≈ 0,584 ; écart-type MC ≈ 0,0092
      return { observed: meanOf(z), expected: 1 / Math.sqrt(2 * Math.PI), tolerance: 0.04 }
    },
  },
  {
    name: 'ch7-pareto-vitesse-n',
    claim: 'Ex. 1.10 : Pareto (α = 1, η = 2), E[nη(α̂n − α)] → E[α·E(1)] = α = 1 (n = 200, 4000 répétitions)',
    run(rng) {
      const alpha = 1
      const eta = 2
      const n = 200
      const R = 4000
      const z = new Array<number>(R)
      for (let r = 0; r < R; r++) {
        let m = Infinity
        for (let i = 0; i < n; i++) {
          let u = 0
          while (u === 0) u = uniform(rng)
          const x = alpha * Math.pow(u, -1 / eta)
          if (x < m) m = x
        }
        z[r] = n * eta * (m - alpha)
      }
      // valeur exacte à n fini : α·nη/(nη − 1) ≈ 1,0025 ; écart-type MC ≈ 1/√R ≈ 0,016
      return { observed: meanOf(z), expected: alpha, tolerance: 0.07 }
    },
  },
]
