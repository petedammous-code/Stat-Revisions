import type { CourseSection } from '../types'

/** Sections 1 à 4 du cours : intuition et notations, régions de confiance et pivots, cas gaussien, absence de pivot. */
export const coursePart1: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 1. Intuition et notations
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s1-intuition',
    title: '1. Intuition et notations : que dire de plus qu’une valeur estimée ?',
    role: 'intuition',
    intro:
      'Un estimateur rend un **nombre** (fréquence empirique $0{,}53$, bruit moyen $82$ dB) qui ne dit rien, à lui seul, de sa précision. Le risque quadratique la mesure, mais il dépend du paramètre inconnu et n’est pas calculable sur les données. Le chapitre donne deux réponses, construites avec les mêmes outils probabilistes (lois exactes des chapitres 1–3, quantiles, inégalités de déviation) : une **région de confiance** (un ensemble de valeurs garanti) et un **test** (une décision binaire à taux d’erreur garanti).',
    blocks: [
      {
        kind: 'text',
        id: 'ch4-s1-deux-reponses',
        title: 'Deux réponses (Poly ch.4, introduction p. 7–8)',
        text: `1. **Rendre un ensemble de valeurs** (intervalle, région) qui contient la quantité inconnue avec probabilité au moins $1-\\alpha$, **pour toute valeur du paramètre** : régions de confiance (§1 du poly, sections 2–4 ci-dessous).
2. **Répondre à une question binaire** sur le paramètre (« l’espérance dépasse-t-elle le seuil réglementaire ? », « le nouveau traitement fait-il mieux que l’ancien ? ») en contrôlant les **taux d’erreur** sous les hypothèses de modélisation : tests (§2 du poly, sections 5–7).

Les deux constructions sont liées : un intervalle de confiance est l’ensemble des valeurs qu’un test ne rejette pas (**dualité**, §2.6 et compléments).

**Fil rouge.** Le paramètre $\\theta$ est **déterministe** ; seule l’observation $Z$ est aléatoire. Toutes les garanties du chapitre sont des probabilités **sur l’observation**, calculées sous $\\mathbb{P}_\\theta$, et doivent valoir **pour tout** $\\theta$ (infimum ou supremum sur $\\Theta$ ou $\\Theta_0$). Les erreurs d’interprétation qui coûtent des points à l’examen (IC numérique, $p$-valeur) viennent toutes de l’oubli de ce principe.`,
      },
      {
        kind: 'text',
        id: 'ch4-s1-notations',
        title: 'Notations du poly (à reproduire telles quelles)',
        text: `- **Modèle** $(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ : espace en lettre sans empattement, tribu calligraphique ; $\\mathbb{E}_\\theta$, $\\mathrm{Var}_\\theta$ ; quantité d’intérêt $g:\\Theta\\to\\mathbb{R}^p$ ; boréliens $\\mathcal{B}(\\mathbb{R}^p)$ ; second paramètre générique $\\vartheta$.
- **Région de confiance** $\\mathcal{C}(Z)$ (calligraphique) ; bornes de confiance $m(Z)$, $M(Z)$ ; intervalles explicites $\\mathcal{I}_{n,\\alpha}$, $\\mathcal{I}^\\star_{n,\\alpha}$ ; notation $[a\\pm b]:=[a-b,a+b]$.
- **Pivot** $G(Z,\\theta)$, de loi commune $\\mathbb Q$ (lettre ajourée), quantile $q_\\beta$ ; ensemble $A_\\alpha$ avec $\\mathbb Q(A_\\alpha)\\ge1-\\alpha$.
- **Quantiles** : $z_\\beta$ pour $\\mathcal{N}(0,1)$, avec $\\Phi(z_\\beta)=\\beta$ (la notation $\\Phi^{-1}$ n’est **pas** employée) ; $\\mathrm{t}^{(k)}_\\beta$ (t droit, degrés de liberté en exposant) pour la loi de Student $\\mathrm{t}(k)$ ; $\\chi^2_\\beta(k)$ pour $\\chi^2(k)$ ; $\\mathrm{f}_{1-\\alpha}(k_1,k_2)$ pour la loi de Fisher $\\mathrm{F}(k_1,k_2)$ ; inverse généralisée $F^{\\leftarrow}(\\beta)$.
- **Moyenne et variance empiriques** : $\\bar X_n=n^{-1}\\sum_iX_i$ et $S_n^2=\\frac1{n-1}\\sum_i(X_i-\\bar X_n)^2$ (normalisée en $n-1$).
- **Tests** : partition $(\\Theta_0,\\Theta_1)$ de $\\Theta$, hypothèses $H_0:\\theta\\in\\Theta_0$, $H_1:\\theta\\in\\Theta_1$ ; test pur $\\phi:\\mathsf{Z}\\to\\{0,1\\}$ (phi **droit**) ; régions de rejet et d’acceptation calligraphiques $\\mathcal{R}$, $\\mathcal{A}$, $\\mathcal{R}_\\alpha$ ; statistique de test $T(Z)$, valeur critique $c$ ou $c_\\alpha$ ; fonction puissance $\\beta_\\phi$ ; **taille** $\\overline{\\alpha}(\\phi)$ (alpha surligné, à ne pas confondre avec le **niveau** $\\alpha$) ; **$p$-valeur** $\\hat\\alpha(Z)$ (alpha chapeau).
- **Lois** : $\\mathcal{E}(\\lambda)$ exponentielle **d’intensité** $\\lambda$ (densité $\\lambda e^{-\\lambda x}$) — attention, en PC4 Ex. 1 le modèle est $\\mathcal{E}(1/\\theta)$, $\\theta$ étant l’**espérance** ; $\\mathcal{U}([0,\\theta])$ ; $\\mathcal{B}\\mathrm{er}(\\theta)$ ; $\\mathrm{Bin}(n,\\theta)$ ; $\\mathrm{Poi}(\\theta)$ ; statistiques d’ordre $X_{n:n}=\\max_iX_i$ ; indicatrice $\\mathbb{1}_{\\{\\cdot\\}}$.`,
      },
      {
        kind: 'text',
        id: 'ch4-s1-plan',
        title: 'Plan et liens avec les autres chapitres',
        text: `- **Prérequis** : lois $\\chi^2$, Student, Gamma et les théorèmes de **Cochran** et de **Gosset** (ch.1) — fondement des trois pivots gaussiens ; loi de $X_{n:n}$ (ch.1, ch.3) ; inégalité de **Bienaymé-Tchebychev** et loi des grands nombres (ch.2) ; variance empirique $S_n^2$ et le test comme règle de décision (ch.3).
- **Suites** : le choix optimal de la statistique de test (lemme de **Neyman-Pearson**, tests randomisés) au ch.5 ; les régions et tests **asymptotiques** quand aucun pivot exact n’existe au ch.6.
- **À l’examen** (DIAGNOSTIC §2, §7) : la $p$-valeur (définition, calcul, interprétation : Examen 2025 Ex. 1 Q3), un **IC par pivot** à chaque session (Examen 2025 Ex. 2 Q5, CC 2022 Ex. 3 Q5 et Q9, Ex. 4 Q9), la fonction puissance (CC 2022 Ex. 1 Q4), les tests de Student et de Fisher et la correction de Bonferroni (Examen 2025 Ex. 4).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 2. Régions de confiance et pivots
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s2-regions',
    title: '2. Régions de confiance et fonctions pivotales',
    role: 'definitions',
    intro:
      'On remplace l’estimateur $T(Z)$ par une région $\\mathcal{C}(Z)$, construite sur les observations, qui contient $g(\\theta)$ avec une probabilité garantie **quelle que soit** la valeur inconnue du paramètre. L’outil standard est la **fonction pivotale** : une fonction des observations **et** du paramètre dont la loi ne dépend pas du paramètre.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch4-def-1-1',
        type: 'definition',
        label: 'Définition 1.1',
        title: 'Région de confiance',
        source: 'Poly ch.4, Déf. 1.1, p. 9',
        hypotheses: [
          '$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ modèle statistique.',
          '$g:\\Theta\\to\\mathbb{R}^p$ quantité d’intérêt.',
          '$\\alpha\\in\\,]0,1[$.',
        ],
        statement: `Une fonction $\\mathcal{C}:\\mathsf{Z}\\to\\mathcal{B}(\\mathbb{R}^p)$ est une **région de confiance au niveau de couverture $1-\\alpha$** pour $g(\\theta)$ si

- (i) pour tout $\\theta\\in\\Theta$, $\\{z\\in\\mathsf{Z},\\ g(\\theta)\\in\\mathcal{C}(z)\\}\\in\\mathcal{Z}$ ;
- (ii) on a

$$\\inf_{\\theta\\in\\Theta}\\mathbb{P}_\\theta\\big(\\{g(\\theta)\\in\\mathcal{C}(Z)\\}\\big)\\ge1-\\alpha.$$`,
        intuition:
          '(i) est une condition de **mesurabilité** : sans elle, la probabilité de (ii) n’aurait pas de sens. (ii) est un « **pour tout $\\theta$** » écrit sous forme d’infimum : la garantie doit valoir en chaque point de l’espace des paramètres, puisqu’on ne sait pas lequel est le bon. La Déf. 1.1 étend aux régions de $\\mathbb{R}^p$ la « définition minimale » d’intervalle de confiance du ch.2.',
        pitfalls: [
          'Oublier l’infimum : une couverture $\\ge1-\\alpha$ en **un** $\\theta$ ne suffit pas.',
          'Écrire « $\\mathbb{P}(\\theta\\in\\mathcal{C})$ » sans indice : la probabilité est $\\mathbb{P}_\\theta$, l’aléa est dans $Z$.',
        ],
      },
      {
        kind: 'text',
        id: 'ch4-s2-qui-aleatoire',
        title: 'Qui est aléatoire ? (Poly ch.4, p. 9)',
        text: `L’interprétation spontanée « $g(\\theta)$ a une probabilité $1-\\alpha$ d’appartenir à $\\mathcal{C}(Z)$ » est **erronée** : $\\theta$ est déterministe et fixé ; l’aléa porte sur l’observation $Z$, donc sur la région $\\mathcal{C}(Z)$, qui est une **statistique à valeurs ensemblistes**. Ce qui est garanti : *sous $\\mathbb{P}_\\theta$, la région aléatoire $\\mathcal{C}(Z)$ a une probabilité au moins $1-\\alpha$ de contenir $g(\\theta)$*, quel que soit $\\theta$.

Une **réalisation numérique** ne se lit pas comme une probabilité : si sur un jeu de données la région obtenue est $[0,2]$, il ne faut **surtout pas** écrire $\\mathbb{P}_\\theta(g(\\theta)\\in[0,2])\\ge1-\\alpha$ : cette assertion n’a pas de sens, ses deux membres étant déterministes (elle vaut $0$ ou $1$).

**Interprétation fréquentiste.** Répéter l’expérience $N$ fois indépendamment pour un même $\\theta$ donne $Z^{(1)},\\dots,Z^{(N)}$ et $N$ régions ; par la loi des grands nombres, la proportion de régions qui contiennent $g(\\theta)$ converge vers $\\mathbb{P}_\\theta(g(\\theta)\\in\\mathcal{C}(Z))\\ge1-\\alpha$. Le niveau porte sur la **procédure répétée**, pas sur le résultat d’une expérience particulière (figure p. 10 : 50 répétitions, $n=25$, $\\alpha=0{,}10$, 3 intervalles sur 50 ratent $\\mu$ ; on en attend environ 5).`,
      },
      {
        kind: 'viz',
        id: 'ch4-s2-viz-couverture',
        vizId: 'ch4-couverture-ic',
        caption: 'Le paramètre est fixe (ligne grise), les intervalles bougent : environ $100\\alpha$ des cent intervalles ratent le paramètre.',
      },
      {
        kind: 'theorem',
        id: 'ch4-def-ic-formes',
        type: 'definition',
        label: 'Définition (p. 10)',
        title: 'Intervalles de confiance : trois formes',
        source: 'Poly ch.4, p. 10 (non numérotée)',
        hypotheses: ['$p=1$ dans la Déf. 1.1.'],
        statement: `La région de confiance est le plus souvent un **intervalle de confiance**, de l’une des trois formes :

- (i) $\\mathcal{C}(Z)=[m(Z),+\\infty[$ : $m(Z)$ est une **borne inférieure de confiance** ;
- (ii) $\\mathcal{C}(Z)=]-\\infty,M(Z)]$ : $M(Z)$ est une **borne supérieure de confiance** ;
- (iii) $\\mathcal{C}(Z)=[m(Z),M(Z)]$ est un **intervalle de confiance bilatéral**.

Les bornes $m$ et $M$ sont des **statistiques** (fonctions mesurables des seules observations).`,
        intuition: 'Une borne unilatérale répond à une question orientée (« garantir que $\\theta$ est au moins… ») ; elle correspond, par dualité, à un test unilatéral.',
      },
      {
        kind: 'theorem',
        id: 'ch4-def-1-2',
        type: 'definition',
        label: 'Définition 1.2',
        title: 'Fonction pivotale (pivot)',
        source: 'Poly ch.4, Déf. 1.2, p. 10–11',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ modèle statistique **paramétrique**, $\\Theta\\in\\mathcal{B}(\\mathbb{R}^d)$.'],
        statement: `Une fonction

$$G:(\\mathsf{Z}\\times\\Theta,\\ \\mathcal{Z}\\otimes\\mathcal{B}(\\mathbb{R}^d))\\to(\\mathbb{R}^p,\\mathcal{B}(\\mathbb{R}^p)),\\qquad(z,\\theta)\\mapsto G(z,\\theta),$$

est dite **pivotale** (ou est un **pivot**) si

- (i) pour tout $\\theta\\in\\Theta$, $z\\mapsto G(z,\\theta)$ est mesurable ;
- (ii) pour tous $\\theta,\\vartheta\\in\\Theta$ et tout $A\\in\\mathcal{B}(\\mathbb{R}^p)$, $\\mathbb{P}_\\theta(G(Z,\\theta)\\in A)=\\mathbb{P}_\\vartheta(G(Z,\\vartheta)\\in A)$.

On note $\\mathbb Q$ la **loi commune** de $G(Z,\\theta)$ sous $\\mathbb{P}_\\theta$ : elle ne dépend pas de $\\theta$.`,
        intuition: 'On cherche une fonction des observations **et** du paramètre dont la loi est connue et ne dépend pas du paramètre : c’est le seul ingrédient nécessaire, la garantie de couverture s’en déduit mécaniquement (Prop. 1.1). La mesurabilité **conjointe** sert dans la preuve de la Prop. 1.1.',
        pitfalls: [
          '**Un pivot n’est pas une statistique** (Remarque p. 11) : la condition (ii) ne dit pas que $G$ ne dépend pas de $\\theta$ — sinon la construction ne donnerait rien. Elle dit que l’effet de $\\theta$ sur la loi des observations **se compense exactement** dans $G$. C’est une propriété conjointe de la fonction **et du modèle**.',
          'Penser aux « normalisations » qui annulent l’effet de $\\theta$ : translation $X-\\theta$, échelle $X/\\theta$ ou $\\theta X$, standardisation gaussienne.',
        ],
      },
      {
        kind: 'example',
        id: 'ch4-ex-1-1',
        title: 'Exemple 1.1 — Modèle exponentiel : θX est pivotale',
        source: 'Poly ch.4, Ex. 1.1, p. 11',
        setup: 'Une observation $X$ du modèle $(\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}_+),\\{\\mathcal{E}(\\theta),\\ \\theta\\in\\mathbb{R}_+^*\\})$, $\\mathcal{E}(\\theta)$ d’intensité $\\theta$ (densité $\\theta e^{-\\theta x}$). Montrer que $G(X,\\theta):=\\theta X$ est pivotale de loi $\\mathcal{E}(1)$.',
        steps: [
          { text: 'Pour $t>0$ : $\\mathbb{P}_\\theta(X>t)=\\int_t^{+\\infty}\\theta e^{-\\theta x}\\,\\mathrm{d}x=e^{-\\theta t}$.', justification: 'Calcul direct de la fonction de survie.' },
          { text: '$\\mathbb{P}_\\theta(\\theta X>t)=\\mathbb{P}_\\theta(X>t/\\theta)=e^{-t}=\\mathbb{P}(\\mathcal{E}(1)>t)$.', justification: '$\\theta>0$ : on divise l’inégalité sans en changer le sens.' },
          { text: 'La fonction de survie, donc la loi, de $\\theta X$ ne dépend pas de $\\theta$ : $G$ est pivotale, $\\mathbb Q=\\mathcal{E}(1)$.', justification: 'La fonction de survie caractérise la loi (Déf. 1.2 (ii)).' },
        ],
        conclusion: '$\\theta$ est un paramètre d’échelle (inverse) : multiplier par $\\theta$ « renormalise ». Pour un $n$-échantillon, le même mécanisme donne $\\theta\\sum_iX_i\\sim\\Gamma(n,1)$ et, en convention « espérance $\\theta$ » (PC4 Ex. 1), $2\\theta^{-1}\\sum_iX_i\\sim\\chi^2(2n)$.',
      },
      {
        kind: 'example',
        id: 'ch4-ex-1-2',
        title: 'Exemple 1.2 — Modèle uniforme : X/θ est pivotale',
        source: 'Poly ch.4, Ex. 1.2, p. 11',
        setup: 'Une observation $X$ du modèle $\\{\\mathcal{U}([0,\\theta]),\\ \\theta\\in\\mathbb{R}_+^*\\}$. Montrer que $X/\\theta$ est pivotale de loi $\\mathcal{U}([0,1])$.',
        steps: [
          { text: 'Pour $t\\in[0,\\theta]$, $\\mathbb{P}_\\theta(X\\le t)=t/\\theta$.', justification: 'Fonction de répartition de la loi uniforme.' },
          { text: 'Pour $u\\in[0,1]$ : $\\mathbb{P}_\\theta(X/\\theta\\le u)=\\mathbb{P}_\\theta(X\\le u\\theta)=u$.', justification: '$u\\theta\\in[0,\\theta]$.' },
          { text: 'Loi $\\mathcal{U}([0,1])$ indépendante de $\\theta$ : pivot.', justification: 'Déf. 1.2 (ii).' },
        ],
        conclusion: 'Repris à l’Ex. 1.3 (borne inférieure) et, avec $X_{n:n}$, dans PC4 Ex. 3 (intervalle de longueur minimale).',
      },
      {
        kind: 'theorem',
        id: 'ch4-prop-1-1',
        type: 'proposition',
        label: 'Proposition 1.1',
        title: 'Région de confiance associée à un pivot',
        source: 'Poly ch.4, Prop. 1.1, p. 11 (preuve p. 12)',
        hypotheses: [
          '$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ modèle statistique, $\\Theta\\in\\mathcal{B}(\\mathbb{R}^d)$.',
          '$G:\\mathsf{Z}\\times\\Theta\\to\\mathbb{R}^p$ fonction pivotale, de loi $\\mathbb Q$ sous $\\mathbb{P}_\\theta$.',
          '$\\alpha\\in\\,]0,1[$ et $A_\\alpha\\in\\mathcal{B}(\\mathbb{R}^p)$ tel que $\\mathbb Q(A_\\alpha)\\ge1-\\alpha$.',
        ],
        statement: `La région définie pour tout $z\\in\\mathsf{Z}$ par

$$\\mathcal{C}(z):=\\{\\theta\\in\\Theta,\\ G(z,\\theta)\\in A_\\alpha\\}$$

est une région de confiance au niveau de couverture $1-\\alpha$ pour $\\theta$ (c’est-à-dire pour $g=\\mathrm{Id}$, $p=d$).`,
        intuition: 'Construire une région à partir d’un pivot est presque automatique : choisir un ensemble de probabilité $\\ge1-\\alpha$ sous la loi du pivot, puis **résoudre** l’appartenance en $\\theta$.',
        proof: [
          {
            text: '*$\\mathcal{C}$ est à valeurs boréliennes.* Pour $z$ fixé, $\\mathcal{C}(z)$ est la **section en $z$** de $G^{-1}(A_\\alpha)\\in\\mathcal{Z}\\otimes\\mathcal{B}(\\Theta)$ ; une section d’un ensemble mesurable produit est mesurable.',
            justification: 'Mesurabilité **conjointe** de $G$ (Déf. 1.2).',
          },
          {
            text: '*Condition (i).* Pour $\\theta$ fixé, $\\{z\\in\\mathsf{Z},\\ \\theta\\in\\mathcal{C}(z)\\}=\\{z\\in\\mathsf{Z},\\ G(z,\\theta)\\in A_\\alpha\\}\\in\\mathcal{Z}$.',
            justification: 'Définition de $\\mathcal{C}$ ; $z\\mapsto G(z,\\theta)$ mesurable (Déf. 1.2 (i)) et $A_\\alpha$ borélien.',
          },
          {
            text: '*Couverture.* $\\mathbb{P}_\\theta(\\theta\\in\\mathcal{C}(Z))=\\mathbb{P}_\\theta(G(Z,\\theta)\\in A_\\alpha)=\\mathbb Q(A_\\alpha)\\ge1-\\alpha$.',
            justification: 'Le membre du milieu ne dépend pas de $\\theta$ **parce que $G$ est pivotale** ; hypothèse sur $A_\\alpha$.',
          },
          {
            text: '*Condition (ii).* En prenant l’infimum sur $\\theta\\in\\Theta$ : $\\inf_\\theta\\mathbb{P}_\\theta(\\theta\\in\\mathcal{C}(Z))\\ge1-\\alpha$. $\\square$',
            justification: 'La minoration de l’étape précédente est uniforme en $\\theta$.',
          },
        ],
        pitfalls: ['La couverture vaut **exactement** $\\mathbb Q(A_\\alpha)$ pour **tout** $\\theta$ : si $\\mathbb Q(A_\\alpha)=1-\\alpha$, la région est de niveau **exact**.'],
      },
      {
        kind: 'theorem',
        id: 'ch4-meth-1-1',
        type: 'methode',
        label: 'Méthode 1.1',
        title: 'Construction d’une région de confiance par un pivot',
        source: 'Poly ch.4, Méthode 1.1, p. 12',
        hypotheses: ['$1-\\alpha\\in\\,]0,1[$ niveau de couverture visé.'],
        statement: `1. Exhiber une **fonction pivotale** $G:\\mathsf{Z}\\times\\Theta\\to\\mathbb{R}^p$ pour le modèle.
2. Identifier la **loi $\\mathbb Q$** de $G(Z,\\theta)$ sous $\\mathbb{P}_\\theta$, qui ne dépend pas de $\\theta$.
3. Choisir $A_\\alpha\\in\\mathcal{B}(\\mathbb{R}^p)$ tel que $\\mathbb Q(A_\\alpha)\\ge1-\\alpha$.
4. **Résoudre en $\\theta$** l’appartenance $G(Z,\\theta)\\in A_\\alpha$ : $\\mathcal{C}(Z)=\\{\\theta\\in\\Theta,\\ G(Z,\\theta)\\in A_\\alpha\\}$ est une région de confiance de niveau de couverture $1-\\alpha$ (Prop. 1.1).`,
        intuition: 'On **redéroule** la méthode sur chaque modèle plutôt que d’appliquer une formule : c’est l’étape 4 (la résolution en $\\theta$) qui change d’un modèle à l’autre et donne à l’intervalle sa forme. Quatre étapes à savoir réciter (question courte n°4).',
        pitfalls: ['Lors de l’inversion, le sens des inégalités change si $\\theta$ est au **dénominateur** (variance, paramètre d’échelle) : le **grand** quantile donne la **petite** borne.'],
      },
      {
        kind: 'text',
        id: 'ch4-s2-choix-A',
        title: 'Le choix de $A_\\alpha$ (Poly ch.4, p. 12)',
        text: `$A_\\alpha$ n’est **pas unique** : toute partie de probabilité au moins $1-\\alpha$ sous $\\mathbb Q$ convient. Pour $p=1$, avec $q_\\beta$ le quantile d’ordre $\\beta$ de $\\mathbb Q$ (qui ne dépend pas de $\\theta$), trois choix reviennent :

$$A_\\alpha=]-\\infty,q_{1-\\alpha}],\\qquad A_\\alpha=[q_\\alpha,+\\infty[,\\qquad A_\\alpha=\\big]q_{\\alpha/2},q_{1-\\alpha/2}\\big],$$

