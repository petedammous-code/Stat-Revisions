/**
 * Registre des chapitres. Chaque chapitre est importé ici et uniquement ici.
 * Les agents « chapitre » ajoutent leur import + une ligne dans CHAPTERS.
 */
import type { Chapter } from './types'

const modules = import.meta.glob<{ default: Chapter }>('./ch*/index.ts', { eager: true })

/** Chapitres triés par numéro. */
export const CHAPTERS: Chapter[] = Object.values(modules)
  .map((m) => m.default)
  .sort((a, b) => a.number - b.number)

export function getChapter(slug: string): Chapter | undefined {
  return CHAPTERS.find((c) => c.slug === slug)
}

/** Métadonnées des chapitres non encore construits (affichés en « à venir »). */
export const CHAPTER_TITLES: Record<number, string> = {
  1: 'Modèles statistiques',
  2: 'Estimation ponctuelle',
  3: 'Bases de la théorie de la décision',
  4: 'Régions de confiance et tests',
  5: 'Optimalité en théorie des tests',
  6: 'Statistiques asymptotiques',
  7: 'Théorie asymptotique des M- et Z-estimateurs',
  8: 'Introduction à l’apprentissage statistique',
  9: 'Approche discriminative et minimisation du risque empirique',
}
