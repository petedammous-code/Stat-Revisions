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
  it('extrait les formules', () => {
    expect(extractMath('a $x$ b $$y$$ c')).toEqual([{ tex: 'x', display: false }, { tex: 'y', display: true }])
  })
})
