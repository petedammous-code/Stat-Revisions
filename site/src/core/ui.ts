/** Petits constructeurs d'éléments d'interface (sans framework). */
import { richToHtml, richInline } from './rich'

export function el<K extends keyof HTMLElementTagNameMap>(tag: K, className?: string, html?: string): HTMLElementTagNameMap[K] {
  const e = document.createElement(tag)
  if (className) e.className = className
  if (html !== undefined) e.innerHTML = html
  return e
}

export function rich(text: string, className = 'rich'): HTMLDivElement {
  const d = el('div', className)
  d.innerHTML = richToHtml(text)
  return d
}

export function button(label: string, onClick: () => void, className = 'btn'): HTMLButtonElement {
  const b = el('button', className)
  b.type = 'button'
  b.innerHTML = richInline(label)
  b.addEventListener('click', onClick)
  return b
}

export interface SliderOptions {
  label: string
  min: number
  max: number
  step: number
  value: number
  /** Formatage de la valeur affichée. */
  format?: (v: number) => string
  /** Échelle logarithmique : la valeur réelle est 10^x. */
  log?: boolean
  onChange: (v: number) => void
}

export interface SliderHandle {
  root: HTMLElement
  get: () => number
  set: (v: number) => void
}

/** Curseur avec étiquette LaTeX et valeur courante. */
export function slider(opts: SliderOptions): SliderHandle {
  const root = el('label', 'ctl ctl-slider')
  const lab = el('span', 'ctl-label')
  lab.innerHTML = richInline(opts.label)
  const val = el('span', 'ctl-value')
  const input = el('input')
  input.type = 'range'
  input.min = String(opts.min)
  input.max = String(opts.max)
  input.step = String(opts.step)
  input.value = String(opts.value)
  const real = () => (opts.log ? Math.pow(10, Number(input.value)) : Number(input.value))
  const fmt = opts.format ?? ((v: number) => (Number.isInteger(v) ? String(v) : v.toPrecision(3)))
  const refresh = () => {
    val.textContent = fmt(real())
  }
  input.addEventListener('input', () => {
    refresh()
    opts.onChange(real())
  })
  refresh()
  root.append(lab, input, val)
  return {
    root,
    get: real,
    set: (v: number) => {
      input.value = String(opts.log ? Math.log10(v) : v)
      refresh()
    },
  }
}

export interface SelectOption<T extends string> {
  value: T
  label: string
}

export function select<T extends string>(label: string, options: SelectOption<T>[], value: T, onChange: (v: T) => void): HTMLElement {
  const root = el('label', 'ctl ctl-select')
  const lab = el('span', 'ctl-label')
  lab.innerHTML = richInline(label)
  const sel = el('select')
  for (const o of options) {
    const opt = el('option')
    opt.value = o.value
    opt.textContent = o.label
    if (o.value === value) opt.selected = true
    sel.append(opt)
  }
  sel.addEventListener('change', () => onChange(sel.value as T))
  root.append(lab, sel)
  return root
}

/** Groupe de boutons exclusifs (segmented control). */
export function segmented<T extends string>(options: SelectOption<T>[], value: T, onChange: (v: T) => void): HTMLElement {
  const root = el('div', 'segmented')
  const buttons = new Map<T, HTMLButtonElement>()
  for (const o of options) {
    const b = el('button', 'seg')
    b.type = 'button'
    b.innerHTML = richInline(o.label)
    if (o.value === value) b.classList.add('active')
    b.addEventListener('click', () => {
      for (const x of buttons.values()) x.classList.remove('active')
      b.classList.add('active')
      onChange(o.value)
    })
    buttons.set(o.value, b)
    root.append(b)
  }
  return root
}

export function toggle(label: string, value: boolean, onChange: (v: boolean) => void): HTMLElement {
  const root = el('label', 'ctl ctl-toggle')
  const input = el('input')
  input.type = 'checkbox'
  input.checked = value
  input.addEventListener('change', () => onChange(input.checked))
  const lab = el('span', 'ctl-label')
  lab.innerHTML = richInline(label)
  root.append(input, lab)
  return root
}

/**
 * Panneau de contrôles (ligne de curseurs/boutons) + zone(s) de figure + zone d'info.
 * `opts.plots = 2` crée deux zones côte à côte (`plots[0]`, `plots[1]`) ; `plot` reste la première.
 */
export function vizFrame(container: HTMLElement, opts: { plots?: number } = {}): { controls: HTMLElement; plot: HTMLElement; plots: HTMLElement[]; info: HTMLElement } {
  const controls = el('div', 'viz-controls')
  const n = Math.max(1, opts.plots ?? 1)
  const plots: HTMLElement[] = []
  let plotArea: HTMLElement
  if (n === 1) {
    plotArea = el('div', 'viz-plot')
    plots.push(plotArea)
  } else {
    plotArea = el('div', 'viz-plot-grid')
    plotArea.style.gridTemplateColumns = `repeat(${n}, minmax(0, 1fr))`
    for (let i = 0; i < n; i++) {
      const p = el('div', 'viz-plot viz-plot-sub')
      plots.push(p)
      plotArea.append(p)
    }
  }
  const info = el('div', 'viz-info rich')
  container.append(controls, plotArea, info)
  return { controls, plot: plots[0], plots, info }
}

export function badge(text: string, className = 'badge'): HTMLElement {
  return el('span', className, text)
}

/** Zone de feedback (succès / échec / neutre). */
export function feedback(kind: 'ok' | 'ko' | 'partial' | 'info', text: string): HTMLElement {
  const d = el('div', `feedback feedback-${kind}`)
  d.innerHTML = richToHtml(text)
  return d
}

/** Détails dépliables. */
export function details(summary: string, body: HTMLElement | string, open = false): HTMLDetailsElement {
  const d = el('details', 'fold')
  if (open) d.open = true
  d.addEventListener('toggle', () => {
    if (d.open) requestAnimationFrame(() => window.dispatchEvent(new Event('resize')))
  })
  const s = el('summary')
  s.innerHTML = richInline(summary)
  d.append(s)
  if (typeof body === 'string') d.append(rich(body))
  else d.append(body)
  return d
}

export function clear(e: HTMLElement): void {
  while (e.firstChild) e.removeChild(e.firstChild)
}
