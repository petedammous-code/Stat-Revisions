import { describe, it, expect } from 'vitest'
import { chapters, allStrings } from './helpers'
import { extractMath, checkTex } from '../src/core/rich'
import { allGlossary } from '../src/content/glossary'
import { RAPPELS } from '../src/pages/examen'

/** Tout le KaTeX du contenu doit se rendre sans erreur (mode strict). */
describe('KaTeX', () => {
  const chs = chapters()
  const targets: { name: string; obj: unknown }[] = chs.map((c) => ({ name: c.slug, obj: c }))
  targets.push({ name: 'glossary', obj: allGlossary() })
  targets.push({ name: 'rappels examen', obj: RAPPELS })

  for (const t of targets) {
    it(`toutes les formules de ${t.name} compilent`, () => {
      const errors: string[] = []
      let count = 0
      for (const { path, value } of allStrings(t.obj)) {
        // Les $ non appariés sont une erreur de contenu.
        const dollars = (value.match(/(?<!\\)\$/g) ?? []).length
        if (dollars % 2 !== 0) errors.push(`${path}: nombre impair de $ → « ${value.slice(0, 80)} »`)
        for (const m of extractMath(value)) {
          count++
          const err = checkTex(m.tex, m.display)
          if (err) errors.push(`${path}: ${err.split('\n')[0]} → « ${m.tex.slice(0, 100)} »`)
        }
      }
      if (errors.length) console.error(errors.join('\n'))
      expect(errors, errors.slice(0, 20).join('\n')).toEqual([])
      expect(count).toBeGreaterThanOrEqual(0)
    })
  }
})