les deux premiers donnant une **borne de confiance unilatérale**, le troisième un **intervalle bilatéral**. Plus généralement, pour $0\\le p_1<p_2\\le1$ avec $p_2-p_1=1-\\alpha$, $A_\\alpha=]q_{p_1},q_{p_2}]$ convient. Le choix est guidé par la **question posée** (une borne inférieure suffit parfois) ou par le souhait de **minimiser la longueur**.

**Intuition (bloc du poly).** Le choix symétrique $p_1=\\alpha/2$ est une **convention** ; il donne l’intervalle le plus court lorsque la densité de $\\mathbb Q$ est **paire et unimodale** ($\\mathcal{N}(0,1)$, Student). Pour une loi dissymétrique, ce n’est plus vrai : loi de $X_{n:n}/\\theta$ (densité croissante $nx^{n-1}$, optimum entièrement décalé contre 1, PC4 Ex. 3) ; loi du $\\chi^2$ (optimum seulement approximativement symétrique).`,
      },
      {
        kind: 'viz',
        id: 'ch4-s2-viz-longueur',
        vizId: 'ch4-longueur-minimale',
        caption: 'Faire glisser $p_1$ : la couverture reste $1-\\alpha$, mais la longueur change ; pour l’uniforme l’optimum est $p_1=\\alpha$.',
      },
      {
        kind: 'example',
        id: 'ch4-ex-1-3',
        title: 'Exemple 1.3 — Modèle uniforme : borne inférieure de confiance',
        source: 'Poly ch.4, Ex. 1.3, p. 13 (§1.3 « Mise en pratique »)',
        setup: 'Modèle de l’Ex. 1.2 ; $X/\\theta\\sim\\mathcal{U}([0,1])$ sous $\\mathbb{P}_\\theta$. Montrer que $X/(1-\\alpha)$ est une borne inférieure de confiance de niveau $1-\\alpha$ pour $\\theta$.',
        steps: [
          { text: 'Choisir $A_\\alpha=[0,1-\\alpha]$, de probabilité $1-\\alpha$ sous $\\mathcal{U}([0,1])$.', justification: 'Étape 3 de la Méthode 1.1 (forme $]-\\infty,q_{1-\\alpha}]$).' },
          { text: '$\\mathbb{P}_\\theta(X/\\theta\\le1-\\alpha)=1-\\alpha$ pour tout $\\theta$.', justification: 'Pivot de l’Ex. 1.2.' },
          { text: '$X/\\theta\\le1-\\alpha\\iff\\theta\\ge X/(1-\\alpha)$, d’où $\\mathbb{P}_\\theta\\big(\\theta\\in[X/(1-\\alpha),+\\infty[\\big)=1-\\alpha$ pour tout $\\theta>0$.', justification: 'Étape 4 : résolution en $\\theta$, avec $\\theta>0$ et $1-\\alpha>0$.' },
        ],
        conclusion: 'Seul endroit du cours où une forme unilatérale est effectivement construite. Comme $X\\le\\theta$ presque sûrement, la borne triviale $X$ est de niveau 1 ; diviser par $1-\\alpha$ « paie » le risque $\\alpha$.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 3. Le cas gaussien
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s3-gaussien',
    title: '3. Le cas gaussien : trois pivots (moyenne, variance, couple)',
    role: 'exemples',
    intro:
      'Le modèle gaussien est le cas où tout se calcule exactement : moyenne à variance connue (pivot $\\mathcal{N}(0,1)$), moyenne à variance inconnue (pivot de Student, théorème de Gosset), variance (pivot $\\chi^2$), couple $(\\mu,\\sigma^2)$ (pivot bivarié). Ces constructions reviennent à chaque annale.',
    blocks: [
      {
        kind: 'example',
        id: 'ch4-ex-1-4',
        title: 'Exemple 1.4 — Intervalle pour la moyenne, variance connue',
        source: 'Poly ch.4, Ex. 1.4, p. 13 (§1.4)',
        setup: '$(X_1,\\dots,X_n)$ $n$-échantillon de $\\{\\mathcal{N}(\\mu,\\sigma^2),\\ \\mu\\in\\mathbb{R}\\}$, $\\sigma^2>0$ **connue**. Montrer que $G(X_1,\\dots,X_n;\\mu):=\\sqrt n(\\bar X_n-\\mu)/\\sigma$ est pivotale et que $\\mathcal{I}_{n,\\alpha}:=[\\bar X_n\\pm z_{1-\\alpha/2}\\sigma/\\sqrt n]$ est de niveau exactement $1-\\alpha$.',
        steps: [
          { text: 'Sous $\\mathbb{P}_\\mu$, $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$, donc $G\\sim\\mathcal{N}(0,1)$ pour tout $\\mu$ : $G$ est pivotale.', justification: 'Somme de gaussiennes indépendantes ; centrage-réduction.' },
          { text: 'Par symétrie de $\\mathcal{N}(0,1)$, $z_{\\alpha/2}=-z_{1-\\alpha/2}$, et $\\mathbb{P}_\\mu\\big(G\\in[-z_{1-\\alpha/2},z_{1-\\alpha/2}]\\big)=\\Phi(z_{1-\\alpha/2})-\\Phi(-z_{1-\\alpha/2})=1-\\alpha$.', justification: 'Densité paire ; $\\Phi(z_\\beta)=\\beta$.' },
          { text: 'Résolution en $\\mu$ : $\\mathbb{P}_\\mu\\big(\\mu\\in[\\bar X_n\\pm z_{1-\\alpha/2}\\sigma/\\sqrt n]\\big)=1-\\alpha$ pour tout $\\mu\\in\\mathbb{R}$.', justification: 'Multiplier par $\\sigma/\\sqrt n>0$ et isoler $\\mu$ (Méthode 1.1, étape 4).' },
        ],
        conclusion: 'Longueur $2\\sigma z_{1-\\alpha/2}/\\sqrt n$ : elle **décroît en $n^{-1/2}$** à niveau fixé et **croît indéfiniment quand $\\alpha\\to0$** à $n$ fixé. Compromis central du chapitre : une région plus sûre est moins informative ($\\mathbb{R}$ tout entier est de niveau 1 sans rien apprendre) ; il se retrouve côté tests entre taille et puissance.',
      },
      {
        kind: 'text',
        id: 'ch4-s3-quantiles',
        title: 'Valeurs classiques des quantiles gaussiens (Remarque p. 14 et Outils p. 36)',
        text: `$z_{0{,}95}=1{,}645$, $z_{0{,}975}=1{,}96$, $z_{0{,}99}=2{,}326$, $z_{0{,}995}=2{,}576$, $z_{0{,}999}=3{,}090$. D’où l’approximation « $\\pm2\\sigma/\\sqrt n$ » pour un intervalle à 95 %.

