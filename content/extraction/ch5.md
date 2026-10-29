# Chapitre 5 — Optimalité en théorie des tests

> **Sources extraites :** `S5_APM41033-Week5-Cours` (poly p. 7–25), `S5_APM41033-Week5-Maths` (« Les outils mathématiques », §2, p. 26–28), `S5_APM41033-Week5-Exercices` (« Les exercices », §3, p. 29–46, **avec corrigés intégrés** p. 37–46), `S5_APM41033-Week5-Compléments` (« Les compléments », §4, p. 47–56, **hors programme d'examen**).
> **Numérotation du poly :** les éléments encadrés sont numérotés « N.M » où N est la *section* du chapitre : §1 « Les fondamentaux » (Définitions 1.1–1.5, **Cadre 1.1**, Théorèmes 1.1–1.4, **Méthodes 1.1–1.3**, Proposition 1.1, Exemples 1.1–1.6), §2 « Les outils mathématiques » (Proposition 2.1, Lemme 2.1), §3 « Les exercices » (Exercices 1–7, présentés dans l'ordre 1, 4, 5, 2, 3, 6, 7), §4 « Les compléments » (Définitions 4.1–4.3, Théorème 4.1, Proposition 4.1, Exemples 4.1–4.5). Les équations sont numérotées (1)–(11) sur tout le chapitre : (1) inégalité clé de Neyman-Pearson, (2) factorisation du rapport de vraisemblance monotone, (3) problème bilatéral de la Prop. 1.1, (4)–(9) dans les exercices, (10)–(11) dans les compléments. On cite donc « Poly ch.5, Th. 1.1 », « Poly ch.5, Déf. 1.4, éq. (2) ».
> **Types d'encadrés particuliers :** le poly utilise un encadré **Cadre** (Cadre 1.1 : absence d'atome) et des encadrés **Méthode** (1.1, 1.2, 1.3) ; ils sont conservés ici comme blocs à part, avec leur nom exact.
> **Démonstration du Théorème 1.3 :** seulement *esquissée* dans la partie Cours (p. 20) ; elle est écrite en entier dans les Compléments (p. 47–48). Elle est reproduite ci-dessous au §2 (bloc du Th. 1.3), avec mention de sa provenance, car le théorème est au programme.
> **Renvois internes au poly :** « Exercice 1 (PC5) » = Exercice 1 de la §3 de ce chapitre ; « exercice 1 de la PC 4 » = exercice du chapitre 4 ; « Exercice 3 (PC2) » = familles exponentielles (chapitre 2) ; « chapitre 4, Section 2.8 », « chapitre 3, Section 1.5 » = numérotation propre de ces chapitres ; « Section 4 » = Compléments de ce chapitre.
> **Pages :** pagination du poly complet (en-têtes de page), pas celle des PDF découpés (PDF Cours = p. 7–25, PDF Maths = p. 26–28, PDF Exercices = p. 29–46, PDF Compléments = p. 47–56).

---

## 0. Résumé en 10 lignes (ce qu'il faut retenir pour l'examen)

1. **Cadre** : fonction critique $\phi:\mathsf{Z}\to[0,1]$, **fonction puissance** $\beta_\phi(\theta)=\mathbb{E}_\theta[\phi(Z)]$, **taille** $\overline{\alpha}(\phi)=\sup_{\theta\in\Theta_0}\beta_\phi(\theta)$, **niveau** $\alpha$ si $\overline{\alpha}(\phi)\le\alpha$ ; $\mathcal{K}_\alpha(\Theta_0)$ = tests de niveau $\alpha$ (Déf. 1.1). Le niveau ne dépend **que** des lois de $\Theta_0$.
2. **U.P.P.($\alpha$)** (Déf. 1.2) : $\phi\in\mathcal{K}_\alpha(\Theta_0)$ et $\beta_\phi(\theta)=\sup_{\psi\in\mathcal{K}_\alpha(\Theta_0)}\beta_\psi(\theta)$ **pour tout** $\theta\in\Theta_1$ — même test optimal en chaque point de l'alternative.
3. **Rapport de vraisemblance** (Déf. 1.3) $r(z)=p_{\theta_1}(z)/p_{\theta_0}(z)$ ; on écrit les régions sous la forme $\{p_{\theta_1}(z)>c\,p_{\theta_0}(z)\}$. Hypothèse **d'absence d'atome** (Cadre 1.1) : $\mathbb{P}_\theta(p_{\theta_1}(Z)=c\,p_{\theta_0}(Z))=0$ pour tout $c\ge0$.
4. **Neyman-Pearson** (Th. 1.1) : il existe $c_\alpha>0$ tel que $\phi^\star=\mathbb{1}_{\{p_{\theta_1}>c_\alpha p_{\theta_0}\}}$ soit de **taille exactement** $\alpha$ (TVI sur la fonction de survie $\bar F$ de $r(Z)$ sous $\mathbb{P}_{\theta_0}$), et $\phi^\star$ est U.P.P.($\alpha$), avec $\mathbb{E}_{\theta_1}[\phi^\star(Z)]\ge\alpha$. Preuve = **inégalité clé** (1) $\{\phi^\star-\phi\}\{p_{\theta_1}-c_\alpha p_{\theta_0}\}\ge0$ intégrée.
5. **Unicité** (Th. 1.2) : tout test U.P.P.($\alpha$) vaut $1$ sur $\{p_{\theta_1}>c_\alpha p_{\theta_0}\}$ et $0$ sur $\{p_{\theta_1}<c_\alpha p_{\theta_0}\}$ $\nu$-p.p., donc $=\phi^\star$ $\mathbb{P}_{\theta_0}$- et $\mathbb{P}_{\theta_1}$-p.s.
6. **Méthode pratique** (Méth. 1.1–1.2) : calculer $r$, vérifier l'absence d'atome, écrire $r(Z)=\tilde r(T(Z))$ avec $\tilde r$ strictement monotone, puis trouver $d_\alpha$ avec $\mathbb{P}_{\theta_0}(T(Z)>d_\alpha)=\alpha$ — **le seuil se lit sous $H_0$** (piège : $X>z_{1-\alpha}-1$ et non $X>z_{1-\alpha}$ dans l'Ex. 1.1). Gaussien (Ex. 1.3) : $\phi^\star=\mathbb{1}_{\{\bar X_n>\mu_0+z_{1-\alpha}\sigma/\sqrt n\}}$, puissance $1-\Phi(z_{1-\alpha}-\sqrt n\,m/\sigma)$. La région de rejet n'est **pas toujours une queue** (Ex. 1.2 : variances différentes $\Rightarrow$ intervalle).
7. **Rapport de vraisemblance monotone** (Déf. 1.4/1.5) : $p_\theta(z)=h(z)\,\psi(T(z);\theta)$ et $t\mapsto\psi(t;\theta)/\psi(t;\theta')$ strictement croissante (resp. décroissante) pour $\theta>\theta'$. Exemples : $\mathcal{N}(\theta,1)$ (en $\bar x_n$), Bernoulli (en $\sum x_i$), exponentiel, familles exponentielles avec $\varphi$ monotone.
8. **Théorème unilatéral** (Th. 1.3/1.4) : si $T(Z)$ est à densité, $\phi_{\theta_0}=\mathbb{1}_{\{T>d_\alpha\}}$ (cas croissant) ou $\mathbb{1}_{\{T<d_\alpha\}}$ (cas décroissant), $d_\alpha$ fixé **en $\theta_0$**, est U.P.P.($\alpha$) pour $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ ; sa fonction puissance est **croissante** (Lemme 2.1 de monotonie). Preuve en 3 temps : NP pour chaque $\theta_1>\theta_0$ (seuil indépendant de $\theta_1$) ; croissance de $\beta$ ; $\mathcal{K}_\alpha(\{\theta\le\theta_0\})\subseteq\mathcal{K}_\alpha(\{\theta=\theta_0\})$.
9. **Pas de U.P.P. bilatéral** (Prop. 1.1, Ex. 1.6) : pour $H_0:\theta=\theta_0$ contre $H_1:\theta\neq\theta_0$ en famille exponentielle ($\varphi$ strictement croissante, sans atome), un U.P.P. serait égal $\mathbb{P}_{\theta_0}$-p.s. à $\phi_+$ et à $\phi_-$ (Th. 1.2), qui diffèrent sur des ensembles de proba $\alpha>0$ : contradiction. Remède (Exercice 5) : tests **sans biais**, optimalité **U.M.P.U.**
10. **Interprétation** (§1.10) : ne pas rejeter $\neq$ prouver $H_0$ ; rejeter $\neq$ prouver $H_1$. La $p$-valeur du test U.P.P. gaussien est $\hat\alpha(Z)=1-\Phi(\sqrt n(\bar X_n-\mu_0)/\sigma)$. **Taille d'effet** : à niveau et puissance fixés, l'effet détectable $m$ décroît en $n^{-1/2}$ (contre-exemple : citation de D. Raoult, 2020).

---

## 1. Notations et symboles

> **Notations particulières du poly à reproduire fidèlement :**
> - Espaces : lettres **sans empattement** $\mathsf{Z}$ pour l'espace des observations, calligraphique $\mathcal{Z}$ pour la tribu ; probabilités et espérances en lettres ajourées $\mathbb{P}_\theta$, $\mathbb{E}_\theta$ (et $\mathbb{E}_0,\mathbb{E}_1,\mathbb{P}_0,\mathbb{P}_1$ dans l'Exercice 2, $\mathbb{P}_{-1}$, $\mathbb{P}_m$ dans les exemples gaussiens).
> - Un test est désigné par sa **fonction critique** $\phi$ (phi **droit**), à valeurs dans $[0,1]$ ; le test de Neyman-Pearson est $\phi^\star$ (étoile), un autre U.P.P. $\phi^{\star\star}$ ; le test unilatéral $\phi_{\theta_0}$ ; dans la Prop. 1.1, $\phi_+$, $\phi_-$ ; dans l'Exercice 5, $\phi^{\star,1},\phi^{\star,2},\phi^{\star,3}$ ; dans les Exercices 4 et 7, $\phi_1,\phi_2,\phi'$ ; dans l'Exercice 2, $\phi_\alpha$ ; un test concurrent est $\psi$ (attention : **même lettre** $\psi$ que la fonction de la factorisation (2) et que la fonction $\psi(\theta)$ des familles exponentielles).
> - $\varphi$ (**varphi**) désigne une fonction croissante dans le Lemme 2.1 **et** la fonction $\theta\mapsto\varphi(\theta)$ du paramètre naturel d'une famille exponentielle (Prop. 1.1, compléments) ; dans le corrigé de l'Exercice 3, $\varphi(t)$ désigne le rapport de vraisemblance comme fonction de $t$.
> - **Taille** notée $\overline{\alpha}(\phi)$ (alpha **surligné**), à distinguer du niveau $\alpha$ ; $p$-valeur $\hat\alpha(Z)$.
> - Ensemble des tests de niveau $\alpha$ : $\mathcal{K}_\alpha(\Theta_0)$ (K calligraphique), p. ex. $\mathcal{K}_\alpha(\{\theta\le\theta_0\})$, $\mathcal{K}_\alpha(\{\theta=\theta_0\})$.
> - Région de rejet calligraphique $\mathcal{R}$, $\mathcal{R}_\alpha$.
> - Valeur critique du rapport : $c_\alpha$ ; seuil sur la statistique : $d_\alpha$ (et $d^+_\alpha$, $d^-_\alpha$ dans la Prop. 1.1 ; $d_{\alpha,\theta_0}$, $\gamma_{\alpha,\theta_0}$ dans l'Ex. 4.2) ; coefficient de randomisation $\gamma_\alpha$.
> - Mesure dominante notée $\nu$ dans les §1.3–1.4 (Th. 1.1, 1.2, 4.1) et $\mu$ dans les Déf. 1.4–1.5, le Lemme 2.1 et la Prop. 1.1 (attention : $\mu$ est aussi la **moyenne** gaussienne dans les Ex. 1.1–1.3).
> - Fonction de survie $\bar F(c)$, limite à gauche $\bar F(c^-)$ ; quantile $z_\beta$ de $\mathcal{N}(0,1)$, $\chi^2_\beta(k)$ de $\chi^2(k)$ ; $\Phi$ = f.d.r. de $\mathcal{N}(0,1)$ ; $f_{0,1}$ = densité de $\mathcal{N}(0,1)$ (Exercice 5).
> - Indicatrice : $\mathbb{1}_{\{\cdot\}}$ (double barre dans le poly).
> - Statistiques d'ordre : $X_{1:n}=\min_i X_i$, $X_{n:n}=\max_i X_i$ (et $x_{1:n}$, $x_{n:n}$).
> - Vraisemblance en romain $\mathrm{L}_n(\theta;\cdot)$ dans les compléments (Déf. 4.3) et l'Exercice 6 ; densité du $n$-échantillon $p^n_\theta$ (Exercices 1, 5) ou $p^{\otimes n}_\theta$ (compléments).
> - Lois : $\mathcal{N}(\mu,\sigma^2)$, $\mathcal{B}\mathrm{er}(\theta)$, $\mathrm{Bin}(n,\theta)$, $\mathrm{Poi}(\lambda)$, $\mathrm{Gamma}(n,\lambda)$ (**paramétrée par l'intensité** : $\mathrm{Gamma}(n,1/\theta)$ a pour densité $\theta^{-n}x^{n-1}e^{-x/\theta}/\Gamma(n)$), $\chi^2(k)$, $\mathcal{U}([0,\theta])$.
> - Abréviations : U.P.P.($\alpha$) = uniformément plus puissant au niveau $\alpha$ ; U.M.P.U.($\alpha$) = *uniformly most powerful unbiased*.
> - Exercices : vecteurs et matrices en **gras** ($\mathbf{Y}$, $\mathbf{X}$…), $a^\top$ = transposée ; dans le corrigé de l'Exercice 6, $X$, $X_0$, $\Pi$, $\Pi_0$, $M$ sont écrits sans gras.

| Symbole LaTeX | Signification | Première apparition |
|---|---|---|
| $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ | modèle statistique | §1.1, p. 9 |
| $\Theta=\Theta_0\cup\Theta_1$ | partition de l'espace des paramètres | §1.1, p. 9 |
| $H_0:\theta\in\Theta_0$, $H_1:\theta\in\Theta_1$ | hypothèse nulle, hypothèse alternative | §1.1, p. 9 |
| $\phi:\mathsf{Z}\to\{0,1\}$ | test pur | §1.1, p. 9 |
| $\phi:\mathsf{Z}\to[0,1]$ | fonction critique (test éventuellement randomisé) | §1.1, p. 9 ; Déf. 1.1, p. 9 |
| $\beta_\phi(\theta):=\mathbb{E}_\theta[\phi(Z)]$ | fonction puissance | Déf. 1.1, p. 9 |
| $\overline{\alpha}(\phi):=\sup_{\theta\in\Theta_0}\beta_\phi(\theta)$ | taille du test | Déf. 1.1, p. 9 |
| $\alpha\in[0,1]$ | niveau ($\alpha\in\,]0,1[$ dans les énoncés d'optimalité) | Déf. 1.1, p. 9 |
| $\mathcal{K}_\alpha(\Theta_0)$ | ensemble des tests de niveau $\alpha$ de $H_0:\theta\in\Theta_0$ | Déf. 1.1, p. 9 |
| $\mathcal{R}:=\{z\in\mathsf{Z}:\ \phi(z)=1\}$ | région de rejet d'un test pur | p. 9 |
| $\mu_0$, $\mu$ | moyenne gaussienne (figures et Ex. 1.3) | figure p. 9 |
| $\mathcal{R}_\alpha$ | région de rejet de niveau $\alpha$ | p. 9–10 |
| $z_\beta$ | quantile d'ordre $\beta$ de $\mathcal{N}(0,1)$ ($z_{1-\alpha}$, $z_\alpha=-z_{1-\alpha}$) | figure p. 10 ; Ex. 1.1, p. 15 |
| U.P.P.($\alpha$) | uniformément plus puissant au niveau $\alpha$ | Déf. 1.2, p. 10 |
| $\psi\in\mathcal{K}_\alpha(\Theta_0)$ | test concurrent générique | Déf. 1.2, p. 10 |
| $G$, $c_0(z)$, $r_1(z)$ | grille de pixels, coût d'achat, gain (énigme) | §1.2, p. 11 |
| $\nu$ | mesure $\sigma$-finie dominante (cas de deux hypothèses simples) | §1.3, p. 11 |
| $\mathbb{P}_\theta=p_\theta\cdot\nu$ | loi de densité $p_\theta$ par rapport à $\nu$ | §1.3, p. 11 |
| $\Theta:=\{\theta_0,\theta_1\}$, $\theta_0\neq\theta_1$ | deux hypothèses simples | §1.3, p. 11 |
| $r(z):=p_{\theta_1}(z)/p_{\theta_0}(z)$ | rapport de vraisemblance | Déf. 1.3, p. 11 |
| $\{p_{\theta_1}(z)>c\,p_{\theta_0}(z)\}$ | écriture des régions valable partout | p. 11 |
| $c_\alpha>0$ | valeur critique du test de Neyman-Pearson | Th. 1.1, p. 12 |
| $\phi^\star(z):=\mathbb{1}_{\{p_{\theta_1}(z)>c_\alpha p_{\theta_0}(z)\}}$ | test de Neyman-Pearson | Th. 1.1, p. 12 |
| $\bar F(c):=\mathbb{P}_{\theta_0}(p_{\theta_1}(Z)>c\,p_{\theta_0}(Z))$ | fonction de survie de $r(Z)$ sous $\mathbb{P}_{\theta_0}$ | preuve Th. 1.1, p. 12 ; outils p. 26 |
| $\bar F(c^-)$ | limite à gauche de $\bar F$ en $c$ | preuve Th. 1.1, p. 12 |
| $\psi\equiv\alpha$ | test randomisé constant (puissance $\alpha$ partout) | preuve Th. 1.1, p. 13 |
| $\phi^{\star\star}$ | fonction critique d'un (autre) test U.P.P.($\alpha$) | Th. 1.2, p. 13 |
| $A:=\{z:\ p_{\theta_1}(z)=c_\alpha p_{\theta_0}(z)\}$ | ensemble frontière (négligeable sous absence d'atome) | preuve Th. 1.2, p. 14 |
| $T(Z)$, $\tilde r$ | statistique, $r(Z)=\tilde r(T(Z))$ avec $\tilde r$ strictement monotone | Méthode 1.2, p. 15 |
| $d_\alpha$ | seuil sur la statistique $T$ | Méthode 1.2, p. 15 |
| $\phi^\star_\alpha$ | test U.P.P. de niveau $\alpha$ (famille indexée par $\alpha$) | Ex. 1.1, p. 15 ; §1.10, p. 23 |
| $\theta_i=(\mu_i,\sigma_i^2)$ | paramètres gaussiens (Ex. 1.2) | Ex. 1.2, p. 16 |
| $m:=\mu_1-\mu_0>0$ | écart de moyenne (taille d'effet) | Ex. 1.3, p. 17 |
| $\bar x_n$, $\bar X_n:=n^{-1}\sum_{i=1}^nX_i$ | moyenne empirique | Ex. 1.3, p. 17 |
| $\Phi$ | f.d.r. de $\mathcal{N}(0,1)$ | Ex. 1.3, p. 17 |
| $\mu$ (mesure) | mesure $\sigma$-finie dominante (familles à r.v. monotone) | Déf. 1.4, p. 18 |
| $p_\theta(z)=h(z)\,\psi(T(z);\theta)$ | factorisation (2) | Déf. 1.4, éq. (2), p. 18 |
| $\psi:\mathbb{R}^2\to\mathbb{R}_+$, $T:\mathsf{Z}\to\mathbb{R}$, $h:\mathsf{Z}\to\mathbb{R}_+$ | fonctions de la factorisation | Déf. 1.4, p. 18 |
| $\theta,\theta'$ | deux valeurs du paramètre ($\theta>\theta'$) | Déf. 1.4, p. 18 |
| $\mathcal{B}\mathrm{er}(\theta)$ | loi de Bernoulli | Ex. 1.5, p. 19 |
| $\phi_{\theta_0}(z):=\mathbb{1}_{\{T(z)>d_\alpha\}}$ | test unilatéral U.P.P. (cas croissant) | Th. 1.3, p. 20 |
| $\beta_{\phi_{\theta_0}}$ | fonction puissance du test unilatéral | Th. 1.3, p. 20 |
| $r_{\theta',\theta}(Z)=\psi(T(Z);\theta)/\psi(T(Z);\theta')$ | rapport de vraisemblance entre $\theta$ et $\theta'$ | Méthode 1.3, p. 21 ; $r_{\theta_0,\theta_1}$ compléments p. 47 |
| $p_\theta(x)=h(x)\exp(\varphi(\theta)T(x)-\psi(\theta))$ | famille exponentielle (paramètre naturel $\varphi(\theta)$) | Prop. 1.1, p. 22 |
| $T_n(z):=\sum_{i=1}^nT(x_i)$ | statistique exhaustive du $n$-échantillon | preuve Prop. 1.1, p. 22 |
| $H_0'$, $H_1'$ | hypothèses simples auxiliaires | preuve Prop. 1.1, p. 22 |
| $\phi_+$, $\phi_-$, $d^+_\alpha$, $d^-_\alpha$ | tests de NP à droite / à gauche et leurs seuils | preuve Prop. 1.1, p. 22 |
| $\hat\alpha(Z)$ | $p$-valeur | §1.10, p. 23 |
| $\chi^2_\beta(k)$ | quantile d'ordre $\beta$ de la loi $\chi^2(k)$ | outils p. 26 |
| $F(c):=\mathbb{P}(Y\le c)$, $F(c^-)=\mathbb{P}(Y<c)$ | f.d.r. et limite à gauche | Prop. 2.1, p. 26 |
| $F^{-1}(u):=\inf\{c\in\mathbb{R}:\ F(c)\ge u\}$ | fonction quantile (inverse généralisée) | outils p. 26 |
| $\varphi:\mathbb{R}\to\mathbb{R}$ croissante | fonction test du lemme de monotonie | Lemme 2.1, p. 27 |
| $A:=\{z:\ p_{\theta'}(z)>p_\theta(z)\}$, $d$, $a$, $b$ | objets de la preuve du Lemme 2.1 | preuve Lemme 2.1, p. 27 |
| $\binom{n+k-1}{k}\theta^n(1-\theta)^k$ | loi binomiale négative de paramètres $(n,\theta)$ | outils p. 28 |
| $\mathrm{Gamma}(n,\theta^{-1})$, $\Gamma(n)$ | loi Gamma (intensité $\theta^{-1}$), fonction Gamma | corrigé Exercice 1, p. 37 |
| $f_1,f_2,f_{3,\theta}$, $\kappa_{1,\theta},\kappa_{2,\theta}$, $I_\theta(\phi)$ | objets de la preuve U.M.P.U. | Exercice 5, Q9, p. 33 |
| $\Lambda_n$, $\Lambda(Z)$ | rapport de vraisemblance généralisé | Déf. 4.3, p. 53 ; Exercice 6, p. 35 |
| $\mathsf{Z}_0,\mathsf{Z}_1,\mathsf{Z}_p$ | zones d'acceptation, de rejet, de randomisation | compléments, p. 48 |
| $\gamma_\alpha\in[0,1]$ | probabilité de rejet sur la frontière (test randomisé) | Ex. 4.1, p. 49 ; Th. 4.1, p. 50 |
| $\phi^\star_\gamma$ | test randomisé de paramètre $\gamma$ | Ex. 4.1, p. 49 |
| $\hat\theta^{\mathrm{MV}}_n$ | estimateur du maximum de vraisemblance | Ex. 4.3, p. 53 |
| $Q_n$ | fonction quantile de $\mathrm{Gamma}(n,1)$ | Ex. 4.3, p. 53 |

---

## 2. Cours — contenu principal

### Remarque (introduction) — Quel est le meilleur test de niveau $\alpha$ ?
**Source :** Poly ch.5, introduction « Quel est le meilleur test de niveau α ? », p. 7–8
**Hypothèses :** cadre des tests du chapitre 4.
**Énoncé :** Un test de niveau $\alpha$ est un test dont la probabilité de rejeter $H_0$ lorsqu'elle est vraie ne dépasse pas $\alpha$. Cette contrainte laisse une grande liberté :
- le test qui **ne rejette jamais** est de niveau $\alpha$, et il est sans intérêt ;
- le test qui rejette lorsque la statistique dépasse un seuil et celui qui rejette lorsqu'elle sort d'un intervalle central peuvent être tous deux de niveau $\alpha$ et ne prennent pas les mêmes décisions.

Il faut un **second critère** ; l'approche de Neyman-Pearson : à niveau fixé, on retient le test de plus grande puissance sous $H_1$, et ce **en tout point** de l'alternative (test *uniformément plus puissant*). Le chapitre montre qu'un tel test existe dans deux situations (deux hypothèses simples ; hypothèses unilatérales dans un modèle à rapport de vraisemblance monotone) et qu'il n'existe pas toujours.

Vocabulaire (rappel du chapitre 4) : une hypothèse est **simple** si elle ne contient qu'une valeur du paramètre ($\theta=\theta_0$), **composite** sinon (p. ex. $\theta\le\theta_0$ ou $\theta\neq\theta_0$). Une hypothèse simple détermine complètement la loi de l'observation ; une composite ne la détermine pas, ce qui rend le problème plus difficile.
**Preuve (étapes) :** sans objet.
**Intuition :** la contrainte de niveau ne départage pas les tests ; c'est la puissance qui le fait.
**Pièges / erreurs classiques :** croire qu'un test « de niveau $\alpha$ » est automatiquement un bon test (le test $\phi\equiv0$ l'est).

---

### Remarque (non numérotée — §1.1) — Test pur, fonction critique à valeurs dans $[0,1]$
**Source :** Poly ch.5, §1.1 « Ce que l'on attend d'une fonction puissance », p. 9
**Hypothèses :** modèle $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$, partition $\Theta=\Theta_0\cup\Theta_1$, test $H_0:\theta\in\Theta_0$ contre $H_1:\theta\in\Theta_1$.
**Énoncé :** Un **test pur** est une fonction mesurable $\phi:\mathsf{Z}\to\{0,1\}$ : on rejette $H_0$ lorsque $\phi(Z)=1$ et l'on **échoue à la rejeter** lorsque $\phi(Z)=0$. Dans tout le chapitre, on autorise plus généralement la **fonction critique** $\phi$ à prendre ses valeurs dans $[0,1]$ (ce qui permet d'écrire une seule fois les énoncés) ; la procédure correspondante, appelée **test randomisé**, est décrite dans les compléments (Déf. 4.1). Les tests construits dans la partie principale sont tous des tests purs.
**Preuve (étapes) :** sans objet (convention).
**Intuition :** élargir à $[0,1]$ convexifie l'ensemble des tests ; c'est ce qui rend le problème d'optimisation linéaire (cf. remarque après le Th. 1.1).

---

### Définition 1.1 — Fonction puissance, taille, niveau
**Source :** Poly ch.5, Définition 1.1, p. 9
**Hypothèses :** $\phi:\mathsf{Z}\to[0,1]$ fonction critique d'un test de $H_0:\theta\in\Theta_0$ contre $H_1:\theta\in\Theta_1$.
**Énoncé :** Sa **fonction puissance** est
$$\beta_\phi:\theta\in\Theta\longmapsto\mathbb{E}_\theta[\phi(Z)]\in[0,1],$$
sa **taille** est $\overline{\alpha}(\phi):=\sup_{\theta\in\Theta_0}\beta_\phi(\theta)$, et le test est dit **de niveau** $\alpha\in[0,1]$ si $\overline{\alpha}(\phi)\le\alpha$. On note $\mathcal{K}_\alpha(\Theta_0)$ l'ensemble des tests de niveau $\alpha$ de l'hypothèse nulle $H_0:\theta\in\Theta_0$.

Pour un test pur, $\mathbb{E}_\theta[\phi(Z)]=\mathbb{P}_\theta(\phi(Z)=1)=\mathbb{P}_\theta(Z\in\mathcal{R})$ où $\mathcal{R}:=\{z\in\mathsf{Z}:\ \phi(z)=1\}$ est la **région de rejet** : la définition généralise celle du chapitre 4.
**Preuve (étapes) :** sans objet.
**Intuition :** sur $\Theta_0$, $\beta_\phi$ = probabilité de rejeter **à tort** (à minimiser) ; sur $\Theta_1$, probabilité de rejeter **à bon droit** (à maximiser). L'idéal ($0$ sur $\Theta_0$, $1$ sur $\Theta_1$) est impossible : le seul test de puissance identiquement nulle sur $\Theta_0$ est en général le test qui ne rejette jamais (puissance nulle partout). Neyman-Pearson **hiérarchise** : borne $\alpha$ sur $\Theta_0$, puis maximisation sur $\Theta_1$.
**Pièges / erreurs classiques :** confondre **taille** $\overline{\alpha}(\phi)$ (un nombre attaché au test) et **niveau** $\alpha$ (une borne) ; un test de niveau $\alpha$ n'est pas forcément de taille $\alpha$ (ex. : test qui ne rejette jamais, de taille $0$ ; tests discrets ; Exercice 4).

*Figure (p. 9) :* fonction puissance souhaitée (pointillés : $0$ sur $\Theta_0$, $1$ sur $\Theta_1$) et fonction puissance atteignable du test U.P.P.($\alpha$) pour $\mu\le\mu_0$ contre $\mu>\mu_0$ dans le modèle gaussien de variance connue : elle vaut $\alpha$ en $\mu_0$ ($\beta_\phi(\mu_0)=\alpha$) et croît ensuite vers $1$.

---

### Remarque (non numérotée — §1.1) — Le niveau ne dépend que des lois de $\Theta_0$
**Source :** Poly ch.5, §1.1, p. 9–10 (texte en italique + figure « trois régions de rejet »)
**Hypothèses :** deux hypothèses simples $\Theta=\{\theta_0,\theta_1\}$.
**Énoncé :** *Le fait qu'un test soit de niveau $\alpha$ ne dépend que des lois indexées par $\Theta_0$, et pas de celles indexées par $\Theta_1$.* Pour $\Theta=\{\theta_0,\theta_1\}$, la contrainte s'écrit $\mathbb{P}_{\theta_0}(Z\in\mathcal{R}_\alpha)\le\alpha$ et ne fait intervenir que $p_{\theta_0}$ : on peut construire une infinité de régions de rejet de niveau $\alpha$ (changer leur forme sans changer leur probabilité sous $\mathbb{P}_{\theta_0}$), mais elles n'ont pas la même probabilité sous $\mathbb{P}_{\theta_1}$ (pas la même puissance). Question : laquelle maximise la puissance ?

*Figure (p. 10), $p_{\theta_0}=\mathcal{N}(0,1)$, $p_{\theta_1}=\mathcal{N}(2,1)$, $\alpha=0{,}10$ :*

| Région de rejet | taille | puissance |
|---|---|---|
| $\mathcal{R}=\{z>z_{1-\alpha}\}$ | $0{,}10$ | $0{,}76$ |
| $\mathcal{R}=\{z<z_\alpha\}$ | $0{,}10$ | $0{,}00$ |
| $\mathcal{R}=\{\lvert z\rvert<c\}$ | $0{,}10$ | $0{,}01$ |

**Preuve (étapes) :** constat (calcul numérique sur la figure).
**Intuition :** c'est le point de départ de tout le chapitre : la contrainte ne distingue pas ces tests, la puissance les distingue énormément.

---

### Définition 1.2 — Test uniformément plus puissant
**Source :** Poly ch.5, Définition 1.2, p. 10
**Hypothèses :** $\alpha\in\,]0,1[$.
**Énoncé :** Un test de fonction critique $\phi$ est dit **uniformément plus puissant au niveau $\alpha$**, en abrégé **U.P.P.($\alpha$)**, s'il est de niveau $\alpha$, c'est-à-dire $\phi\in\mathcal{K}_\alpha(\Theta_0)$, et si sa fonction puissance vérifie
$$\beta_\phi(\theta)=\sup_{\psi\in\mathcal{K}_\alpha(\Theta_0)}\beta_\psi(\theta),\qquad\text{pour tout }\theta\in\Theta_1.$$
**Preuve (étapes) :** sans objet.
**Intuition :** la définition demande beaucoup : puissance maximale **en chaque point** de $\Theta_1$ **et par le même test**. C'est la borne supérieure du préordre sur les tests (chapitre 3), restreint à $\Theta_1$ : deux tests dont les fonctions puissance se croisent sur $\Theta_1$ ne sont pas comparables. Comme pour les estimateurs (chapitre 3, Section 1.5), l'ordre est partiel et l'existence d'un maximum n'est pas automatique ; ici la classe est déjà restreinte à $\mathcal{K}_\alpha(\Theta_0)$, ce qui suffit dans deux situations mais pas dans toutes.
**Pièges / erreurs classiques :** la condition d'optimalité ne porte **que sur $\Theta_1$** ; sur $\Theta_0$ seule compte la contrainte de niveau (question courte 2).

*Figure (p. 11) :* fonctions puissance de trois tests de taille $\alpha=0{,}10$ de $H_0:\mu=0$ contre $H_1:\mu>0$ (gaussien, variance connue) : $\phi^\star$ (rejet si $\sqrt n\bar X_n>z_{1-\alpha}$), rejet si $|\sqrt n\bar X_n|>z_{1-\alpha/2}$, rejet si $\sqrt n\bar X_n<z_\alpha$. Celle de $\phi^\star$ domine les deux autres en chaque point de $\Theta_1$ : c'est le test U.P.P.($\alpha$).

---

### Remarque (non numérotée — §1.2) — Une énigme : quels terrains acheter ?
**Source :** Poly ch.5, §1.2, p. 11 (énigme posée à la fin du chapitre 4, Section 2.10)
**Hypothèses :** grille $G$ de pixels ; chaque pixel $z\in G$ a un coût d'achat $c_0(z)\ge0$ et rapporte un gain $r_1(z)\ge0$ ; budget total $\alpha$.
**Énoncé :** Quels pixels acheter pour maximiser le bénéfice ? Passage au continu : remplacer la grille par $\mathbb{R}^2$, ou par l'espace $\mathsf{Z}$ des observations ; on achète un sous-ensemble $\mathcal{R}\subseteq\mathsf{Z}$, dont coût et gain sont les intégrales de deux fonctions positives sur $\mathcal{R}$. Réponse au §1.5.
**Preuve (étapes) :** voir Remarque (non numérotée — §1.5).
**Intuition :** problème de « sac à dos » continu : acheter d'abord ce qui rapporte le plus par unité de coût.

---

### Définition 1.3 — Rapport de vraisemblance
**Source :** Poly ch.5, Définition 1.3, p. 11
**Hypothèses :** (§1.3) observation $Z$ (éventuellement $Z=(X_1,\dots,X_n)$) de loi $\mathbb{P}_\theta=p_\theta\cdot\nu$, $\nu$ mesure $\sigma$-finie sur $(\mathsf{Z},\mathcal{Z})$, $\theta\in\Theta:=\{\theta_0,\theta_1\}$, $\theta_0\neq\theta_1$ ; test $H_0:\theta=\theta_0$ contre $H_1:\theta=\theta_1$.
**Énoncé :** Le **rapport de vraisemblance** est la statistique
$$r(z):=\frac{p_{\theta_1}(z)}{p_{\theta_0}(z)},\qquad z\in\mathsf{Z}\ \text{tel que}\ p_{\theta_0}(z)>0.$$
Elle n'est définie que là où $p_{\theta_0}$ ne s'annule pas ; comme $\mathbb{P}_{\theta_0}(p_{\theta_0}(Z)>0)=1$, cela suffit pour parler de la loi de $r(Z)$ sous $\mathbb{P}_{\theta_0}$. Dans les énoncés, on écrit les régions sous la forme $\{p_{\theta_1}(z)>c\,p_{\theta_0}(z)\}$, qui a un sens en tout point de $\mathsf{Z}$, et l'on n'utilise $\{r(z)>c\}$ que là où le quotient est défini.
**Preuve (étapes) :** sans objet.
**Intuition :** on n'optimise plus la vraisemblance (chapitre 2) : on l'évalue en deux points et on en prend le quotient. Une grande valeur de $r(z)$ signifie que $z$ était bien plus probable sous $\theta_1$ que sous $\theta_0$, donc plaide contre $H_0$.
**Pièges / erreurs classiques :** utiliser $\{r>c\}$ là où $p_{\theta_0}=0$ (ex. modèles à support dépendant du paramètre : Exercices 4, 7) ; ne pas confondre avec le rapport de vraisemblance **généralisé** $\Lambda_n$ (Déf. 4.3), qui est un sup sur des hypothèses composites et qui rejette pour les **petites** valeurs.

---

### Cadre 1.1 — Absence d'atome du rapport de vraisemblance
**Source :** Poly ch.5, Cadre 1.1, p. 12
**Hypothèses :** cadre de la Déf. 1.3 ; hypothèse faite dans toute la section §1.3–§1.7.
**Énoncé :** Pour tout $c\ge0$ et tout $\theta\in\Theta$,
$$\mathbb{P}_\theta\big(p_{\theta_1}(Z)=c\,p_{\theta_0}(Z)\big)=0.$$
Vérifiée dès que $r(Z)$ est à densité par rapport à la mesure de Lebesgue (cas des exemples gaussiens). Mise en défaut dès que l'observation est discrète (Bernoulli, Poisson) : la statistique ne prend qu'un nombre dénombrable de valeurs et charge chacune d'elles ; ce cas est traité dans les compléments (tests randomisés, Th. 4.1).
**Preuve (étapes) :** sans objet (hypothèse).
**Intuition :** garantit que la fonction de survie de $r(Z)$ est continue, donc qu'on peut atteindre **exactement** la taille $\alpha$ avec un test pur, et que la frontière $\{p_{\theta_1}=c\,p_{\theta_0}\}$ est négligeable (unicité).
**Pièges / erreurs classiques :** appliquer le Th. 1.1 tel quel à une statistique discrète (binomiale, Poisson, binomiale négative) : il faut alors randomiser.

---

### Théorème 1.1 — Neyman-Pearson, cas de deux hypothèses simples
**Source :** Poly ch.5, Théorème 1.1, p. 12–13
**Hypothèses :**
- $\nu$ mesure $\sigma$-finie sur $(\mathsf{Z},\mathcal{Z})$ ; modèle $\big(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\nu,\ \theta\in\Theta:=\{\theta_0,\theta_1\}\}\big)$, $\theta_0\neq\theta_1$ ;
- **absence d'atome** du rapport de vraisemblance (Cadre 1.1) ;
- $\alpha\in\,]0,1[$.

**Énoncé :**
(i) Il existe une constante $c_\alpha>0$ telle que le test pur de fonction critique
$$\phi^\star(z):=\mathbb{1}_{\{p_{\theta_1}(z)>c_\alpha p_{\theta_0}(z)\}}$$
soit de **taille exactement $\alpha$**, c'est-à-dire
$$\mathbb{E}_{\theta_0}[\phi^\star(Z)]=\int_{\mathsf{Z}}\phi^\star(z)\,p_{\theta_0}(z)\,\nu(\mathrm{d}z)=\alpha.$$
(ii) Le test $\phi^\star$ est **U.P.P.($\alpha$)** pour $H_0:\theta=\theta_0$ contre $H_1:\theta=\theta_1$, et sa puissance vérifie $\mathbb{E}_{\theta_1}[\phi^\star(Z)]\ge\alpha$.

**Preuve (étapes) :**
*(i) Existence de $c_\alpha$.*
1. On pose $\bar F:c\in\mathbb{R}_+\longmapsto\mathbb{P}_{\theta_0}\big(p_{\theta_1}(Z)>c\,p_{\theta_0}(Z)\big)$ ; elle est **décroissante** (les événements décroissent en $c$).
2. Comme $p_{\theta_0}(Z)>0$ $\mathbb{P}_{\theta_0}$-p.s., $\bar F(c)=\mathbb{P}_{\theta_0}(r(Z)>c)$ pour tout $c\ge0$ : $\bar F$ est la **fonction de survie** de la v.a. réelle positive $r(Z)$ sous $\mathbb{P}_{\theta_0}$, donc continue à droite avec limites à gauche, et $\bar F(c^-)-\bar F(c)=\mathbb{P}_{\theta_0}(r(Z)=c)$, $c\ge0$ (Prop. 2.1 des outils).
3. L'**absence d'atome** annule tous ces sauts : $\bar F$ est **continue** sur $\mathbb{R}_+$.
4. $\bar F(0)=\mathbb{P}_{\theta_0}(r(Z)>0)=1$ puisque $\mathbb{P}_{\theta_0}(r(Z)=0)=0$ (absence d'atome en $c=0$), et $\lim_{c\to+\infty}\bar F(c)=\mathbb{P}_{\theta_0}(r(Z)=+\infty)=0$ ($r(Z)$ finie $\mathbb{P}_{\theta_0}$-p.s. ; continuité décroissante de la probabilité).
5. **Théorème des valeurs intermédiaires** : pour tout $\alpha\in\,]0,1[$, il existe $c_\alpha>0$ avec $\bar F(c_\alpha)=\alpha$, i.e. $\mathbb{E}_{\theta_0}[\phi^\star(Z)]=\alpha$.

*(ii) Optimalité.*
6. Soit $\phi\in\mathcal{K}_\alpha(\Theta_0)$, i.e. $\mathbb{E}_{\theta_0}[\phi(Z)]\le\alpha$. **Inégalité clé** : pour tout $z\in\mathsf{Z}$,
$$\big\{\phi^\star(z)-\phi(z)\big\}\big\{p_{\theta_1}(z)-c_\alpha\,p_{\theta_0}(z)\big\}\ge0.\tag{1}$$
*Justification par cas :* si $p_{\theta_1}(z)-c_\alpha p_{\theta_0}(z)>0$, alors $\phi^\star(z)=1\ge\phi(z)$ (deux facteurs $\ge0$) ; si $<0$, alors $\phi^\star(z)=0\le\phi(z)$ (deux facteurs $\le0$) ; si $=0$, le produit est nul.
7. On **intègre (1) par rapport à $\nu$** :
$$\int_{\mathsf{Z}}\big\{\phi^\star(z)-\phi(z)\big\}\big\{p_{\theta_1}(z)-c_\alpha p_{\theta_0}(z)\big\}\,\nu(\mathrm{d}z)\ge0,$$
soit, en séparant les termes (linéarité de l'intégrale, $\mathbb{E}_\theta[\phi(Z)]=\int\phi\,p_\theta\,\mathrm{d}\nu$) :
$$\mathbb{E}_{\theta_1}[\phi^\star(Z)]-\mathbb{E}_{\theta_1}[\phi(Z)]\ge c_\alpha\big(\mathbb{E}_{\theta_0}[\phi^\star(Z)]-\mathbb{E}_{\theta_0}[\phi(Z)]\big).$$
8. $\phi^\star$ est de **taille** $\alpha$ et $\phi$ de **niveau** $\alpha$ : $\mathbb{E}_{\theta_0}[\phi^\star(Z)]-\mathbb{E}_{\theta_0}[\phi(Z)]=\alpha-\mathbb{E}_{\theta_0}[\phi(Z)]\ge0$ ; avec $c_\alpha>0$, on obtient $\mathbb{E}_{\theta_1}[\phi^\star(Z)]\ge\mathbb{E}_{\theta_1}[\phi(Z)]$. $\phi$ étant quelconque, $\phi^\star$ est U.P.P.($\alpha$).
9. *Puissance $\ge\alpha$ :* le test randomisé constant $\psi\equiv\alpha$ est de niveau $\alpha$ ($\mathbb{E}_{\theta_0}[\psi(Z)]=\alpha$) et de puissance $\beta_\psi(\theta_1)=\alpha$ ; l'optimalité de $\phi^\star$ donne $\mathbb{E}_{\theta_1}[\phi^\star(Z)]\ge\alpha$. $\square$

**Intuition :** on rejette là où l'observation plaide le plus contre $H_0$ (grand $r$), et l'on **dépense tout le budget $\alpha$**. Remarque d'amphi : l'inégalité (1) paraît astucieuse, mais le problème est un **problème d'optimisation linéaire sous contrainte linéaire** — maximiser $\int\phi\,p_{\theta_1}\,\mathrm{d}\nu$ sous $\int\phi\,p_{\theta_0}\,\mathrm{d}\nu\le\alpha$ et $0\le\phi\le1$ — dont la **dualité lagrangienne** donne une preuve naturelle ; $c_\alpha$ y est le **multiplicateur de Lagrange** de la contrainte de budget.
**Pièges / erreurs classiques :**
- l'étape 8 utilise l'**égalité** $\mathbb{E}_{\theta_0}[\phi^\star]=\alpha$ : si $\phi^\star$ n'était que de niveau $\alpha$, $\mathbb{E}_{\theta_0}[\phi^\star]-\mathbb{E}_{\theta_0}[\phi]$ n'aurait pas de signe (d'où l'insistance sur la **taille exacte**, et la randomisation dans le cas discret) ;
- $c_\alpha>0$ est indispensable pour conserver le sens de l'inégalité ;
- l'optimalité porte sur **tous** les tests randomisés de niveau $\alpha$, pas seulement les tests purs.

---

### Théorème 1.2 — Caractérisation des tests U.P.P.
**Source :** Poly ch.5, Théorème 1.2, p. 13–14
**Hypothèses :** celles du Théorème 1.1 (dont l'absence d'atome) ; $\phi^{\star\star}$ fonction critique d'un test U.P.P.($\alpha$).
**Énoncé :**
$$\phi^{\star\star}(z)=\begin{cases}1 & \text{si } p_{\theta_1}(z)>c_\alpha\,p_{\theta_0}(z),\\ 0 & \text{si } p_{\theta_1}(z)<c_\alpha\,p_{\theta_0}(z),\end{cases}$$
pour $\nu$-presque tout $z\in\mathsf{Z}$. En particulier $\phi^{\star\star}=\phi^\star$ $\mathbb{P}_{\theta_0}$-presque sûrement et $\mathbb{P}_{\theta_1}$-presque sûrement, de sorte que les deux tests ont la même fonction puissance.
**Preuve (étapes) :**
1. $\phi^\star$ et $\phi^{\star\star}$ sont tous deux U.P.P.($\alpha$) : leurs puissances en $\theta_1$ coïncident, $\mathbb{E}_{\theta_1}[\phi^\star(Z)]-\mathbb{E}_{\theta_1}[\phi^{\star\star}(Z)]=0$.
2. $\phi^\star$ de taille $\alpha$, $\phi^{\star\star}$ de niveau $\alpha$ : $c_\alpha\big(\mathbb{E}_{\theta_0}[\phi^\star(Z)]-\mathbb{E}_{\theta_0}[\phi^{\star\star}(Z)]\big)=c_\alpha\big(\alpha-\mathbb{E}_{\theta_0}[\phi^{\star\star}(Z)]\big)\ge0$.
3. En soustrayant (2) de (1) :
$$\int_{\mathsf{Z}}\big\{\phi^\star(z)-\phi^{\star\star}(z)\big\}\big\{p_{\theta_1}(z)-c_\alpha p_{\theta_0}(z)\big\}\,\nu(\mathrm{d}z)\le0.$$
4. L'**inégalité clé (1)** appliquée à $\phi=\phi^{\star\star}$ montre que l'intégrande est $\ge0$ partout ; une fonction positive d'intégrale $\le0$ est **nulle $\nu$-p.p.** Le produit ne peut donc être non nul que là où $p_{\theta_1}(z)=c_\alpha p_{\theta_0}(z)$ : ailleurs $\phi^{\star\star}=\phi^\star$, ce qui donne l'écriture annoncée.
5. Soit $A:=\{z\in\mathsf{Z}:\ p_{\theta_1}(z)=c_\alpha p_{\theta_0}(z)\}$. L'**absence d'atome** donne $\mathbb{P}_{\theta_0}(Z\in A)=0$, et comme $p_{\theta_1}=c_\alpha p_{\theta_0}$ sur $A$ :
$$\mathbb{P}_{\theta_1}(Z\in A)=\int_Ap_{\theta_1}(z)\,\nu(\mathrm{d}z)=c_\alpha\int_Ap_{\theta_0}(z)\,\nu(\mathrm{d}z)=c_\alpha\,\mathbb{P}_{\theta_0}(Z\in A)=0.$$
Les deux fonctions critiques coïncident donc $\mathbb{P}_{\theta_0}$-p.s. et $\mathbb{P}_{\theta_1}$-p.s. $\square$

**Intuition :** le test de Neyman-Pearson n'est pas seulement optimal, il est **essentiellement le seul** ; deux U.P.P. ne peuvent différer que sur la frontière $\{r=c_\alpha\}$, négligeable sans atome.
**Pièges / erreurs classiques :** « deux tests U.P.P.($\alpha$) coïncident en tout point de $\mathsf{Z}$ » est **faux** (question courte 4) : ils coïncident seulement $\nu$-p.p. hors de la frontière, et p.s. sous $\mathbb{P}_{\theta_0}$ et $\mathbb{P}_{\theta_1}$. Avec atomes (Th. 4.1, Ex. 4.5, Exercices 4 et 7), l'unicité tombe.

---

### Remarque (non numérotée — §1.5) — Retour sur l'énigme
**Source :** Poly ch.5, §1.5, p. 14
**Hypothèses :** cadre du Th. 1.1.
**Énoncé :** Choisir un test de niveau $\alpha$, c'est choisir $\mathcal{R}_\alpha$ avec
$$\int_{\mathcal{R}_\alpha}p_{\theta_0}(z)\,\nu(\mathrm{d}z)\le\alpha,$$
c'est-à-dire **acheter une portion de l'espace en respectant un budget $\alpha$**, le coût étant la densité $p_{\theta_0}$. Maximiser la puissance, c'est maximiser le **gain** $\int_{\mathcal{R}_\alpha}p_{\theta_1}(z)\,\nu(\mathrm{d}z)$, donné par la densité $p_{\theta_1}$. Le théorème dit : (a) acheter les zones où le rapport gain/coût $r(z)=p_{\theta_1}(z)/p_{\theta_0}(z)$ est le plus grand : $\mathcal{R}=\{z:\ r(z)>c_\alpha\}$ ; (b) **dépenser tout le budget** : $c_\alpha$ tel que le coût vaille exactement $\alpha$ (partie (i) du théorème — d'où l'insistance sur la taille et non seulement sur le niveau).

Limite de l'analogie : dans la version discrète, on trie les pixels par rapport gain/coût décroissant, quitte à ne pas dépenser exactement le budget si les pixels sont indivisibles. C'est le cas des atomes du rapport de vraisemblance : on ne peut plus atteindre la taille $\alpha$ avec un test pur, il faut « **couper un pixel en deux** » — c'est la randomisation (compléments).
**Preuve (étapes) :** reformulation du Th. 1.1.
**Intuition :** test optimal = achat glouton par rapport gain/coût décroissant.

---

### Méthode 1.1 — Détermination du test U.P.P.($\alpha$), cas de deux hypothèses simples
**Source :** Poly ch.5, Méthode 1.1, p. 15
**Hypothèses :** test $H_0:\theta=\theta_0$ contre $H_1:\theta=\theta_1$.
**Énoncé :**
1. Calculer le rapport de vraisemblance $r(z)=p_{\theta_1}(z)/p_{\theta_0}(z)$.
2. Vérifier que $r(Z)$ n'a pas d'atome sous $\mathbb{P}_{\theta_0}$ ; sinon, se reporter à la forme générale du théorème (Th. 4.1).
3. On rejette lorsque $r(Z)$ est grand : région de rejet $\{z:\ r(z)>c_\alpha\}$.
4. Identifier $c_\alpha$ par la condition de taille $\mathbb{P}_{\theta_0}(r(Z)>c_\alpha)=\alpha$, **l'égalité étant exacte**.

Le test $\phi^\star(Z)=\mathbb{1}_{\{r(Z)>c_\alpha\}}$ est alors U.P.P.($\alpha$), et tout autre test U.P.P.($\alpha$) lui est égal $\mathbb{P}_{\theta_0}$- et $\mathbb{P}_{\theta_1}$-p.s. En pratique, l'étape 4 n'est presque jamais menée sur $r(Z)$ directement, mais sur une statistique plus simple (Méthode 1.2).
**Preuve (étapes) :** application des Th. 1.1 et 1.2.
**Intuition :** recette en 4 temps : rapport, atomes, sens du rejet, seuil sous $H_0$.

---

### Méthode 1.2 — Passer par une statistique monotone
**Source :** Poly ch.5, Méthode 1.2, p. 15
**Hypothèses :** $r(Z)=\tilde r(T(Z))$ avec $\tilde r$ **strictement monotone**.
**Énoncé :**
1. Si $\tilde r$ est croissante, $r(Z)>c_\alpha\iff T(Z)>d_\alpha$ ; si elle est décroissante, $r(Z)>c_\alpha\iff T(Z)<d_\alpha$.
2. Au lieu de chercher $c_\alpha$ tel que $\mathbb{P}_{\theta_0}(r(Z)>c_\alpha)=\alpha$, on identifie directement $d_\alpha$ tel que $\mathbb{P}_{\theta_0}(T(Z)>d_\alpha)=\alpha$ (resp. $\mathbb{P}_{\theta_0}(T(Z)<d_\alpha)=\alpha$).

Il suffit donc de connaître **la loi de $T(Z)$ sous $\mathbb{P}_{\theta_0}$**.
**Preuve (étapes) :** équivalence d'événements par stricte monotonie de $\tilde r$.
**Intuition :** on ne calcule presque jamais $c_\alpha$ ; on calcule $d_\alpha$ (et l'on peut en déduire $c_\alpha=\tilde r(d_\alpha)$ si besoin).
**Pièges / erreurs classiques :** oublier de renverser l'inégalité quand $\tilde r$ est décroissante.

---

### Exemple 1.1 — Une observation gaussienne, variances égales
**Source :** Poly ch.5, Exemple 1.1, p. 15–16
**Hypothèses :** une seule observation $X\sim\mathcal{N}(\mu,1)$, $\mu\in\{-1,1\}$ ; $H_0:\mu=-1$ contre $H_1:\mu=1$.
**Énoncé / calcul :**
- Densités : $p_{-1}(x)=(2\pi)^{-1/2}e^{-(x+1)^2/2}$, $p_1(x)=(2\pi)^{-1/2}e^{-(x-1)^2/2}$, d'où
$$r(x)=\frac{p_1(x)}{p_{-1}(x)}=\exp\Big(\frac{-(x-1)^2+(x+1)^2}{2}\Big)=\exp(2x),$$
puisque $-(x-1)^2+(x+1)^2=4x$.
- $x\mapsto e^{2x}$ strictement croissante, donc $r(x)>c_\alpha\iff x>\tfrac12\log(c_\alpha)$.
- Seuil sous $\mathbb{P}_{-1}$ : $X+1\sim\mathcal{N}(0,1)$, donc $\mathbb{P}_{-1}(X>t)=\alpha\iff t=-1+z_{1-\alpha}$.
- Test U.P.P.($\alpha$) :
$$\phi^\star_\alpha(X)=\mathbb{1}_{\{X>z_{1-\alpha}-1\}},\qquad\text{c'est-à-dire}\quad c_\alpha=\exp\big(2(z_{1-\alpha}-1)\big).$$

*Figure (p. 16) :* densités $(\mu_0,\sigma_0^2)=(-1,1)$ et $(\mu_1,\sigma_1^2)=(1,1)$ ; le log-rapport est une fonction strictement croissante (affine) de $z$ : la région de rejet est une **demi-droite**.
**Méthodes mobilisées :** calcul du rapport de vraisemblance ; Méthode 1.2 (statistique monotone $T(X)=X$) ; condition de taille sous $H_0$ par centrage-réduction ; quantile gaussien.
**Intuition :** le point à retenir est le **décalage de $-1$** dans le seuil.
**Pièges / erreurs classiques :** écrire $\phi^\star_\alpha(X)=\mathbb{1}_{\{X>z_{1-\alpha}\}}$ en oubliant que $z_{1-\alpha}$ se rapporte à $\mathcal{N}(0,1)$ alors que la taille s'évalue sous $\mathbb{P}_{\theta_0}=\mathcal{N}(-1,1)$. **Le seuil se lit toujours sous la loi de l'hypothèse nulle.**

---

### Exemple 1.2 — Une observation gaussienne, variances différentes
**Source :** Poly ch.5, Exemple 1.2, p. 16–17
**Hypothèses :** une observation $X$, $\Theta=\{\theta_0,\theta_1\}$ avec $\theta_i=(\mu_i,\sigma_i^2)$ ; test de $\theta=\theta_0$ contre $\theta=\theta_1$.
**Énoncé / calcul :** avec $p_{\theta_i}(z):=\frac{1}{\sqrt{2\pi\sigma_i^2}}\exp\big(-(z-\mu_i)^2/(2\sigma_i^2)\big)$,
$$r(z)=\sqrt{\frac{\sigma_0^2}{\sigma_1^2}}\exp\Big(-\frac{1}{2\sigma_1^2}(z-\mu_1)^2+\frac{1}{2\sigma_0^2}(z-\mu_0)^2\Big),$$
et la région $\{r(z)>c_\alpha\}$ s'écrit
$$-\frac{1}{2\sigma_1^2}(z-\mu_1)^2+\frac{1}{2\sigma_0^2}(z-\mu_0)^2>\log(c_\alpha)+\frac12\log\Big(\frac{\sigma_1^2}{\sigma_0^2}\Big).$$
Le membre de gauche est un **trinôme du second degré** en $z$, de coefficient dominant $\frac12\big(\sigma_0^{-2}-\sigma_1^{-2}\big)$ :
- si $\sigma_1^2<\sigma_0^2$, ce coefficient est $<0$ et la région de rejet est un **intervalle** $]m,M[$ ;
- si $\sigma_1^2>\sigma_0^2$, il est $>0$ et la région de rejet est le **complémentaire d'un intervalle**.

*Figure (p. 17) :* $(\mu_0,\sigma_0^2)=(-1,1)$, $(\mu_1,\sigma_1^2)=(1,0{,}5)$ : le rapport n'est plus monotone, la région où il dépasse un seuil est un intervalle.
**Méthodes mobilisées :** calcul du log-rapport ; étude du signe d'un trinôme. (Le poly ne calcule pas explicitement $m$, $M$.)
**Intuition :** la région de rejet **n'est pas toujours une queue de distribution** : c'est ce que le rapport de vraisemblance en fait.
**Pièges / erreurs classiques :** « on rejette quand la statistique est grande » n'est qu'une abréviation, valable seulement quand $r$ est fonction croissante d'une statistique ; le critère exact est toujours « on rejette quand **le rapport de vraisemblance** est grand ».

---

### Exemple 1.3 — Moyenne d'un échantillon gaussien, variance connue
**Source :** Poly ch.5, Exemple 1.3, p. 17–18
**Hypothèses :** $Z=(X_1,\dots,X_n)$ $n$-échantillon du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\mu,\sigma^2),\ \mu\in\{\mu_0,\mu_1\}\}\big)$, $\sigma^2>0$ **connue**, $\mu_0<\mu_1$ ; $H_0:\mu=\mu_0$ contre $H_1:\mu=\mu_1$.
**Énoncé / calcul :**
1. Quitte à remplacer $X_i$ par $X_i-\mu_0$, on suppose $\mu_0=0$ et l'on pose $m:=\mu_1>0$.
2. Rapport de vraisemblance :
$$r(z)=\exp\Big(-\frac{1}{2\sigma^2}\sum_{i=1}^n(x_i-m)^2+\frac{1}{2\sigma^2}\sum_{i=1}^nx_i^2\Big)=\exp\Big(\frac{nm}{\sigma^2}\bar x_n-\frac{nm^2}{2\sigma^2}\Big),\qquad\bar x_n:=n^{-1}\sum_{i=1}^nx_i.$$
3. $r(z)=\tilde r(\bar x_n)$ avec $\tilde r(t)=\exp\big(nmt/\sigma^2-nm^2/(2\sigma^2)\big)$, **strictement croissante** car $m>0$ : Méthode 1.2, $r(Z)>c_\alpha\iff\bar X_n>d_\alpha$, avec $\mathbb{P}_0(\bar X_n>d_\alpha)=\alpha$.
4. Sous $\mathbb{P}_0$, $\sqrt n\,\bar X_n/\sigma\sim\mathcal{N}(0,1)$, d'où l'unique solution $d_\alpha=z_{1-\alpha}\sigma/\sqrt n$.
5. Test U.P.P.($\alpha$), en revenant à $\mu_0$ général :
$$\phi^\star(Z)=\mathbb{1}_{\{\bar X_n>\mu_0+z_{1-\alpha}\sigma/\sqrt n\}}.$$
6. Puissance :
$$\beta_{\phi^\star}(\mu_1)=\mathbb{P}_m\big(\bar X_n>z_{1-\alpha}\sigma/\sqrt n\big)=1-\Phi\big(z_{1-\alpha}-\sqrt n\,m/\sigma\big),\qquad m=\mu_1-\mu_0.$$

*Figure (p. 18) :* puissance du test U.P.P.($\alpha$) de $H_0:\mu=0$ contre $H_1:\mu=1$, au niveau $\alpha=0{,}05$, en fonction de $n$ (de $\approx0{,}26$ pour $n=1$ à $\approx1$ dès $n\approx20$).
**Méthodes mobilisées :** réduction $\mu_0=0$ par translation ; calcul du rapport de vraisemblance ; statistique monotone $\bar X_n$ ; loi de $\bar X_n$ sous $H_0$ (centrage-réduction) ; calcul de puissance sous $H_1$ via $\Phi$.
**Intuition :** le seuil $d_\alpha=z_{1-\alpha}\sigma/\sqrt n$ **ne dépend pas de $\mu_1$** : le même test est U.P.P.($\alpha$) contre chaque $\mu=\mu_1>\mu_0$, donc contre l'alternative composite $\mu>\mu_0$. C'est un « accident heureux », pas une règle : il tient à la factorisation du rapport à travers une statistique dont le seuil ne dépend que de $\theta_0$. Le §1.8 identifie la classe de modèles où cela se produit. Repris en détail à l'Exercice 5.
**Pièges / erreurs classiques :** signe dans la puissance : $1-\Phi(z_{1-\alpha}-\sqrt n\,m/\sigma)$ (croît avec $n$ et $m$).

---

### Définition 1.4 — Famille à rapport de vraisemblance monotone croissant
**Source :** Poly ch.5, Définition 1.4, p. 18
**Hypothèses :** (§1.8) paramètre **scalaire** $\Theta\subseteq\mathbb{R}$ ; hypothèse **unilatérale** = de la forme $\theta\le\theta_0$ ou $\theta>\theta_0$. $\mu$ mesure $\sigma$-finie sur $(\mathsf{Z},\mathcal{Z})$, modèle $\big(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta=p_\theta\cdot\mu,\ \theta\in\Theta\}\big)$, $\Theta\subseteq\mathbb{R}$.
**Énoncé :** La famille est dite **à rapport de vraisemblance monotone croissant** si
(i) il existe des fonctions mesurables $\psi:\mathbb{R}^2\to\mathbb{R}_+$, $T:\mathsf{Z}\to\mathbb{R}$ et $h:\mathsf{Z}\to\mathbb{R}_+$ telles que
$$p_\theta(z)=h(z)\,\psi(T(z);\theta),\qquad\theta\in\Theta,\quad z\in\mathsf{Z};\tag{2}$$
(ii) pour tous $\theta,\theta'\in\Theta$ tels que $\theta>\theta'$, la fonction
$$t\longmapsto\frac{\psi(t;\theta)}{\psi(t;\theta')}$$
est **strictement croissante**.
**Preuve (étapes) :** sans objet.
**Intuition :** (2) dit que la densité ne dépend de l'observation, pour ce qui concerne $\theta$, qu'à travers $T(z)$ ; $h(z)$ ne porte pas d'information sur $\theta$ et disparaît de tout rapport. (ii) : plus $T$ est grand, plus les observations plaident pour les grandes valeurs de $\theta$ — $T$ ordonne les observations comme $\theta$ ordonne les lois. Ainsi la région $\{r>c\}$ est toujours de la forme $\{T>d\}$, avec un seuil indépendant de la valeur $\theta_1$ retenue sous l'alternative.
**Pièges / erreurs classiques :** la croissance doit être **stricte** (le modèle uniforme, de rapport seulement croissant au sens large, sort du cadre : Ex. 4.5, Exercice 7) ; la condition porte sur $\theta>\theta'$ (sens important).

---

### Exemple 1.4 — Modèle gaussien $\mathcal{N}(\theta,1)$
**Source :** Poly ch.5, Exemple 1.4, p. 19
**Hypothèses :** $Z=(X_1,\dots,X_n)$ $n$-échantillon de $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\theta,1),\ \theta\in\mathbb{R}\}\big)$ ; $z=(x_1,\dots,x_n)$, $T(z):=n^{-1}\sum_{i=1}^nx_i$.
**Énoncé / calcul :**
$$p_\theta(z)=\underbrace{\frac{1}{(2\pi)^{n/2}}\exp\Big(-\frac12\sum_{i=1}^nx_i^2\Big)}_{h(z)}\ \underbrace{\exp\big(n\theta\,T(z)-n\theta^2/2\big)}_{\psi(T(z);\theta)},$$
et pour $\theta>\theta'$,
$$t\longmapsto\frac{\psi(t;\theta)}{\psi(t;\theta')}=\exp\big((\theta-\theta')\,n\,t-(n/2)(\theta^2-\theta'^2)\big)$$
est strictement croissante (exponentielle d'une fonction affine de pente $n(\theta-\theta')>0$). Le modèle est à rapport de vraisemblance monotone croissant **en la moyenne empirique**.
**Méthodes mobilisées :** développement du carré $(x_i-\theta)^2=x_i^2-2\theta x_i+\theta^2$ ; factorisation (2) ; vérification de la stricte monotonie.
**Intuition :** cas d'école ; cf. famille exponentielle avec $\varphi(\theta)=\theta$.

---

### Exemple 1.5 — Modèle de Bernoulli
**Source :** Poly ch.5, Exemple 1.5, p. 19
**Hypothèses :** $Z=(X_1,\dots,X_n)$ $n$-échantillon de $\big(\{0,1\},\mathcal{P}(\{0,1\}),\{\mathcal{B}\mathrm{er}(\theta),\ \theta\in\Theta:=]0,1[\}\big)$, dominé par la mesure de comptage sur $\{0,1\}^n$ ; $T(z):=\sum_{i=1}^nx_i$.
**Énoncé / calcul :**
$$p_\theta(z)=(1-\theta)^n\Big(\frac{\theta}{1-\theta}\Big)^{T(z)},$$
c'est-à-dire (2) avec $h(z):=1$ et $\psi(t;\theta):=(1-\theta)^n\big(\theta/(1-\theta)\big)^t$. Pour $\theta>\theta'$,
$$t\longmapsto\frac{\psi(t;\theta)}{\psi(t;\theta')}=\frac{(1-\theta)^n}{(1-\theta')^n}\Big(\frac{\theta(1-\theta')}{\theta'(1-\theta)}\Big)^t$$
est strictement croissante, car $\theta\mapsto\theta/(1-\theta)$ est strictement croissante sur $]0,1[$, de sorte que $\theta(1-\theta')/\big(\theta'(1-\theta)\big)>1$.
**Méthodes mobilisées :** factorisation (2) ; monotonie de la cote $\theta/(1-\theta)$.
**Intuition :** les Ex. 1.4 et 1.5 sont des cas particuliers du critère « famille exponentielle à $\varphi$ monotone » (compléments).
**Pièges / erreurs classiques :** ici $T$ est **discrète** : le Th. 1.3 (qui suppose $T(Z)$ à densité) ne s'applique pas tel quel ; il faut sa version randomisée (Ex. 4.2).

---

### Théorème 1.3 — Test U.P.P. pour une hypothèse unilatérale, cas croissant
**Source :** Poly ch.5, Théorème 1.3, p. 20 ; démonstration complète dans les Compléments, p. 47
**Hypothèses :**
- modèle à rapport de vraisemblance monotone **croissant** en la statistique $T$ (Déf. 1.4) ;
- pour tout $\theta\in\Theta$, $T(Z)$ est **à densité** par rapport à la mesure de Lebesgue sous $\mathbb{P}_\theta$ ;
- $\theta_0\in\Theta$, $\alpha\in\,]0,1[$.

**Énoncé :**
(i) Il existe un test U.P.P.($\alpha$) de
$$H_0:\theta\le\theta_0\quad\text{contre}\quad H_1:\theta>\theta_0,$$
de fonction critique
$$\phi_{\theta_0}(z):=\mathbb{1}_{\{T(z)>d_\alpha\}},$$
où $d_\alpha$ est l'unique solution de $\mathbb{P}_{\theta_0}(T(Z)>d_\alpha)=\alpha$.
(ii) La fonction puissance $\theta\mapsto\beta_{\phi_{\theta_0}}(\theta)$ est **croissante** sur $\Theta$.

**Preuve (étapes) :** *(esquissée p. 20 en trois temps ; écrite en entier dans les compléments p. 47 — reproduite ici)*
*Temps 1 — Optimalité pour des hypothèses simples.*
1. Fixons $\theta_1>\theta_0$ et le test $H_0':\theta=\theta_0$ contre $H_1':\theta=\theta_1$. Par la factorisation (2), là où $p_{\theta_0}(z)>0$,
$$r_{\theta_0,\theta_1}(z):=\frac{p_{\theta_1}(z)}{p_{\theta_0}(z)}=\frac{\psi(T(z);\theta_1)}{\psi(T(z);\theta_0)},$$
fonction **strictement croissante** de $T(z)$ (Déf. 1.4 (ii), $h$ se simplifie).
2. Donc pour tout $c$ il existe $d$ tel que $\{z:\ p_{\theta_1}(z)>c\,p_{\theta_0}(z)\}=\{z:\ T(z)>d\}$ (convention $d=\pm\infty$ dans les cas dégénérés).
3. $T(Z)$ étant à densité sous $\mathbb{P}_{\theta_0}$, le rapport de vraisemblance **n'a pas d'atome** et le **Th. 1.1** s'applique : il existe $d_\alpha$, unique solution de $\mathbb{P}_{\theta_0}(T(Z)>d_\alpha)=\alpha$, tel que $\phi_{\theta_0}=\mathbb{1}_{\{T>d_\alpha\}}$ soit U.P.P.($\alpha$) pour $(H_0',H_1')$.
4. L'équation de $d_\alpha$ ne fait intervenir que $\mathbb{P}_{\theta_0}$ : $\phi_{\theta_0}$ **ne dépend pas de $\theta_1$**, donc il est U.P.P.($\alpha$) pour $H_0':\theta=\theta_0$ contre $H_1'':\theta>\theta_0$ (optimal en chaque $\theta_1>\theta_0$).

*Temps 2 — Croissance de la fonction puissance (point (ii)).*
5. $\phi_{\theta_0}(z)=\varphi(T(z))$ avec $\varphi(u)=\mathbb{1}_{\{u>d_\alpha\}}$, fonction **croissante** (et bornée, donc intégrable). Le **Lemme 2.1** (monotonie) donne : $\theta\mapsto\mathbb{E}_\theta[\varphi\circ T(Z)]=\beta_{\phi_{\theta_0}}(\theta)$ est croissante.

*Temps 3 — Passage à l'hypothèse nulle composite.*
6. Par croissance, pour tout $\theta\le\theta_0$ : $\beta_{\phi_{\theta_0}}(\theta)\le\beta_{\phi_{\theta_0}}(\theta_0)=\alpha$, donc $\phi_{\theta_0}\in\mathcal{K}_\alpha(\{\theta\le\theta_0\})$ (et sa **taille** sur $\{\theta\le\theta_0\}$ vaut exactement $\alpha$).
7. Un test de niveau $\alpha$ pour $\theta\le\theta_0$ l'est en particulier pour $\theta=\theta_0$ : $\mathcal{K}_\alpha(\{\theta\le\theta_0\})\subseteq\mathcal{K}_\alpha(\{\theta=\theta_0\})$.
8. $\phi_{\theta_0}$ maximise la puissance en chaque $\theta>\theta_0$ dans la **grande** classe $\mathcal{K}_\alpha(\{\theta=\theta_0\})$ et appartient à la **petite** : il la maximise aussi dans $\mathcal{K}_\alpha(\{\theta\le\theta_0\})$. Il est U.P.P.($\alpha$) pour $\theta\le\theta_0$ contre $\theta>\theta_0$. $\square$

**Intuition :** la **croissance de la fonction puissance** est le point central : elle permet de ne contrôler la taille **qu'en $\theta_0$**, borne extrémale de $H_0$, et d'obtenir gratuitement le niveau pour tout $\theta<\theta_0$. Schéma de preuve récurrent : *optimal dans une classe plus grande + appartenance à la petite classe $\Rightarrow$ optimal dans la petite.*
**Remarque du poly (p. 20) :** on peut dire davantage : $\beta_{\phi_{\theta_0}}$ est **strictement** croissante sur $\{\theta\in\Theta:\ \beta_{\phi_{\theta_0}}(\theta)<1\}$. Ce raffinement **n'est pas démontré** et n'est utilisé nulle part.
**Pièges / erreurs classiques :** chercher à contrôler le niveau en chaque point de $\Theta_0$ séparément (inutile grâce à la monotonie) ; calculer le seuil sous $\theta_1$ ; oublier l'hypothèse « $T(Z)$ à densité » (sinon randomiser, cf. compléments).

---

### Définition 1.5 — Famille à rapport de vraisemblance monotone décroissant
**Source :** Poly ch.5, Définition 1.5, p. 20
**Hypothèses :** $\mu$ mesure $\sigma$-finie sur $(\mathsf{Z},\mathcal{Z})$, modèle $\big(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta=p_\theta\cdot\mu,\ \theta\in\Theta\}\big)$, $\Theta\subseteq\mathbb{R}$.
**Énoncé :** La famille est dite **à rapport de vraisemblance monotone décroissant** si la factorisation (2) a lieu et si, pour tous $\theta,\theta'\in\Theta$ tels que $\theta>\theta'$, la fonction $t\longmapsto\psi(t;\theta)/\psi(t;\theta')$ est **strictement décroissante**.
**Preuve (étapes) :** sans objet.
**Intuition :** même définition au sens de la monotonie près : les **petites** valeurs de $T$ plaident pour les grandes valeurs de $\theta$. Équivaut à « croissant en $-T$ ».

---

### Théorème 1.4 — Test U.P.P. pour une hypothèse unilatérale, cas décroissant
**Source :** Poly ch.5, Théorème 1.4, p. 20–21 ; démonstration dans les Compléments, p. 47–48
**Hypothèses :** modèle à rapport de vraisemblance monotone **décroissant** en $T$ (Déf. 1.5) ; $T(Z)$ à densité par rapport à Lebesgue sous chaque $\mathbb{P}_\theta$ ; $\theta_0\in\Theta$, $\alpha\in\,]0,1[$.
**Énoncé :**
(i) Il existe un test U.P.P.($\alpha$) de $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$, de fonction critique
$$\phi_{\theta_0}(z):=\mathbb{1}_{\{T(z)<d_\alpha\}},$$
où $d_\alpha$ est l'unique solution de $\mathbb{P}_{\theta_0}(T(Z)<d_\alpha)=\alpha$.
(ii) La fonction puissance $\theta\mapsto\beta_{\phi_{\theta_0}}(\theta)$ est croissante sur $\Theta$.
**Preuve (étapes) :** *(se ramène au Th. 1.3 en remplaçant $T$ par $-T$ ; compléments p. 47–48)*
1. Si $t\mapsto\psi(t;\theta)/\psi(t;\theta')$ est strictement décroissante pour $\theta>\theta'$, on pose $\tilde T(z):=-T(z)$ et $\tilde\psi(t;\theta):=\psi(-t;\theta)$ ; alors $p_\theta(z)=h(z)\,\tilde\psi(\tilde T(z);\theta)$ avec un rapport **strictement croissant** en $\tilde T$ (composition par $t\mapsto-t$).
2. $\tilde T(Z)=-T(Z)$ est à densité sous chaque $\mathbb{P}_\theta$ dès que $T(Z)$ l'est.
3. Le Th. 1.3 donne un test U.P.P.($\alpha$) qui rejette lorsque $\tilde T(Z)>\tilde d_\alpha$, c'est-à-dire $T(Z)<d_\alpha$ avec $d_\alpha:=-\tilde d_\alpha$, la condition de taille s'écrivant $\mathbb{P}_{\theta_0}(T(Z)<d_\alpha)=\alpha$.
4. La fonction puissance, croissante en $\theta$ d'après le point (ii) du Th. 1.3, reste croissante. $\square$
**Intuition :** on renverse la région de rejet, pas le sens de la monotonie de la puissance en $\theta$.

---

### Remarque (non numérotée — p. 21) — Les régions de rejet des tests unilatéraux
**Source :** Poly ch.5, paragraphe « Les régions de rejet des tests unilatéraux », p. 21
**Hypothèses :** Th. 1.3–1.4 ; $H_0:\theta\ge\theta_0$ s'en déduit en renversant les inégalités.
**Énoncé :** Les quatre régions de rejet à savoir produire :

| Monotonie du rapport en $T$ | Hypothèses | On rejette lorsque | Seuil |
|---|---|---|---|
| croissant | $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ | $T(Z)>d_\alpha$ | $\mathbb{P}_{\theta_0}(T(Z)>d_\alpha)=\alpha$ |
| croissant | $H_0:\theta\ge\theta_0$ contre $H_1:\theta<\theta_0$ | $T(Z)<d_\alpha$ | $\mathbb{P}_{\theta_0}(T(Z)<d_\alpha)=\alpha$ |
| décroissant | $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ | $T(Z)<d_\alpha$ | $\mathbb{P}_{\theta_0}(T(Z)<d_\alpha)=\alpha$ |
| décroissant | $H_0:\theta\ge\theta_0$ contre $H_1:\theta<\theta_0$ | $T(Z)>d_\alpha$ | $\mathbb{P}_{\theta_0}(T(Z)>d_\alpha)=\alpha$ |

Dans les quatre cas, **le seuil se lit sous $\mathbb{P}_{\theta_0}$**, à la borne extrémale de $H_0$.
**Preuve (étapes) :** Th. 1.3 / 1.4, et renversement $\theta\mapsto$ ordre inverse pour $H_0:\theta\ge\theta_0$ (non détaillé dans le poly).
**Intuition :** règle mnémotechnique : *on rejette du côté où la statistique rend l'alternative plus vraisemblable*. Rapport croissant en $T$ : grandes valeurs de $T$ $\leftrightarrow$ grandes valeurs de $\theta$, donc on rejette $\theta\le\theta_0$ quand $T$ est grand ; rapport décroissant : tout est renversé.

---

### Méthode 1.3 — Test U.P.P.($\alpha$) pour une hypothèse unilatérale
**Source :** Poly ch.5, Méthode 1.3, p. 21
**Hypothèses :** Il n'existe pas de test U.P.P.($\alpha$) en général. On sait en construire un lorsque :
1. le paramètre est scalaire, $\Theta\subseteq\mathbb{R}$ ;
2. l'hypothèse est unilatérale, p. ex. $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ ;
3. la famille est à rapport de vraisemblance monotone en une statistique $T$ : $p_\theta(z)=h(z)\,\psi(T(z);\theta)$ avec $t\mapsto\psi(t;\theta)/\psi(t;\theta')$ strictement monotone pour $\theta>\theta'$.

**Énoncé :** Alors, pour $\theta>\theta'$, le rapport $r_{\theta',\theta}(Z)=\psi(T(Z);\theta)/\psi(T(Z);\theta')$ est une fonction monotone de $T(Z)$ ; et si $T(Z)$ est à densité, le test U.P.P.($\alpha$) est $\phi(Z)=\mathbb{1}_{\{T(Z)>d_\alpha\}}$ ou $\phi(Z)=\mathbb{1}_{\{T(Z)<d_\alpha\}}$ selon le sens de la monotonie, $d_\alpha$ étant choisi pour que la taille soit **exactement $\alpha$ en $\theta_0$**.
**Preuve (étapes) :** Th. 1.3 / 1.4.
**Intuition :** trois vérifications (scalaire, unilatéral, monotone) puis le calcul d'un seuil sous $\mathbb{P}_{\theta_0}$. Mise en œuvre : Exercice 1 (modèle exponentiel) ; autres applications en compléments (variance/précision gaussienne, modèle uniforme où le test U.P.P. existe sans être unique).

---

### Proposition 1.1 — Absence de test U.P.P. pour une hypothèse bilatérale
**Source :** Poly ch.5, Proposition 1.1, p. 22
**Hypothèses :**
- $Z=(X_1,\dots,X_n)$ $n$-échantillon d'une **famille exponentielle** de densité $p_\theta(x)=h(x)\exp\big(\varphi(\theta)T(x)-\psi(\theta)\big)$ par rapport à une mesure de domination $\mu$, où $h,\varphi,T,\psi$ sont à valeurs scalaires et $\theta\mapsto\varphi(\theta)$ est **strictement croissante** ;
- $\mathbb{P}_\theta\big(\sum_{i=1}^nT(X_i)=c\big)=0$ pour tout $\theta\in\Theta$ et tout $c\in\mathbb{R}$ (absence d'atome) ;
- $\alpha\in\,]0,1[$.

**Énoncé :** Il n'existe pas de test U.P.P.($\alpha$) pour
$$H_0:\theta=\theta_0\quad\text{contre}\quad H_1:\theta\neq\theta_0.\tag{3}$$
**Preuve (étapes) :**
1. Notons $T_n(z):=\sum_{i=1}^nT(x_i)$. Pour $\theta_1\neq\theta_0$, le rapport de vraisemblance entre $\theta_1$ et $\theta_0$ vaut (produit des densités, $h$ se simplifie)
$$\exp\Big(\big(\varphi(\theta_1)-\varphi(\theta_0)\big)T_n(z)-n\big(\psi(\theta_1)-\psi(\theta_0)\big)\Big),$$
fonction strictement croissante de $T_n(z)$ si $\theta_1>\theta_0$ et strictement décroissante si $\theta_1<\theta_0$ ($\varphi$ strictement croissante).
2. Le **Th. 1.1** donne, pour le test simple $H_0':\theta=\theta_0$ contre $H_1':\theta=\theta_1$, un test U.P.P.($\alpha$) de la forme
$$\phi_+(z)=\mathbb{1}_{\{T_n(z)>d^+_\alpha\}}\ \text{si}\ \theta_1>\theta_0,\qquad\phi_-(z)=\mathbb{1}_{\{T_n(z)<d^-_\alpha\}}\ \text{si}\ \theta_1<\theta_0,$$
les deux seuils étant fixés par la condition de taille $\alpha$ sous $\mathbb{P}_{\theta_0}$ ; l'absence d'atome assure que ces tests sont purs.
3. *Par l'absurde*, soit $\phi^\star$ U.P.P.($\alpha$) pour (3). Il est de niveau $\alpha$ et domine tout test de niveau $\alpha$ en chaque $\theta\neq\theta_0$ ; il est donc U.P.P.($\alpha$) pour **chacun** des tests simples $H_0'$ contre $H_1'$, quel que soit $\theta_1\neq\theta_0$.
4. Le **Th. 1.2** (unicité) appliqué avec $\theta_1>\theta_0$ donne $\phi^\star=\phi_+$ $\mathbb{P}_{\theta_0}$-p.s. ; avec $\theta_1<\theta_0$, $\phi^\star=\phi_-$ $\mathbb{P}_{\theta_0}$-p.s.
5. Or $\phi_+$ et $\phi_-$ diffèrent sur $\{T_n>d^+_\alpha\}$ et $\{T_n<d^-_\alpha\}$, tous deux de probabilité $\alpha>0$ sous $\mathbb{P}_{\theta_0}$ : contradiction. $\square$
**Intuition :** le meilleur test contre une alternative à droite rejette pour les grandes valeurs de la statistique, celui contre une alternative à gauche pour les petites ; aucun test ne fait les deux sans perdre de la puissance de chaque côté. La notion d'optimalité U.P.P. est **trop exigeante** pour le test le plus courant en pratique.
**Pièges / erreurs classiques :** croire que le test bilatéral usuel $|\bar X_n-\theta_0|$ grand est U.P.P. : il ne l'est pas, c'est un **compromis** (il est seulement U.M.P.U., Exercice 5).

---

### Exemple 1.6 — Le cas gaussien
**Source :** Poly ch.5, Exemple 1.6, p. 22–23
**Hypothèses :** modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\theta,1),\ \theta\in\mathbb{R}\}\big)$, $n$-échantillon.
**Énoncé / calcul :**
$$p_\theta(z)=\frac{1}{\sqrt{2\pi}}e^{-z^2/2}\exp\big(\theta z-\theta^2/2\big),$$
famille exponentielle avec $h(z)=(2\pi)^{-1/2}e^{-z^2/2}$, $T(z)=z$, $\varphi(\theta)=\theta$ (strictement croissante), $\psi(\theta)=\theta^2/2$ ; $\mathbb{P}_\theta(\sum_iX_i=c)=0$ pour tout $c$ car $\sum_iX_i$ est à densité. Les deux tests de Neyman-Pearson sont
$$\phi_+(Z)=\mathbb{1}_{\{\sum_{i=1}^nX_i>n\theta_0+\sqrt n\,z_{1-\alpha}\}},\qquad\phi_-(Z)=\mathbb{1}_{\{\sum_{i=1}^nX_i<n\theta_0-\sqrt n\,z_{1-\alpha}\}},$$
et ils diffèrent : **il n'existe pas de test U.P.P.($\alpha$)** pour $\theta=\theta_0$ contre $\theta\neq\theta_0$.
**Méthodes mobilisées :** identification d'une famille exponentielle ; Prop. 1.1 ; seuils sous $\mathbb{P}_{\theta_0}$ via $\sum_iX_i\sim\mathcal{N}(n\theta_0,n)$.
**Intuition :** deux affaiblissements possibles : (a) se restreindre aux **tests sans biais** $\to$ optimalité **U.M.P.U.** (compléments, Exercice 5) ; (b) mesurer la performance par la **vitesse de séparation** à laquelle un test détecte une alternative (évoqué en clôture des compléments).

---

### Remarque (non numérotée — §1.10) — Comment interpréter la décision d'un test
**Source :** Poly ch.5, §1.10, p. 23
**Hypothèses :** —
**Énoncé :**
- *Si j'accepte $H_0$, ai-je prouvé $H_0$ ?* **Certainement pas.** On a seulement échoué à rejeter $H_0$ : pas assez d'information statistique pour la rejeter. Aucune contradiction à échouer à rejeter $H_0:\mu\le\mu_0$ (contre $\mu>\mu_0$) **et** à échouer à rejeter $H_0:\mu>\mu_0$ (contre $\mu\le\mu_0$) : les deux tests ne sont pas construits sur la même hypothèse nulle.
- *Si je rejette $H_0$, ai-je prouvé $H_1$ ?* **Non**, mais on a tiré une conclusion statistique : sous $H_0$, la probabilité d'observer ce que l'on a observé est inférieure à $\alpha$ ; on a des raisons de croire que l'on n'est pas sous $H_0$. Le modèle lui-même peut être incorrect, ou $\theta\neq\theta_0$ peut ne pas impliquer $\theta=\theta_1$.
**Preuve (étapes) :** sans objet.
**Intuition :** asymétrie des hypothèses : seule la décision de rejet est « forte ».

---

### Remarque (non numérotée — §1.10) — La $p$-valeur du test U.P.P.
**Source :** Poly ch.5, §1.10 « La p-valeur du test U.P.P. », p. 23
**Hypothèses :** $p$-valeur définie au chapitre 4 (Déf. 2.4) pour une famille de tests à régions de rejet emboîtées ; modèle gaussien de variance connue (Ex. 1.3).
**Énoncé :** La famille $\phi^\star_\alpha(Z)=\mathbb{1}_{\{\bar X_n>\mu_0+\sigma z_{1-\alpha}/\sqrt n\}}$ : quand $\alpha\downarrow0$, $z_{1-\alpha}\uparrow+\infty$ et le seuil croît, les régions sont **emboîtées**. La valeur de $\alpha$ où la décision bascule égalise seuil et moyenne observée :
$$\mu_0+\frac{\sigma\,z_{1-\hat\alpha(Z)}}{\sqrt n}=\bar X_n,\qquad\text{c'est-à-dire}\qquad\hat\alpha(Z)=1-\Phi\Big(\frac{\sqrt n\,(\bar X_n-\mu_0)}{\sigma}\Big).$$
C'est la $p$-valeur déjà calculée au chapitre 4 (Ex. 2.13).
**Preuve (étapes) :** 1. Emboîtement des régions (monotonie de $\alpha\mapsto z_{1-\alpha}$). 2. Résolution de l'égalité seuil = $\bar X_n$ par $\Phi(z_\beta)=\beta$.
**Intuition :** l'optimalité ne change pas la lecture d'une $p$-valeur ; elle dit seulement de quelle famille de tests elle est issue.

---

### Remarque (non numérotée — §1.10) — Statistiquement significatif, et taille d'effet
**Source :** Poly ch.5, §1.10, p. 23–24
**Hypothèses :** puissance du test U.P.P. de l'Ex. 1.3.
**Énoncé :** Significativité statistique et importance de l'effet sont deux choses différentes (chapitre 4, Ex. 2.14, bruit d'aéroport : un dépassement de 8 dB sur $n=4$ observations ne conduit pas à rejeter ; un dépassement de 0,2 dB sur $n=10^4$ y conduit). Contre-exemple cité : « *Moins il y a de gens quand c'est significatif, et plus c'est significatif. Tout essai qui comporte plus de 10 000 personnes est un essai qui cherche à démontrer des choses qui n'existent pas.* » (D. Raoult, devant les députés, 2020). **Énoncé correct :** moins il y a de participants lorsqu'un résultat est significatif, plus l'effet doit être grand pour avoir été détecté ; un essai qui nécessite plus de 10 000 personnes cherche à détecter des **effets petits**. Lecture directe de
$$\beta_{\phi^\star}(\mu_1)=1-\Phi\big(z_{1-\alpha}-\sqrt n\,m/\sigma\big),\qquad m=\mu_1-\mu_0:$$
**à niveau et puissance fixés, la taille d'effet $m$ détectable décroît en $n^{-1/2}$.**
**Preuve (étapes) :** fixer $\beta_{\phi^\star}(\mu_1)=1-\beta_0$ impose $z_{1-\alpha}-\sqrt n\,m/\sigma=$ constante, donc $m\propto\sigma/\sqrt n$ (lecture directe, non détaillée davantage dans le poly).
**Intuition :** les tests sont précieux (risque de 1re espèce contrôlé, optimalité) et dangereux (décision binaire, muette sur l'ampleur de l'écart). **La conclusion d'un test se lit toujours avec la taille d'effet à côté.** (Figure : « Le problème de la taille d'effet », source *Nature*, 2019.)
**Pièges / erreurs classiques :** confondre « significatif » et « important » ; croire qu'un grand $n$ fabrique de faux effets.

---

### Remarque (non numérotée — §1.11) — Programme des exercices
**Source :** Poly ch.5, §1.11, p. 24–25
**Énoncé :**

| Exercice | Notions du cours | Rappels |
|---|---|---|
| Exo 1 – Modèle exponentiel | rapport de vraisemblance monotone, test unilatéral | Loi Gamma, additivité |
| Exo 2 – Monotonie en le niveau | fonction critique de Neyman-Pearson, taille et puissance | Fonctions monotones, cas d'égalité |
| Exo 3 – Temps d'attente | rapport de vraisemblance monotone, statistique discrète | Loi géométrique, loi binomiale négative |
| Exo 4 – Exponentielle translatée | test U.P.P. non unique, puissance égale à 1 | Statistiques d'ordre, loi de $X_{1:n}$ |
| Exo 5 – Modèle gaussien | absence de test U.P.P. bilatéral, test sans biais, U.M.P.U. | Loi gaussienne, quantiles |
| Exo 6 – Rapport généralisé | rapport de vraisemblance généralisé | Modèle linéaire gaussien, loi de Fisher |
| Exo 7 – Modèle uniforme | rapport croissant sans être strictement croissant, test U.P.P. non unique | Statistiques d'ordre, loi de $X_{n:n}$ |

Exo 1 : application directe du Th. 1.3. Exo 2 : seul exercice purement théorique ($c_\alpha$ décroît avec $\alpha$, le risque de 2e espèce aussi — propriété qui fonde la $p$-valeur). Exo 3 : plan d'expérience de durée aléatoire, statistique discrète. Exo 4 : exception à la règle « taille exactement $\alpha$ » (puissance 1 sur $\Theta_1$). Exo 5 : Prop. 1.1 en gaussien + test bilatéral U.M.P.U. Exo 6 : rapport généralisé, modèle linéaire, ANOVA. Exo 7 : non-unicité dans le modèle uniforme.
**Notions de probabilités clés à revoir :** fonction de répartition et fonction quantile, loi Gamma et loi du $\chi^2$, statistiques d'ordre, loi géométrique et loi binomiale négative, loi de Fisher.
**Preuve (étapes) :** sans objet. **Intuition :** feuille de route.

---

## 3. Outils mathématiques

> Section « Les outils mathématiques » (§2 du poly, p. 26–28) : fonction de répartition et fonction quantile (construction de la valeur critique), lemme de monotonie (croissance de la fonction puissance), loi binomiale négative (Exercice 3), et liste des résultats antérieurs utilisés sans démonstration.

### Notation (outils, p. 26) — Fonction de répartition et fonction de survie
**Source :** Poly ch.5, Outils, « Fonction de survie, sauts et fonction quantile », p. 26
**Énoncé :** $Y$ v.a. réelle, $F(c):=\mathbb{P}(Y\le c)$ (fonction de répartition), $\bar F(c):=\mathbb{P}(Y>c)=1-F(c)$ (fonction de survie).

---

### Proposition 2.1 — Régularité de la fonction de répartition
**Source :** Poly ch.5, Outils, Proposition 2.1, p. 26
**Hypothèses :** $Y$ v.a. réelle, $F$, $\bar F$ comme ci-dessus.
**Énoncé :** $F$ est croissante, continue à droite, et admet en tout point une limite à gauche $F(c^-)=\mathbb{P}(Y<c)$. Le saut de $F$ en $c$ vaut $F(c)-F(c^-)=\mathbb{P}(Y=c)$. Symétriquement, $\bar F$ est décroissante, continue à droite, $\bar F(c^-)=\mathbb{P}(Y\ge c)$, de sorte que $\bar F(c^-)-\bar F(c)=\mathbb{P}(Y=c)$.
**Preuve (étapes) :**
1. Croissance de $F$ : immédiate ($\{Y\le c\}\subseteq\{Y\le c'\}$ si $c\le c'$).
2. Continuité à droite : pour $(c_k)$ décroissant vers $c$, $\{Y\le c_k\}$ décroît vers $\bigcap_k\{Y\le c_k\}=\{Y\le c\}$ ; la **continuité décroissante** de la mesure de probabilité donne $F(c_k)\to F(c)$.
3. Limite à gauche : pour $(c_k)$ croissant **strictement** vers $c$, $\{Y\le c_k\}$ croît vers $\bigcup_k\{Y\le c_k\}=\{Y<c\}$ ; la **continuité croissante** donne $F(c_k)\to\mathbb{P}(Y<c)$.
4. Le saut s'obtient par différence ; les énoncés sur $\bar F=1-F$ s'en déduisent. $\square$
**Intuition :** une valeur $c$ avec $\mathbb{P}(Y=c)>0$ est un **atome** ; « pas d'atome » $\iff$ $F$ (ou $\bar F$) continue sur $\mathbb{R}$ — en particulier si $Y$ a une densité par rapport à Lebesgue. Si de plus $\bar F(0)=1$ et $\lim_{c\to+\infty}\bar F(c)=0$, le **TVI** garantit une solution à $\bar F(c)=\alpha$ pour tout $\alpha\in\,]0,1[$ : c'est l'argument d'existence de $c_\alpha$ dans le Th. 1.1.
**Pièges / erreurs classiques :** confondre $\mathbb{P}(Y<c)$ et $\mathbb{P}(Y\le c)$ en présence d'atomes.

---

### Définition (outils, p. 26) — Fonction quantile (inverse généralisée)
**Source :** Poly ch.5, Outils, p. 26
**Hypothèses :** $F$ fonction de répartition, éventuellement avec atomes.
**Énoncé :** Lorsque la loi a des atomes, l'équation $\bar F(c)=\alpha$ peut n'avoir aucune solution. On utilise la **fonction quantile**
$$F^{-1}(u):=\inf\{c\in\mathbb{R}:\ F(c)\ge u\},\qquad u\in\,]0,1[,$$
qui vérifie $F(F^{-1}(u))\ge u$ et $F(F^{-1}(u)^-)\le u$ : la valeur $u$ est comprise entre les deux valeurs que $F$ prend de part et d'autre de son saut. Ce raisonnement, mené sur $\bar F$, donne le couple $(c_\alpha,\gamma_\alpha)$ du théorème général (Th. 4.1). Notations : quantile d'ordre $\beta$ de $\mathcal{N}(0,1)$ noté $z_\beta$ ; de $\chi^2(k)$ noté $\chi^2_\beta(k)$.
**Preuve (étapes) :** non détaillée dans le poly (propriétés admises).
**Intuition :** quand on ne peut pas tomber exactement sur $u$, on encadre $u$ par les valeurs de $F$ juste avant et au saut ; la randomisation interpole entre les deux.

---

### Lemme 2.1 — Monotonie sous rapport de vraisemblance monotone
**Source :** Poly ch.5, Outils, Lemme 2.1, p. 27
**Hypothèses :**
- modèle à rapport de vraisemblance monotone croissant en la statistique $T$ (Déf. 1.4) ;
- $\varphi:\mathbb{R}\to\mathbb{R}$ **croissante** (au sens large) telle que $\mathbb{E}_\theta[|\varphi\circ T(Z)|]<\infty$ pour tout $\theta\in\Theta$.

**Énoncé :** La fonction
$$\theta\longmapsto\mathbb{E}_\theta[\varphi\circ T(Z)]$$
est croissante (au sens large) sur $\Theta$.
**Preuve (étapes) :**
1. Soient $\theta'<\theta$ dans $\Theta$ ; on pose $A:=\{z\in\mathsf{Z}:\ p_{\theta'}(z)>p_\theta(z)\}$.
2. Là où $p_{\theta'}(z)>0$, la **factorisation (2)** donne $p_\theta(z)/p_{\theta'}(z)=\psi(T(z);\theta)/\psi(T(z);\theta')$, fonction **strictement croissante** de $T(z)$. Il existe donc $d\in\mathbb{R}\cup\{-\infty,+\infty\}$, à savoir
$$d:=\sup\{t\in\mathbb{R}:\ \psi(t;\theta)/\psi(t;\theta')<1\},$$
tel que $A=\{z\in\mathsf{Z}:\ T(z)<d\}$ (à un ensemble $\mu$-négligeable près, celui où $h(z)=0$).
3. $\varphi$ étant croissante :
$$b:=\inf_{z\in A^c}\varphi\circ T(z)\ \ge\ a:=\sup_{z\in A}\varphi\circ T(z)$$
(sur $A$, $T<d$ ; sur $A^c$, $T\ge d$).
4. On sépare l'intégrale sur $A$ et $A^c$, en observant que $p_\theta-p_{\theta'}$ est **négative sur $A$** et **positive sur $A^c$** :
$$\begin{aligned}\mathbb{E}_\theta[\varphi\circ T(Z)]-\mathbb{E}_{\theta'}[\varphi\circ T(Z)]&=\int_A\varphi\circ T(z)\{p_\theta(z)-p_{\theta'}(z)\}\,\mu(\mathrm{d}z)+\int_{A^c}\varphi\circ T(z)\{p_\theta(z)-p_{\theta'}(z)\}\,\mu(\mathrm{d}z)\\&\ge a\int_A\{p_\theta(z)-p_{\theta'}(z)\}\,\mu(\mathrm{d}z)+b\int_{A^c}\{p_\theta(z)-p_{\theta'}(z)\}\,\mu(\mathrm{d}z)\\&=(b-a)\int_{A^c}\{p_\theta(z)-p_{\theta'}(z)\}\,\mu(\mathrm{d}z)\ \ge\ 0,\end{aligned}$$
5. Justification de l'avant-dernière égalité : $\int_{\mathsf{Z}}\{p_\theta-p_{\theta'}\}\,\mathrm{d}\mu=0$ (les deux densités sont d'intégrale 1), donc $\int_A\{p_\theta-p_{\theta'}\}\,\mathrm{d}\mu=-\int_{A^c}\{p_\theta-p_{\theta'}\}\,\mathrm{d}\mu$. Dernière inégalité : $b-a\ge0$ et $p_\theta-p_{\theta'}\ge0$ sur $A^c$. $\square$
**Intuition :** dans une famille à rapport de vraisemblance monotone, augmenter $\theta$ pousse $T$ vers le haut au sens de la **dominance stochastique** : l'espérance de toute fonction croissante de $T$ augmente. Appliqué à $\varphi(u)=\mathbb{1}_{\{u>d_\alpha\}}$, il donne la croissance de $\theta\mapsto\mathbb{P}_\theta(T(Z)>d_\alpha)$, i.e. de la fonction puissance du test unilatéral (Th. 1.3 (ii)).
**Pièges / erreurs classiques :** les inégalités de l'étape 4 utilisent les **signes** de $p_\theta-p_{\theta'}$ sur $A$ (où l'on minore par $a\times$ négatif, donc on utilise $\varphi\circ T\le a$) et sur $A^c$ (où l'on minore par $b\times$ positif, $\varphi\circ T\ge b$). C'est **le seul énoncé technique du chapitre**.

---

### Définition (outils, p. 27–28) — Loi géométrique et loi binomiale négative
**Source :** Poly ch.5, Outils, « Loi géométrique et loi binomiale négative », p. 27–28
**Hypothèses :** $\theta\in\,]0,1[$.
**Énoncé :**
- $Y$ à valeurs dans $\mathbb{N}$ suit la **loi géométrique** de paramètre $\theta$ (comptée en **nombre d'échecs avant le premier succès**) si
$$\mathbb{P}_\theta(Y=k)=\theta(1-\theta)^k,\qquad k\in\mathbb{N}.$$
- Si $Y_1,\dots,Y_n$ sont indépendantes de cette loi, $T=\sum_{i=1}^nY_i$ suit la **loi binomiale négative** de paramètres $(n,\theta)$ :
$$\mathbb{P}_\theta(T=k)=\binom{n+k-1}{k}\theta^n(1-\theta)^k,\qquad k\in\mathbb{N}.$$
**Preuve (étapes) :** (esquissée dans le poly) on compte les façons d'écrire $k$ comme somme de $n$ entiers positifs ou nuls, i.e. le nombre de $n$-uplets $(k_1,\dots,k_n)\in\mathbb{N}^n$ de somme $k$, qui vaut $\binom{n+k-1}{k}$ ; chacun a probabilité $\prod_i\theta(1-\theta)^{k_i}=\theta^n(1-\theta)^k$ (par indépendance).
**Intuition :** on lit sur $\mathbb{P}_\theta(T=k)$ que le modèle induit par $T$ est une **famille exponentielle** en $\varphi(\theta)=\log(1-\theta)$, fonction strictement **décroissante** de $\theta$ : il est donc à rapport de vraisemblance monotone croissant **en $-T$** (décroissant en $T$).
**Pièges / erreurs classiques :** convention « nombre d'échecs » (support $\mathbb{N}$) et non « rang du premier succès » (support $\mathbb{N}^*$).

---

### Remarque (outils, p. 28) — Résultats des chapitres précédents utilisés sans démonstration
**Source :** Poly ch.5, Outils, p. 28
**Énoncé :**
- Test pur, région de rejet, fonction puissance, taille, niveau (chapitre 4, Sections 2.2–2.3) : la Déf. 1.1 en est la reprise, étendue aux fonctions critiques à valeurs dans $[0,1]$.
- $p$-valeur (chapitre 4, Section 2.7) : non reprise, renvoi au §1.10.
- Ce qu'un test dit et ne dit pas, significativité et taille d'effet (chapitre 4, Section 2.8) : seule la lecture de la taille d'effet sur la fonction puissance du test U.P.P. appartient à ce chapitre.
- Préordre sur les procédures, ordre partiel des risques, admissibilité, restriction de la classe (chapitre 3, Sections 1.5–1.6) : le test U.P.P. est la borne supérieure de ce préordre restreinte à $\Theta_1$, et $\mathcal{K}_\alpha(\Theta_0)$ joue le rôle de la classe restreinte.
- Le test comme règle de décision, perte 0-1, risque exprimé par la fonction puissance (chapitre 3, Section 4).
- Vraisemblance et log-vraisemblance d'un $n$-échantillon (chapitre 2) : le rapport de vraisemblance est le quotient de la même fonction en deux points du paramètre.
- Familles exponentielles (Exercice 3 (PC2)) : compléments et Prop. 1.1.
- Loi Gamma, additivité, loi du $\chi^2$ et loi de Fisher (chapitre 1, Section 2) : seuils des tests sur la variance, Exercices 1 et 6.
- Statistiques d'ordre, lois de $X_{n:n}$ et $X_{1:n}$ (chapitre 1, Section 1.5) : modèle uniforme, Exercices 4 et 7.
- Modèle linéaire gaussien, estimateur des moindres carrés (chapitres 1 et 2) : Exercice 6.

---

## 4. Exercices du poly

### 4.0 Questions courtes : avez-vous assimilé le chapitre ? (§3.1, p. 29)
**Source :** Poly ch.5, §3.1, p. 29. Le poly donne seulement la référence de chaque question ; les éléments de réponse ci-dessous sont **tirés du cours** (renvois indiqués), pas d'un corrigé du poly.

1. *Définition de la taille et du niveau ; un test de niveau $\alpha$ est-il nécessairement de taille $\alpha$ ? Exemple.* (Déf. 1.1) — Taille $\overline{\alpha}(\phi)=\sup_{\Theta_0}\beta_\phi$, niveau $\alpha$ si $\overline{\alpha}(\phi)\le\alpha$. Non : le test qui ne rejette jamais est de taille $0$ ; le test pur de l'Ex. 4.1 (Poisson) est de taille $0{,}019$ au niveau $0{,}05$ ; $\phi^\star=\mathbb{1}_{\{X_{1:n}>\theta_1\}}$ dans l'Exercice 4.
2. *Qu'est-ce qu'un test U.P.P.($\alpha$) ? Pourquoi la définition ne porte-t-elle que sur $\Theta_1$ ?* (Déf. 1.2) — Sur $\Theta_0$, seule la contrainte de niveau compte (elle ne dépend que des lois de $\Theta_0$) ; l'objectif (puissance) n'a de sens que sur $\Theta_1$.
3. *Énoncer Neyman-Pearson ; forme de la région de rejet ; rôle de l'absence d'atome.* (Th. 1.1, Cadre 1.1) — $\{p_{\theta_1}>c_\alpha p_{\theta_0}\}$ ; l'absence d'atome rend $\bar F$ continue (taille exactement $\alpha$ avec un test pur) et rend la frontière négligeable (unicité).
4. *Vrai ou faux : deux tests U.P.P.($\alpha$) pour deux hypothèses simples coïncident en tout point de $\mathsf{Z}$.* (Th. 1.2) — Faux : seulement $\nu$-p.p. hors de $\{p_{\theta_1}=c_\alpha p_{\theta_0}\}$, et $\mathbb{P}_{\theta_0}$-, $\mathbb{P}_{\theta_1}$-p.s.
5. *Famille à rapport de vraisemblance monotone ; pourquoi U.P.P. unilatéral mais pas bilatéral ?* (Déf. 1.4, Th. 1.3, Prop. 1.1) — Le seuil ne dépend que de $\theta_0$ et la région $\{T>d_\alpha\}$ est la même pour tout $\theta_1>\theta_0$ ; en bilatéral, les tests optimaux à droite et à gauche diffèrent.
6. *Modèle uniforme : pourquoi le test U.P.P. n'est-il pas unique ? Quelle hypothèse fait défaut ?* (Ex. 4.5, complément, Exercice 7) — Le rapport est constant sur $\{X_{n:n}\le\theta_0\}$, non négligeable : absence d'atome / stricte croissance en défaut.
7. *Test sans biais ; rapport entre U.P.P. et U.M.P.U.* (Déf. 4.2, Prop. 4.1) — $\beta_\phi\ge\alpha$ sur $\Theta_1$ ; un U.P.P. est sans biais donc U.M.P.U.
8. *Rapport de vraisemblance vs rapport de vraisemblance généralisé.* (Déf. 1.3, Déf. 4.3) — Le premier est défini pour deux hypothèses simples ($p_{\theta_1}/p_{\theta_0}$, on rejette s'il est grand) ; le second pour des hypothèses composites ($\sup_{\Theta_0}\mathrm{L}_n/\sup_\Theta\mathrm{L}_n\le1$, on rejette s'il est petit).

---

### Exercice 1 — Modèle exponentiel ($\star\star$)
**Source :** Poly ch.5, Exercice 1, énoncé p. 29–30, corrigé p. 37–38 (Groupe 1, traité en petite classe)

**Énoncé complet.** Soit $Z=(X_1,\dots,X_n)$ un $n$-échantillon du modèle
$$\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{p_\theta\cdot\mathrm{Leb},\ \theta\in\Theta:=\mathbb{R}_+^*\}\big),$$
où $\mathrm{Leb}$ est la mesure de Lebesgue et $x\mapsto p(\theta;x)=p_\theta(x):=\theta^{-1}e^{-x/\theta}\mathbb{1}_{\mathbb{R}_+}(x)$. Soit $\theta_0>0$ ; hypothèses $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$.
1. Montrer que la famille $\{p(\theta;\cdot),\ \theta\in\Theta\}$ est à rapport de vraisemblance monotone.
2. Déterminer un test U.P.P.($\alpha$) ; expliciter le calcul des constantes de la fonction critique. (Figure 1 : densité de $\mathrm{Gamma}(n,1/\theta_0)$, $n=10$, $\theta_0=1$, en rouge ; $\mathrm{Gamma}(n,1/\theta_1)$ pour $\theta_1=2$ en vert et $\theta_1=0{,}5$ en bleu ; trait vertical = seuil critique $c$.)
3. Qu'en est-il du test U.P.P.($\alpha$) pour $\theta=\theta_0$ contre $\theta=\theta_1$ ? Comparer à l'exercice 1 de la PC 4.

**Corrigé complet.**
1. Sous $\mathbb{P}_\theta$, les $X_i$ sont i.i.d. de loi exponentielle de paramètre $1/\theta>0$ ; la densité de $Z$ par rapport à Lebesgue sur $\mathbb{R}^n$ vaut (par indépendance)
$$p^n_\theta(z)=\prod_{i=1}^n\theta^{-1}\exp(-x_i/\theta)\mathbb{1}_{\mathbb{R}_+}(x_i)=\theta^{-n}\exp\Big(-\sum_{i=1}^nx_i/\theta\Big)\mathbb{1}_{\mathbb{R}_+}(x_{1:n}),\qquad x_{1:n}:=\min(x_1,\dots,x_n).$$
Pour $0<\theta_1<\theta_2$ et $z\in\mathbb{R}^n_+$ :
$$\frac{p^n_{\theta_2}(z)}{p^n_{\theta_1}(z)}=\frac{\theta_1^n}{\theta_2^n}\exp\Big(-(\theta_2^{-1}-\theta_1^{-1})\sum_{i=1}^nx_i\Big).$$
$t\mapsto\exp\big((\theta_1^{-1}-\theta_2^{-1})t\big)$ est strictement croissante ($\theta_1^{-1}>\theta_2^{-1}$) : la famille est à rapport de vraisemblance monotone (croissant) en $\sum_{i=1}^nX_i$.
2. Par le **Th. 1.3** (forme générale avec randomisation), un test U.P.P.($\alpha$) est
$$\phi(z)=\begin{cases}1 & \text{si }\sum_{i=1}^nx_i>c,\\ \gamma & \text{si }\sum_{i=1}^nx_i=c,\\ 0 & \text{si }\sum_{i=1}^nx_i<c,\end{cases}\qquad\alpha=\mathbb{E}_{\theta_0}[\phi(Z)]=\mathbb{P}_{\theta_0}\Big(\sum_{i=1}^nX_i>c\Big)+\gamma\,\mathbb{P}_{\theta_0}\Big(\sum_{i=1}^nX_i=c\Big).$$
Sous $\mathbb{P}_\theta$, $\sum_{i=1}^nX_i\sim\mathrm{Gamma}(n,\theta^{-1})$ (additivité des lois Gamma), de densité $x\mapsto\theta^{-n}x^{n-1}\exp(-x/\theta)\mathbb{1}_{\mathbb{R}_+}(x)/\Gamma(n)$ ; donc $\mathbb{P}_{\theta_0}(\sum_iX_i=c)=0$ pour tout $c$ : le test U.P.P.($\alpha$) est **pur**, et $c$ est solution de
$$\alpha=\mathbb{P}_{\theta_0}\Big(\sum_{i=1}^nX_i>c\Big)=\frac{\theta_0^{-n}}{\Gamma(n)}\int_c^{+\infty}x^{n-1}\exp(-x/\theta_0)\,\mathrm{d}x=\mathbb{P}(W>2c/\theta_0),\qquad W\sim\chi^2(2n).$$
(D'où $c=\tfrac{\theta_0}{2}\chi^2_{1-\alpha}(2n)$, cohérent avec la Q3.)
*Remarque sur la règle de décision :* sous $\mathbb{P}_\theta$, les $X_k$ ont pour espérance $\theta$ ; $n^{-1}\sum_iX_i$ estime la moyenne et l'on rejette $H_0$ s'il est trop élevé (la randomisation ne sert à rien ici puisque $\mathbb{P}_\theta(\sum_iX_i=c)=0$) ; le seuil $c$ donne un sens à « trop élevé ».
3. Exercice 1 de la PC 4 : pour $0<\theta_0<\theta_1$, on testait $\theta=\theta_0$ contre $\theta=\theta_1$ en observant que $2\sum_{i=1}^nX_i/\theta\sim\chi^2(2n)$ sous $p_\theta$, avec $\mathcal{R}_c:=\{z:\ 2\theta_0^{-1}\sum_ix_i>c\}$ ; pour tout $c\ge c_\alpha:=\chi^2_{1-\alpha}(2n)$, $\phi_c:=\mathbb{1}_{\mathcal{R}_c}$ est de niveau $\alpha$, et seul $\phi_{c_\alpha}$ est de taille $\alpha$. Construction de Neyman-Pearson :
$$r(Z)=\Big(\frac{\theta_0}{\theta_1}\Big)^n\exp\Big((\theta_0^{-1}-\theta_1^{-1})\sum_{i=1}^nX_i\Big).$$
Sous $p_{\theta_0}$, $\sum_iX_i$ (donc $r(Z)$) est à densité : $\mathbb{P}_{\theta_0}(r(Z)=c)=0$, et $\phi^\star(z)=\mathbb{1}_{\{r(z)>\tilde c_\alpha\}}$ avec $1-\alpha=\mathbb{P}_{\theta_0}(r(Z)\le\tilde c)$. Or
$$\{r(Z)\le\tilde c\}=\Big\{2\sum_{i=1}^nX_i/\theta_0\le-2(\theta_0/\theta_1-1)^{-1}\log(\theta_1^n\theta_0^{-n}\tilde c)\Big\},$$
et $2\sum_iX_i/\theta_0\sim\chi^2(2n)$ sous $p_{\theta_0}$, donc
$$\phi^\star(z)=\mathbb{1}_{\{2\theta_0^{-1}\sum_{i=1}^nx_i>\bar c_\alpha\}},\qquad\bar c_\alpha:=\chi^2_{1-\alpha}(2n).$$
Le test de Neyman-Pearson **coïncide** avec le test $\mathcal{R}_{c_\alpha}$ de la PC 4 ; surtout, il **ne dépend pas de $\theta_1$**, ce qui explique pourquoi le même test répond à la Q2 quel que soit $\theta_1>\theta_0$.

**Méthodes mobilisées :** densité d'un $n$-échantillon (produit, par indépendance) ; vérification de la monotonie stricte du rapport (Déf. 1.4) ; Théorème 1.3 ; additivité des lois Gamma ; changement de variable $\mathrm{Gamma}(n,\theta_0^{-1})\to\chi^2(2n)$ (multiplication par $2/\theta_0$) ; absence d'atome $\Rightarrow$ $\gamma=0$ ; Méthode 1.2 (statistique monotone) ; comparaison avec un test construit par pivot (PC 4).
**Pièges :** $\theta$ est ici l'**espérance** (paramétrage $\theta^{-1}e^{-x/\theta}$) ; la loi Gamma est paramétrée par l'intensité $\theta^{-1}$.

---

### Exercice 4 — Exponentielle translatée ($\star\star$)
**Source :** Poly ch.5, Exercice 4, énoncé p. 30–31, corrigé p. 38–39 (Groupe 1)

**Énoncé complet.** Soit $Z=(X_1,\dots,X_n)$ un $n$-échantillon du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathbb{P}_\theta,\ \theta\in\Theta\}\big)$, $\Theta=\mathbb{R}$, où $\mathbb{P}_\theta$ a pour densité $p_\theta(x):=e^{-(x-\theta)}\mathbb{1}_{]\theta,\infty[}(x)$. On pose $x_{1:n}:=\min(x_1,\dots,x_n)$. Soit $\theta_0<\theta_1$ ; pour $\alpha\in\,]0,1[$, $H_0:\theta=\theta_0$ contre $H_1:\theta=\theta_1$.
1. Montrer que pour tout $(x_1,\dots,x_n)$ tel que $x_{1:n}>\theta_0$,
$$\frac{p_{\theta_1}(x_1,\dots,x_n)}{p_{\theta_0}(x_1,\dots,x_n)}=\begin{cases}e^{n(\theta_1-\theta_0)} & \text{si }x_{1:n}>\theta_1,\\ 0 & \text{si }\theta_0<x_{1:n}\le\theta_1.\end{cases}$$
2. Montrer qu'on peut choisir la fonction critique d'un test U.P.P.($\alpha$) de l'une des deux formes
$$\phi_1(x_1,\dots,x_n)=\begin{cases}1 & x_{1:n}>\theta_1,\\ \gamma & \theta_0<x_{1:n}\le\theta_1,\end{cases}\qquad\text{ou}\qquad\phi_2(x_1,\dots,x_n)=\begin{cases}\gamma & x_{1:n}>\theta_1,\\ 0 & \theta_0<x_{1:n}\le\theta_1,\end{cases}$$
où $\gamma$ est une constante de $[0,1[$.
3. Montrer que si $e^{n(\theta_0-\theta_1)}\le\alpha$, on peut prendre $\phi_1$ ; déterminer $\gamma$.
4. Déterminer la fonction critique du test pour $e^{n(\theta_0-\theta_1)}>\alpha$.

**Corrigé complet.** Notons $X_{1:n}:=\min(X_1,\dots,X_n)$.
1. Vraisemblance : $\mathrm{L}_n(\theta)=\exp\big(n\theta-\sum_{i=1}^nx_i\big)\mathbb{1}_{\{\theta<x_{1:n}\}}$ (produit des densités ; produit d'indicatrices = indicatrice du min). Pour $\theta_1>\theta_0$ et $x_{1:n}>\theta_0$ :
$$r(Z)=\frac{\mathrm{L}_n(\theta_1)}{\mathrm{L}_n(\theta_0)}=e^{n(\theta_1-\theta_0)}\mathbb{1}_{\{\theta_1<X_{1:n}\}}.$$
2. Les tests du rapport de vraisemblance s'écrivent $\phi=\mathbb{1}_{\{r(Z)>c\}}+\gamma\,\mathbb{1}_{\{r(Z)=c\}}$. Ici $r(Z)$ ne prend que les valeurs $0$ et $e^{n(\theta_1-\theta_0)}$ : $\{r(Z)=0\}=\{\theta_0<X_{1:n}\le\theta_1\}$, $\{r(Z)=e^{n(\theta_1-\theta_0)}\}=\{X_{1:n}>\theta_1\}$. Cas : pour $c>e^{n(\theta_1-\theta_0)}$, $\phi\equiv0$ ; pour $0<c\le e^{n(\theta_1-\theta_0)}$, $\phi$ est de la forme $\phi_2$ ; pour $c=0$, de la forme $\phi_1$ ; pour $c<0$, $\phi\equiv1$.
3. Si $\alpha\ge e^{-n(\theta_1-\theta_0)}$, d'après la question précédente le test s'écrit
$$\phi_\alpha(Z)=\mathbb{1}_{\{r(Z)>0\}}+\gamma\,\mathbb{1}_{\{r(Z)=0\}}=\mathbb{1}_{\{X_{1:n}\ge\theta_1\}}+\gamma\,\mathbb{1}_{\{\theta_0\le X_{1:n}<\theta_1\}}.\tag{9}$$
Niveau $\alpha$ : $\gamma$ solution de
$$\alpha=\mathbb{P}_{\theta_0}(X_{1:n}\ge\theta_1)+\gamma\,\mathbb{P}_{\theta_0}(\theta_0\le X_{1:n}<\theta_1)=e^{-n(\theta_1-\theta_0)}+\gamma\big(1-e^{-n(\theta_1-\theta_0)}\big),$$
soit
$$\gamma=\frac{\alpha\,e^{n(\theta_1-\theta_0)}-1}{e^{n(\theta_1-\theta_0)}-1}.$$
4. $\mathbb{P}_{\theta_0}(X_{1:n}>\theta_1)=\Big(\int_{\theta_1}^{+\infty}e^{-(x-\theta_0)}\,\mathrm{d}x\Big)^n=e^{-n(\theta_1-\theta_0)}$ (indépendance : $\{X_{1:n}>\theta_1\}=\bigcap_i\{X_i>\theta_1\}$). Si $\alpha<e^{-n(\theta_1-\theta_0)}$, on prend $c(\alpha)=e^{n(\theta_1-\theta_0)}$, et $\gamma$ garantissant la taille $\alpha$ vérifie $\alpha=\gamma\,\mathbb{P}_{\theta_0}(X_{1:n}>\theta_1)=\gamma\,e^{-n(\theta_1-\theta_0)}$, d'où $\gamma=\alpha\,e^{n(\theta_1-\theta_0)}$ et
$$\phi_\alpha(Z)=\alpha\,e^{n(\theta_1-\theta_0)}\,\mathbb{1}_{\{X_{1:n}>\theta_1\}}.$$
*Remarque sur le test (9).* Règle déconcertante : si toutes les observations dépassent $\theta_1$, on rejette ; si l'une tombe dans $[\theta_0,\theta_1]$, on rejette ou non selon une Bernoulli auxiliaire, alors même que ces valeurs sont **interdites sous $H_1$**. Le test a niveau et taille $\alpha$ ; sa puissance vaut
$$\mathbb{P}_{\theta_1}(X_{1:n}>\theta_1)+\gamma\,\mathbb{P}_{\theta_1}(\theta_0<X_{1:n}\le\theta_1)=\mathbb{P}_{\theta_1}(X_{1:n}>\theta_1)=1.$$
Le test plus intuitif $\phi^\star(Z):=\mathbb{1}_{\{X_{1:n}>\theta_1\}}$ est de taille (donc de niveau) $\alpha^\star=\mathbb{P}_{\theta_0}(X_{1:n}>\theta_1)=e^{-n(\theta_1-\theta_0)}<\alpha$ et de puissance $1$ : c'est **aussi** un test U.P.P.($\alpha$). Cela illustre la Q3 de l'Exercice 2 : dès qu'un test U.P.P.($\alpha$) atteint la puissance 1, il n'est plus le seul.

**Méthodes mobilisées :** vraisemblance à support dépendant du paramètre (indicatrice du minimum) ; Neyman-Pearson **forme générale randomisée** (Th. 4.1) car $r(Z)$ a des atomes ; discussion selon la valeur de $c$ ; loi du minimum $X_{1:n}$ (statistique d'ordre) ; calcul de puissance.
**Pièges :** exception à la règle « U.P.P. $\Rightarrow$ taille exactement $\alpha$ » : quand la puissance vaut $1$, la contrainte de taille devient inutile. *Note de cohérence :* l'énoncé écrit les régions $\{x_{1:n}>\theta_1\}$ / $\{\theta_0<x_{1:n}\le\theta_1\}$, le corrigé (9) écrit $\{X_{1:n}\ge\theta_1\}$ / $\{\theta_0\le X_{1:n}<\theta_1\}$ ; ces différences portent sur des ensembles de probabilité nulle (lois à densité).

---

### Exercice 5 — Modèle gaussien, hypothèse bilatérale ($\star\star\star$)
**Source :** Poly ch.5, Exercice 5, énoncé p. 31–33, corrigé p. 39–42 (Groupe 1)

**Énoncé complet.** Pour $\theta\in\mathbb{R}$, $p_\theta(x):=\frac{1}{\sqrt{2\pi}}\exp\big(-\frac12(x-\theta)^2\big)$ (densité de $\mathcal{N}(\theta,1)$). On dispose d'un $n$-échantillon $Z=(X_1,\dots,X_n)$ du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta,\ \theta\in\Theta\}\big)$ et, pour $\theta_0\in\Theta$, on teste au niveau $\alpha\in\,]0,1/2[$
$$H_0:\theta=\theta_0\quad\text{contre}\quad H_1:\theta\neq\theta_0.\tag{4}$$
On note $z_\beta$ le quantile d'ordre $\beta$ de $\mathcal{N}(0,1)$. (On pourrait supposer $n=1$ sans perte de généralité ; non retenu, pour garder trace de l'effet de $n$.)
1. Soit $\theta_1\neq\theta_0$. Établir le test du rapport de vraisemblance pour $H_0:\theta=\theta_0$ contre $H_1:\theta=\theta_1$ (cas $\theta_1>\theta_0$ puis $\theta_1<\theta_0$ ; figure 2 : $n=10$, $\theta_0=0$, densité de $n^{-1}\sum_iX_i-\theta_0$ sous $p_{\theta_0}$ en rouge, de $n^{-1}\sum_iX_i$ sous $p_{\theta_1}$ pour $\theta_1=0{,}5$ (vert) et $\theta_1=-1$ (bleu) ; traits verticaux en $z_\alpha/\sqrt n$ et $z_{1-\alpha}/\sqrt n$, $\alpha=0{,}05$).
2. Déterminer un test U.P.P.($\alpha$) pour $H_0:\theta=\theta_0$ contre $H_1:\theta>\theta_0$.
3. Montrer que $\{p_\theta^{\otimes n},\ \theta\in\mathbb{R}\}$ est à rapport de vraisemblance monotone croissant en la moyenne empirique ; en déduire que le test de la Q2 est aussi U.P.P.($\alpha$) pour $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$.
4. Montrer qu'il n'existe pas de test U.P.P.($\alpha$) pour (4).
5. En imitant la forme des tests des Q1–2, proposer un test de niveau $\alpha$ pour (4) ; calculer sa fonction puissance via la f.d.r. de $\mathcal{N}(0,1)$. On note $\phi^{\star,3}$ ce test.

*Définition (énoncé) :* un test $\phi$ de $H_0:\theta=\theta_0$ contre $H_1:\theta\in\Theta_1$ est **sans biais de niveau $\alpha$** s'il est de niveau $\alpha$ et si $\forall\theta\in\Theta_1$, $\beta_\phi(\theta)\ge\alpha$. Il est **U.M.P.U.($\alpha$)** s'il est uniformément plus puissant parmi les tests sans biais de niveau $\alpha$.

6. Montrer qu'un test U.P.P.($\alpha$) est sans biais de niveau $\alpha$ ; donc tout U.P.P.($\alpha$) est U.M.P.U.($\alpha$).
7. Soit $\phi$ une fonction critique. En observant que $\theta\mapsto\beta_\phi(\theta)$ est dérivable sur $\mathbb{R}$, montrer que si $\beta_\phi(\theta_0)\le\alpha$ et $\beta_\phi\ge\alpha$ au voisinage de $\theta_0$, alors
$$\beta_\phi(\theta_0)=\alpha,\qquad\beta_\phi'(\theta_0)=0.\tag{5}$$
Un test sans biais de niveau $\alpha$ pour (4) vérifie donc ces conditions.
8. Montrer que $\beta_{\phi^{\star,3}}(\theta)\ge\alpha$ pour tout $\theta\in\mathbb{R}$, et par suite (5) : $\phi^{\star,3}$ est sans biais de niveau $\alpha$.
9. Objectif : montrer que $\phi^{\star,3}$ est U.M.P.U.($\alpha$) pour (4). On pose
$$f_1(z):=p^n_{\theta_0}(z),\qquad f_2(z):=\partial_\theta p^n_\theta(z)\big|_{\theta=\theta_0},\qquad f_{3,\theta}(z):=p^n_\theta(z),$$
où $p^n_\theta$ est la densité de $Z$ dans le modèle $p_\theta$.
 (a) Montrer que pour tout $\theta\neq\theta_0$ et $\kappa_1,\kappa_2\in\mathbb{R}$,
$$\Big\{z\in\mathbb{R}^n:\ \frac{f_{3,\theta}(z)}{f_1(z)}>\kappa_1+\kappa_2\frac{f_2(z)}{f_1(z)}\Big\}=\Big\{z\in\mathbb{R}^n:\ \exp\Big((\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big)>\exp\big(n(\theta-\theta_0)^2/2\big)\kappa_1+\frac{\exp\big(n(\theta-\theta_0)^2/2\big)}{\theta-\theta_0}\kappa_2\,(\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big\}.$$
 (b) En déduire que pour tout $\theta\neq\theta_0$, il existe $\kappa_{1,\theta},\kappa_{2,\theta}$ tels que $\{z,\ \phi^{\star,3}(z)=1\}=\{z:\ f_{3,\theta}(z)>\kappa_{1,\theta}f_1(z)+\kappa_{2,\theta}f_2(z)\}$.
 (c) Pour toute fonction critique $\phi:\mathbb{R}^n\to[0,1]$ et $\theta\neq\theta_0$, on définit $I_\theta(\phi):=\int_{\mathbb{R}^n}\phi(z)\big(f_{3,\theta}(z)-\kappa_{1,\theta}f_1(z)-\kappa_{2,\theta}f_2(z)\big)\,\mathrm{d}z$. Montrer que $\phi^{\star,3}\in\arg\max_\phi I_\theta(\phi)$.
 (d) En déduire que pour toute $\phi$ vérifiant (5), $\beta_{\phi^{\star,3}}(\theta)\ge\beta_\phi(\theta)$ pour tout $\theta\neq\theta_0$.
 (e) Conclure.

**Corrigé complet.** $p^n_\theta(z)=(2\pi)^{-n/2}\exp\big(-\frac12\sum_{i=1}^n(x_i-\theta)^2\big)$.
1. Rapport de vraisemblance (développement des carrés, réarrangement) :
$$r(z)=\exp\Big(-\frac12\sum_{i=1}^n(x_i-\theta_1)^2+\frac12\sum_{i=1}^n(x_i-\theta_0)^2\Big)=\exp\Big(-\frac n2(\theta_1-\theta_0)^2+(\theta_1-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big).$$
Les ensembles $\{r>c\}$ sont de la forme $\{z:\ (\theta_1-\theta_0)\sum_i(x_i-\theta_0)>\tilde c\}$, et le test du rapport de vraisemblance est
$$\phi^{\star,1}(Z)=\begin{cases}1 & \text{si }(\theta_1-\theta_0)\sum_{i=1}^n(X_i-\theta_0)>c,\\ \gamma & \text{si }(\theta_1-\theta_0)\sum_{i=1}^n(X_i-\theta_0)=c,\\ 0 & \text{si }(\theta_1-\theta_0)\sum_{i=1}^n(X_i-\theta_0)<c,\end{cases}$$
avec $\alpha=\gamma\,\mathbb{P}_{\theta_0}\big((\theta_1-\theta_0)\sum_i(X_i-\theta_0)=c\big)+\mathbb{P}_{\theta_0}\big((\theta_1-\theta_0)\sum_i(X_i-\theta_0)>c\big)$. Sous $p_{\theta_0}$, $\sum_{i=1}^n(X_i-\theta_0)\sim\mathcal{N}(0,n)$ : pas d'atome, on prend $\gamma=0$.
- Si $\theta_1>\theta_0$ : condition $\sum_i(X_i-\theta_0)>\sqrt n\,z_{1-\alpha}$, soit $\phi^{\star,1}(Z)=\mathbb{1}_{\{n^{-1}\sum_{i=1}^nX_i>\theta_0+z_{1-\alpha}/\sqrt n\}}$.
- Si $\theta_1<\theta_0$ : de même, avec $z_\alpha=-z_{1-\alpha}$ (car $\alpha\in\,]0,1/2[$), $\phi^{\star,2}(Z)=\mathbb{1}_{\{n^{-1}\sum_{i=1}^nX_i<\theta_0-z_{1-\alpha}/\sqrt n\}}$.

Ni l'un ni l'autre ne dépend de $\theta_1$. Fonctions puissance ($W\sim\mathcal{N}(0,1)$) :
$$\beta_{\phi^{\star,1}}(\theta)=\mathbb{P}\big(W>\sqrt n(\theta_0-\theta)+z_{1-\alpha}\big),\qquad\beta_{\phi^{\star,2}}(\theta)=\mathbb{P}\big(W<\sqrt n(\theta_0-\theta)-z_{1-\alpha}\big).$$
(Figure gauche p. 41, $n=10$, $\alpha=0{,}05$, $\theta_0=0$) : $\beta_\phi(\theta_0)=\alpha$ pour chacun, mais la puissance n'est pas partout minorée par $\alpha$ pour $\theta\neq\theta_0$ : ces deux tests sont **biaisés** (pour l'alternative bilatérale).
2. $H_0:\theta=\theta_0$ contre $H_1:\theta>\theta_0$. *Méthode 1 :* modèle à rapport de vraisemblance monotone (Ex. 1.4) + Th. 1.3 : on retrouve $\phi^{\star,1}$. *Méthode 2 :* la Q1 montre, pour tout $\theta_1>\theta_0$, que $\phi^{\star,1}$ est de niveau $\alpha$ et que $\beta_\phi(\theta_1)\le\beta_{\phi^{\star,1}}(\theta_1)$ pour toute $\phi$ de niveau $\alpha$ ; comme $\phi^{\star,1}$ ne dépend pas de $\theta_1$, ces propriétés valent simultanément pour tout $\theta_1>\theta_0$ : c'est la définition d'un U.P.P.($\alpha$) pour $H_1:\theta>\theta_0$. Par symétrie, $\phi^{\star,2}$ est U.P.P.($\alpha$) pour $H_1:\theta<\theta_0$.
3. $T(z):=n^{-1}\sum_{i=1}^nx_i$ ; factorisation
$$p^n_\theta(z)=\underbrace{\frac{1}{(2\pi)^{n/2}}\exp\Big(-\frac12\sum_{i=1}^nx_i^2\Big)}_{h(z)}\ \underbrace{\exp\big(n\theta\,T(z)-n\theta^2/2\big)}_{\psi(T(z);\theta)},$$
et pour $\theta>\theta'$, $t\mapsto\psi(t;\theta)/\psi(t;\theta')=\exp\big(n(\theta-\theta')t-(n/2)(\theta^2-\theta'^2)\big)$ strictement croissante (Ex. 1.4). Sous $\mathbb{P}_\theta$, $T(Z)\sim\mathcal{N}(\theta,1/n)$, à densité : le **Th. 1.3** fournit un U.P.P.($\alpha$) de $\theta\le\theta_0$ contre $\theta>\theta_0$ qui rejette si $T(Z)>d_\alpha$, $\mathbb{P}_{\theta_0}(T(Z)>d_\alpha)=\alpha$, soit $d_\alpha=\theta_0+z_{1-\alpha}/\sqrt n$ : c'est $\phi^{\star,1}$. Sa puissance étant croissante, sa taille sur $\{\theta\le\theta_0\}$ vaut $\beta_{\phi^{\star,1}}(\theta_0)=\alpha$.
4. Par l'absurde, soit $\phi^\star$ U.P.P.($\alpha$) pour (4) ; il est U.P.P.($\alpha$) pour chacun des tests simples $\theta=\theta_0$ contre $\theta=\theta_1$, $\theta_1>\theta_0$ ou $\theta_1<\theta_0$. L'unicité (Th. 1.2) entraîne $\phi^\star=\phi^{\star,1}$ et $\phi^\star=\phi^{\star,2}$ $\mathbb{P}_{\theta_0}$-p.s. ; or ces deux tests diffèrent sur un ensemble de probabilité $\alpha>0$ sous $\mathbb{P}_{\theta_0}$ : contradiction.
5. Test naturel :
$$\phi^{\star,3}(Z)=\mathbb{1}_{\{|n^{-1}\sum_{i=1}^nX_i-\theta_0|>c\}},\qquad c=z_{1-\alpha/2}/\sqrt n,$$
de fonction puissance ($\Phi$ = f.d.r. de $\mathcal{N}(0,1)$)
$$\beta_{\phi^{\star,3}}(\theta)=1-\Phi\big(z_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\big)+\Phi\big(-z_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\big).$$
(Figure droite p. 41.) $\phi^{\star,3}$ n'est pas U.P.P.($\alpha$) (cohérent avec la Q4) : $\phi^{\star,1}$ (resp. $\phi^{\star,2}$) le domine pour $\theta>\theta_0$ (resp. $\theta<\theta_0$).
6. La puissance d'un U.P.P.($\alpha$) domine celle de tout test de niveau $\alpha$, en particulier du test constant $\bar\phi\equiv\alpha$ (puissance $\alpha$ en tout $\theta$) : elle est minorée par $\alpha$ partout, en particulier sur $\Theta_1$ : un U.P.P.($\alpha$) est sans biais de niveau $\alpha$.
7. Par **convergence dominée**, $\theta\mapsto\beta_\phi(\theta)$ est continue et dérivable pour toute fonction critique $\phi$, de dérivée
$$\beta_\phi'(\theta)=\int_{\mathbb{R}^n}\phi(z)\,\partial_\theta\log p^n_\theta(z)\,p^n_\theta(z)\,\mathrm{d}z.$$
Par **continuité**, $\alpha\le\lim_{\theta\to\theta_0}\beta_\phi(\theta)=\beta_\phi(\theta_0)\le\alpha$, d'où $\beta_\phi(\theta_0)=\alpha$ ; $\beta_\phi(\theta_0)=\alpha$ est alors un **minimum local** de $\beta_\phi$ (où $\beta_\phi\ge\alpha$), et la dérivabilité donne $\beta'_\phi(\theta_0)=0$ (condition du premier ordre).
8. $\beta_{\phi^{\star,3}}(\theta_0)=1-\Phi(z_{1-\alpha/2})+\Phi(-z_{1-\alpha/2})=\alpha$. Dérivée :
$$\beta'_{\phi^{\star,3}}(\theta)=-\sqrt n\Big(-f_{0,1}\big(z_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\big)+f_{0,1}\big(-z_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\big)\Big),$$
où $f_{0,1}$ est la densité de $\mathcal{N}(0,1)$ ; en $\theta=\theta_0$ elle s'annule car $f_{0,1}$ est **paire**. Les conditions (5) sont vérifiées, et $\beta_{\phi^{\star,3}}(\theta)\ge\alpha$ pour tout $\theta$ (on le vérifie sur l'expression de la Q5) : $\phi^{\star,3}$ est sans biais de niveau $\alpha$.
9. (a) $f_1(z)=(2\pi)^{-n/2}\exp\big(-\frac12\sum_i(x_i-\theta_0)^2\big)$, $f_{3,\theta}(z)=(2\pi)^{-n/2}\exp\big(-\frac12\sum_i(x_i-\theta)^2\big)$ et $f_2/f_1=\sum_i(x_i-\theta_0)$ (le corrigé écrit « $f_2(z)=\sum_i(x_i-\theta_0)$ », ce qui est en réalité le rapport $f_2/f_1$ : $f_2=f_1\cdot\sum_i(x_i-\theta_0)$ puisque $\partial_\theta\log p^n_\theta=\sum_i(x_i-\theta)$) ; la relation s'obtient par un calcul direct des rapports $f_{3,\theta}/f_1=\exp\big((\theta-\theta_0)\sum_i(x_i-\theta_0)-n(\theta-\theta_0)^2/2\big)$ et $f_2/f_1$.
 (b) Pour tout $\theta\neq\theta_0$, $\{f_{3,\theta}/f_1>\kappa_1+\kappa_2f_2/f_1\}$ s'écrit $\{z:\ \exp\big((\theta-\theta_0)\sum_i(x_i-\theta_0)\big)>\kappa_{1,\theta}+\kappa_{2,\theta}(\theta-\theta_0)\sum_i(x_i-\theta_0)\}$ pour des constantes convenables. Or $\{z,\ \phi^{\star,3}(z)=1\}=\{z:\ |\sum_i(x_i-\theta_0)|\ge C\}$ pour une constante $C$, ce qui s'écrit $\{z:\ |(\theta-\theta_0)\sum_i(x_i-\theta_0)|\ge C_\theta\}$ quel que soit le signe de $\theta-\theta_0$. Il suffit de choisir $\kappa_{1,\theta},\kappa_{2,\theta}$ pour que la droite $t\mapsto\kappa_{1,\theta}+\kappa_{2,\theta}t$ passe par $(-C_\theta,e^{-C_\theta})$ et $(C_\theta,e^{C_\theta})$ : par **convexité de l'exponentielle**, $\{t\notin[-C_\theta,C_\theta]\}$ coïncide avec $\{e^t\ge\kappa_{1,\theta}+\kappa_{2,\theta}t\}$ (la corde est au-dessus du graphe entre les deux points, en dessous à l'extérieur).
 (c) Avec $g_\theta:=f_{3,\theta}-\kappa_{1,\theta}f_1-\kappa_{2,\theta}f_2$, pour toute fonction critique $\phi$,
$$I_\theta(\phi^{\star,3})-I_\theta(\phi)=\int_{g_\theta>0}(1-\phi)\,g_\theta\,\mathrm{d}z+\int_{g_\theta<0}(-\phi)\,g_\theta\,\mathrm{d}z\ge0,$$
puisque $0\le\phi\le1$ et que chaque intégrande a un signe constant ($\phi^{\star,3}=1$ où $g_\theta>0$, $=0$ où $g_\theta<0$) ; d'où $\phi^{\star,3}\in\arg\max_\phi I_\theta(\phi)$.
 (d) Pour toute $\phi$ vérifiant (5) : $I_\theta(\phi)=\beta_\phi(\theta)-\kappa_{1,\theta}\alpha$ (intégrale sous $f_1$ $=\beta_\phi(\theta_0)=\alpha$ ; sous $f_2$ $=\beta'_\phi(\theta_0)=0$ (dérivation sous l'intégrale, Q7) ; sous $f_{3,\theta}$ $=\beta_\phi(\theta)$). Comme $\phi^{\star,3}$ vérifie aussi (5) (Q8), (c) donne $\beta_{\phi^{\star,3}}(\theta)-\kappa_{1,\theta}\alpha\ge\beta_\phi(\theta)-\kappa_{1,\theta}\alpha$, soit $\beta_{\phi^{\star,3}}(\theta)\ge\beta_\phi(\theta)$ pour tout $\theta\neq\theta_0$.
 (e) D'après la Q8, $\phi^{\star,3}$ est sans biais de niveau $\alpha$ ; d'après 9(d), sa puissance domine, en tout $\theta\neq\theta_0$, celle de toute fonction critique vérifiant (5), donc (Q7) celle de tout test sans biais de niveau $\alpha$. **$\phi^{\star,3}$ est U.M.P.U.($\alpha$) pour (4).**

**Méthodes mobilisées :** calcul de rapport de vraisemblance gaussien ; Neyman-Pearson (Th. 1.1) avec statistique monotone ; quantiles gaussiens ($z_\alpha=-z_{1-\alpha}$) ; argument « le test ne dépend pas de $\theta_1$ » ; Th. 1.3 (rapport monotone) ; raisonnement par l'absurde + unicité (Th. 1.2) ; calcul de puissance via $\Phi$ ; test constant $\bar\phi\equiv\alpha$ ; **convergence dominée** (dérivation sous l'intégrale) ; condition d'optimalité du premier ordre ; parité de la densité gaussienne ; **Neyman-Pearson généralisé à deux contraintes** (multiplicateurs $\kappa_{1,\theta},\kappa_{2,\theta}$, argument de type inégalité clé) ; **convexité de l'exponentielle**.
**Pièges :** les tests unilatéraux sont **biaisés** pour l'alternative bilatérale ; le seuil bilatéral utilise $z_{1-\alpha/2}$, pas $z_{1-\alpha}$.

---

### Exercice 2 — Monotonie en le niveau ($\star\star\star$)
**Source :** Poly ch.5, Exercice 2, énoncé p. 33–34, corrigé p. 43 (Groupe 2, bonus ; seul exercice purement théorique)

**Énoncé complet.** Soient $p_0$ et $p_1$ deux densités par rapport à une mesure $\sigma$-finie $\mu$ sur $(\mathsf{Z},\mathcal{Z})$. On considère
$$H_0:p=p_0\quad\text{contre}\quad H_1:p=p_1.\tag{6}$$
Pour $\alpha\in\,]0,1[$,
$$\phi_\alpha(z)=\begin{cases}1 & p_1(z)>c_\alpha\,p_0(z),\\ \gamma_\alpha & p_1(z)=c_\alpha\,p_0(z),\\ 0 & p_1(z)<c_\alpha\,p_0(z),\end{cases}$$
où $\gamma_\alpha\in[0,1]$ et $c_\alpha\ge0$ sont solutions de $\mathbb{E}_0[\phi_\alpha(Z)]=\mathbb{P}_0(p_1(Z)>c\,p_0(Z))+\gamma\,\mathbb{P}_0(p_1(Z)=c\,p_0(Z))=\alpha$. On rappelle que $\phi_\alpha$ est U.P.P.($\alpha$) pour (6).
1. Montrer que pour $0<\alpha_1<\alpha_2<1$, $c_{\alpha_1}\ge c_{\alpha_2}$.
2. Montrer que pour $0<\alpha_1<\alpha_2<1$,
$$\mathbb{E}_1[1-\phi_{\alpha_1}(Z)]\ge\mathbb{E}_1[1-\phi_{\alpha_2}(Z)].\tag{7}$$
3. Montrer que si l'on a égalité dans (7), il existe un test de taille strictement inférieure à $\alpha_2$ et de puissance égale à 1. *Plus difficile.*

**Corrigé complet.**
1. Avec $F_{r,0}$ la f.d.r. de $r(Z)=p_1(Z)/p_0(Z)$ sous $p_0$, $(c,\gamma)$ vérifie $\alpha=\mathbb{P}_0(r(Z)>c)+\gamma\,\mathbb{P}_0(r(Z)=c)$, i.e.
$$1-\alpha=(1-\gamma)\,\mathbb{P}_0(r(Z)\le c)+\gamma\,\mathbb{P}_0(r(Z)<c),$$
donc $1-\alpha\in\big[\mathbb{P}_0(r(Z)<c),\mathbb{P}_0(r(Z)\le c)\big]$, d'où $c_\alpha:=F^{-1}_{r,0}(1-\alpha)$. Si $\alpha_1<\alpha_2$, $1-\alpha_1>1-\alpha_2$, donc $c_{\alpha_1}\ge c_{\alpha_2}$ « par décroissance de la fonction quantile généralisée » (formulation du poly, à comprendre comme : $\alpha\mapsto F^{-1}_{r,0}(1-\alpha)$ est décroissante, puisque $u\mapsto F^{-1}_{r,0}(u)$ est croissante).
*Autre méthode :* par construction $\mathbb{P}_0(p_1(Z)>c_\alpha p_0(Z))\le\alpha\le\mathbb{P}_0(p_1(Z)\ge c_\alpha p_0(Z))$, donc
$$c_{\alpha_1}=\inf\{c\ge0:\ \mathbb{P}_0(r(Z)>c)\le\alpha_1\}\ge\inf\{c\ge0:\ \mathbb{P}_0(r(Z)>c)\le\alpha_2\}=c_{\alpha_2},$$
l'ensemble sur lequel porte l'infimum ne pouvant que s'agrandir quand on passe de $\alpha_1$ à $\alpha_2$.
2. $\phi_{\alpha_1}$ est de niveau $\alpha_1$, donc de niveau $\alpha_2$ ($\alpha_1<\alpha_2$). $\phi_{\alpha_2}$ étant U.P.P.($\alpha_2$), sa puissance domine celle de $\phi_{\alpha_1}$ : $\mathbb{E}_1[\phi_{\alpha_1}(Z)]\le\mathbb{E}_1[\phi_{\alpha_2}(Z)]$, ce qui est exactement (7). (Le risque de 2e espèce décroît avec le niveau.)
3. Supposons $\mathbb{E}_1[\phi_{\alpha_1}(Z)]=\mathbb{E}_1[\phi_{\alpha_2}(Z)]$. Alors $\phi_{\alpha_1}$ est aussi U.P.P.($\alpha_2$), et la caractérisation des U.P.P. (Th. 1.2) donne
$$\{\phi_{\alpha_1}(z)-\phi_{\alpha_2}(z)\}\{p_1(z)-c_{\alpha_2}p_0(z)\}=0,\qquad\mu\text{-presque partout}.$$
En intégrant sous $\mathrm{d}\mu$ :
$$\mathbb{E}_1[\phi_{\alpha_1}(Z)]-\mathbb{E}_1[\phi_{\alpha_2}(Z)]=c_{\alpha_2}\big(\mathbb{E}_0[\phi_{\alpha_1}(Z)]-\mathbb{E}_0[\phi_{\alpha_2}(Z)]\big)=c_{\alpha_2}(\alpha_1-\alpha_2).$$
Le membre de gauche est nul et $\alpha_1\neq\alpha_2$, donc $c_{\alpha_2}=0$. Alors
$$\mathbb{E}_1[\phi_{\alpha_2}(Z)]=\mathbb{P}_1(r(Z)>0)+\gamma_{\alpha_2}\mathbb{P}_1(r(Z)=0)=\mathbb{P}_1(r(Z)\ge0)=1,$$
puisque $\{r(Z)=0\}=\{p_1(Z)=0\}$ est $\mathbb{P}_1$-négligeable ; donc $\mathbb{E}_1[\phi_{\alpha_1}(Z)]=1$ aussi. $\phi_{\alpha_1}$ est U.P.P.($\alpha_2$), de taille $\alpha_1<\alpha_2$ et de puissance 1.
*Remarque :* $\phi_c(Z):=\mathbb{1}_{\{r(Z)>c\}}+\gamma\,\mathbb{1}_{\{r(Z)=c\}}$ vérifie $\mathbb{E}_1[\phi_c(Z)]=1$ dès que $c=0$ ; il n'y a pas unicité des U.P.P.($\alpha_2$) de puissance 1 et de taille $<\alpha_2$ : tout $\phi_\alpha$ avec $\alpha\in[\alpha_1,\alpha_2[$ convient.

**Méthodes mobilisées :** réécriture de la condition de taille comme barycentre ; fonction quantile généralisée et sa monotonie ; inclusion des classes de niveau ($\mathcal{K}_{\alpha_1}\subseteq\mathcal{K}_{\alpha_2}$) ; optimalité U.P.P. ; caractérisation (Th. 1.2 / Th. 4.1) ; intégration de l'identité p.p. ; cas d'égalité.
**Intuition :** propriété qui fonde la $p$-valeur (régions de rejet emboîtées, seuil décroissant en $\alpha$) ; la Q3 généralise le phénomène de l'Exercice 4.

---

### Exercice 3 — Temps d'attente géométriques ($\star\star$)
**Source :** Poly ch.5, Exercice 3, énoncé p. 34, corrigé p. 43–44 (Groupe 2, bonus)

**Énoncé complet.** Applications de fiabilité ou de sondage : au lieu de fixer la taille d'échantillon, on effectue l'expérience pendant un temps aléatoire jusqu'à obtenir $n$ réponses positives. Soit $(X_k)_{k\in\mathbb{N}}$ i.i.d. $\mathcal{B}\mathrm{er}(\theta)$, $\theta\in\Theta=]0,1[$. On note $T_0=0$ et $T_i=\inf\{k>T_{i-1}:\ X_k=1\}$ (instant du $i$-ième objet défectueux) ; on pose $Y_i=T_i-T_{i-1}-1$.
1. Montrer que $Y_1,\dots,Y_n$ sont indépendantes de loi géométrique de paramètre $\theta$ : $\mathbb{P}_\theta(Y_i=k)=\theta(1-\theta)^k$, $k\in\mathbb{N}$.

Soit $\theta_0\in\Theta$ ; on considère
$$H_0:\theta\le\theta_0\quad\text{contre}\quad H_1:\theta>\theta_0.\tag{8}$$
2. Avec $Z=(Y_1,\dots,Y_n)$, montrer que $(\mathbb{P}_\theta)_{\theta\in\Theta}$ est à rapport de vraisemblance monotone en $T(Z):=\sum_{i=1}^nY_i$.
3. Montrer que $\mathbb{P}_\theta(T(Z)=k)=\binom{n+k-1}{k}\theta^n(1-\theta)^k$.
4. Déterminer la fonction critique d'un test U.P.P.($\alpha$), $\alpha\in\,]0,1[$.

**Corrigé complet.**
1. Pour $(k_1,\dots,k_n)\in\mathbb{N}^n$, par indépendance et identique distribution des $X_i$,
$$\mathbb{P}_\theta(Y_1=k_1,\dots,Y_n=k_n)=\mathbb{P}_\theta\Big(T_1=k_1+1,\dots,T_n=\sum_{i=1}^nk_i+n\Big)=\prod_{i=1}^n(1-\theta)^{k_i}\theta,$$
en écrivant l'événement comme l'intersection, pour chaque $i$, de $k_i$ échecs suivis d'un succès : les $Y_i$ sont indépendantes, de loi géométrique de paramètre $\theta$ (la loi jointe se factorise).
2. Densité de $Z$ par rapport à la mesure de comptage sur $\mathbb{N}^n$ : $(k_1,\dots,k_n)\mapsto\theta^n(1-\theta)^{\sum_ik_i}$. Pour $0\le\theta_1<\theta_2<1$ :
$$\frac{\mathbb{P}_{\theta_2}(Y_1=k_1,\dots,Y_n=k_n)}{\mathbb{P}_{\theta_1}(Y_1=k_1,\dots,Y_n=k_n)}=\frac{\theta_2^n}{\theta_1^n}\exp\Big(\big(\log(1-\theta_2)-\log(1-\theta_1)\big)\sum_{i=1}^nk_i\Big)=\varphi\Big(\sum_{i=1}^nk_i\Big),$$
avec $\varphi(t):=(\theta_2/\theta_1)^n\exp\big((\log(1-\theta_2)-\log(1-\theta_1))t\big)$ : $r(Z)=\varphi(T(Z))$, $\varphi$ **strictement décroissante** ($\theta_1<\theta_2\Rightarrow\log(1-\theta_2)<\log(1-\theta_1)$). La famille est à rapport de vraisemblance monotone **décroissant** en $T(Z)$.
3. Notons $H(n)$ la loi de densité $h(n,k):=\binom{n+k-1}{k}\theta^n(1-\theta)^k$ sur $\mathbb{N}$ ; $Y_1\sim H(1)$. Pour $u>0$ :
$$\mathbb{E}_\theta[e^{-uY_1}]=\sum_{k\ge0}e^{-uk}(1-\theta)^k\theta=\frac{\theta}{1-e^{-u}(1-\theta)},$$
et par indépendance et identique distribution,
$$\mathbb{E}_\theta[e^{-uT(Z)}]=\Big(\frac{\theta}{1-e^{-u}(1-\theta)}\Big)^n.$$
Un calcul direct de la transformée de Laplace de $H(n)$ (développement de $(1-x)^{-n}$ en série entière, $x=(1-\theta)e^{-u}$) montre qu'elle coïncide : $H(1)^{*n}=H(n)$, i.e. $\mathbb{P}_\theta(T(Z)=k)=\binom{n+k-1}{k}\theta^n(1-\theta)^k$, $k\in\mathbb{N}$.
4. Rapport strictement décroissant en $T(Z)$ : un test du rapport de vraisemblance s'écrit
$$\phi_\alpha(Z)=\mathbb{1}_{\{T(Z)<c\}}+\gamma\,\mathbb{1}_{\{T(Z)=c\}},\qquad\mathbb{P}_{\theta_0}(T(Z)<c)+\gamma\,\mathbb{P}_{\theta_0}(T(Z)=c)=\alpha.$$
$T(Z)$ à valeurs entières : $F_{\theta_0,T(Z)}$ est en escalier ; deux cas :
- il existe $k_\alpha\in\mathbb{N}$ tel que $\mathbb{P}(T(Z)<k_\alpha)<\alpha<\mathbb{P}(T(Z)\le k_\alpha)$ : alors
$$c_\alpha=k_\alpha,\qquad\gamma_\alpha=\frac{\alpha-\mathbb{P}(T(Z)<k_\alpha)}{\mathbb{P}(T(Z)\le k_\alpha)-\mathbb{P}(T(Z)<k_\alpha)};$$
- il existe $k_\alpha\in\mathbb{N}$ tel que « $\mathbb{P}(T(Z)=k_\alpha)=\alpha$ » (écriture du poly ; la condition cohérente avec le premier cas est $\mathbb{P}(T(Z)<k_\alpha)=\alpha$), et alors $c_\alpha=k_\alpha$, $\gamma_\alpha=0$.

**Méthodes mobilisées :** décomposition d'événements (échecs puis succès) et indépendance ; rapport de vraisemblance monotone **décroissant** (Déf. 1.5) ; transformée de Laplace et convolution ; série entière $(1-x)^{-n}=\sum_k\binom{n+k-1}{k}x^k$ ; Th. 1.4 dans sa **version randomisée** (statistique discrète) ; fonction de répartition en escalier.
**Pièges :** sens du rejet : $\theta$ grand $\leftrightarrow$ peu d'échecs $\leftrightarrow$ $T$ **petit**, donc on rejette $\theta\le\theta_0$ quand $T(Z)<c$ ; statistique discrète $\Rightarrow$ randomisation nécessaire pour la taille exacte.

---

### Exercice 6 — Rapport de vraisemblance généralisé ($\star\star\star$)
**Source :** Poly ch.5, Exercice 6, énoncé p. 35, corrigé p. 44–45 (Groupe 2, bonus ; suppose lu le complément sur le rapport généralisé)

**Énoncé complet.** Rapport de vraisemblance généralisé (Déf. 4.3) : pour une partition $\Theta=\Theta_0\cup\Theta_1$,
$$\Lambda(Z)=\frac{\sup_{\theta\in\Theta_0}\mathrm{L}_n(\theta;Z)}{\sup_{\theta\in\Theta}\mathrm{L}_n(\theta;Z)},$$
$\mathrm{L}_n(\theta;Z)$ vraisemblance de $Z$ sous $\mathbb{P}_\theta$. Le test rejette $H_0:\theta\in\Theta_0$ si $\Lambda(Z)\le c_\alpha$, $c_\alpha\in\,]0,1[$ choisi pour que le niveau soit $\le\alpha$.
Soient $p\le n$, $\mathbf{X}$ matrice déterministe $n\times p$ de rang plein, et $\mathbf{Y}=(Y_1,\dots,Y_n)$ observation du modèle $\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{\mathcal{N}(\mathbf{X}\beta,\sigma^2I_n),\ \beta\in\mathbb{R}^p,\ \sigma^2>0\}\big)$. Soit $0\le r<p$ ; on teste $H_0:\beta_{r+1}=\dots=\beta_p=0$.
1. Déterminer l'EMV $\hat\theta=(\hat\beta,\hat\sigma^2)$ et en déduire $\sup_{\theta\in\Theta}\mathrm{L}_n(\theta;\mathbf{Y})=\frac{1}{(2\pi)^{n/2}\hat\sigma^n}e^{-n/2}$.
2. Déterminer l'EMV $\hat\theta_0=(\hat\beta_0,\hat\sigma_0^2)$ sous la contrainte $\beta_{r+1}=\dots=\beta_p=0$. Avec $M:=X(X^\top X)^{-1}X^\top-X_0(X_0^\top X_0)^{-1}X_0^\top$, où $X_0$ ($n\times r$) contient les $r$ premières colonnes de $X$, en déduire
$$\sup_{\theta\in\Theta_0}\mathrm{L}_n(\theta;\mathbf{Y})=\frac{1}{(2\pi)^{n/2}\big(\hat\sigma^2+\frac1n\mathbf{Y}^\top M\mathbf{Y}\big)^{n/2}}e^{-n/2}.$$
3. En déduire que le test rejette $H_0$ si
$$F=\frac{n-p}{p-r}\cdot\frac{\mathbf{Y}^\top M\mathbf{Y}}{n\hat\sigma^2}>k_\alpha$$
pour un certain seuil $k_\alpha$.
4. Montrer que pour tout $\theta\in\Theta_0$, $F$ suit sous $\mathbb{P}_\theta$ une loi de Fisher dont on précisera les paramètres.

Soit maintenant $\mathbf{Y}$ une observation du modèle $\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{\bigotimes_{i=1}^r\mathcal{N}(\mu_i,\sigma^2)^{\otimes n_i},\ \mu_1,\dots,\mu_r\in\mathbb{R},\ \sigma^2>0\}\big)$, $n=\sum_{i=1}^rn_i$ : sous $\mathbb{P}_\theta$, $\theta=(\mu_1,\dots,\mu_r,\sigma^2)\in\mathbb{R}^r\times\mathbb{R}_+^*$, $\mathbf{Y}$ regroupe $r$ expériences $\mathbf{Y}_i=(X_{i,1},\dots,X_{i,n_i})$, les $X_{i,j}$ indépendantes $\mathcal{N}(\mu_i,\sigma^2)$, les $\mathbf{Y}_i$ indépendants, variances toutes égales.
5. Utiliser les résultats précédents pour tester $H_0:\mu_1=\dots=\mu_r$.

**Corrigé complet.**
1. $\mathrm{L}_n(\theta;\mathbf{Y})=\frac{1}{(2\pi\sigma^2)^{n/2}}\exp\big(-\frac{1}{2\sigma^2}\|\mathbf{Y}-X\beta\|^2\big)$. Quel que soit $\sigma^2$, le maximum en $\beta$ est atteint au minimiseur $\hat\beta$ de $Q(\beta):=\|\mathbf{Y}-X\beta\|^2$, de gradient $\nabla Q(\beta)=2(X^\top X\beta-X^\top\mathbf{Y})$ ; $X$ de rang plein $\Rightarrow$ $X^\top X$ inversible, $\hat\beta=(X^\top X)^{-1}X^\top\mathbf{Y}$. Puis $\sigma^2\mapsto\mathrm{L}_n(\hat\beta,\sigma^2;\mathbf{Y})$ est maximale en
$$\hat\sigma^2=\frac1n\|\mathbf{Y}-X\hat\beta\|^2=\frac1n\big\|(I_n-X(X^\top X)^{-1}X^\top)\mathbf{Y}\big\|^2,$$
d'où $\sup_{\theta\in\Theta}\mathrm{L}_n(\theta;\mathbf{Y})=\mathrm{L}_n(\hat\theta;\mathbf{Y})=\frac{1}{(2\pi)^{n/2}\hat\sigma^n}e^{-n/2}$.
2. Sous la contrainte, le maximum en $\beta$ est atteint (pour tout $\sigma^2$) en un minimiseur de $Q$ sous contrainte, qui coïncide ($Q$ strictement convexe) avec le minimiseur $\hat\beta_0$ de $Q$ sur le sous-espace $\{K\beta=0\}$, $K$ projecteur sur les $p-r$ dernières coordonnées. $\hat\sigma_0^2=\frac1n\|\mathbf{Y}-X\hat\beta_0\|^2$ et $\sup_{\Theta_0}\mathrm{L}_n=\frac{1}{(2\pi)^{n/2}\hat\sigma_0^n}e^{-n/2}$. Or $X\hat\beta=\Pi\mathbf{Y}$ et $X\hat\beta_0=\Pi_0\mathbf{Y}$ avec $\Pi=X(X^\top X)^{-1}X^\top$, $\Pi_0=X_0(X_0^\top X_0)^{-1}X_0^\top$ projecteurs orthogonaux sur les espaces engendrés par les colonnes de $X$, resp. $X_0$ ; ces espaces étant **emboîtés**, $M:=\Pi-\Pi_0$ est aussi un projecteur orthogonal, et **Pythagore** donne
$$n\hat\sigma_0^2=\|(I_n-\Pi_0)\mathbf{Y}\|^2=\|(I_n-\Pi)\mathbf{Y}\|^2+\|(\Pi-\Pi_0)\mathbf{Y}\|^2=n\hat\sigma^2+\mathbf{Y}^\top M\mathbf{Y},$$
avec $\|M\mathbf{Y}\|^2=\mathbf{Y}^\top M^\top M\mathbf{Y}=\mathbf{Y}^\top M\mathbf{Y}$ ($M$ projecteur orthogonal), d'où l'expression annoncée.
3. Le test rejette $H_0$ si
$$c_\alpha>\frac{\sup_{\Theta_0}\mathrm{L}_n(\theta;\mathbf{Y})}{\sup_\Theta\mathrm{L}_n(\theta;\mathbf{Y})}=\Big(\frac{\hat\sigma^2}{\hat\sigma^2+\frac1n\mathbf{Y}^\top M\mathbf{Y}}\Big)^{n/2},$$
ce qui équivaut à $F>k_\alpha$, $k_\alpha$ s'exprimant en fonction de $c_\alpha$ (fonction décroissante de $F$ ; explicitement $k_\alpha=\frac{n-p}{p-r}(c_\alpha^{-2/n}-1)$ — calcul non écrit dans le poly).
4. Fixons $\theta\in\Theta_0$. Comme $\Pi_0\mathbb{E}_\theta[\mathbf{Y}]=\mathbb{E}_\theta[\mathbf{Y}]=\Pi\mathbb{E}_\theta[\mathbf{Y}]$ (l'espérance appartient aux deux espaces sous $H_0$),
$$\hat\sigma^2=\frac1n\big\|(I_n-\Pi)(\mathbf{Y}-\mathbb{E}_\theta[\mathbf{Y}])\big\|^2,\qquad\frac1n\mathbf{Y}^\top M\mathbf{Y}=\frac1n\big\|(\Pi-\Pi_0)(\mathbf{Y}-\mathbb{E}_\theta[\mathbf{Y}])\big\|^2,$$
et $(\mathbf{Y}-\mathbb{E}_\theta[\mathbf{Y}])/\sigma\sim\mathcal{N}(0,I_n)$ : $n\hat\sigma^2/\sigma^2\sim\chi^2(n-p)$ et $\mathbf{Y}^\top M\mathbf{Y}/\sigma^2\sim\chi^2(p-r)$ (projections d'un vecteur gaussien standard sur des sous-espaces orthogonaux de dimensions $n-p$ et $p-r$ — le poly ne nomme pas le résultat ; c'est le théorème de Cochran). Elles sont **indépendantes** car $(I_n-\Pi)(\Pi-\Pi_0)=\Pi-\Pi_0-\Pi^2+\Pi\Pi_0=0$ (projecteurs sur espaces orthogonaux). Donc $F$ suit sous $\mathbb{P}_\theta$ la **loi de Fisher de paramètres $(p-r,n-p)$** (et l'on peut prendre pour $k_\alpha$ son quantile d'ordre $1-\alpha$ — déduction, non écrite dans le poly).
5. Sous $\mathbb{P}_\theta$, $\mathbf{Y}\sim\mathcal{N}(\mathbb{E}_\theta,\sigma^2I_n)$ avec $\mathbb{E}_\theta=X\beta$,
$$X=\begin{pmatrix}\mathbf{1}_{n_1} & 0 & \cdots & 0\\ \mathbf{1}_{n_2} & \mathbf{1}_{n_2} & & \\ \vdots & & \ddots & \\ \mathbf{1}_{n_r} & 0 & \cdots & \mathbf{1}_{n_r}\end{pmatrix},\qquad\beta=\begin{pmatrix}\mu_1\\ \mu_2-\mu_1\\ \vdots\\ \mu_r-\mu_1\end{pmatrix},$$
$X$ de rang plein. Tester $H_0:\mu_1=\dots=\mu_r$ revient à tester $\beta_2=\dots=\beta_r=0$ dans ce modèle linéaire : c'est le test des questions précédentes **avec $r=1$** (contrainte, et $p$ égal au nombre de groupes) — l'**analyse de la variance à un facteur**. (Attention : la lettre $r$ désigne ici le nombre de groupes, et « $r=1$ » le nombre de coefficients libres sous $H_0$ dans les Q1–4 ; la loi de $F$ sous $H_0$ est alors Fisher$(r-1,n-r)$ en notant $r$ le nombre de groupes — déduction.)

**Méthodes mobilisées :** maximum de vraisemblance en deux temps (profil en $\beta$ puis en $\sigma^2$) ; moindres carrés et équations normales ; projecteurs orthogonaux, sous-espaces emboîtés, **théorème de Pythagore** ; réduction du rapport généralisé à une statistique monotone ($F$) ; lois du $\chi^2$ de formes quadratiques gaussiennes (Cochran), indépendance par orthogonalité ; loi de Fisher ; codage d'un modèle à $r$ groupes comme modèle linéaire (ANOVA).

---

### Exercice 7 — Modèle uniforme ($\star\star$)
**Source :** Poly ch.5, Exercice 7, énoncé p. 35–36, corrigé p. 46 (Groupe 2, bonus)

**Énoncé complet.** Soit $Z=(X_1,\dots,X_n)$ un $n$-échantillon du modèle $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{U}([0,\theta]),\ \theta\in\Theta:=\mathbb{R}_+^*\}\big)$, $\theta_0\in\Theta$, $X_{n:n}:=\max(X_1,\dots,X_n)$, $\alpha\in\,]0,1[$.
1. Soit $\theta_1>\theta_0$. Calculer $r(Z):=p_{\theta_1}(Z)/p_{\theta_0}(Z)$ et montrer qu'il ne prend, hors d'un ensemble négligeable sous $\mathbb{P}_{\theta_0}$ comme sous $\mathbb{P}_{\theta_1}$, que deux valeurs. La famille est-elle à rapport de vraisemblance monotone croissant au sens de la Déf. 1.4 ?
2. Déterminer un test U.P.P.($\alpha$) pour $H_0:\theta=\theta_0$ contre $H_1:\theta=\theta_1$, en résolvant en $(c,\gamma)$ la condition de taille du Th. 4.1.
3. Montrer que
$$\phi'(Z)=\begin{cases}1 & \text{si }X_{n:n}>\theta_0,\\ \alpha & \text{si }X_{n:n}\le\theta_0,\end{cases}$$
définit un test U.P.P.($\alpha$) pour $H_0:\theta=\theta_0$ contre $H_1:\theta>\theta_0$.
4. En déduire que $\phi'$ est aussi U.P.P.($\alpha$) pour $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$.
5. Vérifier que le test pur $\phi(Z):=\mathbb{1}_{\{X_{n:n}>\theta_0(1-\alpha)^{1/n}\}}$ est lui aussi U.P.P.($\alpha$) pour ce dernier problème. Qu'en conclure sur l'unicité, et quelle hypothèse du cours fait défaut ?

**Corrigé complet.** Observations positives : $p_\theta(z)=\theta^{-n}\mathbb{1}_{[0,\theta]}(x_{n:n})$, $x_{n:n}:=\max(x_1,\dots,x_n)$.
1. Pour $\theta_1>\theta_0$ :
$$r(z)=\frac{p_{\theta_1}(z)}{p_{\theta_0}(z)}=\Big(\frac{\theta_0}{\theta_1}\Big)^n\frac{\mathbb{1}_{[0,\theta_1]}(x_{n:n})}{\mathbb{1}_{[0,\theta_0]}(x_{n:n})}=\begin{cases}(\theta_0/\theta_1)^n & \text{si }0\le x_{n:n}\le\theta_0,\\ +\infty & \text{si }\theta_0<x_{n:n}\le\theta_1.\end{cases}$$
$\{X_{n:n}>\theta_1\}$ (où les deux densités s'annulent) est de probabilité nulle sous $\mathbb{P}_{\theta_0}$ et $\mathbb{P}_{\theta_1}$. Le rapport est une fonction **croissante** de $x_{n:n}$ mais **pas strictement** (constant sur $[0,\theta_0]$) : la famille **n'est pas** à rapport de vraisemblance monotone croissant au sens de la Déf. 1.4 ; la marche à suivre du cours ne s'applique pas telle quelle.
2. Sous $\mathbb{P}_{\theta_0}$, $X_{n:n}\le\theta_0$ p.s., donc $r(Z)=(\theta_0/\theta_1)^n$ p.s. Avec $c=(\theta_0/\theta_1)^n$, la condition de taille du Th. 4.1 s'écrit $\alpha=\mathbb{P}_{\theta_0}(r(Z)>c)+\gamma\,\mathbb{P}_{\theta_0}(r(Z)=c)=0+\gamma$, d'où $\gamma=\alpha$ :
$$\phi_1(Z)=\begin{cases}1 & \text{si }\theta_0<X_{n:n}\le\theta_1,\\ \alpha & \text{si }0\le X_{n:n}\le\theta_0,\end{cases}$$
test U.P.P.($\alpha$) pour $\theta=\theta_0$ contre $\theta=\theta_1$.
3. $\phi_1$ et $\phi'$ ne diffèrent que sur $\{X_{n:n}>\theta_1\}$, de probabilité nulle sous $\mathbb{P}_{\theta_0}$ et $\mathbb{P}_{\theta_1}$ : $\phi'$ a la taille $\alpha$ en $\theta_0$ et la même puissance que $\phi_1$ en $\theta_1$, donc il est U.P.P.($\alpha$) pour $\theta=\theta_0$ contre $\theta=\theta_1$. Son écriture **ne dépend pas de $\theta_1$** : valable pour tout $\theta_1>\theta_0$, donc U.P.P.($\alpha$) pour $\theta=\theta_0$ contre $\theta>\theta_0$.
4. Pour $\theta\le\theta_0$, $\mathbb{P}_\theta(X_{n:n}>\theta_0)=0$, donc $\beta_{\phi'}(\theta)=\mathbb{P}_\theta(X_{n:n}>\theta_0)+\alpha\,\mathbb{P}_\theta(X_{n:n}\le\theta_0)=\alpha$ : $\phi'$ est de niveau $\alpha$ pour $\theta\le\theta_0$. Tout test de niveau $\alpha$ pour cette hypothèse l'est pour $\theta=\theta_0$ ; $\phi'$ maximisant la puissance en chaque $\theta>\theta_0$ dans la classe plus grande, il la maximise dans la plus petite : U.P.P.($\alpha$) pour $\theta\le\theta_0$ contre $\theta>\theta_0$.
5. Sous $\mathbb{P}_{\theta_0}$, $X_{n:n}$ a pour f.d.r. $x\mapsto(x/\theta_0)^n$ sur $[0,\theta_0]$ (chapitre 1, Section 1.5) ; avec $d_\alpha:=\theta_0(1-\alpha)^{1/n}$, $\mathbb{P}_{\theta_0}(X_{n:n}>d_\alpha)=1-d_\alpha^n/\theta_0^n=\alpha$. La puissance de $\phi$ étant croissante, sa taille sur $\{\theta\le\theta_0\}$ vaut $\alpha$. Pour $\theta>\theta_0$,
$$\beta_\phi(\theta)=1-\Big(\frac{d_\alpha}{\theta}\Big)^n=1-(1-\alpha)\Big(\frac{\theta_0}{\theta}\Big)^n,$$
tandis que $\beta_{\phi'}(\theta)=1-(\theta_0/\theta)^n+\alpha(\theta_0/\theta)^n$ : **même quantité**. Les deux tests ont la même fonction puissance et sont tous deux U.P.P.($\alpha$) **sans coïncider**. L'unicité du Th. 1.2 tombe parce que $\{r(Z)=c\}=\{X_{n:n}\le\theta_0\}$, sur lequel deux U.P.P. peuvent différer, **n'est pas négligeable** : c'est l'hypothèse d'**absence d'atome** du rapport de vraisemblance qui fait défaut.

**Méthodes mobilisées :** vraisemblance à support dépendant du paramètre (indicatrice du max) ; Neyman-Pearson forme générale (Th. 4.1) ; modification sur un ensemble négligeable ; argument « ne dépend pas de $\theta_1$ » ; passage à l'hypothèse nulle composite (inclusion des classes $\mathcal{K}_\alpha$) ; loi de $X_{n:n}$ (statistique d'ordre) ; calcul de puissance.
**Pièges :** croire que la recette du cours s'applique (croissance non stricte) ; croire à l'unicité du test U.P.P. Le modèle uniforme échappe aux énoncés généraux (comme à Cramér-Rao au chapitre 3), pour la même raison : le support dépend du paramètre.

---

## 5. Hors programme / compléments

> **Hors programme / complément** — §4 « Les compléments », p. 47–56 : « Les contenus de cette partie ne sont pas exigibles. » Extraction concise (la démonstration du Th. 1.3, qui y figure, a été reportée au §2 ci-dessus car le théorème est au programme).

### Complément — Démonstration des Théorèmes 1.3 et 1.4 (p. 47–48)
**Idée :** voir le bloc du Th. 1.3 au §2 (trois temps : Neyman-Pearson pour chaque $\theta_1>\theta_0$ avec seuil indépendant de $\theta_1$ ; croissance de la puissance par le Lemme 2.1 ; inclusion $\mathcal{K}_\alpha(\{\theta\le\theta_0\})\subseteq\mathcal{K}_\alpha(\{\theta=\theta_0\})$), et le bloc du Th. 1.4 (changement de signe $\tilde T=-T$, $\tilde\psi(t;\theta)=\psi(-t;\theta)$).
**Résultat principal :** principe général « optimal dans une classe plus grande + appartient à la petite $\Rightarrow$ optimal dans la petite ».

### Complément — Familles exponentielles à rapport de vraisemblance monotone (p. 48)
**Idée :** $Z=(X_1,\dots,X_n)$ $n$-échantillon d'une famille exponentielle (Exercice 3 (PC2)) associée à $(h,T)$, $T$ scalaire : $p_\theta(x)=h(x)\exp\big(\varphi(\theta)T(x)-\psi(\theta)\big)$. Alors
$$\frac{p^{\otimes n}_\theta(x_1,\dots,x_n)}{p^{\otimes n}_{\theta'}(x_1,\dots,x_n)}=\exp\Big(\big(\varphi(\theta)-\varphi(\theta')\big)\sum_{i=1}^nT(x_i)-n\psi(\theta)+n\psi(\theta')\Big).$$
**Résultat principal :** le modèle est à rapport de vraisemblance monotone en $\sum_{i=1}^nT(X_i)$ **si et seulement si** $\theta\mapsto\varphi(\theta)$ est monotone : $\varphi$ strictement croissante $\Rightarrow$ rapport croissant en $\sum_iT(X_i)$ ; strictement décroissante $\Rightarrow$ croissant en $-\sum_iT(X_i)$. Couvre gaussien, Bernoulli, Poisson, exponentiel ; la statistique n'est pas toujours la somme des observations : $\sum_iX_i^2$ pour la variance d'une gaussienne centrée, $-\sum_iX_i^2$ pour la précision.

### Complément — Tests randomisés (Définition 4.1, p. 48)
**Pourquoi atteindre la taille $\alpha$ :** la preuve du Th. 1.1 utilise $\mathbb{E}_{\theta_0}[\phi^\star(Z)]=\alpha$ ; dès que la statistique est discrète, aucun test pur n'a une taille exactement $\alpha$ pour $\alpha$ arbitraire (la taille ne prend qu'un nombre dénombrable de valeurs).
**Définition 4.1 (Test randomisé) :** $\phi:\mathsf{Z}\to[0,1]$ mesurable (fonction critique). Étant donnée $Z$, on simule une Bernoulli de paramètre $\phi(Z)$, indépendamment de $Z$ ; on garde $H_0$ si le tirage vaut 0, on la rejette s'il vaut 1. Partition de $\mathsf{Z}$ en trois : $\mathsf{Z}_1=\{\phi=1\}$ (rejet), $\mathsf{Z}_0=\{\phi=0\}$ (acceptation), $\mathsf{Z}_p=\{0<\phi<1\}$ (issue non déterminée par les observations). Si $\phi$ est à valeurs dans $\{0,1\}$, le test est pur. La fonction puissance $\beta_\phi(\theta)=\mathbb{E}_\theta[\phi(Z)]$ (Déf. 1.1) est celle d'un test randomisé. Le test constant $\phi\equiv\alpha$ est toujours de taille $\alpha$ (sans intérêt).

### Complément — Exemple 4.1 : Modèle de Poisson, d'un test pur à un test randomisé (p. 49)
**Idée :** $n$-échantillon de $\big(\mathbb{N},\mathcal{P}(\mathbb{N}),\{p_\theta\cdot\mu,\ \theta\in\Theta\subseteq\mathbb{R}_+^*\}\big)$, $\mu$ comptage, $p_\theta(x)=e^{-\theta}\theta^x/x!$ ; $0<\theta_0<\theta_1$, test de $\theta=\theta_0$ contre $\theta=\theta_1$. Log-vraisemblance $\ell_n(\theta;Z)=-n\theta+\log(\theta)T(Z)-\sum_i\log(X_i!)$, $T(Z):=\sum_iX_i$ ; rapport $\big(\theta_1/\theta_0\big)^{T(z)}\exp(-n(\theta_1-\theta_0))$, strictement croissant en $T$ ; $T(Z)\sim\mathrm{Poi}(n\theta)$ à valeurs entières : atomes.
**Test pur :** $\phi(Z;c)=\mathbb{1}_{\{T(Z)>c\}}$, $c_\alpha:=\inf\{c\in\mathbb{N}:\ \mathbb{P}_{\theta_0}(T(Z)>c)\le\alpha\}$ ; en général taille $<\alpha$. Numérique : $\theta_0=0{,}01$, $n=100$, $T\sim\mathrm{Poi}(1)$ : $\mathbb{P}_{\theta_0}(T>2)\simeq0{,}080$, $\mathbb{P}_{\theta_0}(T>3)\simeq0{,}019$ ; pour $\alpha=0{,}05$, $c_\alpha=3$ et la taille vaut $0{,}019$ (le test est de niveau $\alpha'$ pour tout $\alpha'\ge0{,}019$).
**Test randomisé :** $\phi^\star_\gamma(s):=1$ si $s>c_\alpha$, $\gamma$ si $s=c_\alpha$, $0$ si $s<c_\alpha$ (appliqué à $s=T(Z)$) ; taille $\mathbb{P}_{\theta_0}(T>c_\alpha)+\gamma\,\mathbb{P}_{\theta_0}(T=c_\alpha)$ ; l'égaler à $\alpha$ :
$$\gamma_\alpha=\frac{\alpha-\mathbb{P}_{\theta_0}(T(Z)>c_\alpha)}{\mathbb{P}_{\theta_0}(T(Z)=c_\alpha)}\in[0,1[$$
(car $\mathbb{P}_{\theta_0}(T>c_\alpha)\le\alpha<\mathbb{P}_{\theta_0}(T>c_\alpha-1)$ et $\mathbb{P}_{\theta_0}(T>c_\alpha-1)-\mathbb{P}_{\theta_0}(T>c_\alpha)=\mathbb{P}_{\theta_0}(T=c_\alpha)$). Numériquement $\gamma_\alpha\approx0{,}5$.
**Intuition :** pile ou face truqué quand l'observation tombe sur la valeur critique — « acheter une fraction de pixel ». Procédé artificiel, pratiquement jamais employé, mais indispensable pour énoncer Neyman-Pearson sans restriction.

### Complément — Théorème 4.1 : Neyman-Pearson, forme générale (p. 50–51)
**Énoncé :** $\nu$ $\sigma$-finie, modèle $\big(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\nu,\ \theta\in\Theta:=\{\theta_0,\theta_1\}\}\big)$, $\theta_0\neq\theta_1$, **sans hypothèse sur les atomes** ; $\alpha\in\,]0,1[$. Il existe $c_\alpha>0$ et $\gamma_\alpha\in[0,1]$ tels que
$$\phi^\star(z):=\begin{cases}1 & \text{si }p_{\theta_1}(z)>c_\alpha p_{\theta_0}(z),\\ \gamma_\alpha & \text{si }p_{\theta_1}(z)=c_\alpha p_{\theta_0}(z),\\ 0 & \text{si }p_{\theta_1}(z)<c_\alpha p_{\theta_0}(z),\end{cases}\tag{10}$$
vérifie $\mathbb{E}_{\theta_0}[\phi^\star(Z)]=\alpha$. Les conclusions des Th. 1.1 et 1.2 valent : $\phi^\star$ U.P.P.($\alpha$), $\mathbb{E}_{\theta_1}[\phi^\star(Z)]\ge\alpha$, et tout U.P.P.($\alpha$) $\phi^{\star\star}$ vérifie, $\nu$-p.p., $\phi^{\star\star}=1$ sur $\{p_{\theta_1}>c_\alpha p_{\theta_0}\}$ et $0$ sur $\{p_{\theta_1}<c_\alpha p_{\theta_0}\}$. (Le Th. 1.1 est le cas $\gamma_\alpha=0$.)
**Idée de preuve :** seule l'existence de $(c_\alpha,\gamma_\alpha)$ est nouvelle ; l'inégalité clé (1) reste valable pour (10). $\bar F(c):=\mathbb{P}_{\theta_0}(p_{\theta_1}(Z)>c\,p_{\theta_0}(Z))$ décroissante, continue à droite, $\bar F(c^-)=\mathbb{P}_{\theta_0}(p_{\theta_1}(Z)\ge c\,p_{\theta_0}(Z))$, saut $=\mathbb{P}_{\theta_0}(p_{\theta_1}(Z)=c\,p_{\theta_0}(Z))$ ; $\bar F(0^-)=1$, $\lim_{+\infty}\bar F=0$, donc il existe $c_\alpha\ge0$ avec
$$\bar F(c_\alpha)\le\alpha\le\bar F(c_\alpha^-).\tag{11}$$
On pose $\gamma_\alpha:=0$ si $\bar F(c_\alpha)=\alpha$, et $\gamma_\alpha:=\dfrac{\alpha-\bar F(c_\alpha)}{\bar F(c_\alpha^-)-\bar F(c_\alpha)}$ si $\bar F(c_\alpha)<\alpha$ (bien défini et dans $[0,1]$ par (11)). Alors $\mathbb{E}_{\theta_0}[\phi^\star(Z)]=\bar F(c_\alpha)+\gamma_\alpha\big(\bar F(c_\alpha^-)-\bar F(c_\alpha)\big)=\alpha$.
**Lecture graphique (figure p. 50–51) :** avec $F:c\mapsto\mathbb{P}_{\theta_0}(p_{\theta_1}(Z)\le c\,p_{\theta_0}(Z))$, trouver $(c,\gamma)$ revient à écrire $1-\alpha=(1-\gamma)F(c)+\gamma F(c^-)$ : si $F^{-1}$ est continue en $1-\alpha$, $c_\alpha=F^{-1}(1-\alpha)$ et $\gamma_\alpha=0$ ; si $F$ saute en $c_\alpha=F^{-1}(1-\alpha)$, $\gamma_\alpha$ est l'unique coefficient qui écrit $1-\alpha$ comme barycentre de $F(c_\alpha^-)$ et $F(c_\alpha)$.
**À retenir :** l'unicité est perdue : tout U.P.P. coïncide avec $\phi^\star$ hors de $\{p_{\theta_1}=c_\alpha p_{\theta_0}\}$, ensemble non négligeable dès qu'il y a des atomes. Si $\mathbb{P}_{\theta_0}(p_{\theta_1}(Z)=c\,p_{\theta_0}(Z))=\mathbb{P}_{\theta_0}\big(p_{\theta_1}(Z)/p_{\theta_0}(Z)=c\big)=0$ pour tout $c\ge0$, on peut prendre $\gamma_\alpha=0$ (cas de la partie principale ; exemples gaussiens). Poisson (Ex. 4.1) et sondage (Ex. 4.2) ne relèvent pas de ce cas.

### Complément — Exemple 4.2 : Sondage, le test U.P.P. est randomisé (p. 51–52)
**Idée :** $n$-échantillon $\mathcal{B}\mathrm{er}(\theta)$, $\Theta=\{\theta_0,\theta_1\}$, $0\le\theta_0<\theta_1\le1$, $T(Z):=\sum_iX_i$ ; $r(Z)=\tilde r(T(Z))$ avec $\tilde r(s)=\big(\theta_1/\theta_0\big)^s\big((1-\theta_1)/(1-\theta_0)\big)^{n-s}$ strictement croissante. Th. 4.1 : $\phi^\star(Z)=1$ si $T>d_\alpha$, $\gamma_\alpha$ si $T=d_\alpha$, $0$ si $T<d_\alpha$, avec ($T\sim\mathrm{Bin}(n,\theta_0)$ sous $\mathbb{P}_{\theta_0}$)
$$\alpha=\sum_{j=d_\alpha+1}^n\binom{n}{j}\theta_0^j(1-\theta_0)^{n-j}+\gamma_\alpha\binom{n}{d_\alpha}\theta_0^{d_\alpha}(1-\theta_0)^{n-d_\alpha}.$$
Sauf valeurs exceptionnelles de $\alpha$, le test U.P.P. est randomisé.
**Version unilatérale ($H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$) :** Th. 1.3 version randomisée (rapport monotone croissant en $T$, Ex. 1.5) :
$$d_{\alpha,\theta_0}=\inf\{c\in\{0,\dots,n\}:\ \mathbb{P}_{\theta_0}(T(Z)>c)\le\alpha\},\qquad\gamma_{\alpha,\theta_0}=\frac{\alpha-\mathbb{P}_{\theta_0}(T(Z)>d_{\alpha,\theta_0})}{\mathbb{P}_{\theta_0}(T(Z)=d_{\alpha,\theta_0})}.$$
Numérique : $\theta_0=1/2$, $n=1000$, $\alpha=0{,}05$ : $d_{\alpha,\theta_0}=526$, $\gamma_{\alpha,\theta_0}=0{,}4832$.
**Résultat principal (extension du Th. 1.3) :** sous la seule hypothèse de rapport monotone croissant (sans $T(Z)$ à densité), il existe un U.P.P.($\alpha$) de $\theta\le\theta_0$ contre $\theta>\theta_0$ de la forme $\phi(z)=1$ si $T(z)>d$, $\gamma$ si $T(z)=d$, $0$ si $T(z)<d$, avec $\mathbb{P}_{\theta_0}(T(Z)>d)+\gamma\,\mathbb{P}_{\theta_0}(T(Z)=d)=\alpha$ (preuve du Th. 1.3 en remplaçant Th. 1.1 par Th. 4.1). Application Poisson ($T\sim\mathrm{Poi}(n\theta)$) :
$$\alpha=\sum_{j=d+1}^{\infty}\frac{e^{-n\theta_0}(n\theta_0)^j}{j!}+\gamma\,\frac{e^{-n\theta_0}(n\theta_0)^d}{d!}.$$

### Complément — Test sans biais et optimalité U.M.P.U. (Définition 4.2, Proposition 4.1, p. 52)
**Définition 4.2 (Test sans biais) :** un test de niveau $\alpha$ de fonction critique $\phi$ est **sans biais** si $\beta_\phi(\theta)\ge\alpha$ pour tout $\theta\in\Theta_1$ (il rejette $H_0$ plus souvent quand elle est fausse que quand elle est vraie).
**Proposition 4.1 (Un test U.P.P. est sans biais) :** $\alpha\in\,]0,1[$ ; si $\phi$ est U.P.P.($\alpha$), il est sans biais. *Preuve :* le test constant $\psi\equiv\alpha$ est de niveau $\alpha$ ($\beta_\psi\equiv\alpha$) ; $\phi$ U.P.P. domine $\psi$ sur $\Theta_1$ : $\beta_\phi(\theta)\ge\alpha$. $\square$
**U.M.P.U. :** uniformément plus puissant parmi les seuls tests sans biais de niveau $\alpha$ (*uniformly most powerful unbiased*). Un U.P.P.($\alpha$) est U.M.P.U.($\alpha$). La notion survit là où U.P.P. échoue : dans le modèle gaussien (Ex. 1.6), le test bilatéral usuel ($|\bar X_n-\theta_0|$ grand) est U.M.P.U.($\alpha$) — seconde moitié de l'Exercice 5 (conditions $\beta_\phi(\theta_0)=\alpha$, $\beta'_\phi(\theta_0)=0$, puis maximisation de la puissance sous ces deux contraintes).

### Complément — Rapport de vraisemblance généralisé (Définition 4.3, Exemple 4.3, p. 52–53)
**Définition 4.3 :** $(X_1,\dots,X_n)$ $n$-échantillon d'un modèle dominé, de vraisemblance $\mathrm{L}_n(\theta;X_1,\dots,X_n):=\prod_{i=1}^nq_\theta(X_i)$, partition $\Theta=\Theta_0\cup\Theta_1$ :
$$\Lambda_n:=\frac{\sup_{\theta\in\Theta_0}\mathrm{L}_n(\theta;X_1,\dots,X_n)}{\sup_{\theta\in\Theta}\mathrm{L}_n(\theta;X_1,\dots,X_n)}.$$
$\Lambda_n\le1$ ; proche de 1 sous $H_0$, s'en éloigne sous $H_1$. Règle : rejeter $H_0$ si $\Lambda_n\le c_{n,\alpha}$, avec $\mathbb{P}_\theta(\Lambda_n\le c_{n,\alpha})\le\alpha$ pour tout $\theta\in\Theta_0$. À ne pas confondre avec le rapport de vraisemblance de la Déf. 1.3 (deux hypothèses simples).
**Exemple 4.3 (modèle exponentiel) :** $q_\theta(x)=\theta^{-1}\exp(-x/\theta)$, $x,\theta>0$ ($\theta$ = espérance) ; $H_0:\theta=\theta_0$ contre $H_1:\theta\neq\theta_0$. $\mathrm{L}_n(\theta)=\theta^{-n}\exp(-n\bar X_n/\theta)$, $\hat\theta^{\mathrm{MV}}_n=\bar X_n$,
$$\Lambda_n=\frac{\mathrm{L}_n(\theta_0)}{\mathrm{L}_n(\bar X_n)}=e^n\Big(\frac{\bar X_n}{\theta_0}\Big)^n\exp\big(-n\bar X_n/\theta_0\big)=g(T),\quad T:=\bar X_n/\theta_0,\ g(t)=(e\,t)^ne^{-nt},$$
$g$ a un unique maximum en $t=1$, donc $g(T)\le c\iff T\le c_1$ ou $T\ge c_2$ : on rejette si $n\bar X_n/\theta_0\le c_{1,n,\alpha}$ ou $n\bar X_n/\theta_0\ge c_{2,n,\alpha}$. Sous $\mathbb{P}_{\theta_0}$, $(n/\theta_0)\bar X_n=\theta_0^{-1}\sum_iX_i\sim\mathrm{Gamma}(n,1)$ (additivité : $\sum_iX_i\sim\mathrm{Gamma}(n,1/\theta_0)$, puis division par $\theta_0$) ; avec $Q_n$ la fonction quantile de $\mathrm{Gamma}(n,1)$, $c_{1,n,\alpha}=Q_n(\alpha/2)$, $c_{2,n,\alpha}=Q_n(1-\alpha/2)$ donnent un test de niveau $\alpha$. Comportement asymptotique de $\Lambda_n$ : partie asymptotique du cours. Exercice 6 : modèle linéaire gaussien, statistique de Fisher, ANOVA.

### Complément — Variance et précision d'une gaussienne (Exemple 4.4 et suite, p. 53–54)
**Exemple 4.4 (variance, moyenne connue) :** $n$-échantillon de $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(0,\theta),\ \theta\in\Theta:=\mathbb{R}_+^*\}\big)$ ; $p_\theta(z)=(2\pi\theta)^{-n/2}\exp\big(-\frac{1}{2\theta}\sum_ix_i^2\big)$, soit (2) avec $h(z):=(2\pi)^{-n/2}$, $T(z):=\sum_{i=1}^nx_i^2$, $\psi(t;\theta):=\theta^{-n/2}e^{-t/(2\theta)}$ ; pour $\theta>\theta'$,
$$t\longmapsto\frac{\psi(t;\theta)}{\psi(t;\theta')}=\Big(\frac{\theta'}{\theta}\Big)^{n/2}\exp\Big(\frac12\Big(\frac1{\theta'}-\frac1\theta\Big)t\Big)$$
strictement croissante ($1/\theta'-1/\theta>0$) : rapport monotone croissant en $T$.
- *Deux hypothèses simples* ($0<\theta_0<\theta_1$) : $r(z)>c_\alpha\iff T(z)>d_\alpha$ ; $T(Z)/\theta_0=\sum_iX_i^2/\theta_0\sim\chi^2(n)$ (chapitre 1, Section 2), donc $d_\alpha=\theta_0\chi^2_{1-\alpha}(n)$.
- *Hypothèse unilatérale* $H_0:\theta\ge\theta_0$ contre $H_1:\theta<\theta_0$ : rapport croissant en $T$, on rejette quand $T$ est **petit** : $\phi_{\theta_0}(Z)=\mathbb{1}_{\{T(Z)<d_\alpha\}}$, $\mathbb{P}_{\theta_0}(T(Z)<d_\alpha)=\alpha$, d'où $d_\alpha=\theta_0\chi^2_\alpha(n)$.

**Précision :** modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(0,\theta^{-2}),\ \theta\in\mathbb{R}_+^*\}\big)$ ($\theta^2$ = inverse de la variance = **précision**) :
$$p_\theta(z)=\frac{1}{(2\pi)^{n/2}}\exp\Big(-\frac{\theta^2}{2}\sum_{i=1}^nx_i^2+n\log(\theta)\Big),$$
$T(z):=-\sum_ix_i^2$, $h(z):=(2\pi)^{-n/2}$, $\psi(t;\theta):=\exp\{\theta^2t/2+n\log(\theta)\}$ ; pour $\theta>\theta'$, $t\mapsto\psi(t;\theta)/\psi(t;\theta')=\exp\big\{\frac12(\theta^2-\theta'^2)t+n(\log(\theta)-\log(\theta'))\big\}$ strictement croissante : rapport monotone croissant en $-\sum_iX_i^2$. Cohérent : augmenter la précision revient à diminuer la variance.

### Complément — Modèle uniforme : le test U.P.P. n'est pas unique (Exemple 4.5, p. 54–55)
**Idée :** $n$-échantillon $\mathcal{U}([0,\theta])$, $\theta\in\mathbb{R}_+^*$, $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$. $p_\theta(x_1,\dots,x_n)=\theta^{-n}\mathbb{1}_{[0,\theta]}(x_{n:n})$ ; pour $\theta'<\theta$, $\dfrac{p_\theta}{p_{\theta'}}=\dfrac{\theta'^n}{\theta^n}\dfrac{\mathbb{1}_{[0,\theta]}(x_{n:n})}{\mathbb{1}_{[0,\theta']}(x_{n:n})}$ vaut $(\theta'/\theta)^n$ si $x_{n:n}\le\theta'$, $+\infty$ si $\theta'<x_{n:n}\le\theta$ : croissant **non strictement**, mais les régions $\{r>c\}$ sont de la forme $\{X_{n:n}>d\}$.
**Résultat principal :** sous $\mathbb{P}_{\theta_0}$, $X_{n:n}$ a la densité $x\mapsto n\theta_0^{-n}x^{n-1}\mathbb{1}_{[0,\theta_0]}(x)$ ; $\phi(Z)=\mathbb{1}_{\{X_{n:n}>d_\alpha\}}$ est U.P.P.($\alpha$) avec $\alpha=\frac{n}{\theta_0^n}\int_{d_\alpha}^{\theta_0}x^{n-1}\,\mathrm{d}x=1-\frac{d_\alpha^n}{\theta_0^n}$, soit $d_\alpha=\theta_0(1-\alpha)^{1/n}$. Mais $\phi'=1$ si $X_{n:n}>\theta_0$, $\alpha$ si $X_{n:n}\le\theta_0$ est aussi U.P.P.($\alpha$) : taille $\alpha$ ($\mathbb{P}_\theta(X_{n:n}>\theta_0)=0$ pour $\theta\le\theta_0$), puissance $\beta_{\phi'}(\theta)=1-(\theta_0/\theta)^n+\alpha(\theta_0/\theta)^n=1-(1-\alpha)(\theta_0/\theta)^n=\beta_\phi(\theta)$ pour $\theta>\theta_0$. Deux U.P.P. distincts.
**Intuition :** trace d'une hypothèse manquante : le rapport est constant sur $\{X_{n:n}\le\theta_0\}$, non négligeable, où l'on peut répartir la probabilité de rejet librement. Le modèle uniforme échappe aux énoncés généraux (comme à Cramér-Rao, chapitre 3) : le support dépend du paramètre. Repris en détail à l'Exercice 7.

