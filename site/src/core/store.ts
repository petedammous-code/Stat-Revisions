/**
 * Progression sauvegardée en localStorage (toujours protégée par try/catch).
 * Structure plate : une entrée par tentative, agrégée à la lecture.
 */
import type { ExerciseType } from '../content/types'

export type Outcome = 0 | 0.5 | 1

export interface Attempt {
  /** slug du chapitre, ex. 'ch2' */
  chapter: string
  itemId: string
  type: ExerciseType | 'flashcard' | 'preuve' | 'examen'
  tags: string[]
  outcome: Outcome
  /** timestamp ms */
  at: number
}

export interface ItemStats {
  attempts: number
  score: number
  last: number
  lastOutcome: Outcome
  /** Intervalle de répétition espacée (jours). */
  interval: number
  /** Prochaine révision conseillée (ms). */
  due: number
}

interface StoreData {
  version: 1
  attempts: Attempt[]
  items: Record<string, ItemStats>
  /** Sections du cours lues (ids). */
  read: Record<string, number>
  theme?: 'light' | 'dark'
  exams: ExamRecord[]
}

export interface ExamRecord {
  at: number
  durationSec: number
  score: number
  total: number
  perChapter: Record<string, { score: number; total: number }>
}

const KEY = 'stat-revisions-v1'

function empty(): StoreData {
  return { version: 1, attempts: [], items: {}, read: {}, exams: [] }
}

let cache: StoreData | null = null

function load(): StoreData {
  if (cache) return cache
  try {
    const raw = typeof localStorage !== 'undefined' ? localStorage.getItem(KEY) : null
    if (raw) {
      const parsed = JSON.parse(raw) as StoreData
      if (parsed && parsed.version === 1) {
        cache = { ...empty(), ...parsed }
        return cache
      }
    }
  } catch {
    /* localStorage indisponible ou corrompu : on repart de zéro */
  }
  cache = empty()
  return cache
}

function save(): void {
  try {
    if (typeof localStorage !== 'undefined') localStorage.setItem(KEY, JSON.stringify(load()))
  } catch {
    /* quota dépassé ou mode privé : on continue en mémoire */
  }
}

function itemKey(chapter: string, itemId: string): string {
  return `${chapter}::${itemId}`
}

const DAY = 24 * 3600 * 1000

/** Enregistre une tentative et met à jour la répétition espacée (SM-2 simplifié). */
export function recordAttempt(a: Omit<Attempt, 'at'>): ItemStats {
  const data = load()
  const at = Date.now()
  data.attempts.push({ ...a, at })
  if (data.attempts.length > 5000) data.attempts.splice(0, data.attempts.length - 5000)
  const key = itemKey(a.chapter, a.itemId)
  const prev = data.items[key] ?? { attempts: 0, score: 0, last: 0, lastOutcome: 0 as Outcome, interval: 0, due: 0 }
  let interval: number
  if (a.outcome === 1) interval = prev.interval <= 0 ? 1 : prev.interval >= 1 && prev.interval < 3 ? 3 : prev.interval * 2.2
  else if (a.outcome === 0.5) interval = Math.max(0.5, prev.interval * 0.6)
  else interval = 0.25
  const next: ItemStats = {
    attempts: prev.attempts + 1,
    score: prev.score + a.outcome,
    last: at,
    lastOutcome: a.outcome,
    interval,
    due: at + interval * DAY,
  }
  data.items[key] = next
  save()
  return next
}

export function getItemStats(chapter: string, itemId: string): ItemStats | undefined {
  return load().items[itemKey(chapter, itemId)]
}

export function markRead(sectionId: string): void {
  const d = load()
  d.read[sectionId] = Date.now()
  save()
}

export function isRead(sectionId: string): boolean {
  return !!load().read[sectionId]
}

export function allAttempts(): Attempt[] {
  return load().attempts.slice()
}

export interface Aggregate {
  attempts: number
  score: number
  /** Nombre d'items distincts tentés. */
  items: number
}

/** Agrège par chapitre et par type. */
export function aggregate(filter: (a: Attempt) => boolean): Aggregate {
  const seen = new Set<string>()
  let attempts = 0
  let score = 0
  for (const a of load().attempts) {
    if (!filter(a)) continue
    attempts++
    score += a.outcome
    seen.add(itemKey(a.chapter, a.itemId))
  }
  return { attempts, score, items: seen.size }
}

/** Taux de réussite par tag (pour la révision ciblée). */
export function weaknessByTag(): { tag: string; attempts: number; rate: number }[] {
  const acc = new Map<string, { n: number; s: number }>()
  for (const a of load().attempts) {
    for (const t of a.tags) {
      const e = acc.get(t) ?? { n: 0, s: 0 }
      e.n++
      e.s += a.outcome
      acc.set(t, e)
    }
  }
  return [...acc.entries()]
    .map(([tag, e]) => ({ tag, attempts: e.n, rate: e.s / e.n }))
    .sort((x, y) => x.rate - y.rate || y.attempts - x.attempts)
}

/** Items à réviser : échus (due < now), triés par urgence ; puis jamais vus. */
export function dueItems(now = Date.now()): { chapter: string; itemId: string; stats: ItemStats }[] {
  const d = load()
  return Object.entries(d.items)
    .map(([k, stats]) => {
      const [chapter, itemId] = k.split('::')
      return { chapter, itemId, stats }
    })
    .filter((x) => x.stats.due <= now)
    .sort((x, y) => x.stats.lastOutcome - y.stats.lastOutcome || x.stats.due - y.stats.due)
}

export function recordExam(r: ExamRecord): void {
  const d = load()
  d.exams.push(r)
  save()
}

export function allExams(): ExamRecord[] {
  return load().exams.slice()
}

export function getTheme(): 'light' | 'dark' | undefined {
  return load().theme
}

export function setTheme(t: 'light' | 'dark'): void {
  load().theme = t
  save()
}

/** Efface toute la progression (demande confirmation côté UI). */
export function resetAll(): void {
  cache = empty()
  save()
}

export function exportJson(): string {
  return JSON.stringify(load(), null, 2)
}
