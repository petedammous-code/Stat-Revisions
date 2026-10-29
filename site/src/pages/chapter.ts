import type { Chapter, Exercise, ExerciseType } from '../content/types'
import { EXERCISE_TYPES, EXERCISE_TYPE_LABELS } from '../content/types'
import { el, rich, badge } from '../core/ui'
import type { Route } from '../core/router'
import { renderCourse } from '../components/cours'
import { mountViz } from '../components/viz'
import { renderExercise } from '../components/exercise'
import { renderFlashcards } from '../components/flashcards'
import { renderSheet } from './fiches'
import { getItemStats } from '../core/store'

const TABS = [
  { id: 'cours', label: 'Cours' },
  { id: 'viz', label: 'Visualisations' },
  { id: 'entrainement', label: 'Entraînement' },
  { id: 'annales', label: 'Type annale' },
  { id: 'flashcards', label: 'Flashcards' },
  { id: 'fiche', label: 'Fiche de synthèse' },
]

export function renderChapterPage(ch: Chapter, route: Route): HTMLElement {
  const page = el('main', 'page')
  const tab = route.segments[2] ?? 'cours'
  const head = el('div')
  head.append(el('div', 'muted', `Chapitre ${ch.number} · PC associées : ${ch.pcs.join(', ') || '—'} · Rentabilité examen ${'●'.repeat(ch.examWeight)}${'○'.repeat(5 - ch.examWeight)}`))
  head.append(el('h1', '', ch.title))
  head.append(rich(ch.summary, 'rich muted'))
  if (ch.prerequisites.length) {
    const p = el('div', 'muted')
    p.append('Prérequis : ')
    ch.prerequisites.forEach((slug, i) => {
      const a = el('a')
      a.href = `#/ch/${slug}`
      a.textContent = slug.replace('ch', 'Chapitre ')
      p.append(a)
      if (i < ch.prerequisites.length - 1) p.append(', ')
    })
    head.append(p)
  }
  page.append(head)
  const tabs = el('nav', 'tabs')
  for (const t of TABS) {
    const a = el('a')
    a.href = `#/ch/${ch.slug}/${t.id}`
    a.textContent = t.label
    if (t.id === tab) a.classList.add('active')
    tabs.append(a)
  }
  page.append(tabs)

  switch (tab) {
    case 'viz':
      page.append(renderVizTab(ch))
      break
    case 'entrainement':
      page.append(renderTrainingTab(ch, route))
      break
    case 'annales':
      page.append(renderAnnalesTab(ch))
      break
    case 'flashcards':
      page.append(renderFlashcards(ch.flashcards, ch.slug))
      break
    case 'fiche':
      page.append(renderSheet(ch))
      break
    default:
      page.append(renderCourse(ch))
      requestAnimationFrame(() => {
        const s = route.params.get('s')
        if (s) {
          const d = document.getElementById(`section-${s}`) as HTMLDetailsElement | null
          if (d) {
            d.open = true
            d.scrollIntoView({ behavior: 'smooth' })
          }
        }
      })
  }
  return page
}

function renderVizTab(ch: Chapter): HTMLElement {
  const wrap = el('div')
  if (ch.vizs.length === 0) wrap.append(rich('*Aucune visualisation pour ce chapitre.*'))
  for (const v of ch.vizs) wrap.append(mountViz(v))
  return wrap
}

function renderTrainingTab(ch: Chapter, route: Route): HTMLElement {
  const wrap = el('div')
  const exercises = ch.exercises.filter((e) => e.type !== 'annale')
  const present = EXERCISE_TYPES.filter((t) => t !== 'annale' && exercises.some((e) => e.type === t))
  let filter: ExerciseType | 'tous' = (route.params.get('type') as ExerciseType) || 'tous'
  let onlyFailed = route.params.get('rates') === '1'
  const filters = el('div', 'filters')
  const list = el('div')
  const mkPill = (label: string, active: boolean, onClick: () => void) => {
    const b = el('button', 'pill' + (active ? ' active' : ''))
    b.type = 'button'
    b.textContent = label
    b.addEventListener('click', onClick)
    return b
  }
  function draw() {
    filters.innerHTML = ''
    filters.append(mkPill(`Tous (${exercises.length})`, filter === 'tous', () => { filter = 'tous'; draw() }))
    for (const t of present) {
      const n = exercises.filter((e) => e.type === t).length
      filters.append(mkPill(`${EXERCISE_TYPE_LABELS[t]} (${n})`, filter === t, () => { filter = t; draw() }))
    }
    filters.append(mkPill('Seulement mes ratés', onlyFailed, () => { onlyFailed = !onlyFailed; draw() }))
    list.innerHTML = ''
    let shown: Exercise[] = filter === 'tous' ? exercises : exercises.filter((e) => e.type === filter)
    if (onlyFailed) shown = shown.filter((e) => { const s = getItemStats(ch.slug, e.id); return s && s.lastOutcome < 1 })
    if (shown.length === 0) list.append(rich('*Aucun exercice dans cette sélection.*'))
    for (const ex of shown) list.append(renderExercise(ex, { chapter: ch.slug }))
  }
  draw()
  wrap.append(rich(`**${exercises.length} exercices interactifs** — aucun ne demande de taper une formule. Les corrections détaillent chaque mauvaise réponse.`, 'rich muted'))
  wrap.append(filters, list)
  return wrap
}

function renderAnnalesTab(ch: Chapter): HTMLElement {
  const wrap = el('div')
  const annales = ch.exercises.filter((e) => e.type === 'annale')
  wrap.append(rich('**Exercices type annale.** Rédigez sur papier comme à l’examen, puis révélez les indices (1, 2, 3), la correction rédigée et le barème ; auto-évaluez-vous par clic.', 'rich muted'))
  if (annales.length === 0) wrap.append(rich('*Aucun exercice type annale pour ce chapitre.*'))
  for (const ex of annales) wrap.append(renderExercise(ex, { chapter: ch.slug }))
  return wrap
}

export function chapterBadge(ch: Chapter): HTMLElement {
  return badge(`Ch. ${ch.number}`, 'badge')
}
