# PC 1 — Identifier et construire un modèle statistique (modèles produits, modèles induits, identifiabilité)

> **Sources extraites :** `S1_APM-41033-EP-PC1-enonce` (énoncé, 8 p., « 1 Exercices ») et `S1_APM-41033-EP-PC1-corrige` (corrigé officiel, numéroté p. 9 à 27, « 2 Solutions »). Toutes les formules ont été vérifiées sur les PDF.
> **Convention de citation :** « Énoncé PC1, p. N » / « Corrigé PC1, p. N » pour la PC ; « Poly ch.1, Déf. 5 », « Poly ch.1, Th. 1.3 », « Poly ch.2, Méthode 1.1 »… pour le cours (numérotation de `content/extraction/ch1.md` et `ch2.md`).
> **Code couleur du corrigé officiel :** les passages imprimés en **bleu** dans le corrigé sont des **« Compléments »** (titres en police machine « Complément: … ») : ils vont au-delà de la question posée. Ils sont signalés ci-dessous par la mention *[Complément du corrigé]*.
> **Remarques de l'extracteur** : tout ajout qui ne figure pas dans le corrigé officiel est explicitement marqué *[Extracteur]*.

---

## 0. Chapitres du poly mobilisés et rappels donnés en tête d'énoncé

### 0.1 Chapitres mobilisés

La PC 1 est la petite classe de la **semaine 1**, associée au **chapitre 1 « Modèles statistiques »** (le poly ch.1, §1.10 « En pratique », liste explicitement les exercices 1 à 4 de cette PC et les exercices bonus 5 à 7). Mais le **corrigé anticipe largement le chapitre 2 « Estimation ponctuelle »** (méthode des moments, maximum de vraisemblance, loi faible des grands nombres) : il n'y a **pas** de chapitre antérieur, mais il y a des renvois vers un chapitre **ultérieur**.

