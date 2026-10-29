import type { Exercise } from '../types'
import { exercisesPart1 } from './exercices-part1'
import { exercisesPart2 } from './exercices-part2'

/** Exercices du chapitre 1 (QCM, vrai-faux, ordonner, trouver l'erreur, étape suivante, associer, numériques, annales). */
export const exercises: Exercise[] = [...exercisesPart1, ...exercisesPart2]
