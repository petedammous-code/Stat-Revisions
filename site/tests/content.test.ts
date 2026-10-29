import { describe, it, expect } from 'vitest'
import { chapters } from './helpers'
import type { Exercise } from '../src/content/types'

/** Règles structurelles du contenu (une seule bonne réponse, explications, sources, aucune saisie de formule…). */
describe('Structure du contenu', () => {
  const chs = chapters()

  it('les slugs et numéros sont uniques et cohérents', () => {
    const slugs = new Set<string>()
    for (const c of chs) {
      expect(c.slug).toBe(`ch${c.number}`)
      expect(slugs.has(c.slug)).toBe(false)
      slugs.add(c.slug)
    }
  })

  for (const ch of chs) {
    describe(ch.slug, () => {
      it('a du contenu dans chaque rubrique', () => {
        expect(ch.course.length).toBeGreaterThan(0)
        expect(ch.exercises.length).toBeGreaterThan(0)
        expect(ch.flashcards.length).toBeGreaterThan(0)
        expect(ch.summarySheet.definitions.length).toBeGreaterThan(0)
      })

      it('les ids d’exercices, flashcards, viz et blocs sont uniques', () => {
        const ids = new Set<string>()
        const check = (id: string, what: string) => {
          expect(ids.has(id), `id dupliqué ${what} ${id}`).toBe(false)
          ids.add(id)
        }
        for (const e of ch.exercises) check(e.id, 'exercice')
        for (const f of ch.flashcards) check(f.id, 'flashcard')
        for (const v of ch.vizs) check(v.id, 'viz')
        for (const s of ch.course) {
          check(s.id, 'section')
          for (const b of s.blocks) check(b.id, 'bloc')
        }
      })

      it('chaque bloc théorème / exemple et chaque exercice cite sa source', () => {
        for (const s of ch.course)
          for (const b of s.blocks) {
            if (b.kind === 'theorem' || b.kind === 'example') expect(b.source.length, `${b.id} sans source`).toBeGreaterThan(3)
          }
        for (const e of ch.exercises) expect(e.source.length, `${e.id} sans source`).toBeGreaterThan(3)
        for (const f of ch.flashcards) expect(f.source.length, `${f.id} sans source`).toBeGreaterThan(3)
      })

      it('les références de visualisation dans le cours existent', () => {
        const vizIds = new Set(ch.vizs.map((v) => v.id))
        for (const s of ch.course) for (const b of s.blocks) if (b.kind === 'viz') expect(vizIds.has(b.vizId), `viz ${b.vizId} introuvable`).toBe(true)
      })

      it('chaque exercice respecte les règles de son type', () => {
        for (const e of ch.exercises) checkExercise(e)
      })

      it('les flashcards « hypothèse manquante » ont exactement un bon choix', () => {
        for (const f of ch.flashcards) {
          if (f.kind === 'hypothese-manquante') {
            expect(f.choices, `${f.id} sans choix`).toBeDefined()
            expect(f.choices!.filter((c) => c.correct).length, `${f.id}`).toBe(1)
            expect(f.choices!.length).toBeGreaterThanOrEqual(3)
          }
        }
      })

      it('les tags sont présents (pour le tableau de bord)', () => {
        for (const e of ch.exercises) expect(e.tags.length, `${e.id} sans tag`).toBeGreaterThan(0)
      })

      it('les preuves pas à pas ont une justification par étape', () => {
        for (const s of ch.course)
          for (const b of s.blocks) {
            const steps = b.kind === 'theorem' ? b.proof ?? [] : b.kind === 'example' ? b.steps : []
            for (const st of steps) {
              expect(st.text.trim().length, `${b.id}: étape vide`).toBeGreaterThan(0)
              expect(st.justification.trim().length, `${b.id}: justification vide`).toBeGreaterThan(0)
            }
          }
      })
    })
  }
})

function checkExercise(e: Exercise): void {
  const tag = `${e.type} ${e.id}`
  expect([1, 2, 3]).toContain(e.difficulty)
  switch (e.type) {
    case 'qcm': {
      expect(e.options.length, tag).toBeGreaterThanOrEqual(3)
      expect(e.options.filter((o) => o.correct).length, `${tag}: doit avoir exactement UNE bonne réponse`).toBe(1)
      for (const o of e.options) expect(o.explanation.trim().length, `${tag}: option sans explication`).toBeGreaterThan(10)
      break
    }
    case 'vrai-faux': {
      expect(e.justifications.length, tag).toBeGreaterThanOrEqual(3)
      expect(e.justifications.length, tag).toBeLessThanOrEqual(5)
      expect(e.justifications.filter((j) => j.correct).length, `${tag}: une seule justification correcte`).toBe(1)
      break
    }
    case 'ordonner': {
      expect(e.steps.length, tag).toBeGreaterThanOrEqual(3)
      expect(new Set(e.steps).size, `${tag}: étapes dupliquées`).toBe(e.steps.length)
      break
    }
    case 'trouver-erreur': {
      expect(e.lines.length, tag).toBeGreaterThanOrEqual(3)
      expect(e.faultyIndex, tag).toBeGreaterThanOrEqual(0)
      expect(e.faultyIndex, tag).toBeLessThan(e.lines.length)
      expect(e.explanation.trim().length, tag).toBeGreaterThan(10)
      break
    }
    case 'etape-suivante': {
      expect(e.steps.length, tag).toBeGreaterThanOrEqual(2)
      for (const s of e.steps) {
        expect(s.choices.length, tag).toBeGreaterThanOrEqual(2)
        expect(s.choices.filter((c) => c.correct).length, `${tag}: une seule bonne expression par étape`).toBe(1)
      }
      break
    }
    case 'associer': {
      expect(e.pairs.length, tag).toBeGreaterThanOrEqual(3)
      expect(new Set(e.pairs.map((p) => p.right)).size, `${tag}: éléments de droite dupliqués (ambigu)`).toBe(e.pairs.length)
      expect(new Set(e.pairs.map((p) => p.left)).size, `${tag}: éléments de gauche dupliqués`).toBe(e.pairs.length)
      break
    }
    case 'numerique': {
      expect(Number.isFinite(e.answer), tag).toBe(true)
      expect(e.tolerance, tag).toBeGreaterThan(0)
      expect(e.explanation.trim().length, tag).toBeGreaterThan(10)
      break
    }
    case 'annale': {
      expect(e.hints.length, tag).toBeGreaterThanOrEqual(1)
      expect(e.correction.trim().length, tag).toBeGreaterThan(100)
      expect(e.bareme.length, tag).toBeGreaterThan(0)
      for (const b of e.bareme) expect(b.points, tag).toBeGreaterThan(0)
      break
    }
  }
}

describe('Glossaire par chapitre', () => {
  it('chaque chapitre enregistre ses symboles avec sa propre portée', async () => {
    const files = import.meta.glob('../src/content/ch*/index.ts', { query: '?raw', import: 'default', eager: true }) as Record<string, string>
    for (const [path, src] of Object.entries(files)) {
      const slug = /content\/(ch\d)\//.exec(path)![1]
      if (src.includes('registerGlossary(')) expect(src, `${slug} : registerGlossary sans portée '${slug}'`).toMatch(new RegExp(`\\], '${slug}'\\)`))
    }
  })
})
