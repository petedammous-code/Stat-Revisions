# PC 8 — Classification binaire : règles bayésiennes (perte asymétrique, perte 0–1), excès de risque, analyse discriminante (LDA/QDA) et espérance conditionnelle

> **Sources extraites :** `S8_APM-41033-EP-PC8-enonce` (énoncé, 6 p., Exercices 1 à 7, Figure 1) et `S8_APM-41033-EP-PC8-corrige` (corrigé officiel, paginé p. 7 à 23, Figures 2 et 3). Toutes les formules ont été vérifiées visuellement sur les deux PDF.
> **Convention de citation :** « Énoncé PC8, p. N » / « Corrigé PC8, p. N » pour la PC ; « Poly ch.8, Th. 1.2 », « Poly ch.8, Outils, Prop. 2.3 », « Poly ch.6, Lemme 1.1 »… pour le cours (numérotation de `content/extraction/ch8.md`, `ch6.md`, `ch2.md`, `ch1.md`).
> **Difficulté :** l'énoncé de la PC 8 **n'indique aucune étoile** (⋆) pour aucun exercice ; on l'écrit « (difficulté non indiquée) ».
> **Code couleur du corrigé officiel :** les passages imprimés en **bleu** dans le corrigé (p. 7, 9, 10, 11, 14–15) sont des commentaires ou compléments ; ils sont signalés par *[Commentaire du corrigé, en bleu]*.
> **Remarques de l'extracteur :** tout ajout absent du corrigé officiel (justification intermédiaire non écrite, correction de coquille, vérification numérique, conclusion laissée implicite) est marqué *[Extracteur]*. Rien n'est inventé côté énoncé/corrigé.

---

## 0. Chapitres du poly mobilisés et rappels donnés en tête d'énoncé

### 0.1 Chapitres mobilisés

La PC 8 est la petite classe de la **semaine 8**, associée au **chapitre 8 « Introduction à l'apprentissage statistique »** : la §1.4 du poly ch.8 (« Le programme des exercices », p. 23–24) décrit exactement ces **sept exercices**, dans le même ordre. Elle mobilise aussi les **Outils du ch.8** (espérance conditionnelle, §2), une proposition des **Compléments du ch.8** (Prop. 4.2 = Exercice 7, hors programme mais outil de la Prop. 1.5), et, pour l'Exercice 3, le **ch.2** (EMV, LGN), le **ch.6** (convergence en probabilité, théorème de continuité, Slutsky) et le **ch.1** (densité du vecteur gaussien).

