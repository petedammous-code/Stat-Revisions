# PC 9 — Inégalités de concentration et minimisation du risque empirique (erreur de validation, variables sous-gaussiennes, Hoeffding, Pisier, hyper-rectangles, *no free lunch*, classifieurs par hyperplan)

> **Sources extraites :** `S9_APM-41033-EP-PC9-enonce` (énoncé, 7 p., pages numérotées 1 à 7) et `S9_APM-41033-EP-PC9-corrige` (corrigé officiel, section « 1 Solutions », pages numérotées 8 à 20). Toutes les formules ont été vérifiées visuellement sur les deux PDF.
> **Convention de citation :** « Énoncé PC9, p. N » / « Corrigé PC9, p. N » pour la PC ; « Poly ch.9, Th. 1.5 », « Poly ch.9, Lemme 1.1 », « Poly ch.9, Outils Prop. 2.2 », « Poly ch.9, Compléments §4.6 »… pour le cours (numérotation de `content/extraction/ch9.md`) ; « Poly ch.8, Prop. 2.5 » etc. pour les chapitres antérieurs.
> **Code couleur du corrigé officiel :** certains passages du corrigé sont imprimés en **bleu** (rappels, mises en garde, remarques allant au-delà de la question). Ils sont signalés ci-dessous par *[Passage en bleu du corrigé]*.
> **Remarques de l'extracteur :** tout ajout qui ne figure pas dans le corrigé officiel (justification manquante, coquille signalée, application numérique) est explicitement marqué *[Extracteur]*.
> **Difficulté :** exercices 1 à 4 notés $(\star\star)$, exercices 5 à 7 notés $(\star\star\star)$ dans l'énoncé.
> **Attention (numérotation du corrigé de l'exercice 7) :** le corrigé de l'exercice 7 comporte 12 items mais **sa numérotation est décalée d'un cran à partir de l'item 7** : l'item 7 du corrigé esquisse la preuve du résultat *admis* dans l'énoncé ; les items 8 à 12 du corrigé répondent aux questions 7 à 11 de l'énoncé ; la question 12 de l'énoncé (borne en espérance) **n'a pas de corrigé**. Ci-dessous, on suit la numérotation de l'**énoncé** et on indique entre crochets le numéro d'item du corrigé.

---

## 0. Chapitres du poly mobilisés et rappels donnés en tête d'énoncé

### 0.1 Chapitres mobilisés

La PC 9 est la petite classe de la **semaine 9**, associée au **chapitre 9 « Approche discriminative et minimisation du risque empirique »**. Le poly ch.9, §1.5 « Le programme des exercices » (p. 25–26) décrit exactement ces sept exercices. Elle mobilise aussi des outils de chapitres antérieurs (ch.2 : Markov, Bienaymé-Tchebychev, Jensen ; ch.3 : dérivation sous l'intégrale ; ch.4 : Hoeffding admis et Chernoff ; ch.8 : cadre de la classification, classifieur bayésien, conditionnement par une variable indépendante).

| Exercice | Notions du ch.9 mobilisées | Notions des chapitres antérieurs |
|---|---|---|
| Exo 1 (erreur de validation) | Méthode 1.2 (sélection par validation), §1.2 p. 11 (borne $2e^{-2m\varepsilon^2}$ citée), Th. 1.3 / Corollaire 2.1 (Hoeffding), Outils §2.8 (risque d'une règle apprise = espérance conditionnelle « gelée ») | ch.8 Prop. 2.5 (conditionnement et indépendance) ; ch.2 Prop. 2.1 (Markov, Bienaymé-Tchebychev) ; loi binomiale |
| Exo 2 (sous-gaussiennes) | Outils Déf. 2.1 ($\mathcal G(v)$), Prop. 2.1 (borne de Chernoff), Prop. 2.2 (somme, déviations) | transformée de Laplace de la gaussienne ; ch.4 §5 (inégalités de Chernoff) |
| Exo 3 (lemme de Hoeffding) | Lemme 1.1 (lemme de Hoeffding) et sa démonstration (Outils §2.4, argument de Herbst, loi basculée $\widetilde{\mathbb P}_\lambda$), Th. 2.1 (Hoeffding, variables bornées) | ch.3 Prop. 2.2 (dérivation sous l'intégrale) ; Taylor-Lagrange ; variance = $\min_c\mathbb E[(Y-c)^2]$ |
| Exo 4 (Pisier) | Th. 1.7 (Pisier) et Compléments §4.4 ; remarque « $Z_j$ sous-gaussiennes de facteur $1/(4n)$ » ; Th. 1.8 (borne en espérance) ; Th. 1.2 (éq. (3)) ; Th. 1.5 (union + Hoeffding) ; Compléments §4.3 (histogramme, vote majoritaire) et Lemme 4.1 (intégration de la queue) | ch.2 Th. 2.2 (Jensen) ; ch.8 (classifieur bayésien, Th. 1.2) |
| Exo 5 (hyper-rectangles) | Th. 1.3 / Th. 1.4 (Hoeffding, forme « $\delta$ »), Outils §2.6 (borne de l'union), idée de réduction à une classe finie (comme Prop. 1.2) | statistiques d'ordre |
| Exo 6 (*no free lunch*) | Th. 1.1 (*no free lunch*) et sa démonstration (Compléments §4.1) | ch.8 (risque bayésien, classifieur bayésien) ; indépendance ; $(1-1/K)^n$ |
| Exo 7 (hyperplans) | Prop. 1.2 (classifieurs affines) et Compléments §4.6 (Lemme 4.2 admis) ; décomposition de type Th. 1.2 ; Hoeffding unilatéral (Th. 1.3) ; borne de l'union | ch.8 Prop. 2.5 (conditionnement) ; fonctions de répartition ; $\binom nd\le(en/d)^d$ |

**Renvoi obsolète.** Le corrigé (Exo 4, Q2a, p. 13) renvoie au « lemme d'Hoeffding (Polycopié **VI-3.8.**) » : c'est une ancienne numérotation. Dans le poly actuel, c'est le **Lemme 1.1 du ch.9** (démontré dans les Outils, §2.4).

### 0.2 Rappels et conventions donnés dans l'énoncé et le corrigé

L'énoncé n'a pas de bloc de rappels en tête de feuille ; les conventions sont données au fil des exercices :

- **Variable sous-gaussienne (Énoncé p. 1, Exo 2)** : une variable aléatoire **centrée** $X$ est dite sous-gaussienne avec un facteur de variance $v$ ($v>0$) si
$$\psi_X(\lambda):=\log\mathbb E[e^{\lambda X}]\le\frac{\lambda^2v}{2}\qquad\text{pour tout }\lambda\in\mathbb R.$$
On note $\mathcal G(v)$ la collection de telles variables. $\lambda\mapsto\mathbb E[e^{\lambda X}]$ est la **transformée de Laplace** de $X$ ; $\psi_X$ est la **fonction génératrice des cumulants**. La définition n'exige pas que la variance de $X$ soit égale à $v$, seulement qu'elle soit **bornée** par $v$. (= Poly ch.9, Outils Déf. 2.1.)
- **Transformée de Legendre (Énoncé p. 1, Exo 2 Q4)** : $\psi_Z^*(t):=\sup_{\lambda\ge0}(\lambda t-\psi_Z(\lambda))$.
- **Notation $a\vee b=\max(a,b)$** (Énoncé p. 2, Exo 2 Q5).
- **Loi basculée (Énoncé p. 2, Exo 3 Q2)** : pour $\lambda\in\mathbb R$,
$$\mu_\lambda(\mathrm dx):=\frac{e^{\lambda x}\mu(\mathrm dx)}{\int e^{\lambda u}\mu(\mathrm du)}=\frac{e^{\lambda x}\mu(\mathrm dx)}{\mathbb E[\exp(\lambda X)]},\qquad\mu_0=\mu.$$
- **Transformée de Laplace gaussienne (Énoncé p. 3, Exo 4)** : « On remarquera que lorsque $Z\sim\mathcal N(0,\sigma^2)$, on a $\mathbb E[e^{\lambda Z}]=e^{\lambda^2\sigma^2/2}$ pour tout $\lambda\in\mathbb R$. »
- **Risque et risque empirique (Énoncé p. 3, Exo 4)** :
$$R(g):=\mathbb P(g(X)\ne Y),\qquad R_n(g):=\frac1n\sum_{i=1}^n\mathbb 1_{\{g(X_i)\ne Y_i\}}.$$
- **Rappel sur le conditionnement (Corrigé p. 8, en tête de la solution de l'Exo 1)** *[Passage en bleu du corrigé]* : pour toute paire de v.a. $(X,Y)$,
$$\mathbb E[\phi(X,Y)]=\mathbb E\big[\mathbb E[\phi(X,Y)\mid Y]\big]=\mathbb E[\Psi(Y)],\qquad\Psi(Y):=\mathbb E[\phi(X,Y)\mid Y].$$
Si la loi du couple est de la forme $p(x,y)\,\mathrm d\mu(x)\,\mathrm d\nu(y)$ :
$$\mathbb E[\phi(X,Y)]=\int_{\mathsf X\times\mathsf Y}\phi(x,y)\,p(x,y)\,\mathrm d\mu(x)\,\mathrm d\nu(y),\qquad\Psi(y)=\int_{\mathsf X}\phi(x,y)\frac{p(x,y)}{p_Y(y)}\mathrm d\mu(x),\quad p_Y(y):=\int_{\mathsf X}p(u,y)\,\mathrm d\mu(u),$$
(intégration en $x$ sous la loi conditionnelle de $X$ sachant $Y$), et donc $\mathbb E[\phi(X,Y)]=\int_{\mathsf Y}\Psi(y)\,p_Y(y)\,\mathrm d\nu(y)$. Lorsque $X,Y$ sont **indépendantes**, la loi conditionnelle de $X$ sachant $Y$ est la loi de $X$ :
$$\Psi(y)=\int_{\mathsf X}\phi(x,y)\,p_X(x)\,\mathrm d\mu(x),\qquad p_X(x):=\int_{\mathsf Y}p(x,y)\,\mathrm d\nu(y).$$
Par suite, dans le cas indépendant, conditionner par rapport à $Y$ s'interprète comme **(a) « geler » la variable $Y$** et intégrer en $x$ sous la loi de $X$ ; **(b) puis intégrer** en $y$ sous la loi de $Y$. (C'est le contenu de Poly ch.8, Prop. 2.5, rappelé dans Poly ch.9, Outils §2.8.)

### 0.3 Notations propres à la PC (à reproduire telles quelles)

| Notation | Signification | Où |
|---|---|---|
| $D_n=\{(X_i,Y_i)\}_{i=1}^n$ (D **italique**, pas calligraphique) | ensemble d'apprentissage (le poly écrit $\mathcal D_n$) | Exo 1, 4, 6 |
| $T_m=\{(X_{n+i},Y_{n+i})\}_{i=1}^m$ | ensemble de test | Exo 1 |
| $R(g_n):=\mathbb P(g_n(X)\ne Y\mid D_n)$ | risque (conditionnel) de la règle apprise | Exo 1 |
| $\hat R_{n,m}$ (petit chapeau, R italique) | erreur de validation / de test | Exo 1 |
| $\mathrm{Bin}(m,p)$, $\mathcal L(\cdot\mid D_n)$ | loi binomiale ; loi conditionnelle | Exo 1 (corrigé) |
| $\mathcal G(v)$, $\psi_X$, $\psi_Z^*$ | sous-gaussiennes de facteur $v$ ; cumulants ; transformée de Legendre (sup sur $\lambda\ge0$ seulement) | Exo 2, 3 |
| $\mu$, $m:=\mathbb E[X]=\int x\mu(\mathrm dx)$, $\mu_\lambda$ | loi de $X$ à support $[a,b]$, sa moyenne, loi basculée (le poly écrit $\widetilde{\mathbb P}_\lambda$) | Exo 3 |
| $S_n:=\sum_{k=1}^nZ_k$, $D_n:=\sum_{k=1}^n(b_k-a_k)^2$ | somme **non centrée** (≠ $S_n$ centrée du poly, Th. 2.1) ; **collision** : $D_n$ désigne ici un nombre, pas l'échantillon | Exo 3 |
| $R_n(g)$ (**sans chapeau**) | risque empirique (le poly écrit $\widehat{\mathrm R}_n(g)$) | Exo 4 |
| $\hat g^*_{n,\mathcal C}$ ; $g^\star_{\mathcal C}$ (étoile pleine dans l'énoncé) | MRE sur $\mathcal C$ ; oracle de la classe (le poly écrit $g^*_{\mathcal C}$ avec astérisque ; le corrigé mélange $g^\star_{\mathcal C}$, $g^*_{\mathcal C}$ et même $g^\star_*$) | Exo 4 |
| $\hat g^*_n$ (énoncé), $g^*_n$ (corrigé) ; $R^\star$ / $R^*$ ; $g^*$ | MRE sur toutes les règles quand $\mathsf X$ est fini ; risque bayésien ; classifieur bayésien | Exo 4 Q3–Q4 |
| $\mathsf X$ (sans-serif) ; $K$ | ensemble des attributs ; son cardinal (Exo 4) ou nombre de points (Exo 6) | Exo 4, 6 |
| $\mathsf P=\{\mathbf x_1,\dots,\mathbf x_n\}$, $\mathsf R$, $\mathsf S=(X_1,\dots,X_k)$ (sans-serif) ; $\lvert\mathsf P\rvert$ ; $\mathsf P\cap\mathsf R$ | ensemble de points (comptés avec multiplicité), hyper-rectangle, sous-échantillon ; cardinal ; points de $\mathsf P$ dans $\mathsf R$ | Exo 5 |
| $\mathcal R$, $\mathcal R_{\mathsf S}$ ; $x^{(j)}_{1:n}\le\dots\le x^{(j)}_{n:n}$ | hyper-rectangles de $\mathbb R^d$ ; rectangles à sommets sur l'échantillon ordonné ; statistiques d'ordre de la $j$-ème coordonnée | Exo 5 |
| $\mathcal X$ ; $\mathcal X\otimes\mathcal P(\{0,1\})$ | tribu sur $\mathsf X$ (contient les singletons) ; tribu produit | Exo 6 |
| $\mathbf q=(q_1,\dots,q_K)\in\{0,1\}^K$ (gras), $\mathbb P_{\mathbf q}$, $\mathbb P_{n,\mathbf q}$, $\mathbb E_{n,\mathbf q}$, $\mathbb E_{\mathbf q}$, $g_{\mathbf q}$, $\delta_{q_j,y_j}$ | étiquetage, lois associées, classifieur parfait, symbole de Kronecker (le poly §4.1 écrit $\mathbf b\in\{-1,1\}^K$, $\mathbb P_{\mathbf b}$) | Exo 6 |
| $R^*_{\mathbb P}:=\inf_{g:\mathsf X\to\{0,1\}}\mathbb P(g(X)\ne Y)$ ; $g_n(x;D_n)$ | risque bayésien sous $\mathbb P$ ; règle de classification | Exo 6 |
| $\mathbf X\in\mathbb R^d$ (gras), $f_i$, $p=\mathbb P(Y=1)$, $\mathrm{Leb}$ | attribut, densités conditionnelles, proportion, mesure de Lebesgue | Exo 7 |
| $g_{\mathbf a,b}(\mathbf x)=\mathbb 1_{\{\mathbf a^\top\mathbf x+b\ge0\}}$ | classifieur par hyperplan, labels dans $\{0,1\}$ (le poly Prop. 1.2 utilise $2\mathbb 1_{\{\cdot\}}-1$, labels $\pm1$) | Exo 7 |
| $\widehat{\mathrm R}_n(g)$ (R **droit**, chapeau large) | risque empirique | Exo 7 |
| $L^\star=\inf_{g\in\mathcal C}R(g)$, $g^\star$, $L^\star=L(g^\star)$ ; puis $R^\star$ | minimum du risque sur $\mathcal C$, classifieur l'atteignant ; **attention**, l'énoncé passe ensuite à $R^\star$ (voir pièges de l'Exo 7) | Exo 7 |
| $F_{i,\mathbf a}(z)=\mathbb P(\mathbf a^\top\mathbf X\le z\mid Y=i)$ | f.d.r. conditionnelle de la projection | Exo 7 |
| $\Pi_{\mathbf z_{1d}}=\Pi_{\mathbf z_1,\dots,\mathbf z_d}$, $i_{1d}=(i_1,\dots,i_d)$, $\Pi_{i_{1d}}=\Pi_{\mathbf X_{i_1},\dots,\mathbf X_{i_d}}$ | projecteur affine orthogonal sur le sous-espace affine engendré | Exo 7 |
| $\hat g_{n,i_{1d},z}$, $\mathcal C_n$, $\hat g_n^\star$ | classifieur passant par $d$ points, classe finie associée, MRE sur $\mathcal C_n$ | Exo 7 |
| $e$ | le poly et la PC écrivent $\mathrm e$ (droit) ; on écrit $e$ | partout |
| $\log$ / $\ln$ | logarithme népérien (les deux graphies coexistent dans l'énoncé et le corrigé) | partout |

---

## 1. Exercices

### Exercice 1 — Erreur de validation $(\star\star)$

**Source :** Énoncé PC9, p. 1 ; Corrigé PC9, p. 8–9. Poly ch.9, §1.5 et §1.2 (Méthode 1.2), Outils §2.8.

**Énoncé complet**

Nous cherchons à estimer l'erreur
$$R(g_n):=\mathbb P(g_n(X)\ne Y\mid D_n)$$
d'une règle de classification $g_n$ calculée à partir d'un ensemble d'apprentissage $D_n=\{(X_i,Y_i)\}_{i=1}^n$ indépendant de $(X,Y)$.

Nous disposons pour cela d'un ensemble de test $T_m=\{(X_{n+i},Y_{n+i})\}_{i=1}^m$ de $m$ variables aléatoires indépendantes, indépendantes de $D_n$ et distribuées suivant la loi du couple $(X,Y)$. Nous notons
$$\hat R_{n,m}:=\frac1m\sum_{j=1}^m\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}.$$

1. Montrer que
$$\mathbb E\big[\hat R_{n,m}\,\big|\,D_n\big]=R(g_n).$$
2. Quelle est la distribution conditionnelle de $m\hat R_{n,m}$ sachant $D_n$ ?
3. Montrer que
$$\mathbb E\Big[(\hat R_{n,m}-R(g_n))^2\,\Big|\,D_n\Big]=\frac{R(g_n)(1-R(g_n))}{m},$$
et en déduire une majoration de $\mathbb P(|\hat R_{n,m}-R(g_n)|\ge\varepsilon)$ pour tout $\varepsilon>0$. *On pourra utiliser la majoration $p(1-p)\le1/4$ pour tout $p\in[0,1]$.*
4. En utilisant une inégalité exponentielle, montrer que pour tout $\varepsilon>0$,
$$\mathbb P(|\hat R_{n,m}-R(g_n)|\ge\varepsilon)\le2e^{-2m\varepsilon^2}.$$

**Corrigé complet question par question**

*Rappel préliminaire* : voir §0.2 (conditionnement par une variable indépendante = « geler » puis intégrer) *[Passage en bleu du corrigé]*.

**Q1.**
1. **Par linéarité de l'espérance (conditionnelle)** :
$$\mathbb E\big[\hat R_{n,m}\,\big|\,D_n\big]=\frac1m\sum_{j=1}^m\mathbb E\Big[\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}\,\Big|\,D_n\Big].$$
2. La fonction aléatoire $g_n$ dépend des données $D_n$, et les v.a. $\{(X_{n+j},Y_{n+j})\}_j$ sont **indépendantes de $D_n$** ; d'après le rappel (cas indépendant ; Poly ch.8, Prop. 2.5) :
$$\mathbb E\Big[\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}\,\Big|\,D_n\Big]=\mathbb P(g(X_{n+j})\ne Y_{n+j})\big|_{g=g_n}.$$
3. Comme les $\{(X_{n+j},Y_{n+j})\}_j$ ont **même loi que $(X,Y)$**, pour tout $j\ge1$ : $\mathbb P(g(X_{n+j})\ne Y_{n+j})=\mathbb P(g(X)\ne Y)=R(g)$.
4. Ainsi, pour tout $j\ge1$, $\mathbb E[\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}\mid D_n]=R(g_n)$, d'où, pour tous $n,m$,
$$\mathbb E\big[\hat R_{n,m}\,\big|\,D_n\big]=R(g_n).$$

**Q2.** $m\hat R_{n,m}$ est la somme des v.a. $\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}$, $j=1,\dots,m$.
*[Passage en bleu du corrigé]* **Attention** : il y a **deux sources d'aléa**, l'une via les données d'apprentissage au travers de $g_n$, l'autre via les données de test au travers des $\{(X_{n+j},Y_{n+j})\}_j$. Puisque les données de test et d'apprentissage sont indépendantes, conditionner par $D_n$ permet de « geler » l'aléa contenu dans $g_n$ (et de le voir comme une fonction déterministe), puis de faire tous les calculs d'espérance par rapport à la loi des données de test uniquement.
Ces variables sont, **conditionnellement à $D_n$, indépendantes et de même loi de Bernoulli de paramètre $R(g_n)$** (par Q1), donc
$$\mathcal L(m\hat R_{n,m}\mid D_n)=\mathrm{Bin}(m,R(g_n)).$$

**Q3.**
1. De Q2 (variance d'une binomiale $\mathrm{Bin}(m,p)$ : $mp(1-p)$) et de Q1 ($\hat R_{n,m}$ est conditionnellement centré en $R(g_n)$) :
$$\mathbb E\Big[(\hat R_{n,m}-R(g_n))^2\,\Big|\,D_n\Big]=\frac1{m^2}\mathrm{Var}\big(m\hat R_{n,m}\mid D_n\big)=\frac{R(g_n)(1-R(g_n))}{m}\le\frac1{4m}\quad(\text{car }p(1-p)\le1/4).$$
2. **Tour des espérances** : $\mathbb E[(\hat R_{n,m}-R(g_n))^2]=\mathbb E\big[\mathbb E[(\hat R_{n,m}-R(g_n))^2\mid D_n]\big]$, d'où
$$\mathbb E\big[(\hat R_{n,m}-R(g_n))^2\big]\le\frac1{4m}.$$
3. **Inégalité de Markov** (appliquée à $(\hat R_{n,m}-R(g_n))^2$ au seuil $\varepsilon^2$, i.e. Bienaymé-Tchebychev) :
$$\mathbb P(|\hat R_{n,m}-R(g_n)|\ge\varepsilon)\le\frac1{4m\varepsilon^2}.$$

**Q4.**
1. Les v.a. $\{\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}-R(g_n)\}_{j=1}^m$ sont, **conditionnellement à $D_n$**, indépendantes à valeurs dans $[-R(g_n),1-R(g_n)]$ ; la **taille de cet intervalle vaut 1**.
2. **Inégalité de Hoeffding** (Poly ch.9, Th. 2.1 avec $D_n=m$, ou Th. 1.3) appliquée conditionnellement à $D_n$, puis **tour des espérances** : pour tout $\varepsilon>0$,
$$\mathbb P\Big(\frac1m\sum_{j=1}^m(\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}-R(g_n))>\varepsilon\Big)=\mathbb E\Big[\mathbb P\Big(\sum_{j=1}^m(\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}-R(g_n))>m\varepsilon\,\Big|\,D_n\Big)\Big]\le\mathbb E\big[e^{-2m\varepsilon^2}\big]=e^{-2m\varepsilon^2}.$$
3. Même raisonnement appliqué aux variables $R(g_n)-\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}$ :
$$\mathbb P\Big(\frac1m\sum_{j=1}^m(\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}-R(g_n))<-\varepsilon\Big)\le e^{-2m\varepsilon^2}.$$
4. **Borne d'union** : $\mathbb P(|Z|\ge\varepsilon)=\mathbb P(Z\ge\varepsilon)+\mathbb P(Z\le-\varepsilon)$, d'où $\mathbb P(|\hat R_{n,m}-R(g_n)|\ge\varepsilon)\le2e^{-2m\varepsilon^2}$.

