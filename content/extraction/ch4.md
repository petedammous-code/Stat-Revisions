# Chapitre 4 — Régions de confiance et tests

> **Sources extraites :** `S4_APM41033-Week4-Cours` (poly p. 7–34), `S4_APM41033-Week4-Maths` (« Les outils mathématiques », §3, p. 35–38), `S4_APM41033-Week4-Exercices` (« Les exercices », §4, p. 39–54, **avec corrigés intégrés** p. 46–54), `S4_APM41033-Week4-Compléments` (« Les compléments », §5, p. 55–58, **hors programme d'examen**).
> **Numérotation du poly :** les éléments encadrés sont numérotés « N.M » où N est la *section* du chapitre : §1 « Régions de confiance » (Définitions 1.1–1.2, Proposition 1.1, Méthode 1.1, Exemples 1.1–1.8), §2 « Tests d'hypothèses » (Définitions 2.1–2.4, Propositions 2.1–2.2, Méthode 2.1, Exemples 2.1–2.15), §3 « Les outils mathématiques » (Définitions 3.1–3.2, Proposition 3.1, Théorème 3.1, Corollaire 3.1, Lemme 3.1), §4 « Les exercices » (Exercices 1–7), §5 « Les compléments » (Exemples 5.1–5.3, Théorème 5.1, Proposition 5.1). Les équations sont numérotées (1)–(3) sur tout le chapitre ((1)–(2) dans la Prop. 2.2, (3) dans les compléments). On cite donc « Poly ch.4, Déf. 2.3 », « Poly ch.4, Prop. 2.2, éq. (1) ».
> **Pas de théorème numéroté dans la partie Cours** : les résultats démontrés du cours sont des *Propositions* (1.1, 2.1, 2.2) ; le seul *Théorème* du chapitre est l'inégalité de Hoeffding (Th. 3.1, Outils) et, hors programme, l'inégalité de Chernoff (Th. 5.1). Le poly utilise aussi des blocs **Méthode** (1.1 et 2.1), conservés ici comme blocs à part.
> **Renvois internes au poly :** « Exercice 3 (PC4) » = Exercice 3 de la §4 de ce chapitre ; « Exercice 1 (PC2) » = exercice du chapitre 2 ; « chapitre 3, Exemple 1.4 » = numérotation propre du chapitre 3 ; « Section 3 » = section Outils mathématiques de ce chapitre.
> **Pages :** la pagination indiquée est celle du poly complet (en-têtes de page), pas celle des PDF découpés (le PDF Cours commence à la p. 7, le PDF Maths à la p. 35, le PDF Exercices à la p. 39, le PDF Compléments à la p. 55).

---

## 0. Résumé en 10 lignes (ce qu'il faut retenir pour l'examen)

1. **Région de confiance** de niveau de couverture $1-\alpha$ pour $g(\theta)$ (Déf. 1.1) : $\mathcal{C}:\mathsf{Z}\to\mathcal{B}(\mathbb{R}^p)$ avec $\{z,\ g(\theta)\in\mathcal{C}(z)\}\in\mathcal{Z}$ et $\inf_{\theta\in\Theta}\mathbb{P}_\theta(g(\theta)\in\mathcal{C}(Z))\ge 1-\alpha$. **L'aléa porte sur la région, pas sur $\theta$** : « $\mathbb{P}_\theta(\theta\in[0,2])\ge 1-\alpha$ » sur une réalisation n'a pas de sens.
2. **Pivot** (Déf. 1.2) : $G(Z,\theta)$ dont la loi $\mathbb{Q}$ sous $\mathbb{P}_\theta$ ne dépend pas de $\theta$ (mais $G$ dépend de $\theta$ !). **Méthode 1.1** : pivot $\to$ loi $\mathbb{Q}$ $\to$ $A_\alpha$ avec $\mathbb{Q}(A_\alpha)\ge 1-\alpha$ $\to$ résoudre $G(Z,\theta)\in A_\alpha$ en $\theta$ (Prop. 1.1).
3. **Pivots gaussiens** : $\sqrt n(\bar X_n-\mu)/\sigma\sim\mathcal{N}(0,1)$ ($\sigma$ connue) $\Rightarrow$ $[\bar X_n\pm z_{1-\alpha/2}\sigma/\sqrt n]$ ; $\sqrt n(\bar X_n-\mu)/S_n\sim\mathrm{t}(n-1)$ (Gosset) $\Rightarrow$ $[\bar X_n\pm S_n\mathrm{t}^{(n-1)}_{1-\alpha/2}/\sqrt n]$ ; $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$ $\Rightarrow$ $\big[\frac{(n-1)S_n^2}{\chi^2_{1-\alpha_2}(n-1)},\frac{(n-1)S_n^2}{\chi^2_{\alpha_1}(n-1)}\big]$. Autres pivots : $\theta X\sim\mathcal{E}(1)$, $X/\theta\sim\mathcal{U}([0,1])$, $X_{n:n}/\theta$ (densité $nx^{n-1}$), $2\theta^{-1}\sum X_i\sim\chi^2(2n)$ (exponentiel d'espérance $\theta$).
4. **Sans pivot** : inégalité de déviation. Proportion : Bienaymé-Tchebychev $\Rightarrow$ $[\bar X_n\pm 1/(2\sqrt{n\alpha})]$ ; Hoeffding $\Rightarrow$ $[\bar X_n\pm\sqrt{\log(2/\alpha)/(2n)}]$, rapport des longueurs $\sqrt{2\alpha\log(2/\alpha)}$ (0,61 à 5 %). Couple $(\mu,\sigma^2)$ : sous-additivité (Bonferroni) ou pivot bivarié de niveau exact $(1-\alpha/2)^2$.
5. **Test pur** (Déf. 2.1) : $\phi:\mathsf{Z}\to\{0,1\}$ mesurable, région de rejet $\mathcal{R}=\{\phi=1\}$ ; on dit « rejeter $H_0$ » / « **échouer à rejeter** $H_0$ » (jamais « accepter »). Forme usuelle $\mathcal{R}=\{T(z)\ge c\}$ (statistique de test $T$, valeur critique $c$ ; inégalité **large** par convention).
6. **Fonction puissance** $\beta_\phi(\theta)=\mathbb{P}_\theta(\phi(Z)=1)$ ; risque de 1re espèce $\beta_\phi(\theta)$, $\theta\in\Theta_0$ ; de 2e espèce $1-\beta_\phi(\theta)$, $\theta\in\Theta_1$ (Déf. 2.2). **Taille** $\overline{\alpha}(\phi)=\sup_{\theta\in\Theta_0}\beta_\phi(\theta)$ ; **niveau** $\alpha$ si $\overline{\alpha}(\phi)\le\alpha$ (Déf. 2.3). Diminuer $c$ augmente taille **et** puissance : les deux risques varient en sens contraire.
7. **Neyman-Pearson** (§2.4) : on fixe le niveau $\alpha$, puis on maximise la puissance sur $\Theta_1$. Seule décision forte = rejeter $H_0$ ; mettre en $H_0$ l'hypothèse **en notre défaveur** ou **la plus dangereuse**. Échanger $H_0$ et $H_1$ change la conclusion (aéroport/riverains, Ex. 2.6–2.9).
8. **Méthode 2.1** : (0) niveau ; (1) statistique $T$ (selon $H_0$ et le modèle) ; (2) forme de $\mathcal{R}$ (selon $H_1$) ; (3) $c_\alpha$ tel que $\sup_{\Theta_0}\mathbb{P}_\theta(T\ge c_\alpha)\le\alpha$ (loi de $T$ sous $H_0$) ; (4) puissance ; (5) $p$-valeur ; (6) conclusion. Tests gaussiens : $z$-test ($\sigma$ connue), **test de Student** ($|G|\ge\mathrm{t}^{(n-1)}_{1-\alpha/2}$, puissance via **Student non centrale**), test du $\chi^2$ sur la variance. Discret (binomial) : $c_\alpha=\min\{k:\ \mathbb{P}_{\theta_0}(S_n\ge k)\le\alpha\}$, taille $<\alpha$ ; monotonie en $\theta$ par **couplage**.
9. **$p$-valeur** (Déf. 2.4) : $\hat\alpha(Z)=\inf\{\alpha,\ Z\in\mathcal{R}_\alpha\}$ pour une famille emboîtée ; on rejette pour tout $\alpha>\hat\alpha(Z)$. Pour $\mathcal{R}_\alpha=\{T\ge c_\alpha\}$ ($c_\alpha\downarrow$) : Prop. 2.1. Ex. : $\hat\alpha=1-\Phi(\sqrt n\bar X_n/\sigma)$ ; bilatéral $2(1-\Phi(T))$. Sous $H_0$, $\mathbb{P}_\theta(\hat\alpha\le u)\le u$, **uniforme** si la taille vaut exactement $\alpha$ (Prop. 2.2).
10. **Ce qu'un test ne dit pas** (§2.8) : la $p$-valeur n'est **pas** $\mathbb{P}(H_0\text{ vraie})$ ; significativité $\ne$ taille d'effet (Ex. 2.14 : 0,2 dB « significatif » avec $n=10^4$) ; rapporter estimation + intervalle de confiance. Dualité IC/test (compléments) : rejeter $H_0:\theta=\theta_0$ ssi $\theta_0\notin$ IC.

---

## 1. Notations et symboles

> **Notations particulières du poly à reproduire fidèlement :**
> - Espaces : lettres **sans empattement** $\mathsf{Z}$ (et $\mathsf{X}$) pour les ensembles, calligraphiques $\mathcal{Z}$ pour les tribus ; probabilités en lettres ajourées $\mathbb{P}_\theta$, $\mathbb{E}_\theta$ ; boréliens $\mathcal{B}(\mathbb{R}^p)$.
> - La région de confiance est notée en **calligraphique** $\mathcal{C}(z)$ ; les intervalles explicites aussi : $\mathcal{I}_{n,\alpha}$, $\mathcal{I}^\star_{n,\alpha}$, $\mathcal{I}(Z)$ (mais $I_1$, $I_2$ droits dans l'Ex. 1.7, $\hat I_\alpha$ au §2.6, $I$, $I_{a,b}$ dans l'Exercice 3, $\tilde I(Z)$ dans l'Ex. 5.1).
> - La loi (commune) du pivot est notée en **lettre ajourée** $\mathbb{Q}$, son quantile $q_\beta$.
> - Un test est noté $\phi$ (phi **droit**, pas $\varphi$), sa fonction puissance $\beta_\phi$, sa **taille** $\overline{\alpha}(\phi)$ (alpha **surligné**) — à ne pas confondre avec le niveau $\alpha$ ; la $p$-valeur est $\hat\alpha(Z)$ (alpha chapeau ; $\widehat{\alpha}$ dans l'Ex. 2, Q9). Dans les exercices : $\beta(\theta)$, $\beta_c(\mu)$, $\overline{\alpha}_c$.
> - Régions de rejet / d'acceptation **calligraphiques** : $\mathcal{R}$, $\mathcal{A}$, $\mathcal{R}_\alpha$, $\mathcal{R}'$, $\mathcal{A}_\alpha$.
> - Quantiles : $z_\beta$ pour $\mathcal{N}(0,1)$ (avec $\Phi(z_\beta)=\beta$ ; **la notation $\Phi^{-1}$ n'est pas employée**) ; $\mathrm{t}^{(k)}_\beta$ (t **droit**, degrés de liberté en exposant entre parenthèses) pour la loi de Student $\mathrm{t}(k)$ ; $\chi^2_\beta(k)$ pour la loi $\chi^2(k)$ ; $\mathrm{f}_{1-\alpha}(k_1,k_2)$ pour la loi de Fisher $\mathrm{F}(k_1,k_2)$ ; $F^{\leftarrow}(\beta)$ pour l'inverse généralisée d'une fonction de répartition $F$ (et $F_{p_0}^{-1}$, $F_{\theta_0}^{-1}$, $F^{-1}_{n-1,p-1}$ dans les corrigés des Exercices 5–6).
> - Fonctions de répartition : $\Phi$ ($\mathcal{N}(0,1)$), $F_{\mathrm{t}(k)}$, $F_{\chi^2(k)}$, $F_{\mathrm{Poi}(10)}$, $F_{n-1,p-1}$.
> - Notation $[a\pm b]:=[a-b,a+b]$ (Ex. 1.4).
> - Lois : $\mathcal{E}(\lambda)$ = exponentielle **d'intensité** $\lambda$ (densité $\lambda e^{-\lambda x}$) — **attention** : dans l'Exercice 1, le modèle est $\mathcal{E}(1/\theta)$, $\theta$ étant l'**espérance** ; $\mathcal{U}([0,\theta])$, $\mathcal{B}\mathrm{er}(\theta)$, $\mathrm{Bin}(n,\theta)$, $\mathrm{Poi}(\theta)$, $\mathcal{N}(\mu,\sigma^2)$.
> - Statistiques d'ordre : $X_{n:n}=\max_i X_i$, $x_{\ell:q}$ (Exercice 7).
> - Paramètre « second » générique : $\vartheta$ (vartheta), p. ex. $\theta,\vartheta\in\Theta$ dans la Déf. 1.2 et le Lemme 3.1.
> - Variance empirique normalisée en $n-1$ : $S_n^2$ ; à deux échantillons $S_{n,p}^2$ (normalisée en $n+p-2$) et $\hat\sigma^2_{n,p}$ (EMV, normalisée en $n+p$) ; régression : $\hat\sigma^2$ normalisée en $n-2$.
> - Indicatrice : $\mathbb{1}_{\{\cdot\}}$.

| Symbole LaTeX | Signification | Première apparition |
|---|---|---|
| $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ | modèle statistique | Déf. 1.1, p. 9 |
| $g:\Theta\to\mathbb{R}^p$, $g(\theta)$ | quantité d'intérêt | Déf. 1.1, p. 9 |
| $\alpha\in\,]0,1[$, $1-\alpha$ | $1-\alpha$ = niveau de couverture (régions) ; $\alpha$ = niveau (tests) | Déf. 1.1, p. 9 ; Déf. 2.3, p. 21 |
| $\mathcal{C}:\mathsf{Z}\to\mathcal{B}(\mathbb{R}^p)$, $\mathcal{C}(Z)$ | région de confiance (statistique à valeurs ensemblistes) | Déf. 1.1, p. 9 |
| $Z^{(1)},\dots,Z^{(N)}$ | répétitions indépendantes de l'expérience (interprétation fréquentiste) | Intuition, p. 9 |
| $m(Z)$, $M(Z)$ | bornes inférieure / supérieure de confiance | p. 10 |
| $G:(\mathsf{Z}\times\Theta,\mathcal{Z}\otimes\mathcal{B}(\mathbb{R}^d))\to(\mathbb{R}^p,\mathcal{B}(\mathbb{R}^p))$ | fonction pivotale (pivot) | Déf. 1.2, p. 10 |
| $\mathbb{Q}$ | loi commune de $G(Z,\theta)$ sous $\mathbb{P}_\theta$ | Déf. 1.2, p. 11 |
| $\mathcal{E}(\theta)$ | loi exponentielle d'intensité $\theta$, densité $x\mapsto\theta e^{-\theta x}$ sur $\mathbb{R}_+$ | Ex. 1.1, p. 11 |
| $\mathcal{U}([0,\theta])$ | loi uniforme sur $[0,\theta]$ | Ex. 1.2, p. 11 |
| $A_\alpha\in\mathcal{B}(\mathbb{R}^p)$ | ensemble tel que $\mathbb{Q}(A_\alpha)\ge 1-\alpha$ | Prop. 1.1, p. 11 |
| $q_\beta$ | quantile d'ordre $\beta$ de $\mathbb{Q}$ ($p=1$) | p. 12 |
| $p_1,p_2$ | ordres des quantiles bornant $A_\alpha=]q_{p_1},q_{p_2}]$, $p_2-p_1=1-\alpha$ | p. 12 |
| $\bar X_n:=n^{-1}\sum_{i=1}^nX_i$ | moyenne empirique | Ex. 1.4, p. 13 |
| $\Phi$ | fonction de répartition de $\mathcal{N}(0,1)$ | Ex. 1.4, p. 13 |
| $z_\beta$ | quantile d'ordre $\beta$ de $\mathcal{N}(0,1)$, $\Phi(z_\beta)=\beta$, $z_{\alpha/2}=-z_{1-\alpha/2}$ | Ex. 1.4, p. 13 |
| $[a\pm b]$ | intervalle $[a-b,a+b]$ | Ex. 1.4, p. 13 |
| $\mathcal{I}_{n,\alpha}$ | intervalle de confiance (gaussien, puis Bienaymé-Tchebychev) | Ex. 1.4, p. 13 ; Ex. 1.8, p. 18 |
| $S_n^2:=\frac{1}{n-1}\sum_{i=1}^n(X_i-\bar X_n)^2$ | variance empirique (sans biais) | p. 14 |
| $T_n:=\sqrt n\,\frac{\bar X_n-\mu}{S_n}$ | statistique de Student | p. 14 |
| $\mathrm{t}(k)$ | loi de Student à $k$ degrés de liberté | p. 14 |
| $\mathrm{t}^{(n-1)}_\beta$ | quantile d'ordre $\beta$ de $\mathrm{t}(n-1)$ | Ex. 1.5, p. 14 |
| $\chi^2(k)$, $\chi^2_\beta(k)$ | loi du khi-deux, son quantile d'ordre $\beta$ | p. 14 ; Ex. 1.6, p. 16 |
| $\alpha_1,\alpha_2>0$, $\alpha_1+\alpha_2=\alpha$ | répartition du risque entre les deux queues | Ex. 1.6, p. 16 |
| $L_n(S_n^2,\alpha_1,\alpha_2)$ | longueur de l'intervalle pour $\sigma^2$ | Ex. 1.6, p. 16 |
| $I_1$, $I_2$ | intervalles de niveau $1-\alpha/2$ pour $\mu$ et $\sigma^2$ | Ex. 1.7, p. 16 |
| $T$, $V$, $N$ | $T=\sqrt n(\bar X_n-\mu)/S_n$, $V=(n-1)S_n^2/\sigma^2$, $N=\sqrt n(\bar X_n-\mu)/\sigma$ | Ex. 1.7, p. 16–17 |
| $\mathcal{B}\mathrm{er}(\theta)$ | loi de Bernoulli | Ex. 1.8, p. 17 |
| $\delta_{n,\alpha}$, $\delta(\alpha,n)$ | demi-largeurs (Bienaymé-Tchebychev, Hoeffding) | Ex. 1.8, p. 18 |
| $\mathcal{I}^\star_{n,\alpha}$, $\lvert\mathcal{I}\rvert$ | intervalle de Hoeffding ; longueur | Ex. 1.8, p. 18 |
| $(\Theta_0,\Theta_1)$ | partition de $\Theta$ | §2.2, p. 19 |
| $H_0:\theta\in\Theta_0$, $H_1:\theta\in\Theta_1$ | hypothèse nulle, hypothèse alternative | §2.2, p. 19 |
| $\phi:\mathsf{Z}\to\{0,1\}$ | test pur | Déf. 2.1, p. 19 |
| $\mathcal{R}:=\{z\in\mathsf{Z},\ \phi(z)=1\}$, $\mathcal{A}:=\mathsf{Z}\setminus\mathcal{R}$ | région de rejet (critique), région d'acceptation | Déf. 2.1, p. 20 |
| $T(Z)$, $c$ | statistique de test, valeur critique | p. 20 |
| $\mathbb{1}_{\{\bar X_n\ge c_\alpha\}}$ | indicatrice | Ex. 2.1, p. 20 |
| $c_\alpha$ | valeur critique d'un test de niveau $\alpha$ | Ex. 2.1, p. 20 |
| $S_n:=\sum_{i=1}^nX_i$ | nombre de suffrages favorables (sondage) | Ex. 2.2, p. 21 |
| $\beta_\phi:\Theta\to[0,1]$ | fonction puissance | Déf. 2.2, p. 21 |
| $\overline{\alpha}(\phi):=\sup_{\theta\in\Theta_0}\beta_\phi(\theta)$ | taille du test | Déf. 2.3, p. 21 |
| $\phi_c$ | test de valeur critique $c$ | Ex. 2.3, p. 22 |
| $\mathrm{Bin}(n,\theta)$ | loi binomiale | Ex. 2.5, p. 23 |
| $U_i$, $A_i:=\mathbb{1}_{\{U_i\le\theta\}}$, $B_i:=\mathbb{1}_{\{U_i\le\vartheta\}}$ | couplage | Ex. 2.5, p. 24 |
| $H_0'$, $H_1'$, $\mathcal{R}'$ | hypothèses échangées, région de rejet associée | Ex. 2.6, p. 25 |
| $\mu_0$ | seuil légal (80 dB) / valeur testée | Ex. 2.8, p. 27 |
| $t^-_\alpha$, $t^+_\alpha$, $\hat I_\alpha$ | bornes d'acceptation du pivot, région de confiance associée | §2.6, p. 28 |
| $\phi_\alpha$, $\mathcal{R}_\alpha$ | famille de tests indexée par le niveau | Ex. 2.10, p. 28 ; Déf. 2.4, p. 30 |
| $\hat\alpha(Z)$ | $p$-valeur | Déf. 2.4, p. 30 |
| $\beta_0,\beta_1,\sigma^2$ ; $\hat\beta_0,\hat\beta_1,\hat\sigma^2$ | paramètres de la régression ; estimateurs des moindres carrés | Ex. 2.15, p. 33 |
| $t_i$, $\bar t$, $s$ | $t_i=\text{année}_i-1979$, moyenne, variance empirique des $t_i$ ($ns=\sum(t_i-\bar t)^2$) | Ex. 2.15, p. 33 |
| $F$, $F^\leftarrow(\beta):=\inf\{t\in\mathbb{R},\ F(t)\ge\beta\}$ | fonction de répartition, fonction quantile (inverse généralisée) | Déf. 3.1, p. 35 |
| $F_{\mathrm{t}(k)}$, $F_{\chi^2(k)}$ | fonctions de répartition de Student et du $\chi^2$ | p. 36 |
| $\mathrm{F}(k_1,k_2)$ | loi de Fisher | Déf. 3.2, p. 37 |
| $\delta$ | paramètre de non-centralité (Student non centrale) | Déf. 3.2, p. 37 |
| $[a_i,b_i]$ | support presque sûr de $X_i$ (Hoeffding) | Th. 3.1, p. 37 |
| $m$ | espérance commune (Cor. 3.1) | Cor. 3.1, p. 37 |
| $\theta_0$, $\alpha$, $n=10$, $\sum X_i=28{,}1$ | données de l'Exercice 1 | Exercice 1, p. 39–40 |
| $\hat\theta_n^{\mathrm{MV}}$ | estimateur du maximum de vraisemblance | Corrigé Ex. 1, p. 46 |
| $\mathbf{1}$, $\Pi$, $\mathrm{I}_n$ | vecteur constant, projection orthogonale sur $\mathbb{R}\mathbf{1}$, identité | Exercice 2, p. 41 ; corrigé p. 49 |
| $\tilde T(Z)$, $\tilde\phi_c$ | statistique / test de Student (Exercice 2) | Exercice 2, p. 41 |
| $\gamma$ | paramètre de non-centralité dans le corrigé de l'Exercice 2 | Corrigé Ex. 2, p. 49 |
| $I_{a,b}:=[X_{n:n}/a,X_{n:n}/b]$ | intervalles candidats (Exercice 3) | Corrigé Ex. 3, p. 50 |
| $\mathrm{Poi}(\theta)$ | loi de Poisson | Exercice 4, p. 42 |
| $\hat\mu_{0,n}$, $\hat\mu_{1,p}$, $\hat\sigma^2_{n,p}$, $S^2_{n,p}$ | estimateurs à deux échantillons | Corrigé Ex. 5, p. 51 |
| $\mathrm{f}_{1-\alpha}(k_1,k_2)$ | quantile d'ordre $1-\alpha$ de $\mathrm{F}(k_1,k_2)$ | Corrigé Ex. 5, p. 52 |
| $p_0$, $\theta_0=np_0$ | risque de référence (vaccin) | Exercice 6, p. 44 |
| $R_i$, $W_{n,m}:=\sum_{i=1}^nR_i$, $\mathcal{S}_N$ | rangs, statistique de Wilcoxon, groupe symétrique | Exercice 7, p. 45 |
| $\mathbb{P}_0$, $\mathbb{E}_0$, $\mathrm{Var}_0$, $\mathrm{Cov}_0$ | lois/moments sous $H_0$ (Wilcoxon) | Exercice 7, p. 45 |
| $\Theta_0^\nu:=\{\theta,\ g(\theta)=\nu\}$, $S(z)$ | hypothèse nulle indexée par $\nu$, région duale | Compléments, p. 55 |
| $\gamma_\theta(\varepsilon)$, $\gamma(\varepsilon)$, $y_\alpha$, $v^2(\Theta_0)$ | inégalité de déviation, seuil, variance maximale sous $H_0$ | Compléments, p. 56 |
| $\varphi_Y(\lambda)$, $\psi_Y$, $h_Y(a)$ | transformée de Laplace, sa log, transformée de Cramér | Th. 5.1, p. 57 |

---

## 2. Cours — contenu principal

### Remarque (introduction, non numérotée) — Que dire de plus qu'une valeur estimée ?
**Source :** Poly ch.4, introduction et §« Que dire de plus qu'une valeur estimée ? », p. 7–8
**Hypothèses :** cadre des chapitres 2–3 (estimateurs ponctuels, risque quadratique).
**Énoncé :** Un estimateur rend un **nombre** (fréquence empirique 0,53 ; bruit moyen 82 dB) qui ne dit rien, à lui seul, de sa précision. Le risque quadratique donne une telle information, mais il **dépend du paramètre inconnu** et n'est pas calculable à partir des observations. Deux réponses, traitées successivement :
1. rendre un **ensemble de valeurs** (intervalle, région) contenant la quantité inconnue avec probabilité au moins $1-\alpha$, **pour toute valeur du paramètre** (régions de confiance, §1) ;
2. répondre à une **question binaire** sur le paramètre (« l'espérance dépasse-t-elle le seuil réglementaire ? », « le nouveau traitement fait-il mieux que l'ancien ? ») en contrôlant les taux d'erreur sous les hypothèses de modélisation (tests, §2).

Les deux constructions reposent sur les mêmes outils probabilistes ; la **dualité** régions de confiance / tests est traitée dans les compléments (§5).
**Preuve (étapes) :** sans objet.
**Intuition :** passer d'une estimation « nue » à une estimation assortie d'une marge garantie, ou à une décision assortie d'un taux d'erreur garanti.

---

### Définition 1.1 — Région de confiance
**Source :** Poly ch.4, Définition 1.1, p. 9
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique ; $g:\Theta\to\mathbb{R}^p$ ; $\alpha\in\,]0,1[$.
**Énoncé :** Une fonction $\mathcal{C}:\mathsf{Z}\to\mathcal{B}(\mathbb{R}^p)$ est une **région de confiance au niveau de couverture $1-\alpha$** pour $g(\theta)$ si
- (i) pour tout $\theta\in\Theta$, $\{z\in\mathsf{Z},\ g(\theta)\in\mathcal{C}(z)\}\in\mathcal{Z}$ ;
- (ii) on a
$$\inf_{\theta\in\Theta}\mathbb{P}_\theta\big(\{g(\theta)\in\mathcal{C}(Z)\}\big)\ge 1-\alpha .$$

**Commentaire du poly :** (i) est une condition de **mesurabilité** (sans elle la probabilité de (ii) n'aurait pas de sens) ; (ii) porte un « **pour tout $\theta$** » écrit sous forme d'**infimum** : la garantie doit valoir en chaque point de l'espace des paramètres.
**Preuve (étapes) :** sans objet (définition).
**Intuition :** on remplace l'estimateur $T(Z)$ par une région $\mathcal{C}(Z)$ construite sur les observations, qui contient $g(\theta)$ avec une probabilité garantie, quelle que soit la valeur (inconnue) du paramètre.
**Pièges / erreurs classiques :** oublier l'infimum (une couverture $\ge 1-\alpha$ en **un** $\theta$ ne suffit pas) ; la Déf. 1.1 étend la « définition minimale » d'intervalle de confiance du chapitre 2 (§2) aux régions de $\mathbb{R}^p$.

---

### Remarque (p. 9, non numérotée) — Qui est aléatoire ?
**Source :** Poly ch.4, paragraphe « Qui est aléatoire ? », p. 9
**Hypothèses :** $\mathcal{C}(Z)$ région de confiance de niveau $1-\alpha$ pour $g(\theta)$.
**Énoncé :** L'interprétation spontanée « $g(\theta)$ a une probabilité $1-\alpha$ d'appartenir à $\mathcal{C}(Z)$ » est **erronée** : le paramètre $\theta$ est **déterministe et fixé** ; l'aléa porte sur l'observation $Z$, donc sur la région $\mathcal{C}(Z)$, qui est une **statistique à valeurs ensemblistes**. Ce qui est garanti : sous $\mathbb{P}_\theta$, « *cette région aléatoire $\mathcal{C}(Z)$ a une probabilité au moins égale à $1-\alpha$ de contenir $g(\theta)$* », quel que soit $\theta\in\Theta$.
De même, une **réalisation numérique** ne se lit pas comme une probabilité : si sur un jeu de données la région obtenue est $[0,2]$, il ne faut **surtout pas** conclure que $\mathbb{P}_\theta(g(\theta)\in[0,2])\ge 1-\alpha$ : cette assertion n'a pas de sens, ses deux membres étant déterministes.
**Preuve (étapes) :** sans objet.
**Intuition (bloc « Intuition » du poly) :** expérience de pensée — répéter l'expérience $N$ fois indépendamment pour un même $\theta$ donne $Z^{(1)},\dots,Z^{(N)}$ et $N$ régions $\mathcal{C}(Z^{(1)}),\dots,\mathcal{C}(Z^{(N)})$ ; la proportion de régions contenant $g(\theta)$ **converge** (loi des grands nombres) vers $\mathbb{P}_\theta(g(\theta)\in\mathcal{C}(Z))\ge 1-\alpha$. C'est l'**interprétation fréquentiste** du niveau de couverture : elle porte sur la **procédure répétée**, non sur le résultat d'une expérience particulière.
**Figure (p. 10) :** 50 répétitions, $n=25$, $\alpha=0{,}10$, intervalles $[\bar X_n\pm z_{1-\alpha/2}\sigma/\sqrt n]$ ; 3 intervalles sur 50 (en orange) ne contiennent pas $\mu$ ; le nombre d'intervalles manquants fluctue autour de $\alpha\times 50=5$.
**Pièges / erreurs classiques :** Question courte n°2 de la feuille (« Vrai ou faux : si l'IC calculé vaut $[0,2]$, alors $\mathbb{P}_\theta(\theta\in[0,2])\ge 1-\alpha$ ») : **faux / sans objet**.

---

### Définition (p. 10, non numérotée) — Intervalles de confiance : trois formes ($p=1$)
**Source :** Poly ch.4, p. 10
**Hypothèses :** $p=1$.
**Énoncé :** La région de confiance est le plus souvent un **intervalle de confiance**, de l'une des trois formes :
- (i) $\mathcal{C}(Z)=[m(Z),+\infty[$ : $m(Z)$ est une **borne inférieure de confiance** ;
- (ii) $\mathcal{C}(Z)=]-\infty,M(Z)]$ : $M(Z)$ est une **borne supérieure de confiance** ;
- (iii) $\mathcal{C}(Z)=[m(Z),M(Z)]$ est un **intervalle de confiance bilatéral**.

Les bornes $m$ et $M$ sont des **statistiques** (fonctions mesurables des observations).
**Preuve (étapes) :** sans objet.
**Intuition :** borne unilatérale quand seule une direction intéresse (p. ex. garantir que $\theta$ est au moins…).

---

### Définition 1.2 — Fonction pivotale
**Source :** Poly ch.4, Définition 1.2, p. 10–11
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique **paramétrique** avec $\Theta\in\mathcal{B}(\mathbb{R}^d)$.
**Énoncé :** Une fonction
$$G:(\mathsf{Z}\times\Theta,\ \mathcal{Z}\otimes\mathcal{B}(\mathbb{R}^d))\to(\mathbb{R}^p,\mathcal{B}(\mathbb{R}^p)),\qquad (z,\theta)\mapsto G(z,\theta),$$
est dite **pivotale**, ou est appelée un **pivot**, si
- (i) pour tout $\theta\in\Theta$, la fonction $z\mapsto G(z,\theta)$ est mesurable ;
- (ii) pour tous $\theta,\vartheta\in\Theta$, la loi image de $\mathbb{P}_\theta$ par $G(\cdot,\theta)$ coïncide avec la loi image de $\mathbb{P}_\vartheta$ par $G(\cdot,\vartheta)$ :
$$\mathbb{P}_\theta\big(G(Z,\theta)\in A\big)=\mathbb{P}_\vartheta\big(G(Z,\vartheta)\in A\big)\qquad\text{pour tout }A\in\mathcal{B}(\mathbb{R}^p).$$

On note $\mathbb{Q}$ la **loi commune** de $G(Z,\theta)$ sous $\mathbb{P}_\theta$ ; elle ne dépend pas de $\theta$.
**Preuve (étapes) :** sans objet (définition).
**Intuition :** on cherche une fonction des observations **et** du paramètre dont la loi est connue et ne dépend pas du paramètre : c'est le seul ingrédient nécessaire, la garantie de couverture s'en déduit mécaniquement.
**Pièges / erreurs classiques :** voir la Remarque suivante — un pivot **dépend** de $\theta$ ; c'est sa **loi** qui n'en dépend pas. Noter la mesurabilité **conjointe** exigée ($\mathcal{Z}\otimes\mathcal{B}(\mathbb{R}^d)$), utilisée dans la preuve de la Prop. 1.1.

---

### Remarque (après Déf. 1.2) — Un pivot n'est pas une statistique
**Source :** Poly ch.4, Remarque, p. 11
**Hypothèses :** celles de la Déf. 1.2.
**Énoncé :** La condition (ii) ne dit **pas** que $G$ ne dépend pas de $\theta$ : si c'était le cas, $G$ serait une statistique et la construction qui suit ne donnerait rien. Elle dit que le paramètre entre dans $G$ de telle façon que son effet sur la loi des observations **se compense exactement** : $G(Z,\theta)$, calculée sous $\mathbb{P}_\theta$, a la même loi pour tout $\theta$. C'est une propriété **conjointe de la fonction et du modèle**, pas de la seule fonction.
**Preuve (étapes) :** sans objet.
**Intuition :** penser à une « normalisation » qui annule l'effet de $\theta$ (translation : $X-\theta$ ; échelle : $X/\theta$ ou $\theta X$ ; standardisation gaussienne).
**Pièges / erreurs classiques :** Question courte n°3 : « La condition qui caractérise un pivot signifie-t-elle que $G$ ne dépend pas du paramètre ? » — **Non**.

---

### Exemple 1.1 — Modèle exponentiel
**Source :** Poly ch.4, Exemple 1.1, p. 11
**Hypothèses :** $X$ une observation du modèle $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{E}(\theta),\ \theta\in\Theta:=\mathbb{R}_+^*\}\big)$, $\mathcal{E}(\theta)$ = loi exponentielle **d'intensité** $\theta$, densité $x\mapsto\theta e^{-\theta x}$ sur $\mathbb{R}_+$.
**Énoncé :** $G(X,\theta):=\theta X$ est pivotale, de loi $\mathcal{E}(1)$ sous $\mathbb{P}_\theta$ pour tout $\theta$.
**Preuve (étapes) :**
1. Pour $t>0$ : $\mathbb{P}_\theta(X>t)=\int_t^{+\infty}\theta e^{-\theta x}\,\mathrm{d}x=e^{-\theta t}$ (calcul direct de la fonction de survie).
2. Donc $\mathbb{P}_\theta(\theta X>t)=\mathbb{P}_\theta(X>t/\theta)=e^{-t}=\mathbb{P}(\mathcal{E}(1)>t)$ (car $\theta>0$).
3. La fonction de survie (donc la loi) de $\theta X$ ne dépend pas de $\theta$ : $G$ est pivotale.

**Méthodes mobilisées :** vérification directe par la fonction de répartition (de survie) ; pivot d'échelle.
**Intuition :** $\theta$ est un paramètre d'échelle (inverse) ; multiplier par $\theta$ « renormalise ».

---

### Exemple 1.2 — Modèle uniforme
**Source :** Poly ch.4, Exemple 1.2, p. 11
**Hypothèses :** $X$ une observation du modèle $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{U}([0,\theta]),\ \theta\in\Theta:=\mathbb{R}_+^*\}\big)$.
**Énoncé :** $G(X,\theta):=X/\theta$ est pivotale, de loi $\mathcal{U}([0,1])$ sous $\mathbb{P}_\theta$ pour tout $\theta$.
**Preuve (étapes) :**
1. Pour $t\in[0,\theta]$, $\mathbb{P}_\theta(X\le t)=t/\theta$ (loi uniforme).
2. Pour $u\in[0,1]$ : $\mathbb{P}_\theta(X/\theta\le u)=\mathbb{P}_\theta(X\le u\theta)=u=\mathbb{P}(\mathcal{U}([0,1])\le u)$.
3. Loi indépendante de $\theta$ : $G$ pivotale.

**Méthodes mobilisées :** fonction de répartition ; pivot d'échelle.
**Intuition :** même mécanisme que l'Ex. 1.1 ; repris à l'Ex. 1.3 et, avec $X_{n:n}$, à l'Exercice 3.

---

### Proposition 1.1 — Région de confiance associée à un pivot
**Source :** Poly ch.4, Proposition 1.1, p. 11 (démonstration p. 12)
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique avec $\Theta\in\mathcal{B}(\mathbb{R}^d)$ ; $G:\mathsf{Z}\times\Theta\to\mathbb{R}^p$ fonction pivotale ; $\mathbb{Q}$ la loi de $G(Z,\theta)$ sous $\mathbb{P}_\theta$ ; $\alpha\in\,]0,1[$ ; $A_\alpha\in\mathcal{B}(\mathbb{R}^p)$ tel que $\mathbb{Q}(A_\alpha)\ge 1-\alpha$.
**Énoncé :** La région définie pour tout $z\in\mathsf{Z}$ par
$$\mathcal{C}(z):=\{\theta\in\Theta,\ G(z,\theta)\in A_\alpha\}$$
est une région de confiance au niveau de couverture $1-\alpha$ pour $\theta$, c'est-à-dire pour $g=\mathrm{Id}$, avec $p=d$.
**Preuve (étapes) :**
1. *$\mathcal{C}$ est à valeurs boréliennes.* Pour $z$ fixé, $\mathcal{C}(z)$ est la **section en $z$** de $G^{-1}(A_\alpha)$, qui appartient à $\mathcal{Z}\otimes\mathcal{B}(\Theta)$ (par **mesurabilité conjointe** de $G$) ; une section d'un ensemble mesurable produit est mesurable, donc $\mathcal{C}(z)$ est un borélien de $\Theta$, et $\mathcal{C}$ est à valeurs dans $\mathcal{B}(\mathbb{R}^d)$.
2. *Condition (i) de la Déf. 1.1.* Pour $\theta$ fixé, par définition de $\mathcal{C}$, $\{z\in\mathsf{Z},\ \theta\in\mathcal{C}(z)\}=\{z\in\mathsf{Z},\ G(z,\theta)\in A_\alpha\}$, qui appartient à $\mathcal{Z}$ car $z\mapsto G(z,\theta)$ est mesurable (Déf. 1.2 (i)) et $A_\alpha\in\mathcal{B}(\mathbb{R}^p)$.
3. *Couverture.* $\mathbb{P}_\theta(\theta\in\mathcal{C}(Z))=\mathbb{P}_\theta(G(Z,\theta)\in A_\alpha)=\mathbb{Q}(A_\alpha)\ge 1-\alpha$, le membre du milieu ne dépendant pas de $\theta$ **puisque $G$ est pivotale**.
4. *Condition (ii).* En prenant l'infimum sur $\theta\in\Theta$, $\inf_\theta\mathbb{P}_\theta(\theta\in\mathcal{C}(Z))\ge 1-\alpha$. $\square$

**Intuition :** construire une région à partir d'un pivot est « presque automatique » : choisir un ensemble de probabilité $\ge 1-\alpha$ sous la loi du pivot, puis **résoudre** l'appartenance en $\theta$.
**Pièges / erreurs classiques :** la couverture est **exactement** $\mathbb{Q}(A_\alpha)$ pour **tout** $\theta$ (et pas seulement minorée en inf) ; si $\mathbb{Q}(A_\alpha)=1-\alpha$, la région est de niveau exact.

---

### Méthode 1.1 — Construction d'une région de confiance par un pivot
**Source :** Poly ch.4, Méthode 1.1, p. 12
**Hypothèses :** $1-\alpha\in\,]0,1[$ niveau de couverture visé.
**Énoncé :**
1. Exhiber une fonction pivotale $G:\mathsf{Z}\times\Theta\to\mathbb{R}^p$ pour le modèle $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$.
2. Identifier la loi $\mathbb{Q}$ de $G(Z,\theta)$ sous $\mathbb{P}_\theta$, qui ne dépend pas de $\theta$.
3. Choisir $A_\alpha\in\mathcal{B}(\mathbb{R}^p)$ tel que $\mathbb{Q}(A_\alpha)\ge 1-\alpha$.
4. Résoudre en $\theta$ l'appartenance $G(Z,\theta)\in A_\alpha$ : l'ensemble des solutions $\mathcal{C}(Z)=\{\theta\in\Theta,\ G(Z,\theta)\in A_\alpha\}$ est une région de confiance de niveau de couverture $1-\alpha$.

**Commentaire du poly :** en général, on **redéroule** cette méthode sur le modèle considéré plutôt que d'en appliquer la conclusion comme un résultat tout fait : c'est l'**étape 4** (la résolution en $\theta$) qui change d'un modèle à l'autre et qui donne à l'intervalle sa forme.
**Preuve (étapes) :** c'est la Prop. 1.1.
**Intuition :** quatre étapes à savoir réciter (Question courte n°4).

---

### Remarque (p. 12, non numérotée) — Le choix de $A_\alpha$
**Source :** Poly ch.4, paragraphe « Le choix de $A_\alpha$ », p. 12 (et bloc Intuition)
**Hypothèses :** $p=1$ ; $q_\beta$ quantile d'ordre $\beta$ de $\mathbb{Q}$ (Section 3), qui ne dépend pas de $\theta$.
**Énoncé :** $A_\alpha$ n'est **pas unique** ; toute partie de probabilité au moins $1-\alpha$ sous $\mathbb{Q}$ convient. Trois choix reviennent :
$$A_\alpha=]-\infty,q_{1-\alpha}],\qquad A_\alpha=[q_\alpha,+\infty[,\qquad A_\alpha=\big]q_{\alpha/2},q_{1-\alpha/2}\big],$$
les deux premiers donnant une **borne de confiance unilatérale**, le troisième un **intervalle bilatéral**. Plus généralement, pour tous $0\le p_1<p_2\le 1$ avec $p_2-p_1=1-\alpha$, $A_\alpha=]q_{p_1},q_{p_2}]$ convient. Le choix de la paire est guidé par la **question posée** (on ne cherche parfois qu'une borne inférieure) ou par le souhait de **minimiser la longueur** de l'intervalle.
**Preuve (étapes) :** sans objet.
**Intuition (bloc du poly) :** le choix symétrique $p_1=\alpha/2$, $p_2=1-\alpha/2$ est une **convention**, pas une obligation théorique ; il donne l'intervalle le plus court lorsque la densité de $\mathbb{Q}$ est **paire et unimodale** ($\mathcal{N}(0,1)$, Student). Pour une loi dissymétrique, l'intervalle le plus court n'est plus symétrique : loi uniforme (intervalle optimal entièrement décalé d'un côté, Exercice 3) ; loi du $\chi^2$ (optimum seulement approximativement atteint par le choix symétrique).
**Pièges / erreurs classiques :** croire que l'intervalle symétrique en probabilité est toujours optimal.

