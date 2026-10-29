import type { CourseSection } from '../types'

/** Sections 1 à 5 : intuition et notations, modèle statistique et domination, identifiabilité, statistiques et modèle induit, n-échantillon et premiers estimateurs. */
export const coursePart1: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 1. Intuition et notations
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s1-intuition',
    title: '1. Intuition et notations : la démarche statistique',
    role: 'intuition',
    intro:
      'Un modèle statistique est une **hypothèse mathématiquement formalisée** sur le mécanisme aléatoire qui a produit les données : un espace d’observations et une famille de lois candidates. Tout le cours (estimation, régions de confiance, tests, apprentissage) se déroule **à l’intérieur** d’un modèle ; le choix du modèle, lui, est une hypothèse discutable (« tous les modèles sont faux, mais certains sont utiles », G. Box).',
    blocks: [
      {
        kind: 'text',
        id: 'ch1-s1-demarche',
        title: 'Qu’est-ce qu’un modèle ? La démarche statistique (Poly ch.1, introduction et §1.1, p. 7–8)',
        text: `Moralement, un modèle statistique est une description mathématique simplifiée d’un phénomène aléatoire réel : un pont entre le monde des **données** (observées) et celui des **lois de probabilité** (nos hypothèses sur la manière dont les données sont produites). En choisissant un modèle, on fixe un cadre dans lequel on pourra **estimer** des grandeurs inconnues, **prédire** de nouvelles observations ou **tester** des hypothèses. Comme toute simplification, il ne capture pas toute la réalité, mais en retient les aspects jugés essentiels pour une question précise.

La statistique est l’étude de la *collecte*, de la *modélisation* et du *traitement* des données. Trois questions fil rouge du poly : quelle est la probabilité qu’une pièce retombe sur « pile » (les pièces de 1 centime sont-elles biaisées) ? quelle est la taille moyenne d’une personne dans une salle de cours (les élèves de Polytechnique sont-ils plus grands que la moyenne) ? quelle proportion des élèves de deuxième année a déjà utilisé un modèle d’IA pour faire un devoir ?

Le **point de départ** est un jeu de données $(x_1,\\dots,x_n)$ : numériques (scalaires, vecteurs $x_i\\in\\mathbb{R}^d$, matrices), symboliques ($x_i\\in\\{0,1\\}$) ou structurées (graphes, séries chronologiques, fonctions, textes, images).`,
      },
      {
        kind: 'text',
        id: 'ch1-s1-deux-etapes',
        title: 'Les deux étapes de la modélisation (§1.2, p. 8)',
        text: `1. On modélise les observations comme des **réalisations de variables aléatoires** : les données sont la réalisation d’un élément aléatoire $Z=(X_1,\\dots,X_n)$ défini sur un espace probabilisé $(\\Omega,\\mathcal{A},\\mathbb{P})$ (toujours omis dans la suite), à valeurs dans un espace mesurable $(\\mathsf{Z},\\mathcal{Z})$, l’**espace des observations** : $Z(\\omega)=(x_1,\\dots,x_n)$.
2. On modélise la **loi** de ces variables : la loi de $Z$ est *partiellement connue*, c’est un élément d’une famille $\\mathcal{C}$ de lois de probabilité.

**Intuition (encart du poly, p. 10).** Construire un modèle, c’est répondre à trois questions : qu’est-ce que j’observe (l’espace $(\\mathsf{Z},\\mathcal{Z})$) ? quels mécanismes aléatoires ai-je envisagés (la famille $\\mathcal{C}$) ? que veux-je apprendre (la problématique) ? Plus la famille $\\mathcal{C}$ est grande, moins le modèle fait d’hypothèses, mais plus il sera difficile d’en extraire une réponse précise.`,
      },
      {
        kind: 'viz',
        id: 'ch1-s1-viz-modele',
        vizId: 'ch1-modele-famille',
        caption: 'Un modèle = un espace d’observations fixe et une famille de lois ; le curseur $\\theta$ parcourt la famille, les données ont été produites par un membre inconnu de cette famille.',
      },
      {
        kind: 'text',
        id: 'ch1-s1-notations',
        title: 'Notations du poly (à reproduire telles quelles)',
        text: `- **Ensembles en police sans empattement**, variables en italique : $\\mathsf{Z}$, $\\mathsf{X}$, $\\mathsf{T}$ sont des ensembles (espace des observations, espace d’une observation, espace d’arrivée d’une statistique) ; $Z$, $X_i$, $T$ sont l’observation et les statistiques. Les tribus sont calligraphiques : $\\mathcal{Z}$, $\\mathcal{X}$, $\\mathcal{T}$ ; $\\mathcal{P}(E)$ est la tribu de toutes les parties de $E$ et $\\mathcal{B}(\\mathbb{R}^n)$ la tribu borélienne.
- **Lois en gras de tableau** : $\\mathbb{P}$, $\\mathbb{P}_\\theta$ désignent des lois sur $(\\mathsf{Z},\\mathcal{Z})$ ; $\\mathbb{Q}$, $\\mathbb{Q}_\\theta$ la loi d’*une* observation, de sorte que $\\mathbb{P}=\\mathbb{Q}^{\\otimes n}$ pour un $n$-échantillon. $\\mathcal{C}$ est la famille de lois du modèle ; $\\Theta\\subset\\mathbb{R}^d$ l’espace des paramètres.
- $\\mathbb{E}_\\theta[\\cdot]$, $\\mathbb{P}_\\theta(\\cdot)$, $\\mathrm{Var}_\\theta$ : espérance, probabilité, variance **sous l’hypothèse que l’observation suit $\\mathbb{P}_\\theta$**. Écrire $\\mathbb{E}[\\cdot]$ sans indice quand l’espérance dépend de $\\theta$ est une erreur.
- **Mesures** : $\\mathrm{Leb}$, $\\mathrm{Leb}^{\\otimes n}$ (Lebesgue sur $\\mathbb{R}$, $\\mathbb{R}^n$) ; mesure de comptage sur $\\mathbb{N}$ ou $\\{0,1\\}^n$ ; $p\\cdot\\mu$ est la mesure de densité $p$ par rapport à $\\mu$, $(p\\cdot\\mu)(A)=\\int_Ap\\,\\mathrm{d}\\mu$ ; $\\mu\\ll\\mu'$ : $\\mu$ absolument continue par rapport à $\\mu'$ ; $\\delta_a$ masse de Dirac.
- **Lois usuelles** : $\\mathcal{B}\\mathrm{er}(\\theta)$, $\\mathrm{Bin}(n,\\theta)$, $\\mathcal{P}\\mathrm{oi}(\\lambda)$, $\\mathcal{U}([0,\\theta])$, $\\mathcal{N}(\\mu,\\sigma^2)$, $\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n)$ avec $\\mathbf{1}_n=(1,\\dots,1)^\\top$ et $\\mathrm{I}_n$ l’identité ; $\\mathcal{E}(\\lambda)$ **paramétrée par l’intensité** $\\lambda$ (densité $\\lambda e^{-\\lambda x}\\mathbb{1}_{\\mathbb{R}_+}(x)$, moyenne $1/\\lambda$) ; $\\mathrm{Gamma}(p,\\lambda)$ de forme $p$ et d’intensité $\\lambda$ (loi de $Z/\\lambda$, $Z\\sim\\mathrm{Gamma}(p)$) ; $\\chi^2(\\nu)$, $t(r)$.
- **Statistiques usuelles** : $\\bar X_n=\\frac1n\\sum_{i=1}^nX_i$ ; $S_n^2=\\frac1{n-1}\\sum_{i=1}^n(X_i-\\bar X_n)^2$ (variance empirique **corrigée**, Gosset) ; statistiques d’ordre $X_{(1)}\\le\\dots\\le X_{(n)}$ (notées aussi $X_{1:n}\\le\\dots\\le X_{n:n}$ dans les PC) ; médiane empirique $\\mathrm{med}(X_1,\\dots,X_n)$ ; $\\|z\\|_\\infty=\\max_i|x_i|$.
- **Attention aux doubles sens** : dans l’Exercice 3 de la PC1, $S_n$ désigne la **somme** $\\sum_iX_i$ (et $K_n=\\sum_i(X_i-n^{-1}S_n)^2$), pas l’écart-type empirique ; dans l’Ex. 1.8, $S_1,S_2,S_3$ sont des applications. Dans la Prop. 2.6, $X_{(i)}$ désigne un sous-vecteur (bloc), pas une statistique d’ordre.
- **Loi image** $\\mathbb{P}^T(A)=\\mathbb{P}(T\\in A)$ ; $\\mathbb{P}_\\theta^{X_i}$ loi de $X_i$ sous $\\mathbb{P}_\\theta$ ; $\\frac{\\sigma^2}{n-1}\\chi^2(n-1)$ désigne (abus) la loi de $\\frac{\\sigma^2}{n-1}Y$, $Y\\sim\\chi^2(n-1)$.
- **Algèbre linéaire** : $P_F$ matrice de la projection orthogonale sur $F$, $F^\\perp$ son orthogonal, $d_i=\\dim F_i$ ; $J_\\psi$ matrice jacobienne, $\\mathrm{Det}$ déterminant ; $A^\\top$ transposée (les feuilles d’exercices écrivent $a'$) ; $A^\\#=(A^\\top A)^{-1}A^\\top$ pseudo-inverse à gauche.
- **Double numérotation** : les énoncés encadrés sont numérotés « N.M » (Définition 1.1, Théorème 1.3, Proposition 2.4…) ; les définitions non encadrées sont numérotées en continu sur le chapitre (Définition 1 : modèle dominé, …, Définition 14 : mesure à densité). Il y a donc une « Définition 1.1 » (modèle statistique) et une « Définition 1 » (modèle dominé).`,
      },
      {
        kind: 'text',
        id: 'ch1-s1-objectifs',
        title: 'Statistique et probabilités : le problème inverse ; les objectifs (§1.3, p. 11–12)',
        text: `En probabilités, la loi est supposée **connue** : étant donnés $\\mathbb{P}$ et $Z$, on évalue $\\mathbb{P}(f(Z)\\ge c)$, $\\mathbb{E}[f(Z)]$… En statistique, on résout un **problème inverse** : étant donnée une réalisation $z=(x_1,\\dots,x_n)$ de $Z$, on cherche à *inférer* des caractéristiques de la loi.

« On considère le modèle $(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$ » signifie « on suppose observer une réalisation d’une variable aléatoire $Z$ à valeurs dans $\\mathsf{Z}$ dont la loi est un élément de $\\mathcal{C}$ ». Par exemple « on considère le modèle $(\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}_+),\\{q_\\lambda\\cdot\\mathrm{Leb},\\ \\lambda>0\\})$ » avec $q_\\lambda(x)=\\lambda e^{-\\lambda x}\\mathbb{1}_{\\mathbb{R}_+}(x)$ signifie que l’on observe $X$ de loi exponentielle de paramètre $\\lambda$, pour un certain $\\lambda>0$ inconnu. Les notations $\\mathbb{E}_\\theta$, $\\mathbb{P}_\\theta$ soulignent cette hypothèse.

**Objectifs** à partir des observations (modèle paramétrique) :
- **estimation ponctuelle** : donner une valeur *plausible* du paramètre $\\theta$ (cours 2 et 3) ;
- **estimation par région** : déterminer $\\Theta_0(Z)\\subset\\Theta$ auquel $\\theta$ appartient de façon plausible (cours 3) ;
- **test** : décider si $\\theta$ appartient à un sous-ensemble $\\Theta_0$ et évaluer la plausibilité de la décision (cours 4 et 5) ;
- **prédiction** : donner une valeur plausible d’une quantité non observée, par exemple une sortie $Y$ à partir d’une entrée $X$ (régression, PC1 Ex. 4).

**Un modèle est une hypothèse.** Modéliser un pile ou face par une Bernoulli, des tailles par une gaussienne, un sondage par des Bernoulli i.i.d., un temps d’attente par une exponentielle : simplifications utiles mais discutables (dépendances, queues de distribution, biais de réponse, non-stationnarité). À l’intérieur du modèle tout est rigoureux ; le choix du modèle peut être inexact (critique de modèle : PC1 Ex. 1, 5, 6).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 2. Modèle statistique, modèle dominé
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s2-modele',
    title: '2. Modèle statistique, modèle paramétrique, modèle dominé',
    role: 'definitions',
    intro:
      'La Définition 1.1 fixe l’objet central du cours ; les Exemples 1.1 à 1.4 sont les quatre modèles fétiches (pile ou face, tailles, temps d’attente, sondage). La Définition 1 (famille dominée) est ce qui permettra d’écrire des **densités**, donc la vraisemblance du chapitre 2.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch1-def-1-1',
        type: 'definition',
        label: 'Définition 1.1',
        title: 'Modèle statistique ; modèle paramétrique',
        source: 'Poly ch.1, Déf. 1.1, p. 8',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z})$ espace mesurable.'],
        statement: `Un **modèle statistique** est la donnée :

- d’un espace mesurable $(\\mathsf{Z},\\mathcal{Z})$, dit l’**espace des observations** ;
- d’une famille de probabilités $\\mathcal{C}$ sur $(\\mathsf{Z},\\mathcal{Z})$.

On le note $(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$. Le modèle est dit **paramétrique** lorsque $\\mathcal{C}$ correspond à une famille $\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\}$ où $\\Theta$ est un sous-ensemble de $\\mathbb{R}^d$, $d\\ge1$ : le paramètre $\\theta$ est de **dimension finie**. Il est dit **non paramétrique** lorsqu’il ne se décrit pas par un nombre fini de paramètres réels (par exemple l’ensemble de toutes les lois à densité continue sur $\\mathbb{R}$).

*Abus de langage* (p. 8) : quand l’espace est clair, on appelle « modèle » la seule famille $\\mathcal{C}$ et l’on parle du modèle $\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\}$.`,
        intuition: 'Un modèle = « ce que j’observe » (l’espace et sa tribu) + « les mécanismes aléatoires que j’envisage » (la famille de lois). Toute la suite du cours suppose ce triplet fixé.',
        pitfalls: [
          'Dans un modèle paramétrique, $\\Theta\\subset\\mathbb{R}^d$ est de **dimension finie** : « $\\Theta$ peut être de dimension infinie » est **faux** (question courte 2 du poly).',
          'Ne pas oublier la **tribu** dans le triplet ($\\mathcal{P}(\\{0,\\dots,n\\})$ pour un espace fini, $\\mathcal{B}(\\mathbb{R}^n)$ pour $\\mathbb{R}^n$).',
          'Le modèle décrit la loi de **toute** l’observation $Z=(X_1,\\dots,X_n)$, pas d’une seule coordonnée.',
        ],
      },
      {
        kind: 'example',
        id: 'ch1-ex-1-1-1-4',
        title: 'Exemples 1.1 à 1.4 — Pile ou face, tailles, temps d’attente, sondage',
        source: 'Poly ch.1, Ex. 1.1–1.4, p. 9–10',
        setup: 'Pour chaque situation, on écrit le triplet $(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$ en répondant aux trois questions : qu’observe-t-on ? quelle tribu ? quelle famille de lois ?',
        steps: [
          {
            text: '**Ex. 1.1 (pile ou face).** $n$ lancers indépendants de loi $\\mathcal{B}\\mathrm{er}(\\theta)$, on observe le **nombre** de piles : $\\big(\\{0,\\dots,n\\},\\ \\mathcal{P}(\\{0,\\dots,n\\}),\\ \\{\\mathrm{Bin}(n,\\theta),\\ \\theta\\in[0,1]\\}\\big)$.',
            justification: 'La somme de $n$ Bernoulli indépendantes de paramètre $\\theta$ suit $\\mathrm{Bin}(n,\\theta)$ ; on n’observe qu’un seul nombre, pas la suite des lancers (c’est le modèle induit par la somme, Ex. 1.12).',
          },
          {
            text: '**Ex. 1.2 (tailles).** $n$ tailles modélisées par des gaussiennes indépendantes de moyenne $\\mu$ et variance $\\sigma^2$ : $\\big(\\mathbb{R}^n,\\ \\mathcal{B}(\\mathbb{R}^n),\\ \\{\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n),\\ \\mu\\in\\mathbb{R},\\ \\sigma^2\\in\\mathbb{R}_+^*\\}\\big)$.',
            justification: 'Modèle paramétrique à $d=2$ paramètres $(\\mu,\\sigma^2)$ ; l’indépendance se lit sur la covariance diagonale $\\sigma^2\\mathrm{I}_n$ (vecteur gaussien, Prop. 2.6).',
          },
          {
            text: '**Ex. 1.3 (temps d’attente).** Bus à horaire régulier (départ toutes les $\\theta$ minutes) : $\\big(\\mathbb{R}_+^n,\\mathcal{B}(\\mathbb{R}_+^n),\\{\\mathcal{U}([0,\\theta])^{\\otimes n},\\ \\theta>0\\}\\big)$. Clients d’un café (arrivées sans mémoire) : $\\big(\\mathbb{R}_+^n,\\mathcal{B}(\\mathbb{R}_+^n),\\{\\mathcal{E}(\\lambda)^{\\otimes n},\\ \\lambda>0\\}\\big)$, $\\lambda$ = nombre moyen d’arrivées par minute.',
            justification: 'Même espace, même tribu : seule la famille de lois change, et avec elle l’hypothèse physique sur le mécanisme des arrivées (absence de mémoire $\\Leftrightarrow$ loi exponentielle). Point de départ de la PC1 Ex. 1.',
          },
          {
            text: '**Ex. 1.4 (sondage avec remise).** $x_i=1$ si le $i$-ème sondé vote A : $\\big(\\{0,1\\}^n,\\ \\mathcal{P}(\\{0,1\\}^n),\\ \\{\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n},\\ \\theta\\in\\Theta\\}\\big)$ avec $\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n}(\\{(x_1,\\dots,x_n)\\})=\\prod_{i=1}^n\\theta^{x_i}(1-\\theta)^{1-x_i}=\\theta^{\\sum_ix_i}(1-\\theta)^{n-\\sum_ix_i}$.',
            justification: 'Tirage uniforme **avec** replacement $\\Rightarrow$ indépendance exacte et loi produit ; sans replacement on obtiendrait la loi hypergéométrique (Compléments §4).',
          },
        ],
        conclusion: 'Le même type de données (des réels positifs, des 0/1) peut relever de modèles très différents : c’est la famille $\\mathcal{C}$ qui porte l’hypothèse. Rédaction attendue à l’examen pour « proposer un modèle » : écrire explicitement les trois éléments du triplet et commenter les hypothèses (indépendance, stationnarité, forme des lois) — PC1 Ex. 1.',
      },
      {
        kind: 'theorem',
        id: 'ch1-def-1-domine',
        type: 'definition',
        label: 'Définition 1',
        title: 'Famille dominée, modèle statistique dominé',
        source: 'Poly ch.1, Déf. 1, p. 10 ; Outils Déf. 14 et Thm 2.1',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z})$ espace mesurable.', '$\\mu$ mesure **$\\sigma$-finie** sur $(\\mathsf{Z},\\mathcal{Z})$ (la **même** pour toutes les lois de la famille).'],
        statement: `La famille $\\mathcal{C}$ est **dominée par la mesure $\\mu$** si toute loi $\\mathbb{P}\\in\\mathcal{C}$ admet une densité de probabilité $p$ par rapport à $\\mu$ : $\\mathbb{P}=p\\cdot\\mu$, i.e. $\\mathbb{P}(A)=\\int_Ap\\,\\mathrm{d}\\mu$ pour tout $A\\in\\mathcal{Z}$. Le modèle $(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$ est dit **dominé** lorsque $\\mathcal{C}$ est dominée.

Par le théorème de Radon–Nikodym (Thm 2.1), « dominé par $\\mu$ » équivaut à « $\\mathbb{P}\\ll\\mu$ pour toute $\\mathbb{P}\\in\\mathcal{C}$ ».`,
        intuition: 'La quasi-totalité des modèles du cours s’écrivent « $p_\\theta\\cdot\\mu$ » avec $\\mu$ = Lebesgue (lois à densité) ou mesure de comptage (lois discrètes). C’est ce qui permettra de définir la **vraisemblance** au chapitre 2.',
        pitfalls: [
          'La mesure dominante doit être **$\\sigma$-finie** : sinon Radon–Nikodym ne s’applique pas.',
          'La **densité** est une fonction, la **loi** est la mesure obtenue en l’intégrant : $p_\\theta(x)$ n’est pas une probabilité (sauf pour la mesure de comptage, où $p_\\lambda(k)=\\mathbb{P}(\\{k\\})$).',
          'Il faut toujours **préciser la mesure de référence** : « densité » tout court n’a pas de sens.',
          'Non dominé : $\\{\\delta_\\theta,\\theta\\in\\mathbb{R}\\}$ (une mesure $\\sigma$-finie a au plus un nombre dénombrable d’atomes, Compléments Ex. 4.13).',
        ],
      },
      {
        kind: 'example',
        id: 'ch1-ex-1-5',
        title: 'Exemple 1.5 — Trois modèles dominés et leurs densités',
        source: 'Poly ch.1, Ex. 1.5, p. 10–11',
        setup: 'Écrire la mesure dominante et la densité pour le modèle gaussien à $n$ observations, une observation de Poisson, le modèle de Bernoulli à $n$ observations.',
        steps: [
          {
            text: '**Gaussien**, dominé par $\\mathrm{Leb}^{\\otimes n}$ : $p_{\\mu,\\sigma^2}(x_1,\\dots,x_n)=(2\\pi\\sigma^2)^{-n/2}\\exp\\Big(-\\frac1{2\\sigma^2}\\sum_{i=1}^n(x_i-\\mu)^2\\Big)=\\prod_{i=1}^n(2\\pi\\sigma^2)^{-1/2}\\exp\\Big(-\\frac{(x_i-\\mu)^2}{2\\sigma^2}\\Big)$, et $\\mathcal{N}(\\mu,\\sigma^2)^{\\otimes n}(A)=\\int_Ap_{\\mu,\\sigma^2}\\,\\mathrm{d}\\mathrm{Leb}^{\\otimes n}$.',
            justification: 'Exponentielle d’une somme = produit d’exponentielles ; $p_{\\mu,\\sigma^2}(x)$ n’est pas une probabilité (un singleton est de loi nulle).',
          },
          {
            text: '**Poisson** : $(\\mathbb{N},\\mathcal{P}(\\mathbb{N}),\\{\\mathcal{P}\\mathrm{oi}(\\lambda),\\lambda>0\\})$, dominé par la **mesure de comptage** $\\mu$ sur $\\mathbb{N}$ : $p_\\lambda(k)=e^{-\\lambda}\\frac{\\lambda^k}{k!}$ et $\\mathcal{P}\\mathrm{oi}(\\lambda)(A)=\\sum_{k\\in A}p_\\lambda(k)$.',
            justification: 'Pour la mesure de comptage, $\\int_A p\\,\\mathrm{d}\\mu=\\sum_{k\\in A}p(k)$ ; ici $p_\\lambda(k)$ coïncide avec la probabilité du singleton, ce qui est propre à la mesure de comptage.',
          },
          {
            text: '**Bernoulli à $n$ observations**, dominé par la mesure de comptage sur $\\{0,1\\}^n$ : $p_\\theta(x_1,\\dots,x_n)=\\theta^{\\sum_ix_i}(1-\\theta)^{n-\\sum_ix_i}$ et $\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n}(A)=\\sum_{x\\in A}p_\\theta(x)$.',
            justification: 'Produit des densités de Bernoulli $\\theta^{x_i}(1-\\theta)^{1-x_i}$ (formule (1), §5).',
          },
        ],
        conclusion: 'Densité continue $\\leftrightarrow$ Lebesgue ; loi discrète $\\leftrightarrow$ mesure de comptage. Question courte 7 : $\\{\\mathcal{B}\\mathrm{er}(\\theta),\\theta\\in[0,1]\\}$ est dominé par la mesure de comptage sur $\\{0,1\\}$ (ou $\\delta_0+\\delta_1$) ; $\\{\\mathcal{N}(\\mu,1),\\mu\\in\\mathbb{R}\\}$ par $\\mathrm{Leb}$.',
      },
      {
        kind: 'text',
        id: 'ch1-s2-non-unicite',
        title: 'Non-unicité de la mesure dominante (p. 11 ; Compléments p. 57)',
        text: `La mesure de domination n’est jamais unique : toute mesure $\\sigma$-finie $\\mu'$ telle que $\\mu\\ll\\mu'$ domine aussi le modèle. Ce choix est **sans conséquence statistique** : si $\\mathbb{P}_\\theta=p_\\theta\\cdot\\mu=q_\\theta\\cdot\\nu$, alors (Compléments) $p_\\theta=q_\\theta\\,\\frac{n}{m}$ $\\lambda$-p.p. avec $\\lambda=\\mu+\\nu$, $\\mu=m\\cdot\\lambda$, $\\nu=n\\cdot\\lambda$ : deux densités relatives à deux mesures dominantes diffèrent d’un **facteur multiplicatif qui ne dépend pas de $\\theta$**. La vraisemblance (chapitre 2) n’est donc définie qu’à un facteur près indépendant de $\\theta$, et ses points de maximum ne changent pas.`,
      },
      {
        kind: 'viz',
        id: 'ch1-s2-viz-lois',
        vizId: 'ch1-lois-usuelles',
        caption: 'Les lois usuelles du chapitre avec la convention du poly (exponentielle et Gamma paramétrées par l’intensité) ; densité par rapport à Lebesgue ou à la mesure de comptage.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 3. Identifiabilité
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s3-identifiabilite',
    title: '3. Identifiabilité',
    role: 'definitions',
    intro:
      'Pour espérer retrouver $\\theta$ à partir des observations, il faut au minimum que deux valeurs distinctes du paramètre produisent deux lois distinctes : c’est l’**identifiabilité**. Méthode : exprimer $\\theta$ comme fonction de la loi (une probabilité d’événement, un moment) ; contre-exemple type : le mélange gaussien sans contrainte.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch1-def-2-identif',
        type: 'definition',
        label: 'Définition 2',
        title: 'Modèle identifiable',
        source: 'Poly ch.1, Déf. 2, §1.4, p. 12',
        hypotheses: ['Modèle **paramétrique** $(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$.'],
        statement: `Le modèle est **identifiable** si la fonction $\\theta\\mapsto\\mathbb{P}_\\theta$ est **injective** :

$$\\mathbb{P}_\\theta=\\mathbb{P}_{\\theta'}\\ \\Longrightarrow\\ \\theta=\\theta'.$$`,
        intuition: 'La connaissance complète de la loi $\\mathbb{P}_\\theta$ permet d’identifier $\\theta$ de façon unique : propriété **minimale** pour pouvoir estimer $\\theta$ (hypothèse de base de la consistance de l’EMV, chapitre 2).',
        pitfalls: [
          '**Montrer l’identifiabilité** : exhiber une quantité calculée à partir de la loi (probabilité d’un événement, espérance, covariance, fonction caractéristique) qui est une fonction **injective** de $\\theta$.',
          '**Montrer la non-identifiabilité** : exhiber $\\theta\\ne\\theta\'$ avec $\\mathbb{P}_\\theta=\\mathbb{P}_{\\theta\'}$.',
          'L’identifiabilité dépend de la **paramétrisation et de $\\Theta$** : on peut la rétablir en restreignant l’espace des paramètres (Ex. 1.7).',
        ],
      },
      {
        kind: 'example',
        id: 'ch1-ex-1-6',
        title: 'Exemple 1.6 — Les quatre modèles fétiches sont identifiables',
        source: 'Poly ch.1, Ex. 1.6 (avec démonstration), p. 12–13',
        setup: 'Pile ou face $\\{\\mathrm{Bin}(n,\\theta),\\theta\\in[0,1]\\}$ ; tailles $\\{\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n),(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+\\}$ (on autorise $\\sigma^2=0$, $\\mathcal{N}(\\mu\\mathbf{1}_n,0)=\\delta_{\\mu\\mathbf{1}_n}$) ; sondage $\\{\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n},\\theta\\in[0,1]\\}$ ; temps d’attente $\\{q_\\lambda\\cdot\\mathrm{Leb},\\lambda>0\\}$. Principe : exprimer le paramètre en fonction de la loi.',
        steps: [
          {
            text: '*Pile ou face.* $\\mathrm{Bin}(n,\\theta)(\\{n\\})=\\theta^n$. Si $\\mathrm{Bin}(n,\\theta)=\\mathrm{Bin}(n,\\theta\')$ alors $\\theta^n=\\theta\'^n$, donc $\\theta=\\theta\'$.',
            justification: '$t\\mapsto t^n$ est strictement croissante, donc injective, sur $[0,1]$.',
          },
          {
            text: '*Tailles.* Une loi sur $\\mathbb{R}^n$ de carré intégrable détermine son espérance et sa covariance ; $\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n)$ a pour espérance $\\mu\\mathbf{1}_n$ et covariance $\\sigma^2\\mathrm{I}_n$ (encore vrai pour $\\sigma^2=0$). Deux lois égales donnent $\\mu\\mathbf{1}_n=\\mu\'\\mathbf{1}_n$ et $\\sigma^2\\mathrm{I}_n=\\sigma\'^2\\mathrm{I}_n$, d’où $\\mu=\\mu\'$, $\\sigma^2=\\sigma\'^2$.',
            justification: 'Identification par les moments d’ordre 1 et 2 ; injectivité sur $\\mathbb{R}\\times\\mathbb{R}_+$, a fortiori sur $\\mathbb{R}\\times\\mathbb{R}_+^*$.',
          },
          {
            text: '*Sondage.* $\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n}(\\{(1,\\dots,1)\\})=\\theta^n$ (tous votent A) ; on conclut comme pour le pile ou face.',
            justification: 'Probabilité d’un événement bien choisi, fonction injective de $\\theta$.',
          },
          {
            text: '*Temps d’attente.* $\\mathbb{P}_\\lambda([1,+\\infty[)=\\int_1^{+\\infty}\\lambda e^{-\\lambda x}\\,\\mathrm{d}x=e^{-\\lambda}$ ; $e^{-\\lambda}=e^{-\\lambda\'}$ entraîne $\\lambda=\\lambda\'$.',
            justification: 'Injectivité de l’exponentielle.',
          },
        ],
        conclusion: 'Dans chaque cas on a trouvé un « morceau » de la loi (probabilité d’un événement, moment) qui est une fonction injective du paramètre. Autre outil : la fonction caractéristique, qui caractérise la loi (PC1 Ex. 7).',
      },
      {
        kind: 'example',
        id: 'ch1-ex-1-7',
        title: 'Exemple 1.7 — Mélange gaussien : non identifiable sans contrainte',
        source: 'Poly ch.1, Ex. 1.7, p. 13 ; PC1 Ex. 7',
        setup: '$\\sigma^2>0$ **connu** ; densités par rapport à $\\mathrm{Leb}$ : $p_{\\pi,\\mu_1,\\mu_2}=\\pi\\,p_{\\mathcal{N}(\\mu_1,\\sigma^2)}+(1-\\pi)\\,p_{\\mathcal{N}(\\mu_2,\\sigma^2)}$, $(\\pi,\\mu_1,\\mu_2)\\in[0,1]\\times\\mathbb{R}^2$ ($\\pi$ = proportion de la première composante).',
        steps: [
          {
            text: 'En échangeant les rôles des deux composantes, $p_{\\pi,\\mu_1,\\mu_2}=p_{1-\\pi,\\mu_2,\\mu_1}$.',
            justification: 'Commutativité de l’addition.',
          },
          {
            text: 'Dès que $\\mu_1\\ne\\mu_2$ ou $\\pi\\ne1/2$, les paramètres $(\\pi,\\mu_1,\\mu_2)$ et $(1-\\pi,\\mu_2,\\mu_1)$ sont distincts et donnent la même loi : le modèle **n’est pas identifiable**.',
            justification: 'Définition 2 (contraposée) : deux paramètres distincts de même loi.',
          },
          {
            text: 'On le rend identifiable en **restreignant l’espace des paramètres**, par exemple $\\mu_1<\\mu_2$ et $\\pi\\in\\,]0,1[$ (« conventions au bord à préciser », poly).',
            justification: 'L’identifiabilité des mélanges gaussiens et poissoniens ainsi contraints est démontrée dans la PC1 Ex. 7 par les fonctions caractéristiques et un système de Vandermonde.',
          },
        ],
        conclusion: 'Problème du « label switching » : les étiquettes des composantes sont arbitraires. D’autres non-identifiabilités existent au bord : si $\\pi=0$, $\\mu_1$ n’apparaît plus ; si $\\mu_1=\\mu_2$, $\\pi$ n’apparaît plus. Autre exemple (PC1 Ex. 5 Q7) : en n’observant que les totaux $L_k+V_k$ de buts, la loi ne dépend de $(\\lambda_1,\\lambda_2)$ que par $\\lambda_1+\\lambda_2$ : on peut estimer la somme, pas chaque intensité.',
      },
      {
        kind: 'viz',
        id: 'ch1-s3-viz-melange',
        vizId: 'ch1-melange-identifiabilite',
        caption: 'Échanger $(\\pi,\\mu_1,\\mu_2)$ et $(1-\\pi,\\mu_2,\\mu_1)$ ne change pas la densité ; la contrainte $\\mu_1<\\mu_2$ rétablit l’injectivité.',
      },
      {
        kind: 'example',
        id: 'ch1-ex-pc1-7',
        title: 'PC1 Ex. 7 — Identifiabilité des mélanges par la fonction caractéristique (bonus)',
        source: 'PC1 Ex. 7 (énoncé p. 7, corrigé p. 26–27) ; Poly ch.1, Exercices p. 41',
        setup: 'Simplexe $\\mathcal{S}=\\{\\alpha\\in\\mathbb{R}_+^K:\\sum_k\\alpha_k=1\\}$, $\\mathcal{M}=\\{\\mu\\in\\mathbb{R}^K:\\mu_1<\\dots<\\mu_K\\}$ ; mélange gaussien $f_{\\alpha,\\mu}(x)=\\frac1{\\sqrt{2\\pi}}\\sum_{k=1}^K\\alpha_ke^{-(x-\\mu_k)^2/2}$. Montrer que $(\\mathbb{R},\\mathcal{B}(\\mathbb{R}),\\{f_{\\alpha,\\mu}\\cdot\\mathrm{Leb},(\\alpha,\\mu)\\in\\mathcal{S}\\times\\mathcal{M}\\})$ est identifiable (composantes de $\\alpha$ supposées $>0$).',
        steps: [
          {
            text: '**Q1 (liberté).** Si $\\sum_{k=1}^K\\beta_ke^{i\\mu_kt}=0$ pour tout $t$, en dérivant $j$ fois et en évaluant en $t=0$ : $\\sum_k\\beta_k\\mu_k^j=0$ pour $j=0,\\dots,K-1$. Le système est de Vandermonde, inversible car les $\\mu_k$ sont deux à deux distincts : $\\beta=0$.',
            justification: '$f^{(j)}(t)=i^j\\sum_k\\beta_k\\mu_k^je^{i\\mu_kt}$ ; déterminant de Vandermonde $\\prod_{k<l}(\\mu_l-\\mu_k)\\ne0$.',
          },
          {
            text: '**Q2.** Si $X\\sim f_{\\alpha,\\mu}\\cdot\\mathrm{Leb}$, $\\mathbb{E}[e^{itX}]=\\sum_k\\alpha_ke^{it\\mu_k-t^2/2}$. Si $f_{\\alpha,\\mu}=f_{\\tilde\\alpha,\\tilde\\mu}$, les fonctions caractéristiques sont égales ; en simplifiant par $e^{-t^2/2}$ : $\\sum_k\\alpha_ke^{it\\mu_k}-\\sum_k\\tilde\\alpha_ke^{it\\tilde\\mu_k}=0$.',
            justification: 'La fonction caractéristique caractérise la loi ; rappel de l’énoncé : $\\mathbb{E}[e^{itY}]=e^{it\\mu_k-t^2/2}$ pour $Y\\sim\\mathcal{N}(\\mu_k,1)$.',
          },
          {
            text: 'Par Q1 appliquée à l’ensemble des valeurs distinctes parmi les $\\mu_k,\\tilde\\mu_j$ : un $\\mu_i$ qui n’est égal à aucun $\\tilde\\mu_j$ aurait un coefficient $\\alpha_i=0$, exclu ; donc les deux ensembles de moyennes coïncident, et les $\\mu$ étant ordonnés, $\\mu=\\tilde\\mu$ puis $\\alpha=\\tilde\\alpha$.',
            justification: 'Liberté de la famille $(e^{i\\mu t})_\\mu$ et contrainte d’ordre qui lève le « label switching ».',
          },
          {
            text: '**Q3 (Poisson).** $\\mathbb{E}[e^{itX}]=e^{\\mu(e^{it}-1)}$ ; on montre de même que $(t\\mapsto e^{\\mu(e^{it}-1)})_\\mu$ est libre (dérivations successives en $0$ et Vandermonde), d’où l’identifiabilité du mélange poissonien.',
            justification: 'Même schéma ; le corrigé omet les facteurs $i^j$ et les termes de degré inférieur, qui s’annulent par récurrence.',
          },
        ],
        conclusion: 'Méthode générale : **la fonction caractéristique caractérise la loi**, donc une égalité de lois se traduit par une identité fonctionnelle, que l’on exploite par dérivation / algèbre linéaire. Point d’attention : $\\mathcal{S}$ autorise des $\\alpha_k=0$, auquel cas $\\mu_k$ n’est pas identifiable ; il faut lire le résultat sur $\\{\\alpha_k>0\\ \\forall k\\}\\times\\mathcal{M}$.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 4. Statistiques, indépendance, modèle induit
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s4-statistiques',
    title: '4. Statistiques, statistiques indépendantes, modèle induit',
    role: 'definitions',
    intro:
      'Une **statistique** est une fonction mesurable des observations seules (sans $\\theta$). Transformer les observations transporte chaque loi du modèle : c’est le **modèle induit**, dont on calcule les lois par la méthode de la fonction muette et le changement de variables (§6). Les théorèmes de Gosset et de Cochran (§8) ne sont que des calculs de modèles induits dans le cas gaussien.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch1-def-3-statistique',
        type: 'definition',
        label: 'Définition 3',
        title: 'Statistique',
        source: 'Poly ch.1, Déf. 3, §1.5, p. 13',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$ modèle statistique ; $(\\mathsf{T},\\mathcal{T})$ espace mesurable.'],
        statement: `On appelle **statistique** sur le modèle $(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$ une **application mesurable** $T$ de $(\\mathsf{Z},\\mathcal{Z})$ dans $(\\mathsf{T},\\mathcal{T})$.

Remarque « très importante » du poly : $T$ **ne dépend pas de la loi** $\\mathbb{P}\\in\\mathcal{C}$, donc **ne dépend pas du paramètre** si le modèle est paramétrique.`,
        intuition: 'Une statistique est une transformation des observations seules (moyenne, maximum, comptage…) : c’est ce que l’on peut effectivement **calculer** à partir des données.',
        pitfalls: [
          '$\\bar X_n-\\mu$ n’est **pas** une statistique si $\\mu$ est inconnu ; $\\sqrt n(\\bar X_n-\\mu)/S_n$ non plus (c’est un *pivot*, chapitre 4). Question courte 4 : « une statistique peut dépendre de $\\theta$ » est **faux**.',
          'Deux points de vue (Remarque p. 14) : la statistique est une **application** $S$ sur $\\mathsf{Z}$ (sans aléa) ; en la composant avec l’observation $Z$ on obtient la **variable aléatoire** $S(Z)=S\\circ Z$, de loi la loi image. Les deux s’appellent « statistique » ; la notation distingue $S_1:z\\mapsto\\frac1n\\sum_ix_i$ de $\\bar X_n=S_1(Z)$.',
        ],
      },
      {
        kind: 'example',
        id: 'ch1-ex-1-8',
        title: 'Exemple 1.8 et Remarque — Statistiques usuelles et leur mesurabilité',
        source: 'Poly ch.1, Ex. 1.8 et Remarque, p. 14',
        setup: 'Modèle $(\\mathbb{R}^n,\\mathcal{B}(\\mathbb{R}^n),\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\})$, $Z=(X_1,\\dots,X_n)$. Exemples : (1) la $i$-ème observation $X_i(z)=x_i$ ; (2) la moyenne empirique $S_1(Z)=\\bar X_n$ ; (3) le minimum $S_2(Z)=\\min_iX_i$ et plus généralement les statistiques d’ordre $(X_{(i)})_i$ ; (4) la médiane empirique $S_3(Z)=\\mathrm{med}(X_1,\\dots,X_n)$. Montrer que ce sont des statistiques (applications boréliennes).',
        steps: [
          {
            text: '$z\\mapsto x_i$ et $z\\mapsto\\frac1n\\sum_ix_i$ sont **linéaires** sur $\\mathbb{R}^n$, donc continues.',
            justification: 'Application linéaire en dimension finie.',
          },
          {
            text: '*Statistiques d’ordre* : $z\\mapsto x_{(k)}$ est **1-lipschitzienne** pour $\\|z\\|_\\infty$. Soient $z,z\'$ et $\\varepsilon=\\|z-z\'\\|_\\infty$ : au moins $k$ coordonnées de $z$ sont $\\le x_{(k)}$ ; comme $x\'_i\\le x_i+\\varepsilon$, au moins $k$ coordonnées de $z\'$ sont $\\le x_{(k)}+\\varepsilon$, d’où $x\'_{(k)}\\le x_{(k)}+\\varepsilon$ ; en échangeant les rôles, $|x\'_{(k)}-x_{(k)}|\\le\\|z-z\'\\|_\\infty$.',
            justification: 'Définition du réarrangement croissant ; symétrie des rôles de $z$ et $z\'$. En particulier le min et le max sont continus.',
          },
          {
            text: '*Médiane* : fonction continue des statistiques d’ordre, $x_{(m+1)}$ si $n=2m+1$, $\\frac12(x_{(m)}+x_{(m+1)})$ si $n=2m$.',
            justification: 'Composée d’applications continues.',
          },
          {
            text: 'Toute application continue de $\\mathbb{R}^n$ dans $\\mathbb{R}$ est borélienne : ce sont des statistiques.',
            justification: 'Outils, Déf. 13 : la tribu borélienne est engendrée par les ouverts, image réciproque d’un ouvert par une application continue est un ouvert.',
          },
        ],
        conclusion: 'En pratique, toute fonction « raisonnable » des observations (continue, ou composée de fonctions mesurables) est une statistique. Le poly parle d’**observations individuelles** $X_1,\\dots,X_n$ : $X_i$ est la statistique associée à la $i$-ème donnée collectée.',
      },
      {
        kind: 'theorem',
        id: 'ch1-def-4-indep',
        type: 'definition',
        label: 'Définition 4',
        title: 'Statistiques indépendantes',
        source: 'Poly ch.1, Déf. 4, p. 14',
        hypotheses: ['$X$, $Y$ (ou $X_1,\\dots,X_n$) statistiques sur $(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$.'],
        statement: `$X$ et $Y$ sont **indépendantes** si, **pour toute loi $\\mathbb{P}\\in\\mathcal{C}$**, $X$ et $Y$ sont indépendantes sous $\\mathbb{P}$ : $\\mathbb{P}(X\\in A,Y\\in B)=\\mathbb{P}(X\\in A)\\,\\mathbb{P}(Y\\in B)$. Plus généralement, $X_1,\\dots,X_n$ sont indépendantes si pour toute $\\mathbb{P}\\in\\mathcal{C}$ et tous $A_1,\\dots,A_n$ mesurables, $\\mathbb{P}(X_1\\in A_1,\\dots,X_n\\in A_n)=\\prod_{i=1}^n\\mathbb{P}(X_i\\in A_i)$.`,
        intuition: 'L’indépendance doit valoir **uniformément** sur tout le modèle, pas seulement sous une loi particulière.',
        pitfalls: ['Oublier le « pour toute loi $\\mathbb{P}\\in\\mathcal{C}$ ».', 'Critère pratique (Ex. 1.10, PC1) : **densité de forme produit $\\Rightarrow$ indépendance**, et le facteur de chaque coordonnée donne sa loi marginale (à une constante près).'],
      },
      {
        kind: 'example',
        id: 'ch1-ex-1-9-1-10',
        title: 'Exemples 1.9–1.10 — Observations i.i.d. de Bernoulli et gaussiennes (densité produit ⇒ indépendance)',
        source: 'Poly ch.1, Ex. 1.9 et Ex. 1.10 (avec démonstration), p. 15',
        setup: 'Ex. 1.9 : modèle $(\\{0,1\\}^n,\\mathcal{P}(\\{0,1\\}^n),\\{\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n}\\})$. Ex. 1.10 : modèle gaussien $\\mathbb{P}_\\theta=p_\\theta\\cdot\\mathrm{Leb}^{\\otimes n}$, $p_\\theta(x_1,\\dots,x_n)=(2\\pi\\sigma^2)^{-n/2}\\exp\\big(-\\frac1{2\\sigma^2}\\sum_i(x_i-\\mu)^2\\big)$, $\\theta=(\\mu,\\sigma^2)$. Montrer que les coordonnées $X_1,\\dots,X_n$ sont des statistiques indépendantes de loi $\\mathcal{B}\\mathrm{er}(\\theta)$, resp. $\\mathcal{N}(\\mu,\\sigma^2)$.',
        steps: [
          {
            text: '*Bernoulli.* C’est la définition même de la loi produit : $\\mathbb{P}_\\theta(X_1=x_1,\\dots,X_n=x_n)=\\prod_i\\theta^{x_i}(1-\\theta)^{1-x_i}=\\prod_i\\mathbb{P}_\\theta(X_i=x_i)$ (détail à l’Ex. 1.15) : les observations sont **i.i.d.** $\\mathcal{B}\\mathrm{er}(\\theta)$.',
            justification: 'Sur un espace fini, l’égalité sur les singletons suffit.',
          },
          {
            text: '*Gaussien, étape 1 : factorisation.* $p_\\theta(x_1,\\dots,x_n)=\\prod_{i=1}^np_\\theta^{X_i}(x_i)$ avec $p_\\theta^{X_i}(x)=(2\\pi\\sigma^2)^{-1/2}\\exp\\big(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\big)$, densité de $\\mathcal{N}(\\mu,\\sigma^2)$.',
            justification: 'Exponentielle d’une somme égale produit d’exponentielles.',
          },
          {
            text: '*Étape 2 : Fubini.* Pour $A_1,\\dots,A_n\\in\\mathcal{B}(\\mathbb{R})$ : $\\mathbb{P}_\\theta(X_1\\in A_1,\\dots,X_n\\in A_n)=\\int_{A_1\\times\\dots\\times A_n}\\prod_ip_\\theta^{X_i}(x_i)\\,\\mathrm{d}x_1\\cdots\\mathrm{d}x_n=\\prod_{i=1}^n\\int_{A_i}p_\\theta^{X_i}(x)\\,\\mathrm{d}x=\\prod_i\\mathbb{P}_\\theta(X_i\\in A_i)$.',
            justification: 'Théorème de Fubini (intégrande positive) ; la dernière égalité en prenant $A_j=\\mathbb{R}$ pour $j\\ne i$.',
          },
          {
            text: 'Donc $\\mathbb{P}_\\theta=\\mathcal{N}(\\mu,\\sigma^2)^{\\otimes n}$ : observations i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$.',
            justification: 'Définition 4 (pour tout $\\theta$) et identification des marginales.',
          },
        ],
        conclusion: '**Schéma à retenir** (PC1 Ex. 2, 3, 4) : densité de forme produit $\\Rightarrow$ coordonnées indépendantes ; même facteur $\\Rightarrow$ même loi (i.i.d.) ; facteurs différents (régression, PC1 Ex. 4) $\\Rightarrow$ indépendantes mais **non** identiquement distribuées. La constante de normalisation de chaque facteur se calcule par changement de variable ($C_\\theta=1/\\sigma$ pour $u\\mapsto g((u-\\mu)/\\sigma)$).',
      },
      {
        kind: 'text',
        id: 'ch1-s4-gosset-apercu',
        title: 'Exemple 1.11 et Remarque — Moyenne et variance empiriques gaussiennes ; statistiques canoniques non indépendantes (p. 15)',
        text: `Dans le modèle gaussien à $n\\ge2$ observations, $\\bar X_n=\\frac1n\\sum_iX_i$ et $S_n^2=\\frac1{n-1}\\sum_i(X_i-\\bar X_n)^2$ sont des **statistiques indépendantes** ; sous $\\mathbb{P}_{(\\mu,\\sigma^2)}$, $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$ et $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ : c’est le **théorème de Gosset** (Thm 1.3, démontré en §8 par le théorème de Cochran appliqué à $\\mathbb{R}^n=\\mathbb{R}\\mathbf{1}_n\\oplus(\\mathbb{R}\\mathbf{1}_n)^\\perp$).

**Attention** : dans le même modèle, la somme $\\sum_iX_i=n\\bar X_n$ et la somme des carrés $\\sum_iX_i^2=(n-1)S_n^2+n\\bar X_n^2$ **ne sont pas indépendantes** (PC1 Ex. 3, complément : le support $\\{v\\ge u^2/n\\}$ de la densité jointe n’est pas un pavé). L’indépendance dépend du choix des statistiques. Et l’indépendance de $\\bar X_n$ et $S_n^2$ est **propre au modèle gaussien** : pour des observations i.i.d. à variance finie, elle **caractérise** la loi gaussienne (théorème de Lukacs, 1942).`,
      },
      {
        kind: 'theorem',
        id: 'ch1-def-5-induit',
        type: 'definition',
        label: 'Définition 5',
        title: 'Loi image, modèle induit par une statistique',
        source: 'Poly ch.1, Déf. 5, §1.6, p. 16',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$ modèle statistique ; $T$ statistique à valeurs dans $(\\mathsf{T},\\mathcal{T})$.'],
        statement: `Pour toute loi $\\mathbb{P}\\in\\mathcal{C}$, la **loi image** de $\\mathbb{P}$ par $T$ est la probabilité $\\mathbb{P}^T$ sur $(\\mathsf{T},\\mathcal{T})$ définie par

$$\\mathbb{P}^T(A):=\\mathbb{P}(T\\in A)=\\mathbb{P}\\big(\\{z\\in\\mathsf{Z}:\\ T(z)\\in A\\}\\big),\\qquad A\\in\\mathcal{T}.$$

On pose $\\mathcal{C}^T:=\\{\\mathbb{P}^T,\\ \\mathbb{P}\\in\\mathcal{C}\\}$. Le modèle $(\\mathsf{T},\\mathcal{T},\\mathcal{C}^T)$ est le **modèle induit par la statistique $T$**. Sous $\\mathbb{P}$, $T$ est un élément aléatoire de loi $\\mathbb{P}^T$.`,
        intuition: 'Transformer les observations transporte chaque loi sur l’espace d’arrivée. Un modèle induit est en général plus « pauvre » : on a le droit de jeter de l’information, pas d’en créer. Calcul pratique : **fonction muette** et **changement de variables** (§6 ; PC1 Ex. 2).',
        pitfalls: ['Le modèle induit est un **triplet** : donner l’espace d’arrivée, sa tribu et la famille des lois images, paramétrée par le **même** $\\theta$.', 'La mesure dominante change en général (ex. : de $\\mathrm{Leb}^{\\otimes n}$ sur $\\mathbb{R}^n$ à $\\mathrm{Leb}^{\\otimes2}$ sur $\\mathbb{R}\\times\\mathbb{R}_+$ pour $(S_n,K_n)$).'],
      },
      {
        kind: 'example',
        id: 'ch1-ex-1-12-1-15',
        title: 'Exemples 1.12 à 1.15 — Quatre modèles induits',
        source: 'Poly ch.1, Ex. 1.12–1.15, p. 16–17',
        setup: 'Bernoulli et $S_n=\\sum_iX_i$ ; uniforme et $X_{(n)}=\\max_iX_i$ ; gaussien et $(\\bar X_n,S_n^2)$ ; sondage et $X_i$.',
        steps: [
          {
            text: '**Ex. 1.12.** $\\{\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n}\\}$ et $S_n=\\sum_{i=1}^nX_i$ : modèle induit $\\big(\\{0,\\dots,n\\},\\mathcal{P}(\\{0,\\dots,n\\}),\\{\\mathrm{Bin}(n,\\theta),\\theta\\in[0,1]\\}\\big)$ — on retrouve le pile ou face (Ex. 1.1).',
            justification: '$\\mathbb{P}_\\theta(S_n=k)=\\sum_{x:\\sum x_i=k}\\theta^k(1-\\theta)^{n-k}=\\binom nk\\theta^k(1-\\theta)^{n-k}$ (dénombrement ; esquisse de l’extracteur, le poly cite le résultat).',
          },
          {
            text: '**Ex. 1.13.** $\\{\\mathcal{U}([0,\\theta])^{\\otimes n},\\theta>0\\}$ et $X_{(n)}$ : modèle induit $\\big(\\mathbb{R},\\mathcal{B}(\\mathbb{R}),\\{q_{n,\\theta}\\cdot\\mathrm{Leb},\\theta>0\\}\\big)$ avec $q_{n,\\theta}(t)=\\frac{nt^{n-1}}{\\theta^n}\\mathbb{1}_{[0,\\theta]}(t)$.',
            justification: 'Par indépendance, $\\mathbb{P}_\\theta(X_{(n)}\\le t)=\\prod_i\\mathbb{P}_\\theta(X_i\\le t)=(t/\\theta)^n$ pour $t\\in[0,\\theta]$, puis dérivation (« calcul repris en PC4 » ; esquisse de l’extracteur).',
          },
          {
            text: '**Ex. 1.14.** Modèle gaussien, $T=(\\bar X_n,S_n^2)$ : par Gosset, modèle induit $\\Big(\\mathbb{R}\\times\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}\\times\\mathbb{R}_+),\\Big\\{\\mathcal{N}(\\mu,\\sigma^2/n)\\otimes\\tfrac{\\sigma^2}{n-1}\\chi^2(n-1),\\ (\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*\\Big\\}\\Big)$, où $\\frac{\\sigma^2}{n-1}\\chi^2(n-1)$ est la loi de $\\frac{\\sigma^2}{n-1}Y$, $Y\\sim\\chi^2(n-1)$.',
            justification: 'Gosset (i)–(ii) donne les marginales ; (iii) l’indépendance, donc la loi jointe est la **loi produit**.',
          },
          {
            text: '**Ex. 1.15.** Sondage : $\\mathbb{P}_\\theta(X_1=x_1,\\dots,X_n=x_n)=\\mathbb{P}_\\theta^Z(\\{(x_1,\\dots,x_n)\\})=\\prod_i\\theta^{x_i}(1-\\theta)^{1-x_i}=\\prod_i\\mathbb{P}_\\theta(X_i=x_i)$ : la loi image $\\mathbb{P}_\\theta^{X_i}$ est $\\mathcal{B}\\mathrm{er}(\\theta)$ et les $X_i$ sont indépendantes.',
            justification: 'Loi produit sur les singletons, factorisation ; exemple générique qui motive la définition du $n$-échantillon.',
          },
        ],
        conclusion: 'Les Exercices 2 et 3 de la PC1 (translation-échelle, $(S_n,K_n)$) et les annales (loi de $X^c$ dans le CC 2022 Ex. 1 ; densité log-normale de $e^{\\mu+\\sigma\\xi}$ dans l’Examen 2025 Ex. 2 Q1) sont des calculs de modèles induits par fonction muette.',
      },
      {
        kind: 'viz',
        id: 'ch1-s4-viz-chgt',
        vizId: 'ch1-changement-variables',
        caption: 'Modèle induit par $\\phi$ : la densité de $\\phi(X)$ est $p(\\phi^{-1}(y))\\,|(\\phi^{-1})\'(y)|$ (sommée sur les branches si $\\phi$ n’est pas injective).',
      },
      {
        kind: 'viz',
        id: 'ch1-s4-viz-ordre',
        vizId: 'ch1-statistiques-ordre',
        caption: 'Statistiques d’ordre : loi de $X_{(k)}$, du maximum (Ex. 1.13) et de $F(X_{(k)})\\sim\\mathrm{Beta}(k,n-k+1)$.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 5. n-échantillon, produit de modèles, premiers estimateurs
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s5-echantillon',
    title: '5. n-échantillon, produit de modèles, premiers estimateurs',
    role: 'definitions',
    intro:
      'Le **$n$-échantillon** formalise « répéter $n$ fois la même expérience de façon indépendante » : loi produit $\\mathbb{Q}^{\\otimes n}$, densité produit (formule (1)) qui sera la vraisemblance. À ne pas confondre avec le **produit de $n$ modèles**, où chaque coordonnée peut suivre une loi différente de la famille. On peut déjà proposer des **estimateurs** : moyenne empirique pour Bernoulli, réponses randomisées.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch1-def-6-echantillon',
        type: 'definition',
        label: 'Définition 6',
        title: 'n-échantillon d’un modèle',
        source: 'Poly ch.1, Déf. 6, §1.7, p. 17',
        hypotheses: ['$(\\mathsf{X},\\mathcal{X},\\mathcal{C})$ modèle statistique ; $n\\in\\mathbb{N}^*$.'],
        statement: `On appelle **$n$-échantillon** de $(\\mathsf{X},\\mathcal{X},\\mathcal{C})$ le modèle statistique

$$(\\mathsf{X},\\mathcal{X},\\mathcal{C})^n:=\\big(\\mathsf{X}^n,\\ \\mathcal{X}^{\\otimes n},\\ \\{\\mathbb{Q}^{\\otimes n},\\ \\mathbb{Q}\\in\\mathcal{C}\\}\\big).$$

La **$i$-ème observation (canonique)** est la statistique $X_i$ définie pour $z=(x_1,\\dots,x_n)\\in\\mathsf{X}^n$ par $X_i(z)=x_i$. On dit que « $(X_1,\\dots,X_n)$ est un $n$-échantillon du modèle $(\\mathsf{X},\\mathcal{X},\\mathcal{C})$ ».`,
        intuition: '$\\mathbb{Q}^{\\otimes n}$ est la mesure produit de $n$ copies de $\\mathbb{Q}$ : $(X_1,\\dots,X_n)\\sim\\mathbb{Q}^{\\otimes n}$ si et seulement si les $X_i$ sont i.i.d. de loi $\\mathbb{Q}$. C’est la **même** loi $\\mathbb{Q}$ qui est répétée.',
        pitfalls: ['Le $n$-échantillon est la « diagonale » du modèle produit (Déf. 7) ; question courte 6 : « le $n$-échantillon coïncide en général avec le produit de $n$ copies » est **faux**.'],
      },
      {
        kind: 'theorem',
        id: 'ch1-lem-1-1',
        type: 'lemme',
        label: 'Lemme 1.1',
        title: 'Propriétés du n-échantillon',
        source: 'Poly ch.1, Lemme 1.1, p. 17',
        hypotheses: ['$(\\mathsf{X},\\mathcal{X},\\mathcal{C})^n$ un $n$-échantillon du modèle $(\\mathsf{X},\\mathcal{X},\\mathcal{C})$.'],
        statement: `(i) Les observations $Z=(X_1,\\dots,X_n)$ sont indépendantes.

(ii) Pour tout $i\\in\\{1,\\dots,n\\}$, le modèle induit par la statistique $X_i$ est $(\\mathsf{X},\\mathcal{X},\\mathcal{C})$.`,
        intuition: 'Formalise « $n$ copies indépendantes du même modèle ».',
        proof: [
          {
            text: 'Soit $\\mathbb{P}=\\mathbb{Q}^{\\otimes n}$ et $(A_1,\\dots,A_n)\\in\\mathcal{X}^n$. $\\mathbb{P}^Z(A_1\\times\\dots\\times A_n)=\\mathbb{P}(X_1\\in A_1,\\dots,X_n\\in A_n)$.',
            justification: 'Définition de la loi de $Z$ (ici $Z$ est l’identité de $\\mathsf{X}^n$).',
          },
          {
            text: '$=\\mathbb{Q}^{\\otimes n}(A_1\\times\\dots\\times A_n)=\\prod_{i=1}^n\\mathbb{Q}(A_i)$.',
            justification: 'Définition de la mesure produit sur les pavés.',
          },
          {
            text: 'En prenant $A_j=\\mathsf{X}$ pour $j\\ne i$ : $\\mathbb{P}(X_i\\in A_i)=\\mathbb{Q}(A_i)$, soit $\\mathbb{P}^{X_i}=\\mathbb{Q}$ et $\\mathcal{C}^{X_i}=\\mathcal{C}$ : c’est (ii).',
            justification: '$\\mathbb{Q}(\\mathsf{X})=1$ ; vrai pour toute $\\mathbb{Q}\\in\\mathcal{C}$.',
          },
          {
            text: 'Donc $\\mathbb{P}(X_1\\in A_1,\\dots,X_n\\in A_n)=\\prod_i\\mathbb{P}(X_i\\in A_i)$ pour toute $\\mathbb{P}$ : c’est (i).',
            justification: 'Définition 4 des statistiques indépendantes.',
          },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-formule-1',
        type: 'proposition',
        label: 'Formule (1)',
        title: 'Densité d’un n-échantillon dominé',
        source: 'Poly ch.1, §1.7, formule (1), p. 18',
        hypotheses: ['$(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta,\\theta\\in\\Theta\\})$ paramétrique, dominé par une mesure $\\sigma$-finie $\\mu$ : $\\mathbb{Q}_\\theta=q_\\theta\\cdot\\mu$.'],
        statement: `Pour tout $\\theta$, la loi produit $\\mathbb{P}_\\theta=\\mathbb{Q}_\\theta^{\\otimes n}$ est dominée par $\\mu^{\\otimes n}$ et admet pour densité

$$p_\\theta(x_1,\\dots,x_n):=\\prod_{i=1}^nq_\\theta(x_i).\\qquad(1)$$`,
        intuition: 'Densité du $n$-échantillon = produit des densités : formule de base de la **vraisemblance** $L_n(\\theta)=\\prod_iq_\\theta(X_i)$ (chapitre 2). Preuve non détaillée dans le poly : Fubini–Tonelli sur les pavés comme à l’Ex. 1.10, puis unicité de la mesure produit.',
        pitfalls: ['Réciproquement, une densité de **forme produit** $\\prod_if_i(x_i)$ entraîne l’indépendance des coordonnées ; si tous les facteurs sont égaux à constante près, elles sont i.i.d. (PC1 Ex. 3 Q1).'],
      },
      {
        kind: 'theorem',
        id: 'ch1-def-7-produit',
        type: 'definition',
        label: 'Définition 7 (Outils)',
        title: 'Produit de modèles statistiques ; n-échantillon ≠ produit',
        source: 'Poly ch.1, Outils, Déf. 7 et Remarque, p. 23',
        hypotheses: ['$(\\mathsf{X},\\mathcal{X},\\mathcal{C})$ et $(\\mathsf{X}\',\\mathcal{X}\',\\mathcal{C}\')$ modèles statistiques.'],
        statement: `Le **produit** $(\\mathsf{X},\\mathcal{X},\\mathcal{C})\\otimes(\\mathsf{X}\',\\mathcal{X}\',\\mathcal{C}\')$ est le modèle $(\\mathsf{X}\\times\\mathsf{X}\',\\ \\mathcal{X}\\otimes\\mathcal{X}\',\\ \\mathcal{C}\\otimes\\mathcal{C}\')$ avec $\\mathcal{C}\\otimes\\mathcal{C}\':=\\{\\mathbb{Q}\\otimes\\mathbb{Q}\',\\ \\mathbb{Q}\\in\\mathcal{C},\\ \\mathbb{Q}\'\\in\\mathcal{C}\'\\}$. Avec $X(x,x\')=x$ et $X\'(x,x\')=x\'$, les statistiques $X$ et $X\'$ sont indépendantes et induisent respectivement $(\\mathsf{X},\\mathcal{X},\\mathcal{C})$ et $(\\mathsf{X}\',\\mathcal{X}\',\\mathcal{C}\')$.

**Remarque.** Pour $n=2$, $(\\mathsf{X},\\mathcal{X},\\mathcal{C})\\otimes(\\mathsf{X},\\mathcal{X},\\mathcal{C})=\\big(\\mathsf{X}^2,\\mathcal{X}^{\\otimes2},\\{\\mathbb{Q}\\otimes\\mathbb{Q}\',\\ \\mathbb{Q},\\mathbb{Q}\'\\in\\mathcal{C}\\}\\big)$ alors que $(\\mathsf{X},\\mathcal{X},\\mathcal{C})^2=\\big(\\mathsf{X}^2,\\mathcal{X}^{\\otimes2},\\{\\mathbb{Q}^{\\otimes2},\\ \\mathbb{Q}\\in\\mathcal{C}\\}\\big)$ : le $n$-échantillon n’est **pas** (en général) le produit de $n$ copies.`,
        intuition: 'Dans le produit, les coordonnées peuvent suivre des lois **différentes** de la famille (observations indépendantes non identiquement distribuées : régression, PC1 Ex. 4 ; translation-échelle avec des $(a_i,b_i)$ différents, PC1 Ex. 2) ; dans le $n$-échantillon, c’est la même loi répétée.',
        proof: [
          { text: 'Pour $\\mathbb{P}=\\mathbb{Q}\\otimes\\mathbb{Q}\'$ et $(A,A\')\\in\\mathcal{X}\\times\\mathcal{X}\'$ : $\\mathbb{P}(X\\in A,X\'\\in A\')=\\mathbb{Q}\\otimes\\mathbb{Q}\'(A\\times A\')=\\mathbb{Q}(A)\\mathbb{Q}\'(A\')$.', justification: 'Définition de la mesure produit sur les pavés.' },
          { text: 'Avec $A\'=\\mathsf{X}\'$ : $\\mathbb{P}(X\\in A)=\\mathbb{Q}(A)$ ; de même $\\mathbb{P}(X\'\\in A\')=\\mathbb{Q}\'(A\')$ ; d’où $\\mathbb{P}(X\\in A,X\'\\in A\')=\\mathbb{P}(X\\in A)\\mathbb{P}(X\'\\in A\')$ et les modèles induits annoncés.', justification: 'Marginales d’une mesure produit ; Définition 4.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-def-estimateur',
        type: 'definition',
        label: 'Définition (§1.8)',
        title: 'Estimateur',
        source: 'Poly ch.1, §1.8, p. 18',
        hypotheses: ['Modèle paramétrique $\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\}$.'],
        statement: 'Un **estimateur** est une **statistique à valeurs dans $\\Theta$** (ou dans un espace contenant $\\Theta$), destinée à approcher le paramètre inconnu. Les méthodes systématiques (moments, maximum de vraisemblance) sont l’objet du chapitre 2.',
        intuition: 'Dès maintenant, on peut « proposer » des estimateurs : remplacer une espérance théorique par la moyenne empirique (idée de la méthode des moments).',
        pitfalls: ['Un estimateur ne peut pas dépendre de $\\theta$ : c’est une statistique.'],
      },
      {
        kind: 'example',
        id: 'ch1-ex-bernoulli-estim',
        title: 'Estimation du paramètre d’une Bernoulli : la moyenne empirique est sans biais',
        source: 'Poly ch.1, §1.8, p. 18',
        setup: '$n$-échantillon $(X_1,\\dots,X_n)$ du modèle $\\big(\\{0,1\\},\\mathcal{P}(\\{0,1\\}),\\{\\mathcal{B}\\mathrm{er}(\\theta),\\theta\\in[0,1]\\}\\big)$. On considère $\\hat\\theta_n:=\\bar X_n=\\frac1n\\sum_{i=1}^nX_i$.',
        steps: [
          { text: 'Sous $\\mathbb{P}_\\theta$, $\\mathbb{E}_\\theta[X_1]=\\theta$.', justification: 'Espérance d’une Bernoulli.' },
          { text: '$\\mathbb{E}_\\theta[\\hat\\theta_n]=\\frac1n\\sum_i\\mathbb{E}_\\theta[X_i]=\\theta$ : l’estimateur est **sans biais**.', justification: 'Linéarité de l’espérance et même loi pour chaque $X_i$ (Lemme 1.1).' },
        ],
        conclusion: 'La qualité de l’estimateur (concentration, intervalles de confiance) sera quantifiée aux chapitres 3 et 4 : $\\mathrm{Var}_\\theta(\\hat\\theta_n)=\\theta(1-\\theta)/n$ par indépendance.',
      },
      {
        kind: 'example',
        id: 'ch1-ex-reponses-randomisees',
        title: 'Question sensible et réponses randomisées : modèle induit, estimateur sans biais, prix de la confidentialité',
        source: 'Poly ch.1, §1.8, p. 18–19',
        setup: 'On ne peut pas observer directement $X_i\\in\\{0,1\\}$ (réponse à une question sensible). Protocole : chaque participant observe secrètement $U_i\\sim\\mathcal{B}\\mathrm{er}(q)$, $q$ **connu** (ex. $q=0{,}75$), indépendante de $X_i$ ; si $U_i=1$ il donne la vraie réponse, sinon l’opposé. On observe $\\mathrm{RR}_i=U_iX_i+(1-U_i)(1-X_i)$.',
        steps: [
          {
            text: '$\\mathrm{RR}_i\\in\\{0,1\\}$ et $\\mathbb{P}_\\theta(\\mathrm{RR}_i=1)=\\mathbb{P}(U_i=1,X_i=1)+\\mathbb{P}(U_i=0,X_i=0)=q\\theta+(1-q)(1-\\theta)$ : le modèle induit par $(\\mathrm{RR}_1,\\dots,\\mathrm{RR}_n)$ est un $n$-échantillon de $\\big(\\{0,1\\},\\mathcal{P}(\\{0,1\\}),\\{\\mathcal{B}\\mathrm{er}(\\theta q+(1-\\theta)(1-q)),\\theta\\in[0,1]\\}\\big)$.',
            justification: 'Indépendance de $U_i$ et $X_i$ ; les couples $(U_i,X_i)$ étant i.i.d., les $\\mathrm{RR}_i$ le sont.',
          },
          {
            text: '$\\mathbb{E}_\\theta[\\mathrm{RR}_i]=\\theta(2q-1)+1-q$, donc $\\theta=\\dfrac{\\mathbb{E}_\\theta[\\mathrm{RR}_i]-(1-q)}{2q-1}$ et l’on pose $\\hat\\theta_n:=\\dfrac{\\overline{\\mathrm{RR}}_n-(1-q)}{2q-1}$ (estimateur **par la méthode des moments**, éventuellement tronqué à $[0,1]$). Pour $q=0{,}75$ : $\\hat\\theta_n=2(\\overline{\\mathrm{RR}}_n-0{,}25)$.',
            justification: 'Inversion de la relation affine, possible si et seulement si $q\\ne1/2$ ; remplacement de l’espérance par la moyenne empirique.',
          },
          {
            text: '$\\mathbb{E}_\\theta[\\hat\\theta_n]=\\theta$ (sans biais) et $\\mathrm{Var}_\\theta(\\hat\\theta_n)=\\dfrac{\\mathrm{Var}_\\theta(\\mathrm{RR}_1)}{n(2q-1)^2}\\ge\\dfrac{q(1-q)}{n(2q-1)^2}$.',
            justification: 'Linéarité ; $\\mathrm{Var}(\\overline{\\mathrm{RR}}_n)=\\mathrm{Var}(\\mathrm{RR}_1)/n$ par indépendance ; $\\mathrm{Var}(\\mathrm{RR}_1)=p(1-p)$ avec $p$ entre $\\min(q,1-q)$ et $\\max(q,1-q)$, donc $p(1-p)\\ge q(1-q)$ (justification de l’extracteur ; le poly énonce l’inégalité).',
          },
        ],
        conclusion: 'Chaque répondant est protégé (un « oui » ne révèle pas sa vraie réponse), mais en moyenne le signal survit. **Prix de la confidentialité** : le facteur $(2q-1)^{-2}$ explose quand $q\\to1/2$ ; en $q=1/2$ la loi de $\\mathrm{RR}_i$ est $\\mathcal{B}\\mathrm{er}(1/2)$ quel que soit $\\theta$ : modèle **non identifiable** (question courte 9).',
      },
      {
        kind: 'viz',
        id: 'ch1-s5-viz-rr',
        vizId: 'ch1-reponses-randomisees',
        caption: 'Histogramme de $\\hat\\theta_n$ et borne $q(1-q)/(n(2q-1)^2)$ de sa variance : explosion en $q=1/2$.',
      },
      {
        kind: 'example',
        id: 'ch1-ex-pc1-1',
        title: 'PC1 Ex. 1 — Un café pour commencer : construire deux modèles et les critiquer',
        source: 'PC1 Ex. 1 (énoncé p. 1, corrigé p. 9–10) ; Poly ch.1, Ex. 1.3',
        setup: 'Une cafétéria observe les temps successifs d’arrivée $T=(T_1,\\dots,T_n)$ des clients, puis, pour $h>0$ fixé, les comptages $N=(N_1,\\dots,N_K)$ d’arrivées sur des fenêtres de longueur $h$. Proposer un modèle pour chaque observation, des estimateurs, et discuter.',
        steps: [
          {
            text: '**Q1.** Les $T_i$ forment une suite croissante (dépendants) : on passe aux **inter-temps** $\\Delta_i=T_i-T_{i-1}$ ($T_0=0$), seulement contraints à être positifs. Modèle : espace $(\\mathbb{R}_+^n,\\mathcal{B}(\\mathbb{R}_+^n))$, famille paramétrique de forme produit $\\mathcal{C}=\\{\\mathbb{P}_\\theta,\\theta>0\\}$, $p_\\theta(\\delta_1,\\dots,\\delta_n)=\\prod_{i=1}^n\\theta e^{-\\theta\\delta_i}$ (densité par rapport à $\\mathrm{Leb}^{\\otimes n}$).',
            justification: 'C’est le $n$-échantillon du modèle exponentiel de l’Ex. 1.3 ; la forme produit traduit l’hypothèse forte d’indépendance des arrivées (Lemme 1.1, formule (1)).',
          },
          {
            text: '*Limites* : la forme exponentielle est raisonnable (absence de mémoire), l’**indépendance** entre arrivées successives et surtout l’**homogénéité en temps** (même $\\theta$ toute la journée) sont discutables.',
            justification: 'Critique de modèle : distinguer forme des lois, indépendance, stationnarité.',
          },
          {
            text: '**Q2.** $\\hat\\Delta_n:=\\frac1n\\sum_i\\Delta_i=T_n/n$ (moyenne empirique, la somme télescope) estime le temps moyen entre arrivées $1/\\theta$ ; le nombre de clients sur une durée $h$ est approché par $h\\,\\hat\\Delta_n^{-1}$ (plug-in).',
            justification: '$\\mathbb{E}_\\theta[\\Delta_1]=1/\\theta$ ; $h\\theta$ est le nombre moyen d’arrivées sur $h$.',
          },
          {
            text: '**Q3.** Comptages : espace $(\\mathbb{N}^K,\\mathcal{P}(\\mathbb{N}^K))$, famille $\\mathcal{D}=\\{\\mathbb{Q}_\\lambda,\\lambda>0\\}$ de densité $q_\\lambda(n_1,\\dots,n_K)=\\prod_{j=1}^K\\frac{e^{-\\lambda h}(\\lambda h)^{n_j}}{n_j!}$ par rapport à la mesure de comptage. Version **non paramétrique** : intensité instantanée $t\\mapsto\\lambda(t)$, $\\lambda\\in C(\\mathbb{R}_+,\\mathbb{R}_+)$, en remplaçant $\\lambda h$ par $\\int_{(j-1)h}^{jh}\\lambda(s)\\,\\mathrm{d}s$.',
            justification: 'Espace **discret** : densité par rapport à la mesure de comptage, pas à Lebesgue ; la stationnarité est « très discutable » pour une cafétéria, d’où le modèle non paramétrique.',
          },
          {
            text: '**Q4–Q5.** $\\hat N_{K,h}=\\frac1K\\sum_jN_j$ ; temps moyen entre arrivées approché par $h\\,\\hat N_{K,h}^{-1}$. Lien : si les $(\\Delta_i)$ sont i.i.d. $\\mathcal{E}(\\lambda)$, les comptages sur des fenêtres disjointes de longueur $h$ sont i.i.d. $\\mathcal{P}\\mathrm{oi}(\\lambda h)$ (absence de mémoire $\\Rightarrow$ indépendance ; $T_k\\sim\\mathrm{Gamma}(k,\\lambda)$ par additivité et $\\mathbb{P}(N_h=k)=\\mathbb{P}(T_k<h)-\\mathbb{P}(T_{k+1}<h)$).',
            justification: 'Le corrigé esquisse seulement le « calcul exact » ; cohérence des deux estimateurs : $\\mathbb{E}[N_j]=\\lambda h=h/\\mathbb{E}[\\Delta_1]$.',
          },
        ],
        conclusion: 'Rédaction attendue pour « proposer un modèle » : (1) choisir les variables à modéliser (ici les inter-temps, pas les temps cumulés) ; (2) l’espace et sa tribu ; (3) la famille de lois (paramétrique ou non) ; (4) les hypothèses (forme, indépendance, homogénéité) et leurs limites.',
      },
    ],
  },
]
