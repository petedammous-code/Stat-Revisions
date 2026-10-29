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
    key: 'IFisherPoly',
    tex: ['\\mathbb{I}(\\theta)', '\\mathbb{I}', '\\mathbb{I}(\\theta^\\star)', '\\mathbb{I}(\\theta)^{-1}', '\\mathbb{I}(\\beta_1,\\beta_2)'],
    name: 'Information de Fisher (notation du poly)',
    definition: 'Matrice $d\\times d$ : $\\mathbb{I}(\\theta)=\\mathbb{E}_\\theta[S(\\theta,Z)S(\\theta,Z)^\\top]=\\mathrm{Var}_\\theta(S(\\theta,Z))=-\\mathbb{E}_\\theta[\\mathrm{H}_\\ell(\\theta,Z)]$ (Déf. 1.8, Prop. 1.2). Caractéristique du **modèle** : pour un $n$-échantillon, $\\mathbb{I}_{\\mathcal{M}^n}=n\\,\\mathbb{I}_1$.',
    source: 'Poly ch.3, Déf. 1.8 et Prop. 1.2',
  },
  {
    key: 'IFisherUne',
    tex: ['\\mathbb{I}_1(\\theta)', '\\mathbb{I}_1', '\\mathbb{I}_{\\mathcal{M}}(\\theta)', '\\mathbb{I}(\\mathcal{M},\\theta)'],
    name: 'Information d’une observation',
    definition: 'Information de Fisher du modèle d’**une** observation : $\\mathbb{I}_1(\\theta)=\\mathbb{E}_\\theta[\\nabla_\\theta\\ell_1(\\theta,X_1)\\nabla_\\theta\\ell_1(\\theta,X_1)^\\top]$, $\\ell_1(\\theta,x)=\\log q_\\theta(x)$. Exponentiel (intensité) $1/\\theta^2$ ; Poisson $1/\\theta$ ; Bernoulli $1/(\\theta(1-\\theta))$ ; $\\mathcal{N}(\\theta,\\sigma_0^2)$ : $1/\\sigma_0^2$.',
    source: 'Poly ch.3, Cor. 1.3 et Ex. 1.13–1.15, 1.19',
  },
  {
    key: 'IFisherN',
    tex: ['\\mathbb{I}_{\\mathcal{M}^n}(\\theta)', '\\mathbb{I}_{\\mathcal{M}^n}', '\\mathbb{I}(\\mathcal{M}^n,\\theta)'],
    name: 'Information du n-échantillon',
    definition: 'Information du modèle produit $\\mathcal{M}^n$ : $\\mathbb{I}_{\\mathcal{M}^n}(\\theta)=n\\,\\mathbb{I}_{\\mathcal{M}}(\\theta)$ par additivité (Prop. 1.2 (iii)), qui exige l’indépendance et le même paramètre.',
    source: 'Poly ch.3, Prop. 1.2 (iii)',
  },
  {
    key: 'scorePoly',
    tex: ['S(\\theta,z)', 'S(\\theta,Z)', 'S(\\theta,X)', 'S(\\theta,x)'],
    name: 'Score',
    definition: 'Gradient en $\\theta$ de la log-vraisemblance d’une observation : $S(\\theta,z)=\\nabla_\\theta\\ell(\\theta,z)\\in\\mathbb{R}^d$ (Déf. 1.7). Centré sous $\\mathbb{P}_\\theta$ dans un modèle régulier (Prop. 1.2 (i)) ; sa covariance est $\\mathbb{I}(\\theta)$.',
    source: 'Poly ch.3, Déf. 1.7',
  },
  {
    key: 'logvraisUne',
    tex: ['\\ell(\\theta,z)', '\\ell(\\theta,Z)', '\\ell(\\theta,x)', '\\ell_1(\\theta,x)', '\\ell_1(\\theta,X_1)'],
    name: 'Log-vraisemblance d’une observation',
    definition: '$\\ell(\\theta,z):=\\log p_\\theta(z)$ (éq. (2)) ; $\\ell_1(\\theta,x):=\\log q_\\theta(x)$ pour une observation d’un $n$-échantillon. Même lettre $\\ell$ que la fonction de perte $\\ell(\\theta,a)$ : le contexte distingue.',
    source: 'Poly ch.3, éq. (2) et Cor. 1.3',
  },
  {
    key: 'hessiennePoly',
    tex: ['\\mathrm{H}_\\ell(\\theta,z)', '\\mathrm{H}_\\ell(\\theta,Z)', '\\mathrm{H}_\\ell', '\\mathrm{H}_F(\\theta,z)', '\\mathrm{H}_p(\\theta,z)'],
    name: 'Hessienne en θ',
    definition: 'Matrice des dérivées secondes en $\\theta$ : $\\mathrm{H}_F(\\theta,z)=[\\partial^2F/\\partial\\theta^{(i)}\\partial\\theta^{(j)}(\\theta,z)]$ ; $\\mathrm{H}_\\ell$ pour la log-vraisemblance, $\\mathrm{H}_p$ pour la densité. $\\mathbb{I}(\\theta)=-\\mathbb{E}_\\theta[\\mathrm{H}_\\ell(\\theta,Z)]$ (éq. (7)).',
    source: 'Poly ch.3, §1.8 et Outils p. 30',
  },
  {
    key: 'biaisPoly',
    tex: ['b(\\theta,T)', 'b(\\theta,T_\\gamma)', 'b(\\theta,X_{n:n})'],
    name: 'Biais (notation du poly)',
    definition: '$b(\\theta,T):=\\mathbb{E}_\\theta[T(Z)]-g(\\theta)$ : une **fonction** de $\\theta$. $T$ est sans biais si $b(\\theta,T)=0$ pour **tout** $\\theta\\in\\Theta$ (Déf. 1.1).',
    source: 'Poly ch.3, Déf. 1.1',
  },
  {
    key: 'risqueGeneral',
    tex: ['R_\\ell(\\theta,T)', 'R_\\ell', 'R_\\ell(\\theta,T^*)'],
    name: 'Risque pour une perte ℓ',
    definition: '$R_\\ell(\\theta,T):=\\mathbb{E}_\\theta[\\ell(\\theta,T(Z))]$, perte moyenne sous la loi des observations (Déf. 1.2). Sans indice, $R(\\theta,T)$ désigne le risque quadratique (Déf. 1.3).',
    source: 'Poly ch.3, Déf. 1.2',
  },
  {
    key: 'pertes',
    tex: ['\\ell_2(\\theta,a)', '\\ell_1(\\theta,a)', '\\ell(\\theta,a)'],
    name: 'Fonction de perte',
    definition: '$\\ell:\\Theta\\times\\mathbb{R}^p\\to\\mathbb{R}_+$, coût de l’action $a$ quand la cible est $g(\\theta)$. Quadratique $\\ell_2(\\theta,a)=\\lVert a-g(\\theta)\\rVert_2^2$ ; absolue $\\ell_1(\\theta,a)=\\lVert a-g(\\theta)\\rVert_1$ (Ex. 1.6).',
    source: 'Poly ch.3, Déf. 1.2 et Ex. 1.6',
  },
  {
    key: 'Vartheta',
    tex: ['\\mathrm{Var}_\\theta', '\\mathrm{Var}_\\theta(T(Z))', '\\mathrm{Var}_\\theta(T)'],
    name: 'Variance sous P_θ',
    definition: 'Variance (matrice de covariance si $T$ est vectoriel) calculée sous $\\mathbb{P}_\\theta$.',
    source: 'Poly ch.3, Ex. 1.4',
  },
  {
    key: 'TnUn',
    tex: ['T_n^{(1)}'],
    name: 'Estimateur sans biais du support (uniforme)',
    definition: '$T_n^{(1)}:=\\frac{n+1}{n}X_{n:n}$, sans biais pour $\\theta$ dans $\\mathcal{U}([0,\\theta])$, de risque $\\theta^2/(n(n+2))$ ; inadmissible (dominé par $\\frac{n+2}{n+1}X_{n:n}$, risque $\\theta^2/(n+1)^2$).',
    source: 'Poly ch.3, Ex. 1.9',
  },
  {
    key: 'Tgamma',
    tex: ['T_\\gamma', 'T_\\gamma=\\gamma T'],
    name: 'Estimateur à rétrécissement',
    definition: '$T_\\gamma=\\gamma T$, $\\gamma\\in[0,1]$, avec $T$ sans biais : biais $(\\gamma-1)g(\\theta)$, variance $\\gamma^2\\upsilon(\\theta)$, risque $(\\gamma-1)^2g(\\theta)^2+\\gamma^2\\upsilon(\\theta)$ (éq. (17), compléments).',
    source: 'Poly ch.3, p. 13 et Compléments p. 46–47',
  },
  {
    key: 'estConstant',
    tex: ['\\hat\\theta_\\vartheta'],
    name: 'Estimateur constant',
    definition: '$\\hat\\theta_\\vartheta:Z\\mapsto\\vartheta$ : ignore les données. Risque $(\\theta-\\vartheta)^2$, nul en $\\vartheta$ ; **admissible** dans le modèle de Bernoulli (Ex. 1.10), ce qui montre qu’aucun estimateur n’est uniformément optimal.',
    source: 'Poly ch.3, Ex. 1.10',
  },
  {
    key: 'sigma0',
    tex: ['\\sigma_0^2', '\\sigma_0'],
    name: 'Variance connue',
    definition: 'Variance supposée **connue** dans le modèle $\\{\\mathcal{N}(\\theta,\\sigma_0^2),\\theta\\in\\mathbb{R}\\}$ ; $\\mathbb{I}_1(\\theta)=1/\\sigma_0^2$.',
    source: 'Poly ch.3, Ex. 1.19',
  },
  {
    key: 'voisinage',
    tex: ['\\mathcal{V}_0', 'h_0', 'h_1'],
    name: 'Voisinage et fonctions dominantes',
    definition: 'Déf. 1.6 (iii) : pour tout $\\theta_0$, un voisinage $\\mathcal{V}_0$ et $h_0,h_1\\ge0$ avec $\\int(1+h_1)h_0\\,\\mathrm{d}\\mu<\\infty$, $\\lVert\\nabla_\\theta\\ell\\rVert^2\\le h_1$, $\\lVert\\mathrm{H}_\\ell\\rVert\\le h_1$, $p_\\theta\\le h_0$ sur $\\mathcal{V}_0$ : dominations locales qui autorisent la dérivation sous l’intégrale.',
    source: 'Poly ch.3, Déf. 1.6 (iii)',
  },
  {
    key: 'KLtheta',
    tex: ['\\mathrm{KL}(\\theta^\\star,\\theta)'],
    name: 'Divergence de Kullback-Leibler (paramètres)',
    definition: '$\\mathrm{KL}(\\theta^\\star,\\theta):=\\mathrm{KL}(\\mathbb{P}_{\\theta^\\star},\\mathbb{P}_\\theta)=\\mathbb{E}_{\\theta^\\star}[\\log(p_{\\theta^\\star}(Z)/p_\\theta(Z))]\\ge0$ ; minimale en $\\theta^\\star$, de courbure $\\mathbb{I}(\\theta^\\star)$ en ce point (Intuition p. 23–24, non rigoureuse).',
    source: 'Poly ch.3, Intuition p. 23–24',
  },
  {
    key: 'ESBVM',
    tex: ['\\mathrm{ESBVM}', '\\text{E.S.B.V.M.}'],
    name: 'E.S.B.V.M.',
    definition: 'Estimateur sans biais de variance minimale : sans biais et uniformément meilleur (variance $\\le$ pour tout $\\theta$) que tout estimateur sans biais de $g(\\theta)$ (Déf. 1.5). Efficace $\\Rightarrow$ E.S.B.V.M. ; réciproque fausse.',
    source: 'Poly ch.3, Déf. 1.5',
  },
  {
    key: 'Tauc',
    tex: ['\\tau_n(c)'],
    name: 'Facteur de la borne sans régularité',
    definition: '$\\tau_n(c)=c^2/((1-c/n)^{-n}-1)\\to c^2/(e^c-1)$ : dans $\\mathcal{U}([0,\\theta])$, tout estimateur sans biais vérifie $\\mathrm{Var}_\\theta(T)\\ge\\theta^2\\tau_n(c)/n^2$ (Exercice 3 / PC3 Ex. 3).',
    source: 'Poly ch.3, Exercice 3 ; PC3 Ex. 3 Q6',
  },
  {
    key: 'Xordre',
    tex: ['X_{n:n}', 'X_{1:n}'],
    name: 'Statistiques d’ordre extrêmes',
    definition: '$X_{n:n}=\\max(X_1,\\dots,X_n)$, $X_{1:n}=\\min(X_1,\\dots,X_n)$ (notées $X_{(n)}$, $X_{(1)}$ au ch.1).',
    source: 'Poly ch.2, Ex. 1.11 ; ch.6, Ex. 1.2',
  },
], 'ch3')