**Piège** : bilatéral à 95 % $\\Rightarrow$ $z_{0{,}975}=1{,}96$ ; unilatéral à 95 % $\\Rightarrow$ $z_{0{,}95}=1{,}645$.`,
      },
      {
        kind: 'theorem',
        id: 'ch4-rappel-gosset',
        type: 'theoreme',
        label: 'Rappel (ch.1, Thm 1.3)',
        title: 'Théorème de Gosset',
        source: 'Poly ch.4, p. 14 (rappel du Poly ch.1, Thm 1.3 ; redémontré en PC4 Ex. 2 Q4–Q5)',
        hypotheses: ['$(X_1,\\dots,X_n)$ $n$-échantillon de $\\mathcal{N}(\\mu,\\sigma^2)$, $n\\ge2$.'],
        statement: `$\\bar X_n$ et $S_n^2$ sont **indépendantes**, $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$, $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$, et en conséquence, par définition de la loi de Student,

$$T_n:=\\sqrt n\\,\\frac{\\bar X_n-\\mu}{S_n}=\\frac{\\sqrt n(\\bar X_n-\\mu)/\\sigma}{\\sqrt{[(n-1)S_n^2/\\sigma^2]/(n-1)}}\\sim\\mathrm{t}(n-1).$$`,
        intuition: 'Le pivot de l’Ex. 1.4 n’en est plus un si $\\sigma$ est inconnue ($\\sigma$ n’est pas calculable). On remplace $\\sigma$ par $S_n$ ; Gosset donne la loi exacte du quotient : $\\mathcal{N}(0,1)$ divisée par $\\sqrt{\\chi^2(n-1)/(n-1)}$ **indépendante**.',
        proof: [
          { text: '$\\bar X_n=n^{-1}\\mathbf{1}^\\top\\Pi Z$ et $S_n^2=(n-1)^{-1}\\|(\\mathrm{I}_n-\\Pi)Z\\|^2$, où $\\Pi$ est la projection orthogonale sur $\\mathbb{R}\\mathbf{1}$.', justification: '$\\Pi Z=\\bar X_n\\mathbf{1}$ et $(\\mathrm{I}_n-\\Pi)Z=(X_i-\\bar X_n)_i$ (PC4 Ex. 2 Q4).' },
          { text: 'Sous $\\mathbb{P}_\\theta$, $Z\\sim\\mathcal{N}_n(\\mu\\mathbf{1},\\sigma^2\\mathrm{I}_n)$ ; par Cochran, $\\Pi Z$ et $(\\mathrm{I}_n-\\Pi)Z$ sont indépendants.', justification: 'Théorème de Cochran (ch.1, Thm 1.1) pour $\\mathbb{R}^n=\\mathbb{R}\\mathbf{1}\\oplus(\\mathbb{R}\\mathbf{1})^\\perp$ (décorrélation d’un vecteur gaussien).' },
          { text: '$\\|(\\mathrm{I}_n-\\Pi)Z\\|^2/\\sigma^2\\sim\\chi^2(n-1)$ car $(\\mathrm{I}_n-\\Pi)\\mu\\mathbf{1}=0$ et $\\dim(\\mathbb{R}\\mathbf{1})^\\perp=n-1$.', justification: 'Cochran : norme au carré de la projection d’un gaussien isotrope centré.' },
          { text: 'Le quotient d’une $\\mathcal{N}(0,1)$ par la racine d’un $\\chi^2(n-1)/(n-1)$ indépendant suit $\\mathrm{t}(n-1)$.', justification: 'Définition de la loi de Student (ch.1, Déf. 12).' },
        ],
        pitfalls: ['$\\chi^2(n-1)$ et non $\\chi^2(n)$ : on « perd » un degré de liberté (projection sur un sous-espace de dimension $n-1$).', 'L’indépendance $\\bar X_n\\perp S_n^2$ est **propre au cas gaussien**.'],
      },
      {
        kind: 'example',
        id: 'ch4-ex-1-5',
        title: 'Exemple 1.5 — Intervalle pour la moyenne, variance inconnue (Student)',
        source: 'Poly ch.4, Ex. 1.5, p. 14 (figures p. 15)',
        setup: '$(X_1,\\dots,X_n)$, $n\\ge2$, $n$-échantillon de $\\{\\mathcal{N}(\\mu,\\sigma^2),\\ \\theta=(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*\\}$. Construire un intervalle de niveau $1-\\alpha$ pour $\\mu$.',
        steps: [
          { text: '$G(X_1,\\dots,X_n;\\mu):=\\sqrt n(\\bar X_n-\\mu)/S_n$ est pivotale de loi $\\mathrm{t}(n-1)$ sous $\\mathbb{P}_\\theta$ pour tout $\\theta$.', justification: 'Théorème de Gosset ; la loi ne dépend ni de $\\mu$ ni de $\\sigma^2$.' },
          { text: 'La densité de $\\mathrm{t}(n-1)$ est paire et unimodale de mode $0$ : intervalle symétrique, et $\\mathrm{t}^{(n-1)}_{\\alpha/2}=-\\mathrm{t}^{(n-1)}_{1-\\alpha/2}$.', justification: 'Remarque « choix de $A_\\alpha$ » : le symétrique est le plus court pour une densité paire unimodale.' },
          { text: '$\\mathbb{P}_\\theta\\big(-\\mathrm{t}^{(n-1)}_{1-\\alpha/2}\\le\\sqrt n(\\bar X_n-\\mu)/S_n\\le\\mathrm{t}^{(n-1)}_{1-\\alpha/2}\\big)=1-\\alpha$.', justification: 'F.d.r. continue de la loi de Student.' },
          { text: '$\\mathbb{P}_\\theta\\Big(\\mu\\in\\Big[\\bar X_n\\pm S_n\\frac{\\mathrm{t}^{(n-1)}_{1-\\alpha/2}}{\\sqrt n}\\Big]\\Big)=1-\\alpha$ pour tout $\\theta$.', justification: 'Résolution en $\\mu$ (multiplier par $S_n/\\sqrt n>0$).' },
        ],
        conclusion: 'Remplacer $\\sigma$ par $S_n$ ajoute de l’aléa : il faut **élargir** l’intervalle, d’autant plus que $n$ est petit. Pour $\\alpha=0{,}05$, $n=32$, $\\sigma=1$ : $2z_{0{,}975}\\sigma/\\sqrt n=0{,}693$ contre $2\\,\\mathrm{t}^{(31)}_{0{,}975}S_n/\\sqrt n=0{,}721$ (pour $S_n=\\sigma$), soit **+4,1 %**. Garder $z_{1-\\alpha/2}$ avec $S_n$ donne un intervalle trop court (couverture $<1-\\alpha$), seulement de niveau asymptotique (ch.6). La longueur de l’intervalle de Student est **aléatoire**. (Gosset, chimiste chez Guinness, publie en 1908 sous le pseudonyme « Student ».)',
      },
      {
        kind: 'example',
        id: 'ch4-ex-1-6',
        title: 'Exemple 1.6 — Intervalle pour la variance, espérance inconnue',
        source: 'Poly ch.4, Ex. 1.6, p. 16',
        setup: 'Même modèle, $\\alpha_1,\\alpha_2>0$ avec $\\alpha_1+\\alpha_2=\\alpha$. Construire un intervalle de niveau $1-\\alpha$ pour $\\sigma^2$.',
        steps: [
          { text: '$G(X_1,\\dots,X_n;\\sigma^2):=(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ sous $\\mathbb{P}_{(\\mu,\\sigma^2)}$ pour tout $(\\mu,\\sigma^2)$ : pivot.', justification: 'Deuxième point du théorème de Gosset.' },
          { text: '$\\mathbb{P}_{\\mu,\\sigma^2}\\Big(\\chi^2_{\\alpha_1}(n-1)\\le\\frac{(n-1)S_n^2}{\\sigma^2}\\le\\chi^2_{1-\\alpha_2}(n-1)\\Big)=(1-\\alpha_2)-\\alpha_1=1-\\alpha$.', justification: 'F.d.r. continue du $\\chi^2$.' },
          { text: 'Les trois membres étant **strictement positifs**, passer à l’inverse **renverse** l’encadrement : $\\Big[\\frac{(n-1)S_n^2}{\\chi^2_{1-\\alpha_2}(n-1)},\\ \\frac{(n-1)S_n^2}{\\chi^2_{\\alpha_1}(n-1)}\\Big]$ est de niveau $1-\\alpha$ pour $\\sigma^2$.', justification: 'Méthode 1.1, étape 4 ; $x\\mapsto1/x$ décroissante sur $\\mathbb{R}_+^*$.' },
        ],
        conclusion: 'Le choix de $(\\alpha_1,\\alpha_2)$ n’est pas fixé par $\\alpha_1+\\alpha_2=\\alpha$ ; on peut montrer (non démontré dans le poly) qu’il existe une paire minimisant l’espérance de la longueur pour tout $(\\mu,\\sigma^2)$, avec $\\alpha_1^*\\simeq\\alpha_2^*\\simeq\\alpha/2$ pour $n$ grand ; en pratique $\\alpha_1=\\alpha_2=\\alpha/2$. L’intervalle **n’est pas symétrique** autour de $S_n^2$. **Pièges** : le quantile **haut** va au dénominateur de la borne **inférieure** ; ne pas écrire $\\chi^2_{\\alpha/2}=-\\chi^2_{1-\\alpha/2}$ (pas de symétrie).',
      },
      {
        kind: 'example',
        id: 'ch4-pc2-ex1-q7',
        title: 'PC2 Ex. 1 Q7 — Régression linéaire gaussienne : intervalle pour σ²',
        source: 'PC2 Ex. 1 Q7 ; Examen 2025 Ex. 2 Q5 (même structure)',
        setup: 'Modèle $Y_i\\sim\\mathcal{N}(\\beta_1+\\beta_2x_i,\\sigma^2)$ indépendants, $\\theta=(\\beta_1,\\beta_2,\\sigma^2)$, EMV $\\widehat{\\sigma^2}=\\frac1n\\|\\mathbf{Y}-\\mathbf{X}\\hat\\beta\\|^2$. On a établi (Q5, Cochran) que $n\\widehat{\\sigma^2}/\\sigma^2\\sim\\chi^2(n-2)$. Proposer un IC de niveau $1-\\alpha$ pour $\\sigma^2$.',
        steps: [
          { text: '$n\\widehat{\\sigma^2}/\\sigma^2\\sim\\chi^2(n-2)$, loi indépendante de $\\theta$ : fonction pivotale.', justification: 'Cochran : projection de $\\mathbf{Y}$ sur l’orthogonal du plan engendré par $\\mathbf{1}$ et $\\underline{\\mathbf{x}}$, de dimension $n-2$.' },
          { text: '$\\mathbb{P}_\\theta\\big(\\chi^2_{\\alpha/2}(n-2)\\le n\\widehat{\\sigma^2}/\\sigma^2\\le\\chi^2_{1-\\alpha/2}(n-2)\\big)=1-\\alpha$.', justification: 'Choix symétrique de $A_\\alpha$.' },
          { text: '$\\Big[\\frac{n\\widehat{\\sigma^2}}{\\chi^2_{1-\\alpha/2}(n-2)},\\ \\frac{n\\widehat{\\sigma^2}}{\\chi^2_{\\alpha/2}(n-2)}\\Big]$ est un IC de niveau $1-\\alpha$ pour $\\sigma^2$.', justification: 'Inversion d’un encadrement de quantités positives.' },
        ],
        conclusion: 'Application : $n=10$, $\\widehat{\\sigma^2}=2$, $\\chi^2_{0{,}025}(8)\\approx2{,}180$, $\\chi^2_{0{,}975}(8)\\approx17{,}535$ : IC $\\approx[1{,}14;9{,}17]$. Dans l’Examen 2025 Ex. 2 Q5 (log-normale), le même raisonnement avec $n\\widehat{\\sigma^2}_{ML}/\\sigma^2=(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ donne $\\big[n\\widehat{\\sigma^2}_{ML}/\\chi^2_{1-\\alpha/2}(n-1),\\ n\\widehat{\\sigma^2}_{ML}/\\chi^2_{\\alpha/2}(n-1)\\big]$. Erreur classique : inverser les quantiles (intervalle vide ou à l’envers).',
      },
      {
        kind: 'example',
        id: 'ch4-ex-1-7',
        title: 'Exemple 1.7 — Région de confiance pour le couple (μ, σ²) : Bonferroni et région exacte',
        source: 'Poly ch.4, Ex. 1.7, p. 16–17',
        setup: 'Même modèle, $p=2$. Construire une région de niveau $1-\\alpha$ pour $(\\mu,\\sigma^2)$ de deux façons. On pose $I_1:=[\\bar X_n\\pm S_n\\mathrm{t}^{(n-1)}_{1-\\alpha/4}/\\sqrt n]$ et $I_2:=\\big[(n-1)S_n^2/\\chi^2_{1-\\alpha/4}(n-1),\\ (n-1)S_n^2/\\chi^2_{\\alpha/4}(n-1)\\big]$, de niveau $1-\\alpha/2$ chacun.',
        steps: [
          { text: '(a) $\\mathbb{P}_{\\mu,\\sigma^2}\\big((\\mu,\\sigma^2)\\notin I_1\\times I_2\\big)\\le\\mathbb{P}(\\mu\\notin I_1)+\\mathbb{P}(\\sigma^2\\notin I_2)\\le\\frac\\alpha2+\\frac\\alpha2=\\alpha$ : $I_1\\times I_2$ est de niveau **au moins** $1-\\alpha$.', justification: '**Sous-additivité** (borne de l’union), Ex. 1.5 et 1.6 au niveau $1-\\alpha/2$.' },
          { text: 'Le niveau exact de $I_1\\times I_2$ ne se calcule pas simplement : $T=\\sqrt n(\\bar X_n-\\mu)/S_n$ et $V=(n-1)S_n^2/\\sigma^2$ **ne sont pas indépendantes** ($T=N/\\sqrt{V/(n-1)}$ avec $N=\\sqrt n(\\bar X_n-\\mu)/\\sigma$).', justification: 'On ne peut pas multiplier les niveaux.' },
          { text: '(b) $G(Z;\\mu,\\sigma^2):=\\big(\\sqrt n(\\bar X_n-\\mu)/\\sigma,\\ (n-1)S_n^2/\\sigma^2\\big)$ est pivotale de loi $\\mathcal{N}(0,1)\\otimes\\chi^2(n-1)$.', justification: 'Gosset : lois marginales **et indépendance** de $\\bar X_n$ et $S_n^2$.' },
          { text: 'Avec $A_\\alpha:=[-z_{1-\\alpha/4},z_{1-\\alpha/4}]\\times[\\chi^2_{\\alpha/4}(n-1),\\chi^2_{1-\\alpha/4}(n-1)]$, $\\mathbb Q(A_\\alpha)=(1-\\alpha/2)^2$.', justification: 'Probabilité d’un pavé sous une loi produit (indépendance des composantes).' },
          { text: 'Prop. 1.1 ($p=2$) : $\\mathcal{C}(Z)=\\big\\{(\\mu,\\sigma^2):\\ |\\bar X_n-\\mu|\\le\\sigma z_{1-\\alpha/4}/\\sqrt n,\\ (n-1)S_n^2/\\chi^2_{1-\\alpha/4}(n-1)\\le\\sigma^2\\le(n-1)S_n^2/\\chi^2_{\\alpha/4}(n-1)\\big\\}$ est de niveau **exactement** $(1-\\alpha/2)^2=1-\\alpha+\\alpha^2/4$.', justification: 'Résolution de chaque condition (la première en $\\mu$ à $\\sigma$ fixé, la seconde en $\\sigma^2$).' },
        ],
        conclusion: 'La région exacte n’est plus un produit d’intervalles : elle est délimitée par deux droites horizontales et les deux courbes $\\mu=\\bar X_n\\pm\\sigma z_{1-\\alpha/4}/\\sqrt n$. L’excédent de niveau $\\alpha^2/4$ est du second ordre ($0{,}0625$ % pour $\\alpha=5$ %). **Correction de Bonferroni** : pour couvrir simultanément $p$ quantités, prendre $p$ intervalles de niveau $1-\\alpha/p$ ; d’autant plus conservatif que $p$ est grand (tests multiples, Examen 2025 Ex. 4 Q6).',
      },
      {
        kind: 'text',
        id: 'ch4-s3-retenir',
        title: 'Ce qu’il faut retenir de la première moitié (Poly ch.4, p. 18)',
        text: `1. Une région de confiance est un **ensemble aléatoire** qui contient la quantité inconnue avec probabilité au moins $1-\\alpha$, **pour toute valeur du paramètre**.
