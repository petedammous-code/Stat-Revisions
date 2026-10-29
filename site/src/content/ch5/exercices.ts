import type { Exercise } from '../types'
import { exercisesPart1 } from './exercices-part1'
import { exercisesPart2 } from './exercices-part2'

/** Exercices du chapitre 5 (répartis dans exercices-part1.ts et exercices-part2.ts). */
export const exercises: Exercise[] = [...exercisesPart1, ...exercisesPart2]
