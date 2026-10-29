/**
 * Rendu du texte riche (markdown léger + KaTeX) en HTML.
 * Fonctions pures et explicites, sans dépendance au DOM pour `richToHtml`.
 */
import katex from 'katex'
import 'katex/dist/katex.min.css'
import { findGlossaryEntry } from '../content/glossary'

const KATEX_MACROS: Record<string, string> = {
  '\\R': '\\mathbb{R}',
  '\\N': '\\mathbb{N}',
  '\\E': '\\mathbb{E}',
  '\\P': '\\mathbb{P}',
  '\\Var': '\\operatorname{Var}',
  '\\Cov': '\\operatorname{Cov}',
  '\\ind': '\\mathbf{1}',
  '\\1': '\\mathbf{1}',
  '\\argmax': '\\operatorname{arg\\,max}',
  '\\argmin': '\\operatorname{arg\\,min}',
  '\\Leb': '\\mathrm{Leb}',
  '\\d': '\\mathrm{d}',
  '\\Normal': '\\mathcal{N}',
  '\\Bern': '\\mathrm{Bern}',
  '\\Bin': '\\mathrm{Bin}',
  '\\Pois': '\\mathrm{Pois}',
  '\\Exp': '\\mathrm{Exp}',
  '\\Unif': '\\mathcal{U}',
  '\\xrightarrowP': '\\xrightarrow{\\ \\mathbb{P}\\ }',
  '\\xrightarrowL': '\\xrightarrow{\\ \\mathcal{L}\\ }',
  '\\xrightarrowps': '\\xrightarrow{\\ \\text{p.s.}\\ }',
  '\\Zcal': '\\mathcal{Z}',
  '\\Zs': '\\mathsf{Z}',
  '\\Fcal': '\\mathcal{F}',
  '\\Acal': '\\mathcal{A}',
  '\\Lcal': '\\mathcal{L}',
  '\\sgn': '\\operatorname{sgn}',
  '\\tr': '\\operatorname{tr}',
  '\\diag': '\\operatorname{diag}',
  '\\rank': '\\operatorname{rank}',
  '\\supp': '\\operatorname{supp}',
  '\\eps': '\\varepsilon',
  '\\iid': '\\text{i.i.d.}',
}

export interface MathChunk {
  tex: string
  display: boolean
}

/**
 * Extrait toutes les formules d'un texte riche ($…$ et $$…$$), dans l'ordre.
 * Utilisé par les tests pour vérifier que tout le KaTeX compile.
 */
export function extractMath(text: string): MathChunk[] {
  const chunks: MathChunk[] = []
  let i = 0
  while (i < text.length) {
    if (text.startsWith('$$', i)) {
      const end = text.indexOf('$$', i + 2)
      if (end === -1) break
      chunks.push({ tex: text.slice(i + 2, end), display: true })
      i = end + 2
    } else if (text[i] === '$' && text[i - 1] !== '\\') {
      const end = findInlineEnd(text, i + 1)
      if (end === -1) break
      chunks.push({ tex: text.slice(i + 1, end), display: false })
      i = end + 1
    } else {
      i++
    }
  }
  return chunks
}

function findInlineEnd(text: string, from: number): number {
  let j = from
  while (j < text.length) {
    if (text[j] === '$' && text[j - 1] !== '\\') return j
    j++
  }
  return -1
}

/** Rend une formule en HTML (lève si `throwOnError`). */
export function texToHtml(tex: string, display: boolean, throwOnError = false): string {
  return katex.renderToString(tex, {
    displayMode: display,
    throwOnError,
    macros: KATEX_MACROS,
    strict: 'ignore',
    trust: false,
    output: 'htmlAndMathml',
  })
}

/** Vérifie qu'une formule compile ; renvoie le message d'erreur ou null. */
export function checkTex(tex: string, display: boolean): string | null {
  try {
    katex.renderToString(tex, { displayMode: display, throwOnError: true, macros: { ...KATEX_MACROS }, strict: 'error' })
    return null
  } catch (e) {
    return e instanceof Error ? e.message : String(e)
  }
}

function escapeHtml(s: string): string {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;')
}

