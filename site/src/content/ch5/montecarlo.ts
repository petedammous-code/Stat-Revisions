import type { MonteCarloCheck } from '../types'
import { normal, exponential, binomial, uniform } from '../../sim/rng'
import { normalCdf, normalQuantile, chi2Cdf, chi2Quantile, binomialPmf } from '../../sim/stats'

/**
 * Vérifications Monte-Carlo des résultats du chapitre 5.
 * Chaque `run` est déterministe (le générateur `rng` est fourni par le test) et rapide.
 * Tolérances : environ 4 écarts-types Monte-Carlo sqrt(p(1-p)/R).
 */
export const monteCarlo: MonteCarloCheck[] = [
  {
    name: 'ch5-np-taille-exacte',
    claim: 'Th. 1.1 / Ex. 1.3 : le test de Neyman-Pearson 1{X̄n > μ0 + z₁₋α σ/√n} a une taille exactement α = 0,05 sous H0 (N(0,1), n = 10, 20000 répétitions)',
    run(rng) {
      const n = 10
      const R = 20000
      const alpha = 0.05
      const thr = normalQuantile(1 - alpha) / Math.sqrt(n)
      let rej = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += normal(rng)
        if (s / n > thr) rej++
      }
      // écart-type MC ≈ 0,0015
      return { observed: rej / R, expected: alpha, tolerance: 0.006 }
    },
  },
  {
    name: 'ch5-np-puissance-gauss',
    claim: 'Ex. 1.3 : la puissance du test U.P.P. en μ1 = m vaut 1 − Φ(z₁₋α − √n m/σ) ≈ 0,723 (σ = 1, m = 1, n = 5, α = 0,05, 10000 répétitions)',
    run(rng) {
      const n = 5
      const m = 1
      const R = 10000
      const alpha = 0.05
      const z = normalQuantile(1 - alpha)
      const thr = z / Math.sqrt(n)
      let rej = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += normal(rng, m, 1)
        if (s / n > thr) rej++
      }
      // écart-type MC ≈ 0,0045
      return { observed: rej / R, expected: 1 - normalCdf(z - Math.sqrt(n) * m), tolerance: 0.018 }
    },
  },
  {
    name: 'ch5-upp-exponentiel-puissance',
    claim: 'Exercice 1 / PC5 Ex. 1 : le test U.P.P. 1{ΣXi > θ0 χ²₀,₉₅(2n)/2} (moyenne θ) a pour puissance P(χ²(2n) > θ0 χ²₀,₉₅(2n)/θ) ≈ 0,735 en θ = 2 (n = 10, θ0 = 1, 10000 répétitions)',
    run(rng) {
      const n = 10
      const theta0 = 1
      const theta = 2
      const R = 10000
      const q = chi2Quantile(0.95, 2 * n)
      const c = (theta0 * q) / 2
      let rej = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, 1 / theta) // intensité 1/θ : moyenne θ
        if (s > c) rej++
      }
      return { observed: rej / R, expected: 1 - chi2Cdf((theta0 * q) / theta, 2 * n), tolerance: 0.018 }
    },
  },
  {
    name: 'ch5-upp-niveau-composite',
    claim: 'Th. 1.3 (ii) et Lemme 2.1 : la puissance du test unilatéral est croissante, donc ≤ α sur H0 = {θ ≤ θ0} ; en θ = 0,8 θ0 elle vaut P(χ²(20) > χ²₀,₉₅(20)/0,8) ≈ 0,006 (exponentiel de moyenne θ, n = 10, 20000 répétitions)',
    run(rng) {
      const n = 10
      const theta0 = 1
      const theta = 0.8
      const R = 20000
      const q = chi2Quantile(0.95, 2 * n)
      const c = (theta0 * q) / 2
      let rej = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, 1 / theta)
        if (s > c) rej++
      }
      // valeur ≈ 0,006 : écart-type MC ≈ 0,00055
      return { observed: rej / R, expected: 1 - chi2Cdf((theta0 * q) / theta, 2 * n), tolerance: 0.0025 }
    },
  },
  {
    name: 'ch5-randomise-taille-exacte',
    claim: 'Th. 4.1 / Ex. 4.2 (complément) : avec T ~ Bin(20, 1/2) sous H0, le test randomisé (rejet si T > d, avec probabilité γ si T = d) a une taille exactement α = 0,05 (40000 répétitions)',
    run(rng) {
      const n = 20
      const p0 = 0.5
      const alpha = 0.05
      const pmf = Array.from({ length: n + 1 }, (_, k) => binomialPmf(k, n, p0))
      const surv = (k: number) => pmf.slice(k + 1).reduce((a, b) => a + b, 0)
      let d = 0
      while (surv(d) > alpha) d++
      const gamma = (alpha - surv(d)) / pmf[d]
      const R = 40000
      let rej = 0
      for (let r = 0; r < R; r++) {
        const t = binomial(rng, n, p0)
        if (t > d || (t === d && rng() < gamma)) rej++
      }
      // écart-type MC ≈ 0,0011
      return { observed: rej / R, expected: alpha, tolerance: 0.0045 }
    },
  },
  {
    name: 'ch5-bilateral-puissance',
    claim: 'Exercice 5 / PC5 Ex. 2 Q4 : puissance du test bilatéral φ*,3 en θ = 0,5 : 1 − Φ(z₀,₉₇₅ − √n/2) + Φ(−z₀,₉₇₅ − √n/2) ≈ 0,353 (n = 10, 10000 répétitions)',
    run(rng) {
      const n = 10
      const theta = 0.5
      const R = 10000
      const z = normalQuantile(0.975)
      const thr = z / Math.sqrt(n)
      let rej = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += normal(rng, theta, 1)
        if (Math.abs(s / n) > thr) rej++
      }
      const expected = 1 - normalCdf(z - Math.sqrt(n) * theta) + normalCdf(-z - Math.sqrt(n) * theta)
      return { observed: rej / R, expected, tolerance: 0.019 }
    },
  },
  {
    name: 'ch5-uniforme-deux-upp',
    claim: 'Exercice 7 / Ex. 4.5 (complément) : le test randomisé φ′ (1 si X_{n:n} > θ0, α sinon) a la même puissance 1 − (1 − α)(θ0/θ)^n ≈ 0,638 que le test pur φ (n = 5, α = 0,1, θ = 1,2 θ0, 10000 répétitions)',
    run(rng) {
      const n = 5
      const alpha = 0.1
      const theta0 = 1
      const theta = 1.2
      const R = 10000
      let rej = 0
      for (let r = 0; r < R; r++) {
        let mx = 0
        for (let i = 0; i < n; i++) mx = Math.max(mx, uniform(rng, 0, theta))
        if (mx > theta0 || rng() < alpha) rej++
      }
      return { observed: rej / R, expected: 1 - (1 - alpha) * Math.pow(theta0 / theta, n), tolerance: 0.019 }
    },
  },
]
