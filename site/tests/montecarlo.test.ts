import { describe, it, expect } from 'vitest'
import { chapters } from './helpers'
import { makeRng, normal, exponential, gamma, binomial, poisson, beta, chi2, student, sample } from '../src/sim/rng'
import { mean, variance, normalCdf, normalQuantile, gammaCdf, gammaQuantile, chi2Quantile, studentCdf, betaCdf } from '../src/sim/stats'

/** Les simulateurs du socle retrouvent les moments théoriques, et les quantiles sont cohérents. */
describe('Socle Monte-Carlo', () => {
  const rng = makeRng(12345)
  const N = 200000

  it('N(2, 9) : moyenne et variance', () => {
    const xs = sample(N, () => normal(rng, 2, 3))
    expect(Math.abs(mean(xs) - 2)).toBeLessThan(0.03)
    expect(Math.abs(variance(xs) - 9)).toBeLessThan(0.15)
  })
  it('Exp(λ=2) : espérance 1/2, variance 1/4', () => {
    const xs = sample(N, () => exponential(rng, 2))
    expect(Math.abs(mean(xs) - 0.5)).toBeLessThan(0.01)
    expect(Math.abs(variance(xs) - 0.25)).toBeLessThan(0.01)
  })
  it('Gamma(a=3, b=2) : espérance a/b, variance a/b²', () => {
    const xs = sample(N, () => gamma(rng, 3, 2))
    expect(Math.abs(mean(xs) - 1.5)).toBeLessThan(0.02)
    expect(Math.abs(variance(xs) - 0.75)).toBeLessThan(0.03)
  })
  it('Gamma(a=0.5, b=1) (forme < 1)', () => {
    const xs = sample(N, () => gamma(rng, 0.5, 1))
    expect(Math.abs(mean(xs) - 0.5)).toBeLessThan(0.02)
  })
  it('Bin(10, 0.3) et Pois(4)', () => {
    const b = sample(N, () => binomial(rng, 10, 0.3))
    expect(Math.abs(mean(b) - 3)).toBeLessThan(0.03)
    expect(Math.abs(variance(b) - 2.1)).toBeLessThan(0.05)
    const p = sample(N, () => poisson(rng, 4))
    expect(Math.abs(mean(p) - 4)).toBeLessThan(0.03)
    expect(Math.abs(variance(p) - 4)).toBeLessThan(0.08)
  })
  it('Beta(2,5), χ²(4), Student(5)', () => {
    const be = sample(N, () => beta(rng, 2, 5))
    expect(Math.abs(mean(be) - 2 / 7)).toBeLessThan(0.005)
    const c = sample(N, () => chi2(rng, 4))
    expect(Math.abs(mean(c) - 4)).toBeLessThan(0.05)
    expect(Math.abs(variance(c) - 8)).toBeLessThan(0.2)
    const t = sample(N, () => student(rng, 5))
    expect(Math.abs(variance(t) - 5 / 3)).toBeLessThan(0.1)
  })
  it('fonctions de répartition et quantiles', () => {
    expect(normalCdf(1.96)).toBeCloseTo(0.975, 3)
    expect(normalQuantile(0.975)).toBeCloseTo(1.959964, 4)
    expect(gammaCdf(gammaQuantile(0.3, 2.5, 1.7), 2.5, 1.7)).toBeCloseTo(0.3, 6)
    expect(chi2Quantile(0.95, 1)).toBeCloseTo(3.8415, 3)
    expect(chi2Quantile(0.95, 10)).toBeCloseTo(18.307, 2)
    expect(studentCdf(2.015, 5)).toBeCloseTo(0.95, 2)
    expect(betaCdf(0.5, 2, 2)).toBeCloseTo(0.5, 6)
    // Lien Binomiale / Beta rappelé dans l'examen 2025 : P(Bin(n,p) ≥ k) = P(Beta(k, n-k+1) ≤ p)
    const n = 10, k = 4, p = 0.35
    let tail = 0
    for (let i = k; i <= n; i++) tail += Math.exp(Math.log(binomCoef(n, i)) + i * Math.log(p) + (n - i) * Math.log(1 - p))
    expect(betaCdf(p, k, n - k + 1)).toBeCloseTo(tail, 6)
  })
})

function binomCoef(n: number, k: number): number {
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return r
}

/** Chaque chapitre déclare des vérifications Monte-Carlo de ses résultats théoriques. */
describe('Monte-Carlo des chapitres', () => {
  it('le registre de chapitres est chargé', () => {
    expect(Array.isArray(chapters())).toBe(true)
  })
  for (const ch of chapters()) {
    describe(ch.slug, () => {
      it('déclare au moins une vérification', () => {
        expect(ch.monteCarlo.length).toBeGreaterThan(0)
      })
      for (const mc of ch.monteCarlo) {
        it(`${mc.name} — ${mc.claim}`, () => {
          const r = mc.run(makeRng(hash(mc.name)))
          expect(Number.isFinite(r.observed), 'valeur observée non finie').toBe(true)
          expect(Math.abs(r.observed - r.expected), `observé ${r.observed} vs attendu ${r.expected} (tol ${r.tolerance})`).toBeLessThanOrEqual(r.tolerance)
        })
      }
    })
  }
})

function hash(s: string): number {
  let h = 2166136261
  for (let i = 0; i < s.length; i++) h = Math.imul(h ^ s.charCodeAt(i), 16777619)
  return h >>> 0
}
