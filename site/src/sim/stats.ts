/** Statistiques descriptives et fonctions spéciales (pures). */

export function mean(xs: number[]): number {
  let s = 0
  for (const x of xs) s += x
  return s / xs.length
}

/** Variance empirique non biaisée (diviseur n-1). */
export function variance(xs: number[]): number {
  const m = mean(xs)
  let s = 0
  for (const x of xs) s += (x - m) * (x - m)
  return s / (xs.length - 1)
}

/** Variance empirique biaisée (diviseur n). */
export function varianceBiased(xs: number[]): number {
  const m = mean(xs)
  let s = 0
  for (const x of xs) s += (x - m) * (x - m)
  return s / xs.length
}

export function std(xs: number[]): number {
  return Math.sqrt(variance(xs))
}

export function median(xs: number[]): number {
  return quantile(xs, 0.5)
}

/** Quantile empirique (interpolation linéaire). */
export function quantile(xs: number[], p: number): number {
  const s = xs.slice().sort((a, b) => a - b)
  if (s.length === 0) return NaN
  const pos = (s.length - 1) * p
  const lo = Math.floor(pos)
  const hi = Math.ceil(pos)
  return s[lo] + (s[hi] - s[lo]) * (pos - lo)
}

/** Histogramme : bornes et effectifs normalisés en densité. */
export function histogram(xs: number[], bins: number, lo?: number, hi?: number, dropOutside = false): { centers: number[]; density: number[]; width: number } {
  const a = lo ?? Math.min(...xs)
  const b = hi ?? Math.max(...xs)
  const width = (b - a) / bins || 1
  const counts = new Array<number>(bins).fill(0)
  for (const x of xs) {
    if (dropOutside && (x < a || x > b)) continue
    let k = Math.floor((x - a) / width)
    if (k < 0) k = 0
    if (k >= bins) k = bins - 1
    counts[k]++
  }
  const centers = counts.map((_, k) => a + (k + 0.5) * width)
  const density = counts.map((c) => c / (xs.length * width))
  return { centers, density, width }
}

/** Fonction d'erreur (Abramowitz–Stegun 7.1.26, |err| < 1.5e-7). */
export function erf(x: number): number {
  const sign = x < 0 ? -1 : 1
  const ax = Math.abs(x)
  const t = 1 / (1 + 0.3275911 * ax)
  const y = 1 - ((((1.061405429 * t - 1.453152027) * t + 1.421413741) * t - 0.284496736) * t + 0.254829592) * t * Math.exp(-ax * ax)
  return sign * y
}

/** Fonction de répartition de N(0,1). */
export function normalCdf(x: number): number {
  return 0.5 * (1 + erf(x / Math.SQRT2))
}

export function normalPdf(x: number, mu = 0, sigma = 1): number {
  const z = (x - mu) / sigma
  return Math.exp(-0.5 * z * z) / (sigma * Math.sqrt(2 * Math.PI))
}

