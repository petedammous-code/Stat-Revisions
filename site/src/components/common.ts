import type { Exercise, Difficulty } from '../content/types'
import { EXERCISE_TYPE_LABELS } from '../content/types'
import { el, badge } from '../core/ui'
import { richInline } from '../core/rich'
import { recordAttempt, getItemStats, type Outcome } from '../core/store'

export interface ExerciseContext {
  chapter: string
  /** Appelé quand l'exercice est terminé (score ∈ {0, 0.5, 1}). */
  onDone?: (outcome: Outcome) => void
  /** Mode examen : pas de feedback immédiat, pas d'enregistrement. */
  exam?: boolean
}

export function difficultyStars(d: Difficulty): string {
  return '★'.repeat(d) + '☆'.repeat(3 - d)
}

const ORIGIN_LABEL: Record<Exercise['origin'], string> = {
  annale: 'Annale',
  pc: 'PC',
  variante: 'Variante (créée dans le style du cours)',
  poly: 'Poly',
}

/** En-tête commun : titre, type, source, difficulté, origine, statut. */
export function exerciseHeader(ex: Exercise, ctx: ExerciseContext): HTMLElement {
  const h = el('header', 'ex-header')
  const title = el('h3', 'ex-title', richInline(ex.title))
  const meta = el('div', 'ex-meta')
  meta.append(badge(EXERCISE_TYPE_LABELS[ex.type], 'badge badge-type'))
  meta.append(badge(difficultyStars(ex.difficulty), 'badge badge-diff'))
  meta.append(badge(ORIGIN_LABEL[ex.origin], `badge badge-origin-${ex.origin}`))
  meta.append(badge(ex.source, 'badge badge-src'))
  const st = getItemStats(ctx.chapter, ex.id)
  if (st && !ctx.exam) {
    const rate = Math.round((100 * st.score) / st.attempts)
    meta.append(badge(`${st.attempts} essai${st.attempts > 1 ? 's' : ''} · ${rate} %`, 'badge badge-stat'))
  }
  h.append(title, meta)
  return h
}

export function finish(ex: Exercise, ctx: ExerciseContext, outcome: Outcome): void {
  if (!ctx.exam) recordAttempt({ chapter: ctx.chapter, itemId: ex.id, type: ex.type, tags: ex.tags, outcome })
  ctx.onDone?.(outcome)
}

/** Mélange déterministe léger pour l'affichage (évite que la bonne réponse soit toujours première). */
export function shuffled<T>(arr: T[], seed: string): T[] {
  let h = 2166136261
  for (let i = 0; i < seed.length; i++) h = Math.imul(h ^ seed.charCodeAt(i), 16777619)
  const rng = () => {
    h = (h + 0x6d2b79f5) >>> 0
    let t = h
    t = Math.imul(t ^ (t >>> 15), t | 1)
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61)
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296
  }
  const a = arr.map((v, i) => ({ v, i }))
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(rng() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a.map((x) => x.v)
}

/**
 * Conteneur des explications. En mode examen, il est masqué jusqu'à la correction finale
 * (classe `exam-hidden`, retirée par le mode examen blanc).
 */
export function explanationsBox(ctx: ExerciseContext): HTMLElement {
  const d = el('div', 'explanations')
  if (ctx.exam) d.classList.add('exam-hidden')
  return d
}
