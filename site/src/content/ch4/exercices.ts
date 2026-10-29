import type { Exercise } from '../types'
import { exercisesPart1 } from './exercices-part1'
import { exercisesPart2 } from './exercices-part2'
import { exercisesPart3 } from './exercices-part3'

/** Exercices du chapitre 4 (répartis dans exercices-part1.ts, exercices-part2.ts et exercices-part3.ts). */
export const exercises: Exercise[] = [...exercisesPart1, ...exercisesPart2, ...exercisesPart3]
