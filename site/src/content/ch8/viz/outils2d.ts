/**
 * Outils numériques partagés par les visualisations du ch.8 : gaussiennes en dimension 2,
 * estimation LDA / QDA (EMV, covariances non corrigées), régression logistique (Newton),
 * k plus proches voisins. Aucun aléa ici : tout tirage passe par un `Rng` fourni.
 */
import type { Rng } from '../../../sim/rng'
import { normal } from '../../../sim/rng'

/** Covariance symétrique 2×2 stockée (s11, s12, s22). */
export type Cov2 = [number, number, number]

export interface Gauss2 {
  mu: [number, number]
  S: Cov2
}

export interface Pt {
  x: number
  y: number
  label: 1 | -1
}

/** Déterminant et inverse d’une covariance 2×2 (avec un petit terme de régularisation si besoin). */
export function invCov(S: Cov2): { det: number; inv: Cov2 } {
  let [a, b, c] = S
  let det = a * c - b * b
  if (!(det > 1e-10)) {
    a += 1e-4
    c += 1e-4
    det = a * c - b * b
    if (!(det > 1e-12)) det = 1e-12
  }
  return { det, inv: [c / det, -b / det, a / det] }
}

/** Log-densité de N(mu, S) en (x, y). */
export function logDens(g: Gauss2, x: number, y: number): number {
  const { det, inv } = invCov(g.S)
  const dx = x - g.mu[0]
  const dy = y - g.mu[1]
  const q = inv[0] * dx * dx + 2 * inv[1] * dx * dy + inv[2] * dy * dy
  return -Math.log(2 * Math.PI) - 0.5 * Math.log(det) - 0.5 * q
}

/** Tirage d’un point N(mu, S) par la décomposition de Cholesky. */
export function sampleGauss2(rng: Rng, g: Gauss2): [number, number] {
  const [a, b, c] = g.S
  const l11 = Math.sqrt(a)
  const l21 = b / l11
  const l22 = Math.sqrt(Math.max(c - l21 * l21, 1e-12))
  const z1 = normal(rng)
  const z2 = normal(rng)
  return [g.mu[0] + l11 * z1, g.mu[1] + l21 * z1 + l22 * z2]
}

/** n-échantillon du mélange : Y ~ Ber~(p), X | Y = i ~ N(mu_i, S_i). */
export function sampleMixture(rng: Rng, n: number, p: number, g1: Gauss2, gm1: Gauss2): Pt[] {
  const out: Pt[] = []
  for (let i = 0; i < n; i++) {
    const lab: 1 | -1 = rng() < p ? 1 : -1
    const [x, y] = sampleGauss2(rng, lab === 1 ? g1 : gm1)
    out.push({ x, y, label: lab })
  }
  return out
}

/** Paramètre de l’analyse discriminante (vrai ou estimé). */
export interface DiscFit {
  p: number
  g1: Gauss2
  gm1: Gauss2
}

/** Log-rapport phi_theta(x) = log(p q1 / ((1-p) q-1)) (éq. (11)). */
export function phiDisc(f: DiscFit, x: number, y: number): number {
  return Math.log(f.p / (1 - f.p)) + logDens(f.g1, x, y) - logDens(f.gm1, x, y)
}

function classStats(pts: Pt[], lab: 1 | -1): { n: number; mu: [number, number]; S: Cov2 } {
  let n = 0
  let sx = 0
  let sy = 0
  for (const q of pts) if (q.label === lab) (n++, (sx += q.x), (sy += q.y))
  const mu: [number, number] = n > 0 ? [sx / n, sy / n] : [0, 0]
  let a = 0
  let b = 0
  let c = 0
  for (const q of pts)
    if (q.label === lab) {
      const dx = q.x - mu[0]
      const dy = q.y - mu[1]
      a += dx * dx
      b += dx * dy
      c += dy * dy
    }
  const m = Math.max(n, 1)
  return { n, mu, S: [a / m + 1e-6, b / m, c / m + 1e-6] }
}

