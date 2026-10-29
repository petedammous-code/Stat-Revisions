import type { VraiFaux } from '../content/types'
import { el, rich, button, feedback } from '../core/ui'
import { exerciseHeader, finish, shuffled, explanationsBox, type ExerciseContext } from './common'

/** Vrai/Faux puis choix de la justification correcte. Score : 1 si les deux justes, 0.5 si seul le V/F est juste. */
export function renderVraiFaux(ex: VraiFaux, ctx: ExerciseContext): HTMLElement {
  const root = el('article', 'exercise exercise-vf')
  root.append(exerciseHeader(ex, ctx))
  root.append(rich(ex.statement, 'rich ex-question'))
  const step1 = el('div', 'vf-step')
  const bVrai = button('Vrai', () => answer(true), 'btn btn-choice')
  const bFaux = button('Faux', () => answer(false), 'btn btn-choice')
  step1.append(bVrai, bFaux)
  root.append(step1)

  let vfOk = false
  function answer(v: boolean) {
    if (root.dataset.step) return
    root.dataset.step = '1'
    vfOk = v === ex.answer
    ;(v ? bVrai : bFaux).classList.add(vfOk ? 'correct' : 'wrong')
    ;(ex.answer ? bVrai : bFaux).classList.add('correct')
    bVrai.disabled = true
    bFaux.disabled = true
    root.append(feedback(vfOk ? 'ok' : 'ko', vfOk ? `**Exact**, l'affirmation est ${ex.answer ? 'vraie' : 'fausse'}. Choisissez maintenant la bonne justification.` : `**Non**, l'affirmation est ${ex.answer ? 'vraie' : 'fausse'}. Choisissez la justification correcte.`))
    const step2 = el('div', 'options')
    const justs = shuffled(ex.justifications, ex.id + 'j')
    const buttons: HTMLButtonElement[] = []
    justs.forEach((j, idx) => {
      const b = el('button', 'option')
      b.type = 'button'
      b.append(el('span', 'option-letter', String.fromCharCode(65 + idx)))
      b.append(rich(j.text, 'rich option-text'))
      b.addEventListener('click', () => {
        if (root.dataset.done) return
        root.dataset.done = '1'
        buttons.forEach((x, i) => {
          x.disabled = true
          if (justs[i].correct) x.classList.add('correct')
          else if (i === idx) x.classList.add('wrong')
        })
        const jOk = j.correct
        const fb = explanationsBox(ctx)
        fb.append(feedback(jOk ? 'ok' : 'ko', jOk ? '**Bonne justification.**' : '**Mauvaise justification.**'))
        justs.forEach((jj, i) => {
          if (!jj.explanation) return
          const line = el('div', `explanation ${jj.correct ? 'explanation-correct' : 'explanation-wrong'}`)
          line.append(el('span', 'option-letter', String.fromCharCode(65 + i)))
          line.append(rich(jj.explanation))
          fb.append(line)
        })
        root.append(fb)
        finish(ex, ctx, vfOk && jOk ? 1 : vfOk || jOk ? 0.5 : 0)
      })
      buttons.push(b)
      step2.append(b)
    })
    root.append(step2)
  }
  return root
}
