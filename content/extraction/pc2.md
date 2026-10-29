# PC 2 — Estimation ponctuelle : maximum de vraisemblance et méthode des moments (modèle linéaire gaussien, mélange, famille exponentielle, durées de vie, AR(1))

> **Sources extraites :** `S2_APM-41033-EP-PC2-enonce` (6 p., « 1 Exercices », p. 1–6) et `S2_APM-41033-EP-PC2-corrige` (17 p., « 2 Solutions », p. 7–23 dans la pagination du document). Les formules ont été vérifiées visuellement sur les PDF.
> **Convention de citation :** « PC2 Ex. k Q. m ». Les résultats de cours sont cités sous la forme « Poly ch.N, Déf./Th./Prop. … » d'après les extractions `ch1.md` et `ch2.md`. **Attention aux homonymies** : « Théorème 1.1 du ch. 1 » = théorème de Cochran ; « Théorème 1.1 du ch. 2 » = positivité de la divergence de Kullback-Leibler.
> **Rapport avec le poly :** les cinq exercices de la PC 2 sont aussi les Exercices 1 à 5 de la section « Les exercices » du poly ch.2 (p. 33–51), dont le corrigé « reprend en les complétant » celui de la PC. Ici on reproduit **le corrigé officiel de la PC** ; quand le poly complète ou corrige ce corrigé, c'est signalé explicitement par **[Complément poly ch.2]**.
> Les parties du corrigé imprimées en bleu (remarques sur le biais, analyses numériques de l'Ex. 2, remarque sur les fonctions produit de l'Ex. 5) sont des compléments du corrigé ; elles sont reproduites.

---

## 0. Chapitres du poly mobilisés et rappels donnés en tête d'énoncé

### 0.1 Rappels / conventions de l'énoncé (en tête de la feuille, p. 1)

- $\mathrm{Leb}$ et $\mathrm{Leb}^{\otimes n}$ désignent respectivement la mesure de Lebesgue sur $\mathbb{R}$ et celle sur $\mathbb{R}^n$.
- $\mathcal{N}(\mu,\sigma^2)$ désigne la loi gaussienne de moyenne $\mu$ et de variance $\sigma^2$.
- Par convention, les vecteurs sont des vecteurs **colonne** ; $a^T$ désigne la transposée de $a$.
- Pas d'autre rappel (pas de convention Gamma dans cette feuille ; la loi exponentielle $\mathcal{E}(\lambda)$ est paramétrée par l'**intensité** : densité $\lambda\exp(-\lambda x)\mathbb{1}_{\mathbb{R}_+}(x)$, cf. Ex. 3 Q1(a) et Ex. 4).

Chaque exercice est précédé d'un « **Objectif** » :

| Exercice | Objectif (titre de l'énoncé) | Difficulté |
|---|---|---|
| Ex. 1 | Modèle linéaire gaussien | ⋆⋆ |
| Ex. 2 | Modèles de mélanges uniformes, estimation | ⋆ |
| Ex. 3 | Modèle exponentiel général | ⋆⋆⋆ |
| Ex. 4 | Modélisation de durées de vie exponentielles | ⋆⋆ |
| Ex. 5 | Série temporelle | ⋆⋆ |

### 0.2 Notations particulières de la feuille (à reproduire telles quelles)

| Notation | Signification | Où |
|---|---|---|
| $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$ | loi de l'observation, de densité $p_\theta$ par rapport à $\mathrm{Leb}^{\otimes n}$ (notation « densité · mesure ») | Ex. 1, 5 |
| $\bigotimes_{i=1}^n\mathcal{N}(\beta_1+\beta_2x_i,\sigma^2)$ | loi produit (observations indépendantes non identiquement distribuées) | Ex. 1 |
| $\mathbf{1}$, $\underline{\mathbf{x}}$ | vecteurs $(1,\dots,1)^T$ et $(x_1,\dots,x_n)^T$ (x **gras souligné**) | Ex. 1 |
| $\mathbf{Y}$, $\mathbf{X}=\begin{bmatrix}\mathbf{1}&\underline{\mathbf{x}}\end{bmatrix}$, $\beta$ | vecteur des observations, matrice d'expérience $n\times2$, vecteur des coefficients | Ex. 1 |
| $\tilde\beta_1$, $\underline{\tilde{\mathbf{x}}}$ | reparamétrisation centrée | Ex. 1 Q4 |
| $\hat\sigma^2$ (énoncé) / $\widehat{\sigma^2}$ (corrigé) | EMV de la variance ; le corrigé écrit le chapeau sur $\sigma^2$ entier | Ex. 1 |
| $P$ | projecteur orthogonal sur $\mathrm{Vect}(\mathbf{1},\underline{\mathbf{x}})$ | Ex. 1 corrigé |
| $q^{n-2}_{\alpha/2}$, $q^{n-2}_{1-\alpha/2}$ | quantiles d'ordre $\alpha/2$, $1-\alpha/2$ de $\chi^2(n-2)$ (exposant = degrés de liberté) | Ex. 1 Q7 |
| $f_\theta\cdot\mathrm{Leb}$, $N_a$ | densité du mélange ; nombre d'observations dans $[0,a]$ | Ex. 2 |
| $\hat\theta_n$, $\hat\theta_n^{(1)}$, $\tilde\theta_n$, $\hat\theta_n^{(2)}$ | EMV non seuillé, EMV seuillé, estimateur des moments non seuillé, seuillé | Ex. 2 |
| $S_n=\sum_{i=1}^nX_i$ | somme des observations | Ex. 2 corrigé |
| $a\vee b$ | $\max(a,b)$ | Ex. 2 |
| $(\mathsf{X},\mathcal{X})$, $\mu$, $T$, $h$ | espace mesurable (X **sans empattement**), mesure $\sigma$-finie, statistique, fonction positive | Ex. 3 |
| $q_\eta$, $A(\eta)$, $\Xi$, $G(\eta)$ | densité canonique, log-partition, espace des paramètres naturels, $G=\exp(A)$ | Ex. 3 |
| $p_\theta$, $\varphi(\theta)$, $B(\theta)$ | famille exponentielle générale. **L'énoncé écrit $\varphi$, le corrigé et la conclusion écrivent $\phi$** (même objet) | Ex. 3 |
| $\mathbb{E}_\eta$, $\mathrm{Var}_\eta$ | espérance, variance sous $q_\eta\cdot\mu$ | Ex. 3 |
| $\mathcal{E}(\lambda)$ | loi exponentielle d'intensité $\lambda$ | Ex. 4 |
| $X_0\wedge X_1$ | $\min(X_0,X_1)$ | Ex. 4 |
| $(\mathbb{R}_+^\star)^2$, $]0,+\infty[^2$ | espace des paramètres $(\lambda_0,\lambda_1)$ | Ex. 4 |
| $\theta=(\phi,\sigma^2)$ | paramètre AR(1) (ici $\phi$ droit, **à ne pas confondre** avec le $\varphi$ de l'Ex. 3) | Ex. 5 |
| $\mathcal{F}_n$, $\xi_k$, $\Gamma^{-1}$, $\mathbf{A}$, $\underline{x}$, $\underline{\xi}$ | filtration, bruits, matrice de précision, matrice triangulaire, vecteurs | Ex. 5 corrigé |
| $\ln$ | le corrigé de la PC écrit $\ln$ (le poly ch.2 écrit $\log$ pour éviter la confusion avec $\mathrm{L}_n$, $\ell_n$) | partout |

### 0.3 Résultats du poly mobilisés

| Résultat | Source | Exercices |
|---|---|---|
| Modèle statistique, modèle dominé, $n$-échantillon, densité produit | Poly ch.1, Déf. 1.1, Déf. 1, Déf. 6, formule (1) | 1, 2, 3, 4, 5 |
| Identifiabilité | Poly ch.1, Déf. 2 | 4 |
| Vecteur gaussien ; transformation affine $A X+b\sim\mathcal{N}(A\mu+b,A\Sigma A^T)$ | Poly ch.1, Déf. 10, Prop. 2.4 | 1, 5 |
| Indépendance ⇔ décorrélation (vecteur gaussien) ; Corollaire $A_1A_2^T=0$ | Poly ch.1, Prop. 2.6, Cor. 2.1 | 1 |
| Densité d'un vecteur gaussien | Poly ch.1, Prop. 2.7 | 5 |
| Loi du $\chi^2$, $\chi^2(\nu)=\mathrm{Gamma}(\nu/2,1/2)$, formes quadratiques $\lVert\Pi Z\rVert^2/\sigma^2\sim\chi^2(k)$ | Poly ch.1, Déf. 11, Prop. 2.8, Prop. 2.9 | 1 |
| Théorème de Cochran | Poly ch.1, Th. 1.1 (et 1.2) | 1 |
| Fonction muette, classe monotone | Poly ch.1, Méthode « transfert, fonction muette » (§2) | 4, 5 |
| Méthode des moments | Poly ch.2, Déf. 1.2, Méthode 1.1 | 2, 3 |
| Convergence des moments empiriques, LGN | Poly ch.2, Prop. 1.1, Th. 2.1 | 2 |
| Vraisemblance, EMV ; log-vraisemblance | Poly ch.2, Déf. 1.4, Déf. 1.5 | 1, 2, 3, 4, 5 |
| Équations de vraisemblance | Poly ch.2, Déf. 1.6 | 1, 3, 5 |
| Méthode d'explicitation de l'EMV | Poly ch.2, Méthode 1.2 | 1, 2, 5 |
| Moyenne et variance d'une gaussienne (maximisation en deux temps) | Poly ch.2, Ex. 1.10 | 1, 5 |
| Invariance par reparamétrisation | Poly ch.2, Prop. 1.2 | 3 Q3 |
| Maximum d'une fonction strictement concave | Poly ch.2, Lemme 2.3 | 3, (1, 5) |
| Intervalle de confiance (définition minimale, fonction pivotale) | Poly ch.2, Déf. 2.2 | 1 Q7 |
| Moindres carrés (régression linéaire, PC1 Ex. 4) | PC1 Ex. 4 ; Poly ch.2, Ex. 4.7 (compléments) | 1 |

**Chapitre principal :** ch.2 « Estimation ponctuelle » (EMV, moments). **Chapitre antérieur fortement mobilisé :** ch.1 (vecteurs gaussiens, Cochran, $\chi^2$, identifiabilité, fonction muette). Le corrigé de l'Ex. 3 renvoie aussi à « l'exemple de la gaussienne dans la feuille PC1 » et l'énoncé au « Chapitre IV-6 du polycopié » (familles exponentielles).

### 0.4 Coquilles relevées dans les documents de la PC (à ne pas reproduire dans le contenu pédagogique sans correction)

1. **Ex. 2, énoncé** : la dernière ligne de la fonction de répartition est « $1$ si $x\ge1$ » ; il faut lire $x\ge b$.
2. **Ex. 2 Q2, corrigé** : $\ell(\theta,X_1,\dots,n)$ pour $\ell(\theta,X_1,\dots,X_n)$ ; le cas $\hat\theta_n=1$ ($N_a=n$) n'est pas discuté ; « le maximum est atteint en $\theta=0$ » alors que $0\notin\,]0,1[$ (le poly ch.2 corrige en prolongeant le modèle à $[0,1]$).
3. **Ex. 2, formule du biais** : $\mathbb{P}_\theta(N_1\ge na/b)$ est une coquille pour $\mathbb{P}_\theta(N_a\ge na/b)$.
4. **Ex. 3 Q2(b), corrigé** : facteur $h(x)$ écrit deux fois dans le second terme de Hölder.
5. **Ex. 3 Q2(c), corrigé** : $|g(x)|$ pour $h(x)$ dans la domination.
6. **Ex. 3, corrigé** : les questions 2(d)i et 2(d)ii de l'énoncé sont numérotées 2(d) et 2(e) dans le corrigé.
7. **Ex. 5 Q2, corrigé de la PC** : $\hat\phi_n=\dfrac{\sum_{k=1}^nX_kX_{k-1}}{\sum_{k=1}^nX_k^2}$ ; **le dénominateur correct est $\sum_{k=1}^nX_{k-1}^2$** (le poly ch.2 le signale explicitement : « le corrigé distribué en 2025 donnait $\hat\phi_n$ avec le dénominateur $\sum_{k=1}^nX_k^2$ ; l'annulation de la dérivée conduit à $\sum_{k=1}^nX_{k-1}^2$ »).
8. **Ex. 5 Q1, Solution 2** : les $\xi_k$ sont d'abord i.i.d. $\mathcal{N}(0,1)$ avec $X_k\overset{\mathcal{L}}{=}\phi X_{k-1}+\sigma\xi_k$, puis l'écriture $X_k=\sum_{j=1}^k\phi^{k-j}\xi_j$ et $\underline{\xi}\sim\mathcal{N}_n(0,\sigma^2I)$ correspond à des $\xi_k$ de loi $\mathcal{N}(0,\sigma^2)$ (facteur $\sigma$ absorbé). Version cohérente : $X_k=\sigma\sum_{j=1}^k\phi^{k-j}\xi_j$ avec $\xi_j\sim\mathcal{N}(0,1)$.

---

## 1. Exercices

### Exercice 1 — Modèle linéaire gaussien (⋆⋆)

**Objectif :** Modèle linéaire gaussien (suite de PC1 Ex. 4 : l'estimateur des moindres carrés est l'EMV ; loi exacte des estimateurs ; intervalle de confiance pour $\sigma^2$).

#### Énoncé complet

Soient $x_1,\dots,x_n$ des réels. On considère le modèle statistique
$$\Big(\mathbb{R}^n,\ \mathcal{B}(\mathbb{R}^n),\ \Big\{p_\theta\cdot\mathrm{dLeb}^{\otimes n}:=\bigotimes_{i=1}^n\mathcal{N}(\beta_1+\beta_2x_i,\sigma^2)\ :\ \theta:=(\beta_1,\beta_2,\sigma^2)\in\mathbb{R}^2\times\mathbb{R}_+^\ast\Big\}\Big).$$
On note $\mathbf{1}$ et $\underline{\mathbf{x}}$ les vecteurs de $\mathbb{R}^n$ définis par $\mathbf{1}:=(1,\dots,1)^T$ et $\underline{\mathbf{x}}:=(x_1,\dots,x_n)^T$. Dans la suite, on suppose qu'il existe au moins deux indices $i\ne j$ tels que $x_i\ne x_j$. Nous utiliserons les notations matricielles suivantes
$$\mathbf{Y}:=\begin{bmatrix}Y_1\\ \vdots\\ Y_n\end{bmatrix}\in\mathbb{R}^n,\qquad\mathbf{X}:=\begin{bmatrix}\mathbf{1}&\underline{\mathbf{x}}\end{bmatrix}\in\mathbb{R}^{n\times2},\qquad\beta:=\begin{bmatrix}\beta_1\\ \beta_2\end{bmatrix}\in\mathbb{R}^2.$$

1. Montrer que la matrice $\mathbf{X}^T\mathbf{X}$ est inversible.
   *Remarque : Puisque $u^T\mathbf{X}^T\mathbf{X}u\ge0$ pour tout $u\in\mathbb{R}^2$, on en déduit que la matrice est définie positive.*
2. Déterminer les estimateurs du maximum de vraisemblance $(\hat\beta_1,\hat\beta_2,\hat\sigma^2)$ de $(\beta_1,\beta_2,\sigma^2)$.
3. Déterminer la loi de $(\hat\beta_1,\hat\beta_2)$ sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$.
4. Montrer que, sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, $\hat\beta_1$ et $\hat\beta_2$ sont indépendants si et seulement si $n^{-1}\sum_{i=1}^nx_i=0$.
   *Remarque : le modèle dépend de $x_1,\dots,x_n$ via les quantités $\beta_1+\beta_2x_i$ pour tout $1\le i\le n$ soit encore, les lignes de $\mathbf{X}\beta$. Sans « pré-traitement », il n'y a pas de raisons que $n^{-1}\sum_{i=1}^nx_i=0$. Néanmoins, en écrivant*
$$\beta_1\mathbf{1}+\beta_2\underline{\mathbf{x}}=\Big(\beta_1+\beta_2n^{-1}\sum_{j=1}^nx_j\Big)\mathbf{1}+\beta_2\Big(\underline{\mathbf{x}}-n^{-1}\sum_{j=1}^nx_j\mathbf{1}\Big)=\tilde\beta_1\mathbf{1}+\beta_2\underline{\tilde{\mathbf{x}}}=\begin{bmatrix}\mathbf{1}&\underline{\tilde{\mathbf{x}}}\end{bmatrix}\begin{bmatrix}\tilde\beta_1\\ \beta_2\end{bmatrix},\qquad\underline{\tilde{\mathbf{x}}}=\underline{\mathbf{x}}-n^{-1}\sum_{j=1}^nx_j\mathbf{1}=\underline{\mathbf{x}}-\frac{\mathbf{1}^T\underline{\mathbf{x}}}{\mathbf{1}^T\mathbf{1}}\mathbf{1},$$
   *on peut paramétrer le modèle de façon équivalente par $(\tilde\beta_1,\beta_2,\sigma^2)$, tout en introduisant une matrice d'expérience $\begin{bmatrix}\mathbf{1}&\underline{\tilde{\mathbf{x}}}\end{bmatrix}$ dont les colonnes sont **orthogonales** (c'est le sens de $n^{-1}\sum_{i=1}^n\tilde x_i=0$).*
5. Déterminer la loi de $\hat\sigma^2$ sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$.
6. Montrer que sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, $\hat\sigma^2$ et $(\hat\beta_1,\hat\beta_2)$ sont indépendants.
7. Soit $\alpha\in]0,1[$. Proposer un intervalle de confiance de niveau $(1-\alpha)$ pour $\sigma^2$.

#### Corrigé complet (corrigé officiel, p. 7–10)

*Notations du corrigé.* On note $Y_1,\dots,Y_n$ les statistiques canoniques ; $\mathbf{Y}=(Y_1,\dots,Y_n)^T$ et $\bar Y=n^{-1}\sum_{i=1}^nY_i$.

*Densité.* La densité $p_\theta$ par rapport à $\mathrm{Leb}^{\otimes n}$ est (produit des densités gaussiennes, **par indépendance** des coordonnées — loi produit $\bigotimes$, Poly ch.1 formule (1)) :
$$p_\theta(y_1,\dots,y_n)=\prod_{i=1}^n\frac1{\sqrt{2\pi}\,\sigma}\exp\Big(-\frac1{2\sigma^2}(y_i-\beta_1-\beta_2x_i)^2\Big)=\frac1{(2\pi\sigma^2)^{n/2}}\exp\Big(-\frac1{2\sigma^2}\sum_{i=1}^n(y_i-\beta_1-\beta_2x_i)^2\Big).$$

**Q1.** On a
$$\mathbf{X}^T\mathbf{X}=n\begin{bmatrix}1&n^{-1}\sum_{i=1}^nx_i\\ n^{-1}\sum_{i=1}^nx_i&n^{-1}\sum_{i=1}^nx_i^2\end{bmatrix}.$$
Le déterminant de la matrice (entre crochets) vaut $n^{-1}\sum_{i=1}^nx_i^2-\big(n^{-1}\sum_{i=1}^nx_i\big)^2$. D'après l'**inégalité de Cauchy-Schwarz** (appliquée à $\mathbf{1}$ et $\underline{\mathbf{x}}$),
$$\Big(\frac1n\sum_{i=1}^nx_i\Big)^2\le\frac1n\sum_{i=1}^nx_i^2,$$
autrement dit le déterminant est positif ou nul, **avec égalité si et seulement si $\underline{\mathbf{x}}$ et $\mathbf{1}$ sont colinéaires**. Comme il existe deux indices $i$ et $j$ tels que $x_i\ne x_j$, l'inégalité de Cauchy-Schwarz est stricte. Ainsi le déterminant est strictement positif et la matrice est inversible. (Avec la remarque de l'énoncé : $u^T\mathbf{X}^T\mathbf{X}u=\lVert\mathbf{X}u\rVert^2\ge0$, la matrice symétrique positive inversible est définie positive.)

> **[Complément poly ch.2]** $\det(\mathbf{X}^T\mathbf{X})=n\sum_ix_i^2-(\sum_ix_i)^2=n\sum_{i=1}^n(x_i-\bar x)^2$ avec $\bar x:=n^{-1}\sum_ix_i$, et « deux $x_i$ distincts » ⇔ colonnes $\mathbf{1}$, $\underline{\mathbf{x}}$ linéairement indépendantes ⇔ $F:=\mathrm{Im}(\mathbf{X})=\mathrm{Vect}(\mathbf{1},\underline{\mathbf{x}})$ de dimension 2.

**Q2.** De l'expression de $p_\theta$, la vraisemblance est
$$\theta\mapsto L_n(\theta,Y_1,\dots,Y_n)=\frac1{(2\pi\sigma^2)^{n/2}}\exp\Big(-\frac1{2\sigma^2}\sum_{i=1}^n(Y_i-\beta_1-\beta_2x_i)^2\Big),$$
définie sur $\mathbb{R}^2\times\mathbb{R}_+^\ast$. **Maximiser la vraisemblance étant équivalent à maximiser son logarithme** (log strictement croissant, Poly ch.2 Déf. 1.5), on considère
$$\theta\mapsto C-\frac n2\ln\sigma^2-\frac1{2\sigma^2}\sum_{i=1}^n(Y_i-\beta_1-\beta_2x_i)^2=C-\frac n2\ln\sigma^2-\frac1{2\sigma^2}\lVert\mathbf{Y}-\mathbf{X}\beta\rVert^2.$$
On cherche tout d'abord la solution des **équations de vraisemblance** (Poly ch.2 Déf. 1.6), puis on discute si la solution est un maximum. Les équations (dérivées par rapport à $\beta_1$, $\beta_2$, $\sigma^2$) s'écrivent
$$\sum_{i=1}^n(Y_i-\beta_1-\beta_2x_i)=0,\qquad\sum_{i=1}^nx_i(Y_i-\beta_1-\beta_2x_i)=0,\qquad-\frac n{2\sigma^2}+\frac1{2\sigma^4}\sum_{i=1}^n(Y_i-\beta_1-\beta_2x_i)^2=0;$$
les deux premières sont équivalentes à
$$\mathbf{X}^T\mathbf{X}\beta=\mathbf{X}^T\mathbf{Y}$$
dont on déduit (**inversibilité de $\mathbf{X}^T\mathbf{X}$, Q1**)
$$\hat\beta=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y};$$
et la troisième est équivalente à
$$\widehat{\sigma^2}=\frac1n\sum_{i=1}^n(Y_i-\hat\beta_1-\hat\beta_2x_i)^2=\frac1n\lVert\mathbf{Y}-\mathbf{X}\hat\beta\rVert^2.$$
On vérifie que cette racine des équations de vraisemblance est un maximum de la fonction de log-vraisemblance, **en prenant les limites en $\pm\infty$ pour $\beta_i$ et en $0,+\infty$ pour $\sigma^2$** (vérification seulement esquissée dans le corrigé de la PC).

