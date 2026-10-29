import type { Viz } from '../../types'
import { vizSurApprentissage } from './surApprentissage'
import { vizKnnChoixK } from './knnChoixK'
import { vizApproxEstimation } from './approxEstimation'
import { vizBiaisOptimiste } from './biaisOptimiste'
import { vizNoFreeLunch } from './noFreeLunch'
import { vizHoeffding } from './hoeffding'
import { vizFleauDimension } from './fleauDimension'
import { vizPertesConvexes } from './pertesConvexes'

export const vizs: Viz[] = [
  vizSurApprentissage,
  vizApproxEstimation,
  vizKnnChoixK,
  vizBiaisOptimiste,
  vizNoFreeLunch,
  vizHoeffding,
  vizFleauDimension,
  vizPertesConvexes,
]