| Exercice | Notions du ch.8 mobilisées | Notions des autres chapitres |
|---|---|---|
| Exo 1 (perte asymétrique de coût $c$) | Déf. 1.2 (perte), Déf. 1.3 (risque), Déf. 1.4 (règle bayésienne), Déf. 1.5 ($\eta$), Prop. 1.1 (risque conditionnel, minimisation point par point), Th. 1.2 (même schéma de preuve, seuil $1/2\to1/(c+1)$), Remarque « Non-unicité du classifieur bayésien » (p. 16) ; Outils : Prop. 2.2 (tour), Prop. 2.3 (produit), Lemme 2.2 | — |
| Exo 2 (risque bayésien, excès de risque, plug-in) | Th. 1.2 et éq. (4), (5), (6), (7) ; Prop. 1.5 et majoration (13) (c'est **exactement** la preuve de la Prop. 1.5) ; Outils : Lemme 2.2, Prop. 2.5 (aléa de $\mathcal{D}_n$ « gelé ») ; Compléments §4.4 | Fubini(-Tonelli), convergence dominée, convergence en probabilité (Poly ch.6, Outils, Déf. 2.1) |
| Exo 3 (LDA / QDA de bout en bout) | Méthode 1.1 (règle par substitution), Cadre 1.2 (analyse discriminante), éq. (9), (10), (11), Prop. 1.4, Remarque §2.9 (sigmoïde), Remarque §2.8 (densité gaussienne), Prop. 1.5 | Poly ch.1 (Déf. 10, Prop. 2.7 : vecteur gaussien et densité) ; Poly ch.2 (Déf. 1.4 EMV, Méthode 1.2, Ex. 1.10 gaussienne, Outils Th. 2.1 LGN) ; PC2 Exo 3 (famille exponentielle : EMV = estimateur des moments) ; Poly ch.6 (Th. 1.1 et Outils Th. 2.1 : continuité ; Lemme 1.1 Slutsky ; Outils Prop. 2.1 : vecteur/coordonnées) ; calcul différentiel matriciel |
| Exo 4 (espérance conditionnelle) | Outils : Th.-déf. 2.1 (caractérisation), Déf. 2.4, Prop. 2.1 (lemme de Doob), Prop. 2.4 (linéarité, $\mathbb{E}[\phi(V)\mid V]=\phi(V)$) | égalité en loi, loi image, invariance de la mesure produit par permutation (Fubini) |
| Exo 5 (lois conditionnelles uniformes, $d=1$) | Prop. 1.2 (mélange), Prop. 1.3–1.4 (Bayes, $\eta$), Th. 1.2 et éq. (4), (5) ; Outils §2.7 (mesure de comptage) | — |
| Exo 6 (règles à seuil) | Déf. 1.3, Déf. 1.4, Th. 1.2 / Exo 2 Q1 ($R^\star=1/2\iff\eta=1/2$ p.s.) ; Compléments §4.6 (classe $\mathcal{C}$, risque d'approximation) | — |
| Exo 7 (excès de risque d'une règle à $\eta$ approché) | Th. 1.2, éq. (4), majoration (13) ; **Compléments Prop. 4.2** (même énoncé, même preuve) | — |

### 0.2 Rappels et conventions donnés en tête d'énoncé

- **Cadre général (Énoncé p. 1, en italique) :** « Dans les exercices ci-dessous, sauf mention explicite, on considère un couple de variables aléatoires $(X,Y)$ d'attributs (la variable $X$) et de réponses (la variable $Y$) définies sur $(\Omega,\mathcal{F},\mathbb{P})$ ; avec $X\in\mathbb{R}^d$ et $Y\in\{-1,1\}$. On note
$$\eta:X\mapsto\mathbb{P}\left(Y=1\,\middle|\,X\right)$$
la fonction de régression. »
- **Classifieur bayésien pour la perte 0–1 (rappel, Exo 2, Énoncé p. 1) :**
$$g^\star(X)=2\,\mathbb{1}_{\eta(X)\ge1/2}-1.$$
- **Identité élémentaire (rappel, Exo 2 Q1) :** pour deux réels $a,b$ : $\min(a,b)+|b-a|/2=(a+b)/2$.
- **Majoration triviale (Exo 2 Q3) :** « Puisque $\eta(X)\in[0,1]$, $|2\eta(X)-1|\le1$ ».
- **Terminologie LDA / QDA (Énoncé p. 3, italique) :** « Dans le cas où $\Sigma_1=\Sigma_{-1}$, on parle de "Linear Discriminant Analysis" (LDA) ; tandis que dans le cas général $\Sigma_1\neq\Sigma_{-1}$, on parle de "Quadratic Discriminant Analysis" (QDA). »
- **Modèle statistique de l'Exo 3 (Énoncé p. 3) :** $\{(X_i,Y_i)\}_{i=1}^n$ vu comme un $n$-échantillon du modèle
$$\Big(\mathbb{R}^d\times\{-1,1\},\ \mathcal{B}(\mathbb{R}^d)\times\{-1,1\},\ \{\mathbb{Q}_\theta,\ \theta\in\Theta:=\,]0,1[\,\times\mathbb{R}^d\times\mathbb{R}^d\times M_d^+\times M_d^+\}\Big)$$
où $M_d^+$ est l'ensemble des matrices de covariance $d\times d$ **inversibles** (le poly ch.8, Cadre 1.2, note cet ensemble $\mathrm{S}_d^+$). *(La tribu est écrite « $\mathcal{B}(\mathbb{R}^d)\times\{-1,1\}$ » dans l'énoncé ; il faut lire $\mathcal{B}(\mathbb{R}^d)\otimes\mathcal{P}(\{-1,1\})$ — [Extracteur].)*
- **Fonction sigmoïde (Exo 3 Q1) :** $\mathrm{sigm}:t\mapsto1/(1+\exp(-t))$.
- **Simulation de la Figure 1 (Énoncé p. 3) :** on choisit $\pi_1^\star$, on tire $Y_i\sim2\mathcal{B}(\pi_1^\star)-1$ ; puis on choisit $\mu_{-1}^\star,\mu_1^\star,\Sigma_{-1}^\star,\Sigma_1^\star$ et on associe à chaque $Y_i$ « valant 0 » (lire : $-1$) un attribut $X_i\sim\mathcal{N}(\mu_{-1}^\star,\Sigma_{-1}^\star)$, et à chaque $Y_i$ valant 1 un $X_i\sim\mathcal{N}(\mu_1^\star,\Sigma_1^\star)$. Lignes 1–2 : $\Sigma_{-1}^\star=\Sigma_1^\star$ (ligne 1 : $=\mathrm{I}$) ; lignes 3–4 : $\Sigma_{-1}^\star\neq\Sigma_1^\star$ ; toujours $\mu_{-1}^\star\neq\mu_1^\star$. Colonne de gauche : LDA ; de droite : QDA ; frontières en gris ; moyennes estimées marquées par $\star$ ; points mal classés ($g_{\hat\theta_n}(X_i)\neq Y_i$) marqués par $\times$. *(« Adapted from https://scikit-learn.org/ ».)*

Aucune convention de loi usuelle (Gamma, etc.) n'est rappelée dans cette PC.

### 0.3 Notations propres à la PC (à reproduire telles quelles) et correspondance avec le poly ch.8

| Notation PC 8 | Signification | Notation du poly ch.8 | Où |
|---|---|---|---|
| $X$, $x$ (**non gras**) | attributs, $X\in\mathbb{R}^d$ | $\mathbf{X}$, $\mathbf{x}$ (gras) | partout |
| $(\Omega,\mathcal{F},\mathbb{P})$, $\mathbb{E}$ | espace de base | idem | partout |
| $\eta(X)=\mathbb{P}(Y=1\mid X)$ | fonction de régression | idem (Déf. 1.5) | partout |
| $\ell(y,g(x))$ ; $R(g):=\mathbb{E}[\ell(Y,g(X))]$ | perte, risque | $\ell$, $R_{\ell,\mathbb{P}}(g)$, $R_{01}$ | Exo 1, 2 |
| $c>0$ ; $g_c^\star$ ; $g_1^\star$ | coût asymétrique ; règle bayésienne pour ce coût | — | Exo 1 |
| $f^\star$, $\Xi(X)$ | autre règle bayésienne ; variable auxiliaire $\ge0$ | — | Exo 1 Q3 |
| $g^\star$ | classifieur bayésien 0–1 | $g^\star$ | partout |
| $\tilde\eta$, $\tilde g$ | approximation de $\eta$ et règle associée | $\tilde\eta$, $\tilde g$ (éq. (13)) | Exo 2 Q4 |
| $\mathbb{Q}$ | loi de $(X,Y)$ (Exo 2 Q5) | $\mathbb{P}$ | Exo 2 |
| $\mathcal{D}_n$, $\tilde\eta_n$, $\tilde g_n$, $\mathbb{E}_n$, $\mathbb{P}_n$, $\xrightarrow{\mathbb{P}_n\text{-prob}}$ | ensemble d'apprentissage, estimation de $\eta$, règle associée, espérance/probabilité sous la loi de $\mathcal{D}_n$ | $\mathcal{D}_n$, $\eta_{\hat\theta_n}$, $\widehat g_n$, $\mathbb{E}_{n,\theta^\star}$ | Exo 2 Q5 |
| $\phi_n(X):=\mathbb{E}_n[\lvert\tilde\eta_n(X)-\eta(X)\rvert]$ | fonction auxiliaire du corrigé | — | Exo 2 Q5 (corrigé) |
| $\pi_1$, $\pi_{-1}:=\mathbb{P}(Y=-1)=1-\pi_1$ | proportions des classes | $p$, $1-p$ | Exo 3 |
| $\theta:=(\pi_1,\mu_{-1},\mu_1,\Sigma_{-1},\Sigma_1)$ | paramètre (énoncé) ; le corrigé travaille avec $\pi_{-1}$ | $\theta=(p,\mu_1,\mu_{-1},\Sigma_1,\Sigma_{-1})$ | Exo 3 |
| $\mathbb{Q}_\theta$, $\eta_\theta$, $\phi_\theta$ (glyphe ϕ dans l'énoncé et le corrigé) | loi du couple, fonction de régression, log-rapport | $\mathbb{P}_\theta$, $\eta_\theta$, $\phi_\theta$ (éq. (11)) | Exo 3 |
| $w_\theta\in\mathbb{R}^d$, $A_\theta\in\mathbb{R}$ (non gras) | coefficients de la frontière linéaire | $\mathbf{w}_\theta$, $A_\theta$ | Exo 3 Q2 |
| $M_d^+$ | covariances $d\times d$ inversibles | $\mathrm{S}_d^+$ | Exo 3 |
| $g_\theta$, $g_\theta^\star$, $g_{\hat\theta_n}$, $\tilde g_n$ | règle bayésienne sous $\mathbb{Q}_\theta$ ; règle plug-in | $g^\star_\theta$, $\widehat g_n$ | Exo 3 |
| $\mathbb{P}_{n,\theta}$, $\mathbb{E}_{n,\theta}$ | loi / espérance de l'échantillon sous $\theta$ | $\mathbb{P}_{n,\theta^\star}$, $\mathbb{E}_{n,\theta^\star}$ | Exo 3 |
| $\ell(X,Y;\theta)$, $\ell_n(X_1,Y_1,\dots,X_n,Y_n;\theta)$ (abrégé $\ell_n(\theta)$, $\ell_n(\Sigma)$) | log-vraisemblance d'une observation / de l'échantillon (**non normalisée**) | $\ell_n$ (ch.2, Déf. 1.5 : normalisée par $1/n$) | Exo 3 Q3 |
| $\hat\pi_{-1,n}$, $\hat\mu_{-1,n}$, $\hat\mu_{1,n}$, $\hat\Sigma_{-1,n}$, $\hat\Sigma_{1,n}$, $\hat\Sigma_n$ | EMV | $\widehat p_n$, $\widehat\mu_{i,n}$, $\widehat\Sigma_{i,n}$ | Exo 3 Q4 |
| $N_{-1}$, $N_1$, $\mathcal{K}_{-1}$, $\mathcal{K}_1$ | effectifs et ensembles d'indices des classes | — | Exo 3 Q4 |
| $C_n(\pi_1)$, $\hat S_n$, $H\in\mathcal{M}_d(\mathbb{R})$, $\mathrm{Tr}$, $I_d$ | constante, matrice de dispersion intra-classe, direction de dérivation | — | Exo 3 Q4 Sol. 2 |
| $\hat\pi_{j,n}$, $\hat\mu_{j,n}$, éq. (2)–(4) du corrigé | EMV multi-classe | — | Exo 3 Q8 |
| $\psi$ (corrigé) / $f$ (énoncé) | fonction de Doob telle que $\mathbb{E}[X\mid Y]=\psi(Y)$ | $\Psi$ (Prop. 2.1) | Exo 4 |
| $\mathrm{d}\nu$ | loi commune des $X_i$ | $\chi$ (Prop. 2.5) | Exo 4 Q3 |
| $p_{-1}$, $p_1$, $p_X$, $\lambda_{\mathrm{Leb}}$, $c(\mathrm{d}x)$ | densités de classe, densité marginale, Lebesgue, mesure de comptage | $q_{-1}$, $q_1$, $p_{\mathbf{X}}$, $\mathrm{Leb}$, $\mathrm{c}$ | Exo 5 |
| $p:=\mathbb{P}(Y=1)$, $F_i$ ($i\in\{-1,1\}$, mais écrit $F_0$, $F_1$) | proportion, f.d.r. conditionnelles | $p$ | Exo 6 |
| $g_{(x',y')}$, $\mathcal{C}$, $R$, $R^\star$, $A_x$, $B_x$ | règles à seuil, leur classe, risque minimal dans $\mathcal{C}$, risque bayésien, quantités auxiliaires | $\mathcal{C}$ (Compléments §4.6) | Exo 6 |
| $\wedge$, $\vee$ | min, max | — | Exo 2, 6 |
| $\eta^\star$ (ou $\eta^*$), $g^*$ / $g^\star$ | vraie fonction de régression, classifieur bayésien | $\eta^\star$, $g^\star$ (Prop. 4.2) | Exo 7 |
| $\eta$ (Exo 7) | **fonction arbitraire** $\mathbb{R}^d\to[0,1]$ (et non la fonction de régression !) | $\eta$ (Prop. 4.2) | Exo 7 |

### 0.4 Coquilles et décalages récurrents dans les documents de la PC

1. **Labels $\{0,1\}$ au lieu de $\{-1,1\}$ (reliquat d'une ancienne version)** : « $Y_i$ valant 0 » (Énoncé p. 3), « $N_{-1}$ est le nombre de points dont le label vaut 0 » (Corrigé p. 12), « $\mathbb{1}_{\{Y_k=0\}}$ » (Corrigé p. 14, Q7), « $c(\mathrm{d}x)=\delta_{\{0\}}(\mathrm{d}x)+\delta_{\{1\}}(\mathrm{d}x)$ » et « $p_0(x)\mathbb{1}_{\{0\}}(y)$ » (Corrigé p. 18), « $F_0$ » (Énoncé et corrigé Exo 6), « $g_{(x',0)}$ » et « $g_{(x',y')}(X)=0$ » (Corrigé p. 21). **Partout lire $-1$ à la place de $0$.**
2. **Exo 2 Q1 (Corrigé p. 9)** : la première ligne écrit $\mathbb{P}(g(X)=1,Y=-1)$ au lieu de $\mathbb{P}(g^\star(X)=1,Y=-1)$.
3. **Exo 3 Q3 (Corrigé p. 11–12)** : « $-\frac d2\ln(\pi/2)$ » au lieu de $-\frac d2\ln(2\pi)$ ; « $\ell_n(X_1,Y_1,\dots,Y_1,Y_n;\cdot)$ » au lieu de $\ell_n(X_1,Y_1,\dots,X_n,Y_n;\cdot)$.
4. **Exo 3 Q4, Solution 2 (Corrigé p. 13)** : erreurs de signe et de transposition (détail dans l'exercice) ; résultat final $\hat\Sigma_n=\hat S_n/n$ **correct**.
5. **Exo 3 Q5 (Corrigé p. 14)** : le terme $-\hat\mu_{-1,n}\hat\mu_{-1,n}^T$ est placé au numérateur de la fraction ; il doit être **en dehors**.
6. **Figure 2 du corrigé** : légendée « Exercice 6 » alors qu'elle illustre l'**Exercice 3** ; elle a **5 lignes** (contre 4 pour la Figure 1 de l'énoncé), et la frontière y est **blanche** (grise dans l'énoncé), les classes **bleue/rouge** (noire/rouge dans l'énoncé).
7. **Exo 5 Q2 (Corrigé p. 19)** : les trois intervalles sont tous écrits « $\forall x\in[0,1]$ » ; lire $[0,1]$, $]1,2]$, $]2,4]$.
8. **Exo 6 Q3 (Corrigé p. 21)** : « $\eta(X):=\mathbb{E}[Y\mid X]$ » — faux pour $Y\in\{-1,1\}$ (on a $\mathbb{E}[Y\mid X]=2\eta(X)-1$) ; lire $\eta(X)=\mathbb{P}(Y=1\mid X)$.
9. **Exo 7** : l'énoncé écrit « On note $\eta(X)$ la fonction de régression » puis utilise $\eta^\star$ pour celle-ci et $\eta$ pour une fonction arbitraire ; mélange des graphies $g^*$ et $g^\star$, $\eta^*$ et $\eta^\star$.
10. **Énoncé Exo 2 Q4** : « $\tilde g(X):=2\,\mathbb{1}_{\{\tilde\eta(x)\ge1/2\}}-1$ » ($x$ minuscule dans l'indicatrice).

---

## 1. Exercices

### Exercice 1 — Perte asymétrique : risque, règle bayésienne, (non-)unicité (difficulté non indiquée)

**Énoncé complet** (Énoncé p. 1)

Nous considérons le problème de la classification binaire. À la place de la perte 0/1 nous considérons la perte
$$\ell(y,g(x)):=\begin{cases}c&\text{si }g(x)=-1,\ y=1\\1&\text{si }g(x)=1,\ y=-1\\0&\text{sinon}\end{cases},$$
où $c>0$.

1. Déterminer l'expression du risque de classification $R(g):=\mathbb{E}[\ell(Y,g(X))]$ d'une règle $g$ en fonction de $\{g(X)=-1\}$, de la fonction de régression $\eta$ et du coût $c$.
2. Montrer que $g_c^\star(X):=2\,\mathbb{1}_{\{\eta(X)\ge\frac{1}{c+1}\}}-1$ est une règle de décision bayésienne pour ce risque $R$.
   *Dans le cas $c=1$, la fonction de perte est la fonction de perte $0-1$ et la règle de décision bayésienne $g_1^\star$ coïncide avec celle vue en Amphi.*
3. A-t-on unicité de la règle de décision bayésienne ?

**Corrigé complet** (Corrigé p. 7–8)

**Q1.** On écrit que le risque de classification d'une règle $g$ est
$$\begin{aligned}R(g)&=\mathbb{E}[\ell(Y,g(X))]\\&=\mathbb{E}\big[\mathbb{1}_{g(X)=1,Y=-1}+c\,\mathbb{1}_{g(X)=-1,Y=1}\big]\\&=\mathbb{E}\big[\mathbb{1}_{g(X)=1}\mathbb{1}_{Y=-1}\big]+c\,\mathbb{E}\big[\mathbb{1}_{g(X)=-1}\mathbb{1}_{Y=1}\big]\\&=\mathbb{E}\big[\mathbb{1}_{g(X)=1}\mathbb{E}[\mathbb{1}_{Y=-1}\mid X]\big]+c\,\mathbb{E}\big[\mathbb{1}_{g(X)=-1}\mathbb{E}[\mathbb{1}_{Y=1}\mid X]\big].\end{aligned}$$
Justifications des étapes :
- 2ᵉ égalité : **définition de la perte** (elle vaut $1$ sur $\{g(X)=1,Y=-1\}$, $c$ sur $\{g(X)=-1,Y=1\}$, $0$ ailleurs) ;
- 3ᵉ : **linéarité** de l'espérance, $\mathbb{1}_{A\cap B}=\mathbb{1}_A\mathbb{1}_B$ ;
- 4ᵉ *[Extracteur : justification]* : **espérance de l'espérance conditionnelle** et **« sortir ce qui est connu »** ($\mathbb{1}_{g(X)=\pm1}$ est $\sigma(X)$-mesurable et bornée) — Poly ch.8, Outils, Prop. 2.2 et Prop. 2.3 ; c'est le schéma du Lemme 2.2.

Par définition de $\eta(X)$, nous avons
$$\eta(X)=\mathbb{P}(Y=1\mid X)=\mathbb{E}[\mathbb{1}_{Y=1}\mid X]=1-\mathbb{E}[\mathbb{1}_{Y=-1}\mid X].$$
De plus, puisque $g(X)$ ne prend que deux valeurs, nous avons
$$\mathbb{1}_{g(X)=1}=1-\mathbb{1}_{g(X)=-1}.$$
Il vient
$$\boxed{R(g)=\mathbb{E}\big[(1-\mathbb{1}_{g(X)=-1})(1-\eta(X))\big]+c\,\mathbb{E}\big[\mathbb{1}_{g(X)=-1}\,\eta(X)\big]=1-\mathbb{E}[\eta(X)]+\mathbb{E}\big[((1+c)\eta(X)-1)\,\mathbb{1}_{g(X)=-1}\big].}$$
*[Extracteur]* Seul le second terme dépend de $g$ ; on peut l'écrire $(c+1)\,\mathbb{E}\big[\mathbb{1}_{g(X)=-1}\big(\eta(X)-\frac1{c+1}\big)\big]$.

**Q2.** Deux solutions.

• **Solution 1.** Soit $g$ une règle de classification binaire. L'excès de risque vaut (différence de deux applications de Q1, le terme $1-\mathbb{E}[\eta(X)]$ se simplifie, et $(1+c)\eta-1=(c+1)(\eta-\frac1{c+1})$) :
$$\begin{aligned}R(g)-R(g_c^\star)&=(c+1)\,\mathbb{E}\Big[\big(\mathbb{1}_{\{g(X)=-1\}}-\mathbb{1}_{\{g_c^\star(X)=-1\}}\big)\Big(\eta(X)-\frac1{c+1}\Big)\Big]\\&=(c+1)\,\mathbb{E}\Big[\big(\mathbb{1}_{\{g(X)=-1\}}-\mathbb{1}_{\{\eta(X)-1/(c+1)<0\}}\big)\Big(\eta(X)-\frac1{c+1}\Big)\Big],\end{aligned}$$
car $\{g_c^\star(X)=-1\}=\{\eta(X)<1/(c+1)\}$ (définition de $g_c^\star$). Maintenant, on remarque que pour tout $x$, on a :
$$\big(\mathbb{1}_{\{g(x)=-1\}}-\mathbb{1}_{\{\eta(x)-1/(c+1)<0\}}\big)\Big(\eta(x)-\frac1{c+1}\Big)\ge0.$$
*[Extracteur : disjonction de cas non rédigée]* si $\eta(x)\ge\frac1{c+1}$ : le second facteur est $\ge0$ et la différence d'indicatrices vaut $\mathbb{1}_{\{g(x)=-1\}}\ge0$ ; si $\eta(x)<\frac1{c+1}$ : le second facteur est $<0$ et la différence vaut $\mathbb{1}_{\{g(x)=-1\}}-1\le0$. Dans les deux cas le produit est $\ge0$.
Par suite, l'espérance est aussi positive ou nulle (**positivité de l'espérance**) et donc $R(g)\ge R(g_c^\star)$ : $g_c^\star$ est bayésienne.

• **Solution 2.** En partant de l'expression
$$R(g)=(c+1)\,\mathbb{E}\Big[\big(\mathbb{1}_{\{g(X)=-1\}}-\mathbb{1}_{\{\eta(X)-1/(c+1)<0\}}\big)\Big(\eta(X)-\frac1{c+1}\Big)\Big]$$
*(coquille du corrigé : c'est l'expression de $R(g)-R(g_c^\star)$ ; de façon équivalente, $R(g)=1-\mathbb{E}[\eta(X)]+(c+1)\mathbb{E}[\mathbb{1}_{g(X)=-1}(\eta(X)-\frac1{c+1})]$ — [Extracteur])*. Si l'on veut choisir $g$ de façon à minimiser le terme dont on calcule l'espérance, il faut prendre $g(X)=-1$ lorsque $\eta(X)-1/(c+1)<0$ ; et $g(X)=1$ dans le cas contraire. On retrouve donc que $R(g)\ge R(g_c^\star)$. *(C'est la **minimisation point par point** du risque conditionnel, Poly ch.8, Prop. 1.1 — [Extracteur].)*

*[Commentaire du corrigé, en bleu]* Dans le cas $c=1$, la fonction de perte proposée coïncide avec la fonction de perte 0/1 usuelle ; et on retrouve que la règle de décision bayésienne est $\mathbb{1}_{\{\eta(X)\ge1/2\}}$ *(lire $2\,\mathbb{1}_{\{\eta(X)\ge1/2\}}-1$, Poly ch.8, Th. 1.2 — [Extracteur])*.

*[Extracteur, non présent dans le corrigé]* Risque bayésien pour cette perte : en reportant $\mathbb{1}_{g_c^\star(X)=-1}=\mathbb{1}_{\eta(X)<1/(c+1)}$ dans Q1,
$$R(g_c^\star)=\mathbb{E}\big[\mathbb{1}_{\{\eta(X)\ge\frac1{c+1}\}}(1-\eta(X))+\mathbb{1}_{\{\eta(X)<\frac1{c+1}\}}\,c\,\eta(X)\big]=\mathbb{E}\big[\min\big(c\,\eta(X),\,1-\eta(X)\big)\big],$$
car $c\eta\le1-\eta\iff\eta\le\frac1{c+1}$ ; pour $c=1$ on retrouve l'éq. (5) du poly.

**Q3.** Supposons qu'il existe une autre règle, notée $f^\star$, telle que pour toute règle $g$ on ait $R(g)\ge R(f^\star)$. Alors nécessairement, on a $R(g_c^\star)\ge R(f^\star)$. Par ailleurs, $g_c^\star$ est aussi une règle bayésienne, donc $R(f^\star)\ge R(g_c^\star)$. On en déduit que $R(f^\star)=R(g_c^\star)$.

Traduisons cette égalité des risques : en écrivant $\{g_c^\star(X)=-1\}=\{\eta(X)<1/(c+1)\}$, nous avons (formule de la Solution 1 appliquée à $g=f^\star$)
$$\mathbb{E}[\Xi(X)]=0,\qquad\Xi(X):=\big(\mathbb{1}_{\{f^\star(X)=-1\}}-\mathbb{1}_{\{\eta(X)-1/(c+1)<0\}}\big)\Big(\eta(X)-\frac1{c+1}\Big).$$
La différence des indicatrices vaut soit $0$, soit $1$, soit $-1$.
- Le cas où elle vaut $1$ correspond à $\{f^\star(X)=-1,\ \eta(X)\ge1/(c+1)\}$ ; et dans ce cas, $\Xi(X)=\eta(X)-\frac1{c+1}\ge0$.
- Le cas où elle vaut $-1$ correspond à $\{f^\star(X)=1,\ \eta(X)<1/(c+1)\}$ ; et dans ce cas, $\Xi(X)=-\big(\eta(X)-\frac1{c+1}\big)\ge0$.

Donc $\Xi(X)\ge0$ et si son espérance est nulle, c'est que $\Xi(X)=0$ avec probabilité 1 (**une v.a. positive d'espérance nulle est nulle p.s.**). Donc nécessairement, nous devons avoir $\eta(X)=1/(c+1)$ sur l'ensemble $\big\{\mathbb{1}_{f^\star(X)=-1}-\mathbb{1}_{\eta(X)-1/(c+1)<0}\neq0\big\}$.

Nous en déduisons que **deux classifieurs bayésiens diffèrent uniquement sur l'ensemble $\{X:\eta(X)=1/(c+1)\}$** (à un ensemble de probabilité nulle près).

*[Extracteur : réponse à la question posée]* Il n'y a donc **pas unicité en général** : si $\mathbb{P}(\eta(X)=\frac1{c+1})>0$, on peut changer la décision sur cet ensemble sans changer le risque (le poids $\eta-\frac1{c+1}$ y est nul) ; l'unicité ($\mathbb{P}$-p.s.) n'a lieu que si $\mathbb{P}(\eta(X)=\frac1{c+1})=0$. Cf. Poly ch.8, Remarque « Non-unicité du classifieur bayésien » (p. 16), cas $c=1$.

**Méthodes mobilisées :**
- calcul d'un risque par **conditionnement par $X$** (tour + produit, Poly ch.8, Outils, Prop. 2.2–2.3 ; schéma du Lemme 2.2) ;
- réécriture $\mathbb{1}_{g(X)=1}=1-\mathbb{1}_{g(X)=-1}$ (classifieur binaire) ;
- **excès de risque comme espérance d'une quantité positive** (même schéma que la preuve du Th. 1.2, éq. (7) et étape 4) ;
- **minimisation point par point** du risque conditionnel (Prop. 1.1) ;
- **disjonction de cas** sur la valeur de la différence d'indicatrices ($0$, $\pm1$) ;
- « v.a. positive d'espérance nulle ⇒ nulle p.s. » (unicité).

**Pièges relevés / remarques du corrigé :**
- Le seuil est sur $\eta$ et vaut $\frac1{c+1}$, **pas** $\frac{c}{c+1}$ : $c$ pénalise la prédiction $-1$ quand $Y=1$ (faux négatif) ; plus $c$ est grand, plus le seuil baisse et plus on prédit volontiers $1$ *[Extracteur : interprétation]*.
- Ne pas oublier que le terme $1-\mathbb{E}[\eta(X)]$ ne dépend pas de $g$.
- Unicité seulement **à l'ensemble $\{\eta(X)=1/(c+1)\}$ près** ; la convention $\ge$ dans $g_c^\star$ est arbitraire.
- Coquille de la Solution 2 ($R(g)$ au lieu de $R(g)-R(g_c^\star)$) et de la remarque bleue ($\mathbb{1}_{\{\eta\ge1/2\}}$ au lieu de $2\mathbb{1}_{\{\eta\ge1/2\}}-1$).

**Résultats numériques :** seuil $\frac1{c+1}$ : $c=1\Rightarrow\frac12$ ; $c=2\Rightarrow\frac13$ ; $c=4\Rightarrow\frac15$ ; $c=\frac12\Rightarrow\frac23$ *[Extracteur]*.

---

### Exercice 2 — Risque bayésien, écart de risques, règle construite sur un $\eta$ approché, consistance du plug-in (difficulté non indiquée)

**Énoncé complet** (Énoncé p. 1–2)

On considère un problème de classification binaire, pour la perte $0-1$. On rappelle que un classifieur bayésien est donné par
$$g^\star(X)=2\,\mathbb{1}_{\eta(X)\ge1/2}-1.$$

1. Montrer que le risque bayésien $R(g^\star)$ vérifie
$$R(g^\star)=\mathbb{E}[\min(\eta(X),1-\eta(X))].$$
*On rappelle que pour deux réels $a,b$ : $\min(a,b)+|b-a|/2=(a+b)/2$.* En déduire que
$$R(g^\star)=\frac12-\frac12\mathbb{E}[|2\eta(X)-1|].$$
*Cela entraine que $R(g^\star)\le1/2$ et que $R(g^\star)=1/2$ ssi $\mathbb{P}(\eta(X)=1/2)=1$.*
2. Montrer que pour tout classifieur $g$, nous avons
$$R(g)=\mathbb{E}\big[\mathbb{1}_{\{g(X)=-1\}}(2\eta(X)-1)+(1-\eta(X))\big].\tag{1}$$
3. Soient deux classifieurs $g_1,g_2$ ; déduire de la question précédente que
$$|R(g_1)-R(g_2)|\le\mathbb{E}\big[|2\eta(X)-1|\,\mathbb{1}_{\{g_1(X)\neq g_2(X)\}}\big].$$
*Puisque $\eta(X)\in[0,1]$, $|2\eta(X)-1|\le1$ et par suite, nous avons la majoration*
$$|R(g_1)-R(g_2)|\le\mathbb{P}(g_1(X)\neq g_2(X)).$$
4. Étant donnée une fonction $\tilde\eta:X\mapsto\tilde\eta(X)\in[0,1]$, on définit le classifieur $\tilde g$ par
$$\tilde g(X):=2\,\mathbb{1}_{\{\tilde\eta(x)\ge1/2\}}-1.$$
Déduire de la question 3 que
$$R(\tilde g)-R(g^\star)\le2\,\mathbb{E}\big[|\eta(X)-\tilde\eta(X)|\,\mathbb{1}_{\{g^\star(X)\neq\tilde g(X)\}}\big].$$
5. Appelons $\mathbb{Q}$ la loi de $(X,Y)$. En pratique, cette loi est inconnue ; aussi la fonction de régression $\eta$ est-elle inconnue, et le classifieur bayésien $g^\star$ ne peut-il pas être appliqué. Supposons que l'on dispose d'un ensemble d'apprentissage $\mathcal{D}_n:=\{(X_1,Y_1),\dots,(X_n,Y_n)\}$, modélisé comme un $n$-échantillon de la loi $\mathbb{Q}$. À l'aide de $\mathcal{D}_n$, on apprend une approximation $\tilde\eta_n:X\mapsto\tilde\eta_n(X)\in[0,1]$ de la fonction $\eta$ et on considère le classifieur
$$\tilde g_n(X):=2\,\mathbb{1}_{\tilde\eta_n(X)\ge1/2}-1.$$
En utilisant la question 4, montrer que si pour $\mathbb{Q}$-presque tout $x$, $\tilde\eta_n(x)-\eta(x)\xrightarrow{\mathbb{P}_n\text{-prob}}0$, alors
$$\lim_n\mathbb{E}_n[R(\tilde g_n)-R(g^\star)]=0.$$
*L'exercice 3 donne un exemple d'apprentissage d'une approximation $\tilde\eta_n$ de la fonction de régression $\eta$, à partir de $\mathcal{D}_n$.*

**Corrigé complet** (Corrigé p. 9–10)

**Q1.** Nous avons par définition du risque associé à la fonction de perte $0-1$,
$$\begin{aligned}R(g^\star)&=\mathbb{P}(g^\star(X)\neq Y)=\mathbb{P}(g^\star(X)=1,Y=-1)+\mathbb{P}(g^\star(X)=-1,Y=1)\\&=\mathbb{E}\big[\mathbb{1}_{\{Y=-1\}}\mathbb{1}_{\{g^\star(X)=1\}}\big]+\mathbb{E}\big[\mathbb{1}_{\{Y=1\}}\mathbb{1}_{\{g^\star(X)=-1\}}\big]\\&=\mathbb{E}\big[\mathbb{E}[\mathbb{1}_{\{Y=-1\}}\mid X]\,\mathbb{1}_{\{g^\star(X)=1\}}\big]+\mathbb{E}\big[\mathbb{E}[\mathbb{1}_{\{Y=1\}}\mid X]\,\mathbb{1}_{\{g^\star(X)=-1\}}\big]\\&=\mathbb{E}\big[(1-\eta(X))\mathbb{1}_{\{g^\star(X)=1\}}+\eta(X)\mathbb{1}_{\{g^\star(X)=-1\}}\big].\end{aligned}$$
*(Le corrigé écrit $g$ au lieu de $g^\star$ dans ce calcul ; 1ʳᵉ ligne : partition de $\{g^\star(X)\neq Y\}$ ; 3ᵉ : tour + produit, Outils Prop. 2.2–2.3 ; 4ᵉ : définition de $\eta$ — [Extracteur].)*

Or, $\{X:g^\star(X)=1\}=\{X:\eta(X)\ge1/2\}$ ; et nous avons aussi $\{X:\eta(X)\ge1/2\}=\{X:\eta(X)\ge1-\eta(X)\}$. Donc
$$\mathbb{E}\big[(1-\eta(X))\mathbb{1}_{\{g^\star(X)=1\}}\big]=\mathbb{E}\big[(1-\eta(X))\mathbb{1}_{\{\eta(X)\ge1-\eta(X)\}}\big]=\mathbb{E}\big[((1-\eta(X))\wedge\eta(X))\,\mathbb{1}_{\{\eta(X)\ge1-\eta(X)\}}\big].$$
De même, on montre que
$$\mathbb{E}\big[\eta(X)\mathbb{1}_{\{g^\star(X)=-1\}}\big]=\mathbb{E}\big[((1-\eta(X))\wedge\eta(X))\,\mathbb{1}_{\{\eta(X)\le1-\eta(X)\}}\big].$$
*(Lire $\mathbb{1}_{\{\eta(X)<1-\eta(X)\}}$ : $\{g^\star(X)=-1\}=\{\eta(X)<1/2\}$ ; avec « $\le$ » l'ensemble $\{\eta=1/2\}$ serait compté deux fois — [Extracteur].)* On en déduit que
$$\boxed{R(g^\star)=\mathbb{E}\big[(1-\eta(X))\wedge\eta(X)\big].}$$

*[Commentaire du corrigé, en bleu]* La relation $a\wedge b+|a-b|/2=(a+b)/2$ se démontre facilement en considérant l'intervalle $[a\wedge b,a\vee b]$. Elle exprime que ajouter la demi-longueur de l'intervalle à la borne inférieure est égal au milieu de l'intervalle.

*[Extracteur : la déduction demandée n'est pas rédigée dans le corrigé]* Avec $a=\eta(X)$, $b=1-\eta(X)$ : $a+b=1$ et $|a-b|=|2\eta(X)-1|$, donc $\eta(X)\wedge(1-\eta(X))=\frac12-\frac12|2\eta(X)-1|$ ; en prenant l'espérance (**linéarité**),
$$R(g^\star)=\frac12-\frac12\mathbb{E}[|2\eta(X)-1|].$$
Comme $\mathbb{E}[|2\eta(X)-1|]\ge0$, $R(g^\star)\le\frac12$ ; et $R(g^\star)=\frac12\iff\mathbb{E}[|2\eta(X)-1|]=0\iff|2\eta(X)-1|=0$ p.s. (v.a. positive d'espérance nulle) $\iff\mathbb{P}(\eta(X)=1/2)=1$.

**Q2.** La relation se démontre comme dans l'exercice 1 question 1, en prenant $c=1$. On obtient le résultat voulu.
*[Extracteur : détail]* Exo 1 Q1 avec $c=1$ : $R(g)=1-\mathbb{E}[\eta(X)]+\mathbb{E}[(2\eta(X)-1)\mathbb{1}_{g(X)=-1}]=\mathbb{E}[\mathbb{1}_{\{g(X)=-1\}}(2\eta(X)-1)+(1-\eta(X))]$. C'est l'**éq. (6) du poly** (Poly ch.8, preuve du Th. 1.2, étape 2).

**Q3.** On utilise le résultat de la question précédente. Nous avons (différence de deux applications de (1), le terme $\mathbb{E}[1-\eta(X)]$ se simplifie)
$$R(g_1)-R(g_2)=\mathbb{E}\big[(2\eta(X)-1)\big(\mathbb{1}_{\{g_1(X)=-1\}}-\mathbb{1}_{\{g_2(X)=-1\}}\big)\big].$$
(C'est l'**éq. (7) du poly**.) En prenant les valeurs absolues ($|\mathbb{E}[Z]|\le\mathbb{E}[|Z|]$), on obtient
$$|R(g_1)-R(g_2)|\le\mathbb{E}\big[|2\eta(X)-1|\,\big|\mathbb{1}_{\{g_1(X)=-1\}}-\mathbb{1}_{\{g_2(X)=-1\}}\big|\big].$$
La différence des indicatrices vaut $0$, $1$ ou $-1$ et elle est non nulle lorsque $g_1(X)\neq g_2(X)$ ; nous en déduisons donc que
$$\big|\mathbb{1}_{\{g_1(X)=-1\}}-\mathbb{1}_{\{g_2(X)=-1\}}\big|=\mathbb{1}_{\{g_1(X)\neq g_2(X)\}}.$$
Ce qui conclut la démonstration. *[Extracteur]* La seconde majoration vient de $|2\eta(X)-1|\le1$ et $\mathbb{E}[\mathbb{1}_{\{g_1(X)\neq g_2(X)\}}]=\mathbb{P}(g_1(X)\neq g_2(X))$.

**Q4.** On applique le résultat de la question précédente avec $g_1\leftarrow\tilde g$ et $g_2\leftarrow g^\star$. Il vient (avec $|2\eta-1|=2|\eta-1/2|$)
$$|R(\tilde g)-R(g^\star)|\le2\,\mathbb{E}\big[|\eta(X)-1/2|\,\mathbb{1}_{\{\tilde g(X)\neq g^\star(X)\}}\big].$$
Par définition de $g^\star$, nous avons $R(\tilde g)-R(g^\star)\ge0$ pour tout classifieur $\tilde g$ (**$g^\star$ est bayésien**, Poly ch.8, Th. 1.2), ce qui entraine
$$R(\tilde g)-R(g^\star)\le2\,\mathbb{E}\big[|\eta(X)-1/2|\,\mathbb{1}_{\{\tilde g(X)\neq g^\star(X)\}}\big].$$
Considérons deux cas.
- Dans le premier cas, $\tilde g(X)=1$ et $g^\star(X)=-1$. Puisque $\{X:\tilde g(X)=1,g^\star(X)=-1\}=\{X:\tilde\eta(X)\ge1/2,\ \eta(X)<1/2\}$, nous avons sur cet ensemble :
$$|\eta(X)-1/2|=\eta(X)-1/2\le\eta(X)-\tilde\eta(X)=|\eta(X)-\tilde\eta(X)|.$$
*(Coquille du corrigé : sur cet ensemble $\eta<1/2$, donc $|\eta-1/2|=1/2-\eta\le\tilde\eta-\eta$ ; les deux cas sont permutés dans le texte, la conclusion est inchangée — [Extracteur].)*
- Dans le second cas, $\tilde g(X)=-1$ et $g^\star(X)=1$. De la même façon, nous montrons que sur cet ensemble
$$|\eta(X)-1/2|=1/2-\eta(X)\le\tilde\eta(X)-\eta(X)=|\eta(X)-\tilde\eta(X)|.$$
*(Même remarque : ici $\eta\ge1/2>\tilde\eta$, donc $|\eta-1/2|=\eta-1/2\le\eta-\tilde\eta$ — [Extracteur].)*

Par suite, nous avons établi que
$$|\eta(X)-1/2|\,\mathbb{1}_{\{\tilde g(X)\neq g^\star(X)\}}\le|\eta(X)-\tilde\eta(X)|\,\mathbb{1}_{\{\tilde g(X)\neq g^\star(X)\}}$$
ce qui termine la démonstration (**croissance de l'espérance**).

**Q5.** En utilisant la question 4 (appliquée à $\tilde\eta=\tilde\eta_n$ à $\mathcal{D}_n$ fixé, puis en majorant l'indicatrice par 1), on a
$$\mathbb{E}_n[R(\tilde g_n)-R(g^\star)]\le2\,\mathbb{E}_n\big[\mathbb{E}[|\tilde\eta_n(X)-\eta(X)|]\big].$$
*[Commentaire du corrigé, en bleu]* Dans la relation précédente, la première espérance $\mathbb{E}$ désigne l'espérance par rapport à $X$ – l'aléa porté par $\mathcal{D}_n$ étant « gelé ». Tandis que la seconde $\mathbb{E}_n$ consiste ensuite à prendre la valeur moyenne sur l'aléa porté par $\mathcal{D}_n$. *(Légitimé par l'indépendance de $(X,Y)$ et $\mathcal{D}_n$, Poly ch.8, Outils, Prop. 2.5 ; Compléments §4.4 — [Extracteur].)*

Puisque $|\tilde\eta_n(X)-\eta(X)|\le1$, nous pouvons appliquer le **théorème de Fubini** et nous obtenons
$$\mathbb{E}_n[R(\tilde g_n)-R(g^\star)]\le2\,\mathbb{E}\big[\mathbb{E}_n[|\tilde\eta_n(X)-\eta(X)|]\big].$$
Pour démontrer que le terme de droite tend vers zéro, nous le voyons comme $2\,\mathbb{E}[\phi_n(X)]$ ayant posé
$$\phi_n(X):=\mathbb{E}_n[|\tilde\eta_n(X)-\eta(X)|]$$
et nous allons appliquer le **théorème de convergence dominée**. Puisque $|\tilde\eta_n(X)-\eta(X)|\le1$, nous avons $|\phi_n(X)|\le1$ (**domination** par la constante 1, intégrable sous la probabilité $\mathbb{Q}$). Il reste à montrer que pour $\mathbb{Q}$-presque tout $x$, nous avons $\lim_n\phi_n(x)=0$. Soit $x$ fixé ; nous écrivons pour tout $\varepsilon>0$,
$$\phi_n(x)=\mathbb{E}_n[|\tilde\eta_n(x)-\eta(x)|]\le\mathbb{P}_n(|\tilde\eta_n(x)-\eta(x)|\ge\varepsilon)+\varepsilon.$$
*[Extracteur : justification]* on coupe selon $\{|\tilde\eta_n(x)-\eta(x)|\ge\varepsilon\}$ (où la variable est $\le1$) et son complémentaire (où elle est $<\varepsilon$).
Cette relation étant vraie pour tout $\varepsilon$, et en utilisant la **convergence en probabilité** de $\tilde\eta_n(x)$ vers $\eta(x)$ ($\limsup_n\phi_n(x)\le\varepsilon$ pour tout $\varepsilon>0$), on en déduit que $\lim_n\mathbb{E}_n[|\tilde\eta_n(x)-\eta(x)|]=0$. Ce qui termine la preuve.

*[Commentaire du corrigé, en bleu]* C'est un résultat classique : si on sait estimer de façon consistante la fonction de régression $\eta(x)$ alors l'excès de risque du classifieur $\tilde g_n$ associé à cette estimation $\tilde\eta_n$ tend vers 0 dans $L^1$ (ou de façon équivalente en proba, puisque les v.a. sont bornées).

*[Extracteur]* C'est exactement la **Prop. 1.5 du poly ch.8** (et sa preuve : majoration (13), Fubini-Tonelli, double convergence dominée) ; « $\mathbb{Q}$-presque tout $x$ » signifie « pour presque tout $x$ sous la **loi marginale de $X$** ». L'équivalence $L^1$ / probabilité est la Déf. 4.2 et l'éq. (15)–(16) des Compléments.

**Méthodes mobilisées :**
- **conditionnement par $X$** (tour, produit — Outils Prop. 2.2–2.3, Lemme 2.2) ;
- identité $a\wedge b+|a-b|/2=(a+b)/2$ ; v.a. positive d'espérance nulle ;
- réutilisation de l'Exo 1 avec $c=1$ (éq. (6)) ; **différence de risques** (éq. (7)) ;
- inégalité $|\mathbb{E}Z|\le\mathbb{E}|Z|$, $|\mathbb{1}_A-\mathbb{1}_B|=\mathbb{1}_{A\triangle B}$ ;
- **disjonction de cas** sur $\{\tilde g\neq g^\star\}$ ;
- **Fubini(-Tonelli)** (intégrande positif borné), **indépendance test / apprentissage** ;
- **convergence dominée** (deux fois : en probabilité ⇒ en moyenne pour des v.a. bornées, puis intégration en $x$) ;
- découpage $\mathbb{E}|Z|\le\mathbb{P}(|Z|\ge\varepsilon)+\varepsilon$ pour $|Z|\le1$.

**Pièges relevés / remarques du corrigé :**
- Le risque bayésien est la moyenne de la **probabilité de la classe minoritaire** ; il est $\le1/2$, avec égalité ssi $\eta\equiv1/2$ p.s. (les attributs n'apportent aucune information).
- Dans Q4, la valeur absolue disparaît **parce que $g^\star$ est bayésien** ; la majoration $|\eta-1/2|\le|\eta-\tilde\eta|$ n'est vraie **que sur $\{\tilde g\neq g^\star\}$** (même seuil $1/2$ des deux côtés).
- Q5 : **double aléa** — $\mathbb{E}$ sur le point de test, $\mathbb{E}_n$ sur l'échantillon ; ne pas confondre $R(\tilde g_n)$ (v.a. fonction de $\mathcal{D}_n$) et $\mathbb{E}_n[R(\tilde g_n)]$.
- La convergence en probabilité ponctuelle ne suffit pas directement : il faut la **bornitude** ($\tilde\eta_n,\eta\in[0,1]$) pour passer à l'espérance.
- Coquilles : $g$ pour $g^\star$ (Q1), « $\le$ » pour « $<$ » (Q1), cas permutés (Q4).

**Résultats numériques :** si $\eta\equiv1/2$ : $R(g^\star)=1/2$ ; si $\eta\in\{0,1\}$ p.s. : $R(g^\star)=0$ *[Extracteur]*.

---

### Exercice 3 — Analyse discriminante linéaire et quadratique (LDA / QDA) : fonction de régression, EMV, consistance, plug-in, multi-classe (difficulté non indiquée)

**Énoncé complet** (Énoncé p. 2–4)

On considère un problème de classification binaire lorsque les attributs sont vectoriels ($X\in\mathbb{R}^d$). On suppose que la loi du couple $(X,Y)$ est donnée par
- Conditionnellement à $Y=i$, la loi des attributs $X$ est une loi gaussienne de moyenne $\mu_i\in\mathbb{R}^d$ et de matrice de covariance $\Sigma_i$ ; nous supposerons $\Sigma_{-1},\Sigma_1$ inversibles.
- La variable réponse $Y$ suit une loi de Bernoulli de paramètre $\pi_1$. On pose $\pi_{-1}:=\mathbb{P}(Y=-1)=1-\pi_1$.

En pratique, les paramètres $\theta:=(\pi_1,\mu_{-1},\mu_1,\Sigma_{-1},\Sigma_1)$ qui définissent ces lois sont inconnus : ils vont être appris à l'aide d'un ensemble d'apprentissage $\mathcal{D}_n$.

1. Montrer que la fonction de régression est donnée par
$$\eta_\theta(x)=\frac{1}{1+\exp(-\phi_\theta(x))}=\mathrm{sigm}(\phi_\theta(x)),$$
où $\mathrm{sigm}$ est la fonction sigmoïde $t\mapsto1/(1+\exp(-t))$ et $\phi_\theta$ est une fonction que l'on précisera.
Interpréter la règle de classification
$$g_\theta(X):=2\,\mathbb{1}_{\{\eta_\theta(X)\ge1/2\}}-1.$$
2. Montrer que si l'on modélise la loi de $(X,Y)$ en supposant que $\Sigma_{-1}=\Sigma_1=\Sigma$, alors il existe $w_\theta\in\mathbb{R}^d$ et $A_\theta\in\mathbb{R}$ tels que $\phi_\theta(x)=w_\theta^Tx+A_\theta$.
Interpréter la règle de classification dans ce cas.

*Dans le cas où $\Sigma_1=\Sigma_{-1}$, on parle de "Linear Discriminant Analysis" (LDA) ; tandis que dans le cas général $\Sigma_1\neq\Sigma_{-1}$, on parle de "Quadratic Discriminant Analysis" (QDA).*

On dispose d'un ensemble d'apprentissage $\{(X_i,Y_i)\}_{i=1}^n$ vu comme un $n$-échantillon du modèle
$$\Big(\mathbb{R}^d\times\{-1,1\},\ \mathcal{B}(\mathbb{R}^d)\times\{-1,1\},\ \{\mathbb{Q}_\theta,\ \theta\in\Theta:=\,]0,1[\,\times\mathbb{R}^d\times\mathbb{R}^d\times M_d^+\times M_d^+\}\Big)$$
où $M_d^+$ est l'ensemble des matrices de covariance $d\times d$ inversibles.

3. Écrire la log-vraisemblance des observations.
4. Calculer l'estimateur du maximum de vraisemblance $\hat\theta_n$ de $\theta$.
5. Montrer qu'il est consistant.
6. Soit la règle de classification $\tilde g_n(X):=2\,\mathbb{1}_{\{\eta_{\hat\theta_n}(X)\ge1/2\}}-1$. En utilisant la question 5 de l'exercice 2, montrer que pour tout $\theta\in\Theta$,
$$\lim_n\mathbb{E}_{n,\theta}\big[|R(\tilde g_n)-R(g_\theta^\star)|\big]=0,$$
où $R(g_\theta^\star)$ est le risque bayésien i.e. le risque de la règle de classification
$$g^\star(X):=2\,\mathbb{1}_{\{\eta_\theta(X)\ge1/2\}}-1.$$
7. Reprendre ces questions dans le cas du modèle plus simple où l'on suppose que les deux classes ont même covariance ($\Sigma_{-1}=\Sigma_1=\Sigma$).
8. Dans cette configuration de covariance commune, comment étendre cette méthode à plus de deux classes ?

*Texte de la Figure 1 (Énoncé p. 3–4) : voir §0.2.* Légende : « Figure 1 – Exercice 3. Classifieurs LDA (colonne de gauche) et QDA (colonne de droite), et quatre ensembles d'apprentissage (lignes 1 à 4). La ligne grise correspond à la ligne de séparation des classes par le classifieur $g_{\hat\theta_n}$. Les moyennes de chaque classe sont représentées par les $\star$. Les attributs qui sont mal classés sont représentés par des $\times$. Deux premières lignes : les données d'apprentissage sont issues de deux populations avec même matrice de covariance (et sur la première ligne, $\Sigma_{-1}^\star=\Sigma_1^\star=\mathrm{I}$) ; et dans les deux dernières lignes, ces matrices sont différentes. »
*Description visuelle [Extracteur] :* ligne 1 (nuages sphériques), LDA et QDA donnent des frontières quasi identiques (droite / courbe très peu incurvée) ; ligne 2 (nuages elliptiques allongés, même orientation), frontières quasi rectilignes dans les deux colonnes ; ligne 3 (covariances différentes), LDA droite oblique, QDA frontière courbe (hyperbole) ; ligne 4 (un nuage très étiré verticalement, l'autre étalé), LDA sépare mal (nombreuses croix), QDA entoure le nuage étiré d'une courbe fermée/étroite.

**Corrigé complet** (Corrigé p. 11–16)

**Q1.** La fonction de régression est donnée par (formule de Bayes, Poly ch.8, Prop. 1.4 ; densités gaussiennes de classe $q_i(x)=(2\pi)^{-d/2}(\det\Sigma_i)^{-1/2}e^{-(x-\mu_i)^T\Sigma_i^{-1}(x-\mu_i)/2}$, Remarque §2.8 ; on simplifie numérateur et dénominateur par $(2\pi)^{-d/2}(\det\Sigma_1)^{-1/2}$ — [Extracteur : justifications])
$$\begin{aligned}\eta_\theta(x)&=\mathbb{Q}_\theta(Y=1\mid X=x)\\&=\frac{\pi_1e^{-(x-\mu_1)^T\Sigma_1^{-1}(x-\mu_1)/2}}{\pi_1e^{-(x-\mu_1)^T\Sigma_1^{-1}(x-\mu_1)/2}+\pi_{-1}\,(\det\Sigma_1/\det\Sigma_{-1})^{1/2}\,e^{-(x-\mu_{-1})^T\Sigma_{-1}^{-1}(x-\mu_{-1})/2}}\\&=\Big(1+\frac{\pi_{-1}}{\pi_1}(\det\Sigma_1/\det\Sigma_{-1})^{1/2}\\&\qquad\exp\big(-x^T(\Sigma_{-1}^{-1}-\Sigma_1^{-1})x/2+\mu_1^T\Sigma_1^{-1}\mu_1/2-\mu_{-1}^T\Sigma_{-1}^{-1}\mu_{-1}/2+\mu_{-1}^T\Sigma_{-1}^{-1}x-\mu_1^T\Sigma_1^{-1}x\big)\Big)^{-1}.\end{aligned}$$
(Développement des formes quadratiques, $\Sigma_i^{-1}$ symétrique.) On en déduit que (en écrivant $\eta_\theta=1/(1+e^{-\phi_\theta})$)
$$\boxed{\begin{aligned}\phi_\theta(x)&=\frac12x^T(\Sigma_{-1}^{-1}-\Sigma_1^{-1})x-\mu_{-1}^T\Sigma_{-1}^{-1}x\\&\quad+\mu_1^T\Sigma_1^{-1}x-\frac12\mu_1^T\Sigma_1^{-1}\mu_1+\frac12\mu_{-1}^T\Sigma_{-1}^{-1}\mu_{-1}+\ln\Big(\frac{\pi_1}{\pi_{-1}}(\det\Sigma_{-1}/\det\Sigma_1)^{1/2}\Big)\end{aligned}}$$
*[Extracteur]* C'est l'éq. (11) du poly développée : $\phi_\theta(x)=\log\frac{\pi_1q_1(x)}{\pi_{-1}q_{-1}(x)}$ (logit de $\eta_\theta$).

*[Commentaire du corrigé, en bleu]* La règle de classification est équivalente à $\phi_\theta(X)\ge0\iff Y=1$ *(lire : on prédit $1$ ssi $\phi_\theta(X)\ge0$, car $\mathrm{sigm}$ est strictement croissante et $\mathrm{sigm}(0)=1/2$, Remarque §2.9 — [Extracteur])*. Ici, $x\mapsto\phi_\theta(x)$ est une forme quadratique. On parle de **Quadratic Discriminant Analysis (QDA)**. La géométrie de la séparation correspond à une forme quadrique en dimension $d$ dont la signature dépend de la réduction simultanée de $\Sigma_{-1}$ et $\Sigma_1$.

**Q2.** Lorsque $\Sigma_{-1}=\Sigma_1=\Sigma$, il vient (le terme quadratique et le terme en déterminant s'annulent)
$$\phi_\theta(x)=(\mu_1-\mu_{-1})^T\Sigma^{-1}x-\frac12\mu_1^T\Sigma^{-1}\mu_1+\frac12\mu_{-1}^T\Sigma^{-1}\mu_{-1}+\ln\frac{\pi_1}{\pi_{-1}}$$
qui est bien de la forme linéaire $w_\theta^Tx+A_\theta$ *(avec $w_\theta=\Sigma^{-1}(\mu_1-\mu_{-1})$ par symétrie de $\Sigma^{-1}$ et $A_\theta=-\frac12\mu_1^T\Sigma^{-1}\mu_1+\frac12\mu_{-1}^T\Sigma^{-1}\mu_{-1}+\ln\frac{\pi_1}{\pi_{-1}}$ — [Extracteur], cf. Poly ch.8, p. 19)*.

De plus, la règle de décision bayésienne est donnée par
$$g_\theta^\star(x)=2\,\mathbb{1}_{\{\eta_\theta(x)\ge1/2\}}-1=2\,\mathbb{1}_{\{w_\theta^Tx+A_\theta\ge0\}}-1.$$
La frontière de décision est donc portée par un **hyperplan** orienté par le vecteur *normal* $w_\theta$ : les points situés d'un côté de cet hyperplan sont classés « classe −1 » et ceux de l'autre côté sont classés « classe 1 ». On parle de **Linear Discriminant Analysis (LDA)**.
Notons que si les deux classes sont équilibrées (i.e. $\pi_{-1}=\pi_1$) alors le milieu du segment $[\mu_{-1},\mu_1]$ est sur l'hyperplan — remarquer en effet que $\phi_\theta((\mu_1+\mu_{-1})/2)=0$.
*[Extracteur : vérification]* $(\mu_1-\mu_{-1})^T\Sigma^{-1}\frac{\mu_1+\mu_{-1}}2=\frac12(\mu_1^T\Sigma^{-1}\mu_1-\mu_{-1}^T\Sigma^{-1}\mu_{-1})$ (termes croisés égaux par symétrie), et $\ln1=0$.
Si $\Sigma$ est la matrice identité, alors le vecteur $w$ normal à l'hyperplan de décision est tout simplement $\mu_1-\mu_{-1}$.

**Q3.** On écrit la log-vraisemblance d'une observation (densité par rapport à $\mathrm{Leb}\otimes\mathrm{c}$ ; $\frac{Y+1}2=\mathbb{1}_{\{Y=1\}}$, $\frac{1-Y}2=\mathbb{1}_{\{Y=-1\}}$ — [Extracteur]) :
$$\begin{aligned}\ell(X,Y;\theta)&=-\frac d2\ln(2\pi)+\frac{Y+1}2\ln\Big(\det(\Sigma_1)^{-1/2}(1-\pi_{-1})e^{-(X-\mu_1)^T\Sigma_1^{-1}(X-\mu_1)/2}\Big)\\&\quad+\frac{(1-Y)}2\ln\Big(\det(\Sigma_{-1})^{-1/2}\pi_{-1}e^{-(X-\mu_{-1})^T\Sigma_{-1}^{-1}(X-\mu_{-1})/2}\Big)\\&=-\frac d2\ln(2\pi)-\frac{\frac{Y+1}2\ln(\det(\Sigma_1))+\frac{(1-Y)}2\ln(\det(\Sigma_{-1}))}{2}+\frac{Y+1}2\ln(1-\pi_{-1})+\frac{(1-Y)}2\ln\pi_{-1}\\&\quad-\frac{Y+1}2\,\frac{(X-\mu_1)^T\Sigma_1^{-1}(X-\mu_1)}2-\frac{(1-Y)}2\,\frac{(X-\mu_{-1})^T\Sigma_{-1}^{-1}(X-\mu_{-1})}2.\end{aligned}$$
*(Le corrigé écrit « $-\frac d2\ln(\pi/2)$ » : coquille pour $-\frac d2\ln(2\pi)$ ; constante sans effet sur l'EMV.)*

On observe un échantillon d'apprentissage de $n$ données i.i.d., la log-vraisemblance de l'échantillon $\theta\mapsto\ell_n(X_1,Y_1,\dots,X_n,Y_n;\theta)$ satisfait donc (**indépendance** : la vraisemblance est un produit, son log une somme) pour tout $\theta\in\Theta$, $\ell_n(X_1,Y_1,\dots,X_n,Y_n;\theta)=\sum_{i=1}^n\ell(X_i,Y_i;\theta)$. En particulier la fonction de vraisemblance de l'échantillon est donnée par $\ell_n(X_1,Y_1,\dots,X_n,Y_n;\cdot):\Theta\to\mathbb{R}$,
$$\boxed{\begin{aligned}\theta\mapsto\ell_n(\theta):=&-n\frac d2\ln(2\pi)-\Big(\sum_{k=1}^n\frac{Y_k+1}2\Big)\frac{\log(\det(\Sigma_1))}2-\Big(\sum_{k=1}^n\frac{(1-Y_k)}2\Big)\frac{\log(\det(\Sigma_{-1}))}2\\&+\Big(\sum_{k=1}^n\frac{Y_k+1}2\Big)\ln(1-\pi_{-1})+\Big(\sum_{k=1}^n\frac{(1-Y_k)}2\Big)\ln\pi_{-1}\\&-\sum_{k=1}^n\frac{Y_k+1}2\,\frac{(X_k-\mu_1)^T\Sigma_1^{-1}(X_k-\mu_1)}2-\sum_{k=1}^n\frac{(1-Y_k)}2\,\frac{(X_k-\mu_{-1})^T\Sigma_{-1}^{-1}(X_k-\mu_{-1})}2.\end{aligned}}$$
*[Extracteur]* Avec $N_1:=\sum_k\mathbb{1}_{\{Y_k=1\}}=\sum_k\frac{Y_k+1}2$ et $N_{-1}:=\sum_k\mathbb{1}_{\{Y_k=-1\}}=n-N_1$, la log-vraisemblance se **sépare** en un terme en $\pi_{-1}$ seul, un terme en $(\mu_1,\Sigma_1)$ seul et un terme en $(\mu_{-1},\Sigma_{-1})$ seul.

**Q4.** En dérivant par rapport à $\pi_{-1},\mu_1,\mu_{-1}$ et en étudiant le comportement aux limites par rapport à ces trois paramètres, on obtient les estimateurs de maximum de vraisemblance :
$$\boxed{\begin{aligned}\hat\pi_{-1,n}&:=\frac1n\sum_{k=1}^n\frac{(1-Y_k)}2=\frac1n\sum_{k=1}^n\mathbb{1}_{\{Y_k=-1\}},\\\hat\mu_{-1,n}&:=\frac{\sum_{k=1}^n(1-Y_k)X_k}{\sum_{k=1}^n(1-Y_k)}=\frac{\sum_{k=1}^n\mathbb{1}_{\{Y_k=-1\}}X_k}{\sum_{k=1}^n\mathbb{1}_{\{Y_k=-1\}}},\\\hat\mu_{1,n}&:=\frac{\sum_{k=1}^n(Y_k+1)X_k}{\sum_{k=1}^n(Y_k+1)}=\frac{\sum_{k=1}^n\mathbb{1}_{\{Y_k=1\}}X_k}{\sum_{k=1}^n\mathbb{1}_{\{Y_k=1\}}}.\end{aligned}}$$
*[Extracteur : calculs non rédigés]* $\partial_{\pi_{-1}}\ell_n=-\frac{N_1}{1-\pi_{-1}}+\frac{N_{-1}}{\pi_{-1}}=0\iff\pi_{-1}=N_{-1}/n$ ; la fonction $\pi_{-1}\mapsto N_1\ln(1-\pi_{-1})+N_{-1}\ln\pi_{-1}$ est strictement concave et tend vers $-\infty$ aux bords dès que $N_1,N_{-1}\ge1$. $\nabla_{\mu_1}\ell_n=\sum_{k\in\mathcal{K}_1}\Sigma_1^{-1}(X_k-\mu_1)=0\iff\mu_1=\frac1{N_1}\sum_{k\in\mathcal{K}_1}X_k$ (forme quadratique strictement concave en $\mu_1$, **quel que soit $\Sigma_1$**) ; de même pour $\mu_{-1}$. On a $\hat\pi_{1,n}=1-\hat\pi_{-1,n}=\frac1n\sum_k\mathbb{1}_{\{Y_k=1\}}$.

• **Solution 1.** Le fait que l'on ait jusqu'ici défini les estimateurs tels que pour tout $\theta\in\Theta$
$$\ell_n(\theta)\le\ell_n(\hat\pi_{-1,n},\hat\mu_{-1,n},\hat\mu_{1,n},\Sigma_{-1},\Sigma_1)$$
justifie le fait que l'on se contente de regarder la maximisation de
$$\Sigma_{-1}\mapsto-N_{-1}\frac{\log(\det(\Sigma_{-1}))}2-\sum_{k\in\mathcal{K}_{-1}}\frac{(X_k-\hat\mu_{-1,n})^T\Sigma_{-1}^{-1}(X_k-\hat\mu_{-1,n})}2,$$
où $N_{-1}$ est le nombre de points dont le label vaut $-1$ *(le corrigé écrit « 0 »)*, points indexés par $\mathcal{K}_{-1}$. **Formellement**, cette maximisation est celle que l'on résout quand on cherche l'estimateur MV d'une matrice de covariance d'un modèle $\mathrm{N}(\hat\mu_{-1,n},\Sigma_{-1})$ à moyenne connue, à partir de $N_{-1}$ réalisations indépendantes. Nous savons que pour les familles exponentielles de modèle statistique, l'estimateur MV correspond à l'estimateur des moments de $x\mapsto xx^T$ (voir PC2). Par suite, cette fonction est maximale en
$$\boxed{\hat\Sigma_{-1,n}:=\frac1{N_{-1}}\sum_{k\in\mathcal{K}_{-1}}(X_k-\hat\mu_{-1,n})(X_k-\hat\mu_{-1,n})^T=\frac1{\sum_{k=1}^n\mathbb{1}_{\{Y_k=-1\}}}\sum_{k=1}^n\frac{(1-Y_k)}2(X_k-\hat\mu_{-1,n})(X_k-\hat\mu_{-1,n})^T.}$$
De même, on obtient
$$\boxed{\hat\Sigma_{1,n}:=\frac1{N_1}\sum_{k\in\mathcal{K}_1}(X_k-\hat\mu_{1,n})(X_k-\hat\mu_{1,n})^T=\frac1{\sum_{k=1}^n\mathbb{1}_{\{Y_k=1\}}}\sum_{k=1}^n\frac{Y_k+1}2(X_k-\hat\mu_{1,n})(X_k-\hat\mu_{1,n})^T.}$$
*[Extracteur]* Ce sont des **covariances empiriques non corrigées** (facteur $1/N_i$), généralisation matricielle de l'Ex. 1.10 du Poly ch.2 ; l'argument « on fixe d'abord les moyennes à leur optimum, puis on optimise en $\Sigma$ » est une **maximisation en deux temps (profil)**. Leur inversibilité (nécessaire pour être dans $M_d^+$) demande assez de points dans chaque classe (au moins $d+1$, et alors p.s. vraie pour des lois à densité) — point non discuté dans le corrigé.

• **Solution 2 (raisonnement dans le cas $\Sigma_{-1}=\Sigma_1=\Sigma$).** Pour calculer le maximum de vraisemblance en $\Sigma$, on utilise un peu de **calcul différentiel**. La différentielle de la fonction inverse est donnée par le calcul suivant :
$$(\Sigma+H)^{-1}=\Sigma^{-1}-\Sigma^{-1}H\Sigma^{-1}+o(\|H\|).$$
De même,
$$\log\det(\Sigma+H)=\log\det(\Sigma)+\mathrm{Tr}\big(\Sigma^{-1}H\big)+o(\|H\|).$$
Enfin, si $C_n(\pi_1)$ désigne une quantité ne dépendant que des données et de $\pi_1$, on écrit la vraisemblance astucieusement (astuce de la trace : $u^TAu=\mathrm{Tr}(Auu^T)$ et linéarité de la trace — [Extracteur]) :
$$\begin{aligned}\ell_n(\Sigma)&=-\frac n2\log(\det(\Sigma))-\frac12\sum_{i=1}^n\Big[\mathbb{1}_{\{Y_i=1\}}(X_i-\mu_1)^T\Sigma^{-1}(X_i-\mu_1)+\mathbb{1}_{\{Y_i=-1\}}(X_i-\mu_{-1})^T\Sigma^{-1}(X_i-\mu_{-1})\Big]+C_n(\pi_1)\\&=-\frac n2\log(\det(\Sigma))-\frac12\mathrm{Tr}\Big(\Sigma^{-1}\sum_{i=1}^n\Big[\mathbb{1}_{\{Y_i=1\}}(X_i-\mu_1)(X_i-\mu_1)^T+\mathbb{1}_{\{Y_i=-1\}}(X_i-\mu_{-1})(X_i-\mu_{-1})^T\Big]\Big)+C_n(\pi_1)\\&=-\frac n2\log(\det(\Sigma))-\frac12\mathrm{Tr}\big(\Sigma^{-1}\hat S_n\big)+C_n(\pi_1),\end{aligned}$$
où on a introduit $\hat S_n$ par (moyennes remplacées par leurs EMV, qui ne dépendent pas de $\Sigma$) :
$$\hat S_n:=\sum_{i=1}^n\mathbb{1}_{\{Y_i=1\}}(X_i-\hat\mu_{1,n})(X_i-\hat\mu_{1,n})^T+\mathbb{1}_{\{Y_i=-1\}}(X_i-\hat\mu_{-1,n})(X_i-\hat\mu_{-1,n})^T.$$
La condition d'annulation du gradient en $\Sigma$ (dérivée directionnelle nulle dans toute direction $H$, par les deux développements ci-dessus) permet alors d'écrire que le maximum de vraisemblance en $\Sigma$ satisfait :
$$\forall H\in\mathcal{M}_d(\mathbb{R}):\ -\frac n2\mathrm{Tr}\big(\Sigma^{-1}H\big)+\frac12\mathrm{Tr}\big(\Sigma^{-1}H\Sigma^{-1}\hat S_n\big)=0,$$
c'est-à-dire $\forall H:\ \mathrm{Tr}\big(\Sigma^{-1}H(-nI_d+\Sigma^{-1}\hat S_n)\big)=0$, d'où $\Sigma^{-1}\hat S_n=nI_d$. On en déduit donc que
$$\boxed{\hat\Sigma_n=\frac{\hat S_n}n.}$$
*Coquilles du corrigé (p. 13), corrigées ci-dessus — [Extracteur] :* (a) le corrigé écrit $\mathbb{1}^T_{\{Y_i=1\}}(X_i-\mu_1)\Sigma^{-1}(X-\mu_1)$ (transposée mal placée, $X$ au lieu de $X_i$) ; (b) il passe à « $+\mathrm{Tr}(\Sigma^{-1}\hat S_n)$ » au lieu de $-\frac12\mathrm{Tr}(\Sigma^{-1}\hat S_n)$ ; (c) il définit $\hat S_n$ avec $(X_i-\hat\mu)^T(X_i-\hat\mu)$ (scalaire) au lieu de $(X_i-\hat\mu)(X_i-\hat\mu)^T$ ; (d) la condition s'écrit sans le facteur $\frac12$ devant le second terme ; (e) il écrit « $Tr(\Sigma^{-1}H(nId+\Sigma^{-1}\hat S_n))=0$ » (signe). **Le résultat final $\hat\Sigma_n=\hat S_n/n$ est correct.**

**Q5.** Par un argument de **loi faible des grands nombres** et le **lemme de Slutsky**, on a
$$\begin{aligned}\hat\pi_{-1,n}&\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\mathbb{Q}_\theta(Y=-1)=\pi_{-1},\\\hat\mu_{-1,n}&:=\frac{n^{-1}\sum_{k=1}^n\mathbb{1}_{\{Y_k=-1\}}X_k}{n^{-1}\sum_{k=1}^n\mathbb{1}_{\{Y_k=-1\}}}\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\mu_{-1},\\\hat\mu_{1,n}&:=\frac{\sum_{k=1}^n\frac{Y_k+1}2X_k}{\sum_{k=1}^n\frac{Y_k+1}2}=\frac{\sum_{k=1}^n\mathbb{1}_{\{Y_k=1\}}X_k}{\sum_{k=1}^n\mathbb{1}_{\{Y_k=1\}}}\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\mu_1,\\\hat\Sigma_{-1,n}&=\frac{n^{-1}\sum_{k=1}^n\mathbb{1}_{\{Y_k=-1\}}(X_kX_k^T)}{n^{-1}\sum_{k=1}^n\mathbb{1}_{\{Y_k=-1\}}}-\hat\mu_{-1,n}\hat\mu_{-1,n}^T\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\Sigma_{-1},\\\hat\Sigma_{1,n}&\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\Sigma_1.\end{aligned}$$
*(Le corrigé place $-\hat\mu_{-1,n}\hat\mu_{-1,n}^T$ au numérateur : coquille.)*
*[Extracteur : détail des limites]* Les couples $(X_k,Y_k)$ sont i.i.d. ; par la LGN (Poly ch.2, Outils, Th. 2.1, appliquée coordonnée par coordonnée, Poly ch.6, Outils, Prop. 2.1) : $n^{-1}\sum_k\mathbb{1}_{\{Y_k=-1\}}\to\pi_{-1}>0$, $n^{-1}\sum_k\mathbb{1}_{\{Y_k=-1\}}X_k\to\mathbb{E}_\theta[\mathbb{1}_{\{Y=-1\}}X]=\pi_{-1}\mu_{-1}$, $n^{-1}\sum_k\mathbb{1}_{\{Y_k=-1\}}X_kX_k^T\to\pi_{-1}(\Sigma_{-1}+\mu_{-1}\mu_{-1}^T)$ (moments d'ordre 2 finis pour une gaussienne). Le passage au quotient et au produit est le **théorème de continuité pour la convergence en probabilité** (Poly ch.6, Th. 1.1 et Outils Th. 2.1) — ce que le corrigé appelle « lemme de Slutsky » (Poly ch.6, Lemme 1.1, version convergence vers des constantes). L'identité $\frac1{N_{-1}}\sum_{\mathcal{K}_{-1}}(X_k-\hat\mu)(X_k-\hat\mu)^T=\frac1{N_{-1}}\sum_{\mathcal{K}_{-1}}X_kX_k^T-\hat\mu\hat\mu^T$ est la formule de König-Huygens. Le corrigé démontre donc la consistance **directement** (estimateurs explicites), sans invoquer la consistance générale de l'EMV du ch.7 (pourtant citée dans Poly ch.8, §2.10).

**Q6.** Puisque pour $\mathbb{Q}_\theta$-presque tout $x$, $\theta\mapsto\phi_\theta(x)$ est une fonction continue sur $\Theta$, il vient que pour $\mathbb{Q}_\theta$-presque tout $x$,
$$\phi_{\hat\theta_n}(x)\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\phi_\theta(x),\qquad\eta_{\hat\theta_n}(x)\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\eta_\theta(x).$$
On conclut à l'aide de la question 5 de l'exercice 2.
*[Extracteur : justifications]* La continuité de $\theta\mapsto\phi_\theta(x)$ vaut en fait **pour tout $x$** : $\Sigma\mapsto\Sigma^{-1}$ et $\Sigma\mapsto\det\Sigma>0$ sont continues sur $M_d^+$, $\pi\mapsto\ln\frac{\pi}{1-\pi}$ continue sur $]0,1[$. Avec Q5 (consistance de $\hat\theta_n$) et le **théorème de continuité** (Poly ch.6, Th. 1.1), puis la continuité de $\mathrm{sigm}$, on obtient l'hypothèse de l'Exo 2 Q5 (= hypothèse (iii) de la Prop. 1.5 du poly) avec $\tilde\eta_n=\eta_{\hat\theta_n}$, $\eta=\eta_\theta$, $\mathbb{Q}=\mathbb{Q}_\theta$. Comme $R(\tilde g_n)-R(g_\theta^\star)\ge0$ (règle bayésienne), la valeur absolue de l'énoncé est sans effet. Le modèle étant **bien spécifié** (les données sont tirées sous $\mathbb{Q}_\theta$), la Prop. 1.5 s'applique.

**Q7.** Dans le cas du modèle plus simple, seule l'estimation de la matrice de covariance est changée (voir l'expression de $\ell_n$ ci-dessus dans le cas où $\Sigma_{-1}=\Sigma_1=\Sigma$). On obtient
$$\boxed{\hat\Sigma_n:=\frac1n\sum_{k=1}^n\Big(\mathbb{1}_{\{Y_k=-1\}}(X_k-\hat\mu_{-1,n})(X_k-\hat\mu_{-1,n})^T+\mathbb{1}_{\{Y_k=1\}}(X_k-\hat\mu_{1,n})(X_k-\hat\mu_{1,n})^T\Big)}$$
*(le corrigé écrit $\mathbb{1}_{\{Y_k=0\}}$)* ; et on établit par la loi faible des grands nombres que
$$\hat\Sigma_n\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\Sigma.$$
On conclut comme à la question précédente.
*[Extracteur]* $\hat\Sigma_n=\frac{N_{-1}}n\hat\Sigma_{-1,n}+\frac{N_1}n\hat\Sigma_{1,n}\to\pi_{-1}\Sigma+\pi_1\Sigma=\Sigma$ (**covariance intra-classe « poolée »**, moyenne pondérée des covariances de classe) ; $\hat\pi$, $\hat\mu_{\pm1}$ inchangés ; règle plug-in $\tilde g_n(x)=2\,\mathbb{1}_{\{w_{\hat\theta_n}^Tx+A_{\hat\theta_n}\ge0\}}-1$ (frontière linéaire).

**Q8.** Dans un problème à plus de deux classes étiquetées par la variable $Y$, on obtient de la même façon en écrivant la vraisemblance des observations (on traite ici le cas d'une matrice de covariance commune)
$$\begin{aligned}\hat\pi_{j,n}&:=\frac{\sum_{i=1}^n\mathbb{1}_{\{Y_i=j\}}}{n},&&(2)\\\hat\mu_{j,n}&:=\frac{\sum_{i=1}^nX_i\mathbb{1}_{\{Y_i=j\}}}{\sum_{i=1}^n\mathbb{1}_{\{Y_i=j\}}},&&(3)\\\hat\Sigma_n&:=\frac1n\sum_{i=1}^n(X_i-\hat\mu_{Y_i,n})(X_i-\hat\mu_{Y_i,n})^T.&&(4)\end{aligned}$$
*[Extracteur, non rédigé dans le corrigé]* La règle bayésienne 0–1 à $K$ classes prédit la classe de plus grande probabilité a posteriori, i.e. $\arg\max_j\pi_jq_j(x)$ (généralisation de l'éq. (9) du poly) ; avec covariance commune, cela revient à $\arg\max_j\big(\mu_j^T\Sigma^{-1}x-\frac12\mu_j^T\Sigma^{-1}\mu_j+\ln\pi_j\big)$ (fonctions affines de $x$ : frontières par morceaux d'hyperplans), et l'on substitue les estimateurs (2)–(4).

*[Commentaire du corrigé, en bleu] — Commentaire des graphes* (Corrigé p. 14–15, à propos de sa Figure 2) : les données sont simulées comme un mélange de gaussiennes.
- Dans le premier graphe, on a $\Sigma=\mathrm{I}$, donc la frontière de classification est la droite orthogonale au segment $[\hat\mu_{-1,n};\hat\mu_{1,n}]$. On a utilisé un graphe orthonormé pour mettre en avant ce point.
- Les $\star$ et les ellipsoïdes correspondent aux estimations des moyennes et des covariances par la méthode du maximum de vraisemblance.
- LDA et QDA ne sont pas équivalents dans le cas où la matrice de covariance (ayant servi à produire les données) est la même, car la matrice de covariance estimée est bien sûr différente (l'approche LDA en cherche une commune aux deux classes ; l'approche QDA en cherche une propre à chaque classe).
- Dans les cas où la matrice de covariance (ayant servi à produire les données) est différente, QDA se comporte *a priori* mieux puisqu'on utilise une règle de décision qui exploite une estimation de matrice de covariance spécifique pour chaque classe.
- Selon que $\hat\Sigma_1^{-1}-\hat\Sigma_{-1}^{-1}$ est définie positive (ou négative) ou non, la forme de la frontière de décision n'est pas la même : c'est une **ellipse** si les deux valeurs propres de $\hat\Sigma_1^{-1}-\hat\Sigma_{-1}^{-1}$ sont de même signe (5ème ligne sur la Figure) et c'est une **paire d'hyperboles** sinon. En particulier, sur l'exemple de la 4ème ligne, on a le cas où $\Sigma_1\simeq\begin{pmatrix}1&0\\0&\varepsilon\end{pmatrix}$ et $\Sigma_{-1}\simeq\begin{pmatrix}\varepsilon&0\\0&1\end{pmatrix}$. On peut discriminer deux gaussiennes de même moyenne mais dispersées dans deux directions quasi-orthogonales.
- Ligne 3-5, LDA, on remarque que l'estimation de la variance de la classe noire/bleue est mauvaise !

Légende de la Figure 2 du corrigé (p. 16) : « Exercice 6 *(lire : 3)*. Classifieurs LDA et QDA and différents cas de figure. Colonne de gauche : LDA, colonne de droite : QDA. La ligne blanche correspond à la ligne de séparation. Les moyennes de chaque classe sont représentées par les $\star$. Les points d'une classe qui sont mal classifiés sont représentés par des $\times$. Deux premières lignes : même matrice de covariance, deux dernières lignes, matrice de covariance différentes. » *(La figure a en réalité 5 lignes ; la 4ᵉ ligne montre deux nuages de même centre, en croix ; QDA y donne une frontière en paire d'hyperboles — [Extracteur].)*

**Méthodes mobilisées :**
- **formule de Bayes** / Prop. 1.4 ($\eta=\frac{\pi_1q_1}{\pi_1q_1+\pi_{-1}q_{-1}}$), **densité du vecteur gaussien** ;
- développement de formes quadratiques, **passage au logarithme**, logit / sigmoïde ;
- géométrie : hyperplan de vecteur normal $w_\theta$ (LDA), quadrique (QDA), signature via les valeurs propres de $\Sigma_1^{-1}-\Sigma_{-1}^{-1}$ ;
- **écriture de la log-vraisemblance d'un modèle génératif** avec $\frac{Y+1}2$, $\frac{1-Y}2$ comme indicatrices ; i.i.d. ⇒ somme ;
- **calcul d'EMV par annulation du gradient** (score) + comportement aux bords + concavité ;
- **maximisation en deux temps (profil)** : moyennes puis covariances ;
- **EMV d'une famille exponentielle = estimateur des moments** de la statistique $xx^T$ (renvoi PC2) ;
- **calcul différentiel matriciel** : $d(\Sigma^{-1})=-\Sigma^{-1}H\Sigma^{-1}$, $d\log\det\Sigma=\mathrm{Tr}(\Sigma^{-1}H)$, **astuce de la trace** ;
- **consistance par LGN + théorème de continuité / Slutsky** (quotients, produits) ;
- **règle par substitution (plug-in)**, Méthode 1.1 ; **Prop. 1.5** via Exo 2 Q5 ;
- extension multi-classe (estimateurs (2)–(4)).

**Pièges relevés / remarques du corrigé :**
- $\eta_\theta(x)\ge1/2\iff\phi_\theta(x)\ge0$ (sigmoïde croissante, $\mathrm{sigm}(0)=1/2$) : la règle ne dépend que du **signe** de $\phi_\theta$.
- Ne pas oublier le terme $\frac12\ln(\det\Sigma_{-1}/\det\Sigma_1)$ et le terme $\ln(\pi_1/\pi_{-1})$ dans $\phi_\theta$ ; en LDA le premier disparaît mais pas le second : le milieu $\frac{\mu_1+\mu_{-1}}2$ n'est sur la frontière **que si les classes sont équilibrées**.
- $w_\theta=\Sigma^{-1}(\mu_1-\mu_{-1})$ n'est colinéaire à $\mu_1-\mu_{-1}$ que si $\Sigma\propto\mathrm{I}$.
- LDA et QDA ne coïncident pas même si les vraies covariances sont égales (estimations différentes).
- Les EMV des covariances sont **non corrigées** ($1/N_i$, $1/n$) ; en LDA, $\hat\Sigma_n$ est la **covariance intra-classe poolée** (centrée sur la moyenne de **sa** classe $\hat\mu_{Y_i,n}$), pas la covariance empirique de tous les $X_i$.
- La garantie (Q6) repose sur la **bonne spécification** : si les vraies covariances diffèrent, LDA estime un modèle faux et l'excès de risque ne tend pas vers 0 (cf. Poly ch.8, Prop. 1.5, avertissement 1 ; « estimation de la variance mauvaise », lignes 3–5).
- Coquilles : $\ln(\pi/2)$, labels « 0 », $\hat S_n$ et signes de la Solution 2, $\hat\mu\hat\mu^T$ au numérateur, Figure 2 légendée « Exercice 6 ».

**Résultats numériques :**
- Classes équilibrées ($\pi_1=\pi_{-1}=1/2$) et $\Sigma=\mathrm{I}$ : $w=\mu_1-\mu_{-1}$, frontière = **médiatrice** du segment $[\mu_{-1},\mu_1]$.
- *[Extracteur, exemple de contrôle]* $d=1$, $\Sigma=\sigma^2$ : $\phi_\theta(x)=\frac{\mu_1-\mu_{-1}}{\sigma^2}\big(x-\frac{\mu_1+\mu_{-1}}2\big)+\ln\frac{\pi_1}{\pi_{-1}}$ (Poly ch.8, Ex. 1.6). Ex. : $\mu_{-1}=0$, $\mu_1=2$, $\sigma=1$, $\pi_1=1/2$ ⇒ seuil $x=1$ ; avec $\pi_1=0.8$, seuil $x=1-\frac{\ln4}2\approx0.307$.
- Figure : $\Sigma_1\simeq\mathrm{diag}(1,\varepsilon)$, $\Sigma_{-1}\simeq\mathrm{diag}(\varepsilon,1)$ ⇒ $\Sigma_1^{-1}-\Sigma_{-1}^{-1}\simeq\mathrm{diag}(1-1/\varepsilon,\ 1/\varepsilon-1)$, valeurs propres de signes opposés ⇒ hyperboles.

---

### Exercice 4 — Espérance conditionnelle : couples de même loi, symétrie, sommes i.i.d. (difficulté non indiquée)

**Énoncé complet** (Énoncé p. 3 et 5)

Soient $(X,Y)$ et $(X',Y')$ deux couples de variables aléatoires définies sur $(\Omega,\mathcal{F},\mathbb{P})$ et de même loi. On suppose que $\mathbb{E}[|X|]<\infty$.

1. Soit $f$ une fonction mesurable telle que $\mathbb{E}\left[X\,\middle|\,Y\right]=f(Y)$ $\mathbb{P}$-p.s. Montrer que $\mathbb{E}\left[X'\,\middle|\,Y'\right]=f(Y')$ $\mathbb{P}$-p.s. En déduire que $\mathbb{E}[X\mid Y]$ et $\mathbb{E}[X'\mid Y']$ ont même loi.
2. Supposons que la loi de la variable $X$ soit symétrique. Déterminer $\mathbb{E}\left[X\,\middle|\,|X|\right]$.
3. Soient $(X_1,\dots,X_n)$ des variables aléatoires réelles i.i.d. intégrables. Déterminer $\mathbb{E}\left[X_i\,\middle|\,X_1+\cdots+X_n\right]$.

**Corrigé complet** (Corrigé p. 17)

**Q1.** La variable aléatoire $\mathbb{E}[X\mid Y]$ est $\sigma(Y)$-mesurable donc il existe une fonction mesurable $\psi$ telle que $\mathbb{E}[X\mid Y]=\psi(Y)$ (**lemme de Doob**, Poly ch.8, Outils, Prop. 2.1 ; $\psi$ joue le rôle du $f$ de l'énoncé). De plus, pour toute fonction continue bornée $f$, on a (par égalité en loi de $Y$ et $Y'$),
$$\mathbb{E}\big[f(\mathbb{E}[X\mid Y])\big]=\mathbb{E}[f(\psi(Y))]=\mathbb{E}\big[f(\psi(Y'))\big].$$
Pour conclure il faut montrer l'égalité en loi entre $\psi(Y')$ et $\mathbb{E}[X'\mid Y']$.
Pour toute fonction $\sigma(Y)$-mesurable et bornée $\phi$ *(lire : $\phi$ mesurable bornée, de sorte que $\phi(Y)$ est $\sigma(Y)$-mesurable bornée — [Extracteur])*, la caractérisation de l'espérance conditionnelle (Poly ch.8, Outils, Th.-déf. 2.1) implique
$$\mathbb{E}[X\phi(Y)]=\mathbb{E}\big[\mathbb{E}[X\mid Y]\phi(Y)\big]=\mathbb{E}[\psi(Y)\phi(Y)].$$
Enfin par égalité en loi de $(X,Y)$ et $(X',Y')$, on a $\mathbb{E}[X\phi(Y)]=\mathbb{E}[X'\phi(Y')]$ et d'autre part $\mathbb{E}[\psi(Y)\phi(Y)]=\mathbb{E}[\psi(Y')\phi(Y')]$ *(espérances d'une même fonction mesurable, intégrable, du couple — [Extracteur])*.
En conclusion, pour toute fonction $\sigma(Y)$-mesurable et bornée $\phi$, on a
$$\mathbb{E}\big[X'\phi(Y')\big]=\mathbb{E}\big[\psi(Y')\phi(Y')\big].$$
Par caractérisation de l'espérance conditionnelle on a donc $\mathbb{E}[X'\mid Y']=\psi(Y')$, $\mathbb{P}$-p.s.
*[Extracteur]* Il faut aussi que $\psi(Y')$ soit $\sigma(Y')$-mesurable (fonction de $Y'$) et intégrable (même loi que $\psi(Y)=\mathbb{E}[X\mid Y]\in L^1$) ; et toute variable $\sigma(Y')$-mesurable bornée est de la forme $\phi(Y')$ (Doob). Dès lors $\mathbb{E}[X\mid Y]=\psi(Y)$ et $\mathbb{E}[X'\mid Y']=\psi(Y')$ ont même loi, puisque $Y$ et $Y'$ ont même loi (calcul avec $f$ continue bornée ci-dessus).

**Q2.** Comme $X$ est symétrique, $X$ et $-X$ ont même loi. Donc $(X,|X|)$ et $(-X,|-X|)=(-X,|X|)$ ont même loi ; en effet, on utilise la fonction $f:t\mapsto(t,|t|)$ qui est continue (**loi image** par une fonction mesurable). Donc $\mathbb{E}\left[X\,\middle|\,|X|\right]=\mathbb{E}\left[-X\,\middle|\,|X|\right]$ par la question 1 (même fonction $\psi$ de $|X|$). D'un autre côté, $\mathbb{E}\left[X\,\middle|\,|X|\right]+\mathbb{E}\left[-X\,\middle|\,|X|\right]=\mathbb{E}\left[0\,\middle|\,|X|\right]=0$ (**linéarité**). On en déduit que
$$\boxed{\mathbb{E}\left[X\,\middle|\,|X|\right]=0.}$$

**Q3.** Les couples $(X_i,X_1+\cdots+X_n)$ sont de même loi pour $i\in\{1,\dots,n\}$. En effet, en notant $\mathrm{d}\nu$ la loi de $X_i$, nous avons pour toute fonction mesurable bornée $h$ (**indépendance** : loi jointe $=\nu^{\otimes n}$)
$$\mathbb{E}[h(X_i,X_1+\cdots+X_n)]=\int h(x_i,x_1+\cdots+x_n)\,\mathrm{d}\nu(x_1)\cdots\mathrm{d}\nu(x_n)$$
en faisant le changement de variable $y_1=x_i$ puis $y_2=x_1$, $y_3=x_2$, $\dots$, $y_i=x_{i-1}$, $y_{i+1}=x_{i+1}$, $\dots$, $y_n=x_n$ (permutation des coordonnées, qui laisse $\nu^{\otimes n}$ invariante — **Fubini** — [Extracteur]), on obtient pour tout $i$
$$\mathbb{E}[h(X_i,X_1+\cdots+X_n)]=\int h(y_1,y_1+y_2+\cdots+y_n)\,\mathrm{d}\nu(y_1)\cdots\mathrm{d}\nu(y_n)$$
*(le corrigé écrit la somme « $y_2+\cdots+y_{i-1}+y_1+y_{i+1}+\cdots+y_n$ », coquille : il s'agit de la somme de tous les $y_j$)*. Le terme de droite est indépendant de $i$, ce qui donne le résultat.
Par suite (Q1 appliquée aux couples $(X_i,S_n)$ et $(X_1,S_n)$, avec $S_n:=X_1+\cdots+X_n$ — [Extracteur]), nous avons d'une part
$$\sum_{i=1}^n\mathbb{E}\left[X_i\,\middle|\,X_1+\cdots+X_n\right]=n\,\mathbb{E}\left[X_1\,\middle|\,X_1+\cdots+X_n\right]$$
et d'autre part (**linéarité** puis $\mathbb{E}[\phi(V)\mid V]=\phi(V)$, Poly ch.8, Outils, Prop. 2.4 (iv)–(v))
$$\sum_{i=1}^n\mathbb{E}\left[X_i\,\middle|\,X_1+\cdots+X_n\right]=\mathbb{E}\left[X_1+\cdots+X_n\,\middle|\,X_1+\cdots+X_n\right]=X_1+\cdots+X_n.$$
Ainsi, pour tout $i\in\{1,\dots,n\}$,
$$\boxed{\mathbb{E}\left[X_i\,\middle|\,X_1+\cdots+X_n\right]=\frac{X_1+\cdots+X_n}n.}$$

**Méthodes mobilisées :**
- **lemme de Doob** (Prop. 2.1) : $\mathbb{E}[X\mid Y]=\psi(Y)$ ;
- **caractérisation de l'espérance conditionnelle** par $\mathbb{E}[X\phi(Y)]=\mathbb{E}[\psi(Y)\phi(Y)]$ pour toute $\phi$ bornée (Th.-déf. 2.1) et **unicité** ;
- **transfert de l'égalité en loi** (même fonction intégrée contre la même loi) ;
- **argument de symétrie** (loi image par $t\mapsto(t,|t|)$) ;
- **échangeabilité** / invariance par permutation de la loi produit (changement de variables, Fubini) ;
- **linéarité** et « fonction de la variable conditionnante » (Prop. 2.4).

**Pièges relevés / remarques du corrigé :**
- Q1 : l'égalité en loi de $Y$ et $Y'$ **seule** ne suffit pas ; il faut celle des **couples** pour transférer $\mathbb{E}[X\phi(Y)]=\mathbb{E}[X'\phi(Y')]$.
- Q2 : $\mathbb{E}[X\mid|X|]=0$ n'implique pas que $X$ et $|X|$ soient indépendants ; l'hypothèse $\mathbb{E}|X|<\infty$ est nécessaire pour définir l'espérance conditionnelle *[Extracteur]*.
- Q3 : l'argument n'utilise **pas** de calcul de densité, seulement l'échangeabilité ; le résultat vaut pour toute loi intégrable. Les propriétés de la Prop. 2.4 sont énoncées dans le poly pour des v.a. de carré intégrable ; elles restent vraies dans $L^1$ (Th.-déf. 2.1) *[Extracteur]*.
- Le corrigé utilise la lettre $f$ à la fois (énoncé) pour la fonction de Doob et (corrigé) pour une fonction test continue bornée ; il note $\psi$ la fonction de Doob.

**Résultats numériques :** *[Extracteur]* $n=3$, $(X_1,X_2,X_3)$ observée avec $X_1+X_2+X_3=6$ ⇒ $\mathbb{E}[X_2\mid S_3]=2$ sur cet événement.

---

### Exercice 5 — Modèle jouet : lois conditionnelles uniformes en dimension 1 (difficulté non indiquée)

**Énoncé complet** (Énoncé p. 5)

Considérons le problème de la classification binaire pour la perte 0/1. On se place dans le cas $d=1$, et suppose que $\mathbb{P}(Y=-1)=\mathbb{P}(Y=1)=1/2$ et que
$$\mathbb{P}(X\le x\mid Y=-1)=\begin{cases}0&\text{si }x\le0\\x/2&\text{si }0<x\le2\\1&\text{si }x>2\end{cases}$$
et
$$\mathbb{P}(X\le x\mid Y=1)=\begin{cases}0&\text{si }x\le1\\(x-1)/3&\text{si }1<x\le4\\1&\text{si }x>4\end{cases}.$$

1. Déterminer la distribution marginale des attributs.
2. Calculer la fonction de régression $\eta$.
3. Utiliser les informations ci-dessus pour calculer le risque du classifieur bayésien.
4. Quel est l'excès de risque de la règle de classification $g(x)=2\,\mathbb{1}_{\{x\ge1\}}-1$ ?

*(Autrement dit : $X\mid Y=-1\sim\mathcal{U}([0,2])$ et $X\mid Y=1\sim\mathcal{U}([1,4])$ — [Extracteur].)*

**Corrigé complet** (Corrigé p. 18–20)

**Q1.** La loi de $X$ est celle d'un **mélange** d'une loi uniforme sur $[0;2]$ et d'une loi uniforme sur $[1;4]$. En effet, on écrit pour $x\in\mathbb{R}$ (**formule des probabilités totales**)
$$\begin{aligned}\mathbb{P}(X\le x)&=\mathbb{P}(X\le x,Y=1)+\mathbb{P}(X\le x,Y=-1)\\&=\mathbb{P}(X\le x\mid Y=1)\mathbb{P}(Y=1)+\mathbb{P}(X\le x\mid Y=-1)\mathbb{P}(Y=-1)\\&=\frac12\mathbb{P}(X\le x\mid Y=-1)+\frac12\mathbb{P}(X\le x\mid Y=1).\end{aligned}$$
On obtient donc
$$\boxed{\mathbb{P}(X\le x)=\begin{cases}0&\text{si }x\le0\\\dfrac x4&\text{si }0<x\le1\\\dfrac5{12}x-\dfrac16&\text{si }1<x\le2\\\dfrac x6+\dfrac26&\text{si }2<x\le4\\1&\text{si }x>4\end{cases}}$$
La densité de $X$ par rapport à la mesure de Lebesgue $\lambda_{\mathrm{Leb}}$ est $p_X(x)=\dfrac{p_{-1}(x)+p_1(x)}2$, avec $p_{-1}(x):=\frac12\mathbb{1}_{\{0\le x\le2\}}$ et $p_1(x):=\frac13\mathbb{1}_{\{1\le x\le4\}}$ (Poly ch.8, Prop. 1.2 : mélange de poids $\frac12,\frac12$).
*Figure 3 du corrigé* (« Densité de $X$ ») : fonction en escalier valant $0.25$ sur $[0,1]$, $\approx0.417$ sur $[1,2]$, $\approx0.167$ sur $[2,4]$.
*[Extracteur : détail]* sur $]1,2]$ : $\frac12\cdot\frac x2+\frac12\cdot\frac{x-1}3=\frac x4+\frac{x-1}6=\frac5{12}x-\frac16$ ; sur $]2,4]$ : $\frac12+\frac{x-1}6=\frac{x+2}6$. Densité : $p_X=\frac14$ sur $]0,1[$, $\frac14+\frac16=\frac5{12}$ sur $]1,2[$, $\frac16$ sur $]2,4[$.

**Q2.** On vient de montrer que $\mathbb{P}(X\in[0,4])=1$. La fonction $\eta$ est donc définie sur $[0,4]$ uniquement.
La densité de $X$ par rapport à la mesure de Lebesgue $\lambda_{\mathrm{Leb}}(\mathrm{d}x)=\mathrm{d}x$ est $p_X(x)$. Celle de $Y$ par rapport à la mesure du comptage $c(\mathrm{d}x)=\delta_{\{-1\}}(\mathrm{d}x)+\delta_{\{1\}}(\mathrm{d}x)$ *(le corrigé écrit $\delta_{\{0\}}$)* est une Bernoulli de paramètre $1/2$. On rappelle que la densité jointe de $(X,Y)$ par rapport à la mesure produit $\lambda_{\mathrm{Leb}}\otimes c$ est donnée par (Poly ch.8, éq. (8))
$$p_{Y,X}(y,x)=\frac12p_1(x)\mathbb{1}_{\{1\}}(y)+\frac12p_{-1}(x)\mathbb{1}_{\{-1\}}(y)$$
*(le corrigé écrit $p_0(x)\mathbb{1}_{\{0\}}(y)$)*. Dans ce cas, la fonction de régression *via* la **formule de Bayes** est donnée par (Poly ch.8, Prop. 1.3–1.4) :
$$\eta(x)=\mathbb{P}(Y=1\mid X=x)=\frac{p_{Y,X}(1,x)}{p_X(x)}=\frac{\frac12p_1(x)}{\frac12p_1(x)+\frac12p_{-1}(x)}=\frac{p_1(x)}{p_{-1}(x)+p_1(x)}.$$
$p_1$ est non nulle sur $[1,4]$ et $p_{-1}$ est non nulle sur $[0,2]$. Par suite, $p_{-1}+p_1$ est non nulle sur $[0,4]$. Il vient que $p_1/(p_{-1}+p_1)$ est définie sur $[0,4]$ et est non nulle sur $[1,4]$. On a
$$\forall x\in[0,1]\qquad\eta(x)=0.$$
Si $1<x\le2$, on a $p_{-1}(x)=\frac12$ tandis que $p_1(x)=1/3$. Ainsi :
$$\forall x\in\,]1,2]\qquad\eta(x)=\frac{\frac13}{\frac12+\frac13}=\frac25.$$
Enfin, si $2<x\le4$, on a $p_1(x)=\frac13$ tandis que $p_{-1}(x)=0$. Par conséquent :
$$\forall x\in\,]2,4]\qquad\eta(x)=1.$$
*(Le corrigé écrit « $\forall x\in[0,1]$ » pour les trois cas : coquille.)* En résumé, pour $x\in[0,4]$, la fonction de régression est donc donnée par
$$\boxed{\eta(x)=\begin{cases}0&\text{si }0\le x\le1\\2/5&\text{si }1<x\le2\\1&\text{si }2<x\le4\end{cases}.}$$
*[Extracteur]* En $x=1$, $p_1(1)=\frac13\neq0$ avec les conventions d'intervalles fermés du corrigé, donc la formule donnerait $\eta(1)=2/5$ ; c'est sans importance ($\{X=1\}$ est de probabilité nulle : $\eta$ n'est définie qu'à un ensemble négligeable près).

