import type { CourseSection } from '../types'

/** Sections 6 à 11 : outils (fonction muette, changement de variables, lois Gamma/χ²/Student, Radon–Nikodym), vecteurs gaussiens, Cochran et Gosset, statistiques d'ordre, méthodes et examen, compléments. */
export const coursePart2: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 6. Outils I : transfert, fonction muette, changement de variables, lois usuelles
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s6-outils-chgt',
    title: '6 · Outils I : fonction muette, changement de variables, lois Gamma, χ², Student, Radon–Nikodym',
    role: 'preuves',
    intro:
      'Tout calcul de modèle induit passe par la **méthode de la fonction muette** : on écrit $\\mathbb{E}[h(T)]$ pour une fonction test $h$ quelconque et l’on reconnaît une densité. Pour une transformation régulière, cela donne la **formule du changement de variables** (Prop. 2.1 en dimension 1, Prop. 2.2 en dimension $k$). On rappelle ensuite les lois Gamma, $\\chi^2$ et de Student, et le théorème de Radon–Nikodym qui fonde la notion de modèle dominé.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch1-meth-fonction-muette',
        type: 'methode',
        label: 'Méthode',
        title: 'Transfert et fonction muette',
        source: 'Poly ch.1, Outils « Transfert, fonction muette, changement de variables », p. 23',
        hypotheses: ['$T$ statistique sur $(\\mathsf{Z},\\mathcal{Z},\\mathbb{P})$ à valeurs dans $\\mathsf{T}$ ; $h$ mesurable positive sur $\\mathsf{T}$.'],
        statement: `**Théorème de transfert** : $\\displaystyle\\int_{\\mathsf{T}}h(t)\\,\\mathbb{P}^T(\\mathrm{d}t)=\\int_{\\mathsf{Z}}h\\circ T(z)\\,\\mathbb{P}(\\mathrm{d}z)=\\mathbb{E}[h(T)]$.

**Méthode de la fonction muette** : si l’on trouve une mesure $\\nu$ et une fonction $q\\ge0$ telles que $\\mathbb{E}[h(T)]=\\int h\\,q\\,\\mathrm{d}\\nu$ **pour toute fonction muette $h$** (mesurable positive, ou continue bornée), alors $\\mathbb{P}^T=q\\cdot\\nu$.`,
        intuition: 'On identifie une loi en calculant $\\mathbb{E}[h(T)]$ pour une $h$ arbitraire puis en lisant la densité devant $h$ ; c’est la méthode centrale pour les modèles induits (PC1 Ex. 2, 3 ; Examen 2025 Ex. 2 Q1 ; CC 2022 Ex. 1 Q1 et Ex. 3).',
        pitfalls: ['Il faut bien dire « pour toute $h$ » : c’est ce qui permet d’identifier la densité.', 'Ne pas oublier l’indicatrice du **support** de la loi image (ex. $\\mathbb{1}_{y>0}$ pour $e^X$).'],
      },
      {
        kind: 'theorem',
        id: 'ch1-prop-2-1',
        type: 'proposition',
        label: 'Proposition 2.1',
        title: 'Changement de variables, dimension 1',
        source: 'Poly ch.1, Outils, Prop. 2.1, p. 24',
        hypotheses: ['$I$ intervalle ouvert de $\\mathbb{R}$ ; $X$ v.a. réelle de loi $p\\cdot\\mathrm{Leb}$ avec $\\int_Ip\\,\\mathrm{d}\\mathrm{Leb}=1$.', '$\\phi:I\\to\\mathbb{R}$ de classe $\\mathcal{C}^1$ avec $\\phi\'(x)\\ne0$ pour tout $x\\in I$.'],
        statement: `$\\phi$ est strictement monotone, $J:=\\phi(I)$ est un intervalle ouvert, $\\phi^{-1}:J\\to I$ est $\\mathcal{C}^1$, et la loi de $Y:=\\phi(X)$ est $q\\cdot\\mathrm{Leb}$ avec

$$q(y)=\\mathbb{1}_J(y)\\,p\\big(\\phi^{-1}(y)\\big)\\,\\big|(\\phi^{-1})\'(y)\\big|=\\mathbb{1}_J(y)\\,\\frac{p\\big(\\phi^{-1}(y)\\big)}{\\big|\\phi\'\\big(\\phi^{-1}(y)\\big)\\big|}.$$`,
        intuition: 'La densité se transporte en tenant compte de la dilatation locale $|(\\phi^{-1})\'|$ : là où $\\phi$ étire, la densité de $Y$ baisse.',
        proof: [
          { text: 'Soit $h$ mesurable positive. Par le théorème de transfert, $\\mathbb{E}[h(\\phi(X))]=\\int_Ih(\\phi(x))\\,p(x)\\,\\mathrm{d}x$.', justification: 'Théorème de transfert.' },
          { text: '$\\phi$ est un $\\mathcal{C}^1$-difféomorphisme de $I$ sur $J$ ; changement de variable $x=\\phi^{-1}(y)$, $\\mathrm{d}x=|(\\phi^{-1})\'(y)|\\,\\mathrm{d}y$ : $\\mathbb{E}[h(Y)]=\\int_Jh(y)\\,p(\\phi^{-1}(y))\\,|(\\phi^{-1})\'(y)|\\,\\mathrm{d}y$.', justification: 'Changement de variable dans l’intégrale de Lebesgue ($\\phi\'$ ne s’annule pas, donc $\\phi$ strictement monotone).' },
          { text: 'L’égalité vaut pour toute $h$ : la densité de $Y$ est $q$ (fonction muette). Enfin $(\\phi^{-1})\'(y)=1/\\phi\'(\\phi^{-1}(y))$.', justification: 'Identification ; dérivation de $\\phi\\circ\\phi^{-1}=\\mathrm{id}_J$.' },
        ],
        pitfalls: ['Oublier la **valeur absolue** (si $\\phi$ est décroissante, $(\\phi^{-1})\'<0$) ou l’**indicatrice** du support $J$ : les deux erreurs classiques du corrigé de la PC1 Ex. 2.'],
      },
      {
        kind: 'example',
        id: 'ch1-ex-2-1-2-2',
        title: 'Exemples 2.1–2.2 — Translation-échelle ; une transformation non injective (x ↦ x²)',
        source: 'Poly ch.1, Outils, Ex. 2.1 et Ex. 2.2, p. 24 ; PC1 Ex. 2',
        setup: '(a) $X$ de densité $p$ sur $\\mathbb{R}$, $\\phi(x)=a+bx$, $b\\ne0$. (b) $X\\sim\\mathcal{N}(0,1)$, $\\phi(x)=x^2$ (non injective).',
        steps: [
          { text: '(a) $\\phi^{-1}(y)=(y-a)/b$, $|(\\phi^{-1})\'|=1/|b|$ : $Y=a+bX$ a pour densité $q(y)=\\frac1{|b|}\\,p\\big(\\frac{y-a}b\\big)$. Pour $X\\sim\\mathcal{N}(0,1)$ on retrouve $\\mathcal{N}(a,b^2)$.', justification: 'Prop. 2.1 ; c’est le calcul de la PC1 Ex. 2 coordonnée par coordonnée : modèle induit par $(a_1+b_1X_1,\\dots,a_n+b_nX_n)$ de densité $\\prod_i|b_i|^{-1}p_\\theta\\big(\\frac{y_i-a_i}{b_i}\\big)$.' },
          { text: '(b) On découpe $\\mathbb{R}^*$ en $]-\\infty,0[$ et $]0,+\\infty[$, où $\\phi$ est un difféomorphisme sur $]0,+\\infty[$, de réciproques $x=\\mp\\sqrt y$ et $|(\\phi^{-1})\'(y)|=\\frac1{2\\sqrt y}$. On **somme** les deux contributions : pour $y>0$, $q(y)=2\\times\\frac1{2\\sqrt y}\\frac1{\\sqrt{2\\pi}}e^{-y/2}=\\frac1{\\sqrt{2\\pi y}}e^{-y/2}$.', justification: 'Changement de variable par morceaux ; les deux contributions sont égales par parité de la densité gaussienne.' },
          { text: 'On reconnaît la densité de $\\chi^2(1)=\\mathrm{Gamma}(1/2,1/2)$ (Prop. 2.8).', justification: '$\\Gamma(1/2)=\\sqrt\\pi$ donne $\\frac{(1/2)^{1/2}}{\\Gamma(1/2)}=\\frac1{\\sqrt{2\\pi}}$.' },
        ],
        conclusion: 'Deux pièges : la valeur absolue $|b|$ (indispensable si $b<0$) et $b\\ne0$ (sinon $a+bX=a$ est constante, sans densité, $\\Theta=(\\mathbb{R}\\times\\mathbb{R}^*)^n$ dans la PC1 Ex. 2). Pour une transformation non injective, découper puis sommer.',
      },
      {
        kind: 'theorem',
        id: 'ch1-prop-2-2',
        type: 'proposition',
        label: 'Proposition 2.2',
        title: 'Changement de variables, dimension k',
        source: 'Poly ch.1, Outils, Prop. 2.2 et Ex. 2.3, p. 24–25 (rappel de l’énoncé de la PC1 Ex. 2)',
        hypotheses: ['$O$ ouvert de $\\mathbb{R}^k$ ; $X\\sim p\\cdot\\mathrm{Leb}^{\\otimes k}$ avec $\\int_Op\\,\\mathrm{d}\\mathrm{Leb}^{\\otimes k}=1$.', '$\\phi:O\\to\\mathbb{R}^k$ continûment différentiable, **injective** sur $O$, de jacobien ne s’annulant pas sur $O$ (de façon équivalente, $\\mathcal{C}^1$-difféomorphisme de $O$ sur $\\phi(O)$).'],
        statement: `La loi de $\\phi(X)$ est $q\\cdot\\mathrm{Leb}^{\\otimes k}$ avec

$$q(u)=\\mathbb{1}_{\\phi(O)}(u)\\,p\\big(\\phi^{-1}(u)\\big)\\,\\big|\\mathrm{Det}\\,J_{\\phi^{-1}}(u)\\big|,\\qquad\\mathrm{Det}\\,J_{\\phi^{-1}}(u)=\\frac1{\\mathrm{Det}\\,J_\\phi\\big(\\phi^{-1}(u)\\big)}.$$

**Exemple 2.3 (affine)** : $\\phi(x)=Ax+b$, $A$ inversible : $q(u)=\\frac1{|\\mathrm{Det}\\,A|}\\,p\\big(A^{-1}(u-b)\\big)$. Pour $A=\\mathrm{diag}(b_1,\\dots,b_k)$, produit des formules de translation-échelle ; pour $X\\sim\\mathcal{N}(0,\\mathrm{I}_k)$, c’est ce calcul qui donne la densité de $\\mathcal{N}(b,AA^\\top)$ (Prop. 2.7).`,
        intuition: 'Même preuve qu’en dimension 1 (transfert, formule du changement de variables dans les intégrales multiples, identification) : le jacobien mesure la dilatation locale des volumes.',
        pitfalls: ['Jacobien de la **réciproque** (ou inverse du jacobien de $\\phi$ au point $\\phi^{-1}(u)$).', 'Exemples d’examen : espacements des statistiques d’ordre, transformation linéaire triangulaire de jacobien $n!$ (PC3 Ex. 5, CC 2022 Ex. 3) ; $(z,y)\\mapsto(z,y+z^2/n)$ de jacobien 1 (PC1 Ex. 3 complément).'],
      },
      {
        kind: 'text',
        id: 'ch1-s6-lois-usuelles',
        title: 'Rappel — Lois usuelles de la semaine (Outils, p. 25)',
        text: `- **Bernoulli** $\\mathcal{B}\\mathrm{er}(\\theta)$ sur $\\{0,1\\}$, $\\mathbb{P}(\\{1\\})=\\theta$ ; **binomiale** $\\mathrm{Bin}(n,\\theta)$, $\\mathbb{P}(\\{k\\})=\\binom nk\\theta^k(1-\\theta)^{n-k}$.
- **Gaussienne** $\\mathcal{N}(\\mu,\\sigma^2)$, densité $(2\\pi\\sigma^2)^{-1/2}\\exp(-(x-\\mu)^2/(2\\sigma^2))$.
- **Exponentielle** de paramètre $\\lambda>0$ : densité $\\lambda e^{-\\lambda x}\\mathbb{1}_{\\mathbb{R}_+}(x)$, moyenne $1/\\lambda$. **Absence de mémoire** : $\\mathbb{P}_\\lambda(X\\ge a+b\\mid X\\ge a)=\\mathbb{P}_\\lambda(X\\ge b)$.
- **Gamma** : $\\mathrm{Gamma}(p)$ de densité $f_p(x)=\\frac1{\\Gamma(p)}e^{-x}x^{p-1}$, $x>0$ ; $\\mathrm{Gamma}(p,\\lambda)$ est la loi de $Z/\\lambda$, $Z\\sim\\mathrm{Gamma}(p)$, de densité $f_{p,\\lambda}(x)=\\frac{\\lambda^p}{\\Gamma(p)}e^{-\\lambda x}x^{p-1}$ ; $\\mathcal{E}(\\lambda)=\\mathrm{Gamma}(1,\\lambda)$ ; **additivité** : $X_i$ indépendantes $\\mathrm{Gamma}(p_i,\\lambda)$ $\\Rightarrow$ $\\sum_iX_i\\sim\\mathrm{Gamma}(\\sum_ip_i,\\lambda)$.
- **Poisson** $\\mathcal{P}\\mathrm{oi}(\\lambda)$ sur $\\mathbb{N}$, $p_\\lambda(k)=e^{-\\lambda}\\lambda^k/k!$ ; moyenne et variance $\\lambda$ ; somme de deux Poisson indépendantes : $\\mathcal{P}\\mathrm{oi}(\\lambda_1+\\lambda_2)$ (PC1 Ex. 5, par les fonctions génératrices).

**Piège de convention** : le poly, la PC1 et l’Examen 2025 paramètrent exponentielle et Gamma par l’**intensité** ($\\mathbb{E}=p/\\lambda$, $\\chi^2(\\nu)=\\mathrm{Gamma}(\\nu/2,1/2)$) ; le CC 2022 (et PC3 Ex. 5, PC4 Ex. 1, PC5 Ex. 1) par l’**échelle** ($\\theta^{-1}e^{-x/\\theta}$, $\\mathbb{E}=p\\theta$, $\\chi^2(n)=\\mathrm{Gamma}(n/2,2)$). Toujours relire l’en-tête du sujet et écrire la densité utilisée.`,
      },
      {
        kind: 'theorem',
        id: 'ch1-gamma-fn',
        type: 'proposition',
        label: 'Rappel (Outils)',
        title: 'Fonction Gamma ; moments et fonction caractéristique des lois Gamma',
        source: 'Poly ch.1, Outils, p. 30–31',
        hypotheses: ['$\\alpha>0$ ; $Z\\sim\\mathrm{Gamma}(p)$, $X=Z/\\lambda\\sim\\mathrm{Gamma}(p,\\lambda)$.'],
        statement: `$\\Gamma(\\alpha):=\\int_0^{+\\infty}y^{\\alpha-1}e^{-y}\\,\\mathrm{d}y$ converge ; $\\Gamma(1)=1$, $\\Gamma(\\alpha)=(\\alpha-1)\\Gamma(\\alpha-1)$ pour $\\alpha>1$, $\\Gamma(n)=(n-1)!$, $\\Gamma(1/2)=\\sqrt\\pi$.

Moments : pour $r>-p$, $\\mathbb{E}[Z^r]=\\frac{\\Gamma(p+r)}{\\Gamma(p)}$ (et $+\\infty$ si $r\\le-p$) ; $\\mathbb{E}[Z]=p$, $\\mathrm{Var}(Z)=p$ ; $\\mathbb{E}[X]=p/\\lambda$, $\\mathrm{Var}(X)=p/\\lambda^2$, et pour $p>1$, $\\mathbb{E}[1/X]=\\lambda/(p-1)$. Fonction caractéristique : $\\phi_{p,\\lambda}(t)=(1-it/\\lambda)^{-p}$, d’où l’additivité.

*Application (p. 31)* : pour $\\hat\\theta_{n,1}=1/\\bar X_n$ dans le modèle exponentiel, $\\sum_iX_i\\sim\\mathrm{Gamma}(n,\\theta)$ et $\\mathbb{E}_\\theta[\\hat\\theta_{n,1}]=n\\theta\\,\\Gamma(n-1)/\\Gamma(n)=\\frac n{n-1}\\theta$ : l’EMV de l’intensité est **biaisé**.`,
        intuition: 'La fonction Gamma est la constante de normalisation de $f_p$ ; l’intégration par parties donne la récurrence ; le changement de variable $y=x^2/2$ relie $\\Gamma(1/2)$ à l’intégrale gaussienne.',
        proof: [
          { text: 'Convergence : intégrande $\\sim y^{\\alpha-1}$ en $0$ (intégrable car $\\alpha>0$), décroissance exponentielle à l’infini.', justification: 'Comparaison d’intégrales.' },
          { text: '$\\Gamma(\\alpha)=\\big[-y^{\\alpha-1}e^{-y}\\big]_0^{+\\infty}+(\\alpha-1)\\int_0^{+\\infty}y^{\\alpha-2}e^{-y}\\,\\mathrm{d}y=(\\alpha-1)\\Gamma(\\alpha-1)$, puis $\\Gamma(n)=(n-1)!$ par récurrence.', justification: 'Intégration par parties ; $\\Gamma(1)=1$.' },
          { text: '$\\Gamma(1/2)=\\sqrt2\\int_0^{+\\infty}e^{-x^2/2}\\,\\mathrm{d}x=\\sqrt\\pi$.', justification: 'Changement de variable $y=x^2/2$ et intégrale de la densité gaussienne réduite.' },
          { text: '$\\mathbb{E}[Z^r]=\\frac1{\\Gamma(p)}\\int_0^{+\\infty}x^{r+p-1}e^{-x}\\,\\mathrm{d}x=\\frac{\\Gamma(p+r)}{\\Gamma(p)}$ si $r+p>0$.', justification: 'Transfert et définition de $\\Gamma$.' },
          { text: 'Pour $s<\\lambda$ réel, $\\mathbb{E}[e^{sX}]=(1-s/\\lambda)^{-p}$ (changement de variable $u=(\\lambda-s)x$) ; les deux membres sont holomorphes sur $\\{\\mathrm{Re}(s)<\\lambda\\}$, d’où la fonction caractéristique en $s=it$ ; la f.c. d’une somme indépendante est le produit, $(1-it/\\lambda)^{-\\sum p_i}$.', justification: 'Prolongement analytique ; indépendance ; la f.c. caractérise la loi.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-def-11-prop-2-8',
        type: 'definition',
        label: 'Définition 11 et Proposition 2.8',
        title: 'Loi du χ² ; le χ² est une loi Gamma',
        source: 'Poly ch.1, Outils, Déf. 11 et Prop. 2.8, p. 31',
        hypotheses: ['$\\nu\\in\\mathbb{N}^*$ ; $X_1,\\dots,X_\\nu$ **indépendantes** de loi $\\mathcal{N}(0,1)$.'],
        statement: `La loi de $U=\\sum_{i=1}^\\nu X_i^2$ est la **loi du $\\chi^2$ (centrée) à $\\nu$ degrés de liberté**, notée $\\chi^2(\\nu)$ ; convention $\\chi^2(0)=\\delta_0$.

**Prop. 2.8.** (i) Pour $X\\sim\\mathcal{N}(0,1)$, $X^2\\sim\\mathrm{Gamma}(1/2,1/2)$. (ii) $\\chi^2(\\nu)=\\mathrm{Gamma}(\\nu/2,1/2)$ : densité $f_\\nu(x)=\\frac1{2^{\\nu/2}\\Gamma(\\nu/2)}x^{\\nu/2-1}e^{-x/2}\\mathbb{1}_{\\mathbb{R}_+^*}(x)$ ; $\\mathbb{E}[U]=\\nu$, $\\mathrm{Var}(U)=2\\nu$.`,
        intuition: 'Carré de la norme d’un vecteur gaussien standard de dimension $\\nu$. Dans la convention « échelle » du CC 2022, $\\chi^2(n)=\\mathrm{Gamma}(n/2,2)$.',
        proof: [
          { text: '(i) Pour $h$ mesurable positive, par parité puis changement de variable $u=x^2$ sur $\\mathbb{R}_+^*$ : $\\mathbb{E}[h(X^2)]=2\\int_0^{+\\infty}h(x^2)\\frac{e^{-x^2/2}}{\\sqrt{2\\pi}}\\,\\mathrm{d}x=\\int_0^{+\\infty}h(u)\\frac1{\\sqrt{2\\pi}}u^{-1/2}e^{-u/2}\\,\\mathrm{d}u$, et $\\frac1{\\sqrt{2\\pi}}=\\frac{(1/2)^{1/2}}{\\Gamma(1/2)}$ : densité $f_{1/2,1/2}$.', justification: 'Fonction muette ; $\\mathrm{d}x=\\mathrm{d}u/(2\\sqrt u)$ ; $\\Gamma(1/2)=\\sqrt\\pi$.' },
          { text: '(ii) $X_1^2,\\dots,X_\\nu^2$ indépendantes $\\mathrm{Gamma}(1/2,1/2)$ : leur somme suit $\\mathrm{Gamma}(\\nu/2,1/2)$.', justification: 'Additivité des lois Gamma de même intensité $1/2$.' },
          { text: '$\\mathbb{E}[U]=\\sum_i\\mathbb{E}[X_i^2]=\\nu$ ; $\\mathrm{Var}(U)=\\nu\\,\\mathrm{Var}(X_1^2)=\\nu(\\mathbb{E}[X_1^4]-1)=\\nu(3-1)=2\\nu$.', justification: 'Indépendance ; moments gaussiens $\\mathbb{E}[X^4]=3$ (Déf. 8).' },
        ],
        pitfalls: ['Moments utiles aux annales : $\\mathbb{E}[(\\chi^2_{n-1})^2]=(n-1)^2+2(n-1)$, d’où $\\mathbb{E}[S_n^4]=\\sigma^4(1+\\frac2{n-1})$ (CC 2022 Ex. 2 Q1(c)).'],
      },
      {
        kind: 'theorem',
        id: 'ch1-def-12-student',
        type: 'definition',
        label: 'Définition 12',
        title: 'Loi de Student à r degrés de liberté',
        source: 'Poly ch.1, Outils, Déf. 12, p. 32',
        hypotheses: ['$r\\in\\mathbb{N}^*$ ; $X\\sim\\mathcal{N}(0,1)$ et $Y\\sim\\chi^2(r)$ **indépendantes**.'],
        statement: `La loi de $T=\\dfrac{X}{\\sqrt{Y/r}}$ est la **loi de Student à $r$ degrés de liberté**, notée $t(r)$ ($Y>0$ p.s.). Densité (résultat cité, preuve en annexe) :

$$f_r(t)=\\frac{\\Gamma\\big(\\frac{r+1}2\\big)}{\\Gamma\\big(\\frac r2\\big)\\sqrt{r\\pi}}\\Big(1+\\frac{t^2}r\\Big)^{-\\frac{r+1}2},\\qquad t\\in\\mathbb{R}.$$

Propriétés : densité symétrique, décroissance **polynomiale** (queues plus lourdes que la gaussienne) ; $r=1$ : loi de **Cauchy** $1/(\\pi(1+t^2))$, sans espérance ; $t(r)\\to\\mathcal{N}(0,1)$ quand $r\\to+\\infty$ car $Y/r\\to1$ en probabilité (loi des grands nombres).`,
        intuition: 'C’est la loi de la statistique de Student $T_n=\\sqrt n(\\bar X_n-\\mu)/S_n$ dans Gosset (iv), avec $r=n-1$ : la quantité pivotale des intervalles de confiance et des tests sur une moyenne gaussienne à variance inconnue.',
        pitfalls: ['L’**indépendance** de $X$ et $Y$ est indispensable : c’est exactement ce que fournit Gosset (iii).', 'Sous $H_1$ ($\\mu\\ne\\mu_0$), $\\sqrt n(\\bar X_n-\\mu_0)/S_n$ suit une Student **décentrée** (PC4 Ex. 2 Q6).'],
      },
      {
        kind: 'theorem',
        id: 'ch1-thm-2-1-rn',
        type: 'theoreme',
        label: 'Définitions 13–14 et Théorème 2.1',
        title: 'Tribu borélienne, mesure à densité, absolue continuité, Radon–Nikodym',
        source: 'Poly ch.1, Outils « Compléments de théorie de la mesure », Déf. 13, Déf. 14, Thm 2.1, p. 33–34',
        hypotheses: ['$(E,\\mathcal{E})$ espace mesurable ; $\\mu$ mesure **$\\sigma$-finie** sur $E$ ($E$ réunion dénombrable d’ensembles de $\\mu$-mesure finie : Lebesgue, comptage sur un dénombrable, toute mesure finie).', '$\\nu$ mesure **absolument continue** par rapport à $\\mu$ ($\\nu\\ll\\mu$ : $\\mu(B)=0\\Rightarrow\\nu(B)=0$).'],
        statement: `**Déf. 13.** La tribu engendrée par $C\\subset\\mathcal{P}(E)$ est l’intersection $\\sigma(C)$ de toutes les tribus contenant $C$ ; pour un espace topologique, $\\sigma(\\text{ouverts})=\\mathcal{B}(E)$ (tribu borélienne). $\\mathcal{B}(\\mathbb{R}^d)=\\mathcal{B}(\\mathbb{R})^{\\otimes d}$ et **toute application continue est borélienne**.

**Déf. 14.** Pour $f$ mesurable positive, $\\nu=f\\cdot\\mu:B\\mapsto\\int_Bf\\,\\mathrm{d}\\mu$ est une mesure (**de densité $f$ par rapport à $\\mu$**), et $\\int h\\,\\mathrm{d}\\nu=\\int hf\\,\\mathrm{d}\\mu$ ; elle vérifie $\\nu\\ll\\mu$.

**Thm 2.1 (Radon–Nikodym, admis).** Il existe $f$ mesurable positive, unique à un ensemble $\\mu$-négligeable près, telle que $\\nu=f\\cdot\\mu$ ; $f=\\frac{\\mathrm{d}\\nu}{\\mathrm{d}\\mu}$. De plus (i) $f$ est $\\mu$-p.p. finie ssi $\\nu$ est $\\sigma$-finie ; (ii) $f$ est $\\mu$-intégrable ssi $\\nu$ est finie.

**Conséquence** : une loi $\\mathbb{P}$ admet une densité par rapport à $\\mu$ ssi $\\mathbb{P}\\ll\\mu$ ; le modèle $(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})$ est dominé par $\\mu$ ssi $\\mathbb{P}\\ll\\mu$ pour toute $\\mathbb{P}\\in\\mathcal{C}$.`,
        intuition: 'Exemples : $\\mathcal{N}(m,\\sigma^2)$ ($\\sigma^2>0$) et $\\mathrm{Leb}$ sont absolument continues l’une par rapport à l’autre (densité $>0$) ; $\\delta_a\\not\\ll\\mathrm{Leb}$ car $\\mathrm{Leb}(\\{a\\})=0$ et $\\delta_a(\\{a\\})=1$ : une gaussienne dégénérée n’a pas de densité.',
        pitfalls: ['La densité n’est définie qu’à un ensemble négligeable près ; le cours utilise toujours les **versions continues** (remarque experte des Compléments).'],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 7. Outils II : vecteurs gaussiens
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s7-gaussiens',
    title: '7 · Outils II : lois gaussiennes et vecteurs gaussiens',
    role: 'preuves',
    intro:
      'Tout le calcul gaussien découle de la fonction caractéristique $\\exp(it^\\top\\mu-\\frac12t^\\top\\Sigma t)$ : stabilité par transformation affine ($AX+b\\sim\\mathcal{N}(A\\mu+b,A\\Sigma A^\\top)$), **décorrélation $\\Leftrightarrow$ indépendance** dans un vecteur gaussien, densité quand $\\Sigma$ est inversible, formes quadratiques $\\chi^2$. Ce sont les briques des théorèmes de Cochran et de Gosset.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch1-def-8-9',
        type: 'definition',
        label: 'Définitions 8–9',
        title: 'Lois gaussiennes réduite et N(μ, σ²) ; moments',
        source: 'Poly ch.1, Outils, Déf. 8 et Déf. 9, p. 25–26',
        hypotheses: ['$\\mu\\in\\mathbb{R}$, $\\sigma^2\\ge0$.'],
        statement: `$X\\sim\\mathcal{N}(0,1)$ si sa densité par rapport à $\\mathrm{Leb}$ est $g(x)=\\frac1{\\sqrt{2\\pi}}e^{-x^2/2}$ ; fonction caractéristique $\\varphi(t)=e^{-t^2/2}$ ; moments impairs nuls et $\\mathbb{E}[X^{2k}]=\\frac{(2k)!}{2^kk!}=1\\times3\\times\\dots\\times(2k-1)$, en particulier $\\mathbb{E}[X^2]=1$, $\\mathbb{E}[X^4]=3$.

$X\\sim\\mathcal{N}(\\mu,\\sigma^2)$ si $X$ a même loi que $\\sigma X_r+\\mu$ avec $X_r\\sim\\mathcal{N}(0,1)$, $\\sigma=\\sqrt{\\sigma^2}$ ; alors $\\mathbb{E}[X]=\\mu$, $\\mathrm{Var}(X)=\\sigma^2$ et $\\varphi_{\\mu,\\sigma^2}(t)=\\exp(i\\mu t-\\sigma^2t^2/2)$. **Convention** : $\\sigma^2=0$ autorisé, $\\mathcal{N}(\\mu,0)=\\delta_\\mu$ (gaussienne **dégénérée**) ; la densité $g_{\\mu,\\sigma^2}(x)=\\frac1{\\sigma\\sqrt{2\\pi}}e^{-(x-\\mu)^2/(2\\sigma^2)}$ n’existe que pour $\\sigma^2>0$.`,
        intuition: 'Définir la gaussienne par transformation affine permet d’inclure le cas dégénéré, indispensable pour les projections de Cochran ($\\mathcal{N}(P_F\\mu,\\sigma^2P_F)$ n’a pas de densité).',
        proof: [
          { text: '$\\varphi$ est dérivable et, par intégration par parties avec $xg(x)=-g\'(x)$, $\\varphi\'(t)=-t\\varphi(t)$, $\\varphi(0)=1$ : $\\varphi(t)=e^{-t^2/2}$.', justification: 'Dérivation sous le signe intégral (domination par $|x|g(x)$).' },
          { text: '$\\varphi^{(k)}(0)=i^k\\mathbb{E}[X^k]$ et le développement $e^{-t^2/2}=\\sum_k(-1)^kt^{2k}/(2^kk!)$ donnent les moments par identification.', justification: 'Série entière de la fonction caractéristique.' },
          { text: '$\\mathbb{E}[e^{it(\\sigma X_r+\\mu)}]=e^{i\\mu t}\\varphi(\\sigma t)$ ; densité de $\\sigma X_r+\\mu$ par l’Ex. 2.1.', justification: 'Linéarité ; changement de variable affine.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-lem-2-1',
        type: 'lemme',
        label: 'Lemme 2.1',
        title: 'Stabilité de la famille gaussienne',
        source: 'Poly ch.1, Outils, Lemme 2.1, p. 26',
        hypotheses: ['(i) $X\\sim\\mathcal{N}(\\mu,\\sigma^2)$, $a,b\\in\\mathbb{R}$.', '(ii) $X_1,\\dots,X_n$ **indépendantes**, $X_j\\sim\\mathcal{N}(\\mu_j,\\sigma_j^2)$.'],
        statement: '(i) $aX+b\\sim\\mathcal{N}(a\\mu+b,a^2\\sigma^2)$. (ii) $X_1+\\dots+X_n\\sim\\mathcal{N}(\\mu_1+\\dots+\\mu_n,\\sigma_1^2+\\dots+\\sigma_n^2)$.',
        intuition: 'Conséquence immédiate : un vecteur à coordonnées gaussiennes **indépendantes** est gaussien ; $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$ pour un échantillon gaussien.',
        proof: [
          { text: '(i) $\\mathbb{E}[e^{it(aX+b)}]=e^{itb}\\varphi_{\\mu,\\sigma^2}(at)=\\exp\\big(i(a\\mu+b)t-a^2\\sigma^2t^2/2\\big)$.', justification: 'Fonction caractéristique de $\\mathcal{N}(a\\mu+b,a^2\\sigma^2)$.' },
          { text: '(ii) $\\mathbb{E}[e^{it\\sum_jX_j}]=\\prod_j\\varphi_{\\mu_j,\\sigma_j^2}(t)=\\exp\\big(it\\sum_j\\mu_j-t^2\\sum_j\\sigma_j^2/2\\big)$.', justification: 'Par **indépendance**, la f.c. d’une somme est le produit des f.c.' },
          { text: 'Dans les deux cas, la fonction caractéristique caractérise la loi.', justification: 'Théorème d’injectivité de la transformée de Fourier.' },
        ],
        pitfalls: ['(ii) exige l’**indépendance** : sans elle, une somme de gaussiennes peut ne pas être gaussienne (Remarque après Prop. 2.6).'],
      },
      {
        kind: 'theorem',
        id: 'ch1-def-10-prop-2-3',
        type: 'definition',
        label: 'Définition 10 et Proposition 2.3',
        title: 'Vecteur gaussien ; fonction caractéristique',
        source: 'Poly ch.1, Outils, Déf. 10 et Prop. 2.3, p. 26–27',
        hypotheses: ['$X=(X_1,\\dots,X_n)^\\top$ vecteur aléatoire de $\\mathbb{R}^n$ ; $\\mu\\in\\mathbb{R}^n$ ; $\\Sigma$ symétrique semi-définie positive.'],
        statement: `$X$ est **gaussien** si, pour tout $t\\in\\mathbb{R}^n$, la v.a. réelle $t^\\top X$ est gaussienne, **éventuellement dégénérée**. Alors chaque $X_i$ est de carré intégrable ; avec $\\mu:=\\mathbb{E}[X]$ et $\\Sigma:=\\mathbb{E}[(X-\\mu)(X-\\mu)^\\top]$, $t^\\top X\\sim\\mathcal{N}(t^\\top\\mu,t^\\top\\Sigma t)$ ; on note $X\\sim\\mathcal{N}(\\mu,\\Sigma)$. Un vecteur à coordonnées gaussiennes indépendantes est gaussien (Lemme 2.1) ; si $Z_1,\\dots,Z_n$ i.i.d. $\\mathcal{N}(0,1)$, $Z\\sim\\mathcal{N}(0,\\mathrm{I}_n)$.

**Prop. 2.3.** $X\\sim\\mathcal{N}(\\mu,\\Sigma)$ si et seulement si, pour tout $t\\in\\mathbb{R}^n$,

$$\\mathbb{E}\\big[e^{it^\\top X}\\big]=\\exp\\Big(it^\\top\\mu-\\frac12t^\\top\\Sigma t\\Big).$$

En particulier la loi d’un vecteur gaussien est déterminée par son espérance et sa covariance.`,
        intuition: 'Gaussien = toutes les projections unidimensionnelles sont gaussiennes. $\\Sigma$ est semi-définie positive ($t^\\top\\Sigma t=\\mathrm{Var}(t^\\top X)\\ge0$) mais pas nécessairement inversible.',
        proof: [
          { text: '($\\Rightarrow$) $t^\\top X\\sim\\mathcal{N}(t^\\top\\mu,t^\\top\\Sigma t)$ et l’on évalue en $1$ la f.c. de cette loi réelle.', justification: 'Déf. 9 et Déf. 10 ; linéarité de l’espérance et de la variance d’une forme linéaire : $\\mathrm{Var}(t^\\top X)=\\sum_{i,j}t_it_j\\mathrm{Cov}(X_i,X_j)=t^\\top\\Sigma t$.' },
          { text: '($\\Leftarrow$) Appliquer la formule au vecteur $ut$, $u\\in\\mathbb{R}$ : $\\mathbb{E}[e^{iu(t^\\top X)}]=\\exp(iu\\,t^\\top\\mu-\\frac{u^2}2t^\\top\\Sigma t)$, f.c. de $\\mathcal{N}(t^\\top\\mu,t^\\top\\Sigma t)$ ; donc $t^\\top X$ est gaussienne pour tout $t$.', justification: 'La f.c. caractérise la loi.' },
          { text: '$t=e_i$ donne $\\mathbb{E}[X_i]=\\mu_i$ ; $t^\\top\\Sigma\'t=\\mathrm{Var}(t^\\top X)=t^\\top\\Sigma t$ pour tout $t$ entraîne $\\Sigma\'=\\Sigma$.', justification: 'Prendre $t=e_i$ puis $t=e_i+e_j$ (matrices symétriques).' },
        ],
        pitfalls: ['« Chaque coordonnée gaussienne » $\\not\\Rightarrow$ « vecteur gaussien » sans indépendance (contre-exemple après Prop. 2.6).'],
      },
      {
        kind: 'theorem',
        id: 'ch1-prop-2-4',
        type: 'proposition',
        label: 'Proposition 2.4',
        title: 'Transformation affine d’un vecteur gaussien',
        source: 'Poly ch.1, Outils, Prop. 2.4, p. 27',
        hypotheses: ['$X\\sim\\mathcal{N}(\\mu,\\Sigma)$ vecteur gaussien de $\\mathbb{R}^n$ ; $A$ matrice réelle $m\\times n$ ; $b\\in\\mathbb{R}^m$.'],
        statement: '$$AX+b\\sim\\mathcal{N}\\big(A\\mu+b,\\ A\\Sigma A^\\top\\big).$$',
        intuition: 'Utilisée partout : réduction $(X-\\mu)/\\sigma$, lois des projections $P_FX$ dans Cochran, $\\bar X_n=\\frac1n\\mathbf{1}_n^\\top X$ dans Gosset, $\\hat\\beta=(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top Y$ en régression (CC 2022 Ex. 4 Q2).',
        proof: [
          { text: 'Pour $s\\in\\mathbb{R}^m$, $s^\\top(AX+b)=(A^\\top s)^\\top X+s^\\top b$ est une transformation affine de la gaussienne $(A^\\top s)^\\top X$, donc gaussienne : $AX+b$ est un vecteur gaussien.', justification: 'Déf. 10 et Lemme 2.1 (i).' },
          { text: '$\\mathbb{E}[AX+b]=A\\mu+b$ et $\\mathbb{E}\\big[A(X-\\mu)(X-\\mu)^\\top A^\\top\\big]=A\\Sigma A^\\top$.', justification: 'Linéarité de l’espérance ; la loi gaussienne est déterminée par $(\\mu,\\Sigma)$ (Prop. 2.3).' },
        ],
        pitfalls: ['Ordre des facteurs : la covariance est $A\\Sigma A^\\top$ (taille $m\\times m$), **pas** $A^\\top\\Sigma A$.'],
      },
      {
        kind: 'theorem',
        id: 'ch1-prop-2-5',
        type: 'proposition',
        label: 'Proposition 2.5',
        title: 'Représentation d’un vecteur gaussien : X = AZ + μ',
        source: 'Poly ch.1, Outils, Prop. 2.5, p. 28',
        hypotheses: ['$\\mu\\in\\mathbb{R}^n$ ; $\\Sigma$ symétrique semi-définie positive de rang $k\\ge1$.'],
        statement: 'Il existe $A$ de taille $n\\times k$ telle que $AA^\\top=\\Sigma$, et pour toute telle matrice : (i) si $Z\\sim\\mathcal{N}(0,\\mathrm{I}_k)$ alors $AZ+\\mu\\sim\\mathcal{N}(\\mu,\\Sigma)$ ; (ii) si $X\\sim\\mathcal{N}(\\mu,\\Sigma)$, il existe $Z\\sim\\mathcal{N}(0,\\mathrm{I}_k)$ tel que $X=AZ+\\mu$ p.s. En particulier la loi $\\mathcal{N}(\\mu,\\Sigma)$ **existe** pour tout couple $(\\mu,\\Sigma)$ ($\\Sigma=0$ : $\\delta_\\mu$).',
        intuition: 'Tout vecteur gaussien est une image affine d’un vecteur gaussien standard de dimension égale au rang de $\\Sigma$.',
        proof: [
          { text: '*Existence de $A$* : théorème spectral, base orthonormée $(u_j)$ de vecteurs propres, valeurs propres $\\lambda_1\\ge\\dots\\ge\\lambda_k>0=\\lambda_{k+1}=\\dots$ ; $A=[\\sqrt{\\lambda_1}u_1,\\dots,\\sqrt{\\lambda_k}u_k]$ vérifie $AA^\\top=\\sum_{j\\le k}\\lambda_ju_ju_j^\\top=\\Sigma$.', justification: 'Diagonalisation d’une matrice symétrique.' },
          { text: '(i) $AZ+\\mu\\sim\\mathcal{N}(\\mu,A\\mathrm{I}_kA^\\top)=\\mathcal{N}(\\mu,\\Sigma)$.', justification: 'Prop. 2.4.' },
          { text: '(ii) $\\Sigma$ et $A^\\top$ ont même noyau donc $A$ est de rang $k$, injective, et $A^\\top A$ ($k\\times k$) inversible ; on pose $A^\\#:=(A^\\top A)^{-1}A^\\top$ et $Z:=A^\\#(X-\\mu)\\sim\\mathcal{N}(0,A^\\#\\Sigma(A^\\#)^\\top)=\\mathcal{N}(0,\\mathrm{I}_k)$.', justification: '$AA^\\top y=0\\Rightarrow\\|A^\\top y\\|^2=0$ ; Prop. 2.4 et $A^\\#A=\\mathrm{I}_k$.' },
          { text: '$P:=AA^\\#$ est la projection orthogonale sur $\\mathrm{Im}(A)=\\mathrm{Im}(\\Sigma)=(\\mathrm{Ker}\\,\\Sigma)^\\perp$ ; pour $v\\in\\mathrm{Ker}\\,\\Sigma$, $v^\\top(X-\\mu)$ est centrée de variance $v^\\top\\Sigma v=0$, donc nulle p.s. ; ainsi $X-\\mu\\in\\mathrm{Im}(A)$ p.s. et $AZ+\\mu=P(X-\\mu)+\\mu=X$ p.s.', justification: '$P$ symétrique idempotente ; base finie de $\\mathrm{Ker}\\,\\Sigma$ ; une variable centrée de variance nulle est nulle p.s.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-prop-2-6',
        type: 'proposition',
        label: 'Proposition 2.6',
        title: 'Indépendance et décorrélation dans un vecteur gaussien',
        source: 'Poly ch.1, Outils, Prop. 2.6 et Remarque, p. 28–29',
        hypotheses: ['$X\\sim\\mathcal{N}(\\mu,\\Sigma)$ **vecteur gaussien** de $\\mathbb{R}^n$, découpé en blocs $X=(X_{(1)}^\\top,\\dots,X_{(m)}^\\top)^\\top$ de tailles $n_1+\\dots+n_m=n$ ; $\\Sigma=(\\Sigma_{ij})$ par blocs, $\\Sigma_{ij}=\\mathbb{E}[(X_{(i)}-\\mu_{(i)})(X_{(j)}-\\mu_{(j)})^\\top]$.'],
        statement: 'Les sous-vecteurs $X_{(1)},\\dots,X_{(m)}$ sont (mutuellement) **indépendants si et seulement si $\\Sigma_{ij}=0$ pour tous $i\\ne j$**.',
        intuition: 'Dans un vecteur gaussien, décorrélation $\\Leftrightarrow$ indépendance. C’est l’argument clé de Cochran et de la PC4 Ex. 2 Q4 ($\\bar X_n\\perp S_n^2$ via $\\Pi(\\mathrm{I}_n-\\Pi)=0$).',
        proof: [
          { text: '($\\Rightarrow$) Si indépendants, $\\Sigma_{ij}=\\mathbb{E}[X_{(i)}-\\mu_{(i)}]\\,\\mathbb{E}[X_{(j)}-\\mu_{(j)}]^\\top=0$ pour $i\\ne j$.', justification: 'Indépendance $\\Rightarrow$ espérance du produit = produit des espérances.' },
          { text: '($\\Leftarrow$) Pour $t$ découpé de même, $t^\\top\\mu=\\sum_it_{(i)}^\\top\\mu_{(i)}$ et $t^\\top\\Sigma t=\\sum_it_{(i)}^\\top\\Sigma_{ii}t_{(i)}$ (blocs croisés nuls), donc $\\mathbb{E}[e^{it^\\top X}]=\\prod_i\\exp\\big(it_{(i)}^\\top\\mu_{(i)}-\\frac12t_{(i)}^\\top\\Sigma_{ii}t_{(i)}\\big)=\\prod_i\\mathbb{E}[e^{it_{(i)}^\\top X_{(i)}}]$.', justification: 'Prop. 2.3 ; $X_{(i)}\\sim\\mathcal{N}(\\mu_{(i)},\\Sigma_{ii})$ par Prop. 2.4 (matrice d’extraction du bloc).' },
          { text: 'La f.c. de $X$ est celle de la loi produit des lois des blocs ; la f.c. caractérise la loi : indépendance.', justification: 'Injectivité de la f.c. sur $\\mathbb{R}^n$.' },
        ],
        pitfalls: [
          '**Propre aux vecteurs gaussiens.** Contre-exemple (Remarque p. 29) : $X\\sim\\mathcal{N}(0,1)$, $\\varepsilon$ indépendante avec $\\mathbb{P}(\\varepsilon=\\pm1)=1/2$, $Y=\\varepsilon X$. Alors $Y\\sim\\mathcal{N}(0,1)$, $\\mathrm{Cov}(X,Y)=\\mathbb{E}[\\varepsilon]\\mathbb{E}[X^2]=0$, mais $|Y|=|X|$ : pas indépendantes. Le couple $(X,Y)$ n’est pas gaussien : $X+Y=(1+\\varepsilon)X$ est nulle avec probabilité $1/2$ sans être p.s. constante.',
          'Il faut d’abord établir que le **vecteur concaténé** (ex. $(\\Pi Z,(\\mathrm{I}_n-\\Pi)Z)$) est gaussien, puis conclure de la décorrélation (PC4 Ex. 2 Q4).',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-cor-2-1',
        type: 'corollaire',
        label: 'Corollaire 2.1',
        title: 'Transformations linéaires indépendantes d’un bruit blanc gaussien',
        source: 'Poly ch.1, Outils, Cor. 2.1, p. 29',
        hypotheses: ['$\\sigma>0$, $Z\\sim\\mathcal{N}(0,\\sigma^2\\mathrm{I}_n)$.', '$A_1$ ($m_1\\times n$), $A_2$ ($m_2\\times n$) avec $A_1A_2^\\top=0$.'],
        statement: 'Le vecteur $(A_1Z,A_2Z)$ est gaussien et $A_1Z$, $A_2Z$ sont **indépendants**. En particulier, si $P_1$, $P_2$ sont symétriques (ex. deux projecteurs orthogonaux) avec $P_1P_2=0$, alors $P_1Z$ et $P_2Z$ sont indépendants.',
        intuition: 'Version « prête à l’emploi » de Cochran : deux images linéaires d’un bruit blanc sont indépendantes dès que $A_1A_2^\\top=0$ (sous-espaces orthogonaux). CC 2022 Ex. 4 Q7 : $\\bar Y-\\delta\\hat\\beta_1=v^\\top Y$ avec $v\\in\\mathrm{Vect}(\\mathbf{X})$ est indépendant de $S^2$, fonction de $(\\mathrm{I}-H)Y$.',
        proof: [
          { text: '$(A_1Z,A_2Z)=AZ$ avec $A=\\begin{pmatrix}A_1\\\\A_2\\end{pmatrix}$ : gaussien de covariance $\\sigma^2AA^\\top=\\begin{pmatrix}\\sigma^2A_1A_1^\\top&\\sigma^2A_1A_2^\\top\\\\\\sigma^2A_2A_1^\\top&\\sigma^2A_2A_2^\\top\\end{pmatrix}$, blocs croisés nuls.', justification: 'Prop. 2.4 ; hypothèse $A_1A_2^\\top=0$.' },
          { text: 'Prop. 2.6 conclut ; pour des matrices symétriques, $P_1P_2^\\top=P_1P_2$.', justification: 'Décorrélation $\\Rightarrow$ indépendance (vecteur gaussien).' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-prop-2-7',
        type: 'proposition',
        label: 'Proposition 2.7',
        title: 'Densité d’un vecteur gaussien (Σ définie positive)',
        source: 'Poly ch.1, Outils, Prop. 2.7 et Remarque, p. 29–30',
        hypotheses: ['$\\mu\\in\\mathbb{R}^n$ ; $\\Sigma$ symétrique **définie positive**.'],
        statement: `$\\mathcal{N}(\\mu,\\Sigma)$ admet pour densité par rapport à $\\mathrm{Leb}^{\\otimes n}$

$$g_{\\mu,\\Sigma}(x)=\\frac1{(2\\pi)^{n/2}\\sqrt{\\det\\Sigma}}\\exp\\Big(-\\frac12(x-\\mu)^\\top\\Sigma^{-1}(x-\\mu)\\Big).$$

**Remarque.** Si $\\Sigma$ est de rang $k<n$, $X-\\mu$ prend p.s. ses valeurs dans $\\mathrm{Im}(\\Sigma)$ (mesure de Lebesgue nulle) : $\\mathcal{N}(\\mu,\\Sigma)$ est **dégénérée**, sans densité (cas des $\\mathcal{N}(P_F\\mu,\\sigma^2P_F)$ de Cochran). Pour $\\Sigma=\\sigma^2\\mathrm{I}_n$ on retrouve la densité produit de l’échantillon gaussien.`,
        intuition: 'Lignes de niveau : ellipses orientées selon les axes propres de $\\Sigma$.',
        proof: [
          { text: 'Cas $\\mu=0$, $\\Sigma=\\mathrm{I}_n$ : les coordonnées de $Z$ sont indépendantes $\\mathcal{N}(0,1)$ (Prop. 2.6, blocs de taille 1), densité produit $(2\\pi)^{-n/2}e^{-\\|z\\|^2/2}$.', justification: 'Formule (1) pour une loi produit.' },
          { text: 'Cas général : Prop. 2.5 fournit $A$ inversible avec $AA^\\top=\\Sigma$ et $X\\overset{\\mathcal{L}}{=}AZ+\\mu$ ; changement de variables (Ex. 2.3) : $q(x)=\\frac1{|\\det A|}(2\\pi)^{-n/2}\\exp(-\\frac12\\|A^{-1}(x-\\mu)\\|^2)$.', justification: 'Prop. 2.2 avec $\\phi(z)=Az+\\mu$, jacobien constant $A^{-1}$.' },
          { text: '$\\|A^{-1}(x-\\mu)\\|^2=(x-\\mu)^\\top(AA^\\top)^{-1}(x-\\mu)$ et $(\\det A)^2=\\det\\Sigma$.', justification: 'Calcul matriciel.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-prop-2-9',
        type: 'proposition',
        label: 'Proposition 2.9',
        title: 'Formes quadratiques de vecteurs gaussiens ; χ² non centré',
        source: 'Poly ch.1, Outils, Prop. 2.9 et Remarque, p. 32',
        hypotheses: ['(i) $X\\sim\\mathcal{N}(\\mu,\\Sigma)$, $\\Sigma$ définie positive.', '(ii) $\\sigma>0$, $Z\\sim\\mathcal{N}(0,\\sigma^2\\mathrm{I}_n)$ **centré**, $\\Pi$ projection orthogonale de rang $k\\ge1$.'],
        statement: `(i) $(X-\\mu)^\\top\\Sigma^{-1}(X-\\mu)\\sim\\chi^2(n)$. (ii) $\\|\\Pi Z\\|^2/\\sigma^2\\sim\\chi^2(k)$.

**Remarque.** Si $Z\\sim\\mathcal{N}(\\mu,\\sigma^2\\mathrm{I}_n)$ avec $\\Pi\\mu\\ne0$, $\\|\\Pi Z\\|^2/\\sigma^2$ suit un **$\\chi^2$ non centré** à $k$ degrés de liberté, de paramètre $\\|\\Pi\\mu\\|^2/\\sigma^2$ (utile pour la puissance des tests, chapitre 4).`,
        intuition: 'Norme au carré d’une projection d’un bruit blanc : autant de degrés de liberté que la dimension du sous-espace. C’est (ii) qui donne $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ et $n\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-2)$ en régression simple.',
        proof: [
          { text: '(i) $X\\overset{\\mathcal{L}}{=}AZ+\\mu$ avec $AA^\\top=\\Sigma$, $Z\\sim\\mathcal{N}(0,\\mathrm{I}_n)$ : $(X-\\mu)^\\top\\Sigma^{-1}(X-\\mu)\\overset{\\mathcal{L}}{=}Z^\\top A^\\top(AA^\\top)^{-1}AZ=\\|Z\\|^2\\sim\\chi^2(n)$.', justification: 'Prop. 2.5 ; coordonnées i.i.d. $\\mathcal{N}(0,1)$ (Prop. 2.6) ; Déf. 11.' },
          { text: '(ii) $H=[h_1,\\dots,h_k]$ base orthonormée de $\\mathrm{Im}(\\Pi)$ : $\\Pi=HH^\\top$, $H^\\top H=\\mathrm{I}_k$ ; $\\|\\Pi Z\\|^2=Z^\\top\\Pi Z=\\|H^\\top Z\\|^2$ et $H^\\top Z\\sim\\mathcal{N}(0,\\sigma^2\\mathrm{I}_k)$.', justification: '$\\Pi$ symétrique idempotente ; Prop. 2.4 ; $k$ coordonnées i.i.d. $\\mathcal{N}(0,\\sigma^2)$.' },
        ],
        pitfalls: ['Écrire « $\\|\\Pi Z\\|^2/\\sigma^2\\sim\\chi^2(k)$ » exige $\\Pi\\mu=0$ (vecteur **centré** ou $\\mu\\in\\mathrm{Im}(\\Pi)^\\perp$) ; sinon $\\chi^2$ non centré. Dans Gosset, $\\mu\\mathbf{1}_n\\in F$ donc $P_{F^\\perp}(\\mu\\mathbf{1}_n)=0$.'],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 8. Cochran et Gosset
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s8-cochran-gosset',
    title: '8 · Théorèmes de Cochran et de Gosset',
    role: 'preuves',
    intro:
      '« Extrêmement utiles, voire fondamentaux, pour tous les exercices portant sur des modèles gaussiens » (§1.9) : ce sont des résultats de probabilité sur les projections orthogonales d’un vecteur $\\mathcal{N}(\\mu,\\sigma^2\\mathrm{I}_n)$. Cochran donne l’indépendance des projections et la loi $\\chi^2$ de leurs normes ; Gosset en est l’application à $\\mathbb{R}^n=\\mathbb{R}\\mathbf{1}_n\\oplus(\\mathbb{R}\\mathbf{1}_n)^\\perp$ (moyenne et variance empiriques). Outils de la PC1 Ex. 3 (loi de $(S_n,K_n)$), Ex. 4 (régression), et de la plupart des annales gaussiennes.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch1-thm-1-1-cochran',
        type: 'theoreme',
        label: 'Théorème 1.1',
        title: 'Théorème de Cochran',
        source: 'Poly ch.1, Thm 1.1, p. 19 (démonstration p. 20–21)',
        hypotheses: [
          '$X$ vecteur aléatoire gaussien de $\\mathbb{R}^n$ de loi $\\mathcal{N}(\\mu,\\sigma^2\\mathrm{I}_n)$ (covariance **isotrope**), $\\mu\\in\\mathbb{R}^n$, $\\sigma>0$.',
          '$F_1,\\dots,F_m$ sous-espaces vectoriels de $\\mathbb{R}^n$ **deux à deux orthogonaux** et de **somme $\\mathbb{R}^n$** : $\\mathbb{R}^n=F_1\\oplus\\dots\\oplus F_m$.',
          '$P_{F_i}$ matrice de la projection orthogonale sur $F_i$, $d_i=\\dim F_i$, $d_1+\\dots+d_m=n$.',
        ],
        statement: `(i) Les vecteurs $P_{F_1}X,\\dots,P_{F_m}X$ sont **indépendants**, de lois $\\mathcal{N}(P_{F_1}\\mu,\\sigma^2P_{F_1}),\\dots,\\mathcal{N}(P_{F_m}\\mu,\\sigma^2P_{F_m})$.

(ii) Les v.a. réelles $\\|P_{F_1}(X-\\mu)\\|^2/\\sigma^2,\\dots,\\|P_{F_m}(X-\\mu)\\|^2/\\sigma^2$ sont **indépendantes**, de lois $\\chi^2(d_1),\\dots,\\chi^2(d_m)$ (avec $\\chi^2(0)=\\delta_0$ si un $F_i$ est réduit à $\\{0\\}$).`,
        intuition: 'Si $F_1$ est engendré par les $d_1$ premiers vecteurs de la base canonique, $F_2$ par les suivants, etc., alors $P_{F_1}Z=(Z_1,\\dots,Z_{d_1},0,\\dots,0)$ : le théorème dit que des paquets disjoints de coordonnées indépendantes sont indépendants. Le cas général s’y ramène parce que $\\mathcal{N}(0,\\mathrm{I}_n)$ est **invariante par rotation** : dans une base orthonormée adaptée, les nouvelles coordonnées sont encore i.i.d. $\\mathcal{N}(0,1)$.',
        proof: [
          {
            text: '*Base orthonormée adaptée.* La réunion de bases orthonormées de $F_1,\\dots,F_m$ est une base orthonormée $(u_1,\\dots,u_n)$ de $\\mathbb{R}^n$ ; $I_i$ = indices des vecteurs appartenant à $F_i$ ($\\mathrm{card}\\,I_i=d_i$) ; $U=[u_1,\\dots,u_n]$ orthogonale ; $P_{F_i}=\\sum_{j\\in I_i}u_ju_j^\\top$, i.e. $P_{F_i}x=\\sum_{j\\in I_i}(u_j^\\top x)u_j$.',
            justification: 'Les $F_i$ sont deux à deux orthogonaux et de somme $\\mathbb{R}^n$ ; expression de la projection orthogonale dans une base orthonormée du sous-espace.',
          },
          {
            text: '*Réduction au cas standard.* $Z:=(X-\\mu)/\\sigma\\sim\\mathcal{N}(0,\\mathrm{I}_n)$ ; $Y:=U^\\top Z$ de coordonnées $Y_j=u_j^\\top Z$ vérifie $Y\\sim\\mathcal{N}(0,U^\\top U)=\\mathcal{N}(0,\\mathrm{I}_n)$, donc $Y_1,\\dots,Y_n$ sont indépendantes $\\mathcal{N}(0,1)$.',
            justification: 'Prop. 2.4 (transformation affine) deux fois ; Prop. 2.6 (décorrélation $\\Leftrightarrow$ indépendance dans un vecteur gaussien).',
          },
          {
            text: '*Indépendance.* $P_{F_i}Z=\\sum_{j\\in I_i}Y_ju_j$ est fonction du bloc $(Y_j)_{j\\in I_i}$ ; les $I_i$ étant disjoints, les blocs sont mutuellement indépendants, donc $P_{F_1}Z,\\dots,P_{F_m}Z$ aussi, puis $P_{F_i}X=P_{F_i}\\mu+\\sigma P_{F_i}Z$ ; de même pour $\\|P_{F_i}(X-\\mu)\\|^2/\\sigma^2=\\|P_{F_i}Z\\|^2$.',
            justification: 'Regroupement par paquets de variables indépendantes ; fonctions mesurables de variables indépendantes.',
          },
          {
            text: '*Lois.* $P_{F_i}X\\sim\\mathcal{N}(P_{F_i}\\mu,\\sigma^2P_{F_i}\\mathrm{I}_nP_{F_i}^\\top)=\\mathcal{N}(P_{F_i}\\mu,\\sigma^2P_{F_i})$ ; et $\\|P_{F_i}Z\\|^2=\\big\\|\\sum_{j\\in I_i}Y_ju_j\\big\\|^2=\\sum_{j\\in I_i}Y_j^2\\sim\\chi^2(d_i)$.',
            justification: 'Prop. 2.4 et $P_{F_i}$ symétrique idempotente ; Pythagore dans la base orthonormée $(u_j)_{j\\in I_i}$ ; Déf. 11 (somme de $d_i$ carrés de $\\mathcal{N}(0,1)$ indépendantes).',
          },
        ],
        pitfalls: [
          'La covariance **isotrope** $\\sigma^2\\mathrm{I}_n$ est essentielle (sinon la rotation ne préserve pas la loi).',
          '(ii) porte sur $X-\\mu$ **centré** ; Remarque (c) : si $P_{F_i}\\mu=0$ ($\\mu\\in F_i^\\perp$), alors $\\|P_{F_i}(X-\\mu)\\|^2=\\|P_{F_i}X\\|^2$ — c’est sous cette forme qu’on l’utilise dans Gosset ; sinon $\\chi^2$ **non centré**.',
          'Remarque (a) : indépendance **mutuelle** de toute la famille, pas seulement deux à deux. Remarque (b) : dès que $d_i<n$, $\\mathcal{N}(P_{F_i}\\mu,\\sigma^2P_{F_i})$ est **dégénérée** (portée par $F_i$), sans densité : d’où l’utilité de la Déf. 10.',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-thm-1-2-cochran-simple',
        type: 'theoreme',
        label: 'Théorème 1.2',
        title: 'Théorème de Cochran, version simplifiée',
        source: 'Poly ch.1, Thm 1.2, p. 19–20',
        hypotheses: ['$X\\sim\\mathcal{N}(0_{\\mathbb{R}^n},\\mathrm{I}_n)$.', '$F$ sous-espace vectoriel de dimension $d$, $F^\\perp$ son orthogonal.'],
        statement: '$P_FX$ et $P_{F^\\perp}X$ sont **indépendants**, de lois $\\mathcal{N}(0,P_F)$ et $\\mathcal{N}(0,P_{F^\\perp})$ ; $\\|P_FX\\|^2$ et $\\|P_{F^\\perp}X\\|^2$ sont indépendantes, de lois $\\chi^2(d)$ et $\\chi^2(n-d)$.',
        intuition: 'La version à retenir pour la majorité des exercices. Elle est en fait **équivalente** au Thm 1.1 : on passe de $\\mathcal{N}(\\mu,\\sigma^2\\mathrm{I}_n)$ à $(X-\\mu)/\\sigma$ par la Prop. 2.4, et on traite $m$ sous-espaces en appliquant la version simplifiée à $F_1$ et $F_1^\\perp=F_2\\oplus\\dots\\oplus F_m$, puis par récurrence dans $F_1^\\perp$.',
        proof: [
          { text: 'Cas particulier $m=2$, $\\mu=0$, $\\sigma=1$ du Thm 1.1.', justification: '$\\mathbb{R}^n=F\\oplus F^\\perp$, $\\dim F^\\perp=n-d$.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch1-thm-1-3-gosset',
        type: 'theoreme',
        label: 'Théorème 1.3',
        title: 'Théorème de Gosset',
        source: 'Poly ch.1, Thm 1.3, p. 21 (avec démonstration) ; Ex. 1.11, Ex. 1.14',
        hypotheses: [
          '$n\\ge2$, $\\mu\\in\\mathbb{R}$, $\\sigma^2>0$.',
          '$X_1,\\dots,X_n$ **i.i.d. de loi gaussienne** $\\mathcal{N}(\\mu,\\sigma^2)$.',
          '$\\bar X_n:=\\frac1n\\sum_{i=1}^nX_i$, $S_n^2:=\\frac1{n-1}\\sum_{i=1}^n(X_i-\\bar X_n)^2$ (variance empirique **corrigée**), $S_n=\\sqrt{S_n^2}$.',
        ],
        statement: `(i) $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$ ;

(ii) $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ ;

(iii) $\\bar X_n$ et $S_n^2$ sont **indépendantes** ;

(iv) $T_n:=\\sqrt n\\,\\dfrac{\\bar X_n-\\mu}{S_n}$ suit la loi de Student $t(n-1)$.`,
        intuition: 'La moyenne vit sur la droite $\\mathbb{R}\\mathbf{1}_n$, les résidus $X_i-\\bar X_n$ dans l’orthogonal (dimension $n-1$, d’où les $n-1$ degrés de liberté) ; orthogonalité + gaussianité donnent l’indépendance.',
        proof: [
          {
            text: '*Vecteur gaussien.* $X=(X_1,\\dots,X_n)^\\top\\sim\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n)$.',
            justification: 'Lemme 2.1 (ii) / Déf. 10 : coordonnées gaussiennes indépendantes $\\Rightarrow$ vecteur gaussien.',
          },
          {
            text: '*Décomposition.* $F:=\\mathbb{R}\\mathbf{1}_n$ (dimension 1), $F^\\perp=\\{x:\\sum_ix_i=0\\}$ (dimension $n-1$), $P_F=\\frac1n\\mathbf{1}_n\\mathbf{1}_n^\\top$ : $P_FX=\\bar X_n\\mathbf{1}_n$, $P_{F^\\perp}X=(X_1-\\bar X_n,\\dots,X_n-\\bar X_n)^\\top$ et $\\|P_{F^\\perp}X\\|^2=(n-1)S_n^2$. Comme $\\mu\\mathbf{1}_n\\in F$, $P_{F^\\perp}(X-\\mu\\mathbf{1}_n)=P_{F^\\perp}X$.',
            justification: '$\\mathbf{1}_n/\\sqrt n$ est unitaire dans $F$ ; Remarque (c) du théorème de Cochran.',
          },
          {
            text: '*(iii)* Par Cochran, $P_FX$ et $P_{F^\\perp}X$ sont indépendants ; $\\bar X_n=\\frac1n\\mathbf{1}_n^\\top P_FX$ est fonction de $P_FX$ et $S_n^2=\\|P_{F^\\perp}X\\|^2/(n-1)$ fonction de $P_{F^\\perp}X$.',
            justification: 'Thm 1.1 (i) avec $m=2$ ; fonctions mesurables de variables indépendantes.',
          },
          {
            text: '*(ii)* $\\|P_{F^\\perp}(X-\\mu\\mathbf{1}_n)\\|^2/\\sigma^2=(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$.',
            justification: 'Thm 1.1 (ii) avec $\\dim F^\\perp=n-1$.',
          },
          {
            text: '*(i)* $\\bar X_n=\\frac1n\\mathbf{1}_n^\\top X\\sim\\mathcal{N}\\big(\\frac1n\\mathbf{1}_n^\\top\\mu\\mathbf{1}_n,\\ \\frac{\\sigma^2}{n^2}\\mathbf{1}_n^\\top\\mathrm{I}_n\\mathbf{1}_n\\big)=\\mathcal{N}(\\mu,\\sigma^2/n)$.',
            justification: 'Prop. 2.4 (image linéaire d’un vecteur gaussien) ; $\\mathbf{1}_n^\\top\\mathbf{1}_n=n$.',
          },
          {
            text: '*(iv)* $G:=\\sqrt n(\\bar X_n-\\mu)/\\sigma\\sim\\mathcal{N}(0,1)$ et $Y:=(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ sont indépendantes, et $T_n=\\dfrac{\\sqrt n(\\bar X_n-\\mu)/\\sigma}{\\sqrt{S_n^2/\\sigma^2}}=\\dfrac{G}{\\sqrt{Y/(n-1)}}\\sim t(n-1)$.',
            justification: '(i), (ii), (iii) ; définition de la loi de Student (Déf. 12).',
          },
        ],
        pitfalls: [
          '$n-1$ degrés de liberté, pas $n$ ; $S_n^2$ normalisée par $n-1$. L’EMV $\\widehat{\\sigma^2}_{ML}=\\frac{n-1}nS_n^2$ a pour biais $-\\sigma^2/n$ (Examen 2025 Ex. 2 Q4).',
          '(iii)–(iv) sont **faux hors du cas gaussien** (théorème de Lukacs) ; asymptotiquement, $T_n\\Rightarrow\\mathcal{N}(0,1)$ pour toute loi de carré intégrable (chapitre 6).',
          '$T_n$ n’est pas une statistique si $\\mu$ est inconnu : c’est un **pivot** (IC et tests de Student, chapitre 4).',
          'Moments utiles : $\\mathbb{E}[S_n^2]=\\sigma^2$, $\\mathrm{Var}(S_n^2)=\\frac{2\\sigma^4}{n-1}$, $\\mathbb{E}[S_n^4]=\\sigma^4(1+\\frac2{n-1})$ (CC 2022 Ex. 2 Q1).',
        ],
      },
      {
        kind: 'viz',
        id: 'ch1-s8-viz-gosset',
        vizId: 'ch1-gosset',
        caption: 'Nuage $(\\bar X_n,S_n^2)$ sans dépendance et histogrammes de $(n-1)S_n^2/\\sigma^2$ et $T_n$ : exact pour un bruit gaussien, faux pour un bruit exponentiel ou uniforme.',
      },
      {
        kind: 'example',
        id: 'ch1-ex-pc1-3',
        title: 'PC1 Ex. 3 — Modèle de translation-échelle ; modèle induit par (Sₙ, Kₙ) dans le cas gaussien',
        source: 'PC1 Ex. 3 (énoncé p. 2–3, corrigé p. 11–15) ; Poly ch.1, Thm 1.3, Prop. 2.8',
        setup: '$g$ densité sur $\\mathbb{R}$ ; modèle $(\\mathbb{R}^n,\\mathcal{B}(\\mathbb{R}^n),\\{p_{n,\\theta}\\cdot\\mathrm{Leb}^{\\otimes n},\\theta=(\\mu,\\sigma)\\in\\mathbb{R}\\times\\mathbb{R}_+^*\\})$ avec $p_{n,\\theta}(x_1,\\dots,x_n)=\\sigma^{-n}\\prod_ig\\big(\\frac{x_i-\\mu}\\sigma\\big)$. Dans le cas gaussien, $S_n:=\\sum_iX_i$ (**somme**) et $K_n:=\\sum_i(X_i-n^{-1}S_n)^2$.',
        steps: [
          {
            text: '**Q1.** La densité est de **forme produit** : les $X_i$ sont indépendantes ; même facteur $u\\mapsto g((u-\\mu)/\\sigma)$ : même loi, de densité $q_\\theta(u)=\\frac1\\sigma g\\big(\\frac{u-\\mu}\\sigma\\big)$ ($C_\\theta=1/\\sigma$ par le changement de variable $v=(u-\\mu)/\\sigma$).',
            justification: 'Densité produit $\\Rightarrow$ indépendance (Lemme 1.1) ; constante de normalisation.',
          },
          {
            text: '**Q2.** Par l’Exercice 2 avec $a_k=-\\mu/\\sigma$, $b_k=1/\\sigma$ : $(X_i-\\mu)/\\sigma$ a pour densité $\\sigma\\,q_\\theta(\\sigma y+\\mu)=g(y)$ ; indépendance conservée : i.i.d. de densité $g$.',
            justification: 'Changement de variable affine (Ex. 2.1) ; fonctions de variables indépendantes.',
          },
          {
            text: '**Q3.** $g$ gaussienne réduite : $\\mu=\\mathbb{E}_\\theta[X_i]$, $\\sigma^2=\\mathrm{Var}_\\theta(X_i)$ ; par la loi des grands nombres $(\\frac1nS_n,\\frac1nK_n)\\to(\\mu,\\sigma^2)$ en probabilité, d’où l’estimateur $(\\hat\\mu_n,\\hat\\sigma_n^2)=(\\frac1nS_n,\\frac1nK_n)$ (c’est aussi l’EMV, complément du corrigé). Moyenne vs médiane : pour un bruit gaussien, la moyenne empirique est plus concentrée ; pour un bruit de Laplace, c’est la **médiane** (EMV du modèle de Laplace), la conclusion s’inverse.',
            justification: 'Méthode des moments (anticipe le ch.2) ; boxplots des figures 4–5 du corrigé.',
          },
          {
            text: '**Q4.** Par Gosset : $S_n=n\\bar X_n\\sim\\mathcal{N}(n\\mu,n\\sigma^2)$ ; $K_n=(n-1)S_n^{2,\\mathrm{Gosset}}$ vérifie $K_n/\\sigma^2\\sim\\chi^2(n-1)=\\mathrm{Gamma}(\\frac{n-1}2,\\frac12)$ donc $K_n\\sim\\mathrm{Gamma}(\\frac{n-1}2,\\frac1{2\\sigma^2})$ ; $S_n$ et $K_n$ sont **indépendantes**.',
            justification: 'Thm 1.3 (i)–(iii) ; Prop. 2.8 ; changement d’échelle d’une loi Gamma.',
          },
          {
            text: 'Modèle induit : $\\big(\\mathbb{R}\\times\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}\\times\\mathbb{R}_+),\\{\\rho_{n,\\theta}\\cdot\\mathrm{Leb}^{\\otimes2},\\theta\\in\\mathbb{R}\\times\\mathbb{R}_+^*\\}\\big)$ avec $\\rho_{n,\\theta}(z,y)=C_n\\exp\\big(-\\frac{(z-n\\mu)^2}{2n\\sigma^2}\\big)\\exp\\big(-\\frac y{2\\sigma^2}\\big)y^{(n-3)/2}\\mathbb{1}_{\\mathbb{R}_+}(y)$, $C_n=\\frac1{\\sqrt{2\\pi n\\sigma^2}}\\big(\\frac1{2\\sigma^2}\\big)^{(n-1)/2}\\frac1{\\Gamma((n-1)/2)}$.',
            justification: 'Indépendance $\\Rightarrow$ densité jointe = produit des marginales.',
          },
          {
            text: '*Complément.* Pour $(S_n,\\sum_iX_i^2)=(S_n,K_n+S_n^2/n)$, le changement de variable $(z,y)\\mapsto(u,v)=(z,y+z^2/n)$ (jacobien 1) donne $\\tilde\\rho_{n,\\theta}(u,v)\\propto\\exp\\big(\\frac{u\\mu}{\\sigma^2}-\\frac v{2\\sigma^2}\\big)\\big(v-\\frac{u^2}n\\big)^{(n-3)/2}\\mathbb{1}_{[u^2/n,+\\infty[}(v)$ : le support n’est pas un pavé, $S_n$ et $\\sum_iX_i^2$ **ne sont pas indépendantes**.',
            justification: 'Fonction muette + changement de variables en dimension 2 ; les termes en $u^2$ de l’exponentielle se compensent.',
          },
        ],
        conclusion: 'Points d’attention : $S_n$ est ici la **somme** ; l’estimateur $K_n/n$ de $\\sigma^2$ est biaisé ($K_n/(n-1)$ serait sans biais) ; le corrigé renvoie à l’ancien « Théorème IV-5-24 » = Thm 1.3 actuel.',
      },
      {
        kind: 'example',
        id: 'ch1-ex-pc4-2',
        title: 'PC4 Ex. 2 Q4–Q6 — Redémontrer Gosset avec le projecteur Π (rédaction type)',
        source: 'PC4 Ex. 2 Q4–Q6 (corrigé p. 15–16) ; Poly ch.1, Thm 1.1 et 1.3, Prop. 2.4, 2.6',
        setup: '$Z=(X_1,\\dots,X_n)$ $n$-échantillon de $\\mathcal{N}(\\mu,\\sigma^2)$, $\\theta=(\\mu,\\sigma^2)$ ; $\\Pi$ projection orthogonale sur $\\mathbb{R}\\mathbf{1}$ ; $\\bar X_n=\\frac1n\\mathbf{1}^\\top\\Pi Z$, $S_n^2=\\frac1{n-1}\\|(\\mathrm{I}_n-\\Pi)Z\\|^2$. Montrer l’indépendance, la loi $\\chi^2(n-1)$ et la loi de $\\sqrt n(\\bar X_n-\\mu_0)/S_n$.',
        steps: [
          { text: '**Q4.** $\\Pi(\\mathrm{I}_n-\\Pi)^\\top=\\Pi(\\mathrm{I}_n-\\Pi)=0$ ; $Z\\sim\\mathcal{N}(\\mu\\mathbf{1},\\sigma^2\\mathrm{I}_n)$ donc $\\Pi Z\\sim\\mathcal{N}(\\mu\\mathbf{1},\\sigma^2\\Pi)$ et $(\\mathrm{I}_n-\\Pi)Z\\sim\\mathcal{N}(0,\\sigma^2(\\mathrm{I}_n-\\Pi))$.', justification: 'Projecteur orthogonal : symétrique, idempotent ; Prop. 2.4 ; $(\\mathrm{I}_n-\\Pi)\\mathbf{1}=0$.' },
          { text: 'Le vecteur concaténé $(\\Pi Z,(\\mathrm{I}_n-\\Pi)Z)\\in\\mathbb{R}^{2n}$ est gaussien (image linéaire de $Z$) et son bloc de covariance croisé vaut $\\sigma^2\\Pi(\\mathrm{I}_n-\\Pi)=0$ : les deux blocs sont indépendants, donc $\\bar X_n$ et $S_n^2$ aussi.', justification: 'Prop. 2.4 puis Prop. 2.6 (décorrélation $\\Leftrightarrow$ indépendance **dans un vecteur gaussien**) ; fonctions des blocs.' },
          { text: '**Q5.** $\\mathrm{I}_n-\\Pi=Q\\Delta Q^\\top$ avec $Q$ orthogonale et $\\Delta$ diagonale ($n-1$ fois $1$, une fois $0$) ; $(n-1)S_n^2/\\sigma^2=\\|Q^\\top(\\mathrm{I}_n-\\Pi)Z/\\sigma\\|^2=\\|W\\|^2$ avec $W\\sim\\mathcal{N}(0,\\Delta)$ : $n-1$ coordonnées i.i.d. $\\mathcal{N}(0,1)$ et une nulle, d’où $\\chi^2(n-1)$.', justification: 'Diagonalisation d’un projecteur de rang $n-1$ ; invariance de la norme par matrice orthogonale ; Déf. 11.' },
          { text: '**Q6.** $\\sqrt n(\\bar X_n-\\mu_0)/\\sigma\\sim\\mathcal{N}(\\frac{\\sqrt n}\\sigma(\\mu-\\mu_0),1)$ et $S_n/\\sigma\\sim\\sqrt{\\chi^2(n-1)/(n-1)}$, indépendantes : $\\sqrt n(\\bar X_n-\\mu_0)/S_n$ suit une Student à $n-1$ degrés de liberté **décentrée** de paramètre $\\sqrt n(\\mu-\\mu_0)/\\sigma$ ; centrée sous $H_0:\\mu=\\mu_0$.', justification: 'Q4–Q5 et définition de la Student (décentrée pour $\\mu\\ne\\mu_0$).' },
        ],
        conclusion: 'C’est la rédaction attendue quand l’énoncé demande de « montrer que $\\bar X_n$ et $S_n^2$ sont indépendantes » : écrire les deux statistiques comme fonctions de $\\Pi Z$ et $(\\mathrm{I}-\\Pi)Z$, vérifier $\\Pi(\\mathrm{I}-\\Pi)=0$, invoquer « vecteur gaussien + décorrélation ⇒ indépendance » (ou citer Cochran). Même schéma en régression : $\\hat\\beta$ fonction de $HY$, $\\hat\\sigma^2$ de $(\\mathrm{I}-H)Y$ (CC 2022 Ex. 4 Q3, $\\chi^2(n-2)$).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 9. Statistiques d'ordre
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s9-ordre',
    title: '9 · Statistiques d’ordre : densité jointe, espacements, loi du maximum',
    role: 'preuves',
    intro:
      'Les statistiques d’ordre $X_{(1)}\\le\\dots\\le X_{(n)}$ apparaissent dans le poly (Ex. 1.8, Ex. 1.13) et dans deux annales (CC 2022 Ex. 3 ; Examen 2025 Ex. 3 Q6) ; la PC3 Ex. 5 en donne la densité jointe et la transformation en **espacements** i.i.d. pour l’échantillon exponentiel. Tout repose sur deux outils de ce chapitre : l’échangeabilité d’un $n$-échantillon et le changement de variables.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch1-prop-ordre-densite',
        type: 'proposition',
        label: 'Densité jointe des statistiques d’ordre',
        title: 'Loi du vecteur ordonné d’un n-échantillon à densité',
        source: 'PC3 Ex. 5 Q1 (corrigé p. 16) ; CC MAP433 2022 Ex. 3 Q1–Q2',
        hypotheses: ['$(X_1,\\dots,X_n)$ $n$-échantillon d’une loi de densité $f$ par rapport à $\\mathrm{Leb}$ (donc $\\mathbb{P}(X_i=X_j)=0$ pour $i\\ne j$).', '$p_\\theta(y_1,\\dots,y_n)=\\prod_kf_\\theta(y_k)$ densité jointe de l’échantillon.'],
        statement: `La loi jointe de $(X_{1:n},\\dots,X_{n:n})$ admet la densité

$$f_{1:n}(\\theta;y_1,\\dots,y_n)=n!\\,p_\\theta(y_1,\\dots,y_n)\\,\\mathbb{1}_{\\{y_1<y_2<\\dots<y_n\\}}.$$

En intégrant les autres coordonnées, $X_{k:n}$ a pour densité $\\frac{n!}{(k-1)!(n-k)!}F(x)^{k-1}(1-F(x))^{n-k}f(x)$, et $F(X_{k:n})\\sim\\mathrm{Beta}(k,n-k+1)$, d’espérance $\\frac k{n+1}$ (Examen 2025 Ex. 3 Q6).`,
        intuition: 'Un $n$-échantillon est **échangeable** : chacune des $n!$ permutations ordonnantes est équiprobable, et il n’y a pas d’ex-aequo p.s. ; la densité du vecteur trié est donc $n!$ fois celle de l’échantillon, restreinte au cône $\\{y_1<\\dots<y_n\\}$.',
        proof: [
          { text: 'Pour toute permutation $\\tau$, $(X_{\\tau_1},\\dots,X_{\\tau_n})$ a même loi que $(X_1,\\dots,X_n)$, de densité $\\prod_kf_\\theta(y_k)$.', justification: 'Observations i.i.d. (Lemme 1.1) : la loi produit est invariante par permutation des coordonnées.' },
          { text: 'Il existe p.s. une unique permutation aléatoire $\\sigma$ telle que $X_{k:n}=X_{\\sigma_k}$ et $X_{\\sigma_1}<\\dots<X_{\\sigma_n}$.', justification: 'Lois à densité : $\\mathbb{P}_\\theta(X_i=X_j)=0$ pour $i\\ne j$.' },
          { text: 'Pour $h$ mesurable bornée : $\\mathbb{E}_\\theta[h(X_{1:n},\\dots,X_{n:n})]=\\sum_{\\tau\\in\\mathfrak{S}_n}\\mathbb{E}_\\theta\\big[h(X_{\\tau_1},\\dots,X_{\\tau_n})\\mathbb{1}_{\\{X_{\\tau_1}<\\dots<X_{\\tau_n}\\}}\\big]$.', justification: 'Fonction muette ; décomposition selon la valeur de $\\sigma$ : $\\{\\sigma=\\tau\\}=\\{X_{\\tau_1}<\\dots<X_{\\tau_n}\\}$ p.s.' },
          { text: 'Chaque terme vaut $\\int_{y_1<\\dots<y_n}h(y)\\prod_kf_\\theta(y_k)\\,\\mathrm{d}y$, indépendamment de $\\tau$, et il y a $n!$ termes.', justification: 'Première étape (même loi pour tout $\\tau$) ; $\\mathrm{card}\\,\\mathfrak{S}_n=n!$ ; identification de la densité.' },
          { text: 'Marginale de $X_{k:n}$ : $\\{X_{k:n}\\le x\\}$ = « au moins $k$ observations dans $]-\\infty,x]$ », nombre qui suit $\\mathrm{Bin}(n,F(x))$ ; dériver en $x$. Puis $F(X_{k:n})$ est la $k$-ième statistique d’ordre de $n$ uniformes : $\\mathbb{P}(U_{k:n}\\le u)=\\mathbb{P}(\\mathrm{Bin}(n,u)\\ge k)=\\mathbb{P}(\\mathrm{Beta}(k,n-k+1)\\le u)$.', justification: 'Indépendance (binomiale) ; $F$ continue strictement croissante sur le support ; lien binomiale/bêta rappelé dans l’Examen 2025.' },
        ],
        pitfalls: ['Les $X_{k:n}$ **ne sont pas indépendantes** (le support $\\{y_1<\\dots<y_n\\}$ n’est pas un pavé).', 'Cas $k=n$ : $\\mathbb{P}(X_{(n)}\\le t)=F(t)^n$, densité $nF^{n-1}f$ : pour $\\mathcal{U}([0,\\theta])$, $q_{n,\\theta}(t)=nt^{n-1}\\theta^{-n}\\mathbb{1}_{[0,\\theta]}(t)$ (Ex. 1.13).'],
      },
      {
        kind: 'example',
        id: 'ch1-ex-pc3-5',
        title: 'PC3 Ex. 5 Q2 et CC 2022 Ex. 3 Q3–Q6 — Les espacements normalisés d’un échantillon exponentiel sont i.i.d.',
        source: 'PC3 Ex. 5 Q2 (corrigé p. 16–17) ; CC MAP433 2022 Ex. 3 Q3–Q6 (corrigé)',
        setup: '$n$-échantillon de densité $f_\\theta(x)=\\theta^{-1}e^{-x/\\theta}\\mathbb{1}_{\\mathbb{R}_+}(x)$ (**convention d’échelle** : $\\mathbb{E}_\\theta[X]=\\theta$). Espacements normalisés $Z_1=nX_{1:n}$, $Z_k=(n-k+1)(X_{k:n}-X_{(k-1):n})$ ; réciproquement $X_{k:n}=\\sum_{j\\le k}\\frac{Z_j}{n-j+1}$ ; jacobien $n!$ ; identité $\\sum_ix_i=\\sum_i(n-i+1)(x_i-x_{i-1})$ ($x_0=0$).',
        steps: [
          { text: 'Pour $h$ mesurable positive, $\\mathbb{E}_\\theta[h(Z_1,\\dots,Z_n)]=\\frac{n!}{\\theta^n}\\int_{0\\le y_1<\\dots<y_n}e^{-\\theta^{-1}\\sum_ky_k}\\,h\\big(ny_1,(n-1)(y_2-y_1),\\dots,y_n-y_{n-1}\\big)\\,\\mathrm{d}y$.', justification: 'Densité jointe $f_{1:n}$ des statistiques d’ordre, avec $f_\\theta(y)=\\theta^{-1}e^{-y/\\theta}$.' },
          { text: 'Changement de variables $z_i=(n-i+1)(y_i-y_{i-1})$ : le jacobien $n!$ compense le facteur $n!$, le domaine devient $\\{z_1>0,\\dots,z_n>0\\}$, et $\\sum_ky_k=\\sum_k\\sum_{j\\le k}\\frac{z_j}{n-j+1}=\\sum_j\\frac{z_j}{n-j+1}(n-j+1)=\\sum_jz_j$.', justification: 'Prop. 2.2 ; interversion des sommes (pour $j$ fixé, $n-j+1$ indices $k\\ge j$).' },
          { text: 'Donc $\\mathbb{E}_\\theta[h(Z)]=\\int_{\\mathbb{R}_+^n}h(z)\\,\\theta^{-n}e^{-\\theta^{-1}\\sum_jz_j}\\,\\mathrm{d}z$ : densité **produit** de densités $f_\\theta$ : les $Z_k$ sont **i.i.d. de même loi que $X_1$**.', justification: 'Fonction muette ; densité produit $\\Rightarrow$ indépendance et lois marginales.' },
          { text: '*CC 2022 Ex. 3* (exponentielle translatée de densité $\\lambda^{-1}e^{-(x-a)/\\lambda}\\mathbb{1}_{[a,\\infty[}$) : même calcul, $U_1=nX_{1:n}\\sim\\mathcal{E}(na,\\lambda)$ (translatée de $na$), $U_2,\\dots,U_n\\sim\\mathcal{E}(0,\\lambda)$ i.i.d., indépendantes de $U_1$ ; $T_1=\\sum_i(X_{i:n}-X_{1:n})=\\sum_{i\\ge2}U_i\\sim\\mathrm{Gamma}(n-1,\\lambda)$ est indépendante de $X_{1:n}=U_1/n\\sim\\mathcal{E}(a,\\lambda/n)$.', justification: 'Identité $\\sum_iu_i=nu_1+\\sum_{i\\ge2}(n-i+1)(u_i-u_{i-1})$ ; additivité Gamma ; changement de variable $v=u_1/n$.' },
        ],
        conclusion: 'Intérêt : les $X_{k:n}$ sont dépendants, mais les **espacements normalisés** sont i.i.d. ; cela donne la loi de $\\sum_ia_{i,n}X_{i:n}=\\sum_jm_{j,n}Z_j$ (estimateurs L-linéaires, PC3 Ex. 5 Q3–6) et des pivots exacts ($T_1/\\lambda\\sim\\mathrm{Gamma}(n-1,1)$, CC 2022 Ex. 3 Q5–Q9). Convention à surveiller : ici $\\theta$ est une **échelle**.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 10. Méthodes types et « À l'examen »
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s10-examen',
    title: '10 · Méthodes types et « À l’examen »',
    role: 'liens-examen',
    intro:
      'Le chapitre 1 pèse environ 9 % des points en 2025 (22 % dans le CC 2022, DIAGNOSTIC §7–8) : il n’est presque jamais interrogé pour lui-même, mais ses outils ouvrent chaque problème (densité par changement de variables, loi exacte via Gosset/Cochran, statistiques d’ordre) et sont **attendus avec leurs hypothèses** dans la rédaction.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch1-meth-modele',
        type: 'methode',
        label: 'Méthode type 1',
        title: 'Construire (et critiquer) un modèle statistique',
        source: 'Poly ch.1, Déf. 1.1, encart « Intuition » p. 10 ; PC1 Ex. 1, 5, 6',
        statement: `1. **Choisir les variables modélisées** : passer des $T_i$ croissants aux inter-temps $\\Delta_i$, des prix aux log-rendements $\\ln(P_k/P_{k-1})$.
2. **Espace des observations et tribu** : $\\mathbb{R}^n$ et $\\mathcal{B}(\\mathbb{R}^n)$ ; $\\mathbb{R}_+^n$ ; $\\mathbb{N}^K$ et $\\mathcal{P}(\\mathbb{N}^K)$ ; $\\{0,1\\}^n$ et $\\mathcal{P}(\\{0,1\\}^n)$.
3. **Famille de lois** : paramétrique $\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\}$ avec $\\Theta$ explicite ($\\mathbb{R}\\times\\mathbb{R}_+^*$, $\\mathbb{R}_+^*$…) ; écrire la densité et la **mesure dominante** (Lebesgue ou comptage) ; forme produit pour des observations indépendantes (formule (1)), ou produit de lois conditionnelles pour un modèle dépendant (ARCH, PC1 Ex. 6 Q7).
4. **Hypothèses et limites** : forme des lois (raisonnable ?), indépendance (discutable ?), homogénéité en temps / identique distribution (très discutable ?) ; sur-dispersion (variance $>$ moyenne pour Poisson), queues lourdes (kurtosis), résidus structurés.`,
        intuition: 'Chaque élément du triplet vaut des points ; la critique de modèle aussi (« tous les modèles sont faux »).',
      },
      {
        kind: 'theorem',
        id: 'ch1-meth-induit',
        type: 'methode',
        label: 'Méthode type 2',
        title: 'Calculer un modèle induit (loi d’une transformation) par la fonction muette',
        source: 'Poly ch.1, Déf. 5, Prop. 2.1–2.2 ; PC1 Ex. 2–3 ; Examen 2025 Ex. 2 Q1 ; CC 2022 Ex. 1 Q1, Ex. 3',
        statement: `1. Prendre $h$ mesurable **positive ou bornée** quelconque et écrire $\\mathbb{E}_\\theta[h(T)]=\\int h(T(x))\\,p_\\theta(x)\\,\\mathrm{d}x$ (transfert).
2. Changer de variable $y=T(x)$ : vérifier $\\mathcal{C}^1$, **injectivité** sur chaque morceau, jacobien non nul ; écrire $\\mathrm{d}x=|(\\phi^{-1})\'(y)|\\,\\mathrm{d}y$ (ou $|\\mathrm{Det}\\,J_{\\phi^{-1}}|$) et l’**indicatrice du support** $\\phi(O)$.
3. Identifier : « l’égalité valant pour toute $h$, $T$ a pour densité $q(y)=\\dots$ ».
4. Écrire le **triplet** induit $(\\mathsf{T},\\mathcal{T},\\{q_\\theta\\cdot\\nu,\\theta\\in\\Theta\\})$ avec la bonne mesure dominante.

Exemples à connaître : $X^c$ Weibull $\\to$ exponentielle (CC 2022 Ex. 1 Q1 : $\\mathbb{E}_\\theta[h(X^c)]=\\int_0^\\infty h(y)\\theta^{-1}e^{-y/\\theta}\\,\\mathrm{d}y$ par $y=x^c$) ; $e^{\\mu+\\sigma\\xi}$ log-normale (Examen 2025 Ex. 2 Q1 : $y=\\ln x$, $\\mathrm{d}y=\\mathrm{d}x/x$, densité $\\frac{e^{-(\\ln x-\\mu)^2/(2\\sigma^2)}}{x\\sqrt{2\\pi\\sigma^2}}\\mathbb{1}_{x>0}$) ; $x\\mapsto x^2$ (deux branches, $\\chi^2(1)$) ; espacements des statistiques d’ordre (jacobien $n!$).`,
        intuition: 'Trois pièges : valeur absolue, support, non-injectivité (découper et sommer).',
      },
      {
        kind: 'theorem',
        id: 'ch1-meth-gaussien',
        type: 'methode',
        label: 'Méthode type 3',
        title: 'Lois exactes dans un modèle gaussien : Gosset / Cochran',
        source: 'Poly ch.1, Thm 1.1–1.3 ; PC4 Ex. 2 ; Examen 2025 Ex. 2 Q3–Q5 ; CC 2022 Ex. 2 Q1, Ex. 4 Q2–3, 7',
        statement: `1. **Écrire le vecteur gaussien** : $X\\sim\\mathcal{N}(\\mu\\mathbf{1}_n,\\sigma^2\\mathrm{I}_n)$ (échantillon) ou $Y\\sim\\mathcal{N}(\\mathbf{X}\\beta,\\sigma^2\\mathrm{I}_n)$ (régression).
2. **Identifier la décomposition orthogonale** : $\\mathbb{R}\\mathbf{1}_n\\oplus(\\mathbb{R}\\mathbf{1}_n)^\\perp$ ; $\\mathrm{Im}(\\mathbf{X})\\oplus\\mathrm{Im}(\\mathbf{X})^\\perp$ avec $H=\\mathbf{X}(\\mathbf{X}^\\top\\mathbf{X})^{-1}\\mathbf{X}^\\top$ ; écrire chaque statistique comme fonction d’une projection ($\\bar X_n$ de $P_FX$, $S_n^2$ de $P_{F^\\perp}X$ ; $\\hat\\beta$ de $HY$, $\\hat\\sigma^2$ de $(\\mathrm{I}-H)Y$).
3. **Citer le théorème avec ses hypothèses** : « par le théorème de Gosset ($X_i$ i.i.d. gaussiennes, $n\\ge2$) » ou « par Cochran (covariance $\\sigma^2\\mathrm{I}_n$, sous-espaces orthogonaux de somme $\\mathbb{R}^n$) » : indépendance, lois $\\mathcal{N}$ par la Prop. 2.4 ($A\\Sigma A^\\top$), lois $\\chi^2$ avec le bon nombre de degrés de liberté ($n-1$ ; $n-p$ en régression à $p$ coefficients) après avoir vérifié que la projection de la moyenne est nulle.
4. **En déduire** : biais et variance ($\\mathbb{E}[\\widehat{\\sigma^2}_{ML}]=\\frac{n-1}n\\sigma^2$, $\\mathrm{Var}(S_n^2)=\\frac{2\\sigma^4}{n-1}$), pivots ($(n-1)S_n^2/\\sigma^2$, $T_n\\sim t(n-1)$, Fisher), intervalles de confiance exacts (Examen 2025 Ex. 2 Q5 : $\\big[\\frac{n\\widehat{\\sigma^2}_{ML}}{\\chi^2_{1-\\alpha/2}(n-1)},\\frac{n\\widehat{\\sigma^2}_{ML}}{\\chi^2_{\\alpha/2}(n-1)}\\big]$).`,
        intuition: 'Si l’énoncé dit « on pourra utiliser le théorème de Gosset (théorème IV-5-24 / IV.3.24 de l’ancien poly) », c’est le Thm 1.3 actuel ; « corollaire IV.3.9 » renvoie à Cochran.',
      },
      {
        kind: 'theorem',
        id: 'ch1-meth-identif',
        type: 'methode',
        label: 'Méthode type 4',
        title: 'Montrer qu’un modèle est (ou n’est pas) identifiable',
        source: 'Poly ch.1, Déf. 2, Ex. 1.6–1.7 ; PC1 Ex. 5 Q7, Ex. 7',
        statement: `- **Identifiable** : exprimer $\\theta$ comme fonction de la loi : probabilité d’un événement ($\\theta^n=\\mathbb{P}_\\theta(\\{n\\})$, $e^{-\\lambda}=\\mathbb{P}_\\lambda([1,\\infty[)$), espérance et covariance (gaussien), fonction caractéristique ou génératrice (mélanges), et conclure par injectivité d’une fonction strictement monotone.
- **Non identifiable** : exhiber $\\theta\\ne\\theta\'$ de même loi (permutation des composantes d’un mélange ; $(\\lambda_1,\\lambda_2)$ et $(\\lambda_2,\\lambda_1)$ pour des totaux de Poisson ; $q=1/2$ dans les réponses randomisées) ; proposer la **restriction de $\\Theta$** qui rétablit l’injectivité ($\\mu_1<\\mu_2$, $\\theta_{i,j,K}=0$).`,
        intuition: 'L’identifiabilité est une propriété de la **paramétrisation**, pas des données.',
      },
      {
        kind: 'text',
        id: 'ch1-s10-tombe',
        title: 'Ce qui est tombé (DIAGNOSTIC §2 et §7)',
        text: `**Examen 2025.** Ex. 2 Q1 : densité de la log-normale $X=e^{\\mu+\\sigma\\xi}$ par fonction muette ($S=\\,]0,+\\infty[$) ; Q3 : biais nul et variance $\\sigma^2/n$ de $\\hat\\mu_{ML}=\\bar Y_n$ par Gosset (i) ; Q4 : $\\widehat{\\sigma^2}_{ML}=\\frac{n-1}nS_n^2$, biais $-\\sigma^2/n$, variance $\\frac{2(n-1)\\sigma^4}{n^2}$ par Gosset (ii) et les moments du $\\chi^2(n-1)$ ; Q5 : IC exact pour $\\sigma^2$ par le pivot $n\\widehat{\\sigma^2}_{ML}/\\sigma^2\\sim\\chi^2(n-1)$ ; Ex. 3 Q6 : $\\mathbb{P}(\\mathfrak{R}_k(x)\\le t)=\\mathbb{P}(\\mathrm{Bin}(n,F_x(t))\\ge k)$ et $U_k=F_x(\\mathfrak{R}_k(x))\\sim\\mathrm{Beta}(k,n-k+1)$ (statistiques d’ordre).

**CC MAP433 2022.** Ex. 1 Q1 : loi de $X^c$ pour une Weibull (fonction muette, exponentielle d’**échelle** $\\theta$) ; Ex. 2 Q1 : Gosset (loi de $\\bar X_n$, indépendance, $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$, $\\mathbb{E}[S_n^4]=\\sigma^4(1+\\frac2{n-1})$) ; Ex. 3 Q1–6 : densité jointe des statistiques d’ordre ($n!\\,p_\\theta\\mathbb{1}_{\\{y_1<\\dots<y_n\\}}$), indépendance des espacements $U_k$ par changement de variables (jacobien $n!$), $T_1\\sim\\mathrm{Gamma}(n-1,\\lambda)$ indépendante de $X_{1:n}\\sim\\mathcal{E}(a,\\lambda/n)$ ; Ex. 4 Q2–3, 7 : $\\hat\\beta\\sim\\mathcal{N}(\\beta,\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1})$ (Prop. 2.4), $n\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-2)$ indépendant de $\\hat\\beta$ (Cochran sur $\\mathrm{Im}(\\mathbf{X})\\oplus\\mathrm{Im}(\\mathbf{X})^\\perp$), $\\bar Y-\\delta\\hat\\beta_1=v^\\top Y$ avec $v\\in\\mathrm{Vect}(\\mathbf{X})$ indépendant de $S^2$ (Cor. 2.1).

**Rédaction attendue** : nommer le théorème et vérifier ses hypothèses en une phrase (« les $X_i$ sont i.i.d. gaussiennes, donc par Gosset… » ; « $\\phi$ est un $\\mathcal{C}^1$-difféomorphisme de $]0,\\infty[$ sur lui-même, donc… ») ; écrire la mesure dominante et le support ; donner le nombre de degrés de liberté avec sa justification (dimension du sous-espace).`,
      },
      {
        kind: 'text',
        id: 'ch1-s10-pieges',
        title: 'Pièges relevés dans les annales et les corrigés (DIAGNOSTIC §6)',
        text: `- **Conventions Gamma / exponentielle** : intensité (poly, PC1, Examen 2025 : $\\mathcal{E}(\\theta)$ de densité $\\theta e^{-\\theta x}$, $\\chi^2(p)=\\mathrm{Gamma}(p/2,1/2)$) contre échelle (CC 2022, PC3 Ex. 5, PC4 Ex. 1, PC5 Ex. 1 : $\\theta^{-1}e^{-x/\\theta}$, $\\chi^2(n)=\\mathrm{Gamma}(n/2,2)$). Relire l’en-tête et écrire la densité utilisée.
- **Degrés de liberté** : $n-1$ pour $S_n^2$ ; $n-2$ en régression simple, $n-p$ en régression multiple ; $\\widehat{\\sigma^2}_{ML}$ biaisé de $-\\sigma^2/n$.
- **Indépendance via Cochran** : vérifier que les deux statistiques sont fonctions de projections sur des sous-espaces **orthogonaux** ; $\\bar X_n$ et $S_n^2$ ne sont indépendantes que dans le cas gaussien ; $\\sum X_i$ et $\\sum X_i^2$ ne le sont pas.
- **$\\chi^2$ centré** : $\\|\\Pi Z\\|^2/\\sigma^2\\sim\\chi^2(k)$ exige $\\Pi\\mathbb{E}[Z]=0$.
- **Changement de variables** : valeur absolue du jacobien, indicatrice du support, découpage si non injectif ; jacobien $n!$ pour les statistiques d’ordre.
- **Statistique vs pivot** : une statistique ne dépend pas de $\\theta$ ; $\\sqrt n(\\bar X_n-\\mu)/S_n$ est un pivot.
- **Densité vs probabilité** : $p_\\theta(x)$ n’est une probabilité que pour la mesure de comptage.
- **Vecteur gaussien** : coordonnées gaussiennes $\\not\\Rightarrow$ vecteur gaussien ; la décorrélation n’entraîne l’indépendance que dans un vecteur gaussien ; covariance de $AX+b$ : $A\\Sigma A^\\top$.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 11. Hors programme / compléments
  // -------------------------------------------------------------------------
  {
    id: 'ch1-s11-hp',
    title: '11 · Compléments (hors programme) : hypergéométrique, censure, logistique, biais de 1/X̄ₙ, régression, modèles non dominés',
    role: 'complements',
    scope: 'hors-programme',
    intro: 'Section « 4 Les compléments » du poly (p. 42–59) : « Les contenus de cette partie ne sont pas exigibles ; ils enrichissent la culture statistique et préparent certains chapitres ultérieurs. » Résumés concis.',
    blocks: [
      {
        kind: 'text',
        id: 'ch1-s11-hyper',
        title: 'Sondage sans remise et loi hypergéométrique (p. 44–45)',
        scope: 'hors-programme',
        text: 'Population de $N$ individus dont $N\\theta$ votent A, $\\theta\\in\\{k/N,\\ k=0,\\dots,N\\}$ ; tirage de $n$ individus **sans** replacement ; $\\mathsf{Z}=\\{0,\\dots,n\\}$. Alors $\\mathbb{P}_\\theta(\\{k\\})=\\binom{N\\theta}{k}\\binom{N-N\\theta}{n-k}\\big/\\binom Nn$ pour $k$ entre $\\max(n-N(1-\\theta),0)$ et $\\min(N\\theta,n)$ : loi **hypergéométrique** $\\mathrm{Hyper}(N\\theta,N,n)$ (le modèle avec remise de l’Ex. 1.4 en est l’approximation quand $n\\ll N$).',
      },
      {
        kind: 'theorem',
        id: 'ch1-ex-4-6-censure',
        type: 'exemple',
        label: 'Exemples 4.5–4.6',
        title: 'Données censurées : domination par Leb + δ_τ',
        source: 'Poly ch.1, Compléments, Ex. 4.5–4.6, p. 45–46',
        scope: 'hors-programme',
        hypotheses: ['$n$-échantillon exponentiel $q_\\theta(x)=\\theta e^{-\\theta x}\\mathbb{1}_{\\mathbb{R}_+}(x)$ ; horizon $\\tau$ ; on observe $X_i^*=\\min(X_i,\\tau)$.'],
        statement: 'La loi $Q_\\theta^*$ de $X_i^*$ a un **atome** en $\\tau$ : elle n’est pas absolument continue par rapport à $\\mathrm{Leb}$, mais la famille est dominée par $\\mu=\\mathrm{Leb}+\\delta_\\tau$, avec $q_\\theta^*(x)=\\theta e^{-\\theta x}\\mathbb{1}_{\\{x<\\tau\\}}+e^{-\\theta\\tau}\\mathbb{1}_{\\{x=\\tau\\}}$. Le modèle induit par $(X_1^*,\\dots,X_n^*)$ est le $n$-échantillon de $([0,\\tau],\\mathcal{B}([0,\\tau]),\\{q_\\theta^*\\cdot\\mu\\})$.',
        intuition: 'La mesure dominante n’est pas toujours Lebesgue ou comptage : une mesure **mixte** convient ; l’atome grossit quand la censure est sévère.',
      },
      {
        kind: 'text',
        id: 'ch1-s11-logistique',
        title: 'Régression logistique (Ex. 4.7, p. 46–47) et systèmes de recommandation (Ex. 4.12, p. 56–57)',
        scope: 'hors-programme',
        text: 'Bio-essai : $q$ doses $x_i$, $n_i$ souris, $y_i$ décès ; $\\mathrm{logit}(\\pi)=\\ln\\frac\\pi{1-\\pi}$ et $\\pi(\\theta,x)=\\frac{e^{\\theta_0+\\theta_1x}}{1+e^{\\theta_0+\\theta_1x}}$ ; modèle produit $\\bigotimes_i\\mathrm{Bin}(n_i,\\pi(\\theta,x_i))$, $\\theta\\in\\mathbb{R}^2$ : observations indépendantes **non identiquement distribuées**. Recommandation : notes $Y_{i,j}\\in\\{1,\\dots,K\\}$ de loi catégorielle $\\propto e^{\\theta_{i,j,\\ell}}$ ; convention $\\theta_{i,j,K}=0$ sinon **non identifiable** (translation) ; hypothèse de rang faible $\\theta=UV^\\top$ (facteurs latents), seul $\\theta$ est identifiable, pas $(U,V)$ ; filtrage collaboratif.',
      },
      {
        kind: 'theorem',
        id: 'ch1-prop-4-1',
        type: 'proposition',
        label: 'Proposition 4.1',
        title: 'Biais et erreur quadratique de 1/X̄ₙ dans le modèle exponentiel',
        source: 'Poly ch.1, Compléments, Lemme 4.2 et Prop. 4.1, p. 48–50',
        scope: 'hors-programme',
        hypotheses: ['$n$-échantillon de $\\mathcal{E}(\\theta)$ (intensité) ; $\\hat\\theta_{n,1}=1/\\bar X_n$, $\\hat\\theta_{n,2}=(2/\\overline{X^2_n})^{1/2}$ (estimateurs des moments).'],
        statement: 'Sous $\\mathbb{P}_\\theta$, $\\sum_iX_i\\sim\\mathrm{Gamma}(n,\\theta)$ (additivité, Lemme 4.2). Pour $n\\ge2$, $\\mathbb{E}_\\theta[\\hat\\theta_{n,1}]=\\frac n{n-1}\\theta$ (biais $\\theta/(n-1)>0$ ; $(n-1)/\\sum_iX_i$ est sans biais) ; pour $n\\ge3$, $\\mathbb{E}_\\theta[(\\hat\\theta_{n,1}-\\theta)^2]=\\frac{n+2}{(n-1)(n-2)}\\theta^2$ ; $\\mathbb{E}_\\theta[\\hat\\theta_{1,1}]=+\\infty$. Simulations : $\\hat\\theta_{n,2}$ est nettement plus dispersé que $\\hat\\theta_{n,1}$.',
        intuition: 'Via $\\mathbb{E}[Y^{-k}]=\\theta^k\\Gamma(n-k)/\\Gamma(n)$ (fini ssi $n>k$) pour $Y\\sim\\mathrm{Gamma}(n,\\theta)$. Prépare le chapitre 3 (biais, risque) et le chapitre 6 (comparaison asymptotique : variances $\\theta^2$ et $\\frac54\\theta^2$).',
      },
      {
        kind: 'text',
        id: 'ch1-s11-regression',
        title: 'Anomalies de température : régression, rupture de pente (Ex. 4.9–4.11, Prop. 4.2–4.3, p. 51–55)',
        scope: 'hors-programme',
        text: 'Modèle $X_i=m(\\beta,i)+\\varepsilon_i$, $\\varepsilon_i$ i.i.d. $\\mathcal{N}(0,\\sigma^2)$. Tendance linéaire : $\\hat\\beta=(\\Phi^\\top\\Phi)^{-1}\\Phi^\\top X$ avec $\\hat\\beta_1=\\frac{\\sum_i(t(i)-\\bar t)(X_i-\\bar X_n)}{\\sum_i(t(i)-\\bar t)^2}$, $\\hat\\beta_0=\\bar X_n-\\hat\\beta_1\\bar t$ ; $\\hat\\sigma^2=(n-2)^{-1}\\|X-\\Phi\\hat\\beta\\|^2$. **Prop. 4.3 (Cochran)** : $\\hat\\beta\\sim\\mathcal{N}(\\beta,\\sigma^2(\\Phi^\\top\\Phi)^{-1})$, $(n-2)\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-2)$, indépendants ($\\Phi\\hat\\beta$ projection sur $\\mathrm{Im}\\,\\Phi$ de dimension 2). Application : pente $0{,}0072$ °C/an, écart-type $0{,}0008$, IC à 95 % $\\approx[0{,}0056;0{,}0088]$ ; résidus structurés $\\Rightarrow$ modèle avec **rupture de pente** estimé par vraisemblance profilée ($\\hat\\beta_3=\\arg\\min\\mathrm{RSS}(\\beta_3)$, rupture vers 1975).',
      },
      {
        kind: 'text',
        id: 'ch1-s11-non-domine',
        title: 'Mesures de domination et modèles non dominés (p. 57–59)',
        scope: 'hors-programme',
        text: 'Si $\\mathbb{P}_\\theta=p_\\theta\\cdot\\mu=q_\\theta\\cdot\\nu$, alors avec $\\lambda=\\mu+\\nu$, $\\mu=m\\cdot\\lambda$, $\\nu=n\\cdot\\lambda$ (Radon–Nikodym), $p_\\theta=q_\\theta\\,n/m$ $\\lambda$-p.p. sur $\\{m>0\\}$ : **le facteur $n/m$ ne dépend pas de $\\theta$** (identité valable p.p. seulement ; les versions continues des densités évitent la pathologie de Baraud–Birgé où l’EMV devient $\\max X_i$). **Ex. 4.13** : $\\{\\delta_\\theta,\\theta\\in\\mathbb{R}\\}$ n’est pas dominé (une mesure $\\sigma$-finie a au plus un nombre dénombrable d’atomes : preuve par l’absurde avec $\\mathbb{R}=\\bigcup_kF_k$, $\\mu(F_k)<\\infty$). **Ex. 4.14** : $\\mathbb{P}_\\theta=\\sum_{k\\ge1}e^{-k}\\delta_{\\theta k}$ (à normalisation près), non dégénérée et non dominée.',
      },
    ],
  },
]