### Complément — Détection d'un signal : moyennes non constantes, filtre adapté (p. 55)
**Idée :** $X_1,\dots,X_n$ indépendantes gaussiennes de variance $\sigma^2$ connue, moyennes nulles sous $H_0$, égales à $m_1,\dots,m_n$ (connues) sous $H_1$. Rapport de vraisemblance
$$r(x_1,\dots,x_n)=\exp\Big(\frac{1}{\sigma^2}\sum_{i=1}^nm_ix_i-\frac{1}{2\sigma^2}\sum_{i=1}^nm_i^2\Big),$$
strictement croissant en $T(Z):=\sum_im_iX_i$ ; sous $P_0$, $\dfrac{\sum_im_iX_i}{\sigma\sqrt{\sum_im_i^2}}\sim\mathcal{N}(0,1)$.
**Résultat principal :** le test de niveau $\alpha$ rejette lorsque $\sum_{i=1}^nm_iX_i>z_{1-\alpha}\,\sigma\sqrt{\sum_{i=1}^nm_i^2}$. $\sum_im_iX_i$ = corrélation entre l'observation et le signal recherché : **filtre adapté** (traitement du signal).

### Complément — Une généalogie (p. 56)
**Point d'histoire, famille Galton-Pearson-Fisher :** Francis Galton (1822-1911, demi-cousin de Darwin ; régression, corrélation ; son legs finance la chaire de statistique de UCL) ; Karl Pearson (1857-1936, premier titulaire ; test du $\chi^2$, coefficient de corrélation) ; Egon Sharpe Pearson (1895-1980, son fils) formule avec **Jerzy Neyman** (1894-1981), entre 1928 et 1933, l'approche des tests et le théorème du chapitre ; Ronald Aylmer Fisher (1890-1962 ; vraisemblance, information, exhaustivité ; s'oppose aux Pearson et à Neyman sur le sens d'un test) ; C. R. Rao (1920-2023, doctorant de Fisher ; borne de Cramér-Rao) ; George Box (1919-2013, « formule sur les modèles » du chapitre 1 ; épouse Joan Fisher, fille de R. A. Fisher et sa biographe).

