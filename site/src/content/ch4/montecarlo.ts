import type { MonteCarloCheck } from '../types'
import { normal, exponential, poisson } from '../../sim/rng'
import { normalCdf, normalQuantile, studentQuantile, chi2Quantile, poissonCdf } from '../../sim/stats'

/**
 * Vérifications Monte-Carlo des résultats du chapitre 4.
 * Chaque `run` est déterministe (le générateur `rng` est fourni par le test) et rapide.
 */
export const monteCarlo: MonteCarloCheck[] = [
  {
    name: 'ch4-couverture-student',
    claim: 'Ex. 1.5 (Gosset) : l’IC [X̄n ± Sn t^{(n−1)}_{0,975}/√n] a une couverture EXACTE de 0,95 pour un échantillon gaussien, même pour n = 8 (4000 répétitions)',
    run(rng) {
      const n = 8
      const R = 4000
      const mu = 1.5
      const sigma = 2
      const t = studentQuantile(0.975, n - 1)
      let covered = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        const xs = new Array<number>(n)
        for (let i = 0; i < n; i++) {
          xs[i] = normal(rng, mu, sigma)
          s += xs[i]
        }
        const m = s / n
        let ss = 0
        for (const x of xs) ss += (x - m) * (x - m)
        const h = (t * Math.sqrt(ss / (n - 1))) / Math.sqrt(n)
        if (m - h <= mu && mu <= m + h) covered++
      }
      // écart-type MC ≈ √(0,95·0,05/4000) ≈ 0,0034 ; pas de biais à n fini (niveau exact)
      return { observed: covered / R, expected: 0.95, tolerance: 0.015 }
    },
  },
  {
    name: 'ch4-couverture-pivot-chi2',
    claim: 'PC4 Ex. 1 Q3 : 2θ⁻¹ΣXᵢ ~ χ²(2n) ; l’IC [2ΣXᵢ/χ²_{0,95}(2n), 2ΣXᵢ/χ²_{0,05}(2n)] a une couverture exacte 0,90 (θ = 3, n = 5, 4000 répétitions)',
    run(rng) {
      const theta = 3
      const n = 5
      const R = 4000
      const lo = chi2Quantile(0.05, 2 * n)
      const hi = chi2Quantile(0.95, 2 * n)
      let covered = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, 1 / theta)
        if ((2 * s) / hi <= theta && theta <= (2 * s) / lo) covered++
      }
      // écart-type MC ≈ √(0,9·0,1/4000) ≈ 0,0047
      return { observed: covered / R, expected: 0.9, tolerance: 0.02 }
    },
  },
  {
    name: 'ch4-puissance-z-test',
    claim: 'Ex. 2.3 : la puissance du z-test unilatéral {√n X̄n/σ ≥ z_{0,95}} vaut 1 − Φ(z_{0,95} − √n θ/σ) ; ici n = 25, σ = 1, θ = 0,3 (≈ 0,442), 4000 répétitions',
    run(rng) {
      const n = 25
      const theta = 0.3
      const R = 4000
      const c = normalQuantile(0.95)
      let rejected = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += normal(rng, theta, 1)
        if (Math.sqrt(n) * (s / n) >= c) rejected++
      }
      // écart-type MC ≈ √(0,44·0,56/4000) ≈ 0,008
      return { observed: rejected / R, expected: 1 - normalCdf(c - Math.sqrt(n) * theta), tolerance: 0.03 }
    },
  },
  {
    name: 'ch4-pvaleur-uniforme',
    claim: 'Prop. 2.2 : au bord θ = θ₀ de H₀, la p-valeur 1 − Φ(√n(X̄n − θ₀)) du z-test est uniforme sur ]0,1[ : fréquence de {p̂ ≤ 0,2} ≈ 0,2 (n = 20, 5000 répétitions)',
    run(rng) {
      const n = 20
      const theta0 = 2
      const R = 5000
      let below = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += normal(rng, theta0, 1)
        const p = 1 - normalCdf(Math.sqrt(n) * (s / n - theta0))
        if (p <= 0.2) below++
      }
      // écart-type MC ≈ √(0,2·0,8/5000) ≈ 0,0057
      return { observed: below / R, expected: 0.2, tolerance: 0.022 }
    },
  },
  {
    name: 'ch4-taille-poisson-discret',
    claim: 'PC4 Ex. 4 : le test {ΣXᵢ > 15} (n = 10, H₀ : θ = 1) a une taille P(Poi(10) > 15) ≈ 0,0487 < 5 % (statistique discrète : niveau ≠ taille), 20000 répétitions',
    run(rng) {
      const R = 20000
      let rejected = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < 10; i++) s += poisson(rng, 1)
        if (s > 15) rejected++
      }
      // écart-type MC ≈ √(0,049·0,951/20000) ≈ 0,0015
      return { observed: rejected / R, expected: 1 - poissonCdf(15, 10), tolerance: 0.006 }
    },
  },
  {
    name: 'ch4-region-bivariee-exacte',
    claim: 'Ex. 1.7 (b) : la région {|X̄n − μ| ≤ σ z_{1−α/4}/√n, (n−1)Sn²/χ²_{1−α/4}(n−1) ≤ σ² ≤ (n−1)Sn²/χ²_{α/4}(n−1)} a un niveau exact (1 − α/2)² = 0,9025 pour α = 0,1 (n = 10, 4000 répétitions)',
    run(rng) {
      const n = 10
      const alpha = 0.1
      const mu = 0
      const sigma = 1.5
      const R = 4000
      const z = normalQuantile(1 - alpha / 4)
      const qlo = chi2Quantile(alpha / 4, n - 1)
      const qhi = chi2Quantile(1 - alpha / 4, n - 1)
      let covered = 0
      for (let r = 0; r < R; r++) {
        const xs = new Array<number>(n)
        let s = 0
        for (let i = 0; i < n; i++) {
          xs[i] = normal(rng, mu, sigma)
          s += xs[i]
        }
        const m = s / n
        let ss = 0
        for (const x of xs) ss += (x - m) * (x - m)
        const okMu = Math.abs(m - mu) <= (sigma * z) / Math.sqrt(n)
        const okS = ss / qhi <= sigma * sigma && sigma * sigma <= ss / qlo
        if (okMu && okS) covered++
      }
      // écart-type MC ≈ √(0,9·0,1/4000) ≈ 0,0047
      return { observed: covered / R, expected: (1 - alpha / 2) ** 2, tolerance: 0.02 }
    },
  },
]
