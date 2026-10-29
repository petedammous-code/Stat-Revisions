import type { CourseSection } from '../types'

/** Sections 1 à 4 du cours : intuition et notations, Neyman-Pearson, mise en œuvre, rapport de vraisemblance monotone et tests unilatéraux. */
export const coursePart1: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 1. Intuition et notations
  // -------------------------------------------------------------------------
  {
    id: 'ch5-s1-intuition',
    title: '1. Intuition et notations : quel est le meilleur test de niveau α ?',
    role: 'intuition',
    intro:
      'Au chapitre 4, on a construit des tests **de niveau** $\\alpha$ : la probabilité de rejeter $H_0$ à tort ne dépasse pas $\\alpha$. Cette contrainte laisse une immense liberté (le test qui ne rejette jamais la satisfait). Il faut un **second critère** : à niveau fixé, la **puissance** sous $H_1$. Le chapitre cherche le test le plus puissant **en chaque point** de l’alternative (test U.P.P.), montre qu’il existe pour deux hypothèses simples (Neyman-Pearson) et pour les hypothèses unilatérales dans les modèles à rapport de vraisemblance monotone, et qu’il n’existe pas toujours (hypothèse bilatérale).',
    blocks: [
      {
        kind: 'text',
        id: 'ch5-s1-pourquoi',
        title: 'Pourquoi un second critère (Poly ch.5, introduction p. 7–8)',
        text: `Un test de niveau $\\alpha$ est un test dont la probabilité de rejeter $H_0$ lorsqu’elle est vraie ne dépasse pas $\\alpha$. Deux exemples montrent que cette contrainte ne départage rien :

- le test qui **ne rejette jamais** ($\\phi\\equiv0$) est de niveau $\\alpha$, et il est sans intérêt ;
- le test qui rejette quand la statistique dépasse un seuil et celui qui rejette quand elle sort d’un intervalle central peuvent être tous deux de niveau $\\alpha$ et ne prennent pas les mêmes décisions.

**L’approche de Neyman-Pearson** : à niveau fixé, retenir le test de plus grande puissance sous $H_1$, et ce **en tout point** de l’alternative.

**Vocabulaire (rappel du chapitre 4).** Une hypothèse est **simple** si elle ne contient qu’une valeur du paramètre ($\\theta=\\theta_0$) : elle détermine complètement la loi de l’observation. Elle est **composite** sinon ($\\theta\\le\\theta_0$, $\\theta\\ne\\theta_0$) : le problème est alors plus difficile.

**Piège :** croire qu’un test « de niveau $\\alpha$ » est automatiquement un bon test ; le test $\\phi\\equiv0$ l’est.`,
      },
      {
        kind: 'text',
        id: 'ch5-s1-notations',
        title: 'Notations du poly (à reproduire telles quelles)',
        text: `- **Modèle** $(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ : espace des observations sans empattement $\\mathsf{Z}$, tribu calligraphique $\\mathcal{Z}$, probabilités et espérances ajourées $\\mathbb{P}_\\theta$, $\\mathbb{E}_\\theta$ ; observation $Z$ (souvent $Z=(X_1,\\dots,X_n)$).
- **Hypothèses** : partition $\\Theta=\\Theta_0\\cup\\Theta_1$, $H_0:\\theta\\in\\Theta_0$ contre $H_1:\\theta\\in\\Theta_1$.
- **Test** désigné par sa **fonction critique** $\\phi:\\mathsf{Z}\\to[0,1]$ (phi droit) ; test **pur** si $\\phi\\in\\{0,1\\}$, de **région de rejet** $\\mathcal{R}:=\\{z:\\phi(z)=1\\}$. Test de Neyman-Pearson $\\phi^\\star$ ; autre test U.P.P. $\\phi^{\\star\\star}$ ; test unilatéral $\\phi_{\\theta_0}$ ; tests à droite / à gauche $\\phi_+$, $\\phi_-$ ; test concurrent générique $\\psi$.
- **Fonction puissance** $\\beta_\\phi(\\theta):=\\mathbb{E}_\\theta[\\phi(Z)]$ ; **taille** $\\overline{\\alpha}(\\phi)$ (alpha surligné : un nombre attaché au test) ; **niveau** $\\alpha$ (une borne) ; $\\mathcal{K}_\\alpha(\\Theta_0)$ ensemble des tests de niveau $\\alpha$.
- **Densités** : $\\mathbb{P}_\\theta=p_\\theta\\cdot\\nu$ avec $\\nu$ mesure $\\sigma$-finie dominante (notée $\\mu$ dans les Déf. 1.4–1.5 et le Lemme 2.1 ; attention, $\\mu$ est aussi la moyenne gaussienne dans les exemples).
- **Rapport de vraisemblance** $r(z):=p_{\\theta_1}(z)/p_{\\theta_0}(z)$ ; valeur critique du rapport $c_\\alpha$ ; seuil sur la statistique $d_\\alpha$ ; statistique $T(Z)$ avec $r(Z)=\\tilde r(T(Z))$.
- **Fonction de survie** $\\bar F(c)$, limite à gauche $\\bar F(c^-)$ ; quantile $z_\\beta$ de $\\mathcal{N}(0,1)$ (donc $z_{1-\\alpha}$, $z_\\alpha=-z_{1-\\alpha}$), quantile $\\chi^2_\\beta(k)$ de $\\chi^2(k)$ ; $\\Phi$ f.d.r. de $\\mathcal{N}(0,1)$. (Dans la PC5, les quantiles gaussiens sont notés $q_\\beta$.)
- **Factorisation (2)** des familles à rapport monotone : $p_\\theta(z)=h(z)\\,\\psi(T(z);\\theta)$. **Attention** : la lettre $\\psi$ y désigne une fonction, alors qu’elle désigne aussi un test concurrent.
- $p$-valeur $\\hat\\alpha(Z)$ ; coefficient de randomisation $\\gamma_\\alpha$ (compléments) ; rapport généralisé $\\Lambda_n$ (compléments).
- **Lois** : $\\mathcal{B}\\mathrm{er}(\\theta)$, $\\mathrm{Bin}(n,\\theta)$, $\\mathrm{Poi}(\\lambda)$, $\\mathrm{Gamma}(n,\\lambda)$ **paramétrée par l’intensité** ($\\mathrm{Gamma}(n,1/\\theta)$ a pour densité $\\theta^{-n}x^{n-1}e^{-x/\\theta}/\\Gamma(n)$), $\\chi^2(k)=\\mathrm{Gamma}(k/2,1/2)$. **Attention** : dans l’Exercice 1 (PC5 Ex. 1), $\\theta$ est la **moyenne** de l’exponentielle ($p_\\theta(x)=\\theta^{-1}e^{-x/\\theta}$) ; dans l’Examen 2025 Ex. 1, c’est l’**intensité** ($\\theta e^{-\\theta x}$) : le sens du rejet s’inverse.
- Abréviations : **U.P.P.($\\alpha$)** = uniformément plus puissant au niveau $\\alpha$ ; **U.M.P.U.($\\alpha$)** = *uniformly most powerful unbiased*.`,
      },
      {
        kind: 'theorem',
        id: 'ch5-rem-fonction-critique',
        type: 'remarque',
        label: 'Remarque (§1.1)',
        title: 'Test pur et fonction critique à valeurs dans [0, 1]',
        source: 'Poly ch.5, §1.1, p. 9',
        hypotheses: ['Modèle $(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$, partition $\\Theta=\\Theta_0\\cup\\Theta_1$.'],
        statement: 'Un **test pur** est une fonction mesurable $\\phi:\\mathsf{Z}\\to\\{0,1\\}$ : on rejette $H_0$ lorsque $\\phi(Z)=1$ et l’on **échoue à la rejeter** lorsque $\\phi(Z)=0$. Dans tout le chapitre, on autorise la **fonction critique** $\\phi$ à prendre ses valeurs dans $[0,1]$ (test **randomisé**, décrit dans les compléments, Déf. 4.1) : cela permet d’écrire les énoncés une seule fois. Les tests construits dans la partie principale sont tous des tests purs.',
        intuition: 'Élargir à $[0,1]$ **convexifie** l’ensemble des tests : le problème « maximiser la puissance sous contrainte de niveau » devient un problème d’optimisation **linéaire** (remarque après le Th. 1.1).',
      },
      {
        kind: 'theorem',
        id: 'ch5-def-1-1',
        type: 'definition',
        label: 'Définition 1.1',
        title: 'Fonction puissance, taille, niveau',
        source: 'Poly ch.5, Déf. 1.1, p. 9',
        hypotheses: ['$\\phi:\\mathsf{Z}\\to[0,1]$ fonction critique d’un test de $H_0:\\theta\\in\\Theta_0$ contre $H_1:\\theta\\in\\Theta_1$.'],
        statement: `La **fonction puissance** de $\\phi$ est

$$\\beta_\\phi:\\theta\\in\\Theta\\longmapsto\\mathbb{E}_\\theta[\\phi(Z)]\\in[0,1],$$

sa **taille** est $\\overline{\\alpha}(\\phi):=\\sup_{\\theta\\in\\Theta_0}\\beta_\\phi(\\theta)$, et le test est dit **de niveau** $\\alpha\\in[0,1]$ si $\\overline{\\alpha}(\\phi)\\le\\alpha$. On note $\\mathcal{K}_\\alpha(\\Theta_0)$ l’ensemble des tests de niveau $\\alpha$ de l’hypothèse nulle $H_0:\\theta\\in\\Theta_0$.

Pour un test pur, $\\mathbb{E}_\\theta[\\phi(Z)]=\\mathbb{P}_\\theta(\\phi(Z)=1)=\\mathbb{P}_\\theta(Z\\in\\mathcal{R})$ : la définition généralise celle du chapitre 4.`,
        intuition: 'Sur $\\Theta_0$, $\\beta_\\phi$ est la probabilité de rejeter **à tort** (à minimiser) ; sur $\\Theta_1$, celle de rejeter **à bon droit** (à maximiser). L’idéal ($0$ sur $\\Theta_0$, $1$ sur $\\Theta_1$) est impossible : Neyman-Pearson **hiérarchise** — borne $\\alpha$ sur $\\Theta_0$, puis maximisation sur $\\Theta_1$. Figure p. 9 : dans le modèle gaussien de variance connue, la puissance atteignable du test U.P.P. de $\\mu\\le\\mu_0$ contre $\\mu>\\mu_0$ vaut $\\alpha$ en $\\mu_0$ et croît vers $1$.',
        pitfalls: [
          'Confondre **taille** $\\overline{\\alpha}(\\phi)$ (un nombre attaché au test) et **niveau** $\\alpha$ (une borne). Un test de niveau $\\alpha$ n’est pas forcément de taille $\\alpha$ : test qui ne rejette jamais (taille 0), tests discrets (PC4 Ex. 4 : taille $0{,}049$ au niveau $0{,}05$), Exercice 4 (exponentielle translatée).',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch5-rem-niveau-theta0',
        type: 'remarque',
        label: 'Remarque (§1.1)',
        title: 'Le niveau ne dépend que des lois de Θ₀',
        source: 'Poly ch.5, §1.1, p. 9–10 (figure « trois régions de rejet »)',
        hypotheses: ['Deux hypothèses simples $\\Theta=\\{\\theta_0,\\theta_1\\}$.'],
        statement: `*Le fait qu’un test soit de niveau $\\alpha$ ne dépend que des lois indexées par $\\Theta_0$.* Pour $\\Theta=\\{\\theta_0,\\theta_1\\}$, la contrainte $\\mathbb{P}_{\\theta_0}(Z\\in\\mathcal{R}_\\alpha)\\le\\alpha$ ne fait intervenir que $p_{\\theta_0}$ : il existe une infinité de régions de rejet de niveau $\\alpha$, mais elles n’ont pas la même probabilité sous $\\mathbb{P}_{\\theta_1}$.

Figure p. 10 : $p_{\\theta_0}=\\mathcal{N}(0,1)$, $p_{\\theta_1}=\\mathcal{N}(2,1)$, $\\alpha=0{,}10$ :

- $\\mathcal{R}=\\{z>z_{1-\\alpha}\\}$ : taille $0{,}10$, puissance $0{,}76$ ;
- $\\mathcal{R}=\\{z<z_\\alpha\\}$ : taille $0{,}10$, puissance $0{,}00$ ;
- $\\mathcal{R}=\\{|z|<c\\}$ : taille $0{,}10$, puissance $0{,}01$.`,
        intuition: 'Point de départ de tout le chapitre : la contrainte ne distingue pas ces tests, la puissance les distingue énormément. Question : quelle région de rejet de niveau $\\alpha$ maximise la puissance ?',
      },
      {
        kind: 'theorem',
        id: 'ch5-def-1-2',
        type: 'definition',
        label: 'Définition 1.2',
        title: 'Test uniformément plus puissant (U.P.P.)',
        source: 'Poly ch.5, Déf. 1.2, p. 10',
        hypotheses: ['$\\alpha\\in\\,]0,1[$.'],
        statement: `Un test de fonction critique $\\phi$ est dit **uniformément plus puissant au niveau $\\alpha$**, en abrégé **U.P.P.($\\alpha$)**, s’il est de niveau $\\alpha$, c’est-à-dire $\\phi\\in\\mathcal{K}_\\alpha(\\Theta_0)$, et si

$$\\beta_\\phi(\\theta)=\\sup_{\\psi\\in\\mathcal{K}_\\alpha(\\Theta_0)}\\beta_\\psi(\\theta)\\qquad\\text{pour tout }\\theta\\in\\Theta_1.$$`,
        intuition: 'La définition demande beaucoup : puissance maximale **en chaque point** de $\\Theta_1$ **et par le même test**. C’est la borne supérieure du préordre sur les tests (chapitre 3) restreinte à $\\Theta_1$ : deux tests dont les fonctions puissance se croisent sur $\\Theta_1$ ne sont pas comparables. Comme pour les estimateurs, l’ordre est partiel et l’existence d’un maximum n’est pas automatique ; la restriction à $\\mathcal{K}_\\alpha(\\Theta_0)$ suffit dans deux situations, pas dans toutes.',
        pitfalls: ['La condition d’optimalité ne porte **que sur $\\Theta_1$** ; sur $\\Theta_0$, seule compte la contrainte de niveau (question courte 2 du poly).'],
      },
      {
        kind: 'viz',
        id: 'ch5-s1-viz-trois-tests',
        vizId: 'ch5-bilateral',
        caption: 'Figure p. 11 du poly : trois tests de taille $\\alpha$ de $\\mu=0$ contre $\\mu>0$ (rejet si $\\sqrt n\\bar X_n>z_{1-\\alpha}$, si $|\\sqrt n\\bar X_n|>z_{1-\\alpha/2}$, si $\\sqrt n\\bar X_n<z_\\alpha$). Sur $\\Theta_1=\\{\\theta>\\theta_0\\}$, la courbe du test « à droite » domine les deux autres en chaque point : c’est le test U.P.P.($\\alpha$).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 2. Neyman-Pearson
  // -------------------------------------------------------------------------
  {
    id: 'ch5-s2-neyman-pearson',
    title: '2. Deux hypothèses simples : le théorème de Neyman-Pearson',
    role: 'preuves',
    intro:
      'Cadre du §1.3 : l’observation $Z$ (éventuellement $Z=(X_1,\\dots,X_n)$) a pour loi $\\mathbb{P}_\\theta=p_\\theta\\cdot\\nu$, $\\theta\\in\\Theta:=\\{\\theta_0,\\theta_1\\}$, et l’on teste $H_0:\\theta=\\theta_0$ contre $H_1:\\theta=\\theta_1$. Le test optimal rejette là où le **rapport de vraisemblance** est grand et **dépense tout le budget** $\\alpha$.',
    blocks: [
      {
        kind: 'text',
        id: 'ch5-s2-enigme',
        title: 'Une énigme : quels terrains acheter ? (§1.2, p. 11)',
        text: 'Une grille $G$ de pixels ; chaque pixel $z$ coûte $c_0(z)\\ge0$ et rapporte $r_1(z)\\ge0$ ; budget total $\\alpha$. Quels pixels acheter pour maximiser le gain ? Passage au continu : on achète un sous-ensemble $\\mathcal{R}$ de l’espace des observations, dont le coût et le gain sont les intégrales de deux fonctions positives sur $\\mathcal{R}$. C’est un problème de « sac à dos » continu : acheter d’abord ce qui rapporte le plus **par unité de coût**. La réponse est le théorème de Neyman-Pearson (§1.5, plus bas).',
      },
      {
        kind: 'theorem',
        id: 'ch5-def-1-3',
        type: 'definition',
        label: 'Définition 1.3',
        title: 'Rapport de vraisemblance',
        source: 'Poly ch.5, Déf. 1.3, p. 11',
        hypotheses: [
          '$\\mathbb{P}_\\theta=p_\\theta\\cdot\\nu$ avec $\\nu$ mesure $\\sigma$-finie sur $(\\mathsf{Z},\\mathcal{Z})$.',
          '$\\Theta:=\\{\\theta_0,\\theta_1\\}$, $\\theta_0\\ne\\theta_1$ ; test $H_0:\\theta=\\theta_0$ contre $H_1:\\theta=\\theta_1$.',
        ],
        statement: `Le **rapport de vraisemblance** est la statistique

$$r(z):=\\frac{p_{\\theta_1}(z)}{p_{\\theta_0}(z)},\\qquad z\\in\\mathsf{Z}\\ \\text{tel que}\\ p_{\\theta_0}(z)>0.$$

Comme $\\mathbb{P}_{\\theta_0}(p_{\\theta_0}(Z)>0)=1$, cela suffit pour parler de la loi de $r(Z)$ sous $\\mathbb{P}_{\\theta_0}$. Dans les énoncés, on écrit les régions sous la forme $\\{p_{\\theta_1}(z)>c\\,p_{\\theta_0}(z)\\}$, qui a un sens en tout point de $\\mathsf{Z}$.`,
        intuition: 'On n’optimise plus la vraisemblance (chapitre 2) : on l’évalue en deux points et on en prend le quotient. Une grande valeur de $r(z)$ signifie que $z$ était bien plus probable sous $\\theta_1$ que sous $\\theta_0$ : elle plaide contre $H_0$.',
        pitfalls: [
          'Utiliser $\\{r>c\\}$ là où $p_{\\theta_0}=0$ (modèles à support dépendant du paramètre : exponentielle translatée, uniforme).',
          'Ne pas confondre avec le rapport de vraisemblance **généralisé** $\\Lambda_n$ (Déf. 4.3, compléments) : un sup sur des hypothèses composites, et l’on rejette pour ses **petites** valeurs.',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch5-cadre-1-1',
        type: 'definition',
        label: 'Cadre 1.1',
        title: 'Absence d’atome du rapport de vraisemblance',
        source: 'Poly ch.5, Cadre 1.1, p. 12',
        hypotheses: ['Cadre de la Déf. 1.3 ; hypothèse faite dans toute la partie principale (§1.3–§1.7).'],
        statement: `Pour tout $c\\ge0$ et tout $\\theta\\in\\Theta$,

$$\\mathbb{P}_\\theta\\big(p_{\\theta_1}(Z)=c\\,p_{\\theta_0}(Z)\\big)=0.$$

Vérifiée dès que $r(Z)$ est à densité par rapport à la mesure de Lebesgue (exemples gaussiens). Mise en défaut dès que l’observation est discrète (Bernoulli, Poisson) : la statistique ne prend qu’un nombre dénombrable de valeurs et charge chacune d’elles ; ce cas est traité dans les compléments (tests randomisés, Th. 4.1).`,
        intuition: 'Deux rôles : (a) la fonction de survie de $r(Z)$ est **continue**, donc on peut atteindre **exactement** la taille $\\alpha$ avec un test pur ; (b) la frontière $\\{p_{\\theta_1}=c\\,p_{\\theta_0}\\}$ est négligeable, d’où l’**unicité** (Th. 1.2).',
        pitfalls: ['Appliquer le Th. 1.1 tel quel à une statistique discrète (binomiale, Poisson, binomiale négative) : il faut alors randomiser.'],
      },
      {
        kind: 'theorem',
        id: 'ch5-prop-2-1',
        type: 'proposition',
        label: 'Proposition 2.1 (Outils)',
        title: 'Régularité de la fonction de répartition et de la fonction de survie',
        source: 'Poly ch.5, Outils, Prop. 2.1, p. 26',
        hypotheses: ['$Y$ variable aléatoire réelle, $F(c):=\\mathbb{P}(Y\\le c)$, $\\bar F(c):=\\mathbb{P}(Y>c)=1-F(c)$.'],
        statement: '$F$ est croissante, continue à droite, et admet en tout point une limite à gauche $F(c^-)=\\mathbb{P}(Y<c)$ ; le saut de $F$ en $c$ vaut $F(c)-F(c^-)=\\mathbb{P}(Y=c)$. Symétriquement, $\\bar F$ est décroissante, continue à droite, $\\bar F(c^-)=\\mathbb{P}(Y\\ge c)$, et $\\bar F(c^-)-\\bar F(c)=\\mathbb{P}(Y=c)$.',
        intuition: 'Une valeur $c$ avec $\\mathbb{P}(Y=c)>0$ est un **atome** ; « pas d’atome » $\\iff$ $F$ continue. Si de plus $\\bar F(0)=1$ et $\\bar F(c)\\to0$, le TVI donne une solution à $\\bar F(c)=\\alpha$ : c’est l’argument d’existence de $c_\\alpha$.',
        proof: [
          { text: 'Croissance de $F$ : $\\{Y\\le c\\}\\subseteq\\{Y\\le c\'\\}$ si $c\\le c\'$.', justification: 'Croissance de la probabilité.' },
          { text: 'Continuité à droite : pour $(c_k)$ décroissant vers $c$, $\\{Y\\le c_k\\}$ décroît vers $\\bigcap_k\\{Y\\le c_k\\}=\\{Y\\le c\\}$, donc $F(c_k)\\to F(c)$.', justification: 'Continuité décroissante de la mesure de probabilité.' },
          { text: 'Limite à gauche : pour $(c_k)$ croissant strictement vers $c$, $\\{Y\\le c_k\\}$ croît vers $\\bigcup_k\\{Y\\le c_k\\}=\\{Y<c\\}$, donc $F(c_k)\\to\\mathbb{P}(Y<c)$.', justification: 'Continuité croissante de la mesure de probabilité.' },
          { text: 'Le saut s’obtient par différence ; les énoncés sur $\\bar F=1-F$ s’en déduisent.', justification: '$\\mathbb{P}(Y\\le c)-\\mathbb{P}(Y<c)=\\mathbb{P}(Y=c)$.' },
        ],
        pitfalls: ['Confondre $\\mathbb{P}(Y<c)$ et $\\mathbb{P}(Y\\le c)$ en présence d’atomes (statistiques entières : $p$-valeur discrète, PC4 Ex. 4).'],
      },
      {
        kind: 'theorem',
        id: 'ch5-thm-1-1',
        type: 'theoreme',
        label: 'Théorème 1.1',
        title: 'Neyman-Pearson, cas de deux hypothèses simples',
        source: 'Poly ch.5, Th. 1.1, p. 12–13',
        hypotheses: [
          '$\\nu$ mesure $\\sigma$-finie sur $(\\mathsf{Z},\\mathcal{Z})$ ; modèle $\\big(\\mathsf{Z},\\mathcal{Z},\\{p_\\theta\\cdot\\nu,\\ \\theta\\in\\Theta:=\\{\\theta_0,\\theta_1\\}\\}\\big)$, $\\theta_0\\ne\\theta_1$.',
          '**Absence d’atome** du rapport de vraisemblance (Cadre 1.1).',
          '$\\alpha\\in\\,]0,1[$.',
        ],
        statement: `(i) Il existe une constante $c_\\alpha>0$ telle que le test pur de fonction critique

$$\\phi^\\star(z):=\\mathbb{1}_{\\{p_{\\theta_1}(z)>c_\\alpha p_{\\theta_0}(z)\\}}$$

soit de **taille exactement** $\\alpha$ : $\\mathbb{E}_{\\theta_0}[\\phi^\\star(Z)]=\\int_{\\mathsf{Z}}\\phi^\\star(z)\\,p_{\\theta_0}(z)\\,\\nu(\\mathrm{d}z)=\\alpha$.

(ii) Le test $\\phi^\\star$ est **U.P.P.($\\alpha$)** pour $H_0:\\theta=\\theta_0$ contre $H_1:\\theta=\\theta_1$, et sa puissance vérifie $\\mathbb{E}_{\\theta_1}[\\phi^\\star(Z)]\\ge\\alpha$.`,
        intuition: 'On rejette là où l’observation plaide le plus contre $H_0$ (grand $r$) et l’on **dépense tout le budget** $\\alpha$. Remarque d’amphi : le problème « maximiser $\\int\\phi\\,p_{\\theta_1}\\,\\mathrm{d}\\nu$ sous $\\int\\phi\\,p_{\\theta_0}\\,\\mathrm{d}\\nu\\le\\alpha$ et $0\\le\\phi\\le1$ » est un **problème d’optimisation linéaire sous contrainte linéaire** ; la dualité lagrangienne en donne une preuve naturelle, et $c_\\alpha$ y est le **multiplicateur de Lagrange** de la contrainte de budget.',
        proof: [
          { text: '*(i) Existence de $c_\\alpha$.* On pose $\\bar F:c\\in\\mathbb{R}_+\\mapsto\\mathbb{P}_{\\theta_0}\\big(p_{\\theta_1}(Z)>c\\,p_{\\theta_0}(Z)\\big)$ ; elle est **décroissante**.', justification: 'Les événements $\\{p_{\\theta_1}(Z)>c\\,p_{\\theta_0}(Z)\\}$ décroissent quand $c$ croît.' },
          { text: 'Comme $p_{\\theta_0}(Z)>0$ $\\mathbb{P}_{\\theta_0}$-p.s., $\\bar F(c)=\\mathbb{P}_{\\theta_0}(r(Z)>c)$ : fonction de survie de la v.a. positive $r(Z)$, continue à droite avec limites à gauche, et $\\bar F(c^-)-\\bar F(c)=\\mathbb{P}_{\\theta_0}(r(Z)=c)$.', justification: 'Outils, Prop. 2.1.' },
          { text: 'L’absence d’atome annule tous ces sauts : $\\bar F$ est **continue** sur $\\mathbb{R}_+$.', justification: 'Cadre 1.1 sous $\\theta=\\theta_0$.' },
          { text: '$\\bar F(0)=\\mathbb{P}_{\\theta_0}(r(Z)>0)=1$ et $\\lim_{c\\to+\\infty}\\bar F(c)=\\mathbb{P}_{\\theta_0}(r(Z)=+\\infty)=0$.', justification: 'Absence d’atome en $c=0$ ; $r(Z)$ finie $\\mathbb{P}_{\\theta_0}$-p.s. et continuité décroissante de la probabilité.' },
          { text: 'Pour tout $\\alpha\\in\\,]0,1[$, il existe $c_\\alpha>0$ avec $\\bar F(c_\\alpha)=\\alpha$, i.e. $\\mathbb{E}_{\\theta_0}[\\phi^\\star(Z)]=\\alpha$.', justification: 'Théorème des valeurs intermédiaires ($\\bar F$ continue, de $1$ à $0$).' },
          { text: '*(ii) Optimalité.* Soit $\\phi\\in\\mathcal{K}_\\alpha(\\Theta_0)$. **Inégalité clé (1)** : pour tout $z$, $\\{\\phi^\\star(z)-\\phi(z)\\}\\{p_{\\theta_1}(z)-c_\\alpha p_{\\theta_0}(z)\\}\\ge0$.', justification: 'Par cas : si $p_{\\theta_1}-c_\\alpha p_{\\theta_0}>0$, $\\phi^\\star=1\\ge\\phi$ ; si $<0$, $\\phi^\\star=0\\le\\phi$ ; si $=0$, produit nul.' },
          { text: 'On intègre (1) par rapport à $\\nu$ : $\\mathbb{E}_{\\theta_1}[\\phi^\\star(Z)]-\\mathbb{E}_{\\theta_1}[\\phi(Z)]\\ge c_\\alpha\\big(\\mathbb{E}_{\\theta_0}[\\phi^\\star(Z)]-\\mathbb{E}_{\\theta_0}[\\phi(Z)]\\big)$.', justification: 'Positivité et linéarité de l’intégrale ; $\\mathbb{E}_\\theta[\\phi(Z)]=\\int\\phi\\,p_\\theta\\,\\mathrm{d}\\nu$.' },
          { text: 'Le membre de droite vaut $c_\\alpha(\\alpha-\\mathbb{E}_{\\theta_0}[\\phi(Z)])\\ge0$, d’où $\\mathbb{E}_{\\theta_1}[\\phi^\\star(Z)]\\ge\\mathbb{E}_{\\theta_1}[\\phi(Z)]$ : $\\phi^\\star$ est U.P.P.($\\alpha$).', justification: '$\\phi^\\star$ de **taille** exactement $\\alpha$ (point (i)), $\\phi$ de **niveau** $\\alpha$, et $c_\\alpha>0$.' },
          { text: '*Puissance $\\ge\\alpha$* : le test constant $\\psi\\equiv\\alpha$ est de niveau $\\alpha$ et de puissance $\\alpha$ ; donc $\\mathbb{E}_{\\theta_1}[\\phi^\\star(Z)]\\ge\\alpha$.', justification: 'Optimalité de $\\phi^\\star$ (étape précédente) appliquée à $\\psi\\equiv\\alpha$.' },
        ],
        pitfalls: [
          'L’étape « membre de droite $\\ge0$ » utilise l’**égalité** $\\mathbb{E}_{\\theta_0}[\\phi^\\star]=\\alpha$ : si $\\phi^\\star$ n’était que de niveau $\\alpha$, la différence n’aurait pas de signe. D’où l’insistance sur la **taille exacte**, et la randomisation dans le cas discret.',
          '$c_\\alpha>0$ est indispensable pour conserver le sens de l’inégalité.',
          'L’optimalité porte sur **tous** les tests randomisés de niveau $\\alpha$, pas seulement sur les tests purs.',
        ],
      },
      {
        kind: 'viz',
        id: 'ch5-s2-viz-np',
        vizId: 'ch5-neyman-pearson',
        caption: 'Neyman-Pearson en image : la région $\\{r(z)>c_\\alpha\\}$ « achète » les points où le rapport gain/coût $p_{\\theta_1}/p_{\\theta_0}$ est le plus grand, jusqu’à épuiser le budget $\\alpha$ (aire rouge sous $p_{\\theta_0}$). Comparer sa puissance (aire verte sous $p_{\\theta_1}$) à celle des autres régions de même taille.',
      },
      {
        kind: 'theorem',
        id: 'ch5-thm-1-2',
        type: 'theoreme',
        label: 'Théorème 1.2',
        title: 'Caractérisation (unicité) des tests U.P.P.',
        source: 'Poly ch.5, Th. 1.2, p. 13–14',
        hypotheses: ['Hypothèses du Th. 1.1 (dont l’**absence d’atome**).', '$\\phi^{\\star\\star}$ fonction critique d’un test U.P.P.($\\alpha$) pour $\\theta=\\theta_0$ contre $\\theta=\\theta_1$.'],
        statement: `$$\\phi^{\\star\\star}(z)=\\begin{cases}1&\\text{si }p_{\\theta_1}(z)>c_\\alpha\\,p_{\\theta_0}(z),\\\\0&\\text{si }p_{\\theta_1}(z)<c_\\alpha\\,p_{\\theta_0}(z),\\end{cases}$$

pour $\\nu$-presque tout $z\\in\\mathsf{Z}$. En particulier $\\phi^{\\star\\star}=\\phi^\\star$ $\\mathbb{P}_{\\theta_0}$-p.s. et $\\mathbb{P}_{\\theta_1}$-p.s. : les deux tests ont la même fonction puissance.`,
        intuition: 'Le test de Neyman-Pearson n’est pas seulement optimal, il est **essentiellement le seul** ; deux U.P.P. ne peuvent différer que sur la frontière $\\{r=c_\\alpha\\}$, négligeable sans atome. C’est l’argument clé de la non-existence d’un U.P.P. bilatéral (Prop. 1.1).',
        proof: [
          { text: '$\\phi^\\star$ et $\\phi^{\\star\\star}$ étant tous deux U.P.P.($\\alpha$), leurs puissances en $\\theta_1$ coïncident : $\\mathbb{E}_{\\theta_1}[\\phi^\\star(Z)]-\\mathbb{E}_{\\theta_1}[\\phi^{\\star\\star}(Z)]=0$.', justification: 'Chacun atteint le sup de la Déf. 1.2 en $\\theta_1$.' },
          { text: '$c_\\alpha\\big(\\mathbb{E}_{\\theta_0}[\\phi^\\star(Z)]-\\mathbb{E}_{\\theta_0}[\\phi^{\\star\\star}(Z)]\\big)=c_\\alpha\\big(\\alpha-\\mathbb{E}_{\\theta_0}[\\phi^{\\star\\star}(Z)]\\big)\\ge0$.', justification: '$\\phi^\\star$ de taille $\\alpha$, $\\phi^{\\star\\star}$ de niveau $\\alpha$, $c_\\alpha>0$.' },
          { text: 'En soustrayant : $\\int_{\\mathsf{Z}}\\{\\phi^\\star-\\phi^{\\star\\star}\\}\\{p_{\\theta_1}-c_\\alpha p_{\\theta_0}\\}\\,\\mathrm{d}\\nu\\le0$.', justification: 'Linéarité de l’intégrale, combinaison des deux étapes précédentes.' },
          { text: 'L’intégrande est $\\ge0$ partout, donc **nulle $\\nu$-p.p.** ; hors de $\\{p_{\\theta_1}=c_\\alpha p_{\\theta_0}\\}$, $\\phi^{\\star\\star}=\\phi^\\star$.', justification: 'Inégalité clé (1) avec $\\phi=\\phi^{\\star\\star}$ ; une fonction positive d’intégrale $\\le0$ est nulle presque partout.' },
          { text: 'Avec $A:=\\{p_{\\theta_1}=c_\\alpha p_{\\theta_0}\\}$ : $\\mathbb{P}_{\\theta_0}(Z\\in A)=0$, et $\\mathbb{P}_{\\theta_1}(Z\\in A)=\\int_Ap_{\\theta_1}\\,\\mathrm{d}\\nu=c_\\alpha\\int_Ap_{\\theta_0}\\,\\mathrm{d}\\nu=0$.', justification: 'Absence d’atome (Cadre 1.1) ; sur $A$, $p_{\\theta_1}=c_\\alpha p_{\\theta_0}$.' },
        ],
        pitfalls: [
          '« Deux tests U.P.P.($\\alpha$) coïncident en tout point de $\\mathsf{Z}$ » est **faux** (question courte 4) : seulement $\\nu$-p.p. hors de la frontière, et p.s. sous $\\mathbb{P}_{\\theta_0}$ et $\\mathbb{P}_{\\theta_1}$.',
          'Avec atomes (Th. 4.1, Ex. 4.5, Exercices 4 et 7), l’unicité tombe.',
        ],
      },
      {
        kind: 'text',
        id: 'ch5-s2-retour-enigme',
        title: 'Retour sur l’énigme (§1.5, p. 14)',
        text: `Choisir un test de niveau $\\alpha$, c’est choisir $\\mathcal{R}_\\alpha$ avec

$$\\int_{\\mathcal{R}_\\alpha}p_{\\theta_0}(z)\\,\\nu(\\mathrm{d}z)\\le\\alpha,$$

c’est-à-dire **acheter une portion de l’espace en respectant un budget** $\\alpha$, le coût étant la densité $p_{\\theta_0}$. Maximiser la puissance, c’est maximiser le **gain** $\\int_{\\mathcal{R}_\\alpha}p_{\\theta_1}\\,\\mathrm{d}\\nu$. Le théorème dit : (a) acheter les zones où le rapport gain/coût $r(z)=p_{\\theta_1}(z)/p_{\\theta_0}(z)$ est le plus grand ; (b) **dépenser tout le budget** (taille exactement $\\alpha$).

Limite de l’analogie : en discret, les pixels sont indivisibles et l’on ne peut pas toujours dépenser exactement le budget ; c’est le cas des atomes du rapport de vraisemblance. Il faut alors « **couper un pixel en deux** » : c’est la randomisation (compléments, §8).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 3. Mise en œuvre
  // -------------------------------------------------------------------------
  {
    id: 'ch5-s3-methodes',
    title: '3. Mise en œuvre : rapport, statistique monotone, seuil sous H₀',
    role: 'exemples',
    intro:
      'En pratique, on ne calcule presque jamais $c_\\alpha$ : on écrit $r(Z)$ comme fonction strictement monotone d’une statistique simple $T(Z)$ et l’on règle un seuil $d_\\alpha$ sur $T$, **sous la loi de $H_0$**. Trois exemples gaussiens montrent le décalage du seuil, une région de rejet qui n’est pas une queue, et le calcul de puissance.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch5-meth-1-1',
        type: 'methode',
        label: 'Méthode 1.1',
        title: 'Détermination du test U.P.P.(α), deux hypothèses simples',
        source: 'Poly ch.5, Méthode 1.1, p. 15',
        hypotheses: ['Test $H_0:\\theta=\\theta_0$ contre $H_1:\\theta=\\theta_1$.'],
        statement: `1. Calculer le rapport de vraisemblance $r(z)=p_{\\theta_1}(z)/p_{\\theta_0}(z)$.
2. Vérifier que $r(Z)$ n’a pas d’atome sous $\\mathbb{P}_{\\theta_0}$ ; sinon, se reporter à la forme générale (Th. 4.1).
3. On rejette lorsque $r(Z)$ est grand : région $\\{z:\\ r(z)>c_\\alpha\\}$.
4. Identifier $c_\\alpha$ par la condition de taille $\\mathbb{P}_{\\theta_0}(r(Z)>c_\\alpha)=\\alpha$, **l’égalité étant exacte**.

Le test $\\phi^\\star(Z)=\\mathbb{1}_{\\{r(Z)>c_\\alpha\\}}$ est alors U.P.P.($\\alpha$), et tout autre test U.P.P.($\\alpha$) lui est égal $\\mathbb{P}_{\\theta_0}$- et $\\mathbb{P}_{\\theta_1}$-p.s.`,
        intuition: 'Recette en 4 temps : rapport, atomes, sens du rejet, seuil sous $H_0$. L’étape 4 n’est presque jamais menée sur $r(Z)$ directement (Méthode 1.2).',
      },
      {
        kind: 'theorem',
        id: 'ch5-meth-1-2',
        type: 'methode',
        label: 'Méthode 1.2',
        title: 'Passer par une statistique monotone',
        source: 'Poly ch.5, Méthode 1.2, p. 15',
        hypotheses: ['$r(Z)=\\tilde r(T(Z))$ avec $\\tilde r$ **strictement monotone**.'],
        statement: `1. Si $\\tilde r$ est croissante, $r(Z)>c_\\alpha\\iff T(Z)>d_\\alpha$ ; si elle est décroissante, $r(Z)>c_\\alpha\\iff T(Z)<d_\\alpha$.
2. Au lieu de chercher $c_\\alpha$, on identifie directement $d_\\alpha$ tel que $\\mathbb{P}_{\\theta_0}(T(Z)>d_\\alpha)=\\alpha$ (resp. $\\mathbb{P}_{\\theta_0}(T(Z)<d_\\alpha)=\\alpha$).

Il suffit donc de connaître **la loi de $T(Z)$ sous $\\mathbb{P}_{\\theta_0}$** ; on peut en déduire $c_\\alpha=\\tilde r(d_\\alpha)$ si besoin.`,
        pitfalls: ['Oublier de **renverser l’inégalité** quand $\\tilde r$ est décroissante (Examen 2025 Ex. 1 Q2 : intensité $\\theta_1>\\theta_0$, on rejette pour les **petites** valeurs de $\\sum X_i$).'],
      },
      {
        kind: 'example',
        id: 'ch5-ex-1-1',
        title: 'Exemple 1.1 — Une observation gaussienne, variances égales',
        source: 'Poly ch.5, Ex. 1.1, p. 15–16',
        setup: 'Une seule observation $X\\sim\\mathcal{N}(\\mu,1)$, $\\mu\\in\\{-1,1\\}$ ; $H_0:\\mu=-1$ contre $H_1:\\mu=1$.',
        steps: [
          { text: '$p_{-1}(x)=(2\\pi)^{-1/2}e^{-(x+1)^2/2}$, $p_1(x)=(2\\pi)^{-1/2}e^{-(x-1)^2/2}$, d’où $r(x)=\\exp\\big(\\frac{-(x-1)^2+(x+1)^2}2\\big)=\\exp(2x)$.', justification: '$-(x-1)^2+(x+1)^2=4x$ ; les constantes se simplifient.' },
          { text: '$x\\mapsto e^{2x}$ est strictement croissante : $r(x)>c_\\alpha\\iff x>\\frac12\\log(c_\\alpha)$.', justification: 'Méthode 1.2 avec $T(X)=X$.' },
          { text: 'Seuil sous $\\mathbb{P}_{-1}$ : $X+1\\sim\\mathcal{N}(0,1)$, donc $\\mathbb{P}_{-1}(X>t)=\\alpha\\iff t=-1+z_{1-\\alpha}$.', justification: 'Centrage-réduction **sous la loi de $H_0$**, puis définition du quantile.' },
          { text: '$\\phi^\\star_\\alpha(X)=\\mathbb{1}_{\\{X>z_{1-\\alpha}-1\\}}$, c’est-à-dire $c_\\alpha=\\exp\\big(2(z_{1-\\alpha}-1)\\big)$.', justification: 'Th. 1.1 : taille exactement $\\alpha$, donc U.P.P.($\\alpha$).' },
        ],
        conclusion: 'Le log-rapport est affine croissant en $x$ : la région de rejet est une **demi-droite**. Le point à retenir est le **décalage de $-1$** : écrire $\\mathbb{1}_{\\{X>z_{1-\\alpha}\\}}$ est faux, car $z_{1-\\alpha}$ se rapporte à $\\mathcal{N}(0,1)$ alors que la taille s’évalue sous $\\mathcal{N}(-1,1)$. **Le seuil se lit toujours sous la loi de l’hypothèse nulle.**',
      },
      {
        kind: 'example',
        id: 'ch5-ex-1-2',
        title: 'Exemple 1.2 — Une observation gaussienne, variances différentes',
        source: 'Poly ch.5, Ex. 1.2, p. 16–17',
        setup: 'Une observation $X$, $\\theta_i=(\\mu_i,\\sigma_i^2)$, $i\\in\\{0,1\\}$, $p_{\\theta_i}(z)=\\frac1{\\sqrt{2\\pi\\sigma_i^2}}\\exp\\big(-(z-\\mu_i)^2/(2\\sigma_i^2)\\big)$ ; test de $\\theta=\\theta_0$ contre $\\theta=\\theta_1$.',
        steps: [
          { text: '$r(z)=\\sqrt{\\sigma_0^2/\\sigma_1^2}\\,\\exp\\Big(-\\frac1{2\\sigma_1^2}(z-\\mu_1)^2+\\frac1{2\\sigma_0^2}(z-\\mu_0)^2\\Big)$.', justification: 'Quotient des deux densités gaussiennes.' },
          { text: '$\\{r(z)>c_\\alpha\\}=\\Big\\{-\\frac1{2\\sigma_1^2}(z-\\mu_1)^2+\\frac1{2\\sigma_0^2}(z-\\mu_0)^2>\\log(c_\\alpha)+\\frac12\\log\\big(\\frac{\\sigma_1^2}{\\sigma_0^2}\\big)\\Big\\}$.', justification: 'Passage au logarithme (strictement croissant).' },
          { text: 'Le membre de gauche est un **trinôme** en $z$ de coefficient dominant $\\frac12(\\sigma_0^{-2}-\\sigma_1^{-2})$.', justification: 'Développement des carrés.' },
          { text: 'Si $\\sigma_1^2<\\sigma_0^2$, le coefficient est $<0$ : la région de rejet est un **intervalle** $]m,M[$ ; si $\\sigma_1^2>\\sigma_0^2$, il est $>0$ : c’est le **complémentaire d’un intervalle**.', justification: 'Signe d’un trinôme du second degré (le poly ne calcule pas $m$, $M$).' },
        ],
        conclusion: 'Figure p. 17 : $(\\mu_0,\\sigma_0^2)=(-1,1)$, $(\\mu_1,\\sigma_1^2)=(1,0{,}5)$ : le rapport n’est plus monotone et la région où il dépasse un seuil est un intervalle. **La région de rejet n’est pas toujours une queue de distribution** ; « on rejette quand la statistique est grande » n’est qu’une abréviation, le critère exact est « on rejette quand **le rapport de vraisemblance** est grand ». À manipuler dans la [[visualisation de Neyman-Pearson|/ch/ch5/viz]] (curseur $\\sigma_1$).',
      },
      {
        kind: 'example',
        id: 'ch5-ex-1-3',
        title: 'Exemple 1.3 — Moyenne d’un échantillon gaussien, variance connue',
        source: 'Poly ch.5, Ex. 1.3, p. 17–18',
        setup: '$Z=(X_1,\\dots,X_n)$ $n$-échantillon de $\\{\\mathcal{N}(\\mu,\\sigma^2),\\ \\mu\\in\\{\\mu_0,\\mu_1\\}\\}$, $\\sigma^2>0$ **connue**, $\\mu_0<\\mu_1$ ; $H_0:\\mu=\\mu_0$ contre $H_1:\\mu=\\mu_1$.',
        steps: [
          { text: 'Quitte à remplacer $X_i$ par $X_i-\\mu_0$, on suppose $\\mu_0=0$ et l’on pose $m:=\\mu_1>0$.', justification: 'Translation : le problème est invariant.' },
          { text: '$r(z)=\\exp\\Big(-\\frac1{2\\sigma^2}\\sum_i(x_i-m)^2+\\frac1{2\\sigma^2}\\sum_ix_i^2\\Big)=\\exp\\Big(\\frac{nm}{\\sigma^2}\\bar x_n-\\frac{nm^2}{2\\sigma^2}\\Big)$.', justification: 'Densité produit (indépendance), développement de $(x_i-m)^2$.' },
          { text: '$r(z)=\\tilde r(\\bar x_n)$ avec $\\tilde r$ **strictement croissante** ($m>0$) : $r(Z)>c_\\alpha\\iff\\bar X_n>d_\\alpha$ avec $\\mathbb{P}_0(\\bar X_n>d_\\alpha)=\\alpha$.', justification: 'Méthode 1.2.' },
          { text: 'Sous $\\mathbb{P}_0$, $\\sqrt n\\bar X_n/\\sigma\\sim\\mathcal{N}(0,1)$, d’où $d_\\alpha=z_{1-\\alpha}\\sigma/\\sqrt n$ et, pour $\\mu_0$ quelconque, $\\phi^\\star(Z)=\\mathbb{1}_{\\{\\bar X_n>\\mu_0+z_{1-\\alpha}\\sigma/\\sqrt n\\}}$.', justification: 'Loi de $\\bar X_n$ sous $H_0$ ; absence d’atome (loi à densité) ; Th. 1.1.' },
          { text: 'Puissance : $\\beta_{\\phi^\\star}(\\mu_1)=\\mathbb{P}_m\\big(\\bar X_n>z_{1-\\alpha}\\sigma/\\sqrt n\\big)=1-\\Phi\\big(z_{1-\\alpha}-\\sqrt n\\,m/\\sigma\\big)$, $m=\\mu_1-\\mu_0$.', justification: 'Sous $\\mathbb{P}_m$, $\\sqrt n(\\bar X_n-m)/\\sigma\\sim\\mathcal{N}(0,1)$.' },
        ],
        conclusion: 'Figure p. 18 ($\\mu_0=0$, $\\mu_1=1$, $\\sigma=1$, $\\alpha=0{,}05$) : puissance $\\approx0{,}26$ pour $n=1$, $\\approx1$ dès $n\\approx20$. **Le seuil $d_\\alpha$ ne dépend pas de $\\mu_1$** : le même test est U.P.P.($\\alpha$) contre chaque $\\mu_1>\\mu_0$, donc contre l’alternative composite $\\mu>\\mu_0$. « Accident heureux » qui tient à la factorisation du rapport à travers une statistique dont le seuil ne dépend que de $\\theta_0$ : le §4 identifie la classe de modèles où cela se produit. Piège de signe : $1-\\Phi(z_{1-\\alpha}-\\sqrt n\\,m/\\sigma)$ croît avec $n$ et $m$.',
      },
      {
        kind: 'example',
        id: 'ch5-ex-pc4-poisson',
        title: 'PC4 Ex. 4 revisitée — Poisson, θ = 1 contre θ = 2 : le test optimal est discret',
        source: 'PC4 Ex. 4 (Poly ch.4, Exercice 4) ; Poly ch.5, Ex. 4.1 pour la randomisation',
        setup: '$n=10$ observations i.i.d. $\\mathrm{Poi}(\\theta)$ ; $H_0:\\theta=1$ contre $H_1:\\theta=2$, niveau $5\\,\\%$.',
        steps: [
          { text: '$r(z)=\\big(\\theta_1/\\theta_0\\big)^{T(z)}e^{-n(\\theta_1-\\theta_0)}=2^{T(z)}e^{-10}$ avec $T(z)=\\sum_ix_i$ : strictement croissant en $T$, on rejette pour $T$ grand.', justification: 'Densités par rapport à la mesure de comptage ; Méthode 1.2.' },
          { text: 'Sous $H_0$, $T\\sim\\mathrm{Poi}(10)$ (stabilité de la loi de Poisson par somme indépendante).', justification: 'Fonctions génératrices (corrigé PC4 Ex. 4 Q1).' },
          { text: '$F_{\\mathrm{Poi}(10)}(14)\\simeq0{,}917$ et $F_{\\mathrm{Poi}(10)}(15)\\simeq0{,}951$ : le plus petit seuil de niveau $5\\,\\%$ est $T>15$, de **taille** $\\mathbb{P}(\\mathrm{Poi}(10)>15)\\simeq0{,}049<0{,}05$.', justification: 'Inverse généralisée de la f.d.r. ; $T$ entière, la taille ne prend qu’un ensemble discret de valeurs.' },
          { text: 'Puissance $\\mathbb{P}(\\mathrm{Poi}(20)>15)\\simeq0{,}8435$.', justification: 'Sous $H_1$, $T\\sim\\mathrm{Poi}(20)$.' },
        ],
        conclusion: 'Le rapport de vraisemblance **a des atomes** (Cadre 1.1 en défaut) : le test pur $\\mathbb{1}_{\\{T>15\\}}$ est de niveau mais pas de taille $5\\,\\%$, et le Th. 1.1 ne s’applique pas tel quel. Le Th. 4.1 (compléments) rétablit l’optimalité en rejetant avec probabilité $\\gamma_\\alpha=\\frac{0{,}05-\\mathbb{P}(T>15)}{\\mathbb{P}(T=15)}\\approx0{,}036$ lorsque $T=15$.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 4. Rapport de vraisemblance monotone
  // -------------------------------------------------------------------------
  {
    id: 'ch5-s4-rvm',
    title: '4. Rapport de vraisemblance monotone et tests unilatéraux U.P.P.',
    role: 'preuves',
    intro:
      'Paramètre **scalaire** $\\Theta\\subseteq\\mathbb{R}$, hypothèse **unilatérale** ($\\theta\\le\\theta_0$ contre $\\theta>\\theta_0$). Quand la densité dépend des observations, pour ce qui concerne $\\theta$, à travers une statistique $T$ qui « ordonne les observations comme $\\theta$ ordonne les lois », la région $\\{r>c\\}$ est toujours de la forme $\\{T>d\\}$ avec un seuil indépendant de $\\theta_1$ : le test de Neyman-Pearson est U.P.P. contre toute l’alternative.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch5-def-1-4',
        type: 'definition',
        label: 'Définition 1.4',
        title: 'Famille à rapport de vraisemblance monotone croissant',
        source: 'Poly ch.5, Déf. 1.4, éq. (2), p. 18',
        hypotheses: ['$\\mu$ mesure $\\sigma$-finie sur $(\\mathsf{Z},\\mathcal{Z})$, modèle $\\big(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta=p_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\}\\big)$, $\\Theta\\subseteq\\mathbb{R}$.'],
        statement: `La famille est dite **à rapport de vraisemblance monotone croissant** si

(i) il existe des fonctions mesurables $\\psi:\\mathbb{R}^2\\to\\mathbb{R}_+$, $T:\\mathsf{Z}\\to\\mathbb{R}$ et $h:\\mathsf{Z}\\to\\mathbb{R}_+$ telles que

$$p_\\theta(z)=h(z)\\,\\psi(T(z);\\theta),\\qquad\\theta\\in\\Theta,\\ z\\in\\mathsf{Z}\\qquad\\text{(2)}$$

(ii) pour tous $\\theta,\\theta'\\in\\Theta$ tels que $\\theta>\\theta'$, la fonction $t\\longmapsto\\dfrac{\\psi(t;\\theta)}{\\psi(t;\\theta')}$ est **strictement croissante**.`,
        intuition: '(2) dit que la densité ne dépend de l’observation, pour ce qui concerne $\\theta$, qu’à travers $T(z)$ ; $h(z)$ disparaît de tout rapport. (ii) : plus $T$ est grand, plus les observations plaident pour les grandes valeurs de $\\theta$ — $T$ **ordonne les observations comme $\\theta$ ordonne les lois**.',
        pitfalls: [
          'La croissance doit être **stricte** : le modèle uniforme, de rapport seulement croissant au sens large, sort du cadre (Ex. 4.5, Exercice 7).',
          'La condition porte sur $\\theta>\\theta\'$ : le sens compte (croissant vs décroissant, Déf. 1.5).',
        ],
      },
      {
        kind: 'example',
        id: 'ch5-ex-1-4',
        title: 'Exemple 1.4 — Modèle gaussien N(θ, 1) : monotone en la moyenne empirique',
        source: 'Poly ch.5, Ex. 1.4, p. 19',
        setup: '$Z=(X_1,\\dots,X_n)$ $n$-échantillon de $\\{\\mathcal{N}(\\theta,1),\\ \\theta\\in\\mathbb{R}\\}$ ; $T(z):=n^{-1}\\sum_ix_i$.',
        steps: [
          { text: '$p_\\theta(z)=\\underbrace{(2\\pi)^{-n/2}\\exp\\big(-\\frac12\\sum_ix_i^2\\big)}_{h(z)}\\ \\underbrace{\\exp\\big(n\\theta\\,T(z)-n\\theta^2/2\\big)}_{\\psi(T(z);\\theta)}$.', justification: 'Développement $(x_i-\\theta)^2=x_i^2-2\\theta x_i+\\theta^2$ ; factorisation (2).' },
          { text: 'Pour $\\theta>\\theta\'$ : $t\\mapsto\\psi(t;\\theta)/\\psi(t;\\theta\')=\\exp\\big((\\theta-\\theta\')nt-\\frac n2(\\theta^2-\\theta\'^2)\\big)$.', justification: 'Quotient ; $h$ se simplifie.' },
          { text: 'Exponentielle d’une fonction affine de pente $n(\\theta-\\theta\')>0$ : strictement croissante.', justification: 'Déf. 1.4 (ii).' },
        ],
        conclusion: 'Rapport de vraisemblance monotone croissant **en la moyenne empirique** ; cas d’école de famille exponentielle avec $\\varphi(\\theta)=\\theta$.',
      },
      {
        kind: 'example',
        id: 'ch5-ex-1-5',
        title: 'Exemple 1.5 — Modèle de Bernoulli : monotone en la somme',
        source: 'Poly ch.5, Ex. 1.5, p. 19',
        setup: '$Z=(X_1,\\dots,X_n)$ $n$-échantillon de $\\{\\mathcal{B}\\mathrm{er}(\\theta),\\ \\theta\\in\\,]0,1[\\}$, dominé par la mesure de comptage sur $\\{0,1\\}^n$ ; $T(z):=\\sum_ix_i$.',
        steps: [
          { text: '$p_\\theta(z)=(1-\\theta)^n\\big(\\frac\\theta{1-\\theta}\\big)^{T(z)}$ : forme (2) avec $h(z):=1$ et $\\psi(t;\\theta):=(1-\\theta)^n\\big(\\theta/(1-\\theta)\\big)^t$.', justification: '$\\prod_i\\theta^{x_i}(1-\\theta)^{1-x_i}$.' },
          { text: 'Pour $\\theta>\\theta\'$ : $t\\mapsto\\frac{(1-\\theta)^n}{(1-\\theta\')^n}\\Big(\\frac{\\theta(1-\\theta\')}{\\theta\'(1-\\theta)}\\Big)^t$ est strictement croissante.', justification: 'La cote $\\theta\\mapsto\\theta/(1-\\theta)$ est strictement croissante, donc la base est $>1$.' },
        ],
        conclusion: 'Rapport monotone croissant en $\\sum_iX_i$. **Piège** : $T$ est **discrète**, le Th. 1.3 (qui suppose $T(Z)$ à densité) ne s’applique pas tel quel : il faut sa version randomisée (Ex. 4.2, compléments).',
      },
      {
        kind: 'viz',
        id: 'ch5-s4-viz-rvm',
        vizId: 'ch5-rvm',
        caption: 'Choisir une famille : le rapport $t\\mapsto\\psi(t;\\theta)/\\psi(t;\\theta\')$ est strictement croissant (gaussien, Bernoulli, exponentiel de moyenne $\\theta$), strictement décroissant (géométrique, exponentiel d’intensité $\\theta$) ou seulement croissant au sens large (uniforme). À droite, la loi de $T$ glisse vers la droite quand $\\theta$ augmente (Lemme 2.1).',
      },
      {
        kind: 'theorem',
        id: 'ch5-lem-2-1',
        type: 'lemme',
        label: 'Lemme 2.1 (Outils)',
        title: 'Monotonie sous rapport de vraisemblance monotone',
        source: 'Poly ch.5, Outils, Lemme 2.1, p. 27',
        hypotheses: [
          'Modèle à rapport de vraisemblance monotone croissant en la statistique $T$ (Déf. 1.4).',
          '$\\varphi:\\mathbb{R}\\to\\mathbb{R}$ **croissante** (au sens large) telle que $\\mathbb{E}_\\theta[|\\varphi\\circ T(Z)|]<\\infty$ pour tout $\\theta\\in\\Theta$.',
        ],
        statement: 'La fonction $\\theta\\longmapsto\\mathbb{E}_\\theta[\\varphi\\circ T(Z)]$ est croissante (au sens large) sur $\\Theta$.',
        intuition: 'Augmenter $\\theta$ pousse $T$ vers le haut au sens de la **dominance stochastique** : l’espérance de toute fonction croissante de $T$ augmente. Avec $\\varphi(u)=\\mathbb{1}_{\\{u>d_\\alpha\\}}$, c’est la croissance de la fonction puissance du test unilatéral (Th. 1.3 (ii)). « Le seul énoncé technique du chapitre. »',
        proof: [
          { text: 'Soient $\\theta\'<\\theta$ ; on pose $A:=\\{z:\\ p_{\\theta\'}(z)>p_\\theta(z)\\}$.', justification: 'Zone où la loi de paramètre plus petit charge davantage.' },
          { text: 'Là où $p_{\\theta\'}>0$, $p_\\theta/p_{\\theta\'}=\\psi(T(z);\\theta)/\\psi(T(z);\\theta\')$ est strictement croissante en $T(z)$ : il existe $d\\in\\mathbb{R}\\cup\\{\\pm\\infty\\}$, $d:=\\sup\\{t:\\ \\psi(t;\\theta)/\\psi(t;\\theta\')<1\\}$, tel que $A=\\{T<d\\}$ (à un ensemble $\\mu$-négligeable près).', justification: 'Factorisation (2) et Déf. 1.4 (ii).' },
          { text: '$b:=\\inf_{A^c}\\varphi\\circ T\\ \\ge\\ a:=\\sup_A\\varphi\\circ T$.', justification: '$\\varphi$ croissante ; sur $A$, $T<d$ ; sur $A^c$, $T\\ge d$.' },
          { text: '$\\mathbb{E}_\\theta[\\varphi\\circ T]-\\mathbb{E}_{\\theta\'}[\\varphi\\circ T]=\\int_A\\varphi\\circ T\\{p_\\theta-p_{\\theta\'}\\}\\mathrm{d}\\mu+\\int_{A^c}\\varphi\\circ T\\{p_\\theta-p_{\\theta\'}\\}\\mathrm{d}\\mu\\ge a\\int_A\\{p_\\theta-p_{\\theta\'}\\}\\mathrm{d}\\mu+b\\int_{A^c}\\{p_\\theta-p_{\\theta\'}\\}\\mathrm{d}\\mu$.', justification: '$p_\\theta-p_{\\theta\'}\\le0$ sur $A$ (on minore par $a\\times$ négatif) et $\\ge0$ sur $A^c$ (on minore par $b\\times$ positif).' },
          { text: '$=(b-a)\\int_{A^c}\\{p_\\theta-p_{\\theta\'}\\}\\,\\mathrm{d}\\mu\\ \\ge0$.', justification: '$\\int_{\\mathsf{Z}}\\{p_\\theta-p_{\\theta\'}\\}\\mathrm{d}\\mu=0$ (deux densités) donc $\\int_A=-\\int_{A^c}$ ; puis $b-a\\ge0$ et $p_\\theta-p_{\\theta\'}\\ge0$ sur $A^c$.' },
        ],
        pitfalls: ['Les deux minorations utilisent les **signes** de $p_\\theta-p_{\\theta\'}$ sur $A$ et $A^c$ : c’est là que la monotonie du rapport sert.'],
      },
      {
        kind: 'theorem',
        id: 'ch5-thm-1-3',
        type: 'theoreme',
        label: 'Théorème 1.3',
        title: 'Test U.P.P. pour une hypothèse unilatérale, cas croissant',
        source: 'Poly ch.5, Th. 1.3, p. 20 ; démonstration complète dans les Compléments, p. 47',
        hypotheses: [
          'Modèle à rapport de vraisemblance monotone **croissant** en la statistique $T$ (Déf. 1.4).',
          'Pour tout $\\theta\\in\\Theta$, $T(Z)$ est **à densité** par rapport à la mesure de Lebesgue sous $\\mathbb{P}_\\theta$.',
          '$\\theta_0\\in\\Theta$, $\\alpha\\in\\,]0,1[$.',
        ],
        statement: `(i) Il existe un test U.P.P.($\\alpha$) de

$$H_0:\\theta\\le\\theta_0\\quad\\text{contre}\\quad H_1:\\theta>\\theta_0,$$

de fonction critique $\\phi_{\\theta_0}(z):=\\mathbb{1}_{\\{T(z)>d_\\alpha\\}}$, où $d_\\alpha$ est l’unique solution de $\\mathbb{P}_{\\theta_0}(T(Z)>d_\\alpha)=\\alpha$.

(ii) La fonction puissance $\\theta\\mapsto\\beta_{\\phi_{\\theta_0}}(\\theta)$ est **croissante** sur $\\Theta$.`,
        intuition: 'La **croissance de la fonction puissance** est le point central : elle permet de ne contrôler la taille **qu’en $\\theta_0$**, borne extrémale de $H_0$, et d’obtenir gratuitement le niveau pour tout $\\theta<\\theta_0$. Schéma récurrent : *optimal dans une classe plus grande + appartient à la petite classe $\\Rightarrow$ optimal dans la petite.* Le poly remarque (sans le démontrer ni l’utiliser) que $\\beta_{\\phi_{\\theta_0}}$ est même strictement croissante là où elle est $<1$.',
        proof: [
          { text: '*Temps 1.* Fixons $\\theta_1>\\theta_0$ et le test $H_0\':\\theta=\\theta_0$ contre $H_1\':\\theta=\\theta_1$. Là où $p_{\\theta_0}>0$, $r_{\\theta_0,\\theta_1}(z)=\\psi(T(z);\\theta_1)/\\psi(T(z);\\theta_0)$, fonction **strictement croissante** de $T(z)$.', justification: 'Factorisation (2) ($h$ se simplifie) et Déf. 1.4 (ii).' },
          { text: 'Donc pour tout $c$ il existe $d$ tel que $\\{p_{\\theta_1}>c\\,p_{\\theta_0}\\}=\\{T>d\\}$ (avec $d=\\pm\\infty$ dans les cas dégénérés).', justification: 'Image réciproque d’une demi-droite par une fonction strictement croissante.' },
          { text: '$T(Z)$ étant à densité sous $\\mathbb{P}_{\\theta_0}$, le rapport n’a pas d’atome : il existe $d_\\alpha$, unique solution de $\\mathbb{P}_{\\theta_0}(T(Z)>d_\\alpha)=\\alpha$, tel que $\\phi_{\\theta_0}=\\mathbb{1}_{\\{T>d_\\alpha\\}}$ soit U.P.P.($\\alpha$) pour $(H_0\',H_1\')$.', justification: 'Cadre 1.1 vérifié, puis Th. 1.1.' },
          { text: 'L’équation de $d_\\alpha$ ne fait intervenir que $\\mathbb{P}_{\\theta_0}$ : $\\phi_{\\theta_0}$ **ne dépend pas de $\\theta_1$** ; il est U.P.P.($\\alpha$) pour $\\theta=\\theta_0$ contre $\\theta>\\theta_0$.', justification: 'Optimal en chaque $\\theta_1>\\theta_0$ par le même test : Déf. 1.2.' },
          { text: '*Temps 2.* $\\phi_{\\theta_0}=\\varphi(T)$ avec $\\varphi(u)=\\mathbb{1}_{\\{u>d_\\alpha\\}}$ croissante et bornée, donc $\\theta\\mapsto\\beta_{\\phi_{\\theta_0}}(\\theta)=\\mathbb{E}_\\theta[\\varphi\\circ T(Z)]$ est croissante : c’est (ii).', justification: 'Lemme 2.1.' },
          { text: '*Temps 3.* Pour tout $\\theta\\le\\theta_0$, $\\beta_{\\phi_{\\theta_0}}(\\theta)\\le\\beta_{\\phi_{\\theta_0}}(\\theta_0)=\\alpha$ : $\\phi_{\\theta_0}\\in\\mathcal{K}_\\alpha(\\{\\theta\\le\\theta_0\\})$, de taille exactement $\\alpha$.', justification: 'Croissance de la puissance (temps 2).' },
          { text: 'Un test de niveau $\\alpha$ pour $\\theta\\le\\theta_0$ l’est pour $\\theta=\\theta_0$ : $\\mathcal{K}_\\alpha(\\{\\theta\\le\\theta_0\\})\\subseteq\\mathcal{K}_\\alpha(\\{\\theta=\\theta_0\\})$.', justification: 'Le sup sur un ensemble plus grand domine la valeur en $\\theta_0$.' },
          { text: '$\\phi_{\\theta_0}$ maximise la puissance en chaque $\\theta>\\theta_0$ dans la **grande** classe et appartient à la **petite** : il est U.P.P.($\\alpha$) pour $\\theta\\le\\theta_0$ contre $\\theta>\\theta_0$.', justification: 'Un maximum sur un ensemble, atteint en un point d’un sous-ensemble, est le maximum sur ce sous-ensemble.' },
        ],
        pitfalls: [
          'Chercher à contrôler le niveau en chaque point de $\\Theta_0$ séparément : inutile grâce à la monotonie.',
          'Calculer le seuil sous $\\theta_1$ : il se calcule **sous $\\theta_0$**.',
          'Oublier l’hypothèse « $T(Z)$ à densité » : sinon randomiser (Ex. 4.2, compléments).',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch5-def-1-5',
        type: 'definition',
        label: 'Définition 1.5',
        title: 'Famille à rapport de vraisemblance monotone décroissant',
        source: 'Poly ch.5, Déf. 1.5, p. 20',
        hypotheses: ['$\\mu$ mesure $\\sigma$-finie, modèle $\\{\\mathbb{P}_\\theta=p_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\}$, $\\Theta\\subseteq\\mathbb{R}$.'],
        statement: 'La famille est dite **à rapport de vraisemblance monotone décroissant** si la factorisation (2) a lieu et si, pour tous $\\theta>\\theta\'$, la fonction $t\\mapsto\\psi(t;\\theta)/\\psi(t;\\theta\')$ est **strictement décroissante**.',
        intuition: 'Les **petites** valeurs de $T$ plaident pour les grandes valeurs de $\\theta$. Équivaut à « croissant en $-T$ ». Exemples : exponentiel paramétré par l’intensité $\\theta e^{-\\theta x}$ (Examen 2025 Ex. 1), loi géométrique (Exercice 3).',
      },
      {
        kind: 'theorem',
        id: 'ch5-thm-1-4',
        type: 'theoreme',
        label: 'Théorème 1.4',
        title: 'Test U.P.P. pour une hypothèse unilatérale, cas décroissant',
        source: 'Poly ch.5, Th. 1.4, p. 20–21 ; démonstration dans les Compléments, p. 47–48',
        hypotheses: [
          'Modèle à rapport de vraisemblance monotone **décroissant** en $T$ (Déf. 1.5).',
          '$T(Z)$ à densité par rapport à Lebesgue sous chaque $\\mathbb{P}_\\theta$.',
          '$\\theta_0\\in\\Theta$, $\\alpha\\in\\,]0,1[$.',
        ],
        statement: '(i) Il existe un test U.P.P.($\\alpha$) de $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$, de fonction critique $\\phi_{\\theta_0}(z):=\\mathbb{1}_{\\{T(z)<d_\\alpha\\}}$, où $d_\\alpha$ est l’unique solution de $\\mathbb{P}_{\\theta_0}(T(Z)<d_\\alpha)=\\alpha$. (ii) La fonction puissance $\\theta\\mapsto\\beta_{\\phi_{\\theta_0}}(\\theta)$ est croissante sur $\\Theta$.',
        intuition: 'On renverse la **région de rejet**, pas le sens de monotonie de la puissance en $\\theta$.',
        proof: [
          { text: 'On pose $\\tilde T(z):=-T(z)$ et $\\tilde\\psi(t;\\theta):=\\psi(-t;\\theta)$ : $p_\\theta(z)=h(z)\\,\\tilde\\psi(\\tilde T(z);\\theta)$ avec un rapport **strictement croissant** en $\\tilde T$.', justification: 'Composition d’une fonction strictement décroissante par $t\\mapsto-t$.' },
          { text: '$\\tilde T(Z)=-T(Z)$ est à densité sous chaque $\\mathbb{P}_\\theta$.', justification: 'Image d’une loi à densité par une bijection affine.' },
          { text: 'Le Th. 1.3 donne un U.P.P.($\\alpha$) qui rejette si $\\tilde T(Z)>\\tilde d_\\alpha$, i.e. $T(Z)<d_\\alpha:=-\\tilde d_\\alpha$, avec $\\mathbb{P}_{\\theta_0}(T(Z)<d_\\alpha)=\\alpha$.', justification: 'Th. 1.3 appliqué à $(\\tilde T,\\tilde\\psi)$.' },
          { text: 'La fonction puissance reste croissante en $\\theta$.', justification: 'Th. 1.3 (ii) : c’est la même fonction critique.' },
        ],
      },
      {
        kind: 'text',
        id: 'ch5-s4-quatre-regions',
        title: 'Les quatre régions de rejet des tests unilatéraux (p. 21)',
        text: `Dans les quatre cas, **le seuil se lit sous $\\mathbb{P}_{\\theta_0}$**, à la borne extrémale de $H_0$.

- Rapport **croissant**, $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$ : on rejette si $T(Z)>d_\\alpha$, avec $\\mathbb{P}_{\\theta_0}(T(Z)>d_\\alpha)=\\alpha$.
- Rapport **croissant**, $H_0:\\theta\\ge\\theta_0$ contre $H_1:\\theta<\\theta_0$ : on rejette si $T(Z)<d_\\alpha$, avec $\\mathbb{P}_{\\theta_0}(T(Z)<d_\\alpha)=\\alpha$.
- Rapport **décroissant**, $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$ : on rejette si $T(Z)<d_\\alpha$, avec $\\mathbb{P}_{\\theta_0}(T(Z)<d_\\alpha)=\\alpha$.
- Rapport **décroissant**, $H_0:\\theta\\ge\\theta_0$ contre $H_1:\\theta<\\theta_0$ : on rejette si $T(Z)>d_\\alpha$, avec $\\mathbb{P}_{\\theta_0}(T(Z)>d_\\alpha)=\\alpha$.

**Règle mnémotechnique** : *on rejette du côté où la statistique rend l’alternative plus vraisemblable*. Rapport croissant en $T$ : grandes valeurs de $T$ $\\leftrightarrow$ grandes valeurs de $\\theta$, donc on rejette $\\theta\\le\\theta_0$ quand $T$ est grand ; rapport décroissant : tout est renversé. (Le cas $H_0:\\theta\\ge\\theta_0$ s’obtient en renversant l’ordre sur $\\Theta$ ; non détaillé dans le poly.)`,
      },
      {
        kind: 'theorem',
        id: 'ch5-meth-1-3',
        type: 'methode',
        label: 'Méthode 1.3',
        title: 'Test U.P.P.(α) pour une hypothèse unilatérale',
        source: 'Poly ch.5, Méthode 1.3, p. 21',
        hypotheses: [
          'Le paramètre est **scalaire**, $\\Theta\\subseteq\\mathbb{R}$.',
          'L’hypothèse est **unilatérale**, p. ex. $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$.',
          'La famille est à **rapport de vraisemblance monotone** en une statistique $T$ : $p_\\theta(z)=h(z)\\,\\psi(T(z);\\theta)$ avec $t\\mapsto\\psi(t;\\theta)/\\psi(t;\\theta\')$ strictement monotone pour $\\theta>\\theta\'$.',
        ],
        statement: 'Il n’existe pas de test U.P.P.($\\alpha$) en général ; sous ces trois conditions, pour $\\theta>\\theta\'$, $r_{\\theta\',\\theta}(Z)=\\psi(T(Z);\\theta)/\\psi(T(Z);\\theta\')$ est une fonction monotone de $T(Z)$, et si $T(Z)$ est à densité, le test U.P.P.($\\alpha$) est $\\phi(Z)=\\mathbb{1}_{\\{T(Z)>d_\\alpha\\}}$ ou $\\mathbb{1}_{\\{T(Z)<d_\\alpha\\}}$ selon le sens de la monotonie, $d_\\alpha$ étant choisi pour que la taille soit **exactement $\\alpha$ en $\\theta_0$**.',
        intuition: 'Trois vérifications (scalaire, unilatéral, monotone), puis le calcul d’un seuil sous $\\mathbb{P}_{\\theta_0}$. Mise en œuvre : Exercice 1 ci-dessous (PC5 Ex. 1), CC 2022 Ex. 1 (Weibull), Examen 2025 Ex. 1 Q2.',
      },
      {
        kind: 'example',
        id: 'ch5-ex-exo1',
        title: 'Exercice 1 du poly (PC5 Ex. 1) — Modèle exponentiel de moyenne θ',
        source: 'Poly ch.5, Exercice 1 (corrigé p. 37–38) ; PC5 Ex. 1',
        setup: '$Z=(X_1,\\dots,X_n)$ $n$-échantillon de densité $p_\\theta(x)=\\theta^{-1}e^{-x/\\theta}\\mathbb{1}_{\\mathbb{R}_+}(x)$, $\\theta\\in\\mathbb{R}_+^*$ ($\\theta$ est la **moyenne**). Tester $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$ au niveau $\\alpha$.',
        steps: [
          { text: '$p^n_\\theta(z)=\\theta^{-n}\\exp\\big(-\\sum_ix_i/\\theta\\big)\\mathbb{1}_{\\mathbb{R}_+}(x_{1:n})$, $x_{1:n}:=\\min_ix_i$ : forme (2) avec $h(z)=\\mathbb{1}_{\\mathbb{R}_+}(x_{1:n})$, $T(z)=\\sum_ix_i$, $\\psi(t;\\theta)=\\theta^{-n}e^{-t/\\theta}$.', justification: 'Densité produit par indépendance ; produit d’indicatrices = indicatrice du minimum.' },
          { text: 'Pour $0<\\theta_1<\\theta_2$ : $\\frac{p^n_{\\theta_2}(z)}{p^n_{\\theta_1}(z)}=\\frac{\\theta_1^n}{\\theta_2^n}\\exp\\big((\\theta_1^{-1}-\\theta_2^{-1})\\sum_ix_i\\big)$, strictement croissant en $\\sum_ix_i$ car $\\theta_1^{-1}>\\theta_2^{-1}$.', justification: 'Déf. 1.4 : rapport monotone croissant en $T=\\sum_iX_i$.' },
          { text: 'Sous $\\mathbb{P}_\\theta$, $\\sum_iX_i\\sim\\mathrm{Gamma}(n,\\theta^{-1})$ est à densité : par le Th. 1.3, $\\phi(Z)=\\mathbb{1}_{\\{\\sum_iX_i>c\\}}$ avec $\\alpha=\\mathbb{P}_{\\theta_0}(\\sum_iX_i>c)$ est U.P.P.($\\alpha$).', justification: 'Additivité des lois Gamma (intensité) ; absence d’atome, donc test pur ($\\gamma$ inutile).' },
          { text: '$\\alpha=\\frac{\\theta_0^{-n}}{\\Gamma(n)}\\int_c^{+\\infty}x^{n-1}e^{-x/\\theta_0}\\,\\mathrm{d}x=\\mathbb{P}(W>2c/\\theta_0)$, $W\\sim\\chi^2(2n)$, d’où $c=\\frac{\\theta_0}2\\chi^2_{1-\\alpha}(2n)$.', justification: 'Changement de variable $u=x/\\theta_0$, puis $2\\,\\mathrm{Gamma}(n,1)=\\mathrm{Gamma}(n,1/2)=\\chi^2(2n)$.' },
          { text: 'Pour $\\theta=\\theta_0$ contre $\\theta=\\theta_1>\\theta_0$, Neyman-Pearson donne $r(Z)=(\\theta_0/\\theta_1)^n\\exp\\big((\\theta_0^{-1}-\\theta_1^{-1})\\sum_iX_i\\big)$ et le test $\\mathbb{1}_{\\{2\\theta_0^{-1}\\sum_iX_i>\\chi^2_{1-\\alpha}(2n)\\}}$ : c’est le test par pivot de la PC4 Ex. 1, et il **ne dépend pas de $\\theta_1$**.', justification: 'Th. 1.1 + Méthode 1.2 ; pivot $2\\sum_iX_i/\\theta\\sim\\chi^2(2n)$.' },
        ],
        conclusion: 'Numérique (figures de l’énoncé) : $n=10$, $\\theta_0=1$, $\\alpha=0{,}05$ : $\\chi^2_{0{,}95}(20)\\approx31{,}41$, seuil $c\\approx15{,}705$ sur $\\sum_ix_i$ ; puissance $\\beta_\\phi(\\theta)=\\mathbb{P}(W>2c/\\theta)$, soit $\\approx0{,}735$ en $\\theta=2$. **Règle de décision** : $n^{-1}\\sum_iX_i$ estime la moyenne $\\theta$ ; on rejette $H_0$ s’il est « trop élevé », le seuil donnant un sens à « trop ». **Piège** : ici $\\theta$ est l’**espérance** ; avec la paramétrisation par l’intensité, le rapport devient décroissant et l’on rejette pour les petites valeurs.',
      },
      {
        kind: 'viz',
        id: 'ch5-s4-viz-puissance',
        vizId: 'ch5-puissance-upp',
        caption: 'Fonction puissance du test unilatéral U.P.P. : croissante, égale à $\\alpha$ en $\\theta_0$ (donc $\\le\\alpha$ sur tout $H_0$), et plus raide quand $n$ augmente. Les points simulés (bouton) retrouvent la courbe théorique.',
      },
      {
        kind: 'theorem',
        id: 'ch5-def-geometrique',
        type: 'definition',
        label: 'Définition (Outils, p. 27–28)',
        title: 'Loi géométrique et loi binomiale négative',
        source: 'Poly ch.5, Outils, p. 27–28',
        hypotheses: ['$\\theta\\in\\,]0,1[$.'],
        statement: '$Y$ à valeurs dans $\\mathbb{N}$ suit la **loi géométrique** de paramètre $\\theta$ (comptée en **nombre d’échecs avant le premier succès**) si $\\mathbb{P}_\\theta(Y=k)=\\theta(1-\\theta)^k$, $k\\in\\mathbb{N}$. Si $Y_1,\\dots,Y_n$ sont indépendantes de cette loi, $T=\\sum_iY_i$ suit la **loi binomiale négative** de paramètres $(n,\\theta)$ : $\\mathbb{P}_\\theta(T=k)=\\binom{n+k-1}{k}\\theta^n(1-\\theta)^k$, $k\\in\\mathbb{N}$.',
        intuition: 'Le modèle induit par $T$ est une famille exponentielle en $\\varphi(\\theta)=\\log(1-\\theta)$, **strictement décroissante** : rapport monotone **décroissant** en $T$ (grand $\\theta$ = peu d’échecs = $T$ petit). Statistique discrète : le test U.P.P. de l’Exercice 3 (PC5 Ex. 6) est randomisé.',
        proof: [
          { text: 'Le nombre de $n$-uplets $(k_1,\\dots,k_n)\\in\\mathbb{N}^n$ de somme $k$ vaut $\\binom{n+k-1}{k}$.', justification: 'Dénombrement « étoiles et barres » (esquissé dans le poly).' },
          { text: 'Chacun a probabilité $\\prod_i\\theta(1-\\theta)^{k_i}=\\theta^n(1-\\theta)^k$.', justification: 'Indépendance des $Y_i$.' },
        ],
        pitfalls: ['Convention « nombre d’échecs » (support $\\mathbb{N}$), et non « rang du premier succès » (support $\\mathbb{N}^*$).'],
      },
    ],
  },
]