> **[Complément poly ch.2] — preuve complète du maximum (maximisation en deux temps, comme Poly ch.2 Ex. 1.10).** (i) À $\sigma^2=v$ fixé, maximiser en $b$ revient à minimiser $J(b)=\lVert\mathbf{Y}-\mathbf{X}b\rVert^2$, quadratique de hessienne $2\mathbf{X}^T\mathbf{X}$ définie positive (Q1) : strictement convexe, unique minimum caractérisé par les **équations normales** $\mathbf{X}^T\mathbf{X}b=\mathbf{X}^T\mathbf{Y}$, d'où $b=\hat\beta$. (ii) Avec $S:=n^{-1}\lVert\mathbf{Y}-\mathbf{X}\hat\beta\rVert^2$, $v\mapsto-\frac12\log(2\pi v)-\frac S{2v}$ a pour dérivée $\frac{S-v}{2v^2}$ : maximum en $v=S$ seulement si $S>0$. (iii) $\ell_n(b,v)\le\ell_n(\hat\beta,v)\le\ell_n(\hat\beta,S)$ avec égalité ssi $(b,v)=(\hat\beta,S)$ : l'EMV existe et est unique. $S>0$ p.s. dès que $n\ge3$ (cf. Q5) ; pour $n=2$, $P=I_2$, $S=0$ et l'EMV n'existe pas. Forme explicite : $\hat\beta_2=\dfrac{\sum_i(x_i-\bar x)(Y_i-\bar Y)}{\sum_i(x_i-\bar x)^2}$, $\hat\beta_1=\bar Y-\hat\beta_2\bar x$.

**Remarques du corrigé (importantes pour la suite).**
- Les coefficients $(\beta_1,\beta_2)$ ont été déterminés comme résolvant
$$\operatorname*{argmin}_{(\beta_1,\beta_2)\in\mathbb{R}^2}\lVert\mathbf{Y}-\beta_1\mathbf{1}-\beta_2\underline{\mathbf{x}}\rVert^2,$$
  montrant que $\hat\beta_1\mathbf{1}+\hat\beta_2\underline{\mathbf{x}}$ est le **projeté orthogonal de $\mathbf{Y}$** sur l'espace vectoriel engendré par $(\mathbf{1},\underline{\mathbf{x}})$, les colonnes de $\mathbf{X}$. D'après Q1, cet espace est de dimension 2. (EMV = **moindres carrés** pour les coefficients.)
- Par suite,
$$\mathbf{X}\hat\beta=\mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y}=P\mathbf{Y},$$
  où $P$ est le projecteur sur l'espace vectoriel engendré par $\mathbf{1}$ et $\underline{\mathbf{x}}$. Avec cette notation,
$$\widehat{\sigma^2}=\frac1n\lVert(I-P)\mathbf{Y}\rVert^2,$$
  qui montre que $\widehat{\sigma^2}$ est lié à la norme au carré de « la partie résiduelle de $\mathbf{Y}$, c'est-à-dire la partie de $\mathbf{Y}$ qui n'est pas expliquée par les colonnes de $\mathbf{X}$ ».

**Q3.** On a établi que
$$\begin{bmatrix}\hat\beta_1\\ \hat\beta_2\end{bmatrix}=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y}\quad\text{est de la forme }A\mathbf{Y},\qquad A:=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\in\mathbb{R}^{2\times n}.$$
Sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, le vecteur $\mathbf{Y}$ est un vecteur gaussien (coordonnées gaussiennes **indépendantes**), d'espérance $\mathbf{X}\beta$ et de matrice de covariance $\sigma^2I_n$. Par suite (**image linéaire d'un vecteur gaussien**, Poly ch.1 Prop. 2.4), le vecteur $(\hat\beta_1,\hat\beta_2)^T$ est encore un vecteur gaussien. Son espérance est
$$A\mathbf{X}\beta=\beta\qquad(\text{car }A\mathbf{X}=I_2):$$
**l'estimateur est sans biais.** La matrice de covariance est
$$\sigma^2AA^T=\sigma^2(\mathbf{X}^T\mathbf{X})^{-1}.$$
Conclusion : $\hat\beta\sim\mathcal{N}\big(\beta,\ \sigma^2(\mathbf{X}^T\mathbf{X})^{-1}\big)$.

**Q4.** Sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, $(\hat\beta_1,\hat\beta_2)^T$ est un vecteur gaussien. Les composantes sont indépendantes **ssi la matrice de covariance est diagonale** (Poly ch.1 Prop. 2.6). Le calcul de l'inverse de cette matrice $2\times2$ montre que la covariance est diagonale ssi $n^{-1}\sum_{i=1}^nx_i=0$.

*Détail du calcul de l'inverse (non écrit dans le corrigé de la PC, donné dans le poly) :*
$$(\mathbf{X}^T\mathbf{X})^{-1}=\frac1{n\sum_{i=1}^nx_i^2-\big(\sum_{i=1}^nx_i\big)^2}\begin{bmatrix}\sum_{i=1}^nx_i^2&-\sum_{i=1}^nx_i\\ -\sum_{i=1}^nx_i&n\end{bmatrix},\qquad\mathrm{Cov}_\theta(\hat\beta_1,\hat\beta_2)=-\frac{\sigma^2\bar x}{\sum_{i=1}^n(x_i-\bar x)^2},$$
nulle ssi $\bar x=0$ (car $\sigma^2>0$). De plus $\mathrm{Var}_\theta(\hat\beta_2)=\dfrac{\sigma^2}{\sum_i(x_i-\bar x)^2}$, $\mathrm{Var}_\theta(\hat\beta_1)=\dfrac{\sigma^2\sum_ix_i^2}{n\sum_i(x_i-\bar x)^2}$. **[Complément poly]** Dans la paramétrisation centrée, l'estimateur de $\tilde\beta_1$ est $\bar Y$, indépendant de $\hat\beta_2$.

**Q5.** On a remarqué que $\widehat{\sigma^2}=n^{-1}\lVert(I-P)\mathbf{Y}\rVert^2$ où $P$ est une matrice de projection sur un espace vectoriel de dimension 2. Donc $(I-P)$ est la projection sur l'espace orthogonal, **de dimension $n-2$**. Puisque sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, $\mathbf{Y}$ est un vecteur gaussien, $(I-P)\mathbf{Y}$ est aussi un vecteur gaussien (Prop. 2.4 ch.1). Son espérance est
$$\mathbb{E}_\theta[(I-P)\mathbf{Y}]=(I-P)\mathbf{X}\beta=0_{\mathbb{R}^n},$$
**puisqu'on projette un élément de l'espace engendré par les colonnes de $\mathbf{X}$ sur l'espace orthogonal** ; et sa matrice de covariance est
$$\mathrm{Cov}_\theta\big((I-P)\mathbf{Y}\big)=\sigma^2(I-P)(I-P)^T=\sigma^2(I-P);$$
on a utilisé que $P$ est **symétrique** et que, comme tout projecteur, $(I-P)^2=I-P$. Puisque $(I-P)$ est un projecteur sur un espace de dimension $n-2$, il est de la forme $Q\Delta Q^T$ où $Q$ est une **matrice orthogonale** et $\Delta$ une matrice diagonale avec $n-2$ éléments diagonaux valant 1 et les 2 autres nuls (**théorème spectral**). Une transformation par matrice orthogonale ne changeant pas la norme,
$$\lVert Q^T(I-P)\mathbf{Y}\rVert=\lVert(I-P)\mathbf{Y}\rVert.$$
Par ailleurs, sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$,
$$Q^T(I-P)\mathbf{Y}\sim\mathcal{N}_n\big(0;\sigma^2\Delta\big)$$
(covariance $Q^T\sigma^2Q\Delta Q^TQ=\sigma^2\Delta$) : ses coordonnées sont indépendantes, $n-2$ d'entre elles de loi $\mathcal{N}(0,\sigma^2)$ et 2 nulles. On en déduit (définition du $\chi^2$, Poly ch.1 Déf. 11) que
$$\boxed{\ \frac{n\,\widehat{\sigma^2}}{\sigma^2}\sim\chi^2(n-2).\ }$$
C'est aussi le **théorème de Cochran** (Poly ch.1 Th. 1.1 (ii), avec $F=\mathrm{Im}\,\mathbf{X}$, $F^\perp$ de dimension $n-2$ et $P_{F^\perp}\mathbf{X}\beta=0$) ou Poly ch.1 Prop. 2.9 (ii).

