import type { Chapter } from '../types'
import { registerGlossary } from '../glossary'
import { course } from './cours'
import { exercises } from './exercices'
import { flashcards } from './flashcards'
import { summarySheet } from './fiche'
import { monteCarlo } from './montecarlo'
import { vizs } from './viz'

registerGlossary([
  {
    key: 'regionConfianceC',
    tex: ['\\mathcal{C}(Z)', '\\mathcal{C}(z)'],
    name: 'Région de confiance',
    definition: 'Statistique à valeurs ensemblistes $\\mathcal{C}:\\mathsf{Z}\\to\\mathcal{B}(\\mathbb{R}^p)$ telle que $\\inf_{\\theta}\\mathbb{P}_\\theta(g(\\theta)\\in\\mathcal{C}(Z))\\ge1-\\alpha$. L’aléa porte sur la région, pas sur $\\theta$.',
    source: 'Poly ch.4, Déf. 1.1',
  },
  {
    key: 'pivotG',
    tex: ['G(Z,\\theta)', 'G(z,\\theta)', 'G(Z;\\theta)', 'G(Z;\\mu)', 'G(Z;\\sigma^2)'],
    name: 'Fonction pivotale',
    definition: 'Fonction des observations **et** du paramètre dont la loi sous $\\mathbb{P}_\\theta$ ne dépend pas de $\\theta$ (loi commune notée $\\mathbb Q$). Ce n’est pas une statistique.',
    source: 'Poly ch.4, Déf. 1.2',
  },
  {
    key: 'loiPivotQ',
    tex: ['\\mathbb Q', '\\mathbb Q(A_\\alpha)'],
    name: 'Loi du pivot',
    definition: 'Loi commune de $G(Z,\\theta)$ sous $\\mathbb{P}_\\theta$ (indépendante de $\\theta$) ; $q_\\beta$ désigne son quantile d’ordre $\\beta$.',
    source: 'Poly ch.4, Déf. 1.2',
  },
  {
    key: 'Aalpha',
    tex: ['A_\\alpha'],
    name: 'Ensemble de probabilité 1 − α',
    definition: 'Borélien tel que $\\mathbb Q(A_\\alpha)\\ge1-\\alpha$ ; la région est $\\{\\theta,\\ G(Z,\\theta)\\in A_\\alpha\\}$. Choix usuels : $]q_{\\alpha/2},q_{1-\\alpha/2}]$, $]-\\infty,q_{1-\\alpha}]$, $[q_\\alpha,+\\infty[$.',
    source: 'Poly ch.4, Prop. 1.1 et p. 12',
  },
  {
    key: 'regionRejet',
    tex: ['\\mathcal{R}', '\\mathcal{R}_\\alpha'],
    name: 'Région de rejet',
    definition: '$\\mathcal{R}=\\{z\\in\\mathsf{Z},\\ \\phi(z)=1\\}$ (région critique) ; $\\mathcal{R}_\\alpha$ pour le test de niveau $\\alpha$ d’une famille.',
    source: 'Poly ch.4, Déf. 2.1 et 2.4',
  },
  {
    key: 'regionAcceptation',
    tex: ['\\mathcal{A}', '\\mathcal{A}_\\alpha'],
    name: 'Région d’acceptation',
    definition: '$\\mathcal{A}=\\mathsf{Z}\\setminus\\mathcal{R}$ : observations pour lesquelles on échoue à rejeter $H_0$.',
    source: 'Poly ch.4, Déf. 2.1',
  },
  {
    key: 'partitionTheta',
    tex: ['\\Theta_0', '\\Theta_1'],
    name: 'Partition des hypothèses',
    definition: '$(\\Theta_0,\\Theta_1)$ partition de $\\Theta$ ; $H_0:\\theta\\in\\Theta_0$, $H_1:\\theta\\in\\Theta_1$. Singleton : hypothèse simple ; sinon composite.',
    source: 'Poly ch.4, §2.2',
  },
  {
    key: 'betaPhiPoly',
    tex: ['\\beta_\\phi', '\\beta_{\\phi_c}', '\\beta_{\\phi_\\alpha}'],
    name: 'Fonction puissance',
    definition: '$\\beta_\\phi(\\theta)=\\mathbb{P}_\\theta(\\phi(Z)=1)$ : risque de première espèce sur $\\Theta_0$, puissance sur $\\Theta_1$ (risque de seconde espèce $1-\\beta_\\phi$).',
    source: 'Poly ch.4, Déf. 2.2',
  },
  {
    key: 'tailleTest',
    tex: ['\\overline{\\alpha}(\\phi)', '\\overline{\\alpha}', '\\overline{\\alpha}_c'],
    name: 'Taille d’un test',
    definition: '$\\overline{\\alpha}(\\phi)=\\sup_{\\theta\\in\\Theta_0}\\beta_\\phi(\\theta)$, risque de première espèce maximal (un nombre). Le test est de niveau $\\alpha$ si $\\overline{\\alpha}(\\phi)\\le\\alpha$ (une contrainte).',
    source: 'Poly ch.4, Déf. 2.3',
  },
  {
    key: 'pvaleurHatAlpha',
    tex: ['\\hat\\alpha(Z)', '\\hat\\alpha', '\\widehat\\alpha(Z)'],
    name: 'p-valeur (notation du poly)',
    definition: '$\\hat\\alpha(Z)=\\inf\\{\\alpha,\\ Z\\in\\mathcal{R}_\\alpha\\}$ pour une famille de tests de niveau $\\alpha$ à régions emboîtées : plus petit niveau qui rejette. Ce n’est pas la probabilité de $H_0$.',
    source: 'Poly ch.4, Déf. 2.4',
  },
  {
    key: 'quantileStudentPoly',
    tex: ['\\mathrm{t}(n-1)', '\\mathrm{t}(k)', '\\mathrm{t}^{(n-1)}_{1-\\alpha/2}', '\\mathrm{t}^{(k)}_\\beta', '\\mathrm{t}(n-2)'],
    name: 'Loi de Student et ses quantiles',
    definition: '$\\mathrm{t}(k)$ : loi de $N/\\sqrt{U/k}$, $N\\sim\\mathcal{N}(0,1)$ et $U\\sim\\chi^2(k)$ indépendantes ; $\\mathrm{t}^{(k)}_\\beta$ son quantile d’ordre $\\beta$, $\\mathrm{t}^{(k)}_{1-\\beta}=-\\mathrm{t}^{(k)}_\\beta$.',
    source: 'Poly ch.4, p. 14 et Outils p. 36',
  },
  {
    key: 'quantileChi2Poly',
    tex: ['\\chi^2_\\beta(k)', '\\chi^2_{1-\\alpha/2}(n-1)', '\\chi^2_{\\alpha/2}(n-1)', '\\chi^2(2n)', '\\chi^2_{1-\\alpha}(2n)'],
    name: 'Quantiles du khi-deux',
    definition: '$\\chi^2_\\beta(k)$ : quantile d’ordre $\\beta$ de $\\chi^2(k)=\\Gamma(k/2,1/2)$ ; loi non symétrique, les deux quantiles d’un intervalle bilatéral ne sont pas opposés.',
    source: 'Poly ch.4, Ex. 1.6 et Outils p. 36',
  },
  {
    key: 'fisherPoly',
    tex: ['\\mathrm{F}(k_1,k_2)', '\\mathrm{f}_{1-\\alpha}(k_1,k_2)', '\\mathrm{F}(1,n-2)', '\\mathrm{F}(n-1,p-1)'],
    name: 'Loi de Fisher',
    definition: 'Loi de $(U_1/k_1)/(U_2/k_2)$ pour $U_i\\sim\\chi^2(k_i)$ indépendantes ; $\\mathrm{f}_{1-\\alpha}(k_1,k_2)$ son quantile d’ordre $1-\\alpha$. Pivot du rapport de deux variances gaussiennes.',
    source: 'Poly ch.4, Outils Déf. 3.2',
  },
  {
    key: 'inverseGeneralisee',
    tex: ['F^{\\leftarrow}', 'F^{\\leftarrow}(\\beta)'],
    name: 'Fonction quantile',
    definition: '$F^{\\leftarrow}(\\beta)=\\inf\\{t,\\ F(t)\\ge\\beta\\}$ ; caractérisée par $F^{\\leftarrow}(\\beta)\\le t\\iff\\beta\\le F(t)$.',
    source: 'Poly ch.4, Outils Déf. 3.1, Prop. 3.1',
  },
  {
    key: 'intervallesIn',
    tex: ['\\mathcal{I}_{n,\\alpha}', '\\mathcal{I}^\\star_{n,\\alpha}'],
    name: 'Intervalles explicites',
    definition: '$\\mathcal{I}_{n,\\alpha}$ : intervalle gaussien $[\\bar X_n\\pm z_{1-\\alpha/2}\\sigma/\\sqrt n]$ (Ex. 1.4) ou de Bienaymé-Tchebychev $[\\bar X_n\\pm1/(2\\sqrt{n\\alpha})]$ (Ex. 1.8) ; $\\mathcal{I}^\\star_{n,\\alpha}=[\\bar X_n\\pm\\sqrt{\\log(2/\\alpha)/(2n)}]$ (Hoeffding).',
    source: 'Poly ch.4, Ex. 1.4 et 1.8',
  },
])

