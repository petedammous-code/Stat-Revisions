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
    key: 'ch9-risque',
    tex: ['R(g)', 'R(\\hat g^*_{n,\\mathcal C})', 'R(\\widehat g_n)'],
    name: 'Risque (de généralisation)',
    definition: '$R(g)=\\mathbb E[\\ell(Y,g(\\mathbf X))]$ pour une règle $g$ fixée ; pour une règle apprise, $R(\\widehat g_n)=\\mathbb E[\\ell(Y,\\widehat g_n(\\mathbf X))\\mid\\mathcal D_n]$ est une variable aléatoire (calcul à $\\mathcal D_n$ gelé).',
    source: 'Poly ch.9, §1.1',
  },
  {
    key: 'ch9-risque-empirique',
    tex: ['\\widehat{\\mathrm R}_n(g)', '\\widehat{\\mathrm R}_n', '\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})', 'R_n(g)'],
    name: 'Risque empirique',
    definition: '$\\widehat{\\mathrm R}_n(g)=\\frac1n\\sum_{i=1}^n\\ell(Y_i,g(\\mathbf X_i))$ : sans biais et convergent pour $g$ **fixée**, biaisé vers le bas pour le MRE (Prop. 1.1). La PC9 le note $R_n(g)$.',
    source: 'Poly ch.9, Déf. 1.1',
  },
  {
    key: 'ch9-mre',
    tex: ['\\hat g^*_{n,\\mathcal C}', '\\hat g^*_n'],
    name: 'Minimiseur du risque empirique (MRE)',
    definition: '$\\hat g^*_{n,\\mathcal C}=\\arg\\min_{g\\in\\mathcal C}\\widehat{\\mathrm R}_n(g)$, règle de la classe choisie au vu des données (astérisque : objet de la classe).',
    source: 'Poly ch.9, Déf. 1.1',
  },
  {
    key: 'ch9-oracle',
    tex: ['g^*_{\\mathcal C}', 'g^\\star_{\\mathcal C}'],
    name: 'Oracle de la classe',
    definition: 'Règle $g^*_{\\mathcal C}\\in\\mathcal C$ telle que $R(g^*_{\\mathcal C})=\\inf_{g\\in\\mathcal C}R(g)$ ; non calculable ($\\mathbb P$ inconnue). La PC9 la note $g^\\star_{\\mathcal C}$.',
    source: 'Poly ch.9, §1.2, éq. (1)',
  },
  {
    key: 'ch9-bayes',
    tex: ['g^\\star', 'R^\\star', 'R^*'],
    name: 'Prédicteur et risque bayésiens',
    definition: '$g^\\star$ minimise le risque parmi **toutes** les règles ; $R^\\star=R(g^\\star)$. En classification binaire : $g^\\star=2\\mathbf{1}_{\\{\\eta\\ge1/2\\}}-1$ (étoile pleine : objet bayésien).',
    source: 'Poly ch.9, §1.1 (rappels du ch.8)',
  },
  {
    key: 'ch9-classe',
    tex: ['\\mathcal C', '|\\mathcal C|'],
    name: 'Classe de règles',
    definition: 'Ensemble $\\mathcal C$ de règles de décision dans lequel on minimise le risque empirique ; son choix « joue le rôle du choix du modèle ». $|\\mathcal C|$ : cardinal (classe finie).',
    source: 'Poly ch.9, Déf. 1.1',
  },
  {
    key: 'ch9-Dn',
    tex: ['\\mathcal D_n'],
    name: 'Ensemble d’apprentissage',
    definition: '$\\mathcal D_n=\\{(\\mathbf X_1,Y_1),\\dots,(\\mathbf X_n,Y_n)\\}$, $n$ couples indépendants de loi $\\mathbb P$ (à ne pas confondre avec le nombre $D_n=\\sum(b_i-a_i)^2$ du Th. 2.1).',
    source: 'Poly ch.9, §1.1',
  },
  {
    key: 'ch9-erreur-estimation',
    tex: ['\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})', '\\mathcal E^{\\mathcal C}_{\\mathrm{est}}', '\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g_{n,\\mathcal C})'],
    name: 'Erreur d’estimation',
    definition: '$\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g_{n,\\mathcal C})=R(\\hat g_{n,\\mathcal C})-R(g^*_{\\mathcal C})\\ge0$ : aléatoire ; tend à croître avec $\\mathcal C$ et à décroître avec $n$.',
    source: 'Poly ch.9, éq. (1)',
  },
  {
    key: 'ch9-exces',
    tex: ['\\mathcal E(\\widehat g_n)', '\\mathcal E(\\hat g_{n,\\mathcal C})'],
    name: 'Excès de risque',
    definition: '$\\mathcal E(\\widehat g_n)=R(\\widehat g_n)-R^\\star$ = erreur d’estimation + erreur d’approximation $R(g^*_{\\mathcal C})-R^\\star$ (éq. (1)).',
    source: 'Poly ch.9, §1.1 et éq. (1)',
  },
  {
    key: 'ch9-eta',
    tex: ['\\eta(\\mathbf x)', '\\eta(\\mathbf X)', '\\eta(x)', '\\eta(X)'],
    name: 'Fonction de régression (classification)',
    definition: '$\\eta(\\mathbf x)=\\mathbb P(Y=1\\mid\\mathbf X=\\mathbf x)$ ; le classifieur bayésien prédit $1$ si $\\eta\\ge1/2$.',
    source: 'Poly ch.9, §1.1',
  },
  {
    key: 'ch9-sousgauss',
    tex: ['\\mathcal G(v)', '\\psi_X(\\lambda)', '\\psi_X'],
    name: 'Variable sous-gaussienne',
    definition: '$X\\in\\mathcal G(v)$ : $X$ centrée et $\\psi_X(\\lambda)=\\log\\mathbb E[e^{\\lambda X}]\\le\\lambda^2v/2$ pour tout $\\lambda\\in\\mathbb R$ ; alors $\\mathbb P(\\pm X\\ge t)\\le e^{-t^2/(2v)}$.',
    source: 'Poly ch.9, Outils Déf. 2.1',
  },
  {
    key: 'ch9-phi1',
    tex: ['\\varphi_1'],
    name: 'Perte 0-1 en fonction de la marge',
    definition: '$\\varphi_1=\\mathbf{1}_{[0,+\\infty[}$, évaluée en $z=-y\\,h(\\mathbf x)$ ; $\\mathbf{1}_{\\{\\operatorname{signe}(h(\\mathbf x))\\ne y\\}}\\le\\varphi_1(-yh(\\mathbf x))$ (éq. (4)).',
    source: 'Poly ch.9, §1.4',
  },
  {
    key: 'ch9-phirisque',
    tex: ['R_\\varphi(h)', '\\widehat{\\mathrm R}_{n,\\varphi}(h)', 'R_\\varphi'],
    name: 'φ-risque',
    definition: '$R_\\varphi(h)=\\mathbb E[\\varphi(-Yh(\\mathbf X))]$ et sa version empirique $\\widehat{\\mathrm R}_{n,\\varphi}(h)=\\frac1n\\sum_i\\varphi(-Y_ih(\\mathbf X_i))$ ; majore le risque 0-1 du classifieur dur (Prop. 1.3).',
    source: 'Poly ch.9, Déf. 1.3',
  },
  {
    key: 'ch9-rayon-knn',
    tex: ['\\mathfrak R_k(x)', '\\mathfrak R_k', '\\hat\\eta_{n,k}(x)', '\\hat\\eta_{n,k}'],
    name: 'k plus proches voisins (Examen 2025)',
    definition: '$\\mathfrak R_k(x)$ : distance de $x$ à son $k$-ième plus proche voisin ; $\\hat\\eta_{n,k}(x)=\\frac1k\\sum_{i\\in N_k(x)}\\mathbf 1\\{Y_i=1\\}$, classifieur plug-in $2\\mathbf 1\\{\\hat\\eta_{n,k}\\ge1/2\\}-1$.',
    source: 'Examen 2025 Ex. 3',
  },
], 'ch9')