**Q3.** Le classifieur Bayésien est défini par
$$g^\star(x)=2\,\mathbb{1}_{\{\eta(x)\ge1/2\}}-1.$$
En utilisant la question précédente, on obtient :
$$\boxed{g^\star(x)=2\,\mathbb{1}_{\{2<x\le4\}}-1.}$$
On peut alors calculer le risque associé à ce classifieur (optimal) :
$$\begin{aligned}R(g^\star)&=\mathbb{P}(Y\neq g^\star(X))\\&=\mathbb{P}(Y=1,g^\star(X)=-1)+\mathbb{P}(Y=-1,g^\star(X)=1)\\&=\mathbb{P}(Y=1,X<2)+\mathbb{P}(Y=-1,X>2)\\&=\mathbb{P}(Y=1)\,\mathbb{P}(X<2\mid Y=1)+\mathbb{P}(Y=-1)\,\mathbb{P}(X>2\mid Y=-1)\\&=\frac12\times\frac13+0\\&=\frac16,\end{aligned}$$
où on a utilisé la formule de Bayes pour la quatrième égalité *(il s'agit plutôt de la définition de la probabilité conditionnelle / formule des probabilités composées — [Extracteur])*.
*[Extracteur : vérification par l'éq. (5) du poly]* $R^\star=\mathbb{E}[\min(\eta(X),1-\eta(X))]=\frac25\,\mathbb{P}(1<X\le2)=\frac25\cdot\frac5{12}=\frac16$ ; ou $R^\star=\frac12-\frac12\mathbb{E}|2\eta(X)-1|=\frac12-\frac12\big(\frac14+\frac15\cdot\frac5{12}+\frac13\big)=\frac12-\frac13=\frac16$.

**Q4.** On considère la règle de classification $g(x)=2\,\mathbb{1}_{\{x\ge1\}}-1$. On rappelle la formule du cours pour l'excès de risque (Poly ch.8, Th. 1.2, éq. (4) et (7))
$$R(g)-R(g^\star)=\mathbb{E}\big[|2\eta(X)-1|\,\mathbb{1}_{\{g^\star(X)\neq g(X)\}}\big]=\mathbb{E}\big[(2\eta(X)-1)\big(\mathbb{1}_{\{g^\star(X)=1\}}-\mathbb{1}_{\{g(X)=1\}}\big)\big].$$
On a donc
$$\begin{aligned}R(g)-R(g^\star)&=\mathbb{E}\big[(2\eta(X)-1)\big(\mathbb{1}_{\{X>2\}}-\mathbb{1}_{\{X\ge1\}}\big)\big]\\&=\mathbb{E}\big[(1-2\eta(X))\,\mathbb{1}_{\{1\le X\le2\}}\big]\\&=\mathbb{E}\Big[\frac15\mathbb{1}_{\{1\le X\le2\}}\Big]=\frac{\mathbb{P}(1\le X\le2)}5\\&=\frac15\big(\mathbb{P}(X\le2)-\mathbb{P}(X<1)\big)\\&=\frac1{12},\end{aligned}$$
où la dernière égalité est déduite de la question 1 ($\mathbb{P}(X\le2)=\frac23$, $\mathbb{P}(X<1)=\frac14$, différence $\frac5{12}$ — [Extracteur]).
*[Extracteur]* Sur $]1,2]$, $1-2\eta=1-\frac45=\frac15$ ; le point $X=1$ est négligeable. Vérification directe : $R(g)=\mathbb{P}(Y=1,X<1)+\mathbb{P}(Y=-1,X\ge1)=0+\frac12\cdot\frac12=\frac14=\frac16+\frac1{12}$.

