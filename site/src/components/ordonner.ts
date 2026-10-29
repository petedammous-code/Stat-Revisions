import type { Ordonner } from '../content/types'
import { el, rich, button, feedback } from '../core/ui'
import { exerciseHeader, finish, shuffled, explanationsBox, type ExerciseContext } from './common'

/**
 * Remettre les étapes d'une preuve dans l'ordre : glisser-déposer (souris ; au doigt, par la
 * poignée ⋮⋮ uniquement) avec boutons ▲ ▼ en secours. Score : 1 si tout est en place, 0.5 si ≥ 60 % des étapes
 * sont à la bonne position, 0 sinon.
 */
export function renderOrdonner(ex: Ordonner, ctx: ExerciseContext): HTMLElement {
  const root = el('article', 'exercise exercise-ordonner')
  root.append(exerciseHeader(ex, ctx))
  root.append(rich(ex.prompt, 'rich ex-question'))
  const list = el('ol', 'sortable')
  const indices = shuffled(
    ex.steps.map((_, i) => i),
    ex.id,
  )
  // Évite l'ordre déjà correct par hasard.
  if (indices.every((v, i) => v === i) && indices.length > 1) indices.reverse()
  let order = indices.slice()

  function render() {
    list.innerHTML = ''
    order.forEach((stepIdx, pos) => {
      const li = el('li', 'sortable-item')
      li.draggable = !root.dataset.done
      li.dataset.pos = String(pos)
      const handle = el('span', 'drag-handle', '⋮⋮')
      const num = el('span', 'step-num', String(pos + 1))
      const body = rich(ex.steps[stepIdx], 'rich step-body')
      const ctl = el('span', 'step-ctl')
      const up = button('▲', () => move(pos, pos - 1), 'btn-mini')
      const down = button('▼', () => move(pos, pos + 1), 'btn-mini')
      up.setAttribute('aria-label', 'Monter')
      down.setAttribute('aria-label', 'Descendre')
      ctl.append(up, down)
      li.append(handle, num, body, ctl)
      li.addEventListener('dragstart', (e) => {
        if (root.dataset.done) return
        e.dataTransfer?.setData('text/plain', String(pos))
        li.classList.add('dragging')
      })
      li.addEventListener('dragend', () => li.classList.remove('dragging'))
      li.addEventListener('dragover', (e) => {
        e.preventDefault()
        li.classList.add('dragover')
      })
      li.addEventListener('dragleave', () => li.classList.remove('dragover'))
      li.addEventListener('drop', (e) => {
        e.preventDefault()
        li.classList.remove('dragover')
        const from = Number(e.dataTransfer?.getData('text/plain'))
        if (!Number.isNaN(from)) move(from, pos)
      })
      // Tactile : le glisser ne démarre QUE sur la poignée ⋮⋮ (sinon un simple défilement de la
      // page commencé sur une étape la déplaçait). Pendant le glisser, on bloque le défilement
      // (touchmove non passif + touch-action: none sur la poignée, voir styles.css).
      let touchStartY: number | null = null
      handle.setAttribute('aria-hidden', 'true')
      handle.addEventListener('touchstart', (e) => {
        if (root.dataset.done) return
        touchStartY = e.touches[0].clientY
        li.classList.add('dragging')
      }, { passive: true })
      handle.addEventListener('touchmove', (e) => {
        if (touchStartY !== null) e.preventDefault()
      }, { passive: false })
      const endTouch = (e: TouchEvent) => {
        if (touchStartY === null) return
        const dy = e.changedTouches[0].clientY - touchStartY
        touchStartY = null
        li.classList.remove('dragging')
        const h = li.getBoundingClientRect().height || 1
        const shift = Math.round(dy / h)
        if (shift !== 0) move(pos, Math.max(0, Math.min(order.length - 1, pos + shift)))
      }
      handle.addEventListener('touchend', endTouch)
      handle.addEventListener('touchcancel', () => {
        touchStartY = null
        li.classList.remove('dragging')
      })
      list.append(li)
    })
  }

  function move(from: number, to: number) {
    if (root.dataset.done) return
    if (to < 0 || to >= order.length || from === to) return
    const next = order.slice()
    const [item] = next.splice(from, 1)
    next.splice(to, 0, item)
    order = next
    render()
  }

  render()
  root.append(list)
  const actions = el('div', 'ex-actions')
  const validate = button('Valider l’ordre', () => {
    if (root.dataset.done) return
    root.dataset.done = '1'
    let good = 0
    order.forEach((stepIdx, pos) => {
      if (stepIdx === pos) good++
    })
    const items = list.querySelectorAll('li')
    items.forEach((li, pos) => {
      li.classList.add(order[pos] === pos ? 'correct' : 'wrong')
      li.draggable = false
    })
    const all = good === order.length
    const fb = explanationsBox(ctx)
    fb.append(feedback(all ? 'ok' : good / order.length >= 0.6 ? 'partial' : 'ko', all ? '**Ordre parfait.**' : `**${good}/${order.length}** étapes bien placées. Voici l'ordre correct :`))
    if (!all) {
      const ol = el('ol', 'solution-list')
      for (const s of ex.steps) {
        const li = el('li')
        li.append(rich(s))
        ol.append(li)
      }
      fb.append(ol)
    }
    if (ex.explanation) fb.append(rich(ex.explanation))
    root.append(fb)
    validate.remove()
    finish(ex, ctx, all ? 1 : good / order.length >= 0.6 ? 0.5 : 0)
  })
  actions.append(validate)
  root.append(actions)
  return root
}
