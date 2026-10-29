/**
 * Schéma des fichiers de contenu.
 *
 * Chaque chapitre est un objet `Chapter` construit dans `src/content/chN/index.ts`.
 * Le contenu est séparé du code : les agents « chapitre » n'écrivent QUE des
 * données conformes à ces types ; le socle se charge du rendu et de l'interaction.
 *
 * Conventions de texte (champ `Rich`) :
 *  - maths inline  : $…$          maths display : $$…$$   (KaTeX)
 *  - **gras**, *italique*, listes « - », titres « ### »
 *  - paragraphes séparés par une ligne vide
 *  - un symbole dont le LaTeX correspond exactement à une entrée du glossaire
 *    reçoit automatiquement une infobulle (voir glossary.ts).
 */

/** Texte riche (markdown léger + LaTeX). */
export type Rich = string

/** Référence précise au poly / PC / annale. Ex. « Poly ch.2, Déf. 2.3 ». */
export type Source = string

/** Niveau d'un élément : programme ou complément hors programme. */
export type Scope = 'programme' | 'hors-programme'

export type Difficulty = 1 | 2 | 3

// ---------------------------------------------------------------------------
// A. Cours interactif
// ---------------------------------------------------------------------------

export type TheoremKind =
  | 'definition'
  | 'theoreme'
  | 'proposition'
  | 'lemme'
  | 'corollaire'
  | 'remarque'
  | 'exemple'
  | 'methode'

export interface ProofStep {
  /** Contenu de l'étape (LaTeX). */
  text: Rich
  /** Justification courte : « par indépendance », « par Fubini »… */
  justification: Rich
}

export interface TheoremBlock {
  kind: 'theorem'
  id: string
  type: TheoremKind
  /** Ex. « Définition 2.3 ». */
  label: string
  title: string
  source: Source
  scope?: Scope
  /** Hypothèses exactes, une par entrée. */
  hypotheses?: Rich[]
  statement: Rich
  /** Intuition en 1–3 phrases. */
  intuition?: Rich
  /** Preuve pas à pas (révélée au clic). */
  proof?: ProofStep[]
  /** Pièges associés. */
  pitfalls?: Rich[]
}

export interface TextBlock {
  kind: 'text'
  id: string
  /** Titre optionnel de l'encart. */
  title?: string
  text: Rich
  scope?: Scope
}

/** Exemple traité (révélé progressivement). */
export interface ExampleBlock {
  kind: 'example'
  id: string
  title: string
  source: Source
  setup: Rich
  steps: ProofStep[]
  conclusion?: Rich
  scope?: Scope
}

/** Lien vers une visualisation du chapitre, insérée dans le cours. */
export interface VizRefBlock {
  kind: 'viz'
  id: string
  /** id d'une `Viz` déclarée dans le chapitre. */
  vizId: string
  caption?: Rich
}

export type CourseBlock = TheoremBlock | TextBlock | ExampleBlock | VizRefBlock

export interface CourseSection {
  id: string
  title: string
  /** 'intuition' | 'definitions' | 'preuves' | 'exemples' | 'methodes' | 'liens-examen' | libre */
  role?: string
  intro?: Rich
  blocks: CourseBlock[]
  scope?: Scope
}

// ---------------------------------------------------------------------------
// B. Visualisations
// ---------------------------------------------------------------------------

export interface Viz {
  id: string
  title: string
  /** Ce que la figure montre et comment la manipuler. */
  description: Rich
  /** Référence au poly. */
  source?: Source
  /** Monte la visualisation dans `container`. Retourne une fonction de nettoyage. */
  mount: (container: HTMLElement) => void | (() => void)
}

// ---------------------------------------------------------------------------
// C. Entraînement — zéro saisie de formule
// ---------------------------------------------------------------------------

interface ExerciseBase {
  id: string
  /** Titre court. */
  title: string
  source: Source
  /** 'annale' | 'pc' | 'variante' | 'poly' */
  origin: 'annale' | 'pc' | 'variante' | 'poly'
  difficulty: Difficulty
  /** Notions évaluées (clés libres, servent au tableau de bord / révision ciblée). */
  tags: string[]
}

export interface QcmOption {
  text: Rich
  correct: boolean
  /** Explication : pourquoi c'est juste / faux, quelle erreur classique. Obligatoire. */
  explanation: Rich
}

export interface Qcm extends ExerciseBase {
  type: 'qcm'
  question: Rich
  /** Exactement UNE option correcte. */
  options: QcmOption[]
}

export interface VraiFaux extends ExerciseBase {
  type: 'vrai-faux'
  statement: Rich
  answer: boolean
  /** 3–4 justifications, exactement une correcte. */
  justifications: { text: Rich; correct: boolean; explanation?: Rich }[]
}

export interface Ordonner extends ExerciseBase {
  type: 'ordonner'
  /** Consigne. */
  prompt: Rich
  /** Étapes DANS LE BON ORDRE (le composant les mélange). */
  steps: Rich[]
  /** Explication affichée après validation. */
  explanation?: Rich
}

export interface TrouverErreur extends ExerciseBase {
  type: 'trouver-erreur'
  prompt: Rich
  /** Lignes du raisonnement. */
  lines: Rich[]
  /** Index (0-based) de la ligne fautive. */
  faultyIndex: number
  /** Pourquoi c'est faux et la version correcte. */
  explanation: Rich
}