/** Rend une formule inline, avec infobulle de glossaire si le symbole est connu. */
function renderInline(tex: string): string {
  const html = texToHtml(tex, false)
  const entry = findGlossaryEntry(tex)
  if (!entry) return html
  return `<span class="gloss" data-gloss="${escapeHtml(entry.key)}" tabindex="0">${html}</span>`
}

/** Remplace les maths par des jetons, applique le markdown léger, puis réinjecte. */
export function richToHtml(text: string): string {
  if (!text) return ''
  const maths: string[] = []
  // 1. maths display
  let work = text.replace(/\$\$([\s\S]*?)\$\$/g, (_m, tex: string) => {
    maths.push(`<div class="math-display">${texToHtml(tex.trim(), true)}</div>`)
    return `\u0000${maths.length - 1}\u0000`
  })
  // 2. maths inline
  work = work.replace(/(^|[^\\])\$([^$\n]+?)\$/g, (_m, pre: string, tex: string) => {
    maths.push(renderInline(tex.trim()))
    return `${pre}\u0000${maths.length - 1}\u0000`
  })
  // 3. markdown léger sur le texte (échappé)
  let html = lightMarkdown(work)
  // 4. réinjection
  html = html.replace(/\u0000(\d+)\u0000/g, (_m, idx: string) => maths[Number(idx)])
  return html
}

function lightMarkdown(src: string): string {
  const lines = src.split('\n')
  const out: string[] = []
  let para: string[] = []
  let list: string[] | null = null
  let listOrdered = false

  const flushPara = () => {
    if (para.length) {
      out.push(`<p>${inline(para.join(' '))}</p>`)
      para = []
    }
  }
  const flushList = () => {
    if (list) {
      out.push(`<${listOrdered ? 'ol' : 'ul'}>${list.map((l) => `<li>${inline(l)}</li>`).join('')}</${listOrdered ? 'ol' : 'ul'}>`)
      list = null
    }
  }

  for (const raw of lines) {
    const line = raw.trimEnd()
    const trimmed = line.trim()
    if (trimmed === '') {
      flushPara()
      flushList()
      continue
    }
    const display = /^\u0000\d+\u0000$/.test(trimmed)
    if (display) {
      flushPara()
      flushList()
      out.push(trimmed)
      continue
    }
    const h = /^(#{1,6})\s+(.*)$/.exec(trimmed)
    if (h) {
      flushPara()
      flushList()
      const level = Math.min(6, h[1].length + 2)
      out.push(`<h${level} class="rich-h">${inline(h[2])}</h${level}>`)
      continue
    }
    const ul = /^[-•]\s+(.*)$/.exec(trimmed)
    const ol = /^(\d+)[.)]\s+(.*)$/.exec(trimmed)
    if (ul || ol) {
      flushPara()
      const ordered = !!ol
      if (list && listOrdered !== ordered) flushList()
      if (!list) {
        list = []
        listOrdered = ordered
      }
      list.push(ul ? ul[1] : ol![2])
      continue
    }
    if (trimmed.startsWith('>')) {
      flushPara()
      flushList()
      out.push(`<blockquote>${inline(trimmed.replace(/^>\s?/, ''))}</blockquote>`)
      continue
    }
    if (list && /^\s{2,}/.test(raw)) {
      list[list.length - 1] += ' ' + trimmed
      continue
    }
    flushList()
    para.push(trimmed)
  }
  flushPara()
  flushList()
  return out.join('\n')
}

function inline(s: string): string {
  let t = escapeHtml(s)
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
  t = t.replace(/(^|[^*\w])\*([^*\n]+?)\*(?!\w)/g, '$1<em>$2</em>')
  t = t.replace(/`([^`]+)`/g, '<code>$1</code>')
  t = t.replace(/\[\[([^\]|]+)\|([^\]]+)\]\]/g, '<a href="#/$2">$1</a>')
  return t
}

/** Rend un texte riche dans un élément. */
export function renderRich(el: HTMLElement, text: string): void {
  el.innerHTML = richToHtml(text)
}

/** Crée un élément contenant du texte riche. */
export function richEl(text: string, tag = 'div', className = 'rich'): HTMLElement {
  const el = document.createElement(tag)
  el.className = className
  el.innerHTML = richToHtml(text)
  return el
}
