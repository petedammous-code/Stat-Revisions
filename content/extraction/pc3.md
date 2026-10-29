# PC 3 — Biais, risque quadratique, admissibilité et borne de Cramér-Rao (estimateurs sans biais, information de Fisher, modèles non réguliers)

> **Sources extraites :** `S3_APM-41033-EP-PC3-enonce` (énoncé, 4 p., « 1 Exercices ») et `S3_APM-41033-EP-PC3-corrige` (corrigé officiel, paginé p. 5 à 17, « 2 Solutions »). Toutes les formules ont été vérifiées visuellement sur les PDF.
> **Convention de citation :** « Énoncé PC3, p. N » / « Corrigé PC3, p. N » pour la PC ; « Poly ch.3, Déf. 1.4 », « Poly ch.3, Th. 1.1 », « Poly ch.2, Ex. 1.11 »… pour le cours (numérotation de `content/extraction/ch1.md`, `ch2.md`, `ch3.md`).
> **Lien avec le poly :** les cinq exercices de la PC 3 sont **les mêmes** que les Exercices 1 à 5 de la §3 « Les exercices » du **Poly ch.3** (Exercices 1–3 « traités en PC », Exercices 4–5 « bonus » dans le poly). Les notations de la feuille de PC diffèrent légèrement de celles du poly (voir §0.3) : ce fichier reproduit **celles de la feuille de PC**.
> **Code couleur du corrigé officiel :** dans l'Exercice 4 Q2, un passage est imprimé en **bleu** avec un titre en gras (« **La racine du gradient est un minimum.** ») : il est signalé ci-dessous par *[passage en bleu dans le corrigé]*.
> **Remarques de l'extracteur :** tout ajout qui ne figure pas dans le corrigé officiel est explicitement marqué *[Extracteur]*.

---

## 0. Chapitres du poly mobilisés et rappels donnés en tête d'énoncé

### 0.1 Chapitres mobilisés

La PC 3 est la petite classe de la **semaine 3**, associée au **chapitre 3 « Bases de la théorie de la décision »** (le Poly ch.3, §1.12 « Programme des exercices », liste les Exercices 1–3 et les bonus 4–5). Elle mobilise aussi le **ch.2** (maximum de vraisemblance, modèle uniforme, régression de la PC 2) et le **ch.1** (statistiques d'ordre, loi du maximum, changement de variables, vecteurs gaussiens).

| Exercice | Notions du ch.3 mobilisées | Notions des chapitres antérieurs |
|---|---|---|
| Exo 1 (modèle uniforme) ⋆⋆ | biais (Déf. 1.1), risque quadratique (Déf. 1.3), décomposition biais-variance (Prop. 1.1), **admissibilité** (Déf. 1.4), Ex. 1.9 (support d'une loi uniforme, famille $aX_{n:n}$), Ex. 1.16 (vitesse $n^{-2}$) | EMV du modèle uniforme par étude directe de la vraisemblance (Poly ch.2, Déf. 1.4, Ex. 1.11, Méthode 1.2) ; loi du maximum (Poly ch.1, Ex. 1.13, modèle induit) |
| Exo 2 (régression linéaire gaussienne) ⋆⋆ | modèle régulier (Déf. 1.6), score (Déf. 1.7), **information de Fisher matricielle** (Déf. 1.8, Prop. 1.2), estimateur régulier (Déf. 1.9), **borne de Cramér-Rao** (Th. 1.1, Cor. 1.2) | modèle de régression gaussienne (PC 1 Exo 4, PC 2 Exo 1 = Poly ch.2 §4.2), vecteurs gaussiens et leur densité (Poly ch.1, Prop. 2.7) |
| Exo 3 (Cramér-Rao sans régularité) ⋆⋆⋆ | **Cauchy-Schwarz** (Prop. 2.1), modèle dominé, Th. 1.1 / Cor. 1.1 (retrouvés à la limite), dérivation sous l'intégrale / convergence dominée (Prop. 2.2), modèle uniforme non régulier (Ex. 1.12, Ex. 1.16) | Exo 1 de cette PC (risque de $\widehat{\theta}_n^{(2)}$) |
| Exo 4 (estimateurs linéaires) ⋆ | restriction de la classe des estimateurs, meilleur estimateur linéaire sans biais (Ex. 1.11), biais-variance (Prop. 1.1), Cauchy-Schwarz (Prop. 2.1) | modèle de translation-échelle (renvoi « voir PC1 » : PC 1 Exo 3, Poly ch.1 Ex. 2.1) ; multiplicateurs de Lagrange (note de bas de page du corrigé) |
| Exo 5 (statistiques d'ordre exponentielles) ⋆⋆⋆ | biais, risque quadratique, optimisation dans une classe linéaire (comme Exo 4) | statistiques d'ordre (Poly ch.1, Ex. 1.8), **changement de variables en dimension $k$** (Poly ch.1, Prop. 2.2), méthode de la fonction muette (Poly ch.1, « Transfert, fonction muette »), densité d'un $n$-échantillon (Poly ch.1, formule (1)) |

### 0.2 Rappels et conventions donnés en tête d'énoncé (Énoncé PC3, p. 1)

- *« Par convention, les vecteurs sont des vecteurs colonne. Pour un vecteur $a$, on notera $a^T$ sa transposée. »* (notation $a^T$ avec un T majuscule en exposant — différente du poly qui écrit $a^\top$, et de la PC 1 qui écrivait $a'$).
- **Aucun autre rappel** n'est donné en tête de feuille (pas de convention sur la loi Gamma dans cette PC).
- **Convention donnée en tête du corrigé de l'Exercice 5 (Corrigé PC3, p. 16, éq. (6))** : avec la paramétrisation $f_\theta(x)=\theta^{-1}e^{-x/\theta}\mathbb{1}_{\mathbb{R}_+}(x)$ de la loi exponentielle (paramètre = **moyenne**),
$$\mathbb{E}_\theta[U]=\theta,\qquad\mathrm{Var}_\theta(U)=\theta^2,\qquad\text{où }U\sim f_\theta(\cdot)\cdot\mathrm{Leb}.\tag{6}$$
  **Attention :** c'est l'inverse de la convention « intensité » du Poly ch.3, Ex. 1.13 et de la PC 1 ($\mathcal{E}(\lambda)$ de densité $\lambda e^{-\lambda u}$, de moyenne $\lambda^{-1}$).
- **Rappels donnés dans le corps de l'énoncé de l'Exercice 5 (Énoncé PC3, p. 4)** : le jacobien de la transformation (1) $(X_{1:n},\dots,X_{n:n})\mapsto(Z_1,\dots,Z_n)$ vaut $n!$ ; et pour tous $x_i\in\mathbb{R}$, avec la convention $x_0=0$,
$$\sum_{i=1}^nx_i=\sum_{i=1}^n(n-i+1)(x_i-x_{i-1}).$$
- **Rappel méthodologique du corrigé de l'Exercice 4 (note de bas de page 2, Corrigé PC3, p. 13) — multiplicateurs de Lagrange** : « La technique consiste à remplacer le problème d'optimisation sous contraintes, par un problème d'optimisation d'une autre fonction objectif qui inclut la contrainte : pour $\lambda_1,\cdots,\lambda_\ell$, on définit une nouvelle fonction objectif à optimiser :
$$(\text{objectif initial})+\sum_{i=1}^\ell\lambda_i\ \text{contrainte}_i.$$
  On utilise les outils classiques de résolution de l'optimisation sans contraintes (zéros du gradient, …) ; la solution si elle existe va être une fonction des multiplicateurs $\lambda_1,\cdots,\lambda_\ell$. Pour trouver quelles valeurs il faut prendre pour ces multiplicateurs, il faut se souvenir que la solution doit satisfaire $\ell$ contraintes. On obtient un système à $\ell$ équations et $\ell$ inconnues. La résolution donne les valeurs des multiplicateurs $\lambda_1,\cdots,\lambda_\ell$ ; dont on va déduire la solution du problème initial. »

### 0.3 Notations propres à la PC (à reproduire telles quelles)

| Notation de la feuille PC 3 | Signification | Équivalent / différence avec le Poly ch.3 |
|---|---|---|
| $a^T$, $\mathbf{X}^T$, $\nabla_\theta\ell_n^T$ | transposée | poly : $a^\top$ |
| $\mathrm{Unif}([0,\theta])$ | loi uniforme sur $[0,\theta]$ | poly : $\mathcal{U}([0,\theta])$ |
| $\mathrm{N}(\beta_1+\beta_2x_i,\sigma^2)$ | loi gaussienne (N droit) | poly : $\mathcal{N}$ |
| $X_{n:n}:=\max(X_1,\dots,X_n)$, $X_{1:n}\le X_{2:n}\le\dots\le X_{n:n}$ | statistiques d'ordre | identique au ch.3 (le ch.1 écrit $X_{(i)}$) |
| $\widehat{\theta}_n^{(1)},\widehat{\theta}_n^{(2)},\widehat{\theta}_{n,a}^{(3)}$ (chapeau large) | estimateurs de l'Exercice 1 | $\widehat{\theta}_n^{(2)}=\frac{n+1}{n}X_{n:n}$ est le $T_n^{(1)}$ de l'Ex. 1.9 du poly |
| $\widehat{\theta}_n^{\mathrm{MV}}$ | estimateur du maximum de vraisemblance | — |
| $T$, $\widetilde{T}$ | fonctions servant à construire $\widehat{\theta}_n^{(1)}$, $\widehat{\theta}_n^{(2)}$ | (le corrigé écrit indifféremment $\widetilde{T}$ et $\tilde T$) |
| $a_\star=(n+2)/(n+1)$ | facteur optimal de la famille $aX_{n:n}$ | poly : $a_n$ (Ex. 1.9) |
| $R(\theta,T)=\mathbb{E}_\theta[(T(Z)-\theta)^2]$ | risque quadratique | **Exercice 4 du corrigé : ordre inversé** $R(\hat\theta_n(\underline{a}),\theta)$ |
| $\mathbb{I}(\beta_1,\beta_2)$, $\mathbb{I}^{-1}(\beta_1,\beta_2)$, $\tilde{\mathbb{I}}(\beta_1)$ | information de Fisher (lettre ajourée), son inverse, information quand $\beta_2$ est connu | poly : $\mathbb{I}(\theta)^{-1}$ |
| $\theta=(\beta_1,\beta_2)^T$, $\mathbf{Y}$, $\mathbf{1}$, $\mathbf{x}$, $\mathbf{X}=[\mathbf{1}\ \mathbf{x}]$ | paramètre et objets de la régression (gras) | le poly (Exercice 2) utilise $\beta$ comme paramètre et $b$ comme variable |
| $\ell_n(\theta;Y_1,\dots,Y_n)$, $\tilde\ell_n(\beta_1;Y_1,\dots,Y_n)$ | log-vraisemblance du modèle complet / du sous-modèle ($\beta_2$ connu) | poly : $\ell_n(b;\mathbf{y})$ |
| $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu:\theta\in\Theta\})$ | modèle dominé (Exercice 3) | identique |
| $\Psi$, $A_\alpha:=\{z\in\mathsf{Z};p_\alpha(z)>0\}$ | fonction test, support de $p_\alpha$ (Exercice 3) | identique |
| $\tau_n(c)$ | facteur de la borne de l'Exercice 3 | identique |
| $q$ (densité de base), $p_\theta(x)=\frac1\sigma q\big(\frac{x-\theta}{\sigma}\big)$ | modèle de translation (Exercice 4) | **poly : la densité de base s'appelle $p$** |
| $\underline{a}_n=(a_{1,n},\cdots,a_{n,n})$, $\hat\theta_n(\underline{a}_n)$ (petit chapeau) | poids soulignés, estimateur linéaire | identique ; dans le corrigé de l'Exercice 4 : $\underline{a}$, $a_k$ (dépendance en $n$ omise) |
| $f_\theta(x)=\theta^{-1}e^{-x/\theta}\mathbb{1}_{\mathbb{R}_+}(x)$, $p_\theta(y_1,\cdots,y_n):=\prod_kf_\theta(y_k)$ | densité exponentielle (paramètre = moyenne), densité produit (Exercice 5) | **poly : la densité d'une observation s'appelle $p_\theta$** |
| $f_{1:n}(\theta;y_1,\dots,y_n)$ | densité jointe des statistiques d'ordre | identique |
| $Z_k$, $m_{j,n}$ (corrigé : $m_{jn}$, $a_{in}$, $\underline{m}$) | espacements normalisés, poids transformés | identique |
| $\mathcal{S}_n$, $\sigma$, $\tau$ | ensemble des permutations, permutation aléatoire qui ordonne, permutation fixe | **attention** : $\sigma$ désigne ici une permutation, pas un écart-type |

### 0.4 Incohérences et coquilles relevées dans la feuille (à ne pas reproduire)

- **Numérotation des figures** : l'énoncé contient la Figure 1 (Exercice 1) et la Figure 2, dont la légende dit « **Exercice 2** » alors qu'elle illustre l'**Exercice 3** ($\tau_n(c)$). Le corrigé numérote les mêmes figures **Figure 3** (Exercice 1) et **Figure 4** (Exercice 3, légende correcte), mais le texte du corrigé renvoie à la « figure 4 » pour l'Exercice 1 et à la « figure 6 » pour l'Exercice 3.
- **Exercice 3 Q6** : l'énoncé dit $0<c\le n$, le corrigé travaille avec $0<c<n$ (le cas $c=n$ donnerait $\delta=\theta\notin\,]0,\theta[$).
- **Exercice 1 Q2** : le corrigé écrit $\mathbb{E}_\theta[T(X)]$ (pour $\mathbb{E}_\theta[T(X_1)]$). Le Poly ch.3 §1.12 affirme qu'on montre dans cet exercice qu'« aucun estimateur sans biais de la forme $n^{-1}\sum_iT(X_i)$ n'existe », alors que le corrigé en **construit** un : se fier au corrigé (réponse **oui**).
- **Exercice 4 Q2** : la hessienne est testée sur un vecteur noté $\lambda$, même lettre que le multiplicateur de Lagrange de la Q1.
- **Exercice 5 Q5** : le corrigé se contente de « noter la bijection entre $\underline{m}$ et $\underline{a}$ » sans écrire la formule d'inversion (la version du Poly ch.3 en donne une **erronée** ; formule correcte au §1, Exercice 5, Q5).

---

## 1. Exercices

### Exercice 1 — Modèle uniforme : estimateurs sans biais et admissibilité (⋆⋆)

**Source :** Énoncé PC3, p. 1 ; Corrigé PC3, p. 5–7 (= Poly ch.3, §3.2, Exercice 1).

**Énoncé complet**

Soit $Z=(X_1,\dots,X_n)$ un $n$-échantillon du modèle statistique
$$\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathrm{Unif}([0,\theta])\ :\ \theta\in\mathbb{R}_+^*\}\big).$$