const chapter: Chapter = {
  number: 4,
  slug: 'ch4',
  title: 'Régions de confiance et tests',
  summary:
    'Une estimation ne dit rien de sa précision : on la remplace par une **région de confiance** $\\mathcal{C}(Z)$ qui contient $g(\\theta)$ avec probabilité au moins $1-\\alpha$ **pour tout** $\\theta$ (l’aléa porte sur la région), construite par une **fonction pivotale** (Méthode 1.1 : pivot, loi, $A_\\alpha$, résolution en $\\theta$) — pivots gaussiens $\\mathcal{N}(0,1)$, Student, $\\chi^2$ (théorème de Gosset), pivot $\\chi^2(2n)$ de l’exponentielle, $X_{n:n}/\\theta$ de l’uniforme — ou, sans pivot, par une inégalité de déviation (Tchebychev, Hoeffding). Un **test** $\\phi$ décide entre $H_0$ et $H_1$ : fonction puissance, taille, niveau, approche de **Neyman-Pearson** (on contrôle le risque de première espèce ; seule décision forte : rejeter $H_0$), Méthode 2.1, tests gaussiens ($z$, Student, variance), dualité IC/test. La **$p$-valeur** $\\hat\\alpha(Z)$ est le plus petit niveau qui rejette ; uniforme sous $H_0$ quand le niveau est atteint, elle n’est **pas** la probabilité de $H_0$. Tombé : Examen 2025 Ex. 1 Q3, Ex. 2 Q5, Ex. 4 ; CC 2022 Ex. 1 Q4, Ex. 3 Q5–Q9, Ex. 4 Q8–Q9.',
  examWeight: 4,
  prerequisites: ['ch1', 'ch3'],
  pcs: ['PC4'],
  course,
  vizs,
  exercises,
  flashcards,
  summarySheet,
  monteCarlo,
}

export default chapter
