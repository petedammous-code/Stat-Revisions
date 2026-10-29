import { el, rich, button } from '../core/ui'
import { CHAPTERS } from '../content'
import type { Exercise, Flashcard } from '../content/types'
import { dueItems, weaknessByTag, getItemStats } from '../core/store'
import { renderExercise } from '../components/exercise'
import { renderFlashcards } from '../components/flashcards'

/**
 * Révision ciblée : répétition espacée simple.
 * 1) items échus (ratés d'abord), 2) items portant sur les notions les plus ratées, 3) jamais vus.
 */
export function renderRevision(): HTMLElement {
  const page = el('main', 'page')
  page.append(el('h1', '', 'Révision ciblée'))
  const weak = weaknessByTag().filter((w) => w.attempts >= 2 && w.rate < 0.8).slice(0, 6)
  if (weak.length) page.append(rich('**Vos notions les plus fragiles :** ' + weak.map((w) => `${w.tag} (${Math.round(100 * w.rate)} %)`).join(' · '), 'rich card'))
  else page.append(rich('Faites quelques exercices : le site identifiera ensuite vos points faibles et vous les proposera en priorité.', 'rich card muted'))

  const index = new Map<string, { chapter: string; item: Exercise | Flashcard }>()
  for (const ch of CHAPTERS) {
    for (const e of ch.exercises) index.set(`${ch.slug}::${e.id}`, { chapter: ch.slug, item: e })
    for (const f of ch.flashcards) index.set(`${ch.slug}::${f.id}`, { chapter: ch.slug, item: f })
  }
  const weakTags = new Set(weak.map((w) => w.tag))
  const picked: { chapter: string; item: Exercise | Flashcard; reason: string }[] = []
  const seen = new Set<string>()
  for (const d of dueItems()) {
    const k = `${d.chapter}::${d.itemId}`
    const entry = index.get(k)
    if (!entry || seen.has(k)) continue
    seen.add(k)
    picked.push({ ...entry, reason: d.stats.lastOutcome < 1 ? 'raté ou partiel la dernière fois' : 'à revoir (répétition espacée)' })
    if (picked.length >= 8) break
  }
  if (picked.length < 8) {
    for (const ch of CHAPTERS) {
      for (const e of ch.exercises) {
        const k = `${ch.slug}::${e.id}`
        if (seen.has(k) || getItemStats(ch.slug, e.id)) continue
        if (e.tags.some((t) => weakTags.has(t))) {
          seen.add(k)
          picked.push({ chapter: ch.slug, item: e, reason: 'porte sur une notion fragile' })
          if (picked.length >= 8) break
        }
      }
      if (picked.length >= 8) break
    }
  }
  if (picked.length < 8) {
    const sorted = CHAPTERS.slice().sort((a, b) => b.examWeight - a.examWeight)
    for (const ch of sorted) {
      for (const e of ch.exercises) {
        const k = `${ch.slug}::${e.id}`
        if (seen.has(k) || getItemStats(ch.slug, e.id) || e.type === 'annale') continue
        seen.add(k)
        picked.push({ chapter: ch.slug, item: e, reason: 'jamais travaillé (chapitre rentable)' })
        if (picked.length >= 8) break
      }
      if (picked.length >= 8) break
    }
  }

  if (picked.length === 0) {
    page.append(rich('*Aucun contenu disponible pour le moment.*'))
    return page
  }
  page.append(rich(`**${picked.length} items sélectionnés** pour cette session.`, 'rich muted'))
  const list = el('div')
  const flash: { chapter: string; cards: Flashcard[] }[] = []
  for (const p of picked) {
    const chapterTitle = CHAPTERS.find((c) => c.slug === p.chapter)?.title ?? p.chapter
    if ('type' in p.item) {
      const w = el('div')
      w.append(rich(`*${chapterTitle} — ${p.reason}*`, 'rich muted'))
      w.append(renderExercise(p.item, { chapter: p.chapter }))
      list.append(w)
    } else {
      let g = flash.find((f) => f.chapter === p.chapter)
      if (!g) {
        g = { chapter: p.chapter, cards: [] }
        flash.push(g)
      }
      g.cards.push(p.item)
    }
  }
  for (const g of flash) {
    const w = el('div', 'card')
    w.append(el('h3', '', `Flashcards à revoir — ${CHAPTERS.find((c) => c.slug === g.chapter)?.title ?? g.chapter}`))
    w.append(renderFlashcards(g.cards, g.chapter))
    list.append(w)
  }
  page.append(list)
  page.append(button('Nouvelle sélection', () => location.reload(), 'btn btn-secondary'))
  return page
}