### Complément — Au-delà de l'optimalité U.P.P. (p. 56)
**Idée :** U.P.P. trop exigeant dès que l'alternative n'est pas unilatérale. Trois voies : (1) restreindre la classe (tests sans biais, U.M.P.U.) ; (2) approche **bayésienne** (agréger la fonction de risque via une loi a priori) — rappel : cadre décisionnel du chapitre 3, espace d'actions $\{0,1\}$, perte 0-1, risque $=\beta_\phi(\theta)$ sur $\Theta_0$ et $1-\beta_\phi(\theta)$ sur $\Theta_1$, ordre non total ; (3) changer la question : **vitesse de séparation** (distinguer $H_0$ d'alternatives à distance $\ge\varepsilon$ quand $n$ grandit), optimalité **minimax** (Lehmann & Romano, *Testing Statistical Hypotheses*, ch. 12). Prolongements dans le cours : **tests asymptotiques** (loi limite de la statistique sous $H_0$) et **tests multiples** (probabilité d'au moins un rejet à tort $\neq\alpha$).

---

## 6. Liens avec les autres chapitres (prérequis, suites)

**Prérequis :**
- **Chapitre 1** : lois Gamma, additivité, $\chi^2$, Fisher (Section 2) — seuils (Ex. 1, Ex. 6, Ex. 4.4) ; statistiques d'ordre, lois de $X_{n:n}$ et $X_{1:n}$ (Section 1.5) — Exercices 4, 7, Ex. 4.5 ; modèle linéaire gaussien (Ex. 6).
- **Chapitre 2** : vraisemblance et log-vraisemblance d'un $n$-échantillon (le rapport de vraisemblance en est le quotient en deux points) ; EMV (Ex. 4.3, Ex. 6) ; familles exponentielles (Exercice 3 (PC2)) — Prop. 1.1, critère de monotonie.
- **Chapitre 3** : préordre sur les procédures, ordre partiel, admissibilité, restriction de classe (Sections 1.5–1.6) — le test U.P.P. est la borne supérieure du préordre restreinte à $\Theta_1$, $\mathcal{K}_\alpha(\Theta_0)$ joue le rôle de classe restreinte (comme les estimateurs sans biais pour l'E.S.B.V.M.) ; cadre décisionnel des tests (perte 0-1, Section 4) ; le modèle uniforme comme contre-exemple récurrent (Cramér-Rao).
- **Chapitre 4** : test pur, région de rejet, fonction puissance, taille, niveau (Sections 2.2–2.3), $p$-valeur (Section 2.7, Déf. 2.4, Ex. 2.13), ce qu'un test dit et ne dit pas, taille d'effet (Section 2.8, Ex. 2.14 bruit d'aéroport), énigme des terrains (Section 2.10), exercice 1 de la PC 4 (modèle exponentiel, pivot $2\sum X_i/\theta\sim\chi^2(2n)$) repris à l'Exercice 1.

**Suites :**
- Ce chapitre **clôt la première séquence** du cours (modèle statistique, estimation, estimation optimale, tests, tests optimaux).
- **Partie asymptotique** : comportement de $\Lambda_n$ (rapport de vraisemblance généralisé) quand $n\to\infty$ dans les modèles réguliers ; **tests asymptotiques** (loi limite sous $H_0$).
- **Tests multiples** (contrôle du risque global quand on effectue beaucoup de tests).
- Approche bayésienne des tests ; optimalité minimax / vitesses de séparation (hors cours).

---

## 7. Idées de visualisations interactives pertinentes pour ce chapitre

1. **Budget et terrains (énigme de Neyman-Pearson)** : deux densités $p_{\theta_0}$, $p_{\theta_1}$ réglables (moyennes, variances) ; l'utilisateur « peint » une région de rejet ou déplace des seuils ; jauge de coût ($=\int_{\mathcal{R}}p_{\theta_0}$) bloquée à $\alpha$ et gain ($=\int_{\mathcal{R}}p_{\theta_1}$) affiché ; bouton « solution NP » qui trie par rapport $r(z)$ décroissant et montre la région optimale.
2. **Trois régions de même taille** (figure p. 10) : $\mathcal{N}(0,1)$ vs $\mathcal{N}(\theta_1,1)$, curseurs $\alpha$ et $\theta_1$ ; comparaison en temps réel des puissances de $\{z>z_{1-\alpha}\}$, $\{z<z_\alpha\}$, $\{|z|<c\}$, $\{|z|>z_{1-\alpha/2}\}$.
3. **Variances différentes (Ex. 1.2)** : curseurs $\mu_0,\sigma_0,\mu_1,\sigma_1,\alpha$ ; tracé du log-rapport et de la région de rejet (intervalle vs complémentaire d'intervalle selon le signe de $\sigma_0^{-2}-\sigma_1^{-2}$).
4. **Fonctions puissance et U.P.P.** : gaussien variance connue, curseurs $n$, $\alpha$, $\theta_0$ ; courbes $\beta$ des tests $\phi^{\star,1}$, $\phi^{\star,2}$, $\phi^{\star,3}$ (Exercice 5) ; mise en évidence des zones où chaque test domine, du biais des tests unilatéraux pour l'alternative bilatérale, et de la tangence horizontale de $\beta_{\phi^{\star,3}}$ en $\theta_0$.
5. **Rapport de vraisemblance monotone** : pour une famille choisie (gaussienne, Bernoulli, exponentielle, géométrique, uniforme), tracer $t\mapsto\psi(t;\theta)/\psi(t;\theta')$ pour plusieurs couples $\theta>\theta'$ ; diagnostic visuel « strictement croissant / décroissant / non strict (uniforme) ».
6. **Randomisation en discret** : binomiale ou Poisson sous $H_0$, curseur $\alpha$ ; f.d.r. en escalier, construction de $(d_\alpha,\gamma_\alpha)$ comme barycentre sur le saut ; comparaison taille test pur vs test randomisé (valeurs de l'Ex. 4.1 et de l'Ex. 4.2 : $d=526$, $\gamma=0{,}4832$).
7. **Taille d'effet et $n$** : puissance $1-\Phi(z_{1-\alpha}-\sqrt n\,m/\sigma)$ en fonction de $(n,m)$ (carte de chaleur) ; courbe de l'effet minimal détectable $m\propto n^{-1/2}$ à puissance fixée (illustration du contre-exemple « 10 000 personnes »).
8. **Non-unicité dans le modèle uniforme** : simulation de $X_{n:n}$ sous $\theta$ réglable ; décisions de $\phi$ (pur) et $\phi'$ (randomisé) côte à côte, mêmes fonctions puissance mais décisions différentes.
