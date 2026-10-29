import type { CourseSection } from '../types'

/** Sections 1 à 4 du cours : intuition et notations, modes de convergence, LGN/TCL, consistance et normalité asymptotique. */
export const coursePart1: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 1. Intuition et notations
  // -------------------------------------------------------------------------
  {
    id: 'ch6-s1-intuition',
    title: '1. Intuition et notations : pourquoi faire tendre n vers l’infini',
    role: 'intuition',
    intro:
      'Les chapitres 1 à 5 travaillaient à $n$ fixé avec des calculs **exacts** (biais, EQM, taille, puissance, niveau de confiance). Ces calculs sont l’exception : dès que l’estimateur n’est pas une moyenne empirique dans un modèle gaussien, la loi de la statistique n’est pas explicite. L’idée du chapitre : remplacer la loi exacte par une **loi limite** quand $n\\to\\infty$, qui ne dépend du modèle que par quelques caractéristiques (espérance, variance) et qui est le plus souvent gaussienne.',
    blocks: [
      {
        kind: 'text',
        id: 'ch6-s1-pourquoi',
        title: 'Deux propriétés recherchées (Poly ch.6, introduction p. 7–8)',
        text: `Deux questions restent ouvertes après les chapitres 1–5 : (i) comparer deux estimateurs dont l’EQM n’est pas calculable et construire une région de confiance sans loi explicite ; (ii) choisir le seuil d’un test quand la loi de la statistique est inconnue.

On demande à un estimateur deux choses :

- la **consistance** : l’erreur $T_n-g(\\theta)$ devient petite en probabilité ;
- la **normalité asymptotique** : l’erreur remise à l’échelle $\\sqrt n$ se comporte comme une gaussienne, dont la variance mesure la précision.

La **loi des grands nombres** et le **théorème de la limite centrale** donnent ces deux propriétés pour une moyenne empirique ; le **théorème de continuité**, le **lemme de Slutsky** et la **méthode-δ** les transportent à toute fonction régulière d’une moyenne empirique. C’est la chaîne complète que l’examen demande (Examen 2025 Ex. 2 Q6–Q10).

**Piège (p. 8) :** les garanties ne valent **qu’à la limite** : un test de niveau asymptotique $\\alpha$ ne dit rien de sa taille pour le $n$ dont on dispose ; une région de niveau asymptotique $1-\\alpha$ peut couvrir avec une probabilité sensiblement différente à $n$ fixé (Wald contre Wilson, §6).`,
      },
      {
        kind: 'text',
        id: 'ch6-s1-notations',
        title: 'Notations du poly (à reproduire telles quelles)',
        text: `- **Suite d’expériences** $\\{(\\mathsf{Z}_n,\\mathcal{Z}_n,\\{\\mathbb{P}_{n,\\theta}:\\theta\\in\\Theta\\}):n\\in\\mathbb{N}\\}$ : espaces d’observations en lettres sans empattement $\\mathsf{Z}_n$, tribus calligraphiques $\\mathcal{Z}_n$, probabilités **doublement indexées** $\\mathbb{P}_{n,\\theta}$ (expérience $n$, paramètre $\\theta$) ; $\\mathbb{E}_{n,\\theta}$, $\\mathrm{Var}_{n,\\theta}$ ; $Z_n$ l’observation de la $n$-ième expérience.
- **Loi d’une observation** $\\mathbb{Q}_\\theta$ (ou $Q$ sans paramètre) ; pour un $n$-échantillon $\\mathbb{P}_{n,\\theta}=\\mathbb{Q}_\\theta^{\\otimes n}$ ; statistiques canoniques $X_i:(x_1,\\dots,x_n)\\mapsto x_i$.
- Sans paramètre (énoncés probabilistes) : $(\\mathsf{Y}_n,\\mathcal{Y}_n,\\mathbb{P}_n)$, $\\mathbb{E}_n$ ; sur un espace fixe (Outils) : $(\\Omega,\\mathcal{F},\\mathbb{P})$.
- **Convergence en probabilité** : probabilité au-dessus de la flèche, $T_n(Z_n)\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}g(\\theta)$.
- **Convergence en loi** : double flèche surmontée de la probabilité, $Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$ ou $Y_n\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}Y$.
- **Moyenne empirique** $\\bar X_n:=n^{-1}\\sum_{k=1}^nX_k$ ; **variances empiriques** $\\hat\\sigma_n^2:=\\frac1n\\sum_i(X_i-\\bar X_n)^2$ (normalisée par $n$) et $S_n^2:=\\frac1{n-1}\\sum_i(X_i-\\bar X_n)^2=\\frac n{n-1}\\hat\\sigma_n^2$ (corrigée). Attention : dans la PC6 Ex. 3, $S_n^2$ est normalisée par $n$.
- **Dérivée** notée par un point : $\\dot g(\\theta)$ ; matrice jacobienne $J_g(\\theta)$ ; vitesse $r_n$ ; variance asymptotique $v(\\theta)$, covariance asymptotique $\\Sigma(\\theta)$.
- **Quantiles gaussiens** $z_u$ (quantile d’ordre $u$ de $\\mathcal{N}(0,1)$), donc $z_{1-\\alpha/2}$ ; fonction de répartition $\\Phi$ ; masse de Dirac $\\delta_c$.
- **Statistiques d’ordre** $X_{n:n}=\\max(X_1,\\dots,X_n)$, $X_{1:n}=\\min$.
- **Loi exponentielle** $\\mathcal{E}(\\lambda)$ paramétrée par l’**intensité** : densité $\\lambda e^{-\\lambda x}$, moyenne $1/\\lambda$ ; ainsi $\\mathcal{E}(\\theta^{-1})$ a pour moyenne $\\theta$.
- $\\gamma:=\\int(x-\\mu)^4Q(\\mathrm{d}x)-\\sigma^4$ : variance limite de $\\sqrt n(\\hat\\sigma_n^2-\\sigma^2)$ ; $G_n$ : fonction asymptotiquement pivotale ; $\\mathcal{C}_n(Z_n)$ : région de confiance.`,
      },
      {
        kind: 'theorem',
        id: 'ch6-def-1-1',
        type: 'definition',
        label: 'Définition 1.1',
        title: 'Suite d’expériences statistiques',
        source: 'Poly ch.6, Déf. 1.1, p. 9',
        hypotheses: ['$\\Theta\\subseteq\\mathbb{R}^d$ ne dépend pas de $n$.'],
        statement: `Une *suite d’expériences statistiques* est une famille

$$\\{(\\mathsf{Z}_n,\\mathcal{Z}_n,\\{\\mathbb{P}_{n,\\theta}:\\theta\\in\\Theta\\}):n\\in\\mathbb{N}\\},\\qquad\\Theta\\subseteq\\mathbb{R}^d,$$

c’est-à-dire la donnée, pour chaque $n\\in\\mathbb{N}$, d’une expérience statistique $(\\mathsf{Z}_n,\\mathcal{Z}_n,\\{\\mathbb{P}_{n,\\theta}:\\theta\\in\\Theta\\})$ dont l’espace des paramètres $\\Theta$ **ne dépend pas de $n$**. On note $Z_n$ l’observation de la $n$-ième expérience, $\\mathbb{E}_{n,\\theta}$ l’espérance et $\\mathrm{Var}_{n,\\theta}$ la variance sous $\\mathbb{P}_{n,\\theta}$.`,
        intuition: 'Quand $n$ change, l’espace des observations change ; on se donne donc une *suite* d’expériences. Le paramètre inconnu est commun à toutes : c’est ce qui donne un sens à « estimer $\\theta$ d’autant mieux que $n$ est grand ».',
        pitfalls: ['La définition ne suppose **ni indépendance ni identité des lois** : elle couvre aussi des observations dépendantes ou non identiquement distribuées.', 'Les variables « changent d’espace » avec $n$ : la convergence presque sûre n’a pas de sens dans ce cadre (Prop. 1.1, hors programme).'],
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-1',
        title: 'Exemple 1.1 — Suite de n-échantillons (le cadre i.i.d.)',
        source: 'Poly ch.6, Ex. 1.1, p. 9',
        setup: 'Soit $(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta:\\theta\\in\\Theta\\})$ une expérience statistique, $\\Theta\\subseteq\\mathbb{R}^d$. On construit la suite d’expériences **produit** associée.',
        steps: [
          {
            text: 'Pour tout $n\\in\\mathbb{N}$ : $\\mathsf{Z}_n:=\\mathsf{X}^n$, $\\mathcal{Z}_n:=\\mathcal{X}^{\\otimes n}$, $\\mathbb{P}_{n,\\theta}:=\\mathbb{Q}_\\theta^{\\otimes n}$, $\\theta\\in\\Theta$.',
            justification: 'Définition de la mesure produit ; l’espace des paramètres $\\Theta$ est le même pour tout $n$ (Déf. 1.1).',
          },
          {
            text: 'On définit sur $\\mathsf{X}^n$ les *statistiques canoniques* $X_i:(x_1,\\dots,x_n)\\mapsto x_i$. Pour $(n,\\theta)$ fixés, sous $\\mathbb{P}_{n,\\theta}$, $X_1,\\dots,X_n$ sont indépendantes et le modèle induit par chaque $X_i$ est $(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta\\})$.',
            justification: 'Indépendance par définition de la mesure produit ; chaque marginale de $\\mathbb{Q}_\\theta^{\\otimes n}$ est $\\mathbb{Q}_\\theta$.',
          },
        ],
        conclusion: 'C’est le cadre i.i.d. habituel, écrit de façon à faire varier $n$. Dans la quasi-totalité du cours et des annales, la $n$-ième expérience est celle d’un $n$-échantillon.',
      },
      {
        kind: 'theorem',
        id: 'ch6-prop-1-1',
        type: 'proposition',
        label: 'Proposition 1.1',
        title: 'Produit infini d’expériences statistiques',
        source: 'Poly ch.6, Prop. 1.1, p. 10 (encadré « Complément, hors programme »)',
        scope: 'hors-programme',
        hypotheses: ['$(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta:\\theta\\in\\Theta\\})$ expérience statistique.'],
        statement: 'Posons $\\mathsf{Z}:=\\mathsf{X}^{\\mathbb{N}}$, $\\mathcal{Z}:=\\mathcal{X}^{\\otimes\\mathbb{N}}$ et $X_k(z):=x_k$. Il existe sur $(\\mathsf{Z},\\mathcal{Z})$ une famille $\\{\\mathbb{P}_\\theta:\\theta\\in\\Theta\\}$ telle que, pour tout $\\theta$, tout $n$ et tout $C_n\\in\\mathcal{X}^{\\otimes n}$, $\\mathbb{P}_\\theta((X_1,\\dots,X_n)\\in C_n)=\\mathbb{Q}_\\theta^{\\otimes n}(C_n)$. On dit que $\\{X_k,k\\in\\mathbb{N}^*\\}$ est un *échantillon* du modèle $\\{\\mathbb{Q}_\\theta\\}$.',
        intuition: 'Preuve admise dans le poly (théorème d’extension de Carathéodory). Une seule probabilité $\\mathbb{P}_\\theta$ gouverne toutes les statistiques à la fois ; c’est le seul cadre où la convergence presque sûre a un sens (Thm 4.3).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 2. Modes de convergence
  // -------------------------------------------------------------------------
  {
    id: 'ch6-s2-convergences',
    title: '2. Modes de convergence : consistance, convergence en loi, Slutsky',
    role: 'definitions',
    intro:
      'Deux modes de convergence structurent le chapitre : la **convergence en probabilité** (consistance, Déf. 1.2) et la **convergence en loi** (Déf. 1.4). On les relie par le lemme de Slutsky (Lemme 1.1) et le Théorème 2.2 ; on les transporte par les théorèmes de continuité (Thm 1.1, 1.4, 2.1).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch6-def-1-2',
        type: 'definition',
        label: 'Définition 1.2',
        title: 'Suite d’estimateurs consistante',
        source: 'Poly ch.6, Déf. 1.2, p. 10',
        hypotheses: [
          'Suite d’expériences statistiques $\\{(\\mathsf{Z}_n,\\mathcal{Z}_n,\\{\\mathbb{P}_{n,\\theta}:\\theta\\in\\Theta\\}):n\\in\\mathbb{N}\\}$, $\\Theta\\subseteq\\mathbb{R}^d$.',
          '$g:\\Theta\\to\\mathbb{R}^\\ell$ ; estimateurs $T_n:(\\mathsf{Z}_n,\\mathcal{Z}_n)\\to(\\mathbb{R}^\\ell,\\mathcal{B}(\\mathbb{R}^\\ell))$ ; $\\|\\cdot\\|$ norme euclidienne.',
        ],
        statement: `La suite $\\{T_n,n\\in\\mathbb{N}^*\\}$ est dite *consistante* pour $g$ si

$$\\forall\\theta\\in\\Theta,\\quad\\forall\\varepsilon>0,\\qquad\\lim_{n\\to\\infty}\\mathbb{P}_{n,\\theta}\\big(\\|T_n(Z_n)-g(\\theta)\\|\\ge\\varepsilon\\big)=0.$$

On écrit alors $T_n(Z_n)\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}g(\\theta)$.`,
        intuition: 'L’erreur devient petite « en probabilité » : la probabilité qu’elle dépasse un seuil fixé tend vers 0. C’est la Déf. 2.1 (convergence en probabilité) écrite pour une limite constante $g(\\theta)$, ce qui permet de travailler sur des espaces qui changent avec $n$.',
        pitfalls: ['La convergence est demandée **pour chaque** $\\theta$, sans aucune uniformité en $\\theta$.', 'Ne renseigne pas sur la **vitesse** : une erreur d’ordre $1/\\sqrt n$ comme d’ordre $1/\\ln n$ satisfait la définition.'],
      },
      {
        kind: 'theorem',
        id: 'ch6-def-1-3',
        type: 'definition',
        label: 'Définition 1.3',
        title: 'Suite d’estimateurs asymptotiquement sans biais',
        source: 'Poly ch.6, Déf. 1.3, p. 10',
        hypotheses: ['Cadre de la Déf. 1.2 ; $T_n$ intégrable sous $\\mathbb{P}_{n,\\theta}$.'],
        statement: '$\\{T_n,n\\in\\mathbb{N}^*\\}$ est *asymptotiquement sans biais* pour $g$ si, pour tout $\\theta\\in\\Theta$, $\\lim_{n\\to\\infty}\\mathbb{E}_{n,\\theta}[T_n(Z_n)]=g(\\theta)$.',
        intuition: 'Les deux propriétés (Déf. 1.2 et 1.3) **ne se déduisent pas l’une de l’autre** (poly p. 10–11) : l’absence de biais asymptotique ne porte que sur l’espérance et laisse la dispersion libre ; la consistance ne dit rien de l’espérance, qui peut ne pas exister.',
        pitfalls: ['Confondre « consistant » et « asymptotiquement sans biais ». Exemple : une suite d’espérance $\\to g(\\theta)$ mais de variance qui ne diminue pas n’est pas consistante.'],
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-2',
        title: 'Exemple 1.2 — Support d’une loi uniforme : le maximum est consistant',
        source: 'Poly ch.6, Ex. 1.2, p. 11',
        setup: 'Suite de modèles $\\{\\mathcal{U}^{\\otimes n}([0,\\theta]):\\theta\\in\\Theta:=\\mathbb{R}_+^*\\}$ ; EMV $\\hat\\theta_n:=\\max(X_1,\\dots,X_n)=X_{n:n}$. Montrer que $\\{\\hat\\theta_n\\}$ est consistante et asymptotiquement sans biais.',
        steps: [
          {
            text: 'Soit $\\theta>0$ et $\\varepsilon\\in\\,]0,\\theta[$. Comme $\\mathbb{P}_{n,\\theta}(\\hat\\theta_n\\le\\theta)=1$ : $\\mathbb{P}_{n,\\theta}(|\\hat\\theta_n-\\theta|>\\varepsilon)=\\mathbb{P}_{n,\\theta}(\\hat\\theta_n<\\theta-\\varepsilon)=\\mathbb{P}_{n,\\theta}(X_1<\\theta-\\varepsilon,\\dots,X_n<\\theta-\\varepsilon)$.',
            justification: 'L’erreur est toujours du même signe ; le maximum est $<a$ si et seulement si toutes les observations le sont.',
          },
          {
            text: '$=\\prod_{i=1}^n\\mathbb{P}_{n,\\theta}(X_i<\\theta-\\varepsilon)=(1-\\varepsilon/\\theta)^n$.',
            justification: 'Indépendance des statistiques canoniques sous $\\mathbb{P}_{n,\\theta}$ (Ex. 1.1), puis loi uniforme.',
          },
          {
            text: '$(1-\\varepsilon/\\theta)^n\\to0$ ; pour $\\varepsilon\\ge\\theta$ la probabilité est nulle. D’où la consistance (Déf. 1.2).',
            justification: 'Suite géométrique de raison dans $]0,1[$.',
          },
          {
            text: '$\\mathbb{E}_{n,\\theta}[\\hat\\theta_n]=\\frac n{n+1}\\theta\\to\\theta$ : asymptotiquement sans biais (Déf. 1.3).',
            justification: 'Calcul d’espérance d’une statistique d’ordre (exercice 1 de la feuille de la semaine 3).',
          },
        ],
        conclusion: 'L’histogramme de $\\hat\\theta_n$ se resserre contre $\\theta$. La bonne échelle n’est **pas** $1/\\sqrt n$ : $(1-\\varepsilon/\\theta)^n$ est petit dès que $\\varepsilon$ est d’ordre $1/n$ ; c’est $n(\\theta-\\hat\\theta_n)$ qui a une loi limite (Ex. 1.5).',
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-1-1',
        type: 'theoreme',
        label: 'Théorème 1.1',
        title: 'Théorème de continuité',
        source: 'Poly ch.6, Thm 1.1, p. 12',
        hypotheses: [
          '$\\{T_n\\}$ suite **consistante** d’estimateurs de $g(\\theta)$, $g:\\Theta\\to\\mathbb{R}^\\ell$.',
          '$\\varphi:\\mathbb{R}^\\ell\\to\\mathbb{R}^q$ **continue en tout point de $g(\\Theta)$** (pas nécessairement partout).',
        ],
        statement: '$\\{\\varphi(T_n),n\\in\\mathbb{N}\\}$ est une suite consistante d’estimateurs de $\\varphi\\circ g$.',
        intuition: 'Toute fonction continue d’un estimateur consistant estime la même fonction de la quantité estimée. « Le résultat le plus économique du chapitre, et celui dont on se sert le plus souvent. »',
        proof: [
          {
            text: 'Soient $\\theta\\in\\Theta$ et $\\varepsilon>0$. Il existe $\\delta>0$ tel que $\\|u-g(\\theta)\\|\\le\\delta\\Rightarrow\\|\\varphi(u)-\\varphi(g(\\theta))\\|<\\varepsilon$.',
            justification: 'Définition de la continuité de $\\varphi$ au point $g(\\theta)$.',
          },
          {
            text: 'Donc $\\{\\|\\varphi(T_n)-\\varphi\\circ g(\\theta)\\|\\ge\\varepsilon\\}\\subseteq\\{\\|T_n-g(\\theta)\\|>\\delta\\}$.',
            justification: 'Contraposée de l’implication précédente, appliquée à $u=T_n$.',
          },
          {
            text: '$\\mathbb{P}_{n,\\theta}(\\|\\varphi(T_n)-\\varphi\\circ g(\\theta)\\|\\ge\\varepsilon)\\le\\mathbb{P}_{n,\\theta}(\\|T_n-g(\\theta)\\|>\\delta)\\xrightarrow[n\\to\\infty]{}0$.',
            justification: 'Croissance de la probabilité, puis consistance de $T_n$ (Déf. 1.2 avec le seuil $\\delta$).',
          },
        ],
        pitfalls: ['La continuité n’est requise **qu’aux points de $g(\\Theta)$** : $u\\mapsto1/u$ n’est pas continue en $0$, mais $0\\notin\\{1/\\theta:\\theta>0\\}$ (Ex. 1.3).', 'Version « vecteurs aléatoires » (Thm 2.1) : si $X_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}X$ et $\\varphi$ continue sur $C$ avec $\\mathbb{P}(X\\in C)=1$, alors $\\varphi(X_n)\\xrightarrow{\\mathbb{P}_n\\text{-prob}}\\varphi(X)$.'],
      },
      {
        kind: 'text',
        id: 'ch6-s2-fonctions-moyenne',
        title: 'Application : estimateurs construits sur une moyenne empirique (p. 12)',
        text: 'Beaucoup d’estimateurs s’écrivent $\\varphi\\big(\\frac1n\\sum_{k=1}^nX_k\\big)$ : par construction les estimateurs des moments (chapitre 2), et après calcul nombre d’EMV ($1/\\bar X_n$ pour l’exponentielle, $2/\\bar X_n$ pour $\\Gamma(2,\\theta)$, $\\exp(-\\bar X_n)$ pour $\\mathbb{P}_\\theta(X=0)$ en Poisson…). Leur consistance résulte de deux ingrédients : la **LGN** pour la moyenne empirique (Thm 1.2, §3) et le **théorème de continuité** 1.1 pour la fonction appliquée. Schéma à retenir et à écrire tel quel à l’examen.',
      },
      {
        kind: 'viz',
        id: 'ch6-s2-viz-proba',
        vizId: 'ch6-convergence-proba',
        caption: 'Consistance de $\\bar X_n$ : la définition porte sur la fréquence, à $n$ fixé, de l’événement $\\{|\\bar X_n-\\mu|\\ge\\varepsilon\\}$ (bande rouge), pas sur une trajectoire particulière.',
      },
      {
        kind: 'theorem',
        id: 'ch6-def-1-4',
        type: 'definition',
        label: 'Définition 1.4',
        title: 'Convergence en loi',
        source: 'Poly ch.6, Déf. 1.4, p. 14',
        hypotheses: [
          '$\\{(\\mathsf{Y}_n,\\mathcal{Y}_n,\\mathbb{P}_n):n\\in\\mathbb{N}^*\\}$ suite d’espaces de probabilité, $Y_n:(\\mathsf{Y}_n,\\mathcal{Y}_n)\\to(\\mathbb{R}^d,\\mathcal{B}(\\mathbb{R}^d))$.',
          '$\\mu$ probabilité sur $(\\mathbb{R}^d,\\mathcal{B}(\\mathbb{R}^d))$.',
        ],
        statement: `$\\{Y_n\\}$ *converge en loi* vers $\\mu$ si, pour toute fonction **continue bornée** $f:\\mathbb{R}^d\\to\\mathbb{R}$,

$$\\lim_{n\\to\\infty}\\mathbb{E}_n[f(Y_n)]=\\int f(y)\\,\\mu(\\mathrm{d}y).$$

On note $Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$. Si $\\mu$ est la loi d’un vecteur $Y$, on écrit aussi $Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}Y$ ; seule la loi de $Y$ intervient.`,
        intuition: 'La consistance ne donne pas la vitesse ; on compare la **loi** de l’erreur remise à l’échelle à une loi limite. Les variables vivant sur des espaces qui changent avec $n$, la convergence porte sur les lois : on ne peut pas parler de « $Y_n-Y$ petit ». En pratique on passe par Portmanteau (Thm 1.3) ou Lévy (Thm 1.5) plutôt que par la définition.',
        pitfalls: ['L’espace sur lequel $Y$ est défini n’a aucune importance.', 'La convergence des moments n’est pas impliquée (la définition ne porte que sur des $f$ bornées).'],
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-1-3',
        type: 'theoreme',
        label: 'Théorème 1.3',
        title: 'Portmanteau, version simple',
        source: 'Poly ch.6, Thm 1.3, p. 14',
        hypotheses: ['$Y_n:(\\mathsf{Y}_n,\\mathcal{Y}_n)\\to(\\mathbb{R}^d,\\mathcal{B}(\\mathbb{R}^d))$, $\\mu$ loi sur $\\mathbb{R}^d$.'],
        statement: `Il y a équivalence entre :

- (i) $Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$ ;
- (ii) pour toute $f:\\mathbb{R}^d\\to\\mathbb{R}$ **bornée et lipschitzienne** ($|f(x)-f(y)|\\le L_f\\|x-y\\|$), $\\lim_n\\mathbb{E}_n[f(Y_n)]=\\int f\\,\\mathrm{d}\\mu$ ;
- (iii) pour tout pavé $A=\\prod_{i=1}^d\\,]a_i,b_i]$ dont la frontière vérifie $\\mu(\\partial A)=0$, $\\lim_n\\mathbb{P}_n(Y_n\\in A)=\\mu(A)$.

En dimension 1 : $\\mathbb{P}_n(Y_n\\le t)\\to\\mu(]-\\infty,t])$ en tout point $t$ où la fonction de répartition de $\\mu$ est continue.`,
        intuition: 'Preuve admise dans le poly (théorème IV-5.26 du polycopié d’origine). (ii) sert dans les preuves (Slutsky, Thm 2.2) ; (iii) permet d’identifier une loi limite par calcul de probabilités et de passer d’une convergence en loi à une **limite de probabilités d’intervalles** : c’est l’étape « $\\mathcal{N}(0,1)$ ne charge pas les bornes $\\pm z_{1-\\alpha/2}$ » de tous les IC et tests asymptotiques.',
        pitfalls: ['La convergence des fonctions de répartition n’est exigée qu’aux **points de continuité** de la f.d.r. limite ; pour une limite gaussienne, c’est partout.'],
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-4',
        title: 'Exemple 1.4 — Lois uniformes sur {1/n, …, 1}',
        source: 'Poly ch.6, Ex. 1.4, p. 15',
        setup: '$\\mathsf{Y}_n:=\\{1/n,\\dots,(n-1)/n,1\\}$, $\\mathbb{P}_n(\\{k/n\\}):=1/n$, $Y_n(x)=x$. Montrer $Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{U}([0,1])$.',
        steps: [
          { text: 'Pour $t\\in[0,1]$, $\\mathbb{P}_n(Y_n\\le t)=\\lfloor nt\\rfloor/n\\to t$ ; la probabilité vaut $0$ pour $t<0$ et $1$ pour $t>1$.', justification: 'Encadrement $nt-1<\\lfloor nt\\rfloor\\le nt$.' },
          { text: 'La f.d.r. de $\\mathcal{U}([0,1])$ est continue sur $\\mathbb{R}$ : le Théorème 1.3 (iii) conclut.', justification: 'Portmanteau en dimension 1 : convergence des f.d.r. en tout point de continuité.' },
        ],
        conclusion: 'Appliquée à $f$ continue sur $[0,1]$, la définition redonne la convergence des **sommes de Riemann** : $\\frac1n\\sum_{k=1}^nf(k/n)\\to\\int_0^1f(x)\\,\\mathrm{d}x$.',
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-5',
        title: 'Exemple 1.5 — Support d’une loi uniforme : la loi limite de l’erreur est exponentielle, à la vitesse n',
        source: 'Poly ch.6, Ex. 1.5, p. 15 (Figures 1–2)',
        setup: 'Même modèle qu’à l’Ex. 1.2, $\\hat\\theta_n=X_{n:n}$. Montrer que $n(\\theta-\\hat\\theta_n)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{E}(\\theta^{-1})$ (loi exponentielle de moyenne $\\theta$).',
        steps: [
          { text: 'Ex. 1.2 : $\\mathbb{P}_{n,\\theta}(\\theta-\\hat\\theta_n>\\varepsilon)=(1-\\varepsilon/\\theta)^n$ pour $\\varepsilon\\in\\,]0,\\theta[$.', justification: 'Loi du maximum par indépendance.' },
          { text: 'Pour $x>0$, prendre $\\varepsilon=x/n$ (licite dès que $n>x/\\theta$) : $\\mathbb{P}_{n,\\theta}(n(\\theta-\\hat\\theta_n)>x)=\\big(1-\\frac x{n\\theta}\\big)^n\\to e^{-x/\\theta}$.', justification: 'Changement d’échelle, puis limite classique $(1+a/n)^n\\to e^a$.' },
          { text: '$x\\mapsto1-e^{-x/\\theta}$ (prolongée par $0$ sur $\\mathbb{R}_-$) est la f.d.r. de $\\mathcal{E}(\\theta^{-1})$, continue sur $\\mathbb{R}$ ; la convergence des f.d.r. a lieu en tout point.', justification: '$\\mathbb{P}_{n,\\theta}(n(\\theta-\\hat\\theta_n)\\le x)=1-\\mathbb{P}_{n,\\theta}(n(\\theta-\\hat\\theta_n)>x)$ et $\\theta-\\hat\\theta_n\\ge0$ p.s.' },
          { text: 'Portmanteau (Thm 1.3) conclut : $n(\\theta-\\hat\\theta_n)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{E}(\\theta^{-1})$.', justification: 'Thm 1.3 (iii) en dimension 1.' },
        ],
        conclusion: 'La vitesse se lit dans le facteur à mettre devant l’erreur pour obtenir une limite non dégénérée : ici $n$, pas $\\sqrt n$ ; la limite **n’est pas gaussienne** : le modèle uniforme n’est pas régulier (chapitre 3). La normalité asymptotique est le cas le plus fréquent, pas la règle. Même phénomène pour le Pareto translaté (PC6 Ex. 2) et l’exponentielle translatée (CC 2022 Ex. 3).',
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-1-4',
        type: 'theoreme',
        label: 'Théorème 1.4',
        title: 'Transformation continue (convergence en loi)',
        source: 'Poly ch.6, Thm 1.4, p. 17',
        hypotheses: [
          '$Y_n$ à valeurs dans $\\mathbb{R}^d$, $Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$.',
          '$\\varphi:\\mathbb{R}^d\\to\\mathbb{R}^m$ **continue en tout point d’un ensemble $C$ tel que $\\mu(C)=1$**.',
        ],
        statement: '$\\varphi(Y_n)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu_\\varphi$, où $\\mu_\\varphi(A):=\\mu(\\varphi^{-1}(A))$ est la loi image.',
        intuition: 'Une fonction continue préserve la convergence en loi ; la limite est la loi image. Sert pour multiplier par une constante, élever au carré ($x\\mapsto x^2$ : loi $\\chi^2(1)$), inverser ($x\\mapsto1/x$ continue sur $\\mathbb{R}^*$, de mesure 1 pour $\\mathcal{N}(0,1)$).',
        proof: [
          {
            text: 'Cas $\\varphi$ continue sur $\\mathbb{R}^d$ : pour $f$ continue bornée sur $\\mathbb{R}^m$, $f\\circ\\varphi$ est continue bornée, donc $\\mathbb{E}_n[f\\circ\\varphi(Y_n)]\\to\\int f\\circ\\varphi\\,\\mathrm{d}\\mu=\\int f\\,\\mathrm{d}\\mu_\\varphi$.',
            justification: 'Définition 1.4 appliquée à $f\\circ\\varphi$, puis théorème de transfert.',
          },
          {
            text: 'Cas général ($\\varphi$ continue seulement sur $C$, $\\mu(C)=1$) : admis.',
            justification: 'Théorème IV-5.30 du polycopié d’origine (fermés + Portmanteau).',
          },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch6-def-1-5',
        type: 'definition',
        label: 'Définition 1.5',
        title: 'Fonction caractéristique et éq. (1)',
        source: 'Poly ch.6, Déf. 1.5 et éq. (1), p. 17',
        hypotheses: ['$Y$ vecteur aléatoire à valeurs dans $\\mathbb{R}^d$ (vecteurs colonnes).'],
        statement: `La fonction caractéristique de $Y$ est $t\\mapsto\\mathbb{E}[e^{\\mathrm{i}t^\\top Y}]$, $t\\in\\mathbb{R}^d$ ; elle est définie pour tout $t$ et **caractérise la loi**. Si $Y\\sim\\mathcal{N}_d(\\mu,\\Sigma)$,

$$\\mathbb{E}\\big[e^{\\mathrm{i}t^\\top Y}\\big]=\\exp\\big(\\mathrm{i}t^\\top\\mu-\\tfrac12t^\\top\\Sigma t\\big),$$

en particulier $t\\mapsto\\exp(-t^2/2)$ est la fonction caractéristique de $\\mathcal{N}(0,1)$.`,
        intuition: 'Rappel ; sert dans la preuve du TCL (Thm 1.6) et de Slutsky.',
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-1-5',
        type: 'theoreme',
        label: 'Théorème 1.5',
        title: 'Théorème de Lévy',
        source: 'Poly ch.6, Thm 1.5, p. 17',
        hypotheses: ['$Y_n$ à valeurs dans $\\mathbb{R}^d$, $\\mu$ loi sur $\\mathbb{R}^d$.'],
        statement: '$Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$ si et seulement si $\\mathbb{E}_n[\\exp(\\mathrm{i}t^\\top Y_n)]\\to\\int\\exp(\\mathrm{i}t^\\top y)\\,\\mu(\\mathrm{d}y)$ pour tout $t\\in\\mathbb{R}^d$.',
        intuition: 'Le sens direct est immédiat ($\\cos(t^\\top y)$ et $\\sin(t^\\top y)$ sont continues bornées) ; la **réciproque est admise** dans le poly (IV-5.36). Caractérisation utilisée pour démontrer le TCL et Slutsky.',
        proof: [
          { text: 'Sens direct : $y\\mapsto\\cos(t^\\top y)$ et $y\\mapsto\\sin(t^\\top y)$ sont continues bornées.', justification: 'Définition 1.4 de la convergence en loi.' },
          { text: 'Réciproque : admise.', justification: 'Théorème IV-5.36 du polycopié d’origine.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch6-def-2-1',
        type: 'definition',
        label: 'Définition 2.1 (Outils)',
        title: 'Convergence en probabilité sur un espace fixe',
        source: 'Poly ch.6, Outils, Déf. 2.1, p. 36',
        hypotheses: ['$\\{X_n\\}$ et $X$ vecteurs aléatoires à valeurs dans $\\mathbb{R}^d$, **définis sur un même espace** $(\\Omega,\\mathcal{F},\\mathbb{P})$.'],
        statement: '$X_n\\xrightarrow{\\mathbb{P}\\text{-prob}}X$ si pour tout $\\varepsilon>0$, $\\lim_{n\\to\\infty}\\mathbb{P}(\\|X_n-X\\|>\\varepsilon)=0$.',
        intuition: 'La Déf. 1.2 est cette définition pour une limite constante $g(\\theta)$ sous $\\mathbb{P}_{n,\\theta}$. La convergence en loi, elle, ne demande pas que les variables soient sur un même espace.',
      },
      {
        kind: 'theorem',
        id: 'ch6-prop-2-1',
        type: 'proposition',
        label: 'Proposition 2.1 (Outils)',
        title: 'Convergence en probabilité d’un vecteur et de ses coordonnées',
        source: 'Poly ch.6, Outils, Prop. 2.1, p. 36',
        hypotheses: ['$\\{X_n\\}$, $\\{Y_n\\}$ à valeurs dans $\\mathbb{R}^d$, $\\mathbb{R}^p$ ; $X$, $Y$ ; tous sur le même espace.'],
        statement: '$(X_n,Y_n)\\xrightarrow{\\mathbb{P}\\text{-prob}}(X,Y)$ si et seulement si $X_n\\xrightarrow{\\mathbb{P}\\text{-prob}}X$ et $Y_n\\xrightarrow{\\mathbb{P}\\text{-prob}}Y$.',
        intuition: 'Conséquence directe des inégalités $\\|x_1-x_2\\|\\le\\|(x_1,y_1)-(x_2,y_2)\\|\\le\\|x_1-x_2\\|+\\|y_1-y_2\\|$ (inclusions d’événements, sous-additivité). En probabilité, couple $\\iff$ composantes.',
        pitfalls: ['**Faux pour la convergence en loi** : si $X_n\\sim\\mathcal{N}(0,1)$ et $Y_n:=(-1)^nX_n$, chaque composante converge en loi vers $\\mathcal{N}(0,1)$, mais pas le couple, car $X_n+Y_n$ vaut alternativement $2X_n$ et $0$. C’est pourquoi la preuve de Slutsky établit la convergence en loi **du couple**.'],
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-2-1',
        type: 'theoreme',
        label: 'Théorème 2.1 (Outils)',
        title: 'Théorème de continuité, convergence en probabilité',
        source: 'Poly ch.6, Outils, Thm 2.1, p. 36–37',
        hypotheses: ['$X_n\\xrightarrow{\\mathbb{P}\\text{-prob}}X$ dans $\\mathbb{R}^d$.', '$\\varphi:\\mathbb{R}^d\\to\\mathbb{R}^m$ continue en tout point d’un ensemble $C$ avec $\\mathbb{P}(X\\in C)=1$.'],
        statement: '$\\varphi(X_n)\\xrightarrow{\\mathbb{P}\\text{-prob}}\\varphi(X)$. En particulier, si $X_n\\xrightarrow{\\mathbb{P}\\text{-prob}}c$ (constante) et $\\varphi$ continue en $c$, alors $\\varphi(X_n)\\xrightarrow{\\mathbb{P}\\text{-prob}}\\varphi(c)$.',
        intuition: 'Version « vecteurs aléatoires » du Thm 1.1, utilisée dans toutes les preuves (méthode-δ, Prop. 1.2…).',
        proof: [
          { text: 'Soit $\\varepsilon>0$. Pour $\\delta>0$, soit $B_\\delta$ l’ensemble des $x$ pour lesquels il existe $y$ avec $\\|x-y\\|\\le\\delta$ et $\\|\\varphi(x)-\\varphi(y)\\|\\ge\\varepsilon$. Si $x\\notin B_\\delta$ et $\\|\\varphi(x_n)-\\varphi(x)\\|\\ge\\varepsilon$, alors $\\|x_n-x\\|>\\delta$.', justification: 'Définition de $B_\\delta$ (points où $\\varphi$ varie de plus de $\\varepsilon$ à distance $\\le\\delta$).' },
          { text: '$\\mathbb{P}(\\|\\varphi(X_n)-\\varphi(X)\\|\\ge\\varepsilon)\\le\\mathbb{P}(X\\in B_\\delta)+\\mathbb{P}(\\|X_n-X\\|>\\delta)$.', justification: 'Sous-additivité de la probabilité.' },
          { text: 'Le second terme tend vers 0.', justification: 'Convergence en probabilité de $X_n$ vers $X$.' },
          { text: '$\\mathbb{P}(X\\in B_\\delta\\cap C^c)=0$, et $\\lim_{\\delta\\to0}\\mathbb{P}(X\\in B_\\delta\\cap C)=0$.', justification: '$(B_\\delta)_\\delta$ décroît quand $\\delta\\downarrow0$ et $\\bigcap_\\delta B_\\delta\\cap C=\\emptyset$ ($\\varphi$ continue sur $C$) : continuité monotone de la probabilité.' },
          { text: 'Cas constant : $X=c$, $C=\\{c\\}$.', justification: 'Cas particulier de l’énoncé.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-2-2',
        type: 'theoreme',
        label: 'Théorème 2.2 (Outils)',
        title: 'Convergence en probabilité et convergence en loi',
        source: 'Poly ch.6, Outils, Thm 2.2, p. 37',
        hypotheses: ['$\\{X_n\\}$, $X$ sur $(\\Omega,\\mathcal{F},\\mathbb{P})$, à valeurs dans $\\mathbb{R}^d$.'],
        statement: `- (i) $X_n\\xrightarrow{\\mathbb{P}\\text{-prob}}X$ entraîne $X_n\\Longrightarrow X$ ;
- (ii) si $c$ est une **constante**, $X_n\\xrightarrow{\\mathbb{P}\\text{-prob}}c$ si et seulement si $X_n\\Longrightarrow c$ (c’est-à-dire $X_n\\Longrightarrow\\delta_c$).`,
        intuition: 'Hiérarchie : p.s. $\\Rightarrow$ proba $\\Rightarrow$ loi ; et loi vers une constante $\\Rightarrow$ proba. Le sens (ii) sert sans cesse : « asymptotiquement normal $\\Rightarrow$ consistant », « $\\sqrt n(\\bar X_n-\\mu)^2\\Rightarrow0$ donc $\\to0$ en probabilité ».',
        proof: [
          { text: '(i) Soit $f$ lipschitzienne bornée de constante $L_f$ ; pour $\\varepsilon>0$, $|\\mathbb{E}[f(X_n)]-\\mathbb{E}[f(X)]|\\le\\varepsilon L_f+2\\|f\\|_\\infty\\mathbb{P}(\\|X_n-X\\|\\ge\\varepsilon)$.', justification: 'Séparer selon $\\|X_n-X\\|<\\varepsilon$ (lipschitz) ou $\\ge\\varepsilon$ (borne $2\\|f\\|_\\infty$).' },
          { text: 'Le second terme tend vers 0, le premier est arbitrairement petit ; Portmanteau (ii) conclut.', justification: 'Convergence en probabilité, puis Thm 1.3 (ii) avec les fonctions lipschitziennes bornées.' },
          { text: '(ii) Sens direct : (i). Réciproque : $\\mathbb{P}(|X_n-c|>\\varepsilon)=1-\\mathbb{P}(c-\\varepsilon<X_n\\le c+\\varepsilon)\\to1-\\delta_c(]c-\\varepsilon,c+\\varepsilon])=0$.', justification: 'Portmanteau (iii) : la frontière $\\{c\\pm\\varepsilon\\}$ est de $\\delta_c$-mesure nulle (première Remarque après Slutsky).' },
        ],
        pitfalls: ['La convergence **presque sûre** entraîne la convergence en probabilité donc en loi, mais elle n’intervient pas dans ce chapitre (espaces qui changent avec $n$) ; elle apparaît dans la loi forte (Thm 4.3, hors programme).'],
      },
      {
        kind: 'theorem',
        id: 'ch6-prop-2-2',
        type: 'proposition',
        label: 'Proposition 2.2 (Outils)',
        title: 'Convergence des moments et convergence en probabilité',
        source: 'Poly ch.6, Outils, Prop. 2.2, p. 37',
        hypotheses: ['Il existe $p>0$ tel que $\\lim_n\\mathbb{E}[\\|X_n-X\\|^p]=0$.'],
        statement: '$X_n\\xrightarrow{\\mathbb{P}\\text{-prob}}X$.',
        intuition: 'Convergence $L^p$ $\\Rightarrow$ convergence en probabilité. Cas $p=2$ : **EQM $\\to0$ $\\Rightarrow$ consistance** (PC6 Ex. 2 Q7 ; CC 2022 Ex. 2 Q5).',
        proof: [{ text: '$\\mathbb{P}(\\|X_n-X\\|>\\varepsilon)\\le\\mathbb{E}[\\|X_n-X\\|^p]/\\varepsilon^p\\to0$.', justification: 'Inégalité de Markov (Lemme 2.1) appliquée à $\\|X_n-X\\|^p$.' }],
      },
      {
        kind: 'theorem',
        id: 'ch6-lem-2-1',
        type: 'lemme',
        label: 'Lemme 2.1 (Outils)',
        title: 'Inégalités de Markov et de Bienaymé-Tchebychev',
        source: 'Poly ch.6, Outils, Lemme 2.1, p. 38',
        hypotheses: ['$Y$ v.a.r. **positive**, $a>0$.', '$W$ v.a.r. de carré intégrable, $\\varepsilon>0$.'],
        statement: '$$\\mathbb{P}(Y\\ge a)\\le\\frac{\\mathbb{E}[Y]}a,\\qquad\\mathbb{P}(|W-\\mathbb{E}[W]|\\ge\\varepsilon)\\le\\frac{\\mathrm{Var}(W)}{\\varepsilon^2}.$$',
        intuition: 'Outil de base des preuves de consistance (LGN faible, EQM $\\to0$).',
        proof: [
          { text: '$a\\mathbb{1}_{\\{Y\\ge a\\}}\\le Y$, puis prendre l’espérance.', justification: 'Croissance de l’espérance.' },
          { text: 'Appliquer la première inégalité à $Y:=(W-\\mathbb{E}[W])^2$ et $a:=\\varepsilon^2$.', justification: '$\\{|W-\\mathbb{E}[W]|\\ge\\varepsilon\\}=\\{(W-\\mathbb{E}[W])^2\\ge\\varepsilon^2\\}$.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch6-lem-1-1',
        type: 'lemme',
        label: 'Lemme 1.1',
        title: 'Lemme de Slutsky',
        source: 'Poly ch.6, Lemme 1.1, p. 20 (preuve p. 20–21)',
        hypotheses: [
          '$\\{(\\mathsf{Z}_n,\\mathcal{Z}_n,\\mathbb{P}_n):n\\in\\mathbb{N}\\}$ ; $X_n$, $Y_n$ v.a. **réelles** sur $(\\mathsf{Z}_n,\\mathcal{Z}_n)$ ; $\\mu$ probabilité sur $\\mathbb{R}$.',
          '$X_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$.',
          '$Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\delta_c$ avec **$c$ constante** (de façon équivalente, $Y_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}c$).',
        ],
        statement: `Avec $X\\sim\\mu$ :

- (i) $X_n+Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}X+c$ ;
- (ii) $Y_nX_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}cX$ ;
- (iii) si $c\\ne0$ et $\\mathbb{P}_n(Y_n\\ne0)=1$ pour tout $n$, $Y_n^{-1}X_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}c^{-1}X$.`,
        intuition: 'Ce qui converge vers une constante se comporte, à la limite, comme cette constante, même combiné à une suite qui converge en loi. Utilisé dans presque toutes les démonstrations de la fin du chapitre : remplacer $\\sigma$ par $S_n$ dans un IC (assertion (iii)), négliger un terme qui tend vers 0 en probabilité (Remarque 2), passer de la normalité asymptotique à la consistance (multiplier par $1/\\sqrt n\\to0$).',
        proof: [
          {
            text: 'Écrire $\\begin{pmatrix}X_n\\\\Y_n\\end{pmatrix}=\\underbrace{\\begin{pmatrix}0\\\\Y_n-c\\end{pmatrix}}_{U_n}+\\underbrace{\\begin{pmatrix}X_n\\\\c\\end{pmatrix}}_{V_n}$. Par hypothèse $Y_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}c$, donc $U_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0$.',
            justification: 'Convergence en loi vers une masse de Dirac $\\iff$ convergence en probabilité (Remarque 1 / Thm 2.2 (ii)).',
          },
          {
            text: '$V_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\nu:=\\mu\\otimes\\delta_c$ : pour $t_1,t_2\\in\\mathbb{R}$, $\\mathbb{E}_n[e^{\\mathrm{i}t_1X_n}e^{\\mathrm{i}t_2c}]=e^{\\mathrm{i}t_2c}\\,\\mathbb{E}_n[e^{\\mathrm{i}t_1X_n}]\\to e^{\\mathrm{i}t_2c}\\int e^{\\mathrm{i}t_1x}\\mu(\\mathrm{d}x)$, fonction caractéristique de $\\mu\\otimes\\delta_c$ en $(t_1,t_2)$.',
            justification: 'Lévy en dimension 1 appliqué à $X_n$ (sens direct), puis Lévy en dimension 2 (réciproque).',
          },
          {
            text: 'Si $U_n\\to0$ en probabilité et $V_n\\Rightarrow\\nu$, alors $U_n+V_n\\Rightarrow\\nu$ : pour $f$ lipschitzienne bornée et $\\delta>0$, $\\big|\\mathbb{E}_n[f(U_n+V_n)]-\\int f\\,\\mathrm{d}\\nu\\big|\\le L_f\\delta+2\\|f\\|_\\infty\\mathbb{P}_n(\\|U_n\\|\\ge\\delta)+\\big|\\mathbb{E}_n[f(V_n)]-\\int f\\,\\mathrm{d}\\nu\\big|$ ; à $\\delta$ fixé les deux derniers termes tendent vers 0, le premier est arbitrairement petit.',
            justification: 'Inégalité triangulaire, séparation des événements $\\{\\|U_n\\|<\\delta\\}$ et $\\{\\|U_n\\|\\ge\\delta\\}$, puis Portmanteau (ii).',
          },
          {
            text: 'Donc $(X_n,Y_n)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu\\otimes\\delta_c$. On applique la transformation continue avec $(x,y)\\mapsto x+y$, $(x,y)\\mapsto xy$ (continues sur $\\mathbb{R}^2$) et $(x,y)\\mapsto x/y$, continue sur $C:=\\mathbb{R}\\times\\mathbb{R}^*$ avec $(\\mu\\otimes\\delta_c)(C)=\\delta_c(\\mathbb{R}^*)=1$ si $c\\ne0$. Les lois images sont celles de $X+c$, $cX$, $c^{-1}X$.',
            justification: 'Théorème 1.4 (transformation continue, version « continue sur un ensemble de mesure 1 »).',
          },
        ],
        pitfalls: [
          'La limite de $Y_n$ doit être une **constante** (déterministe). La clé est la convergence en loi du **couple** $(X_n,Y_n)$ ; la convergence en loi de chaque composante ne suffit pas en général (contre-exemple $Y_n=(-1)^nX_n$, Prop. 2.1).',
          '**Trois remarques du poly (p. 20).** (1) $Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\delta_c\\iff Y_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}c$. (2) Si $U_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\nu$ et $V_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0$, alors $U_n+V_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\nu$. (3) Dans un IC asymptotique, si $\\sigma$ est inconnu, on le remplace par un estimateur consistant : c’est l’assertion (iii).',
          'Le lemme s’étend au cas vectoriel et matriciel (Thm 4.1, compléments) ; c’est cette forme qu’on utilise sans la nommer quand $T_n\\in\\mathbb{R}^\\ell$ (Examen 2025 Ex. 2 Q7).',
        ],
      },
      {
        kind: 'viz',
        id: 'ch6-s2-viz-slutsky',
        vizId: 'ch6-slutsky',
        caption: 'Slutsky en action (quotient $\\sqrt n(\\bar X_n-\\mu)/S_n$) et le contre-exemple du couple ($Y_n=(-1)^nX_n$).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 3. LGN, TCL, TCL multivarié
  // -------------------------------------------------------------------------
  {
    id: 'ch6-s3-lgn-tcl',
    title: '3. Loi des grands nombres, théorème de la limite centrale, cas multivarié',
    role: 'preuves',
    intro:
      'Les deux théorèmes limites du chapitre portent sur la moyenne empirique : la LGN faible (Thm 1.2) donne sa consistance, le TCL (Thm 1.6) sa normalité asymptotique. Les hypothèses sont **à connaître exactement** : variables décorrélées de carré intégrable pour la LGN, **moment d’ordre 2** pour le TCL.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch6-def-2-2',
        type: 'definition',
        label: 'Définition 2.2 (Outils)',
        title: 'Variables décorrélées',
        source: 'Poly ch.6, Outils, Déf. 2.2, p. 38',
        hypotheses: ['$X_1,\\dots,X_n$ v.a.r. de carré intégrable.'],
        statement: 'Elles sont *décorrélées* si pour tout $1\\le k\\ne\\ell\\le n$, $\\mathrm{Cov}(X_k,X_\\ell):=\\mathbb{E}[(X_k-\\mathbb{E}[X_k])(X_\\ell-\\mathbb{E}[X_\\ell])]=0$.',
        intuition: 'Indépendantes et de carré intégrable $\\Rightarrow$ décorrélées.',
        pitfalls: ['**La réciproque est fausse** : décorrélé $\\not\\Rightarrow$ indépendant.'],
      },
      {
        kind: 'theorem',
        id: 'ch6-lem-2-2',
        type: 'lemme',
        label: 'Lemme 2.2 (Outils)',
        title: 'Lemme de Bienaymé',
        source: 'Poly ch.6, Outils, Lemme 2.2, p. 38',
        hypotheses: ['$X_1,\\dots,X_n$ v.a.r. de carré intégrable et décorrélées.'],
        statement: '$\\mathrm{Var}\\big(\\sum_{k=1}^nX_k\\big)=\\sum_{k=1}^n\\mathrm{Var}(X_k)$.',
        intuition: 'La variance d’une somme de termes décorrélés est la somme des variances.',
        proof: [
          { text: '$\\mathrm{Var}(\\sum_kX_k)=\\sum_k\\mathbb{E}[(X_k-\\mathbb{E}[X_k])^2]+\\sum_{k\\ne\\ell}\\mathbb{E}[(X_k-\\mathbb{E}[X_k])(X_\\ell-\\mathbb{E}[X_\\ell])]$.', justification: 'Développement du carré de la somme centrée.' },
          { text: 'La seconde somme est nulle.', justification: 'Décorrélation (Déf. 2.2).' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-1-2',
        type: 'theoreme',
        label: 'Théorème 1.2',
        title: 'Loi faible des grands nombres pour des variables décorrélées',
        source: 'Poly ch.6, Thm 1.2, p. 12–13',
        hypotheses: [
          '$\\{(\\mathsf{Z}_n,\\mathcal{Z}_n,\\mathbb{P}_n):n\\in\\mathbb{N}^*\\}$ suite d’espaces probabilisés ; sous $\\mathbb{P}_n$, les v.a.r. $X_1,\\dots,X_n$ sont **décorrélées**.',
          'Pour tout $k\\in\\{1,\\dots,n\\}$, $\\mathbb{E}_n[X_k^2]<\\infty$.',
          '$\\displaystyle\\lim_{n\\to\\infty}\\frac1{n^2}\\sum_{k=1}^n\\mathrm{Var}_n(X_k)=0$.',
        ],
        statement: `$$\\lim_{n\\to\\infty}\\mathbb{E}_n\\Big[\\Big(\\frac1n\\sum_{k=1}^n\\{X_k-\\mathbb{E}_n[X_k]\\}\\Big)^2\\Big]=0,\\qquad\\frac1n\\sum_{k=1}^n\\{X_k-\\mathbb{E}_n[X_k]\\}\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0.$$

**Cas du $n$-échantillon** d’une loi $Q$ de carré intégrable, de variance $\\sigma^2$ : variables indépendantes donc décorrélées, $n^{-2}\\sum_{k=1}^n\\sigma^2=\\sigma^2/n\\to0$, d’où $\\bar X_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}\\int x\\,Q(\\mathrm{d}x)$.`,
        intuition: 'La moyenne de $n$ variables non corrélées a une variance qui décroît ; Tchebychev transforme la convergence $L^2$ en convergence en probabilité.',
        proof: [
          {
            text: '$\\mathbb{E}_n\\big[\\big(\\frac1n\\sum_k\\{X_k-\\mathbb{E}_n[X_k]\\}\\big)^2\\big]=\\mathrm{Var}_n\\big(\\frac1n\\sum_kX_k\\big)=\\frac1{n^2}\\sum_{k=1}^n\\mathrm{Var}_n(X_k)\\to0$ : convergence $L^2$.',
            justification: 'Lemme de Bienaymé (Lemme 2.2, variables décorrélées de carré intégrable), puis troisième hypothèse.',
          },
          {
            text: 'Pour $\\varepsilon>0$ : $\\mathbb{P}_n\\big(\\big|\\frac1n\\sum_k\\{X_k-\\mathbb{E}_n[X_k]\\}\\big|\\ge\\varepsilon\\big)\\le\\frac1{\\varepsilon^2}\\mathbb{E}_n\\big[\\big(\\frac1n\\sum_k\\{X_k-\\mathbb{E}_n[X_k]\\}\\big)^2\\big]\\to0$.',
            justification: 'Inégalité de Bienaymé-Tchebychev (Lemme 2.1).',
          },
        ],
        pitfalls: ['Le carré intégrable **n’est pas nécessaire** dans le cas i.i.d. : la LGN pour variables seulement intégrables est admise dans les compléments (Thm 4.2).', 'Décorrélé $\\not\\Rightarrow$ indépendant ; la LGN 1.2 est plus générale que le cas i.i.d.'],
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-3',
        title: 'Exemple 1.3 — Paramètre d’une loi exponentielle : 1/X̄ₙ est consistant',
        source: 'Poly ch.6, Ex. 1.3, p. 13',
        setup: 'Suite de $n$-échantillons du modèle $\\{\\mathcal{E}(\\theta):\\theta\\in\\Theta:=\\mathbb{R}_+^*\\}$ (intensité $\\theta$) ; EMV $T_n(Z_n):=\\big(\\frac1n\\sum_{k=1}^nX_k\\big)^{-1}$. Montrer que $\\{T_n\\}$ est consistante pour $\\theta$.',
        steps: [
          { text: 'Sous $\\mathcal{E}(\\theta)$ : espérance $1/\\theta$, variance $1/\\theta^2$ (finie).', justification: 'Moments de la loi exponentielle d’intensité $\\theta$.' },
          { text: '$\\bar X_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\mathbb{E}_{n,\\theta}[X_1]=1/\\theta$.', justification: 'LGN faible (Thm 1.2), cas du $n$-échantillon de carré intégrable.' },
          { text: '$\\varphi:u\\mapsto1/u$ est continue sur $\\mathbb{R}_+^*$, qui contient $\\{1/\\theta:\\theta\\in\\Theta\\}$ ; donc $\\varphi(\\bar X_n)\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\varphi(1/\\theta)=\\theta$.', justification: 'Théorème de continuité (Thm 1.1) : continuité requise seulement aux points de $g(\\Theta)$.' },
        ],
        conclusion: 'Schéma à retenir : la LGN traite la moyenne empirique, le théorème de continuité traite la fonction appliquée. L’étape délicate est de vérifier la continuité de $\\varphi$ **au point limite** et non partout.',
      },
      {
        kind: 'viz',
        id: 'ch6-s3-viz-lgntcl',
        vizId: 'ch6-lgn-tcl',
        caption: 'LGN (histogramme de $\\bar X_n$ qui se resserre) et TCL (histogramme de $\\sqrt n(\\bar X_n-\\mu)/\\sigma$ qui épouse $\\mathcal{N}(0,1)$) ; la loi de Cauchy montre ce qui arrive sans moment.',
      },
      {
        kind: 'theorem',
        id: 'ch6-lem-2-3',
        type: 'lemme',
        label: 'Lemme 2.3 (Outils)',
        title: 'Développement d’une fonction caractéristique à l’ordre deux',
        source: 'Poly ch.6, Outils, Lemme 2.3, p. 38–39',
        hypotheses: ['$Y$ v.a.r. **de carré intégrable**, $\\psi:u\\mapsto\\mathbb{E}[e^{\\mathrm{i}uY}]$.'],
        statement: '$\\psi$ est deux fois dérivable sur $\\mathbb{R}$, $\\psi\'(u)=\\mathrm{i}\\,\\mathbb{E}[Ye^{\\mathrm{i}uY}]$, $\\psi\'\'(u)=-\\mathbb{E}[Y^2e^{\\mathrm{i}uY}]$, $\\psi\'\'$ continue, et $\\psi(u)=1+\\mathrm{i}u\\,\\mathbb{E}[Y]-\\frac{u^2}2\\mathbb{E}[Y^2]+o(u^2)$ quand $u\\to0$.',
        intuition: 'C’est ici qu’intervient l’hypothèse de **moment d’ordre 2** du TCL : elle permet de dériver deux fois sous l’espérance.',
        proof: [
          { text: '$\\frac{\\psi(u+h)-\\psi(u)}h=\\mathbb{E}\\big[e^{\\mathrm{i}uY}\\frac{e^{\\mathrm{i}hY}-1}h\\big]$ et $\\big|\\frac{e^{\\mathrm{i}hY}-1}h\\big|\\le|Y|$.', justification: 'Inégalité $|e^{\\mathrm{i}v}-1|\\le|v|$.' },
          { text: '$Y$ intégrable : $\\psi\'(u)=\\mathrm{i}\\,\\mathbb{E}[Ye^{\\mathrm{i}uY}]$.', justification: 'Convergence dominée.' },
          { text: 'Même argument avec la domination $|Y|\\cdot|Y|=Y^2$ intégrable : $\\psi\'\'(u)=-\\mathbb{E}[Y^2e^{\\mathrm{i}uY}]$, continue.', justification: 'Convergence dominée (hypothèse de carré intégrable).' },
          { text: '$\\psi(u)=\\psi(0)+u\\psi\'(0)+\\frac{u^2}2\\psi\'\'(0)+o(u^2)$ avec $\\psi(0)=1$, $\\psi\'(0)=\\mathrm{i}\\mathbb{E}[Y]$, $\\psi\'\'(0)=-\\mathbb{E}[Y^2]$.', justification: 'Formule de Taylor-Young en 0.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch6-lem-2-4',
        type: 'lemme',
        label: 'Lemme 2.4 (Outils)',
        title: 'Puissances n-ièmes',
        source: 'Poly ch.6, Outils, Lemme 2.4, p. 39',
        hypotheses: ['$\\{a_n\\}$ suite de complexes avec $na_n\\to c\\in\\mathbb{C}$.'],
        statement: '$(1+a_n)^n\\to e^c$.',
        intuition: 'Dans la preuve du TCL : $a_n:=\\psi(t/\\sqrt n)-1=-t^2/(2n)+o(n^{-1})$, $na_n\\to-t^2/2$. Le reste est **complexe** : on ne peut pas se contenter du logarithme réel.',
        proof: [
          { text: '$na_n\\to c$ donne $a_n\\to0$, donc $|a_n|\\le1/2$ pour $n$ grand.', justification: '$a_n=(na_n)/n$.' },
          { text: 'Sur $\\{|z|\\le1/2\\}$, $\\mathrm{Log}(1+z)=z+r(z)$ avec $|r(z)|\\le|z|^2$.', justification: 'Développement du logarithme complexe principal.' },
          { text: '$n\\,\\mathrm{Log}(1+a_n)=na_n+nr(a_n)$ et $|nr(a_n)|\\le n|a_n|^2=(n|a_n|)^2/n\\to0$.', justification: '$n|a_n|\\to|c|$.' },
          { text: '$n\\,\\mathrm{Log}(1+a_n)\\to c$ et $(1+a_n)^n=\\exp(n\\,\\mathrm{Log}(1+a_n))\\to e^c$.', justification: 'Continuité de l’exponentielle.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-1-6',
        type: 'theoreme',
        label: 'Théorème 1.6',
        title: 'Théorème de la limite centrale, cas vectoriel (TCL multivarié)',
        source: 'Poly ch.6, Thm 1.6, p. 18 (preuve p. 18–19)',
        hypotheses: [
          '$Q$ loi sur $(\\mathbb{R}^\\ell,\\mathcal{B}(\\mathbb{R}^\\ell))$ **admettant un moment d’ordre 2**, d’espérance $\\mu$ et de matrice de covariance $\\Sigma$ ($\\ell\\times\\ell$).',
          'Suite de $n$-échantillons $\\{(\\mathsf{X}^n,\\mathcal{X}^{\\otimes n},\\mathbb{P}_n:=Q^{\\otimes n}):n\\in\\mathbb{N}^*\\}$.',
        ],
        statement: `$$\\sqrt n\\Big(\\frac1n\\sum_{k=1}^nX_k-\\mu\\Big)=\\frac1{\\sqrt n}\\sum_{k=1}^n(X_k-\\mu)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\Sigma).$$

Cas $\\ell=1$ : $\\sqrt n(\\bar X_n-\\mu)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\sigma^2)$, soit $\\frac{\\sqrt n}{\\sigma}(\\bar X_n-\\mu)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,1)$.`,
        intuition: 'Seuls les termes d’ordre 0, 1, 2 du développement de la fonction caractéristique survivent à l’élévation à la puissance $n$ (argument divisé par $\\sqrt n$) : la loi limite ne dépend du modèle que par $\\mu$ et $\\Sigma$, d’où l’universalité du TCL. Preuve faite dans le poly pour $\\ell=1$, $\\sigma^2>0$ ; le cas $\\ell\\ge1$ s’en déduit par Cramér-Wold (Thm 2.3) ; le cas $\\sigma^2=0$ est immédiat ($\\sqrt n(\\bar X_n-\\mu)=0$ p.s.).',
        proof: [
          {
            text: '*Réduction.* $Y_i:=\\sigma^{-1}(X_i-\\mu)$, $\\bar Y_n:=n^{-1}\\sum_iY_i$, de sorte que $\\frac{\\sqrt n}\\sigma(\\bar X_n-\\mu)=\\sqrt n\\,\\bar Y_n$ ; les $Y_i$ sont i.i.d., centrées, de variance 1. Il suffit de montrer $\\sqrt n\\bar Y_n\\Rightarrow\\mathcal{N}(0,1)$ puis de multiplier par $\\sigma$.',
            justification: 'Transformation continue (Thm 1.4) avec $x\\mapsto\\sigma x$.',
          },
          {
            text: '*Ce qu’il faut démontrer.* $\\varphi_n(t):=\\mathbb{E}_n[\\exp(\\mathrm{i}t\\sqrt n\\bar Y_n)]$ ; il suffit que $\\lim_n\\varphi_n(t)=\\exp(-t^2/2)$ pour tout $t$.',
            justification: 'Éq. (1) (fonction caractéristique de $\\mathcal{N}(0,1)$) et théorème de Lévy (Thm 1.5).',
          },
          {
            text: '*Réduction à $Y_1$.* $\\varphi_n(t)=\\mathbb{E}_n\\big[\\exp\\big(\\mathrm{i}\\frac t{\\sqrt n}\\sum_kY_k\\big)\\big]=\\psi\\big(\\frac t{\\sqrt n}\\big)^n$ avec $\\psi(u):=\\mathbb{E}_n[\\exp(\\mathrm{i}uY_1)]$.',
            justification: 'Indépendance (l’espérance du produit est le produit des espérances) et identité des lois.',
          },
          {
            text: '*Développement.* $\\psi(u)=1+\\mathrm{i}u\\,\\mathbb{E}_n[Y_1]-\\frac{u^2}2\\mathbb{E}_n[Y_1^2]+o(u^2)$ ; avec $\\mathbb{E}_n[Y_1]=0$, $\\mathbb{E}_n[Y_1^2]=1$, $u=t/\\sqrt n$ : $\\psi(t/\\sqrt n)=1-\\frac{t^2}{2n}+o(n^{-1})$.',
            justification: 'Lemme 2.3 ($Y_1$ de carré intégrable : c’est là que sert l’hypothèse de moment d’ordre 2).',
          },
          {
            text: '*Limite.* $\\lim_n\\varphi_n(t)=\\lim_n\\big(1-\\frac{t^2}{2n}+o(n^{-1})\\big)^n=\\exp(-t^2/2)$.',
            justification: 'Lemme 2.4 avec $a_n=\\psi(t/\\sqrt n)-1$, $na_n\\to-t^2/2$.',
          },
        ],
        pitfalls: [
          'Hypothèse = **moment d’ordre 2** (pas seulement intégrabilité) ; sans elle (Cauchy) le TCL est faux.',
          'Ce qui converge est la **loi à $n$ fixé**, pas les trajectoires (animation p. 18).',
          '**À l’examen (2025 Ex. 2 Q7, Q9b)** : le TCL multivarié est rappelé dans le sujet ; il faut écrire le vecteur i.i.d. $W_i$ (par exemple $(X_i,X_i^2)$ ou $(Y_i-\\mu,(Y_i-\\mu)^2-\\sigma^2)$), vérifier le moment d’ordre 2 (donc $m_4<\\infty$ si $W_i$ contient $X_i^2$) et calculer sa matrice de covariance $\\Sigma$ **terme à terme**.',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-2-3',
        type: 'theoreme',
        label: 'Théorème 2.3 (Outils)',
        title: 'Procédé de Cramér-Wold',
        source: 'Poly ch.6, Outils, Thm 2.3, p. 39–40',
        hypotheses: ['$Y_n$ et $Y$ à valeurs dans $\\mathbb{R}^d$.'],
        statement: '$Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}Y$ si et seulement si $t^\\top Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}t^\\top Y$ pour tout $t\\in\\mathbb{R}^d$.',
        intuition: 'Ramène un énoncé vectoriel au cas réel. Pour le TCL : il suffit que $t^\\top\\sqrt n(\\bar X_n-\\mu)\\Rightarrow\\mathcal{N}(0,t^\\top\\Sigma t)$ pour tout $t$, i.e. le TCL scalaire pour les v.a.r. $t^\\top X_k$ (variance $t^\\top\\Sigma t$) ; si $t^\\top\\Sigma t=0$, la variable est nulle p.s., de limite $\\delta_0=\\mathcal{N}(0,0)$.',
        proof: [
          { text: 'La fonction caractéristique de $Y$ en $t$ est celle de la v.a.r. $t^\\top Y$ en $1$.', justification: '$\\mathbb{E}[e^{\\mathrm{i}t^\\top Y}]=\\mathbb{E}[e^{\\mathrm{i}\\cdot1\\cdot(t^\\top Y)}]$.' },
          { text: '($\\Rightarrow$) Pour $t\\in\\mathbb{R}^d$, $u\\in\\mathbb{R}$ : $\\mathbb{E}_n[e^{\\mathrm{i}ut^\\top Y_n}]\\to\\mathbb{E}[e^{\\mathrm{i}ut^\\top Y}]$, d’où $t^\\top Y_n\\Rightarrow t^\\top Y$.', justification: 'Lévy en dimension $d$ (sens direct) puis Lévy en dimension 1 (réciproque).' },
          { text: '($\\Leftarrow$) Avec $u=1$ : $\\mathbb{E}_n[e^{\\mathrm{i}t^\\top Y_n}]\\to\\mathbb{E}[e^{\\mathrm{i}t^\\top Y}]$ pour tout $t$.', justification: 'Lévy en dimension $d$.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch6-cor-1-1',
        type: 'corollaire',
        label: 'Corollaire 1.1',
        title: 'Intervalle de confiance asymptotique pour l’espérance, écart-type connu',
        source: 'Poly ch.6, Cor. 1.1, p. 19',
        hypotheses: ['Cadre du Thm 1.6 avec $\\ell=1$, $\\sigma^2>0$ **connu** ; $\\alpha\\in\\,]0,1[$.'],
        statement: `L’intervalle

$$\\Big[\\frac1n\\sum_{k=1}^nX_k-z_{1-\\alpha/2}\\frac\\sigma{\\sqrt n},\\ \\frac1n\\sum_{k=1}^nX_k+z_{1-\\alpha/2}\\frac\\sigma{\\sqrt n}\\Big]$$

est un intervalle de confiance de niveau asymptotique $1-\\alpha$ pour $\\mu$, où $z_u$ est le quantile d’ordre $u$ de $\\mathcal{N}(0,1)$.`,
        intuition: 'Version asymptotique de l’IC gaussien du chapitre 4, valable pour **toute** loi de carré intégrable. Quand $\\sigma$ est inconnu, on le remplace par un estimateur consistant : justification par Slutsky (iii).',
        proof: [
          { text: '$\\frac{\\sqrt n}\\sigma\\big(\\frac1n\\sum_kX_k-\\mu\\big)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,1)$.', justification: 'TCL (Thm 1.6).' },
          { text: '$\\lim_n\\mathbb{P}_n\\big(a\\frac\\sigma{\\sqrt n}\\le\\frac1n\\sum_kX_k-\\mu\\le b\\frac\\sigma{\\sqrt n}\\big)=\\Phi(b)-\\Phi(a)$.', justification: 'Portmanteau (Thm 1.3 (iii)) : le pavé $]a,b]$ a une frontière de mesure nulle pour $\\mathcal{N}(0,1)$.' },
          { text: 'Prendre $b=-a=z_{1-\\alpha/2}$ : $\\Phi(b)-\\Phi(a)=1-\\alpha$ et l’événement se réécrit $\\mu\\in[\\bar X_n\\pm z_{1-\\alpha/2}\\sigma/\\sqrt n]$.', justification: 'Définition du quantile et symétrie de $\\mathcal{N}(0,1)$.' },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 4. Consistance et normalité asymptotique d'estimateurs
  // -------------------------------------------------------------------------
  {
    id: 'ch6-s4-normalite',
    title: '4. Consistance et normalité asymptotique d’estimateurs ; la variance empirique',
    role: 'definitions',
    intro:
      'La **normalité asymptotique** (Déf. 1.6) quantifie la consistance : l’erreur, multipliée par $\\sqrt n$, converge vers une gaussienne dont la variance $v(\\theta)$ joue, dans le monde asymptotique, le rôle de l’EQM à $n$ fixé. L’exemple central est la variance empirique (Ex. 1.6), dont la preuve contient toutes les techniques du chapitre et qui est tombée à l’Examen 2025 (Ex. 2 Q7).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch6-def-1-6',
        type: 'definition',
        label: 'Définition 1.6',
        title: 'Normalité asymptotique, variance asymptotique',
        source: 'Poly ch.6, Déf. 1.6, p. 26',
        hypotheses: ['Suite de modèles $\\{(\\mathsf{Z}_n,\\mathcal{Z}_n,\\{\\mathbb{P}_{n,\\theta}:\\theta\\in\\Theta\\})\\}$, $g:\\Theta\\to\\mathbb{R}^\\ell$, $T_n:\\mathsf{Z}_n\\to\\mathbb{R}^\\ell$.'],
        statement: `$\\{T_n\\}$ est *asymptotiquement normale* si, pour tout $\\theta\\in\\Theta$,

$$\\sqrt n\\big(T_n(Z_n)-g(\\theta)\\big)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\Sigma(\\theta)),$$

où $\\Sigma(\\theta)$ est une matrice symétrique positive $\\ell\\times\\ell$, la *matrice de covariance asymptotique* (*variance asymptotique* $v(\\theta)$ si $\\ell=1$).

**Conséquence (p. 26) : asymptotiquement normale $\\Rightarrow$ consistante.**`,
        intuition: 'Lecture : $\\hat\\theta_n\\approx\\theta+\\sqrt{v(\\theta)/n}\\,\\xi$ avec $\\xi\\approx\\mathcal{N}(0,1)$ (approximation exacte seulement à la limite). Pour l’EMV des modèles réguliers, $v(\\theta)$ est l’inverse de l’information de Fisher (chapitre 7).',
        proof: [
          { text: '$T_n(Z_n)-g(\\theta)=\\frac1{\\sqrt n}\\cdot\\sqrt n(T_n(Z_n)-g(\\theta))$ : produit d’une suite déterministe tendant vers 0 et d’une suite qui converge en loi.', justification: 'Écriture algébrique.' },
          { text: 'Donc $T_n(Z_n)-g(\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}0\\cdot\\mathcal{N}(0,\\Sigma(\\theta))=\\delta_0$, c’est-à-dire $T_n(Z_n)\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}g(\\theta)$.', justification: 'Slutsky (ii) avec $Y_n=1/\\sqrt n\\to0$, puis convergence en loi vers une constante $\\iff$ convergence en probabilité (Thm 2.2 (ii)).' },
        ],
        pitfalls: ['La normalisation est $\\sqrt n$ **par définition** ; l’Ex. 1.5 (vitesse $n$, limite exponentielle) n’est **pas** asymptotiquement normal.', '$v(\\theta)$ est la variance de la **loi limite de $\\sqrt n(T_n-g(\\theta))$**, pas la variance de $T_n$ (qui vaut environ $v(\\theta)/n$).'],
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-6',
        title: 'Exemple 1.6 — Théorème de la limite centrale pour la variance empirique',
        source: 'Poly ch.6, Ex. 1.6, p. 21–22 (éq. (2))',
        setup: `Suite de $n$-échantillons d’une loi $Q$ sur $\\mathbb{R}$ telle que $\\int x^4\\,Q(\\mathrm{d}x)<\\infty$ (**moment d’ordre 4**) ; $\\mu:=\\int x\\,Q(\\mathrm{d}x)$, $\\sigma^2:=\\mathrm{Var}_Q(X_1)$ ; $\\hat\\sigma_n^2:=\\frac1n\\sum_{i=1}^n(X_i-\\bar X_n)^2$, $S_n^2:=\\frac n{n-1}\\hat\\sigma_n^2$. Montrer que

$$\\sqrt n\\big(\\hat\\sigma_n^2-\\sigma^2\\big)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\gamma),\\qquad\\gamma:=\\int(x-\\mu)^4\\,Q(\\mathrm{d}x)-\\sigma^4,$$

et que la même convergence vaut pour $S_n^2$.`,
        steps: [
          {
            text: '*a) Autre expression.* $\\hat\\sigma_n^2=n^{-1}\\sum_i(X_i-\\mu)^2-(\\bar X_n-\\mu)^2$, d’où (éq. (2)) $\\sqrt n(\\hat\\sigma_n^2-\\sigma^2)=\\frac1{\\sqrt n}\\sum_{i=1}^n\\{(X_i-\\mu)^2-\\sigma^2\\}-\\sqrt n(\\bar X_n-\\mu)^2$.',
            justification: 'Développer $(X_i-\\bar X_n)^2=((X_i-\\mu)-(\\bar X_n-\\mu))^2$ et sommer ($\\sum_i(X_i-\\mu)=n(\\bar X_n-\\mu)$).',
          },
          {
            text: '*b) Premier terme : TCL.* $Z_i:=(X_i-\\mu)^2-\\sigma^2$ sont i.i.d., $\\mathbb{E}_n[Z_1]=0$, $\\mathrm{Var}_n(Z_1)=\\int(x-\\mu)^4Q(\\mathrm{d}x)-\\sigma^4=\\gamma<\\infty$ ; donc $n^{-1/2}\\sum_iZ_i\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\gamma)$.',
            justification: 'TCL (Thm 1.6) ; le moment d’ordre 4 de $Q$ est exactement le moment d’ordre 2 de $Z_1$.',
          },
          {
            text: '*c) Second terme $\\to0$ en probabilité.* $\\sqrt n(\\bar X_n-\\mu)\\Rightarrow\\mathcal{N}(0,\\sigma^2)$, donc $n(\\bar X_n-\\mu)^2\\Rightarrow\\sigma^2\\chi^2(1)$, puis $\\sqrt n(\\bar X_n-\\mu)^2=\\frac1{\\sqrt n}\\,n(\\bar X_n-\\mu)^2\\Rightarrow0$, donc $\\to0$ en probabilité.',
            justification: 'TCL, transformation continue avec $x\\mapsto x^2$, Slutsky (ii) avec la suite déterministe $n^{-1/2}\\to0$, puis convergence en loi vers une constante (Thm 2.2 (ii)).',
          },
          {
            text: '*d) Conclusion.* En reportant b) et c) dans (2), $\\sqrt n(\\hat\\sigma_n^2-\\sigma^2)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\gamma)$.',
            justification: 'Remarque 2 après Slutsky : $U_n\\Rightarrow\\nu$ et $V_n\\to0$ en probabilité entraînent $U_n+V_n\\Rightarrow\\nu$.',
          },
          {
            text: '*Cas $S_n^2$.* $\\sqrt n(S_n^2-\\hat\\sigma_n^2)=\\sqrt n\\,\\hat\\sigma_n^2/(n-1)\\to0$ en probabilité, d’où la même loi limite.',
            justification: '$\\hat\\sigma_n^2\\to\\sigma^2$ en probabilité (LGN + continuité, Prop. 1.2), et $\\sqrt n/(n-1)\\to0$ : Slutsky.',
          },
        ],
        conclusion: 'La variance empirique n’est pas une moyenne empirique mais en diffère par un terme négligeable à l’échelle $\\sqrt n$. Il faut un **moment d’ordre 4**. Cas gaussien : $\\gamma=3\\sigma^4-\\sigma^4=2\\sigma^4$ (c’est la valeur demandée à l’Examen 2025 Ex. 2 Q7, avec le rappel $\\mathrm{Var}(\\xi^2)=2$).',
      },
      {
        kind: 'theorem',
        id: 'ch6-prop-1-2',
        type: 'proposition',
        label: 'Proposition 1.2',
        title: 'Consistance de la variance empirique (éq. (3))',
        source: 'Poly ch.6, Prop. 1.2, p. 22–23',
        hypotheses: ['Suite de $n$-échantillons d’une loi $Q$ sur $\\mathbb{R}$ **de carré intégrable**, de variance $\\sigma^2>0$ (pas de moment d’ordre 4 requis).'],
        statement: '$$\\hat\\sigma_n^2\\xrightarrow{\\mathbb{P}_n\\text{-prob}}\\sigma^2,\\qquad S_n^2\\xrightarrow{\\mathbb{P}_n\\text{-prob}}\\sigma^2,\\qquad\\sigma^{-2}S_n^2\\xrightarrow{\\mathbb{P}_n\\text{-prob}}1.$$',
        intuition: 'Sert pour le test de Student asymptotique (Ex. 1.14) et pour remplacer $\\sigma$ par $S_n$ dans les IC (Slutsky). À l’Examen 2025 (Ex. 2 Q6), c’est exactement la preuve de consistance de $\\widehat{\\sigma^2}_{ML}$.',
        proof: [
          { text: '$\\big(\\bar X_n,\\frac1n\\sum_iX_i^2\\big)\\xrightarrow{\\mathbb{P}_n\\text{-prob}}(\\mu,\\sigma^2+\\mu^2)$.', justification: 'LGN faible (Thm 1.2) appliquée à $\\{X_i\\}$ et à $\\{X_i^2\\}$ ; convergence du couple par celle des composantes (Prop. 2.1).' },
          { text: '$\\hat\\sigma_n^2=\\frac1n\\sum_iX_i^2-\\bar X_n^2\\xrightarrow{\\mathbb{P}_n\\text{-prob}}\\sigma^2+\\mu^2-\\mu^2=\\sigma^2$.', justification: 'Théorème de continuité en probabilité (Thm 2.1) avec $(u,w)\\mapsto w-u^2$, continue.' },
          { text: '$S_n^2=\\frac n{n-1}\\hat\\sigma_n^2\\to\\sigma^2$ et $\\sigma^{-2}S_n^2\\to1$.', justification: '$n/(n-1)\\to1$ (Slutsky avec une suite déterministe) ; division par la constante $\\sigma^2>0$.' },
        ],
        pitfalls: ['*(remarque d’extraction)* La LGN 1.2 appliquée à $X_i^2$ demande $\\mathbb{E}[X_i^4]<\\infty$ ; dans le cas i.i.d. seulement de carré intégrable, c’est la LGN admise des compléments (Thm 4.2) qui couvre $\\{X_i^2\\}$. Le poly cite la LGN 1.2 sans relever ce point.'],
      },
      {
        kind: 'viz',
        id: 'ch6-s4-viz-variance',
        vizId: 'ch6-variance-empirique',
        caption: 'Consistance (Prop. 1.2) et loi limite $\\mathcal{N}(0,\\gamma)$ (Ex. 1.6) de $\\hat\\sigma_n^2$ ; la convergence est lente pour une loi à queue lourde comme l’exponentielle.',
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-9',
        title: 'Exemple 1.9 — L’EMV du modèle exponentiel est asymptotiquement normal',
        source: 'Poly ch.6, Ex. 1.9, p. 26 (d’après l’Ex. 1.7)',
        setup: 'Modèle $\\{\\mathcal{E}(\\theta):\\theta\\in\\mathbb{R}_+^*\\}$, EMV $\\hat\\theta_n=1/\\bar X_n$.',
        steps: [
          { text: 'L’Ex. 1.7 (méthode-δ, §5) donne $\\sqrt n(\\hat\\theta_n-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\theta^2)$ pour tout $\\theta\\in\\mathbb{R}_+^*$.', justification: 'TCL pour $\\bar X_n$ puis méthode-δ avec $u\\mapsto1/u$.' },
          { text: 'La suite des EMV est donc asymptotiquement normale, de variance asymptotique $v(\\theta)=\\theta^2$.', justification: 'Définition 1.6 avec $g=\\mathrm{Id}$, $\\ell=1$.' },
        ],
        conclusion: '$v(\\theta)=\\theta^2=1/\\mathbb{I}(\\theta)$, inverse de l’information de Fisher d’une observation (PC6 Ex. 1 Q3 ; chapitre 7).',
      },
      {
        kind: 'example',
        id: 'ch6-ex-annale-2025-q7',
        title: 'Annale — Examen 2025 Ex. 2 Q6–Q7 : consistance et normalité asymptotique du vecteur des EMV (moyenne, variance)',
        source: 'Examen 2025, Ex. 2 Q6–Q7 (modèle log-normal ; solution rédigée dans le DIAGNOSTIC §2.A)',
        setup: '$X_i=e^{\\mu+\\sigma\\xi_i}$, $Y_i:=\\ln X_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$ i.i.d. ; $\\hat\\mu_{ML}=\\bar Y_n$, $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2$. Rappel du sujet : TCL multivarié et $\\mathrm{Var}(\\xi^2)=2$. Q6 : montrer la consistance ; Q7 : montrer la normalité asymptotique du vecteur et donner la covariance limite.',
        steps: [
          { text: '**Q6.** $\\bar Y_n\\to\\mu$ et $\\frac1n\\sum_iY_i^2\\to\\sigma^2+\\mu^2$ en $\\mathbb{P}_{n,\\theta}$-probabilité ; donc $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_iY_i^2-\\bar Y_n^2\\to\\sigma^2$. La convergence du couple découle de celle des composantes.', justification: 'LGN (Thm 1.2 : moments finis), théorème de continuité (Thm 1.1) avec $(u,w)\\mapsto w-u^2$, Prop. 2.1. C’est la Prop. 1.2.' },
          { text: '**Q7, décomposition.** $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\mu)^2-(\\bar Y_n-\\mu)^2$, donc $\\sqrt n\\begin{pmatrix}\\hat\\mu_{ML}-\\mu\\\\ \\widehat{\\sigma^2}_{ML}-\\sigma^2\\end{pmatrix}=\\frac1{\\sqrt n}\\sum_{i=1}^nW_i-\\begin{pmatrix}0\\\\ \\sqrt n(\\bar Y_n-\\mu)^2\\end{pmatrix}$ avec $W_i:=\\big(Y_i-\\mu,\\ (Y_i-\\mu)^2-\\sigma^2\\big)^\\top$.', justification: 'Éq. (2) de l’Ex. 1.6, écrite vectoriellement.' },
          { text: '**Covariance de $W_i$.** $\\mathrm{Var}(Y-\\mu)=\\sigma^2$ ; $\\mathrm{Cov}(Y-\\mu,(Y-\\mu)^2)=\\mathbb{E}[(Y-\\mu)^3]=0$ ; $\\mathrm{Var}((Y-\\mu)^2)=\\sigma^4\\mathrm{Var}(\\xi^2)=2\\sigma^4$. Donc $\\Sigma=\\mathrm{diag}(\\sigma^2,2\\sigma^4)$ et $\\frac1{\\sqrt n}\\sum_iW_i\\Rightarrow\\mathcal{N}(0,\\Sigma)$.', justification: 'Les $W_i$ sont i.i.d., centrés, de carré intégrable (moments gaussiens finis) ; symétrie de la gaussienne pour le moment d’ordre 3 ; TCL multivarié (Thm 1.6).' },
          { text: '**Terme correctif.** $\\sqrt n(\\bar Y_n-\\mu)^2=\\frac1{\\sqrt n}\\big(\\sqrt n(\\bar Y_n-\\mu)\\big)^2\\to0$ en probabilité.', justification: 'TCL, transformation continue ($x\\mapsto x^2$), Slutsky (ii) avec $1/\\sqrt n\\to0$.' },
          { text: '**Conclusion.** $\\sqrt n(\\hat\\theta_{ML}-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}\\Big(\\begin{pmatrix}0\\\\0\\end{pmatrix},\\begin{pmatrix}\\sigma^2&0\\\\0&2\\sigma^4\\end{pmatrix}\\Big)$.', justification: 'Slutsky vectoriel (Remarque 2 / Thm 4.1 (i)) : ajouter un vecteur qui tend vers 0 en probabilité ne change pas la loi limite.' },
        ],
        conclusion: 'Cohérence : $\\Sigma=\\mathbb{I}(\\theta)^{-1}$ avec $\\mathbb{I}(\\mu,\\sigma^2)=\\mathrm{diag}(1/\\sigma^2,1/(2\\sigma^4))$ (chapitre 7). Rédaction attendue : nommer $W_i$, vérifier les moments, calculer $\\Sigma$ terme à terme, **citer Slutsky** pour le terme correctif.',
      },
    ],
  },
]
