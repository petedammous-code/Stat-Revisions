import type { CourseSection } from '../types'

/** Sections 1 à 5 : cadre et notations, risque bayésien, régression, classification binaire, explicitation par les densités de classe. */
export const coursePart1: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 1. Intuition et notations
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s1-intuition',
    title: '1. Intuition et notations : de la statistique à l’apprentissage',
    role: 'intuition',
    intro:
      'Les chapitres 1 à 7 inféraient un **paramètre** $\\theta$ et jugeaient une procédure sur $\\theta$ (risque quadratique, niveau, puissance). Ici on veut **prédire** une réponse $Y$ à partir d’attributs $\\mathbf{X}$ : l’objet construit est une **règle** $g$, et on la juge par son **risque**, la perte moyenne commise en prédisant $g(\\mathbf{X})$ quand la réponse est $Y$.',
    blocks: [
      {
        kind: 'text',
        id: 'ch8-s1-stat-app',
        title: 'Statistique et apprentissage (Poly ch.8, introduction p. 7–8)',
        text: `On observe des paires $(\\mathbf{X}_1,Y_1),\\dots,(\\mathbf{X}_n,Y_n)$ et l’on veut une règle $g$ qui associe à un nouvel attribut $\\mathbf{x}$ une prévision $g(\\mathbf{x})$. Deux voies :

- **voie statistique (modélisation, ch.8)** : modéliser la loi jointe de $(\\mathbf{X},Y)$, estimer ses paramètres, en déduire une règle ;
- **voie apprentissage (discriminative, ch.9–10)** : choisir une classe de fonctions et une perte, chercher la meilleure règle de la classe.

Le cadre tient en **quatre objets** : attributs, réponse, prédicteur, fonction de perte (dont la moyenne définit le risque). Informatique traditionnelle = raisonnement **déductif** (la règle est écrite à l’avance) ; apprentissage = raisonnement **inductif** (la règle est apprise sur les données).

**L’idée clé (encadré p. 8).** En statistique la loi est la **cible** et le risque d’estimation tend vers 0 quand $n\\to\\infty$. En apprentissage la loi n’est qu’un **intermédiaire** : même en la connaissant parfaitement, il reste une **erreur irréductible**, car $\\mathbf{X}$ ne détermine pas $Y$ (deux individus de mêmes attributs peuvent avoir des réponses différentes). Le risque d’une règle apprise ne tend donc pas vers 0 : il tend **au mieux vers le risque de Bayes** $R^\\star$.`,
      },
      {
        kind: 'text',
        id: 'ch8-s1-notations',
        title: 'Notations du poly (à reproduire telles quelles)',
        text: `- **Attributs en gras** : $\\mathbf{X}\\in\\mathsf{X}=\\mathbb{R}^d$ (vecteur aléatoire), $\\mathbf{x}$ (point de $\\mathbb{R}^d$), coordonnées $x^{(i)}$ ; la **réponse** $Y\\in\\mathsf{Y}$ n’est pas en gras. Dans les exemples en dimension 1 et dans la PC8, on écrit $X$, $x$ sans gras.
- **Espaces** en police sans empattement $\\mathsf{X}$, $\\mathsf{Y}$ ; tribus $\\mathcal{X}$, $\\mathcal{Y}$ ; espaces mesurés $(\\mathsf{X},\\mathcal{X},\\mu)$ et $(\\mathsf{Y},\\mathcal{Y},\\nu)$ (dans les Outils §2.5 les rôles de $\\mu$ et $\\nu$ sont inversés).
- **Loi du couple** $\\mathbb{P}$ (inconnue) ; lois $\\mathbb{P}_{\\mathbf{X},Y}$, $\\mathbb{P}_{\\mathbf{X}}$, $\\mathbb{P}_Y$, $\\mathbb{P}_{\\mathbf{X}|Y}$, $\\mathbb{P}_{Y|\\mathbf{X}}$ ; densités $p_{\\mathbf{X},Y}$, $p_{\\mathbf{X}}$, $p_Y$ et **conditionnelles en lettre q** : $q_{\\mathbf{X}|Y}(\\mathbf{x}\\mid y)$, $q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})$ ; densités de classe $q_1$, $q_{-1}$.
- **Ensemble d’apprentissage** $\\mathcal{D}_n$ ; **règle apprise** $\\widehat g_n$ (grand chapeau) ; règle bayésienne $g^\\star$, risque bayésien $R^\\star$ (étoile pleine $\\star$ partout, aussi $\\theta^\\star$).
- **Pertes** $\\ell_{01}$, $\\ell_2$ ; risques $R(g)$, $R_{01}(g)$, $R_2(g)$, $R_{\\ell,\\mathbb{P}}(g)$ ; risque conditionnel $R_{\\ell,\\mathbb{P}}(g,\\mathbf{x})$.
- **Fonction de régression** $\\eta(\\mathbf{x})$ ; **classification binaire codée $\\{-1,1\\}$** (et non $\\{0,1\\}$) ; $\\widetilde{\\mathcal{B}\\mathrm{er}}(p)$ = Bernoulli à valeurs dans $\\{-1,1\\}$ ; $p=\\mathbb{P}(Y=1)$.
- **Mesure de comptage** $\\mathrm{c}=\\delta_{\\{-1\\}}+\\delta_{\\{1\\}}$ ; mesure de Lebesgue $\\mathrm{Leb}$ ; indicatrice $\\mathbb{1}_{\\{\\cdot\\}}$.
- **Modèles** : $\\{\\mathbb{P}_\\theta:\\theta\\in\\Theta\\}$, règle bayésienne $g^\\star_\\theta$, fonction de régression $\\eta_\\theta$, log-rapport $\\phi_\\theta$, sigmoïde $\\mathrm{sigm}$ ; EMV noté $\\widehat\\theta_{\\mathrm{MLE},n}$ ; loi de $\\mathcal{D}_n$ sous $\\theta^\\star$ : $\\mathbb{P}_{n,\\theta^\\star}$, $\\mathbb{E}_{n,\\theta^\\star}$.
- **Espaces de Hilbert** (Outils) : $\\mathcal{L}^2(\\Omega,\\mathcal{F},\\mathbb{P})$ (variables de carré intégrable) et $\\mathrm{L}^2(\\Omega,\\mathcal{F},\\mathbb{P})$ (quotient par l’égalité p.s.) ; projection $P_{\\mathcal{H}}Z$ ; tribu engendrée $\\sigma(\\mathbf{X})$.`,
      },
      {
        kind: 'theorem',
        id: 'ch8-cadre-1-1',
        type: 'definition',
        label: 'Cadre 1.1',
        title: 'Apprentissage supervisé',
        source: 'Poly ch.8, Cadre 1.1, p. 9',
        hypotheses: ['Aucune hypothèse sur la structure de dépendance entre $\\mathbf{X}$ et $Y$.'],
        statement: `- Les **attributs** $\\mathbf{X}\\in\\mathsf{X}=\\mathbb{R}^d$, aussi appelés variables explicatives (*features*).
- La **réponse** $Y\\in\\mathsf{Y}$.
- Le couple $(\\mathbf{X},Y)$ suit une loi $\\mathbb{P}$ sur $\\mathsf{X}\\times\\mathsf{Y}$, et $\\mathbb{P}$ est **inconnue**.

Selon $\\mathsf{Y}$ : **classification binaire** si $\\mathsf{Y}=\\{-1,1\\}$ ; **classification multi-classe** si $\\mathsf{Y}=\\{0,1,\\dots,K-1\\}$ ; **régression** si $\\mathsf{Y}=\\mathbb{R}$.`,
        intuition: 'On observe un individu à travers un vecteur de caractéristiques et on prédit une grandeur attachée à cet individu.',
        pitfalls: ['En binaire, le codage du Cours est $\\{-1,1\\}$ ; seuls la Prop. 4.1 des compléments et la figure 7 utilisent $\\{0,1\\}$. Avec $\\{-1,1\\}$, $\\mathbb{E}[Y\\mid\\mathbf{X}]=2\\eta(\\mathbf{X})-1\\ne\\eta(\\mathbf{X})$.'],
      },
      {
        kind: 'theorem',
        id: 'ch8-def-1-1',
        type: 'definition',
        label: 'Définition 1.1',
        title: 'Prédicteur, classifieur, régresseur',
        source: 'Poly ch.8, Déf. 1.1, p. 9',
        hypotheses: ['Cadre 1.1.'],
        statement: 'Un **prédicteur** (ou **classifieur**, ou **régresseur**) est une fonction **mesurable** $g:\\mathsf{X}\\to\\mathsf{Y}$.',
        intuition: 'Une « règle de décision » qui à tout attribut associe une prévision.',
      },
      {
        kind: 'text',
        id: 'ch8-s1-objectif',
        title: 'Objectif (encadré p. 9) : l’ensemble d’apprentissage',
        text: `On dispose d’un **ensemble d’apprentissage** (*training set*)

$$\\mathcal{D}_n=\\{(\\mathbf{X}_1,Y_1),\\dots,(\\mathbf{X}_n,Y_n)\\},$$

formé de $n$ paires **indépendantes et de même loi $\\mathbb{P}$** que $(\\mathbf{X},Y)$, et l’on cherche à construire à partir de ces données un prédicteur $\\widehat g_n$.

- $\\mathcal{D}_n$ est un **$n$-échantillon** de la loi $\\mathbb{P}$ sur $\\mathsf{X}\\times\\mathsf{Y}$ au sens du ch.1 ;
- $\\widehat g_n$ est une **statistique à valeurs dans un espace de fonctions** ;
- $Y$ n’est **pas** supposé fonction de $\\mathbf{X}$ : c’est précisément ce qui crée l’erreur irréductible.`,
      },
      {
        kind: 'example',
        id: 'ch8-ex-1-1-1-2',
        title: 'Exemples 1.1 et 1.2 — Identifier la tâche : prix des maisons, MNIST',
        source: 'Poly ch.8, Ex. 1.1 et 1.2, p. 9–10',
        setup: 'Pour chaque jeu de données, identifier $\\mathsf{X}$, $\\mathsf{Y}$, $n$, $d$ et le type de tâche.',
        steps: [
          {
            text: '*House price prediction* : $n=1500$ exemples, 81 caractéristiques (année, quartier, surface…) donc $\\mathbf{X}\\in\\mathbb{R}^{81}$ ; $Y\\in\\mathbb{R}$ (prix) : **régression**.',
            justification: 'Cadre 1.1 : $\\mathsf{Y}=\\mathbb{R}$. Les caractéristiques qualitatives ou ordinales sont mises sous forme de vecteur réel par un **prétraitement** supposé fait.',
          },
          {
            text: 'MNIST : 60 000 images (50 000 d’apprentissage, 10 000 de test), $28\\times28$ niveaux de gris donc $\\mathbf{X}\\in\\mathbb{R}^{784}$, $d=784$ ; dix classes $Y\\in\\{0,\\dots,9\\}$ : **classification multi-classe**.',
            justification: 'Cadre 1.1 : $\\mathsf{Y}=\\{0,\\dots,K-1\\}$ avec $K=10$.',
          },
          {
            text: 'Autres tâches (p. 10) : détection de pourriels (classification binaire, attributs = occurrences des mots), segmentation sémantique, classification de sentiments, prévision du prix de l’électricité (régression).',
            justification: 'Même grille de lecture : nature de $\\mathsf{Y}$.',
          },
        ],
      },
      {
        kind: 'example',
        id: 'ch8-ex-1-3-1-5',
        title: 'Exemples 1.3 à 1.5 — Trois façons naturelles de modéliser',
        source: 'Poly ch.8, Ex. 1.3, 1.4, 1.5, p. 10',
        setup: 'Trois problèmes en dimension $d=1$ annoncent les trois modèles du §1.3.',
        steps: [
          {
            text: '**Ex. 1.3 (taille et genre)** : $X\\in\\mathbb{R}$, $Y\\in\\{-1,1\\}$. Dans chaque classe la taille est répartie autour d’une moyenne propre avec une dispersion du même ordre : on modélise $X\\mid Y$ par **deux gaussiennes de même variance**. Si les classes sont également représentées, la règle optimale place un **seuil au milieu des deux moyennes** ; le recouvrement des densités **empêche l’erreur de descendre à 0**.',
            justification: 'Approche générative (modéliser $\\mathbf{X}\\mid Y$) ; traité à l’Ex. 1.6 et par la LDA (Cadre 1.2).',
          },
          {
            text: '**Ex. 1.4 (âge et maladie cardiovasculaire)** : on décrit directement la **probabilité d’être malade à âge donné**, croissante et régulière : $\\mathrm{sigm}(a+bx)$. La règle optimale prédit la maladie au-delà de l’âge où cette probabilité franchit $1/2$, soit $x\\ge-a/b$ si $b>0$.',
            justification: 'Modéliser $Y\\mid X$ : modèle logistique (Cadre 1.3) ; $\\mathrm{sigm}(t)\\ge1/2\\iff t\\ge0$ (Outils §2.9).',
          },
          {
            text: '**Ex. 1.5 (note et heures de travail)** : $X$, $Y\\in\\mathbb{R}$, régression. La règle optimale pour la perte quadratique est la note moyenne à temps fixé $x\\mapsto\\mathbb{E}[Y\\mid X=x]$ ; si on la modélise affine, on retrouve la **régression linéaire simple** (moindres carrés, ch.2 Ex. 1.15).',
            justification: 'Th. 1.1 (espérance conditionnelle) et modèle linéaire gaussien (Cadre 1.4).',
          },
        ],
        conclusion: 'Même loi jointe, deux points de vue : tirer la classe puis les attributs (génératif), ou tirer les attributs puis la réponse (modèle de $Y\\mid\\mathbf{X}$).',
      },
      {
        kind: 'theorem',
        id: 'ch8-def-1-2',
        type: 'definition',
        label: 'Définition 1.2',
        title: 'Fonction de perte',
        source: 'Poly ch.8, Déf. 1.2, p. 11',
        hypotheses: ['$\\mathsf{Y}$ espace des réponses.'],
        statement: `Une **fonction de perte** est une fonction mesurable positive $\\ell:\\mathsf{Y}\\times\\mathsf{Y}\\to\\mathbb{R}_+$ ; $\\ell(y,g(\\mathbf{x}))$ quantifie la qualité de la prévision $g(\\mathbf{x})$ de la réponse $y$.

- **Perte 0–1** (classification, $\\mathsf{Y}=\\{-1,1\\}$ ou $\\{0,\\dots,K-1\\}$) : $\\ell_{01}(y,g(\\mathbf{x}))=\\mathbb{1}_{\\{y\\neq g(\\mathbf{x})\\}}$.
- **Perte quadratique** (régression, $y\\in\\mathbb{R}$) : $\\ell_2(y,g(\\mathbf{x}))=(y-g(\\mathbf{x}))^2$.`,
        intuition: 'Chiffrer le coût d’une prévision erronée. D’autres pertes existent : asymétrique (PC8 Ex. 1), logistique (Cadre 1.3).',
        pitfalls: ['L’ordre des arguments est (réponse, prévision).'],
      },
      {
        kind: 'theorem',
        id: 'ch8-def-1-3',
        type: 'definition',
        label: 'Définition 1.3',
        title: 'Risque d’une règle de décision',
        source: 'Poly ch.8, Déf. 1.3, p. 11',
        hypotheses: ['$\\ell$ fonction de perte, $g$ prédicteur.', 'L’espérance existe (toujours vrai pour la perte 0–1 ; à vérifier pour $\\ell_2$).'],
        statement: `$$R(g):=\\mathbb{E}[\\ell(Y,g(\\mathbf{X}))]=\\int\\ell(y,g(\\mathbf{x}))\\,\\mathrm{d}\\mathbb{P}(\\mathbf{x},y).$$

En particulier $R_{01}(g)=\\mathbb{P}(Y\\neq g(\\mathbf{X}))$ en classification et $R_2(g)=\\mathbb{E}[(Y-g(\\mathbf{X}))^2]$ en régression.`,
        intuition: 'Pour la perte 0–1, le risque est la **proportion d’individus mal classés** par $g$ (espérance d’une indicatrice = probabilité).',
        proof: [
          { text: '$\\mathbb{E}[\\mathbb{1}_{\\{Y\\neq g(\\mathbf{X})\\}}]=\\mathbb{P}(Y\\neq g(\\mathbf{X}))$.', justification: 'Espérance d’une indicatrice.' },
        ],
        pitfalls: ['Pour la perte quadratique le risque **peut être infini** : on suppose $\\mathbb{E}[Y^2]<\\infty$ et on compare les $g$ avec $\\mathbb{E}[g^2(\\mathbf{X})]<\\infty$ (p. 11).', 'Le risque est calculé sous la loi **inconnue** $\\mathbb{P}$ : ce n’est pas une quantité observable.'],
      },
      {
        kind: 'text',
        id: 'ch8-s1-questions',
        title: 'Les trois questions de l’apprentissage (encadré « Questions », p. 11)',
        text: `1. Existe-t-il une règle $g^\\star$ **optimale**, au sens où $R(g^\\star)\\le R(g)$ pour toute règle $g$ ? → §2 à §5 (Th. 1.1 et 1.2).
2. Comment construire, à partir de $\\mathcal{D}_n$, une règle $\\widehat g_n$ qui approche $g^\\star$ ? → §6 (règles par substitution).
3. Peut-on quantifier l’écart $R(\\widehat g_n)-R(g^\\star)$ ? → §7 (Prop. 1.5) ; sujet des chapitres 9 et 10.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 2. Risque bayésien et risque conditionnel
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s2-bayes',
    title: '2. Lois du couple, risque bayésien et risque conditionnel',
    role: 'definitions',
    intro:
      'Dans les sections 2 à 5, la loi $\\mathbb{P}$ du couple est supposée **connue** : la règle obtenue n’est pas calculable en pratique, elle sert de **référence**. Tout le chapitre se place dans le cas à densité.',
    blocks: [
      {
        kind: 'text',
        id: 'ch8-s2-lois',
        title: 'Lois jointe, marginales et conditionnelles (Poly ch.8, §1.2, p. 12)',
        text: `La loi de $(\\mathbf{X},Y)$ admet une densité $p_{\\mathbf{X},Y}$ par rapport à $\\mu\\otimes\\nu$, avec :

- **régression** : $(\\mathsf{X},\\mathcal{X},\\mu)=(\\mathbb{R}^d,\\mathcal{B}(\\mathbb{R}^d),\\mathrm{Leb})$ et $(\\mathsf{Y},\\mathcal{Y},\\nu)=(\\mathbb{R},\\mathcal{B}(\\mathbb{R}),\\mathrm{Leb})$ ;
- **classification binaire** : mêmes attributs et $(\\mathsf{Y},\\mathcal{Y},\\nu)=(\\{-1,1\\},\\mathcal{P}(\\{-1,1\\}),\\mathrm{c})$, où $\\mathrm{c}=\\delta_{\\{-1\\}}+\\delta_{\\{1\\}}$ est la mesure de comptage.

Formules (1)–(3) :

$$p_{\\mathbf{X}}(\\mathbf{x})=\\int_{\\mathsf{Y}}p_{\\mathbf{X},Y}(\\mathbf{x},y)\\,\\nu(\\mathrm{d}y),\\qquad p_Y(y)=\\int_{\\mathsf{X}}p_{\\mathbf{X},Y}(\\mathbf{x},y)\\,\\mu(\\mathrm{d}\\mathbf{x}),$$

$$p_{\\mathbf{X},Y}(\\mathbf{x},y)=q_{\\mathbf{X}|Y}(\\mathbf{x}\\mid y)\\,p_Y(y)=q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})\\,p_{\\mathbf{X}}(\\mathbf{x}),$$

