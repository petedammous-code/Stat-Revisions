import { el, rich, button, feedback, select } from '../core/ui'
import { CHAPTERS } from '../content'
import type { Exercise, Annale } from '../content/types'
import { renderExercise } from '../components/exercise'
import { recordExam, type Outcome } from '../core/store'
import { shuffle, makeRng } from '../sim/rng'

/**
 * Examen blanc au format réel (Examen 2025) : 3 h, 4 exercices.
 *  1. Questions de cours (≈ 20 min)            → items interactifs « cours »
 *  2. et 3. Problèmes                           → deux exercices type annale (chapitres différents)
 *  4. QCM / questions courtes (≈ 15–20 min)     → QCM et Vrai/Faux
 * Les corrections sont masquées jusqu'à la fin ; le barème est de 20 points.
 */
export function renderExam(): HTMLElement {
  const page = el('main', 'page')
  page.append(el('h1', '', 'Examen blanc'))
  page.append(
    rich(
      '**Format réel (Examen 2025)** : 3 h, 4 exercices indépendants — (1) questions de cours, (2) et (3) problèmes, (4) QCM / questions courtes. ' +
        'Conseil officiel : ≈ 20 min pour l’exercice 1 et 15–20 min pour l’exercice 4. Toutes les réponses doivent être justifiées (sauf exercice 4).',
      'rich card',
    ),
  )
  const setup = el('div', 'card')
  let duration = 180
  let seedStr = String(Math.floor(Math.random() * 1e6))
  setup.append(
    select('Durée', [
      { value: '180', label: '3 h (format réel)' },
      { value: '90', label: '1 h 30 (version courte)' },
      { value: '45', label: '45 min (express : cours + QCM)' },
    ], '180', (v) => (duration = Number(v))),
  )
  setup.append(button('Commencer l’examen', () => {
    setup.remove()
    page.append(runExam(duration, Number(seedStr)))
  }))
  page.append(setup)
  return page
}

interface Item {
  chapter: string
  ex: Exercise
  points: number
  outcome: Outcome | null
}

function pickItems(duration: number, seed: number): { parts: { title: string; hint: string; items: Item[] }[] } {
  const rng = makeRng(seed)
  const byWeight = CHAPTERS.slice().sort((a, b) => b.examWeight - a.examWeight)
  const course: Item[] = []
  const qcm: Item[] = []
  const annales: Item[] = []
  for (const ch of byWeight) {
    const c = shuffle(ch.exercises.filter((e) => e.type !== 'annale' && e.tags.includes('cours')), rng)
    for (const e of c.slice(0, 2)) course.push({ chapter: ch.slug, ex: e, points: 1, outcome: null })
    const q = shuffle(ch.exercises.filter((e) => (e.type === 'qcm' || e.type === 'vrai-faux') && !e.tags.includes('cours')), rng)
    for (const e of q.slice(0, 2)) qcm.push({ chapter: ch.slug, ex: e, points: 0.5, outcome: null })
    const a = shuffle(ch.exercises.filter((e) => e.type === 'annale'), rng) as Annale[]
    if (a.length) annales.push({ chapter: ch.slug, ex: a[0], points: 6, outcome: null })
  }
  const nCourse = duration >= 180 ? 5 : duration >= 90 ? 4 : 4
  const nQcm = duration >= 180 ? 8 : duration >= 90 ? 6 : 6
  const nAnn = duration >= 180 ? 2 : duration >= 90 ? 1 : 0
  const coursePick = shuffle(course, rng).slice(0, nCourse)
  const qcmPick = shuffle(qcm, rng).slice(0, nQcm)
  // Problèmes : chapitres différents, priorité aux chapitres les plus rentables (avec un peu d'aléa).
  const annPick: Item[] = []
  const used = new Set<string>()
  for (const it of shuffle(annales.slice(0, 5), rng)) {
    if (used.has(it.chapter)) continue
    used.add(it.chapter)
    annPick.push(it)
    if (annPick.length >= nAnn) break
  }
  // Barème : 20 points. Cours 4 pts, problèmes 6 pts chacun (3h), QCM 4 pts.
  const coursePts = 4
  const qcmPts = 4
  const probPts = annPick.length ? (20 - coursePts - qcmPts) / annPick.length : 0
  for (const it of coursePick) it.points = coursePts / Math.max(1, coursePick.length)
  for (const it of qcmPick) it.points = qcmPts / Math.max(1, qcmPick.length)
  for (const it of annPick) it.points = probPts
  const parts = [
    { title: 'Exercice 1 : Questions de cours', hint: '≈ 20 min · 4 points', items: coursePick },
  ]
  annPick.forEach((it, i) => parts.push({ title: `Exercice ${2 + i} : Problème`, hint: `≈ ${Math.round((duration - 40) / Math.max(1, annPick.length))} min · ${probPts} points · rédigez sur papier, auto-évaluez après la correction`, items: [it] }))
  parts.push({ title: `Exercice ${2 + annPick.length} : QCM / questions courtes`, hint: '≈ 15–20 min · 4 points', items: qcmPick })
  return { parts }
}

