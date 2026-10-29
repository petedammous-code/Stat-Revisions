import type { Associer } from '../content/types'
import { el, rich, button, feedback } from '../core/ui'
import { exerciseHeader, finish, shuffled, explanationsBox, type ExerciseContext } from './common'

/** Texte lisible d'un élément Rich (pour les aria-label) : on retire les délimiteurs et le balisage. */
function plainText(r: string): string {
  return r.replace(/\$+/g, '').replace(/\*\*?/g, '').replace(/\s+/g, ' ').trim().slice(0, 120)
}

/**
 * Associer : colonne de gauche fixe, éléments de droite à glisser sur la bonne case
 * (ou : toucher / cliquer un élément de droite puis une case — fonctionne au doigt et au
 * clavier ; une puce placée se sélectionne pour être déplacée ou renvoyée dans la réserve).
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
  rightCol.append(
    el('div', 'match-pool-title', 'À placer (glisser, ou toucher une puce puis une case ; toucher une puce placée pour la déplacer ou la retirer) :'),
    pool,
  )

  /** Élément à refocaliser après le prochain rendu (navigation au clavier). */
  let focusSel: string | null = null

  /** Rend un élément activable au clavier (Entrée / Espace), comme dans trouverErreur.ts. */
  function keyboardButton(node: HTMLElement, label: string, activate: (e: Event) => void) {
    node.tabIndex = 0
    node.setAttribute('role', 'button')
    node.setAttribute('aria-label', label)
    node.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault()
        activate(e)
      }
    })
  }

  /**
   * Toucher / cliquer une puce :
   * - dans la réserve : la sélectionner (ou la désélectionner) ;
   * - placée, sans autre puce sélectionnée : la sélectionner pour la déplacer ; un second
   *   toucher la renvoie dans la réserve ;
   * - placée, alors qu'une autre puce est sélectionnée : poser la puce sélectionnée dans
   *   cette case (la puce qui l'occupait retourne dans la réserve).
   * L'événement ne remonte pas à la case (sinon la puce était aussitôt reposée au même endroit).
   */
  function activateChip(e: Event, pairIdx: number) {
    e.stopPropagation()
    if (root.dataset.done) return
    focusSel = e.type === 'keydown' ? `.chip[data-pair="${pairIdx}"]` : null
    const slotIdx = placement.indexOf(pairIdx)
    if (picked === pairIdx) {
      if (slotIdx !== -1) placement[slotIdx] = null
      picked = null
    } else if (picked !== null && slotIdx !== -1) {
      place(slotIdx, picked)
      return
    } else picked = pairIdx
    render()
  }

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
    c.addEventListener('click', (e) => activateChip(e, pairIdx))
    const placed = placement.includes(pairIdx)
    keyboardButton(c, placed ? 'Puce placée : sélectionner pour la déplacer ou la retirer' : 'Sélectionner cette puce', (e) => activateChip(e, pairIdx))
    if (picked === pairIdx) {
      c.classList.add('picked')
      c.setAttribute('aria-pressed', 'true')
    }
    return c
  }

  function activateSlot(e: Event, leftIdx: number) {
    if (root.dataset.done) return
    focusSel = e.type === 'keydown' ? `.slot[data-left="${leftIdx}"]` : null
    if (picked !== null) place(leftIdx, picked)
    else if (placement[leftIdx] !== null) {
      placement[leftIdx] = null
      render()
    }
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
      slot.addEventListener('click', (e) => activateSlot(e, leftIdx))
      keyboardButton(slot, `Placer dans : ${plainText(p.left)}`, (e) => activateSlot(e, leftIdx))
      row.append(slot)
      leftCol.append(row)
    })
    for (const pairIdx of rightOrder) if (!placement.includes(pairIdx)) pool.append(chip(pairIdx))
    validate.disabled = placement.some((x) => x === null)
    if (focusSel) {
      root.querySelector<HTMLElement>(focusSel)?.focus()
      focusSel = null
    }
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
