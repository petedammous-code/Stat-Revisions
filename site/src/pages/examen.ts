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
  /** QCM de l'exercice 4 : une réponse fausse coûte −0,5 point (barème 2025). */
  penalty?: number
}

interface Part {
  title: string
  hint: string
  items: Item[]
  /** Plancher du total de la partie (QCM à points négatifs). */
  floorZero?: boolean
}

const ESTIMATION = ['ch1', 'ch2', 'ch3', 'ch4', 'ch5', 'ch6', 'ch7']
const APPRENTISSAGE = ['ch8', 'ch9']

/**
 * Compose un sujet au format de l'Examen 2025 (DIAGNOSTIC.md §1 et §9) :
 *  Ex. 1 cours (4 pts) · Ex. 2 problème d'estimation (7 pts) · Ex. 3 problème d'apprentissage (6 pts)
 *  · Ex. 4 QCM / questions courtes (3 pts, 12 items, −0,5 par QCM faux).
 */
function pickItems(duration: number, seed: number): { parts: Part[] } {
  const rng = makeRng(seed)
  const byWeight = CHAPTERS.slice().sort((a, b) => b.examWeight - a.examWeight)
  const course: Item[] = []
  const short: Item[] = []
  const annEstim: Item[] = []
  const annLearn: Item[] = []
  const inProgram = (e: Exercise) => !e.tags.includes('hors-programme')
  for (const ch of byWeight) {
    const c = shuffle(ch.exercises.filter(inProgram).filter((e) => e.type !== 'annale' && e.type !== 'numerique' && e.tags.includes('cours')), rng)
    for (const e of c.slice(0, 3)) course.push({ chapter: ch.slug, ex: e, points: 0, outcome: null })
    const q = shuffle(ch.exercises.filter(inProgram).filter((e) => (e.type === 'qcm' || e.type === 'vrai-faux' || e.type === 'numerique') && !e.tags.includes('cours')), rng)
    for (const e of q.slice(0, 3)) short.push({ chapter: ch.slug, ex: e, points: 0, outcome: null })
    for (const a of ch.exercises.filter(inProgram).filter((e) => e.type === 'annale')) {
      const it = { chapter: ch.slug, ex: a, points: 0, outcome: null }
      if (APPRENTISSAGE.includes(ch.slug)) annLearn.push(it)
      else if (ESTIMATION.includes(ch.slug)) annEstim.push(it)
    }
  }
  const full = duration >= 180
  const mid = duration >= 90 && !full
  const nCourse = full ? 5 : 4
  const nShort = full ? 12 : mid ? 8 : 8
  // Priorité aux vraies annales pour les problèmes.
  const prefer = (xs: Item[]) => {
    const real = shuffle(xs.filter((x) => x.ex.origin === 'annale'), rng)
    const rest = shuffle(xs.filter((x) => x.ex.origin !== 'annale'), rng)
    return [...real, ...rest]
  }
  const coursePick = shuffle(course, rng).slice(0, nCourse)
  const shortPick = shuffle(short, rng).slice(0, nShort)
  const problems: { item: Item; pts: number; label: string }[] = []
  if (full || mid) {
    const e = prefer(annEstim)[0]
    if (e) problems.push({ item: e, pts: full ? 7 : 8, label: 'Problème d’estimation et de tests' })
  }
  if (full) {
    const l = prefer(annLearn)[0]
    if (l) problems.push({ item: l, pts: 6, label: 'Problème d’apprentissage statistique' })
  }
  const coursePts = full ? 4 : mid ? 6 : 10
  const shortPts = full ? 3 : mid ? 6 : 10
  for (const it of coursePick) it.points = coursePts / Math.max(1, coursePick.length)
  for (const it of shortPick) {
    it.points = shortPts / Math.max(1, shortPick.length)
    if (it.ex.type === 'qcm') it.penalty = 2 * it.points
  }
  for (const p of problems) p.item.points = p.pts
  const parts: Part[] = [{ title: 'Exercice 1 : Questions de cours', hint: `≈ 20 min · ${coursePts} points`, items: coursePick }]
  problems.forEach((p, i) =>
    parts.push({
      title: `Exercice ${2 + i} : ${p.label}`,
      hint: `≈ ${full ? (i === 0 ? 65 : 55) : 60} min · ${p.pts} points · rédigez sur papier, puis révélez la correction et auto-évaluez-vous`,
      items: [p.item],
    }),
  )
  parts.push({
    title: `Exercice ${2 + problems.length} : QCM / questions à réponses courtes`,
    hint: `≈ 15–20 min · ${shortPts} points · une seule réponse valide par QCM ; une réponse fausse au QCM coûte ${full ? '−0,5' : 'deux fois la valeur de la question'} (ne répondez pas au hasard)`,
    items: shortPick,
    floorZero: true,
  })
  return { parts }
}

