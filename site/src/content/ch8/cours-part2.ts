import type { CourseSection } from '../types'

/** Sections 6 à 11 : règles par substitution, garantie (Prop. 1.5), outils, méthodes, examen, compléments. */
export const coursePart2: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 6. Règles par substitution
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s6-plugin',
    title: '6. Règles par substitution : LDA, QDA, logistique, linéaire gaussien',
    role: 'methodes',
    intro:
      'La loi est inconnue : on la **modélise** par une famille paramétrique, on calcule la règle bayésienne sous chaque loi du modèle, on **estime** le paramètre et on **substitue**. Trois exemples traités par le poly : analyse discriminante (linéaire et quadratique), modèle logistique, modèle linéaire gaussien.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch8-meth-1-1',
        type: 'methode',
        label: 'Méthode 1.1',
        title: 'Règle par substitution (plug-in)',
        source: 'Poly ch.8, Méthode 1.1, p. 18',
        hypotheses: ['Loi de $(\\mathbf{X},Y)$ inconnue mais supposée appartenir à un modèle paramétrique.'],
        statement: `1. **Modéliser** la loi de $(\\mathbf{X},Y)$ par un modèle paramétrique $\\{\\mathbb{P}_\\theta:\\theta\\in\\Theta\\}$.
2. **Calculer** le prédicteur bayésien $g^\\star_\\theta$ sous chacune des lois $\\mathbb{P}_\\theta$.
3. **Estimer** $\\theta$ par $\\hat\\theta_n$ à partir de l’ensemble d’apprentissage $\\mathcal{D}_n$.
4. **Choisir** la règle $\\widehat g_n:=g^\\star_{\\hat\\theta_n}$ (règle **par substitution**, ou *plug-in*).`,
        intuition: 'L’étape 2 est un calcul exact sous une loi connue (sections 2–5) ; l’étape 3 relève des chapitres 2, 3 et 7 (EMV).',
        pitfalls: ['La règle *plug-in* n’est garantie que si le modèle est **bien spécifié** (Prop. 1.5).'],
      },
      {
        kind: 'text',
        id: 'ch8-s6-deux-voies',
        title: 'Deux façons de modéliser (factorisation (2), p. 18–19)',
        text: `- Modéliser $\\mathbf{X}\\mid Y$ et $Y$ : **approche générative** — analyse discriminante linéaire et quadratique, classifieur bayésien naïf.
- Modéliser $Y\\mid\\mathbf{X}$ et $\\mathbf{X}$ : modèle logistique, modèle linéaire gaussien, algorithme des $k$ plus proches voisins.

**Encadré p. 19.** L’approche générative décrit **comment les données sont produites** (tirer une classe, puis des attributs conformes) : information riche, parfois **trop riche pour être crédible en grande dimension**. La seconde ne modélise que ce dont la règle a besoin — la probabilité de la classe à attributs donnés — et **laisse la loi des attributs libre** : dans les modèles logistique et linéaire gaussien, la loi de $\\mathbf{X}$ n’intervient **ni dans la règle bayésienne ni dans l’estimation du paramètre**.`,
      },
      {
        kind: 'theorem',
        id: 'ch8-cadre-1-2',
        type: 'definition',
        label: 'Cadre 1.2',
        title: 'Modèle de l’analyse discriminante',
        source: 'Poly ch.8, Cadre 1.2, p. 19',
        hypotheses: [
          'Classification binaire ; paramètre $\\theta=(p,\\mu_1,\\mu_{-1},\\Sigma_1,\\Sigma_{-1})$.',
          '$p\\in\\,]0,1[$, $\\mu_i\\in\\mathbb{R}^d$.',
          '$\\Sigma_i\\in\\mathrm{S}_d^+$, l’ensemble des matrices de covariance $d\\times d$ **inversibles**.',
        ],
        statement: `$$\\mathcal{L}(Y)=\\widetilde{\\mathcal{B}\\mathrm{er}}(p),\\qquad\\mathcal{L}(\\mathbf{X}\\mid Y=i)=q_{i,\\theta}\\cdot\\mathrm{Leb}=\\mathcal{N}(\\mu_i,\\Sigma_i),\\quad i\\in\\{-1,1\\},$$

$$q_{i,\\theta}(\\mathbf{x})=\\frac{1}{(2\\pi)^{d/2}\\sqrt{\\det\\Sigma_i}}\\exp\\Big(-\\frac12(\\mathbf{x}-\\mu_i)^\\top\\Sigma_i^{-1}(\\mathbf{x}-\\mu_i)\\Big).$$`,
        intuition: 'Chaque classe est un « nuage » gaussien : approche générative.',
        pitfalls: ['L’**inversibilité** est nécessaire : sinon la loi conditionnelle est portée par un sous-espace affine strict et n’a pas de densité par rapport à Lebesgue (Outils §2.8). Elle donne $q_{i,\\theta}>0$ partout, donc $p_{\\mathbf{X}}>0$ partout : $\\eta_\\theta$ est **définie partout**.'],
      },
      {
        kind: 'theorem',
        id: 'ch8-eq-10-11',
        type: 'proposition',
        label: 'Éq. (10)–(11)',
        title: 'Règle bayésienne de l’analyse discriminante : LDA et QDA',
        source: 'Poly ch.8, éq. (10)–(11), p. 19–20 ; PC8 Ex. 3 Q1–Q2',
        hypotheses: ['Cadre 1.2.'],
        statement: `$g^\\star_\\theta(\\mathbf{x})=1\\iff p\\,q_{1,\\theta}(\\mathbf{x})\\ge(1-p)\\,q_{-1,\\theta}(\\mathbf{x})\\iff\\phi_\\theta(\\mathbf{x})\\ge0$, où

$$\\begin{aligned}\\phi_\\theta(\\mathbf{x})&:=\\log\\frac{p\\,q_{1,\\theta}(\\mathbf{x})}{(1-p)\\,q_{-1,\\theta}(\\mathbf{x})}\\\\&=\\log\\frac p{1-p}+\\frac12\\log\\frac{\\det\\Sigma_{-1}}{\\det\\Sigma_1}-\\frac12(\\mathbf{x}-\\mu_1)^\\top\\Sigma_1^{-1}(\\mathbf{x}-\\mu_1)+\\frac12(\\mathbf{x}-\\mu_{-1})^\\top\\Sigma_{-1}^{-1}(\\mathbf{x}-\\mu_{-1}),\\end{aligned}$$

et $\\eta_\\theta(\\mathbf{x})=\\mathrm{sigm}(\\phi_\\theta(\\mathbf{x}))$. $\\phi_\\theta$ est un polynôme de degré $\\le2$, de terme quadratique $-\\frac12\\mathbf{x}^\\top(\\Sigma_1^{-1}-\\Sigma_{-1}^{-1})\\mathbf{x}$ :

- **$\\Sigma_1=\\Sigma_{-1}=\\Sigma$ (LDA)** : $\\phi_\\theta(\\mathbf{x})=\\mathbf{w}_\\theta^\\top\\mathbf{x}+A_\\theta$, $\\mathbf{w}_\\theta=\\Sigma^{-1}(\\mu_1-\\mu_{-1})$, $A_\\theta=\\log\\frac p{1-p}-\\frac12(\\mu_1^\\top\\Sigma^{-1}\\mu_1-\\mu_{-1}^\\top\\Sigma^{-1}\\mu_{-1})$ : frontière **hyperplan affine** de vecteur normal $\\mathbf{w}_\\theta$ ;
- **$\\Sigma_1\\neq\\Sigma_{-1}$ (QDA)** : frontière **quadrique** (ellipsoïde, paraboloïde ou hyperboloïde selon les signes des valeurs propres de $\\Sigma_1^{-1}-\\Sigma_{-1}^{-1}$).`,
        intuition: 'Même covariance : les nuages ne diffèrent que par leur centre, la frontière est plane. Covariances différentes : frontière courbe.',
        proof: [
          { text: '(10) $\\iff\\phi_\\theta(\\mathbf{x})\\ge0$.', justification: 'Formule (9) ; les deux membres sont **strictement positifs**, le logarithme est strictement croissant.' },
          { text: '$\\log q_{i,\\theta}(\\mathbf{x})=-\\frac d2\\log(2\\pi)-\\frac12\\log\\det\\Sigma_i-\\frac12(\\mathbf{x}-\\mu_i)^\\top\\Sigma_i^{-1}(\\mathbf{x}-\\mu_i)$ ; dans la différence, $\\frac d2\\log(2\\pi)$ disparaît et il reste $\\frac12\\log\\frac{\\det\\Sigma_{-1}}{\\det\\Sigma_1}$ : c’est (11).', justification: 'Densité du vecteur gaussien (Outils §2.8).' },
          { text: '$\\eta_\\theta=\\frac1{1+\\frac{(1-p)q_{-1,\\theta}}{p\\,q_{1,\\theta}}}=\\frac1{1+e^{-\\phi_\\theta}}=\\mathrm{sigm}(\\phi_\\theta)$ : $\\phi_\\theta$ est le **logit** de $\\eta_\\theta$.', justification: 'Prop. 1.4 et Outils §2.9.' },
          { text: 'Si $\\Sigma_1=\\Sigma_{-1}=\\Sigma$ : $-\\frac12(\\mathbf{x}-\\mu_1)^\\top\\Sigma^{-1}(\\mathbf{x}-\\mu_1)+\\frac12(\\mathbf{x}-\\mu_{-1})^\\top\\Sigma^{-1}(\\mathbf{x}-\\mu_{-1})=\\mathbf{x}^\\top\\Sigma^{-1}(\\mu_1-\\mu_{-1})-\\frac12(\\mu_1^\\top\\Sigma^{-1}\\mu_1-\\mu_{-1}^\\top\\Sigma^{-1}\\mu_{-1})$ et $\\log\\frac{\\det\\Sigma}{\\det\\Sigma}=0$.', justification: 'Développement des formes quadratiques ; les termes en $\\mathbf{x}^\\top\\Sigma^{-1}\\mathbf{x}$ se simplifient ; symétrie de $\\Sigma^{-1}$.' },
        ],
        pitfalls: [
          'Le milieu $\\frac{\\mu_1+\\mu_{-1}}2$ est sur la frontière LDA **seulement si $p=1/2$** : le terme $\\log\\frac p{1-p}$ translate l’hyperplan parallèlement à lui-même.',
          '$\\mathbf{w}_\\theta=\\Sigma^{-1}(\\mu_1-\\mu_{-1})$ n’est colinéaire à $\\mu_1-\\mu_{-1}$ que si $\\Sigma\\propto\\mathrm{I}$ (alors la frontière est la médiatrice de $[\\mu_{-1},\\mu_1]$ quand $p=1/2$).',
          'Ne pas oublier $\\frac12\\log(\\det\\Sigma_{-1}/\\det\\Sigma_1)$ en QDA.',
        ],
      },
      {
        kind: 'text',
        id: 'ch8-s6-estimation-lda',
        title: 'Étapes 3–4 pour l’analyse discriminante : EMV et substitution (p. 20 ; PC8 Ex. 3 Q3–Q7)',
        text: `On estime $\\theta$ par **maximum de vraisemblance** sur $\\mathcal{D}_n$ ; la log-vraisemblance se **sépare** en un terme en $p$, un terme en $(\\mu_1,\\Sigma_1)$ et un terme en $(\\mu_{-1},\\Sigma_{-1})$. Avec $N_i=\\sum_k\\mathbb{1}_{\\{Y_k=i\\}}$ :

- $\\widehat p_n=\\frac{N_1}n$ (proportion d’individus de la classe 1) ;
- $\\widehat\\mu_{i,n}=\\frac1{N_i}\\sum_{k:Y_k=i}\\mathbf{X}_k$ (moyenne des attributs de la classe $i$) ;
- QDA : $\\widehat\\Sigma_{i,n}=\\frac1{N_i}\\sum_{k:Y_k=i}(\\mathbf{X}_k-\\widehat\\mu_{i,n})(\\mathbf{X}_k-\\widehat\\mu_{i,n})^\\top$ (covariance empirique **non corrigée** de la classe $i$) ;
- LDA : $\\widehat\\Sigma_n=\\frac1n\\sum_{k=1}^n(\\mathbf{X}_k-\\widehat\\mu_{Y_k,n})(\\mathbf{X}_k-\\widehat\\mu_{Y_k,n})^\\top=\\frac{N_{-1}}n\\widehat\\Sigma_{-1,n}+\\frac{N_1}n\\widehat\\Sigma_{1,n}$ (covariance **intra-classe poolée**, centrée sur la moyenne de **sa** classe).

**Consistance** (PC8 Ex. 3 Q5) : par la LGN, $\\frac1n\\sum_k\\mathbb{1}_{\\{Y_k=i\\}}\\to\\pi_i>0$, $\\frac1n\\sum_k\\mathbb{1}_{\\{Y_k=i\\}}\\mathbf{X}_k\\to\\pi_i\\mu_i$, $\\frac1n\\sum_k\\mathbb{1}_{\\{Y_k=i\\}}\\mathbf{X}_k\\mathbf{X}_k^\\top\\to\\pi_i(\\Sigma_i+\\mu_i\\mu_i^\\top)$ en probabilité ; quotients et produits passent à la limite par le théorème de continuité (ch.6 Th. 1.1). On retient $\\widehat g_n=g^\\star_{\\hat\\theta_n}$ : il suffit de remplacer $\\theta$ par $\\hat\\theta_n$ dans (11).

**Multi-classe** (PC8 Ex. 3 Q8, covariance commune) : $\\widehat\\pi_{j,n}$, $\\widehat\\mu_{j,n}$ comme ci-dessus et $\\widehat\\Sigma_n=\\frac1n\\sum_i(\\mathbf{X}_i-\\widehat\\mu_{Y_i,n})(\\mathbf{X}_i-\\widehat\\mu_{Y_i,n})^\\top$ ; on prédit $\\arg\\max_j\\big(\\mu_j^\\top\\Sigma^{-1}\\mathbf{x}-\\frac12\\mu_j^\\top\\Sigma^{-1}\\mu_j+\\ln\\pi_j\\big)$ (frontières par morceaux d’hyperplans).

**Lecture des Figures 3–5 / PC8 Figure 1** : LDA et QDA **ne coïncident pas** même quand les vraies covariances sont égales (les estimations diffèrent) ; quand les covariances diffèrent, QDA se comporte mieux, LDA estime un modèle faux.`,
      },
      {
        kind: 'viz',
        id: 'ch8-s6-viz-lda',
        vizId: 'ch8-lda-qda-logistique',
        caption: 'Frontières estimées des trois règles *plug-in* sur un même échantillon (moyennes estimées en étoiles) et frontière de Bayes en pointillés. Choisir « covariances différentes » ou « croix » : la LDA, mal spécifiée, se trompe beaucoup plus que la QDA.',
      },
      {
        kind: 'theorem',
        id: 'ch8-cadre-1-3',
        type: 'definition',
        label: 'Cadre 1.3',
        title: 'Modèle logistique',
        source: 'Poly ch.8, Cadre 1.3, p. 21',
        hypotheses: ['Classification binaire $Y\\in\\{-1,1\\}$ ; paramètre $\\theta\\in\\mathbb{R}^d$.', 'Loi de $\\mathbf{X}$ **quelconque** (ne dépend pas de $\\theta$).'],
        statement: `$$\\mathcal{L}(Y\\mid\\mathbf{X})=\\widetilde{\\mathcal{B}\\mathrm{er}}\\big(\\mathrm{sigm}(\\theta^\\top\\mathbf{X})\\big),\\qquad\\mathcal{L}(\\mathbf{X})\\text{ quelconque},\\qquad\\mathrm{sigm}(t)=\\frac1{1+e^{-t}}.$$

**Règle bayésienne** : $\\eta_\\theta(\\mathbf{X})=\\mathrm{sigm}(\\theta^\\top\\mathbf{X})$, donc $g^\\star_\\theta(\\mathbf{X})=1\\iff\\theta^\\top\\mathbf{X}\\ge0$ (séparation **linéaire**).

**EMV** :

$$\\widehat\\theta_{\\mathrm{MLE},n}=\\arg\\min_{\\theta\\in\\mathbb{R}^d}\\frac1n\\sum_{i=1}^n\\log\\big(1+\\exp(-Y_i\\,\\theta^\\top\\mathbf{X}_i)\\big),\\qquad(12)$$

et $\\widehat g_n(\\mathbf{X})=2\\,\\mathbb{1}_{\\{\\widehat\\theta_{\\mathrm{MLE},n}^\\top\\mathbf{X}\\ge0\\}}-1$.`,
        intuition: 'On modélise directement $\\eta$ par une sigmoïde d’une forme linéaire (Ex. 1.4). Le critère (12) est la **perte logistique** $\\ell_{\\log}(y,t)=\\log(1+e^{-yt})$ sur la classe des fonctions linéaires : la démarche par modélisation rejoint l’approche discriminative (ch.9).',
        proof: [
          { text: '$\\mathrm{sigm}$ est croissante et vaut $1/2$ en 0 : $\\mathrm{sigm}(\\theta^\\top\\mathbf{X})\\ge\\frac12\\iff\\theta^\\top\\mathbf{X}\\ge0$.', justification: 'Outils §2.9 et Th. 1.2.' },
          { text: '$\\mathbb{P}_\\theta(Y=y\\mid\\mathbf{X})=\\mathrm{sigm}(y\\,\\theta^\\top\\mathbf{X})$ pour $y\\in\\{-1,1\\}$.', justification: '$1-\\mathrm{sigm}(t)=\\mathrm{sigm}(-t)$.' },
          { text: 'Vraisemblance de $\\mathcal{D}_n$ : $\\prod_{i=1}^np_{\\mathbf{X}}(\\mathbf{X}_i)\\,\\mathrm{sigm}(Y_i\\theta^\\top\\mathbf{X}_i)$ ; le facteur $\\prod_ip_{\\mathbf{X}}(\\mathbf{X}_i)$ ne dépend pas de $\\theta$.', justification: 'Indépendance des paires ; factorisation (2) ; la loi de $\\mathbf{X}$ **se factorise**.' },
          { text: '$-\\frac1n\\log(\\cdot)=\\text{cste}+\\frac1n\\sum_i\\log(1+e^{-Y_i\\theta^\\top\\mathbf{X}_i})$ : maximiser la vraisemblance revient à minimiser (12).', justification: '$-\\log\\mathrm{sigm}(t)=\\log(1+e^{-t})$.' },
        ],
        pitfalls: ['Pas d’ordonnée à l’origine explicite : on l’obtient en ajoutant une coordonnée constante à $\\mathbf{X}$ (comparer §4.8).', 'L’$\\arg\\min$ de (12) n’a pas de forme close et peut ne pas exister si les données sont linéairement séparables (remarque hors poly).'],
      },
      {
        kind: 'theorem',
        id: 'ch8-cadre-1-4',
        type: 'definition',
        label: 'Cadre 1.4',
        title: 'Modèle linéaire gaussien homoscédastique',
        source: 'Poly ch.8, Cadre 1.4, p. 22',
        hypotheses: ['Régression ; paramètre $\\theta\\in\\mathbb{R}^d$.', 'Variance $\\sigma^2>0$ **fixée** (connue) ; loi de $\\mathbf{X}$ quelconque.'],
        statement: `$$\\mathcal{L}(Y\\mid\\mathbf{X})=\\mathcal{N}(\\theta^\\top\\mathbf{X},\\sigma^2),\\qquad\\mathcal{L}(\\mathbf{X})\\text{ quelconque}.$$

Règle bayésienne : $g^\\star_\\theta(\\mathbf{X})=\\mathbb{E}_\\theta[Y\\mid\\mathbf{X}]=\\theta^\\top\\mathbf{X}$ (Th. 1.1). EMV :

$$\\widehat\\theta_{\\mathrm{MLE},n}=\\arg\\min_{\\theta\\in\\mathbb{R}^d}\\frac1n\\sum_{i=1}^n(\\theta^\\top\\mathbf{X}_i-Y_i)^2,\\qquad\\widehat g_n(\\mathbf{X})=\\widehat\\theta_{\\mathrm{MLE},n}^\\top\\mathbf{X}.$$`,
        intuition: 'EMV gaussien = **moindres carrés** (ch.2 Ex. 1.15) : la perte des moindres carrés sur la classe des fonctions linéaires.',
        proof: [
          { text: 'Log-vraisemblance conditionnelle : $-\\frac n2\\log(2\\pi\\sigma^2)-\\frac1{2\\sigma^2}\\sum_i(Y_i-\\theta^\\top\\mathbf{X}_i)^2$, plus un terme en $p_{\\mathbf{X}}$ indépendant de $\\theta$.', justification: 'Densité gaussienne de variance connue ; factorisation (2).' },
          { text: '$\\sigma^2$ étant fixé, maximiser revient à minimiser la somme des carrés.', justification: 'Le facteur $-\\frac1{2\\sigma^2}<0$ ne dépend pas de $\\theta$.' },
        ],
        pitfalls: ['« Homoscédastique » = même variance $\\sigma^2$ quel que soit $\\mathbf{X}$.'],
      },
      {
        kind: 'text',
        id: 'ch8-s6-knn',
        title: 'Les k plus proches voisins comme règle par substitution (Examen 2025 Ex. 3 Q4–Q5)',
        text: `Le poly range les $k$ plus proches voisins parmi les méthodes qui estiment $Y\\mid\\mathbf{X}$ (p. 18). Notons $N_k(\\mathbf{x})$ les indices des $k$ points de $\\mathcal{D}_n$ les plus proches de $\\mathbf{x}$ et

$$\\hat\\eta_{n,k}(\\mathbf{x})=\\frac1k\\sum_{i\\in N_k(\\mathbf{x})}\\mathbb{1}_{\\{Y_i=1\\}}.$$

La règle des $k$-PPV (vote majoritaire) prédit 1 ssi au moins la moitié des $k$ voisins ont $Y_i=1$, ssi $\\hat\\eta_{n,k}(\\mathbf{x})\\ge1/2$ : **c’est le plug-in de $\\hat\\eta_{n,k}$**. La frontière est non linéaire, par morceaux. Le choix de $k$ règle un compromis : $k$ petit, faible biais mais forte variance (erreur d’apprentissage nulle pour $k=1$, sur-apprentissage) ; $k$ grand, règle trop lisse (Examen 2025 Q8–Q9, ch.9).`,
      },
      {
        kind: 'viz',
        id: 'ch8-s6-viz-knn',
        vizId: 'ch8-knn',
        caption: 'Règle des $k$-PPV : frontière de décision pour le $k$ choisi, et erreurs d’apprentissage et de test en fonction de $k$ (le risque de Bayes en pointillés).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 7. Garantie : Prop. 1.5
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s7-garantie',
    title: '7. Ce que garantit la règle par substitution (Prop. 1.5)',
    role: 'preuves',
    intro:
      'Si l’on estime bien $\\eta$, la règle associée est presque aussi bonne que celle de Bayes : l’excès de risque est contrôlé par l’erreur $L^1$ sur $\\eta$. Avec un modèle bien spécifié et un estimateur consistant, l’excès de risque moyen tend vers 0. C’est la question 3 de l’Examen 2025 Ex. 3 et l’objet des PC8 Ex. 2 et 7.',
    blocks: [
      {
        kind: 'text',
        id: 'ch8-s7-proba-cond',
        title: 'Probabilité d’erreur conditionnelle (p. 22)',
        text: `$R_{01}(g)$ désigne le risque d’une règle **fixée**. Pour une règle construite sur $\\mathcal{D}_n$, on pose

$$R_{01}(\\widehat g_n):=\\mathbb{P}\\big(\\widehat g_n(\\mathbf{X})\\neq Y\\mid\\mathcal{D}_n\\big),$$

où $(\\mathbf{X},Y)$ est un couple **indépendant de $\\mathcal{D}_n$ et de même loi** : c’est une **variable aléatoire, fonction de $\\mathcal{D}_n$** (calculée en « gelant » $\\mathcal{D}_n$ grâce à la Prop. 2.5). Le **risque moyen** est $\\mathbb{E}[R_{01}(\\widehat g_n)]=\\mathbb{P}(\\widehat g_n(\\mathbf{X})\\neq Y)$, moyenne sur les deux aléas.`,
      },
      {
        kind: 'theorem',
        id: 'ch8-maj-13',
        type: 'lemme',
        label: 'Majoration (13)',
        title: 'Excès de risque d’une règle construite sur un η approché',
        source: 'Poly ch.8, éq. (13), p. 22 ; Compléments Prop. 4.2, p. 39–40 ; PC8 Ex. 2 Q4 et Ex. 7',
        hypotheses: [
          '$\\eta^\\star$ vraie fonction de régression, $g^\\star=2\\,\\mathbb{1}_{\\{\\eta^\\star\\ge1/2\\}}-1$.',
          '$\\tilde\\eta:\\mathsf{X}\\to[0,1]$ mesurable quelconque et $\\tilde g=2\\,\\mathbb{1}_{\\{\\tilde\\eta\\ge1/2\\}}-1$ (**même seuil $1/2$**).',
        ],
        statement: `$$\\begin{aligned}R_{01}(\\tilde g)-R_{01}(g^\\star)&=2\\,\\mathbb{E}\\big[\\mathbb{1}_{\\{\\tilde g(\\mathbf{X})\\neq g^\\star(\\mathbf{X})\\}}\\,|\\eta^\\star(\\mathbf{X})-\\tfrac12|\\big]\\\\&\\le2\\,\\mathbb{E}\\big[|\\eta^\\star(\\mathbf{X})-\\tilde\\eta(\\mathbf{X})|\\,\\mathbb{1}_{\\{\\tilde g\\ne g^\\star\\}}\\big]\\le2\\,\\mathbb{E}\\big[|\\eta^\\star(\\mathbf{X})-\\tilde\\eta(\\mathbf{X})|\\big],\\end{aligned}$$

l’espérance portant sur le seul couple de test $(\\mathbf{X},Y)$.`,
        intuition: 'Pour que $\\tilde g$ et $g^\\star$ décident différemment en $\\mathbf{x}$, il faut que $\\tilde\\eta(\\mathbf{x})$ et $\\eta^\\star(\\mathbf{x})$ soient de part et d’autre de $1/2$ : la distance de $\\eta^\\star$ à $1/2$ est alors plus petite que la distance de $\\eta^\\star$ à $\\tilde\\eta$.',
        proof: [
          { text: 'Égalité : formule (4) du Th. 1.2 avec $|2\\eta^\\star(\\mathbf{X})-1|=2|\\eta^\\star(\\mathbf{X})-\\frac12|$.', justification: 'Th. 1.2 appliqué à $g=\\tilde g$.' },
          { text: '$\\{\\tilde g\\neq g^\\star\\}$ est la réunion disjointe de $\\{\\eta^\\star\\ge\\frac12,\\ \\tilde\\eta<\\frac12\\}$ et $\\{\\eta^\\star<\\frac12,\\ \\tilde\\eta\\ge\\frac12\\}$.', justification: 'Le **même seuil** $1/2$ est appliqué à $\\eta^\\star$ et à $\\tilde\\eta$.' },
          { text: 'Sur le premier : $|\\eta^\\star-\\frac12|=\\eta^\\star-\\frac12\\le\\eta^\\star-\\tilde\\eta=|\\eta^\\star-\\tilde\\eta|$ car $\\tilde\\eta<\\frac12\\le\\eta^\\star$. Sur le second : $|\\eta^\\star-\\frac12|=\\frac12-\\eta^\\star\\le\\tilde\\eta-\\eta^\\star=|\\eta^\\star-\\tilde\\eta|$.', justification: 'Disjonction de cas.' },
          { text: 'Donc $\\mathbb{1}_{\\{\\tilde g\\ne g^\\star\\}}|\\eta^\\star-\\frac12|\\le\\mathbb{1}_{\\{\\tilde g\\ne g^\\star\\}}|\\eta^\\star-\\tilde\\eta|\\le|\\eta^\\star-\\tilde\\eta|$ ; on prend l’espérance et on multiplie par 2. □', justification: 'Croissance de l’espérance ; indicatrice $\\le1$, intégrande positif.' },
        ],
        pitfalls: ['L’inégalité $|\\eta^\\star-\\frac12|\\le|\\eta^\\star-\\tilde\\eta|$ n’est vraie **que sur $\\{\\tilde g\\neq g^\\star\\}$** (ex. $\\eta^\\star=0{,}9$, $\\tilde\\eta=0{,}8$ : $0{,}4>0{,}1$).', 'Fausse si $\\tilde g$ seuille $\\tilde\\eta$ à un autre niveau que $1/2$.', 'Dans PC8 Ex. 7, $\\eta$ désigne la fonction **approchée** et $\\eta^\\star$ la vraie (énoncé ambigu).'],
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-1-5',
        type: 'proposition',
        label: 'Proposition 1.5',
        title: 'Risque d’une règle par substitution',
        source: 'Poly ch.8, Prop. 1.5, p. 22–23 ; PC8 Ex. 2 Q5',
        hypotheses: [
          '(i) Modèle **bien spécifié** : $\\{\\mathbb{P}_\\theta:\\theta\\in\\Theta\\}$ modèle de classification binaire, $\\theta^\\star\\in\\Theta$, la loi de $(\\mathbf{X},Y)$ et celle des $n$ paires de $\\mathcal{D}_n$ sont données par $\\mathbb{P}_{\\theta^\\star}$ ; $\\mathbb{E}_{n,\\theta^\\star}$ espérance sous la loi de $\\mathcal{D}_n$.',
          '(ii) $\\eta_\\theta$ fonction de régression sous $\\mathbb{P}_\\theta$, $g^\\star_\\theta=2\\,\\mathbb{1}_{\\{\\eta_\\theta\\ge1/2\\}}-1$.',
          '(iii) $\\eta_{\\hat\\theta_n}(\\mathbf{x})-\\eta_{\\theta^\\star}(\\mathbf{x})\\xrightarrow{\\mathbb{P}_{n,\\theta^\\star}\\text{-prob}}0$ pour $p_{\\mathbf{X}}\\cdot\\mu$-presque tout $\\mathbf{x}$.',
        ],
        statement: `La règle par substitution $\\widehat g_n:=g^\\star_{\\hat\\theta_n}$ vérifie

$$\\lim_{n\\to\\infty}\\mathbb{E}_{n,\\theta^\\star}\\big[R_{01}(\\widehat g_n)-R_{01}(g^\\star_{\\theta^\\star})\\big]=0.$$`,
        intuition: '« Si le modèle est bon, la méthode est bonne. » L’excès de risque est contrôlé par l’erreur d’estimation de $\\eta$ en norme $L^1(p_{\\mathbf{X}}\\cdot\\mu)$. Si $\\hat\\theta_n$ est consistant et $\\theta\\mapsto\\eta_\\theta(\\mathbf{x})$ continue, (iii) est satisfaite (analyse discriminante, PC8 Ex. 3 Q6).',
        proof: [
          { text: 'À $\\mathcal{D}_n$ fixé, avec $\\tilde\\eta=\\eta_{\\hat\\theta_n}$ : $0\\le R_{01}(\\widehat g_n)-R_{01}(g^\\star_{\\theta^\\star})\\le2\\int_{\\mathsf{X}}|\\eta_{\\theta^\\star}(\\mathbf{x})-\\eta_{\\hat\\theta_n}(\\mathbf{x})|\\,p_{\\mathbf{X}}(\\mathbf{x})\\,\\mu(\\mathrm{d}\\mathbf{x})$.', justification: 'Majoration (13) ; **indépendance** de $(\\mathbf{X},Y)$ et $\\mathcal{D}_n$ (Prop. 2.5) ; positivité car $g^\\star_{\\theta^\\star}$ est bayésienne sous $\\mathbb{P}_{\\theta^\\star}$ (Th. 1.2).' },
          { text: '$0\\le\\mathbb{E}_{n,\\theta^\\star}[R_{01}(\\widehat g_n)-R_{01}(g^\\star_{\\theta^\\star})]\\le2\\int_{\\mathsf{X}}\\mathbb{E}_{n,\\theta^\\star}\\big[|\\eta_{\\theta^\\star}(\\mathbf{x})-\\eta_{\\hat\\theta_n}(\\mathbf{x})|\\big]\\,p_{\\mathbf{X}}(\\mathbf{x})\\,\\mu(\\mathrm{d}\\mathbf{x})$.', justification: 'Espérance sous la loi de $\\mathcal{D}_n$ puis interversion, licite pour un intégrande **positif** : **Fubini-Tonelli**.' },
          { text: 'Pour $\\mathbf{x}$ hors de l’ensemble négligeable de (iii) : $\\mathbb{E}_{n,\\theta^\\star}[|\\eta_{\\theta^\\star}(\\mathbf{x})-\\eta_{\\hat\\theta_n}(\\mathbf{x})|]\\to0$.', justification: 'La suite converge vers 0 en probabilité et est **majorée par 1** (fonctions à valeurs dans $[0,1]$) : **convergence dominée pour la convergence en probabilité** (ou $\\mathbb{E}|Z_n|\\le\\mathbb{P}(|Z_n|\\ge\\varepsilon)+\\varepsilon$).' },
          { text: 'L’intégrale en $\\mathbf{x}$ tend vers 0. □', justification: 'Ces espérances sont majorées par 1 et $p_{\\mathbf{X}}\\cdot\\mu$ est une **probabilité** : **seconde convergence dominée**, en la variable $\\mathbf{x}$.' },
        ],
        pitfalls: [
          'Si le modèle est **mal spécifié**, $\\eta_{\\hat\\theta_n}$ ne converge pas vers la vraie fonction de régression et l’excès de risque **ne tend pas vers 0** (avertissement 1, p. 23).',
          'La quantité qui tend vers 0 est une moyenne sous **deux aléas** : le point de test (dans $R_{01}(\\widehat g_n)$) et l’ensemble d’apprentissage (par $\\mathbb{E}_{n,\\theta^\\star}$) — le double aléa (avertissement 2).',
          'La convergence en probabilité ponctuelle ne suffit pas seule : il faut la **bornitude** pour passer à l’espérance.',
        ],
      },
      {
        kind: 'viz',
        id: 'ch8-s7-viz-risque',
        vizId: 'ch8-risque-n',
        caption: 'Prop. 1.5 et double aléa : le risque moyen de la LDA *plug-in* tend vers $R^\\star$ si le modèle est bien spécifié, mais plafonne au-dessus s’il est mal spécifié ; l’histogramme montre que $R_{01}(\\widehat g_n)$ est une variable aléatoire.',
      },
      {
        kind: 'example',
        id: 'ch8-ex-pc8-3-q6',
        title: 'PC8 Ex. 3 Q5–Q6 — L’excès de risque de la LDA/QDA plug-in tend vers 0',
        source: 'PC8 Ex. 3 Q5–Q6 (corrigé p. 14)',
        setup: 'Données i.i.d. sous $\\mathbb{Q}_\\theta$ (modèle de l’analyse discriminante, bien spécifié), $\\tilde g_n=2\\,\\mathbb{1}_{\\{\\eta_{\\hat\\theta_n}\\ge1/2\\}}-1$ avec $\\hat\\theta_n$ l’EMV. Montrer $\\lim_n\\mathbb{E}_{n,\\theta}[R(\\tilde g_n)-R(g^\\star_\\theta)]=0$.',
        steps: [
          { text: '$\\hat\\theta_n\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\theta$.', justification: 'Q5 : LGN sur les moyennes empiriques pondérées par $\\mathbb{1}_{\\{Y_k=i\\}}$, puis théorème de continuité pour les quotients et produits.' },
          { text: 'Pour tout $\\mathbf{x}$, $\\theta\\mapsto\\phi_\\theta(\\mathbf{x})$ est continue sur $\\Theta$.', justification: '$\\Sigma\\mapsto\\Sigma^{-1}$ et $\\Sigma\\mapsto\\det\\Sigma>0$ continues sur $\\mathrm{S}_d^+$ ; $p\\mapsto\\log\\frac p{1-p}$ continue sur $]0,1[$.' },
          { text: '$\\eta_{\\hat\\theta_n}(\\mathbf{x})=\\mathrm{sigm}(\\phi_{\\hat\\theta_n}(\\mathbf{x}))\\xrightarrow{\\mathbb{P}_{n,\\theta}\\text{-prob}}\\eta_\\theta(\\mathbf{x})$ pour tout $\\mathbf{x}$.', justification: 'Théorème de continuité (ch.6 Th. 1.1) et continuité de $\\mathrm{sigm}$.' },
          { text: 'L’hypothèse (iii) de la Prop. 1.5 (= PC8 Ex. 2 Q5) est satisfaite et le modèle est bien spécifié : l’excès de risque moyen tend vers 0.', justification: 'Prop. 1.5. La valeur absolue de l’énoncé est sans effet car $R(\\tilde g_n)-R(g^\\star_\\theta)\\ge0$.' },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 8. Outils mathématiques
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s8-outils',
    title: '8. Outils : espérance conditionnelle, densités, sigmoïde',
    role: 'definitions',
    intro:
      'Les Outils (§2 du poly, p. 25–32) sont **au programme** : ils servent aux preuves des Th. 1.1, 1.2 et des Prop. 1.1, 1.4, 1.5. L’espérance conditionnelle d’une variable de carré intégrable est une **projection orthogonale** ; la définition s’étend aux variables intégrables ; dans le cas à densité, c’est une intégrale contre la densité conditionnelle.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch8-def-2-1-2-2',
        type: 'definition',
        label: 'Définitions 2.1–2.2, Théorème 2.1',
        title: 'Les espaces L² et leur structure hilbertienne',
        source: 'Poly ch.8, Outils, Déf. 2.1, Déf. 2.2, Th. 2.1, p. 25–26',
        hypotheses: ['$(\\Omega,\\mathcal{F},\\mathbb{P})$ espace de probabilité.'],
        statement: `- $\\mathcal{L}^2(\\Omega,\\mathcal{F},\\mathbb{P})$ : variables $Z$ avec $\\mathbb{E}[Z^2]<\\infty$ ; $\\langle Z_1,Z_2\\rangle:=\\mathbb{E}[Z_1Z_2]$ est **pré-hilbertien** ($\\langle Z,Z\\rangle=0$ donne seulement $Z=0$ p.s.).
- $\\mathrm{L}^2(\\Omega,\\mathcal{F},\\mathbb{P})$ : quotient par la relation $\\mathcal{R}$ « égalité $\\mathbb{P}$-p.s. » ; classes $\\dot X$ ; le produit scalaire ne dépend pas des représentants ; norme $\\|\\dot X\\|_{\\mathrm{L}^2}$.
- **Th. 2.1** : $\\mathrm{L}^2(\\Omega,\\mathcal{F},\\mathbb{P})$ est un **espace de Hilbert** (admis).`,
        intuition: 'Conformément à l’usage, on confond une variable et sa classe : toutes les identités sont entendues $\\mathbb{P}$-p.s.',
        pitfalls: ['Le poly appelle aussi « théorème 2.1 » le Théorème et définition 2.1 (espérance conditionnelle dans $L^1$) dans la preuve de la Prop. 2.3.'],
      },
      {
        kind: 'theorem',
        id: 'ch8-thm-2-2',
        type: 'theoreme',
        label: 'Théorème 2.2 et Lemme 2.1',
        title: 'Projection sur un sous-espace fermé',
        source: 'Poly ch.8, Outils, Th. 2.2 et Lemme 2.1, p. 26 (Figure 6)',
        hypotheses: ['$\\mathcal{H}$ sous-espace vectoriel **fermé** de $\\mathrm{L}^2(\\Omega,\\mathcal{F},\\mathbb{P})$, $Z\\in\\mathrm{L}^2(\\Omega,\\mathcal{F},\\mathbb{P})$.'],
        statement: `- (i) Il existe un unique $P_{\\mathcal{H}}Z\\in\\mathcal{H}$ tel que $\\|Z-P_{\\mathcal{H}}Z\\|^2_{\\mathrm{L}^2}\\le\\|Z-T\\|^2_{\\mathrm{L}^2}$ pour tout $T\\in\\mathcal{H}$.
- (ii) Il est **caractérisé** par l’orthogonalité $\\langle Z-P_{\\mathcal{H}}Z,T\\rangle=0$ pour tout $T\\in\\mathcal{H}$.
- (iii) $P_{\\mathcal{H}}$ est linéaire.

**Lemme 2.1** : pour une sous-tribu $\\mathcal{A}\\subset\\mathcal{F}$, $\\mathrm{L}^2(\\Omega,\\mathcal{A},\\mathbb{P})$ (variables $\\mathcal{A}$-mesurables de carré intégrable) est un sous-espace **fermé**. Conséquence (14) : la projection $X$ de $Z$ sur ce sous-espace est caractérisée par $\\mathbb{E}[ZT]=\\mathbb{E}[XT]$ pour tout $T\\in\\mathrm{L}^2(\\Omega,\\mathcal{A},\\mathbb{P})$.`,
        intuition: '(ii) est **Pythagore** en dimension quelconque. C’est cette relation d’orthogonalité, et non l’inégalité (i), qui sert dans les calculs : elle transforme une minimalité en une famille d’égalités $\\mathbb{E}[(Z-P_{\\mathcal{H}}Z)T]=0$. Résultats admis (§2.11).',
      },
      {
        kind: 'theorem',
        id: 'ch8-def-2-3-thdef',
        type: 'definition',
        label: 'Définition 2.3, Théorème et définition 2.1, Définition 2.4',
        title: 'Espérance conditionnelle (L², puis L¹, puis sachant X)',
        source: 'Poly ch.8, Outils, Déf. 2.3, Th.-déf. 2.1, Déf. 2.4, p. 27',
        hypotheses: ['$\\mathcal{A}\\subset\\mathcal{F}$ sous-tribu.', 'Déf. 2.3 : $Z\\in\\mathrm{L}^2$ ; Th.-déf. 2.1 : $Z\\in\\mathcal{L}^1(\\Omega,\\mathcal{F},\\mathbb{P})$.'],
        statement: `- **Déf. 2.3** : $\\mathbb{E}[Z\\mid\\mathcal{A}]$ est la projection orthogonale de $Z$ sur $\\mathrm{L}^2(\\Omega,\\mathcal{A},\\mathbb{P})$.
- **Th.-déf. 2.1** : pour $Z$ intégrable, il existe $X$, **unique p.s.**, telle que (i) $X$ est $\\mathcal{A}$-mesurable ; (ii) $\\mathbb{E}[|X|]<\\infty$ ; (iii) $\\mathbb{E}[ZT]=\\mathbb{E}[XT]$ pour toute $T$ $\\mathcal{A}$-mesurable **bornée**. On note $X=\\mathbb{E}[Z\\mid\\mathcal{A}]$ ; elle coïncide avec la projection si $Z$ est de carré intégrable (admis : classe monotone ou Radon-Nikodym).
- **Déf. 2.4** : $\\mathbb{E}[Z\\mid\\mathbf{X}]:=\\mathbb{E}[Z\\mid\\sigma(\\mathbf{X})]$, où $\\sigma(\\mathbf{X})=\\{\\mathbf{X}^{-1}(B),\\ B\\in\\mathcal{B}(\\mathbb{R}^d)\\}$.`,
        intuition: 'Meilleure approximation quadratique de $Z$ par une variable « connue quand on connaît $\\mathcal{A}$ ».',
        pitfalls: ['Dans le cas $L^1$, les fonctions tests $T$ doivent être **bornées** (pas seulement de carré intégrable).'],
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-2-1',
        type: 'proposition',
        label: 'Proposition 2.1',
        title: 'Lemme de Doob : les variables σ(X)-mesurables sont les fonctions de X',
        source: 'Poly ch.8, Outils, Prop. 2.1, p. 27–28',
        hypotheses: ['$\\mathbf{X}$ à valeurs dans $(\\mathsf{X},\\mathcal{X})$, $W$ réelle, sur $(\\Omega,\\mathcal{F},\\mathbb{P})$.'],
        statement: `$W$ est $\\sigma(\\mathbf{X})$-mesurable **si et seulement s’il existe** $\\Psi:\\mathsf{X}\\to\\mathbb{R}$ mesurable telle que $W=\\Psi(\\mathbf{X})$ (admis).

**Conséquence (p. 28) — le Th. 1.1 en une ligne** : $\\mathrm{L}^2(\\Omega,\\sigma(\\mathbf{X}),\\mathbb{P})$ s’identifie aux $g(\\mathbf{X})$ avec $\\mathbb{E}[g^2(\\mathbf{X})]<\\infty$ ; la projection donne $g^\\star$ mesurable avec $g^\\star(\\mathbf{X})=\\mathbb{E}[Y\\mid\\mathbf{X}]$, $\\mathbb{E}[(Y-g^\\star(\\mathbf{X}))^2]\\le\\mathbb{E}[(Y-g(\\mathbf{X}))^2]$ et $\\mathbb{E}[Y\\,g(\\mathbf{X})]=\\mathbb{E}[g^\\star(\\mathbf{X})\\,g(\\mathbf{X})]$.`,
        intuition: 'Être connu dès que $\\mathbf{X}$ est connu = être une fonction de $\\mathbf{X}$.',
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-2-2-2-3',
        type: 'proposition',
        label: 'Propositions 2.2 et 2.3',
        title: 'Tour et « sortir ce qui est connu »',
        source: 'Poly ch.8, Outils, Prop. 2.2 et 2.3, p. 28',
        hypotheses: ['$Y$ intégrable, $\\mathcal{A}\\subset\\mathcal{F}$ sous-tribu.', 'Prop. 2.3 : $U$ **$\\mathcal{A}$-mesurable et bornée**.'],
        statement: '**Prop. 2.2** : $\\mathbb{E}[\\mathbb{E}[Y\\mid\\mathcal{A}]]=\\mathbb{E}[Y]$. **Prop. 2.3** : $\\mathbb{E}[UY\\mid\\mathcal{A}]=U\\,\\mathbb{E}[Y\\mid\\mathcal{A}]$, $\\mathbb{P}$-p.s.',
        intuition: 'Moyenner les moyennes conditionnelles redonne la moyenne ; ce qui est connu sachant $\\mathcal{A}$ se comporte comme une constante.',
        proof: [
          { text: 'Prop. 2.2 : pour toute $W$ $\\mathcal{A}$-mesurable bornée, $\\mathbb{E}[W\\,\\mathbb{E}[Y\\mid\\mathcal{A}]]=\\mathbb{E}[WY]$ ; on prend $W=1$.', justification: 'Définition (Th.-déf. 2.1 (iii)) ; la constante 1 est $\\mathcal{A}$-mesurable et bornée.' },
          { text: 'Prop. 2.3 : $UY$ est intégrable ; pour $W$ $\\mathcal{A}$-mesurable bornée, $\\mathbb{E}[W\\,\\mathbb{E}[UY\\mid\\mathcal{A}]]=\\mathbb{E}[WUY]$.', justification: '$U$ bornée ; définition appliquée à $UY$.' },
          { text: '$\\mathbb{E}[WUY]=\\mathbb{E}[WU\\,\\mathbb{E}[Y\\mid\\mathcal{A}]]$.', justification: 'Définition appliquée à $Y$ avec le test $WU$, lui-même $\\mathcal{A}$-mesurable et borné.' },
          { text: '$\\mathbb{E}[UY\\mid\\mathcal{A}]$ et $U\\,\\mathbb{E}[Y\\mid\\mathcal{A}]$ sont $\\mathcal{A}$-mesurables, intégrables, de mêmes intégrales contre toute $W$ : elles sont égales p.s. □', justification: '**Unicité** de l’espérance conditionnelle (Th.-déf. 2.1).' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-2-4',
        type: 'proposition',
        label: 'Proposition 2.4',
        title: 'Propriétés élémentaires de l’espérance conditionnelle',
        source: 'Poly ch.8, Outils, Prop. 2.4, p. 28–29',
        hypotheses: ['$U$, $V$ de carré intégrable, à valeurs dans $\\mathbb{R}$ et $\\mathbb{R}^d$.'],
        statement: `- (i) $\\mathbb{E}[\\mathbb{E}[U\\mid V]]=\\mathbb{E}[U]$ ;
- (ii) il existe $\\Psi$ mesurable avec $\\Psi(V)=\\mathbb{E}[U\\mid V]$ p.s. ;
- (iii) **positivité** : $U\\ge0\\Rightarrow\\mathbb{E}[U\\mid V]\\ge0$ p.s. ;
- (iv) **linéarité** : $\\mathbb{E}[\\alpha U_1+\\beta U_2\\mid V]=\\alpha\\,\\mathbb{E}[U_1\\mid V]+\\beta\\,\\mathbb{E}[U_2\\mid V]$ ;
- (v) $\\mathbb{E}[\\phi(V)\\mid V]=\\phi(V)$ p.s. pour $\\phi$ mesurable avec $\\phi(V)$ de carré intégrable.`,
        intuition: 'L’espérance conditionnelle se comporte comme une espérance, les fonctions de $V$ étant traitées comme des constantes.',
        proof: [
          { text: '(i) : test constant égal à 1 dans (14).', justification: 'Caractérisation de la projection.' },
          { text: '(ii) : $\\mathbb{E}[U\\mid V]$ est $\\sigma(V)$-mesurable.', justification: 'Lemme de Doob (Prop. 2.1).' },
          { text: '(iii) : avec $T=\\mathbb{1}_{\\{\\mathbb{E}[U\\mid V]<0\\}}$, si $\\mathbb{P}(\\mathbb{E}[U\\mid V]<0)>0$ alors $\\mathbb{E}[U\\,T]=\\mathbb{E}[\\mathbb{E}[U\\mid V]\\,T]<0$, ce qui contredit $U\\ge0$.', justification: '(14) avec un test $\\sigma(V)$-mesurable borné ; raisonnement par l’absurde.' },
          { text: '(iv) : linéarité du produit scalaire et unicité de la projection ; (v) : $\\phi(V)$ appartient déjà à l’espace sur lequel on projette. □', justification: 'Th. 2.2 (ii)–(iii).' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-2-5',
        type: 'proposition',
        label: 'Proposition 2.5',
        title: 'Conditionnement et indépendance : on gèle V',
        source: 'Poly ch.8, Outils, Prop. 2.5, p. 29',
        hypotheses: ['$U$, $V$ **indépendantes**, à valeurs dans $\\mathbb{R}^p$ et $\\mathbb{R}^d$ ; $\\chi$ la loi de $U$.', '$\\phi$ mesurable avec $\\phi(U,V)$ de carré intégrable.'],
        statement: '$$\\mathbb{E}[\\phi(U,V)\\mid V]=\\Phi(V),\\qquad\\Phi(v):=\\mathbb{E}[\\phi(U,v)]=\\int\\phi(u,v)\\,\\chi(\\mathrm{d}u).$$',
        intuition: 'On **gèle** $V$ et on intègre en $U$ sous sa propre loi. C’est elle qui légitime le calcul de $R_{01}(\\widehat g_n)$ : $U$ = couple de test $(\\mathbf{X},Y)$, $V$ = ensemble d’apprentissage $\\mathcal{D}_n$ (preuve de la Prop. 1.5). Preuve non donnée dans le poly (esquisse : loi produit et Fubini).',
        pitfalls: ['L’indépendance est essentielle : si le point de test faisait partie de $\\mathcal{D}_n$, le calcul serait faux (biais d’optimisme de l’erreur d’apprentissage).'],
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-2-6',
        type: 'proposition',
        label: 'Proposition 2.6',
        title: 'Espérance conditionnelle dans le cas à densité',
        source: 'Poly ch.8, Outils, §2.5 et Prop. 2.6, p. 29–30',
        hypotheses: ['$(Y,\\mathbf{X})$ admet une densité $p_{Y,\\mathbf{X}}$ par rapport à $\\mu\\otimes\\nu$ (notations des Outils : $\\mu$ sur $\\mathsf{Y}$, $\\nu$ sur $\\mathsf{X}$).', '$Y$ (ou $\\psi(Y)$) intégrable.'],
        statement: `Avec $p_{Y|\\mathbf{X}}(y\\mid\\mathbf{x}):=p_{Y,\\mathbf{X}}(y,\\mathbf{x})/p_{\\mathbf{X}}(\\mathbf{x})$ pour $p_{\\mathbf{X}}(\\mathbf{x})>0$ (densité conditionnelle, d’intégrale 1 contre $\\mu$), la fonction $\\Phi(\\mathbf{x}):=\\int_{\\mathsf{Y}}y\\,p_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})\\,\\mu(\\mathrm{d}y)$ vérifie $\\Phi(\\mathbf{X})=\\mathbb{E}[Y\\mid\\mathbf{X}]$ p.s. Plus généralement

$$\\mathbb{E}[\\psi(Y)\\mid\\mathbf{X}]=\\Big(\\int_{\\mathsf{Y}}\\psi(y)\\,p_{Y|\\mathbf{X}}(y\\mid\\mathbf{x})\\,\\mu(\\mathrm{d}y)\\Big)_{\\mathbf{x}=\\mathbf{X}}.$$`,
        intuition: 'On calcule d’abord une fonction **déterministe** de $\\mathbf{x}$, puis on substitue $\\mathbf{X}$. En classification, l’intégrale en $y$ contre la mesure de comptage est une **somme de deux termes**.',
        proof: [
          { text: '$\\Phi(\\mathbf{X})$ est $\\sigma(\\mathbf{X})$-mesurable.', justification: 'Par construction (fonction mesurable de $\\mathbf{X}$).' },
          { text: 'Pour $h$ mesurable bornée : $\\mathbb{E}[h(\\mathbf{X})\\Phi(\\mathbf{X})]=\\iint y\\,h(\\mathbf{x})\\,\\frac{p_{Y,\\mathbf{X}}(y,\\mathbf{x})}{p_{\\mathbf{X}}(\\mathbf{x})}\\,p_{\\mathbf{X}}(\\mathbf{x})\\,\\mu(\\mathrm{d}y)\\,\\nu(\\mathrm{d}\\mathbf{x})=\\mathbb{E}[Y\\,h(\\mathbf{X})]$.', justification: '**Fubini** et définition de $p_{Y|\\mathbf{X}}$ ; la contribution de $\\{p_{\\mathbf{X}}=0\\}$ est nulle.' },
          { text: 'Toute $T$ $\\sigma(\\mathbf{X})$-mesurable bornée s’écrit $h(\\mathbf{X})$ : $\\mathbb{E}[YT]=\\mathbb{E}[\\Phi(\\mathbf{X})T]$, et le Th.-déf. 2.1 conclut ; cas général en remplaçant $y$ par $\\psi(y)$. □', justification: 'Lemme de Doob (Prop. 2.1) ; unicité de l’espérance conditionnelle.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch8-sigmoide',
        type: 'remarque',
        label: 'Outils §2.7–2.9',
        title: 'Mesure de comptage, densité gaussienne, sigmoïde',
        source: 'Poly ch.8, Outils §2.7, §2.8, §2.9, p. 31–32',
        statement: `- **§2.7** : $p_Y:\\{-1,1\\}\\to\\mathbb{R}_+$ est une densité par rapport à $\\mathrm{c}=\\delta_{\\{-1\\}}+\\delta_{\\{1\\}}$ ssi $p_Y(-1)+p_Y(1)=1$ ; $(\\mathbf{X},Y)$ a une densité par rapport à $\\mathrm{Leb}\\otimes\\mathrm{c}$ (modèle dominé du ch.1).
- **§2.8** : un vecteur gaussien de covariance $\\Sigma$ a une densité par rapport à Lebesgue **si et seulement si** $\\Sigma$ est inversible, et alors $q(\\mathbf{x})=(2\\pi)^{-d/2}(\\det\\Sigma)^{-1/2}\\exp(-\\frac12(\\mathbf{x}-\\mu)^\\top\\Sigma^{-1}(\\mathbf{x}-\\mu))$.
- **§2.9** : $\\mathrm{sigm}(t)=\\frac1{1+e^{-t}}$ est $C^\\infty$, strictement croissante de $\\mathbb{R}$ sur $]0,1[$, $\\mathrm{sigm}(-t)=1-\\mathrm{sigm}(t)$, $\\mathrm{sigm}'(t)=\\mathrm{sigm}(t)(1-\\mathrm{sigm}(t))$, $\\mathrm{sigm}(0)=\\frac12$ ; réciproque : logit $u\\mapsto\\log\\frac u{1-u}$.`,
        intuition: '$\\mathrm{sigm}(t)\\ge1/2\\iff t\\ge0$ : c’est ce qui ramène le seuil $\\eta_\\theta\\ge1/2$ à une condition sur le **signe** de $\\phi_\\theta$ ou de $\\theta^\\top\\mathbf{x}$.',
        proof: [
          { text: '$1-\\frac1{1+e^{-t}}=\\frac{e^{-t}}{1+e^{-t}}=\\frac1{e^t+1}=\\mathrm{sigm}(-t)$.', justification: 'Multiplier numérateur et dénominateur par $e^t$.' },
          { text: '$\\mathrm{sigm}\'(t)=\\frac{e^{-t}}{(1+e^{-t})^2}=\\mathrm{sigm}(t)\\,\\mathrm{sigm}(-t)$.', justification: 'Dérivation d’un inverse.' },
        ],
      },
      {
        kind: 'example',
        id: 'ch8-ex-pc8-4',
        title: 'PC8 Ex. 4 — Espérances conditionnelles par symétrie et échangeabilité',
        source: 'PC8 Ex. 4 (corrigé p. 17)',
        setup: '(Q1) $(X,Y)$ et $(X\',Y\')$ de même loi, $\\mathbb{E}|X|<\\infty$, $\\mathbb{E}[X\\mid Y]=\\psi(Y)$. (Q2) $X$ symétrique : calculer $\\mathbb{E}[X\\mid|X|]$. (Q3) $X_1,\\dots,X_n$ i.i.d. intégrables, $S_n=X_1+\\dots+X_n$ : calculer $\\mathbb{E}[X_i\\mid S_n]$.',
        steps: [
          { text: 'Q1 : pour toute $\\phi$ mesurable bornée, $\\mathbb{E}[X\\phi(Y)]=\\mathbb{E}[\\psi(Y)\\phi(Y)]$ ; par égalité en loi **des couples**, $\\mathbb{E}[X\'\\phi(Y\')]=\\mathbb{E}[\\psi(Y\')\\phi(Y\')]$, donc $\\mathbb{E}[X\'\\mid Y\']=\\psi(Y\')$ : même fonction de Doob, donc même loi.', justification: 'Lemme de Doob, caractérisation (Th.-déf. 2.1) et unicité ; transfert d’une égalité en loi.' },
          { text: 'Q2 : $(X,|X|)$ et $(-X,|X|)$ ont même loi, donc $\\mathbb{E}[X\\mid|X|]=\\mathbb{E}[-X\\mid|X|]$ ; leur somme vaut $\\mathbb{E}[0\\mid|X|]=0$, d’où $\\mathbb{E}[X\\mid|X|]=0$.', justification: 'Loi image par $t\\mapsto(t,|t|)$, Q1, linéarité.' },
          { text: 'Q3 : les couples $(X_i,S_n)$ ont tous la même loi, donc $\\mathbb{E}[X_i\\mid S_n]=\\psi(S_n)$ avec le même $\\psi$ ; en sommant, $n\\psi(S_n)=\\mathbb{E}[S_n\\mid S_n]=S_n$, d’où $\\mathbb{E}[X_i\\mid S_n]=S_n/n$.', justification: 'Invariance de la loi produit par permutation (échangeabilité, Fubini) ; Q1 ; Prop. 2.4 (iv)–(v).' },
        ],
        conclusion: 'Aucun calcul de densité : seulement l’égalité en loi. L’égalité en loi de $Y$ et $Y\'$ seule **ne suffit pas** : il faut celle des couples.',
      },
      {
        kind: 'text',
        id: 'ch8-s8-admis',
        title: 'Résultats admis (§2.11) et résultats antérieurs mobilisés (§2.10)',
        text: `**Admis** : complétude de $\\mathrm{L}^2$ (Th. 2.1) ; théorème de projection (Th. 2.2) et fermeture de $\\mathrm{L}^2(\\Omega,\\mathcal{A},\\mathbb{P})$ (Lemme 2.1) ; existence et unicité de l’espérance conditionnelle dans $L^1$ (Th.-déf. 2.1) ; lemme de Doob (Prop. 2.1).

**Mobilisés** : ch.1 (modèle dominé, $n$-échantillon, vecteur gaussien, Radon-Nikodym) ; ch.2 (vraisemblance, EMV, M-estimateurs, moindres carrés) ; ch.6 (convergence en probabilité, consistance : hypothèse (iii) de la Prop. 1.5) ; ch.7 (consistance de l’EMV, pour l’analyse discriminante).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 9. Méthodes types
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s9-methodes',
    title: '9. Méthodes types',
    role: 'methodes',
    intro: 'Quatre schémas de rédaction couvrent l’essentiel des exercices de PC et d’annales du chapitre.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch8-meth-bayes',
        type: 'methode',
        label: 'Méthode A',
        title: 'Montrer qu’une règle est bayésienne et calculer un excès de risque',
        source: 'Poly ch.8, Th. 1.2 ; PC8 Ex. 1–2 ; DIAGNOSTIC §5.11',
        statement: `1. **Conditionner par $\\mathbf{X}$** : $R(g)=\\mathbb{E}[\\mathbb{1}_{\\{g(\\mathbf{X})=-1\\}}\\eta(\\mathbf{X})+\\mathbb{1}_{\\{g(\\mathbf{X})=1\\}}(1-\\eta(\\mathbf{X}))]$ (tour + produit, ou Lemme 2.2).
2. **Réécrire** avec $\\mathbb{1}_{\\{g=1\\}}=1-\\mathbb{1}_{\\{g=-1\\}}$ : $R(g)=\\mathbb{E}[\\mathbb{1}_{\\{g(\\mathbf{X})=-1\\}}(2\\eta(\\mathbf{X})-1)]+\\mathbb{E}[1-\\eta(\\mathbf{X})]$ ; le second terme ne dépend pas de $g$.
3. **Différence** de deux règles : $\\mathbb{E}[D(2\\eta-1)]$ avec $D=\\mathbb{1}_{\\{g=-1\\}}-\\mathbb{1}_{\\{g^\\star=-1\\}}\\in\\{-1,0,1\\}$.
4. **Disjonction de cas** sur $D$ : $D(2\\eta-1)=|2\\eta-1|\\mathbb{1}_{\\{g\\ne g^\\star\\}}\\ge0$ ; conclure par positivité de l’espérance.
5. **Variante (point par point, Prop. 1.1)** : en chaque $\\mathbf{x}$ choisir l’action qui minimise le risque conditionnel.`,
        intuition: 'Pour une perte asymétrique (coût $c$ pour prédire $-1$ quand $Y=1$), même schéma : $R(g)=1-\\mathbb{E}[\\eta]+(c+1)\\mathbb{E}[\\mathbb{1}_{\\{g=-1\\}}(\\eta-\\frac1{c+1})]$, seuil $\\frac1{c+1}$ (PC8 Ex. 1).',
        pitfalls: ['Citer le Lemme 2.2 ou « tour + produit » avec l’hypothèse « $\\mathbb{1}_{\\{g(\\mathbf{X})=-1\\}}$ est $\\sigma(\\mathbf{X})$-mesurable et bornée ».'],
      },
      {
        kind: 'theorem',
        id: 'ch8-meth-eta',
        type: 'methode',
        label: 'Méthode B',
        title: 'Calculer η, g* et R* à partir des densités de classe',
        source: 'Poly ch.8, Prop. 1.2–1.4, éq. (9), Th. 1.2 ; PC8 Ex. 5',
        statement: `1. Écrire $p_{\\mathbf{X}}=p\\,q_1+(1-p)\\,q_{-1}$ (mélange, Prop. 1.2) ; délimiter le support.
2. $\\eta=\\frac{p\\,q_1}{p\\,q_1+(1-p)\\,q_{-1}}$ (formule de Bayes, Prop. 1.4) ; zone par zone si les densités sont constantes par morceaux.
3. $g^\\star(\\mathbf{x})=1\\iff\\eta(\\mathbf{x})\\ge\\frac12\\iff p\\,q_1(\\mathbf{x})\\ge(1-p)\\,q_{-1}(\\mathbf{x})$ (9).
4. $R^\\star=\\mathbb{E}[\\min(\\eta,1-\\eta)]=\\int\\min(p\\,q_1,(1-p)\\,q_{-1})\\,\\mathrm{d}\\mu$ ; contrôle par la décomposition $\\mathbb{P}(Y=1,g^\\star=-1)+\\mathbb{P}(Y=-1,g^\\star=1)$.
5. Excès de risque d’une règle donnée : $\\mathbb{E}[|2\\eta-1|\\mathbb{1}_{\\{g\\ne g^\\star\\}}]$ (4).`,
        intuition: '$\\min(\\eta,1-\\eta)\\,p_{\\mathbf{X}}=\\min(p\\,q_1,(1-p)\\,q_{-1})$ : le risque bayésien est l’**aire du recouvrement** des densités pondérées.',
      },
      {
        kind: 'example',
        id: 'ch8-ex-pc8-1',
        title: 'PC8 Ex. 1 — Perte asymétrique : la règle bayésienne seuille η à 1/(c+1)',
        source: 'PC8 Ex. 1 (corrigé p. 7–8)',
        setup: 'Perte $\\ell(y,g(x))=c$ si $g(x)=-1$ et $y=1$, $1$ si $g(x)=1$ et $y=-1$, $0$ sinon ($c>0$). Calculer $R(g)$, montrer que $g^\\star_c=2\\,\\mathbb{1}_{\\{\\eta(X)\\ge\\frac1{c+1}\\}}-1$ est bayésienne, discuter l’unicité.',
        steps: [
          { text: '$R(g)=\\mathbb{E}[\\mathbb{1}_{\\{g(X)=1\\}}\\mathbb{1}_{\\{Y=-1\\}}]+c\\,\\mathbb{E}[\\mathbb{1}_{\\{g(X)=-1\\}}\\mathbb{1}_{\\{Y=1\\}}]=\\mathbb{E}[\\mathbb{1}_{\\{g(X)=1\\}}(1-\\eta(X))]+c\\,\\mathbb{E}[\\mathbb{1}_{\\{g(X)=-1\\}}\\eta(X)]$.', justification: 'Définition de la perte, linéarité, puis tour et produit ($\\mathbb{1}_{\\{g(X)=\\pm1\\}}$ est $\\sigma(X)$-mesurable bornée).' },
          { text: '$R(g)=1-\\mathbb{E}[\\eta(X)]+\\mathbb{E}\\big[((1+c)\\eta(X)-1)\\,\\mathbb{1}_{\\{g(X)=-1\\}}\\big]$.', justification: '$\\mathbb{1}_{\\{g(X)=1\\}}=1-\\mathbb{1}_{\\{g(X)=-1\\}}$.' },
          { text: '$R(g)-R(g^\\star_c)=(c+1)\\,\\mathbb{E}\\big[(\\mathbb{1}_{\\{g(X)=-1\\}}-\\mathbb{1}_{\\{\\eta(X)<\\frac1{c+1}\\}})(\\eta(X)-\\tfrac1{c+1})\\big]\\ge0$.', justification: 'Différence de deux risques ; l’intégrande est $\\ge0$ par disjonction de cas selon $\\eta(x)\\gtrless\\frac1{c+1}$.' },
          { text: 'Unicité : deux règles bayésiennes ont le même risque, donc l’intégrande positif est nul p.s. : elles ne diffèrent que sur $\\{\\eta(X)=\\frac1{c+1}\\}$, à un négligeable près. Pas d’unicité si $\\mathbb{P}(\\eta(X)=\\frac1{c+1})>0$.', justification: 'Une variable positive d’espérance nulle est nulle p.s.' },
        ],
        conclusion: 'Le seuil est $\\frac1{c+1}$ (pas $\\frac c{c+1}$) : plus $c$ est grand, plus on prédit volontiers 1. $c=1$ redonne le Th. 1.2. Risque bayésien : $R(g^\\star_c)=\\mathbb{E}[\\min(c\\,\\eta(X),1-\\eta(X))]$.',
      },
      {
        kind: 'theorem',
        id: 'ch8-meth-plugin',
        type: 'methode',
        label: 'Méthode C',
        title: 'Analyser une règle plug-in',
        source: 'Poly ch.8, Prop. 1.5 et (13) ; PC8 Ex. 2 Q4–Q5, Ex. 3 Q6',
        statement: `1. **Borne déterministe** (à $\\mathcal{D}_n$ fixé) : $R(\\tilde g)-R^\\star\\le2\\,\\mathbb{E}[|\\eta(\\mathbf{X})-\\tilde\\eta(\\mathbf{X})|\\mathbb{1}_{\\{\\tilde g\\ne g^\\star\\}}]\\le2\\,\\mathbb{E}|\\eta-\\tilde\\eta|$ (deux cas sur $\\{\\tilde g\\ne g^\\star\\}$).
2. **Geler** $\\mathcal{D}_n$ (indépendance du point de test, Prop. 2.5), puis prendre $\\mathbb{E}_n$ et **intervertir** (Fubini-Tonelli, intégrande positif borné).
3. **Convergence ponctuelle** : $\\phi_n(\\mathbf{x}):=\\mathbb{E}_n|\\tilde\\eta_n(\\mathbf{x})-\\eta(\\mathbf{x})|\\le\\mathbb{P}_n(|\\tilde\\eta_n(\\mathbf{x})-\\eta(\\mathbf{x})|\\ge\\varepsilon)+\\varepsilon\\to\\varepsilon$, pour tout $\\varepsilon$.
4. **Convergence dominée** en $\\mathbf{x}$ ($0\\le\\phi_n\\le1$).
5. Pour un modèle paramétrique : consistance de $\\hat\\theta_n$ (LGN + continuité) et continuité de $\\theta\\mapsto\\eta_\\theta(\\mathbf{x})$ donnent l’hypothèse (iii).`,
        intuition: 'Toujours dire **sous quelle loi** on prend l’espérance : $\\mathbb{E}$ (point de test) ou $\\mathbb{E}_n$ (échantillon).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 10. À l'examen
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s10-examen',
    title: '10. À l’examen',
    role: 'liens-examen',
    intro: 'Le ch.8 pèse ≈ 17 % de l’Examen 2025 et ≈ 12 % du CC 2022 (DIAGNOSTIC §8) : un problème entier à chaque session, dont les premières questions sont du **cours récité** (Th. 1.2 et PC8 Ex. 2/7).',
    blocks: [
      {
        kind: 'text',
        id: 'ch8-s10-2025',
        title: 'Ce qui est tombé — Examen 2025 Ex. 3 Q1–Q5 (≈ 1,75 pt pour Q1–Q3)',
        text: `Cadre : $Y\\in\\{-1,1\\}$, $\\eta(x)=\\mathbb{P}(Y=1\\mid X=x)$, $R(g)=\\mathbb{P}(g(X)\\ne Y)$.

- **Q1 (≈ 0,75 pt)** : montrer que $g^\\star(x)=2\\,\\mathbb{1}_{\\{\\eta(x)\\ge1/2\\}}-1$ est bayésien → preuve du Th. 1.2 : conditionnement, éq. (6), minimisation.
- **Q2 (≈ 0,5 pt)** : $R(g)-R^\\star=\\mathbb{E}[|2\\eta(X)-1|\\mathbb{1}_{\\{g(X)\\ne g^\\star(X)\\}}]$ → étape (7) et étude de signe de $D$.
- **Q3 (≈ 0,5 pt)** : pour $\\hat g=2\\,\\mathbb{1}_{\\{\\hat\\eta\\ge1/2\\}}-1$, $R(\\hat g)-R^\\star\\le2\\,\\mathbb{E}|\\eta(X)-\\hat\\eta(X)|$ → majoration (13), deux cas.
- **Q4 (≈ 0,25 pt)** : la règle des $k$-PPV est le plug-in de $\\hat\\eta_{n,k}(x)=\\frac1k\\sum_{i\\in N_k(x)}\\mathbb{1}_{\\{Y_i=1\\}}$.
- **Q5 (≈ 0,25 pt)** : illustration graphique ($k=3$, $n=10$, $d=2$) : cercle contenant les 3 plus proches voisins, vote majoritaire, frontière non linéaire.
- Q6–Q9 (loi Beta de $F_x(\\mathfrak{R}_k(x))$, biais-variance du $k$-PPV, choix de $k\\asymp n^{2/(d+2)}$, fléau de la dimension) sont entraînées au ch.9 (étapes « Examen 2025 Q6–Q7 », « Q8 » et « Q9 ») ; la loi Beta des statistiques d’ordre est aussi au ch.1.

**Rédaction attendue** : nommer chaque outil (« par le Lemme 2.2 », « tour + produit car $\\mathbb{1}_{\\{g(X)=-1\\}}$ est $\\sigma(X)$-mesurable bornée », « disjonction de cas sur $D\\in\\{-1,0,1\\}$ ») et conclure par « $g^\\star$ est un classifieur bayésien (Déf. 1.4) ».`,
      },
      {
        kind: 'text',
        id: 'ch8-s10-2025-ex4',
        title: 'Ce qui est tombé — Examen 2025 Ex. 4 Q8 (réponse courte, 0,25 pt)',
        text: '**LDA vs QDA vs logistique.** LDA : $\\mathbf{X}\\mid Y=i\\sim\\mathcal{N}(\\mu_i,\\Sigma)$, covariance **commune**, frontière linéaire ; QDA : $\\mathcal{N}(\\mu_i,\\Sigma_i)$, covariances **distinctes**, frontière quadratique ; logistique : modélise seulement $\\mathbb{P}(Y=1\\mid\\mathbf{X})=\\mathrm{sigm}(\\theta^\\top\\mathbf{X})$, aucune hypothèse sur la loi de $\\mathbf{X}$. QDA est préférable quand les classes ont des dispersions ou orientations différentes, si $n$ est assez grand pour estimer chaque $\\Sigma_i$.',
      },
      {
        kind: 'text',
        id: 'ch8-s10-cc2022',
        title: 'Ce qui est tombé — CC 2022 Ex. 5 : plus proche voisin (≈ 2,5 pts)',
        text: `$\\hat h_n(x)=Y_{\\varphi_n(x)}$ avec $\\varphi_n(x)=\\arg\\min_i\\|x-X_i\\|$ ; $r^\\star=\\min(\\eta,1-\\eta)$, $R^\\star=\\mathbb{E}[r^\\star(X)]$ ; admis : $X_{(n)}:=X_{\\varphi_n(X)}\\to X$ en probabilité (notation du CC 2022 : plus proche voisin de $X$ ; à ne pas confondre avec la statistique d’ordre $X_{(n)}=\\max_iX_i$ du ch.1), $\\eta$ continue.

1. $r^\\star(1-r^\\star)=\\eta(1-\\eta)$ (disjonction $\\eta\\le1/2$ / $\\eta>1/2$).
2. $\\mathbb{P}(Y=-1,Y_i=1,\\varphi_n(X)=i\\mid X,X_{1:n})=(1-\\eta(X))\\eta(X_i)\\mathbb{1}_{\\{\\varphi_n(X)=i\\}}$ (indépendance des couples, $\\varphi_n(X)$ fonction de $(X,X_{1:n})$).
3. En sommant sur $i$ : $\\mathbb{P}(Y=-1,\\hat h_n(X)=1\\mid\\cdot)=(1-\\eta(X))\\eta(X_{(n)})$, et symétriquement.
4. Convergence dominée (continuité de $\\eta$, bornes par 1) : $\\lim_n\\mathbb{P}(Y\\ne\\hat h_n(X))=2\\,\\mathbb{E}[\\eta(X)(1-\\eta(X))]=2\\,\\mathbb{E}[r^\\star(1-r^\\star)]$.
5. Jensen ($\\mathbb{E}[r^{\\star2}]\\ge(\\mathbb{E}r^\\star)^2$) : $R^\\star\\le\\lim_n\\mathbb{P}(Y\\ne\\hat h_n(X))\\le2R^\\star(1-R^\\star)$ (borne de **Cover-Hart**).

Jumeaux : PC8 Ex. 2 (risque bayésien), Ex. 4 (espérance conditionnelle), Ex. 7 ; Prop. 1.5 (convergence dominée sur le double aléa).`,
      },
      {
        kind: 'text',
        id: 'ch8-s10-pieges',
        title: 'Pièges relevés dans les annales et les corrigés',
        text: `- **Double aléa** : $R(\\widehat g_n)$ est une variable aléatoire (fonction de $\\mathcal{D}_n$) ; on majore $\\mathbb{E}_n[R(\\widehat g_n)]$ ; dire sous quelle loi on prend chaque espérance.
- **Excès de risque $\\ge0$** par optimalité de $g^\\star$ : c’est ce qui permet d’enlever la valeur absolue (PC8 Ex. 2 Q4, Ex. 3 Q6).
- **Non-unicité** : sur $\\{\\eta=1/2\\}$ le classifieur de Bayes n’est pas unique.
- **Codage** : avec $Y\\in\\{-1,1\\}$, $\\eta(\\mathbf{X})=\\mathbb{P}(Y=1\\mid\\mathbf{X})$ et $\\mathbb{E}[Y\\mid\\mathbf{X}]=2\\eta-1$.
- **Seuil au milieu** seulement si $p=1/2$ **et** mêmes variances ; avec des densités uniformes, comparer les densités pondérées zone par zone (PC8 Ex. 5).
- **Majoration plug-in** : $|\\eta-\\frac12|\\le|\\eta-\\hat\\eta|$ **seulement sur $\\{\\hat g\\ne g^\\star\\}$** et pour un même seuil $1/2$.
- **LDA** : $\\mathbf{w}=\\Sigma^{-1}(\\mu_1-\\mu_{-1})$, pas $\\mu_1-\\mu_{-1}$ ; covariance poolée centrée sur la moyenne de chaque classe ; LDA mal spécifiée $\\Rightarrow$ excès de risque qui ne tend pas vers 0.
- **Perte asymétrique** : seuil $\\frac1{c+1}$, pas $\\frac c{c+1}$.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 11. Compléments
  // -------------------------------------------------------------------------
  {
    id: 'ch8-s11-hp',
    title: '11. Compléments (hors programme) : risque empirique, sur-apprentissage, consistance, perceptron',
    role: 'complements',
    scope: 'hors-programme',
    intro: 'Section « 4 Les compléments » du poly (p. 34–41) : « Les contenus de cette partie ne sont pas exigibles. » Résumés concis ; ils annoncent les chapitres 9 et 10.',
    blocks: [
      {
        kind: 'example',
        id: 'ch8-ex-4-1',
        title: 'Exemple 4.1 — Attribut uniforme, classe à deux niveaux : R* = 0,1',
        source: 'Poly ch.8, Compléments, Ex. 4.1, p. 34 (Figure 7)',
        scope: 'hors-programme',
        setup: '$X\\sim\\mathcal{U}([-1,1])$, $q_{Y|X}(1\\mid x)=0{,}9$ si $x\\in[0,1]$, $0{,}1$ si $x\\in[-1,0[$.',
        steps: [
          { text: '$p=\\mathbb{P}(Y=1)=\\frac12\\cdot0{,}9+\\frac12\\cdot0{,}1=\\frac12$ ; $\\eta=0{,}9$ sur $[0,1]$, $0{,}1$ sur $[-1,0[$ ; $g^\\star(x)=2\\,\\mathbb{1}_{[0,1]}(x)-1$.', justification: 'Probabilités totales ; Th. 1.2.' },
          { text: '$\\mathbb{P}(g^\\star(X)\\ne Y)=\\mathbb{P}(X\\ge0,Y=-1)+\\mathbb{P}(X<0,Y=1)=\\frac{0{,}1}2+\\frac{0{,}1}2=0{,}1$.', justification: 'Calcul direct, confirmé par (5) : $\\mathbb{E}[\\min(\\eta,1-\\eta)]=0{,}1$.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch8-prop-4-1',
        type: 'proposition',
        label: 'Proposition 4.1',
        title: 'Optimalité quadratique de la fonction de régression (codage {0,1})',
        source: 'Poly ch.8, Compléments, Prop. 4.1, p. 34–35',
        scope: 'hors-programme',
        hypotheses: ['$Y\\in\\{0,1\\}$, $\\eta$ fonction de régression, $g:\\mathbb{R}^d\\to[0,1]$ mesurable.'],
        statement: '$\\mathbb{E}[(\\eta(\\mathbf{X})-Y)^2]\\le\\mathbb{E}[(g(\\mathbf{X})-Y)^2]$ : cas particulier du Th. 1.1, puisque $\\eta(\\mathbf{X})=\\mathbb{E}[Y\\mid\\mathbf{X}]$ avec ce codage.',
      },
      {
        kind: 'theorem',
        id: 'ch8-def-4-1',
        type: 'definition',
        label: 'Définition 4.1',
        title: 'Risque empirique ; règle « par cœur »',
        source: 'Poly ch.8, Compléments, Déf. 4.1 et Ex. 4.2, p. 35–36 (Figure 8)',
        scope: 'hors-programme',
        statement: `$\\widehat R_n(g):=\\frac1n\\sum_{k=1}^n\\mathbb{1}_{\\{g(\\mathbf{X}_k)\\ne Y_k\\}}$. Pour $g$ **fixée**, $\\widehat R_n(g)\\to R(g)$ en probabilité (LGN). Mais minimiser $\\widehat R_n$ sur **toutes** les règles ne donne rien : $g_{\\mathrm{bad},n}(\\mathbf{x})=Y_k$ si $\\mathbf{x}=\\mathbf{X}_k$, $-1$ sinon, a un risque empirique **nul** et prédit $-1$ partout ailleurs. **Sur-apprentissage** (Ex. 4.2) : une frontière qui se contorsionne pour classer tous les points d’apprentissage classe moins bien les données nouvelles.`,
        intuition: 'La LGN vaut pour une règle fixée, pas pour une règle choisie au vu des données : c’est tout l’objet du ch.9.',
      },
      {
        kind: 'viz',
        id: 'ch8-s11-viz-knn',
        vizId: 'ch8-knn',
        caption: 'Avec $k=1$, l’erreur d’apprentissage des $k$-PPV est nulle (règle « par cœur ») alors que l’erreur de test est loin de $R^\\star$ : sur-apprentissage.',
      },
      {
        kind: 'theorem',
        id: 'ch8-def-4-2',
        type: 'definition',
        label: '§4.4 et Définition 4.2',
        title: 'Risque moyen ; consistance d’une suite de classifieurs',
        source: 'Poly ch.8, Compléments, §4.4 et Déf. 4.2, p. 36–37',
        scope: 'hors-programme',
        statement: `**Risque moyen** $\\mathbb{E}[R(\\widehat g_n)]=\\mathbb{P}(\\widehat g_n(\\mathbf{X};\\mathcal{D}_n)\\ne Y)$. La suite est **faiblement consistante** si $R(\\widehat g_n)\\xrightarrow{\\mathbb{P}\\text{-prob}}R^\\star$ (15) ; pour la perte 0–1 cela équivaut à $\\lim_n\\mathbb{E}[R(\\widehat g_n)]=R^\\star$ (16) : (16)$\\Rightarrow$(15) par Markov, (15)$\\Rightarrow$(16) car $\\mathbb{E}[R(\\widehat g_n)]-R^\\star\\le\\mathbb{P}(R(\\widehat g_n)-R^\\star\\ge\\delta)+\\delta$. **Consistance universelle** : (16) quelle que soit la loi de $(\\mathbf{X},Y)$.`,
      },
      {
        kind: 'text',
        id: 'ch8-s11-compromis',
        title: '§4.6 — Compromis approximation / estimation ; crible ; validation',
        scope: 'hors-programme',
        text: `En restreignant à une classe $\\mathcal{C}$ et en minimisant le risque empirique :

$$\\mathbb{E}[R(\\widehat g_n)]-R^\\star=\\underbrace{\\mathbb{E}[R(\\widehat g_n)]-\\inf_{g\\in\\mathcal{C}}R(g)}_{\\text{estimation}}+\\underbrace{\\inf_{g\\in\\mathcal{C}}R(g)-R^\\star}_{\\text{approximation}}.$$

Classe petite : estimation faible, approximation grande ; classe riche : l’inverse ; la somme passe par un minimum (Figure 9). Stratégies : **restreindre** $\\mathcal{C}$ ou **pénaliser** (ch.10) ; méthode du **crible** (classes emboîtées $\\mathcal{C}_k$) ; **validation simple** (*hold-out*) : apprendre sur $\\mathcal{D}_T$, choisir sur $\\mathcal{D}_V$ par $\\widehat R_V$. PC8 Ex. 6 (règles à seuil) calcule le risque minimal d’une classe $\\mathcal{C}$ et montre qu’il est $\\le\\min(p,1-p)$.`,
      },
      {
        kind: 'text',
        id: 'ch8-s11-perceptron',
        title: 'Ex. 4.3 et §4.8 — Classifieurs linéaires, perceptron, réseaux de neurones',
        scope: 'hors-programme',
        text: 'Classe $\\{\\mathbf{x}\\mapsto\\mathrm{signe}(\\mathbf{w}^\\top\\mathbf{x})\\}$ ; **perceptron stochastique** : $\\mathbf{w}_{t+1}=\\mathbf{w}_t+\\gamma\\,Y_{K_t}\\mathbf{X}_{K_t}\\mathbb{1}_{\\{\\mathrm{signe}(\\mathbf{w}_t^\\top\\mathbf{X}_{K_t})\\ne Y_{K_t}\\}}$, qui converge si les classes sont linéairement séparables. Réseau à une couche cachée : $g(\\mathbf{x})=\\mathrm{heaviside}\\big(c_0+\\sum_{i=1}^kc_i\\,\\sigma(\\psi_i(\\mathbf{x}))\\big)$ ; théorème de Kolmogorov-Lorentz : toute $f$ continue sur $[0,1]^d$ s’écrit $\\sum_{i=1}^{2d+1}F_i\\big(\\sum_jG_{i,j}(x^{(j)})\\big)$.',
      },
    ],
  },
]
