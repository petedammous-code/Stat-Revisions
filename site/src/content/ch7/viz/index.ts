import type { Viz } from '../../types'
import { vizCriteresEmpiriques } from './criteresEmpiriques'
import { vizZEstimateur } from './zEstimateur'
import { vizEmvNormalite } from './emvNormalite'
import { vizMedianeMoyenne } from './medianeMoyenne'
import { vizEfficaciteRelative } from './efficaciteRelative'
import { vizHorsRegularite } from './horsRegularite'

export const vizs: Viz[] = [vizCriteresEmpiriques, vizZEstimateur, vizEmvNormalite, vizMedianeMoyenne, vizEfficaciteRelative, vizHorsRegularite]