**Méthodes mobilisées :**
- **formule des probabilités totales** ⇒ loi marginale = **mélange** (Prop. 1.2) ; dérivation de la f.d.r. pour obtenir la densité ;
- densités par rapport à $\mathrm{Leb}\otimes\mathrm{c}$ (Outils §2.7, éq. (8)) ;
- **formule de Bayes** pour $\eta$ (Prop. 1.3–1.4) ;
- classifieur bayésien par seuillage de $\eta$ à $1/2$ (Th. 1.2) ;
- calcul de $R(g^\star)$ par **décomposition des erreurs** ; contrôle par **éq. (5)** ;
- **formule d'excès de risque** (4)/(7).

**Pièges relevés / remarques du corrigé :**
- $\eta=2/5<1/2$ sur la zone de recouvrement $]1,2]$ : bien que les deux classes soient équiprobables, la classe $-1$ y a la plus grande **densité** ($\frac12>\frac13$) ; le seuil de $g^\star$ est donc en $x=2$, **pas** au milieu du recouvrement.
- $\eta$ n'est définie que sur le support $[0,4]$ (et à un négligeable près).
- L'excès de risque ne se paie que sur $\{g\neq g^\star\}=[1,2]$, avec le poids $|2\eta-1|=\frac15$ (petit car $\eta$ proche de $1/2$).
- Coquilles : $\delta_{\{0\}}$, $p_0$, « $\forall x\in[0,1]$ » répété.