$$q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})=\\frac{p_{\\mathbf{X},Y}(\\mathbf{x},y)}{p_{\\mathbf{X}}(\\mathbf{x})}\\quad\\text{pour tout }\\mathbf{x}\\text{ tel que }p_{\\mathbf{X}}(\\mathbf{x})>0.$$

**Deux manières de voir la même expérience** (encadré p. 12) : (a) tirer d’abord la classe $Y$, puis $\\mathbf{X}$ dans la loi propre à cette classe — vue $q_{\\mathbf{X}|Y}\\,p_Y$, celle de l’**approche générative** (analyse discriminante) ; (b) tirer d’abord $\\mathbf{X}$, puis $Y$ dans la loi propre à ces attributs — vue $q_{Y|\\mathbf{X}}\\,p_{\\mathbf{X}}$, celle du **modèle logistique** et du **modèle linéaire gaussien**.

*Piège* : (3) n’est définie que là où $p_{\\mathbf{X}}>0$ ; l’ensemble $\\{p_{\\mathbf{X}}=0\\}$ est négligeable pour $p_{\\mathbf{X}}\\cdot\\mu$. Les justifications (Fubini, densité conditionnelle) sont aux Outils §2.5 (section 8).`,
      },
      {
        kind: 'theorem',
        id: 'ch8-def-1-4',
        type: 'definition',
        label: 'Définition 1.4',
        title: 'Risque et règle bayésiens',
        source: 'Poly ch.8, Déf. 1.4, p. 12–13',
        hypotheses: ['$\\ell:\\mathsf{Y}\\times\\mathsf{Y}\\to\\mathbb{R}_+$ fonction de perte.', '$\\mathbb{P}$ probabilité sur $\\mathsf{X}\\times\\mathsf{Y}$.'],
        statement: `Le **risque bayésien** relatif à $\\mathbb{P}$ et $\\ell$ est le risque minimum