1. Calculer l'estimateur du maximum de vraisemblance de $\theta$.

Soit $g:\mathbb{R}_+^*\to\mathbb{R}$ une fonction différentiable vérifiant $\lim_{\theta\to0^+}\theta g(\theta)=0$.

2. Peut-on choisir $T:\mathbb{R}^+\to\mathbb{R}$ de telle sorte que $\widehat{\theta}_n^{(1)}:=n^{-1}\sum_{i=1}^nT(X_i)$ soit un estimateur sans biais de $g:\theta\to g(\theta)$ ?
3. On pose $X_{n:n}:=\max(X_1,\dots,X_n)$. Montrer que l'on peut choisir $\widetilde{T}:\mathbb{R}^+\to\mathbb{R}$ de telle sorte que $\widehat{\theta}_n^{(2)}:=\widetilde{T}(X_{n:n})$ soit un estimateur sans biais de $g:\theta\mapsto g(\theta)$.

Dans la suite de l'exercice, on pose $g(\theta)=\theta$.

4. Comparer le risque quadratique des deux estimateurs $\widehat{\theta}_n^{(1)}$ et $\widehat{\theta}_n^{(2)}$. Montrer que l'estimateur $\widehat{\theta}_n^{(1)}$ est inadmissible pour $n>1$. *Voir la figure 1.*
5. Pour $a>0$, calculer le risque quadratique de l'estimateur $\widehat{\theta}_{n,a}^{(3)}=aX_{n:n}$. Montrer que l'estimateur $\widehat{\theta}_n^{(2)}$ est inadmissible. *Voir la figure 1.*

*Figure 1 (énoncé ; = Figure 3 du corrigé) :* [gauche] évolution de $\theta\mapsto\mathbb{E}_\theta\big[(\widehat{\theta}_n^{(i)}-\theta)^2\big]$ dans le cas $n=20$ (courbes « Risque 1 » et « Risque 2 », $\theta\in[0,1]$). [droite] $\theta\mapsto\mathbb{E}_\theta\big[(\widehat{\theta}_n^{(i)}-\theta)^2\big]$ pour $i=2,3$ dans le cas $n=5$ ; pour $\widehat{\theta}_n^{(3)}$, on a envisagé $a=1$ et $a=a_\star$ (courbes « Risque 2 », « Risque 3, a=1 », « Risque 3, a=a* »).

**Corrigé complet question par question**

**Q1. EMV.** La vraisemblance est donnée par
$$\theta\mapsto\frac{1}{\theta^n}\prod_{i=1}^n\mathbb{1}_{[0,\theta]}(X_i)=\frac{1}{\theta^n}\mathbb{1}_{X_{n:n}\le\theta}$$
où $X_{n:n}$ désigne le maximum des points $X_1,\cdots,X_n$.
- *Justification de l'égalité* : un produit d'indicatrices est l'indicatrice de l'intersection ; les $X_i$ étant positifs, « $X_i\in[0,\theta]$ pour tout $i$ » équivaut à $X_{n:n}\le\theta$.
- C'est une fonction qui est non nulle sur $[X_{n:n},+\infty[$ (nulle sur $]0,X_{n:n}[$) et décroissante sur $[X_{n:n},+\infty[$ (comme $\theta^{-n}$). Le maximum est donc atteint en $X_{n:n}$. Ainsi
$$\widehat{\theta}_n^{\mathrm{MV}}:=X_{n:n}.$$
- *[Extracteur]* C'est le calcul du Poly ch.2, Ex. 1.11 : la vraisemblance n'est pas dérivable en $X_{n:n}$, on **n'annule pas le score** (Poly ch.2, Méthode 1.2, étude directe).

**Q2. Estimateur sans biais de la forme $n^{-1}\sum_iT(X_i)$.** Par linéarité de l'espérance et parce que les $X_i$ ont même loi, $\mathbb{E}_\theta[\widehat{\theta}_n^{(1)}]=\mathbb{E}_\theta[T(X_1)]$. On cherche $T$ tel que $\mathbb{E}_\theta[T(X)]=g(\theta)$ pour tout $\theta\in\mathbb{R}_+^*$, soit encore (densité $\theta^{-1}\mathbb{1}_{[0,\theta]}$ de $X_1$)
$$\theta^{-1}\int_0^\theta T(x)\,\mathrm{d}x=g(\theta),\qquad\forall\theta>0.$$
Cela implique que $T$ a une primitive, s'annulant en $0$ par prolongement par continuité (c'est ici qu'intervient l'hypothèse $\lim_{\theta\to0^+}\theta g(\theta)=0$), qui est $\theta\mapsto\theta g(\theta)$. D'où l'on tire
$$T(x)=(xg(x))'=g(x)+xg'(x),\tag{2}$$
et on vérifie aisément qu'avec cette définition de $T$, on a bien $\mathbb{E}_\theta[\widehat{\theta}_n^{(1)}]=g(\theta)$ pour tout $\theta\in\mathbb{R}_+^*$.
- *[Extracteur] Vérification* : $\theta^{-1}\int_0^\theta(xg(x))'\,\mathrm{d}x=\theta^{-1}\big[\theta g(\theta)-\lim_{x\to0^+}xg(x)\big]=g(\theta)$.
- **Réponse : oui**, avec $T(x)=g(x)+xg'(x)$.

**Q3. Estimateur sans biais fonction de $X_{n:n}$.**
1. *Loi de $X_{n:n}$.* Pour tout $x\in[0,\theta]$,
$$\mathbb{P}_\theta(X_{n:n}\le x)=\mathbb{P}\Big(\bigcap_{i=1}^n\{X_i\le x\}\Big)=(x/\theta)^n,$$
où l'on a utilisé que sous $\mathbb{P}_\theta$, les v.a. $(X_i)_i$ sont **indépendantes** et ont **même loi uniforme**. D'où l'on tire (en dérivant la fonction de répartition) que sous $\mathbb{P}_\theta$, $X_{n:n}$ est une v.a. ayant une densité par rapport à la mesure de Lebesgue donnée par
$$x\mapsto\mathbb{1}_{[0,\theta]}(x)\frac{\partial}{\partial x}\Big(\frac{x}{\theta}\Big)^n=\mathbb{1}_{[0,\theta]}(x)\frac{nx^{n-1}}{\theta^n}.$$
2. *Équation d'absence de biais.* On veut $\mathbb{E}_\theta[\widetilde{T}(X_{n:n})]=g(\theta)$, soit encore
$$n\theta^{-n}\int_0^\theta\widetilde{T}(x)x^{n-1}\,\mathrm{d}x=g(\theta),\qquad\forall\theta>0,$$
ce qui revient à dire qu'une primitive de $x\mapsto\widetilde{T}(x)x^{n-1}$, s'annulant en $0$ par prolongement par continuité, est donnée par $\theta\mapsto\theta^ng(\theta)/n$.
3. D'où l'on tire
$$\widetilde{T}(x)=\frac{1}{x^{n-1}}\Big(\frac{x^ng(x)}{n}\Big)'=g(x)+\frac{x}{n}g'(x).\tag{3}$$
Une nouvelle fois, avec cette définition de $\widetilde{T}$, on obtient bien que $\mathbb{E}_\theta[\widehat{\theta}_n^{(2)}]=g(\theta)$ pour tout $\theta\in\mathbb{R}_+^*$.
- *[Extracteur]* La primitive s'annule bien en $0$ : $x^ng(x)=x^{n-1}\cdot xg(x)\to0$ quand $x\to0^+$ ($n\ge1$).