---

### Exemple 1.3 — Modèle uniforme : borne inférieure de confiance
**Source :** Poly ch.4, Exemple 1.3, p. 13 (§1.3 « Mise en pratique »)
**Hypothèses :** modèle de l'Ex. 1.2 ; $X/\theta\sim\mathcal{U}([0,1])$ sous $\mathbb{P}_\theta$.
**Énoncé :** $X/(1-\alpha)$ est une **borne inférieure de confiance** de niveau $1-\alpha$ pour $\theta$ :
$$\mathbb{P}_\theta\Big(\theta\in\Big[\frac{X}{1-\alpha},+\infty\Big[\Big)=1-\alpha\qquad\text{pour tout }\theta\in\mathbb{R}_+^*.$$
**Preuve (étapes) :**
1. Choix $A_\alpha=[0,1-\alpha]$, de probabilité $1-\alpha$ sous $\mathcal{U}([0,1])$ (étape 3 de la Méthode 1.1).
2. $\mathbb{P}_\theta(X/\theta\le 1-\alpha)=1-\alpha$ pour tout $\theta$ (pivot, Ex. 1.2).
3. Résolution en $\theta$ : puisque $\theta>0$ et $1-\alpha>0$, $X/\theta\le 1-\alpha\iff\theta\ge X/(1-\alpha)$.

**Méthodes mobilisées :** Méthode 1.1 (pivot), inversion d'inégalité.
**Intuition :** c'est le **seul endroit du chapitre** où l'une des formes unilatérales est effectivement construite dans le cours.

---

### Exemple 1.4 — Intervalle de confiance pour la moyenne, variance connue
**Source :** Poly ch.4, Exemple 1.4, p. 13 (§1.4 « Le cas gaussien »)
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\mu,\sigma^2),\ \mu\in\mathbb{R}\}\big)$, la variance $\sigma^2>0$ étant **connue**.
**Énoncé :**
$$G(X_1,\dots,X_n;\mu):=\sqrt n\,\frac{\bar X_n-\mu}{\sigma},\qquad \bar X_n:=n^{-1}\sum_{i=1}^nX_i,$$
est pivotale, de loi $\mathcal{N}(0,1)$, et
$$\mathcal{I}_{n,\alpha}:=\Big[\bar X_n\pm z_{1-\alpha/2}\frac{\sigma}{\sqrt n}\Big]$$
est un intervalle de confiance **bilatéral** de niveau de couverture (exactement) $1-\alpha$ pour $\mu$. Sa longueur vaut $2\sigma z_{1-\alpha/2}/\sqrt n$ : elle **décroît en $n^{-1/2}$** à niveau fixé et **croît indéfiniment lorsque $\alpha\to 0$** à $n$ fixé.
**Preuve (étapes) :**
1. Sous $\mathbb{P}_\mu$, $\bar X_n\sim\mathcal{N}(\mu,\sigma^2/n)$ (somme de gaussiennes indépendantes), donc $G\sim\mathcal{N}(0,1)$ pour tout $\mu$ : $G$ pivotale.
2. Notations : $\Phi$ f.d.r. de $\mathcal{N}(0,1)$ ; $z_\beta$ quantile d'ordre $\beta$, $\Phi(z_\beta)=\beta$. Par **symétrie** de $\mathcal{N}(0,1)$, $z_{\alpha/2}=-z_{1-\alpha/2}$.
3. $\mathbb{P}_\mu\big(G\in[-z_{1-\alpha/2},z_{1-\alpha/2}]\big)=\Phi(z_{1-\alpha/2})-\Phi(-z_{1-\alpha/2})=1-\alpha$.
4. Résolution en $\mu$ : $\mathbb{P}_\mu\big(\mu\in[\bar X_n\pm z_{1-\alpha/2}\sigma/\sqrt n]\big)=1-\alpha$ pour tout $\mu\in\mathbb{R}$.

**Méthodes mobilisées :** Méthode 1.1 (pivot gaussien), symétrie de la loi normale.
**Intuition (bloc du poly) :** $n$ et $\alpha$ jouent l'un contre l'autre — compromis central du chapitre. Exiger une garantie plus forte ($\alpha\downarrow$) augmente le quantile donc allonge l'intervalle : une région plus sûre est moins informative ($\mathbb{R}$ tout entier est de niveau 1 sans rien apprendre). Augmenter $n$ raccourcit l'intervalle à garantie constante. On retrouvera ce compromis côté tests, entre **taille** et **puissance**.

---

### Remarque (p. 14) — Valeurs classiques des quantiles gaussiens
**Source :** Poly ch.4, Remarque, p. 14
**Énoncé :** $z_{1-\alpha/2}\simeq 1{,}96$ pour $\alpha=0{,}05$ et $z_{1-\alpha/2}\simeq 2{,}576$ pour $\alpha=0{,}01$. D'où l'approximation « $\pm 2\sigma/\sqrt n$ » souvent utilisée pour un intervalle de confiance à 95 %.
**Preuve (étapes) :** valeurs tabulées.
**Intuition :** voir aussi la liste des valeurs usuelles dans les Outils (p. 36) : $z_{0,95}=1{,}645$, $z_{0,975}=1{,}96$, $z_{0,99}=2{,}326$, $z_{0,995}=2{,}576$, $z_{0,999}=3{,}090$.
**Pièges / erreurs classiques :** bilatéral à 95 % $\Rightarrow$ $z_{0,975}=1{,}96$ ; unilatéral à 95 % $\Rightarrow$ $z_{0,95}=1{,}645$.

---

### Remarque (p. 14, non numérotée) — Variance inconnue : rappel du théorème de Gosset
**Source :** Poly ch.4, p. 14
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon de $\mathcal{N}(\mu,\sigma^2)$, $n\ge 2$.
**Énoncé :** Le pivot de l'Ex. 1.4 n'en est plus un si $\sigma$ est inconnue ($\sigma$ n'est pas calculable à partir des observations). On remplace $\sigma$ par $S_n$, racine de
$$S_n^2:=\frac{1}{n-1}\sum_{i=1}^n(X_i-\bar X_n)^2,$$
estimateur sans biais de $\sigma^2$ (chapitre 3, Exemple 1.4). **Théorème de Gosset** (chapitre 1, énoncé et démontré) : $\bar X_n$ et $S_n^2$ sont **indépendantes**, $\bar X_n\sim\mathcal{N}(\mu,\sigma^2/n)$, $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$, et en conséquence, par définition de la loi de Student,
$$T_n:=\sqrt n\,\frac{\bar X_n-\mu}{S_n}\sim\mathrm{t}(n-1),$$
où $\mathrm{t}(k)$ est la loi de Student à $k$ degrés de liberté (chapitre 1, Définition 12).
**Preuve (étapes) :** admise ici (renvoi au chapitre 1) ; redémontrée dans l'**Exercice 2** (Q4–Q5) par projection orthogonale et théorème de Cochran.
**Intuition :** $T_n=\dfrac{\sqrt n(\bar X_n-\mu)/\sigma}{\sqrt{[(n-1)S_n^2/\sigma^2]/(n-1)}}$ = $\mathcal{N}(0,1)$ / $\sqrt{\chi^2(n-1)/(n-1)}$ indépendants.

---

### Exemple 1.5 — Intervalle de confiance pour la moyenne, variance inconnue
**Source :** Poly ch.4, Exemple 1.5, p. 14
**Hypothèses :** $(X_1,\dots,X_n)$, $n\ge 2$, $n$-échantillon du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\mu,\sigma^2),\ \theta=(\mu,\sigma^2)\in\Theta:=\mathbb{R}\times\mathbb{R}_+^*\}\big)$.
**Énoncé :** $G(X_1,\dots,X_n;\mu):=\sqrt n(\bar X_n-\mu)/S_n$ est pivotale, de loi $\mathrm{t}(n-1)$ sous $\mathbb{P}_\theta$ pour tout $\theta\in\Theta$, et pour tout $\theta=(\mu,\sigma^2)\in\Theta$,
$$\mathbb{P}_\theta\bigg(\mu\in\Big[\bar X_n\pm S_n\frac{\mathrm{t}^{(n-1)}_{1-\alpha/2}}{\sqrt n}\Big]\bigg)=1-\alpha .$$
**Preuve (étapes) :**
1. Pivot : théorème de Gosset (rappel ci-dessus).
2. La densité de $\mathrm{t}(n-1)$ est **paire et unimodale**, de mode en 0 : cela justifie un intervalle **symétrique** ; parité $\Rightarrow$ $\mathrm{t}^{(n-1)}_{\alpha/2}=-\mathrm{t}^{(n-1)}_{1-\alpha/2}$.
3. $\mathbb{P}_\theta\Big(-\mathrm{t}^{(n-1)}_{1-\alpha/2}\le\sqrt n\,\frac{\bar X_n-\mu}{S_n}\le\mathrm{t}^{(n-1)}_{1-\alpha/2}\Big)=1-\alpha$.
4. Résolution en $\mu$ (multiplier par $S_n/\sqrt n>0$).

