import type { CourseSection } from '../types'

/** Sections 5 et 6 : inégalités de concentration (Chernoff, sous-gaussiennes, Hoeffding) et bornes sur une classe finie. */
export const coursePart2: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 5. Inégalités de concentration
  // -------------------------------------------------------------------------
  {
    id: 'ch9-s5-concentration',
    title: '5. Inégalités de concentration : Markov, Chernoff, sous-gaussiennes, Hoeffding',
    role: 'preuves',
    intro:
      'Une **inégalité de concentration** majore la probabilité qu’une variable aléatoire s’écarte de sa moyenne. « La concentration se lit sur le contrôle des moments » (p. 17) : (1) un contrôle de la transformée de Laplace entraîne la concentration (**borne de Chernoff**) ; (2) une variable **bornée et centrée** est sous-gaussienne (**lemme de Hoeffding**) ; (3) pour une somme de variables **indépendantes**, la transformée de Laplace est le produit des transformées. Ces trois étapes donnent l’**inégalité de Hoeffding**, énoncée et admise au ch.4, démontrée ici.',
    blocks: [
      {
        kind: 'text',
        id: 'ch9-s5-markov',
        title: 'De Markov à l’espoir d’une borne exponentielle (§1.3 p. 16 ; Outils §2.1–2.2)',
        text: `**Markov** : si $Z\\ge0$, $\\mathbb P(Z\\ge t)\\le\\mathbb E[Z]/t$ pour tout $t>0$ (preuve : $t\\mathbf{1}_{\\{Z\\ge t\\}}\\le Z$ puis espérance). **Bienaymé-Tchebychev** : Markov appliquée à $(W-\\mathbb E[W])^2$ au seuil $\\varepsilon^2$ donne $\\mathbb P(|W-\\mathbb E[W]|\\ge\\varepsilon)\\le\\mathrm{Var}(W)/\\varepsilon^2$. Pour une moyenne de $n$ variables i.i.d. de carré intégrable :

$$\\mathbb P\\Big(\\Big|\\frac1n\\sum_{i=1}^nX_i-\\mathbb E[X_1]\\Big|\\ge\\varepsilon\\Big)\\le\\frac{\\mathrm{Var}(X_1)}{n\\varepsilon^2},$$

qui décroît seulement comme $1/n$.

**Pourquoi espérer mieux.** Le TCL (Thm 1.6 du ch.6) donne, pour des variables i.i.d. de variance $v>0$, $\\lim_n\\mathbb P\\big(\\sum_{i=1}^nX_i-n\\mathbb E[X_1]>\\varepsilon\\sqrt n\\big)=1-\\Phi(\\varepsilon/\\sqrt v)\\le e^{-\\varepsilon^2/(2v)}$ (queue gaussienne, admise) : on s’attend à une décroissance **exponentielle en $\\varepsilon^2/v$**. Ce n’est qu’une indication (la limite ne dit rien à $n$ fixé). Idée : appliquer Markov « de façon plus astucieuse », **à une exponentielle**.`,
      },
      {
        kind: 'theorem',
        id: 'ch9-prop-2-1',
        type: 'proposition',
        label: 'Proposition 2.1 (Outils)',
        title: 'Borne de Chernoff',
        source: 'Poly ch.9, Outils Prop. 2.1, p. 27 ; PC9 Ex. 2 Q4',
        hypotheses: ['$Z$ variable aléatoire réelle intégrable ; $\\varepsilon>0$.', '$\\lambda>0$ tel que $\\mathbb E[e^{\\lambda Z}]<\\infty$.'],
        statement: `$$\\mathbb P(Z-\\mathbb E[Z]\\ge\\varepsilon)\\le\\frac{\\mathbb E\\big[e^{\\lambda(Z-\\mathbb E[Z])}\\big]}{e^{\\lambda\\varepsilon}}.$$

En notant $\\psi(\\lambda)=\\log\\mathbb E[e^{\\lambda(Z-\\mathbb E[Z])}]$ : $\\mathbb P(Z-\\mathbb E[Z]\\ge\\varepsilon)\\le\\exp\\big(-\\sup_{\\lambda>0}\\{\\lambda\\varepsilon-\\psi(\\lambda)\\}\\big)$.

Si $Z=\\sum_{i=1}^nX_i$ avec des $X_i$ **indépendantes**, $\\mathbb E[e^{\\lambda(Z-\\mathbb E[Z])}]=\\prod_{i=1}^n\\mathbb E[e^{\\lambda(X_i-\\mathbb E[X_i])}]$ : il suffit de borner chaque facteur.`,
        intuition: 'On remplace l’indicatrice $\\mathbf{1}_{\\{Z-\\mathbb E Z\\ge\\varepsilon\\}}$ par l’exponentielle $e^{\\lambda(Z-\\mathbb E Z-\\varepsilon)}$ qui la majore, puis on optimise le paramètre $\\lambda$ (transformée de Legendre de $\\psi$).',
        proof: [
          {
            text: '$\\{Z-\\mathbb E[Z]\\ge\\varepsilon\\}=\\{e^{\\lambda(Z-\\mathbb E[Z])}\\ge e^{\\lambda\\varepsilon}\\}$.',
            justification: '$t\\mapsto e^{\\lambda t}$ est strictement croissante car $\\lambda>0$.',
          },
          {
            text: '$\\mathbb P(e^{\\lambda(Z-\\mathbb E[Z])}\\ge e^{\\lambda\\varepsilon})\\le e^{-\\lambda\\varepsilon}\\mathbb E[e^{\\lambda(Z-\\mathbb E[Z])}]$.',
            justification: 'Inégalité de Markov appliquée à la variable **positive** $e^{\\lambda(Z-\\mathbb E[Z])}$.',
          },
          {
            text: 'La borne valant pour tout $\\lambda>0$, on prend l’infimum : $\\exp(-\\sup_{\\lambda>0}\\{\\lambda\\varepsilon-\\psi(\\lambda)\\})$.',
            justification: 'Optimisation en $\\lambda$.',
          },
          {
            text: 'Pour une somme de variables indépendantes, les $e^{\\lambda(X_i-\\mathbb E X_i)}$ sont indépendantes et positives : l’espérance du produit est le produit des espérances.',
            justification: 'Indépendance.',
          },
        ],
        pitfalls: ['Seulement $\\lambda>0$ pour la déviation **supérieure** (Markov ne s’applique pas dans le bon sens sinon) ; pour la déviation inférieure, appliquer la borne à $-Z$.'],
      },
      {
        kind: 'theorem',
        id: 'ch9-def-2-1',
        type: 'definition',
        label: 'Définition 2.1 (Outils)',
        title: 'Variable sous-gaussienne de facteur v',
        source: 'Poly ch.9, Outils Déf. 2.1, p. 28 ; PC9 Ex. 2',
        hypotheses: ['$X$ variable aléatoire réelle **centrée** ; $v>0$.'],
        statement: `$X$ est **sous-gaussienne de facteur de variance $v$** si

$$\\psi_X(\\lambda):=\\log\\mathbb E\\big[e^{\\lambda X}\\big]\\le\\frac{\\lambda^2v}2\\qquad\\text{pour tout }\\lambda\\in\\mathbb R.$$

On note $\\mathcal G(v)$ l’ensemble de ces variables ; $\\lambda\\mapsto\\mathbb E[e^{\\lambda X}]$ est la **transformée de Laplace** de $X$ et $\\psi_X$ sa **fonction génératrice des cumulants**.`,
        intuition: 'La transformée de Laplace de $X$ est dominée par celle d’une $\\mathcal N(0,v)$ ; ses déviations seront donc majorées comme celles d’une gaussienne de variance $v$.',
        pitfalls: ['La définition n’exige **pas** que $\\mathrm{Var}(X)=v$, seulement $\\mathrm{Var}(X)\\le v$.', '« Pour tout $\\lambda\\in\\mathbb R$ » (les deux signes) : c’est ce qui donne la symétrie des déviations ; $X$ doit être **centrée**.'],
      },
      {
        kind: 'example',
        id: 'ch9-ex-pc9-2',
        title: 'PC9 Ex. 2 Q1–Q2 — La gaussienne et la variable de Rademacher sont sous-gaussiennes',
        source: 'PC9 Ex. 2 Q1–Q2 (corrigé p. 9–10)',
        setup: '(a) $X\\sim\\mathcal N(0,v)$ ; (b) $X$ de Rademacher : $\\mathbb P(X=1)=\\mathbb P(X=-1)=1/2$.',
        steps: [
          {
            text: '(a) $\\mathbb E[e^{\\lambda X}]=\\frac1{\\sqrt{2\\pi v}}\\int e^{-\\frac1{2v}(x-\\lambda v)^2}\\,\\mathrm dx\\;e^{\\lambda^2v/2}=e^{\\lambda^2v/2}$, donc $X\\in\\mathcal G(v)$ (avec égalité).',
            justification: 'Complétion du carré : $\\lambda x-\\frac{x^2}{2v}=-\\frac{(x-\\lambda v)^2}{2v}+\\frac{\\lambda^2v}2$ ; l’intégrale restante est celle d’une densité $\\mathcal N(\\lambda v,v)$.',
          },
          {
            text: '(b) $\\mathbb E[e^{\\lambda X}]=\\frac12(e^\\lambda+e^{-\\lambda})=\\sum_{q\\ge0}\\frac{\\lambda^{2q}}{(2q)!}$.',
            justification: 'Développement en série de l’exponentielle : les termes impairs se compensent.',
          },
          {
            text: '$\\sum_{q\\ge0}\\frac{\\lambda^{2q}}{(2q)!}\\le\\sum_{q\\ge0}\\frac{\\lambda^{2q}}{2^qq!}=e^{\\lambda^2/2}$, donc $X\\in\\mathcal G(1)$.',
            justification: '$(2q)!\\ge2\\times4\\times\\cdots\\times2q=2^qq!$ ; $X$ est centrée.',
          },
        ],
        conclusion: 'La variance de la Rademacher vaut exactement 1 : le facteur $v=1$ est optimal. Pour la gaussienne, l’inégalité de la définition est une égalité.',
      },
      {
        kind: 'theorem',
        id: 'ch9-prop-2-2',
        type: 'proposition',
        label: 'Proposition 2.2 (Outils)',
        title: 'Somme et déviations de variables sous-gaussiennes',
        source: 'Poly ch.9, Outils Prop. 2.2, p. 28 ; PC9 Ex. 2 Q3 et Q5',
        hypotheses: [
          '(i) $X_1,\\dots,X_n$ **indépendantes**, $X_i\\in\\mathcal G(v_i)$.',
          '(ii) $X\\in\\mathcal G(v)$, $t>0$.',
        ],
        statement: `(i) $\\sum_{i=1}^nX_i\\in\\mathcal G\\big(\\sum_{i=1}^nv_i\\big)$.

(ii) $\\mathbb P(X\\ge t)\\le e^{-t^2/(2v)}$ et $\\mathbb P(-X\\ge t)\\le e^{-t^2/(2v)}$.`,
        intuition: 'Les facteurs de variance s’**additionnent** pour des variables indépendantes (comme les variances) ; les déviations d’une sous-gaussienne de facteur $v$ sont celles d’une $\\mathcal N(0,v)$.',
        proof: [
          {
            text: '(i) $\\sum_iX_i$ est centrée et $\\psi_{\\sum_iX_i}(\\lambda)=\\sum_{i=1}^n\\psi_{X_i}(\\lambda)\\le\\frac{\\lambda^2}2\\sum_{i=1}^nv_i$.',
            justification: 'Par indépendance, la transformée de Laplace de la somme est le produit des transformées ; le log transforme le produit en somme.',
          },
          {
            text: '(ii) Pour tout $\\lambda>0$, $\\mathbb P(X\\ge t)\\le\\exp(-\\lambda t+\\psi_X(\\lambda))\\le\\exp(-\\lambda t+\\lambda^2v/2)$.',
            justification: 'Borne de Chernoff (Prop. 2.1) puis hypothèse $X\\in\\mathcal G(v)$.',
          },
          {
            text: 'Le trinôme $\\lambda\\mapsto\\lambda t-\\lambda^2v/2$ est maximal en $\\lambda=t/v>0$, de valeur $t^2/(2v)$ : $\\mathbb P(X\\ge t)\\le e^{-t^2/(2v)}$.',
            justification: 'Optimisation en $\\lambda$.',
          },
          {
            text: '$\\psi_{-X}(\\lambda)=\\psi_X(-\\lambda)\\le\\lambda^2v/2$, donc $-X\\in\\mathcal G(v)$ et $\\mathbb P(-X\\ge t)\\le e^{-t^2/(2v)}$.',
            justification: 'C’est ici que sert « pour tout $\\lambda\\in\\mathbb R$ ».',
          },
        ],
        pitfalls: ['Facteur de la somme : $\\sum_iv_i$, **pas** $\\max_iv_i$.'],
      },
      {
        kind: 'theorem',
        id: 'ch9-lemme-1-1',
        type: 'lemme',
        label: 'Lemme 1.1',
        title: 'Lemme de Hoeffding',
        source: 'Poly ch.9, Lemme 1.1, p. 17 ; démonstration Outils §2.4, p. 28–29 ; PC9 Ex. 3',
        hypotheses: ['$X$ variable aléatoire réelle telle que $\\mathbb P(X\\in[a,b])=1$.', '$\\mathbb E[X]=0$ (centrée).'],
        statement: `Pour tout $\\lambda\\in\\mathbb R$,

$$\\mathbb E\\big[e^{\\lambda X}\\big]\\le e^{\\lambda^2(b-a)^2/8},$$

autrement dit $X\\in\\mathcal G\\big((b-a)^2/4\\big)$. **Forme non centrée** (PC9 Ex. 3) : si $X\\in[a,b]$ p.s., $\\psi_X(\\lambda)\\le\\lambda\\mathbb E[X]+\\lambda^2(b-a)^2/8$.`,
        intuition: 'La variance d’une variable à valeurs dans $[a,b]$ est au plus $(b-a)^2/4$ ; le lemme dit que **toute** la transformée de Laplace est contrôlée par celle d’une gaussienne de cette variance maximale. Argument de **Herbst** : étudier le log de la transformée de Laplace, majorer sa dérivée seconde, intégrer deux fois.',
        proof: [
          {
            text: 'Pour tout $\\lambda$, $e^{\\lambda X}$ est bornée : $\\psi(\\lambda):=\\log\\mathbb E[e^{\\lambda X}]$ est bien définie.',
            justification: '$X$ est bornée p.s.',
          },
          {
            text: '$\\lambda\\mapsto\\mathbb E[e^{\\lambda X}]$ est deux fois dérivable, de dérivées $\\mathbb E[Xe^{\\lambda X}]$ et $\\mathbb E[X^2e^{\\lambda X}]$.',
            justification: 'Dérivation sous le signe intégral (Prop. 2.2 du ch.3) : pour $|\\lambda|\\le L$, $|X^ke^{\\lambda X}|\\le M^ke^{LM}$ avec $M=\\max(|a|,|b|)$ (domination).',
          },
          {
            text: '$\\psi\'(\\lambda)=\\frac{\\mathbb E[Xe^{\\lambda X}]}{\\mathbb E[e^{\\lambda X}]}$ et $\\psi\'\'(\\lambda)=\\mathbb E\\Big[X^2\\frac{e^{\\lambda X}}{\\mathbb E[e^{\\lambda X}]}\\Big]-\\Big(\\mathbb E\\Big[X\\frac{e^{\\lambda X}}{\\mathbb E[e^{\\lambda X}]}\\Big]\\Big)^2$.',
            justification: 'Dérivée logarithmique, puis dérivée d’un quotient.',
          },
          {
            text: 'Sous la loi **basculée** $\\widetilde{\\mathbb P}_\\lambda$, de densité $e^{\\lambda X}/\\mathbb E[e^{\\lambda X}]$ par rapport à $\\mathbb P$, $\\psi\'\'(\\lambda)=\\widetilde{\\mathrm{Var}}_\\lambda(X)$, et $X\\in[a,b]$ $\\widetilde{\\mathbb P}_\\lambda$-p.s.',
            justification: 'Lecture de la formule précédente ; $\\widetilde{\\mathbb P}_\\lambda\\ll\\mathbb P$ donc le support reste dans $[a,b]$.',
          },
          {
            text: '$\\psi\'\'(\\lambda)=\\widetilde{\\mathrm{Var}}_\\lambda(X)\\le\\widetilde{\\mathbb E}_\\lambda\\big[(X-\\frac{a+b}2)^2\\big]\\le\\frac{(b-a)^2}4$.',
            justification: 'La variance est le minimum en $c$ de $\\widetilde{\\mathbb E}_\\lambda[(X-c)^2]$ ; on prend $c=(a+b)/2$ et $|X-(a+b)/2|\\le(b-a)/2$.',
          },
          {
            text: '$\\psi(\\lambda)=\\psi(0)+\\lambda\\psi\'(0)+\\frac{\\lambda^2}2\\psi\'\'(\\xi)\\le\\frac{\\lambda^2(b-a)^2}8$ pour un $\\xi$ entre $0$ et $\\lambda$.',
            justification: 'Taylor-Lagrange à l’ordre 2, avec $\\psi(0)=\\log1=0$ et $\\psi\'(0)=\\mathbb E[X]=0$.',
          },
        ],
        pitfalls: [
          'Le $8$ au dénominateur (et non $2$) : $e^{\\lambda^2\\sigma^2/2}$ avec $\\sigma^2=(b-a)^2/4$.',
          'Le majorant de la variance d’une variable dans $[a,b]$ est $(b-a)^2/4$, **pas** $(b-a)^2$.',
          'Hypothèse de **centrage** indispensable dans cette forme ; sinon utiliser la forme non centrée.',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-2-1',
        type: 'theoreme',
        label: 'Théorème 2.1 (Outils)',
        title: 'Inégalité de Hoeffding, variables bornées',
        source: 'Poly ch.9, Outils Th. 2.1, p. 29–30 (= Th. 3.1 du ch.4, admis au ch.4) ; PC9 Ex. 3 Q1',
        hypotheses: [
          '$X_1,\\dots,X_n$ variables aléatoires réelles **indépendantes**.',
          '$X_i\\in[a_i,b_i]$ p.s., avec $a_i<b_i$.',
          '$S_n:=\\sum_{i=1}^n\\{X_i-\\mathbb E[X_i]\\}$, $D_n:=\\sum_{i=1}^n(b_i-a_i)^2$, $t>0$.',
        ],
        statement: '$$\\mathbb P(S_n\\ge t)\\le e^{-2t^2/D_n}\\qquad\\text{et}\\qquad\\mathbb P(S_n\\le-t)\\le e^{-2t^2/D_n}.$$',
        proof: [
          {
            text: 'Les $X_i-\\mathbb E[X_i]$ sont indépendantes, centrées, à valeurs dans des intervalles de longueurs $b_i-a_i$, donc $X_i-\\mathbb E[X_i]\\in\\mathcal G((b_i-a_i)^2/4)$.',
            justification: 'Lemme de Hoeffding (Lemme 1.1) ; le centrage ne change pas la longueur de l’intervalle.',
          },
          { text: '$S_n\\in\\mathcal G(D_n/4)$.', justification: 'Prop. 2.2 (i) : somme de sous-gaussiennes **indépendantes**.' },
          {
            text: '$\\mathbb P(S_n\\ge t)\\le e^{-t^2/(2D_n/4)}=e^{-2t^2/D_n}$, et de même pour $\\mathbb P(-S_n\\ge t)$.',
            justification: 'Prop. 2.2 (ii).',
          },
        ],
        intuition: 'Preuve « du deck » pour des variables dans $[0,1]$ : Chernoff + lemme de Hoeffding donnent $\\mathbb P(S_n\\ge t)\\le e^{-\\lambda t+n\\lambda^2/8}$ pour tout $\\lambda>0$ ; le minimum de l’exposant est atteint en $\\lambda=4t/n$ et vaut $-2t^2/n$.',
        pitfalls: ['$D_n$ (somme des carrés des longueurs) n’a rien à voir avec l’échantillon $\\mathcal D_n$.'],
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-1-3',
        type: 'theoreme',
        label: 'Théorème 1.3 (= Corollaire 2.1)',
        title: 'Inégalité de Hoeffding pour une moyenne de variables à valeurs dans [0,1]',
        source: 'Poly ch.9, Th. 1.3, p. 16 et Outils Cor. 2.1, p. 30',
        hypotheses: ['$X_1,\\dots,X_n$ variables aléatoires **indépendantes** (pas nécessairement de même loi).', 'À valeurs dans $[0,1]$.', '$\\varepsilon>0$.'],
        statement: `$$\\mathbb P\\Big(\\Big|\\frac1n\\sum_{i=1}^n\\{X_i-\\mathbb E[X_i]\\}\\Big|\\ge\\varepsilon\\Big)\\le2e^{-2n\\varepsilon^2},$$

et chacune des deux déviations unilatérales, $\\mathbb P\\big(\\frac1n\\sum_i\\{X_i-\\mathbb E[X_i]\\}\\ge\\varepsilon\\big)$ et $\\mathbb P\\big(\\frac1n\\sum_i\\{X_i-\\mathbb E[X_i]\\}\\le-\\varepsilon\\big)$, est majorée par $e^{-2n\\varepsilon^2}$. Extension à $X_i\\in[a_i,b_i]$ : $2\\exp\\big(-2n^2\\varepsilon^2/\\sum_{i=1}^n(b_i-a_i)^2\\big)$.`,
        intuition: 'Hoeffding n’exploite **aucune** propriété de la loi autre que le **support** : la borne est la même pour toutes les lois portées par $[0,1]$. Ce caractère **agnostique** est précieux (la loi des pertes $\\mathbf{1}_{\\{g(\\mathbf X_k)\\ne Y_k\\}}$ est inconnue mais portée par $\\{0,1\\}$) ; en contrepartie la borne est pessimiste quand la variance est petite (Bennett, Bernstein raffinent). Heuristique : le TCL suggère $e^{-n\\varepsilon^2/(2v)}$ et une variable dans $[0,1]$ a une variance au plus $1/4$ : $2n\\varepsilon^2=n\\varepsilon^2/(2\\cdot1/4)$ est l’exposant gaussien **dans le pire cas**, mais Hoeffding vaut **pour tout $n$**.',
        proof: [
          {
            text: 'Th. 2.1 avec $a_i=0$, $b_i=1$ (donc $D_n=n$) et $t=n\\varepsilon$ : chaque déviation unilatérale a une probabilité au plus $e^{-2n^2\\varepsilon^2/n}=e^{-2n\\varepsilon^2}$.',
            justification: '$\\{\\frac1n\\sum_i\\{X_i-\\mathbb E X_i\\}\\ge\\varepsilon\\}=\\{S_n\\ge n\\varepsilon\\}$.',
          },
          {
            text: '$\\mathbb P(|\\cdot|\\ge\\varepsilon)\\le\\mathbb P(\\cdot\\ge\\varepsilon)+\\mathbb P(\\cdot\\le-\\varepsilon)\\le2e^{-2n\\varepsilon^2}$.',
            justification: 'Sous-additivité de $\\mathbb P$ (borne de l’union à deux événements).',
          },
        ],
        pitfalls: [
          '**Trois écritures** (p. 17) : parmi $2e^{-2n\\varepsilon^2}$, $2e^{-2\\varepsilon^2/n}$ et $2e^{-2n\\varepsilon}$, **seule la première** vaut pour la moyenne ; la deuxième est correcte pour la **somme** $\\mathbb P(|\\sum_i\\{X_i-\\mathbb E X_i\\}|\\ge\\varepsilon)$ ; la troisième est **fausse** : pour des Bernoulli de paramètre $1/2$ et $\\varepsilon=n^{-1/2}$, le TCL donne une probabilité qui tend vers $2(1-\\Phi(2))>0$ alors que $2e^{-2\\sqrt n}\\to0$.',
          'Oublier le facteur 2 en bilatéral ; appliquer Hoeffding à des variables **non bornées** ou **dépendantes**.',
          'L’appliquer directement aux pertes du MRE $\\hat g^*_{n,\\mathcal C}$ : elles ne sont pas indépendantes (la règle dépend de tout l’échantillon) ; il faut la borne de l’union sur la classe.',
        ],
      },
      {
        kind: 'viz',
        id: 'ch9-s5-viz-hoeffding',
        vizId: 'ch9-hoeffding',
        caption: 'Comparer la fréquence des déviations à $2e^{-2n\\varepsilon^2}$ (Hoeffding) et $\\mathrm{Var}/(n\\varepsilon^2)$ (Bienaymé-Tchebychev) ; à droite, l’écriture fausse $2e^{-2n\\varepsilon}$ passe sous la vraie probabilité.',
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-1-4',
        type: 'theoreme',
        label: 'Théorème 1.4',
        title: 'Inégalité de Hoeffding, seconde écriture (forme « δ »)',
        source: 'Poly ch.9, Th. 1.4, p. 17–18',
        hypotheses: ['$X_1,\\dots,X_n$ indépendantes à valeurs dans $[0,1]$.', '$\\delta\\in]0,1[$.'],
        statement: `On fixe la probabilité d’échec plutôt que l’écart : $\\varepsilon=\\sqrt{\\frac{\\ln(2/\\delta)}{2n}}\\iff2e^{-2n\\varepsilon^2}=\\delta$. Avec une probabilité supérieure à $1-\\delta$,

$$\\Big|\\frac1n\\sum_{i=1}^n\\{X_i-\\mathbb E[X_i]\\}\\Big|\\le\\sqrt{\\frac{\\ln(2/\\delta)}{2n}}.$$

Nombre d’observations suffisant pour une précision $\\varepsilon$ et une confiance $1-\\delta$ : $n\\ge\\ln(2/\\delta)/(2\\varepsilon^2)$.`,
        intuition: 'La **précision** $\\varepsilon$ est l’objectif sur l’écart moyenne empirique / espérance ; la **confiance** $\\delta$ borne la probabilité avec laquelle on admet que la précision ne soit pas atteinte. « La précision coûte cher » : à confiance donnée, une précision **dix fois meilleure** demande **cent fois plus** d’observations ($n\\propto1/\\varepsilon^2$), alors que la dépendance en $\\delta$ est seulement logarithmique.',
        proof: [
          {
            text: 'Avec ce choix de $\\varepsilon$, l’événement contraire $\\{|\\frac1n\\sum_i\\{X_i-\\mathbb E X_i\\}|\\ge\\varepsilon\\}$ a une probabilité au plus $2e^{-2n\\varepsilon^2}=\\delta$.',
            justification: 'Th. 1.3.',
          },
          { text: 'Passage au complémentaire : probabilité au moins $1-\\delta$.', justification: '$\\mathbb P(A^c)=1-\\mathbb P(A)$.' },
        ],
        pitfalls: ['Dépendance **logarithmique** en $\\delta$ (bon marché), **quadratique** en $1/\\varepsilon$ (cher).'],
      },
      {
        kind: 'text',
        id: 'ch9-s5-bernoulli',
        title: 'Hoeffding pour une loi de Bernoulli : comparaison avec la loi exacte (Outils §2.5, Fig. 8)',
        text: `Pour $Z_1,\\dots,Z_n$ i.i.d. de Bernoulli de paramètre $p$, $\\sum_iZ_i$ suit une loi binomiale et $\\mathbb P(|n^{-1}\\sum_iZ_i-p|>\\varepsilon)$ se calcule exactement. La Fig. 8 du poly compare cette probabilité à $2e^{-2n\\varepsilon^2}$ pour $p\\in\\{0{,}5;0{,}1\\}$ et $\\varepsilon\\in\\{0{,}25;0{,}05\\}$ : **la borne est d’autant plus pessimiste que $p$ est loin de $1/2$**. La variance $p(1-p)$ est alors petite et Hoeffding, qui ne la voit pas, la remplace par son maximum $1/4$ : « Hoeffding = pire cas de variance ». Les inégalités de **Bennett** et **Bernstein**, qui font intervenir la variance, corrigent ce défaut (hors programme).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 6. Classe finie
  // -------------------------------------------------------------------------
  {
    id: 'ch9-s6-classe-finie',
    title: '6. Classe finie et perte 0-1 : bornes en grande probabilité et en espérance',
    role: 'preuves',
    intro:
      'On combine le Th. 1.2 (erreur d’estimation $\\le$ déviation uniforme), Hoeffding (déviation d’une règle **fixée**) et la **borne de l’union** (passage à toute la classe) pour obtenir des bornes en $\\sqrt{\\log|\\mathcal C|/n}$, **sans hypothèse sur la loi** $\\mathbb P$. En espérance, l’inégalité de **Pisier** fait mieux que l’intégration brute.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch9-union',
        type: 'proposition',
        label: 'Outils §2.6',
        title: 'Borne de l’union',
        source: 'Poly ch.9, Outils §2.6, p. 30',
        hypotheses: ['$(A_j)$ suite finie ou dénombrable d’événements (aucune indépendance requise).'],
        statement: `$$\\mathbb P\\Big(\\bigcup_jA_j\\Big)\\le\\sum_j\\mathbb P(A_j).$$

Application : avec $A_g=\\{|\\widehat{\\mathrm R}_n(g)-R(g)|>\\varepsilon\\}$, $\\mathbb P\\big(\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|>\\varepsilon\\big)=\\mathbb P\\big(\\bigcup_{g\\in\\mathcal C}A_g\\big)\\le\\sum_{g\\in\\mathcal C}\\mathbb P(A_g)$.`,
        proof: [
          {
            text: 'On écrit $\\bigcup_jA_j=\\bigcup_jB_j$ (réunion **disjointe**) avec $B_j=A_j\\setminus\\bigcup_{k<j}A_k$.',
            justification: 'Construction standard ; les $B_j$ sont deux à deux disjoints et ont même réunion.',
          },
          { text: '$\\mathbb P(\\bigcup_jA_j)=\\sum_j\\mathbb P(B_j)\\le\\sum_j\\mathbb P(A_j)$.', justification: '$\\sigma$-additivité, puis croissance de $\\mathbb P$ car $B_j\\subset A_j$.' },
        ],
        pitfalls: ['La borne ne suppose **aucune indépendance** : c’est essentiel, les risques empiriques des différentes règles étant calculés sur le **même échantillon**. Ne pas « multiplier » les probabilités.'],
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-1-5',
        type: 'theoreme',
        label: 'Théorème 1.5',
        title: 'Déviations uniformes sur une classe finie',
        source: 'Poly ch.9, Th. 1.5, p. 18–19',
        hypotheses: ['Classification, perte 0-1.', '$|\\mathcal C|<\\infty$.', '$n\\in\\mathbb N^*$, $\\varepsilon>0$.'],
        statement: `$$\\mathbb P\\Big(\\sup_{g\\in\\mathcal C}\\big\\{\\widehat{\\mathrm R}_n(g)-R(g)\\big\\}>\\varepsilon\\Big)\\le|\\mathcal C|\\,e^{-2n\\varepsilon^2},$$

$$\\mathbb P\\Big(\\sup_{g\\in\\mathcal C}\\big|\\widehat{\\mathrm R}_n(g)-R(g)\\big|>\\varepsilon\\Big)\\le2|\\mathcal C|\\,e^{-2n\\varepsilon^2}.$$`,
        intuition: 'On utilise la **force** de Hoeffding : la loi de Bernoulli de paramètre $R(g_j)$ est inconnue, mais la majoration n’en dépend pas : elle est **uniforme en $j$**. La borne de l’union « paie » un facteur $|\\mathcal C|$ ; comme la queue de Hoeffding est exponentielle, cela ne coûte qu’un $\\log|\\mathcal C|$ après inversion.',
        proof: [
          {
            text: 'Avec $\\mathcal C=\\{g_j\\}_{j=1}^{|\\mathcal C|}$ : $\\mathbb P\\big(\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|>\\varepsilon\\big)\\le\\sum_{j=1}^{|\\mathcal C|}\\mathbb P\\big(|\\widehat{\\mathrm R}_n(g_j)-R(g_j)|>\\varepsilon\\big)$.',
            justification: 'L’événement « sup $>\\varepsilon$ » est la réunion des événements « $|\\widehat{\\mathrm R}_n(g_j)-R(g_j)|>\\varepsilon$ » ; borne de l’union.',
          },
          {
            text: 'Pour chaque $j$, les $\\mathbf{1}_{\\{g_j(\\mathbf X_k)\\ne Y_k\\}}$, $k=1,\\dots,n$, sont indépendantes, à valeurs dans $\\{0,1\\}$, de loi de Bernoulli de paramètre $R(g_j)$, et leur moyenne est $\\widehat{\\mathrm R}_n(g_j)$.',
            justification: 'La règle $g_j$ est **fixée** et les couples $(\\mathbf X_k,Y_k)$ sont i.i.d.',
          },
          { text: 'Chaque terme est majoré par $2e^{-2n\\varepsilon^2}$, d’où la seconde inégalité.', justification: 'Th. 1.3 (Hoeffding bilatéral).' },
          { text: 'La première s’obtient de même avec la déviation unilatérale, majorée par $e^{-2n\\varepsilon^2}$.', justification: 'Th. 1.3, forme unilatérale.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-1-6',
        type: 'theoreme',
        label: 'Théorème 1.6',
        title: 'Contrôle en grande probabilité de l’erreur d’estimation',
        source: 'Poly ch.9, Th. 1.6, p. 19',
        hypotheses: ['Perte à valeurs dans $[0,1]$ (cas de la perte 0-1).', 'Classe $\\mathcal C$ **finie**.', '$\\delta\\in]0,1[$ ; $\\hat g^*_{n,\\mathcal C}$ un MRE.'],
        statement: `Avec une probabilité supérieure à $1-\\delta$,

$$\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})=R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})\\le2\\sqrt{\\frac{\\log(2|\\mathcal C|/\\delta)}{2n}}.$$

