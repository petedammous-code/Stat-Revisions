import type { Qcm } from '../content/types'
import { el, rich, button, feedback } from '../core/ui'
import { exerciseHeader, finish, shuffled, explanationsBox, type ExerciseContext } from './common'

/** QCM : une seule bonne réponse ; chaque option a son explication. */
export function renderQcm(ex: Qcm, ctx: ExerciseContext): HTMLElement {
  const root = el('article', 'exercise exercise-qcm')
  root.append(exerciseHeader(ex, ctx))
  root.append(rich(ex.question, 'rich ex-question'))
  const list = el('div', 'options')
  const options = shuffled(ex.options, ex.id)
  let selected: number | null = null
  const buttons: HTMLButtonElement[] = []
  options.forEach((o, idx) => {
    const b = el('button', 'option')
    b.type = 'button'
    b.append(el('span', 'option-letter', String.fromCharCode(65 + idx)))
    b.append(rich(o.text, 'rich option-text'))
    b.addEventListener('click', () => {
      if (root.dataset.done) return
      selected = idx
      buttons.forEach((x) => x.classList.remove('selected'))
      b.classList.add('selected')
      validate.disabled = false
    })
    buttons.push(b)
    list.append(b)
  })
  root.append(list)
  const actions = el('div', 'ex-actions')
  const validate = button('Valider', () => {
    if (selected === null || root.dataset.done) return
    root.dataset.done = '1'
    const ok = options[selected].correct
    buttons.forEach((b, i) => {
      b.disabled = true
      if (options[i].correct) b.classList.add('correct')
      else if (i === selected) b.classList.add('wrong')
    })
    const fb = explanationsBox(ctx)
    fb.append(feedback(ok ? 'ok' : 'ko', ok ? '**Correct.**' : '**Incorrect.** Voici pourquoi, option par option :'))
    options.forEach((o, i) => {
      const line = el('div', `explanation ${o.correct ? 'explanation-correct' : 'explanation-wrong'}`)
      line.append(el('span', 'option-letter', String.fromCharCode(65 + i)))
      line.append(rich(o.explanation))
      fb.append(line)
    })
    root.append(fb)
    validate.remove()
    finish(ex, ctx, ok ? 1 : 0)
  })
  validate.disabled = true
  actions.append(validate)
  root.append(actions)
  return root
}

/** Évalue une réponse en mode examen (index dans l'ordre affiché). */
export function qcmIsCorrect(ex: Qcm, displayedIndex: number): boolean {
  return shuffled(ex.options, ex.id)[displayedIndex]?.correct ?? false
}
