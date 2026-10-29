import type { Exercise } from '../types'

/** Étape suivante, associer, numériques, annales. */
export const exercisesPart2: Exercise[] = [
  // ------------------------------------------------------------------ Étape suivante
  {
    id: 'ch2-etape-emv-exponentiel',
    type: 'etape-suivante',
    title: 'EMV du modèle exponentiel pas à pas (Méthode 1.2)',
    source: 'Poly ch.2, Ex. 1.7 et Méthode 1.2 ; Examen 2025 Ex. 1 (modèle)',
    origin: 'poly',
    difficulty: 1,
    tags: ['emv', 'methode-1-2', 'exponentielle', 'cours'],
    setup: '$n$-échantillon de $\\{\\mathcal{E}(\\theta),\\theta\\in\\mathbb{R}_+^\\ast\\}$, densité $q_\\theta(x)=\\theta\\mathrm{e}^{-\\theta x}\\mathbb{1}_{\\mathbb{R}_+}(x)$. On cherche l’EMV de $\\theta$.',
    steps: [
      {
        prompt: 'Étape 1 — La vraisemblance $\\mathrm{L}_n(\\vartheta)$, pour $\\vartheta>0$, vaut :',
        choices: [
          { text: '$\\vartheta^n\\exp\\big(-\\vartheta\\sum_{i=1}^nX_i\\big)$', correct: true, explanation: 'Produit des densités (indépendance) ; les indicatrices valent 1 car les observations sont positives.' },
          { text: '$\\vartheta\\exp\\big(-\\vartheta\\sum_{i=1}^nX_i\\big)$', correct: false, explanation: 'Le facteur $\\vartheta$ apparaît dans **chacune** des $n$ densités : $\\vartheta^n$.' },
          { text: '$\\vartheta^n\\exp\\big(-\\vartheta\\bar X_n\\big)$', correct: false, explanation: 'La somme des exposants est $\\vartheta\\sum_iX_i=n\\vartheta\\bar X_n$, pas $\\vartheta\\bar X_n$.' },
        ],
      },
      {
        prompt: 'Étape 2 — La log-vraisemblance normalisée $\\ell_n(\\vartheta)=\\frac1n\\log\\mathrm{L}_n(\\vartheta)$ et sa dérivée sont :',
        choices: [
          { text: '$\\ell_n(\\vartheta)=\\log\\vartheta-\\vartheta\\bar X_n$, $\\ell_n\'(\\vartheta)=\\frac1\\vartheta-\\bar X_n$', correct: true, explanation: 'Log d’un produit = somme, division par $n$.' },
          { text: '$\\ell_n(\\vartheta)=n\\log\\vartheta-\\vartheta\\sum_iX_i$, $\\ell_n\'(\\vartheta)=\\frac n\\vartheta-\\sum_iX_i$', correct: false, explanation: 'C’est $\\log\\mathrm{L}_n$ sans la normalisation par $n$ (Déf. 1.5) ; l’argmax est le même, mais ce n’est pas $\\ell_n$ au sens du poly.' },
          { text: '$\\ell_n(\\vartheta)=\\log\\vartheta+\\vartheta\\bar X_n$, $\\ell_n\'(\\vartheta)=\\frac1\\vartheta+\\bar X_n$', correct: false, explanation: 'Erreur de signe : l’exponentielle est $\\mathrm{e}^{-\\vartheta x}$ ; avec ce signe la dérivée ne s’annulerait jamais.' },
        ],
      },
      {
        prompt: 'Étape 3 — Le point critique est $\\vartheta=1/\\bar X_n$ (dès que $\\bar X_n>0$). Quel argument prouve que c’est le maximum **global** ?',
        choices: [
          { text: '$\\ell_n\'\'(\\vartheta)=-1/\\vartheta^2<0$ sur $\\mathbb{R}_+^\\ast$ : $\\ell_n$ est strictement concave, donc l’unique point critique est l’unique maximum global (Lemme 2.3).', correct: true, explanation: 'Étape 2c de la Méthode 1.2 ; c’est la phrase à écrire à l’examen.' },
          { text: 'Un point critique est toujours un maximum.', correct: false, explanation: 'Faux (Déf. 1.6, commentaire 3) : un point critique peut être un minimum ou un point d’inflexion ; il faut un argument de concavité ou d’étude de signe.' },
          { text: '$\\mathrm{L}_n(1/\\bar X_n)>0$, donc c’est un maximum.', correct: false, explanation: 'La positivité de la vraisemblance en un point ne dit rien sur sa position relative aux autres valeurs.' },
        ],
      },
      {
        prompt: 'Étape 4 — Conclusion et lien avec la méthode des moments :',
        choices: [
          { text: '$\\hat\\theta_n^{\\mathrm{MV}}=1/\\bar X_n$, qui coïncide avec l’estimateur des moments associé à $T(x)=x$ (Ex. 1.4) ; il est biaisé : $\\mathbb{E}_\\theta[\\hat\\theta_n^{\\mathrm{MV}}]=\\frac n{n-1}\\theta$.', correct: true, explanation: 'Famille exponentielle canonique ($T(x)=-x$) : EMV = EMM ; biais par les lois Gamma (ch.1).' },
          { text: '$\\hat\\theta_n^{\\mathrm{MV}}=\\bar X_n$, estimateur sans biais de $\\theta$.', correct: false, explanation: '$\\bar X_n$ estime l’espérance $1/\\theta$ ; par invariance (Prop. 1.2) c’est l’EMV de $\\tau=1/\\theta$, pas de $\\theta$.' },
          { text: '$\\hat\\theta_n^{\\mathrm{MV}}=1/\\bar X_n$, qui coïncide avec l’estimateur des moments associé à $T(x)=x^2$.', correct: false, explanation: 'L’estimateur associé à $x^2$ est $\\hat\\theta_{n,2}=(2/\\overline{X^2}_n)^{1/2}$, différent de l’EMV (Ex. 1.4).' },
        ],
      },
    ],
    conclusion: 'Rédaction type (DIAGNOSTIC §5.5) : densité → vraisemblance (indépendance) → $\\ell_n$ → équation de vraisemblance → stricte concavité (Lemme 2.3) → EMV ; mentionner l’événement $\\{\\bar X_n>0\\}$ de probabilité 1.',
  },
  {
    id: 'ch2-etape-lognormale-2025',
    type: 'etape-suivante',
    title: 'Examen 2025 Ex. 2 Q1–Q2 : densité et EMV de la loi log-normale',
    source: 'Examen 2025 Ex. 2 Q1–Q2 ; Poly ch.2, Ex. 1.10 ; PC7 Ex. 3 Q1',
    origin: 'annale',
    difficulty: 2,
    tags: ['emv', 'gaussien', 'modele-induit', 'lognormale'],
    setup: '$X=\\mathrm{e}^{\\mu+\\sigma\\xi}$ avec $\\xi\\sim\\mathcal{N}(0,1)$, $\\theta=(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^\\ast$ ; $n$-échantillon $(X_1,\\dots,X_n)$. On note $Y_i=\\ln X_i$.',
    steps: [
      {
        prompt: 'Étape 1 — Par la méthode de la fonction muette ($y=\\ln x$, $\\mathrm{d}y=\\mathrm{d}x/x$), la densité de $X$ sur $S=]0,+\\infty[$ est :',
        choices: [
          { text: '$p_\\theta(x)=\\dfrac{1}{x\\sqrt{2\\pi\\sigma^2}}\\exp\\Big(-\\dfrac{(\\ln x-\\mu)^2}{2\\sigma^2}\\Big)\\mathbb{1}_{\\{x>0\\}}$', correct: true, explanation: '$\\mathbb{E}[h(X)]=\\int h(\\mathrm{e}^y)\\varphi_{\\mu,\\sigma}(y)\\,\\mathrm{d}y=\\int_0^\\infty h(x)\\varphi_{\\mu,\\sigma}(\\ln x)\\frac{\\mathrm{d}x}x$ : le jacobien $1/x$ est indispensable.' },
          { text: '$p_\\theta(x)=\\dfrac{1}{\\sqrt{2\\pi\\sigma^2}}\\exp\\Big(-\\dfrac{(\\ln x-\\mu)^2}{2\\sigma^2}\\Big)\\mathbb{1}_{\\{x>0\\}}$', correct: false, explanation: 'Oubli du jacobien $1/x$ du changement de variable ; cette fonction n’est pas d’intégrale 1.' },
          { text: '$p_\\theta(x)=\\dfrac{1}{\\sqrt{2\\pi\\sigma^2}}\\exp\\Big(-\\dfrac{(x-\\mu)^2}{2\\sigma^2}\\Big)$', correct: false, explanation: 'C’est la densité de $Y=\\ln X$, pas celle de $X$ (dont le support est $]0,+\\infty[$).' },
        ],
      },
      {
        prompt: 'Étape 2 — La log-vraisemblance s’écrit $\\log\\mathrm{L}_n(\\mu,\\sigma^2)=-\\sum_i\\ln X_i-\\frac n2\\ln(2\\pi\\sigma^2)-\\frac1{2\\sigma^2}\\sum_i(Y_i-\\mu)^2$. Que peut-on dire du premier terme ?',
        choices: [
          { text: 'Il ne dépend pas de $\\theta$ : le problème se ramène à l’EMV du $n$-échantillon gaussien $(Y_1,\\dots,Y_n)$ (Ex. 1.10).', correct: true, explanation: 'Le jacobien est constant en $\\theta$ : les vraisemblances des modèles en $X$ et en $Y$ diffèrent d’un facteur indépendant du paramètre, même argmax.' },
          { text: 'Il dépend de $\\sigma^2$ et doit être dérivé.', correct: false, explanation: '$-\\sum_i\\ln X_i$ ne contient ni $\\mu$ ni $\\sigma^2$.' },
          { text: 'Il rend l’EMV différent de l’EMV gaussien des $Y_i$.', correct: false, explanation: 'Au contraire : un terme additif constant en $\\theta$ ne déplace pas l’argmax.' },
        ],
      },
      {
        prompt: 'Étape 3 — Les équations de vraisemblance donnent $\\hat\\mu_{ML}=\\bar Y_n$ et $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2$. Quel argument justifie le maximum global ?',
        choices: [
          { text: 'À $v$ fixé, stricte concavité en $m$ (maximum en $\\bar Y_n$) ; puis $v\\mapsto-\\frac12\\log v-\\frac S{2v}$ de dérivée $\\frac{S-v}{2v^2}$, maximale en $v=S$ ; enchaînement des deux inégalités (Ex. 1.10).', correct: true, explanation: 'Maximisation en deux temps ; existence et unicité dès que les $Y_i$ ne sont pas tous égaux (p.s. pour $n\\ge2$).' },
          { text: 'Le système a une unique solution, donc c’est le maximum.', correct: false, explanation: 'L’unicité du point critique ne suffit pas : il faut un argument (concavité, étude de signe, bords).' },
          { text: 'La hessienne est nulle au point critique.', correct: false, explanation: 'Faux et non pertinent : une hessienne nulle ne prouverait rien ; elle est ici définie négative au point critique, mais l’argument du poly est le profil en deux temps.' },
        ],
      },
      {
        prompt: 'Étape 4 — Par invariance (Prop. 1.2), l’EMV de $\\sigma$ et le biais de $\\widehat{\\sigma^2}_{ML}$ sont :',
        choices: [
          { text: '$\\hat\\sigma_{ML}=\\big(\\frac1n\\sum_i(Y_i-\\bar Y_n)^2\\big)^{1/2}$ ; $\\mathbb{E}_\\theta[\\widehat{\\sigma^2}_{ML}]=\\frac{n-1}n\\sigma^2$, biais $-\\sigma^2/n$ (Gosset).', correct: true, explanation: 'Ex. 1.14 (1) et Remarque p. 19 ; Examen 2025 Q4.' },
          { text: '$\\hat\\sigma_{ML}=S_n$ (racine de la variance corrigée), sans biais.', correct: false, explanation: 'L’invariance transporte l’EMV de $\\sigma^2$ (diviseur $n$), pas $S_n^2$ ; et aucun des deux n’est sans biais pour $\\sigma$.' },
          { text: 'L’EMV de $\\sigma$ demande un nouveau calcul de dérivée par rapport à $\\sigma$.', correct: false, explanation: 'Possible mais inutile : c’est précisément ce que la Prop. 1.2 évite (« sans nouveau calcul »).' },
        ],
      },
    ],
    conclusion: 'Rédaction attendue à l’examen : écrire la densité avec le jacobien, isoler le terme constant en $\\theta$, citer l’Ex. 1.10 (ou refaire le profil en deux temps), conclure $\\hat\\mu_{ML}=\\bar Y_n$, $\\widehat{\\sigma^2}_{ML}=\\frac{n-1}nS_n^2$ ; la suite du problème (biais, IC, consistance) utilise Gosset.',
  },
  {
    id: 'ch2-etape-moments-uniforme',
    type: 'etape-suivante',
    title: 'Méthode des moments pour U([a, b]) : deux équations, deux inconnues',
    source: 'Poly ch.2, Ex. 1.5',
    origin: 'poly',
    difficulty: 2,
    tags: ['methode-moments', 'uniforme'],
    setup: '$n$-échantillon de $\\mathcal{U}([a,b])$, $\\theta=(a,b)$ avec $a<b$, $n\\ge2$. On utilise $T(x)=x$ et $\\tilde T(x)=x^2$.',
    steps: [
      {
        prompt: 'Étape 1 — Les moments exacts $e(\\theta)=\\mathbb{E}_\\theta[X_1]$ et $\\tilde e(\\theta)=\\mathbb{E}_\\theta[X_1^2]$ valent :',
        choices: [
          { text: '$e(\\theta)=\\frac{a+b}2$, $\\tilde e(\\theta)=\\frac{a^2+ab+b^2}3$', correct: true, explanation: '$\\int_a^b\\frac{x^2}{b-a}\\mathrm{d}x=\\frac{b^3-a^3}{3(b-a)}=\\frac{a^2+ab+b^2}3$.' },
          { text: '$e(\\theta)=\\frac{a+b}2$, $\\tilde e(\\theta)=\\frac{(b-a)^2}{12}$', correct: false, explanation: '$\\frac{(b-a)^2}{12}$ est la **variance**, pas le moment d’ordre 2 ; $\\mathbb{E}[X^2]=\\mathrm{Var}+\\mathbb{E}[X]^2$.' },
          { text: '$e(\\theta)=\\frac{a+b}2$, $\\tilde e(\\theta)=\\frac{a^2+b^2}2$', correct: false, explanation: 'Erreur d’intégration : il manque le terme croisé $ab$ et le facteur $1/3$.' },
        ],
      },
      {
        prompt: 'Étape 2 — Avec $s=a+b$, $p=ab$, le système $e(\\vartheta)=\\bar X_n$, $\\tilde e(\\vartheta)=\\overline{X^2}_n$ devient :',
        choices: [
          { text: '$\\hat s_n=2\\bar X_n$ et $\\hat p_n=\\hat s_n^2-3\\,\\overline{X^2}_n$ (car $a^2+ab+b^2=s^2-p$)', correct: true, explanation: 'Changement d’inconnues somme/produit : système triangulaire.' },
          { text: '$\\hat s_n=2\\bar X_n$ et $\\hat p_n=3\\,\\overline{X^2}_n-\\hat s_n^2$', correct: false, explanation: 'Signe inversé : $s^2-p=3\\overline{X^2}_n$ donne $p=s^2-3\\overline{X^2}_n$.' },
          { text: '$\\hat s_n=\\bar X_n$ et $\\hat p_n=\\overline{X^2}_n$', correct: false, explanation: '$\\frac{a+b}2=\\bar X_n$ donne $s=2\\bar X_n$, et $p$ n’est pas le moment d’ordre 2.' },
        ],
      },
      {
        prompt: 'Étape 3 — $\\hat a_n,\\hat b_n$ sont les racines de $t^2-\\hat s_nt+\\hat p_n=0$, de discriminant :',
        choices: [
          { text: '$12V_n$ avec $V_n=\\overline{X^2}_n-\\bar X_n^2\\ge0$, d’où $\\hat a_n=\\bar X_n-\\sqrt{3V_n}$, $\\hat b_n=\\bar X_n+\\sqrt{3V_n}$', correct: true, explanation: '$4\\bar X_n^2-4(4\\bar X_n^2-3\\overline{X^2}_n)=12(\\overline{X^2}_n-\\bar X_n^2)$.' },
          { text: '$4V_n$, d’où $\\hat a_n=\\bar X_n-\\sqrt{V_n}$, $\\hat b_n=\\bar X_n+\\sqrt{V_n}$', correct: false, explanation: 'Oubli du facteur 3 : pour une uniforme, la demi-longueur du support vaut $\\sqrt3$ fois l’écart-type.' },
          { text: '$3V_n$, d’où $\\hat a_n,\\hat b_n=\\bar X_n\\mp\\frac{\\sqrt{3V_n}}2$', correct: false, explanation: 'Les racines sont $\\frac{\\hat s_n\\pm\\sqrt{\\Delta}}2$ avec $\\Delta=12V_n$ : $\\frac{\\sqrt{12V_n}}2=\\sqrt{3V_n}$.' },
        ],
      },
      {
        prompt: 'Étape 4 — Pourquoi la solution est-elle unique dans $\\Theta=\\{a<b\\}$, et que vaut-elle vis-à-vis des observations ?',
        choices: [
          { text: 'Pour $n\\ge2$, $V_n>0$ p.s. (loi à densité), les racines sont distinctes et la contrainte $a<b$ fixe l’ordre ; mais $[\\hat a_n,\\hat b_n]$ ne contient pas toujours toutes les observations.', correct: true, explanation: 'Remarque p. 12–13 : échec dès que $X_{n:n}-\\bar X_n>\\sqrt{3V_n}$ ; l’EMV $[X_{1:n},X_{n:n}]$ n’a pas ce défaut.' },
          { text: 'Le système a toujours deux solutions $(\\hat a_n,\\hat b_n)$ et $(\\hat b_n,\\hat a_n)$ : l’estimateur n’est pas défini.', correct: false, explanation: 'La condition $a<b$ de $\\Theta$ élimine la solution échangée : unicité dans $\\Theta$.' },
          { text: 'L’intervalle contient toutes les observations car il est construit sur leur moyenne et leur variance.', correct: false, explanation: 'Faux : neuf observations proches de 0 et une proche de 1 donnent $\\hat b_n\\approx0{,}62<X_{n:n}$.' },
        ],
      },
    ],
    conclusion: 'Un paramètre de dimension 2 demande deux fonctions de moment ; le changement d’inconnues (somme, produit) rend le système explicite. Variante examen : Examen 2025 Ex. 2 Q9(a), où les deux moments de la log-normale s’inversent par passage au logarithme.',
  },
  {
    id: 'ch2-etape-regression-emv',
    type: 'etape-suivante',
    title: 'CC 2022 Ex. 4 Q1 : EMV en régression linéaire simple',
    source: 'CC MAP433 2022 Ex. 4 Q1 ; PC2 Ex. 1 Q2',
    origin: 'annale',
    difficulty: 2,
    tags: ['regression', 'emv', 'moindres-carres'],
    setup: '$Y\\sim\\mathcal{N}(X\\beta,\\sigma^2I_n)$ avec $X=[\\mathbf{1},x]$ de rang 2, $\\beta=(\\beta_0,\\beta_1)^\\top$ (notation du CC). Déterminer l’EMV de $(\\beta,\\sigma^2)$.',
    steps: [
      {
        prompt: 'Étape 1 — La log-vraisemblance s’écrit :',
        choices: [
          { text: '$\\log\\mathrm{L}=-\\frac n2\\log(2\\pi\\sigma^2)-\\frac1{2\\sigma^2}\\|Y-X\\beta\\|^2$', correct: true, explanation: 'Produit de $n$ densités gaussiennes indépendantes de moyennes $(X\\beta)_i$ et de variance $\\sigma^2$.' },
          { text: '$\\log\\mathrm{L}=-\\frac n2\\log(2\\pi\\sigma^2)-\\frac1{2\\sigma^2}\\|Y\\|^2$', correct: false, explanation: 'La moyenne $X\\beta$ a disparu : on a écrit la vraisemblance d’un échantillon centré.' },
          { text: '$\\log\\mathrm{L}=-\\frac12\\log(2\\pi\\sigma^2)-\\frac1{2\\sigma^2}\\|Y-X\\beta\\|^2$', correct: false, explanation: 'Le terme $-\\frac12\\log(2\\pi\\sigma^2)$ apparaît $n$ fois.' },
        ],
      },
      {
        prompt: 'Étape 2 — À $\\sigma^2$ fixé, maximiser en $\\beta$ revient à minimiser $\\|Y-X\\beta\\|^2$ ; la condition du premier ordre est :',
        choices: [
          { text: '$X^\\top(Y-X\\beta)=0$, soit $X^\\top X\\beta=X^\\top Y$ et $\\hat\\beta=(X^\\top X)^{-1}X^\\top Y$ ($X^\\top X$ inversible car $X$ de rang 2).', correct: true, explanation: 'Équations normales ; la fonction est strictement convexe (hessienne $2X^\\top X$ définie positive) donc c’est le minimum global.' },
          { text: '$X(Y-X\\beta)=0$', correct: false, explanation: 'Dimensions incompatibles ($X$ est $n\\times2$, $Y-X\\beta\\in\\mathbb{R}^n$) ; le gradient fait intervenir $X^\\top$.' },
          { text: '$Y-X\\beta=0$', correct: false, explanation: 'Système surdéterminé ($n$ équations, 2 inconnues) sans solution en général ; on cherche le minimum de la norme, pas son annulation.' },
        ],
      },
      {
        prompt: 'Étape 3 — Avec $X^\\top X=\\begin{pmatrix}n&n\\bar x\\\\ n\\bar x&\\|x\\|^2\\end{pmatrix}$, les formules explicites sont :',
        choices: [
          { text: '$\\hat\\beta_1=\\dfrac{\\sum_i(x_i-\\bar x)Y_i}{\\sum_i(x_i-\\bar x)^2}$, $\\hat\\beta_0=\\bar Y-\\hat\\beta_1\\bar x$', correct: true, explanation: 'Première équation normale : $\\beta_0=\\bar Y-\\beta_1\\bar x$ ; report dans la seconde. (Noter $\\sum_i(x_i-\\bar x)Y_i=\\sum_i(x_i-\\bar x)(Y_i-\\bar Y)$.)' },
          { text: '$\\hat\\beta_1=\\dfrac{\\sum_ix_iY_i}{\\|x\\|^2}$, $\\hat\\beta_0=\\bar Y$', correct: false, explanation: 'Valable seulement si $\\bar x=0$ (colonnes orthogonales) ; sinon il faut centrer.' },
          { text: '$\\hat\\beta_1=\\dfrac{\\sum_i(x_i-\\bar x)^2}{\\sum_i(x_i-\\bar x)Y_i}$, $\\hat\\beta_0=\\bar Y-\\hat\\beta_1\\bar x$', correct: false, explanation: 'Fraction inversée.' },
        ],
      },
      {
        prompt: 'Étape 4 — Puis $\\partial_{\\sigma^2}\\log\\mathrm{L}=0$ donne :',
        choices: [
          { text: '$\\hat\\sigma^2=\\frac1n\\|Y-X\\hat\\beta\\|^2=\\frac1n\\|(I_n-H)Y\\|^2$ avec $H=X(X^\\top X)^{-1}X^\\top$ (maximum par étude de signe de $\\frac{S-v}{2v^2}$).', correct: true, explanation: 'Diviseur $n$ ; $S^2=\\frac n{n-2}\\hat\\sigma^2$ est la version sans biais utilisée ensuite dans le CC.' },
          { text: '$\\hat\\sigma^2=\\frac1{n-2}\\|Y-X\\hat\\beta\\|^2$', correct: false, explanation: 'C’est l’estimateur sans biais $S^2$, pas l’EMV.' },
          { text: '$\\hat\\sigma^2=\\frac1n\\|Y-X\\beta\\|^2$ avec le vrai $\\beta$', correct: false, explanation: 'Contient le paramètre inconnu : ce n’est pas une statistique.' },
        ],
      },
    ],
    conclusion: 'Cette Q1 était laissée vide dans le corrigé officiel du CC 2022 : la rédaction type est celle de PC2 Ex. 1 Q2. Les questions suivantes du CC (loi de $\\hat\\beta$, $\\chi^2(n-2)$, région de Fieller) reposent sur ces formules.',
  },
  {
    id: 'ch2-etape-gamma-emv',
    type: 'etape-suivante',
    title: 'PC7 Ex. 2 Q1–Q2 : EMV de Gamma(2, θ) et son biais',
    source: 'PC7 Ex. 2 Q1–Q2',
    origin: 'pc',
    difficulty: 2,
    tags: ['emv', 'gamma', 'biais'],
    setup: '$n$-échantillon de $\\Gamma(2,\\theta)$, densité $\\theta^2x\\mathrm{e}^{-\\theta x}\\mathbb{1}_{\\mathbb{R}_+^\\ast}(x)$ (intensité $\\theta$, $\\mathbb{E}_\\theta[X]=2/\\theta$) ; additivité : $\\sum_iX_i\\sim\\Gamma(2n,\\theta)$.',
    steps: [
      {
        prompt: 'Étape 1 — La log-vraisemblance (à une constante $C$ près) et sa dérivée :',
        choices: [
          { text: '$2n\\log\\theta-\\theta\\sum_iX_i+C$, dérivée $\\frac{2n}\\theta-\\sum_iX_i$', correct: true, explanation: '$\\mathrm{L}_n(\\theta)=\\theta^{2n}(\\prod_iX_i)\\mathrm{e}^{-\\theta\\sum_iX_i}$ ; $\\log\\prod_iX_i$ est constant en $\\theta$.' },
          { text: '$n\\log\\theta-\\theta\\sum_iX_i+C$, dérivée $\\frac n\\theta-\\sum_iX_i$', correct: false, explanation: 'Le facteur est $\\theta^2$ par observation (forme $a=2$), donc $\\theta^{2n}$.' },
          { text: '$2n\\log\\theta-\\theta\\prod_iX_i+C$', correct: false, explanation: 'L’exponentielle donne $-\\theta\\sum_iX_i$, pas un produit.' },
        ],
      },
      {
        prompt: 'Étape 2 — L’EMV est :',
        choices: [
          { text: '$\\hat\\theta_n=\\dfrac{2n}{\\sum_iX_i}=\\dfrac2{\\bar X_n}$, maximum global car la dérivée seconde $-2n/\\theta^2$ est $<0$ (stricte concavité).', correct: true, explanation: 'Annulation du score + Lemme 2.3.' },
          { text: '$\\hat\\theta_n=\\bar X_n/2$', correct: false, explanation: 'C’est l’EMV de $1/\\theta$ (espérance divisée par 2), par invariance ; pas celui de $\\theta$.' },
          { text: '$\\hat\\theta_n=1/\\bar X_n$', correct: false, explanation: 'Valable pour $\\Gamma(1,\\theta)=\\mathcal{E}(\\theta)$ ; ici l’espérance est $2/\\theta$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Avec $S=\\sum_iX_i\\sim\\Gamma(2n,\\theta)$, $\\mathbb{E}_\\theta[1/S]=\\dfrac{\\theta}{2n-1}$. Le biais de $\\hat\\theta_n$ vaut :',
        choices: [
          { text: '$\\mathbb{E}_\\theta[\\hat\\theta_n]-\\theta=\\dfrac{2n\\theta}{2n-1}-\\theta=\\dfrac{\\theta}{2n-1}>0$', correct: true, explanation: 'Jensen : $\\mathbb{E}[1/S]>1/\\mathbb{E}[S]$ donne un biais positif, qui tend vers 0.' },
          { text: '$0$ : l’EMV est sans biais.', correct: false, explanation: 'Faux : $\\mathbb{E}[2n/S]\\ne2n/\\mathbb{E}[S]=\\theta$ (Jensen, $x\\mapsto1/x$ strictement convexe).' },
          { text: '$-\\dfrac{\\theta}{2n-1}$', correct: false, explanation: 'Signe faux : l’inverse d’une moyenne surestime l’inverse de l’espérance.' },
        ],
      },
    ],
    conclusion: 'Même structure que l’Ex. 1.7 (exponentielle, $a=1$ : biais $\\theta/(n-1)$). La suite de la PC7 (consistance, normalité asymptotique, IC) relève du ch.6.',
  },
  {
    id: 'ch2-etape-moments-2025',
    type: 'etape-suivante',
    title: 'Examen 2025 Ex. 2 Q9(a) : estimateur des moments de la log-normale',
    source: 'Examen 2025 Ex. 2 Q9(a) ; Poly ch.2, Déf. 1.2, Ex. 1.5',
    origin: 'annale',
    difficulty: 2,
    tags: ['methode-moments', 'lognormale'],
    setup: '$X=\\mathrm{e}^{\\mu+\\sigma\\xi}$, $\\xi\\sim\\mathcal{N}(0,1)$ ; rappel du sujet : $\\mathbb{E}[\\mathrm{e}^{t\\xi}]=\\mathrm{e}^{t^2/2}$. On note $\\hat m_k=\\frac1n\\sum_iX_i^k$ et on cherche l’estimateur des moments de $(\\mu,\\sigma^2)$ associé à $T_1(x)=x$, $T_2(x)=x^2$.',
    steps: [
      {
        prompt: 'Étape 1 — Les moments exacts $m_k=\\mathbb{E}_\\theta[X^k]$ valent :',
        choices: [
          { text: '$m_k=\\mathrm{e}^{k\\mu+k^2\\sigma^2/2}$', correct: true, explanation: '$X^k=\\mathrm{e}^{k\\mu}\\mathrm{e}^{k\\sigma\\xi}$ et $\\mathbb{E}[\\mathrm{e}^{k\\sigma\\xi}]=\\mathrm{e}^{k^2\\sigma^2/2}$.' },
          { text: '$m_k=\\mathrm{e}^{k\\mu}$', correct: false, explanation: 'Oubli du terme de variance : $\\mathbb{E}[\\mathrm{e}^{k\\sigma\\xi}]\\ne1$.' },
          { text: '$m_k=k\\mu+k^2\\sigma^2/2$', correct: false, explanation: 'Ce sont les moments de $\\ln X^k$, pas de $X^k$ ; il manque l’exponentielle.' },
        ],
      },
      {
        prompt: 'Étape 2 — En passant au logarithme, le système $m_1=\\hat m_1$, $m_2=\\hat m_2$ devient :',
        choices: [
          { text: '$\\mu+\\frac{\\sigma^2}2=\\ln\\hat m_1$ et $2\\mu+2\\sigma^2=\\ln\\hat m_2$', correct: true, explanation: 'Système linéaire en $(\\mu,\\sigma^2)$.' },
          { text: '$\\mu+\\sigma^2=\\ln\\hat m_1$ et $2\\mu+\\sigma^2=\\ln\\hat m_2$', correct: false, explanation: 'Les coefficients de $\\sigma^2$ sont $k^2/2$ : $\\frac12$ puis $2$.' },
          { text: '$\\mu=\\hat m_1$ et $\\sigma^2=\\hat m_2-\\hat m_1^2$', correct: false, explanation: 'Ce serait l’estimateur des moments d’un modèle où $\\mu$ et $\\sigma^2$ sont espérance et variance de $X$ ; ici ce sont ceux de $\\ln X$.' },
        ],
      },
      {
        prompt: 'Étape 3 — La solution du système est :',
        choices: [
          { text: '$\\hat\\mu_{Mom}=2\\ln\\hat m_1-\\frac12\\ln\\hat m_2$, $\\widehat{\\sigma^2}_{Mom}=\\ln\\hat m_2-2\\ln\\hat m_1=\\ln\\dfrac{\\hat m_2}{\\hat m_1^2}$', correct: true, explanation: 'Soustraire deux fois la première équation à la seconde donne $\\sigma^2$, puis $\\mu=\\ln\\hat m_1-\\sigma^2/2$.' },
          { text: '$\\hat\\mu_{Mom}=\\ln\\hat m_1$, $\\widehat{\\sigma^2}_{Mom}=\\ln\\hat m_2$', correct: false, explanation: 'Ne résout pas le système : $\\ln m_1=\\mu+\\sigma^2/2\\ne\\mu$.' },
          { text: '$\\hat\\mu_{Mom}=\\frac12\\ln\\hat m_2-2\\ln\\hat m_1$, $\\widehat{\\sigma^2}_{Mom}=2\\ln\\hat m_1-\\ln\\hat m_2$', correct: false, explanation: 'Signes inversés ; cette « variance » serait négative par Cauchy-Schwarz.' },
        ],
      },
      {
        prompt: 'Étape 4 — L’estimateur appartient-il à $\\Theta=\\mathbb{R}\\times\\mathbb{R}_+^\\ast$ ?',
        choices: [
          { text: 'Oui p.s. pour $n\\ge2$ : $\\hat m_2>\\hat m_1^2$ par Cauchy-Schwarz (inégalité stricte dès que les $X_i$ ne sont pas tous égaux), donc $\\widehat{\\sigma^2}_{Mom}>0$.', correct: true, explanation: 'Vérification d’appartenance à $\\Theta$ exigée par la Méthode 1.1 (DIAGNOSTIC §6, piège 9).' },
          { text: 'Non : $\\widehat{\\sigma^2}_{Mom}$ peut être négatif avec probabilité positive.', correct: false, explanation: '$\\frac1n\\sum X_i^2\\ge(\\frac1n\\sum X_i)^2$ toujours (Cauchy-Schwarz / variance empirique positive).' },
          { text: 'Oui, mais seulement si $\\hat m_1>1$ pour que le logarithme soit défini.', correct: false, explanation: '$\\ln$ est défini pour tout réel $>0$ ; $\\hat m_1>0$ car les $X_i>0$.' },
        ],
      },
    ],
    conclusion: 'Suite du sujet (ch.6) : TCL multivarié pour $(\\hat m_1,\\hat m_2)$ puis méthode-δ **vectorielle** pour $\\hat\\mu_{Mom}=g(\\hat m_1,\\hat m_2)$, $g(a,b)=2\\ln a-\\frac12\\ln b$ ; variance asymptotique $\\sigma^2+\\frac23\\sigma^6+\\dots$, explosive quand $\\sigma\\to\\infty$.',
  },
  // ------------------------------------------------------------------ Associer
  {
    id: 'ch2-assoc-modele-emv',
    type: 'associer',
    title: 'Modèle ↔ estimateur du maximum de vraisemblance',
    source: 'Poly ch.2, Ex. 1.7–1.11, Ex. 1.13 ; PC7 Ex. 2',
    origin: 'poly',
    difficulty: 1,
    tags: ['emv', 'cours'],
    prompt: 'Associer chaque modèle ($n$-échantillon) à son EMV.',
    pairs: [
      { left: '$\\mathcal{E}(\\theta)$ (intensité)', right: '$1/\\bar X_n$', explanation: 'Ex. 1.7 : $\\ell_n=\\log\\vartheta-\\vartheta\\bar X_n$.' },
      { left: '$\\mathcal{U}([0,\\theta])$', right: '$X_{n:n}=\\max_iX_i$', explanation: 'Ex. 1.11 : étude directe, vraisemblance non dérivable.' },
      { left: 'Laplace $\\frac12\\mathrm{e}^{-|x-\\theta|}$, $n$ impair', right: 'médiane empirique $X_{m+1:n}$', explanation: 'Ex. 1.13 : minimiser $\\sum_i|X_i-\\vartheta|$.' },
      { left: '$\\mathcal{N}(\\mu,\\sigma^2)$, paramètre $\\sigma^2$', right: '$\\frac1n\\sum_i(X_i-\\bar X_n)^2$', explanation: 'Ex. 1.10 : variance non corrigée, biaisée.' },
      { left: '$\\Gamma(2,\\theta)$ (intensité)', right: '$2/\\bar X_n$', explanation: 'PC7 Ex. 2 : $\\ell_n=2n\\log\\theta-\\theta\\sum X_i+C$.' },
      { left: '$\\mathcal{P}\\mathrm{oi}(\\theta)$ avec $\\bar X_n>0$', right: '$\\bar X_n$', explanation: 'Ex. 1.9 ; non défini si $\\bar X_n=0$.' },
    ],
  },
  {
    id: 'ch2-assoc-qualificatifs',
    type: 'associer',
    title: 'Estimateur ↔ qualificatifs (moments, Z, M)',
    source: 'Poly ch.2, Ex. 1.6, 1.13, 1.15 ; Ex. 4.3 ; Questions courtes p. 33',
    origin: 'poly',
    difficulty: 2,
    tags: ['z-estimateur', 'm-estimateur', 'methode-moments', 'cours'],
    prompt: 'Modèle de translation $q_\\theta(x)=f(x-\\theta)$, $f$ paire. Associer chaque estimateur à la description exacte de son statut.',
    pairs: [
      { left: 'Moyenne empirique $\\bar X_n$', right: 'Estimateur des moments ($T(x)=x$), Z-estimateur ($\\psi=x-\\theta$) **et** M-estimateur ($m=-(x-\\vartheta)^2$)', explanation: 'Ex. 1.6 et 1.15 : les trois qualificatifs.' },
      { left: 'Médiane empirique', right: 'Z-estimateur ($\\psi=\\mathrm{signe}(x-\\theta)$) et M-estimateur ($m=-|x-\\vartheta|$), mais pas estimateur des moments', explanation: 'Ex. 1.6 et 1.15 ; EMV de Laplace.' },
      { left: 'EMV d’un modèle dominé (intégrabilité de $\\log q_\\vartheta$)', right: 'M-estimateur associé à $m(\\vartheta,x)=\\log q_\\vartheta(x)$', explanation: 'Déf. 1.8, remarque : $M_{\\theta^\\star}=M_{\\theta^\\star}(\\theta^\\star)-\\mathrm{KL}$.' },
      { left: 'Estimateur des moments associé à $\\mathbf{T}$', right: 'Z-estimateur associé à $\\boldsymbol\\psi(\\vartheta,x)=\\mathbf{T}(x)-\\mathbb{E}_\\vartheta[\\mathbf{T}(X_1)]$', explanation: 'Éq. (3) p. 14.' },
      { left: 'M-estimateur avec $\\Theta$ ouvert et $m$ différentiable en $\\vartheta$', right: 'Z-estimateur associé à $\\boldsymbol\\psi=\\nabla_\\vartheta m$ (si l’on peut dériver sous l’espérance)', explanation: 'Remarque p. 26–27.' },
    ],
  },
  {
    id: 'ch2-assoc-famille-expo',
    type: 'associer',
    title: 'Famille exponentielle canonique : loi ↔ statistique T et log-partition A(η)',
    source: 'PC2 Ex. 3 Q1 (tableau récapitulatif)',
    origin: 'pc',
    difficulty: 2,
    tags: ['famille-exponentielle'],
    prompt: 'Associer chaque loi à son écriture canonique $q_\\eta(x)=h(x)\\exp(\\eta T(x)-A(\\eta))$ : statistique $T$, log-partition $A(\\eta)$ et espace $\\Xi$.',
    pairs: [
      { left: '$\\mathcal{E}(\\eta)$, densité $\\eta\\mathrm{e}^{-\\eta x}\\mathbb{1}_{\\mathbb{R}_+}$', right: '$T(x)=-x$, $A(\\eta)=-\\log\\eta$, $\\Xi=]0,+\\infty[$', explanation: 'Attention au signe de $T$.' },
      { left: '$\\mathcal{N}(\\eta,1)$', right: '$T(x)=x$, $A(\\eta)=\\eta^2/2$, $\\Xi=\\mathbb{R}$, $h(x)=(2\\pi)^{-1/2}\\mathrm{e}^{-x^2/2}$', explanation: 'Complétion du carré.' },
      { left: 'Poisson reparamétrée par $\\eta=\\log\\theta$', right: '$T(x)=x$, $A(\\eta)=\\mathrm{e}^\\eta$, $\\Xi=\\mathbb{R}$, $h(x)=1/x!$', explanation: '$\\sum_k\\mathrm{e}^{\\eta k}/k!=\\exp(\\mathrm{e}^\\eta)$.' },
      { left: 'Binomiale $\\mathrm{Bin}(m,\\theta)$ reparamétrée par $\\eta=\\log\\frac\\theta{1-\\theta}$', right: '$T(x)=x$, $A(\\eta)=m\\log(1+\\mathrm{e}^\\eta)$, $\\Xi=\\mathbb{R}$, $h(x)=\\binom mx$', explanation: 'Binôme de Newton.' },
      { left: 'Weibull d’échelle $\\lambda$ ($\\alpha$ fixé) reparamétrée par $\\eta=\\lambda^{-\\alpha}$', right: '$T(x)=-x^\\alpha$, $A(\\eta)=-\\log\\eta$, $\\Xi=]0,+\\infty[$, $h(x)=\\alpha x^{\\alpha-1}$', explanation: 'Changement de variable $u=x^\\alpha$ ; non canonique en $\\lambda$.' },
    ],
  },
  // ------------------------------------------------------------------ Numériques
  {
    id: 'ch2-num-uniforme-bn',
    type: 'numerique',
    title: 'Estimateur des moments de b pour U([a, b])',
    source: 'Poly ch.2, Ex. 1.5 (Remarque p. 12–13)',
    origin: 'poly',
    difficulty: 1,
    tags: ['methode-moments', 'uniforme'],
    question: 'Pour un échantillon de taille $n=10$ de $\\mathcal{U}([a,b])$, on observe $\\bar X_n=0{,}1$ et $V_n=\\overline{X^2}_n-\\bar X_n^2=0{,}09$. Calculer l’estimateur des moments $\\hat b_n=\\bar X_n+\\sqrt{3V_n}$.',
    answer: 0.6196,
    tolerance: 0.01,
    hint: 'Arrondir à 0,01.',
    explanation: '$\\sqrt{3\\times0{,}09}=\\sqrt{0{,}27}\\approx0{,}5196$, donc $\\hat b_n\\approx0{,}1+0{,}52=0{,}62$. Si l’échantillon contient une observation $\\approx1$ (neuf valeurs $\\approx0$ et une $\\approx1$ donnent exactement ces moments), $\\hat b_n<X_{n:n}$ : l’intervalle des moments ne contient pas toutes les observations, contrairement à l’EMV $[X_{1:n},X_{n:n}]$.',
  },
  {
    id: 'ch2-num-melange',
    type: 'numerique',
    title: 'EMV du coefficient de mélange (PC2 Ex. 2, analyse numérique)',
    source: 'PC2 Ex. 2 (résultats numériques du corrigé)',
    origin: 'pc',
    difficulty: 1,
    tags: ['emv', 'melange'],
    question: 'Mélange $f_\\theta=\\frac\\theta a\\mathbb{1}_{[0,a]}+\\frac{1-\\theta}b\\mathbb{1}_{[0,b]}$ avec $a=1$, $b=3$. Sur $n=200$ observations, $N_a/n=0{,}525$. Calculer l’EMV $\\hat\\theta_n^{(1)}=\\max\\big(\\frac{b(N_a/n)-a}{b-a},0\\big)$.',
    answer: 0.2875,
    tolerance: 0.005,
    hint: 'Arrondir à 0,001.',
    explanation: '$\\hat\\theta_n=\\frac{3\\times0{,}525-1}{3-1}=\\frac{0{,}575}2=0{,}2875>0$ : pas de seuillage, $\\hat\\theta_n^{(1)}=0{,}2875$ (les données étaient simulées sous $\\theta=0{,}2$ : l’EMV diffère de la vraie valeur). Pour $n=10$ avec $N_a/n=0{,}30\\le a/b=1/3$, on aurait $\\hat\\theta_n=-0{,}05$ et $\\hat\\theta_n^{(1)}=0$ (maximum au bord).',
  },
  {
    id: 'ch2-num-biais-exp',
    type: 'numerique',
    title: 'Espérance de l’EMV de l’intensité exponentielle',
    source: 'Poly ch.2, Ex. 1.4 (Remarque p. 11) ; Examen 2025 Ex. 1 (remarque)',
    origin: 'poly',
    difficulty: 1,
    tags: ['emv', 'biais', 'exponentielle'],
    question: 'Pour un $n$-échantillon de $\\mathcal{E}(\\theta)$, $\\mathbb{E}_\\theta[1/\\bar X_n]=\\frac{n\\theta}{n-1}$ ($n\\ge2$). Calculer $\\mathbb{E}_\\theta[\\hat\\theta_n^{\\mathrm{MV}}]$ pour $n=10$ et $\\theta=2$.',
    answer: 2.2222,
    tolerance: 0.01,
    hint: 'Arrondir à 0,01.',
    explanation: '$\\frac{10\\times2}{9}=\\frac{20}9\\approx2{,}22$ : biais $+0{,}22$ (l’inverse d’une moyenne surestime l’inverse de l’espérance, Jensen). L’EQM vaut $\\frac{(n+2)\\theta^2}{(n-1)(n-2)}=\\frac{12\\times4}{72}\\approx0{,}667$. L’estimateur $\\frac{n-1}n\\cdot\\frac1{\\bar X_n}$ est sans biais.',
  },
  // ------------------------------------------------------------------ Annales
  {
    id: 'ch2-annale-2025-lognormale',
    type: 'annale',
    title: 'Examen 2025 Ex. 2 (Q1, Q2, Q9a) — Loi log-normale : densité, EMV, estimateur des moments',
    source: 'Examen 2025 Ex. 2 Q1, Q2, Q9(a) (reformulé : partie « estimation ponctuelle ») ; corrigé d’après DIAGNOSTIC §2.A',
    origin: 'annale',
    difficulty: 2,
    tags: ['emv', 'methode-moments', 'lognormale', 'modele-induit', 'invariance'],
    durationMin: 25,
    statement: `Soit $\\xi\\sim\\mathcal{N}(0,1)$ et $X=\\mathrm{e}^{\\mu+\\sigma\\xi}$ avec $\\theta=(\\mu,\\sigma^2)\\in\\Theta=\\mathbb{R}\\times\\mathbb{R}_+^\\ast$ : $X$ suit la loi log-normale $LN(\\mu,\\sigma^2)$. On observe un $n$-échantillon $(X_1,\\dots,X_n)$ ($n\\ge2$) et on note $Y_i=\\ln X_i$. **Rappel du sujet :** $\\mathbb{E}[\\mathrm{e}^{t\\xi}]=\\mathrm{e}^{t^2/2}$ pour tout $t\\in\\mathbb{R}$.

1. Déterminer le support $S$ de la loi de $X$ et montrer que sa densité par rapport à la mesure de Lebesgue est $p_{\\mu,\\sigma}(x)=\\dfrac{\\exp\\big(-(\\ln x-\\mu)^2/(2\\sigma^2)\\big)}{x\\sqrt{2\\pi\\sigma^2}}\\mathbb{1}_S(x)$.
2. Déterminer l’estimateur du maximum de vraisemblance $(\\hat\\mu_{ML},\\widehat{\\sigma^2}_{ML})$ de $(\\mu,\\sigma^2)$. En déduire l’EMV de $\\sigma$.
3. Calculer $m_k:=\\mathbb{E}_\\theta[X^k]$ pour $k\\in\\mathbb{N}^\\ast$. En déduire l’estimateur des moments $(\\hat\\mu_{Mom},\\widehat{\\sigma^2}_{Mom})$ de $(\\mu,\\sigma^2)$ associé à $T_1(x)=x$ et $T_2(x)=x^2$, et vérifier qu’il est bien défini (à valeurs dans $\\Theta$) presque sûrement.
4. Les deux estimateurs de $\\sigma^2$ coïncident-ils ? Commenter en une phrase.`,
    hints: [
      'Q1 : méthode de la fonction muette : pour $h$ mesurable bornée, écrire $\\mathbb{E}[h(X)]=\\mathbb{E}[h(\\mathrm{e}^{\\mu+\\sigma\\xi})]$ comme une intégrale en $y$, puis poser $x=\\mathrm{e}^y$.',
      'Q2 : dans $\\log\\mathrm{L}_n$, le terme $-\\sum_i\\ln X_i$ ne dépend pas de $\\theta$ ; le reste est la log-vraisemblance du $n$-échantillon gaussien $(Y_i)$ : Ex. 1.10 (maximisation en deux temps) puis Prop. 1.2 pour $\\sigma$.',
      'Q3 : $X^k=\\mathrm{e}^{k\\mu}\\mathrm{e}^{k\\sigma\\xi}$ ; prendre le logarithme des deux équations $m_1=\\hat m_1$, $m_2=\\hat m_2$ : système linéaire en $(\\mu,\\sigma^2)$ ; Cauchy-Schwarz pour le signe de $\\widehat{\\sigma^2}_{Mom}$.',
    ],
    correction: `**Q1.** $X=\\mathrm{e}^{\\mu+\\sigma\\xi}>0$ donc $S=]0,+\\infty[$. Pour $h$ mesurable bornée, par le théorème de transfert,
$$\\mathbb{E}[h(X)]=\\int_{\\mathbb{R}}h(\\mathrm{e}^y)\\frac1{\\sqrt{2\\pi\\sigma^2}}\\mathrm{e}^{-(y-\\mu)^2/(2\\sigma^2)}\\,\\mathrm{d}y.$$
Le changement de variable $x=\\mathrm{e}^y$ ($y=\\ln x$, $\\mathrm{d}y=\\mathrm{d}x/x$, bijection croissante de $\\mathbb{R}$ sur $]0,+\\infty[$) donne $\\mathbb{E}[h(X)]=\\int_0^{+\\infty}h(x)\\frac{1}{x\\sqrt{2\\pi\\sigma^2}}\\mathrm{e}^{-(\\ln x-\\mu)^2/(2\\sigma^2)}\\,\\mathrm{d}x$. Cette identité valant pour toute $h$ mesurable bornée, elle identifie la densité $p_{\\mu,\\sigma}$ (ch.1, méthode de la fonction muette). Le modèle est dominé par $\\mathrm{Leb}$.

**Q2.** Par indépendance, la vraisemblance est $\\mathrm{L}_n(\\mu,\\sigma^2)=\\prod_ip_{\\mu,\\sigma}(X_i)$ et
$$\\log\\mathrm{L}_n(\\mu,\\sigma^2)=-\\sum_{i=1}^n\\ln X_i-\\frac n2\\ln(2\\pi\\sigma^2)-\\frac1{2\\sigma^2}\\sum_{i=1}^n(Y_i-\\mu)^2.$$
Le premier terme ne dépend pas de $(\\mu,\\sigma^2)$ : maximiser $\\mathrm{L}_n$ revient à maximiser la log-vraisemblance du $n$-échantillon gaussien $(Y_1,\\dots,Y_n)$, $Y_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$ (modèle induit). D’après l’**Exemple 1.10 du ch.2** : avec la variable libre $(m,v)$, les équations de vraisemblance sont $\\sum_i(Y_i-m)=0$ et $-\\frac n{2v}+\\frac1{2v^2}\\sum_i(Y_i-m)^2=0$ ; à $v$ fixé, $m\\mapsto-\\frac1{2v}\\sum_i(Y_i-m)^2$ est strictement concave, maximale en $m=\\bar Y_n$ ; puis $v\\mapsto-\\frac n2\\ln v-\\frac{nS}{2v}$ avec $S=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2$ a pour dérivée $\\frac{n(S-v)}{2v^2}$, positive avant $S$, négative après : maximum en $v=S$. L’enchaînement $\\ell_n(m,v)\\le\\ell_n(\\bar Y_n,v)\\le\\ell_n(\\bar Y_n,S)$ (égalité ssi $(m,v)=(\\bar Y_n,S)$) donne existence et unicité, $S>0$ p.s. car les $Y_i$ ne sont pas tous égaux (loi à densité, $n\\ge2$). Ainsi
$$\\hat\\mu_{ML}=\\bar Y_n=\\frac1n\\sum_{i=1}^n\\ln X_i,\\qquad\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_{i=1}^n(\\ln X_i-\\bar Y_n)^2=\\frac{n-1}nS_n^2.$$
Par **invariance de l’EMV par reparamétrisation (Prop. 1.2 du ch.2)**, avec la bijection $G:(\\mu,\\sigma^2)\\mapsto(\\mu,\\sqrt{\\sigma^2})$ de $\\Theta$ sur $\\mathbb{R}\\times\\mathbb{R}_+^\\ast$, l’EMV de $\\sigma$ est $\\hat\\sigma_{ML}=\\big(\\frac1n\\sum_i(Y_i-\\bar Y_n)^2\\big)^{1/2}$ (Ex. 1.14), sans nouveau calcul.

**Q3.** $X^k=\\mathrm{e}^{k\\mu}\\mathrm{e}^{k\\sigma\\xi}$, donc par le rappel $m_k=\\mathrm{e}^{k\\mu}\\mathbb{E}[\\mathrm{e}^{k\\sigma\\xi}]=\\mathrm{e}^{k\\mu+k^2\\sigma^2/2}$ (fini pour tout $k$ : la méthode des moments est licite, Méthode 1.1 étape 1). Moments exacts $e_1(\\theta)=m_1$, $e_2(\\theta)=m_2$ ; moments empiriques $\\hat m_1=\\bar X_n$, $\\hat m_2=\\overline{X^2}_n$. Le système $e_j(\\vartheta)=\\hat m_j$ s’écrit, par passage au logarithme (licite car $\\hat m_j>0$) :
$$\\mu+\\tfrac{\\sigma^2}2=\\ln\\hat m_1,\\qquad2\\mu+2\\sigma^2=\\ln\\hat m_2,$$
système linéaire de déterminant $2-1=1\\ne0$ : solution unique
$$\\widehat{\\sigma^2}_{Mom}=\\ln\\hat m_2-2\\ln\\hat m_1=\\ln\\frac{\\hat m_2}{\\hat m_1^2},\\qquad\\hat\\mu_{Mom}=2\\ln\\hat m_1-\\tfrac12\\ln\\hat m_2.$$
Appartenance à $\\Theta$ : par Cauchy-Schwarz, $\\hat m_1^2=(\\frac1n\\sum_iX_i)^2\\le\\frac1n\\sum_iX_i^2=\\hat m_2$, avec égalité ssi tous les $X_i$ sont égaux, événement de probabilité nulle pour $n\\ge2$ (loi à densité). Donc $\\widehat{\\sigma^2}_{Mom}>0$ p.s. : l’estimateur des moments est bien défini et à valeurs dans $\\Theta$ presque sûrement (Déf. 1.2 : solution unique dans $\\Theta$).

**Q4.** Non : $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(\\ln X_i-\\overline{\\ln X}_n)^2$ (variance empirique des **logarithmes**) alors que $\\widehat{\\sigma^2}_{Mom}=\\ln(\\hat m_2/\\hat m_1^2)$ (fonction des moments empiriques de $X$). Les deux procédés ne coïncident pas en général ; ils coïncident dans les familles exponentielles pour la statistique canonique (ici $T=(\\ln x,(\\ln x)^2)$, pas $(x,x^2)$). La comparaison asymptotique (Examen 2025 Q9–Q10, ch.6) montre que l’EMV est toujours meilleur, l’estimateur des moments ayant une variance qui explose quand $\\sigma\\to\\infty$ (queues lourdes).`,
    bareme: [
      { label: 'Q1 — support et densité (fonction muette, jacobien 1/x)', points: 1 },
      { label: 'Q2 — EMV : terme constant, Ex. 1.10 avec justification du maximum, invariance pour σ', points: 2 },
      { label: 'Q3 — moments m_k, système, inversion, appartenance à Θ (Cauchy-Schwarz)', points: 1.5 },
      { label: 'Q4 — commentaire', points: 0.5 },
    ],
  },
  {
    id: 'ch2-annale-regression',
    type: 'annale',
    title: 'CC 2022 Ex. 4 Q1–Q3 et PC2 Ex. 1 Q7 — Régression linéaire simple gaussienne',
    source: 'CC MAP433 2022 Ex. 4 Q1–Q3 (reformulé) ; PC2 Ex. 1 Q2–Q7 ; corrigé d’après le poly ch.2 (Exercice 1) et DIAGNOSTIC §2.B',
    origin: 'annale',
    difficulty: 2,
    tags: ['regression', 'emv', 'cochran', 'intervalle-confiance', 'vecteur-gaussien'],
    durationMin: 35,
    statement: `Soient $x_1,\\dots,x_n$ des réels **connus**, non tous égaux, $n\\ge3$. On observe $\\mathbf{Y}=(Y_1,\\dots,Y_n)^\\top\\sim\\mathcal{N}(\\mathbf{X}\\beta,\\sigma^2I_n)$ où $\\mathbf{X}=[\\mathbf{1}\\ \\underline{\\mathbf{x}}]\\in\\mathbb{R}^{n\\times2}$, $\\beta=(\\beta_1,\\beta_2)^\\top\\in\\mathbb{R}^2$ et $\\sigma^2>0$ sont inconnus. On note $\\bar x=\\frac1n\\sum_ix_i$, $\\bar Y=\\frac1n\\sum_iY_i$ et $P=\\mathbf{X}(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top$.

1. Montrer que $\\mathbf{X}^\\top\\mathbf{X}$ est inversible. Déterminer l’EMV $(\\hat\\beta,\\hat\\sigma^2)$ de $(\\beta,\\sigma^2)$ ; donner les expressions explicites de $\\hat\\beta_1$, $\\hat\\beta_2$ et montrer que $\\hat\\sigma^2=\\frac1n\\|(I_n-P)\\mathbf{Y}\\|^2$.
2. Déterminer la loi de $\\hat\\beta$. À quelle condition sur les $x_i$ les variables $\\hat\\beta_1$ et $\\hat\\beta_2$ sont-elles indépendantes ?
3. Montrer que $\\hat\\sigma^2$ est indépendant de $\\hat\\beta$ et que $n\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-2)$. En déduire $\\mathbb{E}_\\theta[\\hat\\sigma^2]$.
4. Soit $\\alpha\\in]0,1[$. Construire un intervalle de confiance de niveau $1-\\alpha$ pour $\\sigma^2$.`,
    hints: [
      'Q1 : $\\det(\\mathbf{X}^\\top\\mathbf{X})=n\\sum_i(x_i-\\bar x)^2$ ; à $\\sigma^2$ fixé, maximiser $\\ell_n$ en $\\beta$ revient à minimiser $\\|\\mathbf{Y}-\\mathbf{X}b\\|^2$ (équations normales) ; puis maximiser en $v=\\sigma^2$ comme dans l’Ex. 1.10.',
      'Q2–Q3 : $\\hat\\beta=A\\mathbf{Y}$ est une image linéaire d’un vecteur gaussien ; $\\hat\\beta$ dépend de $P\\mathbf{Y}$, $\\hat\\sigma^2$ de $(I_n-P)\\mathbf{Y}$ : théorème de Cochran (ch.1 Thm 1.1) avec $F=\\mathrm{Im}(\\mathbf{X})$ de dimension 2 et $\\mathbf{X}\\beta\\in F$.',
      'Q4 : $n\\hat\\sigma^2/\\sigma^2$ a une loi qui ne dépend pas de $\\theta$ (fonction pivotale, Déf. 2.2) ; encadrer par les quantiles $q^{n-2}_{\\alpha/2}$, $q^{n-2}_{1-\\alpha/2}$ et résoudre en $\\sigma^2$ en inversant les inégalités.',
    ],
    correction: `**Q1.** $\\mathbf{X}^\\top\\mathbf{X}=\\begin{pmatrix}n&\\sum_ix_i\\\\ \\sum_ix_i&\\sum_ix_i^2\\end{pmatrix}$ a pour déterminant $n\\sum_ix_i^2-(\\sum_ix_i)^2=n\\sum_i(x_i-\\bar x)^2>0$ puisque les $x_i$ ne sont pas tous égaux (cas d’égalité de Cauchy-Schwarz exclu) : elle est inversible, et définie positive car $u^\\top\\mathbf{X}^\\top\\mathbf{X}u=\\|\\mathbf{X}u\\|^2\\ge0$. Par indépendance des $Y_i\\sim\\mathcal{N}((\\mathbf{X}\\beta)_i,\\sigma^2)$, la log-vraisemblance normalisée est, pour $\\vartheta=(b,v)\\in\\mathbb{R}^2\\times\\mathbb{R}_+^\\ast$,
$$\\ell_n(b,v)=-\\tfrac12\\log(2\\pi v)-\\tfrac1{2nv}\\|\\mathbf{Y}-\\mathbf{X}b\\|^2.$$
*Maximisation en $b$ à $v$ fixé* (Méthode 1.2, cas régulier) : il s’agit de minimiser $J(b)=\\|\\mathbf{Y}-\\mathbf{X}b\\|^2$, de gradient $-2\\mathbf{X}^\\top(\\mathbf{Y}-\\mathbf{X}b)$ et de hessienne $2\\mathbf{X}^\\top\\mathbf{X}$ définie positive : $J$ est strictement convexe et son unique minimum est caractérisé par les **équations normales** $\\mathbf{X}^\\top\\mathbf{X}b=\\mathbf{X}^\\top\\mathbf{Y}$, soit $\\hat\\beta=(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top\\mathbf{Y}$. Explicitement, la première équation $nb_1+b_2\\sum_ix_i=\\sum_iY_i$ donne $b_1=\\bar Y-b_2\\bar x$ ; reportée dans la seconde : $\\hat\\beta_2=\\dfrac{\\sum_i(x_i-\\bar x)(Y_i-\\bar Y)}{\\sum_i(x_i-\\bar x)^2}$, $\\hat\\beta_1=\\bar Y-\\hat\\beta_2\\bar x$. Géométriquement $\\mathbf{X}\\hat\\beta=P\\mathbf{Y}$ : $P$ est symétrique, idempotente, d’image $F=\\mathrm{Im}(\\mathbf{X})$ (dimension 2) : c’est la projection orthogonale sur $F$, et $\\mathbf{Y}-\\mathbf{X}\\hat\\beta=(I_n-P)\\mathbf{Y}$.
*Maximisation en $v$* : $v\\mapsto\\ell_n(\\hat\\beta,v)=-\\frac12\\log(2\\pi v)-\\frac S{2v}$ avec $S=\\frac1n\\|(I_n-P)\\mathbf{Y}\\|^2$ a pour dérivée $\\frac{S-v}{2v^2}$ : maximum en $v=S$ si $S>0$. Comme $\\ell_n(b,v)\\le\\ell_n(\\hat\\beta,v)\\le\\ell_n(\\hat\\beta,S)$ avec égalité ssi $(b,v)=(\\hat\\beta,S)$, l’EMV existe, est unique : $\\hat\\sigma^2=\\frac1n\\|(I_n-P)\\mathbf{Y}\\|^2=\\frac1n\\sum_i(Y_i-\\hat\\beta_1-\\hat\\beta_2x_i)^2$ ($S>0$ p.s. par Q3, la loi $\\chi^2(n-2)$ ayant une densité pour $n\\ge3$). Les coefficients EMV sont ceux des **moindres carrés**.

**Q2.** $\\hat\\beta=A\\mathbf{Y}$ avec $A=(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top$. Image linéaire du vecteur gaussien $\\mathbf{Y}\\sim\\mathcal{N}(\\mathbf{X}\\beta,\\sigma^2I_n)$ (ch.1, Prop. 2.4) : $\\hat\\beta\\sim\\mathcal{N}(A\\mathbf{X}\\beta,\\sigma^2AA^\\top)=\\mathcal{N}\\big(\\beta,\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\big)$ car $A\\mathbf{X}=I_2$ et $AA^\\top=(\\mathbf{X}^\\top\\mathbf{X})^{-1}$ ; en particulier $\\hat\\beta$ est **sans biais**. Avec $(\\mathbf{X}^\\top\\mathbf{X})^{-1}=\\frac1{n\\sum_i(x_i-\\bar x)^2}\\begin{pmatrix}\\sum_ix_i^2&-\\sum_ix_i\\\\-\\sum_ix_i&n\\end{pmatrix}$, $\\mathrm{Cov}_\\theta(\\hat\\beta_1,\\hat\\beta_2)=-\\dfrac{\\sigma^2\\bar x}{\\sum_i(x_i-\\bar x)^2}$. Les coordonnées d’un vecteur gaussien sont indépendantes ssi décorrélées (ch.1, Prop. 2.6) : $\\hat\\beta_1$ et $\\hat\\beta_2$ sont indépendants **ssi $\\bar x=0$**.

**Q3.** $\\mathbf{Y}-\\mathbf{X}\\beta\\sim\\mathcal{N}(0,\\sigma^2I_n)$ et $\\mathbb{R}^n=F\\oplus F^\\perp$ avec $\\dim F=2$, $\\dim F^\\perp=n-2$. Par le **théorème de Cochran** (ch.1, Thm 1.1), $P(\\mathbf{Y}-\\mathbf{X}\\beta)$ et $(I_n-P)(\\mathbf{Y}-\\mathbf{X}\\beta)$ sont indépendants et $\\|(I_n-P)(\\mathbf{Y}-\\mathbf{X}\\beta)\\|^2/\\sigma^2\\sim\\chi^2(n-2)$. Or $\\mathbf{X}\\beta\\in F$ donc $(I_n-P)\\mathbf{X}\\beta=0$ et $(I_n-P)(\\mathbf{Y}-\\mathbf{X}\\beta)=(I_n-P)\\mathbf{Y}$ ; de même $P\\mathbf{Y}=P(\\mathbf{Y}-\\mathbf{X}\\beta)+\\mathbf{X}\\beta$. Donc $\\dfrac{n\\hat\\sigma^2}{\\sigma^2}=\\dfrac{\\|(I_n-P)\\mathbf{Y}\\|^2}{\\sigma^2}\\sim\\chi^2(n-2)$. Comme $\\hat\\sigma^2$ est une fonction mesurable de $(I_n-P)\\mathbf{Y}$ et $\\hat\\beta=(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top P\\mathbf{Y}$ une fonction mesurable de $P\\mathbf{Y}$ (car $\\mathbf{X}^\\top P=\\mathbf{X}^\\top$), $\\hat\\sigma^2$ et $\\hat\\beta$ sont indépendants. Enfin $\\mathbb{E}[\\chi^2(n-2)]=n-2$ donne $\\mathbb{E}_\\theta[\\hat\\sigma^2]=\\frac{n-2}n\\sigma^2$ : l’EMV de $\\sigma^2$ est **biaisé** ; $\\frac1{n-2}\\|(I_n-P)\\mathbf{Y}\\|^2$ est sans biais.

**Q4.** La loi de $G(\\mathbf{Y};\\sigma^2)=n\\hat\\sigma^2/\\sigma^2$, à savoir $\\chi^2(n-2)$, ne dépend pas de $\\theta$ : c’est une **fonction pivotale** (Déf. 2.2 du ch.2). Notons $q^{n-2}_{\\alpha/2}<q^{n-2}_{1-\\alpha/2}$ les quantiles d’ordre $\\alpha/2$ et $1-\\alpha/2$ de $\\chi^2(n-2)$ (bien définis, la loi ayant une densité strictement positive sur $\\mathbb{R}_+^\\ast$). Pour tout $\\theta$, $\\mathbb{P}_\\theta\\big(q^{n-2}_{\\alpha/2}\\le n\\hat\\sigma^2/\\sigma^2\\le q^{n-2}_{1-\\alpha/2}\\big)=1-\\frac\\alpha2-\\frac\\alpha2=1-\\alpha$. Comme $\\sigma^2>0$ et $\\hat\\sigma^2>0$ p.s., on résout en $\\sigma^2$ en **inversant les inégalités** :
$$\\mathbb{P}_\\theta\\Big(\\frac{n\\hat\\sigma^2}{q^{n-2}_{1-\\alpha/2}}\\le\\sigma^2\\le\\frac{n\\hat\\sigma^2}{q^{n-2}_{\\alpha/2}}\\Big)=1-\\alpha\\quad\\text{pour tout }\\theta\\in\\Theta.$$
L’intervalle aléatoire $\\Big[\\dfrac{n\\hat\\sigma^2}{q^{n-2}_{1-\\alpha/2}},\\ \\dfrac{n\\hat\\sigma^2}{q^{n-2}_{\\alpha/2}}\\Big]$ est donc un intervalle de confiance de niveau (exactement) $1-\\alpha$ pour $\\sigma^2$ : c’est l’intervalle qui est aléatoire, pas $\\sigma^2$. (Application : $n=10$, $\\alpha=5\\,\\%$ : $q^8_{0{,}025}\\approx2{,}18$, $q^8_{0{,}975}\\approx17{,}53$.)`,
    bareme: [
      { label: 'Q1 — inversibilité, EMV en deux temps, formules explicites, écriture avec P', points: 2 },
      { label: 'Q2 — loi gaussienne de β̂ (image linéaire), condition d’indépendance x̄ = 0', points: 1 },
      { label: 'Q3 — Cochran : indépendance, χ²(n−2), biais de σ̂²', points: 1.5 },
      { label: 'Q4 — pivot, quantiles, inversion des inégalités, interprétation', points: 1 },
    ],
  },
  {
    id: 'ch2-annale-melange',
    type: 'annale',
    title: 'PC2 Ex. 2 — Coefficient de mélange : EMV, estimateur des moments, biais',
    source: 'PC2 Ex. 2 Q1–Q3 et remarques sur le biais ; Poly ch.2, Exercice 2 (corrigé p. 41–44)',
    origin: 'pc',
    difficulty: 2,
    tags: ['emv', 'methode-moments', 'melange', 'biais', 'cas-au-bord'],
    durationMin: 30,
    statement: `Soit un $n$-échantillon $(X_1,\\dots,X_n)$ du modèle $\\big(\\mathbb{R},\\mathcal{B}(\\mathbb{R}),\\{f_\\theta\\cdot\\mathrm{Leb},\\theta\\in]0,1[\\}\\big)$ où, pour $0<a<b$ connus,
$$f_\\theta(x)=\\frac\\theta a\\mathbb{1}_{[0,a]}(x)+\\frac{1-\\theta}b\\mathbb{1}_{[0,b]}(x).$$
On note $N_a:=\\sum_{i=1}^n\\mathbb{1}_{\\{X_i\\in[0,a]\\}}$.

1. Exprimer la vraisemblance à l’aide de $N_a$.
2. En déduire l’estimateur du maximum de vraisemblance $\\hat\\theta_n^{(1)}$ de $\\theta$. On discutera soigneusement l’existence selon la valeur de $N_a/n$.
3. Par la méthode des moments d’ordre 1, proposer un estimateur $\\hat\\theta_n^{(2)}$ de $\\theta$.
4. Quelle est la loi de $N_a$ sous $\\mathbb{P}_\\theta$ ? Montrer que l’estimateur non seuillé $\\hat\\theta_n:=\\frac{b(N_a/n)-a}{b-a}$ est sans biais et que $\\hat\\theta_n^{(1)}$ ne l’est pas.`,
    hints: [
      'Q1 : écrire $f_\\vartheta$ comme une fonction constante par morceaux sur $[0,a]$ et $]a,b]$ ; le produit des $n$ facteurs ne dépend que du nombre d’observations dans chaque morceau.',
      'Q2 : dériver $\\ell_n$, mettre au même dénominateur, étudier le signe du numérateur (affine en $\\vartheta$) ; distinguer $\\hat\\theta_n\\in]0,1[$, $\\hat\\theta_n\\le0$ et $\\hat\\theta_n=1$ ; penser à prolonger le modèle à $[0,1]$.',
      'Q3–Q4 : espérance d’un mélange = mélange des espérances ($\\mathbb{E}[\\mathcal{U}([0,c])]=c/2$) ; $N_a$ est une somme de $n$ indicatrices indépendantes de même paramètre $F_\\theta(a)$ ; $\\hat\\theta_n^{(1)}\\ge\\hat\\theta_n$ avec inégalité stricte sur un événement de probabilité positive.',
    ],
    correction: `**Q1.** Pour $\\vartheta\\in]0,1[$ et $x\\in[0,b]$, $f_\\vartheta(x)=\\big(\\frac\\vartheta a+\\frac{1-\\vartheta}b\\big)\\mathbb{1}_{[0,a]}(x)+\\frac{1-\\vartheta}b\\mathbb{1}_{]a,b]}(x)$. Sous $\\mathbb{P}_\\theta$ les observations sont p.s. dans $[0,b]$ et distinctes de $a$ ; $N_a$ d’entre elles sont dans $[0,a]$ et $n-N_a$ dans $]a,b]$. Par indépendance (densité produit, ch.1),
$$\\mathrm{L}_n(\\vartheta)=\\prod_{i=1}^nf_\\vartheta(X_i)=\\Big(\\frac\\vartheta a+\\frac{1-\\vartheta}b\\Big)^{N_a}\\Big(\\frac{1-\\vartheta}b\\Big)^{n-N_a}.$$

**Q2.** Sur $]0,1[$, $\\mathrm{L}_n>0$ et $\\ell_n(\\vartheta)=\\frac{N_a}n\\log\\big(\\frac{a+\\vartheta(b-a)}{ab}\\big)+\\big(1-\\frac{N_a}n\\big)\\log\\frac{1-\\vartheta}b$ (on a utilisé $\\frac\\vartheta a+\\frac{1-\\vartheta}b=\\frac{a+\\vartheta(b-a)}{ab}$). Dérivée :
$$\\ell_n\'(\\vartheta)=\\frac{N_a}n\\cdot\\frac{b-a}{a+\\vartheta(b-a)}-\\frac{n-N_a}n\\cdot\\frac1{1-\\vartheta}=\\frac{bN_a-na-n\\vartheta(b-a)}{n(1-\\vartheta)(a+\\vartheta(b-a))}.$$
Le dénominateur est strictement positif sur $]0,1[$ ; le numérateur est affine, strictement décroissant en $\\vartheta$, nul en $\\hat\\theta_n:=\\frac{bN_a-na}{n(b-a)}=\\frac{b(N_a/n)-a}{b-a}$. Comme $0\\le N_a/n\\le1$, $\\hat\\theta_n\\le1$ (égalité ssi $N_a=n$) et $\\hat\\theta_n>0$ ssi $N_a/n>a/b$. Trois cas :
- si $a/b<N_a/n<1$ : $\\ell_n\'>0$ sur $]0,\\hat\\theta_n[$ et $<0$ sur $]\\hat\\theta_n,1[$, donc $\\hat\\theta_n$ est l’unique maximum global : l’EMV existe, est unique et vaut $\\hat\\theta_n$ ;
- si $N_a/n\\le a/b$ : $\\ell_n\'<0$ sur $]0,1[$, $\\ell_n$ est strictement décroissante et sa borne supérieure (limite en $0$) n’est **pas atteinte** : il n’y a **pas d’EMV** dans $\\Theta=]0,1[$ ;
- si $N_a=n$ : $\\ell_n$ strictement croissante, pas d’EMV non plus.
Comme $f_0$ et $f_1$ sont les densités de $\\mathcal{U}([0,b])$ et $\\mathcal{U}([0,a])$, on **prolonge le modèle au fermé $[0,1]$**, où $\\mathrm{L}_n$ est continue et atteint son maximum en un point unique, $\\hat\\theta_n\\vee0$ (qui vaut $1$ si $N_a=n$). L’estimateur retenu est $\\hat\\theta_n^{(1)}:=\\max(\\hat\\theta_n,0)$ ; il coïncide avec l’EMV du modèle initial sur $\\{a/b<N_a/n<1\\}$, événement de probabilité tendant vers 1 par la loi des grands nombres ($N_a/n\\to p_\\theta:=\\theta+(1-\\theta)\\frac ab\\in]a/b,1[$, Prop. 1.1 / Thm 2.1).

**Q3.** Moment exact associé à $T(x)=x$ : $e(\\theta)=\\mathbb{E}_\\theta[X_1]=\\theta\\int_0^a\\frac xa\\,\\mathrm{d}x+(1-\\theta)\\int_0^b\\frac xb\\,\\mathrm{d}x=\\theta\\frac a2+(1-\\theta)\\frac b2=\\frac b2-\\theta\\frac{b-a}2$ (espérance d’un mélange = mélange des espérances). L’équation $e(\\vartheta)=\\bar X_n$ a pour unique solution réelle $\\tilde\\theta_n:=\\frac{b-2\\bar X_n}{b-a}$, qui appartient à $]0,1[$ ssi $a/2<\\bar X_n<b/2$ — ce que rien ne garantit à $n$ fixé (si toutes les observations sont $<a/2$, probabilité $F_\\theta(a/2)^n>0$, alors $\\tilde\\theta_n\\ge1$). L’estimateur des moments au sens de la Déf. 1.2 n’est donc défini que sur $\\{a/2<\\bar X_n<b/2\\}$ (probabilité $\\to1$ car $\\bar X_n\\to e(\\theta)\\in]a/2,b/2[$). On retient l’estimateur **seuillé** $\\hat\\theta_n^{(2)}:=0$ si $\\tilde\\theta_n\\le0$, $1$ si $\\tilde\\theta_n\\ge1$, $\\tilde\\theta_n$ sinon.

**Q4.** $N_a=\\sum_i\\mathbb{1}_{\\{X_i\\in[0,a]\\}}$ est une somme de $n$ variables de Bernoulli indépendantes de paramètre $p_\\theta=\\mathbb{P}_\\theta(X_1\\in[0,a])=F_\\theta(a)=\\theta+(1-\\theta)\\frac ab$ : $N_a\\sim\\mathrm{Bin}(n,p_\\theta)$. Par linéarité, $\\mathbb{E}_\\theta[\\hat\\theta_n]=\\frac{b\\,p_\\theta-a}{b-a}=\\frac{b\\theta+(1-\\theta)a-a}{b-a}=\\theta$ : l’estimateur **non seuillé** $\\hat\\theta_n$ est **sans biais** (de même $\\mathbb{E}_\\theta[\\tilde\\theta_n]=\\frac{b-2e(\\theta)}{b-a}=\\theta$). En revanche $\\hat\\theta_n^{(1)}=\\max(\\hat\\theta_n,0)\\ge\\hat\\theta_n$, avec inégalité stricte sur $\\{\\hat\\theta_n<0\\}$, qui contient $\\{N_a=0\\}$ de probabilité $(1-p_\\theta)^n>0$ : donc $\\mathbb{E}_\\theta[\\hat\\theta_n^{(1)}]>\\mathbb{E}_\\theta[\\hat\\theta_n]=\\theta$. Le seuillage introduit un **biais positif**, $\\mathbb{E}_\\theta[-\\hat\\theta_n\\mathbb{1}_{\\{\\hat\\theta_n<0\\}}]$, qui tend vers 0 quand $n\\to\\infty$ (avec $a=1$, $b=3$, le calcul exact par la loi binomiale donne un biais d’environ $0{,}09$ pour $n=10$ et $0{,}02$ pour $n=200$ quand $\\theta\\to0$ ; le corrigé trace ce biais en fonction de $\\theta$). **Conclusion :** EMV et estimateur des moments diffèrent ici (le modèle n’est pas une famille exponentielle) ; les versions seuillées restent dans $[0,1]$ mais sont biaisées.`,
    bareme: [
      { label: 'Q1 — vraisemblance en fonction de N_a', points: 1 },
      { label: 'Q2 — dérivée, trois cas, non-existence dans l’ouvert, prolongement et seuillage', points: 2 },
      { label: 'Q3 — moment exact, solution, condition d’appartenance, seuillage', points: 1 },
      { label: 'Q4 — loi binomiale, absence de biais, biais positif du seuillé', points: 1.5 },
    ],
  },
  {
    id: 'ch2-annale-trois-emv',
    type: 'annale',
    title: 'PC7 Ex. 2–4 (Q1) — Trois EMV : Gamma(2, θ), log-normale (θ, θ), gaussienne contrainte',
    source: 'PC7 Ex. 2 Q1–Q2, Ex. 3 Q1, Ex. 4 Q1 (partie EMV) ; Poly ch.2 Méthode 1.2',
    origin: 'pc',
    difficulty: 2,
    tags: ['emv', 'methode-1-2', 'gamma', 'lognormale', 'cas-au-bord', 'biais'],
    durationMin: 30,
    statement: `On rappelle que $\\Gamma(a,b)$ a pour densité $\\frac{b^a}{\\Gamma(a)}x^{a-1}\\mathrm{e}^{-bx}\\mathbb{1}_{\\mathbb{R}_+^\\ast}(x)$ (espérance $a/b$) et que la somme de $n$ variables $\\Gamma(a,b)$ indépendantes suit $\\Gamma(na,b)$. Les trois questions sont indépendantes.

1. **Gamma.** $(X_1,\\dots,X_n)$ $n$-échantillon de $\\{\\Gamma(2,\\theta),\\theta\\in\\mathbb{R}_+^\\ast\\}$. Déterminer l’EMV $\\hat\\theta_n$ de $\\theta$ et montrer qu’il est biaisé ; calculer son biais (on admettra $\\mathbb{E}[1/S]=\\frac b{na-1}$ pour $S\\sim\\Gamma(na,b)$, $na>1$).
2. **Log-normale liée.** $(X_1,\\dots,X_n)$ $n$-échantillon de la loi log-normale de paramètre $(\\theta,\\theta)$, $\\theta>0$ (i.e. $Y_i=\\log X_i\\sim\\mathcal{N}(\\theta,\\theta)$). Déterminer l’EMV de $\\theta$.
3. **Gaussienne contrainte.** $(X_1,\\dots,X_n)$ $n$-échantillon de $\\{\\mathcal{N}(\\theta,1),\\theta\\in\\Theta=\\mathbb{R}_+\\}$. Déterminer l’EMV de $\\theta$. Pourquoi les équations de vraisemblance ne suffisent-elles pas ?`,
    hints: [
      'Q1 : $\\mathrm{L}_n(\\theta)=\\theta^{2n}(\\prod_iX_i)\\mathrm{e}^{-\\theta\\sum_iX_i}$ ; annuler le score, vérifier la concavité ; $\\sum_iX_i\\sim\\Gamma(2n,\\theta)$ et Jensen pour le signe du biais.',
      'Q2 : la densité log-normale contient le jacobien $1/x$, constant en $\\theta$ ; $\\log\\mathrm{L}_n(\\theta)=-\\frac n2\\log\\theta-\\frac1{2\\theta}\\sum_iY_i^2-\\frac{n\\theta}2+C$ (développer $(Y_i-\\theta)^2/\\theta$) ; le score est un trinôme en $\\theta$ divisé par $\\theta^2$.',
      'Q3 : $\\log\\mathrm{L}_n$ est une parabole concave en $\\theta$ de sommet $\\bar X_n$ ; si $\\bar X_n<0$ le sommet est hors de $\\Theta$ et le maximum sur $\\mathbb{R}_+$ est au bord.',
    ],
    correction: `**Q1 (PC7 Ex. 2).** Par indépendance, $\\mathrm{L}_n(\\theta)=\\prod_i\\theta^2X_i\\mathrm{e}^{-\\theta X_i}=\\theta^{2n}\\big(\\prod_iX_i\\big)\\mathrm{e}^{-\\theta\\sum_iX_i}$ (le facteur $1/\\Gamma(2)^n=1$). Donc $\\log\\mathrm{L}_n(\\theta)=C+2n\\log\\theta-\\theta\\sum_iX_i$ avec $C$ indépendant de $\\theta$ ; score $\\frac{2n}\\theta-\\sum_iX_i$, dérivée seconde $-\\frac{2n}{\\theta^2}<0$. La log-vraisemblance est **strictement concave** sur $\\mathbb{R}_+^\\ast$ : l’unique point critique est le maximum global (Lemme 2.3) :
$$\\hat\\theta_n=\\frac{2n}{\\sum_{i=1}^nX_i}=\\frac2{\\bar X_n},$$
défini p.s. ($\\sum_iX_i>0$). Par additivité, $S=\\sum_iX_i\\sim\\Gamma(2n,\\theta)$ et $\\mathbb{E}_\\theta[1/S]=\\frac\\theta{2n-1}$, donc $\\mathbb{E}_\\theta[\\hat\\theta_n]=\\frac{2n\\theta}{2n-1}$ et le biais vaut $\\frac{\\theta}{2n-1}>0$ : l’EMV est biaisé (surestimation, conséquence de Jensen : $\\mathbb{E}[1/S]>1/\\mathbb{E}[S]$ car $x\\mapsto1/x$ est strictement convexe), mais asymptotiquement sans biais.

**Q2 (PC7 Ex. 3).** La densité log-normale de paramètre $(\\mu,\\sigma^2)$ est $f(x)=\\frac1{\\sqrt{2\\pi}\\sigma x}\\mathrm{e}^{-(\\log x-\\mu)^2/(2\\sigma^2)}\\mathbb{1}_{\\{x>0\\}}$ (fonction muette, changement de variable $z=\\mathrm{e}^y$). Avec $\\mu=\\sigma^2=\\theta$ et $Y_i=\\log X_i$, en absorbant dans $C$ les termes indépendants de $\\theta$ ($-\\sum_i\\log X_i$, $-\\frac n2\\log2\\pi$) :
$$\\log\\mathrm{L}_n(\\theta)=-\\frac n2\\log\\theta-\\sum_{i=1}^n\\frac{(Y_i-\\theta)^2}{2\\theta}+C=-\\frac n2\\log\\theta-\\frac1{2\\theta}\\sum_{i=1}^nY_i^2-\\frac{n\\theta}2+C',$$
car $\\frac{(Y_i-\\theta)^2}{2\\theta}=\\frac{Y_i^2}{2\\theta}-Y_i+\\frac\\theta2$ et le terme $\\sum_iY_i$ ne dépend pas de $\\theta$. Score : $\\frac{\\mathrm{d}}{\\mathrm{d}\\theta}\\log\\mathrm{L}_n(\\theta)=-\\frac n{2\\theta}+\\frac1{2\\theta^2}\\sum_iY_i^2-\\frac n2=-\\dfrac{n\\big(\\theta^2+\\theta-\\bar T_n\\big)}{2\\theta^2}$ avec $\\bar T_n=\\frac1n\\sum_iY_i^2$. Si les $Y_i$ ne sont pas tous nuls (p.s.), le trinôme $\\theta^2+\\theta-\\bar T_n$ a une racine $\\theta_+>0$ et une racine $\\theta_-<0$ ; le score est $>0$ sur $]0,\\theta_+[$ et $<0$ sur $]\\theta_+,+\\infty[$ (étude de signe = vérification du maximum global). L’EMV est donc unique :
$$\\hat\\theta_n=-\\frac12+\\sqrt{\\frac14+\\frac1n\\sum_{i=1}^n(\\log X_i)^2}.$$
Remarque : les deux composantes du couple habituel sont liées ; l’EMV n’est **pas** $\\bar Y_n$ et ne dépend des données que par $\\bar T_n$.

**Q3 (PC7 Ex. 4).** $\\log\\mathrm{L}_n(\\theta)=-\\frac n2\\log(2\\pi)-\\frac12\\sum_i(X_i-\\theta)^2=-\\frac n2\\log(2\\pi)-\\frac n2\\cdot\\frac1n\\sum_iX_i^2-\\frac n2\\theta^2+n\\theta\\bar X_n$ : forme quadratique strictement concave en $\\theta$, de maximum sur $\\mathbb{R}$ en $\\bar X_n$ (unique racine de l’équation de vraisemblance). Mais $\\Theta=\\mathbb{R}_+$ : si $\\bar X_n\\ge0$, le maximum est atteint en $\\bar X_n\\in\\Theta$ ; si $\\bar X_n<0$, $\\log\\mathrm{L}_n$ (donc $\\ell_n=\\frac1n\\log\\mathrm{L}_n$) est strictement décroissante sur $\\mathbb{R}_+$ et son maximum sur $\\Theta$ est atteint **au bord** $\\theta=0$. Donc
$$\\hat\\theta_n^{\\mathrm{MV}}=\\max(\\bar X_n,0).$$
Les équations de vraisemblance (Déf. 1.6) ne caractérisent les maxima qu’aux points **intérieurs** de $\\Theta$ ; ici le maximum peut être au bord ($\\theta=0$ n’est pas intérieur à $\\mathbb{R}_+$), cas qu’il faut traiter directement (Méthode 1.2, étape 2c : « traiter les valeurs des observations pour lesquelles il n’y a pas de point critique dans $\\mathring\\Theta$ »). Pour $\\theta>0$ fixé, $\\mathbb{P}_\\theta(\\bar X_n<0)=\\Phi(-\\sqrt n\\theta)\\to0$ ; pour $\\theta=0$, $\\mathbb{P}_0(\\hat\\theta_n=0)=1/2$ pour tout $n$ (la loi limite n’est pas gaussienne, ch.7).`,
    bareme: [
      { label: 'Q1 — vraisemblance, score, concavité, EMV 2/X̄ₙ, biais θ/(2n−1)', points: 2 },
      { label: 'Q2 — réduction à T̄ₙ, trinôme, étude de signe, racine positive', points: 2 },
      { label: 'Q3 — parabole, cas au bord, max(X̄ₙ, 0), rôle de l’intérieur de Θ', points: 1.5 },
    ],
  },
]
