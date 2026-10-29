# Chapitre 8 — Introduction à l'apprentissage statistique

> **Sources extraites :** `S8_APM41033-Week8-Cours` (poly p. 7–24 : introduction p. 7–8, §1 « Les fondamentaux » p. 9–24), `S8_APM41033-Week8-Maths` (§2 « Les outils mathématiques », p. 25–32), `S8_APM41033-Week8-Compléments` (§4 « Les compléments », p. 34–41, **hors programme d'examen** : « Les contenus de cette partie ne sont pas exigibles »).
> **Pas de fichier « Exercices » pour ce chapitre** dans les sources assignées : la §1.4 du poly (p. 23–24) décrit seulement « le programme des exercices » (7 exercices de la feuille de la semaine 8). Les énoncés/corrigés existent sous la forme `S8_APM-41033-EP-PC8-enonce` / `S8_APM-41033-EP-PC8-corrige` mais **n'ont pas été extraits ici** (hors du périmètre de cette tâche) ; voir §4. Aucun énoncé ni corrigé n'est inventé.
> **Numérotation du poly :** les encadrés sont numérotés « N.M » avec N = section du chapitre : §1 « Les fondamentaux » (**Cadres 1.1–1.4**, Définitions 1.1–1.5, Exemples 1.1–1.6, Propositions 1.1–1.5, Théorèmes 1.1–1.2, **Méthode 1.1**), §2 « Les outils mathématiques » (Définitions 2.1–2.4, Théorèmes 2.1–2.2, **Théorème et définition 2.1**, Lemmes 2.1–2.2, Propositions 2.1–2.6), §4 « Les compléments » (Exemples 4.1–4.3, Propositions 4.1–4.2, Définitions 4.1–4.2). Il n'y a **pas de §3** dans les fichiers fournis (la §3 serait la feuille d'exercices ; la page 33 est absente). Équations numérotées (1)–(13) dans le Cours, (14) dans les Outils, (15)–(16) dans les Compléments. Les encadrés « Cadre » et « Méthode » sont des types propres au poly, conservés tels quels. Les **remarques ne sont pas numérotées** : on les repère par leur section et leur page, p. ex. « Remarque (§1.2, p. 16) ».
> **Pages :** pagination du poly complet (en-têtes de page). PDF Cours : page PDF $k$ = page poly $k+6$ (p. 7–24) ; PDF Maths : page PDF $k$ = page poly $k+24$ (p. 25–32) ; PDF Compléments : page PDF $k$ = page poly $k+33$ (p. 34–41).
> **ATTENTION — collisions de numérotation et renvois externes.**
> - Dans le Cours, « proposition 2.1 » (lemme de Doob), « proposition 2.2 », « 2.4 », « 2.6 », « lemme 2.2 », « Section 2.5 », « Section 2.9 » renvoient aux **Outils du ch.8** (§2 ci-dessous).
> - « Section 4.4 », « Section 4.7 » renvoient aux **Compléments du ch.8** (hors programme).
> - « exemple 1.15 » (moindres carrés) = **ch.2** ; « définition 1 » (modèle dominé), « définition 6 » ($n$-échantillon), « définition 10 » et « proposition 2.7 » (vecteur gaussien et sa densité), « théorème 2.1 » (Radon-Nikodym) = **ch.1** ; « définition 1.4, méthode 1.2, définition 1.8 » (vraisemblance, EMV, M-estimateurs) = **ch.2** ; « définition 2.1 » (convergence en probabilité), « définition 1.2 » (consistance) = **ch.6** (liste du poly §2.10, p. 32).
> - **Collision interne aux Outils** : le « Théorème 2.1 » du ch.8 est « L'espace $\mathrm{L}^2$ est hilbertien », mais la démonstration de la Prop. 2.3 invoque « l'unicité de l'espérance conditionnelle (théorème 2.1) », qui désigne en réalité le **« Théorème et définition 2.1 »** (espérance conditionnelle dans $L^1$). De même, en §2.10, « théorème 2.1 » = Radon-Nikodym **du ch.1**.
> - « exercice 1 » … « exercice 7 » = exercices de la feuille de la semaine 8 (PC8).

---

## 0. Résumé en 10 lignes (ce qu'il faut retenir pour l'examen)

1. **Changement d'objectif** : en statistique on infère $\theta$ ; en apprentissage supervisé on veut une **règle** $g:\mathsf{X}\to\mathsf{Y}$ prédisant $Y$ à partir de $\mathbf{X}$, évaluée par son **risque** $R(g)=\mathbb{E}[\ell(Y,g(\mathbf{X}))]=\int\ell(y,g(\mathbf{x}))\,\mathrm{d}\mathbb{P}(\mathbf{x},y)$, $\mathbb{P}$ **inconnue** ; données $\mathcal{D}_n=\{(\mathbf{X}_1,Y_1),\dots,(\mathbf{X}_n,Y_n)\}$ i.i.d. de loi $\mathbb{P}$ (Cadre 1.1, Déf. 1.1–1.3). Le risque ne tend pas vers 0 mais au mieux vers le **risque de Bayes** (erreur irréductible).
2. **Pertes** : 0–1 $\ell_{01}(y,g(\mathbf{x}))=\mathbb{1}_{\{y\neq g(\mathbf{x})\}}$ (risque $R_{01}(g)=\mathbb{P}(Y\ne g(\mathbf{X}))$) ; quadratique $\ell_2=(y-g(\mathbf{x}))^2$ (risque $R_2(g)=\mathbb{E}[(Y-g(\mathbf{X}))^2]$).
3. **Risque et règle bayésiens** (Déf. 1.4) : $R^\star_{\ell,\mathbb{P}}=\inf_g R_{\ell,\mathbb{P}}(g)$ ; une règle qui l'atteint est **bayésienne**. **Outil** : le **risque conditionnel** (Prop. 1.1, par Fubini-Tonelli) $R_{\ell,\mathbb{P}}(g)=\int_{\mathsf{X}}R_{\ell,\mathbb{P}}(g,\mathbf{x})\,p_{\mathbf{X}}(\mathbf{x})\,\mu(\mathrm{d}\mathbf{x})$ : minimiser **point par point** en $\mathbf{x}$ donne une règle bayésienne.
4. **Régression, perte quadratique** (Th. 1.1) : $g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})=\mathbb{E}[Y\mid\mathbf{X}]$ et **Pythagore** : $\mathbb{E}[(Y-g(\mathbf{X}))^2]=\mathbb{E}[(Y-g^\star(\mathbf{X}))^2]+\mathbb{E}[(g^\star(\mathbf{X})-g(\mathbf{X}))^2]$ (terme croisé nul par **orthogonalité de la projection**) ; unique p.s.
5. **Classification binaire, perte 0–1** (Déf. 1.5, Th. 1.2) : $\eta(\mathbf{X})=\mathbb{P}(Y=1\mid\mathbf{X})$, $g^\star(\mathbf{x})=2\,\mathbb{1}_{\{\eta(\mathbf{x})\ge1/2\}}-1$ (label le plus probable) ; **excès de risque** $R_{01}(g)-R_{01}(g^\star)=\mathbb{E}\big[|2\eta(\mathbf{X})-1|\,\mathbb{1}_{\{g^\star(\mathbf{X})\neq g(\mathbf{X})\}}\big]$ (4) ; **risque bayésien** $R^\star_{01}=\mathbb{E}[\min(\eta(\mathbf{X}),1-\eta(\mathbf{X}))]$ (5). Preuve : **lemme 2.2** de décomposition ⇒ $R_{01}(g)=\mathbb{E}[\mathbb{1}_{\{g(\mathbf{X})=-1\}}(2\eta(\mathbf{X})-1)]+\mathbb{E}[1-\eta(\mathbf{X})]$ (6). $g^\star$ non unique (convention sur $\{\eta=1/2\}$).
6. **Explicitation** (Prop. 1.2–1.4, éq. (9)) : avec $p=\mathbb{P}(Y=1)$ et densités de classe $q_1,q_{-1}$ : $p_{\mathbf{X}}=p\,q_1+(1-p)\,q_{-1}$ (mélange), $\eta=\dfrac{p\,q_1}{p\,q_1+(1-p)\,q_{-1}}$, et $g^\star(\mathbf{x})=1\iff p\,q_1(\mathbf{x})\ge(1-p)\,q_{-1}(\mathbf{x})$. Gaussiennes 1D de même variance, $p=1/2$ : seuil au **milieu** $(\mu_1+\mu_{-1})/2$ (Ex. 1.6).
7. **Règle par substitution / plug-in** (Méthode 1.1) : modéliser $\{\mathbb{P}_\theta\}$ → calculer $g^\star_\theta$ → estimer $\hat\theta_n$ (EMV) → $\widehat g_n:=g^\star_{\hat\theta_n}$. Deux voies via la factorisation (2) : **générative** ($\mathbf{X}\mid Y$ et $Y$ : LDA/QDA, Bayes naïf) ; **$Y\mid\mathbf{X}$ et $\mathbf{X}$** (logistique, linéaire gaussien, $k$-PPV), la loi de $\mathbf{X}$ restant **quelconque**.
8. **Analyse discriminante** (Cadre 1.2) : $\mathcal{L}(\mathbf{X}\mid Y=i)=\mathcal{N}(\mu_i,\Sigma_i)$, $\Sigma_i$ **inversibles** ; $\eta_\theta=\mathrm{sigm}(\phi_\theta)$ avec $\phi_\theta$ = log-rapport (11), polynôme de degré $\le2$. $\Sigma_1=\Sigma_{-1}=\Sigma$ ⇒ $\phi_\theta(\mathbf{x})=\mathbf{w}_\theta^\top\mathbf{x}+A_\theta$, $\mathbf{w}_\theta=\Sigma^{-1}(\mu_1-\mu_{-1})$ : frontière **hyperplan** (LDA) ; sinon **quadrique** (QDA).
9. **Logistique** (Cadre 1.3) : $\mathcal{L}(Y\mid\mathbf{X})=\widetilde{\mathcal{B}\mathrm{er}}(\mathrm{sigm}(\theta^\top\mathbf{X}))$, $g^\star_\theta(\mathbf{X})=1\iff\theta^\top\mathbf{X}\ge0$ ; EMV $\widehat\theta_{\mathrm{MLE},n}=\arg\min_\theta\frac1n\sum\log(1+\exp(-Y_i\theta^\top\mathbf{X}_i))$ (12) = **perte logistique** sur les fonctions linéaires. **Linéaire gaussien** (Cadre 1.4) : $g^\star_\theta(\mathbf{X})=\theta^\top\mathbf{X}$, EMV = **moindres carrés**.
10. **Garantie** (Prop. 1.5) : si le modèle est **bien spécifié** et $\eta_{\hat\theta_n}(\mathbf{x})-\eta_{\theta^\star}(\mathbf{x})\to0$ en proba pour $p_{\mathbf{X}}\cdot\mu$-p.t. $\mathbf{x}$, alors $\lim_n\mathbb{E}_{n,\theta^\star}[R_{01}(\widehat g_n)-R_{01}(g^\star_{\theta^\star})]=0$. Preuve : majoration (13) $R_{01}(\tilde g)-R_{01}(g^\star_{\theta^\star})\le2\,\mathbb{E}[|\eta_{\theta^\star}(\mathbf{X})-\tilde\eta(\mathbf{X})|]$ + Fubini-Tonelli + **double convergence dominée**. « Si le modèle est bon, la méthode est bonne » ; mal spécifié ⇒ pas de garantie ; **double aléa** (test / apprentissage).

---

## 1. Notations et symboles

