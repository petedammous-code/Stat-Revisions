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
    key: 'vartheta',
    tex: ['\\vartheta'],
    name: 'Variable libre du paramètre',
    definition: 'Paramètre **libre** (candidat) : argument de $e(\\cdot)$, $\\mathrm{L}_n(\\cdot)$, $\\ell_n(\\cdot)$, $M_n(\\cdot)$, par rapport auquel on résout ou on maximise. À distinguer de $\\theta$ (valeur sous laquelle on calcule) et de $\\theta^\\star$ (vraie valeur, §1.4).',
    source: 'Poly ch.2, Déf. 1.2 et §1.4',
  },
  {
    key: 'Lnroman',
    tex: ['\\mathrm{L}_n', '\\mathrm{L}_n(\\vartheta)', '\\mathrm{L}_n(\\vartheta,X_1,\\dots,X_n)'],
    name: 'Vraisemblance (notation du poly)',
    definition: '$\\mathrm{L}_n(\\vartheta,X_1,\\dots,X_n):=\\prod_{i=1}^nq_\\vartheta(X_i)$ : densité du $n$-échantillon (par rapport à $\\mu^{\\otimes n}$) évaluée aux observations, vue comme fonction du paramètre libre $\\vartheta$. Le poly écrit le L **droit**.',
    source: 'Poly ch.2, Déf. 1.4',
  },
  {
    key: 'ellnNorm',
    tex: ['\\ell_n(\\vartheta)', '\\ell_n(\\vartheta,X_1,\\dots,X_n)'],
    name: 'Log-vraisemblance normalisée',
    definition: '$\\ell_n(\\vartheta):=\\frac1n\\log\\mathrm{L}_n(\\vartheta)=\\frac1n\\sum_{i=1}^n\\log q_\\vartheta(X_i)$ (convention $\\log0=-\\infty$). Attention : **normalisée par $n$** dans le ch.2 ; mêmes points de maximum que $\\mathrm{L}_n$.',
    source: 'Poly ch.2, Déf. 1.5',
  },
  {
    key: 'emv',
    tex: ['\\hat\\theta_n^{\\mathrm{MV}}', '\\hat\\theta^{\\mathrm{MV}}_n', '\\widehat\\theta_n^{\\mathrm{MV}}'],
    name: 'Estimateur du maximum de vraisemblance (EMV)',
    definition: 'Tout estimateur $\\hat\\theta_n^{\\mathrm{MV}}\\in\\argmax_{\\vartheta\\in\\Theta}\\mathrm{L}_n(\\vartheta)$. Il peut ne pas exister (Ex. 1.12) ou ne pas être unique (Ex. 1.13) ; il ne dépend pas de la mesure dominante ; il est invariant par reparamétrisation (Prop. 1.2).',
    source: 'Poly ch.2, Déf. 1.4',
  },
  {
    key: 'racinerv',
    tex: ['\\hat\\theta_n^{\\mathrm{rv}}'],
    name: 'Racine de l’équation de vraisemblance',
    definition: 'Tout estimateur solution de $\\nabla_\\vartheta\\ell_n(\\vartheta)=0$ sur $\\mathring\\Theta$ (point critique). Une racine n’est **pas** nécessairement un maximum global : il faut vérifier (Méthode 1.2, étape 2c).',
    source: 'Poly ch.2, Déf. 1.6',
  },
  {
    key: 'momentExact',
    tex: ['e(\\theta)', 'e(\\vartheta)', 'e_j(\\theta)', 'e_j(\\vartheta)', '\\tilde e(\\theta)'],
    name: 'Moment exact associé à T',
    definition: '$e(\\theta):=\\mathbb{E}_\\theta[T(X_1)]$ (resp. $e_j(\\theta)=\\mathbb{E}_\\theta[T_j(X_1)]$). L’estimateur des moments associé à $T$ est la solution unique (si elle existe dans $\\Theta$) de $e(\\vartheta)=\\frac1n\\sum_iT(X_i)$.',
    source: 'Poly ch.2, Déf. 1.2 et Méthode 1.1',
  },
  {
    key: 'X2bar',
    tex: ['\\overline{X^2}_n', '\\overline{X^2_n}'],
    name: 'Moyenne empirique des carrés',
    definition: '$\\overline{X^2}_n:=\\frac1n\\sum_{i=1}^nX_i^2$ : moment empirique associé à $T(x)=x^2$.',
    source: 'Poly ch.2, Ex. 1.5',
  },
  {
    key: 'Vn',
    tex: ['V_n'],
    name: 'Variance empirique non corrigée',
    definition: '$V_n:=\\overline{X^2}_n-\\bar X_n^2=\\frac1n\\sum_{i=1}^n(X_i-\\bar X_n)^2\\ge0$ ; intervient dans l’estimateur des moments de $\\mathcal{U}([a,b])$ : $\\hat a_n,\\hat b_n=\\bar X_n\\mp\\sqrt{3V_n}$.',
    source: 'Poly ch.2, Ex. 1.5',
  },
  {
    key: 'Psin',
    tex: ['\\Psi_n(\\vartheta)', '\\Psi_n', '\\boldsymbol\\psi', '\\boldsymbol\\psi(\\vartheta,x)', '\\psi(\\theta,x)'],
    name: 'Fonction d’estimation et Z-estimateur',
    definition: '$\\boldsymbol\\psi:\\Theta\\times\\mathsf{X}\\to\\mathbb{R}^d$ avec $\\mathbb{E}_\\theta[\\boldsymbol\\psi(\\theta,X_1)]=0$ ; $\\Psi_n(\\vartheta):=\\frac1n\\sum_i\\boldsymbol\\psi(\\vartheta,X_i)$. Un Z-estimateur est un **zéro** de $\\Psi_n$. Estimateur des moments : $\\boldsymbol\\psi(\\vartheta,x)=\\mathbf{T}(x)-\\mathbb{E}_\\vartheta[\\mathbf{T}(X_1)]$.',
    source: 'Poly ch.2, Déf. 1.3',
  },
  {
    key: 'medEmp',
    tex: ['\\mathrm{med}(X_1,\\dots,X_n)', '\\mathrm{med}'],
    name: 'Médiane empirique',
    definition: '$X_{m+1:n}$ si $n=2m+1$, $\\frac12(X_{m:n}+X_{m+1:n})$ si $n=2m$. Z-estimateur associé à $\\psi(\\theta,x)=\\mathrm{signe}(x-\\theta)$, M-estimateur associé à $m(\\vartheta,x)=-|x-\\vartheta|$, EMV du modèle de Laplace ; **pas** un estimateur des moments.',
    source: 'Poly ch.2, Ex. 1.6, 1.13, 1.15',
  },
  {
    key: 'Xkn',
    tex: ['X_{k:n}', 'X_{m:n}', 'X_{m+1:n}', 'X_{k+1:n}'],
    name: 'Statistiques d’ordre',
    definition: '$X_{1:n}\\le\\dots\\le X_{n:n}$ : observations rangées par ordre croissant (notées $X_{(k)}$ au ch.1) ; $X_{n:n}=\\max_iX_i$ est l’EMV de $\\mathcal{U}([0,\\theta])$.',
    source: 'Poly ch.2, Ex. 1.5, 1.6, 1.11',
  },
  {
    key: 'thetaStar',
    tex: ['\\mathbb{P}_{\\theta^\\star}', '\\mathbb{E}_{\\theta^\\star}'],
    name: 'Loi / espérance sous la vraie valeur θ⋆',
    definition: 'À partir du §1.4, $\\theta^\\star$ est le paramètre « hypothèse » (vraie valeur) : les observations sont tirées sous $\\mathbb{P}_{\\theta^\\star}$ et les espérances sont calculées sous $\\mathbb{P}_{\\theta^\\star}$, tandis que $\\vartheta$ parcourt $\\Theta$.',
    source: 'Poly ch.2, §1.4',
  },
  {
    key: 'KL',
    tex: ['\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1)', '\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)', '\\mathrm{KL}'],
    name: 'Divergence de Kullback-Leibler',
    definition: '$\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1):=\\int_{\\{f_0>0\\}}f_0\\log\\frac{f_0}{f_1}\\,\\mathrm{d}\\mu\\in[0,+\\infty]$ (convention $\\log(1/0)=+\\infty$) ; nulle ssi $\\mathbb{P}_0=\\mathbb{P}_1$ (Thm 1.1) ; **non symétrique**, ce n’est pas une distance ; ne dépend pas de $\\mu$.',
    source: 'Poly ch.2, Déf. 1.7',
  },
  {
    key: 'Mthetastar',
    tex: ['M_{\\theta^\\star}(\\vartheta)', 'M_{\\theta^\\star}', 'M_n(\\vartheta)', 'M_n'],
    name: 'Limite de la log-vraisemblance / critère d’un M-estimateur',
    definition: '$M_{\\theta^\\star}(\\vartheta):=\\mathbb{E}_{\\theta^\\star}[\\log q_\\vartheta(X_1)]$ (ou $\\mathbb{E}_{\\theta^\\star}[m(\\vartheta,X_1)]$ pour un M-estimateur) : limite en probabilité de $\\ell_n(\\vartheta)$ (resp. de $M_n(\\vartheta)=\\frac1n\\sum_im(\\vartheta,X_i)$). $M_{\\theta^\\star}(\\vartheta)=M_{\\theta^\\star}(\\theta^\\star)-\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)$.',
    source: 'Poly ch.2, Prop. 1.3 et Déf. 1.8',
  },
  {
    key: 'EntPoly',
    tex: ['\\mathrm{Ent}(\\mathbb{Q}_{\\theta^\\star})', '\\mathrm{Ent}'],
    name: 'Entropie au sens du poly',
    definition: '$\\mathrm{Ent}(\\mathbb{Q}_{\\theta^\\star}):=\\int q_{\\theta^\\star}\\log q_{\\theta^\\star}\\,\\mathrm{d}\\mu=M_{\\theta^\\star}(\\theta^\\star)$ : **opposé** de l’entropie de Shannon ; dépend de la mesure dominante (contrairement à $\\mathrm{KL}$).',
    source: 'Poly ch.2, Remarque après la Prop. 1.3',
  },
  {
    key: 'qtheta',
    tex: ['q_\\theta', 'q_\\vartheta', 'q_\\theta(x)', 'q_\\vartheta(x)', 'q_{\\theta^\\star}'],
    name: 'Densité d’une observation',
    definition: 'Densité de $\\mathbb{Q}_\\theta$ (loi d’une observation) par rapport à la mesure dominante $\\mu$ ($\\mathrm{Leb}$ ou mesure de comptage) : $\\mathbb{Q}_\\theta=q_\\theta\\cdot\\mu$. La vraisemblance est $\\prod_iq_\\vartheta(X_i)$.',
    source: 'Poly ch.2, Déf. 1.4',
  },
  {
    key: 'interieurTheta',
    tex: ['\\mathring\\Theta', '\\mathring{\\Theta}'],
    name: 'Intérieur de Θ',
    definition: 'Ensemble des points intérieurs de $\\Theta$ : les équations de vraisemblance $\\nabla_\\vartheta\\ell_n=0$ n’ont de sens qu’en un point intérieur où $\\ell_n$ est différentiable ; au bord (Bernoulli avec $S_n\\in\\{0,n\\}$) le maximum se traite à part.',
    source: 'Poly ch.2, Déf. 1.6',
  },
  {
    key: 'Na',
    tex: ['N_a'],
    name: 'Nombre d’observations dans [0, a]',
    definition: '$N_a:=\\sum_{i=1}^n\\mathbb{1}_{\\{X_i\\in[0,a]\\}}\\sim\\mathrm{Bin}\\big(n,\\theta+(1-\\theta)\\frac ab\\big)$ dans le mélange uniforme (PC2 Ex. 2) ; la vraisemblance n’en dépend que par $N_a$.',
    source: 'PC2 Ex. 2',
  },
  {
    key: 'logPartition',
    tex: ['A(\\eta)', '\\Xi', 'A\'(\\eta)', 'A\'\'(\\eta)'],
    name: 'Log-partition et espace des paramètres naturels',
    definition: 'Modèle exponentiel canonique $q_\\eta(x)=h(x)\\exp(\\eta T(x)-A(\\eta))$ avec $A(\\eta)=\\log\\int h\\,e^{\\eta T}\\,\\mathrm{d}\\mu$ ; $\\Xi=\\{\\eta:|A(\\eta)|<\\infty\\}$ convexe, $A$ convexe, $A\'(\\eta)=\\mathbb{E}_\\eta[T(X)]$, $A\'\'(\\eta)=\\mathrm{Var}_\\eta(T(X))$ ; EMV = estimateur des moments associé à $T$.',
    source: 'PC2 Ex. 3',
  },
  {
    key: 'projP',
    tex: ['I_n-P', 'I-P', 'P\\mathbf{Y}', '(I_n-P)\\mathbf{Y}'],
    name: 'Projecteur orthogonal sur Im(X)',
    definition: '$P:=\\mathbf{X}(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T$ : projection orthogonale sur $F=\\mathrm{Vect}(\\mathbf{1},\\underline{\\mathbf{x}})$ (dimension 2) ; $\\mathbf{X}\\hat\\beta=P\\mathbf{Y}$ et $n\\hat\\sigma^2=\\|(I_n-P)\\mathbf{Y}\\|^2$, d’où $n\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-2)$ (Cochran).',
    source: 'PC2 Ex. 1',
  },
], 'ch2')

