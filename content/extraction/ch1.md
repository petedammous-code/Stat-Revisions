# Chapitre 1 — Modèles statistiques

> **Sources extraites :** `S1_APM41033-Week1-Cours` (poly p. 7–22), `S1_APM41033-Week1-Maths` (« Les outils mathématiques », p. 23–34), `S1_APM41033-Week1-Exercices` (« Les exercices », p. 35–41), `S1_APM41033-Week1-Compléments` (« Les compléments », p. 42–59, **hors programme**).
> Le fascicule d'exercices du poly ne contient **pas** de corrigés : les corrigés de la section 4 sont repris du document `S1_APM-41033-EP-PC1-corrige` (corrigé officiel de la PC1, mêmes exercices 1 à 7), cité « Corrigé PC1, p. N ». Les réponses aux « questions courtes » sont déduites du cours (pas de corrigé officiel) et signalées comme telles.
> **Double numérotation du poly (à respecter) :** les éléments encadrés sont numérotés « N.M » (Définition 1.1, Exemple 1.5, Lemme 1.1, Théorème 1.3, Proposition 2.4…), tandis que les définitions *non encadrées* ont une numérotation continue sur tout le chapitre : Définition 1 (famille dominée), Définition 2 (identifiabilité), …, Définition 14 (mesure à densité). Il y a donc à la fois une « Définition 1.1 » (modèle statistique) et une « Définition 1 » (modèle dominé).
> Les sections du poly : §1 « Les fondamentaux » (1.1 à 1.10), §2 « Les outils mathématiques », §3 « Les exercices », §4 « Les compléments ».

---

## 0. Résumé en 10 lignes (ce qu'il faut retenir pour l'examen)