/** EMV de l’analyse discriminante (PC8 Ex. 3 Q4 et Q7). `pooled` : covariance commune (LDA). */
export function fitDisc(pts: Pt[], pooled: boolean): DiscFit {
  const s1 = classStats(pts, 1)
  const sm1 = classStats(pts, -1)
  const n = Math.max(pts.length, 1)
  const p = Math.min(1 - 1e-3, Math.max(1e-3, s1.n / n))
  if (pooled) {
    const w1 = s1.n / n
    const wm1 = sm1.n / n
    const S: Cov2 = [w1 * s1.S[0] + wm1 * sm1.S[0], w1 * s1.S[1] + wm1 * sm1.S[1], w1 * s1.S[2] + wm1 * sm1.S[2]]
    return { p, g1: { mu: s1.mu, S }, gm1: { mu: sm1.mu, S } }
  }
  return { p, g1: { mu: s1.mu, S: s1.S }, gm1: { mu: sm1.mu, S: sm1.S } }
}

/** Régression logistique avec ordonnée à l’origine : minimise (12) (+ très petite pénalité ridge) par Newton. */
export function fitLogistic(pts: Pt[]): [number, number, number] {
  let w: [number, number, number] = [0, 0, 0]
  const lambda = 1e-3
  for (let it = 0; it < 30; it++) {
    const g = [lambda * w[0], lambda * w[1], lambda * w[2]]
    const H = [
      [lambda, 0, 0],
      [0, lambda, 0],
      [0, 0, lambda],
    ]
    const n = pts.length
    for (const q of pts) {
      const z = [1, q.x, q.y]
      const y01 = q.label === 1 ? 1 : 0
      const t = w[0] + w[1] * q.x + w[2] * q.y
      const s = 1 / (1 + Math.exp(-t))
      for (let i = 0; i < 3; i++) {
        g[i] += ((s - y01) * z[i]) / n
        for (let j = 0; j < 3; j++) H[i][j] += (s * (1 - s) * z[i] * z[j]) / n
      }
    }
    const d = solve3(H, g)
    w = [w[0] - d[0], w[1] - d[1], w[2] - d[2]]
    if (Math.abs(d[0]) + Math.abs(d[1]) + Math.abs(d[2]) < 1e-8) break
  }
  return w
}

function solve3(A: number[][], b: number[]): number[] {
  const M = A.map((r, i) => [...r, b[i]])
  for (let c = 0; c < 3; c++) {
    let piv = c
    for (let r = c + 1; r < 3; r++) if (Math.abs(M[r][c]) > Math.abs(M[piv][c])) piv = r
    ;[M[c], M[piv]] = [M[piv], M[c]]
    const d = M[c][c] || 1e-12
    for (let r = 0; r < 3; r++) {
      if (r === c) continue
      const f = M[r][c] / d
      for (let k = c; k < 4; k++) M[r][k] -= f * M[c][k]
    }
  }
  return [M[0][3] / (M[0][0] || 1e-12), M[1][3] / (M[1][1] || 1e-12), M[2][3] / (M[2][2] || 1e-12)]
}

/** Grille régulière [a, b] en m points. */
export function grid(a: number, b: number, m: number): number[] {
  const out: number[] = []
  for (let i = 0; i < m; i++) out.push(a + ((b - a) * i) / (m - 1))
  return out
}

/** Matrice z[j][i] = f(xs[i], ys[j]) (convention Plotly pour les traces `contour`). */
export function zMatrix(xs: number[], ys: number[], f: (x: number, y: number) => number): number[][] {
  return ys.map((y) => xs.map((x) => f(x, y)))
}

/** Trace Plotly `contour` réduite à la ligne de niveau 0 (frontière de décision). */
export function frontierTrace(xs: number[], ys: number[], z: number[][], name: string, color: string, dash: 'solid' | 'dash' | 'dot' = 'solid'): Record<string, unknown> {
  return {
    type: 'contour',
    x: xs,
    y: ys,
    z,
    name,
    showlegend: true,
    showscale: false,
    hoverinfo: 'skip',
    contours: { start: 0, end: 0, size: 1, coloring: 'lines' },
    line: { color, width: 2.5, dash },
    colorscale: [
      [0, color],
      [1, color],
    ],
  }
}
