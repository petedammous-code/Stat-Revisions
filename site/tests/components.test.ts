import { describe, it, expect, beforeEach } from 'vitest'
import type { Exercise, Qcm, VraiFaux, Ordonner, TrouverErreur, EtapeSuivante, Associer, Numerique, Annale } from '../src/content/types'
import { renderExercise } from '../src/components/exercise'
import { chapters } from './helpers'
import { resetAll, getItemStats } from '../src/core/store'

const base = { source: 'Test', origin: 'variante' as const, difficulty: 1 as const, tags: ['test'] }

const FIXTURES: Exercise[] = [
  { ...base, type: 'qcm', id: 'q1', title: 'QCM', question: 'Soit $\\theta$. Vrai ?', options: [
    { text: 'A $x$', correct: true, explanation: 'Oui parce que ceci est la bonne réponse.' },
    { text: 'B', correct: false, explanation: 'Non parce que erreur classique numéro un.' },
    { text: 'C', correct: false, explanation: 'Non parce que erreur classique numéro deux.' },
  ] } as Qcm,
  { ...base, type: 'vrai-faux', id: 'v1', title: 'VF', statement: '$\\bar X_n$ est sans biais.', answer: true, justifications: [
    { text: 'Linéarité de l’espérance', correct: true }, { text: 'Par le TCL', correct: false }, { text: 'Par Fubini', correct: false },
  ] } as VraiFaux,
  { ...base, type: 'ordonner', id: 'o1', title: 'Ordre', prompt: 'Ordonner', steps: ['a', 'b', 'c', 'd'] } as Ordonner,
  { ...base, type: 'trouver-erreur', id: 'e1', title: 'Erreur', prompt: 'Trouver', lines: ['l1', 'l2 faux', 'l3'], faultyIndex: 1, explanation: 'La ligne 2 confond niveau et puissance.' } as TrouverErreur,
  { ...base, type: 'etape-suivante', id: 's1', title: 'Étapes', setup: 'Calcul', steps: [
    { prompt: 'Suite ?', choices: [{ text: '$1$', correct: true }, { text: '$2$', correct: false }] },
    { prompt: 'Suite ?', choices: [{ text: '$3$', correct: false }, { text: '$4$', correct: true }] },
  ] } as EtapeSuivante,
  { ...base, type: 'associer', id: 'a1', title: 'Associer', prompt: 'Associer', pairs: [
    { left: 'Bern(p)', right: '$p(1-p)$' }, { left: 'Pois(λ)', right: '$\\lambda$' }, { left: 'Exp(λ)', right: '$1/\\lambda^2$' },
  ] } as Associer,
  { ...base, type: 'numerique', id: 'n1', title: 'Num', question: 'Quantile 0.975 ?', answer: 1.96, tolerance: 0.01, explanation: 'Table de la loi normale centrée réduite.' } as Numerique,
  { ...base, type: 'annale', id: 'an1', title: 'Annale', statement: 'Énoncé', hints: ['i1', 'i2'], correction: 'Correction '.repeat(20), bareme: [{ label: 'Q1', points: 2 }] } as Annale,
]

