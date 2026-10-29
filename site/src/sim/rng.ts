/**
 * Générateur pseudo-aléatoire déterministe (mulberry32) et lois usuelles.
 * Fonctions pures : `rng()` renvoie un uniforme sur [0,1).
 * Utilisé par les visualisations et par les tests Monte-Carlo.
 */
export type Rng = () => number

export function makeRng(seed: number): Rng {
  let a = seed >>> 0
  return () => {
    a = (a + 0x6d2b79f5) >>> 0
    let t = a
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
}

/** Uniforme sur [a,b). */
export function uniform(rng: Rng, a = 0, b = 1): number {
  return a + (b - a) * rng()
}

/** Gaussienne N(mu, sigma²) par Box–Muller. */
export function normal(rng: Rng, mu = 0, sigma = 1): number {
  let u = 0
  while (u === 0) u = rng()
  const v = rng()
  return mu + sigma * Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v)
}

/** Exponentielle de paramètre lambda (espérance 1/lambda). */
export function exponential(rng: Rng, lambda: number): number {
  let u = 0
  while (u === 0) u = rng()
  return -Math.log(u) / lambda
}

/** Bernoulli(p). */
export function bernoulli(rng: Rng, p: number): number {
  return rng() < p ? 1 : 0
}

/** Binomiale(n,p) (somme de Bernoulli ; n modéré). */
export function binomial(rng: Rng, n: number, p: number): number {
  let s = 0
  for (let i = 0; i < n; i++) if (rng() < p) s++
  return s
}

/** Poisson(lambda) par la méthode de Knuth (lambda modéré) ou approximation pour grand lambda. */
export function poisson(rng: Rng, lambda: number): number {
  if (lambda > 500) return Math.max(0, Math.round(normal(rng, lambda, Math.sqrt(lambda))))
  const L = Math.exp(-lambda)
  let k = 0
  let p = 1
  do {
    k++
    p *= rng()
  } while (p > L)
  return k - 1
}

/** Géométrique sur {1,2,…} de paramètre p. */
export function geometric(rng: Rng, p: number): number {
  let u = 0
  while (u === 0) u = rng()
  return Math.floor(Math.log(u) / Math.log(1 - p)) + 1
}

/**
 * Gamma(shape=a, rate=b) : densité b^a x^{a-1} e^{-bx} / Γ(a) — convention du poly (Examen 2025).
 * Marsaglia–Tsang.
 */
export function gamma(rng: Rng, a: number, b = 1): number {
  if (a < 1) {
    const u = rng()
    return gamma(rng, 1 + a, b) * Math.pow(u, 1 / a)
  }
  const d = a - 1 / 3
  const c = 1 / Math.sqrt(9 * d)
  for (;;) {
    let x: number
    let v: number
    do {
      x = normal(rng)
      v = 1 + c * x
    } while (v <= 0)
    v = v * v * v
    const u = rng()
    if (u < 1 - 0.0331 * x * x * x * x) return (d * v) / b
    if (Math.log(u) < 0.5 * x * x + d * (1 - v + Math.log(v))) return (d * v) / b
  }
}

/** Khi-deux à k degrés de liberté = Gamma(k/2, 1/2). */
export function chi2(rng: Rng, k: number): number {
  return gamma(rng, k / 2, 1 / 2)
}

/** Beta(a,b). */
export function beta(rng: Rng, a: number, b: number): number {
  const x = gamma(rng, a, 1)
  const y = gamma(rng, b, 1)
  return x / (x + y)
}

/** Student à k degrés de liberté. */
export function student(rng: Rng, k: number): number {
  return normal(rng) / Math.sqrt(chi2(rng, k) / k)
}

/** Cauchy(x0, gamma). */
export function cauchy(rng: Rng, x0 = 0, g = 1): number {
  return x0 + g * Math.tan(Math.PI * (rng() - 0.5))
}

/** Laplace(mu, b). */
export function laplace(rng: Rng, mu = 0, b = 1): number {
  const u = rng() - 0.5
  return mu - b * Math.sign(u) * Math.log(1 - 2 * Math.abs(u))
}

/** Weibull : X = (θ · Exp(1))^{1/c} a pour densité (c/θ) x^{c-1} e^{-x^c/θ}. */
export function weibullPoly(rng: Rng, theta: number, c: number): number {
  return Math.pow(theta * exponential(rng, 1), 1 / c)
}

/** Log-normale LN(mu, sigma²). */
export function lognormal(rng: Rng, mu: number, sigma: number): number {
  return Math.exp(normal(rng, mu, sigma))
}

/** Choix d'un indice selon des probabilités. */
export function categorical(rng: Rng, probs: number[]): number {
  const u = rng()
  let acc = 0
  for (let i = 0; i < probs.length; i++) {
    acc += probs[i]
    if (u < acc) return i
  }
  return probs.length - 1
}

/** Échantillon i.i.d. de taille n. */
export function sample(n: number, draw: () => number): number[] {
  const out = new Array<number>(n)
  for (let i = 0; i < n; i++) out[i] = draw()
  return out
}

/** Mélange de Fisher–Yates (copie). */
export function shuffle<T>(arr: T[], rng: Rng = Math.random): T[] {
  const a = arr.slice()
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}
