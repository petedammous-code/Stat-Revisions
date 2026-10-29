import type { Viz } from '../../types'
import { vizNeymanPearson } from './neymanPearson'
import { vizPuissanceUpp } from './puissanceUpp'
import { vizRvm } from './rvm'
import { vizBilateral } from './bilateral'
import { vizRandomise } from './randomise'
import { vizTailleEffet } from './tailleEffet'
import { vizUniforme } from './uniforme'

export const vizs: Viz[] = [vizNeymanPearson, vizPuissanceUpp, vizRvm, vizBilateral, vizRandomise, vizTailleEffet, vizUniforme]
