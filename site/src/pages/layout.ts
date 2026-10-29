import { el } from '../core/ui'
import { toggleTheme, currentTheme } from '../core/theme'
import type { Route } from '../core/router'

const NAV = [
  { path: '/', label: 'Accueil' },
  { path: '/examen', label: 'Examen blanc' },
  { path: '/revision', label: 'Révision ciblée' },
  { path: '/fiches', label: 'Fiches' },
  { path: '/dashboard', label: 'Tableau de bord' },
]

export function renderTopbar(route: Route): HTMLElement {
  const bar = el('header', 'topbar')
  const brand = el('a', 'brand', 'σ Stat-Révisions')
  brand.href = '#/'
  bar.append(brand)
  const nav = el('nav')
  for (const n of NAV) {
    const a = el('a')
    a.href = `#${n.path}`
    a.textContent = n.label
    const active = n.path === '/' ? route.segments.length === 0 : route.path.startsWith(n.path)
    if (active) a.classList.add('active')
    nav.append(a)
  }
  bar.append(nav)
  const theme = el('button', 'icon-btn')
  theme.type = 'button'
  theme.title = 'Basculer clair / sombre'
  theme.setAttribute('aria-label', 'Basculer le thème')
  const setIcon = () => (theme.textContent = currentTheme() === 'dark' ? '☀️' : '🌙')
  setIcon()
  theme.addEventListener('click', () => {
    toggleTheme()
    setIcon()
  })
  bar.append(theme)
  return bar
}
