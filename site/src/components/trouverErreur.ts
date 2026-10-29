import type { TrouverErreur } from '../content/types'
import { el, rich, feedback } from '../core/ui'
import { exerciseHeader, finish, explanationsBox, type ExerciseContext } from './common'

/** Trouver l'erreur : cliquer sur la ligne fautive. */
export function renderTrouverErreur(ex: TrouverErreur, ctx: ExerciseContext): HTMLElement {
  const root = el('article', 'exercise exercise-erreur')
  root.append(exerciseHeader(ex, ctx))
  root.append(rich(ex.prompt, 'rich ex-question'))
  const list = el('ol', 'lines')
  const items: HTMLElement[] = []
  ex.lines.forEach((line, idx) => {
    const li = el('li', 'line')
    li.tabIndex = 0
    li.setAttribute('role', 'button')
    li.append(el('span', 'line-num', String(idx + 1)))
    li.append(rich(line, 'rich line-body'))
    const pick = () => {
      if (root.dataset.done) return
      root.dataset.done = '1'
      const ok = idx === ex.faultyIndex
      items.forEach((x, i) => {
        x.classList.add('disabled')
        if (i === ex.faultyIndex) x.classList.add('correct')
        else if (i === idx) x.classList.add('wrong')
      })
      const fb = explanationsBox(ctx)
      fb.append(feedback(ok ? 'ok' : 'ko', ok ? `**Bien vu**, la ligne ${idx + 1} est fautive.` : `**Non**, la ligne ${idx + 1} est correcte. L'erreur se trouve à la ligne ${ex.faultyIndex + 1}.`))
      fb.append(rich(ex.explanation))
      root.append(fb)
      finish(ex, ctx, ok ? 1 : 0)
    }
    li.addEventListener('click', pick)
    li.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        pick()
      }
    })
    items.push(li)
    list.append(li)
  })
  root.append(list)
  return root
}
