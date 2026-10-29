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
    key: 'Cfamille',
    tex: ['\\mathcal{C}'],
    name: 'Famille de lois du modèle',
    definition: 'Famille de probabilités sur l’espace des observations $(\\mathsf{Z},\\mathcal{Z})$ ; dans le cas paramétrique $\\mathcal{C}=\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\}$. Par abus de langage, « le modèle ».',
    source: 'Poly ch.1, Déf. 1.1',
  },
  {
    key: 'espaceObs',
    tex: ['(\\mathsf{Z},\\mathcal{Z})', '\\mathsf{Z}', '\\mathcal{Z}'],
    name: 'Espace des observations',
    definition: 'Espace mesurable dans lequel vit l’observation $Z=(X_1,\\dots,X_n)$ : l’ensemble $\\mathsf{Z}$ (lettre sans empattement) et sa tribu $\\mathcal{Z}$ (lettre calligraphique).',
    source: 'Poly ch.1, §1.2 et Déf. 1.1',
  },
  {
    key: 'densiteMesure',
    tex: ['p\\cdot\\mu', 'p_\\theta\\cdot\\mu', 'q_\\theta\\cdot\\mathrm{Leb}', 'p_\\theta\\cdot\\mathrm{Leb}', 'p_\\theta\\cdot\\mathrm{Leb}^{\\otimes n}'],
    name: 'Mesure de densité p par rapport à μ',
    definition: '$(p\\cdot\\mu)(A)=\\int_Ap\\,\\mathrm{d}\\mu$. Dire que le modèle est dominé par $\\mu$ ($\\sigma$-finie), c’est dire que chaque loi s’écrit $\\mathbb{P}=p\\cdot\\mu$.',
    source: 'Poly ch.1, Déf. 1 et Déf. 14',
  },
  {
    key: 'Leb',
    tex: ['\\mathrm{Leb}', '\\mathrm{Leb}^{\\otimes n}'],
    name: 'Mesure de Lebesgue',
    definition: 'Mesure de Lebesgue sur $\\mathbb{R}$ ($\\mathrm{Leb}^{\\otimes n}$ sur $\\mathbb{R}^n$) : mesure de référence des lois « à densité » ; les lois discrètes sont dominées par la mesure de comptage.',
    source: 'Poly ch.1, Ex. 1.5',
  },
  {
    key: 'loiImage',
    tex: ['\\mathbb{P}^T', '\\mathbb{P}_\\theta^T', '\\mathcal{C}^T'],
    name: 'Loi image par la statistique T',
    definition: '$\\mathbb{P}^T(A)=\\mathbb{P}(T\\in A)$ ; $\\mathcal{C}^T=\\{\\mathbb{P}^T,\\ \\mathbb{P}\\in\\mathcal{C}\\}$ et $(\\mathsf{T},\\mathcal{T},\\mathcal{C}^T)$ est le modèle induit par $T$.',
    source: 'Poly ch.1, Déf. 5',
  },
  {
    key: 'Qotimes',
    tex: ['\\mathbb{Q}^{\\otimes n}', '\\mathbb{Q}_\\theta^{\\otimes n}', '\\mathcal{X}^{\\otimes n}'],
    name: 'Loi produit, tribu produit',
    definition: '$\\mathbb{Q}^{\\otimes n}$ : mesure produit de $n$ copies de $\\mathbb{Q}$, loi d’un $n$-échantillon i.i.d. de loi $\\mathbb{Q}$ ; $\\mathcal{X}^{\\otimes n}$ : tribu produit, engendrée par les pavés.',
    source: 'Poly ch.1, Déf. 6 et Outils',
  },
  {
    key: 'modeleQ',
    tex: ['\\mathbb{Q}', '\\mathbb{Q}_\\theta'],
    name: 'Loi d’une observation',
    definition: 'Loi d’une seule observation dans le modèle de base $(\\mathsf{X},\\mathcal{X},\\mathcal{C})$ ; la loi de l’échantillon est $\\mathbb{P}=\\mathbb{Q}^{\\otimes n}$.',
    source: 'Poly ch.1, Déf. 6',
  },
  {
    key: 'statOrdre',
    tex: ['X_{(k)}', 'X_{(n)}', 'X_{(1)}', 'X_{k:n}'],
    name: 'Statistique d’ordre',
    definition: '$X_{(1)}\\le\\dots\\le X_{(n)}$ (aussi notées $X_{1:n}\\le\\dots\\le X_{n:n}$) : réarrangement croissant des observations ; $X_{(1)}=\\min$, $X_{(n)}=\\max$. Application 1-lipschitzienne pour $\\|\\cdot\\|_\\infty$, donc statistique.',
    source: 'Poly ch.1, Ex. 1.8 ; PC3 Ex. 5',
  },
  {
    key: 'projPF',
    tex: ['P_F', 'P_{F^\\perp}', 'P_{F_i}'],
    name: 'Projection orthogonale',
    definition: 'Matrice de la projection orthogonale sur le sous-espace $F$ : symétrique et idempotente ($P_F^\\top=P_F$, $P_F^2=P_F$). Dans Gosset, $F=\\mathbb{R}\\mathbf{1}_n$ et $P_F=\\frac1n\\mathbf{1}_n\\mathbf{1}_n^\\top$.',
    source: 'Poly ch.1, Thm 1.1',
  },
  {
    key: 'unVec',
    tex: ['\\mathbf{1}_n', '\\mathrm{I}_n'],
    name: 'Vecteur constant, matrice identité',
    definition: '$\\mathbf{1}_n=(1,\\dots,1)^\\top\\in\\mathbb{R}^n$ (en gras) et $\\mathrm{I}_n$ la matrice identité ; $\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n)$ est la loi d’un $n$-échantillon gaussien.',
    source: 'Poly ch.1, Ex. 1.2',
  },
  {
    key: 'chi2',
    tex: ['\\chi^2(\\nu)', '\\chi^2(n-1)', '\\chi^2(d)', '\\chi^2(k)', '\\chi^2(1)'],
    name: 'Loi du khi-deux',
    definition: 'Loi de $\\sum_{i=1}^\\nu X_i^2$ pour $X_i$ i.i.d. $\\mathcal{N}(0,1)$ ; c’est $\\mathrm{Gamma}(\\nu/2,1/2)$, d’espérance $\\nu$ et de variance $2\\nu$ ; $\\chi^2(0)=\\delta_0$.',
    source: 'Poly ch.1, Déf. 11 et Prop. 2.8',
  },
  {
    key: 'student',
    tex: ['t(r)', 't(n-1)'],
    name: 'Loi de Student',
    definition: 'Loi de $X/\\sqrt{Y/r}$ avec $X\\sim\\mathcal{N}(0,1)$ et $Y\\sim\\chi^2(r)$ **indépendantes** ; symétrique, queues polynomiales ; $t(1)$ est la loi de Cauchy ; $t(r)\\to\\mathcal{N}(0,1)$ quand $r\\to\\infty$.',
    source: 'Poly ch.1, Déf. 12',
  },
  {
    key: 'gammaLoi',
    tex: ['\\mathrm{Gamma}(p,\\lambda)', '\\mathrm{Gamma}(p)', '\\Gamma(n,\\lambda)', '\\Gamma(a,b)'],
    name: 'Loi Gamma (forme p, intensité λ)',
    definition: 'Densité $\\frac{\\lambda^p}{\\Gamma(p)}e^{-\\lambda x}x^{p-1}$ sur $\\mathbb{R}_+^*$ ; espérance $p/\\lambda$, variance $p/\\lambda^2$ ; $\\mathcal{E}(\\lambda)=\\mathrm{Gamma}(1,\\lambda)$ ; additivité en $p$ à $\\lambda$ fixé. Convention du poly et de l’Examen 2025 (intensité) ; le CC 2022 utilise l’échelle.',
    source: 'Poly ch.1, Outils p. 25 et 30',
  },
  {
    key: 'expLoi',
    tex: ['\\mathcal{E}(\\lambda)', '\\mathcal{E}(\\theta)'],
    name: 'Loi exponentielle (intensité)',
    definition: 'Densité $\\lambda e^{-\\lambda x}\\mathbb{1}_{\\mathbb{R}_+}(x)$, moyenne $1/\\lambda$ ; sans mémoire : $\\mathbb{P}(X\\ge a+b\\mid X\\ge a)=\\mathbb{P}(X\\ge b)$.',
    source: 'Poly ch.1, Ex. 1.3 et Outils p. 25',
  },
  {
    key: 'vecGauss',
    tex: ['\\mathcal{N}(\\mu,\\Sigma)', '\\mathcal{N}(0,\\mathrm{I}_n)', '\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n)'],
    name: 'Vecteur gaussien',
    definition: '$X$ est gaussien si toute combinaison linéaire $t^\\top X$ est gaussienne (éventuellement dégénérée) ; loi notée $\\mathcal{N}(\\mu,\\Sigma)$, caractérisée par $\\mathbb{E}[e^{it^\\top X}]=\\exp(it^\\top\\mu-\\frac12t^\\top\\Sigma t)$.',
    source: 'Poly ch.1, Déf. 10 et Prop. 2.3',
  },
  {
    key: 'jacob',
    tex: ['J_\\phi', 'J_{\\phi^{-1}}', 'J_{\\phi^{-1}}(u)'],
    name: 'Matrice jacobienne du changement de variables',
    definition: 'Matrice des dérivées partielles de $\\phi$ ; dans la formule du changement de variables, $q(u)=\\mathbb{1}_{\\phi(O)}(u)\\,p(\\phi^{-1}(u))\\,|\\mathrm{Det}\\,J_{\\phi^{-1}}(u)|$.',
    source: 'Poly ch.1, Prop. 2.2',
  },
  {
    key: 'RR',
    tex: ['\\mathrm{RR}_i', '\\overline{\\mathrm{RR}}_n'],
    name: 'Réponse randomisée',
    definition: '$\\mathrm{RR}_i=U_iX_i+(1-U_i)(1-X_i)$ avec $U_i\\sim\\mathcal{B}\\mathrm{er}(q)$ indépendante de $X_i$ : vraie réponse si $U_i=1$, réponse inversée sinon ; $\\overline{\\mathrm{RR}}_n$ est leur moyenne.',
    source: 'Poly ch.1, §1.8',
  },
  {
    key: 'absCont',
    tex: ['\\mu\\ll\\mu\'', '\\nu\\ll\\mu'],
    name: 'Absolue continuité',
    definition: '$\\nu\\ll\\mu$ : tout ensemble $\\mu$-négligeable est $\\nu$-négligeable ; par Radon–Nikodym ($\\mu$ $\\sigma$-finie), équivaut à l’existence d’une densité $\\nu=f\\cdot\\mu$.',
    source: 'Poly ch.1, Déf. 14 et Thm 2.1',
  },
], 'ch1')

