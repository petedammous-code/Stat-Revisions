import { CHAPTERS } from '../src/content'
import type { Chapter } from '../src/content/types'

export function chapters(): Chapter[] {
  return CHAPTERS
}

/** Parcourt récursivement un objet et renvoie toutes les chaînes avec leur chemin. */
export function allStrings(obj: unknown, path = ''): { path: string; value: string }[] {
  const out: { path: string; value: string }[] = []
  const seen = new WeakSet<object>()
  const walk = (o: unknown, p: string) => {
    if (typeof o === 'string') out.push({ path: p, value: o })
    else if (Array.isArray(o)) o.forEach((v, i) => walk(v, `${p}[${i}]`))
    else if (o && typeof o === 'object') {
      if (seen.has(o)) return
      seen.add(o)
      for (const [k, v] of Object.entries(o)) {
        if (typeof v === 'function') continue
        walk(v, p ? `${p}.${k}` : k)
      }
    }
  }
  walk(obj, path)
  return out
}
