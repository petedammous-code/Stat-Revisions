import { describe, it, expect, beforeEach } from 'vitest'
import type { Exercise, Qcm, VraiFaux, Ordonner, TrouverErreur, EtapeSuivante, Associer, Numerique, Annale } from '../src/content/types'
import { renderExercise } from '../src/components/exercise'
import { chapters } from './helpers'
import { resetAll, getItemStats } from '../src/core/store'
import { parseDecimal, formatWithTolerance } from '../src/components/numerique'

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
        expect((inputs[0] as HTMLInputElement).type).toBe('text')
        expect((inputs[0] as HTMLInputElement).inputMode).toBe('decimal')
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

  it('Numérique : virgule décimale française acceptée, saisie invalide refusée sans enregistrer', () => {
    const el = renderExercise(FIXTURES[6], { chapter: 'test' })
    const input = el.querySelector<HTMLInputElement>('.num-input')!
    const btn = el.querySelector('.ex-actions .btn, .num-row .btn') as HTMLButtonElement
    input.value = '1,9x'
    btn.click()
    expect(getItemStats('test', 'n1')).toBeUndefined()
    input.value = ' 1,955 '
    btn.click()
    expect(getItemStats('test', 'n1')?.lastOutcome).toBe(1)
    expect(el.querySelector('.feedback')?.textContent).toContain('1,96')
  })

  it('Numérique : analyse et formatage des nombres', () => {
    expect(parseDecimal('0,62')).toBe(0.62)
    expect(parseDecimal('0.62')).toBe(0.62)
    expect(parseDecimal('-1,5e-3')).toBe(-0.0015)
    expect(parseDecimal(',5')).toBe(0.5)
    expect(parseDecimal('1 234,5')).toBe(1234.5)
    expect(parseDecimal('')).toBeNull()
    expect(parseDecimal('-')).toBeNull()
    expect(parseDecimal('1,2,3')).toBeNull()
    expect(parseDecimal('abc')).toBeNull()
    expect(formatWithTolerance(1 / 12, 0.002)).toBe('0,0833')
    expect(formatWithTolerance(0.3068528194400547, 0.005)).toBe('0,3069')
    expect(formatWithTolerance(1.96, 0.01)).toBe('1,96')
  })

  it('Numérique : la valeur attendue est affichée arrondie', () => {
    const ex = { ...FIXTURES[6], id: 'n2', answer: 1 / 12, tolerance: 0.002 } as Numerique
    const el = renderExercise(ex, { chapter: 'test' })
    el.querySelector<HTMLInputElement>('.num-input')!.value = '0,5'
    ;(el.querySelector('.num-row .btn') as HTMLButtonElement).click()
    const txt = el.querySelector('.feedback')?.textContent ?? ''
    expect(txt).toContain('0,0833')
    expect(txt).not.toContain('0.0833333')
  })

  it('Associer : une puce placée se déplace ou retourne dans la réserve', () => {
    const ex = FIXTURES[5] as Associer
    const el = renderExercise(ex, { chapter: 'test' })
    const chipOf = (i: number) => el.querySelector<HTMLElement>(`.chip[data-pair="${i}"]`)!
    const slots = () => [...el.querySelectorAll<HTMLElement>('.slot')]
    chipOf(0).click()
    slots()[0].click()
    expect(slots()[0].querySelector('.chip[data-pair="0"]')).toBeTruthy()
    // Toucher la puce placée la sélectionne (elle n'est pas reposée au même endroit)…
    chipOf(0).click()
    expect(chipOf(0).classList.contains('picked')).toBe(true)
    // … puis toucher une autre case l'y déplace.
    slots()[1].click()
    expect(slots()[0].querySelector('.chip')).toBeNull()
    expect(slots()[1].querySelector('.chip[data-pair="0"]')).toBeTruthy()
    // Deux touchers sur la puce placée la renvoient dans la réserve.
    chipOf(0).click()
    chipOf(0).click()
    expect(el.querySelector('.match-pool .chip[data-pair="0"]')).toBeTruthy()
    expect(slots()[1].querySelector('.chip')).toBeNull()
  })

  it('Associer : utilisable au clavier', () => {
    const ex = FIXTURES[5] as Associer
    const el = renderExercise(ex, { chapter: 'test' })
    document.body.append(el)
    const press = (node: HTMLElement) => node.dispatchEvent(new KeyboardEvent('keydown', { key: 'Enter', bubbles: true }))
    for (const node of el.querySelectorAll<HTMLElement>('.chip, .slot')) {
      expect(node.tabIndex).toBe(0)
      expect(node.getAttribute('role')).toBe('button')
    }
    for (let i = 0; i < ex.pairs.length; i++) {
      press(el.querySelector<HTMLElement>(`.match-pool .chip[data-pair="${i}"]`)!)
      const slot = el.querySelectorAll<HTMLElement>('.slot')[i]
      press(slot)
      expect(document.activeElement).toBe(el.querySelectorAll<HTMLElement>('.slot')[i])
    }
    ;(el.querySelector('.ex-actions .btn') as HTMLButtonElement).click()
    expect(getItemStats('test', 'a1')?.lastOutcome).toBe(1)
    el.remove()
  })

  it('Ordonner : un défilement tactile commencé sur une étape ne la déplace pas ; la poignée, si', () => {
    const el = renderExercise(FIXTURES[2], { chapter: 'test' })
    const order = () => [...el.querySelectorAll('.sortable-item .step-body')].map((x) => x.textContent?.trim())
    const touch = (node: Element, type: string, y: number) => {
      const ev = new Event(type, { bubbles: true, cancelable: true })
      Object.defineProperty(ev, 'touches', { value: [{ clientY: y }] })
      Object.defineProperty(ev, 'changedTouches', { value: [{ clientY: y }] })
      node.dispatchEvent(ev)
    }
    const before = order()
    const body = el.querySelectorAll('.sortable-item .step-body')[2]
    touch(body, 'touchstart', 300)
    touch(body, 'touchend', 50)
    expect(order()).toEqual(before)
    const handle = el.querySelectorAll('.sortable-item .drag-handle')[2]
    touch(handle, 'touchstart', 10)
    touch(handle, 'touchend', 8)
    const after = order()
    expect(after).not.toEqual(before)
    expect(after[0]).toBe(before[2])
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
