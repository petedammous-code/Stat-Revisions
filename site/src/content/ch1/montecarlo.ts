import type { MonteCarloCheck } from '../types'
import { normal, exponential, uniform } from '../../sim/rng'
import { studentQuantile, chi2Cdf } from '../../sim/stats'

/**
 * Vérifications Monte-Carlo des résultats du chapitre 1.
 * Chaque `run` est déterministe (le générateur `rng` est fourni par le test) et rapide.
 */
export const monteCarlo: MonteCarloCheck[] = [
  {
    name: 'ch1-gosset-independance',
    claim: 'Thm 1.3 (iii) : X̄n et S²n sont indépendantes pour un échantillon gaussien ; leur covariance empirique sur 4000 échantillons (n = 10, σ = 1) est ≈ 0',
    run(rng) {
      const n = 10
      const R = 4000
      const means = new Array<number>(R)
      const vars = new Array<number>(R)
      for (let r = 0; r < R; r++) {
        let s = 0
        let s2 = 0
        for (let i = 0; i < n; i++) {
          const x = normal(rng, 1, 1)
          s += x
          s2 += x * x
        }
        const m = s / n
        means[r] = m
        vars[r] = (s2 - n * m * m) / (n - 1)
      }
      let mm = 0
      let mv = 0
      for (let r = 0; r < R; r++) {
        mm += means[r]
        mv += vars[r]
      }
      mm /= R
      mv /= R
      let cov = 0
      for (let r = 0; r < R; r++) cov += (means[r] - mm) * (vars[r] - mv)
      cov /= R - 1
      // écart-type MC de la covariance ≈ sqrt(Var(X̄)Var(S²)/R) = sqrt(0,1·(2/9)/4000) ≈ 0,0024
      return { observed: cov, expected: 0, tolerance: 0.01 }
    },
  },
  {
    name: 'ch1-gosset-chi2-variance',
    claim: 'Thm 1.3 (ii) et Prop. 2.8 : (n−1)S²n/σ² ~ χ²(n−1), de variance 2(n−1) = 10 pour n = 6 (5000 échantillons)',
    run(rng) {
      const n = 6
      const R = 5000
      const vals = new Array<number>(R)
      let m = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        let s2 = 0
        for (let i = 0; i < n; i++) {
          const x = normal(rng, 0, 2)
          s += x
          s2 += x * x
        }
        const mu = s / n
        vals[r] = ((s2 - n * mu * mu) / (n - 1)) * ((n - 1) / 4)
        m += vals[r]
      }
      m /= R
      let v = 0
      for (const x of vals) v += (x - m) * (x - m)
      v /= R - 1
      // kurtosis du χ²(5) : écart-type MC de la variance empirique ≈ 10·sqrt((2+2,4)/5000) ≈ 0,3
      return { observed: v, expected: 2 * (n - 1), tolerance: 1.2 }
    },
  },
  {
    name: 'ch1-gosset-student',
    claim: 'Thm 1.3 (iv) : P(|√n(X̄n − μ)/Sn| > t_{0,975}(n−1)) = 0,05 exactement pour un bruit gaussien (n = 5, 5000 échantillons)',
    run(rng) {
      const n = 5
      const R = 5000
      const q = studentQuantile(0.975, n - 1)
      let rej = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        let s2 = 0
        for (let i = 0; i < n; i++) {
          const x = normal(rng, 3, 1.5)
          s += x
          s2 += x * x
        }
        const mu = s / n
        const sn = Math.sqrt((s2 - n * mu * mu) / (n - 1))
        const t = (Math.sqrt(n) * (mu - 3)) / sn
        if (Math.abs(t) > q) rej++
      }
      // écart-type MC ≈ sqrt(0,05·0,95/5000) ≈ 0,003
      return { observed: rej / R, expected: 0.05, tolerance: 0.012 }
    },
  },
  {
    name: 'ch1-maximum-uniforme',
    claim: 'Ex. 1.13 : le maximum d’un n-échantillon U([0,θ]) a pour densité n t^{n−1}/θ^n, donc E[X(n)] = nθ/(n+1) = 2,4 pour n = 4, θ = 3 (5000 échantillons)',
    run(rng) {
      const n = 4
      const theta = 3
      const R = 5000
      let m = 0
      for (let r = 0; r < R; r++) {
        let mx = 0
        for (let i = 0; i < n; i++) {
          const x = uniform(rng, 0, theta)
          if (x > mx) mx = x
        }
        m += mx
      }
      m /= R
      // Var(X(n)) = θ² n/((n+1)²(n+2)) = 0,24 ; écart-type MC ≈ 0,007
      return { observed: m, expected: (n * theta) / (n + 1), tolerance: 0.03 }
    },
  },
  {
    name: 'ch1-carre-gaussienne-chi2',
    claim: 'Ex. 2.2 / Prop. 2.8 (i) : X² ~ χ²(1) pour X ~ N(0,1) ; P(X² ≤ 1) = P(|X| ≤ 1) ≈ 0,6827 (20000 tirages)',
    run(rng) {
      const R = 20000
      let c = 0
      for (let r = 0; r < R; r++) {
        const x = normal(rng)
        if (x * x <= 1) c++
      }
      // écart-type MC ≈ sqrt(0,68·0,32/20000) ≈ 0,0033
      return { observed: c / R, expected: chi2Cdf(1, 1), tolerance: 0.013 }
    },
  },
  {
    name: 'ch1-reponses-randomisees',
    claim: '§1.8 : θ̂n = (RR̄n − (1−q))/(2q−1) est sans biais, de variance Var(RR₁)/(n(2q−1)²) = 0,0192 pour θ = 0,3, q = 0,75, n = 50 (4000 enquêtes)',
    run(rng) {
      const theta = 0.3
      const q = 0.75
      const n = 50
      const R = 4000
      const p = theta * q + (1 - theta) * (1 - q)
      const vals = new Array<number>(R)
      let m = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) if (rng() < p) s++
        vals[r] = (s / n - (1 - q)) / (2 * q - 1)
        m += vals[r]
      }
      m /= R
      let v = 0
      for (const x of vals) v += (x - m) * (x - m)
      v /= R - 1
      // variance théorique p(1−p)/(n(2q−1)²) = 0,24/(50·0,25) = 0,0192 ; écart-type MC ≈ 0,0192·sqrt(2/4000) ≈ 0,00043
      return { observed: v, expected: (p * (1 - p)) / (n * (2 * q - 1) ** 2), tolerance: 0.002 }
    },
  },
  {
    name: 'ch1-espacements-exponentiels',
    claim: 'PC3 Ex. 5 Q2 : les espacements normalisés Z₁ = nX(1) et Z₂ = (n−1)(X(2) − X(1)) d’un échantillon E(1) sont indépendants de moyenne 1 : Cov(Z₁, Z₂) ≈ 0 et E[Z₂] = 1 (n = 5, 6000 échantillons)',
    run(rng) {
      const n = 5
      const R = 6000
      const z1 = new Array<number>(R)
      const z2 = new Array<number>(R)
      let m1 = 0
      let m2 = 0
      for (let r = 0; r < R; r++) {
        const xs = new Array<number>(n)
        for (let i = 0; i < n; i++) xs[i] = exponential(rng, 1)
        xs.sort((a, b) => a - b)
        z1[r] = n * xs[0]
        z2[r] = (n - 1) * (xs[1] - xs[0])
        m1 += z1[r]
        m2 += z2[r]
      }
      m1 /= R
      m2 /= R
      let cov = 0
      for (let r = 0; r < R; r++) cov += (z1[r] - m1) * (z2[r] - m2)
      cov /= R - 1
      // on renvoie |cov| + |E[Z₂] − 1| : écarts-types MC ≈ 1/sqrt(6000) ≈ 0,013 chacun
      return { observed: Math.abs(cov) + Math.abs(m2 - 1), expected: 0, tolerance: 0.08 }
    },
  },
]
