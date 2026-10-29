import type { Viz } from '../content/types'
import { el, rich, badge } from '../core/ui'
import { richInline } from '../core/rich'

const cleanups = new WeakMap<HTMLElement, () => void>()

/** Monte une visualisation dans une carte (titre, description, figure). */
export function mountViz(viz: Viz, compact = false): HTMLElement {
  const card = el('section', 'viz-card')
  card.id = `viz-${viz.id}`
  const head = el('div', 'viz-head')
  head.append(el('h3', 'viz-title', richInline(viz.title)))
  if (viz.source) head.append(badge(viz.source, 'badge badge-src'))
  card.append(head)
  if (!compact) card.append(rich(viz.description, 'rich viz-desc'))
  const body = el('div', 'viz-body')
  card.append(body)
  try {
    const c = viz.mount(body)
    if (typeof c === 'function') cleanups.set(card, c)
  } catch (e) {
    body.append(rich(`*Erreur lors du montage de la visualisation : ${e instanceof Error ? e.message : String(e)}*`))
  }
  if (compact) card.append(rich(viz.description, 'rich viz-desc muted'))
  return card
}

export function unmountAll(container: HTMLElement): void {
  container.querySelectorAll<HTMLElement>('.viz-card').forEach((c) => {
    cleanups.get(c)?.()
  })
}