**Q4. Comparaison des risques ; inadmissibilité de $\widehat{\theta}_n^{(1)}$.** Le risque quadratique d'un estimateur $T(Z)$ est défini par $R(\theta,T)=\mathbb{E}_\theta[(T(Z)-\theta)^2]$ (Poly ch.3, Déf. 1.3).
1. En injectant $g(x)=x$ dans (2), on a $T(x)=2x$, ce qui conduit à la stratégie d'estimation
$$\widehat{\theta}_n^{(1)}=\frac2n\sum_{k=1}^nX_k$$
(on rappelle que sous $\mathbb{P}_\theta$, les $X_i$ sont i.i.d. d'espérance $\theta/2$ : c'est un **estimateur des moments** corrigé).
2. Le risque quadratique de cet estimateur est (sans biais ⇒ risque = variance par la décomposition biais-variance, Poly ch.3, Prop. 1.1 ; variance d'une moyenne de v.a. i.i.d. = variance divisée par $n$, par **indépendance**)
$$R(\theta,\widehat{\theta}_n^{(1)})=n^{-1}\mathrm{Var}_\theta(T(X_1))=n^{-1}\Big(\theta^{-1}\int_0^\theta4x^2\,\mathrm{d}x-\theta^2\Big)=\theta^2/(3n).$$
3. De même, en injectant $g(x)=x$ dans (3), on obtient $\tilde T(x)=(1+1/n)x$ et donc la stratégie d'estimation
$$\widehat{\theta}_n^{(2)}=\frac{n+1}{n}X_{n:n}.$$
4. Son risque quadratique est (sans biais, puis densité de $X_{n:n}$ de la Q3)
$$R(\theta,\widehat{\theta}_n^{(2)})=\mathrm{Var}_\theta(\tilde T(X_{n:n}))=n\theta^{-n}\int_0^\theta x^2\Big(1+\frac1n\Big)^2x^{n-1}\,\mathrm{d}x-\theta^2=\frac{(n+1)^2}{n(n+2)}\theta^2-\theta^2=\frac{\theta^2}{n(n+2)}.$$
5. Comme $n>1$ (donc $n+2>3$, i.e. $n(n+2)>3n$), il vient que
$$R(\theta,\widehat{\theta}_n^{(2)})=\frac{\theta^2}{n(n+2)}<\frac{\theta^2}{3n}=R(\theta,\widehat{\theta}_n^{(1)}),$$
pour tout $\theta>0$, ce qui montre l'**inadmissibilité** de $\widehat{\theta}_n^{(1)}$ (Poly ch.3, Déf. 1.4 : il existe un estimateur de risque $\le$ partout et $<$ en au moins un point — ici $<$ partout). On montre l'évolution du risque de chacun des deux estimateurs en fonction de $\theta\in[0,1]$ sur la figure.

**Q5. Famille $aX_{n:n}$ ; inadmissibilité de $\widehat{\theta}_n^{(2)}$.**
1. *Moments de $X_{n:n}$* (densité de la Q3) :
$$\mathbb{E}_\theta[X_{n:n}]=n\theta^{-n}\int_0^\theta x(x^{n-1})\,\mathrm{d}x=n\theta/(n+1),$$
$$\mathbb{E}_\theta[X_{n:n}^2]=n\theta^{-n}\int_0^\theta x^2(x^{n-1})\,\mathrm{d}x=n\theta^2/(n+2).$$
2. D'où l'on tire (développement du carré et linéarité de l'espérance)
$$R(\theta,\widehat{\theta}_{n,a}^{(3)})=a^2\mathbb{E}_\theta[X_{n:n}^2]-2a\theta\,\mathbb{E}_\theta[X_{n:n}]+\theta^2=\Big(a^2\frac{n}{n+2}-2a\frac{n}{n+1}+1\Big)\theta^2.$$
3. Choisissons $a$ de façon à minimiser ce risque (trinôme en $a$ de coefficient dominant $n/(n+2)>0$, dont le minimiseur **ne dépend pas de $\theta$**) ; on trouve $a_\star=(n+2)/(n+1)$. On obtient alors
$$R(\theta,\widehat{\theta}_{n,a_\star}^{(3)})=\frac{\theta^2}{(n+1)^2},$$
4. et puisque $(n+1)^2>n(n+2)$ pour tout $n\ge1$ (car $(n+1)^2-n(n+2)=1$), il vient que pour tout $n\ge1$
$$R(\theta,\widehat{\theta}_{n,a_\star}^{(3)})<R(\theta,\widehat{\theta}_n^{(2)}),\qquad\forall\theta>0,$$
ce qui montre bien que $\widehat{\theta}_n^{(2)}$ est **inadmissible** (et par conséquent aussi $\widehat{\theta}_n^{(1)}$).
- *[Extracteur]* Détail du minimum : $a_\star=\frac{n/(n+1)}{n/(n+2)}=\frac{n+2}{n+1}$, et la valeur minimale vaut $1-\frac{(n/(n+1))^2}{n/(n+2)}=1-\frac{n(n+2)}{(n+1)^2}=\frac{1}{(n+1)^2}$. Le cas $a=(n+1)/n$ redonne $\widehat{\theta}_n^{(2)}$ ; le cas $a=1$ redonne l'EMV $X_{n:n}$, de risque $\frac{2\theta^2}{(n+1)(n+2)}$.

**Méthodes mobilisées**
- EMV par **étude directe de la vraisemblance** (vraisemblance non dérivable, support dépendant de $\theta$ ; pas d'annulation du score).
- Construction d'un estimateur sans biais par **identification d'une primitive** (équation intégrale $\int_0^\theta T=\theta g(\theta)$).
- **Loi du maximum** par la fonction de répartition (**indépendance** + même loi), puis dérivation.
- Calcul de **moments** d'une uniforme et du maximum.
- **Décomposition biais-variance** (risque = variance pour un estimateur sans biais), variance d'une moyenne i.i.d.
- **Minimisation d'un trinôme** en $a$ (minimiseur indépendant de $\theta$).
- **Définition de l'inadmissibilité** : exhiber un estimateur dominant uniformément.

**Pièges relevés / remarques du corrigé**
- Ne pas chercher l'EMV en annulant la dérivée de $\theta^{-n}$ (pas de point critique) : il faut l'indicatrice.
- L'hypothèse $\lim_{\theta\to0^+}\theta g(\theta)=0$ sert à fixer la constante d'intégration (primitive nulle en $0$).
- Pour $n=1$, $\widehat{\theta}_1^{(1)}=2X_1=\widehat{\theta}_1^{(2)}$ : d'où la condition $n>1$ en Q4.
- « Sans biais » ne signifie pas « meilleur » : $\widehat{\theta}_{n,a_\star}^{(3)}$ est **biaisé** (biais $\theta\big(\frac{n(n+2)}{(n+1)^2}-1\big)=-\frac{\theta}{(n+1)^2}$ *[Extracteur]*) et domine l'estimateur sans biais $\widehat{\theta}_n^{(2)}$.
- Inadmissibilité **transitive** : $\widehat{\theta}_n^{(1)}$ est dominé par $\widehat{\theta}_n^{(2)}$, lui-même dominé par $\widehat{\theta}_{n,a_\star}^{(3)}$.
- Vitesses : risque en $n^{-1}$ pour $\widehat{\theta}_n^{(1)}$, en $n^{-2}$ pour les estimateurs fondés sur $X_{n:n}$ (non-régularité du modèle, Poly ch.3, Ex. 1.16 ; repris à l'Exercice 3).
- Incohérence du Poly ch.3 §1.12 (voir §0.4) : la réponse à Q2 est **oui**.

**Résultats numériques**
| Quantité | Formule | $n=5$ | $n=20$ |
|---|---|---|---|
| $R(\theta,\widehat{\theta}_n^{(1)})/\theta^2$ | $1/(3n)$ | $0{,}0667$ | $0{,}01667$ |
| $R(\theta,\widehat{\theta}_n^{(2)})/\theta^2$ | $1/(n(n+2))$ | $1/35\approx0{,}02857$ | $1/440\approx0{,}002273$ |
| $R(\theta,\widehat{\theta}_{n,1}^{(3)})/\theta^2$ (EMV) | $\frac{n}{n+2}-\frac{2n}{n+1}+1$ | $1/21\approx0{,}04762$ | $\approx0{,}004329$ |
| $R(\theta,\widehat{\theta}_{n,a_\star}^{(3)})/\theta^2$ | $1/(n+1)^2$ | $1/36\approx0{,}02778$ | $1/441\approx0{,}002268$ |
| $a_\star$ | $(n+2)/(n+1)$ | $7/6\approx1{,}1667$ | $22/21\approx1{,}0476$ |

(Ces valeurs à $\theta=1$ correspondent aux extrémités droites des courbes de la Figure 1 : $\approx0{,}0167$ et $\approx0{,}0023$ à gauche ; $\approx0{,}048$, $\approx0{,}029$, $\approx0{,}028$ à droite. *[Extracteur]*)

---

### Exercice 2 — Régression linéaire gaussienne : information de Fisher matricielle et bornes de Cramér-Rao (⋆⋆)

**Source :** Énoncé PC3, p. 1–2 ; Corrigé PC3, p. 8–9 (= Poly ch.3, §3.2, Exercice 2 ; suite de PC 2 Exo 1).

**Énoncé complet**

Soient $x_1,\dots,x_n$ des réels tels que $x_i\ne x_j$ pour deux indices $i\ne j$. On considère le modèle statistique
$$\Big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\Big\{\bigotimes_{i=1}^n\mathrm{N}(\beta_1+\beta_2x_i,\sigma^2)\ :\ (\beta_1,\beta_2)\in\mathbb{R}^2\Big\}\Big).$$
On suppose que $\sigma^2>0$ est connu.

1. Déterminer la matrice d'information de Fisher $\mathbb{I}(\beta_1,\beta_2)$.
2. Déterminer une borne inférieure sur la variance d'un estimateur (régulier) sans biais de $\beta_1$.
3. On suppose que $\beta_2$ est connu. Donner une borne inférieure sur la variance d'un estimateur (régulier) sans biais de $\beta_1$.
4. Déterminer une borne inférieure d'un estimateur (régulier) sans biais de $\beta_1\beta_2$.

**Corrigé complet question par question**

**Q1. Information de Fisher.** On pose $\theta=(\beta_1,\beta_2)^T$, $\mathbf{Y}=(Y_1,\dots,Y_n)^T$, $\mathbf{1}=(1,\dots,1)^T$, $\mathbf{x}=(x_1,\dots,x_n)^T$ et $\mathbf{X}=[\mathbf{1}\ \mathbf{x}]$.
1. *Log-vraisemblance* (densité produit de gaussiennes indépendantes ; sous $\mathbb{P}_\theta$, $\mathbf{Y}\sim\mathrm{N}(\mathbf{X}\theta,\sigma^2\mathrm{I}_n)$) :
$$\ell_n(\theta;Y_1,\dots,Y_n)=-\frac n2\log(2\pi\sigma^2)-\frac{1}{2\sigma^2}\|\mathbf{Y}-\mathbf{X}\theta\|^2.$$
2. *Score* : d'où l'on tire
$$\nabla_\theta\ell_n(\theta;Y_1,\dots,Y_n)=\frac{1}{\sigma^2}\mathbf{X}^T(\mathbf{Y}-\mathbf{X}\theta).$$
3. *Information = covariance du score* (Poly ch.3, Déf. 1.8), en sortant les matrices déterministes de l'espérance et en utilisant $\mathbb{E}_\theta[(\mathbf{Y}-\mathbf{X}\theta)(\mathbf{Y}-\mathbf{X}\theta)^T]=\sigma^2\mathrm{I}_n$ (les $Y_i$ sont **indépendantes** de variance $\sigma^2$) :
$$\begin{aligned}\mathbb{I}(\beta_1,\beta_2)&=\mathbb{E}_\theta\big[\nabla_\theta\ell_n(\theta;Y_1,\dots,Y_n)\,\nabla_\theta\ell_n^T(\theta;Y_1,\dots,Y_n)\big]\\&=\sigma^{-4}\mathbf{X}^T\mathbb{E}_\theta\big[(\mathbf{Y}-\mathbf{X}\theta)(\mathbf{Y}-\mathbf{X}\theta)^T\big]\mathbf{X}\\&=\sigma^{-2}\mathbf{X}^T\mathbf{X}=n\sigma^{-2}\begin{bmatrix}1&n^{-1}\sum_{i=1}^nx_i\\ n^{-1}\sum_{i=1}^nx_i&n^{-1}\|\mathbf{x}\|^2\end{bmatrix}.\end{aligned}$$
4. *Remarque du corrigé (en italique)* : « L'autre façon de calculer la matrice d'information de Fisher serait d'utiliser la formule avec la Hessienne mais comme on va le faire dans la 3ème question, on utilise cette formule de l'information de Fisher ici. » *[Extracteur]* La hessienne vaut $-\mathbf{X}^T\mathbf{X}/\sigma^2$ (constante), d'où le même résultat par $\mathbb{I}=-\mathbb{E}_\theta[\mathrm{H}_{\ell}]$ (Poly ch.3, Prop. 1.2 (ii)).

**Q2. Borne pour $\beta_1$ (modèle complet).** On pose $g(\theta)=\beta_1$. Donc $\nabla_\theta g(\theta)=(1,0)^T$. Le modèle étant **régulier**, tout estimateur sans biais régulier de $g:\theta\mapsto g(\theta)=\beta_1$ a une variance bornée inférieurement par la **borne de Cramér-Rao** (Poly ch.3, Th. 1.1), borne qui s'écrit alors
$$\nabla_\theta g(\theta)^T\mathbb{I}^{-1}(\beta_1,\beta_2)\nabla_\theta g(\theta)=\sigma^2\frac{\|\mathbf{x}\|^2}{n\|\mathbf{x}\|^2-(\sum_{i=1}^nx_i)^2}=\frac{\sigma^2}{n}\,\frac{\|\mathbf{x}\|^2}{\|\mathbf{x}\|^2-n(n^{-1}\sum_{i=1}^nx_i)^2}.$$
Observons que cette borne est minorée par $\sigma^2/n$ (voir question suivante).
- *[Extracteur] Justifications* : c'est le coefficient $[\mathbb{I}^{-1}]_{11}$ (inverse de matrice $2\times2$ explicitée en Q4) ; le déterminant $n\|\mathbf{x}\|^2-(\sum_ix_i)^2=n\sum_i(x_i-\bar x)^2$ est $>0$ car les $x_i$ ne sont pas tous égaux (d'où l'hypothèse $x_i\ne x_j$) : $\mathbb{I}$ est inversible. La minoration par $\sigma^2/n$ vient de $\|\mathbf{x}\|^2\ge\|\mathbf{x}\|^2-n\bar x^2>0$. La régularité du modèle est affirmée, non vérifiée dans le corrigé.

**Q3. Borne pour $\beta_1$ quand $\beta_2$ est connu.** On se place maintenant dans le cas où $\theta=\beta_1$, la valeur de $\beta_2$ étant supposée connue. Alors, la log-vraisemblance s'écrit :
$$\tilde\ell_n(\beta_1;Y_1,\dots,Y_n)=-\frac n2\log(2\pi\sigma^2)-\frac{1}{2\sigma^2}\sum_{i=1}^n(Y_i-\beta_1-\beta_2x_i)^2.$$
On dérive ensuite deux fois par rapport à $\beta_1$ (formule de l'information par la dérivée seconde, Poly ch.3, Prop. 1.2 (ii)). On en déduit
$$\tilde{\mathbb{I}}(\beta_1)=\mathbb{E}_\theta\Big[-\frac{\partial^2\tilde\ell_n(\beta_1;Y_1,\dots,Y_n)}{\partial\beta_1^2}\Big]=\frac{n}{\sigma^2}.$$
On en tire que la borne inférieure d'un estimateur sans biais régulier de $\beta_1$ est $\tilde{\mathbb{I}}(\beta_1)^{-1}=\sigma^2/n$ (Poly ch.3, Cor. 1.1).

*Commentaire du corrigé* : on constate que la borne trouvée ici est inférieure à celle trouvée à la question 2. En effet, dans cette question la classe des estimateurs sans biais de $\beta_1$ est plus grande (car on peut utiliser la valeur de $\beta_2$, supposée connue, pour construire notre estimateur sans biais de $\beta_1$). Il est donc normal d'être capable d'avoir une meilleure précision sur $\beta_1$ que si on se restreint à des estimateurs n'utilisant pas la valeur de $\beta_2$.
- *[Extracteur]* Égalité des deux bornes ssi $\bar x=0$ (cas où $\mathbb{I}$ est diagonale : les deux coefficients sont « découplés »). Noter que $\tilde{\mathbb{I}}(\beta_1)=n/\sigma^2=[\mathbb{I}(\beta_1,\beta_2)]_{11}$ : la borne de Q3 est $1/\mathbb{I}_{11}$, celle de Q2 est $[\mathbb{I}^{-1}]_{11}\ge1/\mathbb{I}_{11}$.

**Q4. Borne pour $\beta_1\beta_2$.** Pour cette dernière question, on pose cette fois $g(\theta)=\beta_1\beta_2$ de sorte que $\nabla_\theta g(\theta)=(\beta_2,\beta_1)^T$. En inversant la matrice d'information de Fisher de la question 1 (inverse d'une matrice $2\times2$ : comatrice transposée sur déterminant), il vient
$$\mathbb{I}^{-1}(\beta_1,\beta_2)=\frac{\sigma^2}{n\|\mathbf{x}\|^2-(\sum_{i=1}^nx_i)^2}\begin{pmatrix}\|\mathbf{x}\|^2&-\sum_{i=1}^nx_i\\-\sum_{i=1}^nx_i&n\end{pmatrix}$$
ce qui donne une borne inférieure pour la variance de tout estimateur sans biais (régulier) de $g$ qui est (Poly ch.3, Th. 1.1) :
$$\nabla_\theta g(\theta)^T\mathbb{I}^{-1}(\beta_1,\beta_2)\nabla_\theta g(\theta)=\frac{\sigma^2}{n\|\mathbf{x}\|^2-(\sum_{i=1}^nx_i)^2}\Big(\beta_2^2\|\mathbf{x}\|^2-2\beta_1\beta_2\sum_{i=1}^nx_i+n\beta_1^2\Big).$$

**Méthodes mobilisées**
- Log-vraisemblance d'un **vecteur gaussien** / densité produit ; écriture matricielle $\|\mathbf{Y}-\mathbf{X}\theta\|^2$.
- **Score vectoriel** (gradient) et **information de Fisher = $\mathbb{E}[\nabla\ell\,\nabla\ell^T]$** ; alternative par la **hessienne** (dérivée seconde, utilisée en Q3).
- **Inversion d'une matrice $2\times2$**.
- **Borne de Cramér-Rao** générale $\nabla g^T\mathbb{I}^{-1}\nabla g$ (Poly ch.3, Th. 1.1) avec $g$ linéaire (Q2) puis non linéaire (Q4) ; forme scalaire (Cor. 1.1) en Q3.
- Comparaison **modèle / sous-modèle** (paramètre de nuisance connu).

**Pièges relevés / remarques du corrigé**
- Pour $\beta_1$ dans le modèle complet, la borne est $[\mathbb{I}^{-1}]_{11}$ et **non** $1/[\mathbb{I}]_{11}=\sigma^2/n$ (qui est la borne quand $\beta_2$ est connu).
- La borne de Q3 est plus petite car la classe des estimateurs admissibles pour le problème (ceux qui peuvent utiliser $\beta_2$) est plus grande.
- L'information est celle du **$n$-échantillon** (non i.i.d. ici : lois $\mathrm{N}(\beta_1+\beta_2x_i,\sigma^2)$ différentes) : pas de factorisation $n\mathbb{I}_1$.
- L'hypothèse « $x_i\ne x_j$ pour deux indices » garantit l'inversibilité de $\mathbf{X}^T\mathbf{X}$.
- La borne de Q4 dépend de $(\beta_1,\beta_2)$ (inconnus) : c'est une fonction du paramètre.

**Résultats numériques** *[Extracteur — exemple illustratif, non dans le corrigé]*
Pour $n=3$, $\mathbf{x}=(0,1,2)^T$, $\sigma^2=1$ : $\sum x_i=3$, $\|\mathbf{x}\|^2=5$, $n\|\mathbf{x}\|^2-(\sum x_i)^2=6$ ; $\mathbb{I}=\begin{pmatrix}3&3\\3&5\end{pmatrix}$, $\mathbb{I}^{-1}=\frac16\begin{pmatrix}5&-3\\-3&3\end{pmatrix}$ ; borne Q2 : $5/6\approx0{,}833$ ; borne Q3 : $1/3$ ; borne Q4 en $(\beta_1,\beta_2)=(1,1)$ : $\frac16(5-6+3)=1/3$.

---

### Exercice 3 — Une borne de type Cramér-Rao sans régularité (⋆⋆⋆)

**Source :** Énoncé PC3, p. 2–3 ; Corrigé PC3, p. 10–12 (= Poly ch.3, §3.2, Exercice 3).

**Énoncé complet**

Soit $\Theta\subset\mathbb{R}$ et $(\mathsf{Z},\mathcal{Z},\{p_\theta\cdot\mu\ :\ \theta\in\Theta\})$ un modèle statistique dominé. Soit $T$ un estimateur sans biais de la fonction $g:\Theta\to\mathbb{R}$ telle que pour tout $\theta\in\Theta$, $\mathbb{E}_\theta[T^2(Z)]<\infty$.

1. Montrer que pour toute fonction $\Psi:\mathsf{Z}\to\mathbb{R}$ mesurable telle que $0<\mathrm{Var}_\theta[\Psi(Z)]<\infty$, on a
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\{\mathrm{Cov}_\theta(T(Z),\Psi(Z))\}^2}{\mathrm{Var}_\theta(\Psi(Z))}.$$

Dans la suite, on fixe $\theta,\delta$ tels que $\theta\in\Theta$ et $\theta-\delta\in\Theta$. On suppose que
$$\{z\in\mathsf{Z}:p_\theta(z)=0\}\subseteq\{z\in\mathsf{Z}:p_{\theta-\delta}(z)=0\}.$$

2. On considère la fonction $\Psi$ donnée par
$$\Psi(z):=\begin{cases}\dfrac{p_{\theta-\delta}(z)}{p_\theta(z)}-1&\text{si }p_\theta(z)>0,\\[2mm]0&\text{sinon.}\end{cases}$$
Montrer que $\mathbb{E}_\theta[\Psi(Z)]=0$ et que $\mathrm{Cov}_\theta(T(Z),\Psi(Z))=g(\theta-\delta)-g(\theta)$.
3. En déduire une borne sur la variance des estimateurs sans biais de $g:\theta\mapsto g(\theta)$.
4. Proposer des conditions pour déduire la borne de Cramér-Rao de cette inégalité.

On suppose maintenant que $Z=(X_1,\dots,X_n)$ est un $n$-échantillon du modèle
$$\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathrm{Unif}([0,\theta])\ :\ \theta\in\Theta=\mathbb{R}_+^*\}\big).$$
Observer que ce modèle n'est pas régulier. Nous considérons la fonction $g(\theta)=\theta$.

