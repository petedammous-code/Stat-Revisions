import type { Exercise } from '../types'

/** Étape suivante, associer, numériques, annales. */
export const exercisesPart2: Exercise[] = [
  // ------------------------------------------------------------------ Étape suivante
  {
    id: 'ch5-etape-exponentiel-pc5',
    type: 'etape-suivante',
    title: 'Test U.P.P. dans le modèle exponentiel de moyenne θ',
    source: 'PC5 Ex. 1 Q2–Q3 ; Poly ch.5, Exercice 1',
    origin: 'pc',
    difficulty: 2,
    tags: ['rvm', 'upp', 'gamma-chi2'],
    setup: '$n$-échantillon de densité $p_\\theta(x)=\\theta^{-1}e^{-x/\\theta}\\mathbb{1}_{\\mathbb{R}_+}(x)$, $\\theta>0$ ; $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$, niveau $\\alpha$.',
    steps: [
      {
        prompt: 'Étape 1 — Pour $0<\\theta_1<\\theta_2$, le rapport $p^n_{\\theta_2}(z)/p^n_{\\theta_1}(z)$ vaut :',
        choices: [
          { text: '$\\frac{\\theta_1^n}{\\theta_2^n}\\exp\\big((\\theta_1^{-1}-\\theta_2^{-1})\\sum_ix_i\\big)$ : strictement croissant en $\\sum_ix_i$.', correct: true, explanation: 'Factorisation (2) avec $T=\\sum_ix_i$, $\\psi(t;\\theta)=\\theta^{-n}e^{-t/\\theta}$ ; $\\theta_1^{-1}-\\theta_2^{-1}>0$.' },
          { text: '$\\frac{\\theta_2^n}{\\theta_1^n}\\exp\\big(-(\\theta_2-\\theta_1)\\sum_ix_i\\big)$ : strictement décroissant.', correct: false, explanation: 'C’est la formule pour la paramétrisation par l’**intensité** ($\\theta e^{-\\theta x}$), pas celle de l’énoncé.' },
          { text: '$\\exp\\big((\\theta_2-\\theta_1)\\sum_ix_i\\big)$ : strictement croissant.', correct: false, explanation: 'Oubli des facteurs $\\theta^{-n}$ et mauvaise dépendance en $\\theta$ (c’est $1/\\theta$ qui multiplie $x$).' },
        ],
      },
      {
        prompt: 'Étape 2 — Par le Th. 1.3, le test U.P.P.($\\alpha$) est :',
        choices: [
          { text: '$\\mathbb{1}_{\\{\\sum_iX_i>c\\}}$ avec $\\mathbb{P}_{\\theta_0}(\\sum_iX_i>c)=\\alpha$ (test pur : $\\sum_iX_i$ est à densité).', correct: true, explanation: 'Rapport croissant $\\Rightarrow$ rejet pour $T$ grand ; seuil calibré en $\\theta_0$.' },
          { text: '$\\mathbb{1}_{\\{\\sum_iX_i>c\\}}+\\gamma\\mathbb{1}_{\\{\\sum_iX_i=c\\}}$ avec $\\gamma\\in\\,]0,1[$ à déterminer.', correct: false, explanation: 'Inutile : $\\mathbb{P}_\\theta(\\sum_iX_i=c)=0$ (coquille du corrigé PC5 qui mentionne $(c,\\gamma)$).' },
          { text: '$\\mathbb{1}_{\\{\\sum_iX_i>c\\}}$ avec $\\mathbb{P}_{\\theta_1}(\\sum_iX_i>c)=1-\\alpha$.', correct: false, explanation: 'Seuil calculé sous l’alternative : erreur classique, le seuil se lit sous $\\mathbb{P}_{\\theta_0}$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Loi de $\\sum_iX_i$ sous $\\mathbb{P}_{\\theta_0}$ et seuil $c$ :',
        choices: [
          { text: '$\\sum_iX_i\\sim\\mathrm{Gamma}(n,\\theta_0^{-1})$, $2\\sum_iX_i/\\theta_0\\sim\\chi^2(2n)$, donc $c=\\frac{\\theta_0}2\\chi^2_{1-\\alpha}(2n)$.', correct: true, explanation: 'Additivité des lois Gamma (intensité $1/\\theta_0$), puis $\\chi^2(2n)=\\mathrm{Gamma}(n,1/2)$.' },
          { text: '$\\sum_iX_i\\sim\\chi^2(n)$, donc $c=\\chi^2_{1-\\alpha}(n)$.', correct: false, explanation: 'Confusion : une somme de $n$ exponentielles est une Gamma de forme $n$, soit (après normalisation) un $\\chi^2$ à $2n$ degrés.' },
          { text: '$\\sum_iX_i\\sim\\mathrm{Gamma}(n,\\theta_0)$, donc $c=\\chi^2_{1-\\alpha}(2n)/(2\\theta_0)$.', correct: false, explanation: 'Convention d’intensité mal appliquée : l’intensité est $1/\\theta_0$ ici ($\\theta$ est la moyenne).' },
        ],
      },
      {
        prompt: 'Étape 4 — Pourquoi la taille sur $H_0=\\{\\theta\\le\\theta_0\\}$ vaut-elle $\\alpha$ ?',
        choices: [
          { text: 'La fonction puissance est croissante (Lemme 2.1), donc $\\sup_{\\theta\\le\\theta_0}\\beta(\\theta)=\\beta(\\theta_0)=\\alpha$.', correct: true, explanation: 'Th. 1.3 (ii) ; explicitement $\\beta(\\theta)=\\mathbb{P}(\\chi^2(2n)>\\theta_0\\chi^2_{1-\\alpha}(2n)/\\theta)$, croissante.' },
          { text: 'Parce qu’on a vérifié la taille en chaque $\\theta\\le\\theta_0$ séparément.', correct: false, explanation: 'Inutile et non fait : c’est la monotonie qui donne le résultat d’un coup.' },
          { text: 'Parce que la puissance est constante sur $H_0$.', correct: false, explanation: 'Elle ne l’est pas : elle croît de $0$ à $\\alpha$ sur $]0,\\theta_0]$.' },
        ],
      },
    ],
    conclusion: 'Numérique : $n=10$, $\\theta_0=1$, $\\alpha=0{,}05$ : $\\chi^2_{0{,}95}(20)\\approx31{,}41$, $c\\approx15{,}705$, puissance en $\\theta=2$ : $\\approx0{,}735$. Même schéma que le CC 2022 Ex. 1 (Weibull, $T=\\sum_ix_i^c$).',
  },
  {
    id: 'ch5-etape-gauss-ex13',
    type: 'etape-suivante',
    title: 'Exemple 1.3 : test optimal et puissance',
    source: 'Poly ch.5, Ex. 1.3',
    origin: 'poly',
    difficulty: 1,
    tags: ['neyman-pearson', 'puissance'],
    setup: '$n$-échantillon $\\mathcal{N}(\\mu,\\sigma^2)$, $\\sigma$ connu ; $H_0:\\mu=0$ contre $H_1:\\mu=m>0$.',
    steps: [
      {
        prompt: 'Étape 1 — Le rapport de vraisemblance vaut :',
        choices: [
          { text: '$r(z)=\\exp\\big(\\frac{nm}{\\sigma^2}\\bar x_n-\\frac{nm^2}{2\\sigma^2}\\big)$', correct: true, explanation: 'Développement de $\\sum(x_i-m)^2-\\sum x_i^2=-2m\\sum x_i+nm^2$.' },
          { text: '$r(z)=\\exp\\big(\\frac{m}{\\sigma^2}\\bar x_n-\\frac{m^2}{2\\sigma^2}\\big)$', correct: false, explanation: 'Oubli du facteur $n$ (densité produit).' },
          { text: '$r(z)=\\exp\\big(-\\frac{nm}{\\sigma^2}\\bar x_n+\\frac{nm^2}{2\\sigma^2}\\big)$', correct: false, explanation: 'Erreur de signe : c’est $p_0/p_m$, le rapport inversé.' },
        ],
      },
      {
        prompt: 'Étape 2 — Le test U.P.P.($\\alpha$) est :',
        choices: [
          { text: '$\\mathbb{1}_{\\{\\bar X_n>z_{1-\\alpha}\\sigma/\\sqrt n\\}}$', correct: true, explanation: 'Rapport croissant en $\\bar x_n$ ; sous $\\mathbb{P}_0$, $\\sqrt n\\bar X_n/\\sigma\\sim\\mathcal{N}(0,1)$.' },
          { text: '$\\mathbb{1}_{\\{\\bar X_n>z_{1-\\alpha}\\sigma\\}}$', correct: false, explanation: 'Oubli du $\\sqrt n$ : la variance de $\\bar X_n$ est $\\sigma^2/n$.' },
          { text: '$\\mathbb{1}_{\\{|\\bar X_n|>z_{1-\\alpha/2}\\sigma/\\sqrt n\\}}$', correct: false, explanation: 'Test bilatéral : de niveau $\\alpha$ mais pas optimal contre l’alternative $m>0$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Sa puissance en $m$ vaut :',
        choices: [
          { text: '$1-\\Phi\\big(z_{1-\\alpha}-\\sqrt n\\,m/\\sigma\\big)$', correct: true, explanation: 'Sous $\\mathbb{P}_m$, $\\sqrt n(\\bar X_n-m)/\\sigma\\sim\\mathcal{N}(0,1)$ ; croît avec $n$ et $m$.' },
          { text: '$1-\\Phi\\big(z_{1-\\alpha}+\\sqrt n\\,m/\\sigma\\big)$', correct: false, explanation: 'Erreur de signe : cette quantité décroît avec $m$ et vaut moins que $\\alpha$.' },
          { text: '$\\Phi\\big(z_{1-\\alpha}-\\sqrt n\\,m/\\sigma\\big)$', correct: false, explanation: 'C’est le risque de 2e espèce $1-\\beta$, pas la puissance.' },
        ],
      },
    ],
    conclusion: 'Pour $\\sigma=1$, $m=1$, $\\alpha=0{,}05$ : $n=1$ donne $\\approx0{,}26$, $n=5$ donne $\\approx0{,}72$, $n=10$ donne $\\approx0{,}94$ (figure p. 18). Le seuil ne dépend pas de $m$ : test U.P.P. pour $\\mu>0$.',
  },
  {
    id: 'ch5-etape-exam2025-q2',
    type: 'etape-suivante',
    title: 'Examen 2025 Ex. 1 Q2 pas à pas',
    source: 'Examen 2025 Ex. 1 Q2 (solution proposée DIAGNOSTIC §2.A)',
    origin: 'annale',
    difficulty: 2,
    tags: ['neyman-pearson', 'convention-intensite', 'gamma-chi2'],
    setup: '$n$-échantillon de $p_\\theta(x)=\\theta e^{-\\theta x}\\mathbb{1}_{\\mathbb{R}_+}(x)$ ; test de Neyman-Pearson de niveau $\\alpha$ de $H_0:\\theta=\\theta_0$ contre $H_1:\\theta=\\theta_1$, $\\theta_1>\\theta_0$.',
    steps: [
      {
        prompt: 'Étape 1 — Région $\\{r(Z)>c_\\alpha\\}$ en fonction de $T(Z)=\\sum_iX_i$ :',
        choices: [
          { text: '$\\{T(Z)<d_\\alpha\\}$, car $r=(\\theta_1/\\theta_0)^ne^{-(\\theta_1-\\theta_0)T}$ est strictement décroissant en $T$.', correct: true, explanation: 'Méthode 1.2 avec $\\tilde r$ décroissante : on renverse l’inégalité.' },
          { text: '$\\{T(Z)>d_\\alpha\\}$, car $r$ est croissant en $T$.', correct: false, explanation: 'Piège de convention (intensité) : le signe de $-(\\theta_1-\\theta_0)$ rend le rapport décroissant.' },
          { text: '$\\{|T(Z)-n/\\theta_0|>d_\\alpha\\}$.', correct: false, explanation: 'Forme bilatérale : rien ne la justifie pour deux hypothèses simples.' },
        ],
      },
      {
        prompt: 'Étape 2 — Justifier l’usage du Th. 1.1 :',
        choices: [
          { text: '$T(Z)$ est à densité sous $\\mathbb{P}_{\\theta_0}$ et $\\mathbb{P}_{\\theta_1}$, donc $r(Z)$, fonction strictement monotone de $T$, n’a pas d’atome.', correct: true, explanation: 'Cadre 1.1 vérifié : test pur de taille exactement $\\alpha$.' },
          { text: 'Le modèle est régulier (support $\\mathbb{R}_+$ indépendant de $\\theta$).', correct: false, explanation: 'La régularité au sens de Cramér-Rao n’est pas une hypothèse de Neyman-Pearson.' },
          { text: '$n$ est grand, donc le TCL s’applique.', correct: false, explanation: 'Le résultat est exact, non asymptotique.' },
        ],
      },
      {
        prompt: 'Étape 3 — Le seuil $d_\\alpha$ vaut :',
        choices: [
          { text: '$d_\\alpha=g_{n,\\alpha}/\\theta_0=\\chi^2_\\alpha(2n)/(2\\theta_0)$, $g_{n,\\alpha}$ quantile d’ordre $\\alpha$ de $\\Gamma(n,1)$.', correct: true, explanation: 'Sous $\\mathbb{P}_{\\theta_0}$, $T\\sim\\Gamma(n,\\theta_0)$ donc $\\theta_0T\\sim\\Gamma(n,1)$ et $2\\theta_0T\\sim\\chi^2(2n)$.' },
          { text: '$d_\\alpha=\\chi^2_{1-\\alpha}(2n)/(2\\theta_0)$.', correct: false, explanation: 'Quantile d’ordre $1-\\alpha$ : correspondrait à un rejet pour $T$ grand.' },
          { text: '$d_\\alpha=\\theta_0\\chi^2_\\alpha(2n)/2$.', correct: false, explanation: 'Formule de la paramétrisation par la moyenne ; ici $\\theta_0$ est une intensité.' },
        ],
      },
      {
        prompt: 'Étape 4 — Que peut-on ajouter (point bonus attendu) ?',
        choices: [
          { text: 'Le seuil ne dépend pas de $\\theta_1$ : le test est U.P.P.($\\alpha$) pour $\\theta\\le\\theta_0$ contre $\\theta>\\theta_0$ (RVM décroissant, Th. 1.4).', correct: true, explanation: 'C’est l’argument de la Méthode 1.3 / du Th. 1.4.' },
          { text: 'Le test est aussi U.P.P. pour $\\theta=\\theta_0$ contre $\\theta\\ne\\theta_0$.', correct: false, explanation: 'Faux : pas d’U.P.P. bilatéral (Prop. 1.1).' },
          { text: 'Le test est de puissance 1.', correct: false, explanation: 'Sa puissance $\\mathbb{P}(\\chi^2(2n)<\\theta_1\\chi^2_\\alpha(2n)/\\theta_0)$ est $<1$.' },
        ],
      },
    ],
    conclusion: 'Piège n° 1 de l’examen : ne pas rejeter pour les grandes valeurs de $\\sum X_i$ — une grande intensité donne de **petites** observations. La Q3 en déduit la $p$-valeur $\\hat\\alpha(Z)=F_{\\chi^2(2n)}(2\\theta_0\\sum_iX_i)$.',
  },
  {
    id: 'ch5-etape-translatee',
    type: 'etape-suivante',
    title: 'Exponentielle translatée : quel test randomisé ?',
    source: 'PC5 Ex. 3 ; Poly ch.5, Exercice 4',
    origin: 'pc',
    difficulty: 3,
    tags: ['randomisation', 'atome', 'hors-programme'],
    setup: '$n$-échantillon de $p_\\theta(x)=e^{-(x-\\theta)}\\mathbb{1}_{]\\theta,\\infty[}(x)$, $\\theta_0<\\theta_1$, $\\alpha=0{,}05$, $n=5$, $\\theta_1-\\theta_0=1$.',
    steps: [
      {
        prompt: 'Étape 1 — Sur $\\{x_{1:n}>\\theta_0\\}$, le rapport $p_{\\theta_1}/p_{\\theta_0}$ prend :',
        choices: [
          { text: 'les deux valeurs $0$ (si $x_{1:n}\\le\\theta_1$) et $e^{n(\\theta_1-\\theta_0)}$ (si $x_{1:n}>\\theta_1$).', correct: true, explanation: '$\\mathrm{L}_n(\\theta)=e^{n\\theta-\\sum x_i}\\mathbb{1}_{\\{\\theta<x_{1:n}\\}}$.' },
          { text: 'une infinité de valeurs, fonction strictement croissante de $x_{1:n}$.', correct: false, explanation: 'Le facteur $e^{n\\theta}$ ne dépend pas des observations : seule l’indicatrice varie.' },
          { text: 'les valeurs $1$ et $e^{-n(\\theta_1-\\theta_0)}$.', correct: false, explanation: 'Rapport inversé et indicatrice oubliée.' },
        ],
      },
      {
        prompt: 'Étape 2 — $\\mathbb{P}_{\\theta_0}(X_{1:n}>\\theta_1)=e^{-5}\\approx0{,}0067\\le\\alpha$. La forme du test U.P.P. de taille $\\alpha$ est :',
        choices: [
          { text: '$\\phi_1$ : rejet si $X_{1:n}>\\theta_1$, rejet avec probabilité ${\\gamma}$ si $\\theta_0<X_{1:n}\\le\\theta_1$.', correct: true, explanation: 'Le budget $\\alpha$ dépasse la probabilité de l’atome $\\{r=e^{5}\\}$ : on le prend entièrement et l’on randomise sur $\\{r=0\\}$ ($c=0$).' },
          { text: '$\\phi_2$ : rejet avec probabilité ${\\gamma}$ si $X_{1:n}>\\theta_1$, non-rejet sinon.', correct: false, explanation: 'Forme du cas $\\alpha<e^{-n(\\theta_1-\\theta_0)}$ ; ici elle aurait une taille au plus $0{,}0067<\\alpha$.' },
          { text: 'Le test pur $\\mathbb{1}_{\\{X_{1:n}>\\theta_1\\}}$ est le seul U.P.P.', correct: false, explanation: 'Il est U.P.P. (puissance 1) mais pas le seul : l’unicité tombe avec des atomes.' },
        ],
      },
      {
        prompt: 'Étape 3 — La valeur de $\\gamma$ :',
        choices: [
          { text: '$\\gamma=\\dfrac{\\alpha e^{5}-1}{e^{5}-1}\\approx0{,}0436$', correct: true, explanation: '$\\alpha=e^{-5}+\\gamma(1-e^{-5})$.' },
          { text: '$\\gamma=\\alpha e^{5}\\approx7{,}42$', correct: false, explanation: 'Formule du cas $\\phi_2$, et ici elle donnerait $\\gamma>1$ : impossible.' },
          { text: '$\\gamma=\\alpha=0{,}05$', correct: false, explanation: 'Oubli de la masse déjà dépensée sur $\\{X_{1:n}>\\theta_1\\}$.' },
        ],
      },
    ],
    conclusion: 'Puissance $\\mathbb{P}_{\\theta_1}(X_{1:n}>\\theta_1)=1$ : le test pur $\\mathbb{1}_{\\{X_{1:n}>\\theta_1\\}}$, de taille $0{,}0067$, est aussi U.P.P.($0{,}05$). Avec $\\theta_1-\\theta_0=0{,}5$ : $e^{-2{,}5}\\approx0{,}082>\\alpha$, forme $\\phi_2$ et $\\gamma=0{,}05e^{2{,}5}\\approx0{,}609$.',
  },
  {
    id: 'ch5-etape-pvaleur',
    type: 'etape-suivante',
    title: 'La p-valeur du test U.P.P. gaussien',
    source: 'Poly ch.5, §1.10 ; Poly ch.4, Déf. 2.4',
    origin: 'poly',
    difficulty: 1,
    tags: ['p-valeur', 'interpretation', 'cours'],
    setup: 'Famille de tests U.P.P. $\\phi^\\star_\\alpha=\\mathbb{1}_{\\{\\bar X_n>\\mu_0+\\sigma z_{1-\\alpha}/\\sqrt n\\}}$, $\\sigma$ connu.',
    steps: [
      {
        prompt: 'Étape 1 — Pourquoi peut-on définir une $p$-valeur ?',
        choices: [
          { text: 'Les régions de rejet sont emboîtées : $\\alpha\\mapsto z_{1-\\alpha}$ est décroissante.', correct: true, explanation: 'Hypothèse de la Déf. 2.4 du ch.4.' },
          { text: 'Parce que le test est U.P.P.', correct: false, explanation: 'L’optimalité n’a rien à voir avec l’existence de la $p$-valeur.' },
          { text: 'Parce que $\\bar X_n$ est sans biais.', correct: false, explanation: 'Sans rapport : c’est la structure emboîtée de la famille qui compte.' },
        ],
      },
      {
        prompt: 'Étape 2 — La $p$-valeur $\\hat\\alpha(Z)$ vaut :',
        choices: [
          { text: '$1-\\Phi\\big(\\sqrt n(\\bar X_n-\\mu_0)/\\sigma\\big)$', correct: true, explanation: 'On résout $\\mu_0+\\sigma z_{1-\\hat\\alpha}/\\sqrt n=\\bar X_n$.' },
          { text: '$\\Phi\\big(\\sqrt n(\\bar X_n-\\mu_0)/\\sigma\\big)$', correct: false, explanation: 'C’est $1-\\hat\\alpha(Z)$ : elle serait proche de 1 quand les données contredisent fortement $H_0$.' },
          { text: '$2\\big(1-\\Phi(\\sqrt n|\\bar X_n-\\mu_0|/\\sigma)\\big)$', correct: false, explanation: '$p$-valeur du test **bilatéral**, pas de la famille unilatérale.' },
        ],
      },
      {
        prompt: 'Étape 3 — Si $\\hat\\alpha(Z)=0{,}03$ :',
        choices: [
          { text: 'on rejette $H_0$ au niveau $5\\,\\%$ mais pas au niveau $1\\,\\%$.', correct: true, explanation: 'On rejette pour tout $\\alpha>\\hat\\alpha(Z)$.' },
          { text: '$H_0$ est vraie avec probabilité $3\\,\\%$.', correct: false, explanation: 'Erreur d’interprétation classique (Examen 2025 Ex. 1 Q3c) : la $p$-valeur est une probabilité sur l’observation, sous $H_0$.' },
          { text: 'l’effet $\\mu-\\mu_0$ est important.', correct: false, explanation: 'Significatif $\\ne$ important : regarder la taille d’effet (§1.10).' },
        ],
      },
    ],
    conclusion: 'C’est la $p$-valeur du chapitre 4 (Ex. 2.13) : l’optimalité dit seulement de quelle famille de tests elle est issue.',
  },
  // ------------------------------------------------------------------ Associer
  {
    id: 'ch5-assoc-regions',
    type: 'associer',
    title: 'Les quatre régions de rejet unilatérales',
    source: 'Poly ch.5, p. 21 (« Les régions de rejet des tests unilatéraux »)',
    origin: 'poly',
    difficulty: 2,
    tags: ['rvm', 'upp', 'cours'],
    prompt: 'Associer chaque situation (monotonie du rapport en $T$, hypothèses) à la région de rejet du test U.P.P. Dans tous les cas, $d_\\alpha$ est fixé sous $\\mathbb{P}_{\\theta_0}$.',
    pairs: [
      { left: 'Rapport croissant, $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$', right: '$\\{T(Z)>d_\\alpha\\}$ : grandes valeurs de $T$ $\\leftrightarrow$ grandes valeurs de $\\theta$, on rejette $\\theta\\le\\theta_0$', explanation: 'Th. 1.3.' },
      { left: 'Rapport croissant, $H_0:\\theta\\ge\\theta_0$ contre $H_1:\\theta<\\theta_0$', right: '$\\{T(Z)<d_\\alpha\\}$ : petites valeurs de $T$ $\\leftrightarrow$ petites valeurs de $\\theta$, on rejette $\\theta\\ge\\theta_0$', explanation: 'On renverse l’ordre sur $\\Theta$ : petites valeurs de $T$ $\\leftrightarrow$ petites valeurs de $\\theta$.' },
      { left: 'Rapport décroissant, $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$', right: '$\\{T(Z)<d_\\alpha\\}$ : petites valeurs de $T$ $\\leftrightarrow$ grandes valeurs de $\\theta$, on rejette $\\theta\\le\\theta_0$ (Examen 2025 Ex. 1, intensité)', explanation: 'Th. 1.4.' },
      { left: 'Rapport décroissant, $H_0:\\theta\\ge\\theta_0$ contre $H_1:\\theta<\\theta_0$', right: '$\\{T(Z)>d_\\alpha\\}$ : grandes valeurs de $T$ $\\leftrightarrow$ petites valeurs de $\\theta$, on rejette $\\theta\\ge\\theta_0$', explanation: 'Double renversement.' },
    ],
  },
  {
    id: 'ch5-assoc-2025-ex4-q12',
    type: 'associer',
    title: 'Examen 2025 Ex. 4 Q12 — quel test pour quelle hypothèse en régression multiple ?',
    source: 'Examen 2025 Ex. 4 Q12 ; DIAGNOSTIC §2.A Ex. 4 ; PC5 Ex. 4 (= Exercice 6 du poly, complément)',
    origin: 'annale',
    difficulty: 2,
    tags: ['hors-programme', 'regression', 'fisher'],
    prompt: 'Données ozone : $\\mathbf{Y}=Z\\beta+\\varepsilon$, $\\varepsilon\\sim\\mathcal{N}(0,\\sigma^2I_n)$, $\\sigma^2$ inconnue, $Z$ de taille $n\\times p$ et de rang $p$ (constante, $T12$, $Vx$ et les $K-1$ indicatrices de la nébulosité $Ne12$, codée comme variable qualitative à $K$ modalités). $SCR$ et $SCR_0$ sont les sommes des carrés des résidus du modèle complet et du sous-modèle. Associer chaque question à son test.',
    pairs: [
      { left: '(i) Le vent $Vx$ influence-t-il $O_3$ ? $H_0:\\beta_{Vx}=0$ contre $\\beta_{Vx}\\ne0$', right: 'Test de Student : $T=\\hat\\beta_{Vx}/\\widehat{se}(\\hat\\beta_{Vx})\\sim t(n-p)$ sous $H_0$, rejet si $|T|$ est grand', explanation: 'Une seule contrainte linéaire : $\\hat\\beta_{Vx}$ gaussien, $\\widehat{se}$ construit avec $SCR/(n-p)$ indépendant (Cochran), d’où une Student à $n-p$ degrés de liberté.' },
      { left: '(ii) Y a-t-il un effet de la nébulosité ? $H_0$ : les $K-1$ coefficients des indicatrices de $Ne12$ sont nuls', right: 'Test de Fisher de sous-modèle : $F\\sim F(K-1,n-p)$ sous $H_0$', explanation: 'Une variable qualitative à $K$ modalités apporte $K-1$ coefficients (une modalité de référence absorbée par la constante) : on teste $K-1$ contraintes simultanément.' },
      { left: '(iii) $O_3$ dépend-il conjointement de $Vx$ et $T12$ ? $H_0:\\beta_{Vx}=\\beta_{T12}=0$', right: '$F=\\dfrac{(SCR_0-SCR)/2}{SCR/(n-p)}\\sim F(2,n-p)$ sous $H_0$, rejet si $F$ est grand', explanation: 'Deux contraintes : numérateur $\\chi^2(2)/2$ et dénominateur $\\chi^2(n-p)/(n-p)$ indépendants par Cochran (Exercice 6 du poly, $p-r=2$).' },
    ],
  },
  {
    id: 'ch5-assoc-familles',
    type: 'associer',
    title: 'Familles et statistique du rapport monotone',
    source: 'Poly ch.5, Ex. 1.4, 1.5, Exercices 1 et 3, Ex. 4.4 ; CC 2022 Ex. 1',
    origin: 'poly',
    difficulty: 2,
    tags: ['rvm', 'familles-exponentielles'],
    prompt: 'Associer chaque modèle ($n$-échantillon) à la statistique et au sens de monotonie de son rapport de vraisemblance.',
    pairs: [
      { left: '$\\mathcal{N}(\\theta,1)$', right: 'croissant en $\\bar x_n$', explanation: 'Ex. 1.4 : pente $n(\\theta-\\theta\')$.' },
      { left: 'Weibull $\\frac c\\theta x^{c-1}e^{-x^c/\\theta}$ ($c$ connu)', right: 'croissant en $\\sum_ix_i^c$', explanation: 'CC 2022 Ex. 1 Q2 : $\\psi(t;\\theta)=e^{-t/\\theta-n\\ln\\theta}$.' },
      { left: 'Géométrique $\\theta(1-\\theta)^k$', right: 'décroissant en $\\sum_iy_i$', explanation: 'Exercice 3 : $\\varphi(\\theta)=\\log(1-\\theta)$ décroissante.' },
      { left: 'Précision $\\mathcal{N}(0,\\theta^{-2})$', right: 'croissant en $-\\sum_ix_i^2$', explanation: 'Compléments p. 54 : augmenter la précision diminue la variance.' },
      { left: 'Uniforme $\\mathcal{U}([0,\\theta])$', right: 'croissant au sens large seulement en $x_{n:n}$ (Déf. 1.4 non satisfaite)', explanation: 'Ex. 4.5, Exercice 7 : constant sur $[0,\\theta\']$.' },
    ],
  },
  {
    id: 'ch5-assoc-bilateral',
    type: 'associer',
    title: 'Les trois tests de l’Exercice 5 (PC5 Ex. 2)',
    source: 'PC5 Ex. 2 ; Poly ch.5, Exercice 5 (figure 4)',
    origin: 'pc',
    difficulty: 2,
    tags: ['bilateral', 'sans-biais', 'puissance'],
    prompt: 'Modèle $\\mathcal{N}(\\theta,1)$, $H_0:\\theta=\\theta_0$. Associer chaque test à sa fonction puissance et à sa propriété.',
    pairs: [
      { left: '$\\phi^{\\star,1}=\\mathbb{1}_{\\{\\bar X_n>\\theta_0+z_{1-\\alpha}/\\sqrt n\\}}$', right: 'puissance croissante de 0 à 1 ; U.P.P. pour $\\theta>\\theta_0$, biaisé pour $\\theta\\ne\\theta_0$', explanation: 'Sa puissance est $<\\alpha$ pour $\\theta<\\theta_0$.' },
      { left: '$\\phi^{\\star,2}=\\mathbb{1}_{\\{\\bar X_n<\\theta_0-z_{1-\\alpha}/\\sqrt n\\}}$', right: 'puissance décroissante de 1 à 0 ; U.P.P. pour $\\theta<\\theta_0$', explanation: 'Symétrique du précédent.' },
      { left: '$\\phi^{\\star,3}=\\mathbb{1}_{\\{|\\bar X_n-\\theta_0|>z_{1-\\alpha/2}/\\sqrt n\\}}$', right: 'puissance en U de minimum $\\alpha$ en $\\theta_0$ ; sans biais, U.M.P.U., non U.P.P.', explanation: 'Tangente horizontale en $\\theta_0$ (conditions (5)).' },
      { left: 'Test constant $\\bar\\phi\\equiv\\alpha$', right: 'puissance constante égale à $\\alpha$ ; sert à montrer qu’un U.P.P. est sans biais', explanation: 'PC5 Ex. 2 Q5 ; Prop. 4.1.' },
    ],
  },
  // ------------------------------------------------------------------ Numériques
  {
    id: 'ch5-num-seuil-pc5',
    type: 'numerique',
    title: 'Seuil du test U.P.P. exponentiel (PC5 Ex. 1)',
    source: 'PC5 Ex. 1 Q3 (figures 1 et 3)',
    origin: 'pc',
    difficulty: 1,
    tags: ['upp', 'gamma-chi2'],
    question: '$n=10$, $\\theta_0=1$, $\\alpha=0{,}05$, modèle $\\theta^{-1}e^{-x/\\theta}$, test $\\mathbb{1}_{\\{\\sum_iX_i>c\\}}$. Sachant $\\chi^2_{0{,}95}(20)\\approx31{,}410$, donner $c$.',
    answer: 15.705,
    tolerance: 0.02,
    hint: '(arrondir à 0,01)',
    explanation: 'Sous $\\mathbb{P}_{\\theta_0}$, $2\\sum_iX_i/\\theta_0\\sim\\chi^2(2n)$, donc $c=\\frac{\\theta_0}2\\chi^2_{1-\\alpha}(2n)=31{,}410/2\\approx15{,}705$ (trait vertical des figures de l’énoncé).',
  },
  {
    id: 'ch5-num-puissance-ex13',
    type: 'numerique',
    title: 'Puissance du test de l’Exemple 1.3',
    source: 'Poly ch.5, Ex. 1.3 (figure p. 18)',
    origin: 'poly',
    difficulty: 1,
    tags: ['puissance', 'neyman-pearson'],
    question: '$\\mathcal{N}(\\mu,1)$, $H_0:\\mu=0$ contre $H_1:\\mu=1$, $\\alpha=0{,}05$ ($z_{0{,}95}\\approx1{,}645$), $n=5$. Puissance du test U.P.P. ?',
    answer: 0.7228,
    tolerance: 0.005,
    hint: '(arrondir à 0,001 ; $\\Phi(0{,}591)\\approx0{,}723$)',
    explanation: '$\\beta=1-\\Phi(z_{0{,}95}-\\sqrt5)=1-\\Phi(1{,}645-2{,}236)=1-\\Phi(-0{,}591)=\\Phi(0{,}591)\\approx0{,}723$.',
  },
  {
    id: 'ch5-num-gamma-geom',
    type: 'numerique',
    title: 'Coefficient de randomisation (PC5 Ex. 6)',
    source: 'PC5 Ex. 6 Q4 ; Poly ch.5, Exercice 3',
    origin: 'pc',
    difficulty: 2,
    tags: ['randomisation', 'discret', 'hors-programme'],
    question: 'Modèle géométrique, $n=5$, $\\theta_0=0{,}5$, $\\alpha=0{,}05$, test $\\mathbb{1}_{\\{T<c\\}}+\\gamma\\mathbb{1}_{\\{T=c\\}}$ avec $T\\sim$ binomiale négative $(5,0{,}5)$ sous $H_0$. On a $\\mathbb{P}(T=0)=0{,}03125$ et $\\mathbb{P}(T=1)=0{,}078125$. Donner $\\gamma$.',
    answer: 0.24,
    tolerance: 0.005,
    explanation: '$\\mathbb{P}(T<1)=0{,}03125<0{,}05<\\mathbb{P}(T\\le1)=0{,}109$ : $c=1$ et $\\gamma=\\frac{0{,}05-0{,}03125}{0{,}078125}=0{,}24$. Le test rejette si $T=0$ et rejette avec probabilité $0{,}24$ si $T=1$.',
  },
  {
    id: 'ch5-num-poisson-ex41',
    type: 'numerique',
    title: 'Exemple 4.1 : randomiser le test de Poisson',
    source: 'Poly ch.5, Compléments, Ex. 4.1',
    origin: 'poly',
    difficulty: 2,
    tags: ['randomisation', 'discret', 'hors-programme'],
    question: '$T\\sim\\mathrm{Poi}(1)$ sous $H_0$, $\\alpha=0{,}05$ : $\\mathbb{P}(T>3)\\approx0{,}0190$ et $\\mathbb{P}(T=3)=e^{-1}/6\\approx0{,}0613$. Valeur de $\\gamma_\\alpha$ ?',
    answer: 0.5058,
    tolerance: 0.01,
    hint: '(arrondir à 0,01)',
    explanation: '$\\gamma_\\alpha=\\frac{\\alpha-\\mathbb{P}(T>3)}{\\mathbb{P}(T=3)}=\\frac{0{,}05-0{,}0190}{0{,}0613}\\approx0{,}506$ (« $\\approx0{,}5$ » dans le poly). Le test pur $\\mathbb{1}_{\\{T>3\\}}$ n’a qu’une taille $0{,}019$.',
  },
  {
    id: 'ch5-num-bilateral',
    type: 'numerique',
    title: 'Puissance du test bilatéral (PC5 Ex. 2)',
    source: 'PC5 Ex. 2 Q4 (figure 4) ; Poly ch.5, Exercice 5',
    origin: 'pc',
    difficulty: 2,
    tags: ['bilateral', 'puissance'],
    question: '$\\mathcal{N}(\\theta,1)$, $n=10$, $\\theta_0=0$, $\\alpha=0{,}05$ ($z_{0{,}975}\\approx1{,}96$). Puissance de $\\phi^{\\star,3}$ en $\\theta=0{,}5$ ?',
    answer: 0.3526,
    tolerance: 0.006,
    hint: '(arrondir à 0,001)',
    explanation: '$\\beta=1-\\Phi(1{,}96-\\sqrt{10}\\cdot0{,}5)+\\Phi(-1{,}96-\\sqrt{10}\\cdot0{,}5)=1-\\Phi(0{,}379)+\\Phi(-3{,}541)\\approx0{,}3525+0{,}0002\\approx0{,}353$, contre $0{,}475$ pour le test unilatéral $\\phi^{\\star,1}$ : le prix du compromis bilatéral.',
  },
  // ------------------------------------------------------------------ Annales
  {
    id: 'ch5-annale-cc2022-weibull',
    type: 'annale',
    title: 'CC 2022 Ex. 1 — Test U.P.P. dans le modèle de Weibull',
    source: 'CC MAP433 2022 Ex. 1 (corrigé officiel)',
    origin: 'annale',
    difficulty: 2,
    tags: ['rvm', 'upp', 'gamma-chi2', 'puissance'],
    durationMin: 25,
    statement: `Soit $c>0$ **connu** et $X_1,\\dots,X_n$ un $n$-échantillon de densité

$$p_\\theta(x)=\\frac c\\theta\\,x^{c-1}e^{-x^c/\\theta}\\,\\mathbb{1}_{\\mathbb{R}_+}(x),\\qquad\\theta\\in\\Theta=\\mathbb{R}_+^*.$$

Convention du sujet (différente du poly) : $\\mathrm{Gamma}(p,\\lambda)$ est paramétrée par l’**échelle** $\\lambda$, de densité $\\frac{\\lambda^{-p}}{\\Gamma(p)}x^{p-1}e^{-x/\\lambda}$ ; $\\mathrm{Gcdf}_p$ et $\\mathrm{Gqf}_p$ désignent la f.d.r. et la fonction quantile de $\\mathrm{Gamma}(p,1)$. On teste $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$.

**Q1.** Montrer que $X_i^c$ suit la loi exponentielle d’échelle $\\theta$, de densité $q_\\theta(y)=\\theta^{-1}e^{-y/\\theta}\\mathbb{1}_{\\mathbb{R}_+}(y)$.

**Q2.** Montrer que la famille $\\{p_\\theta^{\\otimes n}\\}$ est à rapport de vraisemblance monotone.

**Q3.** Construire un test U.P.P.($\\alpha$) ; exprimer les constantes à l’aide de $\\mathrm{Gqf}_n$.

**Q4.** Calculer sa fonction puissance à l’aide de $\\mathrm{Gcdf}_n$ et $\\mathrm{Gqf}_n$.`,
    hints: [
      'Q1 : méthode de la fonction muette, changement de variable $y=x^c$, $\\mathrm{d}y=cx^{c-1}\\mathrm{d}x$.',
      'Q2 : factoriser $p_\\theta(z)=h(z)\\psi(T(z);\\theta)$ avec $T(z)=\\sum_ix_i^c$ ; étudier $\\psi(t;\\theta)/\\psi(t;\\theta\')$ pour $\\theta>\\theta\'$.',
      'Q3–Q4 : Th. 1.3 (rapport croissant, $T$ à densité) ; sous $\\mathbb{P}_\\theta$, $T$ est une somme de $n$ exponentielles d’échelle $\\theta$, donc $T/\\theta\\sim\\mathrm{Gamma}(n,1)$.',
    ],
    correction: `**Q1.** Pour $h$ borélienne bornée, par le changement de variable $y=x^c$ ($\\mathrm{d}y=cx^{c-1}\\mathrm{d}x$, bijection de $\\mathbb{R}_+^*$) :

$$\\mathbb{E}_\\theta[h(X^c)]=\\int_0^\\infty h(x^c)\\frac c\\theta x^{c-1}e^{-x^c/\\theta}\\,\\mathrm{d}x=\\int_0^\\infty h(y)\\,\\theta^{-1}e^{-y/\\theta}\\,\\mathrm{d}y,$$

donc $X^c$ a la densité $q_\\theta$ : loi exponentielle d’échelle $\\theta$ (moyenne $\\theta$).

**Q2.** Par indépendance, $p_\\theta(z)=\\theta^{-n}c^n\\prod_ix_i^{c-1}\\exp\\big(-\\sum_ix_i^c/\\theta\\big)$ pour $z\\in\\mathbb{R}_+^n$, soit la factorisation (2) avec $h(z)=c^n\\prod_ix_i^{c-1}\\mathbb{1}_{\\mathbb{R}_+^n}(z)$, $T(z)=\\sum_ix_i^c$, $\\psi(t;\\theta)=\\exp(-t/\\theta-n\\ln\\theta)$. Pour $\\theta>\\theta\'$,

$$\\frac{\\psi(t;\\theta)}{\\psi(t;\\theta')}=\\exp\\Big(t\\,\\frac{\\theta-\\theta'}{\\theta\\theta'}-n\\ln\\frac\\theta{\\theta'}\\Big),$$

strictement **croissante** en $t$ car $\\frac{\\theta-\\theta\'}{\\theta\\theta\'}>0$ : la famille est à rapport de vraisemblance monotone croissant en $T$ (Poly ch.5, Déf. 1.4).

**Q3.** Le paramètre est scalaire, l’hypothèse unilatérale, la famille à rapport monotone croissant, et $T(Z)$ est à densité sous chaque $\\mathbb{P}_\\theta$ (somme de variables à densité). Par le Th. 1.3, le test $\\phi(Z)=\\mathbb{1}_{\\{T(Z)>k_\\alpha\\}}$ avec $\\mathbb{P}_{\\theta_0}(T(Z)>k_\\alpha)=\\alpha$ est U.P.P.($\\alpha$) pour $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$, et sa fonction puissance est croissante. Sous $\\mathbb{P}_{\\theta_0}$, par Q1 et additivité, $T\\sim\\mathrm{Gamma}(n,\\theta_0)$ (échelle), donc $T/\\theta_0\\sim\\mathrm{Gamma}(n,1)$ et

$$k_\\alpha=\\theta_0\\,\\mathrm{Gqf}_n(1-\\alpha).$$

Le seuil est calculé en $\\theta_0$, borne de $H_0$ ; la croissance de la puissance donne une taille $\\sup_{\\theta\\le\\theta_0}\\beta_\\phi(\\theta)=\\beta_\\phi(\\theta_0)=\\alpha$.

**Q4.** Sous $\\mathbb{P}_\\theta$, $T/\\theta\\sim\\mathrm{Gamma}(n,1)$, d’où

$$\\beta_\\phi(\\theta)=\\mathbb{P}_\\theta\\Big(\\frac T\\theta>\\frac{\\theta_0\\mathrm{Gqf}_n(1-\\alpha)}\\theta\\Big)=1-\\mathrm{Gcdf}_n\\Big(\\frac{\\theta_0\\,\\mathrm{Gqf}_n(1-\\alpha)}{\\theta}\\Big),$$

fonction croissante de $\\theta$, égale à $\\alpha$ en $\\theta_0$, tendant vers 1 quand $\\theta\\to\\infty$.

*Remarque* : avec $c=1$ on retrouve exactement l’Exercice 1 du poly (PC5 Ex. 1), où le seuil s’écrit $\\frac{\\theta_0}2\\chi^2_{1-\\alpha}(2n)$.`,
    bareme: [
      { label: 'Q1 loi de X^c (changement de variable)', points: 0.75 },
      { label: 'Q2 factorisation et monotonie stricte', points: 1 },
      { label: 'Q3 test U.P.P., Th. 1.3 cité, seuil Gqf', points: 1.25 },
      { label: 'Q4 fonction puissance', points: 1 },
    ],
  },
  {
    id: 'ch5-annale-2025-ex1',
    type: 'annale',
    title: 'Examen 2025 Ex. 1 Q2–Q3 — Neyman-Pearson et p-valeur, modèle exponentiel (intensité)',
    source: 'Examen 2025 Ex. 1 Q2–Q3 (sans corrigé officiel ; solution DIAGNOSTIC §2.A)',
    origin: 'annale',
    difficulty: 2,
    tags: ['neyman-pearson', 'convention-intensite', 'p-valeur', 'cours'],
    durationMin: 15,
    statement: `$n$-échantillon de $\\big(\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}_+),\\{p_\\theta\\cdot\\mathrm{Leb},\\ \\theta>0\\}\\big)$ avec $p_\\theta(x)=\\theta e^{-\\theta x}$. Rappels : $\\Gamma(a,b)$ (intensité $b$) a pour espérance $a/b$ ; additivité ; $\\chi^2(p)=\\Gamma(p/2,1/2)$.

**Q2.** Soit $\\theta_1>\\theta_0$. Déterminer le test de Neyman-Pearson de niveau $\\alpha$ de $H_0:\\theta=\\theta_0$ contre $H_1:\\theta=\\theta_1$ ; exprimer le seuil à l’aide d’un quantile de loi Gamma.

**Q3.** (a) Définir la $p$-valeur et la calculer ici. (b) Que signifie une $p$-valeur de $3\\,\\%$ ? (c) Est-ce la probabilité d’être sous $\\Theta_0$ ? sous $\\Theta_1$ ?`,
    hints: [
      'Q2 : écrire $r(z)=p_{\\theta_1}(z)/p_{\\theta_0}(z)$ et étudier sa monotonie en $T(z)=\\sum_ix_i$ : attention au signe de $-(\\theta_1-\\theta_0)$.',
      'Q2 : vérifier l’absence d’atome, puis trouver la loi de $\\theta_0T$ sous $\\mathbb{P}_{\\theta_0}$ (additivité Gamma).',
      'Q3 : régions emboîtées $\\{\\theta_0T<g_{n,\\alpha}\\}$ ; $\\hat\\alpha(Z)=\\inf\\{\\alpha:Z\\in\\mathcal{R}_\\alpha\\}$ ; la $p$-valeur est une probabilité sur l’observation calculée sous $H_0$.',
    ],
    correction: `**Q2.** Densité du $n$-échantillon : $p_\\theta(z)=\\theta^n\\exp(-\\theta\\sum_ix_i)$ sur $\\mathbb{R}_+^n$. Le rapport de vraisemblance vaut

$$r(z)=\\frac{p_{\\theta_1}(z)}{p_{\\theta_0}(z)}=\\Big(\\frac{\\theta_1}{\\theta_0}\\Big)^n\\exp\\Big(-(\\theta_1-\\theta_0)\\sum_{i=1}^nx_i\\Big),$$

fonction **strictement décroissante** de $T(z)=\\sum_ix_i$ puisque $\\theta_1>\\theta_0$. Sous $\\mathbb{P}_{\\theta_0}$ et $\\mathbb{P}_{\\theta_1}$, $T(Z)$ est à densité, donc $r(Z)$ n’a pas d’atome (Cadre 1.1) et le **Théorème 1.1 de Neyman-Pearson** s’applique (modèle dominé par Lebesgue, deux hypothèses simples, $\\alpha\\in\\,]0,1[$) : le test $\\phi^\\star=\\mathbb{1}_{\\{r(Z)>c_\\alpha\\}}$ de taille exactement $\\alpha$ est U.P.P.($\\alpha$). Par décroissance (Méthode 1.2), $\\{r(Z)>c_\\alpha\\}=\\{T(Z)<d_\\alpha\\}$ avec $\\mathbb{P}_{\\theta_0}(T(Z)<d_\\alpha)=\\alpha$. Sous $\\mathbb{P}_{\\theta_0}$, $X_i\\sim\\Gamma(1,\\theta_0)$ donc $T\\sim\\Gamma(n,\\theta_0)$ (additivité) et $\\theta_0T\\sim\\Gamma(n,1)$, $2\\theta_0T\\sim\\chi^2(2n)$. Avec $g_{n,\\alpha}$ le quantile d’ordre $\\alpha$ de $\\Gamma(n,1)$ :

$$\\phi^\\star(Z)=\\mathbb{1}_{\\{T(Z)<d_\\alpha\\}},\\qquad d_\\alpha=\\frac{g_{n,\\alpha}}{\\theta_0}=\\frac{\\chi^2_\\alpha(2n)}{2\\theta_0}.$$

Le seuil ne dépend pas de $\\theta_1$ : le test est U.P.P.($\\alpha$) pour $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$ (famille à rapport monotone décroissant en $T$, Th. 1.4). *Piège* : une grande intensité donne de petites observations, on rejette pour les **petites** valeurs de $\\sum_iX_i$.

**Q3 (a).** Pour une famille de tests purs $\\{\\phi_\\alpha\\}$ de niveau $\\alpha$ à régions de rejet emboîtées ($\\mathcal{R}_\\alpha\\subseteq\\mathcal{R}_{\\alpha\'}$ si $\\alpha\\le\\alpha\'$), la $p$-valeur est $\\hat\\alpha(Z):=\\inf\\{\\alpha\\in[0,1]:Z\\in\\mathcal{R}_\\alpha\\}$, le plus petit niveau auquel on rejette. Ici $\\mathcal{R}_\\alpha=\\{\\theta_0T<g_{n,\\alpha}\\}$, emboîtées car $\\alpha\\mapsto g_{n,\\alpha}$ est croissante, et

$$\\hat\\alpha(Z)=F_{\\Gamma(n,1)}\\big(\\theta_0T(Z)\\big)=F_{\\chi^2(2n)}\\Big(2\\theta_0\\sum_{i=1}^nX_i\\Big).$$

**(b)** On rejette $H_0$ à tout niveau $\\alpha>3\\,\\%$ (donc à $5\\,\\%$) et pas à $1\\,\\%$ ; sous $H_0$, une observation au moins aussi défavorable à $H_0$ ne se produirait que dans $3\\,\\%$ des répétitions.

**(c)** **Ni l’un ni l’autre** : $\\theta$ est déterministe, « $\\mathbb{P}(\\theta\\in\\Theta_0)$ » n’a pas de sens dans ce cadre ; la $p$-valeur est une probabilité portant sur l’observation, calculée sous $\\mathbb{P}_{\\theta_0}$.`,
    bareme: [
      { label: 'Q2 rapport, sens de monotonie, absence d’atome', points: 0.75 },
      { label: 'Q2 loi sous θ₀ et seuil quantile Gamma', points: 0.75 },
      { label: 'Q3(a) définition et calcul de la p-valeur', points: 0.75 },
      { label: 'Q3(b)(c) interprétation', points: 0.75 },
    ],
  },
  {
    id: 'ch5-annale-pc5-bilateral',
    type: 'annale',
    title: 'PC5 Ex. 2 — Un test U.P.P. n’existe pas toujours (gaussien bilatéral)',
    source: 'PC5 Ex. 2 Q1–Q7 ; Poly ch.5, Exercice 5',
    origin: 'pc',
    difficulty: 3,
    tags: ['bilateral', 'neyman-pearson', 'sans-biais', 'unicite'],
    durationMin: 35,
    statement: `$n$-échantillon de $\\mathcal{N}(\\theta,1)$, $\\theta\\in\\mathbb{R}$ ; on teste au niveau $\\alpha\\in\\,]0,1/2[$

$$H_0:\\theta=\\theta_0\\quad\\text{contre}\\quad H_1:\\theta\\ne\\theta_0.\\qquad\\text{(4)}$$

**Q1.** Pour $\\theta_1\\ne\\theta_0$, établir le test de Neyman-Pearson de $\\theta=\\theta_0$ contre $\\theta=\\theta_1$ (cas $\\theta_1>\\theta_0$, puis $\\theta_1<\\theta_0$) et calculer les fonctions puissance.

**Q2.** Déterminer un test U.P.P.($\\alpha$) pour $\\theta=\\theta_0$ contre $\\theta>\\theta_0$.

**Q3.** Montrer qu’il n’existe pas de test U.P.P.($\\alpha$) pour (4).

**Q4.** Proposer un test $\\phi^{\\star,3}$ de niveau $\\alpha$ pour (4) et calculer sa fonction puissance.

**Q5.** Un test est *sans biais de niveau $\\alpha$* s’il est de niveau $\\alpha$ et si $\\beta_\\phi(\\theta)\\ge\\alpha$ sur $\\Theta_1$. Montrer qu’un test U.P.P.($\\alpha$) est sans biais.

**Q6.** Montrer que si $\\beta_\\phi(\\theta_0)\\le\\alpha$ et $\\beta_\\phi\\ge\\alpha$ au voisinage de $\\theta_0$, alors $\\beta_\\phi(\\theta_0)=\\alpha$ et $\\beta\'_\\phi(\\theta_0)=0$.

**Q7.** Montrer que $\\phi^{\\star,3}$ est sans biais.`,
    hints: [
      'Q1 : $r(z)=\\exp\\big(-\\frac n2(\\theta_1-\\theta_0)^2+(\\theta_1-\\theta_0)\\sum_i(x_i-\\theta_0)\\big)$ ; le signe de $\\theta_1-\\theta_0$ fixe le sens ; sous $\\mathbb{P}_{\\theta_0}$, $\\sum_i(X_i-\\theta_0)\\sim\\mathcal{N}(0,n)$.',
      'Q2–Q3 : le test de Q1 ne dépend pas de $\\theta_1$ ; pour Q3, raisonner par l’absurde avec l’unicité (Th. 1.2).',
      'Q5 : comparer au test constant $\\bar\\phi\\equiv\\alpha$. Q6 : convergence dominée pour la dérivabilité de $\\beta_\\phi$, puis condition du premier ordre en un minimum local. Q7 : parité de la densité gaussienne.',
    ],
    correction: `**Q1.** Densité $p^n_\\theta(z)=(2\\pi)^{-n/2}\\exp\\big(-\\frac12\\sum_i(x_i-\\theta)^2\\big)$ ; après développement,

$$r(z)=\\exp\\Big(-\\frac n2(\\theta_1-\\theta_0)^2+(\\theta_1-\\theta_0)\\sum_{i=1}^n(x_i-\\theta_0)\\Big).$$

$\\{r>c\\}=\\{(\\theta_1-\\theta_0)\\sum_i(x_i-\\theta_0)>\\tilde c\\}$. Sous $\\mathbb{P}_{\\theta_0}$, $\\sum_i(X_i-\\theta_0)\\sim\\mathcal{N}(0,n)$ : pas d’atome, test pur (Th. 1.1). Si $\\theta_1>\\theta_0$ : $\\phi^{\\star,1}=\\mathbb{1}_{\\{\\bar X_n>\\theta_0+z_{1-\\alpha}/\\sqrt n\\}}$ ; si $\\theta_1<\\theta_0$ (division par un nombre négatif, $z_\\alpha=-z_{1-\\alpha}$) : $\\phi^{\\star,2}=\\mathbb{1}_{\\{\\bar X_n<\\theta_0-z_{1-\\alpha}/\\sqrt n\\}}$. **Aucun ne dépend de $\\theta_1$.** Avec $W\\sim\\mathcal{N}(0,1)$ et $\\sqrt n(\\bar X_n-\\theta)\\sim\\mathcal{N}(0,1)$ sous $\\mathbb{P}_\\theta$ :

$$\\beta_{\\phi^{\\star,1}}(\\theta)=\\mathbb{P}\\big(W>\\sqrt n(\\theta_0-\\theta)+z_{1-\\alpha}\\big),\\qquad\\beta_{\\phi^{\\star,2}}(\\theta)=\\mathbb{P}\\big(W<\\sqrt n(\\theta_0-\\theta)-z_{1-\\alpha}\\big).$$

**Q2.** Le modèle est à rapport monotone croissant en $\\bar x_n$ (Ex. 1.4) et $\\bar X_n$ est à densité : par le Th. 1.3, $\\phi^{\\star,1}$ est U.P.P.($\\alpha$). Autre argument : $\\phi^{\\star,1}$ est de niveau $\\alpha$ et maximise la puissance en chaque $\\theta_1>\\theta_0$ sans dépendre de $\\theta_1$ : c’est la Déf. 1.2.

**Q3.** Par l’absurde, soit $\\phi^\\star$ U.P.P.($\\alpha$) pour (4). Il est U.P.P. pour $\\theta_0$ contre tout $\\theta_1>\\theta_0$ et contre tout $\\theta_1<\\theta_0$ ; par le **Th. 1.2** (unicité, absence d’atome vérifiée), $\\phi^\\star=\\phi^{\\star,1}$ et $\\phi^\\star=\\phi^{\\star,2}$ $\\mathbb{P}_{\\theta_0}$-p.s. Or sur $\\{\\bar X_n>\\theta_0+z_{1-\\alpha}/\\sqrt n\\}$, de probabilité $\\alpha>0$ sous $\\mathbb{P}_{\\theta_0}$, $\\phi^{\\star,1}=1\\ne0=\\phi^{\\star,2}$ : contradiction (Prop. 1.1).

**Q4.** $\\phi^{\\star,3}=\\mathbb{1}_{\\{|\\bar X_n-\\theta_0|>z_{1-\\alpha/2}/\\sqrt n\\}}$, de taille $\\alpha$, et

$$\\beta_{\\phi^{\\star,3}}(\\theta)=1-\\Phi\\big(z_{1-\\alpha/2}+\\sqrt n(\\theta_0-\\theta)\\big)+\\Phi\\big(-z_{1-\\alpha/2}+\\sqrt n(\\theta_0-\\theta)\\big).$$

Il n’est pas U.P.P. (dominé par $\\phi^{\\star,1}$ à droite, $\\phi^{\\star,2}$ à gauche).

**Q5.** Le test constant $\\bar\\phi\\equiv\\alpha$ est de niveau $\\alpha$ et de puissance $\\alpha$ partout ; un U.P.P. le domine sur $\\Theta_1$ : $\\beta_\\phi\\ge\\alpha$ sur $\\Theta_1$. (Tout U.P.P. est donc U.M.P.U.)

**Q6.** Par convergence dominée, $\\theta\\mapsto\\beta_\\phi(\\theta)=\\int\\phi\\,p^n_\\theta$ est continue et dérivable, de dérivée $\\int\\phi\\,\\partial_\\theta\\log p^n_\\theta\\,p^n_\\theta$. Par continuité, $\\alpha\\le\\lim_{\\theta\\to\\theta_0}\\beta_\\phi(\\theta)=\\beta_\\phi(\\theta_0)\\le\\alpha$, d’où $\\beta_\\phi(\\theta_0)=\\alpha$ ; $\\theta_0$ est alors un minimum local de la fonction dérivable $\\beta_\\phi$, donc $\\beta\'_\\phi(\\theta_0)=0$.

**Q7.** $\\beta_{\\phi^{\\star,3}}(\\theta_0)=1-\\Phi(z_{1-\\alpha/2})+\\Phi(-z_{1-\\alpha/2})=\\alpha$ ; $\\beta\'_{\\phi^{\\star,3}}(\\theta)=-\\sqrt n\\big(-f_{0,1}(z_{1-\\alpha/2}+\\sqrt n(\\theta_0-\\theta))+f_{0,1}(-z_{1-\\alpha/2}+\\sqrt n(\\theta_0-\\theta))\\big)$ s’annule en $\\theta_0$ par parité de $f_{0,1}$, et l’expression de Q4 est minimale en $\\theta_0$ (fonction paire de $\\theta-\\theta_0$, croissante en $|\\theta-\\theta_0|$) : $\\beta_{\\phi^{\\star,3}}\\ge\\alpha$ partout, le test est sans biais. (La suite de l’exercice montre qu’il est U.M.P.U.)`,
    bareme: [
      { label: 'Q1 tests de NP et puissances', points: 1.5 },
      { label: 'Q2 test U.P.P. unilatéral', points: 0.5 },
      { label: 'Q3 absurde + unicité', points: 1 },
      { label: 'Q4 test bilatéral et puissance', points: 0.75 },
      { label: 'Q5–Q7 sans biais', points: 1.25 },
    ],
  },
  {
    id: 'ch5-annale-variante-rayleigh',
    type: 'annale',
    title: 'Variante type examen — Loi de Rayleigh : RVM, test U.P.P., puissance',
    source: 'Variante (style CC 2022 Ex. 1 et Examen 2025 Ex. 1)',
    origin: 'variante',
    difficulty: 2,
    tags: ['rvm', 'upp', 'neyman-pearson', 'gamma-chi2', 'puissance'],
    durationMin: 25,
    statement: `$X_1,\\dots,X_n$ i.i.d. de densité de Rayleigh

$$p_\\theta(x)=\\frac x\\theta\\,e^{-x^2/(2\\theta)}\\,\\mathbb{1}_{\\mathbb{R}_+}(x),\\qquad\\theta>0.$$

Rappels : $\\Gamma(a,b)$ paramétrée par l’intensité $b$ ; additivité ; $\\chi^2(p)=\\Gamma(p/2,1/2)$.

**Q1.** Montrer que $X_i^2$ suit la loi exponentielle de moyenne $2\\theta$ et en déduire la loi de $T=\\sum_iX_i^2$ sous $\\mathbb{P}_\\theta$.

**Q2.** Pour $\\theta_1>\\theta_0$, déterminer le test de Neyman-Pearson de niveau $\\alpha$ de $\\theta=\\theta_0$ contre $\\theta=\\theta_1$.

**Q3.** Montrer que la famille est à rapport de vraisemblance monotone et en déduire un test U.P.P.($\\alpha$) de $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$.

**Q4.** Exprimer sa fonction puissance ; application : $n=10$, $\\theta_0=1$, $\\alpha=0{,}05$, $\\theta=2$.

**Q5.** Existe-t-il un test U.P.P.($\\alpha$) de $\\theta=\\theta_0$ contre $\\theta\\ne\\theta_0$ ?`,
    hints: [
      'Q1 : fonction muette avec $y=x^2$ ($\\mathrm{d}y=2x\\,\\mathrm{d}x$). Puis $T\\sim\\Gamma(n,1/(2\\theta))$ et $T/\\theta\\sim\\chi^2(2n)$.',
      'Q2–Q3 : $r(z)=(\\theta_0/\\theta_1)^n\\exp\\big(T(\\frac1{2\\theta_0}-\\frac1{2\\theta_1})\\big)$, croissant en $T$ ; seuil sous $\\theta_0$.',
      'Q5 : famille exponentielle en $\\varphi(\\theta)=-1/(2\\theta)$ strictement croissante, $T$ à densité : Prop. 1.1.',
    ],
    correction: `**Q1.** Pour $h$ bornée, avec $y=x^2$ : $\\mathbb{E}_\\theta[h(X^2)]=\\int_0^\\infty h(x^2)\\frac x\\theta e^{-x^2/(2\\theta)}\\mathrm{d}x=\\int_0^\\infty h(y)\\frac1{2\\theta}e^{-y/(2\\theta)}\\mathrm{d}y$ : $X^2\\sim\\mathcal{E}$ de moyenne $2\\theta$, i.e. $\\Gamma(1,\\frac1{2\\theta})$. Par additivité, $T\\sim\\Gamma(n,\\frac1{2\\theta})$, donc $T/\\theta\\sim\\Gamma(n,\\frac12)=\\chi^2(2n)$.

**Q2.** $p^n_\\theta(z)=\\prod_ix_i\\,\\theta^{-n}\\exp(-T(z)/(2\\theta))$ sur $\\mathbb{R}_+^n$, d’où

$$r(z)=\\Big(\\frac{\\theta_0}{\\theta_1}\\Big)^n\\exp\\Big(T(z)\\Big(\\frac1{2\\theta_0}-\\frac1{2\\theta_1}\\Big)\\Big),$$

strictement croissant en $T$ ($\\theta_1>\\theta_0$). $T(Z)$ est à densité : pas d’atome, Th. 1.1 ; $\\{r>c_\\alpha\\}=\\{T>d_\\alpha\\}$ avec $\\mathbb{P}_{\\theta_0}(T>d_\\alpha)=\\alpha$, soit $d_\\alpha=\\theta_0\\chi^2_{1-\\alpha}(2n)$. Le test $\\mathbb{1}_{\\{T>\\theta_0\\chi^2_{1-\\alpha}(2n)\\}}$ est de taille exactement $\\alpha$ et U.P.P.($\\alpha$) ; il ne dépend pas de $\\theta_1$.

**Q3.** Factorisation (2) : $h(z)=\\prod_ix_i\\mathbb{1}_{\\mathbb{R}_+^n}(z)$, $T(z)=\\sum_ix_i^2$, $\\psi(t;\\theta)=\\theta^{-n}e^{-t/(2\\theta)}$ ; pour $\\theta>\\theta\'$, $\\psi(t;\\theta)/\\psi(t;\\theta\')=(\\theta\'/\\theta)^n\\exp\\big(t(\\frac1{2\\theta\'}-\\frac1{2\\theta})\\big)$ strictement croissante. Paramètre scalaire, hypothèse unilatérale, $T(Z)$ à densité : par le **Th. 1.3**, $\\phi=\\mathbb{1}_{\\{T>\\theta_0\\chi^2_{1-\\alpha}(2n)\\}}$ est U.P.P.($\\alpha$) pour $\\theta\\le\\theta_0$ contre $\\theta>\\theta_0$, de puissance croissante, donc de taille $\\beta_\\phi(\\theta_0)=\\alpha$.

**Q4.** Sous $\\mathbb{P}_\\theta$, $T/\\theta\\sim\\chi^2(2n)$ : $\\beta_\\phi(\\theta)=\\mathbb{P}\\big(\\chi^2(2n)>\\theta_0\\chi^2_{1-\\alpha}(2n)/\\theta\\big)$. Application : $\\chi^2_{0{,}95}(20)\\approx31{,}41$, $\\beta_\\phi(2)=\\mathbb{P}(\\chi^2(20)>15{,}705)\\approx0{,}735$.

**Q5.** Non : $p_\\theta(x)=x\\exp\\big(-\\frac1{2\\theta}x^2-\\ln\\theta\\big)$ est une famille exponentielle avec $T(x)=x^2$, $\\varphi(\\theta)=-\\frac1{2\\theta}$ strictement croissante, et $\\sum_iX_i^2$ est à densité (pas d’atome) : par la Prop. 1.1, il n’existe pas de test U.P.P.($\\alpha$) bilatéral (les tests optimaux à droite et à gauche diffèrent sur un ensemble de probabilité $\\alpha$ sous $\\mathbb{P}_{\\theta_0}$).`,
    bareme: [
      { label: 'Q1 loi de X² et de T', points: 0.75 },
      { label: 'Q2 Neyman-Pearson', points: 1 },
      { label: 'Q3 RVM + Th. 1.3', points: 1 },
      { label: 'Q4 puissance', points: 0.75 },
      { label: 'Q5 Prop. 1.1', points: 0.5 },
    ],
  },
]