const chapter: Chapter = {
  number: 3,
  slug: 'ch3',
  title: 'Bases de la théorie de la décision',
  summary:
    'Comment **comparer** deux estimateurs ? On mesure l’erreur par une **perte** et sa moyenne, le **risque** $R(\\theta,T)$, qui est une **fonction** du paramètre ; pour la perte quadratique, $R(\\theta,T)=\\mathrm{Var}_\\theta(T(Z))+b(\\theta,T)^2$ (Prop. 1.1). L’ordre induit est seulement **partiel** : on définit l’**admissibilité**, on constate qu’aucun estimateur n’est uniformément optimal (l’estimateur constant est admissible), et l’on se restreint aux estimateurs **sans biais**. Dans un **modèle régulier**, la **borne de Cramér-Rao** $\\mathrm{Var}_\\theta(T)\\ge\\nabla g^\\top\\mathbb{I}(\\theta)^{-1}\\nabla g$ minore la variance de tout estimateur sans biais régulier ; l’**information de Fisher** $\\mathbb{I}(\\theta)$ est la variance du **score** et s’additionne sur un $n$-échantillon. Un estimateur qui atteint la borne est **efficace**. À l’examen : calcul de la borne (Examen 2025 Ex. 1 Q1), biais / risque / admissibilité (CC 2022 Ex. 2 Q2–4 ; Examen 2025 Ex. 2 Q3–4).',
  examWeight: 4,
  prerequisites: ['ch1', 'ch2'],
  pcs: ['PC3', 'PC7'],
  course,
  vizs,
  exercises,
  flashcards,
  summarySheet,
  monteCarlo,
}

export default chapter