function runExam(duration: number, seed: number): HTMLElement {
  const root = el('div')
  const { parts } = pickItems(duration, seed)
  const all = parts.flatMap((p) => p.items)
  if (all.length === 0) {
    root.append(rich('*Pas assez de contenu pour composer un examen.*'))
    return root
  }
  const start = Date.now()
  const end = start + duration * 60 * 1000
  const timer = el('div', 'timer')
  const left = el('span')
  const answered = el('span')
  timer.append(left, answered)
  root.append(timer)
  const tick = () => {
    const ms = Math.max(0, end - Date.now())
    const m = Math.floor(ms / 60000)
    const s = Math.floor((ms % 60000) / 1000)
    left.textContent = `⏱ ${m}:${String(s).padStart(2, '0')}`
    const done = all.filter((i) => i.outcome !== null).length
    answered.textContent = `${done}/${all.length} réponses`
    if (ms < 10 * 60000) timer.classList.add('warn')
    if (ms <= 0) finishExam()
  }
  const interval = setInterval(tick, 1000)
  tick()

  for (const p of parts) {
    const sec = el('section', 'card')
    sec.append(el('h2', '', p.title))
    sec.append(rich(`*${p.hint}*`, 'rich muted'))
    for (const it of p.items) {
      const isAnnale = it.ex.type === 'annale'
      sec.append(
        renderExercise(it.ex, {
          chapter: it.chapter,
          exam: !isAnnale,
          onDone: (o) => {
            it.outcome = o
            tick()
          },
        }),
      )
    }
    root.append(sec)
  }
  const finishBtn = button('Terminer et corriger', () => finishExam(), 'btn')
  root.append(finishBtn)
  let finished = false
  function finishExam() {
    if (finished) return
    finished = true
    clearInterval(interval)
    finishBtn.remove()
    root.querySelectorAll('.exam-hidden').forEach((e) => e.classList.remove('exam-hidden'))
    let score = 0
    let total = 0
    const perChapter: Record<string, { score: number; total: number }> = {}
    for (const it of all) {
      total += it.points
      const got = (it.outcome ?? 0) * it.points
      score += got
      const pc = (perChapter[it.chapter] ??= { score: 0, total: 0 })
      pc.score += got
      pc.total += it.points
    }
    const durationSec = Math.round((Date.now() - start) / 1000)
    recordExam({ at: Date.now(), durationSec, score: Math.round(score * 10) / 10, total: Math.round(total * 10) / 10, perChapter })
    const res = el('div', 'card')
    res.append(el('h2', '', 'Résultat'))
    const note = Math.round(((20 * score) / Math.max(1, total)) * 10) / 10
    res.append(feedback(note >= 14 ? 'ok' : note >= 10 ? 'partial' : 'ko', `**Note estimée : ${note} / 20** (${Math.round(score * 10) / 10} / ${Math.round(total * 10) / 10} points, ${Math.round(durationSec / 60)} min). Les problèmes non auto-évalués comptent 0 : révélez la correction et auto-évaluez-vous pour affiner.`))
    const t = el('table')
    t.innerHTML = '<tr><th>Chapitre</th><th>Points</th></tr>'
    for (const [slug, v] of Object.entries(perChapter)) {
      const tr = el('tr')
      tr.innerHTML = `<td><a href="#/ch/${slug}">${CHAPTERS.find((c) => c.slug === slug)?.title ?? slug}</a></td><td>${Math.round(v.score * 10) / 10} / ${Math.round(v.total * 10) / 10}</td>`
      t.append(tr)
    }
    res.append(t)
    res.append(rich('Les corrections détaillées sont maintenant visibles sous chaque question. Les items ratés sont ajoutés à votre révision ciblée.', 'rich muted'))
    root.prepend(res)
    res.scrollIntoView({ behavior: 'smooth' })
  }
  return root
}