> **[Complément poly ch.2]** $\chi^2(n-2)=\mathrm{Gamma}\big(\frac{n-2}2,\frac12\big)$ (Prop. 2.8 ch.1) donc $\widehat{\sigma^2}\sim\mathrm{Gamma}\big(\frac{n-2}2,\frac n{2\sigma^2}\big)$ et $\mathbb{E}_\theta[\widehat{\sigma^2}]=\frac{n-2}n\sigma^2$ : **biaisé** ; $\frac1{n-2}\lVert\mathbf{Y}-\mathbf{X}\hat\beta\rVert^2$ est sans biais.

**Q6.** $\widehat{\sigma^2}$ est une fonction (déterministe) de $(I-P)\mathbf{Y}$. Par ailleurs, puisque $\mathbf{X}\hat\beta=P\mathbf{Y}$, $(\hat\beta_1,\hat\beta_2)$ est une fonction déterministe de $P\mathbf{Y}$ :
$$\mathbf{X}^T\mathbf{X}\hat\beta=\mathbf{X}^TP\mathbf{Y}\qquad\Longrightarrow\qquad\hat\beta=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^TP\mathbf{Y}.$$
Or, sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, $(I-P)\mathbf{Y}$ et $P\mathbf{Y}$ sont des vecteurs gaussiens (le premier est centré) — **conjointement gaussiens** car $\big((I-P)\mathbf{Y},P\mathbf{Y}\big)$ est une image linéaire de $\mathbf{Y}$ ; de plus ils sont **décorrélés** puisque
$$\mathbb{E}_\theta\big[(I-P)\mathbf{Y}\mathbf{Y}^TP\big]=\sigma^2(I-P)P=0$$
(on a aussi $(I-P)\mathbf{X}\beta\beta^T\mathbf{X}^TP=0$ car $(I-P)\mathbf{X}=0$). **Donc ils sont indépendants** (Poly ch.1 Prop. 2.6 / Cor. 2.1). D'où l'indépendance de $\widehat{\sigma^2}$ et de $\hat\beta$ (**fonctions mesurables de vecteurs indépendants**).

**Q7.** On a établi que sous $p_\theta\cdot\mathrm{Leb}^{\otimes n}$,
$$n\frac{\widehat{\sigma^2}}{\sigma^2}\sim\chi^2(n-2)$$
— loi **indépendante de $\theta$** : c'est une **fonction pivotale** (Poly ch.2 Déf. 2.2). En notant $q^{n-2}_{\alpha/2}$ et $q^{n-2}_{1-\alpha/2}$ les quantiles d'ordre $\alpha/2$ et $1-\alpha/2$ d'une loi du $\chi^2$ à $(n-2)$ degrés de liberté,
$$\mathbb{P}_\theta\Big(q^{n-2}_{\alpha/2}\le n\frac{\widehat{\sigma^2}}{\sigma^2}\le q^{n-2}_{1-\alpha/2}\Big)=1-\alpha,$$
ou de façon équivalente
$$\mathbb{P}_\theta\Big(n\frac{\widehat{\sigma^2}}{q^{n-2}_{1-\alpha/2}}\le\sigma^2\le n\frac{\widehat{\sigma^2}}{q^{n-2}_{\alpha/2}}\Big)=1-\alpha.$$
Par suite l'intervalle aléatoire
$$\Big[\,n\frac{\widehat{\sigma^2}}{q^{n-2}_{1-\alpha/2}}\ ;\ n\frac{\widehat{\sigma^2}}{q^{n-2}_{\alpha/2}}\,\Big]$$
est un intervalle de confiance de niveau $1-\alpha$ pour $\sigma^2$.

#### Méthodes mobilisées
- Densité d'observations indépendantes non identiquement distribuées (produit).
- Inégalité de Cauchy-Schwarz (cas d'égalité) pour l'inversibilité de $\mathbf{X}^T\mathbf{X}$.
- **Calcul d'EMV par annulation du gradient** (système d'équations de vraisemblance) ; équations normales ; vérification du maximum (limites au bord ; dans le poly : maximisation en deux temps).
- Interprétation géométrique : projection orthogonale, moindres carrés = EMV.
- **Image linéaire d'un vecteur gaussien** (espérance, covariance) ; absence de biais.
- **Indépendance ⇔ décorrélation** pour un vecteur gaussien.
- **Théorème spectral / Cochran** : norme d'une projection d'un gaussien isotrope ⇒ $\chi^2(n-2)$.
- Indépendance de fonctions de vecteurs indépendants.
- **Fonction pivotale** et quantiles du $\chi^2$ pour un intervalle de confiance.

#### Pièges relevés / remarques du corrigé
- $\widehat{\sigma^2}$ divise par $n$ : $\mathbb{E}_\theta[\widehat{\sigma^2}]=\frac{n-2}n\sigma^2$ (biaisé) ; ne pas confondre avec l'estimateur sans biais en $n-2$.
- Degrés de liberté : $n-2$ (dimension de l'orthogonal de $\mathrm{Vect}(\mathbf{1},\underline{\mathbf{x}})$), pas $n-1$ ni $n$.
- Pour appliquer le $\chi^2$ centré il faut $(I-P)\mathbf{X}\beta=0$ (sinon $\chi^2$ non centré).
- Indépendance de $\hat\beta_1$ et $\hat\beta_2$ : **seulement** si $\bar x=0$ ; le recentrage $\underline{\tilde{\mathbf{x}}}$ rend les colonnes orthogonales.
- Décorrélation ⇒ indépendance **uniquement** pour un vecteur conjointement gaussien.
- Dans l'IC, les quantiles s'inversent : la borne **inférieure** utilise $q^{n-2}_{1-\alpha/2}$, la borne supérieure $q^{n-2}_{\alpha/2}$.
- L'IC est aléatoire, $\sigma^2$ est fixé (Poly ch.2 Déf. 2.2).

#### Résultats numériques
Aucune valeur numérique dans le corrigé. *(Pour une application numérique, valeurs de table — non issues du corrigé : pour $n=10$, $\alpha=0{,}05$, $\chi^2(8)$ : $q^{8}_{0{,}025}\approx2{,}180$, $q^{8}_{0{,}975}\approx17{,}535$, d'où l'IC $[10\,\widehat{\sigma^2}/17{,}535\ ;\ 10\,\widehat{\sigma^2}/2{,}180]$.)*

---

### Exercice 2 — Estimation d'un coefficient de mélange (⋆)

**Objectif :** Modèles de mélanges uniformes, estimation (comparer EMV et estimateur des moments ; seuillage ; biais).

#### Énoncé complet

Soit un $n$-échantillon $(X_1,\dots,X_n)$ du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{f_\theta\cdot\mathrm{Leb},\ \theta\in]0,1[\}\big)$ où
$$f_\theta(x)=\frac\theta a\,\mathbb{1}_{[0,a]}(x)+\frac{(1-\theta)}b\,\mathbb{1}_{[0,b]}(x).$$
On suppose que $a$ et $b$ sont connus et que $0<a<b$. La fonction de répartition associée à la densité $f_\theta$ vaut
$$x\mapsto\begin{cases}0&x\le0\\ \Big(\dfrac\theta a+\dfrac{(1-\theta)}b\Big)x&0\le x\le a\\ \theta+\dfrac{(1-\theta)}bx&a\le x\le b\\ 1&x\ge1\ \ (\text{lire }x\ge b)\end{cases}$$

1. Exprimer la fonction de vraisemblance à l'aide de $N_a:=\sum_{i=1}^n\mathbb{1}_{X_i\in[0,a]}$, le nombre d'observations à valeur dans $[0,a]$.
2. En déduire l'estimateur du maximum de vraisemblance de $\theta$, noté $\hat\theta_n^{(1)}$.
3. En utilisant la méthode des moments (d'ordre 1), proposer un estimateur $\hat\theta_n^{(2)}$ de $\theta$.

▶ **Analyses numériques.** On se donne des mesures $x_1,\dots,x_n$ obtenues comme la réalisation de tirages indépendants sous la loi $f_{0.2}$ dans le cas $a=1$ et $b=3$.

*Figure 1* — [gauche] Tracé de deux réalisations de la fonction de vraisemblance $\theta\mapsto L(\theta,X_1,\dots,X_n)$ : une pour $n=10$, une pour $n=200$. [centre] Tracé de deux réalisations de la fonction (aléatoire) dont l'estimateur des moments est un zéro ($n=10$ et $n=200$). [droite] Évolution du biais de l'estimateur $\hat\theta_n^{(1)}$ en fonction de $\theta$, pour $n=10$ et $n=200$.

Sur la figure 2, on visualise la loi de différents estimateurs : $\hat\theta_n^{(1)}$, $\hat\theta_n^{(2)}$ et
$$\hat\theta_n:=\frac{b(N_a/n)-a}{b-a},\qquad\tilde\theta_n:=\frac{b-2n^{-1}\sum_{i=1}^nX_i}{b-a}.$$
*Figure 2* — Boxplots de $N=5000$ réalisations des estimateurs pour $n=10$ (gauche) et $n=200$ (droite). MV-1 et MV-2 correspondent resp. à $\hat\theta_n$ et $\hat\theta_n^{(1)}$ ; Mom-1 et Mom-2 à $\tilde\theta_n$ et $\hat\theta_n^{(2)}$. « On fera attention aux échelles en ordonnées pour comparer les schémas de gauche et de droite. »

#### Corrigé complet (corrigé officiel, p. 11–15)

**Préliminaire. Calcul de la fonction de répartition.** Soit $\theta\in]0,1[$, $t\in\mathbb{R}$, $F_\theta(t)=\mathbb{P}_\theta(X\le t)$. Clairement,
$$\forall t\le0\quad F_\theta(t)=0,\qquad\forall t\ge b,\quad F_\theta(t)=1.$$
Puis, **en considérant les tirages possibles de la première loi uniforme $\mathcal{U}_{[0,a]}$ ou de la seconde $\mathcal{U}_{[0,b]}$** (interprétation en mélange : avec probabilité $\theta$ on tire selon $\mathcal{U}_{[0,a]}$, avec probabilité $1-\theta$ selon $\mathcal{U}_{[0,b]}$),
$$\forall t\in[0,a]\quad F_\theta(t)=\mathbb{P}_\theta(X\le t)=\theta\frac ta+(1-\theta)\frac tb,\qquad\forall t\in[a,b]\quad F_\theta(t)=\theta+(1-\theta)\frac tb.$$

**Q1.** En reprenant l'expression précédente,
$$\forall t\in\mathbb{R}\quad f_\theta(t)=\Big[\frac\theta a+\frac{1-\theta}b\Big]\mathbb{1}_{t\in[0,a]}+\Big[\frac{1-\theta}b\Big]\mathbb{1}_{t\in[a,b]}.$$
Aussi (**produit des densités, $n$-échantillon**), la vraisemblance s'écrit
$$L(\theta,X_1,\dots,X_n)=\prod_{i=1}^n\Big(\Big[\frac\theta a+\frac{1-\theta}b\Big]\mathbb{1}_{X_i\in[0,a]}+\Big[\frac{1-\theta}b\Big]\mathbb{1}_{X_i\in[a,b]}\Big)=\Big[\frac\theta a+\frac{1-\theta}b\Big]^{N_a}\Big[\frac{1-\theta}b\Big]^{n-N_a}.$$
(Les observations sont p.s. dans $[0,b]$ et p.s. différentes de $a$ ; la vraisemblance ne dépend des données que par $N_a$.)

**Q2.** On calcule la log-vraisemblance (**normalisée**, i.e. en divisant par le nombre total d'observations, ce qui ne change rien à ses optima) :
$$\ell(\theta,X_1,\dots,X_n)=\frac{N_a}n\log\Big[\frac\theta a+\frac{1-\theta}b\Big]+\frac{(n-N_a)}n\log\Big[\frac{1-\theta}b\Big].$$
Vue comme une fonction définie sur $\mathbb{R}$ (là où elle a un sens), la dérivée par rapport à $\theta$ est
$$\frac{N_ab-na-\theta n(b-a)}{(1-\theta)\big(a+\theta(b-a)\big)}\quad\Big(\text{à un facteur }\tfrac1n\text{ près, positif}\Big).$$
*(Étape : $\frac\theta a+\frac{1-\theta}b=\frac{a+\theta(b-a)}{ab}$, dérivée du premier log $=\frac{b-a}{a+\theta(b-a)}$, du second $=-\frac1{1-\theta}$, puis réduction au même dénominateur.)*
Sur $]0,1[$, le dénominateur est strictement positif. Posons
$$\hat\theta_n=\frac{bN_a-na}{n(b-a)}=\frac{b(N_a/n)-a}{b-a},$$
qui est le point qui annule le numérateur (affine strictement décroissant en $\theta$). Notons que $\mathbb{P}_\theta(\hat\theta_n\le1)=1$ (car $N_a\le n$). Pour le numérateur :
- soit $\hat\theta_n>0$ : c'est l'unique racine de la dérivée dans $]0,1[$, et la dérivée est positive pour $\theta\in\,]0,\hat\theta_n[$ et négative sinon. Donc le maximum est atteint en $\hat\theta_n$ ;
- soit $\hat\theta_n\le0$, et dans ce cas la dérivée est négative sur $]0,1[$. Donc le maximum est atteint en $\theta=0$.

Par suite, le maximum sur $]0,1[$ de la log-vraisemblance est
$$\boxed{\ \hat\theta_n^{(1)}=\hat\theta_n\vee0.\ }$$

> **[Complément poly ch.2 — rigueur]** Sur l'ouvert $]0,1[$, si $\hat\theta_n\le0$ ($N_a/n\le a/b$), $\ell$ est strictement décroissante et sa borne sup n'est pas atteinte : **pas d'EMV dans $]0,1[$** ; idem si $\hat\theta_n=1$ ($N_a=n$, $\ell$ strictement croissante). Comme $f_0$ et $f_1$ sont les densités de $\mathcal{U}([0,b])$ et $\mathcal{U}([0,a])$, on **prolonge le modèle à $[0,1]$** où $L$ est continue ; le maximum y est atteint en un point unique, $\hat\theta_n\vee0$. C'est l'estimateur retenu.

**Remarque sur le biais de l'estimateur (corrigé, en bleu).** Sous $\mathbb{P}_\theta$, $N_a$ suit une **loi binomiale** de paramètres $\big(n,\ \theta+(1-\theta)a/b\big)$ (somme de $n$ indicatrices indépendantes de $\{X_i\in[0,a]\}$, de probabilité $F_\theta(a)=\theta+(1-\theta)a/b$). On en déduit (**linéarité de l'espérance**)
$$\mathbb{E}_\theta\big[\hat\theta_n\big]=\frac{b\big(\theta+(1-\theta)\frac ab\big)-a}{b-a}=\theta,$$
et donc cet estimateur ($\hat\theta_n$, non seuillé) est **sans biais**. De plus, $\mathbb{P}_\theta(\hat\theta_n\le0)=\mathbb{P}_\theta(N_a/n\le a/b)$ et cette probabilité tend vers zéro puisque sous $\mathbb{P}_\theta$, la **loi des grands nombres** indique que
$$\mathbb{P}_\theta\Big(\lim_nN_a/n=(1-\theta)a/b+\theta\Big)=1,$$
donc la v.a. $N_a/n$ converge presque sûrement vers un point de l'intervalle $]a/b,1[$.

**Q3.** On calcule l'espérance de $X$ sous $f_\theta\cdot\mathrm{dLeb}$ (**espérance d'un mélange = mélange des espérances** ; $\mathbb{E}[\mathcal{U}_{[0,c]}]=c/2$) :
$$\mathbb{E}_\theta[X]=\theta\frac a2+(1-\theta)\frac b2.\tag{3}$$
L'estimateur des moments est obtenu en résolvant
$$\theta\ \text{tel que}\ \ \theta\frac a2+(1-\theta)\frac b2=\frac{S_n}n,\tag{4}$$
où $S_n=\sum_{i=1}^nX_i$. *Cette équation a-t-elle toujours une solution $\theta\in]0,1[$ ?* Puisque $\mathbb{P}_\theta(X_i\in[0,b])=1$, on a $\mathbb{P}_\theta(S_n/n\in[0,b])=1$ ; la loi des grands nombres dit que $\mathbb{P}_\theta(\lim_nS_n/n\in\,]a/2,b/2[)=1$ (voir (3)). Donc **à $n$ fixé, rien ne garantit que $S_n/n$ soit dans $]a/2,b/2[$**, et donc qu'il puisse s'écrire comme un barycentre des deux extrémités de cet intervalle.

Posons
$$\tilde\theta_n=\frac{b-\frac{2S_n}n}{b-a}=2\Big(\frac{b/2-\frac{S_n}n}{b-a}\Big),$$
qui résout l'équation (4). On peut poser comme estimateur (**seuillage**)
$$\hat\theta_n^{(2)}=\begin{cases}0&\text{si }\tilde\theta_n\le0\\ 1&\text{si }\tilde\theta_n\ge1\\ \tilde\theta_n&\text{sinon.}\end{cases}$$

**Remarque sur le biais de l'estimateur (en bleu).** On vérifie facilement (exploiter (4) par exemple : $\mathbb{E}_\theta[S_n/n]=\mathbb{E}_\theta[X]$) que
$$\mathbb{E}_\theta[\tilde\theta_n]=\theta,$$
c'est-à-dire l'estimateur $\tilde\theta_n$ est **sans biais**.

**▶ Analyse numérique (corrigé, en bleu).** On prend $a=1$, $b=3$.
- *Figure 3* : densité et fonction de répartition pour différentes valeurs de $\theta\in]0,1[$. Pour $\theta$ fixé, la densité est **constante par morceaux** ; pour $x$ fixé, c'est une fonction **croissante de $\theta$ sur $[0,a]$** et **décroissante sur $[a,b]$**.
- On simule $n_{\max}=200$ réalisations de la loi mélange de paramètre $\theta_{\mathrm{true}}=0.2$. *Figure 4* : vraisemblance calculée à partir des $n=10$ premières observations, puis des $n=200$ observations. Sur le premier jeu ($n=10$), on observe $N_a/n=0.3000$ ; sur le second ($n=200$), $N_a/n=0.5250$. Dans le premier cas (trait continu), le maximum est atteint **sur le bord en $\theta=0$** ; dans le second (pointillés), le maximum est atteint dans $]0,1[$ : l'EMV est bien défini et **diffère de $\theta_{\mathrm{true}}$**.
- *Figure 5* : tracé de $\theta\mapsto\theta a/2+(1-\theta)b/2-S_n/n$ pour $n=10$ puis $n=200$. Cette fonction dépend des réalisations via $S_n$ : elle est aléatoire. L'estimateur des moments (moment d'ordre 1) existe si cette courbe admet un zéro. Pour $n=10$, la racine est **négative** (zéro atteint en $\theta<0$) ; pour $n=200$, l'estimateur existe et est unique ; là encore, il diffère de $\theta_{\mathrm{true}}$.
- *Figure 6* : biais $\theta\mapsto\mathbb{E}_\theta\big[\hat\theta_n^{(1)}\big]-\theta$. Le calcul de l'espérance utilise que sous $\mathbb{P}_\theta$, $N_a\sim\mathrm{Bin}\big(n,\theta+(1-\theta)a/b\big)$, puis la formule
$$\mathbb{E}_\theta\big[\hat\theta_n^{(1)}\big]=\Big(b\,\frac{\mathbb{E}_\theta\big[N_a\mathbb{1}_{N_a\ge na/b}\big]}n-a\,\mathbb{P}_\theta(N_a\ge na/b)\Big)(b-a)^{-1}$$
  (le corrigé écrit $N_1$ dans la probabilité : coquille). Le biais est d'autant moins important que $n$ est grand.