/** Quantile de N(0,1) (Acklam, précision ~1e-9). */
export function normalQuantile(p: number): number {
  if (p <= 0) return -Infinity
  if (p >= 1) return Infinity
  const a = [-3.969683028665376e1, 2.209460984245205e2, -2.759285104469687e2, 1.38357751867269e2, -3.066479806614716e1, 2.506628277459239]
  const b = [-5.447609879822406e1, 1.615858368580409e2, -1.556989798598866e2, 6.680131188771972e1, -1.328068155288572e1]
  const c = [-7.784894002430293e-3, -3.223964580411365e-1, -2.400758277161838, -2.549732539343734, 4.374664141464968, 2.938163982698783]
  const d = [7.784695709041462e-3, 3.224671290700398e-1, 2.445134137142996, 3.754408661907416]
  const pl = 0.02425
  let q: number
  let r: number
  if (p < pl) {
    q = Math.sqrt(-2 * Math.log(p))
    return (((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
  }
  if (p <= 1 - pl) {
    q = p - 0.5
    r = q * q
    return ((((((a[0] * r + a[1]) * r + a[2]) * r + a[3]) * r + a[4]) * r + a[5]) * q) / (((((b[0] * r + b[1]) * r + b[2]) * r + b[3]) * r + b[4]) * r + 1)
  }
  q = Math.sqrt(-2 * Math.log(1 - p))
  return -(((((c[0] * q + c[1]) * q + c[2]) * q + c[3]) * q + c[4]) * q + c[5]) / ((((d[0] * q + d[1]) * q + d[2]) * q + d[3]) * q + 1)
}

/** log Γ(x) (Lanczos). */
export function lgamma(x: number): number {
  const g = 7
  const coef = [0.99999999999980993, 676.5203681218851, -1259.1392167224028, 771.32342877765313, -176.61502916214059, 12.507343278686905, -0.13857109526572012, 9.9843695780195716e-6, 1.5056327351493116e-7]
  if (x < 0.5) return Math.log(Math.PI / Math.abs(Math.sin(Math.PI * x))) - lgamma(1 - x)
  x -= 1
  let a = coef[0]
  const t = x + g + 0.5
  for (let i = 1; i < g + 2; i++) a += coef[i] / (x + i)
  return 0.5 * Math.log(2 * Math.PI) + (x + 0.5) * Math.log(t) - t + Math.log(a)
}

export function gammaFn(x: number): number {
  return Math.exp(lgamma(x))
}

/** Fonction gamma incomplète régularisée P(a,x) (série + fraction continue). */
export function gammaP(a: number, x: number): number {
  if (x <= 0) return 0
  if (x < a + 1) {
    let sum = 1 / a
    let term = sum
    for (let n = 1; n < 500; n++) {
      term *= x / (a + n)
      sum += term
      if (Math.abs(term) < Math.abs(sum) * 1e-15) break
    }
    return sum * Math.exp(-x + a * Math.log(x) - lgamma(a))
  }
  // fraction continue de Lentz pour Q
  let b = x + 1 - a
  let c = 1 / 1e-300
  let d = 1 / b
  let h = d
  for (let i = 1; i < 500; i++) {
    const an = -i * (i - a)
    b += 2
    d = an * d + b
    if (Math.abs(d) < 1e-300) d = 1e-300
    c = b + an / c
    if (Math.abs(c) < 1e-300) c = 1e-300
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < 1e-15) break
  }
  return 1 - Math.exp(-x + a * Math.log(x) - lgamma(a)) * h
}

/** Densité Gamma(shape a, rate b) (convention du poly). */
export function gammaPdf(x: number, a: number, b: number): number {
  if (x <= 0) return 0
  return Math.exp(a * Math.log(b) + (a - 1) * Math.log(x) - b * x - lgamma(a))
}

/** Fonction de répartition Gamma(shape a, rate b). */
export function gammaCdf(x: number, a: number, b: number): number {
  return gammaP(a, b * x)
}

/** Quantile Gamma(shape a, rate b) par dichotomie. */
export function gammaQuantile(p: number, a: number, b: number): number {
  if (p <= 0) return 0
  if (p >= 1) return Infinity
  let lo = 0
  let hi = Math.max(1, (a / b) * 2 + (10 * Math.sqrt(a)) / b)
  while (gammaCdf(hi, a, b) < p) hi *= 2
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2
    if (gammaCdf(mid, a, b) < p) lo = mid
    else hi = mid
    if (hi - lo < 1e-12 * Math.max(1, hi)) break
  }
  return (lo + hi) / 2
}

export function chi2Cdf(x: number, k: number): number {
  return gammaCdf(x, k / 2, 1 / 2)
}

export function chi2Quantile(p: number, k: number): number {
  return gammaQuantile(p, k / 2, 1 / 2)
}

export function chi2Pdf(x: number, k: number): number {
  return gammaPdf(x, k / 2, 1 / 2)
}

export function expPdf(x: number, lambda: number): number {
  return x < 0 ? 0 : lambda * Math.exp(-lambda * x)
}

export function expCdf(x: number, lambda: number): number {
  return x < 0 ? 0 : 1 - Math.exp(-lambda * x)
}

/** Fonction bêta incomplète régularisée I_x(a,b) (fraction continue). */
export function betaInc(x: number, a: number, b: number): number {
  if (x <= 0) return 0
  if (x >= 1) return 1
  const bt = Math.exp(lgamma(a + b) - lgamma(a) - lgamma(b) + a * Math.log(x) + b * Math.log(1 - x))
  if (x < (a + 1) / (a + b + 2)) return (bt * betacf(x, a, b)) / a
  return 1 - (bt * betacf(1 - x, b, a)) / b
}

function betacf(x: number, a: number, b: number): number {
  const qab = a + b
  const qap = a + 1
  const qam = a - 1
  let c = 1
  let d = 1 - (qab * x) / qap
  if (Math.abs(d) < 1e-300) d = 1e-300
  d = 1 / d
  let h = d
  for (let m = 1; m <= 300; m++) {
    const m2 = 2 * m
    let aa = (m * (b - m) * x) / ((qam + m2) * (a + m2))
    d = 1 + aa * d
    if (Math.abs(d) < 1e-300) d = 1e-300
    c = 1 + aa / c
    if (Math.abs(c) < 1e-300) c = 1e-300
    d = 1 / d
    h *= d * c
    aa = (-(a + m) * (qab + m) * x) / ((a + m2) * (qap + m2))
    d = 1 + aa * d
    if (Math.abs(d) < 1e-300) d = 1e-300
    c = 1 + aa / c
    if (Math.abs(c) < 1e-300) c = 1e-300
    d = 1 / d
    const del = d * c
    h *= del
    if (Math.abs(del - 1) < 1e-14) break
  }
  return h
}

export function betaPdf(x: number, a: number, b: number): number {
  if (x <= 0 || x >= 1) return 0
  return Math.exp((a - 1) * Math.log(x) + (b - 1) * Math.log(1 - x) + lgamma(a + b) - lgamma(a) - lgamma(b))
}

export function betaCdf(x: number, a: number, b: number): number {
  return betaInc(x, a, b)
}

/** Fonction de répartition de Student(k). */
export function studentCdf(t: number, k: number): number {
  const x = k / (k + t * t)
  const tail = 0.5 * betaInc(x, k / 2, 0.5)
  return t >= 0 ? 1 - tail : tail
}

export function studentPdf(t: number, k: number): number {
  return Math.exp(lgamma((k + 1) / 2) - lgamma(k / 2)) / Math.sqrt(k * Math.PI) * Math.pow(1 + (t * t) / k, -(k + 1) / 2)
}

export function studentQuantile(p: number, k: number): number {
  if (p <= 0) return -Infinity
  if (p >= 1) return Infinity
  let lo = -1e3
  let hi = 1e3
  for (let i = 0; i < 200; i++) {
    const mid = (lo + hi) / 2
    if (studentCdf(mid, k) < p) lo = mid
    else hi = mid
    if (hi - lo < 1e-10) break
  }
  return (lo + hi) / 2
}

export function binomialPmf(k: number, n: number, p: number): number {
  if (k < 0 || k > n) return 0
  return Math.exp(lgamma(n + 1) - lgamma(k + 1) - lgamma(n - k + 1) + k * Math.log(p) + (n - k) * Math.log(1 - p))
}

export function binomialCdf(k: number, n: number, p: number): number {
  let s = 0
  for (let i = 0; i <= Math.min(k, n); i++) s += binomialPmf(i, n, p)
  return Math.min(1, s)
}

export function poissonPmf(k: number, lambda: number): number {
  if (k < 0) return 0
  return Math.exp(k * Math.log(lambda) - lambda - lgamma(k + 1))
}

export function poissonCdf(k: number, lambda: number): number {
  let s = 0
  for (let i = 0; i <= k; i++) s += poissonPmf(i, lambda)
  return Math.min(1, s)
}

/** Grille régulière. */
export function linspace(a: number, b: number, n: number): number[] {
  if (n <= 1) return [a]
  const out = new Array<number>(n)
  for (let i = 0; i < n; i++) out[i] = a + ((b - a) * i) / (n - 1)
  return out
}

export function clamp(x: number, lo: number, hi: number): number {
  return Math.min(hi, Math.max(lo, x))
}

export function round(x: number, digits = 3): number {
  const f = Math.pow(10, digits)
  return Math.round(x * f) / f
}