**Résultats numériques :**
| Quantité | Valeur |
|---|---|
| $\mathbb{P}(X\le1)$, $\mathbb{P}(X\le2)$ | $\frac14$, $\frac23$ |
| $\mathbb{P}(X\in[0,1])$, $\mathbb{P}(X\in\,]1,2])$, $\mathbb{P}(X\in\,]2,4])$ | $\frac14$, $\frac5{12}$, $\frac13$ |
| $p_X$ sur $]0,1[$, $]1,2[$, $]2,4[$ | $\frac14=0.25$, $\frac5{12}\approx0.417$, $\frac16\approx0.167$ |
| $\eta$ sur $[0,1]$, $]1,2]$, $]2,4]$ | $0$, $\frac25$, $1$ |
| $g^\star$ | $1$ ssi $x\in\,]2,4]$ |
| $R(g^\star)$ | $\frac16\approx0.167$ |
| $R(g)-R(g^\star)$ pour $g=2\mathbb{1}_{\{x\ge1\}}-1$ | $\frac1{12}\approx0.083$ |
| $R(g)$ *[Extracteur]* | $\frac14$ |

---

### Exercice 6 — Règles à seuil en dimension 1 : risque minimal dans une classe $\mathcal{C}$ (difficulté non indiquée)

**Énoncé complet** (Énoncé p. 5)

