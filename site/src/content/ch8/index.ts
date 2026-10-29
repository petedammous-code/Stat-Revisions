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
    key: 'ch8-attributs',
    tex: ['\\mathbf{x}', '\\mathbf{X}_i', '(\\mathbf{X},Y)'],
    name: 'Attributs (variables explicatives)',
    definition: 'Vecteur aléatoire $\\mathbf{X}\\in\\mathsf{X}=\\mathbb{R}^d$ des attributs (*features*) ; $\\mathbf{x}$ désigne un point de $\\mathbb{R}^d$. En gras dans le poly ; la réponse $Y$ ne l’est pas.',
    source: 'Poly ch.8, Cadre 1.1',
  },
  {
    key: 'ch8-Dn',
    tex: ['\\mathcal{D}_n'],
    name: 'Ensemble d’apprentissage',
    definition: '$\\mathcal{D}_n=\\{(\\mathbf{X}_1,Y_1),\\dots,(\\mathbf{X}_n,Y_n)\\}$ : $n$ paires indépendantes de même loi $\\mathbb{P}$ que $(\\mathbf{X},Y)$ (un $n$-échantillon de $\\mathbb{P}$).',
    source: 'Poly ch.8, p. 9',
  },
  {
    key: 'ch8-ghat',
    tex: ['\\widehat g_n', '\\widehat{g}_n', '\\widehat g_n(\\mathbf{x})'],
    name: 'Règle apprise',
    definition: 'Prédicteur construit à partir de $\\mathcal{D}_n$ : une statistique à valeurs dans un espace de fonctions. Pour une règle par substitution, $\\widehat g_n=g^\\star_{\\hat\\theta_n}$.',
    source: 'Poly ch.8, p. 9 et Méthode 1.1',
  },
  {
    key: 'ch8-gstar',
    tex: ['g^\\star', 'g^\\star(\\mathbf{x})', 'g^\\star(\\mathbf{X})', 'g^\\star_{\\ell,\\mathbb{P}}', 'g^\\star(x)', 'g^\\star(X)'],
    name: 'Règle bayésienne',
    definition: 'Règle mesurable de risque minimal : $R(g^\\star)=R^\\star=\\inf_gR(g)$. Perte quadratique : $g^\\star(\\mathbf{X})=\\mathbb{E}[Y\\mid\\mathbf{X}]$ (Th. 1.1) ; perte 0–1 : $g^\\star(\\mathbf{x})=2\\,\\mathbb{1}_{\\{\\eta(\\mathbf{x})\\ge1/2\\}}-1$ (Th. 1.2).',
    source: 'Poly ch.8, Déf. 1.4, Th. 1.1–1.2',
  },
  {
    key: 'ch8-Rstar',
    tex: ['R^\\star', 'R^\\star_{01}', 'R^\\star_{\\ell,\\mathbb{P}}'],
    name: 'Risque bayésien',
    definition: '$R^\\star_{\\ell,\\mathbb{P}}=\\inf\\{R_{\\ell,\\mathbb{P}}(g),\\ g\\text{ mesurable}\\}$ ; en classification 0–1, $R^\\star_{01}=\\mathbb{E}[\\min(\\eta(\\mathbf{X}),1-\\eta(\\mathbf{X}))]\\le1/2$. Erreur irréductible : référence théorique.',
    source: 'Poly ch.8, Déf. 1.4 et Th. 1.2 éq. (5)',
  },
  {
    key: 'ch8-risque',
    tex: ['R(g)', 'R_{01}(g)', 'R_2(g)', 'R_{\\ell,\\mathbb{P}}(g)'],
    name: 'Risque d’un prédicteur',
    definition: '$R(g)=\\mathbb{E}[\\ell(Y,g(\\mathbf{X}))]$ ; $R_{01}(g)=\\mathbb{P}(Y\\ne g(\\mathbf{X}))$ (proportion de mal classés), $R_2(g)=\\mathbb{E}[(Y-g(\\mathbf{X}))^2]$.',
    source: 'Poly ch.8, Déf. 1.3',
  },
  {
    key: 'ch8-pertes',
    tex: ['\\ell_{01}', '\\ell_2', '\\ell_{01}(y,g(\\mathbf{x}))', '\\ell_2(y,g(\\mathbf{x}))'],
    name: 'Pertes 0–1 et quadratique',
    definition: '$\\ell_{01}(y,g(\\mathbf{x}))=\\mathbb{1}_{\\{y\\ne g(\\mathbf{x})\\}}$ (classification), $\\ell_2(y,g(\\mathbf{x}))=(y-g(\\mathbf{x}))^2$ (régression). Arguments dans l’ordre (réponse, prévision).',
    source: 'Poly ch.8, Déf. 1.2',
  },
  {
    key: 'ch8-eta',
    tex: ['\\eta(\\mathbf{x})', '\\eta(\\mathbf{X})', '\\eta(x)', '\\eta(X)', '\\eta^\\star', '\\eta^\\star(\\mathbf{X})'],
    name: 'Fonction de régression',
    definition: '$\\eta(\\mathbf{X})=\\mathbb{P}(Y=1\\mid\\mathbf{X})=\\mathbb{E}[\\mathbb{1}_{\\{Y=1\\}}\\mid\\mathbf{X}]\\in[0,1]$ (classification binaire, $Y\\in\\{-1,1\\}$). Attention : $\\mathbb{E}[Y\\mid\\mathbf{X}]=2\\eta(\\mathbf{X})-1$ avec ce codage.',
    source: 'Poly ch.8, Déf. 1.5',
  },
  {
    key: 'ch8-sigm',
    tex: ['\\mathrm{sigm}', '\\mathrm{sigm}(t)'],
    name: 'Sigmoïde',
    definition: '$\\mathrm{sigm}(t)=1/(1+e^{-t})$ : strictement croissante de $\\mathbb{R}$ sur $]0,1[$, $\\mathrm{sigm}(0)=1/2$, $\\mathrm{sigm}(-t)=1-\\mathrm{sigm}(t)$ ; réciproque : logit $u\\mapsto\\log(u/(1-u))$.',
    source: 'Poly ch.8, Outils §2.9',
  },
  {
    key: 'ch8-phitheta',
    tex: ['\\phi_\\theta', '\\phi_\\theta(\\mathbf{x})', '\\phi_{\\hat\\theta_n}'],
    name: 'Log-rapport (logit de η)',
    definition: '$\\phi_\\theta(\\mathbf{x})=\\log\\frac{p\\,q_{1,\\theta}(\\mathbf{x})}{(1-p)\\,q_{-1,\\theta}(\\mathbf{x})}$, de sorte que $\\eta_\\theta=\\mathrm{sigm}(\\phi_\\theta)$ et $g^\\star_\\theta(\\mathbf{x})=1\\iff\\phi_\\theta(\\mathbf{x})\\ge0$. Polynôme de degré $\\le2$ en analyse discriminante.',
    source: 'Poly ch.8, éq. (11)',
  },
  {
    key: 'ch8-wtheta',
    tex: ['\\mathbf{w}_\\theta', 'A_\\theta'],
    name: 'Coefficients de la frontière LDA',
    definition: 'Si $\\Sigma_1=\\Sigma_{-1}=\\Sigma$ : $\\phi_\\theta(\\mathbf{x})=\\mathbf{w}_\\theta^\\top\\mathbf{x}+A_\\theta$, $\\mathbf{w}_\\theta=\\Sigma^{-1}(\\mu_1-\\mu_{-1})$, $A_\\theta=\\log\\frac p{1-p}-\\frac12(\\mu_1^\\top\\Sigma^{-1}\\mu_1-\\mu_{-1}^\\top\\Sigma^{-1}\\mu_{-1})$.',
    source: 'Poly ch.8, p. 19',
  },
  {
    key: 'ch8-qclasses',
    tex: ['q_1', 'q_{-1}', 'q_1(\\mathbf{x})', 'q_{-1}(\\mathbf{x})', 'q_{i,\\theta}', 'q_{1,\\theta}', 'q_{-1,\\theta}'],
    name: 'Densités de classe',
    definition: '$q_1(\\mathbf{x})=q_{\\mathbf{X}|Y}(\\mathbf{x}\\mid y=1)$ et $q_{-1}(\\mathbf{x})=q_{\\mathbf{X}|Y}(\\mathbf{x}\\mid y=-1)$ : densités des attributs dans chaque classe ($q_{i,\\theta}$ dans un modèle).',
    source: 'Poly ch.8, p. 16',
  },
  {
    key: 'ch8-pX',
    tex: ['p_{\\mathbf{X}}', 'p_{\\mathbf{X}}(\\mathbf{x})', 'p_{\\mathbf{X},Y}', 'p_{\\mathbf{X},Y}(\\mathbf{x},y)'],
    name: 'Densités jointe et marginale',
    definition: '$p_{\\mathbf{X},Y}$ : densité du couple par rapport à $\\mu\\otimes\\nu$ ; $p_{\\mathbf{X}}(\\mathbf{x})=\\int p_{\\mathbf{X},Y}(\\mathbf{x},y)\\,\\nu(\\mathrm{d}y)$ ; en binaire $p_{\\mathbf{X}}=p\\,q_1+(1-p)\\,q_{-1}$ (mélange).',
    source: 'Poly ch.8, éq. (1) et Prop. 1.2',
  },
  {
    key: 'ch8-qYX',
    tex: ['q_{Y|\\mathbf{X}}', 'q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})', 'q_{\\mathbf{X}|Y}', 'q_{\\mathbf{X}|Y}(\\mathbf{x}\\mid y)'],
    name: 'Densités conditionnelles',
    definition: '$q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})=p_{\\mathbf{X},Y}(\\mathbf{x},y)/p_{\\mathbf{X}}(\\mathbf{x})$ pour $p_{\\mathbf{X}}(\\mathbf{x})>0$ (éq. (3)) ; factorisation (2) : $p_{\\mathbf{X},Y}=q_{\\mathbf{X}|Y}\\,p_Y=q_{Y|\\mathbf{X}}\\,p_{\\mathbf{X}}$.',
    source: 'Poly ch.8, éq. (2)–(3)',
  },
  {
    key: 'ch8-Rcond',
    tex: ['R_{\\ell,\\mathbb{P}}(g,\\mathbf{x})'],
    name: 'Risque conditionnel',
    definition: '$R_{\\ell,\\mathbb{P}}(g,\\mathbf{x})=\\int\\ell(y,g(\\mathbf{x}))\\,q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})\\,\\nu(\\mathrm{d}y)$ ; le risque est sa moyenne contre $p_{\\mathbf{X}}\\cdot\\mu$ (Prop. 1.1).',
    source: 'Poly ch.8, Prop. 1.1',
  },
  {
    key: 'ch8-comptage',
    tex: ['\\mathrm{c}'],
    name: 'Mesure de comptage sur {−1, 1}',
    definition: '$\\mathrm{c}=\\delta_{\\{-1\\}}+\\delta_{\\{1\\}}$ ; intégrer contre $\\mathrm{c}$ revient à sommer les valeurs en $y=1$ et $y=-1$.',
    source: 'Poly ch.8, p. 12 et Outils §2.7',
  },
  {
    key: 'ch8-bertilde',
    tex: ['\\widetilde{\\mathcal{B}\\mathrm{er}}(p)', '\\widetilde{\\mathcal{B}\\mathrm{er}}'],
    name: 'Bernoulli sur {−1, 1}',
    definition: 'Loi de Bernoulli de paramètre $p$ **à valeurs dans $\\{-1,1\\}$** : $\\mathbb{P}(Y=1)=p$, $\\mathbb{P}(Y=-1)=1-p$.',
    source: 'Poly ch.8, p. 16',
  },
  {
    key: 'ch8-thetaMLE',
    tex: ['\\widehat\\theta_{\\mathrm{MLE},n}'],
    name: 'EMV (notation du ch.8)',
    definition: 'Estimateur du maximum de vraisemblance ; logistique : $\\arg\\min_\\theta\\frac1n\\sum_i\\log(1+e^{-Y_i\\theta^\\top\\mathbf{X}_i})$ ; linéaire gaussien : moindres carrés.',
    source: 'Poly ch.8, éq. (12) et Cadre 1.4',
  },
  {
    key: 'ch8-Enstar',
    tex: ['\\mathbb{E}_{n,\\theta^\\star}', '\\mathbb{P}_{n,\\theta^\\star}'],
    name: 'Loi de l’ensemble d’apprentissage',
    definition: 'Probabilité et espérance sous la loi de $\\mathcal{D}_n$ quand les données suivent $\\mathbb{P}_{\\theta^\\star}$ ; second aléa du « double aléa » (Prop. 1.5).',
    source: 'Poly ch.8, Prop. 1.5',
  },
  {
    key: 'ch8-L2',
    tex: ['\\mathrm{L}^2(\\Omega,\\mathcal{F},\\mathbb{P})', '\\mathrm{L}^2(\\Omega,\\sigma(\\mathbf{X}),\\mathbb{P})', '\\mathrm{L}^2(\\Omega,\\mathcal{A},\\mathbb{P})'],
    name: 'Espace L² (quotient)',
    definition: 'Variables de carré intégrable, identifiées lorsqu’elles sont égales p.s. ; espace de Hilbert pour $\\langle Z_1,Z_2\\rangle=\\mathbb{E}[Z_1Z_2]$ (Th. 2.1). $\\mathbb{E}[Z\\mid\\mathcal{A}]$ est la projection sur $\\mathrm{L}^2(\\Omega,\\mathcal{A},\\mathbb{P})$.',
    source: 'Poly ch.8, Outils Déf. 2.2, Th. 2.1, Déf. 2.3',
  },
  {
    key: 'ch8-sigmaX',
    tex: ['\\sigma(\\mathbf{X})'],
    name: 'Tribu engendrée par X',
    definition: '$\\sigma(\\mathbf{X})=\\{\\mathbf{X}^{-1}(B),\\ B\\in\\mathcal{B}(\\mathbb{R}^d)\\}$ ; une variable est $\\sigma(\\mathbf{X})$-mesurable ssi c’est une fonction mesurable de $\\mathbf{X}$ (lemme de Doob, Prop. 2.1).',
    source: 'Poly ch.8, Outils §2.3',
  },
  {
    key: 'ch8-etatilde',
    tex: ['\\tilde\\eta', '\\tilde g', '\\hat\\eta', '\\hat g'],
    name: 'Fonction de régression approchée',
    definition: 'Approximation $\\tilde\\eta:\\mathsf{X}\\to[0,1]$ de $\\eta$ et règle associée $\\tilde g=2\\,\\mathbb{1}_{\\{\\tilde\\eta\\ge1/2\\}}-1$ ; excès de risque $\\le2\\,\\mathbb{E}[|\\eta(\\mathbf{X})-\\tilde\\eta(\\mathbf{X})|]$ (majoration (13)).',
    source: 'Poly ch.8, éq. (13) ; Compléments Prop. 4.2',
  },
  {
    key: 'ch8-Rhat',
    tex: ['\\widehat R_n(g)', '\\widehat R_n'],
    name: 'Risque empirique (complément)',
    definition: '$\\widehat R_n(g)=\\frac1n\\sum_{k=1}^n\\mathbb{1}_{\\{g(\\mathbf{X}_k)\\ne Y_k\\}}$ : erreur d’apprentissage ; tend vers $R(g)$ pour $g$ **fixée** (LGN), pas pour une règle choisie au vu des données.',
    source: 'Poly ch.8, Compléments Déf. 4.1',
  },
])

