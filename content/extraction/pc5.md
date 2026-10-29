# PC 5 — Optimalité en théorie des tests : Neyman-Pearson, rapport de vraisemblance monotone, absence de test U.P.P. bilatéral, tests U.M.P.U., rapport de vraisemblance généralisé

> **Sources extraites :** `S5_APM-41033-EP-PC5-enonce` (énoncé, 6 p., Exercices 1 à 6) et `S5_APM-41033-EP-PC5-corrige` (corrigé officiel, section « 1 Corrigés », paginé p. 7 à 25). Toutes les formules ont été vérifiées visuellement sur les deux PDF.
> **Convention de citation :** « Énoncé PC5, p. N » / « Corrigé PC5, p. N » pour la PC ; « Poly ch.5, Th. 1.1 », « Poly ch.5, Déf. 1.4 »… pour le cours (numérotation de `content/extraction/ch5.md`, et de `ch1.md`, `ch2.md`, `ch4.md` pour les chapitres antérieurs).
> **ATTENTION — décalage de numérotation entre énoncé et corrigé.** Le corrigé ne suit **pas** la numérotation de l'énoncé pour les exercices 3, 4, 5 (voir la table du §0.4). Dans ce fichier, **on suit la numérotation de l'énoncé** et l'on indique à chaque fois le titre du corrigé correspondant.
> **Remarques de l'extracteur :** tout ajout qui ne figure pas dans le corrigé officiel (calcul intermédiaire non écrit, correction de coquille, application numérique) est explicitement marqué *[Extracteur]*.

---

## 0. Chapitres du poly mobilisés et rappels donnés en tête d'énoncé

### 0.1 Chapitres mobilisés