describe('Composants d’exercice', () => {
  beforeEach(() => resetAll())

  it('se rendent tous sans erreur et sans champ de saisie de formule', () => {
    for (const ex of FIXTURES) {
      const el = renderExercise(ex, { chapter: 'test' })
      expect(el).toBeInstanceOf(HTMLElement)
      const inputs = el.querySelectorAll('input:not([type=range]):not([type=checkbox])')
      if (ex.type === 'numerique') {
        expect(inputs.length).toBe(1)
        expect((inputs[0] as HTMLInputElement).type).toBe('number')
      } else expect(inputs.length, `${ex.type} ne doit avoir aucun champ texte`).toBe(0)
      expect(el.querySelectorAll('textarea').length).toBe(0)
    }
  })

  it('QCM : valider la bonne option enregistre un succès', () => {
    const el = renderExercise(FIXTURES[0], { chapter: 'test' })
    const options = [...el.querySelectorAll<HTMLButtonElement>('.option')]
    const good = options.find((o) => o.textContent?.includes('A'))!
    good.click()
    ;(el.querySelector('.ex-actions .btn') as HTMLButtonElement).click()
    expect(el.querySelector('.feedback-ok')).toBeTruthy()
    expect(getItemStats('test', 'q1')?.lastOutcome).toBe(1)
    expect(el.querySelectorAll('.explanation').length).toBe(3)
  })

  it('Vrai/Faux : réponse et justification', () => {
    const el = renderExercise(FIXTURES[1], { chapter: 'test' })
    const [vrai] = [...el.querySelectorAll<HTMLButtonElement>('.btn-choice')]
    vrai.click()
    const just = [...el.querySelectorAll<HTMLButtonElement>('.option')].find((o) => o.textContent?.includes('Linéarité'))!
    just.click()
    expect(getItemStats('test', 'v1')?.lastOutcome).toBe(1)
  })

  it('Ordonner : l’ordre initial est mélangé et la validation fonctionne', () => {
    const el = renderExercise(FIXTURES[2], { chapter: 'test' })
    const items = [...el.querySelectorAll('.sortable-item .step-body')].map((x) => x.textContent?.trim())
    expect(items).not.toEqual(['a', 'b', 'c', 'd'])
    ;(el.querySelector('.ex-actions .btn') as HTMLButtonElement).click()
    expect(getItemStats('test', 'o1')).toBeDefined()
  })

  it('Trouver l’erreur : cliquer la ligne fautive', () => {
    const el = renderExercise(FIXTURES[3], { chapter: 'test' })
    ;(el.querySelectorAll('.line')[1] as HTMLElement).click()
    expect(el.querySelector('.feedback-ok')).toBeTruthy()
    expect(getItemStats('test', 'e1')?.lastOutcome).toBe(1)
  })

  it('Étape suivante : deux bonnes réponses → succès', () => {
    const el = renderExercise(FIXTURES[4], { chapter: 'test' })
    for (let k = 0; k < 2; k++) {
      const steps = el.querySelectorAll('.guided-step')
      const last = steps[steps.length - 1]
      const opts = [...last.querySelectorAll<HTMLButtonElement>('.option')]
      const good = opts.find((o) => (k === 0 ? o.textContent?.includes('1') : o.textContent?.includes('4')))!
      good.click()
    }
    expect(getItemStats('test', 's1')?.lastOutcome).toBe(1)
  })

  it('Associer : placement par clic puis validation', () => {
    const ex = FIXTURES[5] as Associer
    const el = renderExercise(ex, { chapter: 'test' })
    for (let i = 0; i < ex.pairs.length; i++) {
      const chip = el.querySelector<HTMLElement>(`.match-pool .chip[data-pair="${i}"]`)!
      chip.click()
      ;(el.querySelectorAll('.slot')[i] as HTMLElement).click()
    }
    ;(el.querySelector('.ex-actions .btn') as HTMLButtonElement).click()
    expect(el.querySelector('.feedback-ok')).toBeTruthy()
    expect(getItemStats('test', 'a1')?.lastOutcome).toBe(1)
  })

  it('Numérique : tolérance', () => {
    const el = renderExercise(FIXTURES[6], { chapter: 'test' })
    const input = el.querySelector<HTMLInputElement>('.num-input')!
    input.value = '1.955'
    ;(el.querySelector('.ex-actions .btn, .num-row .btn') as HTMLButtonElement).click()
    expect(getItemStats('test', 'n1')?.lastOutcome).toBe(1)
  })

  it('Annale : indices progressifs, correction, auto-évaluation', () => {
    const el = renderExercise(FIXTURES[7], { chapter: 'test' })
    const hintBtn = [...el.querySelectorAll<HTMLButtonElement>('button')].find((b) => b.textContent?.startsWith('Indice'))!
    hintBtn.click()
    expect(el.querySelectorAll('.hint').length).toBe(1)
    hintBtn.click()
    expect(el.querySelectorAll('.hint').length).toBe(2)
    const corr = [...el.querySelectorAll<HTMLButtonElement>('button')].find((b) => b.textContent?.includes('Révéler'))!
    corr.click()
    const partial = [...el.querySelectorAll<HTMLButtonElement>('button')].find((b) => b.textContent === 'Partiel')!
    partial.click()
    expect(getItemStats('test', 'an1')?.lastOutcome).toBe(0.5)
  })

  it('tous les exercices réels se rendent sans erreur', () => {
    for (const ch of chapters()) {
      for (const ex of ch.exercises) {
        const el = renderExercise(ex, { chapter: ch.slug })
        const inputs = el.querySelectorAll('input:not([type=range]):not([type=checkbox]), textarea')
        if (ex.type === 'numerique') expect(inputs.length).toBe(1)
        else expect(inputs.length, `${ch.slug}/${ex.id} : aucune saisie autorisée`).toBe(0)
      }
    }
  })
})
