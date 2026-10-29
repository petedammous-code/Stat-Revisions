import type { Viz } from '../../types'
import { vizCouvertureIc } from './couvertureIc'
import { vizLongueurMinimale } from './longueurMinimale'
import { vizTchebychevHoeffding } from './tchebychevHoeffding'
import { vizPuissance } from './puissance'
import { vizDualite } from './dualite'
import { vizPvaleurAire } from './pvaleurAire'
import { vizLoiPvaleur } from './loiPvaleur'

export const vizs: Viz[] = [vizCouvertureIc, vizLongueurMinimale, vizTchebychevHoeffding, vizPuissance, vizDualite, vizPvaleurAire, vizLoiPvaleur]
