/**
 * Outils numériques partagés par les visualisations et les tests Monte-Carlo du chapitre 7.
 * Fonctions pures (aucun Math.random : les tirages passent par un Rng fourni).
 */
import { normal, cauchy, laplace, type Rng } from '../../../sim/rng'
import { normalCdf, normalPdf } from '../../../sim/stats'

/** Histogramme normalisé en densité, en IGNORANT les valeurs hors de [lo, hi] (normalisation par l'effectif total). */
export function histDensity(xs: number[], bins: number, lo: number, hi: number): { centers: number[]; density: number[]; width: number; outside: number } {
  const width = (hi - lo) / bins
  const counts = new Array<number>(bins).fill(0)
  let outside = 0
  for (const x of xs) {
    if (!(x >= lo && x < hi)) {
      outside++
      continue
    }
    counts[Math.min(bins - 1, Math.floor((x - lo) / width))]++
  }
  const centers = counts.map((_, k) => lo + (k + 0.5) * width)
  const density = counts.map((c) => c / (xs.length * width))
  return { centers, density, width, outside }
}

/** Intégrale de Simpson de f sur [a, b] avec N (pair) sous-intervalles. */
export function simpson(f: (x: number) => number, a: number, b: number, N = 400): number {
  if (b <= a) return 0
  const n = N % 2 === 0 ? N : N + 1
  const h = (b - a) / n
  let s = f(a) + f(b)
  for (let i = 1; i < n; i++) s += (i % 2 === 1 ? 4 : 2) * f(a + i * h)
  return (s * h) / 3
}

export function medianOf(xs: number[]): number {
  const s = xs.slice().sort((a, b) => a - b)
  const m = s.length >> 1
  return s.length % 2 === 1 ? s[m] : 0.5 * (s[m - 1] + s[m])
}

export function meanOf(xs: number[]): number {
  let s = 0
  for (const x of xs) s += x
  return s / xs.length
}

/** Variance empirique (diviseur R − 1). */
export function varOf(xs: number[]): number {
  const m = meanOf(xs)
  let s = 0
  for (const x of xs) s += (x - m) * (x - m)
  return s / (xs.length - 1)
}

/** Fonctions d'influence de translation γ (PC7 Ex. 5) : ψ(θ, x) = γ(x − θ). */
export type GammaKind = 'signe' | 'identite' | 'huber' | 'arctan'

export function gammaFn(kind: GammaKind, k = 1.345): (u: number) => number {
  switch (kind) {
    case 'signe':
      return (u) => (u > 0 ? 1 : u < 0 ? -1 : 0)
    case 'identite':
      return (u) => u
    case 'huber':
      return (u) => (u > k ? k : u < -k ? -k : u)
    case 'arctan':
      return (u) => Math.atan(u)
  }
}

/** Dérivée γ' (au sens presque partout ; 0 pour signe, la « dérivée » 2δ₀ est traitée à part). */
export function gammaPrime(kind: GammaKind, k = 1.345): (u: number) => number {
  switch (kind) {
    case 'signe':
      return () => 0
    case 'identite':
      return () => 1
    case 'huber':
      return (u) => (Math.abs(u) < k ? 1 : 0)
    case 'arctan':
      return (u) => 1 / (1 + u * u)
  }
}

/**
 * Zéro (généralisé) de la fonction décroissante θ ↦ (1/n) Σ γ(x_i − θ), par dichotomie :
 * point de changement de signe (PC7 Ex. 5 Q1). Pour γ = signe, renvoie la médiane empirique.
 */
export function zEstimate(xs: number[], kind: GammaKind, k = 1.345): number {
  if (kind === 'identite') return meanOf(xs)
  if (kind === 'signe') return medianOf(xs)
  const g = gammaFn(kind, k)
  const psi = (t: number) => {
    let s = 0
    for (const x of xs) s += g(x - t)
    return s
  }
  const med = medianOf(xs)
  let lo = med - 1
  let hi = med + 1
  while (psi(lo) < 0) lo -= 2 * (hi - lo)
  while (psi(hi) > 0) hi += 2 * (hi - lo)
  for (let it = 0; it < 50; it++) {
    const mid = 0.5 * (lo + hi)
    if (psi(mid) > 0) lo = mid
    else hi = mid
  }
  return 0.5 * (lo + hi)
}

/** EMV du modèle de Cauchy de translation : score de Fisher itéré depuis la médiane (𝕀 = 1/2, pas θ ← θ + 2·moyenne du score). */
export function cauchyMle(xs: number[]): number {
  let t = medianOf(xs)
  const n = xs.length
  for (let it = 0; it < 40; it++) {
    let s = 0
    for (const x of xs) {
      const u = x - t
      s += (2 * u) / (1 + u * u)
    }
    const step = (2 * s) / n
    t += step
    if (Math.abs(step) < 1e-10) break
  }
  return t
}

/** Lois de translation centrées (densité f symétrique), pour V[γ] et l'information de Fisher. */
export type TransLaw = 'gauss' | 'laplace' | 'student3' | 'cauchy' | 'contam'