> **Notations particulières du poly à reproduire fidèlement :**
> - **Attributs en gras** : $\mathbf{X}$ (vecteur aléatoire), $\mathbf{x}$ (point de $\mathbb{R}^d$), $\mathbf{X}_i$, $\mathbf{w}$, $\mathbf{a}$ ; la réponse $Y$, $y$ n'est **pas** en gras. Exceptions : dans les exemples en dimension 1 (Ex. 1.3–1.6) le poly écrit $X\in\mathbb{R}$, $x$ non gras ; dans les Outils, la variable générique est parfois $X$ non gras (§2.1–2.2, §2.5).
> - **Espaces en police sans empattement** : $\mathsf{X}=\mathbb{R}^d$ (espace des attributs), $\mathsf{Y}$ (espace des réponses) ; tribus calligraphiques $\mathcal{X}$, $\mathcal{Y}$ ; espaces mesurés $(\mathsf{X},\mathcal{X},\mu)$ et $(\mathsf{Y},\mathcal{Y},\nu)$ dans le **Cours**.
> - **Inversion des mesures dans les Outils (§2.5)** : le poly y écrit $(\mathsf{Y},\mathcal{Y},\mu)$ et $(\mathsf{X},\mathcal{X},\nu)$, densité $p_{Y,\mathbf{X}}(y,\mathbf{x})$ par rapport à $\mu\otimes\nu$, et densité conditionnelle notée $p_{Y|\mathbf{X}}$ — alors que le **Cours** note $\mu$ la mesure sur $\mathsf{X}$, $\nu$ celle sur $\mathsf{Y}$, et $q_{Y|\mathbf{X}}$ la densité conditionnelle. Signalé, non corrigé.
> - **Loi en lettre ajourée** : $\mathbb{P}$ (loi du couple, aussi probabilité de l'espace de base), $\mathbb{P}_{\mathbf{X},Y}$, $\mathbb{P}_{\mathbf{X}}$, $\mathbb{P}_Y$, $\mathbb{P}_{\mathbf{X}|Y}$, $\mathbb{P}_{Y|\mathbf{X}}$ ; espérance $\mathbb{E}$ ; modèle $\{\mathbb{P}_\theta:\theta\in\Theta\}$, $\mathbb{E}_\theta$ ; loi de l'échantillon $\mathbb{P}_{n,\theta^\star}$, espérance $\mathbb{E}_{n,\theta^\star}$.
> - **Densités** : $p_{\mathbf{X},Y}$ (jointe), $p_{\mathbf{X}}$, $p_Y$ (marginales), $q_{\mathbf{X}|Y}(\mathbf{x}\mid y)$, $q_{Y|\mathbf{X}}(y\mid\mathbf{x})$ (conditionnelles, lettre **q**), $q_1$, $q_{-1}$ (densités de classe), $q_{i,\theta}$ (dans le modèle).
> - **Indicatrice** : $\mathbb{1}_{\{\cdot\}}$ (indicatrice ajourée) ; mesure de comptage $\mathrm{c}:=\delta_{\{-1\}}+\delta_{\{1\}}$ (lettre **c droite**) ; mesure de Lebesgue $\mathrm{Leb}$.
> - **Bernoulli à valeurs dans $\{-1,1\}$** : $\widetilde{\mathcal{B}\mathrm{er}}(p)$ (avec tilde), à ne pas confondre avec la Bernoulli usuelle sur $\{0,1\}$.
> - **Risques indexés par la perte et la loi** : $R_{\ell,\mathbb{P}}(g)$, $R^\star_{\ell,\mathbb{P}}$, règle $g^\star_{\ell,\mathbb{P}}$ ; abrégés $R(g)$, $R^\star$, $g^\star$ ; $R_{01}$, $R_2$, $R^\star_{01}$, $g^\star_{\ell_2,\mathbb{P}}$. **Étoile pleine** $\star$ partout ($g^\star$, $R^\star$, $\theta^\star$, $\eta^\star$).
> - **Règle apprise avec chapeau large** : $\widehat g_n$ ; estimateur $\hat\theta_n$ (petit chapeau), EMV $\widehat\theta_{\mathrm{MLE},n}$ (indice **MLE**, anglais, et non « MV » comme au ch.7) ; estimateurs de l'analyse discriminante $\widehat p_n$, $\widehat\mu_{i,n}$, $\widehat\Sigma_{i,n}$.
> - **Ensemble d'apprentissage calligraphique** : $\mathcal{D}_n$ ; dans les compléments $\mathcal{D}_T$, $\mathcal{D}_V$.
> - Fonction **sigmoïde** notée $\mathrm{sigm}$ (droit) ; fonctions $\mathrm{signe}$, $\mathrm{heaviside}$ (compléments).
> - **Espaces $L^2$** : $\mathcal{L}^2(\Omega,\mathcal{F},\mathbb{P})$ (calligraphique : variables de carré intégrable, sans quotient) vs $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$ (droit : quotient par l'égalité p.s.) ; classes notées $\dot X$ ; norme $\|\dot X\|_{\mathrm{L}^2}$ ; projection $P_{\mathcal{H}}Z$ ; relation d'équivalence $\mathcal{R}$. Le titre de §2.2 écrit « $L^1$ » en italique, l'énoncé $\mathcal{L}^1(\Omega,\mathcal{F},\mathbb{P})$.
> - Convergence en probabilité sous la loi de l'échantillon : $\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}$ ; sous $\mathbb{P}$ : $\xrightarrow{\mathbb{P}\text{-prob}}$.
> - Coordonnées d'un vecteur d'attributs : $x^{(i)}$, $X^{(i)}$ (exposant entre parenthèses).

| Symbole | Signification | Première apparition |
|---|---|---|
| $(\mathsf{X},\mathcal{X},\{\mathbb{P}_\theta:\theta\in\Theta\})$ | modèle statistique des chapitres 1–7 (rappel) | Intro, p. 7 |
| $\mathbf{X}\in\mathsf{X}=\mathbb{R}^d$ | attributs / variables explicatives (*features*) | Cadre 1.1, p. 9 |
| $d$ | dimension des attributs | Cadre 1.1, p. 9 |
| $Y\in\mathsf{Y}$ | réponse | Cadre 1.1, p. 9 |
| $\mathbb{P}$ | loi (inconnue) du couple $(\mathbf{X},Y)$ sur $\mathsf{X}\times\mathsf{Y}$ | Cadre 1.1, p. 9 |
| $\mathsf{Y}=\{-1,1\}$ ; $\{0,1,\dots,K-1\}$ ; $\mathbb{R}$ | classification binaire ; multi-classe ; régression | Cadre 1.1, p. 9 |
| $K$ | nombre de classes | Cadre 1.1, p. 9 |
| $g:\mathsf{X}\to\mathsf{Y}$ | prédicteur / classifieur / régresseur (mesurable) | Déf. 1.1, p. 9 |
| $\mathcal{D}_n=\{(\mathbf{X}_1,Y_1),\dots,(\mathbf{X}_n,Y_n)\}$ | ensemble d'apprentissage (*training set*), $n$ paires i.i.d. de loi $\mathbb{P}$ | p. 9 |
| $\widehat g_n$ | prédicteur construit sur $\mathcal{D}_n$ (statistique à valeurs fonctionnelles) | p. 9 |
| $\ell:\mathsf{Y}\times\mathsf{Y}\to\mathbb{R}_+$ | fonction de perte | Déf. 1.2, p. 11 |
| $\ell_{01}(y,g(\mathbf{x}))=\mathbb{1}_{\{y\neq g(\mathbf{x})\}}$ | perte 0–1 | Déf. 1.2, p. 11 |
| $\ell_2(y,g(\mathbf{x}))=(y-g(\mathbf{x}))^2$ | perte quadratique | Déf. 1.2, p. 11 |
| $R(g):=\mathbb{E}[\ell(Y,g(\mathbf{X}))]$ | risque d'un prédicteur | Déf. 1.3, p. 11 |
| $R_{01}(g)=\mathbb{P}(Y\neq g(\mathbf{X}))$ | risque 0–1 (probabilité d'erreur) | Déf. 1.3, p. 11 |
| $R_2(g)=\mathbb{E}[(Y-g(\mathbf{X}))^2]$ | risque quadratique | Déf. 1.3, p. 11 |
| $g^\star$ | règle optimale ($R(g^\star)\le R(g)$ pour tout $g$) | Questions, p. 11 |
| $\mathbb{P}_{\mathbf{X},Y}$ ; $\mathbb{P}_{\mathbf{X}}$, $\mathbb{P}_Y$ ; $\mathbb{P}_{\mathbf{X}\vert Y}$, $\mathbb{P}_{Y\vert \mathbf{X}}$ | loi jointe ; lois marginales ; lois conditionnelles | p. 12 |
| $(\mathsf{X},\mathcal{X},\mu)$, $(\mathsf{Y},\mathcal{Y},\nu)$ | espaces mesurés des attributs et des réponses | p. 12 |
| $\mu\otimes\nu$ | mesure produit dominante | p. 12 |
| $\mathrm{c}:=\delta_{\{-1\}}+\delta_{\{1\}}$ | mesure de comptage sur $\{-1,1\}$ | p. 12 |
| $\mathcal{B}(\mathbb{R})$, $\mathcal{B}(\mathbb{R}^d)$, $\mathcal{P}(\{-1,1\})$, $\mathrm{Leb}$ | boréliens, parties, mesure de Lebesgue | p. 12 |
| $p_{\mathbf{X},Y}(\mathbf{x},y)$ | densité jointe par rapport à $\mu\otimes\nu$ | p. 12 |
| $p_{\mathbf{X}}(\mathbf{x})$, $p_Y(y)$ | densités marginales, éq. (1) | p. 12 |
| $q_{\mathbf{X}\vert Y}(\mathbf{x}\mid y)$, $q_{Y\vert \mathbf{X}}(y\mid\mathbf{x})$ | densités conditionnelles, éq. (2)–(3) | p. 12 |
| $R_{\ell,\mathbb{P}}(g)$ | risque de $g$ relatif à $\ell$ et $\mathbb{P}$ | Déf. 1.4, p. 12 |
| $R^\star_{\ell,\mathbb{P}}$ (abrégé $R^\star$) | risque bayésien (infimum des risques) | Déf. 1.4, p. 12 |
| $g^\star_{\ell,\mathbb{P}}$ (abrégé $g^\star$) | règle de décision bayésienne | Déf. 1.4, p. 12 |
| $R_{\ell,\mathbb{P}}(g,\mathbf{x})$ | risque conditionnel au point $\mathbf{x}$ | Prop. 1.1, p. 13 |
| $g^\star_{\ell_2,\mathbb{P}}(\mathbf{X}):=\mathbb{E}[Y\mid\mathbf{X}]$ | prédicteur bayésien en régression quadratique | Th. 1.1, p. 14 |
| $\mathrm{L}^2(\Omega,\sigma(\mathbf{X}),\mathbb{P})$ | variables de carré intégrable $\sigma(\mathbf{X})$-mesurables | preuve Th. 1.1, p. 14 |
| $\eta:\mathsf{X}\to[0,1]$, $\eta(\mathbf{X})=\mathbb{P}(Y=1\mid\mathbf{X})$ | fonction de régression | Déf. 1.5, p. 15 |
| $g^\star(\mathbf{x}):=2\,\mathbb{1}_{\{\eta(\mathbf{x})\ge1/2\}}-1$ | classifieur bayésien (perte 0–1) | Th. 1.2, p. 15 |
| $R^\star_{01}$ | risque bayésien 0–1 | Th. 1.2, éq. (5), p. 15 |
| $\psi_g(\mathbf{x},y):=\mathbb{1}_{\{g(\mathbf{x})\neq y\}}$ | fonction auxiliaire de la preuve | preuve Th. 1.2, p. 15 |
| $D:=\mathbb{1}_{\{g(\mathbf{X})=-1\}}-\mathbb{1}_{\{g^\star(\mathbf{X})=-1\}}$ | variable auxiliaire à valeurs dans $\{-1,0,1\}$ | preuve Th. 1.2, p. 15 |
| $\widetilde{\mathcal{B}\mathrm{er}}(p)$ | loi de Bernoulli de paramètre $p$ **à valeurs dans $\{-1,1\}$** | p. 16 |
| $\mathcal{L}(Y)$, $\mathcal{L}(\mathbf{X}\mid Y=i)$ | loi de $Y$, loi conditionnelle | p. 16 / Cadre 1.2 |
| $p=\mathbb{P}(Y=1)\in\,]0,1[$ | proportion de la classe 1 | p. 16 |
| $q_1(\mathbf{x}):=q_{\mathbf{X}\vert Y}(\mathbf{x}\mid y=1)$, $q_{-1}(\mathbf{x}):=q_{\mathbf{X}\vert Y}(\mathbf{x}\mid y=-1)$ | densités des attributs dans chaque classe | p. 16 |
| $\mathcal{N}(\mu_i,\sigma^2)$, $\mu_1$, $\mu_{-1}$ | gaussiennes de classe (Ex. 1.6) | Ex. 1.6, p. 17 |
| $\{\mathbb{P}_\theta:\theta\in\Theta\}$, $g^\star_\theta$ | modèle paramétrique de la loi de $(\mathbf{X},Y)$ ; règle bayésienne sous $\mathbb{P}_\theta$ | Méthode 1.1, p. 18 |
| $\hat\theta_n$ ; $\widehat g_n:=g^\star_{\hat\theta_n}$ | estimateur de $\theta$ ; règle par substitution (*plug-in*) | Méthode 1.1, p. 18 |
| $\theta=(p,\mu_1,\mu_{-1},\Sigma_1,\Sigma_{-1})$ | paramètre de l'analyse discriminante | Cadre 1.2, p. 19 |
| $\mathrm{S}_d^+$ | ensemble des matrices de covariance $d\times d$ **inversibles** | Cadre 1.2, p. 19 |
| $q_{i,\theta}$ | densité $\mathcal{N}(\mu_i,\Sigma_i)$ de la classe $i$ | Cadre 1.2, p. 19 |
| $\phi_\theta(\mathbf{x})$ | log-rapport $\log\frac{p\,q_{1,\theta}(\mathbf{x})}{(1-p)\,q_{-1,\theta}(\mathbf{x})}$ (= logit de $\eta_\theta$) | éq. (11), p. 19 |
| $\eta_\theta$ | fonction de régression sous $\mathbb{P}_\theta$ | p. 19 |
| $\mathrm{sigm}(t)=1/(1+e^{-t})$ | fonction sigmoïde (logistique) | p. 19 (§2.9) |
| $\mathbf{w}_\theta:=\Sigma^{-1}(\mu_1-\mu_{-1})$, $A_\theta$ | coefficients de la frontière linéaire (LDA) | p. 19 |
| LDA / QDA | analyse discriminante linéaire / quadratique | p. 20 |
| $\widehat p_n$, $\widehat\mu_{i,n}$, $\widehat\Sigma_{i,n}$ | EMV de l'analyse discriminante | p. 20 |
| $\widehat\theta_{\mathrm{MLE},n}$ | estimateur du maximum de vraisemblance | éq. (12), p. 21 |
| $\ell_{\log}(y,t)=\log(1+e^{-yt})$ | perte logistique | p. 21 |
| $\sigma^2$ | variance (connue) du modèle linéaire gaussien | Cadre 1.4, p. 22 |
| $R_{01}(\widehat g_n):=\mathbb{P}(\widehat g_n(\mathbf{X})\neq Y\mid\mathcal{D}_n)$ | probabilité d'erreur conditionnelle (v.a. fonction de $\mathcal{D}_n$) | p. 22 |
| $\theta^\star$, $\mathbb{P}_{n,\theta^\star}$, $\mathbb{E}_{n,\theta^\star}$ | vraie valeur ; loi et espérance sous la loi de $\mathcal{D}_n$ | Prop. 1.5, p. 22 |
| $\tilde\eta$, $\tilde g:=2\,\mathbb{1}_{\{\tilde\eta\ge1/2\}}-1$ | fonction de régression approchée, règle associée | éq. (13), p. 22 |
| $\mathcal{L}^2(\Omega,\mathcal{F},\mathbb{P})$ | variables de carré intégrable | Déf. 2.1, p. 25 |
| $\langle Z_1,Z_2\rangle:=\mathbb{E}[Z_1Z_2]$ | produit (pré-)scalaire | Déf. 2.1, p. 25 |
| $\mathcal{R}$ | égalité $\mathbb{P}$-p.s. (relation d'équivalence) | p. 25 |
| $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$, $\dot X$ | espace quotient, classe d'équivalence | Déf. 2.2, p. 25 |
| $\Vert\dot X\Vert_{\mathrm{L}^2}$ | norme de $\mathrm{L}^2$ | p. 26 |
| $\mathcal{H}$, $P_{\mathcal{H}}Z$ | sous-espace fermé, projection orthogonale | Th. 2.2, p. 26 |
| $\mathcal{A}\subset\mathcal{F}$ | sous-tribu ($\sigma$-algèbre) | Lemme 2.1, p. 26 |
| $\mathbb{E}[Z\mid\mathcal{A}]$ | espérance conditionnelle sachant une tribu | Déf. 2.3, p. 27 |
| $\sigma(\mathbf{X})$ | tribu engendrée par $\mathbf{X}$ | §2.3, p. 27 |
| $\mathbb{E}[Z\mid\mathbf{X}]$ | espérance conditionnelle sachant $\mathbf{X}$ | Déf. 2.4, p. 27 |
| $\Psi$ | fonction mesurable de la factorisation de Doob | Prop. 2.1, p. 27 |
| $\chi$ | loi de $U$ (Prop. 2.5) | Prop. 2.5, p. 29 |
| $\Phi$ | fonction « gelée » / espérance conditionnelle explicite | Prop. 2.5, 2.6, p. 29–30 |
| $p_{Y\vert \mathbf{X}}(y\mid\mathbf{x})$ | densité conditionnelle (notation des Outils) | §2.5, p. 30 |
| $\widehat R_n(g)$ | risque empirique (compléments) | Déf. 4.1, p. 35 |
| $g_{\mathrm{bad},n}$ | règle « par cœur » de risque empirique nul | p. 36 |
| $\mathcal{C}$ | classe de classifieurs | §4.6, p. 37 |
| $\mathrm{signe}(t)=2\,\mathrm{heaviside}(t)-1$ ; $\mathrm{heaviside}(t)=\mathbb{1}_{\{t>0\}}$ | fonctions signe et de Heaviside | Ex. 4.3, p. 38 ; §4.8, p. 40 |
| $\mathcal{D}_T$, $\mathcal{D}_V$, $\widehat R_V(g)$ | ensembles d'apprentissage / de validation, erreur de validation | p. 39 |
| $\eta^\star$ | vraie fonction de régression (Prop. 4.2) | p. 39 |

---

## 2. Cours — contenu principal

### Remarque (introduction, p. 7) — De la statistique à l'apprentissage statistique
**Source :** Poly ch.8, introduction, p. 7
**Contenu :** les sept premiers chapitres relèvent de la **statistique** : on observe $X_1,\dots,X_n$, on choisit un modèle $(\mathsf{X},\mathcal{X},\{\mathbb{P}_\theta:\theta\in\Theta\})$ et on infère une information sur le paramètre (estimation, test) ; la procédure est évaluée **sur $\theta$** (risque quadratique, niveau, puissance). Les chapitres 8–10 relèvent de l'**apprentissage statistique** : prédire une réponse $Y$ en fonction d'attributs $\mathbf{X}$ à partir de paires $(\mathbf{X}_1,Y_1),\dots,(\mathbf{X}_n,Y_n)$ ; la procédure est évaluée par le **risque de la règle de prédiction** produite. Deux voies :
- **voie statistique (modélisation)** : modéliser la loi jointe de $(\mathbf{X},Y)$, apprendre ses paramètres, en déduire une règle (chap. 8) ;
- **voie apprentissage (discriminative)** : choisir une classe de fonctions et une perte, chercher la meilleure règle de la classe pour ce risque (chap. 9–10).

Le cadre tient en **quatre objets** : attributs, réponse, prédicteur, fonction de perte (dont la moyenne définit le risque). Si la loi est connue, la règle de risque minimal se calcule : **espérance conditionnelle** (perte quadratique), **classifieur de Bayes** (perte 0–1) ; une formule explicite donne l'écart au minimum. Mais la loi est inconnue : la règle de Bayes n'est pas une fonction des observations, le risque bayésien reste une **référence théorique**. L'approche par modélisation estime les paramètres d'un modèle et les substitue dans la règle de Bayes : **analyse discriminante linéaire et quadratique, modèle logistique, modèle linéaire gaussien** sont les trois exemples traités.
**Objectifs (ch. 8–10)** : maîtriser le cadre (données, pertes, risque) ; risque conditionnel et règle de Bayes ; comment « apprendre » ; compromis (absence de règle universellement bonne, sur-apprentissage) ; résultats théoriques sur la qualité des règles apprises.

### Remarque (« Statistique et apprentissage », p. 8) — Raisonnement inductif ; erreur irréductible
**Source :** Poly ch.8, p. 8
**Contenu :** l'apprentissage supervisé conserve une inconnue probabiliste (la loi du couple) mais **déplace la question** : on ne décrit plus la loi, on cherche $g$ associant à $\mathbf{x}$ une prévision $g(\mathbf{x})$ ; la qualité de $g$ = perte moyenne en prédisant $g(\mathbf{X})$ quand la réponse est $Y$. Applications : traduction, reconnaissance d'images, questions-réponses, génération d'images, prévision météorologique. Informatique traditionnelle = raisonnement **déductif** (règle donnée à l'avance) ; apprentissage = raisonnement **inductif** (règle apprise sur les données). Apprentissage machine et apprentissage statistique = deux faces d'un même domaine.
**Intuition (encadré du poly) :** en statistique la loi est la **cible** et le risque d'estimation tend vers 0 quand $n\to\infty$ ; en apprentissage la loi n'est qu'un **intermédiaire** : même en la connaissant parfaitement, il reste une **erreur irréductible** (car $\mathbf{X}$ ne détermine pas $Y$). Le risque ne tend donc pas vers zéro, il tend **au mieux vers le risque de Bayes**.
**Pièges :** ne pas attendre $R(\widehat g_n)\to0$ ; la bonne cible est $R^\star$.

### Cadre 1.1 — Apprentissage supervisé
**Source :** Poly ch.8, Cadre 1.1, p. 9
**Hypothèses :** aucune sur la structure de dépendance entre $\mathbf{X}$ et $Y$.
**Énoncé :**
- Les **attributs** $\mathbf{X}\in\mathsf{X}=\mathbb{R}^d$, aussi appelés variables explicatives (*features*).
- La **réponse** $Y\in\mathsf{Y}$.
- Le couple $(\mathbf{X},Y)$ suit une loi $\mathbb{P}$ sur $\mathsf{X}\times\mathsf{Y}$, et $\mathbb{P}$ est **inconnue**.

Selon la nature de $\mathsf{Y}$ :
- **classification binaire** si $\mathsf{Y}=\{-1,1\}$ ;
- **classification multi-classe** si $\mathsf{Y}=\{0,1,2,\dots,K-1\}$ ;
- **régression** si $\mathsf{Y}=\mathbb{R}$.

**Preuve (étapes) :** sans objet (cadre).
**Intuition :** on observe un individu par un vecteur de caractéristiques et on prédit une grandeur attachée à cet individu.
**Pièges / erreurs classiques :** en binaire, le codage est $\{-1,1\}$ (et non $\{0,1\}$) dans tout le Cours ; seule la Prop. 4.1 des compléments et la figure 7 utilisent $\{0,1\}$.

### Définition 1.1 — Prédicteur, classifieur, régresseur
**Source :** Poly ch.8, Définition 1.1, p. 9
**Hypothèses :** Cadre 1.1.
**Énoncé :** un **prédicteur** (ou **classifieur**, ou **régresseur**) est une fonction **mesurable** $g:\mathsf{X}\to\mathsf{Y}$.
**Preuve (étapes) :** sans objet.
**Intuition :** une « règle de décision » qui à tout attribut associe une prévision.

### Remarque (« Objectif », p. 9) — Ensemble d'apprentissage ; $\widehat g_n$ est une statistique
**Source :** Poly ch.8, encadré « Objectif » et texte, p. 9
**Énoncé :** on dispose d'un **ensemble d'apprentissage** (*training set*)
$$\mathcal{D}_n=\{(\mathbf{X}_1,Y_1),\dots,(\mathbf{X}_n,Y_n)\},$$
formé de $n$ paires **indépendantes et de même loi $\mathbb{P}$** que $(\mathbf{X},Y)$, et l'on cherche à construire à partir de ces données un prédicteur $\widehat g_n$.
**Commentaire du poly :** $\mathcal{D}_n$ est un **$n$-échantillon** de la loi $\mathbb{P}$ sur $\mathsf{X}\times\mathsf{Y}$ au sens du ch.1, et $\widehat g_n$ est une **statistique à valeurs dans un espace de fonctions**. Rien n'est supposé sur la dépendance entre $\mathbf{X}$ et $Y$ ; en particulier deux individus de mêmes attributs peuvent porter des réponses différentes.
**Pièges :** $Y$ n'est pas supposé fonction de $\mathbf{X}$ ; c'est précisément ce qui crée l'erreur irréductible.

### Exemple 1.1 — Prix de vente de maisons
**Source :** Poly ch.8, Exemple 1.1, p. 9
**Énoncé :** prédire la valeur de vente d'une maison à partir de ses caractéristiques. Jeu *House price prediction* : $n=1500$ exemples ; $Y\in\mathbb{R}$ ⇒ **régression** ; 81 caractéristiques (année de construction, quartier, surface, étage, balcon…) ⇒ $\mathbf{X}\in\mathbb{R}^{81}$. Caractéristiques quantitatives, qualitatives ou ordinales : leur mise sous forme de vecteur réel est un **prétraitement** supposé fait.
**Méthodes mobilisées :** identification de $\mathsf{X}$, $\mathsf{Y}$, $n$, $d$ (type de tâche).

### Exemple 1.2 — Reconnaissance de chiffres manuscrits (MNIST)
**Source :** Poly ch.8, Exemple 1.2, p. 9–10 (Figure 1, p. 10)
**Énoncé :** MNIST : 60 000 images, réparties en 50 000 images d'apprentissage et 10 000 images de test (chiffres du poly, reproduits tels quels), équilibrées entre classes ; images $28\times28$ en niveaux de gris ⇒ $\mathbf{X}\in\mathbb{R}^{784}$, $d=784$ ; dix classes $Y\in\{0,1,\dots,9\}$ ⇒ **classification multi-classe**.
**Autres tâches (texte p. 10)** : détection de pourriels (attributs = vecteur des occurrences des mots du dictionnaire ; réponse = pourriel ou non), segmentation sémantique (catégorie de chaque pixel), classification de sentiments (polarité d'un texte), prévision du prix de l'électricité (réponse réelle).
**Méthodes mobilisées :** identification du type de tâche.

### Exemple 1.3 — Taille et genre
**Source :** Poly ch.8, Exemple 1.3, p. 10
**Énoncé :** $X\in\mathbb{R}$ (taille), $Y\in\{-1,1\}$ (genre) : **classification binaire**, $d=1$. Conditionnellement à $Y$, la taille se répartit autour d'une moyenne propre à la classe, avec une dispersion du même ordre ⇒ modélisation naturelle par **deux gaussiennes de moyennes différentes et de même variance**. Si les deux classes sont également représentées, la règle optimale compare les deux densités et revient à placer un **seuil au milieu des deux moyennes**. Les densités se recouvrent largement : ce recouvrement **empêche la probabilité d'erreur de descendre à zéro**, quelle que soit la règle.
**Méthodes mobilisées :** approche générative (modéliser $X\mid Y$) ; repris à l'Ex. 1.6.

### Exemple 1.4 — Âge et maladie cardiovasculaire
**Source :** Poly ch.8, Exemple 1.4, p. 10
**Énoncé :** $X\in\mathbb{R}$ (âge), $Y\in\{-1,1\}$ (présence/absence de maladie). On sait décrire non la loi de l'âge dans chaque classe mais la **probabilité d'être malade à âge donné**, croissante et régulière, dans $[0,1]$ : c'est la forme du **modèle logistique**, cette probabilité valant $\mathrm{sigm}(a+b\,x)$ pour deux réels $a,b$. La règle optimale prédit la maladie **au-delà d'un âge seuil**, celui où cette probabilité franchit $1/2$.
**Méthodes mobilisées :** modélisation de $Y\mid X$ (Cadre 1.3) ; seuil $\mathrm{sigm}(t)\ge1/2\iff t\ge0$ (§2.9), soit (ajout de l'extracteur, si $b>0$) $x\ge-a/b$.

### Exemple 1.5 — Note à l'examen et nombre d'heures de travail
**Source :** Poly ch.8, Exemple 1.5, p. 10
**Énoncé :** $X\in\mathbb{R}$ (heures de travail), $Y\in\mathbb{R}$ (note) : **régression**. La note croît en moyenne avec le travail mais deux élèves au même nombre d'heures n'ont pas la même note. La règle optimale pour la perte quadratique est la note moyenne à temps fixé, $x\mapsto\mathbb{E}[Y\mid X=x]$ ; si cette moyenne est modélisée comme affine, on retrouve la **régression linéaire simple** (estimateur des moindres carrés, ch.2, ex. 1.15).
**Méthodes mobilisées :** Th. 1.1 (espérance conditionnelle) ; modèle linéaire (Cadre 1.4).

### Définition 1.2 — Fonction de perte
**Source :** Poly ch.8, Définition 1.2, p. 11
**Hypothèses :** $\mathsf{Y}$ espace des réponses.
**Énoncé :** une **fonction de perte** est une fonction mesurable positive $\ell:\mathsf{Y}\times\mathsf{Y}\to\mathbb{R}_+$ ; la quantité $\ell(y,g(\mathbf{x}))$ quantifie la qualité de la prévision $g(\mathbf{x})$ de la réponse $y$.
- **Perte 0–1** (classification), pour $y\in\mathsf{Y}=\{-1,1\}$ ou $y\in\mathsf{Y}=\{0,\dots,K-1\}$ :
$$\ell_{01}(y,g(\mathbf{x}))=\mathbb{1}_{\{y\neq g(\mathbf{x})\}}.$$
- **Perte quadratique** (régression), pour $y\in\mathbb{R}$ :
$$\ell_2(y,g(\mathbf{x}))=(y-g(\mathbf{x}))^2.$$
**Preuve (étapes) :** sans objet.
**Intuition :** chiffrer le coût d'une prévision erronée.
**Pièges :** l'ordre des arguments est $(y,\text{prévision})$.

### Définition 1.3 — Risque d'une règle de décision
**Source :** Poly ch.8, Définition 1.3, p. 11
**Hypothèses :** $\ell$ fonction de perte, $g$ prédicteur, espérance existante.
**Énoncé :**
$$R(g):=\mathbb{E}[\ell(Y,g(\mathbf{X}))]=\int\ell(y,g(\mathbf{x}))\,\mathrm{d}\mathbb{P}(\mathbf{x},y),$$
sous réserve que cette espérance existe. En particulier :
- risque 0–1 en classification : $R_{01}(g)=\mathbb{P}(Y\neq g(\mathbf{X}))$ ;
- risque quadratique en régression : $R_2(g)=\mathbb{E}[(Y-g(\mathbf{X}))^2]$.
**Preuve (étapes) :** $\mathbb{E}[\mathbb{1}_{\{Y\neq g(\mathbf{X})\}}]=\mathbb{P}(Y\neq g(\mathbf{X}))$ (espérance d'une indicatrice).
**Intuition :** pour la perte 0–1 le risque est une probabilité dans $[0,1]$ : la **proportion d'individus mal classés** par $g$.
**Pièges / erreurs classiques :** pour la perte quadratique le risque **peut être infini** ; les énoncés de la §1.2 supposent $Y$ de carré intégrable et restreignent la comparaison aux $g$ tels que $g(\mathbf{X})$ soit de carré intégrable (p. 11).

### Remarque (« Questions », p. 11) — Les trois questions de l'apprentissage
**Source :** Poly ch.8, encadré « Questions », p. 11
**Contenu :** le cadre est complet (règle mesurable $g$, perte $\ell(Y,g(\mathbf{X}))$, risque $R(g)$, $\mathcal{D}_n$ formé de $n$ copies indépendantes de $(\mathbf{X},Y)$). Trois questions :
1. Existe-t-il une règle $g^\star$ **optimale**, au sens où $R(g^\star)\le R(g)$ pour toute règle $g$ ? → **§1.2**.
2. Comment construire, à partir de $\mathcal{D}_n$, une règle $\widehat g_n$ qui approche $g^\star$ ? → **§1.3** (une réponse).
3. Peut-on quantifier l'écart $R(\widehat g_n)-R(g^\star)$ ? → abordée sur les règles par substitution (Prop. 1.5), sujet des **chapitres 9 et 10**.

### Remarque (§1.2, p. 11–12) — Lois jointe, marginales, conditionnelles ; densités
**Source :** Poly ch.8, §1.2 « Lois jointe, marginales et conditionnelles », p. 12
**Hypothèses :** dans toute la §1.2, la loi $\mathbb{P}$ du couple est **connue** ; la règle bayésienne obtenue n'est pas calculable en pratique et sert de **référence**. Tout le chapitre se place dans le cas à densité : $(\mathsf{X},\mathcal{X},\mu)$ et $(\mathsf{Y},\mathcal{Y},\nu)$ espaces mesurés, la loi de $(\mathbf{X},Y)$ admet une densité $p_{\mathbf{X},Y}$ par rapport à $\mu\otimes\nu$. Deux situations :
- **régression** : $(\mathsf{Y},\mathcal{Y},\nu)=(\mathbb{R},\mathcal{B}(\mathbb{R}),\mathrm{Leb})$ et $(\mathsf{X},\mathcal{X},\mu)=(\mathbb{R}^d,\mathcal{B}(\mathbb{R}^d),\mathrm{Leb})$ ;
- **classification binaire** : mêmes attributs, $(\mathsf{Y},\mathcal{Y},\nu)=(\{-1,1\},\mathcal{P}(\{-1,1\}),\mathrm{c})$, où $\mathrm{c}:=\delta_{\{-1\}}+\delta_{\{1\}}$ est la **mesure de comptage**.

**Énoncé (formules (1)–(3)) :** notations $\mathbb{P}_{\mathbf{X},Y}$ (loi jointe), $\mathbb{P}_{\mathbf{X}}$ et $\mathbb{P}_Y$ (marginales), $\mathbb{P}_{\mathbf{X}|Y}$, $\mathbb{P}_{Y|\mathbf{X}}$ (conditionnelles).
$$p_{\mathbf{X}}(\mathbf{x})=\int_{\mathsf{Y}}p_{\mathbf{X},Y}(\mathbf{x},y)\,\nu(\mathrm{d}y),\qquad p_Y(y)=\int_{\mathsf{X}}p_{\mathbf{X},Y}(\mathbf{x},y)\,\mu(\mathrm{d}\mathbf{x}).\tag{1}$$
$$p_{\mathbf{X},Y}(\mathbf{x},y)=q_{\mathbf{X}|Y}(\mathbf{x}\mid y)\,p_Y(y)=q_{Y|\mathbf{X}}(y\mid\mathbf{x})\,p_{\mathbf{X}}(\mathbf{x}),\tag{2}$$
$$q_{Y|\mathbf{X}}(y\mid\mathbf{x})=\frac{p_{\mathbf{X},Y}(\mathbf{x},y)}{p_{\mathbf{X}}(\mathbf{x})}\quad\text{pour tout }\mathbf{x}\text{ tel que }p_{\mathbf{X}}(\mathbf{x})>0.\tag{3}$$
Les formules valent dans les deux cas (mesure dominante discrète ou continue). La construction et la vérification que (3) définit une densité de probabilité sur $\mathsf{Y}$ sont reprises en §2.5 (Outils).
**Preuve (étapes) :** renvoyée à §2.5 (Fubini pour (1) ; (3) est une définition ; (2) en découle).
**Intuition (encadré du poly) :** deux manières de « voir » la même expérience : (a) tirer d'abord la classe $Y$, puis $\mathbf{X}$ dans la loi propre à cette classe — vue $q_{\mathbf{X}|Y}\,p_Y$, celle de l'**approche générative** (analyse discriminante) ; (b) tirer d'abord $\mathbf{X}$, puis $Y$ dans la loi propre à ces attributs — vue $q_{Y|\mathbf{X}}\,p_{\mathbf{X}}$, celle du **modèle logistique** et du **modèle linéaire gaussien**. Même loi jointe, modélisations plus ou moins faciles selon le problème.
**Pièges :** (3) n'est définie que là où $p_{\mathbf{X}}>0$ ; l'ensemble $\{p_{\mathbf{X}}=0\}$ est de mesure nulle pour $p_{\mathbf{X}}\cdot\mu$.

### Définition 1.4 — Risque et règle bayésiens
**Source :** Poly ch.8, Définition 1.4, p. 12
**Hypothèses :** $\ell:\mathsf{Y}\times\mathsf{Y}\to\mathbb{R}_+$ fonction de perte, $\mathbb{P}$ probabilité sur $\mathsf{X}\times\mathsf{Y}$.
**Énoncé :** le **risque minimum**
$$R^\star_{\ell,\mathbb{P}}:=\inf\Big\{R_{\ell,\mathbb{P}}(g)=\int\ell(y,g(\mathbf{x}))\,\mathrm{d}\mathbb{P}(\mathbf{x},y),\ g:\mathsf{X}\to\mathsf{Y}\text{ mesurable}\Big\}$$
est le **risque bayésien** relatif à $\mathbb{P}$ et $\ell$. Une fonction mesurable $g^\star_{\ell,\mathbb{P}}:\mathsf{X}\to\mathsf{Y}$ telle que
$$R_{\ell,\mathbb{P}}\big(g^\star_{\ell,\mathbb{P}}\big)=R^\star_{\ell,\mathbb{P}}$$
est appelée **règle de décision bayésienne**. Sans ambiguïté on écrit $g^\star_{\ell,\mathbb{P}}=g^\star$ et $R^\star_{\ell,\mathbb{P}}=R^\star$.
**Preuve (étapes) / remarques du poly (p. 13) :**
1. L'infimum **existe toujours** : l'ensemble des risques est une partie non vide de $\mathbb{R}_+\cup\{+\infty\}$.
2. Rien ne garantit a priori qu'il soit **atteint**, ni qu'il le soit par une **seule** règle.
3. Les Th. 1.1 et 1.2 exhibent une règle qui l'atteint (régression/perte quadratique ; classification binaire/perte 0–1).
**Intuition :** $R^\star$ = meilleure performance possible avec l'information contenue dans $\mathbf{X}$ ; une **référence théorique**.
**Pièges :** « bayésien » ici ne désigne pas une loi a priori sur $\theta$ (ch.3) mais l'optimalité sous la loi connue $\mathbb{P}$ ; $g^\star$ dépend de $\ell$ **et** de $\mathbb{P}$.

### Proposition 1.1 — Risque conditionnel
**Source :** Poly ch.8, Proposition 1.1, p. 13
**Hypothèses :** $(\mathbf{X},Y)$ admet une densité $p_{\mathbf{X},Y}$ par rapport à $\mu\otimes\nu$ ; $\ell:\mathsf{Y}\times\mathsf{Y}\to\mathbb{R}_+$ fonction de perte ; $g:\mathsf{X}\to\mathsf{Y}$ prédicteur mesurable.
**Énoncé :**
$$R_{\ell,\mathbb{P}}(g)=\mathbb{E}[\ell(Y,g(\mathbf{X}))]=\mathbb{E}\big[\mathbb{E}[\ell(Y,g(\mathbf{X}))\mid\mathbf{X}]\big]=\int_{\mathsf{X}}R_{\ell,\mathbb{P}}(g,\mathbf{x})\,p_{\mathbf{X}}(\mathbf{x})\,\mu(\mathrm{d}\mathbf{x}),$$
où le **risque conditionnel** au point $\mathbf{x}$ est
$$R_{\ell,\mathbb{P}}(g,\mathbf{x}):=\int_{\mathsf{Y}}\ell(y,g(\mathbf{x}))\,q_{Y|\mathbf{X}}(y\mid\mathbf{x})\,\nu(\mathrm{d}y).$$
Si une fonction mesurable $g^\star:\mathsf{X}\to\mathsf{Y}$ vérifie
$$R_{\ell,\mathbb{P}}(g^\star,\mathbf{x})=\inf_{a\in\mathsf{Y}}\int_{\mathsf{Y}}\ell(y,a)\,q_{Y|\mathbf{X}}(y\mid\mathbf{x})\,\nu(\mathrm{d}y)$$
pour $p_{\mathbf{X}}\cdot\mu$-presque tout $\mathbf{x}\in\mathsf{X}$, alors $g^\star$ est une **règle de décision bayésienne**.
**Preuve (étapes) :**
1. L'intégrande $(\mathbf{x},y)\mapsto\ell(y,g(\mathbf{x}))\,p_{\mathbf{X},Y}(\mathbf{x},y)$ est **mesurable et positive** ⇒ **Fubini-Tonelli** autorise l'intégration successive :
$$R_{\ell,\mathbb{P}}(g)=\int_{\mathsf{X}\times\mathsf{Y}}\ell(y,g(\mathbf{x}))\,p_{\mathbf{X},Y}(\mathbf{x},y)\,\mu(\mathrm{d}\mathbf{x})\,\nu(\mathrm{d}y)=\int_{\mathsf{X}}\Big\{\int_{\mathsf{Y}}\ell(y,g(\mathbf{x}))\,q_{Y|\mathbf{X}}(y\mid\mathbf{x})\,\nu(\mathrm{d}y)\Big\}p_{\mathbf{X}}(\mathbf{x})\,\mu(\mathrm{d}\mathbf{x}),$$
en utilisant (3) et le fait que $\{\mathbf{x}:p_{\mathbf{X}}(\mathbf{x})=0\}$ est de mesure nulle pour $p_{\mathbf{X}}\cdot\mu$.
2. L'écriture $\mathbb{E}[\mathbb{E}[\ell(Y,g(\mathbf{X}))\mid\mathbf{X}]]$ résulte de l'**espérance de l'espérance conditionnelle** (Prop. 2.2) et de l'expression de l'espérance conditionnelle dans le **cas à densité** (Prop. 2.6).
3. Optimalité : soit $g$ quelconque. Pour $p_{\mathbf{X}}\cdot\mu$-p.t. $\mathbf{x}$, $R_{\ell,\mathbb{P}}(g^\star,\mathbf{x})\le R_{\ell,\mathbb{P}}(g,\mathbf{x})$, **car $g(\mathbf{x})\in\mathsf{Y}$** et le membre de gauche est l'infimum sur $a\in\mathsf{Y}$.
4. On **intègre** cette inégalité contre la mesure positive $p_{\mathbf{X}}\cdot\mu$ : $R_{\ell,\mathbb{P}}(g^\star)\le R_{\ell,\mathbb{P}}(g)$, d'où $R_{\ell,\mathbb{P}}(g^\star)=R^\star_{\ell,\mathbb{P}}$. □
**Intuition :** on calcule la règle bayésienne **attribut par attribut** : en chaque $\mathbf{x}$, choisir l'action $a$ qui minimise la perte moyenne sous la loi conditionnelle $q_{Y|\mathbf{X}}(\cdot\mid\mathbf{x})$.
**Pièges / erreurs classiques :** il faut que la fonction $\mathbf{x}\mapsto g^\star(\mathbf{x})$ soit **mesurable** (hypothèse de l'énoncé) ; l'infimum ponctuel doit être atteint pour presque tout $\mathbf{x}$. Méthode générale réutilisée dans l'exercice 1 (perte asymétrique).

### Théorème 1.1 — Prédicteur bayésien en régression, perte quadratique
**Source :** Poly ch.8, Théorème 1.1, p. 14
**Hypothèses :** $\mathbb{E}[Y^2]<\infty$ ; $g^\star_{\ell_2,\mathbb{P}}(\mathbf{X}):=\mathbb{E}[Y\mid\mathbf{X}]$ ; $g:\mathbb{R}^d\to\mathbb{R}$ mesurable avec $\mathbb{E}[g^2(\mathbf{X})]<\infty$.
**Énoncé :**
$$\mathbb{E}\Big[\big(Y-g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})\big)^2\Big]\le\mathbb{E}\Big[\big(Y-g(\mathbf{X})\big)^2\Big],$$
et plus précisément
$$\mathbb{E}\Big[\big(Y-g(\mathbf{X})\big)^2\Big]=\mathbb{E}\Big[\big(Y-g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})\big)^2\Big]+\mathbb{E}\Big[\big(g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})-g(\mathbf{X})\big)^2\Big].$$
La fonction $g^\star_{\ell_2,\mathbb{P}}$ est donc une **règle de décision bayésienne** pour la perte quadratique, **unique à l'égalité $\mathbb{P}$-presque sûre près**.
**Preuve (étapes) :**
1. *Existence d'une fonction* : $\mathbb{E}[Y\mid\mathbf{X}]$ est, par définition (§2.1), la **projection orthogonale** de $Y$ sur le sous-espace fermé $\mathrm{L}^2(\Omega,\sigma(\mathbf{X}),\mathbb{P})$ de $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$ ; la **caractérisation de Doob** (Prop. 2.1) fournit une fonction mesurable $g^\star_{\ell_2,\mathbb{P}}$ telle que $g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})=\mathbb{E}[Y\mid\mathbf{X}]$. En particulier $\mathbb{E}[(g^\star_{\ell_2,\mathbb{P}})^2(\mathbf{X})]<\infty$.
2. *Décomposition* : pour $g$ mesurable avec $\mathbb{E}[g^2(\mathbf{X})]<\infty$, on écrit $Y-g(\mathbf{X})=\big(Y-g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})\big)+\big(g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})-g(\mathbf{X})\big)$ et on **développe le carré** :
$$\mathbb{E}[(Y-g(\mathbf{X}))^2]=\mathbb{E}[(Y-g^\star_{\ell_2,\mathbb{P}}(\mathbf{X}))^2]+2\,\mathbb{E}\big[(Y-g^\star_{\ell_2,\mathbb{P}}(\mathbf{X}))(g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})-g(\mathbf{X}))\big]+\mathbb{E}[(g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})-g(\mathbf{X}))^2].$$
Les trois espérances sont **finies** car $Y$, $g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})$, $g(\mathbf{X})$ sont de carré intégrable.
3. *Terme croisé nul* : $T:=g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})-g(\mathbf{X})\in\mathrm{L}^2(\Omega,\sigma(\mathbf{X}),\mathbb{P})$, donc la **relation d'orthogonalité** caractérisant la projection (Th. 2.2 (ii)) donne $\mathbb{E}[(Y-g^\star_{\ell_2,\mathbb{P}}(\mathbf{X}))\,T]=0$. D'où l'identité ; l'inégalité suit car le dernier terme est **positif**.
4. *Cas $\mathbb{E}[g^2(\mathbf{X})]=\infty$* : alors $Y-g(\mathbf{X})$ n'est pas de carré intégrable (sinon $g(\mathbf{X})=Y-(Y-g(\mathbf{X}))$ le serait, $\mathrm{L}^2$ étant un **espace vectoriel**) ; donc $\mathbb{E}[(Y-g(\mathbf{X}))^2]=+\infty$ et l'inégalité reste vraie. L'infimum de la Déf. 1.4 est donc **atteint** en $g^\star_{\ell_2,\mathbb{P}}$.
5. *Unicité* : si $g$ réalise aussi le minimum, l'identité donne $\mathbb{E}[(g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})-g(\mathbf{X}))^2]=0$, i.e. $g(\mathbf{X})=g^\star_{\ell_2,\mathbb{P}}(\mathbf{X})$ $\mathbb{P}$-p.s. □
**Intuition (encadré du poly) :** propriété de **projection** : parmi toutes les fonctions des attributs, celle qui approche $Y$ au mieux en moyenne quadratique est la projection de $Y$ sur l'espace des fonctions des attributs, i.e. l'espérance conditionnelle. L'identité est un **théorème de Pythagore** : erreur de $g$ = **erreur incompressible** (celle que commet encore $g^\star$, qui ne dépend que de la loi de $(\mathbf{X},Y)$ — la part de $Y$ que les attributs n'expliquent pas) + **distance** de $g$ à $g^\star$.
**Pièges / erreurs classiques :** l'unicité est **p.s. en $\mathbf{X}$** (on peut modifier $g^\star$ sur un ensemble $\mathbb{P}_{\mathbf{X}}$-négligeable) ; l'hypothèse $\mathbb{E}[Y^2]<\infty$ est indispensable ; ne pas oublier le cas $\mathbb{E}[g^2(\mathbf{X})]=\infty$. Le risque bayésien quadratique vaut $\mathbb{E}[(Y-\mathbb{E}[Y\mid\mathbf{X}])^2]$ (variance résiduelle, en général $>0$).

