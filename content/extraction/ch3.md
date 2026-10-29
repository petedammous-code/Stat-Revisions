# Chapitre 3 — Bases de la théorie de la décision

> **Sources extraites :** `S3_APM41033-Week3-Cours` (poly p. 7–28), `S3_APM41033-Week3-Maths` (« Les outils mathématiques », §2, p. 29–32), `S3_APM41033-Week3-Exercices` (« Les exercices », §3, p. 33–43, **avec corrigés intégrés** p. 38–43), `S3_APM41033-Week3-Compléments` (« Les compléments », §4, p. 44–47, **hors programme d'examen**).
> **Numérotation du poly :** tous les éléments encadrés sont numérotés « N.M » où N est la *section* du chapitre : §1 « Les fondamentaux » (Définitions 1.1–1.10, Proposition 1.1–1.2, Théorème 1.1, Corollaires 1.1–1.3, Exemples 1.1–1.19), §2 « Les outils mathématiques » (Propositions 2.1–2.3, Lemme 2.1), §3 « Les exercices » (Exercices 1–5), §4 « Les compléments » (Définition 4.1, Proposition 4.1, Théorème 4.1). Les équations sont numérotées (1)–(17) sur tout le chapitre. On cite donc « Poly ch.3, Déf. 1.6 », « Poly ch.3, Th. 1.1 », « Poly ch.3, éq. (7) ».
> **Renvois internes au poly :** les renvois « chapitre 2, Exemple 1.11 » etc. désignent la numérotation propre du chapitre 2 ; « Exercice 1 (PC3) » = Exercice 1 de la §3 de ce chapitre ; « Exercice 1 (PC2) » = exercice du chapitre 2.
> **Pages :** la pagination indiquée est celle du poly complet (en-têtes de page), pas celle des PDF découpés (le PDF Cours commence à la p. 7).

---

## 0. Résumé en 10 lignes (ce qu'il faut retenir pour l'examen)

1. **Biais** : $b(\theta,T)=\mathbb{E}_\theta[T(Z)]-g(\theta)$, *fonction* de $\theta$ ; « sans biais » = nul **pour tout** $\theta$ (Déf. 1.1). Exemples-types : $\bar X_n$ sans biais ; $\hat\sigma_n^2=\frac1n\sum(X_i-\bar X_n)^2$ a pour biais $-\mathrm{Var}_\theta(X_1)/n$, $S_n^2$ (normalisé par $n-1$) est sans biais ; $X_{n:n}$ (uniforme) a pour biais $-\theta/(n+1)$ ; $1/\theta$ n'a **aucun** estimateur sans biais dans le modèle binomial.
2. **Risque** $R_\ell(\theta,T)=\mathbb{E}_\theta[\ell(\theta,T(Z))]$ ; pertes quadratique $\ell_2$ et absolue $\ell_1$ (Déf. 1.2, Ex. 1.6). Risque quadratique $R(\theta,T)=\mathbb{E}_\theta[(T(Z)-g(\theta))^2]$ (Déf. 1.3).
3. **Décomposition biais-variance** : $R(\theta,T)=\mathrm{Var}_\theta(T(Z))+b(\theta,T)^2$ (Prop. 1.1). Un estimateur biaisé peut battre un sans biais : $\hat\sigma_n^2$ bat $S_n^2$ en gaussien (Ex. 1.8) ; $\frac{n+2}{n+1}X_{n:n}$ bat $\frac{n+1}{n}X_{n:n}$ (Ex. 1.9).
4. **Admissibilité** (Déf. 1.4) : $T$ inadmissible s'il existe $T^*$ avec $R_\ell(\theta,T^*)\le R_\ell(\theta,T)$ partout et $<$ en au moins un $\theta$. L'ordre par le risque est **partiel** ; l'estimateur constant est admissible (Ex. 1.10) $\Rightarrow$ **aucun estimateur uniformément optimal** en général.
5. On **restreint la classe** : sans biais (choix du cours), invariance, linéarité. $\bar X_n$ = meilleur estimateur linéaire sans biais de l'espérance (Ex. 1.11, Cauchy-Schwarz). **E.S.B.V.M.** = sans biais de variance uniformément minimale (Déf. 1.5).
6. **Modèle régulier** (Déf. 1.6) : dominé, $\theta\mapsto p_\theta(z)$ de classe $C^2$, dominations locales (3)–(4), $\mathbb{E}_\theta[\mathrm{H}_\ell(\theta,Z)]$ inversible ; $\Theta$ **ouvert**. Le modèle uniforme $\mathcal{U}([0,\theta])$ n'est **pas** régulier (Ex. 1.12).
7. **Score** $S(\theta,z)=\nabla_\theta\ell(\theta,z)$, $\ell(\theta,z)=\log p_\theta(z)$ ; $\mathbb{E}_\theta[S(\theta,Z)]=0$. **Information de Fisher** $\mathbb{I}(\theta)=\mathbb{E}_\theta[SS^\top]=\mathrm{Var}_\theta(S)=-\mathbb{E}_\theta[\mathrm{H}_\ell(\theta,Z)]$ ; additive : $\mathbb{I}_{\mathcal{M}^n}(\theta)=n\,\mathbb{I}_{\mathcal{M}}(\theta)$ (Prop. 1.2).
8. Valeurs à connaître (1 observation) : exponentiel $\mathcal{E}(\theta)$ : $1/\theta^2$ ; Poisson : $1/\theta$ ; Bernoulli : $1/(\theta(1-\theta))$ ; gaussien $\mathcal{N}(\theta,\sigma_0^2)$ : $1/\sigma_0^2$ (Ex. 1.13–1.15, 1.19).
9. **Cramér-Rao** (Th. 1.1) : modèle régulier, $T$ sans biais **et régulier** (Déf. 1.9) de $g(\theta)$ $\Rightarrow$ $\mathrm{Var}_\theta(T(Z))\ge\nabla_\theta g(\theta)^\top\mathbb{I}(\theta)^{-1}\nabla_\theta g(\theta)$ ; en 1D $\{g'(\theta)\}^2/\mathbb{I}(\theta)$ ; vectoriel $\mathrm{Var}_\theta(T)\ge\mathbb{I}(\theta)^{-1}$ ; $n$-échantillon $\frac1n\nabla g^\top\mathbb{I}_1^{-1}\nabla g$ (Cor. 1.1–1.3). Preuve = dérivation sous l'intégrale + score centré + **Cauchy-Schwarz**.
10. **Efficace** = atteint la borne (Déf. 1.10) $\Rightarrow$ E.S.B.V.M. (réciproque fausse). $\bar X_n$ efficace en Bernoulli, Poisson, gaussien à variance connue (Ex. 1.17–1.19). En non régulier (uniforme), la vitesse $n^{-2}$ « viole » Cramér-Rao sans contradiction (Ex. 1.16, Exercice 3).

---

## 1. Notations et symboles

> **Notations particulières du poly à reproduire fidèlement :**
> - L'information de Fisher est notée en **lettre ajourée** $\mathbb{I}(\theta)$ (et non $I(\theta)$), avec variantes $\mathbb{I}_1(\theta)$, $\mathbb{I}_{\mathcal{M}}(\theta)$, $\mathbb{I}_{\mathcal{M}^n}(\theta)$, $\mathbb{I}(\mathcal{M},\theta)$, $\mathbb{I}_{12}$, et $\tilde{\mathbb{I}}(\beta_1)$ dans l'Exercice 2.
> - La hessienne est notée avec un H **droit** : $\mathrm{H}_F(\theta,z)$, $\mathrm{H}_\ell$, $\mathrm{H}_p$.
> - La log-vraisemblance d'**une** observation est $\ell(\theta,z):=\log p_\theta(z)$ (éq. (2)) — même lettre $\ell$ que la **fonction de perte** $\ell(\theta,a)$ (Déf. 1.2) : le contexte distingue. Pour un échantillon : $\ell_1(\theta,x):=\log q_\theta(x)$ (une observation) et $\ell_n(b;\mathbf{y})$ (Exercice 2).
> - Le risque quadratique est noté $R(\theta,T)$ **sans indice** ; le risque général $R_\ell(\theta,T)$ ; le poly écrit l'argument dans l'ordre $(\theta,T)$ (paramètre, puis estimateur) — sauf la légende de l'animation qui écrit $R(\gamma,\theta)$.
> - Statistiques d'ordre notées $X_{1:n}\le\dots\le X_{n:n}$ (et non $X_{(i)}$ comme au ch.1).
> - Espaces : lettres **sans empattement** $\mathsf{Z}$, $\mathsf{X}$, $\mathsf{A}$, $\mathsf{Y}$ pour les ensembles, calligraphiques $\mathcal{Z}$, $\mathcal{X}$, $\mathcal{A}$, $\mathcal{Y}$ pour les tribus.
> - Voisinage d'un point : $\mathcal{V}_0$ (calligraphique).
> - Poids des estimateurs linéaires (Exercices 4–5) **soulignés** : $\underline{a}_n=(a_{1,n},\dots,a_{n,n})$, $\underline{m}_n$ ; vecteurs/matrices de la régression en **gras** : $\mathbf{Y}$, $\mathbf{X}$, $\mathbf{y}$, $\mathbf{1}$.
> - Ordre de Loewner sur les matrices symétriques : $A\ge B$ signifie $A-B\ge 0$ (positive).

| Symbole LaTeX | Signification | Première apparition |
|---|---|---|
| $g(\theta)$, $g:\Theta\to\mathbb{R}^p$ | fonction du paramètre à estimer | Intro « Comment comparer… », p. 7 ; Déf. 1.1, p. 10 |
| $\mathbb{Q}_\theta=q_\theta\cdot\mathrm{Leb}$, $q_\theta(x):=p(x-\theta)$ | loi d'une observation dans le modèle de translation ; $p$ densité symétrique | Ex. 1.1, p. 9 |
| $\varepsilon_i$ | bruits i.i.d. de densité $p$, $X_i=\theta+\varepsilon_i$ | Ex. 1.1, p. 9 |
| $\hat\theta_n^{(1)},\hat\theta_n^{(2)},\hat\theta_n^{(3)}$ | moyenne empirique, médiane empirique, demi-somme des extrêmes (Ex. 1.1) ; réutilisés avec un autre sens dans l'Exercice 1 | Ex. 1.1, p. 9 |
| $\psi(\vartheta,x)$, $\mathrm{signe}$ | fonction de contraste d'un $Z$-estimateur (rappel ch.2) | Ex. 1.1, p. 9 |
| $\mathrm{med}(X_1,\dots,X_n)$ | médiane empirique | Ex. 1.1, p. 9 |
| $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ | modèle statistique paramétrique | Déf. 1.1, p. 10 |
| $T$, $T(Z)$ | estimateur (statistique), évalué en l'observation $Z$ | Déf. 1.1, p. 10 |
| $b(\theta,T):=\mathbb{E}_\theta[T(Z)]-g(\theta)$ | biais de $T$ | Déf. 1.1, p. 10 |
| $\bar X_n=n^{-1}\sum_{i=1}^nX_i$ | moyenne / fréquence empirique | Ex. 1.2, p. 10 |
| $\mathcal{B}\mathrm{er}(\theta)$, $\mathcal{B}\mathrm{er}(\theta)^{\otimes n}$ | loi de Bernoulli, $n$-échantillon | Ex. 1.2, p. 10 |
| $\mathcal{U}([0,\theta])$ | loi uniforme sur $[0,\theta]$ | Ex. 1.3, p. 10 |
| $X_{n:n}=\max(X_1,\dots,X_n)$ | maximum (statistique d'ordre $n$) | Ex. 1.3, p. 10 |
| $\hat\sigma_n^2:=\frac1n\sum_{i=1}^n(X_i-\bar X_n)^2$ | variance empirique non corrigée (EMV gaussien) | Ex. 1.4, p. 11 |
| $S_n^2:=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X_n)^2$ | variance empirique corrigée (sans biais) | Ex. 1.4, p. 11 |
| $\mathrm{Var}_\theta$ | variance sous $\mathbb{P}_\theta$ (matrice de covariance si vectoriel) | Ex. 1.4, p. 11 |
| $\mathrm{Bin}(n,\theta)$ | loi binomiale | Ex. 1.5, p. 11 |
| $\ell:\Theta\times\mathbb{R}^p\to\mathbb{R}_+$ | fonction de perte | Déf. 1.2, p. 12 |
| $R_\ell(\theta,T):=\mathbb{E}_\theta[\ell(\theta,T(Z))]$ | risque de $T$ pour la perte $\ell$ | Déf. 1.2, p. 12 |
| $W:\mathbb{R}^p\times\mathbb{R}^p\to\mathbb{R}_+$ | distance servant à construire $\ell(\theta,a):=W(g(\theta),a)$ | p. 12 |
| $\ell_2(\theta,a):=\lVert a-g(\theta)\rVert_2^2$ | perte quadratique | Ex. 1.6, p. 12 |
| $\ell_1(\theta,a):=\lVert a-g(\theta)\rVert_1$ | perte absolue | Ex. 1.6, p. 12 |
| $a^{(i)}$, $g(\theta)^{(i)}$ | $i$-ème coordonnée | Ex. 1.6, p. 12 |
| $R(\theta,T):=R_{\ell_2}(\theta,T)$ | risque quadratique / erreur quadratique moyenne | Déf. 1.3, p. 12 |
| $T_\gamma=\gamma T$, $\gamma\in[0,1]$ | estimateur à rétrécissement | p. 13 ; compléments p. 46 |
| $\mathcal{P}\mathrm{oi}(\lambda)$, $\hat\lambda_n=\bar X_n$ | loi de Poisson, EMV | Ex. 1.7, p. 13 |
| $\mathcal{N}(\mu,\sigma^2)$, $\theta=(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*$ | modèle gaussien | Ex. 1.8, p. 14 |
| $\chi^2(n-1)$ | loi du khi-deux | Ex. 1.8, p. 14 |
| $T_n^{(1)}:=\frac{n+1}{n}X_{n:n}$ | estimateur sans biais de $\theta$ (uniforme) | Ex. 1.9, p. 15 |
| $a_n:=(n+2)/(n+1)$ | facteur optimal de la famille $aX_{n:n}$ (noté $a_\star$ dans l'Exercice 1) | Ex. 1.9, p. 15 |
| $T^*$, $T^\star$ | estimateur dominant / uniformément optimal | Déf. 1.4, p. 15 ; Ex. 1.10, p. 16 |
| $\hat\theta_\vartheta:Z\mapsto\vartheta$ | estimateur constant | Ex. 1.10, p. 16 |
| $\hat\mu_\alpha:=\sum_i\alpha_iX_i$, $\sum_i\alpha_i=1$ | estimateur linéaire sans biais | Ex. 1.11, p. 17 |
| $\sigma^2(\theta):=\mathrm{Var}_\theta(X_1)$ | variance d'une observation | Ex. 1.11, p. 17 |
| E.S.B.V.M. | estimateur sans biais de variance minimale | Déf. 1.5, p. 17 |
| $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$ | modèle dominé par $\mu$, densités $p_\theta$ | §1.7, p. 18 |
| $\mathrm{H}_F(\theta,z)=\big[\partial^2F/\partial\theta^{(i)}\partial\theta^{(j)}(\theta,z)\big]$ | matrice hessienne en $\theta$ | §1.8, p. 19 ; outils p. 30 |
| $\lVert A\rVert^2:=\mathrm{Tr}(A^\top A)$ | norme de Frobenius d'une matrice | §1.8, p. 19 ; outils p. 30 |
| $\mathrm{Mat}_d(\mathbb{R})$ | matrices réelles $d\times d$ | §1.8, p. 19 |
| $\ell(\theta,z):=\log p_\theta(z)$ | log-vraisemblance (éq. (2)) | Déf. 1.6, p. 19 |
| $\mathcal{V}_0$, $h_0,h_1$ | voisinage de $\theta_0$, fonctions dominantes | Déf. 1.6 (iii), p. 19 |
| $\nabla_\theta$ | gradient par rapport à $\theta$ | Déf. 1.6, p. 19 |
| $\mathcal{E}(\theta)$ | loi exponentielle (paramètre d'intensité : densité $\theta e^{-\theta z}$) | Ex. 1.12, p. 20 ; Ex. 1.13 |
| $\mathcal{G}(\theta)$ | loi géométrique (rang du premier succès) | Ex. 1.12, p. 20 |
| $\mathbb{1}_{[0,\theta]}$ | indicatrice (double barre dans le poly) | Ex. 1.12, p. 20 |
| $S(\theta,z):=\nabla_\theta\ell(\theta,z)\in\mathbb{R}^d$ | score | Déf. 1.7, p. 20 |
| $\mathbb{I}(\theta)$ | information de Fisher (matrice $d\times d$) | Déf. 1.8, p. 20 |
| $\mathbb{I}_1,\mathbb{I}_2,\mathbb{I}_{12}$ | informations de deux modèles et du modèle produit | Prop. 1.2 (iii), p. 21 |
| $\mathcal{M}$, $\mathcal{M}^n$, $\mathbb{I}_{\mathcal{M}}$, $\mathbb{I}_{\mathcal{M}^n}$, $\mathbb{I}(\mathcal{M},\theta)$ | modèle, son $n$-échantillon, informations associées | Prop. 1.2 et Remarque, p. 21 |
| $\mathbb{P}_{1,\theta}\otimes\mathbb{P}_{2,\theta}$, $\mathcal{Z}_1\otimes\mathcal{Z}_2$ | loi produit, tribu produit | Prop. 1.2 (iii), p. 21 |
| $\mathrm{H}_p(\theta,z)$ | hessienne de $\theta\mapsto p_\theta(z)$ | preuve Prop. 1.2, p. 22 |
| $\mathrm{KL}(\theta^\star,\theta):=\mathrm{KL}(\mathbb{P}_{\theta^\star},\mathbb{P}_\theta)$ | divergence de Kullback-Leibler (ch.2) | Intuition, p. 23 |
| $\theta^\star$ | vraie valeur du paramètre | Intuition, p. 23 |
| $\nabla^2_\theta$ | hessienne (notation de l'intuition KL) | p. 24 |
| $\mathsf{Z}_0$, $\mathsf{Z}_0^c$ | ensemble de mesure pleine | Remarque après Déf. 1.9, p. 24 |
| $\lambda^\top T(Z)$ | coordonnée (forme linéaire) d'un estimateur vectoriel | Cor. 1.2, p. 25 |
| $\ell_1(\theta,x):=\log q_\theta(x)$, $\mathbb{I}_1(\theta)$ | log-vraisemblance et information d'**une** observation | Cor. 1.3, p. 26 |
| $\sigma_0^2$ | variance connue (modèle gaussien) | Ex. 1.19, p. 27 |
| $\mathrm{Cov}_\theta(T(Z),\Psi(Z))$ | covariance sous $\mathbb{P}_\theta$ | §1.12, p. 28 ; Exercice 3 |
| $A\ge 0$, $A\ge B$ | matrice symétrique positive ; ordre partiel | Outils, p. 30 |
| $(E,\mathcal{E},\mu)$, $\phi(t)=\int f(t,x)\mu(\mathrm{d}x)$ | cadre de la dérivation sous l'intégrale | Prop. 2.2, p. 29–30 |
| $A_\alpha:=\{z:p_\alpha(z)>0\}$ | support de $p_\alpha$ | Corrigé Ex. 3, p. 40 |
| $\tau_n(c)$ | fonction de la borne de l'Exercice 3 | Exercice 3, p. 35 |
| $\mathbf{Y},\mathbf{X}=[\mathbf{1}\ \mathbf{x}],\beta=(\beta_1,\beta_2)^\top$ | régression linéaire gaussienne | Exercice 2, p. 34 |
| $\underline{a}_n$, $\hat\theta_n(\underline{a}_n)$ | poids et estimateur linéaire | Exercice 4, p. 36 |
| $X_{1:n}\le\dots\le X_{n:n}$, $Z_k$, $m_{j,n}$ | statistiques d'ordre, espacements normalisés, poids transformés | Exercice 5, p. 36–37 |
| $\mathcal{S}_n$ | groupe des permutations de $\{1,\dots,n\}$ | Corrigé Ex. 5, p. 42 |
| $\mathsf{A}$, $\mathcal{A}$, $\delta$ | espace d'actions, tribu, règle de décision | Déf. 4.1, p. 44 (HP) |
| $\Theta_0,\Theta_1$, $H_0,H_1$, $\beta_\phi(\theta)$ | hypothèses, fonction puissance d'un test $\phi$ | p. 44 (HP) |
| $\overline{R}_\ell(\delta):=\sup_\theta R_\ell(\theta,\delta)$, $\overline{R}_\ell$ | risque maximal, risque minimax | p. 44–45 (HP) |
| $\Pi$, $R_\ell(\Pi,\delta)$, $\underline{R}_\ell(\Pi)$ | loi a priori, risque intégré, risque de Bayes | p. 45 (HP) |
| $\upsilon(\theta):=\mathrm{Var}_\theta(T(Z))$, $\gamma_{\min}(\theta)$ | variance de l'estimateur sans biais, seuil de rétrécissement | p. 46–47 (HP) |

---

## 2. Cours — contenu principal

### Remarque (introduction, non numérotée) — Comment comparer deux estimateurs ?
**Source :** Poly ch.3, introduction « Comment comparer deux estimateurs ? », p. 7–8
**Hypothèses :** cadre des chapitres 1–2 (estimateur = statistique quelconque, calculable à partir des observations).
**Énoncé :** Un estimateur ponctuel de $g(\theta)$ est une statistique quelconque ; un même modèle en fournit plusieurs (au ch.2 : deux estimateurs des moments dans le modèle exponentiel ; estimateur des moments $\ne$ EMV dans le modèle uniforme). Pour choisir, il faut (1) **mesurer l'erreur** par une fonction de perte et le risque associé, (2) **comparer** ces mesures. Le risque étant une **fonction du paramètre inconnu**, l'ordre n'est pas total : il faut se **restreindre à une sous-classe** (les estimateurs sans biais), où l'on aboutit à la borne de Cramér-Rao.
**Preuve (étapes) :** sans objet.
**Intuition :** le plan du chapitre : biais → perte/risque → EQM et biais-variance → admissibilité → restriction aux sans biais → borne de Cramér-Rao → efficacité.
**Pièges / erreurs classiques :** « le meilleur estimateur » n'a pas de sens sans fixer perte et classe d'estimateurs.

### Exemple 1.1 — Estimation d'un paramètre de translation
**Source :** Poly ch.3, Exemple 1.1, p. 9 (+ simulations et Intuition p. 9–10)
**Hypothèses :** $p$ densité de probabilité sur $\mathbb{R}$, **symétrique** : $p(x)=p(-x)$ pour tout $x$. Modèle
$$\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathbb{Q}_\theta=q_\theta\cdot\mathrm{Leb},\ \theta\in\Theta:=\mathbb{R}\}\big),\qquad q_\theta(x):=p(x-\theta),$$
$(X_1,\dots,X_n)$ un $n$-échantillon ; de façon équivalente $X_i=\theta+\varepsilon_i$, $\varepsilon_i$ i.i.d. de densité $p$.
**Énoncé :** trois estimateurs naturels du paramètre de centrage $\theta$ :
1. moyenne empirique $\hat\theta_n^{(1)}:=n^{-1}\sum_{i=1}^nX_i$ ;
2. médiane empirique $\hat\theta_n^{(2)}:=\mathrm{med}(X_1,\dots,X_n)$ ;
3. demi-somme des extrêmes $\hat\theta_n^{(3)}:=\big(\min(X_1,\dots,X_n)+\max(X_1,\dots,X_n)\big)/2$.

Les deux premiers sont des $Z$-estimateurs (ch.2, Exemple 1.6) associés à $\psi(\vartheta,x)=x-\vartheta$ et $\psi(\vartheta,x)=\mathrm{signe}(x-\vartheta)$.
Simulation : $m=1000$ échantillons de taille $n=100$ sous $\mathbb{Q}_0$, bruit gaussien $p(x)=(2\pi)^{-1/2}e^{-x^2/2}$ puis bruit de Laplace $p(x)=e^{-\lvert x\rvert}/2$ : les trois estimateurs se concentrent autour de $\theta=0$ mais avec des dispersions différentes, et **l'ordre change d'un bruit à l'autre**.
**Preuve (étapes) :** pas de preuve ; l'« Intuition » donne les variances asymptotiques (limites de $n$ fois la variance, justifiées au « cours 6 ») :
1. Bruit gaussien centré réduit : $\mathrm{Var}(\bar X_n)\approx 1/n$, médiane $\approx\pi/(2n)$ → la **moyenne** gagne.
2. Bruit de Laplace (variance 2) : moyenne $\approx 2/n$, médiane : variance asymptotique $1/(4np(0)^2)=1/n$ → la **médiane** gagne.
**Méthodes mobilisées :** simulation Monte-Carlo, comparaison de variances asymptotiques (admises).
**Intuition :** le meilleur estimateur dépend du modèle ; aucune raison qu'un même estimateur soit préférable dans tous les cas.
**Pièges / erreurs classiques :** ces simulations ne sont **pas** une comparaison : une seule valeur de $\theta$, une seule taille $n$. Il faut une mesure de qualité définie **pour tout** $\theta$ (biais, risque). Les deux autres bruits (uniforme, Cauchy) sont traités dans les compléments (§5).

### Définition 1.1 — Biais d'un estimateur
**Source :** Poly ch.3, Définition 1.1, p. 10
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique paramétrique ; $g:\Theta\to\mathbb{R}^p$ mesurable ; $T$ estimateur de $g:\theta\mapsto g(\theta)$ tel que $\mathbb{E}_\theta[\lVert T(Z)\rVert]<\infty$ pour tout $\theta\in\Theta$.
**Énoncé :** le **biais** de $T$ est la fonction
$$b:\theta\longmapsto b(\theta,T):=\mathbb{E}_\theta[T(Z)]-g(\theta).$$
$T$ est dit **sans biais** si $b(\theta,T)=0$ pour tout $\theta\in\Theta$, c'est-à-dire si $\mathbb{E}_\theta[T(Z)]=g(\theta)$ pour tout $\theta\in\Theta$.
**Preuve (étapes) :** définition.
**Intuition :** si l'on répétait l'expérience un grand nombre de fois, l'estimateur tomberait-il en moyenne sur la bonne valeur ?
**Pièges / erreurs classiques :** le biais est une **fonction** du paramètre, pas un nombre ; un estimateur peut être sans biais en un point et biaisé ailleurs ; « sans biais » exige l'égalité **pour toutes** les valeurs de $\theta$. Condition d'intégrabilité nécessaire pour que le biais existe.

### Exemple 1.2 — Modèle de Bernoulli : la fréquence empirique est sans biais
**Source :** Poly ch.3, Exemple 1.2, p. 10
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon du modèle $\big(\{0,1\},\mathcal{P}(\{0,1\}),\{\mathcal{B}\mathrm{er}(\theta),\ \theta\in\Theta:=[0,1]\}\big)$.
**Énoncé :** $\mathbb{E}_\theta[X_i]=\theta$ pour tout $i$, donc $\mathbb{E}_\theta[\bar X_n]=\theta$ : $\bar X_n=n^{-1}\sum_{i=1}^nX_i$ est sans biais de $\theta$. Plus généralement, dès que $\mathbb{E}_\theta[\lvert X_1\rvert]<\infty$ pour tout $\theta$, la moyenne empirique est un estimateur sans biais de $g(\theta):=\mathbb{E}_\theta[X_1]$.
**Preuve (étapes) :** 1. $\mathbb{E}_\theta[\bar X_n]=\frac1n\sum_i\mathbb{E}_\theta[X_i]$ (linéarité de l'espérance). 2. $=\mathbb{E}_\theta[X_1]$ (même loi).
**Méthodes mobilisées :** linéarité de l'espérance.
**Intuition :** la moyenne empirique est l'estimateur sans biais « par défaut » de l'espérance.

### Exemple 1.3 — Modèle uniforme : le maximum est biaisé
**Source :** Poly ch.3, Exemple 1.3, p. 10
**Hypothèses :** $n$-échantillon du modèle $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{U}([0,\theta]),\ \theta\in\Theta:=\mathbb{R}_+^*\}\big)$.
**Énoncé :** l'EMV est $X_{n:n}=\max(X_1,\dots,X_n)$ (ch.2, Exemple 1.11). Il est biaisé, de biais $-\theta/(n+1)$ : il **sous-estime systématiquement** $\theta$, ce qui est naturel puisque $X_{n:n}\le\theta$ p.s.
**Preuve (étapes) :** renvoyée à l'Exemple 1.9 et à l'Exercice 1 (PC3).
**Intuition :** un estimateur toujours $\le\theta$ et non dégénéré a forcément une espérance $<\theta$.

### Exemple 1.4 — Variance empirique : quelle normalisation ?
**Source :** Poly ch.3, Exemple 1.4, p. 11
**Hypothèses :** $n$-échantillon d'un modèle $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ avec $\mathbb{E}_\theta[X_1^2]<\infty$ pour tout $\theta$ ; cible $g(\theta):=\mathrm{Var}_\theta(X_1)$.
**Énoncé :** l'estimateur naturel (aussi EMV gaussien, ch.2, Exemple 1.10)
$$\hat\sigma_n^2:=\frac1n\sum_{i=1}^n(X_i-\bar X_n)^2$$
vérifie $\mathbb{E}_\theta[\hat\sigma_n^2]=\frac{n-1}{n}\mathrm{Var}_\theta(X_1)$ : biais $-\mathrm{Var}_\theta(X_1)/n$. L'estimateur
$$S_n^2:=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X_n)^2$$
est **sans biais** (raison de la normalisation par $n-1$).
**Preuve (étapes) :**
1. Pour tout $a\in\mathbb{R}$ (développement direct du carré $(X_i-a)-(\bar X_n-a)$) :
$$\frac1n\sum_{i=1}^n(X_i-\bar X_n)^2=\frac1n\sum_{i=1}^n(X_i-a)^2-2(\bar X_n-a)\frac1n\sum_{i=1}^n(X_i-a)+(\bar X_n-a)^2=\frac1n\sum_{i=1}^n(X_i-a)^2-(\bar X_n-a)^2,$$
car $\frac1n\sum_i(X_i-a)=\bar X_n-a$.
2. On prend $a=\mathbb{E}_\theta[X_1]$ et l'espérance sous $\mathbb{P}_\theta$ :
$$\mathbb{E}_\theta[\hat\sigma_n^2]=\frac1n\sum_{i=1}^n\mathrm{Var}_\theta(X_i)-\mathrm{Var}_\theta(\bar X_n)=\mathrm{Var}_\theta(X_1)-\frac{\mathrm{Var}_\theta(X_1)}{n}=\frac{n-1}{n}\mathrm{Var}_\theta(X_1)$$
(car $\mathbb{E}_\theta[\bar X_n]=a$, et $\mathrm{Var}_\theta(\bar X_n)=\mathrm{Var}_\theta(X_1)/n$ par indépendance).
3. Multiplier par $n/(n-1)$ donne $S_n^2$ sans biais.
**Méthodes mobilisées :** identité de König-Huygens « décentrée », linéarité, variance d'une moyenne de v.a. indépendantes.
**Intuition :** on a « consommé » un degré de liberté en estimant la moyenne par $\bar X_n$.
**Pièges / erreurs classiques :** un estimateur naturel peut être biaisé « sans que cela se voie » ; le biais disparaît asymptotiquement mais pas à $n$ fixé.

### Exemple 1.5 — Une fonction sans estimateur sans biais
**Source :** Poly ch.3, Exemple 1.5, p. 11
**Hypothèses :** modèle binomial $\big(\{0,\dots,n\},\mathcal{P}(\{0,\dots,n\}),\{\mathrm{Bin}(n,\theta),\ \theta\in\Theta:=]0,1]\}\big)$, $n$ connu ; cible $g(\theta)=1/\theta$.
**Énoncé :** pour tout estimateur $T$,
$$\mathbb{E}_\theta[T(Z)]=\sum_{k=0}^n\binom{n}{k}T(k)\,\theta^k(1-\theta)^{n-k}.\tag{1}$$
C'est un polynôme en $\theta$, donc borné sur $]0,1]$, alors que $1/\theta\to+\infty$ quand $\theta\to0$ : **il n'existe pas d'estimateur sans biais de $1/\theta$**. Plus généralement (démontré dans les compléments, Prop. 4.1) : $g$ admet un estimateur sans biais **ssi** $g$ est un polynôme en $\theta$ de degré $\le n$, et cet estimateur est alors **unique**.
**Preuve (étapes) :**
1. $Z$ prend un nombre fini de valeurs → l'espérance est une somme finie (1).
2. Chaque terme est un polynôme en $\theta$ de degré $\le n$ → la somme est un polynôme, borné sur le compact $[0,1]$.
3. Une fonction bornée ne peut pas égaler $1/\theta$, non bornée au voisinage de $0$ → contradiction.
**Méthodes mobilisées :** écriture explicite de l'espérance en modèle discret fini, argument de bornitude.
**Intuition :** « être sans biais » est une **contrainte**, pas une propriété gratuite.
**Pièges / erreurs classiques :** l'existence d'un estimateur sans biais n'est jamais automatique. NB : ici $\Theta=]0,1]$, alors que la Prop. 4.1 des compléments prend $\Theta=[0,1[$.