const chapter: Chapter = {
  number: 1,
  slug: 'ch1',
  title: 'Modèles statistiques',
  summary:
    'Le chapitre pose le **vocabulaire** de tout le cours : un modèle statistique $(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$ est un espace d’observations et une famille de lois candidates ; il est **paramétrique** si $\\mathcal{C}=\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\}$, **dominé** si toutes les lois ont une densité par rapport à une même mesure $\\sigma$-finie, **identifiable** si $\\theta\\mapsto\\mathbb{P}_\\theta$ est injective. Une **statistique** est une fonction mesurable des seules observations ; elle induit un modèle dont on calcule les lois par la **fonction muette** et le **changement de variables**. Le **$n$-échantillon** formalise les observations i.i.d. (densité produit). Les théorèmes de **Cochran** et de **Gosset** ($\\bar X_n\\perp S_n^2$, $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$, Student) sont les outils de tous les exercices gaussiens. À l’examen : changement de variables (loi de $X^c$, de $\\ln X$), statistiques d’ordre, Gosset/Cochran (CC 2022 Ex. 1–4 ; Examen 2025 Ex. 2 Q1, Q3–5, Ex. 3 Q6).',
  examWeight: 3,
  prerequisites: [],
  pcs: ['PC1'],
  course,
  vizs,
  exercises,
  flashcards,
  summarySheet,
  monteCarlo,
}

export default chapter
