/**
 * Routeur par hash (compatible GitHub Pages, sans configuration serveur).
 * Routes :  #/            accueil
 *           #/ch/ch2      chapitre (onglet par défaut : cours)
 *           #/ch/ch2/viz  onglet d'un chapitre
 *           #/examen      examen blanc
 *           #/revision    révision ciblée
 *           #/fiches      fiches de synthèse
 *           #/dashboard   tableau de bord
 */
export interface Route {
  path: string
  segments: string[]
  params: URLSearchParams
}

export function parseHash(hash: string): Route {
  const raw = hash.replace(/^#/, '') || '/'
  const [pathPart, query = ''] = raw.split('?')
  const segments = pathPart.split('/').filter(Boolean)
  return { path: pathPart, segments, params: new URLSearchParams(query) }
}

export function currentRoute(): Route {
  return parseHash(location.hash)
}

export function navigate(path: string): void {
  location.hash = path.startsWith('#') ? path : `#${path.startsWith('/') ? path : '/' + path}`
}

export function onRouteChange(handler: (r: Route) => void): void {
  window.addEventListener('hashchange', () => handler(currentRoute()))
  handler(currentRoute())
}
