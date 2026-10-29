import type { Associer } from '../content/types'
import { el, rich, button, feedback } from '../core/ui'
import { exerciseHeader, finish, shuffled, explanationsBox, type ExerciseContext } from './common'

/**
 * Associer : colonne de gauche fixe, éléments de droite à glisser sur la bonne case
 * (ou : cliquer un élément de droite puis une case — fonctionne au doigt).
 */
export function renderAssocier(ex: Associer, ctx: ExerciseContext): HTMLElement {
  const root = el('article', 'exercise exercise-associer')
  root.append(exerciseHeader(ex, ctx))
  root.append(rich(ex.prompt, 'rich ex-question'))
  const n = ex.pairs.length
  const rightOrder = shuffled(
    ex.pairs.map((_, i) => i),
    ex.id,
  )
  /** placement[leftIdx] = rightIdx (indice de paire) ou null */
  const placement: (number | null)[] = new Array(n).fill(null)
  let picked: number | null = null

  const grid = el('div', 'match-grid')
  const leftCol = el('div', 'match-left')
  const rightCol = el('div', 'match-right')
  grid.append(leftCol, rightCol)
  root.append(grid)

  const pool = el('div', 'match-pool')
  rightCol.append(el('div', 'match-pool-title', 'À placer (glisser ou cliquer) :'), pool)

  function chip(pairIdx: number): HTMLElement {
    const c = el('div', 'chip')
    c.draggable = !root.dataset.done
    c.dataset.pair = String(pairIdx)
    c.append(rich(ex.pairs[pairIdx].right, 'rich'))
    c.addEventListener('dragstart', (e) => {
      e.dataTransfer?.setData('text/plain', String(pairIdx))
      c.classList.add('dragging')
    })
    c.addEventListener('dragend', () => c.classList.remove('dragging'))
    c.addEventListener('click', () => {
      if (root.dataset.done) return
      picked = picked === pairIdx ? null : pairIdx
      render()
    })
    if (picked === pairIdx) c.classList.add('picked')
    return c
  }

  function render() {
    leftCol.innerHTML = ''
    pool.innerHTML = ''
    ex.pairs.forEach((p, leftIdx) => {
      const row = el('div', 'match-row')
      row.append(rich(p.left, 'rich match-left-item'))
      const slot = el('div', 'slot')
      slot.dataset.left = String(leftIdx)
      const placedPair = placement[leftIdx]
      if (placedPair !== null) {
        slot.append(chip(placedPair))
        slot.classList.add('filled')
      } else slot.append(el('span', 'slot-hint', picked !== null ? 'Déposer ici' : '…'))
      slot.addEventListener('dragover', (e) => {
        e.preventDefault()
        slot.classList.add('dragover')
      })
      slot.addEventListener('dragleave', () => slot.classList.remove('dragover'))
      slot.addEventListener('drop', (e) => {
        e.preventDefault()
        slot.classList.remove('dragover')
        const pairIdx = Number(e.dataTransfer?.getData('text/plain'))
        if (!Number.isNaN(pairIdx)) place(leftIdx, pairIdx)
      })
      slot.addEventListener('click', () => {
        if (root.dataset.done) return
        if (picked !== null) place(leftIdx, picked)
        else if (placement[leftIdx] !== null) {
          placement[leftIdx] = null
          render()
        }
      })
      row.append(slot)
      leftCol.append(row)
    })
    for (const pairIdx of rightOrder) if (!placement.includes(pairIdx)) pool.append(chip(pairIdx))
    validate.disabled = placement.some((x) => x === null)
  }

  function place(leftIdx: number, pairIdx: number) {
    if (root.dataset.done) return
    const prev = placement.indexOf(pairIdx)
    if (prev !== -1) placement[prev] = null
    placement[leftIdx] = pairIdx
    picked = null
    render()
  }

  const actions = el('div', 'ex-actions')
  const validate = button('Valider', () => {
    if (root.dataset.done) return
    root.dataset.done = '1'
    let good = 0
    leftCol.querySelectorAll('.slot').forEach((s, leftIdx) => {
      const ok = placement[leftIdx] === leftIdx
      if (ok) good++
      s.classList.add(ok ? 'correct' : 'wrong')
    })
    const all = good === n
    const fb = explanationsBox(ctx)
    fb.append(feedback(all ? 'ok' : good / n >= 0.6 ? 'partial' : 'ko', all ? '**Toutes les associations sont justes.**' : `**${good}/${n}** associations justes. Correction :`))
    const table = el('table', 'match-solution')
    for (const p of ex.pairs) {
      const tr = el('tr')
      const a = el('td')
      a.append(rich(p.left))
      const b = el('td')
      b.append(rich(p.right))
      tr.append(a, b)
      if (p.explanation) {
        const c = el('td', 'muted')
        c.append(rich(p.explanation))
        tr.append(c)
      }
      table.append(tr)
    }
    fb.append(table)
    root.append(fb)
    validate.remove()
    finish(ex, ctx, all ? 1 : good / n >= 0.6 ? 0.5 : 0)
  })
  actions.append(validate)
  root.append(actions)
  render()
  return root
}