- *Figure 2/7* : on répète l'expérience $N=5000$ fois : $N$ jeux de données de longueur $n=200$ sous $\theta_{\mathrm{true}}=0.2$. Pour chaque jeu, on calcule $\hat\theta_n$, $\hat\theta_n^{(1)}$, $\tilde\theta_n$, $\hat\theta_n^{(2)}$ sur les $n=10$ premières réalisations (boxplots à gauche), puis sur les $n=200$ (à droite). Logiquement, MV-2 et Mom-2 ne prennent que des valeurs dans $[0,1]$. La comparaison MV-1/MV-2 et Mom-1/Mom-2 montre que (i) pour $n=10$, **l'effet de seuillage survient assez souvent** ; (ii) pour $n=200$, il ne se réalise que sur Mom-1/Mom-2 parmi ces $N=5000$ réalisations.

> **[Complément poly ch.2]** $\hat\theta_n^{(1)}\ge\hat\theta_n$ avec inégalité stricte sur $\{\hat\theta_n<0\}$ (probabilité $>0$, contient $\{N_a=0\}$) : $\mathbb{E}_\theta[\hat\theta_n^{(1)}]>\theta$, **biais positif** $=\mathbb{E}_\theta[-\hat\theta_n\mathbb{1}_{\{\hat\theta_n<0\}}]$. $\tilde\theta_n\in]0,1[$ ssi $a/2<\bar X_n<b/2$ ; ex. toutes les observations $<a/2$ (probabilité $F_\theta(a/2)^n>0$) ⇒ $\tilde\theta_n\ge1$.

#### Méthodes mobilisées
- Densité d'un **mélange** ; fonction de répartition par interprétation en mélange.
- Vraisemblance d'un $n$-échantillon exprimée via une **statistique de comptage** $N_a$.
- **Calcul d'EMV par annulation du score** + **étude de signe** de la dérivée + **cas au bord** (maximum en $0$).
- **Seuillage / prolongement du modèle** au fermé $[0,1]$.
- **Méthode des moments** d'ordre 1 (Poly ch.2 Méthode 1.1), existence de la solution dans $\Theta$.
- Loi binomiale de $N_a$ ; **loi des grands nombres** ; calcul de **biais** (linéarité de l'espérance).
- Simulation / Monte Carlo (boxplots).

#### Pièges relevés / remarques du corrigé
- L'EMV peut ne pas exister dans l'ouvert $]0,1[$ : maximum au bord quand $N_a/n\le a/b$.
- $\hat\theta_n$ et $\tilde\theta_n$ sont **sans biais** mais peuvent sortir de $]0,1[$ ; leurs versions seuillées $\hat\theta_n^{(1)}$, $\hat\theta_n^{(2)}$ restent dans $[0,1]$ mais sont **biaisées**.
- EMV $\ne$ estimateur des moments ici (le modèle n'est pas exponentiel au sens de l'Ex. 3).
- La probabilité de seuillage tend vers 0 (LGN : $N_a/n\to\theta+(1-\theta)a/b\in]a/b,1[$, $S_n/n\to\mathbb{E}_\theta[X]\in]a/2,b/2[$).
- Attention à l'échelle des ordonnées des boxplots ($n=10$ vs $n=200$).
- Coquille énoncé : f.d.r. « $1$ pour $x\ge1$ » ⇒ lire $x\ge b$.

#### Résultats numériques
- $a=1$, $b=3$, $\theta_{\mathrm{true}}=0.2$ : $\mathbb{P}_\theta(X\in[0,a])=\theta+(1-\theta)a/b=0.2+0.8/3\approx0.4667$ ; $\mathbb{E}_\theta[X]=0.2\times0.5+0.8\times1.5=1.3$ ; seuil $a/b=1/3$ pour $N_a/n$ ; seuils $a/2=0.5$ et $b/2=1.5$ pour $S_n/n$. *(Calculs directs à partir des formules du corrigé.)*
- $n=10$ : $N_a/n=0.3000\le1/3$ ⇒ $\hat\theta_n=(3\times0.3-1)/2=-0.05$ ⇒ $\hat\theta_n^{(1)}=0$ (maximum au bord).
- $n=200$ : $N_a/n=0.5250$ ⇒ $\hat\theta_n=(3\times0.525-1)/2=0.2875$ ⇒ $\hat\theta_n^{(1)}=0.2875\ne0.2$.
- Figure 5 (lecture graphique approximative) : pour $n=10$ la droite vaut $\approx-0.15$ en $\theta=0$ (pente $-(b-a)/2=-1$), donc $S_n/n\approx1.65$ et $\tilde\theta_n\approx-0.15<0$ ; pour $n=200$ elle vaut $\approx0.3$ en $\theta=0$ et s'annule vers $\theta\approx0.3$, donc $S_n/n\approx1.2$.
- Figure 4 (lecture graphique) : les courbes valent $\approx0.33=1/b$ en $\theta=0$ et $0$ en $\theta=1$ (l'échelle suggère que c'est $L^{1/n}=\exp(\ell)$ qui est tracée — inférence, non dite par le corrigé).
- Figure 6 (lecture graphique) : biais maximal $\approx0.09$ près de $\theta=0$ pour $n=10$, $\approx0.015$ pour $n=200$ ; négligeable pour $\theta\gtrsim0.5$ ($n=10$) et $\theta\gtrsim0.1$ ($n=200$).
- Figure 2 (lecture graphique) : pour $n=10$, MV-1 s'étend jusqu'à $\approx-0.5$, Mom-1 jusqu'à $\approx-0.8$ et $>1$ ; pour $n=200$, toutes les boîtes sont centrées vers $0.2$, valeurs entre $\approx0$ et $0.4$.

---

### Exercice 3 — Famille exponentielle de densités (⋆⋆⋆)

**Objectif :** modèle exponentiel général (structure des familles exponentielles ; EMV = estimateur des moments associé à $T$ dans le modèle canonique).

#### Énoncé complet

Beaucoup de lois (dont des usuelles) ont une structure particulière pour lesquelles elles sont dites dans la *famille exponentielle*. Soit $(\mathsf{X},\mathcal{X})$ un espace mesurable (nous prendrons $\mathsf{X}=\mathbb{R}^k$ ou $\mathsf{X}=\mathbb{N}^k$) et $\mu$ une mesure $\sigma$-finie sur $(\mathsf{X},\mathcal{X})$. Soit $T:\mathsf{X}\to\mathbb{R}$ et $h:\mathsf{X}\to\mathbb{R}^+$ deux fonctions mesurables.

On appelle **modèle exponentiel canonique associé au couple $(T,h)$** une famille de lois ayant une densité par rapport à $\mu$ de la forme
$$x\mapsto q_\eta(x)=h(x)\exp\big(\eta T(x)-A(\eta)\big),\qquad x\in\mathsf{X},\tag{1}$$
où $A(\eta)$ est défini par
$$A(\eta):=\log\int h(x)\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x).\tag{2}$$
L'*espace des paramètres naturels* de la famille canonique associée à $(T,h)$ est l'ensemble
$$\Xi:=\{\eta\in\mathbb{R}\ :\ |A(\eta)|<\infty\}.$$
Plus généralement on appelle **famille exponentielle** toute famille de lois de densité
$$x\mapsto p_\theta(x)=h(x)\exp\big(\varphi(\theta)T(x)-B(\theta)\big)$$
par rapport à une mesure $\mu$ $\sigma$-finie sur $\mathbb{R}$ ou $\mathbb{N}$. Les valeurs admissibles de $\theta$ sont les éléments de
$$\Theta:=\Big\{\theta\in\mathbb{R}\ :\ \int h(x)\exp\big(\varphi(\theta)T(x)\big)\,\mu(\mathrm{d}x)<\infty\Big\}.$$

1. Les lois suivantes sont-elles dans la famille exponentielle, et si oui, sont-elles canoniques ?
   (a) La loi exponentielle de densité $x\mapsto p_\eta(x)=\eta\exp(-\eta x)\mathbb{1}_{\mathbb{R}^+}(x)$ sur $\mathsf{X}=\mathbb{R}$ ? Si oui, précisez l'espace des paramètres naturels.
   (b) La loi gaussienne $\mathcal{N}(\eta,1)$ sur $\mathbb{R}$. Si oui, précisez l'espace des paramètres naturels.
   (c) Soit $\alpha>0$ fixé. La loi de Weibull sur $]0,+\infty[$ de paramètre d'échelle $\lambda>0$ et de densité
$$x\mapsto q_\lambda(x)=\frac\alpha\lambda\Big(\frac x\lambda\Big)^{\alpha-1}\exp\big(-(x/\lambda)^\alpha\big),\qquad x>0.$$
   Si oui, précisez l'espace des paramètres naturels.
   (d) Montrer que la loi de Poisson définit un modèle exponentiel avec $\varphi(\theta)=\log(\theta)$, $B(\theta)=\theta$, $T(x)=x$, $h(x)=1/x!$. Préciser le modèle exponentiel canonique associé.
   (e) Montrer que la loi binomiale définit un modèle exponentiel avec
$$\varphi(\theta)=\log\Big(\frac\theta{1-\theta}\Big),\quad B(\theta)=-n\log(1-\theta),\quad T(x)=x,\quad h(x)=\binom nx.$$
   Préciser le modèle exponentiel canonique associé.
2. Nous allons tout d'abord établir certaines propriétés des modèles exponentiels canoniques.
   (a) Supposons que l'espace des paramètres est ouvert, que $A$ est régulière et que l'on peut permuter dérivée et intégrale. Quelle relation a-t-on entre $A'(\eta)$, $A''(\eta)$ et l'espérance et la variance de $T(X)$ sous $q_\eta$ ?
   (b) Montrer que la fonction $\eta\mapsto A(\eta)$ est convexe et que l'espace des paramètres naturels est un sous-ensemble convexe de $\mathbb{R}$.
   (c) On suppose dans la suite que $\Xi$ est un intervalle ouvert. Pour $\eta\in\Xi$, on pose
$$G(\eta):=\int h(x)\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x).$$
   Montrer que $G$ est infiniment différentiable sur $\Xi$ et que, pour tout $k\in\mathbb{N}^\ast$ et $\eta\in\Xi$,
$$G^{(k)}(\eta)=\int h(x)\,T^k(x)\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x).$$
   (d) Soit $(X_1,\dots,X_n)$ un $n$-échantillon du modèle exponentiel canonique associé à $(T,h)$.
      i. Déterminer l'estimateur des moments associé à la fonction $T$.
      ii. Déterminer l'estimateur du maximum de vraisemblance. Que remarque-t-on ?