export interface TransSpec {
  label: string
  tex: string
  pdf: (x: number) => number
  cdf: (x: number) => number
  /** −f'/f : score de translation (ψ optimal à une constante près). */
  score: (x: number) => number
  /** Variance (Infinity si absente). */
  variance: number
  /** Information de Fisher 𝕀 (translation : ne dépend pas de θ). */
  fisher: number
  draw: (rng: Rng) => number
  /** Demi-largeur d'intégration raisonnable. */
  range: number
}

const SQ3 = Math.sqrt(3)

export function transLaw(law: TransLaw, eps = 0.01, tau = 10): TransSpec {
  switch (law) {
    case 'gauss':
      return {
        label: 'Gaussienne N(0,1)',
        tex: '\\mathcal{N}(0,1)',
        pdf: (x) => normalPdf(x),
        cdf: (x) => normalCdf(x),
        score: (x) => x,
        variance: 1,
        fisher: 1,
        draw: (r) => normal(r),
        range: 9,
      }
    case 'laplace':
      return {
        label: 'Laplace(0,1)',
        tex: '\\text{Laplace}(0,1)',
        pdf: (x) => 0.5 * Math.exp(-Math.abs(x)),
        cdf: (x) => (x < 0 ? 0.5 * Math.exp(x) : 1 - 0.5 * Math.exp(-x)),
        score: (x) => Math.sign(x),
        variance: 2,
        fisher: 1,
        draw: (r) => laplace(r, 0, 1),
        range: 40,
      }
    case 'student3': {
      const c = 2 / (Math.PI * SQ3)
      return {
        label: 'Student t(3)',
        tex: 't(3)',
        pdf: (x) => c / Math.pow(1 + (x * x) / 3, 2),
        cdf: (x) => 0.5 + (1 / Math.PI) * (x / (SQ3 * (1 + (x * x) / 3)) + Math.atan(x / SQ3)),
        score: (x) => (4 * x) / (3 + x * x),
        variance: 3,
        fisher: 2 / 3,
        draw: (r) => {
          // t(3) = N / sqrt(χ²(3)/3), χ²(3) = somme de 3 N² indépendantes
          const z = normal(r)
          const a = normal(r)
          const b = normal(r)
          const d = normal(r)
          return z / Math.sqrt((a * a + b * b + d * d) / 3)
        },
        range: 200,
      }
    }
    case 'cauchy':
      return {
        label: 'Cauchy(0,1)',
        tex: '\\text{Cauchy}(0,1)',
        pdf: (x) => 1 / (Math.PI * (1 + x * x)),
        cdf: (x) => 0.5 + Math.atan(x) / Math.PI,
        score: (x) => (2 * x) / (1 + x * x),
        variance: Infinity,
        fisher: 0.5,
        draw: (r) => cauchy(r, 0, 1),
        range: 400,
      }
    case 'contam': {
      const pdf = (x: number) => (1 - eps) * normalPdf(x) + eps * normalPdf(x, 0, tau)
      const dpdf = (x: number) => -(1 - eps) * x * normalPdf(x) - (eps * x * normalPdf(x, 0, tau)) / (tau * tau)
      const L = 12 * Math.max(1, tau)
      const fisher = simpson((x) => {
        const f = pdf(x)
        const d = dpdf(x)
        return f > 1e-300 ? (d * d) / f : 0
      }, -L, L, 6000)
      return {
        label: `Mélange contaminé (ε = ${eps}, τ = ${tau})`,
        tex: `(1-\\varepsilon)\\mathcal{N}(0,1)+\\varepsilon\\mathcal{N}(0,\\tau^2)`,
        pdf,
        cdf: (x) => (1 - eps) * normalCdf(x) + eps * normalCdf(x / tau),
        score: (x) => -dpdf(x) / pdf(x),
        variance: 1 - eps + eps * tau * tau,
        fisher,
        draw: (r) => (r() < eps ? normal(r, 0, tau) : normal(r)),
        range: L,
      }
    }
  }
}

/**
 * V[γ_k] = ∫ min(|x|,k)² f / (∫_{|x|<k} f)² (PC7 Ex. 5 Q6–Q7), calculé avec la f.d.r. pour les queues.
 */
export function vHuber(spec: TransSpec, k: number): number {
  const pin = spec.cdf(k) - spec.cdf(-k)
  const inner = simpson((x) => x * x * spec.pdf(x), -k, k, 400)
  return (inner + k * k * (1 - pin)) / (pin * pin)
}

/** V[γ_0] = 1/(4 f(0)²) (médiane). */
export function vMedian(spec: TransSpec): number {
  const f0 = spec.pdf(0)
  return 1 / (4 * f0 * f0)
}

/** Format français d'un nombre (virgule décimale). */
export function fr(x: number, d = 3): string {
  if (!Number.isFinite(x)) return '+\\infty'
  return x.toFixed(d).replace('.', '{,}')
}