On suppose que les attributs sont à valeur réelle ($d=1$) et on considère la classe $\mathcal{C}$ de règles de classification données par : pour $x'\in\mathbb{R}$ et $y'\in\{-1,1\}$,
$$g_{(x',y')}(x):=\begin{cases}y'&\text{si }x\le x'\\-y'&\text{autrement}\end{cases}.$$
On note $p:=\mathbb{P}(Y=1)$ la probabilité de la classe 1 et $F_i(x)$ la fonction de répartition des attributs conditionnellement à leur appartenance à la classe $i$ ; $i\in\{-1,1\}$.

1. Montrer que le minimum du risque $R$ dans la classe $\mathcal{C}$ est donné par :
$$R=\inf_{x'}\big(pF_1(x')+(1-p)(1-F_0(x'))\big)\ \wedge\ \inf_{x'}\big(p(1-F_1(x'))+(1-p)F_0(x')\big).$$
2. Montrer que $R\le\min(p,(1-p))$. En déduire que $R\le1/2$.
3. On définit $R^\star$ comme étant le risque du classifieur Bayésien. Montrer que $R=1/2$ si et seulement si $R^\star=1/2$.
4. Montrer que
$$R=\frac12-\frac12\sup_x\big|1-2\big(p(1-F_1(x))+(1-p)F_0(x)\big)\big|.$$

*(Dans tout l'exercice, $F_0$ désigne $F_{-1}$ — reliquat des labels $\{0,1\}$.)*

**Corrigé complet** (Corrigé p. 21–22)

**Q1.** Soient $(x',y')\in\mathbb{R}\times\{-1,1\}$. Par la **formule des probabilités totales** et comme $\mathbb{1}_{\{y'=-1\}}+\mathbb{1}_{\{y'=1\}}=1$, on a
$$\begin{aligned}R(g_{(x',y')})&=\mathbb{P}\big(Y\neq g_{(x',y')}(X)\big)\\&=\mathbb{P}(Y=-1)\,\mathbb{P}\big(g_{(x',y')}(X)=1\mid Y=-1\big)+\mathbb{P}(Y=1)\,\mathbb{P}\big(g_{(x',y')}(X)=-1\mid Y=1\big)\\&=(1-p)\big(\mathbb{1}_{\{y'=-1\}}\mathbb{P}(X>x'\mid Y=-1)+\mathbb{1}_{\{y'=1\}}\mathbb{P}(X\le x'\mid Y=-1)\big)\\&\quad+p\big(\mathbb{1}_{\{y'=-1\}}\mathbb{P}(X\le x'\mid Y=1)+\mathbb{1}_{\{y'=1\}}\mathbb{P}(X>x'\mid Y=1)\big).\end{aligned}$$
*(Le corrigé écrit « $g_{(x',y')}(X)=0$ » pour $-1$.)* En distinguant selon les deux valeurs possibles de $y'$, nous obtenons
$$R(g_{(x',-1)})=(1-p)(1-F_0(x'))+pF_1(x'),\qquad R(g_{(x',1)})=(1-p)F_0(x')+p(1-F_1(x')).$$
*(Le corrigé note $g_{(x',0)}$ la règle avec $y'=-1$.)* On obtient bien l'expression demandée *(en prenant l'infimum sur $(x',y')\in\mathbb{R}\times\{-1,1\}$ : $\inf_{(x',y')}=\inf_{x'}R(g_{(x',-1)})\wedge\inf_{x'}R(g_{(x',1)})$ ; il s'agit d'un infimum, pas nécessairement atteint — [Extracteur])*.

**Q2.** On a en particulier (car $R\le R(g_{(x',y')})$ pour tout $(x',y')$, et $F_i(x')\to0$ quand $x'\to-\infty$ — [Extracteur])
$$R\le\lim_{x'\to-\infty}\big(R(g_{(x',-1)})\wedge R(g_{(x',1)})\big)=(1-p)\wedge p.$$
On a bien $R\le1/2$ en notant que
$$(1-p)\wedge p=1-p\iff p\ge1/2\iff1-p\le1/2,\qquad(1-p)\wedge p=p\iff p\le1/2.$$
*[Extracteur]* Interprétation : quand $x'\to-\infty$, $g_{(x',y')}$ prédit constamment $-y'$ ; les règles constantes sont dans l'adhérence de $\mathcal{C}$, et la meilleure règle constante (prédire la classe majoritaire) a pour risque $\min(p,1-p)$.

**Q3.** Par définition du risque bayésien, on a toujours $R^\star\le R(g_{(x',y')})$ pour tout $x',y'$ ; et donc $R^\star\le R$. Puisque $R\le1/2$, il vient que si $R^\star=1/2$ alors $R=1/2$.
Réciproquement, supposons que $R=1/2$. Alors $1/2\le p\wedge(1-p)\le1/2$ d'après la question 2 ; ce qui entraine $p=1-p=1/2$. On en déduit, en utilisant la question 1 que pour tout $x'\in\mathbb{R}$ (puisque $R(g_{(x',\pm1)})\ge R=\frac12$ et $p=\frac12$ — [Extracteur]),
$$F_1(x')+(1-F_0(x'))\ge1\qquad\text{et}\qquad(1-F_1(x'))+F_0(x')\ge1.$$
En particulier $F_1(x')-F_0(x')\ge0$ d'après la première inégalité et $F_1(x')-F_0(x')\le0$ d'après la seconde, donc $F_1=F_0$ et donc $X$ et $Y$ sont indépendants *(même loi conditionnelle de $X$ dans chaque classe — [Extracteur])*. La règle optimale (classifieur Bayésien) $g^\star$ est telle que $R(g^\star)=1/2$ ssi $\eta(X)=1/2$ $\mathbb{P}$-p.s. (voir Exercice 2, question 1). Ici $\eta(X)=\mathbb{P}(Y=1\mid X)=\mathbb{P}(Y=1)=p=1/2$ *(le corrigé écrit « $\eta(X):=\mathbb{E}[Y\mid X]$ » et « $\mathbb{E}[Y\mid X]=\mathbb{E}Y=p$ », coquille pour $Y\in\{-1,1\}$)* donc $R^\star=1/2$.

**Q4.** Notons $A_x:=(1-p)(1-F_0(x))+pF_1(x)$ et $B_x:=p(1-F_1(x))+(1-p)F_0(x)$. Alors $R=\min_x(A_x\wedge B_x)$ *(lire $\inf_x$)*. Par ailleurs, observons que (car $\frac12(1-2B_x)=pF_1(x)-(1-p)F_0(x)-p+\frac12$ — [Extracteur])
$$\frac12-\sup_x\big|pF_1(x)-(1-p)F_0(x)-p+1/2\big|=\inf_x\Big(\frac12-\frac12|1-2B_x|\Big)\ ;$$
Il suffit donc de montrer que
$$\frac12-\frac12|1-2B_x|=A_x\wedge B_x$$
en exploitant le fait que $A_x+B_x=1$. Par un calcul analogue à la fin de la correction de la question 1 exercice 2, nous avons (avec $1-2B_x=A_x-B_x$)
$$\begin{aligned}\frac12-\frac12|1-2B_x|&=\frac12-\frac12|A_x-B_x|\\&=\frac12-\frac12(A_x-B_x)\mathbb{1}_{\{A_x>B_x\}}+\frac12(A_x-B_x)\mathbb{1}_{\{A_x\le B_x\}}\\&=\frac12-\frac12(A_x-B_x)+(A_x-B_x)\mathbb{1}_{\{A_x\le B_x\}}\\&=B_x+(A_x-B_x)\mathbb{1}_{\{A_x\le B_x\}}=A_x\mathbb{1}_{\{A_x\le B_x\}}+B_x\mathbb{1}_{\{A_x>B_x\}}=A_x\wedge B_x.\end{aligned}$$
*[Extracteur]* (3ᵉ ligne : $\mathbb{1}_{\{A>B\}}=1-\mathbb{1}_{\{A\le B\}}$ ; 4ᵉ : $\frac12-\frac12(A-B)=B$ car $A+B=1$.) C'est l'identité $a\wedge b=\frac{a+b}2-\frac{|a-b|}2$ de l'Exo 2. Puis $R=\inf_x(A_x\wedge B_x)=\inf_x\big(\frac12-\frac12|1-2B_x|\big)=\frac12-\frac12\sup_x|1-2B_x|$.

**Méthodes mobilisées :**
- calcul du risque 0–1 d'une règle explicite par **probabilités totales** et **f.d.r. conditionnelles** ;
- infimum sur une classe paramétrée = min des infima sur chaque valeur du paramètre discret ;
- **passage à la limite** $x'\to-\infty$ (règles constantes) ;
- comparaison $R^\star\le R$ (définition du risque bayésien, Déf. 1.4) ;
- caractérisation $R^\star=\frac12\iff\eta=\frac12$ p.s. (**Exo 2 Q1**) ; égalité des f.d.r. ⇒ indépendance ;
- identité $a\wedge b=\frac{a+b}2-\frac{|a-b|}2$ avec $A_x+B_x=1$.

**Pièges relevés / remarques du corrigé :**
- $R$ est le minimum du risque **dans la classe $\mathcal{C}$**, pas le risque bayésien : $R-R^\star\ge0$ est le **risque d'approximation** de $\mathcal{C}$ (Poly ch.8, Compléments §4.6, hors programme — [Extracteur]).
- $R\le\frac12$ vient des règles « constantes » (limites $x'\to\pm\infty$), pas d'un seuil particulier.
- Q3 : l'équivalence dit que les règles à seuil ne font **pas mieux que le hasard** exactement quand **aucune** règle ne fait mieux ; mais en général $R>R^\star$ (ex. Exo 5 : avec deux zones $-1$/$1$ un seul seuil suffit ; avec des zones alternées non).
- Coquilles : $F_0$, $g_{(x',0)}$, « $=0$ », $\eta=\mathbb{E}[Y\mid X]$, « $\min_x$ ».

**Résultats numériques :** *[Extracteur, application à l'Exo 5]* $p=\frac12$, $F_{-1}=F_0$ uniforme sur $[0,2]$, $F_1$ uniforme sur $[1,4]$ : $B_x=\frac12(1-F_1(x))+\frac12F_0(x)$ ; en $x=2$ : $B_2=\frac12\cdot\frac23+\frac12=\frac56$, $A_2=\frac16$ ⇒ $R=\frac16=R^\star$ (la règle bayésienne de l'Exo 5 est une règle à seuil, $g_{(2,-1)}$). Si $p=0.3$ : $R\le0.3$.

---

### Exercice 7 — Excès de risque d'une règle construite sur une fonction $\eta$ approchée (difficulté non indiquée)

**Énoncé complet** (Énoncé p. 6)

On considère un problème de classification binaire. On note $\eta(X)$ la fonction de régression *(lire : $\eta^\star(X)$)* et $g^*(X):=2\,\mathbb{1}_{\{\eta^*(X)\ge1/2\}}-1$ le classifieur bayésien pour la perte 0/1. Soit $\eta:\mathbb{R}^d\to[0,1]$ une fonction et $g(x):=2\,\mathbb{1}_{\{\eta(x)\ge1/2\}}-1$ la règle de décision associée.

1. Montrer que
$$R(g)-R(g^\star)=\mathbb{P}(g(X)\neq Y)-\mathbb{P}(g^*(X)\neq Y)=2\,\mathbb{E}\big[\mathbb{1}_{\{g(X)\neq g^*(X)\}}|\eta^*(X)-1/2|\big].$$
2. En déduire que
$$R(g)-R(g^\star)=\mathbb{P}(g(X)\neq Y)-\mathbb{P}(g^*(X)\neq Y)\le2\,\mathbb{E}[|\eta^*(X)-\eta(X)|].$$

**Corrigé complet** (Corrigé p. 23)

**Q1.** Écrivons (partition selon $\{Y=g^*(X)\}$ ; puis, la classification étant **binaire**, si $g(X)\neq Y$ et $Y\neq g^*(X)$ alors $g(X)=g^*(X)$ — [Extracteur])
$$\begin{aligned}\mathbb{P}(g(X)\neq Y)&=\mathbb{P}(g(X)\neq Y,Y=g^*(X))+\mathbb{P}(g(X)\neq Y,Y\neq g^*(X))\\&=\mathbb{P}(g(X)\neq g^*(X),Y=g^*(X))+\mathbb{P}(g(X)=g^*(X),Y\neq g^*(X)).\end{aligned}$$
On en déduit (en écrivant de même $\mathbb{P}(g^*(X)\neq Y)=\mathbb{P}(g(X)=g^*(X),Y\neq g^*(X))+\mathbb{P}(g(X)\neq g^*(X),Y\neq g^*(X))$ — [Extracteur])
$$\mathbb{P}(g(X)\neq Y)-\mathbb{P}(g^*(X)\neq Y)=\mathbb{P}(g(X)\neq g^*(X),Y=g^*(X))-\mathbb{P}(g(X)\neq g^*(X),Y\neq g^*(X)).$$
En conditionnant par rapport à $X$ (tour + produit, $\mathbb{1}_{\{g(X)\neq g^*(X)\}}$ étant $\sigma(X)$-mesurable), il vient
$$\begin{aligned}\mathbb{P}(g(X)\neq Y)-\mathbb{P}(g^*(X)\neq Y)&=\mathbb{E}\big[\mathbb{1}_{\{g(X)\neq g^*(X)\}}\mathbb{P}(Y=g^*(X)\mid X)\big]-\mathbb{E}\big[\mathbb{1}_{\{g(X)\neq g^*(X)\}}\mathbb{P}(Y\neq g^*(X)\mid X)\big]\\&=\mathbb{E}\big[\mathbb{1}_{\{g(X)\neq g^*(X)\}}\{\mathbb{1}_{\{g^\star(X)=1\}}\eta^\star(X)+\mathbb{1}_{\{g^\star(X)=-1\}}(1-\eta^\star(X))\}\big]\\&\quad-\mathbb{E}\big[\mathbb{1}_{\{g(X)\neq g^*(X)\}}\{\mathbb{1}_{\{g^\star(X)=1\}}(1-\eta^\star(X))+\mathbb{1}_{\{g^\star(X)=-1\}}\eta^\star(X)\}\big]\\&=\mathbb{E}\big[\mathbb{1}_{\{g(X)\neq g^*(X)\}}\mathbb{1}_{\{g^\star(X)=1\}}(2\eta^\star(X)-1)\big]\\&\quad+\mathbb{E}\big[\mathbb{1}_{\{g(X)\neq g^*(X)\}}\mathbb{1}_{\{g^\star(X)=-1\}}(1-2\eta^\star(X))\big].\end{aligned}$$
Ce qui conclut la preuve.
*[Extracteur : dernière étape laissée implicite]* Sur $\{g^\star(X)=1\}=\{\eta^\star(X)\ge1/2\}$, $2\eta^\star(X)-1=2|\eta^\star(X)-1/2|$ ; sur $\{g^\star(X)=-1\}=\{\eta^\star(X)<1/2\}$, $1-2\eta^\star(X)=2|\eta^\star(X)-1/2|$. En sommant ($\mathbb{1}_{\{g^\star=1\}}+\mathbb{1}_{\{g^\star=-1\}}=1$), on obtient $2\,\mathbb{E}[\mathbb{1}_{\{g(X)\neq g^*(X)\}}|\eta^*(X)-1/2|]$. C'est l'éq. (4) du poly ($|2\eta^\star-1|=2|\eta^\star-1/2|$).

**Q2.** On a
$$\mathbb{1}_{\{g(X)\neq g^*(X)\}}=\mathbb{1}_{\{\eta(X)<1/2\le\eta^*(X)\}}+\mathbb{1}_{\{\eta(X)\ge1/2>\eta^*(X)\}}\le\mathbb{1}_{\{|\eta^*(X)-1/2|\le|\eta^*(X)-\eta(X)|\}}.$$
Ce qui donne le résultat en utilisant la question précédente.
*[Extracteur : détail]* Sur $\{\eta<1/2\le\eta^\star\}$ : $|\eta^\star-1/2|=\eta^\star-1/2\le\eta^\star-\eta$ ; sur $\{\eta\ge1/2>\eta^\star\}$ : $|\eta^\star-1/2|=1/2-\eta^\star\le\eta-\eta^\star$. Donc $\mathbb{1}_{\{g\neq g^*\}}|\eta^\star-1/2|\le\mathbb{1}_{\{g\neq g^*\}}|\eta^\star-\eta|\le|\eta^\star-\eta|$ ; on prend l'espérance (croissance) et on multiplie par 2 (Q1). C'est la majoration **(13)** du poly et la **Prop. 4.2** des Compléments (même preuve), ainsi qu'une version plus faible de l'Exo 2 Q4.

**Méthodes mobilisées :**
- **décomposition d'événements** selon $\{Y=g^*(X)\}$ et argument « binaire » ;
- **conditionnement par $X$** ($\mathbb{P}(Y=g^*(X)\mid X)=\mathbb{1}_{\{g^\star=1\}}\eta^\star+\mathbb{1}_{\{g^\star=-1\}}(1-\eta^\star)$) ;
- signe de $2\eta^\star-1$ sur $\{g^\star=\pm1\}$ ⇒ valeur absolue ;
- **inclusion d'événements** / majoration d'indicatrices ; **disjonction de cas** ;
- croissance de l'espérance, indicatrice $\le1$.

**Pièges relevés / remarques du corrigé :**
- Dans cet exercice, **$\eta$ n'est pas la fonction de régression** mais une approximation quelconque ; la vraie est $\eta^\star$ (l'énoncé est ambigu).
- La majoration (Q2) n'utilise que le fait que $g$ et $g^\star$ **seuillent au même niveau $1/2$** ; elle est fausse pour un seuillage différent.
- On perd de l'information en majorant $\mathbb{1}_{\{g\neq g^*\}}$ par 1 : la borne de l'Exo 2 Q4 (avec l'indicatrice) est plus fine.
- Graphies mélangées $g^*$/$g^\star$, $\eta^*$/$\eta^\star$.

**Résultats numériques :** *[Extracteur, application à l'Exo 5]* avec $\eta^\star$ de l'Exo 5 et $\eta\equiv\eta^\star$ sauf $\eta=0.6$ sur $]1,2]$ : $g=1$ sur $]1,4]$, excès de risque $=2\cdot\frac1{10}\cdot\frac5{12}=\frac1{12}$, borne $2\,\mathbb{E}|\eta^\star-\eta|=2\cdot0.2\cdot\frac5{12}=\frac16$.

---

## 2. Synthèse des méthodes de la PC

| Méthode | Exercices où elle apparaît | Résultat du poly utilisé |
|---|---|---|
| **Calcul d'un risque par conditionnement par $X$** (tour + « sortir ce qui est connu ») | 1 Q1, 2 Q1–Q2, 7 Q1 | Poly ch.8, Outils, Prop. 2.2, Prop. 2.3, **Lemme 2.2** ; Prop. 1.1 |
| Réécriture $\mathbb{1}_{g=1}=1-\mathbb{1}_{g=-1}$ ; risque en fonction de $\{g(X)=-1\}$ | 1 Q1, 2 Q2 | Poly ch.8, Th. 1.2, éq. (6) |
| **Excès de risque = espérance d'une quantité $\ge0$** (différence d'indicatrices × écart au seuil) | 1 Q2–Q3, 2 Q3–Q4, 5 Q4, 7 Q1 | Poly ch.8, Th. 1.2, éq. (4), (7) |
| **Minimisation point par point** du risque conditionnel | 1 Q2 (Sol. 2) | Poly ch.8, Prop. 1.1 |
| Unicité à un négligeable près (v.a. $\ge0$ d'espérance nulle) | 1 Q3, 2 Q1 | Poly ch.8, Remarque p. 16 (non-unicité) |
| Identité $a\wedge b=\frac{a+b}2-\frac{\lvert a-b\rvert}2$ | 2 Q1, 6 Q4 | Poly ch.8, Th. 1.2, éq. (5) |
| **Disjonction de cas** sur $\{g\neq g^\star\}$, $\lvert\eta-1/2\rvert\le\lvert\eta-\tilde\eta\rvert$ | 2 Q4, 7 Q2 | Poly ch.8, éq. (13), **Compléments Prop. 4.2** |
| **Fubini(-Tonelli)** + indépendance test / apprentissage | 2 Q5 | Poly ch.8, Prop. 1.5 (étape 3), Outils Prop. 2.5, Compléments §4.4 |
| **Convergence dominée** (proba ⇒ $L^1$ pour v.a. bornées ; intégration en $x$) | 2 Q5, 3 Q6 | Poly ch.8, **Prop. 1.5** (étapes 4–5) |
| **Formule de Bayes** / loi marginale = mélange | 3 Q1, 5 Q1–Q2 | Poly ch.8, Prop. 1.2, 1.3, 1.4, éq. (8)–(9) |
| Log-rapport $\phi_\theta$, sigmoïde, frontière $\{\phi_\theta=0\}$ (LDA hyperplan / QDA quadrique) | 3 Q1–Q2 | Poly ch.8, éq. (10)–(11), Cadre 1.2, Remarque §2.9 |
| **Log-vraisemblance d'un modèle génératif** (indicatrices $\frac{1\pm Y}2$) | 3 Q3 | Poly ch.2, Déf. 1.4 ; Poly ch.8, Cadre 1.2, §2.7–2.8 |
| **EMV par annulation du gradient / score** + bords + concavité | 3 Q4 | Poly ch.2, Déf. 1.6, Méthode 1.2, Ex. 1.10 |
| **Maximisation en deux temps (profil)** | 3 Q4 (Sol. 1–2) | Poly ch.2, Ex. 1.10 |
| EMV = estimateur des moments en famille exponentielle (statistique $xx^T$) | 3 Q4 (Sol. 1) | PC2, Exo 3 |
| **Calcul différentiel matriciel** ($d\Sigma^{-1}$, $d\log\det$, astuce de la trace) | 3 Q4 (Sol. 2) | — (hors poly) |
| **Consistance par LGN + continuité (« Slutsky »)** | 3 Q5, Q7 | Poly ch.2, Outils Th. 2.1 ; Poly ch.6, Th. 1.1, Outils Th. 2.1, Prop. 2.1, Lemme 1.1 |
| **Règle par substitution (plug-in)** et sa consistance | 2 Q5, 3 Q6–Q8 | Poly ch.8, **Méthode 1.1**, **Prop. 1.5** |
| **Lemme de Doob** + caractérisation de l'espérance conditionnelle | 4 Q1–Q3 | Poly ch.8, Outils, Prop. 2.1, Th.-déf. 2.1, Déf. 2.4 |
| **Égalité en loi / symétrie / échangeabilité** | 4 Q1–Q3 | loi image ; invariance de $\nu^{\otimes n}$ par permutation (Fubini) |
| Linéarité, $\mathbb{E}[\phi(V)\mid V]=\phi(V)$ | 4 Q2–Q3 | Poly ch.8, Outils, Prop. 2.4 |
| **Probabilités totales** ; f.d.r. conditionnelles | 5 Q1, Q3 ; 6 Q1 | Poly ch.8, Prop. 1.2 |
| Calcul explicite de $R(g^\star)$ et d'un excès de risque | 5 Q3–Q4 | Poly ch.8, Th. 1.2, éq. (4)–(5) |
| Risque minimal dans une classe $\mathcal{C}$, passage à la limite $x'\to-\infty$ | 6 Q1–Q4 | Poly ch.8, Déf. 1.4 ; Compléments §4.6 (risque d'approximation) |
| $R^\star=\frac12\iff\eta=\frac12$ p.s. | 2 Q1, 6 Q3 | Poly ch.8, éq. (5) |

---

## 3. Idées de reformulation en exercices interactifs (sans saisie de formule)

### Exercice 1 — Perte asymétrique
1. **QCM (Q2)** : « Pour la perte qui coûte $c$ quand on prédit $-1$ alors que $Y=1$, et $1$ dans le cas inverse, la règle bayésienne prédit $1$ ssi : (a) $\eta(X)\ge\frac12$ ; (b) $\eta(X)\ge\frac1{c+1}$ ✔ ; (c) $\eta(X)\ge\frac c{c+1}$ ; (d) $\eta(X)\ge c$. » **Application numérique** : « $c=4$, $\eta(x)=0.3$ : quelle prédiction ? » ($1$ ✔, car $0.3\ge0.2$). Variante : « $c=\frac12$, $\eta(x)=0.6$ » ($-1$ ✔, seuil $\frac23$).
2. **Preuve à ordonner (Q1)** : « $R(g)=\mathbb{E}[\mathbb{1}_{g=1,Y=-1}+c\,\mathbb{1}_{g=-1,Y=1}]$ » → « linéarité » → « conditionner par $X$ : $\mathbb{E}[\mathbb{1}_{Y=1}\mid X]=\eta(X)$ » → « $\mathbb{1}_{g=1}=1-\mathbb{1}_{g=-1}$ » → « $R(g)=1-\mathbb{E}[\eta]+\mathbb{E}[((1+c)\eta-1)\mathbb{1}_{g=-1}]$ ». Distracteur : « $\mathbb{E}[\mathbb{1}_{Y=1}\mid X]=\mathbb{P}(Y=1)$ ».
3. **Vrai/faux (Q3)** : « La règle bayésienne est toujours unique » (F) ; « Deux règles bayésiennes ne diffèrent que sur $\{\eta(X)=\frac1{c+1}\}$ à un négligeable près » (V) ; « Si $X$ a une densité et $\eta$ est strictement monotone continue, la règle bayésienne est unique p.s. » (V) ; « Augmenter $c$ fait prédire $1$ plus souvent » (V).

### Exercice 2 — Risque bayésien et plug-in
1. **Associer** chaque expression à son nom : $\mathbb{E}[\min(\eta,1-\eta)]$ ↔ risque bayésien ; $\mathbb{E}[|2\eta-1|\mathbb{1}_{g\neq g^\star}]$ ↔ excès de risque de $g$ ; $\mathbb{P}(g_1(X)\neq g_2(X))$ ↔ majorant de $|R(g_1)-R(g_2)|$ ; $2\mathbb{E}[|\eta-\tilde\eta|]$ ↔ majorant de l'excès de risque du plug-in.
2. **Trouver l'erreur (Q4)** : « Pour tout $x$, $|\eta(x)-\frac12|\le|\eta(x)-\tilde\eta(x)|$, donc $R(\tilde g)-R(g^\star)\le2\mathbb{E}|\eta-\tilde\eta|$. » Erreur : l'inégalité n'est vraie que **sur $\{\tilde g\neq g^\star\}$** (ex. $\eta(x)=0.9$, $\tilde\eta(x)=0.8$ : $0.4>0.1$) ; ailleurs l'indicatrice est nulle.
3. **Étape suivante à choisir (Q5)** : « On a $\mathbb{E}_n[R(\tilde g_n)-R(g^\star)]\le2\mathbb{E}[\phi_n(X)]$ avec $\phi_n(x)=\mathbb{E}_n|\tilde\eta_n(x)-\eta(x)|\le1$. Pour conclure : » (a) loi des grands nombres ; (b) convergence dominée après avoir montré $\phi_n(x)\to0$ pour p.t. $x$ ✔ ; (c) TCL ; (d) inégalité de Jensen. **Vrai/faux** : « $R(g^\star)\le\frac12$ toujours » (V) ; « $R(g^\star)=0$ ssi $\eta\in\{0,1\}$ p.s. » (V).

### Exercice 3 — LDA / QDA
1. **QCM (Q1–Q2)** : « En LDA, le vecteur normal à la frontière est : (a) $\mu_1-\mu_{-1}$ ; (b) $\Sigma^{-1}(\mu_1-\mu_{-1})$ ✔ ; (c) $\Sigma(\mu_1-\mu_{-1})$ ; (d) $\mu_1+\mu_{-1}$. » « Le milieu $\frac{\mu_1+\mu_{-1}}2$ est sur la frontière ssi : $\Sigma=\mathrm{I}$ / $\pi_1=\pi_{-1}$ ✔ / toujours. » « En QDA en dimension 2 avec $\Sigma_1^{-1}-\Sigma_{-1}^{-1}$ de valeurs propres de signes opposés, la frontière est : une droite / une ellipse / une paire d'hyperboles ✔. »
2. **Associer (Q4, Q7, Q8)** chaque paramètre à son EMV : $\pi_{-1}$ ↔ $\frac1n\sum\mathbb{1}_{Y_k=-1}$ ; $\mu_1$ ↔ moyenne des $X_k$ de la classe 1 ; $\Sigma_1$ (QDA) ↔ covariance empirique **non corrigée** de la classe 1 ; $\Sigma$ (LDA) ↔ $\frac1n\sum(X_i-\hat\mu_{Y_i,n})(X_i-\hat\mu_{Y_i,n})^T$. Distracteurs : covariance empirique de **tous** les $X_i$ autour de leur moyenne globale ; facteur $\frac1{N_1-1}$.
3. **Preuve à ordonner (Q5–Q6)** : « LGN : $\frac1n\sum\mathbb{1}_{Y_k=-1}\to\pi_{-1}$ et $\frac1n\sum\mathbb{1}_{Y_k=-1}X_k\to\pi_{-1}\mu_{-1}$ » → « quotient (continuité) : $\hat\mu_{-1,n}\to\mu_{-1}$ » → « idem pour $\hat\Sigma$ » → « $\theta\mapsto\phi_\theta(x)$ continue ⇒ $\eta_{\hat\theta_n}(x)\to\eta_\theta(x)$ en proba » → « Exo 2 Q5 ⇒ excès de risque moyen $\to0$ ». **Vrai/faux** : « Si les vraies covariances diffèrent, l'excès de risque de la LDA tend vers 0 » (F, modèle mal spécifié) ; « LDA et QDA donnent la même règle si les vraies covariances sont égales » (F, estimations différentes). **Lecture de figure** : « Sur quelle ligne de la Figure 1 la LDA fait-elle beaucoup d'erreurs ? » (ligne 4 ✔).

### Exercice 4 — Espérance conditionnelle
1. **QCM (Q2)** : « Si $X$ est symétrique intégrable, $\mathbb{E}[X\mid|X|]=$ : $|X|$ / $0$ ✔ / $\mathbb{E}[X]^2$ / $X$. » **(Q3)** : « $X_1,\dots,X_n$ i.i.d. intégrables : $\mathbb{E}[X_1\mid X_1+\dots+X_n]=$ : $X_1$ / $\mathbb{E}[X_1]$ / $\bar X_n$ ✔ / $nX_1$. »
2. **Preuve à ordonner (Q3)** : « $(X_i,S_n)$ ont même loi pour tout $i$ (échangeabilité) » → « par Q1, $\mathbb{E}[X_i\mid S_n]=\psi(S_n)$ avec le même $\psi$ » → « somme : $n\psi(S_n)=\mathbb{E}[S_n\mid S_n]=S_n$ » → « $\psi(S_n)=S_n/n$ ». Distracteur : « par indépendance, $\mathbb{E}[X_i\mid S_n]=\mathbb{E}[X_i]$ ».
3. **Trouver l'erreur (Q1)** : « $Y$ et $Y'$ ont même loi, donc $\mathbb{E}[X\mid Y]$ et $\mathbb{E}[X'\mid Y']$ ont même loi. » Erreur : il faut l'égalité en loi des **couples** $(X,Y)$ et $(X',Y')$ (contre-exemple : $X\sim\mathcal{E}(1)$, $Y=Y'=X$, $X'=-X$ : $\mathbb{E}[X\mid Y]=X\ge0$ mais $\mathbb{E}[X'\mid Y']=-X\le0$).

### Exercice 5 — Lois conditionnelles uniformes
1. **Application numérique (QCM)** : « $R(g^\star)=$ : $\frac1{12}$ / $\frac16$ ✔ / $\frac14$ / $\frac13$ » ; « Excès de risque de $g=2\mathbb{1}_{x\ge1}-1$ : $\frac1{12}$ ✔ / $\frac16$ / $\frac15$ / $\frac5{12}$ » ; « $\mathbb{P}(1<X\le2)=$ $\frac5{12}$ ✔ ».
2. **Associer** chaque intervalle à la valeur de $\eta$ : $[0,1]$ ↔ $0$ ; $]1,2]$ ↔ $\frac25$ ✔ (distracteur $\frac12$, $\frac35$) ; $]2,4]$ ↔ $1$ ; et à la densité $p_X$ : $\frac14$, $\frac5{12}$, $\frac16$.
3. **Vrai/faux / piège** : « Les classes étant équiprobables, $g^\star$ coupe au milieu de la zone de recouvrement, en $x=1.5$ » (F : $g^\star$ prédit $-1$ sur tout $]1,2]$ car $\frac12>\frac13$) ; « $g^\star(x)=1$ ssi $x>2$ (sur le support) » (V) ; « $R(g)=\frac14$ » (V).

### Exercice 6 — Règles à seuil
1. **QCM (Q1)** : « Le risque de $g_{(x',-1)}$ (prédit $-1$ à gauche de $x'$) vaut : (a) $pF_1(x')+(1-p)(1-F_{-1}(x'))$ ✔ ; (b) $p(1-F_1(x'))+(1-p)F_{-1}(x')$ ; (c) $pF_{-1}(x')+(1-p)F_1(x')$. »
2. **Étape suivante à choisir (Q2)** : « Pour montrer $R\le\min(p,1-p)$ : » (a) faire $x'\to-\infty$ ✔ ; (b) prendre $x'=0$ ; (c) utiliser le TCL ; (d) utiliser $R\ge R^\star$.
3. **Vrai/faux (Q3–Q4)** : « $R=\frac12\iff R^\star=\frac12$ » (V) ; « $R=R^\star$ toujours » (F) ; « $R=\frac12$ implique $F_1=F_{-1}$ et $p=\frac12$ » (V) ; « $A_x+B_x=1$ » (V). **Application numérique** : données de l'Exo 5 ⇒ $R=\frac16$ (atteint en $x'=2$, $y'=-1$).

### Exercice 7 — Excès de risque d'un plug-in
1. **Preuve à ordonner (Q1)** : « décomposer $\{g\neq Y\}$ selon $\{Y=g^*\}$ » → « binaire : $g\neq Y\neq g^*$ ⇒ $g=g^*$ » → « différence = $\mathbb{P}(g\neq g^*,Y=g^*)-\mathbb{P}(g\neq g^*,Y\neq g^*)$ » → « conditionner par $X$ » → « signe de $2\eta^\star-1$ sur $\{g^\star=\pm1\}$ » → « $2\mathbb{E}[\mathbb{1}_{g\neq g^*}|\eta^\star-\frac12|]$ ».
2. **Vrai/faux (Q2)** : « Sur $\{g\neq g^\star\}$, $|\eta^\star-\frac12|\le|\eta^\star-\eta|$ » (V) ; « La borne reste vraie si $g$ seuille $\eta$ à $0.4$ » (F) ; « Dans cet exercice $\eta$ est la fonction de régression » (F).
3. **Application numérique** : $\eta^\star(x)=0.55$, $\eta(x)=0.45$ en un point : « contribution ponctuelle à l'excès de risque » ($2\times0.05=0.1$ ✔) ; « contribution au majorant » ($2\times0.10=0.2$ ✔).