### Remarque (après Ex. 1.5, non numérotée) — Le biais ne dit rien de la dispersion
**Source :** Poly ch.3, Remarque, p. 11–12
**Hypothèses :** —
**Énoncé :** le biais mesure une **erreur systématique** ; il ne dit rien de la dispersion. $X_1$ seul est sans biais de l'espérance, « aussi bon en moyenne que $\bar X_n$ et bien plus dispersé ». Un estimateur biaisé peut être préférable à un sans biais. Le biais n'est qu'une des deux composantes de l'erreur ; l'autre est la **variance** ; leur combinaison est mesurée par le risque quadratique.
**Preuve (étapes) :** sans objet.
**Intuition :** justesse ≠ précision.

### Définition 1.2 — Risque d'un estimateur
**Source :** Poly ch.3, Définition 1.2, p. 12
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ paramétrique avec $\Theta\subseteq\mathbb{R}^d$ ; $T:(\mathsf{Z},\mathcal{Z})\to(\mathbb{R}^p,\mathcal{B}(\mathbb{R}^p))$ estimateur de $g:\theta\mapsto g(\theta)$ ; $\ell:\Theta\times\mathbb{R}^p\to\mathbb{R}_+$ **fonction de perte**, mesurable en sa seconde variable.
**Énoncé :**
$$R_\ell(\theta,T):=\mathbb{E}_\theta\big[\ell(\theta,T(Z))\big],\qquad\theta\in\Theta.$$
Les pertes usuelles : $\ell(\theta,a):=W(g(\theta),a)$ avec $W:\mathbb{R}^p\times\mathbb{R}^p\to\mathbb{R}_+$ une distance (écart entre la valeur à estimer et l'action choisie).
**Preuve (étapes) :** définition (bien définie dans $[0,+\infty]$ car $\ell\ge0$).
**Intuition :** la perte chiffre l'erreur quand on répond $a$ alors que la bonne réponse est $g(\theta)$ ; le risque est la perte moyenne sous la loi des observations.
**Pièges / erreurs classiques :** le risque est une **fonction de $\theta$**, pas un nombre (cf. question courte 2). Cas particulier du risque d'une **règle de décision** (compléments, Déf. 4.1), cadre qui contient aussi les tests.

### Exemple 1.6 — Pertes quadratique et absolue
**Source :** Poly ch.3, Exemple 1.6, p. 12
**Hypothèses :** estimation de $g:\Theta\to\mathbb{R}^p$.
**Énoncé :**
- perte quadratique : $\ell_2(\theta,a):=\lVert a-g(\theta)\rVert_2^2=\sum_{i=1}^p\big(a^{(i)}-g(\theta)^{(i)}\big)^2$ (carré de la norme euclidienne) ;
- perte absolue : $\ell_1(\theta,a):=\lVert a-g(\theta)\rVert_1=\sum_{i=1}^p\big\lvert a^{(i)}-g(\theta)^{(i)}\big\rvert$ (norme 1).
**Preuve (étapes) :** définitions.
**Intuition :** voir remarque suivante.

### Remarque (après Ex. 1.6, non numérotée) — Le choix de la perte n'est pas neutre
**Source :** Poly ch.3, Remarque, p. 12
**Énoncé :** la perte encode ce que l'on considère comme une erreur grave. La quadratique pénalise beaucoup les grands écarts (sensible aux valeurs extrêmes) ; l'absolue proportionnellement. Une même paire d'estimateurs peut être classée dans un sens pour l'une et dans l'autre sens pour l'autre — ce n'est pas une pathologie : « quel est le meilleur estimateur ? » n'a de sens **qu'une fois la perte fixée**. **Dans tout le chapitre, sauf mention contraire, la perte est quadratique.**
**Preuve (étapes) :** sans objet.
**Intuition :** la perte est un choix de modélisation.

### Définition 1.3 — Risque quadratique, erreur quadratique moyenne
**Source :** Poly ch.3, Définition 1.3, p. 12
**Hypothèses :** $T$ estimateur de $g:\Theta\to\mathbb{R}$ avec $\mathbb{E}_\theta[T(Z)^2]<\infty$ pour tout $\theta\in\Theta$.
**Énoncé :**
$$R(\theta,T):=R_{\ell_2}(\theta,T)=\mathbb{E}_\theta\big[(T(Z)-g(\theta))^2\big]$$
est le **risque quadratique**, ou **erreur quadratique moyenne** (EQM), de $T$. Noté $R$ **sans indice** dans toute la suite.
**Preuve (étapes) :** définition.
**Intuition :** comme le biais, c'est une fonction du paramètre.

### Proposition 1.1 — Décomposition biais-variance
**Source :** Poly ch.3, Proposition 1.1, p. 13
**Hypothèses :** celles de la Déf. 1.3 ($g$ réelle, $T$ de carré intégrable sous chaque $\mathbb{P}_\theta$).
**Énoncé :** pour tout $\theta\in\Theta$,
$$R(\theta,T)=\mathrm{Var}_\theta(T(Z))+\big(b(\theta,T)\big)^2,\qquad b(\theta,T)=\mathbb{E}_\theta[T(Z)]-g(\theta).$$
**Preuve (étapes) :**
1. Insérer $\mathbb{E}_\theta[T(Z)]$ : $T(Z)-g(\theta)=\big(T(Z)-\mathbb{E}_\theta[T(Z)]\big)+\big(\mathbb{E}_\theta[T(Z)]-g(\theta)\big)$.
2. Développer le carré et prendre l'espérance (linéarité) :
$$R(\theta,T)=\mathbb{E}_\theta\Big[\big(T(Z)-\mathbb{E}_\theta[T(Z)]\big)^2\Big]+\big(\mathbb{E}_\theta[T(Z)]-g(\theta)\big)^2+2\big(\mathbb{E}_\theta[T(Z)]-g(\theta)\big)\,\mathbb{E}_\theta\big[T(Z)-\mathbb{E}_\theta[T(Z)]\big].$$
3. Le double produit est nul : $\mathbb{E}_\theta[T(Z)]-g(\theta)$ est un **nombre** (sort de l'espérance) et $\mathbb{E}_\theta[T(Z)-\mathbb{E}_\theta[T(Z)]]=0$.
4. Reconnaître $\mathrm{Var}_\theta(T(Z))+b(\theta,T)^2$.
La version **vectorielle** (matricielle) est la Prop. 2.3 des outils ; la version scalaire s'en déduit par la trace.
**Intuition :** la variance mesure l'**instabilité** d'un échantillon à l'autre, le biais le **décalage systématique**. Pour un estimateur sans biais, risque = variance : minimiser le risque parmi les sans biais revient à minimiser la variance. Mais rien n'oblige à annuler le biais : un peu de biais contre beaucoup de variance peut faire baisser le risque (Ex. 1.8, rétrécissement des compléments).
**Pièges / erreurs classiques :** ne pas oublier le **carré** du biais ; ne pas confondre $\mathrm{Var}_\theta(T)$ et $R(\theta,T)$ quand $T$ est biaisé.

### Remarque (illustration, non numérotée) — Estimateur à rétrécissement $T_\gamma=\gamma T$
**Source :** Poly ch.3, p. 13 (animation)
**Énoncé :** multiplier un estimateur sans biais par $\gamma\in[0,1]$ le « tire vers zéro » : source de biais, mais peut réduire le risque quadratique pour certaines valeurs de $\theta$. L'animation montre biais$^2$ et variance variant en sens opposés avec $\gamma$, et le risque « $R(\gamma,\theta)$ ». Analyse complète dans les compléments (§5).

### Exemple 1.7 — Modèle de Poisson : erreur quadratique moyenne de la moyenne empirique
**Source :** Poly ch.3, Exemple 1.7, p. 13–14
**Hypothèses :** $n$-échantillon du modèle $\big(\mathbb{N},\mathcal{P}(\mathbb{N}),\{\mathcal{P}\mathrm{oi}(\lambda),\ \lambda\in\mathbb{R}_+^*\}\big)$ ; EMV $\hat\lambda_n=\bar X_n$ (ch.2, Exemple 1.9).
**Énoncé :** $\mathbb{E}_\lambda[X_1]=\lambda$ donc $\hat\lambda_n$ sans biais, et
$$R(\lambda,\hat\lambda_n)=\mathrm{Var}_\lambda(\bar X_n)=\frac{\mathrm{Var}_\lambda(X_1)}{n}=\frac{\lambda}{n}.$$
**Preuve (étapes) :** 1. Sans biais (linéarité). 2. Biais-variance : risque = variance. 3. Variance de la moyenne de v.a. i.i.d. $=\mathrm{Var}/n$ (indépendance). 4. $\mathrm{Var}_\lambda(X_1)=\lambda$ (Poisson).
**Méthodes mobilisées :** décomposition biais-variance, variance d'une moyenne i.i.d.
**Intuition :** risque en $n^{-1}$, croissant en $\lambda$ : le paramètre est d'autant plus difficile à estimer qu'il est grand.

### Exemple 1.8 — Estimation de la variance dans le modèle gaussien
**Source :** Poly ch.3, Exemple 1.8, p. 14
**Hypothèses :** $n$-échantillon du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\mu,\sigma^2),\ \theta=(\mu,\sigma^2)\in\Theta:=\mathbb{R}\times\mathbb{R}_+^*\}\big)$, $n\ge2$ ; cible $g(\theta)=\sigma^2$.
**Énoncé :**
$$R(\theta,S_n^2)=\frac{2\sigma^4}{n-1},\qquad R(\theta,\hat\sigma_n^2)=\frac{(2n-1)\sigma^4}{n^2},\qquad R(\theta,S_n^2)-R(\theta,\hat\sigma_n^2)=\frac{(3n-1)\sigma^4}{(n-1)n^2}>0$$
pour **tout** $\theta$ : l'estimateur biaisé $\hat\sigma_n^2$ a un risque **strictement plus petit** que l'estimateur sans biais $S_n^2$.
**Preuve (étapes) :**
1. Théorème de Gosset (ch.1, Th. 1.3) : $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$, de variance $2(n-1)$. Donc $\mathrm{Var}_\theta(S_n^2)=\frac{\sigma^4}{(n-1)^2}\cdot2(n-1)=\frac{2\sigma^4}{n-1}$.
2. $S_n^2$ sans biais (Ex. 1.4) ⇒ $R(\theta,S_n^2)=\mathrm{Var}_\theta(S_n^2)=\frac{2\sigma^4}{n-1}$ (biais-variance).
3. $\hat\sigma_n^2=\frac{n-1}{n}S_n^2$ ⇒ $\mathbb{E}_\theta[\hat\sigma_n^2]=\frac{n-1}{n}\sigma^2$ et $\mathrm{Var}_\theta(\hat\sigma_n^2)=\frac{(n-1)^2}{n^2}\cdot\frac{2\sigma^4}{n-1}=\frac{2(n-1)\sigma^4}{n^2}$.
4. Biais-variance :
$$R(\theta,\hat\sigma_n^2)=\Big(\frac{n-1}{n}\sigma^2-\sigma^2\Big)^2+\frac{2(n-1)\sigma^4}{n^2}=\frac{\sigma^4}{n^2}+\frac{2(n-1)\sigma^4}{n^2}=\frac{(2n-1)\sigma^4}{n^2}.$$
5. Différence : $\frac{2\sigma^4}{n-1}-\frac{(2n-1)\sigma^4}{n^2}=\frac{\sigma^4\,[2n^2-(2n-1)(n-1)]}{(n-1)n^2}=\frac{(3n-1)\sigma^4}{(n-1)n^2}>0$.
**Méthodes mobilisées :** théorème de Gosset (loi du $\chi^2$), décomposition biais-variance, comparaison de risques.
**Intuition :** le carré du biais ($\sigma^4/n^2$) est plus que compensé par la réduction de variance. Pour le risque quadratique, $S_n^2$ n'est **pas** le meilleur ; il est même **inadmissible** (cf. §1.5).
**Pièges / erreurs classiques :** « sans biais » ≠ « meilleur » ; l'hypothèse gaussienne sert à calculer $\mathrm{Var}(S_n^2)$.