**Méthodes mobilisées :** Méthode 1.1 avec pivot de Student (théorème de Gosset).
**Figures (p. 15) :** (a) quantiles d'ordre 0,95 / 0,975 / 0,99 de Student en fonction du nombre de degrés de liberté, comparés à ceux de $\mathcal{N}(0,1)$ : proches pour $n$ de l'ordre de la centaine, nettement plus grands pour $n$ petit ; (b) fonctions quantiles $\beta\mapsto\mathrm{t}^{(k)}_\beta$ pour $k=2,8,32$ vs $\beta\mapsto z_\beta$ ; longueurs pour $\alpha=0{,}05$, $n=32$, $\sigma=1$ : $2z_{0,975}\sigma/\sqrt n=0{,}693$ (variance connue) contre $2\,\mathrm{t}^{(31)}_{0,975}S_n/\sqrt n=0{,}721$ (variance inconnue, représentée pour $S_n=\sigma$), soit **+4,1 %**.
**Intuition (bloc du poly) :** remplacer $\sigma$ par son estimateur $S_n$ introduit une **source d'aléa supplémentaire**, il faut élargir l'intervalle pour conserver la même garantie ; le prix est d'autant plus élevé que $n$ est petit ($S_n$ mal déterminé).
**Pièges / erreurs classiques :** remplacer naïvement $\sigma$ par $S_n$ en gardant $z_{1-\alpha/2}$ donne un intervalle **trop court** (couverture $<1-\alpha$) ; la longueur de l'intervalle de Student est **aléatoire**.
**Point d'histoire (p. 16) :** W. S. Gosset (1876–1937), chimiste chez Guinness à Dublin ; publie en 1908 dans *Biometrika* sous le pseudonyme « Student » la loi de $\sqrt n(\bar X_n-\mu)/S_n$ ; démonstration en partie heuristique ; l'argument géométrique est de Fisher (redémontré à l'Exercice 2).

---

### Exemple 1.6 — Intervalle de confiance pour la variance, espérance inconnue
**Source :** Poly ch.4, Exemple 1.6, p. 16
**Hypothèses :** $(X_1,\dots,X_n)$, $n\ge 2$, $n$-échantillon du modèle $\{\mathcal{N}(\mu,\sigma^2),\ (\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*\}$ ; $\alpha_1,\alpha_2>0$ avec $\alpha_1+\alpha_2=\alpha$.
**Énoncé :** $G(X_1,\dots,X_n;\sigma^2):=\dfrac{(n-1)S_n^2}{\sigma^2}$ est pivotale, de loi $\chi^2(n-1)$ sous $\mathbb{P}_{(\mu,\sigma^2)}$ pour tout $(\mu,\sigma^2)$, et
$$\bigg[\frac{(n-1)S_n^2}{\chi^2_{1-\alpha_2}(n-1)},\ \frac{(n-1)S_n^2}{\chi^2_{\alpha_1}(n-1)}\bigg]$$
est un intervalle de confiance de niveau de couverture $1-\alpha$ pour $\sigma^2$.
**Preuve (étapes) :**
1. Pivot : troisième point du théorème de Gosset.
2. $\mathbb{P}_{\mu,\sigma^2}\Big(\chi^2_{\alpha_1}(n-1)\le\frac{(n-1)S_n^2}{\sigma^2}\le\chi^2_{1-\alpha_2}(n-1)\Big)=1-\alpha$ (f.d.r. continue du $\chi^2$ : la probabilité vaut $(1-\alpha_2)-\alpha_1$).
3. Résolution en $\sigma^2$ : les trois membres étant **strictement positifs**, passer à l'inverse **renverse** l'encadrement.

**Choix de $(\alpha_1,\alpha_2)$ :** non déterminé par $\alpha_1+\alpha_2=\alpha$. Si $L_n(S_n^2,\alpha_1,\alpha_2)$ désigne la longueur (une statistique), **on peut montrer** (non démontré dans le poly) qu'il existe une paire $(\alpha_1^*,\alpha_2^*)$ de somme $\alpha$ qui minimise $\mathbb{E}_{\mu,\sigma^2}[L_n(S_n^2,\alpha_1,\alpha_2)]$ simultanément pour tout $(\mu,\sigma^2)$, et que $\alpha_1^*\simeq\alpha_2^*\simeq\alpha/2$ pour $n$ grand. En pratique : $\alpha_1=\alpha_2=\alpha/2$.
**Méthodes mobilisées :** Méthode 1.1, pivot du $\chi^2$, inversion d'encadrement de quantités positives.
**Intuition :** l'intervalle n'est pas symétrique autour de $S_n^2$ car la loi du $\chi^2$ ne l'est pas.
**Pièges / erreurs classiques :** inverser l'ordre des quantiles : le quantile **haut** $\chi^2_{1-\alpha_2}$ va au **dénominateur de la borne inférieure**. Ne pas écrire $\chi^2_{\alpha/2}=-\chi^2_{1-\alpha/2}$ (pas de symétrie).

---

### Exemple 1.7 — Région de confiance pour le couple $(\mu,\sigma^2)$
**Source :** Poly ch.4, Exemple 1.7, p. 16–17
**Hypothèses :** $(X_1,\dots,X_n)$, $n\ge 2$, $n$-échantillon du modèle $\{\mathcal{N}(\mu,\sigma^2),\ (\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*\}$ ; ici $p=2>1$ dans la Déf. 1.1.
**Énoncé :**
*(a) Région produit par sous-additivité.* Avec
$$I_1(X_1,\dots,X_n):=\Big[\bar X_n\pm S_n\frac{\mathrm{t}^{(n-1)}_{1-\alpha/4}}{\sqrt n}\Big],\qquad I_2(X_1,\dots,X_n):=\bigg[\frac{(n-1)S_n^2}{\chi^2_{1-\alpha/4}(n-1)},\ \frac{(n-1)S_n^2}{\chi^2_{\alpha/4}(n-1)}\bigg],$$
intervalles de niveau $1-\alpha/2$ pour $\mu$ et $\sigma^2$ (Ex. 1.5 et 1.6), $I_1\times I_2$ est une région de confiance de niveau de couverture **au moins** $1-\alpha$ pour $(\mu,\sigma^2)$.
*(b) Région de niveau exact.* $G(Z;\mu,\sigma^2):=\Big(\sqrt n\,\dfrac{\bar X_n-\mu}{\sigma},\ \dfrac{(n-1)S_n^2}{\sigma^2}\Big)$ est pivotale de loi $\mathcal{N}(0,1)\otimes\chi^2(n-1)$ ; avec
$$A_\alpha:=\big[-z_{1-\alpha/4},z_{1-\alpha/4}\big]\times\big[\chi^2_{\alpha/4}(n-1),\chi^2_{1-\alpha/4}(n-1)\big],$$
la région
$$\mathcal{C}(Z)=\Big\{(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*:\ |\bar X_n-\mu|\le\frac{\sigma z_{1-\alpha/4}}{\sqrt n}\ \text{ et }\ \frac{(n-1)S_n^2}{\chi^2_{1-\alpha/4}(n-1)}\le\sigma^2\le\frac{(n-1)S_n^2}{\chi^2_{\alpha/4}(n-1)}\Big\}$$
est une région de confiance de niveau de couverture **exactement** $(1-\alpha/2)^2=1-\alpha+\alpha^2/4$.
**Preuve (étapes) :**
1. (a) **Sous-additivité** (borne de l'union) : $\mathbb{P}_{\mu,\sigma^2}\big((\mu,\sigma^2)\notin I_1\times I_2\big)\le\mathbb{P}_{\mu,\sigma^2}(\mu\notin I_1)+\mathbb{P}_{\mu,\sigma^2}(\sigma^2\notin I_2)\le\frac\alpha2+\frac\alpha2=\alpha$.
2. Le niveau exact de $I_1\times I_2$ ne se calcule pas simplement : $\{\mu\in I_1\}$ ne dépend que de $T:=\sqrt n(\bar X_n-\mu)/S_n$, $\{\sigma^2\in I_2\}$ que de $V:=(n-1)S_n^2/\sigma^2$, et $T$ et $V$ **ne sont pas indépendantes** puisque $T=N/\sqrt{V/(n-1)}$ avec $N:=\sqrt n(\bar X_n-\mu)/\sigma\sim\mathcal{N}(0,1)$ indépendante de $V$. Le niveau exact vaut $\mathbb{P}_{\mu,\sigma^2}(\{\mu\in I_1\}\cap\{\sigma^2\in I_2\})$, en général **strictement supérieur** à $1-\alpha$ et différent du produit des niveaux.
3. (b) Pivot bivarié : c'est exactement le contenu du théorème de Gosset (lois marginales $\mathcal{N}(0,1)$ et $\chi^2(n-1)$ + **indépendance**).
4. $\mathbb{Q}(A_\alpha)=(1-\alpha/2)\times(1-\alpha/2)$ **par indépendance** des deux composantes.
5. Proposition 1.1 en dimension $p=2$, puis résolution de chaque condition (la première en $\mu$ à $\sigma$ fixé, la seconde en $\sigma^2$).

**Forme de la région exacte :** ce n'est **plus un produit d'intervalles** ; elle est délimitée, dans le plan $(\mu,\sigma^2)$, par deux droites horizontales et par les deux courbes $\mu=\bar X_n\pm\sigma z_{1-\alpha/4}/\sqrt n$.
**Méthodes mobilisées :** sous-additivité (Bonferroni), pivot vectoriel (Prop. 1.1 avec $p=2$), indépendance (Gosset).
**Intuition (bloc du poly) :** la perte est du **second ordre** : $(1-\alpha/2)^2$ au lieu de $1-\alpha$, excédent $\alpha^2/4$ (0,0625 % pour $\alpha=5$ %). Généralisation : pour couvrir simultanément $p$ quantités, $p$ intervalles de niveau $1-\alpha/p$ et leur produit, de niveau $\ge 1-\alpha$ : **correction de Bonferroni**, d'autant plus conservatrice que $p$ est grand (sujet des **tests multiples**).
**Pièges / erreurs classiques :** multiplier les niveaux $(1-\alpha/2)^2$ pour $I_1\times I_2$ en croyant à une indépendance qui n'existe pas (T et V dépendantes).

---

### Exemple 1.8 — Intervalle de confiance pour une proportion
**Source :** Poly ch.4, Exemple 1.8, p. 17–18 (§1.5 « En l'absence de pivot »)
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon du modèle de Bernoulli $\big(\{0,1\},\mathcal{P}(\{0,1\}),\{\mathcal{B}\mathrm{er}(\theta),\ \theta\in\Theta:=[0,1]\}\big)$ ; $\bar X_n=n^{-1}\sum_{i=1}^nX_i$ (fréquence empirique, sans biais).
**Énoncé :** La loi de $\bar X_n$ dépend de $\theta$ autrement que par une translation ou un facteur d'échelle : **aucun pivot explicite**. On utilise une **inégalité de déviation**.
- *Par Bienaymé-Tchebychev* : $\mathcal{I}_{n,\alpha}:=\Big[\bar X_n\pm\dfrac{1}{2\sqrt{n\alpha}}\Big]$ vérifie $\mathbb{P}_\theta(\theta\in\mathcal{I}_{n,\alpha})\ge 1-\alpha$ pour tout $\theta$ ; longueur $|\mathcal{I}_{n,\alpha}|=1/\sqrt{n\alpha}$.
- *Par Hoeffding* : $\mathcal{I}^\star_{n,\alpha}:=\Big[\bar X_n\pm\sqrt{\dfrac{1}{2n}\log\dfrac{2}{\alpha}}\Big]$ est un intervalle de confiance de niveau de couverture $1-\alpha$.
- *Comparaison* : $\dfrac{|\mathcal{I}^\star_{n,\alpha}|}{|\mathcal{I}_{n,\alpha}|}=\sqrt{2\alpha\log(2/\alpha)}$, indépendant de $n$, tend vers 0 quand $\alpha\to 0$ ; vaut 0,61 pour $\alpha=5$ %, 0,33 pour $\alpha=1$ % (« précision trois fois meilleure »).

**Preuve (étapes) :**
1. $\mathrm{Var}_\theta(\bar X_n)=\theta(1-\theta)/n$ (indépendance), et $\sup_{\theta\in\Theta}\mathrm{Var}_\theta(\bar X_n)=\frac{1}{4n}$, le maximum de $\theta\mapsto\theta(1-\theta)$ sur $[0,1]$ étant atteint en $\theta=1/2$.
2. **Bienaymé-Tchebychev** (chapitre 2) : pour tout $\delta>0$, tout $\theta$, $\mathbb{P}_\theta(|\bar X_n-\theta|\ge\delta)\le\dfrac{\mathrm{Var}_\theta(\bar X_n)}{\delta^2}\le\dfrac{1}{4n\delta^2}$.
3. On choisit $\delta_{n,\alpha}$ solution de $1/(4n\delta^2)=\alpha$ : $\delta_{n,\alpha}=1/(2\sqrt{n\alpha})$ ; alors $\mathbb{P}_\theta(\theta\notin\mathcal{I}_{n,\alpha})\le\alpha$.
4. **Hoeffding** (Cor. 3.1, observations dans $[0,1]$) : $\sup_\theta\mathbb{P}_\theta(|\bar X_n-\theta|>\delta)\le 2\exp(-2n\delta^2)$.
5. On choisit $\delta(\alpha,n)$ solution de $2\exp(-2n\delta^2)=\alpha$ : $\delta(\alpha,n)=\sqrt{\log(2/\alpha)/(2n)}$.
6. Rapport : $\dfrac{2\sqrt{\log(2/\alpha)/(2n)}}{1/\sqrt{n\alpha}}=\sqrt{2\alpha\log(2/\alpha)}$ (calcul direct).

**Méthodes mobilisées :** inégalité de Bienaymé-Tchebychev, inégalité de Hoeffding, majoration uniforme de la variance ($\sup_\theta\theta(1-\theta)=1/4$), inversion d'une inégalité de déviation.
**Intuition (bloc du poly) :** Bienaymé-Tchebychev ne mobilise que la variance et paie le niveau en $\alpha^{-1/2}$ ; Hoeffding mobilise le caractère **borné** et ne le paie qu'en $\sqrt{\log(1/\alpha)}$. En contrepartie Hoeffding exige des observations bornées (exclut p. ex. le gaussien à variance inconnue). Ni l'un ni l'autre ne donne l'intervalle **exact** que fournirait la loi binomiale : ce sont des majorations, donc des intervalles **plus longs que nécessaire** (couverture $\ge 1-\alpha$, conservatifs). Même ordre $n^{-1/2}$.
**Pièges / erreurs classiques :** oublier le facteur 2 (bilatéral) dans Hoeffding ; oublier de majorer la variance uniformément en $\theta$ (elle dépend de l'inconnue).

---

### Remarque (p. 18) — Ce qu'il faut retenir de la première moitié
**Source :** Poly ch.4, p. 18
**Énoncé :** (1) Une région de confiance est un **ensemble aléatoire** qui contient la quantité inconnue avec une probabilité au moins $1-\alpha$, **pour toute valeur du paramètre**. (2) La technique la plus courante s'appuie sur une **fonction pivotale**. (3) Le cas **gaussien** est particulièrement important, (4) avec variance connue puis inconnue (Student remplace la loi normale). (5) En l'absence de pivot : **inégalité de concentration**, ou approche **asymptotique** (cours 6).

---

### Remarque (§2.1, non numérotée) — Ce qu'un test cherche à établir
**Source :** Poly ch.4, §2.1, p. 18–19 (et deux Remarques p. 19)
**Hypothèses :** modélisation statistique donnée.
**Énoncé :** Un test fournit une réponse à une **question binaire** sur le paramètre (« $\theta$ est-il inférieur ou supérieur à $\theta_0$ ? »). Questions pratiques : (1) la modification de mon site augmente-t-elle le nombre de visites par jour ? (2) ce nouveau médicament augmente-t-il les chances de survie ? (3) mes données montrent-elles l'existence d'une particule nouvelle ? (4) cette personne est-elle atteinte de la maladie à traiter urgemment ?
Traduction de (1) : (i) visites/jour modélisées par une loi de Poisson de paramètre $\lambda$ ; (ii) $\lambda_0$ (avant modification) supposé connu ; (iii) échantillon du modèle après modification ; (iv) on cherche si le paramètre a augmenté. **Question statistique** : « a-t-on $\lambda\le\lambda_0$ ou $\lambda>\lambda_0$ ? ».
*Remarque 1 :* le passage de la question pratique à la question statistique relève de la **modélisation** (cours 1) ; on ne la discute pas en profondeur, mais « pour comprendre l'approche de Neyman-Pearson, il est indispensable de s'ancrer dans les cas d'usage, afin de percevoir l'**asymétrie des erreurs** ».
*Remarque 2 :* la notion de **preuve statistique** n'a rien d'immédiat. En 2019, plus de 800 scientifiques ont cosigné dans *Nature* l'appel « *Scientists rise up against statistical significance* » (« We [...] call for the entire concept of statistical significance to be abandoned »). Ce qui est en cause n'est pas la théorie (exacte) mais l'**usage** : un seuil conventionnel (5 %) traité comme frontière entre le vrai et le faux. Limites reprises au §2.8.
**Preuve (étapes) :** sans objet.

---

### Définition 2.1 — Test pur
**Source :** Poly ch.4, Définition 2.1, p. 19–20 (§2.2 « Formalisme »)
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique ; $(\Theta_0,\Theta_1)$ **partition** de $\Theta$ ; test d'hypothèses $H_0:\theta\in\Theta_0$ (hypothèse **nulle**) contre $H_1:\theta\in\Theta_1$ (hypothèse **alternative**).
**Énoncé :** Un **test pur** de $H_0:\theta\in\Theta_0$ contre $H_1:\theta\in\Theta_1$ est une fonction **mesurable** $\phi:\mathsf{Z}\to\{0,1\}$. On convient que
- si $\phi(Z)=1$, on **rejette** l'hypothèse nulle $H_0$ ;
- si $\phi(Z)=0$, on **ne rejette pas** l'hypothèse nulle $H_0$.

L'ensemble $\mathcal{R}:=\{z\in\mathsf{Z},\ \phi(z)=1\}$ est la **région de rejet** du test (ou **région critique**), et $\mathcal{A}:=\mathsf{Z}\setminus\mathcal{R}$ est la **région d'acceptation**.
**Preuve (étapes) :** sans objet (définition).
**Intuition :** une statistique à valeurs dans $\{0,1\}$ qui encode la décision.
**Pièges / erreurs classiques (commentaire du poly, p. 20) :** l'usage dit parfois « accepter $H_0$ » ; la formulation prudente est « **ne pas rejeter** $H_0$ », voire « **on échoue à rejeter $H_0$** » (formulation recommandée par l'auteur) : la construction contrôle en priorité la probabilité de rejeter à tort $H_0$ (§2.4), donc « ne pas rejeter » n'établit rien ; on ne peut pas conclure que $H_0$ est vraie, seulement qu'on n'a pas trouvé de preuve suffisante pour la rejeter (« échec » ne signifie pas qu'on souhaitait rejeter).

---

### Définition (p. 20, non numérotée) — Hypothèses simples / composites ; statistique de test, valeur critique
**Source :** Poly ch.4, p. 20
**Énoncé :**
- Lorsque $\Theta_0$ ou $\Theta_1$ est réduit à un **singleton**, on parle d'**hypothèse simple** ; sinon d'**hypothèse composite**.
- Si les deux hypothèses ne recouvrent pas $\Theta$ (p. ex. deux valeurs particulières), on se ramène à la définition en **restreignant le modèle** à $\Theta_0\cup\Theta_1$.
- Pour $\Theta\subseteq\mathbb{R}$, trois tests courants :
  - $H_0:\theta=\theta_0$ contre $H_1:\theta=\theta_1$ (simple contre simple) ;
  - $H_0:\theta=\theta_0$ contre $H_1:\theta\ne\theta_0$ (simple contre composite) ;
  - $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ (composite contre composite).
- Région de rejet fréquente : $\mathcal{R}=\{z\in\mathsf{Z},\ T(z)\ge c\}$ pour une statistique $T:\mathsf{Z}\to\mathbb{R}$ et un réel $c$. $T(Z)$ est la **statistique de test**, $c$ la **valeur critique** (« test de statistique $T$ et de valeur critique $c$ »).
- **Convention** : si la loi de $T(Z)$ est continue, $\{T(z)\ge c\}$ ou $\{T(z)>c\}$ ne changent ni la région (à un ensemble négligeable près) ni la taille ; si $T(Z)$ est **discrète**, les deux conventions donnent des seuils différents, et le poly adopte l'**inégalité large** dans tout le chapitre (**sauf** les Exercices 4 et 6, où l'énoncé impose l'inégalité **stricte**).
**Preuve (étapes) :** sans objet.

---

### Exemple 2.1 — Un test sur l'espérance d'un échantillon gaussien
**Source :** Poly ch.4, Exemple 2.1, p. 20
**Hypothèses :** modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\theta,1),\ \theta\in\Theta:=\mathbb{R}\}\big)$, $n$-échantillon ; question : l'espérance est-elle $\le\theta_0=2$ ? On veut que l'erreur « répondre *non* alors que l'espérance est bien $\le\theta_0$ » ait probabilité au plus $\alpha$.
**Énoncé :** On teste $H_0:\theta\in\Theta_0$ contre $H_1:\theta\in\Theta_1$ avec $\Theta_0:=]-\infty,2]$, $\Theta_1:=]2,+\infty[$ (partition de $\mathbb{R}$). Règle naturelle : $\phi(Z):=\mathbb{1}_{\{\bar X_n\ge c_\alpha\}}$, de région de rejet $\mathcal{R}=\{(x_1,\dots,x_n)\in\mathbb{R}^n,\ n^{-1}\sum_{i=1}^nx_i\ge c_\alpha\}$ et d'acceptation $\mathcal{A}=\{(x_1,\dots,x_n)\in\mathbb{R}^n,\ n^{-1}\sum_{i=1}^nx_i<c_\alpha\}$. La valeur critique est choisie pour que $\mathbb{P}_\theta(\bar X_n\ge c_\alpha)\le\alpha$ **pour tout $\theta\in\Theta_0$**.
**Preuve (étapes) :** traduction : « pour tout $\theta\in\Theta_0$ » est l'écho de « alors que l'espérance est bien $\le\theta_0$ » ; l'événement $\{\bar X_n\ge c_\alpha\}$ correspond à « on répond non ». On attend $c_\alpha$ légèrement supérieur à $\theta_0$ ; valeur calculée à l'Ex. 2.3/2.4 ($c_\alpha=\theta_0+z_{1-\alpha}/\sqrt n$).
**Méthodes mobilisées :** traduction d'une exigence pratique en contrainte de niveau.
**Intuition :** l'erreur qu'on veut contrôler fixe $H_0$.

---

### Exemple 2.2 — Sondage
**Source :** Poly ch.4, Exemple 2.2, p. 21
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon de $\big(\{0,1\},\mathcal{P}(\{0,1\}),\{\mathcal{B}\mathrm{er}(\theta),\ \theta\in\Theta:=[0,1]\}\big)$, $\theta$ = probabilité de voter pour le candidat A ; $\theta_0\in\,]0,1[$ fixé.
**Énoncé :** Partition $\Theta_0:=\{\theta\in\Theta,\ \theta\le\theta_0\}$, $\Theta_1:=\{\theta\in\Theta,\ \theta>\theta_0\}$ ; test de $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ de statistique $T(Z)=S_n:=\sum_{i=1}^nX_i$ (nombre de suffrages favorables) : $\phi(Z)=\mathbb{1}_{\{S_n\ge c\}}$, région de rejet $\mathcal{R}=\{(x_1,\dots,x_n)\in\{0,1\}^n,\ \sum_{i=1}^nx_i\ge c\}$. Choix de $c$ : Ex. 2.5.
**Preuve (étapes) :** sans objet (mise en place).
**Méthodes mobilisées :** choix d'une statistique de test naturelle (exhaustive).

---

### Définition 2.2 — Fonction puissance ; erreurs de première et seconde espèce
**Source :** Poly ch.4, Définition 2.2, p. 21 (§2.3)
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique paramétrique ; $\phi$ test pur.
**Énoncé :** La **fonction puissance** $\beta_\phi:\Theta\to[0,1]$ de $\phi$ est
$$\beta_\phi:\theta\longmapsto\mathbb{P}_\theta\big(\phi(Z)=1\big)=\mathbb{P}_\theta\big(Z\in\mathcal{R}\big).$$
Effectuer un test expose à **deux types d'erreur** :
- **Erreur de première espèce** : rejeter $H_0$ alors qu'elle est satisfaite ; sa probabilité, sous $\mathbb{P}_\theta$ avec $\theta\in\Theta_0$, est le **risque de première espèce** $\beta_\phi(\theta)$.
- **Erreur de seconde espèce** : ne pas rejeter $H_0$ alors qu'elle est fausse ; sa probabilité, sous $\mathbb{P}_\theta$ avec $\theta\in\Theta_1$, est le **risque de seconde espèce** $1-\beta_\phi(\theta)$.

**Preuve (étapes) :** sans objet.
**Intuition :** la fonction puissance rassemble les deux exigences en un seul objet : on la veut **petite sur $\Theta_0$** et **grande sur $\Theta_1$**.
**Pièges / erreurs classiques :** la « puissance » au sens strict ne parle que des $\theta\in\Theta_1$ ; sur $\Theta_0$, $\beta_\phi$ est un risque d'erreur. Le test comme règle de décision (espace d'actions $\{0,1\}$, perte à deux constantes, risque exprimé via $\beta_\phi$) : chapitre 3, §4.

---

### Définition 2.3 — Taille et niveau d'un test
**Source :** Poly ch.4, Définition 2.3, p. 21
**Hypothèses :** $\phi$ test pur ; $\alpha\in\,]0,1[$.
**Énoncé :** La **taille** du test $\phi$ est
$$\overline{\alpha}(\phi):=\sup_{\theta\in\Theta_0}\beta_\phi(\theta).$$
Le test $\phi$ est dit **de niveau $\alpha$** si $\overline{\alpha}(\phi)\le\alpha$.
**Commentaires du poly :** la taille est le **risque de première espèce maximal** (probabilité maximale de rejeter $H_0$ alors qu'elle est vraie). La taille est un **nombre attaché au test** ; le niveau est une **contrainte** qu'on lui impose. Un test de taille 3 % est de niveau 5 %, et aussi de niveau 3 %.
**Préordre sur les tests :** pour $(\Theta_0,\Theta_1)$ donné, si
$$\begin{cases}\beta_{\phi_1}(\theta)\le\beta_{\phi_2}(\theta) & \text{pour tout }\theta\in\Theta_0,\\ \beta_{\phi_1}(\theta)\ge\beta_{\phi_2}(\theta) & \text{pour tout }\theta\in\Theta_1,\end{cases}$$
alors $\phi_1$ est **préférable** à $\phi_2$ (il se trompe moins souvent des deux côtés). C'est un **préordre** ; comme l'ordre partiel sur les risques du chapitre 3 (§1.5), il ne permet pas de comparer deux procédures quelconques : deux tests dont les fonctions puissance **se croisent** ne sont pas comparables.
**Preuve (étapes) :** sans objet.
**Pièges / erreurs classiques :** confondre taille et niveau ; pour $H_0$ simple, taille $=\beta_\phi(\theta_0)$.

---

### Exemple 2.3 — Test sur la moyenne d'une gaussienne de variance connue : calcul de la fonction puissance
**Source :** Poly ch.4, Exemple 2.3, p. 22
**Hypothèses :** $Z=(X_1,\dots,X_n)$ $n$-échantillon du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\theta,\sigma^2),\ \theta\in\mathbb{R}\}\big)$, $\sigma^2\in\mathbb{R}_+^*$ **connue** ; test $H_0:\theta\le 0$ contre $H_1:\theta>0$ ; statistique $T(Z):=\sqrt n\,\bar X_n/\sigma$ ; pour $c\in\mathbb{R}$, $\phi_c(Z):=\mathbb{1}_{\{T(Z)\ge c\}}$.
**Énoncé :**
$$\beta_{\phi_c}(\theta)=1-\Phi\Big(c-\frac{\sqrt n\,\theta}{\sigma}\Big),\qquad \overline{\alpha}(\phi_c)=\sup_{\theta\le 0}\beta_{\phi_c}(\theta)=1-\Phi(c),$$
$\beta_{\phi_c}$ est **strictement croissante** ; le supremum est atteint en $\theta=0$ ; le choix $c=z_{1-\alpha}$ donne un test de niveau $\alpha$, et même de **taille exactement $\alpha$**.
**Preuve (étapes) :**
1. $\beta_{\phi_c}(\theta)=\mathbb{P}_\theta(\sqrt n\bar X_n/\sigma\ge c)=\mathbb{P}_\theta\Big(\frac{\sqrt n(\bar X_n-\theta)}{\sigma}\ge c-\frac{\sqrt n\theta}{\sigma}\Big)$ (centrage-réduction sous $\mathbb{P}_\theta$).
2. $\sqrt n(\bar X_n-\theta)/\sigma\sim\mathcal{N}(0,1)$ sous $\mathbb{P}_\theta$ $\Rightarrow$ $\beta_{\phi_c}(\theta)=1-\Phi(c-\sqrt n\theta/\sigma)$.
3. $\Phi$ croissante $\Rightarrow$ $\theta\mapsto\beta_{\phi_c}(\theta)$ strictement croissante ; donc $\sup_{\theta\le 0}$ atteint en $\theta=0$ : $\overline{\alpha}(\phi_c)=1-\Phi(c)$.
4. $1-\Phi(c)=\alpha\iff c=z_{1-\alpha}$.

**Remarques du poly :** la taille décroît quand $c$ croît ; le choix $c=0$ donnerait une taille de $1/2$. *Figure p. 22* : densité de $T(Z)$ sous $\mathbb{P}_0$ ($\mathcal{N}(0,1)$), zone ombrée $\{T(Z)\ge c\}$ d'aire $1-\Phi(c)=0{,}05$ pour $c=z_{0,95}\simeq 1{,}645$ : **la taille se lit comme une aire sous une courbe**.
**Méthodes mobilisées :** centrage-réduction, monotonie de $\Phi$, calcul du sup sur $\Theta_0$ par monotonie de la puissance.
**Intuition :** plus le paramètre est grand, plus on rejette — propriété attendue d'un bon test unilatéral.

---

