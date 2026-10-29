import type { Chapter } from '../content/types'
import { el, rich, button } from '../core/ui'
import { CHAPTERS } from '../content'

/** Fiche de synthèse imprimable d'un chapitre. */
export function renderSheet(ch: Chapter): HTMLElement {
  const wrap = el('div', 'sheet')
  const actions = el('div', 'no-print ex-actions')
  actions.append(button('Imprimer / enregistrer en PDF', () => window.print(), 'btn btn-secondary'))
  wrap.append(actions)
  const s = ch.summarySheet
  const card = el('div', 'card')
  card.append(el('h2', '', `Fiche — Chapitre ${ch.number} : ${ch.title}`))
  card.append(el('h3', '', 'Définitions'))
  for (const d of s.definitions) {
    const b = el('div', 'block block-definition')
    b.append(el('div', 'block-head', `<span class="block-kind">Définition</span><span class="block-label">${d.label}</span><span class="badge badge-src">${d.source}</span>`))
    b.append(rich(d.text))
    card.append(b)
  }
  card.append(el('h3', '', 'Théorèmes et propositions (avec leurs hypothèses)'))
  for (const t of s.theorems) {
    const b = el('div', 'block block-theoreme')
    b.append(el('div', 'block-head', `<span class="block-kind">Résultat</span><span class="block-label">${t.label}</span><span class="badge badge-src">${t.source}</span>`))
    if (t.hypotheses.length) {
      const h = el('div', 'hypotheses')
      h.append(el('div', 'hyp-title', 'Hypothèses'))
      const ul = el('ul')
      for (const x of t.hypotheses) {
        const li = el('li')
        li.append(rich(x))
        ul.append(li)
      }
      h.append(ul)
      b.append(h)
    }
    b.append(rich(t.text))
    card.append(b)
  }
  card.append(el('h3', '', 'Méthodes types'))
  for (const m of s.methods) {
    const b = el('div', 'block block-methode')
    b.append(el('div', 'block-head', `<span class="block-kind">Méthode</span><span class="block-label">${m.title}</span>`))
    const ol = el('ol')
    for (const x of m.steps) {
      const li = el('li')
      li.append(rich(x))
      ol.append(li)
    }
    b.append(ol)
    card.append(b)
  }
  card.append(el('h3', '', 'Pièges'))
  const ul = el('ul')
  for (const p of s.pitfalls) {
    const li = el('li')
    li.append(rich(p))
    ul.append(li)
  }
  card.append(ul)
  wrap.append(card)
  return wrap
}

export function renderSheetsPage(): HTMLElement {
  const page = el('main', 'page')
  page.append(el('h1', '', 'Fiches de synthèse'))
  page.append(rich('Une fiche imprimable par chapitre : définitions, théorèmes avec hypothèses exactes, méthodes types, pièges.', 'rich muted'))
  const grid = el('div', 'grid')
  for (const ch of CHAPTERS) {
    const a = el('a', 'card chapter-card')
    a.href = `#/ch/${ch.slug}/fiche`
    a.append(el('div', 'muted', `Chapitre ${ch.number}`))
    a.append(el('h3', '', ch.title))
    a.append(el('div', 'muted', `${ch.summarySheet.definitions.length} définitions · ${ch.summarySheet.theorems.length} résultats · ${ch.summarySheet.methods.length} méthodes`))
    grid.append(a)
  }
  page.append(grid)
  return page
}