### Exemple 1.9 — Estimation du support d'une loi uniforme
**Source :** Poly ch.3, Exemple 1.9, p. 14–15
**Hypothèses :** $n$-échantillon du modèle $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{U}([0,\theta]),\ \theta\in\Theta:=\mathbb{R}_+^*\}\big)$ ; $X_{n:n}=\max(X_1,\dots,X_n)$.
**Énoncé :**
- *Loi de $X_{n:n}$* : $\mathbb{P}_\theta(X_{n:n}\le x)=(x/\theta)^n$ pour $x\in[0,\theta]$ ; densité $x\mapsto n\,x^{n-1}/\theta^n$ sur $[0,\theta]$.
- *Biais* : $\mathbb{E}_\theta[X_{n:n}]=\frac{n}{n+1}\theta$, donc $b(\theta,X_{n:n})=-\theta/(n+1)$, et $T_n^{(1)}:=\frac{n+1}{n}X_{n:n}$ est **sans biais**.
- *Risque de la famille $aX_{n:n}$* : pour tout $a\in\mathbb{R}$,
$$\mathbb{E}_\theta\big[(aX_{n:n}-\theta)^2\big]=a^2\frac{n\theta^2}{n+2}-2a\theta\cdot\frac{n\theta}{n+1}+\theta^2=\theta^2\Big\{\frac{na^2}{n+2}-\frac{2an}{n+1}+1\Big\},$$
minimal en $a_n:=(n+2)/(n+1)$ (indépendant de $\theta$), avec
$$R(\theta,a_nX_{n:n})=\frac{\theta^2}{(n+1)^2},$$
tandis que $T_n^{(1)}$ ($a=(n+1)/n$) a un risque strictement plus grand pour tout $\theta$ (à savoir $\theta^2/\{n(n+2)\}$, cf. Ex. 1.16 et Exercice 1).
- *Vitesse* : risque en $n^{-2}$ et non $n^{-1}$ (repris à l'Ex. 1.16).
**Preuve (étapes) :**
1. $\{X_{n:n}\le x\}=\bigcap_i\{X_i\le x\}$ ; par **indépendance** (et même loi) $\mathbb{P}_\theta=\prod_i(x/\theta)=(x/\theta)^n$ ; on dérive en $x$ pour la densité.
2. $\mathbb{E}_\theta[X_{n:n}]=\int_0^\theta x\,\frac{nx^{n-1}}{\theta^n}\,\mathrm{d}x=\frac{n}{n+1}\theta$.
3. $\mathbb{E}_\theta[X_{n:n}^2]=\int_0^\theta x^2\,nx^{n-1}\theta^{-n}\,\mathrm{d}x=\frac{n\theta^2}{n+2}$.
4. Développer $(aX_{n:n}-\theta)^2$ et utiliser 2–3 (linéarité).
5. L'accolade est un trinôme en $a$ de coefficient dominant $n/(n+2)>0$ ; minimum en $a=\frac{2n/(n+1)}{2n/(n+2)}=\frac{n+2}{n+1}$, **quel que soit $\theta$**.
6. Valeur au minimum : $1-\frac{n(n+2)}{(n+1)^2}=\frac{1}{(n+1)^2}$, d'où $\theta^2/(n+1)^2$.
**Méthodes mobilisées :** loi du maximum par la fonction de répartition (indépendance), calcul de moments, minimisation d'un trinôme, comparaison de risques uniformément en $\theta$.
**Intuition :** l'estimateur sans biais $T_n^{(1)}$ n'est **pas** le meilleur de la famille : il est inadmissible.
**Pièges / erreurs classiques :** le minimum du trinôme ne dépend pas de $\theta$ — c'est ce qui rend la comparaison **uniforme** ; la vitesse $n^{-2}$ est due à la **non-régularité** du modèle.

### Définition (non numérotée, §1.5) — Ordre partiel, uniformément meilleur, uniformément optimal
**Source :** Poly ch.3, §1.5, p. 15
**Hypothèses :** une perte $\ell$ fixée.
**Énoncé :** le risque définit un **ordre partiel** sur les estimateurs : $T$ est **préférable** à $T'$, ou **uniformément meilleur** que $T'$ pour la perte $\ell$, si
$$R_\ell(\theta,T)\le R_\ell(\theta,T')\quad\text{pour tout }\theta\in\Theta.$$
$T$ est **uniformément optimal** pour $\ell$ s'il est uniformément meilleur que tout autre estimateur. Deux estimateurs dont les fonctions de risque **se croisent** ne sont pas comparables.
**Intuition :** comparer des estimateurs, c'est comparer des fonctions — d'où un ordre seulement partiel.

### Définition 1.4 — Admissibilité
**Source :** Poly ch.3, Définition 1.4, p. 15
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique, $\ell$ perte, $T$ estimateur de $g:\Theta\to\mathbb{R}^p$.
**Énoncé :** $T$ est **inadmissible** (pour $\ell$) s'il existe un estimateur $T^*$ tel que
$$R_\ell(\theta,T^*)\le R_\ell(\theta,T)\ \text{ pour tout }\theta\in\Theta,\qquad R_\ell(\theta,T^*)<R_\ell(\theta,T)\ \text{ pour au moins un }\theta\in\Theta.$$
Un estimateur non inadmissible est **admissible** : c'est un **élément maximal** pour l'ordre partiel induit par le risque.
**Preuve (étapes) :** définition.
**Intuition :** analogie de la promotion : être *admissible* = aucun élève n'a une meilleure note que moi **dans toutes les matières** (facile : il suffit d'être le meilleur dans une matière) ; être *uniformément optimal* = être le meilleur dans **toutes** les matières (très fort, en général hors d'atteinte). L'admissibilité est un prérequis **minimal** : un estimateur inadmissible n'a aucune raison d'être gardé.
**Pièges / erreurs classiques :** admissible ≠ bon (Ex. 1.10). Applications : $S_n^2$ est inadmissible en gaussien (Ex. 1.8) ; $T_n^{(1)}$ est inadmissible en uniforme (Ex. 1.9). Il existe en général beaucoup d'estimateurs incomparables et des estimateurs admissibles indésirables.

### Exemple 1.10 — Un estimateur admissible mais indésirable
**Source :** Poly ch.3, Exemple 1.10, p. 16
**Hypothèses :** $n$-échantillon de Bernoulli $\big(\{0,1\}^n,\mathcal{P}(\{0,1\}^n),\{\mathcal{B}\mathrm{er}(\theta)^{\otimes n},\ \theta\in\Theta:=[0,1]\}\big)$, risque quadratique, estimation de $\theta$. On fixe $\vartheta\in]0,1[$ et l'estimateur constant $\hat\theta_\vartheta:Z\mapsto\vartheta$.
**Énoncé :**
1. $R(\theta,\hat\theta_\vartheta)=(\theta-\vartheta)^2$, nul en $\theta=\vartheta$, et $\hat\theta_\vartheta$ est **admissible**.
2. **Il n'existe pas d'estimateur uniformément optimal** pour le risque quadratique. (Le résultat s'étend à d'autres pertes, d'autres modèles dominés et d'autres fonctions du paramètre — affirmé sans preuve.)
**Preuve (étapes) :**
1. Par l'absurde, si $\hat\theta_\vartheta$ était inadmissible, il existerait $T$ avec $R(\theta,T)\le(\theta-\vartheta)^2$ pour tout $\theta$, donc $R(\vartheta,T)=0$.
2. Perte quadratique : $\mathbb{E}_\vartheta[(T(Z)-\vartheta)^2]=0$ ⇒ $T(Z)=\vartheta$ $\mathbb{P}_\vartheta$-p.s.
3. Comme $\vartheta\in]0,1[$, $\mathbb{P}_\vartheta$ charge **tous** les points de $\{0,1\}^n$ ⇒ $T(z)=\vartheta$ pour tout $z$, i.e. $T=\hat\theta_\vartheta$.
4. Alors l'inégalité stricte requise n'est réalisée en aucun point : contradiction ⇒ admissible.
5. Non-existence d'un optimal : si $T^\star$ était uniformément optimal, pour tout $\vartheta\in]0,1[$, $R(\vartheta,T^\star)\le R(\vartheta,\hat\theta_\vartheta)=0$, donc (étapes 2–3) $T^\star\equiv\vartheta$ pour **toute** valeur de $\vartheta$ : impossible.
**Méthodes mobilisées :** raisonnement par l'absurde, risque nul ⇒ égalité p.s., support plein de la loi.
**Intuition :** l'estimateur constant « gagne » en un point et ignore complètement les données ; l'admissibilité n'apprend presque rien.
**Pièges / erreurs classiques :** l'argument utilise $\vartheta\in]0,1[$ (support plein) ; ne pas conclure « admissible donc bon ».

### Remarque (§1.6, non numérotée) — Restreindre la classe des estimateurs
**Source :** Poly ch.3, §1.6, p. 16–17
**Énoncé :** puisqu'aucun estimateur n'est uniformément optimal, deux voies :
- **changer de critère** en agrégeant le risque en un nombre : approche **minimax** (pire cas) ou **bayésienne** (moyenne selon une loi a priori) — définies dans les compléments, non développées ;
- **restreindre la classe** (voie du chapitre), assez petite pour que l'optimum existe, assez grande pour qu'il soit intéressant. Trois restrictions usuelles :
  1. **absence de biais** (retenue dans la suite ; exclut l'estimateur constant) ;
  2. **invariance** sous un groupe : en translation, $T(x_1+c,\dots,x_n+c)=c+T(x_1,\dots,x_n)$ pour tout $c$ ; le risque ne dépend alors plus du paramètre (compléments) ;
  3. **linéarité** : $T(X_1,\dots,X_n)=\sum_{i=1}^na_iX_i+b$.
**Intuition :** on achète l'existence d'un optimum en réduisant les concurrents.

### Exemple 1.11 — Meilleur estimateur linéaire sans biais de l'espérance
**Source :** Poly ch.3, Exemple 1.11, p. 17
**Hypothèses :** $n$-échantillon d'un modèle $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ avec $\mathbb{E}_\theta[X_1^2]<\infty$ ; cible $g(\theta):=\mathbb{E}_\theta[X_1]$ ; classe
$$\hat\mu_\alpha:=\sum_{i=1}^n\alpha_iX_i,\qquad\alpha=(\alpha_1,\dots,\alpha_n)\in\mathbb{R}^n,\ \sum_{i=1}^n\alpha_i=1.$$
Notation $\sigma^2(\theta):=\mathrm{Var}_\theta(X_1)$.
**Énoncé :** $R(\theta,\hat\mu_\alpha)=\sigma^2(\theta)\sum_{i=1}^n\alpha_i^2$, minimisé **simultanément pour tout $\theta$** par $\alpha_1^\star=\dots=\alpha_n^\star=1/n$ : **la moyenne empirique est le meilleur estimateur linéaire sans biais** de l'espérance (risque quadratique). Si $\sigma^2(\theta)>0$ pour au moins un $\theta$, tout $\hat\mu_\alpha$ avec $\alpha\ne(1/n,\dots,1/n)$ est **inadmissible**.
**Preuve (étapes) :**
1. $\sum_i\alpha_i=1$ ⇒ $\mathbb{E}_\theta[\hat\mu_\alpha]=g(\theta)$ : sans biais (linéarité).
2. Biais-variance ⇒ $R=\mathrm{Var}_\theta(\hat\mu_\alpha)$ ; **indépendance** ⇒ $\mathrm{Var}_\theta(\hat\mu_\alpha)=\sum_i\alpha_i^2\sigma^2(\theta)$.
3. **Cauchy-Schwarz** (Prop. 2.1) ou stricte convexité du carré : $\frac1n\sum_i\alpha_i^2\ge\big(\frac1n\sum_i\alpha_i\big)^2$, égalité ssi $\alpha_1=\dots=\alpha_n$.
4. Avec $\sum\alpha_i=1$ : $\sum\alpha_i^2\ge1/n$, égalité ssi $\alpha_i=1/n$.
5. Inadmissibilité : pour $\alpha\ne(1/n,\dots)$, $\sum\alpha_i^2>1/n$, donc risque $\ge$ celui de $\bar X_n$ partout et $>$ là où $\sigma^2(\theta)>0$.
**Méthodes mobilisées :** décomposition biais-variance, variance d'une somme indépendante, inégalité de Cauchy-Schwarz / convexité, optimisation sous contrainte.
**Intuition :** combine restriction linéaire + sans biais ; premier résultat d'optimalité du chapitre. L'Exercice 4 lève la contrainte d'absence de biais.
**Pièges / erreurs classiques :** l'optimalité est **dans la classe** linéaire sans biais seulement.

### Définition 1.5 — Estimateur sans biais de variance minimale
**Source :** Poly ch.3, Définition 1.5, p. 17
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$, $g:\Theta\to\mathbb{R}$, $T,T'$ estimateurs **sans biais** de $g(\theta)$, de carré intégrable.
**Énoncé :**
- $T$ est **uniformément meilleur** que $T'$ si $\mathrm{Var}_\theta(T(Z))\le\mathrm{Var}_\theta(T'(Z))$ pour tout $\theta\in\Theta$ ;
- $T$ est un **estimateur sans biais de variance minimale (E.S.B.V.M.)** s'il est uniformément meilleur que **tout** estimateur sans biais de $g(\theta)$.
**Preuve (étapes) :** définition (cohérente avec le risque quadratique par biais-variance).
**Intuition :** optimalité **dans la classe des sans biais**. Stratégie du chapitre (indirecte) : établir une **borne inférieure** sur la variance de tout estimateur sans biais ; un estimateur sans biais qui l'atteint est automatiquement E.S.B.V.M.
**Pièges / erreurs classiques :** un E.S.B.V.M. peut avoir un risque quadratique supérieur à celui d'un estimateur biaisé (Ex. 1.8).

### Remarque (Résumé, non numérotée) — Fil de la première moitié
**Source :** Poly ch.3, encadré « Résumé », p. 18
**Énoncé :** optimalité → perte → risque (une fonction) → comparer des fonctions n'est pas immédiat → admissibilité (prérequis minimal) → des estimateurs triviaux sont admissibles, aucun n'est uniformément optimal → restreindre la classe : on retient les **sans biais**.

### Remarque (§1.7, non numérotée) — Une borne inférieure pour la variance : le calcul heuristique
**Source :** Poly ch.3, §1.7, p. 18
**Hypothèses :** modèle $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$, $\Theta$ **ouvert de $\mathbb{R}$**, $T$ sans biais de $\theta$ ; on **admet provisoirement** les dérivations sous l'intégrale.
**Énoncé :**
$$\mathrm{Var}_\theta(T(Z))\ \ge\ \frac{1}{\mathrm{Var}_\theta\big(\frac{\partial}{\partial\theta}\log p_\theta(Z)\big)},\qquad\text{et pour }T\text{ sans biais de }g(\theta):\quad\mathrm{Var}_\theta(T(Z))\ \ge\ \frac{\{g'(\theta)\}^2}{\mathrm{Var}_\theta\big(\frac{\partial}{\partial\theta}\log p_\theta(Z)\big)}.$$
**Preuve (étapes) :**
1. Sans biais : $\theta=\mathbb{E}_\theta[T(Z)]=\int_{\mathsf{Z}}T(z)p_\theta(z)\,\mu(\mathrm{d}z)$.
2. Dériver en $\theta$ (dérivation sous l'intégrale **admise**) : $1=\int T(z)\frac{\partial}{\partial\theta}p_\theta(z)\,\mu(\mathrm{d}z)$.
3. Soustraire $\theta\int\partial_\theta p_\theta\,\mathrm{d}\mu=0$ (car $\int\partial_\theta p_\theta\,\mathrm{d}\mu=\partial_\theta\int p_\theta\,\mathrm{d}\mu=\partial_\theta1=0$, seconde dérivation sous l'intégrale) :
$$1=\int\big(T(z)-\theta\big)\frac{\partial}{\partial\theta}p_\theta(z)\,\mu(\mathrm{d}z)=\int\big(T(z)-\theta\big)\Big(\frac{\partial}{\partial\theta}\log p_\theta(z)\Big)p_\theta(z)\,\mu(\mathrm{d}z)=\mathbb{E}_\theta\Big[\big(T(Z)-\theta\big)\frac{\partial}{\partial\theta}\log p_\theta(Z)\Big].$$
4. Élever au carré et appliquer **Cauchy-Schwarz** :
$$1\le\mathbb{E}_\theta\big[(T(Z)-\theta)^2\big]\cdot\mathbb{E}_\theta\Big[\Big(\frac{\partial}{\partial\theta}\log p_\theta(Z)\Big)^2\Big]=\mathrm{Var}_\theta(T(Z))\cdot\mathrm{Var}_\theta\Big(\frac{\partial}{\partial\theta}\log p_\theta(Z)\Big),$$
la 1ʳᵉ égalité car $T$ sans biais, la 2ᵉ car la dérivée de la log-vraisemblance est d'espérance nulle (étape 3).
5. Même calcul pour $g(\theta)$ : $g'(\theta)=\mathbb{E}_\theta\big[(T(Z)-g(\theta))\frac{\partial}{\partial\theta}\log p_\theta(Z)\big]$, d'où la seconde borne.
**Intuition :** une borne inférieure valable pour **tous** les estimateurs sans biais à la fois — alors que la statistique fournit d'ordinaire des bornes supérieures sur l'erreur d'un estimateur particulier. Aucun estimateur sans biais ne descendra sous un niveau fixé **par le modèle seul**. Le calcul **dicte les hypothèses** : dominations pour les deux dérivations sous l'intégrale (régularité du **modèle** et de l'**estimateur**), moments d'ordre 2 pour Cauchy-Schwarz.
**Pièges / erreurs classiques :** ce n'est **pas** une preuve rigoureuse (dérivations admises) ; la preuve est le Th. 1.1.

### Remarque (p. 19, non numérotée) — Portée de la borne
**Source :** Poly ch.3, Remarque, p. 19
**Énoncé :** disposer d'une borne inférieure pour la variance de tout estimateur sans biais est un très beau résultat : la statistique est fondamentalement l'étude de l'information contenue dans les données, et « quantifier » cette information via des résultats d'optimalité est très puissant.

### Définition 1.6 — Modèle régulier
**Source :** Poly ch.3, Définition 1.6, p. 19 (notations $\mathrm{H}_F$ et norme de Frobenius rappelées juste avant, p. 19)
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$ modèle paramétrique, **$\Theta$ ouvert de $\mathbb{R}^d$**. Rappels : $\mathrm{H}_F(\theta,z)$ = hessienne de $\theta\mapsto F(\theta,z)$, de terme général $\partial^2F/\partial\theta^{(i)}\partial\theta^{(j)}(\theta,z)$ ; $\lVert A\rVert^2:=\mathrm{Tr}(A^\top A)$ (Frobenius).
**Énoncé :** le modèle est **régulier** s'il vérifie :
- **(i)** Il est dominé par une mesure $\sigma$-finie $\mu$ sur $(\mathsf{Z},\mathcal{Z})$, de densité $p_\theta$ : $\mathbb{P}_\theta=p_\theta\cdot\mu$. On pose
$$\ell(\theta,z):=\log p_\theta(z).\tag{2}$$
- **(ii)** Pour $\mu$-presque tout $z\in\mathsf{Z}$, $\theta\mapsto p_\theta(z)$ est **deux fois continûment différentiable** sur $\Theta$.
- **(iii)** Pour tout $\theta_0\in\Theta$, il existe un voisinage $\mathcal{V}_0$ de $\theta_0$ dans $\Theta$ et deux fonctions mesurables positives $h_0,h_1:(\mathsf{Z},\mathcal{Z})\to\mathbb{R}_+$ telles que
$$\int_{\mathsf{Z}}\{1+h_1(z)\}\,h_0(z)\,\mu(\mathrm{d}z)<\infty\tag{3}$$
et, pour tout $\theta\in\mathcal{V}_0$ et $\mu$-presque tout $z\in\mathsf{Z}$,
$$\lVert\nabla_\theta\ell(\theta,z)\rVert^2\le h_1(z),\qquad\lVert\mathrm{H}_\ell(\theta,z)\rVert\le h_1(z),\qquad p_\theta(z)\le h_0(z).\tag{4}$$
- **(iv)** Pour tout $\theta\in\Theta$, la matrice $\mathbb{E}_\theta[\mathrm{H}_\ell(\theta,Z)]$, bien définie par (iii), est **inversible**.
**Preuve (étapes) :** définition.
**Intuition :** formaliser « la densité dépend assez régulièrement de $\theta$ pour qu'on la dérive, et que la dérivation s'échange avec l'intégrale », via des **dominations locales**. Toutes les conditions portent sur la dépendance **en le paramètre** ($\theta\mapsto p_\theta(z)$), pas sur la régularité de $z\mapsto p_\theta(z)$.
**Pièges / erreurs classiques :** $\Theta$ doit être **ouvert** (sinon on ne peut pas dériver : Bernoulli s'écrit sur $]0,1[$, pas $[0,1]$). En exercice, la régularité est le plus souvent **admise** (vérification « fastidieuse mais sans surprise »). Attention : la condition porte sur $\lVert\nabla_\theta\ell\rVert^{2}$ (au carré) mais sur $\lVert\mathrm{H}_\ell\rVert$ (non au carré).

### Remarque (après Déf. 1.6, non numérotée) — Version allégée des slides
**Source :** Poly ch.3, Remarque, p. 19
**Énoncé :** les slides donnent une version allégée avec seulement trois conditions :
1. différentiabilité continue de $\theta\mapsto p_\theta(z)$ ;
2. validité de la dérivation sous l'intégrale $\nabla_\theta\int p_\theta(z)\mu(\mathrm{d}z)=\int\nabla_\theta p_\theta(z)\mu(\mathrm{d}z)=0$ ;
3. finitude de $\int\lVert\nabla_\theta\ell(\theta,z)\rVert^2p_\theta(z)\mu(\mathrm{d}z)$.

Ces trois conditions **suffisent pour Cramér-Rao** ; les conditions de la Déf. 1.6, plus fortes, permettent **en outre** l'expression de l'information par la hessienne (Prop. 1.2 (ii)), qui raccourcit beaucoup les calculs.

### Exemple 1.12 — Quels modèles sont réguliers ?
**Source :** Poly ch.3, Exemple 1.12, p. 20
**Hypothèses :** —
**Énoncé :** **réguliers** : exponentiel $\{\mathcal{E}(\theta),\ \theta\in\mathbb{R}_+^*\}$, gaussien $\{\mathcal{N}(\mu,\sigma^2),\ (\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*\}$, Bernoulli $\{\mathcal{B}\mathrm{er}(\theta),\ \theta\in]0,1[\}$, Poisson $\{\mathcal{P}\mathrm{oi}(\theta),\ \theta\in\mathbb{R}_+^*\}$, géométrique $\{\mathcal{G}(\theta),\ \theta\in]0,1[\}$ ($\mathcal{G}(\theta)$ = loi du rang du premier succès dans des tirages de Bernoulli indépendants de paramètre $\theta$).
**Non régulier** : uniforme $\{\mathcal{U}([0,\theta]),\ \theta\in\mathbb{R}_+^*\}$.
**Preuve (étapes) :** (régularité des premiers : affirmée, non vérifiée.) Pour l'uniforme : $p_\theta(x)=\theta^{-1}\mathbb{1}_{[0,\theta]}(x)$ ; pour $x>0$ fixé, $\theta\mapsto p_\theta(x)$ vaut $0$ sur $]0,x[$ et $1/\theta$ sur $[x,+\infty[$ ⇒ **discontinue** en $\theta=x$ ⇒ (ii) en défaut, et déjà la simple différentiabilité.
**Méthodes mobilisées :** étude de $\theta\mapsto p_\theta(x)$ à $x$ fixé.
**Intuition :** un modèle dont le **support dépend du paramètre** n'est en général pas régulier.
**Pièges / erreurs classiques :** regarder la régularité en $\theta$, pas en $x$ ; l'ouverture de $\Theta$ est requise.

### Définition 1.7 — Log-vraisemblance et score
**Source :** Poly ch.3, Définition 1.7, p. 20
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$ modèle régulier.
**Énoncé :** pour $\theta\in\Theta$, $z\in\mathsf{Z}$ : **log-vraisemblance** $\ell(\theta,z):=\log p_\theta(z)$ (éq. (2)) et **score**
$$S(\theta,z):=\nabla_\theta\ell(\theta,z)\in\mathbb{R}^d.$$
**Preuve (étapes) :** définition.
**Intuition :** en dimension 1, le score est la **pente** de la log-vraisemblance en $\theta$ ; en dimension $d$, un gradient pointant vers la plus forte croissance. En moyenne sous $\mathbb{P}_\theta$ il est nul (compensation entre observations) ; ce qui reste est sa **dispersion** : des valeurs souvent grandes = observations discriminantes = paramètre facile à cerner. C'est ce que mesure l'information de Fisher.

### Définition 1.8 — Information de Fisher
**Source :** Poly ch.3, Définition 1.8, p. 20
**Hypothèses :** modèle régulier $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$.
**Énoncé :** $\mathbb{I}:\Theta\to\mathrm{Mat}_d(\mathbb{R})$,
$$\mathbb{I}(\theta):=\mathbb{E}_\theta\big[\nabla_\theta\ell(\theta,Z)\,\nabla_\theta\ell(\theta,Z)^\top\big]=\mathbb{E}_\theta\big[S(\theta,Z)\,S(\theta,Z)^\top\big].\tag{5}$$
Bien définie et **indépendante du choix de la mesure dominante** (Lemme 2.1). Le score étant centré, $\mathbb{I}(\theta)$ est la **matrice de covariance du score** ; en dimension 1 :
$$\mathbb{I}(\theta)=\mathbb{E}_\theta\Big[\Big(\frac{\partial}{\partial\theta}\ell(\theta,Z)\Big)^2\Big]=\mathrm{Var}_\theta\big(S(\theta,Z)\big).$$
**Preuve (étapes) :** définition ; bonne définition : Lemme 2.1 (§3).
**Intuition :** dispersion du score = pouvoir discriminant des données.
**Pièges / erreurs classiques :** $\mathbb{I}$ dépend du **modèle** (nombre d'observations inclus) ; ne pas confondre $\mathbb{I}_1$ (une observation) et $\mathbb{I}$ du $n$-échantillon.

### Remarque (Point d'histoire) — R. A. Fisher (1890–1962)
**Source :** Poly ch.3, encadré p. 21
**Énoncé :** Fisher arrive en 1919 à Rothamsted (station d'agronomie) ; il en tire la planification des expériences, l'analyse de la variance et le maximum de vraisemblance (articles de 1922 et 1925), qui introduisent aussi la quantité d'information portant son nom.

### Proposition 1.2 — Propriétés du score et de l'information de Fisher
**Source :** Poly ch.3, Proposition 1.2, p. 21 (preuve p. 21–22)
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$ modèle **régulier**.
**Énoncé :**
- **(i)** Score centré : pour tout $\theta\in\Theta$,
$$\mathbb{E}_\theta\big[\nabla_\theta\ell(\theta,Z)\big]=0.\tag{6}$$
- **(ii)** Expression alternative :
$$\mathbb{I}(\theta)=-\mathbb{E}_\theta\big[\mathrm{H}_\ell(\theta,Z)\big].\tag{7}$$
- **(iii)** Additivité : pour deux modèles réguliers $(\mathsf{Z}_1,\mathcal{Z}_1,\{\mathbb{P}_{1,\theta},\ \theta\in\Theta\})$ et $(\mathsf{Z}_2,\mathcal{Z}_2,\{\mathbb{P}_{2,\theta},\ \theta\in\Theta\})$ de même $\Theta$, d'informations $\mathbb{I}_1,\mathbb{I}_2$, l'information $\mathbb{I}_{12}$ du modèle produit $\big(\mathsf{Z}_1\times\mathsf{Z}_2,\ \mathcal{Z}_1\otimes\mathcal{Z}_2,\ \{\mathbb{P}_{1,\theta}\otimes\mathbb{P}_{2,\theta},\ \theta\in\Theta\}\big)$ vérifie $\mathbb{I}_{12}(\theta)=\mathbb{I}_1(\theta)+\mathbb{I}_2(\theta)$. En particulier, pour un $n$-échantillon du modèle régulier $\mathcal{M}=(\mathsf{X},\mathcal{X},\{q_\theta\cdot\mu,\ \theta\in\Theta\})$, pour tout $\theta$ et $n\ge1$ :
$$\mathbb{I}_{\mathcal{M}^n}(\theta)=n\,\mathbb{I}_{\mathcal{M}}(\theta).$$
**Preuve (étapes) :**
1. *Dérivée du log* : pour $\mu$-p.t. $z$,
$$\nabla_\theta\ell(\theta,z)=\frac{1}{p_\theta(z)}\nabla_\theta p_\theta(z).\tag{8}$$
2. *Seconde différentiation* (dérivée d'un quotient) :
$$\mathrm{H}_\ell(\theta,z)=\frac{1}{p_\theta(z)}\mathrm{H}_p(\theta,z)-\frac{1}{p_\theta(z)^2}\nabla_\theta p_\theta(z)\nabla_\theta p_\theta(z)^\top=\frac{1}{p_\theta(z)}\mathrm{H}_p(\theta,z)-\nabla_\theta\ell(\theta,z)\nabla_\theta\ell(\theta,z)^\top.\tag{9}$$
3. *(i)* Par (8) puis interversion $(*)$ :
$$\mathbb{E}_\theta[\nabla_\theta\ell(\theta,Z)]=\int_{\mathsf{Z}}\nabla_\theta\ell(\theta,z)p_\theta(z)\,\mu(\mathrm{d}z)=\int_{\mathsf{Z}}\nabla_\theta p_\theta(z)\,\mu(\mathrm{d}z)\overset{(*)}{=}\nabla_\theta\int_{\mathsf{Z}}p_\theta(z)\,\mu(\mathrm{d}z)=\nabla_\theta1=0.$$
4. *(ii)* En intégrant (9) contre $p_\theta\,\mu$ et interversion $(**)$ ($\int\mathrm{H}_p(\theta,z)\mu(\mathrm{d}z)=\mathrm{H}(\theta)\int p_\theta\,\mathrm{d}\mu=0$) :
$$\mathbb{E}_\theta[\mathrm{H}_\ell(\theta,Z)]=\int_{\mathsf{Z}}\mathrm{H}_p(\theta,z)\,\mu(\mathrm{d}z)-\int_{\mathsf{Z}}\nabla_\theta\ell(\theta,z)\nabla_\theta\ell(\theta,z)^\top p_\theta(z)\,\mu(\mathrm{d}z)\overset{(**)}{=}0-\mathbb{I}(\theta).$$
5. *Justification de $(*)$* : pour $\theta\in\mathcal{V}_0$ et $\mu$-p.t. $z$, par (8),
$$\lVert\nabla_\theta p_\theta(z)\rVert=\lVert\nabla_\theta\ell(\theta,z)\rVert\,p_\theta(z)\le\big(1+\lVert\nabla_\theta\ell(\theta,z)\rVert^2\big)p_\theta(z)\le\{1+h_1(z)\}h_0(z),$$
(car $x\le1+x^2$, puis (4)), intégrable par (3) ⇒ **Prop. 2.2** (dérivation sous l'intégrale), coordonnée par coordonnée.
6. *Justification de $(**)$* : par (9) et l'identité $\lVert aa^\top\rVert=\lVert a\rVert^2$,
$$\lVert\mathrm{H}_p(\theta,z)\rVert\le\big(\lVert\mathrm{H}_\ell(\theta,z)\rVert+\lVert\nabla_\theta\ell(\theta,z)\rVert^2\big)p_\theta(z)\le2h_1(z)h_0(z),$$
$\mu$-intégrable ; $\mathrm{H}_p$ étant la matrice des dérivées des coordonnées de $\nabla_\theta p_\theta(z)$, la Prop. 2.2 appliquée à chacune justifie $(**)$.
7. *(iii)* Pour le produit, $\ell_{12}(\theta,(z_1,z_2))=\ell_1(\theta,z_1)+\ell_2(\theta,z_2)$ (log d'un produit de densités) ⇒ $\mathrm{H}_{\ell_{12}}=\mathrm{H}_{\ell_1}+\mathrm{H}_{\ell_2}$ ; espérance sous $\mathbb{P}_{1,\theta}\otimes\mathbb{P}_{2,\theta}$ et changement de signe via (ii) ⇒ $\mathbb{I}_{12}=\mathbb{I}_1+\mathbb{I}_2$. Cas du $n$-échantillon : **récurrence**, les $n$ facteurs étant identiques.
**Intuition :** (i) le score est en moyenne nul ; (ii) l'information est la **courbure moyenne** (changée de signe) de la log-vraisemblance ; (iii) des observations indépendantes **additionnent** leur information.
**Pièges / erreurs classiques :** (ii) exige les hypothèses fortes de la Déf. 1.6 ; ne pas oublier le **signe moins** ; l'additivité exige l'**indépendance** et le **même** paramètre.

### Remarque (après Prop. 1.2, non numérotée) — L'information est une caractéristique du modèle
**Source :** Poly ch.3, Remarque, p. 21
**Énoncé :** notation complète $\mathbb{I}(\mathcal{M},\theta)$ ; on écrit $\mathbb{I}(\theta)$ si le modèle est clair, $\mathbb{I}_1(\theta)$ ou $\mathbb{I}_{\mathcal{M}}(\theta)$ pour une observation, $\mathbb{I}_{\mathcal{M}^n}(\theta)$ pour le $n$-échantillon. (iii) = additivité pour observations indépendantes : l'information du $n$-échantillon vaut $n$ fois celle d'une observation.

### Remarque (après Prop. 1.2, non numérotée) — $\mathbb{I}(\theta)$ est définie positive
**Source :** Poly ch.3, Remarque, p. 21
**Énoncé :** $\nabla_\theta\ell\,\nabla_\theta\ell^\top$ est symétrique semi-définie positive ⇒ son espérance $\mathbb{I}(\theta)$ aussi. Par (7) et la condition (iv) de la Déf. 1.6, $\mathbb{I}(\theta)$ est **inversible**, donc **définie positive**. C'est ce qui donne un sens à $\mathbb{I}(\theta)^{-1}$ dans Cramér-Rao.

### Remarque (p. 22, non numérotée) — Schéma de calcul de l'information
**Source :** Poly ch.3, p. 22
**Énoncé :** toujours le même : (1) écrire la densité, (2) prendre le log, (3) dériver, (4) calculer soit la **variance du score**, soit **l'espérance de la dérivée seconde changée de signe**.

### Exemple 1.13 — Information de Fisher du modèle exponentiel
**Source :** Poly ch.3, Exemple 1.13, p. 22
**Hypothèses :** modèle $\{\mathcal{E}(\theta),\ \theta\in\Theta:=\mathbb{R}_+^*\}$, une observation.
**Énoncé / calcul :**
1. Densité / Lebesgue : $p_\theta(z)=\theta e^{-\theta z}\mathbb{1}_{\mathbb{R}_+}(z)$.
2. $\ell(\theta,z)=\log\theta-\theta z$ pour $z>0$.
3. Score $S(\theta,z)=\partial_\theta\ell(\theta,z)=1/\theta-z$ ; vérification : $\mathbb{E}_\theta[S(\theta,Z)]=1/\theta-\mathbb{E}_\theta[Z]=0$.
4. $\mathbb{I}(\theta)=\mathrm{Var}_\theta(S(\theta,Z))=\mathrm{Var}_\theta(1/\theta-Z)=\mathrm{Var}_\theta(Z)=1/\theta^2$.
**Preuve (étapes) :** ci-dessus ; utilise $\mathbb{E}_\theta[Z]=1/\theta$, $\mathrm{Var}_\theta(Z)=1/\theta^2$.
**Méthodes mobilisées :** schéma log → score → variance du score.
**Intuition :** information décroissante en $\theta$.
**Pièges / erreurs classiques :** ici $\theta$ est l'**intensité** (moyenne $1/\theta$) ; dans l'Exercice 5, la densité est $\theta^{-1}e^{-x/\theta}$ (θ = moyenne) — paramétrisation différente.

### Exemple 1.14 — Information de Fisher du modèle de Poisson
**Source :** Poly ch.3, Exemple 1.14, p. 23
**Hypothèses :** $\{\mathcal{P}\mathrm{oi}(\theta),\ \theta\in\Theta:=\mathbb{R}_+^*\}$, une observation.
**Énoncé / calcul :**
1. Densité / mesure de comptage sur $\mathbb{N}$ : $p_\theta(z)=e^{-\theta}\theta^z/z!$.
2. $\ell(\theta,z)=-\theta+z\log\theta-\log(z!)$.
3. $S(\theta,z)=z/\theta-1$, d'espérance $\mathbb{E}_\theta[Z]/\theta-1=0$.
4. $\mathbb{I}(\theta)=\mathrm{Var}_\theta(Z/\theta-1)=\mathrm{Var}_\theta(Z)/\theta^2=\theta/\theta^2=1/\theta$.

Par additivité, information du $n$-échantillon : $n/\theta$.
**Méthodes mobilisées :** variance du score, additivité (Prop. 1.2 (iii)).

### Exemple 1.15 — Information de Fisher du modèle de Bernoulli
**Source :** Poly ch.3, Exemple 1.15, p. 23
**Hypothèses :** $\{\mathcal{B}\mathrm{er}(\theta),\ \theta\in\Theta:=]0,1[\}$, dominé par la mesure de comptage sur $\{0,1\}$, $p_\theta(x)=\theta^x(1-\theta)^{1-x}$.
**Énoncé / calcul :**
$$\ell(\theta,x)=x\log\theta+(1-x)\log(1-\theta),\qquad\partial_\theta\ell(\theta,x)=\frac{x}{\theta}-\frac{1-x}{1-\theta},\qquad\partial_\theta^2\ell(\theta,x)=-\frac{x}{\theta^2}-\frac{1-x}{(1-\theta)^2},$$
$$\mathbb{I}_1(\theta)=-\mathbb{E}_\theta\big[\partial_\theta^2\ell(\theta,X_1)\big]=-\theta\,\partial_\theta^2\ell(\theta,1)-(1-\theta)\,\partial_\theta^2\ell(\theta,0)=\frac1\theta+\frac1{1-\theta}=\frac{1}{\theta(1-\theta)}.$$
Pour un $n$-échantillon : $\mathbb{I}(\theta)=n/(\theta(1-\theta))$.
**Méthodes mobilisées :** expression par la **dérivée seconde** (Prop. 1.2 (ii)), espérance d'une fonction d'une Bernoulli, additivité.
**Intuition :** le calcul par la dérivée seconde est ici plus court que par la variance du score. Information minimale en $\theta=1/2$ (là où l'on a le plus d'incertitude).

### Remarque (animations, non numérotées) — Score, pente et dispersion
**Source :** Poly ch.3, p. 23
**Énoncé :** (1) le score est la pente de la log-vraisemblance en $\theta$ et sa dispersion sous $\mathbb{P}_\theta$ est l'information ; l'animation compare la courbure de la KL à la parabole dictée par l'information ; (2) calcul guidé log-densité → score → information par la dérivée seconde pour Bernoulli, Poisson, exponentiel.

### Remarque (Intuition, non numérotée) — Information de Fisher = courbure de la divergence de Kullback-Leibler
**Source :** Poly ch.3, Intuition, p. 23–24
**Hypothèses :** raisonnement **non rigoureux** (dérivations sous l'intégrale non justifiées ; KL supposée deux fois différentiable en son second argument).
**Énoncé :** soit $\theta^\star$ la vraie valeur, $\mathrm{KL}(\theta^\star,\theta):=\mathrm{KL}(\mathbb{P}_{\theta^\star},\mathbb{P}_\theta)=\mathbb{E}_{\theta^\star}\big[\log\frac{p_{\theta^\star}(Z)}{p_\theta(Z)}\big]$ (ch.2, Déf. 1.7), positive, nulle seulement en $\theta=\theta^\star$ si le modèle est identifiable. Donc $\theta\mapsto\mathrm{KL}(\theta^\star,\theta)$ est minimale en $\theta^\star$, gradient nul (= score centré), et
$$\nabla_\theta^2\mathrm{KL}(\theta^\star,\theta)\big|_{\theta=\theta^\star}=-\mathbb{E}_{\theta^\star}\big[\mathrm{H}_\ell(\theta^\star,Z)\big]=\mathbb{I}(\theta^\star).$$
**Preuve (étapes) :** esquissée seulement (« n'est pas une démonstration »).
**Intuition :** $\log p_{\theta^\star}(Z)/p_\theta(Z)$ = pouvoir discriminant pour trancher entre $\theta^\star$ et $\theta$ (nul si les lois coïncident, $+\infty$ si $\theta$ est exclu). Grande information = KL qui remonte vite = lois voisines faciles à distinguer = paramètre facile à estimer ; cohérent avec $\mathbb{I}$ au **dénominateur** de Cramér-Rao.

### Définition 1.9 — Estimateur régulier
**Source :** Poly ch.3, Définition 1.9, p. 24
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$ modèle régulier, $\Theta$ ouvert de $\mathbb{R}^d$ ; $T:(\mathsf{Z},\mathcal{Z})\to\mathbb{R}$ estimateur d'une fonction $g:\Theta\to\mathbb{R}$.
**Énoncé :** $T$ est **régulier** si
- **(i)** $T(Z)$ est de carré intégrable : $\mathbb{E}_\theta[\{T(Z)\}^2]<\infty$ pour tout $\theta\in\Theta$ ;
- **(ii)** $\theta\mapsto\mathbb{E}_\theta[T(Z)]$ est différentiable sur $\Theta$ et, pour tout $\theta\in\Theta$,
$$\nabla_\theta\mathbb{E}_\theta[T(Z)]=\int_{\mathsf{Z}}T(z)\,\nabla_\theta p_\theta(z)\,\mu(\mathrm{d}z).\tag{10}$$
**Preuve (étapes) :** définition.
**Intuition :** la régularité du modèle justifie la 1ʳᵉ dérivation sous l'intégrale du §1.7 ; la seconde porte sur $\theta\mapsto\mathbb{E}_\theta[T(Z)]$ et dépend de l'estimateur : on la **pose comme hypothèse**.
**Pièges / erreurs classiques :** Cramér-Rao demande **deux** régularités : du modèle (Déf. 1.6) **et** de l'estimateur (Déf. 1.9).

### Remarque (après Déf. 1.9, non numérotée) — Condition suffisante de régularité d'un estimateur
**Source :** Poly ch.3, Remarque, p. 24
**Énoncé :** par la Prop. 2.2, (ii) est assurée si : pour tout $\theta_0\in\Theta$, il existe un voisinage $\mathcal{V}_0$ de $\theta_0$ et $h\ge0$ mesurable avec $\int_{\mathsf{Z}}\lvert T(z)\rvert h(z)\,\mu(\mathrm{d}z)<\infty$, et il existe $\mathsf{Z}_0\in\mathcal{Z}$ avec $\mu(\mathsf{Z}_0^c)=0$ tel que pour tout $z\in\mathsf{Z}_0$, $\theta\mapsto p_\theta(z)$ est différentiable sur $\Theta$ et $\lVert\nabla_\theta p_\theta(z)\rVert\le h(z)$ pour tout $\theta\in\mathcal{V}_0$. Vérification fastidieuse ; **admise dans les exercices**.

### Théorème 1.1 — Borne de Cramér-Rao
**Source :** Poly ch.3, Théorème 1.1, p. 24 (preuve p. 24–25)
**Hypothèses :**
- $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$ modèle **régulier** (Déf. 1.6), $\Theta$ ouvert de $\mathbb{R}^d$ ;
- $g:\Theta\to\mathbb{R}$ **dérivable**, à valeurs réelles ;
- $T$ estimateur **sans biais et régulier** (Déf. 1.9) de $g:\theta\mapsto g(\theta)$.
**Énoncé :** pour tout $\theta\in\Theta$,
$$\mathrm{Var}_\theta(T(Z))\ \ge\ \big(\nabla_\theta g(\theta)\big)^\top\,\mathbb{I}(\theta)^{-1}\,\nabla_\theta g(\theta).\tag{11}$$
**Preuve (étapes) :**
1. *Sans biais + régulier* (éq. (10)) puis (8) :
$$\nabla_\theta g(\theta)=\nabla_\theta\mathbb{E}_\theta[T(Z)]=\int_{\mathsf{Z}}T(z)\nabla_\theta p_\theta(z)\,\mu(\mathrm{d}z)=\int_{\mathsf{Z}}T(z)\nabla_\theta\ell(\theta,z)p_\theta(z)\,\mu(\mathrm{d}z)=\mathbb{E}_\theta\big[T(Z)\nabla_\theta\ell(\theta,Z)\big].$$
2. *Score centré* (Prop. 1.2 (i)) : $\mathbb{E}_\theta[g(\theta)\nabla_\theta\ell(\theta,Z)]=0$, d'où
$$\nabla_\theta g(\theta)=\mathbb{E}_\theta\big[\{T(Z)-g(\theta)\}\nabla_\theta\ell(\theta,Z)\big].$$
3. *Cauchy-Schwarz* (Prop. 2.1), pour $u\in\mathbb{R}^d$ fixé (produit scalaire avec $u$) :
$$\big\{\nabla_\theta g(\theta)^\top u\big\}^2=\Big(\mathbb{E}_\theta\big[\{T(Z)-g(\theta)\}\nabla_\theta\ell(\theta,Z)^\top u\big]\Big)^2\le\mathbb{E}_\theta\big[\{T(Z)-g(\theta)\}^2\big]\,\mathbb{E}_\theta\big[\{\nabla_\theta\ell(\theta,Z)^\top u\}^2\big].$$
4. *Sans biais* : $\mathbb{E}_\theta[\{T(Z)-g(\theta)\}^2]=\mathrm{Var}_\theta(T(Z))$. *Identité* $\{a^\top u\}^2=u^\top(aa^\top)u$ appliquée à $a=\nabla_\theta g(\theta)$ et $a=\nabla_\theta\ell(\theta,Z)$ (+ définition (5) de $\mathbb{I}$) :
$$u^\top\nabla_\theta g(\theta)\nabla_\theta g(\theta)^\top u\le\mathrm{Var}_\theta(T(Z))\cdot u^\top\mathbb{I}(\theta)u,\qquad u\in\mathbb{R}^d.$$
5. *Choix de $u$* : $u=\mathbb{I}(\theta)^{-1}\nabla_\theta g(\theta)$ (licite car $\mathbb{I}(\theta)$ inversible) :
$$\big(\nabla_\theta g(\theta)^\top\mathbb{I}(\theta)^{-1}\nabla_\theta g(\theta)\big)^2\le\mathrm{Var}_\theta(T(Z))\cdot\big(\nabla_\theta g(\theta)^\top\mathbb{I}(\theta)^{-1}\nabla_\theta g(\theta)\big).$$
6. *Simplification* : le facteur $\nabla_\theta g^\top\mathbb{I}^{-1}\nabla_\theta g\ge0$ ($\mathbb{I}(\theta)^{-1}$ définie positive) ; s'il est nul, (11) est triviale ; sinon on divise par ce facteur $>0$.
**Intuition :** la covariance entre l'erreur $T-g(\theta)$ et le score vaut le gradient de $g$ ; Cauchy-Schwarz transforme cette identité en inégalité. Aucun estimateur sans biais régulier ne fait mieux que la borne, fixée par le modèle.
**Pièges / erreurs classiques :** oublier de vérifier **sans biais** et **régularités** ; appliquer la borne au modèle uniforme (non régulier : Ex. 1.16) ; utiliser $\mathbb{I}_1$ au lieu de $\mathbb{I}$ du $n$-échantillon (facteur $n$) ; en multidimensionnel, utiliser $\mathbb{I}(\theta)^{-1}$ (inverse de matrice) et non l'inverse des termes diagonaux.

### Remarque (Point d'histoire) — C. R. Rao (1920–2023)
**Source :** Poly ch.3, encadré p. 25
**Énoncé :** Rao publie l'inégalité en 1945 (Bulletin of the Calcutta Mathematical Society), à 25 ans ; le même article contient le théorème de Rao-Blackwell (amélioration d'un estimateur par conditionnement sur une statistique exhaustive). Cramér publie indépendamment le même résultat l'année suivante.

### Corollaire 1.1 — Cas unidimensionnel
**Source :** Poly ch.3, Corollaire 1.1, p. 25
**Hypothèses :** $\Theta$ ouvert de $\mathbb{R}$ ; hypothèses du Th. 1.1.
**Énoncé :** pour tout $\theta\in\Theta$,
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\{g'(\theta)\}^2}{\mathbb{I}(\theta)},\qquad\text{où}\quad\mathbb{I}(\theta)=\mathrm{Var}_\theta\Big(\frac{\partial}{\partial\theta}\ell(\theta,Z)\Big).$$
**Preuve (étapes) :** cas $d=1$ du Th. 1.1 ($\nabla_\theta g=g'$, $\mathbb{I}^{-1}=1/\mathbb{I}$) ; reprend le calcul du §1.7.
**Intuition :** forme la plus utilisée en exercice.

### Corollaire 1.2 — Estimation d'un paramètre vectoriel
**Source :** Poly ch.3, Corollaire 1.2, p. 25 (preuve p. 26)
**Hypothèses :** modèle régulier, $\Theta$ ouvert de $\mathbb{R}^d$ ; $T(Z)$ estimateur sans biais et régulier de $\theta$, **au sens où chaque coordonnée $\lambda^\top T(Z)$, $\lambda\in\mathbb{R}^d$, est un estimateur sans biais et régulier de $\lambda^\top\theta$**.
**Énoncé :** pour tout $\theta\in\Theta$,
$$\mathrm{Var}_\theta(T(Z))\ge\mathbb{I}(\theta)^{-1},$$
i.e. la matrice symétrique $\mathrm{Var}_\theta(T(Z))-\mathbb{I}(\theta)^{-1}$ est **positive** (ordre de la §2 des outils).
**Preuve (étapes) :**
1. Fixer $\lambda\in\mathbb{R}^d$, $g:\theta\mapsto\lambda^\top\theta$, dérivable de gradient $\nabla_\theta g=\lambda$.
2. Par hypothèse, $\lambda^\top T(Z)$ est sans biais et régulier de $g(\theta)$ ⇒ Th. 1.1 : $\mathrm{Var}_\theta(\lambda^\top T(Z))\ge\lambda^\top\mathbb{I}(\theta)^{-1}\lambda$.
3. $\mathrm{Var}_\theta(\lambda^\top T(Z))=\lambda^\top\mathrm{Var}_\theta(T(Z))\lambda$ (bilinéarité de la covariance).
4. Valable pour tout $\lambda$ ⇒ $\mathrm{Var}_\theta(T(Z))-\mathbb{I}(\theta)^{-1}\ge0$.
**Intuition :** inégalité **matricielle** au sens de Loewner : toute direction $\lambda$ est minorée.
**Pièges / erreurs classiques :** c'est un ordre **partiel** ; en particulier $\mathrm{Var}_\theta(T_j)\ge[\mathbb{I}(\theta)^{-1}]_{jj}$ (et non $1/\mathbb{I}_{jj}$) — cf. Exercice 2 Q2–Q3.

### Corollaire 1.3 — Borne de Cramér-Rao pour un $n$-échantillon
**Source :** Poly ch.3, Corollaire 1.3, p. 26
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon du modèle régulier $(\mathsf{X},\mathcal{X},\{q_\theta\cdot\mu,\ \theta\in\Theta\})$ ; $T_n(X_1,\dots,X_n)$ estimateur sans biais et régulier de $g:\Theta\to\mathbb{R}$.
**Énoncé :** avec
$$\mathbb{I}_1(\theta):=\mathbb{E}_\theta\big[\nabla_\theta\ell_1(\theta,X_1)\nabla_\theta\ell_1(\theta,X_1)^\top\big],\qquad\ell_1(\theta,x):=\log q_\theta(x),$$
pour tout $\theta\in\Theta$ :
$$\mathrm{Var}_\theta\big(T_n(X_1,\dots,X_n)\big)\ge\frac1n\,\nabla_\theta g(\theta)^\top\,\mathbb{I}_1(\theta)^{-1}\,\nabla_\theta g(\theta).$$
**Preuve (étapes) :** Th. 1.1 appliqué au modèle du $n$-échantillon + additivité $\mathbb{I}_{\mathcal{M}^n}=n\mathbb{I}_1$ (Prop. 1.2 (iii)), d'où $\mathbb{I}_{\mathcal{M}^n}^{-1}=\frac1n\mathbb{I}_1^{-1}$. (Preuve non rédigée dans le poly : « combine le théorème et l'additivité ».)
**Intuition :** trois lectures du même énoncé (scalaire, matricielle, en $1/n$). Message clé : dans un modèle régulier, la variance d'un estimateur sans biais — donc son risque quadratique — est **au moins d'ordre $n^{-1}$**.

### Exemple 1.16 — Vitesse d'estimation et modèles non réguliers
**Source :** Poly ch.3, Exemple 1.16, p. 26
**Hypothèses :** —
**Énoncé :** $\mathrm{Var}(\bar X_n)$ et $\mathrm{Var}(S_n^2)$ (gaussien, Ex. 1.8) sont d'ordre $n^{-1}$, compatibles avec Cramér-Rao : la dépendance en $n$ de la borne **ne peut pas être améliorée**. En revanche dans le modèle uniforme (Ex. 1.9), $T_n^{(1)}=\frac{n+1}{n}X_{n:n}$ est sans biais de variance
$$\mathrm{Var}_\theta(T_n^{(1)})=\frac{\theta^2}{n(n+2)},$$
qui décroît en $n^{-2}$ : la borne serait violée si elle s'appliquait. **Pas de contradiction** : le modèle uniforme n'est pas régulier (Ex. 1.12). L'Exercice 3 construit une borne sans régularité et retrouve la vitesse $n^{-2}$.
**Preuve (étapes) :** (calcul de la variance, cf. Exercice 1 Q4 : $\mathrm{Var}=\frac{(n+1)^2}{n^2}\cdot\frac{n\theta^2}{n+2}-\theta^2=\frac{\theta^2}{n(n+2)}$.)
**Méthodes mobilisées :** vérification des hypothèses d'un théorème avant de l'appliquer.
**Pièges / erreurs classiques :** classique piège d'examen (question courte 9) : « Vrai ou faux : contredit Cramér-Rao » → **faux**.

### Définition 1.10 — Efficacité
**Source :** Poly ch.3, Définition 1.10, p. 26–27
**Hypothèses :** modèle régulier $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$, $g:\Theta\to\mathbb{R}$ dérivable, $T$ estimateur **sans biais et régulier** de $g(\theta)$.
**Énoncé :** $T$ est **efficace** si sa variance atteint la borne de Cramér-Rao :
$$\mathrm{Var}_\theta(T(Z))=\big(\nabla_\theta g(\theta)\big)^\top\mathbb{I}(\theta)^{-1}\nabla_\theta g(\theta)\qquad\text{pour tout }\theta\in\Theta.$$
**Preuve (étapes) :** définition. Conséquence : un estimateur efficace est **E.S.B.V.M.** (Déf. 1.5) — sa variance minore, par le théorème, celle de tout autre estimateur sans biais **régulier**.
**Intuition :** la borne est la « bonne constante » quand elle est atteinte.
**Pièges / erreurs classiques :** la **réciproque est fausse** en général : un estimateur peut être de variance minimale sans atteindre la borne. L'égalité doit valoir **pour tout $\theta$**.

### Exemple 1.17 — Fréquence empirique dans le modèle de Bernoulli
**Source :** Poly ch.3, Exemple 1.17, p. 27
**Hypothèses :** $n$-échantillon de Bernoulli sur $\Theta=]0,1[$.
**Énoncé :** $\mathbb{I}(\theta)=n/(\theta(1-\theta))$ (Ex. 1.15) ⇒ borne de Cramér-Rao pour l'estimation sans biais de $\theta$ : $\theta(1-\theta)/n$. Elle est atteinte :
$$\mathrm{Var}_\theta(\bar X_n)=\frac{\mathrm{Var}_\theta(X_1)}{n}=\frac{\theta(1-\theta)}{n}.$$
$\bar X_n$ est **efficace**, donc **E.S.B.V.M.**
**Méthodes mobilisées :** calcul de l'information (dérivée seconde), additivité, comparaison variance/borne.

### Exemple 1.18 — Le maximum de vraisemblance du modèle de Poisson est efficace
**Source :** Poly ch.3, Exemple 1.18, p. 27
**Hypothèses :** $\mathcal{M}^n=\{\mathcal{P}\mathrm{oi}(\theta)^{\otimes n},\ \theta\in\Theta:=\mathbb{R}_+^*\}$.
**Énoncé (étapes) :**
1. $\mathbb{I}(\mathcal{M},\theta)=1/\theta$ (Ex. 1.14).
2. Additivité : $\mathbb{I}(\mathcal{M}^n,\theta)=n/\theta$.
3. EMV : $\hat\theta_n=\bar X_n$ (ch.2).
4. Sans biais : $\mathbb{E}_\theta[\bar X_n]=\theta$.
5. $\mathrm{Var}_\theta(\hat\theta_n)=\theta/n=1/\mathbb{I}(\mathcal{M}^n,\theta)$.

L'EMV est **efficace**.
**Méthodes mobilisées :** information de Fisher + additivité, EMV, biais, comparaison à la borne.

### Exemple 1.19 — Moyenne empirique dans le modèle gaussien
**Source :** Poly ch.3, Exemple 1.19, p. 27
**Hypothèses :** $n$-échantillon de $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\theta,\sigma_0^2),\ \theta\in\mathbb{R}\}\big)$, $\sigma_0^2>0$ **connue**.
**Énoncé :**
$$\ell_1(\theta,x)=-\frac{(x-\theta)^2}{2\sigma_0^2}-\log\sqrt{2\pi\sigma_0^2},\qquad\partial_\theta\ell_1(\theta,x)=\frac{x-\theta}{\sigma_0^2},\qquad\partial_\theta^2\ell_1(\theta,x)=-\frac{1}{\sigma_0^2},$$
donc $\mathbb{I}_1(\theta)=1/\sigma_0^2$ et $\mathbb{I}(\theta)=n/\sigma_0^2$. $\bar X_n$ (sans biais) a pour variance $\sigma_0^2/n=\mathbb{I}(\theta)^{-1}$ : **efficace**.
**Méthodes mobilisées :** information par la dérivée seconde (constante), additivité.
**Intuition :** dérivée seconde constante ⇒ information indépendante de $\theta$.

### Remarque (après Ex. 1.19, non numérotée) — Existence d'un estimateur efficace et efficacité asymptotique
**Source :** Poly ch.3, p. 27
**Énoncé :** l'existence d'un estimateur efficace n'est **pas garantie** : elle caractérise les **familles exponentielles** (compléments, Th. 4.1). Au chapitre sur le comportement asymptotique, on verra que l'EMV est **asymptotiquement efficace** sous des hypothèses générales (sa variance approche la borne quand $n$ grandit), même quand aucun estimateur ne l'atteint à $n$ fixé.

### Remarque (§1.12) — Programme des exercices
**Source :** Poly ch.3, §1.12, p. 27–28
**Énoncé :** tableau :

| Exercice | Notions du cours | Rappels |
|---|---|---|
| Exo 1 – Modèle uniforme | biais, risque quadratique, admissibilité | statistiques d'ordre, loi de $X_{n:n}$ |
| Exo 2 – Régression linéaire gaussienne | information de Fisher matricielle, efficacité | vecteurs gaussiens, th. de Cochran |
| Exo 3 – Cramér-Rao sans régularité | borne de type covariance | Cauchy-Schwarz, passage à la limite |

Bonus : Exercice 4 (estimateurs linéaires en translation, généralise l'Ex. 1.11 sans contrainte de biais), Exercice 5 (statistiques d'ordre exponentielles). L'Exercice 3 établit $\mathrm{Var}_\theta(T)\ge\mathrm{Cov}_\theta(T,\Psi)^2/\mathrm{Var}_\theta(\Psi)$ pour toute $\Psi$ de carré intégrable.
Notions de probabilités à revoir : espérance, variance, covariance, Cauchy-Schwarz, dérivation sous l'intégrale, matrices symétriques positives, statistiques d'ordre, vecteurs gaussiens et loi du $\chi^2$.
**Pièges :** le texte du §1.12 (et l'« Objectif » de l'Exercice 1) affirme qu'on y montre qu'« aucun estimateur sans biais de la forme $n^{-1}\sum_iT(X_i)$ n'existe », alors que le corrigé de l'Exercice 1 Q2 en **construit** un ($T(x)=g(x)+xg'(x)$) — incohérence interne du poly, se fier au corrigé.

---

## 3. Outils mathématiques

### Proposition 2.1 — Inégalité de Cauchy-Schwarz
**Source :** Poly ch.3, Outils, Proposition 2.1, p. 29
**Hypothèses :** $U,V$ v.a. réelles de carré intégrable sur un même espace probabilisé.
**Énoncé :** $UV$ est intégrable et
$$\big(\mathbb{E}[UV]\big)^2\le\mathbb{E}[U^2]\,\mathbb{E}[V^2].$$
Égalité **ssi** il existe $(\alpha,\beta)\ne(0,0)$ tel que $\alpha U+\beta V=0$ p.s.
**Preuve (étapes) :**
1. Intégrabilité : $\lvert UV\rvert\le(U^2+V^2)/2$.
2. Si $\mathbb{E}[V^2]=0$ : $V=0$ p.s., les deux membres sont nuls, $(\alpha,\beta)=(0,1)$ convient.
3. Sinon, $\varphi(t):=\mathbb{E}[(U+tV)^2]=\mathbb{E}[U^2]+2t\,\mathbb{E}[UV]+t^2\mathbb{E}[V^2]\ge0$ pour tout $t$ : trinôme de coefficient dominant $>0$ ⇒ discriminant $4(\mathbb{E}[UV])^2-4\mathbb{E}[U^2]\mathbb{E}[V^2]\le0$.
4. Égalité ⇔ discriminant nul ⇔ $\exists t_0$, $\varphi(t_0)=0$ ⇔ $U+t_0V=0$ p.s.
**Intuition :** c'est elle qui transforme une identité en inégalité dans Cramér-Rao ; appliquée à $U=T(Z)-g(\theta)$, $V=\nabla_\theta\ell(\theta,Z)^\top u$ sous $\mathbb{P}_\theta$. Le **cas d'égalité** (colinéarité p.s.) caractérise les estimateurs efficaces (compléments, Th. 4.1). Sert aussi pour l'Ex. 1.11 et les Exercices 3–4.
**Pièges / erreurs classiques :** version « covariance » : $\mathrm{Cov}(U,V)^2\le\mathrm{Var}(U)\mathrm{Var}(V)$ (appliquer aux variables centrées).

### Proposition 2.2 — Dérivation sous le signe intégral
**Source :** Poly ch.3, Outils, Proposition 2.2, p. 29–30
**Hypothèses :** $(E,\mathcal{E},\mu)$ espace mesuré, $I$ intervalle ouvert de $\mathbb{R}$, $\{f(t,\cdot),\ t\in I\}$ famille de fonctions $\mu$-intégrables, $\phi(t):=\int f(t,x)\,\mu(\mathrm{d}x)$. Il existe $A\in\mathcal{E}$ et $h$ $\mu$-intégrable tels que :
- (i) $\mu(A^c)=0$ ;
- (ii) pour tout $x\in A$, $t\mapsto f(t,x)$ est dérivable sur $I$ ;
- (iii) pour tout $x\in A$ et $t\in I$, $\big\lvert\frac{\partial f}{\partial t}(t,x)\big\rvert\le h(x)$.
**Énoncé :** $\phi$ est dérivable sur $I$ et $\phi'(t)=\int\frac{\partial f}{\partial t}(t,x)\,\mu(\mathrm{d}x)$ pour tout $t\in I$.
**Preuve (étapes) :**
1. Comme $\mu(A^c)=0$ : $\frac{\phi(t+h)-\phi(t)}{h}=\int_A\frac{f(t+h,x)-f(t,x)}{h}\,\mu(\mathrm{d}x)$.
2. **Accroissements finis** : $\lvert f(t+h,x)-f(t,x)\rvert/\lvert h\rvert=\lvert\partial_tf(s,x)\rvert\le h(x)$ ($s$ entre $t$ et $t+h$), majorant indépendant de $h$.
3. Convergence ponctuelle du taux d'accroissement vers $\partial_tf(t,x)$ (dérivabilité).
4. **Convergence dominée** ⇒ conclusion.
(Le poly la dit démontrée dans l'annexe de théorie de la mesure ; la preuve ci-dessus est celle donnée p. 30.)
**Intuition :** trois usages dans le chapitre : domination de $\lVert\nabla_\theta p_\theta(z)\rVert$ (score centré), de $\lVert\mathrm{H}_p(\theta,z)\rVert$ (information par la hessienne), de $\lvert T(z)\rvert\lVert\nabla_\theta p_\theta(z)\rVert$ (régularité d'un estimateur). C'est l'unique raison des dominations locales (iii) de la Déf. 1.6.
**Pièges / erreurs classiques :** NB : le poly utilise la même lettre $h$ pour le pas et pour la fonction dominante.

### Définition (non numérotée, Outils) — Matrice hessienne, norme de Frobenius, matrices symétriques positives
**Source :** Poly ch.3, Outils, p. 30
**Hypothèses :** vecteurs = vecteurs **colonne** ; $u^\top$ transposé. $F:\Theta\times\mathsf{Z}\to\mathbb{R}$, $\theta\mapsto F(\theta,z)$ deux fois dérivable sur $\Theta\subseteq\mathbb{R}^d$ ouvert.
**Énoncé :**
- gradient $\nabla_\theta F(\theta,z)$ ; hessienne $\mathrm{H}_F(\theta,z):=\Big[\frac{\partial^2F}{\partial\theta^{(i)}\partial\theta^{(j)}}(\theta,z)\Big]_{1\le i,j\le d}$, **symétrique** si les dérivées secondes sont continues ;
- norme de Frobenius de $A=(a_{ij})\in\mathrm{Mat}_d(\mathbb{R})$ : $\lVert A\rVert^2:=\mathrm{Tr}(A^\top A)=\sum_{i=1}^d\sum_{j=1}^da_{ij}^2$ ;
- identité : pour tout $a\in\mathbb{R}^d$, $\lVert aa^\top\rVert=\big(\mathrm{Tr}(aa^\top aa^\top)\big)^{1/2}=\big(\mathrm{Tr}(a^\top a\,a^\top a)\big)^{1/2}=\lVert a\rVert^2$ (utilisée dans la preuve de la Prop. 1.2 et du Lemme 2.1) ;
- $A$ symétrique est **positive** ($A\ge0$) si $u^\top Au\ge0$ pour tout $u\in\mathbb{R}^d$, **définie positive** si $>0$ pour $u\ne0$ ; $A\ge B$ ssi $A-B\ge0$ — **ordre partiel** sur les matrices symétriques (sens de $\mathrm{Var}_\theta(T(Z))\ge\mathbb{I}(\theta)^{-1}$, Cor. 1.2). Une matrice symétrique définie positive est inversible, d'inverse définie positive.
**Preuve (étapes) :** identité $\lVert aa^\top\rVert=\lVert a\rVert^2$ : $\mathrm{Tr}$ cyclique et $a^\top a=\lVert a\rVert^2$ scalaire.

### Proposition 2.3 — Décomposition biais-variance vectorielle
**Source :** Poly ch.3, Outils, Proposition 2.3, p. 30–31
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$, $g:\Theta\to\mathbb{R}^p$ mesurable, $T$ estimateur de $g$ avec $\mathbb{E}_\theta[\lVert T(Z)\rVert_2^2]<\infty$ pour tout $\theta$.
**Énoncé :** la matrice $p\times p$
$$\mathbb{E}_\theta\big[(T(Z)-g(\theta))(T(Z)-g(\theta))^\top\big]\tag{12}$$
(terme $(i,j)$ : $\mathbb{E}_\theta[(T_i(Z)-g_i(\theta))(T_j(Z)-g_j(\theta))]$ ; risque quadratique si $p=1$ ; covariance si sans biais) vérifie, pour tout $\theta$,
$$\mathbb{E}_\theta\big[(T(Z)-g(\theta))(T(Z)-g(\theta))^\top\big]=\mathrm{Var}_\theta(T(Z))+\big(\mathbb{E}_\theta[T(Z)]-g(\theta)\big)\big(\mathbb{E}_\theta[T(Z)]-g(\theta)\big)^\top,\tag{13}$$
où $\mathrm{Var}_\theta(T(Z))\in\mathrm{Mat}_p(\mathbb{R})$ est la matrice de covariance.
**Preuve (étapes) :**
1. Écrire $T(Z)-g(\theta)=\big(T(Z)-\mathbb{E}_\theta[T(Z)]\big)+\big(\mathbb{E}_\theta[T(Z)]-g(\theta)\big)$.
2. Développer le produit $(\cdot)(\cdot)^\top$ en quatre termes.
3. Espérance : 1ᵉʳ terme → covariance ; 2ᵉ déterministe → terme de biais ; les deux termes croisés sont d'espérance nulle car $\mathbb{E}_\theta[T(Z)-\mathbb{E}_\theta[T(Z)]]=0$ (le facteur de biais est déterministe).
**Corollaire (trace)** : avec $\mathrm{Tr}(aa^\top)=\lVert a\rVert^2$,
$$\mathbb{E}_\theta\big[\lVert T(Z)-g(\theta)\rVert_2^2\big]=\mathbb{E}_\theta\big[\lVert T(Z)-\mathbb{E}_\theta[T(Z)]\rVert_2^2\big]+\lVert\mathbb{E}_\theta[T(Z)]-g(\theta)\rVert_2^2,$$
qui redonne la Prop. 1.1 pour $p=1$.
**Intuition :** même décomposition qu'en scalaire, avec des produits extérieurs.

### Lemme 2.1 — L'information de Fisher est bien définie
**Source :** Poly ch.3, Outils, Lemme 2.1, p. 31–32
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$ modèle régulier.
**Énoncé :** $\mathbb{I}(\theta):=\mathbb{E}_\theta[\nabla_\theta\ell(\theta,Z)\nabla_\theta\ell(\theta,Z)^\top]$ est bien définie, à coefficients finis, et **ne dépend pas du choix de la mesure de domination**.
**Preuve (étapes) :**
1. *Finitude* : par $\lVert aa^\top\rVert=\lVert a\rVert^2$ et (iii)–(3)–(4) de la Déf. 1.6, pour tout $\theta_0$,
$$\mathbb{E}_{\theta_0}\Big[\big\lVert\nabla_\theta\ell(\theta_0,Z)\,\nabla_\theta\ell(\theta_0,Z)^\top\big\rVert\Big]=\mathbb{E}_{\theta_0}\big[\lVert\nabla_\theta\ell(\theta_0,Z)\rVert^2\big]\le\int_{\mathsf{Z}}h_1(z)h_0(z)\,\mu(\mathrm{d}z)<\infty,$$
donc l'intégrale (5) est bien définie (intégrabilité de chaque coefficient, majoré par la norme de Frobenius).
2. *Indépendance vis-à-vis de $\mu$* : soit $\nu$ une autre mesure dominante, $\mathbb{P}_\theta=q_\theta\cdot\nu$ ; poser $\lambda:=\mu+\nu$.
3. **Radon-Nikodym** (ch.1, Th. 2.1) : il existe $r\ge0$ mesurable **indépendante de $\theta$** avec $p_\theta(z)=r(z)q_\theta(z)$ pour $\lambda$-p.t. $z$.
4. Log puis gradient en $\theta$ : $\nabla_\theta\log p_\theta(z)=\nabla_\theta\log q_\theta(z)$ ($\log r$ ne dépend pas de $\theta$) ; on substitue dans (5).
**Intuition :** changer de mesure dominante multiplie la densité par un facteur indépendant de $\theta$, qui disparaît en dérivant le log.

### Remarque (Outils) — Résultats des chapitres 1 et 2 utilisés
**Source :** Poly ch.3, Outils, p. 32
**Énoncé :** utilisés sans être redémontrés : estimateur ponctuel / statistique (ch.2, ch.1 §1.5) ; densité d'un $n$-échantillon (ch.1 §1.7 — log-vraisemblance = somme ⇒ additivité de l'information) ; modèle dominé et Radon-Nikodym (ch.1 — non-unicité de la mesure dominante ⇒ Lemme 2.1) ; statistiques d'ordre (ch.1 §1.5 — loi de $X_{n:n}$, médiane) ; loi du $\chi^2$, Cochran, Gosset (ch.1 — Ex. 1.8, Exercice 2) ; vraisemblance, log-vraisemblance, EMV (ch.2 §1.3) ; divergence de Kullback-Leibler (ch.2 §1.4 — positivité, annulation en $\theta^\star$, courbure = information).

---

## 4. Exercices du poly

> Corrigés : **intégrés au poly** (§3.4, p. 38–43), « reprenant en les complétant et corrigeant ceux distribués avec la feuille de PC de 2023 ». Les réponses aux **questions courtes** ne sont **pas** données dans le poly : celles ci-dessous sont déduites du cours (signalé).

### 4.1 Questions courtes (Poly ch.3, §3.1, p. 33)

1. *Définition du biais. Un estimateur sans biais peut-il avoir un risque quadratique plus grand qu'un estimateur biaisé ?* (Déf. 1.1, Prop. 1.1) — **Réponse (déduite du cours)** : $b(\theta,T)=\mathbb{E}_\theta[T(Z)]-g(\theta)$ ; **oui** : Ex. 1.8 ($R(\theta,S_n^2)>R(\theta,\hat\sigma_n^2)$) et Ex. 1.9.
2. *Vrai ou faux : le risque d'un estimateur, pour une perte donnée, est un nombre réel.* (Déf. 1.2, 1.3) — **Faux** : c'est une **fonction** de $\theta$.
3. *Qu'est-ce qu'un estimateur admissible ? Est-il nécessairement bon ?* (Déf. 1.4, Ex. 1.10) — Aucun autre ne le domine (partout $\le$, quelque part $<$) ; **non** : l'estimateur constant est admissible.
4. *Le modèle uniforme sur $[0,\theta]$ est-il régulier ? Citer un modèle qui l'est.* (Déf. 1.6, Ex. 1.12) — **Non** ($\theta\mapsto p_\theta(x)$ discontinue en $\theta=x$) ; régulier : exponentiel, gaussien, Bernoulli sur $]0,1[$, Poisson, géométrique.
5. *Définir le score ; son espérance ; rôle dans Cramér-Rao.* (Déf. 1.7, Prop. 1.2) — $S(\theta,z)=\nabla_\theta\log p_\theta(z)$ ; $\mathbb{E}_\theta[S]=0$ ; permet de remplacer $\mathbb{E}_\theta[T\,S]$ par $\mathbb{E}_\theta[(T-g(\theta))S]$ (étape 2 de la preuve), et d'identifier $\mathbb{E}_\theta[SS^\top]$ à une covariance.
6. *L'information de Fisher : caractéristique du paramètre ou du modèle ? Comportement pour un $n$-échantillon ?* (Déf. 1.8, Prop. 1.2 (iii)) — Du **modèle** ($\mathbb{I}(\mathcal{M},\theta)$) ; $\mathbb{I}_{\mathcal{M}^n}=n\,\mathbb{I}_{\mathcal{M}}$.
7. *Énoncer Cramér-Rao scalaire ; hypothèses sur le modèle / sur l'estimateur.* (Th. 1.1, Déf. 1.6, 1.9) — $\mathrm{Var}_\theta(T)\ge\{g'(\theta)\}^2/\mathbb{I}(\theta)$ ; modèle **régulier** (Déf. 1.6) ; estimateur **sans biais et régulier** (Déf. 1.9), $g$ dérivable.
8. *Estimateur efficace ? Un E.S.B.V.M. est-il nécessairement efficace ?* (Déf. 1.10) — Atteint la borne pour tout $\theta$ ; **non**, la réciproque est fausse en général.
9. *Vrai ou faux : en uniforme, un estimateur sans biais de variance en $n^{-2}$ contredit Cramér-Rao.* (Ex. 1.16) — **Faux** : le modèle n'est pas régulier, la borne ne s'applique pas.

### Exercice 1 — Modèle uniforme (⋆⋆)
**Source :** Poly ch.3, §3.2, Exercice 1, p. 33–34 ; corrigé p. 38–39.
**Objectif (poly) :** reprend et prolonge l'Ex. 1.9 ; biais, risque quadratique, admissibilité.
**Énoncé complet :** Soit $Z=(X_1,\dots,X_n)$ un $n$-échantillon du modèle $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{U}([0,\theta]),\ \theta\in\Theta:=\mathbb{R}_+^*\}\big)$.
1. Calculer l'estimateur du maximum de vraisemblance de $\theta$.

Soit $g:\mathbb{R}_+^*\to\mathbb{R}$ différentiable vérifiant $\lim_{\theta\to0^+}\theta g(\theta)=0$.

2. Peut-on choisir $T:\mathbb{R}_+\to\mathbb{R}$ de telle sorte que $\hat\theta_n^{(1)}:=n^{-1}\sum_{i=1}^nT(X_i)$ soit un estimateur sans biais de $g:\theta\mapsto g(\theta)$ ?
3. On pose $X_{n:n}:=\max(X_1,\dots,X_n)$. Montrer qu'on peut choisir $\tilde T:\mathbb{R}_+\to\mathbb{R}$ de sorte que $\hat\theta_n^{(2)}:=\tilde T(X_{n:n})$ soit un estimateur sans biais de $g$.

Dans la suite, $g(\theta)=\theta$.

4. Comparer le risque quadratique de $\hat\theta_n^{(1)}$ et $\hat\theta_n^{(2)}$. Montrer que $\hat\theta_n^{(1)}$ est inadmissible pour $n>1$ (figure 1).
5. Pour $a>0$, calculer le risque quadratique de $\hat\theta_{n,a}^{(3)}:=aX_{n:n}$. Montrer que $\hat\theta_n^{(2)}$ est inadmissible (figure 1).

*Figure 1 : [gauche] $\theta\mapsto\mathbb{E}_\theta[(\hat\theta_n^{(i)}-\theta)^2]$ pour $n=20$ ; [droite] $i=2,3$ pour $n=5$, avec $a=1$ et $a=a_\star$.*

**Corrigé complet :**
1. Vraisemblance : $L_n(\vartheta)=\vartheta^{-n}\prod_{i=1}^n\mathbb{1}_{[0,\vartheta]}(X_i)=\vartheta^{-n}\mathbb{1}_{X_{n:n}\le\vartheta}$, nulle sur $[0,X_{n:n}[$, strictement décroissante sur $[X_{n:n},+\infty[$, continue à gauche en $X_{n:n}$ : maximum atteint en $\vartheta=X_{n:n}$ seulement, $\hat\theta_n^{\mathrm{MV}}:=X_{n:n}$.
2. On veut $\mathbb{E}_\theta[T(X_1)]=g(\theta)$ pour tout $\theta>0$ (puisque $\mathbb{E}_\theta[\hat\theta_n^{(1)}]=\mathbb{E}_\theta[T(X_1)]$), i.e. $\theta^{-1}\int_0^\theta T(x)\,\mathrm{d}x=g(\theta)$. Donc $\theta\mapsto\theta g(\theta)$ doit être une primitive de $T$ s'annulant en $0$ (licite car $\lim_{0^+}\theta g(\theta)=0$), d'où
$$T(x)=\big(x\,g(x)\big)'=g(x)+x\,g'(x),$$
et ce choix donne bien $\mathbb{E}_\theta[\hat\theta_n^{(1)}]=g(\theta)$ : **oui**.
3. $\mathbb{P}_\theta(X_{n:n}\le x)=(x/\theta)^n$ (indépendance, même loi) ⇒ densité $\mathbb{1}_{[0,\theta]}(x)\,nx^{n-1}/\theta^n$. On veut $n\theta^{-n}\int_0^\theta\tilde T(x)x^{n-1}\,\mathrm{d}x=g(\theta)$ : $\theta\mapsto\theta^ng(\theta)/n$ est une primitive de $x\mapsto\tilde T(x)x^{n-1}$ s'annulant en $0$, d'où
$$\tilde T(x)=\frac{1}{x^{n-1}}\Big(\frac{x^ng(x)}{n}\Big)'=g(x)+\frac{x}{n}g'(x).$$
4. $g(x)=x$ ⇒ $T(x)=2x$, $\hat\theta_n^{(1)}=\frac2n\sum_{k=1}^nX_k$. $\mathbb{E}_\theta[X_1]=\theta/2$, $\mathbb{E}_\theta[X_1^2]=\theta^{-1}\int_0^\theta x^2\,\mathrm{d}x=\theta^2/3$, $\mathrm{Var}_\theta(X_1)=\theta^2/12$ ;
$$R(\theta,\hat\theta_n^{(1)})=n^{-1}\mathrm{Var}_\theta(2X_1)=\frac4n\cdot\frac{\theta^2}{12}=\frac{\theta^2}{3n}.$$
$\tilde T(x)=(1+1/n)x$ ⇒ $\hat\theta_n^{(2)}=\frac{n+1}{n}X_{n:n}=T_n^{(1)}$ (Ex. 1.9), $R(\theta,\hat\theta_n^{(2)})=\frac{\theta^2}{n(n+2)}$. Comme $n(n+2)>3n$ dès que $n>1$ :
$$R(\theta,\hat\theta_n^{(2)})=\frac{\theta^2}{n(n+2)}<\frac{\theta^2}{3n}=R(\theta,\hat\theta_n^{(1)})\quad\text{pour tout }\theta>0,$$
donc $\hat\theta_n^{(1)}$ est **inadmissible** pour $n>1$ (Déf. 1.4).
5. Avec $\mathbb{E}_\theta[X_{n:n}]=n\theta/(n+1)$, $\mathbb{E}_\theta[X_{n:n}^2]=n\theta^2/(n+2)$ :
$$R(\theta,\hat\theta_{n,a}^{(3)})=a^2\mathbb{E}_\theta[X_{n:n}^2]-2a\theta\,\mathbb{E}_\theta[X_{n:n}]+\theta^2=\Big\{\frac{na^2}{n+2}-\frac{2an}{n+1}+1\Big\}\theta^2.$$
Trinôme en $a$ de coefficient dominant $n/(n+2)>0$, minimal en $a_\star:=(n+2)/(n+1)$ quel que soit $\theta$ ; $R(\theta,\hat\theta_{n,a_\star}^{(3)})=\frac{\theta^2}{(n+1)^2}$. Comme $(n+1)^2>n(n+2)$ pour tout $n\ge1$ : $R(\theta,\hat\theta_{n,a_\star}^{(3)})<R(\theta,\hat\theta_n^{(2)})$ pour tout $\theta>0$ ⇒ $\hat\theta_n^{(2)}$ **inadmissible** (et, par transitivité, $\hat\theta_n^{(1)}$ aussi).

**Méthodes mobilisées :** EMV par étude directe de la vraisemblance (non dérivable : support dépendant de $\theta$) ; construction d'estimateurs sans biais par **identification d'une primitive** (équation intégrale $\int_0^\theta T=\theta g(\theta)$) ; loi du maximum par la fonction de répartition (**indépendance**) ; moments d'une uniforme ; décomposition biais-variance / calcul direct du risque ; minimisation d'un **trinôme** ; définition d'**inadmissibilité** (domination stricte uniforme).
**Pièges :** le maximum d'une vraisemblance non continue ne s'obtient pas par annulation du score ; le risque de $\hat\theta_n^{(1)}$ décroît en $n^{-1}$, ceux fondés sur $X_{n:n}$ en $n^{-2}$. Voir l'incohérence signalée en §1.12 sur la Q2 (la réponse est **oui**).

### Exercice 2 — Régression linéaire gaussienne (⋆⋆)
**Source :** Poly ch.3, §3.2, Exercice 2, p. 34 ; corrigé p. 39–40.
**Objectif (poly) :** poursuit l'Exercice 1 (PC2) ; seul endroit du cours où l'information de Fisher est une matrice $2\times2$.
**Énoncé complet :** Soient $x_1,\dots,x_n$ réels tels que $x_i\ne x_j$ pour au moins deux indices $i\ne j$. Modèle
$$\Big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\Big\{\bigotimes_{i=1}^n\mathcal{N}(\beta_1+\beta_2x_i,\sigma^2),\ (\beta_1,\beta_2)\in\mathbb{R}^2\Big\}\Big),$$
$\sigma^2>0$ **connu**. Notations : $\mathbf{Y}:=(Y_1,\dots,Y_n)^\top$, $\mathbf{X}:=[\mathbf{1}\ \mathbf{x}]$ avec $\mathbf{1}:=(1,\dots,1)^\top$, $\mathbf{x}:=(x_1,\dots,x_n)^\top$, $\beta:=(\beta_1,\beta_2)^\top$.
1. Déterminer la matrice d'information de Fisher $\mathbb{I}(\beta_1,\beta_2)$.
2. Borne inférieure sur la variance d'un estimateur (régulier) sans biais de $\beta_1$.
3. On suppose $\beta_2$ connu. Borne inférieure sur la variance d'un estimateur (régulier) sans biais de $\beta_1$.
4. Borne inférieure sur la variance d'un estimateur (régulier) sans biais de $\beta_1\beta_2$.

**Corrigé complet :**
*Préliminaire (repris de PC2)* : sous $\mathbb{P}_\beta$, $\mathbf{Y}\sim\mathcal{N}(\mathbf{X}\beta,\sigma^2\mathrm{I}_n)$, et
$$\mathbf{X}^\top\mathbf{X}=n\begin{pmatrix}1&\bar x\\ \bar x&n^{-1}\sum_{i=1}^nx_i^2\end{pmatrix},\qquad\det=n\sum_{i=1}^n(x_i-\bar x)^2>0,$$
$$(\mathbf{X}^\top\mathbf{X})^{-1}=\frac{1}{n\sum_{i=1}^n(x_i-\bar x)^2}\begin{pmatrix}\sum_{i=1}^nx_i^2&-\sum_{i=1}^nx_i\\-\sum_{i=1}^nx_i&n\end{pmatrix}.$$
Paramètre $\beta=(\beta_1,\beta_2)$, variable de la log-vraisemblance $b=(b_1,b_2)$.
1. Pour $\mathbf{y}\in\mathbb{R}^n$ :
$$\ell_n(b;\mathbf{y})=-\frac n2\log(2\pi\sigma^2)-\frac{1}{2\sigma^2}\lVert\mathbf{y}-\mathbf{X}b\rVert^2,\qquad\nabla_b\ell_n(b;\mathbf{y})=\frac{1}{\sigma^2}\mathbf{X}^\top(\mathbf{y}-\mathbf{X}b).$$
Comme $\mathbb{E}_\beta[(\mathbf{Y}-\mathbf{X}\beta)(\mathbf{Y}-\mathbf{X}\beta)^\top]=\sigma^2\mathrm{I}_n$ :
$$\mathbb{I}(\beta_1,\beta_2)=\mathbb{E}_\beta\big[\nabla_b\ell_n(\beta;\mathbf{Y})\nabla_b\ell_n(\beta;\mathbf{Y})^\top\big]=\frac{1}{\sigma^4}\mathbf{X}^\top\mathbb{E}_\beta\big[(\mathbf{Y}-\mathbf{X}\beta)(\mathbf{Y}-\mathbf{X}\beta)^\top\big]\mathbf{X}=\frac{1}{\sigma^2}\mathbf{X}^\top\mathbf{X},$$
inversible (deux $x_i$ distincts).
2. $g(\beta)=\beta_1$, $\nabla_\beta g(\beta)=(1,0)^\top$. Modèle régulier (vérification « comme pour le modèle gaussien ») ⇒ Th. 1.1 : pour tout estimateur sans biais et régulier de $\beta_1$,
$$\mathrm{Var}\ \ge\ \nabla_\beta g(\beta)^\top\mathbb{I}(\beta)^{-1}\nabla_\beta g(\beta)=\sigma^2\big[(\mathbf{X}^\top\mathbf{X})^{-1}\big]_{11}=\frac{\sigma^2}{n}\cdot\frac{\sum_{i=1}^nx_i^2}{\sum_{i=1}^n(x_i-\bar x)^2}.$$
3. $\beta_2$ connu : $\tilde\ell_n(\beta_1;\mathbf{y})=-\frac n2\log(2\pi\sigma^2)-\frac{1}{2\sigma^2}\sum_{i=1}^n(y_i-\beta_1-\beta_2x_i)^2$, $\frac{\partial^2\tilde\ell_n}{\partial\beta_1^2}(\beta_1;\mathbf{y})=-\frac{n}{\sigma^2}$, d'où $\tilde{\mathbb{I}}(\beta_1)=n/\sigma^2$ et la borne $\sigma^2/n$. Elle est $\le$ celle de Q2 car $\sum x_i^2\ge\sum(x_i-\bar x)^2$ (écart $n\bar x^2\ge0$), égalité ssi $\bar x=0$ — cas où (PC2, Q4) $\hat\beta_1$ et $\hat\beta_2$ sont indépendants. Connaître $\beta_2$ ne peut qu'aider ; le gain est d'autant plus faible que $\bar x$ est proche de $0$ (coefficients peu corrélés).
4. $g(\beta)=\beta_1\beta_2$, $\nabla_\beta g(\beta)=(\beta_2,\beta_1)^\top$ :
$$\nabla_\beta g(\beta)^\top\mathbb{I}(\beta)^{-1}\nabla_\beta g(\beta)=\frac{\sigma^2}{n\sum_{i=1}^n(x_i-\bar x)^2}\Big(\beta_2^2\sum_{i=1}^nx_i^2-2\beta_1\beta_2\sum_{i=1}^nx_i+n\beta_1^2\Big),$$
qui minore la variance de tout estimateur sans biais et régulier de $\beta_1\beta_2$.

**Méthodes mobilisées :** log-vraisemblance d'un **vecteur gaussien**, score vectoriel, information = covariance du score (ou $-\mathbb{E}[\mathrm{H}]$ : la hessienne vaut $-\mathbf{X}^\top\mathbf{X}/\sigma^2$, constante), **inversion d'une matrice $2\times2$**, **Cramér-Rao vectoriel** avec $g$ linéaire puis non linéaire (forme $\nabla g^\top\mathbb{I}^{-1}\nabla g$), comparaison sous-modèle (paramètre de nuisance connu).
**Pièges :** pour $\beta_1$ dans le modèle complet, la borne est $[\mathbb{I}^{-1}]_{11}$ et **non** $1/\mathbb{I}_{11}$ ($=\sigma^2/n$, qui est la borne quand $\beta_2$ est connu). L'énoncé « Rappels : th. de Cochran » (tableau §1.12) concerne l'efficacité de l'estimateur des moindres carrés, non traitée explicitement dans ce corrigé.

### Exercice 3 — Cramér-Rao sans régularité (⋆⋆⋆)
**Source :** Poly ch.3, §3.2, Exercice 3, p. 34–35 ; corrigé p. 40–41.
**Objectif (poly) :** borne de type covariance (Hammersley–Chapman–Robbins, nom non cité par le poly) sans hypothèse de régularité ; Cramér-Rao comme cas limite ; application au modèle uniforme.
**Énoncé complet :** Soit $\Theta\subset\mathbb{R}$ et $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu,\ \theta\in\Theta\})$ un modèle dominé. Soit $T$ un estimateur sans biais de $g:\Theta\to\mathbb{R}$ tel que $\mathbb{E}_\theta[T^2(Z)]<\infty$ pour tout $\theta$.
1. Montrer que pour toute $\Psi:\mathsf{Z}\to\mathbb{R}$ mesurable avec $0<\mathrm{Var}_\theta(\Psi(Z))<\infty$ :
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\mathrm{Cov}_\theta(T(Z),\Psi(Z))^2}{\mathrm{Var}_\theta(\Psi(Z))}.$$

On fixe $\theta,\delta$ avec $\theta\in\Theta$, $\theta-\delta\in\Theta$, et on suppose $\{z:p_\theta(z)=0\}\subseteq\{z:p_{\theta-\delta}(z)=0\}$.

2. Pour
$$\Psi(z):=\begin{cases}\dfrac{p_{\theta-\delta}(z)}{p_\theta(z)}-1&\text{si }p_\theta(z)>0,\\[2mm]0&\text{sinon},\end{cases}$$
montrer que $\mathbb{E}_\theta[\Psi(Z)]=0$ et $\mathrm{Cov}_\theta(T(Z),\Psi(Z))=g(\theta-\delta)-g(\theta)$.
3. En déduire une borne sur les estimateurs sans biais de $g$.
4. Proposer des conditions sous lesquelles Cramér-Rao (Th. 1.1) se déduit par passage à la limite $\delta\to0$.

Maintenant $Z=(X_1,\dots,X_n)$ $n$-échantillon de $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{U}([0,\theta]),\ \theta\in\mathbb{R}_+^*\}\big)$ (non régulier, Ex. 1.12), $g(\theta)=\theta$.

5. Montrer que pour tout $\delta\in]0,\theta[$ et tout estimateur sans biais $T$ de $\theta$ :
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\delta^2}{\theta^n/(\theta-\delta)^n-1}.$$
6. Soit $0<c\le n$. En posant $\delta=c\theta/n$, montrer que la borne s'écrit $\theta^2\tau_n(c)/n^2$ avec $\lim_n\tau_n(c)$ existant. Conclure (figure 2).

*Figure 2 : [gauche] $c\mapsto\tau_n(c)$ pour différents $n$ et $c\mapsto\lim_n\tau_n(c)$ ; [droite] $c\mapsto n/\{(n+2)\tau_n(c)\}$, ratio de l'EQM de $\hat\theta_n^{(2)}$ (Exercice 1) et du minorant.*

**Corrigé complet :**
1. **Cauchy-Schwarz** (Prop. 2.1) aux variables centrées $T(Z)-\mathbb{E}_\theta[T(Z)]$ et $\Psi(Z)-\mathbb{E}_\theta[\Psi(Z)]$ :
$$\big\{\mathrm{Cov}_\theta(T(Z),\Psi(Z))\big\}^2=\Big(\mathbb{E}_\theta\big[(T(Z)-\mathbb{E}_\theta[T(Z)])(\Psi(Z)-\mathbb{E}_\theta[\Psi(Z)])\big]\Big)^2\le\mathrm{Var}_\theta(T(Z))\,\mathrm{Var}_\theta(\Psi(Z)),$$
puis diviser par $\mathrm{Var}_\theta(\Psi(Z))\in]0,\infty[$.
2. $A_\alpha:=\{z:p_\alpha(z)>0\}$ ; l'hypothèse s'écrit $A_{\theta-\delta}\subseteq A_\theta$, donc $p_{\theta-\delta}\mathbb{1}_{A_\theta}=p_{\theta-\delta}\mathbb{1}_{A_{\theta-\delta}}$. Alors
$$\mathbb{E}_\theta[\Psi(Z)]=\int\Big(\frac{p_{\theta-\delta}(z)}{p_\theta(z)}-1\Big)\mathbb{1}_{A_\theta}(z)p_\theta(z)\,\mu(\mathrm{d}z)=\int\big[p_{\theta-\delta}(z)-p_\theta(z)\big]\mathbb{1}_{A_\theta}(z)\,\mu(\mathrm{d}z)=\int p_{\theta-\delta}\mathbb{1}_{A_{\theta-\delta}}\,\mathrm{d}\mu-\int p_\theta\mathbb{1}_{A_\theta}\,\mathrm{d}\mu=1-1=0,$$
et de même (le centrage de $\Psi$ donne $\mathrm{Cov}=\mathbb{E}[T\Psi]$)
$$\mathrm{Cov}_\theta(T(Z),\Psi(Z))=\mathbb{E}_\theta[T(Z)\Psi(Z)]=\int T(z)\big[p_{\theta-\delta}(z)\mathbb{1}_{A_{\theta-\delta}}(z)-p_\theta(z)\mathbb{1}_{A_\theta}(z)\big]\mu(\mathrm{d}z)=g(\theta-\delta)-g(\theta),$$
car $T$ est sans biais sous $\mathbb{P}_{\theta-\delta}$ **et** sous $\mathbb{P}_\theta$.
3. En combinant ($\mathrm{Var}_\theta(\Psi)=\mathbb{E}_\theta[\Psi^2]$ car centrée) :
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\{g(\theta)-g(\theta-\delta)\}^2}{\displaystyle\int_{A_\theta}\Big(1-\frac{p_{\theta-\delta}(z)}{p_\theta(z)}\Big)^2p_\theta(z)\,\mu(\mathrm{d}z)}.$$
4. En divisant numérateur et dénominateur par $\delta^2$ :
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\Big\{\dfrac{g(\theta)-g(\theta-\delta)}{\delta}\Big\}^2}{\displaystyle\int_{A_\theta}\Big\{\frac{p_\theta(z)-p_{\theta-\delta}(z)}{\delta}\Big\}^2\frac{1}{p_\theta(z)}\,\mu(\mathrm{d}z)}.$$
Conditions suffisantes pour $\delta\to0^+$ : $\Theta$ **ouvert** ($\theta-\delta\in\Theta$ pour $\delta$ petit) ; $g$ **dérivable** en $\theta$ (numérateur → $g'(\theta)^2$) ; **permutation limite/intégrale** au dénominateur. Ce sont exactement les conditions de la Déf. 1.6 : la différentiabilité de $\theta\mapsto p_\theta(z)$ donne la limite ponctuelle $\{p_\theta(z)-p_{\theta-\delta}(z)\}/\delta\to\partial_\theta p_\theta(z)$, et les dominations permettent la **convergence dominée** (Prop. 2.2). On retrouve
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\{g'(\theta)\}^2}{\mathbb{I}(\theta)},\qquad\mathbb{I}(\theta)=\mathbb{E}_\theta\Big[\Big(\frac{\partial}{\partial\theta}\log p_\theta(Z)\Big)^2\Big]$$
(Cor. 1.1), car $\int(\partial_\theta p_\theta)^2/p_\theta\,\mathrm{d}\mu=\mathbb{E}_\theta[(\partial_\theta\log p_\theta)^2]$.
5. $z=(x_1,\dots,x_n)$, $\mu=\mathrm{Leb}^{\otimes n}$, $p_\theta(z)=\theta^{-n}\prod_{i=1}^n\mathbb{1}_{[0,\theta]}(x_i)$. Pour $\delta\in]0,\theta[$, $p_\theta(z)=0\Rightarrow p_{\theta-\delta}(z)=0$ : hypothèse vérifiée, $A_\theta=[0,\theta]^n$. Dénominateur :
$$\int_{A_\theta}\Big(\frac{p_{\theta-\delta}(z)}{p_\theta(z)}-1\Big)^2p_\theta(z)\,\mu(\mathrm{d}z)=\int_{A_\theta}\Big(\frac{p_{\theta-\delta}(z)}{p_\theta(z)}\Big)^2p_\theta(z)\,\mu(\mathrm{d}z)+1-2\int_{A_\theta}p_{\theta-\delta}(z)\,\mu(\mathrm{d}z)=\frac{1}{\theta^n}\int_{[0,\theta]^n}\big(\theta^np_{\theta-\delta}(z)\big)^2\mathrm{d}z-1=\frac{\theta^n}{(\theta-\delta)^n}-1,$$
puisque $\int_{A_\theta}p_{\theta-\delta}\,\mathrm{d}\mu=1$ (Q2) et $\theta^np_{\theta-\delta}(z)=\big(\theta/(\theta-\delta)\big)^n$ sur $[0,\theta-\delta]^n$. Le numérateur vaut $\delta^2$ ($g(\theta)=\theta$). D'où la borne.
6. Avec $\delta=c\theta/n$, $0<c\le n$ : dénominateur $(1-c/n)^{-n}-1$, et $\mathrm{Var}_\theta(T(Z))\ge\tau_n(c)\,\theta^2/n^2$ avec
$$\tau_n(c):=\frac{c^2}{(1-c/n)^{-n}-1}\xrightarrow[n\to\infty]{}\frac{c^2}{e^c-1}.$$
En optimisant en $c$ : l'EQM de tout estimateur sans biais de $\theta$ est minorée par $\theta^2\sup_{c\in]0,n[}\tau_n(c)/n^2$, d'ordre $\theta^2/n^2$ : on retrouve **sans régularité** la vitesse $n^{-2}$ de l'Ex. 1.16 ; $\hat\theta_n^{(2)}=\frac{n+1}{n}X_{n:n}$ (risque $\theta^2/\{n(n+2)\}$) est de cet ordre.
*Complément numérique (calcul de l'extracteur, non dans le poly)* : $\sup_{c>0}c^2/(e^c-1)\approx0{,}648$, atteint en $c\approx1{,}59$ ; le ratio asymptotique EQM de $\hat\theta_n^{(2)}$ / minorant vaut donc environ $1/0{,}648\approx1{,}54$.

**Méthodes mobilisées :** **Cauchy-Schwarz** (version covariance), **rapport de vraisemblance** $p_{\theta-\delta}/p_\theta$ comme fonction test, absence de biais sous deux lois, passage à la limite par **convergence dominée** / dérivation sous l'intégrale, calcul d'intégrales sur des pavés, limite $(1-c/n)^{-n}\to e^c$, optimisation d'une borne en un paramètre libre.
**Pièges :** l'hypothèse d'inclusion des supports est essentielle (elle exige $\theta-\delta<\theta$, i.e. $\delta>0$ dans l'uniforme) ; à strictement parler $c=n$ donne $\delta=\theta$, hors de $]0,\theta[$ : le sup est pris sur $c\in]0,n[$ comme dans la conclusion du corrigé.

### Exercice 4 — Estimateurs linéaires (⋆) [bonus]
**Source :** Poly ch.3, §3.3, Exercice 4, p. 36 ; corrigé p. 41–42.
**Objectif (poly) :** généralise l'Ex. 1.11 en levant la contrainte d'absence de biais (multiplicateurs de Lagrange ou Cauchy-Schwarz).
**Énoncé complet :** $p$ densité sur $\mathbb{R}$ (Lebesgue) avec $\int x\,p(x)\,\mathrm{d}x=0$, $\int x^2p(x)\,\mathrm{d}x=1$. $(X_1,\dots,X_n)$ $n$-échantillon de $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta\cdot\mathrm{Leb},\ \theta\in\mathbb{R}\})$, modèle de translation
$$x\mapsto p_\theta(x):=\frac1\sigma\,p\Big(\frac{x-\theta}{\sigma}\Big),$$
$\sigma>0$ **connu**. Pour $\underline{a}_n=(a_{1,n},\dots,a_{n,n})\in\mathbb{R}^n$, estimateurs linéaires $\hat\theta_n(\underline{a}_n):=\sum_{i=1}^na_{i,n}X_i$.
1. Déterminer l'estimateur de risque quadratique minimal dans la classe $\{\hat\theta_n(\underline{a}_n)\}$ **et sans biais**.
2. Calculer une borne inférieure du risque quadratique dans la classe linéaire **sans contrainte** d'absence de biais.

**Corrigé complet :** Sous $\mathbb{P}_\theta$, $X_k\overset{d}{=}\theta+\sigma Y_k$, $Y_k\sim p\cdot\mathrm{Leb}$ ⇒ $\mathbb{E}_\theta[X_k]=\theta$, $\mathrm{Var}_\theta(X_k)=\sigma^2$. Par indépendance :
$$\mathbb{E}_\theta\big[\hat\theta_n(\underline{a}_n)\big]=\theta\sum_{k=1}^na_{k,n},\qquad\mathrm{Var}_\theta\big(\hat\theta_n(\underline{a}_n)\big)=\sigma^2\sum_{k=1}^na_{k,n}^2,$$
$$R\big(\theta,\hat\theta_n(\underline{a}_n)\big)=\theta^2\Big(\sum_{k=1}^na_{k,n}-1\Big)^2+\sigma^2\sum_{k=1}^na_{k,n}^2.$$
1. Sans biais ⇔ $\sum_ka_{k,n}=1$ ; minimiser $\sigma^2\sum_ka_{k,n}^2$. **Cauchy-Schwarz** avec $\mathbf{1}$ : $\frac1n\sum_ka_{k,n}^2\ge\big(\frac1n\sum_ka_{k,n}\big)^2=\frac1{n^2}$, égalité ssi $a_{1,n}=\dots=a_{n,n}$, donc $a_{k,n}=1/n$ : l'optimum est $\hat\theta_n(1/n,\dots,1/n)=\bar X_n$, de risque $\sigma^2/n$ (résultat de l'Ex. 1.11, ici sous la structure de translation au lieu de la seule hypothèse $\mathbb{E}_\theta[X_1^2]<\infty$).
2. Sans contrainte : minimiser sur $\mathbb{R}^n$ $\underline{a}_n\mapsto\theta^2(\sum_ka_{k,n}-1)^2+\sigma^2\sum_ka_{k,n}^2$. Hessienne $2\sigma^2\mathrm{I}_n+2\theta^2\mathbf{1}\mathbf{1}^\top$, avec $u^\top Hu=2\sigma^2\lVert u\rVert^2+2\theta^2(\sum_ku_k)^2\ge2\sigma^2\lVert u\rVert^2>0$ pour $u\ne0$ : **strictement convexe**, unique minimum au point critique :
$$\theta^2\Big(\sum_{k=1}^na_{k,n}-1\Big)+\sigma^2a_{i,n}=0\quad\forall i.$$
Sommer sur $i$ : $n\theta^2(\sum_ka_{k,n}-1)+\sigma^2\sum_ka_{k,n}=0$ ⇒ $\sum_ka_{k,n}=n\theta^2/(\sigma^2+n\theta^2)$, puis
$$a_{i,n}=\frac{\theta^2}{\sigma^2+n\theta^2},\qquad i=1,\dots,n,$$
$$R\big(\theta,\hat\theta_n(\underline{a}_n^\star)\big)=\frac{\sigma^2\theta^2}{\sigma^2+n\theta^2}=\frac{\sigma^2}{n}\cdot\frac{\theta^2}{\theta^2+\sigma^2/n}<\frac{\sigma^2}{n}.$$
Strictement inférieur au risque optimal sans biais : classe plus grande ⇒ optimum plus bas.

**Méthodes mobilisées :** représentation $X=\theta+\sigma Y$ (translation-échelle), **décomposition biais-variance**, **Cauchy-Schwarz** / optimisation sous contrainte, **convexité stricte** (hessienne définie positive) + annulation du gradient, rétrécissement implicite (facteur $\frac{n\theta^2}{\sigma^2+n\theta^2}<1$).
**Pièges :** les poids optimaux de Q2 **dépendent de $\theta$ inconnu** : ce n'est pas un estimateur utilisable, d'où le terme « borne inférieure » dans l'énoncé (remarque de l'extracteur, cohérente avec l'énoncé ; le corrigé ne le commente pas explicitement).

### Exercice 5 — Statistiques d'ordre exponentielles (⋆⋆⋆) [bonus]
**Source :** Poly ch.3, §3.3, Exercice 5, p. 36–37 ; corrigé p. 42–43.
**Énoncé complet :** densité exponentielle de paramètre $\theta>0$ :
$$x\mapsto p_\theta(x):=\theta^{-1}e^{-x/\theta}\mathbb{1}_{\mathbb{R}_+}(x),\qquad\theta\in\Theta:=\mathbb{R}_+^*$$
(**attention : $\theta$ = moyenne**, contrairement à l'Ex. 1.13). $(X_1,\dots,X_n)$ $n$-échantillon de $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta\cdot\mathrm{Leb},\ \theta\in\Theta\})$, statistiques d'ordre $X_{1:n}\le\dots\le X_{n:n}$, et $p_\theta(y_1,\dots,y_n):=\prod_{k=1}^np_\theta(y_k)$.
1. Montrer que sous $p_\theta\cdot\mathrm{Leb}^{\otimes n}$, la loi jointe de $(X_{1:n},\dots,X_{n:n})$ a pour densité
$$(y_1,\dots,y_n)\mapsto f_{1:n}(\theta;y_1,\dots,y_n):=n!\,p_\theta(y_1,\dots,y_n)\,\mathbb{1}_{\{0\le y_1<y_2<\dots<y_n\}}.$$
Transformation
$$Z_1:=nX_{1:n},\qquad Z_k:=(n-k+1)(X_{k:n}-X_{(k-1):n}),\quad k\ge2,\tag{14}$$
soit $X_{k:n}=\sum_{j=1}^kZ_j/(n-j+1)$ ; jacobien $n!$ ; pour $x_0:=0$, $\sum_{i=1}^nx_i=\sum_{i=1}^n(n-i+1)(x_i-x_{i-1})$.
2. Montrer que sous $p_\theta\cdot\mathrm{Leb}^{\otimes n}$, $(Z_1,\dots,Z_n)$ sont i.i.d. exponentielles de paramètre $\theta$.

Pour $\underline{a}_n\in\mathbb{R}^n$, $\hat\theta_n(\underline{a}_n):=\sum_{i=1}^na_{i,n}X_{i:n}$.

3. Montrer que $\hat\theta_n(\underline{a}_n)=\sum_{j=1}^nZ_jm_{j,n}$ avec $m_{j,n}:=\frac{1}{n-j+1}\sum_{i=j}^na_{i,n}$.
4. Calculer biais et risque quadratique.
5. Poids $\underline{a}_n$ de l'estimateur **sans biais** de risque minimal dans la classe (indication : d'abord $m_{j,n}$, puis $a_{j,n}$).
6. Poids de risque minimal **sans contrainte** de biais.

**Corrigé complet :** $\mathbb{E}_\theta[U]=\theta$, $\mathrm{Var}_\theta(U)=\theta^2$ pour $U\sim p_\theta\cdot\mathrm{Leb}$.
1. $\mathcal{S}_n$ permutations ($n!$ éléments). Les $X_i$ i.i.d. ⇒ $(X_1,\dots,X_n)\overset{d}{=}(X_{\tau_1},\dots,X_{\tau_n})$ pour toute $\tau$. Loi à densité ⇒ $\mathbb{P}_\theta(X_i=X_j)=0$ ($i\ne j$) ⇒ p.s. une unique permutation aléatoire $\sigma$ avec $X_{k:n}=X_{\sigma_k}$ et $X_{\sigma_1}<\dots<X_{\sigma_n}$. Pour $h$ mesurable bornée :
$$\mathbb{E}_\theta\big[h(X_{1:n},\dots,X_{n:n})\big]=\sum_{\tau\in\mathcal{S}_n}\mathbb{E}_\theta\big[h(X_{\tau_1},\dots,X_{\tau_n})\mathbb{1}_{\sigma=\tau}\big]=\sum_{\tau\in\mathcal{S}_n}\mathbb{E}_\theta\big[h(X_{\tau_1},\dots,X_{\tau_n})\mathbb{1}_{X_{\tau_1}<\dots<X_{\tau_n}}\big],$$
chaque terme valant (i.i.d.) $\int_{y_1<\dots<y_n}h(y_1,\dots,y_n)\prod_{k=1}^np_\theta(y_k)\,\mathrm{d}y_1\dots\mathrm{d}y_n$, indépendamment de $\tau$ ; somme de $n!$ termes égaux ⇒ densité annoncée.
2. $h\ge0$ mesurable ; changement de variables $z_i:=(n-i+1)(y_i-y_{i-1})$ ($y_i=\sum_{j\le i}z_j/(n-j+1)$), jacobien $n!$ pour l'inverse de (14), et $\sum_{k=1}^n\sum_{j=1}^k\mathbb{1}_{j\le k}z_j/(n-j+1)=\sum_{j=1}^nz_j$ :
$$\mathbb{E}_\theta\big[h(Z_1,\dots,Z_n)\big]=\frac{n!}{\theta^n}\int_{0\le y_1<\dots<y_n}\exp\Big(-\theta^{-1}\sum_{k=1}^ny_k\Big)h\big(ny_1,\dots,(y_n-y_{n-1})\big)\,\mathrm{d}y_1\dots\mathrm{d}y_n=\frac{1}{\theta^n}\int_{z_1,\dots,z_n>0}\exp\Big(-\theta^{-1}\sum_{j=1}^nz_j\Big)h(z_1,\dots,z_n)\,\mathrm{d}z_1\dots\mathrm{d}z_n,$$
⇒ produit de $n$ lois exponentielles de paramètre $\theta$ (de moyenne $\theta$).
3. Interversion des sommes ($j\le i$) et $X_{i:n}=\sum_{j=1}^iZ_j/(n-j+1)$ :
$$\sum_{j=1}^nm_{j,n}Z_j=\sum_{j=1}^n\frac{Z_j}{n-j+1}\sum_{i=j}^na_{i,n}=\sum_{i=1}^na_{i,n}\sum_{j=1}^i\frac{Z_j}{n-j+1}=\sum_{i=1}^na_{i,n}X_{i:n}=\hat\theta_n(\underline{a}_n).$$
4. $Z_j$ i.i.d., $\mathbb{E}_\theta[Z_j]=\theta$, $\mathrm{Var}_\theta(Z_j)=\theta^2$ :
$$\mathbb{E}_\theta\big[\hat\theta_n(\underline{a}_n)\big]=\theta\sum_{j=1}^nm_{j,n},\qquad\mathrm{Var}_\theta\big(\hat\theta_n(\underline{a}_n)\big)=\theta^2\sum_{j=1}^nm_{j,n}^2,$$
$$R\big(\theta,\hat\theta_n(\underline{a}_n)\big)=\theta^2\Big(\sum_{j=1}^nm_{j,n}-1\Big)^2+\theta^2\sum_{j=1}^nm_{j,n}^2.$$
(Biais : $\theta(\sum_jm_{j,n}-1)$.)
5. Sans biais ⇔ $\sum_jm_{j,n}=1$ ; minimiser $\sum_jm_{j,n}^2$ comme Exercice 4 Q1 ⇒ $m_{j,n}=1/n$. Retour aux $a$ : le poly écrit « $a_{i,n}=m_{i,n}-m_{i+1,n}$ pour $i<n$ et $a_{n,n}=m_{n,n}$ » puis conclut $\underline{a}_n=(1/n,\dots,1/n)$ : la **conclusion est correcte** (la moyenne empirique), mais la formule d'inversion écrite est **erronée** — de $(n-j+1)m_{j,n}=\sum_{i\ge j}a_{i,n}$ on tire
$$a_{i,n}=(n-i+1)\,m_{i,n}-(n-i)\,m_{i+1,n}\ (i<n),\qquad a_{n,n}=m_{n,n},$$
qui donne bien $a_{i,n}=1/n$ pour $m\equiv1/n$ (la formule du poly donnerait $a_{i,n}=0$ pour $i<n$). *(Correction de l'extracteur.)* L'estimateur sans biais optimal est la **moyenne empirique** $\frac1n\sum_iX_{i:n}=\bar X_n$.
6. Sans contrainte : minimiser $\theta^2(\sum_jm_{j,n}-1)^2+\theta^2\sum_jm_{j,n}^2$ comme Exercice 4 Q2 avec $\sigma^2=\theta^2$ : $m_{j,n}=\theta^2/(\theta^2+n\theta^2)=1/(n+1)$, d'où $a_{i,n}=1/(n+1)$ pour tout $i$ (avec la formule d'inversion correcte ci-dessus). Ici les poids **ne dépendent pas de $\theta$** : $\frac{1}{n+1}\sum_iX_i$ est un vrai estimateur, biaisé, qui domine $\bar X_n$ dans la classe linéaire. *(Risque correspondant, calcul de l'extracteur : $\theta^2/(n+1)$ contre $\theta^2/n$ pour $\bar X_n$.)*

**Méthodes mobilisées :** loi des statistiques d'ordre par **symétrie / permutations** et méthode de la fonction muette, **changement de variables** (jacobien), espacements normalisés de Rényi (nom non cité dans le poly), **interversion de sommes**, biais-variance, optimisation (Cauchy-Schwarz, convexité) comme Exercice 4.
**Pièges :** paramétrisation par la moyenne ($\theta^{-1}e^{-x/\theta}$) ; formule d'inversion $m\to a$ ; contrairement à l'Exercice 4, ici $\sigma^2=\theta^2$ rend le facteur de rétrécissement indépendant de $\theta$.

---

## 5. Hors programme / compléments

> **Poly ch.3, §4 « Les compléments », p. 44–47 — contenus explicitement « non exigibles ».**

- **Déf. 4.1 — Risque d'une règle de décision** (p. 44). Espace d'actions $(\mathsf{A},\mathcal{A})$, perte $\ell:\Theta\times\mathsf{A}\to\mathbb{R}_+$ mesurable en $a$ ; règle de décision $\delta:(\mathsf{Z},\mathcal{Z})\to(\mathsf{A},\mathcal{A})$ mesurable ; risque $R_\ell(\theta,\delta):=\mathbb{E}_\theta[\ell(\theta,\delta(Z))]$ (éq. (15)). Estimation = cas $\mathsf{A}=\mathsf{Y}$, perte $W(g(\theta),a)$ ; toutes les notions (admissibilité…) s'y transposent.
- **Tests comme règles de décision** (p. 44). $\Theta=\Theta_0\cup\Theta_1$ disjoints ($H_0$, $H_1$), $\mathsf{A}=\{0,1\}$ (0 : accepter $H_0$). Perte : $\ell(\theta,0)=\ell_0$ si $\theta\in\Theta_1$ (0 sinon), $\ell(\theta,1)=\ell_1$ si $\theta\in\Theta_0$ (0 sinon). Risque : $R_\ell(\theta,\phi)=\ell_0\mathbb{P}_\theta(\phi(Z)=0)$ si $\theta\in\Theta_1$, $\ell_1\mathbb{P}_\theta(\phi(Z)=1)$ si $\theta\in\Theta_0$. Perte 0-1 ($\ell_0=\ell_1=1$) : risque $\beta_\phi(\theta)$ sur $\Theta_0$ et $1-\beta_\phi(\theta)$ sur $\Theta_1$, avec $\beta_\phi(\theta)=\mathbb{P}_\theta(\phi(Z)=1)$ (fonction puissance). Repris au chapitre des tests.
- **Approches minimax et bayésienne** (p. 44–45). Minimax : $\overline{R}_\ell(\delta):=\sup_{\theta\in\Theta}R_\ell(\theta,\delta)$, risque minimax $\overline{R}_\ell:=\inf_\delta\overline{R}_\ell(\delta)$, $\delta^*$ minimax si $\overline{R}_\ell(\delta^*)=\overline{R}_\ell$ (sûr mais parfois trop conservateur). Bayésien : loi a priori $\Pi$ sur $\Theta$, $R_\ell(\Pi,\delta):=\int_\Theta R_\ell(\theta,\delta)\,\Pi(\mathrm{d}\theta)$, risque de Bayes $\underline{R}_\ell(\Pi):=\inf_\delta R_\ell(\Pi,\delta)$, règle bayésienne selon $\Pi$ si elle atteint l'infimum. Les deux agrégations rétablissent un **ordre total** et excluent les estimateurs constants. Le risque intégré réapparaît en apprentissage statistique.
- **Prop. 4.1 — Fonctions estimables sans biais dans le modèle binomial** (p. 45). Modèle $\mathrm{Bin}(n,\theta)$, $\Theta=[0,1[$ : $g$ admet un estimateur sans biais **ssi** $g$ est un polynôme de degré $\le n$ ; il est alors **unique**. *Preuve :* $\Phi:T\mapsto(\theta\mapsto\mathbb{E}_\theta[T(Z)])$ linéaire entre deux espaces de dimension $n+1$ ; injectivité : $T\in\ker\Phi$ ⇒ $(1-\theta)^n\sum_k\binom nkT(k)\big(\frac{\theta}{1-\theta}\big)^k=0$ ; avec $t=\theta/(1-\theta)$ et $(1-\theta)^n\ne0$, le polynôme $F(t)=\sum_k\binom nkT(k)t^k$ est nul sur $[0,\infty[$ ⇒ $T=0$ ⇒ $\Phi$ bijective.
- **Estimation équivariante du paramètre de translation** (p. 45–46). $p_\theta(x)=p(x-\theta)$ sur $\mathbb{R}^d$, perte $w(u-v)$. $\mathbb{E}_\theta[h(X_j+c)]=\mathbb{E}_{\theta+c}[h(X_j)]$ ; estimateurs **équivariants** : $T(x_1+c,\dots,x_n+c)=T(x_1,\dots,x_n)+c$ (éq. (16)), équivalent à $T(x_1,\dots,x_n)=x_1+T(0,x_2-x_1,\dots,x_n-x_1)$. Résultat : $R_w(\theta,T)=R_w(0,T)$ — **le risque ne dépend pas de $\theta$** ; il suffit de minimiser un nombre $\inf_TR_w(0,T)$ sur la classe.
- **Th. 4.1 — Existence d'un estimateur efficace** (p. 46). Modèle régulier, $\Theta\subseteq\mathbb{R}$ ouvert : il existe un estimateur efficace $T^*$ de $\theta$ **ssi** $p_\theta(z)=h(z)\exp\big(A(\theta)T^*(z)+B(\theta)\big)$ avec $A,B$ différentiables (**famille exponentielle**, Exercice 3 PC2). *Idée :* efficacité ⇔ égalité dans Cauchy-Schwarz ⇔ $\nabla_\theta\ell(\theta,z)=c(\theta)\{T(z)-\theta\}$ ; on intègre en $\theta$. Le score centré impose $B'(\theta)=-\theta A'(\theta)$, d'où $\nabla_\theta\ell=A'(\theta)\{T^*(Z)-\theta\}$ : **l'estimateur efficace, s'il existe, est l'EMV** (solution des équations de vraisemblance). (Preuve esquissée.)
- **Estimateur à rétrécissement** (p. 46–47). $T$ sans biais de $g(\theta)$, $T_\gamma:=\gamma T$, $\upsilon(\theta):=\mathrm{Var}_\theta(T(Z))$ : $b(\theta,T_\gamma)=(\gamma-1)g(\theta)$, $\mathrm{Var}_\theta(T_\gamma)=\gamma^2\upsilon(\theta)$,
$$R(\theta,T_\gamma)=(\gamma-1)^2\{g(\theta)\}^2+\gamma^2\upsilon(\theta).\tag{17}$$
$\gamma>1$ : inadmissible (battu par $T$). Si $\{g(\theta)\}^2\le\upsilon(\theta)$ pour tout $\theta$ : $T_\gamma$ préférable à $T$ pour tout $\gamma\in[0,1]$. Sinon, $R(\theta,T_\gamma)\le\upsilon(\theta)$ ⇔ (pour $\gamma<1$) $\gamma\ge\gamma_{\min}(\theta):=\frac{\{g(\theta)\}^2-\upsilon(\theta)}{\{g(\theta)\}^2+\upsilon(\theta)}$ — seuil dépendant de $\theta$, non calculable en pratique.
- **Le paramètre de translation : quatre lois de bruit** (p. 47). Compléments à l'Ex. 1.1 ($m=1000$, $n=100$, $\theta=0$). Bruit uniforme $p=\mathbb{1}_{[-1/2,1/2]}$ (variance $1/12$) : moyenne $1/(12n)$, médiane (asympt.) $1/(4np(0)^2)=1/(4n)$, mais la **demi-somme des extrêmes** est de loin la meilleure (variance d'ordre $n^{-2}$, non-régularité comme Ex. 1.9). Bruit de Cauchy $p(x)=1/(\pi(1+x^2))$ : moyenne et demi-somme sans espérance ; $\bar X_n$ a la même loi de Cauchy pour tout $n$ (ch.2, §4) ; la **médiane** reste raisonnable. Variances de la médiane = asymptotiques.

---

## 6. Liens avec les autres chapitres

**Prérequis :**
- **Ch.1 (Modèles statistiques)** : modèle paramétrique $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta\})$, modèle dominé et densités, **Radon-Nikodym** (non-unicité de la mesure dominante → Lemme 2.1), statistique / estimateur, $n$-échantillon et densité produit (→ additivité de l'information), statistiques d'ordre, loi du $\chi^2$, **théorèmes de Cochran et Gosset** (→ Ex. 1.8, Exercice 2), vecteurs gaussiens.
- **Ch.2 (Méthodes d'estimation)** : estimateur ponctuel, **méthode des moments**, **maximum de vraisemblance** (EMV de Poisson, Bernoulli, uniforme $X_{n:n}$, gaussien $\hat\sigma_n^2$), log-vraisemblance, $Z$-estimateurs (Ex. 1.1), **divergence de Kullback-Leibler** (intuition « information = courbure de KL »), familles exponentielles (Exercice 3 PC2 → Th. 4.1), régression linéaire (Exercice 1 PC2 → Exercice 2).
- Probabilités/analyse : Cauchy-Schwarz, convergence dominée et dérivation sous l'intégrale, matrices symétriques positives.

**Suites :**
- **Comportement asymptotique des estimateurs** (« cours 6 ») : variances asymptotiques (Ex. 1.1 : médiane $1/(4np(0)^2)$), **normalité asymptotique et efficacité asymptotique de l'EMV** (variance limite $\mathbb{I}_1(\theta)^{-1}$), delta-méthode.
- **Tests d'hypothèses** : risque d'un test, perte 0-1, fonction puissance (compléments).
- **Intervalles / régions de confiance** : l'information de Fisher fournit la variance asymptotique pour des intervalles de Wald.
- **Apprentissage statistique** : risque intégré, approche bayésienne, compromis biais-variance, rétrécissement (ridge).
- Rao-Blackwell / exhaustivité (mentionné dans le point d'histoire sur Rao).

---

## 7. Idées de visualisations interactives pertinentes pour ce chapitre

1. **Translation : trois estimateurs × quatre bruits** — boxplots Monte-Carlo de $\bar X_n$, médiane, demi-somme des extrêmes, pour bruit gaussien/Laplace/uniforme/Cauchy, curseurs $n$ et $m$ ; afficher les variances empiriques vs asymptotiques (Ex. 1.1 + compléments).
2. **Décomposition biais-variance du rétrécissement $T_\gamma=\gamma T$** — curseurs $\gamma$, $\theta$, $n$ ; barres empilées biais$^2$ / variance, courbe $\gamma\mapsto R(\theta,T_\gamma)$, seuil $\gamma_{\min}(\theta)$ ; histogramme de $T_\gamma$ avec vraie valeur.
3. **Courbes de risque qui se croisent / admissibilité** — tracer $\theta\mapsto R(\theta,T)$ pour plusieurs estimateurs (Bernoulli : $\bar X_n$, constant $\vartheta$, $(\sum X_i+1)/(n+2)$) ; colorer les zones de domination ; marquer les estimateurs inadmissibles.
4. **Uniforme : famille $aX_{n:n}$** — curseur $a$, trinôme $\theta^2\{\frac{na^2}{n+2}-\frac{2an}{n+1}+1\}$ avec les points $a=1$, $(n+1)/n$, $(n+2)/(n+1)$ ; échelle log-log du risque en fonction de $n$ pour voir la pente $-2$ vs $-1$ de $\frac2n\sum X_i$.
5. **$S_n^2$ vs $\hat\sigma_n^2$ en gaussien** — curseur $n$, risques exacts $2\sigma^4/(n-1)$ et $(2n-1)\sigma^4/n^2$, simulation de leurs distributions.
6. **Score et information de Fisher** — pour Bernoulli/Poisson/exponentiel/gaussien : log-vraisemblance d'une observation tirée et sa tangente en $\theta$ ; histogramme du score sur tirages répétés (moyenne 0, variance $\mathbb{I}(\theta)$) ; courbe $\theta\mapsto\mathrm{KL}(\theta^\star,\theta)$ superposée à la parabole $\frac12\mathbb{I}(\theta^\star)(\theta-\theta^\star)^2$.
7. **Borne de Cramér-Rao en action** — curseur $n$ ; variance empirique de $\bar X_n$ (Bernoulli/Poisson) vs borne $1/\mathbb{I}$ (égalité = efficacité) ; contre-exemple uniforme où la variance de $\frac{n+1}{n}X_{n:n}$ passe sous « $\theta^2/n$ ».
8. **Borne de l'Exercice 3** — tracé de $c\mapsto\tau_n(c)$ pour plusieurs $n$ et de la limite $c^2/(e^c-1)$ ; ratio $n/\{(n+2)\tau_n(c)\}$.
9. **Ellipse de Cramér-Rao en régression (Exercice 2)** — curseurs sur les $x_i$ (et $\bar x$) : ellipses de $\mathbb{I}(\beta)^{-1}=\sigma^2(\mathbf{X}^\top\mathbf{X})^{-1}$, comparaison de $[\mathbb{I}^{-1}]_{11}$ et $\sigma^2/n$ (β₂ connu), égalité quand $\bar x=0$.
