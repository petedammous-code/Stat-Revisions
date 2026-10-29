import type { MonteCarloCheck } from '../types'
import { normal } from '../../sim/rng'

/**
 * Vérifications Monte-Carlo des résultats du chapitre 9.
 * Chaque `run` est déterministe (le générateur `rng` est fourni par le test) et rapide.
 * Pour une inégalité « A ≤ B », on renvoie observed = max(0, A − B) et expected = 0.
 */

/** eta_j = P(Y = 1 | X = j) pour X uniforme sur 16 points (même loi que la visualisation du biais optimiste). */
const ETA = [0.8, 0.75, 0.7, 0.3, 0.2, 0.65, 0.35, 0.9, 0.1, 0.6, 0.4, 0.85, 0.25, 0.55, 0.45, 0.7]

export const monteCarlo: MonteCarloCheck[] = [
  {
    name: 'ch9-validation-variance',
    claim: 'PC9 Ex. 1 Q1–Q3 / Méthode 1.2 : conditionnellement à D_n, l’erreur de validation sur m points est sans biais et de variance R(g_n)(1 − R(g_n))/m ; on vérifie m·Var / (R(1 − R)) ≈ 1 (m = 40, 4000 ensembles de validation)',
    run(rng) {
      // apprentissage : seuil MRE sur une grille, X ~ U[0,1], eta = 0.2 sur [0, 1/2[, 0.8 sur [1/2, 1]
      const eta = (x: number) => (x < 0.5 ? 0.2 : 0.8)
      const n = 30
      const xs: number[] = []
      const ys: number[] = []
      for (let i = 0; i < n; i++) {
        const x = rng()
        xs.push(x)
        ys.push(rng() < eta(x) ? 1 : -1)
      }
      let best = Infinity
      let s = 0.5
      for (let k = 0; k <= 20; k++) {
        const t = k / 20
        let e = 0
        for (let i = 0; i < n; i++) if ((xs[i] >= t ? 1 : -1) !== ys[i]) e++
        if (e < best) {
          best = e
          s = t
        }
      }
      // risque exact de g_n(x) = signe(x - s) (règle gelée)
      const risk = s <= 0.5 ? s * 0.2 + (0.5 - s) * 0.8 + 0.5 * 0.2 : 0.5 * 0.2 + (s - 0.5) * 0.8 + (1 - s) * 0.2
      const m = 40
      const R = 4000
      let sum = 0
      let sum2 = 0
      for (let r = 0; r < R; r++) {
        let e = 0
        for (let j = 0; j < m; j++) {
          const x = rng()
          const y = rng() < eta(x) ? 1 : -1
          if ((x >= s ? 1 : -1) !== y) e++
        }
        const v = e / m
        sum += v
        sum2 += v * v
      }
      const mean = sum / R
      const variance = sum2 / R - mean * mean
      // écart-type MC du rapport ≈ sqrt(2/R) ≈ 0,022
      return { observed: (m * variance) / (risk * (1 - risk)), expected: 1, tolerance: 0.1 }
    },
  },
  {
    name: 'ch9-nfl-identite',
    claim: 'Th. 1.1 (preuve, Compléments §4.1) : en moyenne sur les étiquetages uniformes de K points, la règle « mémoriser, +1 ailleurs » a un risque ½(1 − 1/K)ⁿ (K = 50, n = 40, 20 000 répétitions)',
    run(rng) {
      const K = 50
      const n = 40
      const M = 20000
      let err = 0
      const seen = new Int8Array(K)
      const lab = new Int8Array(K)
      for (let r = 0; r < M; r++) {
        seen.fill(0)
        for (let j = 0; j < K; j++) lab[j] = rng() < 0.5 ? 1 : -1
        for (let i = 0; i < n; i++) seen[Math.floor(rng() * K)] = 1
        const J = Math.floor(rng() * K)
        const pred = seen[J] ? lab[J] : 1
        if (pred !== lab[J]) err++
      }
      // écart-type MC ≈ sqrt(0,22·0,78/20000) ≈ 0,003
      return { observed: err / M, expected: 0.5 * Math.pow(1 - 1 / K, n), tolerance: 0.012 }
    },
  },
  {
    name: 'ch9-ex11-sur-apprentissage',
    claim: 'Ex. 1.1 : la règle qui vaut Yᵢ en Xᵢ et 0 ailleurs a un risque empirique nul mais un risque E[Y²] ; ici Y = 2X + ε, X ~ U[0,1], ε ~ N(0,1), E[Y²] = 7/3 (20 000 points tests)',
    run(rng) {
      const n = 50
      const train = new Map<number, number>()
      for (let i = 0; i < n; i++) {
        const x = rng()
        train.set(x, 2 * x + normal(rng))
      }
      let emp = 0
      for (const [x, y] of train) emp += (y - (train.get(x) ?? 0)) ** 2
      const T = 20000
      let s = 0
      for (let t = 0; t < T; t++) {
        const x = rng()
        const y = 2 * x + normal(rng)
        const pred = train.get(x) ?? 0
        s += (y - pred) ** 2
      }
      // écart-type MC ≈ sqrt(Var(Y²)/T) ≈ 0,025 ; le risque empirique (nul) est ajouté pour le vérifier aussi
      return { observed: s / T + emp / n, expected: 7 / 3, tolerance: 0.1 }
    },
  },
  {
    name: 'ch9-hoeffding-borne',
    claim: 'Th. 1.3 (Hoeffding) : pour 100 Bernoulli(1/2), la fréquence de |Z̄ₙ − 1/2| ≥ 0,1 est ≤ 2e^{−2nε²} = 2e^{−2} ≈ 0,271 (valeur exacte ≈ 0,057) ; observed = max(0, fréquence − borne)',
    run(rng) {
      const n = 100
      const eps = 0.1
      const M = 5000
      let out = 0
      for (let r = 0; r < M; r++) {
        let s = 0
        for (let i = 0; i < n; i++) if (rng() < 0.5) s++
        if (Math.abs(s / n - 0.5) >= eps - 1e-12) out++
      }
      return { observed: Math.max(0, out / M - 2 * Math.exp(-2 * n * eps * eps)), expected: 0, tolerance: 0.005 }
    },
  },
  {
    name: 'ch9-prop11-th18',
    claim: 'Prop. 1.1 et Th. 1.8 : sur une classe finie de 64 règles (K = 16 points), E[R̂ₙ(ĝ*)] ≤ inf_C R ≤ E[R(ĝ*)] ≤ inf_C R + √(log(2|C|)/(2n)) (n = 50, 2000 échantillons) ; observed = somme des violations',
    run(rng) {
      const K = 16
      const N = 64
      const rules: number[] = []
      for (let i = 0; i < N; i++) rules.push(Math.floor(rng() * 65536))
      const riskOf = (g: number) => {
        let s = 0
        for (let j = 0; j < K; j++) s += (g >> j) & 1 ? 1 - ETA[j] : ETA[j]
        return s / K
      }
      const risks = rules.map(riskOf)
      const inf = Math.min(...risks)
      const n = 50
      const M = 2000
      let mEmp = 0
      let mRisk = 0
      const plus = new Int32Array(K)
      const minus = new Int32Array(K)
      for (let r = 0; r < M; r++) {
        plus.fill(0)
        minus.fill(0)
        for (let i = 0; i < n; i++) {
          const j = Math.floor(rng() * K)
          if (rng() < ETA[j]) plus[j]++
          else minus[j]++
        }
        let best = Infinity
        let bi = 0
        for (let q = 0; q < N; q++) {
          let e = 0
          for (let j = 0; j < K; j++) e += (rules[q] >> j) & 1 ? minus[j] : plus[j]
          if (e < best) {
            best = e
            bi = q
          }
        }
        mEmp += best / n / M
        mRisk += risks[bi] / M
      }
      const bound = Math.sqrt(Math.log(2 * N) / (2 * n))
      const viol = Math.max(0, mEmp - inf) + Math.max(0, inf - mRisk) + Math.max(0, mRisk - inf - bound)
      // écarts-types MC des moyennes ≈ 0,002 ; les inégalités ont des marges bien supérieures
      return { observed: viol, expected: 0, tolerance: 0.005 }
    },
  },
  {
    name: 'ch9-pisier-dependantes',
    claim: 'Th. 1.7 (Pisier, sans indépendance) : pour m = 100 gaussiennes N(0,1) corrélées (ρ = 0,5), E[max|Zᵢ|] ≤ √(2 log(2m)) ≈ 3,26 ; observed = max(0, E[max|Zᵢ|] − borne) (2000 répétitions)',
    run(rng) {
      const m = 100
      const M = 2000
      const rho = 0.5
      let s = 0
      for (let r = 0; r < M; r++) {
        const w = normal(rng)
        let mx = 0
        for (let i = 0; i < m; i++) {
          const z = Math.sqrt(rho) * w + Math.sqrt(1 - rho) * normal(rng)
          if (Math.abs(z) > mx) mx = Math.abs(z)
        }
        s += mx / M
      }
      return { observed: Math.max(0, s - Math.sqrt(2 * Math.log(2 * m))), expected: 0, tolerance: 0.02 }
    },
  },
  {
    name: 'ch9-lemme-hoeffding-bernoulli',
    claim: 'Lemme 1.1 : pour X ~ Bernoulli(p) centrée (intervalle de longueur 1), log E[e^{λ(X − p)}] ≤ λ²/8 pour tout λ ; vérification exacte sur une grille de p ∈ ]0,1[ et λ ∈ [−20, 20] ; observed = plus grande violation',
    run() {
      let worst = 0
      for (let a = 1; a < 100; a++) {
        const p = a / 100
        for (let b = -400; b <= 400; b++) {
          const l = b / 20
          // log(p e^{λ(1−p)} + (1−p) e^{−λp}) calculé de façon stable
          const u = l * (1 - p)
          const v = -l * p
          const mx = Math.max(u, v)
          const psi = mx + Math.log(p * Math.exp(u - mx) + (1 - p) * Math.exp(v - mx))
          worst = Math.max(worst, psi - (l * l) / 8)
        }
      }
      return { observed: worst, expected: 0, tolerance: 1e-9 }
    },
  },
]
