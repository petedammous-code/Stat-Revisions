import { el, rich } from '../core/ui'
import { CHAPTERS, CHAPTER_TITLES } from '../content'
import { aggregate } from '../core/store'

export function renderHome(): HTMLElement {
  const page = el('main', 'page')
  page.append(el('h1', '', 'Révisions — APM-41033 Statistiques'))
  page.append(
    rich(
      'Site de révision interactif construit à partir du **poly**, des **PC** et des **annales** du cours (École polytechnique, 2A). ' +
        'Chaque notion est sourcée (« Poly ch.2, Déf. 2.3 »). Aucune formule à taper : tout se fait par clic, glisser-déposer ou curseur.',
      'rich card',
    ),
  )
  const quick = el('div', 'card')
  quick.append(el('h2', '', 'Par où commencer ?'))
  quick.append(
    rich(
      '- **Révision ciblée** : le site vous propose d’abord ce que vous avez le plus raté ([[ouvrir|/revision]]).\n' +
        '- **Examen blanc** chronométré au format réel (3 h, 4 exercices) ([[ouvrir|/examen]]).\n' +
        '- **Fiches de synthèse** imprimables par chapitre ([[ouvrir|/fiches]]).\n' +
        '- **Tableau de bord** : progression par chapitre et par type d’exercice ([[ouvrir|/dashboard]]).',
    ),
  )
  page.append(quick)

  page.append(el('h2', '', 'Chapitres (classés par rentabilité pour l’examen)'))
  const grid = el('div', 'grid')
  const built = new Set(CHAPTERS.map((c) => c.number))
  const sorted = CHAPTERS.slice().sort((a, b) => b.examWeight - a.examWeight || a.number - b.number)
  for (const ch of sorted) {
    const card = el('a', 'card chapter-card')
    card.href = `#/ch/${ch.slug}`
    card.append(el('div', 'muted', `Chapitre ${ch.number} · PC : ${ch.pcs.join(', ') || '—'}`))
    card.append(el('h3', '', ch.title))
    card.append(el('div', 'weight', 'Rentabilité examen : ' + '●'.repeat(ch.examWeight) + '○'.repeat(5 - ch.examWeight)))
    card.append(rich(ch.summary, 'rich muted'))
    const agg = aggregate((a) => a.chapter === ch.slug)
    const total = ch.exercises.length + ch.flashcards.length
    const pct = total ? Math.min(100, Math.round((100 * agg.items) / total)) : 0
    const p = el('div', 'progress')
    const fill = el('div')
    fill.style.width = `${pct}%`
    p.append(fill)
    card.append(p)
    card.append(el('div', 'muted', `${agg.items}/${total} items vus · ${ch.exercises.length} exercices · ${ch.vizs.length} visualisations`))
    grid.append(card)
  }
  for (const [num, title] of Object.entries(CHAPTER_TITLES)) {
    if (built.has(Number(num))) continue
    const card = el('div', 'card chapter-card')
    card.style.opacity = '0.6'
    card.append(el('div', 'muted', `Chapitre ${num}`))
    card.append(el('h3', '', title))
    card.append(el('div', 'muted', 'En construction'))
    grid.append(card)
  }
  page.append(grid)
  return page
}
