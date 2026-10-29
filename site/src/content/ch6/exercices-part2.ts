import type { Exercise } from '../types'

/** Étape suivante, associer, numériques, annales. */
export const exercisesPart2: Exercise[] = [
  // ------------------------------------------------------------------ Étape suivante
  {
    id: 'ch6-etape-poisson',
    type: 'etape-suivante',
    title: 'Chaîne complète dans le modèle de Poisson',
    source: 'PC6 Ex. 4',
    origin: 'pc',
    difficulty: 2,
    tags: ['tcl', 'delta-methode', 'slutsky', 'ic-asymptotique'],
    setup: '$X_i$ i.i.d. $\\mathcal{P}(\\theta)$, $\\theta>0$ ; on estime $g(\\theta)=e^{-\\theta}$ par $e^{-\\bar X_n}$ et on veut un IC asymptotique de niveau $1-\\alpha$.',
    steps: [
      {
        prompt: 'Étape 1 — Par le TCL, $\\sqrt n(\\bar X_n-\\theta)$ converge en loi vers :',
        choices: [
          { text: '$\\mathcal{N}(0,\\theta)$', correct: true, explanation: 'Pour la loi de Poisson, $\\mathrm{Var}_\\theta(X_1)=\\mathbb{E}_\\theta[X_1]=\\theta$.' },
          { text: '$\\mathcal{N}(0,\\theta^2)$', correct: false, explanation: '$\\theta^2$ serait la variance pour une loi exponentielle de moyenne $\\theta$ ; Poisson a variance $\\theta$.' },
          { text: '$\\mathcal{N}(0,1)$', correct: false, explanation: 'Il faudrait diviser par $\\sqrt\\theta$ pour obtenir une limite réduite.' },
        ],
      },
      {
        prompt: 'Étape 2 — Par la méthode-δ avec $g(\\theta)=e^{-\\theta}$, $\\sqrt n(e^{-\\bar X_n}-e^{-\\theta})$ converge en loi vers :',
        choices: [
          { text: '$\\mathcal{N}(0,\\theta e^{-2\\theta})$', correct: true, explanation: '$g\'(\\theta)=-e^{-\\theta}$, variance $g\'(\\theta)^2\\cdot\\theta=\\theta e^{-2\\theta}$.' },
          { text: '$\\mathcal{N}(0,\\theta e^{-\\theta})$', correct: false, explanation: 'Oubli du carré de la dérivée.' },
          { text: '$\\mathcal{N}(0,e^{-2\\theta})$', correct: false, explanation: 'Oubli de la variance $\\theta$ de l’étape 1.' },
        ],
      },
      {
        prompt: 'Étape 3 — Pour obtenir un pivot asymptotique calculable, on divise par $\\gamma(\\bar X_n)$ avec $\\gamma(\\theta)=\\sqrt\\theta e^{-\\theta}$. Quel résultat justifie que la loi limite reste $\\mathcal{N}(0,1)$ ?',
        choices: [
          { text: 'LGN + continuité de $\\gamma$ : $\\gamma(\\bar X_n)\\to\\gamma(\\theta)>0$ en probabilité, puis lemme de Slutsky (iii).', correct: true, explanation: 'C’est la Méthode 1.1 : plug-in de l’écart-type asymptotique justifié par Slutsky.' },
          { text: 'Le TCL appliqué à $\\gamma(\\bar X_n)$.', correct: false, explanation: 'Le TCL donnerait une loi limite gaussienne pour $\\sqrt n(\\gamma(\\bar X_n)-\\gamma(\\theta))$, ce qui n’est pas ce qu’on utilise : il faut la convergence en probabilité vers une constante.' },
          { text: 'L’indépendance de $\\bar X_n$ et $\\gamma(\\bar X_n)$.', correct: false, explanation: 'Ces deux variables ne sont pas indépendantes (l’une est fonction de l’autre) ; Slutsky n’exige aucune indépendance.' },
        ],
      },
      {
        prompt: 'Étape 4 — L’IC de niveau asymptotique $1-\\alpha$ pour $e^{-\\theta}$ est :',
        choices: [
          { text: '$\\big[e^{-\\bar X_n}\\pm\\gamma(\\bar X_n)\\,z_{1-\\alpha/2}/\\sqrt n\\big]$', correct: true, explanation: 'Résolution de $|G_n|\\le z_{1-\\alpha/2}$ ; Portmanteau donne la limite $1-\\alpha$.' },
          { text: '$\\big[e^{-\\bar X_n}\\pm\\gamma(\\bar X_n)^2\\,z_{1-\\alpha/2}/\\sqrt n\\big]$', correct: false, explanation: '$\\gamma$ est déjà l’écart-type ; son carré est la variance, erreur d’homogénéité.' },
          { text: '$\\big[e^{-\\bar X_n}\\pm\\gamma(\\bar X_n)\\,z_{1-\\alpha}/\\sqrt n\\big]$', correct: false, explanation: 'Intervalle bilatéral : quantile $z_{1-\\alpha/2}$, pas $z_{1-\\alpha}$.' },
        ],
      },
    ],
    conclusion: 'Application : $n=100$, $\\bar X_n=2$, $\\alpha=5\\%$ : $e^{-2}\\approx0{,}135$, $\\gamma(2)\\approx0{,}191$, IC $\\approx[0{,}098;0{,}173]$. Si $\\bar X_n=0$, $\\gamma(0)=0$ et l’IC dégénère en $\\{1\\}$ (même phénomène que Wald).',
  },
  {
    id: 'ch6-etape-gamma',
    type: 'etape-suivante',
    title: 'Normalité asymptotique de l’EMV de Gamma(2, θ)',
    source: 'PC7 Ex. 2 Q4–Q5',
    origin: 'pc',
    difficulty: 2,
    tags: ['delta-methode', 'tcl', 'ic-asymptotique'],
    setup: 'Modèle $\\Gamma(2,\\theta)$ (intensité $\\theta$) : $\\mathbb{E}_\\theta[X]=2/\\theta$, $\\mathrm{Var}_\\theta(X)=2/\\theta^2$ ; EMV $\\hat\\theta_n=2/\\bar X_n$.',
    steps: [
      {
        prompt: 'Étape 1 — Le TCL donne $\\sqrt n(\\bar X_n-2/\\theta)\\Rightarrow$ :',
        choices: [
          { text: '$\\mathcal{N}(0,2/\\theta^2)$', correct: true, explanation: 'Variance d’une observation $\\Gamma(2,\\theta)$ : $a/b^2=2/\\theta^2$.' },
          { text: '$\\mathcal{N}(0,2\\theta^2)$', correct: false, explanation: 'Confusion entre convention d’intensité et d’échelle (CC 2022 vs poly).' },
          { text: '$\\mathcal{N}(0,\\theta^2/2)$', correct: false, explanation: '$\\theta^2/2$ est la variance asymptotique de $\\hat\\theta_n$, obtenue après la méthode-δ, pas celle de $\\bar X_n$.' },
        ],
      },
      {
        prompt: 'Étape 2 — Avec $g(x)=2/x$, la dérivée au point limite $2/\\theta$ vaut :',
        choices: [
          { text: '$g\'(2/\\theta)=-\\theta^2/2$', correct: true, explanation: '$g\'(x)=-2/x^2$, donc $g\'(2/\\theta)=-2\\theta^2/4=-\\theta^2/2$.' },
          { text: '$g\'(\\theta)=-2/\\theta^2$', correct: false, explanation: 'Mauvais point d’évaluation : la dérivée s’évalue en la limite de $\\bar X_n$, soit $2/\\theta$.' },
          { text: '$g\'(2/\\theta)=-\\theta/2$', correct: false, explanation: 'Erreur de calcul : $(2/\\theta)^2=4/\\theta^2$ au dénominateur.' },
        ],
      },
      {
        prompt: 'Étape 3 — La méthode-δ donne $\\sqrt n(\\hat\\theta_n-\\theta)\\Rightarrow$ :',
        choices: [
          { text: '$\\mathcal{N}(0,\\theta^2/2)$', correct: true, explanation: '$g\'(2/\\theta)^2\\cdot2/\\theta^2=\\frac{\\theta^4}4\\cdot\\frac2{\\theta^2}=\\theta^2/2=1/I(\\theta)$.' },
          { text: '$\\mathcal{N}(0,\\theta^2)$', correct: false, explanation: '$\\theta^2$ est la variance asymptotique pour $\\mathcal{E}(\\theta)=\\Gamma(1,\\theta)$ ; avec $a=2$ l’information double et la variance est divisée par 2.' },
          { text: '$\\mathcal{N}(0,\\theta^4/2)$', correct: false, explanation: 'Oubli de multiplier par la variance $2/\\theta^2$ de l’étape 1 (ou erreur de simplification).' },
        ],
      },
      {
        prompt: 'Étape 4 — L’IC asymptotique de niveau $1-\\alpha$ pour $\\theta$ (Slutsky avec $\\hat\\theta_n$ au dénominateur) est :',
        choices: [
          { text: '$\\big[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\,\\hat\\theta_n/\\sqrt{2n}\\big]$', correct: true, explanation: '$\\sqrt{v(\\hat\\theta_n)/n}=\\hat\\theta_n/\\sqrt{2n}$.' },
          { text: '$\\big[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\,\\hat\\theta_n^2/(2n)\\big]$', correct: false, explanation: 'On a mis la variance $v/n$ au lieu de l’écart-type $\\sqrt{v/n}$.' },
          { text: '$\\big[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\,\\theta/\\sqrt{2n}\\big]$', correct: false, explanation: 'Les bornes doivent être calculables : $\\theta$ inconnu est remplacé par $\\hat\\theta_n$ (Slutsky).' },
        ],
      },
    ],
    conclusion: 'Numériquement : $n=50$, $\\bar X_n=0{,}8$ donne $\\hat\\theta_n=2{,}5$ et l’IC à 95 % $[2{,}01;2{,}99]$. Trois routes mènent à $\\theta^2/2$ : Slutsky (LGN + TCL), théorème sur l’EMV (ch.7, $I(\\theta)=2/\\theta^2$), méthode-δ.',
  },
  {
    id: 'ch6-etape-vecteur-2025',
    type: 'etape-suivante',
    title: 'Examen 2025 Q7 : normalité asymptotique du vecteur des EMV',
    source: 'Examen 2025 Ex. 2 Q7',
    origin: 'annale',
    difficulty: 3,
    tags: ['tcl-multivarie', 'slutsky', 'variance-asymptotique'],
    setup: '$Y_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$ i.i.d. ; $\\hat\\mu_{ML}=\\bar Y_n$, $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2$. Rappels du sujet : TCL multivarié, $\\mathrm{Var}(\\xi^2)=2$ pour $\\xi\\sim\\mathcal{N}(0,1)$.',
    steps: [
      {
        prompt: 'Étape 1 — Quelle décomposition permet de faire apparaître une moyenne de vecteurs i.i.d. ?',
        choices: [
          { text: '$\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\mu)^2-(\\bar Y_n-\\mu)^2$, d’où $\\sqrt n(\\hat\\theta_{ML}-\\theta)=\\frac1{\\sqrt n}\\sum_iW_i-\\big(0,\\sqrt n(\\bar Y_n-\\mu)^2\\big)^\\top$ avec $W_i=(Y_i-\\mu,(Y_i-\\mu)^2-\\sigma^2)^\\top$.', correct: true, explanation: 'Éq. (2) de l’Ex. 1.6, écrite vectoriellement.' },
          { text: '$\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\mu)^2$ exactement, donc $\\hat\\theta_{ML}$ est directement une moyenne de vecteurs i.i.d.', correct: false, explanation: 'Faux : $\\bar Y_n\\ne\\mu$ ; il manque le terme $-(\\bar Y_n-\\mu)^2$ qu’il faudra montrer négligeable.' },
          { text: 'Par Gosset, $\\widehat{\\sigma^2}_{ML}$ est exactement gaussienne, donc rien à décomposer.', correct: false, explanation: 'Faux : $n\\widehat{\\sigma^2}_{ML}/\\sigma^2\\sim\\chi^2(n-1)$, pas une gaussienne.' },
        ],
      },
      {
        prompt: 'Étape 2 — La matrice de covariance $\\Sigma$ de $W_i$ est :',
        choices: [
          { text: '$\\mathrm{diag}(\\sigma^2,2\\sigma^4)$', correct: true, explanation: '$\\mathrm{Var}(Y-\\mu)=\\sigma^2$ ; $\\mathrm{Cov}=\\mathbb{E}[(Y-\\mu)^3]=0$ (symétrie) ; $\\mathrm{Var}((Y-\\mu)^2)=\\sigma^4\\mathrm{Var}(\\xi^2)=2\\sigma^4$.' },
          { text: '$\\mathrm{diag}(\\sigma^2,\\sigma^4)$', correct: false, explanation: 'Oubli du facteur $\\mathrm{Var}(\\xi^2)=2$ rappelé dans le sujet.' },
          { text: '$\\mathrm{diag}(\\sigma^2,2\\sigma^2)$', correct: false, explanation: 'Erreur d’homogénéité : $(Y-\\mu)^2$ a la dimension de $\\sigma^2$, sa variance celle de $\\sigma^4$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Le terme $\\sqrt n(\\bar Y_n-\\mu)^2$ tend vers 0 en probabilité parce que :',
        choices: [
          { text: '$\\sqrt n(\\bar Y_n-\\mu)^2=\\frac1{\\sqrt n}\\big(\\sqrt n(\\bar Y_n-\\mu)\\big)^2$ : carré d’une suite convergeant en loi (transformation continue) multiplié par $1/\\sqrt n\\to0$ (Slutsky).', correct: true, explanation: 'Même argument que dans l’Ex. 1.6 (étape c).' },
          { text: '$\\bar Y_n\\to\\mu$ en probabilité, donc $(\\bar Y_n-\\mu)^2\\to0$ et a fortiori $\\sqrt n(\\bar Y_n-\\mu)^2\\to0$.', correct: false, explanation: 'Non concluant : multiplier par $\\sqrt n\\to\\infty$ une suite qui tend vers 0 ne donne rien sans contrôle de la vitesse.' },
          { text: 'Par la LGN appliquée à $(Y_i-\\mu)^2$.', correct: false, explanation: 'La LGN concerne $\\frac1n\\sum(Y_i-\\mu)^2\\to\\sigma^2$, pas $(\\bar Y_n-\\mu)^2$.' },
        ],
      },
      {
        prompt: 'Étape 4 — Conclusion :',
        choices: [
          { text: '$\\sqrt n(\\hat\\theta_{ML}-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}\\big(0,\\mathrm{diag}(\\sigma^2,2\\sigma^4)\\big)$ par TCL multivarié et Slutsky (vectoriel).', correct: true, explanation: 'Cohérent avec $I(\\theta)^{-1}$, $I(\\mu,\\sigma^2)=\\mathrm{diag}(1/\\sigma^2,1/(2\\sigma^4))$.' },
          { text: '$\\sqrt n(\\hat\\theta_{ML}-\\theta)\\Rightarrow\\mathcal{N}(0,\\mathrm{diag}(\\sigma^2/n,2\\sigma^4/n))$.', correct: false, explanation: 'Le facteur $1/n$ a déjà été absorbé par la normalisation $\\sqrt n$.' },
          { text: 'Seules les marginales convergent ; la loi jointe n’est pas déterminée.', correct: false, explanation: 'Le TCL multivarié donne directement la loi jointe du vecteur $\\frac1{\\sqrt n}\\sum W_i$.' },
        ],
      },
    ],
    conclusion: 'Rédaction attendue : nommer $W_i$, vérifier ses moments (gaussienne : tous finis), calculer $\\Sigma$ terme à terme, citer le TCL multivarié puis Slutsky pour le terme correctif.',
  },
  {
    id: 'ch6-etape-delta-vect-2025',
    type: 'etape-suivante',
    title: 'Examen 2025 Q9(c) : méthode-δ vectorielle pour l’estimateur des moments',
    source: 'Examen 2025 Ex. 2 Q9(b)–(c)',
    origin: 'annale',
    difficulty: 3,
    tags: ['delta-methode', 'tcl-multivarie', 'variance-asymptotique'],
    setup: 'Log-normale : $m_k=\\mathbb{E}[X^k]=e^{k\\mu+k^2\\sigma^2/2}$ ; $\\hat\\mu_{Mom}=g(\\hat m_1,\\hat m_2)$ avec $g(a,b)=2\\ln a-\\frac12\\ln b$, où $\\hat m_k=\\frac1n\\sum_iX_i^k$. On a $\\sqrt n((\\hat m_1,\\hat m_2)-(m_1,m_2))\\Rightarrow\\mathcal{N}(0,\\Sigma)$ avec $\\Sigma_{11}=m_2-m_1^2$, $\\Sigma_{12}=m_3-m_1m_2$, $\\Sigma_{22}=m_4-m_2^2$.',
    steps: [
      {
        prompt: 'Étape 1 — Quelle hypothèse garantit le TCL multivarié pour $(X_i,X_i^2)$ ?',
        choices: [
          { text: 'Le moment d’ordre 4 de $X$ est fini ($m_4<\\infty$), vrai pour la log-normale qui a des moments de tous ordres.', correct: true, explanation: 'Le vecteur $(X,X^2)$ doit être de carré intégrable : $\\mathbb{E}[X^4]<\\infty$.' },
          { text: 'Le moment d’ordre 2 de $X$ est fini ($m_2<\\infty$).', correct: false, explanation: 'Insuffisant : la seconde composante $X^2$ doit elle-même être de carré intégrable.' },
          { text: 'Aucune : le TCL s’applique toujours.', correct: false, explanation: 'Faux : sans moment d’ordre 2 du vecteur, pas de TCL (cf. Cauchy).' },
        ],
      },
      {
        prompt: 'Étape 2 — Le gradient de $g$ au point $(m_1,m_2)$ est :',
        choices: [
          { text: '$\\nabla g=(2/m_1,\\,-1/(2m_2))^\\top$', correct: true, explanation: '$\\partial_ag=2/a$, $\\partial_bg=-1/(2b)$.' },
          { text: '$\\nabla g=(2/m_1,\\,-2/m_2)^\\top$', correct: false, explanation: 'Erreur sur le coefficient $-\\frac12$ devant $\\ln b$.' },
          { text: '$\\nabla g=(2m_1,\\,-m_2/2)^\\top$', correct: false, explanation: 'Dérivée du logarithme : $1/a$, pas $a$.' },
        ],
      },
      {
        prompt: 'Étape 3 — La variance asymptotique de $\\hat\\mu_{Mom}$ s’écrit :',
        choices: [
          { text: '$v_{Mom}=\\nabla g^\\top\\Sigma\\nabla g=\\frac4{m_1^2}\\Sigma_{11}-\\frac2{m_1m_2}\\Sigma_{12}+\\frac1{4m_2^2}\\Sigma_{22}$', correct: true, explanation: 'Méthode-δ vectorielle (Thm 1.8) avec $J_g=\\nabla g^\\top$ ($m=1$, $p=2$).' },
          { text: '$v_{Mom}=\\frac4{m_1^2}\\Sigma_{11}+\\frac1{4m_2^2}\\Sigma_{22}$', correct: false, explanation: 'Oubli du terme croisé $2\\,\\partial_ag\\,\\partial_bg\\,\\Sigma_{12}$ : $\\hat m_1$ et $\\hat m_2$ sont corrélés.' },
          { text: '$v_{Mom}=g\'(m_1)^2\\Sigma_{11}$', correct: false, explanation: 'Méthode-δ scalaire appliquée à tort : l’estimateur dépend de deux moments, il faut la jacobienne (DIAGNOSTIC §6, piège 9).' },
        ],
      },
      {
        prompt: 'Étape 4 — En utilisant $m_2=m_1^2e^{\\sigma^2}$, $m_3=m_1m_2e^{2\\sigma^2}$, $m_4=m_2^2e^{4\\sigma^2}$, on obtient :',
        choices: [
          { text: '$v_{Mom}=4(e^{\\sigma^2}-1)-2(e^{2\\sigma^2}-1)+\\frac14(e^{4\\sigma^2}-1)=\\sigma^2+\\frac23\\sigma^6+O(\\sigma^8)$', correct: true, explanation: 'Les termes en $\\sigma^2$ donnent $4-4+1=1$ et ceux en $\\sigma^4$ s’annulent ($2-4+2=0$) ; pour $\\sigma\\to\\infty$, $v_{Mom}\\sim\\frac14e^{4\\sigma^2}$.' },
          { text: '$v_{Mom}=\\sigma^2$ exactement', correct: false, explanation: 'Ce n’est que le premier terme du DL : l’estimateur des moments n’est pas efficace, il est seulement quasi efficace pour $\\sigma$ petit.' },
          { text: '$v_{Mom}=\\frac\\pi2\\sigma^2$', correct: false, explanation: 'C’est la variance asymptotique de la médiane (Q8), pas des moments.' },
        ],
      },
    ],
    conclusion: 'Q10 : $v_{ML}=\\sigma^2<v_{Med}=\\frac\\pi2\\sigma^2$ ; $v_{Mom}\\approx\\sigma^2$ quand $\\sigma\\to0$ mais explose quand $\\sigma\\to\\infty$ (queues lourdes de la log-normale). L’EMV est toujours le meilleur (Prop. 1.3, efficacité asymptotique).',
  },
  {
    id: 'ch6-etape-lognormale-theta',
    type: 'etape-suivante',
    title: 'Log-normale de paramètre (θ, θ) : variance asymptotique de l’EMV',
    source: 'PC7 Ex. 3 Q2–Q3',
    origin: 'pc',
    difficulty: 3,
    tags: ['delta-methode', 'tcl', 'ic-asymptotique'],
    setup: '$Y_i=\\log X_i\\sim\\mathcal{N}(\\theta,\\theta)$, $\\theta>0$ ; l’EMV est $\\hat\\theta_n=-\\frac12+\\sqrt{\\frac14+\\bar T_n}$ avec $\\bar T_n=\\frac1n\\sum_iY_i^2$. On rappelle $\\mathbb{E}[G^4]=3$ pour $G\\sim\\mathcal{N}(0,1)$.',
    steps: [
      {
        prompt: 'Étape 1 — $\\mathbb{E}_\\theta[Y^2]$ vaut :',
        choices: [
          { text: '$\\theta+\\theta^2$', correct: true, explanation: 'Variance plus carré de la moyenne : $\\theta+\\theta^2$.' },
          { text: '$\\theta^2$', correct: false, explanation: 'Oubli de la variance $\\theta$.' },
          { text: '$2\\theta$', correct: false, explanation: 'Confusion entre $\\mathbb{E}[Y^2]$ et $\\mathrm{Var}(Y)+\\mathbb{E}[Y]$.' },
        ],
      },
      {
        prompt: 'Étape 2 — Avec $Y=\\theta+\\sqrt\\theta G$, $\\mathrm{Var}_\\theta(Y^2)=\\mathbb{E}[(\\theta+\\sqrt\\theta G)^4]-(\\theta+\\theta^2)^2$ vaut :',
        choices: [
          { text: '$2\\theta^2(1+2\\theta)=4\\theta^3+2\\theta^2$', correct: true, explanation: '$\\theta^4+6\\theta^3+3\\theta^2-(\\theta^2+2\\theta^3+\\theta^4)=4\\theta^3+2\\theta^2$ ; c’est $\\sigma^2(\\theta)$ du TCL pour $\\bar T_n$.' },
          { text: '$2\\theta^2$', correct: false, explanation: 'Ce serait la variance de $(Y-\\theta)^2$ ; ici $Y$ n’est pas centrée.' },
          { text: '$\\theta^4+6\\theta^3+3\\theta^2$', correct: false, explanation: 'C’est $\\mathbb{E}[Y^4]$, il faut retrancher $(\\mathbb{E}[Y^2])^2$.' },
        ],
      },
      {
        prompt: 'Étape 3 — Avec $\\varphi(z)=\\sqrt{1/4+z}$, $\\hat\\theta_n=\\varphi(\\bar T_n)-\\frac12$ ; la dérivée au point limite $\\theta+\\theta^2$ vaut :',
        choices: [
          { text: '$\\varphi\'(\\theta+\\theta^2)=\\frac1{1+2\\theta}$', correct: true, explanation: '$\\varphi\'(z)=\\frac1{2\\sqrt{1/4+z}}$ et $\\sqrt{1/4+\\theta+\\theta^2}=\\theta+\\frac12$.' },
          { text: '$\\varphi\'(\\theta)=\\frac1{\\sqrt{1+4\\theta}}$', correct: false, explanation: 'Mauvais point : la dérivée s’évalue en la limite de $\\bar T_n$, soit $\\theta+\\theta^2$.' },
          { text: '$\\varphi\'(\\theta+\\theta^2)=\\theta+\\frac12$', correct: false, explanation: 'C’est $\\varphi(\\theta+\\theta^2)$, pas sa dérivée.' },
        ],
      },
      {
        prompt: 'Étape 4 — La méthode-δ donne $\\sqrt n(\\hat\\theta_n-\\theta)\\Rightarrow\\mathcal{N}(0,\\sigma_0^2(\\theta))$ avec :',
        choices: [
          { text: '$\\sigma_0^2(\\theta)=\\frac{2\\theta^2(1+2\\theta)}{(1+2\\theta)^2}=\\frac{2\\theta^2}{1+2\\theta}$', correct: true, explanation: 'Inférieur à $\\theta$ (variance asymptotique de $\\bar Y_n$) : l’EMV fait mieux que l’estimateur naïf ; c’est $1/I(\\theta)$.' },
          { text: '$\\sigma_0^2(\\theta)=2\\theta^2(1+2\\theta)$', correct: false, explanation: 'Oubli du facteur $\\varphi\'^2$.' },
          { text: '$\\sigma_0^2(\\theta)=\\theta$', correct: false, explanation: '$\\theta$ est la variance asymptotique de $\\bar Y_n$, estimateur concurrent moins précis.' },
        ],
      },
    ],
    conclusion: 'IC asymptotique (Slutsky, continuité de $\\sigma_0$) : $\\big[\\hat\\theta_n\\pm\\sigma_0(\\hat\\theta_n)\\,z_{1-\\alpha/2}/\\sqrt n\\big]$ avec $\\sigma_0(\\hat\\theta_n)=\\sqrt2\\hat\\theta_n/\\sqrt{1+2\\hat\\theta_n}$ ; pour $\\bar T_n=2$, $\\hat\\theta_n=1$ et à 95 % avec $n=100$ : $1\\pm0{,}16$.',
  },
  // ------------------------------------------------------------------ Associer
  {
    id: 'ch6-assoc-variances',
    type: 'associer',
    title: 'Estimateur ↔ variance asymptotique',
    source: 'Poly ch.6 Ex. 1.7 ; PC6 Ex. 4 ; PC7 Ex. 2 ; Examen 2025 Ex. 2 Q7–Q8',
    origin: 'variante',
    difficulty: 2,
    tags: ['variance-asymptotique', 'delta-methode', 'tcl'],
    prompt: 'Associer chaque estimateur (modèle indiqué) à la variance $v(\\theta)$ de la loi limite de $\\sqrt n(T_n-g(\\theta))$.',
    pairs: [
      { left: '$\\bar X_n$ dans $\\mathcal{P}(\\theta)$', right: '$\\theta$', explanation: 'TCL : variance d’une Poisson = $\\theta$.' },
      { left: '$1/\\bar X_n$ dans $\\mathcal{E}(\\theta)$', right: '$\\theta^2$', explanation: 'Ex. 1.7 : méthode-δ, $\\dot\\varphi(1/\\theta)^2\\cdot\\theta^{-2}=\\theta^2$.' },
      { left: '$e^{-\\bar X_n}$ dans $\\mathcal{P}(\\theta)$', right: '$\\theta e^{-2\\theta}$', explanation: 'PC6 Ex. 4 : $g\'(\\theta)^2\\theta$.' },
      { left: 'Médiane empirique dans $\\mathcal{N}(\\mu,\\sigma^2)$', right: '$\\frac\\pi2\\sigma^2$', explanation: 'Examen 2025 Q8 : TCL du quantile, $\\frac{1/4}{f(\\mu)^2}$.' },
      { left: '$\\widehat{\\sigma^2}_{ML}$ dans $\\mathcal{N}(\\mu,\\sigma^2)$', right: '$2\\sigma^4$', explanation: 'Ex. 1.6 avec $\\gamma=3\\sigma^4-\\sigma^4$.' },
      { left: '$2/\\bar X_n$ dans $\\Gamma(2,\\theta)$', right: '$\\theta^2/2$', explanation: 'PC7 Ex. 2 : $g\'(2/\\theta)^2\\cdot2/\\theta^2$.' },
    ],
  },
  {
    id: 'ch6-assoc-hypotheses',
    type: 'associer',
    title: 'Hypothèse clé ↔ théorème',
    source: 'Poly ch.6, Thm 1.1, 1.2, 1.6, 1.7, Lemme 1.1, Ex. 1.6',
    origin: 'poly',
    difficulty: 1,
    tags: ['cours', 'hypotheses'],
    prompt: 'Associer chaque hypothèse à l’énoncé du poly dont elle est l’hypothèse caractéristique.',
    pairs: [
      { left: 'Moment d’ordre 2 de la loi $Q$', right: 'TCL (Thm 1.6)', explanation: 'Sert dans le Lemme 2.3 (développement à l’ordre 2 de la fonction caractéristique).' },
      { left: 'Limite constante $c$ pour $Y_n$', right: 'Lemme de Slutsky (Lemme 1.1)', explanation: 'Permet la convergence en loi du couple vers $\\mu\\otimes\\delta_c$.' },
      { left: '$g$ dérivable au point $\\theta$ et $\\mathbb{P}_n(T_n\\in D_g)=1$', right: 'Méthode-δ (Thm 1.7)', explanation: 'Développement $g(\\theta+h)=g(\\theta)+\\dot g(\\theta)h+h\\varepsilon(h)$.' },
      { left: '$\\varphi$ continue en tout point de $g(\\Theta)$', right: 'Théorème de continuité (Thm 1.1)', explanation: 'La continuité n’est requise qu’aux valeurs possibles de la limite.' },
      { left: 'Moment d’ordre 4 de la loi $Q$', right: 'TCL pour la variance empirique (Ex. 1.6)', explanation: 'C’est le moment d’ordre 2 de $(X_i-\\mu)^2$.' },
      { left: 'Variables décorrélées avec $n^{-2}\\sum_k\\mathrm{Var}_n(X_k)\\to0$', right: 'LGN faible (Thm 1.2)', explanation: 'Lemme de Bienaymé puis Bienaymé-Tchebychev.' },
    ],
  },
  {
    id: 'ch6-assoc-convergences',
    type: 'associer',
    title: 'Mode de convergence ↔ définition',
    source: 'Poly ch.6, Déf. 1.2, 1.3, 1.4, 1.6 ; Outils Prop. 2.2',
    origin: 'poly',
    difficulty: 1,
    tags: ['cours', 'convergence-loi', 'convergence-proba', 'consistance'],
    prompt: 'Associer chaque notion à sa définition exacte dans le poly.',
    pairs: [
      { left: 'Consistance de $\\{T_n\\}$ pour $g$', right: '$\\forall\\theta,\\forall\\varepsilon>0$, $\\mathbb{P}_{n,\\theta}(\\|T_n-g(\\theta)\\|\\ge\\varepsilon)\\to0$', explanation: 'Déf. 1.2 (convergence en probabilité vers une constante).' },
      { left: 'Convergence en loi $Y_n\\Rightarrow\\mu$', right: '$\\mathbb{E}_n[f(Y_n)]\\to\\int f\\,\\mathrm{d}\\mu$ pour toute $f$ continue bornée', explanation: 'Déf. 1.4.' },
      { left: 'Asymptotiquement sans biais', right: '$\\mathbb{E}_{n,\\theta}[T_n]\\to g(\\theta)$ pour tout $\\theta$', explanation: 'Déf. 1.3 ; ni nécessaire ni suffisant pour la consistance.' },
      { left: 'Normalité asymptotique', right: '$\\sqrt n(T_n-g(\\theta))\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\Sigma(\\theta))$ pour tout $\\theta$', explanation: 'Déf. 1.6 ; entraîne la consistance.' },
      { left: 'Convergence $L^p$', right: '$\\mathbb{E}[\\|X_n-X\\|^p]\\to0$', explanation: 'Prop. 2.2 : entraîne la convergence en probabilité (Markov).' },
    ],
  },
  {
    id: 'ch6-assoc-ic-exp',
    type: 'associer',
    title: 'Trois IC asymptotiques pour la loi exponentielle',
    source: 'PC6 Ex. 1 Q4',
    origin: 'pc',
    difficulty: 2,
    tags: ['ic-asymptotique', 'slutsky', 'delta-methode'],
    prompt: 'Avec $x=z_{1-\\alpha/2}/\\sqrt n$ et $\\hat\\theta=\\hat\\theta_n^{(1)}=1/\\bar X_n$, associer chaque méthode à son intervalle.',
    pairs: [
      { left: 'Slutsky (plug-in de $v(\\theta)=\\theta^2$, type Wald)', right: '$[\\hat\\theta(1-x),\\ \\hat\\theta(1+x)]$', explanation: 'Méthode 1.1 : $\\hat\\theta\\pm z\\sqrt{\\hat\\theta^2/n}$.' },
      { left: 'Stabilisation de la variance ($g=\\ln$, variance 1)', right: '$[\\hat\\theta e^{-x},\\ \\hat\\theta e^{x}]$', explanation: 'IC pour $\\ln\\theta$ puis exponentielle.' },
      { left: 'Inversion directe du pivot $\\sqrt n(\\hat\\theta-\\theta)/\\theta$ (type Wilson)', right: '$[\\hat\\theta/(1+x),\\ \\hat\\theta/(1-x)]$', explanation: 'Résoudre $-z\\le\\sqrt n(\\hat\\theta/\\theta-1)\\le z$ en $\\theta$.' },
    ],
  },
  // ------------------------------------------------------------------ Numériques
  {
    id: 'ch6-num-ic-gamma',
    type: 'numerique',
    title: 'Borne supérieure d’un IC asymptotique à 95 % (Gamma(2, θ))',
    source: 'PC7 Ex. 2 Q5 (application numérique)',
    origin: 'pc',
    difficulty: 1,
    tags: ['ic-asymptotique', 'slutsky'],
    question: 'Modèle $\\Gamma(2,\\theta)$, $\\hat\\theta_n=2/\\bar X_n$, IC asymptotique $\\big[\\hat\\theta_n\\pm z_{0{,}975}\\,\\hat\\theta_n/\\sqrt{2n}\\big]$. Pour $n=50$ et $\\bar X_n=0{,}8$, calculer la **borne supérieure** de l’IC à 95 % ($z_{0{,}975}\\approx1{,}96$).',
    answer: 2.99,
    tolerance: 0.02,
    hint: 'Arrondir à 0,01.',
    explanation: '$\\hat\\theta_n=2/0{,}8=2{,}5$ ; $\\sqrt{2n}=10$ ; demi-largeur $1{,}96\\times2{,}5/10=0{,}49$ ; borne supérieure $2{,}5+0{,}49=2{,}99$ (IC $[2{,}01;2{,}99]$).',
  },
  {
    id: 'ch6-num-mediane-C',
    type: 'numerique',
    title: 'Constante C de la médiane empirique (Examen 2025)',
    source: 'Examen 2025 Ex. 2 Q8',
    origin: 'annale',
    difficulty: 1,
    tags: ['variance-asymptotique', 'mediane'],
    question: 'Pour $Y_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$, le TCL du quantile donne $\\sqrt n(\\hat\\mu_{Med}-\\mu)\\Rightarrow\\mathcal{N}(0,C\\sigma^2)$. Donner la valeur numérique de $C$.',
    answer: 1.5708,
    tolerance: 0.01,
    hint: 'Arrondir à 0,01 ; $f(\\mu)=1/\\sqrt{2\\pi\\sigma^2}$.',
    explanation: '$C=\\frac{\\alpha(1-\\alpha)}{\\sigma^2f(\\mu)^2}=\\frac{1/4}{1/(2\\pi)}=\\frac\\pi2\\approx1{,}5708$. L’efficacité relative de la médiane par rapport à la moyenne vaut $2/\\pi\\approx0{,}64$.',
  },
  {
    id: 'ch6-num-ic-poisson',
    type: 'numerique',
    title: 'Borne inférieure de l’IC pour exp(−θ) (Poisson)',
    source: 'PC6 Ex. 4 Q3 (application numérique)',
    origin: 'pc',
    difficulty: 2,
    tags: ['ic-asymptotique', 'delta-methode'],
    question: '$n=100$, $\\bar X_n=2$, $\\alpha=5\\%$ ($z_{0{,}975}\\approx1{,}96$). IC asymptotique pour $e^{-\\theta}$ : $\\big[e^{-\\bar X_n}\\pm\\gamma(\\bar X_n)z_{1-\\alpha/2}/\\sqrt n\\big]$ avec $\\gamma(\\theta)=\\sqrt\\theta e^{-\\theta}$. Calculer la borne inférieure.',
    answer: 0.0978,
    tolerance: 0.002,
    hint: 'Arrondir à 0,001.',
    explanation: '$e^{-2}\\approx0{,}1353$ ; $\\gamma(2)=\\sqrt2e^{-2}\\approx0{,}1914$ ; demi-largeur $1{,}96\\times0{,}1914/10\\approx0{,}0375$ ; borne inférieure $\\approx0{,}0978$ (IC $\\approx[0{,}098;0{,}173]$).',
  },
  {
    id: 'ch6-num-rapport-longueurs',
    type: 'numerique',
    title: 'Rapport asymptotique des longueurs d’IC (Prop. 1.3)',
    source: 'PC6 Ex. 1 Q2 ; Poly ch.6 Prop. 1.3',
    origin: 'pc',
    difficulty: 1,
    tags: ['variance-asymptotique', 'ic-asymptotique'],
    question: 'Modèle $\\mathcal{E}(\\theta)$ : $v_1(\\theta)=\\theta^2$ pour $\\hat\\theta_n^{(1)}$ et $v_2(\\theta)=\\frac54\\theta^2$ pour $\\hat\\theta_n^{(2)}$. Vers quelle valeur converge le rapport des longueurs $|\\mathcal{C}_{n,\\alpha}(\\hat\\theta_{n}^{(1)})|/|\\mathcal{C}_{n,\\alpha}(\\hat\\theta_{n}^{(2)})|$ ?',
    answer: 0.894,
    tolerance: 0.005,
    hint: 'Arrondir à 0,001.',
    explanation: 'Prop. 1.3 : la limite est $\\sqrt{v_1/v_2}=\\sqrt{4/5}=2/\\sqrt5\\approx0{,}894<1$ : l’EMV donne des intervalles environ 10 % plus courts.',
  },
  // ------------------------------------------------------------------ Annales
  {
    id: 'ch6-annale-2025-ex2',
    type: 'annale',
    title: 'Examen 2025 Ex. 2 (partie asymptotique, Q6–Q10) — loi log-normale',
    source: 'Examen 2025 Ex. 2 Q6–Q10',
    origin: 'annale',
    difficulty: 3,
    tags: ['consistance', 'tcl-multivarie', 'slutsky', 'delta-methode', 'variance-asymptotique', 'mediane'],
    durationMin: 35,
    statement: `Soit un $n$-échantillon de la loi log-normale $LN(\\mu,\\sigma^2)$ : $X=e^{\\mu+\\sigma\\xi}$ avec $\\xi\\sim\\mathcal{N}(0,1)$, $\\theta=(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*$. On note $Y_i:=\\ln X_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$. On a établi (Q2) que l’EMV est $\\hat\\mu_{ML}=\\bar Y_n$, $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_{i=1}^n(Y_i-\\bar Y_n)^2$.

**Rappels du sujet.** $\\mathbb{E}[e^{t\\xi}]=e^{t^2/2}$ ; $\\mathrm{Var}(\\xi^2)=2$ ; TCL pour le quantile empirique : $\\sqrt n(\\hat q_\\alpha-q_\\alpha)\\overset{d}{\\to}\\mathcal{N}\\big(0,\\frac{\\alpha(1-\\alpha)}{f(q_\\alpha)^2}\\big)$ ; TCL multivarié.

**Q6.** Montrer que $(\\hat\\mu_{ML},\\widehat{\\sigma^2}_{ML})$ est une suite consistante d’estimateurs de $(\\mu,\\sigma^2)$.

**Q7.** Montrer que $\\sqrt n\\big((\\hat\\mu_{ML},\\widehat{\\sigma^2}_{ML})-(\\mu,\\sigma^2)\\big)$ converge en loi vers un vecteur gaussien ; préciser sa moyenne et sa matrice de covariance.

**Q8.** Soit $\\tilde X_n$ la médiane empirique des $X_i$ ($n$ impair). Proposer un estimateur $\\hat\\mu_{Med}$ de $\\mu$ fondé sur $\\tilde X_n$ et montrer que $\\sqrt n(\\hat\\mu_{Med}-\\mu)\\overset{d}{\\to}\\mathcal{N}(0,C\\sigma^2)$ ; donner $C$.

**Q9.** (a) Donner l’estimateur des moments $(\\hat\\mu_{Mom},\\widehat{\\sigma^2}_{Mom})$ associé à $T_1(x)=x$, $T_2(x)=x^2$. (b) Montrer que $(\\hat m_1,\\hat m_2)$ est asymptotiquement normal et donner la covariance limite en fonction de $\\sigma^2$, $m_1$, $m_2$. (c) En déduire la normalité asymptotique de $\\hat\\mu_{Mom}$ et un développement de sa variance limite quand $\\sigma^2\\to0$.

**Q10.** Comparer asymptotiquement $\\hat\\mu_{ML}$, $\\hat\\mu_{Med}$, $\\hat\\mu_{Mom}$ selon que $\\sigma\\to0$ ou $\\sigma\\to\\infty$.`,
    hints: [
      'Q6 : LGN sur $Y_i$ et $Y_i^2$ puis théorème de continuité avec $(u,w)\\mapsto w-u^2$ (c’est la Prop. 1.2). Q7 : écrire $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum(Y_i-\\mu)^2-(\\bar Y_n-\\mu)^2$ (éq. (2) de l’Ex. 1.6).',
      'Q7 : vecteur $W_i=(Y_i-\\mu,(Y_i-\\mu)^2-\\sigma^2)$, covariance terme à terme (le moment d’ordre 3 centré est nul par symétrie), puis Slutsky pour le terme $\\sqrt n(\\bar Y_n-\\mu)^2$. Q8 : la médiane de $LN(\\mu,\\sigma^2)$ est $e^\\mu$ ; prendre $\\ln\\tilde X_n$ et appliquer le rappel avec $\\alpha=1/2$.',
      'Q9 : $m_k=e^{k\\mu+k^2\\sigma^2/2}$, inverser le système en $(\\mu,\\sigma^2)$ ; TCL multivarié sur $(X_i,X_i^2)$ ; méthode-δ **vectorielle** avec $g(a,b)=2\\ln a-\\frac12\\ln b$ et $\\nabla g=(2/m_1,-1/(2m_2))$. Q10 : Prop. 1.3, $v_{ML}=\\sigma^2=1/I(\\mu)$.',
    ],
    correction: `**Q6 (consistance).** Les $Y_i$ sont i.i.d. gaussiens, donc de carré intégrable ainsi que les $Y_i^2$ (moments de tous ordres). Par la LGN faible (Thm 1.2), $\\bar Y_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\mu$ et $\\frac1n\\sum_iY_i^2\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\sigma^2+\\mu^2$. Par la Prop. 2.1 le couple converge en probabilité, et par le théorème de continuité (Thm 1.1) appliqué à $(u,w)\\mapsto w-u^2$, continue, $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_iY_i^2-\\bar Y_n^2\\to\\sigma^2$. La suite $(\\hat\\mu_{ML},\\widehat{\\sigma^2}_{ML})$ est consistante (Déf. 1.2).

**Q7 (normalité asymptotique).** On écrit $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\mu)^2-(\\bar Y_n-\\mu)^2$, d’où

$$\\sqrt n\\begin{pmatrix}\\hat\\mu_{ML}-\\mu\\\\ \\widehat{\\sigma^2}_{ML}-\\sigma^2\\end{pmatrix}=\\frac1{\\sqrt n}\\sum_{i=1}^nW_i-\\begin{pmatrix}0\\\\ \\sqrt n(\\bar Y_n-\\mu)^2\\end{pmatrix},\\qquad W_i:=\\begin{pmatrix}Y_i-\\mu\\\\ (Y_i-\\mu)^2-\\sigma^2\\end{pmatrix}.$$

Les $W_i$ sont i.i.d., centrés, de carré intégrable, de covariance $\\Sigma$ : $\\mathrm{Var}(Y-\\mu)=\\sigma^2$ ; $\\mathrm{Cov}(Y-\\mu,(Y-\\mu)^2)=\\mathbb{E}[(Y-\\mu)^3]=0$ par symétrie de la gaussienne ; $\\mathrm{Var}((Y-\\mu)^2)=\\sigma^4\\mathrm{Var}(\\xi^2)=2\\sigma^4$ (rappel). Par le TCL multivarié (Thm 1.6), $\\frac1{\\sqrt n}\\sum_iW_i\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\Sigma)$. Le second terme : par le TCL, $\\sqrt n(\\bar Y_n-\\mu)\\Rightarrow\\mathcal{N}(0,\\sigma^2)$ ; par transformation continue (Thm 1.4) $n(\\bar Y_n-\\mu)^2\\Rightarrow\\sigma^2\\chi^2(1)$, et par Slutsky (ii) avec $1/\\sqrt n\\to0$, $\\sqrt n(\\bar Y_n-\\mu)^2\\to0$ en probabilité. Par le lemme de Slutsky (forme vectorielle, Remarque 2),

$$\\sqrt n\\big(\\hat\\theta_{ML}-\\theta\\big)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}\\Big(\\begin{pmatrix}0\\\\0\\end{pmatrix},\\begin{pmatrix}\\sigma^2&0\\\\0&2\\sigma^4\\end{pmatrix}\\Big).$$

(Cohérence : $\\Sigma=I(\\theta)^{-1}$ avec $I(\\mu,\\sigma^2)=\\mathrm{diag}(1/\\sigma^2,1/(2\\sigma^4))$.)

**Q8 (médiane).** $\\ln$ est croissante et la médiane de $\\mathcal{N}(\\mu,\\sigma^2)$ est $\\mu$, donc la médiane de $LN(\\mu,\\sigma^2)$ est $e^\\mu$ : on pose $\\hat\\mu_{Med}:=\\ln\\tilde X_n=\\mathrm{med}(Y_1,\\dots,Y_n)$. Le rappel avec $\\alpha=1/2$, $q_{1/2}=\\mu$, $f(\\mu)=\\frac1{\\sqrt{2\\pi\\sigma^2}}$ donne

$$\\sqrt n(\\hat\\mu_{Med}-\\mu)\\overset{d}{\\longrightarrow}\\mathcal{N}\\Big(0,\\frac{1/4}{1/(2\\pi\\sigma^2)}\\Big)=\\mathcal{N}\\Big(0,\\frac\\pi2\\sigma^2\\Big),\\qquad C=\\frac\\pi2\\approx1{,}57.$$

(Variante : TCL du quantile sur $\\tilde X_n$ autour de $e^\\mu$, variance $\\frac\\pi2\\sigma^2e^{2\\mu}$, puis méthode-δ avec $\\ln$, dérivée $e^{-\\mu}$ : même résultat.)

**Q9(a).** $m_k=\\mathbb{E}[e^{k\\mu+k\\sigma\\xi}]=e^{k\\mu+k^2\\sigma^2/2}$ ; $\\ln m_1=\\mu+\\sigma^2/2$, $\\ln m_2=2\\mu+2\\sigma^2$, d’où $\\widehat{\\sigma^2}_{Mom}=\\ln\\hat m_2-2\\ln\\hat m_1=\\ln(\\hat m_2/\\hat m_1^2)$ ($>0$ par Cauchy-Schwarz) et $\\hat\\mu_{Mom}=2\\ln\\hat m_1-\\frac12\\ln\\hat m_2$.

**Q9(b).** Les vecteurs $(X_i,X_i^2)$ sont i.i.d. de carré intégrable ($m_4<\\infty$). TCL multivarié : $\\sqrt n((\\hat m_1,\\hat m_2)-(m_1,m_2))\\Rightarrow\\mathcal{N}(0,\\Sigma)$, $\\Sigma_{11}=m_2-m_1^2$, $\\Sigma_{12}=m_3-m_1m_2$, $\\Sigma_{22}=m_4-m_2^2$ ; avec $m_2=m_1^2e^{\\sigma^2}$, $m_3=m_1m_2e^{2\\sigma^2}$, $m_4=m_2^2e^{4\\sigma^2}$ :

$$\\Sigma=\\begin{pmatrix}m_1^2(e^{\\sigma^2}-1)&m_1m_2(e^{2\\sigma^2}-1)\\\\ m_1m_2(e^{2\\sigma^2}-1)&m_2^2(e^{4\\sigma^2}-1)\\end{pmatrix}.$$

**Q9(c).** $g(a,b)=2\\ln a-\\frac12\\ln b$ est différentiable sur $(\\mathbb{R}_+^*)^2$, $\\nabla g(m_1,m_2)=(2/m_1,-1/(2m_2))^\\top$. Méthode-δ vectorielle (Thm 1.8) : $\\sqrt n(\\hat\\mu_{Mom}-\\mu)\\Rightarrow\\mathcal{N}(0,v_{Mom})$ avec

$$v_{Mom}=\\nabla g^\\top\\Sigma\\nabla g=4(e^{\\sigma^2}-1)-2(e^{2\\sigma^2}-1)+\\tfrac14(e^{4\\sigma^2}-1)=\\sigma^2+\\tfrac23\\sigma^6+\\tfrac32\\sigma^8+O(\\sigma^{10}).$$

Quand $\\sigma^2\\to\\infty$, $v_{Mom}\\sim\\frac14e^{4\\sigma^2}$.

**Q10.** Variances asymptotiques : $v_{ML}=\\sigma^2$ (borne de Cramér-Rao $1/I(\\mu)$ : l’EMV est asymptotiquement efficace, ch.7 Thm 1.7), $v_{Med}=\\frac\\pi2\\sigma^2$ (efficacité relative constante $2/\\pi\\approx0{,}64$), $v_{Mom}=\\sigma^2+\\frac23\\sigma^6+\\dots$ Par la Prop. 1.3, l’EMV est toujours le meilleur. Quand $\\sigma\\to0$ : $v_{Mom}\\approx v_{ML}<v_{Med}$ (les moments sont quasi efficaces, la médiane perd 36 %). Quand $\\sigma\\to\\infty$ : $v_{ML}<v_{Med}\\ll v_{Mom}$ (les moments empiriques d’une loi à queue lourde ont une variance qui explose). La médiane est robuste (aucune hypothèse de moment, insensible aux valeurs aberrantes) ; les moments sont simples mais inadaptés aux queues lourdes.`,
    bareme: [
      { label: 'Q6 consistance (LGN + continuité, couple)', points: 0.5 },
      { label: 'Q7 décomposition, covariance Σ, TCL multivarié, Slutsky', points: 0.75 },
      { label: 'Q8 médiane et C = π/2', points: 0.75 },
      { label: 'Q9(a) moments', points: 0.5 },
      { label: 'Q9(b) TCL multivarié, covariance', points: 0.5 },
      { label: 'Q9(c) méthode-δ vectorielle, DL', points: 0.75 },
      { label: 'Q10 comparaison et discussion', points: 0.5 },
    ],
  },
  {
    id: 'ch6-annale-cc2022-ex2',
    type: 'annale',
    title: 'CC 2022 Ex. 2 Q5–Q7 — deux estimateurs de μ² dans le modèle gaussien',
    source: 'CC MAP433 2022 Ex. 2 Q5–Q7',
    origin: 'annale',
    difficulty: 2,
    tags: ['consistance', 'delta-methode', 'slutsky', 'cas-degenere'],
    durationMin: 20,
    statement: `$X_1,\\dots,X_n$ i.i.d. $\\mathcal{N}(\\mu,\\sigma^2)$ ; $T_{1,n}=\\bar X_n^2$ et $T_{2,n}=\\bar X_n^2-\\frac1nS_n^2$ avec $S_n^2=\\frac1{n-1}\\sum_i(X_i-\\bar X_n)^2$. On a établi (Q2–Q3) que $\\mathbb{E}[(T_{1,n}-\\mu^2)^2]=3\\frac{\\sigma^4}{n^2}+4\\mu^2\\frac{\\sigma^2}n$ et que $T_{2,n}$ est sans biais. Rappel : $\\mathbb{E}[\\xi^4]=3$ pour $\\xi\\sim\\mathcal{N}(0,1)$.

**Q5.** Montrer que $T_{1,n}$ et $T_{2,n}$ sont des estimateurs consistants de $\\mu^2$.

**Q6.** On suppose $\\mu\\ne0$. Déterminer les lois limites de $\\sqrt n(T_{1,n}-\\mu^2)$ et $\\sqrt n(T_{2,n}-\\mu^2)$.

**Q7.** On suppose $\\mu=0$. Déterminer les lois limites de $nT_{1,n}$ et $nT_{2,n}$. Commenter.`,
    hints: [
      'Q5 : inégalité de Markov avec le risque quadratique de $T_{1,n}$ ; pour $T_{2,n}$, LGN sur $S_n^2$ puis Slutsky.',
      'Q6 : TCL pour $\\bar X_n$ puis méthode-δ avec $g(x)=x^2$, $g\'(\\mu)=2\\mu\\ne0$ ; le terme $S_n^2/\\sqrt n$ est négligeable.',
      'Q7 : $g\'(0)=0$, la méthode-δ dégénère ; écrire $n\\bar X_n^2=(\\sqrt n\\bar X_n)^2$ et utiliser la transformation continue (Thm 1.4), puis Slutsky pour $nT_{2,n}=nT_{1,n}-S_n^2$.',
    ],
    correction: `**Q5 (consistance).** Par l’inégalité de Markov (Lemme 2.1) appliquée à $(T_{1,n}-\\mu^2)^2$ : $\\mathbb{P}(|T_{1,n}-\\mu^2|\\ge\\varepsilon)\\le\\varepsilon^{-2}\\mathbb{E}[(T_{1,n}-\\mu^2)^2]=\\varepsilon^{-2}\\big(3\\frac{\\sigma^4}{n^2}+4\\mu^2\\frac{\\sigma^2}n\\big)\\to0$ : $T_{1,n}$ est consistant (Déf. 1.2 ; c’est la Prop. 2.2, convergence $L^2$ $\\Rightarrow$ probabilité). Pour $T_{2,n}=T_{1,n}-\\frac1nS_n^2$ : par la LGN et le théorème de continuité (Prop. 1.2), $S_n^2\\to\\sigma^2$ en probabilité, donc $\\frac1nS_n^2\\to0$ en probabilité (Slutsky (ii) avec $1/n\\to0$) ; par Slutsky (i), $T_{2,n}\\to\\mu^2$ en probabilité.

**Q6 ($\\mu\\ne0$).** Par le TCL (Thm 1.6, moment d’ordre 2 fini), $\\sqrt n(\\bar X_n-\\mu)\\Rightarrow\\mathcal{N}(0,\\sigma^2)$. La fonction $g(x)=x^2$ est dérivable en $\\mu$ avec $g\'(\\mu)=2\\mu\\ne0$ ; par la méthode-δ (Thm 1.7), $\\sqrt n(T_{1,n}-\\mu^2)\\Rightarrow\\mathcal{N}(0,4\\mu^2\\sigma^2)$. Ensuite $\\sqrt n(T_{2,n}-\\mu^2)=\\sqrt n(T_{1,n}-\\mu^2)-S_n^2/\\sqrt n$ où $S_n^2/\\sqrt n\\to0$ en probabilité ; par Slutsky (Remarque 2), $\\sqrt n(T_{2,n}-\\mu^2)\\Rightarrow\\mathcal{N}(0,4\\mu^2\\sigma^2)$ : même loi limite.

**Q7 ($\\mu=0$).** Ici $g\'(0)=0$ : la méthode-δ ne donne que $\\sqrt nT_{1,n}\\to0$ en probabilité (limite dégénérée), il faut changer d’échelle. On a $nT_{1,n}=(\\sqrt n\\bar X_n)^2$ avec $\\sqrt n\\bar X_n\\sim\\mathcal{N}(0,\\sigma^2)$ exactement (modèle gaussien), donc $nT_{1,n}\\sim\\sigma^2\\chi^2(1)$ pour tout $n$ (et c’est a fortiori la loi limite ; en général on invoquerait la transformation continue Thm 1.4). Puis $nT_{2,n}=nT_{1,n}-S_n^2$ avec $S_n^2\\to\\sigma^2$ en probabilité : par Slutsky (i), $nT_{2,n}\\Rightarrow\\sigma^2(\\chi^2(1)-1)$.

**Commentaire.** Quand $\\mu=0$ la vitesse de convergence passe de $1/\\sqrt n$ à $1/n$ et la loi limite n’est plus gaussienne (loi du $\\chi^2$) : c’est le cas dégénéré de la méthode-δ (Ex. 1.8). $T_{2,n}$ est centré en loi limite ($\\mathbb{E}[\\chi^2(1)-1]=0$, cohérent avec l’absence de biais), alors que $T_{1,n}\\ge0$ surestime systématiquement $\\mu^2=0$.`,
    bareme: [
      { label: 'Q5 consistance des deux estimateurs (Markov ; Slutsky)', points: 0.5 },
      { label: 'Q6 méthode-δ et terme négligeable', points: 0.5 },
      { label: 'Q7 échelle n, lois du khi-deux, commentaire', points: 0.5 },
    ],
  },
  {
    id: 'ch6-annale-pc7-gamma',
    type: 'annale',
    title: 'PC7 Ex. 2 — chaîne complète pour Gamma(2, θ)',
    source: 'PC7 Ex. 2 Q1–Q5',
    origin: 'pc',
    difficulty: 2,
    tags: ['consistance', 'tcl', 'delta-methode', 'slutsky', 'ic-asymptotique'],
    durationMin: 25,
    statement: `Pour $(a,b)\\in(\\mathbb{R}_+^*)^2$, $\\Gamma(a,b)$ a pour densité $x\\mapsto\\frac{b^a}{\\Gamma(a)}x^{a-1}e^{-bx}\\mathbb{1}_{\\mathbb{R}_+^*}(x)$, d’espérance $a/b$ et de variance $a/b^2$ ; si $X\\sim\\Gamma(a,b)$ et $Y\\sim\\Gamma(a\',b)$ sont indépendantes, $X+Y\\sim\\Gamma(a+a\',b)$. Soit une suite de $n$-échantillons de $\\{\\Gamma(2,\\theta):\\theta\\in\\mathbb{R}_+^*\\}$.

1. Calculer l’EMV $\\hat\\theta_n$ de $\\theta$.
2. Calculer le biais et le risque quadratique de $\\hat\\theta_n$.
3. Montrer que $\\hat\\theta_n$ est consistant.
4. Prouver la normalité asymptotique de $\\hat\\theta_n$.
5. Donner un intervalle de confiance asymptotique de niveau $1-\\alpha$ pour $\\theta$.`,
    hints: [
      'Q1 : log-vraisemblance $2n\\ln\\theta-\\theta\\sum_iX_i$ + constante, strictement concave. Q2 : $\\sum_iX_i\\sim\\Gamma(2n,\\theta)$, calculer $\\mathbb{E}[1/S]$ et $\\mathbb{E}[1/S^2]$ en reconnaissant des densités Gamma.',
      'Q3 : trois routes : LGN + continuité ; EQM $\\to0$ + Markov ; normalité asymptotique $\\Rightarrow$ consistance. Q4 : TCL pour $\\bar X_n$ puis méthode-δ avec $g(x)=2/x$, dérivée évaluée en $2/\\theta$.',
      'Q5 : Méthode 1.1 avec $v(\\theta)=\\theta^2/2$ : Slutsky pour remplacer $\\theta$ par $\\hat\\theta_n$ au dénominateur.',
    ],
    correction: `**Q1.** Par indépendance, $L_n(\\theta)=\\theta^{2n}\\big(\\prod_iX_i\\big)e^{-\\theta\\sum_iX_i}$ ; $\\ell_n(\\theta)=C+2n\\ln\\theta-\\theta\\sum_iX_i$, $\\dot\\ell_n(\\theta)=\\frac{2n}\\theta-\\sum_iX_i$, $\\ddot\\ell_n(\\theta)=-\\frac{2n}{\\theta^2}<0$ : stricte concavité, le point critique est l’unique maximum : $\\hat\\theta_n=\\frac{2n}{\\sum_iX_i}=\\frac2{\\bar X_n}$.

**Q2.** $S:=\\sum_iX_i\\sim\\Gamma(2n,\\theta)$ (additivité). $\\mathbb{E}_\\theta[\\hat\\theta_n]=2n\\int_0^\\infty\\frac1x\\frac{\\theta^{2n}x^{2n-1}}{\\Gamma(2n)}e^{-\\theta x}\\mathrm{d}x=\\frac{2n}{2n-1}\\theta$ : biais $b(\\hat\\theta_n)=\\frac\\theta{2n-1}>0$ ; de même $\\mathbb{E}_\\theta[\\hat\\theta_n^2]=\\frac{4n^2}{(2n-1)(2n-2)}\\theta^2$, et par la décomposition biais-variance (ch.3 Prop. 1.1) $EQM(\\hat\\theta_n)=\\theta^2\\Big(\\frac{4n^2}{(2n-1)^2(2n-2)}+\\frac1{(2n-1)^2}\\Big)=\\theta^2\\frac{n+1}{(2n-1)(n-1)}$, décroissance en $1/n$ compatible avec une vitesse $\\sqrt n$.

**Q3.** Par la LGN (Thm 1.2), $\\bar X_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}2/\\theta$ ; $x\\mapsto2/x$ est continue en $2/\\theta>0$ ; par le théorème de continuité (Thm 1.1), $\\hat\\theta_n\\to\\theta$ : consistance. (Autres routes : $EQM\\to0$ et Markov ; ou normalité asymptotique de Q4 $\\Rightarrow$ consistance.)

**Q4.** Par le TCL (Thm 1.6 ; $\\mathbb{E}_\\theta[X]=2/\\theta$, $\\mathrm{Var}_\\theta(X)=2/\\theta^2$), $\\sqrt n(\\bar X_n-2/\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,2/\\theta^2)$. $g(x)=2/x$ est $C^1$ sur $\\mathbb{R}_+^*$, $\\mathbb{P}_{n,\\theta}(\\bar X_n>0)=1$, $g\'(2/\\theta)=-\\theta^2/2$ ; par la méthode-δ (Thm 1.7), $\\sqrt n(\\hat\\theta_n-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}\\big(0,\\frac{\\theta^4}4\\cdot\\frac2{\\theta^2}\\big)=\\mathcal{N}(0,\\theta^2/2)$. (Vérification : $I(\\theta)=2/\\theta^2$ et $\\theta^2/2=1/I(\\theta)$, ch.7 Thm 1.6.)

**Q5.** Par Q4 et Portmanteau, $\\lim_n\\mathbb{P}_{n,\\theta}\\big(-z_{1-\\alpha/2}\\le\\sqrt n\\frac{\\hat\\theta_n-\\theta}{\\theta/\\sqrt2}\\le z_{1-\\alpha/2}\\big)=1-\\alpha$. La normalité asymptotique entraîne $\\hat\\theta_n\\to\\theta$ en probabilité ; $v(\\theta)=\\theta^2/2$ est continue et $>0$ ; par Slutsky (iii), $\\sqrt n\\frac{\\hat\\theta_n-\\theta}{\\hat\\theta_n/\\sqrt2}\\Rightarrow\\mathcal{N}(0,1)$, d’où l’intervalle de niveau asymptotique $1-\\alpha$ (Méthode 1.1) :

$$\\widehat I_n=\\Big[\\hat\\theta_n-z_{1-\\alpha/2}\\frac{\\hat\\theta_n}{\\sqrt{2n}},\\ \\hat\\theta_n+z_{1-\\alpha/2}\\frac{\\hat\\theta_n}{\\sqrt{2n}}\\Big],\\qquad\\lim_n\\mathbb{P}_{n,\\theta}(\\theta\\in\\widehat I_n)=1-\\alpha.$$

Application : $n=50$, $\\bar X_n=0{,}8$ : $\\hat\\theta_n=2{,}5$, IC à 95 % $[2{,}01;2{,}99]$.`,
    bareme: [
      { label: 'Q1 EMV (score, concavité)', points: 1 },
      { label: 'Q2 biais et risque', points: 1.5 },
      { label: 'Q3 consistance', points: 0.5 },
      { label: 'Q4 TCL + méthode-δ', points: 1 },
      { label: 'Q5 IC asymptotique (Slutsky)', points: 1 },
    ],
  },
  {
    id: 'ch6-annale-variante-weibull',
    type: 'annale',
    title: 'Variante type examen — modèle transformé de Weibull (puissance exponentielle)',
    source: 'Variante (style Examen 2025 Ex. 2 et CC 2022 Ex. 1 ; DIAGNOSTIC §9)',
    origin: 'variante',
    difficulty: 3,
    tags: ['consistance', 'tcl', 'delta-methode', 'slutsky', 'ic-asymptotique', 'variance-asymptotique', 'mediane'],
    durationMin: 35,
    statement: `Soit $c>0$ **connu** et un $n$-échantillon de densité $p_\\theta(x)=\\frac c\\theta x^{c-1}e^{-x^c/\\theta}\\mathbb{1}_{\\mathbb{R}_+}(x)$, $\\theta\\in\\Theta=\\mathbb{R}_+^*$ (loi de Weibull). On admet (changement de variable) que $Y_i:=X_i^c$ suit la loi exponentielle de densité $\\theta^{-1}e^{-y/\\theta}$ (**échelle** $\\theta$ : $\\mathbb{E}_\\theta[Y]=\\theta$, $\\mathrm{Var}_\\theta(Y)=\\theta^2$, $\\mathbb{E}_\\theta[Y^4]=24\\theta^4$) et que l’EMV de $\\theta$ est $\\hat\\theta_n=\\bar Y_n=\\frac1n\\sum_iX_i^c$.

1. Montrer que $\\hat\\theta_n$ est consistant et asymptotiquement normal ; donner sa variance asymptotique.
2. Construire un intervalle de confiance de niveau asymptotique $1-\\alpha$ pour $\\theta$ (deux méthodes : Slutsky ; inversion directe du pivot).
3. On veut estimer $g(\\theta)=\\mathbb{P}_\\theta(X>1)=e^{-1/\\theta}$. Montrer que $g(\\hat\\theta_n)$ est consistant et asymptotiquement normal ; donner la variance asymptotique.
4. La médiane de $Y$ vaut $\\theta\\ln2$. On pose $\\tilde\\theta_n:=\\mathrm{med}(Y_1,\\dots,Y_n)/\\ln2$. En utilisant le TCL du quantile empirique $\\sqrt n(\\hat q_{1/2}-q_{1/2})\\Rightarrow\\mathcal{N}\\big(0,\\frac{1/4}{f(q_{1/2})^2}\\big)$, montrer que $\\sqrt n(\\tilde\\theta_n-\\theta)\\Rightarrow\\mathcal{N}(0,\\theta^2/(\\ln2)^2)$. Comparer $\\hat\\theta_n$ et $\\tilde\\theta_n$.
5. Soit $\\hat v_n:=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2$. Donner la loi limite de $\\sqrt n(\\hat v_n-\\theta^2)$.`,
    hints: [
      'Q1 : les $Y_i$ sont i.i.d. de carré intégrable : LGN puis TCL directement ($\\hat\\theta_n$ est une moyenne empirique). Q2 : $v(\\theta)=\\theta^2$ continue : Méthode 1.1 ; pour l’inversion, résoudre $-z\\le\\sqrt n(\\bar Y_n/\\theta-1)\\le z$ en $\\theta$ (comparer PC6 Ex. 1).',
      'Q3 : méthode-δ avec $g(\\theta)=e^{-1/\\theta}$, $g\'(\\theta)=\\theta^{-2}e^{-1/\\theta}$. Q4 : $f(q_{1/2})=\\theta^{-1}e^{-\\ln2}=\\frac1{2\\theta}$, puis transformation continue (division par $\\ln2$).',
      'Q5 : Ex. 1.6 : $\\gamma=\\mathbb{E}[(Y-\\theta)^4]-\\theta^4$ ; pour une exponentielle d’échelle $\\theta$, $\\mathbb{E}[(Y-\\theta)^4]=9\\theta^4$.',
    ],
    correction: `**Q1.** Les $Y_i=X_i^c$ sont i.i.d. d’espérance $\\theta$ et de variance $\\theta^2<\\infty$. Par la LGN faible (Thm 1.2), $\\hat\\theta_n=\\bar Y_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\theta$ : consistance (Déf. 1.2). Par le TCL (Thm 1.6, moment d’ordre 2), $\\sqrt n(\\hat\\theta_n-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\theta^2)$ : normalité asymptotique (Déf. 1.6), variance asymptotique $v(\\theta)=\\theta^2$ (qui vaut $1/I(\\theta)$ : l’EMV est asymptotiquement efficace).

**Q2.** *Slutsky (Méthode 1.1).* $v(\\theta)=\\theta^2$ est continue et $>0$ ; $\\hat\\theta_n\\to\\theta$ en probabilité donc $\\hat\\theta_n/\\theta\\to1$ ; par Slutsky (iii), $\\sqrt n(\\hat\\theta_n-\\theta)/\\hat\\theta_n\\Rightarrow\\mathcal{N}(0,1)$ ; par Portmanteau, $\\big[\\hat\\theta_n(1-z_{1-\\alpha/2}/\\sqrt n),\\ \\hat\\theta_n(1+z_{1-\\alpha/2}/\\sqrt n)\\big]$ est de niveau asymptotique $1-\\alpha$. *Inversion du pivot.* $\\sqrt n(\\hat\\theta_n-\\theta)/\\theta\\Rightarrow\\mathcal{N}(0,1)$ (Ex. 1.10) ; $-z\\le\\sqrt n(\\hat\\theta_n/\\theta-1)\\le z\\iff\\frac{\\hat\\theta_n}{1+z/\\sqrt n}\\le\\theta\\le\\frac{\\hat\\theta_n}{1-z/\\sqrt n}$ (pour $z/\\sqrt n<1$) : second IC de niveau asymptotique $1-\\alpha$, analogue de Wilson (PC6 Ex. 1, méthode 3).

**Q3.** $g(\\theta)=e^{-1/\\theta}$ est continue et dérivable sur $\\mathbb{R}_+^*$, $g\'(\\theta)=\\theta^{-2}e^{-1/\\theta}\\ne0$, et $\\mathbb{P}_{n,\\theta}(\\hat\\theta_n>0)=1$. Par le théorème de continuité (Thm 1.1), $g(\\hat\\theta_n)\\to g(\\theta)$ en probabilité ; par la méthode-δ (Thm 1.7), $\\sqrt n(g(\\hat\\theta_n)-g(\\theta))\\Rightarrow\\mathcal{N}(0,g\'(\\theta)^2\\theta^2)=\\mathcal{N}\\big(0,\\theta^{-2}e^{-2/\\theta}\\big)$. (IC : Slutsky avec $\\hat\\theta_n^{-1}e^{-1/\\hat\\theta_n}$, continue en $\\theta$.)

**Q4.** La densité de $Y$ en sa médiane $q_{1/2}=\\theta\\ln2$ vaut $f(q_{1/2})=\\theta^{-1}e^{-\\ln2}=\\frac1{2\\theta}$. Le TCL du quantile donne $\\sqrt n(\\hat q_{1/2}-\\theta\\ln2)\\Rightarrow\\mathcal{N}\\big(0,\\frac{1/4}{1/(4\\theta^2)}\\big)=\\mathcal{N}(0,\\theta^2)$. Par transformation continue (division par la constante $\\ln2$), $\\sqrt n(\\tilde\\theta_n-\\theta)\\Rightarrow\\mathcal{N}\\big(0,\\theta^2/(\\ln2)^2\\big)$, soit $v_{Med}(\\theta)\\approx2{,}08\\,\\theta^2>v(\\theta)=\\theta^2$. Par la Prop. 1.3 (variances continues et $>0$), l’EMV est asymptotiquement meilleur : le rapport des longueurs d’IC tend vers $\\ln2\\approx0{,}69$. La médiane reste intéressante par robustesse (pas d’hypothèse de moment, insensibilité aux valeurs aberrantes).

**Q5.** Les $Y_i$ ont un moment d’ordre 4 ; par l’Ex. 1.6, $\\sqrt n(\\hat v_n-\\theta^2)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\gamma)$ avec $\\gamma=\\mathbb{E}_\\theta[(Y-\\theta)^4]-\\theta^4$. Pour l’exponentielle d’échelle $\\theta$, $\\mathbb{E}[(Y-\\theta)^4]=\\theta^4(24-4\\cdot6+6\\cdot2-3)=9\\theta^4$, d’où $\\gamma=8\\theta^4$. (Preuve : décomposition $\\hat v_n=\\frac1n\\sum(Y_i-\\theta)^2-(\\bar Y_n-\\theta)^2$, TCL sur le premier terme, Slutsky pour le second.)`,
    bareme: [
      { label: 'Q1 consistance et normalité asymptotique', points: 1 },
      { label: 'Q2 deux IC asymptotiques', points: 1.5 },
      { label: 'Q3 méthode-δ pour exp(−1/θ)', points: 1 },
      { label: 'Q4 médiane, comparaison (Prop. 1.3)', points: 1.5 },
      { label: 'Q5 loi limite de la variance empirique', points: 1 },
    ],
  },
]
