import { describe, it, expect, beforeEach } from 'vitest'
import { parseHash } from '../src/core/router'
import { recordAttempt, getItemStats, dueItems, weaknessByTag, resetAll, aggregate } from '../src/core/store'
import { richToHtml, extractMath } from '../src/core/rich'

describe('Routeur', () => {
  it('analyse les hash', () => {
    expect(parseHash('')).toMatchObject({ segments: [] })
    expect(parseHash('#/ch/ch6/viz')).toMatchObject({ segments: ['ch', 'ch6', 'viz'] })
    expect(parseHash('#/ch/ch6/cours?s=intro').params.get('s')).toBe('intro')
  })
})

describe('Stockage de la progression', () => {
  beforeEach(() => resetAll())
  it('enregistre et agrège les tentatives', () => {
    recordAttempt({ chapter: 'ch6', itemId: 'a', type: 'qcm', tags: ['tcl'], outcome: 1 })
    recordAttempt({ chapter: 'ch6', itemId: 'b', type: 'qcm', tags: ['tcl', 'slutsky'], outcome: 0 })
    expect(getItemStats('ch6', 'a')?.attempts).toBe(1)
    expect(aggregate((a) => a.chapter === 'ch6')).toEqual({ attempts: 2, score: 1, items: 2 })
    const weak = weaknessByTag()
    expect(weak[0].tag).toBe('slutsky')
    expect(weak[0].rate).toBe(0)
  })
  it('répétition espacée : un échec est dû immédiatement, un succès plus tard', () => {
    recordAttempt({ chapter: 'ch6', itemId: 'ko', type: 'qcm', tags: [], outcome: 0 })
    recordAttempt({ chapter: 'ch6', itemId: 'ok', type: 'qcm', tags: [], outcome: 1 })
    const due = dueItems(Date.now() + 12 * 3600 * 1000)
    expect(due.map((d) => d.itemId)).toEqual(['ko'])
  })
  it('révision ciblée : un item raté ou partiel est reproposé immédiatement, ratés d’abord', () => {
    recordAttempt({ chapter: 'ch2', itemId: 'ok', type: 'qcm', tags: [], outcome: 1 })
    recordAttempt({ chapter: 'ch2', itemId: 'partiel', type: 'annale', tags: [], outcome: 0.5 })
    recordAttempt({ chapter: 'ch2', itemId: 'rate', type: 'annale', tags: [], outcome: 0 })
    expect(dueItems().map((d) => d.itemId)).toEqual(['rate', 'partiel'])
    // Réussi ensuite : il sort de la liste jusqu'à son échéance.
    recordAttempt({ chapter: 'ch2', itemId: 'rate', type: 'annale', tags: [], outcome: 1 })
    expect(dueItems().map((d) => d.itemId)).toEqual(['partiel'])
  })
})

describe('Texte riche', () => {
  it('rend markdown léger et maths', () => {
    const html = richToHtml('Un **gras** et $\\theta$.\n\n- a\n- b\n\n$$\\bar X_n$$')
    expect(html).toContain('<strong>gras</strong>')
    expect(html).toContain('katex')
    expect(html).toContain('<ul><li>a</li><li>b</li></ul>')
    expect(html).toContain('math-display')
    expect(html).toContain('class="gloss"')
  })
  it('respecte le numéro de départ des listes numérotées', () => {
    expect(richToHtml('3. trois\n4. quatre')).toContain('<ol start="3">')
    expect(richToHtml('1. un\n2. deux')).toContain('<ol>')
  })
  it('extrait les formules', () => {
    expect(extractMath('a $x$ b $$y$$ c')).toEqual([{ tex: 'x', display: false }, { tex: 'y', display: true }])
  })
})

describe('Socle — compléments', () => {
  it('rend les tableaux markdown', () => {
    const html = richToHtml('| a | b |\n|---|---|\n| $x$ | 2 |')
    expect(html).toContain('<table class="rich-table">')
    expect(html).toContain('<th>a</th>')
    expect(html).toContain('katex')
  })
  it('rend l’indicatrice en gras', () => {
    expect(richToHtml('$\\mathbb{1}_A$')).toContain('mathbf')
  })
})
