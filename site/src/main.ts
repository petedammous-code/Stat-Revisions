import './styles.css'
import { el, rich } from './core/ui'
import { initTheme } from './core/theme'
import { initTooltips } from './core/tooltip'
import { onRouteChange, type Route } from './core/router'
import { renderTopbar } from './pages/layout'
import { renderHome } from './pages/home'
import { renderChapterPage } from './pages/chapter'
import { renderExam } from './pages/examen'
import { renderRevision } from './pages/revision'
import { renderSheetsPage } from './pages/fiches'
import { renderDashboard } from './pages/dashboard'
import { getChapter } from './content'
import { unmountAll } from './components/viz'

const app = document.getElementById('app')!
initTheme()
initTooltips()

function render(route: Route): void {
  unmountAll(app)
  app.innerHTML = ''
  app.append(renderTopbar(route))
  const [first, second] = route.segments
  let page: HTMLElement
  try {
    if (!first) page = renderHome()
    else if (first === 'ch' && second) {
      const ch = getChapter(second)
      page = ch ? renderChapterPage(ch, route) : notFound(`Chapitre « ${second} » introuvable.`)
    } else if (first === 'examen') page = renderExam()
    else if (first === 'revision') page = renderRevision()
    else if (first === 'fiches') page = renderSheetsPage()
    else if (first === 'dashboard') page = renderDashboard()
    else page = notFound('Page introuvable.')
  } catch (e) {
    page = notFound(`Erreur de rendu : ${e instanceof Error ? e.message : String(e)}`)
  }
  app.append(page)
  if (!route.params.get('s')) window.scrollTo({ top: 0 })
}

function notFound(msg: string): HTMLElement {
  const p = el('main', 'page')
  p.append(rich(`**${msg}** [[Retour à l’accueil|/]]`, 'rich card'))
  return p
}

onRouteChange(render)