2. La technique la plus courante s’appuie sur une **fonction pivotale**.
3. Le cas **gaussien** est particulièrement important : variance connue ($\\mathcal{N}(0,1)$) puis inconnue (Student remplace la loi normale), variance ($\\chi^2$).
4. En l’absence de pivot : **inégalité de concentration** (section 4) ou approche **asymptotique** (ch.6).

**Tableau des pivots du chapitre** : $\\theta X\\sim\\mathcal{E}(1)$ (Ex. 1.1) ; $X/\\theta\\sim\\mathcal{U}([0,1])$ (Ex. 1.2) ; $X_{n:n}/\\theta$ de f.d.r. $x^n$ (PC4 Ex. 3) ; $2\\theta^{-1}\\sum_iX_i\\sim\\chi^2(2n)$ (exponentielle d’espérance $\\theta$, PC4 Ex. 1) ; $\\sqrt n(\\bar X_n-\\mu)/\\sigma\\sim\\mathcal{N}(0,1)$ ; $\\sqrt n(\\bar X_n-\\mu)/S_n\\sim\\mathrm{t}(n-1)$ ; $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ ; $\\sqrt{ns}(\\hat\\beta_1-\\beta_1)/\\hat\\sigma\\sim\\mathrm{t}(n-2)$ (régression, Ex. 2.15) ; rapport de variances empiriques $\\sim\\mathrm{F}(n-1,p-1)$ (PC4 Ex. 5).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 4. En l'absence de pivot
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s4-sans-pivot',
    title: '4. En l’absence de pivot : inégalités de déviation (Tchebychev, Hoeffding)',
    role: 'definitions',
    intro:
      'Dans le modèle de Bernoulli, la loi de $\\bar X_n$ dépend de $\\theta$ autrement que par une translation ou un changement d’échelle : **aucun pivot explicite**. On remplace la loi exacte par une **majoration uniforme** de la probabilité de déviation, valable pour tout $\\theta$ ; l’intervalle obtenu est **conservatif** (couverture $\\ge1-\\alpha$, plus long que nécessaire).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch4-thm-3-1',
        type: 'theoreme',
        label: 'Théorème 3.1 (Outils)',
        title: 'Inégalité de Hoeffding',
        source: 'Poly ch.4, Outils, Thm 3.1, p. 37',
        hypotheses: [
          '$X_1,\\dots,X_n$ variables aléatoires réelles **indépendantes**.',
          '$X_i\\in[a_i,b_i]$ presque sûrement, avec $a_i<b_i$ (variables **bornées**).',
        ],
        statement: `Avec $S_n:=\\sum_{i=1}^n(X_i-\\mathbb{E}[X_i])$, pour tout $t>0$,

$$\\mathbb{P}(S_n\\ge t)\\le\\exp\\Big(-\\frac{2t^2}{\\sum_{i=1}^n(b_i-a_i)^2}\\Big).$$`,
        intuition: 'Quand les observations sont bornées, majoration **exponentielle**, bien plus fine que Bienaymé-Tchebychev (qui n’utilise que la variance) pour les petites probabilités. Preuve **admise** dans le chapitre (annexe sur les inégalités de concentration : inégalité de Chernoff des compléments + lemme de Hoeffding).',
        pitfalls: ['Hypothèse de **bornitude** indispensable : Hoeffding exclut par exemple le modèle gaussien.'],
      },
      {
        kind: 'theorem',
        id: 'ch4-cor-3-1',
        type: 'corollaire',
        label: 'Corollaire 3.1 (Outils)',
        title: 'Hoeffding pour un n-échantillon borné',
        source: 'Poly ch.4, Outils, Cor. 3.1, p. 37',
        hypotheses: ['$X_1,\\dots,X_n$ indépendantes et de même loi.', '$X_i\\in[a,b]$ p.s., d’espérance $m$.'],
        statement: `Pour tout $\\delta>0$,

$$\\mathbb{P}\\big(|\\bar X_n-m|\\ge\\delta\\big)\\le2\\exp\\Big(-\\frac{2n\\delta^2}{(b-a)^2}\\Big).$$

Pour des variables de Bernoulli ($[a,b]=[0,1]$), la majoration est $2\\exp(-2n\\delta^2)$.`,
        proof: [
          { text: 'Thm 3.1 avec $t=n\\delta$ : $\\sum_i(X_i-m)=n(\\bar X_n-m)$ et $\\sum_i(b_i-a_i)^2=n(b-a)^2$, d’où $\\mathbb{P}(\\bar X_n-m\\ge\\delta)\\le\\exp(-2n\\delta^2/(b-a)^2)$.', justification: 'Substitution directe.' },
          { text: 'Même théorème appliqué à $-X_1,\\dots,-X_n$ (à valeurs dans $[-b,-a]$, d’espérance $-m$) : même majoration pour $\\mathbb{P}(\\bar X_n-m\\le-\\delta)$.', justification: 'Symétrisation : la largeur $b-a$ est inchangée.' },
          { text: 'On somme les deux majorations. $\\square$', justification: 'Sous-additivité : $\\{|\\bar X_n-m|\\ge\\delta\\}$ est la réunion des deux événements.' },
        ],
      },
      {
        kind: 'example',
        id: 'ch4-ex-1-8',
        title: 'Exemple 1.8 — Intervalle pour une proportion : Bienaymé-Tchebychev puis Hoeffding',
        source: 'Poly ch.4, Ex. 1.8, p. 17–18 (§1.5)',
        setup: '$(X_1,\\dots,X_n)$ $n$-échantillon de $\\{\\mathcal{B}\\mathrm{er}(\\theta),\\ \\theta\\in[0,1]\\}$, $\\bar X_n$ fréquence empirique (sans biais). Construire deux intervalles de niveau $1-\\alpha$ et comparer leurs longueurs.',
        steps: [
          { text: '$\\mathrm{Var}_\\theta(\\bar X_n)=\\theta(1-\\theta)/n$ et $\\sup_{\\theta\\in[0,1]}\\mathrm{Var}_\\theta(\\bar X_n)=\\frac1{4n}$.', justification: 'Indépendance ; $\\theta\\mapsto\\theta(1-\\theta)$ est maximale en $\\theta=1/2$.' },
          { text: 'Pour tout $\\delta>0$ et tout $\\theta$ : $\\mathbb{P}_\\theta(|\\bar X_n-\\theta|\\ge\\delta)\\le\\frac{\\mathrm{Var}_\\theta(\\bar X_n)}{\\delta^2}\\le\\frac1{4n\\delta^2}$.', justification: 'Inégalité de Bienaymé-Tchebychev (ch.2), puis majoration **uniforme** de la variance.' },
          { text: 'On choisit $\\delta_{n,\\alpha}$ solution de $1/(4n\\delta^2)=\\alpha$ : $\\delta_{n,\\alpha}=1/(2\\sqrt{n\\alpha})$ ; alors $\\mathcal{I}_{n,\\alpha}:=[\\bar X_n\\pm1/(2\\sqrt{n\\alpha})]$ vérifie $\\mathbb{P}_\\theta(\\theta\\notin\\mathcal{I}_{n,\\alpha})\\le\\alpha$ pour tout $\\theta$.', justification: 'Inversion de l’inégalité de déviation.' },
          { text: 'Hoeffding : $\\sup_\\theta\\mathbb{P}_\\theta(|\\bar X_n-\\theta|>\\delta)\\le2\\exp(-2n\\delta^2)$ ; $\\delta(\\alpha,n)$ solution de $2\\exp(-2n\\delta^2)=\\alpha$ vaut $\\sqrt{\\log(2/\\alpha)/(2n)}$, d’où $\\mathcal{I}^\\star_{n,\\alpha}:=\\big[\\bar X_n\\pm\\sqrt{\\frac1{2n}\\log\\frac2\\alpha}\\big]$ de niveau $1-\\alpha$.', justification: 'Cor. 3.1 avec $[a,b]=[0,1]$ (la majoration avec $\\ge\\delta$ vaut a fortiori pour $>\\delta$).' },
          { text: '$\\dfrac{|\\mathcal{I}^\\star_{n,\\alpha}|}{|\\mathcal{I}_{n,\\alpha}|}=\\dfrac{2\\sqrt{\\log(2/\\alpha)/(2n)}}{1/\\sqrt{n\\alpha}}=\\sqrt{2\\alpha\\log(2/\\alpha)}$.', justification: 'Calcul direct ; le rapport ne dépend pas de $n$.' },
        ],
        conclusion: 'Le rapport vaut $0{,}61$ pour $\\alpha=5$ % et $0{,}33$ pour $\\alpha=1$ % (« précision trois fois meilleure ») et tend vers $0$ quand $\\alpha\\to0$. Bienaymé-Tchebychev ne mobilise que la variance et paie le niveau en $\\alpha^{-1/2}$ ; Hoeffding mobilise la **bornitude** et ne le paie qu’en $\\sqrt{\\log(1/\\alpha)}$. Les deux restent en $n^{-1/2}$ et sont plus longs que l’intervalle exact que donnerait la loi binomiale. **Pièges** : oublier le facteur 2 (bilatéral) de Hoeffding ; oublier de majorer la variance **uniformément** en $\\theta$ (elle dépend de l’inconnue).',
      },
      {
        kind: 'viz',
        id: 'ch4-s4-viz-th',
        vizId: 'ch4-tchebychev-hoeffding',
        caption: 'La couverture exacte (calcul binomial) reste au-dessus de $1-\\alpha$ pour les deux intervalles : ils sont conservatifs.',
      },
    ],
  },
]
