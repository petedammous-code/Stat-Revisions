import type { CourseSection } from '../types'

/** Sections 1 à 4 : intuition et notations, risque empirique et MRE, compromis approximation / estimation, processus empirique. */
export const coursePart1: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 1. Intuition et notations
  // -------------------------------------------------------------------------
  {
    id: 'ch9-s1-intuition',
    title: '1. Intuition et notations : de la modélisation à la minimisation du risque empirique',
    role: 'intuition',
    intro:
      'Le chapitre 8 a construit des règles de prédiction en **modélisant** la loi des données puis en substituant un estimateur dans la règle de Bayes. Le chapitre 9 étudie la **seconde voie, dite discriminative**, « approche principale de l’apprentissage statistique » : on ne modélise plus la loi ; on choisit une **classe** $\\mathcal C$ de règles et une **perte**, et l’on retient la règle de la classe qui commet la plus petite perte moyenne sur l’ensemble d’apprentissage. Toute la difficulté est de contrôler ce que l’on perd en choisissant la règle **au vu des données**.',
    blocks: [
      {
        kind: 'text',
        id: 'ch9-s1-plan',
        title: 'De la modélisation à la MRE (Poly ch.9, introduction p. 5–6)',
        text: `Constat de départ (ch.8) : pour le modèle logistique et le modèle linéaire gaussien, l’EMV **minimise une moyenne empirique de pertes** (perte logistique, perte quadratique). La règle obtenue se décrit donc **sans référence au modèle** : c’est la règle d’une classe de fonctions linéaires qui minimise une perte moyenne sur l’ensemble d’apprentissage. L’approche discriminative part de là :

> « Le choix de la classe joue alors le rôle que jouait le choix du modèle : il porte l’hypothèse qui rend l’apprentissage possible. »

**Le passage d’une approche à l’autre déplace l’hypothèse** (p. 6). En modélisation, on suppose que la loi appartient à une famille paramétrique et l’on obtient des garanties **sous cette loi**. En MRE, on ne suppose rien sur la loi, mais on ne compare plus la règle apprise **qu’aux règles de la classe** ; l’écart à la règle de Bayes dépend alors de la qualité de la classe, « sur laquelle les données ne disent rien ».

**Plan du chapitre.** (i) Définition et exemples ; (ii) compromis : décomposition de l’excès de risque en **erreur d’approximation + erreur d’estimation**, sur-apprentissage, *no free lunch* ; (iii) contrôle de l’erreur d’estimation par les **déviations uniformes** du risque empirique, elles-mêmes contrôlées pour une classe finie et la perte 0-1 par **Hoeffding + borne de l’union** : bornes d’ordre $\\sqrt{\\log|\\mathcal C|/n}$ en grande probabilité et en espérance ; (iv) **risque convexifié**, car la MRE pour la perte 0-1 est un problème combinatoire.`,
      },
      {
        kind: 'text',
        id: 'ch9-s1-notations',
        title: 'Notations du poly (à reproduire telles quelles)',
        text: `- **Gras / sans empattement** : la variable d’attributs aléatoire est en gras $\\mathbf X$ (réalisations $\\mathbf x$, $\\mathbf x_i$), la réponse $Y$ en italique ; les **ensembles** d’attributs et de réponses sont en sans-serif $\\mathsf X$, $\\mathsf Y$. Ne pas confondre $\\mathbf X$ (variable) et $\\mathsf X$ (ensemble).
- **Loi du couple** $(\\mathbf X,Y)\\sim\\mathbb P$, espérance $\\mathbb E$ ; en modélisation $\\{\\mathbb P_\\theta:\\theta\\in\\Theta\\}$, $\\mathbb P_{n,\\theta^\\star}$, $\\mathbb E_{n,\\theta^\\star}$ (notations du ch.8).
- **Règle** (prédicteur, classifieur) : $g:\\mathsf X\\to\\mathsf Y$ mesurable ; **perte** $\\ell(Y,g(\\mathbf X))$ ; **risque** $R(g)=\\mathbb E[\\ell(Y,g(\\mathbf X))]$ (R italique).
- **Ensemble d’apprentissage** $\\mathcal D_n=\\{(\\mathbf X_1,Y_1),\\dots,(\\mathbf X_n,Y_n)\\}$ ($n$ couples i.i.d. de loi $\\mathbb P$) ; **règle apprise** générique $\\widehat g_n$ (chapeau large).
- **Risque empirique** $\\widehat{\\mathrm R}_n(g)$ (R **droit**, chapeau large) ; risque de validation $\\widehat{\\mathrm R}^{(\\mathrm{val})}_n$ ; erreur de validation de la PC9 $\\widehat R_{n,m}$.
- **Deux étoiles différentes** : étoile pleine $\\star$ pour l’objet **bayésien** ($g^\\star$, $R^\\star=R(g^\\star)$, $\\theta^\\star$) ; astérisque $*$ pour l’**oracle de la classe** $g^*_{\\mathcal C}$ et le **minimiseur du risque empirique** $\\hat g^*_{n,\\mathcal C}$ (petit chapeau). Un estimateur quelconque de la classe est noté $\\hat g_{n,\\mathcal C}$ (sans étoile).
- **Excès de risque** $\\mathcal E(\\widehat g_n):=R(\\widehat g_n)-R^\\star$ (E calligraphique) ; **erreur d’estimation** $\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g_{n,\\mathcal C}):=R(\\hat g_{n,\\mathcal C})-R(g^*_{\\mathcal C})$.
- **Classification binaire** : $\\mathsf Y=\\{-1,1\\}$, $\\eta(\\mathbf x)=\\mathbb P(Y=1\\mid\\mathbf X=\\mathbf x)$, perte 0-1 $\\ell(y,y')=\\mathbf{1}_{\\{y\\ne y'\\}}$ ; $\\operatorname{signe}(t)=2\\operatorname{heaviside}(t)-1$ avec $\\operatorname{heaviside}(t)=\\mathbf{1}_{\\{t>0\\}}$, donc $\\operatorname{signe}(0)=-1$.
- **Concentration** : $\\varepsilon$ précision, $\\delta$ confiance (probabilité d’échec), $|\\mathcal C|$ cardinal de la classe ; $\\mathcal G(v)$ variables sous-gaussiennes de facteur $v$, $\\psi_X(\\lambda)=\\log\\mathbb E[e^{\\lambda X}]$ ; $S_n=\\sum_i\\{X_i-\\mathbb E[X_i]\\}$ et $D_n=\\sum_i(b_i-a_i)^2$ (un **nombre**, à ne pas confondre avec l’échantillon $\\mathcal D_n$).
- **Convexification** : classifieur doux $h:\\mathsf X\\to\\mathbb R$, marge $Y\\,h(\\mathbf X)$, perte $\\varphi$ de la variable $z=-y\\,h(\\mathbf x)$, $\\varphi_1:=\\mathbf{1}_{[0,+\\infty[}$, $\\varphi$-risque $R_\\varphi(h)$ et $\\varphi$-risque empirique $\\widehat{\\mathrm R}_{n,\\varphi}(h)$.
- $\\log$ = logarithme népérien (le poly écrit aussi $\\ln$) ; $\\log_2$ seulement dans la perte logistique. Intervalles à la française $]a,b[$.`,
      },
      {
        kind: 'text',
        id: 'ch9-s1-cadre',
        title: 'Rappel du cadre de l’apprentissage supervisé (§1.1, p. 7)',
        text: `On reprend le cadre 1.1 du ch.8 : $(\\mathbf X,Y)\\sim\\mathbb P$ à valeurs dans $\\mathsf X\\times\\mathsf Y$, règle $g$, perte $\\ell$, risque $R(g)=\\mathbb E[\\ell(Y,g(\\mathbf X))]$, prédicteur bayésien $g^\\star$ ($R(g^\\star)\\le R(g)$ pour toute $g$) et risque bayésien $R^\\star=R(g^\\star)$. En régression (perte quadratique) $g^\\star(\\mathbf X)=\\mathbb E[Y\\mid\\mathbf X]$ ; en classification binaire (perte 0-1) $g^\\star(\\mathbf X)=2\\mathbf{1}_{\\{\\eta(\\mathbf X)\\ge1/2\\}}-1$ (Thm 1.1 et 1.2 du ch.8).

On observe $\\mathcal D_n$ et l’on construit $\\widehat g_n$. Objectif : contrôler l’**excès de risque de généralisation**

$$\\mathcal E(\\widehat g_n):=R(\\widehat g_n)-R^\\star=\\mathbb E\\big[\\ell(Y,\\widehat g_n(\\mathbf X))\\,\\big|\\,\\mathcal D_n\\big]-R^\\star,$$

où $(\\mathbf X,Y)\\sim\\mathbb P$ est **indépendant de $\\mathcal D_n$**. $R(\\widehat g_n)$ est une **variable aléatoire** (fonction de $\\mathcal D_n$) : on la calcule en « gelant » $\\mathcal D_n$, c’est-à-dire en calculant $R(g)$ pour une règle fixée puis en remplaçant $g$ par $\\widehat g_n$ (Prop. 2.5 du ch.8, rappelée en Outils §2.8). Son espérance $\\mathbb E[R(\\widehat g_n)]$ est le **risque moyen**.`,
      },
      {
        kind: 'theorem',
        id: 'ch9-meth-1-1',
        type: 'methode',
        label: 'Méthode 1.1',
        title: 'Construction d’un estimateur par modélisation statistique et substitution (rappel)',
        source: 'Poly ch.9, Méthode 1.1, p. 8',
        hypotheses: ['Cadre supervisé ; approche du ch.8 (Section 1.3).'],
        statement: `1. On **modélise** la loi de $(\\mathbf X,Y)$ par un modèle paramétrique $\\{\\mathbb P_\\theta:\\theta\\in\\Theta\\}$.
2. On calcule le prédicteur de Bayes $g^\\star_\\theta$ sous chacune des lois $\\mathbb P_\\theta$.
3. On estime $\\theta$ par $\\hat\\theta_n$.
4. On choisit la règle $\\widehat g_n=g^\\star_{\\hat\\theta_n}$ (substitution, ou *plug-in*).

Exemples (ch.8, Section 1.3) : analyse discriminante linéaire et quadratique ($\\mathbf X\\mid Y=i\\sim\\mathcal N(\\mu_i,\\Sigma_i)$) ; **modèle logistique** $\\mathbb P_\\theta(Y=1\\mid\\mathbf X)=\\operatorname{sigm}(\\theta^\\top\\mathbf X)$, dont l’EMV conditionnel est

$$\\hat\\theta_n=\\arg\\min_{\\theta\\in\\mathbb R^d}\\frac1n\\sum_{i=1}^n\\log\\big(1+\\exp(-Y_i\\theta^\\top\\mathbf X_i)\\big) ;$$

**modèle linéaire gaussien homoscédastique** $\\mathcal L(Y\\mid\\mathbf X)=\\mathcal N(\\theta^\\top\\mathbf X,\\sigma^2)$, dont l’EMV est celui des moindres carrés $\\hat\\theta_n=\\arg\\min_\\theta\\frac1n\\sum_i(\\theta^\\top\\mathbf X_i-Y_i)^2$ (« utiliser ce modèle revient à utiliser la perte des moindres carrés et une classe de fonctions linéaires ») ; classifieur bayésien naïf ; $k$ plus proches voisins.

Résultat typique (Prop. 1.5 du ch.8, PC8 Ex. 2) : sous $\\mathbb P_{n,\\theta^\\star}$, si $\\hat\\theta_n$ est consistant et sous des conditions de continuité, $\\mathbb E_{n,\\theta^\\star}\\big[R(g^\\star_{\\hat\\theta_n})-R(g^\\star_{\\theta^\\star})\\big]\\to0$.`,
        intuition: 'La règle est un **sous-produit** de l’estimation : toute la garantie repose sur le modèle.',
        pitfalls: ['Ce résultat ne tient que **sous le modèle** : il laisse entier le problème du **choix du modèle**.'],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 2. Risque empirique et MRE
  // -------------------------------------------------------------------------
  {
    id: 'ch9-s2-mre',
    title: '2. Risque empirique, minimiseur du risque empirique, sur-apprentissage et validation',
    role: 'definitions',
    intro:
      'Idée (§1.2, p. 8) : chercher une règle qui soit bonne sur l’ensemble d’apprentissage. Le risque d’une règle n’est pas calculable ($\\mathbb P$ est inconnue), mais on peut l’**estimer** à partir des données et **minimiser cette estimation**. Encore faut-il restreindre la classe : sans restriction, on minimise le risque empirique « sans rien apprendre ».',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch9-def-1-1',
        type: 'definition',
        label: 'Définition 1.1',
        title: 'Risque empirique et minimiseur du risque empirique (MRE)',
        source: 'Poly ch.9, Déf. 1.1, p. 8–9',
        hypotheses: [
          '$\\ell$ fonction de perte (positive) ; $\\mathcal C$ classe de règles de décision $g:\\mathsf X\\to\\mathsf Y$.',
          '$\\mathcal D_n=\\{(\\mathbf X_i,Y_i)\\}_{1\\le i\\le n}$ : $n$ couples indépendants de loi $\\mathbb P$.',
          'Hypothèses faites dans tout le chapitre : un minimiseur **existe** et peut être choisi **de façon mesurable** en les données (vrai si $\\mathcal C$ est finie ; admis en général, Outils §2.10).',
        ],
        statement: `Le **risque empirique** d’une règle $g$ sur $\\mathcal D_n$ est

$$\\widehat{\\mathrm R}_n(g):=\\frac1n\\sum_{i=1}^n\\ell(Y_i,g(\\mathbf X_i)).$$

Un **minimiseur du risque empirique** sur $\\mathcal C$ est une règle $\\hat g^*_{n,\\mathcal C}\\in\\mathcal C$, construite à partir de $\\mathcal D_n$, telle que

$$\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})=\\min_{g\\in\\mathcal C}\\widehat{\\mathrm R}_n(g),$$

ce que l’on écrit $\\hat g^*_{n,\\mathcal C}=\\arg\\min_{g\\in\\mathcal C}\\widehat{\\mathrm R}_n(g)$.

Le minimum n’est pas toujours atteint et le minimiseur n’est pas toujours unique ; s’il y en a plusieurs, on en considère un. On écrit $\\hat g^*_{n,\\mathcal C}(\\mathbf x)=g(\\mathbf x;\\mathcal D_n)$ : c’est une règle apprise au sens du ch.8.

**Pourquoi c’est raisonnable** : pour toute règle $g$ **fixée** avec $R(g)<\\infty$, $\\widehat{\\mathrm R}_n(g)$ est un estimateur **sans biais** et **convergent** de $R(g)$.`,
        intuition: '« L’hypothèse “$g$ fixée” est essentielle » (p. 9). Le minimiseur est choisi au vu des données : chacun des termes $\\ell(Y_i,\\hat g^*_{n,\\mathcal C}(\\mathbf X_i))$ dépend de **tout l’échantillon**, et $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})$ n’est plus une moyenne de variables i.i.d. « Toute la suite du chapitre consiste à mesurer ce que l’on perd en passant d’une règle fixée à une règle choisie dans $\\mathcal C$ à partir des données. »',
        proof: [
          {
            text: '$\\mathbb E[\\widehat{\\mathrm R}_n(g)]=\\frac1n\\sum_{i=1}^n\\mathbb E[\\ell(Y_i,g(\\mathbf X_i))]=\\frac1n\\sum_{i=1}^nR(g)=R(g)$.',
            justification: 'Linéarité de l’espérance ; chaque $(\\mathbf X_i,Y_i)$ a la loi $\\mathbb P$ et $g$ est **fixée** (ne dépend pas des données).',
          },
          {
            text: 'Les variables $\\ell(Y_i,g(\\mathbf X_i))$, $i=1,\\dots,n$, sont indépendantes, de même loi, positives et intégrables (car $R(g)<\\infty$).',
            justification: 'Images des couples i.i.d. $(\\mathbf X_i,Y_i)$ par la même fonction mesurable $(\\mathbf x,y)\\mapsto\\ell(y,g(\\mathbf x))$.',
          },
          {
            text: 'Donc $\\widehat{\\mathrm R}_n(g)\\xrightarrow{\\mathbb P\\text{-prob}}R(g)$.',
            justification: 'Loi des grands nombres faible pour des v.a. i.i.d. intégrables (Thm 2.1 du ch.7).',
          },
        ],
        pitfalls: [
          'Écrire $\\mathbb E[\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})]=R(\\hat g^*_{n,\\mathcal C})$ : **faux** (biais optimiste, Prop. 1.1).',
          'Confondre le MRE $\\hat g^*_{n,\\mathcal C}$ (calculable) et l’oracle $g^*_{\\mathcal C}$ (meilleure règle de la classe, non calculable car $\\mathbb P$ est inconnue).',
        ],
      },
      {
        kind: 'example',
        id: 'ch9-ex-1-1',
        title: 'Exemple 1.1 — Une règle qui ne généralise pas',
        source: 'Poly ch.9, Ex. 1.1, p. 9 et Fig. 2',
        setup: 'Régression, $\\mathsf Y=\\mathbb R$, perte quadratique, $\\mathcal C=\\mathbb R^{\\mathsf X}$ (toutes les règles). La loi de $\\mathbf X$ **n’a pas d’atome** : $\\mathbb P(\\mathbf X=\\mathbf x)=0$ pour tout $\\mathbf x$. On considère $\\hat g^*_{n,\\mathcal C}(\\mathbf x)=Y_i$ si $\\mathbf x=\\mathbf X_i$, et $0$ si $\\mathbf x\\notin\\{\\mathbf X_1,\\dots,\\mathbf X_n\\}$.',
        steps: [
          {
            text: 'Les $\\mathbf X_i$ sont presque sûrement deux à deux distincts, donc la règle est bien définie p.s.',
            justification: 'Pas d’atome : $\\mathbb P(\\mathbf X_i=\\mathbf X_j)=0$ pour $i\\ne j$ (conditionner par $\\mathbf X_j$, indépendant de $\\mathbf X_i$).',
          },
          {
            text: '$\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})=\\frac1n\\sum_i(Y_i-Y_i)^2=0$ : c’est un MRE sur $\\mathbb R^{\\mathsf X}$.',
            justification: 'Une perte positive a un risque empirique $\\ge0$ : la valeur $0$ est le minimum possible.',
          },
          {
            text: 'Pour $(\\mathbf X,Y)\\sim\\mathbb P$ indépendant de $\\mathcal D_n$, $\\mathbb P(\\mathbf X\\in\\{\\mathbf X_1,\\dots,\\mathbf X_n\\}\\mid\\mathcal D_n)=0$, donc $\\hat g^*_{n,\\mathcal C}(\\mathbf X)=0$ p.s.',
            justification: 'À $\\mathcal D_n$ gelé, l’ensemble $\\{\\mathbf X_1,\\dots,\\mathbf X_n\\}$ est fini et la loi de $\\mathbf X$ ne charge aucun point.',
          },
          {
            text: '$R(\\hat g^*_{n,\\mathcal C})=\\mathbb E\\big[(Y-\\hat g^*_{n,\\mathcal C}(\\mathbf X))^2\\mid\\mathcal D_n\\big]=\\mathbb E[Y^2]$.',
            justification: 'Calcul à $\\mathcal D_n$ gelé (Prop. 2.5 du ch.8) : c’est le risque de la **règle constante nulle**.',
          },
        ],
        conclusion: '$\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})=0\\ll R(\\hat g^*_{n,\\mathcal C})=\\mathbb E[Y^2]$ : la règle « ne dit rien des attributs qui n’ont pas été observés ». C’est le **sur-apprentissage** ; il faut **restreindre la classe**. Un risque empirique nul n’est pas un gage de qualité.',
      },
      {
        kind: 'example',
        id: 'ch9-ex-classes-regression',
        title: 'Choix de la classe en régression : affines, ℝ₃[X], ℝ₂₀[X] (tableau p. 10)',
        source: 'Poly ch.9, §1.2, p. 9–11 (Fig. 3 et tableau p. 10)',
        setup: 'Même ensemble d’apprentissage (un attribut réel), MRE pour la perte quadratique dans des classes de complexité croissante ; $d$ = nombre de paramètres de la classe.',
        steps: [
          {
            text: '**Fonctions affines** ($d=2$) : $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})$ grand et $R(\\hat g^*_{n,\\mathcal C})$ grand : **sous-apprentissage**.',
            justification: 'Classe trop pauvre pour approcher la fonction de régression : erreur d’approximation grande.',
          },
          {
            text: '$\\mathbb R_3[X]$ ($d=4$) : risque empirique petit non nul, risque petit : **compromis**.',
            justification: 'Classe assez riche pour suivre la fonction de régression, pas assez pour suivre le bruit.',
          },
          {
            text: '$\\mathbb R_{20}[X]$ ($d=21$) : risque empirique **nul**, risque **très grand** : **sur-apprentissage**.',
            justification: 'La classe contient un polynôme passant par tous les points ; entre les points et près des bords il oscille fortement.',
          },
          {
            text: 'Réseau de neurones dense (4e panneau de la Fig. 3) : passe lui aussi par les points, en les reliant presque par des segments.',
            justification: 'Classe très riche : même phénomène que $\\mathbb R_{20}[X]$.',
          },
        ],
        conclusion: '« Ce n’est pas un énoncé, mais une tendance » : plus la classe est riche, mieux elle suit les données, et plus le MRE risque de suivre **le bruit** plutôt que la fonction de régression. Pour des classes finies, l’écart risque / risque empirique sera contrôlé par une quantité croissante avec la taille de la classe et décroissante avec $n$ (§6).',
      },
      {
        kind: 'viz',
        id: 'ch9-s2-viz-sur',
        vizId: 'ch9-sur-apprentissage',
        caption: 'Faire varier le degré $p$ : le risque empirique décroît toujours, le risque décrit une courbe en U. La validation (un tiers des points mis de côté) retrouve le bon degré sans connaître $f$.',
      },
      {
        kind: 'theorem',
        id: 'ch9-meth-1-2',
        type: 'methode',
        label: 'Méthode 1.2',
        title: 'Sélection par validation (et validation croisée)',
        source: 'Poly ch.9, Méthode 1.2, p. 11 ; justification : PC9 Ex. 1',
        hypotheses: [
          'Classes candidates $\\mathcal C_1,\\dots,\\mathcal C_K$ ; le risque n’est pas calculable ($\\mathbb P$ inconnue).',
          'Pour la justification : perte 0-1, $m$ couples de validation **indépendants** de l’ensemble d’ajustement et de loi $\\mathbb P$.',
        ],
        statement: `- On découpe $\\mathcal D_n$ en un **ensemble d’ajustement** $\\mathcal D_{\\mathrm{fit}}$ et un **ensemble de validation** $\\mathcal D_{\\mathrm{val}}$.
- Pour chaque classe $\\mathcal C_i$, on construit $\\hat g^*_{n,\\mathcal C_i}$ qui minimise le risque empirique **sur $\\mathcal D_{\\mathrm{fit}}$**, puis on évalue

$$\\widehat{\\mathrm R}^{(\\mathrm{val})}_n(\\hat g^*_{n,\\mathcal C_i}):=\\frac1{|\\mathcal D_{\\mathrm{val}}|}\\sum_{(\\mathbf x_i,y_i)\\in\\mathcal D_{\\mathrm{val}}}\\ell\\big(y_i,\\hat g^*_{n,\\mathcal C_i}(\\mathbf x_i)\\big).$$

- On sélectionne la classe, et la règle associée, qui **minimise ce risque de validation**.

**Validation croisée à $k$ blocs** : on partage $\\mathcal D_n$ en $k$ blocs ; pour chaque bloc, on ajuste sur les $k-1$ autres et on évalue sur le bloc laissé de côté ; on retient la **moyenne** des $k$ risques de validation.

**Justification (perte 0-1)** : si $g_n$ est construite sur l’ensemble d’apprentissage et $\\widehat R_{n,m}$ est son erreur sur $m$ couples de validation indépendants,

$$\\mathbb E\\big[\\widehat R_{n,m}\\,\\big|\\,\\mathcal D_n\\big]=R(g_n),\\qquad\\mathbb P\\big(|\\widehat R_{n,m}-R(g_n)|\\ge\\varepsilon\\big)\\le2e^{-2m\\varepsilon^2}.$$`,
        intuition: 'L’ensemble de validation joue, pour la règle ajustée, **le rôle d’un échantillon frais pour une règle fixée** : la règle a été choisie sans lui. Le risque empirique calculé sur les données d’ajustement n’a pas cette propriété (Prop. 1.1). La validation croisée moyenne sur plusieurs découpages pour réduire la variabilité ; « c’est une heuristique, dont l’analyse sort du cadre du cours ».',
        proof: [
          {
            text: 'Conditionnellement à $\\mathcal D_n$, $g_n$ est fixée et les pertes $\\mathbf{1}_{\\{g_n(\\mathbf X_{n+j})\\ne Y_{n+j}\\}}$, $j=1,\\dots,m$, sont i.i.d. de loi de Bernoulli de paramètre $R(g_n)$.',
            justification: 'Indépendance validation / apprentissage et conditionnement par une variable indépendante (« geler » $\\mathcal D_n$, Prop. 2.5 du ch.8 ; Outils §2.8).',
          },
          {
            text: '$\\mathbb E[\\widehat R_{n,m}\\mid\\mathcal D_n]=\\frac1m\\sum_{j=1}^mR(g_n)=R(g_n)$.',
            justification: 'Linéarité de l’espérance conditionnelle.',
          },
          {
            text: 'Conditionnellement à $\\mathcal D_n$, Hoeffding (Th. 1.3) pour $m$ variables dans $\\{0,1\\}$ : $\\mathbb P(|\\widehat R_{n,m}-R(g_n)|\\ge\\varepsilon\\mid\\mathcal D_n)\\le2e^{-2m\\varepsilon^2}$.',
            justification: 'La borne ne dépend pas de $R(g_n)$ (seul le support $[0,1]$ compte).',
          },
          {
            text: 'On prend l’espérance : $\\mathbb P(|\\widehat R_{n,m}-R(g_n)|\\ge\\varepsilon)\\le2e^{-2m\\varepsilon^2}$.',
            justification: 'Tour des espérances ; la borne conditionnelle est une constante (elle ne dépend pas de $\\mathcal D_n$).',
          },
        ],
        pitfalls: ['Évaluer sur $\\mathcal D_{\\mathrm{fit}}$ : biais optimiste.', 'La borne est en $m$ (taille de **validation**), pas en $n$.'],
      },
      {
        kind: 'example',
        id: 'ch9-ex-pc9-1',
        title: 'PC9 Ex. 1 — Erreur de validation : loi binomiale, Bienaymé-Tchebychev puis Hoeffding',
        source: 'PC9 Ex. 1 Q1–Q4 (énoncé p. 1, corrigé p. 8–9)',
        setup: 'Règle $g_n$ construite sur $D_n$ (notation de la PC : D italique), ensemble de test $T_m$ de $m$ couples i.i.d., indépendants de $D_n$ ; $\\hat R_{n,m}:=\\frac1m\\sum_{j=1}^m\\mathbf{1}_{\\{g_n(X_{n+j})\\ne Y_{n+j}\\}}$, $R(g_n):=\\mathbb P(g_n(X)\\ne Y\\mid D_n)$.',
        steps: [
          {
            text: '**Q1.** $\\mathbb E[\\hat R_{n,m}\\mid D_n]=R(g_n)$.',
            justification: 'Linéarité ; « geler » $D_n$ puis intégrer sous la loi des données de test, qui ont la loi de $(X,Y)$.',
          },
          {
            text: '**Q2.** $\\mathcal L(m\\hat R_{n,m}\\mid D_n)=\\mathrm{Bin}(m,R(g_n))$.',
            justification: 'Somme de $m$ indicatrices conditionnellement i.i.d. de Bernoulli de paramètre $R(g_n)$. Deux sources d’aléa : $g_n$ (via $D_n$) et le test ; on conditionne pour figer la première.',
          },
          {
            text: '**Q3.** $\\mathbb E[(\\hat R_{n,m}-R(g_n))^2\\mid D_n]=\\frac{R(g_n)(1-R(g_n))}m\\le\\frac1{4m}$, donc $\\mathbb P(|\\hat R_{n,m}-R(g_n)|\\ge\\varepsilon)\\le\\frac1{4m\\varepsilon^2}$.',
            justification: 'Variance de la binomiale, $p(1-p)\\le1/4$, tour des espérances, puis Markov sur le carré (Bienaymé-Tchebychev).',
          },
          {
            text: '**Q4.** $\\mathbb P(|\\hat R_{n,m}-R(g_n)|\\ge\\varepsilon)\\le2e^{-2m\\varepsilon^2}$.',
            justification: 'Hoeffding conditionnel : variables centrées dans $[-R(g_n),1-R(g_n)]$, intervalle de longueur 1 ; puis tour des espérances et borne d’union pour les deux côtés.',
          },
        ],
        conclusion: 'Application : pour garantir $\\mathbb P(|\\hat R_{n,m}-R(g_n)|\\ge0{,}05)\\le0{,}05$, Bienaymé-Tchebychev exige $m\\ge2000$, Hoeffding seulement $m\\ge\\ln(40)/(2\\cdot0{,}05^2)\\approx737{,}8$, soit $m\\ge738$ : la borne exponentielle est bien meilleure.',
      },
      {
        kind: 'viz',
        id: 'ch9-s2-viz-knn',
        vizId: 'ch9-knn-choix-k',
        caption: 'La Méthode 1.2 appliquée au choix de $k$ pour les $k$ plus proches voisins (une classe par valeur de $k$) : l’erreur d’apprentissage est optimiste (nulle en $k=1$), l’erreur de validation suit le risque.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 3. Compromis approximation / estimation
  // -------------------------------------------------------------------------
  {
    id: 'ch9-s3-compromis',
    title: '3. Compromis approximation / estimation, biais optimiste, no free lunch',
    role: 'preuves',
    intro:
      'L’excès de risque d’une règle de la classe se décompose en deux termes de natures différentes : l’un ne dépend que de la classe (approximation), l’autre de l’échantillon (estimation). La Prop. 1.1 montre que le risque empirique du MRE est biaisé vers le bas ; le théorème *no free lunch* montre qu’aucune garantie n’est possible sans hypothèse.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch9-eq-1',
        type: 'proposition',
        label: 'Éq. (1)',
        title: 'Décomposition de l’excès de risque : estimation + approximation',
        source: 'Poly ch.9, §1.2, éq. (1), p. 11–12 (Fig. 4 et tableau p. 12)',
        hypotheses: [
          '$g^*_{\\mathcal C}\\in\\mathcal C$ telle que $R(g^*_{\\mathcal C})=\\inf_{g\\in\\mathcal C}R(g)$ : **oracle de la classe** (sinon remplacer $R(g^*_{\\mathcal C})$ par $\\inf_{\\mathcal C}R$).',
          '$\\hat g_{n,\\mathcal C}\\in\\mathcal C$ un **estimateur** : règle de $\\mathcal C$ construite à partir de $\\mathcal D_n$.',
        ],
        statement: `$$\\mathcal E(\\hat g_{n,\\mathcal C})=R(\\hat g_{n,\\mathcal C})-R^\\star=\\underbrace{R(\\hat g_{n,\\mathcal C})-R(g^*_{\\mathcal C})}_{\\text{erreur d'estimation}}+\\underbrace{R(g^*_{\\mathcal C})-R^\\star}_{\\text{erreur d'approximation}}\\qquad(1)$$

On note $\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g_{n,\\mathcal C}):=R(\\hat g_{n,\\mathcal C})-R(g^*_{\\mathcal C})$. Les deux termes sont **positifs**.

- **quand $\\mathcal C$ grandit** : l’erreur d’approximation **décroît**, l’erreur d’estimation **tend à croître** ;
- **quand $n$ grandit** : l’erreur d’approximation est **inchangée**, l’erreur d’estimation **tend à décroître**.

La somme passe en général par un **minimum pour une complexité intermédiaire** (classes trop pauvres : sous-apprentissage ; trop riches : sur-apprentissage).`,
        intuition: 'Fig. 4 : flèche de $g^{Bayes}=g^\\star$ vers $g^*_{\\mathcal C}$ (approximation, hors de la classe), flèche de $g^*_{\\mathcal C}$ vers $\\hat g_{n,\\mathcal C}$ (estimation, dans la classe). L’erreur d’**estimation** reflète la connaissance imparfaite de la loi ($n$ observations seulement) ; l’erreur d’**approximation** dépend de $\\mathcal C$ et de $\\mathbb P$, **pas des données**.',
        proof: [
          {
            text: '$R(\\hat g_{n,\\mathcal C})-R^\\star=\\{R(\\hat g_{n,\\mathcal C})-R(g^*_{\\mathcal C})\\}+\\{R(g^*_{\\mathcal C})-R^\\star\\}$.',
            justification: 'On ajoute et retranche $R(g^*_{\\mathcal C})$.',
          },
          {
            text: '$R(\\hat g_{n,\\mathcal C})\\ge\\inf_{g\\in\\mathcal C}R(g)=R(g^*_{\\mathcal C})$ : l’erreur d’estimation est positive.',
            justification: '$\\hat g_{n,\\mathcal C}\\in\\mathcal C$ pour chaque réalisation de $\\mathcal D_n$.',
          },
          {
            text: '$R(g^*_{\\mathcal C})\\ge R^\\star$ : l’erreur d’approximation est positive.',
            justification: 'Définition du risque bayésien : $R^\\star\\le R(g)$ pour toute règle $g$.',
          },
          {
            text: 'Si $\\mathcal C\\subset\\mathcal C\'$, $\\inf_{\\mathcal C\'}R\\le\\inf_{\\mathcal C}R$ : l’erreur d’approximation décroît (au sens large) quand la classe grandit, et ne dépend pas de $n$.',
            justification: 'Un infimum sur un ensemble plus grand est plus petit.',
          },
        ],
        pitfalls: [
          'L’erreur d’estimation est **aléatoire** (fonction de $\\mathcal D_n$), l’erreur d’approximation est **déterministe**.',
          '« L’erreur d’estimation croît avec la classe » **n’est pas un énoncé général** : ce sera établi pour les MRE sur classe finie par les bornes de la §6 (croissantes en $|\\mathcal C|$, décroissantes en $n$).',
          'Ne pas confondre l’oracle $g^*_{\\mathcal C}$ (meilleure règle de la classe) avec $g^\\star$ (meilleure règle tout court).',
        ],
      },
      {
        kind: 'viz',
        id: 'ch9-s3-viz-approx',
        vizId: 'ch9-approx-estimation',
        caption: 'Classifieur par histogramme : l’approximation décroît avec le nombre de cellules $m$, l’estimation croît ; augmenter $n$ déplace l’optimum vers des classes plus riches.',
      },
      {
        kind: 'text',
        id: 'ch9-s3-quatre-situations',
        title: 'Sur-apprentissage : quatre situations (p. 12)',
        text: `On compare, pour le MRE $\\hat g^*_{n,\\mathcal C}$ et l’oracle $g^*_{\\mathcal C}$ :

- (a) $R(\\hat g^*_{n,\\mathcal C})\\ll\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})$ ;
- (b) $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})\\ll R(\\hat g^*_{n,\\mathcal C})$ ;
- (c) $R(g^*_{\\mathcal C})\\ll R(\\hat g^*_{n,\\mathcal C})$ ;
- (d) $\\widehat{\\mathrm R}_n(g^*_{\\mathcal C})\\ll R(g^*_{\\mathcal C})$.

**Il y a sur-apprentissage dans la situation (b)** : la règle apprise est bien meilleure sur les données qui ont servi à la choisir que sur des données nouvelles. La Prop. 1.1 montre que l’inégalité va toujours dans ce sens **en moyenne** (ce qui écarte (a)) et que le risque empirique de l’oracle, règle fixée, est sans biais (ce qui écarte (d) en moyenne). La situation (c) décrit une **erreur d’estimation grande**, qui peut accompagner le sur-apprentissage mais fait intervenir le risque de l’oracle, **inaccessible**.`,
      },
      {
        kind: 'theorem',
        id: 'ch9-prop-1-1',
        type: 'proposition',
        label: 'Proposition 1.1',
        title: 'Biais optimiste du risque empirique du minimiseur',
        source: 'Poly ch.9, Prop. 1.1, p. 13',
        hypotheses: ['Perte $\\ell$ **positive** ; $R(g)<\\infty$ pour tout $g\\in\\mathcal C$.', '$\\hat g^*_{n,\\mathcal C}$ un MRE (existant et mesurable).'],
        statement: `$$\\mathbb E\\Big[\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})\\Big]\\le\\inf_{g\\in\\mathcal C}R(g)\\le\\mathbb E\\big[R(\\hat g^*_{n,\\mathcal C})\\big].$$

De plus, pour toute règle $g\\in\\mathcal C$ **fixée**, $\\mathbb E[\\widehat{\\mathrm R}_n(g)]=R(g)$.`,
        intuition: 'Biais **optimiste** : en choisissant la meilleure règle sur les données, on choisit aussi la règle que **le hasard de l’échantillon a le plus favorisée**. Plus la classe est riche, plus ce hasard a de règles parmi lesquelles en favoriser une. Conséquence pratique : le risque d’apprentissage est un estimateur **biaisé vers le bas** du risque.',
        proof: [
          { text: 'Pour $g$ fixée, $\\mathbb E[\\widehat{\\mathrm R}_n(g)]=R(g)$.', justification: 'Linéarité de l’espérance (Déf. 1.1).' },
          {
            text: 'Pour tout $g\\in\\mathcal C$, $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})\\le\\widehat{\\mathrm R}_n(g)$, donc $\\mathbb E[\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})]\\le\\mathbb E[\\widehat{\\mathrm R}_n(g)]=R(g)$.',
            justification: 'Définition du minimiseur, croissance de l’espérance, puis le point précédent.',
          },
          { text: '$\\mathbb E[\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})]\\le\\inf_{g\\in\\mathcal C}R(g)$.', justification: 'Le membre de gauche ne dépend pas de $g$ : on passe à l’infimum en $g$.' },
          {
            text: 'Pour chaque réalisation de $\\mathcal D_n$, $R(\\hat g^*_{n,\\mathcal C})\\ge\\inf_{g\\in\\mathcal C}R(g)$ ; on prend l’espérance.',
            justification: '$\\hat g^*_{n,\\mathcal C}\\in\\mathcal C$ et son risque se calcule à $\\mathcal D_n$ fixé (Prop. 2.5 du ch.8).',
          },
        ],
        pitfalls: ['L’inégalité est **en moyenne** : sur une réalisation, $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})$ peut dépasser $R(\\hat g^*_{n,\\mathcal C})$.'],
      },
      {
        kind: 'viz',
        id: 'ch9-s3-viz-biais',
        vizId: 'ch9-biais-optimiste',
        caption: 'L’encadrement de la Prop. 1.1 se lit directement : moyenne du risque empirique du MRE $\\le\\inf_{\\mathcal C}R\\le$ moyenne de son risque ; l’écart grandit avec $|\\mathcal C|$.',
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-1-1',
        type: 'theoreme',
        label: 'Théorème 1.1',
        title: 'No free lunch',
        source: 'Poly ch.9, Th. 1.1, p. 13 (preuve : Compléments §4.1 ; version guidée : PC9 Ex. 6)',
        hypotheses: [
          'Classification binaire $\\mathsf Y=\\{-1,1\\}$, perte 0-1 $\\ell(y,y\')=\\mathbf{1}_{\\{y\\ne y\'\\}}$.',
          '$\\mathsf X$ **infini**, muni d’une tribu qui **contient les singletons** (cas de $\\mathbb R^d$).',
          '$\\widehat g_n(\\cdot)=\\hat g(\\cdot\\,;(\\mathbf X_1,Y_1),\\dots,(\\mathbf X_n,Y_n))$ règle de classification : fonction mesurable de $(\\mathbf x,\\mathcal D_n)$ à valeurs dans $\\{-1,1\\}$.',
        ],
        statement: `Pour tout $n\\in\\mathbb N^*$ et tout $\\varepsilon>0$, il existe une loi $\\mathbb P$ sur $\\mathsf X\\times\\mathsf Y$ telle que $R^\\star=0$ et

$$\\mathbb E[\\mathcal E(\\widehat g_n)]=\\mathbb E[R(\\widehat g_n)]\\ge\\frac12-\\varepsilon,$$

l’espérance portant sur $\\mathcal D_n$, formé de $n$ couples indépendants de loi $\\mathbb P$.`,
        intuition: 'La loi construite répartit l’attribut uniformément sur un très grand nombre $K$ de points, avec un label déterministe mais **sans aucune régularité** d’un point à l’autre. Avec $n$ observations on voit au plus $n$ points ; un nouveau point est, avec probabilité proche de 1 si $K\\gg n$, jamais observé, et son label n’est pas relié à ceux observés : aucune règle ne fait mieux que deviner (risque $1/2$ d’une règle qui tire à pile ou face). La loi difficile **dépend de $n$ et de la règle**. La preuve figure dans les compléments (non exigible) ; ses étapes sont celles de la PC9 Ex. 6.',
        proof: [
          {
            text: 'Fixer $n$, $\\widehat g_n$ et $\\varepsilon\\in]0,1/2[$. Choisir $K$ tel que $(1-1/K)^n\\ge1-2\\varepsilon$ et $K$ points distincts $a_1,\\dots,a_K$ de $\\mathsf X$.',
            justification: '$(1-1/K)^n\\to1$ quand $K\\to\\infty$ ; $\\mathsf X$ est infini.',
          },
          {
            text: 'Pour $\\mathbf b\\in\\{-1,1\\}^K$, $\\mathbb P_{\\mathbf b}$ : $\\mathbf X$ uniforme sur $\\{a_1,\\dots,a_K\\}$ et $Y=b_j$ si $\\mathbf X=a_j$. La règle valant $b_j$ en $a_j$ et $1$ ailleurs a un risque nul : $R^\\star=0$ et $\\mathcal E(\\widehat g_n)=R(\\widehat g_n)$.',
            justification: 'Les singletons sont mesurables, donc cette règle est mesurable ; le label est une fonction déterministe de $\\mathbf X$.',
          },
          {
            text: 'Avec $\\mathbf B$ uniforme sur $\\{-1,1\\}^K$ et $J,J_1,\\dots,J_n$ i.i.d. uniformes sur $\\{1,\\dots,K\\}$, indépendants de $\\mathbf B$ : $\\frac1{2^K}\\sum_{\\mathbf b}\\mathbb E_{\\mathbf b}[R(\\widehat g_n)]=\\mathbb P(\\widehat g_n(\\mathbf X;\\mathcal D_n)\\ne Y)\\ge\\mathbb P(\\widehat g_n(\\mathbf X;\\mathcal D_n)\\ne Y,\\ J\\notin\\{J_1,\\dots,J_n\\})$.',
            justification: 'On moyenne sur les étiquetages ; on minore en se restreignant à l’événement « point test non observé ».',
          },
          {
            text: 'Sur $\\{J=j,J_i=j_i\\}$ avec $j\\notin\\{j_1,\\dots,j_n\\}$, la prédiction est fonction de $(B_{j_1},\\dots,B_{j_n})$, indépendante de $Y=B_j$ uniforme : elles diffèrent avec probabilité $1/2$. La probabilité vaut donc $\\frac12(1-\\frac1K)^n\\ge\\frac12-\\varepsilon$.',
            justification: 'Indépendance des coordonnées de $\\mathbf B$ ; $\\mathbb P(J\\notin\\{J_1,\\dots,J_n\\})=(1-1/K)^n$ par indépendance.',
          },
          {
            text: 'Il existe $\\mathbf b$ tel que $\\mathbb E_{\\mathbf b}[R(\\widehat g_n)]\\ge\\frac12-\\varepsilon$ ; on prend $\\mathbb P=\\mathbb P_{\\mathbf b}$.',
            justification: 'Une moyenne est majorée par le maximum.',
          },
        ],
        pitfalls: [
          'Le théorème ne dit **pas** qu’aucune règle n’est consistante pour une loi **fixée** : il dit qu’il n’y a pas de garantie **uniforme sur toutes les lois** à $n$ fixé, même avec $R^\\star=0$.',
          'L’hypothèse « $\\mathsf X$ infini » est indispensable : si $|\\mathsf X|=K<\\infty$, la PC9 Ex. 4 donne une vitesse $O(\\sqrt{K/n})$.',
        ],
      },
      {
        kind: 'viz',
        id: 'ch9-s3-viz-nfl',
        vizId: 'ch9-no-free-lunch',
        caption: 'Quand $K\\gg n$, le risque moyen de n’importe quelle règle remonte vers $1/2$, alors que chaque loi $\\mathbb P_{\\mathbf b}$ a un risque bayésien nul.',
      },
      {
        kind: 'text',
        id: 'ch9-s3-nfl-interpretation',
        title: 'Interprétation du no free lunch : faire une hypothèse ou changer d’objectif (p. 14)',
        text: `Il est impossible d’obtenir un résultat sur l’excès de risque $R(\\widehat g_n)-R^\\star$ **sans hypothèse sur $\\mathbb P$**. Deux issues :

1. **Approche par modélisation** : hypothèse sur $\\mathbb P$ ; on contraint la loi à $\\{\\mathbb P_\\theta\\}$, on estime $\\theta$, on obtient $\\widehat g_n$ par substitution et l’on contrôle $\\mathcal E(\\widehat g_n)$ sous $\\mathbb P_\\theta$. Espoir : **erreur de modélisation petite**. Exemples : analyse discriminante linéaire et quadratique, régression gaussienne, classification logistique, bayésien naïf.
2. **Approche discriminative** : hypothèse sur $g^\\star$, **ou changement de métrique**. On contraint les classifieurs à $\\mathcal C$, on considère le MRE $\\hat g^*_{n,\\mathcal C}$ et l’on contrôle seulement $\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})=R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})$. Espoir : **erreur d’approximation petite** (hypothèse sur $g^\\star$, donc implicitement sur $\\mathbb P$). Exemples : moindres carrés, réseaux de neurones, classification logistique, SVM.

La **classification logistique figure dans les deux listes** : même critère, comme EMV du modèle logistique et comme MRE pour la perte logistique (§7).

**Les trois questions du chapitre** (résumé p. 14), pour $\\hat g^*_{n,\\mathcal C}=\\arg\\min_{g\\in\\mathcal C}\\widehat{\\mathrm R}_n(g)$ :

1. **Comment choisir $\\mathcal C$ ?** Décomposition approximation / estimation, sur-apprentissage, *no free lunch* ; en pratique validation croisée.
2. **Comment contrôler l’erreur d’estimation** $R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})$ ? §4 à §6.
3. **Comment calculer $\\hat g^*_{n,\\mathcal C}$, et avec quelle précision ?** §7.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 4. Processus empirique
  // -------------------------------------------------------------------------
  {
    id: 'ch9-s4-processus',
    title: '4. Contrôler l’erreur d’estimation : le processus empirique (Th. 1.2)',
    role: 'preuves',
    intro:
      'Objectif (§1.3, p. 14) : contrôler $\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})=R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})$, où $\\hat g^*_{n,\\mathcal C}$ minimise le risque **empirique** et $g^*_{\\mathcal C}$ le **risque**. Démarche en deux temps : (i) ramener l’erreur d’estimation à la **déviation uniforme** $\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$, quantité qui ne dépend que de la classe ; (ii) contrôler celle-ci par une **inégalité de concentration** (§5–6).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch9-thm-1-2',
        type: 'theoreme',
        label: 'Théorème 1.2',
        title: 'Lien entre erreur de généralisation et processus empirique',
        source: 'Poly ch.9, Th. 1.2, éq. (2)–(3), p. 15',
        hypotheses: [
          '$\\mathcal C$ classe de règles ; perte $\\ell$ telle que $R(g)<\\infty$ pour tout $g\\in\\mathcal C$.',
          '$\\hat g^*_{n,\\mathcal C}$ un MRE sur $\\mathcal C$.',
          'Pour (3) : $\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$ est une variable aléatoire **intégrable** (vrai si $\\mathcal C$ est finie et la perte bornée).',
        ],
        statement: `$$\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})=R(\\hat g^*_{n,\\mathcal C})-\\inf_{g\\in\\mathcal C}R(g)\\le2\\sup_{g\\in\\mathcal C}\\Big|\\widehat{\\mathrm R}_n(g)-R(g)\\Big|\\quad\\text{p.s.}\\qquad(2)$$

$$\\mathbb E\\big[\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})\\big]\\le\\mathbb E\\Big[\\sup_{g\\in\\mathcal C}\\Big|\\widehat{\\mathrm R}_n(g)-R(g)\\Big|\\Big].\\qquad(3)$$`,
        intuition: 'Deux observations : (1) $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})\\le\\widehat{\\mathrm R}_n(g)$ pour tout $g\\in\\mathcal C$ ; (2) $|\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})-R(\\hat g^*_{n,\\mathcal C})|\\le\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$ puisque $\\hat g^*_{n,\\mathcal C}\\in\\mathcal C$. Le **facteur 2 disparaît en espérance** parce que l’un des deux termes porte sur une règle **fixée**, dont le risque empirique est sans biais. Seul le terme portant sur la règle apprise demande un **contrôle uniforme** : on ne sait pas à l’avance quelle règle sera choisie, il faut donc que le risque empirique soit proche du risque **pour toutes à la fois**.',
        proof: [
          {
            text: 'Soit $\\varepsilon>0$ et $g_\\varepsilon\\in\\mathcal C$ telle que $R(g_\\varepsilon)\\le\\inf_{g\\in\\mathcal C}R(g)+\\varepsilon$ (si l’oracle existe : $g_\\varepsilon=g^*_{\\mathcal C}$, $\\varepsilon=0$).',
            justification: 'Définition de l’infimum.',
          },
          {
            text: `$$\\begin{aligned}R(\\hat g^*_{n,\\mathcal C})-\\inf_{g\\in\\mathcal C}R(g)&=R(\\hat g^*_{n,\\mathcal C})-\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})+\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})-\\inf_{g\\in\\mathcal C}R(g)\\\\&\\le R(\\hat g^*_{n,\\mathcal C})-\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})+\\widehat{\\mathrm R}_n(g_\\varepsilon)-R(g_\\varepsilon)+\\varepsilon.\\end{aligned}$$`,
            justification: 'Ajout / retrait de $\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})$ ; observation 1 avec $g=g_\\varepsilon$ ; choix de $g_\\varepsilon$ : $-\\inf R\\le-R(g_\\varepsilon)+\\varepsilon$.',
          },
          {
            text: 'Chaque différence est majorée par $\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$, d’où $R(\\hat g^*_{n,\\mathcal C})-\\inf R\\le2\\sup_{\\mathcal C}|\\widehat{\\mathrm R}_n-R|+\\varepsilon$ ; $\\varepsilon$ étant arbitraire, on obtient (2).',
            justification: 'La première par l’observation 2, la seconde car $g_\\varepsilon\\in\\mathcal C$.',
          },
          {
            text: 'En espérance : $\\mathbb E[R(\\hat g^*_{n,\\mathcal C})]-\\inf_{\\mathcal C}R\\le\\mathbb E[R(\\hat g^*_{n,\\mathcal C})-\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})]+\\varepsilon\\le\\mathbb E[\\sup_{\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|]+\\varepsilon$, puis $\\varepsilon\\to0$ : (3).',
            justification: '$g_\\varepsilon$ est **fixée** : $\\mathbb E[\\widehat{\\mathrm R}_n(g_\\varepsilon)]=R(g_\\varepsilon)$, le second terme est d’espérance nulle ; on ne majore par le sup que le premier terme.',
          },
          {
            text: 'Si $\\mathcal C$ est finie et la perte bornée, le sup est un maximum d’un nombre fini de variables bornées : il est mesurable et intégrable.',
            justification: 'Justification de l’hypothèse de (3).',
          },
        ],
        pitfalls: [
          '(2) est **presque sûre** avec facteur 2 ; (3) est **en espérance**, sans facteur 2 : ne pas mélanger.',
          'Le sup porte sur **toute la classe**, pas seulement sur $\\hat g^*_{n,\\mathcal C}$ (qui dépend des données).',
          'Rapprochement (non écrit dans ce passage du poly) : même schéma « $2\\sup$ » que la preuve de consistance des M-estimateurs du ch.7 ; le poly signale seulement (Outils §2.9) que la LGN uniforme du ch.7 porte sur le même type d’objet que $\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$.',
        ],
      },
      {
        kind: 'text',
        id: 'ch9-s4-types-controle',
        title: 'Deux types de contrôle et la stratégie pour la perte 0-1 (p. 15–16)',
        text: `$R(\\hat g^*_{n,\\mathcal C})$ et donc $\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})$ sont des **variables aléatoires**. Deux façons de les contrôler :

