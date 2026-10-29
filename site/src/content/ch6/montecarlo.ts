import type { MonteCarloCheck } from '../types'
import { normal, exponential, uniform } from '../../sim/rng'
import { normalQuantile } from '../../sim/stats'

/**
 * Vérifications Monte-Carlo des résultats du chapitre 6.
 * Chaque `run` est déterministe (le générateur `rng` est fourni par le test) et rapide.
 */
export const monteCarlo: MonteCarloCheck[] = [
  {
    name: 'ch6-couverture-ic-slutsky',
    claim: 'Méthode 1.1 / Lemme 1.1 (iii) : l’IC asymptotique [θ̂n(1 ± z_{0,975}/√n)] pour θ dans le modèle E(θ) a une couverture ≈ 0,95 (n = 200, 2000 répétitions)',
    run(rng) {
      const theta = 2
      const n = 200
      const R = 2000
      const z = normalQuantile(0.975)
      let covered = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, theta)
        const hat = n / s
        const a = hat * (1 - z / Math.sqrt(n))
        const b = hat * (1 + z / Math.sqrt(n))
        if (a <= theta && theta <= b) covered++
      }
      // écart-type Monte-Carlo ≈ 0,005 ; on ajoute la marge due à n fini (couverture ≈ 94–96 % d’après le corrigé PC6)
      return { observed: covered / R, expected: 0.95, tolerance: 0.025 }
    },
  },
  {
    name: 'ch6-tcl-variance',
    claim: 'Thm 1.6 (TCL) : la variance de √n(X̄n − μ) vaut σ² ; ici X ~ E(2), σ² = 1/4 (n = 100, 4000 répétitions)',
    run(rng) {
      const lambda = 2
      const n = 100
      const R = 4000
      const vals = new Array<number>(R)
      let m = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, lambda)
        vals[r] = Math.sqrt(n) * (s / n - 1 / lambda)
        m += vals[r]
      }
      m /= R
      let v = 0
      for (const x of vals) v += (x - m) * (x - m)
      v /= R - 1
      // écart-type MC de la variance empirique ≈ σ²·sqrt(2/R) ≈ 0,006
      return { observed: v, expected: 1 / (lambda * lambda), tolerance: 0.03 }
    },
  },
  {
    name: 'ch6-delta-methode',
    claim: 'Thm 1.7 (méthode-δ) et Ex. 1.7 : Var(√n(1/X̄n − θ)) → ġ(1/θ)² · 1/θ² = θ² pour X ~ E(θ), θ = 2 (n = 400, 4000 répétitions)',
    run(rng) {
      const theta = 2
      const n = 400
      const R = 4000
      const vals = new Array<number>(R)
      let m = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        for (let i = 0; i < n; i++) s += exponential(rng, theta)
        vals[r] = Math.sqrt(n) * (n / s - theta)
        m += vals[r]
      }
      m /= R
      let v = 0
      for (const x of vals) v += (x - m) * (x - m)
      v /= R - 1
      // valeur exacte à n fini : n·Var(1/X̄n) = θ² n³/((n−1)²(n−2)) ≈ 4,04 ; bruit MC ≈ 0,1
      return { observed: v, expected: theta * theta, tolerance: 0.45 }
    },
  },
  {
    name: 'ch6-variance-empirique-loi-limite',
    claim: 'Ex. 1.6 : Var(√n(σ̂n² − σ²)) → γ = ∫(x−μ)⁴Q(dx) − σ⁴ = 2σ⁴ = 2 pour X ~ N(0,1) (n = 400, 5000 répétitions)',
    run(rng) {
      const n = 400
      const R = 5000
      const vals = new Array<number>(R)
      let m = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        let s2 = 0
        for (let i = 0; i < n; i++) {
          const x = normal(rng)
          s += x
          s2 += x * x
        }
        const mu = s / n
        vals[r] = Math.sqrt(n) * (s2 / n - mu * mu - 1)
        m += vals[r]
      }
      m /= R
      let v = 0
      for (const x of vals) v += (x - m) * (x - m)
      v /= R - 1
      // kurtosis de χ²(1)−1 élevée : écart-type MC ≈ 2·sqrt(14/5000) ≈ 0,1 ; biais fini-n 2/n
      return { observed: v, expected: 2, tolerance: 0.35 }
    },
  },
  {
    name: 'ch6-uniforme-vitesse-n',
    claim: 'Ex. 1.5 : n(θ − X_{n:n}) ⇒ E(θ⁻¹), d’espérance θ (θ = 2, n = 200, 4000 répétitions)',
    run(rng) {
      const theta = 2
      const n = 200
      const R = 4000
      let m = 0
      for (let r = 0; r < R; r++) {
        let mx = 0
        for (let i = 0; i < n; i++) {
          const x = uniform(rng, 0, theta)
          if (x > mx) mx = x
        }
        m += n * (theta - mx)
      }
      m /= R
      // espérance exacte à n fini : θ n/(n+1) ≈ 1,99 ; écart-type MC ≈ θ/sqrt(R) ≈ 0,03
      return { observed: m, expected: theta, tolerance: 0.15 }
    },
  },
  {
    name: 'ch6-student-asymptotique-taille',
    claim: 'Ex. 1.14 : sous H0, P(|√n(X̄n − μ0)/Sn| > z_{0,975}) → α = 0,05 pour des observations E(1) non gaussiennes (n = 100, 4000 répétitions)',
    run(rng) {
      const n = 100
      const R = 4000
      const z = normalQuantile(0.975)
      let rej = 0
      for (let r = 0; r < R; r++) {
        let s = 0
        let s2 = 0
        for (let i = 0; i < n; i++) {
          const x = exponential(rng, 1)
          s += x
          s2 += x * x
        }
        const mu = s / n
        const sn = Math.sqrt((s2 - n * mu * mu) / (n - 1))
        const t = (Math.sqrt(n) * (mu - 1)) / sn
        if (Math.abs(t) > z) rej++
      }
      // écart-type MC ≈ 0,0035 ; écart fini-n de l’ordre de 0,01 pour une loi dissymétrique
      return { observed: rej / R, expected: 0.05, tolerance: 0.02 }
    },
  },
]
