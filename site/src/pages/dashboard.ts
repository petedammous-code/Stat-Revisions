import { el, rich, button } from '../core/ui'
import { CHAPTERS } from '../content'
import { EXERCISE_TYPES, EXERCISE_TYPE_LABELS } from '../content/types'
import { aggregate, weaknessByTag, allExams, resetAll, exportJson, allAttempts } from '../core/store'

export function renderDashboard(): HTMLElement {
  const page = el('main', 'page')
  page.append(el('h1', '', 'Tableau de bord'))
  const all = aggregate(() => true)
  const stats = el('div', 'stat-grid')
  const mk = (num: string, lab: string) => {
    const s = el('div', 'stat')
    s.append(el('div', 'num', num), el('div', 'lab', lab))
    return s
  }
  stats.append(mk(String(all.attempts), 'tentatives'))
  stats.append(mk(all.attempts ? `${Math.round((100 * all.score) / all.attempts)} %` : '—', 'taux de réussite global'))
  stats.append(mk(String(all.items), 'items distincts travaillés'))
  const exams = allExams()
  stats.append(mk(exams.length ? `${Math.round((100 * exams[exams.length - 1].score) / exams[exams.length - 1].total)} %` : '—', 'dernier examen blanc'))
  page.append(stats)

  const byCh = el('div', 'card')
  byCh.append(el('h2', '', 'Par chapitre'))
  const t1 = el('table')
  t1.innerHTML = '<tr><th>Chapitre</th><th>Items vus</th><th>Tentatives</th><th>Réussite</th><th></th></tr>'
  for (const ch of CHAPTERS) {
    const a = aggregate((x) => x.chapter === ch.slug)
    const total = ch.exercises.length + ch.flashcards.length
    const rate = a.attempts ? Math.round((100 * a.score) / a.attempts) : 0
    const tr = el('tr')
    tr.innerHTML = `<td><a href="#/ch/${ch.slug}">Ch. ${ch.number} — ${ch.title}</a></td><td>${a.items}/${total}</td><td>${a.attempts}</td><td>${a.attempts ? rate + ' %' : '—'}</td><td style="min-width:120px"><div class="bar"><div style="width:${rate}%"></div></div></td>`
    t1.append(tr)
  }
  byCh.append(t1)
  page.append(byCh)

  const byType = el('div', 'card')
  byType.append(el('h2', '', 'Par type d’exercice'))
  const t2 = el('table')
  t2.innerHTML = '<tr><th>Type</th><th>Tentatives</th><th>Réussite</th><th></th></tr>'
  for (const t of [...EXERCISE_TYPES, 'flashcard' as const]) {
    const a = aggregate((x) => x.type === t)
    const rate = a.attempts ? Math.round((100 * a.score) / a.attempts) : 0
    const tr = el('tr')
    const label = t === 'flashcard' ? 'Flashcards' : EXERCISE_TYPE_LABELS[t]
    tr.innerHTML = `<td>${label}</td><td>${a.attempts}</td><td>${a.attempts ? rate + ' %' : '—'}</td><td style="min-width:120px"><div class="bar"><div style="width:${rate}%"></div></div></td>`
    t2.append(tr)
  }
  byType.append(t2)
  page.append(byType)

  const weak = el('div', 'card')
  weak.append(el('h2', '', 'Points faibles (par notion)'))
  const w = weaknessByTag().filter((x) => x.attempts >= 2).slice(0, 15)
  if (w.length === 0) weak.append(rich('*Pas encore assez de données : faites quelques exercices.*'))
  else {
    const t3 = el('table')
    t3.innerHTML = '<tr><th>Notion</th><th>Tentatives</th><th>Réussite</th></tr>'
    for (const x of w) {
      const tr = el('tr')
      tr.innerHTML = `<td>${x.tag}</td><td>${x.attempts}</td><td>${Math.round(100 * x.rate)} %</td>`
      t3.append(tr)
    }
    weak.append(t3)
  }
  page.append(weak)

  if (exams.length) {
    const ex = el('div', 'card')
    ex.append(el('h2', '', 'Examens blancs'))
    const t4 = el('table')
    t4.innerHTML = '<tr><th>Date</th><th>Durée</th><th>Score</th></tr>'
    for (const e of exams.slice().reverse()) {
      const tr = el('tr')
      tr.innerHTML = `<td>${new Date(e.at).toLocaleString('fr-FR')}</td><td>${Math.round(e.durationSec / 60)} min</td><td>${e.score}/${e.total}</td>`
      t4.append(tr)
    }
    ex.append(t4)
    page.append(ex)
  }

  const tools = el('div', 'card no-print')
  tools.append(el('h2', '', 'Données'))
  tools.append(rich(`Progression stockée localement dans ce navigateur (${allAttempts().length} tentatives).`, 'rich muted'))
  const row = el('div', 'ex-actions')
  row.append(
    button('Exporter (JSON)', () => {
      const blob = new Blob([exportJson()], { type: 'application/json' })
      const a = document.createElement('a')
      a.href = URL.createObjectURL(blob)
      a.download = 'stat-revisions-progression.json'
      a.click()
    }, 'btn btn-secondary'),
    button('Réinitialiser la progression', () => {
      if (confirm('Effacer toute la progression enregistrée ?')) {
        resetAll()
        location.reload()
      }
    }, 'btn btn-ko'),
  )
  tools.append(row)
  page.append(tools)
  return page
}
