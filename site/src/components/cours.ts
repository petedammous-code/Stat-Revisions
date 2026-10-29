import type { Chapter, CourseBlock, CourseSection, TheoremBlock } from '../content/types'
import { el, rich, details, badge } from '../core/ui'
import { richInline } from '../core/rich'
import { renderProof } from './preuve'
import { markRead, isRead } from '../core/store'
import { mountViz } from './viz'

const KIND_LABEL: Record<TheoremBlock['type'], string> = {
  definition: 'Définition',
  theoreme: 'Théorème',
  proposition: 'Proposition',
  lemme: 'Lemme',
  corollaire: 'Corollaire',
  remarque: 'Remarque',
  exemple: 'Exemple',
  methode: 'Méthode',
}

/** Cours interactif : sections dépliables, blocs sourcés, preuves pas à pas, exemples révélés. */
export function renderCourse(ch: Chapter): HTMLElement {
  const root = el('div', 'course')
  const toc = el('nav', 'toc')
  toc.append(el('div', 'toc-title', 'Plan du chapitre'))
  const tocList = el('ol')
  toc.append(tocList)
  root.append(toc)
  ch.course.forEach((section, i) => {
    const a = el('a')
    a.href = `#/ch/${ch.slug}/cours?s=${section.id}`
    a.innerHTML = richInline(section.title)
    if (section.scope === 'hors-programme') a.append(badge('hors programme', 'badge badge-hp'))
    const li = el('li')
    li.append(a)
    tocList.append(li)
    root.append(renderSection(ch, section, i === 0))
  })
  return root
}

function renderSection(ch: Chapter, section: CourseSection, openByDefault: boolean): HTMLElement {
  const body = el('div', 'section-body')
  if (section.intro) body.append(rich(section.intro, 'rich section-intro'))
  for (const b of section.blocks) body.append(renderBlock(ch, b))
  const summary = section.title + (section.scope === 'hors-programme' ? ' — hors programme / complément' : '')
  const d = details(summary, body, openByDefault || isRead(`${ch.slug}:${section.id}`) === false && openByDefault)
  d.classList.add('course-section')
  d.id = `section-${section.id}`
  if (section.scope === 'hors-programme') d.classList.add('hp')
  if (isRead(`${ch.slug}:${section.id}`)) d.classList.add('read')
  d.addEventListener('toggle', () => {
    if (d.open) {
      markRead(`${ch.slug}:${section.id}`)
      d.classList.add('read')
    }
  })
  return d
}

function renderBlock(ch: Chapter, b: CourseBlock): HTMLElement {
  switch (b.kind) {
    case 'text': {
      const box = el('div', 'block block-text')
      if (b.scope === 'hors-programme') box.classList.add('hp')
      if (b.title) box.append(el('div', 'block-title', richInline(b.title)))
      box.append(rich(b.text))
      return box
    }
    case 'theorem':
      return renderTheorem(b)
    case 'example': {
      const box = el('div', 'block block-example')
      if (b.scope === 'hors-programme') box.classList.add('hp')
      const head = el('div', 'block-head')
      head.append(el('span', 'block-kind', 'Exemple'), el('span', 'block-label', richInline(b.title)), badge(b.source, 'badge badge-src'))
      box.append(head)
      box.append(rich(b.setup))
      box.append(renderProof(b.steps, 'Résolution pas à pas'))
      if (b.conclusion) box.append(rich(b.conclusion, 'rich block-conclusion'))
      return box
    }
    case 'viz': {
      const box = el('div', 'block block-viz')
      const viz = ch.vizs.find((v) => v.id === b.vizId)
      if (!viz) {
        box.append(rich(`*Visualisation « ${b.vizId} » introuvable.*`))
        return box
      }
      box.append(mountViz(viz, true))
      if (b.caption) box.append(rich(b.caption, 'rich caption'))
      return box
    }
  }
}

export function renderTheorem(b: TheoremBlock): HTMLElement {
  const box = el('div', `block block-theorem block-${b.type}`)
  if (b.scope === 'hors-programme') box.classList.add('hp')
  const head = el('div', 'block-head')
  head.append(el('span', 'block-kind', KIND_LABEL[b.type]), el('span', 'block-label', richInline(`${b.label} — ${b.title}`)), badge(b.source, 'badge badge-src'))
  if (b.scope === 'hors-programme') head.append(badge('Hors programme / complément', 'badge badge-hp'))
  box.append(head)
  if (b.hypotheses && b.hypotheses.length) {
    const hyp = el('div', 'hypotheses')
    hyp.append(el('div', 'hyp-title', 'Hypothèses'))
    const ul = el('ul')
    for (const h of b.hypotheses) {
      const li = el('li')
      li.append(rich(h))
      ul.append(li)
    }
    hyp.append(ul)
    box.append(hyp)
  }
  box.append(rich(b.statement, 'rich statement'))
  if (b.intuition) {
    const i = el('div', 'intuition')
    i.append(el('span', 'intuition-label', 'Intuition : '))
    i.append(rich(b.intuition, 'rich inline'))
    box.append(i)
  }
  if (b.proof && b.proof.length) box.append(details('Preuve pas à pas', renderProof(b.proof)))
  if (b.pitfalls && b.pitfalls.length) {
    const p = el('div', 'pitfalls')
    p.append(el('div', 'pitfalls-title', 'Pièges'))
    const ul = el('ul')
    for (const t of b.pitfalls) {
      const li = el('li')
      li.append(rich(t))
      ul.append(li)
    }
    p.append(ul)
    box.append(p)
  }
  return box
}
