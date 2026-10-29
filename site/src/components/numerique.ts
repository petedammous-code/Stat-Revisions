import type { Numerique } from '../content/types'
import { el, rich, button, feedback } from '../core/ui'
import { exerciseHeader, finish, explanationsBox, type ExerciseContext } from './common'

/** Application numérique : seule saisie clavier autorisée (un nombre), avec tolérance. */
export function renderNumerique(ex: Numerique, ctx: ExerciseContext): HTMLElement {
  const root = el('article', 'exercise exercise-num')
  root.append(exerciseHeader(ex, ctx))
  root.append(rich(ex.question, 'rich ex-question'))
  if (ex.hint) root.append(rich(ex.hint, 'rich muted'))
  const row = el('div', 'num-row')
  const input = el('input', 'num-input')
  input.type = 'number'
  input.step = 'any'
  input.inputMode = 'decimal'
  input.placeholder = 'Votre valeur'
  input.setAttribute('aria-label', 'Réponse numérique')
  const validate = button('Valider', () => {
    if (root.dataset.done) return
    const v = Number(String(input.value).replace(',', '.'))
    if (Number.isNaN(v) || input.value.trim() === '') {
      input.classList.add('shake')
      setTimeout(() => input.classList.remove('shake'), 400)
      return
    }
    root.dataset.done = '1'
    input.disabled = true
    const ok = Math.abs(v - ex.answer) <= ex.tolerance
    const fb = explanationsBox(ctx)
    fb.append(feedback(ok ? 'ok' : 'ko', ok ? `**Correct** : ${ex.answer} (tolérance ±${ex.tolerance}).` : `**Incorrect.** Valeur attendue : **${ex.answer}** (tolérance ±${ex.tolerance}).`))
    fb.append(rich(ex.explanation))
    root.append(fb)
    validate.remove()
    finish(ex, ctx, ok ? 1 : 0)
  })
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') validate.click()
  })
  row.append(input, validate)
  root.append(row)
  return root
}