Pour une perte à valeurs dans $[0,B]$, on applique le théorème à $\\ell/B$ : la borne est multipliée par $B$.`,
        intuition: 'Dépendance en $|\\mathcal C|$ seulement via $\\log|\\mathcal C|$ (ce qui laisse l’espoir de traiter des classes infinies, §6 fin) ; dépendance en $n$ en $1/\\sqrt n$. Contrôle du type $\\mathbb P(\\mathcal E^{\\mathcal C}_{\\mathrm{est}}\\le\\Delta_{n,\\delta}(\\mathcal C))\\ge1-\\delta$ avec $\\Delta_{n,\\delta}(\\mathcal C)=2\\sqrt{\\log(2|\\mathcal C|/\\delta)/(2n)}$.',
        proof: [
          {
            text: '$\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})\\le2\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$ p.s.',
            justification: 'Th. 1.2, éq. (2).',
          },
          {
            text: 'Avec $\\varepsilon=\\sqrt{\\log(2|\\mathcal C|/\\delta)/(2n)}$, on a $2|\\mathcal C|e^{-2n\\varepsilon^2}=\\delta$, donc $\\mathbb P\\big(\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|\\le\\varepsilon\\big)\\ge1-\\delta$.',
            justification: 'Th. 1.5, dont la preuve n’utilise que : pertes indépendantes et à valeurs dans $[0,1]$ pour $g$ fixée ; passage au complémentaire.',
          },
          {
            text: 'Sur cet événement, $\\mathcal E^{\\mathcal C}_{\\mathrm{est}}(\\hat g^*_{n,\\mathcal C})\\le2\\varepsilon=2\\sqrt{\\log(2|\\mathcal C|/\\delta)/(2n)}$.',
            justification: 'Combinaison des deux points.',
          },
        ],
        pitfalls: [
          'Ne pas oublier le **facteur 2** (venant de (2)) ; c’est $\\log(2|\\mathcal C|/\\delta)$ (bilatéral) et non $\\log(|\\mathcal C|/\\delta)$.',
          'Résultat **sans hypothèse sur $\\mathbb P$** (agnostique), mais qui ne contrôle que l’erreur d’**estimation**, pas l’excès de risque total : cohérent avec le *no free lunch*.',
        ],
      },
      {
        kind: 'example',
        id: 'ch9-ex-zj-sous-gaussiennes',
        title: 'Les déviations Z_j sont sous-gaussiennes de facteur 1/(4n) (p. 20 ; PC9 Ex. 4 Q2a)',
        source: 'Poly ch.9, §1.3, p. 20 ; PC9 Ex. 4 Q2(a)',
        setup: 'Perte 0-1, $\\mathcal C=\\{g_j\\}$ finie, $Z_j:=\\widehat{\\mathrm R}_n(g_j)-R(g_j)$. Montrer que $\\mathbb E[e^{\\lambda Z_j}]\\le e^{\\lambda^2/(8n)}$ pour tout $\\lambda\\in\\mathbb R$.',
        steps: [
          {
            text: '$\\mathbb E[e^{\\lambda Z_j}]=\\mathbb E\\Big[e^{(\\lambda/n)\\sum_{i=1}^n\\{\\mathbf{1}_{\\{g_j(\\mathbf X_i)\\ne Y_i\\}}-R(g_j)\\}}\\Big]=\\Big(\\mathbb E\\Big[e^{(\\lambda/n)\\{\\mathbf{1}_{\\{g_j(\\mathbf X_1)\\ne Y_1\\}}-R(g_j)\\}}\\Big]\\Big)^n$.',
            justification: 'Indépendance et identité de loi des couples $(\\mathbf X_i,Y_i)$ ($g_j$ est fixée).',
          },
          {
            text: 'La variable $\\mathbf{1}_{\\{g_j(\\mathbf X_1)\\ne Y_1\\}}-R(g_j)$ est centrée, à valeurs dans $[-R(g_j),1-R(g_j)]$, intervalle de longueur 1 : $\\mathbb E[e^{(\\lambda/n)\\{\\cdots\\}}]\\le e^{\\lambda^2/(8n^2)}$.',
            justification: 'Lemme de Hoeffding (Lemme 1.1) appliqué au paramètre $\\lambda/n$.',
          },
          {
            text: '$\\mathbb E[e^{\\lambda Z_j}]\\le(e^{\\lambda^2/(8n^2)})^n=e^{\\lambda^2/(8n)}=e^{\\lambda^2\\sigma^2/2}$ avec $\\sigma^2=1/(4n)$.',
            justification: 'Identification du facteur sous-gaussien.',
          },
        ],
        conclusion: 'Les $Z_j$ sont sous-gaussiennes de facteur $\\sigma^2=1/(4n)$, donc $\\sigma=1/(2\\sqrt n)$ : c’est l’ingrédient de la borne en espérance (Th. 1.8). Les $Z_j$ ne sont **pas** indépendantes entre elles (même échantillon), ce que Pisier n’exige pas.',
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-1-7',
        type: 'theoreme',
        label: 'Théorème 1.7',
        title: 'Inégalité de Pisier (espérance d’un maximum de sous-gaussiennes)',
        source: 'Poly ch.9, Th. 1.7, p. 20 (démonstration : Compléments §4.4 ; PC9 Ex. 4 Q1)',
        hypotheses: [
          '$Z_1,\\dots,Z_m$ variables aléatoires réelles.',
          'Sous-gaussiennes de même facteur $\\sigma^2$ : $\\mathbb E[e^{\\lambda Z_i}]\\le e^{\\lambda^2\\sigma^2/2}$ pour tout $\\lambda\\in\\mathbb R$ et tout $i$.',
          '**Aucune indépendance** requise.',
        ],
        statement: '$$\\mathbb E\\Big[\\max_{1\\le i\\le m}|Z_i|\\Big]\\le\\sigma\\sqrt{2\\log(2m)}.$$',
        intuition: 'L’espérance du maximum de $m$ sous-gaussiennes croît seulement comme $\\sqrt{\\log m}$ : majorer $\\mathbb E[\\max]$ par $\\mathbb E[\\sum]$ donnerait une dépendance linéaire en $m$, très pessimiste ; passer par l’exponentielle (Jensen) puis majorer le max des **exponentielles** par leur somme ne coûte qu’un $\\log m$.',
        proof: [
          {
            text: 'Pour $\\lambda>0$ : $e^{\\lambda\\mathbb E[\\max_iZ_i]}\\le\\mathbb E\\big[e^{\\lambda\\max_iZ_i}\\big]$.',
            justification: 'Inégalité de Jensen (Th. 2.2 du ch.2), $t\\mapsto e^{\\lambda t}$ étant convexe.',
          },
          {
            text: '$\\mathbb E\\big[e^{\\lambda\\max_iZ_i}\\big]=\\mathbb E\\big[\\max_ie^{\\lambda Z_i}\\big]\\le\\sum_{i=1}^m\\mathbb E[e^{\\lambda Z_i}]\\le m\\,e^{\\lambda^2\\sigma^2/2}$.',
            justification: '$\\lambda>0$ : l’exponentielle est croissante et positive, le max est majoré par la somme ; linéarité ; hypothèse.',
          },
          {
            text: 'En prenant le log et en divisant par $\\lambda>0$ : $\\mathbb E[\\max_iZ_i]\\le\\frac{\\log m}\\lambda+\\frac{\\lambda\\sigma^2}2$.',
            justification: 'Croissance du logarithme.',
          },
          {
            text: 'Si $m\\ge2$, $\\lambda=\\sqrt{2\\log m}/\\sigma$ donne $\\mathbb E[\\max_iZ_i]\\le\\sigma\\sqrt{2\\log m}$ (si $m=1$, $\\lambda\\to0$ donne $\\mathbb E[Z_1]\\le0$).',
            justification: 'Optimisation en $\\lambda$ (équilibrage des deux termes).',
          },
          {
            text: 'Les $2m$ variables $Z_1,\\dots,Z_m,-Z_1,\\dots,-Z_m$ vérifient l’hypothèse et $\\max_i|Z_i|=\\max(Z_1,\\dots,Z_m,-Z_1,\\dots,-Z_m)$ : $\\mathbb E[\\max_i|Z_i|]\\le\\sigma\\sqrt{2\\log(2m)}$.',
            justification: '$\\mathbb E[e^{\\lambda(-Z_i)}]=\\mathbb E[e^{(-\\lambda)Z_i}]\\le e^{\\lambda^2\\sigma^2/2}$ : c’est là que sert « pour tout $\\lambda\\in\\mathbb R$ » ; on applique le point précédent à $2m$ variables.',
          },
        ],
        pitfalls: ['$\\log(2m)$ (à cause des valeurs absolues) et non $\\log m$.', 'L’indépendance n’est **pas** requise.'],
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-1-8',
        type: 'theoreme',
        label: 'Théorème 1.8',
        title: 'Borne pour le risque intégré (borne en espérance)',
        source: 'Poly ch.9, Th. 1.8, p. 20 ; PC9 Ex. 4 Q2(b)',
        hypotheses: ['Classification, perte 0-1.', '$|\\mathcal C|<\\infty$.', '$\\hat g^*_{n,\\mathcal C}$ un MRE sur $\\mathcal C$.'],
        statement: '$$\\mathbb E\\big[R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})\\big]\\le\\sqrt{\\frac{\\log(2|\\mathcal C|)}{2n}}.$$',
        intuition: 'Même ordre $\\sqrt{\\log|\\mathcal C|/n}$ qu’en grande probabilité, **sans le facteur 2** (grâce à (3)) et sans $\\delta$. L’intégration de la queue $2|\\mathcal C|e^{-2n\\varepsilon^2}$ (Compléments, Lemme 4.1) donnerait $\\sqrt{(1+\\log(2|\\mathcal C|))/(2n)}$, un peu moins bon.',
        proof: [
          {
            text: '$\\mathbb E\\big[R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})\\big]\\le\\mathbb E\\big[\\max_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|\\big]$.',
            justification: 'Th. 1.2, éq. (3) ; la classe étant finie, le sup est un max.',
          },
          {
            text: '$\\mathbb E\\big[\\max_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|\\big]\\le\\frac1{2\\sqrt n}\\sqrt{2\\log(2|\\mathcal C|)}=\\sqrt{\\frac{\\log(2|\\mathcal C|)}{2n}}$.',
            justification: 'Pisier (Th. 1.7) avec $m=|\\mathcal C|$ et $\\sigma=1/(2\\sqrt n)$ (les $Z_j$ sont sous-gaussiennes de facteur $1/(4n)$).',
          },
        ],
        pitfalls: ['Utiliser (2) au lieu de (3) ferait apparaître un facteur 2 inutile.'],
      },
      {
        kind: 'example',
        id: 'ch9-ex-pc9-4',
        title: 'PC9 Ex. 4 Q3–Q4 — Toutes les règles sur un ensemble fini : vote majoritaire et vitesse √(K/n)',
        source: 'PC9 Ex. 4 Q3–Q4 (corrigé p. 14–15) ; Poly ch.9, Th. 1.8',
        setup: 'Classification binaire, $\\mathsf X$ fini de cardinal $K$, $\\mathcal C$ = **toutes** les règles. On note $R^\\star$ le risque bayésien.',
        steps: [
          {
            text: 'Le MRE se calcule **point par point** : $\\hat g^*_n(x)$ est le label majoritaire parmi les $Y_i$ tels que $X_i=x$ (égalité, ou $x$ non observé : on prédit la classe 1).',
            justification: '$\\sum_i\\mathbf{1}_{\\{Y_i\\ne g(X_i)\\}}=\\sum_{x\\in\\mathsf X}\\sum_i\\mathbf{1}_{\\{Y_i\\ne g(x)\\}}\\mathbf{1}_{\\{X_i=x\\}}$ et les valeurs $g(x)$ sont libres dans $\\mathcal C$.',
          },
          {
            text: '$\\inf_{g\\in\\mathcal C}R(g)=R^\\star$ : l’erreur d’approximation est nulle.',
            justification: 'Le classifieur bayésien est une règle, donc appartient à $\\mathcal C$ ; et $R(g)\\ge R^\\star$ pour toute $g$.',
          },
          {
            text: '$|\\mathcal C|=2^K$, donc $\\mathbb P\\big(\\sup_{g\\in\\mathcal C}|R_n(g)-R(g)|>\\varepsilon\\big)\\le2^{K+1}e^{-2n\\varepsilon^2}$.',
            justification: 'Hoeffding pour chaque règle fixée + borne de l’union (Th. 1.5).',
          },
          {
            text: '$\\mathbb E[R(\\hat g^*_n)]-R^\\star\\le\\sqrt{\\frac{\\log(2^{K+1})}{2n}}=\\sqrt{\\frac{(K+1)\\log2}{2n}}$.',
            justification: 'Th. 1.8 avec $|\\mathcal C|=2^K$ (la PC obtient le même ordre par intégration de la queue, avec un découpage en $x$).',
          },
        ],
        conclusion: 'Excès de risque moyen en $O(\\sqrt{K/n})$ : décroît comme $1/\\sqrt n$, croît comme la racine du **logarithme** du cardinal de la classe. Application : $K=10$, $n=10^4$ donne $\\approx0{,}0195$. Quand $\\mathsf X$ est infini, cette borne disparaît : c’est le *no free lunch*.',
      },
      {
        kind: 'theorem',
        id: 'ch9-prop-1-2',
        type: 'proposition',
        label: 'Proposition 1.2',
        title: 'Classifieurs affines : extension à une classe infinie',
        source: 'Poly ch.9, Prop. 1.2, p. 21 (preuve : Compléments §4.6, lemme combinatoire admis ; PC9 Ex. 7)',
        hypotheses: [
          'Classification binaire sur $\\mathsf X=\\mathbb R^d$, perte 0-1 ; la loi de $\\mathbf X$ admet une **densité** par rapport à la mesure de Lebesgue ; $n>d$ ; $\\delta\\in]0,1[$.',
          'Classe des classifieurs affines $\\mathcal C=\\{\\mathbf x\\mapsto2\\mathbf{1}_{\\{\\mathbf a^\\top\\mathbf x+b\\ge0\\}}-1:(\\mathbf a,b)\\in\\mathbb R^d\\times\\mathbb R\\}$.',
          '$\\widehat g_n$ un MRE sur la **classe finie** $\\mathcal C_n\\subset\\mathcal C$, de cardinal au plus $2\\binom nd$, des classifieurs dont l’hyperplan passe par $d$ points de l’ensemble d’apprentissage.',
        ],
        statement: `Avec une probabilité supérieure à $1-\\delta$,

