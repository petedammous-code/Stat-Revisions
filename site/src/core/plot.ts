/**
 * Enveloppe Plotly : thème clair/sombre, redimensionnement, API minimale.
 * Toutes les visualisations passent par ici pour rester cohérentes.
 */
import Plotly from 'plotly.js-dist-min'
import { currentTheme } from './theme'

export type Trace = Record<string, unknown>
export type Layout = Record<string, unknown>

export const COLORS = {
  blue: '#2563eb',
  orange: '#ea580c',
  green: '#16a34a',
  red: '#dc2626',
  purple: '#7c3aed',
  teal: '#0d9488',
  gray: '#6b7280',
  yellow: '#ca8a04',
  pink: '#db2777',
}

export const PALETTE = [COLORS.blue, COLORS.orange, COLORS.green, COLORS.red, COLORS.purple, COLORS.teal, COLORS.pink, COLORS.yellow]

function themeLayout(): Layout {
  const dark = currentTheme() === 'dark'
  const fg = dark ? '#e5e7eb' : '#1f2937'
  const grid = dark ? '#374151' : '#e5e7eb'
  return {
    paper_bgcolor: 'rgba(0,0,0,0)',
    plot_bgcolor: 'rgba(0,0,0,0)',
    font: { color: fg, family: 'system-ui, -apple-system, Segoe UI, Roboto, sans-serif', size: 13 },
    xaxis: { gridcolor: grid, zerolinecolor: grid, automargin: true },
    yaxis: { gridcolor: grid, zerolinecolor: grid, automargin: true },
    margin: { l: 50, r: 20, t: 40, b: 50 },
    legend: { orientation: 'h', y: -0.28, yanchor: 'top' },
    autosize: true,
  }
}

/** Plotly 4 n'affiche plus `title: 'texte'` : on convertit en `{ text }` (figure et axes). */
function normalizeTitles(layout: Layout): Layout {
  const out: Layout = { ...layout }
  if (typeof out.title === 'string') out.title = { text: out.title }
  for (const [k, v] of Object.entries(out)) {
    if (/^[xyz]axis\d*$/.test(k) && v && typeof v === 'object' && typeof (v as Layout).title === 'string') {
      out[k] = { ...(v as Layout), title: { text: (v as Layout).title } }
    }
  }
  return out
}

function merge(base: Layout, extra: Layout): Layout {
  const out: Layout = { ...base }
  for (const [k, v] of Object.entries(extra)) {
    const b = out[k]
    if (b && typeof b === 'object' && !Array.isArray(b) && v && typeof v === 'object' && !Array.isArray(v)) {
      out[k] = { ...(b as Layout), ...(v as Layout) }
    } else out[k] = v
  }
  return out
}

const CONFIG = { responsive: true, displaylogo: false, displayModeBar: false, locale: 'fr' }

export interface PlotHandle {
  update: (traces: Trace[], layout?: Layout) => void
  destroy: () => void
}

/** Crée un graphe et renvoie une poignée pour le mettre à jour (react) ou le détruire. */
export function plot(container: HTMLElement, traces: Trace[], layout: Layout = {}): PlotHandle {
  let lastTraces = traces
  let lastLayout = layout
  const render = () => {
    void Plotly.react(container, lastTraces as any, merge(themeLayout(), normalizeTitles(lastLayout)) as any, CONFIG as any)
  }
  render()
  const onTheme = () => render()
  document.addEventListener('themechange', onTheme)
  return {
    update: (t, l) => {
      lastTraces = t
      if (l) lastLayout = l
      render()
    },
    destroy: () => {
      document.removeEventListener('themechange', onTheme)
      try {
        Plotly.purge(container)
      } catch {
        /* conteneur déjà retiré */
      }
    },
  }
}

/** Trace d'une courbe. */
export function lineTrace(x: number[], y: number[], name: string, color?: string, extra: Trace = {}): Trace {
  return { x, y, name, type: 'scatter', mode: 'lines', line: { color, width: 2.5 }, ...extra }
}

/** Trace d'un histogramme déjà calculé (barres). */
export function barTrace(x: number[], y: number[], name: string, color?: string, extra: Trace = {}): Trace {
  return { x, y, name, type: 'bar', marker: { color, opacity: 0.6 }, ...extra }
}

/** Aire sous une courbe entre deux bornes (pour p-valeur, puissance…). */
export function areaTrace(x: number[], y: number[], name: string, color: string, extra: Trace = {}): Trace {
  return { x, y, name, type: 'scatter', mode: 'lines', fill: 'tozeroy', line: { color, width: 0 }, fillcolor: hexToRgba(color, 0.35), ...extra }
}