### Exemple 2.4 — Deux valeurs critiques : taille et puissance varient ensemble
**Source :** Poly ch.4, Exemple 2.4, p. 23 (et figure p. 23)
**Hypothèses :** cadre de l'Ex. 2.1 ($\mathcal{N}(\theta,1)$), $\Theta_0=]-\infty,\theta_0]$, $\Theta_1=]\theta_0,+\infty[$ ; deux réels $c_1>c_2$ ; $\phi_i(Z):=\mathbb{1}_{\{\bar X_n\ge c_i\}}$, $i\in\{1,2\}$.
**Énoncé :** $\mathcal{R}_1\subset\mathcal{R}_2$, donc $\beta_{\phi_1}(\theta)\le\beta_{\phi_2}(\theta)$ pour tout $\theta\in\Theta$. Plus précisément
$$\beta_{\phi_i}(\theta)=1-\Phi\big((c_i-\theta)\sqrt n\big),\qquad \overline{\alpha}(\phi_i)=\sup_{\theta\le\theta_0}\beta_{\phi_i}(\theta)=1-\Phi\big((c_i-\theta_0)\sqrt n\big).$$
L'inégalité se lit de deux façons opposées : sur $\Theta_0$, $\phi_1$ a une taille strictement plus petite (rejette moins souvent à tort) ; sur $\Theta_1$, $\phi_1$ a une puissance plus petite (risque de seconde espèce plus grand). **Les deux tests ne sont pas comparables** au sens du préordre.
Application numérique : $\theta_0=2$, $n=50$, $\alpha=5$ % : $1-\Phi((c_1-\theta_0)\sqrt n)=0{,}05$, d'où $c_1=\theta_0+z_{0,95}/\sqrt n=2+1{,}645/\sqrt{50}=2{,}23$. En $\theta=\theta_0$, la puissance vaut exactement la taille, 0,05.
**Preuve (étapes) :**
1. $c_1>c_2\Rightarrow\{\bar X_n\ge c_1\}\subset\{\bar X_n\ge c_2\}$ (inclusion des régions) $\Rightarrow$ monotonie de la probabilité.
2. $\bar X_n\sim\mathcal{N}(\theta,1/n)$ sous $\mathbb{P}_\theta$ $\Rightarrow$ formule de $\beta_{\phi_i}$ ; croissance en $\theta$ $\Rightarrow$ sup en $\theta_0$.

**Figure (p. 23) :** à gauche, puissances de $\phi_1$ ($c_1=2{,}23$) et $\phi_2$ ($c_2=0{,}9c_1$) pour $\theta_0=2$, $n=50$, avec la droite $y=0{,}05$ ; à droite, taille de $\phi_1$ en fonction de sa valeur critique (vaut $1/2$ en $c=\theta_0$, décroît vers 0).
**Commentaire du poly :** quand la valeur critique diminue, la région de rejet s'agrandit, la probabilité de rejeter augmente sous **toutes** les valeurs du paramètre : la taille et la puissance croissent **ensemble** ; les risques de première et seconde espèce varient **en sens contraire**.
**Méthodes mobilisées :** inclusion de régions de rejet, calcul gaussien.
**Intuition (bloc du poly) :** le test idéal (puissance nulle sur $\Theta_0$, égale à 1 sur $\Theta_1$) est **impossible** dès que $\Theta_0$ et $\Theta_1$ sont adjacents : la fonction puissance est continue et ne peut sauter de 0 à 1 en $\theta_0$. On ne peut que la rendre petite sur $\Theta_0$ et grande sur $\Theta_1$, objectifs incompatibles puisque déplacer $c$ les fait varier dans le même sens.

---

### Exemple 2.5 — Sondage : taille du test et seuil entier
**Source :** Poly ch.4, Exemple 2.5, p. 23–24
**Hypothèses :** cadre de l'Ex. 2.2 ; sous $\mathbb{P}_\theta$, $S_n=\sum_{i=1}^nX_i\sim\mathrm{Bin}(n,\theta)$, i.e. $\mathbb{P}_\theta(S_n=k)=\binom nk\theta^k(1-\theta)^{n-k}$, $k\in\{0,\dots,n\}$.
**Énoncé :**
1. *Croissance en $\theta$* : pour tout $c$, $\mathbb{P}_\theta(S_n\ge c)\le\mathbb{P}_\vartheta(S_n\ge c)$ pour tous $0\le\theta\le\vartheta\le 1$.
2. *Taille* : $\overline{\alpha}(\phi)=\sup_{\theta\le\theta_0}\mathbb{P}_\theta(S_n\ge c)=\mathbb{P}_{\theta_0}(S_n\ge c)$.
3. *Choix du seuil* : $c_\alpha:=\min\{k\in\{0,\dots,n+1\},\ \mathbb{P}_{\theta_0}(S_n\ge k)\le\alpha\}$ (ensemble non vide car $\mathbb{P}_{\theta_0}(S_n\ge n+1)=0$) ; $\phi_\alpha(Z)=\mathbb{1}_{\{S_n\ge c_\alpha\}}$ est de niveau $\alpha$, de taille **en général strictement inférieure** à $\alpha$.
4. *Puissance $\ge$ taille* : pour tout $\theta\in\Theta_1$, $\beta_{\phi_\alpha}(\theta)=\mathbb{P}_\theta(S_n\ge c_\alpha)\ge\mathbb{P}_{\theta_0}(S_n\ge c_\alpha)=\overline{\alpha}(\phi_\alpha)$.

**Preuve (étapes) :**
1. **Couplage** : $U_1,\dots,U_n$ i.i.d. $\mathcal{U}([0,1])$ ; $A_i:=\mathbb{1}_{\{U_i\le\theta\}}$, $B_i:=\mathbb{1}_{\{U_i\le\vartheta\}}$, de sorte que $A_i\le B_i$ p.s. (car $\theta\le\vartheta$).
2. $\sum_iA_i\sim\mathrm{Bin}(n,\theta)$, $\sum_iB_i\sim\mathrm{Bin}(n,\vartheta)$ (indicatrices indépendantes de Bernoulli) et $\sum_iA_i\le\sum_iB_i$.
3. Donc $\mathbb{P}_\theta(S_n\ge c)=\mathbb{P}(\sum_iA_i\ge c)\le\mathbb{P}(\sum_iB_i\ge c)=\mathbb{P}_\vartheta(S_n\ge c)$ (inclusion d'événements). (Lemme 3.1 des Outils.)
4. Taille : la croissance donne le sup en $\theta_0$.
5. Seuil : $S_n$ à valeurs entières $\Rightarrow$ la taille ne prend qu'un nombre fini de valeurs ; il n'existe en général pas de $c$ donnant exactement $\alpha$ ; on prend le plus petit entier assurant le niveau.
6. Puissance : croissance en $\theta$ appliquée à $\theta_0<\theta$.

**Figure (p. 24) :** fonction de répartition complémentaire $c\mapsto\mathbb{P}_\theta(S_n\ge c)$ pour $n=30$ et $\theta=0{,}1;0{,}2;0{,}3;0{,}4$ : les courbes **ne se croisent pas** (croissance en $\theta$) ; l'escalier montre que la taille ne prend qu'un nombre fini de valeurs.
**Méthodes mobilisées :** couplage (réalisation de deux lois sur un même espace pour les comparer trajectoire par trajectoire), monotonie de la fonction puissance, quantile discret.
**Intuition :** dans le cas discret, on perd un peu de taille (et donc de puissance) ; remède : tests **randomisés** (chapitre 5).
**Pièges / erreurs classiques :** prendre $\{S_n>c\}$ au lieu de $\{S_n\ge c\}$ change le seuil d'une unité.

---

### Remarque (§2.4) — L'approche de Neyman-Pearson
**Source :** Poly ch.4, §2.4, p. 25
**Hypothèses :** deux objectifs contradictoires : minimiser la taille ($\mathcal{R}$ la plus petite possible) et maximiser la puissance sur $\Theta_1$ ($\mathcal{R}$ la plus grande possible).
**Énoncé :** Règle de **Neyman-Pearson**, fondée sur une **dissymétrie** entre $H_0$ et $H_1$ : on se donne un niveau $\alpha\in\,]0,1[$ typiquement petit (5 %, $10^{-3}$ ou $10^{-6}$ selon les applications), on ne retient que les **tests de niveau $\alpha$**, et l'on cherche parmi eux à **maximiser la fonction puissance sur $\Theta_1$**.
Conséquences : on garantit en priorité un **risque de première espèce contrôlé** ; la **seule décision forte est de rejeter $H_0$** (seule assortie d'une garantie). Ne pas rejeter $H_0$ ne prouve rien (soit $H_0$ vraie, soit données insuffisantes). Le choix de $H_0$ est **crucial** et obéit à deux heuristiques :
- **Choisir en $H_0$ l'hypothèse qui est en notre défaveur** : pour établir l'efficacité d'un médicament, on met en $H_0$ « le médicament est inefficace » ; si elle est rejetée, la conclusion est probante.
- **Choisir en $H_0$ l'hypothèse la plus dangereuse** : sécurité sismique d'un site de centrale nucléaire — on met en $H_0$ la présence d'un risque, quitte à écarter à tort un site sûr (bien moins grave).

En vertu du second principe, deux groupes aux intérêts différents partiront souvent d'hypothèses nulles **inversées** (industriels vs associations de consommateurs).
**Preuve (étapes) :** sans objet (principe).
**Intuition (bloc du poly) :** la dissymétrie correspond à des situations où les deux erreurs n'ont pas la même gravité : dépistage (dire à un malade qu'il ne l'est pas vs à un bien portant qu'il est malade) ; antidopage (laisser passer un dopé vs accuser un innocent) ; physique (manquer une découverte vs annoncer une découverte sans preuve). Les réponses déterminent laquelle des hypothèses on met en $H_0$.
**Pièges / erreurs classiques :** Question courte n°7 : on ne peut pas minimiser simultanément les deux erreurs (elles varient en sens contraire avec $\mathcal{R}$) ; Neyman-Pearson contraint la première et optimise la seconde.

---

### Exemple 2.6 — Échanger $H_0$ et $H_1$
**Source :** Poly ch.4, Exemple 2.6, p. 25–26
**Hypothèses :** modèle $\mathcal{N}(\theta,1)$, $n$-échantillon.
**Énoncé :**
- Pour $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ (Ex. 2.3 transposé au seuil $\theta_0$), région de rejet de niveau et de taille $\alpha$ : $\mathcal{R}=\{\sqrt n(\bar X_n-\theta_0)\ge z_{1-\alpha}\}$.
- Pour $H_0':\theta>\theta_0$ contre $H_1':\theta\le\theta_0$ : on rejette pour les petites valeurs ; $\phi(Z)=\mathbb{1}_{\{\bar X_n\le c\}}$ a pour puissance $\theta\mapsto\mathbb{P}_\theta(\bar X_n\le c)=\Phi(\sqrt n(c-\theta))$ et pour taille $\sup_{\theta>\theta_0}\Phi(\sqrt n(c-\theta))=\Phi(\sqrt n(c-\theta_0))$ ; avec $c=\theta_0+z_\alpha/\sqrt n=\theta_0-z_{1-\alpha}/\sqrt n$ :
$$\mathcal{R}'=\big\{\sqrt n(\bar X_n-\theta_0)\le -z_{1-\alpha}\big\}.$$
- Les deux régions de rejet **ne sont pas complémentaires** : entre les deux, tout un domaine de valeurs de $\bar X_n$ où **aucun** des deux tests ne rejette son hypothèse nulle.

**Preuve (étapes) :**
1. $\bar X_n\sim\mathcal{N}(\theta,1/n)$ $\Rightarrow$ $\mathbb{P}_\theta(\bar X_n\le c)=\Phi(\sqrt n(c-\theta))$, décroissante en $\theta$.
2. Le sup sur $\theta>\theta_0$ **n'est pas atteint** (car $\theta_0\notin\Theta_0'$) mais vaut la **limite** quand $\theta\downarrow\theta_0$ : $\Phi(\sqrt n(c-\theta_0))$.
3. Taille $=\alpha\iff\sqrt n(c-\theta_0)=z_\alpha=-z_{1-\alpha}$ (symétrie).

**Méthodes mobilisées :** calcul de taille par monotonie, supremum non atteint (limite), symétrie des quantiles gaussiens.
**Intuition :** chaque test protège **son** $H_0$ ; la zone intermédiaire est celle où les données ne tranchent pas.

---

### Exemple 2.7 — Trois régions, deux hypothèses simples
**Source :** Poly ch.4, Exemple 2.7, p. 26
**Hypothèses :** $\theta_1>0$ fixé ; $(X_1,\dots,X_n)$ $n$-échantillon du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\theta,1),\ \theta\in\Theta:=\{0,\theta_1\}\}\big)$.
**Énoncé :**
- $H_0:\theta=0$ contre $H_1:\theta=\theta_1$, statistique $\bar X_n$, rejet $\{\bar X_n\ge c\}$ ; $c=z_{1-\alpha}/\sqrt n$ donne une taille $\alpha$ : $\mathcal{R}:=\{\bar X_n\ge z_{1-\alpha}/\sqrt n\}$.
- Hypothèses échangées $H_0':\theta=\theta_1$ contre $H_1':\theta=0$ : $\mathcal{R}':=\{\bar X_n\le\theta_1-z_{1-\alpha}/\sqrt n\}$, de taille $\alpha$.
- Si $0<\theta_1<2z_{1-\alpha}/\sqrt n$ (de sorte que $\theta_1-z_{1-\alpha}/\sqrt n<z_{1-\alpha}/\sqrt n$), l'ensemble des valeurs de $\bar X_n$ se découpe en **trois** :
  - $\{\bar X_n\le\theta_1-z_{1-\alpha}/\sqrt n\}$ : le premier test ne rejette pas $H_0$, le second rejette $H_0'$ ; les deux concluent $\theta=0$ ;
  - $\{\bar X_n\ge z_{1-\alpha}/\sqrt n\}$ : le premier rejette $H_0$, le second ne rejette pas $H_0'$ ; les deux concluent $\theta=\theta_1$ ;
  - $\{\theta_1-z_{1-\alpha}/\sqrt n<\bar X_n<z_{1-\alpha}/\sqrt n\}$ : **aucun** ne rejette ; la même observation conduit à conclure $\theta=0$ si l'on a mis $\theta=0$ en $H_0$, et $\theta=\theta_1$ si l'on y a mis $\theta=\theta_1$.

**Preuve (étapes) :** calcul gaussien comme à l'Ex. 2.6 ($\bar X_n\sim\mathcal{N}(0,1/n)$ sous $H_0$, $\mathcal{N}(\theta_1,1/n)$ sous $H_0'$).
**Méthodes mobilisées :** construction de tests de taille $\alpha$ par quantile gaussien ; comparaison de seuils.
**Intuition :** dans la troisième région les données ne permettent pas de trancher, et la règle de Neyman-Pearson consiste à **retenir l'hypothèse nulle** ; la contradiction n'est qu'apparente : les deux procédures ne répondent pas à la même question (elles ne protègent pas la même hypothèse).
**Pièges / erreurs classiques :** interpréter un non-rejet comme une preuve de $H_0$.

---