5. Montrer que pour tout $\delta\in\,]0,\theta[$, nous avons pour tout estimateur sans biais $T$ de $\theta$
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\delta^2}{(\theta^n/(\theta-\delta)^n)-1}.$$
6. Soit $0<c\le n$. En posant $\delta=c\theta/n$, montrer que la borne inférieure peut s'écrire sous la forme $\theta^2\tau_n(c)/n^2$ pour une quantité $\tau_n(c)$ telle que $\lim_{n\to\infty}\tau_n(c)$ existe. Conclure. *Voir la figure 2.*

*Figure 2 (énoncé, légende « Exercice 2 » [sic] ; = Figure 4 du corrigé, légende « Exercice 3 ») :* (gauche) tracé de $c\mapsto\tau_n(c)$ pour différentes valeurs de $n$ ($n=5,10,20$) et tracé de $c\mapsto\lim_n\tau_n(c)$ ($n\to\infty$), pour $c\in[0,5]$ ; (droite) tracé de $c\mapsto n/((n+2)\tau_n(c))$, ratio de l'EQM de $\widehat{\theta}_n^{(2)}$ et du minorant de l'EQM des estimateurs sans biais ($n=10,30,50,500$, $c\in[0,4]$).

**Corrigé complet question par question**

**Q1. Inégalité de covariance.** Par **Cauchy-Schwarz** (Poly ch.3, Prop. 2.1) appliqué aux variables centrées $T(Z)-\mathbb{E}_\theta[T(Z)]$ et $\Psi(Z)-\mathbb{E}_\theta[\Psi(Z)]$ :
$$\begin{aligned}\{\mathrm{Cov}_\theta(T(Z),\Psi(Z))\}^2&=\mathbb{E}_\theta^2\big[(T(Z)-\mathbb{E}_\theta[T(Z)])(\Psi(Z)-\mathbb{E}_\theta[\Psi(Z)])\big]\\&\le\mathbb{E}_\theta\big[(T(Z)-\mathbb{E}_\theta[T(Z)])^2\big]\,\mathbb{E}_\theta\big[(\Psi(Z)-\mathbb{E}_\theta[\Psi(Z)])^2\big]=\mathrm{Var}_\theta(T(Z))\,\mathrm{Var}_\theta(\Psi(Z)).\end{aligned}$$
On conclut (en divisant) en observant que $0<\mathrm{Var}_\theta(\Psi(Z))<\infty$ par hypothèses.

**Q2. Centrage de $\Psi$ et covariance.** Pour tout $\alpha\in\Theta$, posons $A_\alpha:=\{z\in\mathsf{Z};p_\alpha(z)>0\}$. D'après l'énoncé (hypothèse d'inclusion des zéros, passée au complémentaire), on a $A_{\theta-\delta}\subset A_\theta$.
1. *Espérance* (définition de $\Psi$, puis simplification par $p_\theta>0$ sur $A_\theta$) :
$$\begin{aligned}\mathbb{E}_\theta[\Psi(Z)]&=\int\Big(\frac{p_{\theta-\delta}(z)}{p_\theta(z)}-1\Big)\mathbb{1}_{A_\theta}(z)p_\theta(z)\mu(\mathrm{d}z)=\int[p_{\theta-\delta}(z)-p_\theta(z)]\mathbb{1}_{A_\theta}(z)\mu(\mathrm{d}z)\\&=\int p_{\theta-\delta}(z)\mathbb{1}_{A_{\theta-\delta}}(z)\mu(\mathrm{d}z)-\int p_\theta(z)\mathbb{1}_{A_\theta}(z)\mu(\mathrm{d}z)=1-1=0.\end{aligned}$$
Dans l'avant-dernière égalité, on a utilisé le fait que par définition de $A_\theta$ (et l'inclusion $A_{\theta-\delta}\subset A_\theta$),
$$p_{\theta-\delta}\mathbb{1}_{A_\theta}=p_{\theta-\delta}\mathbb{1}_{A_{\theta-\delta}}.$$
La dernière égalité : $p_\alpha$ est une densité de probabilité, nulle hors de $A_\alpha$.
2. *Covariance.* Par suite ($\Psi$ centrée, donc $\mathrm{Cov}_\theta(T,\Psi)=\mathbb{E}_\theta[T\Psi]$),
$$\begin{aligned}\mathrm{Cov}_\theta(T(Z),\Psi(Z))=\mathbb{E}_\theta[T(Z)\Psi(Z)]&=\int T(z)\Big(\frac{p_{\theta-\delta}(z)}{p_\theta(z)}-1\Big)\mathbb{1}_{A_\theta}(z)p_\theta(z)\mu(\mathrm{d}z)\\&=\int T(z)\big[p_{\theta-\delta}(z)\mathbb{1}_{A_{\theta-\delta}}(z)-p_\theta(z)\mathbb{1}_{A_\theta}(z)\big]\mu(\mathrm{d}z)=g(\theta-\delta)-g(\theta),\end{aligned}$$
la dernière égalité parce que $T$ est **sans biais sous $\mathbb{P}_{\theta-\delta}$ et sous $\mathbb{P}_\theta$** ($\theta-\delta\in\Theta$).

**Q3. Borne.** En combinant les deux dernières questions (et $\mathrm{Var}_\theta(\Psi(Z))=\mathbb{E}_\theta[\Psi(Z)^2]$ puisque $\Psi$ est centrée), il vient
$$\mathrm{Var}_\theta(T(Z))\ge\frac{(g(\theta-\delta)-g(\theta))^2}{\displaystyle\int_{A_\theta}\Big(\frac{p_{\theta-\delta}(z)}{p_\theta(z)}-1\Big)^2p_\theta(z)\mu(\mathrm{d}z)}=\frac{(g(\theta)-g(\theta-\delta))^2}{\displaystyle\int_{A_\theta}\Big(1-\frac{p_{\theta-\delta}(z)}{p_\theta(z)}\Big)^2p_\theta(z)\mu(\mathrm{d}z)}.$$
- *[Extracteur]* La borne vaut pour tout $\delta$ admissible ; on peut prendre le $\sup$ en $\delta$. Le dénominateur est la divergence du $\chi^2$ de $\mathbb{P}_{\theta-\delta}$ par rapport à $\mathbb{P}_\theta$ ; cette borne est connue sous le nom de borne de Hammersley–Chapman–Robbins (nom **non cité** dans le poly ni dans le corrigé). La condition $0<\mathrm{Var}_\theta(\Psi(Z))<\infty$ de Q1 exige $\mathbb{P}_{\theta-\delta}\ne\mathbb{P}_\theta$ et $\int_{A_\theta}p_{\theta-\delta}^2/p_\theta\,\mathrm{d}\mu<\infty$ ; le corrigé ne la discute pas.