La PC 5 est la petite classe de la **semaine 5**, associée au **chapitre 5 « Optimalité en théorie des tests »**. Elle mobilise aussi les chapitres 1 (lois Gamma / $\chi^2$, théorème de Cochran, statistiques d'ordre), 2 (maximum de vraisemblance, modèle linéaire gaussien) et 4 (tests, fonction puissance, PC 4 Exercice 1, loi de Fisher). Plusieurs exercices de la PC sont **les exercices du §3 du Poly ch.5** (avec corrigés intégrés au poly) :

| Exercice de la PC | Exercice du Poly ch.5 (cf. `ch5.md` §4) | Résultats du Poly ch.5 mobilisés | Autres chapitres |
|---|---|---|---|
| Exo 1 (exponentiel, r.v. monotone) | Exercice 1 « Modèle exponentiel » | Déf. 1.3, Cadre 1.1, Th. 1.1 (Neyman-Pearson), Méthodes 1.1–1.2, Déf. 1.4, Th. 1.3, Méthode 1.3 | PC 4 Exo 1 (test par pivot $\chi^2(2n)$) ; ch.1 Prop. 2.8 ($\chi^2(\nu)=\mathrm{Gamma}(\nu/2,1/2)$), additivité Gamma |
| Exo 2 (gaussien, pas d'U.P.P. bilatéral, U.M.P.U.) | Exercice 5 « Modèle gaussien, hypothèse bilatérale » | Th. 1.1, Th. 1.2 (unicité), Th. 1.3, Prop. 1.1, Ex. 1.3, Ex. 1.6 ; compléments Déf. 4.2, Prop. 4.1 (sans biais, U.M.P.U.) | ch.4 Ex. 2.10 (test bilatéral gaussien), Déf. 2.2 (fonction puissance) ; convergence dominée (dérivation sous l'intégrale) |
| Exo 3 (exponentielle translatée) | Exercice 4 « Exponentielle translatée » | Th. 4.1 (Neyman-Pearson, forme générale randomisée, compléments), Th. 1.2 / non-unicité | ch.1 statistiques d'ordre ($X_{1:n}$) |
| Exo 4 (rapport de vraisemblance généralisé, régression, ANOVA) | Exercice 6 « Rapport de vraisemblance généralisé » | compléments Déf. 4.3 ($\Lambda_n$) | ch.2 EMV du modèle linéaire gaussien (ch.2 Exercice 1, Ex. 4.7) ; ch.1 Th. 1.1 (Cochran) ; ch.4 Déf. 3.2 (loi de Fisher) |
| Exo 5 (monotonie en le niveau) | Exercice 2 « Monotonie en le niveau » | Th. 4.1 (forme générale), unicité (Th. 1.2 / Th. 4.1) ; outils : fonction quantile (inverse généralisée) | — |
| Exo 6 (temps d'attente géométriques) | Exercice 3 « Temps d'attente géométriques » | Déf. 1.5 (r.v. monotone décroissant), Th. 1.4 (version randomisée : compléments, Ex. 4.2 et « résultat principal »), outils : loi géométrique / binomiale négative | fonction génératrice, transformée de Laplace |

**Renvois obsolètes dans le corrigé (à traduire) :**
- « théorème I-5.16 » (Corrigé PC5, p. 12, Exo 2 Q2, contexte du rapport de vraisemblance monotone) = **Poly ch.5, Théorème 1.3** (test U.P.P. unilatéral, cas croissant) dans la numérotation actuelle.
- « théorème I-5.5 » (Corrigé PC5, p. 13, Exo 2 Q3, « unicité des tests UPP($\alpha$) ») = **Poly ch.5, Théorème 1.2** (caractérisation / unicité des tests U.P.P.).
- « Le théorème d'unicité des tests U. P. P.($\alpha$) » (Corrigé PC5, p. 20, Exo 5 Q3) : dans un cadre **sans hypothèse d'absence d'atome**, c'est la partie « unicité » du **Th. 4.1** des compléments (qui étend le Th. 1.2).
- « le résultat de la question 6 de l'exercice 5 » (Corrigé PC5, p. 18, Exo 4 Q2) : **renvoi pendant**, il n'y a pas de question 6 dans l'exercice 5 de cette PC (le résultat invoqué est : un minimiseur du lagrangien vérifiant la contrainte minimise la fonction sous la contrainte).

### 0.2 Rappels et conventions donnés dans l'énoncé

L'énoncé ne comporte **pas** de bloc de rappels en tête de feuille ; les conventions sont données dans le corps des exercices :

- **Modèle exponentiel (Exo 1)** : $(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{p_\theta.\mathrm{d}\mu,\ \theta\in\Theta\})$, $\Theta:=\mathbb{R}_+^\ast$, $\mu$ = mesure de Lebesgue, et
$$x\mapsto p(\theta;x)=p_\theta(x)=\theta^{-1}e^{-x/\theta}\mathbb{1}_{\mathbb{R}_+}(x).$$
Le paramètre $\theta$ est la **moyenne** (paramétrisation par l'échelle).
- **Convention de la loi Gamma (Corrigé PC5, p. 8)** : paramétrée par l'**intensité**. Si les $X_i$ sont i.i.d. de loi exponentielle « de paramètre $1/\theta$ » (intensité $1/\theta$, moyenne $\theta$), alors $\sum_{i=1}^nX_i$ suit une loi **Gamma de paramètres $(n,\theta^{-1})$**, de densité
$$x\mapsto\frac{\theta^{-n}x^{n-1}\exp\{-x/\theta\}}{\Gamma(n)}\mathbb{1}_{\mathbb{R}_+}(x).$$
Les légendes des figures 1 et 3 écrivent « loi Gamma de paramètres $(10,1/\theta_0)$ » (même convention). Cohérent avec le Poly ch.5 (« $\mathrm{Gamma}(n,1/\theta)$ a pour densité $\theta^{-n}x^{n-1}e^{-x/\theta}/\Gamma(n)$ »).
- **Lien $\chi^2$ (Corrigé PC5, p. 7)** : pour tout $\theta>0$, $2\sum_{i=1}^nX_i/\theta$ suit une loi $\chi^2(2n)$ sous $p_\theta$ ; $q^{\chi^2(2n)}_{1-\alpha}$ désigne le quantile d'ordre $1-\alpha$ de la loi $\chi^2(2n)$.
- **Quantiles gaussiens (Exo 2)** : « On notera, pour tout $\alpha$, $q_\alpha$ le quantile d'ordre $\alpha$ de la loi $\mathrm{N}(0,1)$. » Le niveau est pris dans $\alpha\in(0,1/2)$, de sorte que $q_\alpha=-q_{1-\alpha}<0$. **Attention :** le poly note ces quantiles $z_\beta$ ; la PC les note $q_\beta$.
- **Remarque de l'énoncé (Exo 2, en italique) :** « Puisqu'il s'agit d'un test de la moyenne à variance connue, on pourrait supposer sans perte de généralités que $n=1$. Cette solution n'est pas retenue dans le corrigé pour quantifier l'effet de $n$ mais les calculs demeureraient quasiment identiques. »
- **Définition (énoncé, Exo 2) — test sans biais, U.M.P.U. :** Un test $\phi$ des hypothèses $H_0:\theta=\theta_0$ contre $H_1:\theta\in\Theta_1$ est dit **sans biais de niveau $\alpha$** s'il est de niveau $\alpha$ et si sa fonction puissance $\beta_\phi:\theta\mapsto\mathbb{E}_\theta[\phi(Z)]$ vérifie
$$\forall\theta\in\Theta_1,\qquad\beta_\phi(\theta)\geqslant\alpha.$$
La propriété **UMPU($\alpha$)** (*uniformly most powerful unbiased test*) : test uniformément plus puissant parmi les tests **sans biais** de niveau $\alpha$. (= Poly ch.5, compléments, Déf. 4.2.)
- **Définition (énoncé, Exo 4) — rapport de vraisemblance généralisé :** $L(\theta,Z)$ vraisemblance de l'observation $Z$ sous $\mathbb{P}_\theta$,
$$\Lambda(Z)=\frac{\sup_{\theta\in\Theta_0}L(\theta,Z)}{\sup_{\theta\in\Theta}L(\theta,Z)}.$$
Le test rejette $H_0:\theta\in\Theta_0$ si $\Lambda(Z)\leqslant c_\alpha$, $c_\alpha$ étant choisi naturellement inférieur à 1 et de façon à ce que le niveau du test soit inférieur à $\alpha$. « On peut étudier ce test lorsque $n\to\infty$ dans les modèles réguliers. » (= Poly ch.5, compléments, Déf. 4.3, notée $\Lambda_n$ dans le poly.)
- **Loi géométrique (Exo 6)** : comptée en nombre d'échecs, $\mathbb{P}_\theta(Y_i=k)=\theta(1-\theta)^k$, $k\in\mathbb{N}$ (même convention que Poly ch.5, Outils, p. 27–28).
- **Rappel de l'énoncé (Exo 5)** : « On rappelle que $\phi_\alpha$ est U.P.P.($\alpha$) pour le test (3) » (c'est le Th. 4.1 des compléments du Poly ch.5).

### 0.3 Notations propres à la PC (à reproduire telles quelles)

| Notation | Signification | Où |
|---|---|---|
| $Z=(X_1,\dots,X_n)$ | $n$-échantillon, vecteur d'observation | partout |
| $p_\theta.\mathrm{d}\mu$ | loi de densité $p_\theta$ par rapport à $\mu$ (point « . » dans l'énoncé) | Exo 1 |
| $p_{n,\theta}$ (Exo 1, corrigé) ; $p^n_\theta$ (Exo 2) ; $p^n(z,\theta)$ (Exo 2 Q6, corrigé) | densité du vecteur $Z$ | Exo 1, 2 |
| $x_{1:n}:=\min(x_1,\dots,x_n)$, $X_{1:n}$ | minimum (statistique d'ordre) | Exo 1 (corrigé), Exo 3 |
| $\mathcal{R}_c$, $\phi_c=\mathbb{1}_{\mathcal{R}_c}$, $c_\alpha:=q^{\chi^2(2n)}_{1-\alpha}$ | test de la PC 4 | Exo 1 |
| $r(Z)$, $r(z)$ | rapport de vraisemblance | Exo 1, 2, 3, 5, 6 |
| $\phi^\star$, $\tilde c_\alpha$, $\bar c_\alpha$ | test de Neyman-Pearson et ses seuils (sur $r$ puis sur la statistique) | Exo 1 |
| $q_\alpha$ | quantile d'ordre $\alpha$ de $\mathrm{N}(0,1)$ (**pas** $z_\alpha$ comme dans le poly) | Exo 2 |
| $\mathrm{N}(\theta,1)$ | loi gaussienne (N droit, pas $\mathcal{N}$) | Exo 2, 4 |
| $\phi^{\star,1}$, $\phi^{\star,2}$, $\phi^{\star,3}$ | tests « à droite », « à gauche », « bilatéral » | Exo 2 |
| $\beta_\phi(\theta):=\mathbb{E}_\theta[\phi(Z)]$, $\beta'_\phi$ | fonction puissance et sa dérivée | Exo 2 |
| $\Phi$, $f_{0,1}$ | f.d.r. et densité de $\mathrm{N}(0,1)$ | Exo 2 |
| $\bar\phi\equiv\alpha$ | test randomisé constant | Exo 2 Q5 |
| $f_1,f_2,f_{3,\theta}$, $\kappa_1,\kappa_2$, $\kappa_{1,\theta},\kappa_{2,\theta}$, $\gamma_{1,\theta},\gamma_{2,\theta}$, $a_\theta,b_\theta$, $I_\theta(\phi)$ | objets de la preuve U.M.P.U. | Exo 2 Q8 |
| $p(\theta,x)$, $p(\theta;x_1,\dots,x_n)$, $L_n(\theta)$ | densité, vraisemblance | Exo 3 |
| $\phi_1,\phi_2$, $\phi_\star$, $\alpha_\star$ | fonctions critiques de l'Exo 3 | Exo 3 |
| $L(\theta,\mathbf{Y})$, $\Lambda(Z)$ | vraisemblance, rapport de vraisemblance généralisé | Exo 4 |
| $X$ (matrice $n\times p$, non grasse), $X_0$ ($n\times r$), $\mathbf{Y}$ (gras), $\mathbf{M}$ (gras dans l'énoncé, $M$ dans le corrigé) | design, observation, projecteur | Exo 4 |
| $\Pi$, $\Pi_0$, $V$, $V_0$, $K$, $\Gamma(\beta,\kappa)$, $Q(\beta)$ | projecteurs, espaces, contrainte, lagrangien, moindres carrés | Exo 4 (corrigé) |
| $\mathbf{1}_{n_i}$ | vecteur de $n_i$ uns | Exo 4 Q5 |
| $p_0,p_1$, $\mathbb{P}_0,\mathbb{E}_0,\mathbb{P}_1,\mathbb{E}_1$ | deux densités et les lois / espérances associées | Exo 5 |
| $\phi_\alpha$, $c_\alpha$, $\gamma_\alpha$, $F_{r,0}$ | test U.P.P. de niveau $\alpha$, f.d.r. de $p_1(Z)/p_0(Z)$ sous $p_0$ | Exo 5 |
| $T_i$, $Y_i=T_i-T_{i-1}-1$, $T(Z):=\sum_{i=1}^nY_i$ | instants de succès, nombres d'échecs, statistique | Exo 6 |
| $\varphi$ (varphi) | rapport de vraisemblance comme fonction de $t$ | Exo 6 (corrigé) |
| $H(n)$, $h(n,\cdot)$ | loi binomiale négative et sa densité | Exo 6 (corrigé) |
| $F_{\theta_0,T(Z)}$, $F^{-1}_{\theta_0,T(Z)}$ | f.d.r. de $T(Z)$ sous $\theta_0$ et son inverse généralisée | Exo 6 (corrigé) |

### 0.4 Correspondance des numéros énoncé / corrigé

| Énoncé | Titre (énoncé) | Corrigé correspondant | Pages corrigé |
|---|---|---|---|
| Exercice 1 | Rapport de vraisemblance monotone pour la construction de test UPP($\alpha$) | « Corrigé de l'Exercice 1 » | p. 7–9 |
| Exercice 2 | Un test UPP($\alpha$) n'existe pas toujours | « Corrigé de l'exercice 2 » | p. 10–16 |
| Exercice 3 | (sans titre) exponentielle translatée | « **Corrigé de l'Exercice 5** » | p. 22–23 |
| Exercice 4 | Test du rapport de vraisemblance généralisée pour modèle de régression | « **Corrigé de l'Exercice 3** » | p. 17–19 |
| Exercice 5 | (sans titre) monotonie en le niveau | « **Corrigé de l'Exercice 4** » | p. 20–21 |
| Exercice 6 | Rapport de vraisemblance à valeur discrète | « Corrigé Exercice 6 » | p. 24–25 |

Conséquence : dans la « Remarque sur le test (12) » du corrigé de l'exponentielle translatée, la phrase « Cette discussion illustre le résultat de la question 3 de l'exercice 5 » renvoie bien à l'**Exercice 5 de l'énoncé** (monotonie en le niveau, Q3).

### 0.5 Coquilles relevées dans les documents de la PC (à corriger dans le contenu pédagogique)

1. **Énoncé Exo 4 Q1** : la formule affichée est $\sup_{\theta\in\Theta}L(\theta,\mathbf{Y})=\frac{1}{(2\pi)^{n/2}\widehat\sigma}e^{-n/2}$ ; le corrigé (p. 17) donne la bonne formule avec $\hat\sigma^n$.
2. **Corrigé Exo 1, p. 8** : « où $(c,\gamma)$ sont définis pour garantir le niveau » alors que le test écrit n'a pas de $\gamma$ (statistique à densité, $\gamma$ inutile).
3. **Corrigé Exo 1, p. 8** : le texte dit « deux lois Gamma de paramètres $n=10$ et $1/\theta=0.5$ (en bleu) ou $1/\theta=2$ (en vert) », alors que la légende de la Figure 3 (et la Figure 1 de l'énoncé) dit $\theta_1=0.5$ (bleu) et $\theta_1'=2$ (vert). La figure (mode de la courbe bleue vers $4.5$, de la verte vers $18$) confirme la **légende** : $\theta=0.5$ (bleu), $\theta=2$ (vert).
4. **Corrigé Exo 2 Q1, p. 10** : la première expression de $r(z)$ est écrite sans l'exponentielle : il faut lire $r(z)=\exp\big(-\frac12\sum(x_i-\theta_1)^2+\frac12\sum(x_i-\theta_0)^2\big)$.
5. **Corrigé Exo 2 Q1, p. 11** : « la condition (7) entraîne $\tilde c=q_{1-\alpha}$ » mais la règle qui suit utilise le seuil $\sqrt n\,q_{1-\alpha}$ sur $\sum_{i}(x_i-\theta_0)$ : le seuil correct est $\tilde c=\sqrt n\,q_{1-\alpha}$ (car $\sum_i(X_i-\theta_0)\sim\mathrm{N}(0,n)$).
6. **Corrigé Exo 2 Q8(b), p. 15** : la lettre $c$ dans $\{|(\theta-\theta_0)\sum(x_i-\theta_0)|\ge c|\theta-\theta_0|\}$ désigne le seuil $C=\sqrt n\,q_{1-\alpha/2}$ sur $|\sum_i(x_i-\theta_0)|$, **pas** le $c=q_{1-\alpha/2}/\sqrt n$ de la Q4 (seuil sur la moyenne).
7. **Corrigé Exo 4 (= « Exercice 3 » du corrigé) Q1, p. 17** : « une étude de fonction élémentaire montre qu'elle atteint son **minimum** en $\hat\sigma^2$ » : il s'agit d'un **maximum** de $\sigma^2\mapsto L(\hat\beta,\sigma^2,\mathbf{Y})$.
8. **Corrigé Exo 4 Q2, p. 17–18** : la matrice $K$ n'est **pas définie** ; d'après le contexte ($K\beta=0\iff\beta_{r+1}=\dots=\beta_p=0$, et $\begin{bmatrix}0_r\\ \kappa_0\end{bmatrix}=2K(\cdot)$), $K=\mathrm{diag}(0,\dots,0,1,\dots,1)$ ($r$ zéros, $p-r$ uns), projecteur sur les $p-r$ dernières coordonnées *[Extracteur]*. Le renvoi « question 6 de l'exercice 5 » est pendant.
9. **Corrigé Exo 4 Q2, p. 18** : « $n\hat\sigma_0^2=\|(\mathbf{I}_p-\Pi_0)\mathbf{Y}\|^2$ » : il faut $\mathbf{I}_n$ (les projecteurs agissent sur $\mathbb{R}^n$).
10. **Corrigé Exo 4 Q4, p. 18** : la notation $\hat\sigma_0^2$ y est **réutilisée** pour $\frac1n\|(\Pi-\Pi_0)\mathbf{Y}\|^2$, qui vaut en fait $\hat\sigma_0^2-\hat\sigma^2$ avec la définition de la Q2 (conflit de notation).
11. **Corrigé Exo 3 (= « Exercice 5 » du corrigé) Q4, p. 22** : « on doit prendre $c(\alpha)=e^{-n(\theta_1-\theta_0)}$ » : le seuil sur $r(Z)$ est $c(\alpha)=e^{n(\theta_1-\theta_0)}$ (valeur non nulle prise par $r(Z)$), ce qui donne bien la forme $\phi_2$ *[Extracteur]*. Même page : égalité dupliquée « $=\mathbb{P}_{\theta_0}(X_{1:n}>\theta_1)=\mathbb{P}_{\theta_0}(X_{1:n}>\theta_1)$ ».
12. **Corrigé Exo 3, (12) p. 22** : les inégalités larges/strictes ($X_{1:n}\ge\theta_1$, $\theta_0\le X_{1:n}<\theta_1$) diffèrent de celles de l'énoncé ($x_{1:n}>\theta_1$, $\theta_0<x_{1:n}\le\theta_1$) : sans importance (événements de probabilité nulle, $X_{1:n}$ est à densité).
13. **Corrigé Exo 6 Q4, p. 25** : l'écriture « de façon équivalente, $1-\alpha=(1-\gamma)\mathbb{P}_{\theta_0}(T(Z)\le c)+\gamma\,\mathbb{P}_{\theta_0}(T(Z)<c)$ » est **recopiée du cas « on rejette pour $T$ grand »** et est fausse ici. Pour $\phi_\alpha=\mathbb{1}_{\{T<c\}}+\gamma\mathbb{1}_{\{T=c\}}$, la condition $\mathbb{P}_{\theta_0}(T<c)+\gamma\,\mathbb{P}_{\theta_0}(T=c)=\alpha$ équivaut à
$$\alpha=\gamma\,\mathbb{P}_{\theta_0}(T(Z)\le c)+(1-\gamma)\,\mathbb{P}_{\theta_0}(T(Z)<c),$$
i.e. $\alpha\in[\mathbb{P}_{\theta_0}(T<c),\mathbb{P}_{\theta_0}(T\le c)]$, ce qui est cohérent avec la conclusion $c_\alpha=F^{-1}_{\theta_0,T(Z)}(\alpha)$ du corrigé *[Extracteur]*. Le cas (b) « $\mathbb{P}(T(Z)=q_\alpha)=\alpha$ » doit se lire « $\mathbb{P}(T(Z)<q_\alpha)=\alpha$ » (c'est ce cas qui donne $\gamma_\alpha=0$ avec $c_\alpha=q_\alpha$) *[Extracteur]*. Enfin « $F^{-1}_{\theta_0,T(Z)}$ désigne la fonction de répartition » : c'est $F_{\theta_0,T(Z)}$ qui est la f.d.r., $F^{-1}$ son inverse généralisée.
14. **Corrigé Exo 6 Q2, p. 24** : « pour $0\le\theta_1<\theta_2<1$ » alors que $\Theta=]0,1[$ (il faut $\theta_1>0$ pour diviser par $\theta_1^n$).

---

## 1. Exercices

### Exercice 1 — Rapport de vraisemblance monotone pour la construction de test UPP($\alpha$) (⋆⋆)
**Source :** Énoncé PC5, p. 1 ; Corrigé PC5, « Corrigé de l'Exercice 1 », p. 7–9. (= Poly ch.5, Exercice 1.)

**Énoncé complet.** Soit $Z=(X_1,\dots,X_n)$ un $n$-échantillon du modèle $(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{p_\theta.\mathrm{d}\mu,\ \theta\in\Theta\})$, où $\theta\in\Theta:=\mathbb{R}_+^\ast$, $\mu$ est la mesure de Lebesgue sur $\mathbb{R}$ et $p_\theta$ est définie par
$$x\mapsto p(\theta;x)=p_\theta(x)=\theta^{-1}e^{-x/\theta}\mathbb{1}_{\mathbb{R}_+}(x).$$
1. Soit $0<\theta_0<\theta_1$. Montrer que le test trouvé en PC4, Exercice 1, est un test UPP($\alpha$) pour $\theta=\theta_0$ contre $\theta=\theta_1$.
2. Montrer que la famille $\{p(\theta;\cdot),\ \theta\in\Theta\}$ est à rapports de vraisemblances monotones.

Soit $\theta_0>0$. On considère les hypothèses
$$H_0:\ \theta\le\theta_0,\qquad\text{contre}\qquad H_1:\ \theta>\theta_0.$$
3. Déterminer un test U.P.P.($\alpha$) pour ces hypothèses. On explicitera le calcul des constantes dans la définition de la fonction critique du test.

*Figure 1 (énoncé) = Figure 3 (corrigé) :* en rouge, densité d'une loi Gamma de paramètres $(10,1/\theta_0)$ avec $\theta_0=1$ ; le seuil critique $c$ est indiqué par un trait vertical (pointillé, vers $x\approx15.7$). On trace aussi la densité de deux lois Gamma de paramètres $(10,1/\theta_1)$ avec $\theta_1=0.5$ (en bleu, mode vers $4.5$) et $(10,1/\theta_1')$ avec $\theta_1'=2$ (en vert, mode vers $18$). Axe des abscisses $[0,30]$, ordonnées $[0,0.3]$.

**Corrigé complet (Corrigé PC5, p. 7–9).** Posons $Z=(X_1,\cdots,X_n)$.

*Q1. Rappel de la PC 4.* Dans l'exercice 1 de la PC 4, étant données deux valeurs $\theta_0,\theta_1$ telles que $0<\theta_0<\theta_1$, on voulait tester $H_0:\theta=\theta_0$ contre $H_1:\theta=\theta_1$. On avait observé que pour tout $\theta>0$, $2\sum_{i=1}^nX_i/\theta$ suit une loi $\chi^2(2n)$ sous $p_\theta$, puis cherché des tests de zone de rejet de la forme
$$\mathcal{R}_c:=\Big\{z=(x_1,\cdots,x_n):\ 2\theta_0^{-1}\sum_{i=1}^nx_i>c\Big\}.$$
Pour tout $c\ge c_\alpha$ où $c_\alpha:=q^{\chi^2(2n)}_{1-\alpha}$ est le quantile d'ordre $(1-\alpha)$ d'une loi du $\chi^2(2n)$, le test de fonction critique $\phi_c(z):=\mathbb{1}_{\mathcal{R}_c}(z)$ est de niveau $\alpha$ ; et seul le test $\phi_{c_\alpha}$ est de taille $\alpha$.

*Q1. Ce que donne la méthode de Neyman-Pearson.* Pour ce test simple, on écrit le rapport de vraisemblance pour la loi du vecteur d'observation (densité produit, par indépendance) :
$$r(Z):=\Big(\frac{\theta_0}{\theta_1}\Big)^n\exp\Big((\theta_0^{-1}-\theta_1^{-1})\sum_{i=1}^nX_i\Big).$$
- *Absence d'atome (Cadre 1.1 du Poly ch.5).* Sous $p_{\theta_0}$, $\sum_{i=1}^nX_i$ (et par suite $r(Z)$, fonction strictement monotone de cette somme) possède une densité par rapport à la mesure de Lebesgue sur $\mathbb{R}$, donc pour tout $c\in\mathbb{R}$, $\mathbb{P}_{\theta_0}(r(Z)=c)=0$.
- *Test de Neyman-Pearson (Th. 1.1 du Poly ch.5).* Par conséquent, le test de Neyman-Pearson a pour fonction critique
$$\phi^\star(z):=\mathbb{1}_{\{z:\ r(z)>\tilde c_\alpha\}},$$
où $\tilde c_\alpha$ est solution de $\tilde c:\ 1-\alpha=\mathbb{P}_{\theta_0}(r(Z)\le\tilde c)$.
- *Passage à la statistique (Méthode 1.2 du Poly ch.5).* En observant que (on prend le logarithme, puis on divise par $\theta_0^{-1}-\theta_1^{-1}>0$)
$$\{r(Z)\le\tilde c\}=\Big\{2\sum_{i=1}^nX_i/\theta_0\le-2(\theta_0/\theta_1-1)^{-1}\ln(\theta_1^n\theta_0^{-n}\tilde c)\Big\},$$
et puisque $2\sum_{i=1}^nX_i/\theta_0\sim\chi^2(2n)$ sous $p_{\theta_0}$, le test est équivalent à
$$\phi^\star(z):=\mathbb{1}_{\{z=(x_1,\cdots,x_n):\ 2\theta_0^{-1}\sum_{i=1}^nx_i>\bar c_\alpha\}},$$
où $\bar c_\alpha$ est choisi de sorte que $1-\alpha=\mathbb{P}_{\theta_0}(2\theta_0^{-1}\sum_{i=1}^nX_i\le\bar c_\alpha)=\mathbb{P}(W\le\bar c_\alpha)$ avec $W\sim\chi^2(2n)$ ; on obtient $\bar c_\alpha=q^{\chi^2(2n)}_{1-\alpha}$.
- *Conclusion.* Le test U.P.P.($\alpha$) donné par la construction de Neyman-Pearson est le test de zone de rejet $\mathcal{R}_{c_\alpha}$ trouvé dans l'exercice 1 de la PC 4.
- *Remarque importante du corrigé (qui explique la Q3) :* la règle de décision **ne dépend pas de la valeur de $\theta_1$**.

*Q2. Rapport de vraisemblance monotone.* Sous $\mathbb{P}_\theta$, les variables $(X_i)_{1\le i\le n}$ sont i.i.d. de loi exponentielle de paramètre $1/\theta>0$, donc la densité de la loi de $Z$ par rapport à la mesure de Lebesgue sur $\mathbb{R}^n$ est (produit, par indépendance)
$$p_{n,\theta}:z\mapsto\prod_{i=1}^n\theta^{-1}\exp\{-x_i/\theta\}\mathbb{1}_{\mathbb{R}_+}(x_i)=\theta^{-n}\exp\Big\{-\sum_{i=1}^nx_i/\theta\Big\}\mathbb{1}_{\mathbb{R}_+}(x_{1:n}),$$
où $x_{1:n}:=\min(x_1,\dots,x_n)$. Fixons $\theta_1,\theta_2$ tels que $0<\theta_1<\theta_2$. Pour tout $z\in\mathbb{R}^n_+$,
$$\frac{p_{n,\theta_2}(z)}{p_{n,\theta_1}(z)}=\frac{\theta_1^n}{\theta_2^n}\exp\Big\{-(\theta_2^{-1}-\theta_1^{-1})\sum_{i=1}^nx_i\Big\}.$$
La fonction $t\mapsto\exp\{(\theta_1^{-1}-\theta_2^{-1})t\}$ est strictement croissante (car $\theta_1^{-1}-\theta_2^{-1}>0$). La famille $\{\mathbb{P}_\theta,\ \theta\in\Theta\}$ est donc à rapports de vraisemblance monotones (croissants, Déf. 1.4 du Poly ch.5) en la statistique $\sum_{i=1}^nX_i$.

*[Extracteur]* Factorisation (2) du poly : $h(z)=\mathbb{1}_{\mathbb{R}_+}(x_{1:n})$, $T(z)=\sum_ix_i$, $\psi(t;\theta)=\theta^{-n}e^{-t/\theta}$.

*Q3. Test U.P.P. unilatéral.* Soit $\alpha\in(0,1)$. On souhaite tester $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$. Sous $\mathbb{P}_\theta$, la statistique $\sum_{i=1}^nX_i$ possède une densité par rapport à la mesure de Lebesgue. Par suite (Th. 1.3 du Poly ch.5 : r.v. monotone croissant + statistique à densité), un test U.P.P.($\alpha$) est donné par
$$\phi(z)=\begin{cases}1 & \text{si }\sum_{i=1}^nx_i>c,\\ 0 & \text{si }\sum_{i=1}^nx_i\le c,\end{cases}$$
où $c$ est défini pour garantir le niveau du test : $\alpha=\mathbb{E}_{\theta_0}[\phi(Z)]$ (le corrigé écrit « $(c,\gamma)$ », cf. coquille 2). On a donc
$$\alpha=\mathbb{P}_{\theta_0}\Big(\sum_{i=1}^nX_i>c\Big).$$
Puisque sous $p_\theta$ les $(X_i)$ sont i.i.d. de loi exponentielle de paramètre $1/\theta$, la statistique $\sum_{i=1}^nX_i$ suit une loi **Gamma de paramètres $(n,\theta^{-1})$** (additivité des lois Gamma), de densité
$$x\mapsto\frac{\theta^{-n}x^{n-1}\exp\{-x/\theta\}}{\Gamma(n)}\mathbb{1}_{\mathbb{R}_+}(x).$$
Ainsi (changement de variable $u=x/\theta_0$, puis $\Gamma(n)=(n-1)!$, puis $\chi^2(2n)=\mathrm{Gamma}(n,1/2)$, Poly ch.1 Prop. 2.8) :
$$\alpha=\mathbb{E}_{\theta_0}[\phi(Z)]=\mathbb{P}_{\theta_0}\Big(\sum_{i=1}^nX_i>c\Big)=\frac{\theta_0^{-n}}{\Gamma(n)}\int_c^{+\infty}x^{n-1}\exp\{-x/\theta_0\}\,\mathrm{d}x=\frac{1}{(n-1)!}\int_{c/\theta_0}^{+\infty}u^{n-1}\exp(-u)\,\mathrm{d}u=\mathbb{P}(W>2c/\theta_0),\qquad W\sim\chi^2(2n).$$
*[Extracteur]* D'où explicitement $c=\dfrac{\theta_0}{2}\,q^{\chi^2(2n)}_{1-\alpha}$, et le test rejette si $2\theta_0^{-1}\sum_ix_i>q^{\chi^2(2n)}_{1-\alpha}$ : c'est **le même test** qu'en Q1 (indépendant de $\theta_1$).

*Remarque sur la règle de décision (Corrigé p. 9).* Sous $\mathbb{P}_\theta$, les v.a. $X_k$ ont même espérance $\theta$. Donc $n^{-1}T(Z)$ est un estimateur de la moyenne. La règle de décision consiste donc à
- calculer un estimateur de l'espérance ;
- si cet estimateur est trop élevé, on choisit $H_1$ ; sinon, on choisit $H_0$.

Il reste à donner un sens à « estimateur trop élevé », ce que l'on fait en identifiant un seuil critique $c$ garantissant le niveau voulu du test.

**Méthodes mobilisées :**
- densité d'un $n$-échantillon (produit, par indépendance) ;
- calcul du rapport de vraisemblance et réduction à une statistique monotone (Méthode 1.1 puis Méthode 1.2 du Poly ch.5) ;
- vérification de l'absence d'atome (statistique à densité, Cadre 1.1) $\Rightarrow$ test pur ;
- **lemme / théorème de Neyman-Pearson** (Th. 1.1) ;
- vérification de la monotonie stricte du rapport (Déf. 1.4) ;
- **théorème U.P.P. unilatéral** (Th. 1.3, Méthode 1.3) ;
- additivité des lois Gamma, changement de variable $\mathrm{Gamma}(n,\theta_0^{-1})\to\chi^2(2n)$ ;
- seuil calculé **sous $\theta_0$** (borne de $H_0$) ;
- comparaison avec un test construit par **pivot** (PC 4).

**Pièges relevés / remarques du corrigé :**
- Le test de Neyman-Pearson **ne dépend pas de $\theta_1$** : c'est ce qui permet de passer de « $\theta_0$ contre $\theta_1$ » à « $\theta\le\theta_0$ contre $\theta>\theta_0$ ».
- Le seuil est lu sous $\mathbb{P}_{\theta_0}$, pas sous $\mathbb{P}_{\theta_1}$.
- Paramétrisation : $\theta$ est la **moyenne** ; « exponentielle de paramètre $1/\theta$ » = intensité $1/\theta$ ; $\sum_iX_i\sim\mathrm{Gamma}(n,\theta^{-1})$ (convention intensité).
- Le sens du rejet : $\theta$ grand $\leftrightarrow$ $\sum_ix_i$ grand (rapport croissant), donc on rejette pour les **grandes** valeurs.
- Pas de randomisation ($\gamma$ inutile) car $\sum_iX_i$ est à densité.

**Résultats numériques** *[Extracteur]* (cadre des figures : $n=10$, $\theta_0=1$, $\alpha=0.05$) :
- $q^{\chi^2(20)}_{0.95}\approx31.410$, d'où $c=\theta_0\,q^{\chi^2(20)}_{0.95}/2\approx15.705$ (cohérent avec le trait vertical des figures 1 et 3).
- Puissance $\beta_\phi(\theta)=\mathbb{P}(W>2c/\theta)$, $W\sim\chi^2(20)$ : $\beta_\phi(2)\approx0.735$ ; $\beta_\phi(0.5)\approx2.6\times10^{-6}$ ($\theta=0.5$ est dans $H_0$).

---

### Exercice 2 — Un test UPP($\alpha$) n'existe pas toujours (⋆⋆ puis ⋆⋆⋆)
**Source :** Énoncé PC5, p. 1–3 ; Corrigé PC5, « Corrigé de l'exercice 2 », p. 10–16. (= Poly ch.5, Exercice 5.)

**Énoncé complet.** Pour tout $\theta\in\mathbb{R}$, on note $p_\theta$ la densité de la loi Gaussienne $\mathrm{N}(\theta,1)$ sur $\mathbb{R}$
$$p_\theta(x):=\frac{1}{\sqrt{2\pi}}\exp\Big(-\frac12(x-\theta)^2\Big).$$
On dispose d'un $n$-échantillon $Z=(X_1,\cdots,X_n)$ du modèle statistique $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta,\ \theta\in\Theta\})$ ; et pour $\theta_0\in\Theta$, on souhaite tester au niveau $\alpha\in(0,1/2)$ les hypothèses
$$H_0:\ \theta=\theta_0,\qquad\text{contre}\qquad H_1:\ \theta\neq\theta_0.\tag{1}$$
On notera, pour tout $\alpha$, $q_\alpha$ le quantile d'ordre $\alpha$ de la loi $\mathrm{N}(0,1)$. *(Remarque en italique sur $n=1$ : voir §0.2.)*

1. Soit $\theta_1\neq\theta_0$. Établir le test du rapport de vraisemblance pour le test d'hypothèses $H_0:\theta=\theta_0$, $H_1:\theta=\theta_1$. *On pourra envisager successivement le cas $\theta_1>\theta_0$ puis le cas $\theta_1<\theta_0$. Voir la figure 2.*
2. Déterminer un test U.P.P.($\alpha$) pour $H_0:\theta=\theta_0$, $H_1:\theta>\theta_0$.
3. Montrer qu'il n'existe pas de test U.P.P.($\alpha$) pour le problème (1).
4. En mimant la forme des tests obtenus dans les questions Q.1 et Q.2, proposer un test de niveau $\alpha$ pour le problème (1). Calculer sa fonction puissance en fonction de la fonction de répartition d'une gaussienne $\mathrm{N}(0,1)$. Dans la suite, on notera $\phi^{\star,3}$ ce test.

*(Définition « sans biais » et « UMPU($\alpha$) » : voir §0.2.)*

5. Montrer qu'un test U.P.P.($\alpha$) est sans biais de niveau $\alpha$. *Il vient que tout test U.P.P.($\alpha$) est aussi UMPU($\alpha$).*
6. Soit $\phi$ une fonction critique. En observant que $\theta\mapsto\beta_\phi(\theta)$ est dérivable sur $\mathbb{R}$, montrer que si $\beta_\phi(\theta_0)\le\alpha$ et $\beta_\phi\ge\alpha$ dans un voisinage de $\theta_0$, alors
$$\beta_\phi(\theta_0)=\alpha,\qquad\beta'_\phi(\theta_0)=0.\tag{2}$$
*Il vient qu'un test sans biais de niveau $\alpha$ pour le problème (1) vérifie ces conditions.*
7. Montrer que la fonction puissance du test $\phi^{\star,3}$ vérifie $\beta_{\phi^{\star,3}}(\theta)\ge\alpha$ pour tout $\theta\in\mathbb{R}$, et par suite les conditions (2). *$\phi^{\star,3}$ est donc sans biais de niveau $\alpha$.*
8. L'objectif de cette question est de montrer que le test $\phi^{\star,3}$ est UMPU($\alpha$) pour le problème (1). Pour ce faire, on pose
$$f_1(z):=p^n_{\theta_0}(z),\qquad f_2(z):=\partial_\theta p^n_\theta(z)\big|_{\theta=\theta_0},\qquad f_{3,\theta}(z):=p^n_\theta(z);$$
$p^n_\theta$ désigne la densité de l'observation $Z$ dans le modèle $p_\theta$.
   (a) Montrer que pour tout $\theta\neq\theta_0$, et $\kappa_1,\kappa_2\in\mathbb{R}$, nous avons
$$\Big\{z\in\mathbb{R}^n:\ \frac{f_{3,\theta}(z)}{f_1(z)}>\kappa_1+\kappa_2\frac{f_2(z)}{f_1(z)}\Big\}=\Big\{z\in\mathbb{R}^n:\ \exp\Big((\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big)>\exp\big(n(\theta-\theta_0)^2/2\big)\,\kappa_1+\frac{\exp\big(n(\theta-\theta_0)^2/2\big)}{\theta-\theta_0}\,\kappa_2(\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big\}.$$
   (b) En déduire que pour tout $\theta\neq\theta_0$, il existe $\kappa_{1,\theta}$ et $\kappa_{2,\theta}$ tels que :
$$\{z,\ \phi^{\star,3}(z)=1\}=\{z:\ f_{3,\theta}(z)>\kappa_{1,\theta}f_1(z)+\kappa_{2,\theta}f_2(z)\}.$$
   (c) Pour toute fonction critique $\phi:\mathbb{R}^n\to[0,1]$ et tout $\theta\neq\theta_0$, on définit
$$I_\theta(\phi):=\int_{\mathbb{R}^n}\phi(z)\,\big(f_{3,\theta}(z)-\kappa_{1,\theta}f_1(z)-\kappa_{2,\theta}f_2(z)\big)\,\mathrm{d}z.$$
   Montrer que pour tout $\theta\neq\theta_0$, $\phi^{\star,3}\in\arg\max_\phi I_\theta(\phi)$. On s'inspirera de la démonstration du théorème de Neyman-Pearson pour l'optimalité du test du rapport de vraisemblance dans le cas de deux hypothèses simples.
   (d) En déduire que pour toute fonction critique $\phi$ vérifiant les conditions (2), on a pour tout $\theta\neq\theta_0$, $\beta_{\phi^{\star,3}}(\theta)\ge\beta_\phi(\theta)$.
   (e) Conclure.

*Figure 2 (énoncé) :* dans le cas $n=10$ et $\theta_0=0$, on trace la densité de $n^{-1}\sum_{i=1}^nX_i-\theta_0$ sous $p_{\theta_0}$ en rouge ; puis la densité de $n^{-1}\sum_{i=1}^nX_i$ sous $p_{\theta_1}$ dans le cas $\theta_1=0.5$ (courbe verte) et le cas $\theta_1=-1$ (courbe bleue). Les deux traits verticaux correspondent aux droites d'équations $x=q_\alpha/\sqrt n$ et $x=q_{1-\alpha}/\sqrt n$ en prenant $\alpha=0.05$.

**Corrigé complet (Corrigé PC5, p. 10–16).** $p^n_\theta$ désigne la densité de l'observation $Z$ dans le modèle $p_\theta$.

*Q1.* Soit $\theta_1\neq\theta_0$. On considère le test
$$H_0:\theta=\theta_0\qquad H_1:\theta=\theta_1.\tag{6}$$
Pour tout $\theta\in\mathbb{R}$ (densité produit, par indépendance),
$$p^n_\theta(z)=\frac{1}{\sqrt{2\pi}^n}\exp\Big(-\frac12\sum_{i=1}^n(x_i-\theta)^2\Big),\qquad z=(x_1,\cdots,x_n).$$
Le rapport de vraisemblance est donc (coquille 4 corrigée)
$$r(z)=\exp\Big(-\frac12\sum_{i=1}^n(x_i-\theta_1)^2+\frac12\sum_{i=1}^n(x_i-\theta_0)^2\Big),$$
ce qui après réordonnement des termes est aussi égal à
$$r(z)=\exp\Big(-\frac n2(\theta_1-\theta_0)^2+(\theta_1-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big).$$
*[Extracteur, calcul]* $-\frac12\sum(x_i-\theta_1)^2+\frac12\sum(x_i-\theta_0)^2=(\theta_1-\theta_0)\sum_ix_i-\frac n2(\theta_1^2-\theta_0^2)=(\theta_1-\theta_0)\sum_i(x_i-\theta_0)-\frac n2(\theta_1-\theta_0)^2$.

La recette « Neyman-Pearson » nécessite de comprendre les ensembles de la forme $\{z:\ r(z)>c\}$, en particulier pour calculer leur probabilité et déterminer le seuil critique. Par stricte croissance de l'exponentielle, $\{z:\ r(z)>c\}$ est un ensemble de la forme $\{z:\ (\theta_1-\theta_0)\sum_{i=1}^n(x_i-\theta_0)>\tilde c\}$. Le test du rapport de vraisemblance est donné par
$$\phi^{\star,1}(Z)=\begin{cases}1 & \text{si }Z\in\{z:\ (\theta_1-\theta_0)\sum_{i=1}^n(x_i-\theta_0)>c\},\\ \gamma & \text{si }Z\in\{z:\ (\theta_1-\theta_0)\sum_{i=1}^n(x_i-\theta_0)=c\},\\ 0 & \text{si }Z\in\{z:\ (\theta_1-\theta_0)\sum_{i=1}^n(x_i-\theta_0)<c\},\end{cases}$$
pour $\gamma,c$ vérifiant
$$\alpha=\gamma\,\mathbb{P}_{\theta_0}\Big((\theta_1-\theta_0)\sum_{i=1}^n(x_i-\theta_0)=c\Big)+\mathbb{P}_{\theta_0}\Big((\theta_1-\theta_0)\sum_{i=1}^n(x_i-\theta_0)>c\Big).$$
Sous $p_{\theta_0}$, $\sum_{i=1}^n(X_i-\theta_0)\sim\mathrm{N}(0,n)$, soit encore $\sum_{i=1}^n(X_i-\theta_0)/\sqrt n\sim\mathrm{N}(0,1)$. Par suite $\mathbb{P}_{\theta_0}\big((\theta_1-\theta_0)\sum_{i=1}^n(X_i-\theta_0)=c\big)=0$ et on pose $\gamma=0$ ($\phi^{\star,1}(Z)$ prend cette valeur avec probabilité zéro, donc toute valeur convient pour $\gamma$). On cherche donc le seuil $c$ tel que
$$\mathbb{P}_{\theta_0}\Big((\theta_1-\theta_0)\sum_{i=1}^n(X_i-\theta_0)>c\Big)=\alpha.\tag{7}$$
Il faut distinguer deux cas, selon le signe de $\theta_1-\theta_0$ : la forme de la zone $\{z:\ \phi^{\star,1}(z)=1\}$ en dépend, et la définition du seuil $c$ aussi.

- *Cas $\theta_1>\theta_0$.* On a $\{z:\ (\theta_1-\theta_0)\sum_{i=1}^n(X_i-\theta_0)>c\}=\{z:\ \sum_{i=1}^n(X_i-\theta_0)>\tilde c\}$ et la condition (7) entraîne $\tilde c=\sqrt n\,q_{1-\alpha}$ (coquille 5). Règle de décision :
$$\phi^{\star,1}(Z)=\begin{cases}1 & \text{si }Z\in\{z:\ \sum_{i=1}^n(x_i-\theta_0)>\sqrt n\,q_{1-\alpha}\},\\ 0 & \text{si }Z\in\{z:\ \sum_{i=1}^n(x_i-\theta_0)<\sqrt n\,q_{1-\alpha}\},\end{cases}$$
qui se réécrit
$$\phi^{\star,1}(Z)=\mathbb{1}\Big\{Z:\ n^{-1}\sum_{i=1}^nX_i>\theta_0+\frac{q_{1-\alpha}}{\sqrt n}\Big\}.$$
- *Cas $\theta_1<\theta_0$.* De façon analogue (la division par $\theta_1-\theta_0<0$ renverse l'inégalité) :
$$\phi^{\star,2}(Z)=\begin{cases}1 & \text{si }Z\in\{z:\ \sum_{i=1}^n(x_i-\theta_0)<\sqrt n\,q_\alpha\},\\ 0 & \text{si }Z\in\{z:\ \sum_{i=1}^n(x_i-\theta_0)>\sqrt n\,q_\alpha\},\end{cases}$$
qui se réécrit, en notant que $q_\alpha=-q_{1-\alpha}<0$ (car $\alpha\in]0,1/2[$),
$$\phi^{\star,2}(Z)=\mathbb{1}\Big\{Z:\ n^{-1}\sum_{i=1}^nX_i<\theta_0-\frac{q_{1-\alpha}}{\sqrt n}\Big\}.$$

*Interprétons ces deux tests.* Ils comparent la valeur de la moyenne empirique $n^{-1}\sum_{i=1}^nX_i$ à $\theta_0$ ; si on en est trop loin (par valeur supérieure dans le premier cas, par valeur inférieure dans le second cas), on rejette l'hypothèse nulle. Une seconde remarque d'importance est que **ces tests ne dépendent pas de $\theta_1$**.

*Fonctions puissance.* La fonction puissance est $\theta\mapsto\beta_\phi(\theta):=\mathbb{E}_\theta[\phi(Z)]$. Pour $\phi=\phi^{\star,2}$ (centrage-réduction sous $\mathbb{P}_\theta$ : $\sqrt n(n^{-1}\sum_iX_i-\theta)\sim\mathrm{N}(0,1)$) :
$$\beta_{\phi^{\star,2}}(\theta)=\mathbb{P}_\theta\Big(n^{-1}\sum_{i=1}^nX_i<\theta_0-\frac{q_{1-\alpha}}{\sqrt n}\Big)=\mathbb{P}_\theta\Big(\sqrt n\Big(n^{-1}\sum_{i=1}^nX_i-\theta\Big)<\sqrt n(\theta_0-\theta)-q_{1-\alpha}\Big)=\mathbb{P}\big(W<\sqrt n(\theta_0-\theta)-q_{1-\alpha}\big),$$
où $W\sim\mathrm{N}(0,1)$. De même,
$$\beta_{\phi^{\star,1}}(\theta)=\mathbb{P}\big(W>\sqrt n(\theta_0-\theta)+q_{1-\alpha}\big).$$
La figure 4 [gauche] trace ces deux fonctions puissance pour $\theta\in[-2,2]$ dans le cas $n=10$, $\theta_0=0$ et $\alpha=0.05$. On remarque que $\beta_\phi(\theta_0)=\alpha$ — conséquence du niveau d'un test UPP($\alpha$) — et que la fonction puissance pour $\theta\neq\theta_0$ n'est pas toujours minorée par ce niveau $\alpha$ : **ces tests sont donc biaisés** (notion vue dans la suite de l'exercice).

*Figure 4 (corrigé) :* [gauche] fonctions puissance de $\phi^{\star,1}$ (« à droite », croissante de $0$ à $1$) et $\phi^{\star,2}$ (« à gauche », décroissante de $1$ à $0$), $n=10$, $\alpha=0.05$, $\theta_0=0$ ; [droite] on trace aussi la fonction puissance de $\phi^{\star,3}$ (« bilatéral », en U, minimum $\alpha$ en $\theta_0=0$, en dessous de chacune des courbes unilatérales de son côté).

*Q2.* Cette fois on teste
$$H_0:\theta=\theta_0\qquad H_1:\theta>\theta_0.\tag{8}$$
On cherche un test UPP($\alpha$) ; deux façons de répondre.
- **Méthode 1.** On applique la méthode de Neyman-Pearson en vérifiant que nous sommes dans le contexte du rapport de vraisemblance monotone (« théorème I-5.16 » = **Th. 1.3 du Poly ch.5** ; le modèle $\mathrm{N}(\theta,1)$ est à r.v. monotone, Ex. 1.4 du Poly ch.5). On trouve le même qu'à la question précédente dans le cas $\theta_1>\theta_0$ :
$$\phi^{\star,1}(Z)=\mathbb{1}\Big\{Z:\ n^{-1}\sum_{i=1}^nX_i>\theta_0+\frac{q_{1-\alpha}}{\sqrt n}\Big\}.$$
- **Méthode 2.** On a montré à la question précédente pour $\phi^{\star,1}$ que pour $\theta_1>\theta_0$ :
  - niveau : $\beta_{\phi^{\star,1}}(\theta_0)=\alpha$ ;
  - plus puissant : pour toute fonction critique $\phi$ telle que $\beta_\phi(\theta_0)\le\alpha$, $\beta_\phi(\theta_1)\le\beta_{\phi^{\star,1}}(\theta_1)$.

  Le test $\phi^{\star,1}$ ne dépendant pas de $\theta_1$, on a donc : niveau $\beta_{\phi^{\star,1}}(\theta_0)=\alpha$ ; plus puissant : pour toute fonction critique $\phi$ telle que $\beta_\phi(\theta_0)\le\alpha$, **pour tout** $\theta_1>\theta_0$, $\beta_\phi(\theta_1)\le\beta_{\phi^{\star,1}}(\theta_1)$. C'est la définition d'un test UPP pour le problème (8) (Déf. 1.2 du Poly ch.5).

Par symétrie, le test $\phi^{\star,2}$ trouvé à la question précédente est UPP($\alpha$) pour
$$H_0:\theta=\theta_0\qquad H_1:\theta<\theta_0.\tag{9}$$

*Q3. Raisonnement par l'absurde.* Supposons qu'il existe un test UPP($\alpha$) $\phi^\star$ pour
$$H_0:\theta=\theta_0\qquad H_1:\theta\neq\theta_0.\tag{10}$$
Alors ce test est aussi UPP($\alpha$) pour le problème (6) dans le cas $\theta_1>\theta_0$ ; et il l'est aussi pour le problème (6) dans le cas $\theta_1<\theta_0$. L'**unicité des tests UPP($\alpha$)** (« théorème I-5.5 » = **Th. 1.2 du Poly ch.5**) entraîne d'une part
$$\phi^\star(Z)=\begin{cases}1 & \text{si }Z\in\{z:\ n^{-1}\sum_{i=1}^nx_i>\theta_0+q_{1-\alpha}/\sqrt n\},\\ 0 & \text{si }Z\in\{z:\ n^{-1}\sum_{i=1}^nx_i<\theta_0+q_{1-\alpha}/\sqrt n\},\end{cases}$$
et d'autre part
$$\phi^\star(Z)=\begin{cases}1 & \text{si }Z\in\{z:\ n^{-1}\sum_{i=1}^nx_i<\theta_0-q_{1-\alpha}/\sqrt n\},\\ 0 & \text{si }Z\in\{z:\ n^{-1}\sum_{i=1}^nx_i>\theta_0-q_{1-\alpha}/\sqrt n\}.\end{cases}$$
Ceci donne une contradiction, puisque sur l'ensemble $\{z:\ n^{-1}\sum_{i=1}^nx_i>\theta_0+q_{1-\alpha}/\sqrt n\}$ par exemple, on a à la fois $\phi^\star=1$ et $\phi^\star=0$. *[Extracteur]* L'unicité du Th. 1.2 n'est que presque partout ; la contradiction vient de ce que cet ensemble est de probabilité $\alpha>0$ sous $\mathbb{P}_{\theta_0}$ (non négligeable) — c'est exactement la preuve de la Prop. 1.1 du Poly ch.5 / Ex. 1.6.

*Q4. Test bilatéral.* Un test naturel pour le problème (10) est la règle
$$\phi^{\star,3}(Z)=\mathbb{1}\Big\{Z:\ \Big|n^{-1}\sum_{i=1}^nX_i-\theta_0\Big|>c\Big\},$$
où $c$ est choisi pour garantir le niveau du test. On trouve $c=q_{1-\alpha/2}/\sqrt n$. L'expression de la fonction puissance de ce test est
$$\beta_{\phi^{\star,3}}(\theta)=1-\Phi\big(q_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\big)+\Phi\big(-q_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\big),$$
où $\Phi$ est la fonction de répartition d'une loi $\mathrm{N}(0,1)$.

*[Extracteur, étapes non écrites dans le corrigé]* Sous $\mathbb{P}_{\theta_0}$, $\sqrt n(n^{-1}\sum_iX_i-\theta_0)\sim\mathrm{N}(0,1)$, donc $\mathbb{P}_{\theta_0}(|n^{-1}\sum_iX_i-\theta_0|>c)=2(1-\Phi(\sqrt n\,c))=\alpha\iff\sqrt n\,c=q_{1-\alpha/2}$. Sous $\mathbb{P}_\theta$, avec $W:=\sqrt n(n^{-1}\sum_iX_i-\theta)\sim\mathrm{N}(0,1)$, $\{|n^{-1}\sum_iX_i-\theta_0|>c\}=\{W>q_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\}\cup\{W<-q_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\}$ (union disjointe), d'où la formule.

La fonction puissance de ce test est tracée sur la figure 4 [droite] ; on visualise que ce test n'est pas UPP($\alpha$) — et tant mieux, puisqu'on a démontré qu'il n'en existait pas — puisque $\phi^{\star,1}$ (resp. $\phi^{\star,2}$) a une meilleure puissance pour $\theta>\theta_0$ (resp. $\theta<\theta_0$).

*Q5. U.P.P. $\Rightarrow$ sans biais.* La fonction puissance d'un test UPP($\alpha$) domine la fonction puissance de tout test de niveau $\alpha$, dont en particulier celle de la règle de décision associée à la fonction critique $\bar\phi(Z)=\alpha$ pour tout $Z$ ; la puissance de ce test $\bar\phi$ vaut $\alpha$ pour tout $\theta$. Donc la fonction puissance d'un test UPP($\alpha$) est minorée par $\alpha$. (= Poly ch.5, compléments, Prop. 4.1 ; même argument que l'étape 9 de la preuve du Th. 1.1.)

*Q6. Conditions nécessaires (2).* Par application du **théorème de convergence dominée**, on peut montrer que pour toute fonction critique $\phi$ (i.e. toute fonction mesurable $\phi:\mathbb{R}^n\to[0,1]$), la fonction $\theta\mapsto\beta_\phi(\theta)$ est continue et dérivable, et
$$\beta'_\phi(\theta)=\int_{\mathbb{R}^n}\phi(z)\,\partial_\theta\log p^n(z,\theta)\,p^n_\theta(z)\,\mathrm{d}z.$$
(La justification de la domination n'est **pas détaillée** dans le corrigé.)
- Puisqu'elle est continue (limite prise le long de $\theta\neq\theta_0$ dans le voisinage où $\beta_\phi\ge\alpha$) :
$$\alpha\le\lim_{\theta\to\theta_0}\beta_\phi(\theta)=\beta_\phi(\theta_0)\le\alpha,$$
ce qui entraîne $\beta_\phi(\theta_0)=\alpha$.
- On a donc $\beta_\phi(\theta_0)=\alpha$ et $\beta_\phi(\theta)\ge\alpha$ dans un voisinage de $\theta_0$ : $\theta_0$ est un minimum local ; la fonction puissance étant dérivable, cela entraîne (**caractérisation d'un minimum**, condition d'Euler) $\beta'_\phi(\theta_0)=0$.

*Q7. $\phi^{\star,3}$ vérifie (2).* La fonction puissance de $\phi^{\star,3}$ évaluée en $\theta_0$ donne (voir Q4)
$$\beta_{\phi^{\star,3}}(\theta_0)=1-\Phi(q_{1-\alpha/2})+\Phi(-q_{1-\alpha/2})=1-1+\alpha/2+\alpha/2=\alpha.$$
Sa dérivée vaut (dérivation de $\Phi$, $\Phi'=f_{0,1}$, et de $\theta\mapsto\sqrt n(\theta_0-\theta)$ de dérivée $-\sqrt n$)
$$\beta'_{\phi^{\star,3}}(\theta)=-\sqrt n\Big(-f_{0,1}\big(q_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\big)+f_{0,1}\big(-q_{1-\alpha/2}+\sqrt n(\theta_0-\theta)\big)\Big),$$
où $f_{0,1}$ est la densité d'une loi $\mathrm{N}(0,1)$. Évaluée en $\theta=\theta_0$ :
$$\beta'_{\phi^{\star,3}}(\theta_0)=-\sqrt n\big(-f_{0,1}(q_{1-\alpha/2})+f_{0,1}(-q_{1-\alpha/2})\big)=0,$$
puisque $f_{0,1}(u)=f_{0,1}(-u)$ (parité).

*[Extracteur]* Le corrigé **ne démontre pas explicitement** la minoration $\beta_{\phi^{\star,3}}(\theta)\ge\alpha$ pour tout $\theta$ demandée par l'énoncé. Complément : en posant $\delta:=\sqrt n(\theta_0-\theta)$ et $q:=q_{1-\alpha/2}>0$, $g(\delta):=1-\Phi(q+\delta)+\Phi(-q+\delta)$ a pour dérivée $g'(\delta)=f_{0,1}(\delta-q)-f_{0,1}(\delta+q)$, qui est $>0$ pour $\delta>0$ (car $|\delta-q|<|\delta+q|$ et $f_{0,1}$ décroît en $|u|$) et $<0$ pour $\delta<0$ ; donc $g$ est minimale en $\delta=0$, où $g(0)=\alpha$. D'où $\beta_{\phi^{\star,3}}\ge\alpha$ partout.

*Q8(a).* On a (calcul direct ; $f_2$ s'obtient en dérivant l'exponentielle par rapport à $\theta$ en $\theta_0$)
$$f_1(z)=\frac{1}{\sqrt{2\pi}^n}\exp\Big(-\frac12\sum_{i=1}^n(x_i-\theta_0)^2\Big),\qquad f_2(z)=\sum_{i=1}^n(x_i-\theta_0)\,f_1(z),\qquad f_{3,\theta}(z)=\frac{1}{\sqrt{2\pi}^n}\exp\Big(-\frac12\sum_{i=1}^n(x_i-\theta)^2\Big).$$
On observe donc que
$$\begin{aligned}\frac{f_{3,\theta}(z)}{f_1(z)}&=\exp\Big(-\frac12\sum_{i=1}^n(x_i-\theta)^2+\frac12\sum_{i=1}^n(x_i-\theta_0)^2\Big)=\exp\Big((\theta-\theta_0)\sum_{i=1}^nx_i-\frac n2(\theta^2-\theta_0^2)\Big)\\&=\exp\Big((\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)-\frac n2\big(\theta^2-\theta_0^2-2\theta_0(\theta-\theta_0)\big)\Big)=\exp\Big((\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)-\frac n2(\theta-\theta_0)^2\Big).\end{aligned}$$
On décrit alors l'ensemble demandé (multiplication des deux membres par $\exp(\frac n2(\theta-\theta_0)^2)>0$, puis écriture $\kappa_2\sum_i(x_i-\theta_0)=\frac{\kappa_2}{\theta-\theta_0}(\theta-\theta_0)\sum_i(x_i-\theta_0)$, licite car $\theta\neq\theta_0$) :
$$\begin{aligned}A&:=\Big\{z\in\mathbb{R}^n:\ \frac{f_{3,\theta}(z)}{f_1(z)}>\kappa_1+\kappa_2\frac{f_2(z)}{f_1(z)}\Big\}\\&=\Big\{z\in\mathbb{R}^n:\ \exp\Big((\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)-\frac n2(\theta-\theta_0)^2\Big)>\kappa_1+\kappa_2\sum_{i=1}^n(x_i-\theta_0)\Big\}\\&=\Big\{z\in\mathbb{R}^n:\ \exp\Big((\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big)>\kappa_1\exp\Big(\frac n2(\theta-\theta_0)^2\Big)+\kappa_2\frac{\exp\big(\frac n2(\theta-\theta_0)^2\big)}{\theta-\theta_0}(\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big\}.\end{aligned}$$
On obtient la relation demandée.

*Q8(b).* D'après la question précédente, en définissant $\gamma_{1,\theta}$ et $\gamma_{2,\theta}$, indépendantes de $z$ :
$$\gamma_{1,\theta}=\kappa_1\exp\Big(\frac n2(\theta-\theta_0)^2\Big)\qquad\text{et}\qquad\gamma_{2,\theta}=\kappa_2\frac{\exp\big(\frac n2(\theta-\theta_0)^2\big)}{\theta-\theta_0},\tag{11}$$
on a
$$\Big\{z\in\mathbb{R}^n:\ \frac{f_{3,\theta}(z)}{f_1(z)}>\kappa_1+\kappa_2\frac{f_2(z)}{f_1(z)}\Big\}=\Big\{z\in\mathbb{R}^n:\ \exp\Big((\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big)>\gamma_{1,\theta}+\gamma_{2,\theta}(\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big\}.$$
D'autre part, on a vu dans la construction de $\phi^{\star,3}$ que
$$\{z\in\mathbb{R}^n:\ \phi^{\star,3}(z)=1\}=\Big\{z:\ \Big|\sum_{i=1}^n(x_i-\theta_0)\Big|\ge C\Big\}$$
pour une constante $C$ (*[Extracteur]* $C=\sqrt n\,q_{1-\alpha/2}$ ; le « $\ge$ » au lieu de « $>$ » ne change rien, frontière négligeable). Et quel que soit le signe de $\theta-\theta_0$ (multiplication par $|\theta-\theta_0|>0$) :
$$\{z\in\mathbb{R}^n:\ \phi^{\star,3}(z)=1\}=\Big\{z:\ \Big|(\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)\Big|\ge c|\theta-\theta_0|\Big\}$$
(ici $c$ désigne la constante $C$, cf. coquille 6). **Fixons $\theta\in\mathbb{R}$** et notons $t(z)=(\theta-\theta_0)\sum_{i=1}^n(x_i-\theta_0)$ : il faut démontrer que $\{z\in\mathbb{R}^n:\ t(z)\notin[-c|\theta-\theta_0|,c|\theta-\theta_0|]\}$ s'écrit sous la forme proposée.

En utilisant la **convexité de la fonction exponentielle**, $t\mapsto\exp(t)$ est en dessous de ses cordes. Considérons en particulier la droite passant par les points $(-c|\theta-\theta_0|,\exp(-c|\theta-\theta_0|))$ et $(c|\theta-\theta_0|,\exp(c|\theta-\theta_0|))$, d'équation $t\longmapsto a_\theta+b_\theta t$ ; alors
$$\{t\in\mathbb{R}:\ |t|>c|\theta-\theta_0|\}=\{t\in\mathbb{R}:\ \exp(t)>a_\theta+b_\theta t\}.$$
*[Extracteur]* (stricte convexité : l'exponentielle est strictement sous la corde entre les deux points, strictement au-dessus de la droite à l'extérieur.)
D'après l'équation (11) donnant $\gamma_{1,\theta}$, $\gamma_{2,\theta}$ en fonction de $\kappa_1,\kappa_2$, et comme $\theta\neq\theta_0$, pour les choix
$$\kappa_{1,\theta}=a_\theta\exp\Big(-\frac n2(\theta-\theta_0)^2\Big)\qquad\text{et}\qquad\kappa_{2,\theta}=b_\theta(\theta-\theta_0)\exp\Big(-\frac n2(\theta-\theta_0)^2\Big),$$
on obtient $a_\theta=\gamma_{1,\theta}$ et $b_\theta=\gamma_{2,\theta}$. Ainsi, pour tout $\theta\neq\theta_0$, il existe $(\kappa_{1,\theta},\kappa_{2,\theta})$ tel que
$$\{z\in\mathbb{R}^n:\ \phi^{\star,3}(z)=1\}=\Big\{z\in\mathbb{R}^n:\ \frac{f_{3,\theta}(z)}{f_1(z)}>\kappa_{1,\theta}+\kappa_{2,\theta}\frac{f_2(z)}{f_1(z)}\Big\},$$
ce qui (multiplication par $f_1>0$) est la forme demandée. *Remarque du corrigé :* si l'ensemble de gauche ne dépend pas de $\theta$, il correspond en réalité, pour un jeu de coefficients $\kappa_1$ et $\kappa_2$ bien choisis dépendant de $\theta$, à seuiller le rapport de vraisemblance $\frac{f_{3,\theta}(z)}{f_1(z)}$.

*Q8(c). Optimisation à la Neyman-Pearson.* Soit $\phi$ une fonction critique ; on considère la partition de l'espace en $\{f_{3,\theta}>\kappa_{1,\theta}f_1+\kappa_{2,\theta}f_2\}$ et $\{f_{3,\theta}<\kappa_{1,\theta}f_1+\kappa_{2,\theta}f_2\}$ (*[Extracteur]* l'ensemble d'égalité est Lebesgue-négligeable ici, d'où l'oubli) :
$$\begin{aligned}I_\theta(\phi^{\star,3})-I_\theta(\phi)&=\int_{f_{3,\theta}-\kappa_{1,\theta}f_1-\kappa_{2,\theta}f_2>0}\big(\phi^{\star,3}-\phi(z)\big)\big(f_{3,\theta}(z)-\kappa_{1,\theta}f_1(z)-\kappa_{2,\theta}f_2(z)\big)\,\mathrm{d}z\\&\quad+\int_{f_{3,\theta}-\kappa_{1,\theta}f_1-\kappa_{2,\theta}f_2<0}\big(\phi^{\star,3}-\phi(z)\big)\big(f_{3,\theta}(z)-\kappa_{1,\theta}f_1(z)-\kappa_{2,\theta}f_2(z)\big)\,\mathrm{d}z\\&=\int_{f_{3,\theta}-\kappa_{1,\theta}f_1-\kappa_{2,\theta}f_2>0}(1-\phi(z))\big(f_{3,\theta}(z)-\kappa_{1,\theta}f_1(z)-\kappa_{2,\theta}f_2(z)\big)\,\mathrm{d}z\\&\quad+\int_{f_{3,\theta}-\kappa_{1,\theta}f_1-\kappa_{2,\theta}f_2<0}(-\phi(z))\big(f_{3,\theta}(z)-\kappa_{1,\theta}f_1(z)-\kappa_{2,\theta}f_2(z)\big)\,\mathrm{d}z\ \ge\ 0.\end{aligned}$$
La deuxième égalité utilise Q8(b) ($\phi^{\star,3}=1$ sur le premier ensemble, $0$ sur le second) ; la dernière inégalité utilise le fait que, par définition, $\phi\in[0,1]$ (les deux intégrandes sont $\ge0$). C'est l'**inégalité clé (1)** de la preuve du Th. 1.1 du Poly ch.5, avec $p_{\theta_1}-c_\alpha p_{\theta_0}$ remplacé par $f_{3,\theta}-\kappa_{1,\theta}f_1-\kappa_{2,\theta}f_2$.

*Q8(d).* Considérons un test sans biais de fonction critique $\phi$ vérifiant les conditions (2) :
$$I_\theta(\phi)=\beta_\phi(\theta)-\kappa_{1,\theta}\beta_\phi(\theta_0)-\kappa_{2,\theta}\beta'_\phi(\theta_0)=\beta_\phi(\theta)-\kappa_{1,\theta}\alpha.$$
En effet (linéarité de l'intégrale) l'intégrale sous $f_1$ correspond à $\beta_\phi(\theta_0)=\alpha$ ; l'intégrale sous $f_2$ correspond à $\beta'_\phi(\theta_0)=0$ (formule de dérivation de Q6, puisque $\partial_\theta\log p^n_\theta\cdot p^n_\theta=\partial_\theta p^n_\theta$) ; et celle sous $f_{3,\theta}$ correspond à $\beta_\phi(\theta)$. La fonction $\phi^{\star,3}$ vérifie aussi les conditions (2) d'après Q7. La question précédente donne donc
$$\beta_{\phi^{\star,3}}(\theta)-\kappa_{1,\theta}\alpha\ge\beta_\phi(\theta)-\kappa_{1,\theta}\alpha,\qquad\forall\theta\neq\theta_0,$$
ce qui établit le résultat demandé.

*Q8(e). Conclusion.* D'après Q7, $\phi^{\star,3}$ est un test sans biais de niveau $\alpha$. D'après Q8(d), sa fonction puissance domine (pour tout $\theta\in\mathbb{R}$) celle de toute fonction critique $\phi$ vérifiant les conditions (2), et donc en particulier, d'après Q6, celle de toute fonction critique $\phi$ sans biais de niveau $\alpha$. En conclusion, **$\phi^{\star,3}$ est UMPU($\alpha$) pour le problème (1)**.

**Méthodes mobilisées :**
- densité d'un $n$-échantillon gaussien, développement du carré, rapport de vraisemblance ;
- **lemme de Neyman-Pearson** (Th. 1.1 du Poly ch.5) avec discussion selon le signe de $\theta_1-\theta_0$ ;
- absence d'atome $\Rightarrow$ $\gamma=0$ ; seuil calculé sous $\mathbb{P}_{\theta_0}$ par centrage-réduction ($\sum_i(X_i-\theta_0)\sim\mathrm{N}(0,n)$) ;
- calcul de **fonctions puissance** via $\Phi$ ;
- passage simple $\to$ composite unilatéral par **indépendance du test vis-à-vis de $\theta_1$** (deux méthodes : r.v. monotone / Th. 1.3, ou directement par la définition U.P.P.) ;
- **raisonnement par l'absurde + unicité** des tests U.P.P. (Th. 1.2, Prop. 1.1, Ex. 1.6 du poly) ;
- comparaison avec le **test constant $\bar\phi\equiv\alpha$** (U.P.P. $\Rightarrow$ sans biais) ;
- **convergence dominée** (continuité, dérivation sous l'intégrale), **condition du premier ordre** en un minimum local ;
- parité de $f_{0,1}$ ;
- **convexité de l'exponentielle** (fonction sous ses cordes) pour réécrire une région bilatérale comme région de type Neyman-Pearson généralisé ;
- **inégalité clé à la Neyman-Pearson** sur une fonctionnelle linéaire $I_\theta$ (optimisation linéaire sous deux contraintes, multiplicateurs $\kappa_{1,\theta},\kappa_{2,\theta}$).

**Pièges relevés / remarques du corrigé :**
- Les tests $\phi^{\star,1}$, $\phi^{\star,2}$ **ne dépendent pas de $\theta_1$** mais dépendent du **signe** de $\theta_1-\theta_0$ : d'où l'impossibilité d'un U.P.P. bilatéral.
- Les tests unilatéraux sont **biaisés** pour l'alternative bilatérale : $\beta_{\phi^{\star,2}}(\theta)<\alpha$ pour $\theta>\theta_0$.
- $\phi^{\star,3}$ n'est **pas** U.P.P. (il est battu à droite par $\phi^{\star,1}$ et à gauche par $\phi^{\star,2}$) ; il est seulement **U.M.P.U.**
- $\alpha\in(0,1/2)$ sert à garantir $q_\alpha=-q_{1-\alpha}<0$.
- Bilatéral : quantile $q_{1-\alpha/2}$ (et non $q_{1-\alpha}$).
- Q6 : la continuité seule donne $\beta_\phi(\theta_0)=\alpha$ ; il faut la **dérivabilité** pour $\beta'_\phi(\theta_0)=0$.
- Q8 : les coefficients $\kappa_{1,\theta},\kappa_{2,\theta}$ **dépendent de $\theta$** mais la région de rejet de $\phi^{\star,3}$ n'en dépend pas : c'est le même mécanisme que « le test ne dépend pas de $\theta_1$ » dans le cas unilatéral.
- Q8(d) : $\kappa_{1,\theta}$ peut être de signe quelconque, mais il n'intervient pas car $\beta_\phi(\theta_0)=\beta_{\phi^{\star,3}}(\theta_0)=\alpha$ (égalité, pas seulement inégalité).

**Résultats numériques** *[Extracteur]* ($n=10$, $\theta_0=0$, $\alpha=0.05$, cadre des figures 2 et 4) :
- $q_{0.95}\approx1.6449$, $q_{0.975}\approx1.9600$ ; seuils sur la moyenne : $q_{0.95}/\sqrt{10}\approx0.520$ (unilatéral), $q_{0.975}/\sqrt{10}\approx0.620$ (bilatéral).
- Puissances :

| $\theta$ | $\beta_{\phi^{\star,1}}$ (à droite) | $\beta_{\phi^{\star,2}}$ (à gauche) | $\beta_{\phi^{\star,3}}$ (bilatéral) |
|---|---|---|---|
| $-1$ | $\approx7.7\times10^{-7}$ | $\approx0.935$ | $\approx0.885$ |
| $-0.5$ | $\approx0.0006$ | $\approx0.475$ | $\approx0.353$ |
| $0$ | $0.05$ | $0.05$ | $0.05$ |
| $0.5$ | $\approx0.475$ | $\approx0.0006$ | $\approx0.353$ |
| $1$ | $\approx0.935$ | $\approx7.7\times10^{-7}$ | $\approx0.885$ |

---

### Exercice 3 — Exponentielle translatée (⋆⋆⋆)
**Source :** Énoncé PC5, p. 3–4 (exercice sans titre) ; Corrigé PC5, « **Corrigé de l'Exercice 5** », p. 22–23. (= Poly ch.5, Exercice 4.)

**Énoncé complet.** Soit $Z=(X_1,\dots,X_n)$ un $n$-échantillon du modèle $(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),(\mathbb{P}_\theta)_{\theta\in\Theta})$, où $\Theta=\mathbb{R}$ et, pour tout $\theta\in\Theta$, $\mathbb{P}_\theta$ est la loi de densité
$$p(\theta,x)=e^{-(x-\theta)}\mathbb{1}_{]\theta,\infty[}(x).$$
Pour $(x_1,\dots,x_n)\in\mathbb{R}^n$, on pose $x_{1:n}=\min(x_1,\dots,x_n)$. Soit $\theta_0<\theta_1$. Pour $\alpha\in\,]0,1[$, on considère les hypothèses
$$H_0:\ \theta=\theta_0,\qquad\text{contre}\qquad H_1:\ \theta=\theta_1.$$
1. Montrer que le rapport de vraisemblance est donné, pour tout $(x_1,\dots,x_n)$ tel que $x_{1:n}>\theta_0$, par
$$\frac{p(\theta_1;x_1,\dots,x_n)}{p(\theta_0;x_1,\dots,x_n)}=\begin{cases}e^{n(\theta_1-\theta_0)} & \text{si }x_{1:n}>\theta_1,\\ 0 & \text{si }\theta_0<x_{1:n}\le\theta_1.\end{cases}$$
2. Montrer qu'on peut choisir la fonction critique d'un test U.P.P.($\alpha$) de l'une des deux formes suivantes
$$\phi_1(x_1,\dots,x_n)=\begin{cases}1 & x_{1:n}>\theta_1,\\ \gamma & \theta_0<x_{1:n}\le\theta_1,\end{cases}\qquad\text{ou}\qquad\phi_2(x_1,\dots,x_n)=\begin{cases}\gamma & x_{1:n}>\theta_1,\\ 0 & \theta_0<x_{1:n}\le\theta_1,\end{cases}$$
où $\gamma$ est une constante de $[0,1[$.
3. Montrer que si $e^{n(\theta_0-\theta_1)}\le\alpha$, on peut prendre $\phi_1$ comme fonction critique. On déterminera la constante $\gamma$ dans ce cas.
4. Déterminer la fonction critique du test pour $e^{n(\theta_0-\theta_1)}>\alpha$.

**Corrigé complet (Corrigé PC5, p. 22–23).** Notons $X_{1:n}$ le minimum de $X_1,\cdots,X_n$.

*Q1.* La vraisemblance de l'échantillon s'écrit (produit des densités, par indépendance ; $\prod_i\mathbb{1}_{\theta<X_i}=\mathbb{1}_{\theta<X_{1:n}}$)
$$L_n(\theta)=e^{n\theta-\sum_{i=1}^nX_i}\mathbb{1}_{\theta<X_{1:n}}.$$
Le rapport de vraisemblance s'écrit donc, pour $\theta_1>\theta_0$, si $\theta_0<X_{1:n}$ (de sorte que $L_n(\theta_0)>0$) :
$$r(Z)=\frac{L_n(\theta_1)}{L_n(\theta_0)}=e^{n(\theta_1-\theta_0)}\mathbb{1}_{\theta_1<X_{1:n}}.$$

*Q2.* Les tests du rapport de vraisemblance (Neyman-Pearson, forme générale randomisée : Th. 4.1 des compléments du Poly ch.5) s'écrivent sous la forme
$$\phi=\mathbb{1}_{r(Z)>c}+\gamma\,\mathbb{1}_{r(Z)=c}.$$
Ici, $r(Z)$ ne prend que les valeurs $0$ et $e^{n(\theta_1-\theta_0)}$, et
$$\{r(Z)=0\}=\{\theta_0<X_{1:n}\le\theta_1\},\qquad\{r(Z)=e^{n(\theta_1-\theta_0)}\}=\{X_{1:n}>\theta_1\}.$$
D'où les cas :
- si $c>e^{n(\theta_1-\theta_0)}$, $\phi$ est toujours nul ;
- si $0<c\le e^{n(\theta_1-\theta_0)}$, $\phi$ est de la forme $\phi_2$ ;
- si $c=0$, $\phi$ est de la forme $\phi_1$ ;
- si $c<0$, $\phi$ vaut toujours $1$.

*[Extracteur]* Précision : pour $0<c<e^{n(\theta_1-\theta_0)}$, $\phi=\mathbb{1}_{\{X_{1:n}>\theta_1\}}$, qui est $\phi_1$ avec $\gamma=0$ (ou $\phi_2$ avec « $\gamma=1$ ») ; c'est pour $c=e^{n(\theta_1-\theta_0)}$ qu'on obtient $\phi_2$ avec $\gamma\in[0,1[$. Les cas « toujours nul » / « toujours 1 » sont de taille $0$ / $1$, exclus pour $\alpha\in]0,1[$.

*Q3. Cas $\alpha\ge e^{-n(\theta_1-\theta_0)}$.* Le test s'écrit d'après Q2 (avec $c=0$)
$$\phi_\alpha(Z)=\mathbb{1}_{r(Z)>0}+\gamma\,\mathbb{1}_{r(Z)=0}=\mathbb{1}_{X_{1:n}\ge\theta_1}+\gamma\,\mathbb{1}_{\theta_0\le X_{1:n}<\theta_1}.\tag{12}$$
Pour garantir le niveau $\alpha$, il faut choisir $\gamma$ solution de
$$\alpha=\mathbb{P}_{\theta_0}(\min X_i\ge\theta_1)+\gamma\,\mathbb{P}_{\theta_0}(\theta_0\le\min X_i<\theta_1)=e^{-n(\theta_1-\theta_0)}+\gamma\big(1-e^{-n(\theta_1-\theta_0)}\big),$$
i.e. choisir
$$\gamma=\frac{\alpha e^{n(\theta_1-\theta_0)}-1}{e^{n(\theta_1-\theta_0)}-1}.$$
(*[Extracteur]* $\gamma\in[0,1[$ précisément parce que $e^{-n(\theta_1-\theta_0)}\le\alpha<1$ ; la probabilité $\mathbb{P}_{\theta_0}(X_{1:n}>\theta_1)$ est calculée en Q4.)

*Q4. Cas $\alpha<e^{-n(\theta_1-\theta_0)}$.* On a (indépendance, puis intégration de la densité)
$$\mathbb{P}_{\theta_0}\big(r(Z)=e^{n(\theta_1-\theta_0)}\big)=\mathbb{P}_{\theta_0}(X_{1:n}>\theta_1)=\Big(\int_{\theta_1}^{+\infty}e^{-(x-\theta_0)}\,\mathrm{d}x\Big)^n=e^{-n(\theta_1-\theta_0)}.$$
Si $\alpha<e^{-n(\theta_1-\theta_0)}$, on doit prendre $c(\alpha)=e^{n(\theta_1-\theta_0)}$ (le corrigé écrit $e^{-n(\theta_1-\theta_0)}$ : coquille 11) et, pour garantir une taille de test $\alpha$, il faut prendre $\gamma$ solution de
$$\alpha=\gamma\,\mathbb{P}_{\theta_0}(X_{1:n}\ge\theta_1)=\gamma e^{-n(\theta_1-\theta_0)},$$
i.e. $\gamma=\alpha e^{n(\theta_1-\theta_0)}$. On a finalement
$$\phi_\alpha(Z)=\alpha e^{n(\theta_1-\theta_0)}\mathbb{1}_{X_{1:n}>\theta_1}.$$

*Remarque sur le test (12) (Corrigé p. 23).*
- La règle de décision est la suivante : si toutes les observations sont supérieures à $\theta_1$, on rejette $H_0$. En revanche, si au moins une est dans $[\theta_0,\theta_1]$, alors on décide d'accepter $H_0$ ou de rejeter en tirant une v.a. de Bernoulli. Ceci est assez **contre-intuitif** puisque l'on peut être amené à rejeter $H_0$ alors qu'on observe des données $X_1,\cdots,X_n$ qui sont **interdites par $H_1$** (puisque $H_1$ contraint les v.a. $X_k$ à être supérieures à $\theta_1$).
- Le niveau de ce test est $\alpha$ (et même $\alpha$ est sa taille, par construction). La puissance de ce test est
$$\mathbb{P}_{\theta_1}[X_{1:n}>\theta_1]+\gamma\,\mathbb{P}_{\theta_1}[\theta_0<X_{1:n}\le\theta_1]=\mathbb{P}_{\theta_1}[X_{1:n}>\theta_1]=1.$$
- Le test plus intuitif
$$\phi_\star(Z)=\begin{cases}1 & \text{si }X_{1:n}>\theta_1,\\ 0 & \text{si }\theta_0<X_{1:n}\le\theta_1,\end{cases}$$
est un test de taille (donc de niveau)
$$\alpha_\star=\mathbb{P}_{\theta_0}(X_{1:n}>\theta_1)=\exp(-n(\theta_1-\theta_0))<\alpha,$$
et sa puissance vaut $1$. Ce test est donc **aussi un U.P.P.($\alpha$)**.
- Cette discussion illustre le résultat de la question 3 de l'exercice 5 (de l'énoncé : test de taille $<\alpha_2$ et de puissance $1$).

**Méthodes mobilisées :**
- vraisemblance d'un modèle **à support dépendant du paramètre** ; indicatrice du minimum $X_{1:n}$ ;
- rapport de vraisemblance **à deux valeurs** ($0$ et $e^{n(\theta_1-\theta_0)}$) : atomes $\Rightarrow$ **Neyman-Pearson randomisé** (Th. 4.1 des compléments du Poly ch.5) ;
- discussion de la forme du test selon la valeur du seuil $c$ ;
- loi du minimum d'un échantillon : $\mathbb{P}_{\theta}(X_{1:n}>t)=\mathbb{P}_\theta(X_1>t)^n$ (indépendance) ;
- calcul de $\gamma$ par la condition de **taille exactement $\alpha$** ;
- non-unicité des tests U.P.P. en présence d'atomes.

**Pièges relevés / remarques du corrigé :**
- Le rapport n'est défini que là où $p(\theta_0;\cdot)>0$, i.e. sur $\{x_{1:n}>\theta_0\}$ (événement de probabilité 1 sous $\mathbb{P}_{\theta_0}$) ; utiliser la forme $\{p_{\theta_1}>c\,p_{\theta_0}\}$ partout.
- Dans le cas $\alpha\ge e^{-n(\theta_1-\theta_0)}$, le test U.P.P. randomisé de taille exactement $\alpha$ **peut rejeter $H_0$ sur des données impossibles sous $H_1$** : contre-intuitif.
- Le test **pur** $\phi_\star$, de taille $\alpha_\star<\alpha$ et de puissance $1$, est **aussi** U.P.P.($\alpha$) : l'unicité (Th. 1.2) tombe en présence d'atomes.
- Coquille du seuil en Q4 : $c(\alpha)=e^{n(\theta_1-\theta_0)}$ (pas $e^{-n(\theta_1-\theta_0)}$).
- Dans l'énoncé, condition écrite $e^{n(\theta_0-\theta_1)}\le\alpha$ ; dans le corrigé, $\alpha\ge e^{-n(\theta_1-\theta_0)}$ : c'est la même.

**Résultats numériques** *[Extracteur]* ($\alpha=0.05$) :
- $n=5$, $\theta_1-\theta_0=1$ : $e^{-5}\approx0.00674\le0.05$ $\Rightarrow$ cas Q3, $\gamma=\dfrac{0.05\,e^{5}-1}{e^{5}-1}\approx0.0436$ ; le test pur $\phi_\star$ a pour taille $\alpha_\star\approx0.0067$.
- $n=5$, $\theta_1-\theta_0=0.5$ : $e^{-2.5}\approx0.0821>0.05$ $\Rightarrow$ cas Q4, $\gamma=0.05\,e^{2.5}\approx0.609$, $\phi_\alpha=0.609\,\mathbb{1}_{\{X_{1:n}>\theta_1\}}$ (puissance $\approx0.609$).

---

### Exercice 4 — Test du rapport de vraisemblance généralisée pour modèle de régression (⋆⋆)
**Source :** Énoncé PC5, p. 4–5 ; Corrigé PC5, « **Corrigé de l'Exercice 3** », p. 17–19. (= Poly ch.5, Exercice 6 ; complément Déf. 4.3.)

**Énoncé complet.** Le test du rapport de vraisemblances généralisé est basé sur l'extension suivante du rapport de vraisemblance. Soit $L(\theta,Z)$ la vraisemblance de l'observation $Z$ sous la loi $\mathbb{P}_\theta$. Le rapport de vraisemblance généralisé est défini par
$$\Lambda(Z)=\frac{\sup_{\theta\in\Theta_0}L(\theta,Z)}{\sup_{\theta\in\Theta}L(\theta,Z)}.$$
Le test rejette $H_0:\theta\in\Theta_0$ si $\Lambda(Z)\leqslant c_\alpha$, $c_\alpha$ étant choisi naturellement inférieur à 1 et de façon à ce que le niveau du test soit inférieur à $\alpha$. On peut étudier ce test lorsque $n\to\infty$ dans les modèles réguliers.

Soient $n$ et $p$ deux entiers tels que $p\leqslant n$ et soit $X$ une matrice déterministe fixée à $n$ lignes et $p$ colonnes, de rang plein. Soit $\mathbf{Y}=(Y_1,\dots,Y_n)$ une observation du modèle statistique
$$(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{\mathrm{N}(X\beta,\sigma^2I),\ \beta\in\mathbb{R}^p,\ \sigma^2>0\}).$$
Soit $0\leqslant r<p$. Dans cet exercice, on étudie le test du rapport de vraisemblance généralisé dans le cas où $H_0:\beta_{r+1}=\dots=\beta_p=0$.
1. Déterminer l'estimateur du maximum de vraisemblance $\hat\theta$ de $\theta=(\beta,\sigma^2)$ et en déduire que
$$\sup_{\theta\in\Theta}L(\theta,\mathbf{Y})=\frac{1}{(2\pi)^{n/2}\hat\sigma^n}e^{-n/2}$$
(l'énoncé imprime $\hat\sigma$ au lieu de $\hat\sigma^n$ : coquille 1).
2. Déterminer l'estimateur du maximum de vraisemblance $\hat\theta_0$ de $\theta=(\beta,\sigma^2)$ sous la contrainte que $\beta_{r+1}=\dots=\beta_p=0$. En posant
$$\mathbf{M}=X(X^TX)^{-1}X^T-X_0(X_0^TX_0)^{-1}X_0^T,$$
où $X_0$ est la matrice extraite de $X$, de taille $n\times r$ contenant les $r$ premières colonnes de $X$, en déduire que
$$\sup_{\theta\in\Theta_0}L(\theta,\mathbf{Y})=\frac{1}{(2\pi)^{n/2}\big(\hat\sigma^2+\frac1n\mathbf{Y}^T\mathbf{M}\mathbf{Y}\big)^{n/2}}e^{-n/2}.$$
3. En déduire que le test du rapport de vraisemblance généralisé rejette $H_0$ si
$$F=\frac{n-p}{p-r}\,\frac{\mathbf{Y}^T\mathbf{M}\mathbf{Y}}{n\hat\sigma^2}>k_\alpha,$$
pour un certain seuil $k_\alpha$.
4. Montrer que, pour tout $\theta\in\Theta_0$, $F$ suit, sous $\mathbb{P}_\theta$, une loi de Fisher dont on précisera les paramètres.

Soit maintenant $\mathbf{Y}$ une observation du modèle statistique
$$\Big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\Big\{\otimes_{i=1}^r\mathrm{N}(\mu_i,\sigma^2)^{\otimes n_i},\ \mu_1,\dots,\mu_r\in\mathbb{R},\ \sigma^2>0\Big\}\Big).$$
Dans cette écriture $n=\sum_{i=1}^rn_i$. Pour tout $\theta=(\mu_1,\dots,\mu_r,\sigma^2)\in\Theta=\mathbb{R}^r\times\mathbb{R}_+^\ast$, sous $\mathbb{P}_\theta$, $\mathbf{Y}$ est un vecteur Gaussien regroupant les résultats de $r$ expériences $Y_i=(X_{i,1},\dots,X_{i,n_i})$, $i\in\{1,\dots,r\}$. Pour tout $i$, $(X_{i,1},\dots,X_{i,n_i})$ sont $n_i$ variables aléatoires Gaussiennes indépendantes de même loi $\mathrm{N}(\mu_i,\sigma^2)$. De plus, $Y_1,\dots,Y_r$ sont indépendants et les variances des variables $X_{i,j}$ sont toutes égales.
5. Utiliser les résultats précédents pour tester $H_0:\mu_1=\dots=\mu_r$.

**Corrigé complet (Corrigé PC5, « Corrigé de l'Exercice 3 », p. 17–19).**

*Q1.* La vraisemblance du modèle linéaire Gaussien s'écrit
$$L(\theta,\mathbf{Y})=\frac{1}{(2\pi\sigma^2)^{n/2}}\exp\Big(-\frac{1}{2\sigma^2}\|\mathbf{Y}-X\beta\|^2\Big).$$
- *Maximisation en $\beta$.* Quelle que soit la valeur de $\sigma^2$, le maximum de $\beta\mapsto L(\beta,\sigma^2,\mathbf{Y})$ est atteint en $\hat\beta$ minimisant $Q(\beta)=\|\mathbf{Y}-X\beta\|^2$ (décroissance de $u\mapsto e^{-u/(2\sigma^2)}$). Le gradient vérifie $\nabla Q(\beta)=2(X^TX\beta-X^T\mathbf{Y})$. Comme $X$ est de rang plein, $X^TX$ est inversible et
$$\hat\beta=(X^TX)^{-1}X^T\mathbf{Y}.$$
(*[Extracteur]* $Q$ est convexe — strictement, $X^TX$ définie positive — donc le point critique est le minimum global.)
- *Maximisation en $\sigma^2$.* La fonction $\sigma^2\mapsto L(\hat\beta,\sigma^2,\mathbf{Y})$ est dérivable et une étude de fonction élémentaire montre qu'elle atteint son maximum (le corrigé dit « minimum » : coquille 7) en
$$\hat\sigma^2=\frac1n\|\mathbf{Y}-X\hat\beta\|^2=\frac1n\|(\mathbf{I}_n-X(X^TX)^{-1}X^T)\mathbf{Y}\|^2.$$
- *Conclusion.* Pour tout $\theta\in\Theta$, $L(\theta,\mathbf{Y})\leqslant L((\hat\beta,\sigma^2),\mathbf{Y})\leqslant L((\hat\beta,\hat\sigma^2),\mathbf{Y})$, donc $\hat\theta=(\hat\beta,\hat\sigma^2)$. En outre
$$\sup_{\theta\in\Theta}L(\theta,\mathbf{Y})=L((\hat\beta,\hat\sigma^2),\mathbf{Y})=\frac{1}{(2\pi)^{n/2}\hat\sigma^n}e^{-n/2}$$
(*[Extracteur]* car $\|\mathbf{Y}-X\hat\beta\|^2/(2\hat\sigma^2)=n/2$).

*Q2. Maximisation sous contrainte (multiplicateurs de Lagrange).* La vraisemblance étant inchangée, pour toute valeur de $\sigma^2$, le maximum de $L(\theta,\mathbf{Y})$ sous la contrainte $K\beta=0$ est atteint par un minimiseur de $Q(\beta)$ sous la contrainte $K\beta=0$ ($K=\mathrm{diag}(0_r,\mathbf{I}_{p-r})$, cf. coquille 8). Considérons la fonction (lagrangien)
$$\Gamma:(\beta,\kappa)\in\mathbb{R}^p\times\mathbb{R}^{p-r}\mapsto Q(\beta)-\sum_{i=1}^{p-r}\kappa_i\beta_{r+i}.$$
Elle admet pour gradient
$$\nabla\Gamma(\beta,\kappa)=\begin{bmatrix}2(X^TX\beta-X^T\mathbf{Y})_1\\ \vdots\\ 2(X^TX\beta-X^T\mathbf{Y})_r\\ 2(X^TX\beta-X^T\mathbf{Y})_{r+1}-\kappa_1\\ \vdots\\ 2(X^TX\beta-X^T\mathbf{Y})_p-\kappa_{p-r}\\ \beta_{r+1}\\ \vdots\\ \beta_p\end{bmatrix}.$$
Ses points critiques vérifient donc
$$(\mathbf{I}_p-K)(X^TX\hat\beta_0-X^T\mathbf{Y})=0,\qquad\begin{bmatrix}\mathbf{0}_r\\ \kappa_0\end{bmatrix}=2K(X^TX\hat\beta_0-X^T\mathbf{Y}),\qquad K\hat\beta_0=0.$$
La fonction $\beta\mapsto\Gamma(\beta,\kappa_0)$ étant strictement convexe, elle admet pour unique minimiseur $\hat\beta_0$. Comme $K\hat\beta_0=0$, la première relation se réécrit
$$(\mathbf{I}_p-K)(X^TX)(\mathbf{I}_p-K)\hat\beta_0=(\mathbf{I}_p-K)X^T\mathbf{Y}.$$
La matrice $X(\mathbf{I}_p-K)$ n'est pas de rang plein, mais l'application linéaire associée, restreinte aux vecteurs tels que $K\beta=0$, est injective. De plus, l'image de $(\mathbf{I}_p-K)(X^TX)(\mathbf{I}_p-K)$ est l'ensemble des $u\in\mathbb{R}^p$ tels que $Ku=0$, donc il existe un unique vecteur $\hat\beta_0$ dans la préimage de $(\mathbf{I}_p-K)X^T\mathbf{Y}$ par $(\mathbf{I}_p-K)(X^TX)(\mathbf{I}_p-K)$ tel que $K\hat\beta_0=0$. $\hat\beta_0$ est donc un minimiseur de $Q(\beta)-\sum_{i=1}^{p-r}\kappa_{0,i}\beta_{r+i}$ vérifiant $K\hat\beta_0=0$, donc un minimiseur de $Q(\beta)$ parmi les vecteurs $\beta\in\mathbb{R}^p$ tels que $K\beta=0$ (renvoi pendant à « la question 6 de l'exercice 5 » ; *[Extracteur]* argument : pour $K\beta=0$, $Q(\beta)=\Gamma(\beta,\kappa_0)\ge\Gamma(\hat\beta_0,\kappa_0)=Q(\hat\beta_0)$). On conclut comme en Q1 que
$$\hat\sigma_0^2=\frac1n\|\mathbf{Y}-X\hat\beta_0\|^2,\qquad\sup_{\theta\in\Theta_0}L(\theta,\mathbf{Y})=\frac{1}{(2\pi)^{n/2}\hat\sigma_0^n}e^{-n/2}.$$
*[Extracteur]* Plus simplement : sous $H_0$, $X\beta=X_0\beta_{1:r}$ et l'on est ramené à la Q1 avec la matrice $X_0$ (de rang plein), d'où $X\hat\beta_0=X_0(X_0^TX_0)^{-1}X_0^T\mathbf{Y}$.

*Projections et Pythagore.* $X\hat\beta$ est la projection orthogonale $\Pi\mathbf{Y}$ de $\mathbf{Y}$ sur l'espace $V$ engendré par les colonnes de $X$, et $X\hat\beta_0$ est la projection orthogonale $\Pi_0\mathbf{Y}$ de $\mathbf{Y}$ sur l'espace $V_0$ engendré par les $r$ premières colonnes de $X$. On déduit du **théorème de Pythagore** ($V_0\subset V$, donc $(\mathbf{I}_n-\Pi)\mathbf{Y}\perp(\Pi-\Pi_0)\mathbf{Y}$) que
$$n\hat\sigma_0^2=\|(\mathbf{I}_n-\Pi_0)\mathbf{Y}\|^2=\|(\mathbf{I}_n-\Pi)\mathbf{Y}\|^2+\|(\Pi-\Pi_0)\mathbf{Y}\|^2=n\hat\sigma^2+\|(\Pi-\Pi_0)\mathbf{Y}\|^2$$
(le corrigé écrit $\mathbf{I}_p$ : coquille 9). La matrice $\Pi$ est donnée par $X(X^TX)^{-1}X^T$ et $\Pi_0$ par $X_0(X_0^TX_0)^{-1}X_0^T$. Comme $\Pi$ et $\Pi_0$ sont des projecteurs orthogonaux sur des espaces imbriqués, $\mathbf{M}=\Pi-\Pi_0$ est aussi un projecteur orthogonal (sur $V\cap V_0^\perp$), donc
$$\|\mathbf{M}\mathbf{Y}\|^2=\mathbf{Y}^T\mathbf{M}^T\mathbf{M}\mathbf{Y}=\mathbf{Y}^T\mathbf{M}^2\mathbf{Y}=\mathbf{Y}^T\mathbf{M}\mathbf{Y}.$$
D'où $\hat\sigma_0^2=\hat\sigma^2+\frac1n\mathbf{Y}^T\mathbf{M}\mathbf{Y}$ et la formule demandée.

*Q3.* Par définition, le test du rapport de vraisemblance généralisé rejette $H_0$ si
$$c_\alpha>\frac{\sup_{\theta\in\Theta_0}L(\theta,\mathbf{Y})}{\sup_{\theta\in\Theta}L(\theta,\mathbf{Y})}=\Big(\frac{\hat\sigma^2}{\hat\sigma^2+\frac1n\mathbf{Y}^T\mathbf{M}\mathbf{Y}}\Big)^{n/2}.$$
Ceci est équivalent à rejeter $H_0$ si $F>k_\alpha$, où $k_\alpha$ peut s'exprimer en fonction de $c_\alpha$.
*[Extracteur]* Explicitement, $\frac{\mathbf{Y}^T\mathbf{M}\mathbf{Y}}{n\hat\sigma^2}=\frac{p-r}{n-p}F$, donc $\Lambda=\big(1+\frac{p-r}{n-p}F\big)^{-n/2}$, fonction **strictement décroissante** de $F$ ; ainsi $\Lambda<c_\alpha\iff F>k_\alpha:=\frac{n-p}{p-r}\big(c_\alpha^{-2/n}-1\big)$.

*Q4. Loi de $F$ sous $H_0$.* On a $\hat\sigma^2=\frac1n\|(\mathbf{I}_n-\Pi)\mathbf{Y}\|^2$ et (notation réutilisée, coquille 10) « $\hat\sigma_0^2$ » $=\frac1n\|(\Pi-\Pi_0)\mathbf{Y}\|^2$. Fixons $\theta\in\Theta_0$ ; on a $\Pi_0\mathbb{E}_\theta[\mathbf{Y}]=\mathbb{E}_\theta[\mathbf{Y}]=\Pi\,\mathbb{E}_\theta[\mathbf{Y}]$ (car $\mathbb{E}_\theta[\mathbf{Y}]=X\beta\in V_0\subset V$ sous $H_0$), donc
$$\hat\sigma^2=\frac1n\|(\mathbf{I}_n-\Pi)(\mathbf{Y}-\mathbb{E}_\theta[\mathbf{Y}])\|^2,\qquad\hat\sigma_0^2=\frac1n\|(\Pi-\Pi_0)(\mathbf{Y}-\mathbb{E}_\theta[\mathbf{Y}])\|^2.$$
Comme, sous $\mathbb{P}_\theta$, $(\mathbf{Y}-\mathbb{E}_\theta[\mathbf{Y}])/\sigma\sim\mathrm{N}(0,\mathbf{I}_n)$, on a (théorème de **Cochran**, Poly ch.1 Th. 1.1 ; $\mathbf{I}_n-\Pi$ de rang $n-p$, $\Pi-\Pi_0$ de rang $p-r$) $n\hat\sigma^2/\sigma^2\sim\chi^2(n-p)$ et $n\hat\sigma_0^2/\sigma^2\sim\chi^2(p-r)$. De plus, comme
$$(\mathbf{I}_n-\Pi)(\Pi-\Pi_0)^T=(\mathbf{I}_n-\Pi)(\Pi-\Pi_0)=\Pi-\Pi^2-\Pi_0+\Pi\Pi_0=0,$$
$n\hat\sigma^2/\sigma^2$ et $n\hat\sigma_0^2/\sigma^2$ sont **indépendants** (projections sur des sous-espaces orthogonaux ; $\Pi^2=\Pi$, $\Pi\Pi_0=\Pi_0$). Il s'ensuit que **$F$ suit une loi de Fisher de paramètres $p-r$ et $n-p$** (définition de la loi de Fisher, Poly ch.4 Déf. 3.2 : $F=\frac{(n\hat\sigma_0^2/\sigma^2)/(p-r)}{(n\hat\sigma^2/\sigma^2)/(n-p)}$, le $\sigma^2$ inconnu se simplifie).
*[Extracteur]* Le test $\mathbb{1}_{\{F>k_\alpha\}}$ avec $k_\alpha$ = quantile d'ordre $1-\alpha$ de $\mathrm{F}(p-r,n-p)$ est donc de taille exactement $\alpha$ (loi de $F$ indépendante de $\theta\in\Theta_0$).

*Q5. Application : analyse de la variance à un facteur.* On a, sous $\mathbb{P}_\theta$, $\mathbf{Y}\sim\mathrm{N}(E_\theta,\sigma^2\mathbf{I}_n)$, avec
$$E_\theta=\begin{bmatrix}\mathbf{1}_{n_1}&0&\dots&0\\ 0&\mathbf{1}_{n_2}&&\\ \vdots&&\ddots&\\ 0&\dots&0&\mathbf{1}_{n_r}\end{bmatrix}\begin{bmatrix}\mu_1\\ \mu_2\\ \vdots\\ \mu_r\end{bmatrix}=\begin{bmatrix}\mathbf{1}_{n_1}&0&\dots&0\\ \mathbf{1}_{n_2}&\mathbf{1}_{n_2}&&\\ \vdots&&\ddots&\\ \mathbf{1}_{n_r}&\dots&0&\mathbf{1}_{n_r}\end{bmatrix}\begin{bmatrix}\mu_1\\ \mu_2-\mu_1\\ \vdots\\ \mu_r-\mu_1\end{bmatrix}.$$
Soit
$$X=\begin{bmatrix}\mathbf{1}_{n_1}&0&\dots&0\\ \mathbf{1}_{n_2}&\mathbf{1}_{n_2}&&\\ \vdots&&\ddots&\\ \mathbf{1}_{n_r}&\dots&0&\mathbf{1}_{n_r}\end{bmatrix}\qquad\text{et}\qquad\beta=\begin{bmatrix}\mu_1\\ \mu_2-\mu_1\\ \vdots\\ \mu_r-\mu_1\end{bmatrix};$$
$X$ est de rang plein et le test revient à tester $\beta_2=\dots=\beta_r=0$.

*[Extracteur, conclusion non écrite dans le corrigé]* On applique Q1–Q4 avec « $p$ » $=r$ (nombre de groupes) et « $r$ » $=1$ ($X_0=\mathbf{1}_n$, première colonne). $\Pi\mathbf{Y}$ est le vecteur des moyennes de groupe $\bar X_{i}:=n_i^{-1}\sum_jX_{i,j}$ (chacune répétée $n_i$ fois), $\Pi_0\mathbf{Y}=\bar X\mathbf{1}_n$ avec $\bar X:=n^{-1}\sum_{i,j}X_{i,j}$, d'où
$$n\hat\sigma^2=\sum_{i=1}^r\sum_{j=1}^{n_i}(X_{i,j}-\bar X_i)^2,\qquad\mathbf{Y}^T\mathbf{M}\mathbf{Y}=\sum_{i=1}^rn_i(\bar X_i-\bar X)^2,\qquad F=\frac{n-r}{r-1}\,\frac{\sum_in_i(\bar X_i-\bar X)^2}{\sum_{i,j}(X_{i,j}-\bar X_i)^2}\ \underset{H_0}{\sim}\ \mathrm{F}(r-1,n-r),$$
et l'on rejette $H_0:\mu_1=\dots=\mu_r$ si $F$ dépasse le quantile d'ordre $1-\alpha$ de $\mathrm{F}(r-1,n-r)$ (variabilité **inter**-groupes grande devant la variabilité **intra**-groupes).

**Méthodes mobilisées :**
- **EMV** du modèle linéaire gaussien : maximisation en $\beta$ (moindres carrés, annulation du gradient, équations normales) puis en $\sigma^2$ (étude de fonction) — maximisation **profilée** ;
- **maximisation sous contrainte linéaire** par **multiplicateurs de Lagrange** (convexité stricte du lagrangien) ;
- interprétation géométrique : **projections orthogonales** $\Pi$, $\Pi_0$ sur des sous-espaces **imbriqués**, **théorème de Pythagore** ;
- projecteur orthogonal ($\mathbf{M}^T=\mathbf{M}=\mathbf{M}^2$) ;
- **rapport de vraisemblance généralisé** (Déf. 4.3 des compléments du Poly ch.5) et réécriture comme fonction monotone d'une statistique ;
- **théorème de Cochran** (Poly ch.1 Th. 1.1) : lois $\chi^2$ et indépendance ; définition de la **loi de Fisher** ;
- reparamétrisation d'un modèle d'**ANOVA** en modèle de régression (contraste $\mu_i-\mu_1$).

**Pièges relevés / remarques du corrigé :**
- Le rapport généralisé rejette pour les **petites** valeurs de $\Lambda$ (alors que Neyman-Pearson rejette pour les grandes valeurs de $r$) ; ici, petites valeurs de $\Lambda$ $\iff$ grandes valeurs de $F$.
- Sous $H_0$, le centrage $\mathbf{Y}-\mathbb{E}_\theta[\mathbf{Y}]$ ne change pas $(\mathbf{I}_n-\Pi)\mathbf{Y}$ ni $(\Pi-\Pi_0)\mathbf{Y}$ : c'est **là qu'on utilise $H_0$** ($\mathbb{E}_\theta[\mathbf{Y}]\in V_0$). Sous $H_1$, $\|(\Pi-\Pi_0)\mathbf{Y}\|^2/\sigma^2$ n'est plus un $\chi^2$ centré.
- Ordre des degrés de liberté : $\mathrm{F}(p-r,n-p)$ (numérateur = nombre de contraintes testées).
- Coquilles : $\hat\sigma$ vs $\hat\sigma^n$ (énoncé Q1), « minimum » vs maximum, $K$ non défini, $\mathbf{I}_p$ vs $\mathbf{I}_n$, réutilisation de $\hat\sigma_0^2$ (cf. §0.5).
- Q5 : la matrice $X$ proposée (première colonne $=\mathbf{1}_n$) a le **même espace colonne** que la matrice des indicatrices de groupes ; ce choix rend l'hypothèse $\mu_1=\dots=\mu_r$ de la forme « dernières coordonnées de $\beta$ nulles ».

**Résultats numériques** *[Extracteur]* : quantiles de Fisher utiles, $\alpha=0.05$ : $r=3$ groupes de $n_i=10$ ($n=30$) $\Rightarrow$ $\mathrm{F}(2,27)$, quantile $0.95\approx3.354$ ; $\mathrm{F}(1,8)$, quantile $0.95\approx5.318$.

---

### Exercice 5 — Monotonie en le niveau (⋆⋆)
**Source :** Énoncé PC5, p. 5 (exercice sans titre) ; Corrigé PC5, « **Corrigé de l'Exercice 4** », p. 20–21. (= Poly ch.5, Exercice 2.)

**Énoncé complet.** Soient $p_0$ et $p_1$ deux densités par rapport à une mesure $\sigma$-finie $\mu$ sur un espace mesurable $(\mathsf{Z},\mathcal{Z})$. On considère le test
$$H_0:\ p=p_0,\qquad\text{contre}\qquad H_1:\ p=p_1.\tag{3}$$
Pour $\alpha\in\,]0,1[$, on introduit la fonction critique $\phi_\alpha$ donnée par
$$\phi_\alpha(z)=\begin{cases}1 & p_1(z)>c_\alpha p_0(z),\\ \gamma_\alpha & p_1(z)=c_\alpha p_0(z),\\ 0 & p_1(z)<c_\alpha p_0(z),\end{cases}$$
où $\gamma_\alpha\in[0,1]$ et $c_\alpha\ge0$ sont solutions de l'équation
$$\mathbb{E}_0[\phi_\alpha(Z)]=\mathbb{P}_0(p_1(Z)>c\,p_0(Z))+\gamma\,\mathbb{P}_0(p_1(Z)=c\,p_0(Z))=\alpha.$$
On rappelle que $\phi_\alpha$ est U.P.P.($\alpha$) pour le test (3). L'objectif de l'exercice est de démontrer en relative généralité des propriétés de *monotonie* en les niveaux des différentes quantités induites dans la définition de $\phi_\alpha$.
1. Montrer que pour $0<\alpha_1<\alpha_2<1$, $c_{\alpha_1}\ge c_{\alpha_2}$.
2. Montrer que pour $0<\alpha_1<\alpha_2<1$,
$$\mathbb{E}_1[1-\phi_{\alpha_1}(Z)]\ge\mathbb{E}_1[1-\phi_{\alpha_2}(Z)].\tag{4}$$
3. Montrer que si on a égalité dans (4) alors il existe un test de taille strictement inférieure à $\alpha_2$ et de puissance égale à 1 [plus difficile].

**Corrigé complet (Corrigé PC5, « Corrigé de l'Exercice 4 », p. 20–21).**

*Q1. Solution 1.* Par construction, pour tout $\alpha\in\,]0,1[$, pour un test U.P.P.($\alpha$) (condition de taille et définition de $\phi_\alpha$),
$$\mathbb{P}_0(p_1(Z)>c_\alpha p_0(Z))\le\alpha\le\mathbb{P}_0(p_1(Z)\ge c_\alpha p_0(Z)).$$
On en déduit que, pour $\alpha_1<\alpha_2$,
$$c_{\alpha_1}=\inf\{c\in\mathbb{R}_+:\ \mathbb{P}_0(p_1(Z)>c\,p_0(Z))\le\alpha_1\}\ \ge\ \inf\{c\in\mathbb{R}_+:\ \mathbb{P}_0(p_1(Z)>c\,p_0(Z))\le\alpha_2\}=c_{\alpha_2}$$
(l'ensemble pour $\alpha_1$ est **inclus** dans l'ensemble pour $\alpha_2$, et l'inf d'une partie est plus grand que l'inf du tout).

*Q1. Solution 2.* La paire $(c,\gamma)$ doit satisfaire
$$\alpha=\mathbb{P}_0(r(Z)>c)+\gamma\,\mathbb{P}_0(r(Z)=c),$$
ou de façon équivalente (passage au complémentaire)
$$1-\alpha=(1-\gamma)\,\mathbb{P}_0(r(Z)\le c)+\gamma\,\mathbb{P}_0(r(Z)<c),$$
i.e. $1-\alpha$ s'écrit comme un point de l'intervalle $[\mathbb{P}_0(r(Z)<c);\mathbb{P}_0(r(Z)\le c)]$. En notant $F_{r,0}$ la fonction de répartition du ratio $p_1(Z)/p_0(Z)$ quand $Z\sim p_0$, on a
$$c_\alpha:=F_{r,0}^{-1}(1-\alpha).$$
Donc si $\alpha_1<\alpha_2$, alors $1-\alpha_1>1-\alpha_2$ et donc $c_{\alpha_1}\ge c_{\alpha_2}$ (croissance de l'inverse généralisée $F^{-1}_{r,0}$, Poly ch.5 Outils).

*Q2.* Supposons que $0<\alpha_1<\alpha_2<1$. Le test de fonction critique $\phi_{\alpha_1}$ est de niveau $\alpha_1$, il est donc également de niveau $\alpha_2$. Puisque le test de fonction critique $\phi_{\alpha_2}$ est U.P.P.($\alpha_2$),
$$\mathbb{E}_1[\phi_{\alpha_1}(Z)]\le\mathbb{E}_1[\phi_{\alpha_2}(Z)],$$
ce qui équivaut à (4) (*[Extracteur]* $\mathbb{E}_1[1-\phi]=1-\mathbb{E}_1[\phi]$ : risque de seconde espèce décroissant en le niveau).

*Q3.* Supposons que $\mathbb{E}_1[\phi_{\alpha_1}(Z)]=\mathbb{E}_1[\phi_{\alpha_2}(Z)]$. Montrons d'abord que $c_{\alpha_2}=0$.
- Puisque $\mathbb{E}_1[\phi_{\alpha_1}(Z)]=\mathbb{E}_1[\phi_{\alpha_2}(Z)]$ et que $\phi_{\alpha_1}$ est de niveau $\alpha_2$, le test de fonction critique $\phi_{\alpha_1}$ est **aussi U.P.P.($\alpha_2$)**.
- Le **théorème d'unicité des tests U.P.P.($\alpha$)** (partie unicité du Th. 4.1 des compléments du Poly ch.5 / Th. 1.2) montre que
$$\{\phi_{\alpha_1}(z)-\phi_{\alpha_2}(z)\}\{p_1(z)-c_{\alpha_2}p_0(z)\}=0,\qquad\mu\text{-presque-partout}.$$
- Par conséquent, en intégrant sous $\mathrm{d}\mu$ (et en utilisant que les tailles valent exactement $\alpha_1$ et $\alpha_2$) :
$$\mathbb{E}_1[\phi_{\alpha_1}(Z)]-\mathbb{E}_1[\phi_{\alpha_2}(Z)]=c_{\alpha_2}\{\mathbb{E}_0[\phi_{\alpha_1}(Z)]-\mathbb{E}_0[\phi_{\alpha_2}(Z)]\}=c_{\alpha_2}(\alpha_1-\alpha_2).$$
- Or le terme de gauche est nul par hypothèse, donc $c_{\alpha_2}=0$ puisque $\alpha_1-\alpha_2\neq0$.

Si $c_{\alpha_2}=0$, alors $\mathbb{E}_1[\phi_{\alpha_2}(Z)]=1$ (note de bas de page du corrigé :
$$\mathbb{E}_1[\phi_{\alpha_2}(Z)]=\mathbb{P}_1(r(Z)>c_{\alpha_2})+\gamma_{\alpha_2}\mathbb{P}_1(r(Z)=c_{\alpha_2})=\mathbb{P}_1(r(Z)>0)+\gamma_{\alpha_2}\mathbb{P}_1(r(Z)=0)=\mathbb{P}_1(r(Z)>0)+\gamma_{\alpha_2}\mathbb{P}_1(p_1(Z)=0)=\mathbb{P}_1(r(Z)>0)=\mathbb{P}_1(r(Z)\ge0)=1,$$
puisque $\mathbb{P}_1(p_1(Z)=0)=0$). Et donc $\mathbb{E}_1[\phi_{\alpha_1}(Z)]=1$. **$\phi_{\alpha_1}$ est donc la fonction critique d'un test U.P.P.($\alpha_2$), de taille $\alpha_1$ strictement inférieure à $\alpha_2$ et de puissance 1.**

*Remarque (Corrigé p. 21).*
- On a démontré que si $\phi_\alpha$ est la fonction critique donnée par
$$\phi_\alpha(Z):=\begin{cases}1 & \text{si }r(Z)>c,\\ \gamma & \text{si }r(Z)=c,\\ 0 & \text{si }r(Z)<c,\end{cases}\qquad r(Z):=\frac{p_1(Z)}{p_0(Z)},$$
avec $c=0$, alors nécessairement $\mathbb{E}_1[\phi_\alpha(Z)]=1$. Si cette fonction critique est utilisée pour le test $H_0:p=p_0$ contre $H_1:p=p_1$, alors le test est de puissance 1.
- Dans la dernière question, on a construit un test U.P.P.($\alpha_2$) de puissance 1 et de taille strictement inférieure à $\alpha_2$ ; il n'y a **pas unicité** de ces tests puisque tout test de fonction critique $\phi_\alpha$ avec $\alpha\in[\alpha_1,\alpha_2[$ convient.

**Méthodes mobilisées :**
- caractérisation de $(c_\alpha,\gamma_\alpha)$ par **encadrement** $\mathbb{P}_0(r>c_\alpha)\le\alpha\le\mathbb{P}_0(r\ge c_\alpha)$ ; $c_\alpha$ comme **inf** d'un ensemble, ou comme **inverse généralisée** de la f.d.r. de $r(Z)$ sous $p_0$ (Th. 4.1 des compléments, lecture graphique) ;
- **inclusion des classes de tests** : niveau $\alpha_1$ $\Rightarrow$ niveau $\alpha_2$ ; optimalité dans la grande classe ;
- **unicité** des tests U.P.P. (Th. 1.2 / Th. 4.1) : produit nul $\mu$-p.p., puis **intégration** contre $\mu$ ;
- taille exacte $\mathbb{E}_0[\phi_\alpha]=\alpha$ ;
- raisonnement sur les événements $\{r=0\}=\{p_1=0\}$ sous $\mathbb{P}_1$.

**Pièges relevés / remarques du corrigé :**
- $c_\alpha$ n'est pas forcément unique (si la f.d.r. de $r(Z)$ est plate) : le corrigé fixe implicitement le **plus petit** choix ($\inf$, ou $F^{-1}$).
- Q2 : la puissance est **croissante** en le niveau ; l'erreur de seconde espèce $\mathbb{E}_1[1-\phi_\alpha]$ est **décroissante**.
- Q3 : l'égalité des puissances force $c_{\alpha_2}=0$ ; alors la puissance vaut 1. Il y a **non-unicité** des tests U.P.P.($\alpha_2$) (atomes : $\{r=0\}$ chargé sous $\mathbb{P}_0$).
- Illustration concrète : Exercice 3 (exponentielle translatée), où $\phi_\star$ est de taille $e^{-n(\theta_1-\theta_0)}<\alpha$ et de puissance 1.

**Résultats numériques :** aucun (exercice théorique). Exemple d'illustration *[Extracteur]* : Exercice 3 avec $n=5$, $\theta_1-\theta_0=1$ : pour tout $\alpha\in[e^{-5},1[\approx[0.0067,1[$, la puissance de $\phi_\alpha$ vaut 1 (égalité dans (4) pour $\alpha_1,\alpha_2$ dans cet intervalle).

---

### Exercice 6 — Rapport de vraisemblance à valeur discrète (⋆⋆)
**Source :** Énoncé PC5, p. 5–6 ; Corrigé PC5, « Corrigé Exercice 6 », p. 24–25. (= Poly ch.5, Exercice 3.)

**Énoncé complet.** Dans des applications de fiabilité ou sondage, au lieu de choisir a priori la taille d'un échantillon, on effectue l'expérience pendant un temps aléatoire jusqu'à obtenir $n$ réponses positives. Plus précisément, soit $\{X_k,\ k\in\mathbb{N}\}$ une suite de variables aléatoires indépendantes distribuées suivant une loi de Bernoulli de paramètre $\theta\in\Theta=\,]0,1[$. Notons $T_0=0$ et définissons récursivement les instants
$$T_i=\inf\{k>T_{i-1},\ X_k=1\},$$
c'est-à-dire l'instant où l'on tire le $i$-ième objet défectueux. On pose
$$Y_i=T_i-T_{i-1}-1.$$
1. Montrer que les variables aléatoires $Y_1,\dots,Y_n$ sont indépendantes, distribuées suivant une loi géométrique de paramètre $\theta$,
$$\mathbb{P}_\theta(Y_i=k)=\theta(1-\theta)^k,\qquad k\in\mathbb{N}.$$

Soit $\theta_0\in\Theta$. On considère le test
$$H_0:\ \theta\le\theta_0,\qquad\text{contre}\qquad H_1:\ \theta>\theta_0.\tag{5}$$
2. Soit $Z=(Y_1,\cdots,Y_n)$ le vecteur d'observation. Montrer que la famille $(\mathbb{P}_\theta)_{\theta\in\Theta}$ est à rapport de vraisemblance monotone en la statistique $T(Z):=\sum_{i=1}^nY_i$.
3. Montrer que pour tout $\theta\in\Theta$,
$$\mathbb{P}_\theta(T(Z)=k)=\binom{n+k-1}{k}\theta^n(1-\theta)^k.$$
4. Déterminer la fonction critique d'un test U.P.P.($\alpha$) pour $\alpha\in\,]0,1[$.

**Corrigé complet (Corrigé PC5, p. 24–25).**

*Q1.* Pour tout $(k_1,\dots,k_n)\in\mathbb{N}^n$, en utilisant le fait que les $(X_i)$ sont indépendantes et de même loi de Bernoulli de paramètre $\theta$ :
$$\begin{aligned}\mathbb{P}_\theta(Y_1=k_1,\dots,Y_n=k_n)&=\mathbb{P}_\theta\Big(T_1=k_1+1,\dots,T_n=\sum_{i=1}^nk_i+n\Big)\\&=\mathbb{P}_\theta\Big(\cap_{i=1}^n\big\{X_{\sum_{j=1}^{i-1}k_j+i}=\dots=X_{\sum_{j=1}^ik_j+i-1}=0,\ X_{\sum_{j=1}^ik_j+i}=1\big\}\Big)\\&=\prod_{i=1}^n(1-\theta)^{k_i}\theta.\end{aligned}$$
(Première égalité : $T_i=\sum_{j\le i}(Y_j+1)$, correspondance bijective ; deuxième : description de l'événement — $k_i$ échecs puis un succès dans le $i$-ième bloc ; troisième : **indépendance** des $X_k$, les blocs d'indices étant disjoints.) La loi jointe étant un **produit** de lois géométriques, les $(Y_i)_{1\le i\le n}$ sont bien indépendantes de loi géométrique de paramètre $\theta$.

*Q2.* La densité de $Z=(Y_1,\dots,Y_n)$ par rapport à la mesure de comptage est
$$(k_1,\dots,k_n)\mapsto\theta^n(1-\theta)^{\sum_{i=1}^nk_i}.$$
Ainsi, pour $0<\theta_1<\theta_2<1$ (le corrigé écrit $0\le\theta_1$ : coquille 14),
$$\frac{\mathbb{P}_{\theta_2}(Y_1=k_1,\dots,Y_n=k_n)}{\mathbb{P}_{\theta_1}(Y_1=k_1,\dots,Y_n=k_n)}=\frac{\theta_2^n}{\theta_1^n}\exp\Big\{(\log(1-\theta_2)-\log(1-\theta_1))\sum_{i=1}^nk_i\Big\}=\varphi\Big(\sum_{i=1}^nk_i\Big).$$
Il s'ensuit que le rapport de vraisemblance s'écrit
$$r(Z)=\varphi(T(Z)),\qquad T(Z):=\sum_{i=1}^nY_i,$$
ce qui démontre le résultat puisque la fonction $\varphi(t)=\frac{\theta_2^n}{\theta_1^n}\exp\{(\log(1-\theta_2)-\log(1-\theta_1))t\}$ est bien **strictement décroissante** lorsque $\theta_1<\theta_2$ ($\log(1-\theta)$ décroît en $\theta$). La famille est à rapport de vraisemblance monotone **décroissant** en $T$ (Déf. 1.5 du Poly ch.5).

*Q3. Solution 1 (transformée de Laplace).* On note $H(n)$ la loi dont la densité $h(n,\cdot)$ par rapport à la mesure de comptage est définie, pour tout $k\in\mathbb{N}$, par
$$h(n,k)=\binom{n+k-1}{k}\theta^n(1-\theta)^k.$$
Remarquons tout de suite que $Y_1$ a pour loi $H(1)$. On calcule la transformée de Laplace de cette loi, il s'agit, pour tout $u>0$, d'évaluer la somme
$$\sum_{k=0}^{+\infty}e^{-uk}\binom{n+k-1}{k}\theta^n(1-\theta)^k.$$
Pour cela, on remarque que, pour tout réel $x\in(-1,1)$ et tout entier $k\ge0$ (dérivation $k$ fois terme à terme de la série géométrique),
$$\frac{k!}{(1-x)^{k+1}}=\Big(\frac{1}{1-x}\Big)^{(k)}=\Big(\sum_{\ell=0}^{+\infty}x^\ell\Big)^{(k)}=\sum_{\ell=0}^{+\infty}\frac{(k+\ell)!}{\ell!}x^\ell.$$
Il s'ensuit, en appliquant ce résultat à $x=(1-\theta)e^{-u}$ et $k=n-1$, que
$$\sum_{k=0}^{+\infty}e^{-uk}\binom{n+k-1}{k}\theta^n(1-\theta)^k=\Big(\frac{\theta}{1-e^{-u}(1-\theta)}\Big)^n.$$
On en déduit donc que, pour tous entiers $n$ et $k$, $H(n)\ast H(k)=H(n+k)$ (la transformée de Laplace d'une somme indépendante est le produit des transformées, et elle caractérise la loi), et donc que $T=\sum_{i=1}^nY_i$ a pour loi $H(1)^{\ast n}=H(n)$.

*Q3. Solution 2 (fonction génératrice).* Déterminons la loi de la somme en utilisant la « fonction génératrice des moments » (au sens du corrigé : $s\mapsto\mathbb{E}_\theta[s^{Y_1}]$, fonction génératrice des probabilités). On a
$$\mathbb{E}_\theta\big[s^{Y_1}\big]=\sum_{k\ge0}s^k\mathbb{P}_\theta(Y_1=k)=\sum_{k\ge0}s^k(1-\theta)^k\theta=\frac{\theta}{1-s(1-\theta)},$$
définie pour tout $s\in\mathbb{R}$ tel que $|s|(1-\theta)<1$. En utilisant l'**indépendance** des v.a. $Y_i$ et le fait qu'elles aient même loi, il vient pour tout $s$ tel que $|s|(1-\theta)<1$,
$$\mathbb{E}_\theta\big[s^{Y_1+\dots+Y_n}\big]=\Big(\frac{\theta}{1-s(1-\theta)}\Big)^n.$$
Puis en utilisant la relation
$$\partial_s^{(q)}\big(\mathbb{E}_\theta\big[s^{Y_1+\dots+Y_n}\big]\big)\big|_{s=0}=q!\,\mathbb{P}_\theta\Big(\sum_{i=1}^nY_i=q\Big)$$
et le fait que
$$\partial_s^{(q)}\big(\mathbb{E}_\theta\big[s^{Y_1+\dots+Y_n}\big]\big)\big|_{s=0}=\theta^n\,n(n+1)\cdots(n+q-1)(1-\theta)^q,$$
on obtient le résultat demandé (*[Extracteur]* $\frac{n(n+1)\cdots(n+q-1)}{q!}=\binom{n+q-1}{q}$).

*Q4. Test U.P.P. (randomisé).* La famille de lois étant à rapports de vraisemblance **strictement décroissants**, un test du rapport de vraisemblance s'écrit (on rejette pour les **petites** valeurs de $T$ ; statistique **discrète** $\Rightarrow$ randomisation)
$$\phi_\alpha(Z)=\mathbb{1}_{\{T(Z)<c\}}+\gamma\,\mathbb{1}_{\{T(Z)=c\}},\qquad\text{où}\qquad\mathbb{P}_{\theta_0}(T(Z)<c)+\gamma\,\mathbb{P}_{\theta_0}(T(Z)=c)=\alpha.$$
(Version randomisée du Th. 1.4 du Poly ch.5 : compléments, « résultat principal » après l'Ex. 4.2, avec $T$ remplacé par $-T$.) De façon équivalente (formulation corrigée, cf. coquille 13 ; le corrigé écrit à tort $1-\alpha=(1-\gamma)\mathbb{P}_{\theta_0}(T\le c)+\gamma\,\mathbb{P}_{\theta_0}(T<c)$), $(c,\gamma)$ sont choisis tels que
$$\alpha=\gamma\,\mathbb{P}_{\theta_0}(T(Z)\le c)+(1-\gamma)\,\mathbb{P}_{\theta_0}(T(Z)<c).$$
En particulier,
$$c_\alpha:=F^{-1}_{\theta_0,T(Z)}(\alpha),$$
où $F_{\theta_0,T(Z)}$ désigne la fonction de répartition de la v.a. $T(Z)$ lorsque les v.a. $(X_k)_k$ sont i.i.d. $\mathcal{B}(\theta_0)$ (et $F^{-1}$ son inverse généralisée). On a vu que $T(Z)$ était à valeurs entières, donc $F_{\theta_0,T(Z)}$ est une fonction en escalier. On est alors dans une des configurations suivantes :
- (a) soit il existe $q_\alpha\in\mathbb{N}$ tel que $\mathbb{P}(T(Z)<q_\alpha)<\alpha<\mathbb{P}(T(Z)\le q_\alpha)$, et dans ce cas
$$c_\alpha=q_\alpha,\qquad\gamma_\alpha=\frac{\alpha-\mathbb{P}(T(Z)<q_\alpha)}{\mathbb{P}(T(Z)\le q_\alpha)-\mathbb{P}(T(Z)<q_\alpha)};$$
- (b) soit il existe $q_\alpha\in\mathbb{N}$ tel que $\mathbb{P}(T(Z)<q_\alpha)=\alpha$ (le corrigé écrit « $\mathbb{P}(T(Z)=q_\alpha)=\alpha$ », coquille 13), et dans ce cas
$$c_\alpha=q_\alpha,\qquad\gamma_\alpha=0.$$

(Les probabilités sont sous $\mathbb{P}_{\theta_0}$, avec $\mathbb{P}_{\theta_0}(T(Z)=k)=\binom{n+k-1}{k}\theta_0^n(1-\theta_0)^k$ par Q3.)

**Méthodes mobilisées :**
- calcul de loi jointe par **description d'événements** et **indépendance** (blocs disjoints) ; forme produit $\Rightarrow$ indépendance ;
- densité par rapport à la **mesure de comptage** ; rapport de vraisemblance monotone **décroissant** (Déf. 1.5) ;
- loi d'une somme de v.a. i.i.d. : **transformée de Laplace** (Solution 1) ou **fonction génératrice** + dérivées successives en 0 (Solution 2) ; dérivation terme à terme d'une série entière ;
- loi **binomiale négative** (Poly ch.5, Outils p. 27–28) ;
- **test U.P.P. unilatéral randomisé** (Th. 1.4 + Th. 4.1 / Ex. 4.2 des compléments) : on rejette pour $T$ **petit** ;
- inverse généralisée de la f.d.r. d'une loi **discrète**, calcul de $\gamma_\alpha$ par interpolation.

**Pièges relevés / remarques du corrigé :**
- Sens du rejet : rapport **décroissant** en $T$ $\Rightarrow$ on rejette $H_0:\theta\le\theta_0$ quand $T$ est **petit** (peu d'échecs entre les succès $\leftrightarrow$ $\theta$ grand).
- $T(Z)$ est **discrète** : le Th. 1.3/1.4 « à densité » ne s'applique pas tel quel ; il faut **randomiser** pour atteindre la taille exactement $\alpha$.
- Convention géométrique « nombre d'échecs » (support $\mathbb{N}$, d'où le « $-1$ » dans $Y_i=T_i-T_{i-1}-1$).
- Coquilles de la Q4 (formulation « équivalente » et cas (b)) : voir §0.5, point 13.
- Le seuil se calcule **sous $\theta_0$** (borne de $H_0$), grâce à la monotonie de la fonction puissance (Lemme 2.1).

**Résultats numériques** *[Extracteur]* ($n=5$, $\theta_0=0.5$, $\alpha=0.05$) : $\mathbb{P}_{\theta_0}(T=0)=0.5^5=0.03125$, $\mathbb{P}_{\theta_0}(T=1)=5\times0.5^6=0.078125$, donc $\mathbb{P}(T<1)=0.03125<0.05<\mathbb{P}(T\le1)=0.109375$ : cas (a) avec $c_\alpha=q_\alpha=1$ et $\gamma_\alpha=\dfrac{0.05-0.03125}{0.078125}=0.24$. Le test rejette si $T=0$, et rejette avec probabilité $0.24$ si $T=1$.

---

## 2. Synthèse des méthodes de la PC

| Méthode | Exercices où elle apparaît | Résultat du poly utilisé |
|---|---|---|
| Densité / vraisemblance d'un $n$-échantillon (produit, par indépendance) | 1, 2, 3, 4, 6 | ch.1 (modèles produits) ; ch.2 (vraisemblance) |
| Calcul du rapport de vraisemblance et réduction à une statistique strictement monotone | 1, 2, 3, 6 | Poly ch.5, Déf. 1.3, Méthodes 1.1–1.2 |
| Vérification de l'absence d'atome $\Rightarrow$ test pur ($\gamma=0$) | 1, 2 | Poly ch.5, Cadre 1.1 |
| Lemme (théorème) de Neyman-Pearson, deux hypothèses simples | 1, 2 | Poly ch.5, Th. 1.1 |
| Neyman-Pearson randomisé (atomes, $\gamma\in[0,1]$) | 3, 5, 6 | Poly ch.5, compléments, Th. 4.1, Déf. 4.1, Ex. 4.1–4.2 |
| Seuil calculé sous $\mathbb{P}_{\theta_0}$ avec taille exactement $\alpha$ | 1, 2, 3, 6 | Poly ch.5, Méthode 1.1 (étape 4), Th. 1.3 |
| Rapport de vraisemblance monotone (croissant / décroissant) | 1 (croissant), 2 (croissant), 6 (décroissant) | Poly ch.5, Déf. 1.4, Déf. 1.5, Ex. 1.4 |
| Test U.P.P. unilatéral ; « le test ne dépend pas de $\theta_1$ » | 1, 2, 6 | Poly ch.5, Th. 1.3, Th. 1.4, Méthode 1.3, Lemme 2.1 |
| Unicité des tests U.P.P. + raisonnement par l'absurde | 2 (Q3), 5 (Q3) | Poly ch.5, Th. 1.2, Prop. 1.1, Ex. 1.6 ; Th. 4.1 |
| Non-unicité des U.P.P. en présence d'atomes | 3, 5 | Poly ch.5, Th. 4.1 (« l'unicité est perdue »), Ex. 4.5 |
| Comparaison avec le test constant $\phi\equiv\alpha$ | 2 (Q5) | Poly ch.5, preuve Th. 1.1 (étape 9), Prop. 4.1 |
| Calcul de fonctions puissance via $\Phi$ (centrage-réduction) | 1, 2 | ch.4, Déf. 2.2, Ex. 2.3 ; Poly ch.5, Ex. 1.3 |
| Tests sans biais, conditions $\beta_\phi(\theta_0)=\alpha$, $\beta'_\phi(\theta_0)=0$, optimalité U.M.P.U. | 2 (Q5–Q8) | Poly ch.5, compléments, Déf. 4.2, Prop. 4.1 |
| Convergence dominée (dérivation sous l'intégrale) ; condition du 1er ordre en un minimum | 2 (Q6) | analyse (hors poly) |
| Convexité de l'exponentielle (sous ses cordes) | 2 (Q8b) | analyse (hors poly) |
| Inégalité clé « à la Neyman-Pearson » sur une fonctionnelle linéaire | 2 (Q8c) | Poly ch.5, Th. 1.1, inégalité (1) |
| Additivité Gamma, $\chi^2(2n)$, changement de variable | 1 | ch.1, Prop. 2.8 ; outils Gamma |
| Loi du minimum $X_{1:n}$ | 3 | ch.1, statistiques d'ordre (§1.5) |
| EMV du modèle linéaire gaussien (moindres carrés, maximisation profilée) | 4 | ch.2, Exercice 1, Ex. 4.7 |
| Multiplicateurs de Lagrange, convexité | 4 | analyse (hors poly) |
| Projections orthogonales, Pythagore, projecteur $\mathbf{M}=\Pi-\Pi_0$ | 4 | ch.1 (Cochran, §1.9) ; ch.2 Exercice 1 |
| Rapport de vraisemblance généralisé | 4 | Poly ch.5, compléments, Déf. 4.3, Ex. 4.3 |
| Théorème de Cochran, loi de Fisher | 4 | ch.1, Th. 1.1 ; ch.4, Déf. 3.2 |
| ANOVA à un facteur comme régression | 4 (Q5) | — (application) |
| Inverse généralisée de la f.d.r., monotonie de $c_\alpha$ en $\alpha$ | 5, 6 | Poly ch.5, Outils (fonction quantile), Th. 4.1 (lecture graphique) |
| Loi géométrique, binomiale négative ; transformée de Laplace, fonction génératrice | 6 | Poly ch.5, Outils p. 27–28 |

---

## 3. Idées de reformulation en exercices interactifs sans saisie de formule

### Exercice 1 — Modèle exponentiel
1. **QCM (sens du rejet) :** « Pour $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ dans le modèle $p_\theta(x)=\theta^{-1}e^{-x/\theta}$, le test U.P.P. rejette lorsque : (A) $\sum x_i>c$ ; (B) $\sum x_i<c$ ; (C) $|\sum x_i-n\theta_0|>c$ ; (D) $x_{1:n}>c$. » Réponse : (A) (rapport croissant en $\sum x_i$).
2. **Étape suivante à choisir :** après avoir écrit $\alpha=\mathbb{P}_{\theta_0}(\sum_iX_i>c)$, choisir la bonne suite : (A) $\sum_iX_i\sim\mathrm{Gamma}(n,\theta_0^{-1})$ donc $2\sum_iX_i/\theta_0\sim\chi^2(2n)$ et $c=\theta_0q^{\chi^2(2n)}_{1-\alpha}/2$ ✔ ; (B) on calcule sous $\theta_1$ ; (C) $\sum_iX_i\sim\chi^2(n)$ ; (D) on randomise car la loi est discrète.
3. **Application numérique (curseur / choix) :** $n=10$, $\theta_0=1$, $\alpha=0.05$ : quelle est la valeur du seuil $c$ sur $\sum_ix_i$ ? (A) $15.7$ ✔ ; (B) $31.4$ ; (C) $10$ ; (D) $1.645$. Variante vrai/faux : « Le test de Neyman-Pearson de $\theta_0$ contre $\theta_1$ dépend de $\theta_1$ » (Faux).

### Exercice 2 — Pas d'U.P.P. bilatéral, test U.M.P.U.
1. **Associer** chaque test à sa fonction puissance (figure 4) et à son optimalité : $\phi^{\star,1}$ $\leftrightarrow$ courbe croissante, U.P.P. pour $\theta>\theta_0$ ; $\phi^{\star,2}$ $\leftrightarrow$ courbe décroissante, U.P.P. pour $\theta<\theta_0$ ; $\phi^{\star,3}$ $\leftrightarrow$ courbe en U, U.M.P.U. bilatéral, non U.P.P.
2. **Preuve à ordonner (Q3, absurde) :** (i) supposer $\phi^\star$ U.P.P. pour $\theta\neq\theta_0$ ; (ii) il est U.P.P. pour $\theta_0$ contre $\theta_1>\theta_0$ et pour $\theta_0$ contre $\theta_1<\theta_0$ ; (iii) par unicité (Th. 1.2), $\phi^\star=\phi^{\star,1}$ et $\phi^\star=\phi^{\star,2}$ p.s. ; (iv) sur $\{\bar x_n>\theta_0+q_{1-\alpha}/\sqrt n\}$ (probabilité $\alpha>0$) on aurait $\phi^\star=1$ et $\phi^\star=0$ : contradiction.
3. **Trouver l'erreur / Vrai-Faux :** « Le test bilatéral $\phi^{\star,3}$ est U.P.P.($\alpha$) car il est sans biais » (Faux : sans biais + optimal parmi les sans biais = U.M.P.U., pas U.P.P.) ; « $\beta_{\phi^{\star,2}}(0.5)<\alpha$ pour $n=10$, $\theta_0=0$ » (Vrai, $\approx0.0006$ : test biaisé) ; « Dans Q6, la continuité de $\beta_\phi$ suffit pour obtenir $\beta'_\phi(\theta_0)=0$ » (Faux, il faut la dérivabilité). Application numérique : puissance de $\phi^{\star,3}$ en $\theta=0.5$ ($n=10$, $\alpha=0.05$) parmi $\{0.05;\ 0.353;\ 0.475;\ 0.885\}$ → $0.353$.

### Exercice 3 — Exponentielle translatée
1. **QCM (valeurs de $r$) :** « Sur $\{x_{1:n}>\theta_0\}$, le rapport $p(\theta_1;\cdot)/p(\theta_0;\cdot)$ prend : (A) une infinité de valeurs ; (B) les deux valeurs $0$ et $e^{n(\theta_1-\theta_0)}$ ✔ ; (C) les valeurs $1$ et $e^{-n(\theta_1-\theta_0)}$ ; (D) une seule valeur. » Conséquence à cocher : randomisation nécessaire.
2. **Choix du cas + application numérique :** donner $n$, $\theta_1-\theta_0$, $\alpha$ ; l'étudiant choisit « forme $\phi_1$ » ou « forme $\phi_2$ » puis la valeur de $\gamma$ parmi des propositions ($n=5$, $\Delta=1$, $\alpha=0.05$ : $\phi_1$, $\gamma\approx0.044$ ; $n=5$, $\Delta=0.5$ : $\phi_2$, $\gamma\approx0.609$).
3. **Vrai/Faux (remarque du corrigé) :** « Le test U.P.P. de taille exactement $\alpha$ peut rejeter $H_0$ sur des données impossibles sous $H_1$ » (Vrai) ; « Le test pur $\mathbb{1}_{\{X_{1:n}>\theta_1\}}$ n'est pas U.P.P.($\alpha$) car sa taille est $<\alpha$ » (Faux : puissance 1, il est U.P.P.) ; « Le seuil en Q4 est $c=e^{-n(\theta_1-\theta_0)}$ » (Faux, trouver l'erreur : $c=e^{n(\theta_1-\theta_0)}$).

### Exercice 4 — Rapport de vraisemblance généralisé, régression, ANOVA
1. **Preuve à ordonner (loi de $F$ sous $H_0$) :** (i) sous $H_0$, $\mathbb{E}_\theta[\mathbf{Y}]\in V_0\subset V$ ; (ii) donc $(\mathbf{I}_n-\Pi)\mathbf{Y}$ et $(\Pi-\Pi_0)\mathbf{Y}$ ne changent pas si l'on centre $\mathbf{Y}$ ; (iii) Cochran : $n\hat\sigma^2/\sigma^2\sim\chi^2(n-p)$, $\mathbf{Y}^T\mathbf{M}\mathbf{Y}/\sigma^2\sim\chi^2(p-r)$ ; (iv) $(\mathbf{I}_n-\Pi)(\Pi-\Pi_0)=0$ $\Rightarrow$ indépendance ; (v) le rapport normalisé suit $\mathrm{F}(p-r,n-p)$.
2. **QCM (degrés de liberté) :** loi de $F$ sous $H_0$ : (A) $\mathrm{F}(p-r,n-p)$ ✔ ; (B) $\mathrm{F}(n-p,p-r)$ ; (C) $\mathrm{F}(p,n)$ ; (D) $\chi^2(p-r)$. Variante ANOVA ($r$ groupes, $n$ observations) : $\mathrm{F}(r-1,n-r)$.
3. **Trouver l'erreur / Vrai-Faux :** « Le test du rapport de vraisemblance généralisé rejette $H_0$ quand $\Lambda$ est grand » (Faux, quand $\Lambda$ est petit $\iff$ $F$ grand) ; « $\Lambda$ est une fonction croissante de $F$ » (Faux, $\Lambda=(1+\frac{p-r}{n-p}F)^{-n/2}$ décroissante) ; associer $\Pi\mathbf{Y}$ $\leftrightarrow$ moyennes de groupe, $\Pi_0\mathbf{Y}$ $\leftrightarrow$ moyenne globale, $n\hat\sigma^2$ $\leftrightarrow$ variabilité intra, $\mathbf{Y}^T\mathbf{M}\mathbf{Y}$ $\leftrightarrow$ variabilité inter.

### Exercice 5 — Monotonie en le niveau
1. **Vrai/Faux :** « Si $\alpha_1<\alpha_2$ alors $c_{\alpha_1}\ge c_{\alpha_2}$ » (Vrai) ; « La puissance de $\phi_\alpha$ est décroissante en $\alpha$ » (Faux, croissante) ; « Deux tests U.P.P.($\alpha$) ont toujours la même taille » (Faux, Q3 : taille $\alpha_1<\alpha_2$).
2. **Preuve à ordonner (Q3) :** (i) égalité des puissances $\Rightarrow$ $\phi_{\alpha_1}$ est U.P.P.($\alpha_2$) ; (ii) unicité : $(\phi_{\alpha_1}-\phi_{\alpha_2})(p_1-c_{\alpha_2}p_0)=0$ $\mu$-p.p. ; (iii) intégration : $0=c_{\alpha_2}(\alpha_1-\alpha_2)$ ; (iv) donc $c_{\alpha_2}=0$ ; (v) donc $\mathbb{E}_1[\phi_{\alpha_2}]=\mathbb{P}_1(p_1>0)=1$ ; (vi) $\phi_{\alpha_1}$ : taille $\alpha_1<\alpha_2$, puissance 1.
3. **Étape suivante à choisir (Q2) :** « $\phi_{\alpha_1}$ est de niveau $\alpha_1$. Donc… » (A) il est de niveau $\alpha_2$, et $\phi_{\alpha_2}$ étant U.P.P.($\alpha_2$), $\mathbb{E}_1[\phi_{\alpha_1}]\le\mathbb{E}_1[\phi_{\alpha_2}]$ ✔ ; (B) $\phi_{\alpha_1}=\phi_{\alpha_2}$ p.s. ; (C) $c_{\alpha_1}=c_{\alpha_2}$.

### Exercice 6 — Temps d'attente géométriques
1. **QCM (sens du rejet) :** rapport de vraisemblance $\varphi(T)$ strictement **décroissant** en $T$ ; pour $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ on rejette quand : (A) $T$ petit ✔ ; (B) $T$ grand ; (C) $|T-n(1-\theta_0)/\theta_0|$ grand.
2. **Application numérique :** $n=5$, $\theta_0=0.5$, $\alpha=0.05$ : choisir $(c_\alpha,\gamma_\alpha)$ parmi $(0,1)$, $(1,0.24)$ ✔, $(1,0.64)$, $(2,0)$ ; justifier par $\mathbb{P}(T=0)=0.03125$, $\mathbb{P}(T=1)=0.078125$.
3. **Trouver l'erreur :** présenter la ligne du corrigé « $1-\alpha=(1-\gamma)\mathbb{P}_{\theta_0}(T\le c)+\gamma\,\mathbb{P}_{\theta_0}(T<c)$ » pour le test $\mathbb{1}_{\{T<c\}}+\gamma\mathbb{1}_{\{T=c\}}$ et demander de repérer l'incohérence (formule du cas « rejet pour $T$ grand » ; bonne écriture : $\alpha=\gamma\,\mathbb{P}_{\theta_0}(T\le c)+(1-\gamma)\,\mathbb{P}_{\theta_0}(T<c)$). Variante « associer » : Solution 1 $\leftrightarrow$ transformée de Laplace, Solution 2 $\leftrightarrow$ fonction génératrice et dérivées en $0$.
