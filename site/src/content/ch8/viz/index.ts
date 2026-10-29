import type { Viz } from '../../types'
import { vizBayes1d } from './bayes1d'
import { vizExcesPlugin } from './excesPlugin'
import { vizKnn } from './knn'
import { vizLdaQda } from './ldaQda'
import { vizRisqueN } from './risqueN'
import { vizPythagore } from './pythagore'

export const vizs: Viz[] = [vizBayes1d, vizExcesPlugin, vizPythagore, vizLdaQda, vizKnn, vizRisqueN]