const chapter: Chapter = {
  number: 9,
  slug: 'ch9',
  title: 'Approche discriminative et minimisation du risque empirique',
  summary:
    'Au lieu de modéliser la loi des données, on choisit une **classe** $\\mathcal C$ de règles et l’on minimise le **risque empirique** $\\widehat{\\mathrm R}_n(g)=\\frac1n\\sum_i\\ell(Y_i,g(\\mathbf X_i))$. L’excès de risque se décompose en **erreur d’approximation** (déterministe, décroissante avec la classe) et **erreur d’estimation** (aléatoire, croissante avec la classe, décroissante avec $n$) : c’est le compromis sous-/sur-apprentissage, arbitré en pratique par **validation**. Le *no free lunch* interdit toute garantie sans hypothèse. Le Th. 1.2 ramène l’erreur d’estimation au **processus empirique** $\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$, contrôlé pour une classe finie par **Hoeffding + borne de l’union** (et Pisier en espérance) : bornes en $\\sqrt{\\log|\\mathcal C|/n}$. Enfin, la perte 0-1 rend la minimisation combinatoire : on la **convexifie** (charnière, logistique). À l’examen : Examen 2025 Ex. 3 Q8–Q9 (biais / variance des $k$ plus proches voisins, choix de $k$, fléau de la dimension).',
  examWeight: 3,
  prerequisites: ['ch8'],
  pcs: ['PC9'],
  course,
  vizs,
  exercises,
  flashcards,
  summarySheet,
  monteCarlo,
}

export default chapter