export interface GuidedStep {
  /** Question de l'étape : « quelle est l'expression suivante ? » */
  prompt: Rich
  /** Choix (LaTeX déjà écrit). Exactement un correct. */
  choices: { text: Rich; correct: boolean; explanation?: Rich }[]
}

export interface EtapeSuivante extends ExerciseBase {
  type: 'etape-suivante'
  /** Contexte / énoncé. */
  setup: Rich
  steps: GuidedStep[]
  conclusion?: Rich
}

export interface Associer extends ExerciseBase {
  type: 'associer'
  prompt: Rich
  /** Paires (gauche ↔ droite). Le composant mélange la colonne de droite. */
  pairs: { left: Rich; right: Rich; explanation?: Rich }[]
}

export interface Numerique extends ExerciseBase {
  type: 'numerique'
  question: Rich
  answer: number
  /** Tolérance absolue. */
  tolerance: number
  /** Unité ou format attendu, ex. « (arrondir à 0.01) ». */
  hint?: Rich
  explanation: Rich
}

export interface Annale extends ExerciseBase {
  type: 'annale'
  /** Énoncé complet (plusieurs questions numérotées). */
  statement: Rich
  /** Indices progressifs (1, 2, 3). */
  hints: Rich[]
  /** Correction rédigée comme attendu à l'examen. */
  correction: Rich
  /** Barème estimé (points par question). */
  bareme: { label: string; points: number }[]
  /** Durée conseillée en minutes. */
  durationMin?: number
}

export type Exercise =
  | Qcm
  | VraiFaux
  | Ordonner
  | TrouverErreur
  | EtapeSuivante
  | Associer
  | Numerique
  | Annale

export type ExerciseType = Exercise['type']

export const EXERCISE_TYPES: ExerciseType[] = [
  'qcm',
  'vrai-faux',
  'ordonner',
  'trouver-erreur',
  'etape-suivante',
  'associer',
  'numerique',
  'annale',
]

export const EXERCISE_TYPE_LABELS: Record<ExerciseType, string> = {
  qcm: 'QCM',
  'vrai-faux': 'Vrai / Faux justifié',
  ordonner: 'Remettre une preuve dans l’ordre',
  'trouver-erreur': 'Trouver l’erreur',
  'etape-suivante': 'Choisir l’étape suivante',
  associer: 'Associer',
  numerique: 'Application numérique',
  annale: 'Exercice type annale',
}

// ---------------------------------------------------------------------------
// D. Flashcards
// ---------------------------------------------------------------------------

export interface Flashcard {
  id: string
  /** 'definition' | 'theoreme' | 'hypothese-manquante' | 'methode' */
  kind: 'definition' | 'theoreme' | 'hypothese-manquante' | 'methode'
  front: Rich
  back: Rich
  source: Source
  tags: string[]
  /**
   * Pour les cartes « quelle hypothèse manque ? » : choix cliquables
   * (exactement un correct). Pour les autres, auto-évaluation par clic.
   */
  choices?: { text: Rich; correct: boolean }[]
}

// ---------------------------------------------------------------------------
// E. Fiche de synthèse
// ---------------------------------------------------------------------------

export interface SummarySheet {
  definitions: { label: string; text: Rich; source: Source }[]
  theorems: { label: string; hypotheses: Rich[]; text: Rich; source: Source }[]
  methods: { title: string; steps: Rich[] }[]
  pitfalls: Rich[]
}

// ---------------------------------------------------------------------------
// F. Tests Monte-Carlo déclarés par un chapitre
// ---------------------------------------------------------------------------

export interface MonteCarloCheck {
  name: string
  /** Résultat théorique du poly que la simulation doit retrouver. */
  claim: string
  /** Lance la simulation (déterministe via `rng`) et renvoie valeur observée, valeur attendue, tolérance absolue. */
  run: (rng: () => number) => { observed: number; expected: number; tolerance: number }
}

// ---------------------------------------------------------------------------
// G. Chapitre
// ---------------------------------------------------------------------------

export interface Chapter {
  /** Numéro du chapitre (1–9). */
  number: number
  /** Identifiant d'URL, ex. « ch1 ». */
  slug: string
  title: string
  /** Résumé en quelques phrases. */
  summary: Rich
  /** Rentabilité pour l'examen (1 = faible, 5 = très élevée). */
  examWeight: 1 | 2 | 3 | 4 | 5
  /** Prérequis (slugs de chapitres). */
  prerequisites: string[]
  /** PC associées, ex. ['PC2']. */
  pcs: string[]
  course: CourseSection[]
  vizs: Viz[]
  exercises: Exercise[]
  flashcards: Flashcard[]
  summarySheet: SummarySheet
  monteCarlo: MonteCarloCheck[]
}

/** Entrée de glossaire : symbole → définition (infobulle). */
export interface GlossaryEntry {
  key: string
  /** Variantes LaTeX reconnues telles quelles (sans $). */
  tex: string[]
  /** Nom court. */
  name: string
  /** Définition courte (Rich). */
  definition: Rich
  source: Source
}
