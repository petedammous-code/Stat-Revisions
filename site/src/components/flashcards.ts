import type { Flashcard } from '../content/types'
import { el, rich, button, feedback } from '../core/ui'
import { recordAttempt, getItemStats } from '../core/store'
import { shuffled } from './common'

const KIND_LABEL: Record<Flashcard['kind'], string> = {
  definition: 'Définition',
  theoreme: 'Théorème',
  'hypothese-manquante': 'Quelle hypothèse manque ?',
  methode: 'Méthode',
}

/** Paquet de flashcards : retourner, auto-évaluer ou choisir l'hypothèse manquante. */
export function renderFlashcards(cards: Flashcard[], chapter: string): HTMLElement {
  const root = el('section', 'flashcards')
  if (cards.length === 0) {
    root.append(rich('*Aucune flashcard pour ce chapitre.*'))
    return root
  }
  // Priorité aux cartes jamais vues / ratées.
  const ordered = cards
    .map((c) => ({ c, s: getItemStats(chapter, c.id) }))
    .sort((a, b) => (a.s?.lastOutcome ?? -1) - (b.s?.lastOutcome ?? -1) || (a.s?.due ?? 0) - (b.s?.due ?? 0))
    .map((x) => x.c)
  let idx = 0
  let done = 0
  let ok = 0
  const progress = el('div', 'fc-progress')
  const stage = el('div', 'fc-stage')
  root.append(progress, stage)

  function show() {
    stage.innerHTML = ''
    progress.textContent = `Carte ${Math.min(idx + 1, ordered.length)} / ${ordered.length} · réussies : ${ok}/${done}`
    if (idx >= ordered.length) {
      stage.append(feedback('info', `**Paquet terminé** : ${ok}/${done} cartes réussies.`))
      stage.append(button('Recommencer', () => {
        idx = 0
        done = 0
        ok = 0
        show()
      }))
      return
    }
    const card = ordered[idx]
    const wrap = el('div', 'fc-card')
    wrap.append(el('div', 'fc-kind', KIND_LABEL[card.kind]))
    wrap.append(rich(card.front, 'rich fc-front'))
    wrap.append(el('div', 'fc-src', card.source))
    stage.append(wrap)

    if (card.kind === 'hypothese-manquante' && card.choices && card.choices.length > 0) {
      const opts = el('div', 'options')
      const choices = shuffled(card.choices, card.id)
      const buttons: HTMLButtonElement[] = []
      choices.forEach((c, i) => {
        const b = el('button', 'option')
        b.type = 'button'
        b.append(el('span', 'option-letter', String.fromCharCode(65 + i)))
        b.append(rich(c.text, 'rich option-text'))
        b.addEventListener('click', () => {
          if (wrap.dataset.done) return
          wrap.dataset.done = '1'
          buttons.forEach((x, j) => {
            x.disabled = true
            if (choices[j].correct) x.classList.add('correct')
            else if (j === i) x.classList.add('wrong')
          })
          const good = c.correct
          done++
          if (good) ok++
          recordAttempt({ chapter, itemId: card.id, type: 'flashcard', tags: card.tags, outcome: good ? 1 : 0 })
          stage.append(feedback(good ? 'ok' : 'ko', good ? '**Exact.**' : '**Non.** La bonne réponse est surlignée.'))
          stage.append(rich(card.back, 'rich fc-back'))
          stage.append(button('Carte suivante →', next))
        })
        buttons.push(b)
        opts.append(b)
      })
      stage.append(opts)
      return
    }

    const flip = button('Retourner la carte', () => {
      flip.remove()
      stage.append(rich(card.back, 'rich fc-back'))
      const row = el('div', 'self-eval-row')
      const mk = (label: string, outcome: 0 | 0.5 | 1, cls: string) =>
        button(label, () => {
          done++
          if (outcome === 1) ok++
          recordAttempt({ chapter, itemId: card.id, type: 'flashcard', tags: card.tags, outcome })
          next()
        }, `btn ${cls}`)
      row.append(mk('Je savais', 1, 'btn-ok'), mk('À peu près', 0.5, 'btn-partial'), mk('Je ne savais pas', 0, 'btn-ko'))
      stage.append(row)
    })
    stage.append(flip)
  }

  function next() {
    idx++
    show()
  }

  show()
  return root
}