1. **en espérance** : majorer $\\mathbb E[\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})]$ ;
2. **en grande probabilité** : $\\mathbb P\\big(\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})\\le\\Delta_{n,\\delta}(\\mathcal C)\\big)\\ge1-\\delta$, où $\\Delta_{n,\\delta}(\\mathcal C)$ dépend explicitement de $n$, de $\\delta$ et de la classe.

Dans les deux cas, d’après le Th. 1.2, il faut étudier les **déviations uniformes** de variables aléatoires par rapport à leurs moyennes.

**Stratégie (perte 0-1, $\\mathcal C$ finie).** Pour la perte 0-1, $\\widehat{\\mathrm R}_n(g)=\\frac1n\\sum_{k=1}^n\\mathbf{1}_{\\{g(\\mathbf X_k)\\ne Y_k\\}}$. On contrôle $\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$ en deux temps :

1. pour toute règle $g$ **fixée**, $\\mathbb P(|\\widehat{\\mathrm R}_n(g)-R(g)|>\\varepsilon)$ est faible : **inégalité de concentration** (§5) ;
2. la **borne de l’union** donne $\\mathbb P\\big(\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|>\\varepsilon\\big)\\le\\sum_{g\\in\\mathcal C}\\mathbb P\\big(|\\widehat{\\mathrm R}_n(g)-R(g)|>\\varepsilon\\big)$ (§6).`,
      },
    ],
  },
]
