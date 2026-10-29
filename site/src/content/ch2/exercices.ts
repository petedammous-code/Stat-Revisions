import type { Exercise } from '../types'
import { exercisesPart1 } from './exercices-part1'
import { exercisesPart2 } from './exercices-part2'

/** Exercices du chapitre 2 (QCM, vrai-faux, ordonner, trouver l'erreur dans part1 ; étape suivante, associer, numériques, annales dans part2). */
export const exercises: Exercise[] = [...exercisesPart1, ...exercisesPart2]