3. Considérons dorénavant le modèle exponentiel général. On supposera que $\Theta$ est un intervalle ouvert de $\mathbb{R}$. On suppose que la fonction $\varphi$ définit un difféomorphisme de $\Theta$ sur $\Xi$, l'espace des paramètres naturels associé. On dispose d'un $n$-échantillon $(X_1,\dots,X_n)$ du modèle
$$\big(\mathsf{X},\mathcal{X},\{p_\theta\cdot\mu\ :\ \theta\in\Theta\}\big).$$
   Déterminer l'estimateur du paramètre $\theta$, solution des équations de vraisemblance [on pensera à utiliser la paramétrisation canonique].

**Conclusion de l'énoncé (après l'exercice, en italique).** (i) Les modèles exponentiels s'écrivent sous forme de facteurs séparables en la variable $x$ et le paramètre de la famille $\phi(\theta)$ (ou $\eta$ dans le modèle canonique). (ii) Il n'y a pas unicité de la représentation, y compris du paramètre canonique : on a en effet $\eta T(x)=(\lambda\eta)\,(T(x)/\lambda)$ pour tout $\lambda\in\mathbb{R}$ (non nul) par exemple. (iii) On a présenté une version simplifiée ; en toute généralité le paramètre peut être vectoriel, et le produit $\phi(\theta)T(x)$ peut être un produit scalaire entre des fonctions $\phi,T$ à valeurs dans $\mathbb{R}^q$, i.e. $\sum_{i=1}^q\phi_i(\theta)T_i(x)$. Par exemple, la loi gaussienne $\mathcal{N}_d(\mu,\Sigma)$, pour une matrice de covariance $\Sigma$ inversible, a une densité proportionnelle à
$$\exp\Big(-\frac12(x-\mu)^T\Sigma^{-1}(x-\mu)\Big)\propto\exp\Big(-\frac12\big(x^T\Sigma^{-1}x-2\mu^T\Sigma^{-1}x\big)\Big)=\exp\Big(-\frac12\mathrm{Tr}\big(\Sigma^{-1}xx^T\big)+\mu^T\Sigma^{-1}x\Big)=\exp\Big(-\frac12\big\langle\Sigma^{-1},xx^T\big\rangle+\big\langle\Sigma^{-1}\mu,x\big\rangle\Big)$$
et est donc un exemple de **famille exponentielle canonique de dimension $q>1$**. (iv) Une grande partie des modèles utilisés en pratique sont des modèles exponentiels (gaussien, log-normal, exponentiel, gamma, Bernoulli, Poisson, etc.). Ils sont traités dans le Chapitre IV-6 du polycopié.

#### Corrigé complet (corrigé officiel, p. 16–19)

**Q1(a).** Posons $T(x)=-x$ et $h(x)=1$ ; $\mu$ est la mesure de Lebesgue sur $\mathbb{R}_+$ (de façon équivalente : $h=\mathbb{1}_{\mathbb{R}_+}$ et $\mu=\mathrm{Leb}$ sur $\mathbb{R}$). Pour tout $\eta>0$,
$$\exp(A(\eta))=\int_{\mathbb{R}_+}\exp(-\eta x)\,\mathrm{d}x=\frac1\eta.$$
On vérifie que $x\mapsto\eta\exp(-\eta x)\mathbb{1}_{\mathbb{R}_+}(x)$ est égale à $x\mapsto h(x)\exp(\eta T(x)-A(\eta))$ (avec $A(\eta)=-\log\eta$). Noter que $\Xi=]0,+\infty[$ (pour $\eta\le0$ l'intégrale vaut $+\infty$). **Canonique.**

**Q1(b).** La densité est
$$x\mapsto\frac1{\sqrt{2\pi}}\exp\big(-0.5(x-\eta)^2\big)=\frac1{\sqrt{2\pi}}\exp\big(-0.5(x^2+\eta^2-2x\eta)\big).$$
Posons $T(x)=x$ et $h(x)=\frac1{\sqrt{2\pi}}\exp(-0.5x^2)$ ; $\mu$ est la mesure de Lebesgue sur $\mathbb{R}$. Pour tout $\eta\in\mathbb{R}$,
$$\exp(A(\eta))=\frac1{\sqrt{2\pi}}\int\exp\big(-0.5(x^2-2\eta x)\big)\,\mathrm{d}x=\exp(0.5\eta^2)$$
(**complétion du carré** $x^2-2\eta x=(x-\eta)^2-\eta^2$ et intégrale de la densité $\mathcal{N}(\eta,1)$). On vérifie que la densité est égale à $x\mapsto h(x)\exp(\eta T(x)-A(\eta))$, $A(\eta)=\eta^2/2$ ; noter que $\Xi=\mathbb{R}$. **Canonique.**

**Q1(c).** La densité s'écrit
$$x\mapsto\alpha x^{\alpha-1}\lambda^{-\alpha}\exp\big(-x^\alpha\lambda^{-\alpha}\big)\mathbb{1}_{x>0}.$$
Le paramètre naturel serait donc plutôt $\lambda^{-\alpha}\in\mathbb{R}_+^\star$. Par suite, ce **n'est pas un modèle exponentiel canonique** (en $\lambda$) ; il s'agit d'un **modèle exponentiel général**.

> **[Complément poly ch.2]** $h(x)=\alpha x^{\alpha-1}\mathbb{1}_{]0,+\infty[}(x)$, $T(x)=-x^\alpha$, $\varphi(\lambda)=\lambda^{-\alpha}$, $B(\lambda)=\alpha\log\lambda$. Forme canonique avec $\eta=\lambda^{-\alpha}$ : par le changement de variable $u=x^\alpha$, $G(\eta)=\int_0^{+\infty}\alpha x^{\alpha-1}e^{-\eta x^\alpha}\,\mathrm{d}x=\int_0^{+\infty}e^{-\eta u}\,\mathrm{d}u=1/\eta$ si $\eta>0$ ($+\infty$ sinon) : $\Xi=]0,+\infty[$, $A(\eta)=-\log\eta$. Pour $\alpha=1$ on retrouve la loi exponentielle.

**Q1(d).** La loi de Poisson est un modèle exponentiel par rapport à la **mesure de comptage** sur $\mathbb{N}$. Pour tout $k\in\mathbb{N}$,
$$\frac{\theta^k}{k!}\exp(-\theta)=\frac1{k!}\exp\big(k\ln\theta-\theta\big).$$
Posons
$$\phi(\theta)=\ln\theta,\qquad T(x)=x,\qquad h(x)=\frac1{x!},\qquad B(\theta)=\theta,\qquad\Theta=]0,+\infty[.$$
On peut se ramener à un modèle exponentiel canonique par **reparamétrisation** $\eta=\ln\theta$ ; auquel cas $A(\eta)=B(\exp(\eta))=\exp(\eta)$.

> **[Complément poly ch.2]** $G(\eta)=\sum_{k\in\mathbb{N}}e^{\eta k}/k!=\exp(e^\eta)<\infty$ pour tout $\eta$ : $\Xi=\mathbb{R}$, $q_\eta(k)=\frac1{k!}\exp(\eta k-e^\eta)$.

**Q1(e).** Pour tout $k\in\{0,\dots,n\}$,
$$p_\theta(k)=\frac{n!}{k!(n-k)!}\theta^k(1-\theta)^{n-k}=\frac{n!}{k!(n-k)!}\exp\Big\{k\ln\Big(\frac\theta{1-\theta}\Big)+n\ln(1-\theta)\Big\}.$$
Posons
$$\phi(\theta)=\ln\Big(\frac\theta{1-\theta}\Big),\qquad B(\theta)=-n\ln(1-\theta),\qquad T(x)=x,\qquad\Theta=]0,1[,\qquad h(x)=\frac{n!}{x!(n-x)!}.$$
On peut se ramener au modèle exponentiel canonique par la reparamétrisation
$$\eta=\ln\Big(\frac\theta{1-\theta}\Big)\qquad\text{i.e.}\qquad\theta=\frac{\exp(\eta)}{1+\exp(\eta)}.$$

> **[Complément poly ch.2]** $\mu$ = comptage sur $\{0,\dots,n\}$ ; $G(\eta)=\sum_{k=0}^n\binom nke^{\eta k}=(1+e^\eta)^n$ (**binôme de Newton**) : $\Xi=\mathbb{R}$, $A(\eta)=n\log(1+e^\eta)=B\big(e^\eta/(1+e^\eta)\big)$.

**Q2(a).** On a
$$A'(\eta)=\int T(x)\,q_\eta(x)\,\mu(\mathrm{d}x)=\mathbb{E}_\eta[T(X)]\qquad\text{et}\qquad A''(\eta)=\mathrm{Var}_\eta(T(X)).$$
*(Étapes implicites : $A=\log G$, $A'=G'/G$ et $G'(\eta)=\int hTe^{\eta T}\,\mathrm{d}\mu$ par dérivation sous l'intégrale ; $q_\eta=he^{\eta T}/G(\eta)$ ; $A''=G''/G-(G'/G)^2=\mathbb{E}_\eta[T^2]-\mathbb{E}_\eta[T]^2$. La justification de la permutation est l'objet de Q2(c).)*

**Q2(b).** Soient $\eta_1,\eta_2\in\Xi$ et $\lambda\in]0,1[$. Montrons que $\lambda\eta_1+(1-\lambda)\eta_2\in\Xi$. En utilisant l'**inégalité de Hölder** (exposants conjugués $1/\lambda$ et $1/(1-\lambda)$, appliquée à $(he^{\eta_1T})^\lambda$ et $(he^{\eta_2T})^{1-\lambda}$) :
$$\begin{aligned}A(\lambda\eta_1+(1-\lambda)\eta_2)&=\log\int h(x)\exp\big(\{\lambda\eta_1+(1-\lambda)\eta_2\}T(x)\big)\,\mu(\mathrm{d}x)\\&=\log\int\exp\big(\lambda\eta_1T(x)\big)\exp\big((1-\lambda)\eta_2T(x)\big)h(x)\,\mu(\mathrm{d}x)\\&\le\lambda\log\Big(\int\exp(\eta_1T(x))h(x)\,\mu(\mathrm{d}x)\Big)+(1-\lambda)\log\Big(\int h(x)\exp(\eta_2T(x))\,\mu(\mathrm{d}x)\Big)\\&\le\lambda A(\eta_1)+(1-\lambda)A(\eta_2).\end{aligned}\tag{5}$$
On en déduit que
$$A(\lambda\eta_1+(1-\lambda)\eta_2)\le\lambda|A(\eta_1)|+(1-\lambda)|A(\eta_2)|;$$
cela entraîne $A(\eta)<+\infty$ (en $\eta=\lambda\eta_1+(1-\lambda)\eta_2$) puisque $\eta_1,\eta_2\in\Xi$. Puisque $\Xi$ est non vide, il existe $\eta_\star$ tel que $\exp(A(\eta_\star))>0$ : cela entraîne que
$$\mu\big(\{x\in\mathsf{X}\ :\ h(x)>0\}\big)>0.$$
Donc pour tout $\eta\in\mathbb{R}$, en notant que $\exp(\eta T(x))>0$,
$$\exp(A(\eta))\ge\int_{h>0}\exp(\eta T(x))\,h(x)\,\mu(\mathrm{d}x)>0.$$
Il vient que $A(\eta)>-\infty$ pour tout $\eta\in\mathbb{R}$. Ainsi $|A(\lambda\eta_1+(1-\lambda)\eta_2)|<\infty$, ce qui montre que $\lambda\eta_1+(1-\lambda)\eta_2\in\Xi$ : **$\Xi$ est convexe**. La **convexité de $A$** a été établie par l'inégalité (5).

**Q2(c).** Soit $\eta\in\Xi$ ; puisque $\Xi$ est **ouvert**, il existe $\varepsilon>0$ tel que $\eta+\varepsilon\in\Xi$ et $\eta-\varepsilon\in\Xi$. Notons que
$$\exp\big(\varepsilon|T(x)|\big)\le\exp\big(\varepsilon T(x)\big)+\exp\big(-\varepsilon T(x)\big),$$
ce qui entraîne
$$\int h(x)\exp\big(\varepsilon|T(x)|\big)\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x)<\infty.\tag{6}$$
(6) entraîne aussi, pour tout $k\ge0$ (car $|T|^k\le C_ke^{\varepsilon|T|}$),
$$\int h(x)\,|T(x)|^k\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x)<\infty.\tag{7}$$
On écrit, pour tout $s$ tel que $|s|<\varepsilon/2$,
$$\frac{G(\eta+s)-G(\eta)}s=\int h(x)\frac{\exp(sT(x))-1}s\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x)$$
et on vérifie les hypothèses du **théorème de convergence dominée**. Quand $s\to0$, $\{\exp(sT(x))-1\}/s\to T(x)$. De plus, par le **théorème des accroissements finis**,
$$\Big|\frac{\exp(sT(x))-1}s\Big|\le|T(x)|\exp\big(\varepsilon|T(x)|/2\big),$$
et ce terme est majoré, pour tout $x$, par $C\exp(\varepsilon|T(x)|)$. On a donc, en utilisant (6), pour tout $|s|\le\varepsilon/2$,
$$\int h(x)\Big|\frac{\exp(sT(x))-1}s\Big|\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x)\le C\int h(x)\exp\big(\varepsilon|T(x)|\big)\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x)<\infty$$
(le corrigé écrit $|g(x)|$ au lieu de $h(x)$ : coquille). On en conclut que
$$G'(\eta)=\lim_{s\to0}\frac{G(\eta+s)-G(\eta)}s=\int h(x)T(x)\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x).$$
On termine **par récurrence** : on répète le raisonnement avec $h(x)\leftarrow h(x)|T|^k(x)$ (en fait $h\,T^k$, intégrable grâce à (7)) pour établir la propriété au rang $k+1$.

**Q2(d)i (numérotée « (d) » dans le corrigé) — estimateur des moments.** On a $G(\eta)=\exp(A(\eta))$ : la fonction $\eta\mapsto\exp(A(\eta))$ est infiniment différentiable sur $\Xi$. En particulier,
$$G'(\eta)=A'(\eta)\exp(A(\eta))=\int h(x)T(x)\exp\big(\eta T(x)\big)\,\mu(\mathrm{d}x),\qquad\text{soit}\qquad A'(\eta)=\int T(x)\,q_\eta(x)\,\mu(\mathrm{d}x).$$
Sous le modèle $q_\eta\,\mathrm{d}\mu$, les v.a. $(X_k)_k$ sont i.i.d. de loi $q_\eta\,\mathrm{d}\mu$, ce qui entraîne
$$A'(\eta)=\mathbb{E}_\eta[T(X_1)]\qquad\text{en ayant posé}\qquad\mathbb{E}_\eta[T(X_1)]:=\int T(x)\,q_\eta(x)\,\mathrm{d}\mu(x).$$
L'estimateur des moments associé à la fonction $T$ est donc l'estimateur solution de
$$\eta\ :\qquad A'(\eta)=\frac1n\sum_{k=1}^nT(X_k).$$

