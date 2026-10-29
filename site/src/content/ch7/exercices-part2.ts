import type { Exercise } from '../types'

/** Étape suivante, associer, numériques, annales. */
export const exercisesPart2: Exercise[] = [
  // ------------------------------------------------------------------ Étape suivante
  {
    id: 'ch7-etape-gamma',
    type: 'etape-suivante',
    title: 'Chaîne complète pour l’EMV du modèle Gamma(2, θ)',
    source: 'PC7 Ex. 2 Q1, Q4, Q5',
    origin: 'pc',
    difficulty: 2,
    tags: ['emv', 'information-fisher', 'normalite-asymptotique', 'ic-asymptotique', 'gamma'],
    setup: 'Suite de $n$-échantillons de $\\Gamma(2,\\theta)$, densité $\\theta^2xe^{-\\theta x}\\mathbb{1}_{x>0}$ (intensité), $\\theta>0$.',
    steps: [
      {
        prompt: 'Étape 1 — Le score de l’échantillon $\\dot\\ell_n(\\theta)$ et l’EMV sont :',
        choices: [
          { text: '$\\dot\\ell_n(\\theta)=\\frac{2n}\\theta-\\sum_iX_i$, $\\hat\\theta_n=2/\\bar X_n$', correct: true, explanation: '$\\ell_n=C+2n\\ln\\theta-\\theta\\sum X_i$ ; $\\ddot\\ell_n=-2n/\\theta^2<0$ : maximum unique.' },
          { text: '$\\dot\\ell_n(\\theta)=\\frac n\\theta-\\sum_iX_i$, $\\hat\\theta_n=1/\\bar X_n$', correct: false, explanation: 'C’est le modèle exponentiel $\\Gamma(1,\\theta)$ : le facteur $\\theta^2$ de la densité donne $2n\\ln\\theta$.' },
          { text: '$\\dot\\ell_n(\\theta)=\\frac{2n}\\theta+\\sum_iX_i$, $\\hat\\theta_n=-2/\\bar X_n$', correct: false, explanation: 'Erreur de signe sur la dérivée de $-\\theta x$ ; l’estimateur serait négatif.' },
        ],
      },
      {
        prompt: 'Étape 2 — L’information de Fisher d’une observation est :',
        choices: [
          { text: '$\\mathbb{I}(\\theta)=-\\mathbb{E}_\\theta[\\ddot\\ell(\\theta,X_1)]=2/\\theta^2$', correct: true, explanation: '$\\ddot\\ell(\\theta,x)=-2/\\theta^2$ ne dépend pas de $x$ : la formule (10) est immédiate.' },
          { text: '$\\mathbb{I}(\\theta)=2n/\\theta^2$', correct: false, explanation: 'Information de l’échantillon ; le Thm 1.6 utilise celle d’**une** observation.' },
          { text: '$\\mathbb{I}(\\theta)=\\mathrm{Var}_\\theta(X_1)=2/\\theta^2$, par définition', correct: false, explanation: 'Valeur numérique juste par coïncidence, mais la justification est fausse : $\\mathbb{I}$ est la variance du **score**, pas de $X_1$.' },
        ],
      },
      {
        prompt: 'Étape 3 — La loi limite de $\\sqrt n(\\hat\\theta_n-\\theta)$ est :',
        choices: [
          { text: '$\\mathcal{N}(0,\\theta^2/2)$ (Thm 1.6 ; ou méthode-δ avec $g(x)=2/x$, $g\'(2/\\theta)=-\\theta^2/2$)', correct: true, explanation: '$1/\\mathbb{I}=\\theta^2/2$ ; route δ : $\\frac2{\\theta^2}\\cdot\\frac{\\theta^4}4=\\frac{\\theta^2}2$. Les trois routes du corrigé concordent.' },
          { text: '$\\mathcal{N}(0,2/\\theta^2)$', correct: false, explanation: 'C’est la variance limite de $\\sqrt n(\\bar X_n-2/\\theta)$, avant la méthode-δ.' },
          { text: '$\\mathcal{N}(0,\\theta^2/(2n))$', correct: false, explanation: 'Une loi limite ne dépend pas de $n$ ; $\\theta^2/(2n)$ est la variance approchée de $\\hat\\theta_n$.' },
        ],
      },
      {
        prompt: 'Étape 4 — Un IC de niveau asymptotique $1-\\alpha$ pour $\\theta$ est :',
        choices: [
          { text: '$\\big[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\,\\hat\\theta_n/\\sqrt{2n}\\big]$', correct: true, explanation: 'Pivot $\\sqrt n(\\hat\\theta_n-\\theta)/(\\theta/\\sqrt2)$, puis Slutsky pour remplacer $\\theta$ par $\\hat\\theta_n$ (consistance + continuité).' },
          { text: '$\\big[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\,\\hat\\theta_n^2/(2n)\\big]$', correct: false, explanation: 'Confusion variance / écart-type : la demi-largeur est $z\\sqrt{v(\\hat\\theta_n)/n}$.' },
          { text: '$\\big[\\hat\\theta_n\\pm z_{1-\\alpha}\\,\\hat\\theta_n/\\sqrt{2n}\\big]$', correct: false, explanation: 'IC bilatéral : quantile $z_{1-\\alpha/2}$.' },
        ],
      },
    ],
    conclusion: 'Application : $n=50$, $\\bar X_n=0{,}8$, $\\hat\\theta_n=2{,}5$, IC à 95 % $[2{,}01;2{,}99]$. L’EMV atteint la borne $1/\\mathbb{I}$ (Thm 1.7).',
  },
  {
    id: 'ch7-etape-lognormale',
    type: 'etape-suivante',
    title: 'Normalité asymptotique de l’EMV log-normal (θ, θ)',
    source: 'PC7 Ex. 3 Q2',
    origin: 'pc',
    difficulty: 3,
    tags: ['emv', 'normalite-asymptotique', 'lognormale', 'delta-methode'],
    setup: '$Y_i=\\log X_i\\sim\\mathcal{N}(\\theta,\\theta)$ i.i.d., $\\hat\\theta_n=\\varphi(\\bar T_n)-\\frac12$ avec $\\bar T_n=\\frac1n\\sum_iY_i^2$ et $\\varphi(z)=\\sqrt{\\frac14+z}$.',
    steps: [
      {
        prompt: 'Étape 1 — Espérance et variance de $Y_1^2$ (écrire $Y_1=\\theta+\\sqrt\\theta G$, $G\\sim\\mathcal{N}(0,1)$) :',
        choices: [
          { text: '$\\mathbb{E}[Y_1^2]=\\theta+\\theta^2$, $\\mathrm{Var}(Y_1^2)=2\\theta^2(1+2\\theta)$', correct: true, explanation: '$\\mathbb{E}[(\\theta+\\sqrt\\theta G)^4]=\\theta^4+6\\theta^3+3\\theta^2$ moins $(\\theta+\\theta^2)^2$.' },
          { text: '$\\mathbb{E}[Y_1^2]=\\theta^2$, $\\mathrm{Var}(Y_1^2)=2\\theta^2$', correct: false, explanation: 'Oubli de la variance $\\theta$ dans le moment d’ordre 2 et des termes croisés.' },
          { text: '$\\mathbb{E}[Y_1^2]=\\theta+\\theta^2$, $\\mathrm{Var}(Y_1^2)=2\\theta^2$', correct: false, explanation: '$2\\theta^2$ serait $\\mathrm{Var}((Y-\\theta)^2)$ ; ici $Y$ n’est pas centrée, le terme $4\\theta^3$ apparaît.' },
        ],
      },
      {
        prompt: 'Étape 2 — Quel outil appliquer à $\\sqrt n(\\bar T_n-(\\theta+\\theta^2))\\Rightarrow\\mathcal{N}(0,2\\theta^2(1+2\\theta))$ pour obtenir la loi limite de $\\hat\\theta_n$ ?',
        choices: [
          { text: 'La méthode-δ (ch.6, Thm 1.7) avec $\\varphi$, dérivable en $\\theta+\\theta^2$, $\\varphi\'(\\theta+\\theta^2)=\\frac1{1+2\\theta}$', correct: true, explanation: '$\\varphi(\\theta+\\theta^2)=\\theta+\\frac12$ et $\\varphi\'(z)=\\frac1{2\\sqrt{1/4+z}}$.' },
          { text: 'Le lemme de Slutsky seul', correct: false, explanation: 'Slutsky ne transporte pas une convergence en loi par une fonction non linéaire.' },
          { text: 'Le Thm 1.2 (LGN uniforme)', correct: false, explanation: 'Outil de consistance, pas de loi limite.' },
        ],
      },
      {
        prompt: 'Étape 3 — La variance asymptotique de $\\hat\\theta_n$ est :',
        choices: [
          { text: '$\\sigma_0^2(\\theta)=\\frac{2\\theta^2}{1+2\\theta}$', correct: true, explanation: '$\\varphi\'^2\\cdot\\sigma^2(\\theta)=\\frac{2\\theta^2(1+2\\theta)}{(1+2\\theta)^2}$ ; c’est $1/\\mathbb{I}(\\theta)$, et $<\\theta$ = variance de $\\bar Y_n$.' },
          { text: '$2\\theta^2(1+2\\theta)$', correct: false, explanation: 'Oubli du facteur $\\varphi\'^2$.' },
          { text: '$\\frac{2\\theta^2}{\\sqrt{1+2\\theta}}$', correct: false, explanation: 'La dérivée doit être **élevée au carré**.' },
        ],
      },
    ],
    conclusion: 'Vérification par le Thm 1.6 : $\\dot\\ell(\\theta,y)=-\\frac1{2\\theta}+\\frac{y^2}{2\\theta^2}-\\frac12$, $\\mathbb{I}(\\theta)=\\frac{\\mathrm{Var}(Y^2)}{4\\theta^4}=\\frac{1+2\\theta}{2\\theta^2}$ : même résultat. IC : $\\big[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\sigma_0(\\hat\\theta_n)/\\sqrt n\\big]$.',
  },
  {
    id: 'ch7-etape-vgamma',
    type: 'etape-suivante',
    title: 'Variance asymptotique des Z-estimateurs de translation',
    source: 'PC7 Ex. 5 Q5–Q6',
    origin: 'pc',
    difficulty: 2,
    tags: ['z-estimateur', 'variance-asymptotique', 'robustesse', 'mediane'],
    setup: '$q_\\theta(x)=f(x-\\theta)$, $f$ symétrique, $\\psi(\\theta,x)=\\gamma(x-\\theta)$ avec $\\gamma$ impaire, croissante, $C^1$, $\\int\\gamma^2f<\\infty$, $\\int\\gamma\'f>0$ et domination (H3).',
    steps: [
      {
        prompt: 'Étape 1 — Par le Thm 1.4, la variance asymptotique est :',
        choices: [
          { text: '$V[\\gamma]=\\dfrac{\\int\\gamma^2(x)f(x)\\,\\mathrm{d}x}{\\big(\\int\\gamma\'(x)f(x)\\,\\mathrm{d}x\\big)^2}$', correct: true, explanation: '$\\psi\'(\\theta,x)=-\\gamma\'(x-\\theta)$ ; le signe disparaît au carré ; translation $x\\to x+\\theta_0$.' },
          { text: '$V[\\gamma]=\\int\\gamma^2(x)f(x)\\,\\mathrm{d}x$', correct: false, explanation: 'Oubli de la pente au dénominateur.' },
          { text: '$V[\\gamma]=\\dfrac{\\int\\gamma^2(x-\\theta_0)f(x)\\,\\mathrm{d}x}{\\int\\gamma\'(x-\\theta_0)f(x)\\,\\mathrm{d}x}$', correct: false, explanation: 'Mauvais centrage (on intègre contre $f(x-\\theta_0)$, pas $f(x)$) et carré manquant.' },
        ],
      },
      {
        prompt: 'Étape 2 — Cas gaussien $f=\\mathcal{N}(0,\\sigma^2)$ et $\\gamma_\\infty(x)=x$ :',
        choices: [
          { text: '$V[\\gamma_\\infty]=\\sigma^2$ (moyenne empirique, EMV : borne $1/\\mathbb{I}$ atteinte)', correct: true, explanation: '$\\int x^2f=\\sigma^2$, $\\int1\\cdot f=1$.' },
          { text: '$V[\\gamma_\\infty]=1$', correct: false, explanation: 'Vrai seulement si $\\sigma^2=1$.' },
          { text: '$V[\\gamma_\\infty]=\\pi\\sigma^2/2$', correct: false, explanation: 'C’est la médiane ($\\gamma_0$).' },
        ],
      },
      {
        prompt: 'Étape 3 — Cas $\\gamma_0=\\operatorname{signe}$ (calcul formel avec $\\operatorname{signe}\'=2\\delta_0$) :',
        choices: [
          { text: '$V[\\gamma_0]=\\dfrac1{(2f(0))^2}=\\dfrac{\\pi\\sigma^2}2$', correct: true, explanation: '$\\int\\gamma_0^2f=1$, « $\\int\\gamma_0\'f$ » $=2f(0)=\\sqrt{2/(\\pi\\sigma^2)}$. Calcul formel : le Thm 1.4 ne s’applique pas, mais la formule rejoint $1/(4f(0)^2)$ (statistiques d’ordre).' },
          { text: '$V[\\gamma_0]=+\\infty$ car $\\gamma_0\'=0$ presque partout', correct: false, explanation: 'La dérivée au sens des distributions est $2\\delta_0$, pas $0$ ; la médiane est bien asymptotiquement normale.' },
          { text: '$V[\\gamma_0]=\\dfrac{2\\sigma^2}\\pi$', correct: false, explanation: 'Inversion : $2/\\pi$ est l’efficacité relative médiane / moyenne.' },
        ],
      },
      {
        prompt: 'Étape 4 — Pour $\\gamma_k$ (Huber) dans le cas gaussien, $k\\mapsto V[\\gamma_k]$ :',
        choices: [
          { text: 'décroît de $\\pi\\sigma^2/2$ ($k\\to0$) à $\\sigma^2$ ($k\\to\\infty$)', correct: true, explanation: 'Sans contamination, la moyenne est optimale ; Huber perd très peu dès $k\\gtrsim1{,}5$ ($V\\approx1{,}04$ pour $\\sigma=1$).' },
          { text: 'est minimale en $k\\approx2$ puis remonte', correct: false, explanation: 'C’est le comportement du cas **contaminé** (Q7), pas du cas gaussien pur.' },
          { text: 'est constante égale à $\\sigma^2$', correct: false, explanation: 'Elle dépend de $k$ et vaut $\\pi\\sigma^2/2$ à la limite $k\\to0$.' },
        ],
      },
    ],
    conclusion: 'Avec contamination $(1-\\varepsilon)\\mathcal{N}(0,1)+\\varepsilon\\mathcal{N}(0,\\tau^2)$ : $V[\\gamma_\\infty]=(1-\\varepsilon)+\\varepsilon\\tau^2\\to\\infty$ quand $\\tau\\to\\infty$, tandis que $V[\\gamma_k]$ reste bornée : intérêt des fonctions d’influence bornées.',
  },
  {
    id: 'ch7-etape-ex15',
    type: 'etape-suivante',
    title: 'Vérifier (H-1)–(H-3) pour les moindres carrés',
    source: 'Poly ch.7, Ex. 1.5',
    origin: 'poly',
    difficulty: 2,
    tags: ['consistance', 'm-estimateur', 'convergence-uniforme'],
    setup: 'Translation, $\\int xq=0$, $\\sigma^2=\\int x^2q<\\infty$, $\\Theta$ segment borné, $m(\\theta,x)=-(x-\\theta)^2$.',
    steps: [
      {
        prompt: 'Étape 1 — La fonction limite est :',
        choices: [
          { text: '$\\mathsf{M}_{\\theta^\\star}(\\theta)=-\\sigma^2-(\\theta^\\star-\\theta)^2$', correct: true, explanation: 'Changement de variable, terme croisé nul car $\\int xq=0$.' },
          { text: '$\\mathsf{M}_{\\theta^\\star}(\\theta)=-(\\theta^\\star-\\theta)^2$', correct: false, explanation: 'Oubli du terme $-\\sigma^2$ (sans effet sur l’argmax, mais faux).' },
          { text: '$\\mathsf{M}_{\\theta^\\star}(\\theta)=-\\frac1n\\sum_i(X_i-\\theta)^2$', correct: false, explanation: 'C’est la fonction **empirique** $\\widehat{M}_n$, aléatoire.' },
        ],
      },
      {
        prompt: 'Étape 2 — Une majoration de $\\sup_{\\theta\\in\\Theta}|\\widehat{M}_n(\\theta)-\\mathsf{M}_{\\theta^\\star}(\\theta)|$ est :',
        choices: [
          { text: '$\\big|\\frac1n\\sum_i(X_i-\\theta^\\star)^2-\\sigma^2\\big|+2\\,\\mathrm{diam}(\\Theta)\\,|\\bar X_n-\\theta^\\star|$', correct: true, explanation: 'Développement de $\\{(X_i-\\theta^\\star)+(\\theta^\\star-\\theta)\\}^2$ et $|\\theta-\\theta^\\star|\\le\\mathrm{diam}(\\Theta)$.' },
          { text: '$\\big|\\frac1n\\sum_i(X_i-\\theta^\\star)^2-\\sigma^2\\big|$', correct: false, explanation: 'On a oublié le terme croisé $2(\\theta-\\theta^\\star)(\\bar X_n-\\theta^\\star)$, qui dépend de $\\theta$.' },
          { text: '$2|\\theta-\\theta^\\star|\\,|\\bar X_n-\\theta^\\star|$', correct: false, explanation: 'Dépend encore de $\\theta$ : ce n’est pas une borne uniforme (et il manque le premier terme).' },
        ],
      },
      {
        prompt: 'Étape 3 — Pourquoi cette borne tend-elle vers 0 en probabilité ?',
        choices: [
          { text: 'LGN pour $(X_i-\\theta^\\star)^2$ et pour $X_i$, et $\\mathrm{diam}(\\Theta)<\\infty$', correct: true, explanation: 'C’est le caractère **borné** de $\\Theta$ qui rend la convergence uniforme : c’est (H-1).' },
          { text: 'TCL pour $\\bar X_n$', correct: false, explanation: 'Le TCL donne une loi limite à l’échelle $\\sqrt n$ ; ici il suffit de la LGN.' },
          { text: 'Parce que $\\widehat{M}_n$ est concave', correct: false, explanation: 'La concavité sert à identifier le maximum, pas à la convergence uniforme.' },
        ],
      },
      {
        prompt: 'Étape 4 — (H-2) est vérifiée car :',
        choices: [
          { text: '$\\mathsf{M}_{\\theta^\\star}$ est continue et strictement maximale en $\\theta^\\star$ sur le compact $\\Theta$ (Lemme 1.1)', correct: true, explanation: 'Sur un compact, maximum unique + continuité ⇒ maximum isolé.' },
          { text: '$\\widehat{M}_n$ a un unique maximum $\\bar X_n$', correct: false, explanation: '(H-2) porte sur la fonction **limite**, pas sur la fonction empirique.' },
          { text: 'par le TCL', correct: false, explanation: '(H-2) est une propriété déterministe ; aucun aléa.' },
        ],
      },
    ],
    conclusion: 'Le Thm 1.1 donne la consistance de $\\bar X_n$ — « évidemment maladroit » ici (la LGN suffit), mais la démarche est celle qu’on suit quand l’estimateur n’est pas explicite.',
  },
  {
    id: 'ch7-etape-cauchy',
    type: 'etape-suivante',
    title: 'Information de Fisher du modèle de Cauchy et efficacité de la médiane',
    source: 'Poly ch.7, Ex. 1.9 et §4.8',
    origin: 'poly',
    difficulty: 3,
    tags: ['information-fisher', 'efficacite', 'cauchy', 'mediane'],
    setup: '$q_\\theta(x)=\\frac1{\\pi(1+(x-\\theta)^2)}$.',
    steps: [
      {
        prompt: 'Étape 1 — Le score est :',
        choices: [
          { text: '$\\dot\\ell(\\theta,x)=\\dfrac{2(x-\\theta)}{1+(x-\\theta)^2}$', correct: true, explanation: 'Dérivée en $\\theta$ de $-\\log\\pi-\\log(1+(x-\\theta)^2)$.' },
          { text: '$\\dot\\ell(\\theta,x)=\\dfrac{-2(x-\\theta)}{1+(x-\\theta)^2}$', correct: false, explanation: 'Erreur de signe : dériver $(x-\\theta)^2$ en $\\theta$ donne $-2(x-\\theta)$, et le $-\\log$ redonne $+$.' },
          { text: '$\\dot\\ell(\\theta,x)=x-\\theta$', correct: false, explanation: 'C’est le score gaussien ; il n’est pas borné, alors que celui de Cauchy l’est.' },
        ],
      },
      {
        prompt: 'Étape 2 — Après $u=x-\\theta$ puis $u=\\tan t$, $\\mathbb{I}(\\theta)=\\int\\frac{4u^2}{(1+u^2)^2}\\frac{\\mathrm{d}u}{\\pi(1+u^2)}$ vaut :',
        choices: [
          { text: '$\\frac4\\pi\\int_{-\\pi/2}^{\\pi/2}\\sin^2t\\cos^2t\\,\\mathrm{d}t=\\frac12$', correct: true, explanation: '$\\frac1\\pi\\int\\sin^2(2t)\\,\\mathrm{d}t=\\frac1\\pi\\cdot\\frac\\pi2$ ; indépendant de $\\theta$ (translation).' },
          { text: '$1$', correct: false, explanation: 'Valeur gaussienne ($\\sigma=1$).' },
          { text: '$+\\infty$, car Cauchy n’a pas de moment', correct: false, explanation: 'Le score est borné, donc de carré intégrable : l’information est finie même sans moment de $X$.' },
        ],
      },
      {
        prompt: 'Étape 3 — L’efficacité relative médiane / EMV, $\\frac{1/\\mathbb{I}}{1/(4q_{\\theta}(\\theta)^2)}$, vaut :',
        choices: [
          { text: '$\\frac{2}{\\pi^2/4}=\\frac8{\\pi^2}\\approx0{,}81$', correct: true, explanation: 'La médiane demande $\\approx1{,}23\\,n$ observations pour la précision de l’EMV.' },
          { text: '$\\frac2\\pi\\approx0{,}64$', correct: false, explanation: 'Efficacité de la médiane dans le cas **gaussien**.' },
          { text: '$\\frac{\\pi^2}8\\approx1{,}23$', correct: false, explanation: 'C’est l’inverse (rapport des tailles d’échantillon), pas l’efficacité.' },
        ],
      },
    ],
    conclusion: 'Conforme au Thm 1.7 ($v_\\psi\\ge1/\\mathbb{I}=2$). La médiane reste un bon point de départ : un pas de score de Fisher la rend efficace (Thm 4.5, hors programme).',
  },
  // ------------------------------------------------------------------ Associer
  {
    id: 'ch7-assoc-psi-estimateur',
    type: 'associer',
    title: 'Fonction objectif / d’influence ↔ estimateur',
    source: 'Poly ch.7, Ex. 1.1–1.4 ; PC7 Ex. 5 Q1(c)',
    origin: 'poly',
    difficulty: 1,
    tags: ['m-estimateur', 'z-estimateur', 'cours'],
    prompt: 'Associer chaque fonction à l’estimateur qu’elle définit (modèle de translation pour les trois dernières).',
    pairs: [
      { left: '$m(\\theta,x)=\\log q_\\theta(x)$ (à maximiser)', right: 'estimateur du maximum de vraisemblance', explanation: 'Ex. 1.1 : $\\mathsf{M}_{\\theta^\\star}=\\mathrm{Ent}-\\mathrm{KL}$.' },
      { left: '$\\psi(\\theta,x)=x-\\theta$ (à annuler)', right: 'moyenne empirique $\\bar X_n$', explanation: 'Ex. 1.2 ; aussi M-estimateur pour $m=-\\frac12(x-\\theta)^2$ (Ex. 1.3).' },
      { left: '$\\psi(\\theta,x)=\\operatorname{signe}(x-\\theta)$', right: 'médiane empirique', explanation: 'Ex. 1.4 ; pas de zéro exact garanti, non unique pour $n$ pair.' },
      { left: '$\\psi(\\theta,x)=\\gamma_k(x-\\theta)$, $\\gamma_k(u)=\\max(-k,\\min(u,k))$', right: 'estimateur de Huber (fonction d’influence tronquée)', explanation: 'PC7 Ex. 5 : compromis entre médiane ($k\\to0$) et moyenne ($k\\to\\infty$).' },
    ],
  },
  {
    id: 'ch7-assoc-hyp-theoreme',
    type: 'associer',
    title: 'Hypothèse caractéristique ↔ résultat du chapitre',
    source: 'Poly ch.7, Prop. 1.1, Thm 1.1–1.4, Thm 1.7',
    origin: 'poly',
    difficulty: 2,
    tags: ['hypotheses', 'cours'],
    prompt: 'Associer chaque jeu d’hypothèses au résultat du poly dont il est l’hypothèse caractéristique.',
    pairs: [
      { left: '$\\sup_\\theta|\\widehat{M}_n-\\mathsf{M}_{\\theta^\\star}|\\to0$ en probabilité et maximum isolé', right: 'Thm 1.1 (consistance des M-estimateurs)', explanation: '(H-1) et (H-2).' },
      { left: '$K$ compact, $\\phi(\\cdot,x)$ continue, $\\int\\sup_K|\\phi|\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}<\\infty$', right: 'Thm 1.2 (loi des grands nombres uniforme)', explanation: 'Recouvrement fini + module de continuité.' },
      { left: '$\\inf_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\|\\Psi_{\\theta^\\star}(\\theta)\\|>0$ (zéro isolé)', right: 'Thm 1.3 (consistance des Z-estimateurs)', explanation: '(Hz-2) ; on maximise $-\\|\\widehat\\Psi_n\\|$.' },
      { left: 'Consistance, $\\psi$ $C^1$ dominée près de $\\theta^\\star$, $\\mathbb{E}[\\psi\']\\ne0$, $\\theta^\\star\\in\\Theta^o$', right: 'Thm 1.4 (normalité asymptotique des Z-estimateurs)', explanation: 'TCL, LGN, Slutsky.' },
      { left: 'Modèle régulier (R-1)–(R-3), $\\Theta$ ouvert', right: 'Thm 1.7 (optimalité asymptotique de l’EMV)', explanation: 'Dérivation sous l’intégrale puis Cauchy-Schwarz.' },
      { left: '$m(\\cdot,x)$ différentiable et maximum atteint en un point intérieur', right: 'Prop. 1.1 (un M-estimateur régulier est un Z-estimateur)', explanation: 'Condition du premier ordre.' },
    ],
  },
  {
    id: 'ch7-assoc-modele-variance',
    type: 'associer',
    title: 'Modèle ↔ variance asymptotique de l’EMV (1/𝕀)',
    source: 'Poly ch.7, Ex. 1.6–1.9 ; PC7 Ex. 2–3',
    origin: 'variante',
    difficulty: 2,
    tags: ['information-fisher', 'emv', 'variance-asymptotique'],
    prompt: 'Associer chaque modèle (une observation) à la variance $1/\\mathbb{I}(\\theta)$ de la loi limite de $\\sqrt n(\\hat\\theta_n^{\\mathrm{MV}}-\\theta)$.',
    pairs: [
      { left: '$\\mathcal{N}(\\theta,\\sigma^2)$, $\\sigma^2$ connu', right: '$\\sigma^2$', explanation: 'Ex. 1.6 : $\\mathbb{I}=\\sigma^{-2}$.' },
      { left: '$\\mathcal{P}\\mathrm{oi}(\\theta)$', right: '$\\theta$', explanation: 'Ex. 1.7–1.8 : $\\mathbb{I}=1/\\theta$.' },
      { left: '$\\Gamma(2,\\theta)$ (intensité)', right: '$\\theta^2/2$', explanation: 'PC7 Ex. 2 : $\\mathbb{I}=2/\\theta^2$.' },
      { left: '$\\mathcal{E}(\\theta)$ (intensité)', right: '$\\theta^2$', explanation: '$\\mathbb{I}=1/\\theta^2$ ; EMV $1/\\bar X_n$ (ch.6, Ex. 1.7).' },
      { left: 'Cauchy de translation', right: '$2$', explanation: 'Ex. 1.9 : $\\mathbb{I}=1/2$.' },
      { left: 'Log-normale de paramètre $(\\theta,\\theta)$', right: '$\\frac{2\\theta^2}{1+2\\theta}$', explanation: 'PC7 Ex. 3 : méthode-δ ou $\\mathbb{I}=\\frac{1+2\\theta}{2\\theta^2}$.' },
    ],
  },
  // ------------------------------------------------------------------ Numériques
  {
    id: 'ch7-num-efficacite-cauchy',
    type: 'numerique',
    title: 'Efficacité relative de la médiane pour Cauchy',
    source: 'Poly ch.7, Ex. 1.9 et §4.8',
    origin: 'poly',
    difficulty: 1,
    tags: ['efficacite', 'cauchy', 'mediane'],
    question: 'Modèle de Cauchy : variance asymptotique de l’EMV $2$, de la médiane $\\pi^2/4$. Calculer l’efficacité relative $v_{\\mathrm{EMV}}/v_{\\mathrm{med}}$.',
    answer: 8 / (Math.PI * Math.PI),
    tolerance: 0.01,
    hint: 'Arrondir à 0,01.',
    explanation: '$\\frac{2}{\\pi^2/4}=\\frac8{\\pi^2}\\approx0{,}81$ : la médiane demande environ $1/0{,}81\\approx1{,}23$ fois plus d’observations pour la même précision asymptotique.',
  },
  {
    id: 'ch7-num-ic-lognormale',
    type: 'numerique',
    title: 'Borne supérieure d’un IC asymptotique (log-normale (θ, θ))',
    source: 'PC7 Ex. 3 Q3 (application numérique de l’extraction)',
    origin: 'pc',
    difficulty: 2,
    tags: ['ic-asymptotique', 'lognormale', 'emv'],
    question: 'Log-normale $(\\theta,\\theta)$, $n=100$, $\\frac1n\\sum_iY_i^2=2$. L’EMV vaut $\\hat\\theta_n=-\\frac12+\\sqrt{\\frac14+2}$ et l’IC asymptotique à 95 % est $\\big[\\hat\\theta_n\\pm1{,}96\\,\\sigma_0(\\hat\\theta_n)/\\sqrt n\\big]$ avec $\\sigma_0(\\theta)=\\sqrt2\\,\\theta/\\sqrt{1+2\\theta}$. Calculer la **borne supérieure**.',
    answer: 1 + (1.96 * Math.sqrt(2 / 3)) / 10,
    tolerance: 0.005,
    hint: 'Arrondir à 0,01.',
    explanation: '$\\hat\\theta_n=-0{,}5+1{,}5=1$ ; $\\sigma_0(1)=\\sqrt{2/3}\\approx0{,}816$ ; demi-largeur $1{,}96\\times0{,}816/10\\approx0{,}160$ ; borne supérieure $\\approx1{,}16$.',
  },
  {
    id: 'ch7-num-bord',
    type: 'numerique',
    title: 'Probabilité que l’EMV soit au bord',
    source: 'PC7 Ex. 4 (résultats numériques)',
    origin: 'pc',
    difficulty: 2,
    tags: ['bord', 'emv'],
    question: '$\\mathcal{N}(\\theta,1)$, $\\Theta=\\mathbb{R}_+$, $\\hat\\theta_n=\\max(\\bar X_n,0)$. Pour $\\theta=0{,}1$ et $n=100$, calculer $\\mathbb{P}_{n,\\theta}(\\hat\\theta_n=0)$ ($\\Phi(-1)\\approx0{,}1587$).',
    answer: 0.1587,
    tolerance: 0.003,
    hint: 'Arrondir à 0,001.',
    explanation: '$\\mathbb{P}(\\bar X_n<0)=\\mathbb{P}(\\sqrt n(\\bar X_n-\\theta)<-\\sqrt n\\theta)=\\Phi(-1)\\approx0{,}159$. Pour $n=400$ : $\\Phi(-2)\\approx0{,}023$ ; pour $\\theta=0$ : $1/2$ pour tout $n$.',
  },
  {
    id: 'ch7-num-eqm-gamma',
    type: 'numerique',
    title: 'Risque quadratique exact de l’EMV Gamma(2, θ)',
    source: 'PC7 Ex. 2 Q2',
    origin: 'pc',
    difficulty: 2,
    tags: ['emv', 'risque-quadratique', 'gamma'],
    question: 'Pour $\\Gamma(2,\\theta)$ et $\\hat\\theta_n=2/\\bar X_n$ : $EQM(\\hat\\theta_n)=\\theta^2\\,\\frac{n+1}{(2n-1)(n-1)}$. Calculer $EQM$ pour $n=5$, $\\theta=1$, et comparer à l’approximation asymptotique $\\theta^2/(2n)=0{,}1$.',
    answer: 6 / 36,
    tolerance: 0.002,
    hint: 'Arrondir à 0,001.',
    explanation: '$\\frac{6}{9\\times4}=\\frac16\\approx0{,}167$, nettement plus que $0{,}1=1/(n\\mathbb{I})$ : à $n$ petit, la variance asymptotique sous-estime le risque (biais $\\theta/(2n-1)=1/9$ et variance plus grande). $n\\,EQM\\to\\theta^2/2$ quand $n\\to\\infty$.',
  },
  // ------------------------------------------------------------------ Annales
  {
    id: 'ch7-annale-2025',
    type: 'annale',
    title: 'Examen 2025 Ex. 2 (Q7, Q8, Q10) — EMV, médiane et efficacité asymptotique (log-normale)',
    source: 'Examen 2025 Ex. 2 Q7–Q8 et Q10',
    origin: 'annale',
    difficulty: 2,
    tags: ['emv', 'information-fisher', 'mediane', 'efficacite', 'annale-2025'],
    durationMin: 25,
    statement: `Soit un $n$-échantillon de la loi log-normale $LN(\\mu,\\sigma^2)$, $X=e^{\\mu+\\sigma\\xi}$, $\\xi\\sim\\mathcal{N}(0,1)$, $\\theta=(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*$ ; le modèle est **régulier** (admis). On note $Y_i=\\ln X_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$ ; l’EMV est $\\hat\\mu_{ML}=\\bar Y_n$, $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2$.

**Rappel du sujet** : TCL du quantile empirique, $\\sqrt n(\\hat q_\\alpha-q_\\alpha)\\overset{d}{\\to}\\mathcal{N}\\big(0,\\frac{\\alpha(1-\\alpha)}{f(q_\\alpha)^2}\\big)$.

**Q1 (Q7).** Calculer l’information de Fisher $\\mathbb{I}(\\mu,\\sigma^2)$ d’une observation. En déduire, par le théorème de normalité asymptotique de l’EMV, la loi limite de $\\sqrt n\\big((\\hat\\mu_{ML},\\widehat{\\sigma^2}_{ML})-(\\mu,\\sigma^2)\\big)$, et vérifier la cohérence avec le calcul direct par TCL multivarié (covariance $\\mathrm{diag}(\\sigma^2,2\\sigma^4)$).

**Q2 (Q8).** Soit $\\tilde X_n$ la médiane empirique ($n$ impair). Proposer un estimateur $\\hat\\mu_{Med}$ de $\\mu$ fondé sur $\\tilde X_n$ et montrer que $\\sqrt n(\\hat\\mu_{Med}-\\mu)\\overset{d}{\\to}\\mathcal{N}(0,C\\sigma^2)$ ; donner $C$.

**Q3 (Q10).** On admet que l’estimateur des moments vérifie $\\sqrt n(\\hat\\mu_{Mom}-\\mu)\\Rightarrow\\mathcal{N}(0,v_{Mom})$ avec $v_{Mom}=4(e^{\\sigma^2}-1)-2(e^{2\\sigma^2}-1)+\\frac14(e^{4\\sigma^2}-1)$. Comparer asymptotiquement $\\hat\\mu_{ML}$, $\\hat\\mu_{Med}$, $\\hat\\mu_{Mom}$ quand $\\sigma\\to0$ et $\\sigma\\to\\infty$ ; quel résultat du cours garantit que l’EMV est le meilleur des trois ?`,
    hints: [
      'Q1 : la densité de $X$ vaut celle de $Y$ divisée par $x$ ; le facteur $1/x$ ne dépend pas de $\\theta$ et disparaît des dérivées. Calculer la hessienne de $\\ell(\\mu,v;y)=-\\frac12\\log(2\\pi v)-\\frac{(y-\\mu)^2}{2v}$ et utiliser $\\mathbb{I}=-\\mathbb{E}[\\mathrm{H}_\\ell]$.',
      'Q2 : la médiane de $LN(\\mu,\\sigma^2)$ est $e^\\mu$ ($\\ln$ croissante) ; $\\hat\\mu_{Med}=\\ln\\tilde X_n$ est la médiane des $Y_i$ ; rappel avec $\\alpha=1/2$ et $f(\\mu)=1/\\sqrt{2\\pi\\sigma^2}$.',
      'Q3 : Thm 1.7 du ch.7 (borne $1/\\mathbb{I}$ pour les Z-estimateurs réguliers) ; développement $v_{Mom}=\\sigma^2+\\frac23\\sigma^6+\\dots$ et équivalent $\\frac14e^{4\\sigma^2}$.',
    ],
    correction: `**Q1.** La densité de $X$ est $p_\\theta(x)=\\frac{1}{x\\sqrt{2\\pi\\sigma^2}}e^{-(\\ln x-\\mu)^2/2\\sigma^2}\\mathbb{1}_{x>0}$ ; avec $v=\\sigma^2$ et $y=\\ln x$, $\\ell(\\mu,v;x)=-\\ln x-\\frac12\\log(2\\pi v)-\\frac{(y-\\mu)^2}{2v}$, le terme $-\\ln x$ étant constant en $\\theta$. Dérivées :

$$\\partial_\\mu\\ell=\\frac{y-\\mu}v,\\quad\\partial_v\\ell=-\\frac1{2v}+\\frac{(y-\\mu)^2}{2v^2},\\quad\\partial^2_{\\mu}\\ell=-\\frac1v,\\quad\\partial_\\mu\\partial_v\\ell=-\\frac{y-\\mu}{v^2},\\quad\\partial^2_v\\ell=\\frac1{2v^2}-\\frac{(y-\\mu)^2}{v^3}.$$

Le modèle étant régulier, $\\mathbb{I}(\\theta)=-\\mathbb{E}_\\theta[\\mathrm{H}_\\ell]$ (éq. (10), version matricielle) ; avec $\\mathbb{E}[Y-\\mu]=0$ et $\\mathbb{E}[(Y-\\mu)^2]=v$ :

$$\\mathbb{I}(\\mu,\\sigma^2)=\\begin{pmatrix}1/\\sigma^2&0\\\\0&1/(2\\sigma^4)\\end{pmatrix}.$$

L’EMV est consistant et l’équation de vraisemblance est satisfaite en un point intérieur ; par le théorème de normalité asymptotique de l’EMV (Poly ch.7, Thm 1.6, dans sa version vectorielle, compléments §4.4), $\\sqrt n(\\hat\\theta_{ML}-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\mathbb{I}(\\theta)^{-1})=\\mathcal{N}\\big(0,\\mathrm{diag}(\\sigma^2,2\\sigma^4)\\big)$. C’est exactement la covariance obtenue directement par le TCL multivarié appliqué à $W_i=(Y_i-\\mu,(Y_i-\\mu)^2-\\sigma^2)$ et Slutsky (ch.6) : les deux méthodes concordent.

**Q2.** $\\ln$ est croissante et la médiane de $\\mathcal{N}(\\mu,\\sigma^2)$ est $\\mu$, donc la médiane de $X$ est $e^\\mu$ ; on pose $\\hat\\mu_{Med}:=\\ln\\tilde X_n=\\mathrm{med}(Y_1,\\dots,Y_n)$. Le rappel appliqué aux $Y_i$ avec $\\alpha=\\frac12$, $q_{1/2}=\\mu$, $f(\\mu)=\\frac1{\\sqrt{2\\pi\\sigma^2}}$ (densité continue et $>0$ en $\\mu$) donne

$$\\sqrt n(\\hat\\mu_{Med}-\\mu)\\overset{d}{\\longrightarrow}\\mathcal{N}\\Big(0,\\frac{1/4}{1/(2\\pi\\sigma^2)}\\Big)=\\mathcal{N}\\Big(0,\\frac\\pi2\\sigma^2\\Big),\\qquad C=\\frac\\pi2\\approx1{,}57.$$

C’est la formule $1/(4q_{\\theta^\\star}(\\theta^\\star)^2)$ de la médiane (Poly ch.7, Ex. 1.9, §4.8) ; elle ne découle **pas** du Thm 1.4, la fonction $\\operatorname{signe}$ n’étant pas dérivable.

**Q3.** Variances asymptotiques : $v_{ML}=\\sigma^2$, coefficient $(1,1)$ de $\\mathbb{I}^{-1}$ (égal à $1/\\mathbb{I}_{\\mu\\mu}$ car $\\mathbb{I}$ est diagonale) ; $v_{Med}=\\frac\\pi2\\sigma^2$ ; $v_{Mom}=\\sigma^2+\\frac23\\sigma^6+\\frac32\\sigma^8+O(\\sigma^{10})$ quand $\\sigma\\to0$ et $v_{Mom}\\sim\\frac14e^{4\\sigma^2}$ quand $\\sigma\\to\\infty$. Par la comparaison des variances asymptotiques (ch.6, Prop. 1.3) :

- $\\sigma\\to0$ : $v_{ML}\\approx v_{Mom}<v_{Med}$ (moments quasi efficaces, médiane à $2/\\pi\\approx64\\,\\%$) ;
- $\\sigma\\to\\infty$ : $v_{ML}<v_{Med}\\ll v_{Mom}$ (les moments empiriques d’une loi à queue lourde ont une variance qui explose).

Le **Thm 1.7 du ch.7** (modèle régulier, $\\Theta$ ouvert) garantit $v_\\psi\\ge1/\\mathbb{I}$ pour tout Z-estimateur régulier : l’EMV, qui atteint cette borne, est asymptotiquement efficace dans cette classe ; $\\hat\\mu_{Mom}$ (Z-estimateur associé aux moments) ne peut pas faire mieux, et l’inégalité vaut aussi pour la médiane, dont la variance se compare directement. Intérêts : EMV optimal et explicite ; médiane robuste (fonction d’influence bornée, aucune hypothèse de moment) ; moments simples mais inadaptés aux queues lourdes.`,
    bareme: [
      { label: 'Q1 information de Fisher (hessienne, espérance)', points: 0.5 },
      { label: 'Q1 loi limite par le Thm 1.6 et cohérence avec le TCL', points: 0.5 },
      { label: 'Q2 estimateur ln(médiane) et C = π/2', points: 0.75 },
      { label: 'Q3 classement σ → 0 et σ → ∞', points: 0.5 },
      { label: 'Q3 citation du Thm 1.7 et discussion robustesse', points: 0.25 },
    ],
  },
  {
    id: 'ch7-annale-pc7-gamma',
    type: 'annale',
    title: 'PC7 Ex. 2 — Modèle Gamma(2, θ) : la chaîne complète',
    source: 'PC7 Ex. 2 Q1–Q5',
    origin: 'pc',
    difficulty: 2,
    tags: ['emv', 'biais', 'risque-quadratique', 'information-fisher', 'ic-asymptotique', 'gamma'],
    durationMin: 30,
    statement: `Pour $(a,b)\\in\\mathbb{R}_+^*\\times\\mathbb{R}_+^*$, $\\Gamma(a,b)$ a pour densité $x\\mapsto\\frac{b^a}{\\Gamma(a)}x^{a-1}e^{-bx}\\mathbb{1}_{x>0}$, d’espérance $a/b$ et de variance $a/b^2$ ; si $X\\sim\\Gamma(a,b)$ et $Y\\sim\\Gamma(a',b)$ sont indépendantes, $X+Y\\sim\\Gamma(a+a',b)$. Soit une suite de $n$-échantillons du modèle $\\{\\Gamma(2,\\theta):\\theta\\in\\mathbb{R}_+^*\\}$.

**Q1.** Calculer l’estimateur du maximum de vraisemblance de $\\theta$.

**Q2.** Calculer son biais et son risque quadratique.

**Q3.** Montrer qu’il est consistant.

**Q4.** Prouver sa normalité asymptotique.

**Q5.** Donner un intervalle de confiance asymptotique de niveau $1-\\alpha$ pour $\\theta$.`,
    hints: [
      'Q1 : $\\ell_n(\\theta)=C+2n\\ln\\theta-\\theta\\sum X_i$, concave. Q2 : $\\sum X_i\\sim\\Gamma(2n,\\theta)$, calculer $\\mathbb{E}[S^{-1}]$ et $\\mathbb{E}[S^{-2}]$ en reconnaissant une densité Gamma.',
      'Q3 : LGN + continuité de $x\\mapsto2/x$ en $2/\\theta$ (ou EQM $\\to0$ et Markov). Q4 : trois routes — Slutsky « LGN × TCL », Thm 1.6 avec $\\mathbb{I}(\\theta)=-\\mathbb{E}[\\ddot\\ell]$, méthode-δ.',
      'Q5 : pivot $\\sqrt n(\\hat\\theta_n-\\theta)/(\\theta/\\sqrt2)$, puis Slutsky pour remplacer $\\theta$ par $\\hat\\theta_n$ au dénominateur.',
    ],
    correction: `**Q1.** Par indépendance, $\\mathrm{L}_n(\\theta)=\\theta^{2n}\\big(\\prod_iX_i\\big)e^{-\\theta\\sum_iX_i}$, donc $\\ell_n(\\theta)=C+2n\\ln\\theta-\\theta\\sum_iX_i$, $\\dot\\ell_n(\\theta)=\\frac{2n}\\theta-\\sum_iX_i$, $\\ddot\\ell_n(\\theta)=-\\frac{2n}{\\theta^2}<0$. La log-vraisemblance est strictement concave sur $\\mathbb{R}_+^*$ ; l’annulation du score donne l’unique maximum

$$\\hat\\theta_n=\\frac{2n}{\\sum_iX_i}=\\frac2{\\bar X_n}.$$

**Q2.** Par additivité, $S:=\\sum_iX_i\\sim\\Gamma(2n,\\theta)$. Par le théorème de transfert, $\\mathbb{E}[S^{-1}]=\\int_0^\\infty\\frac1x\\frac{\\theta^{2n}x^{2n-1}}{\\Gamma(2n)}e^{-\\theta x}\\,\\mathrm{d}x=\\frac{\\theta^{2n}\\Gamma(2n-1)}{\\Gamma(2n)\\theta^{2n-1}}=\\frac{\\theta}{2n-1}$, d’où $\\mathbb{E}[\\hat\\theta_n]=\\frac{2n}{2n-1}\\theta$ et le biais $b(\\hat\\theta_n)=\\frac{\\theta}{2n-1}>0$ (Jensen : $\\mathbb{E}[1/\\bar X_n]>1/\\mathbb{E}[\\bar X_n]$). De même $\\mathbb{E}[\\hat\\theta_n^2]=\\frac{4n^2\\theta^2}{(2n-1)(2n-2)}$ ($n\\ge2$) et, par la décomposition biais-variance (ch.3, Prop. 1.1),

$$EQM(\\hat\\theta_n)=\\theta^2\\Big(\\frac{4n^2}{(2n-1)^2(2n-2)}+\\frac1{(2n-1)^2}\\Big)=\\theta^2\\frac{n+1}{(2n-1)(n-1)}\\sim\\frac{\\theta^2}{2n}.$$

**Q3.** Les $X_i$ sont i.i.d. intégrables d’espérance $2/\\theta$ : par la LGN, $\\bar X_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}2/\\theta$ ; $x\\mapsto2/x$ est continue en $2/\\theta>0$ ; par le théorème de continuité (ch.6, Thm 1.1), $\\hat\\theta_n\\to\\theta$ en probabilité. (Variante : $EQM\\to0$ et inégalité de Markov.)

**Q4.** *Route Thm 1.6.* Le modèle est régulier (support $\\mathbb{R}_+^*$ indépendant de $\\theta$, densité $C^\\infty$ en $\\theta$, information finie et non nulle) ; $\\ddot\\ell(\\theta,x)=-2/\\theta^2$ ne dépend pas de $x$, donc $\\mathbb{I}(\\theta)=-\\mathbb{E}_\\theta[\\ddot\\ell]=2/\\theta^2$ (éq. (10)). L’EMV est consistant (Q3) et intérieur ; par le Thm 1.6 du ch.7,

$$\\sqrt n(\\hat\\theta_n-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}\\Big(0,\\frac1{\\mathbb{I}(\\theta)}\\Big)=\\mathcal{N}\\Big(0,\\frac{\\theta^2}2\\Big).$$

*Route méthode-δ.* TCL (moment d’ordre 2) : $\\sqrt n(\\bar X_n-2/\\theta)\\Rightarrow\\mathcal{N}(0,2/\\theta^2)$ ; $g(x)=2/x$ est dérivable en $2/\\theta$ avec $g'(2/\\theta)=-\\theta^2/2\\ne0$ ; par la méthode-δ (ch.6, Thm 1.7), variance $\\frac2{\\theta^2}\\cdot\\frac{\\theta^4}4=\\frac{\\theta^2}2$. *Route Slutsky.* $\\sqrt n(\\hat\\theta_n-\\theta)=\\frac\\theta{\\bar X_n}\\sqrt n\\big(\\frac2\\theta-\\bar X_n\\big)$ avec $\\theta/\\bar X_n\\to\\theta^2/2$ (LGN + continuité). Les trois routes concordent ; l’EMV atteint la borne $1/\\mathbb{I}$ (Thm 1.7).

**Q5.** Par Q4 et Portmanteau, $\\mathbb{P}_{n,\\theta}\\big(|\\sqrt n(\\hat\\theta_n-\\theta)|\\le z_{1-\\alpha/2}\\theta/\\sqrt2\\big)\\to1-\\alpha$. Comme $\\hat\\theta_n\\to\\theta$ en probabilité (Q3), le lemme de Slutsky permet de remplacer $\\theta$ par $\\hat\\theta_n$ au dénominateur : $\\sqrt n(\\hat\\theta_n-\\theta)/(\\hat\\theta_n/\\sqrt2)\\Rightarrow\\mathcal{N}(0,1)$, d’où l’intervalle de niveau **asymptotique** $1-\\alpha$

$$\\widehat I_n=\\Big[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\frac{\\hat\\theta_n}{\\sqrt{2n}}\\Big].$$

Application : $n=50$, $\\bar X_n=0{,}8$ : $[2{,}01;2{,}99]$ à 95 %.`,
    bareme: [
      { label: 'Q1 EMV (score, concavité)', points: 1 },
      { label: 'Q2 biais (loi Γ(2n, θ)) et risque quadratique', points: 1.5 },
      { label: 'Q3 consistance (LGN + continuité)', points: 0.5 },
      { label: 'Q4 normalité asymptotique (Thm 1.6 ou méthode-δ, hypothèses citées)', points: 1.5 },
      { label: 'Q5 IC asymptotique (pivot + Slutsky)', points: 0.5 },
    ],
  },
  {
    id: 'ch7-annale-pc7-lognormale',
    type: 'annale',
    title: 'PC7 Ex. 3 — Loi log-normale de paramètre (θ, θ)',
    source: 'PC7 Ex. 3 Q1–Q3 (+ vérification par le Thm 1.6)',
    origin: 'pc',
    difficulty: 3,
    tags: ['emv', 'lognormale', 'delta-methode', 'information-fisher', 'ic-asymptotique'],
    durationMin: 25,
    statement: `Une v.a. $X>0$ suit la loi log-normale de paramètre $(\\mu,\\sigma^2)$ si $Y=\\log X\\sim\\mathcal{N}(\\mu,\\sigma^2)$. On observe une suite de $n$-échantillons de la loi log-normale de paramètre $(\\theta,\\theta)$, $\\theta\\in\\mathbb{R}_+^*$.

**Q1.** Déterminer l’estimateur du maximum de vraisemblance de $\\theta$.

**Q2.** Prouver sa normalité asymptotique.

**Q3.** Construire un intervalle de confiance de couverture asymptotique $1-\\alpha$.

**Q4 (vérification).** Calculer l’information de Fisher $\\mathbb{I}(\\theta)$ et comparer avec Q2 ; comparer avec l’estimateur naïf $\\bar Y_n$.`,
    hints: [
      'Q1 : densité $\\frac1{\\sqrt{2\\pi}\\sigma x}e^{-(\\log x-\\mu)^2/2\\sigma^2}$ ; avec $\\mu=\\sigma^2=\\theta$, $\\ell_n(\\theta)=C-\\frac n2\\log\\theta-\\sum\\frac{Y_i^2}{2\\theta}-\\frac{n\\theta}2$ ; étudier le signe du score (trinôme en $\\theta$).',
      'Q2 : l’EMV est fonction de $\\bar T_n=\\frac1n\\sum Y_i^2$ ; $\\mathbb{E}[Y^2]=\\theta+\\theta^2$, $\\mathrm{Var}(Y^2)=2\\theta^2(1+2\\theta)$ ; TCL puis méthode-δ avec $\\varphi(z)=\\sqrt{1/4+z}$.',
      'Q3 : Slutsky avec $\\sigma_0(\\hat\\theta_n)$, $\\sigma_0$ continue. Q4 : $\\dot\\ell(\\theta,y)=-\\frac1{2\\theta}+\\frac{y^2}{2\\theta^2}-\\frac12$.',
    ],
    correction: `**Q1.** Avec $Y_i=\\log X_i$ et $\\mu=\\sigma^2=\\theta$ : $\\ell_n(\\theta)=C-\\frac n2\\log\\theta-\\sum_i\\frac{(Y_i-\\theta)^2}{2\\theta}=C-\\frac n2\\log\\theta-\\sum_i\\frac{Y_i^2}{2\\theta}-\\frac{n\\theta}2$ (la constante absorbe $-\\sum\\log X_i$, jacobien sans effet, et $\\sum Y_i$). Le score vaut

$$2\\dot\\ell_n(\\theta)=-\\frac n\\theta+\\frac{\\sum_iY_i^2}{\\theta^2}-n=-\\frac{n}{\\theta^2}\\Big(\\theta^2+\\theta-\\frac1n\\sum_iY_i^2\\Big).$$

Le trinôme a une racine $\\theta_+>0$ et une racine $<0$ (les $Y_i$ ne sont pas tous nuls p.s.) ; le score est $>0$ sur $]0,\\theta_+[$ et $<0$ au-delà : l’EMV est uniquement défini,

$$\\hat\\theta_n=-\\frac12+\\sqrt{\\frac14+\\frac1n\\sum_{i=1}^nY_i^2}.$$

**Q2.** Posons $\\bar T_n=\\frac1n\\sum_iY_i^2$. Avec $Y=\\theta+\\sqrt\\theta G$, $G\\sim\\mathcal{N}(0,1)$ : $\\mathbb{E}[Y^2]=\\theta+\\theta^2$ et $\\mathrm{Var}(Y^2)=\\theta^4+6\\theta^3+3\\theta^2-(\\theta+\\theta^2)^2=2\\theta^2(1+2\\theta)$. Les $Y_i^2$ sont i.i.d. de carré intégrable : par le **TCL** (ch.6, Thm 1.6), $\\sqrt n(\\bar T_n-(\\theta+\\theta^2))\\Rightarrow\\mathcal{N}(0,2\\theta^2(1+2\\theta))$. $\\varphi(z)=\\sqrt{1/4+z}$ est dérivable en $\\theta+\\theta^2$ avec $\\varphi(\\theta+\\theta^2)=\\theta+\\frac12$ et $\\varphi'(\\theta+\\theta^2)=\\frac1{1+2\\theta}\\ne0$. Par la **méthode-δ** (ch.6, Thm 1.7) :

$$\\sqrt n(\\hat\\theta_n-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}\\Big(0,\\sigma_0^2(\\theta)\\Big),\\qquad\\sigma_0^2(\\theta)=\\frac{2\\theta^2}{1+2\\theta}.$$

**Q3.** La normalité asymptotique entraîne la consistance ; $\\sigma_0$ est continue et $>0$, donc $\\sigma_0(\\hat\\theta_n)\\to\\sigma_0(\\theta)$ en probabilité ; par **Slutsky**, $\\sqrt n(\\hat\\theta_n-\\theta)/\\sigma_0(\\hat\\theta_n)\\Rightarrow\\mathcal{N}(0,1)$ et

$$\\Big[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\frac{\\sigma_0(\\hat\\theta_n)}{\\sqrt n}\\Big],\\qquad\\sigma_0(\\hat\\theta_n)=\\frac{\\sqrt2\\,\\hat\\theta_n}{\\sqrt{1+2\\hat\\theta_n}},$$

est de niveau asymptotique $1-\\alpha$.

**Q4.** Pour une observation, $\\dot\\ell(\\theta,y)=-\\frac1{2\\theta}+\\frac{y^2}{2\\theta^2}-\\frac12$, de variance $\\frac{\\mathrm{Var}(Y^2)}{4\\theta^4}$ : $\\mathbb{I}(\\theta)=\\frac{1+2\\theta}{2\\theta^2}$, donc $1/\\mathbb{I}(\\theta)=\\sigma_0^2(\\theta)$, conformément au Thm 1.6 du ch.7. L’estimateur naïf $\\bar Y_n$ (Z-estimateur $\\psi=y-\\theta$) a la variance asymptotique $\\theta>\\frac{2\\theta^2}{1+2\\theta}$ : il fait moins bien, comme l’impose le Thm 1.7 (par exemple $\\theta=1$ : $2/3$ contre $1$).`,
    bareme: [
      { label: 'Q1 log-vraisemblance et étude de signe du score', points: 1 },
      { label: 'Q2 moments de Y², TCL, méthode-δ', points: 1.25 },
      { label: 'Q3 IC (Slutsky, plug-in)', points: 0.5 },
      { label: 'Q4 information de Fisher et comparaison', points: 0.5 },
    ],
  },
  {
    id: 'ch7-annale-pc7-robuste',
    type: 'annale',
    title: 'PC7 Ex. 5 — Z-estimateurs de translation robustes',
    source: 'PC7 Ex. 5 Q1–Q7',
    origin: 'pc',
    difficulty: 3,
    tags: ['z-estimateur', 'consistance', 'normalite-asymptotique', 'robustesse', 'mediane'],
    durationMin: 40,
    statement: `Soit $f$ une densité symétrique sur $\\mathbb{R}$, $q_\\theta(x)=f(x-\\theta)$, et $\\gamma:\\mathbb{R}\\to\\mathbb{R}$ impaire, croissante, avec $\\lim_{-\\infty}\\gamma<0<\\lim_{+\\infty}\\gamma$ et $\\int|\\gamma(x-\\theta)|f(x)\\,\\mathrm{d}x<\\infty$ (**H1**). On étudie les Z-estimateurs associés à $\\psi(\\theta,x)=\\gamma(x-\\theta)$, avec $\\Psi_n(\\theta)=\\frac1n\\sum_k\\gamma(X_k-\\theta)$ et $\\Psi_{\\theta_0}(\\theta)=\\int\\gamma(x-\\theta)f(x-\\theta_0)\\,\\mathrm{d}x$.

**Q1.** Montrer qu’il existe p.s. $\\hat\\theta_n$ tel que $\\Psi_n\\ge0$ sur $]-\\infty,\\hat\\theta_n[$ et $\\Psi_n\\le0$ sur $]\\hat\\theta_n,+\\infty[$ ; zéro exact si $\\gamma$ continue, unique si strictement croissante. Cas $\\gamma_0=\\operatorname{signe}$, $\\gamma_\\infty(x)=x$, $\\gamma_k$ (Huber).

On suppose **H2** : $\\theta\\mapsto\\Psi_0(\\theta)$ strictement monotone sur $[-\\delta,\\delta]$.

**Q2.** Montrer que $\\theta_0$ est l’unique solution de $\\Psi_{\\theta_0}(\\theta)=0$.

**Q3–Q4.** Montrer que $\\{\\hat\\theta_n\\}$ est consistante.

On suppose **H3** : $\\gamma$ de classe $C^1$, $\\int\\gamma^2f<\\infty$, $\\int\\gamma'f>0$, $\\int\\sup_{|y-x|\\le\\delta}|\\gamma'(y)|f(x)\\,\\mathrm{d}x<\\infty$.

**Q5.** Montrer la normalité asymptotique et donner la variance limite $V[\\gamma]$.

**Q6.** Cas $f=\\mathcal{N}(0,\\sigma^2)$ : calculer $V[\\gamma_\\infty]$, $V[\\gamma_0]$ (calcul formel), et décrire $k\\mapsto V[\\gamma_k]$.

**Q7.** Cas $f=(1-\\varepsilon)\\varphi(x)+\\varepsilon\\tau^{-1}\\varphi(x/\\tau)$ : calculer $V[\\gamma_\\infty]$ et la limite de $V[\\gamma_k]$ quand $\\tau\\to\\infty$. Commenter.`,
    hints: [
      'Q1 : $\\Psi_n$ est décroissante (somme de fonctions décroissantes de $\\theta$), de limites $>0$ et $<0$ en $\\mp\\infty$ ; prendre $\\sup\\{\\theta:\\Psi_n(\\theta)>0\\}$ ; TVI si $\\gamma$ continue. Q2 : $\\gamma f$ impaire ; $\\Psi_{\\theta_0}(\\theta)=\\Psi_0(\\theta-\\theta_0)$.',
      'Q3 : inclusion $\\{\\hat\\theta_n<\\theta_0-\\varepsilon\\}\\subseteq\\{\\Psi_n(\\theta_0-\\varepsilon)\\le0\\}$, $\\Psi_{\\theta_0}(\\theta_0-\\varepsilon)>0$ et LGN (intégrabilité seule).',
      'Q5 : vérifier (i)–(iii) du Thm 1.4 ($\\psi\'=-\\gamma\'(x-\\theta)$) ; $V[\\gamma]=\\int\\gamma^2f/(\\int\\gamma\'f)^2$. Q6 : $\\operatorname{signe}\'=2\\delta_0$. Q7 : la composante contaminée met une masse $\\to0$ sur tout compact.',
    ],
    correction: `**Q1.** $\\gamma$ croissante ⇒ $\\theta\\mapsto\\Psi_n(\\theta)$ décroissante ; par imparité et (4), $\\lim_{-\\infty}\\Psi_n=-\\lim_{-\\infty}\\gamma>0$ et $\\lim_{+\\infty}\\Psi_n<0$. Donc $\\hat\\theta_n:=\\sup\\{\\theta:\\Psi_n(\\theta)>0\\}$ est fini et convient (comme tout point de $[\\sup\\{\\Psi_n>0\\},\\inf\\{\\Psi_n<0\\}]$). Si $\\gamma$ est continue, $\\Psi_n$ l’est et le **théorème des valeurs intermédiaires** donne un zéro exact ; si $\\gamma$ est strictement croissante, $\\Psi_n$ est strictement décroissante et le zéro est **unique**. $\\gamma_0$ : médiane empirique ($X_{(n+1)/2:n}$ si $n$ impair, tout point entre $X_{n/2:n}$ et $X_{n/2+1:n}$ si $n$ pair : non unique) ; $\\gamma_\\infty$ : $\\bar X_n$, unique ; $\\gamma_k$ : continue, zéro exact, unicité non garantie (constante hors de $[-k,k]$).

**Q2.** $\\Psi_{\\theta_0}(\\theta_0)=\\int\\gamma(x)f(x)\\,\\mathrm{d}x=0$ car $\\gamma f$ est impaire et intégrable (H1). $\\Psi_{\\theta_0}(\\theta)=\\Psi_0(\\theta-\\theta_0)$ est monotone et strictement monotone sur $[\\theta_0-\\delta,\\theta_0+\\delta]$ (H2) : le zéro est unique.

**Q3–Q4.** Soit $\\varepsilon\\in\\,]0,\\delta[$. Par décroissance, $\\{\\hat\\theta_n<\\theta_0-\\varepsilon\\}\\subseteq\\{\\Psi_n(\\theta_0-\\varepsilon)\\le0\\}$. Par H2 et Q2, $c:=\\Psi_{\\theta_0}(\\theta_0-\\varepsilon)>0$. Les $\\gamma(X_k-\\theta_0+\\varepsilon)$ sont i.i.d. **intégrables** (H1) : par la LGN (Poly ch.7, Thm 2.1), $\\mathbb{P}_{n,\\theta_0}(\\Psi_n(\\theta_0-\\varepsilon)>c/2)\\to1$. Sur cet événement, $\\hat\\theta_n\\ge\\theta_0-\\varepsilon$ ; donc $\\mathbb{P}_{n,\\theta_0}(\\hat\\theta_n<\\theta_0-\\varepsilon)\\to0$. Symétriquement ($\\Psi_{\\theta_0}(\\theta_0+\\varepsilon)<0$), $\\mathbb{P}_{n,\\theta_0}(\\hat\\theta_n>\\theta_0+\\varepsilon)\\to0$ : la suite est **consistante**. (Aucune convergence uniforme n’est nécessaire : la monotonie remplace (Hz-1).)

**Q5.** On vérifie les hypothèses du Thm 1.4 du ch.7 en $\\theta_0$ (tout point est intérieur à $\\Theta=\\mathbb{R}$) : consistance (Q4) ; (i) centrage (Q2) et $\\mathbb{E}_{\\theta_0}[\\gamma^2(X_1-\\theta_0)]=\\int\\gamma^2f<\\infty$ ; (ii) $\\theta\\mapsto\\gamma(x-\\theta)$ est $C^1$ et $g(x):=\\sup_{|\\theta-\\theta_0|\\le\\delta}|\\gamma'(x-\\theta)|$ est intégrable sous $\\mathbb{Q}_{\\theta_0}$ par (7) (changement de variable $x\\to x+\\theta_0$) ; (iii) $\\mathbb{E}_{\\theta_0}[\\psi'(\\theta_0,X_1)]=-\\int\\gamma'f\\ne0$ par (6). Donc

$$\\sqrt n(\\hat\\theta_n-\\theta_0)\\overset{\\mathbb{P}_{n,\\theta_0}}{\\Longrightarrow}\\mathcal{N}(0,V[\\gamma]),\\qquad V[\\gamma]=\\frac{\\int\\gamma^2(x)f(x)\\,\\mathrm{d}x}{\\big(\\int\\gamma'(x)f(x)\\,\\mathrm{d}x\\big)^2},$$

indépendante de $\\theta_0$ (le signe de $\\psi'$ disparaît au carré).

**Q6.** $V[\\gamma_\\infty]=\\sigma^2$. Pour $\\gamma_0$, les hypothèses ne sont pas satisfaites ; formellement $\\gamma_0'=2\\delta_0$, $\\int\\gamma_0^2f=1$, $\\int\\gamma_0'f=2f(0)=\\sqrt{2/(\\pi\\sigma^2)}$, d’où $V[\\gamma_0]=\\pi\\sigma^2/2$ (valeur correcte, établie par les statistiques d’ordre). Pour $\\gamma_k$ (continue, $C^1$ par morceaux) : $V[\\gamma_k]=\\int(|x|\\wedge k)^2f/(\\int\\mathbb{1}_{|x|<k}f)^2$, décroissante de $\\pi\\sigma^2/2$ ($k\\to0$) à $\\sigma^2$ ($k\\to\\infty$) : sans contamination la moyenne (EMV) est la meilleure, mais Huber perd très peu ($\\approx1{,}05$ pour $k=1{,}345$, $\\sigma=1$).

**Q7.** $V[\\gamma_\\infty]=(1-\\varepsilon)+\\varepsilon\\tau^2\\to+\\infty$ quand $\\tau\\to\\infty$ ($1{,}99$ pour $\\varepsilon=0{,}01$, $\\tau=10$). Pour $k$ fini, la composante $\\mathcal{N}(0,\\tau^2)$ met une masse $\\to0$ sur $[-k,k]$ : sa contribution au numérateur tend vers $\\varepsilon k^2$ et au dénominateur vers 0, d’où

$$\\lim_{\\tau\\to\\infty}V[\\gamma_k]=\\frac{(1-\\varepsilon)\\int(|x|\\wedge k)^2\\varphi(x)\\,\\mathrm{d}x+\\varepsilon k^2}{(1-\\varepsilon)^2\\big(\\int_{-k}^k\\varphi\\big)^2}<\\infty.$$

**Commentaire** : une fonction d’influence **bornée** rend la variance asymptotique peu sensible à une faible proportion de valeurs aberrantes, même très grandes ; la moyenne ($L^2$) y est catastrophique. Pour $\\varepsilon=0{,}01$, $\\tau=10$, le meilleur $k$ est $\\approx2$ ($V\\approx1{,}06$).`,
    bareme: [
      { label: 'Q1 existence / unicité, trois cas', points: 1 },
      { label: 'Q2 centrage et unicité du zéro limite', points: 0.5 },
      { label: 'Q3–Q4 consistance par monotonie', points: 1.5 },
      { label: 'Q5 hypothèses du Thm 1.4 et V[γ]', points: 1.5 },
      { label: 'Q6 cas gaussien', points: 0.75 },
      { label: 'Q7 contamination et commentaire', points: 0.75 },
    ],
  },
]
