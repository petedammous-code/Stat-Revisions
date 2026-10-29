# PC 4 — Régions de confiance et tests : fonctions pivotales, fonction puissance, taille et niveau, $p$-valeur (exponentiel, gaussien, uniforme, Poisson, deux échantillons gaussiens, vaccination, Wilcoxon)

> **Sources extraites :** `S4_APM-41033-EP-PC4-enonce` (7 p., « Rappels » + « 1 Exercices », p. 1–7) et `S4_APM-41033-EP-PC4-corrige` (24 p. de PDF, « 2 Solutions », **p. 8–31** dans la pagination imprimée du document). Toutes les formules ont été vérifiées visuellement sur les PDF. Les valeurs numériques du corrigé ont été recontrôlées (scipy) ; les écarts sont signalés.
> **Convention de citation :** « PC4 Ex. k Q. m ». Les résultats de cours sont cités « Poly ch.N, Déf./Prop./Ex. … » d'après les extractions `ch1.md`, `ch2.md`, `ch4.md`. **Attention :** le ch.4 n'a **pas de théorème numéroté dans la partie Cours** (les résultats démontrés sont des *Propositions* 1.1, 2.1, 2.2 ; *Méthodes* 1.1 et 2.1) ; « Théorème 1.1 » et « Théorème 1.3 » désignent ci-dessous **Cochran** et **Gosset** du **ch.1**.
> **Rapport avec le poly :** les 7 exercices de la PC 4 sont **exactement les Exercices 1 à 7 de la §4 « Les exercices » du poly ch.4** (p. 39–45, corrigés intégrés p. 46–54), dont le corrigé « reprend, en les complétant et en corrigeant », celui distribué avec la feuille de PC 2025. Ici on reproduit **le corrigé officiel de la PC** ; quand le poly diffère (correction, complément, notation), c'est signalé par **[Poly ch.4]**. D'après le poly : Groupe 1 (Ex. 1–3) traité en PC ; Groupe 2 (Ex. 4–7) **bonus** (ordre conseillé : 4 d'abord, 7 en dernier). La feuille de PC elle-même ne mentionne pas ce découpage.
> Les passages imprimés **en bleu** dans le corrigé (remarques « Rque. », figures commentées, « Compléments », approche 2.6.2 de l'Ex. 6…) sont des compléments du corrigé ; ils sont reproduits et signalés « (bleu) ».

---

## 0. Chapitres du poly mobilisés et rappels donnés en tête d'énoncé

### 0.1 Rappels donnés en tête de l'énoncé (p. 1, reproduits fidèlement)

**A. Loi Gamma (convention forme–taux).** Une loi Gamma de paramètres $(\alpha,\beta)$ positifs est une loi sur $\mathbb{R}^+$ dont la densité est donnée par
$$x\mapsto\frac{\beta^\alpha}{\Gamma(\alpha)}x^{\alpha-1}\exp(-\beta x)\ ;\qquad \Gamma(a):=\int_0^{+\infty}t^{a-1}\exp(-t)\,\mathrm{d}t .$$
Son espérance est $\alpha/\beta$ et sa variance est $\alpha/\beta^2$. Si les v.a. $X,Y$ sont indépendantes et de loi Gamma $(a,b)$ et $(a',b)$ respectivement, alors $X+Y$ suit une loi Gamma de paramètres $(a+a',b)$.

> ⚠ Ici $\beta$ est un **taux** (intensité) : $\Gamma(1,\beta)=\mathcal{E}(\beta)$, loi exponentielle d'espérance $1/\beta$. Le second paramètre est commun dans la propriété d'additivité.

**B. Loi du $\chi^2$.** La loi du $\chi^2$ à $p$ degrés de liberté est une loi Gamma de paramètres $(p/2,1/2)$. C'est la loi de $\sum_{i=1}^pX_i^2$ lorsque les v.a. $(X_i)_{i=1}^p$ sont i.i.d. de loi $\mathcal{N}(0,1)$.

**C. Loi de Student décentrée.** Soit $W$ une variable gaussienne standard et $V$ une variable du $\chi^2$ centrée à $p$ degrés de liberté, indépendante de $W$. Alors la variable
$$T=\frac{W+\gamma}{\sqrt{V/p}}$$
est distribuée suivant une loi de Student décentrée, à $p$ degrés de liberté et de paramètre de non-centralité $\gamma$. (Pour $\gamma=0$ : loi de Student (centrée) à $p$ degrés de liberté.)

**D. Loi de Fisher.** Si $U$ et $V$ sont deux v.a. indépendantes de loi resp. $\chi^2(n)$ et $\chi^2(p)$ alors
$$\frac{U/n}{V/p}$$
suit une loi de Fisher de paramètres $(n,p)$.

**Convention (début de la §1 « Exercices »).** Par convention, les vecteurs sont des vecteurs **colonne** ; pour un vecteur $a$, $a^T$ désigne sa transposée.

**Figures de l'énoncé** (utiles pour des exercices visuels) :
- Figure 1 [gauche] (Ex. 1) : densité du $\chi^2(p)$ pour $p\in\{2,3,6,10\}$ ; « lorsque $p\ge 2$, le mode de la densité est atteint en $x=p-2$ ». [droite] (Ex. 1) : fonctions puissance de plusieurs tests répondant à la contrainte de niveau, pour des seuils $c=c_\alpha$, $c=1.3\,c_\alpha$, $c=1.7\,c_\alpha$, $c=2\,c_\alpha$ ; « le test dont le seuil critique est $c_\alpha$ a une taille égale à $\alpha$ » (c'est la courbe la plus haute).
- Figure 2 [gauche] (Ex. 2) : fonction puissance $\mu\mapsto\beta_c(\mu)$ pour $n\in\{5,10,20\}$, $\mu_0=0$, $\sigma=1$, $c=\Phi^{-1}(0.975)$, avec la droite $y=0.05$ ; [droite] densité de $\lvert X\rvert$ (à constante près) pour $X\sim\mathcal{N}(\nu,1)$, $\nu\in\{0,1,2\}$.
- Figure 3 [gauche] : fonction puissance $\theta\mapsto\mathbb{P}_\theta(T(Z)>c_\alpha)$ avec les droites $y=0.049$ et $y=0.8435=1-0.1565$ — **la légende dit « Exercice 2 », il s'agit en fait de l'Exercice 4** ; [droite] densités de Fisher $(10,5)$ (rouge) et $(100,50)$ (bleu) — **la légende dit « Exercice 4 », il s'agit de l'Exercice 5**.

### 0.2 Notations particulières de la feuille (à reproduire telles quelles) et correspondance avec le poly

| Notation PC 4 | Signification | Notation du poly ch.4 |
|---|---|---|
| $(\mathbb{R}^+,\mathcal{B}(\mathbb{R}^+),\{p_\theta\cdot\mathrm{dLeb},\ \theta>0\})$ | modèle dominé écrit avec la densité $p_\theta$ et « $\mathrm{dLeb}$ » | $\{\mathbb{P}_\theta\}$, $\mathcal{E}(1/\theta)$ |
| $\mathrm{Leb}$, $\mathrm{dLeb}^{\otimes(n+p)}$, $\mathrm{dLeb}^{n+p}$ | mesure de Lebesgue (et produit) | idem |
| $\mu$ (Ex. 4) | mesure de comptage sur $\mathbb{N}$ (attention : pas une moyenne !) | — |
| $\mathrm{N}(\mu,\sigma^2)$ (énoncé, droit) et $\mathcal{N}(\mu,\sigma^2)$ (corrigé) | loi gaussienne | $\mathcal{N}(\mu,\sigma^2)$ |
| $\mathrm{N}_n(m,\Sigma)$ | vecteur gaussien de $\mathbb{R}^n$ | $\mathcal{N}(m,\Sigma)$ |
| $\Gamma(a,b)$, $\chi^2(k)$, $\mathcal{E}(\lambda)$ | Gamma (forme, taux), khi-deux, exponentielle d'intensité $\lambda$ | idem |
| $\mathcal{P}(\theta)$, $\mathcal{P}_{10}$, $\mathcal{P}(10)$ | loi de Poisson | $\mathrm{Poi}(\theta)$ |
| $\mathcal{B}(p)$, $\mathrm{Bin}(n,p)$ | Bernoulli, binomiale | $\mathcal{B}\mathrm{er}(p)$, $\mathrm{Bin}(n,p)$ |
| $q^{\chi^2(2n)}_{1-\alpha}$ | quantile d'ordre $1-\alpha$ de $\chi^2(2n)$ | $\chi^2_{1-\alpha}(2n)$ |
| $\Phi$, $\Phi^{-1}$ | f.d.r. de $\mathcal{N}(0,1)$ et sa réciproque | $\Phi$, $z_\beta$ ($\Phi^{-1}$ non employé) |
| $t_{n+p-2}$ (loi), $t^{u}_{n+p-2}$ (quantile d'ordre $u$) | Student centrée à $n+p-2$ d.l. | $\mathrm{t}(k)$, $\mathrm{t}^{(k)}_u$ |
| $t$ (Ex. 2 Q7) | **f.d.r.** de la Student centrée à $n-1$ d.l. ; $t^{-1}$ sa réciproque | $F_{\mathrm{t}(n-1)}$ |
| $f^{1-\alpha}_{n-1,p-1}$, $F_{n-1,p-1}$, $W_{n-1,p-1}$ | quantile, f.d.r., v.a. de la loi de Fisher $(n-1,p-1)$ | $\mathrm{f}_{1-\alpha}(n-1,p-1)$, $\mathrm{F}(k_1,k_2)$ |
| $F_{\mathcal{P}(10)}$, $F_{p_0}^{-1}$ (aussi écrit $F_b^{-1}$), $F_{\theta_0}^{-1}$ | f.d.r. de $\mathcal{P}(10)$ ; inverses généralisées des f.d.r. $\mathrm{Bin}(n,p_0)$ et $\mathcal{P}(\theta_0)$ | $F^{\leftarrow}$ (Déf. 3.1) |
| $\delta_c$, $\tilde\delta_c$ (Ex. 2) | tests purs de seuil $c$ | $\phi_c$, $\tilde\phi_c$ |
| $T(Z)$, $\tilde T(Z)$ ; $c$, $c_\alpha$, $d$ | statistique de test ; seuil (valeur) critique | $T(Z)$ ; $c$, $c_\alpha$ |
| $\mathcal{R}$, $R_\alpha$, $\mathcal{R}_\alpha$, $R'_\alpha$ | zone (région) de rejet | $\mathcal{R}$, $\mathcal{R}_\alpha$, $\mathcal{R}'$ |
| $\beta_c(\mu)$ | fonction puissance du test de seuil $c$ | $\beta_\phi$ |
| $\overline{\alpha}_c$ | taille (risque de première espèce) en fonction du seuil $c$ | $\overline{\alpha}(\phi)$ |
| $\alpha(Z)$, $\hat\alpha(Z)$, $\widehat{\alpha}(Z)$, $\hat\alpha(S_n)$ | $p$-valeur (les trois graphies coexistent dans le corrigé) | $\hat\alpha(Z)$ |
| $\hat\theta_n$, $\hat\theta^{MV}_n$, $\hat\lambda^{MV}_n$ | estimateurs (moments, maximum de vraisemblance) | $\hat\theta^{\mathrm{MV}}_n$ |
| $T(\theta,(X_i)_{i=1,\dots,n}):=\frac{2}{\theta}\sum_{i=1}^nX_i$ (Ex. 1 Q3) ; $G(Z,\theta)$ (Ex. 5) | fonction pivotale | $G(Z,\theta)$, loi $\mathbb{Q}$ |
| $\mathbf{1}$, $I_n$, $\Pi$ | vecteur $(1,\dots,1)^T$, identité, projection orthogonale sur $\mathbb{R}\mathbf{1}$ | $\mathbf{1}$, $\mathrm{I}_n$, $\Pi$ |
| $\overline{X}_n$, $S_n^2=\frac{1}{n-1}\sum_{k=1}^n(X_k-\overline{X}_n)^2$ | moyenne et variance empiriques | $\bar X_n$, $S_n^2$ |
| $\hat\mu_{0,n}$, $\hat\mu_{1,p}$, $\hat\sigma^2_{n,p}$, $S^2_{n,p}$ (Ex. 5) | EMV à deux échantillons ; variance « poolée » normalisée en $n+p-2$ | idem |
| $S_n=\sum_{i=1}^nX_i$ (Ex. 6) | **somme** (nombre de cas), pas un écart-type ! | idem |
| $x_{\ell:q}$, $X_{n:n}$ | statistiques d'ordre ; $X_{n:n}=\max_iX_i$ | idem |
| $R_i$, $W_{n,m}$, $\mathcal{S}_N$, $\mathbb{P}_0$, $\mathbb{E}_0$, $\mathrm{Var}_0$, $\mathrm{Cov}_0$ | rangs, statistique de Wilcoxon, groupe symétrique, loi/moments sous $H_0$ | idem |
| $\mathbb{1}_A$, $a\wedge b$, $a\vee b$ | indicatrice ; min ; max | idem |

### 0.3 Chapitres et résultats du poly mobilisés

**Chapitre principal :** Poly ch.4 « Régions de confiance et tests » (§1 régions de confiance et pivots, §2 tests, §3 outils). **Chapitres antérieurs mobilisés :** ch.1 (loi Gamma, $\chi^2$, vecteurs gaussiens, **Cochran** Th. 1.1, **Gosset** Th. 1.3), ch.2 (EMV, méthode des moments, invariance par reparamétrisation, Bienaymé-Tchebychev), et les PC antérieures (PC1 Ex. 4 et PC2 Ex. 1 pour les projections ; PC2 Ex. 2 et 3 pour EMV/moments en famille exponentielle).

| Résultat | Source | Exercices |
|---|---|---|
| Région de confiance de niveau de couverture $1-\alpha$ | Poly ch.4, Déf. 1.1 | 1 Q3, 3, 5 Q2 |
| Fonction pivotale (pivot), loi $\mathbb{Q}$ ne dépendant pas de $\theta$ | Poly ch.4, Déf. 1.2 (+ Remarque « un pivot n'est pas une statistique ») | 1, 3, 5 |
| Région de confiance associée à un pivot ; méthode en 4 étapes | Poly ch.4, Prop. 1.1, Méthode 1.1 | 1 Q3, 3 Q2, 5 Q2 |
| Pivot d'échelle (exponentiel $\theta X$, uniforme $X/\theta$) | Poly ch.4, Ex. 1.1, 1.2, 1.3 | 1, 3 |
| IC moyenne (variance inconnue, Student) ; IC variance ($\chi^2$) | Poly ch.4, Ex. 1.5, 1.6 | 2, 5 |
| Test pur, région de rejet / d'acceptation | Poly ch.4, Déf. 2.1 | tous |
| Fonction puissance, erreurs de 1re et 2e espèce | Poly ch.4, Déf. 2.2 | 1, 2, 4 |
| Taille et niveau | Poly ch.4, Déf. 2.3 | 1, 2, 4, 5, 6 |
| Puissance d'un test sur la moyenne gaussienne | Poly ch.4, Ex. 2.3 | 2 |
| Statistique discrète : taille $<\alpha$, monotonie en $\theta$ par **couplage** | Poly ch.4, Ex. 2.5 ; Lemme 3.1 | 4, 6 |
| Construction d'un test de niveau $\alpha$ (étapes 0–6) | Poly ch.4, Méthode 2.1 | 1, 4, 6 |
| Choix de $H_0$ (Neyman-Pearson ; échanger $H_0$ et $H_1$) | Poly ch.4, §2.4, Ex. 2.6–2.9 | 6 (Q6) |
| Test à partir d'un pivot ; tests $z$, Student, variance | Poly ch.4, §2.6, Ex. 2.10, 2.11, 2.12 | 2, 5 |
| $p$-valeur (familles emboîtées) ; calcul pratique | Poly ch.4, Déf. 2.4, Prop. 2.1, Ex. 2.13 | 1, 2, 4, 5, 6 |
| Loi de la $p$-valeur sous $H_0$ | Poly ch.4, Prop. 2.2 | (remarques) |
| Fonction quantile / inverse généralisée | Poly ch.4, Déf. 3.1, Prop. 3.1 | 4, 5, 6 |
| Student non centrale ; loi de Fisher | Poly ch.4, Déf. 3.2 (= Rappels C, D) | 2, 5 |
| Loi Gamma, additivité, $\chi^2(\nu)=\mathrm{Gamma}(\nu/2,1/2)$ | Poly ch.1 §2 (= Rappels A, B) | 1 |
| Théorème de Cochran | Poly ch.1, Th. 1.1 | 2 Q4–Q5, 5 Q2 |
| Théorème de Gosset | Poly ch.1, Th. 1.3 | 2 Q4–Q6, 5 Q2 |
| EMV, méthode des moments, invariance par reparamétrisation | Poly ch.2, Déf. 1.2, 1.4–1.6, Méthodes 1.1–1.2, Prop. 1.2 | 1 Q1(b), 5 Q1 |
| Inégalité de Bienaymé-Tchebychev | Poly ch.2 §2 | 7 Q4 |
| Loi du maximum $X_{n:n}$ dans le modèle uniforme | Poly ch.1 §1.5 ; ch.3 Ex. 1.9 | 3 |

### 0.4 Tableau des exercices

| Exercice | Titre (énoncé ; sinon titre du poly ch.4 entre crochets) | Difficulté | Groupe (poly) |
|---|---|---|---|
| Ex. 1 | [Modèle exponentiel] | ⋆⋆ | 1 (PC) |
| Ex. 2 | [Modèle gaussien] — « à savoir faire » (poly) | ⋆⋆ | 1 (PC) |
| Ex. 3 | Intervalle de confiance pour la loi uniforme | ⋆ | 1 (PC) |
| Ex. 4 | [Modèle de Poisson] | ⋆ | 2 (bonus) |
| Ex. 5 | Modèle gaussien à deux échantillons | ⋆⋆⋆ | 2 (bonus) |
| Ex. 6 | [Campagne de vaccination] | ⋆⋆ | 2 (bonus) |
| Ex. 7 | [Test de Wilcoxon] | ⋆⋆⋆ | 2 (bonus) |

### 0.5 Coquilles et erreurs relevées dans les documents de la PC (à corriger dans le contenu pédagogique)

1. **Énoncé, Figure 3** : légendes décalées (« Exercice 2 » pour la puissance de l'**Ex. 4** ; « Exercice 4 » pour les densités de Fisher de l'**Ex. 5**).
2. **Ex. 1 Q1(e), corrigé** : « la statistique $T(Z):=\sum_{i=1}^nX_i/(2\theta_0)$ » ; il faut lire $T(Z):=2\sum_{i=1}^nX_i/\theta_0$ (cohérent avec la Figure 5 du corrigé et avec la formule de la $p$-valeur). Par ailleurs $T(Z)$ désigne en Q1(c) une autre statistique, $\frac{1}{n\theta_0}\sum_kX_k-1$ (même test, autre normalisation).
3. **Ex. 1 Q3(c), corrigé** : $\mathrm{IC}_{95\%}(\theta)=\big[\frac{56.2}{34.17},\frac{56.2}{9.59}\big]\approx[1.64,\ 5.79]$ : **erreur numérique**, $56.2/9.59\approx 5.86$ ; l'intervalle correct est $\approx[1.64,\ 5.86]$ (le poly ch.4 donne bien $[1{,}64;\ 5{,}86]$).
4. **Ex. 1 Q3(b), corrigé** : « pour la orne supérieure » (borne).
5. **Ex. 2 Q4, corrigé** : $\pi$ minuscule à la place de $\Pi$ dans « $(I_n-\pi)Z$ » et « $(\pi Z,(I-\pi)Z)$ ».
6. **Ex. 2 Q5, corrigé** : « éléments diagonaux dont 0 » (sont).
7. **Ex. 2 Q6, corrigé** : « On déduit du rappel B » ; c'est le **rappel C** (Student décentrée).
8. **Ex. 2 Q8, corrigé** : « toute valeur de $c$ supérieure à $x_\alpha$ défini par $c_\alpha:=\dots$ » ; lire $c_\alpha$.
9. **Ex. 4 Q2, corrigé** : $\mathbb{P}_1(T(Z)\le c_\alpha)>1-\alpha$ et $c_\alpha=\inf\{t:\ F_{\mathcal{P}(10)}(t)>1-\alpha\}$ ; l'équivalent exact de $\mathbb{P}_1(T(Z)>c_\alpha)\le\alpha$ est $\mathbb{P}_1(T(Z)\le c_\alpha)\ge 1-\alpha$ (sans incidence numérique ici).
10. **Ex. 4 Q4, corrigé** : « $c_{\alpha'}<c_\alpha$ » ; seulement $c_{\alpha'}\le c_\alpha$ (statistique entière).
11. **Ex. 5 Q5, corrigé** : $\hat\mu_{1,n}(z)$ pour $\hat\mu_{1,p}(z)$ ; surtout **la $p$-valeur annoncée $\alpha(Z)=1-0.5040=0.4960$ est celle du test unilatéral** : pour le test bilatéral de Q3, $1-\alpha(Z)/2=F_{t_{238}}(0.01)\approx 0.5040$ donne $\alpha(Z)=2(1-0.5040)\approx 0.992$. La conclusion (non-rejet) est inchangée. (Le poly ch.4 reproduit 0,4960 ; erreur signalée dans `ch4.md`.)
12. **Ex. 5 Q7, corrigé** : dans « d'autre part », quantile écrit $f^{\alpha}_{n-1,p-1}$ au lieu de $f^{1-\alpha}_{n-1,p-1}$, et indice $\mathbb{P}_{(\mu_0,\mu_1,\sigma_0^2,\sigma_0^2)}$ (cas d'égalité $\sigma_1^2=\sigma_0^2$, correct).
13. **Ex. 6 Q2/Q4, corrigé** : l'inverse généralisée est notée tantôt $F^{-1}_{p_0}$, tantôt $F_b^{-1}$ ; « si $\alpha<\alpha'$ alors $c_\alpha>c_{\alpha'}$ » : seulement $c_\alpha\ge c_{\alpha'}$. Figure 11 (droite) : l'étiquette « de proba 0.0732 » ne correspond pas à la valeur donnée en Q3, $\mathbb{P}_{p_0}(S_n>2)=0.0748$ (la valeur 0.0748 est la bonne).
14. **Ex. 7, énoncé** : « à un premier groupe de $m$ individus, elle administre un placebo », mais les $X$ sont indexés par $n$ et les $Y$ par $m$ ; l'attribution des groupes n'intervient pas dans les calculs. **Corrigé** : « $R$ suis la loi uniforme », « Autrement sur » (dit).
15. **Langage** : le corrigé écrit « on accepte $H_0$ » ; le poly ch.4 (commentaire de la Déf. 2.1) recommande « on **ne rejette pas** $H_0$ » / « on **échoue à rejeter** $H_0$ ».

---

## 1. Exercices

### Exercice 1 — Modèle exponentiel : test unilatéral, puissance, $p$-valeur, intervalles de confiance (⋆⋆)

**Source :** PC4 énoncé p. 1–2 ; corrigé p. 8–13. = Poly ch.4, Exercice 1 (p. 39–40, corrigé p. 46–49).

#### Énoncé complet

Soit $(X_1,\dots,X_n)$ un $n$-échantillon du modèle statistique $(\mathbb{R}^+,\mathcal{B}(\mathbb{R}^+),\{p_\theta\cdot\mathrm{dLeb},\ \theta>0\})$ où $\mathrm{Leb}$ désigne la mesure de Lebesgue sur $\mathbb{R}^+$ et $p_\theta$ est la densité d'une loi exponentielle de paramètre $1/\theta$ :
$$p_\theta(x):=\theta^{-1}\exp(-x/\theta).$$
Soit $\alpha\in(0,1)$ et $\theta_0>0$. On effectuera les applications numériques avec $\theta_0=2$, $\alpha=5\%$ et l'échantillon de taille $n=10$ donné par
$$\{2.9,\ 4.2,\ 5.9,\ 1.7,\ 6.8,\ 1.3,\ 1.5,\ 0.2,\ 0.4,\ 3.2\}\ ;\qquad\text{somme des éléments : }28.1 .$$

1. On souhaite tester $H_0:\ \theta=\theta_0$ contre $H_1:\ \theta>\theta_0$.
   - (a) Montrer que, sous $p_\theta\cdot\mathrm{dLeb}$, $\frac{2}{\theta}\sum_{i=1}^nX_i$ suit une loi du $\chi^2$ à $2n$ degrés de liberté. *On utilisera les rappels A et B ci-dessus. La figure 1 trace la densité de la loi du $\chi^2$ pour différents degrés de liberté $p$.*
   - (b) Proposer un estimateur de $\theta$. *On pourra comparer l'estimateur du maximum de vraisemblance et l'estimateur des moments associé à la statistique $T(x)=x$. Voir PC2 exercices 2 et 3.*
   - (c) En déduire un test de niveau $\alpha$.
   - (d) Donner l'expression de la fonction puissance et calculer l'erreur de première espèce. *La figure 1 donne l'allure de la fonction puissance pour différentes valeurs du seuil critique $c\ge c_\alpha$ où $c_\alpha$ est le seuil dont le test associé a une taille égale au niveau.*
   - (e) Calculer la $p$-valeur.
2. On souhaite tester $H_0:\ \theta\le\theta_0$ contre $H_1:\ \theta>\theta_0$.
   - (a) Donner la forme d'une région de rejet de niveau $\alpha$.
   - (b) Étudier la fonction puissance du test.
   - (c) Calculer la $p$-valeur.
3. Intervalles de confiance pour $\theta$.
   - (a) En utilisant la fonction pivotale $T(\theta,(X_i)_{i=1,\dots,n}):=\frac{2}{\theta}\sum_{i=1}^nX_i$ sous $p_\theta\cdot\mathrm{dLeb}$, construire un intervalle de confiance bilatéral exact de niveau $1-\alpha$ pour $\theta$.
   - (b) En déduire des bornes *unilatérales* exactes de niveau $1-\alpha$ pour $\theta$ (borne supérieure seule, puis borne inférieure seule).
   - (c) *Application numérique* avec $\alpha=5\%$, $n=10$ et $\sum_{i=1}^nX_i=28.1$ : donner l'IC bilatéral pour $\theta$. On donne
$$q^{\chi^2(20)}_{0.025}\approx 9.59,\qquad q^{\chi^2(20)}_{0.975}\approx 34.17 .$$

> ⚠ **Paramétrisation** : ici $\theta$ est l'**espérance** ($X_i\sim\mathcal{E}(1/\theta)$, intensité $1/\theta$), contrairement à l'Ex. 1.1 du poly ch.4 où $\mathcal{E}(\theta)$ est d'intensité $\theta$.

#### Corrigé complet (corrigé officiel, p. 8–13)

Posons $Z=(X_1,\dots,X_n)$.

**Q1(a) — Loi de $2\theta^{-1}\sum X_i$.**
1. *Exponentielle = Gamma.* Une loi exponentielle (d'intensité $1/\theta$) est une loi Gamma de paramètres $(1,1/\theta)$ (rappel A avec $\alpha=1$, $\beta=1/\theta$ : densité $\theta^{-1}e^{-x/\theta}$).
2. *Changement d'échelle.* Si $Y$ suit une loi Gamma de paramètres $(a,b)$, alors pour tout $\lambda>0$, $\lambda Y$ suit une loi Gamma de paramètres $(a,b/\lambda)$. **Preuve (note de bas de page 5 du corrigé, méthode de la fonction muette)** : soit $h$ mesurable positive ; en notant $C_{a,b}=b^a/\Gamma(a)$,
$$\begin{aligned}\mathbb{E}[h(\lambda Y)]&=C_{a,b}\int_0^{+\infty}h(\lambda y)\,y^{a-1}\exp(-by)\,\mathrm{d}y\\&=C_{a,b}\lambda^{-a}\int_0^{+\infty}h(\lambda y)(\lambda y)^{a-1}\exp(-b(\lambda y)/\lambda)\,\lambda\,\mathrm{d}y\\&=\tilde C\int_0^{+\infty}h(z)\,z^{a-1}\exp(-bz/\lambda)\,\mathrm{d}z\end{aligned}$$
(changement de variable $z=\lambda y$), qui est l'espérance de $h$ sous une loi $\Gamma(a,b/\lambda)$.
3. *Application.* Avec $\lambda=2/\theta$ : sous $p_\theta\cdot\mathrm{dLeb}$,
$$2X_i\theta^{-1}\sim\Gamma(1,1/2)=\chi^2(2)=\mathcal{E}(1/2)$$
(rappel B avec $p=2$).
4. *Somme.* Comme sous $p_\theta\cdot\mathrm{dLeb}$ les $X_i$ sont **i.i.d.**, l'additivité des lois Gamma de même second paramètre (rappel A, par récurrence) donne $\Gamma(n,1/2)=\chi^2(2n)$ :
$$2\theta^{-1}\sum_{i=1}^nX_i\sim\chi^2(2n)\quad\text{sous }p_\theta\cdot\mathrm{dLeb}.$$

**Rque (bleu).** On dit que $2\theta^{-1}\sum_{i=1}^nX_i$ est une *fonction pivotale* puisque sa loi est indépendante de $\theta$ sous $p_\theta\cdot\mathrm{dLeb}$, et ce pour tout $\theta\in\Theta$ (Poly ch.4, Déf. 1.2).

**Q1(b) — Estimateur de $\theta$.** Plusieurs idées :
- **i. Méthode des moments.** Une loi exponentielle de paramètre $\tau$ est une loi Gamma de paramètres $(1,\tau)$ ; par le rappel A son espérance est $1/\tau$. Donc $\mathbb{E}_\theta[X_1]=\theta$ ; la méthode des moments propose
$$\hat\theta_n=\frac1n\sum_{k=1}^nX_k .$$
- **ii. Maximum de vraisemblance.** La vraisemblance est
$$\theta\mapsto\theta^{-n}\exp\Big(-\theta^{-1}\sum_{i=1}^nX_i\Big)\mathbb{1}_{X_1>0,\dots,X_n>0}$$
et la log-vraisemblance normalisée est
$$\theta\mapsto-\log\theta-\frac1\theta\,\frac1n\sum_{i=1}^nX_i$$
si $(X_1,\dots,X_n)\in(\mathbb{R}^+)^n$, et $-\infty$ sinon. Lorsque $\theta\to0$ cette fonction tend vers $-\infty$ ; lorsque $\theta\to+\infty$ aussi. Son gradient (dérivée $-\frac1\theta+\frac{\bar X_n}{\theta^2}$ — explicitée par l'extracteur) possède une seule racine
$$\bar X_n:=\frac1n\sum_{i=1}^nX_i,$$
qui est donc un maximum de la vraisemblance (fonction continue tendant vers $-\infty$ aux deux bords, un seul point critique). La moyenne empirique est l'estimateur du maximum de vraisemblance.
- **iii. Famille exponentielle.** La loi exponentielle est un élément de la famille dite « exponentielle » ; le paramétrage proposé fait qu'elle n'est pas dans la famille « canonique » mais dans la famille « généralisée » (PC2 Ex. 3). Dans le paramétrage canonique ($\lambda\leftarrow1/\theta$), l'EMV et l'estimateur des moments associé à $T(x)=x$ sont égaux (PC2 Ex. 2), d'où
$$\hat\lambda^{MV}_n=\frac{1}{\frac1n\sum_{i=1}^nX_i}.$$
Puisque $\theta=\phi(\lambda)$ avec le difféomorphisme $\phi(t)=1/t$ sur $\mathbb{R}^+$, l'**invariance de l'EMV par reparamétrisation** (PC2 Ex. 3 ; Poly ch.2, Prop. 1.2) donne
$$\hat\theta^{MV}_n=\phi\big(\hat\lambda^{MV}_n\big)=\frac1n\sum_{i=1}^nX_i .$$

**Conclusion :** EMV et estimateur des moments coïncident : $\bar X_n$.

**Q1(c) — Test de niveau $\alpha$.** *Intuition (corrigé)* : on a relié espérance et paramètre, donc moyenne empirique et paramètre ; on traduit une « distance » entre le paramètre et la valeur testée par $H_0$. Pour calibrer le seuil il faut la loi de la statistique de test sous $H_0$ : le pivot de Q1(a) conduit à une statistique de cette forme (Poly ch.4, Méthode 2.1).
- **(A) Choix de la statistique de test.**
$$T(Z)=\frac{1}{n\theta_0}\sum_{k=1}^nX_k-1,$$
qui doit être proche de zéro sous $H_0$ et « très supérieure à zéro » sous $H_1$ (car $\bar X_n\approx\theta>\theta_0$).
- **(B) Forme de la zone de rejet** (alternative unilatérale $\theta>\theta_0$) :
$$\mathcal{R}=\{z\in(\mathbb{R}_+)^n,\ T(z)>c\}.$$
- **(C) Détermination du seuil critique $c$.** On veut que l'erreur de première espèce soit au plus $\alpha$, i.e. que
$$\sup_{\theta\in\Theta_0}\mathbb{P}_\theta(Z\in\mathcal{R})=\mathbb{P}_{\theta_0}(Z\in\mathcal{R})=\mathbb{P}_{\theta_0}(T(Z)>c)$$
soit $\le\alpha$ ($\Theta_0=\{\theta_0\}$, hypothèse simple). Par le pivot de Q1(a) :
$$\mathbb{P}_{\theta_0}(T(Z)>c)=\mathbb{P}_{\theta_0}\Big(\frac{1}{n\theta_0}\sum_{k=1}^nX_k>c+1\Big)=\mathbb{P}_{\theta_0}\Big(\frac{2}{\theta_0}\sum_{k=1}^nX_k>2n(c+1)\Big)=\mathbb{P}(W>2n(c+1))=1-\mathbb{P}(W\le2n(c+1)),$$
où $W\sim\chi^2(2n)$. La f.d.r. de $W$ étant **continue**, on choisit le seuil pour que cette quantité soit **exactement** $\alpha$ :
$$2n(c+1)=q^{\chi^2(2n)}_{1-\alpha},$$
quantile d'ordre $1-\alpha$ de $\chi^2(2n)$.
- **(D) Conclusion.** Le test est défini par la zone de rejet
$$\mathcal{R}=\Big\{z\in(\mathbb{R}_+)^n,\ \frac{2}{\theta_0}\sum_{k=1}^nz_k>q^{\chi^2(2n)}_{1-\alpha}\Big\}.$$

[Poly ch.4] : même test, écrit avec inégalité large $\ge$ et $\chi^2_{1-\alpha}(2n)$ ; sans incidence (loi continue).

**Q1(d) — Fonction puissance et erreur de première espèce.** La fonction puissance, définie sur $\Theta_0\cup\Theta_1$ :
$$\forall\theta\ge\theta_0,\quad\mathbb{P}_\theta[Z\in\mathcal{R}]=\mathbb{P}_\theta\Big(\frac{2}{\theta_0}\sum_{k=1}^nX_k>q^{\chi^2(2n)}_{1-\alpha}\Big)=\mathbb{P}_\theta\Big(\frac{2}{\theta}\sum_{k=1}^nX_k>\frac{\theta_0}{\theta}q^{\chi^2(2n)}_{1-\alpha}\Big)=\mathbb{P}\Big(W>\frac{\theta_0}{\theta}q^{\chi^2(2n)}_{1-\alpha}\Big),$$
où $W\sim\chi^2(2n)$ (on multiplie par $\theta_0/\theta>0$ pour faire apparaître le pivot sous $\mathbb{P}_\theta$). Comme $H_0$ est une hypothèse **simple**, l'erreur de première espèce est $\mathbb{P}_{\theta_0}(Z\in\mathcal{R})=\alpha$ : **la taille et le niveau coïncident** (Poly ch.4, Déf. 2.3).

*(bleu)* Figure 4 : $\theta\mapsto\mathbb{P}_\theta(Z\in\mathcal{R})$ pour $n\in\{10,20,30\}$, $\alpha=0.05$ : compte tenu du calibrage, toutes ces fonctions valent $0.05$ en $\theta=\theta_0=2$ ; pour $\theta>\theta_0$ fixé, $n\mapsto\mathbb{P}_\theta(\mathcal{R})$ est croissante et tend vers 1.

**Q1(e) — $p$-valeur.** Soient $\alpha<\alpha'$. Alors $q_{1-\alpha}>q_{1-\alpha'}$ et $R_\alpha\subset R_{\alpha'}$ (régions **emboîtées**). Dans ce contexte, la $p$-valeur est le plus petit niveau $\alpha(Z)$ à partir duquel le test rejette, compte tenu de la valeur de la statistique associée à l'observation $Z$ (Poly ch.4, Déf. 2.4, Prop. 2.1). Avec la statistique $T(Z):=2\sum_{i=1}^nX_i/\theta_0$ (coquille du corrigé corrigée, cf. §0.5), le test rejette si $T(Z)>q^{\chi^2(2n)}_{1-\alpha}$ ; la $p$-valeur $\alpha(Z)$ est solution de
$$T(Z)=q^{\chi^2(2n)}_{1-\alpha(Z)},\qquad\text{soit}\qquad\alpha(Z)=\mathbb{P}\Big(W>\frac{2s}{\theta_0}\Big)\Big|_{s=\sum_{i=1}^nX_i},\quad W\sim\chi^2(2n).$$
**A.N.** $\theta_0=2$, $n=10$ : $2\sum_{i=1}^nx_i/\theta_0=28.1$ et
$$\mathbb{P}\big(\chi^2(20)\ge28.1\big)\simeq10.7\%.$$
On accepte (on ne rejette pas) $H_0$ au seuil 5 % ; on la rejetterait au seuil 11 %.

*(bleu)* Figure 5 : densité de $T(Z)=2\sum_{k=1}^nX_k/\theta_0$ sous $p_{\theta_0}\mathrm{dLeb}$ pour $n=10$ et $n=20$, avec un trait vertical en la valeur $t_\star=28.1$ ; on observe que $n\mapsto\mathbb{P}_{\theta_0}(T(Z)>t_\star)$ est croissante.

**Q2 — $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$.**
- **(a)** Pour l'hypothèse composite $H_0=\{\theta\le\theta_0\}$ contre $H_1=\{\theta>\theta_0\}$, la région de rejet est
$$R'_\alpha=\Big\{z=(x_1,\dots,x_n)\in(\mathbb{R}_+)^n:\ \frac{2}{\theta_0}\sum_{k=1}^nx_k>d\Big\},$$
pour un seuil critique $d$ à déterminer en fonction du niveau.
- **(b)** La fonction puissance est
$$\theta\mapsto\mathbb{P}_\theta\Big(2\theta_0^{-1}\sum_{k=1}^nX_k>d\Big)=\mathbb{P}\big(\chi^2(2n)>d\,\theta_0\theta^{-1}\big).$$
C'est une fonction **croissante** de $\theta$ (le seuil $d\theta_0/\theta$ décroît en $\theta$ et la fonction de survie est décroissante), donc la taille du test est
$$\sup_{\theta\in H_0}\mathbb{P}_\theta\Big(2\theta_0^{-1}\sum_{k=1}^nX_k>d\Big)=\mathbb{P}_{\theta_0}\Big(2\theta_0^{-1}\sum_{k=1}^nX_k>d\Big)=\mathbb{P}\big(\chi^2(2n)>d\big).$$
Pour un test de niveau $\alpha$ : $d=q^{\chi^2(2n)}_{1-\alpha}$.
- **(c)** Le test étant **identique** à celui du premier jeu d'hypothèses, la $p$-valeur est également identique ($\simeq10.7\%$).

**Q3 — Intervalles de confiance.**
- **(a) IC bilatéral exact.** Sous $p_\theta\cdot\mathrm{dLeb}$, la v.a. $T(\theta,(X_i)_{i=1,\dots,n}):=\frac2\theta\sum_{i=1}^nX_i$ est une *fonction pivotale* de loi $\chi^2(2n)$ (sa loi ne dépend pas de $\theta$). Pour $0<\alpha<1$,
$$\mathbb{P}_\theta\Big(q^{\chi^2(2n)}_{\alpha/2}\le T(\theta,(X_i)_{i=1,\dots,n})\le q^{\chi^2(2n)}_{1-\alpha/2}\Big)=1-\alpha .$$
En remplaçant $T$ par son expression et en **inversant les inégalités relativement à $\theta$** (fonction décroissante de $\theta$), pour tout $\theta$ :
$$\mathbb{P}_\theta\Bigg(\frac{2\sum_{i=1}^nX_i}{q^{\chi^2(2n)}_{1-\alpha/2}}\le\theta\le\frac{2\sum_{i=1}^nX_i}{q^{\chi^2(2n)}_{\alpha/2}}\Bigg)=1-\alpha,$$
d'où l'IC bilatéral exact de niveau $1-\alpha$ (Poly ch.4, Prop. 1.1 / Méthode 1.1).
- **(b) Bornes unilatérales exactes.**
  - *Borne supérieure seule* : on veut $\mathbb{P}_\theta(\theta\le U)=1-\alpha$. Or $\{\theta\le U\}\Leftrightarrow\{T(\theta,(X_i))\ge2\sum X_i/U\}$. Comme $\mathbb{P}_\theta\big(T(\theta,(X_i))\ge q^{\chi^2(2n)}_\alpha\big)=1-\alpha$, on pose $2\sum X_i/U=q^{\chi^2(2n)}_\alpha$ ; pour tout $\theta$,
$$\mathbb{P}_\theta\Bigg(\theta\in\Bigg]-\infty;\ \frac{2\sum_{i=1}^nX_i}{q^{\chi^2(2n)}_\alpha}\Bigg]\Bigg)=1-\alpha .$$
  - *Borne inférieure seule* : on veut $\mathbb{P}_\theta(\theta\ge L)=1-\alpha$. Or $\{\theta\ge L\}\Leftrightarrow\{T(\theta,(X_i))\le2\sum X_i/L\}$. Comme $\mathbb{P}_\theta\big(T(\theta,(X_i))\le q^{\chi^2(2n)}_{1-\alpha}\big)=1-\alpha$, on pose $2\sum X_i/L=q^{\chi^2(2n)}_{1-\alpha}$ ; pour tout $\theta$,
$$\mathbb{P}_\theta\Bigg(\theta\in\Bigg[\frac{2\sum_{i=1}^nX_i}{q^{\chi^2(2n)}_{1-\alpha}};\ +\infty\Bigg[\Bigg)=1-\alpha .$$
- **(c) Application numérique.** ($\alpha=5\%$, $n=10$, $\sum X_i=28.1$, donc $2n=20$ et $2\sum X_i=56.2$.) Avec $q^{\chi^2(20)}_{0.025}\approx9.59$ et $q^{\chi^2(20)}_{0.975}\approx34.17$ :
$$\mathrm{IC}_{95\%}(\theta)=\Big[\frac{56.2}{34.17},\ \frac{56.2}{9.59}\Big]\approx[1.64,\ 5.86]$$
(**le corrigé imprime $[1.64,\ 5.79]$ : erreur de calcul**, cf. §0.5). Le corrigé renvoie pour les quantiles à l'applet https://homepage.divms.uiowa.edu/~mbognar/applets/chisq.html.

#### Méthodes mobilisées
- Identification de loi : exponentielle = Gamma, **changement d'échelle** d'une Gamma (fonction muette + changement de variable), **additivité** des Gamma (rappel A), $\chi^2=\Gamma(p/2,1/2)$ (rappel B), **par indépendance** des $X_i$.
- Repérage d'une **fonction pivotale** (Poly ch.4, Déf. 1.2).
- **Méthode des moments** ($\mathbb{E}_\theta[X_1]=\theta$) ; **calcul d'EMV par annulation du score** + étude des limites aux bords ; **invariance de l'EMV par reparamétrisation** (famille exponentielle canonique, PC2 Ex. 2–3).
- **Construction d'un test de niveau $\alpha$** en étapes (A)–(D) (Poly ch.4, Méthode 2.1) ; calibrage par **quantile** d'une loi continue (taille exactement $\alpha$).
- **Fonction puissance** par réécriture sous le pivot de $\mathbb{P}_\theta$ ; **monotonie de la puissance** en $\theta$ pour passer de $H_0$ simple à $H_0$ composite (taille = valeur au bord $\theta_0$).
- **$p$-valeur** par familles de régions emboîtées (Poly ch.4, Déf. 2.4, Prop. 2.1).
- **Inversion d'un pivot** : IC bilatéral exact, bornes de confiance unilatérales (Poly ch.4, Prop. 1.1, Méthode 1.1).

#### Pièges relevés / remarques du corrigé
- $\theta$ est l'**espérance** (intensité $1/\theta$) : $2X_i/\theta\sim\Gamma(1,1/2)$ et non $\Gamma(1,2)$ ; le poly ch.4 écrit « Gamma de paramètres $(1,2)$ » (paramétrisation échelle) — la conclusion $\chi^2(2)$ est la même.
- Un pivot **dépend** de $\theta$ ; c'est sa **loi** qui n'en dépend pas.
- Pour le test, on remplace $\theta$ par $\theta_0$ dans le pivot : la statistique $\frac{2}{\theta_0}\sum X_k$ **est** une statistique (calculable) ; sa loi n'est $\chi^2(2n)$ **que sous $\theta_0$**.
- Passage de $H_0:\theta=\theta_0$ à $H_0:\theta\le\theta_0$ : **même test, même $p$-valeur**, grâce à la croissance de la puissance (le sup sur $\Theta_0$ est atteint en $\theta_0$).
- Inversion des inégalités dans l'IC : le **grand** quantile donne la **petite** borne (car $\theta$ est au dénominateur).
- Borne **supérieure** unilatérale ↔ quantile $q_\alpha$ ; borne **inférieure** ↔ $q_{1-\alpha}$.
- Lien test/IC (non commenté explicitement ici) : on ne rejette pas $H_0:\theta=2$ à 5 % unilatéral, et $2$ appartient bien à l'IC bilatéral $[1.64,5.86]$.

#### Résultats numériques
- $\sum x_i=28.1$, $\bar x_n=2.81$ (EMV), $2\sum x_i/\theta_0=28.1$ (car $\theta_0=2$), $2\sum x_i=56.2$.
- $p$-valeur : $\mathbb{P}(\chi^2(20)\ge28.1)\simeq10.7\%$ (recontrôlé : $0.1071$) ⇒ non-rejet à 5 %, rejet à 11 %.
- $q^{\chi^2(20)}_{0.025}\approx9.59$, $q^{\chi^2(20)}_{0.975}\approx34.17$ (donnés) ; IC 95 % $\approx[1.64,\ 5.86]$.
- *Valeurs calculées par l'extracteur (non données par le corrigé)* : $q^{\chi^2(20)}_{0.95}\approx31.41$ (seuil du test : rejet si $2\sum X_i/\theta_0>31.41$ ; seuil sur $T(Z)=\frac{1}{n\theta_0}\sum X_k-1$ : $c\approx0.5705$) ; $q^{\chi^2(20)}_{0.05}\approx10.85$ ; borne supérieure unilatérale 95 % $\approx56.2/10.85\approx5.18$ ; borne inférieure unilatérale 95 % $\approx56.2/31.41\approx1.79$ ; puissance en $\theta=4$ : $\mathbb{P}(\chi^2(20)>\frac{2}{4}\cdot31.41)\approx0.735$.

---

### Exercice 2 — Modèle gaussien : test bilatéral sur la moyenne, variance connue puis inconnue (test de Student) (⋆⋆)

**Source :** PC4 énoncé p. 2–3 ; corrigé p. 14–16. = Poly ch.4, Exercice 2 (« à savoir faire »).

#### Énoncé complet

Soit $\sigma^2>0$ un réel fixé (connu) et soit $Z=(X_1,\dots,X_n)$ un $n$-échantillon du modèle statistique
$$(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\mu\cdot\mathrm{dLeb}=\mathrm{N}(\mu,\sigma^2),\ \mu\in\mathbb{R}\}).$$
Soit $\mu_0\in\mathbb{R}$. On souhaite tester $H_0:\ \mu=\mu_0$ contre $H_1:\ \mu\ne\mu_0$.
Pour $c>0$, on considère le test pur $\delta_c(X_1,\dots,X_n):=\mathbb{1}_{T(X_1,\dots,X_n)\ge c}$ dont la statistique de test est
$$T(X_1,\dots,X_n):=\sqrt n\,\frac{\lvert\overline{X}_n-\mu_0\rvert}{\sigma},\qquad\text{où}\quad\overline{X}_n:=\frac1n\sum_{i=1}^nX_i .$$

1. Déterminer la fonction puissance du test (pour un seuil $c$ fixé) ; l'exprimer à l'aide de la fonction de répartition d'une loi gaussienne $\mathrm{N}(0,1)$. *La figure 2 trace cette fonction puissance dans le cas où $\mu_0=0$ et $c$ est choisi pour que le test soit de niveau $\alpha=5\%$ ; et ce, pour différentes valeurs de $n$.*
2. Déterminer en fonction du seuil critique $c$ la taille du test (ou risque de première espèce). En déduire la valeur du seuil critique pour un test de niveau $\alpha\in\,]0,1[$.
3. Calculer la $p$-valeur associée à l'observation $Z$.

On suppose dorénavant que la variance $\sigma^2$ est inconnue, i.e. que l'observation $Z=(X_1,\dots,X_n)$ est un $n$-échantillon du modèle statistique
$$\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta\,\mathrm{dLeb}=\mathrm{N}(\mu,\sigma^2),\ \theta:=(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}^*_+\}\big).$$
On pose
$$S_n^2:=\frac{1}{n-1}\sum_{k=1}^n(X_k-\overline{X}_n)^2 .$$

4. Montrer que sous $p_\theta\cdot\mathrm{dLeb}$, les statistiques $\overline{X}_n$ et $S_n^2$ sont indépendantes. *Indication : on pourra exprimer $\overline{X}_n$ et $S_n^2$ à l'aide de la projection $\Pi$ sur le sous-espace vectoriel engendré par le vecteur constant $(1,\dots,1)$ de $\mathbb{R}^n$. Voir PC1 exercice 4 et PC2 exercice 1.*
5. Montrer que sous $p_\theta\cdot\mathrm{dLeb}$, $(n-1)S_n^2/\sigma^2$ est distribuée suivant une loi du $\chi^2$ à $(n-1)$ degrés de liberté.

Pour répondre au même problème de test d'hypothèse, on propose cette fois le test pur $\widetilde{\delta}_c(X_1,\dots,X_n):=\mathbb{1}_{\{\widetilde{T}(Z)\ge c\}}$ dont la statistique de test est $\widetilde T(Z):=\sqrt n\,\lvert\overline{X}_n-\mu_0\rvert/S_n$.

6. Sous $p_\theta\cdot\mathrm{dLeb}$, déterminer la distribution de $\dfrac{\sqrt n(\overline{X}_n-\mu_0)}{S_n}$. *On pourra utiliser le rappel C.*
7. Déterminer en fonction du seuil critique $c$ la taille du test (ou risque de première espèce).
8. Déterminer le seuil critique de façon à obtenir un test de niveau $\alpha\in\,]0,1[$.
9. Calculer la $p$-valeur de l'observation $Z$.

#### Corrigé complet (corrigé officiel, p. 14–16)

**Préliminaire.** Sous $p_\mu\mathrm{dLeb}$, $\overline{X}_n\sim\mathcal{N}(\mu,\sigma^2/n)$ (combinaison linéaire de gaussiennes indépendantes), de sorte que
$$T(Z)\sim\Big\lvert\mathcal{N}\Big(\frac{\sqrt n}{\sigma}(\mu-\mu_0);1\Big)\Big\rvert .$$
Pour tout $c>0$, on définit un test dont la zone de rejet est de la forme $\{T(Z)>c\}$ (inégalité stricte dans le corrigé ; sans incidence, loi continue).

**Q1 — Fonction puissance.** Avec $W\sim\mathcal{N}(0,1)$,
$$\mu\mapsto\beta_c(\mu):=\mathbb{P}_\mu(T(Z)>c)=\mathbb{P}\Big(\Big\lvert\frac{\sqrt n}{\sigma}(\mu-\mu_0)+W\Big\rvert>c\Big).$$
En notant $\Phi$ la f.d.r. de $\mathcal{N}(0,1)$ :
$$\begin{aligned}\beta_c(\mu)&=1-\mathbb{P}\Big(\Big\lvert\frac{\sqrt n}{\sigma}(\mu-\mu_0)+W\Big\rvert\le c\Big)\\&=1-\mathbb{P}\Big(\frac{\sqrt n}{\sigma}(\mu_0-\mu)-c\le W\le\frac{\sqrt n}{\sigma}(\mu_0-\mu)+c\Big)\\&=1-\Phi\Big(\frac{\sqrt n}{\sigma}(\mu_0-\mu)+c\Big)+\Phi\Big(\frac{\sqrt n}{\sigma}(\mu_0-\mu)-c\Big).\end{aligned}$$
*(bleu)* Figure 6 : cette fonction pour $\mu_0=0$, $\sigma=1$, $c$ tel que $\mathbb{P}_{\mu_0}(T(Z)>c)=0.05$ ($c=\Phi^{-1}(0.975)$), $n\in\{5,10,20\}$ : courbes en « cuvette » valant $0.05$ en $\mu_0$, plus resserrées quand $n$ croît.

**Q2 — Taille et seuil critique.** Le risque de première espèce :
$$\overline{\alpha}_c=\mathbb{P}_{\mu_0}(T(Z)>c)=\beta_c(\mu_0)=1-\Phi(c)+\Phi(-c)=2(1-\Phi(c)),$$
en utilisant $\Phi(-c)=1-\Phi(c)$ (symétrie de $\mathcal{N}(0,1)$). Soit $\alpha\in(0,1)$ ; le seuil $c_\alpha$ doit vérifier $\overline{\alpha}_{c_\alpha}=\alpha$, i.e. $2(1-\Phi(c))=\alpha$, donc
$$c_\alpha:=\Phi^{-1}\Big(1-\frac\alpha2\Big).$$

**Q3 — $p$-valeur.** Soient $0\le\alpha<\alpha'\le1$ ; alors $c_\alpha>c_{\alpha'}$ donc $\{z:\ T(z)>c_\alpha\}\subset\{z:\ T(z)>c_{\alpha'}\}$, puis $\mathbb{P}_{\mu_0}(T(Z)>c_\alpha)\le\mathbb{P}_{\mu_0}(T(Z)>c_{\alpha'})$. La $p$-valeur est définie comme
$$\inf\{\alpha\in[0,1]:\ T(Z)>c_\alpha\}.$$
Puisque $\alpha\mapsto c_\alpha$ est décroissante et bijective de $]0,1[$ dans $\mathbb{R}_+$, la solution est l'$\alpha\in[0,1]$ tel que $T(Z)=c_\alpha$, soit
$$\hat\alpha(Z):=2\big(1-\Phi(T(Z))\big).$$
*(bleu) Densité de $T(Z)$ sous $p_\mu\mathrm{dLeb}$.* Si $X\sim\mathcal{N}(\nu,1)$, la densité de $\lvert X\rvert$ est
$$x\mapsto\frac{1}{\sqrt{2\pi}}\big(\exp(-0.5(x-\nu)^2)+\exp(-0.5(x+\nu)^2)\big)\mathbb{1}_{\mathbb{R}_+}(x).$$
Figure 7 : allure pour $\nu\in\{0,1,2\}$.

**Q4 — Indépendance de $\overline{X}_n$ et $S_n^2$.** Soit $\mathbf{1}$ le vecteur de $\mathbb{R}^n$ de coordonnées $(1,\dots,1)$, $I_n$ l'identité $n\times n$ et $\Pi$ la projection orthogonale sur la droite engendrée par $\mathbf{1}$. On a
$$\overline{X}_n=\frac1n\mathbf{1}^T\Pi Z,\qquad S_n^2=\frac{1}{n-1}\lVert(I_n-\Pi)Z\rVert^2 .$$
1. $\Pi(I_n-\Pi)^T=\Pi(I_n-\Pi)=0$ ($\Pi$ projecteur orthogonal : symétrique et idempotent).
2. Sous $p_\theta\mathrm{dLeb}$, $Z\sim\mathrm{N}_n(\mu\mathbf{1},\sigma^2I_n)$, donc (image linéaire d'un vecteur gaussien)
$$\Pi Z\sim\mathrm{N}_n(\mu\mathbf{1},\sigma^2\Pi),\qquad(I_n-\Pi)Z\sim\mathrm{N}_n(0_{\mathbb{R}^n},\sigma^2(I_n-\Pi)).$$
3. Le vecteur de $\mathbb{R}^{2n}$ obtenu en concaténant $(\Pi Z,(I_n-\Pi)Z)$ est un **vecteur gaussien** (image linéaire de $Z$) ; en particulier chacun des blocs l'est.
4. Ces deux blocs sont **indépendants** : la matrice de covariance de $(\Pi Z,(I_n-\Pi)Z)\in\mathbb{R}^{2n}$ est diagonale par blocs puisque le bloc hors diagonal vaut
$$\mathbb{E}_\theta\big[\Pi(Z-\mu\mathbf{1})(Z-\mu\mathbf{1})^T(I_n-\Pi)\big]=\sigma^2\Pi(I_n-\Pi)=0_{\mathbb{R}^{n\times n}}$$
(**dans un vecteur gaussien, décorrélation ⇔ indépendance**).
5. Par suite, $\overline{X}_n$ (fonction de $\Pi Z$) et $S_n^2$ (fonction de $(I_n-\Pi)Z$) sont indépendants sous $p_\theta\mathrm{dLeb}$.

[Poly ch.4] : même preuve résumée par « théorème de Cochran (Poly ch.1, Th. 1.1) appliqué à $\mathbb{R}^n=\mathbb{R}\mathbf{1}\oplus(\mathbb{R}\mathbf{1})^\perp$ » ; c'est le **théorème de Gosset** (Poly ch.1, Th. 1.3).

**Q5 — Loi de $(n-1)S_n^2/\sigma^2$.** Sous $p_\theta\mathrm{dLeb}$, $Z\sim\mathrm{N}_n(\mu\mathbf{1},\sigma^2I_n)$ donc $(I_n-\Pi)Z\sim\mathrm{N}_n(0_{\mathbb{R}^n},\sigma^2(I_n-\Pi))$ (car $(I_n-\Pi)\mathbf{1}=0$). $I_n-\Pi$ est une matrice de la forme $Q\Delta Q^T$ avec $Q$ orthogonale et $\Delta$ diagonale dont les éléments diagonaux sont $0$ (1 fois) et $1$ ($n-1$ fois) (diagonalisation d'un projecteur orthogonal de rang $n-1$). Il vient
$$(n-1)\frac{S_n^2}{\sigma^2}=\Big\lVert(I_n-\Pi)\frac Z\sigma\Big\rVert^2=\Big\lVert Q^T(I_n-\Pi)\frac Z\sigma\Big\rVert^2=\lVert W\rVert^2,$$
($Q^T$ orthogonale conserve la norme) où $W:=Q^T(I_n-\Pi)Z/\sigma\sim\mathrm{N}_n(0,\Delta)$ : $W$ a $n-1$ coordonnées i.i.d. $\mathcal{N}(0,1)$ et une coordonnée nulle p.s. Par le rappel B, la loi de $(n-1)S_n^2/\sigma^2$ est $\chi^2(n-1)$.

**Q6 — Loi de $\sqrt n(\overline{X}_n-\mu_0)/S_n$.** Sous $p_\theta\mathrm{dLeb}$,
$$\sqrt n\,\frac{\overline{X}_n-\mu_0}{\sigma}\sim\mathrm{N}\Big(\frac{\sqrt n}{\sigma}(\mu-\mu_0),1\Big)=\frac{\sqrt n}{\sigma}(\mu-\mu_0)+\mathrm{N}(0,1)$$
et
$$\frac{S_n}{\sigma}=\sqrt{\frac{(n-1)S_n^2}{\sigma^2(n-1)}}\sim\sqrt{\frac{\chi^2(n-1)}{n-1}},$$
et les deux v.a. sont **indépendantes** (Q4). On déduit du **rappel C** (le corrigé écrit « rappel B », coquille) en écrivant $\frac{\sqrt n(\overline{X}_n-\mu_0)}{S_n}=\frac{\sqrt n(\overline{X}_n-\mu_0)/\sigma}{S_n/\sigma}$ que
$$\frac{\sqrt n(\overline{X}_n-\mu_0)}{S_n}$$
suit une **loi de Student décentrée à $n-1$ degrés de liberté, de paramètre de non-centralité** $\gamma=\sqrt n(\mu-\mu_0)/\sigma$ (Poly ch.4, Déf. 3.2).

**Q7 — Taille.** Notons $t$ la fonction de répartition d'une loi de Student (centrée) à $n-1$ degrés de liberté. Sous $H_0$, $\gamma=0$ ; en répétant les arguments de Q2, la taille du test est
$$\overline{\alpha}_c=2(1-t(c)),$$
en utilisant $t(-c)=1-t(c)$ (symétrie de la loi de Student centrée).

**Q8 — Seuil critique.** Pour un test de niveau $\alpha$, il faut $2(1-t(c))\le\alpha$. Toute valeur de $c$ supérieure à
$$c_\alpha:=t^{-1}(1-\alpha/2)$$
vérifie cette condition. Néanmoins, un **critère de puissance** amène à choisir la zone de rejet la plus grande possible (parmi celles qui satisfont le contrôle de l'erreur de première espèce) : on prend $c_\alpha$ comme seuil critique.

**Q9 — $p$-valeur.** En répétant les arguments de Q3 :
$$\widehat{\alpha}(Z)=2\big(1-t(\widetilde T(Z))\big)$$
(le corrigé écrit $2(1-t(T(Z)))$ ; il s'agit de la statistique $\widetilde T$ du nouveau test).

#### Méthodes mobilisées
- Loi de la moyenne empirique gaussienne ; **loi normale « repliée »** $\lvert\mathcal{N}(m,1)\rvert$.
- **Calcul de fonction puissance** d'un test bilatéral via $\Phi$ (Poly ch.4, Déf. 2.2, Ex. 2.3, Ex. 2.10).
- **Symétrie** $\Phi(-c)=1-\Phi(c)$ (resp. $t(-c)=1-t(c)$) ; taille d'un test à $H_0$ simple $=\beta_c(\mu_0)$.
- **$p$-valeur** par familles emboîtées et bijectivité de $\alpha\mapsto c_\alpha$ (Poly ch.4, Déf. 2.4, Prop. 2.1).
- **Projections orthogonales** et vecteurs gaussiens : image linéaire, **décorrélation ⇔ indépendance**, covariance par blocs (théorème de **Cochran**, Poly ch.1, Th. 1.1 ; **Gosset**, Th. 1.3).
- **Diagonalisation d'un projecteur** $Q\Delta Q^T$ et invariance de la norme par matrice orthogonale ⇒ $\chi^2(n-1)$.
- Définition (rappel C) de la **Student non centrale** ; test de Student (Poly ch.4, Ex. 2.11).
- Choix du **plus petit seuil** garantissant le niveau ⇒ **puissance maximale** parmi les tests de cette forme.

#### Pièges relevés / remarques du corrigé
- La statistique contient une **valeur absolue** (alternative bilatérale) : seuil $\Phi^{-1}(1-\alpha/2)$ et non $\Phi^{-1}(1-\alpha)$ ; $p$-valeur $2(1-\Phi(T))$.
- $\beta_c(\mu)$ : bien distinguer $\mu$ (vraie valeur) et $\mu_0$ (valeur testée) ; la puissance ne dépend de $\mu$ que via $\sqrt n(\mu-\mu_0)/\sigma$ (paramètre de non-centralité).
- Sous $H_1$ ($\mu\ne\mu_0$), $\sqrt n(\overline{X}_n-\mu_0)/S_n$ **n'est pas** Student centrée : Student **décentrée** (utile pour la puissance du test de Student).
- Indépendance $\overline{X}_n\perp S_n^2$ : il faut d'abord établir que le vecteur concaténé est **gaussien** avant de conclure de la décorrélation à l'indépendance.
- $\chi^2(n-1)$ et non $\chi^2(n)$ : on « perd » un degré de liberté (projection sur un sous-espace de dimension $n-1$).
- Q8 : tout $c\ge c_\alpha$ donne un test de niveau $\alpha$ ; le choix $c_\alpha$ est dicté par la **puissance**.

#### Résultats numériques
- Figure 2/6 : $\alpha=5\%$, $c=\Phi^{-1}(0.975)\approx1.96$ (valeur classique ; non écrite numériquement dans le corrigé).
- Aucune autre application numérique dans cet exercice.

---

### Exercice 3 — Intervalle de confiance pour la loi uniforme (⋆)

**Source :** PC4 énoncé p. 4 ; corrigé p. 17–18. = Poly ch.4, Exercice 3.

#### Énoncé complet

Soit $(X_1,\dots,X_n)$ un $n$-échantillon d'un modèle de loi uniforme sur l'intervalle $[0,\theta]$ où $\theta\in\Theta:=\mathbb{R}^*_+$. On pose $X_{n:n}:=\max(X_1,\dots,X_n)$.
1. Montrer que $X_{n:n}/\theta$ est une fonction pivotale pour $\theta$.
2. Déterminer l'intervalle de confiance de probabilité de couverture $(1-\alpha)$ de longueur minimale.

#### Corrigé complet (corrigé officiel, p. 17–18)

Sous $\mathbb{P}_\theta$, les v.a. $\{X_i\}_i$ sont i.i.d. de loi uniforme sur $[0,\theta]$.

**Q1 — Pivot.** Pour tout $x<0$, $\mathbb{P}_\theta(X_{n:n}/\theta\le x)=0$ ; pour tout $x>1$, $\mathbb{P}_\theta(X_{n:n}/\theta\le x)=1$ ; et pour tout $x\in[0,1]$,
$$\mathbb{P}_\theta(X_{n:n}/\theta\le x)=\mathbb{P}_\theta\big(\cap_{i=1}^n\{X_i\le\theta x\}\big)=x^n$$
(le max est $\le\theta x$ ssi chaque $X_i$ l'est ; puis **par indépendance**, produit des $\mathbb{P}_\theta(X_i\le\theta x)=x$). La loi de $X_{n:n}/\theta$ sous $\mathbb{P}_\theta$ ne dépend donc pas de $\theta$ : $X_{n:n}/\theta$ est une **fonction pivotale** (Poly ch.4, Déf. 1.2).

*(bleu)* Figure 8 : densité $x\mapsto nx^{n-1}$ sur $[0,1]$ pour $n\in\{5,10,15\}$ ; et densité de $\theta/X_{n:n}$, qui sous $\mathbb{P}_\theta$ est $y\mapsto ny^{-(n+1)}$ sur $[1,+\infty[$ ; en effet, pour toute $g$ mesurable positive (changement de variable $y=1/x$),
$$\mathbb{E}_\theta\Big[g\Big(\frac{\theta}{X_{n:n}}\Big)\Big]=\int_{[0,1]}g(1/x)\,nx^{n-1}\,\mathrm{d}x=\int_1^{+\infty}g(y)\,\frac{n}{y^{n+1}}\,\mathrm{d}y .$$

**Q2 — IC de longueur minimale.** Soit
$$I:=\Big[X_{n:n},\ \frac{X_{n:n}}{\alpha^{1/n}}\Big].\tag{1}$$
On a
$$\mathbb{P}_\theta(\theta\in I)=\mathbb{P}_\theta\big(X_{n:n}/\theta\in[\alpha^{1/n},1]\big)=1-[\alpha^{1/n}]^n=1-\alpha .$$
Donc $I$ est un intervalle de confiance pour $\theta$ au niveau $1-\alpha$. Vérifions que sa longueur est minimale parmi les intervalles $I_{a,b}$ de la forme $[X_{n:n}/a,\ X_{n:n}/b]$.
- **Step A (contrainte de niveau).** Pour être un IC de niveau $1-\alpha$, $a$ et $b$ doivent satisfaire
$$\mathbb{P}_\theta(\theta\in I_{a,b})=\mathbb{P}_\theta(X_{n:n}/\theta\in[b,a])=(a\wedge1)^n-(b\vee0)^n\ge1-\alpha .$$
On peut se restreindre à $a\le1$ et $b\ge0$ (au-delà, on allonge l'intervalle sans gagner en couverture). On cherche donc $0\le b<a\le1$ tels que $a^n\ge1-\alpha+b^n$.
- **Step B (minoration de la longueur).** La longueur de l'intervalle (normalisée par $X_{n:n}$) est $\ell=1/b-1/a$ ; la condition précédente ($b\le(a^n-(1-\alpha))^{1/n}$) entraîne
$$\ell\ge\frac1a\Big(\frac{1}{(1-a^{-n}(1-\alpha))^{1/n}}-1\Big).$$
Cette fonction étant (clairement, dit le corrigé) **décroissante en $a$** sur $\mathbb{R}^*_+$, la borne inférieure sur $\ell$ est minimale (longueur la plus petite possible) lorsque $a=1$.
- **Step C (conclusion).** Avec $a=1$, les conditions sur $b$ sont $\alpha^{1/n}\ge b\ge0$ et $\ell\ge\alpha^{-1/n}-1$. Pour la longueur minimale, on prend $\ell=\alpha^{-1/n}-1$, donc $1/b=\alpha^{-1/n}$ : on retrouve l'intervalle (1).

#### Méthodes mobilisées
- **Loi du maximum** (statistique d'ordre) : $\{X_{n:n}\le x\}=\cap_i\{X_i\le x\}$ + **indépendance**.
- **Pivot d'échelle** (Poly ch.4, Ex. 1.2–1.3, Déf. 1.2) ; densité de $\theta/X_{n:n}$ par **fonction muette** et changement de variable.
- **Inversion d'un pivot** : $A_\alpha=[\alpha^{1/n},1]$ (Poly ch.4, Prop. 1.1, Méthode 1.1, Remarque sur le choix de $A_\alpha$).
- **Optimisation sous contrainte** : minimisation de la longueur à niveau fixé, réduction à une famille paramétrée $I_{a,b}$, monotonie.

#### Pièges relevés / remarques du corrigé
- L'IC optimal **n'est pas** celui des quantiles $\alpha/2$ et $1-\alpha/2$ : la densité $nx^{n-1}$ est **croissante** sur $[0,1]$, on place donc $A_\alpha$ contre $1$ ; la borne gauche est l'observation $X_{n:n}$ elle-même (on sait que $\theta\ge X_{n:n}$ p.s.).
- Le pivot $X_{n:n}/\theta$ est **dans $[0,1]$** : couvrir $[b,a]$ avec $a>1$ ou $b<0$ est inutile (d'où $a\wedge1$, $b\vee0$).
- La minimalité est démontrée **dans la famille** $\{[X_{n:n}/a,X_{n:n}/b]\}$, pas parmi tous les ensembles possibles.
- La longueur réelle est $X_{n:n}(\alpha^{-1/n}-1)$ : aléatoire ; on minimise le facteur $\ell$.

#### Résultats numériques
- Aucune application numérique dans le corrigé. *Exemple (extracteur)* : $n=10$, $\alpha=5\%$ : $\alpha^{1/10}\approx0.741$, $\alpha^{-1/10}\approx1.349$ ⇒ $I=[X_{10:10},\ 1.349\,X_{10:10}]$, facteur de longueur $\ell\approx0.349$.

---

### Exercice 4 — Modèle de Poisson : test d'une hypothèse simple contre une alternative simple (⋆)

**Source :** PC4 énoncé p. 4 ; corrigé p. 19–20. = Poly ch.4, Exercice 4 (bonus).

#### Énoncé complet

Soit $(X_1,\dots,X_n)$ un $n$-échantillon du modèle statistique $(\mathbb{N},\mathcal{P}(\mathbb{N}),\{p_\theta\cdot\mathrm{d}\mu,\ \theta>0\})$ où $\mu$ désigne la mesure de comptage sur $\mathbb{N}$ et $p_\theta$ est la densité d'une loi de Poisson de paramètre $\theta$. On souhaite tester $H_0:\ \theta=1$ contre $H_1:\ \theta=2$.
1. Rappeler la loi de $\sum_{i=1}^nX_i$ sous $p_\theta\cdot\mathrm{d}\mu$, $\theta>0$.

Dans la suite, on prendra $n=10$.

2. Proposer un test de niveau 5 %. Quelle est la taille de ce test ?
3. Donner l'expression de la fonction puissance. *La figure 3 trace la fonction puissance.*
4. Pour chacun des échantillons suivants, calculer la $p$-valeur :
$$\{2,3,3,1,4,0,1,4,0,0\}\qquad\text{et}\qquad\{4,2,1,1,0,1,0,2,0,2\}.$$

#### Corrigé complet (corrigé officiel, p. 19–20)

**Rappels (bleu).** L'espérance d'une loi de Poisson de paramètre $\lambda>0$ est $\lambda$.

**Q1 — Loi de la somme.** Si $X\sim\mathcal{P}(\theta_1)$ et $Y\sim\mathcal{P}(\theta_2)$ sont indépendantes, alors $X+Y\sim\mathcal{P}(\theta_1+\theta_2)$.
*Compléments (bleu).* Preuve par la **fonction génératrice** $G_U(s)=\mathbb{E}[s^U]$ (pour tout $s\in\mathbb{R}$ où elle existe) : avec l'expression de la loi de Poisson, $G_X(s)=\exp(-\theta_1(1-s))$, $G_Y(s)=\exp(-\theta_2(1-s))$. Si $X$ et $Y$ sont **indépendantes**, $G_{X+Y}=G_XG_Y$, donc $G_{X+Y}(s)=\exp(-(\theta_1+\theta_2)(1-s))$, fonction génératrice d'une Poisson de paramètre $\theta_1+\theta_2$ ; on conclut car **la fonction génératrice caractérise la loi**.
Puisque sous $p_\theta\cdot\mathrm{d}\mu$ les $(X_i)_i$ sont i.i.d. de loi $\mathcal{P}(\theta)$, il vient (récurrence)
$$\sum_{i=1}^nX_i\sim\mathcal{P}(n\theta).$$

**Q2 — Test de niveau 5 %.** Posons $Z=(X_1,\dots,X_n)$.
- **(A) Avoir l'idée d'une statistique.** $T(Z)=\sum_{i=1}^nX_i$.
- **(B) Loi sous $H_0$.** Lorsque $\theta=1$ (sous $H_0$), $T(Z)\sim\mathcal{P}(n)$, d'espérance $n$.
- **(C) Forme de la zone de rejet.** Lorsque $\theta=2$ (sous $H_1$), $T(Z)\sim\mathcal{P}(2n)$, d'espérance $2n$ : $T(Z)$ aura tendance à prendre des valeurs plus grandes sous $H_1$ que sous $H_0$, d'où
$$R_\alpha:=\{z\in\mathbb{N}^n:\ T(z)>c_\alpha\}.$$
- **(D) Seuil critique.** On calibre $c_\alpha$ pour que l'erreur de première espèce soit au plus $\alpha$ :
$$\mathbb{P}_1(T(Z)>c_\alpha)\le\alpha,\quad\text{ou encore}\quad\mathbb{P}_1(T(Z)\le c_\alpha)>1-\alpha\ \ (\text{lire }\ge),$$
d'où
$$c_\alpha=\inf\{t\in\mathbb{R}:\ F_{\mathcal{P}(10)}(t)>1-\alpha\}$$
(inverse généralisée, Poly ch.4, Déf. 3.1). A.N. : $1-\alpha=0.95$ et
$$F_{\mathcal{P}(10)}(14)\simeq0.917,\qquad F_{\mathcal{P}(10)}(15)\simeq0.951,$$
donc $c_{5\%}=15$ et
$$R_{0.05}:=\{z\in\mathbb{N}^{10}:\ T(z)>15\}.$$
- **(E) Taille du test.**
$$\mathbb{P}_1(T(Z)>15)=\mathbb{P}(\mathcal{P}(10)>15)\simeq4.9\%<0.05 .$$
**On a donc ici un exemple de test pur dont le niveau et la taille diffèrent** (statistique discrète : la taille ne peut prendre qu'un ensemble discret de valeurs ; cf. Poly ch.4, Ex. 2.5).

**Q3 — Fonction puissance.** Comme $H_0$ est simple, l'erreur de première espèce est
$$\sup_{\theta\in\Theta_0}\mathbb{P}_\theta(T(Z)>15)=\mathbb{P}_1(T(Z)>15)=0.049 .$$
La fonction puissance est $\theta\mapsto\mathbb{P}_\theta(T(Z)>15)$, i.e. (par Q1) $\theta\mapsto\mathbb{P}(\mathcal{P}(10\theta)>15)$ — **expression explicite donnée par le poly ch.4, le corrigé PC se contentant de la tracer** (Figure 9 : droites $y=0.049$ et $y=0.8435$ ; puissance en $\theta=2$ : $\mathbb{P}(\mathcal{P}(20)>15)\simeq0.8435$). Le modèle à tester ne contenant que $\theta\in\{1,2\}$, seules les valeurs $0.049$ (risque de 1re espèce) et $0.8435$ (puissance) sont pertinentes.

**Q4 — $p$-valeurs.** Soient $0<\alpha<\alpha'<1$. La zone de rejet étant de la forme $\{T(Z)>c_\alpha\}$, on a $c_{\alpha'}\le c_\alpha$ (le corrigé écrit $<$) et donc $R_\alpha\subseteq R_{\alpha'}$. La $p$-valeur est
$$\inf\{\alpha,\ Z\in R_\alpha\}=\inf_\alpha\{T(Z)>c_\alpha\}.$$
La monotonie de la zone de rejet en $\alpha$ montre que l'on cherche la zone de rejet la plus petite possible au sens de l'inclusion ; $T(Z)$ ne prenant que des valeurs **entières**, on a $c_{\alpha(Z)}=T(Z)-1$. Par suite,
$$\alpha(Z)=\mathbb{P}(\mathcal{P}_{10}>T(Z)-1)=1-\mathbb{P}(\mathcal{P}_{10}\le T(Z)-1)\ \big(=\mathbb{P}(\mathcal{P}_{10}\ge T(Z))\big).$$
- Premier jeu de données : $T(Z)=18$, donc $\alpha(Z)=0.0143$.
- Second jeu : $T(Z)=13$, donc $\alpha(Z)=0.2084$.

*Rque (bleu).* Premier échantillon : $t_1=18$ est dans la zone de rejet $R_{0.05}=\{z,\ T(z)>15\}$ : on **rejette** $H_0$ au niveau 5 %. Second échantillon : $t_2=13$ : on **accepte** (ne rejette pas) $H_0$ au niveau 5 %. Deux situations : soit $H_0$ est vraie et on prend la bonne décision ; soit $H_1$ est vraie et, en acceptant $H_0$, on se trompe avec une probabilité $\beta=15.7\%$ (risque de seconde espèce $=1-0.8435$).

#### Méthodes mobilisées
- **Stabilité de la loi de Poisson par somme** via les **fonctions génératrices** (indépendance ⇒ produit ; caractérisation de la loi).
- **Construction d'un test** en étapes (A)–(E) (Poly ch.4, Méthode 2.1) ; forme de la région dictée par la comparaison des espérances sous $H_0$ et $H_1$.
- **Calibrage discret** par inverse généralisée de la f.d.r. (Poly ch.4, Déf. 3.1, Prop. 3.1).
- **Distinction taille / niveau** (Poly ch.4, Déf. 2.3, Ex. 2.5).
- **Fonction puissance**, risque de seconde espèce (Poly ch.4, Déf. 2.2).
- **$p$-valeur dans le cas discret** (familles emboîtées, Poly ch.4, Déf. 2.4).

#### Pièges relevés / remarques du corrigé
- Statistique **discrète** : on ne peut pas atteindre exactement $\alpha$ ; on prend le **plus petit** seuil garantissant le niveau, et la taille ($4.9\%$) est **strictement** inférieure au niveau ($5\%$).
- Convention d'inégalité stricte $T>c$ : $p$-valeur $=\mathbb{P}(\mathcal{P}_{10}>T(Z)-1)=\mathbb{P}(\mathcal{P}_{10}\ge T(Z))$, **pas** $\mathbb{P}(\mathcal{P}_{10}>T(Z))$ (erreur d'une unité fréquente).
- « Accepter $H_0$ » ne prouve rien : si $H_1$ est vraie, on se trompe avec probabilité $15.7\%$.
- Avec $H_0$ et $H_1$ **simples**, ce test prépare le lemme de **Neyman-Pearson** (ch.5, selon le poly).

#### Résultats numériques
- $T\sim\mathcal{P}(10)$ sous $H_0$, $\mathcal{P}(20)$ sous $H_1$.
- $F_{\mathcal{P}(10)}(14)\simeq0.917$ ; $F_{\mathcal{P}(10)}(15)\simeq0.951$ ⇒ $c_{5\%}=15$.
- Taille : $\mathbb{P}(\mathcal{P}(10)>15)\simeq0.049$ (recontrôlé : $0.0487$).
- Puissance en $\theta=2$ : $\mathbb{P}(\mathcal{P}(20)>15)\simeq0.8435$ ; risque de 2e espèce $\simeq0.1565$.
- Échantillon 1 : somme $18$, $p$-valeur $0.0143$ (rejet à 5 %). Échantillon 2 : somme $13$, $p$-valeur $0.2084$ (non-rejet).

---

### Exercice 5 — Modèle gaussien à deux échantillons (⋆⋆⋆)

**Source :** PC4 énoncé p. 4–6 ; corrigé p. 21–25. = Poly ch.4, Exercice 5 (bonus).

#### Énoncé complet

On dispose d'une variable qualitative binaire qui permet de définir deux groupes.
- On mesure une variable quantitative qui permet de calculer dans chaque groupe les différents paramètres de la distribution : moyenne, estimateur de l'écart type…
- On désire savoir si les moyennes observées dans chacun des groupes peuvent être considérées comme des estimateurs de la même moyenne aux fluctuations du hasard près (note : vidéo https://www.youtube.com/watch?v=oJjkjkY6mmA).

Nous formalisons ce test d'hypothèses ci-dessous. Nous effectuons $n$ mesures dans le groupe 1 (resp. $p$ mesures dans le groupe 2) ; ces mesures sont considérées comme l'observation de mécanismes aléatoires indépendants, et gaussiens ; les paramètres de la gaussienne dépendent uniquement des groupes. Nous introduisons donc le modèle statistique suivant
$$\Big(\mathbb{R}^{n+p},\mathcal{B}(\mathbb{R}^{n+p}),\big\{p_\theta\,\mathrm{dLeb}^{\otimes(n+p)}:=\big(\mathrm{N}(\mu_0,\sigma^2)\big)^{\otimes n}\otimes\big(\mathrm{N}(\mu_1,\sigma^2)\big)^{\otimes p},\ \theta:=(\mu_0,\mu_1,\sigma^2)\in\mathbb{R}^2\times\mathbb{R}^*_+\big\}\Big).$$
Nous noterons $X_1,\dots,X_n$ les $n$ premières variables canoniques, et $Y_1,\dots,Y_p$ les $p$ dernières.

1. Déterminer l'estimateur du maximum de vraisemblance du paramètre $\theta$.
2. Construire un intervalle de confiance de $\mu_0-\mu_1$ de niveau de confiance $1-\alpha$.
3. En déduire un test de niveau $\alpha$ de l'hypothèse $H_0:\ \mu_0=\mu_1$ contre $H_1:\ \mu_0\ne\mu_1$.
4. Construire un test de niveau $\alpha$ de l'hypothèse $H_0:\ \mu_0\le\mu_1$ contre $H_1:\ \mu_0>\mu_1$.

On utilise maintenant ce test pour comparer la consistance de deux correcteurs de l'examen d'entrée à l'École Polytechnique. Les notes des deux correcteurs (sur 100) :

| | Échantillon #1 | Échantillon #2 |
|---|---|---|
| Nombre d'observations | 120 | 120 |
| Moyenne | 75 | 74.99 |
| Écart-type | 8.72 | 6.54 |

5. Quelle est la $p$-valeur du test ? Qu'en concluez-vous ?

On suppose maintenant que les variances des gaussiennes des deux groupes sont différentes, et notées respectivement $\sigma_0^2$ et $\sigma_1^2$. Le modèle statistique est donc modifié en conséquence ; en particulier, $\theta:=(\mu_0,\mu_1,\sigma_0^2,\sigma_1^2)\in\mathbb{R}\times\mathbb{R}\times\mathbb{R}^*_+\times\mathbb{R}^*_+$.

6. Construire une fonction pivotale du paramètre $\sigma_1^2/\sigma_0^2$.
7. En déduire un test de niveau $\alpha$ de l'hypothèse $H_0:\ \sigma_0^2\le\sigma_1^2$ contre $H_1:\ \sigma_0^2>\sigma_1^2$.
8. Calculer la $p$-valeur de ce test.

#### Corrigé complet (corrigé officiel, p. 21–25)

**Q1 — EMV.** La vraisemblance est (à une constante multiplicative près)
$$\theta\mapsto\frac{1}{\sigma^{n+p}}\exp\Big(-0.5\sigma^{-2}\sum_{i=1}^n\{X_i-\mu_0\}^2-0.5\sigma^{-2}\sum_{j=1}^p\{Y_j-\mu_1\}^2\Big)$$
(produit des densités, **par indépendance**). On en déduit la log-vraisemblance
$$\theta\mapsto-\frac{(n+p)}{2}\ln\sigma^2-0.5\sigma^{-2}\sum_{i=1}^n\{X_i-\mu_0\}^2-0.5\sigma^{-2}\sum_{j=1}^p\{Y_j-\mu_1\}^2 .$$
Soit $Z:=(X_1,\dots,X_n,Y_1,\dots,Y_p)$ ; la log-vraisemblance est maximisée en
$$\hat\mu_{0,n}(Z):=\frac1n\sum_{i=1}^nX_i,\qquad\hat\mu_{1,p}(Z):=\frac1p\sum_{j=1}^pY_j,\qquad\hat\sigma^2_{n,p}(Z):=\frac{1}{n+p}\Big(\sum_{i=1}^n(X_i-\hat\mu_{0,n})^2+\sum_{j=1}^p(Y_j-\hat\mu_{1,p})^2\Big).$$
(Le corrigé ne détaille pas le calcul ; c'est la maximisation « en deux temps » classique : à $\sigma^2$ fixé, minimiser chaque somme de carrés en $\mu_0$, $\mu_1$ ⇒ moyennes empiriques ; puis maximiser en $\sigma^2$ — cf. Poly ch.2, Ex. 1.10.) Dans la suite on omet parfois la dépendance en $Z$.

**Q2 — IC pour $\mu_0-\mu_1$.** Il est naturel d'exploiter $\hat\mu_{0,n}-\hat\mu_{1,p}$ puisque sous $p_\theta\mathrm{dLeb}^{n+p}$ (indépendance des deux échantillons, variances qui s'ajoutent)
$$\hat\mu_{0,n}-\hat\mu_{1,p}\sim\mathcal{N}\Big(\mu_0-\mu_1,\ \sigma^2\Big(\frac1n+\frac1p\Big)\Big),$$
ou de façon équivalente
$$\sqrt{\frac{np}{n+p}}\Big\{\frac{(\hat\mu_{0,n}-\hat\mu_{1,p})-(\mu_0-\mu_1)}{\sigma}\Big\}\sim\mathcal{N}(0,1).$$
$\sigma^2$ est inconnue ; on la remplace par l'estimateur
$$S^2_{n,p}:=\frac{1}{n+p-2}\Big(\sum_{i=1}^n(X_i-\hat\mu_{0,n})^2+\sum_{j=1}^p(Y_j-\hat\mu_{1,p})^2\Big)=\frac{n+p}{n+p-2}\hat\sigma^2_{n,p}.$$
En procédant comme dans l'Exercice 2 (projections / Cochran, appliqué à chaque échantillon puis indépendance des deux échantillons), on montre que sous $p_\theta\mathrm{dLeb}^{n+p}$ :
- $S^2_{n,p}$ est indépendant de $\hat\mu_{0,n}-\hat\mu_{1,p}$ ;
- $(n+p-2)S^2_{n,p}/\sigma^2\sim\chi^2(n+p-2)$.

Par suite, en utilisant le **rappel C** (avec $\gamma=0$), sous $p_\theta\mathrm{dLeb}^{n+p}$,
$$\sqrt{\frac{np}{n+p}}\Big\{\frac{(\hat\mu_{0,n}-\hat\mu_{1,p})-(\mu_0-\mu_1)}{S_{n,p}}\Big\}\sim t_{n+p-2},$$
où $t_{n+p-2}$ désigne une loi de Student (centrée) de paramètre $n+p-2$. Notons $t^{u}_{n+p-2}$ le quantile d'ordre $u$ de cette loi. Un intervalle de confiance de niveau $1-\alpha$ est donné par
$$\Big\{(\mu_0-\mu_1):\ t^{\alpha/2}_{n+p-2}\le\sqrt{\frac{np}{n+p}}\Big\{\frac{(\hat\mu_{0,n}-\hat\mu_{1,p})-(\mu_0-\mu_1)}{S_{n,p}}\Big\}\le t^{1-\alpha/2}_{n+p-2}\Big\}\ ;$$
soit encore
$$\mathcal{I}(Z):=\Big[\hat\mu_{0,n}(Z)-\hat\mu_{1,p}(Z)\pm t^{1-\alpha/2}_{n+p-2}\sqrt{\frac{n+p}{np}}\,S_{n,p}(Z)\Big]$$
en notant que $t^{\alpha/2}_{n+p-2}=-t^{1-\alpha/2}_{n+p-2}$ (symétrie de la loi de Student).

*Fonction pivotale (bleu).* Posons
$$G(Z,\theta):=\sqrt{\frac{np}{n+p}}\Big\{\frac{(\hat\mu_{0,n}(Z)-\hat\mu_{1,p}(Z))-(\mu_0-\mu_1)}{S_{n,p}(Z)}\Big\}.$$
Alors pour tout $\theta$, $\mathbb{P}_\theta(G(Z,\theta)\in A)=\mathbb{P}(W_{n+p-2}\in A)$ où $W_{n+p-2}\sim t_{n+p-2}$ : $G$ est une **fonction pivotale**. On construit un IC de couverture $1-\alpha$ : $\mathcal{I}_\alpha(Z)=\{\theta:\ G(\theta,Z)\in\mathcal{A}_\alpha\}$, avec $\mathcal{A}_\alpha$ tel que $\mathbb{P}(W_{n+p-2}\in\mathcal{A}_\alpha)=1-\alpha$. On choisit $\mathcal{A}_\alpha$ comme l'intervalle délimité par les quantiles d'ordre $\alpha/2$ et $1-\alpha/2$ d'une loi $t_{n+p-2}$, **car c'est le plus court des intervalles de probabilité $1-\alpha$ sous une loi $t_{n+p-2}$** (densité paire et unimodale). (Poly ch.4, Prop. 1.1, Méthode 1.1.)

**Q3 — Test bilatéral.** Posons le test de zone de rejet
$$\mathcal{R}_\alpha:=\Big\{z\in\mathbb{R}^{n+p}:\ \sqrt{\frac{np}{n+p}}\,\frac{\lvert\hat\mu_{0,n}(z)-\hat\mu_{1,p}(z)\rvert}{S_{n,p}(z)}\ge t^{1-\alpha/2}_{n+p-2}\Big\}.$$
Pour $\theta=(\mu_0,\mu_0,\sigma^2)\in\Theta_0$, $\mathbb{P}_\theta(Z\in\mathcal{R}_\alpha)=\alpha$ (sous $H_0$, la statistique est $\lvert G(Z,\theta)\rvert$ avec $G\sim t_{n+p-2}$). La taille du test est $\alpha$.
*Fonction pivotale → IC → test (bleu).* Ce test est le même que celui de zone de rejet
$$\{z\in\mathbb{R}^{n+p}:\ G(z;\mu_0,\mu_0,\sigma^2)\notin\mathcal{A}_\alpha\}=\{z\in\mathbb{R}^{n+p}:\ \lvert G(z;\mu_0,\mu_0,\sigma^2)\rvert\ge t^{1-\alpha/2}_{n+p-2}\}$$
(on rejette $H_0:\mu_0-\mu_1=0$ ssi $0\notin\mathcal{I}(Z)$ : **dualité IC/test**).

**Q4 — Test unilatéral $H_0:\mu_0\le\mu_1$.** Posons
$$\mathcal{R}_\alpha:=\Big\{z\in\mathbb{R}^{n+p}:\ \sqrt{\frac{np}{n+p}}\,\frac{(\hat\mu_{0,n}(z)-\hat\mu_{1,p}(z))}{S_{n,p}(z)}\ge t^{1-\alpha}_{n+p-2}\Big\}.$$
Vérifions le niveau : pour tout $\theta$ tel que $\mu_0-\mu_1\le0$,
$$\mathbb{P}_\theta(Z\in\mathcal{R}_\alpha)=\mathbb{P}_\theta\Big(\sqrt{\frac{np}{n+p}}\frac{(\hat\mu_{0,n}(Z)-\hat\mu_{1,p}(Z))}{S_{n,p}(Z)}\ge t^{1-\alpha}_{n+p-2}\Big)=\mathbb{P}_\theta\Big(W_{n+p-2}+\sqrt{\frac{np}{n+p}}\frac{(\mu_0-\mu_1)}{S_{n,p}(Z)}\ge t^{1-\alpha}_{n+p-2}\Big),$$
où $W_{n+p-2}:=G(Z,\theta)\sim t_{n+p-2}$ (on ajoute et retranche $\mu_0-\mu_1$). Puisque $\mu_0-\mu_1\le0$ (et $S_{n,p}>0$), le terme ajouté est $\le0$, d'où
$$\begin{aligned}\mathbb{P}_\theta(Z\in\mathcal{R}_\alpha)&\le\mathbb{P}_\theta\big(W_{n+p-2}+0\ge t^{1-\alpha}_{n+p-2}\big)\\&=\mathbb{P}_{(\mu_0,\mu_0,\sigma^2)}\Big(W_{n+p-2}+\sqrt{\frac{np}{n+p}}\frac{(\mu_0-\mu_1)}{S_{n,p}(Z)}\ge t^{1-\alpha}_{n+p-2}\Big)\\&=\mathbb{P}\big(W_{n+p-2}\ge t^{1-\alpha}_{n+p-2}\big)=\alpha .\end{aligned}$$
(la deuxième ligne : cas d'égalité $\mu_1=\mu_0$, où le terme ajouté est nul.) Ainsi
$$\sup_{\theta:\ \mu_0-\mu_1\le0}\mathbb{P}_\theta(Z\in\mathcal{R}_\alpha)=\alpha,$$
ce qui termine la démonstration du niveau (et de la taille) du test.

**Q5 — Application numérique (deux correcteurs).** D'après Q3, on cherche $\alpha(Z)$ tel que
$$\sqrt{\frac{np}{n+p}}\,\frac{\lvert\hat\mu_{0,n}(Z)-\hat\mu_{1,p}(Z)\rvert}{S_{n,p}(Z)}=t^{1-\alpha(Z)/2}_{n+p-2}.$$
D'après le tableau, $n=p=120$, $\hat\mu_{0,n}(z)=75$, $\hat\mu_{1,p}(z)=74.99$ et
$$S_{n,p}(z)=\sqrt{\frac{n}{n+p-2}8.72^2+\frac{p}{n+p-2}6.54^2}$$
(le corrigé interprète les écarts-types du tableau comme normalisés en $1/n$, i.e. $\sum_i(X_i-\hat\mu_{0,n})^2=n\cdot8.72^2$). Il faut donc résoudre
$$t^{1-\alpha(Z)/2}_{238}=0.01 .$$
Le corrigé conclut : « On trouve $\alpha(Z)=1-0.5040=0.4960$. Tout test de niveau raisonnable va donc accepter l'hypothèse nulle (consistance des deux correcteurs). »
> ⚠ **Correction** : $t^{1-\alpha(Z)/2}_{238}=0.01$ signifie $1-\alpha(Z)/2=F_{t_{238}}(0.01)\approx0.5040$, donc $\alpha(Z)=2(1-0.5040)\approx0.992$ pour le test **bilatéral** de Q3 ; $0.4960$ est la $p$-valeur du test **unilatéral** de Q4. Dans les deux cas : **non-rejet** de $H_0$.

**Q6 — Pivot pour $\sigma_1^2/\sigma_0^2$.** Sous $p_\theta\mathrm{dLeb}^{n+p}$ (Ex. 2 Q5 appliqué à chaque échantillon),
$$R_{n,1}(Z):=\sigma_0^{-2}\sum_{i=1}^n(X_i-\hat\mu_{0,n}(Z))^2\sim\chi^2(n-1),\qquad R_{p,2}(Z):=\sigma_1^{-2}\sum_{j=1}^p(Y_j-\hat\mu_{1,p}(Z))^2\sim\chi^2(p-1),$$
et $R_{n,1}(Z)$ et $R_{p,2}(Z)$ sont **indépendantes** car fonctions respectivement des $X_i$ et des $Y_j$. Par le **rappel D**, sous $p_\theta\mathrm{dLeb}^{n+p}$, la v.a.
$$G(Z;\theta):=\frac{\sigma_1^2}{\sigma_0^2}\,\frac{(n-1)^{-1}\sum_{i=1}^n(X_i-\hat\mu_{0,n}(Z))^2}{(p-1)^{-1}\sum_{j=1}^p(Y_j-\hat\mu_{1,p}(Z))^2}$$
$\Big(=\dfrac{R_{n,1}/(n-1)}{R_{p,2}/(p-1)}\Big)$ suit une **loi de Fisher de paramètres $(n-1,p-1)$** ; c'est une loi indépendante de $\theta$ : $G$ est une **fonction pivotale**.
*Loi de Fisher (bleu).* Figure 10 : densités de Fisher $(10,5)$ (rouge, étalée, asymétrique) et $(100,50)$ (bleu, concentrée autour de 1).

**Q7 — Test de $H_0:\sigma_0^2\le\sigma_1^2$.** On propose le test de zone de rejet
$$\Big\{Z:\ \frac{(n-1)^{-1}\sum_{i=1}^n(X_i-\hat\mu_{0,n}(Z))^2}{(p-1)^{-1}\sum_{j=1}^p(Y_j-\hat\mu_{1,p}(Z))^2}>f^{1-\alpha}_{n-1,p-1}\Big\}$$
où $f^{1-\alpha}_{n-1,p-1}$ est le $(1-\alpha)$-quantile de la loi de Fisher $(n-1,p-1)$. Niveau : notons $W_{n-1,p-1}$ une v.a. de loi de Fisher $(n-1,p-1)$. Pour tout $\theta$ tel que $\sigma_0^2\le\sigma_1^2$,
$$\begin{aligned}\mathbb{P}_\theta\Big(\frac{(n-1)^{-1}\sum_{i=1}^n(X_i-\hat\mu_{0,n}(Z))^2}{(p-1)^{-1}\sum_{j=1}^p(Y_j-\hat\mu_{1,p}(Z))^2}>f^{1-\alpha}_{n-1,p-1}\Big)&=\mathbb{P}\Big(\frac{\sigma_0^2}{\sigma_1^2}W_{n-1,p-1}>f^{1-\alpha}_{n-1,p-1}\Big)\\&=\mathbb{P}\Big(W_{n-1,p-1}>\frac{\sigma_1^2}{\sigma_0^2}f^{1-\alpha}_{n-1,p-1}\Big)\\&\le\mathbb{P}\big(W_{n-1,p-1}>f^{1-\alpha}_{n-1,p-1}\big)\end{aligned}$$
(la statistique vaut $\frac{\sigma_0^2}{\sigma_1^2}G(Z;\theta)$ ; puis $\sigma_1^2/\sigma_0^2\ge1$ et la fonction de survie est décroissante). D'une part $\mathbb{P}(W_{n-1,p-1}>f^{1-\alpha}_{n-1,p-1})=\alpha$ ; d'autre part
$$\mathbb{P}\big(W_{n-1,p-1}>f^{1-\alpha}_{n-1,p-1}\big)=\mathbb{P}_{(\mu_0,\mu_1,\sigma_0^2,\sigma_0^2)}\Big(\frac{(n-1)^{-1}\sum_{i=1}^n(X_i-\hat\mu_{0,n}(Z))^2}{(p-1)^{-1}\sum_{j=1}^p(Y_j-\hat\mu_{1,p}(Z))^2}>f^{1-\alpha}_{n-1,p-1}\Big)$$
(cas d'égalité $\sigma_1^2=\sigma_0^2$ ; le corrigé imprime $f^{\alpha}_{n-1,p-1}$, coquille), ce qui montre que
$$\sup_{\theta:\ \sigma_0^2\le\sigma_1^2}\mathbb{P}_\theta\Big(\frac{(n-1)^{-1}\sum_{i=1}^n(X_i-\hat\mu_{0,n}(Z))^2}{(p-1)^{-1}\sum_{j=1}^p(Y_j-\hat\mu_{1,p}(Z))^2}>f^{1-\alpha}_{n-1,p-1}\Big)=\alpha .$$

**Q8 — $p$-valeur.** Soit
$$T(Z)=\frac{(n-1)^{-1}\sum_{i=1}^n(X_i-\hat\mu_{0,n}(Z))^2}{(p-1)^{-1}\sum_{j=1}^p(Y_j-\hat\mu_{1,p}(Z))^2} ;$$
la $p$-valeur est la plus petite valeur de $\alpha$ pour laquelle $T(Z)>f^{1-\alpha}_{n-1,p-1}$. En notant $F_{n-1,p-1}$ la f.d.r. de la loi de Fisher $(n-1,p-1)$, on a $f^{1-\alpha}_{n-1,p-1}=F^{-1}_{n-1,p-1}(1-\alpha)$, fonction décroissante et bijective de $(0,1)$ dans $\mathbb{R}^*_+$, donc
$$\widehat{\alpha}(Z)=1-F_{n-1,p-1}(T(Z)).$$

#### Méthodes mobilisées
- **Calcul d'EMV** dans un modèle gaussien à deux échantillons (log-vraisemblance, maximisation en deux temps).
- Loi d'une **différence de moyennes empiriques** indépendantes ; standardisation.
- **Théorème de Cochran / Gosset** (via l'Ex. 2) : indépendance de la variance poolée et de la différence des moyennes ; $(n+p-2)S^2_{n,p}/\sigma^2\sim\chi^2(n+p-2)$ (additivité des $\chi^2$ indépendants).
- **Pivot de Student à deux échantillons** (rappel C) ; **inversion du pivot** (Poly ch.4, Prop. 1.1) ; choix de l'intervalle de probabilité $1-\alpha$ **le plus court** (densité symétrique unimodale).
- **Dualité intervalle de confiance / test** (pivot → IC → test).
- **Test unilatéral à $H_0$ composite** : décomposition « pivot + terme de signe connu », majoration, cas d'égalité au bord.
- **Pivot de Fisher** (rappel D, Poly ch.4, Déf. 3.2) ; niveau par **monotonie de la fonction de survie**.
- **$p$-valeur** par inversion de la f.d.r. continue (Poly ch.4, Prop. 2.1).

#### Pièges relevés / remarques du corrigé
- Variance poolée normalisée en $n+p-2$ (deux moyennes estimées), et non $n+p$ (EMV, biaisé) ni $n+p-1$.
- Le facteur $\sqrt{np/(n+p)}$ vient de $\frac1n+\frac1p=\frac{n+p}{np}$.
- Q4 : le terme $\sqrt{\frac{np}{n+p}}\frac{\mu_0-\mu_1}{S_{n,p}(Z)}$ est **aléatoire** (via $S_{n,p}$) mais de **signe connu** ($\le0$ sous $H_0$) : c'est ce qui permet la majoration.
- Q5 : erreur du corrigé sur la $p$-valeur bilatérale ($0.992$, pas $0.4960$) ; conclusion inchangée. Attention aussi à la normalisation des écarts-types du tableau ($1/n$ vs $1/(n-1)$ : effet négligeable ici).
- Q5 : la $p$-valeur élevée ne « prouve » pas l'égalité des moyennes ; le corrigé dit « accepter » (le poly : « ne pas rejeter »).
- Q6–Q7 : sens du rapport : la statistique est $\hat\sigma_0^2/\hat\sigma_1^2$ (groupe 0 au numérateur) car $H_1:\sigma_0^2>\sigma_1^2$ ; le pivot, lui, porte le facteur $\sigma_1^2/\sigma_0^2$.
- Les deux variances sont différentes en Q6–Q8 : le pivot de Student de Q2 n'est plus valable (problème de Behrens-Fisher, non traité).

#### Résultats numériques
- $n=p=120$, $n+p-2=238$ ; $\hat\mu_{0,n}-\hat\mu_{1,p}=0.01$ ; $\sqrt{np/(n+p)}=\sqrt{60}\approx7.746$.
- *Recontrôle (extracteur)* : $S_{n,p}=\sqrt{\frac{120}{238}(8.72^2+6.54^2)}\approx7.74$ ; statistique $\approx\sqrt{60}\times0.01/7.74\approx0.0100$ ; $F_{t_{238}}(0.01)\approx0.5040$.
- $p$-valeur bilatérale (Q3) $\approx0.992$ ; unilatérale (Q4) $\approx0.4960$ (valeur imprimée dans le corrigé). Non-rejet dans tous les cas.

---

### Exercice 6 — Campagne de vaccination : test binomial, approximation de Poisson, choix de $H_0$ (⋆⋆)

**Source :** PC4 énoncé p. 6 ; corrigé p. 26–29. = Poly ch.4, Exercice 6 (bonus). Référence de l'énoncé : M. Aitkin, *Evidence and the Posterior Bayes Factor*, Math. Scientist, vol. 17, pp. 15–25 (1992) ; vidéo https://www.youtube.com/watch?v=Lygy1OxUG88.

#### Énoncé complet

Des plaignants ont poursuivi en justice le Ministère de la Santé suite à une campagne de vaccination menée sur des enfants et ayant entraîné des dommages fonctionnels irréversibles pour certains d'entre eux. Ce vaccin était connu pour entraîner ce type de dommages en de très rares circonstances. Des études antérieures menées dans d'autres pays ont montré que ce risque était en moyenne d'un cas sur 310 000 vaccinations. Les plaignants avaient été informés de ce risque et l'avaient accepté. Les doses de vaccin ayant provoqué les dommages objet de la plainte provenaient d'un lot ayant servi à vacciner un groupe de 300 533 enfants. Dans ce groupe, quatre cas de dommages ont été détectés.

1. On modélise l'événement « le vaccin provoque des dommages fonctionnels irréversibles sur l'enfant $i$ » par une variable aléatoire de Bernoulli, $X_i$, de paramètre $p$. Calculer la valeur du paramètre correspondant aux résultats des études antérieures ; on la notera $p_0$ dans la suite.

On considère le test $H_0:\ p\le p_0$ contre $H_1:\ p>p_0$. L'hypothèse nulle correspond au risque que les clients avaient accepté.

2. On pose $S_n=\sum_{i=1}^nX_i$ avec $n=300533$. Pour $\alpha\in[0,1]$, déterminer un test de niveau $\alpha$ basé sur la statistique de test $S_n$.
3. On a $\mathbb{P}_{p_0}(S_n>0)=0.6207$, $\mathbb{P}_{p_0}(S_n>1)=0.2530$, $\mathbb{P}_{p_0}(S_n>2)=0.0748$, $\mathbb{P}_{p_0}(S_n>3)=0.0172$, $\mathbb{P}_{p_0}(S_n>4)=0.0032$. L'hypothèse est-elle acceptée au niveau 0.05 ? au niveau 0.01 ?
4. Quelle est la $p$-valeur de l'observation ?

On peut modéliser la loi du nombre $S_n$ de cas de dommages par une loi de Poisson de paramètre $\theta$.

5. Calculer la valeur $\theta_0$ attendue si le vaccin est conforme aux études antérieures.
6. Les plaignants militent pour que le test prouve effectivement que le nombre moyen d'accidents reste inférieur à $\theta_0$. Pour eux, le nombre moyen est supérieur à $\theta_0$ sauf preuve du contraire. Proposer un test à partir de la variable $S_n$.
7. Donner la $p$-valeur de ce test. Accepte-t-on $H_0$ au seuil de 0.05 ?

#### Corrigé complet (corrigé officiel, p. 26–29)

Le modèle statistique est
$$\big(\{0,1\}^n,\mathcal{P}(\{0,1\}^n),\{\mathbb{P}_p=\otimes_{i=1}^n\mathcal{B}(p);\ p\in\,]0,1[\}\big).$$

**Q1.** La proportion annoncée par le Ministère est $p_0=1/310\,000\approx3.23\mathrm{e}{-06}$.

**Q2 — Test de niveau $\alpha$.** On prend un test de zone de rejet de la forme $\{S_n>c\}$ ($S_n$ grand ⇒ $p$ grand). Le risque de première espèce est
$$\sup_{p\le p_0}\mathbb{P}_p(S_n>c)=\mathbb{P}_{p_0}(S_n>c).$$
*Démonstration de cette monotonie (bleu) — couplage.* Soit $p\le p_0$. Sous $\mathbb{P}_p$, $S_n$ a même loi que $\sum_{k=1}^n\mathbb{1}_{U_k\le p}$ où $U_1,\dots,U_n$ sont i.i.d. uniformes sur $[0,1]$. Puisque
$$\sum_{i=1}^n\mathbb{1}_{U_i\le p}\le\sum_{i=1}^n\mathbb{1}_{U_i\le p_0},$$
il vient
$$\Big\{\sum_{i=1}^n\mathbb{1}_{U_i\le p}>c\Big\}\subseteq\Big\{\sum_{i=1}^n\mathbb{1}_{U_i\le p_0}>c\Big\},$$
dont on déduit que pour tout $p\le p_0$, $\mathbb{P}_p(S_n>c)\le\mathbb{P}_{p_0}(S_n>c)$ (Poly ch.4, Ex. 2.5, Lemme 3.1).
On veut un test de niveau $\alpha$, donc on prend $c$ tel que $\mathbb{P}_{p_0}(S_n>c)\le\alpha$, en remarquant que sous $\mathbb{P}_{p_0}$, $S_n\sim\mathrm{Bin}(n,p_0)$. Posons
$$c_\alpha:=\inf\{0\le c\le n:\ \mathbb{P}_{p_0}(S_n>c)\le\alpha\}=\inf\{0\le c\le n:\ \mathbb{P}_{p_0}(S_n\le c)\ge1-\alpha\}=F^{-1}_{p_0}(1-\alpha),$$
où $F^{-1}_{p_0}$ (noté aussi $F_b^{-1}$) désigne l'**inverse généralisée** de la f.d.r. de la loi binomiale de paramètres $n=300\,533$ et $p=p_0$ (Poly ch.4, Déf. 3.1). Test : $\mathcal{R}_\alpha=\{S_n>c_\alpha\}$.
*Fonction de répartition de $\mathrm{Bin}(n,p_0)$ (bleu).* Figure 11 (gauche) : f.d.r. de $\mathrm{Bin}(300\,533,p_0)$ sur $[-1.5;5.5]$, avec la détermination de $\inf\{0\le c\le n:\ \mathbb{P}_{p_0}(S_n\le c)\ge1-\alpha\}$ pour $\alpha=0.05$ (rouge) et $\alpha=0.01$ (vert) ; (droite) fonction de survie $x\mapsto\mathbb{P}_{p_0}(S_n>x)$.

**Q3.** Au niveau $\alpha=0.05$ : $\mathbb{P}_{p_0}(S_n>2)=0.0748>0.05$ et $\mathbb{P}_{p_0}(S_n>3)=0.0172\le0.05$, donc $c_\alpha=3$ ; on relève $S_n=4>3$ donc **on rejette $H_0$**. Pour $\alpha=0.01$ : $\mathbb{P}_{p_0}(S_n>3)=0.0172>0.01$ et $\mathbb{P}_{p_0}(S_n>4)=0.0032\le0.01$, donc $c_\alpha=4$ ; $S_n=4\not>4$, donc **on accepte (ne rejette pas) $H_0$**.

**Q4 — $p$-valeur.** Si $\alpha<\alpha'$, alors $c_\alpha\ge c_{\alpha'}$ (le corrigé écrit $>$) donc $\{S_n>c_\alpha\}\subset\{S_n>c_{\alpha'}\}$. On cherche donc
$$\inf\{\alpha\in[0,1]:\ S_n=4\in\mathcal{R}_\alpha\}=\inf\{\alpha\in[0,1]:\ 4\in\,]c_\alpha,n]\}=\inf\{\alpha:\ c_\alpha=3\}.$$
Donc on cherche $\alpha$ tel que
$$3=F^{-1}_{p_0}(1-\alpha)\qquad\text{i.e.}\qquad\alpha=1-\mathbb{P}_{p_0}(S_n\le3).$$
La $p$-valeur est $0.0172$ (exactement $0.017172$).

**Q5.** On attend $\theta_0=300\,533\times p_0=300\,533/310\,000\approx0.9695$ (espérance de $S_n$ ; approximation de Poisson d'une binomiale à $n$ grand et $p$ petit).

**Q6–Q7 : le corrigé propose deux lectures.**

**§2.6.1 — « Une façon de comprendre la formulation de la question 6 donnée en PC »** (bleu) : on garde les mêmes $H_0$ et $H_1$ que dans la première partie ; la seule modification est que l'on remplace la loi binomiale par une loi de Poisson pour calculer les f.d.r.

- **Q6.** Les hypothèses restent $H_0:\ \theta\le\theta_0$, $H_1:\ \theta>\theta_0$. On considère la famille des tests de zone de rejet $\{S_n>c\}$ et l'on choisit $c$ tel que $\sup_{\theta\le\theta_0}\mathbb{P}_\theta(S_n>c)\le\alpha$. Puisque $\theta\mapsto\mathbb{P}_\theta(S_n>c)$ est **croissante** (Figure 12 : fonctions de survie pour $\theta\in\{0.5,1,2\}$), on choisit $c$ tel que $\mathbb{P}_{\theta_0}(S_n>c)\le\alpha$. Pour des considérations de **puissance**, on prend le **plus petit** $c$ qui vérifie cette condition :
$$c_\alpha:=\min\{c\ge0:\ \mathbb{P}_{\theta_0}(S_n>c)\le\alpha\}=\min\{c\ge0:\ \mathbb{P}_{\theta_0}(S_n\le c)\ge1-\alpha\}=F^{-1}_{\theta_0}(1-\alpha),$$
où $F^{-1}_{\theta_0}$ est l'inverse généralisée de la f.d.r. de $\mathcal{P}(\theta_0)$. Le test associé est
$$\mathcal{R}_\alpha:=\{n\in\mathbb{N}:\ n>c_\alpha\}.$$
- **Q7.** Monotonie des zones de rejet : si $\alpha<\alpha'$ alors $c_\alpha\ge c_{\alpha'}$ et $\mathcal{R}_\alpha\subset\mathcal{R}_{\alpha'}$. On cherche
$$\inf\{\alpha\in[0,1]:\ 4>c_\alpha\}=\inf\{\alpha:\ c_\alpha=3\}=1-F_{\theta_0}(3).$$
Il vient (probabilité calculée directement par $1-\sum_{k=0}^3\frac{\theta_0^k}{k!}\exp(-\theta_0)$) :
$$\hat\alpha(S_n)=\mathbb{P}_{\theta_0}(S_n>3)=0.017173 .$$
Donc **rejet de $H_0$ au seuil 0.05** (non-rejet à 0.01) — conclusion identique au modèle binomial.

**§2.6.2 — « Autre approche pour la question 6 : changer de point de vue »** (bleu ; absente du poly ch.4). On se place du point de vue des patients. Jusqu'ici, via le risque de première espèce, on a garanti que la procédure ne faisait pas, dans plus de $\alpha\%$ des cas, l'erreur « affirmer que la probabilité que le vaccin ait de graves effets secondaires est plus élevée que $p_0$, alors qu'en réalité elle ne l'est pas ». Du point de vue du patient, il vaut mieux se protéger de l'erreur « affirmer que cette probabilité est inférieure à $p_0$, alors qu'en réalité elle l'est ». Pour le patient, la probabilité réelle est plus élevée, et il attend que les données démontrent le contraire.

- **Q6.** Les hypothèses deviennent
$$H_0:\ \theta\ge\theta_0\qquad H_1:\ \theta<\theta_0 .$$
On considère la famille de tests de zone de rejet $\{S_n\le c\}$ et l'on choisit $c$ tel que $\sup_{\theta\ge\theta_0}\mathbb{P}_\theta(S_n\le c)\le\alpha$. Puisque $\theta\mapsto\mathbb{P}_\theta(S_n\le c)$ est **décroissante** (Figure 12), on choisit $c$ tel que $\mathbb{P}_{\theta_0}(S_n\le c)\le\alpha$. Pour des considérations de puissance, on prend le **plus grand** $c$ qui vérifie cette condition :
$$c_\alpha:=\max\{c\in\mathbb{N}:\ \mathbb{P}_{\theta_0}(S_n\le c)\le\alpha\}=F^{-1}_{\theta_0}(\alpha),$$
et le test associé est $\mathcal{R}_\alpha:=\{n\in\mathbb{N}:\ n\le c_\alpha\}$. Pour se donner une idée des valeurs du seuil critique en fonction de $\alpha$ (plutôt de l'ordre de quelques %) :
$$\mathbb{P}_{\theta_0}(S_n<0)=0,\qquad\mathbb{P}_{\theta_0}(S_n\le0)=0.3793,\qquad\mathbb{P}_{\theta_0}(S_n\le1)=0.7470 .$$
- **Q7.** Monotonie : si $\alpha<\alpha'$ alors $c_\alpha\le c_{\alpha'}$ et $\mathcal{R}_\alpha\subset\mathcal{R}_{\alpha'}$. On cherche
$$\inf\{\alpha\in[0,1]:\ 4\le c_\alpha\}=\inf\{\alpha:\ c_\alpha=4\}=F_{\theta_0}(4).$$
Il vient
$$\hat\alpha(S_n)=0.9968 .$$
(Conclusion, explicitée par l'extracteur : on ne rejette pas $H_0:\theta\ge\theta_0$ au seuil 0.05 — les données ne prouvent pas que le vaccin est conforme. Remarque de l'extracteur : pour $\alpha<0.3793$, aucun $c\ge0$ ne vérifie $\mathbb{P}_{\theta_0}(S_n\le c)\le\alpha$ ; la région de rejet est alors vide : avec $\theta_0\approx0.97$ cas attendus, aucun test de niveau usuel ne peut établir $\theta<\theta_0$.)

#### Méthodes mobilisées
- **Modélisation** Bernoulli / binomiale, puis **approximation de Poisson** ($\theta_0=np_0$).
- **Couplage** par variables uniformes pour la **monotonie de la puissance** en $p$ (Poly ch.4, Ex. 2.5, Lemme 3.1) ; monotonie en $\theta$ pour Poisson (lue sur la Figure 12).
- **Calibrage discret** par inverse généralisée de la f.d.r. (Poly ch.4, Déf. 3.1) ; seuil le plus petit (resp. le plus grand) pour la **puissance**.
- **$p$-valeur discrète** par familles emboîtées (Poly ch.4, Déf. 2.4).
- **Choix de l'hypothèse nulle** selon le point de vue (Poly ch.4, §2.4 Neyman-Pearson, Ex. 2.6–2.9 « échanger $H_0$ et $H_1$ »).

#### Pièges relevés / remarques du corrigé
- La taille est le **sup** sur $p\le p_0$ ; c'est la monotonie (couplage) qui le ramène à $p_0$.
- Statistique discrète : niveau 0.05 ⇒ taille réelle $0.0172$ ; niveau 0.01 ⇒ taille $0.0032$.
- **$p$-valeur** $=\mathbb{P}_{p_0}(S_n>3)=\mathbb{P}_{p_0}(S_n\ge4)$ et **non** $\mathbb{P}_{p_0}(S_n>4)$.
- Rejet à 5 % mais pas à 1 % : cohérent avec $p$-valeur $\approx1.7\%\in\,]1\%,5\%[$.
- **Choix de $H_0$** : la formulation de Q6 (« supérieur à $\theta_0$ sauf preuve du contraire ») suggère $H_0:\theta\ge\theta_0$ ; le corrigé donne les deux lectures. En échangeant $H_0$ et $H_1$, la conclusion change radicalement ($p$-valeur $0.017$ vs $0.9968$) : on ne peut « prouver » que l'hypothèse placée en $H_1$. [Poly ch.4] : le corrigé du poly ne garde que la lecture §2.6.1 ($H_0:\theta\le\theta_0$).
- Le corrigé dit « accepter $H_0$ » ; formulation prudente : « ne pas rejeter ».

#### Résultats numériques
- $p_0=1/310\,000\approx3.23\cdot10^{-6}$ ; $n=300\,533$ ; $\theta_0=np_0\approx0.9695$ ; observation $S_n=4$.
- $\mathbb{P}_{p_0}(S_n>k)$, $k=0,\dots,4$ : $0.6207$, $0.2530$, $0.0748$, $0.0172$, $0.0032$ (recontrôlés).
- $c_{0.05}=3$ (rejet), $c_{0.01}=4$ (non-rejet) ; $p$-valeur binomiale $0.017172$ ; $p$-valeur Poisson ($H_0:\theta\le\theta_0$) $0.017173$.
- Approche inversée : $\mathbb{P}_{\theta_0}(S_n\le0)=0.3793$, $\mathbb{P}_{\theta_0}(S_n\le1)=0.7470$, $p$-valeur $F_{\theta_0}(4)=0.9968$.

---

### Exercice 7 — Test de Wilcoxon (test de rangs, non paramétrique) (⋆⋆⋆)

**Source :** PC4 énoncé p. 7 ; corrigé p. 30–31. = Poly ch.4, Exercice 7 (bonus). Vidéo de l'énoncé : https://www.youtube.com/watch?v=QDUQscWyXqw.

#### Énoncé complet

*On rappelle que pour une suite de réels $x_1,\dots,x_q$, la notation $x_{\ell:q}$ désigne la suite ordonnée : on a $x_{1:q}\le x_{2:q}\le\dots\le x_{q:q}$.*

Une firme pharmaceutique a mis au point une nouvelle molécule pour faire chuter le taux de sucre dans le sang. Pour tester l'efficacité de cette molécule, elle la compare à un placebo. Elle réunit $n+m$ patients. À un premier groupe de $m$ individus, elle administre un placebo (sans leur dire !). Au second groupe elle donne sa nouvelle molécule. Après un délai approprié, on mesure les taux de glycémie $\{X_i:\ i=1,\dots,n\}$ et $\{Y_j:\ j=1,\dots,m\}$ chez les deux groupes.

On suppose que les variables aléatoires $(X_1,\dots,X_n,Y_1,\dots,Y_m)$ sont indépendantes ; que les v.a. $(X_i)_i$ ont même loi de fonction de répartition $F_X$ ; et que les v.a. $(Y_i)_i$ ont même loi de fonction de répartition $F_Y$. On supposera que les fonctions $F_X$ et $F_Y$ sont continues.

On veut tester si les lois des $X$ et des $Y$ sont les mêmes ou si les $Y_i$ sont stochastiquement plus petits que les $X_i$, c'est-à-dire $F_X<F_Y$. On va donc tester $H_0:\ F_X=F_Y$ contre $H_1:\ F_X<F_Y$.

On pose $Z_i=X_i$ pour $i=1,\dots,n$ et $Z_{n+i}=Y_i$ pour $i=1,\dots,m$. On note $R_i$ le rang de $Z_i$ dans la suite $(Z_1,\dots,Z_{n+m})$, à savoir $R_i=\ell$ si $Z_i=Z_{\ell:n+m}$. La statistique de Wilcoxon est définie par
$$W_{n,m}:=\sum_{i=1}^nR_i .$$
L'idée est que sous $H_1$ la statistique $W_{n,m}$ sera plus grande que sous $H_0$.

1. Soit $N=n+m$. Montrez que la *statistique de rang* $R:=(R_1,\dots,R_N)$ suit sous $H_0$ la loi uniforme sur l'ensemble $\mathcal{S}_N$ de toutes les permutations de $\{1,\dots,N\}$. En déduire que sous $H_0$ la statistique de Wilcoxon est *libre*, i.e. la loi de $W_{n,m}$ ne dépend pas de $F_X$. Quelle est la loi de $R_i$ sous $H_0$ ?
2. Montrez que sous $H_0$ on a $\mathrm{E}(W_{n,m})=n(n+m+1)/2$.
3. Montrez que sous $H_0$ on a
$$\begin{aligned}\mathrm{Var}(W_{n,m})&=n\,\mathrm{Var}(R_1)+n(n-1)\,\mathrm{Cov}(R_1,R_2)\\0=\mathrm{Var}\Big(\sum_{i=1}^{n+m}R_i\Big)&=(n+m)\mathrm{Var}(R_1)+(n+m)(n+m-1)\mathrm{Cov}(R_1,R_2).\end{aligned}$$
En déduire que, sous $H_0$, $\mathrm{Var}(W_{n,m})=nm(n+m+1)/12$.
4. Proposer un test de niveau $\alpha$.

#### Corrigé complet (corrigé officiel, p. 30–31)

**La v.a. $R$ est bien définie (bleu).** Puisque $F_X$ et $F_Y$ sont continues, $\mathbb{P}(Z_i=Z_j)=0$ pour $i\ne j$ (pas d'ex æquo p.s.).

**Q1.**
- *$R$ uniforme sur $\mathcal{S}_N$.* Sous $H_0$, les v.a. $(Z_1,\dots,Z_{n+m})$ sont i.i.d. de loi $F_X$, ce qui entraîne que $(Z_1,\dots,Z_{n+m})$ a même loi que $(Z_{\tau(1)},\dots,Z_{\tau(n+m)})$ pour toute permutation **déterministe** $\tau\in\mathcal{S}_N$ (**échangeabilité**). En particulier
$$\mathbb{E}_0\big[\mathbb{1}_{Z_1<\dots<Z_{n+m}}\big]=\mathbb{E}_0\big[\mathbb{1}_{Z_{\tau(1)}<\dots<Z_{\tau(n+m)}}\big]\ ;$$
on a noté $\mathbb{P}_0$ la probabilité sous laquelle les $\{Z_k\}_{1\le k\le n+m}$ sont i.i.d. de loi $F_X$. Par suite, pour toute permutation $\tau\in\mathcal{S}_N$,
$$\mathbb{P}_0\big(R=(1,\dots,n+m)\big)=\mathbb{E}_0\big[\mathbb{1}_{Z_1<\dots<Z_{n+m}}\big]=\mathbb{E}_0\big[\mathbb{1}_{Z_{\tau(1)}<\dots<Z_{\tau(n+m)}}\big]=\mathbb{P}_0\big(R_{\tau(1)}=1,\dots,R_{\tau(i)}=i,\dots,R_{\tau(n+m)}=n+m\big).$$
Cette relation étant vraie pour tout $\tau$, tous les ordres ont la même probabilité : $R$ suit la loi uniforme sur $\mathcal{S}_N$,
$$\mathbb{P}_0\big(R=(i_1,\dots,i_{n+m})\big)=\frac{1}{(n+m)!}.$$
- *$W_{n,m}$ est libre sous $H_0$.* Sous $H_0$, $W_{n,m}$ est à valeurs dans l'intervalle délimité par (au mieux) $\sum_{i=1}^ni$ et (au pire) $\sum_{i=m+1}^{n+m}i$. Pour toute valeur $q$ de cet intervalle,
$$\mathbb{P}_0(W_{n,m}=q)=\sum_{(i_1,\dots,i_n)\in\mathcal{I}_q}\mathbb{P}_0(R_1=i_1,\dots,R_n=i_n)=\sum_{(i_1,\dots,i_n)\in\mathcal{I}_q}\frac{m!}{(n+m)!},$$
où $\mathcal{I}_q$ désigne l'ensemble des listes à $n$ éléments d'entiers deux à deux distincts choisis dans $\{1,\dots,n+m\}$ et de somme $q$ ; $m!$ est le nombre de façons de compléter les $m$ valeurs manquantes $(R_{n+1},\dots,R_{n+m})$ (**dénombrement**). La preuve se termine en observant que le cardinal de $\mathcal{I}_q$ **ne dépend pas de la loi $F_X$**.
- *Loi de $R_i$.* On connaît la loi (uniforme) du vecteur $R$. L'événement $\{R_i=q\}$ correspond à choisir les valeurs des $n+m-1$ autres rangs dans une liste à $n+m-1$ éléments : $(n+m-1)!$ possibilités. Donc
$$\mathbb{P}_0(R_i=q)=\frac{(n+m-1)!}{(n+m)!}=\frac{1}{n+m}.$$
Autrement dit : sous $H_0$, $R_i$ suit une **loi uniforme sur $\{1,\dots,n+m\}$**.

**Q2 — Espérance.** $R_i$ uniforme sur $\{1,\dots,n+m\}$, donc
$$\mathbb{E}_0[R_i]=\frac{(n+m)(n+m+1)}{2(n+m)}=\frac{(n+m+1)}{2}.$$
Ce résultat est indépendant de $i$ ; par **linéarité**, $\mathbb{E}_0[W_{n,m}]=n\,\mathbb{E}_0[R_1]=n(n+m+1)/2$.

**Q3 — Variance.**
- Par le développement classique de la variance d'une somme, et en utilisant que sous $H_0$ les $(R_i)_i$ **ont même loi** :
$$\mathrm{Var}_0(W_{n,m})=n\,\mathrm{Var}_0(R_1)+\sum_{1\le i\ne j\le n}\mathrm{Cov}_0(R_i,R_j).$$
Il reste à montrer que sous $H_0$, $\mathrm{Cov}_0(R_i,R_j)=\mathrm{Cov}_0(R_1,R_2)$ pour $i\ne j$, conséquence du fait que sous $H_0$ les $(Z_k)_k$ sont i.i.d. (la loi du couple $(R_i,R_j)$ ne dépend pas de $(i,j)$) ; pour s'en convaincre on peut utiliser la relation
$$R_i=1+\sum_{\ell=1}^{n+m}\mathbb{1}_{]0,+\infty[}(Z_i-Z_\ell).$$
Il y a $n(n-1)$ couples $(i,j)$, $i\ne j$, d'où la première formule.
- La démonstration de la seconde expression est identique (avec $n+m$ termes) ; le terme vaut **zéro** puisque la somme de tous les rangs est une **constante** égale à la somme des entiers de 1 à $n+m$.
- On déduit de la seconde relation
$$\mathrm{Cov}_0(R_1,R_2)=-\frac{1}{n+m-1}\mathrm{Var}_0(R_1)$$
et en l'introduisant dans la première
$$\mathrm{Var}_0(W_{n,m})=n\,\mathrm{Var}_0(R_1)\Big(1-\frac{n-1}{n+m-1}\Big)=\frac{nm}{n+m-1}\mathrm{Var}_0(R_1).$$
- Puisque $R_1$ suit une loi uniforme sur $\{1,\dots,n+m\}$, sa variance est $(n+m+1)(n+m-1)/12$ (en utilisant $\sum_{i=1}^qi^2=q(q+1)(2q+1)/6$ ; détail de l'extracteur avec $N=n+m$ : $\mathbb{E}_0[R_1^2]=\frac{(N+1)(2N+1)}{6}$, d'où $\mathrm{Var}_0(R_1)=\frac{(N+1)(2N+1)}{6}-\frac{(N+1)^2}{4}=\frac{(N+1)(N-1)}{12}$), ce qui donne
$$\mathrm{Var}_0(W_{n,m})=\frac{nm}{n+m-1}\cdot\frac{(n+m+1)(n+m-1)}{12}=\frac{nm(n+m+1)}{12}.$$

[Poly ch.4] : le corrigé du poly écrit « par indépendance et même loi des $R_i$ » ; **les $R_i$ ne sont pas indépendants** (covariance négative) — le corrigé PC (« ont même loi ») est ici le bon argument (échangeabilité).

**Q4 — Test de niveau $\alpha$.** Puisque sous $H_0$ la loi de $W_{n,m}$ ne dépend pas de $F_X$, on peut trouver $\mathcal{A}_\alpha$ tel que
$$\mathbb{P}_0(W_{n,m}\notin\mathcal{A}_\alpha)\le\alpha,$$
et poser le test de zone de rejet
$$\Big\{z_1,\dots,z_{n+m}:\ \sum_{i=1}^nr_i\notin\mathcal{A}_\alpha\Big\}.$$
Un exemple de tel ensemble $\mathcal{A}_\alpha$ peut être construit par **Tchebychev** (Bienaymé-Tchebychev avec Q2–Q3) :
$$\mathbb{P}_0\big(\lvert W_{n,m}-n(n+m+1)/2\rvert\ge\varepsilon\big)\le\frac{nm(n+m+1)}{12\,\varepsilon^2},$$
donc on choisit
$$\varepsilon_\alpha:=\sqrt{\frac{nm(n+m+1)}{12\,\alpha}}\qquad\text{puis}\qquad\mathcal{A}_\alpha:=\Big[\frac{n(n+m+1)}{2}\pm\varepsilon_\alpha\Big].$$

#### Méthodes mobilisées
- **Échangeabilité** d'un vecteur i.i.d. (invariance de la loi par permutation déterministe) ; absence d'ex æquo p.s. (lois continues).
- **Dénombrement** (permutations, compléments $m!$, $(N-1)!$) ⇒ **statistique libre** (non paramétrique).
- Loi **uniforme discrète** : espérance $(N+1)/2$, variance $(N^2-1)/12$ via $\sum i^2$.
- **Variance d'une somme** (variances + covariances) ; astuce de la **somme constante** ($\mathrm{Var}=0$) pour obtenir la covariance.
- **Inégalité de Bienaymé-Tchebychev** pour calibrer un test sans connaître les quantiles exacts (Poly ch.2 §2 ; cf. Poly ch.4 compléments, tests par inégalité de déviation).

#### Pièges relevés / remarques du corrigé
- Les rangs $R_i$ ont **même loi** mais **ne sont pas indépendants** : $\mathrm{Cov}_0(R_1,R_2)=-\mathrm{Var}_0(R_1)/(N-1)<0$.
- La loi de $W_{n,m}$ sous $H_0$ ne dépend **pas** de $F_X$ (test valable sans hypothèse paramétrique), mais sous $H_1$ elle dépend de $F_X,F_Y$.
- Le test proposé par Tchebychev est **bilatéral** alors que $H_1$ est unilatérale ($W$ plus grande sous $H_1$) ; un test unilatéral $\{W_{n,m}\ge n(N+1)/2+\varepsilon\}$ serait plus naturel (remarque de l'extracteur, non discutée dans le corrigé). Tchebychev donne un niveau garanti mais une taille souvent bien inférieure à $\alpha$ (test conservateur).
- Incohérence d'énoncé sur la taille des groupes ($m$ placebos mais $X$ indexés par $n$) ; sans effet.

#### Résultats numériques
- Aucune application numérique. *Exemple (extracteur)* : $n=m=10$, $N=20$ : $\mathbb{E}_0[W]=105$, $\mathrm{Var}_0(W)=175$ ; à $\alpha=5\%$, $\varepsilon_\alpha=\sqrt{175/0.05}\approx59.2$ ; $\mathcal{A}_\alpha\approx[45.8;\ 164.2]$, à comparer au support $[55;\ 155]$ de $W$ : **ce test ne rejette jamais** pour $n=m=10$ (illustration du caractère très conservateur de Tchebychev).

---

## 2. Synthèse des méthodes de la PC

| Méthode | Exercices où elle apparaît | Résultat du poly utilisé |
|---|---|---|
| Identifier une loi Gamma / $\chi^2$ (changement d'échelle, additivité) | 1 Q1(a) | Rappels A–B ; Poly ch.1 §2 (Gamma, $\chi^2=\mathrm{Gamma}(\nu/2,1/2)$) |
| Repérer / construire une **fonction pivotale** | 1, 3, 5 (Q2, Q6) | Poly ch.4, Déf. 1.2 ; Ex. 1.1–1.3, 1.5–1.6 |
| **Inverser un pivot** ⇒ IC bilatéral exact | 1 Q3(a), 3 Q2, 5 Q2 | Poly ch.4, Prop. 1.1, Méthode 1.1 |
| Bornes de confiance **unilatérales** | 1 Q3(b) | Poly ch.4, Déf. 1.1 (formes d'IC), Ex. 1.3 |
| IC de **longueur minimale** (choix de $A_\alpha$) | 3 Q2, 5 Q2 | Poly ch.4, Remarque « le choix de $A_\alpha$ » |
| Loi du maximum (statistique d'ordre) | 3 Q1 | Poly ch.1 §1.5 ; ch.3 Ex. 1.9 |
| **EMV** par annulation du score / maximisation en deux temps | 1 Q1(b), 5 Q1 | Poly ch.2, Déf. 1.4–1.6, Méthode 1.2, Ex. 1.10 |
| **Méthode des moments** ; EMV = moments en famille exponentielle ; **invariance** par reparamétrisation | 1 Q1(b) | Poly ch.2, Déf. 1.2, Méthode 1.1, Prop. 1.2 ; PC2 Ex. 2–3 |
| **Construction d'un test de niveau $\alpha$** (statistique, forme de $\mathcal{R}$, seuil) | 1, 2, 4, 5, 6, 7 | Poly ch.4, Déf. 2.1, Méthode 2.1 |
| **Fonction puissance** (calcul explicite) | 1 Q1(d), 2 Q1, 4 Q3 | Poly ch.4, Déf. 2.2, Ex. 2.3 |
| **Taille vs niveau** ; taille d'un test à $H_0$ simple | 1, 2, 4, 6 | Poly ch.4, Déf. 2.3 |
| Monotonie de la puissance ⇒ sup sur $\Theta_0$ atteint au bord | 1 Q2, 5 Q4, 5 Q7, 6 Q2/Q6 | Poly ch.4, Ex. 2.5 |
| **Couplage** par uniformes (binomiale) | 6 Q2 | Poly ch.4, Lemme 3.1, Ex. 2.5 |
| Calibrage **discret** par inverse généralisée ; taille $<\alpha$ | 4 Q2, 6 Q2–Q3, Q6 | Poly ch.4, Déf. 3.1, Prop. 3.1, Ex. 2.5 |
| **$p$-valeur** (régions emboîtées, inversion de la f.d.r.) | 1, 2, 4, 5, 6 | Poly ch.4, Déf. 2.4, Prop. 2.1, Ex. 2.13 |
| $p$-valeur en loi discrète ($\mathbb{P}(T\ge t_{\mathrm{obs}})$) | 4 Q4, 6 Q4, Q7 | Poly ch.4, Déf. 2.4 |
| Test **bilatéral** gaussien (symétrie de $\Phi$, loi repliée) | 2 Q1–Q3 | Poly ch.4, Ex. 2.10 |
| **Cochran / Gosset** : indépendance $\bar X_n\perp S_n^2$, $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$ | 2 Q4–Q5, 5 Q2, 5 Q6 | Poly ch.1, Th. 1.1, Th. 1.3 ; décorrélation ⇔ indépendance (vecteur gaussien) |
| **Test de Student** ; Student **non centrale** | 2 Q6–Q9, 5 Q2–Q5 | Rappel C ; Poly ch.4, Déf. 3.2, Ex. 1.5, Ex. 2.11 |
| **Dualité IC / test** | 5 Q3 | Poly ch.4, §2.6 (et compléments §5) |
| Test unilatéral à $H_0$ composite (terme de signe connu) | 5 Q4 | Poly ch.4, Méthode 2.1 étape (3) |
| **Loi de Fisher** ; test de comparaison de variances | 5 Q6–Q8 | Rappel D ; Poly ch.4, Déf. 3.2 |
| **Fonctions génératrices** (somme de Poisson indépendantes) | 4 Q1 | Lois usuelles (Poly ch.1) |
| Approximation de Poisson de la binomiale | 6 Q5 | — |
| **Choix de $H_0$** / échange de $H_0$ et $H_1$ | 6 Q6–Q7 | Poly ch.4, §2.4, Ex. 2.6–2.9 |
| **Échangeabilité**, statistique de rangs, statistique libre | 7 Q1 | — (non paramétrique) |
| Variance d'une somme, astuce de la somme constante | 7 Q3 | — |
| **Bienaymé-Tchebychev** pour calibrer un test | 7 Q4 | Poly ch.2 §2 ; Poly ch.4 compléments (tests par déviation) |

---

## 3. Idées de reformulation en exercices interactifs (sans saisie de formule)

### Exercice 1 — Modèle exponentiel
1. **Preuve à ordonner (Q1(a))** : remettre dans l'ordre : « $X_i\sim\Gamma(1,1/\theta)$ » → « si $Y\sim\Gamma(a,b)$, $\lambda Y\sim\Gamma(a,b/\lambda)$ » → « $2X_i/\theta\sim\Gamma(1,1/2)=\chi^2(2)$ » → « les $X_i$ sont i.i.d. » → « additivité des Gamma de même taux » → « $2\theta^{-1}\sum X_i\sim\Gamma(n,1/2)=\chi^2(2n)$ ». Distracteur à écarter : « $2X_i/\theta\sim\Gamma(1,2)$ ».
2. **QCM (Q1(c)–(e))** : « La région de rejet de niveau $\alpha$ pour $H_1:\theta>\theta_0$ est : (a) $\{\frac{2}{\theta_0}\sum z_k>q^{\chi^2(2n)}_{1-\alpha}\}$ ✔ ; (b) $\{\frac{2}{\theta_0}\sum z_k<q^{\chi^2(2n)}_{\alpha}\}$ ; (c) $\{\frac{2}{\theta_0}\sum z_k>q^{\chi^2(n)}_{1-\alpha}\}$ ; (d) $\{\frac{2}{\theta_0}\sum z_k>q^{\chi^2(2n)}_{1-\alpha/2}\}$. » Puis **application numérique** : « $p$-valeur pour $\sum x_i=28.1$, $\theta_0=2$, $n=10$ : 1.7 % / 5 % / 10.7 % ✔ / 89.3 % » et « Décision à 5 % ? » (on ne rejette pas ✔).
3. **Trouver l'erreur (Q3(c))** : présenter « $\mathrm{IC}_{95\%}=[56.2/34.17,\ 56.2/9.59]\approx[1.64,\ 5.79]$ » et demander quelle valeur est fausse (5.79 → 5.86). Variante **vrai/faux** : « La borne supérieure unilatérale utilise $q^{\chi^2(2n)}_{1-\alpha}$ » (Faux : $q_\alpha$) ; « Le test de $H_0:\theta\le\theta_0$ est le même que celui de $H_0:\theta=\theta_0$ » (Vrai, par croissance de la puissance).

### Exercice 2 — Modèle gaussien, test bilatéral et test de Student
1. **Étape suivante à choisir (Q1)** : « $\beta_c(\mu)=1-\mathbb{P}\big(\lvert\frac{\sqrt n}{\sigma}(\mu-\mu_0)+W\rvert\le c\big)$. Étape suivante ? » (a) $=1-\Phi(c)$ ; (b) $=1-\Phi(\frac{\sqrt n}{\sigma}(\mu_0-\mu)+c)+\Phi(\frac{\sqrt n}{\sigma}(\mu_0-\mu)-c)$ ✔ ; (c) $=2(1-\Phi(c))$ pour tout $\mu$.
2. **Associer** chaque quantité à sa loi sous $p_\theta\mathrm{dLeb}$ : $\sqrt n(\overline{X}_n-\mu)/\sigma$ ↔ $\mathcal{N}(0,1)$ ; $(n-1)S_n^2/\sigma^2$ ↔ $\chi^2(n-1)$ ; $\sqrt n(\overline{X}_n-\mu_0)/S_n$ ↔ Student décentrée, $n-1$ d.l., $\gamma=\sqrt n(\mu-\mu_0)/\sigma$ ; $\sqrt n(\overline{X}_n-\mu)/S_n$ ↔ Student centrée $n-1$ d.l. ; $T(Z)$ ($\sigma$ connue) ↔ $\lvert\mathcal{N}(\sqrt n(\mu-\mu_0)/\sigma,1)\rvert$.
3. **Preuve à ordonner (Q4)** : « $\overline{X}_n=\frac1n\mathbf{1}^T\Pi Z$, $S_n^2=\frac{1}{n-1}\lVert(I_n-\Pi)Z\rVert^2$ » → « $Z\sim\mathrm{N}_n(\mu\mathbf{1},\sigma^2I_n)$ » → « $(\Pi Z,(I_n-\Pi)Z)$ est un vecteur gaussien » → « covariance croisée $\sigma^2\Pi(I_n-\Pi)=0$ » → « décorrélation ⇒ indépendance (vecteur gaussien) » → « $\overline{X}_n\perp S_n^2$ ». **Vrai/faux** : « Le seuil $c_\alpha=\Phi^{-1}(1-\alpha)$ donne un test de niveau $\alpha$ » (Faux, taille $2\alpha$).

### Exercice 3 — IC pour la loi uniforme
1. **QCM** : « L'IC de longueur minimale de couverture $1-\alpha$ est : (a) $[X_{n:n}/(1-\alpha/2)^{1/n},\ X_{n:n}/(\alpha/2)^{1/n}]$ ; (b) $[X_{n:n},\ X_{n:n}\alpha^{-1/n}]$ ✔ ; (c) $[X_{n:n}\alpha^{1/n},\ X_{n:n}]$ ; (d) $[X_{n:n}(1-\alpha),\ X_{n:n}/(1-\alpha)]$. »
2. **Vrai/faux** : « La densité de $X_{n:n}/\theta$ est croissante sur $[0,1]$ » (V) ; « Prendre les quantiles $\alpha/2$ et $1-\alpha/2$ donne l'IC le plus court » (F) ; « $\theta\ge X_{n:n}$ presque sûrement » (V).
3. **Application numérique** : $n=10$, $\alpha=5\%$, $X_{10:10}=3$ : choisir l'IC parmi $[3;\ 4.05]$ ✔, $[2.22;\ 3]$, $[3;\ 3.15]$, $[2.9;\ 4.4]$ (avec $\alpha^{-1/10}\approx1.349$).

### Exercice 4 — Poisson, hypothèses simples
1. **Application numérique (Q2)** : « $F_{\mathcal{P}(10)}(14)\simeq0.917$, $F_{\mathcal{P}(10)}(15)\simeq0.951$. Seuil $c_{5\%}$ pour $\{T>c\}$ ? » (14 / 15 ✔ / 16) ; « Taille du test ? » (5 % / 4.9 % ✔ / 8.3 %).
2. **Vrai/faux** : « Ce test a une taille égale à son niveau » (F) ; « La puissance en $\theta=2$ vaut $\simeq0.84$ » (V) ; « Avec $T=13$, on prouve que $H_0$ est vraie » (F : risque de 2e espèce 15.7 %).
3. **Trouver l'erreur (Q4)** : « $T(Z)=18$, donc $p$-valeur $=\mathbb{P}(\mathcal{P}(10)>18)$ » → erreur d'une unité : c'est $\mathbb{P}(\mathcal{P}(10)>17)=\mathbb{P}(\mathcal{P}(10)\ge18)=0.0143$. **Associer** chaque échantillon à sa somme et sa $p$-valeur (18 ↔ 0.0143 ↔ rejet ; 13 ↔ 0.2084 ↔ non-rejet).

### Exercice 5 — Deux échantillons gaussiens
1. **QCM (Q2)** : « Le pivot pour $\mu_0-\mu_1$ suit : (a) $\mathcal{N}(0,1)$ ; (b) $t_{n+p-1}$ ; (c) $t_{n+p-2}$ ✔ ; (d) $\chi^2(n+p-2)$ » ; et « La variance poolée $S^2_{n,p}$ est normalisée par : $n+p$ / $n+p-1$ / $n+p-2$ ✔ ».
2. **Trouver l'erreur (Q5)** : présenter le raisonnement « $t^{1-\alpha/2}_{238}=0.01$ ⇒ $\alpha=1-0.5040=0.4960$ » et demander l'étape fausse (la bonne $p$-valeur bilatérale est $2(1-0.5040)\approx0.992$). Puis « Conclusion ? » : on ne rejette pas l'égalité des moyennes ✔.
3. **Preuve à ordonner (Q7, niveau du test de Fisher)** : « statistique $=\frac{\sigma_0^2}{\sigma_1^2}W$, $W\sim F(n-1,p-1)$ » → « $\mathbb{P}(W>\frac{\sigma_1^2}{\sigma_0^2}f^{1-\alpha})$ » → « $\sigma_1^2/\sigma_0^2\ge1$ sous $H_0$ » → « $\le\mathbb{P}(W>f^{1-\alpha})=\alpha$ » → « égalité si $\sigma_0^2=\sigma_1^2$ » → « taille $=\alpha$ ». **Associer** : rappel C ↔ Q2 ; rappel D ↔ Q6 ; dualité IC/test ↔ Q3.

### Exercice 6 — Vaccination
1. **Application numérique (Q3)** : à partir du tableau $\mathbb{P}_{p_0}(S_n>k)$, choisir $c_{0.05}$ (2 / 3 ✔ / 4) et $c_{0.01}$ (3 / 4 ✔ / 5), puis la décision pour $S_n=4$ à chaque niveau (rejet à 5 % ✔, non-rejet à 1 % ✔).
2. **QCM (Q4)** : « La $p$-valeur de l'observation $S_n=4$ est : $\mathbb{P}_{p_0}(S_n>4)=0.0032$ ; $\mathbb{P}_{p_0}(S_n>3)=0.0172$ ✔ ; $\mathbb{P}_{p_0}(S_n>2)=0.0748$ ; $\mathbb{P}_{p_0}(S_n\le4)=0.9968$. »
3. **Choix de $H_0$ (Q6, débat)** : « Du point de vue des plaignants (« supérieur à $\theta_0$ sauf preuve du contraire »), quelle hypothèse nulle ? » ($H_0:\theta\le\theta_0$ / $H_0:\theta\ge\theta_0$ ✔ selon §2.6.2) ; puis **associer** chaque formulation à sa région ($\{S_n>c\}$ / $\{S_n\le c\}$) et à sa $p$-valeur ($0.017$ / $0.9968$). **Vrai/faux** : « Le couplage montre que $p\mapsto\mathbb{P}_p(S_n>c)$ est croissante » (V).

### Exercice 7 — Wilcoxon
1. **Vrai/faux** : « Sous $H_0$, $R$ est uniforme sur $\mathcal{S}_N$ » (V) ; « Sous $H_0$, les $R_i$ sont indépendants » (F) ; « $\mathrm{Cov}_0(R_1,R_2)<0$ » (V) ; « La loi de $W_{n,m}$ sous $H_0$ dépend de $F_X$ » (F).
2. **Preuve à ordonner (Q3)** : « $\mathrm{Var}_0(W)=n\mathrm{Var}_0(R_1)+n(n-1)\mathrm{Cov}_0(R_1,R_2)$ » → « $\sum_{i=1}^NR_i=N(N+1)/2$ constante ⇒ variance nulle » → « $\mathrm{Cov}_0(R_1,R_2)=-\mathrm{Var}_0(R_1)/(N-1)$ » → « $\mathrm{Var}_0(W)=\frac{nm}{N-1}\mathrm{Var}_0(R_1)$ » → « $\mathrm{Var}_0(R_1)=(N^2-1)/12$ » → « $\mathrm{Var}_0(W)=nm(N+1)/12$ ».
3. **Application numérique** : $n=m=10$ : $\mathbb{E}_0[W]$ (100 / 105 ✔ / 110) et $\mathrm{Var}_0(W)$ (175 ✔ / 183.3 / 350) ; **trouver l'erreur** : « le test de Tchebychev rejette si $W$ sort de $[45.8;\ 164.2]$ ; or $W\in[55;155]$ : que conclure ? » (ce test ne rejette jamais à $n=m=10$, illustration du caractère conservateur).
