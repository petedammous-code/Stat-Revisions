import type { Viz } from '../../types'
import { vizLogVraisemblance } from './logVraisemblance'
import { vizMethodeMoments } from './methodeMoments'
import { vizEmvUniforme } from './emvUniforme'
import { vizLaplaceMediane } from './laplaceMediane'
import { vizKullbackLeibler } from './kullbackLeibler'
import { vizRegressionLineaire } from './regressionLineaire'

export const vizs: Viz[] = [vizLogVraisemblance, vizMethodeMoments, vizEmvUniforme, vizLaplaceMediane, vizKullbackLeibler, vizRegressionLineaire]