| Exercice | Notions du ch.1 mobilisées | Notions anticipées du ch.2 (et autres) |
|---|---|---|
| Exo 1 (café) | Déf. 1.1 (modèle statistique), modèle paramétrique, densité produit / indépendance (Déf. 6, Lemme 1.1, formule (1)) ; Ex. 1.3 (temps d'attente exponentiel) ; lois exponentielle et de Poisson (Outils, « Lois usuelles ») | estimateur par moyenne empirique (méthode des moments, Poly ch.2, Ex. 1.3 / Méthode 1.1) ; estimateur « plug-in » (inverse) |
| Exo 2 (transformation de v.a.) | Déf. 5 (modèle induit), méthode de la fonction muette, Outils Prop. 2.1 / Ex. 2.1 (translation-échelle), Prop. 2.2 (changement de variables en dimension $k$), Ex. 2.3 | — |
| Exo 3 (translation-échelle) | Déf. 4 (statistiques indépendantes), densité produit $\Rightarrow$ i.i.d., Déf. 5 (modèle induit), **Th. 1.3 (Gosset)**, Prop. 2.8 ($\chi^2=$ Gamma), Ex. 1.11, Ex. 1.14, Remarque « statistiques canoniques non indépendantes » | LFGN (Poly ch.2, Outils, Th. 2.1) ; méthode des moments (ch.2, Méthode 1.1) ; EMV gaussien (ch.2, Déf. 1.4, Déf. 1.6, Ex. 1.10) ; EMV Laplace = médiane (ch.2, Ex. 1.13) ; moyenne vs médiane (ch.2, Ex. 1.6) |
| Exo 4 (régression) | densité produit $\Rightarrow$ indépendance (lois **non** identiques), translation-échelle (Exo 2), projection orthogonale (lien Cochran, Th. 1.1) | EMV et moindres carrés, équations normales (ch.2, Compléments, Ex. 4.7, hors programme) ; suite en PC 2 |
| Exo 5 (football) | Déf. 1 (domination par la mesure de comptage), Déf. 5 (modèle induit), **Déf. 2 (identifiabilité)**, modèle de mélange (Ex. 1.7) | fonction génératrice ; EMV Poisson (ch.2, Ex. 1.9) ; méthode des moments d'ordre 1 et 2 ; Borel–Cantelli |
| Exo 6 (actif financier) | Déf. 1.1, $n$-échantillon gaussien ; modèle **non** i.i.d. (ARCH) défini par conditionnements successifs | méthode des moments / EMV (comme Exo 3) ; cumulants ; moments empiriques d'ordre 3 et 4 |
| Exo 7 (mélanges) | **Déf. 2 (identifiabilité)**, Ex. 1.7 (mélange gaussien non identifiable sans contrainte d'ordre) | fonction caractéristique (caractérise la loi) ; Vandermonde |

**Attention (renvoi obsolète)** : l'énoncé (Exo 3 Q4) et le corrigé (p. 14) renvoient au « théorème de Gosset, **Théorème IV-5-24** » du polycopié : c'est une ancienne numérotation. Dans le poly actuel, le théorème de Gosset est le **Théorème 1.3 du ch.1** (preuve via le théorème de Cochran, Th. 1.1).

### 0.2 Rappels et conventions donnés en tête d'énoncé (Énoncé PC1, p. 1)

- $\mathrm{Leb}$ désigne la mesure de Lebesgue sur $\mathbb{R}$ ; et $\mathrm{Leb}^{\otimes n}$ celle sur $\mathbb{R}^n$.
- On écrit i.i.d. pour « indépendantes et identiquement distribuées ».
- Par convention, les vecteurs sont des vecteurs **colonne**. Si $a\in\mathbb{R}^n$, $a'$ est la **transposée** de $a$ (notation « prime », pas $a^\top$).
- **Loi exponentielle** $\mathcal{E}(\lambda)$ de paramètre $\lambda$, de moyenne $\lambda^{-1}$ :
$$\forall u>0\qquad p_\lambda(u)=\lambda e^{-\lambda u}.$$
- **Loi Gamma** (paramétrisation forme / **intensité**) : $\mathcal{E}(\lambda)$ est un cas particulier ($n=1$) de la loi $\Gamma(n,\lambda)$, de densité
$$\forall u>0\qquad q_{n,\lambda}(u)=\frac{\lambda^n u^{n-1}e^{-\lambda u}}{\Gamma(n)}.$$
- **Additivité des lois Gamma** : si $U$ et $V$ sont indépendantes et $U\sim\Gamma(n,\lambda)$, $V\sim\Gamma(n',\lambda)$, alors $U+V\sim\Gamma(n+n',\lambda)$.
- **Rappel (Exo 2, Énoncé p. 2) — changement de variables** : soit un ouvert $\mathcal{O}$ de $\mathbb{R}^k$ et $p\cdot\mathrm{Leb}^{\otimes k}$ une densité sur $\mathbb{R}^k$ telle que $\int_{\mathcal{O}}p\,\mathrm{dLeb}^{\otimes k}=1$. Soit $\phi:\mathcal{O}\to\mathbb{R}^k$ une application continûment différentiable, injective sur $\mathcal{O}$ et dont le jacobien ne s'annule pas sur $\mathcal{O}$ (note 1 : de façon équivalente, $\phi$ est un $C^1$-difféomorphisme de $\mathcal{O}$ sur $\phi(\mathcal{O})$, i.e. une bijection de $\mathcal{O}$ sur $\phi(\mathcal{O})$ telle que $\phi$ et $\phi^{-1}$ sont de classe $C^1$). Si $X\sim p\cdot\mathrm{Leb}^{\otimes k}$ alors la loi de $\phi(X)$ est $q\cdot\mathrm{Leb}^{\otimes k}$ où
$$q(u)=\mathbb{1}_{\phi(\mathcal{O})}(u)\,p\big(\phi^{-1}(u)\big)\,\big\lvert\mathrm{Det}\big(J_{\phi^{-1}}(u)\big)\big\rvert,$$
où pour toute application $\psi$ différentiable, $J_\psi$ désigne la matrice jacobienne (matrice des dérivées partielles). Lorsque $\phi$ est un $C^1$-difféomorphisme, la relation $J_\phi(\phi^{-1}(u))\,J_{\phi^{-1}}(u)=\mathrm{I}$ entraîne
$$\mathrm{Det}\big(J_{\phi^{-1}}(u)\big)=\frac{1}{\mathrm{Det}\big(J_\phi(\phi^{-1}(u))\big)}.$$
(C'est la Prop. 2.2 des Outils du Poly ch.1.)
- **Convention Gamma du corrigé (Exo 3, Corrigé p. 14)** : « une loi de Gamma de paramètres $(a,b)$ est une loi sur $\mathbb{R}^+$ dont la densité est proportionnelle à $u\mapsto u^{a-1}\exp(-bu)$ » — cohérente avec la convention de l'énoncé ($b$ = intensité, pas échelle).
- **Rappels de l'Exo 7** : pour $X\sim\mathcal{N}(0,1)$, $\mathbb{E}[e^{itX}]=e^{-t^2/2}$ ; la loi de Poisson de paramètre $\mu$ a pour fonction caractéristique $\Phi_{p_\mu}(t)=\exp[\mu(e^{it}-1)]$.

### 0.3 Notations propres à la PC (à reproduire telles quelles)

| Notation | Signification | Où |
|---|---|---|
| $p\cdot\mathrm{Leb}$, $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$ | loi de densité $p$ (resp. $p_{n,\theta}$) par rapport à $\mathrm{Leb}$ (resp. $\mathrm{Leb}^{\otimes n}$) ; le corrigé écrit parfois $p_{n,\theta}\cdot\mathrm{dLeb}^{\otimes n}$ | partout |
| $\Delta_i=T_i-T_{i-1}$, $T_0=0$ | inter-temps d'arrivée | Exo 1 |
| $\widehat\Delta_n$, $\widehat N_{K,h}$ | estimateurs (chapeau large) | Exo 1 |
| $\mathcal{C}=\{\mathbb{P}_\theta,\theta>0\}$, $\mathcal{D}=\{\mathbb{Q}_\lambda,\lambda>0\}$, $\mathcal{D}'=\{\mathbb{Q}'_\lambda,\lambda\in\mathcal{C}(\mathbb{R}_+,\mathbb{R}_+)\}$ | familles de lois des deux modèles de l'Exo 1 (attention : $\mathcal{C}$ désigne ici une **famille**, et $\mathcal{C}(\mathbb{R}_+,\mathbb{R}_+)$ l'ensemble des fonctions continues) | Exo 1 |
| $\mathbb{R}_\star$, $\mathbb{R}^+_\ast$, $\mathbb{R}^\star_+$ | réels non nuls ($\mathbb{R}_\star$ dans $\Theta=(\mathbb{R}\times\mathbb{R}_\star)^n$, Exo 2) ; réels strictement positifs | Exo 2, 3, 4, 5 |
| $S_n:=\sum_iX_i$, $K_n:=\sum_i(X_i-n^{-1}S_n)^2$ | **somme** (et non écart-type empirique !) et somme des carrés des écarts | Exo 3 |
| $X_{1:n}\le\dots\le X_{n:n}$ | statistiques d'ordre | Exo 3 (corrigé) |
| $\mathbf{x}_i\in\mathbb{R}^k$ (gras), $f(\mathbf{x}_i'\beta)$ ou $f(\beta'\mathbf{x}_i)$ | variables explicatives ; les deux écritures (identiques) apparaissent dans l'énoncé | Exo 4 |
| $\mathbf{X}\in\mathbb{R}^{n\times2}$, $\mathbf{Y}\in\mathbb{R}^n$, $H:=\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$ | matrice de design, vecteur réponse, projecteur | Exo 4 (corrigé) |
| $\mu$ (Exo 5) / $\nu$ (Exo 7) | **mesure de comptage** sur $\mathbb{N}$ (attention : $\mu$ n'est pas une moyenne dans l'Exo 5) | Exo 5, 7 |
| $G_X(s):=\mathbb{E}[s^X]$ | « fonction génératrice des moments » au sens du corrigé (c'est la fonction génératrice **des probabilités**) | Exo 5 |
| $p_{\pi,\lambda}$ | mélange $(1-\pi)\delta_0+\pi\,\mathcal{P}(\lambda)$ ; $\pi$ = poids de la **composante Poisson** | Exo 5 |
| $\mu_i$ (Exo 6) | moments **centrés** d'ordre $i$ ; $\gamma_1$ asymétrie, $\beta_2$ kurtosis non normalisé, $\gamma_2=\beta_2-3$ excès de kurtosis, $\kappa_k$ cumulants | Exo 6 |
| $\mathsf{S}$, $\mathsf{M}$ (police sans empattement) | simplexe des probabilités ; ensemble des vecteurs de moyennes strictement ordonnés | Exo 7 |
| $f_{\alpha,\mu}$, $q_{\alpha,\mu}$ | densités de mélange gaussien / poissonien | Exo 7 |

---

## 1. Exercices

### Exercice 1 — Un café pour commencer (⋆)
**Objectif (énoncé) :** Identifier un modèle statistique. **Source :** Énoncé PC1, p. 1 ; Corrigé PC1, §2.1, p. 9–10.

**Énoncé complet.** Une cafétéria souhaite remplacer son service par un ou plusieurs distributeurs automatiques de boisson. Afin de calibrer au plus juste le nombre de distributeurs nécessaires, elle mène donc une enquête pour connaître au mieux les besoins de ses utilisateurs.

1. Dans un premier temps, elle observe les temps *successifs* d'arrivée de clients dans son local, enregistrant ainsi un vecteur $T=(T_1,\dots,T_n)$. En considérant les intervalles de temps ainsi formés, et en admettant que les clients arrivent les uns après les autres selon un flux identique toute la journée, proposer un modèle statistique. On notera pour cela
$$\forall i\ge1:\qquad\Delta_i=T_i-T_{i-1},$$
avec la convention $T_0=0$. Discuter des éventuelles limitations de ce modèle.
2. Proposer un estimateur du temps moyen d'arrivée d'un nouveau client, noté $\widehat\Delta_n$, ainsi qu'une approximation du nombre de clients arrivant sur un intervalle de temps donné de longueur $h>0$ fixé.
3. Dans un second temps, pour une durée $h>0$ fixée, elle compte sur une fenêtre de temps entre $0$ et $Kh$ le nombre de clients arrivant tous les intervalles de temps de taille $h$. Proposer alors un second modèle statistique pour le vecteur $N=(N_1,N_2,\dots,N_K)$ ainsi obtenu.
4. Proposer un estimateur du nombre de clients arrivant sur un intervalle de temps $h$, noté $\widehat N_{K,h}$, ainsi qu'une approximation du temps moyen d'arrivée d'un nouveau client.
5. Rappeler le lien existant entre le premier modèle (temps d'arrivées exponentiels) et le second modèle (arrivées poissoniennes dans une file d'attente).

**Corrigé complet (Corrigé PC1, p. 9–10).**

*Q1.* Plutôt que de considérer les temps successifs d'arrivée $T_1,\dots,T_n$ (suite **croissante** positive), il est plus aisé de manipuler les inter-temps $\Delta_i=T_i-T_{i-1}$, qui sont **seulement contraints à être positifs** par définition. Le modèle statistique est défini via (Poly ch.1, Déf. 1.1 : espace mesurable + famille de lois) :
- **l'espace des observations** : $(\mathbb{R}_+^n,\mathcal{B}(\mathbb{R}_+^n))$ — vecteur de $n$ coordonnées réelles positives, muni de la tribu des boréliens de $\mathbb{R}_+^n$ ;
- **une famille de lois** sur $(\mathbb{R}_+^n,\mathcal{B}(\mathbb{R}_+^n))$. On peut considérer un exemple particulier, noté $\mathcal{C}$, de type *paramétrique* ET *de forme produit* :
$$\mathcal{C}=\{\mathbb{P}_\theta,\ \theta>0\},\qquad\text{où pour tout }(\delta_1,\dots,\delta_n)\in\mathbb{R}_+^n:\quad p_\theta(\delta_1,\dots,\delta_n)=\prod_{i=1}^n\theta e^{-\theta\delta_i}$$
(densité par rapport à $\mathrm{Leb}^{\otimes n}$ : c'est le $n$-échantillon du modèle exponentiel de l'Ex. 1.3 du Poly ch.1).

*Interprétation et limites.* Ce modèle traduit une **forme paramétrique exponentielle** de chaque inter-temps d'arrivée, associée à l'**hypothèse forte d'indépendance** entre chaque événement d'arrivée d'un nouveau client (forme produit $\Leftrightarrow$ indépendance, Poly ch.1, Lemme 1.1 / formule (1)). Si l'hypothèse de forme exponentielle est raisonnable, l'**indépendance** entre arrivées successives ainsi que le caractère **homogène en temps** des lois des inter-temps (même $\theta$ toute la journée) pourraient être remis en question.

*Q2.* Estimateur fondé sur la **moyenne empirique** des inter-temps (la somme télescope) :
$$\widehat\Delta_n:=\frac1n\sum_{i=1}^n\Delta_i=\frac{T_n}{n}.$$
Si $\widehat\Delta_n$ estime le temps moyen d'arrivée d'un nouveau client, on peut imaginer que le nombre de clients arrivant sur un intervalle de longueur $h$ est simplement
$$h\,\widehat\Delta_n^{-1}.$$
*[Extracteur]* Justification implicite : sous $\mathbb{P}_\theta$, $\mathbb{E}_\theta[\Delta_1]=1/\theta$ (moyenne de $\mathcal{E}(\theta)$, rappel de l'énoncé), donc $\widehat\Delta_n$ est l'estimateur des moments de $1/\theta$ et $h\widehat\Delta_n^{-1}$ estime $h\theta$, nombre moyen d'arrivées sur une durée $h$ (cf. Q5).

*Q3.* Cette fois la modélisation porte sur le **vecteur de comptage** $N=(N_1,\dots,N_K)$, vecteur de $K$ entiers. Modèle :
- **espace des observations** : $(\mathbb{N}^K,\mathcal{P}(\mathbb{N}^K))$ — vecteur de $K$ entiers positifs, muni de la tribu de **toutes les parties** de $\mathbb{N}^K$ ;
- **famille de lois** : exemple particulier noté $\mathcal{D}$, de type *paramétrique* ET *de forme produit* :
$$\mathcal{D}=\{\mathbb{Q}_\lambda,\ \lambda>0\},\qquad\forall(n_1,\dots,n_K)\in\mathbb{N}^K:\quad q_\lambda(n_1,\dots,n_K)=\prod_{j=1}^K\frac{e^{-(\lambda h)}(\lambda h)^{n_j}}{n_j!}$$
(densité par rapport à la mesure de comptage sur $\mathbb{N}^K$).

*Interprétation et limites.* Forme paramétrique **poissonienne** du *processus de comptage* $N$. Là encore, l'hypothèse de forme poissonienne peut être raisonnable, l'indépendance discutable, et **surtout le caractère homogène en temps**, i.e. la **stationnarité** de la loi des arrivées au cours du temps, est **très discutable** pour une cafétéria, où l'affluence doit clairement dépendre du moment de la journée.

*Modèle non paramétrique (dans le corrigé).* Il existe de nombreuses façons de relâcher l'hypothèse restrictive de processus de comptage homogène. La plus simple : un second modèle, dit **non paramétrique**, où $\lambda$ est remplacé par une **intensité instantanée** $t\mapsto\lambda(t)$, et la famille $\mathcal{D}$ est généralisée en $\mathcal{D}'=\{\mathbb{Q}'_\lambda,\ \lambda\in\mathcal{C}(\mathbb{R}_+,\mathbb{R}_+)\}$ avec
$$\forall(n_1,\dots,n_K)\in\mathbb{N}^K\qquad q_\lambda(n_1,\dots,n_K)=\prod_{j=1}^K\frac{e^{-\int_{(j-1)h}^{jh}\lambda(s)\,\mathrm{d}s}\Big(\int_{(j-1)h}^{jh}\lambda(s)\,\mathrm{d}s\Big)^{n_j}}{n_j!}.$$
Ce modèle, beaucoup plus flexible, permet d'appréhender des différences de fréquence d'arrivée selon les moments de la journée ; il est plus sophistiqué et son étude nécessite des outils statistiques plus élaborés que pour le processus de comptage poissonien homogène.

*Q4.* Dans le cas simple du processus poissonien homogène, estimateur du nombre de clients arrivant sur un intervalle de longueur $h$ (moyenne empirique des comptages) :
$$\widehat N_{K,h}=\frac1K\sum_{j=1}^KN_j.$$
Une approximation raisonnable du temps moyen d'arrivée d'un nouveau client est alors
$$h\,\widehat N_{K,h}^{-1}.$$

*Q5.* On peut démontrer que si $(\Delta_1,\dots,\Delta_n,\dots)$ est une **infinité** d'inter-temps d'arrivée exponentiels, i.e. les $(\Delta_i)_{i\ge1}$ sont i.i.d. $\mathcal{E}(\lambda)$, alors le processus $N=(N_h,N_{2h},\dots,N_{Kh})$ défini par
$$N_{jh}:=\sup\{k\ge0:\ T_k<jh\}$$
suit une distribution de comptage **i.i.d. poissonienne de paramètre $\lambda h$**. Le caractère **« sans mémoire »** des lois exponentielles permet l'**indépendance** des comptages, tandis que l'identification de la loi de Poisson se fait via un **calcul exact** (le corrigé ne détaille pas ce calcul : **preuve seulement esquissée**).

*[Extracteur]* Tel qu'écrit, $N_{jh}$ est le nombre **cumulé** d'arrivées avant $jh$ ; ce sont les **accroissements** $N_{jh}-N_{(j-1)h}$ (les $N_j$ de l'énoncé) qui sont i.i.d. $\mathcal{P}(\lambda h)$. Esquisse standard du « calcul exact » : $T_k=\Delta_1+\dots+\Delta_k\sim\Gamma(k,\lambda)$ par l'**additivité Gamma** rappelée en tête d'énoncé, et $\mathbb{P}(N_h=k)=\mathbb{P}(T_k<h)-\mathbb{P}(T_{k+1}<h)=e^{-\lambda h}(\lambda h)^k/k!$. Le lien des deux modèles donne la cohérence des Q2 et Q4 : $\mathbb{E}[N_j]=\lambda h=h/\mathbb{E}[\Delta_1]$.

**Méthodes mobilisées :**
- construction d'un modèle statistique (espace des observations + tribu + famille de lois, Poly ch.1, Déf. 1.1) ;
- choix d'une **reparamétrisation des observations** (passage des $T_i$ croissants aux $\Delta_i$ positifs) ;
- modèle paramétrique **de forme produit** (indépendance, $n$-échantillon, Poly ch.1, Déf. 6, Lemme 1.1) ;
- estimation par **moyenne empirique** (méthode des moments, anticipation Poly ch.2, Méthode 1.1) et **plug-in** (inverse d'un estimateur) ;
- modèle non paramétrique (intensité $t\mapsto\lambda(t)$) ;
- lien exponentielle / Poisson (absence de mémoire, additivité Gamma) ;
- **critique de modèle** (indépendance, stationnarité).

**Pièges relevés / remarques du corrigé :**
- Modéliser directement $T=(T_1,\dots,T_n)$ par une loi produit est **faux** : les $T_i$ sont croissants, donc dépendants. Il faut passer aux inter-temps.
- L'espace des observations du modèle de comptage est **discret** ($\mathbb{N}^K$, tribu $\mathcal{P}(\mathbb{N}^K)$) : la densité est par rapport à la mesure de comptage, pas à Lebesgue.
- Le corrigé distingue trois hypothèses de nature différente : **forme** de la loi (exponentielle / Poisson, raisonnable), **indépendance** (discutable), **homogénéité en temps** (très discutable pour une cafétéria).
- « Temps moyen d'arrivée » = **temps moyen entre deux arrivées** (moyenne de $\Delta_i$), d'où l'estimateur $T_n/n$.
- $h\widehat\Delta_n^{-1}$ et $h\widehat N_{K,h}^{-1}$ sont des **approximations** (plug-in), pas des estimateurs sans biais.

**Résultats numériques :** aucun.

---

### Exercice 2 — Rappel : transformation de v.a. (⋆)
**Objectif (énoncé) :** Manipuler un changement de variable standard. **Source :** Énoncé PC1, p. 1–2 ; Corrigé PC1, §2.2, p. 10–11.

**Énoncé complet.** Soit un $n$-échantillon $(X_1,\cdots,X_n)$ du modèle statistique
$$\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta\cdot\mathrm{Leb}:\ \theta\in\Theta\}\big).$$
On se place dans le cas $\theta=((a_1,b_1),\cdots,(a_n,b_n))$ et $\Theta=(\mathbb{R}\times\mathbb{R}_\star)^n$.

1. Quel est le modèle statistique induit par $(a_1+b_1X_1,\cdots,a_n+b_nX_n)$ ?

Il est d'usage d'appeler les coefficients $a_i$ les paramètres de *translation* et $b_i$ les paramètres d'*échelle*.

*Rappel* (formule de changement de variables, reproduite en §0.2).

**Corrigé complet (Corrigé PC1, p. 10–11).**

*Mise en place.* Posons $p_{n,\theta}(x_1,\cdots,x_n):=\prod_{i=1}^np_\theta(x_i)$. Sous le modèle $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les v.a. $\{X_i,\ i\le n\}$ sont **indépendantes** (densité produit, Poly ch.1, Lemme 1.1 / formule (1)).

*Étape 1 — indépendance des transformées.* Sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les statistiques $\{a_i+b_iX_i,\ i\le n\}$ sont **indépendantes** (fonctions mesurables, chacune d'une seule $X_i$, de variables indépendantes) ; la loi du vecteur est donc le **produit** des lois de chaque statistique $a_i+b_iX_i$.

*Étape 2 — loi d'une coordonnée par la fonction muette.* Déterminons la loi de $a_i+b_iX_i$ sous $p_\theta$. On fait le **changement de variable** $y=a_i+b_ix$, pour un réel $b_i\ne0$, ce qui donne pour toute fonction mesurable positive $h$ (**méthode de la fonction muette**, théorème de transfert) :
$$\int h(a_i+b_ix)\,p_\theta(x)\,\mathrm{d}x=\int h(y)\,p_\theta\Big(\frac{y-a_i}{b_i}\Big)\frac{\mathrm{d}y}{\lvert b_i\rvert}.$$
On en déduit (identification de la densité, l'égalité valant pour toute $h$) que la densité de $a_i+b_iX_i$ est
$$y\mapsto\frac{1}{\lvert b_i\rvert}\,p_\theta\Big(\frac{y-a_i}{b_i}\Big).$$

*Étape 3 — loi du $n$-uplet.* Par suite (indépendance $\Rightarrow$ densité produit), sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, la loi du $n$-uplet a pour densité
$$(y_1,\cdots,y_n)\mapsto\prod_{i=1}^n\lvert b_i\rvert^{-1}\,p_\theta\Big(\frac{y_i-a_i}{b_i}\Big).$$

*[Extracteur] Mise en forme du modèle induit (Poly ch.1, Déf. 5) :*
$$\Big(\mathbb{R}^n,\ \mathcal{B}(\mathbb{R}^n),\ \Big\{\Big(\prod_{i=1}^n\lvert b_i\rvert^{-1}p_\theta\Big(\frac{y_i-a_i}{b_i}\Big)\Big)\cdot\mathrm{Leb}^{\otimes n},\ \theta\in\Theta\Big\}\Big).$$
C'est exactement le Rappel avec $\mathcal{O}=\mathbb{R}^n$, $\phi(x)=(a_i+b_ix_i)_i$ : $J_\phi=\mathrm{diag}(b_1,\dots,b_n)$, $\lvert\mathrm{Det}\,J_{\phi^{-1}}\rvert=\prod_i\lvert b_i\rvert^{-1}$ (Poly ch.1, Outils, Ex. 2.1 et Ex. 2.3 avec $A$ diagonale).

**Méthodes mobilisées :**
- méthode de la **fonction muette** (théorème de transfert + identification de densité) ;
- **changement de variable affine** en dimension 1 (Poly ch.1, Outils, Prop. 2.1, Ex. 2.1), ou formule du jacobien en dimension $n$ (Prop. 2.2) ;
- indépendance de fonctions de variables indépendantes ; densité produit ;
- calcul d'un **modèle induit** (Poly ch.1, Déf. 5).

**Pièges relevés / remarques du corrigé :**
- **Valeur absolue** $\lvert b_i\rvert$ : obligatoire (si $b_i<0$ le changement de variable inverse les bornes).
- $b_i\ne0$ est indispensable ($\Theta=(\mathbb{R}\times\mathbb{R}_\star)^n$) : si $b_i=0$, $a_i+b_iX_i=a_i$ est constante, sans densité.
- *[Extracteur]* L'énoncé note $\theta$ à la fois l'indice de $p_\theta$ et le vecteur $((a_i,b_i))_i$ ; le corrigé garde $p_\theta$ pour la densité de base. Le modèle induit n'est pas un $n$-échantillon (les lois des coordonnées diffèrent si les $(a_i,b_i)$ diffèrent) : c'est un **produit** de modèles.

**Résultats numériques :** aucun.

---

### Exercice 3 — Modèle de translation et d'échelle (⋆⋆ ; cas gaussien questions 3/4)
**Objectif (énoncé) :** Modèle translation/échelle. Cas gaussien (questions 3/4) (⋆⋆). **Source :** Énoncé PC1, p. 2–3 ; Corrigé PC1, §2.3, p. 11–15.

**Énoncé complet.** Soit $g$ une densité par rapport à la mesure $\mathrm{Leb}$. On considère le modèle statistique
$$\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}:\ \theta\in\Theta:=\mathbb{R}\times\mathbb{R}^+_\ast\}\big)$$
où
$$p_{n,\theta}(x_1,\cdots,x_n):=\sigma^{-n}\prod_{i=1}^ng\Big(\frac{x_i-\mu}{\sigma}\Big),\qquad\theta:=(\mu,\sigma).$$
On note $(X_1,\dots,X_n)$ les variables canoniques : pour tout $i\in\{1,\dots,n\}$ et $(x_1,\cdots,x_n)\in\mathbb{R}^n$, on a $X_i(x_1,\dots,x_n)=x_i$.

1. Montrer que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les statistiques $(X_1,\dots,X_n)$ sont i.i.d. et identifier leur loi.
2. Soit $\theta=(\mu,\sigma)\in\Theta$. Montrer que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les variables aléatoires réelles
$$\frac{X_i-\mu}{\sigma},\qquad i\in\{1,\dots,n\}$$
sont i.i.d. de loi de densité $g$ par rapport à $\mathrm{Leb}$.

Supposons que $g$ est une densité gaussienne centrée réduite. On définit les statistiques
$$S_n:=\sum_{i=1}^nX_i,\qquad K_n:=\sum_{i=1}^n(X_i-n^{-1}S_n)^2.$$

3. Proposer un estimateur de $\mu$ puis de $\sigma^2$, utilisant ces deux statistiques. *Commentaires : il n'y a pas unicité d'un estimateur de $\theta$. Dans le cas de l'estimateur de la moyenne, la figure 1 permet de comparer deux stratégies d'estimation : l'une repose sur l'estimateur de la moyenne empirique, et l'autre sur l'estimateur de la médiane empirique. Cette figure affiche le boxplot de 5000 réalisations indépendantes de chacun des estimateurs dans le cas $n=50$ (gauche) et le cas $n=500$ (droite). Qu'en concluez-vous ? Dans le corrigé rédigé, on trouvera les mêmes analyses graphiques pour le cas où $g$ est une densité de Laplace ; pensez-vous que la conclusion sera la même ?*

   *Figure 1 (énoncé)* — Comparaison de l'estimateur de la moyenne empirique et de celui de la médiane empirique. On a produit 5000 vecteurs d'observations de taille $n$, en tirant $5000\,n$ réalisations de gaussiennes indépendantes de moyenne 2 et de variance 1. Boxplot de 5000 réalisations indépendantes de l'estimateur, dans le cas où $n=50$ (groupe de gauche) et $n=500$ (groupe de droite). (Axe vertical de 1.4 à 2.6 ; ligne pointillée verte en 2 ; pour $n=50$ les boîtes « moy » et « med » sont centrées en 2, la boîte « med » est un peu plus haute ; pour $n=500$ les boîtes sont beaucoup plus resserrées.)
4. Déterminer le modèle statistique induit par les statistiques $(S_n,K_n)$. *La démonstration du théorème de Gosset est donnée dans le polycopié de cours (Théorème IV-5-24)* [= Poly ch.1, Th. 1.3 dans la numérotation actuelle].

**Corrigé complet (Corrigé PC1, p. 11–15).**

*Q1.* Sous le modèle $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, le vecteur $(X_1,\cdots,X_n)$ a une **densité de forme produit**. Donc les composantes sont **indépendantes** (Poly ch.1, Lemme 1.1 / Déf. 4). De plus, il s'agit d'un produit de la **même fonction** $u\mapsto g((u-\mu)/\sigma)$ (à une constante multiplicative près), donc ces composantes ont **même loi**. La constante $C_\theta$ est telle que
$$C_\theta\int g\Big(\frac{u-\mu}{\sigma}\Big)\,\mathrm{d}u=1$$
*[Extracteur : par le changement de variable $v=(u-\mu)/\sigma$, $\int g((u-\mu)/\sigma)\,\mathrm{d}u=\sigma\int g=\sigma$, d'où $C_\theta=1/\sigma$.]* Par suite, cette loi est donnée par
$$u\mapsto q_\theta(u):=\frac1\sigma\,g\Big(\frac{u-\mu}{\sigma}\Big).$$

*Q2.* Sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les v.a. $\{X_i,\ 1\le i\le n\}$ sont i.i.d. de loi $q_\theta\cdot\mathrm{Leb}$. En appliquant le **résultat de l'Exercice 2** avec $g\leftarrow q_\theta$, $a_k\leftarrow-\mu/\sigma$ et $b_k\leftarrow1/\sigma$, on voit que $(X_1-\mu)/\sigma$ a pour densité $g$. *[Extracteur : densité $y\mapsto\frac{1}{1/\sigma}\,q_\theta\big(\frac{y+\mu/\sigma}{1/\sigma}\big)=\sigma\,q_\theta(\sigma y+\mu)=g(y)$ ; l'indépendance est conservée par l'étape 1 de l'Exo 2.]*

*Q3 — estimateurs.* Sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les statistiques $\{(X_i-\mu)/\sigma,\ i\le n\}$ sont i.i.d. de loi gaussienne centrée réduite : $\mu$ est donc l'**espérance** de $X_i$ et $\sigma^2$ sa **variance**. Par un argument de **loi (faible) des grands nombres** (Poly ch.2, Outils, Th. 2.1, appliquée à $X_i$ et $X_i^2$, puis continuité, ch.2 Lemme 2.1), on sait que
$$\Big(\frac1nS_n,\ \frac1nK_n\Big)\xrightarrow{\ \mathbb{P}_{n,\theta}\text{-prob}\ }(\mu,\sigma^2).$$
Par suite, on peut proposer comme estimateur
$$(\hat\mu_n,\hat\sigma_n^2):=\Big(\frac1n\sum_{i=1}^nX_i,\ \frac1n\sum_{i=1}^nX_i^2-(\hat\mu_n)^2\Big)=\Big(\frac1n\sum_{i=1}^nX_i,\ \frac1n\sum_{i=1}^n(X_i-\hat\mu_n)^2\Big)=\Big(\frac1nS_n,\ \frac1nK_n\Big).$$

*Q3 — moyenne vs médiane.* On aurait aussi pu proposer l'estimateur de la **médiane empirique** pour $\mu$. La figure 4 du corrigé compare l'estimateur de $\mu$ par la moyenne empirique et par la médiane empirique : on répète 5000 fois l'algorithme (i) tirer $n$ réalisations indépendantes de gaussiennes d'espérance $\mu=2$ et de variance 1 ; (ii) calculer chacun des deux estimateurs à partir de ces $n$ réalisations. On trace ensuite le boxplot des 5000 réalisations de chacun des estimateurs, pour $n=50$ (gauche) et $n=500$ (droite).
- *Figure 4 (cas gaussien)* : on peut observer (a) le **rôle de $n$** dans la dispersion des estimateurs ; et (b) que la distribution de l'estimateur **moyenne est plus concentrée** que celle de l'estimateur médiane.
- *Figure 5 (cas Laplace, espérance 2, variance 1)* : (a) le rôle de $n$ dans la dispersion ; et (b) la distribution de l'estimateur de la **médiane est plus concentrée** que celle de l'estimateur de la moyenne. **La conclusion n'est donc pas la même** que dans le cas gaussien.

*[Complément du corrigé] — EMV et méthode des moments, cas $g$ gaussienne centrée réduite (p. 11–13).* Les calculs montrent que pour ce modèle gaussien, les deux approches **coïncident**, et que l'estimateur MV (et donc celui des moments) est **unique**.
- **(a) Maximum de vraisemblance (MV).** Sous $p_{n,\theta}\cdot\mathrm{dLeb}^{\otimes n}$, la vraisemblance des observations $(X_1,\cdots,X_n)$ s'écrit
$$L_n(\theta):=\frac{1}{(2\pi)^{n/2}\sigma^n}\exp\Big(-\frac12\sum_{k=1}^n\frac{(X_k-\mu)^2}{\sigma^2}\Big),$$
dont on déduit la log-vraisemblance (à constante $C$ près)
$$\ell_n(\theta):=C-\frac n2\ln\sigma^2-\frac12\sum_{k=1}^n\frac{(X_k-\mu)^2}{\sigma^2}.$$
On peut vérifier aisément que cette quantité possède un **unique maximum**, donné par la solution des **équations de vraisemblance** $\nabla\ell_n(\theta)=0$ et noté $\hat\theta_n$ (Poly ch.2, Déf. 1.6, Ex. 1.10). On obtient
$$\hat\theta_n=\begin{bmatrix}\hat\mu_n\\\hat\sigma_n^2\end{bmatrix}:=\begin{bmatrix}\frac1n\sum_{k=1}^nX_k\\[2pt]\frac1n\sum_{k=1}^n\Big(X_k-\frac1n\sum_{j=1}^nX_j\Big)^2\end{bmatrix}=\begin{bmatrix}\frac1n\sum_{k=1}^nX_k\\[2pt]\frac1n\sum_{k=1}^nX_k^2-\hat\mu_n^2\end{bmatrix},$$
qui sont respectivement la **moyenne empirique** et la **variance empirique**. *[Extracteur — détail des équations : $\partial_\mu\ell_n=\sigma^{-2}\sum_k(X_k-\mu)=0\Rightarrow\mu=\bar X_n$ ; $\partial_{\sigma^2}\ell_n=-\frac{n}{2\sigma^2}+\frac{1}{2\sigma^4}\sum_k(X_k-\mu)^2=0\Rightarrow\sigma^2=\frac1n\sum_k(X_k-\bar X_n)^2$.]*
- **(b) Estimateur des moments.** On a deux paramètres inconnus ; on sait que
$$\mathbb{E}_\theta[X_1]=\mu,\qquad\mathrm{Var}_\theta(X_1)=\sigma^2\tag{1}$$
dont on déduit (en remplaçant espérance et variance par leurs versions empiriques, Poly ch.2, Méthode 1.1) les estimateurs
$$\hat\theta_n=\begin{bmatrix}\hat\mu_n\\\hat\sigma_n^2\end{bmatrix}:=\begin{bmatrix}\frac1n\sum_{k=1}^nX_k\\[2pt]\frac1n\sum_{k=1}^n\Big(X_k-\frac1n\sum_{j=1}^nX_j\Big)^2\end{bmatrix}.$$

*[Complément du corrigé] — EMV et méthode des moments, cas $g$ densité de Laplace (p. 13).* Cette fois, les deux approches **ne conduisent pas au même estimateur** ; de plus, l'estimateur des moments **n'est pas unique** (selon le corrigé).
- **(a) Estimateur des moments.** La méthode reste la même, puisque les relations (1) restent vraies quelle que soit la loi $g$ *[Extracteur : à condition que $g$ soit centrée réduite, ce qui est le cas de la Laplace normalisée de la figure 5]*. On a donc
$$\hat\theta_n=\begin{bmatrix}\hat\mu_n\\\hat\sigma_n^2\end{bmatrix}:=\begin{bmatrix}\frac1n\sum_{k=1}^nX_k\\[2pt]\frac1n\sum_{k=1}^n\Big(X_k-\frac1n\sum_{j=1}^nX_j\Big)^2\end{bmatrix}=\begin{bmatrix}\frac1n\sum_{k=1}^nX_k\\[2pt]\frac1n\sum_{k=1}^nX_k^2-\hat\mu_n^2\end{bmatrix}.$$
- **(b) Estimateur MV.** Ici, la log-vraisemblance des observations est donnée par
$$\ell_n(\theta):=C-n\ln\sigma-\frac1\sigma\sum_{k=1}^n\lvert X_k-\mu\rvert$$
*[Extracteur : correspond à $g(x)=\frac12e^{-\lvert x\rvert}$.]* Maximiser cette quantité en $\sigma$ donne
$$\hat\sigma_n:=\frac1n\sum_{k=1}^n\lvert X_k-\mu\rvert$$
*[Extracteur : $\partial_\sigma\ell_n=-n/\sigma+\sigma^{-2}\sum_k\lvert X_k-\mu\rvert$.]* Maximiser cette quantité en $\mu$ est équivalent à minimiser $\mu\mapsto\sum_{k=1}^n\lvert X_k-\mu\rvert$. Le résultat donne
$$\hat\mu_n=\begin{cases}X_{(n+1)/2:n}&\text{lorsque }n\text{ est impair},\\\text{n'importe quel point de l'intervalle }]X_{n/2:n},X_{n/2+1:n}[&\text{lorsque }n\text{ est pair},\end{cases}$$
où l'on a noté $X_{1:n},\cdots,X_{n:n}$ les **statistiques d'ordre**. On reconnaît la définition de la **médiane**.

  *Détail de la minimisation de $h:\mu\mapsto\sum_{k=1}^n\lvert X_k-\mu\rvert$ (corrigé p. 13).* Cette fonction est **linéaire par morceaux, continue, dérivable partout sauf en $\mu\in\{X_1,\cdots,X_n\}$** :
  - sur $]-\infty,X_{1:n}[$, $h(\mu)=\sum_{k=1}^nX_k-n\mu$, de dérivée $-n$ ;
  - sur $]X_{n:n},+\infty[$, $h(\mu)=n\mu-\sum_{k=1}^nX_k$, de dérivée $n$ (le corrigé imprime $n\mu+\sum_{k=1}^nX_k$ : **coquille**, la dérivée $n$ est correcte) ;
  - sur $]X_{q:n},X_{q+1:n}[$, $h(\mu)=\sum_{k=1}^q(\mu-X_{k:n})+\sum_{k=q+1}^n(X_{k:n}-\mu)$, de dérivée $2q-n$ (le corrigé écrit $X_k$ pour $X_{k:n}$).

  On voit donc que $\mu\mapsto h(\mu)$ est d'abord **décroissante, puis croissante**. Elle atteint son minimum au point $\mu=X_{q^\star+1:n}$ lorsque $n=2q^\star+1$ ; et son minimum sur l'intervalle $]X_{q^\star:n},X_{q^\star+1:n}[$ lorsque $n=2q^\star$ (dérivée nulle sur cet intervalle ; *[Extracteur]* le minimum est atteint sur l'intervalle **fermé**, d'où la non-unicité de l'EMV — cf. Poly ch.2, Ex. 1.13).

*Q4 — modèle induit par $(S_n,K_n)$ (p. 13–14).* Sous $p_{n,\theta}\cdot\mathrm{dLeb}^{\otimes n}$ :
- la loi de $X_i$ est une gaussienne d'espérance $\mu$ et de variance $\sigma^2$ ;
- les v.a. $X_1,\cdots,X_n$ sont indépendantes ;
- la loi de $S_n:=\sum_{i=1}^nX_i$ est une gaussienne d'espérance $n\mu$ et de variance $n\sigma^2$ ;
- la loi de
$$K_n:=\sum_{i=1}^n(X_i-n^{-1}S_n)^2=\sum_{i=1}^nX_i^2-n^{-1}S_n^2$$
est une **Gamma de paramètres $((n-1)/2,\ 1/(2\sigma^2))$** (convention : densité $\propto u^{a-1}\exp(-bu)$ sur $\mathbb{R}^+$) ;
- les v.a. $S_n$ et $K_n$ sont **indépendantes**.

La démonstration de ce résultat se trouve dans le polycopié de cours (**théorème de Gosset**, « Théorème IV-5-24 » = **Poly ch.1, Th. 1.3**). *[Extracteur — traduction : $S_n=n\bar X_n$ et $K_n=(n-1)S_n^{2,\text{Gosset}}$ ; Th. 1.3 (i) donne $\bar X_n\sim\mathcal{N}(\mu,\sigma^2/n)$ donc $S_n\sim\mathcal{N}(n\mu,n\sigma^2)$ ; Th. 1.3 (ii) donne $K_n/\sigma^2\sim\chi^2(n-1)=\mathrm{Gamma}(\frac{n-1}{2},\frac12)$ (Poly ch.1, Prop. 2.8), donc $K_n\sim\mathrm{Gamma}(\frac{n-1}{2},\frac{1}{2\sigma^2})$ par changement d'échelle ; Th. 1.3 (iii) donne l'indépendance, donc la densité jointe est le produit des densités marginales.]* Par suite, le modèle statistique induit est
$$\big(\mathbb{R}\times\mathbb{R}^+,\ \mathcal{B}(\mathbb{R}\times\mathbb{R}^+),\ \{\rho_{n,\theta}\cdot\mathrm{Leb}^{\otimes2}:\ \theta:=(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}^+_\star\}\big),$$
où
$$\rho_{n,\theta}(z,y):=C_n\exp\big(-(z-n\mu)^2/(2n\sigma^2)\big)\exp\big(-y/(2\sigma^2)\big)\,y^{(n-3)/2}\,\mathbb{1}_{\mathbb{R}}(z)\mathbb{1}_{\mathbb{R}^+}(y),$$
en ayant posé
$$C_n:=\frac{1}{\sqrt{2\pi n\sigma^2}}\Big(\frac{1}{2\sigma^2}\Big)^{(n-1)/2}\frac{1}{\Gamma((n-1)/2)}.$$

*[Complément du corrigé] — modèle induit par $(S_n,\sum_{i=1}^nX_i^2)$ (p. 14–15).* Remarquons tout d'abord que
$$\sum_{i=1}^nX_i^2=K_n+\frac{S_n^2}{n}.$$
Pour identifier le modèle induit, il faut identifier la loi de $(S_n,\sum_{i=1}^nX_i^2)$ sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$. Soit $h$ une fonction continue bornée (**fonction muette**). On a
$$\begin{aligned}
\mathbb{E}_{n,\theta}\big[h\big(S_n,K_n+n^{-1}S_n^2\big)\big]
&=C_n\int_{\mathbb{R}\times\mathbb{R}^+}h\big(z,y+n^{-1}z^2\big)\,\exp\big(-(z-n\mu)^2/(2n\sigma^2)\big)\exp\big(-y/(2\sigma^2)\big)\,y^{(n-3)/2}\,\mathrm{d}z\,\mathrm{d}y\\
&=C_n\int_{\mathbb{R}}\int_{u^2/n}^{+\infty}h(u,v)\,\exp\big(-(u-n\mu)^2/(2n\sigma^2)\big)\exp\big(-(v-u^2/n)/(2\sigma^2)\big)\Big(v-\frac{u^2}{n}\Big)^{(n-3)/2}\mathrm{d}u\,\mathrm{d}v\\
&=C_n\exp\big(-n\mu^2/(2\sigma^2)\big)\int_{\mathbb{R}}\int_{u^2/n}^{+\infty}h(u,v)\,\exp\big(u\mu/\sigma^2-v/(2\sigma^2)\big)\Big(v-\frac{u^2}{n}\Big)^{(n-3)/2}\mathrm{d}u\,\mathrm{d}v
\end{aligned}$$
- 1re égalité : densité jointe $\rho_{n,\theta}$ de $(S_n,K_n)$ (Q4) et théorème de transfert ;
- 2e égalité : **changement de variable** $z=u$, $y=v-u^2/n$ (jacobien 1 ; $y\ge0\Leftrightarrow v\ge u^2/n$) ;
- 3e égalité : développement $-\frac{(u-n\mu)^2}{2n\sigma^2}+\frac{u^2}{2n\sigma^2}=\frac{u\mu}{\sigma^2}-\frac{n\mu^2}{2\sigma^2}$ (les termes en $u^2$ se compensent).

On en déduit la densité de la statistique $(\sum_{i=1}^nX_i,\sum_{i=1}^nX_i^2)$ sous $p_{n,\theta}\cdot\mathrm{dLeb}^{\otimes n}$, puis le modèle statistique induit :
$$\big(\mathbb{R}\times\mathbb{R}^+,\ \mathcal{B}(\mathbb{R}\times\mathbb{R}^+),\ \{\tilde\rho_{n,\theta}\cdot\mathrm{dLeb}^2,\ \theta\in\Theta\}\big),$$
où
$$\tilde\rho_{n,\theta}(u,v)\propto\exp\big(u\mu/\sigma^2-v/(2\sigma^2)\big)\Big(v-\frac{u^2}{n}\Big)^{(n-3)/2}\mathbb{1}_{\mathbb{R}}(u)\,\mathbb{1}_{[u^2/n,+\infty[}(v).$$
On observera que, bien que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$ les statistiques $(S_n,K_n)$ soient indépendantes, **il n'en est pas de même pour $(S_n,\sum_{i=1}^nX_i^2)$** (*[Extracteur]* le support $\{v\ge u^2/n\}$ n'est pas un pavé et le facteur $(v-u^2/n)^{(n-3)/2}$ ne se factorise pas ; cf. Poly ch.1, Remarque « statistiques canoniques non indépendantes »).

**Méthodes mobilisées :**
- densité produit $\Rightarrow$ indépendance ; même facteur $\Rightarrow$ même loi (i.i.d.) ;
- **calcul d'une constante de normalisation** (changement de variable affine) ;
- **réutilisation de l'Exo 2** (translation-échelle) ;
- **loi faible des grands nombres** + continuité (consistance) ;
- **méthode des moments** (ordres 1 et 2) ;
- **calcul d'EMV par annulation du gradient** de la log-vraisemblance (cas gaussien) ;
- **EMV par minimisation de $\sum_k\lvert X_k-\mu\rvert$** : étude d'une fonction affine par morceaux, statistiques d'ordre, médiane (cas Laplace) ;
- comparaison empirique d'estimateurs par **boxplots / simulation Monte-Carlo** (efficacité relative moyenne vs médiane) ;
- **théorème de Gosset** (Poly ch.1, Th. 1.3) et $\chi^2(\nu)=\mathrm{Gamma}(\nu/2,1/2)$ (Prop. 2.8) ;
- calcul d'un **modèle induit en dimension 2** par fonction muette + changement de variables.

**Pièges relevés / remarques du corrigé :**
- **Non-unicité** des estimateurs : moyenne et médiane estiment toutes deux $\mu$ (loi symétrique) ; le « meilleur » dépend de $g$ : moyenne meilleure pour la gaussienne, médiane meilleure pour la Laplace (queues plus lourdes).
- Dans l'Exo 3, $S_n$ est la **somme** des observations, pas l'écart-type empirique de Gosset.
- L'estimateur $\hat\sigma_n^2=K_n/n$ est **biaisé** *[Extracteur]* ($\mathbb{E}_\theta[K_n]=(n-1)\sigma^2$) ; $K_n/(n-1)$ est sans biais.
- Le corrigé passe de $\theta=(\mu,\sigma)$ (énoncé) à $\theta=(\mu,\sigma^2)$ (Q4) : simple reparamétrisation.
- Indépendance de $(S_n,K_n)$ mais **pas** de $(S_n,\sum_iX_i^2)$ : l'indépendance dépend des statistiques choisies.
- Coquille du corrigé p. 13 sur $]X_{n:n},+\infty[$ ($+\sum$ au lieu de $-\sum$).
- Renvoi « Théorème IV-5-24 » obsolète : lire Th. 1.3 du ch.1.
- Pour $n$ pair, l'EMV de Laplace n'est **pas unique**.

**Résultats numériques :**
- Simulation : $\mu=2$, $\sigma^2=1$, $n\in\{50,500\}$, 5000 répétitions ; boxplots centrés en 2 sur l'axe $[1.4,\,2.6]$.
- *[Extracteur, résultats classiques non énoncés dans le corrigé]* : pour la gaussienne, $\mathrm{Var}(\text{médiane})\approx\frac{\pi}{2}\cdot\frac{\sigma^2}{n}$ contre $\frac{\sigma^2}{n}$ pour la moyenne (rapport $\approx1.57$) ; pour la Laplace de variance 1, le rapport s'inverse (variance asymptotique de la médiane $\frac{1}{2n}$ contre $\frac1n$ pour la moyenne).

---

### Exercice 4 — Modèle de régression (linéaire) gaussienne (⋆⋆)
**Objectif (énoncé) :** Modèle de régression (linéaire) gaussienne. **Source :** Énoncé PC1, p. 3–4 ; Corrigé PC1, §2.4, p. 16–17. (L'exercice est poursuivi en PC 2.)

**Énoncé complet.** Nous cherchons à modéliser la dépendance d'une réponse par rapport à $k$ variables explicatives, sur une population de $n$ individus. On collecte donc
$$(\mathbf{x}_1,y_1),\dots,(\mathbf{x}_n,y_n),$$
où $y_i\in\mathbb{R}$ et $\mathbf{x}_i\in\mathbb{R}^k$ sont respectivement la *réponse* et les *variables explicatives* pour le $i$-ème individu. Considérons le modèle statistique suivant
$$\Big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\big\{p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}:\ \theta=(\beta,\sigma)\in\Theta:=\mathbb{R}^k\times\mathbb{R}^+_\ast\big\}\Big),$$
où
$$p_{n,\theta}(y_1,\cdots,y_n):=\sigma^{-n}\prod_{i=1}^ng\Big(\frac{y_i-f(\mathbf{x}_i'\beta)}{\sigma}\Big);$$
$g$ est une densité par rapport à $\mathrm{Leb}$, $f:\mathbb{R}\to\mathbb{R}$ une fonction. Pour $i\in\{1,\dots,n\}$ nous notons $Y_i$ la $i$-ème variable canonique, $Y_i(y_1,\dots,y_n)=y_i$.

1. Montrer que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les statistiques $(Y_1,\dots,Y_n)$ sont indépendantes et préciser leurs lois.
2. Montrer que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$ les variables
$$\sigma^{-1}\{Y_i-f(\beta'\mathbf{x}_i)\},\qquad i\in\{1,\cdots,n\}$$
sont i.i.d. de loi $g\cdot\mathrm{Leb}$.
3. (Régression linéaire gaussienne.) Dans cette question, $k=2$, $g$ est la densité d'une loi gaussienne centrée réduite, $f(\eta)=\eta$ et pour tout $i\in\{1,\cdots,n\}$
$$\mathbf{x}_i=\begin{bmatrix}1\\x_i\end{bmatrix},\qquad f(\beta'\mathbf{x}_i)=\beta_1+\beta_2x_i.$$
Proposer un estimateur de $\beta_1$ et $\beta_2$.

Nous disposons de 150 mesures de concentration d'ozone (moyennes observées entre 13:00 et 15:00 à Roosevelt Island en p.p.m.) en fonction de différents facteurs : radiation solaire, vitesse du vent, température. On décide d'explorer la relation entre la concentration d'ozone (considérée comme la variable de réponse) et la radiation solaire (considérée comme la variable explicative).

*Figure 2* — (gauche) Le nuage de 150 points $(x_i,y_i)$ où, pour la $i$-ème mesure, $x_i$ est la radiation solaire et $y_i$ la concentration d'ozone. On trace aussi, en rouge, la droite de régression $x\mapsto\hat b_1+\hat b_2x$ où $\hat b_1,\hat b_2$ ont été obtenus comme minimisant la quantité $(\beta_1,\beta_2)\mapsto\sum_{i=1}^{150}(y_i-\beta_1-\beta_2x_i)^2$. La droite horizontale est la droite d'équation $x\mapsto n^{-1}\sum_{i=1}^ny_i$. (droite) Nuage de 150 points $(\hat y_i,e_i)$ où $\hat y_i=\hat b_1+\hat b_2x_i$ et $e_i=y_i-\hat y_i$. (Graphe « Residuals vs Fitted », `lm(Ozone ~ Solar.R)` ; axes : Solar.R de 0 à 300, Ozone de 0 à 150 ; valeurs ajustées de 20 à 60, résidus de $-50$ à $100$ ; observations étiquetées 117, 62, 99.)

4. Le modèle de régression linéaire vous semble-t-il approprié ? Quelles améliorations du modèle sembleraient souhaitables ?

**Corrigé complet (Corrigé PC1, p. 16–17).**

*Q1.* Soit $\theta:=(\beta,\sigma)$. Sous la loi $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, le vecteur aléatoire $(Y_1,\cdots,Y_n)$ a la densité
$$(u_1,\cdots,u_n)\mapsto\sigma^{-n}\prod_{i=1}^ng\Big(\frac{u_i-f(\beta'\mathbf{x}_i)}{\sigma}\Big)$$
qui est **de forme produit**, donc les composantes sont **indépendantes**. De plus la loi de $Y_i$ est
$$u_i\mapsto g\Big(\frac{u_i-f(\beta'\mathbf{x}_i)}{\sigma}\Big),$$
à une constante multiplicative près. Un **calcul de constante de normalisation** montre que cette constante multiplicative vaut $1/\sigma$. *[Extracteur : les $Y_i$ ne sont **pas** identiquement distribuées — le centre $f(\beta'\mathbf{x}_i)$ dépend de $i$.]*

*Q2.* En utilisant encore le **résultat de l'Exercice 2**, on montre que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, la loi de $(Y_i-f(\beta'\mathbf{x}_i))/\sigma$ est $g$ (translation $a_i=-f(\beta'\mathbf{x}_i)/\sigma$, échelle $b_i=1/\sigma$) ; l'indépendance est conservée, d'où i.i.d. $g\cdot\mathrm{Leb}$.

*Q3.* On sait que sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$,
$$Y_i\overset{ind}{\sim}\mathcal{N}\big(\beta_1+\beta_2x_i,\ \sigma^2\big),$$
ce qui entraîne que pour tout $i$, $Y_i$ a même loi que $\beta_1+\beta_2x_i+W_i$ où $W_i\sim\mathcal{N}(0,\sigma^2)$. On peut donc comprendre la donnée mesurée $y_i$ comme la mesure de $\beta_1+\beta_2x_i$ **entachée d'une perturbation** modélisée comme la réalisation d'une loi gaussienne centrée de variance $\sigma^2$.

▶ **Maximum de vraisemblance.** On peut chercher le paramètre qui maximise la vraisemblance des observations : la log-vraisemblance est
$$\theta\mapsto\ell_n(\theta):=C-\frac n2\ln\sigma^2-\frac{1}{2\sigma^2}\sum_{i=1}^n(Y_i-\beta_1-\beta_2x_i)^2,$$
où $C$ collecte tous les termes qui ne dépendent pas de $\theta$. En introduisant les notations
$$\mathbf{X}:=\begin{bmatrix}1&x_1\\\cdots&\cdots\\1&x_n\end{bmatrix}\in\mathbb{R}^{n\times2},\qquad\beta:=\begin{bmatrix}\beta_1\\\beta_2\end{bmatrix}\in\mathbb{R}^2,\qquad\mathbf{Y}:=\begin{bmatrix}Y_1\\\cdots\\Y_n\end{bmatrix}\in\mathbb{R}^n,$$
on a
$$\ell_n(\theta)=C-\frac n2\ln\sigma^2-\frac{1}{2\sigma^2}\|\mathbf{Y}-\mathbf{X}\beta\|^2.$$
Cette fonction possède un **unique maximum** obtenu en résolvant les **équations de vraisemblance** $\nabla\ell_n=0$. Pour $\beta$, on doit minimiser la forme quadratique
$$\beta\mapsto\beta'\mathbf{X}'\mathbf{X}\beta-2\beta'\mathbf{X}'\mathbf{Y}+\mathbf{Y}'\mathbf{Y}$$
(développement de $\|\mathbf{Y}-\mathbf{X}\beta\|^2$), et le minimum est atteint en $\hat\beta_n$ solution de $\mathbf{X}'\mathbf{X}\beta=\mathbf{X}'\mathbf{Y}$ (*[Extracteur]* gradient $2\mathbf{X}'\mathbf{X}\beta-2\mathbf{X}'\mathbf{Y}=0$ : **équations normales**), soit (en supposant la matrice $\mathbf{X}'\mathbf{X}$ inversible)
$$\hat\beta_n:=\big(\mathbf{X}'\mathbf{X}\big)^{-1}\mathbf{X}'\mathbf{Y}.\tag{2}$$
Noter que $\mathbf{X}\hat\beta_n$ est la **projection** de $\mathbf{Y}$ sur l'espace engendré par les colonnes de $\mathbf{X}$ (note 2 du corrigé : posons $H:=\mathbf{X}(\mathbf{X}'\mathbf{X})^{-1}\mathbf{X}'$ ; alors $H^2=H$, c'est le projecteur sur l'espace vectoriel engendré par les colonnes de $\mathbf{X}$ ; donc $H\mathbf{Y}$ est le projeté de $\mathbf{Y}$ sur cet espace). Par suite, le coefficient $\hat\beta_{n,0}$ est le projeté de $\mathbf{Y}$ sur le vecteur constant $\mathbb{1}_n:=(1,\cdots,1)'$ et il vaut $n^{-1}\sum_{i=1}^ny_i$ (*[Extracteur]* : **affirmation à prendre avec précaution**, exacte seulement pour le modèle réduit à la constante $f(\beta'\mathbf{x}_i)=\beta_1$, ou si les $x_i$ sont centrés ; dans le modèle à deux paramètres, $\hat\beta_{n,1}=\bar Y_n-\hat\beta_{n,2}\bar x_n$ avec $\hat\beta_{n,2}=\sum_i(x_i-\bar x_n)(Y_i-\bar Y_n)/\sum_i(x_i-\bar x_n)^2$ ; l'indice « 0 » du corrigé ne correspond d'ailleurs pas à la numérotation $\beta_1,\beta_2$).

*[Complément du corrigé] — estimation de $\sigma^2$ (p. 16–17).* Pour l'estimateur de $\sigma^2$ par la méthode du MV, on obtient
$$\hat\sigma_n^2:=\frac1n\|\mathbf{Y}-\mathbf{X}\hat\beta_n\|^2=\frac1n\sum_{i=1}^n\Big(Y_i-\hat\beta_{n,1}-\hat\beta_{n,2}x_i\Big)^2;$$
cet estimateur est la **variance des résidus**, i.e. la variance de la composante de $\mathbf{Y}$ orthogonale à l'espace vectoriel engendré par les colonnes de $\mathbf{X}$ (soit en quelque sorte la « part » de $\mathbf{Y}-\mathbb{E}[\mathbf{Y}]$ non expliquée par les variables explicatives $x_1,\cdots,x_n$). *[Extracteur : $\partial_{\sigma^2}\ell_n=0$ en $\beta=\hat\beta_n$.]*

▶ **Moindres carrés.** On peut aussi chercher à minimiser la dispersion du nuage de points $\{(\mathbf{x}_i,y_i),\ 1\le i\le n\}$ autour de la droite de régression (s'appuyer sur les graphes) ; cela conduit à définir
$$\hat\beta_n:=\arg\min_\beta\sum_{i=1}^n\big(Y_i-\beta'\mathbf{x}_i\big)^2=\arg\min_\beta\|\mathbf{Y}-\mathbf{X}\beta\|^2.$$
On aboutit au **même résultat** : $\hat\beta_n$ est tel que $\mathbf{X}\hat\beta_n$ est le projeté de $\mathbf{Y}$ sur l'espace engendré par les colonnes de $\mathbf{X}$.

*Q4 (p. 17).* La figure de gauche représente :
- un nuage de points de coordonnées $(x_i,y_i)$ ;
- une **droite horizontale** : c'est la droite d'équation $y=b_1^{(1)}$ où $b_1^{(1)}$ (le corrigé imprime $b_2^{(1)}$, coquille) est l'évaluation de l'estimateur $\hat\beta_0^{(1)}:=n^{-1}\sum_{i=1}^nY_i$ en les points mesurés $(y_1,\cdots,y_n)$. On obtient cet estimateur en considérant un modèle de régression avec $f(\beta'\mathbf{x}_i)=\beta_1$ ;
- une **droite de pente non nulle**, d'équation $y=\tilde b_1+\tilde b_2x$ où $(\tilde b_1,\tilde b_2)$ est l'évaluation de l'estimateur $\hat\beta_n$ (équation (2)) en les points mesurés $(y_1,\cdots,y_n)$. On obtient cet estimateur en considérant un modèle de régression avec $f(\beta'\mathbf{x}_i)=\beta_1+\beta_2x_i$.

Une fois cette droite de régression estimée (i.e. une fois calculés les coefficients, notés $(\tilde b_0,\tilde b_1)$ par le corrigé — incohérence de notation), on peut évaluer les **résidus** $e_i:=y_i-\hat y_i$, i.e. la différence entre la valeur mesurée $y_i$ et la **valeur ajustée** $\hat y_i:=\tilde b_1+\tilde b_2x_i$. La figure de droite représente le nuage des $n$ points de coordonnées $(\hat y_i,e_i)$.

**Le corrigé officiel ne répond pas explicitement à « le modèle est-il approprié ? quelles améliorations ? »** Il se limite à la lecture des figures. *[Extracteur — lecture des graphes, sans valeur de corrigé officiel :]* sur le graphe « Residuals vs Fitted », la dispersion des résidus croît avec les valeurs ajustées (**hétéroscédasticité**), la courbe de lissage n'est pas plate (**non-linéarité**), les résidus sont asymétriques avec des valeurs extrêmes positives (117, 62, 99) (**non-gaussianité**) ; améliorations possibles : transformation de la réponse (ex. log), terme non linéaire, **ajout d'autres variables explicatives** (vent, température, disponibles dans les données).

**Méthodes mobilisées :**
- densité produit $\Rightarrow$ indépendance ; lois **non identiques** (observations indépendantes non i.i.d.) ;
- **calcul d'une constante de normalisation** ;
- **translation-échelle** (réutilisation de l'Exo 2) ;
- représentation $Y_i\overset{\mathcal{L}}{=}\beta_1+\beta_2x_i+W_i$ (signal + bruit) ;
- **EMV par annulation du gradient**, écriture matricielle, **équations normales** $\mathbf{X}'\mathbf{X}\beta=\mathbf{X}'\mathbf{Y}$ ;
- **moindres carrés** et **projection orthogonale** (projecteur $H$, lien avec Cochran, Poly ch.1, Th. 1.1) ;
- EMV de $\sigma^2$ = variance des résidus ;
- **analyse graphique des résidus** (critique de modèle).

**Pièges relevés / remarques du corrigé :**
- Sous ce modèle, les $Y_i$ sont **indépendantes mais pas identiquement distribuées** : ce n'est pas un $n$-échantillon ; ce sont les **résidus normalisés** $\sigma^{-1}(Y_i-f(\beta'\mathbf{x}_i))$ qui sont i.i.d.
- EMV gaussien de $\beta$ = **estimateur des moindres carrés** (le facteur $\sigma^2$ ne change pas l'argmin).
- Hypothèse « $\mathbf{X}'\mathbf{X}$ inversible » nécessaire (au moins deux $x_i$ distincts *[Extracteur]*).
- $\hat\sigma_n^2$ (normalisé par $n$) est biaisé *[Extracteur]* ; la version sans biais divise par $n-2$ (PC 2).
- Coquilles du corrigé : « $\hat\beta_{n,0}$ » et « $b_2^{(1)}$ », « $(\tilde b_0,\tilde b_1)$ » ; l'affirmation « $\hat\beta_{n,0}=n^{-1}\sum y_i$ » n'est vraie que pour le modèle constant (droite horizontale).

**Résultats numériques :** $n=150$ mesures (données `airquality`, ozone vs radiation solaire) ; aucune valeur numérique d'estimateur n'est donnée.

---

### Exercice 5 — Score de football (⋆⋆⋆)
**Objectif (énoncé) :** Modèle de Poisson, modèle de mélange poissonien. **Source :** Énoncé PC1, p. 4–6 ; Corrigé PC1, §2.5, p. 18–22.

**Énoncé complet.** Soit $\lambda>0$. On appelle *loi de Poisson* de paramètre $\lambda$ la loi de densité $\{p_\lambda(k),\ k\in\mathbb{N}\}$ par rapport à la mesure de comptage $\mu$ sur $\mathbb{N}$ :
$$p_\lambda(k)=e^{-\lambda}\frac{\lambda^k}{k!},\qquad k\in\mathbb{N}.$$
1. Calculer la fonction génératrice des moments de la loi de Poisson de paramètre $\lambda$.
2. En déduire la moyenne et la variance d'une loi de Poisson de paramètre $\lambda$.
3. Montrer que si $X_1$ et $X_2$ sont deux variables indépendantes de loi de Poisson de paramètres $\lambda_1>0$ et $\lambda_2>0$, alors la variable aléatoire $X_1+X_2$ suit une loi de Poisson de paramètre $\lambda_1+\lambda_2$.

Soit $(X_1,\dots,X_n)$ un $n$-échantillon du modèle
$$\big(\mathbb{N},\mathcal{P}(\mathbb{N}),\{p_\lambda\cdot\mu:\ \lambda\in\mathbb{R}^+_\ast\}\big).$$
4. Définir le modèle statistique induit par la statistique $\sum_{i=1}^nX_i$.
5. Proposer une méthode d'estimation du paramètre $\lambda$.

On se propose de modéliser le nombre de buts inscrits dans un match de football par une loi de Poisson. On considère tout d'abord que le nombre de buts inscrits par l'équipe locale et l'équipe visiteuse sont deux variables de Poisson indépendantes de paramètres différents. On suppose aussi que les résultats des matchs sont indépendants.

6. Construire le modèle statistique associé à l'observation des résultats de $n$ matchs.
7. On a collecté les buts marqués en *premier league* de la saison 2004-2005 à la saison 2008-2009. Le nombre de matchs est de $n=1900$ :
   - le nombre de buts marqués est en moyenne $2.523$ avec une variance de $2.640$,
   - le nombre de buts marqués par l'équipe locale est en moyenne $1.468$ buts avec une variance de $1.617$,
   - le nombre de buts marqués par l'équipe visiteuse est en moyenne $1.055$ avec une variance de $1.158$.

   Proposer un estimateur des intensités $\lambda_1$ et $\lambda_2$ des deux processus de Poisson introduits pour modéliser le nombre de buts marqués par chacune des deux équipes. Pourquoi l'hypothèse poissonienne est-elle discutable ?

Au lieu d'ajuster une loi de Poisson, il semble plus judicieux dans ce cas de considérer une famille de lois présentant une « sur-dispersion » par rapport à la loi de Poisson (i.e. pour laquelle la variance puisse être plus grande que la moyenne). Étudions plus en détail le nombre de buts marqués par l'équipe locale et l'équipe visiteuse (voir figure 3).

*Figure 3 — Résultats de l'équipe locale (gauche) et de l'équipe visiteuse (droite)* :

| Buts | Locale : observés | Locale : Poisson ($\lambda=1.468$) | Visiteuse : observés | Visiteuse : Poisson ($\lambda=1.055$) |
|---|---|---|---|---|
| 0 | 469 | 437.7 | 692 | 661.6 |
| 1 | 621 | 642.6 | 680 | 697.9 |
| 2 | 456 | 471.7 | 335 | 368.2 |
| 3 | 217 | 230.8 | 131 | 129.5 |
| 4 | 100 | 84.7 | 51 | 34.1 |
| $\ge5$ | 37 | 32.5 | 11 | 8.7 |
| Total | 1900 | | 1900 | |

L'analyse de ces résultats suggère que la modélisation poissonienne **sous-estime le nombre de scores nuls** et **sur-estime** en contrepartie les cas où 1 ou 2 buts sont marqués. On considère comme modèle un mélange de la distribution de Poisson et d'une masse de Dirac en 0,
$$p_{\pi,\lambda}(k)=(1-\pi)\mathbb{1}_{\{0\}}(k)+\pi e^{-\lambda}\frac{\lambda^k}{k!},$$
où $\pi\in\,]0,1[$ est la proportion du mélange.

8. Comment obtenir des réalisations d'une telle loi à partir d'un générateur de v.a. uniforme sur $[0,1]$ et d'un générateur de loi de Poisson de paramètre $\lambda$ ?
9. Calculer la moyenne et le moment d'ordre 2 de cette distribution.
10. Proposer une méthode d'estimation de $\pi$ et de $\lambda$.

**Corrigé complet (Corrigé PC1, p. 18–22).**

*[Complément du corrigé] — densité par rapport à la mesure de comptage sur $\mathbb{N}$.* La mesure de comptage $\mu$ sur $\mathbb{N}$ est la mesure qui à toute partie $A$ de $\mathbb{N}$ associe son cardinal : $\mu(A)=\mathrm{Card}(A)$. On dit qu'une loi $\xi$ sur un espace mesurable $(T,\mathcal{T})$ possède une densité $f$ par rapport à la mesure $\check\nu$ si pour tout $A\in\mathcal{T}$, $\xi(A)=\int_Af\,\mathrm{d}\check\nu$. Dans le cas où $\check\nu$ est la mesure de comptage, cette formule devient
$$\xi(A)=\sum_{a\in A}f(a).$$
Par suite, si $X$ est une v.a. à valeurs dans $\mathbb{N}$ dont la loi est donnée par la suite de réels positifs $p(n):=\mathbb{P}(X=n)$, on dit que « $X$ possède la densité $(p(n))_n$ par rapport à la mesure de comptage $\mu$ » (Poly ch.1, Déf. 1, Ex. 1.5).

*Q1.* Notons $s\mapsto G_X(s)$ la fonction génératrice des moments d'une v.a. $X$. Lorsque $X\sim\mathcal{P}(\lambda)$, on a pour tout $s\in\mathbb{R}$
$$G_X(s):=\mathbb{E}\big[s^X\big]=\exp(-\lambda)\sum_{k\ge0}s^k\frac{\lambda^k}{k!}=\exp(-\lambda(1-s))$$
(théorème de transfert, puis série exponentielle $\sum_k(s\lambda)^k/k!=e^{s\lambda}$).

*Q2.* La loi de Poisson possède des **moments de tout ordre** ; $G_X$ est donc en particulier deux fois dérivable. On a
$$G_X'(1)=\mathbb{E}[X],\qquad G_X''(1)=\mathbb{E}[X(X-1)]$$
(dérivation terme à terme de la série entière), dont on déduit que $\mathbb{E}[X]=\lambda$ et $\mathbb{E}[X(X-1)]=\lambda^2$ (car $G_X'(s)=\lambda e^{-\lambda(1-s)}$, $G_X''(s)=\lambda^2e^{-\lambda(1-s)}$). Par suite,
$$\mathrm{Var}(X)=\mathbb{E}[X(X-1)]+\mathbb{E}[X]-(\mathbb{E}[X])^2=\lambda.$$

*Q3.* **Par indépendance** des v.a. $X_1,X_2$, on a $G_{X_1+X_2}=G_{X_1}G_{X_2}$ ($\mathbb{E}[s^{X_1}s^{X_2}]=\mathbb{E}[s^{X_1}]\mathbb{E}[s^{X_2}]$). On en déduit que
$$G_{X_1+X_2}(s)=\exp\big((\lambda_1+\lambda_2)(s-1)\big)$$
(le corrigé imprime $\exp(-(\lambda_1+\lambda_2)(s-1))$ : **coquille de signe**). La fonction génératrice **caractérisant la loi**, cette expression prouve que $X_1+X_2\sim\mathcal{P}(\lambda_1+\lambda_2)$.

*Q4.* Posons $T_n:=\sum_{i=1}^nX_i$. Alors $T_n$ est une v.a. à valeurs dans $\mathbb{N}$. D'après la question 3 (par récurrence sur $n$), sous le modèle $p_\lambda\cdot\mathrm{d}\mu$, $T_n$ suit une loi de Poisson de paramètre $n\lambda$. On en déduit que le **modèle statistique induit** par $T_n$ est le triplet (Poly ch.1, Déf. 5)
$$\big(\mathbb{N},\ \mathcal{P}(\mathbb{N}),\ \{p_{n\lambda}\cdot\mu:\ \lambda\in\mathbb{R}^+_\ast\}\big).$$

*Q5.* Trois approches dans le corrigé.
- ▶ **Maximum de vraisemblance.** Sous $p_\lambda\cdot\mathrm{d}\mu$, $T_n$ suit une loi de Poisson de paramètre $n\lambda$. La log-vraisemblance est ($C$ désigne une quantité indépendante de $\lambda$)
$$\lambda\mapsto\ell_n(\lambda):=C-n\lambda+T_n\ln\lambda,$$
qui atteint son maximum sur $\mathbb{R}^+_\star$ en un **unique point**, donné par
$$\hat\lambda_n:=\frac1n\sum_{k=1}^nX_k.\tag{3}$$
*[Extracteur : $\ell_n'(\lambda)=-n+T_n/\lambda=0\Leftrightarrow\lambda=T_n/n$, fonction strictement concave si $T_n>0$ ; si $T_n=0$ le maximum n'est pas atteint sur $\mathbb{R}^+_\star$ — cf. Poly ch.2, Ex. 1.9.]*
- ▶ **Méthode des moments d'ordre 1.** En exploitant le fait que $(X_1,\cdots,X_n)$ est un $n$-échantillon d'un modèle de Poisson, la relation $\mathbb{E}_\lambda[X_1]=\lambda$ définit l'estimateur $\tilde\lambda_n$ par la solution de l'équation
$$\frac1n\sum_{k=1}^nX_k=\lambda,$$
ce qui donne **le même estimateur** que (3).
- ▶ **Méthode des moments d'ordre 2.** La relation $\mathbb{E}_\lambda[X_1^2]=\lambda(1+\lambda)$ définit l'estimateur $\check\lambda_n$ par la solution de
$$\lambda>0\ \text{t.q.}\ \frac1n\sum_{k=1}^nX_k^2=\lambda(1+\lambda),$$
ce qui donne l'**unique racine strictement positive** de
$$\lambda>0\ \text{t.q.}\ \lambda^2+\lambda-\frac1n\sum_{k=1}^nX_k^2=0.$$
*[Extracteur : $\check\lambda_n=\frac{-1+\sqrt{1+\frac4n\sum_kX_k^2}}{2}$ ; illustre la non-unicité des estimateurs des moments.]*

*Q6.* On collecte les données $\ell_1,v_1,\cdots,\ell_n,v_n$ où $\ell_i$ (resp. $v_i$) est le nombre de buts marqués par l'équipe locale (resp. visiteuse) lors du $i$-ème match. Ces données sont une réalisation du vecteur aléatoire $(L_1,V_1,\cdots,L_n,V_n)$ à valeurs dans $\mathbb{N}^{2n}$ ; cet espace est muni de la **tribu de ses parties** ; on veut munir l'espace mesurable d'une loi telle que, sous cette loi, les variables canoniques soient **indépendantes** et de lois de Poisson de paramètres adéquats, à savoir
$$(\ell_1,v_1,\cdots,\ell_n,v_n)\mapsto\tilde p_\theta(\ell_1,v_1,\cdots,\ell_n,v_n):=\prod_{k=1}^n\Big(\frac{\lambda_1^{\ell_k}\lambda_2^{v_k}}{\ell_k!\,v_k!}\exp(-\lambda_1-\lambda_2)\Big),\qquad\theta:=(\lambda_1,\lambda_2).$$
Par suite, le modèle statistique est
$$\big(\mathbb{N}^{2n},\ \mathcal{P}(\mathbb{N}^{2n}),\ \{\tilde p_\theta\cdot\mu^{\otimes2},\ \theta\in\mathbb{R}^+_\star\times\mathbb{R}^+_\star\}\big)$$
(notation du corrigé ; *[Extracteur]* la mesure dominante est en fait la mesure de comptage sur $\mathbb{N}^{2n}$, i.e. $\mu^{\otimes 2n}$).

*Q7.* Par un **estimateur des moments (qui coïncide avec l'estimateur MV)**, on peut prendre
$$\hat\lambda_{1,n}:=\frac1n\sum_{k=1}^nL_k,\qquad\hat\lambda_{2,n}:=\frac1n\sum_{k=1}^nV_k.$$
On peut estimer $\lambda_1$ et $\lambda_2$ respectivement par $1.468$ et $1.055$. On peut discuter le modèle poissonien en observant que **la variance des données est supérieure à la moyenne des données — dans les trois cas** (les locaux, les visiteurs, le nombre total par match), alors qu'une loi de Poisson a variance = moyenne (Q2) : **sur-dispersion**.

*Remarque du corrigé — modèle identifiable (p. 19–20).* Noter que si l'on avait uniquement collecté l'information $(x_1+y_1,\cdots,x_n+y_n)$ — c'est-à-dire le nombre total de buts marqués par match — on n'aurait pas pu estimer chacun des deux paramètres $\lambda_1,\lambda_2$. En effet, le modèle statistique associé à ces observations aurait été :
- espace des observations : $\mathbb{N}^n$ muni de la tribu de ses parties ;
- paramètre $\tilde\theta:=(\lambda_1,\lambda_2)$ à valeurs dans $\tilde\Theta:=\mathbb{R}^+_\star\times\mathbb{R}^+_\star$ ;
- la famille de lois $\{\check p_{\tilde\theta}\cdot\mu,\ \tilde\theta\in\mathbb{R}^+_\star\times\mathbb{R}^+_\star\}$ de densité
$$(s_1,\cdots,s_n)\mapsto\exp(-(\lambda_1+\lambda_2)n)\prod_{k=1}^n\frac{(\lambda_1+\lambda_2)^{s_k}}{s_k!}.$$

La loi ne dépend des paramètres inconnus $\lambda_1,\lambda_2$ qu'à travers la somme $\lambda_1+\lambda_2$. Ce modèle est dit **non identifiable** (Poly ch.1, Déf. 2) puisqu'on peut trouver plusieurs paires $(\lambda_1,\lambda_2)$ de réels strictement positifs dont la somme vaut une valeur donnée : il existe $\tilde\theta\ne\check\theta$ tels que $p_{\tilde\theta}=p_{\check\theta}$. On pourra donc estimer la somme $\lambda_1+\lambda_2$ mais on sera incapable d'estimer chacune des quantités $\lambda_1,\lambda_2$.

*Q8 — [Complément du corrigé] Loi mélange (p. 20).* Soient $f_0\,\mathrm{d}\nu_0$, $f_1\,\mathrm{d}\nu_1$ des lois de probabilité, définies sur un espace mesurable $(T,\mathcal{T})$ avec $T\subseteq\mathbb{R}^d$ — ce contexte inclut par exemple le cas de deux densités par rapport à la mesure de Lebesgue sur $\mathbb{R}^d$ ; de deux lois discrètes sur $\mathbb{N}$ ; d'une loi discrète et d'une loi à densité par rapport à Lebesgue.
- Soit $\pi\in\,]0,1[$. Une v.a. $X$ de loi mélange donnée par
$$(1-\pi)f_0\,\mathrm{d}\nu_0+\pi f_1\,\mathrm{d}\nu_1$$
a **même loi que $(1-U)V+UW$** où $U,V,W$ sont des v.a. **indépendantes**, $V\sim f_0\,\mathrm{d}\nu_0$, $W\sim f_1\,\mathrm{d}\nu_1$ et $U$ est une v.a. de **Bernoulli de paramètre $\pi$**. En effet, pour toute fonction $h$ mesurable bornée,
$$\begin{aligned}
\mathbb{E}[h((1-U)V+UW)]&=\mathbb{E}[h((1-U)V+UW)\mathbb{1}_{U=0}]+\mathbb{E}[h((1-U)V+UW)\mathbb{1}_{U=1}]\\
&=\mathbb{E}[h(V)\mathbb{1}_{U=0}]+\mathbb{E}[h(W)\mathbb{1}_{U=1}]\\
&=\mathbb{P}(U=0)\int h(v)f_0(v)\,\mathrm{d}\nu_0(v)+\mathbb{P}(U=1)\int h(w)f_1(w)\,\mathrm{d}\nu_1(w)\\
&=(1-\pi)\int h(x)f_0(x)\,\mathrm{d}\nu_0(x)+\pi\int h(x)f_1(x)\,\mathrm{d}\nu_1(x).
\end{aligned}$$
  (1re ligne : $U\in\{0,1\}$ ; 2e : sur $\{U=0\}$, $(1-U)V+UW=V$, sur $\{U=1\}$ c'est $W$ ; 3e : **indépendance** de $U$ et $V$ (resp. $W$) ; 4e : $\mathbb{P}(U=1)=\pi$.)
- Cela est équivalent à dire que « avec probabilité $(1-\pi)$, $X=V$ ; et avec probabilité $\pi$, $X=W$ ».
- Pour obtenir une réalisation d'une v.a. ayant cette loi, il suffit de tirer une v.a. de Bernoulli de paramètre $\pi$. Si on obtient 0, on retourne la réalisation d'une v.a. de loi $f_0\,\mathrm{d}\nu_0$ ; si on obtient 1, on retourne une réalisation d'une v.a. de loi $f_1\,\mathrm{d}\nu_1$.
- On peut généraliser le modèle de mélange à plus de deux composantes : $\sum_{i=1}^I\alpha_if_i\,\mathrm{d}\nu_i$ où les poids $\alpha_i$ sont positifs et tels que $\sum_{i=1}^I\alpha_i=1$.

*Réponse à Q8 (p. 21).* Ici, $f_0\,\mathrm{d}\nu_0$ est la **loi de Dirac en zéro** : $V=0$ avec probabilité 1 ; $W$ suit une loi de Poisson de paramètre $\lambda$. Par suite, simuler sous cette loi mélange revient à (a) tirer une loi de Bernoulli de paramètre $\pi$ ; (b) si on obtient 0, retourner 0, et si on obtient 1, retourner le résultat d'un tirage d'une v.a. de Poisson de paramètre $\lambda$. *[Extracteur : avec le générateur uniforme, $U:=\mathbb{1}_{\{\mathrm{Unif}\le\pi\}}\sim\mathcal{B}\mathrm{er}(\pi)$.]*

*Q9.* Notons $X$ une v.a. ayant cette distribution mélange. Puisque $X$ a même loi que $(1-U)V+UW$ avec $U,V,W$ **indépendantes**, on a
$$\mathbb{E}[X]=\mathbb{E}[(1-U)V]+\mathbb{E}[UW]=\mathbb{E}[(1-U)]\,\mathbb{E}[V]+\mathbb{E}[U]\,\mathbb{E}[W]=0+\pi\lambda.$$
De même, on établit
$$\mathbb{E}\big[X^2\big]=\mathbb{E}\big[U^2W^2\big]=\mathbb{E}\big[U^2\big]\,\mathbb{E}\big[W^2\big]=\pi\lambda(1+\lambda)$$
(*[Extracteur]* car $V=0$, donc $X=UW$ ; $U^2=U$ d'où $\mathbb{E}[U^2]=\pi$ ; $\mathbb{E}[W^2]=\mathrm{Var}(W)+\mathbb{E}[W]^2=\lambda+\lambda^2$ par Q2).

*Q10.* On peut déduire de ces relations un **estimateur par la méthode des moments** pour les paramètres $\pi,\lambda$. Posons
$$S_{1,n}:=\frac1n\sum_{k=1}^nX_k,\qquad S_{2,n}:=\frac1n\sum_{k=1}^nX_k^2.$$
Alors on prend pour estimateur de $(\pi,\lambda)$ la solution des conditions
$$S_{1,n}=\pi\lambda,\qquad S_{2,n}=\pi\lambda(1+\lambda),\qquad\pi\in\,]0,1[,\qquad\lambda>0,$$
**si elle existe**. La résolution des deux premières conditions donne (diviser la 2e par la 1re : $1+\lambda=S_{2,n}/S_{1,n}$, puis $\pi=S_{1,n}/\lambda$)
$$\check\lambda_n:=\frac{S_{2,n}}{S_{1,n}}-1=\frac{S_{2,n}-S_{1,n}}{S_{1,n}},\qquad\hat\pi_n:=\frac{S_{1,n}^2}{S_{2,n}-S_{1,n}},$$
mais il faut vérifier que ces quantités sont bien respectivement à valeurs dans $\mathbb{R}^+_\star$ et dans $]0,1[$.
- Puisque les v.a. $X_k$ sont **à valeurs entières**, on a toujours $S_{2,n}\ge S_{1,n}$ ($X_k^2\ge X_k$ pour $X_k\in\mathbb{N}$) ; de plus,
$$\mathbb{P}_{n,(\pi,\lambda)}(S_{2,n}=S_{1,n})=\mathbb{P}_{n,(\pi,\lambda)}(X_i\le1,\ \forall i\le n)=\big((1-\pi)+\pi\exp(-\lambda)(1+\lambda)\big)^n$$
(égalité ssi tous les $X_i\in\{0,1\}$ ; indépendance ; $\mathbb{P}(X_1\le1)=p_{\pi,\lambda}(0)+p_{\pi,\lambda}(1)$), ce qui entraîne que $\sum_n\mathbb{P}_{n,(\pi,\lambda)}(S_{2,n}=S_{1,n})<\infty$ (série géométrique de raison $<1$) et donc, sous $p_{\pi,\lambda}\cdot\mu$, $S_{2,n}-S_{1,n}>0$ **presque sûrement pour tout $n$ assez grand** (*[Extracteur]* : lemme de **Borel–Cantelli**, non nommé dans le corrigé).
- Par suite, sous ce modèle, et pour tout $n$ assez grand, $\check\lambda_n>0$ et $0<\hat\pi_n<\infty$.
- En revanche, la condition $\hat\pi_n<1$ est vraie ssi $S_{2,n}-S_{1,n}^2>S_{1,n}$, i.e. ssi la **variance empirique est supérieure à la moyenne empirique**. Ce n'est pas toujours le cas, mais ça l'est ici sur les données collectées (c'est justement la raison pour laquelle on a envisagé ce modèle).

L'application numérique (équipe locale) donne
$$s_{1,n}=1.468,\qquad s_{2,n}=1.617+1.468^2,\qquad\check\lambda_n=1.5695,\qquad\hat\pi_n=0.9353.$$
Sur la figure 6, pour $k=0,\cdots,4$, on trace (i) la distribution empirique du nombre de buts marqués par l'équipe locale ; (ii) la probabilité théorique donnée par une loi de Poisson de paramètre $\lambda=1.468$ ; et (iii) la probabilité théorique donnée par la loi mélange $(1-\hat\pi_n)\delta_0+\hat\pi_n\mathcal{P}(\check\lambda_n)$. *Figure 6 — Exercice 5 : distribution empirique (gauche, bleu), loi de Poisson de paramètre 1.468 (centre, vert) et loi mélange (droite, rouge) pour $k=0,1,\cdots,4$* (axe vertical de 0 à 0.35).

**Méthodes mobilisées :**
- **fonction génératrice** : calcul, moments par dérivation en 1, caractérisation de la loi ;
- stabilité de la loi de Poisson par **somme indépendante** (produit de fonctions génératrices) ;
- **modèle induit** par une statistique (Poly ch.1, Déf. 5) ;
- **calcul d'EMV par annulation de la dérivée** de la log-vraisemblance (Poisson) ;
- **méthode des moments** d'ordre 1, d'ordre 2, et système à deux équations (mélange) ;
- construction d'un **modèle produit** sur $\mathbb{N}^{2n}$ (domination par la mesure de comptage) ;
- **non-identifiabilité** (paramètres vus seulement via $\lambda_1+\lambda_2$) ;
- **loi de mélange** : représentation $(1-U)V+UW$, fonction muette, **simulation** ;
- **diagnostic de sur-dispersion** (variance > moyenne) et comparaison effectifs observés / théoriques ;
- vérification du domaine des estimateurs, **Borel–Cantelli**.

**Pièges relevés / remarques du corrigé :**
- Dans tout l'exercice, $\mu$ désigne la **mesure de comptage**, pas une moyenne.
- Le corrigé appelle $G_X(s)=\mathbb{E}[s^X]$ « fonction génératrice des moments » ; c'est la **fonction génératrice (des probabilités)** ; $G_X'(1)=\mathbb{E}[X]$ et $G_X''(1)=\mathbb{E}[X(X-1)]$ (moment **factoriel**), pas $\mathbb{E}[X^2]$.
- Coquille de signe Q3 : $\exp(-(\lambda_1+\lambda_2)(s-1))$ doit se lire $\exp((\lambda_1+\lambda_2)(s-1))=\exp(-(\lambda_1+\lambda_2)(1-s))$.
- Dans le mélange, $\pi$ est le poids de la composante **Poisson** (et $1-\pi$ celui du Dirac) : $\mathbb{E}[X]=\pi\lambda$, pas $(1-\pi)\lambda$.
- La méthode des moments peut donner des valeurs **hors de l'espace des paramètres** ($\hat\pi_n\ge1$ si la variance empirique est $\le$ la moyenne empirique) : il faut le vérifier.
- Observer seulement les **totaux** rend $(\lambda_1,\lambda_2)$ non identifiable.
- L'estimateur des moments d'ordre 2, $\check\lambda_n$ (Q5), diffère de l'EMV : non-unicité des estimateurs des moments.

**Résultats numériques :**
- $n=1900$ ; total : moyenne $2.523$, variance $2.640$ ; locale : moyenne $1.468$, variance $1.617$ ; visiteuse : moyenne $1.055$, variance $1.158$. *[Extracteur]* $1.468+1.055=2.523$ (cohérent).
- $\hat\lambda_1=1.468$, $\hat\lambda_2=1.055$.
- Mélange (locale) : $s_{2,n}=1.617+1.468^2=3.772024$, $\check\lambda_n=1.5695$, $\hat\pi_n=0.9353$ ; contrôle $\hat\pi_n\check\lambda_n=1.468$.
- *[Extracteur — calculs non présents dans le corrigé]* : effectifs prédits par le mélange (locale), $1900\,p_{\hat\pi_n,\check\lambda_n}(k)$ pour $k=0,\dots,4$ : $492.8$ ; $580.6$ ; $455.6$ ; $238.4$ ; $93.5$ (et $39.2$ pour $\ge5$). Fréquences empiriques (locale) : $0.2468$ ; $0.3268$ ; $0.2400$ ; $0.1142$ ; $0.0526$. Mélange pour l'équipe visiteuse (même méthode) : $s_{2,n}=1.158+1.055^2=2.271025$, $\check\lambda_n\approx1.1526$, $\hat\pi_n\approx0.9153$. Vérification d'une case du tableau : $1900\,e^{-1.468}\approx437.7$.

---

### Exercice 6 — Prix d'un actif financier (⋆⋆⋆)
**Objectif (énoncé) :** Modèle financier de Black-Scholes-Merton. **Source :** Énoncé PC1, p. 6–7 ; Corrigé PC1, §2.6, p. 23–25.

**Énoncé complet.** Soit $X$ une variable aléatoire réelle d'espérance $\mu$ et d'écart type $\sigma$. Si $\mathbb{E}[\lvert X\rvert^3]<\infty$, on définit le **coefficient d'asymétrie** comme le moment d'ordre trois de la variable centrée réduite :
$$\gamma_1=\mathbb{E}\Big[\Big(\frac{X-\mu}{\sigma}\Big)^3\Big]=\frac{\mu_3}{\mu_2^{3/2}},$$
avec $\mu_i$ les moments centrés d'ordre $i$. Si $\mathbb{E}[X^4]<\infty$, on définit son **kurtosis non normalisé** (coefficient d'aplatissement) comme le moment d'ordre quatre de la variable centrée réduite :
$$\beta_2=\mathbb{E}\Big[\Big(\frac{X-\mu}{\sigma}\Big)^4\Big]=\frac{\mu_4}{\mu_2^2}.$$
On définit l'**excès de kurtosis** comme $\gamma_2=\beta_2-3$.

On observe la suite $p_1,\cdots,p_n$ du prix d'un actif financier à la clôture d'un marché (prix journalier). On modélise ces données comme une réalisation du vecteur aléatoire $(P_1,\cdots,P_n)$. On appelle **log-rendement** de cet actif la quantité
$$X_k:=\log(P_k/P_{k-1}).$$
Un modèle couramment utilisé (associé à la théorie proposée par F. Black, M. Scholes et R. Merton, prix Nobel 1997) consiste à supposer que (i) les log-rendements $\{X_i,\ i\ge1\}$ sont i.i.d. et (ii) ils suivent une distribution gaussienne (dont la moyenne $\mu$ et la variance $\sigma^2$ sont inconnues ; l'analyse statistique peut consister à estimer ces quantités).

On souhaite estimer $\mu,\sigma^2$ à partir de mesures des log-rendements.

1. Proposer un modèle statistique des log-rendements.
2. Proposer un estimateur de la moyenne $\mu$ et de la variance $\sigma^2$.
3. On superpose l'histogramme des observations et la densité d'une loi gaussienne dont les paramètres sont égaux à ceux estimés (voir figure). Peut-on être satisfait de ce modèle ? Qu'observe-t-on ?
4. Lorsque $X$ est une variable aléatoire gaussienne de moyenne $\mu$ et de variance $\sigma^2$,
   a) montrer que le coefficient d'asymétrie est nul ;
   b) calculer $\mathbb{E}[e^{tX}]$ pour tout $t\in\mathbb{R}$. En identifiant les premiers termes du développement de $\log\mathbb{E}[e^{tX}]$, montrer que l'excès de kurtosis est nul.
5. Proposer un estimateur empirique du coefficient d'asymétrie et du coefficient d'excès de kurtosis.
6. En évaluant ces estimateurs sur la série des log-rendements, nous obtenons $-0.0707$ pour l'asymétrie et $1.274035$ pour l'excès de kurtosis. Le modèle retenu vous semble-t-il acceptable ?
7. Pour modéliser les log-rendements, R. Engle (prix Nobel d'Économie 2003) a proposé le modèle **ARCH(1)** :
$$X_k=\sqrt{\alpha_0+\alpha_1X_{k-1}^2}\,Z_k,\qquad X_0=0,$$
où $\alpha_0>0$ et $\alpha_1\ge0$ et $\{Z_k\}_{k=1}^n$ est une suite i.i.d. de variables aléatoires gaussiennes centrées réduites. Définir le modèle statistique associé.

*Figures (énoncé p. 7)* : « Mesures, dont le prix à la clôture » (séries `apple.prices` : Open, High, Low, Close, Volume, de janvier à janvier) ; « Log-rendements (haut) et ajustement d'une gaussienne (bas) » : série « Apple Computer − 2015 » des log-rendements journaliers (entre environ $-0.06$ et $0.06$) et histogramme des log-rendements avec la densité gaussienne ajustée en rouge (abscisses de $-0.04$ à $0.04$) ; l'histogramme est plus pointu au centre et a des valeurs isolées dans les queues.

**Corrigé complet (Corrigé PC1, p. 23–25).**

*[Complément du corrigé] — cumulants, kurtosis, moments (p. 23).*
- Lorsque le coefficient d'asymétrie est **positif**, les queues de distribution sont plus étalées **à droite**.
- Les **cumulants** $(\kappa_k)_k$ sont les coefficients du développement du log de la transformée de Laplace (appelée **fonction génératrice des cumulants**) :
$$\ln\mathbb{E}[\exp(tX)]=\sum_{k\ge0}\frac{\kappa_k}{k!}t^k=\sum_{k\ge1}\frac{\kappa_k}{k!}t^k.$$
- Par dérivation de cette fonction puis évaluation en $t=0$, on obtient des relations entre cumulants et moments centrés ; par exemple
$$\mu_1(=\mu)=\kappa_1;\qquad\mu_2(=\sigma^2)=\kappa_2;\qquad\mu_3=\kappa_3;\qquad\mu_4=\kappa_4+3\kappa_2^2=\kappa_4+3\mu_2^2$$
(*[Extracteur]* « $\mu_1=\mu$ » désigne ici le moment **non centré** d'ordre 1, le moment centré d'ordre 1 étant nul).
- On a donc une autre expression de l'excès de kurtosis :
$$\gamma_2=\frac{\mu_4}{\mu_2^2}-3=\frac{\kappa_4}{\kappa_2^2}.$$
- Noter que par **Cauchy–Schwarz**, $\mu_4>\mu_2^2$ donc $\gamma_2>-2$ (*[Extracteur]* inégalité large $\mu_4\ge\mu_2^2$ en général, égalité pour une loi à deux points symétriques, d'où $\gamma_2\ge-2$). Lorsque $\gamma_2=0$ (c'est le cas de la loi gaussienne), la loi de $X$ est dite « à queues plates » (*mésokurtique*). Lorsque $\gamma_2>0$, on parle de **distribution leptokurtique** / lois à queues épaisses. Lorsque $\gamma_2<0$, on parle de distribution **platykurtique** / lois à queues légères.

*Q1.* Les données collectées $(x_1,\cdots,x_n)$ sont une réalisation du vecteur aléatoire $Z:=(X_1,\cdots,X_n)$, à valeurs dans $\mathbb{R}^n$. On munit cet espace des observations de la tribu borélienne $\mathcal{B}(\mathbb{R}^n)$ et d'une famille de probabilités $\{p_\theta\cdot\mathrm{Leb}^{\otimes n},\ \theta\in\Theta\}$ avec $\theta:=(\mu,\sigma^2)\in\Theta:=\mathbb{R}\times\mathbb{R}^+$ (*[Extracteur]* lire $\mathbb{R}\times\mathbb{R}^+_\star$ pour que la densité existe) et
$$(x_1,\cdots,x_n)\mapsto p_\theta(x_1,\cdots,x_n):=\prod_{k=1}^n\Big(\frac{1}{\sqrt{2\pi}\sigma}\exp\Big(-\frac12\frac{(x_k-\mu)^2}{\sigma^2}\Big)\Big)$$
(le corrigé imprime une somme $\sum_{k=1}^n$ à l'intérieur de l'exponentielle sous le produit : **coquille** ; le produit des densités gaussiennes est la bonne écriture).

*Q2.* Dans ce modèle statistique, sous $p_\theta\cdot\mathrm{Leb}^{\otimes n}$, les variables canoniques $X_1,\cdots,X_n$ sont i.i.d. de loi gaussienne de paramètres $(\mu,\sigma^2)$. **Comme dans l'exercice 3**, on peut choisir un estimateur des moments basé sur le premier et le second moment ; ou un estimateur par maximum de vraisemblance. Les deux approches conduisent au même estimateur
$$\hat\theta_n=\begin{bmatrix}\hat\mu_n\\\hat\sigma_n^2\end{bmatrix}:=\begin{bmatrix}n^{-1}\sum_{k=1}^nX_k\\n^{-1}\sum_{k=1}^n(X_k-\hat\mu_n)^2\end{bmatrix}.$$

*Q3.* Ce modèle gaussien est **discutable** : on observe en effet un histogramme avec des **queues plus lourdes** que la loi gaussienne. La **symétrie** de l'histogramme n'est pas non plus convaincante.

*Q4.* Si $X\sim\mathcal{N}(\mu,\sigma^2)$ alors $(X-\mu)/\sigma\sim\mathcal{N}(0,1)$. Par **symétrie** de la loi gaussienne centrée (qui admet des moments d'ordre quelconque), on a
$$\gamma_1\propto\int_{\mathbb{R}}x^3\exp(-x^2)\,\mathrm{d}x=0$$
(intégrande impaire et intégrable ; *[Extracteur]* la densité est en $\exp(-x^2/2)$, le corrigé écrit $\exp(-x^2)$, sans effet sur la nullité).
La transformée de Laplace de la loi gaussienne $\mathcal{N}(\mu,\sigma^2)$ est donnée par
$$t\mapsto\mathbb{E}[\exp(tX)]=\exp(t\mu+0.5t^2\sigma^2),$$
ce qui donne $\ln\mathbb{E}[\exp(tX)]=t\mu+0.5t^2\sigma^2$, dont on déduit (identification des coefficients du développement) les cumulants
$$\kappa_1=\mu,\qquad\kappa_2=\sigma^2,\qquad\kappa_q=0,\ q\ge3.$$
Il vient que l'excès de kurtosis est nul ($\gamma_2=\kappa_4/\kappa_2^2=0$). *[Extracteur — calcul de $\mathbb{E}[e^{tX}]$, non détaillé dans le corrigé : en complétant le carré, $\int e^{tx}\frac{e^{-(x-\mu)^2/(2\sigma^2)}}{\sqrt{2\pi}\sigma}\mathrm{d}x=e^{t\mu+t^2\sigma^2/2}$.]*

*Q5.* On remplace les moments exacts par les **moments empiriques** (plug-in) ; on obtient pour estimateur du coefficient d'asymétrie
$$\hat\gamma_{1,n}:=\Big(\frac1n\sum_{k=1}^n(X_k-\hat\mu_n)^2\Big)^{-3/2}\Big(\frac1n\sum_{k=1}^n(X_k-\hat\mu_n)^3\Big),\qquad\text{avec }\hat\mu_n:=n^{-1}\sum_{k=1}^nX_k,$$
et pour estimateur de l'excès de kurtosis
$$\hat\gamma_{2,n}:=\Big(\frac1n\sum_{k=1}^n(X_k-\hat\mu_n)^2\Big)^{-2}\Big(\frac1n\sum_{k=1}^n(X_k-\hat\mu_n)^4\Big)-3.$$

*Q6.* L'excès de kurtosis semble **significativement différent de 0, et il est positif** ; cela confirme l'observation que la distribution empirique a des **queues plus lourdes** que la loi gaussienne. Il est donc conseillé d'envisager un autre modèle. (Le corrigé ne commente pas la valeur de l'asymétrie $-0.0707$, proche de 0. « Significativement » n'est pas quantifié : aucun test n'est fait ici.)

*Q7.* Les données collectées $(x_1,\cdots,x_n)$ sont une réalisation du vecteur aléatoire $Z=(X_1,\cdots,X_n)$ à valeurs dans $\mathbb{R}^n$. On munit cet espace de sa tribu borélienne, et d'une famille de probabilités $\{\tilde p_\theta\cdot\mathrm{Leb}^{\otimes n},\ \theta\in\Theta\}$ avec $\theta:=(\alpha_0,\alpha_1)$ ; $\Theta:=\mathbb{R}^\star_+\times\mathbb{R}^\star_+$ (*[Extracteur]* l'énoncé autorise $\alpha_1=0$, donc $\Theta=\mathbb{R}^\star_+\times\mathbb{R}_+$ serait plus fidèle), et (avec la convention $x_0=0$)
$$(x_1,\cdots,x_n)\mapsto\tilde p_\theta(x_1,\cdots,x_n):=\prod_{k=1}^n\Big(\frac{1}{\sqrt{2\pi}\sqrt{\alpha_0+\alpha_1x_{k-1}^2}}\exp\Big(-\frac12\frac{x_k^2}{\alpha_0+\alpha_1x_{k-1}^2}\Big)\Big).$$
Pour l'expression de la densité, on a utilisé le fait que :
- les v.a. $(X_k)_k$ **ne sont pas indépendantes** ; par définition de la loi conditionnelle, « la loi de $(X_1,\cdots,X_n)$ est le produit de la loi de $(X_1,\cdots,X_{n-1})$ et de la loi conditionnelle de $X_n$ sachant $(X_1,\cdots,X_{n-1})$ », ce qui **par récurrence** donne (écriture sans rigueur)
$$\prod_{k=1}^n\text{« loi conditionnelle de }X_k\text{ sachant }(X_1,\cdots,X_{k-1})\text{ »};$$
- les v.a. $(Z_k)_k$ sont indépendantes et, **par récurrence**, $X_{k-1}$ est une fonction de $Z_1,\cdots,Z_{k-1}$. Donc $Z_k$ est **indépendant** de $X_{k-1}$ ;
- vu la relation liant $X_k,Z_k,X_{k-1}$, et puisque $Z_k,X_{k-1}$ sont indépendants, la loi conditionnelle de $X_k$ sachant $(X_1,\cdots,X_{k-1})$ est la loi conditionnelle de $X_k$ sachant $X_{k-1}$ ; et cette loi est une **loi gaussienne centrée de variance $\alpha_0+\alpha_1X_{k-1}^2$**.

**Méthodes mobilisées :**
- construction d'un modèle gaussien i.i.d. ($n$-échantillon) ;
- **méthode des moments** / **EMV** (renvoi à l'Exo 3) ;
- **critique graphique de modèle** (histogramme vs densité ajustée, queues, symétrie) ;
- **symétrie** (intégrale d'une fonction impaire) ;
- **transformée de Laplace / fonction génératrice des cumulants**, identification des coefficients d'un développement ;
- **estimateurs plug-in** des moments centrés d'ordre 3 et 4 ;
- densité d'un modèle **dépendant** (markovien) par **conditionnements successifs** (formule de Bayes en chaîne) et indépendance de $Z_k$ et du passé.

**Pièges relevés / remarques du corrigé :**
- $\mu_i$ = moments **centrés** (sauf la convention $\mu_1=\mu$).
- $\gamma_2$ = **excès** de kurtosis ($\beta_2-3$) : 0 pour la gaussienne, $>0$ pour les queues épaisses.
- Le modèle ARCH n'est **pas** un $n$-échantillon : densité = produit de densités **conditionnelles**, pas de densités marginales.
- Les log-rendements ARCH sont **non corrélés mais dépendants** *[Extracteur]* (volatilité conditionnelle).
- Coquilles : somme dans l'exponentielle sous le produit (Q1), $\mathbb{R}\times\mathbb{R}^+$ au lieu de $\mathbb{R}\times\mathbb{R}^+_\star$, $\exp(-x^2)$ au lieu de $\exp(-x^2/2)$, $\Theta$ ARCH excluant $\alpha_1=0$.

**Résultats numériques :** asymétrie empirique $\hat\gamma_{1,n}=-0.0707$ ; excès de kurtosis empirique $\hat\gamma_{2,n}=1.274035$ ; données : cours de clôture Apple, année 2015 ; log-rendements journaliers dans $[-0.06,\,0.06]$ environ.

---

### Exercice 7 — Sur l'identifiabilité des lois de mélange gaussien et Poisson (⋆⋆⋆)
**Objectif (énoncé) :** Modèle de mélange et transformée de Fourier. **Source :** Énoncé PC1, p. 7–8 ; Corrigé PC1, §2.7, p. 26–27. (Complète rigoureusement le Poly ch.1, Ex. 1.7 : mélange gaussien non identifiable sans contrainte.)

**Énoncé complet.** On appelle **simplexe des probabilités** l'ensemble
$$\mathsf{S}:=\Big\{(\alpha_1,\dots,\alpha_K)\in(\mathbb{R}_+)^K:\ \sum_{i=1}^K\alpha_i=1\Big\}.$$
On pose d'autre part
$$\mathsf{M}:=\big\{\mu=(\mu_1,\dots,\mu_K)\in\mathbb{R}^K:\ \mu_1<\mu_2<\dots<\mu_K\big\}.$$
1. Démontrer que pour tout $(\mu_1,\dots,\mu_K)\in\mathsf{M}$, la famille de fonctions $\big(t\longmapsto e^{it\mu_j}\big)_{1\le j\le K}$ est une famille libre.

Pour tout $\alpha=(\alpha_1,\dots,\alpha_K)\in\mathsf{S}$ et $\mu=(\mu_1,\dots,\mu_K)\in\mathsf{M}$, on considère la loi de densité par rapport à la mesure de Lebesgue
$$f_{\alpha,\mu}(x)=\frac{1}{\sqrt{2\pi}}\sum_{k=1}^K\alpha_ke^{-(x-\mu_k)^2/2}.$$
2. Démontrer que le modèle statistique de mélange gaussien $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{f_{\alpha,\mu}\cdot\mathrm{Leb}:\ (\alpha,\mu)\in\mathsf{S}\times\mathsf{M}\}\big)$ est identifiable. On rappelle pour cela la fonction caractéristique d'une variable aléatoire $X$ gaussienne centrée réduite :
$$\mathbb{E}[e^{itX}]=e^{-t^2/2}.$$

La loi de Poisson de paramètre $\mu$ est la loi de densité $\{p_\mu(n):=e^{-\mu}\frac{\mu^n}{n!},\ n\in\mathbb{N}\}$ par rapport à la mesure de comptage $\nu$ sur $\mathbb{N}$. Sa fonction caractéristique est donnée par
$$\Phi_{p_\mu}(t)=\exp[\mu(e^{it}-1)].$$
Pour tout $\alpha\in\mathsf{S}$ et $\mu=(\mu_1,\dots,\mu_K)\in\mathsf{M}$, on définit la densité de mélange poissonien
$$q_{\alpha,\mu}(n)=\sum_{k=1}^K\alpha_k\,p_{\mu_k}(n).$$
3. Démontrer que le modèle statistique *de mélange poissonien* $\big(\mathbb{N},\mathcal{P}(\mathbb{N}),\{q_{\alpha,\mu}\cdot\nu,\ (\alpha,\mu)\in\mathsf{S}\times\mathsf{M}\}\big)$ est identifiable.

**Corrigé complet (Corrigé PC1, p. 26–27).**

*Q1.* On considère une famille de scalaires $\beta=(\beta_1,\dots,\beta_K)$ tels que
$$\forall t\in\mathbb{R}\qquad\sum_{k=1}^K\beta_ke^{i\mu_kt}=0.\tag{4}$$
On définit la fonction $f:t\longmapsto\sum_{k=1}^K\beta_ke^{i\mu_kt}$. On calcule les dérivées successives de $f$ en remarquant que
$$\forall j\in\mathbb{N}\qquad f^{(j)}(t)=\sum_{k=1}^K\beta_k(i\mu_k)^je^{i\mu_kt}=i^j\sum_{k=1}^K\beta_k(\mu_k)^je^{i\mu_kt}.$$
Puisque $f$ est la fonction nulle (voir (4)), ses dérivées successives sont nulles, ce qui entraîne en particulier (évaluation en $t=0$, division par $i^j\ne0$) que
$$\forall j\in\{0,\dots,K-1\}\qquad\sum_{k=1}^K\beta_k\{\mu_k\}^j=0.$$
On reconnaît ainsi un système linéaire en les $\{\beta_k,\ 1\le k\le K\}$ de **Vandermonde** $V\beta=0$ avec
$$V:=\begin{pmatrix}1&\cdots&1\\\mu_1&\cdots&\mu_K\\\vdots&\cdots&\vdots\\\{\mu_1\}^{K-1}&\cdots&\{\mu_K\}^{K-1}\end{pmatrix}.$$
La matrice $V$ est **inversible dès que les coefficients $\{\mu_k,\ 1\le k\le K\}$ sont deux à deux distincts** ($\det V=\prod_{j<k}(\mu_k-\mu_j)\ne0$ *[Extracteur]*) ; puisque $\mu\in\mathsf{M}$, $V$ est inversible et $\beta$ est le vecteur nul. La condition (4) implique donc que la famille de fonctions est **libre**.

*Q2.* Dans ce modèle statistique, les variables canoniques sont indépendantes *[sic ; lire : chaque composante $k$ du mélange est]* de loi gaussienne d'espérance $\mu_k$ et de variance 1. Si $X$ suit une loi mélange gaussien, alors
$$\mathbb{E}_{\alpha,\mu}[\exp(itX)]=\sum_{k=1}^K\alpha_k\,\mathbb{E}[\exp(itY_k)]=\sum_{k=1}^K\alpha_k\exp(it\mu_k-0.5t^2),$$
en ayant noté $Y_k$ une v.a. de loi $\mathcal{N}(\mu_k,1)$ (linéarité de l'intégrale par rapport à la densité mélange ; $Y_k=\mu_k+G$ avec $G\sim\mathcal{N}(0,1)$ et le rappel de l'énoncé). **Si deux lois sont identiques, alors elles ont même fonction caractéristique.** Considérons deux mélanges gaussiens, de paramètres respectifs $(\alpha,\mu)$ et $(\tilde\alpha,\tilde\mu)$, et supposons que $f_{\alpha,\mu}=f_{\tilde\alpha,\tilde\mu}$. On obtient donc, en passant aux fonctions caractéristiques,
$$\sum_{k=1}^K\alpha_k\exp(it\mu_k-0.5t^2)=\sum_{k=1}^K\tilde\alpha_k\exp(it\tilde\mu_k-0.5t^2).$$
En simplifiant par $e^{-0.5t^2}$ ($\ne0$), on obtient que
$$\sum_{k=1}^K\alpha_k\exp(it\mu_k)-\sum_{k=1}^K\tilde\alpha_k\exp(it\tilde\mu_k)=0.$$
En utilisant la question précédente (appliquée à la famille des valeurs **distinctes** parmi $\{\mu_k\}\cup\{\tilde\mu_j\}$, en regroupant les coefficients), on voit que :
- s'il existe $1\le i,j\le K$ tels que $\mu_i=\tilde\mu_j$, alors $\alpha_i=\tilde\alpha_j$ ;
- pour tout $i$ tel que $\forall j$, $\mu_i\ne\tilde\mu_j$ : $\alpha_i=0$ — ce qui **contredit** la condition « les composantes du vecteur $\alpha$ sont strictement positives ».

On en déduit que seul le premier cas se produit, ce qui entraîne : $\alpha=\tilde\alpha$ et $\mu=\tilde\mu$ (*[Extracteur]* les $\mu_k$ et $\tilde\mu_k$ étant tous deux rangés par ordre strictement croissant, $\{\mu_k\}=\{\tilde\mu_k\}$ impose $\mu_k=\tilde\mu_k$ pour tout $k$).

*Q3.* On vérifie la formule de la fonction caractéristique d'une loi de Poisson de paramètre $\mu$ par un calcul direct : si $X$ suit une loi de Poisson $\mathcal{P}(\mu)$, alors
$$\mathbb{E}[e^{itX}]=\sum_{k=0}^{+\infty}e^{-\mu}\frac{\mu^k}{k!}e^{itk}=e^{-\mu}\sum_{k=0}^{+\infty}\frac{(\mu e^{it})^k}{k!}=e^{\mu[e^{it}-1]}$$
(le corrigé imprime le facteur $e^{-\mu}$ deux fois puis l'oublie : coquilles de mise en page ; le résultat est correct).

On considère ensuite deux mélanges de Poisson correspondant au même modèle statistique :
$$q_{\alpha,\mu}=q_{\tilde\alpha,\tilde\mu},$$
pour deux familles de paramètres $(\alpha,\mu)$ et $(\tilde\alpha,\tilde\mu)$ (avec le même nombre de composantes $K$, et des composantes des vecteurs $\alpha,\tilde\alpha$ **non nulles**). Si les deux lois sont identiques, elles ont alors mêmes fonctions caractéristiques, et on obtient donc que
$$\forall t\in\mathbb{R}\qquad\sum_{k=1}^K\alpha_ke^{\mu_k[e^{it}-1]}=\sum_{k=1}^K\tilde\alpha_ke^{\tilde\mu_k[e^{it}-1]}.$$
On montre alors comme précédemment que la famille de fonctions $(t\mapsto e^{\mu[e^{it}-1]})_{\mu\in\mathbb{R}}$ est une **famille libre**. Pour ce faire, on considère un nombre fini de paramètres $\mu_1<\dots<\mu_s$ ainsi que des coefficients $\beta=(\beta_1,\dots,\beta_s)$ tels que la fonction $f$ définie par
$$f:t\longmapsto\sum_{k=1}^s\beta_ke^{\mu_k[e^{it}-1]}$$
est nulle pour tout $t$.
- $f(0)=\sum_{k=1}^s\beta_k$, de sorte que $\sum_{k=1}^s\beta_k=0$.
- De même, $f'(t)=\sum_{k=1}^s\beta_k\mu_k\,ie^{it}e^{\mu_k[e^{it}-1]}$ et $f'(0)=i\sum_{k=1}^s\beta_k\mu_k$ ; et donc $\sum_{k=1}^s\beta_k\mu_k=0$ (le corrigé omet le facteur $i$ et écrit $e^{\mu_k[e^{it}1]}$ : coquilles).
- Puis $f^{(2)}(t)=if'(t)+\sum_{k=1}^s\beta_k\{\mu_k\}^2(ie^{it})^2e^{\mu_k[e^{it}-1]}$, de sorte que $f^{(2)}(0)$ ne dépend que de $\sum_k\beta_k\mu_k$ (déjà nul) et de $\sum_{k=1}^s\beta_k\{\mu_k\}^2$, qui est donc nul (le corrigé écrit directement $f^{(2)}(0)=\sum_{k=1}^s\beta_k\{\mu_k\}^2$, en omettant les facteurs $i$ et le signe).

On démontre ainsi **par récurrence sur $j$** que (formule du corrigé, à lire « à des termes déjà nuls et à un facteur non nul près »)
$$\forall j\ge1\qquad f^{(j)}(0)=\sum_{k=1}^s\beta_k\{\mu_k\}^j,$$
donc $\sum_{k=1}^s\beta_k\mu_k^j=0$ pour tout $j\in\{0,\dots,s-1\}$. Encore une fois, on obtient un système linéaire en les coefficients $\beta$ dont la matrice est une **matrice de Vandermonde**. On en déduit que nécessairement tous les coefficients $(\beta_1,\dots,\beta_s)$ sont nuls. Cela implique l'**identifiabilité** du modèle statistique (en concluant comme à la Q2).

*[Extracteur] Variante rigoureuse de Q3 :* avec $z=e^{it}$, $\sum_k\beta_ke^{\mu_k(z-1)}=0$ sur le cercle unité ; la fonction $z\mapsto\sum_k\beta_ke^{\mu_k(z-1)}$ étant entière, elle est nulle partout (principe des zéros isolés) ; la liberté des $z\mapsto e^{\mu_kz}$ pour des $\mu_k$ distincts conclut. La « preuve par récurrence » du corrigé est **seulement esquissée**.

**Méthodes mobilisées :**
- **liberté d'une famille de fonctions** par dérivations successives en 0 ;
- **déterminant de Vandermonde** (inversibilité pour des nœuds distincts) ;
- **fonction caractéristique** : elle caractérise la loi (lois égales $\Rightarrow$ f.c. égales) ; f.c. d'un mélange = mélange des f.c. ;
- calcul direct de la f.c. de Poisson (série exponentielle) ;
- **identifiabilité** (Poly ch.1, Déf. 2) : montrer $\mathbb{P}_\theta=\mathbb{P}_{\theta'}\Rightarrow\theta=\theta'$ ;
- **restriction de l'espace des paramètres** (ordre strict $\mu_1<\dots<\mu_K$) pour supprimer le « label switching » (Poly ch.1, Ex. 1.7).

**Pièges relevés / remarques du corrigé :**
- Le corrigé utilise que les $\alpha_k$ sont **strictement positifs** alors que $\mathsf{S}$ autorise $\alpha_k=0$ — voir ci-dessous.
- *[Extracteur]* Si un $\alpha_k=0$, le $\mu_k$ correspondant n'apparaît pas dans la loi : le modèle n'est alors **pas** identifiable sur $\mathsf{S}\times\mathsf{M}$ tout entier ; l'énoncé correct est sur $\{\alpha\in\mathsf{S}:\ \alpha_k>0\ \forall k\}\times\mathsf{M}$ (« conventions au bord » du Poly ch.1, Ex. 1.7).
- Sans la contrainte d'ordre ($\mathsf{M}$), permuter les composantes donne la même loi : non-identifiabilité (Poly ch.1, Ex. 1.7).
- Pour appliquer la Q1 à la Q2, il faut regrouper les $\mu_k,\tilde\mu_j$ **égaux** avant d'invoquer la liberté (la Q1 suppose des fréquences distinctes).
- Les dérivées de $t\mapsto e^{\mu(e^{it}-1)}$ font apparaître des facteurs $i$, $e^{it}$ et des termes croisés : la formule $f^{(j)}(0)=\sum_k\beta_k\mu_k^j$ du corrigé n'est vraie qu'« à termes déjà nuls près ».

**Résultats numériques :** aucun.

---

## 2. Synthèse des méthodes de la PC

| Méthode | Exercices où elle apparaît | Résultat du poly utilisé |
|---|---|---|
| Construire un modèle statistique (espace, tribu, famille de lois) | 1 (Q1, Q3), 5 (Q6), 6 (Q1, Q7) | Poly ch.1, Déf. 1.1 ; Déf. 1 (modèle dominé) |
| Densité produit $\Leftrightarrow$ indépendance ; même facteur $\Rightarrow$ même loi | 1, 2, 3 (Q1), 4 (Q1), 5 (Q6) | Poly ch.1, Déf. 4, Déf. 6, Lemme 1.1, formule (1) |
| Calcul d'une constante de normalisation | 3 (Q1), 4 (Q1) | changement de variable affine (Outils, Prop. 2.1) |
| Méthode de la fonction muette / changement de variables | 2, 3 (Q2, complément Q4), 5 (Q8) | Poly ch.1, Outils, Prop. 2.1, Prop. 2.2, Ex. 2.1, Ex. 2.3 |
| Modèle induit par une statistique | 2, 3 (Q4 et complément), 5 (Q4) | Poly ch.1, Déf. 5, Ex. 1.12, Ex. 1.14 |
| Théorème de Gosset ; $\chi^2(\nu)=\mathrm{Gamma}(\nu/2,1/2)$ | 3 (Q4) | Poly ch.1, Th. 1.3 (ex-« Théorème IV-5-24 »), Prop. 2.8 |
| Projection orthogonale, projecteur $H$ | 4 (Q3) | Poly ch.1, Th. 1.1 (Cochran) — utilisé en PC 2 |
| Moyenne empirique / méthode des moments (ordre 1) | 1 (Q2, Q4), 3 (Q3), 5 (Q5, Q7), 6 (Q2) | Poly ch.2, Déf. 1.2, Méthode 1.1, Ex. 1.3 |
| Méthode des moments d'ordre 2 / système à 2 équations | 3 (Q3), 5 (Q5, Q10), 6 (Q2) | Poly ch.2, Méthode 1.1 |
| Estimateur plug-in (fonction d'estimateurs) | 1 (Q2, Q4), 6 (Q5) | Poly ch.2, Lemme 2.1 (continuité) |
| Loi faible des grands nombres (consistance) | 3 (Q3) | Poly ch.2, Outils, Th. 2.1 |
| Calcul d'EMV par annulation du gradient / de la dérivée | 3 (complément gaussien), 4 (Q3), 5 (Q5), 6 (Q2) | Poly ch.2, Déf. 1.4, Déf. 1.6, Ex. 1.9, Ex. 1.10 |
| EMV par minimisation de $\sum\lvert X_k-\mu\rvert$ (médiane) | 3 (complément Laplace) | Poly ch.2, Ex. 1.13 ; Ex. 1.6 (moyenne vs médiane) |
| Moindres carrés, équations normales | 4 (Q3) | Poly ch.2, Compléments, Ex. 4.7 (hors programme) |
| Comparaison d'estimateurs par simulation (boxplots) | 3 (Q3) | Poly ch.2, Ex. 1.6 |
| Fonction génératrice : moments, caractérisation, somme indépendante | 5 (Q1–Q4) | Outils ch.1 (« Lois usuelles », Poisson) |
| Fonction caractéristique (caractérise la loi) | 7 (Q2, Q3) | Poly ch.1, Outils, Prop. 2.3 (f.c., cas gaussien) |
| Transformée de Laplace, cumulants | 6 (Q4) | — (complément du corrigé) |
| Identifiabilité / non-identifiabilité | 5 (remarque Q7), 7 | Poly ch.1, Déf. 2, Ex. 1.6, Ex. 1.7 |
| Liberté de familles d'exponentielles, Vandermonde | 7 (Q1, Q3) | — (algèbre linéaire) |
| Loi de mélange : représentation $(1-U)V+UW$, simulation | 5 (Q8–Q10), 7 | Poly ch.1, Ex. 1.7 |
| Densité d'un modèle dépendant par conditionnements successifs | 6 (Q7) | — (probabilités conditionnelles) |
| Critique de modèle (indépendance, stationnarité, sur-dispersion, queues, résidus) | 1, 4 (Q4), 5 (Q7), 6 (Q3, Q6) | Poly ch.1, remarque « Tous les modèles sont faux… » (G. Box) |
| Borel–Cantelli (domaine des estimateurs) | 5 (Q10) | — |

---

## 3. Idées de reformulation en exercices interactifs (sans saisie de formule)

### Exercice 1
1. **QCM — choix de l'espace des observations** : « Pour le vecteur de comptage $N=(N_1,\dots,N_K)$, quel espace mesurable ? » Options : $(\mathbb{R}_+^K,\mathcal{B}(\mathbb{R}_+^K))$ ; $(\mathbb{N}^K,\mathcal{P}(\mathbb{N}^K))$ ✔ ; $(\mathbb{N},\mathcal{P}(\mathbb{N}))$ ; $(\mathbb{R}^K,\mathcal{B}(\mathbb{R}^K))$. Variante pour les inter-temps ($\mathbb{R}_+^n$ ✔).
2. **Vrai/faux en série — hypothèses du modèle** : « Les $T_i$ sont indépendants sous le modèle » (F : ce sont les $\Delta_i$) ; « $\widehat\Delta_n=T_n/n$ » (V) ; « La stationnarité est l'hypothèse la plus discutable pour une cafétéria » (V, selon le corrigé) ; « Si les $\Delta_i$ sont i.i.d. $\mathcal{E}(\lambda)$, les comptages sur des fenêtres de longueur $h$ sont i.i.d. $\mathcal{P}(\lambda h)$ » (V).
3. **Associer** : relier chaque modèle à sa densité — exponentiel produit $\prod\theta e^{-\theta\delta_i}$ ; Poisson homogène $\prod e^{-\lambda h}(\lambda h)^{n_j}/n_j!$ ; Poisson non homogène (intégrale de $\lambda(s)$) — et chaque estimateur à sa quantité ($h\widehat\Delta_n^{-1}$ $\leftrightarrow$ nombre moyen d'arrivées sur $h$ ; $h\widehat N_{K,h}^{-1}$ $\leftrightarrow$ temps moyen entre arrivées).

### Exercice 2
1. **Trouver l'erreur** : proposer la densité « $y\mapsto\frac{1}{b_i}p_\theta\big(\frac{y-a_i}{b_i}\big)$ » (erreur : valeur absolue manquante, faux si $b_i<0$), ou « $y\mapsto\lvert b_i\rvert\,p_\theta(a_i+b_iy)$ » (inversion de la transformation).
2. **Preuve à ordonner** : (a) indépendance des $X_i$ par densité produit ; (b) les $a_i+b_iX_i$ sont indépendantes ; (c) fonction muette $\int h(a_i+b_ix)p_\theta(x)\,\mathrm{d}x$ ; (d) changement de variable $y=a_i+b_ix$ ; (e) identification de la densité ; (f) produit des densités.
3. **QCM** : « Pourquoi exige-t-on $b_i\ne0$ ? » — (✔) sinon $a_i+b_iX_i$ est constante et n'a pas de densité par rapport à $\mathrm{Leb}$ ; (✘) sinon la transformation n'est pas mesurable ; (✘) sinon les $X_i$ ne sont plus indépendantes.

### Exercice 3
1. **QCM sur figure (boxplots)** : « Pour des données gaussiennes, quel estimateur de $\mu$ est le plus concentré ? » (moyenne ✔) puis « pour des données de Laplace ? » (médiane ✔) ; « Quel est l'effet de passer de $n=50$ à $n=500$ ? » (dispersion réduite ✔).
2. **Associer** : modèle ($g$ gaussienne / $g$ Laplace) $\leftrightarrow$ EMV de $\mu$ (moyenne / médiane) $\leftrightarrow$ EMV d'échelle ($\frac1n\sum(X_k-\hat\mu_n)^2$ / $\frac1n\sum\lvert X_k-\mu\rvert$) ; et statistiques $\leftrightarrow$ loi : $S_n\leftrightarrow\mathcal{N}(n\mu,n\sigma^2)$, $K_n\leftrightarrow\mathrm{Gamma}(\frac{n-1}{2},\frac{1}{2\sigma^2})$.
3. **Vrai/faux + trouver l'erreur** : « $S_n$ et $K_n$ sont indépendantes » (V, Gosset) ; « $S_n$ et $\sum_iX_i^2$ sont indépendantes » (F) ; « $K_n/n$ est sans biais pour $\sigma^2$ » (F) ; trouver l'erreur dans la dérivée de $h(\mu)=\sum\lvert X_k-\mu\rvert$ sur $]X_{q:n},X_{q+1:n}[$ (proposer $n-2q$ au lieu de $2q-n$) ; **étape suivante à choisir** : après « $h$ décroît puis croît », le minimum pour $n=2q^\star+1$ est en $X_{q^\star+1:n}$ ✔.

### Exercice 4
1. **QCM** : « Sous $p_{n,\theta}\cdot\mathrm{Leb}^{\otimes n}$, les $Y_i$ sont… » — i.i.d. ✘ ; indépendantes non identiquement distribuées ✔ ; dépendantes ✘. « Quelles variables sont i.i.d. $g\cdot\mathrm{Leb}$ ? » — $\sigma^{-1}(Y_i-f(\beta'\mathbf{x}_i))$ ✔.
2. **Preuve à ordonner (EMV = moindres carrés)** : écrire $\ell_n$ ; écriture matricielle $\|\mathbf{Y}-\mathbf{X}\beta\|^2$ ; développer la forme quadratique ; annuler le gradient ; équations normales $\mathbf{X}'\mathbf{X}\beta=\mathbf{X}'\mathbf{Y}$ ; inverser (hypothèse $\mathbf{X}'\mathbf{X}$ inversible) ; interpréter $\mathbf{X}\hat\beta_n=H\mathbf{Y}$ comme projection.
3. **Lecture de graphe (QCM multi-réponses)** sur « Residuals vs Fitted » : quelles anomalies ? hétéroscédasticité, non-linéarité, valeurs extrêmes ; puis « quelle amélioration est pertinente ? » ajout de vent/température, transformation log de l'ozone. *(Signaler que le corrigé officiel ne tranche pas.)*

### Exercice 5
1. **Application numérique (choix parmi valeurs)** : avec $s_{1,n}=1.468$ et variance $1.617$, calculer $\check\lambda_n$ et $\hat\pi_n$ — options $1.5695/0.9353$ ✔ ; $1.468/1.000$ ; $0.9353/1.5695$ ; $1.617/0.908$.
2. **Vrai/faux** : « Pour une loi de Poisson, variance = moyenne » (V) ; « Sur les données, variance > moyenne dans les trois cas » (V) ; « Avec seulement les totaux par match, on peut estimer $\lambda_1$ et $\lambda_2$ » (F, non identifiable) ; « $\hat\pi_n<1$ toujours » (F : ssi variance empirique > moyenne empirique) ; « Dans le mélange, $\mathbb{E}[X]=(1-\pi)\lambda$ » (F, c'est $\pi\lambda$).
3. **Algorithme à ordonner (simulation du mélange)** : tirer $u\sim\mathcal{U}[0,1]$ ; poser $U=\mathbb{1}_{\{u\le\pi\}}$ ; si $U=0$ retourner 0 ; sinon tirer $W\sim\mathcal{P}(\lambda)$ et retourner $W$. Variante **trouver l'erreur** : $G_{X_1+X_2}(s)=\exp(-(\lambda_1+\lambda_2)(s-1))$ (coquille de signe du corrigé).

### Exercice 6
1. **QCM sur histogramme** : « L'histogramme des log-rendements Apple 2015 comparé à la gaussienne ajustée montre… » — queues plus lourdes ✔ ; queues plus légères ✘ ; parfaite adéquation ✘ ; puis interprétation de $\hat\gamma_{2,n}=1.274$ : leptokurtique ✔.
2. **Associer** : $\gamma_1\leftrightarrow\mu_3/\mu_2^{3/2}$ ; $\beta_2\leftrightarrow\mu_4/\mu_2^2$ ; $\gamma_2\leftrightarrow\kappa_4/\kappa_2^2$ ; gaussienne $\leftrightarrow\kappa_q=0$ pour $q\ge3$ ; $\gamma_2>0\leftrightarrow$ leptokurtique, $\gamma_2<0\leftrightarrow$ platykurtique.
3. **Étape suivante à choisir (ARCH)** : « La loi de $(X_1,\dots,X_n)$ est le produit… » — des lois marginales ✘ ; des lois conditionnelles de $X_k$ sachant $(X_1,\dots,X_{k-1})$ ✔ ; puis « la loi conditionnelle de $X_k$ sachant le passé est » $\mathcal{N}(0,\alpha_0+\alpha_1X_{k-1}^2)$ ✔ ; justification : $Z_k$ indépendant de $X_{k-1}$ ✔.

### Exercice 7
1. **Preuve à ordonner (Q1)** : supposer $\sum_k\beta_ke^{i\mu_kt}=0$ ; dériver $j$ fois ; évaluer en $t=0$ ; obtenir $\sum_k\beta_k\mu_k^j=0$ pour $j=0,\dots,K-1$ ; reconnaître Vandermonde ; $\mu_k$ distincts $\Rightarrow$ $V$ inversible ; conclure $\beta=0$.
2. **Vrai/faux** : « Sans la contrainte $\mu_1<\dots<\mu_K$, le mélange gaussien est identifiable » (F, label switching) ; « Le modèle est identifiable sur $\mathsf{S}\times\mathsf{M}$ même si un $\alpha_k=0$ » (F) ; « Deux lois égales ont même fonction caractéristique » (V) ; « La réciproque est vraie » (V, la f.c. caractérise la loi).
3. **Trouver l'erreur** : dans la preuve Poisson, la formule « $f'(t)=\sum_k\beta_k\mu_ke^{it}e^{\mu_k[e^{it}-1]}$ » (facteur $i$ manquant) ; ou un raisonnement qui applique la Q1 sans regrouper les $\mu_k=\tilde\mu_j$ égaux.