$$R^\\star_{\\ell,\\mathbb{P}}:=\\inf\\Big\\{R_{\\ell,\\mathbb{P}}(g)=\\int\\ell(y,g(\\mathbf{x}))\\,\\mathrm{d}\\mathbb{P}(\\mathbf{x},y),\\ g:\\mathsf{X}\\to\\mathsf{Y}\\text{ mesurable}\\Big\\}.$$

Une fonction mesurable $g^\\star_{\\ell,\\mathbb{P}}$ telle que $R_{\\ell,\\mathbb{P}}(g^\\star_{\\ell,\\mathbb{P}})=R^\\star_{\\ell,\\mathbb{P}}$ est une **règle de décision bayésienne**. On abrège $g^\\star$ et $R^\\star$.`,
        intuition: '$R^\\star$ est la meilleure performance possible avec l’information contenue dans $\\mathbf{X}$ : une **référence théorique**.',
        proof: [
          { text: 'L’infimum **existe toujours**.', justification: 'L’ensemble des risques est une partie non vide de $\\mathbb{R}_+\\cup\\{+\\infty\\}$ (remarque p. 13).' },
          { text: 'Rien ne garantit a priori qu’il soit **atteint**, ni qu’il le soit par une **seule** règle.', justification: 'Remarque du poly, p. 13.' },
          { text: 'Les Th. 1.1 et 1.2 exhibent une règle qui l’atteint (régression quadratique ; classification binaire 0–1).', justification: 'Sections 3 et 4.' },
        ],
        pitfalls: ['« Bayésien » ne désigne pas ici une loi a priori sur $\\theta$ (ch.3) mais l’optimalité sous la loi connue $\\mathbb{P}$.', '$g^\\star$ dépend de la perte $\\ell$ **et** de la loi $\\mathbb{P}$ (une perte asymétrique déplace le seuil, PC8 Ex. 1).'],
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-1-1',
        type: 'proposition',
        label: 'Proposition 1.1',
        title: 'Risque conditionnel : on minimise point par point',
        source: 'Poly ch.8, Prop. 1.1, p. 13',
        hypotheses: [
          '$(\\mathbf{X},Y)$ admet une densité $p_{\\mathbf{X},Y}$ par rapport à $\\mu\\otimes\\nu$.',
          '$\\ell:\\mathsf{Y}\\times\\mathsf{Y}\\to\\mathbb{R}_+$ fonction de perte ; $g:\\mathsf{X}\\to\\mathsf{Y}$ prédicteur mesurable.',
          'Pour la seconde partie : $g^\\star$ **mesurable** réalisant l’infimum ponctuel pour $p_{\\mathbf{X}}\\cdot\\mu$-presque tout $\\mathbf{x}$.',
        ],
        statement: `$$R_{\\ell,\\mathbb{P}}(g)=\\mathbb{E}\\big[\\mathbb{E}[\\ell(Y,g(\\mathbf{X}))\\mid\\mathbf{X}]\\big]=\\int_{\\mathsf{X}}R_{\\ell,\\mathbb{P}}(g,\\mathbf{x})\\,p_{\\mathbf{X}}(\\mathbf{x})\\,\\mu(\\mathrm{d}\\mathbf{x}),$$

où le **risque conditionnel** au point $\\mathbf{x}$ est $R_{\\ell,\\mathbb{P}}(g,\\mathbf{x}):=\\int_{\\mathsf{Y}}\\ell(y,g(\\mathbf{x}))\\,q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})\\,\\nu(\\mathrm{d}y)$.

