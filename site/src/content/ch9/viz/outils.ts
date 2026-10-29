/**
 * Outils numériques partagés par les visualisations du chapitre 9
 * (moindres carrés polynomiaux, sigmoïde, report d'un calcul coûteux).
 */

/** Exécute `fn` après `ms` millisecondes sans nouvel appel (curseurs coûteux). Renvoie l'appel et l'annulation. */
export function debounced(fn: () => void, ms = 120): { call: () => void; cancel: () => void } {
  let timer: ReturnType<typeof setTimeout> | null = null
  return {
    call: () => {
      if (timer !== null) clearTimeout(timer)
      timer = setTimeout(() => {
        timer = null
        fn()
      }, ms)
    },
    cancel: () => {
      if (timer !== null) clearTimeout(timer)
      timer = null
    },
  }
}

/** Polynômes de Legendre P_0, …, P_deg évalués en x ∈ [-1,1] (base bien conditionnée pour les moindres carrés). */
export function legendre(x: number, deg: number): number[] {
  const p = new Array<number>(deg + 1)
  p[0] = 1
  if (deg >= 1) p[1] = x
  for (let k = 1; k < deg; k++) p[k + 1] = ((2 * k + 1) * x * p[k] - k * p[k - 1]) / (k + 1)
  return p
}

/**
 * Moindres carrés : minimise sum_i (y_i - sum_k c_k P_k(x_i))^2 par factorisation QR de Householder.
 * Suppose deg + 1 <= nombre de points. Renvoie les coefficients c.
 */
export function polyLeastSquares(xs: number[], ys: number[], deg: number): number[] {
  const m = xs.length
  const p = deg + 1
  const A: number[][] = xs.map((x) => legendre(x, deg))
  const b = ys.slice()
  for (let j = 0; j < p; j++) {
    let norm = 0
    for (let i = j; i < m; i++) norm += A[i][j] * A[i][j]
    norm = Math.sqrt(norm)
    if (norm === 0) continue
    const alpha = A[j][j] > 0 ? -norm : norm
    const v = new Array<number>(m).fill(0)
    for (let i = j; i < m; i++) v[i] = A[i][j]
    v[j] -= alpha
    let vv = 0
    for (let i = j; i < m; i++) vv += v[i] * v[i]
    if (vv === 0) continue
    for (let c = j; c < p; c++) {
      let s = 0
      for (let i = j; i < m; i++) s += v[i] * A[i][c]
      const f = (2 * s) / vv
      for (let i = j; i < m; i++) A[i][c] -= f * v[i]
    }
    let s = 0
    for (let i = j; i < m; i++) s += v[i] * b[i]
    const f = (2 * s) / vv
    for (let i = j; i < m; i++) b[i] -= f * v[i]
  }
  const c = new Array<number>(p).fill(0)
  for (let j = p - 1; j >= 0; j--) {
    let s = b[j]
    for (let k = j + 1; k < p; k++) s -= A[j][k] * c[k]
    c[j] = Math.abs(A[j][j]) < 1e-14 ? 0 : s / A[j][j]
  }
  return c
}

/** Évalue sum_k c_k P_k(x). */
export function polyEval(c: number[], x: number): number {
  const p = legendre(x, c.length - 1)
  let s = 0
  for (let k = 0; k < c.length; k++) s += c[k] * p[k]
  return s
}

export function sigm(t: number): number {
  return 1 / (1 + Math.exp(-t))
}

/** log2(1 + e^z) calculé sans dépassement. */
export function log2OnePlusExp(z: number): number {
  const v = z > 30 ? z + Math.log1p(Math.exp(-z)) : Math.log1p(Math.exp(z))
  return v / Math.LN2
}
