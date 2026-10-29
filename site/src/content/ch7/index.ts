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
    key: 'ch7-thetastar',
    tex: ['\\mathbb{P}_{n,\\theta^\\star}', '\\mathbb{E}_{n,\\theta^\\star}'],
    name: 'Loi de l’échantillon sous la vraie valeur',
    definition: 'Au ch.7, $\\theta^\\star$ est la valeur « vraie » sous laquelle on calcule ($\\mathbb{P}_{n,\\theta^\\star}=\\mathbb{Q}_{\\theta^\\star}^{\\otimes n}$) ; $\\theta$ est la variable muette des fonctions que l’on maximise ou annule.',
    source: 'Poly ch.7, §1.1, p. 9',
  },
  {
    key: 'ch7-mfun',
    tex: ['m(\\theta,x)', 'm(\\theta,X_i)', 'm(\\theta,X_1)'],
    name: 'Fonction objectif (M-estimation)',
    definition: 'Fonction mesurable $m:\\Theta\\times\\mathsf{X}\\to\\mathbb{R}$ telle que $\\mathbb{E}_{\\theta^\\star}[|m(\\theta,X_1)|]<\\infty$ et $\\theta\\mapsto\\mathbb{E}_{\\theta^\\star}[m(\\theta,X_1)]$ soit maximale en $\\theta^\\star$.',
    source: 'Poly ch.7, Déf. 1.1, p. 9',
  },
  {
    key: 'ch7-Mlim',
    tex: ['\\mathsf{M}_{\\theta^\\star}(\\theta)', '\\mathsf{M}_{\\theta^\\star}', '\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)'],
    name: 'Fonction objectif limite',
    definition: '$\\mathsf{M}_{\\theta^\\star}(\\theta):=\\mathbb{E}_{\\theta^\\star}[m(\\theta,X_1)]$ : fonction **déterministe** de $\\theta$, indexée par la vraie valeur, maximale en $\\theta^\\star$.',
    source: 'Poly ch.7, Déf. 1.1, p. 9',
  },
  {
    key: 'ch7-Mn',
    tex: ['\\widehat{M}_n(\\theta)', '\\widehat{M}_n', '\\widehat M_n', '\\widehat M_n(\\theta)', '\\widehat{M}_n(\\hat\\theta_n)'],
    name: 'Fonction objectif empirique',
    definition: '$\\widehat{M}_n(\\theta):=\\frac1n\\sum_{i=1}^n m(\\theta,X_i)$ : fonction **aléatoire** de $\\theta$ ; le M-estimateur $\\hat\\theta_n$ la maximise.',
    source: 'Poly ch.7, Déf. 1.1, p. 9',
  },
  {
    key: 'ch7-psi',
    tex: ['\\psi(\\theta,X_i)', '\\psi(\\theta,X_1)', '\\psi(\\theta^\\star,X_1)', '\\psi(\\theta^\\star,X_i)'],
    name: 'Fonction d’influence (Z-estimation)',
    definition: 'Fonction mesurable $\\psi:\\Theta\\times\\mathsf{X}\\to\\mathbb{R}^d$, intégrable, telle que $\\mathbb{E}_{\\theta^\\star}[\\psi(\\theta^\\star,X_1)]=0$ (centrage).',
    source: 'Poly ch.7, Déf. 1.2, p. 10',
  },
  {
    key: 'ch7-Psilim',
    tex: ['\\Psi_{\\theta^\\star}(\\theta)', '\\Psi_{\\theta^\\star}', '\\Psi_{\\theta_0}(\\theta)', '\\Psi_{\\theta_0}'],
    name: 'Équation d’estimation limite',
    definition: '$\\Psi_{\\theta^\\star}(\\theta):=\\mathbb{E}_{\\theta^\\star}[\\psi(\\theta,X_1)]$, qui s’annule en $\\theta=\\theta^\\star$ (écrite en police sans empattement dans le poly).',
    source: 'Poly ch.7, Déf. 1.2, p. 10',
  },
  {
    key: 'ch7-Psin',
    tex: ['\\widehat\\Psi_n(\\theta)', '\\widehat\\Psi_n', '\\widehat{\\Psi}_n', '\\widehat\\Psi_n(\\hat\\theta_n)', '\\widehat\\Psi_n(\\theta^\\star)', "\\widehat\\Psi_n'(\\theta^\\star)"],
    name: 'Équation d’estimation empirique',
    definition: '$\\widehat\\Psi_n(\\theta):=\\frac1n\\sum_{i=1}^n\\psi(\\theta,X_i)$ ; le Z-estimateur vérifie $\\widehat\\Psi_n(\\hat\\theta_n)=0$. $\\widehat\\Psi_n\'(\\theta^\\star)=\\frac1n\\sum_i\\psi\'(\\theta^\\star,X_i)$ est sa pente en $\\theta^\\star$.',
    source: 'Poly ch.7, Déf. 1.2 et §1.5',
  },
  {
    key: 'ch7-vpsi',
    tex: ['v_\\psi(\\theta)', 'v_\\psi(\\theta^\\star)', 'v_\\psi'],
    name: 'Variance asymptotique d’un Z-estimateur',
    definition: '$v_\\psi(\\theta)=\\dfrac{\\mathbb{E}_\\theta[\\psi^2(\\theta,X_1)]}{(\\mathbb{E}_\\theta[\\psi\'(\\theta,X_1)])^2}$ : variance de la loi limite de $\\sqrt n(\\hat\\theta_n-\\theta^\\star)$ (« sandwich » scalaire).',
    source: 'Poly ch.7, Thm 1.4, p. 20',
  },
  {
    key: 'ch7-Ifisher',
    tex: ['\\mathbb{I}(\\theta)', '\\mathbb{I}(\\theta^\\star)', '\\mathbb{I}', '\\mathbb{I}^{-1}(\\theta^\\star)'],
    name: 'Information de Fisher (lettre ajourée)',
    definition: '$\\mathbb{I}(\\theta):=\\mathbb{E}_\\theta[\\dot\\ell(\\theta,X_1)^2]=-\\mathbb{E}_\\theta[\\ddot\\ell(\\theta,X_1)]$ (éq. (10), modèle régulier) : information d’**une** observation.',
    source: 'Poly ch.7, Déf. 1.4 et éq. (10), p. 23',
  },
  {
    key: 'ch7-score',
    tex: ['\\dot\\ell(\\theta,x)', '\\dot\\ell(\\theta,X_1)', '\\dot\\ell', '\\dot\\ell(\\theta^\\star,X_1)'],
    name: 'Score de Fisher',
    definition: '$\\dot\\ell(\\theta,x):=\\partial_\\theta\\log q_\\theta(x)$, dérivée en $\\theta$ de la log-densité $\\ell(\\theta,x)=\\log q_\\theta(x)$ ; centré dans un modèle régulier.',
    source: 'Poly ch.7, Déf. 1.3, p. 22',
  },
  {
    key: 'ch7-ddot',
    tex: ['\\ddot\\ell(\\theta,x)', '\\ddot\\ell(\\theta,X_1)', '\\ddot\\ell'],
    name: 'Dérivée seconde de la log-densité',
    definition: '$\\ddot\\ell(\\theta,x):=\\partial_\\theta^2\\log q_\\theta(x)$ ; dans un modèle régulier $-\\mathbb{E}_\\theta[\\ddot\\ell(\\theta,X_1)]=\\mathbb{I}(\\theta)$.',
    source: 'Poly ch.7, Déf. 1.3, p. 22',
  },
  {
    key: 'ch7-interieur',
    tex: ['\\Theta^o'],
    name: 'Intérieur de Θ',
    definition: 'Intérieur de l’espace des paramètres. Les Thm 1.4–1.7 sont **locaux** et ne valent qu’en $\\theta^\\star\\in\\Theta^o$ (contre-exemple au bord : PC7 Ex. 4).',
    source: 'Poly ch.7, Prop. 1.1 et Thm 1.4',
  },
  {
    key: 'ch7-voisinage',
    tex: ['\\mathcal{V}(\\theta^\\star)'],
    name: 'Voisinage de la vraie valeur',
    definition: 'Voisinage de $\\theta^\\star$ inclus dans $\\Theta$ sur lequel $\\psi(\\cdot,x)$ est $C^1$ et $|\\psi\'|$ est dominée par une fonction intégrable $g$ (Thm 1.4 (ii)).',
    source: 'Poly ch.7, Thm 1.4, p. 20',
  },
  {
    key: 'ch7-wdelta',
    tex: ['w_\\delta(x)', 'w_\\delta', 'w_\\delta(X_i)'],
    name: 'Module de continuité',
    definition: '$w_\\delta(x):=\\sup_{\\|\\theta-\\vartheta\\|\\le\\delta}|\\phi(\\theta,x)-\\phi(\\vartheta,x)|$ (éq. (12)) ; $\\int w_\\delta\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}\\to0$ quand $\\delta\\to0$ (Lemme 2.1).',
    source: 'Poly ch.7, Lemme 2.1, éq. (12), p. 30',
  },
  {
    key: 'ch7-med',
    tex: ['\\widehat\\theta_n^{\\mathrm{med}}', '\\hat\\theta_n^{\\mathrm{med}}'],
    name: 'Médiane empirique',
    definition: '$X_{(n+1)/2:n}$ si $n$ impair, toute valeur de $[X_{n/2:n},X_{n/2+1:n}]$ si $n$ pair ; Z-estimateur associé à $\\psi(\\theta,x)=\\operatorname{signe}(x-\\theta)$, **non** couvert par le Thm 1.4.',
    source: 'Poly ch.7, Ex. 1.9, p. 26',
  },
  {
    key: 'ch7-Vgamma',
    tex: ['V[\\gamma]', 'V[\\gamma_k]', 'V[\\gamma_0]', 'V[\\gamma_\\infty]'],
    name: 'Variance asymptotique (PC7 Ex. 5)',
    definition: '$V[\\gamma]=\\int\\gamma^2f\\,/\\,(\\int\\gamma\'f)^2$ : variance limite du Z-estimateur de translation associé à $\\psi(\\theta,x)=\\gamma(x-\\theta)$ ; ne dépend pas de $\\theta_0$.',
    source: 'PC7 Ex. 5 Q5',
  },
  {
    key: 'ch7-gammak',
    tex: ['\\gamma_k', '\\gamma_0', '\\gamma_\\infty'],
    name: 'Fonctions d’influence de translation',
    definition: '$\\gamma_0=\\operatorname{signe}$ (médiane), $\\gamma_\\infty(x)=x$ (moyenne), $\\gamma_k(x)=x$ si $|x|\\le k$ et $k\\operatorname{signe}(x)$ sinon (Huber).',
    source: 'PC7 Ex. 5, éq. (5)',
  },
])

