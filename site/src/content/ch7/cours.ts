import type { CourseSection } from '../types'
import { coursePart1 } from './cours-part1'
import { coursePart2 } from './cours-part2'

/** Cours du chapitre 7 : neuf sections dépliables (contenu réparti dans cours-part1.ts et cours-part2.ts). */
export const course: CourseSection[] = [...coursePart1, ...coursePart2]