Si $g^\\star$ mesurable vérifie $R_{\\ell,\\mathbb{P}}(g^\\star,\\mathbf{x})=\\inf_{a\\in\\mathsf{Y}}\\int_{\\mathsf{Y}}\\ell(y,a)\\,q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})\\,\\nu(\\mathrm{d}y)$ pour $p_{\\mathbf{X}}\\cdot\\mu$-presque tout $\\mathbf{x}$, alors $g^\\star$ est une **règle de décision bayésienne**.`,
        intuition: 'On calcule la règle bayésienne **attribut par attribut** : en chaque $\\mathbf{x}$, on choisit l’action $a$ qui minimise la perte moyenne sous la loi conditionnelle $q_{Y|\\mathbf{X}}(\\cdot\\mid\\mathbf{x})$.',
        proof: [
          {
            text: '$R_{\\ell,\\mathbb{P}}(g)=\\iint\\ell(y,g(\\mathbf{x}))\\,p_{\\mathbf{X},Y}(\\mathbf{x},y)\\,\\mu(\\mathrm{d}\\mathbf{x})\\,\\nu(\\mathrm{d}y)=\\int_{\\mathsf{X}}\\Big\\{\\int_{\\mathsf{Y}}\\ell(y,g(\\mathbf{x}))\\,q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})\\,\\nu(\\mathrm{d}y)\\Big\\}p_{\\mathbf{X}}(\\mathbf{x})\\,\\mu(\\mathrm{d}\\mathbf{x})$.',
            justification: 'L’intégrande est **mesurable et positive** : **Fubini-Tonelli** ; puis (3), l’ensemble $\\{p_{\\mathbf{X}}=0\\}$ étant de mesure nulle pour $p_{\\mathbf{X}}\\cdot\\mu$.',
          },
          {
            text: 'Cette écriture est $\\mathbb{E}[\\mathbb{E}[\\ell(Y,g(\\mathbf{X}))\\mid\\mathbf{X}]]$.',
            justification: 'Espérance de l’espérance conditionnelle (Prop. 2.2) et expression de l’espérance conditionnelle dans le cas à densité (Prop. 2.6).',
          },
          {
            text: 'Soit $g$ quelconque. Pour $p_{\\mathbf{X}}\\cdot\\mu$-p.t. $\\mathbf{x}$, $R_{\\ell,\\mathbb{P}}(g^\\star,\\mathbf{x})\\le R_{\\ell,\\mathbb{P}}(g,\\mathbf{x})$.',
            justification: '**Car $g(\\mathbf{x})\\in\\mathsf{Y}$** et le membre de gauche est l’infimum sur toutes les actions $a\\in\\mathsf{Y}$.',
          },
          {
            text: 'En intégrant contre $p_{\\mathbf{X}}\\cdot\\mu$ : $R_{\\ell,\\mathbb{P}}(g^\\star)\\le R_{\\ell,\\mathbb{P}}(g)$ pour tout $g$, d’où $R_{\\ell,\\mathbb{P}}(g^\\star)=R^\\star_{\\ell,\\mathbb{P}}$. □',
            justification: 'Croissance de l’intégrale contre une mesure positive, puis définition de l’infimum (Déf. 1.4).',
          },
        ],
        pitfalls: ['$\\mathbf{x}\\mapsto g^\\star(\\mathbf{x})$ doit être **mesurable** (hypothèse de l’énoncé).', 'L’infimum ponctuel doit être atteint pour presque tout $\\mathbf{x}$. Même schéma pour la perte asymétrique (PC8 Ex. 1).'],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 3. Régression
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s3-regression',
    title: '3. Régression : l’espérance conditionnelle est le prédicteur bayésien',
    role: 'preuves',
    intro:
      'Pour la perte quadratique, la meilleure fonction des attributs est la **projection** de $Y$ sur l’espace des fonctions de $\\mathbf{X}$ : l’espérance conditionnelle. L’identité du Th. 1.1 est un théorème de **Pythagore**.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch8-thm-1-1',
        type: 'theoreme',
        label: 'Théorème 1.1',
        title: 'Prédicteur bayésien en régression, perte quadratique',
        source: 'Poly ch.8, Th. 1.1, p. 14',
        hypotheses: [
          '$\\mathbb{E}[Y^2]<\\infty$.',
          '$g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X}):=\\mathbb{E}[Y\\mid\\mathbf{X}]$.',
          '$g:\\mathbb{R}^d\\to\\mathbb{R}$ mesurable avec $\\mathbb{E}[g^2(\\mathbf{X})]<\\infty$ (le cas $\\mathbb{E}[g^2(\\mathbf{X})]=\\infty$ est traité dans la preuve).',
        ],
        statement: `$$\\mathbb{E}\\big[(Y-g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X}))^2\\big]\\le\\mathbb{E}\\big[(Y-g(\\mathbf{X}))^2\\big],$$

et plus précisément (**Pythagore**)

$$\\mathbb{E}\\big[(Y-g(\\mathbf{X}))^2\\big]=\\mathbb{E}\\big[(Y-g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X}))^2\\big]+\\mathbb{E}\\big[(g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X})-g(\\mathbf{X}))^2\\big].$$

$g^\\star_{\\ell_2,\\mathbb{P}}$ est une **règle de décision bayésienne** pour la perte quadratique, **unique à l’égalité $\\mathbb{P}$-p.s. près**.`,
        intuition: 'Erreur de $g$ = **erreur incompressible** (celle que commet encore $g^\\star$ ; la part de $Y$ que les attributs n’expliquent pas) + **distance** de $g$ à $g^\\star$. Le risque bayésien quadratique est la variance résiduelle $\\mathbb{E}[(Y-\\mathbb{E}[Y\\mid\\mathbf{X}])^2]$, en général $>0$.',
        proof: [
          {
            text: '$\\mathbb{E}[Y\\mid\\mathbf{X}]$ est la projection orthogonale de $Y$ sur le sous-espace fermé $\\mathrm{L}^2(\\Omega,\\sigma(\\mathbf{X}),\\mathbb{P})$ ; il existe $g^\\star_{\\ell_2,\\mathbb{P}}$ mesurable avec $g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X})=\\mathbb{E}[Y\\mid\\mathbf{X}]$, et $\\mathbb{E}[(g^\\star_{\\ell_2,\\mathbb{P}})^2(\\mathbf{X})]<\\infty$.',
            justification: 'Définition 2.3 (espérance conditionnelle = projection, Lemme 2.1) et **lemme de Doob** (Prop. 2.1).',
          },
          {
            text: 'On écrit $Y-g(\\mathbf{X})=(Y-g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X}))+(g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X})-g(\\mathbf{X}))$ et on développe le carré : $\\mathbb{E}[(Y-g)^2]=\\mathbb{E}[(Y-g^\\star)^2]+2\\,\\mathbb{E}[(Y-g^\\star)(g^\\star-g)]+\\mathbb{E}[(g^\\star-g)^2]$.',
            justification: 'Les trois espérances sont **finies** car $Y$, $g^\\star(\\mathbf{X})$, $g(\\mathbf{X})$ sont de carré intégrable ($|ab|\\le\\frac12(a^2+b^2)$).',
          },
          {
            text: 'Le terme croisé est nul : $T:=g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X})-g(\\mathbf{X})\\in\\mathrm{L}^2(\\Omega,\\sigma(\\mathbf{X}),\\mathbb{P})$ donc $\\mathbb{E}[(Y-g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X}))\\,T]=0$. L’identité suit, puis l’inégalité car le dernier terme est positif.',
            justification: '**Relation d’orthogonalité** caractérisant la projection (Th. 2.2 (ii)).',
          },
          {
            text: 'Si $\\mathbb{E}[g^2(\\mathbf{X})]=\\infty$, alors $Y-g(\\mathbf{X})$ n’est pas de carré intégrable, donc $\\mathbb{E}[(Y-g(\\mathbf{X}))^2]=+\\infty$ et l’inégalité reste vraie : l’infimum de la Déf. 1.4 est **atteint** en $g^\\star_{\\ell_2,\\mathbb{P}}$.',
            justification: 'Sinon $g(\\mathbf{X})=Y-(Y-g(\\mathbf{X}))$ serait de carré intégrable, $\\mathrm{L}^2$ étant un **espace vectoriel**.',
          },
          {
            text: 'Unicité : si $g$ réalise aussi le minimum, l’identité donne $\\mathbb{E}[(g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X})-g(\\mathbf{X}))^2]=0$, donc $g(\\mathbf{X})=g^\\star_{\\ell_2,\\mathbb{P}}(\\mathbf{X})$ $\\mathbb{P}$-p.s. □',
            justification: 'Une variable positive d’espérance nulle est nulle p.s.',
          },
        ],
        pitfalls: ['L’unicité est **p.s. en $\\mathbf{X}$** : on peut modifier $g^\\star$ sur un ensemble $\\mathbb{P}_{\\mathbf{X}}$-négligeable.', 'L’hypothèse $\\mathbb{E}[Y^2]<\\infty$ est indispensable ; ne pas oublier le cas $\\mathbb{E}[g^2(\\mathbf{X})]=\\infty$.', 'C’est la **relation d’orthogonalité** (et non l’inégalité de minimalité) qui fait la preuve.'],
      },
      {
        kind: 'viz',
        id: 'ch8-s3-viz-pythagore',
        vizId: 'ch8-pythagore',
        caption: 'Th. 1.1 : le risque d’une droite $g$ se décompose en erreur incompressible $\\mathbb{E}[(Y-g^\\star(X))^2]$ plus distance $\\mathbb{E}[(g^\\star(X)-g(X))^2]$ ; aucune $g$ ne passe sous la barre grise.',
      },
      {
        kind: 'example',
        id: 'ch8-ex-reg-bruit',
        title: 'Exemple — Modèle « signal + bruit » : le risque bayésien est la variance du bruit',
        source: 'Variante (illustration du Th. 1.1, cadre de l’Ex. 1.5)',
        setup: '$Y=f(\\mathbf{X})+\\varepsilon$ avec $f$ mesurable, $\\mathbb{E}[f^2(\\mathbf{X})]<\\infty$, $\\varepsilon$ indépendant de $\\mathbf{X}$, centré, de variance $\\sigma^2$. Déterminer $g^\\star$, $R^\\star_2$ et $R_2(g)$.',
        steps: [
          {
            text: '$\\mathbb{E}[Y\\mid\\mathbf{X}]=f(\\mathbf{X})+\\mathbb{E}[\\varepsilon\\mid\\mathbf{X}]=f(\\mathbf{X})+\\mathbb{E}[\\varepsilon]=f(\\mathbf{X})$, donc $g^\\star=f$.',
            justification: 'Linéarité, $\\mathbb{E}[\\phi(\\mathbf{X})\\mid\\mathbf{X}]=\\phi(\\mathbf{X})$ (Prop. 2.4 (iv)–(v)) et indépendance (Prop. 2.5).',
          },
          {
            text: '$R^\\star_2=\\mathbb{E}[(Y-f(\\mathbf{X}))^2]=\\mathbb{E}[\\varepsilon^2]=\\sigma^2$.',
            justification: 'Le risque bayésien est le risque de $g^\\star$ (Th. 1.1).',
          },
          {
            text: 'Pour toute $g$ de carré intégrable : $R_2(g)=\\sigma^2+\\mathbb{E}[(f(\\mathbf{X})-g(\\mathbf{X}))^2]$.',
            justification: 'Identité de Pythagore du Th. 1.1.',
          },
        ],
        conclusion: 'Exemple numérique : $X\\sim\\mathcal{U}([0,1])$, $f(x)=\\sin(2\\pi x)$, $\\sigma=0{,}5$, $g(x)=x$ : $R_2(g)=0{,}25+\\int_0^1(\\sin2\\pi x-x)^2\\mathrm{d}x=0{,}25+\\frac12+\\frac1\\pi+\\frac13\\approx1{,}40$ (vérifié par Monte-Carlo).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 4. Classification binaire
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s4-classif',
    title: '4. Classification binaire : fonction de régression et classifieur de Bayes',
    role: 'preuves',
    intro:
      'En classification binaire avec la perte 0–1, tout se lit sur une seule fonction : la probabilité de la classe 1 sachant les attributs, $\\eta(\\mathbf{x})$. Le classifieur de Bayes prédit le **label le plus probable**. Le Th. 1.2 et sa preuve sont la question 1 de l’Examen 2025 Ex. 3.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch8-def-1-5',
        type: 'definition',
        label: 'Définition 1.5',
        title: 'Fonction de régression',
        source: 'Poly ch.8, Déf. 1.5, p. 15',
        hypotheses: ['Classification binaire, $Y\\in\\{-1,1\\}$.'],
        statement: `La **fonction de régression** est la fonction mesurable $\\eta:\\mathsf{X}\\to[0,1]$, **unique à l’égalité $\\mathbb{P}$-p.s. près**, telle que

