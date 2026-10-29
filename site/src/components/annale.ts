import type { Annale } from '../content/types'
import { el, rich, button, feedback, details } from '../core/ui'
import { exerciseHeader, finish, type ExerciseContext } from './common'
import { richInline } from '../core/rich'

/**
 * Exercice type annale : on rédige sur papier, puis on révèle indices progressifs,
 * correction complète et barème ; auto-évaluation par clic (réussi / partiel / raté).
 */
export function renderAnnale(ex: Annale, ctx: ExerciseContext): HTMLElement {
  const root = el('article', 'exercise exercise-annale')
  root.append(exerciseHeader(ex, ctx))
  const total = ex.bareme.reduce((s, b) => s + b.points, 0)
  const meta = el('div', 'annale-meta')
  meta.append(el('span', 'badge', `Barème estimé : ${total} pt${total > 1 ? 's' : ''}`))
  if (ex.durationMin) meta.append(el('span', 'badge', `≈ ${ex.durationMin} min`))
  root.append(meta)
  root.append(rich(ex.statement, 'rich ex-statement'))
  root.append(rich('*Rédigez votre réponse sur papier, puis révélez les indices si besoin et enfin la correction.*', 'rich muted'))

  const hints = el('div', 'hints')
  let revealed = 0
  const hintBtn = button(`Indice 1 / ${ex.hints.length}`, () => {
    if (revealed >= ex.hints.length) return
    const h = el('div', 'hint')
    h.append(el('span', 'hint-num', `Indice ${revealed + 1}`))
    h.append(rich(ex.hints[revealed]))
    hints.append(h)
    revealed++
    if (revealed >= ex.hints.length) hintBtn.disabled = true
    else hintBtn.textContent = `Indice ${revealed + 1} / ${ex.hints.length}`
  }, 'btn btn-secondary')
  if (ex.hints.length === 0) hintBtn.disabled = true
  root.append(hintBtn, hints)

  const corrBox = el('div', 'correction')
  const corrBtn = button('Révéler la correction et le barème', () => {
    corrBtn.remove()
    const body = el('div')
    body.append(rich(ex.correction, 'rich correction-text'))
    const table = el('table', 'bareme')
    const thead = el('tr')
    thead.append(el('th', '', 'Question'), el('th', '', 'Points'))
    table.append(thead)
    for (const b of ex.bareme) {
      const tr = el('tr')
      tr.append(el('td', '', richInline(b.label)), el('td', '', String(b.points)))
      table.append(tr)
    }
    const trt = el('tr', 'total')
    trt.append(el('td', '', 'Total'), el('td', '', String(total)))
    table.append(trt)
    body.append(details('Barème estimé', table, true))
    corrBox.append(body)

    const evalBox = el('div', 'self-eval')
    evalBox.append(el('div', 'self-eval-title', 'Auto-évaluation : comment vous en êtes-vous sorti ?'))
    const row = el('div', 'self-eval-row')
    const mk = (label: string, outcome: 0 | 0.5 | 1, cls: string) =>
      button(label, () => {
        if (root.dataset.done) return
        root.dataset.done = '1'
        row.querySelectorAll('button').forEach((b) => (b.disabled = true))
        evalBox.append(feedback(outcome === 1 ? 'ok' : outcome === 0.5 ? 'partial' : 'ko', outcome === 1 ? 'Enregistré : **réussi**.' : outcome === 0.5 ? 'Enregistré : **partiel**. Cet exercice reviendra bientôt en révision ciblée.' : 'Enregistré : **raté**. Il sera proposé en priorité en révision ciblée.'))
        finish(ex, ctx, outcome)
      }, `btn ${cls}`)
    row.append(mk('Réussi', 1, 'btn-ok'), mk('Partiel', 0.5, 'btn-partial'), mk('Raté', 0, 'btn-ko'))
    evalBox.append(row)
    corrBox.append(evalBox)
  }, 'btn')
  root.append(corrBtn, corrBox)
  return root
}