### Méthode 2.1 — Construction d'un test de niveau $\alpha$
**Source :** Poly ch.4, Méthode 2.1, p. 26 (§2.5)
**Énoncé :**
- (0) Choisir le niveau $\alpha\in\,]0,1[$ : c'est le **seul seuil** que l'on fixe.
- (1) Choisir une **statistique de test** $T(Z)$, en fonction de $H_0$ et du modèle.
- (2) Choisir la **forme de la région de rejet**, en fonction de $H_1$ : typiquement $\{T(Z)\ge c_\alpha\}$ pour une alternative **unilatérale**, $\{|T(Z)-t_0|\ge c_\alpha\}$ pour une alternative **bilatérale**. Le test est alors $\phi_\alpha(Z)=\mathbb{1}_{\{T(Z)\in\mathcal{R}_\alpha\}}$.
- (3) Choisir $c_\alpha$ de sorte que la taille soit au plus $\alpha$ : $\sup_{\theta\in\Theta_0}\mathbb{P}_\theta(T(Z)\ge c_\alpha)\le\alpha$. Cette étape demande de **connaître la loi de $T(Z)$ sous $H_0$**.
- (4) Éventuellement, calculer la fonction puissance $\beta_{\phi_\alpha}$.
- (5) Éventuellement, calculer la $p$-valeur $\hat\alpha(Z)$ associée.
- (6) Conclure numériquement.

**Commentaire du poly :** l'étape (1) est la seule où le choix n'est pas dicté par la construction ; réponse générale (prendre par défaut le **test du rapport de vraisemblance**) au chapitre 5.
**Preuve (étapes) :** sans objet.

---

### Exemple 2.8 — Bruit d'aéroport : le point de vue des riverains
**Source :** Poly ch.4, Exemple 2.8, p. 27
**Hypothèses :** seuil légal $\mu_0$ (p. ex. 80 dB) ; les **riverains veulent établir que le bruit dépasse le seuil** ; $n$ mesures modélisées par un $n$-échantillon de $\mathcal{N}(\mu,\sigma^2)$, $\sigma^2$ connue.
**Énoncé (6 étapes) :**
1. *Hypothèses* : seule décision forte = rejeter $H_0$ ; les riverains cherchant à établir $\mu>\mu_0$, on met l'assertion contraire en $H_0$ : $H_0:\mu\le\mu_0$ contre $H_1:\mu>\mu_0$.
2. *Statistique* : $T(Z):=\sqrt n(\bar X_n-\mu_0)/\sigma$, de loi $\mathcal{N}(0,1)$ sous $\mathbb{P}_{\mu_0}$. Ni $\bar X_n$ seul, ni $\bar X_n-\mu_0$ ne conviendraient aussi bien : leur loi dépend encore de $n$ et $\sigma$ (il faudrait recalculer les quantiles à chaque jeu de données).
3. *Forme* : alternative $\mu>\mu_0$ $\Rightarrow$ rejet pour les grandes valeurs : $\mathcal{R}_\alpha=\{T(Z)\ge c\}$.
4. *Valeur critique* : $\beta(\mu)=1-\Phi\big(c-\sqrt n(\mu-\mu_0)/\sigma\big)$, taille $\sup_{\mu\le\mu_0}\beta(\mu)=1-\Phi(c)$ ; $c=z_{1-\alpha}$ donne une taille exactement $\alpha$.
5. *Application numérique* : $n=100$, $\bar X_n=82$ dB, $\sigma=10$ : $T(Z)=10\times(82-80)/10=2$. Au niveau 5 %, $z_{0,95}=1{,}645$ et $2\ge 1{,}645$ : **on rejette $H_0$** (de façon équivalente, rejet dès que $\bar X_n\ge\mu_0+\sigma z_{1-\alpha}/\sqrt n=80+1{,}645=81{,}645$). Au niveau 0,1 %, $z_{0,999}=3{,}090$ et $2<3{,}090$ : **on échoue à rejeter $H_0$**.
6. *Conclusion* : au niveau 5 %, les riverains ont établi statistiquement le dépassement ; au niveau 0,1 %, ils n'ont rien établi — **ce qui ne signifie pas que le seuil est respecté**.

**Preuve (étapes) :** comme l'Ex. 2.3 (centrage-réduction, monotonie de $\Phi$).
**Méthodes mobilisées :** Méthode 2.1 complète ; $z$-test unilatéral ; choix de $H_0$ selon la partie.
**Intuition :** la $p$-valeur ici vaut $1-\Phi(2)\approx 0{,}023$ (cf. Ex. 2.14), entre 0,1 % et 5 %.

---

### Exemple 2.9 — Bruit d'aéroport : le point de vue de l'aéroport
**Source :** Poly ch.4, Exemple 2.9, p. 27
**Hypothèses :** mêmes données ; l'**aéroport veut établir que le bruit ne dépasse pas le seuil**.
**Énoncé :** $H_0:\mu\ge\mu_0$ contre $H_1:\mu<\mu_0$ (hypothèse défavorable à l'aéroport en $H_0$). Statistique $T(Z)=\sqrt n(\bar X_n-\mu_0)/\sigma$ ; rejet pour les petites valeurs $\mathcal{R}'_\alpha=\{T(Z)\le c'\}$ ; taille $\sup_{\mu\ge\mu_0}\Phi\big(c'-\sqrt n(\mu-\mu_0)/\sigma\big)=\Phi(c')$ atteinte en $\mu=\mu_0$, d'où $c'=z_\alpha=-z_{1-\alpha}$ et
$$\mathcal{R}'_\alpha=\big\{T(Z)\le -z_{1-\alpha}\big\}.$$
Avec les mêmes données, $T(Z)=2>-1{,}645$ : l'aéroport **échoue à rejeter** son $H_0$, à tous les niveaux usuels ; il n'a rien établi.
**Preuve (étapes) :** même calcul qu'à l'Ex. 2.8, avec $\Phi$ croissante et $\mu\mapsto c'-\sqrt n(\mu-\mu_0)/\sigma$ décroissante.
**Méthodes mobilisées :** $z$-test unilatéral à gauche ; échange de $H_0$/$H_1$.
**Intuition :** le même jeu de données conduit à des conclusions qui *semblent* contradictoires ; elles ne le sont pas : chacun protège une hypothèse différente, et aucun n'a « prouvé » que l'autre avait tort ; ici **seuls les riverains** obtiennent une conclusion forte.

---

### Remarque (§2.6) — Construire un test à partir d'un pivot
**Source :** Poly ch.4, §2.6, p. 27–28
**Hypothèses :** $G$ fonction pivotale.
**Énoncé :** Pour tout $\alpha\in[0,1]$, on peut déterminer des réels $t^-_\alpha$, $t^+_\alpha$ tels que
$$\mathbb{P}_\theta\big(G(Z,\theta)\in[t^-_\alpha,t^+_\alpha]\big)\ge 1-\alpha\qquad\text{pour tout }\theta\in\Theta,$$
de sorte que $\hat I_\alpha:=\{\theta\in\Theta,\ G(Z,\theta)\in[t^-_\alpha,t^+_\alpha]\}$ est une région de confiance de niveau $1-\alpha$ pour $\theta$. Pour tester $H_0:\theta=\theta_0$, il est naturel de **rejeter lorsque $\theta_0\notin\hat I_\alpha$**, c'est-à-dire lorsque $G(Z,\theta_0)\notin[t^-_\alpha,t^+_\alpha]$.
**Preuve (étapes) :** sous $H_0$, $\mathbb{P}_{\theta_0}(G(Z,\theta_0)\notin[t^-_\alpha,t^+_\alpha])\le\alpha$ (complémentaire), d'où le niveau $\alpha$ (formalisé dans les compléments : dualité).
**Intuition :** c'est le **pont** entre régions de confiance et tests.
**Pièges / erreurs classiques :** la région de confiance obtenue est en général **implicite** ; il n'est pas toujours facile d'en déduire un test explicite. Les Ex. 2.10–2.12 sont des cas classiques où la résolution est possible.

---

### Exemple 2.10 — Test sur la moyenne, variance connue (bilatéral)
**Source :** Poly ch.4, Exemple 2.10, p. 28 (figure p. 28–29)
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon de $\{\mathcal{N}(\mu,\sigma^2),\ \mu\in\mathbb{R}\}$, $\sigma^2$ connue ; $\mu_0\in\mathbb{R}$ ; $H_0:\mu=\mu_0$ contre $H_1:\mu\ne\mu_0$.
**Énoncé :** $G(Z;\mu):=\sqrt n(\bar X_n-\mu)/\sigma$ est pivotale de loi $\mathcal{N}(0,1)$ (Ex. 1.4). Pour tout $\alpha\in\,]0,1[$, $\mathbb{P}_{\mu_0}\big(|G(Z;\mu_0)|<z_{1-\alpha/2}\big)=1-\alpha$, et le test
$$\phi_\alpha(Z):=\mathbb{1}_{\{|G(Z;\mu_0)|\ge z_{1-\alpha/2}\}}$$
est de niveau et de taille $\alpha$. Région d'acceptation
$$\mathcal{A}_\alpha=\Big\{(x_1,\dots,x_n)\in\mathbb{R}^n,\ \mu_0-z_{1-\alpha/2}\frac{\sigma}{\sqrt n}<n^{-1}\sum_{i=1}^nx_i<\mu_0+z_{1-\alpha/2}\frac{\sigma}{\sqrt n}\Big\}.$$
Fonction puissance :
$$\beta(\mu)=1-\Phi\Big(\frac{\mu_0-\mu}{\sigma/\sqrt n}+z_{1-\alpha/2}\Big)+\Phi\Big(\frac{\mu_0-\mu}{\sigma/\sqrt n}-z_{1-\alpha/2}\Big).$$
$\mu\mapsto\beta(\mu)$ atteint son **minimum en $\mu=\mu_0$**, où elle vaut $\alpha$, et tend vers 1 quand $n\to\infty$, pour $\mu>\mu_0$ comme pour $\mu<\mu_0$.
**Preuve (étapes) :**
1. $\beta(\mu)=1-\mathbb{P}_\mu\Big(-z_{1-\alpha/2}<\frac{\bar X_n-\mu_0}{\sigma/\sqrt n}<z_{1-\alpha/2}\Big)$ (complémentaire du rejet).
2. Recentrer en $\mu$ : $=1-\mathbb{P}_\mu\Big(\frac{\mu_0-\mu}{\sigma/\sqrt n}-z_{1-\alpha/2}<\frac{\bar X_n-\mu}{\sigma/\sqrt n}<\frac{\mu_0-\mu}{\sigma/\sqrt n}+z_{1-\alpha/2}\Big)$.
3. $(\bar X_n-\mu)/(\sigma/\sqrt n)\sim\mathcal{N}(0,1)$ sous $\mathbb{P}_\mu$ $\Rightarrow$ formule avec $\Phi$.
4. En $\mu=\mu_0$ : $1-\Phi(z_{1-\alpha/2})+\Phi(-z_{1-\alpha/2})=\alpha$. (Minimum en $\mu_0$ et limite 1 : énoncés sans détail de preuve dans le poly.)

**Figure (p. 29) :** puissance du test bilatéral pour $n=20,50,100$, $\alpha=0{,}05$, $\mu_0=2$, $\sigma=1$ : courbes en « cuvette » se rejoignant en $\mu=\mu_0$ où la puissance vaut la taille ; plus étroites quand $n$ croît.
**Méthodes mobilisées :** test dual d'un pivot ; $z$-test bilatéral ; calcul de puissance par recentrage.
**Intuition :** test à savoir faire (repris et approfondi dans l'Exercice 2).

---

### Exemple 2.11 — Test sur la moyenne, variance inconnue (test de Student)
**Source :** Poly ch.4, Exemple 2.11, p. 29
**Hypothèses :** $(X_1,\dots,X_n)$, $n\ge 2$, $n$-échantillon de $\{\mathcal{N}(\mu,\sigma^2),\ (\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*\}$ ; $\mu_0\in\mathbb{R}$ ; $H_0:\mu=\mu_0$ contre $H_1:\mu\ne\mu_0$.
**Énoncé :** Par le théorème de Gosset, $G(Z;\mu):=\dfrac{\bar X_n-\mu}{S_n/\sqrt n}$ est pivotale de loi $\mathrm{t}(n-1)$. Sous $H_0$, $G(Z;\mu_0)\sim\mathrm{t}(n-1)$, donc
$$\mathbb{P}_{\mu_0,\sigma^2}\Big(-\mathrm{t}^{(n-1)}_{1-\alpha/2}<G(Z;\mu_0)<\mathrm{t}^{(n-1)}_{1-\alpha/2}\Big)=1-\alpha\quad\text{pour tout }\sigma^2>0,$$
et le test
$$\phi_\alpha(Z):=\mathbb{1}_{\big\{|G(Z;\mu_0)|\ge\mathrm{t}^{(n-1)}_{1-\alpha/2}\big\}}$$
est de **taille $\alpha$** : c'est le **test de Student**.
*Puissance :* elle ne s'exprime plus avec la loi de Student : sous $\mathbb{P}_{(\mu,\sigma^2)}$ avec $\mu\ne\mu_0$, $\mu_0$ n'est plus l'espérance de $\bar X_n$. En écrivant
$$\frac{\bar X_n-\mu_0}{S_n/\sqrt n}=\frac{\sqrt n(\bar X_n-\mu)/\sigma+\sqrt n(\mu-\mu_0)/\sigma}{S_n/\sigma},$$
on reconnaît au numérateur une variable $\mathcal{N}\big(\sqrt n(\mu-\mu_0)/\sigma,1\big)$ et au dénominateur la racine de $S_n^2/\sigma^2=\chi^2(n-1)/(n-1)$, **indépendante** du numérateur : la statistique de test suit une **loi de Student non centrale** à $n-1$ degrés de liberté et de paramètre de non-centralité $\sqrt n(\mu-\mu_0)/\sigma$ (Déf. 3.2).
**Preuve (étapes) :**
1. Pivot (Gosset) ; sa loi ne dépend ni de $\mu$ ni de $\sigma^2$ : la taille vaut $\alpha$ **uniformément en $\sigma^2$** (le sup sur $\Theta_0=\{\mu_0\}\times\mathbb{R}_+^*$ vaut $\alpha$).
2. Puissance : décomposition algébrique ci-dessus + indépendance $\bar X_n\perp S_n^2$ (Gosset) + définition de Student non centrale.

**Méthodes mobilisées :** pivot de Student, dualité IC/test, loi de Student non centrale.
**Pièges / erreurs classiques :** $H_0:\mu=\mu_0$ est **composite** ici ($\sigma^2$ libre) ; le pivot rend la taille indépendante de $\sigma^2$.

---

### Exemple 2.12 — Test sur la variance
**Source :** Poly ch.4, Exemple 2.12, p. 29
**Hypothèses :** $(X_1,\dots,X_n)$, $n\ge 2$, $n$-échantillon de $\{\mathcal{N}(\mu,\sigma^2),\ (\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*\}$ ; $\sigma_0^2>0$ ; $H_0:\sigma^2=\sigma_0^2$ contre $H_1:\sigma^2\ne\sigma_0^2$.
**Énoncé :** $G(Z;\sigma^2):=(n-1)S_n^2/\sigma^2$ est pivotale de loi $\chi^2(n-1)$ (Ex. 1.6). Sous $H_0$, pour tout $\mu\in\mathbb{R}$,
$$\mathbb{P}_{\mu,\sigma_0^2}\Big(\chi^2_{\alpha/2}(n-1)<\frac{(n-1)S_n^2}{\sigma_0^2}<\chi^2_{1-\alpha/2}(n-1)\Big)=1-\alpha,$$
et le test
$$\phi_\alpha(Z):=\mathbb{1}_{\Big\{\frac{(n-1)S_n^2}{\sigma_0^2}\notin\,\big]\chi^2_{\alpha/2}(n-1),\,\chi^2_{1-\alpha/2}(n-1)\big[\Big\}}$$
est de niveau et de taille $\alpha$.
**Preuve (étapes) :** loi du pivot sous $H_0$ (Gosset), continuité de la f.d.r. du $\chi^2$, complémentaire.
**Méthodes mobilisées :** pivot du $\chi^2$, test dual.
**Pièges / erreurs classiques :** la loi du $\chi^2$ n'étant pas symétrique, les deux quantiles **ne sont pas opposés**, et la région de rejet **n'est pas symétrique** autour de $\sigma_0^2$.
**Commentaire du poly :** les Ex. 2.10–2.12 ferment le « triptyque » gaussien (moyenne à variance connue, moyenne à variance inconnue, variance) ; versions à deux échantillons (comparaison de deux moyennes, de deux variances) : Exercice 5.

---

### Définition 2.4 — $p$-valeur
**Source :** Poly ch.4, Définition 2.4, p. 30 (§2.7)
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique ; $\{\phi_\alpha,\ \alpha\in[0,1]\}$ famille de tests purs vérifiant
- (a) pour tout $\alpha\in[0,1]$, $\phi_\alpha$ est de niveau $\alpha$ : $\overline{\alpha}(\phi_\alpha)=\sup_{\theta\in\Theta_0}\beta_{\phi_\alpha}(\theta)\le\alpha$ ;
- (b) pour tous $0\le\alpha\le\alpha'<1$, $\mathcal{R}_\alpha\subset\mathcal{R}_{\alpha'}$, où $\mathcal{R}_\alpha:=\{z\in\mathsf{Z},\ \phi_\alpha(z)=1\}$ (régions **emboîtées**).

**Énoncé :** La **$p$-valeur** de l'observation $Z$ pour cette famille de tests est
$$\hat\alpha(Z):=\inf\{\alpha\in[0,1],\ Z\in\mathcal{R}_\alpha\}.$$
**Commentaires du poly :** motivation — le niveau $\alpha$ est ma **tolérance à l'erreur de première espèce** ; en la diminuant, je rejette de moins en moins ; pour une famille dont les régions de rejet décroissent avec $\alpha$, il existe un niveau à partir duquel je cesse de rejeter, fonction des observations : c'est la $p$-valeur. La condition (b) donne son sens à l'infimum (augmenter la tolérance agrandit la région de rejet). La $p$-valeur est la **plus petite taille de test qui conduise à rejeter $H_0$** sur l'observation disponible : **$H_0$ est rejetée pour tout niveau $\alpha>\hat\alpha(Z)$ et n'est pas rejetée pour tout $\alpha<\hat\alpha(Z)$**. Plus la $p$-valeur est faible, plus les données sont défavorables à $H_0$.
**Preuve (étapes) :** sans objet (définition).
**Comment s'en servir (p. 31) :** $p$-valeur de 2 % $\Rightarrow$ on rejette $H_0$ pour tout niveau $\alpha>2$ %, on échoue à rejeter pour tout $\alpha<2$ %. Elle résume **en un seul nombre la réponse du test à tous les niveaux** ; c'est pourquoi on la publie plutôt que la seule décision.
**Pièges / erreurs classiques :** la $p$-valeur dépend de la **famille** de tests choisie ; en $\alpha=\hat\alpha(Z)$ exactement, la décision dépend de la convention (inégalité large/stricte).

---

### Proposition 2.1 — Calcul pratique de la $p$-valeur
**Source :** Poly ch.4, Proposition 2.1, p. 30
**Hypothèses :** $\{\phi_\alpha,\ \alpha\in[0,1]\}$ famille de tests purs de niveau $\alpha$, de la forme $\phi_\alpha(Z)=\mathbb{1}_{\{T(Z)\ge c_\alpha\}}$, où $\alpha\mapsto c_\alpha$ est **décroissante** sur $[0,1]$.
**Énoncé :** La famille vérifie la condition (b) de la Déf. 2.4 et
$$\hat\alpha(Z)=\inf\{\alpha\in\,]0,1[\,,\ T(Z)\ge c_\alpha\}.$$
**Preuve (étapes) :**
1. Pour $\alpha\le\alpha'$, la décroissance de $\alpha\mapsto c_\alpha$ donne $c_{\alpha'}\le c_\alpha$.
2. Donc $\mathcal{R}_\alpha=\{z,\ T(z)\ge c_\alpha\}\subset\{z,\ T(z)\ge c_{\alpha'}\}=\mathcal{R}_{\alpha'}$ : (b) vérifiée.
3. L'expression de la $p$-valeur est la définition réécrite avec $\mathcal{R}_\alpha=\{T(Z)\ge c_\alpha\}$. $\square$

**Intuition (déduite des Ex. 2.13 et des corrigés d'exercices, non énoncée ainsi dans la Prop.) :** en pratique, si $c_\alpha=F_0^{\leftarrow}(1-\alpha)$ avec $F_0$ continue strictement croissante (f.d.r. de $T$ sous la borne de $H_0$), on obtient $\hat\alpha(Z)=1-F_0(T(Z))$ = probabilité, sous $H_0$, d'observer une statistique au moins aussi extrême.
**Pièges / erreurs classiques :** la formule « $1-F_0(T)$ » suppose continuité et stricte monotonie ; dans le cas discret, attention à la convention ($\ge$ vs $>$, cf. Exercices 4 et 6).

---

### Exemple 2.13 — $p$-valeur pour la moyenne d'une gaussienne
**Source :** Poly ch.4, Exemple 2.13, p. 30
**Hypothèses :** $Z=(X_1,\dots,X_n)$ $n$-échantillon de $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\theta,\sigma^2),\ \theta\in\Theta:=\mathbb{R}\}\big)$, $\sigma^2$ connue ; $H_0:\theta\le 0$ contre $H_1:\theta>0$ ; test $\phi_\alpha(Z)=\mathbb{1}_{\{T(Z)\ge z_{1-\alpha}\}}$, $T(Z)=\sqrt n\bar X_n/\sigma$, de niveau $\alpha$ (Ex. 2.3) ; $\mathcal{R}_\alpha=\{\sqrt n\bar X_n/\sigma\ge z_{1-\alpha}\}$.
**Énoncé :**
$$\hat\alpha(Z)=1-\Phi\big(\sqrt n\,\bar X_n/\sigma\big).$$
Elle ne dépend de l'observation qu'à travers $\bar X_n$. Pour $n=100$, $\sigma=1$ : $\hat\alpha=0{,}999$ si $\bar X_n=-0{,}3$ ; $\hat\alpha=0{,}159$ si $\bar X_n=0{,}1$ ; $\hat\alpha=1{,}35\cdot 10^{-3}$ si $\bar X_n=0{,}3$.
**Preuve (étapes) :**
1. $\alpha\mapsto z_{1-\alpha}$ est décroissante : la Prop. 2.1 s'applique.
2. $\Phi$ continue et strictement croissante, donc pour $\alpha\in\,]0,1[$ : $\sqrt n\bar X_n/\sigma\ge z_{1-\alpha}\iff\Phi(\sqrt n\bar X_n/\sigma)\ge 1-\alpha\iff\alpha\ge 1-\Phi(\sqrt n\bar X_n/\sigma)$.
3. L'infimum de ces $\alpha$ est $1-\Phi(\sqrt n\bar X_n/\sigma)$.

**Méthodes mobilisées :** Prop. 2.1, inversion de $\Phi$.
**Intuition :** valeurs numériques : $T=-3$, $1$, $3$ respectivement.

---

### Proposition 2.2 — Loi de la $p$-valeur sous l'hypothèse nulle
**Source :** Poly ch.4, Proposition 2.2, p. 31
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique paramétrique ; $(\Theta_0,\Theta_1)$ partition de $\Theta$ ; $\{\phi_\alpha,\ \alpha\in[0,1]\}$ famille de tests purs vérifiant (a) et (b) de la Déf. 2.4 ; $\hat\alpha(Z)$ la $p$-valeur associée.
**Énoncé :** Pour tout $\theta\in\Theta_0$,
$$\mathbb{P}_\theta\big(\hat\alpha(Z)\le u\big)\le u\qquad\text{pour tout }u\in[0,1],\tag{1}$$
c'est-à-dire que $\hat\alpha(Z)$ est **stochastiquement dominée** par la loi $\mathcal{U}([0,1])$. Si de plus
$$\mathbb{P}_\theta\big(Z\in\mathcal{R}_\alpha\big)=\alpha\qquad\text{pour tout }\alpha\in\,]0,1[,\tag{2}$$
alors $\mathbb{P}_\theta(\hat\alpha(Z)\le u)=u$ pour tout $u\in\,]0,1[$ : $\hat\alpha(Z)$ suit la **loi uniforme sur $]0,1[$**.
**Preuve (étapes) :** soit $\theta\in\Theta_0$ et $u\in[0,1]$.
1. *Domination.* Soit $v\in\,]u,1[$. Si $\hat\alpha(Z)\le u<v$, alors, **par définition de l'infimum**, il existe $\alpha<v$ tel que $Z\in\mathcal{R}_\alpha$ ; la condition **(b)** donne $\mathcal{R}_\alpha\subset\mathcal{R}_v$, donc $Z\in\mathcal{R}_v$. Ainsi $\{\hat\alpha(Z)\le u\}\subset\{Z\in\mathcal{R}_v\}$.
2. La condition **(a)** donne $\mathbb{P}_\theta(\hat\alpha(Z)\le u)\le\mathbb{P}_\theta(Z\in\mathcal{R}_v)\le\overline{\alpha}(\phi_v)\le v$.
3. Valable pour tout $v>u$ : on fait tendre $v\downarrow u$, d'où (1).
4. *Cas d'égalité.* Par définition de l'infimum, $\{Z\in\mathcal{R}_u\}\subset\{\hat\alpha(Z)\le u\}$, donc $\mathbb{P}_\theta(\hat\alpha(Z)\le u)\ge\mathbb{P}_\theta(Z\in\mathcal{R}_u)$, qui vaut $u$ sous (2). Combiné à (1) : égalité. $\square$

**Figure (p. 31) :** histogrammes de $N=10^5$ $p$-valeurs pour le test de région de rejet $\{\bar X_n\ge\theta_0+z_{1-\alpha}/\sqrt n\}$, $\theta_0=2$, $n=20$, observations $\mathcal{N}(\theta,1)$ : à gauche $\theta=2$ (histogramme **plat**, densité uniforme) ; à droite $\theta=2{,}1$ (concentration près de 0).
**Intuition (bloc du poly) :** sous $H_0$ avec un niveau atteint, la $p$-valeur est uniforme : elle ne porte **aucune information** (cohérent, $H_0$ est vraie). Sous l'alternative, les petites $p$-valeurs deviennent fréquentes. C'est ce contraste qui autorise à lire une petite $p$-valeur comme une **indication défavorable à $H_0$, et rien de plus**. La domination stochastique (plutôt que l'égalité) correspond aux cas où le niveau n'est pas atteint, p. ex. statistique **discrète** (sondage) : l'histogramme n'est plus plat.
**Pièges / erreurs classiques :** Question courte n°9 : « Vrai ou faux : sous $H_0$, la $p$-valeur suit toujours exactement la loi uniforme » — **Faux** : seulement $\mathbb{P}_\theta(\hat\alpha\le u)\le u$ en général ; uniforme si (2) (taille exactement $\alpha$ pour tout $\alpha$, en ce $\theta$) ; pour $\theta\in\Theta_0$ intérieur à une hypothèse composite, typiquement $\mathbb{P}_\theta(\hat\alpha\le u)<u$.

---

### Remarque (§2.8) — Ce qu'un test dit et ce qu'il ne dit pas
**Source :** Poly ch.4, §2.8, p. 32
**Énoncé :** six points (erreurs d'interprétation les plus fréquentes) :
1. **La $p$-valeur n'est pas la probabilité que $H_0$ soit vraie.** Elle est calculée *sous* $H_0$ : probabilité portant sur l'observation, le paramètre étant fixé. « La probabilité que $H_0$ soit vraie » n'a pas de sens dans ce cours ($\theta$ déterministe).
2. Deux conclusions qui semblent contradictoires ne le sont pas nécessairement (Ex. 2.7, aéroport Ex. 2.8–2.9) : elles répondent à des questions différentes.
3. La seule décision significative est de **rejeter $H_0$** (seule dont la probabilité d'erreur soit contrôlée).
4. Nomenclature : « rejeter $H_0$ » et « **échouer à rejeter** $H_0$ », plutôt que « rejeter » et « accepter ».
5. Plus $\alpha$ est petit, plus la conclusion « on rejette » est assurée.
6. $\alpha$ est le niveau de tolérance au risque de première espèce : une **convention**, choisie en fonction des conséquences d'une erreur, pas une constante universelle.

Complément au point 3 : une conclusion « statistiquement significative » **ne dit rien de l'ampleur de l'effet** (Ex. 2.14).
**Preuve (étapes) :** conséquences des sections précédentes.

---

### Exemple 2.14 — Signification statistique et taille d'effet
**Source :** Poly ch.4, Exemple 2.14, p. 32
**Hypothèses :** modèle de l'Ex. 2.8, $\mu_0=80$ dB, $\sigma=10$, $H_0:\mu\le\mu_0$ contre $H_1:\mu>\mu_0$ ; $T(Z)=\sqrt n(\bar X_n-\mu_0)/\sigma$ ; $p$-valeur $1-\Phi(T(Z))$.
**Énoncé :**
- $n=4$, $\bar X_n=88$ dB : $T(Z)=2\times 8/10=1{,}6$, $p$-valeur $1-\Phi(1{,}6)=0{,}055$ : on **échoue à rejeter** $H_0$ au niveau 5 %.
- $n=10^4$, $\bar X_n=80{,}2$ dB : $T(Z)=100\times 0{,}2/10=2$, $p$-valeur $1-\Phi(2)=0{,}023$ : on **rejette** $H_0$ au niveau 5 %.

Le second jeu donne une conclusion « significative » pour un dépassement de 0,2 dB (inaudible) ; le premier n'y parvient pas pour 8 dB (bruit perçu bien plus fort). La $p$-valeur **mêle deux informations** — l'ampleur de l'écart et la quantité de données — et décroît quand l'une ou l'autre augmente. Une conclusion complète doit rapporter, outre la $p$-valeur, **l'estimation de l'effet et un intervalle de confiance** pour cet effet (à l'échelle de la quantité mesurée).
**Preuve (étapes) :** application directe de la formule de $p$-valeur (Ex. 2.13 transposé).
**Méthodes mobilisées :** $p$-valeur d'un $z$-test unilatéral.
**Pièges / erreurs classiques :** confondre significativité statistique et importance pratique.

---

### Exemple 2.15 — Étendue de la banquise arctique (étude de cas)
**Source :** Poly ch.4, Exemple 2.15, p. 33 (§2.9 ; intuition p. 34)
**Hypothèses :** $(Y_1,\dots,Y_n)$, $Y_i$ étendue de la banquise l'année $i$ (depuis 1979), $t_i:=\text{année}_i-1979$ ; modèle de **régression linéaire gaussienne**
$$Y_i=\beta_0+\beta_1t_i+\sigma\varepsilon_i,\qquad i\in\{1,\dots,n\},$$
$\theta=(\beta_0,\beta_1,\sigma^2)\in\mathbb{R}^2\times\mathbb{R}_+^*$, $\varepsilon_i$ i.i.d. $\mathcal{N}(0,1)$ sous $\mathbb{P}_\theta$. Moindres carrés :
$$(\hat\beta_0,\hat\beta_1):=\mathop{\arg\min}_{(b_0,b_1)\in\mathbb{R}^2}\sum_{i=1}^n(Y_i-b_0-b_1t_i)^2,\qquad \hat\sigma^2:=\frac{1}{n-2}\sum_{i=1}^n(Y_i-\hat\beta_0-\hat\beta_1t_i)^2 .$$
$\bar t:=n^{-1}\sum_{i=1}^nt_i$, $s:=n^{-1}\sum_{i=1}^nt_i^2-\bar t^2$ (variance empirique des $t_i$), de sorte que $ns=\sum_{i=1}^n(t_i-\bar t)^2$.
**Énoncé :** On montre (Exercice 1 (PC2)) que, sous $\mathbb{P}_\theta$,
$$\begin{pmatrix}\hat\beta_0\\ \hat\beta_1\end{pmatrix}\sim\mathcal{N}\left(\begin{pmatrix}\beta_0\\ \beta_1\end{pmatrix},\ \frac{\sigma^2}{ns}\begin{pmatrix}n^{-1}\sum_it_i^2 & -\bar t\\ -\bar t & 1\end{pmatrix}\right),$$
que $(n-2)\hat\sigma^2/\sigma^2\sim\chi^2(n-2)$ et que $\hat\sigma^2$ est indépendante de $(\hat\beta_0,\hat\beta_1)$. En particulier $\hat\beta_1\sim\mathcal{N}(\beta_1,\sigma^2/(ns))$ et
$$G(Z;\beta_1):=\frac{\sqrt{ns}\,(\hat\beta_1-\beta_1)}{\hat\sigma}$$
est pivotale de loi $\mathrm{t}(n-2)$.
- *Intervalle de confiance pour la pente* : $\mathbb{P}_\theta\Big(\beta_1\in\Big[\hat\beta_1\pm\dfrac{\hat\sigma\,\mathrm{t}^{(n-2)}_{1-\alpha/2}}{\sqrt{ns}}\Big]\Big)=1-\alpha$. Sur les données, à 95 % : $[-0{,}11,-0{,}07]$ pour $\beta_1$ (millions de km² par an) et $[7{,}55,8{,}34]$ pour $\beta_0$.
- *Test de nullité de la pente* $H_0:\beta_1=0$ contre $H_1:\beta_1\ne 0$ : le **test dual** de l'intervalle,
$$\phi_\alpha(Z)=\mathbb{1}_{\Big\{0\notin\Big[\hat\beta_1\pm\frac{\hat\sigma\,\mathrm{t}^{(n-2)}_{1-\alpha/2}}{\sqrt{ns}}\Big]\Big\}}=\mathbb{1}_{\big\{|G(Z;0)|\ge\mathrm{t}^{(n-2)}_{1-\alpha/2}\big\}},$$
est de niveau $\alpha$. $p$-valeur observée : $1{,}76\cdot 10^{-10}$.

**Preuve (étapes) :**
1. Lois des estimateurs : **admises** ici (renvoi à l'Exercice 1 (PC2)).
2. Pivot : quotient d'une $\mathcal{N}(0,1)$ ($\sqrt{ns}(\hat\beta_1-\beta_1)/\sigma$) par la racine d'un $\chi^2(n-2)$ **indépendant** divisé par $n-2$ ($\hat\sigma^2/\sigma^2$) $\Rightarrow$ $\mathrm{t}(n-2)$ (définition de Student).
3. IC : Méthode 1.1 avec $A_\alpha$ symétrique ; test : dualité (rejeter ssi $0\notin$ IC).

**Figure (p. 33) :** étendue de la banquise par année (1979–~2012) et droite de régression ajustée (décroissante).
**Méthodes mobilisées :** pivot de Student en régression, dualité intervalle/test, $p$-valeur bilatérale.
**Intuition (bloc du poly, p. 34) :** la $p$-valeur $\approx 10^{-10}$ s'interprète **ainsi et pas autrement** : *si la pente était nulle et si le modèle était exact*, une pente estimée aussi éloignée de zéro n'aurait qu'une chance sur dix milliards environ de se produire. Elle ne dit **pas** que la probabilité que la pente soit nulle vaut $10^{-10}$, ni rien de la validité du modèle (indépendance des erreurs, homoscédasticité, linéarité) — ici l'hypothèse la plus discutable (mesures successives d'une même grandeur physique non indépendantes). L'**intervalle de confiance** $[-0{,}11,-0{,}07]$ est directement lisible : ordre de grandeur de la décroissance annuelle, ce que la $p$-valeur ne donne pas.

---

### Remarque (§2.10) — En pratique : programme des exercices ; énigme
**Source :** Poly ch.4, §2.10, p. 34
**Énoncé :** Exercices traités en petite classe :

| Exercice | Notions du cours | Rappels |
|---|---|---|
| Exo 1 — Modèle exponentiel | pivot, test unilatéral, fonction puissance, $p$-valeur, intervalle de confiance | Loi Gamma et loi du $\chi^2$ |
| Exo 2 — Modèle gaussien | test bilatéral, taille, $p$-valeur, test de Student | Th. de Cochran et th. de Gosset |
| Exo 3 — Intervalle pour la loi uniforme | pivot, intervalle de longueur minimale | Statistiques d'ordre, loi de $X_{n:n}$ |

L'Exercice 1 est le seul appliquant la méthode du pivot à un modèle **non gaussien** ($2\theta^{-1}\sum X_i\sim\chi^2(2n)$). L'Exercice 2 est « **annoncé en amphi comme étant à savoir faire** » (test bilatéral à variance connue, redémonstration de Gosset, variance inconnue). L'Exercice 3 construit l'intervalle de longueur minimale $[X_{n:n},X_{n:n}\alpha^{-1/n}]$, seul cas du cours où l'optimal n'est **pas symétrique**. Bonus : Poisson (seul test simple contre simple, préparation au chapitre 5, Ex. 4) ; deux échantillons gaussiens, dualité, loi de Fisher (Ex. 5) ; vaccination, choix de $H_0$ (Ex. 6) ; Wilcoxon, seul test non paramétrique et seul construit par une inégalité de déviation (Ex. 7).
**Énigme à préparer :** grille $G$ de pixels, coût d'achat $c_0:G\to\mathbb{R}_+$, gain $r_1:G\to\mathbb{R}_+$ ; avec un budget $\alpha$, quels pixels acheter pour maximiser le bénéfice ? Version continue (sous-ensemble de $\mathbb{R}^2$). Quel rapport avec les tests ? Quel est le meilleur test de niveau $\alpha$ ? Réponse : chapitre 5 (lemme de Neyman-Pearson).
**Notions de probabilités à revoir :** f.d.r. et quantile, loi gaussienne, $\chi^2$, Student, Fisher, théorèmes de Cochran et Gosset, inégalités de Bienaymé-Tchebychev et Hoeffding, statistiques d'ordre.

---

## 3. Outils mathématiques

> Section « Les outils mathématiques » du poly (§3, p. 35–38) : fonction de répartition et quantile ; loi de Student non centrale et loi de Fisher ; inégalité de Hoeffding ; couplage de variables de Bernoulli ; liste des résultats des chapitres 1–3 utilisés.

### Définition 3.1 — Fonction de répartition et fonction quantile
**Source :** Poly ch.4, Outils, Définition 3.1, p. 35
**Hypothèses :** $\mathbb{Q}$ loi de probabilité sur $(\mathbb{R},\mathcal{B}(\mathbb{R}))$.
**Énoncé :** Sa **fonction de répartition** est $F:t\longmapsto\mathbb{Q}(]-\infty,t])$ ; c'est une fonction croissante, continue à droite, de limite 0 en $-\infty$ et 1 en $+\infty$. Sa **fonction quantile**, ou **inverse généralisée**, est définie pour $\beta\in\,]0,1[$ par
$$F^{\leftarrow}(\beta):=\inf\{t\in\mathbb{R},\ F(t)\ge\beta\},$$
et $F^{\leftarrow}(\beta)$ est appelé le **quantile d'ordre $\beta$** de $\mathbb{Q}$.
**Preuve (étapes) :** sans objet (définition).
**Intuition :** tout le chapitre se lit à travers des quantiles ($z_{1-\alpha/2}$, $\mathrm{t}^{(n-1)}_{1-\alpha/2}$, $\chi^2_{\alpha/2}(n-1)$, $c_\alpha$) ; la définition fonctionne même si $F$ n'est pas inversible (lois discrètes : Exemple 2.5, Exercices 4 et 6).
**Pièges / erreurs classiques :** Question courte n°10.

---

### Proposition 3.1 — Propriété caractéristique du quantile
**Source :** Poly ch.4, Outils, Proposition 3.1, p. 35
**Hypothèses :** notations de la Déf. 3.1.
**Énoncé :** Pour tous $t\in\mathbb{R}$ et $\beta\in\,]0,1[$,
$$F^{\leftarrow}(\beta)\le t\iff\beta\le F(t).$$
En particulier, si $U\sim\mathcal{U}([0,1])$, alors $F^{\leftarrow}(U)$ a pour loi $\mathbb{Q}$.
**Preuve (étapes) :**
1. Posons $E_\beta:=\{s\in\mathbb{R},\ F(s)\ge\beta\}$ et $a:=F^{\leftarrow}(\beta)=\inf E_\beta$. $E_\beta$ est non vide (car $F\to 1$ en $+\infty$ et $\beta<1$) et minoré (le poly écrit « majoré à gauche ») car $F\to 0$ en $-\infty$ et $\beta>0$ ; il est stable par passage à un point plus grand ($F$ croissante).
2. Il existe donc une suite $(s_k)$ de $E_\beta$ décroissant vers $a$ ; la **continuité à droite** de $F$ donne $F(a)=\lim_kF(s_k)\ge\beta$, i.e. $a\in E_\beta$ (l'infimum est atteint).
3. Si $\beta\le F(t)$, alors $t\in E_\beta$, donc $a\le t$.
4. Réciproquement, si $a\le t$, la croissance de $F$ donne $F(t)\ge F(a)\ge\beta$.
5. Seconde assertion : $U\in\,]0,1[$ p.s., et pour tout $t$, $\mathbb{P}(F^{\leftarrow}(U)\le t)=\mathbb{P}(U\le F(t))=F(t)$ (par l'équivalence et la loi uniforme). $\square$

**Commentaire du poly :** lorsque $F$ est continue et strictement croissante sur l'intervalle où elle prend ses valeurs dans $]0,1[$ (lois gaussienne, Student, $\chi^2$, Fisher), la fonction quantile est l'inverse usuel et $F(F^{\leftarrow}(\beta))=\beta$ pour tout $\beta\in\,]0,1[$.
**Figure (p. 36) :** quantile d'ordre $\alpha=0{,}10$ de $\mathcal{N}(0,1)$, de Student à 5 d.l. et du $\chi^2$ à 4 d.l. : lecture sur la f.d.r. (on part de l'ordonnée $\alpha$, on lit l'abscisse $F^{\leftarrow}(\alpha)$) et sur la densité (aire à gauche $=\alpha$) ; pour le $\chi^2$ (non symétrique), quantiles d'ordre $\alpha$ et $1-\alpha$ non opposés.
**Méthodes mobilisées :** propriétés de l'infimum, continuité à droite ; méthode d'inversion (simulation).

---

### Remarque (p. 36) — Conventions d'écriture des quantiles
**Source :** Poly ch.4, Outils, « Conventions d'écriture retenues dans ce chapitre », p. 36
**Énoncé :**
- **Loi $\mathcal{N}(0,1)$** : f.d.r. $\Phi$, quantile d'ordre $\beta$ noté $z_\beta$ : $\Phi(z_\beta)=\beta$ ; symétrie $z_{1-\beta}=-z_\beta$. Valeurs usuelles : $z_{0,95}=1{,}645$, $z_{0,975}=1{,}96$, $z_{0,99}=2{,}326$, $z_{0,995}=2{,}576$, $z_{0,999}=3{,}090$.
- **Student $\mathrm{t}(k)$** : f.d.r. $F_{\mathrm{t}(k)}$, quantile $\mathrm{t}^{(k)}_\beta$ ; densité paire $\Rightarrow$ $\mathrm{t}^{(k)}_{1-\beta}=-\mathrm{t}^{(k)}_\beta$.
- **$\chi^2(k)$** : f.d.r. $F_{\chi^2(k)}$, quantile $\chi^2_\beta(k)$ ; loi portée par $\mathbb{R}_+$, **non symétrique** : les deux quantiles d'un intervalle bilatéral ne sont pas opposés.
- **La notation $\Phi^{-1}$ n'est pas employée** ; on écrit $z_\beta$.

---

### Définition 3.2 — Loi de Student non centrale, loi de Fisher
**Source :** Poly ch.4, Outils, Définition 3.2, p. 37
**Hypothèses :** $k,k_1,k_2$ entiers strictement positifs, $\delta\in\mathbb{R}$. Rappel (chapitre 1, Définition 12) : si $N\sim\mathcal{N}(0,1)$ et $U\sim\chi^2(k)$ sont indépendantes, $N/\sqrt{U/k}\sim\mathrm{t}(k)$.
**Énoncé :**
- Si $N\sim\mathcal{N}(\delta,1)$ et $U\sim\chi^2(k)$ sont **indépendantes**, la loi de $N/\sqrt{U/k}$ est la **loi de Student non centrale** à $k$ degrés de liberté et de **paramètre de non-centralité** $\delta$. Pour $\delta=0$, on retrouve $\mathrm{t}(k)$.
- Si $U_1\sim\chi^2(k_1)$ et $U_2\sim\chi^2(k_2)$ sont **indépendantes**, la loi de $(U_1/k_1)/(U_2/k_2)$ est la **loi de Fisher** de paramètres $(k_1,k_2)$, notée $\mathrm{F}(k_1,k_2)$.

**Commentaires du poly :** la Student non centrale donne la **fonction puissance du test de Student** (Ex. 2.11) ; la loi de Fisher donne le **pivot pour le rapport de deux variances gaussiennes** (Exercice 5). Si $T\sim\mathrm{t}(k)$, alors $T^2\sim\mathrm{F}(1,k)$ (se lit directement sur les définitions : $N^2\sim\chi^2(1)$).
**Preuve (étapes) :** sans objet (définitions).

---

### Théorème 3.1 — Inégalité de Hoeffding
**Source :** Poly ch.4, Outils, Théorème 3.1, p. 37
**Hypothèses :** $X_1,\dots,X_n$ variables aléatoires réelles **indépendantes**, avec $X_i\in[a_i,b_i]$ presque sûrement, $a_i<b_i$. $S_n:=\sum_{i=1}^n\big(X_i-\mathbb{E}[X_i]\big)$.
**Énoncé :** Pour tout $t>0$,
$$\mathbb{P}(S_n\ge t)\le\exp\Big(-\frac{2t^2}{\sum_{i=1}^n(b_i-a_i)^2}\Big).$$
**Preuve (étapes) :** **admise dans ce chapitre** : « démontré dans l'annexe du polycopié consacrée aux inégalités de concentration » ; la démonstration repose sur l'**inégalité de Chernoff** (Section 5, compléments) et sur le **lemme de Hoeffding** (majoration de la transformée de Laplace d'une variable centrée bornée).
**Intuition :** quand les observations sont bornées, majoration **exponentielle**, bien plus fine que Bienaymé-Tchebychev (qui n'utilise que la variance) pour les petites probabilités.

---

### Corollaire 3.1 — Cas d'un $n$-échantillon borné
**Source :** Poly ch.4, Outils, Corollaire 3.1, p. 37
**Hypothèses :** $X_1,\dots,X_n$ indépendantes et de même loi, à valeurs dans $[a,b]$ p.s., d'espérance $m$.
**Énoncé :** Pour tout $\delta>0$,
$$\mathbb{P}\big(|\bar X_n-m|\ge\delta\big)\le 2\exp\Big(-\frac{2n\delta^2}{(b-a)^2}\Big).$$
En particulier, pour des variables de Bernoulli ($[a,b]=[0,1]$), la majoration est $2\exp(-2n\delta^2)$.
**Preuve (étapes) :**
1. Th. 3.1 avec $t=n\delta$ : $\sum_i(X_i-m)=n(\bar X_n-m)$ et $\sum_i(b_i-a_i)^2=n(b-a)^2$, d'où $\mathbb{P}(\bar X_n-m\ge\delta)\le\exp(-2n\delta^2/(b-a)^2)$.
2. Même théorème appliqué à $-X_1,\dots,-X_n$ (à valeurs dans $[-b,-a]$, d'espérance $-m$) : même majoration pour $\mathbb{P}(\bar X_n-m\le-\delta)$.
3. **Sous-additivité** : somme des deux. $\square$

**Méthodes mobilisées :** symétrisation ($X\to -X$), borne de l'union.
**Pièges / erreurs classiques :** utilisé à l'Ex. 1.8 avec $>\delta$ (plus faible que $\ge\delta$, donc la majoration reste valable).

---

### Lemme 3.1 — Couplage de deux lois binomiales
**Source :** Poly ch.4, Outils, Lemme 3.1, p. 38
**Hypothèses :** $0\le\theta\le\vartheta\le 1$, $n\ge 1$.
**Énoncé :** Il existe, sur un même espace de probabilité, deux variables $A$ et $B$ telles que $A\sim\mathrm{Bin}(n,\theta)$, $B\sim\mathrm{Bin}(n,\vartheta)$ et $A\le B$ presque sûrement. En conséquence, pour tout $c\in\mathbb{R}$,
$$\mathbb{P}\big(\mathrm{Bin}(n,\theta)\ge c\big)\le\mathbb{P}\big(\mathrm{Bin}(n,\vartheta)\ge c\big).$$
**Preuve (étapes) :**
1. $U_1,\dots,U_n$ indépendantes de loi $\mathcal{U}([0,1])$ ; $A:=\sum_{i=1}^n\mathbb{1}_{\{U_i\le\theta\}}$, $B:=\sum_{i=1}^n\mathbb{1}_{\{U_i\le\vartheta\}}$.
2. Les $\mathbb{1}_{\{U_i\le\theta\}}$ sont **indépendantes** de loi $\mathcal{B}\mathrm{er}(\theta)$, donc $A\sim\mathrm{Bin}(n,\theta)$ ; de même $B\sim\mathrm{Bin}(n,\vartheta)$.
3. $\theta\le\vartheta\Rightarrow\mathbb{1}_{\{U_i\le\theta\}}\le\mathbb{1}_{\{U_i\le\vartheta\}}$ pour tout $i$, d'où $A\le B$ p.s. et $\{A\ge c\}\subset\{B\ge c\}$. $\square$

**Intuition :** **coupler** deux lois = les réaliser sur un même espace pour les comparer trajectoire par trajectoire ; sert à établir la croissance de la fonction puissance dans le modèle binomial (Ex. 2.5, Exercice 6).

---

### Remarque (p. 38) — Résultats des chapitres 1 à 3 utilisés sans redémonstration
**Source :** Poly ch.4, Outils, p. 38
**Énoncé :**
- Statistique et estimateur ponctuel (ch.1 §1.5 ; ch.2) : bornes d'IC et statistiques de test sont des statistiques.
- Intervalle de confiance, définition minimale (ch.2 §2) : la Déf. 1.1 l'étend aux régions de $\mathbb{R}^p$.
- Loi du $\chi^2$, loi de Student, théorèmes de **Cochran** et de **Gosset** (ch.1 §2 et §1.9) : lois des trois pivots gaussiens.
- Loi Gamma (ch.1 §2) : $\chi^2(2n)$ du pivot de l'Exercice 1 en est un cas particulier.
- Régression linéaire gaussienne (ch.1 §4 ; ch.2 §4) : modèle de l'Ex. 2.15.
- Statistiques d'ordre et loi de $X_{n:n}$ dans le modèle uniforme (ch.1 §1.5 ; ch.3 Ex. 1.9) : pivot de l'Exercice 3.
- Inégalité de Bienaymé-Tchebychev (ch.2 §2) : IC d'une proportion, test de rangs (Exercice 7).
- Loi des grands nombres (ch.2 §2) : interprétation fréquentiste du niveau de couverture.
- Variance empirique et sa normalisation (ch.3 Ex. 1.4) : $S_n^2$.
- Le test comme règle de décision (ch.3 §4) : espace d'actions $\{0,1\}$, perte à deux constantes, risque via la fonction puissance.
- Ordre partiel sur les risques et admissibilité (ch.3 §1.5) : le préordre sur les tests (§2.3) en est la transposition.

---

## 4. Exercices du poly

> Corrigés **intégrés au poly** (§4.4, p. 46–54), qui « reprennent, en les complétant et en corrigeant les points signalés en tête de fichier, ceux distribués avec la feuille de petite classe de 2025 ». Les résultats des chapitres précédents (loi Gamma et $\chi^2$, Cochran, Gosset, Bienaymé-Tchebychev) sont appelés par renvoi et non redémontrés, sauf si c'est l'objet de la question. Groupe 1 (Ex. 1–3) : traités en petite classe ; Groupe 2 (Ex. 4–7) : **bonus**, non traités en PC (ordre conseillé : 4 d'abord, 7 en dernier). Difficulté : Ex. 1 (⋆⋆), Ex. 2 (⋆⋆), Ex. 3 (⋆), Ex. 4 (⋆), Ex. 5 (⋆⋆⋆), Ex. 6 (⋆⋆), Ex. 7 (⋆⋆⋆). Convention : vecteurs colonne, $a^\top$ transposée.
> Les réponses aux **questions courtes** ne sont **pas** données dans le poly : celles ci-dessous sont déduites du cours (signalé).

### 4.1 Questions courtes (Poly ch.4, §4.1, p. 39)

1. *Définition d'une région de confiance et de son niveau de couverture $1-\alpha$. Sur quoi porte l'aléa : le paramètre ou la région ?* (Déf. 1.1) — **Réponse (déduite du cours)** : $\mathcal{C}:\mathsf{Z}\to\mathcal{B}(\mathbb{R}^p)$ mesurable au sens (i), avec $\inf_\theta\mathbb{P}_\theta(g(\theta)\in\mathcal{C}(Z))\ge 1-\alpha$ ; l'aléa porte sur **la région** ($\theta$ est déterministe).
2. *Vrai ou faux : si l'IC calculé vaut $[0,2]$, alors $\mathbb{P}_\theta(\theta\in[0,2])\ge 1-\alpha$.* — **Faux / sans objet** : les deux membres sont déterministes (« Qui est aléatoire ? »).
3. *Qu'est-ce qu'une fonction pivotale ? Ne dépend-elle pas du paramètre ?* (Déf. 1.2) — Fonction $G(z,\theta)$ dont la loi sous $\mathbb{P}_\theta$ ne dépend pas de $\theta$ ; **elle dépend de $\theta$** (sinon ce serait une statistique, inutilisable).
4. *Les quatre étapes de la construction par pivot.* (Méthode 1.1) — pivot ; loi $\mathbb{Q}$ ; $A_\alpha$ avec $\mathbb{Q}(A_\alpha)\ge 1-\alpha$ ; résoudre $G(Z,\theta)\in A_\alpha$ en $\theta$.
5. *Test pur, région de rejet, région d'acceptation.* (Déf. 2.1) — $\phi:\mathsf{Z}\to\{0,1\}$ mesurable ; $\mathcal{R}=\{\phi=1\}$ ; $\mathcal{A}=\mathsf{Z}\setminus\mathcal{R}$.
6. *Fonction puissance ; taille et niveau à partir d'elle.* (Déf. 2.2–2.3) — $\beta_\phi(\theta)=\mathbb{P}_\theta(\phi(Z)=1)$ ; taille $\overline{\alpha}(\phi)=\sup_{\Theta_0}\beta_\phi$ ; niveau $\alpha$ si $\overline{\alpha}(\phi)\le\alpha$.
7. *Pourquoi ne peut-on minimiser simultanément les deux erreurs ? Parti de Neyman-Pearson ?* (§2.4) — Agrandir $\mathcal{R}$ augmente $\beta_\phi$ partout (risque 1 ↑, risque 2 ↓) ; puissance continue, ne peut sauter de 0 à 1 à la frontière ; N-P : contraindre la taille $\le\alpha$, maximiser la puissance sur $\Theta_1$.
8. *Définir la $p$-valeur ; conclusion si elle vaut 2 % ?* (Déf. 2.4) — $\hat\alpha(Z)=\inf\{\alpha,\ Z\in\mathcal{R}_\alpha\}$ pour une famille de niveau $\alpha$ emboîtée ; rejet pour tout $\alpha>2$ %, non-rejet pour tout $\alpha<2$ % (donc rejet à 5 %, pas à 1 %).
9. *Vrai ou faux : sous $H_0$, la $p$-valeur suit toujours exactement $\mathcal{U}(]0,1[)$.* (Prop. 2.2) — **Faux** : seulement dominée stochastiquement ; uniforme si $\mathbb{P}_\theta(Z\in\mathcal{R}_\alpha)=\alpha$ pour tout $\alpha$.
10. *Fonction quantile, y compris si $F$ n'est pas inversible.* (Déf. 3.1) — $F^{\leftarrow}(\beta)=\inf\{t,\ F(t)\ge\beta\}$ ; caractérisée par $F^{\leftarrow}(\beta)\le t\iff\beta\le F(t)$.

---

### Exercice 1 — Modèle exponentiel (⋆⋆)
**Source :** Poly ch.4, Exercice 1, p. 39–40 ; corrigé p. 46–49
**Objectif (poly) :** appliquer la méthode du pivot au seul modèle non gaussien de la feuille : $2\theta^{-1}\sum X_i\sim\chi^2(2n)$ ; test unilatéral de niveau $\alpha$, puissance, taille, $p$-valeur ; IC bilatéral et deux bornes unilatérales.

**Énoncé complet.** Soit $Z=(X_1,\dots,X_n)$ un $n$-échantillon du modèle
$$\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{E}(1/\theta),\ \theta\in\Theta:=\mathbb{R}_+^*\}\big),$$
où $\mathcal{E}(\lambda)$ est la loi exponentielle d'**intensité** $\lambda$ (densité $\lambda e^{-\lambda x}$ sur $\mathbb{R}_+$). Ici **$\theta$ est l'espérance** de la loi : densité $p_\theta(x):=\theta^{-1}e^{-x/\theta}$. Soient $\alpha\in\,]0,1[$ et $\theta_0>0$. Applications numériques : $\theta_0=2$, $\alpha=5$ %, $n=10$, échantillon $\{2{,}9;\ 4{,}2;\ 5{,}9;\ 1{,}7;\ 6{,}8;\ 1{,}3;\ 1{,}5;\ 0{,}2;\ 0{,}4;\ 3{,}2\}$ de somme $28{,}1$.
1. Tester $H_0:\theta=\theta_0$ contre $H_1:\theta>\theta_0$.
   (a) Montrer que, sous $p_\theta\cdot\mathrm{Leb}$, $2\theta^{-1}\sum_{i=1}^nX_i$ suit une loi $\chi^2(2n)$ (décomposition d'une exponentielle comme loi Gamma, stabilité par somme ; figure 1 : densité du $\chi^2$ pour divers d.l., de mode $p-2$ pour $p\ge 2$).
   (b) Proposer un estimateur de $\theta$ (comparer EMV et estimateur des moments associé à $T(x)=x$).
   (c) En déduire un test de niveau $\alpha$.
   (d) Expression de la fonction puissance et taille du test (figure 1 : puissance pour différentes valeurs critiques).
   (e) Calculer la $p$-valeur.
2. Tester $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$. (a) Forme d'une région de rejet de niveau $\alpha$. (b) Étudier la fonction puissance. (c) $p$-valeur.
3. Intervalles de confiance pour $\theta$. (a) Avec le pivot $G(Z,\theta):=2\theta^{-1}\sum_{i=1}^nX_i$, IC bilatéral exact de niveau $1-\alpha$. (b) Bornes de confiance unilatérales exactes de niveau $1-\alpha$ (supérieure seule, puis inférieure seule). (c) A.N. $\alpha=5$ %, $n=10$, $\sum X_i=28{,}1$, sachant $\chi^2_{0,025}(20)\approx 9{,}59$ et $\chi^2_{0,975}(20)\approx 34{,}17$.

**Corrigé complet.**
- **1(a)** Une exponentielle d'intensité $\lambda$ est une loi Gamma de paramètres $(1,\lambda)$ ; si $Y\sim\Gamma(a,b)$ alors $cY\sim\Gamma(a,b/c)$ pour $c>0$ (ch.1 §2). Ici $X_i\sim\mathcal{E}(1/\theta)=\Gamma(1,1/\theta)$, donc $2X_i/\theta\sim\Gamma(1,1/2)$ — le poly écrit « loi Gamma de paramètres $(1,2)$, c'est-à-dire $\chi^2(2)$ » [**note de l'extracteur** : avec la convention $\Gamma(a,b)$ = (forme, **taux**) qui précède, $c=2/\theta$ donne un taux $(1/\theta)/(2/\theta)=1/2$ ; « $(1,2)$ » correspond à la paramétrisation (forme, **échelle**) ; la conclusion $\chi^2(2)=\Gamma(1,\text{taux }1/2)$ est juste]. Par **indépendance** des $X_i$ et **stabilité de la famille Gamma à taux fixé par somme des formes** :
$$2\theta^{-1}\sum_{i=1}^nX_i\sim\chi^2(2n)\quad\text{sous }p_\theta\cdot\mathrm{Leb}.$$
On dit que $2\theta^{-1}\sum X_i$ est une **fonction pivotale** : sa loi ne dépend pas de $\theta$.
- **1(b)** Vraisemblance $\theta\mapsto\theta^{-n}\exp(-\theta^{-1}\sum_iX_i)$ sur $(\mathbb{R}_+^*)^n$ ; log-vraisemblance normalisée $\theta\mapsto-\log\theta-\bar X_n/\theta$, tend vers $-\infty$ en $0^+$ et en $+\infty$, dérivée $-1/\theta+\bar X_n/\theta^2$ nulle en l'unique point $\bar X_n$, qui est donc le maximum : $\hat\theta_n^{\mathrm{MV}}=\bar X_n$. Comme $\mathbb{E}_\theta[X_1]=\theta$, l'estimateur des moments associé à $T(x)=x$ est le même : $\bar X_n$.
- **1(c)** Statistique $T(Z):=(n\theta_0)^{-1}\sum_{i=1}^nX_i-1$, proche de 0 sous $H_0$ et $>0$ sous $H_1$ ; région $\mathcal{R}=\{T(z)\ge c\}$. Le niveau impose
$$\sup_{\theta\in\Theta_0}\mathbb{P}_\theta(Z\in\mathcal{R})=\mathbb{P}_{\theta_0}(T(Z)\ge c)=\mathbb{P}_{\theta_0}\Big(2\theta_0^{-1}\sum_{i=1}^nX_i\ge 2n(c+1)\Big)=\mathbb{P}\big(\chi^2(2n)\ge 2n(c+1)\big)$$
(pivot de 1(a)). F.d.r. de $\chi^2(2n)$ continue : on choisit $2n(c+1)=\chi^2_{1-\alpha}(2n)$, d'où
$$\mathcal{R}=\Big\{z\in(\mathbb{R}_+)^n:\ 2\theta_0^{-1}\sum_{i=1}^nz_i\ge\chi^2_{1-\alpha}(2n)\Big\}.$$
- **1(d)** Pour tout $\theta\ge\theta_0$,
$$\beta(\theta)=\mathbb{P}_\theta\Big(2\theta_0^{-1}\sum_iX_i\ge\chi^2_{1-\alpha}(2n)\Big)=\mathbb{P}_\theta\Big(2\theta^{-1}\sum_iX_i\ge\frac{\theta_0}{\theta}\chi^2_{1-\alpha}(2n)\Big)=\mathbb{P}\Big(\chi^2(2n)\ge\frac{\theta_0}{\theta}\chi^2_{1-\alpha}(2n)\Big).$$
$H_0$ simple : taille = niveau, $\overline{\alpha}(\phi)=\mathbb{P}_{\theta_0}(Z\in\mathcal{R})=\alpha$. Figure : $\beta$ vaut 0,05 en $\theta=\theta_0=2$ pour tout $n$ et, pour $\theta>\theta_0$ fixé, $n\mapsto\beta(\theta)$ croît vers 1.
- **1(e)** Pour $\alpha<\alpha'$, $\chi^2_{1-\alpha}(2n)>\chi^2_{1-\alpha'}(2n)$, donc $\mathcal{R}_\alpha\subset\mathcal{R}_{\alpha'}$ ; la $p$-valeur est le plus petit niveau qui rejette, solution de $2\sum X_i/\theta_0=\chi^2_{1-\hat\alpha(Z)}(2n)$ :
$$\hat\alpha(Z)=\mathbb{P}\Big(\chi^2(2n)\ge\frac{2}{\theta_0}\sum_{i=1}^nX_i\Big).$$
A.N. : $2\sum X_i/\theta_0=28{,}1$, $\hat\alpha(Z)=\mathbb{P}(\chi^2(20)\ge 28{,}1)\simeq 10{,}7$ % : **on ne rejette pas** $H_0$ au niveau 5 %, mais on la rejetterait au niveau 11 %. (Figure : densité de $T(Z)=2\sum X_k/\theta_0$ sous $H_0$ pour $n=10,20$ avec la valeur observée ; $n\mapsto\mathbb{P}_{\theta_0}(T(Z)>t_\star)$ croissante.)
- **2(a)** Région $\mathcal{R}'=\{z\in(\mathbb{R}_+)^n:\ 2\theta_0^{-1}\sum z_i\ge d\}$, $d$ à déterminer.
- **2(b)** Puissance $\theta\mapsto\mathbb{P}(\chi^2(2n)\ge d\,\theta_0/\theta)$, **croissante en $\theta$** ; taille $=\mathbb{P}_{\theta_0}(\chi^2(2n)\ge d)$ ; niveau $\alpha$ $\Rightarrow$ $d=\chi^2_{1-\alpha}(2n)$. Test identique à celui de la question 1.
- **2(c)** $p$-valeur identique à 1(e).
- **3(a)** $\mathbb{P}_\theta\big(\chi^2_{\alpha/2}(2n)\le 2\theta^{-1}\sum X_i\le\chi^2_{1-\alpha/2}(2n)\big)=1-\alpha$ ; inversion en $\theta$ :
$$\mathbb{P}_\theta\Big(\frac{2\sum_{i=1}^nX_i}{\chi^2_{1-\alpha/2}(2n)}\le\theta\le\frac{2\sum_{i=1}^nX_i}{\chi^2_{\alpha/2}(2n)}\Big)=1-\alpha.$$
- **3(b)** *Borne supérieure seule* : on veut $\mathbb{P}_\theta(\theta\le U)=1-\alpha$ ; $\{\theta\le U\}=\{G(Z,\theta)\ge 2\sum X_i/U\}$ et $\mathbb{P}_\theta(G\ge\chi^2_\alpha(2n))=1-\alpha$, d'où $2\sum X_i/U=\chi^2_\alpha(2n)$ et $\mathbb{P}_\theta\Big(\theta\in\Big]-\infty,\frac{2\sum X_i}{\chi^2_\alpha(2n)}\Big]\Big)=1-\alpha$. *Borne inférieure seule* : avec $\mathbb{P}_\theta(G\le\chi^2_{1-\alpha}(2n))=1-\alpha$, $\mathbb{P}_\theta\Big(\theta\in\Big[\frac{2\sum X_i}{\chi^2_{1-\alpha}(2n)},+\infty\Big[\Big)=1-\alpha$.
- **3(c)** $2n=20$, $2\sum X_i=56{,}2$ : $\mathrm{IC}_{95\,\%}(\theta)=\Big[\frac{56{,}2}{34{,}17},\frac{56{,}2}{9{,}59}\Big]\approx[1{,}64;\ 5{,}86]$.

**Méthodes mobilisées :** identification de loi (Gamma $\to\chi^2$, stabilité par somme, changement d'échelle) ; EMV par annulation de la dérivée de la log-vraisemblance ; méthode des moments ; Méthode 1.1 (pivot) ; Méthode 2.1 (test unilatéral, calibration par quantile du $\chi^2$) ; monotonie de la puissance pour passer de $H_0$ simple à composite ; $p$-valeur par familles emboîtées ; inversion de pivot pour IC bilatéral/unilatéral.

---

### Exercice 2 — Modèle gaussien (⋆⋆) — « à savoir faire »
**Source :** Poly ch.4, Exercice 2, p. 40–41 ; corrigé p. 49–50
**Objectif (poly) :** test bilatéral sur la moyenne (variance connue puis inconnue) ; redémonstration du théorème de Gosset par projection orthogonale sur la droite engendrée par le vecteur constant ; test de Student.

**Énoncé complet.** Soit $\sigma^2>0$ **connu** et $Z=(X_1,\dots,X_n)$ un $n$-échantillon de $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\mu,\sigma^2),\ \mu\in\mathbb{R}\}\big)$. Soit $\mu_0\in\mathbb{R}$ ; on teste $H_0:\mu=\mu_0$ contre $H_1:\mu\ne\mu_0$. Pour $c>0$, $\phi_c(Z):=\mathbb{1}_{\{T(Z)\ge c\}}$ avec
$$T(Z):=\sqrt n\,\frac{|\bar X_n-\mu_0|}{\sigma},\qquad\bar X_n:=\frac1n\sum_{i=1}^nX_i .$$
1. Déterminer la fonction puissance (à $c$ fixé) à l'aide de $\Phi$ (figure 2 : $\mu_0=0$, $\sigma=1$, $c=z_{0,975}$, $n\in\{5,10,20\}$).
2. Taille en fonction de $c$ ; valeur critique d'un test de niveau $\alpha\in\,]0,1[$.
3. $p$-valeur associée à $Z$.

Variance désormais **inconnue** : modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\mu,\sigma^2),\ \theta:=(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*\}\big)$.

4. Montrer que sous $\mathbb{P}_\theta$, $\bar X_n$ et $S_n^2$ sont indépendantes (indication : projection orthogonale $\Pi$ sur le sous-espace engendré par $\mathbf{1}=(1,\dots,1)^\top\in\mathbb{R}^n$).
5. Montrer que sous $\mathbb{P}_\theta$, $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$.

On propose $\tilde\phi_c(Z):=\mathbb{1}_{\{\tilde T(Z)\ge c\}}$ avec $\tilde T(Z):=\sqrt n\,|\bar X_n-\mu_0|/S_n$.

6. Sous $\mathbb{P}_\theta$, loi de $\sqrt n(\bar X_n-\mu_0)/S_n$ (Student non centrale).
7. Taille en fonction de $c$.
8. Valeur critique d'un test de niveau $\alpha$.
9. $p$-valeur de $Z$.

**Corrigé complet.** Sous $\mathbb{P}_\mu$, $\bar X_n\sim\mathcal{N}(\mu,\sigma^2/n)$, donc $T(Z)\sim\big|\mathcal{N}(\sqrt n(\mu-\mu_0)/\sigma,1)\big|$ (figure 2 droite : densité de $|X|$, $X\sim\mathcal{N}(\nu,1)$, $\nu=0,1,2$).
1. Avec $W\sim\mathcal{N}(0,1)$, pour tout $c>0$ :
$$\beta_c(\mu)=\mathbb{P}_\mu(T(Z)\ge c)=\mathbb{P}\Big(\Big|\frac{\sqrt n}{\sigma}(\mu-\mu_0)+W\Big|\ge c\Big)=1-\Phi\Big(\frac{\sqrt n}{\sigma}(\mu_0-\mu)+c\Big)+\Phi\Big(\frac{\sqrt n}{\sigma}(\mu_0-\mu)-c\Big).$$
2. Risque de première espèce : $\overline{\alpha}_c=\beta_c(\mu_0)=1-\Phi(c)+\Phi(-c)=2(1-\Phi(c))$ (car $\Phi(-c)=1-\Phi(c)$). Niveau $\alpha$ : $2(1-\Phi(c_\alpha))=\alpha$, soit $c_\alpha=z_{1-\alpha/2}$.
3. Pour $0\le\alpha<\alpha'\le 1$, $z_{1-\alpha/2}>z_{1-\alpha'/2}$, donc $\mathcal{R}_\alpha\subset\mathcal{R}_{\alpha'}$ ; $\hat\alpha(Z)$ vérifie $T(Z)=z_{1-\hat\alpha(Z)/2}$, d'où
$$\hat\alpha(Z)=2\big(1-\Phi(T(Z))\big).$$
4. $\mathbf{1}\in\mathbb{R}^n$ vecteur constant, $\mathrm{I}_n$ identité, $\Pi$ projection orthogonale sur $\mathbb{R}\mathbf{1}$. On a $\bar X_n=n^{-1}\mathbf{1}^\top\Pi Z$ et $S_n^2=(n-1)^{-1}\|(\mathrm{I}_n-\Pi)Z\|^2$. Sous $\mathbb{P}_\theta$, $Z\sim\mathcal{N}_n(\mu\mathbf{1},\sigma^2\mathrm{I}_n)$ ; par le **théorème de Cochran** appliqué à $\mathbb{R}^n=\mathbb{R}\mathbf{1}\oplus(\mathbb{R}\mathbf{1})^\perp$, $\Pi Z$ et $(\mathrm{I}_n-\Pi)Z$ sont **indépendants** ; $\bar X_n$ (fonction du premier) et $S_n^2$ (fonction du second) le sont donc aussi.
5. Toujours par Cochran, $\|(\mathrm{I}_n-\Pi)Z\|^2/\sigma^2\sim\chi^2(n-1)$, la dimension de $(\mathbb{R}\mathbf{1})^\perp$ étant $n-1$ (et $(\mathrm{I}_n-\Pi)\mu\mathbf{1}=0$) ; d'où $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$.
6. Sous $\mathbb{P}_\theta$, $\sqrt n(\bar X_n-\mu_0)/\sigma\sim\mathcal{N}(\sqrt n(\mu-\mu_0)/\sigma,1)$ et $S_n/\sigma=\sqrt{(n-1)S_n^2/\sigma^2/(n-1)}$, **indépendantes** (Q4–Q5) ; par définition de la Student non centrale (Déf. 3.2), $\dfrac{\sqrt n(\bar X_n-\mu_0)}{S_n}$ suit une **loi de Student non centrale** à $n-1$ d.l. et de paramètre de non-centralité $\gamma=\sqrt n(\mu-\mu_0)/\sigma$.
7. Sous $H_0$ ($\gamma=0$), loi $\mathrm{t}(n-1)$ ; en répétant l'argument de Q2 (parité de la densité de Student), taille $\overline{\alpha}_c=2(1-F_{\mathrm{t}(n-1)}(c))$.
8. $c_\alpha=\mathrm{t}^{(n-1)}_{1-\alpha/2}$ : la **plus petite** valeur qui garantit le niveau, donc celle qui **maximise la puissance** parmi les tests de cette forme qui le garantissent.
9. Comme Q3 : $\widehat\alpha(Z)=2\big(1-F_{\mathrm{t}(n-1)}(\tilde T(Z))\big)$.

**Méthodes mobilisées :** calcul de puissance d'un test bilatéral (loi normale « repliée »), symétrie de $\Phi$, $p$-valeur bilatérale par familles emboîtées ; **théorème de Cochran** (projections orthogonales de vecteurs gaussiens) ; définition de la loi de Student (non centrale) ; choix de la plus petite valeur critique pour maximiser la puissance.

---

### Exercice 3 — Intervalle de confiance pour la loi uniforme (⋆)
**Source :** Poly ch.4, Exercice 3, p. 42 ; corrigé p. 50
**Objectif (poly) :** reprendre le pivot $X_{n:n}/\theta$ et trouver, parmi tous les $A_\alpha$ de probabilité $1-\alpha$, celui qui donne l'**intervalle le plus court** — seul exemple du cours où la réponse n'est **pas** l'intervalle symétrique.

**Énoncé complet.** Soit $(X_1,\dots,X_n)$ un $n$-échantillon du modèle $\{\mathcal{U}([0,\theta]),\ \theta\in\Theta:=\mathbb{R}_+^*\}$ ; $X_{n:n}:=\max(X_1,\dots,X_n)$.
1. Montrer que $X_{n:n}/\theta$ est une fonction pivotale pour $\theta$ (figure 3 : densité $x\mapsto nx^{n-1}$ de $X_{n:n}/\theta$ sur $[0,1]$ et $y\mapsto ny^{-(n+1)}$ de $\theta/X_{n:n}$ sur $[1,+\infty[$, pour $n\in\{5,10,15\}$).
2. Déterminer l'intervalle de confiance de probabilité de couverture $1-\alpha$ de **longueur minimale**.

**Corrigé complet.** Sous $\mathbb{P}_\theta$, $X_i$ i.i.d. $\mathcal{U}([0,\theta])$.
1. Pour $x<0$, $\mathbb{P}_\theta(X_{n:n}/\theta\le x)=0$ ; pour $x>1$, $=1$ ; pour $x\in[0,1]$, par **indépendance**,
$$\mathbb{P}_\theta(X_{n:n}/\theta\le x)=\mathbb{P}_\theta\Big(\bigcap_{i=1}^n\{X_i\le\theta x\}\Big)=x^n .$$
Loi indépendante de $\theta$ : pivot.
2. Soit $I:=[X_{n:n},\ X_{n:n}/\alpha^{1/n}]$. $\mathbb{P}_\theta(\theta\in I)=\mathbb{P}_\theta(X_{n:n}/\theta\in[\alpha^{1/n},1])=1-(\alpha^{1/n})^n=1-\alpha$ : IC de niveau $1-\alpha$. Minimalité parmi $I_{a,b}:=[X_{n:n}/a,\ X_{n:n}/b]$ :
   - *Étape A.* Niveau : $\mathbb{P}_\theta(\theta\in I_{a,b})=\mathbb{P}_\theta(X_{n:n}/\theta\in[b,a])=(a\wedge 1)^n-(b\vee 0)^n\ge 1-\alpha$ ; on peut se restreindre à $a\le 1$, $b\ge 0$, i.e. chercher $0\le b<a\le 1$ avec $a^n\ge 1-\alpha+b^n$.
   - *Étape B.* Longueur (normalisée par $X_{n:n}$) $\ell=1/b-1/a$ ; la condition donne $b\le(a^n-(1-\alpha))^{1/n}$, d'où
$$\ell\ge\frac1a\Big(\frac{1}{(1-a^{-n}(1-\alpha))^{1/n}}-1\Big),$$
fonction **décroissante** de $a$ : la borne inférieure sur $\ell$ est minimale pour $a=1$.
   - *Étape C.* Avec $a=1$ : $0\le b\le\alpha^{1/n}$ et $\ell\ge\alpha^{-1/n}-1$ ; on prend $\ell=\alpha^{-1/n}-1$, soit $1/b=\alpha^{-1/n}$, ce qui redonne $I$.

L'intervalle optimal $[X_{n:n},X_{n:n}\alpha^{-1/n}]$ est **entièrement décalé d'un côté** (borne gauche = $X_{n:n}$) : $A_\alpha=[\alpha^{1/n},1]$, non symétrique en probabilité.
**Méthodes mobilisées :** loi du maximum (statistique d'ordre) par indépendance ; pivot d'échelle ; optimisation sous contrainte (longueur minimale à niveau fixé) ; monotonie.
**Pièges / erreurs classiques :** prendre les quantiles $\alpha/2$ et $1-\alpha/2$ par réflexe donne un intervalle plus long ; la densité $nx^{n-1}$ est croissante, donc les valeurs proches de 1 sont les plus probables : il faut mettre $A_\alpha$ contre 1.

---

### Exercice 4 — Modèle de Poisson (⋆) — bonus
**Source :** Poly ch.4, Exercice 4, p. 42–43 ; corrigé p. 50–51
**Objectif (poly) :** test d'une hypothèse simple contre une alternative simple ; préparation directe au lemme de Neyman-Pearson (chapitre 5).

**Énoncé complet.** Soit $(X_1,\dots,X_n)$ un $n$-échantillon de $(\mathbb{N},\mathcal{P}(\mathbb{N}),\{\mathrm{Poi}(\theta),\ \theta>0\})$. On teste $H_0:\theta=1$ contre $H_1:\theta=2$.
1. Rappeler la loi de $\sum_{i=1}^nX_i$ sous $\mathbb{P}_\theta$.
Désormais $n=10$.
2. Proposer un test de niveau 5 %. Quelle est sa taille ? (Statistique à valeurs entières : on retient ici l'**inégalité stricte**, sous laquelle les valeurs numériques sont calculées.)
3. Expression de la fonction puissance (figure 4).
4. $p$-valeur pour les échantillons $\{2,3,3,1,4,0,1,4,0,0\}$ et $\{4,2,1,1,0,1,0,2,0,2\}$.

**Corrigé complet.**
1. Si $X\sim\mathrm{Poi}(\theta_1)$ et $Y\sim\mathrm{Poi}(\theta_2)$ indépendantes, $X+Y\sim\mathrm{Poi}(\theta_1+\theta_2)$ : les **fonctions génératrices** se multiplient, $G_X(s)G_Y(s)=\exp(-(\theta_1+\theta_2)(1-s))$, celle de $\mathrm{Poi}(\theta_1+\theta_2)$, et la fonction génératrice caractérise la loi. Donc $\sum_{i=1}^nX_i\sim\mathrm{Poi}(n\theta)$.
2. $T(Z):=\sum_iX_i$ ; sous $H_0$, $T\sim\mathrm{Poi}(n)$ (espérance $n$) ; sous $H_1$, $T\sim\mathrm{Poi}(2n)$ (espérance $2n$) : $T$ plus grande sous $H_1$, d'où $\mathcal{R}=\{T(z)>c\}$. Calibrage : $\mathbb{P}_1(T(Z)>c)\le\alpha$, i.e. $\mathbb{P}_1(T(Z)\le c)>1-\alpha$ [le poly écrit $>$ ; $\ge$ conviendrait aussi], soit $c_\alpha=\inf\{t\in\mathbb{R},\ F_{\mathrm{Poi}(10)}(t)>1-\alpha\}$. Pour $n=10$ : $F_{\mathrm{Poi}(10)}(14)\simeq 0{,}917$, $F_{\mathrm{Poi}(10)}(15)\simeq 0{,}951$, d'où $c_{5\,\%}=15$ et $\mathcal{R}_{0,05}=\{z:\ T(z)>15\}$. Taille : $\mathbb{P}_1(T(Z)>15)=\mathbb{P}(\mathrm{Poi}(10)>15)\simeq 4{,}9\,\%<5\,\%$ — **exemple de test dont le niveau et la taille diffèrent**.
3. $\theta\mapsto\mathbb{P}_\theta(T(Z)>15)=\mathbb{P}(\mathrm{Poi}(10\theta)>15)$ (figure 4 : lignes $y=0{,}049$ et $y=0{,}8435$, puissance en $\theta=2$).
4. Pour $0<\alpha<\alpha'<1$, $c_{\alpha'}<c_\alpha$ (ou $\le$), donc $\mathcal{R}_\alpha\subset\mathcal{R}_{\alpha'}$. $T$ entière : la plus petite région de rejet contenant $T(Z)$ correspond à $c_{\hat\alpha(Z)}=T(Z)-1$, d'où
$$\hat\alpha(Z)=\mathbb{P}\big(\mathrm{Poi}(10)>T(Z)-1\big)=1-\mathbb{P}\big(\mathrm{Poi}(10)\le T(Z)-1\big).$$
Premier échantillon : $T(Z)=18$, $\hat\alpha(Z)=0{,}0143$ ; $18\in\mathcal{R}_{0,05}$ : **on rejette** $H_0$ à 5 %. Second : $T(Z)=13$, $\hat\alpha(Z)=0{,}2084$ : **on ne rejette pas** ; ou bien $H_0$ est vraie (décision correcte), ou bien $H_1$ est vraie et l'on se trompe avec probabilité $\mathbb{P}_2(T(Z)\le 15)\simeq 15{,}7$ % (risque de seconde espèce).

**Méthodes mobilisées :** stabilité de Poisson par somme (fonctions génératrices) ; calibration discrète par inverse généralisée ; distinction taille/niveau ; $p$-valeur dans le cas discret ; risque de seconde espèce.

---

### Exercice 5 — Modèle gaussien à deux échantillons (⋆⋆⋆) — bonus
**Source :** Poly ch.4, Exercice 5, p. 43–44 ; corrigé p. 51–52
**Objectif (poly) :** dualité intervalle/test à deux échantillons gaussiens ; comparaison de deux variances par la loi de Fisher. Le plus long de la feuille.

**Énoncé complet.** Variable qualitative binaire (deux groupes), variable quantitative mesurée dans chacun. On observe $n$ mesures (groupe 0) et $p$ mesures (groupe 1), indépendantes et gaussiennes, de paramètres dépendant du groupe :
$$\Big(\mathbb{R}^{n+p},\mathcal{B}(\mathbb{R}^{n+p}),\big\{\mathcal{N}(\mu_0,\sigma^2)^{\otimes n}\otimes\mathcal{N}(\mu_1,\sigma^2)^{\otimes p},\ \theta:=(\mu_0,\mu_1,\sigma^2)\in\mathbb{R}^2\times\mathbb{R}_+^*\big\}\Big),$$
$X_1,\dots,X_n$ les $n$ premières variables canoniques, $Y_1,\dots,Y_p$ les $p$ dernières.
1. EMV de $\theta$.
2. IC pour $\mu_0-\mu_1$ de niveau $1-\alpha$.
3. En déduire un test de niveau $\alpha$ de $H_0:\mu_0=\mu_1$ contre $H_1:\mu_0\ne\mu_1$.
4. Test de niveau $\alpha$ de $H_0:\mu_0\le\mu_1$ contre $H_1:\mu_0>\mu_1$.

Application : consistance de deux correcteurs du concours d'entrée (notes sur 100) — Correcteur #1 : 120 observations, moyenne 75, écart-type 8,72 ; Correcteur #2 : 120 observations, moyenne 74,99, écart-type 6,54.

5. $p$-valeur du test ? Conclusion ?

Variances désormais différentes $\sigma_0^2$, $\sigma_1^2$ ; $\theta:=(\mu_0,\mu_1,\sigma_0^2,\sigma_1^2)$.

6. Fonction pivotale pour $\sigma_1^2/\sigma_0^2$ (loi de Fisher ; figure 5 : densités $\mathrm{F}(10,5)$ et $\mathrm{F}(100,50)$).
7. Test de niveau $\alpha$ de $H_0:\sigma_0^2\le\sigma_1^2$ contre $H_1:\sigma_0^2>\sigma_1^2$.
8. $p$-valeur de ce test.

**Corrigé complet.**
1. Log-vraisemblance : $-\frac{n+p}{2}\log\sigma^2-\frac{1}{2\sigma^2}\sum_{i=1}^n(X_i-\mu_0)^2-\frac{1}{2\sigma^2}\sum_{j=1}^p(Y_j-\mu_1)^2$ (à constante près), maximisée en
$$\hat\mu_{0,n}:=\frac1n\sum_{i=1}^nX_i,\qquad\hat\mu_{1,p}:=\frac1p\sum_{j=1}^pY_j,\qquad\hat\sigma^2_{n,p}:=\frac{1}{n+p}\Big(\sum_{i=1}^n(X_i-\hat\mu_{0,n})^2+\sum_{j=1}^p(Y_j-\hat\mu_{1,p})^2\Big).$$
2. Sous $\mathbb{P}_\theta$, $\hat\mu_{0,n}-\hat\mu_{1,p}\sim\mathcal{N}\big(\mu_0-\mu_1,\sigma^2(n^{-1}+p^{-1})\big)$. Posons
$$S^2_{n,p}:=\frac{1}{n+p-2}\Big(\sum_{i=1}^n(X_i-\hat\mu_{0,n})^2+\sum_{j=1}^p(Y_j-\hat\mu_{1,p})^2\Big)=\frac{n+p}{n+p-2}\hat\sigma^2_{n,p}.$$
Comme à l'Exercice 2 (Cochran), $S^2_{n,p}$ est indépendant de $\hat\mu_{0,n}-\hat\mu_{1,p}$ et $(n+p-2)S^2_{n,p}/\sigma^2\sim\chi^2(n+p-2)$ ; par définition de la loi de Student,
$$G(Z,\theta):=\sqrt{\frac{np}{n+p}}\,\frac{(\hat\mu_{0,n}-\hat\mu_{1,p})-(\mu_0-\mu_1)}{S_{n,p}}\sim\mathrm{t}(n+p-2),$$
pivot pour $\mu_0-\mu_1$. Avec $A_\alpha$ délimité par les quantiles $\alpha/2$ et $1-\alpha/2$ (le plus court, densité paire unimodale) :
$$\mathcal{I}(Z)=\Big[\hat\mu_{0,n}-\hat\mu_{1,p}\pm\mathrm{t}^{(n+p-2)}_{1-\alpha/2}\sqrt{\frac{n+p}{np}}\,S_{n,p}\Big].$$
3. Test dual : $\mathcal{R}_\alpha:=\Big\{z:\ \sqrt{\frac{np}{n+p}}\frac{|\hat\mu_{0,n}(z)-\hat\mu_{1,p}(z)|}{S_{n,p}(z)}\ge\mathrm{t}^{(n+p-2)}_{1-\alpha/2}\Big\}=\{z:\ G(z;\mu_0,\mu_0,\sigma^2)\notin A_\alpha\}$. Pour $\theta=(\mu_0,\mu_0,\sigma^2)\in\Theta_0$, $\mathbb{P}_\theta(Z\in\mathcal{R}_\alpha)=\alpha$ : taille $\alpha$.
4. $\mathcal{R}_\alpha:=\Big\{z:\ \sqrt{\frac{np}{n+p}}\frac{\hat\mu_{0,n}(z)-\hat\mu_{1,p}(z)}{S_{n,p}(z)}\ge\mathrm{t}^{(n+p-2)}_{1-\alpha}\Big\}$. Pour $\mu_0-\mu_1\le 0$, avec $W_{n+p-2}\sim\mathrm{t}(n+p-2)$ :
$$\mathbb{P}_\theta(Z\in\mathcal{R}_\alpha)=\mathbb{P}\Big(W_{n+p-2}+\sqrt{\frac{np}{n+p}}\frac{\mu_0-\mu_1}{S_{n,p}(Z)}\ge\mathrm{t}^{(n+p-2)}_{1-\alpha}\Big)\le\mathbb{P}\big(W_{n+p-2}\ge\mathrm{t}^{(n+p-2)}_{1-\alpha}\big)=\alpha,$$
avec égalité pour $\mu_0=\mu_1$ : taille et niveau $\alpha$. [Le poly écrit ainsi la décomposition ; $W_{n+p-2}$ désigne $G(Z,\theta)$, et le terme ajouté est $\le 0$.]
5. D'après Q3, $\hat\alpha(Z)$ vérifie $\sqrt{np/(n+p)}\,|\hat\mu_{0,n}(Z)-\hat\mu_{1,p}(Z)|/S_{n,p}(Z)=\mathrm{t}^{(n+p-2)}_{1-\hat\alpha(Z)/2}$. Avec $n=p=120$, $\hat\mu_{0,n}=75$, $\hat\mu_{1,p}=74{,}99$, $S_{n,p}=\sqrt{\frac{n}{n+p-2}8{,}72^2+\frac{p}{n+p-2}6{,}54^2}$, on trouve $\mathrm{t}^{(238)}_{1-\hat\alpha(Z)/2}=0{,}01$, et le poly conclut « soit $\hat\alpha(Z)=1-0{,}5040=0{,}4960$ » : tout test de niveau raisonnable **ne rejette pas** $H_0$, cohérent avec la consistance des deux correcteurs.
   [**Note de l'extracteur (erreur probable du poly)** : $\mathrm{t}^{(238)}_{1-\hat\alpha/2}=0{,}01$ donne $1-\hat\alpha/2=F_{\mathrm{t}(238)}(0{,}01)\approx 0{,}504$, soit $\hat\alpha=2(1-0{,}504)\approx 0{,}992$ ; la valeur 0,4960 correspond au test **unilatéral** (Q4). La conclusion (non-rejet) est inchangée.]
6. Sous $\mathbb{P}_\theta$, $\sigma_0^{-2}\sum_{i=1}^n(X_i-\hat\mu_{0,n})^2\sim\chi^2(n-1)$ et $\sigma_1^{-2}\sum_{j=1}^p(Y_j-\hat\mu_{1,p})^2\sim\chi^2(p-1)$, **indépendantes** (fonctions des $X_i$ et des $Y_j$ respectivement). Par définition de la loi de Fisher :
$$G(Z,\theta):=\frac{\sigma_1^2}{\sigma_0^2}\cdot\frac{(n-1)^{-1}\sum_{i=1}^n(X_i-\hat\mu_{0,n})^2}{(p-1)^{-1}\sum_{j=1}^p(Y_j-\hat\mu_{1,p})^2}\sim\mathrm{F}(n-1,p-1),$$
pivot pour $\sigma_1^2/\sigma_0^2$.
7. $\mathrm{f}_{1-\alpha}(k_1,k_2)$ quantile d'ordre $1-\alpha$ de $\mathrm{F}(k_1,k_2)$ ; $W\sim\mathrm{F}(n-1,p-1)$. Test
$$\mathcal{R}_\alpha:=\Big\{z:\ \frac{(n-1)^{-1}\sum_{i=1}^n(X_i-\hat\mu_{0,n})^2}{(p-1)^{-1}\sum_{j=1}^p(Y_j-\hat\mu_{1,p})^2}\ge\mathrm{f}_{1-\alpha}(n-1,p-1)\Big\}.$$
Pour $\sigma_0^2\le\sigma_1^2$ : $\mathbb{P}_\theta(Z\in\mathcal{R}_\alpha)=\mathbb{P}\Big(\frac{\sigma_0^2}{\sigma_1^2}W\ge\mathrm{f}_{1-\alpha}(n-1,p-1)\Big)\le\mathbb{P}\big(W\ge\mathrm{f}_{1-\alpha}(n-1,p-1)\big)=\alpha$, égalité pour $\sigma_0^2=\sigma_1^2$ : taille et niveau $\alpha$.
8. $T(Z)$ statistique de Q7 ; $p$-valeur = plus petit $\alpha$ tel que $T(Z)\ge\mathrm{f}_{1-\alpha}(n-1,p-1)$. $F_{n-1,p-1}$ (f.d.r. de $\mathrm{F}(n-1,p-1)$) continue strictement croissante, $\alpha\mapsto\mathrm{f}_{1-\alpha}(n-1,p-1)=F^{-1}_{n-1,p-1}(1-\alpha)$ décroissante et bijective de $]0,1[$ sur $\mathbb{R}_+^*$ :
$$\hat\alpha(Z)=1-F_{n-1,p-1}(T(Z)).$$

**Méthodes mobilisées :** EMV par maximisation de la log-vraisemblance gaussienne ; théorème de Cochran (indépendance, loi du $\chi^2$ de la variance poolée) ; pivot de Student à deux échantillons ; **dualité intervalle/test** ; test unilatéral composite par monotonie ; pivot de **Fisher** ; $p$-valeur par f.d.r.

---

### Exercice 6 — Campagne de vaccination (⋆⋆) — bonus
**Source :** Poly ch.4, Exercice 6, p. 44 ; corrigé p. 53 (référence : M. Aitkin, *Evidence and the Posterior Bayes Factor*, Math. Scientist 17, 1992)
**Objectif (poly) :** choix de l'hypothèse nulle sur des données réelles.

**Énoncé complet.** Des plaignants ont poursuivi le ministère de la Santé après une campagne de vaccination d'enfants ayant entraîné des dommages fonctionnels irréversibles chez certains. Risque connu (études antérieures) : un cas sur 310 000 vaccinations, risque accepté par les plaignants. Le lot incriminé a servi à vacciner 300 533 enfants, parmi lesquels 4 cas de dommages.
1. On modélise « le vaccin provoque des dommages sur l'enfant $i$ » par $X_i\sim\mathcal{B}\mathrm{er}(p)$. Calculer $p_0$ correspondant aux études antérieures.

On teste $H_0:p\le p_0$ contre $H_1:p>p_0$ ($H_0$ = risque accepté par les plaignants).

2. $S_n:=\sum_{i=1}^nX_i$, $n=300\,533$. Pour $\alpha\in[0,1]$, test de niveau $\alpha$ fondé sur $S_n$ (inégalité **stricte** dans la région de rejet).
3. On donne $\mathbb{P}_{p_0}(S_n>0)=0{,}6207$, $\mathbb{P}_{p_0}(S_n>1)=0{,}2530$, $\mathbb{P}_{p_0}(S_n>2)=0{,}0748$, $\mathbb{P}_{p_0}(S_n>3)=0{,}0172$, $\mathbb{P}_{p_0}(S_n>4)=0{,}0032$. Rejet à 5 % ? à 1 % ?
4. $p$-valeur de l'observation ?

Modélisation alternative : $S_n\sim\mathrm{Poi}(\theta)$.

5. Valeur $\theta_0$ attendue si le vaccin est conforme.
6. Les plaignants demandent que le test établisse effectivement que le nombre moyen d'accidents reste inférieur à $\theta_0$ : pour eux, ce nombre moyen est supérieur à $\theta_0$, sauf preuve du contraire. Proposer un test fondé sur $S_n$ traduisant ce point de vue.
7. $p$-valeur de ce test ; rejet au seuil de 5 % ?

**Corrigé complet.** Modèle $\big(\{0,1\}^n,\mathcal{P}(\{0,1\}^n),\{\mathcal{B}\mathrm{er}(p)^{\otimes n},\ p\in\,]0,1[\}\big)$.
1. $p_0=1/310\,000\approx 3{,}23\cdot 10^{-6}$.
2. Pour $\{S_n>c\}$, le risque de première espèce est $\sup_{p\le p_0}\mathbb{P}_p(S_n>c)=\mathbb{P}_{p_0}(S_n>c)$ : si $p\le p_0$, $S_n$ a même loi que $\sum_{k=1}^n\mathbb{1}_{\{U_k\le p\}}$ ($U_k$ i.i.d. $\mathcal{U}([0,1])$) et $\sum_k\mathbb{1}_{\{U_k\le p\}}\le\sum_k\mathbb{1}_{\{U_k\le p_0\}}$ entraîne $\mathbb{P}_p(S_n>c)\le\mathbb{P}_{p_0}(S_n>c)$ (**couplage**, Lemme 3.1). Sous $\mathbb{P}_{p_0}$, $S_n\sim\mathrm{Bin}(n,p_0)$ ; niveau $\alpha$ :
$$c_\alpha:=\inf\{0\le c\le n,\ \mathbb{P}_{p_0}(S_n>c)\le\alpha\}=\inf\{0\le c\le n,\ \mathbb{P}_{p_0}(S_n\le c)\ge 1-\alpha\}=F_{p_0}^{-1}(1-\alpha),$$
$F_{p_0}^{-1}$ inverse généralisée de la f.d.r. de $\mathrm{Bin}(n,p_0)$, $n=300\,533$.
3. $\alpha=0{,}05$ : $c_\alpha=3$ ; $S_n=4\in\mathcal{R}_{0,05}=\{S_n>3\}$ : **on rejette** $H_0$. $\alpha=0{,}01$ : $c_\alpha=4$, $S_n=4\notin\mathcal{R}_{0,01}$ : **on ne rejette pas**.
4. $\alpha<\alpha'\Rightarrow c_\alpha\ge c_{\alpha'}$ (le poly écrit $>$), donc $\mathcal{R}_\alpha\subset\mathcal{R}_{\alpha'}$ ; $p$-valeur $=\inf\{\alpha,\ c_\alpha=3\}=1-\mathbb{P}_{p_0}(S_n\le 3)=0{,}017172$.
5. $\theta_0=np_0=300\,533/310\,000\approx 0{,}9695$.
6. Le corrigé écrit : « Les hypothèses restent $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$. Pour une région de rejet $\{S_n>c\}$, la fonction $\theta\mapsto\mathbb{P}_\theta(S_n>c)$ étant croissante, on choisit le plus petit $c$ tel que $\mathbb{P}_{\theta_0}(S_n>c)\le\alpha$ », soit
$$c_\alpha:=\min\{c\ge 0,\ \mathbb{P}_{\theta_0}(S_n\le c)\ge 1-\alpha\}=F_{\theta_0}^{-1}(1-\alpha),$$
$F_{\theta_0}^{-1}$ inverse généralisée de la f.d.r. de $\mathrm{Poi}(\theta_0)$ ; test $\mathcal{R}_\alpha=\{n\in\mathbb{N}:\ n>c_\alpha\}$.
7. Par monotonie des régions en $\alpha$, $p$-valeur $=1-F_{\theta_0}(3)=\mathbb{P}_{\theta_0}(S_n>3)=0{,}017173$ : **on rejette** $H_0$ au seuil de 5 %.

[**Note de l'extracteur :** l'énoncé de la Q6 (« pour les plaignants, le nombre moyen est supérieur à $\theta_0$ sauf preuve du contraire ») suggère de mettre $H_0:\theta\ge\theta_0$ et $H_1:\theta<\theta_0$ (point de vue inversé, cf. heuristique « $H_0$ = hypothèse en notre défaveur / la plus dangereuse ») ; le corrigé du poly garde pourtant $H_0:\theta\le\theta_0$. Avec l'hypothèse inversée, on rejetterait pour les petites valeurs de $S_n$ et la $p$-valeur serait $\mathbb{P}_{\theta_0}(S_n\le 4)\approx 1-0{,}0032$, sans rejet. Ce calcul n'est **pas** dans le poly ; à signaler comme ambiguïté plutôt qu'à enseigner.]
**Méthodes mobilisées :** modélisation Bernoulli/binomiale puis approximation de Poisson ; **couplage** pour la monotonie de la puissance ; calibration discrète par inverse généralisée ; $p$-valeur discrète ; choix de $H_0$ selon la partie.

---

### Exercice 7 — Test de Wilcoxon (⋆⋆⋆) — bonus
**Source :** Poly ch.4, Exercice 7, p. 44–45 ; corrigé p. 53–54
**Objectif (poly) :** seul test **non paramétrique** du cours et seul test construit par une **inégalité de déviation** ; loi d'une statistique de rang par un argument de permutation.

**Énoncé complet.** Pour des réels $x_1,\dots,x_q$, $x_{\ell:q}$ désigne la suite ordonnée $x_{1:q}\le\dots\le x_{q:q}$. Une firme compare une molécule hypoglycémiante à un placebo sur $n+m$ patients : à un premier groupe de $m$ individus un placebo (sans le leur dire), au second la molécule ; on mesure les glycémies $\{X_i\}_{i=1,\dots,n}$ et $\{Y_j\}_{j=1,\dots,m}$ [**note** : l'énoncé attribue $m$ individus au groupe placebo mais indexe les $X$ par $n$ ; l'attribution exacte des groupes n'intervient pas dans les calculs]. Hypothèses : $(X_1,\dots,X_n,Y_1,\dots,Y_m)$ indépendantes ; les $X_i$ de même f.d.r. $F_X$ continue ; les $Y_j$ de même f.d.r. $F_Y$ continue. On teste si les lois sont les mêmes ou si les $Y_i$ sont stochastiquement plus petits que les $X_i$ ($F_X<F_Y$) : $H_0:F_X=F_Y$ contre $H_1:F_X<F_Y$.
On pose $Z_i:=X_i$ ($i=1,\dots,n$), $Z_{n+i}:=Y_i$ ($i=1,\dots,m$), $R_i$ le **rang** de $Z_i$ dans $(Z_1,\dots,Z_{n+m})$ ($R_i=\ell$ si $Z_i=Z_{\ell:n+m}$). **Statistique de Wilcoxon** : $W_{n,m}:=\sum_{i=1}^nR_i$ ; sous $H_1$ elle est plus grande que sous $H_0$.
1. $N:=n+m$. Montrer que $R:=(R_1,\dots,R_N)$ suit, sous $H_0$, la loi uniforme sur l'ensemble $\mathcal{S}_N$ des permutations de $\{1,\dots,N\}$. En déduire que sous $H_0$, $W_{n,m}$ est **libre** (sa loi ne dépend pas de $F_X$). Loi de $R_i$ sous $H_0$ ?
2. Montrer que $\mathbb{E}_0[W_{n,m}]=n(n+m+1)/2$.
3. Montrer que sous $H_0$, $\mathrm{Var}_0(W_{n,m})=n\,\mathrm{Var}_0(R_1)+n(n-1)\mathrm{Cov}_0(R_1,R_2)$ et $0=\mathrm{Var}_0\big(\sum_{i=1}^{n+m}R_i\big)=(n+m)\mathrm{Var}_0(R_1)+(n+m)(n+m-1)\mathrm{Cov}_0(R_1,R_2)$, et en déduire $\mathrm{Var}_0(W_{n,m})=nm(n+m+1)/12$.
4. Proposer un test de niveau $\alpha$.

**Corrigé complet.** $F_X$, $F_Y$ continues $\Rightarrow$ $\mathbb{P}(Z_i=Z_j)=0$ pour $i\ne j$ : $R$ bien définie p.s.
1. $\mathbb{P}_0$ : les $Z_k$ i.i.d. de loi $F_X$ ($H_0$). Sous $H_0$, $(Z_1,\dots,Z_N)$ a même loi que $(Z_{\tau(1)},\dots,Z_{\tau(N)})$ pour toute permutation déterministe $\tau\in\mathcal{S}_N$ (**échangeabilité**), d'où
$$\mathbb{P}_0\big(R=(1,\dots,N)\big)=\mathbb{E}_0\big[\mathbb{1}_{\{Z_1<\dots<Z_N\}}\big]=\mathbb{E}_0\big[\mathbb{1}_{\{Z_{\tau(1)}<\dots<Z_{\tau(N)}\}}\big]=\mathbb{P}_0\big(R_{\tau(1)}=1,\dots,R_{\tau(N)}=N\big),$$
relation valable pour tout $\tau$ : $R$ uniforme sur $\mathcal{S}_N$, $\mathbb{P}_0(R=(i_1,\dots,i_N))=1/N!$. Pour toute valeur $q$ atteignable par $W_{n,m}$,
$$\mathbb{P}_0(W_{n,m}=q)=\sum_{(i_1,\dots,i_n)\in\mathcal{I}_q}\mathbb{P}_0(R_1=i_1,\dots,R_n=i_n)=\sum_{(i_1,\dots,i_n)\in\mathcal{I}_q}\frac{m!}{N!},$$
$\mathcal{I}_q$ = ensemble des $n$-listes d'entiers distincts de $\{1,\dots,N\}$ de somme $q$ ; $m!$ compte les façons de compléter les $m$ rangs manquants. $|\mathcal{I}_q|$ ne dépend pas de $F_X$ : $W_{n,m}$ **libre** sous $H_0$. Enfin $\{R_i=q\}$ : $(N-1)!$ façons de placer les autres rangs, $\mathbb{P}_0(R_i=q)=(N-1)!/N!=1/N$ : $R_i$ **uniforme sur $\{1,\dots,N\}$**.
2. $\mathbb{E}_0[R_i]=(N+1)/2$, d'où $\mathbb{E}_0[W_{n,m}]=n(N+1)/2=n(n+m+1)/2$ (linéarité).
3. « Par indépendance et même loi des $R_i$ sous $H_0$ » (sic) : $\mathrm{Var}_0(W_{n,m})=n\mathrm{Var}_0(R_1)+n(n-1)\mathrm{Cov}_0(R_1,R_2)$ [**note** : les $R_i$ ne sont **pas** indépendants ; l'argument correct est l'**échangeabilité** : tous les $\mathrm{Var}_0(R_i)$ sont égaux et tous les $\mathrm{Cov}_0(R_i,R_j)$, $i\ne j$, aussi]. La somme de tous les rangs étant constante ($=N(N+1)/2$) : $0=\mathrm{Var}_0(\sum_{i=1}^NR_i)=N\mathrm{Var}_0(R_1)+N(N-1)\mathrm{Cov}_0(R_1,R_2)$, d'où $\mathrm{Cov}_0(R_1,R_2)=-\mathrm{Var}_0(R_1)/(N-1)$ et
$$\mathrm{Var}_0(W_{n,m})=n\mathrm{Var}_0(R_1)\Big(1-\frac{n-1}{N-1}\Big)=\frac{nm}{N-1}\mathrm{Var}_0(R_1).$$
$R_1$ uniforme sur $\{1,\dots,N\}$ : $\mathrm{Var}_0(R_1)=(N+1)(N-1)/12$, d'où $\mathrm{Var}_0(W_{n,m})=nm(N+1)/12=nm(n+m+1)/12$.
4. La loi de $W_{n,m}$ sous $H_0$ ne dépendant pas de $F_X$, on peut choisir $A_\alpha$ tel que $\mathbb{P}_0(W_{n,m}\notin A_\alpha)\le\alpha$ et poser la région de rejet $\{z:\ \sum_{i=1}^nr_i\notin A_\alpha\}$. Construction par **Bienaymé-Tchebychev** :
$$\mathbb{P}_0\big(|W_{n,m}-n(n+m+1)/2|\ge\varepsilon\big)\le\frac{nm(n+m+1)}{12\,\varepsilon^2};$$
$\varepsilon_\alpha:=\sqrt{nm(n+m+1)/(12\alpha)}$ et $A_\alpha:=\Big[\dfrac{n(n+m+1)}{2}\pm\varepsilon_\alpha\Big]$.
[Remarque de l'extracteur : le test proposé est **bilatéral** alors que $H_1$ est unilatérale ($W$ plus grande sous $H_1$) ; le poly ne discute pas ce point.]

**Méthodes mobilisées :** argument de permutation/échangeabilité ; statistique libre (non paramétrique) ; dénombrement ; variance d'une somme via covariances et contrainte $\sum R_i$ constante ; loi uniforme discrète ($\mathrm{Var}=(N^2-1)/12$) ; inégalité de Bienaymé-Tchebychev pour calibrer un test sans connaître les quantiles.

---

## 5. Hors programme / compléments

> **Poly ch.4, §5 « Les compléments », p. 55–58 — explicitement « non exigibles » (hors programme d'examen).** Extraction concise.

### Exemple 5.1 — Test bilatéral pour la moyenne d'une gaussienne (dualité sur un cas)
**Source :** Poly ch.4, Compléments, Exemple 5.1, p. 55
**Idée :** à partir de l'IC de Student $\mathcal{I}(Z):=[\bar X_n\pm S_n\mathrm{t}^{(n-1)}_{1-\alpha/2}/\sqrt n]$ (Ex. 1.5), le test $\phi_{\mu_0}(Z):=\mathbb{1}_{\{\mu_0\notin\mathcal{I}(Z)\}}$ a pour taille $\sup_{\sigma^2>0}\mathbb{P}_{\mu_0,\sigma^2}(\phi_{\mu_0}(Z)=1)=1-(1-\alpha)=\alpha$ : c'est le test de Student (Ex. 2.11). Réciproquement, avec une famille $(\tilde\phi_\nu)_{\nu\in\mathbb{R}}$ de tests de taille $\alpha$ de $H_0:\mu=\nu$, $\tilde I(Z):=\{\nu\in\mathbb{R},\ \tilde\phi_\nu(Z)=0\}$ (valeurs non rejetées) vérifie $\mathbb{P}_{\mu,\sigma^2}(\mu\in\tilde I(Z))=\mathbb{P}_{\mu,\sigma^2}(\tilde\phi_\mu(Z)=0)=1-\alpha$ ; partant du test de Student, $\tilde I(Z)=\mathcal{I}(Z)$.

### Résultat (non numéroté) — Dualité générale entre régions de confiance et tests
**Source :** Poly ch.4, Compléments, p. 55–56
**Cadre :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$, $g:\Theta\to\mathbb{R}^q$.
- *Des tests à la région.* Pour $\nu\in\mathbb{R}^q$, $\phi_\nu$ test de niveau $\alpha$ de $H_0:g(\theta)=\nu$ contre $H_1:g(\theta)\ne\nu$, $\Theta_0^\nu:=\{\theta,\ g(\theta)=\nu\}$. Région duale $S(z):=\{\nu\in\mathbb{R}^q,\ \phi_\nu(z)=0\}$. Alors
$$\inf_{\theta\in\Theta}\mathbb{P}_\theta(g(\theta)\in S(Z))=\inf_{\nu\in\mathbb{R}^q}\inf_{\theta\in\Theta_0^\nu}\mathbb{P}_\theta(\phi_\nu(Z)=0)=1-\sup_{\nu}\sup_{\theta\in\Theta_0^\nu}\mathbb{P}_\theta(\phi_\nu(Z)=1)\ge 1-\alpha$$
(chaque $\theta$ appartient à $\Theta_0^{g(\theta)}$ et à lui seul) : $S$ est une région de confiance de niveau $1-\alpha$.
- *De la région aux tests.* Si $S'$ est une région de niveau $1-\alpha$, $\phi'_\nu(z):=\mathbb{1}_{\{\nu\notin S'(z)\}}$ vérifie, pour $\theta\in\Theta_0^\nu$, $\mathbb{P}_\theta(\phi'_\nu(Z)=1)=1-\mathbb{P}_\theta(g(\theta)\in S'(Z))\le\alpha$ : test de niveau $\alpha$.
**Idée :** une région de confiance = l'ensemble des valeurs que l'observation ne permet pas de rejeter ; un test = savoir si une valeur appartient à cette région. Passage exact pour les tests **bilatéraux** ($H_0:g(\theta)=\nu$) ; pour les tests unilatéraux, correspondent des **bornes** de confiance.

### Résultat (non numéroté) — Construire un test par une inégalité de déviation
**Source :** Poly ch.4, Compléments, p. 56
**Cadre :** $H_0:g(\theta)\le g_0$ contre $H_1:g(\theta)>g_0$ ; estimateur $T$ de $g(\theta)$ ; $\mathcal{R}=\{T(z)\ge c\}$. Inégalité de déviation :
$$\mathbb{P}_\theta\big(T(Z)-g(\theta)>\varepsilon\big)\le\gamma_\theta(\varepsilon)\quad\text{pour tout }\varepsilon>0.\tag{3}$$
**Résultat principal :** comme $g_0-g(\theta)\ge 0$ sur $\Theta_0$, $\sup_{\Theta_0}\mathbb{P}_\theta(T(Z)\ge c)\le\sup_{\Theta_0}\mathbb{P}_\theta(T(Z)-g(\theta)>c-g_0)\le\gamma(c-g_0):=\sup_{\Theta_0}\gamma_\theta(c-g_0)$. Si $\gamma(\varepsilon)\to 0$ quand $\varepsilon\to+\infty$, $c_\alpha=g_0+y_\alpha$ avec $y_\alpha:=\inf\{\varepsilon>0,\ \gamma(\varepsilon)\le\alpha\}$ donne un test de niveau $\alpha$. Pour $T(Z)=n^{-1}\sum t(X_i)$, $g(\theta)=\mathbb{E}_\theta[t(X_1)]$ : Bienaymé-Tchebychev donne $\gamma(\varepsilon)=v^2(\Theta_0)/(n\varepsilon^2)$, $v^2(\Theta_0):=\sup_{\Theta_0}\mathrm{Var}_\theta(t(X_1))$, et $y_\alpha=v(\Theta_0)/\sqrt{n\alpha}$ ; Hoeffding (si $a=\inf t>-\infty$, $b=\sup t<\infty$) donne $\exp(-2n\varepsilon^2/(b-a)^2)$, indépendant de $\theta$, et $y_\alpha=(b-a)\sqrt{\frac{1}{2n}\log\frac1\alpha}$.

### Exemple 5.2 — Test sur une proportion par Bienaymé-Tchebychev
**Source :** Poly ch.4, Compléments, Exemple 5.2, p. 57
**Résultat :** Bernoulli, $H_0:\theta\le 1/2$ contre $H_1:\theta>1/2$, $T=\bar X_n$ ; $v^2(\Theta_0)=\sup_{\theta\le 1/2}\theta(1-\theta)=1/4$, $y_\alpha=1/(2\sqrt{n\alpha})$ ; $\mathcal{R}_\alpha=\big\{(x_1,\dots,x_n)\in\{0,1\}^n,\ n^{-1}\sum x_i\ge\frac12+\frac{1}{2\sqrt{n\alpha}}\big\}$ est de niveau $\alpha$.

### Exemple 5.3 — Comparaison des deux tests de proportion
**Source :** Poly ch.4, Compléments, Exemple 5.3, p. 57
**Résultat :** par Hoeffding, $\mathcal{R}_\alpha=\big\{n^{-1}\sum x_i\ge\frac12+\sqrt{\frac{1}{2n}\log\frac1\alpha}\big\}$ est de niveau $\alpha$. Le plus puissant des deux est celui de plus petite valeur critique : comparer $1/(2\alpha)$ et $\log(1/\alpha)$ ; $u\mapsto\log u-u/2$ a pour dérivée $1/u-1/2$, maximum en $u=2$ valant $\log 2-1<0$, donc $\log u<u/2$ pour tout $u>0$, en particulier $\log(1/\alpha)<1/(2\alpha)$ : **sur ce modèle**, le test de Hoeffding est **toujours plus puissant** que celui de Bienaymé-Tchebychev — ce n'est pas une règle générale.

### Théorème 5.1 — Inégalité de Chernoff
**Source :** Poly ch.4, Compléments, Théorème 5.1, p. 57–58
**Énoncé :** $Y$ réelle avec $\varphi_Y(\lambda):=\mathbb{E}[e^{\lambda Y}]<\infty$ pour tout $\lambda\in\mathbb{R}$, $\psi_Y:=\log\varphi_Y$ ; **transformée de Cramér**
$$h_Y(a):=\begin{cases}\sup_{\lambda\ge 0}\{a\lambda-\psi_Y(\lambda)\} & \text{si }a\ge 0,\\ \sup_{\lambda\le 0}\{-a\lambda-\psi_Y(\lambda)\} & \text{si }a\le 0.\end{cases}$$
Pour tout $a\ge 0$ : $\mathbb{P}(Y\ge a)\le e^{-h_Y(a)}$ et $\mathbb{P}(Y\le -a)\le e^{-h_Y(-a)}$.
**Idée de preuve :** pour $\lambda\ge 0$, $\mathbb{1}_{\{Y\ge a\}}\le e^{\lambda(Y-a)}$ ponctuellement ; espérance : $\mathbb{P}(Y\ge a)\le e^{-a\lambda}\varphi_Y(\lambda)=e^{-(a\lambda-\psi_Y(\lambda))}$ ; infimum en $\lambda$ (= sup de l'exposant). Idem avec $\lambda\le 0$ pour la queue gauche. (Markov appliqué à l'exponentielle, puis optimisation.)
[**Note de l'extracteur** : la preuve aboutit à $\mathbb{P}(Y\le -a)\le\exp\big(-\sup_{\lambda\le 0}\{-a\lambda-\psi_Y(\lambda)\}\big)$, alors que la définition de $h_Y$ évaluée en $-a\le 0$ donne $\sup_{\lambda\le 0}\{a\lambda-\psi_Y(\lambda)\}$ ; la forme cohérente serait $h_Y(b)=\sup_{\lambda\le 0}\{b\lambda-\psi_Y(\lambda)\}$ pour $b\le 0$. Petite incohérence de signe du poly, sans incidence sur l'idée.]

### Proposition 5.1 — Inégalité de Chernoff pour des sommes
**Source :** Poly ch.4, Compléments, Proposition 5.1, p. 58
**Énoncé :** $Y,Y_1,\dots,Y_n$ i.i.d., $\varphi_Y(\lambda)<\infty$ pour tout $\lambda$, $\bar Y_n:=n^{-1}\sum Y_i$. Alors $h_{\bar Y_n}(a)=n\,h_Y(a)$ et, pour $a\ge 0$, $\mathbb{P}(\bar Y_n\ge a)\le e^{-nh_Y(a)}$ et $\mathbb{P}(\bar Y_n\le -a)\le e^{-nh_Y(-a)}$.
**Idée de preuve :** par indépendance et équidistribution, $\varphi_{\bar Y_n}(\lambda)=\varphi_Y(\lambda/n)^n$, donc $\psi_{\bar Y_n}(\lambda)=n\psi_Y(\lambda/n)$ ; changement de variable $\lambda\mapsto\lambda/n$ (laisse $[0,+\infty[$ invariant) dans le sup ; puis Th. 5.1.

### Remarque — Ce que le chapitre 5 reprendra
**Source :** Poly ch.4, Compléments, p. 58
**Idée :** (1) Choix de la statistique de test (étape (1) de la Méthode 2.1) : **lemme de Neyman-Pearson** (rapport des vraisemblances) donnant, pour simple contre simple, le **test le plus puissant** de niveau $\alpha$. L'énigme des pixels en est l'image : budget = niveau $\alpha$, coût = probabilité sous $H_0$, gain = probabilité sous $H_1$, solution = acheter les pixels par ordre décroissant du rapport gain/coût. (2) Cas discret (Ex. 2.5) : la taille est $<\alpha$ et l'on perd de la puissance ; remède : **tests randomisés** (fonction critique à valeurs dans $[0,1]$), définis au chapitre 5, nécessaires à l'énoncé du lemme de Neyman-Pearson.

---

## 6. Liens avec les autres chapitres

**Prérequis (utilisés sans redémonstration, cf. liste p. 38) :**
- **Chapitre 1** : modèle statistique $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta\})$, statistiques ; lois Gamma, $\chi^2$, Student (Déf. 12) ; **théorèmes de Cochran et de Gosset** (§1.9) — fondement des trois pivots gaussiens ; statistiques d'ordre ($X_{n:n}$) ; régression linéaire gaussienne (§4) ; modèle de sondage (Ex. 2.2).
- **Chapitre 2** : estimateurs ponctuels, EMV et méthode des moments (Exercices 1 et 5) ; « définition minimale » d'intervalle de confiance (§2) ; **inégalité de Bienaymé-Tchebychev** (Ex. 1.8, Ex. 7, compléments) ; **loi des grands nombres** (interprétation fréquentiste) ; régression (§4) et Exercice 1 (PC2) pour les lois de $(\hat\beta_0,\hat\beta_1,\hat\sigma^2)$ (Ex. 2.15).
- **Chapitre 3** : variance empirique sans biais $S_n^2$ (Ex. 1.4) ; loi de $X_{n:n}$ (Ex. 1.9) ; **ordre partiel sur les risques et admissibilité** (§1.5) $\to$ préordre sur les tests ; **le test comme règle de décision** (§4 : actions $\{0,1\}$, perte 0-1 à deux constantes, risque exprimé par la fonction puissance).

**Suites :**
- **Chapitre 5** : choix optimal de la statistique de test — **lemme de Neyman-Pearson** (test le plus puissant, simple contre simple ; rapport de vraisemblance), **tests randomisés** (taille exacte dans le cas discret, cf. Ex. 2.5 et Exercices 4, 6) ; énigme des pixels ; l'Exercice 4 (Poisson, simple contre simple) en est la préparation directe.
- **Cours 6** (approche **asymptotique**) : régions et tests lorsqu'aucun pivot exact n'existe (TCL, normalité asymptotique, delta-méthode) ; le cas gaussien sert de référence.
- **Tests multiples** (évoqués) : correction de Bonferroni (Ex. 1.7).
- **Inégalités de concentration** (annexe du poly) : preuve de Hoeffding via Chernoff (compléments §5).

---

## 7. Idées de visualisations interactives pertinentes pour ce chapitre

1. **Simulateur de couverture** (figure p. 10) : curseurs $n$, $\alpha$, $\mu$, $\sigma$ ; bouton « répéter $N$ fois » ; tracé des $N$ intervalles $[\bar X_n\pm z_{1-\alpha/2}\sigma/\sqrt n]$ (ratés en orange) et compteur de couverture empirique convergeant vers $1-\alpha$ ; option « variance inconnue » (Student) vs « remplacement naïf de $\sigma$ par $S_n$ avec $z$ » pour montrer la sous-couverture à petit $n$.
2. **Quantiles $z$ vs Student** : courbes $\beta\mapsto\mathrm{t}^{(k)}_\beta$ et $z_\beta$ avec curseur $k$ ; barre de longueur des deux IC ($\alpha$, $n$ réglables) et pourcentage d'allongement (0,693 vs 0,721 pour $n=32$).
3. **Choix de $A_\alpha$ et longueur** : pour le pivot $\chi^2(n-1)$ (Ex. 1.6) et pour $X_{n:n}/\theta$ (densité $nx^{n-1}$, Exercice 3), curseur sur la répartition $(\alpha_1,\alpha_2)$ / $(p_1,p_2)$ avec aire grisée $=1-\alpha$ et longueur de l'intervalle résultant ; mise en évidence de l'optimum (décalé contre 1 pour l'uniforme).
4. **Région de confiance bivariée $(\mu,\sigma^2)$** (Ex. 1.7) : sur un échantillon simulé, superposer le rectangle de Bonferroni $I_1\times I_2$ et la région exacte (bande courbe $|\bar X_n-\mu|\le\sigma z_{1-\alpha/4}/\sqrt n$ entre deux droites horizontales).
5. **Bienaymé-Tchebychev vs Hoeffding** (Ex. 1.8 / Ex. 5.3) : demi-largeurs $1/(2\sqrt{n\alpha})$ et $\sqrt{\log(2/\alpha)/(2n)}$ en fonction de $\alpha$ (échelle log) et de $n$ ; rapport $\sqrt{2\alpha\log(2/\alpha)}$ ; couverture empirique (conservativité) sur simulations de Bernoulli.
6. **Atelier fonction puissance** (Ex. 2.3–2.4, 2.10) : densité de $T(Z)$ sous $\theta_0$ et sous $\theta$ choisi, région de rejet ombrée (aire = taille) et zone « puissance » ; curseurs $c$ (ou $\alpha$), $n$, $\sigma$ ; courbe $\theta\mapsto\beta_\phi(\theta)$ unilatérale / bilatérale ; démonstration qu'abaisser $c$ augmente taille et puissance ensemble.
7. **Binomial discret et couplage** (Ex. 2.5, Ex. 6) : escaliers $c\mapsto\mathbb{P}_\theta(S_n\ge c)$ pour plusieurs $\theta$ ; calcul automatique de $c_\alpha$ et de la taille effective $<\alpha$ ; animation du couplage $U_i\le\theta$ vs $U_i\le\vartheta$.
8. **Aéroport : riverains vs aéroport** (Ex. 2.8–2.9, 2.6–2.7) : axe de $T(Z)$ (ou $\bar X_n$) avec les deux régions de rejet $\{T\ge z_{1-\alpha}\}$ et $\{T\le -z_{1-\alpha}\}$ et la zone intermédiaire « aucun ne rejette » ; curseur sur l'observation, décision de chaque partie.
9. **Histogramme des $p$-valeurs** (Prop. 2.2, figure p. 31) : simulation de $N$ $p$-valeurs sous $\theta=\theta_0$ (plat), sous $\theta>\theta_0$ (pic en 0), sous $\theta<\theta_0$ (dominé) et pour une statistique discrète (non plat).
10. **Significativité vs taille d'effet** (Ex. 2.14) : plan ($n$, écart $\bar X_n-\mu_0$) colorié par la $p$-valeur, avec les deux jeux de données du poly placés (88 dB/$n=4$ ; 80,2 dB/$n=10^4$) et l'IC de l'effet affiché.
