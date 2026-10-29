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
    key: 'Pntheta',
    tex: ['\\mathbb{P}_{n,\\theta}', 'P_{n,\\theta}', '\\mathbb{P}_n'],
    name: 'Loi de la n-ième expérience',
    definition: 'Probabilité de la $n$-ième expérience statistique sous le paramètre $\\theta$ ; pour un $n$-échantillon, $\\mathbb{P}_{n,\\theta}=\\mathbb{Q}_\\theta^{\\otimes n}$ (Ex. 1.1). Sans paramètre : $\\mathbb{P}_n$.',
    source: 'Poly ch.6, Déf. 1.1',
  },
  {
    key: 'Entheta',
    tex: ['\\mathbb{E}_{n,\\theta}', '\\mathbb{E}_n', '\\mathrm{Var}_{n,\\theta}'],
    name: 'Espérance / variance sous P_{n,θ}',
    definition: 'Espérance (resp. variance) calculée sous $\\mathbb{P}_{n,\\theta}$, loi de la $n$-ième expérience.',
    source: 'Poly ch.6, Déf. 1.1',
  },
  {
    key: 'Qtheta',
    tex: ['\\mathbb{Q}_\\theta', '\\mathbb{Q}_{\\theta}', 'Q'],
    name: 'Loi d’une observation',
    definition: 'Loi d’une seule observation $X_i$ ; la $n$-ième expérience du modèle produit est $\\mathbb{P}_{n,\\theta}=\\mathbb{Q}_\\theta^{\\otimes n}$. Écrit $Q$ quand il n’y a pas de paramètre.',
    source: 'Poly ch.6, Ex. 1.1',
  },
  {
    key: 'Zn',
    tex: ['Z_n'],
    name: 'Observation de la n-ième expérience',
    definition: 'Observation de la $n$-ième expérience ; pour un $n$-échantillon $Z_n=(X_1,\\dots,X_n)$.',
    source: 'Poly ch.6, Déf. 1.1',
  },
  {
    key: 'Tn',
    tex: ['T_n', 'T_n(Z_n)'],
    name: 'n-ième estimateur',
    definition: 'Statistique $T_n:(\\mathsf{Z}_n,\\mathcal{Z}_n)\\to(\\mathbb{R}^\\ell,\\mathcal{B}(\\mathbb{R}^\\ell))$ de la $n$-ième expérience ; la suite $\\{T_n\\}$ estime $g(\\theta)$. (Dans l’Ex. 1.14, $T_n$ désigne la statistique de Student.)',
    source: 'Poly ch.6, Déf. 1.2',
  },
  {
    key: 'convProbPoly',
    tex: ['\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}', '\\xrightarrow{\\mathbb{P}_n\\text{-prob}}', '\\xrightarrow{\\mathbb{P}\\text{-prob}}'],
    name: 'Convergence en probabilité (notation du poly)',
    definition: '$T_n(Z_n)\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}g(\\theta)$ : pour tout $\\varepsilon>0$, $\\mathbb{P}_{n,\\theta}(\\|T_n(Z_n)-g(\\theta)\\|\\ge\\varepsilon)\\to0$ (consistance).',
    source: 'Poly ch.6, Déf. 1.2 et Outils Déf. 2.1',
  },
  {
    key: 'convLoiPoly',
    tex: ['\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}', '\\overset{\\mathbb{P}_n}{\\Longrightarrow}'],
    name: 'Convergence en loi (notation du poly)',
    definition: '$Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$ : pour toute $f$ continue bornée, $\\mathbb{E}_n[f(Y_n)]\\to\\int f\\,\\mathrm{d}\\mu$. Double flèche surmontée de la probabilité sous laquelle on travaille.',
    source: 'Poly ch.6, Déf. 1.4',
  },
  {
    key: 'sigmahat2',
    tex: ['\\hat\\sigma_n^2', '\\hat{\\sigma}_n^2', '\\hat\\sigma^2_n'],
    name: 'Variance empirique (normalisée par n)',
    definition: '$\\hat\\sigma_n^2:=\\frac1n\\sum_{i=1}^n(X_i-\\bar X_n)^2=\\frac1n\\sum_iX_i^2-\\bar X_n^2$ ; $S_n^2=\\frac{n}{n-1}\\hat\\sigma_n^2$ est la version corrigée.',
    source: 'Poly ch.6, Ex. 1.6',
  },
  {
    key: 'zquantile',
    tex: ['z_{1-\\alpha/2}', 'z_u', 'z_{1-\\alpha}', 'z_\\beta'],
    name: 'Quantile gaussien',
    definition: '$z_u$ : quantile d’ordre $u$ de $\\mathcal{N}(0,1)$, i.e. $\\Phi(z_u)=u$ ; $z_{0{,}975}\\approx1{,}96$, $z_{0{,}95}\\approx1{,}645$.',
    source: 'Poly ch.6, Cor. 1.1',
  },
  {
    key: 'PhiCdf',
    tex: ['\\Phi'],
    name: 'Fonction de répartition de N(0,1)',
    definition: '$\\Phi(x)=\\mathbb{P}(U\\le x)$ pour $U\\sim\\mathcal{N}(0,1)$.',
    source: 'Poly ch.6, p. 19',
  },
  {
    key: 'gdot',
    tex: ['\\dot g(\\theta)', '\\dot g', "g'(\\theta)"],
    name: 'Dérivée de g en θ',
    definition: 'Dérivée de la fonction $g$ au point $\\theta$ (la vraie valeur) ; dans la méthode-δ, la variance asymptotique est multipliée par $\\dot g(\\theta)^2$.',
    source: 'Poly ch.6, Thm 1.7',
  },
  {
    key: 'Jg',
    tex: ['J_g(\\theta)', 'J_g'],
    name: 'Matrice jacobienne',
    definition: 'Matrice $m\\times p$ des dérivées partielles $\\partial g_i/\\partial y_j$ de $g:\\mathbb{R}^p\\to\\mathbb{R}^m$ ; covariance limite $J_g(\\theta)\\Sigma J_g(\\theta)^\\top$ dans la méthode-δ vectorielle.',
    source: 'Poly ch.6, Thm 1.8 et Déf. 2.3',
  },
  {
    key: 'vtheta',
    tex: ['v(\\theta)', '\\Sigma(\\theta)'],
    name: 'Variance (covariance) asymptotique',
    definition: 'Variance de la loi limite de $\\sqrt n(T_n-g(\\theta))$ : $\\sqrt n(T_n-g(\\theta))\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,v(\\theta))$. Ce n’est pas la variance de $T_n$ (qui vaut environ $v(\\theta)/n$).',
    source: 'Poly ch.6, Déf. 1.6',
  },
  {
    key: 'rn',
    tex: ['r_n'],
    name: 'Vitesse de convergence',
    definition: 'Suite croissante de réels strictement positifs tendant vers $+\\infty$ telle que $r_n(T_n-\\theta)$ converge en loi vers une limite non dégénérée ; typiquement $r_n=\\sqrt n$ (modèles réguliers) ou $r_n=n$ (support de l’uniforme).',
    source: 'Poly ch.6, Thm 1.7',
  },
  {
    key: 'deltac',
    tex: ['\\delta_c', '\\delta_0'],
    name: 'Masse de Dirac',
    definition: 'Loi de la constante $c$. Convergence en loi vers $\\delta_c$ $\\iff$ convergence en probabilité vers $c$ (Remarque après Slutsky ; Thm 2.2).',
    source: 'Poly ch.6, Lemme 1.1',
  },
  {
    key: 'gammaVarLim',
    tex: ['\\gamma'],
    name: 'Variance limite de la variance empirique',
    definition: '$\\gamma:=\\int(x-\\mu)^4Q(\\mathrm{d}x)-\\sigma^4$, variance de la loi limite de $\\sqrt n(\\hat\\sigma_n^2-\\sigma^2)$ ; vaut $2\\sigma^4$ dans le cas gaussien.',
    source: 'Poly ch.6, Ex. 1.6',
  },
  {
    key: 'Gnpivot',
    tex: ['G_n', 'G_n(Z_n;\\theta)', 'G_n(Z_n,\\theta)'],
    name: 'Fonction asymptotiquement pivotale',
    definition: 'Fonction $G_n:\\mathsf{Z}_n\\times\\Theta\\to\\mathbb{R}^p$ dont la loi limite sous $\\mathbb{P}_{n,\\theta}$ ne dépend pas de $\\theta$ ; exemple : $\\sqrt n(T_n-g(\\theta))/\\sqrt{v(\\theta)}\\Rightarrow\\mathcal{N}(0,1)$.',
    source: 'Poly ch.6, Déf. 1.7',
  },
  {
    key: 'Cnregion',
    tex: ['\\mathcal{C}_n(Z_n)', '\\mathcal{C}_{n,\\alpha}(\\hat\\theta_n)'],
    name: 'Région de confiance asymptotique',
    definition: 'Suite d’ensembles aléatoires telle que $\\inf_\\theta\\liminf_n\\mathbb{P}_{n,\\theta}(g(\\theta)\\in\\mathcal{C}_n(Z_n))\\ge1-\\alpha$ ; Méthode 1.1 : $[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\sqrt{v(\\hat\\theta_n)/n}]$.',
    source: 'Poly ch.6, Déf. 1.8 et Méthode 1.1',
  },
  {
    key: 'Xordre',
    tex: ['X_{n:n}', 'X_{1:n}'],
    name: 'Statistiques d’ordre extrêmes',
    definition: '$X_{n:n}=\\max(X_1,\\dots,X_n)$, $X_{1:n}=\\min(X_1,\\dots,X_n)$.',
    source: 'Poly ch.6, Ex. 1.2 ; corrigé PC6',
  },
  {
    key: 'betaphi',
    tex: ['\\beta_{\\phi_n}(\\theta)', '\\beta_{\\phi_n}'],
    name: 'Fonction puissance du n-ième test',
    definition: '$\\beta_{\\phi_n}(\\theta)=\\mathbb{P}_{n,\\theta}(\\phi_n=1)$ : probabilité de rejeter $H_0$ avec le $n$-ième test. Taille asymptotique $\\sup_{\\Theta_0}\\limsup_n\\beta_{\\phi_n}$ ; consistance : $\\liminf_n\\beta_{\\phi_n}(\\theta)=1$ sur $\\Theta_1$.',
    source: 'Poly ch.6, Déf. 1.9–1.11',
  },
  {
    key: 'phiTestN',
    tex: ['\\phi_n'],
    name: 'Suite de tests',
    definition: 'Test $\\phi_n:\\mathsf{Z}_n\\to\\{0,1\\}$ construit sur le $n$-échantillon ; $\\phi_n=1$ : on rejette $H_0$.',
    source: 'Poly ch.4, §2 ; ch.6, §2',
  },
], 'ch6')

const chapter: Chapter = {
  number: 6,
  slug: 'ch6',
  title: 'Statistiques asymptotiques',
  summary:
    'Quand la loi exacte d’un estimateur est hors d’atteinte, on la remplace par sa **loi limite** quand $n\\to\\infty$. Deux propriétés : la **consistance** ($T_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}g(\\theta)$, par la LGN et le théorème de continuité) et la **normalité asymptotique** ($\\sqrt n(T_n-g(\\theta))\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,v(\\theta))$, par le TCL, le lemme de Slutsky et la méthode-δ). On en tire des intervalles de confiance et des tests de niveau asymptotique, et un critère de comparaison des estimateurs par leur variance asymptotique. C’est le chapitre le plus rentable de l’examen (Examen 2025 Ex. 2 Q6–Q10, CC 2022 Ex. 2 Q5–7).',
  examWeight: 5,
  prerequisites: ['ch1', 'ch2', 'ch3'],
  pcs: ['PC6', 'PC7'],
  course,
  vizs,
  exercises,
  flashcards,
  summarySheet,
  monteCarlo,
}

export default chapter
