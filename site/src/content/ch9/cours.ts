import type { CourseSection } from '../types'
import { coursePart1 } from './cours-part1'
import { coursePart2 } from './cours-part2'
import { coursePart3 } from './cours-part3'

/** Cours du chapitre 9 : neuf sections dépliables (réparties dans cours-part1.ts, cours-part2.ts et cours-part3.ts). */
export const course: CourseSection[] = [...coursePart1, ...coursePart2, ...coursePart3]