export function pointsTrace(x: number[], y: number[], name: string, color?: string, extra: Trace = {}): Trace {
  return { x, y, name, type: 'scatter', mode: 'markers', marker: { color, size: 7 }, ...extra }
}

/**
 * Segments (ex. 100 intervalles de confiance) : un segment par i, de (xs[i], y0s[i]) à (xs[i], y1s[i]),
 * ou horizontal si `horizontal` (de (y0s[i], xs[i]) à (y1s[i], xs[i])). Couleur par segment possible.
 */
export function segmentsTrace(xs: number[], y0s: number[], y1s: number[], name: string, color: string | string[], horizontal = false, extra: Trace = {}): Trace {
  const x: (number | null)[] = []
  const y: (number | null)[] = []
  for (let i = 0; i < xs.length; i++) {
    if (horizontal) x.push(y0s[i], y1s[i], null), y.push(xs[i], xs[i], null)
    else x.push(xs[i], xs[i], null), y.push(y0s[i], y1s[i], null)
  }
  if (Array.isArray(color)) {
    // Plotly ne colore pas une ligne par point : on émet une trace par couleur distincte.
    return { x, y, name, type: 'scatter', mode: 'lines', line: { color: color[0], width: 2 }, connectgaps: false, ...extra }
  }
  return { x, y, name, type: 'scatter', mode: 'lines', line: { color, width: 2 }, connectgaps: false, ...extra }
}

/** Regroupe des segments par couleur (ex. IC qui contiennent θ en vert, les autres en rouge). */
export function segmentsByColor(xs: number[], y0s: number[], y1s: number[], colors: string[], names: Record<string, string>, horizontal = false): Trace[] {
  const groups = new Map<string, number[]>()
  colors.forEach((c, i) => {
    if (!groups.has(c)) groups.set(c, [])
    groups.get(c)!.push(i)
  })
  return [...groups.entries()].map(([c, idx]) =>
    segmentsTrace(idx.map((i) => xs[i]), idx.map((i) => y0s[i]), idx.map((i) => y1s[i]), names[c] ?? c, c, horizontal),
  )
}

/** Courbe de niveau `z = level` d'une grille (frontière de décision 2D). z[j][i] correspond à (xs[i], ys[j]). */
export function contourLevelTrace(xs: number[], ys: number[], z: number[][], level: number, name: string, color: string, dash: 'solid' | 'dash' | 'dot' = 'solid'): Trace {
  return {
    x: xs, y: ys, z, name, type: 'contour', showscale: false, hoverinfo: 'skip', showlegend: true,
    contours: { start: level, end: level, size: 1, coloring: 'lines' },
    line: { color, width: 2.5, dash },
    colorscale: [[0, color], [1, color]],
  }
}

/** Carte de couleurs d'une grille (zones de décision). */
export function heatmapTrace(xs: number[], ys: number[], z: number[][], colorscale: [number, string][], extra: Trace = {}): Trace {
  return { x: xs, y: ys, z, type: 'heatmap', colorscale, showscale: false, hoverinfo: 'skip', opacity: 0.35, ...extra }
}

/** Boîte à moustaches d'un échantillon. */
export function boxTrace(values: number[], name: string, color?: string, extra: Trace = {}): Trace {
  return { y: values, name, type: 'box', boxpoints: 'outliers', marker: { color, size: 4 }, line: { color }, ...extra }
}

/** « Tapis » d'observations : petits traits verticaux à hauteur `y`. */
export function rugTrace(xs: number[], y: number, name: string, color?: string, extra: Trace = {}): Trace {
  return { x: xs, y: xs.map(() => y), name, type: 'scatter', mode: 'markers', marker: { color, symbol: 'line-ns-open', size: 10, line: { width: 1.5, color } }, hoverinfo: 'x', ...extra }
}

/** Ligne verticale (forme de layout). */
export function vline(x: number, color: string, dash: 'solid' | 'dash' | 'dot' = 'dash'): Record<string, unknown> {
  return { type: 'line', x0: x, x1: x, y0: 0, y1: 1, yref: 'paper', line: { color, width: 2, dash } }
}

export function hline(y: number, color: string, dash: 'solid' | 'dash' | 'dot' = 'dash'): Record<string, unknown> {
  return { type: 'line', x0: 0, x1: 1, xref: 'paper', y0: y, y1: y, line: { color, width: 2, dash } }
}

export function hexToRgba(hex: string, alpha: number): string {
  const h = hex.replace('#', '')
  const r = parseInt(h.slice(0, 2), 16)
  const g = parseInt(h.slice(2, 4), 16)
  const b = parseInt(h.slice(4, 6), 16)
  return `rgba(${r},${g},${b},${alpha})`
}
