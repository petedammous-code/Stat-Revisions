import type { Viz } from '../../types'
import { vizLgnTcl } from './lgnTcl'
import { vizConvergenceProba } from './convergenceProba'
import { vizSlutsky } from './slutsky'
import { vizVarianceEmpirique } from './varianceEmpirique'
import { vizDeltaMethode } from './deltaMethode'
import { vizIcAsymptotique } from './icAsymptotique'
import { vizWaldWilson } from './waldWilson'

export const vizs: Viz[] = [vizLgnTcl, vizConvergenceProba, vizSlutsky, vizVarianceEmpirique, vizDeltaMethode, vizIcAsymptotique, vizWaldWilson]