$$\\eta(\\mathbf{X})=\\mathbb{P}(Y=1\\mid\\mathbf{X})=\\mathbb{E}\\big[\\mathbb{1}_{\\{Y=1\\}}\\mid\\mathbf{X}\\big].$$`,
        intuition: 'Probabilité de la classe 1 à attributs donnés : « la quantité qui gouverne tout » en classification binaire.',
        proof: [
          { text: 'Existence et unicité p.s. de $\\eta$ mesurable avec $\\eta(\\mathbf{X})=\\mathbb{E}[\\mathbb{1}_{\\{Y=1\\}}\\mid\\mathbf{X}]$.', justification: 'Définition de l’espérance conditionnelle (Th.-déf. 2.1) et **lemme de Doob** (Prop. 2.1).' },
          { text: '$0\\le\\eta(\\mathbf{X})\\le1$ p.s.', justification: '**Positivité** de l’espérance conditionnelle (Prop. 2.4 (iii)) appliquée à $\\mathbb{1}_{\\{Y=1\\}}\\ge0$ et à $1-\\mathbb{1}_{\\{Y=1\\}}\\ge0$.' },
          { text: '$\\mathbb{E}[\\mathbb{1}_{\\{Y=-1\\}}\\mid\\mathbf{X}]=1-\\eta(\\mathbf{X})$.', justification: 'Linéarité, car $\\mathbb{1}_{\\{Y=-1\\}}=1-\\mathbb{1}_{\\{Y=1\\}}$.' },
        ],
        pitfalls: ['Malgré son nom, $\\eta$ est une **probabilité conditionnelle**, à valeurs dans $[0,1]$.', 'Avec le codage $\\{-1,1\\}$, $\\mathbb{E}[Y\\mid\\mathbf{X}]=2\\eta(\\mathbf{X})-1\\neq\\eta(\\mathbf{X})$ (coquille fréquente, corrigé PC8 Ex. 6 Q3) ; avec $\\{0,1\\}$ (Prop. 4.1), $\\eta(\\mathbf{X})=\\mathbb{E}[Y\\mid\\mathbf{X}]$.'],
      },
      {
        kind: 'theorem',
        id: 'ch8-lemme-2-2',
        type: 'lemme',
        label: 'Lemme 2.2 (Outils)',
        title: 'Décomposition selon la fonction de régression',
        source: 'Poly ch.8, Outils, Lemme 2.2, p. 31',
        hypotheses: ['$Y$ à valeurs dans $\\{-1,1\\}$, $\\eta$ fonction de régression.', '$\\psi:\\mathbb{R}^d\\times\\{-1,1\\}\\to\\mathbb{R}_+$ mesurable **bornée**.'],
        statement: '$$\\mathbb{E}[\\psi(\\mathbf{X},Y)]=\\mathbb{E}[\\psi(\\mathbf{X},1)\\,\\eta(\\mathbf{X})]+\\mathbb{E}[\\psi(\\mathbf{X},-1)\\,(1-\\eta(\\mathbf{X}))].$$',
        intuition: 'On remplace une espérance sur le couple par une espérance sur $\\mathbf{X}$ seul, les deux valeurs de $Y$ étant pondérées par $\\eta(\\mathbf{X})$ et $1-\\eta(\\mathbf{X})$. C’est **l’outil de calcul de la preuve du Th. 1.2**.',
        proof: [
          { text: '$\\psi(\\mathbf{X},Y)=\\psi(\\mathbf{X},1)\\,\\mathbb{1}_{\\{Y=1\\}}+\\psi(\\mathbf{X},-1)\\,\\mathbb{1}_{\\{Y=-1\\}}$.', justification: '$Y$ ne prend que les valeurs $\\pm1$.' },
          { text: '$\\mathbb{E}[\\psi(\\mathbf{X},1)\\,\\mathbb{1}_{\\{Y=1\\}}]=\\mathbb{E}\\big[\\psi(\\mathbf{X},1)\\,\\mathbb{E}[\\mathbb{1}_{\\{Y=1\\}}\\mid\\mathbf{X}]\\big]=\\mathbb{E}[\\psi(\\mathbf{X},1)\\,\\eta(\\mathbf{X})]$.', justification: '$\\psi(\\mathbf{X},1)$ est $\\sigma(\\mathbf{X})$-mesurable et bornée : **tour** (Prop. 2.2) et **produit** (Prop. 2.3).' },
          { text: 'De même $\\mathbb{E}[\\psi(\\mathbf{X},-1)\\,\\mathbb{1}_{\\{Y=-1\\}}]=\\mathbb{E}[\\psi(\\mathbf{X},-1)(1-\\eta(\\mathbf{X}))]$. □', justification: 'Linéarité : $\\mathbb{E}[\\mathbb{1}_{\\{Y=-1\\}}\\mid\\mathbf{X}]=1-\\eta(\\mathbf{X})$.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch8-thm-1-2',
        type: 'theoreme',
        label: 'Théorème 1.2',
        title: 'Classifieur bayésien, excès de risque et risque bayésien',
        source: 'Poly ch.8, Th. 1.2, p. 15–16',
        hypotheses: [
          'Classification binaire $Y\\in\\{-1,1\\}$, perte 0–1.',
          '$\\eta$ fonction de régression (Déf. 1.5).',
          '$g^\\star(\\mathbf{x}):=2\\,\\mathbb{1}_{\\{\\eta(\\mathbf{x})\\ge1/2\\}}-1$ ; $g:\\mathbb{R}^d\\to\\{-1,1\\}$ classifieur mesurable quelconque.',
        ],
        statement: `$\\mathbb{P}(g^\\star(\\mathbf{X})\\neq Y)\\le\\mathbb{P}(g(\\mathbf{X})\\neq Y)$ : $g^\\star$ est un **classifieur bayésien** pour la perte 0–1. L’**excès de risque** vaut

