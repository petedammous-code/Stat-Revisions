import type { Numerique } from '../content/types'
import { el, rich, button, feedback } from '../core/ui'
import { exerciseHeader, finish, explanationsBox, type ExerciseContext } from './common'

/** Nombre décimal en notation française ou anglaise : « 0,62 », « 0.62 », « -1,5e-3 », « ,5 ». */
const NUMBER_RE = /^[-+]?(\d+([.,]\d*)?|[.,]\d+)([eE][-+]?\d+)?$/

/**
 * Lit la saisie de l'élève (virgule ou point décimal, espaces ignorés).
 * Renvoie `null` si ce n'est pas un nombre.
 */
export function parseDecimal(raw: string): number | null {
  const t = raw.replace(/\s/g, '')
  if (!NUMBER_RE.test(t)) return null
  const v = Number(t.replace(',', '.'))
  return Number.isFinite(v) ? v : null
}

/**
 * Formate une valeur avec un nombre de décimales adapté à la tolérance (une de plus que
 * l'ordre de grandeur de la tolérance), virgule décimale, zéros inutiles retirés.
 * Ex. 1/12 avec tolérance 0,002 → « 0,0833 ».
 */
export function formatWithTolerance(x: number, tolerance: number): string {
  const dec = Math.min(12, Math.max(0, Math.ceil(-Math.log10(tolerance)) + 1))
  return String(Number(x.toFixed(dec))).replace('.', ',')
}

/** Application numérique : seule saisie clavier autorisée (un nombre), avec tolérance. */
export function renderNumerique(ex: Numerique, ctx: ExerciseContext): HTMLElement {
  const root = el('article', 'exercise exercise-num')
  root.append(exerciseHeader(ex, ctx))
  root.append(rich(ex.question, 'rich ex-question'))
  if (ex.hint) root.append(rich(ex.hint, 'rich muted'))
  const row = el('div', 'num-row')
  const input = el('input', 'num-input')
  // type="text" (et non "number") : un champ number en locale fr ignore ou supprime la
  // virgule (« 0,62 » devenait « 062 »). On garde le pavé décimal sur mobile.
  input.type = 'text'
  input.inputMode = 'decimal'
  input.autocomplete = 'off'
  input.spellcheck = false
  input.placeholder = 'ex. 0,62'
  input.setAttribute('aria-label', 'Réponse numérique')
  const validate = button('Valider', () => {
    if (root.dataset.done) return
    const v = parseDecimal(input.value)
    if (v === null) {
      input.classList.add('shake')
      setTimeout(() => input.classList.remove('shake'), 400)
      return
    }
    root.dataset.done = '1'
    input.disabled = true
    const ok = Math.abs(v - ex.answer) <= ex.tolerance
    const fb = explanationsBox(ctx)
    const fmt = (x: number) => formatWithTolerance(x, ex.tolerance)
    const tol = String(ex.tolerance).replace('.', ',')
    fb.append(feedback(ok ? 'ok' : 'ko', ok ? `**Correct** : ${fmt(ex.answer)} (tolérance ±${tol}).` : `**Incorrect.** Valeur attendue : **${fmt(ex.answer)}** (tolérance ±${tol}).`))
    fb.append(rich(ex.explanation))
    root.append(fb)
    validate.remove()
    finish(ex, ctx, ok ? 1 : 0)
  })
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') validate.click()
  })
  row.append(input, validate)
  root.append(row)
  return root
}
