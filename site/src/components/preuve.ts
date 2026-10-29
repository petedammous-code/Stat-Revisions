import type { ProofStep } from '../content/types'
import { el, rich, button } from '../core/ui'

/** Preuve pas à pas : chaque étape se révèle au clic, avec sa justification. */
export function renderProof(steps: ProofStep[], title = 'Preuve pas à pas'): HTMLElement {
  const root = el('div', 'proof')
  const head = el('div', 'proof-head')
  head.append(el('span', 'proof-title', title), el('span', 'proof-count', `0 / ${steps.length}`))
  root.append(head)
  const list = el('ol', 'proof-steps')
  root.append(list)
  let shown = 0
  const btnNext = button('Étape suivante', () => reveal(), 'btn btn-secondary')
  const btnAll = button('Tout révéler', () => {
    while (shown < steps.length) reveal()
  }, 'btn btn-ghost')
  const actions = el('div', 'proof-actions')
  actions.append(btnNext, btnAll)
  root.append(actions)

  function reveal() {
    if (shown >= steps.length) return
    const s = steps[shown]
    const li = el('li', 'proof-step')
    li.append(rich(s.text, 'rich proof-text'))
    const j = el('div', 'proof-just')
    j.append(el('span', 'proof-just-label', 'Justification : '))
    j.append(rich(s.justification, 'rich inline'))
    li.append(j)
    list.append(li)
    shown++
    head.querySelector('.proof-count')!.textContent = `${shown} / ${steps.length}`
    if (shown >= steps.length) {
      btnNext.disabled = true
      btnAll.disabled = true
      li.append(el('div', 'qed', '∎'))
    }
  }
  return root
}