$$R_{01}(g)-R_{01}(g^\\star)=\\mathbb{E}\\Big[|2\\eta(\\mathbf{X})-1|\\,\\mathbb{1}_{\\{g^\\star(\\mathbf{X})\\neq g(\\mathbf{X})\\}}\\Big]\\qquad(4)$$

et le **risque bayésien** vaut

$$R^\\star_{01}=\\mathbb{E}\\big[\\min\\big(\\eta(\\mathbf{X}),1-\\eta(\\mathbf{X})\\big)\\big].\\qquad(5)$$`,
        intuition: '$g^\\star$ retourne le **label le plus probable** ($1$ si $\\eta(\\mathbf{x})\\ge1-\\eta(\\mathbf{x})$). Dans (4), **on ne paie que là où $g$ décide autrement que $g^\\star$**, au prix $|2\\eta(\\mathbf{x})-1|$ : se tromper là où $\\eta\\approx1/2$ ne coûte presque rien. (5) : le risque incompressible est la moyenne de la **probabilité de la classe minoritaire** ; il est nul ssi $\\eta(\\mathbf{X})\\in\\{0,1\\}$ p.s.',
        proof: [
          {
            text: '**Décomposition.** Avec $\\psi_g(\\mathbf{x},y):=\\mathbb{1}_{\\{g(\\mathbf{x})\\neq y\\}}$, on a $\\psi_g(\\mathbf{x},1)=\\mathbb{1}_{\\{g(\\mathbf{x})=-1\\}}$, $\\psi_g(\\mathbf{x},-1)=\\mathbb{1}_{\\{g(\\mathbf{x})=1\\}}$, d’où $R_{01}(g)=\\mathbb{E}[\\mathbb{1}_{\\{g(\\mathbf{X})=-1\\}}\\eta(\\mathbf{X})]+\\mathbb{E}[\\mathbb{1}_{\\{g(\\mathbf{X})=1\\}}(1-\\eta(\\mathbf{X}))]$.',
            justification: '**Lemme 2.2** appliqué à la fonction bornée $\\psi_g$ ; $g$ est à valeurs dans $\\{-1,1\\}$.',
          },
          {
            text: '**Réécriture (6).** $R_{01}(g)=\\mathbb{E}\\big[\\mathbb{1}_{\\{g(\\mathbf{X})=-1\\}}(2\\eta(\\mathbf{X})-1)\\big]+\\mathbb{E}[1-\\eta(\\mathbf{X})]$.',
            justification: 'On remplace $\\mathbb{1}_{\\{g(\\mathbf{X})=1\\}}$ par $1-\\mathbb{1}_{\\{g(\\mathbf{X})=-1\\}}$ (classifieur binaire).',
          },
          {
            text: '**Différence (7).** Pour deux classifieurs : $R_{01}(g_1)-R_{01}(g_2)=\\mathbb{E}\\big[(\\mathbb{1}_{\\{g_1(\\mathbf{X})=-1\\}}-\\mathbb{1}_{\\{g_2(\\mathbf{X})=-1\\}})(2\\eta(\\mathbf{X})-1)\\big]$.',
            justification: 'Le second terme de (6) ne dépend pas de $g$ et se simplifie.',
          },
          {
            text: '**Étude de signe.** Avec $g_1=g$, $g_2=g^\\star$, $D:=\\mathbb{1}_{\\{g(\\mathbf{X})=-1\\}}-\\mathbb{1}_{\\{g^\\star(\\mathbf{X})=-1\\}}\\in\\{-1,0,1\\}$, nul ssi $g(\\mathbf{X})=g^\\star(\\mathbf{X})$. Si $D=1$ : $g^\\star(\\mathbf{X})=1$ donc $\\eta(\\mathbf{X})\\ge\\frac12$ et $D(2\\eta-1)=|2\\eta-1|$. Si $D=-1$ : $g^\\star(\\mathbf{X})=-1$ donc $\\eta(\\mathbf{X})<\\frac12$ et $D(2\\eta-1)=-(2\\eta-1)=|2\\eta-1|$.',
            justification: 'Définition de $g^\\star$ par le seuil $1/2$ sur $\\eta$ ; disjonction de cas.',
          },
          {
            text: 'Donc $D(2\\eta(\\mathbf{X})-1)=|2\\eta(\\mathbf{X})-1|\\,\\mathbb{1}_{\\{g(\\mathbf{X})\\neq g^\\star(\\mathbf{X})\\}}\\ge0$ : c’est (4), et $R_{01}(g)\\ge R_{01}(g^\\star)$ pour tout $g$, donc $R_{01}(g^\\star)=R^\\star_{01}$.',
            justification: 'Positivité de l’espérance ; définition du risque bayésien (Déf. 1.4).',
          },
          {
            text: '**Risque bayésien.** (6) avec $\\mathbb{1}_{\\{g^\\star(\\mathbf{X})=-1\\}}=\\mathbb{1}_{\\{\\eta(\\mathbf{X})<1/2\\}}$ donne $R_{01}(g^\\star)=\\mathbb{E}\\big[\\mathbb{1}_{\\{\\eta<1/2\\}}\\eta(\\mathbf{X})+\\mathbb{1}_{\\{\\eta\\ge1/2\\}}(1-\\eta(\\mathbf{X}))\\big]=\\mathbb{E}[\\min(\\eta(\\mathbf{X}),1-\\eta(\\mathbf{X}))]$. □',
            justification: '$\\min(\\eta,1-\\eta)=\\eta$ ssi $\\eta\\le1/2$, et les deux quantités coïncident en $\\eta=1/2$.',
          },
        ],
        pitfalls: [
          'Le seuil $1/2$ porte **sur $\\eta$** (une probabilité), pas sur $\\mathbf{x}$.',
          'De (7) : $|R_{01}(g_1)-R_{01}(g_2)|\\le\\mathbb{E}\\big[|2\\eta(\\mathbf{X})-1|\\,\\mathbb{1}_{\\{g_1(\\mathbf{X})\\neq g_2(\\mathbf{X})\\}}\\big]\\le\\mathbb{P}(g_1(\\mathbf{X})\\ne g_2(\\mathbf{X}))$ (PC8 Ex. 2 Q3).',
          'Ne pas confondre $R^\\star_{01}=\\mathbb{E}[\\min(\\eta,1-\\eta)]$ et $\\min(p,1-p)$, risque du meilleur classifieur **constant** ; par concavité du minimum (Jensen), $R^\\star_{01}\\le\\min(p,1-p)$.',
        ],
      },
      {
        kind: 'viz',
        id: 'ch8-s4-viz-bayes',
        vizId: 'ch8-bayes-1d',
        caption: 'Th. 1.2 et éq. (9) : $g^\\star$ prédit 1 là où $p\\,q_1$ domine $(1-p)\\,q_{-1}$, c’est-à-dire là où $\\eta\\ge1/2$ ; le risque bayésien est l’aire sous le minimum des deux courbes pondérées.',
      },
      {
        kind: 'text',
        id: 'ch8-s4-non-unicite',
        title: 'Remarque (p. 16) — Le classifieur bayésien n’est pas unique',
        text: 'Le choix de l’inégalité large $\\eta(\\mathbf{x})\\ge1/2$ est une **convention** : sur $\\{\\eta(\\mathbf{X})=1/2\\}$ les deux décisions ont le même risque conditionnel, et (4) montre que modifier $g^\\star$ sur cet ensemble ne change pas son risque (le poids $|2\\eta-1|$ y est nul). Le classifieur bayésien n’est donc **pas unique** en général : deux classifieurs bayésiens diffèrent seulement sur $\\{\\eta(\\mathbf{X})=1/2\\}$ à un négligeable près (PC8 Ex. 1 Q3, cas $c=1$). Contraste avec le Th. 1.1 (unicité p.s. en régression quadratique).',
      },
      {
        kind: 'viz',
        id: 'ch8-s4-viz-exces',
        vizId: 'ch8-exces-plugin',
        caption: 'Formule (4) en direct : l’excès de risque d’une règle seuillant une approximation $\\tilde\\eta$ est l’aire de $|2\\eta-1|\\,p_X$ sur la zone de désaccord ; la majoration (13) $2\\,\\mathbb{E}|\\eta-\\tilde\\eta|$ est en général plus grande.',
      },
      {
        kind: 'example',
        id: 'ch8-ex-pc8-2-q1',
        title: 'PC8 Ex. 2 Q1 — Une seconde écriture du risque bayésien',
        source: 'PC8 Ex. 2 Q1 (corrigé p. 9)',
        setup: 'Montrer que $R(g^\\star)=\\frac12-\\frac12\\mathbb{E}[|2\\eta(X)-1|]$, puis que $R(g^\\star)\\le\\frac12$ avec égalité ssi $\\mathbb{P}(\\eta(X)=1/2)=1$.',
        steps: [
          { text: '$R(g^\\star)=\\mathbb{E}[\\min(\\eta(X),1-\\eta(X))]$.', justification: 'Éq. (5) du Th. 1.2 (ou calcul direct : partition de $\\{g^\\star(X)\\ne Y\\}$, tour et produit).' },
          { text: 'Pour deux réels $a,b$ : $\\min(a,b)=\\frac{a+b}2-\\frac{|a-b|}2$. Avec $a=\\eta(X)$, $b=1-\\eta(X)$ : $a+b=1$, $|a-b|=|2\\eta(X)-1|$.', justification: 'Ajouter la demi-longueur de $[\\min,\\max]$ à la borne inférieure donne le milieu (commentaire du corrigé).' },
          { text: 'Donc $R(g^\\star)=\\frac12-\\frac12\\mathbb{E}[|2\\eta(X)-1|]$.', justification: 'Linéarité de l’espérance.' },
          { text: '$R(g^\\star)\\le\\frac12$, et $R(g^\\star)=\\frac12\\iff|2\\eta(X)-1|=0$ p.s. $\\iff\\mathbb{P}(\\eta(X)=1/2)=1$.', justification: 'Une variable positive d’espérance nulle est nulle p.s.' },
        ],
        conclusion: 'Le risque bayésien vaut $1/2$ exactement quand les attributs n’apportent aucune information sur la classe.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 5. Explicitation par les densités de classe
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s5-explicitation',
    title: '5. Expliciter la règle de Bayes : densités de classe et formule de Bayes',
    role: 'exemples',
    intro:
      'Quand on connaît la proportion $p$ de la classe 1 et les densités des attributs dans chaque classe, la fonction de régression s’obtient par la **formule de Bayes**, et la règle bayésienne compare les deux densités **pondérées**.',
    blocks: [
      {
        kind: 'text',
        id: 'ch8-s5-cadre',
        title: 'Cadre de l’explicitation (p. 16)',
        text: `$(\\mathsf{X},\\mathcal{X},\\mu)=(\\mathbb{R}^d,\\mathcal{B}(\\mathbb{R}^d),\\mathrm{Leb})$, $(\\mathsf{Y},\\mathcal{Y},\\nu)=(\\{-1,1\\},\\mathcal{P}(\\{-1,1\\}),\\mathrm{c})$ ; $\\mathcal{L}(Y)=\\widetilde{\\mathcal{B}\\mathrm{er}}(p)$ avec $p=\\mathbb{P}(Y=1)$ et **on suppose $p\\in\\,]0,1[$** (écarter les cas triviaux). Densité des labels par rapport à $\\mathrm{c}$ : $p_Y(y)=p\\,\\mathbb{1}_{\\{1\\}}(y)+(1-p)\\,\\mathbb{1}_{\\{-1\\}}(y)$. Densités de classe $q_1(\\mathbf{x}):=q_{\\mathbf{X}|Y}(\\mathbf{x}\\mid y=1)$, $q_{-1}(\\mathbf{x}):=q_{\\mathbf{X}|Y}(\\mathbf{x}\\mid y=-1)$. Par la factorisation (2) :

$$p_{\\mathbf{X},Y}(\\mathbf{x},y)=p\\,q_1(\\mathbf{x})\\,\\mathbb{1}_{\\{1\\}}(y)+(1-p)\\,q_{-1}(\\mathbf{x})\\,\\mathbb{1}_{\\{-1\\}}(y).\\qquad(8)$$`,
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-1-2',
        type: 'proposition',
        label: 'Proposition 1.2',
        title: 'Loi marginale des attributs : un mélange',
        source: 'Poly ch.8, Prop. 1.2, p. 16',
        hypotheses: ['Cadre ci-dessus, densité jointe (8).'],
        statement: `La loi des attributs admet la densité

$$p_{\\mathbf{X}}(\\mathbf{x})=\\int_{\\mathsf{Y}}p_{\\mathbf{X},Y}(\\mathbf{x},y)\\,\\mathrm{c}(\\mathrm{d}y)=p\\,q_1(\\mathbf{x})+(1-p)\\,q_{-1}(\\mathbf{x}) :$$

c’est un **mélange** des deux lois conditionnelles, de poids $p$ et $1-p$.`,
        intuition: 'Tirer une classe puis des attributs dans cette classe = tirer des attributs dans le mélange.',
        proof: [
          { text: 'Formule (1) : $p_{\\mathbf{X}}(\\mathbf{x})=\\int p_{\\mathbf{X},Y}(\\mathbf{x},y)\\,\\mathrm{c}(\\mathrm{d}y)=p_{\\mathbf{X},Y}(\\mathbf{x},1)+p_{\\mathbf{X},Y}(\\mathbf{x},-1)$.', justification: 'L’intégrale contre la mesure de comptage est la **somme des valeurs** en $y=1$ et $y=-1$ (Outils §2.7).' },
          { text: 'On lit $p_{\\mathbf{X},Y}(\\mathbf{x},1)=p\\,q_1(\\mathbf{x})$ et $p_{\\mathbf{X},Y}(\\mathbf{x},-1)=(1-p)\\,q_{-1}(\\mathbf{x})$ sur (8).', justification: 'Évaluation de (8) ; preuve non rédigée dans le poly.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-1-3-1-4',
        type: 'proposition',
        label: 'Propositions 1.3 et 1.4',
        title: 'Loi des labels sachant les attributs ; fonction de régression',
        source: 'Poly ch.8, Prop. 1.3 et 1.4, p. 17',
        hypotheses: ['$\\mathbf{x}$ tel que $p_{\\mathbf{X}}(\\mathbf{x})>0$ (pour la dernière écriture : $q_1(\\mathbf{x})>0$).'],
        statement: `$$q_{Y|\\mathbf{X}}(1\\mid\\mathbf{x})=\\frac{p\\,q_1(\\mathbf{x})}{p\\,q_1(\\mathbf{x})+(1-p)\\,q_{-1}(\\mathbf{x})},\\qquad q_{Y|\\mathbf{X}}(-1\\mid\\mathbf{x})=\\frac{(1-p)\\,q_{-1}(\\mathbf{x})}{p\\,q_1(\\mathbf{x})+(1-p)\\,q_{-1}(\\mathbf{x})},$$

et la fonction de régression vaut

$$\\eta(\\mathbf{x})=q_{Y|\\mathbf{X}}(1\\mid\\mathbf{x})=\\frac{p\\,q_1(\\mathbf{x})}{p\\,q_1(\\mathbf{x})+(1-p)\\,q_{-1}(\\mathbf{x})}=\\frac{1}{1+\\dfrac{(1-p)\\,q_{-1}(\\mathbf{x})}{p\\,q_1(\\mathbf{x})}}.$$`,
        intuition: '**Formule de Bayes** : probabilité a posteriori de chaque classe = poids a priori × vraisemblance de classe, normalisé. $\\eta$ ne dépend que du **rapport** $\\frac{(1-p)q_{-1}}{p\\,q_1}$.',
        proof: [
          { text: 'Prop. 1.3 : $q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})=p_{\\mathbf{X},Y}(\\mathbf{x},y)/p_{\\mathbf{X}}(\\mathbf{x})$ avec (8) et la Prop. 1.2.', justification: 'Définition (3) de la densité conditionnelle.' },
          { text: '$\\eta(\\mathbf{X})=\\mathbb{E}[\\mathbb{1}_{\\{Y=1\\}}\\mid\\mathbf{X}]=\\Big(\\int\\mathbb{1}_{\\{y=1\\}}q_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})\\,\\mathrm{c}(\\mathrm{d}y)\\Big)_{\\mathbf{x}=\\mathbf{X}}=q_{Y|\\mathbf{X}}(1\\mid\\mathbf{X})$.', justification: 'Espérance conditionnelle dans le **cas à densité** (Prop. 2.6) appliquée à $\\psi(y)=\\mathbb{1}_{\\{y=1\\}}$.' },
          { text: 'On conclut par la Prop. 1.3 ; l’ensemble $\\{p_{\\mathbf{X}}=0\\}$ étant de probabilité nulle sous la loi de $\\mathbf{X}$, cela détermine $\\eta$ p.s. □', justification: 'Unicité p.s. de la fonction de régression (Déf. 1.5).' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch8-eq-9',
        type: 'proposition',
        label: 'Formule (9)',
        title: 'Forme explicite du classifieur bayésien',
        source: 'Poly ch.8, éq. (9), p. 17',
        hypotheses: ['$p_{\\mathbf{X}}(\\mathbf{x})>0$.'],
        statement: '$$g^\\star(\\mathbf{x})=1\\quad\\text{si et seulement si}\\quad p\\,q_1(\\mathbf{x})\\ge(1-p)\\,q_{-1}(\\mathbf{x}).$$',
        intuition: 'Comparer les deux densités **pondérées par les proportions** des classes. En dimension 1, la zone « classe 1 » peut être formée de **plusieurs intervalles** (Figure 2 du poly).',
        proof: [
          { text: '$\\eta(\\mathbf{x})\\ge\\frac12\\iff2p\\,q_1(\\mathbf{x})\\ge p\\,q_1(\\mathbf{x})+(1-p)\\,q_{-1}(\\mathbf{x})\\iff p\\,q_1(\\mathbf{x})\\ge(1-p)\\,q_{-1}(\\mathbf{x})$.', justification: 'Prop. 1.4, multiplication par $2p_{\\mathbf{X}}(\\mathbf{x})>0$.' },
        ],
        pitfalls: ['Oublier les poids $p$ et $1-p$ : comparer seulement $q_1$ et $q_{-1}$ n’est correct que si $p=1/2$.'],
      },
      {
        kind: 'example',
        id: 'ch8-ex-1-6',
        title: 'Exemple 1.6 — Taille et genre : seuil au milieu des moyennes',
        source: 'Poly ch.8, Ex. 1.6, p. 17–18 (Figure 2)',
        setup: '$d=1$, $q_1=\\mathcal{N}(\\mu_1,\\sigma^2)$, $q_{-1}=\\mathcal{N}(\\mu_{-1},\\sigma^2)$ (même variance), $p=1/2$. Déterminer $g^\\star$.',
        steps: [
          { text: 'Avec $p=1/2$, (9) s’écrit $q_1(x)\\ge q_{-1}(x)$, soit $\\log q_1(x)-\\log q_{-1}(x)=-\\frac{(x-\\mu_1)^2}{2\\sigma^2}+\\frac{(x-\\mu_{-1})^2}{2\\sigma^2}\\ge0$.', justification: 'Passage au logarithme (strictement croissant) ; les constantes de normalisation sont égales car même $\\sigma$.' },
          { text: '$(x-\\mu_{-1})^2-(x-\\mu_1)^2=2x(\\mu_1-\\mu_{-1})-(\\mu_1^2-\\mu_{-1}^2)=2(\\mu_1-\\mu_{-1})\\big(x-\\frac{\\mu_1+\\mu_{-1}}2\\big)$.', justification: 'Les termes en $x^2$ se simplifient.' },
          { text: '$g^\\star(x)=1\\iff(\\mu_1-\\mu_{-1})\\big(x-\\frac{\\mu_1+\\mu_{-1}}2\\big)\\ge0$ : si $\\mu_1>\\mu_{-1}$, on prédit 1 **au-delà du point milieu** $\\frac{\\mu_1+\\mu_{-1}}2$.', justification: 'Division par $\\sigma^2>0$.' },
          { text: 'Pour $p$ quelconque : $g^\\star(x)=1\\iff(\\mu_1-\\mu_{-1})\\big(x-\\frac{\\mu_1+\\mu_{-1}}2\\big)\\ge\\sigma^2\\log\\frac{1-p}{p}$ : le seuil se décale vers la classe la moins probable.', justification: 'Le terme $\\log\\frac p{1-p}$ s’ajoute au log-rapport (calcul de l’extracteur, cas $d=1$ de la LDA).' },
        ],
        conclusion: 'La frontière est un **seuil** qui se déplace dès que $p\\neq1/2$ ou que les variances diffèrent (alors deux seuils possibles : QDA). Exemple : $\\mu_{-1}=0$, $\\mu_1=2$, $\\sigma=1$ : seuil $1$ si $p=1/2$, seuil $1-\\frac{\\ln4}2\\approx0{,}307$ si $p=0{,}8$.',
      },
      {
        kind: 'example',
        id: 'ch8-ex-pc8-5',
        title: 'PC8 Ex. 5 — Lois conditionnelles uniformes : η, risque bayésien, excès de risque',
        source: 'PC8 Ex. 5 (corrigé p. 18–20)',
        setup: '$d=1$, $\\mathbb{P}(Y=-1)=\\mathbb{P}(Y=1)=\\frac12$, $X\\mid Y=-1\\sim\\mathcal{U}([0,2])$, $X\\mid Y=1\\sim\\mathcal{U}([1,4])$. Calculer $p_X$, $\\eta$, $R(g^\\star)$ et l’excès de risque de $g(x)=2\\,\\mathbb{1}_{\\{x\\ge1\\}}-1$.',
        steps: [
          { text: '$p_X=\\frac12q_{-1}+\\frac12q_1$ avec $q_{-1}=\\frac12\\mathbb{1}_{[0,2]}$, $q_1=\\frac13\\mathbb{1}_{[1,4]}$ : $p_X=\\frac14$ sur $]0,1[$, $\\frac5{12}$ sur $]1,2[$, $\\frac16$ sur $]2,4[$.', justification: 'Prop. 1.2 (mélange), ou probabilités totales sur les f.d.r.' },
          { text: '$\\eta=\\frac{q_1}{q_{-1}+q_1}$ : $\\eta=0$ sur $[0,1]$, $\\eta=\\frac{1/3}{1/2+1/3}=\\frac25$ sur $]1,2]$, $\\eta=1$ sur $]2,4]$.', justification: 'Prop. 1.4 avec $p=1/2$ ; $\\eta$ n’est définie que sur le support $[0,4]$, à un négligeable près.' },
          { text: '$g^\\star(x)=1\\iff\\eta(x)\\ge\\frac12\\iff x\\in\\,]2,4]$ : sur la zone de recouvrement $]1,2]$, on prédit $-1$ car $\\frac25<\\frac12$.', justification: 'Th. 1.2. Bien que les classes soient équiprobables, la densité de la classe $-1$ y est plus grande ($\\frac12>\\frac13$).' },
          { text: '$R(g^\\star)=\\mathbb{P}(Y=1,X\\le2)+\\mathbb{P}(Y=-1,X>2)=\\frac12\\cdot\\frac13+0=\\frac16$.', justification: 'Décomposition des erreurs ; contrôle par (5) : $\\mathbb{E}[\\min(\\eta,1-\\eta)]=\\frac25\\cdot\\mathbb{P}(1<X\\le2)=\\frac25\\cdot\\frac5{12}=\\frac16$.' },
          { text: '$R(g)-R(g^\\star)=\\mathbb{E}[|2\\eta(X)-1|\\,\\mathbb{1}_{\\{g\\ne g^\\star\\}}]=\\frac15\\,\\mathbb{P}(1\\le X\\le2)=\\frac15\\cdot\\frac5{12}=\\frac1{12}$.', justification: 'Formule (4) : $g$ et $g^\\star$ diffèrent sur $[1,2]$, où $|2\\eta-1|=\\frac15$. Vérification : $R(g)=\\frac12\\cdot\\frac12=\\frac14=\\frac16+\\frac1{12}$.' },
        ],
        conclusion: 'Le seuil de $g^\\star$ est en $x=2$, **pas** au milieu de la zone de recouvrement. L’excès de risque est petit car on ne se trompe que là où $\\eta=\\frac25$ est proche de $\\frac12$.',
      },
      {
        kind: 'text',
        id: 'ch8-s5-bilan',
        title: 'Bilan (p. 18) — La règle de Bayes n’est pas une fonction des observations ; le double aléa',
        text: '$g^\\star_{\\ell,\\mathbb{P}}$ est optimale pour $\\mathbb{P}$ et $\\ell$, mais le statisticien **ne connaît pas** la loi jointe : $g^\\star$ n’est pas une fonction des observations et le risque bayésien est un objet **purement théorique**, auquel on se compare. On construit $\\widehat g_n$ à partir de $\\mathcal{D}_n$ et il faut gérer un **double aléa** : celui du couple $(\\mathbf{X},Y)$ sur lequel la règle est **évaluée**, et celui de $\\mathcal{D}_n$ à partir duquel elle est **construite**. Ils ne jouent pas le même rôle et ne se moyennent pas au même endroit (§7).',
      },
    ],
  },
]