const chapter: Chapter = {
  number: 7,
  slug: 'ch7',
  title: 'Théorie asymptotique des M- et Z-estimateurs',
  summary:
    'La plupart des estimateurs sont définis **implicitement** : on maximise une fonction objectif empirique $\\widehat{M}_n(\\theta)=\\frac1n\\sum_i m(\\theta,X_i)$ (M-estimateur, dont l’EMV) ou on annule une équation d’estimation $\\widehat\\Psi_n(\\theta)=\\frac1n\\sum_i\\psi(\\theta,X_i)$ (Z-estimateur, dont la médiane et la moyenne). Le chapitre donne la **consistance** (convergence uniforme + maximum isolé, Thm 1.1–1.3) et la **normalité asymptotique** (TCL au numérateur, LGN au dénominateur, Slutsky : $v_\\psi=\\mathbb{E}[\\psi^2]/(\\mathbb{E}[\\psi\'])^2$, Thm 1.4–1.5). Pour l’EMV, $v=1/\\mathbb{I}(\\theta^\\star)$ (Thm 1.6), et c’est **la plus petite** variance asymptotique parmi les Z-estimateurs réguliers (Thm 1.7, par Cauchy-Schwarz). Illustrations : médiane contre EMV pour Cauchy, robustesse (PC7 Ex. 5), et ce qui casse hors régularité (Pareto : vitesse $n$ ; bord de $\\Theta$). À l’examen : Examen 2025 Ex. 2 Q7–Q8 et Q10.',
  examWeight: 2,
  prerequisites: ['ch2', 'ch6'],
  pcs: ['PC7'],
  course,
  vizs,
  exercises,
  flashcards,
  summarySheet,
  monteCarlo,
}

export default chapter