const chapter: Chapter = {
  number: 8,
  slug: 'ch8',
  title: 'Introduction à l’apprentissage statistique',
  summary:
    'On ne cherche plus à estimer un paramètre mais une **règle de prédiction** $g:\\mathsf{X}\\to\\mathsf{Y}$, jugée par son **risque** $R(g)=\\mathbb{E}[\\ell(Y,g(\\mathbf{X}))]$ sous une loi $\\mathbb{P}$ inconnue du couple $(\\mathbf{X},Y)$. Si $\\mathbb{P}$ était connue, la règle optimale serait l’**espérance conditionnelle** $\\mathbb{E}[Y\\mid\\mathbf{X}]$ (perte quadratique, Th. 1.1) ou le **classifieur de Bayes** $g^\\star=2\\,\\mathbb{1}_{\\{\\eta\\ge1/2\\}}-1$ (perte 0–1, Th. 1.2), avec la formule d’**excès de risque** $\\mathbb{E}[|2\\eta(\\mathbf{X})-1|\\mathbb{1}_{\\{g\\ne g^\\star\\}}]$ et le **risque bayésien** $\\mathbb{E}[\\min(\\eta,1-\\eta)]$. Comme $\\mathbb{P}$ est inconnue, on **modélise** la loi, on estime le paramètre et on substitue (règle *plug-in* : LDA, QDA, logistique, linéaire gaussien) ; si le modèle est bien spécifié, l’excès de risque moyen tend vers 0 (Prop. 1.5, via $R(\\tilde g)-R^\\star\\le2\\,\\mathbb{E}|\\eta-\\tilde\\eta|$). C’est un problème entier de l’examen (Examen 2025 Ex. 3, CC 2022 Ex. 5) dont les premières questions sont du cours récité.',
  examWeight: 5,
  prerequisites: ['ch1'],
  pcs: ['PC8'],
  course,
  vizs,
  exercises,
  flashcards,
  summarySheet,
  monteCarlo,
}

export default chapter