const chapter: Chapter = {
  number: 2,
  slug: 'ch2',
  title: 'Estimation ponctuelle',
  summary:
    'Comment **construire** un estimateur ? Deux procédés systématiques : la **méthode des moments** (égaler moments exacts $e_j(\\vartheta)=\\mathbb{E}_\\vartheta[T_j(X_1)]$ et moments empiriques $\\frac1n\\sum_iT_j(X_i)$, Méthode 1.1) et le **maximum de vraisemblance** (maximiser $\\mathrm{L}_n(\\vartheta)=\\prod_iq_\\vartheta(X_i)$, Méthode 1.2 : annuler le score **puis vérifier le maximum global**, ou étude directe dans les modèles non réguliers comme $\\mathcal{U}([0,\\theta])$). Généralisations : Z-estimateurs (zéros de $\\Psi_n$) et M-estimateurs (maxima de $M_n$). L’heuristique de consistance de l’EMV repose sur la **divergence de Kullback-Leibler** : $\\ell_n(\\vartheta)\\to M_{\\theta^\\star}(\\vartheta)=M_{\\theta^\\star}(\\theta^\\star)-\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)$, maximale en $\\theta^\\star$ seulement si le modèle est identifiable. À l’examen : point d’entrée de tous les problèmes (Examen 2025 Ex. 2 Q2 et Q9(a), Ex. 4 Q1 et Q9 ; CC 2022 Ex. 4 Q1) — une erreur ici se propage.',
  examWeight: 3,
  prerequisites: ['ch1'],
  pcs: ['PC2'],
  course,
  vizs,
  exercises,
  flashcards,
  summarySheet,
  monteCarlo,
}

export default chapter
