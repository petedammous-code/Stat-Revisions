import type { Exercise } from '../types'

/** Étape suivante, associer, numériques, annales. */
export const exercisesPart2: Exercise[] = [
  // ------------------------------------------------------------------ Étape suivante
  {
    id: 'ch1-etape-sn-kn',
    type: 'etape-suivante',
    title: 'PC1 Ex. 3 Q4 — Modèle induit par (Sₙ, Kₙ) dans le modèle gaussien',
    source: 'PC1 Ex. 3 Q4 (corrigé p. 13–14) ; Poly ch.1, Thm 1.3, Prop. 2.8',
    origin: 'pc',
    difficulty: 2,
    tags: ['gosset', 'modele-induit', 'chi2'],
    setup: '$X_1,\\dots,X_n$ i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$ ; $S_n:=\\sum_iX_i$ (somme) et $K_n:=\\sum_i(X_i-n^{-1}S_n)^2$. Déterminer le modèle induit par $(S_n,K_n)$.',
    steps: [
      {
        prompt: 'Étape 1 — Loi de $S_n=\\sum_iX_i$ sous $\\mathbb{P}_\\theta$ :',
        choices: [
          { text: '$\\mathcal{N}(n\\mu,n\\sigma^2)$', correct: true, explanation: 'Somme de $n$ gaussiennes indépendantes (Lemme 2.1 (ii)) ; ou $S_n=n\\bar X_n$ avec $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$ (Gosset (i)).' },
          { text: '$\\mathcal{N}(n\\mu,n^2\\sigma^2)$', correct: false, explanation: 'Les variances de variables **indépendantes** s’ajoutent : $n\\sigma^2$, pas $n^2\\sigma^2$ ($n^2\\sigma^2$ serait la variance de $nX_1$).' },
          { text: '$\\mathcal{N}(\\mu,\\sigma^2/n)$', correct: false, explanation: 'C’est la loi de la **moyenne** $\\bar X_n$, pas de la somme $S_n=n\\bar X_n$.' },
        ],
      },
      {
        prompt: 'Étape 2 — Avec les notations de Gosset, $K_n=(n-1)S_n^{2,\\mathrm{Gosset}}$. La loi de $K_n$ est :',
        choices: [
          { text: '$\\mathrm{Gamma}\\big(\\frac{n-1}2,\\frac1{2\\sigma^2}\\big)$ (intensité), i.e. $K_n/\\sigma^2\\sim\\chi^2(n-1)$', correct: true, explanation: 'Gosset (ii) : $K_n/\\sigma^2\\sim\\chi^2(n-1)=\\mathrm{Gamma}(\\frac{n-1}2,\\frac12)$ (Prop. 2.8) ; multiplier par $\\sigma^2$ divise l’intensité par $\\sigma^2$.' },
          { text: '$\\mathrm{Gamma}\\big(\\frac n2,\\frac1{2\\sigma^2}\\big)$', correct: false, explanation: 'Ce serait $\\sum_i(X_i-\\mu)^2$ (centrage par $\\mu$, $n$ degrés de liberté) ; le centrage par la moyenne empirique perd un degré de liberté.' },
          { text: '$\\mathrm{Gamma}\\big(\\frac{n-1}2,2\\sigma^2\\big)$ (intensité $2\\sigma^2$)', correct: false, explanation: 'Confusion intensité / échelle : la densité de $K_n$ est $\\propto u^{\\frac{n-1}2-1}e^{-u/(2\\sigma^2)}$, donc l’**intensité** vaut $1/(2\\sigma^2)$ ; $2\\sigma^2$ est l’**échelle** (c’est ainsi que l’écrirait le CC 2022, en convention d’échelle).' },
        ],
      },
      {
        prompt: 'Étape 3 — Quel résultat justifie que la densité jointe de $(S_n,K_n)$ est le **produit** des densités marginales ?',
        choices: [
          { text: 'L’indépendance de $\\bar X_n$ et $S_n^2$ (Gosset (iii), via Cochran sur $\\mathbb{R}\\mathbf{1}_n\\oplus(\\mathbb{R}\\mathbf{1}_n)^\\perp$).', correct: true, explanation: '$S_n$ est fonction de $P_FX$ et $K_n$ de $P_{F^\\perp}X$, projections indépendantes.' },
          { text: 'La décorrélation de $S_n$ et $K_n$, car $\\mathrm{Cov}(S_n,K_n)=0$ suffit.', correct: false, explanation: 'Décorrélation n’implique indépendance que dans un **vecteur gaussien**, et $(S_n,K_n)$ n’en est pas un ($K_n$ est une forme quadratique).' },
          { text: 'Le fait que $S_n$ et $K_n$ dépendent de paramètres différents ($\\mu$ et $\\sigma^2$).', correct: false, explanation: 'Les deux lois dépendent de $\\sigma^2$ ; et la dépendance en des paramètres n’a rien à voir avec l’indépendance stochastique.' },
        ],
      },
      {
        prompt: 'Étape 4 — Le modèle induit est :',
        choices: [
          { text: '$\\big(\\mathbb{R}\\times\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}\\times\\mathbb{R}_+),\\{\\rho_{n,\\theta}\\cdot\\mathrm{Leb}^{\\otimes2}\\}\\big)$ avec $\\rho_{n,\\theta}(z,y)=C_n\\,e^{-(z-n\\mu)^2/(2n\\sigma^2)}\\,e^{-y/(2\\sigma^2)}y^{(n-3)/2}\\mathbb{1}_{\\mathbb{R}_+}(y)$', correct: true, explanation: 'Produit de la densité $\\mathcal{N}(n\\mu,n\\sigma^2)$ en $z$ et de la densité Gamma $\\propto y^{(n-1)/2-1}e^{-y/(2\\sigma^2)}$ en $y$ ; $C_n=\\frac{1}{\\sqrt{2\\pi n\\sigma^2}}(\\frac1{2\\sigma^2})^{(n-1)/2}\\frac1{\\Gamma((n-1)/2)}$.' },
          { text: '$\\big(\\mathbb{R}^2,\\mathcal{B}(\\mathbb{R}^2),\\{\\rho_{n,\\theta}\\cdot\\mathrm{Leb}^{\\otimes2}\\}\\big)$ avec $\\rho_{n,\\theta}(z,y)=C_n\\,e^{-(z-n\\mu)^2/(2n\\sigma^2)}\\,e^{-y/(2\\sigma^2)}y^{(n-1)/2}$', correct: false, explanation: 'Deux erreurs : $K_n\\ge0$ donc l’espace est $\\mathbb{R}\\times\\mathbb{R}_+$ avec l’indicatrice ; et l’exposant Gamma est $a-1=\\frac{n-1}2-1=\\frac{n-3}2$.' },
          { text: '$\\big(\\mathbb{R}\\times\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}\\times\\mathbb{R}_+),\\{\\rho_{n,\\theta}\\cdot\\mathrm{Leb}^{\\otimes n}\\}\\big)$', correct: false, explanation: 'La mesure dominante du modèle induit vit sur l’espace d’arrivée $\\mathbb{R}\\times\\mathbb{R}_+$ (dimension 2), pas sur $\\mathbb{R}^n$.' },
        ],
      },
    ],
    conclusion: 'Attention : dans cet exercice $S_n$ est la **somme** et $K_n/n$ (l’estimateur proposé de $\\sigma^2$) est biaisé. Complément du corrigé : $(S_n,\\sum_iX_i^2)$ n’est **pas** un couple indépendant (support $\\{v\\ge u^2/n\\}$).',
  },
  {
    id: 'ch1-etape-weibull',
    type: 'etape-suivante',
    title: 'CC 2022 Ex. 1 Q1 — Loi de X^c par la fonction muette',
    source: 'CC MAP433 2022 Ex. 1 Q1 ; Poly ch.1, Prop. 2.1',
    origin: 'annale',
    difficulty: 2,
    tags: ['changement-variables', 'modele-induit'],
    setup: '$X$ de densité $p_\\theta(x)=\\frac c\\theta x^{c-1}e^{-x^c/\\theta}\\mathbb{1}_{\\mathbb{R}_+}(x)$, $c>0$ connu. Montrer que $X^c$ suit une loi exponentielle de paramètre d’échelle $\\theta$.',
    steps: [
      {
        prompt: 'Étape 1 — Première ligne de la rédaction :',
        choices: [
          { text: 'Soit $h$ borélienne bornée ; $\\mathbb{E}_\\theta[h(X^c)]=\\int_0^{+\\infty}h(x^c)\\frac c\\theta x^{c-1}e^{-x^c/\\theta}\\,\\mathrm{d}x$ (théorème de transfert).', correct: true, explanation: 'Méthode de la fonction muette : on part de l’espérance d’une fonction test quelconque de la transformée.' },
          { text: '$\\mathbb{P}_\\theta(X^c\\le y)=\\mathbb{P}_\\theta(X\\le y)^c$.', correct: false, explanation: 'Faux : $\\{X^c\\le y\\}=\\{X\\le y^{1/c}\\}$ ; la puissance ne « sort » pas de la probabilité. (La f.d.r. est une méthode alternative valable, mais pas sous cette forme.)' },
          { text: 'La densité de $X^c$ est $p_\\theta(y^c)$.', correct: false, explanation: 'Oubli du jacobien et mauvaise réciproque : il faut composer $p_\\theta$ par $\\phi^{-1}(y)=y^{1/c}$ et multiplier par $|(\\phi^{-1})\'(y)|$.' },
        ],
      },
      {
        prompt: 'Étape 2 — Changement de variable $y=x^c$ sur $]0,+\\infty[$ :',
        choices: [
          { text: '$\\mathrm{d}y=cx^{c-1}\\,\\mathrm{d}x$, donc $\\mathbb{E}_\\theta[h(X^c)]=\\int_0^{+\\infty}h(y)\\,\\theta^{-1}e^{-y/\\theta}\\,\\mathrm{d}y$.', correct: true, explanation: 'Le facteur $cx^{c-1}$ de la densité est exactement le jacobien ; $\\phi:x\\mapsto x^c$ est un $\\mathcal{C}^1$-difféomorphisme croissant de $]0,\\infty[$ sur lui-même.' },
          { text: '$\\mathrm{d}y=x^{c}\\,\\mathrm{d}x$, donc $\\mathbb{E}_\\theta[h(X^c)]=\\int_0^{+\\infty}h(y)\\frac c\\theta y^{-1/c}e^{-y/\\theta}\\,\\mathrm{d}y$.', correct: false, explanation: 'Dérivée fausse : $(x^c)\'=cx^{c-1}$ ; il ne doit rester aucune puissance de $y$.' },
          { text: '$\\mathrm{d}y=cx^{c-1}\\,\\mathrm{d}x$, donc $\\mathbb{E}_\\theta[h(X^c)]=\\int_{\\mathbb{R}}h(y)\\,\\theta^{-1}e^{-y/\\theta}\\,\\mathrm{d}y$.', correct: false, explanation: 'Support oublié : $y=x^c>0$, l’intégrale porte sur $]0,+\\infty[$ (indicatrice $\\mathbb{1}_{\\mathbb{R}_+}(y)$).' },
        ],
      },
      {
        prompt: 'Étape 3 — Conclusion et lecture de la convention :',
        choices: [
          { text: 'L’égalité valant pour toute $h$, $X^c$ a pour densité $q_\\theta(y)=\\theta^{-1}e^{-y/\\theta}\\mathbb{1}_{\\mathbb{R}_+}(y)$ : exponentielle de **paramètre d’échelle** $\\theta$ (moyenne $\\theta$) ; dans la convention du poly, c’est $\\mathcal{E}(1/\\theta)$.', correct: true, explanation: 'Identification par la fonction muette ; le CC 2022 utilise la convention d’échelle, le poly l’intensité.' },
          { text: 'L’égalité valant pour toute $h$, $X^c\\sim\\mathcal{E}(\\theta)$ au sens du poly, de moyenne $1/\\theta$.', correct: false, explanation: 'La densité obtenue est $\\theta^{-1}e^{-y/\\theta}$, de moyenne $\\theta$ : c’est $\\mathcal{E}(1/\\theta)$ avec la convention d’intensité du poly.' },
          { text: 'On ne peut rien conclure sans vérifier que $h$ est continue.', correct: false, explanation: 'La classe des $h$ boréliennes bornées (ou positives) suffit à caractériser une loi ; aucune continuité n’est nécessaire.' },
        ],
      },
    ],
    conclusion: 'Suite du sujet : $T=\\sum_iX_i^c\\sim\\mathrm{Gamma}(n,\\theta)$ (échelle) par additivité, puis test UPP et puissance (chapitre 5). La seule ligne « ch.1 » de l’exercice rapporte 0,75 pt : ne pas la bâcler.',
  },
  {
    id: 'ch1-etape-lognormale',
    type: 'etape-suivante',
    title: 'Examen 2025 Ex. 2 Q1 — Densité de X = e^{μ+σξ}',
    source: 'Examen 2025 Ex. 2 Q1 ; Poly ch.1, Prop. 2.1',
    origin: 'annale',
    difficulty: 2,
    tags: ['changement-variables', 'modele-induit'],
    setup: '$X=e^{\\mu+\\sigma\\xi}$, $\\xi\\sim\\mathcal{N}(0,1)$, $\\theta=(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*$. Déterminer le support $S$ et la densité de $X$.',
    steps: [
      {
        prompt: 'Étape 1 — Support de la loi de $X$ et loi de $Y=\\ln X$ :',
        choices: [
          { text: '$S=\\,]0,+\\infty[$ et $Y=\\mu+\\sigma\\xi\\sim\\mathcal{N}(\\mu,\\sigma^2)$.', correct: true, explanation: 'Exponentielle d’un réel : $X>0$ ; $Y=\\ln X$ est une transformation affine de $\\xi$ (Lemme 2.1 (i)).' },
          { text: '$S=\\mathbb{R}$ et $Y\\sim\\mathcal{N}(\\mu,\\sigma^2)$.', correct: false, explanation: '$e^{u}>0$ pour tout $u$ : le support est $]0,\\infty[$ ; l’oubli du support est pénalisé.' },
          { text: '$S=\\,]0,+\\infty[$ et $Y\\sim\\mathcal{N}(\\mu,\\sigma)$.', correct: false, explanation: '$\\mathrm{Var}(\\mu+\\sigma\\xi)=\\sigma^2$ : la gaussienne est notée par sa **variance** $\\sigma^2$.' },
        ],
      },
      {
        prompt: 'Étape 2 — Pour $h$ mesurable bornée, $\\mathbb{E}[h(X)]=\\int_{\\mathbb{R}}h(e^y)\\frac{e^{-(y-\\mu)^2/(2\\sigma^2)}}{\\sqrt{2\\pi\\sigma^2}}\\,\\mathrm{d}y$. Le changement de variable $x=e^y$ donne :',
        choices: [
          { text: '$y=\\ln x$, $\\mathrm{d}y=\\mathrm{d}x/x$ : $\\mathbb{E}[h(X)]=\\int_0^{+\\infty}h(x)\\frac{e^{-(\\ln x-\\mu)^2/(2\\sigma^2)}}{x\\sqrt{2\\pi\\sigma^2}}\\,\\mathrm{d}x$.', correct: true, explanation: '$\\phi^{-1}=\\ln$, $(\\phi^{-1})\'(x)=1/x>0$ sur $]0,\\infty[$.' },
          { text: '$y=\\ln x$, $\\mathrm{d}y=x\\,\\mathrm{d}x$ : $\\mathbb{E}[h(X)]=\\int_0^{+\\infty}h(x)\\frac{x\\,e^{-(\\ln x-\\mu)^2/(2\\sigma^2)}}{\\sqrt{2\\pi\\sigma^2}}\\,\\mathrm{d}x$.', correct: false, explanation: 'Jacobien inversé : $\\mathrm{d}x=e^y\\mathrm{d}y=x\\,\\mathrm{d}y$ donc $\\mathrm{d}y=\\mathrm{d}x/x$.' },
          { text: '$y=e^x$, $\\mathrm{d}y=e^x\\mathrm{d}x$ : $\\mathbb{E}[h(X)]=\\int_{\\mathbb{R}}h(x)\\frac{e^{x}e^{-(e^x-\\mu)^2/(2\\sigma^2)}}{\\sqrt{2\\pi\\sigma^2}}\\,\\mathrm{d}x$.', correct: false, explanation: 'Sens de la transformation inversé : $X=e^Y$ donc $Y=\\ln X$, on substitue $y=\\ln x$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Conclusion :',
        choices: [
          { text: 'Pour toute $h$, donc $p_{\\mu,\\sigma}(x)=\\dfrac{1}{x\\sqrt{2\\pi\\sigma^2}}\\exp\\Big(-\\dfrac{(\\ln x-\\mu)^2}{2\\sigma^2}\\Big)\\mathbb{1}_{]0,+\\infty[}(x)$ : densité de la loi **log-normale** $LN(\\mu,\\sigma^2)$ par rapport à $\\mathrm{Leb}$.', correct: true, explanation: 'Identification par la fonction muette ; modèle induit $(\\mathbb{R}_+^*,\\mathcal{B}(\\mathbb{R}_+^*),\\{p_{\\mu,\\sigma}\\cdot\\mathrm{Leb}\\})$.' },
          { text: 'Donc $X\\sim\\mathcal{N}(e^\\mu,e^{\\sigma^2})$.', correct: false, explanation: 'L’exponentielle d’une gaussienne n’est pas gaussienne (support positif, densité asymétrique) ; $\\mathbb{E}[X]=e^{\\mu+\\sigma^2/2}$ n’est même pas $e^\\mu$.' },
          { text: 'Donc $X$ a pour densité celle de $\\mathcal{N}(\\mu,\\sigma^2)$ évaluée en $\\ln x$.', correct: false, explanation: 'Il manque le facteur $1/x$ : sans lui, $\\int_0^\\infty\\cdots\\mathrm{d}x\\ne1$.' },
        ],
      },
    ],
    conclusion: 'Le reste du problème passe par $Y_i=\\ln X_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$ (modèle induit, i.i.d.) : EMV (Q2), biais et variance via Gosset (Q3–Q4), IC pour $\\sigma^2$ par le pivot $\\chi^2(n-1)$ (Q5).',
  },
  {
    id: 'ch1-etape-rr',
    type: 'etape-suivante',
    title: 'Réponses randomisées : du modèle induit à la variance',
    source: 'Poly ch.1, §1.8, p. 18–19',
    origin: 'poly',
    difficulty: 2,
    tags: ['modele-induit', 'estimateur', 'identifiabilite'],
    setup: '$X_i\\in\\{0,1\\}$ vraie réponse (loi $\\mathcal{B}\\mathrm{er}(\\theta)$), $U_i\\sim\\mathcal{B}\\mathrm{er}(q)$ indépendante, $q$ connu ; on observe $\\mathrm{RR}_i=U_iX_i+(1-U_i)(1-X_i)$.',
    steps: [
      {
        prompt: 'Étape 1 — $\\mathbb{P}_\\theta(\\mathrm{RR}_i=1)$ vaut :',
        choices: [
          { text: '$q\\theta+(1-q)(1-\\theta)$', correct: true, explanation: '$\\{\\mathrm{RR}_i=1\\}=\\{U_i=1,X_i=1\\}\\cup\\{U_i=0,X_i=0\\}$ (disjoints), et indépendance de $U_i$ et $X_i$.' },
          { text: '$q\\theta$', correct: false, explanation: 'Oubli du cas « $U_i=0$ et $X_i=0$ » où le participant répond l’opposé de 0, soit 1.' },
          { text: '$\\theta$', correct: false, explanation: 'Ce serait le cas sans randomisation ($q=1$) ; la randomisation déforme la proportion observée.' },
        ],
      },
      {
        prompt: 'Étape 2 — Le modèle induit par $(\\mathrm{RR}_1,\\dots,\\mathrm{RR}_n)$ est :',
        choices: [
          { text: 'Le $n$-échantillon de $\\big(\\{0,1\\},\\mathcal{P}(\\{0,1\\}),\\{\\mathcal{B}\\mathrm{er}(\\theta q+(1-\\theta)(1-q)),\\theta\\in[0,1]\\}\\big)$.', correct: true, explanation: 'Les couples $(U_i,X_i)$ sont i.i.d., donc les $\\mathrm{RR}_i$ aussi : loi produit d’une même Bernoulli reparamétrée.' },
          { text: 'Le $n$-échantillon de $\\big(\\{0,1\\},\\mathcal{P}(\\{0,1\\}),\\{\\mathcal{B}\\mathrm{er}(\\theta),\\theta\\in[0,1]\\}\\big)$.', correct: false, explanation: 'Le paramètre de la Bernoulli observée n’est pas $\\theta$ mais $\\theta q+(1-\\theta)(1-q)$ : c’est toute la difficulté.' },
          { text: 'Un modèle sur $\\{0,1\\}^n\\times\\{0,1\\}^n$ incluant les $U_i$.', correct: false, explanation: 'Les $U_i$ ne sont **pas observés** (ils restent secrets) ; le modèle induit porte uniquement sur les $\\mathrm{RR}_i$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Estimateur des moments de $\\theta$ (pour $q\\ne1/2$) :',
        choices: [
          { text: '$\\hat\\theta_n=\\dfrac{\\overline{\\mathrm{RR}}_n-(1-q)}{2q-1}$', correct: true, explanation: '$\\mathbb{E}_\\theta[\\mathrm{RR}_i]=\\theta(2q-1)+1-q$, on inverse la relation affine et on remplace l’espérance par la moyenne empirique ; sans biais.' },
          { text: '$\\hat\\theta_n=\\overline{\\mathrm{RR}}_n$', correct: false, explanation: 'Biaisé : $\\mathbb{E}[\\overline{\\mathrm{RR}}_n]=\\theta q+(1-\\theta)(1-q)\\ne\\theta$.' },
          { text: '$\\hat\\theta_n=\\dfrac{\\overline{\\mathrm{RR}}_n-q}{1-2q}$', correct: false, explanation: 'Mauvaise inversion : $\\theta=(\\mathbb{E}[\\mathrm{RR}]-(1-q))/(2q-1)$. (Vérifier avec $q=1$ : on doit retrouver $\\overline{\\mathrm{RR}}_n$.)' },
        ],
      },
      {
        prompt: 'Étape 4 — $\\mathrm{Var}_\\theta(\\hat\\theta_n)$ est minorée par :',
        choices: [
          { text: '$\\dfrac{q(1-q)}{n(2q-1)^2}$, qui explose quand $q\\to1/2$', correct: true, explanation: '$\\mathrm{Var}(\\hat\\theta_n)=\\frac{p(1-p)}{n(2q-1)^2}$ avec $p=\\theta q+(1-\\theta)(1-q)$ compris entre $\\min(q,1-q)$ et $\\max(q,1-q)$, donc $p(1-p)\\ge q(1-q)$. En $q=1/2$ le modèle n’est plus identifiable.' },
          { text: '$\\dfrac{\\theta(1-\\theta)}{n}$', correct: false, explanation: 'C’est la variance de $\\bar X_n$ si l’on observait directement les $X_i$ ; la randomisation **augmente** la variance du facteur $(2q-1)^{-2}$ au moins.' },
          { text: '$\\dfrac{q(1-q)}{n}$', correct: false, explanation: 'Oubli du facteur $(2q-1)^{-2}$ provenant de l’inversion de la relation affine : c’est lui qui explose en $q=1/2$.' },
        ],
      },
    ],
    conclusion: 'Plus précisément, avec $p=(1-q)+\\theta(2q-1)$, on a $p(1-p)=q(1-q)+(2q-1)^2\\theta(1-\\theta)$, d’où $\\mathrm{Var}_\\theta(\\hat\\theta_n)=\\frac{\\theta(1-\\theta)}n+\\frac{q(1-q)}{n(2q-1)^2}$ : la randomisation **ajoute** le terme $\\frac{q(1-q)}{n(2q-1)^2}$ à la variance de l’enquête directe. Pour $q=0{,}75$ : $\\hat\\theta_n=2(\\overline{\\mathrm{RR}}_n-0{,}25)$ et ce terme vaut $0{,}75/n$, alors que $\\theta(1-\\theta)/n\\le0{,}25/n$ : la variance est multipliée par au moins $4$.',
  },
  {
    id: 'ch1-etape-exp-translatee',
    type: 'etape-suivante',
    title: 'CC 2022 Ex. 3 — Espacements d’un échantillon exponentiel translaté',
    source: 'CC MAP433 2022 Ex. 3 Q3–Q4, Q6 ; PC3 Ex. 5 Q2',
    origin: 'annale',
    difficulty: 3,
    tags: ['statistiques-ordre', 'changement-variables'],
    setup: 'Densité $f_\\theta(x)=\\lambda^{-1}e^{-(x-a)/\\lambda}\\mathbb{1}_{[a,\\infty[}(x)$, $\\theta=(a,\\lambda)$ ; $U_1=nX_{1:n}$, $U_k=(n-k+1)(X_{k:n}-X_{(k-1):n})$ ; densité jointe des statistiques d’ordre $n!\\,p_\\theta(y)\\mathbb{1}_{\\{a\\le y_1<\\dots<y_n\\}}$ ; identité $\\sum_iy_i=ny_1+\\sum_{i\\ge2}(n-i+1)(y_i-y_{i-1})$.',
    steps: [
      {
        prompt: 'Étape 1 — Après le changement de variables $u_1=ny_1$, $u_k=(n-k+1)(y_k-y_{k-1})$ (jacobien $n!$), la densité de $(U_1,\\dots,U_n)$ s’écrit :',
        choices: [
          { text: '$\\lambda^{-n}e^{-(u_1-na)/\\lambda}\\mathbb{1}_{\\{u_1>na\\}}$ $\\times\\prod_{i\\ge2}e^{-u_i/\\lambda}\\mathbb{1}_{\\mathbb{R}_+}(u_i)$', correct: true, explanation: 'Le $n!$ du jacobien compense le $n!$ de la densité jointe ; $\\sum_iy_i=\\sum_iu_i$ par l’identité, et $\\sum_i(y_i-a)=\\sum_iu_i-na$ ; la contrainte $y_1\\ge a$ devient $u_1\\ge na$.' },
          { text: '$(n!)^2\\lambda^{-n}e^{-(\\sum_iu_i-na)/\\lambda}$ $\\times\\mathbb{1}_{\\{u_1>na\\}}\\prod_{i\\ge2}\\mathbb{1}_{\\mathbb{R}_+}(u_i)$', correct: false, explanation: 'Le jacobien **compense** le facteur $n!$ : la densité ne contient plus de $n!$ (sinon elle n’intégrerait pas à 1).' },
          { text: '$\\lambda^{-n}e^{-(\\sum_iu_i-a)/\\lambda}\\prod_i\\mathbb{1}_{\\mathbb{R}_+}(u_i)$', correct: false, explanation: 'Le décalage est $na$ (il y a $n$ observations $\\ge a$ et $\\sum_i(y_i-a)=\\sum_iy_i-na$), et $u_1=ny_1\\ge na$, pas $\\ge0$.' },
        ],
      },
      {
        prompt: 'Étape 2 — On en déduit :',
        choices: [
          { text: '$U_1,\\dots,U_n$ indépendantes ; $U_1\\sim\\mathcal{E}(na,\\lambda)$ (exponentielle translatée de $na$) ; $U_2,\\dots,U_n\\sim\\mathrm{Gamma}(1,\\lambda)$ (échelle $\\lambda$).', correct: true, explanation: 'Densité de forme produit $\\Rightarrow$ indépendance ; chaque facteur est une densité exponentielle (translatée pour $U_1$).' },
          { text: '$U_1,\\dots,U_n$ i.i.d. de loi $\\mathcal{E}(a,\\lambda)$.', correct: false, explanation: '$U_1$ est translatée de $na$ (pas $a$) et $U_2,\\dots,U_n$ ne sont pas translatées : indépendantes mais pas identiquement distribuées.' },
          { text: 'Les $X_{k:n}$ sont indépendantes.', correct: false, explanation: 'Ce sont les **espacements** qui sont indépendants ; les statistiques d’ordre sont ordonnées donc dépendantes.' },
        ],
      },
      {
        prompt: 'Étape 3 — $T_1=\\sum_{i=1}^n(X_{i:n}-X_{1:n})$ et $T_2=X_{1:n}$ :',
        choices: [
          { text: '$T_1=\\sum_{i\\ge2}U_i\\sim\\mathrm{Gamma}(n-1,\\lambda)$, indépendante de $T_2=U_1/n\\sim\\mathcal{E}(a,\\lambda/n)$.', correct: true, explanation: 'Identité (3) : $\\sum_iX_{i:n}-nX_{1:n}=\\sum_{i\\ge2}U_i$ ; additivité Gamma ; $T_2$ fonction de $U_1$ seule, indépendante des autres $U_i$ ; changement d’échelle $v=u_1/n$.' },
          { text: '$T_1\\sim\\mathrm{Gamma}(n,\\lambda)$ et $T_2\\sim\\mathcal{E}(a,\\lambda)$.', correct: false, explanation: '$T_1$ ne somme que $n-1$ espacements ($i\\ge2$) ; et $X_{1:n}=U_1/n$ a une échelle divisée par $n$ : le minimum de $n$ exponentielles se concentre près de $a$.' },
          { text: '$T_1$ et $T_2$ sont dépendantes car toutes deux fonctions des $X_{i:n}$.', correct: false, explanation: 'Elles sont fonctions de blocs **disjoints** d’espacements indépendants ($U_1$ pour $T_2$, $U_2,\\dots,U_n$ pour $T_1$) : indépendantes.' },
        ],
      },
    ],
    conclusion: 'Suite du sujet (chapitre 4) : $T_1/\\lambda\\sim\\mathrm{Gamma}(n-1,1)$ est un pivot pour $\\lambda$, et $F_n(a)=(T_2-a)/((n-1)^{-1}T_1)$ est pivotale pour $a$ (quotient de deux pivots indépendants).',
  },
  {
    id: 'ch1-etape-cc2022-ex4-q4-q6',
    type: 'etape-suivante',
    title: 'CC 2022 Ex. 4 Q4–Q6 — espérance, covariance et variance de Ȳ − δβ̂₁',
    source: 'CC MAP433 2022 Ex. 4 Q4–Q6 (corrigé officiel) ; Poly ch.1, Prop. 2.4',
    origin: 'annale',
    difficulty: 1,
    tags: ['vecteurs-gaussiens', 'regression'],
    setup: 'Régression linéaire simple : $Y\\sim\\mathcal{N}(\\mathbf{X}\\beta,\\sigma^2\\mathrm{I}_n)$, $\\mathbf{X}=[\\mathbf{1},x]$ de rang 2, $\\beta=(\\beta_0,\\beta_1)^\\top$ avec $\\beta_1\\ne0$. On pose $u=x-\\bar x\\mathbf{1}$, $\\phi=-\\beta_0/\\beta_1$, $\\delta=\\bar x-\\phi$, $\\bar Y=\\frac1n\\mathbf{1}^\\top Y$ et $\\hat\\beta_1=\\frac{u^\\top Y}{\\|u\\|^2}$ (formule des moindres carrés, Q1). Outil : pour $a,b\\in\\mathbb{R}^n$, $\\mathbb{E}[a^\\top Y]=a^\\top\\mathbf{X}\\beta$ et $\\mathrm{Cov}(a^\\top Y,b^\\top Y)=\\sigma^2a^\\top b$ (Prop. 2.4).',
    steps: [
      {
        prompt: 'Q4 — Que vaut $\\mathbb{E}_\\theta[\\bar Y-\\delta\\hat\\beta_1]$ ?',
        choices: [
          { text: '$\\beta_0+\\beta_1\\bar x-\\delta\\beta_1=\\beta_0+\\beta_1\\phi=0$', correct: true, explanation: 'Linéarité : $\\mathbb{E}[\\bar Y]=\\frac1n\\sum_i(\\beta_0+\\beta_1x_i)=\\beta_0+\\beta_1\\bar x$ et $\\hat\\beta_1$ est sans biais ($u^\\top\\mathbf{1}=0$, $u^\\top x=\\|u\\|^2$). Comme $\\bar x-\\delta=\\phi=-\\beta_0/\\beta_1$, on obtient $\\beta_0+\\beta_1\\phi=0$.' },
          { text: '$\\beta_0-\\delta\\beta_1$, non nul en général', correct: false, explanation: 'Oubli du terme $\\beta_1\\bar x$ : $\\mathbb{E}[\\bar Y]=\\beta_0+\\beta_1\\bar x$, pas $\\beta_0$ (ce ne serait vrai que si $\\bar x=0$).' },
          { text: 'Nulle seulement si $\\bar x=0$', correct: false, explanation: 'Le choix $\\delta=\\bar x-\\phi$ est fait précisément pour annuler l’espérance quel que soit $x$ : $\\beta_0+\\beta_1(\\bar x-\\delta)=\\beta_0+\\beta_1\\phi=0$.' },
        ],
      },
      {
        prompt: 'Q5 — Que vaut $\\mathrm{Cov}_\\theta(\\bar Y,\\hat\\beta_1)$ ?',
        choices: [
          { text: '$\\dfrac{1}{n\\|u\\|^2}\\mathbf{1}^\\top(\\sigma^2\\mathrm{I}_n)u=\\dfrac{\\sigma^2\\,\\mathbf{1}^\\top u}{n\\|u\\|^2}=0$, car $\\mathbf{1}^\\top u=\\sum_i(x_i-\\bar x)=0$', correct: true, explanation: 'Covariance de deux formes linéaires du vecteur gaussien $Y$ de covariance $\\sigma^2\\mathrm{I}_n$ (Prop. 2.4), puis centrage de $u$.' },
          { text: '$-\\dfrac{\\sigma^2\\bar x}{\\|u\\|^2}$', correct: false, explanation: 'C’est $\\mathrm{Cov}(\\hat\\beta_0,\\hat\\beta_1)$ (terme hors diagonale de $\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1}$) : $\\hat\\beta_0=\\bar Y-\\hat\\beta_1\\bar x$ n’est pas $\\bar Y$.' },
          { text: '$\\dfrac{\\sigma^2}{\\|u\\|^2}$', correct: false, explanation: 'C’est $\\mathrm{Var}(\\hat\\beta_1)=\\mathrm{Cov}(\\hat\\beta_1,\\hat\\beta_1)$ ; ici le premier vecteur est $\\frac1n\\mathbf{1}$, orthogonal à $u$.' },
        ],
      },
      {
        prompt: 'Q6 — Que vaut $\\mathrm{Var}_\\theta(\\bar Y-\\delta\\hat\\beta_1)$ ?',
        choices: [
          { text: '$\\dfrac{\\sigma^2}n+\\delta^2\\dfrac{\\sigma^2}{\\|u\\|^2}=\\sigma^2w(\\delta)$, $w(\\delta)=\\frac1n+\\frac{\\delta^2}{\\|u\\|^2}$', correct: true, explanation: '$\\mathrm{Var}(A-\\delta B)=\\mathrm{Var}(A)+\\delta^2\\mathrm{Var}(B)-2\\delta\\,\\mathrm{Cov}(A,B)$ ; le terme croisé est nul par Q5, $\\mathrm{Var}(\\bar Y)=\\sigma^2/n$ et $\\mathrm{Var}(\\hat\\beta_1)=\\sigma^2/\\|u\\|^2$.' },
          { text: '$\\dfrac{\\sigma^2}n-\\delta^2\\dfrac{\\sigma^2}{\\|u\\|^2}$', correct: false, explanation: 'Erreur de signe : la variance d’une différence de variables décorrélées est la **somme** des variances (le coefficient $-\\delta$ est élevé au carré).' },
          { text: '$\\dfrac{\\sigma^2}n+\\delta\\dfrac{\\sigma^2}{\\|u\\|^2}$', correct: false, explanation: '$\\mathrm{Var}(\\delta B)=\\delta^2\\mathrm{Var}(B)$, pas $\\delta\\,\\mathrm{Var}(B)$ (une variance doit rester positive pour $\\delta<0$).' },
          { text: '$\\dfrac{\\sigma^2}n+\\delta^2\\dfrac{\\sigma^2}{\\|u\\|^2}+\\dfrac{2\\delta\\sigma^2\\bar x}{\\|u\\|^2}$', correct: false, explanation: 'Terme croisé $-2\\delta\\,\\mathrm{Cov}$ calculé avec $\\mathrm{Cov}(\\hat\\beta_0,\\hat\\beta_1)=-\\sigma^2\\bar x/\\|u\\|^2$ au lieu de $\\mathrm{Cov}(\\bar Y,\\hat\\beta_1)=0$ (Q5).' },
        ],
      },
    ],
    conclusion: 'Avec Q7 ($\\bar Y-\\delta\\hat\\beta_1=v^\\top Y$, $v=\\frac1n\\mathbf{1}-\\frac\\delta{\\|u\\|^2}u$, gaussienne et indépendante de $S^2$ par Cochran ; annale « CC MAP433 2022 Ex. 2 Q1 et Ex. 4 Q2–3, 7 » de ce chapitre), on obtient $\\bar Y-\\delta\\hat\\beta_1\\sim\\mathcal{N}(0,\\sigma^2w(\\delta))$ ; la suite (Q8–Q9, loi $\\mathrm{F}(1,n-2)$ et région de Fieller) est traitée au ch.4.',
  },
  // ------------------------------------------------------------------ Associer
  {
    id: 'ch1-assoc-modele-mesure',
    type: 'associer',
    title: 'Modèle ↔ mesure dominante et densité',
    source: 'Poly ch.1, Déf. 1, Ex. 1.5 ; Outils « Lois usuelles »',
    origin: 'poly',
    difficulty: 1,
    tags: ['domination', 'cours'],
    prompt: 'Associer chaque famille de lois à la mesure dominante usuelle et à la densité correspondante.',
    pairs: [
      { left: '$\\{\\mathcal{B}\\mathrm{er}(\\theta)^{\\otimes n},\\ \\theta\\in[0,1]\\}$', right: 'Comptage sur $\\{0,1\\}^n$ ; $\\theta^{\\sum_ix_i}(1-\\theta)^{n-\\sum_ix_i}$', explanation: 'Ex. 1.5 (3) : lois discrètes, mesure de comptage.' },
      { left: '$\\{\\mathcal{P}\\mathrm{oi}(\\lambda),\\ \\lambda>0\\}$', right: 'Comptage sur $\\mathbb{N}$ ; $e^{-\\lambda}\\lambda^k/k!$', explanation: 'Ex. 1.5 (2) : la densité coïncide avec la probabilité du singleton.' },
      { left: '$\\{\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n),\\ (\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*\\}$', right: '$\\mathrm{Leb}^{\\otimes n}$ ; $(2\\pi\\sigma^2)^{-n/2}\\exp\\big(-\\frac1{2\\sigma^2}\\sum_i(x_i-\\mu)^2\\big)$', explanation: 'Ex. 1.5 (1) : densité produit des gaussiennes.' },
      { left: '$\\{\\mathcal{E}(\\lambda),\\ \\lambda>0\\}$', right: '$\\mathrm{Leb}$ sur $\\mathbb{R}$ ; $\\lambda e^{-\\lambda x}\\mathbb{1}_{\\mathbb{R}_+}(x)$', explanation: 'Ex. 1.3 / §1.3 : convention d’intensité, moyenne $1/\\lambda$.' },
      { left: '$\\{\\mathcal{U}([0,\\theta]),\\ \\theta>0\\}$', right: '$\\mathrm{Leb}$ sur $\\mathbb{R}$ ; $\\theta^{-1}\\mathbb{1}_{[0,\\theta]}(x)$', explanation: 'Ex. 1.13 : support dépendant de $\\theta$ (modèle non régulier, ch.3).' },
      { left: '$\\{\\min(X,\\tau)\\ :\\ X\\sim\\mathcal{E}(\\theta),\\ \\theta>0\\}$ (censure)', right: '$\\mathrm{Leb}+\\delta_\\tau$ ; $\\theta e^{-\\theta x}\\mathbb{1}_{x<\\tau}+e^{-\\theta\\tau}\\mathbb{1}_{x=\\tau}$', explanation: 'Compléments Ex. 4.6 : atome en $\\tau$, mesure mixte.' },
    ],
  },
  {
    id: 'ch1-assoc-stat-loi',
    type: 'associer',
    title: 'Statistique gaussienne ↔ loi exacte',
    source: 'Poly ch.1, Thm 1.3, Prop. 2.9 ; CC 2022 Ex. 2 Q1 ; Examen 2025 Ex. 2 Q3–Q5',
    origin: 'variante',
    difficulty: 2,
    tags: ['gosset', 'chi2', 'student'],
    prompt: '$X_1,\\dots,X_n$ i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$, $n\\ge2$. Associer chaque quantité à sa loi exacte.',
    pairs: [
      { left: '$\\bar X_n$', right: '$\\mathcal{N}(\\mu,\\sigma^2/n)$', explanation: 'Gosset (i), Prop. 2.4.' },
      { left: '$(n-1)S_n^2/\\sigma^2$', right: '$\\chi^2(n-1)$', explanation: 'Gosset (ii) : projection sur l’orthogonal de $\\mathbb{R}\\mathbf{1}_n$.' },
      { left: '$\\sum_{i=1}^n(X_i-\\mu)^2/\\sigma^2$', right: '$\\chi^2(n)$', explanation: 'Prop. 2.9 (i) : $n$ carrés de $\\mathcal{N}(0,1)$ indépendantes (centrage par la vraie moyenne).' },
      { left: '$\\sqrt n(\\bar X_n-\\mu)/S_n$', right: '$t(n-1)$', explanation: 'Gosset (iv) : quotient de $\\mathcal{N}(0,1)$ et $\\sqrt{\\chi^2(n-1)/(n-1)}$ indépendants.' },
      { left: '$\\sqrt n(\\bar X_n-\\mu)/\\sigma$', right: '$\\mathcal{N}(0,1)$', explanation: 'Réduction de $\\bar X_n$ ; pivot quand $\\sigma$ est connu.' },
      { left: '$\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(X_i-\\bar X_n)^2$', right: '$\\frac{\\sigma^2}{n}\\chi^2(n-1)$ (espérance $\\frac{n-1}n\\sigma^2$)', explanation: 'Examen 2025 Ex. 2 Q4 : $n\\widehat{\\sigma^2}_{ML}/\\sigma^2\\sim\\chi^2(n-1)$, biais $-\\sigma^2/n$.' },
    ],
  },
  {
    id: 'ch1-assoc-hypotheses',
    type: 'associer',
    title: 'Résultat ↔ hypothèse caractéristique',
    source: 'Poly ch.1, Déf. 1, Déf. 12, Thm 1.1, Thm 1.3, Prop. 2.1, Prop. 2.6, Thm 2.1',
    origin: 'poly',
    difficulty: 1,
    tags: ['cours', 'hypotheses'],
    prompt: 'Associer chaque énoncé du chapitre à l’hypothèse sans laquelle il tombe.',
    pairs: [
      { left: 'Théorème de Cochran (indépendance des projections)', right: 'Covariance **isotrope** $\\sigma^2\\mathrm{I}_n$ et sous-espaces orthogonaux de somme $\\mathbb{R}^n$', explanation: 'L’invariance par rotation de $\\mathcal{N}(0,\\mathrm{I}_n)$ est le cœur de la preuve.' },
      { left: 'Théorème de Gosset ($\\bar X_n\\perp S_n^2$)', right: 'Observations i.i.d. **gaussiennes**', explanation: 'Faux pour toute autre loi (Lukacs).' },
      { left: 'Décorrélation $\\Rightarrow$ indépendance (Prop. 2.6)', right: 'Le couple forme un **vecteur gaussien**', explanation: 'Contre-exemple $Y=\\varepsilon X$ sinon.' },
      { left: 'Loi de Student de $X/\\sqrt{Y/r}$ (Déf. 12)', right: '$X\\sim\\mathcal{N}(0,1)$ et $Y\\sim\\chi^2(r)$ **indépendantes**', explanation: 'C’est Gosset (iii) qui fournit l’indépendance pour $T_n$.' },
      { left: 'Radon–Nikodym : $\\nu\\ll\\mu\\Rightarrow\\nu=f\\cdot\\mu$ (Thm 2.1)', right: '$\\mu$ **$\\sigma$-finie**', explanation: 'Hypothèse de la Déf. 1 (modèle dominé).' },
      { left: 'Formule $q(y)=p(\\phi^{-1}(y))|(\\phi^{-1})\'(y)|$ (Prop. 2.1)', right: '$\\phi$ de classe $\\mathcal{C}^1$ avec $\\phi\'\\ne0$ (strictement monotone) sur un intervalle ouvert', explanation: 'Sinon découper en branches injectives et sommer (Ex. 2.2).' },
    ],
  },
  // ------------------------------------------------------------------ Numérique
  {
    id: 'ch1-num-football',
    type: 'numerique',
    title: 'PC1 Ex. 5 — Estimateur des moments de λ dans le mélange zéro-enflé',
    source: 'PC1 Ex. 5 Q10 (corrigé p. 22)',
    origin: 'pc',
    difficulty: 2,
    tags: ['estimateur', 'melange'],
    question: 'Mélange $p_{\\pi,\\lambda}(k)=(1-\\pi)\\mathbb{1}_{\\{0\\}}(k)+\\pi e^{-\\lambda}\\lambda^k/k!$ : $\\mathbb{E}[X]=\\pi\\lambda$, $\\mathbb{E}[X^2]=\\pi\\lambda(1+\\lambda)$. Pour l’équipe locale, moyenne empirique $s_{1,n}=1{,}468$ et variance empirique $1{,}617$ (donc $s_{2,n}=1{,}617+1{,}468^2$). Calculer $\\check\\lambda_n=s_{2,n}/s_{1,n}-1$.',
    answer: 1.5695,
    tolerance: 0.003,
    hint: '(arrondir à $10^{-3}$)',
    explanation: '$s_{2,n}=1{,}617+2{,}155=3{,}772$ ; $\\check\\lambda_n=3{,}772/1{,}468-1=2{,}5695-1=1{,}5695$. Puis $\\hat\\pi_n=s_{1,n}^2/(s_{2,n}-s_{1,n})=2{,}155/2{,}304\\approx0{,}935$ : environ 6,5 % de matchs « à zéro structurel » en plus de ce que prévoit la Poisson. Le modèle est bien défini car la variance empirique ($1{,}617$) dépasse la moyenne ($1{,}468$) : sur-dispersion.',
  },
  {
    id: 'ch1-num-rr',
    type: 'numerique',
    title: 'Réponses randomisées : valeur de l’estimateur',
    source: 'Poly ch.1, §1.8, p. 19',
    origin: 'poly',
    difficulty: 1,
    tags: ['estimateur', 'modele-induit'],
    question: 'Protocole de réponses randomisées avec $q=0{,}75$ ; sur $n=400$ participants, la proportion de « oui » observée est $\\overline{\\mathrm{RR}}_n=0{,}40$. Valeur de l’estimateur $\\hat\\theta_n=(\\overline{\\mathrm{RR}}_n-(1-q))/(2q-1)$ ?',
    answer: 0.3,
    tolerance: 0.005,
    hint: '(arrondir à $10^{-2}$)',
    explanation: '$\\hat\\theta_n=(0{,}40-0{,}25)/0{,}5=0{,}30$ : 30 % des participants ont la caractéristique sensible, alors que seulement 40 % de « oui » ont été observés (le mélange avec les réponses inversées tire la proportion vers $1/2$). Écart-type approximatif : $\\sqrt{0{,}4\\times0{,}6/(400\\times0{,}25)}\\approx0{,}049$.',
  },
  {
    id: 'ch1-num-s4',
    type: 'numerique',
    title: 'CC 2022 — Moment d’ordre 4 de la variance empirique',
    source: 'CC MAP433 2022 Ex. 2 Q1(c) ; Poly ch.1, Prop. 2.8',
    origin: 'annale',
    difficulty: 2,
    tags: ['gosset', 'chi2'],
    question: '$X_1,\\dots,X_n$ i.i.d. $\\mathcal{N}(\\mu,1)$ avec $n=11$. Calculer $\\mathbb{E}[S_n^4]$ où $S_n^2=\\frac1{n-1}\\sum_i(X_i-\\bar X_n)^2$.',
    answer: 1.2,
    tolerance: 0.005,
    hint: '(arrondir à $10^{-2}$)',
    explanation: '$(n-1)S_n^2\\sim\\chi^2(n-1)$ (Gosset), de moyenne $n-1$ et de variance $2(n-1)$, donc $\\mathbb{E}[((n-1)S_n^2)^2]=(n-1)^2+2(n-1)$ et $\\mathbb{E}[S_n^4]=\\sigma^4\\big(1+\\frac2{n-1}\\big)=1+\\frac2{10}=1{,}2$. Ce moment sert au calcul du risque de $T_{2,n}=\\bar X_n^2-S_n^2/n$ dans le CC 2022.',
  },
  {
    id: 'ch1-num-max-uniforme',
    type: 'numerique',
    title: 'Modèle induit par le maximum (Ex. 1.13)',
    source: 'Poly ch.1, Ex. 1.13',
    origin: 'poly',
    difficulty: 1,
    tags: ['statistiques-ordre', 'modele-induit'],
    question: '$X_1,\\dots,X_5$ i.i.d. $\\mathcal{U}([0,\\theta])$ avec $\\theta=2$. Calculer $\\mathbb{P}_\\theta(X_{(5)}\\le1{,}8)$.',
    answer: 0.59049,
    tolerance: 0.002,
    hint: '(arrondir à $10^{-3}$)',
    explanation: 'Par indépendance, $\\mathbb{P}_\\theta(X_{(n)}\\le t)=\\prod_i\\mathbb{P}_\\theta(X_i\\le t)=(t/\\theta)^n=(1{,}8/2)^5=0{,}9^5=0{,}59049$. La densité du modèle induit est $q_{n,\\theta}(t)=nt^{n-1}\\theta^{-n}\\mathbb{1}_{[0,\\theta]}(t)$ et $\\mathbb{E}_\\theta[X_{(n)}]=\\frac n{n+1}\\theta=\\frac53$.',
  },
  // ------------------------------------------------------------------ Annales
  {
    id: 'ch1-annale-cc2022-ex3',
    type: 'annale',
    title: 'CC MAP433 2022 Ex. 3 (Q1–Q6) — Exponentielle translatée et statistiques d’ordre',
    source: 'CC MAP433 2022 Ex. 3 Q1–Q6 (avec corrigé) ; PC3 Ex. 5',
    origin: 'annale',
    difficulty: 3,
    tags: ['statistiques-ordre', 'changement-variables', 'modele-induit'],
    statement: `Soit $(X_1,\\dots,X_n)$ un $n$-échantillon de la loi $\\mathcal{E}(a,\\lambda)$ de densité $f_\\theta(x)=\\lambda^{-1}e^{-(x-a)/\\lambda}\\mathbb{1}_{[a,+\\infty[}(x)$, $\\theta=(a,\\lambda)\\in\\mathbb{R}\\times\\mathbb{R}_+^*$ (convention : $\\mathrm{Gamma}(p,\\lambda)$ **d’échelle** $\\lambda$, $\\mathbb{E}=p\\lambda$). On note $X_{1:n}<\\dots<X_{n:n}$ les statistiques d’ordre, $p_\\theta(y)=\\prod_if_\\theta(y_i)$, et

$$U_1:=nX_{1:n},\\qquad U_k:=(n-k+1)(X_{k:n}-X_{(k-1):n})\\quad(k\\ge2).$$

On admet l’identité $\\sum_{i=1}^nu_i=nu_1+\\sum_{i=2}^n(n-i+1)(u_i-u_{i-1})$ (3).

1. Montrer que pour toute $h$ mesurable bornée, $\\mathbb{E}_\\theta[h(X_{1:n},\\dots,X_{n:n})]$ $=\\sum_{\\tau\\in\\mathfrak{S}_n}\\mathbb{E}_\\theta\\big[h(X_{\\tau_1},\\dots,X_{\\tau_n})\\mathbb{1}_{A_\\tau}\\big]$ où $A_\\tau=\\{X_{\\tau_1}<\\dots<X_{\\tau_n}\\}$.
2. En déduire que la densité jointe de $(X_{1:n},\\dots,X_{n:n})$ est $n!\\,p_\\theta(y)\\mathbb{1}_{\\{a\\le y_1<\\dots<y_n\\}}$.
3. Montrer que $U_1,\\dots,U_n$ sont indépendantes et préciser leurs lois (on utilisera le changement de variables $u_1=ny_1$, $u_k=(n-k+1)(y_k-y_{k-1})$, de jacobien $n!$).
4. Montrer que $T_1:=\\sum_{i=1}^n(X_{i:n}-X_{1:n})$ est indépendante de $X_{1:n}$ et suit $\\mathrm{Gamma}(n-1,\\lambda)$.
5. En déduire un intervalle de confiance pour $\\lambda$ de couverture $1-\\alpha$ fondé sur $T_1$ (on notera $\\mathrm{Gqf}_{n-1}$ la fonction quantile de $\\mathrm{Gamma}(n-1,1)$).
6. Montrer que $T_2:=X_{1:n}\\sim\\mathcal{E}(a,\\lambda/n)$.`,
    hints: [
      'Q1–Q2 : il n’y a pas d’ex-aequo p.s. ; la permutation ordonnante $\\sigma$ est p.s. unique et $\\{\\sigma=\\tau\\}=\\{X_{\\tau_1}<\\dots<X_{\\tau_n}\\}$ ; par échangeabilité, chaque terme vaut la même intégrale.',
      'Q3 : écrire $\\mathbb{E}_\\theta[h(U)]$ avec la densité de Q2, changer de variables ; le jacobien $n!$ compense le $n!$ ; utiliser (3) pour transformer $\\sum_i(y_i-a)$ en $\\sum_iu_i-na$ ; le domaine devient $\\{u_1>na,u_2>0,\\dots,u_n>0\\}$.',
      'Q4–Q6 : (3) donne $T_1=\\sum_{i\\ge2}U_i$ ; additivité des Gamma de même échelle ; $T_2=U_1/n$ : changement de variable $v=u_1/n$ ; pour Q5, $T_1/\\lambda\\sim\\mathrm{Gamma}(n-1,1)$ est un pivot.',
    ],
    correction: `**Q1.** Les $X_i$ ont des lois à densité, donc $\\mathbb{P}_\\theta(X_i=X_j)=0$ pour $i\\ne j$ : il existe p.s. une unique permutation aléatoire $\\sigma$ telle que $X_{k:n}=X_{\\sigma_k}$ et $X_{\\sigma_1}<\\dots<X_{\\sigma_n}$. Les événements $\\{\\sigma=\\tau\\}$, $\\tau\\in\\mathfrak{S}_n$, forment une partition p.s. de l’espace, et $\\{\\sigma=\\tau\\}=\\{X_{\\tau_1}<\\dots<X_{\\tau_n}\\}$ p.s. Donc
$$\\mathbb{E}_\\theta[h(X_{1:n},\\dots,X_{n:n})]=\\mathbb{E}_\\theta[h(X_{\\sigma_1},\\dots,X_{\\sigma_n})]=\\sum_{\\tau\\in\\mathfrak{S}_n}\\mathbb{E}_\\theta\\big[h(X_{\\tau_1},\\dots,X_{\\tau_n})\\mathbb{1}_{\\{\\sigma=\\tau\\}}\\big]=\\sum_{\\tau}\\mathbb{E}_\\theta\\big[h(X_{\\tau_1},\\dots,X_{\\tau_n})\\mathbb{1}_{\\{X_{\\tau_1}<\\dots<X_{\\tau_n}\\}}\\big].$$

**Q2.** Les observations étant i.i.d. (Lemme 1.1 du ch.1), $(X_{\\tau_1},\\dots,X_{\\tau_n})$ a la même loi que $(X_1,\\dots,X_n)$, de densité $p_\\theta$. Chaque terme de la somme vaut donc $\\int h(y)p_\\theta(y)\\mathbb{1}_{\\{y_1<\\dots<y_n\\}}\\,\\mathrm{d}y$, indépendamment de $\\tau$ ; comme $\\mathrm{card}\\,\\mathfrak{S}_n=n!$ et que $p_\\theta(y)=0$ si $y_1<a$,
$$\\mathbb{E}_\\theta[h(X_{1:n},\\dots,X_{n:n})]=\\int h(y)\\,n!\\,p_\\theta(y)\\mathbb{1}_{\\{a\\le y_1<\\dots<y_n\\}}\\,\\mathrm{d}y,$$
ce qui identifie la densité (fonction muette, $h$ arbitraire).

**Q3.** Pour $h$ mesurable positive, par Q2 :
$$\\mathbb{E}_\\theta[h(U_1,\\dots,U_n)]=\\int_{a\\le y_1<\\dots<y_n}h\\big(ny_1,(n-1)(y_2-y_1),\\dots,y_n-y_{n-1}\\big)\\,n!\\,\\lambda^{-n}e^{-\\lambda^{-1}\\sum_i(y_i-a)}\\,\\mathrm{d}y.$$
L’application $\\phi:y\\mapsto u$ définie par $u_1=ny_1$, $u_k=(n-k+1)(y_k-y_{k-1})$ est linéaire triangulaire, bijective, de déterminant $n(n-1)\\cdots1=n!$ : par la formule du changement de variables (Prop. 2.2 du ch.1), $\\mathrm{d}y=\\mathrm{d}u/n!$, ce qui compense le facteur $n!$. Le domaine $\\{a\\le y_1<\\dots<y_n\\}$ devient $\\{u_1\\ge na,\\ u_2>0,\\dots,u_n>0\\}$. Par (3), $\\sum_iy_i=\\sum_iu_i$, donc $\\sum_i(y_i-a)=\\sum_iu_i-na$. Ainsi
$$\\mathbb{E}_\\theta[h(U)]=\\int h(u)\\,\\lambda^{-n}e^{-(u_1-na)/\\lambda}\\mathbb{1}_{\\{u_1>na\\}}\\prod_{i=2}^ne^{-u_i/\\lambda}\\mathbb{1}_{\\mathbb{R}_+}(u_i)\\,\\mathrm{d}u.$$
La densité est de **forme produit** : les $U_i$ sont indépendantes ; $U_1$ a pour densité $\\lambda^{-1}e^{-(u-na)/\\lambda}\\mathbb{1}_{u>na}$, i.e. $U_1\\sim\\mathcal{E}(na,\\lambda)$ ; pour $i\\ge2$, $U_i\\sim\\mathcal{E}(0,\\lambda)=\\mathrm{Gamma}(1,\\lambda)$.

**Q4.** Par (3) appliquée aux $X_{i:n}$ : $\\sum_iX_{i:n}=nX_{1:n}+\\sum_{i\\ge2}U_i$, donc $T_1=\\sum_{i=2}^nU_i$. C’est une somme de $n-1$ variables indépendantes $\\mathrm{Gamma}(1,\\lambda)$ : par additivité des lois Gamma de même échelle, $T_1\\sim\\mathrm{Gamma}(n-1,\\lambda)$. Elle est fonction de $(U_2,\\dots,U_n)$, indépendant de $U_1=nX_{1:n}$ : $T_1$ est indépendante de $X_{1:n}$.

**Q5.** $T_1/\\lambda\\sim\\mathrm{Gamma}(n-1,1)$ pour tout $\\theta$ : fonction pivotale. Avec $a_\\alpha=\\mathrm{Gqf}_{n-1}(\\alpha/2)$ et $b_\\alpha=\\mathrm{Gqf}_{n-1}(1-\\alpha/2)$, $\\mathbb{P}_\\theta(a_\\alpha\\le T_1/\\lambda\\le b_\\alpha)=1-\\alpha$, et $a_\\alpha\\le T_1/\\lambda\\le b_\\alpha\\iff T_1/b_\\alpha\\le\\lambda\\le T_1/a_\\alpha$ : l’intervalle $[T_1/b_\\alpha,\\ T_1/a_\\alpha]$ est de couverture $1-\\alpha$ (attention à l’inversion des bornes).

**Q6.** $T_2=U_1/n$. Pour $h$ mesurable positive, $\\mathbb{E}_\\theta[h(U_1/n)]=\\int_{na}^{\\infty}h(u/n)\\lambda^{-1}e^{-(u-na)/\\lambda}\\,\\mathrm{d}u=\\int_a^\\infty h(v)\\frac n\\lambda e^{-\\frac n\\lambda(v-a)}\\,\\mathrm{d}v$ ($v=u/n$, $\\mathrm{d}u=n\\,\\mathrm{d}v$) : $T_2\\sim\\mathcal{E}(a,\\lambda/n)$, exponentielle translatée de $a$ et d’échelle $\\lambda/n$.

*Rédaction type* : citer « densité de forme produit $\\Rightarrow$ indépendance », « jacobien $n!$ », « additivité des Gamma de même échelle », et préciser la convention (ici échelle : $\\mathbb{E}[T_1]=(n-1)\\lambda$).`,
    bareme: [
      { label: 'Q1 (partition selon la permutation ordonnante)', points: 0.5 },
      { label: 'Q2 (échangeabilité, n! termes)', points: 0.5 },
      { label: 'Q3 (changement de variables, indépendance, lois)', points: 1 },
      { label: 'Q4 (T₁ Gamma(n−1, λ), indépendance)', points: 0.5 },
      { label: 'Q5 (IC par pivot Gamma)', points: 0.5 },
      { label: 'Q6 (loi du minimum)', points: 0.25 },
    ],
    durationMin: 35,
  },
  {
    id: 'ch1-annale-2025-ex2-q1-q5',
    type: 'annale',
    title: 'Examen 2025 Ex. 2 (Q1, Q3–Q5) — Loi log-normale : densité, biais et variances via Gosset, IC pour σ²',
    source: 'Examen 2025 Ex. 2 Q1, Q3, Q4, Q5 (solution DIAGNOSTIC §2.A) ; Poly ch.1, Thm 1.3, Prop. 2.8',
    origin: 'annale',
    difficulty: 2,
    tags: ['changement-variables', 'gosset', 'chi2', 'modele-induit'],
    statement: `On observe un $n$-échantillon $(X_1,\\dots,X_n)$ de la loi log-normale $LN(\\mu,\\sigma^2)$ : $X=e^{\\mu+\\sigma\\xi}$ avec $\\xi\\sim\\mathcal{N}(0,1)$, $\\theta=(\\mu,\\sigma^2)\\in\\Theta=\\mathbb{R}\\times\\mathbb{R}_+^*$. On rappelle que $\\chi^2(p)=\\Gamma(p/2,1/2)$ (intensité), d’espérance $p$ et de variance $2p$, et l’on admet (Q2) que l’EMV est $\\hat\\mu_{ML}=\\bar Y_n$, $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2$ avec $Y_i=\\ln X_i$.

**Q1.** Déterminer le support $S$ de la loi de $X$ et montrer que sa densité est $p_{\\mu,\\sigma}(x)=\\dfrac{1}{x\\sqrt{2\\pi\\sigma^2}}\\exp\\Big(-\\dfrac{(\\ln x-\\mu)^2}{2\\sigma^2}\\Big)\\mathbb{1}_S(x)$.

**Q3.** Calculer le biais et la variance de $\\hat\\mu_{ML}$.

**Q4.** Calculer le biais et la variance de $\\widehat{\\sigma^2}_{ML}$.

**Q5.** Construire un intervalle de confiance bilatéral non asymptotique de niveau $1-\\alpha$ pour $\\sigma^2$.`,
    hints: [
      'Q1 : fonction muette avec $h$ bornée, $\\mathbb{E}[h(X)]=\\mathbb{E}[h(e^{\\mu+\\sigma\\xi})]$, changement de variable $x=e^y$, $\\mathrm{d}y=\\mathrm{d}x/x$.',
      'Q3–Q4 : les $Y_i=\\ln X_i$ sont i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$ (modèle induit) : appliquer le théorème de Gosset à $(\\bar Y_n,S_n^2)$ ; écrire $\\widehat{\\sigma^2}_{ML}=\\frac{n-1}nS_n^2$ et utiliser les moments du $\\chi^2(n-1)$.',
      'Q5 : $n\\widehat{\\sigma^2}_{ML}/\\sigma^2\\sim\\chi^2(n-1)$ pour tout $\\theta$ : pivot ; encadrer par les quantiles $\\chi^2_{\\alpha/2}(n-1)$ et $\\chi^2_{1-\\alpha/2}(n-1)$ puis inverser en $\\sigma^2$ (les bornes s’échangent).',
    ],
    correction: `**Q1.** $X=e^{\\mu+\\sigma\\xi}$ est l’exponentielle d’un réel : $S=\\,]0,+\\infty[$. Soit $h$ mesurable bornée ; comme $Y:=\\mu+\\sigma\\xi\\sim\\mathcal{N}(\\mu,\\sigma^2)$ (transformation affine d’une gaussienne, Lemme 2.1 du ch.1),
$$\\mathbb{E}[h(X)]=\\mathbb{E}[h(e^Y)]=\\int_{\\mathbb{R}}h(e^y)\\frac{1}{\\sqrt{2\\pi\\sigma^2}}e^{-(y-\\mu)^2/(2\\sigma^2)}\\,\\mathrm{d}y.$$
L’application $y\\mapsto e^y$ est un $\\mathcal{C}^1$-difféomorphisme croissant de $\\mathbb{R}$ sur $]0,\\infty[$, de réciproque $\\ln$ ; le changement de variable $x=e^y$, $y=\\ln x$, $\\mathrm{d}y=\\mathrm{d}x/x$ donne
$$\\mathbb{E}[h(X)]=\\int_0^{+\\infty}h(x)\\frac{1}{x\\sqrt{2\\pi\\sigma^2}}e^{-(\\ln x-\\mu)^2/(2\\sigma^2)}\\,\\mathrm{d}x.$$
L’égalité valant pour toute $h$, $X$ admet la densité annoncée par rapport à $\\mathrm{Leb}$ (méthode de la fonction muette, Prop. 2.1 du ch.1). Le modèle induit par $Y_i=\\ln X_i$ est le $n$-échantillon gaussien $\\{\\mathcal{N}(\\mu,\\sigma^2)^{\\otimes n}\\}$.

**Q3.** Les $Y_i=\\ln X_i$ sont i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$ ; par le théorème de Gosset (i) (observations i.i.d. gaussiennes, $n\\ge2$), $\\hat\\mu_{ML}=\\bar Y_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$. Donc $\\mathbb{E}_\\theta[\\hat\\mu_{ML}]=\\mu$ : **biais nul** ; $\\mathrm{Var}_\\theta(\\hat\\mu_{ML})=\\sigma^2/n$ (c’est la borne de Cramér-Rao pour $\\mu$ : estimateur efficace, ch.3).

**Q4.** $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2=\\frac{n-1}nS_n^2$ avec $S_n^2=\\frac1{n-1}\\sum_i(Y_i-\\bar Y_n)^2$. Par Gosset (ii), $(n-1)S_n^2/\\sigma^2=n\\widehat{\\sigma^2}_{ML}/\\sigma^2\\sim\\chi^2(n-1)$, d’espérance $n-1$ et de variance $2(n-1)$ (Prop. 2.8 du ch.1). Donc
$$\\mathbb{E}_\\theta[\\widehat{\\sigma^2}_{ML}]=\\frac{\\sigma^2}n(n-1)=\\frac{n-1}n\\sigma^2,\\qquad\\text{biais}=-\\frac{\\sigma^2}n\\ (\\text{sous-estimation}),\\qquad\\mathrm{Var}_\\theta(\\widehat{\\sigma^2}_{ML})=\\frac{\\sigma^4}{n^2}\\cdot2(n-1)=\\frac{2(n-1)\\sigma^4}{n^2}.$$
(Risque quadratique $\\frac{(2n-1)\\sigma^4}{n^2}$, inférieur à celui $\\frac{2\\sigma^4}{n-1}$ de l’estimateur sans biais $S_n^2$.)

**Q5.** La quantité $G(Z;\\sigma^2):=n\\widehat{\\sigma^2}_{ML}/\\sigma^2$ suit $\\chi^2(n-1)$ **pour tout** $\\theta\\in\\Theta$ : c’est une fonction pivotale (ch.4, Déf. 1.2). En notant $\\chi^2_\\beta(n-1)$ le quantile d’ordre $\\beta$ de $\\chi^2(n-1)$,
$$\\mathbb{P}_\\theta\\Big(\\chi^2_{\\alpha/2}(n-1)\\le\\frac{n\\widehat{\\sigma^2}_{ML}}{\\sigma^2}\\le\\chi^2_{1-\\alpha/2}(n-1)\\Big)=1-\\alpha,$$
et l’encadrement équivaut (les bornes s’échangent en passant à l’inverse) à
$$\\sigma^2\\in\\left[\\frac{n\\,\\widehat{\\sigma^2}_{ML}}{\\chi^2_{1-\\alpha/2}(n-1)}\\ ,\\ \\frac{n\\,\\widehat{\\sigma^2}_{ML}}{\\chi^2_{\\alpha/2}(n-1)}\\right],$$
intervalle de confiance **exact** (non asymptotique) de niveau $1-\\alpha$ pour $\\sigma^2$. Il ne dépend pas de $\\mu$ grâce au centrage par $\\bar Y_n$ (indépendance de Gosset (iii) non nécessaire ici, mais elle garantit que l’on pourrait combiner avec un IC pour $\\mu$).

*Rédaction* : nommer Gosset et vérifier « i.i.d. gaussiennes » ; écrire les moments du $\\chi^2$ ; dire « pivot » et justifier l’inversion des bornes.`,
    bareme: [
      { label: 'Q1 (support + densité par fonction muette)', points: 0.5 },
      { label: 'Q3 (biais nul, variance σ²/n par Gosset)', points: 0.5 },
      { label: 'Q4 (biais −σ²/n, variance 2(n−1)σ⁴/n²)', points: 0.5 },
      { label: 'Q5 (IC exact par pivot χ²)', points: 0.5 },
    ],
    durationMin: 20,
  },
  {
    id: 'ch1-annale-cc2022-gosset-cochran',
    type: 'annale',
    title: 'CC MAP433 2022 Ex. 2 Q1 et Ex. 4 Q2–3, 7 — Gosset et Cochran en régression',
    source: 'CC MAP433 2022 Ex. 2 Q1 ; Ex. 4 Q2, Q3, Q7 (avec corrigé) ; Poly ch.1, Thm 1.1, 1.3, Prop. 2.4, Cor. 2.1',
    origin: 'annale',
    difficulty: 2,
    tags: ['gosset', 'cochran', 'vecteurs-gaussiens', 'chi2'],
    statement: `**Partie A (Ex. 2 Q1).** $X_1,\\dots,X_n$ i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$, $S_n^2=\\frac1{n-1}\\sum_i(X_i-\\bar X_n)^2$. On rappelle $\\mathbb{E}[Y^4]=3$ pour $Y\\sim\\mathcal{N}(0,1)$.
(a) Quelle est la loi de $\\bar X_n$ ? (b) Montrer que $S_n^2$ et $\\bar X_n$ sont indépendantes et donner la loi de $(n-1)S_n^2/\\sigma^2$. (c) Calculer $\\mathbb{E}[S_n^2]$ et $\\mathbb{E}[S_n^4]$.

**Partie B (Ex. 4 Q2, Q3, Q7).** Régression linéaire simple : $Y\\sim\\mathcal{N}(\\mathbf{X}\\beta,\\sigma^2\\mathrm{I}_n)$ avec $\\mathbf{X}=[\\mathbf{1},x]$ de rang 2, $\\beta=(\\beta_0,\\beta_1)^\\top$, $H=\\mathbf{X}(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top$, $\\hat\\beta=(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top Y$, $\\hat\\sigma^2=\\frac1n\\|(\\mathrm{I}_n-H)Y\\|^2$, $S^2=\\frac n{n-2}\\hat\\sigma^2$, $u=x-\\bar x\\mathbf{1}$, $\\delta\\in\\mathbb{R}$.

**Q2.** Montrer que $\\hat\\beta$ est un vecteur gaussien ; donner son espérance et sa covariance.

**Q3.** Montrer que $\\hat\\sigma^2$ et $\\hat\\beta$ sont indépendants et donner la loi de $n\\hat\\sigma^2/\\sigma^2$.

**Q7.** On admet $\\mathbb{E}[\\bar Y-\\delta\\hat\\beta_1]=0$ et $\\mathrm{Var}(\\bar Y-\\delta\\hat\\beta_1)=\\sigma^2w(\\delta)$ avec $w(\\delta)=\\frac1n+\\frac{\\delta^2}{\\|u\\|^2}$. Montrer que $\\bar Y-\\delta\\hat\\beta_1\\sim\\mathcal{N}(0,\\sigma^2w(\\delta))$ et qu’elle est indépendante de $S^2$.`,
    hints: [
      'A : c’est le théorème de Gosset (« théorème IV.3.24 » dans l’ancien poly) ; pour (c), $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ et $\\mathbb{E}[(\\chi^2_{n-1})^2]=\\mathrm{Var}+\\text{moyenne}^2$.',
      'B2 : $\\hat\\beta=AY$ avec $A=(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top$ : Prop. 2.4 ($A\\Sigma A^\\top$) et $A\\mathbf{X}=\\mathrm{I}_2$.',
      'B3 et B7 : Cochran sur $\\mathrm{Im}(\\mathbf{X})\\oplus\\mathrm{Im}(\\mathbf{X})^\\perp$ : $\\hat\\beta$ et $\\bar Y-\\delta\\hat\\beta_1$ sont fonctions de $HY$ (ou de $v^\\top Y$ avec $v\\in\\mathrm{Im}(\\mathbf{X})$), $\\hat\\sigma^2$ de $(\\mathrm{I}-H)Y$ ; $(\\mathrm{I}-H)\\mathbf{X}\\beta=0$ pour le centrage ; dimension de $\\mathrm{Im}(\\mathbf{X})^\\perp$ : $n-2$.',
    ],
    correction: `**A(a).** Les $X_i$ sont i.i.d. gaussiennes : par le théorème de Gosset (Thm 1.3 (i)), ou directement par le Lemme 2.1 (somme de gaussiennes indépendantes), $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$.

**A(b).** Par Gosset (iii), $\\bar X_n$ et $S_n^2$ sont indépendantes ; par Gosset (ii), $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$, soit $\\mathrm{Gamma}(\\frac{n-1}2,\\frac12)$ en convention d’intensité (le sujet écrit $\\mathrm{Gamma}(\\frac{n-1}2,2)$ en convention d’échelle). *Justification si demandée* : $X\\sim\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n)$, $\\bar X_n\\mathbf{1}_n=P_FX$ et $(n-1)S_n^2=\\|P_{F^\\perp}X\\|^2$ avec $F=\\mathbb{R}\\mathbf{1}_n$ ; Cochran donne l’indépendance des deux projections et, comme $P_{F^\\perp}(\\mu\\mathbf{1}_n)=0$, $\\|P_{F^\\perp}X\\|^2/\\sigma^2\\sim\\chi^2(n-1)$.

**A(c).** $U:=(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ a pour espérance $n-1$ et variance $2(n-1)$ (Prop. 2.8 : somme de $n-1$ carrés de $\\mathcal{N}(0,1)$, $\\mathrm{Var}(Y^2)=\\mathbb{E}[Y^4]-1=2$). Donc $\\mathbb{E}[S_n^2]=\\frac{\\sigma^2}{n-1}(n-1)=\\sigma^2$ (sans biais) et
$$\\mathbb{E}[S_n^4]=\\frac{\\sigma^4}{(n-1)^2}\\mathbb{E}[U^2]=\\frac{\\sigma^4}{(n-1)^2}\\big((n-1)^2+2(n-1)\\big)=\\sigma^4\\Big(1+\\frac2{n-1}\\Big).$$

**B2.** $\\hat\\beta=AY$ avec $A=(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top$ ($2\\times n$) : image linéaire du vecteur gaussien $Y$, donc gaussien (Prop. 2.4), d’espérance $A\\mathbf{X}\\beta=\\beta$ (car $A\\mathbf{X}=\\mathrm{I}_2$ : **sans biais**) et de covariance
$$A(\\sigma^2\\mathrm{I}_n)A^\\top=\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top\\mathbf{X}(\\mathbf{X}^\\top\\mathbf{X})^{-1}=\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1}.$$
Donc $\\hat\\beta\\sim\\mathcal{N}(\\beta,\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1})$.

**B3.** $H$ est la projection orthogonale sur $E:=\\mathrm{Im}(\\mathbf{X})$ (dimension 2) et $\\mathrm{I}_n-H$ celle sur $E^\\perp$ (dimension $n-2$). $Y\\sim\\mathcal{N}(\\mathbf{X}\\beta,\\sigma^2\\mathrm{I}_n)$ a une covariance isotrope : par le théorème de Cochran (Thm 1.1) appliqué à $\\mathbb{R}^n=E\\oplus E^\\perp$, $HY$ et $(\\mathrm{I}_n-H)Y$ sont indépendants. Or $\\hat\\beta=(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top HY$ (car $\\mathbf{X}^\\top H=\\mathbf{X}^\\top$) est fonction de $HY$, et $\\hat\\sigma^2=\\frac1n\\|(\\mathrm{I}_n-H)Y\\|^2$ fonction de $(\\mathrm{I}_n-H)Y$ : **indépendants**. De plus $(\\mathrm{I}_n-H)\\mathbf{X}\\beta=0$ ($\\mathbf{X}\\beta\\in E$), donc $(\\mathrm{I}_n-H)Y=(\\mathrm{I}_n-H)(Y-\\mathbf{X}\\beta)$ et Cochran (ii) donne
$$\\frac{n\\hat\\sigma^2}{\\sigma^2}=\\frac{\\|(\\mathrm{I}_n-H)(Y-\\mathbf{X}\\beta)\\|^2}{\\sigma^2}\\sim\\chi^2(n-2),$$
et aussi $(n-2)S^2/\\sigma^2\\sim\\chi^2(n-2)$ ($\\mathbb{E}[S^2]=\\sigma^2$).

**B7.** $\\bar Y=\\frac1n\\mathbf{1}^\\top Y$ et $\\hat\\beta_1=\\frac{u^\\top Y}{\\|u\\|^2}$ (formule explicite des moindres carrés) sont des formes linéaires en $Y$ : $\\bar Y-\\delta\\hat\\beta_1=v^\\top Y$ avec $v=\\frac1n\\mathbf{1}-\\frac{\\delta}{\\|u\\|^2}u\\in\\mathrm{Vect}(\\mathbf{1},x)=E$. Une forme linéaire d’un vecteur gaussien est gaussienne (Déf. 10) ; avec l’espérance nulle et la variance $\\sigma^2w(\\delta)$ admises, $\\bar Y-\\delta\\hat\\beta_1\\sim\\mathcal{N}(0,\\sigma^2w(\\delta))$. Enfin, comme $v\\in E$, $v^\\top Y=v^\\top HY$ est fonction de $HY$, tandis que $S^2$ est fonction de $(\\mathrm{I}_n-H)Y$ : par Cochran (ou le Cor. 2.1 avec $v^\\top(\\mathrm{I}_n-H)=0$), elles sont **indépendantes**. (Suite du sujet : $T^2(\\delta)=\\frac{(\\bar Y-\\delta\\hat\\beta_1)^2}{S^2w(\\delta)}\\sim F(1,n-2)$, région de confiance de Fieller.)

*Rédaction* : « covariance $\\sigma^2\\mathrm{I}_n$, donc Cochran s’applique » ; « $\\hat\\beta$ fonction de $HY$, $\\hat\\sigma^2$ de $(\\mathrm{I}-H)Y$, sous-espaces orthogonaux » ; degrés de liberté $=\\dim E^\\perp=n-2$.`,
    bareme: [
      { label: 'A(a) loi de X̄ₙ', points: 0.25 },
      { label: 'A(b) indépendance et χ²(n−1) (Gosset)', points: 0.5 },
      { label: 'A(c) E[Sₙ²], E[Sₙ⁴]', points: 0.25 },
      { label: 'B2 loi de β̂ (Prop. 2.4)', points: 0.5 },
      { label: 'B3 indépendance β̂ ⊥ σ̂², χ²(n−2) (Cochran)', points: 0.5 },
      { label: 'B7 gaussienne et indépendance de S² (Cor. 2.1)', points: 0.5 },
    ],
    durationMin: 25,
  },
  {
    id: 'ch1-annale-pc1-ex3',
    type: 'annale',
    title: 'PC1 Ex. 3 — Modèle de translation et d’échelle ; modèle induit par (Sₙ, Kₙ)',
    source: 'PC1 Ex. 3 Q1, Q2, Q4 (corrigé p. 11–14) ; Poly ch.1, Thm 1.3, Prop. 2.8',
    origin: 'pc',
    difficulty: 2,
    tags: ['modele-induit', 'changement-variables', 'gosset'],
    statement: `Soit $g$ une densité par rapport à $\\mathrm{Leb}$. On considère le modèle
$$\\Big(\\mathbb{R}^n,\\mathcal{B}(\\mathbb{R}^n),\\{p_{n,\\theta}\\cdot\\mathrm{Leb}^{\\otimes n}:\\ \\theta=(\\mu,\\sigma)\\in\\Theta:=\\mathbb{R}\\times\\mathbb{R}_+^*\\}\\Big),\\qquad p_{n,\\theta}(x_1,\\dots,x_n):=\\sigma^{-n}\\prod_{i=1}^ng\\Big(\\frac{x_i-\\mu}\\sigma\\Big),$$
et les variables canoniques $X_i(x_1,\\dots,x_n)=x_i$.

**Q1.** Montrer que sous $p_{n,\\theta}\\cdot\\mathrm{Leb}^{\\otimes n}$ les statistiques $X_1,\\dots,X_n$ sont i.i.d. et identifier leur loi.

**Q2.** Montrer que sous $p_{n,\\theta}\\cdot\\mathrm{Leb}^{\\otimes n}$ les variables $(X_i-\\mu)/\\sigma$ sont i.i.d. de densité $g$.

**Q4.** On suppose $g$ gaussienne centrée réduite et l’on pose $S_n:=\\sum_iX_i$, $K_n:=\\sum_i(X_i-n^{-1}S_n)^2$. Déterminer le modèle statistique induit par $(S_n,K_n)$ (on pourra utiliser le théorème de Gosset).`,
    hints: [
      'Q1 : densité de forme produit ⇒ indépendance ; même facteur ⇒ même loi ; la constante de normalisation se trouve par le changement de variable $v=(u-\\mu)/\\sigma$.',
      'Q2 : appliquer le résultat de l’Exercice 2 (translation-échelle) avec $a=-\\mu/\\sigma$, $b=1/\\sigma$, ou refaire la fonction muette.',
      'Q4 : $S_n=n\\bar X_n$, $K_n=(n-1)S_n^{2,\\mathrm{Gosset}}$ ; $\\chi^2(n-1)=\\mathrm{Gamma}(\\frac{n-1}2,\\frac12)$ et un changement d’échelle ; indépendance ⇒ densité jointe produit ; écrire le triplet sur $\\mathbb{R}\\times\\mathbb{R}_+$.',
    ],
    correction: `**Q1.** La densité $p_{n,\\theta}(x)=\\prod_{i=1}^n\\big[\\sigma^{-1}g\\big(\\frac{x_i-\\mu}\\sigma\\big)\\big]$ est de **forme produit** : par Fubini (comme dans l’Ex. 1.10 du poly), pour tous boréliens $A_i$, $\\mathbb{P}_\\theta(X_1\\in A_1,\\dots,X_n\\in A_n)=\\prod_i\\int_{A_i}\\sigma^{-1}g\\big(\\frac{u-\\mu}\\sigma\\big)\\,\\mathrm{d}u$, donc les $X_i$ sont indépendantes (Déf. 4), et chacune a pour densité le facteur correspondant, le **même** pour tout $i$ : elles sont identiquement distribuées. Ce facteur est bien une densité : par le changement de variable $v=(u-\\mu)/\\sigma$, $\\int\\sigma^{-1}g\\big(\\frac{u-\\mu}\\sigma\\big)\\,\\mathrm{d}u=\\int g(v)\\,\\mathrm{d}v=1$. Loi commune : $q_\\theta\\cdot\\mathrm{Leb}$ avec $q_\\theta(u)=\\frac1\\sigma g\\big(\\frac{u-\\mu}\\sigma\\big)$ (loi de $\\mu+\\sigma V$ avec $V$ de densité $g$ : translation $\\mu$, échelle $\\sigma$).

**Q2.** Les $X_i$ étant i.i.d. de densité $q_\\theta$, les $(X_i-\\mu)/\\sigma=a+bX_i$ avec $a=-\\mu/\\sigma$, $b=1/\\sigma>0$ sont indépendantes (fonctions mesurables de variables indépendantes). Pour $h$ mesurable positive, $\\mathbb{E}_\\theta[h((X_i-\\mu)/\\sigma)]=\\int h\\big(\\frac{u-\\mu}\\sigma\\big)\\frac1\\sigma g\\big(\\frac{u-\\mu}\\sigma\\big)\\,\\mathrm{d}u=\\int h(y)g(y)\\,\\mathrm{d}y$ ($y=(u-\\mu)/\\sigma$, $\\mathrm{d}u=\\sigma\\,\\mathrm{d}y$) : la densité est $g$ (fonction muette ; c’est la formule $\\frac1{|b|}q_\\theta\\big(\\frac{y-a}b\\big)=\\sigma q_\\theta(\\sigma y+\\mu)=g(y)$ de l’Exercice 2). Donc i.i.d. de densité $g$.

**Q4.** Avec $g$ gaussienne réduite, les $X_i$ sont i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$ (Q1). Avec les notations de Gosset, $S_n=n\\bar X_n$ et $K_n=\\sum_i(X_i-\\bar X_n)^2=(n-1)S_n^{2,\\mathrm{Gosset}}$. Par le théorème de Gosset (Thm 1.3 ; observations i.i.d. gaussiennes, $n\\ge2$) :
- $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$, donc $S_n\\sim\\mathcal{N}(n\\mu,n\\sigma^2)$ (Prop. 2.4) ;
- $K_n/\\sigma^2\\sim\\chi^2(n-1)=\\mathrm{Gamma}\\big(\\frac{n-1}2,\\frac12\\big)$ (Prop. 2.8), donc $K_n\\sim\\mathrm{Gamma}\\big(\\frac{n-1}2,\\frac1{2\\sigma^2}\\big)$ (changement d’échelle : densité $\\propto y^{(n-3)/2}e^{-y/(2\\sigma^2)}$ sur $\\mathbb{R}_+$) ;
- $S_n$ et $K_n$ sont **indépendantes** (fonctions de $\\bar X_n$ et $S_n^{2,\\mathrm{Gosset}}$, indépendantes par Gosset (iii)).

La densité jointe est donc le produit des marginales et le modèle induit est
$$\\Big(\\mathbb{R}\\times\\mathbb{R}_+,\\ \\mathcal{B}(\\mathbb{R}\\times\\mathbb{R}_+),\\ \\big\\{\\rho_{n,\\theta}\\cdot\\mathrm{Leb}^{\\otimes2}:\\ \\theta\\in\\mathbb{R}\\times\\mathbb{R}_+^*\\big\\}\\Big),\\qquad\\rho_{n,\\theta}(z,y)=C_n\\,e^{-\\frac{(z-n\\mu)^2}{2n\\sigma^2}}\\,e^{-\\frac y{2\\sigma^2}}\\,y^{\\frac{n-3}2}\\,\\mathbb{1}_{\\mathbb{R}_+}(y),$$
avec $C_n=\\dfrac1{\\sqrt{2\\pi n\\sigma^2}}\\Big(\\dfrac1{2\\sigma^2}\\Big)^{\\frac{n-1}2}\\dfrac1{\\Gamma(\\frac{n-1}2)}$.

*Remarques* : $S_n$ désigne ici la **somme** ; l’estimateur naturel $(S_n/n,K_n/n)$ de $(\\mu,\\sigma^2)$ (Q3) est l’EMV, et $K_n/n$ est biaisé ($\\mathbb{E}=\\frac{n-1}n\\sigma^2$). Complément du corrigé : $(S_n,\\sum_iX_i^2)$ n’est pas un couple indépendant.`,
    bareme: [
      { label: 'Q1 (indépendance, i.i.d., loi q_θ avec constante 1/σ)', points: 1 },
      { label: 'Q2 (réduction : densité g)', points: 0.5 },
      { label: 'Q4 (lois de Sₙ et Kₙ, indépendance, triplet induit)', points: 1.5 },
    ],
    durationMin: 25,
  },
]
