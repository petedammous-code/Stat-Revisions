import type { Viz } from '../../types'
import { vizLoisUsuelles } from './loisUsuelles'
import { vizModeleFamille } from './modeleFamille'
import { vizMelangeIdentifiabilite } from './melangeIdentifiabilite'
import { vizChangementVariables } from './changementVariables'
import { vizReponsesRandomisees } from './reponsesRandomisees'
import { vizStatistiquesOrdre } from './statistiquesOrdre'
import { vizGosset } from './gosset'

export const vizs: Viz[] = [vizModeleFamille, vizLoisUsuelles, vizMelangeIdentifiabilite, vizChangementVariables, vizReponsesRandomisees, vizStatistiquesOrdre, vizGosset]