**Q2(d)ii (numérotée « (e) » dans le corrigé) — EMV.** Sous $q_\eta\,\mathrm{d}\mu$, les $(X_k)_k$ étant i.i.d., leur densité par rapport à $\mu^{\otimes n}$ est
$$(x_1,\dots,x_n)\mapsto\Big(\prod_{k=1}^nh(x_k)\Big)\exp\Big(\eta\sum_{k=1}^nT(x_k)-nA(\eta)\Big).$$
Par suite, la log-vraisemblance est ($C$ désignant un terme indépendant de $\eta$)
$$\eta\mapsto\ell_n(\eta):=C-nA(\eta)+\eta\sum_{k=1}^nT(X_k).$$
Noter que $G^{(2)}=A^{(2)}\exp(A)+(A')^2\exp(A)$, dont on déduit que
$$A^{(2)}(\eta)>0\quad\text{ssi}\quad\int\big(T(x)-\mathbb{E}_\eta[T(X_1)]\big)^2q(\eta;x)\,\mathrm{d}\mu(x)>0.$$
Par (7), la variance de $T(X)$ lorsque $X\sim q_\eta\,\mathrm{d}\mu$ existe pour tout $\eta\in\Xi$. **Si elle est strictement positive, $\eta\mapsto A(\eta)$ est strictement convexe** (donc $\ell_n$ strictement concave). Il s'ensuit (Poly ch.2 Lemme 2.3) que **le MV est unique lorsqu'il existe** et qu'il est donné par
$$\eta\ :\qquad A'(\eta)=\frac1n\sum_{k=1}^nT(X_k).$$
**En conclusion, pour les modèles exponentiels canoniques, l'estimateur des moments basé sur la statistique $T$ et celui par maximum de vraisemblance coïncident** (voir l'exemple de la gaussienne dans la feuille PC1).

