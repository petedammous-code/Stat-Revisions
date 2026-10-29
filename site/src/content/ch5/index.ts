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
    key: 'ch5-betaPhi',
    tex: ['\\beta_\\phi(\\theta)', '\\beta_\\phi', '\\beta_{\\phi^\\star}', '\\beta_{\\phi^\\star}(\\theta_1)', '\\beta_{\\phi_{\\theta_0}}', '\\beta_{\\phi_{\\theta_0}}(\\theta)'],
    name: 'Fonction puissance',
    definition: '$\\beta_\\phi(\\theta):=\\mathbb{E}_\\theta[\\phi(Z)]$ : probabilité de rejeter $H_0$ quand les données suivent $\\mathbb{P}_\\theta$ (pour un test pur, $\\mathbb{P}_\\theta(Z\\in\\mathcal{R})$). Sur $\\Theta_0$ : à garder sous $\\alpha$ ; sur $\\Theta_1$ : à maximiser.',
    source: 'Poly ch.5, Déf. 1.1',
  },
  {
    key: 'ch5-taille',
    tex: ['\\overline{\\alpha}(\\phi)', '\\bar\\alpha(\\phi)', '\\overline{\\alpha}'],
    name: 'Taille d’un test',
    definition: '$\\overline{\\alpha}(\\phi):=\\sup_{\\theta\\in\\Theta_0}\\beta_\\phi(\\theta)$, nombre attaché au test. Le test est de niveau $\\alpha$ si $\\overline{\\alpha}(\\phi)\\le\\alpha$ : un test de niveau $\\alpha$ n’est pas forcément de taille $\\alpha$.',
    source: 'Poly ch.5, Déf. 1.1',
  },
  {
    key: 'ch5-Kalpha',
    tex: ['\\mathcal{K}_\\alpha(\\Theta_0)', '\\mathcal{K}_\\alpha', '\\mathcal{K}_\\alpha(\\{\\theta\\le\\theta_0\\})', '\\mathcal{K}_\\alpha(\\{\\theta=\\theta_0\\})'],
    name: 'Tests de niveau α',
    definition: 'Ensemble des fonctions critiques $\\phi:\\mathsf{Z}\\to[0,1]$ de niveau $\\alpha$ pour $H_0:\\theta\\in\\Theta_0$, i.e. $\\sup_{\\theta\\in\\Theta_0}\\mathbb{E}_\\theta[\\phi(Z)]\\le\\alpha$. Il ne dépend que des lois indexées par $\\Theta_0$.',
    source: 'Poly ch.5, Déf. 1.1',
  },
  {
    key: 'ch5-Theta01',
    tex: ['\\Theta_0', '\\Theta_1'],
    name: 'Partition de l’espace des paramètres',
    definition: '$\\Theta=\\Theta_0\\cup\\Theta_1$, $\\Theta_0\\cap\\Theta_1=\\emptyset$ ; $H_0:\\theta\\in\\Theta_0$ (hypothèse nulle), $H_1:\\theta\\in\\Theta_1$ (alternative).',
    source: 'Poly ch.5, §1.1',
  },
  {
    key: 'ch5-rv',
    tex: ['r(z)', 'r(Z)', 'r(x)', 'r_{\\theta_0,\\theta_1}(z)', 'r_{\\theta\',\\theta}(Z)'],
    name: 'Rapport de vraisemblance',
    definition: '$r(z):=p_{\\theta_1}(z)/p_{\\theta_0}(z)$, défini là où $p_{\\theta_0}(z)>0$. Grand $r(z)$ : l’observation était bien plus probable sous $\\theta_1$ que sous $\\theta_0$. On écrit les régions $\\{p_{\\theta_1}(z)>c\\,p_{\\theta_0}(z)\\}$, qui ont un sens partout.',
    source: 'Poly ch.5, Déf. 1.3',
  },
  {
    key: 'ch5-calpha',
    tex: ['c_\\alpha'],
    name: 'Valeur critique du rapport',
    definition: 'Constante $c_\\alpha>0$ telle que $\\mathbb{P}_{\\theta_0}(p_{\\theta_1}(Z)>c_\\alpha p_{\\theta_0}(Z))=\\alpha$ (taille exactement $\\alpha$). Dans la preuve lagrangienne, c’est le multiplicateur de la contrainte de niveau.',
    source: 'Poly ch.5, Th. 1.1',
  },
  {
    key: 'ch5-dalpha',
    tex: ['d_\\alpha'],
    name: 'Seuil sur la statistique',
    definition: 'Seuil sur la statistique $T$ quand $r(Z)=\\tilde r(T(Z))$ avec $\\tilde r$ strictement monotone : $\\mathbb{P}_{\\theta_0}(T(Z)>d_\\alpha)=\\alpha$ (ou $<$ selon le sens). **Toujours calculé sous** $\\mathbb{P}_{\\theta_0}$.',
    source: 'Poly ch.5, Méthode 1.2 ; Th. 1.3',
  },
  {
    key: 'ch5-phistar',
    tex: ['\\phi^\\star', '\\phi^\\star(z)', '\\phi^\\star(Z)', '\\phi^\\star_\\alpha'],
    name: 'Test de Neyman-Pearson',
    definition: '$\\phi^\\star(z)=\\mathbb{1}_{\\{p_{\\theta_1}(z)>c_\\alpha p_{\\theta_0}(z)\\}}$, de taille exactement $\\alpha$ ; U.P.P.($\\alpha$) pour $\\theta=\\theta_0$ contre $\\theta=\\theta_1$ (Th. 1.1).',
    source: 'Poly ch.5, Th. 1.1',
  },
  {
    key: 'ch5-phitheta0',
    tex: ['\\phi_{\\theta_0}', '\\phi_{\\theta_0}(z)'],
    name: 'Test unilatéral U.P.P.',
    definition: '$\\phi_{\\theta_0}(z)=\\mathbb{1}_{\\{T(z)>d_\\alpha\\}}$ (rapport monotone croissant) avec $\\mathbb{P}_{\\theta_0}(T(Z)>d_\\alpha)=\\alpha$ ; U.P.P.($\\alpha$) pour $\\theta\\le\\theta_0$ contre $\\theta>\\theta_0$, puissance croissante (Th. 1.3).',
    source: 'Poly ch.5, Th. 1.3',
  },
  {
    key: 'ch5-gammaalpha',
    tex: ['\\gamma_\\alpha', '\\gamma_{\\alpha,\\theta_0}'],
    name: 'Coefficient de randomisation',
    definition: 'Probabilité de rejeter quand l’observation tombe sur la frontière $\\{p_{\\theta_1}=c_\\alpha p_{\\theta_0}\\}$ (ou $T=d_\\alpha$) ; choisi pour atteindre la taille exactement $\\alpha$ quand la statistique a des atomes (Th. 4.1, compléments).',
    source: 'Poly ch.5, Th. 4.1 ; Ex. 4.1–4.2',
  },
  {
    key: 'ch5-survie',
    tex: ['\\bar F', '\\bar F(c)', '\\bar F(c^-)', '\\bar F(c_\\alpha)'],
    name: 'Fonction de survie du rapport',
    definition: '$\\bar F(c):=\\mathbb{P}_{\\theta_0}(p_{\\theta_1}(Z)>c\\,p_{\\theta_0}(Z))=\\mathbb{P}_{\\theta_0}(r(Z)>c)$ : décroissante, continue à droite ; ses sauts $\\bar F(c^-)-\\bar F(c)=\\mathbb{P}_{\\theta_0}(r(Z)=c)$ sont les atomes.',
    source: 'Poly ch.5, preuve du Th. 1.1 ; Outils Prop. 2.1',
  },
  {
    key: 'ch5-TZ',
    tex: ['T(Z)', 'T(z)'],
    name: 'Statistique',
    definition: 'Fonction mesurable de l’observation $Z$ (estimateur au ch.2). Au ch.5 : statistique réelle à travers laquelle le rapport de vraisemblance s’exprime, $r(Z)=\\tilde r(T(Z))$ ; dans une famille à rapport monotone, $p_\\theta(z)=h(z)\\,\\psi(T(z);\\theta)$ (éq. (2)).',
    source: 'Poly ch.5, Méthode 1.2 ; Déf. 1.4',
  },
  {
    key: 'ch5-nu',
    tex: ['\\nu'],
    name: 'Mesure (dominante)',
    definition: 'Au ch.5 : mesure $\\sigma$-finie sur $(\\mathsf{Z},\\mathcal{Z})$ par rapport à laquelle $\\mathbb{P}_\\theta=p_\\theta\\cdot\\nu$ (Lebesgue, comptage…). Le poly la note $\\mu$ dans les Déf. 1.4–1.5 et le Lemme 2.1.',
    source: 'Poly ch.5, §1.3',
  },
  {
    key: 'ch5-ptheta01',
    tex: ['p_{\\theta_0}', 'p_{\\theta_1}', 'p_{\\theta_0}(z)', 'p_{\\theta_1}(z)'],
    name: 'Densités sous les deux hypothèses',
    definition: 'Densités par rapport à $\\nu$ de la loi de l’observation $Z$ sous $\\theta_0$ (coût, au sens de l’énigme des terrains) et sous $\\theta_1$ (gain).',
    source: 'Poly ch.5, §1.3 et §1.5',
  },
  {
    key: 'ch5-psiRVM',
    tex: ['\\psi(t;\\theta)', '\\psi(T(z);\\theta)', 'h(z)'],
    name: 'Factorisation (2)',
    definition: '$p_\\theta(z)=h(z)\\,\\psi(T(z);\\theta)$ ; famille à rapport de vraisemblance monotone croissant si $t\\mapsto\\psi(t;\\theta)/\\psi(t;\\theta\')$ est **strictement** croissante pour tout $\\theta>\\theta\'$.',
    source: 'Poly ch.5, Déf. 1.4, éq. (2)',
  },
  {
    key: 'ch5-alphahat',
    tex: ['\\hat\\alpha(Z)'],
    name: 'p-valeur',
    definition: 'Plus petit niveau auquel on rejette au vu de $Z$ (familles à régions emboîtées). Pour le test U.P.P. gaussien : $\\hat\\alpha(Z)=1-\\Phi(\\sqrt n(\\bar X_n-\\mu_0)/\\sigma)$.',
    source: 'Poly ch.5, §1.10',
  },
  {
    key: 'ch5-Lambda',
    tex: ['\\Lambda_n', '\\Lambda(Z)'],
    name: 'Rapport de vraisemblance généralisé',
    definition: '$\\Lambda_n=\\sup_{\\Theta_0}\\mathrm{L}_n/\\sup_{\\Theta}\\mathrm{L}_n\\le1$ ; on rejette $H_0$ quand $\\Lambda_n$ est **petit**. Ne pas confondre avec $r(z)$ (deux hypothèses simples, rejet quand il est grand). Complément hors programme.',
    source: 'Poly ch.5, Déf. 4.3',
  },
  {
    key: 'ch5-Rcal',
    tex: ['\\mathcal{R}', '\\mathcal{R}_\\alpha'],
    name: 'Région de rejet',
    definition: '$\\mathcal{R}:=\\{z\\in\\mathsf{Z}:\\phi(z)=1\\}$ pour un test pur ; $\\beta_\\phi(\\theta)=\\mathbb{P}_\\theta(Z\\in\\mathcal{R})$.',
    source: 'Poly ch.5, Déf. 1.1',
  },
  {
    key: 'ch5-phipm',
    tex: ['\\phi_+', '\\phi_-'],
    name: 'Tests de Neyman-Pearson à droite / à gauche',
    definition: '$\\phi_+=\\mathbb{1}_{\\{T_n(z)>d^+_\\alpha\\}}$ (optimal contre $\\theta_1>\\theta_0$), $\\phi_-=\\mathbb{1}_{\\{T_n(z)<d^-_\\alpha\\}}$ (optimal contre $\\theta_1<\\theta_0$) ; ils diffèrent sur un ensemble de probabilité $\\alpha$ sous $\\mathbb{P}_{\\theta_0}$ : pas de test U.P.P. bilatéral (Prop. 1.1).',
    source: 'Poly ch.5, Prop. 1.1',
  },
  {
    key: 'ch5-phi123',
    tex: ['\\phi^{\\star,1}', '\\phi^{\\star,2}', '\\phi^{\\star,3}'],
    name: 'Tests de l’Exercice 5 (PC5 Ex. 2)',
    definition: '$\\phi^{\\star,1}$ : rejet si $\\bar X_n>\\theta_0+z_{1-\\alpha}/\\sqrt n$ (à droite) ; $\\phi^{\\star,2}$ : rejet si $\\bar X_n<\\theta_0-z_{1-\\alpha}/\\sqrt n$ (à gauche) ; $\\phi^{\\star,3}$ : rejet si $|\\bar X_n-\\theta_0|>z_{1-\\alpha/2}/\\sqrt n$ (bilatéral, U.M.P.U.).',
    source: 'Poly ch.5, Exercice 5 ; PC5 Ex. 2',
  },
  {
    key: 'phiTest',
    tex: ['\\phi', '\\phi_n'],
    name: 'Test (fonction critique)',
    definition: 'Test $\\phi:\\mathsf{Z}\\to[0,1]$ ; $\\phi(z)$ est la probabilité de rejeter $H_0$ ayant observé $z$ (test pur si $\\phi\\in\\{0,1\\}$). Le poly note les tests avec un $\\phi$ droit.',
    source: 'Poly ch.4, §2 ; ch.5, Déf. 1.1',
  },
  {
    key: 'Xordre',
    tex: ['X_{n:n}', 'X_{1:n}'],
    name: 'Statistiques d’ordre extrêmes',
    definition: '$X_{n:n}=\\max(X_1,\\dots,X_n)$, $X_{1:n}=\\min(X_1,\\dots,X_n)$ (notées $X_{(n)}$, $X_{(1)}$ au ch.1).',
    source: 'Poly ch.2, Ex. 1.11 ; ch.6, Ex. 1.2',
  },
], 'ch5')

