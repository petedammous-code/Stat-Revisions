import type { Viz } from '../../types'
import { vizMedianeMoyenne } from './medianeMoyenne'
import { vizBiaisVariance } from './biaisVariance'
import { vizAdmissibilite } from './admissibilite'
import { vizFisherCourbure } from './fisherCourbure'
import { vizCramerRao } from './cramerRao'
import { vizBorneSansRegularite } from './borneSansRegularite'

export const vizs: Viz[] = [vizMedianeMoyenne, vizBiaisVariance, vizAdmissibilite, vizFisherCourbure, vizCramerRao, vizBorneSansRegularite]
