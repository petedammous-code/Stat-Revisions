import type { Exercise } from '../types'

/** Étape suivante, associer, numériques, annales. */
export const exercisesPart2: Exercise[] = [
  // ------------------------------------------------------------------ Étape suivante
  {
    id: 'ch3-etape-poisson-efficace',
    type: 'etape-suivante',
    title: 'Poisson : de la densité à l’efficacité de l’EMV',
    source: 'Poly ch.3, Ex. 1.14 et Ex. 1.18 ; DIAGNOSTIC §5.4',
    origin: 'poly',
    difficulty: 1,
    tags: ['fisher', 'cramer-rao', 'efficacite'],
    setup: '$n$-échantillon de $\\{\\mathcal{P}\\mathrm{oi}(\\theta),\\ \\theta>0\\}$ (modèle régulier). On veut la borne de Cramér-Rao pour $g(\\theta)=\\theta$ et savoir si l’EMV $\\bar X_n$ l’atteint.',
    steps: [
      {
        prompt: 'Étape 1 — Le score d’une observation $S(\\theta,x)=\\partial_\\theta\\ell_1(\\theta,x)$ vaut :',
        choices: [
          { text: '$\\frac x\\theta-1$', correct: true, explanation: '$\\ell_1(\\theta,x)=-\\theta+x\\log\\theta-\\log(x!)$ ; on dérive en $\\theta$. Contrôle : $\\mathbb{E}_\\theta[S]=0$.' },
          { text: '$\\frac x\\theta$', correct: false, explanation: 'Oubli de la dérivée de $-\\theta$ : le « score » ne serait pas centré, signe d’une erreur.' },
          { text: '$x-\\theta$', correct: false, explanation: 'C’est le score du modèle $\\mathcal{N}(\\theta,1)$, pas de Poisson.' },
        ],
      },
      {
        prompt: 'Étape 2 — L’information de Fisher du $n$-échantillon vaut :',
        choices: [
          { text: '$n/\\theta$', correct: true, explanation: '$\\mathbb{I}_1=\\mathrm{Var}_\\theta(X/\\theta)=\\theta/\\theta^2=1/\\theta$, puis additivité (Prop. 1.2 (iii)).' },
          { text: '$1/\\theta$', correct: false, explanation: 'C’est l’information d’**une** observation ; oubli du facteur $n$.' },
          { text: '$n\\theta$', correct: false, explanation: 'Confusion avec la variance de $\\sum_iX_i$ ; l’information est l’inverse de la variance d’une moyenne efficace.' },
        ],
      },
      {
        prompt: 'Étape 3 — Conclusion sur $\\bar X_n$ :',
        choices: [
          { text: '$\\bar X_n$ est sans biais et $\\mathrm{Var}_\\theta(\\bar X_n)=\\theta/n=1/\\mathbb{I}(\\theta)$ : il est efficace, donc E.S.B.V.M.', correct: true, explanation: 'Ex. 1.18 : égalité pour tout $\\theta$ (Déf. 1.10).' },
          { text: '$\\mathrm{Var}_\\theta(\\bar X_n)=\\theta^2/n$ : il n’atteint pas la borne.', correct: false, explanation: 'Pour Poisson, $\\mathrm{Var}_\\theta(X)=\\theta$, pas $\\theta^2$ (confusion avec l’exponentielle).' },
          { text: 'On ne peut rien dire, car l’EMV est toujours biaisé.', correct: false, explanation: 'Faux : ici $\\mathbb{E}_\\theta[\\bar X_n]=\\theta$.' },
        ],
      },
    ],
    conclusion: 'Même schéma pour Bernoulli (borne $\\theta(1-\\theta)/n$, Ex. 1.17) et le gaussien à variance connue ($\\sigma_0^2/n$, Ex. 1.19).',
  },
  {
    id: 'ch3-etape-regression-fisher',
    type: 'etape-suivante',
    title: 'PC3 Ex. 2 — information matricielle et borne pour β₁',
    source: 'PC3 Ex. 2 Q1–Q2 ; Poly ch.3, Exercice 2',
    origin: 'pc',
    difficulty: 2,
    tags: ['fisher', 'cramer-rao', 'multidimensionnel', 'regression'],
    setup: '$\\mathbf{Y}\\sim\\mathcal{N}(\\mathbf{X}\\theta,\\sigma^2\\mathrm{I}_n)$, $\\mathbf{X}=[\\mathbf{1}\\ \\mathbf{x}]$, $\\theta=(\\beta_1,\\beta_2)^\\top$, $\\sigma^2$ connu. On a $\\nabla_\\theta\\ell_n=\\frac1{\\sigma^2}\\mathbf{X}^\\top(\\mathbf{Y}-\\mathbf{X}\\theta)$.',
    steps: [
      {
        prompt: 'Étape 1 — Quelle propriété utilise-t-on pour calculer $\\mathbb{E}_\\theta[\\nabla_\\theta\\ell_n\\nabla_\\theta\\ell_n^\\top]$ ?',
        choices: [
          { text: '$\\mathbb{E}_\\theta[(\\mathbf{Y}-\\mathbf{X}\\theta)(\\mathbf{Y}-\\mathbf{X}\\theta)^\\top]=\\sigma^2\\mathrm{I}_n$', correct: true, explanation: 'Les $Y_i$ sont indépendants de variance $\\sigma^2$ ; on sort les matrices déterministes $\\mathbf{X}^\\top$ et $\\mathbf{X}$.' },
          { text: '$\\mathbb{E}_\\theta[\\mathbf{Y}-\\mathbf{X}\\theta]=0$ suffit', correct: false, explanation: 'Le centrage donne $\\mathbb{E}[S]=0$, pas la covariance du score.' },
          { text: 'L’additivité $\\mathbb{I}=n\\,\\mathbb{I}_1$', correct: false, explanation: 'Les observations ne sont pas identiquement distribuées (moyennes $\\beta_1+\\beta_2x_i$) : pas de $\\mathbb{I}_1$ commun.' },
        ],
      },
      {
        prompt: 'Étape 2 — On obtient $\\mathbb{I}(\\beta_1,\\beta_2)=$',
        choices: [
          { text: '$\\frac1{\\sigma^2}\\mathbf{X}^\\top\\mathbf{X}$', correct: true, explanation: '$\\sigma^{-4}\\mathbf{X}^\\top(\\sigma^2\\mathrm{I}_n)\\mathbf{X}$. Même résultat par la hessienne constante $-\\mathbf{X}^\\top\\mathbf{X}/\\sigma^2$.' },
          { text: '$\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1}$', correct: false, explanation: 'C’est l’**inverse** de l’information (covariance de $\\hat\\beta$, et borne de Cramér-Rao matricielle).' },
          { text: '$\\frac1{\\sigma^4}\\mathbf{X}^\\top\\mathbf{X}$', correct: false, explanation: 'Oubli du facteur $\\sigma^2$ provenant de la covariance de $\\mathbf{Y}$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Borne pour un estimateur sans biais régulier de $\\beta_1$ :',
        choices: [
          { text: '$[\\mathbb{I}^{-1}]_{11}=\\frac{\\sigma^2}n\\cdot\\frac{\\sum_ix_i^2}{\\sum_i(x_i-\\bar x)^2}$', correct: true, explanation: 'Thm 1.1 avec $\\nabla g=(1,0)^\\top$ ; inverse $2\\times2$ (comatrice / déterminant $n\\sum(x_i-\\bar x)^2$).' },
          { text: '$1/\\mathbb{I}_{11}=\\sigma^2/n$', correct: false, explanation: 'Piège classique : c’est la borne quand $\\beta_2$ est **connu** ; ici $\\beta_2$ est un paramètre de nuisance inconnu.' },
          { text: '$\\sigma^2/\\sum_i(x_i-\\bar x)^2$', correct: false, explanation: 'C’est $[\\mathbb{I}^{-1}]_{22}$, la borne pour $\\beta_2$.' },
        ],
      },
    ],
    conclusion: 'Application ($n=3$, $\\mathbf{x}=(0,1,2)$, $\\sigma^2=1$) : $\\mathbb{I}=\\begin{pmatrix}3&3\\\\3&5\\end{pmatrix}$, borne pour $\\beta_1$ : $5/6$ ; si $\\beta_2$ est connu : $1/3$.',
  },
  {
    id: 'ch3-etape-variance-gauss',
    type: 'etape-suivante',
    title: 'Ex. 1.8 — comparer les risques de S²ₙ et σ̂²ₙ',
    source: 'Poly ch.3, Ex. 1.8 ; Examen 2025 Ex. 2 Q4',
    origin: 'poly',
    difficulty: 2,
    tags: ['risque', 'biais', 'admissibilite'],
    setup: '$n$-échantillon de $\\mathcal{N}(\\mu,\\sigma^2)$, $n\\ge2$ ; on estime $\\sigma^2$ par $S_n^2$ ou par $\\hat\\sigma_n^2=\\frac{n-1}nS_n^2$.',
    steps: [
      {
        prompt: 'Étape 1 — Par Gosset, $\\mathrm{Var}_\\theta(S_n^2)=$',
        choices: [
          { text: '$\\frac{2\\sigma^4}{n-1}$', correct: true, explanation: '$(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ de variance $2(n-1)$ : $\\frac{\\sigma^4}{(n-1)^2}2(n-1)$.' },
          { text: '$\\frac{2\\sigma^2}{n-1}$', correct: false, explanation: 'Oubli du carré : $\\mathrm{Var}(cY)=c^2\\mathrm{Var}(Y)$ avec $c=\\sigma^2/(n-1)$.' },
          { text: '$\\frac{\\sigma^4}{n-1}$', correct: false, explanation: 'La variance d’un $\\chi^2(k)$ est $2k$, pas $k$.' },
        ],
      },
      {
        prompt: 'Étape 2 — $R(\\theta,\\hat\\sigma_n^2)=$',
        choices: [
          { text: '$\\frac{\\sigma^4}{n^2}+\\frac{2(n-1)\\sigma^4}{n^2}=\\frac{(2n-1)\\sigma^4}{n^2}$', correct: true, explanation: 'Biais $-\\sigma^2/n$ (au carré) + variance $\\frac{(n-1)^2}{n^2}\\frac{2\\sigma^4}{n-1}$ (Prop. 1.1).' },
          { text: '$\\frac{2(n-1)\\sigma^4}{n^2}$', correct: false, explanation: 'C’est seulement la variance : oubli du carré du biais.' },
          { text: '$\\frac{2\\sigma^4}{n-1}$', correct: false, explanation: 'C’est le risque de $S_n^2$ ; le facteur $\\frac{n-1}n$ change biais et variance.' },
        ],
      },
      {
        prompt: 'Étape 3 — Conclusion :',
        choices: [
          { text: '$R(\\theta,S_n^2)-R(\\theta,\\hat\\sigma_n^2)=\\frac{(3n-1)\\sigma^4}{(n-1)n^2}>0$ pour tout $\\theta$ : $S_n^2$ est inadmissible.', correct: true, explanation: 'Domination stricte uniforme (Déf. 1.4).' },
          { text: '$S_n^2$ est meilleur car sans biais.', correct: false, explanation: 'Sans biais $\\ne$ meilleur pour le risque quadratique.' },
          { text: 'Les risques se croisent : on ne peut pas conclure.', correct: false, explanation: 'Les deux risques sont proportionnels à $\\sigma^4$ ; l’écart a un signe constant.' },
        ],
      },
    ],
    conclusion: 'On peut faire encore mieux avec $\\frac1{n+1}\\sum_i(X_i-\\bar X_n)^2$ (risque $\\frac{2\\sigma^4}{n+1}$, optimum de la famille $c\\,S_n^2$) : voir la visualisation « biais-variance ».',
  },
  {
    id: 'ch3-etape-lineaire-sans-contrainte',
    type: 'etape-suivante',
    title: 'PC3 Ex. 4 Q2 — meilleur estimateur linéaire sans contrainte de biais',
    source: 'PC3 Ex. 4 Q2 ; Poly ch.3, Exercice 4',
    origin: 'pc',
    difficulty: 2,
    tags: ['risque', 'biais', 'optimisation'],
    setup: 'Translation-échelle, $\\mathbb{E}_\\theta[X_k]=\\theta$, $\\mathrm{Var}_\\theta(X_k)=\\sigma^2$ ; $R(\\theta,\\sum_ka_kX_k)=\\theta^2(\\sum_ka_k-1)^2+\\sigma^2\\sum_ka_k^2$ à minimiser sur $\\mathbb{R}^n$. La condition du premier ordre s’écrit $2\\theta^2(\\sum_ka_k-1)+2\\sigma^2a_i=0$ pour tout $i$.',
    steps: [
      {
        prompt: 'Étape 1 — Pourquoi le point critique est-il le minimum ?',
        choices: [
          { text: 'La hessienne $2\\sigma^2I+2\\theta^2\\mathbf{1}\\mathbf{1}^\\top$ est définie positive : fonction strictement convexe.', correct: true, explanation: '$u^\\top Hu=2\\sigma^2\\lVert u\\rVert^2+2\\theta^2(\\sum u_k)^2\\ge2\\sigma^2\\lVert u\\rVert^2>0$.' },
          { text: 'Par Cauchy-Schwarz, comme pour l’estimateur sans biais.', correct: false, explanation: 'Cauchy-Schwarz sert sous la contrainte $\\sum a_k=1$ (Q1) ; ici il n’y a pas de contrainte.' },
          { text: 'Parce que le risque est positif.', correct: false, explanation: 'La positivité ne garantit ni l’unicité ni que le point critique soit le minimum.' },
        ],
      },
      {
        prompt: 'Étape 2 — Étape suivante pour résoudre le système :',
        choices: [
          { text: 'Sommer les $n$ équations : $n\\theta^2(\\sum_ka_k-1)+\\sigma^2\\sum_ka_k=0$, d’où $\\sum_ka_k=\\frac{n\\theta^2}{\\sigma^2+n\\theta^2}$.', correct: true, explanation: 'Astuce du corrigé : on obtient d’abord la somme, puis chaque $a_i$.' },
          { text: 'Poser $a_i=1/n$.', correct: false, explanation: 'C’est la solution **sans biais** (Q1), qui ne vérifie pas la condition du premier ordre sans contrainte.' },
          { text: 'Dériver une seconde fois.', correct: false, explanation: 'La dérivée seconde sert à la convexité (étape 1), pas à résoudre le système.' },
        ],
      },
      {
        prompt: 'Étape 3 — Poids optimaux et risque minimal :',
        choices: [
          { text: '$a_i=\\frac{\\theta^2}{\\sigma^2+n\\theta^2}$, risque $\\frac{\\sigma^2\\theta^2}{\\sigma^2+n\\theta^2}<\\frac{\\sigma^2}n$', correct: true, explanation: 'Réinjection dans l’équation ; mais ces poids **dépendent de $\\theta$** : c’est une borne inférieure, pas un estimateur.' },
          { text: '$a_i=\\frac1{n+1}$, risque $\\frac{\\sigma^2}{n+1}$', correct: false, explanation: 'C’est le cas de PC3 Ex. 5 où $\\sigma^2=\\theta^2$ ; ici $\\sigma$ est fixe.' },
          { text: '$a_i=\\frac1n$, risque $\\frac{\\sigma^2}n$', correct: false, explanation: 'Optimum sous contrainte d’absence de biais, strictement moins bon.' },
        ],
      },
    ],
    conclusion: 'Classe plus grande ⇒ optimum plus bas ; le facteur $\\frac{\\theta^2}{\\theta^2+\\sigma^2/n}<1$ est un **rétrécissement** de $\\bar X_n$ vers $0$.',
  },
  // ------------------------------------------------------------------ Associer
  {
    id: 'ch3-assoc-fisher',
    type: 'associer',
    title: 'Modèle ↔ information de Fisher d’une observation',
    source: 'Poly ch.3, Ex. 1.13–1.15, 1.19 ; PC7 Ex. 2 Q4',
    origin: 'poly',
    difficulty: 1,
    tags: ['fisher', 'cours'],
    prompt: 'Associer chaque modèle (une observation) à son information de Fisher $\\mathbb{I}_1(\\theta)$.',
    pairs: [
      { left: '$\\mathcal{E}(\\theta)$, densité $\\theta e^{-\\theta x}$', right: '$1/\\theta^2$', explanation: 'Ex. 1.13 : $\\mathrm{Var}_\\theta(1/\\theta-X)=1/\\theta^2$.' },
      { left: '$\\mathcal{P}\\mathrm{oi}(\\theta)$', right: '$1/\\theta$', explanation: 'Ex. 1.14 : $\\mathrm{Var}_\\theta(X)/\\theta^2$.' },
      { left: '$\\mathcal{B}\\mathrm{er}(\\theta)$', right: '$\\frac1{\\theta(1-\\theta)}$', explanation: 'Ex. 1.15 par la dérivée seconde.' },
      { left: '$\\mathcal{N}(\\theta,\\sigma_0^2)$, $\\sigma_0^2$ connue', right: '$1/\\sigma_0^2$', explanation: 'Ex. 1.19 : dérivée seconde constante $-1/\\sigma_0^2$.' },
      { left: '$\\Gamma(2,\\theta)$ (intensité)', right: '$2/\\theta^2$', explanation: 'PC7 Ex. 2 : $\\ddot\\ell=-2/\\theta^2$.' },
    ],
  },
  {
    id: 'ch3-assoc-risques-uniforme',
    type: 'associer',
    title: 'PC3 Ex. 1 — estimateur de θ (uniforme) ↔ risque / θ²',
    source: 'PC3 Ex. 1 Q4–Q5 ; Poly ch.3, Ex. 1.9',
    origin: 'pc',
    difficulty: 2,
    tags: ['risque', 'admissibilite', 'uniforme'],
    prompt: '$n$-échantillon de $\\mathcal{U}([0,\\theta])$. Associer chaque estimateur à $R(\\theta,T)/\\theta^2$.',
    pairs: [
      { left: '$\\frac2n\\sum_kX_k$', right: '$\\frac1{3n}$', explanation: 'Sans biais, $\\mathrm{Var}(2X_1)/n=\\frac4n\\cdot\\frac{\\theta^2}{12}$.' },
      { left: '$X_{n:n}$ (EMV)', right: '$\\frac2{(n+1)(n+2)}$', explanation: 'Trinôme avec $a=1$.' },
      { left: '$\\frac{n+1}nX_{n:n}$', right: '$\\frac1{n(n+2)}$', explanation: 'Sans biais, variance $\\frac{(n+1)^2}{n(n+2)}\\theta^2-\\theta^2$.' },
      { left: '$\\frac{n+2}{n+1}X_{n:n}$', right: '$\\frac1{(n+1)^2}$', explanation: 'Minimum du trinôme : domine les trois autres.' },
    ],
  },
  {
    id: 'ch3-assoc-notions',
    type: 'associer',
    title: 'Notion ↔ définition',
    source: 'Poly ch.3, Déf. 1.1, 1.4, 1.5, 1.6, 1.9, 1.10',
    origin: 'poly',
    difficulty: 1,
    tags: ['cours', 'definitions'],
    prompt: 'Associer chaque notion du chapitre à sa définition.',
    pairs: [
      { left: 'Estimateur sans biais', right: '$\\mathbb{E}_\\theta[T(Z)]=g(\\theta)$ pour tout $\\theta\\in\\Theta$', explanation: 'Déf. 1.1.' },
      { left: 'Estimateur inadmissible', right: 'Il existe $T^*$ de risque $\\le$ partout et $<$ en au moins un $\\theta$', explanation: 'Déf. 1.4.' },
      { left: 'E.S.B.V.M.', right: 'Sans biais, de variance $\\le$ celle de tout sans biais, pour tout $\\theta$', explanation: 'Déf. 1.5.' },
      { left: 'Estimateur efficace', right: 'Sans biais, régulier, de variance égale à la borne de Cramér-Rao pour tout $\\theta$', explanation: 'Déf. 1.10.' },
      { left: 'Estimateur régulier', right: 'De carré intégrable, avec $\\nabla_\\theta\\mathbb{E}_\\theta[T]=\\int T\\nabla_\\theta p_\\theta\\,\\mathrm{d}\\mu$', explanation: 'Déf. 1.9.' },
      { left: 'Modèle régulier', right: '$\\Theta$ ouvert, $\\theta\\mapsto p_\\theta(z)$ de classe $C^2$, dominations locales, $\\mathbb{E}_\\theta[\\mathrm{H}_\\ell]$ inversible', explanation: 'Déf. 1.6.' },
    ],
  },
  // ------------------------------------------------------------------ Numériques
  {
    id: 'ch3-num-ecart-risques',
    type: 'numerique',
    title: 'Ex. 1.8 — écart de risque entre S²ₙ et σ̂²ₙ',
    source: 'Poly ch.3, Ex. 1.8',
    origin: 'poly',
    difficulty: 1,
    tags: ['risque', 'admissibilite'],
    question: 'Modèle gaussien, $n=10$, $\\sigma^2=1$. Calculer $R(\\theta,S_n^2)-R(\\theta,\\hat\\sigma_n^2)$.',
    answer: 29 / 900,
    tolerance: 0.0005,
    hint: 'Arrondir à 0,001.',
    explanation: '$\\frac{(3n-1)\\sigma^4}{(n-1)n^2}=\\frac{29}{9\\times100}\\approx0{,}0322$ ; vérification : $\\frac{2}{9}\\approx0{,}2222$ contre $\\frac{19}{100}=0{,}19$.',
  },
  {
    id: 'ch3-num-borne-beta1',
    type: 'numerique',
    title: 'PC3 Ex. 2 — borne pour β₁ avec x = (0, 1, 2)',
    source: 'PC3 Ex. 2 Q2 (exemple numérique du corrigé étendu)',
    origin: 'pc',
    difficulty: 2,
    tags: ['cramer-rao', 'multidimensionnel', 'regression'],
    question: 'Régression gaussienne avec $n=3$, $\\mathbf{x}=(0,1,2)^\\top$, $\\sigma^2=1$. Calculer la borne de Cramér-Rao pour un estimateur sans biais régulier de $\\beta_1$ ($\\beta_2$ inconnu).',
    answer: 5 / 6,
    tolerance: 0.005,
    hint: 'Arrondir à 0,01 ; $\\mathbb{I}=\\mathbf{X}^\\top\\mathbf{X}/\\sigma^2$.',
    explanation: '$\\mathbb{I}=\\begin{pmatrix}3&3\\\\3&5\\end{pmatrix}$, déterminant $6$, $\\mathbb{I}^{-1}=\\frac16\\begin{pmatrix}5&-3\\\\-3&3\\end{pmatrix}$ : borne $[\\mathbb{I}^{-1}]_{11}=5/6\\approx0{,}833$ (contre $1/3$ si $\\beta_2$ est connu).',
  },
  {
    id: 'ch3-num-tau',
    type: 'numerique',
    title: 'PC3 Ex. 3 Q6 — valeur de τ₁₀(1)',
    source: 'PC3 Ex. 3 Q6 (résultats numériques)',
    origin: 'pc',
    difficulty: 2,
    tags: ['cramer-rao', 'non-regulier', 'uniforme'],
    question: 'Calculer $\\tau_{10}(1)=\\frac{1}{(1-1/10)^{-10}-1}$.',
    answer: 0.5354,
    tolerance: 0.003,
    hint: 'Arrondir à 0,001 ; $(0{,}9)^{-10}\\approx2{,}868$.',
    explanation: '$(0{,}9)^{-10}\\approx2{,}8680$, donc $\\tau_{10}(1)\\approx1/1{,}868\\approx0{,}535$ : pour $\\theta=1$, $\\mathrm{Var}(T)\\ge0{,}00535$, contre $\\mathrm{Var}(\\frac{11}{10}X_{10:10})=1/120\\approx0{,}00833$.',
  },
  {
    id: 'ch3-num-cr-exp',
    type: 'numerique',
    title: 'Examen 2025 Ex. 1 Q1 — valeur de la borne',
    source: 'Examen 2025 Ex. 1 Q1 (application numérique, variante)',
    origin: 'variante',
    difficulty: 1,
    tags: ['cramer-rao', 'exponentielle'],
    question: 'Modèle $p_\\theta(x)=\\theta e^{-\\theta x}$, $n=50$, $\\theta=2$. Quelle est la borne de Cramér-Rao pour la variance d’un estimateur sans biais régulier de $\\theta$ ?',
    answer: 0.08,
    tolerance: 0.001,
    hint: 'Arrondir à 0,001.',
    explanation: '$\\mathbb{I}(\\theta)=n/\\theta^2=12{,}5$, borne $\\theta^2/n=4/50=0{,}08$. L’estimateur sans biais $\\frac{n-1}{n\\bar X_n}$ a pour variance $\\theta^2/(n-2)\\approx0{,}0833$ : proche mais au-dessus.',
  },
  // ------------------------------------------------------------------ Annales
  {
    id: 'ch3-annale-2025-ex1',
    type: 'annale',
    title: 'Examen 2025 Ex. 1 Q1 — Cramér-Rao dans le modèle exponentiel (et prolongements)',
    source: 'Examen 2025 Ex. 1 Q1 ; prolongements Q(b)–Q(c) : variante',
    origin: 'annale',
    difficulty: 2,
    tags: ['cramer-rao', 'fisher', 'efficacite', 'cours'],
    durationMin: 15,
    statement: `On considère un $n$-échantillon du modèle $\\big(\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}_+),\\{p_\\theta\\cdot\\mathrm{Leb},\\ \\theta>0\\}\\big)$ avec $p_\\theta(x)=\\theta e^{-\\theta x}$. On admet que le modèle est régulier.

**(a)** (Examen 2025, Q1) Donner la borne de Cramér-Rao pour un estimateur régulier sans biais de $\\theta$.

**(b)** (prolongement) On rappelle que $\\sum_iX_i\\sim\\Gamma(n,\\theta)$. Calculer l’espérance de l’EMV $\\hat\\theta_n=1/\\bar X_n$. La borne de (a) s’applique-t-elle à $\\hat\\theta_n$ ?

**(c)** (prolongement) Montrer que $T_n=\\frac{n-1}{n\\bar X_n}$ ($n\\ge3$) est sans biais et calculer sa variance. Est-il efficace ?`,
    hints: [
      '(a) Schéma : log-densité, score, vérifier qu’il est centré, information par la variance du score ou la dérivée seconde, additivité, Cor. 1.3.',
      '(b) Pour $S\\sim\\Gamma(n,\\theta)$, $\\mathbb{E}[S^{-1}]=\\frac{\\theta}{n-1}$ et $\\mathbb{E}[S^{-2}]=\\frac{\\theta^2}{(n-1)(n-2)}$ (reconnaître une densité Gamma).',
      '(c) $T_n=(n-1)/S$ ; comparer $\\mathrm{Var}_\\theta(T_n)$ à $\\theta^2/n$ et conclure avec la Déf. 1.10.',
    ],
    correction: `**(a)** La log-densité d’une observation est $\\ell_1(\\theta,x)=\\log\\theta-\\theta x$ ($x>0$), le score $S(\\theta,x)=\\frac1\\theta-x$, d’espérance nulle puisque $\\mathbb{E}_\\theta[X]=1/\\theta$. L’information d’une observation vaut (Déf. 1.8) $\\mathbb{I}_1(\\theta)=\\mathrm{Var}_\\theta(S(\\theta,X))=\\mathrm{Var}_\\theta(X)=1/\\theta^2$ (ou, par la Prop. 1.2 (ii), $-\\mathbb{E}_\\theta[\\partial_\\theta^2\\ell_1]=1/\\theta^2$). Les observations étant indépendantes, l’information du $n$-échantillon est $\\mathbb{I}(\\theta)=n/\\theta^2$ (Prop. 1.2 (iii)). Le modèle étant régulier, le Cor. 1.3 (avec $g(\\theta)=\\theta$, $g'=1$) donne, pour tout estimateur $T$ **sans biais et régulier** de $\\theta$ :

$$\\mathbb{E}_\\theta[(T-\\theta)^2]=\\mathrm{Var}_\\theta(T)\\ \\ge\\ \\frac1{\\mathbb{I}(\\theta)}=\\frac{\\theta^2}n,$$

la première égalité par la décomposition biais-variance (Prop. 1.1) avec un biais nul.

**(b)** Avec $S=\\sum_iX_i\\sim\\Gamma(n,\\theta)$ : $\\mathbb{E}_\\theta[S^{-1}]=\\int_0^\\infty\\frac1x\\frac{\\theta^nx^{n-1}e^{-\\theta x}}{\\Gamma(n)}\\,\\mathrm{d}x=\\frac{\\theta^n}{\\Gamma(n)}\\cdot\\frac{\\Gamma(n-1)}{\\theta^{n-1}}=\\frac\\theta{n-1}$, donc $\\mathbb{E}_\\theta[\\hat\\theta_n]=\\frac n{n-1}\\theta$ : l’EMV est **biaisé** (biais $\\frac\\theta{n-1}$). La borne de (a), qui porte sur les estimateurs sans biais de $\\theta$, ne s’applique pas à lui directement ; il l’atteint seulement asymptotiquement ($\\sqrt n(\\hat\\theta_n-\\theta)\\Rightarrow\\mathcal{N}(0,\\theta^2)$, ch.6 Ex. 1.7, efficacité asymptotique de l’EMV, ch.7).

**(c)** $\\mathbb{E}_\\theta[T_n]=(n-1)\\mathbb{E}_\\theta[S^{-1}]=\\theta$ : sans biais. De même $\\mathbb{E}_\\theta[S^{-2}]=\\frac{\\theta^2}{(n-1)(n-2)}$, d’où $\\mathbb{E}_\\theta[T_n^2]=\\frac{(n-1)\\theta^2}{n-2}$ et

$$\\mathrm{Var}_\\theta(T_n)=\\theta^2\\Big(\\frac{n-1}{n-2}-1\\Big)=\\frac{\\theta^2}{n-2}>\\frac{\\theta^2}n.$$

La borne n’est pas atteinte : $T_n$ n’est **pas efficace** (Déf. 1.10). Ce n’est pas une faiblesse de $T_n$ : la densité s’écrit $\\theta e^{-\\theta x}$, famille exponentielle en la statistique $x$ dont la moyenne est $1/\\theta$ ; un estimateur efficace existe pour $1/\\theta$ ($\\bar X_n$, de variance $\\frac1{n\\theta^2}$ = borne $\\frac{g'(\\theta)^2}{n\\mathbb{I}_1}$ avec $g(\\theta)=1/\\theta$), pas pour $\\theta$ (Thm 4.1, compléments).`,
    bareme: [
      { label: '(a) score, information, additivité', points: 0.5 },
      { label: '(a) énoncé de la borne avec ses hypothèses', points: 0.5 },
      { label: '(b) biais de l’EMV et non-applicabilité', points: 0.5 },
      { label: '(c) variance de Tₙ et conclusion', points: 0.5 },
    ],
  },
  {
    id: 'ch3-annale-cc2022-ex2',
    type: 'annale',
    title: 'CC 2022 Ex. 2 Q2–Q4 — biais, risque et admissibilité de deux estimateurs de μ²',
    source: 'CC MAP433 2022 Ex. 2 Q2–Q4',
    origin: 'annale',
    difficulty: 2,
    tags: ['biais', 'risque', 'admissibilite'],
    durationMin: 25,
    statement: `$X_1,\\dots,X_n$ i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$, $\\theta=(\\mu,\\sigma^2)$, $n\\ge2$. On estime $\\mu^2$ par $T_{1,n}=\\bar X_n^2$ et $T_{2,n}=\\bar X_n^2-\\frac1nS_n^2$, avec $S_n^2=\\frac1{n-1}\\sum_i(X_i-\\bar X_n)^2$. Rappels : $\\mathbb{E}[G^4]=3$ pour $G\\sim\\mathcal{N}(0,1)$ ; théorème de Gosset.

**Q2.** Calculer le biais et le risque quadratique de $T_{1,n}$.

**Q3.** Calculer le biais et le risque quadratique de $T_{2,n}$.

**Q4.** L’estimateur $T_{1,n}$ est-il admissible pour le risque quadratique ?`,
    hints: [
      'Écrire $\\bar X_n=\\mu+\\frac\\sigma{\\sqrt n}G$ avec $G\\sim\\mathcal{N}(0,1)$, puis $\\bar X_n^2-\\mu^2=(\\bar X_n-\\mu)^2+2\\mu(\\bar X_n-\\mu)$.',
      'Q3 : $\\bar X_n$ et $S_n^2$ sont indépendants (Gosset) et $\\mathrm{Var}(S_n^2)=\\frac{2\\sigma^4}{n-1}$ ; $\\mathrm{Var}(\\bar X_n^2)=\\mathbb{E}[\\bar X_n^4]-(\\mu^2+\\sigma^2/n)^2$.',
      'Q4 : étudier le signe de $R(\\theta,T_{1,n})-R(\\theta,T_{2,n})$ pour tout $\\theta$, selon $n$.',
    ],
    correction: `**Q2.** Par Gosset, $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$ : $\\mathbb{E}_\\theta[\\bar X_n^2]=\\mathrm{Var}_\\theta(\\bar X_n)+\\mu^2=\\mu^2+\\frac{\\sigma^2}n$, donc $b(\\theta,T_{1,n})=\\frac{\\sigma^2}n$ (Déf. 1.1). Pour le risque, $\\bar X_n^2-\\mu^2=(\\bar X_n-\\mu)^2+2\\mu(\\bar X_n-\\mu)$ ; en développant le carré, le terme croisé fait intervenir $\\mathbb{E}[(\\bar X_n-\\mu)^3]=0$ (symétrie), d’où

$$R(\\theta,T_{1,n})=\\mathbb{E}_\\theta[(\\bar X_n-\\mu)^4]+4\\mu^2\\mathbb{E}_\\theta[(\\bar X_n-\\mu)^2]=3\\frac{\\sigma^4}{n^2}+4\\mu^2\\frac{\\sigma^2}n,$$

avec $\\mathbb{E}[(\\bar X_n-\\mu)^4]=\\frac{\\sigma^4}{n^2}\\mathbb{E}[G^4]$.

**Q3.** Par linéarité et $\\mathbb{E}_\\theta[S_n^2]=\\sigma^2$ (Ex. 1.4) : $\\mathbb{E}_\\theta[T_{2,n}]=\\mu^2+\\frac{\\sigma^2}n-\\frac{\\sigma^2}n=\\mu^2$ : $T_{2,n}$ est **sans biais**, donc $R(\\theta,T_{2,n})=\\mathrm{Var}_\\theta(T_{2,n})$ (Prop. 1.1). Par Gosset, $\\bar X_n$ et $S_n^2$ sont indépendants, donc $\\mathrm{Var}_\\theta(T_{2,n})=\\mathrm{Var}_\\theta(\\bar X_n^2)+\\frac1{n^2}\\mathrm{Var}_\\theta(S_n^2)$. Avec $\\mathrm{Var}_\\theta(\\bar X_n^2)=R(\\theta,T_{1,n})-b(\\theta,T_{1,n})^2=4\\mu^2\\frac{\\sigma^2}n+2\\frac{\\sigma^4}{n^2}$ et $\\mathrm{Var}_\\theta(S_n^2)=\\frac{2\\sigma^4}{n-1}$ (car $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$) :

$$R(\\theta,T_{2,n})=4\\mu^2\\frac{\\sigma^2}n+2\\frac{\\sigma^4}{n^2}+\\frac{2\\sigma^4}{n^2(n-1)}.$$

(Le corrigé officiel omet ce risque.)

**Q4.** Pour tout $\\theta$,

$$R(\\theta,T_{1,n})-R(\\theta,T_{2,n})=\\frac{\\sigma^4}{n^2}\\Big(1-\\frac2{n-1}\\Big)=\\frac{\\sigma^4}{n^2}\\cdot\\frac{n-3}{n-1}.$$

Pour $n\\ge4$, cette différence est **strictement positive pour tout** $\\theta=(\\mu,\\sigma^2)$ : $T_{2,n}$ a un risque inférieur partout et strictement inférieur quelque part, donc $T_{1,n}$ est **inadmissible** (Déf. 1.4). Pour $n=3$ les deux risques sont égaux ; pour $n=2$, $T_{1,n}$ est meilleur que $T_{2,n}$ (on ne peut pas conclure à l’inadmissibilité avec ce seul concurrent). (Question non traitée dans le corrigé officiel.)`,
    bareme: [
      { label: 'Q2 biais et risque de T₁ (moment d’ordre 4)', points: 0.75 },
      { label: 'Q3 absence de biais et risque de T₂ (indépendance de Gosset)', points: 0.75 },
      { label: 'Q4 comparaison uniforme et conclusion selon n', points: 0.5 },
    ],
  },
  {
    id: 'ch3-annale-2025-ex2-q3q4',
    type: 'annale',
    title: 'Examen 2025 Ex. 2 Q3–Q4 — biais et variance des EMV du modèle log-normal',
    source: 'Examen 2025 Ex. 2 Q3–Q4 (et lien Ex. 1.8)',
    origin: 'annale',
    difficulty: 1,
    tags: ['biais', 'risque', 'efficacite', 'admissibilite'],
    durationMin: 15,
    statement: `$n$-échantillon de la loi log-normale $LN(\\mu,\\sigma^2)$, $\\theta=(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*$ ; on note $Y_i=\\ln X_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$. On a obtenu (Q2) $\\hat\\mu_{ML}=\\bar Y_n$ et $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2$.

**Q3.** Calculer le biais et la variance de $\\hat\\mu_{ML}$.

**Q4.** Calculer le biais et la variance de $\\widehat{\\sigma^2}_{ML}$.

**(Prolongement)** Comparer le risque quadratique de $\\widehat{\\sigma^2}_{ML}$ à celui de l’estimateur sans biais $S_n^2$. Que dire de $\\hat\\mu_{ML}$ au regard de la borne de Cramér-Rao pour $\\mu$ ?`,
    hints: [
      'Gosset (ch.1, Thm 1.3) : $\\bar Y_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$ et $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$.',
      '$\\widehat{\\sigma^2}_{ML}=\\frac{n-1}nS_n^2$ ; un $\\chi^2(k)$ a pour espérance $k$ et variance $2k$.',
      'Information de $\\mathcal{N}(\\mu,\\sigma^2)$ pour $\\mu$ : $1/\\sigma^2$ par observation.',
    ],
    correction: `**Q3.** Les $Y_i$ sont i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$ (modèle induit), donc par Gosset $\\hat\\mu_{ML}=\\bar Y_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$ : biais $b(\\theta,\\hat\\mu_{ML})=0$ et $\\mathrm{Var}_\\theta(\\hat\\mu_{ML})=\\sigma^2/n$.

**Q4.** Par Gosset, $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$, d’espérance $n-1$ et de variance $2(n-1)$. Comme $\\widehat{\\sigma^2}_{ML}=\\frac{n-1}nS_n^2=\\frac{\\sigma^2}n\\cdot\\frac{(n-1)S_n^2}{\\sigma^2}$ :

$$\\mathbb{E}_\\theta[\\widehat{\\sigma^2}_{ML}]=\\frac{n-1}n\\sigma^2,\\quad b(\\theta,\\widehat{\\sigma^2}_{ML})=-\\frac{\\sigma^2}n,\\quad\\mathrm{Var}_\\theta(\\widehat{\\sigma^2}_{ML})=\\frac{\\sigma^4}{n^2}\\,2(n-1)=\\frac{2(n-1)\\sigma^4}{n^2}.$$

L’EMV de la variance **sous-estime** $\\sigma^2$ (Ex. 1.4).

**Prolongement.** Par la Prop. 1.1, $R(\\theta,\\widehat{\\sigma^2}_{ML})=\\frac{2(n-1)\\sigma^4}{n^2}+\\frac{\\sigma^4}{n^2}=\\frac{(2n-1)\\sigma^4}{n^2}$, tandis que $S_n^2$ est sans biais de risque $\\mathrm{Var}_\\theta(S_n^2)=\\frac{2\\sigma^4}{n-1}$. La différence vaut $\\frac{(3n-1)\\sigma^4}{(n-1)n^2}>0$ pour tout $\\theta$ (Ex. 1.8) : l’estimateur sans biais $S_n^2$ est **inadmissible** pour le risque quadratique, l’EMV biaisé fait mieux partout. Pour $\\mu$ : le modèle gaussien est régulier, $\\mathbb{I}_1$ pour le paramètre $\\mu$ vaut $1/\\sigma^2$ (Ex. 1.19 ; dans le modèle à deux paramètres, $\\mathbb{I}(\\mu,\\sigma^2)=\\mathrm{diag}(1/\\sigma^2,1/(2\\sigma^4))$ et $[\\mathbb{I}^{-1}]_{11}=\\sigma^2$), d’où la borne $\\sigma^2/n$ (Thm 1.1 avec $\\nabla g=(1,0)^\\top$) : $\\hat\\mu_{ML}$, sans biais, l’**atteint** pour tout $\\theta$ : il est **efficace**, donc E.S.B.V.M.`,
    bareme: [
      { label: 'Q3 loi de Ȳₙ, biais, variance', points: 0.5 },
      { label: 'Q4 biais et variance via le khi-deux', points: 0.5 },
      { label: 'Prolongement : comparaison des risques, efficacité', points: 0.5 },
    ],
  },
  {
    id: 'ch3-annale-pc3-ex1',
    type: 'annale',
    title: 'PC3 Ex. 1 — modèle uniforme : estimateurs sans biais et admissibilité',
    source: 'PC3 Ex. 1 Q1–Q5 ; Poly ch.3, Exercice 1',
    origin: 'pc',
    difficulty: 2,
    tags: ['biais', 'risque', 'admissibilite', 'uniforme'],
    durationMin: 30,
    statement: `$Z=(X_1,\\dots,X_n)$ $n$-échantillon de $\\big(\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}_+),\\{\\mathcal{U}([0,\\theta]),\\ \\theta>0\\}\\big)$.

**Q1.** Calculer l’EMV de $\\theta$.

Soit $g:\\mathbb{R}_+^*\\to\\mathbb{R}$ différentiable avec $\\lim_{\\theta\\to0^+}\\theta g(\\theta)=0$.

**Q2.** Peut-on choisir $T$ pour que $\\hat\\theta_n^{(1)}=n^{-1}\\sum_iT(X_i)$ soit sans biais de $g(\\theta)$ ?

**Q3.** Montrer qu’on peut choisir $\\tilde T$ pour que $\\hat\\theta_n^{(2)}=\\tilde T(X_{n:n})$ soit sans biais de $g(\\theta)$.

Dans la suite $g(\\theta)=\\theta$.

**Q4.** Comparer les risques quadratiques de $\\hat\\theta_n^{(1)}$ et $\\hat\\theta_n^{(2)}$ ; montrer que $\\hat\\theta_n^{(1)}$ est inadmissible pour $n>1$.

**Q5.** Pour $a>0$, calculer le risque de $\\hat\\theta_{n,a}^{(3)}=aX_{n:n}$ ; montrer que $\\hat\\theta_n^{(2)}$ est inadmissible.`,
    hints: [
      'Q1 : la vraisemblance vaut $\\theta^{-n}\\mathbb{1}_{X_{n:n}\\le\\theta}$ ; ne pas annuler le score. Q2 : écrire $\\int_0^\\theta T(x)\\,\\mathrm{d}x=\\theta g(\\theta)$.',
      'Q3 : densité de $X_{n:n}$ : $nx^{n-1}/\\theta^n$ sur $[0,\\theta]$ ; identifier une primitive de $\\tilde T(x)x^{n-1}$ nulle en 0.',
      'Q5 : $\\mathbb{E}_\\theta[X_{n:n}]=\\frac n{n+1}\\theta$, $\\mathbb{E}_\\theta[X_{n:n}^2]=\\frac n{n+2}\\theta^2$ ; minimiser un trinôme en $a$.',
    ],
    correction: `**Q1.** La vraisemblance est $\\theta\\mapsto\\theta^{-n}\\prod_i\\mathbb{1}_{[0,\\theta]}(X_i)=\\theta^{-n}\\mathbb{1}_{X_{n:n}\\le\\theta}$ : nulle sur $]0,X_{n:n}[$, strictement décroissante sur $[X_{n:n},+\\infty[$. Elle n’est pas dérivable en $X_{n:n}$ (on n’annule pas le score) ; son maximum est atteint en $\\hat\\theta_n^{\\mathrm{MV}}=X_{n:n}$.

**Q2.** Par linéarité et identité des lois, $\\mathbb{E}_\\theta[\\hat\\theta_n^{(1)}]=\\mathbb{E}_\\theta[T(X_1)]=\\theta^{-1}\\int_0^\\theta T(x)\\,\\mathrm{d}x$. L’absence de biais pour tout $\\theta>0$ équivaut à $\\int_0^\\theta T(x)\\,\\mathrm{d}x=\\theta g(\\theta)$ : $\\theta\\mapsto\\theta g(\\theta)$ doit être la primitive de $T$ nulle en $0$ (hypothèse $\\lim_{0^+}\\theta g(\\theta)=0$), d’où $T(x)=(xg(x))'=g(x)+xg'(x)$, qui convient. **Réponse : oui.**

**Q3.** $\\mathbb{P}_\\theta(X_{n:n}\\le x)=\\prod_i\\mathbb{P}_\\theta(X_i\\le x)=(x/\\theta)^n$ (indépendance, même loi), densité $nx^{n-1}\\theta^{-n}\\mathbb{1}_{[0,\\theta]}$. On veut $n\\theta^{-n}\\int_0^\\theta\\tilde T(x)x^{n-1}\\,\\mathrm{d}x=g(\\theta)$, i.e. $\\theta\\mapsto\\theta^ng(\\theta)/n$ primitive de $\\tilde T(x)x^{n-1}$ nulle en $0$ : $\\tilde T(x)=x^{1-n}(x^ng(x)/n)'=g(x)+\\frac xng'(x)$.

**Q4.** Avec $g(x)=x$ : $T(x)=2x$, $\\hat\\theta_n^{(1)}=\\frac2n\\sum_kX_k$, sans biais, donc (Prop. 1.1, indépendance) $R(\\theta,\\hat\\theta_n^{(1)})=\\frac1n\\mathrm{Var}_\\theta(2X_1)=\\frac4n\\cdot\\frac{\\theta^2}{12}=\\frac{\\theta^2}{3n}$. Et $\\tilde T(x)=(1+\\frac1n)x$, $\\hat\\theta_n^{(2)}=\\frac{n+1}nX_{n:n}$, sans biais, $R(\\theta,\\hat\\theta_n^{(2)})=\\frac{(n+1)^2}{n^2}\\frac{n\\theta^2}{n+2}-\\theta^2=\\frac{\\theta^2}{n(n+2)}$. Pour $n>1$, $n(n+2)>3n$, donc $R(\\theta,\\hat\\theta_n^{(2)})<R(\\theta,\\hat\\theta_n^{(1)})$ **pour tout** $\\theta>0$ : $\\hat\\theta_n^{(1)}$ est inadmissible (Déf. 1.4). (Pour $n=1$ les deux estimateurs coïncident.)

**Q5.** $R(\\theta,aX_{n:n})=a^2\\mathbb{E}_\\theta[X_{n:n}^2]-2a\\theta\\mathbb{E}_\\theta[X_{n:n}]+\\theta^2=\\theta^2\\big(\\frac{na^2}{n+2}-\\frac{2an}{n+1}+1\\big)$. Trinôme en $a$ de coefficient dominant $\\frac n{n+2}>0$, minimal en $a_\\star=\\frac{n+2}{n+1}$ quel que soit $\\theta$, de minimum $\\frac{\\theta^2}{(n+1)^2}$. Comme $(n+1)^2-n(n+2)=1>0$, $R(\\theta,a_\\star X_{n:n})<R(\\theta,\\hat\\theta_n^{(2)})$ pour tout $\\theta$ : $\\hat\\theta_n^{(2)}$ est **inadmissible** (et $\\hat\\theta_n^{(1)}$ aussi, par transitivité). L’estimateur dominant est biaisé (biais $-\\theta/(n+1)^2$) : sans biais $\\ne$ meilleur. Les risques fondés sur $X_{n:n}$ sont en $n^{-2}$ (modèle non régulier), celui de $\\hat\\theta_n^{(1)}$ en $n^{-1}$.`,
    bareme: [
      { label: 'Q1 EMV par étude directe', points: 0.5 },
      { label: 'Q2 primitive, réponse oui', points: 0.75 },
      { label: 'Q3 loi du maximum, T̃', points: 0.75 },
      { label: 'Q4 deux risques, inadmissibilité', points: 1 },
      { label: 'Q5 trinôme, a⋆, inadmissibilité', points: 1 },
    ],
  },
]
