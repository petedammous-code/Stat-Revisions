import { getTheme, setTheme } from './store'

export function initTheme(): void {
  const saved = getTheme()
  const prefersDark = typeof matchMedia !== 'undefined' && matchMedia('(prefers-color-scheme: dark)').matches
  apply(saved ?? (prefersDark ? 'dark' : 'light'))
}

export function toggleTheme(): void {
  const current = document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
  const next = current === 'dark' ? 'light' : 'dark'
  apply(next)
  setTheme(next)
}

export function currentTheme(): 'light' | 'dark' {
  return document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light'
}

function apply(t: 'light' | 'dark'): void {
  document.documentElement.dataset.theme = t
  document.dispatchEvent(new CustomEvent('themechange', { detail: t }))
}