*[Extracteur]* Le corrigé écrit les déviations avec $>\varepsilon$ / $<-\varepsilon$ puis conclut avec $\ge$ : Hoeffding est valable avec inégalités larges (Th. 2.1), ce qui couvre le cas $\ge$.

**Méthodes mobilisées**
- Conditionnement par une variable indépendante : « geler » $D_n$ (Poly ch.8, Prop. 2.5 ; Poly ch.9, Outils §2.8).
- Linéarité de l'espérance conditionnelle ; identification d'une loi binomiale conditionnelle.
- Variance de la binomiale ; majoration $p(1-p)\le1/4$.
- Tour des espérances ($\mathbb E[\mathbb E[\cdot\mid D_n]]$).
- Inégalité de Markov sur le carré (= Bienaymé-Tchebychev).
- Inégalité de Hoeffding conditionnelle (variables dans un intervalle de longueur 1) puis intégration ; borne d'union pour la version bilatérale.

**Pièges relevés / remarques du corrigé**
- Deux sources d'aléa ($g_n$ et l'échantillon de test) ; il faut conditionner par $D_n$ pour figer $g_n$ (remarque en bleu du corrigé).
- $\hat R_{n,m}$ est un estimateur **sans biais conditionnellement** de $R(g_n)$, contrairement au risque empirique d'apprentissage du MRE (Poly ch.9, Prop. 1.1, biais optimiste) : c'est l'indépendance test/apprentissage qui fait tout.
- Les centrages $\mathbb 1-R(g_n)$ vivent dans $[-R(g_n),1-R(g_n)]$ : la longueur (1) compte, pas la position.
- *[Extracteur]* Coquille du corrigé (p. 9) : « variables $R_n-\mathbb 1_{\{\dots\}}$ » doit se lire $R(g_n)-\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}$.
- La borne de Q3 est polynomiale en $m$ ($1/m$), celle de Q4 exponentielle : à précision et confiance fixées, Hoeffding demande beaucoup moins de points de test.

**Résultats numériques** *[Extracteur — applications numériques]*
- $\varepsilon=0{,}05$, $m=1000$ : Bienaymé-Tchebychev $1/(4m\varepsilon^2)=0{,}1$ ; Hoeffding $2e^{-5}\approx0{,}0135$.
- $\varepsilon=0{,}05$, $m=2000$ : BT $0{,}05$ ; Hoeffding $2e^{-10}\approx9{,}1\times10^{-5}$.
- Pour garantir $\mathbb P(|\hat R_{n,m}-R(g_n)|\ge0{,}05)\le0{,}05$ : BT exige $m\ge1/(4\cdot0{,}05\cdot0{,}05^2)=2000$ ; Hoeffding exige $m\ge\ln(2/0{,}05)/(2\cdot0{,}05^2)\approx737{,}8$, soit $m\ge738$.

---

### Exercice 2 — Variables sous-gaussiennes $(\star\star)$

**Source :** Énoncé PC9, p. 1–2 ; Corrigé PC9, p. 9–11. Poly ch.9, Outils Déf. 2.1, Prop. 2.1, Prop. 2.2.

**Énoncé complet**

Une variable aléatoire centrée $X$ est dite *sous-gaussienne* avec un facteur de variance $v$ ($v>0$) si
$$\psi_X(\lambda):=\log\mathbb E[e^{\lambda X}]\le\frac{\lambda^2v}2\qquad\text{pour tout}\quad\lambda\in\mathbb R.$$
Nous notons $\mathcal G(v)$ la collection de telles variables aléatoires. La fonction $\lambda\mapsto\mathbb E[e^{\lambda X}]$ est la *transformée de Laplace* de la v.a. $X$ ; et $\psi_X$ est la *fonction génératrice des cumulants*. Notons que cette définition n'exige pas que la variance de $X$ soit égale à $v$ mais simplement qu'elle soit bornée par $v$.

1. Soit $X$ une variable aléatoire gaussienne centrée de variance $v$. Montrer que $X\in\mathcal G(v)$.
2. Soit $X$ une variable de *Rademacher* : $X\in\{-1,+1\}$, $\mathbb P(X=1)=\mathbb P(X=-1)=1/2$. Montrer que $X\in\mathcal G(1)$.
3. Supposons que $X_1,\dots,X_n$ sont des variables aléatoires indépendantes et pour tout $i\in\{1,\dots,n\}$, $X_i\in\mathcal G(v_i)$. Montrer que $\sum_{i=1}^nX_i\in\mathcal G\big(\sum_{i=1}^nv_i\big)$.
4. **(inégalité de Chernoff)** Montrer que pour tout $t\ge0$,
$$\mathbb P(Z\ge t)\le\exp(-\psi_Z^*(t)),\qquad\text{où}\quad\psi_Z^*(t):=\sup_{\lambda\ge0}(\lambda t-\psi_Z(\lambda)).$$
La fonction $t\mapsto\psi_Z^*(t)$ est la *transformée de Legendre* de $\psi_Z$.
5. Montrer que si $X\in\mathcal G(v)$, alors pour tout $t>0$,
$$\mathbb P(X>t)\vee\mathbb P(-X>t)\le e^{-t^2/(2v)}$$
où $a\vee b=\max(a,b)$. *On pourra commencer par prouver que $\mathbb P(X>t)\le e^{-t^2/(2v)}$ ; puis observer que l'on a le même majorant pour $\mathbb P(-X>t)$.*

**Corrigé complet question par question**

**Q1.** La transformée de Laplace d'une gaussienne centrée de variance $\sigma^2$ est $\exp(\lambda^2\sigma^2/2)$, donc $\ln\mathbb E[\exp(\lambda X)]=\frac{\lambda^2}2\sigma^2$ (avec $\sigma^2=v$ : égalité dans la définition, donc $X\in\mathcal G(v)$). Calcul par **complétion du carré** :
$$\begin{aligned}\mathbb E[\exp(\lambda X)]&=\int\exp(\lambda x)\frac1{\sigma\sqrt{2\pi}}\exp\Big(-\frac{x^2}{2\sigma^2}\Big)\mathrm dx=\frac1{\sigma\sqrt{2\pi}}\int\exp\Big(-\frac1{2\sigma^2}(x^2-2\lambda\sigma^2x)\Big)\mathrm dx\\&=\frac1{\sigma\sqrt{2\pi}}\exp\Big(\frac{\lambda^2\sigma^2}2\Big)\int\exp\Big(-\frac1{2\sigma^2}(x-\lambda\sigma^2)^2\Big)\mathrm dx=\exp\Big(\frac{\lambda^2\sigma^2}2\Big)\times1,\end{aligned}$$
la dernière intégrale (normalisée) valant 1 comme intégrale de la densité de $\mathcal N(\lambda\sigma^2,\sigma^2)$.

**Q2.** $\mathbb E[\exp(\lambda X)]=\frac12\{e^\lambda+e^{-\lambda}\}$. **Développement en série** $\exp(u)=\sum_{k\ge0}u^k/k!$ :
$$\mathbb E\big[e^{\lambda X}\big]=\frac12\big\{e^{-\lambda}+e^{\lambda}\big\}=\frac12\Big\{\sum_{k=0}^\infty\frac{(-\lambda)^k}{k!}+\sum_{k=0}^\infty\frac{\lambda^k}{k!}\Big\}=\sum_{k\ge0,\ k\text{ paire}}\frac{\lambda^k}{k!}=\sum_{q=0}^\infty\frac{\lambda^{2q}}{(2q)!}\le1+\sum_{k=1}^\infty\frac{\lambda^{2k}}{2^kk!}=e^{\lambda^2/2}.$$
L'inégalité résulte de ce que, pour $q\ge1$,
$$(2q)!=1\times2\times\cdots\times(2q-2)(2q-1)2q\ge2\times4\times\cdots\times2(q-1)\,2q=2^qq!.$$
On en déduit $\ln\mathbb E[e^{\lambda X}]\le\lambda^2/2$, i.e. $X\in\mathcal G(1)$ ($X$ est bien centrée).

**Q3.** **Par indépendance** des $X_i$ (l'espérance d'un produit de v.a. indépendantes positives est le produit des espérances) :
$$\mathbb E\Big[e^{\lambda\sum_{i=1}^nX_i}\Big]=\prod_{i=1}^n\mathbb E\big[e^{\lambda X_i}\big],$$
ce qui entraîne $\psi_{\sum_{i=1}^nX_i}(\lambda)=\sum_{i=1}^n\psi_{X_i}(\lambda)\le\frac{\lambda^2}2\sum_{i=1}^nv_i$. On en déduit le résultat (une somme de variables centrées est centrée).

**Q4.** Soit $Z$ une v.a. réelle. Pour $\lambda\ge0$, l'**inégalité de Markov** (appliquée à $e^{\lambda Z}$, $t\mapsto e^{\lambda t}$ étant croissante) implique
$$\mathbb P(Z\ge t)\le e^{-\lambda t}\mathbb E[e^{\lambda Z}]=\exp(-\lambda t+\psi_Z(\lambda)).$$
Cette inégalité étant valable pour tout $\lambda\ge0$, elle l'est pour la **valeur minimale en $\lambda$** :
$$\mathbb P(Z\ge t)\le\inf_{\lambda\ge0}\exp(-\lambda t+\psi_Z(\lambda))=\exp\Big(-\sup_{\lambda\ge0}\{\lambda t-\psi_Z(\lambda)\}\Big).$$

**Q5.**
1. Si $Z$ est sous-gaussienne, $\psi_Z(\lambda)\le\lambda^2v/2$, donc par Q4
$$\mathbb P(Z\ge t)\le\exp\Big(-\sup_{\lambda\ge0}\{\lambda t-\lambda^2v/2\}\Big).$$
2. **Optimisation du trinôme** $\lambda\mapsto\lambda t-\lambda^2v/2$ : maximum au point $\lambda_\star:=t/v$ ($\ge0$), de valeur $t^2/(2v)$. D'où $\mathbb P(Z\ge t)\le\exp(-t^2/(2v))$ (et a fortiori $\mathbb P(Z>t)$).
3. Si $Z$ est sous-gaussienne, **$-Z$ l'est aussi**, d'où $\mathbb P(-Z\ge t)\le\exp(-t^2/(2v))$. Les deux probabilités admettent le même majorant, donc leur maximum aussi.

*[Extracteur]* Justification de « $-Z$ l'est aussi » (non écrite dans le corrigé) : $\psi_{-Z}(\lambda)=\psi_Z(-\lambda)\le(-\lambda)^2v/2=\lambda^2v/2$ ; c'est ici qu'est utilisé le « pour tout $\lambda\in\mathbb R$ » (deux signes) de la définition (cf. Poly ch.9, Outils Prop. 2.2, étape 3).

**Méthodes mobilisées**
- Calcul de transformée de Laplace gaussienne par complétion du carré.
- Développement en série entière de l'exponentielle ; comparaison $(2q)!\ge2^qq!$.
- Indépendance ⇒ transformée de Laplace d'une somme = produit ⇒ cumulants additifs.
- Borne de Chernoff : Markov sur $e^{\lambda Z}$ + optimisation en $\lambda\ge0$ (transformée de Legendre).
- Optimisation d'un trinôme du second degré en $\lambda$ ; symétrie $X\leftrightarrow-X$.

