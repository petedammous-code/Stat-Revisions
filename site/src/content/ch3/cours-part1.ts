import type { CourseSection } from '../types'

/** Sections 1 à 4 du cours : intuition et notations, biais, perte et risque, admissibilité et restriction de la classe. */
export const coursePart1: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 1. Intuition et notations
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s1-intuition',
    title: '1. Intuition et notations : comment comparer deux estimateurs ?',
    role: 'intuition',
    intro:
      'Au chapitre 2, un même modèle fournissait plusieurs estimateurs (deux estimateurs des moments dans le modèle exponentiel ; moments et maximum de vraisemblance différents dans le modèle uniforme). Lequel choisir ? Il faut (1) **mesurer l’erreur** par une fonction de perte et le risque associé, (2) **comparer** ces mesures. Le risque étant une **fonction du paramètre inconnu**, l’ordre obtenu n’est pas total : on se **restreint** aux estimateurs sans biais, où l’on démontre une borne inférieure universelle, la **borne de Cramér-Rao**.',
    blocks: [
      {
        kind: 'text',
        id: 'ch3-s1-plan',
        title: 'Le fil du chapitre (Poly ch.3, introduction p. 7–8 et Résumé p. 18)',
        text: `**biais** (erreur systématique) → **perte et risque** (une fonction de $\\theta$) → **décomposition biais-variance** → comparer des fonctions : **ordre partiel**, **admissibilité** → des estimateurs triviaux sont admissibles, aucun n’est uniformément optimal → **restreindre la classe** aux estimateurs sans biais → **borne de Cramér-Rao** (modèle régulier, score, information de Fisher) → **efficacité**.

**Piège de départ :** « le meilleur estimateur » n’a aucun sens tant qu’on n’a pas fixé **la perte** et **la classe d’estimateurs** dans laquelle on compare.`,
      },
      {
        kind: 'text',
        id: 'ch3-s1-notations',
        title: 'Notations du poly (à reproduire telles quelles)',
        text: `- **Modèle** $(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$, $\\Theta\\subseteq\\mathbb{R}^d$ ; ensembles en lettres **sans empattement** ($\\mathsf{Z}$, $\\mathsf{X}$), tribus **calligraphiques** ($\\mathcal{Z}$, $\\mathcal{X}$). Modèle dominé : $\\mathbb{P}_\\theta=p_\\theta\\cdot\\mu$.
- **Estimateur** $T$ de $g(\\theta)$, $g:\\Theta\\to\\mathbb{R}^p$ : une statistique, évaluée en l’observation $Z$ ; $\\mathbb{E}_\\theta$, $\\mathrm{Var}_\\theta$ sous $\\mathbb{P}_\\theta$ (matrice de covariance si $T$ est vectoriel).
- **Biais** $b(\\theta,T):=\\mathbb{E}_\\theta[T(Z)]-g(\\theta)$ ; **perte** $\\ell(\\theta,a)$ ; **risque** $R_\\ell(\\theta,T)$ ; **risque quadratique** $R(\\theta,T)$ **sans indice**. L’ordre des arguments est (paramètre, estimateur).
- **Moyenne et variances empiriques** : $\\bar X_n=n^{-1}\\sum_iX_i$ ; $\\hat\\sigma_n^2:=\\frac1n\\sum_i(X_i-\\bar X_n)^2$ (non corrigée, EMV gaussien) ; $S_n^2:=\\frac1{n-1}\\sum_i(X_i-\\bar X_n)^2$ (corrigée).
- **Statistiques d’ordre** $X_{1:n}\\le\\dots\\le X_{n:n}$ (et non $X_{(i)}$ comme au ch.1) ; $X_{n:n}=\\max_iX_i$.
- **Log-vraisemblance d’une observation** $\\ell(\\theta,z):=\\log p_\\theta(z)$ (éq. (2)) — même lettre que la **perte** $\\ell(\\theta,a)$, le contexte distingue ; $\\ell_1(\\theta,x):=\\log q_\\theta(x)$ pour une observation d’un $n$-échantillon.
- **Score** $S(\\theta,z):=\\nabla_\\theta\\ell(\\theta,z)$ ; **hessienne** en $\\theta$ notée avec un H **droit** : $\\mathrm{H}_\\ell(\\theta,z)$, $\\mathrm{H}_p(\\theta,z)$ ; norme de Frobenius $\\lVert A\\rVert^2:=\\mathrm{Tr}(A^\\top A)$.
- **Information de Fisher** en lettre **ajourée** $\\mathbb{I}(\\theta)$ ; $\\mathbb{I}_1(\\theta)$ ou $\\mathbb{I}_{\\mathcal{M}}(\\theta)$ pour une observation, $\\mathbb{I}_{\\mathcal{M}^n}(\\theta)$ pour le $n$-échantillon.
- **Ordre de Loewner** : pour $A,B$ symétriques, $A\\ge B$ signifie $A-B$ positive.
- **Lois** : $\\mathcal{E}(\\theta)$ d’**intensité** $\\theta$ (densité $\\theta e^{-\\theta z}$, moyenne $1/\\theta$) — sauf dans l’Exercice 5 / PC3 Ex. 5 où $\\theta$ est la **moyenne** ; $\\mathcal{P}\\mathrm{oi}(\\lambda)$, $\\mathcal{B}\\mathrm{er}(\\theta)$, $\\mathrm{Bin}(n,\\theta)$, $\\mathcal{U}([0,\\theta])$, $\\mathcal{G}(\\theta)$ (rang du premier succès).`,
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-1',
        title: 'Exemple 1.1 — Estimation d’un paramètre de translation',
        source: 'Poly ch.3, Ex. 1.1, p. 9 (simulations et Intuition p. 9–10)',
        setup: '$p$ densité **symétrique** sur $\\mathbb{R}$ ($p(x)=p(-x)$), modèle $\\{\\mathbb{Q}_\\theta=q_\\theta\\cdot\\mathrm{Leb},\\ \\theta\\in\\mathbb{R}\\}$ avec $q_\\theta(x)=p(x-\\theta)$ : $X_i=\\theta+\\varepsilon_i$, $\\varepsilon_i$ i.i.d. de densité $p$. Trois estimateurs naturels du centre $\\theta$ : moyenne $\\hat\\theta_n^{(1)}=\\bar X_n$, médiane $\\hat\\theta_n^{(2)}=\\mathrm{med}(X_1,\\dots,X_n)$, demi-somme des extrêmes $\\hat\\theta_n^{(3)}=(\\min_iX_i+\\max_iX_i)/2$.',
        steps: [
          { text: 'Les deux premiers sont des $Z$-estimateurs (ch.2) associés à $\\psi(\\vartheta,x)=x-\\vartheta$ et $\\psi(\\vartheta,x)=\\mathrm{signe}(x-\\vartheta)$.', justification: 'Rappel ch.2, Ex. 1.6 : la moyenne annule $\\sum_i(X_i-\\vartheta)$, la médiane équilibre les signes.' },
          { text: 'Simulation : $m=1000$ échantillons de taille $n=100$ sous $\\mathbb{Q}_0$. Les trois estimateurs se concentrent autour de $0$ avec des dispersions **différentes**, et **l’ordre change** avec le bruit.', justification: 'Boxplots du poly (bruit gaussien puis de Laplace) ; à reproduire dans la visualisation ci-dessous.' },
          { text: 'Bruit gaussien centré réduit : $\\mathrm{Var}(\\bar X_n)=1/n$, médiane $\\approx\\pi/(2n)$ : la **moyenne** gagne.', justification: 'Variance asymptotique de la médiane $1/(4np(0)^2)$ avec $p(0)=1/\\sqrt{2\\pi}$ (admise ici, justifiée au chapitre 7).' },
          { text: 'Bruit de Laplace $p(x)=e^{-|x|}/2$ (variance 2) : moyenne $2/n$, médiane $1/(4np(0)^2)=1/n$ : la **médiane** gagne.', justification: 'Même formule avec $p(0)=1/2$.' },
        ],
        conclusion: 'Le meilleur estimateur **dépend du modèle**. Mais ces simulations ne sont **pas** une comparaison : une seule valeur de $\\theta$, une seule taille $n$. Il faut une mesure de qualité définie **pour tout** $\\theta$ : biais et risque. (Bruits uniforme et Cauchy : compléments, §10.)',
      },
      {
        kind: 'viz',
        id: 'ch3-s1-viz-mediane',
        vizId: 'ch3-mediane-moyenne',
        caption: 'Choisir le bruit : gaussien (la moyenne gagne), Laplace (la médiane gagne), uniforme (la demi-somme des extrêmes gagne, vitesse $n^{-2}$), Cauchy (seule la médiane est utilisable).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 2. Biais
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s2-biais',
    title: '2. Biais d’un estimateur',
    role: 'definitions',
    intro: 'Première mesure de qualité : si l’on répétait l’expérience un grand nombre de fois, l’estimateur tomberait-il **en moyenne** sur la bonne valeur ? C’est le **biais**, une fonction de $\\theta$.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch3-def-1-1',
        type: 'definition',
        label: 'Définition 1.1',
        title: 'Biais d’un estimateur',
        source: 'Poly ch.3, Déf. 1.1, p. 10',
        hypotheses: [
          '$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ modèle statistique paramétrique.',
          '$g:\\Theta\\to\\mathbb{R}^p$ mesurable ; $T$ estimateur de $g$.',
          '$\\mathbb{E}_\\theta[\\lVert T(Z)\\rVert]<\\infty$ pour tout $\\theta\\in\\Theta$ (sinon le biais n’existe pas).',
        ],
        statement: `Le **biais** de $T$ est la **fonction**

$$b:\\theta\\longmapsto b(\\theta,T):=\\mathbb{E}_\\theta[T(Z)]-g(\\theta).$$

$T$ est dit **sans biais** si $b(\\theta,T)=0$ **pour tout** $\\theta\\in\\Theta$, c’est-à-dire $\\mathbb{E}_\\theta[T(Z)]=g(\\theta)$ pour tout $\\theta$.`,
        intuition: 'Le biais mesure une **erreur systématique** : de combien l’estimateur se trompe en moyenne, pour chaque valeur possible du paramètre.',
        pitfalls: ['Le biais est une **fonction** de $\\theta$, pas un nombre ; un estimateur peut être sans biais en un point et biaisé ailleurs.', '« Sans biais » exige l’égalité **pour toutes** les valeurs de $\\theta$ (c’est ce qui donne la contrainte $\\sum_ia_i=1$ pour les estimateurs linéaires).'],
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-2',
        title: 'Exemple 1.2 — Bernoulli : la fréquence empirique est sans biais',
        source: 'Poly ch.3, Ex. 1.2, p. 10',
        setup: '$n$-échantillon de $\\{\\mathcal{B}\\mathrm{er}(\\theta),\\ \\theta\\in[0,1]\\}$ ; plus généralement tout modèle avec $\\mathbb{E}_\\theta[|X_1|]<\\infty$ et $g(\\theta)=\\mathbb{E}_\\theta[X_1]$.',
        steps: [
          { text: '$\\mathbb{E}_\\theta[\\bar X_n]=\\frac1n\\sum_{i=1}^n\\mathbb{E}_\\theta[X_i]$.', justification: 'Linéarité de l’espérance.' },
          { text: '$=\\mathbb{E}_\\theta[X_1]=\\theta$.', justification: 'Les $X_i$ ont même loi ; pour Bernoulli $\\mathbb{E}_\\theta[X_1]=\\theta$.' },
        ],
        conclusion: 'La moyenne empirique est l’estimateur sans biais « par défaut » de l’espérance.',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-3',
        title: 'Exemple 1.3 — Uniforme : le maximum est biaisé',
        source: 'Poly ch.3, Ex. 1.3, p. 10',
        setup: '$n$-échantillon de $\\{\\mathcal{U}([0,\\theta]),\\ \\theta\\in\\mathbb{R}_+^*\\}$ ; l’EMV est $X_{n:n}=\\max_iX_i$ (ch.2, Ex. 1.11).',
        steps: [
          { text: '$X_{n:n}\\le\\theta$ presque sûrement, et $X_{n:n}$ n’est pas constant.', justification: 'Chaque $X_i\\in[0,\\theta]$.' },
          { text: 'Donc $\\mathbb{E}_\\theta[X_{n:n}]<\\theta$ ; le calcul (Ex. 1.9) donne $\\mathbb{E}_\\theta[X_{n:n}]=\\frac n{n+1}\\theta$, biais $b(\\theta,X_{n:n})=-\\theta/(n+1)$.', justification: 'Une variable $\\le\\theta$ non dégénérée a une espérance $<\\theta$ ; calcul par la densité $nx^{n-1}/\\theta^n$.' },
        ],
        conclusion: 'L’EMV **sous-estime systématiquement** $\\theta$ ; $T_n^{(1)}=\\frac{n+1}nX_{n:n}$ corrige ce biais.',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-4',
        title: 'Exemple 1.4 — Variance empirique : normaliser par n ou par n − 1 ?',
        source: 'Poly ch.3, Ex. 1.4, p. 11',
        setup: '$n$-échantillon avec $\\mathbb{E}_\\theta[X_1^2]<\\infty$ ; cible $g(\\theta)=\\mathrm{Var}_\\theta(X_1)$. Montrer $\\mathbb{E}_\\theta[\\hat\\sigma_n^2]=\\frac{n-1}n\\mathrm{Var}_\\theta(X_1)$ et que $S_n^2$ est sans biais.',
        steps: [
          { text: 'Pour tout $a\\in\\mathbb{R}$ : $\\frac1n\\sum_i(X_i-\\bar X_n)^2=\\frac1n\\sum_i(X_i-a)^2-2(\\bar X_n-a)\\frac1n\\sum_i(X_i-a)+(\\bar X_n-a)^2=\\frac1n\\sum_i(X_i-a)^2-(\\bar X_n-a)^2$.', justification: 'Développer $((X_i-a)-(\\bar X_n-a))^2$ ; $\\frac1n\\sum_i(X_i-a)=\\bar X_n-a$ (König-Huygens « décentré »).' },
          { text: 'Avec $a=\\mathbb{E}_\\theta[X_1]$ : $\\mathbb{E}_\\theta[\\hat\\sigma_n^2]=\\frac1n\\sum_i\\mathrm{Var}_\\theta(X_i)-\\mathrm{Var}_\\theta(\\bar X_n)$.', justification: 'Linéarité ; $\\mathbb{E}_\\theta[\\bar X_n]=a$ donc $\\mathbb{E}_\\theta[(\\bar X_n-a)^2]=\\mathrm{Var}_\\theta(\\bar X_n)$.' },
          { text: '$=\\mathrm{Var}_\\theta(X_1)-\\frac{\\mathrm{Var}_\\theta(X_1)}n=\\frac{n-1}n\\mathrm{Var}_\\theta(X_1)$.', justification: '$\\mathrm{Var}_\\theta(\\bar X_n)=\\mathrm{Var}_\\theta(X_1)/n$ par **indépendance**.' },
          { text: '$S_n^2=\\frac n{n-1}\\hat\\sigma_n^2$ vérifie $\\mathbb{E}_\\theta[S_n^2]=\\mathrm{Var}_\\theta(X_1)$ : sans biais.', justification: 'Multiplier par $n/(n-1)$ (linéarité).' },
        ],
        conclusion: 'Biais de $\\hat\\sigma_n^2$ : $-\\mathrm{Var}_\\theta(X_1)/n$. On a « consommé » un degré de liberté en estimant la moyenne. Un estimateur naturel peut être biaisé sans que cela se voie ; le biais disparaît quand $n\\to\\infty$, pas à $n$ fixé.',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-5',
        title: 'Exemple 1.5 — Une fonction sans estimateur sans biais',
        source: 'Poly ch.3, Ex. 1.5, p. 11',
        setup: 'Modèle binomial $\\{\\mathrm{Bin}(n,\\theta),\\ \\theta\\in\\,]0,1]\\}$, $n$ connu, cible $g(\\theta)=1/\\theta$. Montrer qu’aucun estimateur n’est sans biais.',
        steps: [
          { text: 'Pour tout estimateur $T$ : $\\mathbb{E}_\\theta[T(Z)]=\\sum_{k=0}^n\\binom nkT(k)\\theta^k(1-\\theta)^{n-k}$ (éq. (1)).', justification: '$Z$ prend un nombre fini de valeurs : l’espérance est une somme finie.' },
          { text: 'C’est un polynôme en $\\theta$ de degré $\\le n$, donc borné sur le compact $[0,1]$.', justification: 'Somme finie de polynômes ; continuité sur un compact.' },
          { text: 'Or $1/\\theta\\to+\\infty$ quand $\\theta\\to0$ : l’égalité $\\mathbb{E}_\\theta[T(Z)]=1/\\theta$ pour tout $\\theta\\in\\,]0,1]$ est impossible.', justification: 'Une fonction bornée ne peut égaler une fonction non bornée.' },
        ],
        conclusion: '« Être sans biais » est une **contrainte**, pas une propriété gratuite. Plus généralement (Prop. 4.1, compléments) : $g$ admet un estimateur sans biais **ssi** $g$ est un polynôme de degré $\\le n$, et il est alors unique.',
      },
      {
        kind: 'text',
        id: 'ch3-s2-remarque-dispersion',
        title: 'Remarque (p. 11–12) — Le biais ne dit rien de la dispersion',
        text: '$X_1$ seul est un estimateur sans biais de l’espérance : « aussi bon en moyenne que $\\bar X_n$ et bien plus dispersé ». Le biais n’est qu’une des deux composantes de l’erreur ; l’autre est la **variance**. Leur combinaison est mesurée par le **risque quadratique** (§3). Justesse $\\ne$ précision : un estimateur biaisé peut être préférable à un estimateur sans biais.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 3. Perte, risque, biais-variance
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s3-risque',
    title: '3. Perte, risque et décomposition biais-variance',
    role: 'definitions',
    intro: 'On chiffre l’erreur commise en répondant $a$ quand la bonne réponse est $g(\\theta)$ par une **perte** $\\ell(\\theta,a)$, puis on la moyenne sous la loi des observations : c’est le **risque**. Pour la perte quadratique, il se décompose en variance + biais au carré.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch3-def-1-2',
        type: 'definition',
        label: 'Définition 1.2',
        title: 'Risque d’un estimateur',
        source: 'Poly ch.3, Déf. 1.2, p. 12',
        hypotheses: [
          '$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ paramétrique, $\\Theta\\subseteq\\mathbb{R}^d$.',
          '$T:(\\mathsf{Z},\\mathcal{Z})\\to(\\mathbb{R}^p,\\mathcal{B}(\\mathbb{R}^p))$ estimateur de $g:\\theta\\mapsto g(\\theta)$.',
          '$\\ell:\\Theta\\times\\mathbb{R}^p\\to\\mathbb{R}_+$ **fonction de perte**, mesurable en sa seconde variable.',
        ],
        statement: `$$R_\\ell(\\theta,T):=\\mathbb{E}_\\theta\\big[\\ell(\\theta,T(Z))\\big],\\qquad\\theta\\in\\Theta.$$

Pertes usuelles : $\\ell(\\theta,a):=W(g(\\theta),a)$, avec $W:\\mathbb{R}^p\\times\\mathbb{R}^p\\to\\mathbb{R}_+$ une distance entre la valeur à estimer et l’action choisie.`,
        intuition: 'La perte est le coût d’une erreur ; le risque est la perte moyenne. Bien défini dans $[0,+\\infty]$ car $\\ell\\ge0$. C’est un cas particulier du risque d’une **règle de décision** (compléments, Déf. 4.1), qui contient aussi les tests.',
        pitfalls: ['Le risque est une **fonction de $\\theta$**, pas un nombre réel (question courte 2 du poly : « Faux »).'],
      },
      {
        kind: 'theorem',
        id: 'ch3-ex-1-6',
        type: 'exemple',
        label: 'Exemple 1.6',
        title: 'Pertes quadratique et absolue',
        source: 'Poly ch.3, Ex. 1.6 et Remarque, p. 12',
        hypotheses: ['Estimation de $g:\\Theta\\to\\mathbb{R}^p$.'],
        statement: `- Perte **quadratique** : $\\ell_2(\\theta,a):=\\lVert a-g(\\theta)\\rVert_2^2=\\sum_{i=1}^p\\big(a^{(i)}-g(\\theta)^{(i)}\\big)^2$.
- Perte **absolue** : $\\ell_1(\\theta,a):=\\lVert a-g(\\theta)\\rVert_1=\\sum_{i=1}^p\\big|a^{(i)}-g(\\theta)^{(i)}\\big|$.`,
        intuition: 'La quadratique pénalise beaucoup les grands écarts (sensible aux valeurs extrêmes), l’absolue proportionnellement. Une même paire d’estimateurs peut être classée dans un sens pour l’une et dans l’autre sens pour l’autre : « quel est le meilleur estimateur ? » n’a de sens **qu’une fois la perte fixée**. **Dans tout le chapitre, sauf mention contraire, la perte est quadratique.**',
      },
      {
        kind: 'theorem',
        id: 'ch3-def-1-3',
        type: 'definition',
        label: 'Définition 1.3',
        title: 'Risque quadratique (erreur quadratique moyenne)',
        source: 'Poly ch.3, Déf. 1.3, p. 12',
        hypotheses: ['$T$ estimateur de $g:\\Theta\\to\\mathbb{R}$ avec $\\mathbb{E}_\\theta[T(Z)^2]<\\infty$ pour tout $\\theta\\in\\Theta$.'],
        statement: `$$R(\\theta,T):=R_{\\ell_2}(\\theta,T)=\\mathbb{E}_\\theta\\big[(T(Z)-g(\\theta))^2\\big]$$

est le **risque quadratique**, ou **erreur quadratique moyenne** (EQM), de $T$ ; noté $R$ **sans indice** dans toute la suite.`,
        intuition: 'Comme le biais, c’est une fonction du paramètre.',
      },
      {
        kind: 'theorem',
        id: 'ch3-prop-1-1',
        type: 'proposition',
        label: 'Proposition 1.1',
        title: 'Décomposition biais-variance',
        source: 'Poly ch.3, Prop. 1.1, p. 13',
        hypotheses: ['$g$ à valeurs réelles.', '$T$ de carré intégrable sous chaque $\\mathbb{P}_\\theta$ (hypothèses de la Déf. 1.3).'],
        statement: `Pour tout $\\theta\\in\\Theta$,

$$R(\\theta,T)=\\mathrm{Var}_\\theta(T(Z))+\\big(b(\\theta,T)\\big)^2,\\qquad b(\\theta,T)=\\mathbb{E}_\\theta[T(Z)]-g(\\theta).$$`,
        intuition: 'La variance mesure l’**instabilité** d’un échantillon à l’autre, le biais le **décalage systématique**. Pour un estimateur sans biais, risque = variance : minimiser le risque parmi les sans biais revient à minimiser la variance. Rien n’oblige à annuler le biais : un peu de biais contre beaucoup de variance peut faire baisser le risque.',
        proof: [
          { text: '$T(Z)-g(\\theta)=\\big(T(Z)-\\mathbb{E}_\\theta[T(Z)]\\big)+\\big(\\mathbb{E}_\\theta[T(Z)]-g(\\theta)\\big)$.', justification: 'Insérer $\\pm\\mathbb{E}_\\theta[T(Z)]$ (bien défini : $T$ de carré intégrable donc intégrable).' },
          { text: '$R(\\theta,T)=\\mathbb{E}_\\theta\\big[(T(Z)-\\mathbb{E}_\\theta[T(Z)])^2\\big]+\\big(\\mathbb{E}_\\theta[T(Z)]-g(\\theta)\\big)^2+2\\big(\\mathbb{E}_\\theta[T(Z)]-g(\\theta)\\big)\\,\\mathbb{E}_\\theta\\big[T(Z)-\\mathbb{E}_\\theta[T(Z)]\\big]$.', justification: 'Développer le carré et prendre l’espérance (linéarité).' },
          { text: 'Le double produit est nul.', justification: '$\\mathbb{E}_\\theta[T(Z)]-g(\\theta)$ est un **nombre** (il sort de l’espérance) et $\\mathbb{E}_\\theta[T(Z)-\\mathbb{E}_\\theta[T(Z)]]=0$.' },
          { text: 'On reconnaît $\\mathrm{Var}_\\theta(T(Z))+b(\\theta,T)^2$.', justification: 'Définitions de la variance et du biais.' },
        ],
        pitfalls: ['Ne pas oublier le **carré** du biais.', 'Ne pas confondre $\\mathrm{Var}_\\theta(T)$ et $R(\\theta,T)$ quand $T$ est biaisé (EMV $1/\\bar X_n$ de l’exponentielle, $\\hat\\sigma_n^2$…).', 'Version vectorielle (matricielle) : Prop. 2.3 des outils, la version scalaire s’en déduit par la trace.'],
      },
      {
        kind: 'text',
        id: 'ch3-s3-retrecissement',
        title: 'Illustration (p. 13) — Estimateur à rétrécissement T_γ = γT',
        text: `Multiplier un estimateur sans biais $T$ par $\\gamma\\in[0,1]$ le « tire vers zéro » : source de biais, mais la variance est multipliée par $\\gamma^2$. Avec $\\upsilon(\\theta):=\\mathrm{Var}_\\theta(T(Z))$ (éq. (17), compléments) :

$$R(\\theta,T_\\gamma)=(\\gamma-1)^2\\{g(\\theta)\\}^2+\\gamma^2\\upsilon(\\theta).$$

Biais$^2$ et variance varient en sens opposés avec $\\gamma$ ; le $\\gamma$ optimal dépend en général de $\\theta$, inconnu (seuil $\\gamma_{\\min}(\\theta)$ des compléments). La visualisation ci-dessous montre la décomposition **sur simulations répétées**.`,
      },
      {
        kind: 'viz',
        id: 'ch3-s3-viz-bv',
        vizId: 'ch3-biais-variance',
        caption: 'Choisir la famille ($c\\sum_i(X_i-\\bar X_n)^2$ en gaussien, $aX_{n:n}$ en uniforme, $\\gamma\\bar X_n$) et le coefficient : l’histogramme montre biais et dispersion, les barres $\\text{biais}^2+\\text{variance}=$ risque calculés sur $2000$ répétitions.',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-7',
        title: 'Exemple 1.7 — Poisson : risque de la moyenne empirique',
        source: 'Poly ch.3, Ex. 1.7, p. 13–14',
        setup: '$n$-échantillon de $\\{\\mathcal{P}\\mathrm{oi}(\\lambda),\\ \\lambda\\in\\mathbb{R}_+^*\\}$, EMV $\\hat\\lambda_n=\\bar X_n$ (ch.2).',
        steps: [
          { text: '$\\mathbb{E}_\\lambda[\\hat\\lambda_n]=\\lambda$ : sans biais.', justification: 'Linéarité et $\\mathbb{E}_\\lambda[X_1]=\\lambda$.' },
          { text: '$R(\\lambda,\\hat\\lambda_n)=\\mathrm{Var}_\\lambda(\\bar X_n)$.', justification: 'Prop. 1.1 avec biais nul.' },
          { text: '$=\\mathrm{Var}_\\lambda(X_1)/n=\\lambda/n$.', justification: 'Indépendance (variance d’une moyenne i.i.d.) puis $\\mathrm{Var}_\\lambda(X_1)=\\lambda$.' },
        ],
        conclusion: 'Risque en $n^{-1}$, croissant en $\\lambda$ : un grand paramètre est plus difficile à estimer. On verra (Ex. 1.18) que $\\lambda/n$ est exactement la borne de Cramér-Rao.',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-8',
        title: 'Exemple 1.8 — Gaussien : l’estimateur biaisé σ̂² bat S² pour tout θ',
        source: 'Poly ch.3, Ex. 1.8, p. 14',
        setup: '$n$-échantillon de $\\{\\mathcal{N}(\\mu,\\sigma^2),\\ \\theta=(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*\\}$, $n\\ge2$, cible $g(\\theta)=\\sigma^2$. Comparer $R(\\theta,S_n^2)$ et $R(\\theta,\\hat\\sigma_n^2)$.',
        steps: [
          { text: '$(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$, de variance $2(n-1)$ ; donc $\\mathrm{Var}_\\theta(S_n^2)=\\frac{\\sigma^4}{(n-1)^2}\\cdot2(n-1)=\\frac{2\\sigma^4}{n-1}$.', justification: 'Théorème de Gosset (ch.1, Thm 1.3) : c’est ici que sert l’hypothèse gaussienne.' },
          { text: '$R(\\theta,S_n^2)=\\frac{2\\sigma^4}{n-1}$.', justification: '$S_n^2$ sans biais (Ex. 1.4) + Prop. 1.1.' },
          { text: '$\\hat\\sigma_n^2=\\frac{n-1}nS_n^2$ : $\\mathbb{E}_\\theta[\\hat\\sigma_n^2]=\\frac{n-1}n\\sigma^2$ et $\\mathrm{Var}_\\theta(\\hat\\sigma_n^2)=\\frac{(n-1)^2}{n^2}\\cdot\\frac{2\\sigma^4}{n-1}=\\frac{2(n-1)\\sigma^4}{n^2}$.', justification: 'Linéarité de l’espérance ; $\\mathrm{Var}(cY)=c^2\\mathrm{Var}(Y)$.' },
          { text: '$R(\\theta,\\hat\\sigma_n^2)=\\big(\\frac{n-1}n\\sigma^2-\\sigma^2\\big)^2+\\frac{2(n-1)\\sigma^4}{n^2}=\\frac{\\sigma^4}{n^2}+\\frac{2(n-1)\\sigma^4}{n^2}=\\frac{(2n-1)\\sigma^4}{n^2}$.', justification: 'Prop. 1.1 (biais $-\\sigma^2/n$).' },
          { text: '$R(\\theta,S_n^2)-R(\\theta,\\hat\\sigma_n^2)=\\frac{\\sigma^4[2n^2-(2n-1)(n-1)]}{(n-1)n^2}=\\frac{(3n-1)\\sigma^4}{(n-1)n^2}>0$.', justification: 'Réduction au même dénominateur : $2n^2-(2n^2-3n+1)=3n-1$.' },
        ],
        conclusion: 'Pour **tout** $\\theta$, l’estimateur biaisé $\\hat\\sigma_n^2$ a un risque strictement plus petit : le carré du biais ($\\sigma^4/n^2$) est plus que compensé par la baisse de variance. $S_n^2$ n’est pas le meilleur ; il est même **inadmissible** (§4). Repris à l’Examen 2025 Ex. 2 Q4.',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-9',
        title: 'Exemple 1.9 — Support d’une loi uniforme : la famille aX(n:n)',
        source: 'Poly ch.3, Ex. 1.9, p. 14–15 ; PC3 Ex. 1 Q3–Q5',
        setup: '$n$-échantillon de $\\{\\mathcal{U}([0,\\theta]),\\ \\theta\\in\\mathbb{R}_+^*\\}$. Calculer la loi et les moments de $X_{n:n}$, puis le risque de $aX_{n:n}$ pour $a\\in\\mathbb{R}$ et le $a$ optimal.',
        steps: [
          { text: '$\\mathbb{P}_\\theta(X_{n:n}\\le x)=\\mathbb{P}_\\theta\\big(\\bigcap_i\\{X_i\\le x\\}\\big)=(x/\\theta)^n$ pour $x\\in[0,\\theta]$ ; densité $nx^{n-1}/\\theta^n$ sur $[0,\\theta]$.', justification: 'Le max est $\\le x$ ssi tous les $X_i$ le sont ; **indépendance** et même loi ; dériver la fonction de répartition.' },
          { text: '$\\mathbb{E}_\\theta[X_{n:n}]=\\int_0^\\theta x\\,\\frac{nx^{n-1}}{\\theta^n}\\,\\mathrm{d}x=\\frac n{n+1}\\theta$ ; $\\mathbb{E}_\\theta[X_{n:n}^2]=\\frac{n\\theta^2}{n+2}$.', justification: 'Théorème de transfert, intégrales de puissances.' },
          { text: '$\\mathbb{E}_\\theta[(aX_{n:n}-\\theta)^2]=a^2\\frac{n\\theta^2}{n+2}-2a\\theta\\frac{n\\theta}{n+1}+\\theta^2=\\theta^2\\Big\\{\\frac{na^2}{n+2}-\\frac{2an}{n+1}+1\\Big\\}$.', justification: 'Développer le carré, linéarité, moments précédents.' },
          { text: 'Trinôme en $a$ de coefficient dominant $n/(n+2)>0$ : minimum en $a_n=\\frac{2n/(n+1)}{2n/(n+2)}=\\frac{n+2}{n+1}$, **quel que soit $\\theta$**.', justification: 'Sommet d’une parabole : $a=-B/(2A)$.' },
          { text: 'Valeur minimale : $\\theta^2\\Big(1-\\frac{n(n+2)}{(n+1)^2}\\Big)=\\frac{\\theta^2}{(n+1)^2}$. Pour $a=\\frac{n+1}n$ (sans biais) : $\\frac{\\theta^2}{n(n+2)}$ ; pour $a=1$ (EMV) : $\\frac{2\\theta^2}{(n+1)(n+2)}$.', justification: 'Substitution dans le trinôme ; $(n+1)^2-n(n+2)=1$.' },
        ],
        conclusion: 'L’estimateur sans biais $T_n^{(1)}=\\frac{n+1}nX_{n:n}$ n’est **pas** le meilleur de la famille : il est inadmissible. Le minimiseur ne dépend pas de $\\theta$ : c’est ce qui rend la comparaison **uniforme**. Vitesse $n^{-2}$ (et non $n^{-1}$) due à la **non-régularité** du modèle (Ex. 1.16).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 4. Admissibilité, restriction de la classe
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s4-admissibilite',
    title: '4. Comparer des fonctions de risque : admissibilité, restriction de la classe',
    role: 'definitions',
    intro: 'Comparer deux estimateurs, c’est comparer deux **fonctions** $\\theta\\mapsto R(\\theta,T)$ : quand elles se croisent, aucun n’est meilleur. On en tire un critère minimal (l’admissibilité), le constat qu’aucun estimateur n’est uniformément optimal, et la nécessité de **restreindre la classe**.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch3-def-ordre',
        type: 'definition',
        label: 'Définition (§1.5, non numérotée)',
        title: 'Ordre partiel, uniformément meilleur, uniformément optimal',
        source: 'Poly ch.3, §1.5, p. 15',
        hypotheses: ['Une perte $\\ell$ fixée.'],
        statement: `$T$ est **préférable** à $T'$, ou **uniformément meilleur** que $T'$ pour la perte $\\ell$, si

$$R_\\ell(\\theta,T)\\le R_\\ell(\\theta,T')\\quad\\text{pour tout }\\theta\\in\\Theta.$$

$T$ est **uniformément optimal** pour $\\ell$ s’il est uniformément meilleur que **tout** autre estimateur. Deux estimateurs dont les fonctions de risque se croisent ne sont pas comparables : l’ordre est **partiel**.`,
        intuition: 'Comparer des estimateurs, c’est comparer des fonctions — d’où un ordre seulement partiel.',
      },
      {
        kind: 'theorem',
        id: 'ch3-def-1-4',
        type: 'definition',
        label: 'Définition 1.4',
        title: 'Admissibilité',
        source: 'Poly ch.3, Déf. 1.4, p. 15',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ modèle statistique, $\\ell$ perte.', '$T$ estimateur de $g:\\Theta\\to\\mathbb{R}^p$.'],
        statement: `$T$ est **inadmissible** (pour $\\ell$) s’il existe un estimateur $T^*$ tel que

$$R_\\ell(\\theta,T^*)\\le R_\\ell(\\theta,T)\\ \\text{ pour tout }\\theta\\in\\Theta,\\qquad R_\\ell(\\theta,T^*)<R_\\ell(\\theta,T)\\ \\text{ pour au moins un }\\theta\\in\\Theta.$$

Un estimateur non inadmissible est **admissible** : c’est un élément maximal pour l’ordre partiel induit par le risque.`,
        intuition: 'Analogie de la promotion : être *admissible* = aucun élève n’a une meilleure note que moi **dans toutes les matières** (facile : il suffit d’être le meilleur dans une matière) ; être *uniformément optimal* = être le meilleur dans **toutes** les matières (en général hors d’atteinte). Un estimateur inadmissible n’a aucune raison d’être gardé.',
        pitfalls: ['Admissible $\\ne$ bon (Ex. 1.10).', 'Pour montrer l’inadmissibilité, il faut **exhiber** un $T^*$ et comparer les risques **pour tout** $\\theta$ (pas en un point).', 'Applications : $S_n^2$ inadmissible en gaussien (Ex. 1.8) ; $T_n^{(1)}$ inadmissible en uniforme (Ex. 1.9) ; $T_{1,n}=\\bar X_n^2$ inadmissible pour $\\mu^2$ dès $n\\ge4$ (CC 2022 Ex. 2 Q4).'],
      },
      {
        kind: 'viz',
        id: 'ch3-s4-viz-adm',
        vizId: 'ch3-admissibilite',
        caption: 'Courbes $\\theta\\mapsto R(\\theta,T)$ : en uniforme elles sont emboîtées (domination stricte, estimateurs inadmissibles) ; en Bernoulli elles se croisent (estimateur constant, $\\bar X_n$, $(n\\bar X_n+1)/(n+2)$ incomparables).',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-10',
        title: 'Exemple 1.10 — Un estimateur admissible mais indésirable',
        source: 'Poly ch.3, Ex. 1.10, p. 16',
        setup: '$n$-échantillon de Bernoulli $\\{\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n},\\ \\theta\\in[0,1]\\}$, risque quadratique, estimation de $\\theta$. On fixe $\\vartheta\\in\\,]0,1[$ et l’estimateur constant $\\hat\\theta_\\vartheta:Z\\mapsto\\vartheta$, de risque $R(\\theta,\\hat\\theta_\\vartheta)=(\\theta-\\vartheta)^2$. Montrer qu’il est admissible et qu’aucun estimateur n’est uniformément optimal.',
        steps: [
          { text: 'Par l’absurde : s’il existait $T$ avec $R(\\theta,T)\\le(\\theta-\\vartheta)^2$ pour tout $\\theta$, on aurait $R(\\vartheta,T)=0$.', justification: 'Évaluer l’inégalité en $\\theta=\\vartheta$ ; un risque est $\\ge0$.' },
          { text: '$\\mathbb{E}_\\vartheta[(T(Z)-\\vartheta)^2]=0$ donc $T(Z)=\\vartheta$ $\\mathbb{P}_\\vartheta$-p.s.', justification: 'Une variable positive d’espérance nulle est nulle p.s.' },
          { text: 'Comme $\\vartheta\\in\\,]0,1[$, $\\mathbb{P}_\\vartheta$ charge **tous** les points de $\\{0,1\\}^n$ : $T(z)=\\vartheta$ pour tout $z$, i.e. $T=\\hat\\theta_\\vartheta$.', justification: 'Support plein : $\\mathbb{P}_\\vartheta(\\{z\\})=\\vartheta^{\\sum z_i}(1-\\vartheta)^{n-\\sum z_i}>0$.' },
          { text: 'L’inégalité stricte requise (Déf. 1.4) n’a alors lieu en aucun point : contradiction, $\\hat\\theta_\\vartheta$ est admissible.', justification: 'Deux estimateurs égaux ont le même risque partout.' },
          { text: 'Si $T^\\star$ était uniformément optimal : pour tout $\\vartheta\\in\\,]0,1[$, $R(\\vartheta,T^\\star)\\le R(\\vartheta,\\hat\\theta_\\vartheta)=0$, donc $T^\\star\\equiv\\vartheta$ pour **toute** valeur de $\\vartheta$ : impossible.', justification: 'Étapes 2–3 appliquées à chaque $\\vartheta$.' },
        ],
        conclusion: 'L’estimateur constant « gagne » en un point et ignore les données : l’admissibilité n’apprend presque rien, et **il n’existe pas d’estimateur uniformément optimal** (résultat qui s’étend à d’autres pertes et modèles, affirmé sans preuve).',
      },
      {
        kind: 'text',
        id: 'ch3-s4-restreindre',
        title: 'Remarque (§1.6) — Restreindre la classe des estimateurs',
        text: `Puisqu’aucun estimateur n’est uniformément optimal, deux voies :

- **changer de critère** en agrégeant le risque en un nombre : **minimax** (pire cas) ou **bayésien** (moyenne selon une loi a priori) — définis dans les compléments (§10), non développés ;
- **restreindre la classe** (voie du chapitre), assez petite pour que l’optimum existe, assez grande pour qu’il soit intéressant. Trois restrictions usuelles :
  1. **absence de biais** (retenue dans la suite ; elle exclut l’estimateur constant) ;
  2. **invariance** : en translation, $T(x_1+c,\\dots,x_n+c)=c+T(x_1,\\dots,x_n)$ ; le risque ne dépend alors plus du paramètre (compléments) ;
  3. **linéarité** : $T(X_1,\\dots,X_n)=\\sum_ia_iX_i+b$.`,
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-11',
        title: 'Exemple 1.11 — La moyenne empirique est le meilleur estimateur linéaire sans biais',
        source: 'Poly ch.3, Ex. 1.11, p. 17 ; PC3 Ex. 4 Q1',
        setup: '$n$-échantillon avec $\\mathbb{E}_\\theta[X_1^2]<\\infty$, cible $g(\\theta)=\\mathbb{E}_\\theta[X_1]$, $\\sigma^2(\\theta):=\\mathrm{Var}_\\theta(X_1)$. Classe : $\\hat\\mu_\\alpha:=\\sum_i\\alpha_iX_i$ avec $\\sum_i\\alpha_i=1$.',
        steps: [
          { text: '$\\mathbb{E}_\\theta[\\hat\\mu_\\alpha]=\\big(\\sum_i\\alpha_i\\big)g(\\theta)=g(\\theta)$ : sans biais.', justification: 'Linéarité ; contrainte $\\sum_i\\alpha_i=1$.' },
          { text: '$R(\\theta,\\hat\\mu_\\alpha)=\\mathrm{Var}_\\theta(\\hat\\mu_\\alpha)=\\sigma^2(\\theta)\\sum_i\\alpha_i^2$.', justification: 'Prop. 1.1 (biais nul) ; **indépendance** : variance d’une somme = somme des variances.' },
          { text: '$\\frac1n\\sum_i\\alpha_i^2\\ge\\big(\\frac1n\\sum_i\\alpha_i\\big)^2=\\frac1{n^2}$, égalité ssi $\\alpha_1=\\dots=\\alpha_n$.', justification: 'Cauchy-Schwarz (Prop. 2.1) avec le vecteur $\\mathbf{1}$, ou stricte convexité du carré.' },
          { text: 'Donc $\\sum_i\\alpha_i^2\\ge1/n$, égalité ssi $\\alpha_i=1/n$ : $\\bar X_n$ minimise le risque **simultanément pour tout** $\\theta$.', justification: 'Multiplier par $n$ ; la contrainte fixe la valeur commune.' },
          { text: 'Pour $\\alpha\\ne(1/n,\\dots,1/n)$ : risque $\\ge$ celui de $\\bar X_n$ partout et $>$ là où $\\sigma^2(\\theta)>0$ : $\\hat\\mu_\\alpha$ est inadmissible.', justification: 'Déf. 1.4.' },
        ],
        conclusion: 'Premier résultat d’optimalité du chapitre, **dans la classe linéaire sans biais seulement**. Sans la contrainte de biais, on fait mieux (PC3 Ex. 4 Q2 : poids $\\frac{\\theta^2}{\\sigma^2+n\\theta^2}$, qui dépendent de $\\theta$).',
      },
      {
        kind: 'theorem',
        id: 'ch3-def-1-5',
        type: 'definition',
        label: 'Définition 1.5',
        title: 'Estimateur sans biais de variance minimale (E.S.B.V.M.)',
        source: 'Poly ch.3, Déf. 1.5, p. 17',
        hypotheses: ['$g:\\Theta\\to\\mathbb{R}$ ; $T$, $T\'$ estimateurs **sans biais** de $g(\\theta)$, de carré intégrable.'],
        statement: `- $T$ est **uniformément meilleur** que $T'$ si $\\mathrm{Var}_\\theta(T(Z))\\le\\mathrm{Var}_\\theta(T'(Z))$ pour tout $\\theta\\in\\Theta$ ;
- $T$ est un **E.S.B.V.M.** s’il est uniformément meilleur que **tout** estimateur sans biais de $g(\\theta)$.`,
        intuition: 'Cohérent avec le risque quadratique (biais-variance : pour un sans biais, risque = variance). Stratégie du chapitre, **indirecte** : établir une **borne inférieure** sur la variance de tout estimateur sans biais ; un estimateur sans biais qui l’atteint est automatiquement E.S.B.V.M.',
        pitfalls: ['Un E.S.B.V.M. peut avoir un risque quadratique supérieur à celui d’un estimateur biaisé (Ex. 1.8 ; PC3 Ex. 5 Q6 : $\\frac1{n+1}\\sum_iX_i$ bat $\\bar X_n$).'],
      },
      {
        kind: 'text',
        id: 'ch3-s4-resume',
        title: 'Résumé de la première moitié (encadré p. 18)',
        text: 'Optimalité → perte → risque (une **fonction**) → comparer des fonctions n’est pas immédiat → **admissibilité** (prérequis minimal) → des estimateurs triviaux sont admissibles, aucun n’est uniformément optimal → restreindre la classe : on retient les **sans biais**, et l’on cherche une borne inférieure de leur variance.',
      },
    ],
  },
]
