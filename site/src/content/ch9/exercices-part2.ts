import type { Exercise } from '../types'

/** Étape suivante, associer, numériques, annales. */
export const exercisesPart2: Exercise[] = [
  // ------------------------------------------------------------------ Étape suivante
  {
    id: 'ch9-etape-chernoff-sousgauss',
    type: 'etape-suivante',
    title: 'Déviations d’une variable sous-gaussienne (Chernoff + optimisation)',
    source: 'PC9 Ex. 2 Q4–Q5 ; Poly ch.9, Outils Prop. 2.1–2.2',
    origin: 'pc',
    difficulty: 2,
    tags: ['sous-gaussienne', 'chernoff'],
    setup: '$X\\in\\mathcal G(v)$ : $X$ centrée et $\\psi_X(\\lambda)=\\log\\mathbb E[e^{\\lambda X}]\\le\\lambda^2v/2$ pour tout $\\lambda\\in\\mathbb R$. On veut $\\mathbb P(X\\ge t)\\vee\\mathbb P(-X\\ge t)\\le e^{-t^2/(2v)}$ pour $t>0$.',
    steps: [
      {
        prompt: 'Étape 1 — Quelle inégalité donne, pour $\\lambda\\ge0$, $\\mathbb P(X\\ge t)\\le e^{-\\lambda t}\\mathbb E[e^{\\lambda X}]$ ?',
        choices: [
          { text: 'Markov appliquée à la variable positive $e^{\\lambda X}$, $t\\mapsto e^{\\lambda t}$ étant croissante.', correct: true, explanation: 'C’est la borne de Chernoff (PC9 Ex. 2 Q4).' },
          { text: 'Bienaymé-Tchebychev appliquée à $X$.', correct: false, explanation: 'Elle donnerait $\\mathrm{Var}(X)/t^2$, une borne polynomiale.' },
          { text: 'Jensen appliquée à $e^{\\lambda X}$.', correct: false, explanation: 'Jensen minore $\\mathbb E[e^{\\lambda X}]$ par $e^{\\lambda\\mathbb E X}$ ; elle ne donne pas de probabilité de queue.' },
        ],
      },
      {
        prompt: 'Étape 2 — On a $\\mathbb P(X\\ge t)\\le\\exp(-\\lambda t+\\lambda^2v/2)$ pour tout $\\lambda\\ge0$. Quel $\\lambda$ choisir et quelle borne obtient-on ?',
        choices: [
          { text: '$\\lambda=t/v$, borne $e^{-t^2/(2v)}$', correct: true, explanation: 'Le trinôme $\\lambda t-\\lambda^2v/2$ est maximal en $\\lambda=t/v\\ge0$, de valeur $t^2/(2v)$.' },
          { text: '$\\lambda=v/t$, borne $e^{-v/2}$', correct: false, explanation: 'Erreur d’inversion : la dérivée $t-\\lambda v$ s’annule en $t/v$.' },
          { text: '$\\lambda=t/v$, borne $e^{-t^2/v}$', correct: false, explanation: 'Valeur du maximum mal calculée : $t\\cdot\\frac tv-\\frac{t^2}{v^2}\\cdot\\frac v2=\\frac{t^2}{2v}$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Pourquoi la même borne vaut-elle pour $\\mathbb P(-X\\ge t)$ ?',
        choices: [
          { text: '$\\psi_{-X}(\\lambda)=\\psi_X(-\\lambda)\\le\\lambda^2v/2$ : $-X\\in\\mathcal G(v)$, grâce au « pour tout $\\lambda\\in\\mathbb R$ ».', correct: true, explanation: 'C’est l’utilisation des valeurs négatives de $\\lambda$ dans la définition.' },
          { text: 'Parce que $X$ est symétrique.', correct: false, explanation: 'Aucune symétrie n’est supposée (une Bernoulli centrée de paramètre $0{,}1$ est sous-gaussienne sans être symétrique).' },
          { text: 'Par Chernoff avec $\\lambda<0$ appliqué directement à $X$.', correct: false, explanation: 'Markov ne s’applique pas dans le bon sens pour $\\lambda<0$ et l’événement $\\{X\\ge t\\}$ ; il faut passer par $-X$.' },
        ],
      },
    ],
    conclusion: 'Les déviations d’une $\\mathcal G(v)$ sont celles d’une $\\mathcal N(0,v)$ ; avec le lemme de Hoeffding et l’additivité des facteurs, on obtient l’inégalité de Hoeffding (Th. 2.1).',
  },
  {
    id: 'ch9-etape-th18',
    type: 'etape-suivante',
    title: 'Borne en espérance sur une classe finie (Th. 1.8)',
    source: 'Poly ch.9, Th. 1.8 ; PC9 Ex. 4 Q2',
    origin: 'pc',
    difficulty: 2,
    tags: ['classe-finie', 'pisier', 'processus-empirique'],
    setup: 'Perte 0-1, $\\mathcal C=\\{g_1,\\dots,g_M\\}$, $\\hat g^*_{n,\\mathcal C}$ le MRE, $g^*_{\\mathcal C}$ l’oracle. On veut majorer $\\mathbb E[R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})]$.',
    steps: [
      {
        prompt: 'Étape 1 — Première majoration à écrire :',
        choices: [
          { text: '$\\mathbb E[R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})]\\le\\mathbb E[\\max_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|]$ (Th. 1.2, éq. (3))', correct: true, explanation: 'Décomposition + définition du MRE + absence de biais du risque empirique de l’oracle (règle fixée).' },
          { text: '$\\mathbb E[R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})]\\le\\mathbb E[|\\widehat{\\mathrm R}_n(\\hat g^*_{n,\\mathcal C})-R(\\hat g^*_{n,\\mathcal C})|]\\le\\sqrt{\\pi/(2n)}$, par Hoeffding appliqué à $\\hat g^*_{n,\\mathcal C}$', correct: false, explanation: 'Faux : Hoeffding ne s’applique pas au MRE, choisi au vu des données (ses pertes ne sont pas des variables indépendantes d’espérance $R(\\hat g^*_{n,\\mathcal C})$) ; une borne indépendante de $|\\mathcal C|$ est d’ailleurs fausse (Ex. 1.1 : risque empirique nul, risque grand). Il faut passer par le max sur la classe.' },
          { text: '$\\mathbb E[R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})]\\le\\max_{g\\in\\mathcal C}\\mathbb E[|\\widehat{\\mathrm R}_n(g)-R(g)|]$', correct: false, explanation: 'Faux : on ne peut pas sortir le max de l’espérance ($\\max_g\\mathbb E[\\cdot]\\le\\mathbb E[\\max_g\\cdot]$, pas l’inverse). Comme la règle choisie dépend de l’échantillon, c’est l’espérance du max qu’il faut contrôler.' },
        ],
      },
      {
        prompt: 'Étape 2 — Les $Z_j=\\widehat{\\mathrm R}_n(g_j)-R(g_j)$ vérifient $\\mathbb E[e^{\\lambda Z_j}]\\le e^{\\lambda^2/(8n)}$. On applique Pisier avec :',
        choices: [
          { text: '$m=M$ et $\\sigma=\\frac1{2\\sqrt n}$', correct: true, explanation: '$\\lambda^2/(8n)=\\lambda^2\\sigma^2/2$ avec $\\sigma^2=1/(4n)$.' },
          { text: '$m=M$ et $\\sigma=\\frac1{\\sqrt{8n}}$', correct: false, explanation: 'Confusion entre $\\sigma^2/2$ et $\\sigma^2$ : $\\sigma^2/2=1/(8n)$ donne $\\sigma^2=1/(4n)$.' },
          { text: '$m=n$ et $\\sigma=\\frac1{2\\sqrt n}$', correct: false, explanation: 'Le max porte sur les $M$ règles de la classe, pas sur les $n$ observations.' },
        ],
      },
      {
        prompt: 'Étape 3 — Conclusion :',
        choices: [
          { text: '$\\mathbb E[R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})]\\le\\sqrt{\\frac{\\log(2M)}{2n}}$', correct: true, explanation: '$\\frac1{2\\sqrt n}\\sqrt{2\\log(2M)}=\\sqrt{\\log(2M)/(2n)}$.' },
          { text: '$\\le\\sqrt{\\frac{2\\log(2M)}n}$', correct: false, explanation: 'Erreur de simplification : $\\frac1{2\\sqrt n}\\sqrt{2\\log(2M)}=\\sqrt{\\frac{2\\log(2M)}{4n}}=\\sqrt{\\frac{\\log(2M)}{2n}}$ ; la réponse proposée est deux fois trop grande (facteur $\\frac12$ oublié).' },
          { text: '$\\le\\frac{\\log(2M)}{2n}$', correct: false, explanation: 'Oubli de la racine : la vitesse est $1/\\sqrt n$ (cas agnostique), pas $1/n$ (cas réalisable, compléments).' },
        ],
      },
    ],
    conclusion: 'Th. 1.8 : borne en $\\sqrt{\\log|\\mathcal C|/n}$, sans hypothèse sur $\\mathbb P$. Avec seulement la déviation unilatérale, la PC obtient $\\sqrt{\\log M/(2n)}$.',
  },
  {
    id: 'ch9-etape-2025-q8',
    type: 'etape-suivante',
    title: 'Examen 2025 Q8 — décomposition biais / variance des k plus proches voisins',
    source: 'Examen 2025 Ex. 3 Q8 ; DIAGNOSTIC §2.A',
    origin: 'annale',
    difficulty: 3,
    tags: ['knn', 'biais-variance', 'compromis'],
    setup: '$\\hat\\eta_{n,k}(x)=\\frac1k\\sum_{i\\in N_k(x)}\\mathbf 1\\{Y_i=1\\}$ ; (H3) $\\eta$ $L$-lipschitzienne ; on a admis $\\mathbb E_n[\\mathfrak R_k(x)^d]\\le\\frac{k}{c_-v_d(n+1)}$ (Q7). On pose $\\bar\\eta_k(x)=\\mathbb E_n[\\hat\\eta_{n,k}(x)\\mid X_{1:n}]$.',
    steps: [
      {
        prompt: 'Étape 1 — Que vaut $\\bar\\eta_k(x)$ ?',
        choices: [
          { text: '$\\frac1k\\sum_{i\\in N_k(x)}\\eta(X_i)$', correct: true, explanation: 'Conditionnellement au design, les $Y_i$ sont indépendants et $\\mathbb P(Y_i=1\\mid X_{1:n})=\\eta(X_i)$ ; les voisins $N_k(x)$ sont fixés.' },
          { text: '$\\eta(x)$', correct: false, explanation: 'C’est justement l’écart $\\bar\\eta_k(x)-\\eta(x)$ qui constitue le biais.' },
          { text: '$\\frac kn\\eta(x)$', correct: false, explanation: 'Aucune raison d’un facteur $k/n$ : on moyenne $k$ valeurs.' },
        ],
      },
      {
        prompt: 'Étape 2 — Majoration de la variance $\\mathbb E_n[(\\hat\\eta_{n,k}-\\bar\\eta_k)^2]$ :',
        choices: [
          { text: '$\\le\\frac1{4k}$ (moyenne de $k$ Bernoulli indépendantes, $p(1-p)\\le1/4$)', correct: true, explanation: '$\\mathrm{Var}(\\hat\\eta_{n,k}\\mid X_{1:n})=\\frac1{k^2}\\sum_{i\\in N_k}\\eta(X_i)(1-\\eta(X_i))\\le\\frac1{4k}$.' },
          { text: '$\\le\\frac1{4n}$', correct: false, explanation: 'Seuls les $k$ voisins interviennent, pas les $n$ observations.' },
          { text: '$\\le\\frac14$', correct: false, explanation: 'Oubli du facteur $1/k$ dû à la moyenne de $k$ variables indépendantes.' },
        ],
      },
      {
        prompt: 'Étape 3 — Majoration du biais au carré, pour $d\\ge2$ :',
        choices: [
          { text: '$\\le L^2\\big(\\frac{k}{c_-v_d(n+1)}\\big)^{2/d}$ (Lipschitz, puis Jensen avec $u\\mapsto u^{2/d}$ concave et Q7)', correct: true, explanation: '$|\\bar\\eta_k-\\eta|\\le L\\mathfrak R_k$, $\\mathbb E[\\mathfrak R_k^2]\\le(\\mathbb E[\\mathfrak R_k^d])^{2/d}$.' },
          { text: '$\\le L^2\\big(\\frac{k}{c_-v_d(n+1)}\\big)^{2}$', correct: false, explanation: 'Exposant erroné : Jensen donne $\\mathbb E[\\mathfrak R_k^2]\\le(\\mathbb E[\\mathfrak R_k^d])^{2/d}$, pas $(\\mathbb E[\\mathfrak R_k^d])^2$ ; ce majorant, bien plus petit quand $k/n\\to0$, n’est pas justifié.' },
          { text: '$\\le\\frac{L^2}k$', correct: false, explanation: 'Confusion avec le terme de variance ; le biais dépend du rayon des voisins, donc de $k/n$.' },
        ],
      },
    ],
    conclusion: 'Bilan : $\\mathbb E_n[(\\hat\\eta_{n,k}(x)-\\eta(x))^2]\\le C_d\\big((k/n)^{2/d}+1/k\\big)$, $C_d=\\max(L^2/(c_-v_d)^{2/d},1/4)$ : biais croissant en $k$, variance décroissante en $k$ — c’est la décomposition approximation / estimation du ch.9.',
  },
  {
    id: 'ch9-etape-2025-q9',
    type: 'etape-suivante',
    title: 'Examen 2025 Q9 — du risque de régression à l’excès de risque, choix de k',
    source: 'Examen 2025 Ex. 3 Q9 ; DIAGNOSTIC §2.A',
    origin: 'annale',
    difficulty: 3,
    tags: ['knn', 'compromis', 'fleau-dimension'],
    setup: 'On dispose de $\\mathbb E_n[(\\hat\\eta_{n,k}(x)-\\eta(x))^2]\\le C_d\\big((k/n)^{2/d}+1/k\\big)$ uniformément en $x$ (Q8) et de la borne plug-in $R(\\hat g)-R^\\star\\le2\\mathbb E|\\eta(X)-\\hat\\eta(X)|$ (Q3).',
    steps: [
      {
        prompt: 'Étape 1 — Comment passer de Q3 à une borne sur $\\mathbb E_n[R(\\hat g_{n,k})]-R^\\star$ ?',
        choices: [
          { text: 'Q3 conditionnellement à $D_n$, espérance et Fubini, puis Cauchy-Schwarz : $\\le2\\sqrt{\\mathbb E\\,\\mathbb E_n[(\\hat\\eta_{n,k}(X)-\\eta(X))^2]}$.', correct: true, explanation: 'L’intégrande est positif (Fubini-Tonelli) ; $\\mathbb E|U|\\le\\sqrt{\\mathbb E U^2}$.' },
          { text: 'Appliquer Hoeffding à $\\hat\\eta_{n,k}(X)$.', correct: false, explanation: 'Hoeffding contrôlerait la variance conditionnelle, pas le biais ; on dispose déjà de Q8.' },
          { text: 'Utiliser $\\mathbb E|U|\\le\\mathbb E[U^2]$.', correct: false, explanation: 'Faux en général (vrai seulement si $|U|\\ge1$) ; la bonne inégalité est Cauchy-Schwarz (Jensen).' },
        ],
      },
      {
        prompt: 'Étape 2 — Le minimiseur de $\\varphi(k)=(k/n)^{2/d}+1/k$ est :',
        choices: [
          { text: '$k^\\star=(d/2)^{d/(d+2)}n^{2/(d+2)}$', correct: true, explanation: '$\\varphi\'(k)=\\frac2d\\frac{k^{2/d-1}}{n^{2/d}}-\\frac1{k^2}=0\\iff k^{1+2/d}=\\frac d2n^{2/d}$.' },
          { text: '$k^\\star=n^{d/(d+2)}$', correct: false, explanation: 'Exposant inversé : en résolvant $k^{(d+2)/d}\\propto n^{2/d}$ on trouve $k\\propto n^{2/(d+2)}$.' },
          { text: '$k^\\star=\\sqrt n$ pour tout $d$', correct: false, explanation: 'Vrai seulement pour $d=2$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Vitesse obtenue pour l’excès de risque moyen :',
        choices: [
          { text: '$n^{-1/(d+2)}$', correct: true, explanation: '$\\varphi(k^\\star)\\asymp n^{-2/(d+2)}$ et l’on prend la racine.' },
          { text: '$n^{-2/(d+2)}$', correct: false, explanation: 'C’est l’ordre de $\\varphi(k^\\star)$, avant la racine de Cauchy-Schwarz.' },
          { text: '$n^{-1/2}$', correct: false, explanation: 'Vitesse paramétrique, inaccessible ici ; la dépendance en $d$ est le fléau de la dimension.' },
        ],
      },
    ],
    conclusion: 'Pour une précision $\\varepsilon$ il faut $n\\asymp\\varepsilon^{-(d+2)}$ : **fléau de la dimension**. À comparer aux vitesses paramétriques $n^{-1/2}$ et aux bornes $\\sqrt{\\log|\\mathcal C|/n}$ du MRE sur classe finie.',
  },
  {
    id: 'ch9-etape-vote',
    type: 'etape-suivante',
    title: 'Toutes les règles sur un ensemble fini : MRE et borne',
    source: 'PC9 Ex. 4 Q3–Q4',
    origin: 'pc',
    difficulty: 2,
    tags: ['classe-finie', 'histogramme', 'borne-union'],
    setup: 'Classification binaire, $\\mathsf X$ fini de cardinal $K$, $\\mathcal C$ = ensemble de toutes les règles $\\mathsf X\\to\\{0,1\\}$, $R_n(g)=\\frac1n\\sum_i\\mathbf{1}_{\\{g(X_i)\\ne Y_i\\}}$.',
    steps: [
      {
        prompt: 'Étape 1 — Le MRE sur $\\mathcal C$ est :',
        choices: [
          { text: 'le vote majoritaire parmi les $Y_i$ tels que $X_i=x$, en chaque point $x$', correct: true, explanation: 'Le critère se décompose en une somme sur les points $x$ et les valeurs $g(x)$ sont libres.' },
          { text: 'la règle constante égale au label majoritaire global', correct: false, explanation: 'C’est le MRE sur la classe des règles **constantes**, beaucoup plus petite.' },
          { text: 'le classifieur bayésien', correct: false, explanation: 'Il n’est pas calculable ($\\eta$ inconnue) ; il est seulement dans la classe.' },
        ],
      },
      {
        prompt: 'Étape 2 — Cardinal de $\\mathcal C$ et borne uniforme :',
        choices: [
          { text: '$|\\mathcal C|=2^K$ et $\\mathbb P(\\sup_{g}|R_n(g)-R(g)|>\\varepsilon)\\le2^{K+1}e^{-2n\\varepsilon^2}$', correct: true, explanation: 'Hoeffding pour chaque règle fixée puis borne de l’union sur $2^K$ règles.' },
          { text: '$|\\mathcal C|=K$ et $\\le2Ke^{-2n\\varepsilon^2}$', correct: false, explanation: 'Il y a $2^K$ fonctions de $\\mathsf X$ dans $\\{0,1\\}$, pas $K$.' },
          { text: '$|\\mathcal C|=2^K$ et $\\le2e^{-2n\\varepsilon^2}$', correct: false, explanation: 'Oubli de la borne de l’union : on ne peut pas appliquer Hoeffding directement au sup.' },
        ],
      },
      {
        prompt: 'Étape 3 — Ordre de l’excès de risque moyen $\\mathbb E[R(\\hat g^*_n)]-R^\\star$ :',
        choices: [
          { text: '$O(\\sqrt{K/n})$, car $\\inf_{\\mathcal C}R=R^\\star$ et $\\log|\\mathcal C|=K\\log2$', correct: true, explanation: 'Th. 1.8 : $\\sqrt{(K+1)\\log2/(2n)}$ ; l’erreur d’approximation est nulle.' },
          { text: '$O(2^K/\\sqrt n)$', correct: false, explanation: 'Ce serait le prix d’une intégration naïve de la borne, sans exploiter le logarithme du cardinal.' },
          { text: '$O(\\sqrt{\\log K/n})$', correct: false, explanation: 'On prend le log du **cardinal de la classe** ($2^K$), pas de $\\mathsf X$.' },
        ],
      },
    ],
    conclusion: 'Excès de risque en $\\sqrt{K/n}$ : pour $K=10$, $n=10^4$, environ $0{,}0195$. Si $\\mathsf X$ est infini, plus aucune borne uniforme (no free lunch).',
  },
  // ------------------------------------------------------------------ Associer
  {
    id: 'ch9-assoc-pertes',
    type: 'associer',
    title: 'Pertes de substitution',
    source: 'Poly ch.9, §1.4, tableau p. 23',
    origin: 'poly',
    difficulty: 1,
    tags: ['convexification', 'cours'],
    prompt: 'Associer chaque perte à son expression en fonction de $z=-y\\,h(\\mathbf x)$.',
    pairs: [
      { left: 'perte 0-1', right: '$\\mathbf{1}_{[0,+\\infty[}(z)$', explanation: 'Notée $\\varphi_1$ ; vaut 1 dès que la marge $y\\,h(\\mathbf x)$ est négative ou nulle.' },
      { left: 'charnière (hinge)', right: '$\\max(1+z,0)$', explanation: 'Maximum de deux fonctions affines, donc convexe ; perte des SVM.' },
      { left: 'exponentielle', right: '$e^{z}$', explanation: 'Utilisée par le boosting.' },
      { left: 'logistique', right: '$\\log_2(1+e^{z})$', explanation: 'Le $\\log_2$ assure $\\varphi(0)=1$ ; lien avec l’EMV logistique (Ex. 1.3).' },
      { left: 'quadratique', right: '$(z+1)^2$', explanation: 'Convexe mais non croissante : pénalise aussi les grandes marges correctes.' },
    ],
  },
  {
    id: 'ch9-assoc-bornes',
    type: 'associer',
    title: 'Résultats et bornes du chapitre',
    source: 'Poly ch.9, Th. 1.3, 1.6, 1.7, 1.8, Lemme 1.1 ; Outils §2.1',
    origin: 'poly',
    difficulty: 2,
    tags: ['hoeffding', 'classe-finie', 'pisier', 'cours'],
    prompt: 'Associer chaque résultat à sa borne.',
    pairs: [
      { left: 'Hoeffding (moyenne de $n$ variables dans $[0,1]$)', right: '$2e^{-2n\\varepsilon^2}$', explanation: 'Th. 1.3.' },
      { left: 'Bienaymé-Tchebychev (même cadre)', right: '$\\frac{\\mathrm{Var}(X_1)}{n\\varepsilon^2}$', explanation: 'Décroissance seulement en $1/n$.' },
      { left: 'Lemme de Hoeffding ($X\\in[a,b]$ centrée)', right: '$\\mathbb E[e^{\\lambda X}]\\le e^{\\lambda^2(b-a)^2/8}$', explanation: 'Lemme 1.1.' },
      { left: 'Pisier ($m$ sous-gaussiennes de facteur $\\sigma^2$)', right: '$\\mathbb E[\\max_i|Z_i|]\\le\\sigma\\sqrt{2\\log(2m)}$', explanation: 'Th. 1.7.' },
      { left: 'Erreur d’estimation en grande probabilité', right: '$2\\sqrt{\\log(2|\\mathcal C|/\\delta)/(2n)}$', explanation: 'Th. 1.6.' },
      { left: 'Erreur d’estimation en espérance', right: '$\\sqrt{\\log(2|\\mathcal C|)/(2n)}$', explanation: 'Th. 1.8.' },
    ],
  },
  {
    id: 'ch9-assoc-herbst',
    type: 'associer',
    title: 'Les objets de la preuve du lemme de Hoeffding',
    source: 'PC9 Ex. 3 Q2–Q5 ; Poly ch.9, Outils §2.4',
    origin: 'pc',
    difficulty: 2,
    tags: ['lemme-hoeffding', 'preuve'],
    prompt: '$X\\in[a,b]$ de moyenne $m$, $\\psi_X(\\lambda)=\\log\\mathbb E[e^{\\lambda X}]$, $\\mu_\\lambda$ loi basculée. Associer chaque quantité à sa valeur ou sa majoration.',
    pairs: [
      { left: '$\\psi_X(0)$', right: '$0$', explanation: '$\\log\\mathbb E[1]=0$.' },
      { left: '$\\psi_X\'(0)$', right: '$\\mathbb E[X]$', explanation: '$\\mu_0=\\mu$.' },
      { left: '$\\psi_X\'(\\lambda)$', right: 'moyenne de $X$ sous $\\mu_\\lambda$', explanation: 'Dérivée logarithmique.' },
      { left: '$\\psi_X\'\'(\\lambda)$', right: 'variance de $X$ sous $\\mu_\\lambda$', explanation: 'Dérivée d’un quotient.' },
      { left: '$\\sup_\\lambda\\psi_X\'\'(\\lambda)$', right: 'au plus $(b-a)^2/4$', explanation: 'Variance d’une loi portée par $[a,b]$ (centrer en $(a+b)/2$).' },
    ],
  },
  // ------------------------------------------------------------------ Numériques
  {
    id: 'ch9-num-validation-738',
    type: 'numerique',
    title: 'Taille de l’ensemble de validation (Hoeffding)',
    source: 'PC9 Ex. 1 Q4 (application numérique) ; Poly ch.9, Th. 1.4',
    origin: 'pc',
    difficulty: 1,
    tags: ['hoeffding', 'validation'],
    question: 'On veut $\\mathbb P(|\\hat R_{n,m}-R(g_n)|\\ge0{,}05)\\le0{,}05$ en utilisant la borne $2e^{-2m\\varepsilon^2}$. Quel est le plus petit entier $m$ qui convient ?',
    answer: 738,
    tolerance: 0.5,
    hint: 'entier',
    explanation: '$2e^{-2m\\varepsilon^2}\\le\\delta\\iff m\\ge\\frac{\\ln(2/\\delta)}{2\\varepsilon^2}=\\frac{\\ln40}{0{,}005}\\approx737{,}8$, donc $m=738$. Bienaymé-Tchebychev ($\\frac1{4m\\varepsilon^2}\\le\\delta$) exigerait $m\\ge2000$.',
  },
  {
    id: 'ch9-num-th16',
    type: 'numerique',
    title: 'Borne du Th. 1.6',
    source: 'Variante (style Poly ch.9, Th. 1.6)',
    origin: 'variante',
    difficulty: 2,
    tags: ['classe-finie', 'hoeffding'],
    question: '$|\\mathcal C|=1000$, $n=10\\,000$, $\\delta=0{,}05$. Valeur de la borne $2\\sqrt{\\log(2|\\mathcal C|/\\delta)/(2n)}$ de l’erreur d’estimation (arrondir à $10^{-3}$) ?',
    answer: 0.046,
    tolerance: 0.001,
    hint: '(arrondir à 0,001)',
    explanation: '$\\log(2000/0{,}05)=\\log(40\\,000)\\approx10{,}597$ ; $10{,}597/20\\,000\\approx5{,}30\\times10^{-4}$ ; racine $\\approx0{,}0230$ ; facteur 2 : $\\approx0{,}046$. Avec probabilité au moins $0{,}95$, le MRE est à moins de $4{,}6$ points de pourcentage du meilleur classifieur de la classe.',
  },
  {
    id: 'ch9-num-pc9-ex4',
    type: 'numerique',
    title: 'Toutes les règles sur K = 10 points (Th. 1.8)',
    source: 'PC9 Ex. 4 Q4 ; Poly ch.9, Th. 1.8',
    origin: 'pc',
    difficulty: 2,
    tags: ['classe-finie', 'pisier'],
    question: '$|\\mathsf X|=K=10$, $\\mathcal C$ = toutes les règles, $n=10^4$. Valeur de la borne $\\sqrt{\\log(2|\\mathcal C|)/(2n)}$ du Th. 1.8 sur $\\mathbb E[R(\\hat g^*_n)]-R^\\star$ (arrondir à $10^{-4}$) ?',
    answer: 0.0195,
    tolerance: 0.0002,
    hint: '(arrondir à 0,0001)',
    explanation: '$|\\mathcal C|=2^{10}$, donc $\\log(2|\\mathcal C|)=11\\log2\\approx7{,}625$ ; $7{,}625/(2\\cdot10^4)\\approx3{,}81\\times10^{-4}$ ; racine $\\approx0{,}0195$. Ici $\\inf_{\\mathcal C}R=R^\\star$ (la classe contient le classifieur bayésien).',
  },
  {
    id: 'ch9-num-nfl',
    type: 'numerique',
    title: 'Minorant du no free lunch',
    source: 'PC9 Ex. 6 (application numérique) ; Poly ch.9, Th. 1.1',
    origin: 'pc',
    difficulty: 1,
    tags: ['no-free-lunch'],
    question: '$n=100$ observations, $K=1000$ points. Valeur du minorant $\\frac12(1-1/K)^n$ du risque moyen (arrondir à $10^{-3}$) ?',
    answer: 0.452,
    tolerance: 0.001,
    hint: '(arrondir à 0,001)',
    explanation: '$(1-10^{-3})^{100}=e^{100\\ln(0{,}999)}\\approx e^{-0{,}1001}\\approx0{,}905$, donc $\\frac12\\times0{,}905\\approx0{,}452$, alors que $R^\\star=0$. Avec $K=10^4$ on obtient $\\approx0{,}495$.',
  },
  {
    id: 'ch9-num-kstar',
    type: 'numerique',
    title: 'Examen 2025 Q9 — k optimal',
    source: 'Examen 2025 Ex. 3 Q9',
    origin: 'annale',
    difficulty: 2,
    tags: ['knn', 'compromis'],
    question: 'Avec $k^\\star=(d/2)^{d/(d+2)}n^{2/(d+2)}$, que vaut $k^\\star$ pour $d=2$ et $n=10\\,000$ ?',
    answer: 100,
    tolerance: 0.5,
    hint: 'entier',
    explanation: 'Pour $d=2$ : $(d/2)^{d/(d+2)}=1$ et $n^{2/(d+2)}=n^{1/2}=100$. En $d=10$, on aurait $5^{10/12}\\times10^{4/6}\\approx3{,}82\\times4{,}64\\approx17{,}7$ et une vitesse $n^{-1/12}$ seulement.',
  },
  // ------------------------------------------------------------------ Annales
  {
    id: 'ch9-annale-2025-q8-q9',
    type: 'annale',
    title: 'Examen 2025 Ex. 3 Q8–Q9 — biais / variance des k plus proches voisins, choix de k',
    source: 'Examen 2025 Ex. 3 Q8–Q9 (solution : DIAGNOSTIC §2.A)',
    origin: 'annale',
    difficulty: 3,
    tags: ['knn', 'biais-variance', 'compromis', 'fleau-dimension'],
    durationMin: 25,
    statement: `Classification binaire $Y\\in\\{-1,1\\}$, $X\\in\\mathcal X\\subset\\mathbb R^d$, $\\eta(x)=\\mathbb P(Y=1\\mid X=x)$, $R(g)=\\mathbb P(g(X)\\ne Y)$, $R^\\star$ le risque bayésien. Hypothèses : (H1) $\\mathcal X$ compact ; (H2) $X$ a une densité $p_X$ avec $0<c_-\\le p_X\\le c_+$ ; (H3) $\\eta$ est $L$-lipschitzienne. Pour $x\\in\\mathcal X$, $N_k(x)$ désigne les indices des $k$ plus proches voisins de $x$ parmi $X_1,\\dots,X_n$, $\\mathfrak R_k(x)$ la distance au $k$-ième, et

$$\\hat\\eta_{n,k}(x)=\\frac1k\\sum_{i\\in N_k(x)}\\mathbf 1\\{Y_i=1\\},\\qquad\\hat g_{n,k}(x)=2\\,\\mathbf 1\\{\\hat\\eta_{n,k}(x)\\ge1/2\\}-1.$$

On admet les résultats des questions précédentes : (Q3) pour tout classifieur plug-in $\\hat g=2\\mathbf 1\\{\\hat\\eta\\ge1/2\\}-1$, $R(\\hat g)-R^\\star\\le2\\mathbb E|\\eta(X)-\\hat\\eta(X)|$ ; (Q7) $\\mathbb E_n[\\mathfrak R_k(x)^d]\\le\\frac{1}{c_-v_d}\\frac{k}{n+1}$, où $v_d$ est le volume de la boule unité.

**Q8.** Montrer que $\\mathbb E_n[(\\hat\\eta_{n,k}(x)-\\eta(x))^2]\\le C_d\\big((k/n)^{2/d}+1/k\\big)$ pour une constante $C_d$ explicite ($d\\ge2$).

**Q9.** En déduire une borne sur $\\mathbb E_n[R(\\hat g_{n,k})]-R^\\star$. Quel choix de $k$ optimise cette borne, et quelle vitesse obtient-on ? Commenter le cas de la grande dimension.`,
    hints: [
      'Q8 : conditionner par le design $X_{1:n}$ et introduire $\\bar\\eta_k(x)=\\mathbb E_n[\\hat\\eta_{n,k}(x)\\mid X_{1:n}]$ ; le terme croisé de la décomposition est nul.',
      'Variance : moyenne de $k$ Bernoulli conditionnellement indépendantes. Biais : (H3) donne $|\\bar\\eta_k-\\eta|\\le L\\mathfrak R_k$ ; Jensen avec $u\\mapsto u^{2/d}$ (concave) et Q7.',
      'Q9 : Q3 conditionnellement à $D_n$, Fubini, Cauchy-Schwarz ; minimiser $\\varphi(k)=(k/n)^{2/d}+1/k$ en annulant la dérivée.',
    ],
    correction: `**Q8.** Conditionnellement à $X_{1:n}$, l’ensemble $N_k(x)$ est fixé et les $Y_i$ sont indépendants avec $\\mathbb P(Y_i=1\\mid X_{1:n})=\\eta(X_i)$. Posons $\\bar\\eta_k(x):=\\mathbb E_n[\\hat\\eta_{n,k}(x)\\mid X_{1:n}]=\\frac1k\\sum_{i\\in N_k(x)}\\eta(X_i)$. Comme $\\mathbb E_n[\\hat\\eta_{n,k}-\\bar\\eta_k\\mid X_{1:n}]=0$, le terme croisé est nul et

$$\\mathbb E_n\\big[(\\hat\\eta_{n,k}(x)-\\eta(x))^2\\big]=\\underbrace{\\mathbb E_n\\big[(\\hat\\eta_{n,k}(x)-\\bar\\eta_k(x))^2\\big]}_{\\text{variance}}+\\underbrace{\\mathbb E_n\\big[(\\bar\\eta_k(x)-\\eta(x))^2\\big]}_{\\text{biais}^2}.$$

*Variance* : $\\mathrm{Var}(\\hat\\eta_{n,k}(x)\\mid X_{1:n})=\\frac1{k^2}\\sum_{i\\in N_k(x)}\\eta(X_i)(1-\\eta(X_i))\\le\\frac1{4k}$ (indépendance conditionnelle, $p(1-p)\\le1/4$), puis on prend l’espérance.

*Biais* : par (H3), $|\\bar\\eta_k(x)-\\eta(x)|\\le\\frac1k\\sum_{i\\in N_k(x)}|\\eta(X_i)-\\eta(x)|\\le L\\,\\mathfrak R_k(x)$, donc biais$^2\\le L^2\\mathbb E_n[\\mathfrak R_k(x)^2]$. Pour $d\\ge2$, $u\\mapsto u^{2/d}$ est **concave** sur $\\mathbb R_+$ ; par Jensen, $\\mathbb E_n[\\mathfrak R_k^2]=\\mathbb E_n[(\\mathfrak R_k^d)^{2/d}]\\le(\\mathbb E_n[\\mathfrak R_k^d])^{2/d}\\le\\big(\\frac{k}{c_-v_d(n+1)}\\big)^{2/d}$ (Q7). D’où, avec $n+1\\ge n$ :

$$\\mathbb E_n\\big[(\\hat\\eta_{n,k}(x)-\\eta(x))^2\\big]\\le\\frac{L^2}{(c_-v_d)^{2/d}}\\Big(\\frac kn\\Big)^{2/d}+\\frac1{4k}\\le C_d\\Big(\\Big(\\frac kn\\Big)^{2/d}+\\frac1k\\Big),\\qquad C_d=\\max\\Big(\\frac{L^2}{(c_-v_d)^{2/d}},\\frac14\\Big).$$

**Q9.** On applique Q3 à $\\hat\\eta_{n,k}$ **conditionnellement à $D_n$** (la règle est alors fixée), puis on prend l’espérance ; l’intégrande étant positif, Fubini-Tonelli permet d’échanger les espérances, et Cauchy-Schwarz (Jensen) donne

$$\\mathbb E_n[R(\\hat g_{n,k})]-R^\\star\\le2\\,\\mathbb E\\big[\\mathbb E_n|\\hat\\eta_{n,k}(X)-\\eta(X)|\\big]\\le2\\sqrt{\\mathbb E\\,\\mathbb E_n\\big[(\\hat\\eta_{n,k}(X)-\\eta(X))^2\\big]}\\le2\\sqrt{C_d}\\sqrt{(k/n)^{2/d}+1/k},$$

la borne de Q8 étant uniforme en $x$. Minimisons $\\varphi(k)=(k/n)^{2/d}+1/k$ : $\\varphi'(k)=\\frac2d\\frac{k^{2/d-1}}{n^{2/d}}-\\frac1{k^2}=0\\iff k^{1+2/d}=\\frac d2n^{2/d}\\iff k^\\star=(d/2)^{d/(d+2)}n^{2/(d+2)}\\asymp n^{2/(d+2)}$, et $\\varphi(k^\\star)\\asymp n^{-2/(d+2)}$. Donc

$$\\mathbb E_n[R(\\hat g_{n,k^\\star})]-R^\\star\\lesssim n^{-1/(d+2)}.$$

**Commentaire.** C’est le compromis du ch.9 : petit $k$ = variance $1/k$ grande (sur-apprentissage), grand $k$ = biais $(k/n)^{1/d}$ grand (sous-apprentissage). La vitesse $n^{-1/(d+2)}$ se dégrade avec $d$ : pour une précision $\\varepsilon$ il faut $n\\asymp\\varepsilon^{-(d+2)}$ observations, ce qui explose avec la dimension (**fléau de la dimension**). À comparer à la vitesse paramétrique $n^{-1/2}$ (ch.6–7) et aux bornes $\\sqrt{\\log|\\mathcal C|/n}$ du MRE sur classe finie (ch.9, Th. 1.6–1.8). En pratique, $k$ se choisit par validation (Méthode 1.2).`,
    bareme: [
      { label: 'Q8 conditionnement et décomposition biais / variance (terme croisé nul)', points: 0.4 },
      { label: 'Q8 variance ≤ 1/(4k)', points: 0.25 },
      { label: 'Q8 biais : Lipschitz, Jensen (concavité), Q7, constante C_d', points: 0.6 },
      { label: 'Q9 plug-in conditionnel, Fubini, Cauchy-Schwarz', points: 0.5 },
      { label: 'Q9 k optimal et vitesse n^(−1/(d+2))', points: 0.5 },
      { label: 'Q9 commentaire : compromis et fléau de la dimension', points: 0.25 },
    ],
  },
  {
    id: 'ch9-annale-pc9-validation',
    type: 'annale',
    title: 'PC9 Ex. 1 — Erreur de validation : sans biais, binomiale, Bienaymé-Tchebychev, Hoeffding',
    source: 'PC9 Ex. 1 (énoncé p. 1, corrigé p. 8–9) ; Poly ch.9, Méthode 1.2',
    origin: 'pc',
    difficulty: 2,
    tags: ['validation', 'hoeffding', 'conditionnement'],
    durationMin: 20,
    statement: `On cherche à estimer l’erreur $R(g_n):=\\mathbb P(g_n(X)\\ne Y\\mid D_n)$ d’une règle de classification $g_n$ calculée à partir d’un ensemble d’apprentissage $D_n=\\{(X_i,Y_i)\\}_{i=1}^n$ indépendant de $(X,Y)$. On dispose d’un ensemble de test $T_m=\\{(X_{n+i},Y_{n+i})\\}_{i=1}^m$ de $m$ couples indépendants, indépendants de $D_n$ et de même loi que $(X,Y)$, et l’on pose $\\hat R_{n,m}:=\\frac1m\\sum_{j=1}^m\\mathbf{1}_{\\{g_n(X_{n+j})\\ne Y_{n+j}\\}}$.

**Q1.** Montrer que $\\mathbb E[\\hat R_{n,m}\\mid D_n]=R(g_n)$.

**Q2.** Quelle est la loi conditionnelle de $m\\hat R_{n,m}$ sachant $D_n$ ?

**Q3.** Montrer que $\\mathbb E[(\\hat R_{n,m}-R(g_n))^2\\mid D_n]=\\frac{R(g_n)(1-R(g_n))}m$ et en déduire une majoration de $\\mathbb P(|\\hat R_{n,m}-R(g_n)|\\ge\\varepsilon)$.

**Q4.** À l’aide d’une inégalité exponentielle, montrer que $\\mathbb P(|\\hat R_{n,m}-R(g_n)|\\ge\\varepsilon)\\le2e^{-2m\\varepsilon^2}$. Combien de points de test faut-il, avec chacune des deux bornes, pour garantir $\\mathbb P(|\\hat R_{n,m}-R(g_n)|\\ge0{,}05)\\le0{,}05$ ?`,
    hints: [
      'Deux sources d’aléa : $D_n$ (à travers $g_n$) et le test. Conditionner par $D_n$ revient à « geler » $g_n$ (Prop. 2.5 du ch.8).',
      'Conditionnellement à $D_n$, les indicatrices de test sont i.i.d. de Bernoulli de paramètre $R(g_n)$ ; variance d’une binomiale, $p(1-p)\\le1/4$, tour des espérances, Markov sur le carré.',
      'Q4 : variables centrées à valeurs dans $[-R(g_n),1-R(g_n)]$ (longueur 1) ; Hoeffding conditionnel, puis espérance, puis les deux côtés.',
    ],
    correction: `**Q1.** Par linéarité de l’espérance conditionnelle, $\\mathbb E[\\hat R_{n,m}\\mid D_n]=\\frac1m\\sum_j\\mathbb E[\\mathbf{1}_{\\{g_n(X_{n+j})\\ne Y_{n+j}\\}}\\mid D_n]$. Les couples de test sont indépendants de $D_n$ : par conditionnement par une variable indépendante (Prop. 2.5 du ch.8), $\\mathbb E[\\mathbf{1}_{\\{g_n(X_{n+j})\\ne Y_{n+j}\\}}\\mid D_n]=\\mathbb P(g(X_{n+j})\\ne Y_{n+j})|_{g=g_n}=R(g_n)$, car $(X_{n+j},Y_{n+j})$ a la loi de $(X,Y)$. D’où $\\mathbb E[\\hat R_{n,m}\\mid D_n]=R(g_n)$ : l’erreur de validation est un estimateur **conditionnellement sans biais**, contrairement au risque empirique d’apprentissage du MRE (Prop. 1.1).

**Q2.** Conditionnellement à $D_n$, $g_n$ est fixée et les $m$ indicatrices sont indépendantes, de loi de Bernoulli de paramètre $R(g_n)$ : $\\mathcal L(m\\hat R_{n,m}\\mid D_n)=\\mathrm{Bin}(m,R(g_n))$.

**Q3.** Par Q1–Q2, $\\mathbb E[(\\hat R_{n,m}-R(g_n))^2\\mid D_n]=\\frac1{m^2}\\mathrm{Var}(m\\hat R_{n,m}\\mid D_n)=\\frac{R(g_n)(1-R(g_n))}m\\le\\frac1{4m}$. Par le tour des espérances, $\\mathbb E[(\\hat R_{n,m}-R(g_n))^2]\\le\\frac1{4m}$, et par l’inégalité de Markov appliquée au carré (Bienaymé-Tchebychev) :

$$\\mathbb P(|\\hat R_{n,m}-R(g_n)|\\ge\\varepsilon)\\le\\frac1{4m\\varepsilon^2}.$$

**Q4.** Conditionnellement à $D_n$, les variables $\\mathbf{1}_{\\{g_n(X_{n+j})\\ne Y_{n+j}\\}}-R(g_n)$ sont indépendantes, centrées, à valeurs dans $[-R(g_n),1-R(g_n)]$, intervalle de longueur 1. L’inégalité de Hoeffding (Th. 2.1 avec $D_m=m$, ou Th. 1.3) appliquée conditionnellement donne $\\mathbb P(\\hat R_{n,m}-R(g_n)\\ge\\varepsilon\\mid D_n)\\le e^{-2m\\varepsilon^2}$ ; la borne ne dépendant pas de $D_n$, le tour des espérances donne $\\mathbb P(\\hat R_{n,m}-R(g_n)\\ge\\varepsilon)\\le e^{-2m\\varepsilon^2}$. Même raisonnement pour la déviation inférieure ; par sous-additivité, $\\mathbb P(|\\hat R_{n,m}-R(g_n)|\\ge\\varepsilon)\\le2e^{-2m\\varepsilon^2}$.

*Application* : Bienaymé-Tchebychev exige $\\frac1{4m\\varepsilon^2}\\le0{,}05$, soit $m\\ge2000$ ; Hoeffding exige $2e^{-2m\\varepsilon^2}\\le0{,}05$, soit $m\\ge\\frac{\\ln40}{2\\cdot0{,}05^2}\\approx737{,}8$, donc $m\\ge738$. La borne exponentielle est beaucoup plus économe ; c’est la justification de la sélection par validation (Méthode 1.2).`,
    bareme: [
      { label: 'Q1 sans biais conditionnel (conditionnement par une variable indépendante)', points: 0.5 },
      { label: 'Q2 loi binomiale conditionnelle', points: 0.25 },
      { label: 'Q3 variance, p(1−p) ≤ 1/4, Bienaymé-Tchebychev', points: 0.5 },
      { label: 'Q4 Hoeffding conditionnel, intégration, bilatéral', points: 0.5 },
      { label: 'Application numérique (2000 contre 738)', points: 0.25 },
    ],
  },
  {
    id: 'ch9-annale-pc9-pisier',
    type: 'annale',
    title: 'PC9 Ex. 4 — Pisier, MRE sur classe finie, toutes les règles sur un ensemble fini',
    source: 'PC9 Ex. 4 (énoncé p. 3–4, corrigé p. 12–15) ; Poly ch.9, Th. 1.7–1.8',
    origin: 'pc',
    difficulty: 3,
    tags: ['pisier', 'classe-finie', 'processus-empirique', 'histogramme'],
    durationMin: 35,
    statement: `**Q1.** Soient $Z_1,\\dots,Z_m$ réelles telles que, pour un $\\sigma>0$ et tout $\\lambda\\ge0$, $\\mathbb E[e^{\\lambda Z_i}]\\le e^{\\lambda^2\\sigma^2/2}$. (a) Montrer que pour $\\lambda>0$, $e^{\\lambda\\mathbb E[\\max_iZ_i]}\\le\\mathbb E[e^{\\lambda\\max_iZ_i}]\\le m\\,e^{\\lambda^2\\sigma^2/2}$. (b) En déduire $\\mathbb E[\\max_iZ_i]\\le\\sigma\\sqrt{2\\log m}$. (c) Si de plus $\\mathbb E[e^{-\\lambda Z_i}]\\le e^{\\lambda^2\\sigma^2/2}$ pour $\\lambda>0$, montrer $\\mathbb E[\\max_i|Z_i|]\\le\\sigma\\sqrt{2\\log(2m)}$.

On dispose de $D_n=\\{(X_i,Y_i)\\}_{i=1}^n$ i.i.d. de même loi que $(X,Y)$ ; $R(g)=\\mathbb P(g(X)\\ne Y)$, $R_n(g)=\\frac1n\\sum_i\\mathbf{1}_{\\{g(X_i)\\ne Y_i\\}}$.

**Q2.** (a) Montrer que pour tout classifieur $g$ et tout $\\lambda\\in\\mathbb R$, $\\mathbb E[e^{\\lambda\\{R_n(g)-R(g)\\}}]\\le e^{\\lambda^2/(8n)}$. (b) Pour $\\mathcal C=\\{g_1,\\dots,g_M\\}$, $\\hat g^*_{n,\\mathcal C}$ le MRE et $g^\\star_{\\mathcal C}$ l’oracle, majorer $\\mathbb E[R(\\hat g^*_{n,\\mathcal C})-R(g^\\star_{\\mathcal C})]$.

**Q3.** On suppose $\\mathsf X$ fini de cardinal $K$ et $\\mathcal C$ l’ensemble de toutes les règles. Décrire le MRE.

**Q4.** Montrer que $\\inf_{\\mathcal C}R=R^\\star$ et majorer $\\mathbb E[R(\\hat g^*_n)]-R^\\star$ ; quel est l’ordre en $K$ et $n$ ?`,
    hints: [
      'Q1 : Jensen pour la convexité de $x\\mapsto e^{\\lambda x}$, puis $e^{\\lambda\\max}\\le\\sum e^{\\lambda Z_i}$ ; logarithme, division par $\\lambda$, optimisation ; pour (c) appliquer (b) aux $2m$ variables $\\pm Z_i$.',
      'Q2(a) : indépendance + identité de loi puis lemme de Hoeffding au paramètre $\\lambda/n$ (intervalle de longueur 1). Q2(b) : décomposition, définition du MRE, sans biais pour l’oracle, puis sup sur la classe et Q1 avec $\\sigma^2=1/(4n)$.',
      'Q3 : décomposer la somme selon la valeur de $X_i$. Q4 : $|\\mathcal C|=2^K$ ; Th. 1.8 (ou intégration de la queue $2^{K+1}e^{-2n\\varepsilon^2}$).',
    ],
    correction: `**Q1.** (a) $x\\mapsto e^{\\lambda x}$ est convexe : par Jensen, $e^{\\lambda\\mathbb E[\\max_iZ_i]}\\le\\mathbb E[e^{\\lambda\\max_iZ_i}]$. Pour $\\lambda>0$, l’exponentielle est croissante et positive, donc $e^{\\lambda\\max_iZ_i}=\\max_ie^{\\lambda Z_i}\\le\\sum_{i=1}^me^{\\lambda Z_i}$ ; par linéarité et hypothèse, $\\mathbb E[e^{\\lambda\\max_iZ_i}]\\le m\\,e^{\\lambda^2\\sigma^2/2}$.
(b) En prenant le logarithme et en divisant par $\\lambda>0$ : $\\mathbb E[\\max_iZ_i]\\le\\frac{\\log m}\\lambda+\\frac{\\lambda\\sigma^2}2$ ; le choix $\\lambda=\\sqrt{2\\log m}/\\sigma$ (pour $m\\ge2$) équilibre les deux termes et donne $\\sigma\\sqrt{2\\log m}$.
(c) Les $2m$ variables $Z_1,\\dots,Z_m,-Z_1,\\dots,-Z_m$ vérifient l’hypothèse de (a) et $\\max_i|Z_i|=\\max(Z_1,\\dots,-Z_m)$ : (b) avec $2m$ donne $\\sigma\\sqrt{2\\log(2m)}$. Aucune indépendance n’a été utilisée.

**Q2.** (a) $R_n(g)-R(g)=\\frac1n\\sum_k(\\mathbf{1}_{\\{g(X_k)\\ne Y_k\\}}-R(g))$ ; les termes sont indépendants, de même loi, centrés, à valeurs dans $[-R(g),1-R(g)]$ (longueur 1). Par indépendance puis lemme de Hoeffding (Poly ch.9, Lemme 1.1) au paramètre $\\lambda/n$ : $\\mathbb E[e^{\\lambda\\{R_n(g)-R(g)\\}}]=\\big(\\mathbb E[e^{(\\lambda/n)(\\mathbf{1}-R(g))}]\\big)^n\\le(e^{\\lambda^2/(8n^2)})^n=e^{\\lambda^2/(8n)}$.
(b) Par définition, $R_n(\\hat g^*_{n,\\mathcal C})\\le R_n(g^\\star_{\\mathcal C})$, d’où
$0\\le R(\\hat g^*_{n,\\mathcal C})-R(g^\\star_{\\mathcal C})\\le\\{R(\\hat g^*_{n,\\mathcal C})-R_n(\\hat g^*_{n,\\mathcal C})\\}+\\{R_n(g^\\star_{\\mathcal C})-R(g^\\star_{\\mathcal C})\\}$. Le second terme est d’espérance nulle ($g^\\star_{\\mathcal C}$ est **fixée**). Le premier dépend doublement de l’échantillon : on le majore par $\\max_{1\\le i\\le M}(R(g_i)-R_n(g_i))$. Par Q2(a) (avec $-\\lambda$), les $R(g_i)-R_n(g_i)$ vérifient Q1 avec $\\sigma^2=1/(4n)$ ; Q1(b) donne

$$\\mathbb E[R(\\hat g^*_{n,\\mathcal C})]-R(g^\\star_{\\mathcal C})\\le\\frac1{2\\sqrt n}\\sqrt{2\\log M}=\\sqrt{\\frac{\\log M}{2n}}.$$

(Le Th. 1.8 du poly, qui passe par la valeur absolue, donne $\\sqrt{\\log(2M)/(2n)}$.)

**Q3.** $\\sum_i\\mathbf{1}_{\\{Y_i\\ne g(X_i)\\}}=\\sum_{x\\in\\mathsf X}\\sum_i\\mathbf{1}_{\\{Y_i\\ne g(x)\\}}\\mathbf{1}_{\\{X_i=x\\}}$ et les valeurs $g(x)$ sont libres dans $\\mathcal C$ : on minimise point par point. Le MRE est le **vote majoritaire** parmi les $Y_i$ tels que $X_i=x$ (égalité ou point non observé : on prédit 1).

**Q4.** Le classifieur bayésien est une règle, donc $g^\\star\\in\\mathcal C$ et $\\inf_{\\mathcal C}R\\le R^\\star$ ; inversement $R(g)\\ge R^\\star$ pour toute $g$ : $\\inf_{\\mathcal C}R=R^\\star$ (erreur d’approximation nulle). Par Hoeffding pour chaque règle fixée et borne de l’union sur les $|\\mathcal C|=2^K$ règles, $\\mathbb P(\\sup_g|R_n(g)-R(g)|>\\varepsilon)\\le2^{K+1}e^{-2n\\varepsilon^2}$. Par le Th. 1.8 (Pisier) :

$$\\mathbb E[R(\\hat g^*_n)]-R^\\star\\le\\sqrt{\\frac{\\log(2^{K+1})}{2n}}=\\sqrt{\\frac{(K+1)\\log2}{2n}}=O\\Big(\\sqrt{\\frac Kn}\\Big).$$

(La PC obtient le même ordre en intégrant la queue : $\\mathbb E[U]=\\int_0^\\infty\\mathbb P(U>\\varepsilon)\\mathrm d\\varepsilon\\le x+2^{K-1}e^{-2nx^2}\\sqrt{2\\pi/n}$ pour tout $x>0$, en majorant la probabilité par 1 sur $[0,x]$.) La borne décroît comme $1/\\sqrt n$ et croît comme la racine du **logarithme** du cardinal de la classe ; elle disparaît si $\\mathsf X$ est infini (no free lunch).`,
    bareme: [
      { label: 'Q1(a)–(b) Jensen, max ≤ somme, optimisation en λ', points: 0.75 },
      { label: 'Q1(c) symétrisation (2m variables)', points: 0.25 },
      { label: 'Q2(a) indépendance + lemme de Hoeffding', points: 0.5 },
      { label: 'Q2(b) décomposition, sans biais de l’oracle, sup, Pisier', points: 0.75 },
      { label: 'Q3 vote majoritaire', points: 0.25 },
      { label: 'Q4 inf = R*, |C| = 2^K, borne en √(K/n)', points: 0.5 },
    ],
  },
  {
    id: 'ch9-annale-pc9-nfl',
    type: 'annale',
    title: 'PC9 Ex. 6 — Le théorème no free lunch',
    source: 'PC9 Ex. 6 (énoncé p. 5–6, corrigé p. 16–17) ; Poly ch.9, Th. 1.1 et Compléments §4.1',
    origin: 'pc',
    difficulty: 3,
    tags: ['no-free-lunch'],
    durationMin: 30,
    statement: `Classification binaire, labels dans $\\{0,1\\}$, $\\mathsf X$ infini muni d’une tribu contenant les singletons. On veut montrer que pour toute règle $x\\mapsto g_n(x;D_n)$,

$$\\sup_{\\mathbb P}\\big\\{\\mathbb E_n[\\mathbb P(Y\\ne g_n(X;D_n)\\mid D_n)]-R^*_{\\mathbb P}\\big\\}\\ge\\frac12,\\qquad R^*_{\\mathbb P}:=\\inf_{g:\\mathsf X\\to\\{0,1\\}}\\mathbb P(g(X)\\ne Y).$$

On fixe $K$ points distincts $a_1,\\dots,a_K$ et, pour $\\mathbf q\\in\\{0,1\\}^K$, la loi $\\mathbb P_{\\mathbf q}(X=a_j,Y=y_j)=K^{-1}\\delta_{q_j,y_j}$.

**Q1.** Montrer que sous $\\mathbb P_{\\mathbf q}$, $X$ est uniforme sur $\\{a_1,\\dots,a_K\\}$.

**Q2.** Calculer $\\mathbb P_{\\mathbf q}(g(X)\\ne Y)$ pour un classifieur $g$ et en déduire $R^*_{\\mathbb P_{\\mathbf q}}=0$.

**Q3.** Montrer que le sup est minoré par la moyenne sur les $\\mathbf q$ de $\\mathbb E_{n,\\mathbf q}[\\mathbb P_{\\mathbf q}(Y\\ne g_n(X;D_n)\\mid D_n)]$, elle-même minorée en se restreignant à l’événement $\\{X\\notin\\{X_1,\\dots,X_n\\}\\}$.

**Q4.** Conclure en montrant que la moyenne vaut au moins $\\frac12(1-1/K)^n$, puis faire tendre $K$ vers l’infini.`,
    hints: [
      'Q1 : probabilités totales sur la valeur de $Y$. Q2 : décomposer selon les valeurs de $X$ ; le classifieur $g_{\\mathbf q}(a_i)=q_i$ a un risque nul.',
      'Q3 : la famille $(\\mathbb P_{\\mathbf q})$ est incluse dans l’ensemble des lois ; « la moyenne est inférieure au maximum » ; $\\mathbf{1}_{\\{Y\\ne g_n\\}}\\ge\\mathbf{1}_{\\{Y\\ne g_n\\}}\\mathbf{1}_{\\{X\\notin\\{X_1,\\dots,X_n\\}\\}}$.',
      'Q4 : pour un point non observé, la moitié des étiquetages font se tromper la règle (le label en ce point est indépendant des labels vus) ; $\\mathbb P(X\\notin\\{X_1,\\dots,X_n\\})=(1-1/K)^n$ par indépendance.',
    ],
    correction: `**Q1.** Par définition $\\mathbb P_{\\mathbf q}(X=a_j,Y=q_j)=1/K$ et $\\mathbb P_{\\mathbf q}(X=a_j,Y=1-q_j)=0$ ; par la formule des probabilités totales, $\\mathbb P_{\\mathbf q}(X=a_j)=1/K$. Sous $\\mathbb P_{\\mathbf q}$, $Y=q_j$ p.s. lorsque $X=a_j$ : le label est une fonction déterministe de $X$. Les $X_i$ sont donc, sous $\\mathbb P_{n,\\mathbf q}$, i.i.d. uniformes sur $\\{a_1,\\dots,a_K\\}$, **quelle que soit** $\\mathbf q$.

**Q2.** En décomposant selon la valeur de $X$ : $\\mathbb P_{\\mathbf q}(Y\\ne g(X))=\\sum_{i=1}^K\\mathbb P_{\\mathbf q}(Y\\ne g(a_i),X=a_i)=\\frac1K\\sum_{i=1}^K\\mathbf{1}_{\\{q_i\\ne g(a_i)\\}}$. La règle $g_{\\mathbf q}$ telle que $g_{\\mathbf q}(a_i)=q_i$ (mesurable car les singletons le sont) a un risque nul ; une probabilité étant positive, $R^*_{\\mathbb P_{\\mathbf q}}=0$.

**Q3.** L’ensemble des lois contient les $\\mathbb P_{\\mathbf q}$, pour lesquelles $R^*=0$ : le sup est au moins $\\sup_{\\mathbf q}\\mathbb E_{n,\\mathbf q}[\\mathbb P_{\\mathbf q}(Y\\ne g_n(X;D_n)\\mid D_n)]$, lui-même au moins la **moyenne** sur les $2^K$ valeurs de $\\mathbf q$ (la moyenne est inférieure au maximum). Ensuite $\\mathbf{1}_{\\{Y\\ne g_n(X;D_n)\\}}\\ge\\mathbf{1}_{\\{Y\\ne g_n(X;D_n)\\}}\\mathbf{1}_{\\{X\\notin\\{X_1,\\dots,X_n\\}\\}}$ ; l’indicatrice de droite étant mesurable par rapport à $\\sigma(X,D_n)$, le tour des espérances donne la minoration par $\\mathbb E\\big[\\mathbb E_{\\mathbf q}[\\mathbf{1}_{\\{Y\\ne g_n(X;D_n)\\}}\\mid X,D_n]\\mathbf{1}_{\\{X\\notin\\{X_1,\\dots,X_n\\}\\}}\\big]$.

**Q4.** Tirons $\\mathbf q$ uniformément sur $\\{0,1\\}^K$, indépendamment des $X,X_1,\\dots,X_n$ (dont la loi ne dépend pas de $\\mathbf q$, Q1). Si $X=a_j\\notin\\{X_1,\\dots,X_n\\}$, la prédiction $g_n(a_j;D_n)$ est fonction des $X_i$ et des labels observés $q_{X_1},\\dots,q_{X_n}$, **indépendants** de $q_j=Y$, uniforme sur $\\{0,1\\}$ : la règle se trompe avec probabilité $1/2$ (exactement $2^{K-1}$ étiquetages sur $2^K$). Comme $\\mathbb P(X\\notin\\{X_1,\\dots,X_n\\})=(1-1/K)^n$ ($X,X_1,\\dots,X_n$ i.i.d. uniformes), la moyenne sur $\\mathbf q$ est au moins $\\frac12(1-\\frac1K)^n$. Ce minorant vaut pour tout $K$ ($\\mathsf X$ est infini) ; à $n$ fixé, $(1-1/K)^n\\to1$ quand $K\\to\\infty$, d’où le minorant $1/2$.

**Commentaire.** Toutes les lois $\\mathbb P_{\\mathbf q}$ sont « faciles » ($R^*=0$), mais aucune règle n’est bonne **uniformément** : aucune règle n’est uniformément universellement consistante quand $\\mathsf X$ est infini. Cela n’empêche pas la consistance pour chaque loi fixée. Application : $n=100$, $K=10^4$ donne $\\frac12(1-10^{-4})^{100}\\approx0{,}495$.`,
    bareme: [
      { label: 'Q1 loi uniforme de X', points: 0.25 },
      { label: 'Q2 risque de g et R* = 0', points: 0.5 },
      { label: 'Q3 sup ≥ moyenne, restriction au point non observé', points: 0.75 },
      { label: 'Q4 argument 1/2, (1 − 1/K)^n, limite K → ∞', points: 0.75 },
      { label: 'Commentaire (consistance uniforme vs universelle)', points: 0.25 },
    ],
  },
  {
    id: 'ch9-annale-histogramme',
    type: 'annale',
    title: 'Type examen blanc — classifieur par histogramme : MRE, Hoeffding, choix du nombre de cellules',
    source: 'Variante (style Examen 2025 Ex. 3 ; DIAGNOSTIC §9 point 3) ; Poly ch.9, Compléments §4.3, Th. 1.2, 1.5, 1.6, 1.8',
    origin: 'variante',
    difficulty: 3,
    tags: ['histogramme', 'classe-finie', 'hoeffding', 'compromis', 'fleau-dimension'],
    durationMin: 30,
    statement: `Classification binaire, $\\mathsf X=[0,1]^d$, $\\mathsf Y=\\{-1,1\\}$, perte 0-1, $\\mathcal D_n$ formé de $n$ couples i.i.d. de loi $\\mathbb P$. On découpe chaque axe en $q$ intervalles égaux : partition $\\{Q_1,\\dots,Q_m\\}$ en $m=q^d$ hypercubes, et l’on considère la classe $\\mathcal C=\\{g=\\sum_{j=1}^md_j\\mathbf{1}_{Q_j}:(d_1,\\dots,d_m)\\in\\{-1,1\\}^m\\}$.

**Q1.** Quel est le cardinal de $\\mathcal C$ ? Montrer que le MRE sur $\\mathcal C$ est le vote majoritaire dans chaque cellule.

**Q2.** Rappeler l’inégalité de Hoeffding (hypothèses comprises). En déduire, pour $\\varepsilon>0$, une majoration de $\\mathbb P\\big(\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|>\\varepsilon\\big)$.

**Q3.** Montrer qu’avec probabilité au moins $1-\\delta$, $R(\\hat g^*_{n,\\mathcal C})-\\inf_{g\\in\\mathcal C}R(g)\\le2\\sqrt{\\frac{(m+1)\\log2+\\log(1/\\delta)}{2n}}$.

**Q4.** Décomposer l’excès de risque $R(\\hat g^*_{n,\\mathcal C})-R^\\star$ et discuter le choix de $q$ en fonction de $n$ et de $d$.`,
    hints: [
      'Q1 : une règle de $\\mathcal C$ est un vecteur de $m$ signes ; le risque empirique est une somme de termes ne dépendant chacun que de $d_j$.',
      'Q2 : pour une règle **fixée**, les pertes sont i.i.d. dans $\\{0,1\\}$ ; borne de l’union sur la classe (aucune indépendance requise).',
      'Q3 : Th. 1.2 éq. (2) (facteur 2), puis résoudre $2\\cdot2^me^{-2n\\varepsilon^2}=\\delta$. Q4 : éq. (1) ; l’approximation décroît quand on raffine la partition, la borne d’estimation croît comme $\\sqrt{q^d/n}$.',
    ],
    correction: `**Q1.** Une règle de $\\mathcal C$ est déterminée par $(d_1,\\dots,d_m)\\in\\{-1,1\\}^m$ (les $Q_j$ forment une partition) : $|\\mathcal C|=2^m=2^{q^d}$. Le risque empirique s’écrit $\\widehat{\\mathrm R}_n(g)=\\sum_{j=1}^m\\frac1n\\sum_{i=1}^n\\mathbf{1}_{\\{\\mathbf X_i\\in Q_j\\}}\\mathbf{1}_{\\{Y_i\\ne d_j\\}}$, somme de termes dont le $j$-ième ne dépend que de $d_j$ : on minimise séparément, en prenant pour $d_j$ le label majoritaire parmi les observations de $Q_j$. Le MRE est le **vote majoritaire** dans chaque cellule.

**Q2.** *Hoeffding* (Th. 1.3) : si $X_1,\\dots,X_n$ sont **indépendantes** à valeurs dans $[0,1]$, $\\mathbb P(|\\frac1n\\sum_i\\{X_i-\\mathbb E X_i\\}|\\ge\\varepsilon)\\le2e^{-2n\\varepsilon^2}$ (pas besoin de même loi). Pour une règle $g\\in\\mathcal C$ **fixée**, les $\\mathbf{1}_{\\{g(\\mathbf X_i)\\ne Y_i\\}}$ sont i.i.d. de Bernoulli de paramètre $R(g)$, de moyenne $\\widehat{\\mathrm R}_n(g)$ : $\\mathbb P(|\\widehat{\\mathrm R}_n(g)-R(g)|>\\varepsilon)\\le2e^{-2n\\varepsilon^2}$. Par la borne de l’union (sous-additivité, aucune indépendance requise entre les règles), $\\mathbb P(\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|>\\varepsilon)\\le2|\\mathcal C|e^{-2n\\varepsilon^2}=2^{m+1}e^{-2n\\varepsilon^2}$ (Th. 1.5).

**Q3.** Par le Th. 1.2, éq. (2), $R(\\hat g^*_{n,\\mathcal C})-\\inf_{\\mathcal C}R\\le2\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$ p.s. Avec $\\varepsilon=\\sqrt{\\frac{(m+1)\\log2+\\log(1/\\delta)}{2n}}$, on a $2^{m+1}e^{-2n\\varepsilon^2}=\\delta$ ; par Q2 et passage au complémentaire, $\\sup_g|\\widehat{\\mathrm R}_n(g)-R(g)|\\le\\varepsilon$ avec probabilité au moins $1-\\delta$, et sur cet événement l’erreur d’estimation est au plus $2\\varepsilon$ : c’est la borne demandée (Th. 1.6 avec $|\\mathcal C|=2^m$). En espérance, le Th. 1.8 donne $\\sqrt{(m+1)\\log2/(2n)}$.

**Q4.** Par l’éq. (1), $R(\\hat g^*_{n,\\mathcal C})-R^\\star=\\{R(\\hat g^*_{n,\\mathcal C})-\\inf_{\\mathcal C}R\\}+\\{\\inf_{\\mathcal C}R-R^\\star\\}$. L’erreur d’**approximation** ne dépend pas des données et décroît (au sens large) quand on raffine la partition, par exemple de $q$ à $2q$ (classes emboîtées) ; elle tend donc à diminuer quand $q$ grandit. L’erreur d’**estimation** est majorée (Q3, Th. 1.8) par une quantité d’ordre $\\sqrt{m/n}=\\sqrt{q^d/n}$, croissante en $q$ : il faut **peu de cellules devant $n$** pour que chaque vote porte sur assez de points. Le bon $q$ réalise un compromis ; en pratique on le choisit par validation (Méthode 1.2). En dimension $d$, $m=q^d$ explose : même avec $q=2$, il faut $n\\gg2^d$ — c’est le **fléau de la dimension**, déjà rencontré pour les $k$ plus proches voisins (Examen 2025 Ex. 3 Q9).`,
    bareme: [
      { label: 'Q1 cardinal 2^m et vote majoritaire', points: 0.5 },
      { label: 'Q2 énoncé de Hoeffding + union', points: 0.75 },
      { label: 'Q3 Th. 1.2 (facteur 2) et inversion', points: 0.75 },
      { label: 'Q4 décomposition (1), compromis, grande dimension', points: 0.75 },
    ],
  },
]