const chapter: Chapter = {
  number: 5,
  slug: 'ch5',
  title: 'Optimalité en théorie des tests',
  summary:
    'À niveau $\\alpha$ fixé, quel est le **meilleur** test ? Neyman-Pearson répond : celui qui maximise la puissance en **chaque** point de l’alternative (test U.P.P.). Pour deux hypothèses simples, le test optimal rejette quand le **rapport de vraisemblance** $r(z)=p_{\\theta_1}(z)/p_{\\theta_0}(z)$ dépasse un seuil $c_\\alpha$ réglé pour que la taille vaille **exactement** $\\alpha$ (Th. 1.1), et il est essentiellement unique (Th. 1.2). Dans une famille à **rapport de vraisemblance monotone**, le même test est optimal contre toute l’alternative unilatérale (Th. 1.3–1.4) ; en bilatéral, aucun test n’est U.P.P. (Prop. 1.1). C’est l’exercice « test U.P.P. » de chaque annale (CC 2022 Ex. 1, Examen 2025 Ex. 1 Q2).',
  examWeight: 4,
  prerequisites: ['ch2', 'ch3', 'ch4'],
  pcs: ['PC5', 'PC4'],
  course,
  vizs,
  exercises,
  flashcards,
  summarySheet,
  monteCarlo,
}

export default chapter
