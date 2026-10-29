import type { CourseSection } from '../types'

/** Sections 1 à 4 du cours : intuition et notations, méthode des moments, Z-estimateurs, maximum de vraisemblance. */
export const coursePart1: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 1. Intuition et notations
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s1-intuition',
    title: '1. Intuition et notations : construire un estimateur n’est pas l’évaluer',
    role: 'intuition',
    intro:
      'Au chapitre 1, les estimateurs ont été trouvés **au cas par cas** (proportion empirique pour Bernoulli, correction affine pour les réponses randomisées, droite des moindres carrés pour la tendance de température), en remarquant que le paramètre s’exprimait à l’aide d’une moyenne approchable par les observations. Ce chapitre présente **deux procédés systématiques** : la méthode des moments et le maximum de vraisemblance. Aucun des deux ne garantit à lui seul que l’estimateur obtenu est bon : *construire* un candidat et *évaluer* sa qualité (biais, erreur quadratique, consistance) sont deux étapes distinctes.',
    blocks: [
      {
        kind: 'text',
        id: 'ch2-s1-pourquoi',
        title: 'Deux procédés, deux généralisations (Poly ch.2, introduction p. 7)',
        text: `1. **Méthode des moments** : égaler des moyennes théoriques (fonctions du paramètre) à leurs contreparties empiriques. Généralisation : les **Z-estimateurs** (zéros d’une fonction aléatoire).
2. **Maximum de vraisemblance** : retenir la valeur du paramètre qui maximise la densité des observations vue comme fonction du paramètre. Généralisation : les **M-estimateurs** (maxima d’une fonction aléatoire).

Les deux méthodes **ne coïncident pas en général** (elles coïncident pour les familles exponentielles : PC2 Ex. 3). L’étude du maximum de vraisemblance conduit à la **divergence de Kullback-Leibler**, qui explique pourquoi maximiser la vraisemblance mène vers la vraie valeur.

**À l’examen** : ce chapitre est le *point d’entrée* de chaque problème d’estimation (Examen 2025 Ex. 2 Q2 « EMV », Q9(a) « estimateur des moments » ; CC 2022 Ex. 4 Q1 « EMV de la régression ») : peu de points propres, mais une erreur ici se propage à toutes les questions suivantes.`,
      },
      {
        kind: 'text',
        id: 'ch2-s1-notations',
        title: 'Notations du poly (à reproduire telles quelles)',
        text: `- **Modèle** $(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\})$ ; pour un $n$-échantillon, modèle d’**une** observation $(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta,\\theta\\in\\Theta\\})$ et $\\mathbb{P}_\\theta:=\\mathbb{Q}_\\theta^{\\otimes n}$ ; $q_\\theta$ densité de $\\mathbb{Q}_\\theta$ par rapport à la mesure dominante $\\mu$ ($\\mathrm{Leb}$ ou mesure de comptage).
- **Trois lettres pour le paramètre** : $\\vartheta$ (« vartheta ») est la **variable libre**, inconnue des équations et argument de $e(\\cdot)$, $\\mathrm{L}_n(\\cdot)$, $\\ell_n(\\cdot)$, $M_n(\\cdot)$ ; $\\theta$ est la valeur sous laquelle on calcule ($\\mathbb{E}_\\theta$, $\\mathbb{P}_\\theta$) ; à partir du §1.4, $\\theta^\\star$ désigne la **vraie valeur** (paramètre « hypothèse »).
- $g:\\Theta\\to\\mathbb{R}^q$ fonction du paramètre à estimer ; $T$, $T(Z)$ estimateur ponctuel ; $\\hat p_n$, $\\hat\\theta_n$, $\\hat\\lambda_n$ estimateurs construits sur $n$ observations ; $\\hat\\theta_{n,1}$, $\\hat\\theta_{n,2}$ deux estimateurs des moments concurrents.
- **Moments** : $e(\\theta):=\\mathbb{E}_\\theta[T(X_1)]$ moment exact associé à $T$ ; $\\frac1n\\sum_{i=1}^nT(X_i)$ moment empirique ; $\\bar X_n=\\frac1n\\sum_iX_i$, $\\overline{X^2}_n=\\frac1n\\sum_iX_i^2$, $V_n:=\\overline{X^2}_n-\\bar X_n^2$ (variance empirique **non corrigée**) ; $\\sigma^2(\\theta)=\\mathrm{Var}_\\theta(T(X_1))$.
- **Vraisemblance** $\\mathrm{L}_n(\\vartheta,X_1,\\dots,X_n)$ (L **droit**), **log-vraisemblance normalisée** $\\ell_n(\\vartheta)=\\frac1n\\log\\mathrm{L}_n(\\vartheta)$ ; $\\log$ = logarithme népérien (le poly évite « ln » pour ne pas confondre avec $\\mathrm{L}_n$, $\\ell_n$) ; EMV $\\hat\\theta_n^{\\mathrm{MV}}$ ; racine de l’équation de vraisemblance $\\hat\\theta_n^{\\mathrm{rv}}$ ; $\\mathring\\Theta$ intérieur de $\\Theta$ ; $\\nabla_\\vartheta$ gradient.
- **Z- et M-estimateurs** : $\\boldsymbol\\psi=(\\psi_1,\\dots,\\psi_d)^\\top$ fonction d’estimation, $\\Psi_n(\\vartheta)=\\frac1n\\sum_i\\boldsymbol\\psi(\\vartheta,X_i)$ ; $m(\\vartheta,x)$ critère, $M_n(\\vartheta)=\\frac1n\\sum_im(\\vartheta,X_i)$, $M_{\\theta^\\star}(\\vartheta)=\\mathbb{E}_{\\theta^\\star}[m(\\vartheta,X_1)]$.
- **Statistiques d’ordre** $X_{1:n}\\le\\dots\\le X_{n:n}$ (notées $X_{(k)}$ au ch.1) ; médiane empirique $\\mathrm{med}(X_1,\\dots,X_n)$ ; $\\mathrm{signe}(z)\\in\\{-1,0,1\\}$ avec $\\mathrm{signe}(0)=0$.
- **Loi exponentielle** $\\mathcal{E}(\\theta)$ paramétrée par l’**intensité** : densité $\\theta\\mathrm{e}^{-\\theta x}\\mathbb{1}_{\\mathbb{R}_+}(x)$, $\\mathbb{E}_\\theta[X_1^k]=k!/\\theta^k$ (moyenne $1/\\theta$, variance $1/\\theta^2$). Le poly écrit la constante d’Euler $\\mathrm{e}$ droite.
- **Kullback-Leibler** $\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1)$ ; $\\mathrm{Ent}(\\mathbb{Q}_{\\theta^\\star})$ = **opposé** de l’entropie de Shannon.
- **Exercices (PC2)** : vecteurs colonnes, transposée $^T$ ; $\\mathbf{Y}$, $\\mathbf{X}=[\\mathbf{1}\\ \\underline{\\mathbf{x}}]$ ($\\underline{\\mathbf{x}}$ **souligné**), $\\beta$ ; $p_\\theta\\cdot\\mathrm{dLeb}^{\\otimes n}$ loi de densité $p_\\theta$ ; $P$ projecteur orthogonal sur $\\mathrm{Im}(\\mathbf{X})$ ; $N_a$ comptage ; $q_\\eta(x)=h(x)\\exp(\\eta T(x)-A(\\eta))$, $\\Xi$ (famille exponentielle).`,
      },
      {
        kind: 'theorem',
        id: 'ch2-def-1-1',
        type: 'definition',
        label: 'Définition 1.1',
        title: 'Estimateur ponctuel',
        source: 'Poly ch.2, Déf. 1.1, p. 8',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\})$ modèle statistique paramétrique.', '$g:\\Theta\\to\\mathbb{R}^q$ une fonction du paramètre.'],
        statement: `Un **estimateur ponctuel** $T$ de $g(\\theta)$ est une statistique à valeurs dans un espace mesurable contenant $g(\\Theta)$, typiquement $(\\mathbb{R}^q,\\mathcal{B}(\\mathbb{R}^q))$ : une application mesurable

$$T:(\\mathsf{Z},\\mathcal{Z})\\to(\\mathbb{R}^q,\\mathcal{B}(\\mathbb{R}^q)).$$

*Note 1 du poly :* on impose parfois à un estimateur de $g(\\theta)$ de prendre ses valeurs dans $g(\\Theta)$ lui-même ; cette restriction apporte peu et exclut des estimateurs admissibles dans la théorie classique : **le poly ne la retient pas**.`,
        intuition: 'Comme toute statistique (Définition 3 du ch.1), un estimateur ne dépend **que des observations** : le paramètre inconnu n’intervient pas dans son expression. C’est la **seule** contrainte. « Un estimateur n’est pas nécessairement *bon* » (encadré Intuition, p. 8) : une méthode de construction fournit un candidat, l’étude de son biais, de son EQM et de son comportement quand $n$ grandit dit s’il faut le retenir.',
        pitfalls: ['Croire qu’un estimateur doit être « bon » ou à valeurs dans $\\Theta$ : $-1$ est un estimateur (très mauvais) d’un paramètre strictement positif.', 'Écrire un « estimateur » qui contient $\\theta$ : ce n’est pas une statistique.'],
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-1',
        title: 'Exemple 1.1 — Qu’est-ce qui est un estimateur ?',
        source: 'Poly ch.2, Ex. 1.1, p. 8',
        setup: '$(X_1,\\dots,X_n)$ $n$-échantillon du modèle exponentiel $\\big(\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}_+),\\{\\mathcal{E}(\\theta),\\theta\\in\\mathbb{R}_+^\\ast\\}\\big)$ ; on veut estimer $\\theta$. Parmi $X_1$, $\\bar X_n$, $\\theta$, $1$ et $-1$, lesquels sont des estimateurs de $\\theta$ ?',
        steps: [
          { text: 'Une constante ($1$ ou $-1$) est une application mesurable de $Z$ (tribu image triviale) : ce sont des estimateurs.', justification: 'Définition 1.1 : seule la mesurabilité est requise, pas la qualité.' },
          { text: '$X_1$ (projection) et $\\bar X_n$ (moyenne) sont des fonctions mesurables de $Z=(X_1,\\dots,X_n)$ : ce sont des estimateurs.', justification: 'Projections et sommes sont mesurables.' },
          { text: '$\\theta$ n’est **pas** un estimateur : c’est la quantité inconnue, non calculable à partir des données.', justification: '$\\theta$ n’est pas une fonction de $Z$.' },
        ],
        conclusion: '**Quatre** estimateurs sur cinq candidats. Rien n’interdit à $-1$ d’être un estimateur d’un paramètre strictement positif : c’est un très mauvais estimateur, mais c’en est un. Aucun des quatre n’est « bon » pour $\\theta$ tel quel ($\\bar X_n$ estime $1/\\theta$) ; un bon estimateur de $\\theta$ sera $1/\\bar X_n$ (Ex. 1.4, 1.7).',
      },
      {
        kind: 'text',
        id: 'ch2-s1-qualite',
        title: 'Trois mesures de qualité (annonce, p. 8)',
        text: `Pour un estimateur $T$ de $g(\\theta)$ et une suite $(T_n)$ :

- le **biais** $\\mathbb{E}_\\theta[T(Z)]-g(\\theta)$ : compare l’estimateur à sa cible en moyenne ;
- l’**erreur quadratique moyenne** $\\mathbb{E}_\\theta\\big[\\|T(Z)-g(\\theta)\\|^2\\big]$ ;
- la **consistance** : convergence de $T_n(Z)$ vers $g(\\theta)$ quand $n\\to\\infty$.

Biais et EQM relèvent de la théorie de la décision ([[chapitre 3|/ch/ch3/cours]]), la consistance du comportement asymptotique ([[chapitre 6|/ch/ch6/cours]]). Ils apparaissent dès ce chapitre : biais de $1/\\bar X_n$ (Ex. 1.4), de l’EMV de la variance gaussienne (Ex. 1.10), des estimateurs seuillés du mélange (PC2 Ex. 2), de $\\hat\\sigma^2$ en régression (PC2 Ex. 1).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 2. Méthode des moments
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s2-moments',
    title: '2. Méthode des moments : égaler moments exacts et moments empiriques',
    role: 'definitions',
    intro:
      'Idée : « une espérance s’approche par une moyenne empirique ». Si le paramètre se déduit, par une fonction inversible, de l’espérance d’une fonction $T$ des observations, on remplace cette espérance par sa version empirique et on résout. Avec un paramètre de dimension $d$, il faut $d$ fonctions $T_j$. L’estimateur **dépend du choix des $T_j$** et n’existe que si le système a une solution unique dans $\\Theta$.',
    blocks: [
      {
        kind: 'example',
        id: 'ch2-ex-1-2',
        title: 'Exemple 1.2 — Modèle de Bernoulli : un premier estimateur des moments',
        source: 'Poly ch.2, Ex. 1.2, p. 9',
        setup: '$(X_1,\\dots,X_n)$ $n$-échantillon de $\\big(\\{0,1\\},\\mathcal{P}(\\{0,1\\}),\\{\\mathcal{B}\\mathrm{er}(p),p\\in[0,1]\\}\\big)$.',
        steps: [
          { text: '$\\mathbb{E}_p[X_1]=0\\cdot(1-p)+1\\cdot p=p$ : le paramètre **est** une espérance.', justification: 'Calcul direct de l’espérance d’une Bernoulli.' },
          { text: 'On remplace l’espérance par la moyenne empirique : $\\hat p_n:=\\bar X_n=\\frac1n\\sum_{i=1}^nX_i$, proportion empirique de 1.', justification: 'Schéma général : choisir $T(x)=x$, calculer $e(p)=\\mathbb{E}_p[T(X_1)]=p$, résoudre $e(\\vartheta)=\\frac1n\\sum_iT(X_i)$.' },
        ],
        conclusion: 'C’est l’estimateur du chapitre 1 (Section 1.8), réinterprété comme estimateur des moments associé à $T(x)=x$.',
      },
      {
        kind: 'theorem',
        id: 'ch2-def-1-2',
        type: 'definition',
        label: 'Définition 1.2',
        title: 'Méthode des moments, cas simple',
        source: 'Poly ch.2, Déf. 1.2, p. 9',
        hypotheses: [
          '$(X_1,\\dots,X_n)$ $n$-échantillon d’un modèle paramétrique $(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta,\\theta\\in\\Theta\\})$ avec $\\Theta\\subseteq\\mathbb{R}$.',
          '$T:\\mathsf{X}\\to\\mathbb{R}$ mesurable telle que $\\mathbb{E}_\\theta[|T(X_1)|]<\\infty$ pour tout $\\theta\\in\\Theta$.',
        ],
        statement: `On appelle **moment exact** associé à $T$ la fonction $e:\\theta\\mapsto e(\\theta):=\\mathbb{E}_\\theta[T(X_1)]$ et **moment empirique** associé à $T$ la statistique $\\frac1n\\sum_{i=1}^nT(X_i)$. On considère l’équation, d’inconnue $\\vartheta\\in\\Theta$,

$$e(\\vartheta)=\\frac1n\\sum_{i=1}^nT(X_i).$$

Lorsqu’elle admet une **solution unique**, celle-ci est notée $\\hat\\theta_n$ et appelée **estimateur des moments associé à $T$** : la valeur du paramètre qui égale moment exact et moment empirique.`,
        intuition: 'Le paramètre n’a pas besoin d’être lui-même une espérance ; il suffit qu’il s’en déduise par une fonction inversible ($\\theta=1/e(\\theta)$ pour l’exponentielle).',
        pitfalls: ['L’estimateur n’est défini que si la solution existe, est unique **et appartient à $\\Theta$** (Poisson avec toutes les observations nulles : solution $0\\notin\\mathbb{R}_+^\\ast$).', 'Il y a **un** estimateur des moments par fonction $T$ admissible : on dit « *un* estimateur des moments » ou « l’estimateur des moments *associé à $T$* ».'],
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-3',
        title: 'Exemple 1.3 — Modèles exponentiel et de Poisson : deux applications',
        source: 'Poly ch.2, Ex. 1.3, p. 9',
        setup: '(1) $n$-échantillon de $\\{\\mathcal{E}(\\theta),\\theta\\in\\mathbb{R}_+^\\ast\\}$ ; (2) $n$-échantillon de $\\{\\mathcal{P}\\mathrm{oi}(\\lambda),\\lambda\\in\\mathbb{R}_+^\\ast\\}$, avec le moment d’ordre 2.',
        steps: [
          { text: '(1) $\\mathbb{E}_\\theta[X_1]=1/\\theta$ : l’équation $e(\\vartheta)=1/\\vartheta=\\bar X_n$ a pour solution unique $\\hat\\theta_n=1/\\bar X_n$, définie dès que $\\bar X_n>0$.', justification: 'Lemme des moments de la loi exponentielle (ch.1) ; $\\vartheta\\mapsto1/\\vartheta$ strictement monotone sur $\\mathbb{R}_+^\\ast$ ; $\\bar X_n>0$ $\\mathbb{P}_\\theta$-p.s. car $X_1>0$ p.s. (loi à densité sur $\\mathbb{R}_+$).' },
          { text: '(2) Rien n’oblige à utiliser le moment d’ordre 1 : $\\mathbb{E}_\\lambda[X_1^2]=\\mathrm{Var}_\\lambda(X_1)+\\mathbb{E}_\\lambda[X_1]^2=\\lambda+\\lambda^2$. On résout $\\vartheta^2+\\vartheta=\\overline{X^2}_n$ : unique racine dans $\\mathbb{R}_+$, $\\hat\\lambda_n=\\frac12\\big(-1+\\sqrt{1+4\\,\\overline{X^2}_n}\\big)$.', justification: 'Équation du second degré $\\vartheta^2+\\vartheta-c=0$, $c=\\overline{X^2}_n\\ge0$, discriminant $1+4c$ ; seule la racine $\\frac{-1+\\sqrt{1+4c}}2$ est $\\ge0$.' },
          { text: 'Cette racine vaut $0$ exactement lorsque toutes les observations sont nulles, événement de probabilité $\\mathrm{e}^{-n\\lambda}>0$ ; comme $\\Theta=\\mathbb{R}_+^\\ast$, l’estimateur n’est alors **pas défini**.', justification: '$c=0$ ssi tous les $X_i=0$, de probabilité $(\\mathrm{e}^{-\\lambda})^n$ par indépendance. Il serait défini si l’on adjoignait $\\lambda=0$ (Dirac en 0) ; le premier estimateur des moments $\\bar X_n$ a exactement la même limite.' },
        ],
        conclusion: 'Ne pas oublier les événements de probabilité positive où l’estimateur sort de $\\Theta$ : ils reviennent dans le mélange uniforme (PC2 Ex. 2, seuillage) et pour l’EMV de Poisson (Ex. 1.9).',
      },
      {
        kind: 'theorem',
        id: 'ch2-meth-1-1',
        type: 'methode',
        label: 'Méthode 1.1',
        title: 'Méthode des moments',
        source: 'Poly ch.2, Méthode 1.1, p. 10',
        hypotheses: ['$(X_1,\\dots,X_n)$ $n$-échantillon de $(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta,\\theta\\in\\Theta\\})$, $\\Theta\\subseteq\\mathbb{R}^d$ ; $\\mathbb{P}_\\theta:=\\mathbb{Q}_\\theta^{\\otimes n}$.'],
        statement: `1. Choisir $d$ fonctions mesurables $T_j:\\mathsf{X}\\to\\mathbb{R}$, $j\\in\\{1,\\dots,d\\}$, telles que $\\mathbb{E}_\\theta[|T_j(X_1)|]=\\int_{\\mathsf{X}}|T_j(x)|\\,\\mathbb{Q}_\\theta(\\mathrm{d}x)<\\infty$ pour tout $\\theta\\in\\Theta$.
2. Calculer les **moments exacts** $e_j(\\theta):=\\mathbb{E}_\\theta[T_j(X_1)]$ pour tout $\\theta$ et tout $j$.
3. Les $e_j(\\theta)$ ne sont pas connus (puisque $\\theta$ ne l’est pas) : on les estime par les **moments empiriques** $\\frac1n\\sum_{i=1}^nT_j(X_i)$.
4. Résoudre, par rapport à $\\vartheta$, le système de $d$ équations à $d$ inconnues

$$\\forall j\\in\\{1,\\dots,d\\},\\qquad\\frac1n\\sum_{i=1}^nT_j(X_i)=e_j(\\vartheta).$$

En supposant que ce système admette une **solution unique** $\\hat\\theta_n$ dans $\\Theta$, on appelle $\\hat\\theta_n$ l’**estimateur des moments de $\\theta$ associé aux fonctions $T_j$**.`,
        intuition: 'Autant d’équations que d’inconnues ; on égalise théorique et empirique.',
        pitfalls: ['(a) Ni l’existence ni l’unicité ne sont automatiques, et la solution peut exister **sans appartenir à $\\Theta$** (commentaire p. 10).', '(b) Le résultat **dépend des $T_j$ choisies** : un modèle admet en général **plusieurs** estimateurs des moments, qui ne se valent pas (Ex. 1.4).', 'Le nombre d’équations doit être au moins égal au nombre d’inconnues (Ex. 1.5 : deux moments pour $(a,b)$).'],
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-4',
        title: 'Exemple 1.4 — Modèle exponentiel : deux estimateurs des moments',
        source: 'Poly ch.2, Ex. 1.4, p. 10–11',
        setup: `$n$-échantillon de $\\{\\mathcal{E}(\\theta),\\theta\\in\\Theta:=\\mathbb{R}_+^\\ast\\}$, densité par rapport à $\\mathrm{Leb}$ (éq. (1)) $q_\\theta(x):=\\theta\\mathrm{e}^{-\\theta x}\\mathbb{1}_{\\mathbb{R}_+}(x)$. Modèle de base des systèmes à événements discrets (arrivées, pannes, durées de survie). Rappels : **absence de mémoire** $\\mathbb{P}_\\theta(X_1\\ge a+b\\mid X_1\\ge a)=\\mathrm{e}^{-(a+b)\\theta}/\\mathrm{e}^{-a\\theta}=\\mathbb{P}_\\theta(X_1\\ge b)$ ; **moments** $\\mathbb{E}_\\theta[X_1^k]=k!/\\theta^k$.`,
        steps: [
          { text: 'Avec $T(x)=x$ et $\\tilde T(x)=x^2$ : $e(\\theta)=\\int_0^{+\\infty}x\\,\\theta\\mathrm{e}^{-\\theta x}\\,\\mathrm{d}x=\\frac1\\theta$ et $\\tilde e(\\theta)=\\int_0^{+\\infty}x^2\\theta\\mathrm{e}^{-\\theta x}\\,\\mathrm{d}x=\\frac2{\\theta^2}$.', justification: 'Intégrations par parties successives (ou fonction génératrice des moments, lemme du ch.1).' },
          { text: 'Équations : $\\frac1\\vartheta=\\frac1n\\sum_iX_i$ et $\\frac2{\\vartheta^2}=\\frac1n\\sum_iX_i^2$. Sous $\\vartheta>0$ et dès que les observations ne sont pas toutes nulles ($\\mathbb{P}_\\theta$-p.s.), solutions uniques (éq. (2)) : $\\hat\\theta_{n,1}:=\\dfrac1{n^{-1}\\sum_iX_i}$, $\\hat\\theta_{n,2}:=\\Big(\\dfrac2{n^{-1}\\sum_iX_i^2}\\Big)^{1/2}$.', justification: 'Stricte monotonie de $\\vartheta\\mapsto1/\\vartheta$ et $\\vartheta\\mapsto2/\\vartheta^2$ sur $\\mathbb{R}_+^\\ast$.' },
          { text: 'Biais et EQM de $\\hat\\theta_{n,1}$ (lois Gamma, ch.1) : $\\mathbb{E}_\\theta[\\hat\\theta_{n,1}]=\\dfrac{n\\theta}{n-1}$ ($n\\ge2$) et $\\mathbb{E}_\\theta[(\\hat\\theta_{n,1}-\\theta)^2]=\\dfrac{(n+2)\\theta^2}{(n-1)(n-2)}$ ($n\\ge3$).', justification: '$\\sum_iX_i\\sim\\Gamma(n,\\theta)$ et moments inverses d’une loi Gamma (ch.1, Section 4). L’estimateur est **biaisé** (vers le haut) : $\\mathbb{E}[1/\\bar X_n]\\ne1/\\mathbb{E}[\\bar X_n]$ (Jensen).' },
        ],
        conclusion: `Il y a **deux** estimateurs des moments, et il y en aurait autant que de fonctions $T$ admissibles. Ils ne se valent pas : sur des échantillons simulés sous $\\theta=1$ (figure p. 11, boîtes à moustaches), les deux se concentrent autour de la vraie valeur mais **$\\hat\\theta_{n,2}$ est nettement plus dispersé** que $\\hat\\theta_{n,1}$ : utiliser un moment d’ordre plus élevé introduit plus de variabilité (quantifié au ch.6 : variances asymptotiques $\\theta^2$ contre $\\frac54\\theta^2$, PC6 Ex. 1).

*Rappel (boîte à moustaches, p. 11–12) :* la boîte va du premier quartile $q_1$ au troisième $q_3$, coupée par la médiane ; hauteur $\\mathrm{IQR}=q_3-q_1$ ; moustaches de Tukey jusqu’aux valeurs extrêmes dans $[q_1-1{,}5\\,\\mathrm{IQR},\\,q_3+1{,}5\\,\\mathrm{IQR}]$, points isolés au-delà. Position de la médiane vs vraie valeur $\\leftrightarrow$ biais ; hauteur de la boîte $\\leftrightarrow$ dispersion.`,
      },
      {
        kind: 'viz',
        id: 'ch2-s2-viz-moments',
        vizId: 'ch2-methode-moments',
        caption: 'La méthode des moments en image : l’estimateur est l’abscisse où la courbe du moment exact $e(\\vartheta)$ coupe le niveau du moment empirique ; à droite, les deux estimateurs $\\hat\\theta_{n,1}$ et $\\hat\\theta_{n,2}$ sur des répétitions (figure p. 11).',
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-5',
        title: 'Exemple 1.5 — Loi uniforme sur [a, b] : deux moments nécessaires',
        source: 'Poly ch.2, Ex. 1.5, p. 12–13',
        setup: '$n$-échantillon de $\\mathcal{U}([a,b])$, $\\theta=(a,b)\\in\\Theta:=\\{(a,b)\\in\\mathbb{R}^2:a<b\\}$, densité $q_\\theta(x)=\\frac1{b-a}\\mathbb{1}_{[a,b]}(x)$ ; $n\\ge2$. Un paramètre de dimension 2 demande deux moments : $T(x)=x$, $\\tilde T(x)=x^2$.',
        steps: [
          { text: '$e(\\theta)=\\mathbb{E}_\\theta[X_1]=\\dfrac{a+b}2$ et $\\tilde e(\\theta)=\\mathbb{E}_\\theta[X_1^2]=\\dfrac{b^3-a^3}{3(b-a)}=\\dfrac{a^2+ab+b^2}3$.', justification: 'Intégrales élémentaires ; $b^3-a^3=(b-a)(a^2+ab+b^2)$.' },
          { text: 'Système : $\\frac{a+b}2=\\bar X_n$, $\\frac{a^2+ab+b^2}3=\\overline{X^2}_n$. Avec $s=a+b$, $p=ab$ ($a^2+ab+b^2=s^2-p$) : $\\hat s_n=2\\bar X_n$, $\\hat p_n=\\hat s_n^2-3\\,\\overline{X^2}_n$, et $\\hat a_n$, $\\hat b_n$ sont les racines de $t^2-\\hat s_nt+\\hat p_n=0$.', justification: 'Changement d’inconnues somme/produit (relations de Viète) : système triangulaire en $(s,p)$.' },
          { text: 'Discriminant : $\\hat s_n^2-4\\hat p_n=4\\bar X_n^2-4(4\\bar X_n^2-3\\overline{X^2}_n)=12(\\overline{X^2}_n-\\bar X_n^2)=12V_n\\ge0$, d’où $\\hat a_n=\\bar X_n-\\sqrt{3V_n}$, $\\hat b_n=\\bar X_n+\\sqrt{3V_n}$.', justification: '$V_n=\\frac1n\\sum_i(X_i-\\bar X_n)^2\\ge0$ (variance empirique non corrigée) : racines réelles.' },
          { text: 'Pour $n\\ge2$, les observations ne sont pas toutes égales $\\mathbb{P}_\\theta$-p.s., donc $V_n>0$, $\\hat a_n<\\hat b_n$ et $(\\hat a_n,\\hat b_n)\\in\\Theta$ : solution unique dans $\\Theta$.', justification: 'Loi à densité $\\Rightarrow$ $X_1\\ne X_2$ p.s. ; la contrainte $a<b$ impose l’ordre des racines.' },
        ],
        conclusion: `**Piège (Remarque p. 12–13) :** l’intervalle $[\\hat a_n,\\hat b_n]$ **ne contient pas nécessairement toutes les observations** : c’est le cas dès que $X_{n:n}-\\bar X_n>\\sqrt{3V_n}$. Exemple : $n=10$, neuf observations $\\approx0$ et une $\\approx1$ : $\\bar X_n\\simeq0{,}1$, $V_n\\simeq0{,}09$, $\\hat b_n\\simeq0{,}1+\\sqrt{0{,}27}\\simeq0{,}62$ alors que $X_{n:n}\\simeq1$. La méthode des moments n’utilise que les deux premiers moments empiriques et ignore la contrainte $a\\le X_i\\le b$ ; le maximum de vraisemblance, lui, retiendra $[X_{1:n},X_{n:n}]$ (Ex. 1.11).`,
      },
      {
        kind: 'theorem',
        id: 'ch2-prop-1-1',
        type: 'proposition',
        label: 'Proposition 1.1',
        title: 'Convergence des moments empiriques',
        source: 'Poly ch.2, Prop. 1.1, p. 13',
        hypotheses: [
          '$(X_1,\\dots,X_n)$ $n$-échantillon de $(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta,\\theta\\in\\Theta\\})$.',
          '$T:\\mathsf{X}\\to\\mathbb{R}$ mesurable avec $\\mathbb{E}_\\theta[|T(X_1)|]<\\infty$ pour tout $\\theta$ ; $e(\\theta)=\\mathbb{E}_\\theta[T(X_1)]$.',
          'Pour (i) seulement : $\\mathbb{E}_\\theta[T(X_1)^2]<\\infty$, et $\\sigma^2(\\theta):=\\mathrm{Var}_\\theta(T(X_1))=\\int\\{T(x)-e(\\theta)\\}^2\\,\\mathbb{Q}_\\theta(\\mathrm{d}x)$.',
        ],
        statement: `(i) Si $\\mathbb{E}_\\theta[T(X_1)^2]<\\infty$, pour tout $\\varepsilon>0$,

$$\\mathbb{P}_\\theta\\Big(\\Big|\\frac1n\\sum_{i=1}^nT(X_i)-e(\\theta)\\Big|\\ge\\varepsilon\\Big)\\le\\frac{\\sigma^2(\\theta)}{n\\varepsilon^2}.$$

(ii) Dans tous les cas, $\\frac1n\\sum_{i=1}^nT(X_i)\\xrightarrow{\\mathbb{P}_\\theta\\text{-prob}}e(\\theta)$ (loi faible des grands nombres).

En particulier, si l’estimateur des moments $\\hat\\theta_n$ associé à $T$ est défini $\\mathbb{P}_\\theta$-p.s. pour tout $n$, alors $e(\\hat\\theta_n)=\\frac1n\\sum_iT(X_i)$ p.s., donc $\\mathbb{P}_\\theta(|e(\\hat\\theta_n)-e(\\theta)|\\ge\\varepsilon)\\le\\sigma^2(\\theta)/(n\\varepsilon^2)$ sous l’hypothèse de (i), et $e(\\hat\\theta_n)\\xrightarrow{\\mathbb{P}_\\theta\\text{-prob}}e(\\theta)$.`,
        intuition: 'Une moyenne empirique se concentre autour de l’espérance qu’elle estime. Attention : la proposition porte sur **$e(\\hat\\theta_n)$, pas sur $\\hat\\theta_n$**.',
        proof: [
          { text: 'Sous $\\mathbb{P}_\\theta$, les $T(X_1),\\dots,T(X_n)$ sont i.i.d. d’espérance $e(\\theta)$.', justification: 'Fonctions mesurables de variables i.i.d.' },
          { text: '(i) La moyenne empirique a pour espérance $e(\\theta)$ et pour variance $\\sigma^2(\\theta)/n$ ; l’inégalité de Bienaymé-Tchebychev donne la borne.', justification: 'Variance d’une somme de v.a. **indépendantes** = somme des variances ; Prop. 2.1 (ii) (Outils) avec $\\delta=\\varepsilon$.' },
          { text: '(ii) Loi faible des grands nombres pour des v.a. i.i.d. intégrables.', justification: 'Théorème 2.1 (Outils) ; sous l’hypothèse de (i), la convergence découle aussi directement de la borne de (i), qui tend vers 0.' },
          { text: 'Dernière affirmation : par définition de $\\hat\\theta_n$, $e(\\hat\\theta_n)$ est égal au moment empirique.', justification: 'Définition 1.2 : $\\hat\\theta_n$ résout $e(\\vartheta)=\\frac1n\\sum_iT(X_i)$.' },
        ],
        pitfalls: [
          '**Passer de $e(\\hat\\theta_n)$ à $\\hat\\theta_n$ (Remarque p. 13).** Si $e$ est **injective** et si $e^{-1}:e(\\Theta)\\to\\Theta$ est **continue au point $e(\\theta)$**, alors $\\hat\\theta_n=e^{-1}\\big(\\frac1n\\sum_iT(X_i)\\big)\\xrightarrow{\\mathbb{P}_\\theta\\text{-prob}}\\theta$ (Lemme 2.1). C’est le cas si $\\Theta$ est un intervalle et $e$ continue strictement monotone : modèle exponentiel, $e(\\theta)=1/\\theta$, $\\hat\\theta_{n,1}=1/\\bar X_n\\to\\theta$ en probabilité.',
          'Oublier l’hypothèse de **moment d’ordre 2** pour la borne quantitative (i) ; (ii) ne demande que l’intégrabilité.',
          'Consistance et vitesse (LGN, TCL, méthode-δ) : [[chapitre 6|/ch/ch6/cours]].',
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 3. Z-estimateurs
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s3-zestimateurs',
    title: '3. Généralisation : les Z-estimateurs (zéros d’une fonction aléatoire)',
    role: 'definitions',
    intro:
      'L’estimateur des moments associé à $\\mathbf{T}=(T_1,\\dots,T_d)$ est la solution du système $\\frac1n\\sum_i\\boldsymbol\\psi(\\vartheta,X_i)=0$ avec $\\boldsymbol\\psi(\\vartheta,x):=\\mathbf{T}(x)-\\mathbb{E}_\\vartheta[\\mathbf{T}(X_1)]$ (éq. (3), p. 14). La **seule propriété utilisée** est que l’espérance de $\\boldsymbol\\psi$ s’annule au vrai paramètre : on passe d’« égaler des moments » à « annuler une moyenne empirique centrée », ce qui autorise des fonctions d’estimation plus générales, en particulier **bornées** (robustesse : médiane).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch2-def-1-3',
        type: 'definition',
        label: 'Définition 1.3',
        title: 'Z-estimateur',
        source: 'Poly ch.2, Déf. 1.3, p. 14',
        hypotheses: [
          '$(X_1,\\dots,X_n)$ $n$-échantillon de $(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta,\\theta\\in\\Theta\\})$, $\\Theta\\subseteq\\mathbb{R}^d$.',
          '$\\psi_j:\\Theta\\times\\mathsf{X}\\to\\mathbb{R}$, $j\\in\\{1,\\dots,d\\}$, mesurables, avec $\\mathbb{E}_\\theta[|\\psi_j(\\theta,X_1)|]<\\infty$ pour tout $\\theta$ et tout $j$.',
          '**Centrage au vrai paramètre** : $\\mathbb{E}_\\theta[\\boldsymbol\\psi(\\theta,X_1)]=\\mathbf{0}_{d\\times1}$ pour tout $\\theta\\in\\Theta$, où $\\boldsymbol\\psi:=(\\psi_1,\\dots,\\psi_d)^\\top$.',
        ],
        statement: `On appelle **Z-estimateur associé à $\\boldsymbol\\psi$** tout estimateur $\\hat\\theta_n$ vérifiant

$$\\Psi_n(\\hat\\theta_n)=0,\\qquad\\text{avec}\\quad\\Psi_n(\\vartheta):=\\frac1n\\sum_{i=1}^n\\boldsymbol\\psi(\\vartheta,X_i).$$`,
        intuition: 'La lettre Z rappelle que l’estimateur est un **zéro** de la fonction aléatoire $\\Psi_n$. Un estimateur des moments est un Z-estimateur (fonction d’estimation (3)). Une partie des propriétés de convergence se démontre directement pour les Z-estimateurs (LGN, TCL : chapitre 7).',
        pitfalls: ['L’espérance est prise **sous $\\theta$ en $\\theta$** (même valeur) : c’est $\\mathbb{E}_\\theta[\\boldsymbol\\psi(\\theta,X_1)]$, pas $\\mathbb{E}_\\theta[\\boldsymbol\\psi(\\vartheta,X_1)]$.', 'La définition dit « **tout** estimateur » : pas d’unicité requise (médiane avec $n$ pair).'],
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-6',
        title: 'Exemple 1.6 — Modèle de translation : moyenne empirique et médiane empirique',
        source: 'Poly ch.2, Ex. 1.6, p. 14–15',
        setup: '$f$ densité **paire** sur $\\mathbb{R}$ ($f(x)=f(-x)$, p. ex. $f(x)=(2\\pi)^{-1/2}\\mathrm{e}^{-x^2/2}$) ; $n$-échantillon du modèle de translation $\\{q_\\theta\\cdot\\mathrm{Leb},\\theta\\in\\Theta=\\mathbb{R}\\}$, $q_\\theta(x):=f(x-\\theta)$.',
        steps: [
          { text: '*Moyenne empirique.* Si $\\int|x|f(x)\\,\\mathrm{d}x<\\infty$ et $\\psi(\\theta,x)=x-\\theta$ : $\\mathbb{E}_\\theta[X_1-\\theta]=\\int(x-\\theta)f(x-\\theta)\\,\\mathrm{d}x=\\int zf(z)\\,\\mathrm{d}z=0$.', justification: 'Changement de variable $z=x-\\theta$ (invariance de $\\mathrm{Leb}$ par translation), puis **parité de $f$** : $z\\mapsto zf(z)$ est impaire intégrable.' },
          { text: 'L’équation $\\frac1n\\sum_i(X_i-\\vartheta)=0$ a pour unique solution $\\hat\\theta_n=\\bar X_n$ : Z-estimateur associé à $\\psi$, et aussi estimateur des moments associé à $T(x)=x$ (car $\\mathbb{E}_\\theta[X_1]=\\theta$).', justification: 'Équation affine en $\\vartheta$.' },
          { text: '*Médiane empirique.* $\\psi(\\theta,x)=\\mathrm{signe}(x-\\theta)$ : **aucune hypothèse de moment** (fonction bornée) et $\\mathbb{E}_\\theta[\\mathrm{signe}(X_1-\\theta)]=\\int\\mathrm{signe}(z)f(z)\\,\\mathrm{d}z=\\int_0^{+\\infty}f-\\int_{-\\infty}^0f=0$.', justification: 'Parité : $\\int_0^\\infty f=\\int_{-\\infty}^0f=\\frac12$.' },
          { text: 'Avec $X_{1:n}\\le\\dots\\le X_{n:n}$ (observations deux à deux distinctes p.s.), pour $\\vartheta$ distinct des observations, $\\sum_i\\mathrm{signe}(X_i-\\vartheta)$ = (nb d’observations $>\\vartheta$) $-$ (nb d’observations $<\\vartheta$). Si $n=2m+1$ : **unique** solution $\\vartheta=X_{m+1:n}$ ; si $n=2m$ : les solutions sont **tous les points de $]X_{m:n},X_{m+1:n}[$**, dont la médiane $\\frac12(X_{m:n}+X_{m+1:n})$.', justification: 'La fonction $\\vartheta\\mapsto\\sum_i\\mathrm{signe}(X_i-\\vartheta)$ décroît par sauts de 2 en chaque observation (passant par la valeur intermédiaire au point d’observation).' },
        ],
        conclusion: '**Conclusion :** la moyenne empirique est un estimateur des moments ; la médiane empirique $\\mathrm{med}(X_1,\\dots,X_n)$ est un Z-estimateur **qui n’est pas un estimateur des moments** : $(\\theta,x)\\mapsto\\mathrm{signe}(x-\\theta)$ ne s’écrit pas $T(x)-\\mathbb{E}_\\theta[T(X_1)]$. Une fonction d’estimation bornée ne demande aucun moment (robustesse ; cf. MAD, compléments Ex. 4.3). Pour $n$ pair, le Z-estimateur n’est pas unique (intervalle **ouvert** ici ; intervalle **fermé** pour l’EMV de Laplace, Ex. 1.13).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 4. Maximum de vraisemblance
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s4-vraisemblance',
    title: '4. Maximum de vraisemblance : définition, équations de vraisemblance, Méthode 1.2',
    role: 'definitions',
    intro:
      'On ne regarde que la **densité des observations vue comme fonction du paramètre** : c’est la vraisemblance. L’EMV est la valeur qui la rend maximale. Dans les modèles réguliers on annule le gradient de la log-vraisemblance **puis on vérifie le maximum global** ; dans les modèles non réguliers (uniforme) on étudie la fonction directement, sans dériver. L’EMV peut ne pas exister ou ne pas être unique.',
    blocks: [
      {
        kind: 'text',
        id: 'ch2-s4-intuition',
        title: 'Deux intuitions (encadrés p. 15)',
        text: `**(a) Gaussienne $\\mathcal{N}(\\mu,1)$**, tailles en cm : 180, 170, 155, 172, 183, 194, 164… Est-il vraisemblable que $\\mu=10$ ? que $\\mu=200$ ? Sous $\\mathcal{N}(10,1)$, l’observation 170 est à 160 écarts-types, densité $(2\\pi)^{-1/2}\\mathrm{e}^{-12\\,800}$ : possible au sens strict, mais si peu vraisemblable qu’on ne le retiendrait pas. Avec une observation, $\\mu\\mapsto(2\\pi)^{-1/2}\\exp(-(X_1-\\mu)^2/2)$ est maximale en $\\mu=X_1$ ; avec $n$ observations indépendantes, la densité du vecteur $\\prod_i(2\\pi)^{-1/2}\\exp(-(X_i-\\mu)^2/2)$ est maximale lorsque $\\sum_i(X_i-\\mu)^2$ est minimal, i.e. en $\\mu=\\bar X_n$.

**(b) Uniforme $\\mathcal{U}([0,\\theta])$**, observations 8, 7, 11, 17, 2, 5, 14… $\\theta=5$ est **impossible** (une observation vaut $17>5$ : densité nulle). $\\theta=100$ est possible mais donne la densité $100^{-n}$. $\\theta=17$ (plus grande observation) donne $17^{-n}$, la plus grande : toute valeur $<17$ annule la densité, toute valeur $>17$ la diminue.`,
      },
      {
        kind: 'theorem',
        id: 'ch2-def-1-4',
        type: 'definition',
        label: 'Définition 1.4',
        title: 'Vraisemblance et estimateur du maximum de vraisemblance',
        source: 'Poly ch.2, Déf. 1.4, p. 15–16',
        hypotheses: [
          '$(\\mathsf{X},\\mathcal{X})$ espace mesurable, $\\mu$ mesure $\\sigma$-finie sur $(\\mathsf{X},\\mathcal{X})$.',
          '$(X_1,\\dots,X_n)$ $n$-échantillon du **modèle dominé** $(\\mathsf{X},\\mathcal{X},\\{q_\\theta\\cdot\\mu,\\theta\\in\\Theta\\})$, $q_\\theta$ densité de $\\mathbb{Q}_\\theta$ par rapport à $\\mu$.',
        ],
        statement: `La **fonction de vraisemblance** (ou vraisemblance) associée au $n$-échantillon est l’application

$$\\vartheta\\in\\Theta\\mapsto\\mathrm{L}_n(\\vartheta,X_1,\\dots,X_n):=\\prod_{i=1}^nq_\\vartheta(X_i).$$

Un **estimateur du maximum de vraisemblance** est tout estimateur $\\hat\\theta_n^{\\mathrm{MV}}$ vérifiant

$$\\mathrm{L}_n(\\hat\\theta_n^{\\mathrm{MV}},X_1,\\dots,X_n)=\\max_{\\vartheta\\in\\Theta}\\mathrm{L}_n(\\vartheta,X_1,\\dots,X_n),\\quad\\text{i.e.}\\quad\\hat\\theta_n^{\\mathrm{MV}}\\in\\argmax_{\\vartheta\\in\\Theta}\\mathrm{L}_n(\\vartheta,X_1,\\dots,X_n).$$

Sans ambiguïté, on note $\\mathrm{L}_n(\\vartheta)$.`,
        intuition: 'La vraisemblance est la densité du $n$-échantillon (produit des densités, ch.1 Section 1.7, éq. (1)) évaluée aux observations, vue comme fonction du paramètre libre $\\vartheta$ — distinct de la valeur inconnue sous laquelle les observations ont été tirées (explicité au §1.4).',
        pitfalls: [
          '**Mesure dominante (Remarque p. 16).** La vraisemblance dépend de $\\mu$, mais deux mesures dominantes donnent des densités qui diffèrent d’un **facteur multiplicatif indépendant du paramètre** (ch.1, Section 2) : les points de maximum, donc l’EMV, **n’en dépendent pas**.',
          'L’EMV n’est pas forcément unique (« tout estimateur », Ex. 1.13) ni forcément existant (Ex. 1.12) ; la vraisemblance n’est **pas** une densité en $\\vartheta$.',
          '*Note 2 (experte, hors programme) :* pour des versions **fixées** des densités ; en modifiant chaque densité sur un négligeable dépendant du paramètre on peut déplacer les maxima (Baraud & Birgé, 2018) ; les versions continues du cours écartent la difficulté.',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch2-def-1-5',
        type: 'definition',
        label: 'Définition 1.5',
        title: 'Log-vraisemblance normalisée',
        source: 'Poly ch.2, Déf. 1.5, p. 16',
        hypotheses: ['Celles de la Définition 1.4.'],
        statement: `La **log-vraisemblance normalisée** est l’application

$$\\vartheta\\in\\Theta\\mapsto\\ell_n(\\vartheta,X_1,\\dots,X_n):=\\frac1n\\log\\mathrm{L}_n(\\vartheta,X_1,\\dots,X_n)=\\frac1n\\sum_{i=1}^n\\log q_\\vartheta(X_i),$$

avec la convention $\\log0=-\\infty$. **Conséquence :** $\\mathrm{L}_n$ et $\\ell_n$ ont les **mêmes points de maximum**, $\\hat\\theta_n^{\\mathrm{MV}}\\in\\argmax_{\\vartheta\\in\\Theta}\\ell_n(\\vartheta,X_1,\\dots,X_n)$.`,
        intuition: 'Le log transforme le produit en somme (calculs plus simples) ; la normalisation par $n$ fait de $\\ell_n$ une **moyenne empirique**, ce qui sert à comprendre son comportement quand $n$ augmente (§1.4). $\\log$ = népérien.',
        proof: [
          { text: '$\\log$ est strictement croissante sur $\\mathbb{R}_+^\\ast$, et la convention $\\log0=-\\infty$ prolonge cette monotonie à $\\mathbb{R}_+$ ; diviser par $n>0$ conserve l’ordre : $\\mathrm{L}_n(\\vartheta)\\le\\mathrm{L}_n(\\vartheta\')\\iff\\ell_n(\\vartheta)\\le\\ell_n(\\vartheta\')$.', justification: 'Monotonie stricte d’une transformation croissante : mêmes argmax.' },
          { text: 'Log d’un produit = somme des logs.', justification: 'Propriété du logarithme.' },
        ],
        pitfalls: ['Dans ce chapitre $\\ell_n=\\frac1n\\log\\mathrm{L}_n$ (normalisée) ; les corrigés de PC écrivent souvent $\\log\\mathrm{L}_n$ sans le $\\frac1n$ : cela ne change ni les points critiques ni l’argmax.'],
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-7',
        title: 'Exemple 1.7 — Modèle exponentiel (EMV)',
        source: 'Poly ch.2, Ex. 1.7, p. 17',
        setup: '$n$-échantillon de $\\{\\mathcal{E}(\\theta),\\theta\\in\\Theta=\\mathbb{R}_+^\\ast\\}$, $q_\\theta(x)=\\theta\\mathrm{e}^{-\\theta x}\\mathbb{1}_{\\mathbb{R}_+}(x)$.',
        steps: [
          { text: 'Les observations étant positives, pour tout $\\vartheta>0$ : $\\mathrm{L}_n(\\vartheta)=\\prod_{i=1}^n\\vartheta\\mathrm{e}^{-\\vartheta X_i}=\\vartheta^n\\exp\\big(-\\vartheta\\sum_iX_i\\big)>0$ et $\\ell_n(\\vartheta)=\\log\\vartheta-\\vartheta\\bar X_n$.', justification: 'Indépendance $\\Rightarrow$ densité produit ; passage au log et division par $n$.' },
          { text: '$\\ell_n$ est dérivable sur $\\mathbb{R}_+^\\ast$ : $\\ell_n\'(\\vartheta)=\\frac1\\vartheta-\\bar X_n$, $\\ell_n\'\'(\\vartheta)=-\\frac1{\\vartheta^2}<0$ : **strictement concave**.', justification: 'Dérivation ; Lemme 2.3 ($\\psi\'\'<0$ $\\Rightarrow$ stricte concavité).' },
          { text: 'Dès que $\\bar X_n>0$ ($\\mathbb{P}_\\theta$-p.s.), unique point critique $\\vartheta=1/\\bar X_n$, qui est le maximum global : $\\hat\\theta_n^{\\mathrm{MV}}=\\dfrac1{\\bar X_n}=\\hat\\theta_{n,1}$.', justification: 'Lemme 2.3 : point critique d’une fonction strictement concave = unique maximum global ($\\ell_n\'>0$ avant, $<0$ après).' },
        ],
        conclusion: 'L’EMV coïncide avec le **premier** estimateur des moments de l’Exemple 1.4 (pas avec le second). L’intensité estimée est l’inverse de la durée moyenne.',
      },
      {
        kind: 'viz',
        id: 'ch2-s4-viz-logvrais',
        vizId: 'ch2-log-vraisemblance',
        caption: 'Vraisemblance $\\mathrm{L}_n$ et log-vraisemblance normalisée $\\ell_n$ pour un échantillon tiré : même argmax, le pic se resserre quand $n$ augmente.',
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-8',
        title: 'Exemple 1.8 — Modèle de Bernoulli (EMV) : attention aux bords',
        source: 'Poly ch.2, Ex. 1.8, p. 17',
        setup: '$n$-échantillon de $\\{\\mathcal{B}\\mathrm{er}(p),p\\in\\Theta=[0,1]\\}$, dominé par la mesure de comptage, $q_p(x)=p^x(1-p)^{1-x}$ ($0^0=1$) ; $S_n:=\\sum_iX_i=n\\bar X_n$.',
        steps: [
          { text: 'Pour $\\vartheta\\in[0,1]$ : $\\mathrm{L}_n(\\vartheta)=\\prod_i\\vartheta^{X_i}(1-\\vartheta)^{1-X_i}=\\vartheta^{S_n}(1-\\vartheta)^{n-S_n}$.', justification: 'Densité produit ; regroupement des exposants.' },
          { text: 'Cas $S_n=0$ : $\\mathrm{L}_n(\\vartheta)=(1-\\vartheta)^n$ strictement décroissante, maximum en $\\vartheta=0$ seulement. Cas $S_n=n$ : $\\mathrm{L}_n(\\vartheta)=\\vartheta^n$, maximum en $\\vartheta=1$ seulement.', justification: 'Étude directe au bord de $\\Theta$ fermé : le log n’est pas défini en $0$ ou $1$.' },
          { text: 'Cas $0<S_n<n$ : $\\mathrm{L}_n(0)=\\mathrm{L}_n(1)=0$ et $\\mathrm{L}_n>0$ sur $]0,1[$ où $\\ell_n(\\vartheta)=\\bar X_n\\log\\vartheta+(1-\\bar X_n)\\log(1-\\vartheta)$, $\\ell_n\'(\\vartheta)=\\frac{\\bar X_n}\\vartheta-\\frac{1-\\bar X_n}{1-\\vartheta}$, $\\ell_n\'\'(\\vartheta)=-\\frac{\\bar X_n}{\\vartheta^2}-\\frac{1-\\bar X_n}{(1-\\vartheta)^2}<0$ : strictement concave, unique point critique $\\bar X_n$, maximum global.', justification: 'Lemme 2.3.' },
        ],
        conclusion: 'Dans les trois cas l’EMV **existe, est unique** et vaut $\\hat\\theta_n^{\\mathrm{MV}}=\\bar X_n$, aussi estimateur des moments associé à $T(x)=x$. Piège : oublier les cas $S_n\\in\\{0,n\\}$. (Comportement de $\\ell_n$ quand $n$ augmente : compléments, Ex. 4.4.)',
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-9',
        title: 'Exemple 1.9 — Loi de Poisson : l’EMV peut ne pas être défini',
        source: 'Poly ch.2, Ex. 1.9, p. 17–18',
        setup: '$\\theta\\in\\Theta=\\mathbb{R}_+^\\ast$, $q_\\theta(x)=\\mathrm{e}^{-\\theta}\\theta^x/x!$ par rapport à la mesure de comptage sur $\\mathbb{N}$ ; $n$-échantillon. (Exercice « à vous » du poly : écrire la vraisemblance, isoler les termes dépendant du paramètre, étudier la fonction.)',
        steps: [
          { text: '$\\mathrm{L}_n(\\vartheta)=\\prod_i\\mathrm{e}^{-\\vartheta}\\frac{\\vartheta^{X_i}}{X_i!}=\\frac1{\\prod_iX_i!}\\exp(-n\\vartheta+n\\bar X_n\\log\\vartheta)$, donc $\\ell_n(\\vartheta)=-\\frac1n\\log\\big(\\prod_iX_i!\\big)-\\vartheta+\\bar X_n\\log\\vartheta$.', justification: 'Densité produit ; le terme $-\\frac1n\\log\\prod X_i!$ ne dépend pas de $\\vartheta$ (ne change pas l’argmax).' },
          { text: 'Si $\\bar X_n>0$ : $\\vartheta\\mapsto-\\vartheta+\\bar X_n\\log\\vartheta$ est strictement concave ($-\\bar X_n/\\vartheta^2<0$), dérivée $-1+\\bar X_n/\\vartheta$ nulle en $\\vartheta=\\bar X_n$ seulement : $\\hat\\theta_n^{\\mathrm{MV}}=\\bar X_n$.', justification: 'Lemme 2.3.' },
          { text: 'Si $\\bar X_n=0$ (toutes observations nulles, probabilité $\\mathrm{e}^{-n\\theta}>0$) : $\\vartheta\\mapsto-\\vartheta$ n’a **pas de maximum** sur $\\mathbb{R}_+^\\ast$ : l’EMV **n’est pas défini**.', justification: 'Fonction strictement décroissante sur un ouvert : borne sup non atteinte.' },
        ],
        conclusion: '**Remarque (p. 18) :** pour Bernoulli et Poisson, l’EMV coïncide (lorsqu’il est défini) avec l’estimateur des moments associé à $T(x)=x$, puisque le paramètre est l’espérance d’une observation : phénomène typique des **familles exponentielles** (PC2 Ex. 3, §8).',
      },
      {
        kind: 'theorem',
        id: 'ch2-def-1-6',
        type: 'definition',
        label: 'Définition 1.6',
        title: 'Équations de vraisemblance',
        source: 'Poly ch.2, Déf. 1.6, p. 18',
        hypotheses: ['$\\Theta\\subseteq\\mathbb{R}^d$ ; $\\vartheta\\mapsto\\ell_n(\\vartheta,X_1,\\dots,X_n)$ différentiable sur l’intérieur $\\mathring\\Theta$ de $\\Theta$.'],
        statement: `Le système de $d$ équations

$$\\nabla_\\vartheta\\,\\ell_n(\\vartheta,X_1,\\dots,X_n)=0,\\qquad\\vartheta\\in\\mathring\\Theta,$$

est appelé **équation de vraisemblance** si $d=1$ et **système d’équations de vraisemblance** si $d>1$. Tout estimateur $\\hat\\theta_n^{\\mathrm{rv}}$ solution est appelé **racine de l’équation de vraisemblance**.`,
        intuition: 'Condition **nécessaire** du premier ordre, pas suffisante : si le maximum de $\\ell_n$ est atteint en un point intérieur où $\\ell_n$ est différentiable, l’EMV est une racine ; **la réciproque est fausse** (le système fournit tous les points critiques, maxima et minima locaux).',
        pitfalls: [
          'Là où $\\mathrm{L}_n>0$, $\\mathrm{L}_n$ et $\\ell_n$ ont les mêmes points critiques : $\\nabla\\ell_n=\\nabla\\mathrm{L}_n/(n\\mathrm{L}_n)$.',
          '« Toute racine de l’équation de vraisemblance est un EMV » est **faux** ; l’équation n’a pas de sens si le maximum est au bord (Bernoulli, $S_n\\in\\{0,n\\}$) ou si $\\ell_n$ n’est pas dérivable (uniforme).',
          'Hors modèles simples, pas de forme explicite (Cauchy, compléments Ex. 4.6) : l’EMV s’obtient par optimisation numérique, ou en résolvant un système **puis en vérifiant** que la solution est un maximum.',
        ],
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-10',
        title: 'Exemple 1.10 — Moyenne et variance d’une gaussienne (maximisation en deux temps)',
        source: 'Poly ch.2, Ex. 1.10, p. 19',
        setup: '$n$-échantillon ($n\\ge2$) du modèle gaussien $\\{\\mathcal{N}(\\mu,\\sigma^2),(\\mu,\\sigma^2)\\in\\Theta=\\mathbb{R}\\times\\mathbb{R}_+^\\ast\\}$, densité $q_{(\\mu,\\sigma^2)}(x)=(2\\pi\\sigma^2)^{-1/2}\\exp\\big(-\\frac{(x-\\mu)^2}{2\\sigma^2}\\big)$. Variable libre $\\vartheta=(m,v)$.',
        steps: [
          { text: '$\\ell_n((m,v))=-\\frac12\\log(2\\pi v)-\\frac1{2nv}\\sum_{i=1}^n(X_i-m)^2$ ; équations de vraisemblance : $\\frac{\\partial\\ell_n}{\\partial m}=\\frac1{nv}\\sum_i(X_i-m)=0$ et $\\frac{\\partial\\ell_n}{\\partial v}=-\\frac1{2v}+\\frac1{2nv^2}\\sum_i(X_i-m)^2=0$.', justification: 'Log de la densité produit, dérivées partielles en $m$ et en $v=\\sigma^2$ (pas en $\\sigma$).' },
          { text: '*Premier temps :* à $v$ fixé, $m\\mapsto\\ell_n((m,v))$ est quadratique strictement concave, maximale en $m=\\bar X_n$.', justification: 'Minimisation de $\\sum_i(X_i-m)^2$ (parabole).' },
          { text: '*Second temps :* $v\\mapsto\\ell_n((\\bar X_n,v))=-\\frac12\\log(2\\pi v)-\\frac S{2v}$ avec $S:=\\frac1n\\sum_i(X_i-\\bar X_n)^2>0$ ; dérivée $\\frac{S-v}{2v^2}$, $>0$ pour $v<S$, $<0$ pour $v>S$ : maximum en $v=S$ seulement.', justification: 'Étude du signe de la dérivée (fonction profilée).' },
          { text: 'Pour tout $(m,v)$ : $\\ell_n((m,v))\\le\\ell_n((\\bar X_n,v))\\le\\ell_n((\\bar X_n,S))$ avec égalité ssi $(m,v)=(\\bar X_n,S)$ : existence et unicité. $S>0$ p.s. car les observations ne sont pas toutes égales (loi à densité, $n\\ge2$).', justification: 'Enchaînement des deux maximisations.' },
        ],
        conclusion: `$$\\hat\\theta_n^{\\mathrm{MV}}=\\Big(\\bar X_n,\\ \\frac1n\\sum_{i=1}^n(X_i-\\bar X_n)^2\\Big).$$

**Remarque (p. 19) :** l’EMV de $\\sigma^2$ est la variance empirique **non corrigée** $\\frac1n\\sum_i(X_i-\\bar X_n)^2=\\frac{n-1}nS_n^2$, et non la variance corrigée $S_n^2$ du théorème de Gosset (ch.1) ; par ce théorème $\\mathbb{E}_\\theta[\\hat\\sigma^2_{\\mathrm{MV}}]=\\frac{n-1}n\\sigma^2$ : **l’EMV est biaisé** (biais $-\\sigma^2/n$, Examen 2025 Ex. 2 Q4). La régression linéaire gaussienne (PC2 Ex. 1) conduit au même calcul avec $n-2$ au lieu de $n-1$. Pièges : dériver par rapport à $\\sigma$ au lieu de $v$ (c’est l’autre paramétrisation, Prop. 1.2) ; oublier de vérifier le maximum global.`,
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-11',
        title: 'Exemple 1.11 — Modèle uniforme : une vraisemblance non dérivable',
        source: 'Poly ch.2, Ex. 1.11, p. 19–20',
        setup: '$n$-échantillon de $\\{\\mathcal{U}([0,\\theta]),\\theta\\in\\Theta=\\mathbb{R}_+^\\ast\\}$, $q_\\theta(x)=\\frac1\\theta\\mathbb{1}_{[0,\\theta]}(x)$.',
        steps: [
          { text: 'Les observations étant positives p.s., « $X_i\\in[0,\\vartheta]$ pour tout $i$ » équivaut à $X_{n:n}\\le\\vartheta$ : $\\mathrm{L}_n(\\vartheta)=\\frac1{\\vartheta^n}\\prod_i\\mathbb{1}_{[0,\\vartheta]}(X_i)=\\vartheta^{-n}\\mathbb{1}_{[0,\\vartheta]}(X_{n:n})=\\vartheta^{-n}\\mathbb{1}_{[X_{n:n},+\\infty[}(\\vartheta)$.', justification: 'Produit d’indicatrices = indicatrice de l’intersection.' },
          { text: 'Nulle pour $\\vartheta<X_{n:n}$, strictement décroissante sur $[X_{n:n},+\\infty[$ : maximum $X_{n:n}^{-n}$ atteint en $\\vartheta=X_{n:n}$ seulement : $\\hat\\theta_n^{\\mathrm{MV}}=X_{n:n}$.', justification: 'Étude directe : $0$ à gauche, $\\vartheta^{-n}$ décroissante à droite.' },
        ],
        conclusion: '$\\mathrm{L}_n$ n’est **pas dérivable** en $X_{n:n}$ et $\\ell_n=-\\infty$ sur $]0,X_{n:n}[$ : **l’équation de vraisemblance n’a pas de sens**, le maximum se détermine directement (Méthode 1.2, cas 2). Piège : dériver $\\vartheta^{-n}$, ne trouver aucun point critique et conclure qu’il n’y a pas de maximum ; oublier l’indicatrice. Toute valeur $<X_{n:n}$ est impossible, toute valeur $>X_{n:n}$ dilue la densité. (Figure p. 20 : saut en $X_{n:n}$ puis décroissance en $\\vartheta^{-n}$, d’autant plus rapide que $n$ est grand.)',
      },
      {
        kind: 'viz',
        id: 'ch2-s4-viz-uniforme',
        vizId: 'ch2-emv-uniforme',
        caption: 'Le saut de la vraisemblance uniforme en $X_{n:n}$ (non régulier) comparé au pic lisse de la vraisemblance exponentielle en $1/\\bar X_n$ (régulier), quand $n$ augmente (animation p. 20).',
      },
      {
        kind: 'theorem',
        id: 'ch2-meth-1-2',
        type: 'methode',
        label: 'Méthode 1.2',
        title: 'Explicitation de l’estimateur du maximum de vraisemblance',
        source: 'Poly ch.2, Méthode 1.2, p. 21',
        hypotheses: ['Modèle dominé ; lorsque c’est possible.'],
        statement: `1. Écrire la densité $q_\\vartheta$ par rapport à la mesure dominante, puis $\\mathrm{L}_n(\\vartheta)=\\prod_{i=1}^nq_\\vartheta(X_i)$.
2. **Cas 1, modèles « réguliers »** (gaussien, Poisson, exponentiel, Gamma, Bernoulli) : la vraisemblance est strictement positive et dérivable sur l’intérieur de $\\Theta$.
   a. Écrire $\\ell_n(\\vartheta)=\\frac1n\\log\\mathrm{L}_n(\\vartheta)$.
   b. Trouver les points critiques (résoudre les équations de vraisemblance ; un système si $d>1$).
   c. Vérifier que le point critique retenu est un **maximum global** (par concavité, ou étude directe), et **traiter les valeurs des observations pour lesquelles il n’y a pas de point critique**.
3. **Cas 2, modèles non réguliers** (uniforme) : la vraisemblance n’est pas dérivable, ou s’annule sur une partie de $\\Theta$. Déterminer le maximum **directement**, par une étude de la fonction ; **ne pas essayer de différencier**.

Exemples 1.7 à 1.10 : cas 1 ; Exemple 1.11 : cas 2.`,
        intuition: 'Recette d’examen (DIAGNOSTIC §5.5) : log-vraisemblance (écarter les constantes) → équations de vraisemblance → résoudre → **vérifier le maximum global** → cas non dérivable ou contraint → invariance pour une reparamétrisation. Pour un modèle « transformé » ($\\ln X$, $X^c$), passer au modèle induit : les vraisemblances diffèrent d’un facteur indépendant de $\\theta$.',
        pitfalls: ['Sauter l’étape 2c (c’est là que se perdent les points : « racine ⇒ maximum » n’est pas automatique).', 'Oublier les cas sans point critique (Poisson avec $\\bar X_n=0$, mélange PC2 Ex. 2 avec $N_a/n\\le a/b$, PC7 Ex. 4 avec $\\bar X_n<0$ et $\\Theta=\\mathbb{R}_+$).'],
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-12',
        title: 'Exemple 1.12 — L’EMV n’est pas toujours défini',
        source: 'Poly ch.2, Ex. 1.12, p. 21',
        setup: '$q_0(x)=\\dfrac{\\mathrm{e}^{-|x|/2}}{2\\sqrt{2\\pi|x|}}$ pour $x\\ne0$, prolongée par $0$ en $0$ ; $n$-échantillon du modèle de translation $\\{q_0(\\cdot-\\theta)\\cdot\\mathrm{Leb},\\theta\\in\\mathbb{R}\\}$.',
        steps: [
          { text: '$q_0$ est une densité : $\\int_{\\mathbb{R}}q_0=\\int_0^{+\\infty}(2\\pi x)^{-1/2}\\mathrm{e}^{-x/2}\\,\\mathrm{d}x=1$.', justification: 'Parité, puis intégrale de la densité $\\chi^2(1)$.' },
          { text: 'Les observations sont deux à deux distinctes p.s. ; quand $\\vartheta\\to X_i$, $q_0(X_i-\\vartheta)\\to+\\infty$ tandis que les autres facteurs tendent vers $q_0(X_j-X_i)\\in]0,+\\infty[$ : $\\mathrm{L}_n(\\vartheta)=\\prod_jq_0(X_j-\\vartheta)\\to+\\infty$.', justification: 'Singularité en $|x|^{-1/2}$ ; continuité de $q_0$ hors de 0.' },
        ],
        conclusion: 'La vraisemblance **n’est pas majorée**, $\\argmax_{\\vartheta}\\mathrm{L}_n(\\vartheta)=\\emptyset$ : **l’EMV n’est pas défini**. Une densité non bornée permet de « coller » le paramètre sur une observation.',
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-13',
        title: 'Exemple 1.13 — Modèle de Laplace : non-unicité du maximum de vraisemblance',
        source: 'Poly ch.2, Ex. 1.13, p. 21–22',
        setup: '$n$-échantillon du modèle de Laplace $q_\\theta(x)=\\frac12\\exp(-|x-\\theta|)$, $\\theta\\in\\mathbb{R}$.',
        steps: [
          { text: '$\\ell_n(\\vartheta)=-\\log2-\\frac1n\\sum_i|X_i-\\vartheta|$ : maximiser $\\ell_n$ revient à minimiser $\\varphi:\\vartheta\\mapsto\\sum_i|X_i-\\vartheta|$, continue, convexe, affine par morceaux.', justification: 'Log de la densité produit.' },
          { text: 'Hors des observations, $\\varphi\'(\\vartheta)=-\\sum_i\\mathrm{signe}(X_i-\\vartheta)$ ; pour $\\vartheta\\in]X_{k:n},X_{k+1:n}[$, $\\varphi\'(\\vartheta)=k-(n-k)=2k-n$ : $<0$ si $k<n/2$, $>0$ si $k>n/2$.', justification: 'Dérivée de $|X_i-\\vartheta|$ en $\\vartheta$ : $-\\mathrm{signe}(X_i-\\vartheta)$ ; comptage ($k$ observations $<\\vartheta$, $n-k$ observations $>\\vartheta$).' },
          { text: '$n=2m+1$ : $\\varphi$ décroît strictement sur $]-\\infty,X_{m+1:n}]$ et croît strictement sur $[X_{m+1:n},+\\infty[$ : minimum unique, $\\hat\\theta_n^{\\mathrm{MV}}=X_{m+1:n}$ (médiane empirique).', justification: 'Fonction continue, signe de la dérivée par morceaux.' },
          { text: '$n=2m$ : $\\varphi$ est **constante** sur $[X_{m:n},X_{m+1:n}]$ (dérivée $2m-n=0$) : **infinité de solutions**, tout point de l’intervalle **fermé** $[X_{m:n},X_{m+1:n}]$ est un EMV ; la médiane $\\frac12(X_{m:n}+X_{m+1:n})$ en est un parmi d’autres.', justification: 'Plateau de la fonction affine par morceaux.' },
        ],
        conclusion: 'La médiane minimise la somme des écarts absolus. Pièges : intervalle **fermé** ici (EMV) vs intervalle **ouvert** $]X_{m:n},X_{m+1:n}[$ pour le Z-estimateur (Ex. 1.6) : aux extrémités, $\\sum_i\\mathrm{signe}(X_i-X_{m:n})=1\\ne0$, mais elles minimisent $\\varphi$ par continuité. (Figure p. 22 : plateau pour $n=50$, point unique pour $n=51$.)',
      },
      {
        kind: 'viz',
        id: 'ch2-s4-viz-laplace',
        vizId: 'ch2-laplace-mediane',
        caption: 'La fonction $\\vartheta\\mapsto\\sum_i|X_i-\\vartheta|$ : plateau pour $n$ pair, minimiseur unique pour $n$ impair ; ajoutez une observation pour changer la parité.',
      },
    ],
  },
]
