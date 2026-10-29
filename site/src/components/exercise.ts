import type { Exercise } from '../content/types'
import { renderQcm } from './qcm'
import { renderVraiFaux } from './vraiFaux'
import { renderOrdonner } from './ordonner'
import { renderTrouverErreur } from './trouverErreur'
import { renderEtapeSuivante } from './etapeSuivante'
import { renderAssocier } from './associer'
import { renderNumerique } from './numerique'
import { renderAnnale } from './annale'
import type { ExerciseContext } from './common'

/** Aiguille vers le composant selon le type d'exercice. */
export function renderExercise(ex: Exercise, ctx: ExerciseContext): HTMLElement {
  switch (ex.type) {
    case 'qcm':
      return renderQcm(ex, ctx)
    case 'vrai-faux':
      return renderVraiFaux(ex, ctx)
    case 'ordonner':
      return renderOrdonner(ex, ctx)
    case 'trouver-erreur':
      return renderTrouverErreur(ex, ctx)
    case 'etape-suivante':
      return renderEtapeSuivante(ex, ctx)
    case 'associer':
      return renderAssocier(ex, ctx)
    case 'numerique':
      return renderNumerique(ex, ctx)
    case 'annale':
      return renderAnnale(ex, ctx)
  }
}