$$R(\\widehat g_n)-\\inf_{g\\in\\mathcal C}R(g)\\le\\frac{2d}n+2\\sqrt{\\frac{\\log\\big(\\big(2\\binom nd+1\\big)/\\delta\\big)}{2(n-d)}}.$$

Comme $\\binom nd\\le n^d$, le membre de droite est, pour $\\delta$ fixé et $n\\ge2d$, d’ordre $\\sqrt{d\\log(n)/n}$.`,
        intuition: 'Les bornes précédentes sont **vides** pour une classe infinie. Mais une classe infinie « de dimension $d$ » se comporte comme une classe finie de taille polynomiale en $n$ ($\\approx n^d$), d’où $\\log|\\mathcal C_n|\\approx d\\log n$. Le terme $2d/n$ vient du lemme combinatoire (pivoter un hyperplan jusqu’à $d$ points ne change la classification que de ces points) et du retrait des $d$ points qui définissent l’hyperplan. Preuve hors programme (§9).',
        pitfalls: ['La Prop. porte sur le MRE **sur $\\mathcal C_n$** (classe finie qui dépend des données), pas sur $\\mathcal C$.', 'Hypothèses : **densité** (points en position générale p.s.) et $n>d$.'],
      },
      {
        kind: 'text',
        id: 'ch9-s6-resume',
        title: 'Résumé : contrôle de l’erreur d’estimation (p. 21)',
        text: `1. **Choisir $\\mathcal C$** : décomposition approximation / estimation, sur-apprentissage, *no free lunch*, validation croisée.
2. **Contrôler $R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})$** : on la majore par la déviation du **processus empirique** $\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$ (Th. 1.2). Perte 0-1, $\\mathcal C$ finie : variables sous-gaussiennes ; grande probabilité par **Hoeffding + union** (Th. 1.6 : $2\\sqrt{\\log(2|\\mathcal C|/\\delta)/(2n)}$), espérance par **Pisier** (Th. 1.8 : $\\sqrt{\\log(2|\\mathcal C|)/(2n)}$) ; extension à une classe infinie (Prop. 1.2 : $\\sqrt{d\\log n/n}$).
3. **Calculer $\\hat g^*_{n,\\mathcal C}$** : section suivante.`,
      },
    ],
  },
]