**Pièges relevés / remarques du corrigé**
- La définition de $\mathcal G(v)$ exige que $X$ soit **centrée** et l'inégalité **pour tout $\lambda\in\mathbb R$** ; la variance de $X$ est seulement majorée par $v$ (Rademacher : variance $1=v$ ; gaussienne : égalité).
- Dans Chernoff (Q4), le sup ne porte que sur $\lambda\ge0$ (sinon Markov ne s'applique pas dans le bon sens).
- *[Extracteur]* Coquilles du corrigé : p. 10, « $\ln PE[e^{\lambda X}]$ » doit se lire $\ln\mathbb E[e^{\lambda X}]$ ; p. 10, « $\psi_Z(\lambda)\le\lambda^2/2v$ » et « $\sup_{\lambda\ge0}\{\lambda t-\lambda^2/2v\}$ » doivent se lire $\lambda^2v/2$ (c'est bien $\lambda t-\lambda^2v/2$ qui est optimisé ensuite).

**Résultats numériques** *[Extracteur]*
- Rademacher : $\cosh(1)\approx1{,}543\le e^{1/2}\approx1{,}649$ ; $\cosh(2)\approx3{,}762\le e^{2}\approx7{,}389$.
- $X\in\mathcal G(v)$ : $\mathbb P(X>t)\le e^{-t^2/(2v)}$ ; pour $v=1$, $t=3$ : $e^{-4{,}5}\approx0{,}011$.

---

### Exercice 3 — Lemme d'Hoeffding $(\star\star)$

**Source :** Énoncé PC9, p. 2 ; Corrigé PC9, p. 11–12. Poly ch.9, Lemme 1.1, Outils §2.4 (démonstration par l'argument de Herbst), Th. 2.1.

**Énoncé complet**

Soit $X$ une variable aléatoire de loi $\mu$ à support $[a,b]$ i.e. $\mu([a,b])=1$. On note $m:=\mathbb E[X]=\int x\mu(\mathrm dx)$ son espérance. L'objectif des questions 2 à 5 est de montrer que pour tout $\lambda\in\mathbb R$,
$$\psi_X(\lambda)\le\lambda m+\frac{\lambda^2}8(b-a)^2,\qquad\text{où}\quad\psi_X(\lambda):=\log\int\exp(\lambda x)\mu(\mathrm dx).\tag{1}$$

1. Soit $Z_1,\dots,Z_n$, $n$ variables aléatoires indépendantes. Supposons que pour tout $1\le k\le n$, il existe $a_k<b_k$ tels que $\mathbb P(Z_k\in[a_k,b_k])=1$. Posons $S_n:=\sum_{k=1}^nZ_k$. En utilisant les questions 3 et 5 de l'exercice 2, et la relation (1), montrer que pour tout $t\ge0$
$$\mathbb P(S_n-\mathbb E[S_n]\ge t)\le\exp\Big(-\frac{2t^2}{D_n}\Big),\qquad\mathbb P(S_n-\mathbb E[S_n]\le-t)\le\exp\Big(-\frac{2t^2}{D_n}\Big)$$
où $D_n:=\sum_{k=1}^n(b_k-a_k)^2$.

Nous allons maintenant établir (1).

2. Pour tout $\lambda\in\mathbb R$ nous définissons la *loi de probabilité* $\mu_\lambda$ par
$$\mu_\lambda(\mathrm dx):=\frac{e^{\lambda x}\mu(\mathrm dx)}{\int e^{\lambda u}\mu(\mathrm du)}=\frac{e^{\lambda x}\mu(\mathrm dx)}{\mathbb E[\exp(\lambda X)]}.$$
Notons que $\mu_0=\mu$. Montrer que pour tout $\lambda\in\mathbb R$,
$$\psi_X'(\lambda)=\int x\mu_\lambda(\mathrm dx),\qquad\psi_X''(\lambda)=\int(x-\psi_X'(\lambda))^2\mu_\lambda(\mathrm dx).$$
3. En déduire que pour tout $\lambda\in\mathbb R$,
$$\psi_X(\lambda)\le\lambda\mathbb E[X]+\frac{\lambda^2}2\sup_{u\in\mathbb R}\psi_X''(u).$$
4. Il ne reste qu'à montrer que $\sup_{\lambda\in\mathbb R}\psi_X''(\lambda)\le(b-a)^2/4$. Soit $\lambda\in\mathbb R$ et $Y\sim\mu_\lambda$. En remarquant que
$$\mathbb E[Y]=\operatorname{argmin}_{c\in\mathbb R}\mathbb E\big[(Y-c)^2\big],\qquad\mathrm{Var}(Y)=\min_{c\in\mathbb R}\mathbb E\big[(Y-c)^2\big],$$
montrer que
$$\mathrm{Var}(Y)\le\mathbb E\Big[\Big(Y-\frac{a+b}2\Big)^2\Big]\le\frac{(b-a)^2}4.$$
En déduire que $\sup_{u\in\mathbb R}\psi_X''(u)\le(b-a)^2/4$.
5. Conclure.

**Corrigé complet question par question**

**Q1.**
1. On écrit
$$S_n-\mathbb E[S_n]=\sum_{i=1}^n(Z_i-\mathbb E[Z_i])=\sum_{i=1}^nX_i,\qquad X_i:=Z_i-\mathbb E[Z_i].$$
2. Les $(X_i)_{1\le i\le n}$ sont **centrées et indépendantes**. $\mathbb P(Z_i\in[a_i,b_i])=1$ entraîne $\mathbb P(X_i\in[a_i-\mathbb E[Z_i],b_i-\mathbb E[Z_i]])=1$ (intervalle de même longueur $b_i-a_i$). On peut donc appliquer (1) (avec $m=0$) :
$$\psi_{X_i}(\lambda)\le\lambda\times0+\frac{\lambda^2}2\frac{(b_i-a_i)^2}4,$$
dont on déduit $X_i\in\mathcal G((b_i-a_i)^2/4)$.
3. **Exercice 2, Q3** (somme de sous-gaussiennes indépendantes) :
$$S_n-\mathbb E[S_n]\in\mathcal G\Big(\sum_{i=1}^n(b_i-a_i)^2/4\Big)=\mathcal G(D_n/4).$$
4. On conclut par **l'exercice 2, Q5** : $\exp(-t^2/(2\cdot D_n/4))=\exp(-2t^2/D_n)$, pour la déviation supérieure et (par symétrie) inférieure.

**Q2.** La dérivée de $\lambda\mapsto\ln\phi(\lambda)$ est $\phi'(\lambda)/\phi(\lambda)$. Puisque la dérivée de $\lambda\mapsto\mathbb E[\exp(\lambda X)]$ vaut $\mathbb E[X\exp(\lambda X)]$ :
$$\psi_X'(\lambda)=\frac{\mathbb E[X\exp(\lambda X)]}{\mathbb E[\exp(\lambda X)]}=\int x\frac{\exp(\lambda x)\mu(\mathrm dx)}{\mathbb E[\exp(\lambda X)]}=\int x\mu_\lambda(\mathrm dx).$$
De même (dérivée d'un quotient),
$$\psi_X''(\lambda)=\frac{\mathbb E[X^2\exp(\lambda X)]\,\mathbb E[\exp(\lambda X)]-(\mathbb E[X\exp(\lambda X)])^2}{(\mathbb E[\exp(\lambda X)])^2}=\int x^2\mu_\lambda(\mathrm dx)-\Big(\int x\mu_\lambda(\mathrm dx)\Big)^2.$$
*[Passage en bleu du corrigé]* La dérivée seconde $\psi_X''(\lambda)$ s'interprète comme **la variance d'une v.a. de loi $\mu_\lambda$** (ce qui est la forme demandée $\int(x-\psi_X'(\lambda))^2\mu_\lambda(\mathrm dx)$).
*[Extracteur]* La dérivation sous l'espérance est justifiée par la **domination** ($X$ bornée : pour $|\lambda|\le L$, $|X^ke^{\lambda X}|\le M^ke^{LM}$, $M=|a|\vee|b|$) — Poly ch.9, Outils §2.4, étape 2 (et Poly ch.3, Prop. 2.2) ; le corrigé ne l'écrit pas.

**Q3.** Soit $\lambda\in\mathbb R$. La relation vient de l'**inégalité de Taylor-Lagrange à l'ordre 2** et des relations
$$\psi_X(0)=\ln1=0,\qquad\psi_X'(0)=\int x\mu_0(\mathrm dx)=\int x\mu(\mathrm dx)=\mathbb E[X].$$
*[Extracteur]* Explicitement : il existe $\xi$ entre $0$ et $\lambda$ tel que $\psi_X(\lambda)=\psi_X(0)+\lambda\psi_X'(0)+\frac{\lambda^2}2\psi_X''(\xi)\le\lambda\mathbb E[X]+\frac{\lambda^2}2\sup_{u}\psi_X''(u)$.

**Remarque** *[Passage en bleu du corrigé, p. 11–12]* — le support de $\mu_\lambda$ est contenu dans $[a,b]$. Par hypothèse $\mathbb P(X\in[a,b])=1=\int_a^b\mu(\mathrm dx)$. Soit $Y\sim\mu_\lambda$. Pour tout ensemble $\mathcal C\subset\mathbb R\setminus[a,b]$,
$$\mathbb P(Y\in\mathcal C)=\int_a^b\mathbb 1_{x\in\mathcal C}\frac{\exp(\lambda x)}{\mathbb E[\exp(\lambda X)]}\mu(\mathrm dx)\le\frac{\exp(|\lambda|(|b|\vee|a|))}{\mathbb E[\exp(\lambda X)]}\mu(\mathcal C\cap[a,b])=0.$$
On en déduit que si $Y\sim\mu_\lambda$ alors $\mathbb P(Y\in[a,b])=1$.

**Q4.**
1. D'après la remarque ($Y\in[a,b]$ p.s.) et la **caractérisation variationnelle de la variance** (prendre $c=(a+b)/2$) :
$$\mathrm{Var}(Y)=\min_{c\in\mathbb R}\mathbb E\big[(Y-c)^2\big]\le\mathbb E\Big[\Big(Y-\frac{a+b}2\Big)^2\Big].$$
2. Puisque $Y\in[a,b]$ :
$$a-\frac{a+b}2\le Y-\frac{a+b}2\le b-\frac{a+b}2,$$
d'où $(Y-(a+b)/2)^2\le(b-a)^2/4$, puis $\mathrm{Var}(Y)\le(b-a)^2/4$.
3. La Q2 ($\psi_X''(\lambda)=\mathrm{Var}(Y)$, $Y\sim\mu_\lambda$) entraîne $\psi_X''(\lambda)\le(b-a)^2/4$. La majoration étant vraie pour tout $\lambda\in\mathbb R$ : $\sup_{\lambda\in\mathbb R}\psi_X''(\lambda)\le(b-a)^2/4$.

**Q5.** La Q4 montre que $\sup_{u\in\mathbb R}\psi_X''(u)\le(b-a)^2/4$. Ainsi, par Q3,
$$\psi_X(\lambda)\le\lambda m+\frac{\lambda^2}2\frac{(b-a)^2}4=\lambda m+\frac{\lambda^2}8(b-a)^2.$$

**Méthodes mobilisées**
- Centrage puis passage par les sous-gaussiennes : lemme de Hoeffding ⇒ $X_i\in\mathcal G((b_i-a_i)^2/4)$ ; stabilité par somme indépendante (Exo 2 Q3) ; déviations (Exo 2 Q5).
- Dérivée logarithmique ; dérivation sous l'intégrale (domination, $X$ bornée).
- Changement de probabilité (loi basculée / exponentielle $\mu_\lambda$) : $\psi'$ = moyenne, $\psi''$ = variance sous $\mu_\lambda$.
- Formule de Taylor-Lagrange à l'ordre 2 (argument de Herbst).
- Caractérisation de la variance comme $\min_c\mathbb E[(Y-c)^2]$ ; majoration d'une v.a. bornée autour du milieu de l'intervalle.

**Pièges relevés / remarques du corrigé**
- La constante est $(b-a)^2/4$ pour la **variance** (donc $(b-a)^2/8$ dans l'exposant, $\mathcal G((b-a)^2/4)$), et non $(b-a)^2$.
- Il faut vérifier que $\mu_\lambda$ reste à support dans $[a,b]$ (remarque en bleu) avant de majorer sa variance.
- Le centrage $Z_i-\mathbb E[Z_i]$ ne change pas la longueur de l'intervalle.
- *[Extracteur]* Coquille du corrigé (Q4, p. 12) : « $\psi_Z''(\lambda)$ » doit se lire $\psi_X''(\lambda)$.
- *[Extracteur]* Ici $S_n=\sum_kZ_k$ (non centrée) et $D_n=\sum_k(b_k-a_k)^2$ est un nombre : le poly (Th. 2.1) note $S_n$ la somme **centrée** ; Q1 redonne exactement le Th. 2.1 du poly.

**Résultats numériques** *[Extracteur]*
- Variables dans $[0,1]$ (indicatrices) : $X-\mathbb E[X]\in\mathcal G(1/4)$ ; $D_n=n$ ; $\mathbb P(S_n-\mathbb E[S_n]\ge n\varepsilon)\le e^{-2n\varepsilon^2}$ (Corollaire 2.1 du poly).

---

### Exercice 4 — Inégalité de Pisier $(\star\star)$

**Source :** Énoncé PC9, p. 3–4 ; Corrigé PC9, p. 12–15. Poly ch.9, Th. 1.7 (Pisier) et Compléments §4.4 ; remarque « $Z_j$ sous-gaussiennes de facteur $1/(4n)$ » ; Th. 1.2 (3), Th. 1.5, Th. 1.8 ; Compléments §4.3 et Lemme 4.1.

**Énoncé complet**

1. Soient $m$ variables aléatoires réelles $Z_1,\dots,Z_m$ définies sur $(\Omega,\mathcal A,\mathbb P)$ vérifiant la propriété : il existe $\sigma>0$ tel que pour tout $\lambda\ge0$,
$$\mathbb E[e^{\lambda Z_i}]\le e^{\lambda^2\sigma^2/2},\qquad i\in\{1,\cdots,m\}.$$
*On remarquera que lorsque $Z\sim\mathcal N(0,\sigma^2)$, on a $\mathbb E[e^{\lambda Z}]=e^{\lambda^2\sigma^2/2}$ pour tout $\lambda\in\mathbb R$.*
   - (a) Montrer que pour tout $\lambda>0$,
$$e^{\lambda\mathbb E[\max_{1\le i\le m}Z_i]}\le\mathbb E\big[e^{\lambda\max_{1\le i\le m}Z_i}\big]\le m\,e^{\lambda^2\sigma^2/2}.$$
   - (b) En déduire que
$$\mathbb E\big[\max_{1\le i\le m}Z_i\big]\le\sigma\sqrt{2\log(m)}.$$
   On suppose de plus que pour tout $\lambda>0$,
$$\mathbb E[e^{-\lambda Z_i}]\le e^{\lambda^2\sigma^2/2},\qquad i\in\{1,\cdots,m\}.$$
   - (c) Montrer que
$$\mathbb E\Big[\max_{1\le i\le m}|Z_i|\Big]\le\sigma\sqrt{2\log(2m)}.$$

Soit un ensemble d'apprentissage $D_n:=\{(X_i,Y_i)\}_{i=1}^n$, contenant $n$ observations indépendantes de même loi que $(X,Y)$. On définit le risque et le risque empirique d'un classifieur $g$ par
$$R(g):=\mathbb P(g(X)\ne Y),\qquad R_n(g):=\frac1n\sum_{i=1}^n\mathbb 1_{\{g(X_i)\ne Y_i\}}.$$

2.
   - (a) Montrer que pour tout classifieur $g$ et pour tout $\lambda\in\mathbb R$,
$$\mathbb E\big[e^{\lambda\{R_n(g)-R(g)\}}\big]\le\exp\Big(\frac{\lambda^2}{8n}\Big).$$
   - (b) Soit $\mathcal C:=\{g_1,\dots,g_M\}$, $M$ classifieurs. On note $\hat g^*_{n,\mathcal C}$ le classifieur de $\mathcal C$ qui minimise le risque empirique et $g^\star_{\mathcal C}$ le classifieur de $\mathcal C$ qui minimise le risque. Déduire de la question précédente une borne pour le risque moyen $\mathbb E[R(\hat g^*_{n,\mathcal C})-R(g^\star_{\mathcal C})]$.

On considère un problème de classification binaire. On suppose que l'ensemble des attributs $\mathsf X$ est un ensemble de cardinal fini $K$. On note $\mathcal C$ l'ensemble de toutes les règles de classification.

3. Montrer que la règle de classification minimisant le risque empirique est donnée, pour tout $x\in\mathsf X$ par
$$\hat g^*_n(x):=\begin{cases}1&\text{si }\sum_{i=1}^n\frac{Y_i+1}2\mathbb 1_{\{X_i=x\}}\ge\sum_{i=1}^n\frac{1-Y_i}2\mathbb 1_{\{X_i=x\}},\\0&\text{sinon.}\end{cases}$$
4.
   - (a) Montrer que $\inf_{g\in\mathcal C}R(g)=R^\star$ où $R^\star$ est le risque du classifieur bayésien. Montrer que
$$\forall\varepsilon>0,\qquad\mathbb P\Big(\sup_{g\in\mathcal C}|R_n(g)-R(g)|>\varepsilon\Big)\le2^{K+1}\exp(-2n\varepsilon^2).$$
   - (b) En déduire que pour tout $x>0$,
$$\mathbb E[R(\hat g^*_n)]-R^*\le x+2^{K-1}e^{-2nx^2}\sqrt{2\pi/n}.$$
   *Le majorant est de la forme $x+\exp(A-2nx^2)$ pour tout $x$ ; et en prenant $x$ tel que $2nx^2=A-0.5\ln(A/(2n))$, nous obtenons un majorant en $2\sqrt{A/(2n)}$. Soit un majorant en $O(\sqrt{K/n})$. En particulier, il décroît comme $1/\sqrt n$ ; et croît comme la racine carrée du logarithme du cardinal de $\mathcal C$.*

**Corrigé complet question par question**

**Q1(a).**
1. La fonction $x\mapsto e^{\lambda x}$ étant **convexe**, l'**inégalité de Jensen** assure que, pour toute v.a. $X$, $e^{\lambda\mathbb E[X]}\le\mathbb E[e^{\lambda X}]$. Appliquée à $X=\max_{i\in\{1,\dots,m\}}Z_i$, elle donne la première inégalité.
2. Pour la seconde, on utilise ($\lambda>0$, exponentielle croissante et positive : **max ≤ somme**)
$$e^{\lambda\max_{i\in\{1,\dots,m\}}Z_i}\le\sum_{i=1}^m\exp(\lambda Z_i),$$
puis on prend l'espérance (linéarité) et on utilise l'hypothèse de majoration de chaque transformée de Laplace : $\le m\,e^{\lambda^2\sigma^2/2}$.

**Q1(b).** D'après (a), pour tout $\lambda>0$, $e^{\lambda\mathbb E[\max_{1\le i\le m}Z_i]}\le m\,e^{\lambda^2\sigma^2/2}$. En prenant le **logarithme** et en **divisant par $\lambda>0$** :
$$\mathbb E\big[\max_{i\in\{1,\dots,m\}}Z_i\big]\le\frac{\log m}\lambda+\lambda\frac{\sigma^2}2.$$
On prend la valeur de $\lambda$ qui **équilibre les deux termes** (ou qui minimise la fonction de $\lambda$) : $\lambda=\frac{\sqrt{2\log m}}\sigma$, et on obtient $\sigma\sqrt{2\log m}$.
*[Extracteur]* Ce choix suppose $m\ge2$ (pour $m=1$, faire $\lambda\to0$ donne $\mathbb E[Z_1]\le0$ ; cf. Poly ch.9, Th. 1.7, étape 2).

**Q1(c).** On considère les v.a. $Z_1',\dots,Z_{2m}'$ avec $Z_i'=Z_i$ pour $1\le i\le m$ et $Z_i'=-Z_{i-m}$ pour $m+1\le i\le2m$. Ces variables satisfont $\mathbb E[e^{\lambda Z_i'}]\le e^{\lambda^2\sigma^2/2}$ pour tout $i\in\{1,\dots,2m\}$ et tout $\lambda>0$ (par les deux hypothèses). On a
$$\max_{i\in\{1,\dots,m\}}|Z_i|=\max_{1\le i\le2m}Z_i'.$$
En appliquant (b) aux $2m$ variables $Z_i'$, on obtient $\sigma\sqrt{2\log(2m)}$.

**Q2(a).** On écrit
$$R_n(g)-R(g)=\frac1n\sum_{k=1}^n\big(\mathbb 1_{\{g(X_k)\ne Y_k\}}-\mathbb P(g(X)\ne Y)\big).$$
Les v.a. $\mathbb 1_{\{g(X_i)\ne Y_i\}}-\mathbb P(g(X)\ne Y)$ sont **indépendantes, de même loi**, centrées, à valeurs dans $[-R(g),1-R(g)]$ (longueur 1), donc d'après le **lemme d'Hoeffding** (« Polycopié VI-3.8. » = Poly ch.9, Lemme 1.1), pour tout classifieur $g$ et tout $\lambda\in\mathbb R$ :
$$\mathbb E\Big[\exp\Big(\lambda\Big\{\frac1n\sum_{i=1}^n\mathbb 1_{\{g(X_i)\ne Y_i\}}-R(g)\Big\}\Big)\Big]=\Big(\mathbb E\big[\exp\big((\lambda/n)(\mathbb 1_{\{g(X_i)\ne Y_i\}}-R(g))\big)\big]\Big)^n\le\Big(\exp\Big(\frac{\lambda^2}{8n^2}\Big)\Big)^n=\exp\Big(\frac{\lambda^2}{8n}\Big).$$
(L'égalité vient de l'**indépendance** et de l'**identité de loi** ; le lemme est appliqué au paramètre $\lambda/n$.)

**Q2(b).**
1. Puisque $g^\star_{\mathcal C}$ et $\hat g^*_{n,\mathcal C}$ sont des éléments de $\mathcal C$, **par définition (de chacun)** :
$$R_n(\hat g^*_{n,\mathcal C})\le R_n(g^\star_{\mathcal C}),\qquad R(g^\star_{\mathcal C})\le R(\hat g^*_{n,\mathcal C}).$$
2. **Décomposition** (ajout/retrait) :
$$\begin{aligned}0\le R(\hat g^*_{n,\mathcal C})-R(g^\star_{\mathcal C})&=R(\hat g^*_{n,\mathcal C})-R_n(\hat g^*_{n,\mathcal C})+R_n(\hat g^*_{n,\mathcal C})-R_n(g^\star_{\mathcal C})+R_n(g^\star_{\mathcal C})-R(g^\star_{\mathcal C})\\&\le R(\hat g^*_{n,\mathcal C})-R_n(\hat g^*_{n,\mathcal C})+R_n(g^\star_{\mathcal C})-R(g^\star_{\mathcal C}).\end{aligned}$$
3. En espérance, le dernier terme est nul (règle **fixée**, risque empirique sans biais) :
$$\mathbb E[R(\hat g^*_{n,\mathcal C})]\le R(g^\star_{\mathcal C})+\mathbb E\big[R(\hat g^*_{n,\mathcal C})-R_n(\hat g^*_{n,\mathcal C})\big]+\mathbb E\big[R_n(g^\star_{\mathcal C})-R(g^\star_{\mathcal C})\big],$$
car
$$\mathbb E[R_n(g^\star_{\mathcal C})]=\frac1n\sum_{k=1}^n\mathbb P(g^\star_{\mathcal C}(X_k)\ne Y_k)=\mathbb P(g^\star_{\mathcal C}(X)\ne Y)=R(g^\star_{\mathcal C}).$$
4. Travailler l'espérance de $R(\hat g^*_{n,\mathcal C})-R_n(\hat g^*_{n,\mathcal C})$ n'est pas si simple puisqu'il y a un **double aléa** (non indépendant, les deux dépendant de l'ensemble d'apprentissage) : un aléa dans la définition du risque empirique $R_n$, qui s'applique au second aléa, le classifieur $\hat g^*_{n,\mathcal C}$. Une façon de couper cette difficulté est d'écrire
$$R(\hat g^*_{n,\mathcal C})-R_n(\hat g^*_{n,\mathcal C})\le\sup_{g\in\mathcal C}(R(g)-R_n(g))=\sup_{1\le i\le M}(R(g_i)-R_n(g_i)).$$
5. D'après Q2(a) (appliquée avec $-\lambda$), la **Q1(b) s'applique avec $\sigma^2\leftarrow1/(4n)$ et $m\leftarrow M$** aux variables $R(g_i)-R_n(g_i)$, d'où
$$\mathbb E[R(\hat g^*_{n,\mathcal C})]\le R(g^\star_{\mathcal C})+\frac12\sqrt{\frac{2\log(M)}n}.$$

**Remarque du corrigé** *[Passage en bleu du corrigé, p. 13–14]* : on a ici obtenu une borne sur l'**excès de risque intégré**. On aurait pu obtenir une borne en intégrant la borne PAC du cours, mais on aurait obtenu une borne proportionnelle au cardinal de l'ensemble $\mathcal C$ (car la borne PAC du cours résulte d'Hoeffding + une borne d'union « brutale ») au lieu de $\sqrt{\log(|\mathcal C|)}$. En effet, en utilisant Pisier, on contrôle mieux l'espérance du max de $|\mathcal C|$ variables aléatoires (potentiellement **dépendantes**) sous-gaussiennes (l'intuition est que, par exemple pour des variables gaussiennes, l'espérance du maximum de $k=|\mathcal C|$ variables croît très lentement en fonction du nombre de variables ; utiliser la borne $\mathbb E\max X_i\le\mathbb E\sum_{i=1}^kX_i\le k\mathbb EX$ résulterait en une dépendance linéaire en $k$ extrêmement pessimiste. Au contraire $\mathbb E\max X_i=\ln\exp(\mathbb E\max X_i)\le\ln\mathbb E\exp\max X_i\le\ln k\mathbb E\exp(X)$ (avec en plus l'optimisation en $\lambda$) permet d'avoir une dépendance plus raisonnable !). D'un autre côté, dans le cours comme dans l'exercice, la concentration vis-à-vis des v.a. de Bernoulli découle du lemme de Hoeffding, qui montre que des variables bornées centrées sont sous-gaussiennes (avec paramètre $(b-a)^2/4$), et qui **n'est pas optimal** (cf. cours) pour des Bernoulli.
*[Extracteur]* Nuance : dans le poly (Compléments §4.2, Lemme 4.1), l'intégration de la queue $2|\mathcal C|e^{-2n\varepsilon^2}$ donne $\sqrt{(1+\log(2|\mathcal C|))/(2n)}$, donc aussi une dépendance en $\sqrt{\log|\mathcal C|}$ (un peu moins bonne que Pisier) ; la dépendance « linéaire en $|\mathcal C|$ » de la remarque correspond à une intégration naïve (ou à la borne $\mathbb E\max\le\mathbb E\sum$).

**Q3.** En remarquant que $\mathbb 1_{\{Y_i\ne g(X_i)\}}=1-\mathbb 1_{\{Y_i=g(X_i)\}}$, et en **décomposant selon la valeur de $X_i$** ($\mathsf X$ fini) :
$$\mathop{\mathrm{arg\,min}}_{g\in\mathcal C}\sum_{i=1}^n\mathbb 1_{\{Y_i\ne g(X_i)\}}=\mathop{\mathrm{arg\,max}}_{g\in\mathcal C}\sum_{x\in\mathsf X}\sum_{i=1}^n\mathbb 1_{\{Y_i=g(x)\}}\mathbb 1_{\{X_i=x\}}.$$
Le critère se maximise **point par point** ($\mathcal C$ contient toutes les règles, les valeurs $g(x)$ sont libres). Ainsi, toute règle de décision $g_n$ vérifiant, en tout point $x$,
$$g_n(x)=\begin{cases}1&\text{si }\sum_{i=1}^n\mathbb 1_{\{Y_i=1\}}\mathbb 1_{\{X_i=x\}}\ge\sum_{i=1}^n\mathbb 1_{\{Y_i=0\}}\mathbb 1_{\{X_i=x\}},\\0&\text{si }\sum_{i=1}^n\mathbb 1_{\{Y_i=1\}}\mathbb 1_{\{X_i=x\}}<\sum_{i=1}^n\mathbb 1_{\{Y_i=0\}}\mathbb 1_{\{X_i=x\}},\end{cases}$$
minimise le risque empirique (**vote majoritaire** dans chaque cellule $\{x\}$). Comme $g^*_n$ vérifie ces conditions, c'est un minimiseur du risque empirique.

**Q4(a).**
1. Comme le classifieur bayésien $g^*$ est une règle de classification, $g^*\in\mathcal C$ ; donc $R^*\ge\inf_{g\in\mathcal C}R(g)$. D'autre part, par définition du classifieur bayésien, $R(g)-R^*\ge0$ pour tout $g$. Ainsi $\inf_{g\in\mathcal C}R(g)\ge R^*$, d'où l'égalité.
2. Soit $g\in\mathcal C$. Les v.a. $\{\mathbb 1_{\{g(X_i)\ne Y_i\}}\}_i$ sont **indépendantes et à valeurs dans $[0,1]$**, donc d'après l'**inégalité de Hoeffding** (Poly ch.9, Th. 1.3) :
$$\forall\varepsilon>0,\qquad\mathbb P(|R_n(g)-R(g)|>\varepsilon)\le2e^{-2n\varepsilon^2}.$$
3. Comme le **cardinal de $\mathcal C$ est $2^K$** (toutes les fonctions $\mathsf X\to\{0,1\}$), une **borne d'union** donne
$$\forall\varepsilon>0,\qquad\mathbb P\Big(\sup_{g\in\mathcal C}|R_n(g)-R(g)|>\varepsilon\Big)\le\sum_{g\in\mathcal C}\mathbb P(|R_n(g)-R(g)|>\varepsilon)\le2^{K+1}e^{-2n\varepsilon^2}.$$

**Q4(b).**
1. Décomposition :
$$R(g^*_n)-R^*=R(g^*_n)-R_n(g^*_n)+R_n(g^*_n)-R_n(g^*)+R_n(g^*)-R^*.$$
2. Pour les mêmes raisons qu'en Q2(b) ($R_n(g^*_n)\le R_n(g^*)$ ; $\mathbb E[R_n(g^*)]=R^*$, règle fixée) :
$$0\le\mathbb E[R(g^*_n)]-R^*\le\mathbb E\Big[\sup_{g\in\mathcal C}(R_n(g)-R(g))\Big]\le\mathbb E\Big[\sup_{g\in\mathcal C}|R_n(g)-R(g)|\Big].$$
3. **Formule de la queue** : $\mathbb E[|U|]=\int_0^\infty\mathbb P(|U|\ge\varepsilon)\,\mathrm d\varepsilon$, d'où
$$\mathbb E[R(g^*_n)-R^*]\le\int_0^{+\infty}\mathbb P\Big(\sup_{g\in\mathcal C}|R_n(g)-R(g)|>\varepsilon\Big)\mathrm d\varepsilon.$$
4. La borne de Q4(a) n'est **informative que pour $\varepsilon$ assez grand** (pour les petites valeurs de $\varepsilon$, elle est supérieure à 1). On l'utilise donc pour les grandes valeurs de $\varepsilon$ et on **majore la probabilité par 1** pour les petites. Pour tout $x>0$ :
$$\begin{aligned}\mathbb E[R(g^*_n)-R^*]&\le\int_0^x\mathrm d\varepsilon+\int_x^{+\infty}2^{K+1}e^{-2n\varepsilon^2}\mathrm d\varepsilon=\int_0^x\mathrm d\varepsilon+2^{K+1}\int_0^{+\infty}e^{-2n(\varepsilon+x)^2}\mathrm d\varepsilon\\&\le x+2^{K+1}e^{-2nx^2}\int_0^{+\infty}e^{-2n\varepsilon^2}\mathrm d\varepsilon=x+2^{K-1}e^{-2nx^2}\sqrt{2\pi/n},\end{aligned}$$
la dernière inégalité étant obtenue **en développant le carré** dans l'exponentielle et en remarquant que $\varepsilon x\ge0$ ; puis **intégrale de Gauss** $\int_0^\infty e^{-2n\varepsilon^2}\mathrm d\varepsilon=\frac12\sqrt{\pi/(2n)}$ ($2^{K+1}\cdot\frac12\sqrt{\pi/(2n)}=2^{K-1}\sqrt{2\pi/n}$).
5. Le majorant est vrai pour tout $x>0$ et de la forme $x+\exp(A-2nx^2)$ avec
$$A=(K-1)\ln2+\frac12\ln\Big(\frac{2\pi}n\Big).$$
En prenant $2nx^2=A-\ln(A/2n)/2$, on obtient
$$x+2^{K-1}e^{-2nx^2}\sqrt{2\pi/n}\le2\sqrt{\frac A{2n}}\le\sqrt{\frac{(K-1)\ln2}{2n}+\frac{\ln(2\pi)-\ln n}{4n}}.$$

*[Extracteur]* Deux réserves sur cette dernière ligne : (i) $2\sqrt{A/(2n)}=2\sqrt{\frac{(K-1)\ln2}{2n}+\frac{\ln(2\pi)-\ln n}{4n}}$ : le facteur $2$ a disparu dans le dernier membre (coquille probable) ; (ii) avec ce choix, $e^{A-2nx^2}=\sqrt{A/(2n)}$ exactement, mais $x\le\sqrt{A/(2n)}$ seulement si $A\ge2n$ : en général le majorant $2\sqrt{A/(2n)}$ est vrai **à un terme logarithmique près** (et suppose $A>0$). L'ordre $O(\sqrt{K/n})$ est inchangé. Le Th. 1.8 du poly, appliqué avec $|\mathcal C|=2^K$ et $\inf_{\mathcal C}R=R^*$, donne directement $\mathbb E[R(\hat g^*_n)]-R^*\le\sqrt{(K+1)\ln2/(2n)}$.

**Méthodes mobilisées**
- Inégalité de Jensen (convexité de $x\mapsto e^{\lambda x}$) ; majoration max ≤ somme pour des quantités positives.
- Passage au logarithme et optimisation en $\lambda$ (équilibrage des deux termes).
- Symétrisation : $\max_i|Z_i|=\max(Z_1,\dots,Z_m,-Z_1,\dots,-Z_m)$ (on double $m$).
- Lemme de Hoeffding + indépendance/identité de loi ⇒ $R_n(g)-R(g)$ sous-gaussienne de facteur $1/(4n)$.
- Décomposition de l'excès de risque par ajout/retrait ; définition du MRE et de l'oracle ; risque empirique sans biais pour une règle fixée ; majoration par le sup (contrôle uniforme) — c'est la preuve de Poly ch.9, Th. 1.2 (3).
- Pisier ⇒ borne en espérance (Th. 1.8).
- MRE sur toutes les règles d'un $\mathsf X$ fini = vote majoritaire point par point.
- Hoeffding + borne d'union (Th. 1.5) avec $|\mathcal C|=2^K$.
- Formule $\mathbb E[|U|]=\int_0^\infty\mathbb P(|U|\ge\varepsilon)\mathrm d\varepsilon$ ; découpage de l'intégrale (majorer par 1 près de 0) ; intégrale de Gauss ; optimisation du point de coupure $x$.

**Pièges relevés / remarques du corrigé**
- Double aléa : $\hat g^*_{n,\mathcal C}$ dépend de l'échantillon sur lequel on calcule $R_n$ : on ne peut pas dire $\mathbb E[R_n(\hat g^*_{n,\mathcal C})]=\mathbb E[R(\hat g^*_{n,\mathcal C})]$ ; on passe par le sup sur la classe.
- Pisier ne demande **pas l'indépendance** des $Z_i$ (les $R_n(g_i)$ sont calculés sur le même échantillon).
- Q2(b) ne demande que la **déviation unilatérale** $\sup(R-R_n)$ : on obtient $\frac12\sqrt{2\log M/n}=\sqrt{\log M/(2n)}$, *[Extracteur]* légèrement mieux que le $\sqrt{\log(2|\mathcal C|)/(2n)}$ du Th. 1.8 du poly qui passe par la valeur absolue.
- Le lemme de Hoeffding n'est pas optimal pour les Bernoulli (variance $p(1-p)$ remplacée par $1/4$) — remarque en bleu.
- *[Extracteur]* Coquilles du corrigé : en Q2(b), « $\mathbb E[R(\hat g^*_{n,\mathcal C})]\le R(g^\star_*)+\dots=\mathbb E[R(\hat g^*_{n,\mathcal C})-R_n(\hat g^*_{n,\mathcal C})]$ » doit se lire $\mathbb E[R(\hat g^*_{n,\mathcal C})]\le R(g^\star_{\mathcal C})+\mathbb E[R(\hat g^*_{n,\mathcal C})-R_n(\hat g^*_{n,\mathcal C})]$ ; en Q4(b), « $\sup_{g}(R_n(g)-R(g))$ » devrait être $\sup_g(R(g)-R_n(g))$ (sans conséquence, majoré par $\sup|\cdot|$).
- *[Extracteur]* Incohérence de labels en Q3 : l'énoncé écrit $\frac{Y_i+1}2$, $\frac{1-Y_i}2$ (labels $Y_i\in\{-1,1\}$) mais la règle prend ses valeurs dans $\{0,1\}$ ; le corrigé raisonne avec $\mathbb 1_{\{Y_i=1\}}$ et $\mathbb 1_{\{Y_i=0\}}$ (labels $\{0,1\}$). Dans tous les cas : **vote majoritaire** parmi les $X_i=x$, égalité tranchée en faveur de la classe 1. Aux points $x$ non observés, les deux sommes sont nulles et $\hat g_n^*(x)=1$.
- En Q4, la classe de **toutes** les règles contient le classifieur bayésien : l'erreur d'approximation est nulle ($\inf_{\mathcal C}R=R^*$), l'excès de risque se réduit à l'erreur d'estimation ; c'est possible car $\mathsf X$ est **fini** (cf. Exo 6 pour $\mathsf X$ infini).
- Notations : l'énoncé utilise $R_n(g)$ sans chapeau et $g^\star_{\mathcal C}$ (étoile pleine) ; le corrigé écrit tantôt $g^\star_{\mathcal C}$, tantôt $g^*_{\mathcal C}$, et $g^*_n$ au lieu de $\hat g^*_n$.

**Résultats numériques** *[Extracteur]*
- Pisier, $\sigma=1$ : $m=1000$ ⇒ $\sqrt{2\ln1000}\approx3{,}717$ ; $\mathbb E[\max|Z_i|]\le\sqrt{2\ln2000}\approx3{,}899$.
- Q2(b), $M=1000$, $n=10\,000$ : $\sqrt{\ln M/(2n)}\approx0{,}0186$.
- Q4, $K=10$, $n=10\,000$ : borne du Th. 1.8 $\sqrt{(K+1)\ln2/(2n)}\approx0{,}0195$ ; $|\mathcal C|=2^{10}=1024$.

---

### Exercice 5 — Hyper-rectangles $(\star\star\star)$

**Source :** Énoncé PC9, p. 4 ; Corrigé PC9, p. 15–16. Poly ch.9, §1.5 ; Th. 1.3, Th. 1.4, Outils §2.6.

**Énoncé complet**

Considérons un ensemble de $n$ points de $\mathbb R^d$ notés $\mathsf P=\{\mathbf x_1,\dots,\mathbf x_n\}$. Pour tout $i\in\{1,\dots,n\}$, $\mathbf x_i=(x_i^{(1)},\dots,x_i^{(d)})$. Notons $\mathcal R$ l'ensemble des hyper-rectangles de $\mathbb R^d$.
$$\mathcal R=\Big\{\big[a^{(1)},b^{(1)}\big]\times\big[a^{(2)},b^{(2)}\big]\times\cdots\times\big[a^{(d)},b^{(d)}\big]\ :\ a^{(i)}\le b^{(i)},\ i=1,\dots,d\Big\}.$$
Pour un ensemble de points $\mathsf P$, on note $|\mathsf P|$ le nombre de points qui le composent qu'ils soient distincts ou non et pour $\mathsf R\in\mathcal R$, on note $\mathsf P\cap\mathsf R$ l'ensemble de points composés des points de $\mathsf P$ qui appartiennent à $\mathsf R$.

Soient $\mathsf S=(X_1,\dots,X_k)$, $k$ variables aléatoires indépendantes et de même loi uniforme sur $\mathsf P$ et soit $\varepsilon>0$.

1. Montrer que, pour tout $\mathsf R\in\mathcal R$ (note 1),
$$\mathbb P\Big(\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|\ge\varepsilon\Big)\le2\exp(-2\varepsilon^2k).$$
2. Soit $\gamma\in]0,1[$. Montrer que si $k\ge(1/2\varepsilon^2)\ln(2/\gamma)$, alors avec probabilité supérieure à $1-\gamma$,
$$\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|\le\varepsilon.$$

Pour $j\in\{1,\dots,d\}$, notons par $x^{(j)}_{1:n}\le x^{(j)}_{2:n}\le\cdots\le x^{(j)}_{n:n}$ l'échantillon ordonné de la $j$-ème coordonnée $(x^{(j)}_1,\dots,x^{(j)}_n)$. On note
$$\mathcal R_{\mathsf S}=\Big\{\big[x^{(1)}_{i_1:n},x^{(1)}_{j_1:n}\big]\times\cdots\times\big[x^{(d)}_{i_d:n},x^{(d)}_{j_d:n}\big]\ :\ 1\le i_\ell\le j_\ell\le n,\ \ell=1,\dots,d\Big\}.$$

3. Montrer que
$$\sup_{\mathsf R\in\mathcal R}\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|=\sup_{\mathsf R\in\mathcal R_{\mathsf S}}\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|.$$
4. Soit $\delta\in]0,1[$. Montrer que si $|\mathsf S|=k\ge(d/\varepsilon^2)\log(n/\delta^{1/2d})$, alors avec une probabilité supérieure à $1-\delta$, pour tout $\mathsf R\in\mathcal R$,
$$\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|\le\varepsilon.$$

*Note 1 de l'énoncé :* Par exemple, $\mathsf P$ peut représenter les utilisateurs d'une boutique, $d$ est le nombre d'attributs pour chaque consommateur, et $\mathsf R$ est le profil désiré, les consommateurs qui ont fait entre 10 et 1000 achats, qui effectuent en moyenne entre 2.5 et 10 achats par semaine, qui dépensent en moyenne entre 10 et 50 euros par achat.

**Corrigé complet question par question**

**Q1.** Les v.a. $Y_i=\mathbb 1_{\{X_i\in\mathsf R\}}$ sont **indépendantes, de loi de Bernoulli** de paramètre
$$\mathbb E[Y_i]=\mathbb P(X_i\in\mathsf R)=\frac{|\mathsf P\cap\mathsf R|}{|\mathsf P|}$$
($X_i$ uniforme sur $\mathsf P$). Le résultat est donc une application de l'**inégalité de Hoeffding** (Poly ch.9, Th. 1.3, variables dans $[0,1]$) en remarquant que $|\mathsf R\cap\mathsf S|=\sum_{i=1}^k\mathbb 1_{\{X_i\in\mathsf R\}}$ et $|\mathsf S|=k$.

**Q2.** C'est une conséquence directe de Q1. *[Extracteur]* : $2\exp(-2\varepsilon^2k)\le\gamma\iff k\ge\ln(2/\gamma)/(2\varepsilon^2)$ ; on passe à l'événement complémentaire (forme « $\delta$ » de Hoeffding, Poly ch.9, Th. 1.4).

**Q3.**
1. Comme $\mathcal R_{\mathsf S}\subset\mathcal R$ :
$$\sup_{\mathsf R\in\mathcal R}\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|\ge\sup_{\mathsf R\in\mathcal R_{\mathsf S}}\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|.$$
2. Réciproquement, quel que soit $\mathsf R\in\mathcal R$, il existe $\mathsf R'\in\mathcal R_{\mathsf S}$ tel que $\mathsf R\cap\mathsf P=\mathsf R'\cap\mathsf P$. Il s'ensuit que, nécessairement, $\mathsf R\cap\mathsf S=\mathsf R'\cap\mathsf S$ (les points de $\mathsf S$ sont des points de $\mathsf P$), donc
$$\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|=\Big|\frac{|\mathsf R'\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R'\cap\mathsf P|}{|\mathsf P|}\Big|\le\sup_{\mathsf R\in\mathcal R_{\mathsf S}}\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|.$$
3. Cette inégalité étant vraie pour tout $\mathsf R\in\mathcal R$, on passe au sup : égalité.

*[Extracteur]* Construction de $\mathsf R'$ (non détaillée dans le corrigé) : si $\mathsf R\cap\mathsf P\ne\emptyset$, on « rétrécit » chaque côté $[a^{(\ell)},b^{(\ell)}]$ au plus petit intervalle $[x^{(\ell)}_{i_\ell:n},x^{(\ell)}_{j_\ell:n}]$ contenant les $\ell$-èmes coordonnées des points de $\mathsf P\cap\mathsf R$ ; ce rectangle est dans $\mathsf R$ et contient $\mathsf P\cap\mathsf R$. (Le cas $\mathsf R\cap\mathsf P=\emptyset$ donne une différence nulle.) Malgré la notation, $\mathcal R_{\mathsf S}$ est construit à partir des points de $\mathsf P$ (statistiques d'ordre des $\mathbf x_i$) ; il est **déterministe**.

**Q4.**
1. On remarque d'abord que $|\mathcal R_{\mathsf S}|=\big(\frac{n(n-1)}2\big)^d\le n^{2d}/2$.
2. **Borne d'union** sur $\mathcal R_{\mathsf S}$ dans le résultat de Q1 :
$$\mathbb P\Big(\sup_{\mathsf R\in\mathcal R_{\mathsf S}}\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|>\varepsilon\Big)\le n^{2d}e^{-2\varepsilon^2k}.$$
3. Si $k\ge(d/\varepsilon^2)\log(n/\delta^{1/2d})$, cette inégalité implique
$$\mathbb P\Big(\sup_{\mathsf R\in\mathcal R_{\mathsf S}}\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|>\varepsilon\Big)\le\delta.$$
*[Extracteur]* : $n^{2d}e^{-2\varepsilon^2k}\le\delta\iff2\varepsilon^2k\ge2d\log n+\log(1/\delta)\iff k\ge\frac d{\varepsilon^2}\Big(\log n+\frac1{2d}\log\frac1\delta\Big)=\frac d{\varepsilon^2}\log\big(n/\delta^{1/(2d)}\big)$.
4. Sur l'événement $\{\sup_{\mathsf R\in\mathcal R_{\mathsf S}}|\cdots|\le\varepsilon\}$, de probabilité supérieure à $1-\delta$, on a d'après Q3
$$\sup_{\mathsf R\in\mathcal R}\Big|\frac{|\mathsf R\cap\mathsf S|}{|\mathsf S|}-\frac{|\mathsf R\cap\mathsf P|}{|\mathsf P|}\Big|\le\varepsilon.$$

**Méthodes mobilisées**
- Écriture d'une proportion empirique comme moyenne d'indicatrices i.i.d. de Bernoulli ; inégalité de Hoeffding bilatérale.
- Inversion de la borne (taille d'échantillon nécessaire, forme « $\delta$ »).
- Réduction d'une famille infinie ($\mathcal R$) à une famille finie ($\mathcal R_{\mathsf S}$) ayant les mêmes traces sur les points : même idée que la Prop. 1.2 / Compléments §4.6 (hyperplans passant par $d$ points).
- Dénombrement de $\mathcal R_{\mathsf S}$ ; borne d'union ; passage au complémentaire.

**Pièges relevés / remarques du corrigé**
- Le résultat de Q2 est **pour un $\mathsf R$ fixé** ; Q4 est **uniforme** sur tous les rectangles, ce qui coûte un facteur $d\log n$ (au lieu de $\ln2/2$) dans la taille d'échantillon.
- La taille $k$ requise ne dépend de $n$ que logarithmiquement : on peut estimer toutes les proportions de rectangles d'une très grande base à partir d'un petit sous-échantillon.
- *[Extracteur]* Dénombrement : avec $1\le i_\ell\le j_\ell\le n$, le nombre de paires par coordonnée est $n(n+1)/2$ (et non $n(n-1)/2$ comme écrit dans le corrigé) ; on a toujours $|\mathcal R_{\mathsf S}|\le n^{2d}$, et la conclusion reste vraie à une constante près ($2n^{2d}$ au lieu de $n^{2d}$ dans la borne d'union, ce qui ne change que marginalement la condition sur $k$).

**Résultats numériques** *[Extracteur]*
- Q2 : $\varepsilon=0{,}05$, $\gamma=0{,}05$ ⇒ $k\ge\ln(40)/0{,}005\approx737{,}8$, soit $k\ge738$.
- Q4 : $d=3$, $n=10^6$, $\varepsilon=0{,}05$, $\delta=0{,}05$ ⇒ $k\ge(3/0{,}0025)\log(10^6/0{,}05^{1/6})\approx17\,178$.

---

### Exercice 6 — Théorème *no free lunch* $(\star\star\star)$

**Source :** Énoncé PC9, p. 5–6 ; Corrigé PC9, p. 16–17. Poly ch.9, Th. 1.1 (*no free lunch*), Compléments §4.1 (même preuve avec labels $\pm1$).

**Énoncé complet**

Nous considérons un problème de classification binaire. Nous supposons que le cardinal de l'ensemble des attributs, $|\mathsf X|$, est infini. Nous munissons $\mathsf X$ d'une $\sigma$-algèbre $\mathcal X$ telle que les singletons $\{x\}$ soient mesurables. Nous notons $D_n:=\{(X_i,Y_i)\}_{i=1}^n$ l'ensemble des variables aléatoires d'apprentissage, que nous supposons, sous $\mathbb P_n$, indépendantes et identiquement distribuées de même loi que $(X,Y)$ sous $\mathbb P$. Nous allons démontrer pour toute règle de classification $x\mapsto g_n(x;D_n)$,
$$\sup_{\mathbb P}\big\{\mathbb E_n[\mathbb P(Y\ne g_n(X;D_n)\mid D_n)]-R^*_{\mathbb P}\big\}\ge1/2,\tag{2}$$
où le sup est pris sur l'ensemble des mesures de probabilité sur $\mathcal X\otimes\mathcal P(\{0,1\})$ et
$$R^*_{\mathbb P}:=\inf_{g:\mathsf X\to\{0,1\}}\mathbb P(g(X)\ne Y).$$
On dit qu'une règle de classification $g_n$ est *uniformément universellement consistante* lorsque le membre de gauche dans l'équation (2) tend vers 0 avec $n$. On va donc montrer qu'aucune règle de classification ne peut être uniformément universellement consistante lorsque $\mathsf X$ est infini. Ce résultat important est souvent appelé le « no free lunch theorem ».

Soit $n,K\in\mathbb N$, $g_n:\mathsf X\mapsto\{0,1\}$ un classifieur. L'espace $\mathsf X$ étant infini, il contient au moins $K$ points distincts $a_1,\dots,a_K$. Dans la suite ces $K$ points sont fixés. On considère l'ensemble des lois $(\mathbb P_{\mathbf q})_{\mathbf q\in\{0,1\}^K}$ sur $\mathcal X\otimes\mathcal P(\{0,1\})$, où, pour tout $\mathbf q:=(q_1,\dots,q_K)$, $\mathbf y:=(y_1,\dots,y_K)\in\{0,1\}^K$,
$$\mathbb P_{\mathbf q}(X=a_j,Y=y_j)=K^{-1}\delta_{q_j,y_j}\qquad\text{pour tout }j\in\{1,\dots,K\}.$$

1. Montrer que pour tout $\mathbf q\in\{0,1\}^K$, $\mathbb P_{\mathbf q}(X=a_j)=1/K$ pour tout $j\in\{1,\dots,K\}$. En déduire que, pour tout $\mathbf q\in\{0,1\}^K$, sous $\mathbb P_{n,\mathbf q}$, les variables $X_1,\dots,X_n$ sont distribuées suivant une loi uniforme sur $\{a_1,\dots,a_K\}$.
2. Calculer $\mathbb P_{\mathbf q}(g(X)\ne Y)$ pour un classifieur $g$.
3. Montrer que $R^*_{\mathbb P_{\mathbf q}}:=\inf_{g:\mathsf X\to\{0,1\}}\mathbb P_{\mathbf q}(g(X)\ne Y)=0$ et que l'inf est atteint par toute fonction $g_{\mathbf q}:\mathsf X\to\{0,1\}$ vérifiant, pour tout $x\in\{a_1,\dots,a_K\}$
$$g_{\mathbf q}(x)=\sum_{i=1}^Kq_i\mathbb 1_{\{a_i\}}(x).$$
4. Montrer que
$$\begin{aligned}\sup_{\mathbb P}\big\{\mathbb E_n[\mathbb P(Y\ne g_n(X;D_n)\mid D_n)]-R^*_{\mathbb P}\big\}&\ge\sup_{\mathbf q\in\{0,1\}^K}\mathbb E_{n,\mathbf q}[\mathbb P_{\mathbf q}(Y\ne g_n(X;D_n)\mid D_n)]\\&\ge\frac1{2^K}\sum_{\mathbf q\in\{0,1\}^K}\mathbb E_{n,\mathbf q}[\mathbb P_{\mathbf q}(Y\ne g_n(X;D_n)\mid D_n)]\\&\ge\frac1{2^K}\sum_{\mathbf q\in\{0,1\}^K}\mathbb E_{n,\mathbf q}\big[\mathbb E_{\mathbf q}[\mathbb P_{\mathbf q}(Y\ne g_n(X;D_n)\mid X,D_n)\mathbb 1_{\{X\notin\{X_1,\dots,X_n\}\}}]\big].\end{aligned}$$
5. Montrer que, pour tout $x\notin\{X_1,\dots,X_n\}$, il existe $2^{K-1}$ valeurs de $\mathbf q\in\{0,1\}^K$ telles que $\mathbb E_{\mathbf q}[\mathbb 1_{\{Y\ne g_n(x;D_n)\}}\mid D_n]=0$ et $2^{K-1}$ valeurs de $\mathbf q\in\{0,1\}^K$ telles que $\mathbb E_{\mathbf q}[\mathbb 1_{\{Y\ne g_n(x;D_n)\}}\mid D_n]=1$.
6. Montrer que, pour tout $\mathbf q\in\{0,1\}^K$ et pour tout $x\in\{a_1,\dots,a_K\}$,
$$\mathbb E_{\mathbf q}[\mathbb 1_{\{X_1\ne x,X_2\ne x,\dots,X_n\ne x\}}]=(1-1/K)^n.$$
7. Montrer (2).

**Corrigé complet question par question**

**Q1.** Par définition de $\mathbb P_{\mathbf q}$ :
$$\mathbb P_{\mathbf q}(X=a_j,Y=q_j)=\frac1K,\qquad\mathbb P_{\mathbf q}(X=a_j,Y=1-q_j)=0.$$
Donc (**formule des probabilités totales** sur la valeur de $Y$)
$$\mathbb P_{\mathbf q}(X=a_j)=\mathbb P_{\mathbf q}(X=a_j,Y=q_j)+\mathbb P_{\mathbf q}(X=a_j,Y=1-q_j)=\frac1K.$$
Ainsi, sous $\mathbb P_{\mathbf q}$, $X$ suit la loi uniforme sur $\{a_1,\dots,a_K\}$ (et donc chaque $X_i$ sous $\mathbb P_{n,\mathbf q}$, les $(X_i,Y_i)$ étant i.i.d. de loi $\mathbb P_{\mathbf q}$). Sous $\mathbb P_{\mathbf q}$, **$Y=q_j$ p.s. lorsque $X=a_j$** : le label est une fonction déterministe de $X$.

**Q2.** Soit $g$ un classifieur. **Décomposition selon la valeur de $X$** :
$$\begin{aligned}\mathbb P_{\mathbf q}(Y\ne g(X))&=\sum_{i=1}^K\mathbb P_{\mathbf q}(Y\ne g(X)\cap X=a_i)=\sum_{i=1}^K\mathbb P_{\mathbf q}(Y\ne g(a_i)\cap X=a_i)\\&=\sum_{i=1}^K\mathbb P_{\mathbf q}(Y=q_i\cap X=a_i)\mathbb 1_{\{q_i\ne g(a_i)\}}+\mathbb P_{\mathbf q}(Y=1-q_i\cap X=a_i)\mathbb 1_{\{q_i=g(a_i)\}}\\&=\frac1K\sum_{i=1}^K\mathbb 1_{\{q_i\ne g(a_i)\}}.\end{aligned}$$

**Q3.** Pour tout $i\in\{1,\dots,K\}$, $g_{\mathbf q}(a_i)=q_i$, donc $\mathbb P_{\mathbf q}(Y\ne g_{\mathbf q}(X))=0$ d'après Q2. Une probabilité étant positive, il s'ensuit que
$$R^*_{\mathbb P_{\mathbf q}}=\inf_{g:\mathsf X\to\{0,1\}}\mathbb P_{\mathbf q}(Y\ne g(X))=\mathbb P_{\mathbf q}(Y\ne g_{\mathbf q}(X))=0.$$

**Q4.**
1. *Première inégalité* : l'ensemble des lois de probabilité sur $\mathcal X\otimes\mathcal P(\{0,1\})$ **contient** la famille $(\mathbb P_{\mathbf q})_{\mathbf q\in\{0,1\}^K}$ (le sup sur un ensemble plus grand est plus grand) et, pour ces lois, $R^*_{\mathbb P_{\mathbf q}}=0$ (Q3).
2. *Deuxième inégalité* : **la moyenne est inférieure au maximum** — pour tout $\mathbf q\in\{0,1\}^K$,
$$\mathbb E_{n,\mathbf q}[\mathbb P_{\mathbf q}(Y\ne g_n(X;D_n)\mid D_n)]\le\sup_{\mathbf q\in\{0,1\}^K}\mathbb E_{n,\mathbf q}[\mathbb P_{\mathbf q}(Y\ne g_n(X;D_n)\mid D_n)],$$
et l'on moyenne sur les $2^K$ valeurs de $\mathbf q$.
3. *Troisième inégalité* : on écrit
$$\mathbb E_{n,\mathbf q}[\mathbb P_{\mathbf q}(Y\ne g_n(X;D_n)\mid D_n)]=\mathbb E_{D_n\sim\mathbb P_{n,\mathbf q},(X,Y)\sim\mathbb P_{\mathbf q}}[\mathbb 1_{\{Y\ne g_n(X;D_n)\}}].$$
Ensuite, $\mathbb 1_{\{Y\ne g_n(X;D_n)\}}\ge\mathbb 1_{\{Y\ne g_n(X;D_n)\}}\mathbb 1_{\{X\notin\{X_1,\dots,X_n\}\}}$. Comme $\mathbb 1_{\{X\notin\{X_1,\dots,X_n\}\}}$ est **mesurable par rapport à la tribu engendrée par $(D_n,X)$** (« sortir ce qui est connu ») et par **tour des espérances** :
$$\begin{aligned}\mathbb E_{D_n\sim\mathbb P_{n,\mathbf q},(X,Y)\sim\mathbb P_{\mathbf q}}[\mathbb 1_{\{Y\ne g_n(X;D_n)\}}]&\ge\mathbb E_{D_n\sim\mathbb P_{n,\mathbf q},(X,Y)\sim\mathbb P_{\mathbf q}}\big[\mathbb E_{D_n\sim\mathbb P_{n,\mathbf q},(X,Y)\sim\mathbb P_{\mathbf q}}[\mathbb 1_{\{Y\ne g_n(X;D_n)\}}\mathbb 1_{\{X\notin\{X_1,\dots,X_n\}\}}\mid X,D_n]\big]\\&=\mathbb E_{D_n\sim\mathbb P_{n,\mathbf q},(X,Y)\sim\mathbb P_{\mathbf q}}\big[\mathbb E_{\mathbf q}[\mathbb 1_{\{Y\ne g_n(X;D_n)\}}\mathbb 1_{\{X\notin\{X_1,\dots,X_n\}\}}\mid X,D_n]\big]\\&=\mathbb E_{D_n\sim\mathbb P_{n,\mathbf q},(X,Y)\sim\mathbb P_{\mathbf q}}\big[\mathbb E_{\mathbf q}[\mathbb 1_{\{Y\ne g_n(X;D_n)\}}\mid X,D_n]\,\mathbb 1_{\{X\notin\{X_1,\dots,X_n\}\}}\big].\end{aligned}$$

**Q5.** Si on fixe $D_n$, on fixe la règle $g_n(\cdot,D_n)$ et en particulier la valeur de $g_n(a_i,D_n)$ en tous les points $a_i\notin D_n$, **de façon indépendante de $D_n$** (*sic*). Pour tout $i\in\{1,\dots,K\}$ tel que $a_i\notin\{X_1,\dots,X_n\}$, il existe $2^{K-1}$ valeurs de $\mathbf q\in\{0,1\}^K$ telles que $q_i=g_n(a_i,D_n)$ et $2^{K-1}$ valeurs de $\mathbf q$ telles que $q_i=1-g_n(a_i,D_n)$ (on fixe une coordonnée de $\mathbf q$ et on laisse les $K-1$ autres libres). Pour les premiers $\mathbb E_{\mathbb P_{\mathbf q}}[\mathbb 1_{\{Y\ne g_n(a_i;D_n)\}}\mid D_n]=0$ et pour les seconds $\mathbb E_{\mathbb P_{\mathbf q}}[\mathbb 1_{\{Y\ne g_n(x;D_n)\}}\mid D_n]=1$ (en $X=a_i$, $Y=q_i$ p.s.).

**Q6.** Comme $X,X_1,\dots,X_n$ sont **indépendants** et, sous $\mathbb P_{\mathbf q}$, de **même loi uniforme** sur $\{a_1,\dots,a_K\}$ (Q1) :
$$\mathbb P_{\mathbf q}(X_1\ne x,\dots,X_n\ne x)=\mathbb P(X\ne x)^n=(1-K^{-1})^n.$$

**Q7.**
1. De Q4 :
$$\sup_{\mathbb P}\{\mathbb E_n[\mathbb P(Y\ne g_n(X;D_n)\mid D_n)]-R^*_{\mathbb P}\}\ge\frac1{2^K}\sum_{\mathbf q\in\{0,1\}^K}\mathbb E_{D_n\sim\mathbb P_{n,\mathbf q},(X,Y)\sim\mathbb P_{\mathbf q}}\big[\mathbb E_{\mathbf q}[\mathbb 1_{\{Y\ne g_n(X;D_n)\}}\mid X,D_n]\mathbb 1_{\{X\notin\{X_1,\dots,X_n\}\}}\big].$$
2. Il vient ensuite de Q5 (on ne garde que les $\mathbf q$ pour lesquels l'espérance conditionnelle vaut 1, les autres contribuent 0) :
$$\sup_{\mathbb P}\{\cdots\}\ge\frac1{2^K}\sum_{\mathbf q\in\{0,1\}^K:\ \mathbb E_{\mathbf q}[\mathbb 1_{\{Y\ne g_n(x;D_n)\}}\mid D_n]=1}\mathbb E_{D_n\sim\mathbb P_{n,\mathbf q},(X,Y)\sim\mathbb P_{\mathbf q}}\big[\mathbb 1_{\{X\notin\{X_1,\dots,X_n\}\}}\big].$$
3. D'après Q6 (**tour des espérances**, en conditionnant par $X$) :
$$\sup_{\mathbb P}\{\cdots\}\ge\frac{\mathrm{Card}(\{\mathbf q\in\{0,1\}^K:\mathbb E_{\mathbf q}[\mathbb 1_{\{Y\ne g_n(x;D_n)\}}\mid D_n]=1\})}{2^K}\Big(1-\frac1K\Big)^n.$$
4. En appliquant de nouveau Q5 (cardinal $2^{K-1}$) :
$$\sup_{\mathbb P}\{\mathbb E_n[\mathbb P(Y\ne g_n(X;D_n)\mid D_n)]-R^*_{\mathbb P}\}\ge\frac12\Big(1-\frac1K\Big)^n.$$
5. Comme $\mathsf X$ est **infini**, on peut appliquer l'inégalité précédente pour **toute valeur de $K$**. En prenant la **limite $K\to\infty$** ($(1-1/K)^n\to1$ à $n$ fixé), on obtient (2).

*[Extracteur]* Le passage Q4 → Q7 est rédigé de manière informelle dans le corrigé : l'ensemble des $\mathbf q$ « favorables » dépend de $(x,D_n)$ et la loi de $D_n$ dépend de $\mathbf q$, donc l'échange « somme sur $\mathbf q$ / espérance » est implicite. L'argument rigoureux (Poly ch.9, Compléments §4.1) utilise que, si $\mathbf q$ est tiré **uniformément** sur $\{0,1\}^K$ indépendamment des $X_i$ (dont la loi ne dépend pas de $\mathbf q$, Q1), alors pour $X\notin\{X_1,\dots,X_n\}$ la coordonnée $q_X$ est uniforme et **indépendante** des étiquettes observées : la règle se trompe avec probabilité $1/2$. On obtient l'identité $\frac1{2^K}\sum_{\mathbf q}\mathbb E_{n,\mathbf q}[\dots]\ge\frac12(1-1/K)^n$. La phrase « de façon indépendante de $D_n$ » de Q5 est à lire « indépendamment de la valeur de $q_i$ » ($a_i$ non observé).

**Méthodes mobilisées**
- Construction d'une famille de lois « difficiles » paramétrée par les étiquetages $\mathbf q\in\{0,1\}^K$ (argument probabiliste / méthode de Le Cam-type).
- Formule des probabilités totales ; décomposition du risque selon les valeurs de $X$.
- Sup ≥ moyenne (« la moyenne est inférieure au maximum »).
- Minoration par restriction à un événement ($X$ non observé) ; tour des espérances ; mesurabilité par rapport à $\sigma(X,D_n)$.
- Dénombrement des étiquetages ($2^{K-1}$ / $2^{K-1}$) ; symétrie.
- Indépendance + loi uniforme ⇒ $(1-1/K)^n$ ; passage à la limite $K\to\infty$.

**Pièges relevés / remarques du corrigé**
- Les lois $\mathbb P_{\mathbf q}$ ont **toutes un risque bayésien nul** ($R^*_{\mathbb P_{\mathbf q}}=0$) : le problème est « facile » pour chaque loi, mais aucune règle ne peut être bonne **uniformément** sur toutes.
- Le $\sup_{\mathbb P}$ est **devant** l'espérance : (2) n'empêche pas la consistance universelle (pour chaque loi fixée), seulement la consistance **uniforme** (cf. Poly ch.9, Th. 1.1 et sa forme faible : vitesse arbitrairement lente).
- Il faut $K\gg n$ pour que $(1-1/K)^n\approx1$ : les points de test sont alors presque toujours non observés.
- *[Extracteur]* Labels dans $\{0,1\}$ ici, alors que le poly (Th. 1.1, §4.1) travaille avec $\{-1,1\}$ et $\mathbf b$, $\mathbb P_{\mathbf b}$. Le Th. 1.1 du poly s'énonce « pour tout $n$ et tout $\varepsilon>0$, il existe $\mathbb P$ avec $R^\star=0$ et $\mathbb E[R(\widehat g_n)]\ge\frac12-\varepsilon$ » : c'est la même borne $\frac12(1-1/K)^n\ge\frac12-\varepsilon$ pour $K$ grand.

**Résultats numériques** *[Extracteur]*
- $n=100$, $K=10^4$ : $\frac12(1-10^{-4})^{100}\approx0{,}495$.
- $n=100$, $K=1000$ : $\frac12(1-10^{-3})^{100}\approx0{,}452$.

---

### Exercice 7 — Classifieurs par hyperplan $(\star\star\star)$

**Source :** Énoncé PC9, p. 6–7 ; Corrigé PC9, p. 18–20. Poly ch.9, Prop. 1.2 et Compléments §4.6 (Lemme 4.2, admis) ; Th. 1.3 (Hoeffding unilatéral) ; Outils §2.6 (borne de l'union) ; Poly ch.8, Prop. 2.5.

**Énoncé complet**

On considère le problème de classification binaire. On dispose d'un ensemble d'apprentissage $\{(\mathbf X_i,Y_i)\}_{i=1}^n$ de variables aléatoires i.i.d. définies sur un espace de probabilité $(\Omega,\mathcal F,\mathbb P)$. La loi de l'attribut $\mathbf X\in\mathbb R^d$, conditionnellement au label $Y=i$, $i\in\{0,1\}$, est absolument continue par rapport à la mesure de Lebesgue $\mathrm{Leb}$ sur $\mathbb R^d$, de densité notée $f_i$. On note $p=\mathbb P(Y=1)$. On considère la famille $\mathcal C$ des classifieurs par hyperplan, définie par
$$\mathcal C=\{g_{\mathbf a,b}(\mathbf x)=\mathbb 1_{\{\mathbf a^\top\mathbf x+b\ge0\}},\ (\mathbf a,b)\in\mathbb R^d\times\mathbb R\}.\tag{3}$$
Pour un classifieur $g:\mathbb R^d\to\{0,1\}$, nous notons le risque associé à la perte 0-1 par
$$R(g)=\mathbb P(g(\mathbf X)\ne Y).$$
Le risque empirique est défini par
$$\widehat{\mathrm R}_n(g)=\frac1n\sum_{i=1}^n\mathbb 1_{\{g(\mathbf X_i)\ne Y_i\}}.$$
Nous notons
- $L^\star=\inf_{g\in\mathcal C}R(g)$ le minimum du risque 0-1 sur la classe $\mathcal C$.
- $g^\star\in\mathcal C$ un classifieur atteignant le minimum (nous admettrons que le minimum est atteint pour au moins un classifieur), $L^\star=L(g^\star)$.
- $F_{i,\mathbf a}(z)=\mathbb P(\mathbf a^\top\mathbf X\le z\mid Y=i)$, $i\in\{0,1\}$.

1. Démontrer que, pour tout $(\mathbf a,b)\in\mathbb R^{d+1}$,
$$R(g_{\mathbf a,b})=pF_{1,\mathbf a}(-b)+(1-p)\{1-F_{0,\mathbf a}(-b)\}.$$
2. Démontrer que, pour tout $(\mathbf a,b)\in\mathbb R^{d+1}$,
$$R(g_{-\mathbf a,-b})=p\{1-F_{1,\mathbf a}(-b)\}+(1-p)F_{0,\mathbf a}(-b).$$
3. En déduire que, pour tout $(\mathbf a,b)\in\mathbb R^{d+1}$,
$$\min(R(g_{\mathbf a,b}),R(g_{-\mathbf a,-b}))=\frac12-|pF_{1,\mathbf a}(-b)-(1-p)F_{0,\mathbf a}(-b)+(1/2-p)|.$$
[indication : on pourra utiliser $\min(u,v)=(1/2)(u+v-|u-v|)$.]
4. Montrer que si $p\ne1/2$, $R^\star\le\min_{(\mathbf a,b)\in\mathbb R^{d+1}}R(g_{\mathbf a,b})<1/2$.
5. Montrer que si $p=1/2$, $\min_{(\mathbf a,b)\in\mathbb R^{d+1}}R(g_{\mathbf a,b})<1/2$ si et seulement si
$$\mathrm{Leb}\big(\big\{\mathbf x\in\mathbb R^d:\ f_1(\mathbf x)\ne f_0(\mathbf x)\big\}\big)>0.$$

Nous supposons dans la suite que $d<n$. Pour tout ensemble $(\mathbf z_1,\mathbf z_2,\dots,\mathbf z_d)\in\mathbb R^n$ de $d$ points, nous notons $\Pi_{\mathbf z_{1d}}$ le projecteur (affine) orthogonal sur le sous-espace affine engendré par les points $(\mathbf z_1,\dots,\mathbf z_d)$ : pour tout $\mathbf z\in\mathbb R^n$,
- $\Pi_{\mathbf z_1,\dots,\mathbf z_d}(\mathbf z)$ est un élément de l'espace affine engendré par les points $(\mathbf z_1,\dots,\mathbf z_d)$ ;
- $\mathbf z-\Pi_{\mathbf z_1,\dots,\mathbf z_d}(\mathbf z)$ est orthogonal au sous-espace linéaire $(\mathbf z_2-\mathbf z_1,\dots,\mathbf z_d-\mathbf z_1)$.

Pour tout $d$-uplet $1\le i_1<\dots<i_d\le n$ et $z\in\{-1,1\}$, nous considérons le classifieur
$$\hat g_{n,i_{1d},z}(\mathbf x)=\mathbb 1_{\{z(\{\mathbf x-\Pi_{i_{1d}}(\mathbf x)\}^\top\Pi_{i_{1d}}(\mathbf 0_{n\times1}))\ge0\}}\tag{4}$$
où nous avons posé $i_{1d}=(i_1,\dots,i_d)$ et
$$\Pi_{i_{1d}}=\Pi_{\mathbf X_{i_1},\dots,\mathbf X_{i_d}}$$
est le projecteur orthogonal sur le sous-espace affine engendré par les points $(\mathbf X_{i_1},\dots,\mathbf X_{i_d})$. On pourra vérifier que $\hat g_{n,i_{1d},1}$ est le classifieur de $\mathcal C$ dont l'hyperplan $\mathbf a^T\mathbf x+b$ est l'unique hyperplan affine passant par les points $(\mathbf X_{i_1},\dots,\mathbf X_{i_d})$. Nous notons $\mathcal C_n$ l'ensemble de ces classifieurs et
$$\hat g_n^\star=\min_{g\in\mathcal C_n}\widehat{\mathrm R}_n(g).$$
Il est possible de montrer que, pour tout $g\in\mathcal C$, où $\mathcal C$ est défini dans (3), nous avons
$$\widehat{\mathrm R}_n(\hat g_n^\star)\le\widehat{\mathrm R}_n(g)+\frac dn.$$
Nous admettrons ce résultat pour la suite de l'exercice.

6. Montrer que le nombre de classifieurs distincts de l'ensemble $\mathcal C_n$ est au plus égal à $2\binom nd$.
7. Montrer que
$$R(\hat g_n^\star)-R^\star\le\max_{g\in\mathcal C_n}\{R(g)-\widehat{\mathrm R}_n(g)\}+\widehat{\mathrm R}_n(g^\star)-R(g^\star)+\frac dn.$$
8. Montrer que, pour tout $\varepsilon>0$,
$$\mathbb P(R(\hat g_n^\star)-R^\star\ge\varepsilon)\le\sum_{z\in\{-1,+1\}}\sum_{1\le i_1<\dots<i_d\le n}\mathbb P\big(R(\hat g_{n,i_{1d},z})-\widehat{\mathrm R}_n(\hat g_{n,i_{1d},z})\ge\varepsilon/2\big)+\mathbb P\big(\widehat{\mathrm R}_n(g^\star)-R(g^\star)+d/n\ge\varepsilon/2\big).$$
9. Montrer que, pour tout $\varepsilon\in]0,1[$ et $n$ tel que $2d/n\le\varepsilon\le1$, nous avons
$$\mathbb P\big(\widehat{\mathrm R}_n(g^\star)-R(g^\star)\ge\varepsilon/2-d/n\big)\le e^{2d\varepsilon}e^{-n\varepsilon^2/2}.$$
10. Montrer que, pour tout $\varepsilon\in]0,1[$, $n$ tel que $2d/n\le\varepsilon\le1$, $1\le i_1<\dots<i_d\le n$ et $z\in\{-1,1\}$, nous avons
$$\mathbb P\big(R(\hat g_{n,i_{1d},z})-\widehat{\mathrm R}_n(\hat g_{n,i_{1d},z})\ge\varepsilon/2\,\big|\,\mathbf X_{i_1},\dots,\mathbf X_{i_d}\big)\le e^{2d\varepsilon}e^{-n\varepsilon^2/2}.$$
11. Montrer que, pour tout $\delta\in]0,1[$ et $\varepsilon\in]0,1[$, il existe $n_0(\varepsilon,\delta,d)$ tel que, pour tout $n\ge n_0(\varepsilon,\delta,d)$, on a, avec une probabilité supérieure à $1-\delta$,
$$R(\hat g_n^\star)-R^\star\le\varepsilon.$$
12. Déterminer une borne de l'excès de risque moyen du classifieur
$$\mathbb E[R(\hat g_n^\star)]-R^\star.$$

**Corrigé complet question par question**

**Q1.** Le classifieur se trompe si (il prédit 1 et $Y=0$) ou (il prédit 0 et $Y=1$) — **événements disjoints** :
$$R(g_{\mathbf a,b})=\mathbb P(\mathbf a^\top\mathbf X+b\ge0\cap Y=0)+\mathbb P(\mathbf a^\top\mathbf X+b<0\cap Y=1)=(1-p)(1-F_{0,\mathbf a}(-b))+pF_{1,\mathbf a}(-b).$$
*[Extracteur]* On conditionne par $Y$ : $\mathbb P(\mathbf a^\top\mathbf X<-b\mid Y=1)=F_{1,\mathbf a}(-b)$ car la loi de $\mathbf a^\top\mathbf X$ sachant $Y$ n'a pas d'atome (densité, $\mathbf a\ne0$) ; et $\mathbb P(\mathbf a^\top\mathbf X\ge-b\mid Y=0)=1-F_{0,\mathbf a}(-b)$ (même remarque).

**Q2.** D'après Q1 (appliquée à $(-\mathbf a,-b)$) :
$$R(g_{-\mathbf a,-b})=(1-p)(1-F_{0,-\mathbf a}(b))+pF_{1,-\mathbf a}(b).$$
Comme pour tout couple $\mathbf a,b$, $F_{i,\mathbf a}(b)=1-F_{i,-\mathbf a}(-b)$ (*[Extracteur]* : $\mathbb P(-\mathbf a^\top\mathbf X\le-b\mid Y=i)=\mathbb P(\mathbf a^\top\mathbf X\ge b\mid Y=i)$, sans atome), on en déduit
$$R(g_{-\mathbf a,-b})=(1-p)F_{0,\mathbf a}(-b)+p(1-F_{1,\mathbf a}(-b)).$$

**Q3.** On calcule la somme et la différence :
$$R(g_{-\mathbf a,-b})+R(g_{\mathbf a,b})=(1-p)F_{0,\mathbf a}(-b)+p(1-F_{1,\mathbf a}(-b))+(1-p)(1-F_{0,\mathbf a}(-b))+pF_{1,\mathbf a}(-b)=1,$$
$$\begin{aligned}R(g_{-\mathbf a,-b})-R(g_{\mathbf a,b})&=(1-p)F_{0,\mathbf a}(-b)+p(1-F_{1,\mathbf a}(-b))-(1-p)(1-F_{0,\mathbf a}(-b))-pF_{1,\mathbf a}(-b)\\&=(1-p)(2F_{0,\mathbf a}(-b)-1)+p(1-2F_{1,\mathbf a}(-b))\\&=-2\big[-(1-p)F_{0,\mathbf a}(-b)+pF_{1,\mathbf a}(-b)+(1/2-p)\big].\end{aligned}$$
D'après l'indication $\min(u,v)=\frac12(u+v-|u-v|)$ :
$$\min(R(g_{-\mathbf a,-b}),R(g_{\mathbf a,b}))=\frac12-\big|-(1-p)F_{0,\mathbf a}(-b)+pF_{1,\mathbf a}(-b)+(1/2-p)\big|.$$

**Q4.** On prend la **limite du majorant lorsque $b\to+\infty$** ($F_{i,\mathbf a}(-b)\to0$, propriété des f.d.r.) ; on en déduit, si $p\ne1/2$,
$$\min_{\mathbf a,b}R(g_{-\mathbf a,-b})\le\frac12-|1/2-p|<1/2.$$
*[Extracteur]* $(\mathbf a,b)\mapsto(-\mathbf a,-b)$ est une bijection de $\mathbb R^{d+1}$, donc $\min_{\mathbf a,b}R(g_{-\mathbf a,-b})=\min_{\mathbf a,b}R(g_{\mathbf a,b})$ ; et $R^\star\le\min R(g_{\mathbf a,b})$ car le risque bayésien minore le risque de tout classifieur. Interprétation : la règle constante « prédire la classe majoritaire » (hyperplan rejeté à l'infini) a déjà un risque $\min(p,1-p)<1/2$.

**Q5.** Supposons $p=1/2$ ; Q3 donne $\min(R(g_{\mathbf a,b}),R(g_{-\mathbf a,-b}))=\frac12-\frac12|F_{1,\mathbf a}(-b)-F_{0,\mathbf a}(-b)|$.
1. ($\Rightarrow$) S'il existe $\mathbf a,b$ tels que $-F_{0,\mathbf a}(-b)+F_{1,\mathbf a}(-b)\ne0$, alors $\mathrm{Leb}(\{\mathbf x\in\mathbb R^d:f_1(\mathbf x)\ne f_0(\mathbf x)\})>0$ (*[Extracteur]* : sinon $f_1=f_0$ p.p., les deux lois conditionnelles seraient égales, et toutes les $F_{1,\mathbf a}=F_{0,\mathbf a}$).
2. ($\Leftarrow$) Réciproquement, si $\mathrm{Leb}(\{\mathbf x\in\mathbb R^d:f_1(\mathbf x)\ne f_0(\mathbf x)\})>0$, alors il existe $\mathbf a$ et $b$ tels que $-F_{0,\mathbf a}(-b)+F_{1,\mathbf a}(-b)\ne0$. Donc
$$\Big|-\frac12F_{0,\mathbf a}(-b)+\frac12F_{1,\mathbf a}(-b)+\frac12-\frac12\Big|>0,$$
et ainsi
$$\min_{\mathbf a,b}R(g_{-\mathbf a,-b})\le\frac12-\Big|-\frac12F_{0,\mathbf a}(-b)+\frac12F_{1,\mathbf a}(-b)+\frac12-\frac12\Big|<1/2.$$
*[Extracteur]* L'existence de $(\mathbf a,b)$ n'est pas justifiée dans le corrigé : si $f_1\ne f_0$ sur un ensemble de mesure positive, les deux lois conditionnelles sont **distinctes** ; or une loi sur $\mathbb R^d$ est caractérisée par les probabilités des demi-espaces $\{\mathbf a^\top\mathbf x\le z\}$ (les lois de toutes les projections $\mathbf a^\top\mathbf X$ déterminent la loi de $\mathbf X$ — Cramér-Wold, via la fonction caractéristique). Le sens « $\min<1/2\Rightarrow\mathrm{Leb}>0$ » découle du point 1 (un min $<1/2$ impose un $(\mathbf a,b)$ avec $F_{1,\mathbf a}(-b)\ne F_{0,\mathbf a}(-b)$).

**Q6** [item 6 du corrigé]. Considérons l'ensemble $\mathcal A$ des couples $(A,z)$, où $A\subset\{1,\dots,n\}$ est de cardinal $d$ et $z\in\{-1,1\}$. Le cardinal de $\mathcal A$ est clairement égal à $2\binom nd$. On peut, à tout couple $(A,z)$ de $\mathcal A$, associer le classifieur $g_{A,z}$ de $\mathcal C_n$ défini par $\hat g_{n,i_{1d},z}(\mathbf x)$, avec $A=\{i_{1d}\}$. L'application $(A,z)\mapsto g_{A,z}$ réalise **une surjection** (par construction de $\mathcal C_n$) de $\mathcal A$ sur $\mathcal C_n$, ce qui montre que le cardinal de $\mathcal C_n$ est inférieur à celui de $\mathcal A$, donc à $2\binom nd$.

**Résultat admis — esquisse de preuve** [item 7 du corrigé]. Soit $g\in\mathcal C$ et $i_1,\dots,i_k$ l'ensemble des indices des points $\mathcal C_1$ de la forme $\mathbf X_i$ tels que $g(\mathbf X_i)=1$, $i_{k+1},\dots,i_n$ les indices des points $\mathcal C_0$ tels que $g(\mathbf X_i)=0$. Les **enveloppes convexes** des points $\mathbf X_{i_1},\dots,\mathbf X_{i_k}$ et des points $\mathbf X_{i_{k+1}},\dots,\mathbf X_{i_n}$ sont disjointes et les bords de ces enveloppes convexes sont des hyperplans affines définissant les classifieurs de $\mathcal C_n$. Parmi ces classifieurs, il en existe au moins un définissant les mêmes classes que $g$, sauf peut-être en les $d$ points le définissant. On a donc
$$\forall g\in\mathcal C,\ \exists h\in\mathcal C_n:\qquad\widehat{\mathrm R}_n(h)\le\widehat{\mathrm R}_n(g)+\frac dn.$$
*[Extracteur]* Ce n'est qu'une **esquisse** (le résultat est **admis** dans l'énoncé, et c'est le Lemme 4.2 du poly, lui aussi admis — Compléments §4.6 ; preuve dans Devroye–Györfi–Lugosi, ch. 4). Comme $\hat g^\star_n$ minimise $\widehat{\mathrm R}_n$ sur $\mathcal C_n$, on en déduit $\widehat{\mathrm R}_n(\hat g_n^\star)\le\widehat{\mathrm R}_n(h)\le\widehat{\mathrm R}_n(g)+d/n$.

**Q7** [item 8 du corrigé].
1. **Décomposition** :
$$R(\hat g_n^\star)-R^\star=R(\hat g_n^\star)-\widehat{\mathrm R}_n(\hat g_n^\star)+\widehat{\mathrm R}_n(\hat g_n^\star)-\widehat{\mathrm R}_n(g^\star)+\widehat{\mathrm R}_n(g^\star)-R^\star.$$
2. On a clairement ($\hat g_n^\star\in\mathcal C_n$) $R(\hat g_n^\star)-\widehat{\mathrm R}_n(\hat g_n^\star)\le\max_{g\in\mathcal C_n}\{R(g)-\widehat{\mathrm R}_n(g)\}$.
3. D'après le **résultat admis** (appliqué à $g=g^\star\in\mathcal C$) : $\widehat{\mathrm R}_n(\hat g_n^\star)-\widehat{\mathrm R}_n(g^\star)\le d/n$.
4. Le résultat se déduit de ces trois bornes (avec $R^\star=R(g^\star)$).

**Q8** [item 9 du corrigé].
1. Par Q7 (inclusion d'événements) :
$$\mathbb P(R(\hat g_n^\star)-R^\star\ge\varepsilon)\le\mathbb P\Big(\max_{g\in\mathcal C_n}\{R(g)-\widehat{\mathrm R}_n(g)\}+\widehat{\mathrm R}_n(g^\star)-R^\star+\frac dn\ge\varepsilon\Big).$$
2. On utilise que **$A+B\ge x$ seulement si $A\ge x/2$ ou $B\ge x/2$** (valable pour tout réel $x$), puis la sous-additivité :
$$\mathbb P(R(\hat g_n^\star)-R^\star\ge\varepsilon)\le\mathbb P\Big(\max_{g\in\mathcal C_n}\{R(g)-\widehat{\mathrm R}_n(g)\}\ge\varepsilon/2\Big)+\mathbb P\Big(\widehat{\mathrm R}_n(g^\star)-R^\star+\frac dn\ge\varepsilon/2\Big).$$
3. Enfin, **borne d'union** pour le premier terme :
$$\mathbb P\Big(\max_{g\in\mathcal C_n}\{R(g)-\widehat{\mathrm R}_n(g)\}\ge\varepsilon/2\Big)\le\sum_{g\in\mathcal C_n}\mathbb P\big(R(g)-\widehat{\mathrm R}_n(g)\ge\varepsilon/2\big),$$
*[Extracteur]* puis on indexe $\mathcal C_n$ par les $(z,i_{1d})$ (Q6 : surjection), ce qui donne la double somme de l'énoncé. ($\mathcal C_n$ étant aléatoire, il est plus propre d'écrire directement $\max_{g\in\mathcal C_n}=\max_{z,i_{1d}}$ puis l'union sur les $2\binom nd$ indices déterministes.)

**Q9** [item 10 du corrigé]. D'après l'**inégalité d'Hoeffding** (unilatérale, $g^\star$ fixée, indicatrices i.i.d. dans $[0,1]$) :
$$\mathbb P\Big(\widehat{\mathrm R}_n(g^\star)-R^\star\ge\varepsilon/2-\frac dn\Big)\le e^{-2n(\frac\varepsilon2-\frac dn)^2}\le e^{2\varepsilon d}e^{-n\frac{\varepsilon^2}2}.$$
*[Extracteur]* La condition $2d/n\le\varepsilon$ assure $\varepsilon/2-d/n\ge0$ (Hoeffding s'applique à un seuil positif). Développement : $-2n(\frac\varepsilon2-\frac dn)^2=-\frac{n\varepsilon^2}2+2\varepsilon d-\frac{2d^2}n\le2\varepsilon d-\frac{n\varepsilon^2}2$.

**Q10** [item 11 du corrigé].
1. On sépare les indices de $i_{1d}$ :
$$\begin{aligned}R(\hat g_{n,i_{1d},z})-\widehat{\mathrm R}_n(\hat g_{n,i_{1d},z})&=\frac1n\sum_{j=1}^n\{R(\hat g_{n,i_{1d},z})-\mathbb 1_{\{\hat g_{n,i_{1d},z}(\mathbf X_j)\ne Y_j\}}\}\\&=\frac1n\sum_{j\notin i_{1d}}\{R(\hat g_{n,i_{1d},z})-\mathbb 1_{\{\hat g_{n,i_{1d},z}(\mathbf X_j)\ne Y_j\}}\}+\frac1n\sum_{j\in i_{1d}}\{R(\hat g_{n,i_{1d},z})-\mathbb 1_{\{\hat g_{n,i_{1d},z}(\mathbf X_j)\ne Y_j\}}\}\\&\le\frac1n\sum_{j\notin i_{1d}}\{R(\hat g_{n,i_{1d},z})-\mathbb 1_{\{\hat g_{n,i_{1d},z}(\mathbf X_j)\ne Y_j\}}\}+\frac dn,\end{aligned}$$
(chaque terme d'indice $j\in i_{1d}$ est $\le R\le1$), où l'on a utilisé $R(\hat g_{n,i_{1d},z})=\mathbb P(\hat g_{n,i_{1d},z}(\mathbf X_j)\ne Y_j\mid\mathbf X_{i_1},\dots,\mathbf X_{i_d})$ pour $j\notin i_{1d}$ (**conditionnement par une variable indépendante**, Poly ch.8, Prop. 2.5 : le classifieur ne dépend que de $\mathbf X_{i_1},\dots,\mathbf X_{i_d}$, indépendants des $(\mathbf X_j,Y_j)$, $j\notin i_{1d}$).
2. On en déduit, en appliquant l'**inégalité de Hoeffding** conditionnellement à $\mathbf X_{i_1},\dots,\mathbf X_{i_d}$ aux $n-d$ termes $j\notin i_{1d}$ (i.i.d., centrés, dans un intervalle de longueur 1), au seuil $\frac n{n-d}(\frac\varepsilon2-\frac dn)$ pour leur moyenne :
$$\mathbb P\Big(\frac1n\sum_{j=1}^n\{R(\hat g_{n,i_{1d},z})-\mathbb 1_{\{\hat g_{n,i_{1d},z}(\mathbf X_j)\ne Y_j\}}\}\ge\varepsilon/2\,\Big|\,\mathbf X_{i_1},\dots,\mathbf X_{i_d}\Big)\le e^{-2\frac{n^2}{n-d}(\frac\varepsilon2-\frac dn)^2}\le e^{2\varepsilon d}e^{-n\frac{\varepsilon^2}2}.$$
*[Extracteur]* La dernière inégalité : $\frac{n^2}{n-d}\ge n$, puis le même développement qu'en Q9.

**Q11** [item 12 du corrigé].
1. En injectant les bornes de Q9 et Q10 dans la majoration de Q8 (*[Extracteur]* : la borne conditionnelle de Q10 donne la même borne non conditionnelle par **tour des espérances** ; il y a $2\binom nd$ termes de la première sorte et 1 de la seconde) :
$$\mathbb P(R(\hat g_n^\star)-R^\star\ge\varepsilon)\le\Big(2\binom nd+1\Big)e^{2\varepsilon d}e^{-n\frac{\varepsilon^2}2}\le\Big(2e^{d\log(e\frac nd)}+1\Big)e^{2\varepsilon d}e^{-n\frac{\varepsilon^2}2}.$$
*[Extracteur]* : on utilise la majoration classique $\binom nd\le(en/d)^d=e^{d\log(en/d)}$, non justifiée dans le corrigé.
2. On choisit alors $n$ assez grand pour que
$$\log\Big(2e^{d\log(e\frac nd)}+1\Big)+2\varepsilon d-n\frac{\varepsilon^2}2\le-\log1/\delta,$$
ce qui est possible car, lorsque $n\to\infty$, $\log\big(2e^{d\log(e\frac nd)}+1\big)\sim\log n$ et donc
$$\log\Big(2e^{d\log(e\frac nd)}+1\Big)+2\varepsilon d-n\frac{\varepsilon^2}2\sim-n\frac{\varepsilon^2}2.$$
Pour ces $n$ (et $n\ge2d/\varepsilon$), $\mathbb P(R(\hat g_n^\star)-R^\star\ge\varepsilon)\le\delta$.
*[Extracteur]* Plus précisément $\log(2e^{d\log(en/d)}+1)\sim d\log n$ ; la conclusion (terme dominant $-n\varepsilon^2/2$) est inchangée.

**Q12 — pas de corrigé officiel.** *[Extracteur — indication non officielle, à ne pas présenter comme le corrigé]* Même méthode que l'Exo 4 Q4(b) / Poly ch.9, Compléments Lemme 4.1 : $Z:=R(\hat g_n^\star)-R^\star\in[0,1]$, donc $\mathbb E[Z]=\int_0^1\mathbb P(Z\ge\varepsilon)\mathrm d\varepsilon\le\varepsilon_0+\int_{\varepsilon_0}^1(2\binom nd+1)e^{2\varepsilon d}e^{-n\varepsilon^2/2}\mathrm d\varepsilon$ pour tout $\varepsilon_0\ge2d/n$ ; avec $e^{2\varepsilon d}\le e^{2d}$ et $\int_{\varepsilon_0}^\infty e^{-n\varepsilon^2/2}\mathrm d\varepsilon\le e^{-n\varepsilon_0^2/2}\sqrt{\pi/(2n)}$, puis $\varepsilon_0\approx\sqrt{2\log((2\binom nd+1)e^{2d})/n}$, on obtient une borne d'ordre $O\big(\sqrt{d\log(n)/n}\big)$, cohérente avec la Prop. 1.2 du poly (borne en probabilité $\frac{2d}n+2\sqrt{\log((2\binom nd+1)/\delta)/(2(n-d))}$) et avec la remarque du poly « borne en espérance par intégration de la queue comme au Lemme 4.1 ».

**Méthodes mobilisées**
- Expression du risque 0-1 par conditionnement sur $Y$ et fonctions de répartition des projections $\mathbf a^\top\mathbf X$ ; absence d'atome (densité) ; symétrie $F_{i,\mathbf a}(b)=1-F_{i,-\mathbf a}(-b)$.
- Identité $\min(u,v)=\frac12(u+v-|u-v|)$ ; passage à la limite $b\to+\infty$ (f.d.r.).
- Caractérisation d'une loi par ses demi-espaces (implicite en Q5).
- Dénombrement par surjection ($|\mathcal C_n|\le2\binom nd$) ; lemme combinatoire admis (enveloppes convexes).
- Décomposition de l'excès de risque (ajout/retrait, type Th. 1.2) ; majoration par un max sur une classe finie.
- Argument « $A+B\ge x\Rightarrow A\ge x/2$ ou $B\ge x/2$ » ; borne de l'union.
- Hoeffding unilatéral pour une règle fixée ; Hoeffding **conditionnel** après retrait des $d$ points définissant l'hyperplan (indépendance, Poly ch.8, Prop. 2.5) ; tour des espérances.
- Majoration $\binom nd\le(en/d)^d$ ; choix de $n_0(\varepsilon,\delta,d)$ par comparaison asymptotique.
- (Q12, non corrigée) intégration de la queue.

**Pièges relevés / remarques du corrigé**
- Le risque empirique de $\hat g_{n,i_{1d},z}$ n'est pas une moyenne de variables i.i.d. **indépendantes du classifieur** : les $d$ points qui définissent l'hyperplan doivent être **retirés** (coût $d/n$), d'où les termes $d/n$, $2d/n$, la condition $2d/n\le\varepsilon$ et le facteur $e^{2\varepsilon d}$.
- On ne peut pas appliquer Hoeffding à $\mathcal C$ (infinie) : on se ramène à $\mathcal C_n$, finie mais **aléatoire** (dépend des données) ; d'où le conditionnement par $\mathbf X_{i_1},\dots,\mathbf X_{i_d}$.
- La borne finale est en $\log n$ pour le cardinal : $\log|\mathcal C_n|\approx d\log n$ ⇒ vitesse $\sqrt{d\log n/n}$ (Poly ch.9, Prop. 1.2).
- *[Extracteur]* **Ambiguïté de notation $L^\star$ / $R^\star$** : l'énoncé définit $L^\star=\inf_{g\in\mathcal C}R(g)=L(g^\star)$ (avec $L$ au lieu de $R$) puis utilise $R^\star$. En Q4, $R^\star\le\min R(g_{\mathbf a,b})$ se lit avec $R^\star$ = risque bayésien ; à partir de Q7, le corrigé utilise $R^\star=R(g^\star)$ (minimum sur la classe $\mathcal C$, i.e. $L^\star$) : $R(\hat g_n^\star)-R^\star$ est alors l'**erreur d'estimation** (pas l'excès de risque bayésien).
- *[Extracteur]* Coquilles probables de l'énoncé : « $(\mathbf z_1,\dots,\mathbf z_d)\in\mathbb R^n$ » et « $\mathbf z\in\mathbb R^n$ », « $\mathbf 0_{n\times1}$ » devraient porter sur $\mathbb R^d$ (points de l'espace des attributs). « $\hat g_n^\star=\min_{g\in\mathcal C_n}\widehat{\mathrm R}_n(g)$ » est à lire $\hat g_n^\star\in\arg\min_{g\in\mathcal C_n}\widehat{\mathrm R}_n(g)$. Formule (4) reproduite telle quelle.
- *[Extracteur]* Dans le corrigé de Q1/Q2, les labels sont dans $\{0,1\}$ et $g_{\mathbf a,b}$ vaut 1 sur le demi-espace fermé ; le poly (Prop. 1.2) utilise $2\mathbb 1_{\{\cdot\}}-1$ et des labels $\pm1$ — même classe.
- *[Extracteur]* Coquilles du corrigé : Q2 « $F_{i,\mathbf a}(b)=1-F_{i,-a}(-b)$ » ($a$ non gras) ; Q10 écrit $\hat g_{n,i_{1d},z}(X_j)$ puis $(\mathbf X_j)$.

**Résultats numériques** *[Extracteur]*
- $|\mathcal C_n|\le2\binom nd$ : pour $n=100$, $d=2$ : $2\binom{100}2=9900$ ; pour $n=1000$, $d=2$ : $999\,000$.
- Pour $p=0{,}3$ : $\min_{\mathbf a,b}R(g_{\mathbf a,b})\le\frac12-|0{,}5-0{,}3|=0{,}3$ (prédire toujours 0).

---

## 2. Synthèse des méthodes de la PC

| Méthode | Exercices où elle apparaît | Résultat du poly utilisé |
|---|---|---|
| Conditionnement par une variable indépendante (« geler » $D_n$ ou les points définissant le classifieur) | Exo 1 (Q1–Q4), Exo 7 (Q10) | Poly ch.8, Prop. 2.5 ; Poly ch.9, Outils §2.8 |
| Tour des espérances $\mathbb E[\mathbb E[\cdot\mid\cdot]]$ | Exo 1 (Q3, Q4), Exo 6 (Q4, Q7), Exo 7 (Q11) | Poly ch.8, Prop. 2.2 |
| Loi binomiale conditionnelle ; variance $mp(1-p)\le m/4$ | Exo 1 (Q2, Q3) | Poly ch.9, Outils §2.5 |
| Markov / Bienaymé-Tchebychev | Exo 1 (Q3), Exo 2 (Q4) | Poly ch.2, Prop. 2.1 ; Poly ch.9, Outils §2.1 |
| Borne de Chernoff (Markov sur $e^{\lambda Z}$ + optimisation en $\lambda$) | Exo 2 (Q4, Q5) ; implicitement Exo 3 (Q1) | Poly ch.9, Outils Prop. 2.1 ; ch.4 §5 |
| Transformée de Laplace / cumulants ; additivité par indépendance | Exo 2 (Q1–Q3), Exo 3 (Q1), Exo 4 (Q2a) | Poly ch.9, Outils Déf. 2.1, Prop. 2.2 (i) |
| Variables sous-gaussiennes $\mathcal G(v)$ ; déviations $e^{-t^2/(2v)}$ | Exo 2, Exo 3 (Q1), Exo 4 (Q1, Q2) | Poly ch.9, Outils Déf. 2.1, Prop. 2.2 |
| Lemme de Hoeffding (argument de Herbst, loi basculée, Taylor-Lagrange, variance ≤ $(b-a)^2/4$) | Exo 3 (Q2–Q5), Exo 4 (Q2a) | Poly ch.9, Lemme 1.1 (preuve Outils §2.4) |
| Inégalité de Hoeffding (bilatérale ou unilatérale) | Exo 1 (Q4), Exo 3 (Q1), Exo 4 (Q4a), Exo 5 (Q1), Exo 7 (Q9, Q10) | Poly ch.9, Th. 1.3, Th. 2.1, Corollaire 2.1 |
| Inversion en taille d'échantillon / forme « $\delta$ » | Exo 1 (num.), Exo 5 (Q2, Q4), Exo 7 (Q11) | Poly ch.9, Th. 1.4, Th. 1.6 |
| Borne de l'union | Exo 1 (Q4), Exo 4 (Q4a), Exo 5 (Q4), Exo 7 (Q8) | Poly ch.9, Outils §2.6 ; Th. 1.5 |
| Jensen + max ≤ somme + optimisation en $\lambda$ (Pisier) ; symétrisation $\pm Z_i$ | Exo 4 (Q1) | Poly ch.9, Th. 1.7 ; Compléments §4.4 ; ch.2 Th. 2.2 |
| Décomposition de l'excès de risque (ajout/retrait, définition du MRE, sans-biais pour une règle fixée, sup sur la classe) | Exo 4 (Q2b, Q4b), Exo 7 (Q7) | Poly ch.9, Th. 1.2 (éq. (2)–(3)), Prop. 1.1 |
| Borne en espérance par Pisier | Exo 4 (Q2b) | Poly ch.9, Th. 1.8 |
| Intégration de la queue $\mathbb E[\lvert U\rvert]=\int_0^\infty\mathbb P(\lvert U\rvert\ge\varepsilon)\mathrm d\varepsilon$, découpage en $x$, intégrale de Gauss | Exo 4 (Q4b), Exo 7 (Q12, non corrigée) | Poly ch.9, Compléments Lemme 4.1 |
| MRE sur toutes les règles d'un $\mathsf X$ fini = vote majoritaire | Exo 4 (Q3) | Poly ch.9, Compléments §4.3 (histogrammes) |
| Classe de toutes les règles contient le classifieur bayésien ($\inf_{\mathcal C}R=R^*$) | Exo 4 (Q4a) | Poly ch.8, Th. 1.2 / Déf. 1.4 |
| Réduction d'une classe infinie à une classe finie déterminée par l'échantillon | Exo 5 (Q3), Exo 7 (Q6, résultat admis) | Poly ch.9, Prop. 1.2, Compléments §4.6, Lemme 4.2 |
| Famille de lois difficiles (étiquetages), sup ≥ moyenne, événement « point non observé », $(1-1/K)^n$ | Exo 6 | Poly ch.9, Th. 1.1 ; Compléments §4.1 |
| Risque 0-1 d'un hyperplan via les f.d.r. des projections ; $\min(u,v)=\frac12(u+v-\lvert u-v\rvert)$ | Exo 7 (Q1–Q5) | — (calcul direct ; cadre Poly ch.8) |
| Retrait des $d$ points définissant l'hyperplan + Hoeffding conditionnel | Exo 7 (Q10) | Poly ch.9, Compléments §4.6 ; Poly ch.8, Prop. 2.5 |
| Majoration $\binom nd\le(en/d)^d$ ; choix de $n_0$ | Exo 7 (Q11) | — (non justifiée dans le corrigé) |

---

## 3. Idées de reformulation en exercices interactifs sans saisie de formule

### Exercice 1 — Erreur de validation
1. **QCM** : « Conditionnellement à $D_n$, quelle est la loi de $m\hat R_{n,m}$ ? » — (a) $\mathrm{Bin}(m,R(g_n))$ ✔ ; (b) $\mathrm{Bin}(n,R(g_n))$ ; (c) $\mathcal N(R(g_n),1/m)$ ; (d) Bernoulli$(R(g_n))$. Justification attendue : indépendance test/apprentissage + même loi que $(X,Y)$.
2. **Application numérique (choix parmi des valeurs)** : « Avec $\varepsilon=0{,}05$ et une confiance $95\%$, combien de points de test faut-il au minimum avec Hoeffding ? avec Bienaymé-Tchebychev ? » — propositions : 738 / 2000 ✔ ; 400 / 1000 ; 2000 / 738 ; 100 / 400.
3. **Trouver l'erreur** : preuve où l'on écrit « $\mathbb E[\mathbb 1_{\{g_n(X_{n+j})\ne Y_{n+j}\}}]=R(g_n)$ » (sans conditionner) puis conclut $\mathcal L(m\hat R_{n,m})=\mathrm{Bin}(m,R(g_n))$ inconditionnellement — l'erreur : $R(g_n)$ est aléatoire, la loi binomiale n'est vraie que **conditionnellement à $D_n$**.

### Exercice 2 — Variables sous-gaussiennes
1. **Preuve à ordonner** (Chernoff + optimisation) : (i) Markov sur $e^{\lambda Z}$, $\lambda\ge0$ ; (ii) $\mathbb P(Z\ge t)\le\exp(-\lambda t+\psi_Z(\lambda))$ ; (iii) $\psi_Z(\lambda)\le\lambda^2v/2$ ; (iv) maximiser $\lambda t-\lambda^2v/2$, $\lambda_\star=t/v$ ; (v) $\mathbb P(Z\ge t)\le e^{-t^2/(2v)}$ ; (vi) $\psi_{-Z}(\lambda)=\psi_Z(-\lambda)$ ⇒ même borne pour $-Z$.
2. **Vrai/faux** : « $X\in\mathcal G(v)$ implique $\mathrm{Var}(X)=v$ » (Faux : seulement $\le v$) ; « Une Rademacher est dans $\mathcal G(1)$ » (Vrai) ; « Si $X_i\in\mathcal G(v_i)$ indépendantes, $\sum X_i\in\mathcal G(\max v_i)$ » (Faux : $\sum v_i$) ; « Dans Chernoff, on optimise sur $\lambda\in\mathbb R$ » (Faux : $\lambda\ge0$).
3. **Étape suivante à choisir** (Rademacher) : après $\mathbb E[e^{\lambda X}]=\sum_q\lambda^{2q}/(2q)!$, quelle inégalité utiliser ? — (a) $(2q)!\ge2^qq!$ ✔ ; (b) $(2q)!\ge(q!)^2$ ; (c) Jensen ; (d) Taylor-Lagrange.

### Exercice 3 — Lemme d'Hoeffding
1. **Associer** : $\psi_X(0)$ ↔ $0$ ; $\psi_X'(0)$ ↔ $\mathbb E[X]$ ; $\psi_X'(\lambda)$ ↔ moyenne sous $\mu_\lambda$ ; $\psi_X''(\lambda)$ ↔ variance sous $\mu_\lambda$ ; $\sup_\lambda\psi_X''(\lambda)$ ↔ $\le(b-a)^2/4$.
2. **Preuve à ordonner** (argument de Herbst) : définir $\mu_\lambda$ ; calculer $\psi'$, $\psi''$ ; montrer que $\mu_\lambda$ est portée par $[a,b]$ ; $\mathrm{Var}(Y)\le\mathbb E[(Y-\frac{a+b}2)^2]\le\frac{(b-a)^2}4$ ; Taylor-Lagrange à l'ordre 2 en 0 ; conclure $\psi_X(\lambda)\le\lambda m+\frac{\lambda^2}8(b-a)^2$.
3. **QCM** : « Pour $Z_k\in[a_k,b_k]$ indépendantes, $S_n-\mathbb E[S_n]$ appartient à » — (a) $\mathcal G(D_n/4)$ ✔ ; (b) $\mathcal G(D_n)$ ; (c) $\mathcal G(D_n/8)$ ; (d) $\mathcal G(\max_k(b_k-a_k)^2)$ ; puis « la borne de déviation est » $e^{-2t^2/D_n}$ ✔ / $e^{-t^2/(2D_n)}$ / $e^{-t^2/D_n}$.

### Exercice 4 — Inégalité de Pisier
1. **Trouver l'erreur** : preuve de Pisier qui écrit « $\mathbb E[\max_iZ_i]\le\sum_i\mathbb E[Z_i]$ » ou qui suppose les $Z_i$ indépendantes — l'erreur : la bonne voie est Jensen sur $e^{\lambda\max}$ puis max ≤ somme **des exponentielles** ; aucune indépendance requise.
2. **QCM** (valeur de la borne) : « $\mathbb E[\max_{i\le m}|Z_i|]\le$ ? » — $\sigma\sqrt{2\log(2m)}$ ✔ / $\sigma\sqrt{2\log m}$ / $\sigma\sqrt{m}$ / $m\sigma$. Et « Les $R_n(g)-R(g)$ sont sous-gaussiennes de facteur » $1/(4n)$ ✔ / $1/n$ / $1/(8n)$ / $n/4$.
3. **Étape suivante à choisir** (Q4b) : après $\mathbb E[R(g^*_n)-R^*]\le\int_0^\infty\mathbb P(\sup|R_n-R|>\varepsilon)\mathrm d\varepsilon$, que faire ? — (a) couper en $x$ : majorer par 1 sur $[0,x]$ et par $2^{K+1}e^{-2n\varepsilon^2}$ sur $[x,\infty[$ ✔ ; (b) majorer partout par $2^{K+1}e^{-2n\varepsilon^2}$ (borne $\propto2^K/\sqrt n$, inutile) ; (c) appliquer Jensen ; (d) appliquer le TCL. **Application numérique** associée : $K=10$, $n=10^4$ ⇒ borne $\approx0{,}0195$.

### Exercice 5 — Hyper-rectangles
1. **Application numérique** : « $\varepsilon=0{,}05$, $\gamma=0{,}05$ : taille minimale $k$ pour un rectangle fixé ? » — 738 ✔ / 74 / 7378 / 1476.
2. **Vrai/faux** : « $\mathcal R_{\mathsf S}$ est fini » (Vrai) ; « Pour tout $\mathsf R\in\mathcal R$ il existe $\mathsf R'\in\mathcal R_{\mathsf S}$ avec $\mathsf R\cap\mathsf P=\mathsf R'\cap\mathsf P$ » (Vrai) ; « La taille $k$ nécessaire pour une garantie uniforme croît linéairement en $n$ » (Faux : en $\log n$) ; « La borne de Q1 nécessite l'indépendance des $X_i$ » (Vrai).
3. **Preuve à ordonner** (Q4) : $|\mathcal R_{\mathsf S}|\le n^{2d}/2$ ; Hoeffding pour chaque $\mathsf R\in\mathcal R_{\mathsf S}$ ; borne de l'union ⇒ $n^{2d}e^{-2\varepsilon^2k}$ ; choix de $k$ ⇒ $\le\delta$ ; Q3 ⇒ uniformité sur $\mathcal R$.

### Exercice 6 — *No free lunch*
1. **Preuve à ordonner** : (i) restreindre le sup aux $\mathbb P_{\mathbf q}$ (risque bayésien nul) ; (ii) sup ≥ moyenne sur $\mathbf q$ ; (iii) minorer par l'événement $X\notin\{X_1,\dots,X_n\}$ ; (iv) pour un point non observé, la moitié des $\mathbf q$ font se tromper la règle ; (v) $\mathbb P(X\notin\{X_1,\dots,X_n\})=(1-1/K)^n$ ; (vi) $\frac12(1-1/K)^n$ puis $K\to\infty$.
2. **QCM** : « Que vaut $R^*_{\mathbb P_{\mathbf q}}$ ? » — 0 ✔ / $1/2$ / $1/K$ / $(1-1/K)^n$. « Que vaut $\mathbb P_{\mathbf q}(g(X)\ne Y)$ ? » — $\frac1K\sum_i\mathbb 1_{\{q_i\ne g(a_i)\}}$ ✔ / $\frac12$ / $\frac1K$ / $\sum_i\mathbb 1_{\{q_i\ne g(a_i)\}}$.
3. **Vrai/faux (interprétation)** : « Le théorème interdit toute règle universellement consistante » (Faux : il interdit la consistance **uniforme**) ; « Le résultat tient car $\mathsf X$ est infini » (Vrai) ; « Si $\mathsf X$ est fini de cardinal $K$, l'Exo 4 donne une vitesse $O(\sqrt{K/n})$ » (Vrai). **Application numérique** : $n=100$, $K=10^4$ ⇒ minorant $\approx0{,}495$.

### Exercice 7 — Classifieurs par hyperplan
1. **Associer** chaque terme à sa majoration : $R(\hat g_n^\star)-\widehat{\mathrm R}_n(\hat g_n^\star)$ ↔ $\max_{g\in\mathcal C_n}\{R(g)-\widehat{\mathrm R}_n(g)\}$ ; $\widehat{\mathrm R}_n(\hat g_n^\star)-\widehat{\mathrm R}_n(g^\star)$ ↔ $d/n$ (résultat admis) ; $\widehat{\mathrm R}_n(g^\star)-R(g^\star)$ ↔ Hoeffding pour une règle fixée ; termes $j\in i_{1d}$ ↔ $\le d/n$.
2. **Trouver l'erreur** : « on applique directement Hoeffding à $\widehat{\mathrm R}_n(\hat g_{n,i_{1d},z})$ comme moyenne de $n$ indicatrices i.i.d. » — erreur : le classifieur dépend de $\mathbf X_{i_1},\dots,\mathbf X_{i_d}$ ; il faut retirer ces $d$ points et conditionner.
3. **QCM / application numérique** : « $|\mathcal C_n|$ est au plus » — $2\binom nd$ ✔ / $n^d$ exactement / $2^n$ / $\binom nd$ ; « Si $p=0{,}3$, $\min_{\mathbf a,b}R(g_{\mathbf a,b})\le$ » — $0{,}3$ ✔ / $0{,}2$ / $0{,}5$ / $0{,}7$ ; **Vrai/faux** : « si $p=1/2$ et $f_0=f_1$ p.p., aucun hyperplan ne fait mieux que $1/2$ » (Vrai).