1. Un **modèle statistique** est un triplet $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ : un espace des observations mesurable et une famille $\mathcal{C}$ de lois candidates ; il est **paramétrique** si $\mathcal{C}=\{\mathbb{P}_\theta,\ \theta\in\Theta\}$ avec $\Theta\subset\mathbb{R}^d$ (Déf. 1.1).
2. Le modèle est **dominé** par une mesure $\sigma$-finie $\mu$ si toute loi s'écrit $\mathbb{P}=p\cdot\mu$ ; la mesure dominante n'est pas unique, les densités changent alors d'un facteur indépendant de $\theta$ (Déf. 1, Radon–Nikodym).
3. **Identifiabilité** : $\theta\mapsto\mathbb{P}_\theta$ injective ($\mathbb{P}_\theta=\mathbb{P}_{\theta'}\Rightarrow\theta=\theta'$). Contre-exemple type : le mélange gaussien sans contrainte, $p_{\pi,\mu_1,\mu_2}=p_{1-\pi,\mu_2,\mu_1}$ (Déf. 2, Ex. 1.6–1.7).
4. Une **statistique** est une application mesurable des observations, qui **ne dépend pas** de $\theta$ ni de la loi (Déf. 3) ; un **estimateur** est une statistique à valeurs dans $\Theta$ (ou un espace le contenant).
5. Le **modèle induit** par $T$ est $(\mathsf{T},\mathcal{T},\{\mathbb{P}^T,\ \mathbb{P}\in\mathcal{C}\})$ avec $\mathbb{P}^T(A)=\mathbb{P}(T\in A)$ ; on le calcule par la **méthode de la fonction muette** / changement de variables (Déf. 5).
6. Le **$n$-échantillon** $(\mathsf{X}^n,\mathcal{X}^{\otimes n},\{\mathbb{Q}^{\otimes n},\ \mathbb{Q}\in\mathcal{C}\})$ formalise $n$ observations i.i.d. ; en modèle dominé, densité produit $p_\theta(x_1,\dots,x_n)=\prod_i q_\theta(x_i)$ (Déf. 6, Lemme 1.1, formule (1)). Ne pas le confondre avec le produit de $n$ modèles (Déf. 7).
7. Premiers estimateurs : $\hat\theta_n=\bar X_n$ pour Bernoulli (sans biais) ; réponses randomisées : $\hat\theta_n=(\overline{\mathrm{RR}}_n-(1-q))/(2q-1)$, sans biais, variance $\ge q(1-q)/(n(2q-1)^2)$ qui explose quand $q\to1/2$.
8. **Théorème de Cochran** : si $X\sim\mathcal{N}(\mu,\sigma^2\mathrm{I}_n)$ et $\mathbb{R}^n=F_1\oplus\dots\oplus F_m$ orthogonale, les $P_{F_i}X$ sont indépendants, $P_{F_i}X\sim\mathcal{N}(P_{F_i}\mu,\sigma^2P_{F_i})$ et $\|P_{F_i}(X-\mu)\|^2/\sigma^2\sim\chi^2(d_i)$.
9. **Théorème de Gosset** : pour $X_1,\dots,X_n$ i.i.d. $\mathcal{N}(\mu,\sigma^2)$, $n\ge2$ : $\bar X_n\sim\mathcal{N}(\mu,\sigma^2/n)$, $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$, $\bar X_n\perp S_n^2$, et $\sqrt n(\bar X_n-\mu)/S_n\sim t(n-1)$.
10. Outils indispensables : vecteurs gaussiens ($AX+b\sim\mathcal{N}(A\mu+b,A\Sigma A^\top)$ ; décorrélation $\Leftrightarrow$ indépendance **dans un vecteur gaussien**), $\chi^2(\nu)=\mathrm{Gamma}(\nu/2,1/2)$, loi de Student, formule du changement de variables $q(u)=\mathbb{1}_{\phi(O)}(u)\,p(\phi^{-1}(u))\,\lvert\mathrm{Det}\,J_{\phi^{-1}}(u)\rvert$.

---

## 1. Notations et symboles

| Symbole LaTeX | Signification | Première apparition |
|---|---|---|
| $(\Omega,\mathcal{A},\mathbb{P})$ | espace probabilisé sous-jacent (« toujours omis dans la suite ») | §1.2, p. 8 |
| $(x_1,\dots,x_n)$ | données observées (réalisation) | §1.1, p. 8 |
| $Z=(X_1,\dots,X_n)$ | élément aléatoire (observation), $Z(\omega)=(x_1,\dots,x_n)$ | §1.2, p. 8 |
| $(\mathsf{Z},\mathcal{Z})$ | espace des observations (lettre **sans empattement** $\mathsf{Z}$ pour l'ensemble, $\mathcal{Z}$ calligraphique pour la tribu) | §1.2, p. 8 |
| $\mathcal{C}$ | famille de lois de probabilité sur $(\mathsf{Z},\mathcal{Z})$ | Déf. 1.1, p. 8 |
| $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ | modèle statistique | Déf. 1.1, p. 8 |
| $\{\mathbb{P}_\theta,\ \theta\in\Theta\}$, $\Theta\subset\mathbb{R}^d$ | modèle paramétrique, espace des paramètres | Déf. 1.1, p. 8 |
| $\mathcal{P}(E)$ | tribu de toutes les parties de $E$ | Ex. 1.1, p. 9 |
| $\mathrm{Bin}(n,\theta)$ | loi binomiale | Ex. 1.1, p. 9 |
| $\mathcal{B}\mathrm{er}(\theta)$, $\mathcal{B}\mathrm{er}(\theta)^{\otimes n}$ | loi de Bernoulli, loi produit de $n$ Bernoulli | Ex. 1.1 / 1.4, p. 9 |
| $\mathcal{B}(\mathbb{R}^n)$ | tribu borélienne de $\mathbb{R}^n$ | Ex. 1.2, p. 9 |
| $\mathcal{N}(\mu\mathbf{1}_n,\sigma^2\mathrm{I}_n)$ | loi gaussienne sur $\mathbb{R}^n$ ; $\mathbf{1}_n=(1,\dots,1)^\top$ (en gras), $\mathrm{I}_n$ identité | Ex. 1.2, p. 9 |
| $\mathbb{R}_+^\ast$ | réels strictement positifs (le poly écrit $\mathbb{R}^*_+$) | Ex. 1.2, p. 9 |
| $\mathcal{U}([0,\theta])$ | loi uniforme sur $[0,\theta]$ | Ex. 1.3, p. 9 |
| $\mathcal{E}(\lambda)$ | loi exponentielle de paramètre (intensité) $\lambda$, moyenne $\lambda^{-1}$ | Ex. 1.3, p. 9 |
| $\mathcal{P}\mathrm{oi}(\lambda)$ | loi de Poisson | Ex. 1.5, p. 10 |
| $p\cdot\mu$ | mesure de densité $p$ par rapport à $\mu$ : $(p\cdot\mu)(A)=\int_A p\,\mathrm{d}\mu$ | Déf. 1, p. 10 |
| $\mathrm{Leb}$, $\mathrm{Leb}^{\otimes n}$ | mesure de Lebesgue sur $\mathbb{R}$, sur $\mathbb{R}^n$ | Ex. 1.5, p. 10 |
| $p_{\mu,\sigma^2}$, $p_\lambda$, $p_\theta$ | densités des lois du modèle | Ex. 1.5, p. 10 |
| $\mu\ll\mu'$ | $\mu$ absolument continue par rapport à $\mu'$ ($\mu'$ domine $\mu$) | p. 11 ; Déf. 14 |
| $\mathbb{E}_\theta[\cdot]$, $\mathbb{P}_\theta(\cdot)$ | espérance et probabilité sous l'hypothèse que l'observation suit $\mathbb{P}_\theta$ | §1.3, p. 11 |
| $q_\lambda(x)=\lambda e^{-\lambda x}\mathbb{1}_{\mathbb{R}_+}(x)$ | densité exponentielle ($\mathbb{1}$ = indicatrice, notée en double barre dans le poly) | §1.3, p. 11 |
| $\Theta_0(Z)$ | région de confiance (sous-ensemble de $\Theta$ dépendant de l'observation) | §1.3, p. 11 |
| $\delta_a$ | masse de Dirac en $a$ ; convention $\mathcal{N}(\mu\mathbf{1}_n,0)=\delta_{\mu\mathbf{1}_n}$ | Ex. 1.6, p. 12 |
| $p_{\mathcal{N}(\mu_1,\sigma^2)}$ | densité de $\mathcal{N}(\mu_1,\sigma^2)$ | Ex. 1.7, p. 13 |
| $(\mathsf{T},\mathcal{T})$ | espace d'arrivée d'une statistique $T$ | Déf. 3, p. 13 |
| $\bar X_n$ | moyenne empirique $\frac1n\sum_{i=1}^nX_i$ | Ex. 1.8, p. 14 |
| $X_{(i)}$, $x_{(1)}\le\dots\le x_{(n)}$ | statistiques d'ordre, réarrangement croissant | Ex. 1.8, p. 14 |
| $\mathrm{med}(X_1,\dots,X_n)$ | médiane empirique | Ex. 1.8, p. 14 |
| $S(Z)=S\circ Z$ | v.a. obtenue en composant la statistique $S$ avec l'observation | Remarque, p. 14 |
| $\lVert z\rVert_\infty=\max_i\lvert x_i\rvert$ | norme infinie | Remarque, p. 14 |
| $p_\theta^{X_i}$, $\mathbb{P}_\theta^{X_i}$ | densité / loi de la statistique $X_i$ sous $\mathbb{P}_\theta$ | Ex. 1.10, p. 15 ; Ex. 1.15 |
| $S_n^2=\frac1{n-1}\sum_i(X_i-\bar X_n)^2$ | variance empirique (corrigée) | Ex. 1.11, p. 15 |
| $\chi^2(\nu)$ | loi du khi-deux à $\nu$ degrés de liberté ; $\chi^2(0)=\delta_0$ | Ex. 1.11, p. 15 ; Déf. 11 |
| $\mathbb{P}^T$, $\mathcal{C}^T$ | loi image de $\mathbb{P}$ par $T$, famille des lois images | Déf. 5, p. 16 |
| $\mathbb{P}_\theta^{Z}$ | loi de $Z$ sous $\mathbb{P}_\theta$ | Ex. 1.15, p. 17 |
| $\frac{\sigma^2}{n-1}\chi^2(n-1)$ | (abus de notation) loi de $\frac{\sigma^2}{n-1}Y$, $Y\sim\chi^2(n-1)$ | Ex. 1.14, p. 16 |
| $(\mathsf{X},\mathcal{X},\mathcal{C})^n$ | $n$-échantillon du modèle $(\mathsf{X},\mathcal{X},\mathcal{C})$ | Déf. 6, p. 17 |
| $\mathbb{Q}^{\otimes n}$, $\mathcal{X}^{\otimes n}$ | mesure produit, tribu produit | Déf. 6, p. 17 |
| $\mathbb{Q}_\theta=q_\theta(\cdot)\cdot\mu$ | loi d'une observation (modèle de base dominé) | p. 18 |
| $\hat\theta_n$ | estimateur de $\theta$ fondé sur $n$ observations | §1.8, p. 18 |
| $U_i\sim\mathcal{B}\mathrm{er}(q)$, $\mathrm{RR}_i$, $\overline{\mathrm{RR}}_n$ | variable de randomisation, réponse randomisée, moyenne des réponses | §1.8, p. 18–19 |
| $\mathrm{Var}_\theta$ | variance sous $\mathbb{P}_\theta$ | §1.8, p. 19 |
| $P_F$, $F^\perp$, $d_i=\dim F_i$ | matrice de projection orthogonale sur $F$, orthogonal | Th. 1.1, p. 19 |
| $0_{\mathbb{R}^n}$ | vecteur nul de $\mathbb{R}^n$ | Th. 1.2, p. 19 |
| $t(r)$ | loi de Student à $r$ degrés de liberté | Th. 1.3, p. 21 ; Déf. 12 |
| $T_n=\sqrt n\,(\bar X_n-\mu)/S_n$ | statistique de Student | Th. 1.3, p. 21 |
| $\mathcal{C}\otimes\mathcal{C}'$ | famille des lois produits $\mathbb{Q}\otimes\mathbb{Q}'$ | Déf. 7, p. 23 |
| $J_\psi$, $\mathrm{Det}$ | matrice jacobienne, déterminant | Prop. 2.2, p. 24 |
| $\mathrm{Gamma}(p)$, $\mathrm{Gamma}(p,\lambda)$, $\Gamma(\alpha)$ | lois Gamma (forme $p$, intensité $\lambda$), fonction Gamma d'Euler | p. 25, p. 30 |
| $g$, $g_{\mu,\sigma^2}$, $\varphi$, $\varphi_{\mu,\sigma^2}$ | densité et fonction caractéristique gaussiennes | Déf. 8–9, p. 25–26 |
| $\mathcal{N}(\mu,\Sigma)$ | vecteur gaussien d'espérance $\mu$, covariance $\Sigma$ | Déf. 10, p. 26–27 |
| $e_i$ | $i$-ème vecteur de la base canonique | p. 26 |
| $A^\#=(A^\top A)^{-1}A^\top$ | pseudo-inverse à gauche | Prop. 2.5, p. 28 |
| $X_{(i)}$ (blocs), $\Sigma_{ij}$ | sous-vecteurs et blocs de covariance (attention : même notation que les statistiques d'ordre) | Prop. 2.6, p. 28 |
| $\phi_{p,\lambda}$ | fonction caractéristique de $\mathrm{Gamma}(p,\lambda)$ | p. 31 |
| $f_\nu$, $f_r$ | densités $\chi^2(\nu)$ et $t(r)$ | Prop. 2.8, Déf. 12 |
| $\sigma(C)$, $\mathcal{B}(E)$ | tribu engendrée, tribu borélienne | Déf. 13, p. 33 |
| $\frac{\mathrm{d}\nu}{\mathrm{d}\mu}$ | dérivée de Radon–Nikodym | Th. 2.1, p. 33 |
| $a'$ | transposée de $a$ (convention **du fascicule d'exercices**, au lieu de $a^\top$) | Exercices, p. 35 |
| $\Gamma(n,\lambda)$ | notation des exercices pour $\mathrm{Gamma}(n,\lambda)$ | Exercices, p. 35 |
| $L_n$, $\ell_n$ | vraisemblance, log-vraisemblance (apparaissent seulement dans le corrigé PC1 ; définies au chapitre 2) | Corrigé PC1 |

**Notations particulières à signaler :**
- $\mathsf{Z}$, $\mathsf{X}$, $\mathsf{T}$ (police sans empattement) désignent des **ensembles** ; $Z$, $X$, $T$ (italiques) désignent l'observation / les statistiques. À reproduire avec `\mathsf{}`.
- $\mathbb{P}$ et $\mathbb{Q}$ (gras de tableau) désignent des **lois** ; $\mathbb{Q}$ est la loi d'*une* observation, $\mathbb{P}=\mathbb{Q}^{\otimes n}$ celle de l'échantillon.
- Le poly écrit $\mathcal{B}\mathrm{er}$, $\mathcal{P}\mathrm{oi}$ (initiale calligraphique), mais $\mathrm{Bin}$, $\mathrm{Gamma}$ en romain.
- La lettre $S_n$ a **deux sens** : écart-type empirique $\sqrt{S_n^2}$ dans le théorème de Gosset, mais **somme** $\sum_iX_i$ dans l'Exercice 3 (le poly le signale explicitement, p. 21). De même $S_1,S_2,S_3$ désignent des applications dans l'Ex. 1.8.
- Le poly autorise $\sigma^2=0$ (gaussienne dégénérée $\mathcal{N}(\mu,0)=\delta_\mu$).
- Le poly note la paramétrisation de l'exponentielle par l'**intensité** $\lambda$ (moyenne $1/\lambda$), et $\mathrm{Gamma}(p,\lambda)$ = loi de $Z/\lambda$, $Z\sim\mathrm{Gamma}(p)$.

---

## 2. Cours — contenu principal

### Remarque (non numérotée) — Qu'est-ce qu'un modèle ?
**Source :** Poly ch.1, introduction « Qu'est-ce qu'un modèle ? », p. 7
**Hypothèses :** aucune (texte de motivation).
**Énoncé :** Moralement, un modèle statistique est une description mathématique simplifiée d'un phénomène aléatoire réel. Il sert de pont entre le monde des données (observées) et celui des lois de probabilité (nos hypothèses sur la manière dont les données sont produites). En choisissant un modèle, on fixe un cadre théorique dans lequel on pourra raisonner, **estimer** des grandeurs inconnues, **prédire** de nouvelles observations ou **tester** des hypothèses. Un modèle statistique est une **hypothèse mathématiquement formalisée** sur le mécanisme aléatoire ayant généré les données : un espace d'observations et une famille de lois de probabilité candidates.
**Preuve (étapes) :** sans objet.
**Intuition :** comme toute simplification, un modèle ne capture pas toute la réalité, mais en retient les aspects jugés essentiels pour répondre à une question précise.

Le chapitre annonce (p. 7) ses concepts : observations, modèle statistique, identifiabilité, statistique, modèle induit, modèle dominé, $n$-échantillon, premiers estimateurs élémentaires.

### Remarque (non numérotée) — §1.1 La démarche statistique
**Source :** Poly ch.1, §1.1, p. 8
**Hypothèses :** —
**Énoncé :** La statistique est l'étude de la *collecte*, de la *modélisation* et du *traitement* des données (applications : médecine, environnement, finance, apprentissage, marketing…). Trois questions fil rouge :
1. Quelle est la probabilité qu'une pièce retombe sur « pile » ? Les pièces de 1 centime sont-elles biaisées ?
2. Quelle est la taille moyenne d'une personne dans une salle de cours ? Les élèves de Polytechnique sont-ils plus grands que la moyenne ?
3. Quelle proportion des élèves de deuxième année a déjà utilisé un modèle d'IA pour faire un devoir ?

Le **point de départ** est un jeu de données $(x_1,\dots,x_n)$ : numériques (scalaires, vectorielles $x_i\in\mathbb{R}^d$, matricielles $x_i\in\mathbb{R}^{p\times q}$), symboliques ($x_i\in\{0,1\}$), ou structurées (graphes, séries chronologiques, fonctions, textes, images…).
**Preuve (étapes) :** sans objet.
**Intuition :** répondre à ces questions demande de les reformuler en langage mathématique, puis de collecter, modéliser et analyser des données.

### Remarque (non numérotée) — §1.2 Les deux étapes de la modélisation
**Source :** Poly ch.1, §1.2, p. 8
**Hypothèses :** $(X_1,\dots,X_n)$ variables aléatoires sur $(\Omega,\mathcal{A},\mathbb{P})$ (toujours omis ensuite), à valeurs dans $(\mathsf{Z},\mathcal{Z})$.
**Énoncé :**
1. On modélise les observations comme des **réalisations de variables aléatoires** :
$$\text{Données} = \text{réalisation d'un élément aléatoire } Z=(X_1,\dots,X_n),\qquad Z(\omega)=(x_1,\dots,x_n).$$
$(\mathsf{Z},\mathcal{Z})$ est l'**espace des observations**.
2. On modélise la **loi** de ces variables : la loi de $Z=(X_1,\dots,X_n)$ est *partiellement connue* : c'est un élément d'une famille $\mathcal{C}$ de lois de probabilité.
**Preuve (étapes) :** sans objet.
**Intuition :** on ne connaît pas la loi, mais on suppose qu'elle appartient à une famille donnée.

### Définition 1.1 — Modèle statistique
**Source :** Poly ch.1, Définition 1.1, p. 8
**Hypothèses :** $(\mathsf{Z},\mathcal{Z})$ espace mesurable.
**Énoncé :** Un **modèle statistique** est la donnée de :
- un espace mesurable $(\mathsf{Z},\mathcal{Z})$, dit l'**espace des observations** ;
- une famille de probabilités $\mathcal{C}$ sur $(\mathsf{Z},\mathcal{Z})$.

On note $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ le modèle statistique.
Le modèle est dit **paramétrique** lorsque $\mathcal{C}$ correspond à une famille $\{\mathbb{P}_\theta,\ \theta\in\Theta\}$, où $\Theta$ est un sous-ensemble de $\mathbb{R}^d$, avec $d\ge1$ ; i.e. il existe une fonction associant à chaque $\theta\in\Theta$ un élément $\mathbb{P}_\theta$ de $\mathcal{C}$. Le paramètre $\theta$ est alors de dimension finie, pour une paramétrisation naturelle du modèle. Il est dit **non paramétrique** lorsqu'il ne se décrit pas par un nombre fini de paramètres réels (par exemple, l'ensemble de toutes les lois à densité continue sur $\mathbb{R}$).
**Preuve (étapes) :** définition.
**Intuition :** un modèle = « ce que j'observe » (l'espace) + « les mécanismes aléatoires que j'envisage » (la famille de lois).
**Pièges / erreurs classiques :** dans un modèle paramétrique, $\Theta\subset\mathbb{R}^d$ est de **dimension finie** (question courte n° 2 : « $\Theta$ peut être de dimension infinie » est **faux**). Ne pas oublier la tribu dans le triplet.

### Remarque (non numérotée) — Abus de langage
**Source :** Poly ch.1, Remarque après Déf. 1.1, p. 8
**Hypothèses :** l'espace $(\mathsf{Z},\mathcal{Z})$ est clair d'après le contexte.
**Énoncé :** Par abus de langage, on appelle « modèle statistique » la seule famille de lois $\mathcal{C}$ ; on parle ainsi du modèle $\{\mathbb{P}_\theta,\ \theta\in\Theta\}$ sans rappeler l'espace mesurable.
**Preuve (étapes) :** sans objet.
**Intuition :** commodité d'écriture.

### Exemple 1.1 — Pile ou face
**Source :** Poly ch.1, Exemple 1.1, p. 9
**Hypothèses :** $n$ lancers indépendants, chacun de loi $\mathcal{B}\mathrm{er}(\theta)$, $\theta\in[0,1]$ ; on observe le nombre de « piles ».
**Énoncé :** On observe une unique réalisation d'une variable à valeurs dans $\{0,\dots,n\}$ muni de la tribu des parties ; elle suit $\mathrm{Bin}(n,\theta)$. Le modèle s'écrit
$$\big(\{0,\dots,n\},\ \mathcal{P}(\{0,\dots,n\}),\ \{\mathrm{Bin}(n,\theta),\ \theta\in[0,1]\}\big).$$
**Preuve (étapes) :** la somme de $n$ Bernoulli indépendantes de paramètre $\theta$ suit $\mathrm{Bin}(n,\theta)$ (rappel de probabilités, non redémontré).
**Intuition :** on n'observe qu'un seul nombre, pas la suite des lancers (cf. Ex. 1.12 : c'est le modèle induit par la somme).
**Méthodes mobilisées :** construction de modèle ; loi binomiale comme loi d'une somme de Bernoulli.

### Exemple 1.2 — Tailles
**Source :** Poly ch.1, Exemple 1.2, p. 9
**Hypothèses :** tailles de $n$ personnes, modélisées par des gaussiennes de moyenne $\mu$ et variance $\sigma^2$, indépendantes.
**Énoncé :** observation dans $\mathbb{R}^n$ muni de $\mathcal{B}(\mathbb{R}^n)$ ; le modèle est
$$\Big(\mathbb{R}^n,\ \mathcal{B}(\mathbb{R}^n),\ \big\{\mathcal{N}(\mu\mathbf{1}_n,\sigma^2\mathrm{I}_n),\ \mu\in\mathbb{R},\ \sigma^2\in\mathbb{R}_+^\ast\big\}\Big).$$
**Preuve (étapes) :** sans objet (modélisation).
**Intuition :** modèle paramétrique à $d=2$ paramètres $(\mu,\sigma^2)$ ; l'indépendance se lit sur la covariance diagonale $\sigma^2\mathrm{I}_n$.
**Méthodes mobilisées :** construction de modèle ; vecteur gaussien.

### Exemple 1.3 — Temps d'attente
**Source :** Poly ch.1, Exemple 1.3, p. 9
**Hypothèses :** $n$ temps d'attente en minutes, observation dans $\mathbb{R}_+^n$ muni de sa tribu borélienne.
**Énoncé :** deux situations, deux modèles :
1. *Bus à horaire régulier* (départ toutes les $\theta$ minutes, arrivée à l'arrêt sans lien avec l'horaire) : attente uniforme sur $[0,\theta]$, $n$ attentes (jours différents) indépendantes :
$$\Big(\mathbb{R}_+^n,\ \mathcal{B}(\mathbb{R}_+^n),\ \big\{\mathcal{U}([0,\theta])^{\otimes n},\ \theta>0\big\}\Big).$$
2. *Clients arrivant dans un café* (arrivées dispersées et sans mémoire — propriété qui caractérise la loi exponentielle) : $n$ temps entre arrivées successives i.i.d. $\mathcal{E}(\lambda)$, $\lambda>0$ = nombre moyen d'arrivées par minute :
$$\Big(\mathbb{R}_+^n,\ \mathcal{B}(\mathbb{R}_+^n),\ \big\{\mathcal{E}(\lambda)^{\otimes n},\ \lambda>0\big\}\Big).$$
Dans les deux cas l'espace et la tribu sont les mêmes ; seule la famille de lois change, et avec elle l'hypothèse sur le mécanisme des arrivées. Le second modèle est le point de départ de l'Exercice 1 (PC1).
**Preuve (étapes) :** sans objet.
**Intuition :** le même type de données peut relever de modèles très différents selon le mécanisme physique supposé.
**Méthodes mobilisées :** construction de modèle ; absence de mémoire de l'exponentielle.

### Exemple 1.4 — Modèle de sondage
**Source :** Poly ch.1, Exemple 1.4, p. 9–10
**Hypothèses :** élection entre A et B ; sondage de sortie des urnes auprès de $n$ votants ; $x_i=1$ si le $i$-ème sondé vote A, $0$ sinon ; tirage **uniforme avec replacement** de $n$ individus.
**Énoncé :**
$$\Big(\{0,1\}^n,\ \mathcal{P}(\{0,1\}^n),\ \big\{\mathcal{B}\mathrm{er}(\theta)^{\otimes n},\ \theta\in\Theta\big\}\Big),$$
où $\mathcal{B}\mathrm{er}(\theta)^{\otimes n}$ est le produit de $n$ lois de Bernoulli :
$$\mathcal{B}\mathrm{er}(\theta)^{\otimes n}(\{x_1,\dots,x_n\})=\prod_{i=1}^n\theta^{x_i}(1-\theta)^{1-x_i}=\theta^{\sum_{i=1}^nx_i}(1-\theta)^{n-\sum_{i=1}^nx_i}.$$
(Le poly écrit $\{x_1,\dots,x_n\}$ pour le singleton $\{(x_1,\dots,x_n)\}$.)
**Preuve (étapes) :** par ce choix de famille, on exprime que les tirages sont indépendants et que chaque résultat est une Bernoulli de paramètre $\theta$.
**Intuition :** tirage avec remise $\Rightarrow$ indépendance exacte ; le cas **sans** replacement conduit à la loi hypergéométrique (Compléments, §4).
**Méthodes mobilisées :** loi produit ; construction de modèle.

### Remarque (non numérotée) — Intuition : trois questions
**Source :** Poly ch.1, encart « Intuition », p. 10
**Énoncé :** Construire un modèle, c'est répondre à trois questions : qu'est-ce que j'observe ? (l'espace $(\mathsf{Z},\mathcal{Z})$), quels mécanismes aléatoires ai-je envisagés ? (la famille $\mathcal{C}$), et que veux-je apprendre ? (la problématique). Plus la famille $\mathcal{C}$ est grande, moins le modèle fait d'hypothèses — mais plus il sera difficile d'en extraire une réponse précise.
**Intuition :** compromis flexibilité / précision.
(Le poly renvoie aussi à une animation : ajuster les paramètres d'un modèle de Bernoulli, gaussien ou exponentiel et comparer l'échantillon simulé aux données réelles.)

### Définition 1 — Famille dominée et modèle statistique dominé
**Source :** Poly ch.1, Définition 1, p. 10
**Hypothèses :** $(\mathsf{Z},\mathcal{Z})$ espace mesurable ; $\mu$ mesure **$\sigma$-finie** sur $(\mathsf{Z},\mathcal{Z})$.
**Énoncé :** Une famille de lois $\mathcal{C}$ est **dominée par la mesure $\mu$** si toute loi $\mathbb{P}\in\mathcal{C}$ admet une densité de probabilité $p$ par rapport à $\mu$, i.e. $\mathbb{P}=p\cdot\mu$. Le modèle statistique $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ est dit **dominé** lorsque la famille de lois $\mathcal{C}$ est dominée.
**Preuve (étapes) :** définition. (Par Radon–Nikodym, Th. 2.1 : dominé par $\mu$ $\Leftrightarrow$ toute $\mathbb{P}\in\mathcal{C}$ vérifie $\mathbb{P}\ll\mu$.)
**Intuition :** la plupart des modèles du cours s'écrivent « $p_\theta\cdot\mu$ » (densité par rapport à une mesure de référence) — c'est ce qui permettra de définir la vraisemblance au chapitre 2.
**Pièges / erreurs classiques :** la mesure dominante doit être **$\sigma$-finie** (la même pour toutes les lois de la famille).

### Exemple 1.5 — Modèles dominés : quelques densités
**Source :** Poly ch.1, Exemple 1.5, p. 10–11
**Hypothèses :** voir chaque cas.
**Énoncé :** Une loi et sa densité sont deux objets différents : la densité est une **fonction**, la loi est la **mesure** obtenue en l'intégrant contre la mesure de référence, $\mathbb{P}(A)=\int_Ap\,\mathrm{d}\mu$. Il faut toujours préciser par rapport à quelle mesure ($\sigma$-finie) une loi admet une densité.
1. **Modèle gaussien à $n$ observations**, dominé par $\mathrm{Leb}^{\otimes n}$, de densité
$$p_{\mu,\sigma^2}(x_1,\dots,x_n)=(2\pi\sigma^2)^{-n/2}\exp\Big(-\frac{1}{2\sigma^2}\sum_{i=1}^n(x_i-\mu)^2\Big)=\prod_{i=1}^n(2\pi\sigma^2)^{-1/2}\exp\Big(-\frac{(x_i-\mu)^2}{2\sigma^2}\Big),$$
et $\mathcal{N}(\mu,\sigma^2)^{\otimes n}(A)=\int_Ap_{\mu,\sigma^2}\,\mathrm{dLeb}^{\otimes n}$ pour $A\in\mathcal{B}(\mathbb{R}^n)$ ; ici $p_{\mu,\sigma^2}(x)$ **n'est pas une probabilité** (la loi d'un singleton est nulle).
2. **Une observation de Poisson** : comptage $X$ à valeurs dans $\mathbb{N}$, modèle $(\mathbb{N},\mathcal{P}(\mathbb{N}),\{\mathcal{P}\mathrm{oi}(\lambda),\ \lambda>0\})$, dominé par la **mesure de comptage** $\mu$ sur $\mathbb{N}$, densité
$$p_\lambda(k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad \mathcal{P}\mathrm{oi}(\lambda)(A)=\sum_{k\in A}p_\lambda(k)\quad\text{pour }A\subset\mathbb{N}.$$
Ici $p_\lambda(k)$ coïncide avec la probabilité du singleton $\{k\}$ : c'est propre à la mesure de comptage, et cela ne dispense pas de distinguer la fonction $p_\lambda$ de la loi $\mathcal{P}\mathrm{oi}(\lambda)$.
3. **Modèle de Bernoulli à $n$ observations**, dominé par la mesure de comptage sur $\{0,1\}^n$ :
$$p_\theta(x_1,\dots,x_n)=\theta^{\sum_ix_i}(1-\theta)^{n-\sum_ix_i},\qquad \mathcal{B}\mathrm{er}(\theta)^{\otimes n}(A)=\sum_{x\in A}p_\theta(x)\quad\text{pour }A\subset\{0,1\}^n.$$
**Preuve (étapes) :** calculs directs (factorisation de l'exponentielle d'une somme en produit).
**Intuition :** densité continue $\leftrightarrow$ Lebesgue ; loi discrète $\leftrightarrow$ comptage.
**Pièges / erreurs classiques :** confondre densité et probabilité (vrai seulement pour la mesure de comptage) ; oublier de préciser la mesure de référence.
**Méthodes mobilisées :** densité par rapport à une mesure ; densité produit.

### Remarque (non numérotée) — Non-unicité de la mesure de domination
**Source :** Poly ch.1, §1.2, p. 11
**Hypothèses :** $\mu$ domine le modèle ; $\mu'$ $\sigma$-finie avec $\mu\ll\mu'$.
**Énoncé :** La mesure de domination n'est jamais unique : toute mesure $\sigma$-finie $\mu'$ telle que $\mu\ll\mu'$ domine aussi le modèle. Ce choix est sans conséquence pour la statistique, car deux densités relatives à deux mesures dominantes diffèrent d'un **facteur multiplicatif qui ne dépend pas de $\theta$** (détails et modèles non dominés : Compléments §4). La modélisation d'arrivées successives (temps exponentiels, comptages poissoniens) est l'objet de l'Exercice 1 (PC1).
**Preuve (étapes) :** renvoyée aux Compléments (voir section 5 ci-dessous : passage par $\lambda=\mu+\nu$ et Radon–Nikodym).
**Intuition :** la vraisemblance n'est définie qu'à un facteur près indépendant de $\theta$ : ses points de maximum ne changent pas.

### Remarque (non numérotée) — §1.3 Objectifs de la statistique
**Source :** Poly ch.1, §1.3, p. 11
**Hypothèses :** modèle paramétrique $\{\mathbb{P}_\theta,\theta\in\Theta\}$.
**Énoncé :** À partir des observations, on cherche à *affiner notre connaissance de la loi de l'observation*. Tâches :
- **estimation ponctuelle** : donner une valeur *plausible* du paramètre $\theta$ ;
- **estimation par région** : déterminer un sous-ensemble $\Theta_0(Z)\subset\Theta$ auquel $\theta$ appartient de façon plausible ;
- **test** : décider si $\theta$ appartient à un sous-ensemble $\Theta_0$, et évaluer la plausibilité de la décision ;
- **prédiction** : donner une valeur plausible pour une quantité non observée, par exemple prédire une sortie $Y$ à partir d'une entrée $X$ (régression linéaire gaussienne : Exercice 4 PC1).

Planning annoncé : estimation aux cours 2 et 3, régions de confiance au cours 3, tests aux cours 4 et 5, puis régression.
**Intuition :** quatre grandes questions de l'inférence.

### Remarque (non numérotée) — Statistique et probabilités ; le modèle comme point de départ ; notations $\mathbb{E}_\theta$, $\mathbb{P}_\theta$
**Source :** Poly ch.1, §1.3, p. 11–12
**Énoncé :**
- *Statistique et probabilités.* En probabilités, la loi est supposée **connue** : étant donnés $\mathbb{P}$ et $Z$, on évalue $\mathbb{P}(f(Z)\ge c)$, $\mathbb{E}[f(Z)]$, etc. En statistique, on résout un **problème inverse** : étant donnée une réalisation $z=(x_1,\dots,x_n)$ de $Z=(X_1,\dots,X_n)$, on cherche à *inférer* certaines caractéristiques de la loi.
- *Le modèle comme point de départ.* La phrase « on considère le modèle $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ » signifie « on suppose observer une réalisation d'une variable aléatoire $Z$ à valeurs dans $\mathsf{Z}$ dont la loi est un élément de $\mathcal{C}$ ». Exemple : « on considère le modèle $(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{q_\lambda\cdot\mathrm{Leb},\ \lambda>0\})$ » avec $q_\lambda(x)=\lambda e^{-\lambda x}\mathbb{1}_{\mathbb{R}_+}(x)$ signifie que l'on suppose observer $X$ de loi exponentielle de paramètre $\lambda$, pour un certain $\lambda>0$. On souligne cette hypothèse par les notations
$$\mathbb{E}_\theta[\cdot],\qquad\mathbb{P}_\theta(\cdot),$$
espérance et probabilité **sous l'hypothèse que l'observation suit $\mathbb{P}_\theta$**.
- *Un modèle est une hypothèse.* « Tous les modèles sont faux, mais certains sont utiles ! » (George Box). Modéliser un pile ou face par une Bernoulli, des tailles par une gaussienne, un sondage téléphonique par des Bernoulli i.i.d., un temps d'attente par une exponentielle : simplifications utiles mais discutables (dépendances mécaniques, queues de distribution, biais de réponse, non-stationnarité…).
**Intuition :** deux niveaux : *à l'intérieur* du modèle, tout est rigoureux ; le *choix* du modèle est une hypothèse qui peut être inexacte. (Encadré historique : G. E. P. Box, 1919–2013, ICI puis département de statistique du Wisconsin en 1960 ; la formule « all models are wrong, but some are useful » prend sa forme proverbiale dans l'ouvrage de 1987 avec N. Draper.)
**Pièges / erreurs classiques :** écrire $\mathbb{E}[\cdot]$ sans indice $\theta$ alors que l'espérance dépend de la loi sous-jacente.

### Définition 2 — Identifiabilité
**Source :** Poly ch.1, Définition 2, §1.4, p. 12
**Hypothèses :** modèle **paramétrique** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$.
**Énoncé :** Le modèle est **identifiable** si la fonction $\theta\mapsto\mathbb{P}_\theta$ est **injective**, i.e.
$$\mathbb{P}_\theta=\mathbb{P}_{\theta'}\ \Longrightarrow\ \theta=\theta'.$$
**Preuve (étapes) :** définition.
**Intuition :** la connaissance complète de la loi $\mathbb{P}_\theta$ permet d'identifier $\theta$ de façon unique : propriété **minimale** pour espérer retrouver $\theta$ à partir des observations.
**Pièges / erreurs classiques :** pour montrer l'identifiabilité, il suffit d'exprimer $\theta$ comme fonction de la loi $\mathbb{P}_\theta$ (une probabilité d'événement, un moment, …). Pour montrer la non-identifiabilité, exhiber $\theta\ne\theta'$ avec $\mathbb{P}_\theta=\mathbb{P}_{\theta'}$.

### Exemple 1.6 — Les modèles rencontrés jusqu'ici sont identifiables
**Source :** Poly ch.1, Exemple 1.6, p. 12–13 (avec Démonstration)
**Hypothèses :** les quatre modèles :
1. pile ou face $(\{0,\dots,n\},\mathcal{P}(\{0,\dots,n\}),\{\mathrm{Bin}(n,\theta),\ \theta\in[0,1]\})$, $n\ge1$ fixé ;
2. tailles $\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{\mathcal{N}(\mu\mathbf{1}_n,\sigma^2\mathrm{I}_n),\ (\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+\}\big)$, où l'on autorise $\sigma^2=0$ avec la convention $\mathcal{N}(\mu\mathbf{1}_n,0)=\delta_{\mu\mathbf{1}_n}$ (toutes les tailles égales à $\mu$) ;
3. sondage avec remise $(\{0,1\}^n,\mathcal{P}(\{0,1\}^n),\{\mathcal{B}\mathrm{er}(\theta)^{\otimes n},\ \theta\in[0,1]\})$ ;
4. temps d'attente exponentiel $(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{q_\lambda\cdot\mathrm{Leb},\ \lambda>0\})$, $q_\lambda(x)=\lambda e^{-\lambda x}\mathbb{1}_{\mathbb{R}_+}(x)$.
**Énoncé :** ces quatre modèles sont identifiables : deux valeurs distinctes du paramètre donnent deux lois distinctes.
**Preuve (étapes) :** principe : dans chaque cas, exprimer le paramètre en fonction de la loi $\mathbb{P}_\theta$, ce qui entraîne l'injectivité.
1. *Pile ou face.* $\mathrm{Bin}(n,\theta)(\{k\})=\binom nk\theta^k(1-\theta)^{n-k}$ ; pour $k=n$ : $\mathrm{Bin}(n,\theta)(\{n\})=\theta^n$. Si $\mathrm{Bin}(n,\theta)=\mathrm{Bin}(n,\theta')$ alors $\theta^n=\theta'^n$, donc $\theta=\theta'$ (car $t\mapsto t^n$ est strictement croissante, donc injective, sur $[0,1]$).
2. *Tailles.* Une loi sur $\mathbb{R}^n$ admettant un moment d'ordre deux détermine son vecteur espérance et sa matrice de covariance. $\mathcal{N}(\mu\mathbf{1}_n,\sigma^2\mathrm{I}_n)$ a pour espérance $\mu\mathbf{1}_n$ et covariance $\sigma^2\mathrm{I}_n$ (encore vrai pour $\sigma^2=0$ : $\delta_{\mu\mathbf{1}_n}$ a espérance $\mu\mathbf{1}_n$, covariance nulle). Si $\mathcal{N}(\mu\mathbf{1}_n,\sigma^2\mathrm{I}_n)=\mathcal{N}(\mu'\mathbf{1}_n,\sigma'^2\mathrm{I}_n)$ alors $\mu\mathbf{1}_n=\mu'\mathbf{1}_n$ et $\sigma^2\mathrm{I}_n=\sigma'^2\mathrm{I}_n$, d'où $\mu=\mu'$, $\sigma^2=\sigma'^2$. Injectivité sur $\mathbb{R}\times\mathbb{R}_+$, *a fortiori* sur $\mathbb{R}\times\mathbb{R}_+^\ast$.
3. *Sondage avec remise.* $\mathcal{B}\mathrm{er}(\theta)^{\otimes n}(\{(1,\dots,1)\})=\theta^n$ (tous votent A) ; on conclut comme en 1.
4. *Temps d'attente.* $\mathbb{P}_\lambda([1,+\infty[)=\int_1^{+\infty}\lambda e^{-\lambda x}\,\mathrm{d}x=e^{-\lambda}$. Si $\mathbb{P}_\lambda=\mathbb{P}_{\lambda'}$ alors $e^{-\lambda}=e^{-\lambda'}$, donc $\lambda=\lambda'$ (injectivité de l'exponentielle). $\square$
**Intuition :** on cherche un « morceau » de la loi (probabilité d'un événement, moment) qui est une fonction injective du paramètre.
**Méthodes mobilisées :** identifiabilité via une probabilité d'événement bien choisie ; via les moments d'ordre 1 et 2 ; monotonie stricte / injectivité.

### Exemple 1.7 — Mélange gaussien (non identifiable)
**Source :** Poly ch.1, Exemple 1.7, p. 13
**Hypothèses :** $\sigma^2>0$ **connu** ; modèle sur $\mathbb{R}$ de densités par rapport à $\mathrm{Leb}$
$$p_{\pi,\mu_1,\mu_2}=\pi\,p_{\mathcal{N}(\mu_1,\sigma^2)}+(1-\pi)\,p_{\mathcal{N}(\mu_2,\sigma^2)},\qquad(\pi,\mu_1,\mu_2)\in[0,1]\times\mathbb{R}^2,$$
$\pi$ = proportion de la première composante, $\mu_1,\mu_2$ = moyennes.
**Énoncé :** Ce modèle **n'est pas identifiable** : en échangeant les rôles des deux composantes,
$$p_{\pi,\mu_1,\mu_2}=p_{1-\pi,\mu_2,\mu_1}.$$
On peut le rendre identifiable en restreignant l'espace des paramètres, par exemple en imposant $\mu_1<\mu_2$ (et $\pi\in\,]0,1[$, $\mu_1\le\mu_2$ « avec conventions au bord à préciser », selon le poly). L'identifiabilité des mélanges gaussiens et poissoniens, une fois cette restriction faite, est démontrée dans l'Exercice 7 (PC1).
**Preuve (étapes) :** 1. Échanger $(\pi,\mu_1,\mu_2)\leftrightarrow(1-\pi,\mu_2,\mu_1)$ donne la même somme (commutativité de l'addition). 2. Dès que $\mu_1\ne\mu_2$ ou $\pi\ne1/2$, ces deux paramètres sont distincts mais donnent la même loi.
**Intuition :** problème du « label switching » : les étiquettes des composantes sont arbitraires. (Animation du poly : $(\pi,\mu_1,\mu_2)$ et $(1-\pi,\mu_2,\mu_1)$ produisent la même densité.)
**Pièges / erreurs classiques :** d'autres non-identifiabilités existent aussi au bord (ex. $\pi=0$ : $\mu_1$ n'apparaît plus ; $\mu_1=\mu_2$ : $\pi$ n'apparaît plus) — c'est pourquoi le poly mentionne des « conventions au bord à préciser ».
**Méthodes mobilisées :** non-identifiabilité par exhibition de deux paramètres distincts de même loi ; restriction de l'espace des paramètres.

### Définition 3 — Statistique
**Source :** Poly ch.1, Définition 3, §1.5, p. 13
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ modèle statistique ; $(\mathsf{T},\mathcal{T})$ espace mesurable.
**Énoncé :** On appelle **statistique** sur le modèle $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ une **application mesurable** $T$ de $(\mathsf{Z},\mathcal{Z})$ à valeurs dans $(\mathsf{T},\mathcal{T})$.
Remarque du poly (« très importante ») : $T$ **ne dépend pas de la loi** $\mathbb{P}\in\mathcal{C}$, donc **ne dépend pas du paramètre** si le modèle est paramétrique.
**Preuve (étapes) :** définition.
**Intuition :** une statistique est une transformation des observations seules (moyenne, maximum, comptage…), dans laquelle n'interviennent ni le paramètre ni la loi inconnue.
**Pièges / erreurs classiques :** $\bar X_n-\mu$ n'est **pas** une statistique si $\mu$ est inconnu ; $\sqrt n(\bar X_n-\mu)/S_n$ non plus (c'est un « pivot », pas une statistique). Question courte n° 4 : « une statistique peut dépendre de $\theta$ » est **faux**.

### Exemple 1.8 — Exemples de statistiques
**Source :** Poly ch.1, Exemple 1.8, p. 14
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\mathcal{C})=(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{\mathbb{P}_\theta,\ \theta\in\Theta\})$, $Z=(X_1,\dots,X_n)$.
**Énoncé :**
1. la **$i$-ème observation** : statistique $X_i$ définie pour $z=(x_1,\dots,x_n)\in\mathbb{R}^n$ par $X_i(z)=x_i$ ;
2. $S_1(Z)=\frac{X_1+\dots+X_n}{n}$, la **moyenne empirique**, notée canoniquement $\bar X_n$ ;
3. $S_2(Z)=\min\{X_i,\ i=1,\dots,n\}$, et plus généralement les **statistiques d'ordre** $(X_{(i)})_{i=1,\dots,n}$ ;
4. $S_3(Z)=\mathrm{med}(X_1,\dots,X_n)$, la **médiane empirique**.
**Preuve (étapes) :** voir la Remarque suivante (mesurabilité).
**Intuition :** statistiques « canoniques » de position.

### Remarque (non numérotée) — Statistique comme application vs comme variable aléatoire ; mesurabilité des exemples
**Source :** Poly ch.1, Remarque après Ex. 1.8, p. 14
**Hypothèses :** $S:(\mathsf{Z},\mathcal{Z})\to(\mathsf{T},\mathcal{T})$ mesurable ; observation canonique $Z:(\Omega,\mathcal{A},\mathbb{P})\to(\mathsf{Z},\mathcal{Z})$.
**Énoncé :** Une statistique est une fonction définie sur l'espace des observations, sans aléa. En la composant avec $Z$, on obtient la variable aléatoire $S\circ Z$, notée $S(Z)$, à valeurs dans $(\mathsf{T},\mathcal{T})$, de loi la **loi image** de celle de $Z$ par $S$ (§1.6). Les deux points de vue décrivent le même objet ; « statistique » s'emploie pour les deux. La notation les distingue : $S_1$ désigne l'application $z=(x_1,\dots,x_n)\mapsto\frac1n\sum_{i=1}^nx_i$, tandis que $\bar X_n=S_1(Z)=\frac1n\sum_{i=1}^nX_i$ désigne la variable aléatoire.
Les exemples ci-dessus sont des applications **continues** de $\mathbb{R}^n$ dans $\mathbb{R}$, donc boréliennes, donc des statistiques.
**Preuve (étapes) :**
1. $z\mapsto x_i$ et $z\mapsto\frac1n\sum_ix_i$ sont **linéaires** sur $\mathbb{R}^n$, donc continues.
2. Statistiques d'ordre : $z\mapsto x_{(k)}$ est **1-lipschitzienne** pour $\lVert z\rVert_\infty=\max_{1\le i\le n}\lvert x_i\rvert$. Soient $z,z'$ et $\varepsilon=\lVert z-z'\rVert_\infty$. Par définition du réarrangement croissant, au moins $k$ coordonnées de $z$ sont $\le x_{(k)}$ ; comme $x'_i\le x_i+\varepsilon$ pour tout $i$, au moins $k$ coordonnées de $z'$ sont $\le x_{(k)}+\varepsilon$, d'où $x'_{(k)}\le x_{(k)}+\varepsilon$. En échangeant $z$ et $z'$ : $\lvert x'_{(k)}-x_{(k)}\rvert\le\lVert z-z'\rVert_\infty$. Donc continues (en particulier $x_{(1)}$ = min et $x_{(n)}$ = max).
3. Médiane empirique : fonction continue des statistiques d'ordre : $x_{(m+1)}$ si $n=2m+1$, $\frac12\big(x_{(m)}+x_{(m+1)}\big)$ si $n=2m$.
4. Toute application continue de $\mathbb{R}^n$ dans $\mathbb{R}$ est borélienne (justification : Outils, tribu borélienne) $\Rightarrow$ ce sont des statistiques. $\square$
**Intuition :** en pratique, toute fonction « raisonnable » (continue, ou composée de fonctions mesurables) des observations est une statistique.
**Méthodes mobilisées :** continuité $\Rightarrow$ mesurabilité borélienne ; argument lipschitzien.

Le poly ajoute (p. 14) : on parle d'**observations individuelles** $X_1,\dots,X_n$ ; $X_i$ est la *statistique associée* à la $i$-ème donnée collectée.

### Définition 4 — Statistiques indépendantes
**Source :** Poly ch.1, Définition 4, p. 14
**Hypothèses :** $X$, $Y$ statistiques sur $(\mathsf{Z},\mathcal{Z},\mathcal{C})$.
**Énoncé :** $X$ et $Y$ sont **indépendantes** si **pour toute loi $\mathbb{P}\in\mathcal{C}$**, les éléments aléatoires $X$ et $Y$ sont indépendants sous $\mathbb{P}$ :
$$\mathbb{P}(X\in A,Y\in B)=\mathbb{P}(X\in A)\,\mathbb{P}(Y\in B).$$
Plus généralement, $X_1,\dots,X_n$ sont indépendantes si, pour toute loi $\mathbb{P}\in\mathcal{C}$ et tous $A_1,\dots,A_n$ mesurables, $\mathbb{P}(X_1\in A_1,\dots,X_n\in A_n)=\prod_{i=1}^n\mathbb{P}(X_i\in A_i)$.
**Preuve (étapes) :** définition.
**Intuition :** l'indépendance doit valoir **uniformément** sur tout le modèle, pas seulement sous une loi.
**Pièges / erreurs classiques :** oublier le « pour toute loi $\mathbb{P}\in\mathcal{C}$ ».

### Exemple 1.9 — Modèle de Bernoulli à $n$ observations
**Source :** Poly ch.1, Exemple 1.9, p. 15
**Hypothèses :** modèle $\big(\{0,1\}^n,\mathcal{P}(\{0,1\}^n),\{\mathcal{B}\mathrm{er}(\theta)^{\otimes n},\ \theta\in[0,1]\}\big)$.
**Énoncé :** les coordonnées $X_1,\dots,X_n$ sont des statistiques indépendantes, chacune de loi $\mathcal{B}\mathrm{er}(\theta)$ sous $\mathbb{P}_\theta$ : c'est la définition même de la loi produit. On dit communément que les observations sont **i.i.d.** de loi $\mathcal{B}\mathrm{er}(\theta)$.
**Preuve (étapes) :** définition de la loi produit (détail : Ex. 1.15).
**Intuition :** loi produit $\Leftrightarrow$ i.i.d.

### Exemple 1.10 — Modèle gaussien à $n$ observations
**Source :** Poly ch.1, Exemple 1.10, p. 15 (avec Démonstration)
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\mathcal{C})=\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{\mathbb{P}_\theta,\ \theta=(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^\ast\}\big)$, $\mathbb{P}_\theta=p_\theta\cdot\mathrm{Leb}^{\otimes n}$,
$$p_\theta(x_1,\dots,x_n)=(2\pi\sigma^2)^{-n/2}\exp\Big(-\frac1{2\sigma^2}\sum_{i=1}^n(x_i-\mu)^2\Big).$$
**Énoncé :** les coordonnées $X_1,\dots,X_n$ sont des statistiques indépendantes, chacune de loi $\mathcal{N}(\mu,\sigma^2)$ sous $\mathbb{P}_\theta$ : les observations sont i.i.d. $\mathcal{N}(\mu,\sigma^2)$.
**Preuve (étapes) :**
1. La densité se **factorise** : $p_\theta(x_1,\dots,x_n)=\prod_{i=1}^np_\theta^{X_i}(x_i)$ avec $p_\theta^{X_i}(x)=(2\pi\sigma^2)^{-1/2}\exp\big(-\frac1{2\sigma^2}(x-\mu)^2\big)$, densité de $\mathcal{N}(\mu,\sigma^2)$ (exponentielle d'une somme = produit d'exponentielles).
2. Pour $A_1,\dots,A_n\in\mathcal{B}(\mathbb{R})$, **par le théorème de Fubini** :
$$\mathbb{P}_\theta(X_1\in A_1,\dots,X_n\in A_n)=\int_{A_1\times\dots\times A_n}\prod_{i=1}^np_\theta^{X_i}(x_i)\,\mathrm{d}x_1\cdots\mathrm{d}x_n=\prod_{i=1}^n\int_{A_i}p_\theta^{X_i}(x)\,\mathrm{d}x=\prod_{i=1}^n\mathbb{P}_\theta(X_i\in A_i).$$
3. C'est-à-dire $\mathbb{P}_\theta=\mathcal{N}(\mu,\sigma^2)^{\otimes n}$. $\square$
**Intuition :** densité produit $\Rightarrow$ indépendance (et lois marginales lues sur les facteurs).
**Méthodes mobilisées :** factorisation de densité ; Fubini.

### Exemple 1.11 — Moyenne et variance empiriques du modèle gaussien : théorème de Gosset
**Source :** Poly ch.1, Exemple 1.11, p. 15 (avec Démonstration-renvoi)
**Hypothèses :** modèle gaussien à $n$ observations, $n\ge2$.
**Énoncé :** la moyenne empirique et la variance empirique
$$\bar X_n=\frac1n\sum_{i=1}^nX_i,\qquad S_n^2=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X_n)^2$$
sont des **statistiques indépendantes** ; de plus, sous $\mathbb{P}_{(\mu,\sigma^2)}$, $\bar X_n\sim\mathcal{N}(\mu,\sigma^2/n)$ et $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$. C'est le **théorème de Gosset**.
**Preuve (étapes) :** renvoyée au Théorème 1.3 (§1.9) : théorème de Cochran appliqué à $\mathbb{R}^n=\mathbb{R}\mathbf{1}_n\oplus(\mathbb{R}\mathbf{1}_n)^\perp$ ; la projection de $(X_1,\dots,X_n)$ sur $\mathbb{R}\mathbf{1}_n$ est $\bar X_n\mathbf{1}_n$ et le carré de la norme de la projection sur l'orthogonal est $(n-1)S_n^2$. L'Exercice 3 (PC1) reprend ce calcul avec la somme des observations et la somme de leurs carrés.
**Intuition :** dans un échantillon gaussien, moyenne et variance empiriques sont indépendantes.
**Pièges / erreurs classiques :** cette indépendance est **propre au modèle gaussien** : pour $n$ observations i.i.d. d'une loi à variance finie, l'indépendance de $\bar X_n$ et $S_n^2$ **caractérise** la loi gaussienne (théorème de Lukacs, 1942).

### Remarque (non numérotée) — Statistiques canoniques non indépendantes
**Source :** Poly ch.1, p. 15
**Énoncé :** Dans le même modèle gaussien, la somme des observations $\sum_iX_i=n\bar X_n$ et la somme de leurs carrés $\sum_iX_i^2=(n-1)S_n^2+n\bar X_n^2$ **ne sont pas indépendantes**, alors que $\bar X_n$ et $S_n^2$ le sont (objet de l'Exercice 3 PC1). Dans le modèle de régression de l'Exercice 4 (PC1), les observations sont indépendantes mais **pas identiquement distribuées**.
**Preuve (étapes) :** non détaillée dans le cours (voir le corrigé de l'Exercice 3, complément, en section 4 : la densité jointe de $(S_n,\sum_iX_i^2)$ contient le support $\{v\ge u^2/n\}$ qui ne se factorise pas).
**Intuition :** $\sum X_i^2$ « contient » $\bar X_n^2$.
**Pièges / erreurs classiques :** l'indépendance dépend du choix de la paramétrisation des statistiques.

### Définition 5 — Modèle induit
**Source :** Poly ch.1, Définition 5, §1.6, p. 16
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ modèle statistique ; $T$ statistique à valeurs dans $(\mathsf{T},\mathcal{T})$.
**Énoncé :** Pour toute loi $\mathbb{P}\in\mathcal{C}$, la **loi image** de $\mathbb{P}$ par $T$, notée $\mathbb{P}^T$, est la loi de probabilité sur $(\mathsf{T},\mathcal{T})$ définie par
$$\mathbb{P}^T(A):=\mathbb{P}(T\in A)=\mathbb{P}\big(\{z\in\mathsf{Z}:\ T(z)\in A\}\big),\qquad A\in\mathcal{T}.$$
On pose $\mathcal{C}^T:=\{\mathbb{P}^T,\ \mathbb{P}\in\mathcal{C}\}$. Le modèle statistique $(\mathsf{T},\mathcal{T},\mathcal{C}^T)$ est appelé **modèle induit par la statistique $T$**.
Sous $\mathbb{P}$, $T$ est un élément aléatoire défini sur $(\mathsf{Z},\mathcal{Z},\mathbb{P})$, de loi $\mathbb{P}^T$. Le calcul pratique de la loi image repose sur la **méthode de la fonction muette** et le **changement de variables** (Outils §2 ; Exercice 2 PC1).
**Preuve (étapes) :** définition ($\mathbb{P}^T$ est bien une probabilité car $T$ est mesurable).
**Intuition :** transformer les observations transporte chaque loi sur l'espace d'arrivée de $T$. Un modèle induit est en général plus « pauvre » : on a le droit de jeter de l'information, pas d'en créer.
**Pièges / erreurs classiques :** le modèle induit est un **triplet** : il faut donner l'espace d'arrivée, sa tribu et la famille des lois images (paramétrée par le même $\theta$).

### Exemple 1.12 — Modèle induit : Bernoulli
**Source :** Poly ch.1, Exemple 1.12, p. 16
**Hypothèses :** modèle $\big(\{0,1\}^n,\mathcal{P}(\{0,1\}^n),\{\mathcal{B}\mathrm{er}(\theta)^{\otimes n},\ \theta\in[0,1]\}\big)$ ; statistique $S_n=\sum_{i=1}^nX_i$.
**Énoncé :** le modèle induit est
$$\big(\{0,\dots,n\},\ \mathcal{P}(\{0,\dots,n\}),\ \{\mathrm{Bin}(n,\theta),\ \theta\in[0,1]\}\big).$$
**Preuve (étapes) :** non détaillée dans le poly (résultat classique : somme de $n$ Bernoulli indépendantes de même paramètre). *Esquisse (ajout de l'extracteur, à titre de rappel)* : $\mathbb{P}_\theta(S_n=k)=\sum_{x:\sum x_i=k}\theta^k(1-\theta)^{n-k}=\binom nk\theta^k(1-\theta)^{n-k}$.
**Intuition :** on retrouve le modèle du pile ou face (Ex. 1.1).
**Méthodes mobilisées :** calcul de loi image ; dénombrement.

### Exemple 1.13 — Modèle induit : loi uniforme
**Source :** Poly ch.1, Exemple 1.13, p. 16
**Hypothèses :** modèle $\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{\mathcal{U}([0,\theta])^{\otimes n},\ \theta\in\mathbb{R}_+^\ast\}\big)$ ; sous $\mathbb{P}_\theta$, chaque observation a pour densité $t\mapsto\frac1\theta\mathbb{1}_{[0,\theta]}(t)$ ; statistique $X_{(n)}=\max_{1\le i\le n}X_i$.
**Énoncé :** le modèle induit est
$$\Big(\mathbb{R},\ \mathcal{B}(\mathbb{R}),\ \{q_{n,\theta}\cdot\mathrm{Leb},\ \theta\in\mathbb{R}_+^\ast\}\Big)\quad\text{avec}\quad q_{n,\theta}(t)=\frac{n\,t^{n-1}}{\theta^n}\mathbb{1}_{[0,\theta]}(t).$$
**Preuve (étapes) :** « Ce calcul sera repris en PC 4 » : **non démontré dans le poly**. *Esquisse standard (ajout de l'extracteur)* : par indépendance, $\mathbb{P}_\theta(X_{(n)}\le t)=\prod_i\mathbb{P}_\theta(X_i\le t)=(t/\theta)^n$ pour $t\in[0,\theta]$ ; on dérive en $t$.
**Intuition :** le maximum se concentre près de $\theta$ quand $n$ grandit.
**Méthodes mobilisées :** fonction de répartition du maximum ; indépendance.

### Exemple 1.14 — Modèle induit : moyenne et variance empiriques du modèle gaussien
**Source :** Poly ch.1, Exemple 1.14, p. 16
**Hypothèses :** modèle gaussien à $n$ observations, $n\ge2$ ; $T=(\bar X_n,S_n^2)$ à valeurs dans $\mathbb{R}\times\mathbb{R}_+$.
**Énoncé :** d'après le théorème de Gosset, sous $\mathbb{P}_{(\mu,\sigma^2)}$, $\bar X_n\sim\mathcal{N}(\mu,\sigma^2/n)$, $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$, indépendantes. Le modèle induit par $T$ est donc
$$\Big(\mathbb{R}\times\mathbb{R}_+,\ \mathcal{B}(\mathbb{R}\times\mathbb{R}_+),\ \Big\{\mathcal{N}(\mu,\sigma^2/n)\otimes\tfrac{\sigma^2}{n-1}\chi^2(n-1),\ (\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^\ast\Big\}\Big),$$
où, par un léger abus de notation, $\frac{\sigma^2}{n-1}\chi^2(n-1)$ désigne la loi de $\frac{\sigma^2}{n-1}Y$ avec $Y\sim\chi^2(n-1)$, c'est-à-dire la loi image de $\chi^2(n-1)$ par $y\mapsto\sigma^2y/(n-1)$.
**Preuve (étapes) :** 1. Gosset (Th. 1.3) donne les deux lois marginales (par (i) et (ii)). 2. L'indépendance (Th. 1.3 (iii)) donne que la loi jointe est la **loi produit** des marginales.
**Intuition :** indépendance $\Rightarrow$ loi jointe = produit.
**Méthodes mobilisées :** théorème de Gosset ; loi image par changement d'échelle.

### Exemple 1.15 — Modèle de sondage (suite)
**Source :** Poly ch.1, Exemple 1.15, p. 17
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\mathcal{C})=\big(\{0,1\}^n,\mathcal{P}(\{0,1\}^n),\{\mathcal{B}\mathrm{er}(\theta)^{\otimes n},\ \theta\in\Theta:=[0,1]\}\big)$ ; $X_i(\mathbf{x})=x_i$ pour $\mathbf{x}=(x_1,\dots,x_n)\in\{0,1\}^n$ ; $\mathbb{P}_\theta=\mathcal{B}\mathrm{er}(\theta)^{\otimes n}$.
**Énoncé :** la loi image $\mathbb{P}_\theta^{X_i}$ est une loi de Bernoulli de paramètre $\theta$, et les statistiques $X_1,\dots,X_n$ sont **indépendantes** : pour tout $(x_1,\dots,x_n)\in\{0,1\}^n$,
$$\mathbb{P}_\theta(\{X_1=x_1,\dots,X_n=x_n\})=\mathbb{P}_\theta^Z(\{x_1,\dots,x_n\})=\prod_{i=1}^n\theta^{x_i}(1-\theta)^{1-x_i}=\prod_{i=1}^n\mathbb{P}_\theta(\{X_i=x_i\}),$$
où $Z=(X_1,\dots,X_n)$. Les statistiques $(X_1,\dots,X_n)$ sont **i.i.d.** : pour tout $\theta\in\Theta$ et $i$, $X_i$ suit $\mathcal{B}\mathrm{er}(\theta)$.
**Preuve (étapes) :** 1. Calcul de $\mathbb{P}_\theta^Z$ sur les singletons par définition de la loi produit. 2. Factorisation en produit. 3. Sur un espace fini, l'égalité sur les singletons suffit à l'indépendance.
**Intuition :** exemple générique qui motive la définition du $n$-échantillon.
**Méthodes mobilisées :** loi image ; factorisation.

### Définition 6 — $n$-échantillon
**Source :** Poly ch.1, Définition 6, §1.7, p. 17
**Hypothèses :** $(\mathsf{X},\mathcal{X},\mathcal{C})$ modèle statistique ; $n\in\mathbb{N}^\ast$.
**Énoncé :** On appelle **$n$-échantillon** de $(\mathsf{X},\mathcal{X},\mathcal{C})$ le modèle statistique
$$(\mathsf{X},\mathcal{X},\mathcal{C})^n:=\big(\mathsf{X}^n,\ \mathcal{X}^{\otimes n},\ \{\mathbb{Q}^{\otimes n},\ \mathbb{Q}\in\mathcal{C}\}\big).$$
On appelle **$i$-ème observation (canonique)** la statistique $X_i$ définie pour $z=(x_1,\dots,x_n)\in\mathsf{X}^n$ par $X_i(z)=x_i$.
**Preuve (étapes) :** définition (construction générale du produit : Outils §2).
**Intuition :** $\mathbb{Q}^{\otimes n}$ est la mesure produit de $\mathbb{Q}$, $n$ fois : formalisation de « répéter $n$ fois la même expérience, de façon indépendante ». Propriété clé : $(X_1,\dots,X_n)\sim\mathbb{Q}^{\otimes n}$ si et seulement si $(X_1,\dots,X_n)$ sont i.i.d. de loi $\mathbb{Q}$.
**Pièges / erreurs classiques :** c'est la **même** loi $\mathbb{Q}$ qui est répétée (« diagonale » du modèle produit, cf. Déf. 7).

### Lemme 1.1 — Propriétés du $n$-échantillon
**Source :** Poly ch.1, Lemme 1.1, p. 17
**Hypothèses :** $(\mathsf{X},\mathcal{X},\mathcal{C})^n$ un $n$-échantillon du modèle $(\mathsf{X},\mathcal{X},\mathcal{C})$.
**Énoncé :**
(i) Les observations $Z=(X_1,\dots,X_n)$ sont indépendantes.
(ii) Pour tout $i\in\{1,\dots,n\}$, le modèle induit par la statistique $X_i$ est $(\mathsf{X},\mathcal{X},\mathcal{C})$.
**Preuve (étapes) :** pour tout $\mathbb{P}=\mathbb{Q}^{\otimes n}\in\mathcal{C}^{\otimes n}$ et $(A_1,\dots,A_n)\in\mathcal{X}^n$ :
$$\begin{aligned}\mathbb{P}^Z(A_1\times\dots\times A_n)&=\mathbb{P}(X_1\in A_1,\dots,X_n\in A_n)\\&=\mathbb{Q}^{\otimes n}(A_1\times\dots\times A_n)=\prod_{i=1}^n\mathbb{Q}(A_i)=\prod_{i=1}^n\mathbb{P}(X_i\in A_i).\end{aligned}$$
1. Première égalité : définition de la loi de $Z$ (ici $Z$ est l'identité). 2. Deuxième : définition de la mesure produit sur les pavés. 3. En prenant $A_j=\mathsf{X}$ pour $j\ne i$, on obtient $\mathbb{P}(X_i\in A_i)=\mathbb{Q}(A_i)$, d'où (ii) : $\mathbb{P}^{X_i}=\mathbb{Q}$, donc $\mathcal{C}^{X_i}=\mathcal{C}$. 4. L'égalité des deux membres extrêmes est (i). $\square$
**Intuition :** formalise « $n$ copies indépendantes du même modèle ».
**Méthodes mobilisées :** mesure produit sur les pavés.

Terminologie : « $(X_1,\dots,X_n)$ est un $n$-échantillon du modèle $(\mathsf{X},\mathcal{X},\mathcal{C})$ ».

### Proposition (non numérotée, formule (1)) — Densité du $n$-échantillon dominé
**Source :** Poly ch.1, §1.7, formule (1), p. 18
**Hypothèses :** $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\ \theta\in\Theta\})$ paramétrique, dominé par une mesure $\sigma$-finie $\mu$ ; $\mathbb{Q}_\theta=q_\theta(\cdot)\cdot\mu$.
**Énoncé :** pour tout $\theta\in\Theta$, la loi produit $\mathbb{P}_\theta=\mathbb{Q}_\theta^{\otimes n}$ est dominée par $\mu^{\otimes n}$ et admet pour densité
$$(x_1,\dots,x_n)\mapsto p_\theta(x_1,\dots,x_n):=\prod_{i=1}^nq_\theta(x_i).\tag{1}$$
**Preuve (étapes) :** non détaillée dans le poly ; elle découle de Fubini–Tonelli sur les pavés comme dans l'Ex. 1.10 (puis extension à $\mathcal{X}^{\otimes n}$ par unicité de la mesure produit).
**Intuition :** densité du $n$-échantillon = produit des densités — formule de base de la **vraisemblance** (chapitre 2).
Les modèles de translation et d'échelle, archétypes de $n$-échantillons dominés, sont étudiés dans l'Exercice 3 (PC1).

### Définition (non numérotée) — Estimateur
**Source :** Poly ch.1, §1.8, p. 18
**Hypothèses :** modèle paramétrique.
**Énoncé :** un **estimateur** est une **statistique à valeurs dans $\Theta$** (ou dans un espace contenant $\Theta$), destinée à approcher le paramètre inconnu. (Méthodes systématiques — moments, maximum de vraisemblance — au chapitre suivant.)
**Intuition :** dès maintenant, on peut « proposer » des estimateurs.
**Pièges / erreurs classiques :** un estimateur ne peut pas dépendre de $\theta$ (c'est une statistique).

### Exemple (non numéroté) — Estimation du paramètre d'une Bernoulli
**Source :** Poly ch.1, §1.8, p. 18
**Hypothèses :** $n$-échantillon $(X_1,\dots,X_n)$ du modèle $\big(\{0,1\},\mathcal{P}(\{0,1\}),\{\mathcal{B}\mathrm{er}(\theta),\ \theta\in[0,1]\}\big)$.
**Énoncé :** sous $\mathbb{P}_\theta$, $\mathbb{E}_\theta[X_1]=\theta$ ; on considère
$$\hat\theta_n:=\bar X_n=\frac1n\sum_{i=1}^nX_i.$$
On a $\mathbb{E}_\theta[\hat\theta_n]=\theta$ : l'estimateur est **sans biais**.
**Preuve (étapes) :** linéarité de l'espérance et $\mathbb{E}_\theta[X_i]=\theta$ pour tout $i$ (même loi).
**Intuition :** on remplace l'espérance théorique par la moyenne empirique (idée de la méthode des moments). La qualité (concentration, intervalles de confiance) sera quantifiée plus tard.
**Méthodes mobilisées :** méthode des moments (informelle) ; linéarité de l'espérance.

### Exemple (non numéroté) — Question sensible et réponses randomisées
**Source :** Poly ch.1, §1.8, p. 18–19
**Hypothèses :** question sensible (« avez-vous utilisé une IA alors que c'était interdit ? ») ; on ne peut pas observer $(X_1,\dots,X_n)$ directement (réponses biaisées). Protocole :
1. on pose la question sensible ;
2. chaque participant observe secrètement $U_i\sim\mathcal{B}\mathrm{er}(q)$, avec $q$ **connu** (ex. $q=0{,}75$), **indépendante** de $X_i$ ;
3. si $U_i=1$, il donne la vraie réponse ; si $U_i=0$, il répond l'opposé.
**Énoncé :** On observe les statistiques
$$\mathrm{RR}_i=U_iX_i+(1-U_i)(1-X_i),\qquad i=1,\dots,n.$$
Le modèle induit par $(\mathrm{RR}_1,\dots,\mathrm{RR}_n)$ est un $n$-échantillon du modèle
$$\Big(\{0,1\},\ \mathcal{P}(\{0,1\}),\ \big\{\mathcal{B}\mathrm{er}\big(\theta q+(1-\theta)(1-q)\big),\ \theta\in[0,1]\big\}\Big).$$
Sous le modèle induit, $\mathbb{E}_\theta[\mathrm{RR}_i]=\theta q+(1-\theta)(1-q)=\theta(2q-1)+1-q$, donc
$$\theta=\frac{\mathbb{E}_\theta[\mathrm{RR}_i]-(1-q)}{2q-1}.$$
On considère l'estimateur (dit **par la méthode des moments**)
$$\hat\theta_n:=\frac{\overline{\mathrm{RR}}_n-(1-q)}{2q-1},$$
que l'on peut de plus contraindre (*clipper*) à $[0,1]$. Pour $q=0{,}75$ : $\hat\theta_n=2(\overline{\mathrm{RR}}_n-0{,}25)$. On vérifie que $\mathbb{E}_\theta[\hat\theta_n]=\theta$ et
$$\mathrm{Var}_\theta(\hat\theta_n)=\frac{\mathrm{Var}_\theta(\mathrm{RR}_1)}{n\,(2q-1)^2}\ \ge\ \frac{q(1-q)}{n\,(2q-1)^2}.$$
Le prix de la confidentialité est une variance accrue (le facteur $(2q-1)^{-2}$ explose quand $q\to1/2$).
**Preuve (étapes) :** (le poly donne les résultats ; étapes explicitées)
1. $\mathrm{RR}_i\in\{0,1\}$ et $\mathbb{P}_\theta(\mathrm{RR}_i=1)=\mathbb{P}(U_i=1,X_i=1)+\mathbb{P}(U_i=0,X_i=0)=q\theta+(1-q)(1-\theta)$ (par indépendance de $U_i$ et $X_i$) : loi de Bernoulli.
2. Les $(U_i,X_i)$ étant i.i.d., les $\mathrm{RR}_i$ sont i.i.d. : $n$-échantillon.
3. Inversion de la relation affine en $\theta$ (possible ssi $q\ne1/2$) ; remplacement de l'espérance par la moyenne empirique (méthode des moments).
4. Sans biais : linéarité de l'espérance.
5. Variance : $\mathrm{Var}_\theta(\overline{\mathrm{RR}}_n)=\mathrm{Var}_\theta(\mathrm{RR}_1)/n$ (indépendance), puis division par $(2q-1)^2$.
6. Minoration : $\mathrm{Var}_\theta(\mathrm{RR}_1)=p(1-p)$ avec $p=\theta q+(1-\theta)(1-q)$ compris entre $\min(q,1-q)$ et $\max(q,1-q)$, donc $p(1-p)\ge q(1-q)$ (justification de l'extracteur ; le poly énonce l'inégalité sans détail).
**Intuition :** chaque répondant est protégé : un « oui » ne révèle pas sa vraie réponse. Mais en moyenne, le signal survit : la proportion de « oui » reste une fonction connue et inversible de $\theta$ (dès que $q\ne1/2$).
**Pièges / erreurs classiques :** $q=1/2$ rend le modèle **non identifiable** (la loi de $\mathrm{RR}_i$ est $\mathcal{B}\mathrm{er}(1/2)$ quel que soit $\theta$) ; l'estimateur non clippé peut sortir de $[0,1]$.
**Méthodes mobilisées :** modèle induit ; méthode des moments ; calcul d'espérance et de variance d'une moyenne i.i.d. ; arbitrage confidentialité/variance.

### Remarque (non numérotée) — §1.9 Rôle des théorèmes de Cochran et de Gosset
**Source :** Poly ch.1, §1.9, p. 19
**Énoncé :** Ces deux théorèmes sont « extrêmement utiles, voire fondamentaux, pour tous les exercices portant sur des modèles gaussiens ». Ce sont surtout des résultats de probabilité, placés dans le cours principal en raison de leur importance. Ils décrivent la loi des projections orthogonales d'un vecteur gaussien $\mathcal{N}(\mu,\sigma^2\mathrm{I}_n)$ ; outils de l'Exercice 3 (loi du couple $(S_n,K_n)$, par Gosset) et de l'Exercice 4 (régression linéaire gaussienne, par Cochran), réutilisés pour tout le modèle linéaire gaussien. Prérequis : vecteurs gaussiens, $\chi^2$, Student (Outils §2).

### Théorème 1.1 — Théorème de Cochran
**Source :** Poly ch.1, Théorème 1.1, p. 19 (Démonstration p. 20–21)
**Hypothèses :**
- $X$ vecteur aléatoire gaussien de $\mathbb{R}^n$ de loi $\mathcal{N}(\mu,\sigma^2\mathrm{I}_n)$, où $\mu\in\mathbb{R}^n$, $\sigma>0$, $\mathrm{I}_n$ identité de taille $n$ ;
- $F_1,\dots,F_m$ sous-espaces vectoriels de $\mathbb{R}^n$, **orthogonaux deux à deux** et de **somme $\mathbb{R}^n$** : $\mathbb{R}^n=F_1\oplus\dots\oplus F_m$ (somme orthogonale) ;
- $P_{F_i}$ matrice de la projection orthogonale sur $F_i$, $d_i=\dim F_i$, $d_1+\dots+d_m=n$.
**Énoncé :**
(i) les vecteurs aléatoires $P_{F_1}X,\dots,P_{F_m}X$ sont **indépendants** et de lois respectives $\mathcal{N}(P_{F_1}\mu,\sigma^2P_{F_1}),\dots,\mathcal{N}(P_{F_m}\mu,\sigma^2P_{F_m})$ ;
(ii) les variables aléatoires réelles $\|P_{F_1}(X-\mu)\|^2/\sigma^2,\dots,\|P_{F_m}(X-\mu)\|^2/\sigma^2$ sont **indépendantes** et de lois respectives $\chi^2(d_1),\dots,\chi^2(d_m)$.
Si l'un des $F_i$ est réduit à $\{0\}$, on convient que $\chi^2(0)$ désigne la masse de Dirac en $0$.
**Preuve (étapes) :** (le poly démontre la version générale)
1. *Base orthonormée adaptée.* Les $F_i$ étant deux à deux orthogonaux et de somme $\mathbb{R}^n$, la réunion de bases orthonormées de $F_1,\dots,F_m$ forme une base orthonormée $(u_1,\dots,u_n)$ de $\mathbb{R}^n$. Soit $I_i\subset\{1,\dots,n\}$ l'ensemble des indices des vecteurs de cette base appartenant à $F_i$ ($\mathrm{card}\,I_i=d_i$), et $U=[u_1,\dots,u_n]$ (matrice orthogonale : $U^\top U=UU^\top=\mathrm{I}_n$). La projection sur $F_i$ s'écrit $P_{F_i}=\sum_{j\in I_i}u_ju_j^\top$, i.e. $P_{F_i}x=\sum_{j\in I_i}(u_j^\top x)\,u_j$.
2. *Réduction au cas $\mathcal{N}(0,\mathrm{I}_n)$.* $Z:=(X-\mu)/\sigma\sim\mathcal{N}(0,\mathrm{I}_n)$ (**Proposition 2.4**, transformation affine). Puis $Y:=U^\top Z$, de coordonnées $Y_j=u_j^\top Z$ : $Y\sim\mathcal{N}(0,U^\top U)=\mathcal{N}(0,\mathrm{I}_n)$ (**Prop. 2.4**) ; donc, **par la Proposition 2.6** (décorrélation $\Leftrightarrow$ indépendance), $Y_1,\dots,Y_n$ sont indépendantes de loi $\mathcal{N}(0,1)$.
3. *Indépendance.* $P_{F_i}Z=\sum_{j\in I_i}Y_ju_j$ est fonction du bloc $(Y_j)_{j\in I_i}$. Les $I_i$ étant disjoints, les blocs sont mutuellement indépendants (**regroupement par paquets** de variables indépendantes) ; donc $P_{F_1}Z,\dots,P_{F_m}Z$ aussi, puis $P_{F_i}X=P_{F_i}\mu+\sigma P_{F_i}Z$ (fonctions mesurables). Cela prouve l'indépendance dans (i), et dans (ii) puisque $\|P_{F_i}(X-\mu)\|^2/\sigma^2=\|P_{F_i}Z\|^2$ est fonction de $P_{F_i}Z$.
4. *Lois.* $P_{F_i}X$ est l'image linéaire de $X$ : $P_{F_i}X\sim\mathcal{N}(P_{F_i}\mu,\sigma^2P_{F_i}\mathrm{I}_nP_{F_i}^\top)=\mathcal{N}(P_{F_i}\mu,\sigma^2P_{F_i})$ (**Prop. 2.4**, et $P_{F_i}$ **symétrique et idempotente**). Enfin, $(u_j)_{j\in I_i}$ orthonormée, donc **par Pythagore**
$$\frac{\|P_{F_i}(X-\mu)\|^2}{\sigma^2}=\|P_{F_i}Z\|^2=\Big\|\sum_{j\in I_i}Y_ju_j\Big\|^2=\sum_{j\in I_i}Y_j^2,$$
somme des carrés de $d_i$ variables indépendantes $\mathcal{N}(0,1)$ : loi $\chi^2(d_i)$ **par définition** (Déf. 11), et $\delta_0$ si $d_i=0$. $\square$
**Intuition :** si $F_1$ est engendré par les $d_1$ premiers vecteurs de la base canonique, $F_2$ par les $d_2$ suivants, etc., alors $P_{F_1}Z=(Z_1,\dots,Z_{d_1},0,\dots,0)$, etc. : le théorème dit seulement que des paquets disjoints de coordonnées indépendantes sont indépendants. Le cas général s'y ramène car la loi $\mathcal{N}(0,\mathrm{I}_n)$ est **invariante par rotation** : dans une base orthonormée adaptée, les nouvelles coordonnées sont encore i.i.d. $\mathcal{N}(0,1)$. (Animation du poly : nuage $\mathcal{N}(0,\mathrm{I}_2)$ et coordonnées après rotation, comparé au cas non isotrope.)
**Pièges / erreurs classiques :** l'hypothèse de covariance **isotrope** $\sigma^2\mathrm{I}_n$ est essentielle ; la loi du (ii) porte sur $X-\mu$ centré (voir Remarque (c)).
**Méthodes mobilisées :** base orthonormée adaptée ; invariance par rotation ; Prop. 2.4, 2.6 ; Pythagore ; définition du $\chi^2$.

### Théorème 1.2 — Théorème de Cochran (version simplifiée)
**Source :** Poly ch.1, Théorème 1.2, p. 19–20
**Hypothèses :** $X\sim\mathcal{N}(0_{\mathbb{R}^n},\mathrm{I}_n)$ ; $F$ sous-espace vectoriel de $\mathbb{R}^n$ de dimension $d$, $F^\perp$ son orthogonal ; $P_F$, $P_{F^\perp}$ les matrices des projections orthogonales.
**Énoncé :** $P_FX$ et $P_{F^\perp}X$ sont **indépendants**, de lois respectives $\mathcal{N}(0,P_F)$ et $\mathcal{N}(0,P_{F^\perp})$, et $\|P_FX\|^2$ et $\|P_{F^\perp}X\|^2$ sont indépendantes, de lois respectives $\chi^2(d)$ et $\chi^2(n-d)$.
**Preuve (étapes) :** c'est le cas particulier $m=2$, $\mu=0$, $\sigma=1$ du Th. 1.1. Elle lui est en fait **équivalente** : 1. on passe de $X\sim\mathcal{N}(\mu,\sigma^2\mathrm{I}_n)$ à $(X-\mu)/\sigma\sim\mathcal{N}(0,\mathrm{I}_n)$ par la Proposition 2.4 ; 2. on traite $m$ sous-espaces en appliquant la version simplifiée à $F_1$ et $F_1^\perp=F_2\oplus\dots\oplus F_m$, puis **par récurrence** dans $F_1^\perp$.
**Intuition :** la version à retenir pour la majorité des exercices.

### Remarque (non numérotée) — Sur le théorème de Cochran
**Source :** Poly ch.1, Remarque (a)(b)(c), p. 20
**Énoncé :**
(a) L'indépendance affirmée est l'**indépendance mutuelle** de la famille $(P_{F_1}X,\dots,P_{F_m}X)$ (et de même pour les normes), pas seulement deux à deux : la loi du $m$-uplet est la loi produit.
(b) Dès que $d_i<n$, la matrice $\sigma^2P_{F_i}$ est de rang $d_i<n$ : la loi $\mathcal{N}(P_{F_i}\mu,\sigma^2P_{F_i})$ est **dégénérée**, portée par le sous-espace affine $P_{F_i}\mu+F_i=F_i$, et **n'a pas de densité** sur $\mathbb{R}^n$. D'où l'utilité de la définition générale des vecteurs gaussiens (Déf. 10), qui n'exige pas de densité.
(c) Si $P_{F_i}\mu=0$, c'est-à-dire si $\mu\in F_i^\perp$, alors $\|P_{F_i}(X-\mu)\|^2=\|P_{F_i}X\|^2$ : c'est sous cette forme que (ii) est utilisé dans la preuve de Gosset.
**Pièges / erreurs classiques :** écrire « $\|P_FX\|^2/\sigma^2\sim\chi^2(d)$ » sans vérifier $P_F\mu=0$ (sinon c'est un $\chi^2$ **non centré**, cf. Remarque après Prop. 2.9).

### Théorème 1.3 — Théorème de Gosset
**Source :** Poly ch.1, Théorème 1.3, p. 21 (avec Démonstration)
**Hypothèses :** $n\ge2$, $\mu\in\mathbb{R}$, $\sigma^2>0$ ; $X_1,\dots,X_n$ i.i.d. de loi $\mathcal{N}(\mu,\sigma^2)$ ;
$$\bar X_n:=\frac1n\sum_{i=1}^nX_i,\qquad S_n^2:=\frac1{n-1}\sum_{i=1}^n\big(X_i-\bar X_n\big)^2,\qquad S_n=\sqrt{S_n^2}$$
(moyenne empirique, variance empirique **corrigée**).
**Énoncé :**
(i) $\bar X_n\sim\mathcal{N}(\mu,\sigma^2/n)$ ;
(ii) $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$ ;
(iii) les variables aléatoires $\bar X_n$ et $S_n^2$ sont **indépendantes** ;
(iv) la variable aléatoire $T_n:=\sqrt n\,\dfrac{\bar X_n-\mu}{S_n}$ suit la loi de Student $t(n-1)$.
**Preuve (étapes) :**
1. *Vecteur gaussien.* $X=(X_1,\dots,X_n)^\top$ : **par le Lemme 2.1 (ii)** (coordonnées gaussiennes indépendantes $\Rightarrow$ vecteur gaussien), $X\sim\mathcal{N}(\mu\mathbf{1}_n,\sigma^2\mathrm{I}_n)$, $\mathbf{1}_n=(1,\dots,1)^\top$.
2. *Décomposition.* On applique **Cochran (Th. 1.1)** à $\mathbb{R}^n=F\oplus F^\perp$ avec $F:=\mathbb{R}\mathbf{1}_n$ (dimension 1) et $F^\perp=\{x\in\mathbb{R}^n:\ x_1+\dots+x_n=0\}$ (dimension $n-1$). $P_F=\frac1n\mathbf{1}_n\mathbf{1}_n^\top$ (car $\mathbf{1}_n/\sqrt n$ est unitaire dans $F$), donc
$$P_FX=\bar X_n\mathbf{1}_n,\qquad P_{F^\perp}X=X-\bar X_n\mathbf{1}_n=\big(X_1-\bar X_n,\dots,X_n-\bar X_n\big)^\top,\qquad\|P_{F^\perp}X\|^2=(n-1)S_n^2.$$
Comme $\mu\mathbf{1}_n\in F$, $P_{F^\perp}(\mu\mathbf{1}_n)=0$, donc $P_{F^\perp}(X-\mu\mathbf{1}_n)=P_{F^\perp}X$.
3. *(iii)* Cochran : $P_FX$ et $P_{F^\perp}X$ indépendants ; or $\bar X_n=\frac1n\mathbf{1}_n^\top P_FX$ est fonction de $P_FX$ et $S_n^2=\|P_{F^\perp}X\|^2/(n-1)$ fonction de $P_{F^\perp}X$ : indépendantes.
4. *(ii)* Cochran (ii) : $\|P_{F^\perp}(X-\mu\mathbf{1}_n)\|^2/\sigma^2=(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$.
5. *(i)* $\bar X_n=\frac1n\mathbf{1}_n^\top X$ est une image linéaire de $X$ : **par la Prop. 2.4**, $\bar X_n\sim\mathcal{N}\big(\frac1n\mathbf{1}_n^\top\mu\mathbf{1}_n,\ \frac{\sigma^2}{n^2}\mathbf{1}_n^\top\mathrm{I}_n\mathbf{1}_n\big)=\mathcal{N}(\mu,\sigma^2/n)$.
6. *(iv)* Posons $G:=\sqrt n(\bar X_n-\mu)/\sigma$ et $Y:=(n-1)S_n^2/\sigma^2$. Par (i) $G\sim\mathcal{N}(0,1)$ ; par (ii) $Y\sim\chi^2(n-1)$ ; par (iii) $G$ et $Y$ sont indépendantes (fonctions de $\bar X_n$ et $S_n^2$). Or
$$T_n=\sqrt n\,\frac{\bar X_n-\mu}{S_n}=\frac{\sqrt n(\bar X_n-\mu)/\sigma}{\sqrt{S_n^2/\sigma^2}}=\frac{G}{\sqrt{Y/(n-1)}},$$
qui suit $t(n-1)$ **par définition de la loi de Student** (Déf. 12). $\square$
**Intuition :** la moyenne vit sur la droite $\mathbb{R}\mathbf{1}_n$, les résidus $X_i-\bar X_n$ vivent dans l'orthogonal (dimension $n-1$, d'où les $n-1$ degrés de liberté) ; l'orthogonalité + gaussianité donne l'indépendance. (Animation du poly : l'histogramme de $T_n$ ne suit $t(n-1)$ que pour un bruit gaussien, pas exponentiel ou uniforme.)
**Pièges / erreurs classiques :** $n-1$ et non $n$ degrés de liberté ; $S_n^2$ normalisée par $n-1$ ; le résultat (iii)–(iv) est **faux** hors du cas gaussien (Lukacs) ; $T_n$ n'est pas une statistique si $\mu$ inconnu (c'est un pivot).
**Méthodes mobilisées :** théorème de Cochran ; projection sur $\mathbb{R}\mathbf{1}_n$ ; transformation affine de vecteur gaussien ; définition de Student.

### Remarque (non numérotée) — Lien avec les Exercices 3 et 4 (PC1)
**Source :** Poly ch.1, p. 21
**Énoncé :** Dans l'Exercice 3, $S_n=\sum_{i=1}^nX_i$ et $K_n=\sum_{i=1}^n(X_i-n^{-1}S_n)^2$ s'écrivent $S_n=n\bar X_n$ et $K_n=(n-1)S_n^2$ avec les notations de Gosset (**attention** : dans l'exercice, $S_n$ désigne la **somme**, pas l'écart-type empirique) : Gosset donne directement la loi du couple $(S_n,K_n)$, donc le modèle induit. Dans l'Exercice 4, Cochran s'applique à la décomposition de $\mathbb{R}^n$ en l'image de la matrice des variables explicatives et son orthogonal.

### Remarque (non numérotée) — §1.10 En pratique : programme des exercices
**Source :** Poly ch.1, §1.10, p. 22
**Énoncé :** exercices traités en petite classe (PC 1) :

| Exercice | Notions du cours | Rappels de probabilités |
|---|---|---|
| Exo 1 – Un café pour commencer | Modélisation, estimation | Lois exponentielle et de Poisson |
| Exo 2 – Transformation de v.a. | Modèle induit | Fonction muette, changement de variable |
| Exo 3 – Translation et échelle | Modèle induit, th. de Gosset | Manipulation de lois, gaussiennes |
| Exo 4 – Régression gaussienne | Th. de Cochran | Manipulation de lois, gaussiennes |

L'exercice 4 sera poursuivi en PC 2. Exercices bonus : score de football, prix d'un actif financier, identifiabilité des mélanges. **Notions de probabilités clés à revoir** : variable aléatoire, mesure produit, indépendance, densité, théorème de transfert et fonction muette.

---

## 3. Outils mathématiques

> Section « 2. Les outils mathématiques » du poly (p. 23–34). Les éléments de théorie de la mesure sont développés dans l'annexe du polycopié (références « ?? » non résolues dans la source).

### Définition (non numérotée) — Tribu produit, mesure produit
**Source :** Poly ch.1, Outils, « Tribu produit, mesure produit », p. 23
**Hypothèses :** $(\mathsf{X},\mathcal{X})$, $(\mathsf{X}',\mathcal{X}')$ espaces mesurables ; $\mathbb{Q}$, $\mathbb{Q}'$ probabilités.
**Énoncé :** La **tribu produit** $\mathcal{X}\otimes\mathcal{X}'$ sur $\mathsf{X}\times\mathsf{X}'$ est la plus petite tribu contenant les pavés mesurables $A\times A'$, $A\in\mathcal{X}$, $A'\in\mathcal{X}'$. La **mesure produit** $\mathbb{Q}\otimes\mathbb{Q}'$ est définie par
$$\mathbb{Q}\otimes\mathbb{Q}'(A\times A'):=\mathbb{Q}(A)\,\mathbb{Q}'(A').$$
On note $\mathbb{Q}^{\otimes n}$ le produit de $n$ copies de $\mathbb{Q}$.
**Preuve (étapes) :** existence/unicité admises (annexe).
**Intuition :** formalise l'indépendance de deux expériences.

### Définition 7 — Produit de modèles statistiques
**Source :** Poly ch.1, Outils, Définition 7, p. 23
**Hypothèses :** $(\mathsf{X},\mathcal{X},\mathcal{C})$ et $(\mathsf{X}',\mathcal{X}',\mathcal{C}')$ modèles statistiques ; $\mathsf{Z}:=\mathsf{X}\times\mathsf{X}'$, $z=(x,x')$, $\mathcal{Z}:=\mathcal{X}\otimes\mathcal{X}'$.
**Énoncé :** Le **produit** de ces deux modèles, noté $(\mathsf{X},\mathcal{X},\mathcal{C})\otimes(\mathsf{X}',\mathcal{X}',\mathcal{C}')$, est le modèle $(\mathsf{X}\times\mathsf{X}',\ \mathcal{X}\otimes\mathcal{X}',\ \mathcal{C}\otimes\mathcal{C}')$ où
$$\mathcal{C}\otimes\mathcal{C}':=\{\mathbb{P}=\mathbb{Q}\otimes\mathbb{Q}',\ \mathbb{Q}\in\mathcal{C},\ \mathbb{Q}'\in\mathcal{C}'\}.$$
Avec $X(x,x')=x$ et $X'(x,x')=x'$, pour tout $\mathbb{P}=\mathbb{Q}\otimes\mathbb{Q}'$ et $(A,A')\in\mathcal{X}\times\mathcal{X}'$ :
$$\mathbb{P}^{X,X'}(A\times A')=\mathbb{P}(X\in A,X'\in A')=\mathbb{Q}\otimes\mathbb{Q}'(A\times A')=\mathbb{Q}(A)\mathbb{Q}'(A')=\mathbb{P}(X\in A)\,\mathbb{P}(X'\in A').$$
Les statistiques $X$ et $X'$ sont donc **indépendantes** ; les modèles induits par $X$ et $X'$ sont respectivement $(\mathsf{X},\mathcal{X},\mathcal{C})$ et $(\mathsf{X}',\mathcal{X}',\mathcal{C}')$.
**Preuve (étapes) :** 1. définition de la loi jointe ; 2. définition de la mesure produit sur les pavés ; 3. marginales en prenant $A'=\mathsf{X}'$ ou $A=\mathsf{X}$.
**Intuition :** considérer des produits de modèles = étudier des systèmes d'observations indépendantes.

### Remarque (non numérotée) — $n$-échantillon $\ne$ produit de $n$ modèles
**Source :** Poly ch.1, Outils, p. 23
**Énoncé :** Le $n$-échantillon $(\mathsf{X},\mathcal{X},\mathcal{C})^n$ n'est **pas (en général)** égal au produit des expériences. Pour $n=2$ :
$$(\mathsf{X},\mathcal{X},\mathcal{C})\otimes(\mathsf{X},\mathcal{X},\mathcal{C})=\big(\mathsf{X}^2,\mathcal{X}^{\otimes2},\{\mathbb{Q}\otimes\mathbb{Q}',\ \mathbb{Q}\in\mathcal{C},\ \mathbb{Q}'\in\mathcal{C}\}\big)$$
alors que
$$(\mathsf{X},\mathcal{X},\mathcal{C})^2=\big(\mathsf{X}^2,\mathcal{X}^{\otimes2},\{\mathbb{Q}^{\otimes2},\ \mathbb{Q}\in\mathcal{C}\}\big).$$
**Intuition :** dans le produit, les deux coordonnées peuvent suivre des lois **différentes** de la famille ; dans le $n$-échantillon, c'est la **même** loi répétée. Le $n$-échantillon est une sous-famille (une « diagonale ») du modèle produit.
**Pièges / erreurs classiques :** question courte n° 6 : « le $n$-échantillon coïncide en général avec le produit de $n$ copies » est **faux**.

### Méthode (non numérotée) — Transfert, fonction muette
**Source :** Poly ch.1, Outils, « Transfert, fonction muette, changement de variables », p. 23
**Hypothèses :** $T$ statistique sur $(\mathsf{Z},\mathcal{Z},\mathbb{P})$ à valeurs dans $\mathsf{T}$ ; $h$ mesurable positive sur $\mathsf{T}$.
**Énoncé :** (théorème de transfert)
$$\int_{\mathsf{T}}h(t)\,\mathbb{P}^T(\mathrm{d}t)=\int_{\mathsf{Z}}h\circ T(z)\,\mathbb{P}(\mathrm{d}z)=\mathbb{E}[h(T)].$$
**Méthode de la fonction muette :** si l'on trouve une mesure $\nu$ et une fonction $q\ge0$ telles que $\mathbb{E}[h(T)]=\int h\,q\,\mathrm{d}\nu$ **pour toute fonction muette $h$**, alors $\mathbb{P}^T=q\cdot\nu$.
**Intuition :** on identifie une loi en calculant $\mathbb{E}[h(T)]$ pour toute $h$, puis en reconnaissant une densité. Pour une transformation régulière d'une variable à densité, cela donne la formule du changement de variables.
**Méthodes mobilisées :** fonction muette (méthode centrale pour calculer les modèles induits).

### Proposition 2.1 — Changement de variable, dimension 1
**Source :** Poly ch.1, Outils, Proposition 2.1, p. 24
**Hypothèses :** $I$ intervalle ouvert de $\mathbb{R}$ ; $X$ v.a. réelle de loi $p\cdot\mathrm{Leb}$ avec $\int_Ip\,\mathrm{dLeb}=1$ ; $\phi:I\to\mathbb{R}$ de classe $\mathcal{C}^1$ avec $\phi'(x)\ne0$ pour tout $x\in I$.
**Énoncé :** $\phi$ est strictement monotone, $J:=\phi(I)$ est un intervalle ouvert, $\phi^{-1}:J\to I$ est $\mathcal{C}^1$, et la loi de $Y:=\phi(X)$ est $q\cdot\mathrm{Leb}$ avec
$$q(y)=\mathbb{1}_J(y)\,p\big(\phi^{-1}(y)\big)\,\big\lvert(\phi^{-1})'(y)\big\rvert=\mathbb{1}_J(y)\,\frac{p\big(\phi^{-1}(y)\big)}{\big\lvert\phi'\big(\phi^{-1}(y)\big)\big\rvert}.$$
**Preuve (étapes) :**
1. Soit $h$ mesurable positive. **Par le théorème de transfert**, $\mathbb{E}[h(\phi(X))]=\int_Ih(\phi(x))p(x)\,\mathrm{d}x$.
2. $\phi$ est un $\mathcal{C}^1$-difféomorphisme de $I$ sur $J$ ; **changement de variable** dans l'intégrale de Lebesgue ($x=\phi^{-1}(y)$, $\mathrm{d}x=\lvert(\phi^{-1})'(y)\rvert\,\mathrm{d}y$) : $\mathbb{E}[h(Y)]=\int_Jh(y)\,p(\phi^{-1}(y))\,\lvert(\phi^{-1})'(y)\rvert\,\mathrm{d}y$ pour toute $h$ : cela identifie la densité (**fonction muette**).
3. $(\phi^{-1})'(y)=1/\phi'(\phi^{-1}(y))$ en dérivant $\phi\circ\phi^{-1}=\mathrm{id}_J$. $\square$
**Intuition :** la densité se transporte en tenant compte de la dilatation locale $\lvert(\phi^{-1})'\rvert$.
**Pièges / erreurs classiques :** oublier la valeur absolue ou l'indicatrice du support $J$.

### Exemple 2.1 — Translation et échelle
**Source :** Poly ch.1, Outils, Exemple 2.1, p. 24
**Hypothèses :** $X$ de densité $p$ sur $\mathbb{R}$ ; $\phi(x)=a+bx$, $b\ne0$.
**Énoncé :** $\phi^{-1}(y)=(y-a)/b$ et $Y=a+bX$ a pour densité
$$q(y)=\frac1{\lvert b\rvert}\,p\Big(\frac{y-a}{b}\Big).$$
C'est le calcul de l'Exercice 2 (PC1), coordonnée par coordonnée ; pour $X\sim\mathcal{N}(0,1)$, on retrouve la densité de $\mathcal{N}(a,b^2)$.
**Preuve (étapes) :** application directe de la Prop. 2.1 avec $\lvert(\phi^{-1})'\rvert=1/\lvert b\rvert$.
**Méthodes mobilisées :** changement de variable affine.

### Exemple 2.2 — Une transformation non injective
**Source :** Poly ch.1, Outils, Exemple 2.2, p. 24
**Hypothèses :** $X\sim\mathcal{N}(0,1)$, $\phi(x)=x^2$ (non injective).
**Énoncé :** on découpe $I$ en morceaux sur lesquels $\phi$ est injective et on somme les contributions. Les deux branches $x=\pm\sqrt y$ donnent, pour $y>0$,
$$q(y)=2\times\frac1{2\sqrt y}\,\frac1{\sqrt{2\pi}}e^{-y/2}=\frac1{\sqrt{2\pi y}}e^{-y/2},$$
densité de $\chi^2(1)=\mathrm{Gamma}(1/2,1/2)$.
**Preuve (étapes) :** 1. Sur $]0,+\infty[$ et $]-\infty,0[$, $\phi$ est un difféomorphisme sur $]0,+\infty[$ ; 2. Prop. 2.1 sur chaque branche ($\lvert(\phi^{-1})'(y)\rvert=1/(2\sqrt y)$) ; 3. somme des deux contributions égales (parité de la densité gaussienne).
**Méthodes mobilisées :** changement de variable par morceaux ; symétrie.

### Proposition 2.2 — Changement de variables, dimension $k$
**Source :** Poly ch.1, Outils, Proposition 2.2, p. 24–25 (même énoncé que le « Rappel » de l'Exercice 2)
**Hypothèses :** $O$ ouvert de $\mathbb{R}^k$ ; $p\cdot\mathrm{Leb}^{\otimes k}$ loi sur $\mathbb{R}^k$ avec $\int_Op\,\mathrm{dLeb}^{\otimes k}=1$ ; $\phi:O\to\mathbb{R}^k$ continûment différentiable, injective sur $O$, de jacobien ne s'annulant pas sur $O$ (de façon équivalente, $\phi$ est un $\mathcal{C}^1$-difféomorphisme de $O$ sur $\phi(O)$) ; $X\sim p\cdot\mathrm{Leb}^{\otimes k}$.
**Énoncé :** la loi de $\phi(X)$ est $q\cdot\mathrm{Leb}^{\otimes k}$ avec
$$q(u)=\mathbb{1}_{\phi(O)}(u)\,p\big(\phi^{-1}(u)\big)\,\big\lvert\mathrm{Det}\,J_{\phi^{-1}}(u)\big\rvert,$$
$J_\psi$ désignant la matrice jacobienne. Lorsque $\phi$ est un $\mathcal{C}^1$-difféomorphisme, $J_\phi(\phi^{-1}(u))\,J_{\phi^{-1}}(u)=\mathrm{I}$ entraîne
$$\mathrm{Det}\,J_{\phi^{-1}}(u)=\frac1{\mathrm{Det}\,J_\phi\big(\phi^{-1}(u)\big)}.$$
**Preuve (étapes) :** même preuve qu'en dimension 1 : 1. **théorème de transfert** ; 2. **formule du changement de variables dans les intégrales multiples** :
$$\int_Oh(\phi(x))\,p(x)\,\mathrm{d}x=\int_{\phi(O)}h(u)\,p(\phi^{-1}(u))\,\lvert\mathrm{Det}\,J_{\phi^{-1}}(u)\rvert\,\mathrm{d}u$$
pour toute fonction muette $h$ ; 3. identification.
**Intuition :** le jacobien mesure la dilatation locale des volumes.

### Exemple 2.3 — Transformation affine de $\mathbb{R}^k$
**Source :** Poly ch.1, Outils, Exemple 2.3, p. 25
**Hypothèses :** $\phi(x)=Ax+b$, $A$ matrice $k\times k$ inversible, $b\in\mathbb{R}^k$.
**Énoncé :** $\phi^{-1}(u)=A^{-1}(u-b)$, $J_{\phi^{-1}}=A^{-1}$ et
$$q(u)=\frac1{\lvert\mathrm{Det}\,A\rvert}\,p\big(A^{-1}(u-b)\big).$$
Pour $A=\mathrm{diag}(b_1,\dots,b_k)$ : produit des formules de translation-échelle (Exercice 2) ; pour $X\sim\mathcal{N}(0,\mathrm{I}_k)$, c'est ce calcul qui donne la densité de $\mathcal{N}(b,AA^\top)$.
**Preuve (étapes) :** Prop. 2.2 avec $\mathrm{Det}\,A^{-1}=1/\mathrm{Det}\,A$.

### Rappel (non numéroté) — Lois usuelles utilisées cette semaine
**Source :** Poly ch.1, Outils, p. 25
**Énoncé :**
- **Bernoulli** $\mathcal{B}\mathrm{er}(\theta)$ sur $\{0,1\}$, $\mathbb{P}(\{1\})=\theta$ ; **Binomiale** $\mathrm{Bin}(n,\theta)$ sur $\{0,\dots,n\}$, $\mathbb{P}(\{k\})=\binom nk\theta^k(1-\theta)^{n-k}$.
- **Gaussienne** $\mathcal{N}(\mu,\sigma^2)$ sur $\mathbb{R}$, densité $(2\pi\sigma^2)^{-1/2}\exp(-(x-\mu)^2/(2\sigma^2))$.
- **Exponentielle** de paramètre $\lambda>0$ : densité $\lambda e^{-\lambda x}\mathbb{1}_{\mathbb{R}_+}(x)$, moyenne $\lambda^{-1}$. **Absence de mémoire** : pour tous $a,b>0$, $\mathbb{P}_\lambda(X\ge a+b\mid X\ge a)=\mathbb{P}_\lambda(X\ge b)$.
- **Gamma** : pour $p>0$, $\mathrm{Gamma}(p)$ (réduite) a pour densité $f_p(x)=\frac1{\Gamma(p)}e^{-x}x^{p-1}$, $x>0$. Pour $\lambda>0$, $\mathrm{Gamma}(p,\lambda)$ est la loi de $Z/\lambda$ où $Z\sim\mathrm{Gamma}(p)$, de densité $f_{p,\lambda}(x)=\frac{\lambda^p}{\Gamma(p)}e^{-\lambda x}x^{p-1}$, $x>0$. L'exponentielle de paramètre $\lambda$ est $\mathrm{Gamma}(1,\lambda)$. **Additivité** : si $X_1,\dots,X_n$ indépendantes de lois $\mathrm{Gamma}(p_i,\lambda)$, alors $\sum_{i=1}^nX_i\sim\mathrm{Gamma}(\sum_{i=1}^np_i,\lambda)$.
- **Poisson** de paramètre $\lambda>0$ sur $\mathbb{N}$, densité $p_\lambda(k)=e^{-\lambda}\lambda^k/k!$ par rapport à la mesure de comptage ; moyenne et variance $\lambda$ ; la somme de deux Poisson indépendantes de paramètres $\lambda_1,\lambda_2$ suit $\mathcal{P}\mathrm{oi}(\lambda_1+\lambda_2)$ (Exercice 5).
**Pièges / erreurs classiques :** paramétrisation **par l'intensité** $\lambda$ (et non l'échelle) pour l'exponentielle et la Gamma.

### Définition 8 — Loi gaussienne réduite
**Source :** Poly ch.1, Outils, Définition 8, p. 25–26
**Hypothèses :** $X$ v.a. réelle.
**Énoncé :** $X\sim\mathcal{N}(0,1)$ (**gaussienne centrée réduite**) si sa loi admet pour densité par rapport à la mesure de Lebesgue
$$g(x)=\frac1{\sqrt{2\pi}}\exp\Big(-\frac{x^2}2\Big),\qquad x\in\mathbb{R}.$$
Sa fonction caractéristique vaut $\varphi(t)=\mathbb{E}[e^{itX}]=\exp(-t^2/2)$, $t\in\mathbb{R}$. Moments : moments impairs nuls et, pour $k\in\mathbb{N}$,
$$\mathbb{E}\big[X^{2k}\big]=\frac{(2k)!}{2^kk!}=1\times3\times5\times\dots\times(2k-1);$$
en particulier $\mathbb{E}[X]=0$, $\mathbb{E}[X^2]=1$, $\mathbb{E}[X^4]=3$.
**Preuve (étapes) :** 1. $\varphi$ est dérivable (**dérivation sous le signe intégral**) ; 2. **intégration par parties** avec $xg(x)=-g'(x)$ : $\varphi'(t)=-t\varphi(t)$, $\varphi(0)=1$, d'où $\varphi(t)=e^{-t^2/2}$ ; 3. $X$ a des moments de tous ordres et $\varphi^{(k)}(0)=i^k\mathbb{E}[X^k]$ ; le **développement en série entière** $\varphi(t)=\sum_{k\ge0}(-1)^kt^{2k}/(2^kk!)$ donne les moments par identification.
**Intuition :** tous les calculs gaussiens découlent de $\varphi$.

### Définition 9 — Loi gaussienne $\mathcal{N}(\mu,\sigma^2)$
**Source :** Poly ch.1, Outils, Définition 9, p. 26
**Hypothèses :** $\mu\in\mathbb{R}$, $\sigma^2\ge0$.
**Énoncé :** $X$ suit $\mathcal{N}(\mu,\sigma^2)$ si elle a même loi que $\sigma X_r+\mu$, où $X_r\sim\mathcal{N}(0,1)$ et $\sigma=\sqrt{\sigma^2}\ge0$. Alors $\mathbb{E}[X]=\mu$, $\mathrm{Var}(X)=\sigma^2$.
Convention du cours : $\sigma^2=0$ autorisé, $\mathcal{N}(\mu,0)=\delta_\mu$ (**gaussienne dégénérée**). La densité n'existe que pour $\sigma^2>0$ :
$$g_{\mu,\sigma^2}(x)=\frac1{\sigma\sqrt{2\pi}}\exp\Big(-\frac{(x-\mu)^2}{2\sigma^2}\Big),\qquad x\in\mathbb{R}$$
(changement de variables appliqué à $x\mapsto\sigma x+\mu$) ; pour $\sigma^2=0$, $\delta_\mu$ n'est pas absolument continue par rapport à $\mathrm{Leb}$. Dans tous les cas,
$$\varphi_{\mu,\sigma^2}(t)=\mathbb{E}\big[e^{it(\sigma X_r+\mu)}\big]=e^{i\mu t}\varphi(\sigma t)=\exp\Big(i\mu t-\frac{\sigma^2t^2}2\Big),\qquad t\in\mathbb{R}.$$
**Preuve (étapes) :** linéarité de l'espérance ; Ex. 2.1 pour la densité ; calcul direct pour $\varphi$.
**Intuition :** définir la gaussienne par transformation affine permet d'inclure le cas dégénéré.

### Lemme 2.1 — Stabilité de la famille gaussienne
**Source :** Poly ch.1, Outils, Lemme 2.1, p. 26
**Hypothèses :** (i) $X\sim\mathcal{N}(\mu,\sigma^2)$, $a,b\in\mathbb{R}$ ; (ii) $X_1,\dots,X_n$ **indépendantes**, $X_j\sim\mathcal{N}(\mu_j,\sigma_j^2)$.
**Énoncé :**
(i) $aX+b\sim\mathcal{N}(a\mu+b,a^2\sigma^2)$ ;
(ii) $X_1+\dots+X_n\sim\mathcal{N}(\mu_1+\dots+\mu_n,\sigma_1^2+\dots+\sigma_n^2)$.
**Preuve (étapes) :**
1. (i) $\mathbb{E}[e^{it(aX+b)}]=e^{itb}\varphi_{\mu,\sigma^2}(at)=\exp\big(i(a\mu+b)t-a^2\sigma^2t^2/2\big)$ : f.c. de $\mathcal{N}(a\mu+b,a^2\sigma^2)$.
2. (ii) **Par indépendance**, $\mathbb{E}[e^{it(X_1+\dots+X_n)}]=\prod_{j=1}^n\varphi_{\mu_j,\sigma_j^2}(t)=\exp\big(it\sum_j\mu_j-t^2\sum_j\sigma_j^2/2\big)$.
3. Dans les deux cas : **la fonction caractéristique caractérise la loi**. $\square$
**Pièges / erreurs classiques :** (ii) exige l'**indépendance**.

### Définition 10 — Vecteur gaussien
**Source :** Poly ch.1, Outils, Définition 10, p. 26–27
**Hypothèses :** $X=(X_1,\dots,X_n)^\top$ vecteur aléatoire de $\mathbb{R}^n$.
**Énoncé :** $X$ est **gaussien** si, pour tout $t=(t_1,\dots,t_n)^\top\in\mathbb{R}^n$, la v.a. réelle $t^\top X=\sum_{j=1}^nt_jX_j$ est gaussienne, **éventuellement dégénérée**.
Conséquences (p. 26–27) : chaque $X_i=e_i^\top X$ est gaussienne donc de carré intégrable ; on définit $\mu:=\mathbb{E}[X]=(\mathbb{E}[X_1],\dots,\mathbb{E}[X_n])^\top$ et $\Sigma:=\big(\mathrm{Cov}(X_i,X_j)\big)_{1\le i,j\le n}=\mathbb{E}\big[(X-\mu)(X-\mu)^\top\big]$. Par linéarité,
$$\mathbb{E}[t^\top X]=t^\top\mu,\qquad\mathrm{Var}(t^\top X)=\sum_{i,j=1}^nt_it_j\mathrm{Cov}(X_i,X_j)=t^\top\Sigma t,$$
donc $t^\top X\sim\mathcal{N}(t^\top\mu,t^\top\Sigma t)$. $\Sigma$ est symétrique semi-définie positive ($t^\top\Sigma t=\mathrm{Var}(t^\top X)\ge0$), pas nécessairement inversible. On note $X\sim\mathcal{N}(\mu,\Sigma)$.
D'après le Lemme 2.1 (ii), **un vecteur à coordonnées gaussiennes indépendantes est gaussien** ; en particulier si $Z_1,\dots,Z_n$ i.i.d. $\mathcal{N}(0,1)$, $Z=(Z_1,\dots,Z_n)^\top\sim\mathcal{N}(0,\mathrm{I}_n)$. **Sans indépendance**, un vecteur à coordonnées gaussiennes n'est pas nécessairement gaussien (Remarque après Prop. 2.6).
**Intuition :** gaussien = toutes les projections unidimensionnelles sont gaussiennes.
**Pièges / erreurs classiques :** « chaque coordonnée gaussienne » $\not\Rightarrow$ « vecteur gaussien ».

### Proposition 2.3 — Fonction caractéristique d'un vecteur gaussien
**Source :** Poly ch.1, Outils, Proposition 2.3, p. 27
**Hypothèses :** $\mu\in\mathbb{R}^n$ ; $\Sigma$ symétrique semi-définie positive $n\times n$ ; $X$ vecteur aléatoire de $\mathbb{R}^n$.
**Énoncé :** $X\sim\mathcal{N}(\mu,\Sigma)$ si et seulement si, pour tout $t\in\mathbb{R}^n$,
$$\mathbb{E}\big[e^{i\,t^\top X}\big]=\exp\Big(i\,t^\top\mu-\frac12t^\top\Sigma t\Big).$$
En particulier, la loi d'un vecteur gaussien est entièrement déterminée par son espérance et sa matrice de covariance.
**Preuve (étapes) :**
1. ($\Rightarrow$) $t^\top X\sim\mathcal{N}(t^\top\mu,t^\top\Sigma t)$ ; on évalue en $1$ la f.c. de cette loi réelle : $\mathbb{E}[e^{it^\top X}]=\varphi_{t^\top\mu,t^\top\Sigma t}(1)$.
2. ($\Leftarrow$) Appliquer la formule au vecteur $ut$, $u\in\mathbb{R}$ : $\mathbb{E}[e^{iu(t^\top X)}]=\exp(iu\,t^\top\mu-\frac{u^2}2t^\top\Sigma t)$, f.c. de $\mathcal{N}(t^\top\mu,t^\top\Sigma t)$ ; donc $t^\top X$ est gaussienne pour tout $t$ : $X$ est gaussien.
3. $t=e_i$ donne $\mathbb{E}[X_i]=\mu_i$ ; si $\Sigma'$ est la covariance de $X$, $t^\top\Sigma't=\mathrm{Var}(t^\top X)=t^\top\Sigma t$ pour tout $t$, d'où $\Sigma'=\Sigma$ (prendre $t=e_i$ puis $t=e_i+e_j$, matrices symétriques).
4. La f.c. caractérisant la loi, deux vecteurs gaussiens de même $(\mu,\Sigma)$ ont même loi. $\square$

### Proposition 2.4 — Transformation affine d'un vecteur gaussien
**Source :** Poly ch.1, Outils, Proposition 2.4, p. 27
**Hypothèses :** $X\sim\mathcal{N}(\mu,\Sigma)$ vecteur gaussien de $\mathbb{R}^n$ ; $A$ matrice réelle $m\times n$ ; $b\in\mathbb{R}^m$.
**Énoncé :**
$$AX+b\sim\mathcal{N}\big(A\mu+b,\ A\Sigma A^\top\big).$$
**Preuve (étapes) :**
1. $Y=AX+b$ ; pour $s\in\mathbb{R}^m$, $s^\top Y=(A^\top s)^\top X+s^\top b$ est une transformation affine de la gaussienne $(A^\top s)^\top X$, donc gaussienne (**Lemme 2.1 (i)**) : $Y$ est gaussien.
2. **Linéarité de l'espérance** : $\mathbb{E}[Y]=A\mu+b$, et $\mathbb{E}\big[(Y-\mathbb{E}Y)(Y-\mathbb{E}Y)^\top\big]=\mathbb{E}\big[A(X-\mu)(X-\mu)^\top A^\top\big]=A\Sigma A^\top$. $\square$
**Pièges / erreurs classiques :** ordre des facteurs : la covariance de $AX+b$ est $A\Sigma A^\top$ (taille $m\times m$), **et non** $A^\top\Sigma A$.
**Méthodes mobilisées :** utilisée partout (Cochran, Gosset, réduction $(X-\mu)/\sigma$).

### Proposition 2.5 — Représentation d'un vecteur gaussien
**Source :** Poly ch.1, Outils, Proposition 2.5, p. 28
**Hypothèses :** $\mu\in\mathbb{R}^n$ ; $\Sigma$ symétrique semi-définie positive $n\times n$, de rang $k\ge1$.
**Énoncé :** Il existe une matrice $A$ de taille $n\times k$ telle que $AA^\top=\Sigma$, et pour toute telle matrice :
(i) si $Z\sim\mathcal{N}(0,\mathrm{I}_k)$, alors $AZ+\mu\sim\mathcal{N}(\mu,\Sigma)$ ;
(ii) si $X\sim\mathcal{N}(\mu,\Sigma)$, il existe $Z\sim\mathcal{N}(0,\mathrm{I}_k)$ tel que $X=AZ+\mu$ presque sûrement.
En particulier, la loi $\mathcal{N}(\mu,\Sigma)$ **existe** pour tout couple $(\mu,\Sigma)$ (le cas $\Sigma=0$ correspondant à $\delta_\mu$).
**Preuve (étapes) :**
1. *Existence de $A$* : **théorème spectral** : base orthonormée $(u_1,\dots,u_n)$ de vecteurs propres, valeurs propres $\lambda_1\ge\dots\ge\lambda_k>0=\lambda_{k+1}=\dots=\lambda_n$ ; $A=[\sqrt{\lambda_1}u_1,\dots,\sqrt{\lambda_k}u_k]$ vérifie $AA^\top=\sum_{j=1}^k\lambda_ju_ju_j^\top=\Sigma$.
2. *(i)* Prop. 2.4 : $AZ+\mu\sim\mathcal{N}(A0+\mu,A\mathrm{I}_kA^\top)=\mathcal{N}(\mu,\Sigma)$.
3. *(ii)* $AA^\top y=0\Rightarrow\|A^\top y\|^2=y^\top AA^\top y=0$ : $\Sigma$ et $A^\top$ ont même noyau, donc même rang $k$ ; $A$ est de rang $k$, injective. $A^\top Ax=0\Rightarrow\|Ax\|^2=0\Rightarrow x=0$ : $A^\top A$ ($k\times k$) inversible. On pose $A^\#:=(A^\top A)^{-1}A^\top$ ($A^\#A=\mathrm{I}_k$) et $Z:=A^\#(X-\mu)$. Par Prop. 2.4, $Z\sim\mathcal{N}(0,A^\#\Sigma(A^\#)^\top)=\mathcal{N}(0,(A^\#A)(A^\#A)^\top)=\mathcal{N}(0,\mathrm{I}_k)$.
4. *$AZ+\mu=X$ p.s.* : $P:=AA^\#=A(A^\top A)^{-1}A^\top$ est symétrique, $P^2=P$ : projection orthogonale sur $\mathrm{Im}(A)$ ; $AZ+\mu=P(X-\mu)+\mu$. Or $\mathrm{Im}(\Sigma)\subset\mathrm{Im}(A)$ et toutes deux de dimension $k$, donc $\mathrm{Im}(A)=\mathrm{Im}(\Sigma)=(\mathrm{Ker}\,\Sigma)^\perp$ ($\Sigma$ symétrique). Si $v\in\mathrm{Ker}\,\Sigma$, $v^\top(X-\mu)$ est centrée de variance $v^\top\Sigma v=0$ : nulle p.s. En l'appliquant à une base (finie) de $\mathrm{Ker}\,\Sigma$ : $X-\mu\in(\mathrm{Ker}\,\Sigma)^\perp=\mathrm{Im}(A)$ p.s., d'où $P(X-\mu)=X-\mu$ et $X=AZ+\mu$ p.s. $\square$
**Intuition :** tout vecteur gaussien est une image affine d'un vecteur gaussien standard de dimension égale au rang.

### Proposition 2.6 — Indépendance et décorrélation
**Source :** Poly ch.1, Outils, Proposition 2.6, p. 28–29
**Hypothèses :** $X\sim\mathcal{N}(\mu,\Sigma)$ vecteur gaussien de $\mathbb{R}^n$ ; $n=n_1+\dots+n_m$ (entiers $>0$) ; découpage $X=(X_{(1)}^\top,\dots,X_{(m)}^\top)^\top$, $\mu=(\mu_{(1)}^\top,\dots,\mu_{(m)}^\top)^\top$, $\Sigma=(\Sigma_{ij})_{1\le i,j\le m}$ par blocs, $\Sigma_{ij}=\mathbb{E}\big[(X_{(i)}-\mu_{(i)})(X_{(j)}-\mu_{(j)})^\top\big]$ de taille $n_i\times n_j$.
**Énoncé :** les sous-vecteurs $X_{(1)},\dots,X_{(m)}$ sont (mutuellement) **indépendants si et seulement si $\Sigma_{ij}=0$ pour tous $i\ne j$**.
**Preuve (étapes) :**
1. ($\Rightarrow$) Si indépendants, pour $i\ne j$, $\Sigma_{ij}=\mathbb{E}[X_{(i)}-\mu_{(i)}]\,\mathbb{E}[X_{(j)}-\mu_{(j)}]^\top=0$ (**par indépendance**).
2. ($\Leftarrow$) Pour $t=(t_{(1)}^\top,\dots,t_{(m)}^\top)^\top$ découpé de même : $t^\top\mu=\sum_it_{(i)}^\top\mu_{(i)}$ et $t^\top\Sigma t=\sum_it_{(i)}^\top\Sigma_{ii}t_{(i)}$ (blocs croisés nuls). Par la **Prop. 2.3** :
$$\mathbb{E}\big[e^{it^\top X}\big]=\prod_{i=1}^m\exp\Big(i\,t_{(i)}^\top\mu_{(i)}-\frac12t_{(i)}^\top\Sigma_{ii}t_{(i)}\Big)=\prod_{i=1}^m\mathbb{E}\big[e^{i\,t_{(i)}^\top X_{(i)}}\big],$$
la dernière égalité car $X_{(i)}\sim\mathcal{N}(\mu_{(i)},\Sigma_{ii})$ (**Prop. 2.4** avec la matrice d'extraction du bloc $i$).
3. La f.c. de $X$ est celle de la loi produit $P_1\otimes\dots\otimes P_m$ ; la **f.c. caractérise la loi** sur $\mathbb{R}^n$ : indépendance. $\square$
**Pièges / erreurs classiques :** voir la Remarque suivante.

### Remarque (non numérotée) — Contre-exemple : décorrélation sans indépendance
**Source :** Poly ch.1, Outils, Remarque après Prop. 2.6, p. 29
**Énoncé :** l'équivalence décorrélation/indépendance est **propre aux vecteurs gaussiens**. Soient $X\sim\mathcal{N}(0,1)$ et $\varepsilon$ indépendante de $X$ avec $\mathbb{P}(\varepsilon=1)=\mathbb{P}(\varepsilon=-1)=1/2$, et $Y=\varepsilon X$. Alors $Y\sim\mathcal{N}(0,1)$ (loi de $X$ symétrique), $\mathrm{Cov}(X,Y)=\mathbb{E}[\varepsilon]\mathbb{E}[X^2]=0$, mais $X$ et $Y$ ne sont **pas indépendantes** ($\lvert Y\rvert=\lvert X\rvert$). Le vecteur $(X,Y)$ n'est pas gaussien : $X+Y=(1+\varepsilon)X$ est nulle avec probabilité $1/2$ sans être p.s. constante, donc n'est ni dégénérée ni à densité.
**Méthodes mobilisées :** construction de contre-exemple ; symétrie.

### Corollaire 2.1 — Transformations linéaires indépendantes
**Source :** Poly ch.1, Outils, Corollaire 2.1, p. 29
**Hypothèses :** $\sigma>0$, $Z\sim\mathcal{N}(0,\sigma^2\mathrm{I}_n)$ ; $A_1$, $A_2$ matrices réelles $m_1\times n$ et $m_2\times n$ avec $A_1A_2^\top=0$.
**Énoncé :** le vecteur $(A_1Z,A_2Z)$ de $\mathbb{R}^{m_1+m_2}$ est gaussien et $A_1Z$, $A_2Z$ sont **indépendants**. En particulier, si $P_1$, $P_2$ sont deux matrices symétriques (par ex. deux projecteurs orthogonaux) telles que $P_1P_2=0$, alors $P_1Z$ et $P_2Z$ sont indépendants.
**Preuve (étapes) :**
1. $(A_1Z,A_2Z)=AZ$ avec $A=\begin{pmatrix}A_1\\A_2\end{pmatrix}$ ($(m_1+m_2)\times n$) : gaussien par **Prop. 2.4**, de covariance
$$\sigma^2AA^\top=\sigma^2\begin{pmatrix}A_1A_1^\top&A_1A_2^\top\\A_2A_1^\top&A_2A_2^\top\end{pmatrix}=\begin{pmatrix}\sigma^2A_1A_1^\top&0\\0&\sigma^2A_2A_2^\top\end{pmatrix}.$$
2. Blocs croisés nuls : **Prop. 2.6** conclut. 3. Pour des matrices symétriques, $P_1P_2^\top=P_1P_2$. $\square$
Forme équivalente : si $B_1$, $B_2$ ont $n$ lignes et $B_1^\top B_2=0$, alors $B_1^\top Z$ et $B_2^\top Z$ sont indépendants (prendre $A_i=B_i^\top$).

### Proposition 2.7 — Densité d'un vecteur gaussien
**Source :** Poly ch.1, Outils, Proposition 2.7, p. 29–30
**Hypothèses :** $\mu\in\mathbb{R}^n$ ; $\Sigma$ symétrique **définie positive** $n\times n$.
**Énoncé :** $\mathcal{N}(\mu,\Sigma)$ admet pour densité par rapport à $\mathrm{Leb}^{\otimes n}$
$$g_{\mu,\Sigma}(x)=\frac1{(2\pi)^{n/2}\sqrt{\det\Sigma}}\exp\Big(-\frac12(x-\mu)^\top\Sigma^{-1}(x-\mu)\Big),\qquad x\in\mathbb{R}^n.$$
**Preuve (étapes) :**
1. *Cas $\mu=0$, $\Sigma=\mathrm{I}_n$* : par **Prop. 2.6** (blocs de taille 1), les coordonnées de $Z\sim\mathcal{N}(0,\mathrm{I}_n)$ sont indépendantes $\mathcal{N}(0,1)$ ; loi produit $\mathcal{N}(0,1)^{\otimes n}$, de densité $\prod_ig(z_i)=(2\pi)^{-n/2}\exp(-\|z\|^2/2)$ (densité produit, comme en (1)).
2. *Cas général* : $\Sigma$ de rang $n$ ; **Prop. 2.5** fournit $A$ ($n\times n$) inversible avec $AA^\top=\Sigma$, et $X\overset{\mathcal{L}}{=}AZ+\mu$.
3. $\phi:z\mapsto Az+\mu$ est un $\mathcal{C}^1$-difféomorphisme de $\mathbb{R}^n$, $\phi^{-1}(x)=A^{-1}(x-\mu)$, jacobien constant $A^{-1}$ ; **changement de variables** : $q(x)=\frac1{\lvert\det A\rvert}(2\pi)^{-n/2}\exp\big(-\frac12\|A^{-1}(x-\mu)\|^2\big)$.
4. On conclut avec $\|A^{-1}(x-\mu)\|^2=(x-\mu)^\top(A^{-1})^\top A^{-1}(x-\mu)=(x-\mu)^\top(AA^\top)^{-1}(x-\mu)=(x-\mu)^\top\Sigma^{-1}(x-\mu)$ et $(\det A)^2=\det(AA^\top)=\det\Sigma$. $\square$
**Remarque du poly (p. 30) :** si $\Sigma$ est de rang $k<n$, $X-\mu$ prend p.s. ses valeurs dans $\mathrm{Im}(\Sigma)$ (dimension $k$, de mesure de Lebesgue nulle) : $\mathcal{N}(\mu,\Sigma)$ n'est pas absolument continue par rapport à $\mathrm{Leb}^{\otimes n}$, pas de densité (**loi dégénérée**) — cas des lois $\mathcal{N}(P_F\mu,\sigma^2P_F)$ de Cochran. Pour $\Sigma=\sigma^2\mathrm{I}_n$, on retrouve la densité produit de l'échantillon gaussien.
**Intuition :** les lignes de niveau de la densité sont des ellipses orientées selon les axes propres de $\Sigma$ (animation du poly, avec $\Gamma$ paramétrée par $\sigma_1,\sigma_2,\rho$).

### Rappel (non numéroté) — Fonction Gamma
**Source :** Poly ch.1, Outils, « Fonction Gamma, lois Gamma, du $\chi^2$ et de Student », p. 30
**Hypothèses :** $\alpha>0$.
**Énoncé :**
$$\Gamma(\alpha):=\int_0^{+\infty}y^{\alpha-1}e^{-y}\,\mathrm{d}y$$
converge et est $>0$. $\Gamma(1)=1$ ; pour $\alpha>1$, $\Gamma(\alpha)=(\alpha-1)\Gamma(\alpha-1)$ ; pour $n\ge1$ entier, $\Gamma(n)=(n-1)!$ ; $\Gamma(1/2)=\sqrt\pi$. $\Gamma(p)$ est la constante de normalisation de $f_p$.
**Preuve (étapes) :**
1. Convergence : au voisinage de $0$, intégrande $\sim y^{\alpha-1}$, intégrable car $\alpha>0$ ; à l'infini, la décroissance exponentielle l'emporte.
2. **Intégration par parties** : $\Gamma(\alpha)=\big[-y^{\alpha-1}e^{-y}\big]_0^{+\infty}+(\alpha-1)\int_0^{+\infty}y^{\alpha-2}e^{-y}\,\mathrm{d}y=(\alpha-1)\Gamma(\alpha-1)$.
3. **Récurrence** : $\Gamma(n)=(n-1)(n-2)\cdots1\cdot\Gamma(1)=(n-1)!$.
4. Changement de variable $y=x^2/2$ : $\Gamma(1/2)=\sqrt2\int_0^{+\infty}e^{-x^2/2}\,\mathrm{d}x=\sqrt2\cdot\sqrt{2\pi}/2=\sqrt\pi$ (densité gaussienne réduite).

### Rappel (non numéroté) — Moments et fonction caractéristique des lois Gamma
**Source :** Poly ch.1, Outils, p. 30–31
**Hypothèses :** $Z\sim\mathrm{Gamma}(p)$, $p>0$ ; $X=Z/\lambda\sim\mathrm{Gamma}(p,\lambda)$.
**Énoncé :** pour tout réel $r>-p$,
$$\mathbb{E}[Z^r]=\frac1{\Gamma(p)}\int_0^{+\infty}x^{r+p-1}e^{-x}\,\mathrm{d}x=\frac{\Gamma(p+r)}{\Gamma(p)},$$
et $\mathbb{E}[Z^r]=+\infty$ si $r\le-p$. En particulier $\mathbb{E}[Z]=p$, $\mathbb{E}[Z^2]=p(p+1)$, $\mathrm{Var}(Z)=p$. Pour $X$ : $\mathbb{E}[X^r]=\lambda^{-r}\Gamma(p+r)/\Gamma(p)$ ; $\mathbb{E}[X]=p/\lambda$, $\mathrm{Var}(X)=p/\lambda^2$ et, pour $p>1$, $\mathbb{E}[1/X]=\lambda/(p-1)$.
*Application (p. 31)* : pour l'estimateur $\hat\theta_{n,1}=1/\bar X_n$ du modèle exponentiel (Compléments) : sous $\mathbb{P}_\theta$, $\sum_{i=1}^nX_i\sim\mathrm{Gamma}(n,\theta)$ et $\mathbb{E}_\theta[\hat\theta_{n,1}]=n\theta\,\Gamma(n-1)/\Gamma(n)=\frac n{n-1}\theta$.
Fonction caractéristique :
$$\phi_{p,\lambda}(t)=\mathbb{E}\big[e^{itX}\big]=\Big(1-\frac{it}\lambda\Big)^{-p},\qquad t\in\mathbb{R},$$
(détermination principale du logarithme, $\mathrm{Re}(1-it/\lambda)>0$).
**Preuve (étapes) :**
1. Pour $s<\lambda$ réel : $\mathbb{E}[e^{sX}]=\frac{\lambda^p}{\Gamma(p)}\int_0^{+\infty}x^{p-1}e^{-(\lambda-s)x}\,\mathrm{d}x=(1-s/\lambda)^{-p}$ (**changement de variable** $u=(\lambda-s)x$).
2. Les deux membres sont **holomorphes** en $s$ sur $\{\mathrm{Re}(s)<\lambda\}$ et coïncident sur un segment réel : ils coïncident sur tout le demi-plan (prolongement analytique), en particulier en $s=it$.
3. *Additivité* : si $X_1,\dots,X_n$ indépendantes $\mathrm{Gamma}(p_i,\lambda)$, la f.c. de la somme est $\prod_i(1-it/\lambda)^{-p_i}=(1-it/\lambda)^{-\sum_ip_i}$ (**par indépendance**), f.c. de $\mathrm{Gamma}(\sum_ip_i,\lambda)$.

### Définition 11 — Loi du $\chi^2$ à $\nu$ degrés de liberté
**Source :** Poly ch.1, Outils, Définition 11, p. 31
**Hypothèses :** $\nu\in\mathbb{N}^\ast$ ; $X_1,\dots,X_\nu$ indépendantes de loi $\mathcal{N}(0,1)$.
**Énoncé :** la loi de
$$U=\sum_{i=1}^\nu X_i^2$$
est appelée **loi du $\chi^2$ (khi-deux) centrée à $\nu$ degrés de liberté**, notée $\chi^2(\nu)$.
**Intuition :** carré de la norme d'un vecteur gaussien standard de dimension $\nu$.

### Proposition 2.8 — La loi du $\chi^2$ est une loi Gamma
**Source :** Poly ch.1, Outils, Proposition 2.8, p. 31
**Hypothèses :** (i) $X\sim\mathcal{N}(0,1)$ ; (ii) $\nu\in\mathbb{N}^\ast$.
**Énoncé :**
(i) $X^2\sim\mathrm{Gamma}(1/2,1/2)$.
(ii) $\chi^2(\nu)=\mathrm{Gamma}(\nu/2,1/2)$ : densité par rapport à $\mathrm{Leb}$
$$f_\nu(x)=\frac1{2^{\nu/2}\Gamma(\nu/2)}x^{\nu/2-1}e^{-x/2}\mathbb{1}_{\mathbb{R}_+^\ast}(x),$$
et si $U\sim\chi^2(\nu)$, $\mathbb{E}[U]=\nu$, $\mathrm{Var}(U)=2\nu$.
**Preuve (étapes) :**
1. (i) **Fonction muette** : pour $h$ mesurable positive, **par parité** de la densité gaussienne puis **changement de variable** $u=x^2$ sur $\mathbb{R}_+^\ast$ ($x=\sqrt u$, $\mathrm{d}x=\mathrm{d}u/(2\sqrt u)$) :
$$\mathbb{E}\big[h(X^2)\big]=2\int_0^{+\infty}h(x^2)\frac{e^{-x^2/2}}{\sqrt{2\pi}}\,\mathrm{d}x=\int_0^{+\infty}h(u)\frac1{\sqrt{2\pi}}u^{-1/2}e^{-u/2}\,\mathrm{d}u.$$
Comme $\Gamma(1/2)=\sqrt\pi$, $1/\sqrt{2\pi}=(1/2)^{1/2}/\Gamma(1/2)$ : on reconnaît $f_{1/2,1/2}$.
2. (ii) $X_1^2,\dots,X_\nu^2$ indépendantes $\mathrm{Gamma}(1/2,1/2)$ ; **additivité des lois Gamma** de même $\lambda=1/2$ : somme $\sim\mathrm{Gamma}(\nu/2,1/2)$.
3. $\mathbb{E}[U]=\sum_i\mathbb{E}[X_i^2]=\nu$ ; **par indépendance**, $\mathrm{Var}(U)=\nu\mathrm{Var}(X_1^2)=\nu(\mathbb{E}[X_1^4]-\mathbb{E}[X_1^2]^2)=\nu(3-1)=2\nu$ (moments gaussiens). $\square$
**Méthodes mobilisées :** fonction muette ; additivité Gamma ; moments gaussiens.

### Proposition 2.9 — Formes quadratiques de vecteurs gaussiens
**Source :** Poly ch.1, Outils, Proposition 2.9, p. 32
**Hypothèses :** (i) $X\sim\mathcal{N}(\mu,\Sigma)$ sur $\mathbb{R}^n$, $\Sigma$ **définie positive** ; (ii) $\sigma>0$, $Z\sim\mathcal{N}(0,\sigma^2\mathrm{I}_n)$, $\Pi$ matrice d'une projection orthogonale de $\mathbb{R}^n$ de rang $k\ge1$.
**Énoncé :**
(i) $(X-\mu)^\top\Sigma^{-1}(X-\mu)\sim\chi^2(n)$.
(ii) $\|\Pi Z\|^2/\sigma^2\sim\chi^2(k)$.
**Preuve (étapes) :**
1. (i) **Prop. 2.5** : $X\overset{\mathcal{L}}{=}AZ+\mu$, $A$ inversible, $AA^\top=\Sigma$, $Z\sim\mathcal{N}(0,\mathrm{I}_n)$ à coordonnées i.i.d. $\mathcal{N}(0,1)$ (**Prop. 2.6**). Alors $(X-\mu)^\top\Sigma^{-1}(X-\mu)\overset{\mathcal{L}}{=}Z^\top A^\top(AA^\top)^{-1}AZ=Z^\top Z=\sum_{i=1}^nZ_i^2\sim\chi^2(n)$.
2. (ii) $H=[h_1,\dots,h_k]$ ($n\times k$) dont les colonnes forment une base orthonormée de $\mathrm{Im}(\Pi)$ : $H^\top H=\mathrm{I}_k$, $\Pi=HH^\top$ (mêmes valeurs sur $\mathrm{Im}(\Pi)$ et son orthogonal). $\Pi$ symétrique idempotente : $\|\Pi Z\|^2=Z^\top\Pi^\top\Pi Z=Z^\top\Pi Z=Z^\top HH^\top Z=\|H^\top Z\|^2$.
3. **Prop. 2.4** : $H^\top Z\sim\mathcal{N}(0,\sigma^2H^\top H)=\mathcal{N}(0,\sigma^2\mathrm{I}_k)$ ; $H^\top Z/\sigma$ a des coordonnées i.i.d. $\mathcal{N}(0,1)$ : $\|\Pi Z\|^2/\sigma^2=\|H^\top Z/\sigma\|^2\sim\chi^2(k)$. $\square$

### Remarque (non numérotée) — $\chi^2$ non centré
**Source :** Poly ch.1, Outils, Remarque après Prop. 2.9, p. 32
**Énoncé :** si dans (ii) $Z\sim\mathcal{N}(\mu,\sigma^2\mathrm{I}_n)$ avec $\mu\ne0$, le même calcul donne $\|\Pi Z\|^2/\sigma^2=\|E\|^2$ avec $E\sim\mathcal{N}(H^\top\mu/\sigma,\mathrm{I}_k)$. La loi de $\|E\|^2$ ne dépend de $m=H^\top\mu/\sigma$ que par $\|m\|^2=\|\Pi\mu\|^2/\sigma^2$ (invariance de $\mathcal{N}(0,\mathrm{I}_k)$ par transformations orthogonales) : **loi du $\chi^2$ à $k$ degrés de liberté non centrée**, de paramètre de non-centralité $\|\Pi\mu\|^2/\sigma^2$. Non utilisée dans ce chapitre (utile pour la puissance des tests plus tard).

### Définition 12 — Loi de Student à $r$ degrés de liberté
**Source :** Poly ch.1, Outils, Définition 12, p. 32
**Hypothèses :** $r\in\mathbb{N}^\ast$ ; $X\sim\mathcal{N}(0,1)$ et $Y\sim\chi^2(r)$ **indépendantes**.
**Énoncé :** la loi de
$$T=\frac X{\sqrt{Y/r}}$$
est la **loi de Student à $r$ degrés de liberté**, notée $t(r)$. ($Y>0$ p.s., donc $T$ bien définie.) Densité (obtenue par changement de variables sur le couple $(X,Y)$, résultat cité, preuve dans l'annexe) :
$$f_r(t)=\frac{\Gamma\big(\frac{r+1}2\big)}{\Gamma\big(\frac r2\big)\sqrt{r\pi}}\Big(1+\frac{t^2}r\Big)^{-\frac{r+1}2},\qquad t\in\mathbb{R}.$$
Propriétés : densité symétrique, décroissance **polynomiale** (queues plus lourdes que la gaussienne) ; $r=1$ : loi de **Cauchy**, densité $1/(\pi(1+t^2))$, sans espérance ; $t(r)\to\mathcal{N}(0,1)$ quand $r\to+\infty$ car $Y/r\to1$ en probabilité (**loi des grands nombres**). Compléments démontrés dans l'annexe.
**Pièges / erreurs classiques :** l'**indépendance** de $X$ et $Y$ est indispensable (c'est ce que fournit Gosset (iii)).

### Remarque (non numérotée) — Domination, densités, théorème de Radon–Nikodym
**Source :** Poly ch.1, Outils, p. 32
**Énoncé :** Par Radon–Nikodym, le modèle $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ est dominé par $\mu$ si et seulement si toute loi $\mathbb{P}\in\mathcal{C}$ est absolument continue par rapport à $\mu$. Mesures de référence usuelles : Lebesgue (lois « à densité ») et mesures de comptage (lois discrètes). La mesure de domination n'est pas unique, mais ce choix n'affecte pas les quantités statistiques (rapports de densités, vraisemblance) : deux densités relatives à deux mesures dominantes diffèrent d'un facteur multiplicatif indépendant de $\theta$.

### Définition 13 — Tribu engendrée, tribu borélienne
**Source :** Poly ch.1, Outils, « Compléments de théorie de la mesure », Définition 13, p. 33
**Hypothèses :** $E$ ensemble ; $C\subset\mathcal{P}(E)$. ($\mathcal{P}(E)$ est une tribu ; une intersection quelconque de tribus est une tribu.)
**Énoncé :** la **tribu engendrée** par $C$ est l'intersection de toutes les tribus sur $E$ contenant $C$ ; notée $\sigma(C)$. Si $E$ est un espace topologique et $\mathcal{O}$ la classe de ses ouverts, $\sigma(\mathcal{O})$ est la **tribu borélienne** $\mathcal{B}(E)$.
Compléments (p. 33) : $\mathcal{B}(E)$ est aussi engendrée par les fermés ; $\mathcal{B}(\mathbb{R}^d)$ est engendrée par les boules, les pavés, et même les pavés à coordonnées rationnelles (famille dénombrable) ; elle coïncide avec $\mathcal{B}(\mathbb{R})^{\otimes d}$ (ce qui justifie que le $n$-échantillon d'un modèle sur $(\mathbb{R},\mathcal{B}(\mathbb{R}))$ ait pour espace $(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n))$) ; **toute application continue de $\mathbb{R}^d$ dans $\mathbb{R}^k$ est mesurable** pour les tribus boréliennes (d'où la mesurabilité des statistiques usuelles).

### Définition 14 — Mesure à densité, absolue continuité, domination
**Source :** Poly ch.1, Outils, Définition 14, p. 33
**Hypothèses :** $(E,\mathcal{E})$ espace mesurable ; $\mu$ mesure sur $E$.
**Énoncé :**
(i) Pour toute fonction mesurable positive $f$, $\nu:B\mapsto\int_Bf\,\mathrm{d}\mu$ est une mesure sur $E$, **mesure de densité $f$ par rapport à $\mu$**, notée $\nu=f\cdot\mu$. Pour toute $h$ mesurable positive, $\int h\,\mathrm{d}\nu=\int hf\,\mathrm{d}\mu$.
(ii) $\nu$ est **absolument continue** par rapport à $\mu$, noté $\nu\ll\mu$, si pour tout $B\in\mathcal{E}$, $\mu(B)=0\Rightarrow\nu(B)=0$. On dit aussi que $\mu$ **domine** $\nu$.
Une mesure à densité $f\cdot\mu$ est absolument continue par rapport à $\mu$ (l'intégrale de $f$ sur un ensemble $\mu$-négligeable est nulle). Réciproque : Radon–Nikodym, sous l'hypothèse **$\mu$ $\sigma$-finie** ($E$ réunion dénombrable d'ensembles de $\mu$-mesure finie : Lebesgue sur $\mathbb{R}^d$, comptage sur un ensemble dénombrable, toute mesure finie).

### Théorème 2.1 — Théorème de Radon–Nikodym
**Source :** Poly ch.1, Outils, Théorème 2.1, p. 33–34
**Hypothèses :** $\mu$ mesure $\sigma$-finie sur $(E,\mathcal{E})$ ; $\nu$ mesure absolument continue par rapport à $\mu$.
**Énoncé :** il existe une fonction mesurable positive $f$, **unique à un ensemble $\mu$-négligeable près**, telle que $\nu=f\cdot\mu$ ; $f=\frac{\mathrm{d}\nu}{\mathrm{d}\mu}$ est la **densité** (ou dérivée de Radon–Nikodym) de $\nu$ par rapport à $\mu$. De plus :
(i) $f$ est $\mu$-p.p. finie si et seulement si $\nu$ est $\sigma$-finie ;
(ii) $f$ est $\mu$-intégrable si et seulement si $\nu$ est finie.
**Preuve (étapes) :** **admise** dans ce cours (énoncée et commentée dans l'annexe).
**Conséquences (p. 33–34) :** appliqué à une loi $\mathbb{P}$ (mesure finie) : $\mathbb{P}$ admet une densité par rapport à $\mu$ ssi $\mathbb{P}\ll\mu$, densité $\mu$-intégrable d'intégrale 1. D'où : $(\mathsf{Z},\mathcal{Z},\mathcal{C})$ dominé par $\mu$ $\sigma$-finie $\Leftrightarrow$ toute $\mathbb{P}\in\mathcal{C}$ vérifie $\mathbb{P}\ll\mu$. Exemples : $\mathcal{N}(m,\sigma^2)$ ($\sigma^2>0$) et $\mathrm{Leb}$ sont absolument continues l'une par rapport à l'autre (densité gaussienne $>0$) ; $\delta_a$ n'est **pas** absolument continue par rapport à $\mathrm{Leb}$ ($\mathrm{Leb}(\{a\})=0$, $\delta_a(\{a\})=1$) : pas de densité (cas des gaussiennes dégénérées).
**Pièges / erreurs classiques :** la densité n'est définie qu'à un ensemble négligeable près (cf. Remarque experte des Compléments).

---

## 4. Exercices du poly

> **Conventions du fascicule (p. 35)** : $\mathrm{Leb}$ = mesure de Lebesgue sur $\mathbb{R}$, $\mathrm{Leb}^{\otimes n}$ sur $\mathbb{R}^n$ ; i.i.d. = « indépendantes et identiquement distribuées » ; vecteurs colonne ; si $a\in\mathbb{R}^n$, $a'$ est la **transposée** de $a$. Rappels : densité de $\mathcal{E}(\lambda)$ (moyenne $\lambda^{-1}$) : $\forall u>0,\ p_\lambda(u)=\lambda e^{-\lambda u}$ ; $\mathcal{E}(\lambda)$ est un cas particulier de $\Gamma(n,\lambda)$, de densité $\forall u>0,\ q_{n,\lambda}(u)=\frac{\lambda^nu^{n-1}e^{-\lambda u}}{\Gamma(n)}$ ; **additivité** : si $U\sim\Gamma(n,\lambda)$ et $V\sim\Gamma(n',\lambda)$ indépendantes, $U+V\sim\Gamma(n+n',\lambda)$.
>
> **Source des corrigés :** le poly n'en contient pas ; les corrigés ci-dessous suivent le **Corrigé PC1** (`S1_APM-41033-EP-PC1-corrige`, pages 9 à 27). Les compléments ou remarques de l'extracteur sont explicitement signalés.

### 4.0 Questions courtes : avez-vous assimilé le chapitre ? (p. 35)
*(Pas de corrigé officiel : réponses déduites du cours, avec la référence.)*
1. **De quels éléments est constitué un modèle statistique ?** — Un espace mesurable des observations $(\mathsf{Z},\mathcal{Z})$ et une famille de lois $\mathcal{C}$ sur cet espace (Déf. 1.1).
2. **Vrai ou faux : dans un modèle paramétrique, $\Theta$ peut être de dimension infinie.** — Faux : $\Theta\subset\mathbb{R}^d$, $d\ge1$ fini (Déf. 1.1).
3. **Le modèle $\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{\mathcal{N}(\mu\mathbf{1}_n,\sigma^2\mathrm{I}_n),\ \mu\in\mathbb{R},\ \sigma^2\in\mathbb{R}_+^\ast\}\big)$ est-il paramétrique ? identifiable ?** — Oui ($\theta=(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^\ast\subset\mathbb{R}^2$) ; oui, l'espérance $\mu\mathbf{1}_n$ et la covariance $\sigma^2\mathrm{I}_n$ déterminent $(\mu,\sigma^2)$ (Ex. 1.6, point 2).
4. **Vrai ou faux : une statistique $T$ peut dépendre du paramètre $\theta$.** — Faux (Déf. 3 et remarque qui suit).
5. **Qu'est-ce que le modèle induit par une statistique $T$ ? Modèle induit par $S_n=\sum_{i=1}^nX_i$ pour un $n$-échantillon de Bernoulli ?** — $(\mathsf{T},\mathcal{T},\{\mathbb{P}^T,\ \mathbb{P}\in\mathcal{C}\})$ (Déf. 5) ; ici $(\{0,\dots,n\},\mathcal{P}(\{0,\dots,n\}),\{\mathrm{Bin}(n,\theta),\ \theta\in[0,1]\})$ (Ex. 1.12).
6. **Vrai ou faux : le $n$-échantillon coïncide en général avec le produit de $n$ copies du modèle.** — Faux : le $n$-échantillon ne contient que les lois $\mathbb{Q}^{\otimes n}$ (même $\mathbb{Q}$ répétée) ; le produit contient tous les $\mathbb{Q}_1\otimes\dots\otimes\mathbb{Q}_n$ (Outils, Déf. 7 et remarque).
7. **Mesure dominant $\{\mathcal{B}\mathrm{er}(\theta),\ \theta\in[0,1]\}$, puis $\{\mathcal{N}(\mu,1),\ \mu\in\mathbb{R}\}$ ?** — La mesure de comptage sur $\{0,1\}$ (ou $\delta_0+\delta_1$) ; la mesure de Lebesgue sur $\mathbb{R}$ (Déf. 1, Ex. 1.5).
8. **Le mélange gaussien $p_{\pi,\mu_1,\mu_2}$ (à $\sigma^2$ connu, sans contrainte) est-il identifiable ? Comment le rendre identifiable ?** — Non : $p_{\pi,\mu_1,\mu_2}=p_{1-\pi,\mu_2,\mu_1}$ ; en restreignant l'espace des paramètres, par ex. $\mu_1<\mu_2$ (et $\pi\in\,]0,1[$) (Ex. 1.7, Exercice 7).
9. **Réponses randomisées : pourquoi $q\ne1/2$ ? Que se passe-t-il quand $q\to1/2$ ?** — Si $q=1/2$, $\mathrm{RR}_i\sim\mathcal{B}\mathrm{er}(1/2)$ quel que soit $\theta$ : modèle non identifiable, on ne peut pas inverser $\theta\mapsto\theta(2q-1)+1-q$. Quand $q\to1/2$, la variance de $\hat\theta_n$, minorée par $q(1-q)/(n(2q-1)^2)$, explose (§1.8).

---

### Exercice 1 — Un café pour commencer ($\star$)
**Source :** Poly ch.1, Exercices, Exercice 1, p. 35–36 ; corrigé : Corrigé PC1, §2.1, p. 9–10. **Objectif :** identifier un modèle statistique.

**Énoncé complet.** Une cafétéria souhaite remplacer son service par un ou plusieurs distributeurs automatiques de boisson. Afin de calibrer au plus juste le nombre de distributeurs nécessaires, elle mène une enquête pour connaître au mieux les besoins de ses utilisateurs.
1. Dans un premier temps, elle observe les temps successifs d'arrivée de clients dans son local, enregistrant ainsi un vecteur $T=(T_1,\dots,T_n)$. En considérant les intervalles de temps ainsi formés, et en admettant que les clients arrivent les uns après les autres selon un flux identique toute la journée, proposer un modèle statistique. On notera pour cela $\forall i\ge1:\ \Delta_i=T_i-T_{i-1}$, avec la convention $T_0=0$. Discuter des éventuelles limitations de ce modèle.
2. Proposer un estimateur du temps moyen d'arrivée d'un nouveau client, noté $\hat\Delta_n$, ainsi qu'une approximation du nombre de clients arrivant sur un intervalle de temps donné de longueur $h>0$ fixé.
3. Dans un second temps, pour une durée $h>0$ fixée, elle compte sur une fenêtre de temps entre $0$ et $Kh$ le nombre de clients arrivant tous les intervalles de temps de taille $h$. Proposer alors un second modèle statistique pour le vecteur $N=(N_1,N_2,\dots,N_K)$ ainsi obtenu.
4. Proposer un estimateur du nombre de clients arrivant sur un intervalle de temps $h$, noté $\hat N_{K,h}$, ainsi qu'une approximation du temps moyen d'arrivée d'un nouveau client.
5. Rappeler le lien existant entre le premier modèle (temps d'arrivées exponentiels) et le second modèle (arrivées poissoniennes dans une file d'attente).

**Corrigé (Corrigé PC1).**
1. On manipule les inter-temps $\Delta_i=T_i-T_{i-1}$ (seulement contraints à être positifs), plutôt que les $T_i$ (suite croissante). Modèle :
   - espace des observations $(\mathbb{R}_+^n,\mathcal{B}(\mathbb{R}_+^n))$ ;
   - famille paramétrique **de forme produit** $\mathcal{C}=\{\mathbb{P}_\theta,\ \theta>0\}$, où pour tout $(\delta_1,\dots,\delta_n)\in\mathbb{R}_+^n$,
   $$p_\theta(\delta_1,\dots,\delta_n)=\prod_{i=1}^n\theta e^{-\theta\delta_i}.$$
   Ce modèle traduit une forme exponentielle de chaque inter-temps et l'hypothèse forte d'**indépendance** des arrivées. *Limitations* : si la forme exponentielle est raisonnable, l'indépendance entre arrivées successives et le caractère **homogène en temps** (même loi toute la journée) peuvent être remis en question.
2. Estimateur par la moyenne empirique des inter-temps :
$$\hat\Delta_n:=\frac1n\sum_{i=1}^n\Delta_i=\frac{T_n}n.$$
Le nombre de clients arrivant sur un intervalle de longueur $h$ peut être approché par $h\,\hat\Delta_n^{-1}$.
3. Modélisation du vecteur de comptage $N=(N_1,\dots,N_K)$ (entiers) :
   - espace $(\mathbb{N}^K,\mathcal{P}(\mathbb{N}^K))$ ;
   - famille $\mathcal{D}=\{\mathbb{Q}_\lambda,\ \lambda>0\}$ de forme produit poissonienne : pour tout $(n_1,\dots,n_K)\in\mathbb{N}^K$,
   $$q_\lambda(n_1,\dots,n_K)=\prod_{j=1}^K\frac{e^{-\lambda h}(\lambda h)^{n_j}}{n_j!}.$$
   Hypothèse poissonienne raisonnable, indépendance discutable, et surtout l'homogénéité en temps (stationnarité) **très discutable** pour une cafétéria. Généralisation non paramétrique : remplacer $\lambda$ par une intensité instantanée $t\mapsto\lambda(t)$, famille $\mathcal{D}'=\{\mathbb{Q}'_\lambda,\ \lambda\in C(\mathbb{R}_+,\mathbb{R}_+)\}$ avec
   $$q_\lambda(n_1,\dots,n_K)=\prod_{j=1}^K\frac{\exp\big(-\int_{(j-1)h}^{jh}\lambda(s)\,\mathrm{d}s\big)\big(\int_{(j-1)h}^{jh}\lambda(s)\,\mathrm{d}s\big)^{n_j}}{n_j!}.$$
4. Dans le cas poissonien homogène :
$$\hat N_{K,h}=\frac1K\sum_{j=1}^KN_j,$$
et une approximation du temps moyen d'arrivée d'un nouveau client est $h\,\hat N_{K,h}^{-1}$.
5. Si $(\Delta_i)_{i\ge1}$ sont i.i.d. $\mathcal{E}(\lambda)$, alors le processus $N=(N_h,N_{2h},\dots,N_{Kh})$ défini par $N_{jh}:=\sup\{k\ge0:\ T_k<jh\}$ suit une distribution de comptage **i.i.d. poissonienne de paramètre $\lambda h$** (sur chaque fenêtre). Le caractère « sans mémoire » de l'exponentielle donne l'indépendance des comptages ; l'identification de la loi de Poisson se fait par un calcul exact (non détaillé dans le corrigé).

*Remarque de l'extracteur :* tel qu'écrit, $N_{jh}$ est le nombre cumulé d'arrivées avant $jh$ ; ce sont les **accroissements** $N_{jh}-N_{(j-1)h}$ (les $N_j$ de l'énoncé) qui sont i.i.d. $\mathcal{P}\mathrm{oi}(\lambda h)$.

**Méthodes mobilisées :** construction de modèle (espace + famille) ; modèle produit (indépendance) ; méthode des moments / moyenne empirique ; plug-in (inverse d'un estimateur) ; lien processus de Poisson – exponentielle (absence de mémoire) ; critique de modèle (stationnarité).

---

### Exercice 2 — Rappel : transformation de v.a. ($\star$)
**Source :** Poly ch.1, Exercices, Exercice 2, p. 36 ; corrigé : Corrigé PC1, §2.2, p. 10–11. **Objectif :** manipuler un changement de variable standard.

**Énoncé complet.** Soit un $n$-échantillon $(X_1,\dots,X_n)$ du modèle statistique $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta\cdot\mathrm{Leb}:\ \theta\in\Theta\})$. On se place dans le cas $\theta=((a_1,b_1),\dots,(a_n,b_n))$ et $\Theta=(\mathbb{R}\times\mathbb{R}^\star)^n$.
1. Quel est le modèle statistique induit par $(a_1+b_1X_1,\dots,a_n+b_nX_n)$ ?

Il est d'usage d'appeler les $a_i$ les paramètres de **translation** et les $b_i$ les paramètres d'**échelle**.
*Rappel (énoncé)* : soit un ouvert $O$ de $\mathbb{R}^k$ et $p\cdot\mathrm{Leb}^{\otimes k}$ une densité sur $\mathbb{R}^k$ telle que $\int_Op\,\mathrm{dLeb}^{\otimes k}=1$. Soit $\phi:O\to\mathbb{R}^k$ continûment différentiable, injective sur $O$ et dont le jacobien ne s'annule pas sur $O$ (de façon équivalente, $\phi$ est un $\mathcal{C}^1$-difféomorphisme de $O$ sur $\phi(O)$). Si $X\sim p\cdot\mathrm{Leb}^{\otimes k}$ alors la loi de $\phi(X)$ est $q\cdot\mathrm{Leb}^{\otimes k}$ où
$$q(u)=\mathbb{1}_{\phi(O)}(u)\,p\big(\phi^{-1}(u)\big)\,\big\lvert\mathrm{Det}\,J_{\phi^{-1}}(u)\big\rvert,\qquad \mathrm{Det}\,J_{\phi^{-1}}(u)=\frac1{\mathrm{Det}\big(J_\phi(\phi^{-1}(u))\big)}.$$

**Corrigé (Corrigé PC1).** Posons $p_{n,\theta}(x_1,\dots,x_n):=\prod_{i=1}^np_\theta(x_i)$. Sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les $X_i$ sont indépendantes.
1. Les statistiques $a_i+b_iX_i$ sont indépendantes (fonctions de variables indépendantes) ; la loi du vecteur est donc le **produit** des lois de chaque $a_i+b_iX_i$.
2. Loi de $a_i+b_iX_i$ : **changement de variable** $y=a_i+b_ix$ ($b_i\ne0$), pour toute $h$ mesurable positive (**fonction muette**) :
$$\int h(a_i+b_ix)\,p_\theta(x)\,\mathrm{d}x=\int h(y)\,p_\theta\Big(\frac{y-a_i}{b_i}\Big)\frac{\mathrm{d}y}{\lvert b_i\rvert}.$$
La densité de $a_i+b_iX_i$ est donc $y\mapsto\frac1{\lvert b_i\rvert}p_\theta\big(\frac{y-a_i}{b_i}\big)$.
3. Sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, la loi du $n$-uplet a pour densité
$$(y_1,\dots,y_n)\mapsto\prod_{i=1}^n\lvert b_i\rvert^{-1}p_\theta\Big(\frac{y_i-a_i}{b_i}\Big),$$
et le modèle induit est $\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{(\prod_i\lvert b_i\rvert^{-1}p_\theta(\frac{y_i-a_i}{b_i}))\cdot\mathrm{Leb}^{\otimes n},\ \theta\in\Theta\}\big)$ (mise en forme de triplet : extracteur).

*Remarque de l'extracteur :* l'énoncé fait porter $\theta$ à la fois sur $p_\theta$ et sur $(a_i,b_i)$ ; le corrigé garde la notation $p_\theta$ pour la densité de base. C'est l'Exemple 2.1 des Outils appliqué coordonnée par coordonnée (ou l'Ex. 2.3 avec $A$ diagonale).

**Méthodes mobilisées :** méthode de la fonction muette ; changement de variable affine (Prop. 2.1 / Ex. 2.1) ; indépendance de fonctions de variables indépendantes ; densité produit.

---

### Exercice 3 — Modèle de translation et d'échelle ($\star\star$) ; cas gaussien (questions 3/4)
**Source :** Poly ch.1, Exercices, Exercice 3, p. 36–37 ; corrigé : Corrigé PC1, §2.3, p. 11–15. **Objectif :** modèle translation/échelle ; cas gaussien.

**Énoncé complet.** Soit $g$ une densité par rapport à $\mathrm{Leb}$. On considère le modèle
$$\Big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\big\{p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}:\ \theta\in\Theta:=\mathbb{R}\times\mathbb{R}_+^\ast\big\}\Big),\qquad p_{n,\theta}(x_1,\dots,x_n):=\sigma^{-n}\prod_{i=1}^ng\Big(\frac{x_i-\mu}\sigma\Big),\quad\theta:=(\mu,\sigma).$$
On note $(X_1,\dots,X_n)$ les variables canoniques : $X_i(x_1,\dots,x_n)=x_i$.
1. Montrer que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les statistiques $(X_1,\dots,X_n)$ sont i.i.d. et identifier leur loi.
2. Soit $\theta=(\mu,\sigma)\in\Theta$. Montrer que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les v.a. réelles $\frac{X_i-\mu}\sigma$, $i\in\{1,\dots,n\}$, sont i.i.d. de loi de densité $g$ par rapport à $\mathrm{Leb}$.

Supposons que $g$ est une densité gaussienne centrée réduite. On définit
$$S_n:=\sum_{i=1}^nX_i,\qquad K_n:=\sum_{i=1}^n(X_i-n^{-1}S_n)^2.$$
3. Proposer un estimateur de $\mu$ puis de $\sigma^2$, utilisant ces deux statistiques. *Commentaires* : il n'y a pas unicité d'un estimateur de $\theta$. Pour la moyenne, la figure 1 compare deux stratégies : moyenne empirique et médiane empirique (boxplot de 5000 réalisations indépendantes de chaque estimateur, $n=50$ à gauche, $n=500$ à droite ; échantillons gaussiens de moyenne 2 et variance 1). Qu'en concluez-vous ? Le corrigé contient les mêmes analyses pour $g$ densité de Laplace ; la conclusion sera-t-elle la même ?
4. Déterminer le modèle statistique induit par les statistiques $(S_n,K_n)$. (Le théorème de Gosset et sa démonstration figurent dans le chapitre.)

**Corrigé (Corrigé PC1).**
1. La densité de $(X_1,\dots,X_n)$ est **de forme produit** : les composantes sont **indépendantes**. C'est un produit de la même fonction $u\mapsto g((u-\mu)/\sigma)$ (à constante près) : **même loi**. La constante $C_\theta$ vérifie $\int C_\theta\,g\big(\frac{u-\mu}\sigma\big)\,\mathrm{d}u=1$, soit $C_\theta=1/\sigma$ : la loi commune est
$$u\mapsto q_\theta(u):=\frac1\sigma\,g\Big(\frac{u-\mu}\sigma\Big).$$
2. Les $X_i$ sont i.i.d. de loi $q_\theta\cdot\mathrm{Leb}$. On applique le résultat de l'**Exercice 2** avec $g\leftarrow q_\theta$, $a_k\leftarrow-\mu/\sigma$, $b_k\leftarrow1/\sigma$ : $(X_1-\mu)/\sigma$ a pour densité $\sigma\,q_\theta(\sigma y+\mu)=g(y)$. L'indépendance est conservée (fonctions de variables indépendantes).
3. Sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les $(X_i-\mu)/\sigma$ sont i.i.d. $\mathcal{N}(0,1)$ : $\mu$ est l'espérance de $X_i$ et $\sigma^2$ sa variance. **Par la loi (faible) des grands nombres**, $\big(\frac1nS_n,\frac1nK_n\big)\xrightarrow{\ \mathbb{P}_{n,\theta}\text{-prob}\ }(\mu,\sigma^2)$. On propose
$$(\hat\mu_n,\hat\sigma_n^2):=\Big(\frac1n\sum_{i=1}^nX_i,\ \frac1n\sum_{i=1}^nX_i^2-(\hat\mu_n)^2\Big)=\Big(\frac1n\sum_{i=1}^nX_i,\ \frac1n\sum_{i=1}^n(X_i-\hat\mu_n)^2\Big)=\Big(\frac1nS_n,\ \frac1nK_n\Big).$$
On aurait aussi pu proposer la **médiane empirique** pour $\mu$. *Figure 4 (cas gaussien)* : on observe (a) le rôle de $n$ dans la dispersion des estimateurs ; (b) la distribution de la **moyenne** est plus concentrée que celle de la médiane. *Figure 5 (cas Laplace, espérance 2, variance 1)* : (a) idem ; (b) la **médiane** est cette fois plus concentrée que la moyenne — la conclusion **n'est pas la même**.
   *Complément du corrigé — cas gaussien : MV et moments coïncident.*
   (a) **Maximum de vraisemblance** : vraisemblance $L_n(\theta):=\frac1{(2\pi)^{n/2}\sigma^n}\exp\big(-\frac12\sum_{k=1}^n\frac{(X_k-\mu)^2}{\sigma^2}\big)$, log-vraisemblance (à constante $C$ près) $\ell_n(\theta):=C-\frac n2\ln\sigma^2-\frac12\sum_{k=1}^n\frac{(X_k-\mu)^2}{\sigma^2}$, qui possède un unique maximum, solution de $\nabla\ell_n(\theta)=0$ :
   $$\hat\theta_n=\begin{pmatrix}\hat\mu_n\\\hat\sigma_n^2\end{pmatrix}=\begin{pmatrix}\frac1n\sum_{k=1}^nX_k\\\frac1n\sum_{k=1}^nX_k^2-\big(\frac1n\sum_{j=1}^nX_j\big)^2\end{pmatrix}$$
   (moyenne et variance empiriques).
   (b) **Méthode des moments** : $\mathbb{E}_\theta[X_1]=\mu$, $\mathrm{Var}_\theta(X_1)=\sigma^2$ donnent le même estimateur.
   *Complément du corrigé — cas Laplace : les deux approches diffèrent.*
   (a) Moments : même estimateur que ci-dessus (les relations $\mathbb{E}_\theta[X_1]=\mu$, $\mathrm{Var}_\theta(X_1)=\sigma^2$ restent vraies quelle que soit $g$) ; le corrigé note que l'estimateur des moments n'est pas unique.
   (b) MV : $\ell_n(\theta)=C-n\ln\sigma-\frac1\sigma\sum_{k=1}^n\lvert X_k-\mu\rvert$. En $\sigma$ : $\hat\sigma_n=\frac1n\sum_{k=1}^n\lvert X_k-\mu\rvert$. En $\mu$ : minimiser $h:\mu\mapsto\sum_{k=1}^n\lvert X_k-\mu\rvert$, d'où
   $$\hat\mu_n=\begin{cases}X_{(n+1)/2:n}&n\text{ impair},\\\text{n'importe quel point de }]X_{n/2:n},X_{n/2+1:n}[&n\text{ pair},\end{cases}$$
   ($X_{1:n}\le\dots\le X_{n:n}$ statistiques d'ordre) : la **médiane**. Justification : $h$ est continue, linéaire par morceaux, dérivable hors de $\{X_1,\dots,X_n\}$ ; sur $]-\infty,X_{1:n}[$ dérivée $-n$ ; sur $]X_{n:n},+\infty[$ dérivée $n$ ; sur $]X_{q:n},X_{q+1:n}[$, $h(\mu)=\sum_{k=1}^q(\mu-X_k)+\sum_{k=q+1}^n(X_k-\mu)$ (indices des statistiques d'ordre), de dérivée $2q-n$. Donc $h$ décroît puis croît : minimum en $X_{q^\star+1:n}$ si $n=2q^\star+1$, sur $]X_{q^\star:n},X_{q^\star+1:n}[$ si $n=2q^\star$.
4. Sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$ : $X_i\sim\mathcal{N}(\mu,\sigma^2)$ indépendantes ; $S_n\sim\mathcal{N}(n\mu,n\sigma^2)$ ; $K_n=\sum_i(X_i-n^{-1}S_n)^2=\sum_iX_i^2-n^{-1}S_n^2$ suit une loi **Gamma de paramètres $((n-1)/2,\,1/(2\sigma^2))$** (convention : loi sur $\mathbb{R}_+$ de densité $\propto u^{a-1}e^{-bu}$) ; $S_n$ et $K_n$ sont **indépendantes** (théorème de Gosset). Le modèle induit est
$$\Big(\mathbb{R}\times\mathbb{R}_+,\ \mathcal{B}(\mathbb{R}\times\mathbb{R}_+),\ \big\{\rho_{n,\theta}\cdot\mathrm{Leb}^{\otimes2}:\ \theta:=(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^\ast\big\}\Big),$$
$$\rho_{n,\theta}(z,y):=C_n\exp\Big(-\frac{(z-n\mu)^2}{2n\sigma^2}\Big)\exp\Big(-\frac y{2\sigma^2}\Big)y^{(n-3)/2}\,\mathbb{1}_{\mathbb{R}}(z)\mathbb{1}_{\mathbb{R}_+}(y),\qquad C_n:=\frac1{\sqrt{2\pi n\sigma^2}}\Big(\frac1{2\sigma^2}\Big)^{(n-1)/2}\frac1{\Gamma((n-1)/2)}.$$
   *Justification (cohérente avec le Th. 1.3)* : $S_n=n\bar X_n$, $K_n=(n-1)S_n^2$ (notations Gosset) ; $K_n/\sigma^2\sim\chi^2(n-1)=\mathrm{Gamma}(\frac{n-1}2,\frac12)$ (Prop. 2.8), donc $K_n\sim\mathrm{Gamma}(\frac{n-1}2,\frac1{2\sigma^2})$ ; indépendance $\Rightarrow$ densité produit.
   *Complément du corrigé — modèle induit par $(S_n,\sum_{i=1}^nX_i^2)$.* On a $\sum_iX_i^2=K_n+S_n^2/n$. Pour $h$ continue bornée :
$$\begin{aligned}\mathbb{E}_{n,\theta}\big[h(S_n,K_n+n^{-1}S_n^2)\big]&=C_n\int_{\mathbb{R}\times\mathbb{R}_+}h(z,y+n^{-1}z^2)\,e^{-(z-n\mu)^2/(2n\sigma^2)}e^{-y/(2\sigma^2)}y^{(n-3)/2}\,\mathrm{d}z\,\mathrm{d}y\\&=C_n\int_{\mathbb{R}}\int_{u^2/n}^{+\infty}h(u,v)\,e^{-(u-n\mu)^2/(2n\sigma^2)}e^{-(v-u^2/n)/(2\sigma^2)}\Big(v-\frac{u^2}n\Big)^{(n-3)/2}\mathrm{d}u\,\mathrm{d}v\\&=C_ne^{-n\mu^2/(2\sigma^2)}\int_{\mathbb{R}}\int_{u^2/n}^{+\infty}h(u,v)\,e^{u\mu/\sigma^2-v/(2\sigma^2)}\Big(v-\frac{u^2}n\Big)^{(n-3)/2}\mathrm{d}u\,\mathrm{d}v,\end{aligned}$$
   par le changement de variable $z=u$, $y=v-u^2/n$. Modèle induit : $\big(\mathbb{R}\times\mathbb{R}_+,\mathcal{B}(\mathbb{R}\times\mathbb{R}_+),\{\tilde\rho_{n,\theta}\cdot\mathrm{dLeb}^2,\ \theta\in\Theta\}\big)$ avec
$$\tilde\rho_{n,\theta}(u,v)\propto\exp\Big(\frac{u\mu}{\sigma^2}-\frac v{2\sigma^2}\Big)\Big(v-\frac{u^2}n\Big)^{(n-3)/2}\mathbb{1}_{\mathbb{R}}(u)\,\mathbb{1}_{[u^2/n,+\infty[}(v).$$
   Bien que $(S_n,K_n)$ soient indépendantes, **il n'en est pas de même pour $(S_n,\sum_iX_i^2)$** (le support $\{v\ge u^2/n\}$ n'est pas un produit).

*Points d'attention (extracteur) :* l'énoncé paramètre par $\theta=(\mu,\sigma)$ mais la question 4 du corrigé utilise $\theta=(\mu,\sigma^2)$ ; l'estimateur proposé de $\sigma^2$ est $K_n/n$ (biaisé ; $K_n/(n-1)=S_n^2$ de Gosset serait sans biais) ; le corrigé renvoie à un ancien numéro « Théorème IV-5-24 » pour Gosset — dans le poly actuel c'est le **Théorème 1.3**.

**Méthodes mobilisées :** factorisation de densité $\Rightarrow$ i.i.d. ; normalisation d'une densité ; changement de variable affine (Exercice 2) ; loi des grands nombres ; méthode des moments ; maximum de vraisemblance par annulation du gradient (gaussien) et minimisation de $\sum\lvert X_k-\mu\rvert$ (Laplace $\Rightarrow$ médiane) ; théorème de Gosset ; $\chi^2=$ Gamma ; fonction muette + changement de variables pour un modèle induit en dimension 2 ; comparaison empirique d'estimateurs (boxplots, robustesse).

---

### Exercice 4 — Modèle de régression linéaire gaussienne ($\star\star$)
**Source :** Poly ch.1, Exercices, Exercice 4, p. 37–38 ; corrigé : Corrigé PC1, §2.4, p. 16–17. **Objectif :** modèle de régression (linéaire) gaussienne. (Poursuivi en PC 2.)

**Énoncé complet.** On modélise la dépendance d'une réponse par rapport à $k$ variables explicatives sur $n$ individus ; on collecte $(x_1,y_1),\dots,(x_n,y_n)$ où $y_i\in\mathbb{R}$ et $x_i\in\mathbb{R}^k$. Modèle :
$$\Big(\mathbb{R}^n,\ \mathcal{B}(\mathbb{R}^n),\ \big\{p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}:\ \theta=(\beta,\sigma)\in\Theta:=\mathbb{R}^k\times\mathbb{R}_+^\ast\big\}\Big),\qquad p_{n,\theta}(y_1,\dots,y_n):=\sigma^{-n}\prod_{i=1}^ng\Big(\frac{y_i-f(x_i'\beta)}\sigma\Big),$$
$g$ densité par rapport à $\mathrm{Leb}$, $f:\mathbb{R}\to\mathbb{R}$ une fonction ; $Y_i(y_1,\dots,y_n)=y_i$. (Dans le PDF, les variables explicatives sont notées en gras $\mathbf{x}_i\in\mathbb{R}^k$ et $f(\beta'\mathbf{x}_i)$ ; on écrit ici $x_i$.)
1. Montrer que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les statistiques $(Y_1,\dots,Y_n)$ sont indépendantes et préciser leurs lois.
2. Montrer que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$ les variables $\sigma^{-1}\{Y_i-f(\beta'x_i)\}$, $i\in\{1,\dots,n\}$, sont i.i.d. de loi $g\cdot\mathrm{Leb}$.
3. (Régression linéaire gaussienne.) $k=2$, $g$ densité gaussienne centrée réduite, $f(\eta)=\eta$ et pour tout $i$, $x_i=\begin{pmatrix}1\\x_i\end{pmatrix}$, $f(\beta'x_i)=\beta_1+\beta_2x_i$. Proposer un estimateur de $\beta_1$ et $\beta_2$.

Données : 150 mesures de concentration d'ozone (moyennes entre 13h et 15h à Roosevelt Island, en p.p.m.) en fonction de la radiation solaire, de la vitesse du vent, de la température ; on explore la relation ozone (réponse) / radiation solaire (explicative). *Figure 2* : (gauche) nuage des 150 points $(x_i,y_i)$, droite de régression $x\mapsto\hat b_1+\hat b_2x$ où $(\hat b_1,\hat b_2)$ minimise $(\beta_1,\beta_2)\mapsto\sum_{i=1}^{150}(y_i-\beta_1-\beta_2x_i)^2$, et droite horizontale $x\mapsto n^{-1}\sum_{i=1}^ny_i$ ; (droite) nuage $(\hat y_i,e_i)$ avec $\hat y_i=\hat b_1+\hat b_2x_i$, $e_i=y_i-\hat y_i$ (« Residuals vs Fitted », `lm(Ozone ~ Solar.R)`).
4. Le modèle de régression linéaire vous semble-t-il approprié ? Quelles améliorations du modèle sembleraient souhaitables ?

**Corrigé (Corrigé PC1).**
1. Sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, $(Y_1,\dots,Y_n)$ a la densité $(u_1,\dots,u_n)\mapsto\sigma^{-n}\prod_{i=1}^ng\big(\frac{u_i-f(\beta'x_i)}\sigma\big)$, **de forme produit** : composantes indépendantes. La loi de $Y_i$ a pour densité $u_i\mapsto\frac1\sigma g\big(\frac{u_i-f(\beta'x_i)}\sigma\big)$ (calcul de constante de normalisation : $1/\sigma$). Les $Y_i$ ne sont **pas** identiquement distribuées (centre $f(\beta'x_i)$ dépendant de $i$).
2. Par le résultat de l'**Exercice 2** (translation-échelle), $(Y_i-f(\beta'x_i))/\sigma$ a pour loi $g$ ; indépendance conservée : i.i.d. $g\cdot\mathrm{Leb}$.
3. $Y_i\overset{\text{ind}}{\sim}\mathcal{N}(\beta_1+\beta_2x_i,\sigma^2)$, i.e. $Y_i\overset{\mathcal{L}}{=}\beta_1+\beta_2x_i+W_i$ avec $W_i\sim\mathcal{N}(0,\sigma^2)$ : mesure de $\beta_1+\beta_2x_i$ entachée d'une perturbation gaussienne centrée.
   - **Maximum de vraisemblance** : $\ell_n(\theta):=C-\frac n2\ln\sigma^2-\frac1{2\sigma^2}\sum_{i=1}^n(Y_i-\beta_1-\beta_2x_i)^2$. Avec
   $$\mathbf{X}:=\begin{pmatrix}1&x_1\\\vdots&\vdots\\1&x_n\end{pmatrix}\in\mathbb{R}^{n\times2},\qquad\beta:=\begin{pmatrix}\beta_1\\\beta_2\end{pmatrix},\qquad\mathbf{Y}:=\begin{pmatrix}Y_1\\\vdots\\Y_n\end{pmatrix},$$
   $\ell_n(\theta)=C-\frac n2\ln\sigma^2-\frac1{2\sigma^2}\|\mathbf{Y}-\mathbf{X}\beta\|^2$. Unique maximum en résolvant $\nabla\ell_n=0$ : pour $\beta$, minimiser la forme quadratique $\beta\mapsto\beta'\mathbf{X}'\mathbf{X}\beta-2\beta'\mathbf{X}'\mathbf{Y}+\mathbf{Y}'\mathbf{Y}$ ; minimum en la solution de $\mathbf{X}'\mathbf{X}\beta=\mathbf{X}'\mathbf{Y}$ (**équations normales**), soit (si $\mathbf{X}'\mathbf{X}$ inversible)
   $$\hat\beta_n:=(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'\mathbf{Y}.$$
   $\mathbf{X}\hat\beta_n$ est la **projection** de $\mathbf{Y}$ sur l'espace engendré par les colonnes de $\mathbf{X}$ (avec $H:=\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$, $H^2=H$ : projecteur). *Complément* : estimateur MV de $\sigma^2$ :
   $$\hat\sigma_n^2:=\frac1n\|\mathbf{Y}-\mathbf{X}\hat\beta_n\|^2=\frac1n\sum_{i=1}^n\big(Y_i-\hat\beta_{n,1}-\hat\beta_{n,2}x_i\big)^2,$$
   variance des résidus (composante de $\mathbf{Y}$ orthogonale à l'espace des colonnes de $\mathbf{X}$, « part » de $\mathbf{Y}-\mathbb{E}[\mathbf{Y}]$ non expliquée).
   - **Moindres carrés** : minimiser la dispersion du nuage autour de la droite, $\hat\beta_n:=\arg\min_\beta\sum_{i=1}^n(Y_i-\beta'x_i)^2=\arg\min_\beta\|\mathbf{Y}-\mathbf{X}\beta\|^2$ : même résultat (projection orthogonale).
   *Le corrigé affirme aussi que « le coefficient $\hat\beta_{n,0}$ est le projeté de $\mathbf{Y}$ sur le vecteur constant $\mathbf{1}_n$ et vaut $n^{-1}\sum_iy_i$ » — remarque de l'extracteur : ceci n'est exact que pour le modèle réduit à la constante ($f(\beta'x_i)=\beta_1$) ou pour des $x_i$ centrés ; dans le modèle à deux paramètres, $\hat\beta_{n,1}=\bar Y-\hat\beta_{n,2}\bar x$ (cf. Prop. 4.2 des Compléments).*
4. Lecture des figures : (gauche) nuage $(x_i,y_i)$ ; droite horizontale $y=b_1^{(1)}$, évaluation de $\hat\beta_0^{(1)}:=n^{-1}\sum_iY_i$ (modèle $f(\beta'x_i)=\beta_1$) ; droite de pente non nulle $y=\tilde b_1+\tilde b_2x$, évaluation de $\hat\beta_n$ (modèle $f(\beta'x_i)=\beta_1+\beta_2x_i$). Résidus $e_i:=y_i-\hat y_i$, $\hat y_i:=\tilde b_1+\tilde b_2x_i$ ; (droite) nuage $(\hat y_i,e_i)$. *Le corrigé PC1 ne développe pas davantage la question « le modèle est-il approprié ? »* (commentaire de l'extracteur, sans valeur de corrigé : sur la figure 2, la dispersion des résidus augmente avec les valeurs ajustées, la courbe de lissage rouge du graphe « Residuals vs Fitted » n'est pas plate (structure non linéaire) et quelques résidus positifs extrêmes sont étiquetés (117, 62, 99) ; cela suggère hétéroscédasticité, asymétrie / non-gaussianité, non-linéarité, et l'ajout d'autres variables explicatives — vent, température.)

**Méthodes mobilisées :** factorisation de densité (indépendance, lois non identiques) ; changement de variable translation-échelle ; maximum de vraisemblance ; moindres carrés ; équations normales ; projection orthogonale (lien avec Cochran) ; analyse graphique des résidus.

---

### Exercice 5 — Score de football ($\star\star\star$, bonus)
**Source :** Poly ch.1, Exercices, Exercice 5, p. 39–40 ; corrigé : Corrigé PC1, §2.5, p. 18–22. **Objectif :** modèle de Poisson, modèle de mélange poissonien. Prérequis : fonction génératrice des moments.

**Énoncé complet.** Soit $\lambda>0$. Loi de Poisson de paramètre $\lambda$ : densité $\{p_\lambda(k),\ k\in\mathbb{N}\}$ par rapport à la mesure de comptage $\mu$ sur $\mathbb{N}$, $p_\lambda(k)=e^{-\lambda}\frac{\lambda^k}{k!}$.
1. Calculer la fonction génératrice des moments de la loi de Poisson de paramètre $\lambda$.
2. En déduire la moyenne et la variance.
3. Montrer que si $X_1$, $X_2$ sont indépendantes de lois de Poisson de paramètres $\lambda_1>0$, $\lambda_2>0$, alors $X_1+X_2\sim$ Poisson$(\lambda_1+\lambda_2)$.

Soit $(X_1,\dots,X_n)$ un $n$-échantillon du modèle $(\mathbb{N},\mathcal{P}(\mathbb{N}),\{p_\lambda\cdot\mu:\ \lambda\in\mathbb{R}_+^\ast\})$.
4. Définir le modèle statistique induit par la statistique $\sum_{i=1}^nX_i$.
5. Proposer une méthode d'estimation du paramètre $\lambda$.

On modélise le nombre de buts d'un match par une loi de Poisson : buts de l'équipe locale et de l'équipe visiteuse = deux Poisson indépendantes de paramètres différents ; matchs indépendants.
6. Construire le modèle statistique associé à l'observation des résultats de $n$ matchs.
7. Premier League, saisons 2004-2005 à 2008-2009, $n=1900$ matchs : nombre total de buts en moyenne $2.523$, variance $2.640$ ; équipe locale : moyenne $1.468$, variance $1.617$ ; équipe visiteuse : moyenne $1.055$, variance $1.158$. Proposer un estimateur des intensités $\lambda_1$ et $\lambda_2$. Pourquoi l'hypothèse poissonienne est-elle discutable ?

Figure 3 (effectifs observés vs Poisson) :

| buts | locale observés | Poisson ($\lambda=1.468$) | visiteuse observés | Poisson ($\lambda=1.055$) |
|---|---|---|---|---|
| 0 | 469 | 437.7 | 692 | 661.6 |
| 1 | 621 | 642.6 | 680 | 697.9 |
| 2 | 456 | 471.7 | 335 | 368.2 |
| 3 | 217 | 230.8 | 131 | 129.5 |
| 4 | 100 | 84.7 | 51 | 34.1 |
| $\ge5$ | 37 | 32.5 | 11 | 8.7 |
| Total | 1900 | | 1900 | |

La modélisation poissonienne sous-estime le nombre de scores nuls et sur-estime les cas 1 ou 2 buts. On considère le mélange d'une Poisson et d'une Dirac en 0 :
$$p_{\pi,\lambda}(k)=(1-\pi)\mathbb{1}_{\{0\}}(k)+\pi e^{-\lambda}\frac{\lambda^k}{k!},\qquad\pi\in\,]0,1[.$$
8. Comment obtenir des réalisations d'une telle loi à partir d'un générateur uniforme sur $[0,1]$ et d'un générateur de Poisson$(\lambda)$ ?
9. Calculer la moyenne et le moment d'ordre 2 de cette distribution.
10. Proposer une méthode d'estimation de $\pi$ et de $\lambda$.

**Corrigé (Corrigé PC1).**
*Rappel* : la mesure de comptage $\mu$ sur $\mathbb{N}$ associe à $A$ son cardinal ; une loi $\xi$ a la densité $f$ par rapport à $\check\nu$ si $\xi(A)=\int_Af\,\mathrm{d}\check\nu$ ; pour la mesure de comptage, $\xi(A)=\sum_{a\in A}f(a)$.
1. $G_X(s):=\mathbb{E}[s^X]=e^{-\lambda}\sum_{k\ge0}\frac{\lambda^k}{k!}s^k=\exp(-\lambda(1-s))$ pour tout $s\in\mathbb{R}$.
2. $G_X$ deux fois dérivable (moments de tout ordre) ; $G_X'(1)=\mathbb{E}[X]$, $G_X''(1)=\mathbb{E}[X(X-1)]$, d'où $\mathbb{E}[X]=\lambda$, $\mathbb{E}[X(X-1)]=\lambda^2$, et $\mathrm{Var}(X)=\mathbb{E}[X(X-1)]+\mathbb{E}[X]-(\mathbb{E}[X])^2=\lambda$.
3. **Par indépendance**, $G_{X_1+X_2}=G_{X_1}G_{X_2}$, donc $G_{X_1+X_2}(s)=\exp((\lambda_1+\lambda_2)(s-1))$ (le corrigé écrit par coquille $\exp(-(\lambda_1+\lambda_2)(s-1))$) ; la fonction génératrice **caractérisant la loi**, $X_1+X_2\sim\mathcal{P}(\lambda_1+\lambda_2)$.
4. $T_n:=\sum_{i=1}^nX_i$ à valeurs dans $\mathbb{N}$ ; par la question 3 (récurrence), $T_n\sim\mathcal{P}(n\lambda)$. Modèle induit :
$$\big(\mathbb{N},\ \mathcal{P}(\mathbb{N}),\ \{p_{n\lambda}\cdot\mu:\ \lambda\in\mathbb{R}_+^\ast\}\big).$$
5. - **Maximum de vraisemblance** : $\ell_n(\lambda):=C-n\lambda+T_n\ln\lambda$, unique maximum sur $\mathbb{R}_+^\ast$ en $\hat\lambda_n:=\frac1n\sum_{k=1}^nX_k$.
   - **Moments d'ordre 1** : $\mathbb{E}_\lambda[X_1]=\lambda$ donne $\tilde\lambda_n=\frac1n\sum_kX_k$ (le même).
   - **Moments d'ordre 2** : $\mathbb{E}_\lambda[X_1^2]=\lambda(1+\lambda)$ donne $\check\lambda_n$, unique racine $>0$ de $\lambda^2+\lambda-\frac1n\sum_{k=1}^nX_k^2=0$.
6. Données $\ell_1,v_1,\dots,\ell_n,v_n$ (buts locaux/visiteurs du $i$-ème match), réalisation de $(L_1,V_1,\dots,L_n,V_n)$ à valeurs dans $\mathbb{N}^{2n}$ muni de la tribu des parties. Densité (par rapport à la mesure de comptage) :
$$(\ell_1,v_1,\dots,\ell_n,v_n)\mapsto\tilde p_\theta(\ell_1,v_1,\dots,\ell_n,v_n):=\prod_{k=1}^n\Big(\frac{\lambda_1^{\ell_k}\lambda_2^{v_k}}{\ell_k!\,v_k!}\exp(-\lambda_1-\lambda_2)\Big),\qquad\theta:=(\lambda_1,\lambda_2).$$
Modèle : $\big(\mathbb{N}^{2n},\mathcal{P}(\mathbb{N}^{2n}),\{\tilde p_\theta\cdot\mu^{\otimes2},\ \theta\in\mathbb{R}_+^\ast\times\mathbb{R}_+^\ast\}\big)$ (notation du corrigé ; la mesure est la mesure de comptage sur $\mathbb{N}^{2n}$).
7. Estimateur des moments (qui coïncide avec le MV) : $\hat\lambda_{1,n}:=\frac1n\sum_kL_k$, $\hat\lambda_{2,n}:=\frac1n\sum_kV_k$ ; numériquement $\hat\lambda_1=1.468$, $\hat\lambda_2=1.055$. L'hypothèse poissonienne est discutable car la **variance des données est supérieure à la moyenne** dans les trois cas (locaux, visiteurs, total) alors que Poisson impose variance = moyenne (**sur-dispersion**).
   *Remarque du corrigé — identifiabilité* : si l'on n'avait collecté que les totaux $(\ell_1+v_1,\dots,\ell_n+v_n)$, le modèle serait $\mathbb{N}^n$ (tribu des parties), $\tilde\theta=(\lambda_1,\lambda_2)\in\mathbb{R}_+^\ast\times\mathbb{R}_+^\ast$, densité $(s_1,\dots,s_n)\mapsto\exp(-(\lambda_1+\lambda_2)n)\prod_{k=1}^n\frac{(\lambda_1+\lambda_2)^{s_k}}{s_k!}$ : la loi ne dépend de $(\lambda_1,\lambda_2)$ que par $\lambda_1+\lambda_2$ — modèle **non identifiable** ; on peut estimer la somme mais pas chaque paramètre.
8. *Loi mélange (complément du corrigé)* : soient $f_0\,\mathrm{d}\nu_0$, $f_1\,\mathrm{d}\nu_1$ deux lois et $\pi\in\,]0,1[$. Une v.a. de loi $(1-\pi)f_0\,\mathrm{d}\nu_0+\pi f_1\,\mathrm{d}\nu_1$ a même loi que $(1-U)V+UW$ avec $U,V,W$ **indépendantes**, $V\sim f_0\,\mathrm{d}\nu_0$, $W\sim f_1\,\mathrm{d}\nu_1$, $U\sim\mathcal{B}\mathrm{er}(\pi)$. En effet, pour $h$ mesurable bornée,
$$\begin{aligned}\mathbb{E}[h((1-U)V+UW)]&=\mathbb{E}[h(V)\mathbb{1}_{U=0}]+\mathbb{E}[h(W)\mathbb{1}_{U=1}]\\&=(1-\pi)\int h(x)f_0(x)\,\mathrm{d}\nu_0(x)+\pi\int h(x)f_1(x)\,\mathrm{d}\nu_1(x).\end{aligned}$$
« Avec probabilité $1-\pi$, $X=V$ ; avec probabilité $\pi$, $X=W$. » Ici $V=0$ (Dirac en 0) et $W\sim$ Poisson$(\lambda)$ : tirer $U\sim\mathcal{B}\mathrm{er}(\pi)$ (par ex. $U=\mathbb{1}_{\{\text{unif}\le\pi\}}$) ; si $0$, retourner $0$ ; si $1$, retourner un tirage de Poisson$(\lambda)$. Généralisation : $\sum_{i=1}^I\alpha_if_i\,\mathrm{d}\nu_i$, $\alpha_i\ge0$, $\sum\alpha_i=1$.
9. Avec $X\overset{\mathcal{L}}{=}(1-U)V+UW$, **par indépendance** : $\mathbb{E}[X]=\mathbb{E}[1-U]\mathbb{E}[V]+\mathbb{E}[U]\mathbb{E}[W]=0+\pi\lambda$ ; $\mathbb{E}[X^2]=\mathbb{E}[U^2W^2]=\mathbb{E}[U^2]\mathbb{E}[W^2]=\pi\lambda(1+\lambda)$.
10. **Méthode des moments** : $S_{1,n}:=\frac1n\sum_kX_k$, $S_{2,n}:=\frac1n\sum_kX_k^2$ ; résoudre $S_{1,n}=\pi\lambda$, $S_{2,n}=\pi\lambda(1+\lambda)$, $\pi\in\,]0,1[$, $\lambda>0$ :
$$\check\lambda_n:=\frac{S_{2,n}}{S_{1,n}}-1=\frac{S_{2,n}-S_{1,n}}{S_{1,n}},\qquad\hat\pi_n:=\frac{S_{1,n}^2}{S_{2,n}-S_{1,n}},$$
à condition qu'ils soient dans $\mathbb{R}_+^\ast$ et $]0,1[$. Les $X_k$ étant entiers, $S_{2,n}\ge S_{1,n}$ ; de plus $\mathbb{P}_{n,(\pi,\lambda)}(S_{2,n}=S_{1,n})=\mathbb{P}(X_i\le1\ \forall i)=\big((1-\pi)+\pi e^{-\lambda}(1+\lambda)\big)^n$, sommable en $n$, donc (Borel–Cantelli) $S_{2,n}-S_{1,n}>0$ p.s. pour $n$ assez grand : $\check\lambda_n>0$, $0<\hat\pi_n<\infty$. En revanche, $\hat\pi_n<1$ ssi $S_{2,n}-S_{1,n}^2>S_{1,n}$, i.e. ssi **variance empirique > moyenne empirique** — vrai sur ces données (c'est la raison du modèle). Application numérique (équipe locale) : $s_{1,n}=1.468$, $s_{2,n}=1.617+1.468^2$, $\check\lambda_n=1.5695$, $\hat\pi_n=0.9353$. Figure 6 du corrigé : distribution empirique, Poisson(1.468) et mélange $(1-\hat\pi_n)\delta_0+\hat\pi_n\mathcal{P}(\check\lambda_n)$ pour $k=0,\dots,4$.

**Méthodes mobilisées :** fonction génératrice (caractérisation de loi, moments par dérivation) ; stabilité de Poisson par somme indépendante ; modèle induit ; maximum de vraisemblance par annulation de la dérivée ; méthode des moments (ordre 1, ordre 2, système à deux équations) ; modèle produit ; non-identifiabilité ; loi de mélange et simulation ; diagnostic de sur-dispersion ; Borel–Cantelli.

---

### Exercice 6 — Prix d'un actif financier ($\star\star\star$, bonus)
**Source :** Poly ch.1, Exercices, Exercice 6, p. 40–41 ; corrigé : Corrigé PC1, §2.6, p. 23–25. **Objectif :** modèle de Black–Scholes–Merton ; critique de modèle (asymétrie, kurtosis).

**Énoncé complet.** Soit $X$ v.a. réelle d'espérance $\mu$ et d'écart-type $\sigma$. Si $\mathbb{E}[\lvert X\rvert^3]<\infty$, le **coefficient d'asymétrie** est
$$\gamma_1=\mathbb{E}\Big[\Big(\frac{X-\mu}\sigma\Big)^3\Big]=\frac{\mu_3}{\mu_2^{3/2}},$$
$\mu_i$ moments centrés d'ordre $i$. Si $\mathbb{E}[X^4]<\infty$, le **kurtosis non normalisé** (coefficient d'aplatissement) est
$$\beta_2=\mathbb{E}\Big[\Big(\frac{X-\mu}\sigma\Big)^4\Big]=\frac{\mu_4}{\mu_2^2},$$
et l'**excès de kurtosis** est $\gamma_2=\beta_2-3$.
On observe $p_1,\dots,p_n$ (prix de clôture journalier d'un actif), réalisation de $(P_1,\dots,P_n)$. Log-rendement : $X_k:=\log(P_k/P_{k-1})$. Modèle de Black, Scholes, Merton (Nobel 1997) : (i) les log-rendements $\{X_i,\ i\ge1\}$ sont i.i.d. ; (ii) gaussiens de moyenne $\mu$ et variance $\sigma^2$ inconnues. On souhaite estimer $\mu,\sigma^2$.
1. Proposer un modèle statistique des log-rendements.
2. Proposer un estimateur de $\mu$ et $\sigma^2$.
3. On superpose l'histogramme des observations et la densité gaussienne de paramètres estimés (figure : Apple Computer 2015, prix et log-rendements journaliers). Peut-on être satisfait ? Qu'observe-t-on ?
4. Pour $X\sim\mathcal{N}(\mu,\sigma^2)$ : a) montrer que le coefficient d'asymétrie est nul ; b) calculer $\mathbb{E}[e^{tX}]$ pour tout $t$ ; en identifiant les premiers termes du développement de $\log\mathbb{E}[e^{tX}]$, montrer que l'excès de kurtosis est nul.
5. Proposer un estimateur empirique du coefficient d'asymétrie et de l'excès de kurtosis.
6. Sur la série des log-rendements : $-0.0707$ pour l'asymétrie et $1.274035$ pour l'excès de kurtosis. Le modèle vous semble-t-il acceptable ?
7. Modèle ARCH(1) de R. Engle (Nobel 2003) : $X_k=\sqrt{\alpha_0+\alpha_1X_{k-1}^2}\,Z_k$, $X_0=0$, avec $\alpha_0>0$, $\alpha_1\ge0$, $\{Z_k\}_{k=1}^n$ i.i.d. $\mathcal{N}(0,1)$. Définir le modèle statistique associé.

**Corrigé (Corrigé PC1).**
*Complément — cumulants* : asymétrie positive $\Rightarrow$ queue plus étalée à droite. Les cumulants $(\kappa_k)$ sont les coefficients de $\ln\mathbb{E}[\exp(tX)]=\sum_{k\ge1}\frac{\kappa_k}{k!}t^k$ ; relations : $\mu_1(=\mu)=\kappa_1$, $\mu_2(=\sigma^2)=\kappa_2$, $\mu_3=\kappa_3$, $\mu_4=\kappa_4+3\kappa_2^2=\kappa_4+3\mu_2^2$. Donc $\gamma_2=\frac{\mu_4}{\mu_2^2}-3=\frac{\kappa_4}{\kappa_2^2}$. Par Cauchy–Schwarz, $\mu_4>\mu_2^2$ donc $\gamma_2>-2$. $\gamma_2=0$ (gaussienne) : « queues plates » ; $\gamma_2>0$ : **leptokurtique** (queues épaisses) ; $\gamma_2<0$ : platikurtique (queues légères).
1. $(x_1,\dots,x_n)$ réalisation de $Z:=(X_1,\dots,X_n)$ à valeurs dans $\mathbb{R}^n$, tribu borélienne $\mathcal{B}(\mathbb{R}^n)$, famille $\{p_\theta\cdot\mathrm{Leb}^{\otimes n},\ \theta\in\Theta\}$, $\theta:=(\mu,\sigma^2)$, $\Theta:=\mathbb{R}\times\mathbb{R}_+^\ast$ (le corrigé écrit $\mathbb{R}\times\mathbb{R}_+$),
$$p_\theta(x_1,\dots,x_n):=\prod_{k=1}^n\frac1{\sqrt{2\pi}\,\sigma}\exp\Big(-\frac12\frac{(x_k-\mu)^2}{\sigma^2}\Big).$$
2. Moments d'ordre 1 et 2, ou MV : même estimateur
$$\hat\theta_n=\begin{pmatrix}\hat\mu_n\\\hat\sigma_n^2\end{pmatrix}:=\begin{pmatrix}n^{-1}\sum_{k=1}^nX_k\\n^{-1}\sum_{k=1}^n(X_k-\hat\mu_n)^2\end{pmatrix}.$$
3. Modèle discutable : histogramme à **queues plus lourdes** que la gaussienne ; symétrie peu convaincante.
4. a) $(X-\mu)/\sigma\sim\mathcal{N}(0,1)$ ; par **symétrie** de la gaussienne centrée, $\gamma_1\propto\int_{\mathbb{R}}x^3e^{-x^2/2}\,\mathrm{d}x=0$ (le corrigé écrit $e^{-x^2}$, sans effet sur la nullité). b) $\mathbb{E}[\exp(tX)]=\exp(t\mu+\frac12t^2\sigma^2)$, donc $\ln\mathbb{E}[\exp(tX)]=t\mu+\frac12t^2\sigma^2$ : $\kappa_1=\mu$, $\kappa_2=\sigma^2$, $\kappa_q=0$ pour $q\ge3$ ; donc $\gamma_2=\kappa_4/\kappa_2^2=0$.
5. Remplacer les moments exacts par les moments empiriques, $\hat\mu_n:=n^{-1}\sum_kX_k$ :
$$\hat\gamma_{1,n}:=\Big(\frac1n\sum_{k=1}^n(X_k-\hat\mu_n)^2\Big)^{-3/2}\Big(\frac1n\sum_{k=1}^n(X_k-\hat\mu_n)^3\Big),\qquad\hat\gamma_{2,n}:=\Big(\frac1n\sum_{k=1}^n(X_k-\hat\mu_n)^2\Big)^{-2}\Big(\frac1n\sum_{k=1}^n(X_k-\hat\mu_n)^4\Big)-3.$$
6. L'excès de kurtosis semble **significativement différent de 0, et positif** : confirme des queues plus lourdes que la gaussienne. Il est conseillé d'envisager un autre modèle.
7. $(x_1,\dots,x_n)$ réalisation de $Z=(X_1,\dots,X_n)$ dans $\mathbb{R}^n$, tribu borélienne, famille $\{\tilde p_\theta\cdot\mathrm{Leb}^{\otimes n},\ \theta\in\Theta\}$, $\theta:=(\alpha_0,\alpha_1)$ (le corrigé prend $\Theta:=\mathbb{R}_+^\star\times\mathbb{R}_+^\star$ alors que l'énoncé autorise $\alpha_1=0$), avec ($x_0=0$)
$$\tilde p_\theta(x_1,\dots,x_n):=\prod_{k=1}^n\frac1{\sqrt{2\pi}}\frac1{\sqrt{\alpha_0+\alpha_1x_{k-1}^2}}\exp\Big(-\frac12\frac{x_k^2}{\alpha_0+\alpha_1x_{k-1}^2}\Big).$$
Justification (« écriture sans rigueur » selon le corrigé) : les $X_k$ ne sont **pas indépendantes** ; la loi de $(X_1,\dots,X_n)$ est le produit de la loi de $(X_1,\dots,X_{n-1})$ et de la loi conditionnelle de $X_n$ sachant $(X_1,\dots,X_{n-1})$ ; par récurrence, produit des lois conditionnelles. Les $Z_k$ sont indépendantes et $X_{k-1}$ est fonction de $Z_1,\dots,Z_{k-1}$, donc $Z_k$ est indépendante de $X_{k-1}$ ; la loi conditionnelle de $X_k$ sachant $(X_1,\dots,X_{k-1})$ est donc celle sachant $X_{k-1}$ : $\mathcal{N}(0,\alpha_0+\alpha_1X_{k-1}^2)$.

**Méthodes mobilisées :** modèle gaussien i.i.d. ; méthode des moments / MV ; critique de modèle (histogramme vs densité ajustée) ; symétrie ; fonction génératrice des cumulants ; estimateurs empiriques de moments d'ordre 3 et 4 (plug-in) ; densité d'un modèle dépendant par conditionnements successifs (modèle markovien).

---

### Exercice 7 — Sur l'identifiabilité des lois de mélange gaussien et Poisson ($\star\star\star$, bonus)
**Source :** Poly ch.1, Exercices, Exercice 7, p. 41 ; corrigé : Corrigé PC1, §2.7, p. 26–27. **Objectif :** modèle de mélange et transformée de Fourier. Prérequis : fonctions caractéristiques, familles libres. Complète rigoureusement l'Ex. 1.7.

**Énoncé complet.** Simplexe des probabilités $\mathcal{S}:=\big\{(\alpha_1,\dots,\alpha_K)\in(\mathbb{R}_+)^K:\ \sum_{i=1}^K\alpha_i=1\big\}$ ; $\mathcal{M}:=\big\{\mu=(\mu_1,\dots,\mu_K)\in\mathbb{R}^K:\ \mu_1<\mu_2<\dots<\mu_K\big\}$.
1. Démontrer que pour tout $(\mu_1,\dots,\mu_K)\in\mathcal{M}$, la famille de fonctions $\big(t\mapsto e^{it\mu_j}\big)_{1\le j\le K}$ est libre.

Pour $\alpha\in\mathcal{S}$, $\mu\in\mathcal{M}$, on considère la loi de densité par rapport à $\mathrm{Leb}$
$$f_{\alpha,\mu}(x)=\frac1{\sqrt{2\pi}}\sum_{k=1}^K\alpha_ke^{-(x-\mu_k)^2/2}.$$
2. Démontrer que le modèle de mélange gaussien $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{f_{\alpha,\mu}\cdot\mathrm{Leb}:\ (\alpha,\mu)\in\mathcal{S}\times\mathcal{M}\})$ est identifiable. Rappel : pour $X\sim\mathcal{N}(0,1)$, $\mathbb{E}[e^{itX}]=e^{-t^2/2}$.

Loi de Poisson de paramètre $\mu$ : densité $\{p_\mu(n):=e^{-\mu}\frac{\mu^n}{n!},\ n\in\mathbb{N}\}$ par rapport à la mesure de comptage $\nu$ ; fonction caractéristique $\Phi_{p_\mu}(t)=\exp[\mu(e^{it}-1)]$. Densité de mélange poissonien : $q_{\alpha,\mu}(n)=\sum_{k=1}^K\alpha_kp_{\mu_k}(n)$.
3. Démontrer que le modèle de mélange poissonien $(\mathbb{N},\mathcal{P}(\mathbb{N}),\{q_{\alpha,\mu}\cdot\nu,\ (\alpha,\mu)\in\mathcal{S}\times\mathcal{M}\})$ est identifiable.

**Corrigé (Corrigé PC1).**
1. Soient $\beta=(\beta_1,\dots,\beta_K)$ tels que $\forall t\in\mathbb{R}$, $\sum_{k=1}^K\beta_ke^{i\mu_kt}=0$ (4). Soit $f:t\mapsto\sum_k\beta_ke^{i\mu_kt}$ ; $\forall j\in\mathbb{N}$, $f^{(j)}(t)=\sum_k\beta_k(i\mu_k)^je^{i\mu_kt}=i^j\sum_k\beta_k\mu_k^je^{i\mu_kt}$. $f$ étant nulle, ses dérivées le sont, en particulier en $t=0$ : $\forall j\in\{0,\dots,K-1\}$, $\sum_{k=1}^K\beta_k\mu_k^j=0$. Système de **Vandermonde** $V\beta=0$,
$$V:=\begin{pmatrix}1&\cdots&1\\\mu_1&\cdots&\mu_K\\\vdots&&\vdots\\\mu_1^{K-1}&\cdots&\mu_K^{K-1}\end{pmatrix},$$
inversible dès que les $\mu_k$ sont deux à deux distincts (vrai car $\mu\in\mathcal{M}$) : $\beta=0$, la famille est libre.
2. Si $X\sim f_{\alpha,\mu}\cdot\mathrm{Leb}$ (mélange), $\mathbb{E}_{\alpha,\mu}[\exp(itX)]=\sum_k\alpha_k\mathbb{E}[\exp(itY_k)]=\sum_k\alpha_k\exp(it\mu_k-0.5t^2)$, $Y_k\sim\mathcal{N}(\mu_k,1)$. Si $f_{\alpha,\mu}=f_{\tilde\alpha,\tilde\mu}$, les **fonctions caractéristiques** sont égales ; en simplifiant par $e^{-0.5t^2}$ : $\sum_k\alpha_k\exp(it\mu_k)-\sum_k\tilde\alpha_k\exp(it\tilde\mu_k)=0$. Par la question 1 (appliquée à l'ensemble des valeurs distinctes parmi les $\mu_k,\tilde\mu_j$) : s'il existe $i,j$ avec $\mu_i=\tilde\mu_j$ alors $\alpha_i=\tilde\alpha_j$ ; pour tout $i$ tel que $\mu_i\ne\tilde\mu_j$ pour tout $j$, $\alpha_i=0$ — ce qui contredit la condition « les composantes de $\alpha$ sont strictement positives ». Seul le premier cas se produit, et (les $\mu$ étant ordonnés) $\alpha=\tilde\alpha$, $\mu=\tilde\mu$.
3. F.c. de la loi de Poisson, calcul direct : $\mathbb{E}[e^{itX}]=e^{-\mu}\sum_{k\ge0}\frac{(\mu e^{it})^k}{k!}=e^{\mu[e^{it}-1]}$. Si $q_{\alpha,\mu}=q_{\tilde\alpha,\tilde\mu}$ (même $K$, composantes de $\alpha,\tilde\alpha$ non nulles) : $\forall t$, $\sum_k\alpha_ke^{\mu_k[e^{it}-1]}=\sum_k\tilde\alpha_ke^{\tilde\mu_k[e^{it}-1]}$. On montre que $(t\mapsto e^{\mu[e^{it}-1]})_\mu$ est une **famille libre** : pour $\mu_1<\dots<\mu_s$ et $f(t)=\sum_{k=1}^s\beta_ke^{\mu_k[e^{it}-1]}\equiv0$, on a $f(0)=\sum_k\beta_k=0$, $f'(t)=\sum_k\beta_k\mu_kie^{it}e^{\mu_k[e^{it}-1]}$ donc $f'(0)$ proportionnel à $\sum_k\beta_k\mu_k=0$, puis $f^{(2)}(0)$ fait apparaître $\sum_k\beta_k\mu_k^2$, et **par récurrence** $\sum_{k=1}^s\beta_k\mu_k^j=0$ pour tout $j$ (le corrigé écrit $f^{(j)}(0)=\sum_k\beta_k\mu_k^j$ en omettant les facteurs $i^j$ et les termes de degré inférieur, qui s'annulent par récurrence). Système de Vandermonde : $\beta=0$. D'où l'identifiabilité.

*Points d'attention (extracteur) :* $\mathcal{S}$ autorise des $\alpha_k=0$, auquel cas $\mu_k$ n'est pas identifiable ; le corrigé utilise implicitement $\alpha_k>0$ (« composantes strictement positives »). Il faut donc lire l'identifiabilité sur $\{\alpha\in\mathcal{S}:\ \alpha_k>0\ \forall k\}\times\mathcal{M}$.

**Méthodes mobilisées :** identifiabilité via la fonction caractéristique (qui caractérise la loi) ; liberté d'une famille d'exponentielles par dérivations successives en 0 ; déterminant de Vandermonde ; restriction de l'espace des paramètres (ordre $\mu_1<\dots<\mu_K$) pour lever le « label switching ».

---

## 5. Hors programme / compléments

> **Hors programme d'examen** (« Les contenus de cette partie ne sont pas exigibles ; ils enrichissent la culture statistique et préparent certains chapitres ultérieurs », Poly ch.1, §4, p. 42). Extraction concise : titre, idée, résultat principal.

### Exemples introductifs supplémentaires (p. 42–44)
- **Exemple 4.1 — Sondage** (p. 42). Élection A/B, $n$ votants interrogés ($n$ petit devant le nombre total de votants), $n_A+n_B=n$. Questions : proportion de votants pour A ? peut-on affirmer que A ou B a gagné au vu de $n_A,n_B$ ? comment quantifier l'erreur de décision ? Modèle avec remise : Ex. 1.4 ; sans remise : loi hypergéométrique ci-dessous.
- **Exemple 4.2 — Reconstruction d'un signal** (p. 42–43). Observations bruitées $y_k\approx f(kT_e)$, $k=1,\dots,n$, $n:=\lfloor T/T_e\rfloor$ ; on cherche $t\mapsto\hat f(t;\{y_k\}_{k=1}^n)$ proche de $f$. Difficulté : période d'échantillonnage, rapport signal/bruit, « complexité » de $f$ (constante ou affine plus facile qu'irrégulière). Illustration : accélération de la tête après un impact. Extension 2D : image $f$ sur $[0,1]^2$, $n=N^2$ pixels $y_{k,\ell}$ mesures bruitées de $f(k/N,\ell/N)$, niveaux de gris dans $\{0,\dots,M-1\}$.
- **Exemple 4.3 — Modèle gaussien pour la reconstruction de signal** (p. 43). $f(t)=\sum_{k=1}^p\beta_k\phi_k(t)$ (fonctions de base connues), erreurs gaussiennes centrées de variance $\sigma^2$ ; $\theta=(\beta_1,\dots,\beta_p,\sigma^2)\in\Theta:=\mathbb{R}^p\times\mathbb{R}_+^\ast$ ; modèle $\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{p_\theta\cdot\mathrm{Leb}^{\otimes n},\ \theta\in\Theta\}\big)$ avec
$$p_\theta(x_1,\dots,x_n):=(2\pi\sigma^2)^{-n/2}\exp\Big(-\frac1{2\sigma^2}\sum_{i=1}^n\Big(x_i-\sum_{k=1}^p\beta_k\phi_k(iT_e)\Big)^2\Big),$$
i.e. loi gaussienne sur $\mathbb{R}^n$ d'espérance $(\mu_1(\theta),\dots,\mu_n(\theta))$, $\mu_i=\sum_{\ell=1}^p\beta_\ell\phi_\ell(iT_e)$, covariance $\sigma^2\mathrm{I}_{n\times n}$.
- **Exemple 4.4 — Influence d'une variable sur une autre** (p. 43–44). Qualité $y_i$ d'un greffon de rein vs âge $x_i$ du donneur (données Dr. B. Myers, Stanford). Modèle : $y_i$ observation bruitée de $f(x_i)$, $f$ inconnue (régression) ; $x_i\in\mathbb{R}^k$ possible ; information a priori $f(x)=t(\theta^\top x)$, $t$ connue ; $t(z)=z$ : régression linéaire. Cas d'une réponse qualitative (risque d'infarctus selon tabac, alcool, cholestérol…).

### Sondage sans remise et loi hypergéométrique (p. 44–45)
**Idée :** population de $N$ individus, $N\theta$ votent A, $\theta\in\Theta:=\{k/N,\ k\in\{0,\dots,N\}\}$ ; tirage de $n$ individus **sans replacement** ; $\mathsf{Z}:=\{0,\dots,n\}$, $\mathcal{Z}:=\mathcal{P}(\mathsf{Z})$.
**Résultat :**
$$\mathbb{P}_\theta(\{k\})=\begin{cases}\dfrac{\binom{N\theta}{k}\binom{N-N\theta}{n-k}}{\binom Nn}&\text{si }k\in\{\max(n-N(1-\theta),0),\dots,\min(N\theta,n)\},\\[2mm]0&\text{sinon,}\end{cases}$$
loi **hypergéométrique** $\mathrm{Hyper}(N\theta,N,n)$ (choisir $k$ parmi $N\theta$, puis $n-k$ parmi $N(1-\theta)$, divisé par le nombre de façons de choisir $n$ parmi $N$).

### Données censurées (p. 45–46)
- **Exemple 4.5 — Contrôle de qualité, données censurées.** $n$ appareils en parallèle, instants de panne $x_1,\dots,x_n$ ; objectifs : garantir avec une probabilité donnée un fonctionnement au-delà de $T$, donner une valeur « représentative » de la durée de vie. Si l'on fixe un horizon $\tau$, on observe $x_i^\star=\min\{x_i,\tau\}$ ; question : quantifier la perte d'information.
- **Exemple 4.6 — Modèle exponentiel censuré.** $q_\theta(x):=\theta e^{-\theta x}\mathbb{1}_{\mathbb{R}_+}(x)$ (2) ; $n$-échantillon $\big(\mathbb{R}_+^n,\mathcal{B}(\mathbb{R}_+^n),\{q_\theta^{\otimes n}\cdot\mathrm{Leb}^{\otimes n},\ \theta\in\Theta\}\big)$, $q_\theta^{\otimes n}(x_1,\dots,x_n)=\prod_iq_\theta(x_i)$. Statistiques censurées $X_i^\ast:=\min(X_i,\tau)$, loi $Q_\theta^\ast:=Q_\theta^{X_i^\ast}$ ; modèle induit $([0,\tau],\mathcal{B}([0,\tau]),\{Q_\theta^\ast,\ \theta\in\Theta\})$.
**Résultat principal :** $Q_\theta^\ast$ **n'est pas absolument continue** par rapport à $\mathrm{Leb}$ (atome en $\tau$), mais la famille est **dominée par $\mu=\mathrm{Leb}+\delta_\tau$**, avec
$$q_\theta^\ast(x):=\theta e^{-\theta x}\mathbb{1}_{\{x<\tau\}}+c(\theta)\mathbb{1}_{\{x=\tau\}},\qquad c(\theta):=\int_\tau^{+\infty}\theta e^{-\theta t}\,\mathrm{d}t=e^{-\theta\tau}.$$
Le modèle induit par $(X_1^\ast,\dots,X_n^\ast)$ est $\big([0,\tau]^n,\mathcal{B}([0,\tau]^n),\{(q_\theta^\ast)^{\otimes n}\cdot\mu^{\otimes n},\ \theta\in\Theta\}\big)$, $n$-échantillon de $([0,\tau],\mathcal{B}([0,\tau]),\{q_\theta^\ast\cdot\mu,\ \theta\in\Theta\})$. (Animation : l'atome en $\tau$ grossit quand la censure devient plus sévère.)
**Méthodes :** loi image d'un minimum ; domination par une mesure mixte (Lebesgue + Dirac).

### Régression logistique (p. 46–47)
- **Exemple 4.7 — Régression logistique.** Bio-essai : doses $x_1<\dots<x_q$ injectées à des populations de $n_1,\dots,n_q$ souris ; $y_i$ = nombre de décès. $\mathrm{logit}(\pi)=\log\frac\pi{1-\pi}$ (croissante, limites $-\infty$ en $0^+$ et $+\infty$ en $1^-$). Lien linéaire dose / taux de mortalité :
$$\pi(\theta,x):=\frac{\exp(\theta_0+\theta_1x)}{1+\exp(\theta_0+\theta_1x)},\qquad\mathrm{logit}(\pi(\theta,x))=\theta_0+\theta_1x.$$
Modèle binomial par population $\mathcal{E}_i:=\big(\{0,\dots,n_i\},\mathcal{P}(\{0,\dots,n_i\}),\{\mathrm{Bin}(n_i,\pi(\theta,x_i)),\ \theta=(\theta_0,\theta_1)\in\Theta=\mathbb{R}^2\}\big)$ et modèle global
$$\Big(\prod_{i=1}^q\{0,\dots,n_i\},\ \mathcal{P}\Big(\prod_{i=1}^q\{0,\dots,n_i\}\Big),\ \Big\{\bigotimes_{i=1}^q\mathrm{Bin}(n_i,\pi(\theta,x_i)),\ \theta\in\Theta\Big\}\Big).$$
**Résultat :** sous $\mathbb{P}_\theta$, les observations $Y_1,\dots,Y_q$ sont indépendantes, $Y_i$ suit le modèle binomial $\mathcal{E}_i$ (indépendantes, **non identiquement distribuées**).

### Exemples détaillés développés en cours (annexe des slides) (p. 47–57)
Trois exemples : modèle de survie, régression sur données de température, systèmes de recommandation (corrigeant des coquilles des slides).

- **Exemple 4.8 — Modèle de survie** (p. 47). $n$-échantillon exponentiel : $q_\theta^{\otimes n}(x_1,\dots,x_n)=\theta^n\exp(-\theta\sum_ix_i)\mathbb{1}_{\mathbb{R}_+^n}(x_1,\dots,x_n)$ ; $X_i$, $X_j$ indépendantes ($i\ne j$), modèle induit par $X_i$ : $(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{q_\theta\cdot\mathrm{Leb}\})$. **Absence de mémoire** : $\mathbb{P}_\theta(X_1\ge a)=e^{-a\theta}$ donc $\mathbb{P}_\theta(X_1\ge a+b\mid X_1\ge a)=\frac{e^{-(a+b)\theta}}{e^{-a\theta}}=e^{-b\theta}=\mathbb{P}_\theta(X_1\ge b)$ : le modèle exponentiel **ne rend pas compte de l'usure**.
- **Lemme 4.1 — Moments de la loi exponentielle** (p. 48). Pour tout $\theta\in\mathbb{R}_+^\ast$, $k\in\mathbb{N}^\ast$ : $\mathbb{E}_\theta[X_1^k]=k!/\theta^k$. *Preuve* : $\mathbb{E}_\theta[e^{sX_1}]=\frac\theta{\theta-s}=\frac1{1-s/\theta}=\sum_{k\ge0}\frac{s^k}{\theta^k}$ pour $\lvert s\rvert<\theta$ ; interversion somme/espérance licite (domination par $e^{\lvert s\rvert X_1}$ intégrable), $\mathbb{E}_\theta[e^{sX_1}]=\sum_k\frac{s^k}{k!}\mathbb{E}_\theta[X_1^k]$ ; identification des coefficients des séries entières.
- **Estimateurs des moments** (p. 48). $e(\theta):=\int x\,Q_\theta(\mathrm{d}x)=1/\theta$, $\tilde e(\theta):=\int x^2\,Q_\theta(\mathrm{d}x)=2/\theta^2$. En égalant aux moments empiriques :
$$\hat\theta_{n,1}:=\frac1{\frac1n\sum_{i=1}^nX_i},\qquad\hat\theta_{n,2}:=\Big(\frac2{\frac1n\sum_{i=1}^nX_i^2}\Big)^{1/2}$$
(solutions uniques dans $\mathbb{R}_+^\ast$, les observations n'étant pas toutes nulles $\mathbb{P}_\theta$-p.s.). Simulation (boxplots, $\theta=1$) : les deux se concentrent autour de $\theta$, mais $\hat\theta_{n,2}$ est **nettement plus dispersé**.
- **Définition 4.1 — Lois Gamma** (p. 49). (i) $\mathrm{Gamma}(p)$ : densité $f_p(x):=\frac1{\Gamma(p)}e^{-x}x^{p-1}$, $x>0$ ; (ii) $\mathrm{Gamma}(p,\lambda)$ : loi de $Z/\lambda$, $\lambda$ = paramètre d'intensité (échelle $1/\lambda$), $p$ = forme, densité $f_{p,\lambda}(x)=\frac{\lambda^p}{\Gamma(p)}e^{-\lambda x}x^{p-1}$. Exponentielle = $\mathrm{Gamma}(1,\lambda)$. Pour $r>-p$, $\mathbb{E}[Z^r]=\Gamma(p+r)/\Gamma(p)$ (3), divergente si $r\le-p$ ; $\mathbb{E}[X^r]=\lambda^{-r}\Gamma(p+r)/\Gamma(p)$.
- **Lemme 4.2 — Convolution des lois Gamma** (p. 50). $X_i$ indépendantes $\mathrm{Gamma}(p_i,\lambda)$ $\Rightarrow$ $\sum_iX_i\sim\mathrm{Gamma}(\sum_ip_i,\lambda)$ (preuve par récurrence, fonction muette ; esquissée). En particulier $\mathcal{E}(\theta)\star\mathcal{E}(\theta)=\mathrm{Gamma}(2,\theta)$.
- **Proposition 4.1 — Biais et erreur quadratique du premier estimateur des moments** (p. 50). Sous $\mathbb{P}_\theta$, $\sum_{i=1}^nX_i\sim\mathrm{Gamma}(n,\theta)$ ; pour $n\ge2$, $\mathbb{E}_\theta[\hat\theta_{n,1}]=\frac n{n-1}\theta$ ; pour $n\ge3$,
$$\mathbb{E}_\theta[(\hat\theta_{n,1}-\theta)^2]=\frac{n+2}{(n-1)(n-2)}\theta^2.$$
*Preuve (étapes)* : $Y:=\sum X_i\sim\mathrm{Gamma}(n,\theta)$ (Lemme 4.2), densité $\frac{\theta^n}{(n-1)!}e^{-\theta y}y^{n-1}$ ; $\hat\theta_{n,1}=n/Y$ ; transfert : $\mathbb{E}_\theta[n/Y]=\frac{n\theta^n(n-2)!}{(n-1)!\,\theta^{n-1}}=\frac n{n-1}\theta$ (intégrale divergente pour $n=1$ : $\mathbb{E}_\theta[\hat\theta_{1,1}]=+\infty$) ; $\mathbb{E}_\theta[\hat\theta_{n,1}^2]=\frac{n^2}{(n-1)(n-2)}\theta^2$ ; via (3), $\mathbb{E}_\theta[Y^{-k}]=\theta^k\Gamma(n-k)/\Gamma(n)$ fini ssi $n>k$ ; développement du carré : $\theta^2\frac{n^2-2n(n-2)+(n-1)(n-2)}{(n-1)(n-2)}=\frac{n+2}{(n-1)(n-2)}\theta^2$.
**Remarque :** $\hat\theta_{n,1}$ est **biaisé** (biais $\theta/(n-1)>0$, tend vers 0) ; $(n-1)/\sum_iX_i$ est **sans biais** ; l'erreur relative $\frac{n+2}{(n-1)(n-2)}$ ne dépend pas de $\theta$.
- **Exemple 4.9 — Construction du modèle (anomalies de température, NASA GISS, 1880–2022)** (p. 51). Observations $x_i$ = anomalie de l'année d'indice $i$, $t(i)$ = année ; densité
$$p_{\beta,\sigma^2}(x_1,\dots,x_n):=\prod_{i=1}^n\frac1{\sqrt{2\pi\sigma^2}}\exp\Big(-\frac1{2\sigma^2}\{x_i-m(\beta,i)\}^2\Big),$$
$\theta:=(\beta,\sigma^2)\in\Theta:=\mathbb{R}^p\times\mathbb{R}_+^\ast$, $i\mapsto m(\beta,i)$ tendance donnée. Hypothèses : (i) indépendance, (ii) gaussianité de variance $\sigma^2$, (iii) moyenne $m(\beta,i)$ ; i.e. $X_i=m(\beta,i)+\varepsilon_i$, $\varepsilon_i$ i.i.d. $\mathcal{N}(0,\sigma^2)$. Discussion : homoscédasticité ? gaussianité ? indépendance (série chronologique) ?
- **Exemple 4.10 — Tendance linéaire** (p. 52). $m(\beta,i):=\beta_0+\beta_1t(i)$ ; $\hat\beta:=\arg\min_{\beta\in\mathbb{R}^2}\sum_i(X_i-\beta_0-\beta_1t(i))^2$ ; $\hat\sigma^2:=(n-2)^{-1}\sum_i(X_i-\hat\beta_0-\hat\beta_1t(i))^2$. En gaussien, moindres carrés = maximum de vraisemblance en $\beta$ ($\log p=-\frac n2\log(2\pi\sigma^2)-\frac1{2\sigma^2}\sum_i(\cdots)^2$) ; $\hat\sigma^2_{\mathrm{MV}}=n^{-1}\sum_i(\cdots)^2=\frac{n-2}n\hat\sigma^2$ ; la normalisation par $n-2$ (observations moins coefficients estimés) rend $\hat\sigma^2$ sans biais.
- **Proposition 4.2 — Solution explicite des moindres carrés** (p. 52–53). Si les dates ne sont pas toutes égales :
$$\hat\beta_1=\frac{\sum_{i=1}^n(t(i)-\bar t)(X_i-\bar X_n)}{\sum_{i=1}^n(t(i)-\bar t)^2},\qquad\hat\beta_0=\bar X_n-\hat\beta_1\bar t,\qquad\hat\beta=(\Phi^\top\Phi)^{-1}\Phi^\top X,\quad\Phi:=\begin{pmatrix}1&t(1)\\\vdots&\vdots\\1&t(n)\end{pmatrix};$$
condition $\Leftrightarrow$ $\Phi$ de rang 2 $\Leftrightarrow$ $\Phi^\top\Phi$ inversible ; $\hat\sigma^2=(n-2)^{-1}\|X-\Phi\hat\beta\|^2$. *Preuve* : $\beta\mapsto\|X-\Phi\beta\|^2$ convexe, gradient $-2\Phi^\top(X-\Phi\beta)$, strictement convexe si $\Phi^\top\Phi$ inversible ; équations normales $\Phi^\top\Phi\beta=\Phi^\top X$.
- **Proposition 4.3 — Lois des estimateurs** (p. 53). Sous $\mathbb{P}_{\beta,\sigma^2}$ : $\hat\beta\sim\mathcal{N}(\beta,\sigma^2(\Phi^\top\Phi)^{-1})$, $(n-2)\hat\sigma^2/\sigma^2\sim\chi^2(n-2)$, $\hat\beta$ et $\hat\sigma^2$ indépendants ; en particulier sans biais. Découle de **Cochran** (non redémontré) : $X\sim\mathcal{N}(\Phi\beta,\sigma^2\mathrm{I}_n)$, $\Phi\hat\beta$ projection sur $\mathrm{Im}\,\Phi$ (dimension 2), $X-\Phi\hat\beta$ projection sur l'orthogonal (dimension $n-2$). Application numérique : pente $\hat\beta_1=0{,}0072$ °C/an, écart-type estimé $0{,}0008$ ; IC à 95 % $\approx\hat\beta_1\pm1{,}96\,\mathrm{se}$, soit environ $[0{,}0056;0{,}0088]$. Les résidus présentent une structure (négatifs 1905–1930, 1950–1980 ; positifs aux extrémités et vers 1940) : tendance non linéaire.
- **Exemple 4.11 — Modèle avec rupture de pente** (p. 54–55). $m(\beta,i):=\beta_0+\beta_1t(i)+\beta_2(t(i)-t(\beta_3))\mathbb{1}_{\{i>\beta_3\}}$, $\beta\in\mathbb{R}^3\times\{1,\dots,n\}$ (affine par morceaux continue, pente $\beta_1$ puis $\beta_1+\beta_2$). Estimation en deux temps : (i) à $\beta_3$ fixé, moindres carrés linéaires explicites $\hat\beta(\beta_3)=(\Phi(\beta_3)^\top\Phi(\beta_3))^{-1}\Phi(\beta_3)^\top X$ (matrice $\Phi(\beta_3)$ de colonnes $1$, $t(i)$, $(t(i)-t(\beta_3))\mathbb{1}_{i>\beta_3}$, de rang 3 si au moins deux dates distinctes de part et d'autre) ; (ii) **vraisemblance profilée** : à $\beta_3$ fixé, le max vaut $(2\pi e\,\mathrm{RSS}(\beta_3)/n)^{-n/2}$, $\mathrm{RSS}(\beta_3):=\|X-\Phi(\beta_3)\hat\beta(\beta_3)\|^2$ ; donc $\hat\beta_3:=\arg\min_{\beta_3}\mathrm{RSS}(\beta_3)$ par énumération ; ici $\hat\sigma^2:=n^{-1}\sum_i(X_i-m(\hat\beta,i))^2$ (MV). Rupture estimée vers **1975** ; résidus sans structure.
- **Exemple 4.12 — Systèmes de recommandation : une formalisation statistique** (p. 56–57). $m_1$ utilisateurs, $m_2$ objets, matrice de notes $Y$ ($m_1\times m_2$), notes observées sur $I$, $n=\mathrm{card}(I)\ll m_1m_2$, notes dans $\{1,\dots,K\}$, indépendantes, loi catégorielle
$$\mathbb{P}_\theta(Y_{i,j}=\ell)=\frac{\exp(\theta_{i,j,\ell})}{\sum_{k=1}^K\exp(\theta_{i,j,k})},$$
convention $\theta_{i,j,K}=0$ (sinon **non identifiable** : translation par $c$) ; $\Theta=\mathbb{R}^{m_1\times m_2\times(K-1)}$ ; densité par rapport au comptage sur $\mathsf{Z}:=\{1,\dots,K\}^I$ : $p_\theta=\prod_{(i,j)\in I}\prod_{\ell=1}^K\big(\frac{\exp(\theta_{i,j,\ell})}{\sum_k\exp(\theta_{i,j,k})}\big)^{\mathbb{1}\{y_{i,j}=\ell\}}$. Trop de paramètres, et les $\theta_{i,j,\cdot}$ pour $(i,j)\notin I$ n'apparaissent pas : il faut une hypothèse de structure. Cas binaire $K=2$ : $\mathbb{P}_\theta(Y_{i,j}=1)=\frac{\exp(\theta_{i,j})}{1+\exp(\theta_{i,j})}$, hypothèse de **rang faible** $\theta=UV^\top$, $U\in\mathbb{R}^{m_1\times q}$, $V\in\mathbb{R}^{m_2\times q}$, $\theta_{i,j}=\langle u_i,v_j\rangle$ (facteurs latents) ; $q(m_1+m_2)$ paramètres à $q^2$ près (non-unicité $UV^\top=(UA)(V(A^{-1})^\top)^\top$, dimension $q(m_1+m_2)-q^2$) ; choix typique $q(m_1+m_2)\ll n\ll m_1m_2$. Seule $\theta$ (pas $(U,V)$) est identifiable. Recommandation : estimer $\theta$, imputer $\hat\theta_{i,j}=\langle\hat u_i,\hat v_j\rangle$ pour $(i,j)\notin I$, recommander les produits de plus forte probabilité (**filtrage collaboratif**).

### Pour aller plus loin : mesures de domination et modèles non dominés (p. 57–59)
**Idée :** si $\mathbb{P}_\theta=p_\theta\cdot\mu=q_\theta\cdot\nu$ ($\mu,\nu$ $\sigma$-finies), alors $\mu,\nu\ll\lambda:=\mu+\nu$ ; Radon–Nikodym donne $\mu=m\cdot\lambda$, $\nu=n\cdot\lambda$ ; $p_\theta m=q_\theta n$ $\lambda$-p.p. ; avec $\mathsf{Z}_0=\{m>0\}$, $\mu(\mathsf{Z}_0^c)=0$ donc $\mathbb{P}_\theta(\mathsf{Z}_0^c)=0$, et
$$p_\theta(z)=q_\theta(z)\frac{n(z)}{m(z)},\qquad\lambda\text{-p.p. sur }\mathsf{Z}_0:$$
**le facteur $n/m$ ne dépend pas de $\theta$**.
**Remarque (experte, pas du tout au programme) :** l'identité ne vaut que $\lambda$-p.p. ; l'invariance des points de maximum de la vraisemblance vaut pour des **versions fixées** des densités. Baraud & Birgé (*Rho-estimators revisited*, Ann. Statist. 46, 2018, prop. 1) : dans $\{\mathcal{N}(\theta,1),\ \theta\in\mathbb{R}\}$ dominé par $\mathcal{N}(0,1)$, des versions des densités modifiées au seul point $z=\theta$ font que l'EMV vaut $\max(X_1,\dots,X_n)$ avec probabilité tendant vers 1 : perte de consistance. Les **versions continues** des densités (utilisées dans tout le cours) écartent cette pathologie.
- **Exemple 4.13** (p. 58) : $\{\mathbb{P}_\theta=\delta_\theta,\ \theta\in\mathbb{R}\}$ (« expérience parfaite ») **n'est pas dominé** : sinon $\mu(\{\theta\})>0$ pour tout $\theta$, impossible car une mesure $\sigma$-finie a au plus un nombre dénombrable d'atomes. *Preuve de ce fait (par l'absurde)* : $\mathbb{R}=\bigcup_kF_k$, $\mu(F_k)<\infty$ ; si $I=\{\theta:\mu(\{\theta\})>0\}$ non dénombrable, un $I\cap F_n$ l'est, puis un $I_q=\{\theta\in I\cap F_n:\mu(\{\theta\})>1/q\}$ l'est ; pour $J\subset I_q$ de cardinal $N$, $\mu(F_n)\ge\mu(J)=\sum_{\theta\in J}\mu(\{\theta\})\ge N/q$ pour tout $N$ : $\mu(F_n)=\infty$, contradiction. (Le texte écrit $\ge N/p$ avec un indice incohérent.)
- **Exemple 4.14** (p. 59) : $\mathbb{P}_\theta=\sum_{k=1}^\infty e^{-k}\delta_{\theta k}$, $\theta\in\mathbb{R}_+\setminus\{0\}$ : loi non dégénérée, modèle **non dominé** (toute mesure dominante aurait une infinité non dénombrable d'atomes). *(Remarque de l'extracteur : $\sum_ke^{-k}=1/(e-1)\ne1$, la normalisation n'est pas explicitée dans le poly.)*

---

## 6. Liens avec les autres chapitres

**Prérequis (cours de probabilités) :** variable aléatoire, loi, espérance ; mesure produit, indépendance ; densité par rapport à une mesure ; théorème de transfert, fonction muette ; changement de variables ; fonctions caractéristique et génératrice ; loi des grands nombres (utilisée dans le corrigé de l'Exercice 3 et pour $t(r)\to\mathcal{N}(0,1)$).

**Ce que ce chapitre prépare :**
- **Chapitre 2 (estimation, cours 2–3)** : méthode des moments (déjà vue informellement : Bernoulli, réponses randomisées, $\hat\theta_{n,1}$, $\hat\theta_{n,2}$) et **maximum de vraisemblance** — la densité produit (1) d'un $n$-échantillon dominé est la vraisemblance $L_n$, $\ell_n=\log L_n$ ; la non-unicité de la mesure dominante ne change pas les maximiseurs ; l'**identifiabilité** est une hypothèse de base de la consistance de l'EMV ; biais, risque quadratique (Prop. 4.1).
- **Chapitre 3 (régions de confiance)** : Gosset (iv) — $T_n=\sqrt n(\bar X_n-\mu)/S_n\sim t(n-1)$ est la quantité pivotale de l'intervalle de Student ; $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$ pour l'intervalle sur $\sigma^2$ ; IC $\hat\beta_1\pm1{,}96\,\mathrm{se}$ (Prop. 4.3).
- **Chapitres 4–5 (tests)** : décision $\theta\in\Theta_0$ (§1.3) ; tests de Student et du $\chi^2$ reposent sur Gosset/Cochran ; $\chi^2$ non centré (Remarque après Prop. 2.9) pour la puissance.
- **Modèle linéaire gaussien (PC 2 et suite)** : Exercice 4, Ex. 4.9–4.11, Prop. 4.2–4.3 ; Cochran sur $\mathrm{Im}(\mathbf{X})\oplus\mathrm{Im}(\mathbf{X})^\perp$, estimateur des moindres carrés comme projection orthogonale, $\hat\sigma^2$ à $n-p$ degrés de liberté.
- **PC 4** : modèle uniforme et loi du maximum $X_{(n)}$ (Ex. 1.13).
- **Apprentissage / régression logistique** : Ex. 4.7, 4.12 (logit, filtrage collaboratif).

---

## 7. Idées de visualisations interactives pertinentes pour ce chapitre

1. **Ajuster un modèle aux données** (reprend l'animation du poly p. 10) : choisir Bernoulli / gaussien / exponentiel, régler les paramètres avec des curseurs, comparer histogramme simulé et histogramme « réel ».
2. **Mélange gaussien non identifiable** (Ex. 1.7) : curseurs $(\pi,\mu_1,\mu_2)$, bouton « échanger les composantes » montrant que $(1-\pi,\mu_2,\mu_1)$ donne exactement la même densité ; option « imposer $\mu_1<\mu_2$ ».
3. **Réponses randomisées** (§1.8) : curseurs $q$ et $n$, simulation répétée de $\hat\theta_n$, courbe de $q(1-q)/(n(2q-1)^2)$ qui explose en $q=1/2$ ; illustration de la confidentialité (probabilité qu'un « oui » soit vrai).
4. **Rotation d'un nuage gaussien** (Cochran) : nuage $\mathcal{N}(0,\mathrm{I}_2)$ et coordonnées dans une base tournée (corrélation empirique $\approx0$), à comparer à une covariance non isotrope (corrélation non nulle après rotation).
5. **Projection sur $\mathbb{R}\mathbf{1}_n$ en dimension 3** (Gosset) : vecteur $X\in\mathbb{R}^3$, sa projection $\bar X_n\mathbf{1}_3$ et le résidu orthogonal ; histogrammes simulés de $\bar X_n$, $(n-1)S_n^2/\sigma^2$ vs $\chi^2(n-1)$, et nuage $(\bar X_n,S_n^2)$ sans corrélation.
6. **Student seulement pour un bruit gaussien** : histogramme de $T_n$ sur échantillons répétés, bruit gaussien / exponentiel / uniforme, superposé à la densité $t(n-1)$, avec curseur $n$.
7. **Moyenne vs médiane** (Exercice 3) : boxplots des deux estimateurs pour bruit gaussien ou Laplace, $n$ variable (renverse la conclusion selon le bruit).
8. **Ellipses de densité gaussienne** (Prop. 2.7) : curseurs $\sigma_1,\sigma_2,\rho$, carte de densité, axes propres, covariance empirique de $X=AZ$.
9. **Changement de variable** : densité de $X$ et de $\phi(X)$ côte à côte pour $\phi$ affine, $x^2$ (deux branches $\to\chi^2(1)$), exponentielle…
10. **Censure** (Ex. 4.6) : histogramme de $\min(X_i,\tau)$ avec atome en $\tau$ qui grossit quand $\tau$ diminue.
11. **Football et sur-dispersion** (Exercice 5) : barres observées vs Poisson$(1.468)$ vs mélange zéro-enflé $(1-\hat\pi)\delta_0+\hat\pi\mathcal{P}(\check\lambda)$ avec curseurs $\pi,\lambda$.
12. **Rupture de pente** (Ex. 4.11) : courbe $\mathrm{RSS}(\beta_3)$ en fonction de l'année candidate et ajustement correspondant sur les anomalies de température.