> **[Complément poly ch.2]** L'EMV existe ssi $\bar T_n:=n^{-1}\sum_kT(X_k)\in A'(\Xi)$ (intervalle ouvert, $A'$ continue strictement croissante) ; sinon pas de maximum sur $\Xi$ (ex. Poisson avec $\bar X_n=0$). Si $\mathrm{Var}_\eta(T)=0$ : cas dégénéré, $q_\eta$ ne dépend pas de $\eta$, modèle non identifiable.

**Q3.** *Difféomorphisme* : $\phi$ est bijective de $\Theta$ dans $\Xi$, différentiable, et d'inverse différentiable. Sous le modèle $p_\theta\,\mathrm{d}\mu$, la densité des v.a. i.i.d. $X_1,\dots,X_n$ par rapport à $\mu^{\otimes n}$ est
$$(x_1,\dots,x_n)\mapsto\Big(\prod_{k=1}^nh(x_k)\Big)\exp\Big(\phi(\theta)\sum_{k=1}^nT(x_k)-nB(\theta)\Big),$$
dont on déduit la log-vraisemblance
$$\theta\mapsto C+\phi(\theta)\sum_{k=1}^nT(X_k)-nB(\theta).$$
La solution des équations de vraisemblance est (annulation de la dérivée, puis division par $\phi'(\theta)\ne0$)
$$\theta\in\Theta\ :\qquad\frac{B'(\theta)}{\phi'(\theta)}=n^{-1}\sum_{k=1}^nT(X_k),$$
ou encore (changement de variable $\eta=\phi(\theta)$)
$$\eta\in\Xi\ :\qquad\frac{B'\circ\phi^{-1}(\eta)}{\phi'\circ\phi^{-1}(\eta)}=n^{-1}\sum_{k=1}^nT(X_k).$$
En remarquant que $\eta=\phi(\theta)$ entraîne $B(\phi^{-1}(\eta))=A(\eta)$ (normalisation de la densité), on a (**dérivation d'une composée** / de la réciproque)
$$\frac{B'\circ\phi^{-1}(\eta)}{\phi'\circ\phi^{-1}(\eta)}=A'(\eta).$$
Ainsi, l'estimateur solution des équations de vraisemblance est $\hat\theta_n=\phi^{-1}(\hat\eta_n)$ où $\hat\eta_n$ est solution de
$$\eta\in\Xi\ :\qquad A'(\eta)=n^{-1}\sum_{k=1}^nT(X_k).$$
**Existence, unicité de $\hat\theta_n$ ssi existence et unicité de $\hat\eta_n$.** (C'est l'invariance par reparamétrisation, Poly ch.2 Prop. 1.2.)

> **[Complément poly ch.2]** Poisson : $A'(\eta)=e^\eta$ ⇒ $\hat\theta_n=e^{\hat\eta_n}=\bar X_n$ (Poly ch.2 Ex. 1.9) ; binomiale à $m$ essais : $A'(\eta)=me^\eta/(1+e^\eta)$ ⇒ $\hat\theta_n=\bar X_n/m$.

#### Méthodes mobilisées
- **Mise sous forme exponentielle** : identifier $h$, $T$, $\varphi$ (ou $\phi$), $B$ ; calcul de la **log-partition** $A$ et de $\Xi$.
- **Reparamétrisation** vers la forme canonique ($\eta=\ln\theta$, $\eta=\mathrm{logit}\,\theta$, $\eta=\lambda^{-\alpha}$).
- Complétion du carré (gaussienne), séries exponentielle et binôme (Poisson, binomiale).
- **Inégalité de Hölder** ⇒ convexité de $A$ et de $\Xi$.
- **Dérivation sous l'intégrale** : convergence dominée + accroissements finis + domination $e^{\varepsilon|T|}\le e^{\varepsilon T}+e^{-\varepsilon T}$ ; récurrence.
- $A'=$ espérance, $A''=$ variance de $T$.
- **Méthode des moments** (Poly ch.2 Méthode 1.1).
- **Calcul d'EMV par annulation du score** + stricte concavité (Poly ch.2 Lemme 2.3).
- **Invariance par reparamétrisation** (Poly ch.2 Prop. 1.2), dérivée de la réciproque.

#### Pièges relevés / remarques du corrigé
- Weibull : famille exponentielle **non canonique en $\lambda$** (paramètre naturel $\lambda^{-\alpha}$, $T(x)=-x^\alpha$) — sauf $\alpha=1$.
- Loi exponentielle : $T(x)=-x$ (signe !) et $\Xi=]0,+\infty[$ ; gaussienne $\mathcal{N}(\eta,1)$ : $\Xi=\mathbb{R}$.
- $\Xi$ est défini par $|A(\eta)|<\infty$ ; il faut aussi exclure $A=-\infty$ (fait via $\mu(\{h>0\})>0$).
- Pour dériver sous l'intégrale, l'**ouverture** de $\Xi$ est essentielle (marge $\pm\varepsilon$).
- Stricte convexité de $A$ ⇔ $\mathrm{Var}_\eta(T(X))>0$ ⇒ unicité de l'EMV (pas l'existence).
- La représentation exponentielle n'est pas unique ($\eta T=(\lambda\eta)(T/\lambda)$).
- Notation : $\varphi$ dans l'énoncé, $\phi$ dans le corrigé.

#### Résultats numériques
Aucun. Tableau récapitulatif utile (d'après le corrigé + compléments du poly) :

| Loi | $\mu$ | $h(x)$ | $T(x)$ | paramètre naturel $\eta$ | $A(\eta)$ | $\Xi$ |
|---|---|---|---|---|---|---|
| $\mathcal{E}(\eta)$ | $\mathrm{Leb}$ sur $\mathbb{R}_+$ | $1$ | $-x$ | $\eta$ | $-\log\eta$ | $]0,+\infty[$ |
| $\mathcal{N}(\eta,1)$ | $\mathrm{Leb}$ | $\frac1{\sqrt{2\pi}}e^{-x^2/2}$ | $x$ | $\eta$ | $\eta^2/2$ | $\mathbb{R}$ |
| Weibull$(\alpha,\lambda)$ | $\mathrm{Leb}$ sur $]0,+\infty[$ | $\alpha x^{\alpha-1}$ | $-x^\alpha$ | $\lambda^{-\alpha}$ | $-\log\eta$ | $]0,+\infty[$ |
| Poisson$(\theta)$ | comptage sur $\mathbb{N}$ | $1/x!$ | $x$ | $\ln\theta$ | $e^\eta$ | $\mathbb{R}$ |
| $\mathrm{Bin}(n,\theta)$ | comptage sur $\{0,\dots,n\}$ | $\binom nx$ | $x$ | $\ln\frac\theta{1-\theta}$ | $n\ln(1+e^\eta)$ | $\mathbb{R}$ |

---

### Exercice 4 — Durée de vie (⋆⋆)

**Objectif :** Modélisation de durées de vie exponentielles (minimum d'exponentielles, indépendance, identifiabilité).

#### Énoncé complet

On considère un système ne fonctionnant que si deux machines sont toutes les deux en état de marche. On observe les durées de vie des deux machines, que l'on modélise comme des lois exponentielles de paramètres $\lambda_0$ et $\lambda_1$, $\lambda_i>0$, et des lois indépendantes.

1. Montrer qu'une variable aléatoire $X$ suit la loi exponentielle $\mathcal{E}(\lambda)$ si et seulement si
$$\forall x>0\ :\ \mathbb{P}(X>x)=\exp(-\lambda x).$$
Le modèle statistique associé à cette expérience est
$$\Big(\mathbb{R}_+^2,\ \mathcal{B}(\mathbb{R}_+^2),\ \{\mathbb{P}_\theta=\mathcal{E}(\lambda_0)\otimes\mathcal{E}(\lambda_1),\ \theta=(\lambda_0,\lambda_1)\in(\mathbb{R}_+^\star)^2\}\Big).$$
2. Calculer la probabilité pour que le système ne tombe pas en panne avant la date $t$. En déduire la loi de la durée de vie $Z$ du système. Le système tombe en panne ; calculer la probabilité pour que la panne soit due à une défaillance de la machine 1.
3. Soit $I=1$ si la panne du système est due à une défaillance de la machine 1, $I=0$ sinon. Calculer $\mathbb{P}_\theta(Z>t;I=\delta)$ pour tout $t\ge0$ et $\delta\in\{0,1\}$. En déduire que $Z$ et $I$ sont indépendantes.
4. On dispose de $n$ systèmes identiques et fonctionnant indépendamment les uns des autres dont on observe les durées de vie $Z_1,\dots,Z_n$.
   (a) Écrire le modèle statistique correspondant. Les paramètres $\lambda_0$ et $\lambda_1$ sont-ils identifiables ?
   (b) Supposons maintenant que l'on observe à la fois les durées de vie des systèmes $Z_1,\dots,Z_n$ et les causes de la défaillance correspondantes $I_1,\dots,I_n$, $I_i\in\{0,1\}$. Écrire le modèle statistique dans ce cas. Les paramètres $\lambda_0$ et $\lambda_1$ sont-ils identifiables ?

#### Corrigé complet (corrigé officiel, p. 20–21)

**Q1.** Soit $x>0$ et $X\sim\mathcal{E}(\lambda)$. Alors
$$\mathbb{P}(X>x)=\int_x^{+\infty}\lambda\exp(-\lambda t)\,\mathrm{d}t=\big[-\exp(-\lambda t)\big]_x^\infty=\exp(-\lambda x).$$
Réciproquement, supposons que $\mathbb{P}(X>x)=\exp(-\lambda x)$. Alors $\mathbb{P}(X\le x)=1-\exp(-\lambda x)$ et c'est la fonction de répartition d'une loi exponentielle de paramètre $\lambda$ (**la fonction de répartition caractérise la loi**).

> **[Complément poly ch.2]** Pour $x\le0$ : par continuité à droite, $F_X(0)=\lim_{x\downarrow0}(1-e^{-\lambda x})=0$, et $F_X$ croissante positive ⇒ $F_X=0$ sur $]-\infty,0]$.

**Q2.** Posons $\theta=(\lambda_0,\lambda_1)\in\Theta=]0,+\infty[^2$ ; $F_\lambda(t)$ désigne la fonction de répartition d'une loi exponentielle de paramètre $\lambda$. Soient $X_0$, $X_1$ les durées de vie. On a $Z=X_0\wedge X_1$ **puisque le système ne marche que si les deux machines fonctionnent**. La probabilité que le système ne tombe pas en panne avant $t$ est $\mathbb{P}_\theta(Z>t)=\mathbb{P}_\theta(X_0\wedge X_1>t)$. En utilisant l'**indépendance** de $X_0$, $X_1$ sous $\mathbb{P}_\theta$ (et Q1),
$$\mathbb{P}_\theta(Z>t)=\mathbb{P}_\theta(X_0>t,X_1>t)=\mathbb{P}_\theta(X_0>t)\,\mathbb{P}_\theta(X_1>t)=\exp\big(-(\lambda_0+\lambda_1)t\big).$$
On en déduit (Q1) que sous $\mathbb{P}_\theta$, $\boxed{Z\sim\mathcal{E}(\lambda_0+\lambda_1)}$.

La probabilité que la défaillance soit due à la machine 1 est $\mathbb{P}_\theta(Z=X_1)$. Par **Fubini** sur la densité produit :
$$\begin{aligned}\mathbb{P}_\theta(Z=X_1)=\mathbb{P}_\theta(X_0\ge X_1)&=\int_0^\infty\!\!\int_0^\infty\lambda_0\lambda_1\exp(-\lambda_1x_1)\exp(-\lambda_0x_0)\mathbb{1}_{x_0\ge x_1}\,\mathrm{d}x_1\,\mathrm{d}x_0\\&=\lambda_1\int_0^\infty\exp(-\lambda_1x_1)\Big(\int_{x_1}^\infty\lambda_0\exp(-\lambda_0x_0)\,\mathrm{d}x_0\Big)\mathrm{d}x_1\\&=\lambda_1\int_0^\infty\exp(-\lambda_1x_1-\lambda_0x_1)\,\mathrm{d}x_1=\frac{\lambda_1}{\lambda_1+\lambda_0}.\end{aligned}$$

**Q3.** Soit $t\ge0$.
$$\begin{aligned}\mathbb{P}_\theta(Z>t,I=1)=\mathbb{P}_\theta(Z>t,Z=X_1)&=\mathbb{P}_\theta(X_0\ge X_1,X_1>t)\\&=\lambda_1\int_t^\infty\exp(-\lambda_1x_1)\Big(\int_{x_1}^\infty\lambda_0\exp(-\lambda_0x_0)\,\mathrm{d}x_0\Big)\mathrm{d}x_1\\&=\lambda_1\int_t^\infty\exp\big(-(\lambda_1+\lambda_0)x_1\big)\,\mathrm{d}x_1\\&=\frac{\lambda_1}{\lambda_1+\lambda_0}\exp\big(-(\lambda_1+\lambda_0)t\big)=\mathbb{P}(Z=X_1)\,\mathbb{P}(Z>t).\end{aligned}$$
De même,
$$\mathbb{P}_\theta(Z>t,I=0)=\frac{\lambda_0}{\lambda_1+\lambda_0}\exp\big(-(\lambda_1+\lambda_0)t\big)=\mathbb{P}_\theta(Z=X_0)\,\mathbb{P}_\theta(Z>t).$$
Dont on déduit que $(Z,I)$ sont **indépendantes** sous $\mathbb{P}_\theta$.

> **[Complément poly ch.2 — justification]** Par passage au complémentaire, $\mathbb{P}_\theta(Z\le t,I=\delta)=\mathbb{P}_\theta(I=\delta)\mathbb{P}_\theta(Z\le t)$ ; les classes $\{\{Z\le t\}\}_t$ et $\{\{I=0\},\{I=1\}\}$ sont stables par intersection finie et engendrent $\sigma(Z)$, $\sigma(I)$ : **lemme de classe monotone** ⇒ indépendance. Remarque : $\mathbb{P}_\theta(X_0=X_1)=0$ (diagonale négligeable), donc $I=\mathbb{1}_{\{X_1<X_0\}}$ p.s.

**Q4(a). Premier modèle statistique.**
- Espace mesurable : $]0,+\infty[^n$ muni de la tribu borélienne.
- Famille de fonctions de répartition $F_\theta$ sur $]0,+\infty[$ indexées par $\theta=(\lambda_0,\lambda_1)\in\Theta=]0,+\infty[^2$ et définies par
$$F_\theta(x)=\big(1-\exp(-(\lambda_0+\lambda_1)x)\big)\mathbb{1}_{\mathbb{R}_+}(x)$$
  (les $Z_i$ sont i.i.d. $\mathcal{E}(\lambda_0+\lambda_1)$ : modèle $n$-échantillon).

Soient $\lambda_0$ et $\lambda_1$ strictement positifs. Pour tout $\tau\in(0,\lambda_1)$, on a, pour tout $x>0$,
$$1-\exp\big(-((\lambda_1-\tau)+(\lambda_0+\tau))x\big)=1-\exp\big(-(\lambda_1+\lambda_0)x\big),$$
donc $F_{\lambda_0+\tau,\lambda_1-\tau}=F_{\lambda_0,\lambda_1}$ : **le modèle n'est pas identifiable** (Poly ch.1 Déf. 2 : deux paramètres distincts donnent la même loi ; seule la somme $\lambda_0+\lambda_1$ est identifiable).

**Q4(b). Nouveau modèle statistique.**
- Espace mesurable : $(]0,+\infty[\times\{0,1\})^n$ muni de la tribu engendrée par les ensembles $A\times\{0\}$, $A\times\{1\}$ où $A$ est un borélien.
- Famille de fonctions de répartition $F_\theta$ sur $]0,+\infty[\times\{0,1\}$ indexées par $\theta=(\lambda_0,\lambda_1)\in\Theta=]0,+\infty[^2$ et définies par (**indépendance de $Z$ et $I$, Q3**)
$$F_\theta(x,1)=\big(1-\exp(-(\lambda_0+\lambda_1)x)\big)\mathbb{1}_{\mathbb{R}_+}(x)\,\frac{\lambda_1}{\lambda_1+\lambda_0},\qquad F_\theta(x,0)=\big(1-\exp(-(\lambda_0+\lambda_1)x)\big)\mathbb{1}_{\mathbb{R}_+}(x)\,\frac{\lambda_0}{\lambda_0+\lambda_1}.$$

Supposons que $F_\theta=F_{\tilde\theta}$. Alors pour tout $x>0$ et $\delta=1$,
$$\big(1-\exp(-(\lambda_0+\lambda_1)x)\big)\frac{\lambda_1}{\lambda_0+\lambda_1}=\big(1-\exp(-(\tilde\lambda_0+\tilde\lambda_1)x)\big)\frac{\tilde\lambda_1}{\tilde\lambda_0+\tilde\lambda_1},$$
ce qui entraîne (limite $x\to+\infty$ pour le rapport, puis identification des exponentielles)
$$\lambda_0+\lambda_1=\tilde\lambda_0+\tilde\lambda_1,\qquad\frac{\lambda_1}{\lambda_0+\lambda_1}=\frac{\tilde\lambda_1}{\tilde\lambda_0+\tilde\lambda_1}.$$
On en déduit $\lambda_i=\tilde\lambda_i$ et donc $\theta=\tilde\theta$. **Le modèle est identifiable.**

> **[Complément poly ch.2 — hors corrigé de la PC]** Densité par rapport à $\mathrm{Leb}\otimes\nu$ ($\nu$ comptage sur $\{0,1\}$) : $q_\theta(z,\delta)=\lambda_\delta e^{-(\lambda_0+\lambda_1)z}\mathbb{1}_{\mathbb{R}_+}(z)$. Avec $N_\delta:=\sum_i\mathbb{1}_{\{I_i=\delta\}}$, l'EMV (existe et est unique sur $\{N_0>0,N_1>0\}$, de probabilité $\to1$) est $\hat\lambda_\delta=N_\delta/\sum_{i=1}^nZ_i$ (séparation des variables + annulation du score).

#### Méthodes mobilisées
- Caractérisation de la loi exponentielle par sa **fonction de survie** (la f.d.r. caractérise la loi).
- **Minimum de v.a. indépendantes** : produit des survies ⇒ $\mathcal{E}(\lambda_0+\lambda_1)$.
- **Fubini** sur une densité produit pour $\mathbb{P}(X_0\ge X_1)$.
- **Indépendance** par factorisation des probabilités jointes (classe monotone).
- Écriture d'un modèle statistique (espace, tribu, famille de lois) ; **identifiabilité** (contre-exemple / injectivité).
- (Poly) densité par rapport à une mesure produit $\mathrm{Leb}\otimes$ comptage ; EMV.

#### Pièges relevés / remarques du corrigé
- $Z=\min(X_0,X_1)$ (système en série), pas le max.
- La panne est due à la machine 1 quand $X_1\le X_0$ : $\mathbb{P}=\lambda_1/(\lambda_0+\lambda_1)$ (pas $\lambda_0/\dots$).
- Résultat contre-intuitif : **la date de la panne et sa cause sont indépendantes**.
- Observer seulement les $Z_i$ ne permet d'identifier que $\lambda_0+\lambda_1$ ; ajouter la cause $I_i$ rend le modèle identifiable.
- Pour montrer la non-identifiabilité, exhiber deux paramètres distincts de même loi ; pour l'identifiabilité, retrouver $\theta$ à partir de la loi.

#### Résultats numériques
Aucun dans le corrigé. Formules clés : $\mathbb{P}_\theta(Z>t)=e^{-(\lambda_0+\lambda_1)t}$, $\mathbb{E}_\theta[Z]=1/(\lambda_0+\lambda_1)$, $\mathbb{P}_\theta(I=1)=\lambda_1/(\lambda_0+\lambda_1)$. *(Exemple d'application, non issu du corrigé : $\lambda_0=1$, $\lambda_1=3$ ⇒ $\mathbb{P}(I=1)=0{,}75$, $\mathbb{P}(Z>1)=e^{-4}\approx0{,}0183$.)*

---

### Exercice 5 — Modèle auto-régressif (⋆⋆)

**Objectif :** Série temporelle (densité d'observations dépendantes via les lois conditionnelles ; EMV d'un AR(1)).

#### Énoncé complet

Soit $\theta:=(\phi,\sigma^2)\in\Theta:=\mathbb{R}\times\mathbb{R}_+^\star$. On considère l'observation $Z=(X_1,\dots,X_n)$, qui sous le modèle statistique $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, a la loi suivante : pour tout $1\le k\le n$, la loi conditionnelle de $X_k$ sachant $(X_1,\dots,X_{k-1})$ est une loi $\mathcal{N}(\phi X_{k-1},\sigma^2)$. Par convention, $X_0=0$.

1. Écrire le modèle statistique engendré par l'observation $Z$.
2. Déterminer l'estimateur du maximum de vraisemblance de $\theta=(\phi,\sigma^2)$.

#### Corrigé complet (corrigé officiel, p. 22–23)

**Q1.** Soit $\theta:=(\phi,\sigma^2)$ et $\Theta:=\mathbb{R}\times]0,+\infty[$. Pour établir l'expression de la densité $p_\theta$, notons que **les v.a. $(X_k)_k$ ne sont pas i.i.d. mais ont la structure d'une chaîne de Markov**. On propose deux méthodes.

*• Solution 1 (conditionnements successifs, fonction muette).* Notons $\mathcal{F}_n=\sigma(X_1,\dots,X_n)=\sigma(\xi_1,\dots,\xi_n)$. La loi conditionnelle de $X_n$ sachant $\mathcal{F}_{n-1}$ est une gaussienne centrée en $\phi X_{n-1}$ et de variance $\sigma^2$. Donc, pour $f_1,\dots,f_n$ mesurables bornées (**propriété de la tour / conditionnement**),
$$\begin{aligned}\mathbb{E}_\theta\Big[\prod_{k=1}^nf_k(X_k)\Big]&=\mathbb{E}\Big[\prod_{k=1}^{n-1}f_k(X_k)\,\mathbb{E}_\theta\big[f_n(X_n)\mid\mathcal{F}_{n-1}\big]\Big]\\&=\frac1{\sigma\sqrt{2\pi}}\mathbb{E}_\theta\Big[\prod_{k=1}^{n-1}f_k(X_k)\int f_n(x_n)\exp\Big(-0.5\Big(\frac{x_n-\phi X_{n-1}}\sigma\Big)^2\Big)\mathrm{d}x_n\Big]\\&=\cdots\\&=\frac1{(\sigma\sqrt{2\pi})^n}\int_{\mathbb{R}^n}\prod_{k=1}^nf_k(x_k)\exp\Big(-0.5\Big(\frac{x_k-\phi x_{k-1}}\sigma\Big)^2\Big)\mathrm{d}x_1\cdots\mathrm{d}x_n\\&=\frac1{(\sigma\sqrt{2\pi})^n}\int_{\mathbb{R}^n}\prod_{k=1}^nf_k(x_k)\exp\Big(-0.5\,\sigma^{-2}\sum_{k=1}^n(x_k-\phi x_{k-1})^2\Big)\mathrm{d}x_1\cdots\mathrm{d}x_n\\&=\frac1{(\sigma\sqrt{2\pi})^n}\int_{\mathbb{R}^n}\prod_{k=1}^nf_k(x_k)\exp\Big(-0.5\,\sigma^{-2}\sum_{k=1}^n\big(x_k^2+\phi^2x_{k-1}^2-2\phi x_kx_{k-1}\big)\Big)\mathrm{d}x_1\cdots\mathrm{d}x_n\end{aligned}$$
(avec $x_0=0$). Ainsi la loi jointe possède une densité par rapport à Lebesgue donnée par
$$\frac1{(\sigma\sqrt{2\pi})^n}\exp\Big(-\frac1{2\sigma^2}\sum_{k=1}^n\big(x_k^2+\phi^2x_{k-1}^2-2\phi x_kx_{k-1}\big)\Big)=\frac1{(\sigma\sqrt{2\pi})^n}\exp\Big(-\frac1{2\sigma^2}\underline{x}^T\Gamma^{-1}\underline{x}\Big)\tag{8}$$
avec $\underline{x}:=(x_1,\dots,x_n)$ et
$$\Gamma^{-1}:=\begin{bmatrix}1+\phi^2&-\phi&0&\cdots&\cdots\\ -\phi&1+\phi^2&-\phi&0&\cdots\\ 0&-\phi&1+\phi^2&-\phi&\cdots\\ \cdots&\cdots&\cdots&\cdots&\cdots\\ \cdots&\cdots&-\phi&1+\phi^2&-\phi\\ \cdots&\cdots&0&-\phi&1\end{bmatrix}$$
(tridiagonale ; **le dernier coefficient diagonal vaut $1$**, car $x_n$ n'apparaît jamais comme « $x_{k-1}$ »).

Le modèle statistique est donc $\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{p_\theta\cdot\mathrm{Leb}^{\otimes n},\ \theta=(\phi,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^\ast\}\big)$ avec $p_\theta$ donnée par (8) : un vecteur gaussien centré de matrice de précision $\sigma^{-2}\Gamma^{-1}$.

*Fonctions produit pour la méthode de la variable muette (remarque en bleu).* Lorsque l'on applique la méthode dite « de la fonction muette » pour déterminer la loi d'un vecteur aléatoire, il est plus usuel de prendre une fonction $h:\mathbb{R}^n\to\mathbb{R}$ qui n'est pas nécessairement de forme produit. Néanmoins, ces deux approches sont équivalentes. En effet, si la relation est vraie pour toute fonction $h:\mathbb{R}^n\to\mathbb{R}$ mesurable bornée, alors elle est vraie en particulier pour une fonction de type produit $h(x_1,\dots,x_n)=\prod_{k=1}^nh_k(x_k)$. Réciproquement, si on a la propriété pour toute $h$ de la forme $\prod_{k=1}^nh_k(x_k)$ avec $h_k$ mesurables bornées, alors on l'a pour toutes les indicatrices de pavés $\prod_{k=1}^n\mathbb{1}_{]-\infty,a_k]}$ ; on en déduit que la propriété reste vraie pour toutes les indicatrices de boréliens de $\mathbb{R}^n$ (**classe monotone**) ; puis pour toute fonction mesurable (bornée) (**approximation par fonctions étagées**).

*• Solution 2 (représentation par un bruit gaussien).* Sous $\mathbb{P}_\theta$, $X_k$ a même loi que $\phi X_{k-1}+\sigma\xi_k$ où les $\{\xi_i\}$ sont i.i.d. $\mathcal{N}(0,1)$. En procédant **par récurrence**, on a pour tout $k\ge1$ (attention, égalité en loi)
$$X_k=\sum_{j=1}^k\phi^{k-j}\xi_j$$
(*dans cette ligne et la suivante, le corrigé absorbe le facteur $\sigma$ dans $\xi_j$, i.e. $\xi_j\sim\mathcal{N}(0,\sigma^2)$ ; version cohérente avec $\xi_j\sim\mathcal{N}(0,1)$ : $X_k=\sigma\sum_{j=1}^k\phi^{k-j}\xi_j$*). Donc la loi de $(X_1,\dots,X_n)$ est obtenue par **transformation affine du vecteur gaussien** $\underline{\xi}=(\xi_1,\dots,\xi_n)$ :
$$\begin{bmatrix}1&0&\cdots&0&0\\ \phi&1&\cdots&0&0\\ \phi^2&\phi&1&0&\cdots\\ \cdots&\cdots&\cdots&\cdots&\cdots\\ \phi^{n-1}&\phi^{n-2}&\cdots&\phi&1\end{bmatrix}\begin{bmatrix}\xi_1\\ \xi_2\\ \cdots\\ \xi_{n-1}\\ \xi_n\end{bmatrix}=\mathbf{A}\begin{bmatrix}\xi_1\\ \xi_2\\ \cdots\\ \xi_{n-1}\\ \xi_n\end{bmatrix}.$$
Puisque $\underline{\xi}\sim\mathcal{N}_n(0,\sigma^2I)$, il vient (Poly ch.1 Prop. 2.4) que $Z\sim\mathcal{N}_n\big(0,\sigma^2\mathbf{A}\mathbf{A}^T\big)$. D'où (Poly ch.1 Prop. 2.7, $\mathbf{A}$ inversible), pour tout borélien $A$,
$$\mathbb{P}_\theta(A)=\int_A\frac1{(\sqrt{2\pi}\sigma)^n}\frac1{\sqrt{\det(\mathbf{A}\mathbf{A}^T)}}\exp\Big(-\frac1{2\sigma^2}\underline{x}^T\big(\mathbf{A}\mathbf{A}^T\big)^{-1}\underline{x}\Big)\,\mathrm{d}\underline{x}.$$
*($\det\mathbf{A}=1$, matrice triangulaire à diagonale unité, donc $\det(\mathbf{A}\mathbf{A}^T)=1$ et on retrouve la constante de (8).)*

*• On peut vérifier que $\mathbf{A}\mathbf{A}^T\Gamma^{-1}=I$* en observant que
$$\mathbf{A}^T\Gamma^{-1}=\begin{bmatrix}1&0&0&&\\ -\phi&1&0&&\\ 0&-\phi&1&0&\cdots\\ \cdots&&&&\\ &&&0\ \ -\phi&1\end{bmatrix},$$
matrice triangulaire inférieure à diagonale unité et sous-diagonale $-\phi$, qui est exactement $\mathbf{A}^{-1}$ (car $(\mathbf{A}^{-1}\underline{x})_k=x_k-\phi x_{k-1}$) ; d'où $\mathbf{A}\mathbf{A}^T\Gamma^{-1}=\mathbf{A}\mathbf{A}^{-1}=I$ : les deux solutions coïncident ($\Gamma=\mathbf{A}\mathbf{A}^T$).

**Q2.** En partant de la relation (8), la log-vraisemblance est (à une constante près)
$$\theta\mapsto-\frac n2\ln\sigma^2-\frac1{2\sigma^2}\sum_{k=1}^n\big(X_k-\phi X_{k-1}\big)^2;$$
on voit que le maximum existe, est unique (note du corrigé : « se déduit de l'unicité de la solution de l'équation $\nabla\ell_n=0$ ») et est donné par la solution des équations de vraisemblance. On obtient :

- **corrigé de la PC (formule erronée, à corriger)** : $\hat\phi_n:=\dfrac{\sum_{k=1}^nX_kX_{k-1}}{\sum_{k=1}^nX_k^2}$ ;
- **formule correcte** (annulation de $\partial_\phi$ ; Poly ch.2, corrigé de l'Ex. 5) :
$$\boxed{\ \hat\phi_n:=\frac{\sum_{k=1}^nX_kX_{k-1}}{\sum_{k=1}^nX_{k-1}^2}=\frac{\sum_{k=2}^nX_kX_{k-1}}{\sum_{k=1}^{n-1}X_k^2},\qquad\hat\sigma_n^2:=\frac1n\sum_{k=1}^n\big(X_k-\hat\phi_nX_{k-1}\big)^2.\ }$$

*Étapes (rédaction du poly ch.2, qui détaille la preuve seulement affirmée dans le corrigé de la PC) :*
1. $\ell_n(a,v)=-\frac12\log(2\pi v)-\frac1{2nv}Q(a)$ avec $Q(a)=\sum_{k=1}^nX_k^2-2a\sum_{k=1}^nX_kX_{k-1}+a^2\sum_{k=1}^nX_{k-1}^2$ (**développement du carré**).
2. $D:=\sum_{k=1}^nX_{k-1}^2=\sum_{k=1}^{n-1}X_k^2>0$ p.s. pour $n\ge2$ ($X_1$ a une densité, donc $X_1\ne0$ p.s.).
3. À $v$ fixé, minimiser le **trinôme** $Q$ de coefficient dominant $D>0$ : minimum unique en $a=\hat\phi_n$ ($Q'(a)=0$).
4. $S:=Q(\hat\phi_n)/n>0$ p.s. ; $v\mapsto-\frac12\log(2\pi v)-\frac S{2v}$ a pour dérivée $\frac{S-v}{2v^2}$ : maximum en $v=S=\hat\sigma_n^2$.
5. $\ell_n(a,v)\le\ell_n(\hat\phi_n,v)\le\ell_n(\hat\phi_n,\hat\sigma_n^2)$, égalité ssi $(a,v)=(\hat\phi_n,\hat\sigma_n^2)$ : **maximisation en deux temps** comme Ex. 1 / Poly ch.2 Ex. 1.10.

$\hat\phi_n$ est le coefficient des **moindres carrés de la régression sans constante de $X_k$ sur $X_{k-1}$** (Ex. 1 avec régresseur aléatoire $X_{k-1}$) ; la loi de $\hat\phi_n$ ne s'obtient plus par Cochran.

#### Méthodes mobilisées
- **Densité jointe par conditionnements successifs** (propriété de la tour), **méthode de la fonction muette** avec fonctions produit, **classe monotone**.
- Écriture matricielle : forme quadratique, matrice de précision tridiagonale.
- **Représentation par bruit i.i.d.** + **transformation affine d'un vecteur gaussien** ; densité gaussienne multivariée.
- **Calcul d'EMV par annulation du gradient** ; **maximisation en deux temps** (trinôme en $\phi$, puis $\sigma^2$) ; moindres carrés.

#### Pièges relevés / remarques du corrigé
- Les observations **ne sont ni indépendantes ni identiquement distribuées** : la vraisemblance n'est pas un produit de densités marginales mais un produit de densités **conditionnelles**.
- $X_0=0$ : le premier terme est $X_1\sim\mathcal{N}(0,\sigma^2)$.
- Dernier coefficient diagonal de $\Gamma^{-1}$ égal à $1$ (pas $1+\phi^2$).
- **Coquille du corrigé de la PC** : dénominateur de $\hat\phi_n$ ; il faut $\sum_{k=1}^nX_{k-1}^2=\sum_{k=1}^{n-1}X_k^2$.
- Incohérence de normalisation des $\xi_k$ (variance $1$ ou $\sigma^2$) dans la Solution 2.
- L'égalité $X_k=\sum_j\phi^{k-j}\xi_j$ est une **égalité en loi** (ou trajectorielle dans la construction par bruit).
- Pas de restriction $|\phi|<1$ : $\Theta=\mathbb{R}\times\mathbb{R}_+^\ast$.

#### Résultats numériques
Aucun.

---

## 2. Synthèse des méthodes de la PC

| Méthode | Exercices | Résultat du poly utilisé |
|---|---|---|
| Écrire la densité d'un $n$-échantillon / d'observations indépendantes (produit) | 1, 2, 3, 4 | Poly ch.1 Déf. 6, formule (1) ; Poly ch.2 Déf. 1.4 |
| Densité par conditionnements successifs (observations dépendantes) | 5 | Fonction muette, classe monotone (Poly ch.1 §2) |
| Calcul d'EMV par annulation du score / gradient | 1, 2, 3, 5 (4 dans le poly) | Poly ch.2 Déf. 1.4–1.6, Méthode 1.2 |
| Vérification du maximum : concavité stricte, signe de la dérivée, limites | 1, 2, 3, 5 | Poly ch.2 Lemme 2.3, Méthode 1.2 (étape c) |
| Maximisation en deux temps (profil en $\beta$ ou $\phi$, puis en $\sigma^2$) | 1, 5 | Poly ch.2 Ex. 1.10 |
| Maximum au bord / seuillage / prolongement du modèle | 2 | Poly ch.2 Méthode 1.2, Ex. 1.8 (cas au bord) |
| Méthode des moments (existence de la solution dans $\Theta$) | 2, 3 | Poly ch.2 Déf. 1.2, Méthode 1.1 |
| EMV = estimateur des moments (familles exponentielles) | 3 | Poly ch.2 Ex. 1.8–1.10, Remarque p. 18 |
| Invariance par reparamétrisation | 3 Q3 | Poly ch.2 Prop. 1.2 |
| Calcul de biais (linéarité, loi binomiale) | 1, 2 | Poly ch.2 (biais), loi binomiale |
| Loi des grands nombres (probabilité de seuillage → 0) | 2 | Poly ch.2 Th. 2.1, Prop. 1.1 |
| Moindres carrés = EMV, projection orthogonale | 1, 5 | PC1 Ex. 4 ; Poly ch.2 Ex. 4.7 |
| Image linéaire d'un vecteur gaussien | 1, 5 | Poly ch.1 Prop. 2.4 |
| Indépendance ⇔ décorrélation (vecteur gaussien) | 1 | Poly ch.1 Prop. 2.6, Cor. 2.1 |
| Théorème de Cochran / projection ⇒ $\chi^2(n-2)$ | 1 | Poly ch.1 Th. 1.1, Prop. 2.9 |
| Fonction pivotale et quantiles ⇒ intervalle de confiance | 1 | Poly ch.2 Déf. 2.2 |
| Inégalité de Hölder (convexité) | 3 | — (outil d'analyse) |
| Dérivation sous l'intégrale (convergence dominée, accroissements finis) | 3 | — (outil d'analyse) |
| Fonction de survie, minimum d'exponentielles, Fubini | 4 | Lois usuelles (Poly ch.1) |
| Indépendance par factorisation (classe monotone) | 4 | Poly ch.1 Déf. 4 / §2 |
| Identifiabilité (contre-exemple / injectivité) | 4 | Poly ch.1 Déf. 2 |
| Représentation par bruit gaussien, densité gaussienne multivariée | 5 | Poly ch.1 Prop. 2.4, 2.7 |

---

## 3. Idées de reformulation en exercices interactifs (sans saisie de formule)

### Exercice 1 — Modèle linéaire gaussien
1. **Preuve à ordonner (Q5–Q6)** : remettre dans l'ordre : « $\widehat{\sigma^2}=n^{-1}\lVert(I-P)\mathbf{Y}\rVert^2$ » → « $(I-P)\mathbf{Y}$ gaussien, $\mathbb{E}_\theta=(I-P)\mathbf{X}\beta=0$ » → « covariance $\sigma^2(I-P)$ car $P$ symétrique idempotent » → « $I-P=Q\Delta Q^T$, $\Delta$ avec $n-2$ uns » → « $\lVert Q^T(I-P)\mathbf{Y}\rVert=\lVert(I-P)\mathbf{Y}\rVert$ » → « $n\widehat{\sigma^2}/\sigma^2\sim\chi^2(n-2)$ ».
2. **QCM « degrés de liberté »** : $n\widehat{\sigma^2}/\sigma^2$ suit : (a) $\chi^2(n)$ ; (b) $\chi^2(n-1)$ ; (c) $\chi^2(n-2)$ ✔ ; (d) $\chi^2(2)$. Variante : $\mathbb{E}_\theta[\widehat{\sigma^2}]=$ (a) $\sigma^2$ ; (b) $\frac{n-2}n\sigma^2$ ✔ ; (c) $\frac{n-1}n\sigma^2$.
3. **Trouver l'erreur (Q7)** : IC proposé $\big[n\widehat{\sigma^2}/q^{n-2}_{\alpha/2}\ ;\ n\widehat{\sigma^2}/q^{n-2}_{1-\alpha/2}\big]$ → l'étudiant doit repérer l'inversion des quantiles. **Application numérique** : $n=10$, $\widehat{\sigma^2}=2$, $\alpha=0{,}05$, quantiles $2{,}180$ et $17{,}535$ fournis → choisir l'IC $[1{,}14\ ;\ 9{,}17]$ parmi 4 propositions.
4. **Vrai/faux (Q4)** : « $\hat\beta_1$ et $\hat\beta_2$ sont toujours indépendants » (F) ; « ils le sont ssi $\bar x=0$ » (V) ; « décorrélés ⇒ indépendants car $(\hat\beta_1,\hat\beta_2)$ est gaussien » (V).

### Exercice 2 — Mélange de deux uniformes
1. **Étape suivante à choisir (Q2)** : « la dérivée de $\ell$ est $\frac{N_ab-na-\theta n(b-a)}{(1-\theta)(a+\theta(b-a))}$ et $\hat\theta_n\le0$. Que conclure ? » (a) l'EMV vaut $\hat\theta_n$ ; (b) $\ell$ décroît sur $]0,1[$, maximum au bord $0$ ✔ ; (c) $\ell$ croît, maximum en 1.
2. **Application numérique** (données du corrigé, $a=1$, $b=3$) : « $n=10$, $N_a/n=0{,}3$ : $\hat\theta_n^{(1)}=$ ? » (0 ✔ / $-0{,}05$ / $0{,}3$) ; « $n=200$, $N_a/n=0{,}525$ » ($0{,}2875$ ✔).
3. **Associer** : MV-1, MV-2, Mom-1, Mom-2 ↔ $\hat\theta_n$, $\hat\theta_n^{(1)}$, $\tilde\theta_n$, $\hat\theta_n^{(2)}$ ↔ « sans biais / biaisé / à valeurs dans $[0,1]$ / peut être négatif ».
4. **Vrai/faux** : « $\tilde\theta_n$ est sans biais » (V) ; « $\hat\theta_n^{(1)}$ est sans biais » (F, biais positif) ; « la probabilité de seuillage tend vers 0 » (V, LGN).

### Exercice 3 — Famille exponentielle
1. **Associer (Q1)** : chaque loi (exponentielle, $\mathcal{N}(\eta,1)$, Weibull, Poisson, binomiale) ↔ son $T(x)$, son $h(x)$, son paramètre naturel, son $\Xi$, « canonique ou non » (cf. tableau récapitulatif).
2. **Preuve à ordonner (Q2(c))** : $\eta\pm\varepsilon\in\Xi$ (ouvert) → $e^{\varepsilon|T|}\le e^{\varepsilon T}+e^{-\varepsilon T}$ → intégrabilité (6) puis (7) → taux d'accroissement sous l'intégrale → domination par accroissements finis → convergence dominée → récurrence.
3. **QCM « que remarque-t-on ? » (Q2(d))** : (a) EMV et estimateur des moments associé à $T$ coïncident ✔ ; (b) l'EMV existe toujours ; (c) l'EMV est sans biais. Plus **vrai/faux** : « $A'(\eta)=\mathbb{E}_\eta[T(X)]$ » (V) ; « $A''(\eta)=\mathbb{E}_\eta[T(X)^2]$ » (F, c'est la variance) ; « $A$ est concave » (F).
4. **Trouver l'erreur (Q2(b))** : preuve de convexité où Hölder est remplacé par Jensen « dans le mauvais sens » ou où l'on oublie de montrer $A>-\infty$.

### Exercice 4 — Durée de vie
1. **Application numérique** : $\lambda_0=1$, $\lambda_1=3$ : $\mathbb{P}(I=1)$ ? ($0{,}25$ / $0{,}75$ ✔ / $1/3$) ; loi de $Z$ ? ($\mathcal{E}(4)$ ✔ / $\mathcal{E}(3)$ / $\mathcal{E}(3/4)$) ; $\mathbb{E}[Z]$ ? ($0{,}25$ ✔).
2. **Vrai/faux** : « $Z$ et $I$ sont indépendantes » (V) ; « en observant seulement $Z_1,\dots,Z_n$, $(\lambda_0,\lambda_1)$ est identifiable » (F, seule la somme) ; « en observant aussi les $I_i$, le modèle est identifiable » (V).
3. **Étape suivante à choisir (Q2)** : « $\mathbb{P}_\theta(Z>t)=\mathbb{P}_\theta(X_0>t,X_1>t)=\ ?$ » (a) produit des survies, par indépendance ✔ ; (b) somme ; (c) max.
4. **Contre-exemple à choisir (Q4(a))** : parmi plusieurs couples, lequel a même loi que $(\lambda_0,\lambda_1)=(1,3)$ ? ($(2,2)$ ✔, $(1,4)$, $(3,1)$ ✔ …).

### Exercice 5 — Modèle auto-régressif
1. **Trouver l'erreur** : présenter $\hat\phi_n=\sum_kX_kX_{k-1}/\sum_{k=1}^nX_k^2$ (formule du corrigé de la PC) et demander quelle étape du calcul est fausse → le dénominateur doit être $\sum_kX_{k-1}^2$.
2. **Preuve à ordonner (Q1, Solution 1)** : conditionner par $\mathcal{F}_{n-1}$ → remplacer $\mathbb{E}_\theta[f_n(X_n)\mid\mathcal{F}_{n-1}]$ par l'intégrale gaussienne → itérer jusqu'à $k=1$ (avec $X_0=0$) → regrouper en $\exp(-\frac1{2\sigma^2}\sum_k(x_k-\phi x_{k-1})^2)$ → passer des fonctions produit à toute fonction mesurable bornée (classe monotone).
3. **QCM sur $\Gamma^{-1}$** : quel est le dernier coefficient diagonal ? ($1$ ✔ / $1+\phi^2$ / $\phi^2$) ; quelle est la structure ? (tridiagonale ✔ / diagonale / pleine). **Vrai/faux** : « les $X_k$ sont i.i.d. » (F) ; « $Z$ est un vecteur gaussien centré » (V) ; « $\det\mathbf{A}=1$ » (V).
