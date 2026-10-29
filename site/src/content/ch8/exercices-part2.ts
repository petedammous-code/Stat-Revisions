import type { Exercise } from '../types'

/** Ordonner, trouver l’erreur, étape suivante, associer, numériques, annales. */
export const exercisesPart2: Exercise[] = [
  // ------------------------------------------------------------------ Ordonner
  {
    id: 'ch8-ord-thm-1-2',
    type: 'ordonner',
    title: 'Preuve du Théorème 1.2 (classifieur de Bayes)',
    source: 'Poly ch.8, Th. 1.2 (preuve p. 15–16) ; Examen 2025 Ex. 3 Q1–Q2',
    origin: 'poly',
    difficulty: 2,
    tags: ['classifieur-bayes', 'exces-risque', 'cours'],
    prompt: 'Remettre dans l’ordre la preuve de : $g^\\star=2\\,\\mathbb{1}_{\\{\\eta\\ge1/2\\}}-1$ est bayésien et $R(g)-R(g^\\star)=\\mathbb{E}[|2\\eta(\\mathbf{X})-1|\\mathbb{1}_{\\{g\\ne g^\\star\\}}]$.',
    steps: [
      'Appliquer le Lemme 2.2 à $\\psi_g(\\mathbf{x},y)=\\mathbb{1}_{\\{g(\\mathbf{x})\\ne y\\}}$ : $R(g)=\\mathbb{E}[\\mathbb{1}_{\\{g(\\mathbf{X})=-1\\}}\\eta(\\mathbf{X})]+\\mathbb{E}[\\mathbb{1}_{\\{g(\\mathbf{X})=1\\}}(1-\\eta(\\mathbf{X}))]$.',
      'Remplacer $\\mathbb{1}_{\\{g=1\\}}$ par $1-\\mathbb{1}_{\\{g=-1\\}}$ : $R(g)=\\mathbb{E}[\\mathbb{1}_{\\{g(\\mathbf{X})=-1\\}}(2\\eta(\\mathbf{X})-1)]+\\mathbb{E}[1-\\eta(\\mathbf{X})]$ (éq. (6)).',
      'Faire la différence avec $g^\\star$ (le terme $\\mathbb{E}[1-\\eta]$ disparaît) : $R(g)-R(g^\\star)=\\mathbb{E}[D\\,(2\\eta(\\mathbf{X})-1)]$ avec $D=\\mathbb{1}_{\\{g=-1\\}}-\\mathbb{1}_{\\{g^\\star=-1\\}}\\in\\{-1,0,1\\}$.',
      'Disjonction de cas : si $D=1$ alors $\\eta\\ge\\frac12$, si $D=-1$ alors $\\eta<\\frac12$ ; dans les deux cas $D(2\\eta-1)=|2\\eta-1|\\mathbb{1}_{\\{g\\ne g^\\star\\}}\\ge0$.',
      'Conclure : l’excès de risque est l’espérance d’une quantité positive, donc $R(g^\\star)\\le R(g)$ pour tout $g$, et $R^\\star=\\mathbb{E}[\\min(\\eta,1-\\eta)]$ en reportant $g^\\star$ dans (6).',
    ],
    explanation: 'Schéma à réciter à l’examen : conditionnement (Lemme 2.2 ou tour + produit) → réécriture (6) → différence (7) → étude de signe → positivité. C’est exactement Q1–Q2 de l’Examen 2025 Ex. 3.',
  },
  {
    id: 'ch8-ord-majoration-13',
    type: 'ordonner',
    title: 'Preuve de la majoration (13) de l’excès de risque d’un plug-in',
    source: 'Poly ch.8, éq. (13) et Compléments Prop. 4.2 ; PC8 Ex. 7 ; Examen 2025 Ex. 3 Q3',
    origin: 'annale',
    difficulty: 2,
    tags: ['plug-in', 'exces-risque', 'cours'],
    prompt: 'Remettre dans l’ordre la preuve de $R(\\tilde g)-R(g^\\star)\\le2\\,\\mathbb{E}[|\\eta(X)-\\tilde\\eta(X)|]$ pour $\\tilde g=2\\,\\mathbb{1}_{\\{\\tilde\\eta\\ge1/2\\}}-1$.',
    steps: [
      'Écrire l’excès de risque par la formule (4) : $R(\\tilde g)-R(g^\\star)=2\\,\\mathbb{E}[|\\eta(X)-\\frac12|\\,\\mathbb{1}_{\\{\\tilde g(X)\\ne g^\\star(X)\\}}]$.',
      'Dans cette espérance, décrire l’ensemble de l’indicatrice (zone de désaccord) : $\\{\\tilde g\\ne g^\\star\\}=\\{\\eta\\ge\\frac12>\\tilde\\eta\\}\\cup\\{\\tilde\\eta\\ge\\frac12>\\eta\\}$ (même seuil des deux côtés).',
      'Sur chacune des deux parties, $\\eta$ et $\\tilde\\eta$ sont de part et d’autre de $\\frac12$, donc $|\\eta-\\frac12|\\le|\\eta-\\tilde\\eta|$.',
      'En déduire $|\\eta-\\frac12|\\mathbb{1}_{\\{\\tilde g\\ne g^\\star\\}}\\le|\\eta-\\tilde\\eta|\\mathbb{1}_{\\{\\tilde g\\ne g^\\star\\}}\\le|\\eta-\\tilde\\eta|$, puis prendre l’espérance (croissance) et multiplier par 2.',
    ],
    explanation: 'L’inégalité ponctuelle $|\\eta-\\frac12|\\le|\\eta-\\tilde\\eta|$ n’est vraie que sur la zone de désaccord : c’est pourquoi on garde l’indicatrice jusqu’au bout (borne fine de PC8 Ex. 2 Q4), avant de la majorer par 1.',
  },
  {
    id: 'ch8-ord-prop-1-5',
    type: 'ordonner',
    title: 'Preuve de la Proposition 1.5 (consistance du plug-in)',
    source: 'Poly ch.8, Prop. 1.5 (preuve p. 23) ; PC8 Ex. 2 Q5',
    origin: 'poly',
    difficulty: 3,
    tags: ['plug-in', 'double-alea'],
    prompt: 'Remettre dans l’ordre la preuve de $\\lim_n\\mathbb{E}_{n,\\theta^\\star}[R_{01}(\\widehat g_n)-R_{01}(g^\\star_{\\theta^\\star})]=0$.',
    steps: [
      'À $\\mathcal{D}_n$ fixé, appliquer (13) avec $\\tilde\\eta=\\eta_{\\hat\\theta_n}$ (indépendance du point de test, Prop. 2.5) : $0\\le R_{01}(\\widehat g_n)-R^\\star\\le2\\int|\\eta_{\\theta^\\star}-\\eta_{\\hat\\theta_n}|\\,p_{\\mathbf{X}}\\,\\mathrm{d}\\mu$.',
      'Prendre l’espérance sous la loi de $\\mathcal{D}_n$ et intervertir les intégrales par Fubini-Tonelli (intégrande positif).',
      'Pour presque tout $\\mathbf{x}$ fixé, $\\mathbb{E}_{n,\\theta^\\star}|\\eta_{\\theta^\\star}(\\mathbf{x})-\\eta_{\\hat\\theta_n}(\\mathbf{x})|\\to0$ : convergence en probabilité d’une suite bornée par 1 (convergence dominée).',
      'Conclure par une seconde convergence dominée en $\\mathbf{x}$ : les espérances sont majorées par 1 et $p_{\\mathbf{X}}\\cdot\\mu$ est une probabilité.',
    ],
    explanation: 'Trois outils : la majoration déterministe (13), Fubini-Tonelli pour échanger les deux aléas, et deux convergences dominées (en $\\mathcal{D}_n$ puis en $\\mathbf{x}$). Hypothèse cruciale : modèle bien spécifié.',
  },
  {
    id: 'ch8-ord-thm-1-1',
    type: 'ordonner',
    title: 'Preuve du Théorème 1.1 (régression quadratique)',
    source: 'Poly ch.8, Th. 1.1 (preuve p. 14)',
    origin: 'poly',
    difficulty: 2,
    tags: ['regression', 'esperance-conditionnelle', 'cours'],
    prompt: 'Remettre dans l’ordre la preuve de $\\mathbb{E}[(Y-g(\\mathbf{X}))^2]=\\mathbb{E}[(Y-g^\\star(\\mathbf{X}))^2]+\\mathbb{E}[(g^\\star(\\mathbf{X})-g(\\mathbf{X}))^2]$ avec $g^\\star(\\mathbf{X})=\\mathbb{E}[Y\\mid\\mathbf{X}]$.',
    steps: [
      'Exhiber $g^\\star$ mesurable : $\\mathbb{E}[Y\\mid\\mathbf{X}]$ est la projection de $Y$ sur $\\mathrm{L}^2(\\Omega,\\sigma(\\mathbf{X}),\\mathbb{P})$ et le lemme de Doob l’écrit $g^\\star(\\mathbf{X})$.',
      'Écrire $Y-g=(Y-g^\\star)+(g^\\star-g)$ et développer le carré ; les trois espérances sont finies.',
      'Annuler le terme croisé par la relation d’orthogonalité de la projection, car $g^\\star(\\mathbf{X})-g(\\mathbf{X})$ est une fonction de carré intégrable de $\\mathbf{X}$.',
      'Traiter le cas $\\mathbb{E}[g^2(\\mathbf{X})]=\\infty$ (risque infini) puis l’unicité : un minimiseur vérifie $\\mathbb{E}[(g^\\star-g)^2(\\mathbf{X})]=0$.',
    ],
    explanation: 'Existence (projection + Doob) → décomposition → orthogonalité → cas limites. L’argument central est l’orthogonalité (Th. 2.2 (ii)), pas l’inégalité de minimalité.',
  },
  // ------------------------------------------------------------------ Trouver l'erreur
  {
    id: 'ch8-err-plugin-partout',
    type: 'trouver-erreur',
    title: 'Majoration plug-in : une inégalité trop forte',
    source: 'PC8 Ex. 2 Q4 (idée de reformulation de l’extraction)',
    origin: 'pc',
    difficulty: 2,
    tags: ['plug-in', 'exces-risque'],
    prompt: 'Un étudiant démontre $R(\\tilde g)-R(g^\\star)\\le2\\,\\mathbb{E}|\\eta(X)-\\tilde\\eta(X)|$. Trouver la ligne fausse.',
    lines: [
      'Par (4) : $R(\\tilde g)-R(g^\\star)=2\\,\\mathbb{E}[|\\eta(X)-\\frac12|\\,\\mathbb{1}_{\\{\\tilde g(X)\\ne g^\\star(X)\\}}]$.',
      'Pour tout $x$, on a $|\\eta(x)-\\frac12|\\le|\\eta(x)-\\tilde\\eta(x)|$.',
      'Donc $|\\eta-\\frac12|\\mathbb{1}_{\\{\\tilde g\\ne g^\\star\\}}\\le|\\eta-\\tilde\\eta|$.',
      'En prenant l’espérance : $R(\\tilde g)-R(g^\\star)\\le2\\,\\mathbb{E}|\\eta(X)-\\tilde\\eta(X)|$.',
    ],
    faultyIndex: 1,
    explanation: 'L’inégalité n’est vraie que **sur $\\{\\tilde g\\ne g^\\star\\}$**, où $\\eta$ et $\\tilde\\eta$ sont de part et d’autre de $\\frac12$. Contre-exemple : $\\eta(x)=0{,}9$, $\\tilde\\eta(x)=0{,}8$ donne $0{,}4>0{,}1$. Version correcte : « sur $\\{\\tilde\\eta\\ge\\frac12>\\eta\\}$, $|\\eta-\\frac12|=\\frac12-\\eta\\le\\tilde\\eta-\\eta$ ; sur $\\{\\eta\\ge\\frac12>\\tilde\\eta\\}$, $|\\eta-\\frac12|=\\eta-\\frac12\\le\\eta-\\tilde\\eta$ » ; ailleurs l’indicatrice est nulle. La conclusion est juste, la justification non.',
  },
  {
    id: 'ch8-err-egalite-couples',
    type: 'trouver-erreur',
    title: 'Égalité en loi et espérance conditionnelle',
    source: 'PC8 Ex. 4 Q1 (piège relevé dans l’extraction)',
    origin: 'pc',
    difficulty: 3,
    tags: ['esperance-conditionnelle'],
    prompt: 'On veut montrer que $\\mathbb{E}[X\\mid Y]$ et $\\mathbb{E}[X\'\\mid Y\']$ ont même loi. Trouver la ligne fausse.',
    lines: [
      'Par le lemme de Doob, $\\mathbb{E}[X\\mid Y]=\\psi(Y)$ pour une fonction mesurable $\\psi$.',
      'Comme $Y$ et $Y\'$ ont même loi, $\\mathbb{E}[X\'\\mid Y\']=\\psi(Y\')$.',
      'Donc $\\mathbb{E}[X\'\\mid Y\']=\\psi(Y\')$ a la même loi que $\\psi(Y)$.',
      'Ainsi $\\mathbb{E}[X\\mid Y]$ et $\\mathbb{E}[X\'\\mid Y\']$ ont même loi.',
    ],
    faultyIndex: 1,
    explanation: 'L’égalité en loi de $Y$ et $Y\'$ **seule** ne suffit pas : il faut celle des **couples** $(X,Y)$ et $(X\',Y\')$ pour transférer $\\mathbb{E}[X\\phi(Y)]=\\mathbb{E}[\\psi(Y)\\phi(Y)]$ en $\\mathbb{E}[X\'\\phi(Y\')]=\\mathbb{E}[\\psi(Y\')\\phi(Y\')]$ et conclure par la caractérisation (Th.-déf. 2.1). Contre-exemple : $X\\sim\\mathcal{E}(1)$, $Y=Y\'=X$, $X\'=-X$ : $\\mathbb{E}[X\\mid Y]=X\\ge0$ mais $\\mathbb{E}[X\'\\mid Y\']=-X\\le0$.',
  },
  {
    id: 'ch8-err-lda-milieu',
    type: 'trouver-erreur',
    title: 'Frontière LDA avec des classes déséquilibrées',
    source: 'PC8 Ex. 3 Q2 ; Poly ch.8, p. 19',
    origin: 'pc',
    difficulty: 2,
    tags: ['lda-qda'],
    prompt: 'Modèle LDA, $\\Sigma_1=\\Sigma_{-1}=\\Sigma$, $\\pi_1=0{,}8$. Trouver la ligne fausse.',
    lines: [
      '$\\phi_\\theta(\\mathbf{x})=\\log\\frac{\\pi_1q_1(\\mathbf{x})}{\\pi_{-1}q_{-1}(\\mathbf{x})}=\\mathbf{w}_\\theta^\\top\\mathbf{x}+A_\\theta$ avec $\\mathbf{w}_\\theta=\\Sigma^{-1}(\\mu_1-\\mu_{-1})$.',
      '$A_\\theta=\\log\\frac{\\pi_1}{\\pi_{-1}}-\\frac12(\\mu_1^\\top\\Sigma^{-1}\\mu_1-\\mu_{-1}^\\top\\Sigma^{-1}\\mu_{-1})$.',
      'Donc $\\phi_\\theta\\big(\\frac{\\mu_1+\\mu_{-1}}2\\big)=0$ : le milieu $\\frac{\\mu_1+\\mu_{-1}}2$ est sur la frontière.',
      'La règle bayésienne prédit 1 du côté de l’hyperplan où $\\mathbf{w}_\\theta^\\top\\mathbf{x}+A_\\theta\\ge0$.',
    ],
    faultyIndex: 2,
    explanation: '$\\phi_\\theta\\big(\\frac{\\mu_1+\\mu_{-1}}2\\big)=\\log\\frac{\\pi_1}{\\pi_{-1}}=\\log4\\ne0$ : le milieu n’est sur la frontière **que si les classes sont équilibrées** ($\\pi_1=\\pi_{-1}$). Avec $\\pi_1=0{,}8$, l’hyperplan est translaté parallèlement à lui-même vers la classe $-1$, la moins probable.',
  },
  {
    id: 'ch8-err-rstar-constant',
    type: 'trouver-erreur',
    title: 'Risque bayésien et classifieur constant',
    source: 'Variante (Poly ch.8, Th. 1.2 éq. (5) ; PC8 Ex. 6 Q2)',
    origin: 'variante',
    difficulty: 2,
    tags: ['risque-bayesien'],
    prompt: 'Trouver la ligne fausse dans ce calcul du risque bayésien.',
    lines: [
      'Par (5), $R^\\star=\\mathbb{E}[\\min(\\eta(X),1-\\eta(X))]$.',
      'La fonction $u\\mapsto\\min(u,1-u)$ est concave sur $[0,1]$.',
      'Donc, par l’inégalité de Jensen, $\\mathbb{E}[\\min(\\eta,1-\\eta)]=\\min(\\mathbb{E}[\\eta],1-\\mathbb{E}[\\eta])=\\min(p,1-p)$.',
      'Ainsi $R^\\star\\le\\min(p,1-p)$ : le classifieur de Bayes fait au moins aussi bien que le meilleur classifieur constant.',
    ],
    faultyIndex: 2,
    explanation: 'Jensen pour une fonction concave donne seulement l’**inégalité** $\\mathbb{E}[\\min(\\eta,1-\\eta)]\\le\\min(p,1-p)$, pas l’égalité. Le classifieur de Bayes fait en général strictement mieux que la constante ; égalité seulement si $\\eta(X)$ reste du même côté de $\\frac12$ p.s. (les attributs ne changent jamais la décision). La ligne 4 est juste : elle n’utilise que l’inégalité.',
  },
  // ------------------------------------------------------------------ Étape suivante
  {
    id: 'ch8-etape-pc8-ex5',
    type: 'etape-suivante',
    title: 'PC8 Ex. 5 pas à pas : η, g*, R*, excès de risque',
    source: 'PC8 Ex. 5',
    origin: 'pc',
    difficulty: 2,
    tags: ['risque-bayesien', 'classifieur-bayes', 'exces-risque'],
    setup: '$\\mathbb{P}(Y=\\pm1)=\\frac12$, $X\\mid Y=-1\\sim\\mathcal{U}([0,2])$ (densité $\\frac12$), $X\\mid Y=1\\sim\\mathcal{U}([1,4])$ (densité $\\frac13$).',
    steps: [
      {
        prompt: 'Étape 1 — Sur $]1,2]$, la fonction de régression vaut :',
        choices: [
          { text: '$\\eta(x)=\\frac{1/3}{1/2+1/3}=\\frac25$', correct: true, explanation: 'Prop. 1.4 avec $p=\\frac12$ : $\\eta=\\frac{q_1}{q_1+q_{-1}}$.' },
          { text: '$\\eta(x)=\\frac12$', correct: false, explanation: 'Les classes sont équiprobables mais les densités de classe diffèrent sur le recouvrement.' },
          { text: '$\\eta(x)=\\frac35$', correct: false, explanation: 'C’est $\\mathbb{P}(Y=-1\\mid X=x)=1-\\eta(x)$.' },
        ],
      },
      {
        prompt: 'Étape 2 — Le classifieur bayésien est :',
        choices: [
          { text: '$g^\\star(x)=1$ ssi $x\\in\\,]2,4]$', correct: true, explanation: '$\\eta=0$ sur $[0,1]$, $\\frac25<\\frac12$ sur $]1,2]$, $1$ sur $]2,4]$.' },
          { text: '$g^\\star(x)=1$ ssi $x\\ge1{,}5$', correct: false, explanation: 'Seuil « au milieu du recouvrement » : erreur classique (vrai-faux associé).' },
          { text: '$g^\\star(x)=1$ ssi $x\\ge1$', correct: false, explanation: 'Sur $]1,2]$, la classe $-1$ reste la plus probable.' },
        ],
      },
      {
        prompt: 'Étape 3 — Le risque bayésien vaut :',
        choices: [
          { text: '$R^\\star=\\frac25\\,\\mathbb{P}(1<X\\le2)=\\frac25\\cdot\\frac5{12}=\\frac16$', correct: true, explanation: '(5) : $\\min(\\eta,1-\\eta)=\\frac25$ sur $]1,2]$ et 0 ailleurs ; $p_X=\\frac5{12}$ sur $]1,2[$.' },
          { text: '$R^\\star=\\frac25$', correct: false, explanation: 'Oubli de pondérer par la probabilité de la zone $]1,2]$.' },
          { text: '$R^\\star=\\frac12\\cdot\\frac12=\\frac14$', correct: false, explanation: 'C’est le risque de la règle qui prédit 1 dès $x\\ge1$.' },
        ],
      },
      {
        prompt: 'Étape 4 — L’excès de risque de $g(x)=2\\,\\mathbb{1}_{\\{x\\ge1\\}}-1$ vaut :',
        choices: [
          { text: '$\\mathbb{E}[|2\\eta-1|\\mathbb{1}_{\\{g\\ne g^\\star\\}}]=\\frac15\\cdot\\frac5{12}=\\frac1{12}$', correct: true, explanation: '(4) : désaccord sur $[1,2]$ où $|2\\eta-1|=\\frac15$.' },
          { text: '$\\mathbb{P}(g\\ne g^\\star)=\\frac5{12}$', correct: false, explanation: 'Ce n’est qu’un majorant : il manque le poids $|2\\eta-1|$.' },
          { text: '$\\frac16$', correct: false, explanation: 'C’est $R^\\star$, pas l’excès.' },
        ],
      },
    ],
    conclusion: 'Vérification directe : $R(g)=\\mathbb{P}(Y=-1,X\\ge1)=\\frac12\\cdot\\frac12=\\frac14=\\frac16+\\frac1{12}$.',
  },
  {
    id: 'ch8-etape-perte-asymetrique',
    type: 'etape-suivante',
    title: 'PC8 Ex. 1 pas à pas : risque pour une perte asymétrique',
    source: 'PC8 Ex. 1 Q1–Q2',
    origin: 'pc',
    difficulty: 2,
    tags: ['perte-asymetrique', 'classifieur-bayes'],
    setup: 'Perte : $c$ si $g(x)=-1$ et $y=1$ ; $1$ si $g(x)=1$ et $y=-1$ ; $0$ sinon. On calcule $R(g)=\\mathbb{E}[\\ell(Y,g(X))]$.',
    steps: [
      {
        prompt: 'Étape 1 — Après conditionnement par $X$ :',
        choices: [
          { text: '$R(g)=\\mathbb{E}[\\mathbb{1}_{\\{g(X)=1\\}}(1-\\eta(X))]+c\\,\\mathbb{E}[\\mathbb{1}_{\\{g(X)=-1\\}}\\eta(X)]$', correct: true, explanation: 'Tour + produit : $\\mathbb{1}_{\\{g(X)=\\pm1\\}}$ est $\\sigma(X)$-mesurable bornée, $\\mathbb{E}[\\mathbb{1}_{\\{Y=1\\}}\\mid X]=\\eta(X)$.' },
          { text: '$R(g)=\\mathbb{E}[\\mathbb{1}_{\\{g(X)=1\\}}\\eta(X)]+c\\,\\mathbb{E}[\\mathbb{1}_{\\{g(X)=-1\\}}(1-\\eta(X))]$', correct: false, explanation: 'Rôles de $\\eta$ et $1-\\eta$ échangés : prédire 1 coûte quand $Y=-1$, de probabilité conditionnelle $1-\\eta$.' },
          { text: '$R(g)=\\mathbb{P}(g(X)=1)(1-p)+c\\,\\mathbb{P}(g(X)=-1)\\,p$', correct: false, explanation: 'Remplacer $\\mathbb{E}[\\mathbb{1}_{\\{Y=1\\}}\\mid X]$ par $\\mathbb{P}(Y=1)$ suppose $X$ et $Y$ indépendants.' },
        ],
      },
      {
        prompt: 'Étape 2 — Avec $\\mathbb{1}_{\\{g=1\\}}=1-\\mathbb{1}_{\\{g=-1\\}}$ :',
        choices: [
          { text: '$R(g)=1-\\mathbb{E}[\\eta(X)]+(c+1)\\,\\mathbb{E}\\big[\\mathbb{1}_{\\{g(X)=-1\\}}(\\eta(X)-\\frac1{c+1})\\big]$', correct: true, explanation: '$c\\eta-(1-\\eta)=(c+1)\\eta-1=(c+1)(\\eta-\\frac1{c+1})$.' },
          { text: '$R(g)=1-\\mathbb{E}[\\eta(X)]+(c-1)\\,\\mathbb{E}[\\mathbb{1}_{\\{g(X)=-1\\}}\\eta(X)]$', correct: false, explanation: 'Erreur de signe sur le terme $-(1-\\eta)$.' },
          { text: '$R(g)=\\mathbb{E}[\\eta(X)]+(c+1)\\,\\mathbb{E}[\\mathbb{1}_{\\{g(X)=-1\\}}\\eta(X)]$', correct: false, explanation: 'Le terme constant est $\\mathbb{E}[1-\\eta(X)]$.' },
        ],
      },
      {
        prompt: 'Étape 3 — On minimise point par point ; la règle bayésienne prédit $-1$ exactement quand :',
        choices: [
          { text: '$\\eta(X)<\\frac1{c+1}$', correct: true, explanation: 'Le facteur $\\eta-\\frac1{c+1}$ est alors négatif : mettre l’indicatrice à 1 diminue le risque (Prop. 1.1).' },
          { text: '$\\eta(X)<\\frac c{c+1}$', correct: false, explanation: 'Seuil inversé.' },
          { text: '$\\eta(X)<\\frac12$', correct: false, explanation: 'Vrai seulement si $c=1$.' },
        ],
      },
    ],
    conclusion: '$g^\\star_c=2\\,\\mathbb{1}_{\\{\\eta\\ge\\frac1{c+1}\\}}-1$ ; son risque est $\\mathbb{E}[\\min(c\\,\\eta(X),1-\\eta(X))]$ et elle n’est unique qu’à l’ensemble $\\{\\eta=\\frac1{c+1}\\}$ près.',
  },
  {
    id: 'ch8-etape-lda',
    type: 'etape-suivante',
    title: 'PC8 Ex. 3 Q1–Q2 : de la formule de Bayes à la frontière LDA',
    source: 'PC8 Ex. 3 Q1–Q2 ; Poly ch.8, éq. (10)–(11)',
    origin: 'pc',
    difficulty: 2,
    tags: ['lda-qda'],
    setup: '$\\mathbf{X}\\mid Y=i\\sim\\mathcal{N}(\\mu_i,\\Sigma_i)$ ($\\Sigma_i$ inversibles), $\\mathbb{P}(Y=1)=\\pi_1$, $\\pi_{-1}=1-\\pi_1$.',
    steps: [
      {
        prompt: 'Étape 1 — La fonction de régression s’écrit $\\eta_\\theta=\\mathrm{sigm}(\\phi_\\theta)$ avec :',
        choices: [
          { text: '$\\phi_\\theta(\\mathbf{x})=\\log\\frac{\\pi_1q_1(\\mathbf{x})}{\\pi_{-1}q_{-1}(\\mathbf{x})}$', correct: true, explanation: '$\\eta=\\frac1{1+\\frac{\\pi_{-1}q_{-1}}{\\pi_1q_1}}=\\frac1{1+e^{-\\phi_\\theta}}$ (Prop. 1.4).' },
          { text: '$\\phi_\\theta(\\mathbf{x})=\\log\\frac{q_1(\\mathbf{x})}{q_{-1}(\\mathbf{x})}$', correct: false, explanation: 'Oubli des poids $\\pi_1$, $\\pi_{-1}$ (correct seulement si $\\pi_1=\\frac12$).' },
          { text: '$\\phi_\\theta(\\mathbf{x})=\\frac{\\pi_1q_1(\\mathbf{x})}{\\pi_1q_1(\\mathbf{x})+\\pi_{-1}q_{-1}(\\mathbf{x})}$', correct: false, explanation: 'C’est $\\eta_\\theta$ lui-même, pas son logit.' },
        ],
      },
      {
        prompt: 'Étape 2 — La règle $g_\\theta=2\\,\\mathbb{1}_{\\{\\eta_\\theta\\ge1/2\\}}-1$ prédit 1 ssi :',
        choices: [
          { text: '$\\phi_\\theta(\\mathbf{x})\\ge0$', correct: true, explanation: '$\\mathrm{sigm}$ est strictement croissante et $\\mathrm{sigm}(0)=\\frac12$.' },
          { text: '$\\phi_\\theta(\\mathbf{x})\\ge\\frac12$', correct: false, explanation: 'Le seuil $\\frac12$ porte sur $\\eta=\\mathrm{sigm}(\\phi)$, pas sur le logit.' },
          { text: '$\\phi_\\theta(\\mathbf{x})\\ge1$', correct: false, explanation: 'Aucune raison : $\\mathrm{sigm}(1)\\approx0{,}73$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Si $\\Sigma_1=\\Sigma_{-1}=\\Sigma$, alors :',
        choices: [
          { text: '$\\phi_\\theta(\\mathbf{x})=(\\mu_1-\\mu_{-1})^\\top\\Sigma^{-1}\\mathbf{x}-\\frac12\\mu_1^\\top\\Sigma^{-1}\\mu_1+\\frac12\\mu_{-1}^\\top\\Sigma^{-1}\\mu_{-1}+\\log\\frac{\\pi_1}{\\pi_{-1}}$', correct: true, explanation: 'Les termes $\\mathbf{x}^\\top\\Sigma^{-1}\\mathbf{x}$ et $\\log\\det$ se simplifient : frontière hyperplan (LDA).' },
          { text: '$\\phi_\\theta(\\mathbf{x})=(\\mu_1-\\mu_{-1})^\\top\\mathbf{x}+\\log\\frac{\\pi_1}{\\pi_{-1}}$', correct: false, explanation: 'Oubli de $\\Sigma^{-1}$ et du terme constant en $\\mu_i^\\top\\Sigma^{-1}\\mu_i$.' },
          { text: '$\\phi_\\theta$ reste quadratique en $\\mathbf{x}$', correct: false, explanation: 'Le terme quadratique est $-\\frac12\\mathbf{x}^\\top(\\Sigma_1^{-1}-\\Sigma_{-1}^{-1})\\mathbf{x}$, nul si $\\Sigma_1=\\Sigma_{-1}$.' },
        ],
      },
    ],
    conclusion: 'Frontière $\\{\\mathbf{w}_\\theta^\\top\\mathbf{x}+A_\\theta=0\\}$, hyperplan de vecteur normal $\\mathbf{w}_\\theta=\\Sigma^{-1}(\\mu_1-\\mu_{-1})$ ; le milieu $\\frac{\\mu_1+\\mu_{-1}}2$ est dessus ssi $\\pi_1=\\pi_{-1}$.',
  },
  {
    id: 'ch8-etape-prop-1-5',
    type: 'etape-suivante',
    title: 'PC8 Ex. 2 Q5 : l’excès de risque moyen d’un plug-in consistant tend vers 0',
    source: 'PC8 Ex. 2 Q5 ; Poly ch.8, Prop. 1.5',
    origin: 'pc',
    difficulty: 3,
    tags: ['plug-in', 'double-alea'],
    setup: '$\\tilde\\eta_n$ est apprise sur $\\mathcal{D}_n$, $\\tilde g_n=2\\,\\mathbb{1}_{\\{\\tilde\\eta_n\\ge1/2\\}}-1$, et pour presque tout $x$, $\\tilde\\eta_n(x)-\\eta(x)\\to0$ en $\\mathbb{P}_n$-probabilité.',
    steps: [
      {
        prompt: 'Étape 1 — À $\\mathcal{D}_n$ gelé, la question 4 (majoration plug-in) donne :',
        choices: [
          { text: '$R(\\tilde g_n)-R(g^\\star)\\le2\\,\\mathbb{E}[|\\tilde\\eta_n(X)-\\eta(X)|]$, l’espérance portant sur $X$ seul', correct: true, explanation: 'Indépendance du point de test et de $\\mathcal{D}_n$ (Prop. 2.5) ; on majore l’indicatrice par 1.' },
          { text: '$R(\\tilde g_n)-R(g^\\star)=0$', correct: false, explanation: 'L’excès n’est nul que si $\\tilde g_n=g^\\star$ presque partout.' },
          { text: '$R(\\tilde g_n)-R(g^\\star)\\le\\mathbb{E}[|\\tilde\\eta_n(X)-\\eta(X)|]$, sans facteur 2', correct: false, explanation: 'Facteur 2 oublié : l’excès vaut $2\\,\\mathbb{E}[|\\eta-\\frac12|\\mathbb{1}_{\\{\\tilde g_n\\ne g^\\star\\}}]$. Contre-exemple : $\\eta\\equiv0{,}7$, $\\tilde\\eta_n\\equiv0{,}45$ donne un excès $0{,}4>0{,}25$.' },
        ],
      },
      {
        prompt: 'Étape 2 — Pour échanger $\\mathbb{E}_n$ (sur $\\mathcal{D}_n$) et $\\mathbb{E}$ (sur $X$), on invoque :',
        choices: [
          { text: 'Fubini(-Tonelli), l’intégrande $|\\tilde\\eta_n(X)-\\eta(X)|$ étant positif et borné par 1', correct: true, explanation: 'On obtient $\\mathbb{E}_n[R(\\tilde g_n)-R^\\star]\\le2\\,\\mathbb{E}[\\phi_n(X)]$ avec $\\phi_n(x)=\\mathbb{E}_n|\\tilde\\eta_n(x)-\\eta(x)|$.' },
          { text: 'La loi des grands nombres', correct: false, explanation: 'Aucune moyenne empirique n’intervient ici.' },
          { text: 'Le lemme de Slutsky', correct: false, explanation: 'Slutsky concerne la convergence en loi, pas l’interversion d’espérances.' },
        ],
      },
      {
        prompt: 'Étape 3 — Pour conclure que $\\mathbb{E}[\\phi_n(X)]\\to0$ :',
        choices: [
          { text: 'Montrer $\\phi_n(x)\\le\\mathbb{P}_n(|\\tilde\\eta_n(x)-\\eta(x)|\\ge\\varepsilon)+\\varepsilon\\to\\varepsilon$ pour tout $\\varepsilon$, puis convergence dominée ($0\\le\\phi_n\\le1$)', correct: true, explanation: 'Convergence ponctuelle puis domination par la constante 1, intégrable sous la loi de $X$.' },
          { text: 'Appliquer le TCL à $\\tilde\\eta_n(X)$', correct: false, explanation: 'Aucune normalité asymptotique n’est en jeu ni nécessaire.' },
          { text: 'Utiliser l’inégalité de Jensen', correct: false, explanation: 'Jensen ne donne pas de convergence vers 0.' },
        ],
      },
    ],
    conclusion: 'C’est exactement la preuve de la Prop. 1.5. La bornitude ($\\tilde\\eta_n,\\eta\\in[0,1]$) est indispensable pour passer de la convergence en probabilité à la convergence des espérances.',
  },
  // ------------------------------------------------------------------ Associer
  {
    id: 'ch8-assoc-expressions',
    type: 'associer',
    title: 'Expressions du chapitre et leur signification',
    source: 'PC8 Ex. 2 ; Poly ch.8, Th. 1.2 et (13)',
    origin: 'pc',
    difficulty: 1,
    tags: ['risque-bayesien', 'exces-risque', 'cours'],
    prompt: 'Associer chaque expression à ce qu’elle représente.',
    pairs: [
      { left: '$\\mathbb{E}[\\min(\\eta(X),1-\\eta(X))]$', right: 'risque bayésien $R^\\star$', explanation: 'Éq. (5).' },
      { left: '$\\mathbb{E}[|2\\eta(X)-1|\\mathbb{1}_{\\{g(X)\\ne g^\\star(X)\\}}]$', right: 'excès de risque de $g$', explanation: 'Éq. (4).' },
      { left: '$\\mathbb{P}(g_1(X)\\ne g_2(X))$', right: 'majorant de $|R(g_1)-R(g_2)|$', explanation: 'PC8 Ex. 2 Q3, avec $|2\\eta-1|\\le1$.' },
      { left: '$2\\,\\mathbb{E}[|\\eta(X)-\\tilde\\eta(X)|]$', right: 'majorant de l’excès de risque du plug-in de $\\tilde\\eta$', explanation: 'Majoration (13).' },
      { left: '$\\min(p,1-p)$', right: 'risque du meilleur classifieur constant', explanation: 'Prédire la classe majoritaire ; majore $R^\\star$.' },
    ],
  },
  {
    id: 'ch8-assoc-modeles',
    type: 'associer',
    title: 'Modèle ↔ règle bayésienne et estimation',
    source: 'Poly ch.8, Cadres 1.2–1.4 ; Examen 2025 Ex. 4 Q8',
    origin: 'poly',
    difficulty: 1,
    tags: ['lda-qda', 'logistique', 'plug-in'],
    prompt: 'Associer chaque modèle à la forme de sa règle bayésienne.',
    pairs: [
      { left: 'Analyse discriminante, $\\Sigma_1=\\Sigma_{-1}$ (LDA)', right: 'hyperplan $\\mathbf{w}_\\theta^\\top\\mathbf{x}+A_\\theta\\ge0$, $\\mathbf{w}_\\theta=\\Sigma^{-1}(\\mu_1-\\mu_{-1})$', explanation: 'Termes quadratiques simplifiés.' },
      { left: 'Analyse discriminante, $\\Sigma_1\\ne\\Sigma_{-1}$ (QDA)', right: 'quadrique $\\{\\phi_\\theta\\ge0\\}$, $\\phi_\\theta$ de degré 2', explanation: 'Terme $-\\frac12\\mathbf{x}^\\top(\\Sigma_1^{-1}-\\Sigma_{-1}^{-1})\\mathbf{x}$.' },
      { left: 'Modèle logistique', right: '$\\theta^\\top\\mathbf{x}\\ge0$, loi de $\\mathbf{X}$ quelconque, EMV = perte logistique', explanation: 'Cadre 1.3, éq. (12).' },
      { left: 'Modèle linéaire gaussien (régression)', right: '$\\theta^\\top\\mathbf{x}$, EMV = moindres carrés', explanation: 'Cadre 1.4 ; $g^\\star=\\mathbb{E}[Y\\mid\\mathbf{X}]$.' },
      { left: '$k$ plus proches voisins', right: 'vote majoritaire : $\\hat\\eta_{n,k}(\\mathbf{x})\\ge\\frac12$', explanation: 'Plug-in de l’estimateur local de $\\eta$ (Examen 2025 Q4).' },
    ],
  },
  {
    id: 'ch8-assoc-emv-lda',
    type: 'associer',
    title: 'EMV de l’analyse discriminante',
    source: 'PC8 Ex. 3 Q4 et Q7',
    origin: 'pc',
    difficulty: 2,
    tags: ['lda-qda'],
    prompt: 'Associer chaque paramètre à son estimateur du maximum de vraisemblance ($N_i=\\sum_k\\mathbb{1}_{\\{Y_k=i\\}}$).',
    pairs: [
      { left: '$\\pi_{-1}=\\mathbb{P}(Y=-1)$', right: '$\\frac1n\\sum_k\\mathbb{1}_{\\{Y_k=-1\\}}$', explanation: 'Fréquence de la classe $-1$.' },
      { left: '$\\mu_1$', right: '$\\frac1{N_1}\\sum_{k:Y_k=1}X_k$', explanation: 'Moyenne des attributs de la classe 1.' },
      { left: '$\\Sigma_1$ (QDA)', right: '$\\frac1{N_1}\\sum_{k:Y_k=1}(X_k-\\hat\\mu_{1,n})(X_k-\\hat\\mu_{1,n})^\\top$', explanation: 'Covariance empirique **non corrigée** de la classe 1.' },
      { left: '$\\Sigma$ commune (LDA)', right: '$\\frac1n\\sum_k(X_k-\\hat\\mu_{Y_k,n})(X_k-\\hat\\mu_{Y_k,n})^\\top$', explanation: 'Covariance intra-classe poolée, centrée sur la moyenne de **sa** classe (pas sur la moyenne globale).' },
    ],
  },
  // ------------------------------------------------------------------ Numériques
  {
    id: 'ch8-num-pc8-ex5-exces',
    type: 'numerique',
    title: 'PC8 Ex. 5 — excès de risque d’une règle à seuil',
    source: 'PC8 Ex. 5 Q4',
    origin: 'pc',
    difficulty: 2,
    tags: ['exces-risque'],
    question: 'Avec les données de PC8 Ex. 5 ($\\mathbb{P}(Y=\\pm1)=\\frac12$, $X\\mid Y=-1\\sim\\mathcal{U}([0,2])$, $X\\mid Y=1\\sim\\mathcal{U}([1,4])$), calculer l’excès de risque $R(g)-R(g^\\star)$ de $g(x)=2\\,\\mathbb{1}_{\\{x\\ge1\\}}-1$.',
    answer: 1 / 12,
    tolerance: 0.002,
    hint: 'Donner une valeur décimale à 0,001 près.',
    explanation: '$g$ et $g^\\star$ diffèrent sur $[1,2]$, où $\\eta=\\frac25$ donc $|2\\eta-1|=\\frac15$ ; $\\mathbb{P}(1\\le X\\le2)=\\frac23-\\frac14=\\frac5{12}$. Par (4) : $\\frac15\\cdot\\frac5{12}=\\frac1{12}\\approx0{,}083$.',
  },
  {
    id: 'ch8-num-seuil-lda',
    type: 'numerique',
    title: 'Seuil de la règle bayésienne gaussienne, classes déséquilibrées',
    source: 'Poly ch.8, Ex. 1.6 (cas p quelconque) ; exemple de contrôle de PC8 Ex. 3',
    origin: 'variante',
    difficulty: 2,
    tags: ['lda-qda', 'classifieur-bayes'],
    question: '$d=1$, $X\\mid Y=-1\\sim\\mathcal{N}(0,1)$, $X\\mid Y=1\\sim\\mathcal{N}(2,1)$, $p=\\mathbb{P}(Y=1)=0{,}8$. La règle bayésienne prédit 1 ssi $x\\ge t$. Calculer $t$.',
    answer: 1 - Math.log(4) / 2,
    tolerance: 0.005,
    hint: 'Arrondir à 0,001.',
    explanation: '$\\phi(x)=\\log\\frac p{1-p}+\\frac{\\mu_1-\\mu_{-1}}{\\sigma^2}\\big(x-\\frac{\\mu_1+\\mu_{-1}}2\\big)=\\log4+2(x-1)\\ge0\\iff x\\ge1-\\frac{\\ln4}2\\approx0{,}307$. Le seuil se décale vers la classe la moins probable ($-1$).',
  },
  {
    id: 'ch8-num-rstar-gauss',
    type: 'numerique',
    title: 'Risque bayésien de deux gaussiennes',
    source: 'Variante (Poly ch.8, Ex. 1.6 et Th. 1.2)',
    origin: 'variante',
    difficulty: 2,
    tags: ['risque-bayesien'],
    question: '$p=\\frac12$, $X\\mid Y=-1\\sim\\mathcal{N}(-1,1)$, $X\\mid Y=1\\sim\\mathcal{N}(1,1)$. Calculer le risque bayésien $R^\\star$ (on donne $\\Phi(1)\\approx0{,}8413$).',
    answer: 0.1587,
    tolerance: 0.002,
    hint: 'Arrondir à 0,001.',
    explanation: 'Seuil au milieu $x=0$ (Ex. 1.6) ; $R^\\star=\\frac12\\mathbb{P}(X<0\\mid Y=1)+\\frac12\\mathbb{P}(X\\ge0\\mid Y=-1)=\\Phi(-1)=1-0{,}8413\\approx0{,}159$.',
  },
  {
    id: 'ch8-num-asym-pc8',
    type: 'numerique',
    title: 'Risque bayésien pour une perte asymétrique',
    source: 'Variante (PC8 Ex. 1 appliqué au modèle de PC8 Ex. 5)',
    origin: 'variante',
    difficulty: 3,
    tags: ['perte-asymetrique', 'risque-bayesien'],
    question: 'Modèle de PC8 Ex. 5 ($\\eta=0$ sur $[0,1]$, $\\frac25$ sur $]1,2]$, $1$ sur $]2,4]$ ; $\\mathbb{P}(1<X\\le2)=\\frac5{12}$). Perte asymétrique de PC8 Ex. 1 avec $c=2$. Calculer le risque bayésien $\\mathbb{E}[\\min(c\\,\\eta(X),1-\\eta(X))]$.',
    answer: 0.25,
    tolerance: 0.003,
    hint: 'Arrondir à 0,01.',
    explanation: 'Seuil $\\frac1{c+1}=\\frac13<\\frac25$ : la règle prédit 1 sur $]1,4]$. Sur $]1,2]$, $\\min(2\\cdot\\frac25,\\frac35)=\\frac35$ ; ailleurs 0. Risque $=\\frac35\\cdot\\frac5{12}=\\frac14$ (c’est $\\mathbb{P}(Y=-1,1<X\\le2)=\\frac12\\cdot\\frac12$, au coût 1).',
  },
  // ------------------------------------------------------------------ Annales
  {
    id: 'ch8-annale-2025-ex3',
    type: 'annale',
    title: 'Examen 2025 Ex. 3 Q1–Q5 — classifieur de Bayes, plug-in, k-PPV',
    source: 'Examen 2025 Ex. 3 Q1–Q5',
    origin: 'annale',
    difficulty: 2,
    tags: ['classifieur-bayes', 'exces-risque', 'plug-in', 'knn'],
    durationMin: 25,
    statement: `Classification binaire : $(X,Y)\\in\\mathbb{R}^d\\times\\{-1,1\\}$, $\\eta(x)=\\mathbb{P}(Y=1\\mid X=x)$, $R(g)=\\mathbb{P}(g(X)\\ne Y)$ pour $g:\\mathbb{R}^d\\to\\{-1,1\\}$ mesurable, $R^\\star=\\inf_gR(g)$.

**Q1.** Montrer que le classifieur bayésien est $g^\\star(x)=2\\,\\mathbb{1}_{\\{\\eta(x)\\ge1/2\\}}-1$.

**Q2.** Montrer que pour tout classifieur $g$, $R(g)-R^\\star=\\mathbb{E}\\big[|2\\eta(X)-1|\\,\\mathbb{1}_{\\{g(X)\\ne g^\\star(X)\\}}\\big]$.

**Q3.** Soit $\\hat\\eta:\\mathbb{R}^d\\to[0,1]$ et $\\hat g=2\\,\\mathbb{1}_{\\{\\hat\\eta\\ge1/2\\}}-1$. Montrer que $R(\\hat g)-R^\\star\\le2\\,\\mathbb{E}|\\eta(X)-\\hat\\eta(X)|$.

**Q4.** On dispose de $\\mathcal{D}_n=\\{(X_i,Y_i)\\}_{i\\le n}$ ; pour $x$ fixé, $N_k(x)$ désigne les indices des $k$ plus proches voisins de $x$ ($k$ impair). Montrer que le classifieur des $k$-PPV $\\hat g_{n,k}$ (vote majoritaire) est le plug-in de $\\hat\\eta_{n,k}(x)=\\frac1k\\sum_{i\\in N_k(x)}\\mathbb{1}_{\\{Y_i=1\\}}$.

**Q5.** Illustrer graphiquement la règle pour $k=3$, $n=10$, $d=2$ en quelques points.`,
    hints: [
      'Q1 : conditionner par $X$ ($\\mathbb{1}_{\\{g(X)=\\pm1\\}}$ est $\\sigma(X)$-mesurable bornée) pour écrire $R(g)$ en fonction de $\\eta$, puis remplacer $\\mathbb{1}_{\\{g=1\\}}$ par $1-\\mathbb{1}_{\\{g=-1\\}}$.',
      'Q2 : faire la différence des deux écritures de Q1 et poser $D=\\mathbb{1}_{\\{g=-1\\}}-\\mathbb{1}_{\\{g^\\star=-1\\}}\\in\\{-1,0,1\\}$ ; étudier le signe de $D(2\\eta-1)$ dans chaque cas.',
      'Q3 : par Q2, l’excès vaut $2\\,\\mathbb{E}[|\\eta-\\frac12|\\mathbb{1}_{\\{\\hat g\\ne g^\\star\\}}]$ ; sur $\\{\\hat g\\ne g^\\star\\}$, $\\eta$ et $\\hat\\eta$ sont de part et d’autre de $\\frac12$.',
    ],
    correction: `**Q1.** Comme $g$ est à valeurs dans $\\{-1,1\\}$, $\\mathbb{1}_{\\{g(X)\\ne Y\\}}=\\mathbb{1}_{\\{g(X)=-1\\}}\\mathbb{1}_{\\{Y=1\\}}+\\mathbb{1}_{\\{g(X)=1\\}}\\mathbb{1}_{\\{Y=-1\\}}$. Les variables $\\mathbb{1}_{\\{g(X)=\\pm1\\}}$ sont $\\sigma(X)$-mesurables et bornées ; par la propriété du produit (Outils Prop. 2.3) et l’espérance de l’espérance conditionnelle (Prop. 2.2) — c’est le Lemme 2.2 —,

$$R(g)=\\mathbb{E}\\big[\\mathbb{1}_{\\{g(X)=-1\\}}\\eta(X)+\\mathbb{1}_{\\{g(X)=1\\}}(1-\\eta(X))\\big]=\\mathbb{E}\\big[\\mathbb{1}_{\\{g(X)=-1\\}}(2\\eta(X)-1)\\big]+\\mathbb{E}[1-\\eta(X)],$$

en utilisant $\\mathbb{1}_{\\{g(X)=1\\}}=1-\\mathbb{1}_{\\{g(X)=-1\\}}$. Le second terme ne dépend pas de $g$. Le premier est l’espérance de $\\mathbb{1}_{\\{g(X)=-1\\}}(2\\eta(X)-1)$, qui est minimale **point par point** en prenant $g(x)=-1$ exactement là où $2\\eta(x)-1<0$, c’est-à-dire $g=g^\\star$ (Prop. 1.1). Donc $R(g^\\star)\\le R(g)$ pour tout $g$ : $g^\\star$ est un classifieur bayésien (Déf. 1.4), et en reportant, $R^\\star=\\mathbb{E}[\\min(\\eta(X),1-\\eta(X))]$.

**Q2.** Par différence des écritures de Q1 : $R(g)-R(g^\\star)=\\mathbb{E}[D\\,(2\\eta(X)-1)]$ avec $D=\\mathbb{1}_{\\{g(X)=-1\\}}-\\mathbb{1}_{\\{g^\\star(X)=-1\\}}\\in\\{-1,0,1\\}$, nul ssi $g(X)=g^\\star(X)$. Si $D=1$ : $g^\\star(X)=1$, donc $\\eta(X)\\ge\\frac12$ et $D(2\\eta-1)=|2\\eta-1|$. Si $D=-1$ : $g^\\star(X)=-1$, donc $\\eta(X)<\\frac12$ et $D(2\\eta-1)=-(2\\eta-1)=|2\\eta-1|$. Ainsi $D(2\\eta(X)-1)=|2\\eta(X)-1|\\mathbb{1}_{\\{g(X)\\ne g^\\star(X)\\}}$, d’où la formule (Th. 1.2, éq. (4)).

**Q3.** Par Q2 et $|2\\eta-1|=2|\\eta-\\frac12|$ : $R(\\hat g)-R^\\star=2\\,\\mathbb{E}[|\\eta(X)-\\frac12|\\mathbb{1}_{\\{\\hat g(X)\\ne g^\\star(X)\\}}]$. Les deux règles seuillant au même niveau $\\frac12$, $\\{\\hat g\\ne g^\\star\\}=\\{\\eta\\ge\\frac12>\\hat\\eta\\}\\cup\\{\\hat\\eta\\ge\\frac12>\\eta\\}$. Sur le premier ensemble, $|\\eta-\\frac12|=\\eta-\\frac12\\le\\eta-\\hat\\eta$ ; sur le second, $|\\eta-\\frac12|=\\frac12-\\eta\\le\\hat\\eta-\\eta$. Donc $|\\eta-\\frac12|\\mathbb{1}_{\\{\\hat g\\ne g^\\star\\}}\\le|\\eta-\\hat\\eta|$ et, par croissance de l’espérance, $R(\\hat g)-R^\\star\\le2\\,\\mathbb{E}|\\eta(X)-\\hat\\eta(X)|$ (majoration (13) du poly, PC8 Ex. 7).

**Q4.** $\\hat g_{n,k}(x)=1$ ssi au moins la moitié des $k$ voisins ont $Y_i=1$ (strictement plus de la moitié, $k$ étant impair), ssi $\\frac1k\\sum_{i\\in N_k(x)}\\mathbb{1}_{\\{Y_i=1\\}}\\ge\\frac12$, ssi $\\hat\\eta_{n,k}(x)\\ge\\frac12$ : $\\hat g_{n,k}=2\\,\\mathbb{1}_{\\{\\hat\\eta_{n,k}\\ge1/2\\}}-1$ est le plug-in de $\\hat\\eta_{n,k}$, estimateur local de $\\eta$ (le poly range les $k$-PPV parmi les méthodes qui modélisent $Y\\mid X$). Q3 s’applique alors à $\\mathcal{D}_n$ fixé.

**Q5.** Dessiner 10 points étiquetés $\\pm$ ; pour 2 ou 3 points tests, tracer le plus petit disque centré en $x$ contenant exactement 3 points de $\\mathcal{D}_n$, compter les labels et prédire le label majoritaire ; la frontière obtenue est non linéaire, par morceaux.`,
    bareme: [
      { label: 'Q1 conditionnement, éq. (6), minimisation', points: 0.75 },
      { label: 'Q2 différence et étude de signe', points: 0.5 },
      { label: 'Q3 majoration plug-in (deux cas)', points: 0.5 },
      { label: 'Q4 k-PPV = plug-in', points: 0.25 },
      { label: 'Q5 illustration', points: 0.25 },
    ],
  },
  {
    id: 'ch8-annale-cc2022-ex5',
    type: 'annale',
    title: 'CC 2022 Ex. 5 — le plus proche voisin : borne de Cover-Hart',
    source: 'CC MAP433 2022 Ex. 5',
    origin: 'annale',
    difficulty: 3,
    tags: ['knn', 'risque-bayesien', 'esperance-conditionnelle'],
    durationMin: 25,
    statement: `$(X,Y),(X_1,Y_1),\\dots,(X_n,Y_n)$ i.i.d., $Y\\in\\{-1,1\\}$, $\\eta(x)=\\mathbb{P}(Y=1\\mid X=x)$ continue. Règle du plus proche voisin : $\\hat h_n(x)=Y_{\\varphi_n(x)}$ avec $\\varphi_n(x)=\\arg\\min_i\\|x-X_i\\|$ ; on note $X_{(n)}=X_{\\varphi_n(X)}$ (notation du CC 2022 : plus proche voisin de $X$ ; à ne pas confondre avec la statistique d’ordre $X_{(n)}=\\max_iX_i$ du ch.1) et l’on admet $X_{(n)}\\to X$ en probabilité. On pose $r^\\star=\\min(\\eta(X),1-\\eta(X))$, $R^\\star=\\mathbb{E}[r^\\star]$.

**Q1.** Montrer que $r^\\star(1-r^\\star)=\\eta(X)(1-\\eta(X))$.

**Q2.** Montrer que $\\mathbb{P}(Y=-1,Y_i=1,\\varphi_n(X)=i\\mid X,X_1,\\dots,X_n)=(1-\\eta(X))\\,\\eta(X_i)\\,\\mathbb{1}_{\\{\\varphi_n(X)=i\\}}$.

**Q3–Q4.** En déduire $\\mathbb{P}(Y=-1,\\hat h_n(X)=1\\mid X,X_{1:n})=(1-\\eta(X))\\,\\eta(X_{(n)})$ et l’expression symétrique.

**Q5.** Montrer que $\\lim_n\\mathbb{E}[\\eta(X_{(n)})]=\\mathbb{E}[\\eta(X)]$.

**Q6.** En déduire $\\lim_n\\mathbb{P}(Y\\ne\\hat h_n(X))=2\\,\\mathbb{E}[r^\\star(1-r^\\star)]$.

**Q7.** Montrer que $R^\\star\\le\\lim_n\\mathbb{P}(Y\\ne\\hat h_n(X))\\le2R^\\star(1-R^\\star)$.`,
    hints: [
      'Q1 : disjonction de cas $\\eta\\le\\frac12$ (alors $r^\\star=\\eta$) et $\\eta>\\frac12$ (alors $r^\\star=1-\\eta$).',
      'Q2 : $\\varphi_n(X)$ est une fonction de $(X,X_{1:n})$ ; conditionnellement à $(X,X_{1:n})$, $Y$ et $Y_i$ sont indépendants de lois données par $\\eta(X)$ et $\\eta(X_i)$ (indépendance des couples).',
      'Q5–Q7 : convergence dominée ($\\eta$ continue, bornée par 1) ; puis $\\mathbb{E}[r^{\\star2}]\\ge(\\mathbb{E}r^\\star)^2$ et optimalité de $g^\\star$.',
    ],
    correction: `**Q1.** Si $\\eta\\le\\frac12$, $r^\\star=\\eta$ et l’égalité est immédiate ; si $\\eta>\\frac12$, $r^\\star=1-\\eta$ et $r^\\star(1-r^\\star)=(1-\\eta)\\eta$.

**Q2.** Les couples étant indépendants, conditionnellement à $(X,X_1,\\dots,X_n)$ les variables $Y$ et $Y_i$ sont indépendantes, avec $\\mathbb{P}(Y=-1\\mid X,X_{1:n})=\\mathbb{P}(Y=-1\\mid X)=1-\\eta(X)$ et $\\mathbb{P}(Y_i=1\\mid X,X_{1:n})=\\eta(X_i)$ (Prop. 2.5 : on gèle les autres variables indépendantes). L’indicatrice $\\mathbb{1}_{\\{\\varphi_n(X)=i\\}}$ est une fonction de $(X,X_{1:n})$, donc sort de l’espérance conditionnelle (Prop. 2.3) : $\\mathbb{P}(Y=-1,Y_i=1,\\varphi_n(X)=i\\mid X,X_{1:n})=(1-\\eta(X))\\eta(X_i)\\mathbb{1}_{\\{\\varphi_n(X)=i\\}}$.

**Q3–Q4.** $\\{\\hat h_n(X)=1\\}=\\bigcup_i\\{Y_i=1,\\varphi_n(X)=i\\}$ (réunion disjointe), donc en sommant Q2 sur $i$ et avec $\\sum_i\\eta(X_i)\\mathbb{1}_{\\{\\varphi_n(X)=i\\}}=\\eta(X_{(n)})$ : $\\mathbb{P}(Y=-1,\\hat h_n(X)=1\\mid\\cdot)=(1-\\eta(X))\\eta(X_{(n)})$. De même $\\mathbb{P}(Y=1,\\hat h_n(X)=-1\\mid\\cdot)=\\eta(X)(1-\\eta(X_{(n)}))$.

**Q5.** $\\eta$ continue et $X_{(n)}\\to X$ en probabilité donnent $\\eta(X_{(n)})\\to\\eta(X)$ en probabilité (théorème de continuité pour la convergence en probabilité, ch.6 Outils Th. 2.1) ; la suite est bornée par 1 : par convergence dominée (pour la convergence en probabilité), $\\mathbb{E}[\\eta(X_{(n)})]\\to\\mathbb{E}[\\eta(X)]$ ; de même $\\mathbb{E}[\\eta(X)\\eta(X_{(n)})]\\to\\mathbb{E}[\\eta(X)^2]$.

**Q6.** En prenant l’espérance (tour) et en sommant les deux types d’erreur : $\\mathbb{P}(Y\\ne\\hat h_n(X))=\\mathbb{E}[(1-\\eta(X))\\eta(X_{(n)})]+\\mathbb{E}[\\eta(X)(1-\\eta(X_{(n)}))]\\to2\\,\\mathbb{E}[\\eta(X)(1-\\eta(X))]=2\\,\\mathbb{E}[r^\\star(1-r^\\star)]$ par Q5 et Q1.

**Q7.** Minoration : $\\mathbb{P}(Y\\ne\\hat h_n(X))\\ge R^\\star$ pour tout $n$ par définition du risque bayésien (Déf. 1.4, $g^\\star$ optimal ; on conditionne par $\\mathcal{D}_n$), donc la limite aussi. Majoration : $2\\,\\mathbb{E}[r^\\star(1-r^\\star)]=2(\\mathbb{E}r^\\star-\\mathbb{E}[r^{\\star2}])\\le2(\\mathbb{E}r^\\star-(\\mathbb{E}r^\\star)^2)=2R^\\star(1-R^\\star)$, car $\\mathbb{E}[r^{\\star2}]\\ge(\\mathbb{E}r^\\star)^2$ (variance positive / Jensen). Le 1-PPV n’est donc pas consistant en général mais son risque limite est au plus deux fois le risque bayésien.`,
    bareme: [
      { label: 'Q1 disjonction de cas', points: 0.25 },
      { label: 'Q2 conditionnement et indépendance', points: 0.5 },
      { label: 'Q3–Q4 sommation sur i', points: 0.5 },
      { label: 'Q5 convergence dominée', points: 0.25 },
      { label: 'Q6 limite du risque', points: 0.5 },
      { label: 'Q7 encadrement (Jensen, optimalité)', points: 0.5 },
    ],
  },
  {
    id: 'ch8-annale-pc8-ex3',
    type: 'annale',
    title: 'PC8 Ex. 3 — analyse discriminante de bout en bout',
    source: 'PC8 Ex. 3 Q1–Q7',
    origin: 'pc',
    difficulty: 3,
    tags: ['lda-qda', 'plug-in'],
    durationMin: 40,
    statement: `Conditionnellement à $Y=i\\in\\{-1,1\\}$, $X\\in\\mathbb{R}^d$ suit $\\mathcal{N}(\\mu_i,\\Sigma_i)$ avec $\\Sigma_i$ inversibles ; $\\mathbb{P}(Y=1)=\\pi_1$, $\\pi_{-1}=1-\\pi_1$ ; $\\theta=(\\pi_1,\\mu_{-1},\\mu_1,\\Sigma_{-1},\\Sigma_1)$. On observe $\\mathcal{D}_n$, $n$-échantillon de ce modèle.

**Q1.** Montrer que $\\eta_\\theta(x)=\\mathrm{sigm}(\\phi_\\theta(x))$ pour une fonction $\\phi_\\theta$ à préciser ; interpréter $g_\\theta=2\\,\\mathbb{1}_{\\{\\eta_\\theta\\ge1/2\\}}-1$.

**Q2.** Si $\\Sigma_{-1}=\\Sigma_1=\\Sigma$, montrer que $\\phi_\\theta(x)=w_\\theta^\\top x+A_\\theta$ et interpréter.

**Q3–Q4.** Écrire la log-vraisemblance et calculer l’EMV $\\hat\\theta_n$.

**Q5.** Montrer que $\\hat\\theta_n$ est consistant.

**Q6.** Pour $\\tilde g_n=2\\,\\mathbb{1}_{\\{\\eta_{\\hat\\theta_n}\\ge1/2\\}}-1$, montrer que $\\lim_n\\mathbb{E}_{n,\\theta}[|R(\\tilde g_n)-R(g^\\star_\\theta)|]=0$.

**Q7.** Reprendre dans le modèle à covariance commune.`,
    hints: [
      'Q1–Q2 : formule de Bayes (Prop. 1.4), densité gaussienne, passage au log ; $\\mathrm{sigm}(t)\\ge\\frac12\\iff t\\ge0$.',
      'Q3–Q4 : la log-vraisemblance se sépare en un terme en $\\pi$, un en $(\\mu_1,\\Sigma_1)$, un en $(\\mu_{-1},\\Sigma_{-1})$ ; gradient en $\\mu_i$, puis covariance empirique de chaque classe (maximisation en deux temps).',
      'Q5–Q6 : LGN sur $\\frac1n\\sum\\mathbb{1}_{\\{Y_k=i\\}}$, $\\frac1n\\sum\\mathbb{1}_{\\{Y_k=i\\}}X_k$, $\\frac1n\\sum\\mathbb{1}_{\\{Y_k=i\\}}X_kX_k^\\top$ et continuité ; continuité de $\\theta\\mapsto\\phi_\\theta(x)$ puis Prop. 1.5 (PC8 Ex. 2 Q5).',
    ],
    correction: `**Q1.** Par la formule de Bayes (Prop. 1.4), $\\eta_\\theta(x)=\\frac{\\pi_1q_1(x)}{\\pi_1q_1(x)+\\pi_{-1}q_{-1}(x)}=\\frac1{1+e^{-\\phi_\\theta(x)}}$ avec

$$\\begin{aligned}\\phi_\\theta(x)&=\\log\\frac{\\pi_1q_1(x)}{\\pi_{-1}q_{-1}(x)}\\\\&=\\frac12x^\\top(\\Sigma_{-1}^{-1}-\\Sigma_1^{-1})x+(\\mu_1^\\top\\Sigma_1^{-1}-\\mu_{-1}^\\top\\Sigma_{-1}^{-1})x\\\\&\\quad-\\frac12\\mu_1^\\top\\Sigma_1^{-1}\\mu_1+\\frac12\\mu_{-1}^\\top\\Sigma_{-1}^{-1}\\mu_{-1}+\\log\\Big(\\frac{\\pi_1}{\\pi_{-1}}\\sqrt{\\frac{\\det\\Sigma_{-1}}{\\det\\Sigma_1}}\\Big)\\end{aligned}$$

(densités gaussiennes, développement des formes quadratiques, $\\Sigma_i^{-1}$ symétriques). Comme $\\mathrm{sigm}$ est strictement croissante avec $\\mathrm{sigm}(0)=\\frac12$, $g_\\theta(x)=1\\iff\\phi_\\theta(x)\\ge0$ : la frontière est une quadrique (QDA).

**Q2.** Si $\\Sigma_1=\\Sigma_{-1}=\\Sigma$, le terme quadratique et le terme en déterminants s’annulent : $\\phi_\\theta(x)=w_\\theta^\\top x+A_\\theta$ avec $w_\\theta=\\Sigma^{-1}(\\mu_1-\\mu_{-1})$, $A_\\theta=\\log\\frac{\\pi_1}{\\pi_{-1}}-\\frac12(\\mu_1^\\top\\Sigma^{-1}\\mu_1-\\mu_{-1}^\\top\\Sigma^{-1}\\mu_{-1})$. La frontière est un hyperplan de vecteur normal $w_\\theta$ (LDA) ; si $\\pi_1=\\pi_{-1}$ il passe par $\\frac{\\mu_1+\\mu_{-1}}2$ ; si $\\Sigma=\\mathrm{I}$, $w=\\mu_1-\\mu_{-1}$.

**Q3.** Avec $\\frac{1+Y}2=\\mathbb{1}_{\\{Y=1\\}}$ et $\\frac{1-Y}2=\\mathbb{1}_{\\{Y=-1\\}}$, la densité d’une observation par rapport à $\\mathrm{Leb}\\otimes\\mathrm{c}$ donne, par indépendance (somme des log),

$$\\ell_n(\\theta)=-\\frac{nd}2\\ln(2\\pi)+\\sum_{i\\in\\{-1,1\\}}\\Big[N_i\\ln\\pi_i-\\frac{N_i}2\\ln\\det\\Sigma_i-\\frac12\\sum_{k:Y_k=i}(X_k-\\mu_i)^\\top\\Sigma_i^{-1}(X_k-\\mu_i)\\Big].$$

où $N_i=\\sum_k\\mathbb{1}_{\\{Y_k=i\\}}$.

**Q4.** La log-vraisemblance se sépare. En $\\pi_{-1}$ : $-\\frac{N_1}{1-\\pi_{-1}}+\\frac{N_{-1}}{\\pi_{-1}}=0$, fonction strictement concave tendant vers $-\\infty$ aux bords : $\\hat\\pi_{-1,n}=\\frac{N_{-1}}n$. En $\\mu_i$ : $\\sum_{k:Y_k=i}\\Sigma_i^{-1}(X_k-\\mu_i)=0$, forme strictement concave : $\\hat\\mu_{i,n}=\\frac1{N_i}\\sum_{k:Y_k=i}X_k$ (quel que soit $\\Sigma_i$). Puis, à moyennes fixées à leur optimum, la maximisation en $\\Sigma_i$ est celle de l’EMV de la covariance d’une gaussienne de moyenne connue : $\\hat\\Sigma_{i,n}=\\frac1{N_i}\\sum_{k:Y_k=i}(X_k-\\hat\\mu_{i,n})(X_k-\\hat\\mu_{i,n})^\\top$ (covariances empiriques non corrigées ; elles demandent au moins $d+1$ points par classe pour être inversibles).

**Q5.** Par la LGN : $\\frac1n\\sum_k\\mathbb{1}_{\\{Y_k=i\\}}\\to\\pi_i>0$, $\\frac1n\\sum_k\\mathbb{1}_{\\{Y_k=i\\}}X_k\\to\\pi_i\\mu_i$, $\\frac1n\\sum_k\\mathbb{1}_{\\{Y_k=i\\}}X_kX_k^\\top\\to\\pi_i(\\Sigma_i+\\mu_i\\mu_i^\\top)$ en probabilité (moments d’ordre 2 finis). Comme $\\hat\\mu_{i,n}$ est un quotient et $\\hat\\Sigma_{i,n}=\\frac{\\frac1n\\sum\\mathbb{1}_{\\{Y_k=i\\}}X_kX_k^\\top}{\\frac1n\\sum\\mathbb{1}_{\\{Y_k=i\\}}}-\\hat\\mu_{i,n}\\hat\\mu_{i,n}^\\top$ (König-Huygens), le théorème de continuité (ch.6 Th. 1.1) donne $\\hat\\theta_n\\to\\theta$ en $\\mathbb{P}_{n,\\theta}$-probabilité.

**Q6.** Pour tout $x$, $\\theta\\mapsto\\phi_\\theta(x)$ est continue sur $\\Theta$ (inverse et déterminant continus sur les matrices inversibles, $\\det>0$, $\\log$ continu) ; par continuité, $\\eta_{\\hat\\theta_n}(x)=\\mathrm{sigm}(\\phi_{\\hat\\theta_n}(x))\\to\\eta_\\theta(x)$ en probabilité. Le modèle est bien spécifié : la Prop. 1.5 (PC8 Ex. 2 Q5 : majoration plug-in, Fubini, convergence dominée deux fois) donne $\\mathbb{E}_{n,\\theta}[R(\\tilde g_n)-R(g^\\star_\\theta)]\\to0$ ; la valeur absolue est sans effet car l’excès est $\\ge0$ ($g^\\star_\\theta$ bayésien).

**Q7.** Seule l’estimation de la covariance change : $\\hat\\Sigma_n=\\frac1n\\sum_k(X_k-\\hat\\mu_{Y_k,n})(X_k-\\hat\\mu_{Y_k,n})^\\top=\\frac{N_{-1}}n\\hat\\Sigma_{-1,n}+\\frac{N_1}n\\hat\\Sigma_{1,n}\\to\\pi_{-1}\\Sigma+\\pi_1\\Sigma=\\Sigma$ (covariance intra-classe poolée) ; la règle plug-in est linéaire et l’on conclut comme en Q6, **à condition que le modèle à covariance commune soit le bon**.`,
    bareme: [
      { label: 'Q1 φ_θ et interprétation', points: 1 },
      { label: 'Q2 cas LDA', points: 0.75 },
      { label: 'Q3 log-vraisemblance', points: 0.75 },
      { label: 'Q4 EMV', points: 1 },
      { label: 'Q5 consistance', points: 0.75 },
      { label: 'Q6 excès de risque', points: 0.75 },
      { label: 'Q7 covariance commune', points: 0.5 },
    ],
  },
  {
    id: 'ch8-annale-pc8-ex2',
    type: 'annale',
    title: 'PC8 Ex. 2 — risque bayésien, écart de risques, consistance du plug-in',
    source: 'PC8 Ex. 2 Q1–Q5',
    origin: 'pc',
    difficulty: 2,
    tags: ['risque-bayesien', 'exces-risque', 'plug-in', 'double-alea'],
    durationMin: 30,
    statement: `Classification binaire, perte 0–1, $g^\\star(X)=2\\,\\mathbb{1}_{\\{\\eta(X)\\ge1/2\\}}-1$.

**Q1.** Montrer que $R(g^\\star)=\\mathbb{E}[\\min(\\eta(X),1-\\eta(X))]$, puis que $R(g^\\star)=\\frac12-\\frac12\\mathbb{E}[|2\\eta(X)-1|]$ (rappel : $\\min(a,b)+\\frac{|b-a|}2=\\frac{a+b}2$).

**Q2.** Montrer que pour tout classifieur $g$, $R(g)=\\mathbb{E}\\big[\\mathbb{1}_{\\{g(X)=-1\\}}(2\\eta(X)-1)+(1-\\eta(X))\\big]$.

**Q3.** En déduire $|R(g_1)-R(g_2)|\\le\\mathbb{E}\\big[|2\\eta(X)-1|\\,\\mathbb{1}_{\\{g_1(X)\\ne g_2(X)\\}}\\big]\\le\\mathbb{P}(g_1(X)\\ne g_2(X))$.

**Q4.** Pour $\\tilde\\eta:X\\mapsto[0,1]$ et $\\tilde g=2\\,\\mathbb{1}_{\\{\\tilde\\eta\\ge1/2\\}}-1$, montrer $R(\\tilde g)-R(g^\\star)\\le2\\,\\mathbb{E}\\big[|\\eta(X)-\\tilde\\eta(X)|\\,\\mathbb{1}_{\\{g^\\star(X)\\ne\\tilde g(X)\\}}\\big]$.

**Q5.** $\\tilde\\eta_n$ est apprise sur un $n$-échantillon $\\mathcal{D}_n$ de la loi $\\mathbb{Q}$ de $(X,Y)$ et $\\tilde g_n=2\\,\\mathbb{1}_{\\{\\tilde\\eta_n\\ge1/2\\}}-1$. Montrer que si $\\tilde\\eta_n(x)-\\eta(x)\\to0$ en $\\mathbb{P}_n$-probabilité pour $\\mathbb{Q}$-presque tout $x$, alors $\\lim_n\\mathbb{E}_n[R(\\tilde g_n)-R(g^\\star)]=0$.`,
    hints: [
      'Q1 : partition de $\\{g^\\star(X)\\ne Y\\}$, tour et produit ; $\\{g^\\star=1\\}=\\{\\eta\\ge1-\\eta\\}$.',
      'Q2–Q3 : $\\mathbb{1}_{\\{g=1\\}}=1-\\mathbb{1}_{\\{g=-1\\}}$ ; différence de deux écritures, $|\\mathbb{E}Z|\\le\\mathbb{E}|Z|$ et $|\\mathbb{1}_{\\{g_1=-1\\}}-\\mathbb{1}_{\\{g_2=-1\\}}|=\\mathbb{1}_{\\{g_1\\ne g_2\\}}$.',
      'Q4–Q5 : excès $\\ge0$ (optimalité de $g^\\star$), deux cas sur $\\{\\tilde g\\ne g^\\star\\}$ ; puis Fubini et convergence dominée avec $\\phi_n(x)=\\mathbb{E}_n|\\tilde\\eta_n(x)-\\eta(x)|\\le\\mathbb{P}_n(|\\cdot|\\ge\\varepsilon)+\\varepsilon$.',
    ],
    correction: `**Q1.** $R(g^\\star)=\\mathbb{P}(g^\\star(X)=1,Y=-1)+\\mathbb{P}(g^\\star(X)=-1,Y=1)=\\mathbb{E}[(1-\\eta(X))\\mathbb{1}_{\\{g^\\star(X)=1\\}}+\\eta(X)\\mathbb{1}_{\\{g^\\star(X)=-1\\}}]$ (tour et produit, Outils Prop. 2.2–2.3). Or $\\{g^\\star=1\\}=\\{\\eta\\ge\\frac12\\}=\\{\\eta\\ge1-\\eta\\}$ : sur cet ensemble $1-\\eta=\\min(\\eta,1-\\eta)$, et sur $\\{\\eta<1-\\eta\\}$, $\\eta=\\min(\\eta,1-\\eta)$. D’où $R(g^\\star)=\\mathbb{E}[\\min(\\eta(X),1-\\eta(X))]$. Avec $a=\\eta$, $b=1-\\eta$ : $\\min(a,b)=\\frac12-\\frac12|2\\eta-1|$, et par linéarité $R(g^\\star)=\\frac12-\\frac12\\mathbb{E}[|2\\eta(X)-1|]$ ; donc $R(g^\\star)\\le\\frac12$, avec égalité ssi $\\eta(X)=\\frac12$ p.s. (variable positive d’espérance nulle).

**Q2.** Même calcul pour $g$ quelconque : $R(g)=\\mathbb{E}[\\mathbb{1}_{\\{g=-1\\}}\\eta+\\mathbb{1}_{\\{g=1\\}}(1-\\eta)]$ et $\\mathbb{1}_{\\{g=1\\}}=1-\\mathbb{1}_{\\{g=-1\\}}$ donnent l’éq. (6) du poly.

**Q3.** Le terme $\\mathbb{E}[1-\\eta]$ se simplifie : $R(g_1)-R(g_2)=\\mathbb{E}[(2\\eta-1)(\\mathbb{1}_{\\{g_1=-1\\}}-\\mathbb{1}_{\\{g_2=-1\\}})]$ (éq. (7)). Par $|\\mathbb{E}Z|\\le\\mathbb{E}|Z|$ et $|\\mathbb{1}_{\\{g_1=-1\\}}-\\mathbb{1}_{\\{g_2=-1\\}}|=\\mathbb{1}_{\\{g_1\\ne g_2\\}}$ (classifieurs binaires), on obtient la première majoration ; la seconde vient de $|2\\eta-1|\\le1$.

**Q4.** Q3 avec $g_1=\\tilde g$, $g_2=g^\\star$ et $|2\\eta-1|=2|\\eta-\\frac12|$ ; la valeur absolue disparaît car $R(\\tilde g)-R(g^\\star)\\ge0$ ($g^\\star$ bayésien, Th. 1.2). Sur $\\{\\tilde g=1,g^\\star=-1\\}=\\{\\tilde\\eta\\ge\\frac12>\\eta\\}$ : $|\\eta-\\frac12|=\\frac12-\\eta\\le\\tilde\\eta-\\eta$ ; sur $\\{\\tilde g=-1,g^\\star=1\\}=\\{\\eta\\ge\\frac12>\\tilde\\eta\\}$ : $|\\eta-\\frac12|=\\eta-\\frac12\\le\\eta-\\tilde\\eta$. D’où la borne par croissance de l’espérance.

**Q5.** À $\\mathcal{D}_n$ fixé, Q4 (en majorant l’indicatrice par 1) : $R(\\tilde g_n)-R(g^\\star)\\le2\\,\\mathbb{E}[|\\tilde\\eta_n(X)-\\eta(X)|]$, l’espérance portant sur le point de test, indépendant de $\\mathcal{D}_n$. On prend $\\mathbb{E}_n$ et on intervertit par Fubini (intégrande positif, borné par 1) : $\\mathbb{E}_n[R(\\tilde g_n)-R(g^\\star)]\\le2\\,\\mathbb{E}[\\phi_n(X)]$ avec $\\phi_n(x)=\\mathbb{E}_n|\\tilde\\eta_n(x)-\\eta(x)|\\in[0,1]$. Pour $\\mathbb{Q}$-presque tout $x$ et tout $\\varepsilon>0$, $\\phi_n(x)\\le\\mathbb{P}_n(|\\tilde\\eta_n(x)-\\eta(x)|\\ge\\varepsilon)+\\varepsilon$, donc $\\limsup_n\\phi_n(x)\\le\\varepsilon$ : $\\phi_n(x)\\to0$. Par convergence dominée (domination par 1), $\\mathbb{E}[\\phi_n(X)]\\to0$. C’est la Prop. 1.5 du poly.`,
    bareme: [
      { label: 'Q1 risque bayésien (deux formes)', points: 1 },
      { label: 'Q2 éq. (6)', points: 0.5 },
      { label: 'Q3 écart de risques', points: 0.75 },
      { label: 'Q4 majoration plug-in', points: 0.75 },
      { label: 'Q5 Fubini et convergence dominée', points: 1 },
    ],
  },
]