**Q4. Retrouver Cramér-Rao.** On a (en divisant numérateur et dénominateur par $\delta^2$, et $(1-p_{\theta-\delta}/p_\theta)^2p_\theta=(p_\theta-p_{\theta-\delta})^2/p_\theta$)
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\Big(\frac{g(\theta)-g(\theta-\delta)}{\delta}\Big)^2}{\displaystyle\int_{A_\theta}\Big(\frac{p_\theta(z)-p_{\theta-\delta}(z)}{\delta}\Big)^2\frac{1}{p_\theta(z)}\mu(\mathrm{d}z)}.$$
Pour pouvoir retrouver la borne de Cramér-Rao, il faudrait pouvoir passer à la limite dans le membre de droite en faisant tendre $\delta$ vers $0$ :
1. ce qui nécessite déjà que $\theta-\delta\in\Theta$ pour tout $\delta$ suffisamment petit ;
2. il faut ensuite que $g$ soit **dérivable** en $\theta$ (le numérateur tend alors vers $(g'(\theta))^2$) ;
3. et enfin que l'on puisse **permuter limite et intégrale** dans le dénominateur du membre de droite.

Si toutes ces conditions sont remplies, on obtient alors :
$$\mathrm{Var}_\theta(T(Z))\ge(g'(\theta))^2/\mathbb{I}(\theta)\quad\text{avec}\quad\mathbb{I}(\theta)=\mathbb{E}_\theta\Big[\Big(\frac{\partial\log p_\theta(Z)}{\partial\theta}\Big)^2\Big]$$
qui est bien la borne de Cramér-Rao (en dimension 1) (Poly ch.3, Cor. 1.1).
- *[Extracteur]* Ces conditions sont réunies sous la Déf. 1.6 du poly (modèle régulier) : $\Theta$ ouvert ; $\theta\mapsto p_\theta(z)$ dérivable, donc $(p_\theta(z)-p_{\theta-\delta}(z))/\delta\to\partial_\theta p_\theta(z)$ ; dominations locales permettant la **convergence dominée** (Prop. 2.2) ; et $\int(\partial_\theta p_\theta)^2/p_\theta\,\mathrm{d}\mu=\mathbb{E}_\theta[(\partial_\theta\log p_\theta(Z))^2]$. Remarquer que la borne de l'Exercice 3 n'exige **pas** que $T$ soit régulier (Déf. 1.9), seulement de carré intégrable et sans biais.

**Q5. Application au modèle uniforme.** Posons $z=(x_1,\cdots,x_n)$. Nous nous plaçons maintenant dans le cas particulier $g(\theta)=\theta$,
$$p_\theta(z)=\theta^{-n}\prod_{i=1}^n\mathbb{1}_{[0,\theta]}(x_i);$$
et $\mu$ est la mesure de Lebesgue sur $\mathbb{R}^n$.
1. *Hypothèse d'inclusion.* On vérifie que si $\delta\in\,]0,\theta[$, alors $p_\theta(z)=0$ implique $p_{\theta-\delta}(z)=0$ (si un $x_i\notin[0,\theta]$, a fortiori $x_i\notin[0,\theta-\delta]$). Ceci permet d'appliquer la borne obtenue en question 3 (numérateur $(\theta-(\theta-\delta))^2=\delta^2$) :
$$\mathrm{Var}_\theta(T(Z))\ge\frac{\delta^2}{\displaystyle\int_{A_\theta}\Big(\frac{p_{\theta-\delta}(z)}{p_\theta(z)}-1\Big)^2p_\theta(z)\,\mathrm{d}z};\qquad A_\theta=[0,\theta]^n.$$
2. *Travaillons le dénominateur* (développement du carré ; $\int_{A_\theta}\frac{p_{\theta-\delta}}{p_\theta}p_\theta\,\mathrm{d}z=\int p_{\theta-\delta}=1$ et $\int_{A_\theta}p_\theta=1$ ; sur $A_\theta$, $1/p_\theta=\theta^n$ ; puis $p_{\theta-\delta}=(\theta-\delta)^{-n}$ sur $[0,\theta-\delta]^n$ et $0$ ailleurs) :
$$\begin{aligned}\int_{A_\theta}\Big(\frac{p_{\theta-\delta}(z)}{p_\theta(z)}-1\Big)^2p_\theta(z)\,\mathrm{d}z&=\int_{A_\theta}\Big(\frac{p_{\theta-\delta}(z)}{p_\theta(z)}\Big)^2p_\theta(z)\mu(\mathrm{d}z)+1-2\int_{A_\theta}\frac{p_{\theta-\delta}(z)}{p_\theta(z)}p_\theta(z)\,\mathrm{d}z\\&=\frac{1}{\theta^n}\int_{[0,\theta]^n}\big(\theta^n\,p_{\theta-\delta}(z)\big)^2\,\mathrm{d}z-1\\&=\frac{1}{\theta^n}\int_{[0,\theta-\delta]^n}\Big(\frac{\theta^n}{(\theta-\delta)^n}\Big)^2\,\mathrm{d}z-1\\&=\frac{\theta^n}{(\theta-\delta)^n}-1.\end{aligned}$$
D'où la borne annoncée.
- *[Extracteur]* Dernière égalité : $\frac{1}{\theta^n}\cdot\frac{\theta^{2n}}{(\theta-\delta)^{2n}}\cdot(\theta-\delta)^n=\frac{\theta^n}{(\theta-\delta)^n}$ (volume du pavé $[0,\theta-\delta]^n$).

**Q6. Choix $\delta=c\theta/n$ et conclusion.** On pose maintenant $\delta=c\theta/n$ avec $0<c<n$. Alors le dénominateur vaut
$$\Big(1-\frac cn\Big)^{-n}-1;$$
et donc (numérateur $\delta^2=c^2\theta^2/n^2$) $\mathrm{Var}_\theta(T(Z))\ge\tau_n(c)\theta^2/n^2$ avec
$$\tau_n(c)=\frac{c^2}{(1-c/n)^{-n}-1}\xrightarrow[n\to\infty]{}\frac{c^2}{\exp(c)-1}=c\Big(\frac{\exp(c)-1}{c}\Big)^{-1}$$
(car $(1-c/n)^{-n}\to e^c$).

La figure montre l'évolution de $c\mapsto\tau_n(c)$ pour différentes valeurs de $n$, ainsi que l'évolution de $c\mapsto\lim_n\tau_n(c)$. On vient de montrer que dans la classe des estimateurs sans biais de $\theta$ (dans un modèle statistique non régulier, pour l'estimation du support de lois uniformes), le risque quadratique moyen est minoré par
$$\frac{\theta^2}{n^2}\tau_n(c),\qquad\forall\,0<c<n.$$
On en déduit que l'EQM est minoré par
$$\frac{\theta^2}{n^2}\sup_{c\in]0,n[}\tau_n(c).$$
Asymptotiquement, une borne inférieure sur l'EQM des estimateurs sans biais se comporte comme $\theta^2/n^2$. On notera la vitesse en $O(1/n^2)$.

On a établi dans l'exercice 1 que l'estimateur sans biais $\widehat{\theta}_n^{(2)}=(n+1)X_{n:n}/n$ avait un risque quadratique moyen valant
$$\frac{\theta^2}{n^2}\,\frac{n}{n+2}$$
et qu'il était inadmissible. Asymptotiquement, son EQM est équivalent à $\theta^2/n^2$.
- *[Extracteur]* (i) Pour un estimateur sans biais, EQM = variance (Prop. 1.1), d'où « l'EQM est minoré ». (ii) La borne et le risque de $\widehat{\theta}_n^{(2)}$ ont le **même ordre** $\theta^2/n^2$ : la vitesse $n^{-2}$ est la bonne pour les estimateurs sans biais dans ce modèle, ce qui « explique » le dépassement apparent de Cramér-Rao (Poly ch.3, Ex. 1.16). (iii) Le ratio tracé à droite, $\frac{\theta^2n/(n^2(n+2))}{\theta^2\tau_n(c)/n^2}=\frac{n}{(n+2)\tau_n(c)}$, reste supérieur à $1$, minimal vers $c\approx1{,}5$ avec une valeur $\approx1{,}5$ : l'écart n'est que d'une constante.

**Méthodes mobilisées**
- **Inégalité de Cauchy-Schwarz** en version covariance (Poly ch.3, Prop. 2.1).
- Choix d'une **fonction test** $\Psi$ = rapport de vraisemblance centré $p_{\theta-\delta}/p_\theta-1$ ; manipulation des **supports** $A_\alpha$.
- **Absence de biais sous deux lois** ($\mathbb{P}_\theta$ et $\mathbb{P}_{\theta-\delta}$).
- **Passage à la limite** $\delta\to0$ : dérivabilité de $g$, interversion limite/intégrale (convergence dominée, Prop. 2.2) → Cramér-Rao (Cor. 1.1).
- Calcul d'intégrales sur des **pavés** (densité produit de l'uniforme).
- Limite usuelle $(1-c/n)^{-n}\to e^c$ ; **optimisation d'une borne** en un paramètre libre ($\sup_c$).

**Pièges relevés / remarques du corrigé**
- L'hypothèse d'**inclusion des supports** est indispensable (sinon $\Psi$ ne capture pas toute la masse de $\mathbb{P}_{\theta-\delta}$) ; dans l'uniforme elle impose $\delta>0$ (on regarde $\theta-\delta<\theta$).
- La borne de Q3 ne demande **aucune régularité** du modèle ni de l'estimateur : c'est ce qui permet de traiter l'uniforme, où Cramér-Rao ne s'applique pas (modèle non régulier, Poly ch.3, Ex. 1.12).
- Le corrigé utilise $0<c<n$ (l'énoncé écrit $0<c\le n$) : $c=n$ donnerait $\delta=\theta$, hors de $]0,\theta[$, et un dénominateur infini.
- Vitesse $O(1/n^2)$ (et non $1/n$) pour l'uniforme : ce n'est pas une contradiction avec Cramér-Rao.
- Coquilles de numérotation des figures (voir §0.4).

**Résultats numériques** *[Extracteur — calculés, cohérents avec la Figure 2]*
| $n$ | $\arg\max_c\tau_n(c)$ | $\sup_c\tau_n(c)$ | $\min_c\ n/((n+2)\tau_n(c))$ |
|---|---|---|---|
| $5$ | $\approx1{,}11$ | $\approx0{,}491$ | $\approx1{,}45$ |
| $10$ | $\approx1{,}31$ | $\approx0{,}559$ | $\approx1{,}49$ |
| $20$ | $\approx1{,}44$ | $\approx0{,}600$ | $\approx1{,}52$ |
| $500$ | $\approx1{,}59$ | $\approx0{,}646$ | $\approx1{,}54$ |
| $\infty$ ($c^2/(e^c-1)$) | $\approx1{,}594$ | $\approx0{,}648$ | $\approx1{,}544$ |

Le maximiseur limite vérifie $2(1-e^{-c})=c$. Exemple de borne : $n=10$, $\theta=1$, $c=1$ : $\tau_{10}(1)=1/((0{,}9)^{-10}-1)\approx1/(2{,}868-1)\approx0{,}535$, borne $\approx0{,}00535$, contre $\mathrm{Var}(\widehat{\theta}_{10}^{(2)})=1/120\approx0{,}00833$.

---

### Exercice 4 — Estimateurs linéaires dans un modèle de translation (⋆)

**Source :** Énoncé PC3, p. 2–3 ; Corrigé PC3, p. 13–15 (= Poly ch.3, §3.3, Exercice 4, bonus).

**Énoncé complet**

Soit $q$ une densité sur $\mathbb{R}$ par rapport à la mesure de Lebesgue vérifiant
$$\int x\,q(x)\,\mathrm{d}x=0,\qquad\int x^2\,q(x)\,\mathrm{d}x=1.$$
Soit $(X_1,\dots,X_n)$ un $n$-échantillon du modèle statistique
$$(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta\cdot\mathrm{Leb},\theta\in\mathbb{R}\})$$
où $p_\theta$ est un modèle de translation
$$x\mapsto p_\theta(x)=\frac1\sigma q\Big(\frac{x-\theta}{\sigma}\Big);$$
le facteur d'échelle $\sigma>0$ est supposé connu. Pour tout $\underline{a}_n=(a_{1,n},\cdots,a_{n,n})\in\mathbb{R}^n$, on considère la classe des estimateurs linéaires, i.e. des estimateurs qui sont des combinaisons linéaires des échantillons,
$$\hat\theta_n(\underline{a}_n):=\sum_{i=1}^na_{i,n}X_i.$$

1. Déterminer l'estimateur de $\theta$ de risque quadratique minimal dans la classe des estimateurs $\{\hat\theta_n(\underline{a}_n),\underline{a}_n\in\mathbb{R}^n\}$ et sans biais.
2. Calculer une borne inférieure du risque quadratique dans la classe des estimateurs linéaires $(\hat\theta_n(\underline{a}_n),\underline{a}_n\in\mathbb{R}^n)$.

**Corrigé complet question par question**

*Préliminaires.* Dans la suite, on omet la dépendance en $n$ de $\underline{a}$. Observons (note 1 du corrigé : « voir PC1 ») que sous $p_\theta\mathrm{Leb}$, $X_k$ a même loi que $\theta+\sigma Y_k$ où $Y_k\sim q$. On en déduit (moments de $q$ : moyenne $0$, variance $1$) que
$$\mathbb{E}_\theta[X_k]=\theta,\qquad\mathrm{Var}_\theta(X_k)=\sigma^2.$$
Calculons l'espérance et la variance de l'estimateur (linéarité de l'espérance ; variance d'une somme de v.a. **indépendantes**) :
$$\mathbb{E}_\theta\big[\hat\theta_n(\underline{a})\big]=\theta\Big(\sum_{k=1}^na_k\Big),\qquad\mathrm{Var}_\theta(\hat\theta_n(\underline{a}))=\sigma^2\Big(\sum_{k=1}^na_k^2\Big).$$

**Q1. Meilleur estimateur linéaire sans biais.** Par suite (décomposition biais-variance, Poly ch.3, Prop. 1.1), le risque quadratique est donné par
$$R(\hat\theta_n(\underline{a}),\theta)=\theta^2\Big(\sum_{k=1}^na_k-1\Big)^2+\sigma^2\Big(\sum_{k=1}^na_k^2\Big).$$
Comme il est sans biais (i.e. $\theta\sum_ka_k=\theta$ pour tout $\theta\in\mathbb{R}$, soit $\sum_ka_k=1$), on veut minimiser
$$\underline{a}\mapsto\sigma^2\Big(\sum_{k=1}^na_k^2\Big)\qquad\text{sous la contrainte}\quad\sum_{k=1}^na_k=1.$$

*Solution 1 (Cauchy-Schwarz).* Par Cauchy-Schwarz, et en utilisant la contrainte, on a
$$\frac1n\sum_{k=1}^na_k^2\ge\Big|\frac1n\sum_{k=1}^na_k\Big|^2=\frac{1}{n^2}.$$
Le minorant est indépendant de $\underline{a}$ et la borne inférieure est atteinte avec $a_k=1/n$ pour tout $k$. Ainsi, l'estimateur sans biais de risque quadratique minimal est
$$\hat\theta_n(1/n,\cdots,1/n)=\frac1n\sum_{k=1}^nX_k.$$

*Solution 2 (multiplicateurs de Lagrange).* On résout le problème de minimisation sous contraintes par la méthode des multiplicateurs de Lagrange (note 2, voir §0.2). Soit $\lambda\in\mathbb{R}$ : on veut minimiser sur $\mathbb{R}^n$
$$\underline{a}\mapsto\sum_{k=1}^na_k^2+\lambda\Big(\sum_{k=1}^na_k-1\Big)=\text{objectif}+\lambda\times\ \text{contrainte}.$$
Le gradient est nul ssi
$$\forall i\in\{1,\cdots,n\}:\qquad2a_i+\lambda=0.$$
Cela donne $a_i=-\lambda/2$ pour tout $i$. On utilise la contrainte pour déterminer $\lambda$ : la contrainte $\sum_{k=1}^na_k=1$ entraîne $-n\lambda/2=1$ soit $\lambda=-2/n$. Donc la solution est le vecteur constant $\underline{a}=(1/n,\cdots,1/n)$.
- *[Extracteur]* Risque minimal correspondant : $\sigma^2/n$. C'est le résultat de l'Ex. 1.11 du Poly ch.3 (la moyenne empirique est le meilleur estimateur linéaire sans biais de l'espérance). Cas d'égalité de Cauchy-Schwarz : $\underline{a}$ colinéaire à $\mathbf{1}$.

**Q2. Borne inférieure dans toute la classe linéaire.** On veut minimiser
$$\underline{a}\mapsto\theta^2\Big(\sum_{k=1}^na_k-1\Big)^2+\sigma^2\Big(\sum_{k=1}^na_k^2\Big).$$
1. Pour tout $i$, la dérivée par rapport à $a_i$ est
$$2\theta^2\Big(\sum_{k=1}^na_k-1\Big)+2\sigma^2a_i\tag{4}$$
2. *[passage en bleu dans le corrigé]* **La racine du gradient est un minimum.** En effet, la dérivée seconde $\partial_{a_i,a_j}$ est
$$2\theta^2+2\sigma^2\mathbb{1}_{i=j}.$$
On en déduit que la matrice hessienne est $H=2\sigma^2I+2\theta^2\mathbb{1}\mathbb{1}^T$ ; ses valeurs propres sont strictement positives puisque
$$\lambda^TH\lambda=2\sigma^2\|\lambda\|^2+2\theta^2\Big(\sum_{k=1}^n\lambda_k\Big)^2\ge2\sigma^2\|\lambda\|^2.$$
Donc la fonction possède un unique minimum donné par la racine du gradient (fonction **strictement convexe**).
3. Cherchons la racine du gradient. En sommant en $i$ la relation (4) (égalée à $0$), la racine est solution de
$$n\theta^2\sum_{k=1}^na_k-n\theta^2+\sigma^2\sum_{k=1}^na_k=0$$
ce qui donne
$$\sum_{k=1}^na_k=\frac{n\theta^2}{\sigma^2+n\theta^2}.$$
4. En utilisant à nouveau (4), on obtient
$$a_i=\frac{\theta^2}{\sigma^2}\Big(1-\frac{n\theta^2}{\sigma^2+n\theta^2}\Big)=\frac{\theta^2}{\sigma^2+n\theta^2}.$$
5. Le minimum du risque est atteint en
$$\underline{a}=\Big(\frac{\theta^2}{\sigma^2+n\theta^2},\cdots,\frac{\theta^2}{\sigma^2+n\theta^2}\Big)=\frac{\theta^2}{\theta^2+\sigma^2/n}\Big(\frac1n,\cdots,\frac1n\Big);\tag{5}$$
de sorte que le risque est minoré par
$$R(\hat\theta_n(\underline{a}),\theta)\ge\frac{\sigma^2\theta^2}{\sigma^2+n\theta^2}.$$
- *[Extracteur] Calcul de la valeur minimale* : avec $S:=\sum_ka_k=\frac{n\theta^2}{\sigma^2+n\theta^2}$, on a $S-1=-\frac{\sigma^2}{\sigma^2+n\theta^2}$ et $\sum_ka_k^2=\frac{n\theta^4}{(\sigma^2+n\theta^2)^2}$, d'où $\theta^2\frac{\sigma^4}{(\sigma^2+n\theta^2)^2}+\sigma^2\frac{n\theta^4}{(\sigma^2+n\theta^2)^2}=\frac{\sigma^2\theta^2(\sigma^2+n\theta^2)}{(\sigma^2+n\theta^2)^2}=\frac{\sigma^2\theta^2}{\sigma^2+n\theta^2}$.

▶ *Remarque du corrigé.* Notons que
$$\frac{\sigma^2\theta^2}{\sigma^2+n\theta^2}=\frac{\sigma^2}{n}\Big(\frac{\theta^2}{\theta^2+\sigma^2/n}\Big)<\frac{\sigma^2}{n}$$
montrant que le risque quadratique optimal (puisqu'atteignable avec les poids donnés par (5)) dans la classe des estimateurs linéaires est plus faible que le risque quadratique optimal dans la classe (plus restreinte) des estimateurs linéaires sans biais. En toute logique !

**Méthodes mobilisées**
- Représentation **translation-échelle** $X_k\overset{d}{=}\theta+\sigma Y_k$ (PC 1).
- Espérance et variance d'une **combinaison linéaire de v.a. indépendantes**.
- **Décomposition biais-variance** (Poly ch.3, Prop. 1.1).
- Optimisation sous contrainte : **Cauchy-Schwarz** (Solution 1) ou **multiplicateurs de Lagrange** (Solution 2).
- Optimisation sans contrainte : **annulation du gradient** + **hessienne définie positive** (stricte convexité) ⇒ unique minimum ; astuce « sommer les équations ».
- Comparaison d'optima sur des **classes emboîtées**.

**Pièges relevés / remarques du corrigé**
- « Sans biais » doit valoir **pour tout $\theta$** : c'est ce qui donne la contrainte $\sum_ka_k=1$.
- Les poids optimaux (5) de Q2 **dépendent de $\theta$**, inconnu : ce n'est **pas** un estimateur utilisable, seulement une **borne inférieure** (d'où la formulation de l'énoncé) *[Extracteur : interprétation cohérente avec l'énoncé ; le corrigé insiste seulement sur « atteignable avec les poids (5) »]*.
- Le facteur $\frac{\theta^2}{\theta^2+\sigma^2/n}<1$ est un **rétrécissement** de la moyenne empirique vers $0$ (biais accepté contre une baisse de variance).
- Le corrigé note le risque $R(\hat\theta_n(\underline{a}),\theta)$ (ordre des arguments inversé par rapport au poly $R(\theta,T)$).
- Dans la hessienne, le vecteur test est noté $\lambda$ (même lettre que le multiplicateur de Lagrange).
- Le résultat ne dépend de $q$ que par ses deux premiers moments.

**Résultats numériques** *[Extracteur — exemple illustratif]*
$\sigma=1$, $n=10$ : risque optimal sans biais $\sigma^2/n=0{,}1$. Borne de Q2 : pour $\theta=1$, $\frac{1}{1+10}\approx0{,}0909$ (poids $1/11$ chacun) ; pour $\theta=0{,}5$, $\frac{0{,}25}{1+2{,}5}\approx0{,}0714$ (poids $0{,}25/3{,}5\approx0{,}0714$ chacun) ; pour $\theta\to0$, la borne tend vers $0$.

---

### Exercice 5 — Statistiques d'ordre d'un échantillon exponentiel et estimateurs L-linéaires (⋆⋆⋆)

**Source :** Énoncé PC3, p. 3–4 ; Corrigé PC3, p. 16–17 (= Poly ch.3, §3.3, Exercice 5, bonus).

**Énoncé complet**

Soit la densité exponentielle de paramètre $\theta>0$ :
$$x\mapsto f_\theta(x)=\theta^{-1}e^{-x/\theta}\mathbb{1}_{\mathbb{R}_+}(x),\qquad\theta\in\Theta:=\mathbb{R}_+^*.$$
Soit $(X_1,\dots,X_n)$ un $n$-échantillon du modèle statistique
$$(\mathbb{R},\mathcal{B}(\mathbb{R}),\{f_\theta\cdot\mathrm{Leb},\theta\in\Theta\}).$$
On note $X_{1:n}\le X_{2:n}\le\cdots\le X_{n:n}$ les statistiques d'ordre de l'échantillon ; et
$$p_\theta(y_1,\cdots,y_n):=\prod_{k=1}^nf_\theta(y_k).$$

1. Montrer que sous $p_\theta\cdot\mathrm{Leb}^{\otimes n}$, la loi jointe des statistiques d'ordre $X_{1:n},X_{2:n},\dots,X_{n:n}$ admet une densité par rapport à Leb, densité donnée par
$$(y_1,\cdots,y_n)\mapsto f_{1:n}(\theta;y_1,y_2,\dots,y_n):=n!\,p_\theta(y_1,\cdots,y_n)\,\mathbb{1}_{\{0\le y_1<y_2<\cdots<y_n\}}.$$

On considère la transformation
$$Z_1=nX_{1:n},\qquad Z_k=(n-k+1)(X_{k:n}-X_{(k-1):n}),\quad\forall k\ge2;\tag{1}$$
ou de façon équivalente
$$X_{k:n}=\sum_{j=1}^k\frac{Z_j}{n-j+1},\quad\forall k\ge1.$$
On remarquera que le jacobien de la transformation (1) est $n!$. On notera aussi que pour tout $x_i\in\mathbb{R}$,
$$\sum_{i=1}^nx_i=\sum_{i=1}^n(n-i+1)(x_i-x_{i-1}),\qquad\text{où, par convention }x_0=0.$$

2. Montrer que sous $p_\theta\cdot\mathrm{Leb}^{\otimes n}$, les v.a. $(Z_1,\dots,Z_n)$ sont des variables aléatoires i.i.d. de loi exponentielle de paramètre $\theta>0$.

Pour tout $\underline{a}_n=(a_{1,n},\cdots,a_{n,n})\in\mathbb{R}^n$, on considère l'estimateur donné par
$$\hat\theta_n(\underline{a}_n):=\sum_{i=1}^na_{i,n}X_{i:n}.$$

3. Montrer que
$$\hat\theta_n(\underline{a}_n)=\sum_{j=1}^nZ_jm_{j,n}\qquad\text{où}\quad m_{j,n}:=\frac{1}{n-j+1}\sum_{i=j}^na_{i,n}.$$
4. Calculer le biais et le risque quadratique de l'estimateur.
5. Déterminer les poids $\underline{a}_n$ de l'estimateur sans biais de risque quadratique minimal, dans la classe des estimateurs de la forme $(\hat\theta_n(\underline{a}_n),\underline{a}_n\in\mathbb{R}^n)$ [indication : on déterminera les poids $m_{j,n}$ puis les poids $a_{j,n}$].
6. Déterminer la valeur des poids $\underline{a}_n$ pour lequel le risque quadratique est minimal dans la classe des estimateurs de la forme $(\hat\theta_n(\underline{a}_n),\underline{a}_n\in\mathbb{R}^n)$.

**Corrigé complet question par question**

*Préliminaire.* Noter qu'avec cette convention sur la paramétrisation de la loi exponentielle, on a
$$\mathbb{E}_\theta[U]=\theta,\qquad\mathrm{Var}_\theta(U)=\theta^2,\qquad\text{où }U\sim f_\theta(\cdot)\cdot\mathrm{Leb}.\tag{6}$$

**Q1. Densité jointe des statistiques d'ordre.**
1. Soit $\tau=(\tau_1,\cdots,\tau_n)$ une permutation de $\{1,\cdots,n\}$. Puisque sous $p_\theta\cdot\mathrm{Leb}^{\otimes n}$, $(X_1,\cdots,X_n)$ sont **i.i.d.**, elles ont même loi que $(X_{\tau_1},\cdots,X_{\tau_n})$ et cette loi est donnée par
$$(y_1,\cdots,y_n)\mapsto\Big(\prod_{k=1}^nf_\theta(y_k)\Big)\mathrm{d}y_1\cdots\mathrm{d}y_n.$$
2. Puisque les v.a. $(X_k)_k$ ont des lois à densité par rapport à la mesure de Lebesgue, on a $\mathbb{P}_\theta(X_i=X_j)=0$ pour tout $i\ne j$. Par suite, il existe une unique permutation aléatoire $\sigma$ de $\{1,\cdots,n\}$ telle que
$$X_{k:n}=X_{\sigma_k},\qquad X_{\sigma_1}<X_{\sigma_2}<\cdots<X_{\sigma_n}\ \text{p.s.}$$
Notons $\mathcal{S}_n$ l'ensemble des permutations de $\{1,\cdots,n\}$, de cardinal $n!$.
3. On a pour toute fonction $h$ mesurable bornée (méthode de la **fonction muette** ; décomposition selon la valeur de $\sigma$)
$$\begin{aligned}\mathbb{E}_\theta[h(X_{1:n},\cdots,X_{n:n})]&=\mathbb{E}_\theta[h(X_{\sigma_1},\cdots,X_{\sigma_n})]\\&=\sum_{\tau\in\mathcal{S}_n}\mathbb{E}_\theta\big[h(X_{\tau_1},\cdots,X_{\tau_n})\,\mathbb{1}_{\sigma=\tau}\big]\\&=\sum_{\tau\in\mathcal{S}_n}\mathbb{E}_\theta\big[h(X_{\tau_1},\cdots,X_{\tau_n})\,\mathbb{1}_{X_{\tau_1}<X_{\tau_2}<\cdots<X_{\tau_n}}\big].\end{aligned}$$
4. On conclut en observant que l'espérance dans le terme de droite est indépendante de $\tau$ (même loi que $(X_1,\dots,X_n)$) et vaut
$$\mathbb{E}_\theta\big[h(X_{\tau_1},\cdots,X_{\tau_n})\,\mathbb{1}_{X_{\tau_1}<X_{\tau_2}<\cdots<X_{\tau_n}}\big]=\int_{y_1<\cdots<y_n}h(y_1,\cdots,y_n)\Big(\prod_{k=1}^nf_\theta(y_k)\Big)\mathrm{d}y_1\cdots\mathrm{d}y_n,$$
puis en utilisant le fait que $\sum_{\tau\in\mathcal{S}_n}1=n!$. *[Extracteur : on obtient $\mathbb{E}_\theta[h(X_{1:n},\dots,X_{n:n})]=\int h\,n!\,p_\theta\mathbb{1}_{\{y_1<\dots<y_n\}}$, et $\mathbb{1}_{\mathbb{R}_+}$ dans $f_\theta$ donne $0\le y_1$.]*

**Q2. Les espacements normalisés $Z_k$ sont i.i.d. exponentiels.** Soit $h$ mesurable positive.
$$\begin{aligned}\mathbb{E}_\theta[h(Z_1,\cdots,Z_n)]&=\mathbb{E}_\theta\big[h\big(nX_{1:n},(n-1)(X_{2:n}-X_{1:n}),\cdots,(X_{n:n}-X_{n-1:n})\big)\big]\\&=\frac{n!}{\theta^n}\int_{0\le y_1<\cdots<y_n}\exp\Big(-\theta^{-1}\sum_{k=1}^ny_k\Big)\,h\big(ny_1,(n-1)(y_2-y_1),\cdots,(y_n-y_{n-1})\big)\,\mathrm{d}y_1\cdots\mathrm{d}y_n\\&=\frac{1}{\theta^n}\int_{z_1>0,z_2>0,\cdots,z_n>0}\exp\Big(-\theta^{-1}\sum_{k=1}^n\sum_{j=1}^k(n-j+1)^{-1}z_j\Big)\,h(z_1,\cdots,z_n)\,\mathrm{d}z_1\cdots\mathrm{d}z_n,\end{aligned}$$
1. *1ʳᵉ égalité* : définition (1) des $Z_k$ ; *2ᵉ égalité* : densité $f_{1:n}$ de la Q1 avec $f_\theta(y)=\theta^{-1}e^{-y/\theta}$.
2. *3ᵉ égalité* : en faisant le **changement de variable** $z_i=(n-i+1)(y_i-y_{i-1})$, ce qui est équivalent à $y_i=\sum_{j=1}^iz_j(n-j+1)^{-1}$ ; le jacobien $n!$ (rappel de l'énoncé) compense le facteur $n!$ ; le domaine $\{0\le y_1<\dots<y_n\}$ devient $\{z_1\ge0,z_2>0,\dots,z_n>0\}$ (à un ensemble négligeable près).
3. *Simplification de l'exponentielle* (interversion des sommes) : on a
$$\sum_{k=1}^n\sum_{j=1}^k(n-j+1)^{-1}z_j=\sum_{k=1}^n\sum_{j=1}^n\mathbb{1}_{j\le k}\frac{z_j}{n-j+1}=\sum_{j=1}^n\frac{z_j}{n-j+1}(n-j+1)=\sum_{j=1}^nz_j,$$
(pour $j$ fixé, il y a $n-j+1$ indices $k\in\{j,\dots,n\}$), dont on déduit que
$$\mathbb{E}_\theta[h(Z_1,\cdots,Z_n)]=\frac{1}{\theta^n}\int_{z_1>0,\cdots,z_n>0}\exp\Big(-\theta^{-1}\sum_{j=1}^nz_j\Big)\,h(z_1,\cdots,z_n)\,\mathrm{d}z_1\cdots\mathrm{d}z_n.$$
4. La relation étant vraie pour tout $h$, on identifie la loi de $(Z_1,\cdots,Z_n)$ comme ayant la densité
$$(z_1,\cdots,z_n)\mapsto\mathbb{1}_{z_1>0,\cdots,z_n>0}\frac{1}{\theta^n}\exp\Big(-\theta^{-1}\sum_{j=1}^nz_j\Big).$$
Il vient (densité **produit** de densités $f_\theta$) que les v.a. $(Z_k)_k$ sont **i.i.d.** de loi exponentielle de paramètre $\theta$.

**Q3. Réécriture de l'estimateur.** On a (définition de $m_{jn}$, indicatrice $\mathbb{1}_{j\le i}$, interversion des sommes, puis expression de $X_{i:n}$ en fonction des $Z_j$)
$$\begin{aligned}\sum_{j=1}^nm_{jn}Z_j&=\sum_{j=1}^n\frac{Z_j}{n-j+1}\sum_{i=j}^na_{in}=\sum_{j=1}^n\sum_{i=1}^n\mathbb{1}_{j\le i}\frac{Z_j}{n-j+1}a_{in}\\&=\sum_{i=1}^na_{in}\sum_{j=1}^i\frac{Z_j}{n-j+1}=\sum_{i=1}^na_{in}X_{i:n}.\end{aligned}$$

**Q4. Biais et risque.** En utilisant (6) et le résultat de la question 2 ($Z_j$ i.i.d., $\mathbb{E}_\theta[Z_j]=\theta$, $\mathrm{Var}_\theta(Z_j)=\theta^2$) et la décomposition biais-variance (Poly ch.3, Prop. 1.1), le risque quadratique de l'estimateur est donné par
$$\Big(\sum_{j=1}^nm_{jn}-1\Big)^2\theta^2+\theta^2\sum_{j=1}^nm_{jn}^2.$$
- *[Extracteur — le corrigé ne l'écrit pas séparément]* $\mathbb{E}_\theta[\hat\theta_n(\underline{a}_n)]=\theta\sum_jm_{jn}$, donc biais $b(\theta,\hat\theta_n(\underline{a}_n))=\theta\big(\sum_{j=1}^nm_{jn}-1\big)$ ; variance $\theta^2\sum_jm_{jn}^2$ (indépendance des $Z_j$).

**Q5. Estimateur sans biais optimal.** Si on cherche sans biais ($\sum_jm_{jn}=1$), on veut minimiser en $\underline{m}$ l'application
$$\underline{m}\mapsto\theta^2\sum_{j=1}^nm_{jn}^2\qquad\text{sous la contrainte}\quad\sum_{j=1}^nm_{jn}=1.$$
En procédant comme dans l'exercice 4 (Q1 : Cauchy-Schwarz ou Lagrange), on obtient successivement (noter la bijection entre $\underline{m}$ et $\underline{a}$)
$$\underline{m}=(1/n,\cdots,1/n),\qquad\underline{a}=(1/n,\cdots,1/n).$$
- *[Extracteur] Formule d'inversion* (non écrite dans le corrigé) : de $(n-j+1)m_{j,n}=\sum_{i=j}^na_{i,n}$ on tire, par différence de deux sommes consécutives,
$$a_{j,n}=(n-j+1)\,m_{j,n}-(n-j)\,m_{j+1,n}\quad(j<n),\qquad a_{n,n}=m_{n,n},$$
ce qui donne bien $a_{j,n}=\frac{n-j+1}{n}-\frac{n-j}{n}=\frac1n$. L'estimateur optimal est $\frac1n\sum_iX_{i:n}=\bar X_n$ (la somme des statistiques d'ordre est la somme des observations), de risque $\theta^2/n$. Ce risque est égal à la borne de Cramér-Rao $\theta^2/n$ du modèle exponentiel paramétré par la moyenne ($\mathbb{I}_1(\theta)=1/\theta^2$) : $\bar X_n$ est **efficace** (lien Poly ch.3, Déf. 1.10 ; non mentionné dans le corrigé).

**Q6. Estimateur optimal sans contrainte de biais.** Sans imposer que l'estimateur soit sans biais, on obtient — en procédant encore comme dans l'exercice 4 (Q2, avec $\sigma^2$ remplacé par $\theta^2$ : $m_{jn}=\frac{\theta^2}{\theta^2+n\theta^2}$) —
$$\underline{m}=(1/(n+1),\cdots,1/(n+1)),\qquad\underline{a}=(1/(n+1),\cdots,1/(n+1)).$$
- *[Extracteur]* Ici, contrairement à l'Exercice 4, les poids optimaux **ne dépendent pas de $\theta$** (car la variance $\theta^2$ est proportionnelle au carré du paramètre) : $\frac{1}{n+1}\sum_{i=1}^nX_i$ est un **vrai estimateur**, biaisé (biais $-\theta/(n+1)$), de risque $\frac{\theta^2\cdot\theta^2}{\theta^2+n\theta^2}=\frac{\theta^2}{n+1}<\frac{\theta^2}{n}$ : il domine uniformément $\bar X_n$, qui est donc **inadmissible** pour le risque quadratique (alors même qu'il est efficace parmi les sans biais).

**Méthodes mobilisées**
- Loi des **statistiques d'ordre** par **symétrie / permutations** (i.i.d. ⇒ échangeabilité ; absence d'ex-aequo p.s. pour des lois à densité) et méthode de la **fonction muette**.
- **Changement de variables** linéaire triangulaire (jacobien $n!$) ; **interversion de sommes** (identité $\sum_ix_i=\sum_i(n-i+1)(x_i-x_{i-1})$).
- **Identification d'une densité produit** ⇒ indépendance et loi commune.
- Espérance / variance d'une combinaison linéaire de v.a. **indépendantes** ; **décomposition biais-variance**.
- **Reparamétrisation bijective** $\underline{a}\leftrightarrow\underline{m}$ pour se ramener à l'Exercice 4.
- Optimisation sous contrainte (Cauchy-Schwarz / Lagrange) et sans contrainte (gradient + convexité), **comme l'Exercice 4**.

**Pièges relevés / remarques du corrigé**
- **Paramétrisation par la moyenne** : $f_\theta(x)=\theta^{-1}e^{-x/\theta}$, donc $\mathbb{E}_\theta[U]=\theta$, $\mathrm{Var}_\theta(U)=\theta^2$ (éq. (6)) — à ne pas confondre avec la convention « intensité » du cours.
- $Z_n=X_{n:n}-X_{n-1:n}$ (coefficient $n-n+1=1$) ; $Z_1=nX_{1:n}$ : le minimum d'un $n$-échantillon exponentiel de moyenne $\theta$ est exponentiel de moyenne $\theta/n$ *[Extracteur]*.
- Les $X_{k:n}$ ne sont **pas** indépendantes, mais les **espacements normalisés** $Z_k$ le sont : c'est tout l'intérêt de la transformation (1).
- La notation $\sigma$ désigne ici une **permutation aléatoire**.
- Pour passer de $\underline{m}$ à $\underline{a}$, utiliser la formule d'inversion correcte (voir Q5) ; la formule $a_{i,n}=m_{i,n}-m_{i+1,n}$ (présente dans la version du poly) est **fausse**.
- Le résultat sans biais ($\bar X_n$) ne fait pas intervenir la structure des statistiques d'ordre : dans cette classe, réordonner n'apporte rien.

**Résultats numériques** *[Extracteur]*
$n=10$, $\theta=2$ : risque de $\bar X_n$ : $\theta^2/n=0{,}4$ ; risque de $\frac{1}{11}\sum X_i$ : $\theta^2/(n+1)=4/11\approx0{,}364$ ; biais $-\theta/(n+1)\approx-0{,}182$. Poids optimaux : sans biais $a_{i,n}=0{,}1$ ; sans contrainte $a_{i,n}=1/11\approx0{,}0909$.

---

## 2. Synthèse des méthodes de la PC

| Méthode | Exercices où elle apparaît | Résultat du poly utilisé |
|---|---|---|
| EMV par étude directe de la vraisemblance (support dépendant de $\theta$) | Exo 1 Q1 | Poly ch.2, Déf. 1.4, Ex. 1.11, Méthode 1.2 |
| Loi du maximum par fonction de répartition (indépendance) | Exo 1 Q3, Q5 ; Exo 3 Q6 (via Exo 1) | Poly ch.1, Ex. 1.13 ; Poly ch.3, Ex. 1.9 |
| Construction d'un estimateur sans biais par identification de primitive | Exo 1 Q2, Q3 | Poly ch.3, Déf. 1.1 (biais) |
| Décomposition biais-variance | Exo 1 Q4–Q5 ; Exo 4 ; Exo 5 Q4 | Poly ch.3, Prop. 1.1 (et Prop. 2.3) |
| Minimisation d'un trinôme / quadratique en un paramètre de forme | Exo 1 Q5 | Poly ch.3, Ex. 1.9 |
| Inadmissibilité par domination uniforme | Exo 1 Q4–Q5 ; (Exo 5 Q6, extracteur) | Poly ch.3, Déf. 1.4 |
| Score, information de Fisher matricielle $\mathbb{E}[\nabla\ell\nabla\ell^T]$ | Exo 2 Q1 | Poly ch.3, Déf. 1.7, Déf. 1.8, Prop. 1.2 |
| Information par la dérivée seconde (hessienne) | Exo 2 Q3 | Poly ch.3, Prop. 1.2 (ii) |
| Inversion d'une matrice $2\times2$ | Exo 2 Q2, Q4 | — (algèbre linéaire) |
| Borne de Cramér-Rao $\nabla g^T\mathbb{I}^{-1}\nabla g$ ($g$ linéaire, puis produit) | Exo 2 Q2, Q4 | Poly ch.3, Th. 1.1, Cor. 1.2 |
| Borne de Cramér-Rao scalaire $g'(\theta)^2/\mathbb{I}(\theta)$ | Exo 2 Q3 ; Exo 3 Q4 | Poly ch.3, Cor. 1.1 |
| Paramètre de nuisance connu (sous-modèle) | Exo 2 Q3 | Poly ch.3, Th. 1.1 appliqué au sous-modèle |
| Inégalité de Cauchy-Schwarz (version covariance ou vecteurs) | Exo 3 Q1 ; Exo 4 Q1 (Sol. 1) ; Exo 5 Q5 | Poly ch.3, Prop. 2.1 |
| Fonction test = rapport de vraisemblance, supports $A_\alpha$ | Exo 3 Q2–Q3 | Poly ch.3, §1.12 (borne de type covariance) |
| Passage à la limite / interversion limite-intégrale | Exo 3 Q4 | Poly ch.3, Prop. 2.2, Déf. 1.6 |
| Calcul d'intégrales sur des pavés, limite $(1-c/n)^{-n}\to e^c$ | Exo 3 Q5–Q6 | Poly ch.3, Ex. 1.12, Ex. 1.16 |
| Translation-échelle $X\overset{d}{=}\theta+\sigma Y$ | Exo 4 | PC 1 Exo 3 ; Poly ch.1, Ex. 2.1 |
| Meilleur estimateur linéaire sans biais | Exo 4 Q1 ; Exo 5 Q5 | Poly ch.3, Ex. 1.11, Déf. 1.5 |
| Multiplicateurs de Lagrange | Exo 4 Q1 (Sol. 2) ; Exo 5 Q5 | note 2 du corrigé (hors poly) |
| Gradient nul + hessienne définie positive (stricte convexité) | Exo 4 Q2 ; Exo 5 Q6 | — (analyse) |
| Loi jointe des statistiques d'ordre par permutations + fonction muette | Exo 5 Q1 | Poly ch.1, « Transfert, fonction muette » ; Ex. 1.8 |
| Changement de variables en dimension $n$ (jacobien) | Exo 5 Q2 | Poly ch.1, Prop. 2.2 |
| Interversion de sommes / reparamétrisation $\underline{a}\leftrightarrow\underline{m}$ | Exo 5 Q2, Q3, Q5 | — |

---

## 3. Idées de reformulation en exercices interactifs (sans saisie de formule)

### Exercice 1 — Modèle uniforme
1. **QCM (EMV)** : « L'EMV de $\theta$ dans $\mathrm{Unif}([0,\theta])$ est : (a) $2\bar X_n$ ; (b) $X_{n:n}$ ✔ ; (c) $\frac{n+1}{n}X_{n:n}$ ; (d) n'existe pas car le score ne s'annule jamais. » Rétroaction : la vraisemblance $\theta^{-n}\mathbb{1}_{X_{n:n}\le\theta}$ est nulle puis décroissante.
2. **Associer** (estimateur ↔ risque quadratique / $\theta^2$) : $\frac2n\sum X_k$ ↔ $\frac{1}{3n}$ ; $\frac{n+1}{n}X_{n:n}$ ↔ $\frac{1}{n(n+2)}$ ; $\frac{n+2}{n+1}X_{n:n}$ ↔ $\frac{1}{(n+1)^2}$ ; $X_{n:n}$ ↔ $\frac{2}{(n+1)(n+2)}$. Puis **vrai/faux** : « $\widehat{\theta}_n^{(2)}$ est admissible car sans biais » → **faux** ; « l'inadmissibilité est transitive ici : $\widehat{\theta}_n^{(1)}$ est inadmissible pour $n>1$ » → **vrai**.
3. **Preuve à ordonner (Q3)** : (i) $\mathbb{P}_\theta(X_{n:n}\le x)=(x/\theta)^n$ par indépendance ; (ii) dériver pour la densité $nx^{n-1}/\theta^n$ ; (iii) écrire $n\theta^{-n}\int_0^\theta\widetilde{T}(x)x^{n-1}\mathrm{d}x=g(\theta)$ ; (iv) reconnaître la primitive $\theta^ng(\theta)/n$ nulle en $0$ ; (v) dériver : $\widetilde{T}(x)=g(x)+\frac xng'(x)$. **Application numérique** : pour $n=5$, choisir la valeur de $a_\star$ parmi $\{6/5,\ 7/6,\ 1,\ 5/4\}$ (réponse $7/6$) et de $R(\theta,\widehat{\theta}_{5,a_\star}^{(3)})/\theta^2$ parmi $\{1/35,\ 1/36,\ 1/15,\ 1/21\}$ (réponse $1/36$).

### Exercice 2 — Régression et Cramér-Rao
1. **Trouver l'erreur** : « La borne pour $\beta_1$ dans le modèle complet vaut $1/[\mathbb{I}(\beta_1,\beta_2)]_{11}=\sigma^2/n$. » → erreur : c'est $[\mathbb{I}^{-1}]_{11}=\frac{\sigma^2\|\mathbf{x}\|^2}{n\|\mathbf{x}\|^2-(\sum x_i)^2}$ ; $\sigma^2/n$ est la borne quand $\beta_2$ est connu.
2. **QCM (gradient de $g$)** : « Pour $g(\theta)=\beta_1\beta_2$, $\nabla_\theta g(\theta)=$ (a) $(\beta_1,\beta_2)^T$ ; (b) $(\beta_2,\beta_1)^T$ ✔ ; (c) $(1,1)^T$ ; (d) $(\beta_1\beta_2,\beta_1\beta_2)^T$. » + **vrai/faux** : « Si $\bar x=0$, connaître $\beta_2$ ne fait pas baisser la borne pour $\beta_1$ » → **vrai** ; « la borne de Q3 est plus grande que celle de Q2 » → **faux**.
3. **Application numérique** avec $\mathbf{x}=(0,1,2)^T$, $\sigma^2=1$ : choisir $\mathbb{I}$ parmi des matrices proposées ($\begin{pmatrix}3&3\\3&5\end{pmatrix}$ ✔) puis la borne pour $\beta_1$ parmi $\{1/3,\ 5/6\ ✔,\ 1/5,\ 3/5\}$. **Étape suivante à choisir** : après $\nabla_\theta\ell_n=\sigma^{-2}\mathbf{X}^T(\mathbf{Y}-\mathbf{X}\theta)$, l'étape suivante est « utiliser $\mathbb{E}_\theta[(\mathbf{Y}-\mathbf{X}\theta)(\mathbf{Y}-\mathbf{X}\theta)^T]=\sigma^2\mathrm{I}_n$ ».

### Exercice 3 — Cramér-Rao sans régularité
1. **Preuve à ordonner (Q2)** : (i) poser $A_\alpha=\{p_\alpha>0\}$, inclusion $A_{\theta-\delta}\subset A_\theta$ ; (ii) $\mathbb{E}_\theta[\Psi]=\int(p_{\theta-\delta}-p_\theta)\mathbb{1}_{A_\theta}\mathrm{d}\mu$ ; (iii) $p_{\theta-\delta}\mathbb{1}_{A_\theta}=p_{\theta-\delta}\mathbb{1}_{A_{\theta-\delta}}$ ; (iv) $1-1=0$ ; (v) $\mathrm{Cov}=\mathbb{E}[T\Psi]$ car $\Psi$ centrée ; (vi) $T$ sans biais sous $\mathbb{P}_{\theta-\delta}$ et $\mathbb{P}_\theta$ ⇒ $g(\theta-\delta)-g(\theta)$.
2. **QCM (conditions de Q4)** : cocher les conditions nécessaires pour retrouver Cramér-Rao : « $\theta-\delta\in\Theta$ pour $\delta$ petit » ✔, « $g$ dérivable en $\theta$ » ✔, « permuter limite et intégrale au dénominateur » ✔, « $T$ efficace » ✗, « modèle uniforme » ✗. + **vrai/faux** : « La borne de Q3 exige que $T$ soit régulier » → **faux**.
3. **Application numérique / associer** : pour $n=10$, $c=1$, choisir $\tau_{10}(1)$ parmi $\{0{,}535\ ✔,\ 0{,}582,\ 1,\ 0{,}1\}$ ; associer chaque courbe de la Figure 2 à son $n$ ($n=5$ : max $\approx0{,}49$ ; $n=20$ : $\approx0{,}60$ ; limite : $\approx0{,}65$). **QCM « conclusion »** : la borne inférieure de l'EQM des estimateurs sans biais est d'ordre (a) $1/n$ ; (b) $1/n^2$ ✔ ; (c) $e^{-n}$ ; (d) constante.

### Exercice 4 — Estimateurs linéaires
1. **QCM** : « L'estimateur linéaire sans biais de risque minimal est : (a) $X_1$ ; (b) $\bar X_n$ ✔ ; (c) $\frac{1}{n+1}\sum X_i$ ; (d) la médiane. » + **vrai/faux** : « Les poids optimaux sans contrainte de biais, $\frac{\theta^2}{\sigma^2+n\theta^2}$, définissent un estimateur calculable » → **faux** (ils dépendent de $\theta$).
2. **Étape suivante à choisir (Q2)** : après avoir écrit $2\theta^2(\sum_ka_k-1)+2\sigma^2a_i=0$ pour tout $i$, l'étape suivante est : (a) sommer sur $i$ pour obtenir $\sum_ka_k$ ✔ ; (b) poser $a_i=1/n$ ; (c) appliquer Cauchy-Schwarz ; (d) dériver encore. Puis : pourquoi le point critique est-il un minimum ? → « hessienne $2\sigma^2I+2\theta^2\mathbb{1}\mathbb{1}^T$ définie positive ».
3. **Application numérique** : $\sigma=1$, $n=10$, $\theta=1$ : choisir le risque minimal linéaire parmi $\{0{,}1,\ 1/11\ ✔,\ 1/10{,}5,\ 0\}$ et le risque minimal sans biais ($0{,}1$). **Associer** méthode ↔ solution : Cauchy-Schwarz ↔ « $\frac1n\sum a_k^2\ge(\frac1n\sum a_k)^2$ » ; Lagrange ↔ « $2a_i+\lambda=0$, $\lambda=-2/n$ ».

### Exercice 5 — Statistiques d'ordre exponentielles
1. **Vrai/faux** : « Les statistiques d'ordre $X_{1:n},\dots,X_{n:n}$ sont indépendantes » → **faux** ; « les $Z_k=(n-k+1)(X_{k:n}-X_{(k-1):n})$ sont i.i.d. de moyenne $\theta$ » → **vrai** ; « $nX_{1:n}$ a même loi que $X_1$ » → **vrai**.
2. **Preuve à ordonner (Q2)** : (i) écrire $\mathbb{E}_\theta[h(Z)]$ avec la densité $f_{1:n}$ ; (ii) changer de variables $z_i=(n-i+1)(y_i-y_{i-1})$, jacobien $n!$ ; (iii) intervertir les sommes : $\sum_k\sum_{j\le k}\frac{z_j}{n-j+1}=\sum_jz_j$ ; (iv) reconnaître la densité produit $\theta^{-n}e^{-\sum z_j/\theta}$ ; (v) conclure i.i.d. exponentielles.
3. **Trouver l'erreur** : « De $m_{j,n}=\frac{1}{n-j+1}\sum_{i\ge j}a_{i,n}$ on déduit $a_{i,n}=m_{i,n}-m_{i+1,n}$. » → erreur : la bonne inversion est $a_{j,n}=(n-j+1)m_{j,n}-(n-j)m_{j+1,n}$. **QCM** : poids optimaux sans contrainte : (a) $1/n$ ; (b) $1/(n+1)$ ✔ ; (c) $\theta^2/(\sigma^2+n\theta^2)$ ; (d) $1/(n-1)$. **Application numérique** : $n=10$, $\theta=2$ : risques $0{,}4$ (sans biais) vs $4/11\approx0{,}364$.
