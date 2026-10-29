import type { CourseSection } from '../types'

/** Sections 5 à 8 du cours : méthode-δ, IC asymptotiques et tests, méthodes types / examen, compléments hors programme. */
export const coursePart2: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 5. Méthode-δ
  // -------------------------------------------------------------------------
  {
    id: 'ch6-s5-delta',
    title: '5. Méthode-δ : scalaire, vectorielle, cas dégénéré',
    role: 'preuves',
    intro:
      'La méthode-δ transporte la normalité asymptotique de $T_n$ à $g(T_n)$ : c’est la traduction asymptotique d’une approximation au premier ordre $g(T_n)-g(\\theta)\\approx\\dot g(\\theta)(T_n-\\theta)$. La variance asymptotique est **multipliée par $\\dot g(\\theta)^2$** (par $J_g\\Sigma J_g^\\top$ en dimension supérieure). Si $\\dot g(\\theta)=0$, la limite est dégénérée et il faut changer d’échelle.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch6-thm-1-7',
        type: 'theoreme',
        label: 'Théorème 1.7',
        title: 'Méthode-δ, cas scalaire',
        source: 'Poly ch.6, Thm 1.7, p. 23',
        hypotheses: [
          '$g:D_g\\to\\mathbb{R}$ définie sur un **intervalle ouvert** $D_g$ de $\\mathbb{R}$ et **dérivable au point** $\\theta\\in D_g$, de dérivée $\\dot g(\\theta)$.',
          '$\\{T_n\\}$ v.a. sur $(\\mathsf{X}_n,\\mathcal{X}_n,\\mathbb{P}_n)$ avec $\\mathbb{P}_n(T_n\\in D_g)=1$ pour tout $n$.',
          '$r_n(T_n-\\theta)\\overset{\\mathbb{P}_n}{\\Longrightarrow}G$ pour une suite **croissante** $\\{r_n\\}$ de réels **strictement positifs**, $r_n\\to+\\infty$.',
        ],
        statement: `$$r_n\\big(g(T_n)-g(\\theta)\\big)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\dot g(\\theta)\\,G,\\qquad r_n\\big(g(T_n)-g(\\theta)\\big)-r_n\\dot g(\\theta)(T_n-\\theta)\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0.$$

Cas typique : $r_n=\\sqrt n$ et $G\\sim\\mathcal{N}(0,\\sigma^2)$ donnent $\\sqrt n(g(T_n)-g(\\theta))\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\dot g(\\theta)^2\\sigma^2)$.`,
        intuition: 'Gain : la loi limite de $g(T_n)$ s’obtient sans nouveau calcul, la variance asymptotique étant multipliée par $\\dot g(\\theta)^2$. Perte : si $\\dot g(\\theta)=0$, la limite est dégénérée et la bonne échelle n’est plus $r_n$ (Ex. 1.8).',
        proof: [
          {
            text: '*Convergence en probabilité de $T_n-\\theta$.* $T_n-\\theta=r_n^{-1}\\cdot r_n(T_n-\\theta)\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0$.',
            justification: 'Slutsky (ii) : $r_n(T_n-\\theta)$ converge en loi et $r_n^{-1}\\to0$ ; convergence en loi vers 0 $\\iff$ en probabilité.',
          },
          {
            text: '*Développement de $g$.* Pour $h\\ne0$ avec $\\theta+h\\in D_g$, $\\varepsilon(h):=\\frac{g(\\theta+h)-g(\\theta)}h-\\dot g(\\theta)$, $\\varepsilon(0):=0$ (prolongé par 0 hors de $\\{h:\\theta+h\\in D_g\\}$) : $\\varepsilon$ est continue en 0 et $g(\\theta+h)=g(\\theta)+\\dot g(\\theta)h+h\\varepsilon(h)$.',
            justification: 'Définition de la dérivabilité de $g$ en $\\theta$.',
          },
          {
            text: '$\\mathbb{P}_n$-p.s., $r_n(g(T_n)-g(\\theta))=\\dot g(\\theta)\\,r_n(T_n-\\theta)+r_n(T_n-\\theta)\\,\\varepsilon(T_n-\\theta)$.',
            justification: 'Développement précédent avec $h=T_n-\\theta$, licite car $\\mathbb{P}_n(T_n\\in D_g)=1$.',
          },
          {
            text: '*Passage à la limite.* $\\varepsilon(T_n-\\theta)\\to0$ en probabilité, donc $R_n:=r_n(T_n-\\theta)\\varepsilon(T_n-\\theta)\\to0$ en probabilité (seconde assertion).',
            justification: 'Continuité en probabilité (Thm 2.1, $\\varepsilon$ continue en 0 et $T_n-\\theta\\to0$), puis Slutsky (ii) au produit ($r_n(T_n-\\theta)\\Rightarrow G$, $\\varepsilon(T_n-\\theta)\\to0$).',
          },
          {
            text: '$\\dot g(\\theta)\\{r_n(T_n-\\theta)\\}\\Rightarrow\\dot g(\\theta)G$, et ajouter $R_n$ ne change pas la limite : première assertion.',
            justification: 'Transformation continue (Thm 1.4, multiplication par une constante), puis Remarque 2 après Slutsky ($U_n\\Rightarrow\\nu$, $V_n\\to0$ en probabilité).',
          },
        ],
        pitfalls: [
          'Ne pas oublier de vérifier $\\mathbb{P}_n(T_n\\in D_g)=1$ et la dérivabilité **au point $\\theta$ (la vraie valeur)**.',
          '$\\dot g$ s’évalue **au point limite de $T_n$**. Si $T_n=\\bar X_n$ estime $1/\\theta$ (exponentielle), c’est $\\dot\\varphi(1/\\theta)$ et non $\\dot\\varphi(\\theta)$ (PC6 Ex. 1).',
          'Ne pas oublier le **carré** : la variance est multipliée par $\\dot g(\\theta)^2$, l’écart-type par $|\\dot g(\\theta)|$.',
        ],
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-7',
        title: 'Exemple 1.7 — EMV du paramètre d’une loi exponentielle : variance asymptotique θ²',
        source: 'Poly ch.6, Ex. 1.7, p. 24',
        setup: '$\\mathcal{E}(\\theta)$ de densité $x\\mapsto\\theta e^{-\\theta x}$ sur $\\mathbb{R}_+$, espérance $1/\\theta$, variance $1/\\theta^2$ ; EMV $\\hat\\theta_n:=\\bar X_n^{-1}$.',
        steps: [
          { text: '$\\varphi(u):=1/u$, $u>0$ ; consistance : Ex. 1.3.', justification: 'LGN + théorème de continuité.' },
          { text: '$\\sqrt n(\\bar X_n-\\theta^{-1})\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\theta^{-2})$.', justification: 'TCL (Thm 1.6) : $\\mathrm{Var}_{n,\\theta}(X_1)=1/\\theta^2$.' },
          { text: '$\\varphi$ est dérivable en $\\theta^{-1}\\in D_\\varphi:=\\mathbb{R}_+^*$, $\\dot\\varphi(\\theta^{-1})=-1/(\\theta^{-1})^2=-\\theta^2$ ; $\\mathbb{P}_{n,\\theta}(\\bar X_n\\in\\mathbb{R}_+^*)=1$.', justification: 'Vérification des hypothèses du Thm 1.7.' },
          { text: '$\\sqrt n(\\hat\\theta_n-\\theta)=\\sqrt n(\\varphi(\\bar X_n)-\\varphi(\\theta^{-1}))\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\dot\\varphi(\\theta^{-1})^2\\theta^{-2})=\\mathcal{N}(0,\\theta^4\\cdot\\theta^{-2})=\\mathcal{N}(0,\\theta^2)$.', justification: 'Méthode-δ (Thm 1.7) avec $r_n=\\sqrt n$.' },
        ],
        conclusion: 'Variance asymptotique $\\theta^2=1/\\mathbb{I}(\\theta)$ (information de Fisher d’une observation). Même schéma pour $\\Gamma(2,\\theta)$ (PC7 Ex. 2 : $g(x)=2/x$, $\\dot g(2/\\theta)=-\\theta^2/2$, variance $\\theta^2/2$) et pour Pareto (PC6 Ex. 2 : variance $\\eta^2$).',
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-8',
        title: 'Exemple 1.8 — Lois limites du carré et de l’inverse : le cas dégénéré',
        source: 'Poly ch.6, Ex. 1.8, p. 24–25',
        setup: 'On suppose $r_n(X_n-\\mu)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\sigma^2)$, $\\sigma^2>0$, $r_n$ croissante positive $\\to\\infty$.',
        steps: [
          { text: '*$X_n^2$, $\\mu\\ne0$.* $g(x)=x^2$, $g\'(\\mu)=2\\mu\\ne0$ : $r_n(X_n^2-\\mu^2)\\Rightarrow\\mathcal{N}(0,4\\mu^2\\sigma^2)$.', justification: 'Méthode-δ (Thm 1.7).' },
          { text: '*$X_n^2$, $\\mu=0$.* $g\'(0)=0$ : la méthode-δ ne donne que $r_nX_n^2\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0$. À la vitesse $r_n^2$ : $\\sigma^{-2}r_n^2X_n^2=(\\sigma^{-1}r_nX_n)^2\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\chi^2(1)$.', justification: 'Transformation continue (Thm 1.4) avec $x\\mapsto x^2$ appliquée à $\\sigma^{-1}r_nX_n\\Rightarrow\\mathcal{N}(0,1)$.' },
          { text: '*$1/X_n$, $\\mu\\ne0$* (on suppose $\\mathbb{P}_n(X_n=0)=0$) : $r_n\\big(\\frac1{X_n}-\\frac1\\mu\\big)\\Rightarrow\\mathcal{N}\\big(0,\\frac{\\sigma^2}{\\mu^4}\\big)$.', justification: 'Méthode-δ avec $g(x)=1/x$ dérivable en $\\mu$, $g\'(\\mu)^2=1/\\mu^4$.' },
          { text: '*$1/X_n$, $\\mu=0$.* $\\frac\\sigma{r_nX_n}\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\frac1X$, $X\\sim\\mathcal{N}(0,1)$.', justification: 'Transformation continue avec $x\\mapsto1/x$, continue sur $C:=\\mathbb{R}^*$, de mesure 1 pour $\\mathcal{N}(0,1)$.' },
        ],
        conclusion: 'Quand la dérivée s’annule, l’approximation au premier ordre ne contient plus d’information : la loi limite apparaît à une **autre échelle** ($r_n^2$) et avec une **autre forme** ($\\chi^2$, non gaussienne). C’est exactement la question CC 2022 Ex. 2 Q7 : pour $\\mu=0$, $n\\bar X_n^2\\sim\\sigma^2\\chi^2(1)$. Piège : conclure à une « gaussienne de variance nulle ».',
      },
      {
        kind: 'theorem',
        id: 'ch6-def-2-3',
        type: 'definition',
        label: 'Définitions 2.3–2.4 (Outils)',
        title: 'Matrice jacobienne, fonction différentiable',
        source: 'Poly ch.6, Outils, Déf. 2.3 et 2.4, p. 40',
        hypotheses: ['$g$ d’un ouvert de $\\mathbb{R}^p$ dans $\\mathbb{R}^m$, de composantes $g_1,\\dots,g_m$.'],
        statement: `Si les dérivées partielles existent en $y$, la *matrice jacobienne* ($m$ lignes, $p$ colonnes) est

$$J_g(y)=\\begin{pmatrix}\\dfrac{\\partial g_1}{\\partial y_1}&\\cdots&\\dfrac{\\partial g_1}{\\partial y_p}\\\\ \\vdots&\\ddots&\\vdots\\\\ \\dfrac{\\partial g_m}{\\partial y_1}&\\cdots&\\dfrac{\\partial g_m}{\\partial y_p}\\end{pmatrix}.$$

$g$ est *différentiable* en $y$ si $g(y+h)=g(y)+J_g(y)h+\\varepsilon(h)$ avec $\\|\\varepsilon(h)\\|=o(\\|h\\|)$.`,
        intuition: 'Pour $p=m=1$, $J_g$ se réduit à $\\dot g(\\theta)$. Pour $m=1$ (estimer un réel à partir d’un vecteur de moments), $J_g=\\nabla g^\\top$ est une ligne et la variance limite est $\\nabla g^\\top\\Sigma\\nabla g$.',
        pitfalls: ['Dérivées partielles **continues** $\\Rightarrow$ différentiable ; la réciproque est fausse, et l’existence seule des dérivées partielles ne suffit pas.'],
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-1-8',
        type: 'theoreme',
        label: 'Théorème 1.8',
        title: 'Méthode-δ, cas vectoriel',
        source: 'Poly ch.6, Thm 1.8, p. 25–26',
        hypotheses: [
          '$D_g$ ouvert de $\\mathbb{R}^p$ ; $g:D_g\\to\\mathbb{R}^m$ **différentiable au point** $\\theta\\in D_g$, de matrice jacobienne $J_g(\\theta)$.',
          '$T_n$ vecteurs aléatoires sur $(\\mathsf{X}_n,\\mathcal{X}_n,\\mathbb{P}_n)$ avec $\\mathbb{P}_n(T_n\\in D_g)=1$.',
          '$r_n(T_n-\\theta)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathrm{T}$, $\\{r_n\\}$ croissante, strictement positive, $\\to+\\infty$.',
        ],
        statement: `$$r_n\\big(g(T_n)-g(\\theta)\\big)\\overset{\\mathbb{P}_n}{\\Longrightarrow}J_g(\\theta)\\,\\mathrm{T},\\qquad r_n\\big(g(T_n)-g(\\theta)\\big)-r_nJ_g(\\theta)(T_n-\\theta)\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0.$$

En particulier, si $r_n=\\sqrt n$ et $\\mathrm{T}\\sim\\mathcal{N}(0,\\Sigma)$ :

$$\\sqrt n\\big(g(T_n)-g(\\theta)\\big)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}\\big(0,J_g(\\theta)\\,\\Sigma\\,J_g(\\theta)^\\top\\big).$$`,
        intuition: 'La dérivée devient la jacobienne ; la covariance se transforme comme pour une application linéaire. Preuve **esquissée** dans le poly (p. 26 et 43) : celle du cas scalaire avec un reste $R(h)$, $\\|R(h)\\|=o(\\|h\\|)$, et Slutsky sous sa forme vectorielle (Thm 4.1).',
        proof: [
          { text: '$g(\\theta+h)=g(\\theta)+J_g(\\theta)h+\\|h\\|\\tilde R(h)$ avec $\\tilde R$ continue et nulle en 0.', justification: 'Différentiabilité (Déf. 2.4) : $\\tilde R(h):=R(h)/\\|h\\|$ pour $h\\ne0$.' },
          { text: '$r_n(g(T_n)-g(\\theta))-J_g(\\theta)\\{r_n(T_n-\\theta)\\}=r_n\\|T_n-\\theta\\|\\,\\tilde R(T_n-\\theta)$, avec $r_n\\|T_n-\\theta\\|\\Rightarrow\\|\\mathrm{T}\\|$ et $\\tilde R(T_n-\\theta)\\to0$ en probabilité ; le produit tend vers 0 en probabilité.', justification: 'Transformation continue (norme), continuité en probabilité ($T_n-\\theta\\to0$ par Slutsky), puis Slutsky vectoriel (Thm 4.1).' },
          { text: '$J_g(\\theta)\\{r_n(T_n-\\theta)\\}\\Rightarrow J_g(\\theta)\\mathrm{T}$ et l’ajout du reste ne change pas la limite ; si $\\mathrm{T}\\sim\\mathcal{N}(0,\\Sigma)$, $J_g(\\theta)\\mathrm{T}\\sim\\mathcal{N}(0,J_g\\Sigma J_g^\\top)$.', justification: 'Transformation continue (application linéaire), Thm 4.1 (i) ; image linéaire d’un vecteur gaussien.' },
        ],
        pitfalls: ['Dimensions : $J_g(\\theta)$ est $m\\times p$, la covariance limite est $m\\times m$.', '**Examen 2025 Ex. 2 Q9(c)** : $\\hat\\mu_{Mom}=g(\\hat m_1,\\hat m_2)$ avec $g(a,b)=2\\ln a-\\frac12\\ln b$, $\\nabla g=(2/m_1,-1/(2m_2))^\\top$, variance $\\nabla g^\\top\\Sigma\\nabla g$ : une jacobienne, pas une simple dérivée (DIAGNOSTIC §6, piège 9).'],
      },
      {
        kind: 'viz',
        id: 'ch6-s5-viz-delta',
        vizId: 'ch6-delta-methode',
        caption: 'Linéarisation de $g$ autour de $\\mu$ et loi limite de $\\sqrt n(g(\\bar X_n)-g(\\mu))$ ; amener $\\mu$ en 0 pour $g(x)=x^2$ montre le cas dégénéré.',
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-13',
        title: 'Exemple 1.13 — Stabilisation de la variance (transformation arcsinus-racine)',
        source: 'Poly ch.6, Ex. 1.13, p. 30',
        setup: 'Modèle de Bernoulli $\\{\\mathcal{B}\\mathrm{er}(\\theta):\\theta\\in\\,]0,1[\\}$ ; éq. (4) : $\\sqrt n(\\bar X_n-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\theta(1-\\theta))$ ; $g$ dérivable sur $\\Theta$ avec $g\'(\\theta)\\ne0$. But : un IC asymptotique sans estimer la variance.',
        steps: [
          { text: '$\\sqrt n\\big(g(\\bar X_n)-g(\\theta)\\big)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}\\big(0,[g\'(\\theta)]^2\\theta(1-\\theta)\\big)$.', justification: 'Méthode-δ (Thm 1.7) appliquée à (4).' },
          { text: 'Si $[g\'(\\theta)]^2\\theta(1-\\theta)=k^2$ pour tout $\\theta$, la variance asymptotique ne dépend plus de $\\theta$ et $\\big[g(\\bar X_n)\\pm z_{1-\\alpha/2}\\frac k{\\sqrt n}\\big]$ est un IC de niveau asymptotique $1-\\alpha$ pour $g(\\theta)$.', justification: 'Portmanteau sur $[-z_{1-\\alpha/2},z_{1-\\alpha/2}]$ (comme au Cor. 1.1).' },
          { text: 'Avec $k=1/2$ : $g\'(\\theta)=\\frac{1/2}{\\sqrt{\\theta(1-\\theta)}}$, soit $g(\\theta)=\\arcsin\\sqrt\\theta$, et $\\sqrt n\\big(\\arcsin\\sqrt{\\bar X_n}-\\arcsin\\sqrt\\theta\\big)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,1/4)$.', justification: 'Résolution de l’équation différentielle $g\'(\\theta)=k/\\sqrt{\\theta(1-\\theta)}$ ; on vérifie $\\frac{\\mathrm{d}}{\\mathrm{d}\\theta}\\arcsin\\sqrt\\theta=\\frac1{2\\sqrt\\theta\\sqrt{1-\\theta}}$.' },
          { text: '$g$ croissante de réciproque $u\\mapsto\\sin^2u$ sur $[0,\\pi/2]$ : IC de niveau asymptotique $1-\\alpha$ pour $\\theta$ : $\\Big[\\sin^2\\Big(\\arcsin\\sqrt{\\bar X_n}-\\frac{z_{1-\\alpha/2}}{2\\sqrt n}\\Big),\\ \\sin^2\\Big(\\arcsin\\sqrt{\\bar X_n}+\\frac{z_{1-\\alpha/2}}{2\\sqrt n}\\Big)\\Big]$, les arguments étant ramenés à $[0,\\pi/2]$.', justification: 'Inversion par monotonie d’une bijection croissante.' },
        ],
        conclusion: 'Évite d’estimer la variance asymptotique (pas de seconde source d’erreur). Possible **seulement en dimension un** (équation différentielle). Second exemple : PC6 Ex. 1 (modèle exponentiel, $g=\\ln$, variance 1).',
      },
      {
        kind: 'example',
        id: 'ch6-ex-pc6-4',
        title: 'PC6 Ex. 4 — Modèle de Poisson : la chaîne LGN → TCL → méthode-δ → Slutsky → IC',
        source: 'PC6 Ex. 4 (énoncé p. 3, corrigé p. 17)',
        setup: '$n$-échantillons de $\\mathcal{P}(\\theta)$, $\\theta>0$ ; $\\bar X_n:=n^{-1}\\sum_iX_i$. Estimer $g(\\theta)=\\mathbb{P}_{n,\\theta}(X_1=0)=e^{-\\theta}$ par $e^{-\\bar X_n}$ et construire un IC asymptotique.',
        steps: [
          { text: '**Q1.** $\\mathbb{E}_{n,\\theta}[X_1]=\\mathrm{Var}_{n,\\theta}(X_1)=\\theta$, donc $\\sqrt n(\\bar X_n-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\theta)$ : $\\{\\bar X_n\\}$ est asymptotiquement normale, de variance asymptotique $\\sigma^2(\\theta):=\\theta$.', justification: 'TCL (Thm 1.6), moment d’ordre 2 fini.' },
          { text: '**Q2, consistance.** $\\bar X_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\theta$, puis $e^{-\\bar X_n}\\to e^{-\\theta}$ en probabilité.', justification: 'LGN (Thm 1.2) puis continuité de l’exponentielle (Thm 1.1).' },
          { text: '**Q2, normalité.** $g(\\theta)=e^{-\\theta}$ est dérivable, $g\'(\\theta)=-e^{-\\theta}$ : $\\sqrt n\\big(e^{-\\bar X_n}-e^{-\\theta}\\big)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\theta e^{-2\\theta})$.', justification: 'Méthode-δ (Thm 1.7) : $(g\'(\\theta))^2\\sigma^2(\\theta)=e^{-2\\theta}\\theta$.' },
          { text: '**Q3.** $\\gamma(\\theta):=\\sqrt\\theta e^{-\\theta}$ est continue sur $\\mathbb{R}_+^*$ : $\\gamma(\\bar X_n)\\to\\gamma(\\theta)>0$ en probabilité ; donc $G_n:=\\sqrt n\\,\\gamma(\\bar X_n)^{-1}(e^{-\\bar X_n}-e^{-\\theta})\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,1)$ : fonction asymptotiquement pivotale.', justification: 'LGN + continuité, puis Slutsky (iii).' },
          { text: 'IC de niveau asymptotique $1-\\alpha$ pour $e^{-\\theta}$ : $\\Big[e^{-\\bar X_n}-\\gamma(\\bar X_n)\\frac{z_{1-\\alpha/2}}{\\sqrt n}\\ ;\\ e^{-\\bar X_n}+\\gamma(\\bar X_n)\\frac{z_{1-\\alpha/2}}{\\sqrt n}\\Big]$.', justification: 'Méthode 1.1 avec $v(\\theta)=\\theta e^{-2\\theta}$ continue ; Portmanteau.' },
        ],
        conclusion: 'Application numérique : $n=100$, $\\bar X_n=2$, $\\alpha=5\\%$ : $e^{-2}\\approx0{,}1353$, $\\gamma(2)\\approx0{,}1914$, IC $\\approx[0{,}098\\,;\\,0{,}173]$. Pièges : ne pas oublier le carré de $g\'$ ni $\\sigma^2(\\theta)=\\theta$ ; $\\gamma$ est l’**écart-type** asymptotique, pas la variance.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 6. IC asymptotiques, comparaison, tests asymptotiques
  // -------------------------------------------------------------------------
  {
    id: 'ch6-s6-ic',
    title: '6. Intervalles de confiance asymptotiques, comparaison d’estimateurs, tests asymptotiques',
    role: 'methodes',
    intro:
      'La normalité asymptotique fournit un **pivot asymptotique** (Déf. 1.7) et donc des régions de confiance de niveau asymptotique $1-\\alpha$ (Déf. 1.8). La Méthode 1.1 (« plug-in » de la variance, Slutsky) est la construction standard ; Wilson (inversion du pivot) et la stabilisation de la variance sont les deux alternatives. La variance asymptotique sert aussi à **comparer** des estimateurs (Prop. 1.3) et à calibrer des tests (Déf. 1.9–1.11, Ex. 1.14).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch6-def-1-7',
        type: 'definition',
        label: 'Définition 1.7',
        title: 'Fonction asymptotiquement pivotale',
        source: 'Poly ch.6, Déf. 1.7, p. 27',
        hypotheses: ['Suite de modèles ; $G_n:\\mathsf{Z}_n\\times\\Theta\\to\\mathbb{R}^p$ mesurables.'],
        statement: `$\\{G_n\\}$ est *asymptotiquement pivotale de loi* $L$ s’il existe une probabilité $L$ sur $\\mathbb{R}^p$ telle que, pour tous $\\theta,\\vartheta\\in\\Theta$ et tout $A\\in\\mathcal{B}(\\mathbb{R}^p)$,

$$\\lim_{n\\to\\infty}\\mathbb{P}_{n,\\theta}(G_n(Z_n,\\theta)\\in A)=\\lim_{n\\to\\infty}\\mathbb{P}_{n,\\vartheta}(G_n(Z_n,\\vartheta)\\in A)=L(A).$$`,
        intuition: 'Version asymptotique de la fonction pivotale du chapitre 4 : on demande seulement que la **loi limite** ne dépende pas du paramètre. $G_n$ dépend de $\\theta$ (comme un pivot), mais sa loi limite non.',
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-10',
        title: 'Exemple 1.10 — Pivot asymptotique issu de la normalité asymptotique',
        source: 'Poly ch.6, Ex. 1.10, p. 27',
        setup: '$T_n$ asymptotiquement normale : $\\sqrt n(T_n(Z_n)-g(\\theta))\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,v(\\theta))$, $v(\\theta)>0$.',
        steps: [
          { text: '$G_n(Z_n;\\theta):=\\frac{\\sqrt n}{\\sqrt{v(\\theta)}}(T_n(Z_n)-g(\\theta))\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,1)$ à $\\theta$ fixé.', justification: 'Transformation continue (multiplication par la constante $v(\\theta)^{-1/2}$).' },
          { text: 'La limite $\\mathcal{N}(0,1)$ ne dépend pas de $\\theta$ et ne charge aucun point : la définition est satisfaite pour les intervalles, qui engendrent $\\mathcal{B}(\\mathbb{R})$.', justification: 'Portmanteau (iii) ; argument du poly (rapide : en pratique on n’utilise que des intervalles).' },
        ],
        conclusion: '$G_n$ est asymptotiquement pivotale de loi $L=\\mathcal{N}(0,1)$. Mais ses bornes font intervenir $v(\\theta)$ inconnu : d’où la Méthode 1.1.',
      },
      {
        kind: 'theorem',
        id: 'ch6-def-1-8',
        type: 'definition',
        label: 'Définition 1.8',
        title: 'Région de confiance de niveau asymptotique 1 − α',
        source: 'Poly ch.6, Déf. 1.8, p. 27',
        hypotheses: ['$g:\\Theta\\to\\mathbb{R}^p$, $\\alpha\\in\\,]0,1[$, $\\{\\mathcal{C}_n(Z_n)\\}\\subset\\mathcal{B}(\\mathbb{R}^p)$ ensembles aléatoires.'],
        statement: `$\\{\\mathcal{C}_n(Z_n)\\}$ définit une suite de régions de confiance au niveau asymptotique $1-\\alpha$ pour $g$ si

$$\\inf_{\\theta\\in\\Theta}\\ \\liminf_{n\\to\\infty}\\ \\mathbb{P}_{n,\\theta}\\big(g(\\theta)\\in\\mathcal{C}_n(Z_n)\\big)\\ge1-\\alpha.$$`,
        intuition: 'On passe d’abord à la limite en $n$ à $\\theta$ fixé, **puis** on prend l’infimum sur $\\Theta$.',
        pitfalls: ['L’ordre $\\inf_\\theta\\liminf_n$ (et non $\\liminf_n\\inf_\\theta$) : aucune garantie uniforme.', 'La définition **ne dit rien de la couverture pour un $n$ donné** — « c’est sa limite principale » (Wald contre Wilson, §4.4).', 'Vocabulaire : « niveau asymptotique $1-\\alpha$ », jamais « $\\mathbb{P}(\\theta\\in[a,b])=0{,}95$ » avec des bornes numériques.'],
      },
      {
        kind: 'theorem',
        id: 'ch6-meth-1-1',
        type: 'methode',
        label: 'Méthode 1.1',
        title: 'Intervalle de confiance asymptotique quand la variance asymptotique est continue',
        source: 'Poly ch.6, Méthode 1.1, p. 28',
        hypotheses: ['$\\sqrt n(\\hat\\theta_n-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,v(\\theta))$ pour tout $\\theta$.', '$v(\\theta)>0$ et $\\theta\\mapsto v(\\theta)$ **continue** sur $\\Theta$.'],
        statement: `- $G_n:(Z_n;\\theta)\\mapsto\\sqrt n(\\hat\\theta_n-\\theta)/\\sqrt{v(\\theta)}$ est asymptotiquement pivotale de loi $\\mathcal{N}(0,1)$ (Ex. 1.10) ;
- la normalité asymptotique entraîne la consistance ; $v$ continue donne $v(\\hat\\theta_n)\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}v(\\theta)>0$ ; Slutsky fournit une seconde fonction asymptotiquement pivotale

$$\\sqrt n\\,\\frac{\\hat\\theta_n-\\theta}{\\sqrt{v(\\hat\\theta_n)}}\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,1)\\,;$$

- d’où l’intervalle de confiance de niveau asymptotique $1-\\alpha$

$$\\mathcal{C}_{n,\\alpha}(\\hat\\theta_n)=\\Big[\\hat\\theta_n-z_{1-\\alpha/2}\\sqrt{\\frac{v(\\hat\\theta_n)}n},\\ \\hat\\theta_n+z_{1-\\alpha/2}\\sqrt{\\frac{v(\\hat\\theta_n)}n}\\Big].$$`,
        intuition: 'L’intérêt du second pivot : ses bornes sont **calculables**. Remplacer $v(\\theta)$ par $v(\\hat\\theta_n)$ ne change pas la loi limite (Slutsky) mais change la couverture à $n$ fixé (seconde source d’erreur) — c’est exactement la différence Wald / Wilson.',
        proof: [
          { text: '$\\hat\\theta_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\theta$.', justification: 'Normalité asymptotique $\\Rightarrow$ consistance (Déf. 1.6, Slutsky avec $1/\\sqrt n$).' },
          { text: '$\\sqrt{v(\\hat\\theta_n)}\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\sqrt{v(\\theta)}>0$.', justification: 'Théorème de continuité (Thm 1.1) : $v$ continue, racine carrée continue.' },
          { text: '$\\sqrt n(\\hat\\theta_n-\\theta)/\\sqrt{v(\\hat\\theta_n)}\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,1)$.', justification: 'Slutsky (iii) (quotient par une suite convergeant en probabilité vers une constante non nulle).' },
          { text: '$\\lim_n\\mathbb{P}_{n,\\theta}\\big(-z_{1-\\alpha/2}\\le\\sqrt n(\\hat\\theta_n-\\theta)/\\sqrt{v(\\hat\\theta_n)}\\le z_{1-\\alpha/2}\\big)=1-\\alpha$, et l’événement se réécrit $\\theta\\in\\mathcal{C}_{n,\\alpha}(\\hat\\theta_n)$.', justification: 'Portmanteau (iii) sur $[-z_{1-\\alpha/2},z_{1-\\alpha/2}]$ (frontière de mesure nulle pour $\\mathcal{N}(0,1)$), puis résolution en $\\theta$.' },
        ],
        pitfalls: ['Il faut $v$ **continue** et $v(\\theta)>0$.', 'Rédaction type examen (DIAGNOSTIC §5.8) : TCL → méthode-δ → consistance de $v(\\hat\\theta_n)$ (continuité) → Slutsky → intervalle, en écrivant « de niveau **asymptotique** $1-\\alpha$ ».'],
      },
      {
        kind: 'text',
        id: 'ch6-s6-bernoulli',
        title: 'Le modèle de Bernoulli : TCL (4) et pivot (5) — trois intervalles pour une proportion (p. 28)',
        text: `Suite de $n$-échantillons de $\\{\\mathcal{B}\\mathrm{er}(\\theta):\\theta\\in\\,]0,1[\\}$. Par le TCL, pour tout $\\theta$,

$$\\sqrt n\\big(\\bar X_n-\\theta\\big)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,\\theta(1-\\theta)),\\qquad(4)$$

d’où la fonction asymptotiquement pivotale

$$G_n:(X_1,\\dots,X_n;\\theta)\\mapsto\\sqrt n\\,\\frac{\\bar X_n-\\theta}{\\sqrt{\\theta(1-\\theta)}}\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,1).\\qquad(5)$$

Trois façons de s’en servir donnent trois intervalles : **Wilson** (résoudre l’inégalité en $\\theta$, Ex. 1.11), **Wald** (remplacer $\\theta(1-\\theta)$ par $\\bar X_n(1-\\bar X_n)$, Slutsky, Ex. 1.12), **stabilisation de la variance** ($g=\\arcsin\\sqrt\\cdot$, Ex. 1.13). Même trilogie pour l’exponentielle (PC6 Ex. 1 Q4 : inversion, Slutsky, $g=\\ln$).`,
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-11',
        title: 'Exemple 1.11 — Intervalle de Wilson (inversion directe du pivot)',
        source: 'Poly ch.6, Ex. 1.11, p. 29',
        setup: 'Modèle de Bernoulli, pivot (5), $z:=z_{1-\\alpha/2}$. Région de confiance de niveau asymptotique $1-\\alpha$ associée au pivot.',
        steps: [
          { text: '$\\Big\\{\\theta:\\ -z\\le\\sqrt n\\,\\frac{\\bar X_n-\\theta}{\\sqrt{\\theta(1-\\theta)}}\\le z\\Big\\}=\\big\\{\\theta:\\ n(\\bar X_n-\\theta)^2\\le z^2\\theta(1-\\theta)\\big\\}$.', justification: 'Élévation au carré : $|u|\\le z\\iff u^2\\le z^2$ pour $z\\ge0$.' },
          { text: 'La condition s’écrit $(n+z^2)\\theta^2-(2n\\bar X_n+z^2)\\theta+n\\bar X_n^2\\le0$ : trinôme en $\\theta$ de coefficient dominant $>0$.', justification: 'Développement et regroupement.' },
          { text: 'Discriminant $(2n\\bar X_n+z^2)^2-4(n+z^2)n\\bar X_n^2=4nz^2\\bar X_n(1-\\bar X_n)+z^4\\ge0$.', justification: 'Calcul direct.' },
          { text: 'Ensemble solution : le segment entre les racines, $\\Bigg[\\bar X_n+\\frac{z^2}{2n}\\pm z\\sqrt{\\frac{\\bar X_n(1-\\bar X_n)}n+\\frac{z^2}{4n^2}}\\Bigg]\\Big(1+\\frac{z^2}n\\Big)^{-1}$, intersecté avec $\\Theta$ : c’est l’**intervalle de Wilson**.', justification: 'Racines du trinôme (division du numérateur et du dénominateur par $2n$).' },
        ],
        conclusion: 'On n’estime pas la variance : on résout l’inégalité du pivot en $\\theta$. Intervalle centré en $\\big(\\bar X_n+\\frac{z^2}{2n}\\big)/\\big(1+\\frac{z^2}n\\big)$, légèrement tiré vers $1/2$ ; il reste d’étendue $>0$ même si $\\bar X_n\\in\\{0,1\\}$ (terme $z^2/(4n^2)$).',
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-12',
        title: 'Exemple 1.12 — Intervalle de Wald (plug-in par Slutsky)',
        source: 'Poly ch.6, Ex. 1.12, p. 29–30',
        setup: 'Modèle de Bernoulli, pivot (5). Construire l’IC par remplacement de $\\theta(1-\\theta)$ par $\\bar X_n(1-\\bar X_n)$.',
        steps: [
          { text: '$W_n:=\\sqrt{\\bar X_n(1-\\bar X_n)}\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\sqrt{\\theta(1-\\theta)}>0$ ; en particulier $\\mathbb{P}_{n,\\theta}(W_n=0)\\to0$.', justification: 'LGN (Thm 1.2) et continuité de $\\theta\\mapsto\\sqrt{\\theta(1-\\theta)}$ sur $]0,1[$ (Thm 1.1).' },
          { text: '$W_n$ peut s’annuler : on pose $\\tilde G_n:=0$ si $\\bar X_n\\in\\{0,1\\}$, et $Y_n:=W_n$ sur $\\{W_n>0\\}$, $Y_n:=1$ ailleurs, de sorte que $\\mathbb{P}_{n,\\theta}(Y_n\\ne0)=1$ et $Y_n\\to\\sqrt{\\theta(1-\\theta)}$ en probabilité.', justification: 'Traitement de l’événement de probabilité $\\to0$ où le dénominateur s’annule (hypothèse de Slutsky (iii)).' },
          { text: '$\\sqrt n(\\bar X_n-\\theta)/Y_n\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,1)$, et $\\tilde G_n:=\\frac{\\sqrt n(\\bar X_n-\\theta)}{\\sqrt{\\bar X_n(1-\\bar X_n)}}$ coïncide avec cette variable hors d’un événement de probabilité $\\to0$ : même loi limite.', justification: 'Slutsky (iii), puis Remarque 2 (la différence tend vers 0 en probabilité).' },
          { text: '$|\\tilde G_n|\\le z_{1-\\alpha/2}$ se résout immédiatement : $\\bar X_n\\pm z_{1-\\alpha/2}\\frac{\\sqrt{\\bar X_n(1-\\bar X_n)}}{\\sqrt n}$, l’**intervalle de Wald**.', justification: 'C’est la Méthode 1.1 avec $v(\\theta)=\\theta(1-\\theta)$.' },
        ],
        conclusion: '**Dégénéré** si $\\bar X_n=0$ (ou 1) : intervalle réduit à $\\{0\\}$ qui ne contient pas $\\theta$. Pour $\\theta=0{,}025$, $n=100$ : $\\mathbb{P}(\\bar X_n=0)=(1-\\theta)^{100}\\approx0{,}08$ (Figures 3–4, Compléments §4.4).',
      },
      {
        kind: 'viz',
        id: 'ch6-s6-viz-wald',
        vizId: 'ch6-wald-wilson',
        caption: 'Wald, Wilson et arcsin ont le même niveau asymptotique mais des couvertures très différentes près de $\\theta=0$ (Figures 3–4 du poly, §4.4).',
      },
      {
        kind: 'viz',
        id: 'ch6-s6-viz-ic',
        vizId: 'ch6-ic-asymptotique',
        caption: 'Couverture réelle des IC asymptotiques pour une espérance : $\\sigma$ connu (Cor. 1.1), $\\sigma$ estimé (Slutsky), Student exact.',
      },
      {
        kind: 'example',
        id: 'ch6-ex-pc6-1',
        title: 'PC6 Ex. 1 — Loi exponentielle : deux estimateurs des moments et trois IC asymptotiques',
        source: 'PC6 Ex. 1 (énoncé p. 1, corrigé p. 7–10)',
        setup: '$n$-échantillons de $\\mathcal{E}(\\theta)$ (densité $\\theta e^{-\\theta x}$). Rappels : $\\mathbb{E}_\\theta[X]=1/\\theta$, $\\mathbb{E}_\\theta[X^2]=2/\\theta^2$, $\\mathrm{Var}_\\theta(X^2)=20/\\theta^4$. Estimateurs des moments $\\hat\\theta_n^{(1)}=1/\\bar X_n$ (aussi l’EMV) et $\\hat\\theta_n^{(2)}=\\sqrt{2/\\overline{X^2_n}}$ avec $\\overline{X^2_n}:=\\frac1n\\sum_iX_i^2$.',
        steps: [
          { text: '**Q2, consistance.** $\\bar X_n\\to1/\\theta$ et $\\overline{X^2_n}\\to2/\\theta^2$ en probabilité ; $\\phi_1(t)=1/t$ et $\\phi_2(t)=\\sqrt{2/t}$ sont continues sur $\\mathbb{R}_+^*$ : $\\hat\\theta_n^{(i)}\\to\\theta$.', justification: 'LGN (Thm 1.2) puis théorème de continuité (Thm 1.1).' },
          { text: '**Q2, normalité.** $\\sqrt n(\\bar X_n-1/\\theta)\\Rightarrow\\mathcal{N}(0,1/\\theta^2)$ et $\\phi_1\'(1/\\theta)=-\\theta^2$ : $\\sqrt n(\\hat\\theta_n^{(1)}-\\theta)\\Rightarrow\\mathcal{N}(0,\\theta^2)$. $\\sqrt n(\\overline{X^2_n}-2/\\theta^2)\\Rightarrow\\mathcal{N}(0,20/\\theta^4)$ et $\\phi_2\'(2/\\theta^2)^2=\\theta^6/16$ : $\\sqrt n(\\hat\\theta_n^{(2)}-\\theta)\\Rightarrow\\mathcal{N}(0,\\tfrac54\\theta^2)$.', justification: 'TCL (Thm 1.6) puis méthode-δ (Thm 1.7), dérivées évaluées **aux points limites** $1/\\theta$ et $2/\\theta^2$.' },
          { text: '**Comparaison.** $v_1(\\theta)=\\theta^2<v_2(\\theta)=\\frac54\\theta^2$ : $\\hat\\theta_n^{(1)}$ est asymptotiquement préférable ; rapport des longueurs d’IC $\\to\\sqrt{v_1/v_2}=2/\\sqrt5\\approx0{,}894$.', justification: 'Prop. 1.3.' },
          { text: '**Q3.** $\\ln p_\\theta(x)=\\ln\\theta-\\theta x$, dérivée seconde $-1/\\theta^2$ : $\\mathbb{I}_1(\\theta)=1/\\theta^2$ et $v_1(\\theta)=\\mathbb{I}_1(\\theta)^{-1}$.', justification: 'Information de Fisher par la dérivée seconde (ch.3 Prop. 1.2) ; cohérent avec ch.7 Thm 1.6.' },
          { text: '**Q4, méthode 1 (Slutsky).** $\\sqrt n(\\hat\\theta_n^{(1)})^{-1}(\\hat\\theta_n^{(1)}-\\theta)\\Rightarrow\\mathcal{N}(0,1)$, d’où l’IC $\\Big[\\hat\\theta_n^{(1)}\\big(1-\\frac{z_{1-\\alpha/2}}{\\sqrt n}\\big);\\ \\hat\\theta_n^{(1)}\\big(1+\\frac{z_{1-\\alpha/2}}{\\sqrt n}\\big)\\Big]$.', justification: 'Méthode 1.1 avec $v(\\theta)=\\theta^2$ (analogue de Wald).' },
          { text: '**Q4, méthode 2 (stabilisation de la variance).** $\\sqrt n(g(\\hat\\theta_n^{(1)})-g(\\theta))\\Rightarrow\\mathcal{N}(0,g\'(\\theta)^2\\theta^2)$ ; variance 1 pour $g=\\ln$ : $\\sqrt n(\\ln\\hat\\theta_n^{(1)}-\\ln\\theta)\\Rightarrow\\mathcal{N}(0,1)$, puis par bijection $\\Big[\\hat\\theta_n^{(1)}e^{-z_{1-\\alpha/2}/\\sqrt n};\\ \\hat\\theta_n^{(1)}e^{z_{1-\\alpha/2}/\\sqrt n}\\Big]$.', justification: 'Méthode-δ puis inversion de $\\ln$ (analogue de l’Ex. 1.13).' },
          { text: '**Q4, méthode 3 (inversion du pivot).** $\\sqrt n(\\hat\\theta_n^{(1)}-\\theta)/\\theta\\Rightarrow\\mathcal{N}(0,1)$ ; résoudre $-z\\le\\sqrt n(\\hat\\theta_n^{(1)}/\\theta-1)\\le z$ en $\\theta$ (pour $z/\\sqrt n<1$) : $\\Bigg[\\frac{\\hat\\theta_n^{(1)}}{1+z_{1-\\alpha/2}/\\sqrt n},\\ \\frac{\\hat\\theta_n^{(1)}}{1-z_{1-\\alpha/2}/\\sqrt n}\\Bigg]$.', justification: 'Pivot exact normalisé par $\\theta$ (Ex. 1.10), analogue de Wilson.' },
        ],
        conclusion: 'Les trois IC sont de la forme $[\\hat\\theta_n^{(1)}y_{\\inf},\\hat\\theta_n^{(1)}y_{\\sup}]$ et ont le **même niveau asymptotique** ; à $x=z_{1-\\alpha/2}/\\sqrt n=0{,}196$ ($n=100$, 95 %) : $[0{,}804;1{,}196]$, $[0{,}822;1{,}217]$, $[0{,}836;1{,}244]$. Conclusion du corrigé : ici Slutsky reste préférable ; en général la méthode 2 n’introduit pas d’aléa supplémentaire mais demande de trouver et inverser $g$ ; la méthode 3 demande d’inverser une fonction.',
      },
      {
        kind: 'theorem',
        id: 'ch6-prop-1-3',
        type: 'proposition',
        label: 'Proposition 1.3',
        title: 'Comparaison d’estimateurs par la variance asymptotique',
        source: 'Poly ch.6, Prop. 1.3, p. 32',
        hypotheses: [
          '$\\hat\\theta_{n,1}$, $\\hat\\theta_{n,2}$ deux suites d’estimateurs de $\\theta$, asymptotiquement normales de variances asymptotiques $v_1$, $v_2$.',
          '$v_1$, $v_2$ **continues et strictement positives** sur $\\Theta$, avec $v_1(\\theta)<v_2(\\theta)$ pour tout $\\theta\\in\\Theta$.',
        ],
        statement: `Pour $i=1,2$, $\\mathcal{C}_{n,\\alpha}(\\hat\\theta_{n,i}):=\\Big[\\hat\\theta_{n,i}\\pm z_{1-\\alpha/2}\\sqrt{\\frac{v_i(\\hat\\theta_{n,i})}n}\\Big]$ sont des IC de niveau asymptotique $1-\\alpha$ pour $\\theta$, et pour tout $\\theta\\in\\Theta$

$$\\frac{|\\mathcal{C}_{n,\\alpha}(\\hat\\theta_{n,1})|}{|\\mathcal{C}_{n,\\alpha}(\\hat\\theta_{n,2})|}\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\sqrt{\\frac{v_1(\\theta)}{v_2(\\theta)}}<1$$

(rapport des longueurs). On dit que la précision de $\\hat\\theta_{n,1}$ est *asymptotiquement meilleure* que celle de $\\hat\\theta_{n,2}$.`,
        intuition: 'À niveau asymptotique fixé, l’estimateur de plus petite variance asymptotique donne, pour $n$ grand, un intervalle plus court d’un facteur $\\sqrt{v_1/v_2}$ ; atteindre une précision donnée demande $v_1(\\theta)/v_2(\\theta)$ fois moins d’observations. C’est le critère de l’Examen 2025 Ex. 2 Q10 ($v_{ML}=\\sigma^2<v_{Med}=\\frac\\pi2\\sigma^2$).',
        proof: [
          { text: 'Chaque $\\mathcal{C}_{n,\\alpha}(\\hat\\theta_{n,i})$ est un IC de niveau asymptotique $1-\\alpha$.', justification: 'Méthode 1.1 ($v_i$ continue, $>0$).' },
          { text: 'Longueur $2z_{1-\\alpha/2}\\sqrt{v_i(\\hat\\theta_{n,i})/n}$ ; rapport $=\\sqrt{v_1(\\hat\\theta_{n,1})/v_2(\\hat\\theta_{n,2})}$.', justification: 'Calcul direct, le facteur $2z_{1-\\alpha/2}/\\sqrt n$ se simplifie.' },
          { text: '$v_i(\\hat\\theta_{n,i})\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}v_i(\\theta)>0$.', justification: 'Consistance (normalité asymptotique) et continuité de $v_i$ (Thm 1.1).' },
          { text: 'Le rapport converge vers $\\sqrt{v_1(\\theta)/v_2(\\theta)}$.', justification: 'Continuité appliquée au couple (Prop. 2.1) et à $(u_1,u_2)\\mapsto\\sqrt{u_1/u_2}$, continue en $(v_1(\\theta),v_2(\\theta))$.' },
        ],
        pitfalls: ['Critère **ponctuel en $\\theta$** et **limite** : l’estimateur de Hodges (PC6 Ex. 6, §4.5) a une variance asymptotique partout $\\le$ celle de l’EMV, strictement meilleure en un point, mais un mauvais comportement à $n$ fixé.', 'Notation du poly : la longueur d’un intervalle est notée $|\\mathcal{C}|$.'],
      },
      {
        kind: 'theorem',
        id: 'ch6-def-1-9-11',
        type: 'definition',
        label: 'Définitions 1.9, 1.10, 1.11',
        title: 'Taille asymptotique, niveau asymptotique, suite de tests consistante',
        source: 'Poly ch.6, Déf. 1.9–1.11, p. 33',
        hypotheses: ['Test de $H_0:\\theta\\in\\Theta_0$ contre $H_1:\\theta\\in\\Theta_1$ ; suite de tests $\\{\\phi_n\\}$ de fonctions puissance $\\beta_{\\phi_n}(\\theta):=\\mathbb{P}_{n,\\theta}(\\phi_n=1)$.'],
        statement: `- **Taille asymptotique** (Déf. 1.9) : $\\displaystyle\\sup_{\\theta\\in\\Theta_0}\\limsup_{n\\to\\infty}\\beta_{\\phi_n}(\\theta)$.
- **Niveau asymptotique $\\alpha$** (Déf. 1.10) : $\\forall\\theta\\in\\Theta_0$, $\\limsup_n\\beta_{\\phi_n}(\\theta)\\le\\alpha$ (taille asymptotique $\\le\\alpha$).
- **Consistance** (Déf. 1.11) : pour tout $\\theta\\in\\Theta_1$, $\\liminf_n\\beta_{\\phi_n}(\\theta)=1$.`,
        intuition: 'Niveau asymptotique et consistance se partagent les deux hypothèses comme niveau et puissance au chapitre 4 : sur $H_0$ on borne la probabilité de rejeter à tort ; sur $H_1$ la probabilité de rejeter tend vers 1. Une suite consistante de niveau asymptotique $\\alpha$ finit par distinguer toute valeur de l’alternative — sans dire **à quel $n$**.',
        pitfalls: ['Limite **à $\\theta$ fixé** puis sup ; rien d’uniforme, rien à $n$ fixé.', 'Consistance $\\ne$ « bonne puissance à $n$ fixé » : deux suites consistantes de même niveau asymptotique peuvent se comporter très différemment (PC6 Ex. 3 ; comparaison au chapitre 7).'],
      },
      {
        kind: 'example',
        id: 'ch6-ex-1-14',
        title: 'Exemple 1.14 — Test de Student asymptotique (sans hypothèse gaussienne)',
        source: 'Poly ch.6, Ex. 1.14, p. 33–34',
        setup: `$n$-échantillons de $\\{\\mathbb{Q}_\\theta:\\theta=(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*\\}$, chaque $\\mathbb{Q}_\\theta$ **de carré intégrable**, d’espérance $\\mu$ et de variance $\\sigma^2>0$ (pas d’hypothèse gaussienne). Tester $H_0:\\mu=\\mu_0$ contre $H_1:\\mu\\ne\\mu_0$ avec

$$T_n:=\\sqrt n\\,\\frac{\\bar X_n-\\mu_0}{S_n},\\qquad S_n^2:=\\frac1{n-1}\\sum_{i=1}^n(X_i-\\bar X_n)^2,\\qquad R_{n,\\alpha}:=\\{|T_n|>z_{1-\\alpha/2}\\}.$$`,
        steps: [
          { text: '*Loi limite sous $H_0$.* $\\theta=(\\mu_0,\\sigma^2)$ : $\\frac{\\sqrt n}\\sigma(\\bar X_n-\\mu_0)\\Rightarrow\\mathcal{N}(0,1)$ et $\\sigma^{-1}S_n\\to1$ en probabilité, donc $T_n=\\frac{\\sqrt n(\\bar X_n-\\mu_0)/\\sigma}{S_n/\\sigma}\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,1)$.', justification: 'TCL ; Prop. 1.2 ($\\sigma^{-2}S_n^2\\to1$) et continuité de $u\\mapsto\\sqrt u$ ; Slutsky (iii) au quotient.' },
          { text: '*Taille asymptotique.* $\\beta_{\\phi_n}(\\theta)=\\mathbb{P}_{n,\\theta}(|T_n|>z_{1-\\alpha/2})\\to\\mathbb{P}(|U|>z_{1-\\alpha/2})=\\alpha$, $U\\sim\\mathcal{N}(0,1)$ : taille asymptotique $=\\alpha$.', justification: 'Portmanteau ($\\mathcal{N}(0,1)$ ne charge pas $\\pm z_{1-\\alpha/2}$), définition du quantile et symétrie.' },
          { text: '*Consistance : décomposition.* Pour $\\mu\\ne\\mu_0$, $T_n=\\frac{\\sqrt n(\\bar X_n-\\mu)}{S_n}+\\frac{\\sqrt n(\\mu-\\mu_0)}{S_n}$ ; la région d’acceptation s’écrit $-z_{1-\\alpha/2}-\\frac{\\sqrt n(\\mu-\\mu_0)}{S_n}\\le\\frac{\\sqrt n(\\bar X_n-\\mu)}{S_n}\\le z_{1-\\alpha/2}-\\frac{\\sqrt n(\\mu-\\mu_0)}{S_n}$.', justification: 'Centrer en la vraie valeur $\\mu$ : le premier terme converge en loi, le second part à l’infini.' },
          { text: 'Cas $\\mu-\\mu_0>0$ : pour tout $M>0$, $\\lim_n\\mathbb{P}_{n,\\theta}\\big(\\frac{\\sqrt n(\\mu-\\mu_0)}{S_n}\\ge M\\big)=1$.', justification: '$S_n\\to\\sigma>0$ en probabilité et $\\sqrt n(\\mu-\\mu_0)\\to+\\infty$.' },
          { text: 'Pour tout $M>0$ : $\\limsup_n\\mathbb{P}_{n,\\theta}(|T_n|\\le z_{1-\\alpha/2})\\le\\limsup_n\\mathbb{P}_{n,\\theta}\\big(\\frac{\\sqrt n(\\bar X_n-\\mu)}{S_n}\\le z_{1-\\alpha/2}-M\\big)=\\mathbb{P}(U\\le z_{1-\\alpha/2}-M)$.', justification: 'Inclusion d’événements (seuil auxiliaire $M$ fixe), puis convergence en loi $\\sqrt n(\\bar X_n-\\mu)/S_n\\Rightarrow\\mathcal{N}(0,1)$ et Portmanteau.' },
          { text: 'Faire $M\\to+\\infty$ : $\\lim_n\\mathbb{P}_{n,\\theta}(|T_n|\\le z_{1-\\alpha/2})=0$, soit $\\lim_n\\beta_{\\phi_n}(\\theta)=1$. Cas $\\mu-\\mu_0<0$ : symétrique.', justification: 'Double passage à la limite : d’abord en $n$ (à $M$ fixé), puis en $M$.' },
        ],
        conclusion: 'La loi limite $\\mathcal{N}(0,1)$ est la même pour **toutes** les lois de carré intégrable. **Piège** : la consistance ne s’obtient pas en remplaçant $T_n$ par sa loi limite — sous $H_1$ la loi de $T_n$ se déplace vers l’infini et les bornes de la région d’acceptation bougent avec $n$ ; d’où le seuil $M$ et les deux passages à la limite. Même soin pour le test du signe (PC6 Ex. 3).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 7. Méthodes types et « À l'examen »
  // -------------------------------------------------------------------------
  {
    id: 'ch6-s7-examen',
    title: '7. Méthodes types et « À l’examen »',
    role: 'liens-examen',
    intro:
      'Le chapitre 6 est le cœur du problème d’estimation de l’examen (≈ 18 % des points en 2025, DIAGNOSTIC §8). La méthode est **toujours la même** : il faut savoir l’écrire vite et en citant les théorèmes **avec leurs hypothèses**.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch6-meth-chaine',
        type: 'methode',
        label: 'Méthode type',
        title: 'La chaîne complète : consistance → normalité asymptotique → IC asymptotique',
        source: 'Synthèse du poly ch.6 (Thm 1.1, 1.2, 1.6, 1.7, Lemme 1.1, Méthode 1.1) ; DIAGNOSTIC §5.8–5.10',
        statement: `1. **Écrire l’estimateur comme fonction d’une moyenne empirique** : $\\hat\\theta_n=\\varphi(\\bar T_n)$ avec $\\bar T_n=\\frac1n\\sum_iT(X_i)$ et $e(\\theta):=\\mathbb{E}_\\theta[T(X)]$, $\\varphi=e^{-1}$ (ou tout EMV explicite : $1/\\bar X_n$, $2/\\bar X_n$, $e^{-\\bar X_n}$…).
2. **Consistance** : « $T(X_i)$ est de carré intégrable ; par la LGN (Thm 1.2), $\\bar T_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}e(\\theta)$ ; $\\varphi$ est continue en $e(\\theta)$ ; par le théorème de continuité (Thm 1.1), $\\hat\\theta_n\\to\\theta$ ». Variantes : EQM $\\to0$ + Markov (Prop. 2.2) ; « asymptotiquement normal $\\Rightarrow$ consistant ».
3. **Normalité asymptotique** : « par le TCL (Thm 1.6), $\\sqrt n(\\bar T_n-e(\\theta))\\Rightarrow\\mathcal{N}(0,\\sigma_T^2(\\theta))$ ; $\\varphi$ est dérivable en $e(\\theta)$ avec $\\dot\\varphi(e(\\theta))\\ne0$ ; par la méthode-δ (Thm 1.7), $\\sqrt n(\\hat\\theta_n-\\theta)\\Rightarrow\\mathcal{N}(0,v(\\theta))$, $v(\\theta)=\\dot\\varphi(e(\\theta))^2\\sigma_T^2(\\theta)$ ». Vectoriel : TCL multivarié sur $W_i$, covariance $\\Sigma$ terme à terme, jacobienne $J_g$, $J_g\\Sigma J_g^\\top$ (Thm 1.8).
4. **Termes négligeables** (variance empirique, $S_n^2/n$…) : Slutsky / Remarque 2.
5. **IC asymptotique** : « $v$ est continue et $>0$ ; $v(\\hat\\theta_n)\\to v(\\theta)$ (continuité) ; par Slutsky (iii), $\\sqrt n(\\hat\\theta_n-\\theta)/\\sqrt{v(\\hat\\theta_n)}\\Rightarrow\\mathcal{N}(0,1)$ ; par Portmanteau, $[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\sqrt{v(\\hat\\theta_n)/n}]$ est de niveau **asymptotique** $1-\\alpha$ » (Méthode 1.1).
6. **Comparaison** : variances asymptotiques, Prop. 1.3 ; rappeler $v_{EMV}=1/\\mathbb{I}(\\theta)$ (ch.7) et discuter robustesse / queues lourdes.`,
        intuition: 'Chaque étape vaut des points : nommer le théorème, vérifier l’hypothèse clé (moment d’ordre 2, continuité au point limite, dérivée non nulle au point limite, limite constante pour Slutsky), écrire la conclusion avec la notation du poly.',
        pitfalls: ['Dérivée évaluée au mauvais point ; oubli du carré ; $v(\\theta)$ confondu avec $\\mathrm{Var}(\\hat\\theta_n)$ ; Slutsky sans limite constante ; « niveau asymptotique » oublié.'],
      },
      {
        kind: 'text',
        id: 'ch6-s7-exam2025',
        title: 'Ce qui est tombé — Examen 2025 Ex. 2 Q6–Q10 (modèle log-normal, ≈ 3,5 pts)',
        text: `- **Q6 Consistance** de $(\\hat\\mu_{ML},\\widehat{\\sigma^2}_{ML})$ : LGN sur $Y_i$ et $Y_i^2$, continuité de $(u,w)\\mapsto w-u^2$ (Prop. 1.2), Prop. 2.1 pour le couple.
- **Q7 Normalité asymptotique du vecteur** : décomposition de la variance empirique (éq. (2)), $W_i=(Y_i-\\mu,(Y_i-\\mu)^2-\\sigma^2)$, $\\Sigma=\\mathrm{diag}(\\sigma^2,2\\sigma^4)$ avec $\\mathrm{Var}(\\xi^2)=2$, TCL multivarié, Slutsky pour $\\sqrt n(\\bar Y_n-\\mu)^2\\to0$ (traité en §4).
- **Q8 Médiane** : $\\hat\\mu_{Med}=\\ln\\tilde X_n$, TCL du quantile empirique (rappelé) avec $\\alpha=1/2$, $f(\\mu)=1/\\sqrt{2\\pi\\sigma^2}$ : $\\sqrt n(\\hat\\mu_{Med}-\\mu)\\Rightarrow\\mathcal{N}(0,\\frac\\pi2\\sigma^2)$, $C=\\pi/2\\approx1{,}57$ (variante : méthode-δ avec $\\ln$, dérivée $e^{-\\mu}$).
- **Q9(b)** TCL multivarié sur $(X_i,X_i^2)$ : $\\Sigma_{11}=m_2-m_1^2$, $\\Sigma_{12}=m_3-m_1m_2$, $\\Sigma_{22}=m_4-m_2^2$ (moment d’ordre 4 fini requis).
- **Q9(c)** Méthode-δ vectorielle (Thm 1.8) : $\\hat\\mu_{Mom}=g(\\hat m_1,\\hat m_2)$, $g(a,b)=2\\ln a-\\frac12\\ln b$, $\\nabla g=(2/m_1,-1/(2m_2))$, $v_{Mom}=4(e^{\\sigma^2}-1)-2(e^{2\\sigma^2}-1)+\\frac14(e^{4\\sigma^2}-1)=\\sigma^2+\\frac23\\sigma^6+\\dots$
- **Q10 Comparaison** (Prop. 1.3) : $v_{ML}=\\sigma^2$ (borne de Cramér-Rao, EMV asymptotiquement efficace) $<v_{Med}=\\frac\\pi2\\sigma^2$ ; $v_{Mom}\\approx\\sigma^2$ pour $\\sigma\\to0$ mais explose comme $\\frac14e^{4\\sigma^2}$ pour $\\sigma\\to\\infty$ (queues lourdes de la log-normale) ; la médiane est robuste (pas d’hypothèse de moment).

**Rédaction attendue** : chaque convergence avec sa flèche du poly et le théorème cité ; les hypothèses vérifiées en une phrase (« moments d’ordre 4 finis car la log-normale a des moments de tous ordres »).`,
      },
      {
        kind: 'text',
        id: 'ch6-s7-cc2022',
        title: 'Ce qui est tombé — CC 2022 Ex. 2 Q5–7 (deux estimateurs de μ², modèle gaussien)',
        text: `$T_{1,n}=\\bar X_n^2$, $T_{2,n}=\\bar X_n^2-\\frac1nS_n^2$.

- **Q5 Consistance** : $\\mathbb{P}(|T_{1,n}-\\mu^2|\\ge\\varepsilon)\\le\\varepsilon^{-2}\\mathbb{E}[(T_{1,n}-\\mu^2)^2]\\to0$ (Markov, risque $\\to0$) ; $S_n^2\\to\\sigma^2$ (LGN) donc $S_n^2/n\\to0$ ; Slutsky : $T_{2,n}\\to\\mu^2$.
- **Q6, $\\mu\\ne0$** : TCL $\\sqrt n(\\bar X_n-\\mu)\\Rightarrow\\mathcal{N}(0,\\sigma^2)$ ; méthode-δ avec $g(x)=x^2$, $g'(\\mu)=2\\mu\\ne0$ : $\\sqrt n(T_{1,n}-\\mu^2)\\Rightarrow\\mathcal{N}(0,4\\mu^2\\sigma^2)$ ; $\\sqrt n(T_{2,n}-\\mu^2)=\\sqrt n(T_{1,n}-\\mu^2)-S_n^2/\\sqrt n$, second terme $\\to0$ en probabilité : même limite (Slutsky).
- **Q7, $\\mu=0$** : $g'(0)=0$, la méthode-δ **dégénère** ; à l’échelle $n$ : $nT_{1,n}=\\big(\\frac1{\\sqrt n}\\sum X_i\\big)^2\\sim\\sigma^2\\chi^2(1)$ exactement, et $nT_{2,n}=nT_{1,n}-S_n^2\\Rightarrow\\sigma^2(\\chi^2(1)-1)$ par Slutsky. Commentaire attendu : la vitesse passe à $1/n$, la loi limite n’est plus gaussienne, $T_{2,n}$ est centré en loi limite alors que $T_{1,n}$ reste positif.

C’est l’Ex. 1.8 du poly. L’examen blanc du site (DIAGNOSTIC §9) recommande d’inclure une question de méthode-δ dégénérée.`,
      },
      {
        kind: 'text',
        id: 'ch6-s7-pieges',
        title: 'Pièges relevés dans les annales et les corrigés (DIAGNOSTIC §6)',
        text: `- **Méthode-δ dégénérée** : si $g'(\\theta)=0$, la vitesse n’est plus $\\sqrt n$ et la loi limite n’est plus gaussienne ($\\chi^2$) ; réécrire explicitement.
- **Slutsky** demande une limite **constante** pour l’un des deux termes ; la convergence en loi jointe ne découle pas des convergences marginales en général.
- **Méthode des moments à deux paramètres** : la variance asymptotique se calcule par la méthode-δ **vectorielle** (jacobienne, pas une simple dérivée).
- **Interprétation d’un IC** : la probabilité porte sur l’intervalle aléatoire, pas sur $\\theta$ ; niveau asymptotique $\\ne$ couverture à $n$ fini (Wald vs Wilson).
- **Variance asymptotique $v(\\theta)$** : c’est la variance de la loi limite de $\\sqrt n(\\hat\\theta_n-\\theta)$, pas celle de $\\hat\\theta_n$ ; pour l’EMV d’un modèle régulier, $v=1/\\mathbb{I}(\\theta)$, l’inverse de l’information d’**une** observation.
- **Hypothèse du TCL** : moment d’ordre 2 ; pour la variance empirique, moment d’ordre 4 ; pour $(X_i,X_i^2)$, $m_4<\\infty$.
- **Dérivée au bon point** : $\\dot\\varphi$ évaluée au point limite de la moyenne empirique ($1/\\theta$, $2/\\theta^2$…), pas en $\\theta$.
- **Tests asymptotiques** : $H_1$ unilatérale $\\Rightarrow$ quantile $z_{1-\\alpha}$ ; la consistance exige le seuil auxiliaire $M$ et deux passages à la limite ; « $M_n\\Rightarrow\\mathcal{N}(0,1)$ sous $H_1$ » est faux (la statistique n’est pas centrée sous $H_1$).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 8. Hors programme / compléments
  // -------------------------------------------------------------------------
  {
    id: 'ch6-s8-hp',
    title: '8. Compléments (hors programme) : Slutsky vectoriel, lois des grands nombres, Berry-Esseen, Wald/Wilson, Hodges',
    role: 'complements',
    scope: 'hors-programme',
    intro: 'Section « 4 Les compléments » du poly (p. 43–46) : « Les contenus de cette partie ne sont pas exigibles. » Résumés concis, utiles pour comprendre les limites des résultats du programme.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch6-thm-4-1',
        type: 'theoreme',
        label: 'Théorème 4.1',
        title: 'Opérations sur les limites, cas vectoriel (Slutsky vectoriel)',
        source: 'Poly ch.6, Compléments, Thm 4.1, p. 43',
        scope: 'hors-programme',
        hypotheses: ['$X_n$, $Y_n$ sur $(\\mathsf{Z}_n,\\mathcal{Z}_n,\\mathbb{P}_n)$ à valeurs dans $\\mathbb{R}^d$, $\\mathbb{R}^p$ ; $X\\sim\\mu$.'],
        statement: `- (i) Si $d=p$, $X_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$ et $X_n-Y_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0$, alors $Y_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$.
- (ii) Si $c\\in\\mathbb{R}^p$, $X_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu$ et $Y_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}c$, alors $(X_n,Y_n)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mu\\otimes\\delta_c$.
- En particulier, si $A_n$ sont des matrices aléatoires $m\\times d$ avec $A_n\\xrightarrow{\\mathbb{P}_n\\text{-prob}}A$ déterministe, alors $A_nX_n\\overset{\\mathbb{P}_n}{\\Longrightarrow}AX$.`,
        intuition: 'Même preuve que le Lemme 1.1 (seules des normes interviennent ; Lévy en dimension $d+p$). Sert à la méthode-δ vectorielle et à la normalité asymptotique dans $\\mathbb{R}^\\ell$ (Examen 2025 Ex. 2 Q7).',
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-4-2-4-3',
        type: 'theoreme',
        label: 'Théorèmes 4.2 et 4.3',
        title: 'LGN faible pour variables i.i.d. intégrables ; loi forte des grands nombres',
        source: 'Poly ch.6, Compléments, Thm 4.2 et 4.3, p. 44',
        scope: 'hors-programme',
        hypotheses: ['$\\{X_k\\}$ i.i.d. réelles **intégrables** sur $(\\Omega,\\mathcal{F},\\mathbb{P})$ (pas de moment d’ordre 2 requis).'],
        statement: '**Thm 4.2 (admis, troncature)** : $\\frac1n\\sum_{k=1}^nX_k\\xrightarrow{\\mathbb{P}\\text{-prob}}\\mathbb{E}[X_1]$. **Thm 4.3 (admis, Borel-Cantelli)** : $\\mathbb{P}\\big(\\lim_n\\frac1n\\sum_{k=1}^nX_k=\\mathbb{E}[X_1]\\big)=1$. Une suite d’estimateurs convergeant p.s. vers $g(\\theta)$ pour tout $\\theta$ est dite **fortement consistante** — notion qui n’a de sens que dans le cadre du produit infini (Prop. 1.1).',
        intuition: 'Explique pourquoi la Prop. 1.2 vaut avec un simple moment d’ordre 2 (LGN sur $X_i^2$).',
      },
      {
        kind: 'theorem',
        id: 'ch6-thm-4-4',
        type: 'theoreme',
        label: 'Théorème 4.4',
        title: 'Berry-Esseen',
        source: 'Poly ch.6, Compléments, §4.3, Thm 4.4, p. 44',
        scope: 'hors-programme',
        hypotheses: ['$\\{X_k\\}$ i.i.d., $\\mathbb{E}[|X_1|^3]<\\infty$, $\\mu:=\\mathbb{E}[X_1]$, $\\sigma^2:=\\mathrm{Var}(X_1)>0$.'],
        statement: `Il existe une constante universelle $C$ telle que, pour tout $x\\in\\mathbb{R}$ et $n\\in\\mathbb{N}^*$,

$$\\Big|\\mathbb{P}\\Big(\\sqrt n\\,\\frac{\\bar X_n-\\mu}\\sigma\\le x\\Big)-\\Phi(x)\\Big|\\le\\frac C{\\sqrt n}\\,\\frac{\\mathbb{E}[|X_1-\\mu|^3]}{\\sigma^3}.$$

$C=0{,}4784$ convient ; faux pour $C<0{,}4097$.`,
        intuition: 'Le TCL donne une convergence, pas une erreur d’approximation ; Berry-Esseen la contrôle : erreur en $1/\\sqrt n$, constante grande pour des lois très dissymétriques (Bernoulli avec $\\theta$ près de 0 : $\\mathbb{E}[|X_1-\\theta|^3]/\\sigma^3\\to\\infty$).',
      },
      {
        kind: 'text',
        id: 'ch6-s8-wald-wilson',
        title: '§4.4 — L’intervalle de Wilson et l’intervalle de Wald',
        scope: 'hors-programme',
        text: 'Même niveau asymptotique, comportements différents à $n$ fini. $n=100$, cinquante échantillons : pour $\\theta=0{,}25$ les intervalles sont pratiquement confondus (couverture proche de $0{,}95$) ; pour $\\theta=0{,}025$, $\\mathbb{P}(\\text{aucun succès})=(1-\\theta)^{100}\\approx0{,}08$, alors $\\bar X_n=0$ et l’intervalle de Wald est réduit à $\\{0\\}$ ; celui de Wilson reste d’étendue $>0$. Explication : l’approximation gaussienne de $\\sqrt n(\\bar X_n-\\theta)$ est mauvaise près de 0 ou 1 (Berry-Esseen) ; Wald ajoute le remplacement de $\\theta(1-\\theta)$ par $\\bar X_n(1-\\bar X_n)$, ce qui aggrave l’écart. **Wilson est en général préférable.**',
      },
      {
        kind: 'text',
        id: 'ch6-s8-hodges',
        title: '§4.5 — L’estimateur de Hodges (super-efficacité) et PC6 Ex. 6',
        scope: 'hors-programme',
        text: `Modèle gaussien $\\mathcal{N}(\\theta,1)$, $\\Theta=\\mathbb{R}$ ; EMV $\\bar X_n$, $\\sqrt n(\\bar X_n-\\theta)\\sim\\mathcal{N}(0,1)$ exactement (variance asymptotique 1 = borne de Cramér-Rao). Pour $b\\ne1$, $a_n\\to0$, $\\sqrt na_n\\to\\infty$ :

$$\\tilde\\theta_n:=\\bar X_n\\mathbb{1}_{\\{|\\bar X_n|\\ge a_n\\}}+b\\bar X_n\\mathbb{1}_{\\{|\\bar X_n|<a_n\\}},\\qquad v(\\theta)=\\begin{cases}b^2&\\text{si }\\theta=0,\\\\1&\\text{si }\\theta\\ne0.\\end{cases}$$

Preuve (PC6 Ex. 6) : en $\\theta=0$, $\\sqrt n\\tilde\\theta_n$ a la loi de $bU+(1-b)U\\mathbb{1}_{\\{|U|\\ge\\sqrt na_n\\}}$, et $U\\mathbb{1}_{\\{|U|\\ge\\sqrt na_n\\}}\\Rightarrow\\delta_0$ par convergence dominée (car $\\sqrt na_n\\to\\infty$) ; Slutsky donne $\\mathcal{N}(0,b^2)$. Pour $|b|<1$ : variance asymptotique partout $\\le1$, $<1$ en 0 — contre-exemple à une conjecture de Fisher. Mais pour $\\theta$ de l’ordre de $a_n$, l’EQM est bien plus grande que celle de $\\bar X_n$ : $\\tilde\\theta_n$ ne prend jamais de valeur dans $]ba_n,a_n[$, d’où $\\lim_n n\\,R(\\tilde\\theta_n,\\tau_n)=+\\infty$ pour $\\tau_n=(b+1)a_n/2\\to0$. Le critère de la Prop. 1.3 (ponctuel, limite) ne voit pas ce défaut ; les critères qui en rendent compte reposent sur une **uniformité en $\\theta$** et sortent du cadre du chapitre.`,
      },
    ],
  },
]