/** Page de rappels distribuée avec le sujet (Examen 2025, p. 2). */
export const RAPPELS = `**Rappels / notations (Examen 2025, page 2)**

- Pour $a>0$, $b>0$, $\\Gamma(a,b)$ est la loi sur $\\mathbb{R}_+$ de densité $\\gamma_{a,b}(x) = \\frac{b^a}{\\Gamma(a)} x^{a-1} e^{-bx}$ ; espérance $a/b$, variance $a/b^2$. Si $X_1,\\dots,X_n$ sont i.i.d. $\\Gamma(a,b)$, alors $\\sum_{i=1}^n X_i \\sim \\Gamma(na, b)$.
- Pour tout entier $p \\geq 1$, $\\chi^2(p) = \\Gamma(p/2, 1/2)$.
- Loi Beta$(a,b)$ : densité $\\frac{x^{a-1}(1-x)^{b-1}}{B(a,b)}$ sur $]0,1[$, d'espérance $\\frac{a}{a+b}$ ; $\\mathbb{P}(\\mathrm{Bin}(n,p) \\geq k) = \\mathbb{P}(\\mathrm{Beta}(k, n-k+1) \\leq p)$.
- Si $\\xi \\sim \\mathcal{N}(0,1)$ : $\\mathbb{E}[e^{t\\xi}] = e^{t^2/2}$ et $\\mathrm{Var}(\\xi^2) = 2$.
- Quantile empirique : $\\sqrt{n}(\\hat q_\\alpha - q_\\alpha) \\xrightarrow{d} \\mathcal{N}\\big(0, \\frac{\\alpha(1-\\alpha)}{f(q_\\alpha)^2}\\big)$.
- TCL multivarié : $\\sqrt{n}\\begin{pmatrix} \\bar X_n - \\mu_X \\\\ \\bar Y_n - \\mu_Y \\end{pmatrix} \\xrightarrow{d} \\mathcal{N}(0, \\Sigma)$.

*Attention : la convention Gamma du CC MAP433 2022 était l'échelle (espérance $p\\lambda$), différente du poly.*`

function runExam(duration: number, seed: number): HTMLElement {
  const root = el('div', 'exam-running')
  const { parts } = pickItems(duration, seed)
  const all = parts.flatMap((p) => p.items)
  if (all.length === 0) {
    root.append(rich('*Pas assez de contenu pour composer un examen.*'))
    return root
  }
  const start = Date.now()
  const end = start + duration * 60 * 1000
  root.append(rich(RAPPELS, 'rich card'))
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
    root.classList.remove('exam-running')
    root.querySelectorAll('.exam-hidden').forEach((e) => e.classList.remove('exam-hidden'))
    let score = 0
    let total = 0
    const perChapter: Record<string, { score: number; total: number }> = {}
    for (const p of parts) {
      let partScore = 0
      for (const it of p.items) {
        total += it.points
        // Non répondu : 0 ; QCM faux : −pénalité ; sinon proportion de la question.
        const got = it.outcome === null ? 0 : it.outcome === 0 && it.penalty ? -it.penalty : it.outcome * it.points
        partScore += got
        const pc = (perChapter[it.chapter] ??= { score: 0, total: 0 })
        pc.score += Math.max(0, got)
        pc.total += it.points
      }
      score += p.floorZero ? Math.max(0, partScore) : partScore
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
