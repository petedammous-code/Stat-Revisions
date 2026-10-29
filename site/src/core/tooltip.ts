/** Infobulles de glossaire : survol / focus d'un `.gloss`. */
import { allGlossary } from '../content/glossary'
import { richToHtml } from './rich'

let tip: HTMLElement | null = null

function ensureTip(): HTMLElement {
  if (!tip) {
    tip = document.createElement('div')
    tip.className = 'tooltip'
    tip.setAttribute('role', 'tooltip')
    document.body.append(tip)
  }
  return tip
}

function show(target: HTMLElement): void {
  const key = target.dataset.gloss
  const entry = allGlossary().find((g) => g.key === key)
  if (!entry) return
  const t = ensureTip()
  t.innerHTML = `<div class="tooltip-title">${entry.name}</div>${richToHtml(entry.definition)}<div class="tooltip-src">${entry.source}</div>`
  t.style.display = 'block'
  const r = target.getBoundingClientRect()
  const tw = Math.min(360, window.innerWidth - 16)
  t.style.maxWidth = `${tw}px`
  let left = r.left + window.scrollX
  if (left + tw > window.scrollX + window.innerWidth - 8) left = window.scrollX + window.innerWidth - tw - 8
  t.style.left = `${Math.max(8, left)}px`
  t.style.top = `${r.bottom + window.scrollY + 6}px`
}

function hide(): void {
  if (tip) tip.style.display = 'none'
}

export function initTooltips(): void {
  document.addEventListener('mouseover', (e) => {
    const target = (e.target as HTMLElement).closest?.('.gloss') as HTMLElement | null
    if (target) show(target)
  })
  document.addEventListener('mouseout', (e) => {
    const target = (e.target as HTMLElement).closest?.('.gloss')
    if (target) hide()
  })
  document.addEventListener('focusin', (e) => {
    const target = (e.target as HTMLElement).closest?.('.gloss') as HTMLElement | null
    if (target) show(target)
  })
  document.addEventListener('focusout', hide)
  // Sur mobile : un tap bascule l'infobulle.
  document.addEventListener('click', (e) => {
    const target = (e.target as HTMLElement).closest?.('.gloss') as HTMLElement | null
    if (target) {
      if (tip && tip.style.display === 'block' && tip.dataset.for === target.dataset.gloss) {
        hide()
        delete tip.dataset.for
      } else {
        show(target)
        if (tip) tip.dataset.for = target.dataset.gloss ?? ''
      }
    } else hide()
  })
}
