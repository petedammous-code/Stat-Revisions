import type { EtapeSuivante } from '../content/types'
import { el, rich, feedback } from '../core/ui'
import { exerciseHeader, finish, shuffled, explanationsBox, type ExerciseContext } from './common'

/** Calcul guidé : à chaque étape, choisir l'expression suivante parmi des choix déjà écrits. */
export function renderEtapeSuivante(ex: EtapeSuivante, ctx: ExerciseContext): HTMLElement {
  const root = el('article', 'exercise exercise-etape')
  root.append(exerciseHeader(ex, ctx))
  root.append(rich(ex.setup, 'rich ex-question'))
  const trail = el('div', 'trail')
  root.append(trail)
  let current = 0
  let errors = 0

  function showStep() {
    if (current >= ex.steps.length) return done()
    const step = ex.steps[current]
    const box = el('div', 'guided-step')
    box.append(el('div', 'guided-num', `Étape ${current + 1} / ${ex.steps.length}`))
    box.append(rich(step.prompt, 'rich'))
    const opts = el('div', 'options')
    const choices = shuffled(step.choices, `${ex.id}-${current}`)
    const buttons: HTMLButtonElement[] = []
    choices.forEach((c, idx) => {
      const b = el('button', 'option')
      b.type = 'button'
      b.append(el('span', 'option-letter', String.fromCharCode(65 + idx)))
      b.append(rich(c.text, 'rich option-text'))
      b.addEventListener('click', () => {
        if (box.dataset.done) return
        box.dataset.done = '1'
        const ok = c.correct
        if (!ok) errors++
        buttons.forEach((x, i) => {
          x.disabled = true
          if (choices[i].correct) x.classList.add('correct')
          else if (i === idx) x.classList.add('wrong')
        })
        const fb = explanationsBox(ctx)
        fb.append(feedback(ok ? 'ok' : 'ko', ok ? '**Correct.**' : '**Incorrect.** La bonne expression est surlignée.'))
        choices.forEach((cc, i) => {
          if (!cc.explanation) return
          const line = el('div', `explanation ${cc.correct ? 'explanation-correct' : 'explanation-wrong'}`)
          line.append(el('span', 'option-letter', String.fromCharCode(65 + i)))
          line.append(rich(cc.explanation))
          fb.append(line)
        })
        box.append(fb)
        current++
        showStep()
      })
      buttons.push(b)
      opts.append(b)
    })
    box.append(opts)
    trail.append(box)
    box.scrollIntoView?.({ behavior: 'smooth', block: 'nearest' })
  }

  function done() {
    const n = ex.steps.length
    const outcome = errors === 0 ? 1 : errors <= Math.max(1, Math.floor(n / 3)) ? 0.5 : 0
    const fb = explanationsBox(ctx)
    fb.append(feedback(outcome === 1 ? 'ok' : outcome === 0.5 ? 'partial' : 'ko', `**Calcul terminé** : ${n - errors}/${n} étapes justes du premier coup.`))
    if (ex.conclusion) fb.append(rich(ex.conclusion))
    root.append(fb)
    finish(ex, ctx, outcome)
  }

  showStep()
  return root
}