### Définition 1.5 — Fonction de régression
**Source :** Poly ch.8, Définition 1.5, p. 15
**Hypothèses :** classification binaire, $Y\in\{-1,1\}$.
**Énoncé :** la **fonction de régression** est la fonction mesurable $\eta:\mathsf{X}\to[0,1]$, **unique à l'égalité $\mathbb{P}$-p.s. près**, telle que
$$\eta(\mathbf{X})=\mathbb{P}(Y=1\mid\mathbf{X})=\mathbb{E}\big[\mathbb{1}_{\{Y=1\}}\,\big|\,\mathbf{X}\big].$$
**Preuve (étapes) (texte p. 15) :**
1. Existence et unicité : définition de l'espérance conditionnelle + **caractérisation des variables $\sigma(\mathbf{X})$-mesurables** (Prop. 2.1, lemme de Doob).
2. $0\le\eta\le1$ p.s. : **positivité de l'espérance conditionnelle** (Prop. 2.4 (iii)) appliquée à $\mathbb{1}_{\{Y=1\}}\ge0$ et à $1-\mathbb{1}_{\{Y=1\}}\ge0$ (détail implicite).
3. $\mathbb{E}[\mathbb{1}_{\{Y=-1\}}\mid\mathbf{X}]=1-\eta(\mathbf{X})$ (linéarité, $\mathbb{1}_{\{Y=-1\}}=1-\mathbb{1}_{\{Y=1\}}$).
**Intuition :** probabilité de la classe 1 à attributs donnés ; « la quantité qui gouverne tout » en classification binaire.
**Pièges :** malgré son nom, $\eta$ est une **probabilité conditionnelle**, à valeurs dans $[0,1]$ ; avec le codage $\{-1,1\}$, $\eta(\mathbf{X})\ne\mathbb{E}[Y\mid\mathbf{X}]$ (on a $\mathbb{E}[Y\mid\mathbf{X}]=2\eta(\mathbf{X})-1$ — remarque de l'extracteur) ; avec le codage $\{0,1\}$ (Prop. 4.1), $\eta(\mathbf{X})=\mathbb{E}[Y\mid\mathbf{X}]$.

### Théorème 1.2 — Classifieur bayésien et excès de risque
**Source :** Poly ch.8, Théorème 1.2, p. 15–16
**Hypothèses :** classification binaire $Y\in\{-1,1\}$, perte 0–1 ; $\eta$ fonction de régression ;
$$g^\star(\mathbf{x}):=2\,\mathbb{1}_{\{\eta(\mathbf{x})\ge1/2\}}-1=\begin{cases}1&\text{si }\eta(\mathbf{x})\ge1/2,\\-1&\text{sinon.}\end{cases}$$
**Énoncé :** pour tout classifieur mesurable $g:\mathbb{R}^d\to\{-1,1\}$,
$$\mathbb{E}[\ell_{01}(Y,g^\star(\mathbf{X}))]\le\mathbb{E}[\ell_{01}(Y,g(\mathbf{X}))],$$
c'est-à-dire $\mathbb{P}(g^\star(\mathbf{X})\neq Y)\le\mathbb{P}(g(\mathbf{X})\neq Y)$ : $g^\star$ est un **classifieur bayésien** pour la perte 0–1. L'**excès de risque** d'un classifieur $g$ vaut
$$R_{01}(g)-R_{01}(g^\star)=\mathbb{E}\Big[|2\eta(\mathbf{X})-1|\,\mathbb{1}_{\{g^\star(\mathbf{X})\neq g(\mathbf{X})\}}\Big],\tag{4}$$
et le **risque bayésien** vaut
$$R^\star_{01}=\mathbb{E}\big[\min\big(\eta(\mathbf{X}),1-\eta(\mathbf{X})\big)\big].\tag{5}$$
**Preuve (étapes) :**
1. *Lemme de décomposition* : on applique le **Lemme 2.2** à la fonction bornée $\psi_g(\mathbf{x},y):=\mathbb{1}_{\{g(\mathbf{x})\neq y\}}$. Comme $g$ est à valeurs dans $\{-1,1\}$ : $\psi_g(\mathbf{x},1)=\mathbb{1}_{\{g(\mathbf{x})=-1\}}$ et $\psi_g(\mathbf{x},-1)=\mathbb{1}_{\{g(\mathbf{x})=1\}}$. D'où
$$R_{01}(g)=\mathbb{E}\big[\mathbb{1}_{\{g(\mathbf{X})=-1\}}\,\eta(\mathbf{X})\big]+\mathbb{E}\big[\mathbb{1}_{\{g(\mathbf{X})=1\}}\,(1-\eta(\mathbf{X}))\big].$$
2. *Réécriture* : en remplaçant $\mathbb{1}_{\{g(\mathbf{X})=1\}}$ par $1-\mathbb{1}_{\{g(\mathbf{X})=-1\}}$,
$$R_{01}(g)=\mathbb{E}\big[\mathbb{1}_{\{g(\mathbf{X})=-1\}}\,(2\eta(\mathbf{X})-1)\big]+\mathbb{E}[1-\eta(\mathbf{X})].\tag{6}$$
3. *Différence de deux risques* : le second terme ne dépend pas de $g$, donc pour deux classifieurs $g_1,g_2$,
$$R_{01}(g_1)-R_{01}(g_2)=\mathbb{E}\Big[\big(\mathbb{1}_{\{g_1(\mathbf{X})=-1\}}-\mathbb{1}_{\{g_2(\mathbf{X})=-1\}}\big)(2\eta(\mathbf{X})-1)\Big].\tag{7}$$
4. *Étude de signe* : on applique (7) avec $g_1=g$, $g_2=g^\star$ et on pose $D:=\mathbb{1}_{\{g(\mathbf{X})=-1\}}-\mathbb{1}_{\{g^\star(\mathbf{X})=-1\}}\in\{-1,0,1\}$. Comme les deux classifieurs sont à valeurs dans $\{-1,1\}$, $D=0\iff g(\mathbf{X})=g^\star(\mathbf{X})$.
   - Si $D=1$ : $g(\mathbf{X})=-1$, $g^\star(\mathbf{X})=1$, donc $\eta(\mathbf{X})\ge1/2$ et $2\eta(\mathbf{X})-1\ge0$, d'où $D(2\eta(\mathbf{X})-1)=|2\eta(\mathbf{X})-1|$.
   - Si $D=-1$ : $g(\mathbf{X})=1$, $g^\star(\mathbf{X})=-1$, donc $\eta(\mathbf{X})<1/2$ et $2\eta(\mathbf{X})-1<0$, d'où $D(2\eta(\mathbf{X})-1)=-(2\eta(\mathbf{X})-1)=|2\eta(\mathbf{X})-1|$.
   
   Dans tous les cas $D(2\eta(\mathbf{X})-1)=|2\eta(\mathbf{X})-1|\,\mathbb{1}_{\{g(\mathbf{X})\neq g^\star(\mathbf{X})\}}\ge0$, ce qui donne (4) ; le membre de droite étant **positif**, $g^\star$ est optimal parmi les classifieurs mesurables, donc $R_{01}(g^\star)=R^\star_{01}$.
5. *Calcul du risque bayésien* : (6) appliqué à $g^\star$ avec $\mathbb{1}_{\{g^\star(\mathbf{X})=-1\}}=\mathbb{1}_{\{\eta(\mathbf{X})<1/2\}}$ donne (après simplification)
$$R_{01}(g^\star)=\mathbb{E}\big[\mathbb{1}_{\{\eta(\mathbf{X})<1/2\}}\,\eta(\mathbf{X})+\mathbb{1}_{\{\eta(\mathbf{X})\ge1/2\}}\,(1-\eta(\mathbf{X}))\big].$$
Or $\min(\eta,1-\eta)=\eta$ ssi $\eta\le1/2$, et les deux quantités coïncident pour $\eta=1/2$ : l'intégrande vaut $\min(\eta(\mathbf{X}),1-\eta(\mathbf{X}))$, d'où (5). □
**Intuition (encadré du poly) :** $g^\star$ retourne le **label le plus probable** : on prédit 1 lorsque $\eta(\mathbf{x})\ge1-\eta(\mathbf{x})$. Dans (4), **on ne paie que là où $g$ décide autrement que $g^\star$**, et le prix en un tel $\mathbf{x}$ est $|2\eta(\mathbf{x})-1|$ = écart entre probabilités des classes majoritaire et minoritaire : se tromper là où $\eta\approx1/2$ ne coûte presque rien, là où $\eta\approx0$ ou $1$ coûte cher. (5) : le risque incompressible est la **moyenne de la probabilité de la classe minoritaire** ; il est nul ssi $\eta(\mathbf{X})\in\{0,1\}$ p.s., i.e. lorsque les attributs **déterminent** la classe.
**Pièges / erreurs classiques :**
- Le seuil est $1/2$ **sur $\eta$** (probabilité), pas sur $\mathbf{x}$.
- (4) donne aussi $|R_{01}(g_1)-R_{01}(g_2)|\le\mathbb{E}\big[|2\eta(\mathbf{X})-1|\,\mathbb{1}_{\{g_1(\mathbf{X})\neq g_2(\mathbf{X})\}}\big]$ (exercice 2, conséquence de (7)).
- Bien distinguer $R^\star_{01}=\mathbb{E}[\min(\eta,1-\eta)]$ et $\min(\mathbb{E}[\eta],1-\mathbb{E}[\eta])=\min(p,1-p)$ (risque du meilleur classifieur **constant**) : par Jensen (fonction concave), $R^\star_{01}\le\min(p,1-p)$ (remarque de l'extracteur ; l'exercice 6 établit une majoration de ce type pour les règles à seuil).

### Remarque (§1.2, p. 16) — Non-unicité du classifieur bayésien
**Source :** Poly ch.8, encadré après la preuve du Th. 1.2, p. 16
**Énoncé :** le choix de l'inégalité large $\eta(\mathbf{x})\ge1/2$ est une **convention** : sur l'événement $\{\eta(\mathbf{X})=1/2\}$ les deux décisions ont le même risque conditionnel, et (4) montre que changer $g^\star$ sur cet événement ne change pas son risque (le facteur $|2\eta-1|$ y est nul). Le classifieur bayésien **n'est donc pas unique** en général.
**Pièges :** contraste avec le Th. 1.1 (unicité p.s. en régression quadratique).

### Remarque (§1.2, p. 16) — Cadre de l'explicitation en classification binaire
**Source :** Poly ch.8, « Explicitation de la règle bayésienne en classification binaire », p. 16
**Hypothèses :** $(\mathsf{X},\mathcal{X},\mu)=(\mathbb{R}^d,\mathcal{B}(\mathbb{R}^d),\mathrm{Leb})$, $(\mathsf{Y},\mathcal{Y},\nu)=(\{-1,1\},\mathcal{P}(\{-1,1\}),\mathrm{c})$, $\mathrm{c}=\delta_{\{-1\}}+\delta_{\{1\}}$ ; $\widetilde{\mathcal{B}\mathrm{er}}(p)$ = Bernoulli à valeurs dans $\{-1,1\}$, $\mathcal{L}(Y)=\widetilde{\mathcal{B}\mathrm{er}}(p)$ avec $p=\mathbb{P}(Y=1)$ ; **on suppose $p\in\,]0,1[$** (écarter les cas triviaux).
**Énoncé :** densité marginale des labels (par rapport à $\mathrm{c}$) :
$$y\longmapsto p_Y(y)=p\,\mathbb{1}_{\{1\}}(y)+(1-p)\,\mathbb{1}_{\{-1\}}(y).$$
Densités de classe :
$$q_1(\mathbf{x}):=q_{\mathbf{X}|Y}(\mathbf{x}\mid y=1),\qquad q_{-1}(\mathbf{x}):=q_{\mathbf{X}|Y}(\mathbf{x}\mid y=-1),$$
et, par la factorisation (2), densité jointe
$$p_{\mathbf{X},Y}(\mathbf{x},y)=p\,q_1(\mathbf{x})\,\mathbb{1}_{\{1\}}(y)+(1-p)\,q_{-1}(\mathbf{x})\,\mathbb{1}_{\{-1\}}(y).\tag{8}$$

### Proposition 1.2 — Loi marginale des attributs
**Source :** Poly ch.8, Proposition 1.2, p. 16
**Hypothèses :** cadre ci-dessus, densité jointe (8).
**Énoncé :** la loi des attributs admet la densité
$$p_{\mathbf{X}}(\mathbf{x})=\int_{\mathsf{Y}}p_{\mathbf{X},Y}(\mathbf{x},y)\,\mathrm{c}(\mathrm{d}y)=p\,q_1(\mathbf{x})+(1-p)\,q_{-1}(\mathbf{x}):$$
c'est un **mélange** des deux lois conditionnelles, de poids $p$ et $1-p$.
**Preuve (étapes) :** non rédigée dans le poly ; elle découle de (1) : l'intégrale contre la mesure de comptage $\mathrm{c}$ est la **somme des valeurs** en $y=1$ et $y=-1$ de (8).
**Intuition :** tirer une classe puis des attributs dans cette classe = tirer des attributs dans le mélange.

### Proposition 1.3 — Loi conditionnelle des labels sachant les attributs
**Source :** Poly ch.8, Proposition 1.3, p. 17
**Hypothèses :** $\mathbf{x}$ tel que $p_{\mathbf{X}}(\mathbf{x})>0$.
**Énoncé :**
$$\begin{cases}q_{Y|\mathbf{X}}(1\mid\mathbf{x})=\dfrac{p_{\mathbf{X},Y}(\mathbf{x},1)}{p_{\mathbf{X}}(\mathbf{x})}=\dfrac{p\,q_1(\mathbf{x})}{p\,q_1(\mathbf{x})+(1-p)\,q_{-1}(\mathbf{x})},\\[2ex]q_{Y|\mathbf{X}}(-1\mid\mathbf{x})=\dfrac{p_{\mathbf{X},Y}(\mathbf{x},-1)}{p_{\mathbf{X}}(\mathbf{x})}=\dfrac{(1-p)\,q_{-1}(\mathbf{x})}{p\,q_1(\mathbf{x})+(1-p)\,q_{-1}(\mathbf{x})}.\end{cases}$$
**Preuve (étapes) :** non rédigée ; application directe de (3), (8) et de la Prop. 1.2 (c'est la **formule de Bayes**).
**Intuition :** probabilité a posteriori de chaque classe = poids a priori × vraisemblance de classe, normalisé.

### Proposition 1.4 — Fonction de régression
**Source :** Poly ch.8, Proposition 1.4, p. 17
**Hypothèses :** $\mathbf{x}$ tel que $p_{\mathbf{X}}(\mathbf{x})>0$.
**Énoncé :**
$$\eta(\mathbf{x})=q_{Y|\mathbf{X}}(1\mid\mathbf{x})=\frac{p\,q_1(\mathbf{x})}{p\,q_1(\mathbf{x})+(1-p)\,q_{-1}(\mathbf{x})}=\frac{1}{1+\dfrac{(1-p)\,q_{-1}(\mathbf{x})}{p\,q_1(\mathbf{x})}},$$
la dernière écriture valant lorsque $q_1(\mathbf{x})>0$.
**Preuve (étapes) :**
1. L'expression de l'espérance conditionnelle dans le **cas à densité** (Prop. 2.6), appliquée à $\mathbb{1}_{\{Y=1\}}$, donne
$$\eta(\mathbf{X})=\mathbb{E}\big[\mathbb{1}_{\{Y=1\}}\,\big|\,\mathbf{X}\big]=\Big(\int_{\mathsf{Y}}\mathbb{1}_{\{y=1\}}\,q_{Y|\mathbf{X}}(y\mid\mathbf{x})\,\mathrm{c}(\mathrm{d}y)\Big)_{\mathbf{x}=\mathbf{X}}=q_{Y|\mathbf{X}}(1\mid\mathbf{X}).$$
2. On conclut par la **Prop. 1.3**.
3. L'ensemble $\{\mathbf{x}:p_{\mathbf{X}}(\mathbf{x})=0\}$ étant de probabilité nulle sous la loi de $\mathbf{X}$, cette identité détermine $\eta$ à l'égalité p.s. près. □
**Intuition :** $\eta$ ne dépend que du **rapport** $\frac{(1-p)q_{-1}}{p\,q_1}$.

### Remarque (§1.2, p. 17) — Forme explicite du classifieur bayésien, éq. (9)
**Source :** Poly ch.8, éq. (9), p. 17
**Hypothèses :** $p_{\mathbf{X}}(\mathbf{x})>0$.
**Énoncé :**
$$g^\star(\mathbf{x})=\begin{cases}1&\text{si et seulement si }p\,q_1(\mathbf{x})\ge(1-p)\,q_{-1}(\mathbf{x}),\\-1&\text{sinon.}\end{cases}\tag{9}$$
**Preuve (étapes) :** $p_{\mathbf{X}}(\mathbf{x})>0$, donc (multiplication par $2p_{\mathbf{X}}(\mathbf{x})>0$) $\eta(\mathbf{x})\ge1/2\iff2p\,q_1(\mathbf{x})\ge p\,q_1(\mathbf{x})+(1-p)\,q_{-1}(\mathbf{x})\iff p\,q_1(\mathbf{x})\ge(1-p)\,q_{-1}(\mathbf{x})$.
**Intuition :** comparer les deux densités **pondérées par les proportions** des classes ; ne fait intervenir que $q_1$, $q_{-1}$, $p$ (Figure 2, p. 18 : en dimension 1, $g^\star$ prédit la classe 1 là où la courbe $p\,q_1$ domine $(1-p)\,q_{-1}$, ce qui peut donner **plusieurs intervalles** alternés « Class −1 / Class 1 / Class −1 »).
**Pièges :** oublier les poids $p$, $1-p$ (comparer seulement $q_1$ et $q_{-1}$ n'est correct que si $p=1/2$).

### Exemple 1.6 — Taille et genre, suite
**Source :** Poly ch.8, Exemple 1.6, p. 17–18 (Figure 2, p. 18)
**Hypothèses :** $d=1$, $q_1=\mathcal{N}(\mu_1,\sigma^2)$, $q_{-1}=\mathcal{N}(\mu_{-1},\sigma^2)$ (même variance), $p=1/2$.
**Énoncé :** la condition $p\,q_1(x)\ge(1-p)\,q_{-1}(x)$ de (9) s'écrit $q_1(x)\ge q_{-1}(x)$, c'est-à-dire, après **passage au logarithme** et **simplification des termes en $x^2$**,
$$(\mu_1-\mu_{-1})\Big(x-\frac{\mu_1+\mu_{-1}}{2}\Big)\ge0.$$
Si $\mu_1>\mu_{-1}$, la règle bayésienne prédit la classe 1 **au-delà du point milieu** $(\mu_1+\mu_{-1})/2$ et la classe $-1$ en deçà. La frontière est un **seuil**, et ce seuil **se déplace dès que $p\neq1/2$ ou que les deux variances diffèrent**.
**Détail du calcul (étapes, explicitées par l'extracteur) :**
1. $\log q_1(x)-\log q_{-1}(x)=-\frac{(x-\mu_1)^2}{2\sigma^2}+\frac{(x-\mu_{-1})^2}{2\sigma^2}$ (constantes de normalisation identiques car même $\sigma$).
2. $(x-\mu_{-1})^2-(x-\mu_1)^2=2x(\mu_1-\mu_{-1})-(\mu_1^2-\mu_{-1}^2)=2(\mu_1-\mu_{-1})\big(x-\frac{\mu_1+\mu_{-1}}2\big)$ (les $x^2$ se simplifient).
3. Pour $p$ quelconque (non traité en formule par le poly) : $g^\star(x)=1\iff(\mu_1-\mu_{-1})\big(x-\frac{\mu_1+\mu_{-1}}2\big)\ge\sigma^2\log\frac{1-p}{p}$ ; le seuil se décale vers la classe la moins probable.
**Méthodes mobilisées :** formule (9), passage au log, simplification des carrés — c'est le cas $d=1$ de la LDA (Cadre 1.2).

### Remarque (« Bilan », p. 18) — La règle de Bayes n'est pas une fonction des observations ; double aléa
**Source :** Poly ch.8, « Bilan », p. 18
**Contenu :** $g^\star_{\ell,\mathbb{P}}$ est optimal pour $\mathbb{P}$ et $\ell$, mais le statisticien ne connaît pas la loi jointe : **$g^\star_{\ell,\mathbb{P}}$ n'est pas une fonction des observations**, et le risque bayésien est un objet **purement théorique**, auquel on se compare. On construit $\widehat g_n$ à partir de $\mathcal{D}_n$. Il faut alors gérer un **double aléa** : celui du couple $(\mathbf{X},Y)$ sur lequel la règle est **évaluée**, et celui de $\mathcal{D}_n$ à partir duquel elle est **construite** ; ils ne jouent pas le même rôle et ne se moyennent pas au même endroit (§1.3 et compléments §4.4).
**Renvois aux exercices :** exercice 1 (prédicteur bayésien pour une perte **asymétrique**), exercice 5 (calcul du prédicteur bayésien et de son risque sur une distribution particulière en dimension un).

### Méthode 1.1 — Règle par substitution
**Source :** Poly ch.8, Méthode 1.1, p. 18
**Hypothèses :** loi de $(\mathbf{X},Y)$ inconnue mais supposée dans un modèle paramétrique.
**Énoncé :**
1. **Modéliser** la loi de $(\mathbf{X},Y)$ par un modèle paramétrique $\{\mathbb{P}_\theta:\theta\in\Theta\}$.
2. **Calculer** le prédicteur bayésien $g^\star_\theta$ sous chacune des lois $\mathbb{P}_\theta$.
3. **Estimer** $\theta$ par $\hat\theta_n$ à partir de l'ensemble d'apprentissage $\mathcal{D}_n$.
4. **Choisir** la règle $\widehat g_n:=g^\star_{\hat\theta_n}$ (règle **par substitution**, ou ***plug-in***).

**Commentaire du poly :** l'étape 2 est un calcul exact sous une loi connue (§1.2) ; l'étape 3 relève des chapitres 2, 3 et 7. Reste à choisir la façon de modéliser la loi du couple ; la factorisation (2) en offre deux :
- modéliser $\mathbf{X}\mid Y$ et $Y$ : **approche générative** — analyse discriminante linéaire et quadratique, classifieur bayésien naïf ;
- modéliser $Y\mid\mathbf{X}$ et $\mathbf{X}$ : modèle logistique, modèle linéaire gaussien, algorithme des $k$ plus proches voisins.
**Intuition (encadré du poly, p. 19) :** l'approche générative décrit **comment les données sont produites** (tirer une classe, puis des attributs conformes) : information riche, parfois **trop riche pour être crédible en grande dimension**. La seconde ne modélise que ce dont la règle a besoin — la probabilité de la classe à attributs donnés — et **laisse la loi des attributs libre** : dans le modèle logistique et le modèle linéaire gaussien, la loi de $\mathbf{X}$ reste quelconque et n'intervient **ni dans la règle bayésienne ni dans l'estimation du paramètre**.
**Pièges :** le *plug-in* n'est garanti que si le modèle est **bien spécifié** (Prop. 1.5).

### Cadre 1.2 — Modèle de l'analyse discriminante
**Source :** Poly ch.8, Cadre 1.2, p. 19
**Hypothèses :** classification binaire ; paramètre $\theta=(p,\mu_1,\mu_{-1},\Sigma_1,\Sigma_{-1})$ avec $p\in\,]0,1[$, $\mu_i\in\mathbb{R}^d$ et $\Sigma_i\in\mathrm{S}_d^+$, l'ensemble des matrices de covariance $d\times d$ **inversibles**.
**Énoncé :**
$$\begin{cases}\mathcal{L}(Y)=\widetilde{\mathcal{B}\mathrm{er}}(p),\\ \text{pour }i\in\{-1,1\},\quad\mathcal{L}(\mathbf{X}\mid Y=i)=q_{i,\theta}\cdot\mathrm{Leb},\quad\text{avec}\quad q_{i,\theta}\cdot\mathrm{Leb}=\mathcal{N}(\mu_i,\Sigma_i).\end{cases}$$
La densité conditionnelle de la classe $i$ est
$$q_{i,\theta}(\mathbf{x})=\frac{1}{(2\pi)^{d/2}\sqrt{\det\Sigma_i}}\exp\Big(-\frac12(\mathbf{x}-\mu_i)^\top\Sigma_i^{-1}(\mathbf{x}-\mu_i)\Big).$$
**Commentaire du poly :** l'**inversibilité** est nécessaire : sans elle, la loi conditionnelle des attributs est portée par un sous-espace affine strict de $\mathbb{R}^d$ et n'admet pas de densité par rapport à Lebesgue (§2.8). Elle entraîne $q_{i,\theta}(\mathbf{x})>0$ pour tout $\mathbf{x}$, donc $p_{\mathbf{X}}(\mathbf{x})>0$ pour tout $\mathbf{x}$ : la fonction de régression est **définie partout**.
**Intuition :** chaque classe est un « nuage » gaussien ; approche générative.

### Remarque (§1.3, p. 19–20) — Deuxième étape : le prédicteur bayésien sous $\mathbb{P}_\theta$ ; LDA et QDA
**Source :** Poly ch.8, « Deuxième étape », éq. (10)–(11), p. 19–20
**Hypothèses :** Cadre 1.2.
**Énoncé :** d'après (9),
$$g^\star_\theta(\mathbf{x})=1\quad\text{si et seulement si}\quad p\,q_{1,\theta}(\mathbf{x})\ge(1-p)\,q_{-1,\theta}(\mathbf{x}).\tag{10}$$
Les deux membres étant **strictement positifs**, cette condition équivaut à $\phi_\theta(\mathbf{x})\ge0$, où
$$\begin{aligned}\phi_\theta(\mathbf{x})&:=\log\frac{p\,q_{1,\theta}(\mathbf{x})}{(1-p)\,q_{-1,\theta}(\mathbf{x})}\\&=\log\frac{p}{1-p}+\frac12\log\frac{\det\Sigma_{-1}}{\det\Sigma_1}-\frac12(\mathbf{x}-\mu_1)^\top\Sigma_1^{-1}(\mathbf{x}-\mu_1)+\frac12(\mathbf{x}-\mu_{-1})^\top\Sigma_{-1}^{-1}(\mathbf{x}-\mu_{-1}),\end{aligned}\tag{11}$$
et la Prop. 1.4 s'écrit $\eta_\theta(\mathbf{x})=\mathrm{sigm}(\phi_\theta(\mathbf{x}))$, où $\mathrm{sigm}:t\mapsto1/(1+e^{-t})$ (§2.9).
$\phi_\theta$ est un **polynôme de degré au plus deux** en $\mathbf{x}$, de terme de degré deux $-\frac12\mathbf{x}^\top(\Sigma_1^{-1}-\Sigma_{-1}^{-1})\mathbf{x}$. Deux cas :
- **$\Sigma_1=\Sigma_{-1}=\Sigma$** : ce terme disparaît et
$$\phi_\theta(\mathbf{x})=\mathbf{w}_\theta^\top\mathbf{x}+A_\theta,\qquad\mathbf{w}_\theta:=\Sigma^{-1}(\mu_1-\mu_{-1}),\qquad A_\theta:=\log\frac{p}{1-p}-\frac12\big(\mu_1^\top\Sigma^{-1}\mu_1-\mu_{-1}^\top\Sigma^{-1}\mu_{-1}\big).$$
La frontière $\{\mathbf{x}:\phi_\theta(\mathbf{x})=0\}$ est un **hyperplan affine** : **analyse discriminante linéaire** (LDA, *linear discriminant analysis*).
- **$\Sigma_1\neq\Sigma_{-1}$** : la frontière est une **quadrique** de $\mathbb{R}^d$ — ellipsoïde, paraboloïde ou hyperboloïde selon le signe des valeurs propres de $\Sigma_1^{-1}-\Sigma_{-1}^{-1}$ : **analyse discriminante quadratique** (QDA).
**Preuve (étapes) :**
1. *Passage au log* (strictement croissant ; membres $>0$) : (10) $\iff\phi_\theta(\mathbf{x})\ge0$.
2. *Calcul de (11)* : $\log q_{i,\theta}(\mathbf{x})=-\frac d2\log(2\pi)-\frac12\log\det\Sigma_i-\frac12(\mathbf{x}-\mu_i)^\top\Sigma_i^{-1}(\mathbf{x}-\mu_i)$ ; la différence pour $i=1$ et $i=-1$ fait disparaître $\frac d2\log(2\pi)$ et donne $\frac12\log\frac{\det\Sigma_{-1}}{\det\Sigma_1}$.
3. *Lien avec $\eta_\theta$* : $\eta_\theta=\frac{1}{1+\frac{(1-p)q_{-1,\theta}}{p\,q_{1,\theta}}}=\frac1{1+e^{-\phi_\theta}}=\mathrm{sigm}(\phi_\theta)$ (Prop. 1.4) ; $\phi_\theta$ est le **logit** de $\eta_\theta$ (§2.9).
4. *Cas LDA (détail de l'extracteur)* : par symétrie de $\Sigma^{-1}$, $-\frac12(\mathbf{x}-\mu_1)^\top\Sigma^{-1}(\mathbf{x}-\mu_1)+\frac12(\mathbf{x}-\mu_{-1})^\top\Sigma^{-1}(\mathbf{x}-\mu_{-1})=\mathbf{x}^\top\Sigma^{-1}(\mu_1-\mu_{-1})-\frac12(\mu_1^\top\Sigma^{-1}\mu_1-\mu_{-1}^\top\Sigma^{-1}\mu_{-1})$, et $\log\frac{\det\Sigma}{\det\Sigma}=0$.
**Intuition :** même covariance ⇒ les nuages ne diffèrent que par leur centre ⇒ frontière plane ; covariances différentes ⇒ frontière courbe.
**Pièges :** pour $d=1$ et $p=1/2$, la LDA redonne le seuil au milieu de l'Ex. 1.6 ; le terme $\log\frac p{1-p}$ décale la frontière parallèlement à elle-même.

### Remarque (§1.3, p. 20) — Troisième et quatrième étapes : estimation et substitution (LDA/QDA)
**Source :** Poly ch.8, p. 20 (Figures 3, 4 p. 20 ; Figure 5 p. 21)
**Énoncé :** $\theta$ est estimé par **maximum de vraisemblance** sur $\mathcal{D}_n$ : $\widehat p_n$ = proportion d'individus de la classe 1, $\widehat\mu_{i,n}$ = moyenne empirique des attributs de la classe $i$, $\widehat\Sigma_{i,n}$ = leur matrice de covariance empirique. Le calcul de cet estimateur et sa **consistance** font l'objet de l'**exercice 3**. La règle retenue est $\widehat g_n=g^\star_{\hat\theta_n}$ : il suffit de remplacer $\theta$ par $\hat\theta_n$ dans (11).
**Preuve (étapes) :** renvoyée à l'exercice 3 (non extrait).
**Figures :** Fig. 3 — LDA sur deux ensembles simulés : attributs colorés par classe ; moyennes et covariance commune estimées ; frontière de $g^\star_{\hat\theta_n}$ (une **droite**) et points mal classés marqués d'une croix. Fig. 4 — QDA sur les mêmes ensembles : chaque classe a sa covariance, frontière **du second degré**. Fig. 5 — LDA vs QDA sur un même ensemble (moyennes estimées marquées d'une étoile, frontière en gris, mal classés en croix) ; figure de l'exercice 3.
**Méthodes mobilisées :** EMV (ch.2), *plug-in* (Méthode 1.1).

### Cadre 1.3 — Modèle logistique
**Source :** Poly ch.8, Cadre 1.3, p. 21
**Hypothèses :** classification binaire $Y\in\{-1,1\}$ ; paramètre $\theta\in\mathbb{R}^d$.
**Énoncé :**
$$\begin{cases}\mathcal{L}(Y\mid\mathbf{X})=\widetilde{\mathcal{B}\mathrm{er}}\big(\mathrm{sigm}(\theta^\top\mathbf{X})\big),\\ \mathcal{L}(\mathbf{X})\ \text{quelconque},\end{cases}\qquad\text{où}\quad\mathrm{sigm}(t)=\frac{1}{1+e^{-t}}.$$
**Conséquences (texte p. 21) :**
1. *Règle bayésienne* : la fonction de régression est donnée par le modèle, $\eta_\theta(\mathbf{X})=\mathbb{P}_\theta(Y=1\mid\mathbf{X})=\mathrm{sigm}(\theta^\top\mathbf{X})$. Comme $\mathrm{sigm}$ est **croissante** et vaut $1/2$ en 0, $\mathrm{sigm}(\theta^\top\mathbf{X})\ge1/2\iff\theta^\top\mathbf{X}\ge0$, donc
$$g^\star_\theta(\mathbf{X})=1\quad\text{si et seulement si}\quad\theta^\top\mathbf{X}\ge0:$$
la règle bayésienne du modèle est une **règle de séparation linéaire**.
2. *Estimation* par **maximum de vraisemblance** : la loi de $\mathbf{X}$ ne dépendant pas de $\theta$, elle **se factorise** dans la vraisemblance et seule la partie conditionnelle contribue ; de plus $1-\mathrm{sigm}(t)=\mathrm{sigm}(-t)$, donc $\mathbb{P}_\theta(Y=y\mid\mathbf{X})=\mathrm{sigm}(y\,\theta^\top\mathbf{X})$ pour $y\in\{-1,1\}$. L'opposé de la log-vraisemblance conditionnelle normalisée vaut $n^{-1}\sum_{i=1}^n\log(1+\exp(-Y_i\theta^\top\mathbf{X}_i))$ et
$$\widehat\theta_{\mathrm{MLE},n}=\arg\min_{\theta\in\mathbb{R}^d}\frac1n\sum_{i=1}^n\log\big(1+\exp(-Y_i\,\theta^\top\mathbf{X}_i)\big).\tag{12}$$
3. *Règle retenue* : $\widehat g_n=g^\star_{\widehat\theta_{\mathrm{MLE},n}}$, i.e.
$$\widehat g_n(\mathbf{X})=2\,\mathbb{1}_{\{\widehat\theta_{\mathrm{MLE},n}^\top\mathbf{X}\ge0\}}-1.$$
4. *Lien avec l'approche discriminative* : le critère (12) revient à employer la **perte logistique** $\ell_{\log}(y,t)=\log(1+e^{-yt})$ sur la **classe des fonctions linéaires** $\mathbf{x}\mapsto\theta^\top\mathbf{x}$ : la démarche par modélisation rejoint celle qui choisit d'emblée une perte et une classe de fonctions.
**Preuve (étapes) — calcul de la vraisemblance (détail de l'extracteur, conforme au texte) :**
1. Vraisemblance de $\mathcal{D}_n$ : $\prod_{i=1}^n p_{\mathbf{X}}(\mathbf{X}_i)\,\mathrm{sigm}(Y_i\theta^\top\mathbf{X}_i)$ (indépendance des paires ; factorisation (2) ; $p_{\mathbf{X}}$ ne dépend pas de $\theta$).
2. $-\frac1n\log(\cdot)=-\frac1n\sum\log p_{\mathbf{X}}(\mathbf{X}_i)+\frac1n\sum\log(1+e^{-Y_i\theta^\top\mathbf{X}_i})$, car $-\log\mathrm{sigm}(t)=\log(1+e^{-t})$ ; le premier terme est constant en $\theta$.
**Intuition :** on modélise directement $\eta$ par une sigmoïde d'une forme linéaire (Ex. 1.4) ; la loi de $\mathbf{X}$ est laissée libre.
**Pièges / erreurs classiques :** pas d'ordonnée à l'origine explicite : pour l'obtenir, on inclut une coordonnée constante dans $\mathbf{X}$ (remarque de l'extracteur ; comparer $\mathbf{x}:=(1,x^{(1)},\dots,x^{(d)})^\top$ en §4.8). L'$\arg\min$ de (12) n'a pas de forme close et peut ne pas exister si les données sont linéairement séparables (remarque de l'extracteur, non traitée dans le poly).

### Cadre 1.4 — Modèle linéaire gaussien homoscédastique
**Source :** Poly ch.8, Cadre 1.4, p. 22
**Hypothèses :** régression ; paramètre $\theta\in\mathbb{R}^d$ ; variance $\sigma^2>0$ **fixée** (connue).
**Énoncé :**
$$\begin{cases}\mathcal{L}(Y\mid\mathbf{X})=\mathcal{N}\big(\theta^\top\mathbf{X},\sigma^2\big),\\ \mathcal{L}(\mathbf{X})\ \text{quelconque}.\end{cases}$$
**Conséquences (texte p. 22) :**
1. *Règle bayésienne* : le **Th. 1.1** donne $g^\star_\theta(\mathbf{X})=\mathbb{E}_\theta[Y\mid\mathbf{X}]=\theta^\top\mathbf{X}$ : prédicteur bayésien **linéaire**.
2. *Estimation* par **maximum de vraisemblance** : la loi de $\mathbf{X}$ ne dépendant pas de $\theta$ et la densité conditionnelle étant gaussienne de variance connue,
$$\widehat\theta_{\mathrm{MLE},n}=\arg\min_{\theta\in\mathbb{R}^d}\frac1n\sum_{i=1}^n\big(\theta^\top\mathbf{X}_i-Y_i\big)^2,$$
et la règle retenue est $\widehat g_n(\mathbf{X})=\widehat\theta_{\mathrm{MLE},n}^\top\mathbf{X}$.
3. On retrouve l'**estimateur des moindres carrés** (ch.2, ex. 1.15) ; comme pour le modèle logistique, la démarche revient à employer la **perte des moindres carrés sur la classe des fonctions linéaires**.
**Preuve (étapes) — détail de l'extracteur :** log-vraisemblance conditionnelle $=-\frac n2\log(2\pi\sigma^2)-\frac1{2\sigma^2}\sum_i(Y_i-\theta^\top\mathbf{X}_i)^2$ (+ terme en $p_{\mathbf{X}}$ indépendant de $\theta$) ; $\sigma^2$ étant fixé, maximiser revient à minimiser la somme des carrés.
**Intuition :** EMV gaussien ⇔ moindres carrés.
**Pièges :** « homoscédastique » = même variance $\sigma^2$ quel que soit $\mathbf{X}$.

### Remarque (§1.3, p. 22) — Ce que l'approche par modélisation garantit ; probabilité d'erreur conditionnelle
**Source :** Poly ch.8, « Ce que l'approche par modélisation garantit », p. 22
**Contenu :** l'approche par modélisation (LDA, QDA, Bayes naïf, $k$-PPV) est de type **statistique** : on obtient des résultats **sous l'hypothèse de modélisation**. Notation : $R_{01}(g)$ risque d'une règle **fixée** ; pour une règle construite sur $\mathcal{D}_n$,
$$R_{01}(\widehat g_n):=\mathbb{P}\big(\widehat g_n(\mathbf{X})\neq Y\,\big|\,\mathcal{D}_n\big),$$
la **probabilité d'erreur conditionnelle**, où $(\mathbf{X},Y)$ est un couple **indépendant de $\mathcal{D}_n$ et de même loi** ; c'est une **variable aléatoire, fonction de $\mathcal{D}_n$** (cf. §4.4).
**Pièges :** $R_{01}(\widehat g_n)$ n'est pas un nombre mais une v.a. ; ne pas confondre avec le risque moyen $\mathbb{E}[R_{01}(\widehat g_n)]$.

### Proposition 1.5 — Risque d'une règle par substitution
**Source :** Poly ch.8, Proposition 1.5, p. 22–23
**Hypothèses :** $\{\mathbb{P}_\theta:\theta\in\Theta\}$ modèle de classification binaire, $\theta^\star\in\Theta$ ;
- **(i)** le modèle est **bien spécifié** : la loi de $(\mathbf{X},Y)$ et celle des $n$ paires de $\mathcal{D}_n$ sont données par $\mathbb{P}_{\theta^\star}$ ; $\mathbb{E}_{n,\theta^\star}$ = espérance sous la loi de $\mathcal{D}_n$ ;
- **(ii)** $\eta_\theta$ désigne la fonction de régression sous $\mathbb{P}_\theta$ et $g^\star_\theta:=2\,\mathbb{1}_{\{\eta_\theta\ge1/2\}}-1$ la règle bayésienne associée ;
- **(iii)** l'estimateur $\hat\theta_n$, construit sur $\mathcal{D}_n$, vérifie
$$\eta_{\hat\theta_n}(\mathbf{x})-\eta_{\theta^\star}(\mathbf{x})\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}0\quad\text{pour }p_{\mathbf{X}}\cdot\mu\text{-presque tout }\mathbf{x}\in\mathsf{X}.$$
**Énoncé :** la règle par substitution $\widehat g_n:=g^\star_{\hat\theta_n}$ vérifie
$$\lim_{n\to\infty}\mathbb{E}_{n,\theta^\star}\big[R_{01}(\widehat g_n)-R_{01}(g^\star_{\theta^\star})\big]=0.$$
**Preuve (étapes) :**
1. *Majoration (13)* (exercice 7, redémontrée en §4.7 = Prop. 4.2) : pour toute fonction mesurable $\tilde\eta:\mathsf{X}\to[0,1]$ et la règle associée $\tilde g:=2\,\mathbb{1}_{\{\tilde\eta\ge1/2\}}-1$,
$$R_{01}(\tilde g)-R_{01}(g^\star_{\theta^\star})\le2\,\mathbb{E}\big[|\eta_{\theta^\star}(\mathbf{X})-\tilde\eta(\mathbf{X})|\big],\tag{13}$$
l'espérance portant sur le **seul couple de test** $(\mathbf{X},Y)$.
2. *Application à $\mathcal{D}_n$ fixé* : avec $\tilde\eta=\eta_{\hat\theta_n}$, et compte tenu de l'**indépendance** de $(\mathbf{X},Y)$ et de $\mathcal{D}_n$ (Prop. 2.5),
$$0\le R_{01}(\widehat g_n)-R_{01}(g^\star_{\theta^\star})\le2\int_{\mathsf{X}}\big|\eta_{\theta^\star}(\mathbf{x})-\eta_{\hat\theta_n}(\mathbf{x})\big|\,p_{\mathbf{X}}(\mathbf{x})\,\mu(\mathrm{d}\mathbf{x})$$
(positivité : $g^\star_{\theta^\star}$ est bayésienne sous $\mathbb{P}_{\theta^\star}$, Th. 1.2).
3. *Espérance sous la loi de $\mathcal{D}_n$ et interversion* (licite pour un intégrande **positif** : **Fubini-Tonelli**) :
$$0\le\mathbb{E}_{n,\theta^\star}\big[R_{01}(\widehat g_n)-R_{01}(g^\star_{\theta^\star})\big]\le2\int_{\mathsf{X}}\mathbb{E}_{n,\theta^\star}\Big[\big|\eta_{\theta^\star}(\mathbf{x})-\eta_{\hat\theta_n}(\mathbf{x})\big|\Big]\,p_{\mathbf{X}}(\mathbf{x})\,\mu(\mathrm{d}\mathbf{x}).$$
4. *Convergence ponctuelle* : fixons $\mathbf{x}$ hors de l'ensemble négligeable de (iii). La suite $|\eta_{\theta^\star}(\mathbf{x})-\eta_{\hat\theta_n}(\mathbf{x})|$ converge vers 0 en probabilité sous $\mathbb{P}_{n,\theta^\star}$ et est **majorée par 1** (fonctions de régression à valeurs dans $[0,1]$) ; le **théorème de convergence dominée pour la convergence en probabilité** donne $\mathbb{E}_{n,\theta^\star}\big[|\eta_{\theta^\star}(\mathbf{x})-\eta_{\hat\theta_n}(\mathbf{x})|\big]\to0$.
5. *Intégration en $\mathbf{x}$* : chacune de ces espérances est majorée par 1 et $p_{\mathbf{X}}\cdot\mu$ est une **probabilité** ; une **seconde convergence dominée**, en la variable $\mathbf{x}$, montre que l'intégrale tend vers zéro. □
**Intuition :** l'excès de risque est contrôlé par l'erreur d'estimation de $\eta$ en norme $L^1(p_{\mathbf{X}}\cdot\mu)$ ; si $\hat\theta_n$ est consistant et $\theta\mapsto\eta_\theta(\mathbf{x})$ continu, (iii) est satisfaite (cas de l'analyse discriminante, exercice 3, avec la consistance de l'EMV du ch.7).
**Pièges / erreurs classiques (deux avertissements du poly, p. 23) :**
1. La conclusion ne tient que si l'**hypothèse de modélisation (i)** est vérifiée. Si le modèle est **mal spécifié**, $\eta_{\hat\theta_n}$ ne converge pas vers la vraie fonction de régression et l'excès de risque de $\widehat g_n$ **ne tend pas vers zéro**.
2. La quantité qui tend vers zéro est une moyenne prise sous **deux aléas distincts** : celui d'un point de test (à l'intérieur de $R_{01}(\widehat g_n)-R_{01}(g^\star_{\theta^\star})$) et celui de l'ensemble d'apprentissage (par $\mathbb{E}_{n,\theta^\star}$) — le **double aléa** de la §1.2.

**Résumé du poly :** « si le modèle est bon, la méthode est bonne ». En pratique il est parfois difficile de disposer d'un modèle raisonnable pour la loi de $(\mathbf{X},Y)$, ce qui conduit à l'**approche discriminative** (ch.9–10) : on renonce à modéliser la loi et on choisit directement une classe de règles et une perte. Ce résultat typique est le sujet de l'exercice 2 ; sa mise en œuvre complète sur l'analyse discriminante, celui de l'exercice 3.
**Méthodes mobilisées :** majoration (13), indépendance test/apprentissage, Fubini-Tonelli, convergence dominée (deux fois).

### Remarque (§1.4, p. 23–24) — Le programme des exercices
**Source :** Poly ch.8, §1.4, p. 23–24
**Contenu :** la feuille comporte **sept exercices** (détaillés en §4 ci-dessous).

### Synthèse (ajout de l'extracteur, non présente telle quelle dans le poly) — Carte des résultats du §1
| Situation | Perte | Règle bayésienne $g^\star$ | Risque bayésien / excès | Référence |
|---|---|---|---|---|
| Général (densité) | $\ell$ quelconque | minimiser le risque conditionnel en chaque $\mathbf{x}$ | $R=\int R(g,\mathbf{x})\,p_{\mathbf{X}}\,\mathrm{d}\mu$ | Prop. 1.1 |
| Régression | $\ell_2$ | $\mathbb{E}[Y\mid\mathbf{X}]$ | Pythagore : excès $=\mathbb{E}[(g^\star-g)^2(\mathbf{X})]$ | Th. 1.1 |
| Binaire $\{-1,1\}$ | $\ell_{01}$ | $2\,\mathbb{1}_{\{\eta\ge1/2\}}-1$ | $R^\star_{01}=\mathbb{E}[\min(\eta,1-\eta)]$ ; excès $=\mathbb{E}[\vert 2\eta-1\vert \mathbb{1}_{\{g\ne g^\star\}}]$ | Th. 1.2 |
| Binaire, densités de classe | $\ell_{01}$ | $p\,q_1\ge(1-p)\,q_{-1}$ | — | (9), Prop. 1.4 |
| LDA ($\Sigma_1=\Sigma_{-1}$) | $\ell_{01}$ | $\mathbf{w}_\theta^\top\mathbf{x}+A_\theta\ge0$ | — | (11) |
| QDA | $\ell_{01}$ | $\phi_\theta(\mathbf{x})\ge0$ (quadrique) | — | (11) |
| Logistique | $\ell_{01}$ | $\theta^\top\mathbf{x}\ge0$ | EMV = perte logistique (12) | Cadre 1.3 |
| Linéaire gaussien | $\ell_2$ | $\theta^\top\mathbf{x}$ | EMV = moindres carrés | Cadre 1.4 |
| *Plug-in* bien spécifié | $\ell_{01}$ | $g^\star_{\hat\theta_n}$ | $\mathbb{E}_{n,\theta^\star}[\text{excès}]\to0$ | Prop. 1.5 |

---

## 3. Outils mathématiques

> Poly ch.8, §2 « Les outils mathématiques », p. 25–32. Les six premières sections reprennent les douze planches de « Rappels sur l'espérance conditionnelle » (annexe du cours : espace $\mathrm{L}^2$ et projection, cas d'une sous-tribu, cas $L^1$, conditionnement par une v.a., propriétés, variables à densité), complétées par les démonstrations, les propriétés élémentaires, la propriété d'indépendance et le lemme de décomposition. Viennent ensuite la mesure de comptage, la densité gaussienne et la sigmoïde. **Ces outils sont au programme** (ils servent aux preuves des Th. 1.1, 1.2, Prop. 1.1, 1.4, 1.5).

### Remarque (§2, p. 25) — Plan et esprit
**Source :** Poly ch.8, Outils, introduction de §2, p. 25
**Contenu :** l'espérance conditionnelle d'une variable de carré intégrable se définit comme une **projection orthogonale dans un espace de Hilbert** ; c'est sous cette forme géométrique que ses propriétés s'établissent le plus simplement ; la définition s'étend aux variables **intégrables** ; dans le cas à densité elle devient une **intégrale ordinaire contre la densité conditionnelle** (forme utilisée dans tous les calculs du chapitre).

### Définition 2.1 — Espace $\mathcal{L}^2(\Omega,\mathcal{F},\mathbb{P})$
**Source :** Poly ch.8, Outils, Définition 2.1, p. 25
**Hypothèses :** $(\Omega,\mathcal{F},\mathbb{P})$ espace de probabilité.
**Énoncé :** $\mathcal{L}^2(\Omega,\mathcal{F},\mathbb{P})$ est l'espace des variables aléatoires de carré intégrable :
$$Z\in\mathcal{L}^2(\Omega,\mathcal{F},\mathbb{P})\iff\mathbb{E}[Z^2]<\infty.$$
La forme $\langle Z_1,Z_2\rangle:=\mathbb{E}[Z_1Z_2]$ y définit un **produit pré-hilbertien** : bilinéaire et positive, mais $\langle Z,Z\rangle=0$ entraîne seulement $Z=0$ $\mathbb{P}$-p.s., et non $Z\equiv0$.
**Preuve (étapes) :** non rédigée (bilinéarité : linéarité de l'espérance ; finitude de $\mathbb{E}[Z_1Z_2]$ : $|Z_1Z_2|\le\frac12(Z_1^2+Z_2^2)$ — détail implicite).
**Intuition :** pour obtenir un vrai produit scalaire il faut identifier les variables égales p.s.

### Remarque (§2.1, p. 25) — Relation d'équivalence $\mathcal{R}$
**Source :** Poly ch.8, Outils, p. 25
**Énoncé :** $X\,\mathcal{R}\,Y$ si et seulement si $X=Y$ $\mathbb{P}$-p.s. ; on quotiente par $\mathcal{R}$ pour obtenir un produit scalaire au sens strict.

### Définition 2.2 — Espace $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$
**Source :** Poly ch.8, Outils, Définition 2.2, p. 25
**Énoncé :** $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$ est le quotient de $\mathcal{L}^2(\Omega,\mathcal{F},\mathbb{P})$ par $\mathcal{R}$. Ses éléments sont des classes d'équivalence $\dot X$, et $Z\in\dot X$ ssi $Z=X$ $\mathbb{P}$-p.s. Si $\widetilde X\in\dot X$ et $\widetilde Y\in\dot Y$, alors $\langle\widetilde X,\widetilde Y\rangle=\langle X,Y\rangle$ ; on pose donc
$$\big\langle\dot X,\dot Y\big\rangle:=\big\langle\widetilde X,\widetilde Y\big\rangle,\qquad\widetilde X\in\dot X,\quad\widetilde Y\in\dot Y,$$
définition qui ne dépend pas du choix des représentants.
**Preuve (étapes) :** indépendance vis-à-vis des représentants : si $\widetilde X=X$ et $\widetilde Y=Y$ p.s., alors $\widetilde X\widetilde Y=XY$ p.s., donc mêmes espérances (implicite).
**Notation (p. 26) :** $\|\dot X\|^2_{\mathrm{L}^2}:=\langle\dot X,\dot X\rangle$ ; « conformément à l'usage, on confond une variable aléatoire et sa classe d'équivalence, toutes les identités étant entendues $\mathbb{P}$-p.s. »

### Théorème 2.1 — L'espace $\mathrm{L}^2$ est hilbertien
**Source :** Poly ch.8, Outils, Théorème 2.1, p. 25
**Énoncé :** $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$ muni du produit scalaire $\langle\cdot,\cdot\rangle$ est un **espace de Hilbert**.
**Preuve (étapes) :** **admise** (complétude, relève de la théorie de la mesure ; §2.11).
**Pièges :** ne pas confondre avec le « Théorème et définition 2.1 » (espérance conditionnelle dans $L^1$), que le poly appelle aussi « théorème 2.1 » dans la preuve de la Prop. 2.3.

### Théorème 2.2 — Projection sur un sous-espace vectoriel fermé
**Source :** Poly ch.8, Outils, Théorème 2.2, p. 26 (Figure 6)
**Hypothèses :** $\mathcal{H}$ sous-espace vectoriel **fermé** de $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$, $Z\in\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$.
**Énoncé :**
- **(i)** Il existe un unique élément de $\mathcal{H}$, appelé **projection** de $Z$ sur $\mathcal{H}$ et noté $P_{\mathcal{H}}Z$, tel que
$$\|Z-P_{\mathcal{H}}Z\|^2_{\mathrm{L}^2}\le\|Z-T\|^2_{\mathrm{L}^2}\qquad\text{pour tout }T\in\mathcal{H}.$$
- **(ii)** Cette projection est **caractérisée** par la relation d'**orthogonalité**
$$\langle Z-P_{\mathcal{H}}Z,T\rangle=0\qquad\text{pour tout }T\in\mathcal{H}.$$
- **(iii)** L'application $P_{\mathcal{H}}$ est un **opérateur linéaire** sur $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$.
**Preuve (étapes) :** **admise** (théorème de projection dans un Hilbert ; §2.11).
**Intuition (encadré du poly) :** (ii) est la traduction de **Pythagore** en dimension quelconque : le vecteur joignant $Z$ à son approximation la plus proche dans $\mathcal{H}$ est perpendiculaire à $\mathcal{H}$ (Figure 6). C'est **cette relation d'orthogonalité, et non l'inégalité (i), qui sert dans les calculs** : elle transforme une propriété de minimalité en une famille d'égalités $\mathbb{E}[(Z-P_{\mathcal{H}}Z)\,T]=0$, utilisable terme à terme.

### Lemme 2.1 — Fermeture de $\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$
**Source :** Poly ch.8, Outils, Lemme 2.1, p. 26
**Hypothèses :** $\mathcal{A}\subset\mathcal{F}$ une $\sigma$-algèbre ; $\mathcal{H}:=\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$ l'ensemble des v.a. $W$ de carré intégrable **$\mathcal{A}$-mesurables**, i.e. $W^{-1}(B)\in\mathcal{A}$ pour tout $B\in\mathcal{B}(\mathbb{R})$.
**Énoncé :** $\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$ est un **sous-espace hilbertien fermé** de $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$.
**Preuve (étapes) :** **admise** (§2.11).
**Conséquence (p. 26–27) :** pour tout $Z\in\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$, il existe une unique $X\in\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$ telle que $\|Z-X\|_{\mathrm{L}^2}\le\|Z-T\|_{\mathrm{L}^2}$ pour tout $T\in\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$, ou, de façon équivalente, telle que pour tout $T\in\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$,
$$\langle Z,T\rangle=\langle X,T\rangle,\qquad\text{c'est-à-dire}\qquad\mathbb{E}[Z\,T]=\mathbb{E}[X\,T].\tag{14}$$

### Définition 2.3 — Espérance conditionnelle comme projection dans $\mathrm{L}^2$
**Source :** Poly ch.8, Outils, Définition 2.3, p. 27
**Hypothèses :** $Z\in\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$, $\mathcal{A}\subset\mathcal{F}$ sous-tribu.
**Énoncé :** on appelle **espérance conditionnelle de $Z$ sachant $\mathcal{A}$**, notée $\mathbb{E}[Z\mid\mathcal{A}]$, la projection orthogonale de $Z$ sur $\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$.
**Intuition :** meilleure approximation quadratique de $Z$ par une variable « connue quand on connaît $\mathcal{A}$ ».
**Pièges :** elle est caractérisée par (14) : $\mathbb{E}[ZT]=\mathbb{E}[\mathbb{E}[Z\mid\mathcal{A}]\,T]$ pour tout $T$ $\mathcal{A}$-mesurable de carré intégrable.

### Théorème et définition 2.1 — Espérance conditionnelle sachant une sous-tribu (cas $L^1$)
**Source :** Poly ch.8, Outils, Théorème et définition 2.1, p. 27 (§2.2 « L'espérance conditionnelle dans $L^1$ »)
**Hypothèses :** $Z\in\mathcal{L}^1(\Omega,\mathcal{F},\mathbb{P})$, $\mathcal{A}\subset\mathcal{F}$ une $\sigma$-algèbre.
**Énoncé :** il existe une v.a. $X$, **unique à l'égalité $\mathbb{P}$-p.s. près**, telle que
- **(i)** $X$ est $\mathcal{A}$-mesurable ;
- **(ii)** $\mathbb{E}[|X|]<\infty$ ;
- **(iii)** pour toute v.a. $T$ $\mathcal{A}$-mesurable et **bornée**, $\mathbb{E}[ZT]=\mathbb{E}[XT]$.

$X$ est appelée espérance conditionnelle de $Z$ sachant $\mathcal{A}$, notée $\mathbb{E}[Z\mid\mathcal{A}]$. Lorsque $Z$ est de carré intégrable, elle **coïncide** avec la projection de la Déf. 2.3.
**Preuve (étapes) :** **admise** (argument de classe monotone ou théorème de Radon-Nikodym ; référence : Billingsley, *Probability and Measure*, ch. 34 ; §2.11).
**Intuition :** on remplace l'argument de projection (qui exige un moment d'ordre 2) par une caractérisation par les tests $T$ bornés.
**Pièges :** dans le cas $L^1$, les fonctions tests $T$ doivent être **bornées** (et non seulement de carré intégrable).

### Remarque (§2.3, p. 27) — Tribu engendrée par une variable aléatoire
**Source :** Poly ch.8, Outils, §2.3, p. 27
**Énoncé :** si $X$ est réelle, $\sigma(X)$ est la $\sigma$-algèbre engendrée par les événements $\{X\le a\}$ ; elle contient tous les $\{X\in B\}$, $B\in\mathcal{B}(\mathbb{R})$. Si $\mathbf{X}=(X^{(1)},\dots,X^{(d)})$ est à valeurs dans $\mathbb{R}^d$, $\sigma(\mathbf{X})$ est engendrée par les $\{\mathbf{X}\in B\}$, $B\in\mathcal{B}(\mathbb{R}^d)$ ; de façon équivalente,
$$\sigma(\mathbf{X}):=\big\{A\subset\Omega:\ A=\mathbf{X}^{-1}(B)\ \text{pour un}\ B\in\mathcal{B}(\mathbb{R}^d)\big\}.$$

### Définition 2.4 — Espérance conditionnelle sachant une variable aléatoire
**Source :** Poly ch.8, Outils, Définition 2.4, p. 27
**Hypothèses :** $Z\in\mathcal{L}^1(\Omega,\mathcal{F},\mathbb{P})$, $\mathbf{X}$ v.a. à valeurs dans $(\mathsf{X},\mathcal{X})$.
**Énoncé :** l'espérance conditionnelle de $Z$ sachant $\mathbf{X}$ est l'espérance conditionnelle de $Z$ sachant $\sigma(\mathbf{X})$ ; on la note $\mathbb{E}[Z\mid\mathbf{X}]$.

### Proposition 2.1 — Caractérisation des variables $\sigma(\mathbf{X})$-mesurables (lemme de Doob)
**Source :** Poly ch.8, Outils, Proposition 2.1, p. 27
**Hypothèses :** $\mathbf{X}$ v.a. à valeurs dans $(\mathsf{X},\mathcal{X})$ définie sur $(\Omega,\mathcal{F},\mathbb{P})$ ; $W$ v.a. réelle sur $(\Omega,\mathcal{F},\mathbb{P})$.
**Énoncé :** $W$ est mesurable par rapport à $\sigma(\mathbf{X})$ **si et seulement s'il existe** une fonction mesurable $\Psi:\mathsf{X}\to\mathbb{R}$ telle que $W=\Psi(\mathbf{X})$.
**Preuve (étapes) :** **admise** (« lemme de Doob », §2.11).
**Intuition :** être connu dès que $\mathbf{X}$ est connu = être une fonction de $\mathbf{X}$.

### Remarque (§2.3, p. 28) — Deux conséquences : le Th. 1.1 en une ligne
**Source :** Poly ch.8, Outils, p. 28
**Énoncé :**
1. Si $Y\in\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$, la définition de $\mathbb{E}[Y\mid\mathbf{X}]$ comme projection donne
$$\mathbb{E}\big[(Y-\mathbb{E}[Y\mid\mathbf{X}])^2\big]\le\mathbb{E}\big[(Y-T)^2\big]\qquad\text{pour tout }T\in\mathrm{L}^2(\Omega,\sigma(\mathbf{X}),\mathbb{P}),$$
et la Prop. 2.1 fournit $g^\star$ mesurable avec $g^\star(\mathbf{X})=\mathbb{E}[Y\mid\mathbf{X}]$.
2. La Prop. 2.1 identifie $\mathrm{L}^2(\Omega,\sigma(\mathbf{X}),\mathbb{P})$ à l'ensemble des $g(\mathbf{X})$, $g$ mesurable avec $\mathbb{E}[g^2(\mathbf{X})]<\infty$, de sorte que
$$\mathbb{E}\big[(Y-g^\star(\mathbf{X}))^2\big]\le\mathbb{E}\big[(Y-g(\mathbf{X}))^2\big]\qquad\text{et}\qquad\mathbb{E}[Y\,g(\mathbf{X})]=\mathbb{E}[g^\star(\mathbf{X})\,g(\mathbf{X})]$$
pour toute $g$ mesurable avec $\mathbb{E}[g^2(\mathbf{X})]<\infty$ : **c'est l'énoncé du Th. 1.1**.

### Proposition 2.2 — Espérance de l'espérance conditionnelle
**Source :** Poly ch.8, Outils, Proposition 2.2, p. 28
**Hypothèses :** $Y$ intégrable, $\mathcal{A}\subset\mathcal{F}$ sous-tribu.
**Énoncé :**
$$\mathbb{E}\big[\mathbb{E}[Y\mid\mathcal{A}]\big]=\mathbb{E}[Y].$$
**Preuve (étapes) :**
1. Pour toute $W$ $\mathcal{A}$-mesurable bornée, $\mathbb{E}[W\,\mathbb{E}[Y\mid\mathcal{A}]]=\mathbb{E}[WY]$ (**définition** de l'espérance conditionnelle, Th.-déf. 2.1 (iii)).
2. On applique avec $W=1$ (constante, $\mathcal{A}$-mesurable et bornée). □
**Intuition :** moyenner les moyennes conditionnelles redonne la moyenne (« tour »).

### Proposition 2.3 — Produit (« sortir ce qui est connu »)
**Source :** Poly ch.8, Outils, Proposition 2.3, p. 28
**Hypothèses :** $Y$ intégrable, $\mathcal{A}\subset\mathcal{F}$ sous-tribu, $U$ v.a. **$\mathcal{A}$-mesurable et bornée**.
**Énoncé :**
$$\mathbb{E}[UY\mid\mathcal{A}]=U\,\mathbb{E}[Y\mid\mathcal{A}],\qquad\mathbb{P}\text{-p.s.}$$
**Preuve (étapes) :**
1. $UY$ est **intégrable** car $U$ est bornée. Pour toute $W$ $\mathcal{A}$-mesurable bornée, la définition appliquée à $UY$ donne $\mathbb{E}[W\,\mathbb{E}[UY\mid\mathcal{A}]]=\mathbb{E}[WUY]$.
2. $UW$ est elle-même $\mathcal{A}$-mesurable et bornée ; la définition appliquée à $Y$ (avec le test $UW$) donne $\mathbb{E}[WUY]=\mathbb{E}[WU\,\mathbb{E}[Y\mid\mathcal{A}]]$.
3. $\mathbb{E}[UY\mid\mathcal{A}]$ et $U\,\mathbb{E}[Y\mid\mathcal{A}]$ sont $\mathcal{A}$-mesurables, intégrables, et ont la même intégrale contre toute $W$ $\mathcal{A}$-mesurable bornée : l'**unicité** de l'espérance conditionnelle (le poly écrit « théorème 2.1 » ; il s'agit du **Théorème et définition 2.1**) permet de conclure. □
**Pièges :** l'hypothèse « $U$ bornée » garantit l'intégrabilité de $UY$.

### Remarque (§2.4, p. 28) — Propriétés en $\mathrm{L}^2$
**Source :** Poly ch.8, Outils, p. 28
**Énoncé :** les propriétés suivantes, énoncées pour des variables de carré intégrable, s'établissent toutes à partir de la **définition comme projection**.

### Proposition 2.4 — Propriétés élémentaires
**Source :** Poly ch.8, Outils, Proposition 2.4, p. 28–29
**Hypothèses :** $U,V\in\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$ à valeurs respectivement dans $(\mathbb{R},\mathcal{B}(\mathbb{R}))$ et $(\mathbb{R}^d,\mathcal{B}(\mathbb{R}^d))$ (le poly écrit $\mathcal{A}$ pour la tribu ambiante).
**Énoncé :**
- **(i)** $\mathbb{E}[\mathbb{E}[U\mid V]]=\mathbb{E}[U]$.
- **(ii)** Il existe une fonction mesurable $\Psi:\mathbb{R}^d\to\mathbb{R}$ telle que $\Psi(V)=\mathbb{E}[U\mid V]$ $\mathbb{P}$-p.s.
- **(iii)** Si $U\ge0$, alors $\mathbb{E}[U\mid V]\ge0$ $\mathbb{P}$-p.s. (**positivité**).
- **(iv)** Pour tous réels $\alpha,\beta$ et $U_1,U_2\in\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$, $\mathbb{E}[\alpha U_1+\beta U_2\mid V]=\alpha\,\mathbb{E}[U_1\mid V]+\beta\,\mathbb{E}[U_2\mid V]$ (**linéarité**).
- **(v)** Pour toute fonction mesurable $\phi:\mathbb{R}^d\to\mathbb{R}$ telle que $\phi(V)\in\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$, $\mathbb{E}[\phi(V)\mid V]=\phi(V)$ $\mathbb{P}$-p.s.
**Preuve (étapes) :**
1. (i) : prendre le test constant égal à 1 dans (14) (le poly écrit « $g\equiv1$ »).
2. (ii) : Prop. 2.1, jointe au fait que $\mathbb{E}[U\mid V]$ est $\sigma(V)$-mesurable.
3. (iii) : appliquer (14) avec $T=\mathbb{1}_{\{\mathbb{E}[U\mid V]<0\}}$, $\sigma(V)$-mesurable et bornée ; si $\mathbb{P}(\mathbb{E}[U\mid V]<0)>0$, on obtient $\mathbb{E}[U\,\mathbb{1}_{\{\mathbb{E}[U\mid V]<0\}}]=\mathbb{E}[\mathbb{E}[U\mid V]\,\mathbb{1}_{\{\mathbb{E}[U\mid V]<0\}}]<0$, ce qui **contredit** $U\ge0$.
4. (iv) : **linéarité du produit scalaire** et **unicité** de la projection orthogonale (ou Th. 2.2 (iii)).
5. (v) : $\phi(V)$ **appartient déjà** à l'espace sur lequel on projette. □
**Intuition :** l'espérance conditionnelle se comporte comme une espérance, à ceci près que les fonctions de $V$ sont traitées comme des constantes.

### Proposition 2.5 — Conditionnement et indépendance
**Source :** Poly ch.8, Outils, Proposition 2.5, p. 29
**Hypothèses :** $U,V\in\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$ à valeurs dans $(\mathbb{R}^p,\mathcal{B}(\mathbb{R}^p))$ et $(\mathbb{R}^d,\mathcal{B}(\mathbb{R}^d))$, **indépendantes** ; $\phi:\mathbb{R}^p\times\mathbb{R}^d\to\mathbb{R}^q$ mesurable avec $\phi(U,V)\in\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$ ; $\chi$ la loi de $U$.
**Énoncé :**
$$\mathbb{E}[\phi(U,V)\mid V]=\Phi(V),\qquad\text{où}\quad\Phi(v):=\mathbb{E}[\phi(U,v)]=\int\phi(u,v)\,\chi(\mathrm{d}u).$$
**Preuve (étapes) :** **non donnée dans le poly** (énoncé seul). *(Esquisse classique, non présente dans le poly : $\Phi(V)$ est $\sigma(V)$-mesurable, et pour $h$ bornée, $\mathbb{E}[\phi(U,V)h(V)]=\iint\phi(u,v)h(v)\,\chi(\mathrm{d}u)\,\mathbb{P}_V(\mathrm{d}v)=\mathbb{E}[\Phi(V)h(V)]$ par indépendance — loi produit — et Fubini.)*
**Intuition (texte du poly) :** lorsque $U$ et $V$ sont indépendantes, $\mathbb{E}[\phi(U,V)\mid V]$ s'obtient en **gelant** $V$ et en intégrant en $U$ sous sa propre loi. C'est elle qui **légitime le calcul de la probabilité d'erreur conditionnelle** d'une règle apprise : $U$ = couple de test $(\mathbf{X},Y)$, $V$ = ensemble d'apprentissage $\mathcal{D}_n$ (§4.4) — utilisée dans la preuve de la Prop. 1.5.
**Pièges :** l'indépendance est essentielle ; si le point de test faisait partie de $\mathcal{D}_n$, le calcul serait faux (biais d'optimisme).

### Remarque (§2.5, p. 29–30) — Densité conditionnelle (notations des Outils)
**Source :** Poly ch.8, Outils, §2.5, p. 29–30
**Hypothèses :** $(\mathsf{Y},\mathcal{Y},\mu)$ et $(\mathsf{X},\mathcal{X},\nu)$ deux espaces mesurés (**attention : rôles de $\mu$ et $\nu$ inversés par rapport au Cours**) ; $(Y,\mathbf{X})$ admet une densité $p_{Y,\mathbf{X}}(y,\mathbf{x})$ par rapport à $\mu\otimes\nu$ : pour toute $h$ mesurable positive,
$$\mathbb{E}[h(Y,\mathbf{X})]=\int_{\mathsf{Y}\times\mathsf{X}}h(y,\mathbf{x})\,p_{Y,\mathbf{X}}(y,\mathbf{x})\,\mu(\mathrm{d}y)\,\nu(\mathrm{d}\mathbf{x}).$$
**Énoncé :** la marginale de $\mathbf{X}$ admet la densité $p_{\mathbf{X}}(\mathbf{x}):=\int_{\mathsf{Y}}p_{Y,\mathbf{X}}(y,\mathbf{x})\,\mu(\mathrm{d}y)$ ; pour tout $\mathbf{x}$ tel que $p_{\mathbf{X}}(\mathbf{x})>0$,
$$p_{Y|\mathbf{X}}(y\mid\mathbf{x}):=\frac{p_{Y,\mathbf{X}}(y,\mathbf{x})}{p_{\mathbf{X}}(\mathbf{x})}.$$
La fonction $y\mapsto p_{Y|\mathbf{X}}(y\mid\mathbf{x})$ est positive et d'intégrale 1 contre $\mu$ : c'est une densité par rapport à $\mu$, appelée **densité conditionnelle de $Y$ sachant $\mathbf{X}=\mathbf{x}$**.
**Preuve (étapes) :** intégrale 1 : $\int p_{Y|\mathbf{X}}(y\mid\mathbf{x})\mu(\mathrm{d}y)=p_{\mathbf{X}}(\mathbf{x})/p_{\mathbf{X}}(\mathbf{x})=1$ (définition de $p_{\mathbf{X}}$) ; marginale : Fubini avec $h(y,\mathbf{x})=f(\mathbf{x})$ (implicite).

### Proposition 2.6 — Espérance conditionnelle dans le cas à densité
**Source :** Poly ch.8, Outils, Proposition 2.6, p. 30
**Hypothèses :** celles de la remarque précédente ; $Y$ intégrable.
**Énoncé :** la fonction
$$\mathbf{x}\longmapsto\Phi(\mathbf{x}):=\int_{\mathsf{Y}}y\,p_{Y|\mathbf{X}}(y\mid\mathbf{x})\,\mu(\mathrm{d}y)$$
est définie pour $p_{\mathbf{X}}\cdot\nu$-presque tout $\mathbf{x}$, et
$$\Phi(\mathbf{X})=\mathbb{E}[Y\mid\mathbf{X}],\qquad\mathbb{P}\text{-p.s.}$$
Plus généralement, pour toute $\psi$ mesurable telle que $\psi(Y)$ soit intégrable,
$$\mathbb{E}[\psi(Y)\mid\mathbf{X}]=\Big(\int_{\mathsf{Y}}\psi(y)\,p_{Y|\mathbf{X}}(y\mid\mathbf{x})\,\mu(\mathrm{d}y)\Big)_{\mathbf{x}=\mathbf{X}}.$$
**Preuve (étapes) :**
1. $\Phi(\mathbf{X})$ est $\sigma(\mathbf{X})$-mesurable **par construction**.
2. Pour toute $h$ mesurable bornée, par **Fubini** et la définition de $p_{Y|\mathbf{X}}$ :
$$\begin{aligned}\mathbb{E}[h(\mathbf{X})\Phi(\mathbf{X})]&=\int_{\mathsf{X}}h(\mathbf{x})\Big(\int_{\mathsf{Y}}y\,p_{Y|\mathbf{X}}(y\mid\mathbf{x})\,\mu(\mathrm{d}y)\Big)p_{\mathbf{X}}(\mathbf{x})\,\nu(\mathrm{d}\mathbf{x})\\&=\iint_{\mathsf{Y}\times\mathsf{X}}y\,h(\mathbf{x})\,\frac{p_{Y,\mathbf{X}}(y,\mathbf{x})}{p_{\mathbf{X}}(\mathbf{x})}\,p_{\mathbf{X}}(\mathbf{x})\,\mu(\mathrm{d}y)\,\nu(\mathrm{d}\mathbf{x})\\&=\iint_{\mathsf{Y}\times\mathsf{X}}y\,h(\mathbf{x})\,p_{Y,\mathbf{X}}(y,\mathbf{x})\,\mu(\mathrm{d}y)\,\nu(\mathrm{d}\mathbf{x})=\mathbb{E}[Y\,h(\mathbf{X})].\end{aligned}$$
3. La contribution de $\{(y,\mathbf{x}):p_{\mathbf{X}}(\mathbf{x})=0\}$ est **nulle** : $\{\mathbf{x}:p_{\mathbf{X}}(\mathbf{x})=0\}$ est de mesure nulle sous la loi de $\mathbf{X}$ par définition de $p_{\mathbf{X}}$.
4. Toute $T$ $\sigma(\mathbf{X})$-mesurable bornée s'écrit $h(\mathbf{X})$ avec $h$ mesurable bornée (**Prop. 2.1**) : $\mathbb{E}[YT]=\mathbb{E}[\Phi(\mathbf{X})T]$ pour toute telle $T$ ; $\Phi(\mathbf{X})$ est intégrable par **Fubini**. Le **Th.-déf. 2.1** conclut.
5. Cas général : remplacer $y$ par $\psi(y)$. □
**Remarque du poly :** $\mu$ et $\nu$ peuvent être discrètes ou continues ; en classification, $\mu$ est la mesure de comptage sur $\{-1,1\}$ et l'intégrale en $y$ est une **somme de deux termes** ; en régression, $\mu$ est la mesure de Lebesgue sur $\mathbb{R}$ (le poly cite « Section 1.2 » pour les deux cas).
**Intuition :** l'espérance conditionnelle = espérance sous la densité conditionnelle, puis on remplace $\mathbf{x}$ par $\mathbf{X}$.
**Pièges :** écrire $(\cdots)_{\mathbf{x}=\mathbf{X}}$ : on calcule d'abord une fonction de $\mathbf{x}$ déterministe, puis on substitue.

### Lemme 2.2 — Décomposition selon la fonction de régression
**Source :** Poly ch.8, Outils, Lemme 2.2, p. 31 (§2.6, p. 30–31)
**Hypothèses :** $Y$ à valeurs dans $\{-1,1\}$, $\eta$ fonction de régression, $\psi:\mathbb{R}^d\times\{-1,1\}\to\mathbb{R}_+$ mesurable **bornée**.
**Énoncé :**
$$\mathbb{E}[\psi(\mathbf{X},Y)]=\mathbb{E}[\psi(\mathbf{X},1)\,\eta(\mathbf{X})]+\mathbb{E}[\psi(\mathbf{X},-1)\,(1-\eta(\mathbf{X}))].$$
**Preuve (étapes) :**
1. $Y$ ne prenant que les valeurs $\pm1$ : $\psi(\mathbf{X},Y)=\psi(\mathbf{X},1)\,\mathbb{1}_{\{Y=1\}}+\psi(\mathbf{X},-1)\,\mathbb{1}_{\{Y=-1\}}$.
2. Prendre l'espérance et **conditionner par $\mathbf{X}$** : $\psi(\mathbf{X},1)$ et $\psi(\mathbf{X},-1)$ sont $\sigma(\mathbf{X})$-mesurables et bornées, donc la **propriété du produit** (Prop. 2.3) et l'**espérance de l'espérance conditionnelle** (Prop. 2.2) donnent
$$\mathbb{E}\big[\psi(\mathbf{X},1)\,\mathbb{1}_{\{Y=1\}}\big]=\mathbb{E}\big[\psi(\mathbf{X},1)\,\mathbb{E}[\mathbb{1}_{\{Y=1\}}\mid\mathbf{X}]\big]=\mathbb{E}[\psi(\mathbf{X},1)\,\eta(\mathbf{X})].$$
3. De même pour le second terme, la **linéarité** donnant $\mathbb{E}[\mathbb{1}_{\{Y=-1\}}\mid\mathbf{X}]=1-\mathbb{E}[\mathbb{1}_{\{Y=1\}}\mid\mathbf{X}]=1-\eta(\mathbf{X})$. □
**Intuition :** on remplace une espérance sur le couple par une espérance sur $\mathbf{X}$ seul, les deux valeurs de $Y$ étant pondérées par $\eta(\mathbf{X})$ et $1-\eta(\mathbf{X})$. **Outil de calcul de la preuve du Th. 1.2** (avec $\psi=\psi_g$).

### Remarque (§2.7, p. 31) — Mesure de comptage et modèle dominé
**Source :** Poly ch.8, Outils, §2.7, p. 31
**Énoncé :** si $Y$ prend un nombre fini de valeurs, sa loi n'a pas de densité par rapport à Lebesgue mais en a une par rapport à la **mesure de comptage**. Sur $\mathsf{Y}=\{-1,1\}$, $\mathrm{c}:=\delta_{\{-1\}}+\delta_{\{1\}}$, et $p_Y:\{-1,1\}\to\mathbb{R}_+$ est une densité de probabilité par rapport à $\mathrm{c}$ ssi $p_Y(-1)+p_Y(1)=1$ (l'intégrale contre $\mathrm{c}$ est la **somme des deux valeurs**). Le couple $(\mathbf{X},Y)$ admet alors une densité par rapport à $\mathrm{Leb}\otimes\mathrm{c}$ sur $\mathbb{R}^d\times\{-1,1\}$, et toutes les formules de la §2.5 s'appliquent. C'est la notion de **modèle dominé** du ch.1 (définition 1), appliquée à la mesure dominante produit.

### Remarque (§2.8, p. 31) — Le vecteur gaussien et sa densité
**Source :** Poly ch.8, Outils, §2.8, p. 31
**Énoncé :** $\mathbf{X}\in\mathbb{R}^d$ est **gaussien** si toute combinaison linéaire de ses coordonnées est une gaussienne réelle (ch.1, définition 10) ; sa loi est déterminée par son espérance $\mu\in\mathbb{R}^d$ et sa covariance $\Sigma$ (symétrique positive). Lorsque $\Sigma$ est **inversible**, la loi admet par rapport à Lebesgue sur $\mathbb{R}^d$ la densité
$$q(\mathbf{x})=\frac{1}{(2\pi)^{d/2}\sqrt{\det\Sigma}}\exp\Big(-\frac12(\mathbf{x}-\mu)^\top\Sigma^{-1}(\mathbf{x}-\mu)\Big),$$
**et seulement dans ce cas** (ch.1, proposition 2.7). D'où l'inversibilité imposée dans le Cadre 1.2.

### Remarque (§2.9, p. 31–32) — La fonction sigmoïde
**Source :** Poly ch.8, Outils, §2.9, p. 31–32
**Énoncé :** la fonction **sigmoïde** (ou **logistique**) est
$$\mathrm{sigm}:t\longmapsto\frac{1}{1+e^{-t}}.$$
Elle est $C^\infty$, **strictement croissante** de $\mathbb{R}$ sur $]0,1[$, de limites 0 en $-\infty$ et 1 en $+\infty$, et vérifie
$$\mathrm{sigm}(-t)=1-\mathrm{sigm}(t),\qquad\mathrm{sigm}'(t)=\mathrm{sigm}(t)\,(1-\mathrm{sigm}(t)).$$
En particulier $\mathrm{sigm}(0)=1/2$, de sorte que $\mathrm{sigm}(t)\ge1/2\iff t\ge0$ : c'est ce qui ramène le seuil $\eta_\theta(\mathbf{x})\ge1/2$ à une **condition affine** en $\mathbf{x}$ (modèle logistique, LDA). Sa réciproque est la fonction **logit** $u\mapsto\log(u/(1-u))$, de sorte que $\phi_\theta$ défini en (11) est le **logit de $\eta_\theta$**.
**Preuve (étapes) — vérifications élémentaires (non rédigées dans le poly) :** $1-\frac1{1+e^{-t}}=\frac{e^{-t}}{1+e^{-t}}=\frac{1}{e^{t}+1}=\mathrm{sigm}(-t)$ ; $\mathrm{sigm}'(t)=\frac{e^{-t}}{(1+e^{-t})^2}=\mathrm{sigm}(t)\,\mathrm{sigm}(-t)$.

### Remarque (§2.10, p. 32) — Les résultats antérieurs mobilisés
**Source :** Poly ch.8, Outils, §2.10, p. 32
**Contenu :**
- **Ch.1** : modèle dominé et densité par rapport à une mesure dominante (définition 1), $n$-échantillon (définition 6), vecteur gaussien et sa densité (définition 10, proposition 2.7), théorème de Radon-Nikodym (théorème 2.1).
- **Ch.2** : vraisemblance et EMV (définition 1.4, méthode 1.2), point de vue des M-estimateurs (définition 1.8), moindres carrés (exemple 1.15), que retrouvent le modèle logistique et le modèle linéaire gaussien.
- **Ch.6** : convergence en probabilité (définition 2.1), consistance (définition 1.2), employées dans l'hypothèse (iii) de la Prop. 1.5.
- **Ch.7** : consistance de l'EMV, hypothèse sous laquelle la règle par substitution de l'analyse discriminante est étudiée (exercice 3).

### Remarque (§2.11, p. 32) — Les résultats admis
**Source :** Poly ch.8, Outils, §2.11, p. 32
**Contenu :** quatre énoncés utilisés **sans démonstration** :
1. la **complétude** de $\mathrm{L}^2(\Omega,\mathcal{F},\mathbb{P})$ (Th. 2.1) — théorie de la mesure ;
2. le **théorème de projection** sur un sous-espace fermé d'un Hilbert (Th. 2.2) et la **fermeture** de $\mathrm{L}^2(\Omega,\mathcal{A},\mathbb{P})$ (Lemme 2.1) ;
3. l'**existence et l'unicité** de l'espérance conditionnelle pour une variable intégrable (Th.-déf. 2.1) — classe monotone ou Radon-Nikodym ; cf. Billingsley, *Probability and Measure*, ch. 34 ;
4. la **caractérisation des variables $\sigma(\mathbf{X})$-mesurables** (Prop. 2.1), dite **lemme de Doob**.

---

## 4. Exercices du poly

> **Aucun fichier « Exercices » n'est fourni pour le chapitre 8.** La seule information présente dans les sources extraites est la §1.4 « Le programme des exercices » (p. 23–24), reproduite ci-dessous, complétée par les renvois du Cours aux exercices. Les énoncés et corrigés complets se trouvent dans `content/sources/S8_APM-41033-EP-PC8-enonce.txt` et `S8_APM-41033-EP-PC8-corrige.txt` (PDF : `S8_APM-41033-EP-PC8-*.pdf`), **non extraits ici** ; aucun énoncé ni corrigé n'est inventé.

### Exercice 1 (feuille de la semaine 8) — Perte asymétrique
**Source :** Poly ch.8, §1.4, p. 23 (renvoi aussi p. 18)
**Description du poly :** remplacer la perte 0–1 par une perte **asymétrique** pénalisant d'un coût $c>0$ le fait de prédire $-1$ lorsque la réponse vaut $1$, et d'un coût $1$ la situation inverse. Calculer le risque en fonction de $\eta$ et de $c$ ; montrer que $2\,\mathbb{1}_{\{\eta(\mathbf{X})\ge1/(c+1)\}}-1$ est une **règle bayésienne** ; discuter l'**unicité** de cette règle.
**Méthodes annoncées :** risque conditionnel (Prop. 1.1), lemme de décomposition (Lemme 2.2), même schéma que la preuve du Th. 1.2 (seuil déplacé de $1/2$ à $1/(c+1)$).

### Exercice 2 — Formules du Th. 1.2 et règle par substitution
**Source :** Poly ch.8, §1.4, p. 23 (renvoi p. 23 : « le résultat typique ci-dessus est le sujet de l'exercice 2 »)
**Description du poly :** risque bayésien $\mathbb{E}[\min(\eta(\mathbf{X}),1-\eta(\mathbf{X}))]$ ; écriture (6) du risque d'un classifieur quelconque ; majoration $|R(g_1)-R(g_2)|\le\mathbb{E}\big[|2\eta(\mathbf{X})-1|\,\mathbb{1}_{\{g_1(\mathbf{X})\neq g_2(\mathbf{X})\}}\big]$ ; majoration de l'excès de risque d'une règle construite sur une approximation de $\eta$ ; passage à la limite qui donne la **Prop. 1.5**.
**Méthodes annoncées :** Lemme 2.2, éq. (6)–(7), majoration (13), convergence dominée.

### Exercice 3 — Analyse discriminante de bout en bout
**Source :** Poly ch.8, §1.4, p. 23 (renvois p. 20, 21, 23 ; Figure 5)
**Description du poly :** expression de la fonction de régression sous la forme $\mathrm{sigm}(\phi_\theta(\mathbf{x}))$ ; frontière linéaire lorsque les deux covariances coïncident ; log-vraisemblance de l'échantillon ; **EMV** ($\widehat p_n$, $\widehat\mu_{i,n}$, $\widehat\Sigma_{i,n}$) ; **consistance** de cet estimateur ; convergence vers zéro de l'excès de risque de la règle par substitution. Dernière question : extension à **plus de deux classes**.
**Méthodes annoncées :** éq. (10)–(11), calcul d'EMV (gaussien multivarié + Bernoulli), consistance de l'EMV (ch.7), Prop. 1.5.

### Exercice 4 — Espérance conditionnelle
**Source :** Poly ch.8, §1.4, p. 24
**Description du poly :** deux couples de même loi ont des espérances conditionnelles de même loi ; calcul de $\mathbb{E}[X\mid|X|]$ pour une variable de loi **symétrique** ; calcul de $\mathbb{E}[X_i\mid X_1+\cdots+X_n]$ pour des variables **i.i.d. intégrables**.
**Méthodes annoncées :** définition (Th.-déf. 2.1), lemme de Doob (Prop. 2.1), arguments de symétrie / d'échangeabilité.

### Exercice 5 — Modèle jouet à lois conditionnelles uniformes
**Source :** Poly ch.8, §1.4, p. 24 (renvoi p. 18)
**Description du poly :** dimension un ; les deux lois conditionnelles des attributs sont **uniformes sur des intervalles qui se chevauchent**. Calcul de la loi marginale des attributs, de la fonction de régression, du **risque bayésien** et de l'**excès de risque** d'une règle à seuil donnée.
**Méthodes annoncées :** Prop. 1.2–1.4, formules (4)–(5).

### Exercice 6 — Règles à seuil en dimension un
**Source :** Poly ch.8, §1.4, p. 24
**Description du poly :** classe des règles à seuil $g_{(x',y')}$, qui prédisent $y'$ à gauche de $x'$ et $-y'$ à droite. Exprimer le minimum du risque dans cette classe à l'aide des **fonctions de répartition conditionnelles** ; montrer qu'il est **majoré par $\min(p,1-p)$** ; le relier au risque bayésien.
**Méthodes annoncées :** calcul de risque 0–1, comparaison avec $R^\star_{01}$ (préfigure le risque d'approximation, §4.6 et ch.9).

### Exercice 7 — Excès de risque d'une règle construite sur un $\eta$ approché
**Source :** Poly ch.8, §1.4, p. 24 (renvoi p. 22 ; corrigé dans le poly en §4.7 = Prop. 4.2)
**Description du poly :** démontrer la majoration (13) de l'excès de risque d'une règle construite sur une fonction $\eta$ approchée, par $2\,\mathbb{E}[|\eta^\star(\mathbf{X})-\eta(\mathbf{X})|]$ ; résultat employé dans la preuve de la Prop. 1.5.
**Corrigé disponible dans le poly :** voir **Prop. 4.2** (§5 ci-dessous) — formule (4) puis $|\eta^\star-1/2|\le|\eta^\star-\eta|$ sur $\{g\ne g^\star\}$ par disjonction de cas.
**Méthodes :** formule d'excès de risque (4), disjonction de cas, majoration de l'indicatrice par 1.

---

## 5. Hors programme / compléments

> Poly ch.8, §4 « Les compléments », p. 34–41 — **non exigibles** (« Les contenus de cette partie ne sont pas exigibles »). Contenu annoncé : deux modèles où tout se calcule, optimalité quadratique de la fonction de régression, risque empirique et sur-apprentissage, probabilité d'erreur conditionnelle vs risque moyen, consistance d'une suite de classifieurs, compromis approximation/estimation, preuve de la majoration de la Prop. 1.5, perceptrons et réseaux de neurones.

### Exemple 4.1 — Attribut uniforme et classe à deux niveaux (modèle jouet, p. 34)
**Modèle :** $X\sim\mathcal{U}([-1,1])$, $\mathbb{P}(X\in A)=\frac12\int_{A\cap[-1,1]}\mathrm{d}x$ ; $q_{Y|X}(1\mid x)=0{,}9$ si $x\in[0,1]$, $0{,}1$ si $x\in[-1,0[$. Densité par rapport à $\mathrm{Leb}\otimes\mathrm{c}$ :
$$p_{X,Y}(x,1)=\tfrac{0{,}9}{2}\mathbb{1}_{[0,1]}(x)+\tfrac{0{,}1}{2}\mathbb{1}_{[-1,0[}(x),\qquad p_{X,Y}(x,-1)=\tfrac{0{,}1}{2}\mathbb{1}_{[0,1]}(x)+\tfrac{0{,}9}{2}\mathbb{1}_{[-1,0[}(x).$$
**Résultats :** $p=\mathbb{P}(Y=1)=\frac12\int_0^1 0{,}9\,\mathrm{d}x+\frac12\int_{-1}^0 0{,}1\,\mathrm{d}x=1/2$ ; $\eta=0{,}9$ sur $[0,1]$, $0{,}1$ sur $[-1,0[$ ; $g^\star(x)=2\,\mathbb{1}_{[0,1]}(x)-1$ ;
$$\mathbb{P}(g^\star(X)\neq Y)=\mathbb{P}(X\ge0,Y=-1)+\mathbb{P}(X<0,Y=1)=\int_0^1p_{X,Y}(x,-1)\,\mathrm{d}x+\int_{-1}^0p_{X,Y}(x,1)\,\mathrm{d}x=\tfrac{0{,}1}{2}+\tfrac{0{,}1}{2}=0{,}1,$$
ce que redonne (5) : $\mathbb{E}[\min(\eta(X),1-\eta(X))]=0{,}1$. Figure 7 (p. 35) : 40 réalisations, classes codées 0/1, quatre points mal classés.
**Méthodes :** Prop. 1.4, Th. 1.2, calcul direct d'intégrales.

### Proposition 4.1 — Optimalité quadratique de la fonction de régression (p. 34–35)
**Énoncé :** codage $Y\in\{0,1\}$ ; $\eta$ fonction de régression ; $g:\mathbb{R}^d\to[0,1]$ mesurable. Alors $\mathbb{E}[(\eta(\mathbf{X})-Y)^2]\le\mathbb{E}[(g(\mathbf{X})-Y)^2]$.
**Preuve (résumé) :** développer $(g-Y)^2=(g-\eta)^2+2(g-\eta)(\eta-Y)+(\eta-Y)^2$ ; terme croisé $\mathbb{E}[(g(\mathbf{X})-\eta(\mathbf{X}))\,\mathbb{E}[\eta(\mathbf{X})-Y\mid\mathbf{X}]]=\mathbb{E}[(g-\eta)(\eta-\mathbb{E}[Y\mid\mathbf{X}])]=0$ (Prop. 2.3 et $\eta(\mathbf{X})=\mathbb{E}[Y\mid\mathbf{X}]$ pour $Y\in\{0,1\}$) ; reste $\mathbb{E}[(g-Y)^2]=\mathbb{E}[(g-\eta)^2]+\mathbb{E}[(\eta-Y)^2]$. Cas particulier du Th. 1.1. Le Lemme 2.2 « appartient au même cercle d'idées ».

### Définition 4.1 — Risque empirique ; règle « par cœur » (p. 35–36)
**Énoncé :** $\widehat R_n(g):=\frac1n\sum_{k=1}^n\mathbb{1}_{\{g(\mathbf{X}_k)\neq Y_k\}}$. Par la LGN, pour $g$ **fixée**, $\widehat R_n(g)\to R(g)$ en probabilité. **Mais** minimiser $\widehat R_n$ sur toutes les règles ne donne rien : la règle
$$g_{\mathrm{bad},n}(\mathbf{x})=\begin{cases}Y_k&\text{si }\mathbf{x}=\mathbf{X}_k\text{ pour un }k\in\{1,\dots,n\},\\-1&\text{sinon},\end{cases}$$
a un risque empirique **nul** mais prédit $-1$ partout ailleurs ; on peut la modifier hors de $\{\mathbf{X}_1,\dots,\mathbf{X}_n\}$ sans changer $\widehat R_n$ : infinité de règles de risque empirique nul, la plupart mauvaises.

### Exemple 4.2 — Sur-apprentissage (p. 36)
**Idée :** $d=2$, mélange de deux gaussiennes de **même covariance** : le classifieur bayésien est un **hyperplan** (§1.3), mais une frontière qui se contorsionne pour étiqueter correctement tous les points d'apprentissage (Figure 8) classe mieux les données d'apprentissage et **moins bien les données nouvelles** : c'est le **sur-apprentissage**.

### §4.4 — Probabilité d'erreur conditionnelle et risque moyen (p. 36–37)
**Idée :** $\widehat g_n(\mathbf{x})=g(\mathbf{x};\mathbf{X}_1,Y_1,\dots,\mathbf{X}_n,Y_n)=g(\mathbf{x};\mathcal{D}_n)$. **Probabilité d'erreur conditionnelle** (risque de classification conditionnel, **erreur de généralisation**) : $R(\widehat g_n):=\mathbb{P}(\widehat g_n(\mathbf{X})\neq Y\mid\mathcal{D}_n)$, $(\mathbf{X},Y)$ indépendant de $\mathcal{D}_n$ ; v.a. fonction de $\mathcal{D}_n$, calculée par la Prop. 2.5 ($U=(\mathbf{X},Y)$, $V=\mathcal{D}_n$). **Risque moyen** : $\mathbb{E}[R(\widehat g_n)]=\mathbb{P}(\widehat g_n(\mathbf{X};\mathcal{D}_n)\neq Y)$, moyenne sur la loi de $\mathcal{D}_n$ ; c'est le $\mathbb{E}_{n,\theta^\star}[R_{01}(\widehat g_n)]$ de la Prop. 1.5.

### Définition 4.2 — Consistance d'une suite de classifieurs (p. 37)
**Énoncé :** $\{(\mathbf{X}_k,Y_k),k\in\mathbb{N}^*\}$ i.i.d. de loi celle de $(\mathbf{X},Y)$ ; $\widehat g_n(\cdot)=g(\cdot;\mathcal{D}_n)$. La suite est **faiblement consistante** si
$$R(\widehat g_n)\xrightarrow{\mathbb{P}\text{-prob}}R^\star.\tag{15}$$
Comme $R(\widehat g_n)\ge R^\star$, cela équivaut à $\lim_n\mathbb{P}(R(\widehat g_n)>R^\star+\varepsilon)=0$ pour tout $\varepsilon>0$. Pour la perte 0–1 ($R^\star\le R(\widehat g_n)\le1$), (15) **équivaut** à
$$\lim_{n\to\infty}\mathbb{E}[R(\widehat g_n)]=R^\star.\tag{16}$$
**Preuve de l'équivalence :** (16) ⇒ (15) par **Markov** : $\mathbb{P}(R(\widehat g_n)-R^\star\ge\delta)\le\delta^{-1}\{\mathbb{E}[R(\widehat g_n)]-R^\star\}\to0$. (15) ⇒ (16) : $\mathbb{E}[R(\widehat g_n)]-R^\star\le\mathbb{P}(R(\widehat g_n)-R^\star\ge\delta)+\delta$ (découpage selon que l'écart dépasse $\delta$ ou non, écart $\le1$), puis $\delta$ arbitraire. **Consistance universelle** : convergence du risque moyen vers $R^\star$ **quelle que soit la loi** de $(\mathbf{X},Y)$ (Devroye, Györfi, Lugosi, *A Probabilistic Theory of Pattern Recognition*, ch. 6).

### §4.6 — Compromis entre risque d'approximation et risque d'estimation (p. 37–39)
**Idée :** restreindre à une classe $\mathcal{C}$ : $\widehat g_n\in\arg\min_{g\in\mathcal{C}}\frac1n\sum_{k=1}^n\mathbb{1}_{\{g(\mathbf{X}_k)\neq Y_k\}}$. Décomposition :
$$\mathbb{E}[R(\widehat g_n)]-R^\star=\underbrace{\mathbb{E}[R(\widehat g_n)]-\inf_{g\in\mathcal{C}}R(g)}_{\text{risque d'estimation}}+\underbrace{\inf_{g\in\mathcal{C}}R(g)-R^\star}_{\text{risque d'approximation}}.$$
Estimation : dépend de la taille de $\mathcal{C}$ et de l'algorithme ; approximation : ne dépend que de $\mathcal{C}$ et de la loi. $\mathcal{C}$ petite (singleton) ⇒ estimation faible/nulle, approximation grande ; $\mathcal{C}$ = toutes les règles ⇒ approximation nulle, estimation grande. Figure 9 : l'un décroît, l'autre croît avec la complexité, la somme (excès de risque) passe par un **minimum**. Deux stratégies : **restreindre $\mathcal{C}$** (discriminateurs linéaires, réseaux simples) ou **pénaliser** le risque empirique par une mesure de complexité (ch.10). Informellement :
- **Méthode du crible** (*method of sieves*) : classes $\{\mathcal{C}_k\}_{k=1}^K$ de complexité croissante (p. ex. $\mathcal{C}_k$ = classifieurs $g(\mathbf{x})=2\,\mathbb{1}_{\{a(\mathbf{x})\ge0\}}-1$, $a$ polynôme de degré $\le k$ : $\mathcal{C}_1$ linéaires, $\mathcal{C}_2$ quadratiques) ; $\widehat g_k$ minimise le risque empirique sur $\mathcal{C}_k$ ; choisir $K_n$ (dépendant de $\mathcal{D}_n$) pour un excès de risque proche du meilleur accessible.
- **Validation simple** (*hold-out*) : $\mathcal{D}_T:=\{(\mathbf{X}_k,Y_k),1\le k\le m\}$, $\mathcal{D}_V:=\{(\mathbf{X}_k,Y_k),m+1\le k\le n\}$ ; $\widehat g^\star_k$ construite sur $\mathcal{D}_T$ ; choisir celle qui minimise $\widehat R_V(g):=\frac1{n-m}\sum_{k=m+1}^n\mathbb{1}_{\{g(\mathbf{X}_k)\neq Y_k\}}$.

### Exemple 4.3 — Classifieurs linéaires et perceptron (p. 38–39)
**Idée :** $\mathcal{C}=\{\mathbf{x}\mapsto g_{\mathbf{w}}(\mathbf{x}):=\mathrm{signe}(\mathbf{w}^\top\mathbf{x}):\mathbf{w}\in\mathbb{R}^d\}$, $\mathrm{signe}(t)=2\,\mathrm{heaviside}(t)-1$ ; MRE : $\mathbf{w}^\star_n\in\arg\min_{\mathbf{w}\in\mathbb{R}^d}\frac1n\sum_{k=1}^n\mathbb{1}_{\{\mathrm{signe}(\mathbf{w}^\top\mathbf{X}_k)\neq Y_k\}}$ (pas d'unicité en général). **Perceptron stochastique** : $\|\mathbf{X}_k\|=1$, $\mathbf{w}_0=0$, $K_t$ uniforme sur $\{1,\dots,n\}$,
$$\mathbf{w}_{t+1}=\mathbf{w}_t+\gamma\,Y_{K_t}\mathbf{X}_{K_t}\,\mathbb{1}_{\{\mathrm{signe}(\mathbf{w}_t^\top\mathbf{X}_{K_t})\neq Y_{K_t}\}},\qquad\gamma\in\,]0,1].$$
Inchangé si l'exemple est bien classé ; sinon on ajoute (label 1) ou retranche (label $-1$) l'attribut. **Converge** si les classes sont linéairement séparables ; sinon la complexité de la MRE croît **exponentiellement** avec $n$ (énoncé sans preuve).

### Proposition 4.2 — Excès de risque d'une règle par substitution (p. 39–40) = majoration (13), exercice 7
**Énoncé :** $\eta^\star$ fonction de régression, $g^\star:=2\,\mathbb{1}_{\{\eta^\star\ge1/2\}}-1$, $\eta:\mathbb{R}^d\to[0,1]$ mesurable, $g:=2\,\mathbb{1}_{\{\eta\ge1/2\}}-1$. Alors
$$R_{01}(g)-R_{01}(g^\star)=2\,\mathbb{E}\big[\mathbb{1}_{\{g(\mathbf{X})\neq g^\star(\mathbf{X})\}}\,|\eta^\star(\mathbf{X})-1/2|\big]\le2\,\mathbb{E}\big[|\eta^\star(\mathbf{X})-\eta(\mathbf{X})|\big].$$
**Preuve (étapes) :**
1. Égalité : formule (4) avec $|2\eta^\star(\mathbf{X})-1|=2|\eta^\star(\mathbf{X})-1/2|$.
2. Sur $\{g(\mathbf{X})\neq g^\star(\mathbf{X})\}$ = réunion disjointe de $\{\eta^\star(\mathbf{X})\ge1/2,\eta(\mathbf{X})<1/2\}$ et $\{\eta^\star(\mathbf{X})<1/2,\eta(\mathbf{X})\ge1/2\}$ (même seuil appliqué à $\eta$ et $\eta^\star$).
3. Sur le premier : $|\eta^\star-1/2|=\eta^\star-\frac12\le\eta^\star-\eta=|\eta^\star-\eta|$ car $\eta<1/2\le\eta^\star$. Sur le second : $|\eta^\star-1/2|=\frac12-\eta^\star\le\eta-\eta^\star=|\eta^\star-\eta|$.
4. Report : $R_{01}(g)-R_{01}(g^\star)\le2\,\mathbb{E}[\mathbb{1}_{\{g\ne g^\star\}}|\eta^\star-\eta|]\le2\,\mathbb{E}[|\eta^\star-\eta|]$ (indicatrice $\le1$, intégrande positif). □
**Remarque :** bien que placée en compléments, c'est l'outil de la Prop. 1.5 (au programme) et l'objet de l'exercice 7.

### §4.8 — Perceptrons et réseaux de neurones (p. 40–41)
**Idée :** discriminateur linéaire
$$g(\mathbf{x}):=\sigma\Big(a_0+\sum_{i=1}^d a_i\,x^{(i)}\Big)=\sigma(\mathbf{a}^\top\mathbf{x}),\qquad\mathbf{x}:=\begin{pmatrix}1\\x^{(1)}\\\vdots\\x^{(d)}\end{pmatrix},\qquad\mathbf{a}:=\begin{pmatrix}a_0\\a_1\\\vdots\\a_d\end{pmatrix},$$
$\mathbf{a}$ = poids synaptiques, $a_0$ = biais, $\sigma$ = fonction d'activation, ici $\mathrm{heaviside}(t)=0$ si $t\le0$, 1 sinon (sortie $\{-1,1\}$ via $t\mapsto2\,\mathrm{heaviside}(t)-1$) ; coût $\propto d$. **Rosenblatt** : perceptrons, premier algorithme d'apprentissage **séquentiel**. **Réseau à une couche cachée** : $u_i=\sigma(\psi_i(\mathbf{x}))$, $\psi_i(\mathbf{x})=b_i+\sum_{j=1}^d a_{i,j}x^{(j)}$, $i\in\{1,\dots,k\}$, et
$$g(\mathbf{x})=\mathrm{heaviside}\Big(c_0+\sum_{i=1}^k c_i\,\sigma(\psi_i(\mathbf{x}))\Big),$$
$\sigma$ croissante, limites 0 et 1 ; choix usuels : signe, $\mathrm{sigm}$, arc tangente normalisé $t\mapsto\frac12\big(\frac2\pi\arctan(t)+1\big)$. **Théorème de Kolmogorov (1957) – Lorentz (1976)** : toute $f$ continue sur $[0,1]^d$ s'écrit $f(\mathbf{x})=\sum_{i=1}^{2d+1}F_i\Big(\sum_{j=1}^dG_{i,j}(x^{(j)})\Big)$, $F_i,G_{i,j}$ continues dépendant de $f$. En pratique, les réseaux multicouches approchent toute fonction mesurable avec précision arbitraire, même à activation fixée (Figure 10).

---

## 6. Liens avec les autres chapitres

**Prérequis :**
- **Chapitre 1 (Modèles statistiques)** : modèle dominé et densité par rapport à une mesure dominante (déf. 1) — ici appliqué à la mesure produit $\mu\otimes\nu$ et à la mesure de comptage ; $n$-échantillon (déf. 6) — $\mathcal{D}_n$ est un $n$-échantillon de $\mathbb{P}$ ; vecteur gaussien et sa densité (déf. 10, prop. 2.7) — Cadre 1.2 ; Radon-Nikodym (th. 2.1).
- **Chapitre 2 (Estimation ponctuelle)** : vraisemblance, EMV (déf. 1.4, méthode 1.2), M-estimateurs (déf. 1.8), moindres carrés (ex. 1.15) — retrouvés par le modèle logistique (12) et le modèle linéaire gaussien.
- **Chapitre 3 (Théorie de la décision)** : vocabulaire perte/risque et règle bayésienne (ici sans loi a priori : optimalité sous la loi connue du couple) ; l'étape 3 de la Méthode 1.1 relève des ch. 2, 3, 7.
- **Chapitre 6 (Statistiques asymptotiques)** : convergence en probabilité (déf. 2.1), consistance (déf. 1.2), LGN — hypothèse (iii) de la Prop. 1.5, consistance d'une suite de classifieurs (Déf. 4.2), $\widehat R_n(g)\to R(g)$.
- **Chapitre 7 (M- et Z-estimateurs)** : consistance de l'EMV — hypothèse sous laquelle la règle *plug-in* de l'analyse discriminante est étudiée (exercice 3) ; l'EMV logistique (12) est un M-estimateur.
- **Probabilités (1A)** : espérance conditionnelle, Fubini-Tonelli, convergence dominée, inégalité de Markov.

**Suites :**
- **Chapitre 9 (Approche discriminative, minimisation du risque empirique)** : on renonce à modéliser la loi ; on choisit une classe de règles et une perte ; risque empirique $\widehat R_n$ (Déf. 4.1), sur-apprentissage, décomposition approximation/estimation (§4.6), perte logistique et moindres carrés comme pertes de substitution (déjà rencontrées en (12) et au Cadre 1.4) ; la LGN ponctuelle ne suffit pas pour une règle choisie au vu des données.
- **Chapitre 10** : pénalisation, sélection de modèles (crible, validation), garanties théoriques sur $R(\widehat g_n)-R(g^\star)$ (troisième « question » de la p. 11).
- Fil rouge : le **risque bayésien** $R^\star$ est la référence de tous les résultats de consistance ; la **fonction de régression** $\eta$ et la formule d'excès de risque (4) servent constamment.

---

## 7. Idées de visualisations interactives pertinentes pour ce chapitre

1. **Classifieur bayésien 1D (Figure 2, Ex. 1.6)** : deux densités de classe gaussiennes (curseurs $\mu_1$, $\mu_{-1}$, $\sigma_1$, $\sigma_{-1}$, $p$) ; tracer $p\,q_1$ et $(1-p)\,q_{-1}$, la courbe $\eta(x)$, la ligne $1/2$, les zones de décision de $g^\star$ ; afficher $R^\star_{01}=\mathbb{E}[\min(\eta,1-\eta)]$ (aire du recouvrement). Montrer le seuil au milieu pour $p=1/2$, $\sigma_1=\sigma_{-1}$, son déplacement sinon, et l'apparition de deux seuils (QDA) quand les variances diffèrent.
2. **Excès de risque (4) en direct** : l'utilisateur déplace un seuil $t$ (règle $g_t$) ; surligner la zone $\{g_t\ne g^\star\}$ pondérée par $|2\eta(x)-1|$ ; afficher $R_{01}(g_t)-R^\star_{01}$ comme l'aire de cette zone ; comparer avec la borne $2\,\mathbb{E}[|\eta^\star-\tilde\eta|]$ (Prop. 4.2).
3. **Pythagore de la régression (Th. 1.1)** : nuage $(X,Y)$ avec $\mathbb{E}[Y\mid X=x]$ non linéaire ; l'utilisateur dessine/paramètre $g$ ; barres empilées « erreur incompressible » + « distance à $g^\star$ » = risque de $g$.
4. **LDA vs QDA en 2D (Figures 3–5)** : simuler deux nuages gaussiens (covariances réglables, $n$ réglable) ; afficher les estimations $\widehat\mu_{i,n}$, $\widehat\Sigma_{i,n}$ (ellipses), frontières LDA (droite) et QDA (conique), points mal classés en croix ; erreur empirique d'apprentissage vs erreur de test vs $R^\star$.
5. **Sigmoïde et modèle logistique (Cadre 1.3, Ex. 1.4)** : curseurs $a,b$ de $\mathrm{sigm}(a+bx)$ ; seuil d'âge $-a/b$ ; nuage de données $\pm1$ simulé ; trajectoire de minimisation de la perte logistique (12) et frontière $\theta^\top\mathbf{x}=0$ en 2D.
6. **Consistance de la règle *plug-in* et mauvaise spécification (Prop. 1.5)** : Monte-Carlo de $\mathbb{E}_{n,\theta^\star}[R_{01}(\widehat g_n)]-R^\star$ en fonction de $n$ pour LDA quand le modèle est vrai (tend vers 0) vs quand les données ne sont pas gaussiennes / covariances différentes (plateau $>0$).
7. **Double aléa** : pour un $\mathcal{D}_n$ tiré, afficher $R_{01}(\widehat g_n)$ (v.a.) ; répéter le tirage de $\mathcal{D}_n$ pour construire l'histogramme de $R_{01}(\widehat g_n)$ et sa moyenne (risque moyen), avec $R^\star$ en référence.
8. **(Compléments) Sur-apprentissage et compromis (Figures 8–9)** : $k$-PPV ou polynômes de degré $k$ (méthode du crible) ; courbes d'erreur d'apprentissage et de validation (*hold-out*) en fonction de la complexité ; règle $g_{\mathrm{bad},n}$ (risque empirique nul, risque réel élevé).
9. **(Compléments) Perceptron pas à pas (Ex. 4.3)** : données 2D séparables ou non ; animation des mises à jour $\mathbf{w}_{t+1}=\mathbf{w}_t+\gamma Y_{K_t}\mathbf{X}_{K_t}$ sur les exemples mal classés ; convergence dans le cas séparable, oscillations sinon.
10. **Projection orthogonale (Figure 6, Th. 2.2)** : vue 3D d'un vecteur $Z$, d'un plan $\mathcal{H}$, de $P_{\mathcal{H}}Z$ et de l'angle droit ; lien avec $\mathbb{E}[Y\mid\mathbf{X}]$ comme projection sur les fonctions de $\mathbf{X}$.
