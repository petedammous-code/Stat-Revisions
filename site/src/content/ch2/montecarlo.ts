import type { MonteCarloCheck } from '../types'
import { normal, exponential, uniform, bernoulli } from '../../sim/rng'

/**
 * Vérifications Monte-Carlo des résultats du chapitre 2.
 * Chaque `run` est déterministe (le générateur `rng` est fourni par le test) et rapide (< 0,5 s).
 */
export const monteCarlo: MonteCarloCheck[] = [
  {
    name: 'ch2-biais-emv-exponentiel',
    claim: 'Ex. 1.4 / Ex. 1.7 : E_θ[1/X̄n] = nθ/(n−1) pour un n-échantillon E(θ) (θ = 1, n = 10, 4000 répétitions) : l’EMV de l’intensité est biaisé vers le haut',
    run(rng) {
      const theta = 1
      const n = 10
      const R = 4000
      let m = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, theta)
        m += n / s
      }
      m /= R
      // écart-type de 1/X̄n ≈ sqrt(EQM − biais²) ≈ 0,40 ; écart-type MC ≈ 0,0063
      return { observed: m, expected: (n * theta) / (n - 1), tolerance: 0.03 }
    },
  },
  {
    name: 'ch2-eqm-emv-exponentiel',
    claim: 'Ex. 1.4 (Remarque p. 11) : E_θ[(1/X̄n − θ)²] = (n+2)θ²/((n−1)(n−2)) (θ = 1, n = 10, 4000 répétitions)',
    run(rng) {
      const theta = 1
      const n = 10
      const R = 4000
      let s2 = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, theta)
        const d = n / s - theta
        s2 += d * d
      }
      s2 /= R
      // EQM = 12/72 ≈ 0,1667 ; écart-type MC de la moyenne des carrés ≈ 0,006 (queue droite de 1/X̄n)
      return { observed: s2, expected: ((n + 2) * theta * theta) / ((n - 1) * (n - 2)), tolerance: 0.035 }
    },
  },
  {
    name: 'ch2-emv-uniforme-esperance',
    claim: 'Ex. 1.11 : l’EMV X_{n:n} de U([0,θ]) a pour espérance nθ/(n+1) (sous-estime θ), alors que l’estimateur des moments 2X̄n est sans biais (θ = 2, n = 10, 4000 répétitions)',
    run(rng) {
      const theta = 2
      const n = 10
      const R = 4000
      let mMax = 0
      let mMom = 0
      for (let r = 0; r < R; r++) {
        let mx = 0
        let s = 0
        for (let i = 0; i < n; i++) {
          const x = uniform(rng, 0, theta)
          s += x
          if (x > mx) mx = x
        }
        mMax += mx
        mMom += (2 * s) / n
      }
      mMax /= R
      mMom /= R
      // Var(X_{n:n}) = nθ²/((n+1)²(n+2)) ≈ 0,0275, écart-type MC ≈ 0,0026 ; la différence des deux moyennes vaut θ/(n+1) ≈ 0,182
      return { observed: mMom - mMax, expected: theta / (n + 1), tolerance: 0.02 }
    },
  },
  {
    name: 'ch2-regression-chi2',
    claim: 'PC2 Ex. 1 Q5 (Cochran) : nσ̂²/σ² ~ χ²(n−2) en régression linéaire simple gaussienne, d’espérance n−2 (n = 10, σ = 1,5, 3000 répétitions)',
    run(rng) {
      const n = 10
      const sigma = 1.5
      const R = 3000
      const xs = new Array<number>(n)
      for (let i = 0; i < n; i++) xs[i] = i / (n - 1)
      const xb = xs.reduce((a, b) => a + b, 0) / n
      let sxx = 0
      for (const x of xs) sxx += (x - xb) * (x - xb)
      let m = 0
      for (let r = 0; r < R; r++) {
        const ys = new Array<number>(n)
        let yb = 0
        for (let i = 0; i < n; i++) {
          ys[i] = 1 + 0.5 * xs[i] + normal(rng, 0, sigma)
          yb += ys[i]
        }
        yb /= n
        let sxy = 0
        for (let i = 0; i < n; i++) sxy += (xs[i] - xb) * (ys[i] - yb)
        const b2 = sxy / sxx
        const b1 = yb - b2 * xb
        let scr = 0
        for (let i = 0; i < n; i++) {
          const e = ys[i] - b1 - b2 * xs[i]
          scr += e * e
        }
        m += scr / (sigma * sigma)
      }
      m /= R
      // Var(χ²(8)) = 16, écart-type MC ≈ 4/sqrt(3000) ≈ 0,073
      return { observed: m, expected: n - 2, tolerance: 0.3 }
    },
  },
  {
    name: 'ch2-melange-sans-biais',
    claim: 'PC2 Ex. 2 : l’EMV non seuillé θ̂n = (b·Na/n − a)/(b − a) est sans biais, E_θ[θ̂n] = θ (a = 1, b = 3, θ = 0,2, n = 10, 4000 répétitions)',
    run(rng) {
      const a = 1
      const b = 3
      const theta = 0.2
      const n = 10
      const R = 4000
      let m = 0
      for (let r = 0; r < R; r++) {
        let na = 0
        for (let i = 0; i < n; i++) {
          // mélange : composante U([0,a]) avec probabilité theta, U([0,b]) sinon
          const x = rng() < theta ? uniform(rng, 0, a) : uniform(rng, 0, b)
          if (x <= a) na++
        }
        m += (b * (na / n) - a) / (b - a)
      }
      m /= R
      // Var(θ̂n) = b² p(1−p)/(n(b−a)²) ≈ 0,056, écart-type MC ≈ 0,0037
      return { observed: m, expected: theta, tolerance: 0.02 }
    },
  },
  {
    name: 'ch2-log-vraisemblance-limite-bernoulli',
    claim: 'Prop. 1.3 / Ex. 4.4 : pour un n-échantillon Ber(θ⋆), E_θ⋆[ℓn(ϑ)] = M_θ⋆(ϑ) = θ⋆ log ϑ + (1−θ⋆) log(1−ϑ), et M_θ⋆(θ⋆) − M_θ⋆(ϑ) = KL(Ber(θ⋆), Ber(ϑ)) (θ⋆ = 1/3, ϑ = 0,6, n = 50, 2000 répétitions)',
    run(rng) {
      const ts = 1 / 3
      const vt = 0.6
      const n = 50
      const R = 2000
      let m = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += bernoulli(rng, ts)
        const xb = s / n
        m += xb * Math.log(vt) + (1 - xb) * Math.log(1 - vt)
      }
      m /= R
      const M = ts * Math.log(vt) + (1 - ts) * Math.log(1 - vt)
      // Var(ℓn(ϑ)) = θ⋆(1−θ⋆)(log(ϑ/(1−ϑ)))²/n ≈ 7,3e-4 ; écart-type MC ≈ 6e-4
      return { observed: m, expected: M, tolerance: 0.004 }
    },
  },
]
