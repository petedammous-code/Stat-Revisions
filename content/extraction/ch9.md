# Chapitre 9 — Approche discriminative et minimisation du risque empirique

> **Sources extraites :** `S9_APM41033-Week9-Cours` (poly p. 5–26 : introduction p. 5–6, §1 « Les fondamentaux » p. 7–26), `S9_APM41033-Week9-Maths` (§2 « Les outils mathématiques », p. 27–32), `S9_APM41033-Week9-Compléments` (§4 « Les compléments », p. 34–40, **hors programme d'examen** : « Les contenus de cette partie ne sont pas exigibles »).
> **Pas de fichier « Exercices » extrait pour ce chapitre** : la §1.5 du poly (p. 25–26) décrit seulement le « programme des exercices » (7 exercices de la feuille PC9). Les énoncés/corrigés existent dans `content/sources/S9_APM-41033-EP-PC9-enonce.txt` / `S9_APM-41033-EP-PC9-corrige.txt` (PDF `S9_APM-41033-EP-PC9-*.pdf`) mais **n'ont pas été extraits ici** (hors du périmètre de cette tâche) ; voir §4, qui reproduit le programme et tous les résultats d'exercices cités dans le cours.
> **Numérotation du poly :** les éléments encadrés sont numérotés « N.M » où N est la *section* du chapitre : §1 « Les fondamentaux » (Méthodes 1.1–1.2, Définitions 1.1–1.3, Exemples 1.1–1.3, Propositions 1.1–1.3, Théorèmes 1.1–1.8, Lemme 1.1), §2 « Les outils mathématiques » (Proposition 2.1, Définition 2.1, Proposition 2.2, Théorème 2.1, Corollaire 2.1), §4 « Les compléments » (Définitions 4.1–4.2, Théorèmes 4.1–4.2, Lemmes 4.1–4.2, Corollaire 4.1). Il n'y a **pas de §3** dans les fichiers fournis (la §3 serait la feuille de PC ; la page 33 est absente). Les équations sont numérotées **(1)–(4)** (toutes dans la partie Cours). On cite donc « Poly ch.9, Th. 1.5 », « Poly ch.9, éq. (2) ».
> **Pages :** pagination du poly complet (en-têtes de page). PDF Cours : page PDF $k$ = page poly $k+4$ (p. 5–26) ; PDF Maths : page PDF $k$ = page poly $k+26$ (p. 27–32) ; PDF Compléments : page PDF $k$ = page poly $k+33$ (p. 34–40).
> **ATTENTION — collisions de numérotation avec les autres chapitres.** Le poly renvoie très souvent à des résultats d'autres chapitres portant **le même numéro** qu'un résultat du ch.9. Règle de lecture (vérifiée par le contexte et par la §2.9 du poly, « Les résultats antérieurs mobilisés ») :
> - « définitions 1.1, 1.2, 1.3, 1.4 » invoquées pour **règle de décision, perte, risque, risque bayésien** = **ch.8** (≠ Déf. 1.1–1.3 du ch.9 = risque empirique/MRE, classifieur doux, $\varphi$-risque) ; « cadre 1.1 » = **ch.8** ;
> - « théorème 1.1 » (prédicteur bayésien $\mathbb{E}[Y\mid\mathbf X]$) et « théorème 1.2 » (classifieur bayésien $2\mathbb{1}_{\{\eta(\mathbf X)\ge1/2\}}-1$) = **ch.8** (≠ Th. 1.1 du ch.9 = *no free lunch*, Th. 1.2 du ch.9 = lien erreur d'estimation / processus empirique) ;
> - « proposition 1.5 » (excès de risque de la règle plug-in, PC8 ex. 2) = **ch.8** ; « proposition 2.5 » (conditionnement par une variable indépendante) = **ch.8** ; « équation (12) » (critère de l'EMV logistique) = **ch.8** ; « figure 9 » (compromis approximation/estimation) = **ch.8** ; « Section 1.3, 4.3, 4.4, 4.6 du chapitre 8 » ;
> - « théorème 2.1 » invoqué comme **loi des grands nombres** = **ch.7** (≠ Th. 2.1 du ch.9 = inégalité de Hoeffding pour variables bornées) ; « théorème 1.2 » du ch.7 = **LGN uniforme** ;
> - « théorème 1.6 » invoqué comme **TCL** = **ch.6** (≠ Th. 1.6 du ch.9 = contrôle en grande probabilité de l'erreur d'estimation) ; « lemme 2.1 » (Markov/BT rappelées) = ch.6 ;
> - « proposition 2.1 » invoquée pour **Markov / Bienaymé-Tchebychev** = **ch.2** (≠ Prop. 2.1 du ch.9 = borne de Chernoff) ; « lemme 2.2 » (droite d'appui) et « théorème 2.2 » (Jensen) = ch.2 ;
> - « proposition 2.2 » invoquée pour la **dérivation sous le signe intégral** = **ch.3** (≠ Prop. 2.2 du ch.9 = sommes et déviations de variables sous-gaussiennes) ;
> - « théorème 3.1 » (énoncé de Hoeffding admis) et « Section 5 » (inégalités de Chernoff) = **ch.4**.
> **Renvois au « deck »** (transparents du cours) et au « **polycopié d'origine** » (version antérieure du poly) : ce ne sont pas des numéros du présent poly.

---

## 0. Résumé en 10 lignes (ce qu'il faut retenir pour l'examen)

1. **Deux approches.** Modélisation (ch.8, Méthode 1.1) : modèle $\{\mathbb{P}_\theta\}$ → prédicteur de Bayes $g^\star_\theta$ → estimer $\hat\theta_n$ → plug-in $\widehat g_n=g^\star_{\hat\theta_n}$ ; garanties **sous le modèle seulement**. **Approche discriminative** : on ne modélise pas la loi, on choisit une perte $\ell$ et une **classe** $\mathcal C$ de règles ; *le choix de la classe joue le rôle du choix du modèle*.
2. **Risque empirique et MRE (Déf. 1.1)** : $\widehat{\mathrm R}_n(g)=\frac1n\sum_{i=1}^n\ell(Y_i,g(\mathbf X_i))$, $\hat g^*_{n,\mathcal C}\in\arg\min_{g\in\mathcal C}\widehat{\mathrm R}_n(g)$. Pour $g$ **fixée** : sans biais ($\mathbb{E}[\widehat{\mathrm R}_n(g)]=R(g)$) et convergent (LGN). Pour $\hat g^*_{n,\mathcal C}$ **choisie au vu des données** : plus vrai.
3. **Sur-apprentissage** : avec $\mathcal C=\mathbb{R}^{\mathsf X}$ (Ex. 1.1) on a $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})=0$ mais $R(\hat g^*_{n,\mathcal C})=\mathbb{E}[Y^2]$. Affines (sous-apprentissage) / $\mathbb{R}_3[X]$ (compromis) / $\mathbb{R}_{20}[X]$ (sur-apprentissage). En pratique : **validation / validation croisée** (Méthode 1.2).
4. **Décomposition (1)** : $\mathcal E(\hat g_{n,\mathcal C})=\underbrace{R(\hat g_{n,\mathcal C})-R(g^*_{\mathcal C})}_{\text{estimation}}+\underbrace{R(g^*_{\mathcal C})-R^\star}_{\text{approximation}}$ ; $\mathcal C\uparrow$ : approximation $\downarrow$, estimation tend à $\uparrow$ ; $n\uparrow$ : approximation inchangée, estimation tend à $\downarrow$.
5. **Biais optimiste (Prop. 1.1)** : $\mathbb{E}[\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})]\le\inf_{g\in\mathcal C}R(g)\le\mathbb{E}[R(\hat g^*_{n,\mathcal C})]$. **No free lunch (Th. 1.1)** : $\mathsf X$ infini, perte 0–1 : pour toute règle, tout $n$, tout $\varepsilon>0$, il existe $\mathbb P$ avec $R^\star=0$ et $\mathbb{E}[R(\widehat g_n)]\ge\frac12-\varepsilon$ ⇒ **aucune garantie sans hypothèse**.
6. **Th. 1.2 (clé)** : $\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})\le2\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|$ p.s. (2), et en espérance **sans le facteur 2** : $\mathbb{E}[\mathcal E^{\mathcal C}_{\mathrm{est}}]\le\mathbb{E}[\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|]$ (3).
7. **Hoeffding (Th. 1.3)** : $X_i\in[0,1]$ indépendantes ⇒ $\mathbb{P}(|\frac1n\sum\{X_i-\mathbb{E}X_i\}|\ge\varepsilon)\le2e^{-2n\varepsilon^2}$ (unilatéral : $e^{-2n\varepsilon^2}$) ; forme « $\delta$ » (Th. 1.4) : écart $\le\sqrt{\ln(2/\delta)/(2n)}$ avec proba $\ge1-\delta$ ; $n\ge\ln(2/\delta)/(2\varepsilon^2)$. Preuve : **Chernoff + lemme de Hoeffding** ($\mathbb{E}[e^{\lambda X}]\le e^{\lambda^2(b-a)^2/8}$, Lemme 1.1) + **indépendance** (produit des transformées de Laplace).
8. **Classe finie, perte 0–1** : **borne de l'union** + Hoeffding ⇒ $\mathbb{P}(\sup_{g}|\widehat{\mathrm R}_n(g)-R(g)|>\varepsilon)\le2|\mathcal C|e^{-2n\varepsilon^2}$ (Th. 1.5) ⇒ **en grande probabilité** $\mathcal E^{\mathcal C}_{\mathrm{est}}\le2\sqrt{\log(2|\mathcal C|/\delta)/(2n)}$ (Th. 1.6) ; **en espérance** via **Pisier** ($\mathbb{E}[\max_i|Z_i|]\le\sigma\sqrt{2\log(2m)}$, Th. 1.7, $Z_j$ sous-gaussiennes de facteur $1/(4n)$) : $\mathbb{E}[R(\hat g^*_{n,\mathcal C})-R(g^*_{\mathcal C})]\le\sqrt{\log(2|\mathcal C|)/(2n)}$ (Th. 1.8). Dépendance en $\log|\mathcal C|$ et $1/\sqrt n$.
9. **Classe infinie** : classifieurs affines sur $\mathbb{R}^d$ → classe finie $\mathcal C_n$ d'au plus $2\binom nd$ hyperplans passant par $d$ points ⇒ borne $\frac{2d}{n}+2\sqrt{\log((2\binom nd+1)/\delta)/(2(n-d))}=O(\sqrt{d\log(n)/n})$ (Prop. 1.2).
10. **Convexification (§1.4)** : la perte 0–1 rend le MRE **combinatoire** (risque empirique constant par morceaux). Marge $Y g(\mathbf X)$ ; classifieur doux $h:\mathsf X\to\mathbb{R}$, dur $\operatorname{signe}(h)$ ; perte convexe $\varphi$ croissante, $\varphi(0)=1$, $\varphi\ge\varphi_1=\mathbb{1}_{[0,+\infty[}$ (charnière $\max(1+z,0)$, exponentielle $e^z$, logistique $\log_2(1+e^z)$) ; $\varphi$-risque $R_\varphi(h)=\mathbb{E}[\varphi(-Yh(\mathbf X))]$ **majore** le risque 0–1 (Prop. 1.3). Cas logistique linéaire = EMV logistique (au facteur $1/\log2$), convexe en $\theta$ (Ex. 1.3).

---

## 1. Notations et symboles

> **Notations particulières du poly à reproduire fidèlement :**
> - **Gras / sans-serif** : la variable d'attributs aléatoire est en **gras** $\mathbf X$ (et ses réalisations $\mathbf x$, $\mathbf x_i$), la réponse $Y$ en italique ; les **ensembles** d'attributs et de réponses sont en **sans-serif** $\mathsf X$, $\mathsf Y$. Ne pas confondre $\mathbf X$ (v.a.) et $\mathsf X$ (ensemble). Les vecteurs de paramètres du ch.9 sont aussi en gras dans la Prop. 1.2 : $(\mathbf a,b)\in\mathbb{R}^d\times\mathbb{R}$, $\mathbf a^\top\mathbf x+b$.
> - **Loi du couple** : $(\mathbf X,Y)\sim\mathbb{P}$ (lettre ajourée), espérance $\mathbb{E}$ ; dans l'approche par modélisation : $\{\mathbb{P}_\theta:\theta\in\Theta\}$, $\mathbb{P}_{n,\theta^\star}$, $\mathbb{E}_{n,\theta^\star}$ (notations du ch.8).
> - **Risque empirique avec R droit et chapeau large** : $\widehat{\mathrm R}_n(g)$ (dans le poly « $\widehat{\mathrm{R}}_n$ », R romain), mais le risque de généralisation est en italique $R(g)$. L'erreur de validation de l'exercice 1 est notée $\widehat R_{n,m}$ (R italique) et le risque de validation de la Méthode 1.2 $\widehat{\mathrm R}^{(\mathrm{val})}_n$.
> - **Deux étoiles différentes** : étoile pleine $\star$ pour l'objet **bayésien** ($g^\star$, $R^\star$, $g^\star_\theta$, $\theta^\star$) ; astérisque $*$ pour l'**oracle de la classe** $g^*_{\mathcal C}$ et le **minimiseur du risque empirique** $\hat g^*_{n,\mathcal C}$ (petit chapeau). Un estimateur quelconque de la classe est noté $\hat g_{n,\mathcal C}$ (sans étoile) ; une règle apprise générique $\widehat g_n$ (chapeau large).
> - **Excès de risque** : $\mathcal E(\widehat g_n):=R(\widehat g_n)-R^\star$ (E calligraphique) ; **erreur d'estimation** $\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g_{n,\mathcal C}):=R(\hat g_{n,\mathcal C})-R(g^*_{\mathcal C})$.
> - **Indicatrice** $\mathbb{1}_{\{\cdot\}}$ (1 ajouré) ; $\varphi_1:=\mathbb{1}_{[0,+\infty[}$ (intervalles à la française $]a,b[$, $[0,+\infty[$, $]0,1[$).
> - **Signe** : $\operatorname{signe}(t)=2\operatorname{heaviside}(t)-1$ avec $\operatorname{heaviside}(t)=1$ si $t>0$ et $0$ sinon : donc $\operatorname{signe}(0)=-1$ (convention du ch.8).
> - **Logarithmes** : $\log$ = logarithme népérien (le poly écrit $\ln$ dans le Th. 1.4 et ses remarques, $\log$ ailleurs, même objet) ; $\log_2$ uniquement dans la perte logistique.
> - **Exponentielle** : le poly écrit $\mathrm{e}^{x}$ (e droit) ; on écrit ici $e^{x}$.
> - **Ensemble des règles** : $\mathsf Y^{\mathsf X}$ (toutes les règles), $\mathbb{R}^{\mathsf X}$ en régression ; polynômes $\mathbb{R}_3[X]$, $\mathbb{R}_{20}[X]$.
> - **Sous-gaussiennes** : $\mathcal G(v)$ (G calligraphique) ; $\psi_X(\lambda)=\log\mathbb{E}[e^{\lambda X}]$ ; loi « basculée » $\widetilde{\mathbb P}_\lambda$, $\widetilde{\mathbb E}_\lambda$, $\widetilde{\mathrm{Var}}_\lambda$.
> - **Collision de lettres** : $D_n:=\sum_i(b_i-a_i)^2$ (Th. 2.1, D droit italique) ≠ $\mathcal D_n$ (ensemble d'apprentissage, D calligraphique) ; $\Phi$ = transformation des attributs (Ex. 1.2) **et** $\Phi$ = fonction de répartition de $\mathcal N(0,1)$ (remarques sur Hoeffding) ; $\psi_i$ (fonctions réelles de l'Ex. 1.2) ≠ $\psi_X$ (cumulants) ; $C$ (constante du Lemme 4.1) ≠ $\mathcal C$ (classe).

| Symbole LaTeX | Signification | Première apparition |
|---|---|---|
| $(\mathbf X,Y)\sim\mathbb{P}$, à valeurs dans $\mathsf X\times\mathsf Y$ | couple attribut/réponse (cadre 1.1 du ch.8) | §1.1, p. 7 |
| $g:\mathsf X\to\mathsf Y$ | règle de décision / prédicteur / classifieur (mesurable) | §1.1, p. 7 |
| $\ell(Y,g(\mathbf X))$ | perte | §1.1, p. 7 |
| $R(g)=\mathbb{E}[\ell(Y,g(\mathbf X))]$ | risque (de généralisation) | §1.1, p. 7 |
| $g^\star$, $R^\star=R(g^\star)$ | prédicteur bayésien, risque bayésien | §1.1, p. 7 |
| $\eta(\mathbf X)$ | $\mathbb{P}(Y=1\mid\mathbf X)$ (classifieur bayésien $2\mathbb{1}_{\{\eta(\mathbf X)\ge1/2\}}-1$) | §1.1, p. 7 |
| $\mathcal D_n=\{(\mathbf X_1,Y_1),\dots,(\mathbf X_n,Y_n)\}$ | ensemble d'apprentissage ($n$ couples i.i.d. de loi $\mathbb P$) | §1.1, p. 7 |
| $\widehat g_n$ | règle apprise à partir de $\mathcal D_n$ | §1.1, p. 7 |
| $\mathcal E(\widehat g_n):=R(\widehat g_n)-R^\star$ | excès de risque de généralisation | §1.1, p. 7 |
| $R(\widehat g_n)=\mathbb{E}[\ell(Y,\widehat g_n(\mathbf X))\mid\mathcal D_n]$ | risque de la règle apprise (v.a., fonction de $\mathcal D_n$) | §1.1, p. 7 |
| $\{\mathbb P_\theta:\theta\in\Theta\}$, $g^\star_\theta$, $\hat\theta_n$, $g^\star_{\hat\theta_n}$ | modèle, prédicteur de Bayes sous $\mathbb P_\theta$, estimateur, règle plug-in | Méthode 1.1, p. 8 |
| $\operatorname{sigm}(\theta^\top\mathbf X)$ | $\mathbb P_\theta(Y=1\mid\mathbf X)$ (modèle logistique) | §1.1, p. 8 |
| $\mathcal L(Y\mid\mathbf X)=\mathcal N(\theta^\top\mathbf X,\sigma^2)$ | modèle linéaire gaussien homoscédastique | §1.1, p. 8 |
| $\mathbb{P}_{n,\theta^\star}$, $\mathbb{E}_{n,\theta^\star}$ | loi / espérance de l'échantillon sous $\theta^\star$ | §1.1, p. 8 |
| $\mathcal C$ | classe de règles de décision | Déf. 1.1, p. 8 |
| $\widehat{\mathrm R}_n(g):=\frac1n\sum_{i=1}^n\ell(Y_i,g(\mathbf X_i))$ | risque empirique | Déf. 1.1, p. 8 |
| $\hat g^*_{n,\mathcal C}=\arg\min_{g\in\mathcal C}\widehat{\mathrm R}_n(g)$ | minimiseur du risque empirique (MRE) sur $\mathcal C$ | Déf. 1.1, p. 9 |
| $\hat g^*_{n,\mathcal C}(\mathbf x)=g(\mathbf x;\mathcal D_n)$ | écriture comme règle apprise | §1.2, p. 9 |
| $\mathsf Y^{\mathsf X}$, $\mathbb{R}^{\mathsf X}$ | ensemble de toutes les règles | §1.2, p. 9 |
| $\mathbb{R}_3[X]$, $\mathbb{R}_{20}[X]$ | polynômes de degré $\le3$, $\le20$ | §1.2, p. 9–10 |
| $d$ | nombre de paramètres de la classe (dimension) ; plus loin dimension de $\mathsf X=\mathbb{R}^d$ | §1.2, p. 10 |
| $\mathcal C_1,\dots,\mathcal C_K$ | classes candidates | Méthode 1.2, p. 11 |
| $\mathcal D_{\mathrm{fit}}$, $\mathcal D_{\mathrm{val}}$ | ensemble d'ajustement, ensemble de validation | Méthode 1.2, p. 11 |
| $\widehat{\mathrm R}^{(\mathrm{val})}_n(\hat g^*_{n,\mathcal C_i})$ | risque de validation | Méthode 1.2, p. 11 |
| $g_n$, $\widehat R_{n,m}$, $m$ | règle construite sur $\mathcal D_n$, erreur de validation sur $m$ couples indépendants | §1.2, p. 11 (PC9 ex. 1) |
| $g^*_{\mathcal C}$ : $R(g^*_{\mathcal C})=\inf_{g\in\mathcal C}R(g)$ | oracle de la classe | §1.2, p. 11 |
| $\hat g_{n,\mathcal C}\in\mathcal C$ | estimateur (règle de $\mathcal C$ construite sur $\mathcal D_n$) | §1.2, p. 11 |
| $\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g_{n,\mathcal C}):=R(\hat g_{n,\mathcal C})-R(g^*_{\mathcal C})$ | erreur d'estimation | éq. (1), p. 11 |
| $R(g^*_{\mathcal C})-R^\star$ | erreur d'approximation | éq. (1), p. 11 |
| $g^{Bayes}$ | notation de $g^\star$ sur la figure 4 | Fig. 4, p. 12 |
| $\ell(y,y')=\mathbb{1}_{\{y\ne y'\}}$ | perte 0–1 | §1.2, p. 13 |
| $g_\varepsilon$ | règle $\varepsilon$-optimale de $\mathcal C$ : $R(g_\varepsilon)\le\inf_{\mathcal C}R+\varepsilon$ | preuve Th. 1.2, p. 15 |
| $\Delta_{n,\delta}(\mathcal C)$ | borne en grande probabilité de l'erreur d'estimation | §1.3, p. 16 |
| $\delta$, $\varepsilon$ | confiance (proba d'échec), précision | §1.3, p. 16–18 |
| $\Phi$ | fonction de répartition de $\mathcal N(0,1)$ | Remarques Th. 1.3, p. 17 |
| $\sigma^2$ (facteur sous-gaussien) | $\mathbb{E}[e^{\lambda Z}]\le e^{\lambda^2\sigma^2/2}$ | p. 17 |
| $Z_j=\widehat{\mathrm R}_n(g_j)-R(g_j)$ | déviations pour une classe finie $\mathcal C=\{g_j\}_{j=1}^{\lvert\mathcal C\rvert}$ | p. 18, p. 20 |
| $\lvert\mathcal C\rvert$ | cardinal de la classe | Th. 1.5, p. 18 |
| $\mathcal C_n\subset\mathcal C$ | classifieurs affines dont l'hyperplan passe par $d$ points de $\mathcal D_n$ (cardinal $\le2\binom nd$) | Prop. 1.2, p. 21 |
| $\mathsf Y=\{-1,1\}$ | labels binaires | §1.4, p. 22 |
| $Y g(\mathbf X)$ | marge de la prédiction | §1.4, p. 22 |
| $\varphi_1:=\mathbb{1}_{[0,+\infty[}$ | perte 0–1 écrite en fonction de $-g(\mathbf X)Y$ | §1.4, p. 22 |
| $\operatorname{signe}(t)=2\operatorname{heaviside}(t)-1$ | signe ($\operatorname{heaviside}(t)=\mathbb{1}_{\{t>0\}}$) | §1.4, p. 22 |
| $h:\mathsf X\to\mathbb{R}$ | classifieur doux ; $\operatorname{signe}(h)$ = classifieur dur | Déf. 1.2, p. 22 |
| $h_\theta$, $\theta_0,\theta_i$, $x^{(i)}$ | classifieur doux linéaire/affine, coordonnées de $\mathbf x$ | Ex. 1.2, p. 22 |
| $\Phi(\mathbf x)$, $\psi_1,\dots,\psi_d$ | transformation des attributs (linéaire généralisé) | Ex. 1.2, p. 22 |
| $\varphi$ | perte convexe (substitut) | §1.4, p. 23 |
| $R_\varphi(h):=\mathbb{E}[\varphi(-Yh(\mathbf X))]$ | $\varphi$-risque | Déf. 1.3, p. 23 |
| $\widehat{\mathrm R}_{n,\varphi}(h):=\frac1n\sum_{i=1}^n\varphi(-Y_ih(\mathbf X_i))$ | $\varphi$-risque empirique | Déf. 1.3, p. 23 |
| $\hat g_{n,\mathcal C,\varphi}$, $g^*_{\mathcal C,\varphi}$ | minimiseur empirique / oracle pour le $\varphi$-risque | §1.4, p. 25 |
| $\psi(\lambda)=\log\mathbb{E}[e^{\lambda(Z-\mathbb{E}Z)}]$ | log-transformée de Laplace centrée | Prop. 2.1, p. 27 |
| $\mathcal G(v)$, $\psi_X(\lambda):=\log\mathbb{E}[e^{\lambda X}]$ | variables sous-gaussiennes de facteur $v$ ; fonction génératrice des cumulants | Déf. 2.1, p. 28 |
| $\widetilde{\mathbb P}_\lambda$, $\widetilde{\mathbb E}_\lambda$, $\widetilde{\mathrm{Var}}_\lambda$ | loi de densité $e^{\lambda X}/\mathbb{E}[e^{\lambda X}]$ par rapport à $\mathbb P$ | preuve Lemme 1.1, p. 29 |
| $S_n:=\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}$, $D_n:=\sum_{i=1}^n(b_i-a_i)^2$ | somme centrée, somme des carrés des longueurs | Th. 2.1, p. 29 |
| $A_j$, $B_j$, $A_g$ | événements de la borne de l'union | §2.6, p. 30 |
| $r(d)$ | risque de la règle fixée $\hat g(\cdot\,;d)$ | §2.8, p. 31 |
| $\mathbb P_{\mathbf b}$, $\mathbb E_{\mathbf b}$, $\mathbf b\in\{-1,1\}^K$ | lois de la preuve du NFL (compléments) | §4.1, p. 34 |
| $(\varepsilon,\delta)$-PAC | règle probablement approximativement correcte | Déf. 4.1, p. 35 |
| $Q_1,\dots,Q_m$ | partition (histogrammes) | §4.3, p. 36 |
| $c_1,\dots,c_n$ ; $H_i$, $V_i$, $\mu_i$ | constantes de différences bornées ; martingale de Doob (McDiarmid) | §4.5, p. 38 |
| $h_{I,z}$, $(\mathbf a_I,b_I)$, $\widehat{\mathrm R}^I_n$ | classifieurs de $\mathcal C_n$, risque empirique hors de $I$ | §4.6, p. 39–40 |

---

## 2. Cours — contenu principal

### Remarque (introduction, non numérotée) — De la modélisation à la minimisation du risque empirique
**Source :** Poly ch.9, introduction, p. 5–6
**Hypothèses :** cadre de l'apprentissage supervisé du ch.8.
**Énoncé :** Le ch.8 a décrit une première voie (modéliser la loi de $(\mathbf X,Y)$, estimer, substituer dans la règle de Bayes). Le ch.9 étudie la **seconde voie, dite discriminative**, « approche principale de l'apprentissage statistique » : on ne modélise plus la loi des données ; on choisit une classe $\mathcal C$ de règles et l'on retient celle qui commet, en moyenne, la plus petite perte sur l'ensemble d'apprentissage (**minimisation du risque empirique**). Plan annoncé : définition et exemples ; compromis (décomposition de l'excès de risque en erreur d'approximation + erreur d'estimation, sur-apprentissage, *no free lunch*) ; contrôle de l'erreur d'estimation par les **déviations uniformes** du risque empirique, contrôlées pour une classe finie et la perte 0–1 par **Hoeffding + borne de l'union** ⇒ bornes en grande probabilité et en espérance d'ordre $\sqrt{\log|\mathcal C|/n}$ ; enfin **risque convexifié** (la MRE 0–1 est combinatoire).
Constat de départ : le ch.8 a montré que, pour le modèle logistique et le modèle linéaire gaussien, l'EMV **minimise une moyenne empirique de pertes** (perte logistique, perte quadratique) ; la règle obtenue se décrit donc **sans référence au modèle** : c'est la règle d'une classe de fonctions linéaires qui minimise une perte moyenne sur l'ensemble d'apprentissage. L'approche discriminative part de là : « Le choix de la classe joue alors le rôle que jouait le choix du modèle : il porte l'hypothèse qui rend l'apprentissage possible. »
**Preuve (étapes) :** — (texte de présentation)
**Intuition :** (poly, p. 6) « Le passage d'une approche à l'autre **déplace l'hypothèse**. » En modélisation, on suppose que la loi appartient à une famille paramétrique et l'on obtient des garanties sous cette loi. En MRE, on ne suppose rien sur la loi, mais on ne compare plus la règle apprise **qu'aux règles de la classe** ; l'écart à la règle de Bayes dépend alors de la qualité de la classe, « sur laquelle les données ne disent rien ».
**Pièges / erreurs classiques :** croire que la MRE est « sans hypothèse » : l'hypothèse est reportée sur la classe (erreur d'approximation), cf. *no free lunch*.

### Remarque (§1.1, non numérotée) — Rappel du cadre de l'apprentissage supervisé
**Source :** Poly ch.9, §1.1, p. 7
**Hypothèses :** $(\mathbf X,Y)\sim\mathbb P$ à valeurs dans $\mathsf X\times\mathsf Y$ (cadre 1.1 du ch.8).
**Énoncé (rappels du ch.8) :**
- **règle de décision** (prédicteur, classifieur) : fonction mesurable $g:\mathsf X\to\mathsf Y$ (déf. 1.1 du ch.8) ;
- **perte** $\ell(Y,g(\mathbf X))$ (déf. 1.2 du ch.8) ;
- **risque** (de généralisation) $R(g)=\mathbb{E}[\ell(Y,g(\mathbf X))]$ (déf. 1.3 du ch.8) ;
- **prédicteur bayésien** $g^\star$ : $R(g^\star)\le R(g)$ pour toute $g$ ; **risque bayésien** $R^\star=R(g^\star)$ (déf. 1.4 du ch.8). En régression, perte quadratique : $g^\star(\mathbf X)=\mathbb{E}[Y\mid\mathbf X]$ (th. 1.1 du ch.8) ; en classification binaire, perte 0–1 : $g^\star(\mathbf X)=2\mathbb{1}_{\{\eta(\mathbf X)\ge1/2\}}-1$ (th. 1.2 du ch.8).
- On observe $\mathcal D_n=\{(\mathbf X_1,Y_1),\dots,(\mathbf X_n,Y_n)\}$, $n$ couples **indépendants de loi $\mathbb P$**, et l'on construit une règle $\widehat g_n$. Objectif : contrôler l'**excès de risque de généralisation**
$$\mathcal E(\widehat g_n):=R(\widehat g_n)-R^\star=\mathbb{E}\big[\ell(Y,\widehat g_n(\mathbf X))\,\big|\,\mathcal D_n\big]-R^\star,$$
où $(\mathbf X,Y)$ est un couple de loi $\mathbb P$ **indépendant de $\mathcal D_n$**. $R(\widehat g_n)$ est une **variable aléatoire**, fonction de $\mathcal D_n$ (risque de la règle apprise évalué sur un exemple nouveau). D'après la proposition 2.5 (du ch.8), il s'obtient en calculant $R(g)$ pour une règle $g$ fixée puis en remplaçant $g$ par $\widehat g_n$.
**Figure 1 (p. 7) :** deux ensembles d'apprentissage avec un attribut réel : régression (réponse réelle) et classification binaire (réponse $\pm1$).
**Preuve (étapes) :** rappels.
**Intuition :** le risque de la règle apprise se calcule en « gelant » $\mathcal D_n$ (voir Outils §2.8).
**Pièges / erreurs classiques :** $R(\widehat g_n)$ n'est pas un nombre mais une v.a. ; $\mathbb{E}[R(\widehat g_n)]$ est le risque moyen.

### Méthode 1.1 — Construction d'un estimateur par modélisation statistique et substitution
**Source :** Poly ch.9, Méthode 1.1, p. 8
**Hypothèses :** cadre supervisé ; approche du ch.8 (Section 1.3).
**Énoncé :**
1. On **modélise** la loi de $(\mathbf X,Y)$ par un modèle paramétrique $\{\mathbb P_\theta:\theta\in\Theta\}$.
2. On calcule le prédicteur de Bayes $g^\star_\theta$ sous chacune des lois $\mathbb P_\theta$.
3. On estime $\theta$ par $\hat\theta_n$.
4. On choisit la règle $\widehat g_n=g^\star_{\hat\theta_n}$ (substitution, ou *plug-in*).

**Trois exemples rappelés (ch.8, Section 1.3) :**
- **Analyse discriminante linéaire et quadratique** : $\mathbf X\mid Y=i\sim\mathcal N(\mu_i,\Sigma_i)$, $Y$ de Bernoulli ; règle linéaire ou quadratique ; estimateur typique = EMV.
- **Modèle logistique** : $\mathbb P_\theta(Y=1\mid\mathbf X)=\operatorname{sigm}(\theta^\top\mathbf X)$, loi de $\mathbf X$ quelconque ; règle linéaire $\widehat g_n(\mathbf X)=2\mathbb{1}_{\{\hat\theta_n^\top\mathbf X\ge0\}}-1$ ; EMV conditionnel aux $\mathbf X_i$ :
$$\hat\theta_n=\arg\min_{\theta\in\mathbb{R}^d}\frac1n\sum_{i=1}^n\log\big(1+\exp(-Y_i\theta^\top\mathbf X_i)\big).$$
- **Modèle linéaire gaussien homoscédastique** : $\mathcal L(Y\mid\mathbf X)=\mathcal N(\theta^\top\mathbf X,\sigma^2)$ ; $g^\star_\theta(\mathbf X)=\theta^\top\mathbf X$ ; EMV = moindres carrés
$$\hat\theta_n=\arg\min_{\theta\in\mathbb{R}^d}\frac1n\sum_{i=1}^n\big(\theta^\top\mathbf X_i-Y_i\big)^2,$$
règle $\widehat g_n(\mathbf X)=\hat\theta_n^\top\mathbf X$. « Utiliser ce modèle revient à utiliser la perte des moindres carrés et une classe de fonctions linéaires. »
- Autres méthodes de la même démarche (non paramétriques, règles non linéaires) : **classifieur bayésien naïf**, **$k$ plus proches voisins**.

**Résultat typique (proposition 1.5 du ch.8, établie à l'exercice 2 de la PC8) :** sous $\mathbb P_{n,\theta^\star}$, si $\hat\theta_n$ est consistant et sous des conditions de continuité,
$$\mathbb{E}_{n,\theta^\star}\Big[\mathcal E\big(g^\star_{\hat\theta_n}\big)\Big]=\mathbb{E}_{n,\theta^\star}\Big[R\big(g^\star_{\hat\theta_n}\big)-R\big(g^\star_{\theta^\star}\big)\Big]\xrightarrow[n\to\infty]{}0.$$
**Preuve (étapes) :** renvoi au ch.8.
**Intuition :** la règle est un **sous-produit** de l'estimation.
**Pièges / erreurs classiques :** « Ce résultat ne tient que **sous le modèle** » : approche de type statistique ; elle laisse entier le problème du **choix du modèle**.

### Remarque (§1.2, non numérotée) — Idée de l'approche par MRE
**Source :** Poly ch.9, §1.2, p. 8
**Énoncé :** chercher un prédicteur qui soit bon sur l'ensemble d'apprentissage $\{(\mathbf X_i,Y_i)\}_{1\le i\le n}$. Le risque d'une règle n'est pas calculable ($\mathbb P$ inconnue), mais on peut l'estimer à partir des données et **minimiser cette estimation**.

### Définition 1.1 — Risque empirique et minimiseur du risque empirique
**Source :** Poly ch.9, Définition 1.1, p. 8–9
**Hypothèses :** $\ell$ fonction de perte ; $\mathcal C$ classe de règles de décision $g:\mathsf X\to\mathsf Y$ ; $\mathcal D_n$ ensemble d'apprentissage.
**Énoncé :** Le **risque empirique** d'une règle $g$ sur $\mathcal D_n$ est
$$\widehat{\mathrm R}_n(g):=\frac1n\sum_{i=1}^n\ell(Y_i,g(\mathbf X_i)).$$
Un **minimiseur du risque empirique (MRE)** sur $\mathcal C$ est une règle $\hat g^*_{n,\mathcal C}\in\mathcal C$, construite à partir de $\mathcal D_n$, telle que
$$\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})=\min_{g\in\mathcal C}\widehat{\mathrm R}_n(g),\qquad\text{ce que l'on écrit}\qquad\hat g^*_{n,\mathcal C}=\arg\min_{g\in\mathcal C}\widehat{\mathrm R}_n(g).$$
**Compléments du poly (p. 9) :**
- Le minimum **n'est pas toujours atteint** et le minimiseur **n'est pas toujours unique** ; s'il y en a plusieurs, on en considère un.
- **Hypothèses faites dans tout le chapitre** : un minimiseur existe et peut être choisi **de façon mesurable en les données**, de sorte que $\hat g^*_{n,\mathcal C}(\mathbf x)=g(\mathbf x;\mathcal D_n)$ définit une règle apprise au sens du ch.8. Ces deux hypothèses sont satisfaites lorsque $\mathcal C$ est **finie** (cas de la Section 1.3). (Rappelé en §2.10 comme résultat admis.)
- **Pourquoi c'est raisonnable** : pour toute règle $g$ **fixée**, comme $R(g)=\mathbb{E}[\ell(Y,g(\mathbf X))]$ et que les $(\mathbf X_i,Y_i)$ ont la loi $\mathbb P$ :
  - $\widehat{\mathrm R}_n(g)$ est un **estimateur sans biais** de $R(g)$ : $\mathbb{E}[\widehat{\mathrm R}_n(g)]=R(g)$, **par linéarité de l'espérance** ;
  - la **loi des grands nombres** (théorème 2.1 du ch.7) donne $\widehat{\mathrm R}_n(g)\overset{\mathbb P\text{-prob}}{\longrightarrow}R(g)$ dès que $R(g)<\infty$, les variables $\ell(Y_i,g(\mathbf X_i))$ étant **indépendantes, de même loi, positives et intégrables**.
**Preuve (étapes) :** (des deux propriétés) 1. $\mathbb{E}[\widehat{\mathrm R}_n(g)]=\frac1n\sum_i\mathbb{E}[\ell(Y_i,g(\mathbf X_i))]=R(g)$ (linéarité + même loi $\mathbb P$). 2. LGN faible pour les v.a. i.i.d. intégrables $\ell(Y_i,g(\mathbf X_i))$.
**Intuition :** (poly) « L'hypothèse **"$g$ fixée"** est essentielle. » Le minimiseur $\hat g^*_{n,\mathcal C}$ est choisi au vu des données, et son risque empirique **n'est pas une moyenne de variables indépendantes de même loi** : chacun des termes $\ell(Y_i,\hat g^*_{n,\mathcal C}(\mathbf X_i))$ dépend de **tout l'échantillon**. Les deux propriétés ne s'appliquent donc pas à $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})$, « et toute la suite du chapitre consiste à mesurer ce que l'on perd en passant d'une règle fixée à une règle choisie dans $\mathcal C$ à partir des données ».
**Pièges / erreurs classiques :** écrire $\mathbb{E}[\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})]=R(\hat g^*_{n,\mathcal C})$ : **faux** (cf. Prop. 1.1, biais optimiste). Ne pas confondre $\hat g^*_{n,\mathcal C}$ (MRE) et $g^*_{\mathcal C}$ (oracle, non calculable).

### Remarque (§1.2, non numérotée) — Le choix de la classe
**Source :** Poly ch.9, §1.2, p. 9
**Énoncé :** Différentes classes donnent différents estimateurs, et l'on **doit restreindre** la classe de fonctions. Si l'on prend pour $\mathcal C$ l'ensemble $\mathsf Y^{\mathsf X}$ de toutes les règles, le risque empirique se minimise « sans rien apprendre » (Ex. 1.1).

### Exemple 1.1 — Une règle qui ne généralise pas
**Source :** Poly ch.9, Exemple 1.1, p. 9 (et Figure 2, p. 10)
**Hypothèses :** régression, $\mathsf Y=\mathbb{R}$, perte quadratique ; la loi de $\mathbf X$ **n'a pas d'atome** : $\mathbb P(\mathbf X=\mathbf x)=0$ pour tout $\mathbf x\in\mathsf X$.
**Énoncé :** Les attributs $\mathbf X_1,\dots,\mathbf X_n$ sont alors presque sûrement deux à deux distincts, et la règle
$$\hat g^*_{n,\mathcal C}(\mathbf x)=\begin{cases}Y_i&\text{si }\mathbf x=\mathbf X_i,\\0&\text{si }\mathbf x\notin\{\mathbf X_1,\dots,\mathbf X_n\},\end{cases}$$
vérifie $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})=0$ : elle minimise le risque empirique sur $\mathcal C=\mathbb{R}^{\mathsf X}$. Pourtant
$$R(\hat g^*_{n,\mathcal C})=\mathbb{E}\big[(Y-\hat g^*_{n,\mathcal C}(\mathbf X))^2\,\big|\,\mathcal D_n\big]=\mathbb{E}[Y^2],$$
qui est le risque de la **règle constante nulle**. Cette règle **ne généralise pas** : $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})\ll R(\hat g^*_{n,\mathcal C})$. C'est le **sur-apprentissage**. (Le ch.8, Section 4.3, en donne la version en classification.)
**Preuve (étapes) :**
1. Pas d'atome ⇒ $\mathbb P(\mathbf X_i=\mathbf X_j)=0$ pour $i\ne j$ ⇒ la règle est bien définie p.s. (attributs distincts).
2. $\widehat{\mathrm R}_n=\frac1n\sum_i(Y_i-Y_i)^2=0$, minimum possible d'une perte positive ⇒ MRE sur $\mathbb{R}^{\mathsf X}$.
3. Si $(\mathbf X,Y)\sim\mathbb P$ est **indépendant de $\mathcal D_n$**, l'événement $\{\mathbf X\in\{\mathbf X_1,\dots,\mathbf X_n\}\}$ est de probabilité nulle **conditionnellement à $\mathcal D_n$** (loi de $\mathbf X$ sans atome) ⇒ $\hat g^*_{n,\mathcal C}(\mathbf X)=0$ p.s.
4. Donc $R(\hat g^*_{n,\mathcal C})=\mathbb{E}[(Y-0)^2\mid\mathcal D_n]=\mathbb{E}[Y^2]$ (indépendance de $(\mathbf X,Y)$ et $\mathcal D_n$).
**Méthodes mobilisées :** calcul du risque d'une règle apprise à $\mathcal D_n$ gelé (prop. 2.5 du ch.8), absence d'atome.
**Intuition :** (Fig. 2) la règle vaut $Y_i$ aux points observés et $0$ ailleurs : « elle ne dit rien des attributs qui n'ont pas été observés ».
**Pièges / erreurs classiques :** un risque empirique nul n'est **pas** un gage de qualité ; il faut restreindre $\mathcal C$.

### Exemple (non numéroté, §1.2) — Choix de la classe : exemples en régression, perte quadratique
**Source :** Poly ch.9, §1.2, p. 9–11 (Figure 3 et tableau p. 10)
**Hypothèses :** même ensemble d'apprentissage en régression, un attribut réel ; MRE pour la perte quadratique dans quatre classes de complexité croissante : fonctions **affines**, $\mathbb{R}_3[X]$, $\mathbb{R}_{20}[X]$, **réseau de neurones dense** ; $d$ = nombre de paramètres de la classe (sa dimension lorsqu'elle est un espace vectoriel).
**Énoncé (tableau du poly, p. 10) :**

| $\mathcal C$ | fonctions affines | $\mathbb{R}_3[X]$ | $\mathbb{R}_{20}[X]$ |
|---|---|---|---|
| $d$ | 2 | 4 | 21 |
| $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})$ | grand | petit, non nul | nul |
| $R(\hat g^*_{n,\mathcal C})$ | grand | petit | très grand |
| problème | sous-apprentissage | aucun | sur-apprentissage |

- Affines : classe trop pauvre pour approcher la fonction de régression ; risque empirique et risque tous deux grands : **sous-apprentissage**.
- $\mathbb{R}_{20}[X]$ : la classe contient un polynôme passant par **tous** les points (risque empirique nul) ; entre les points et près des bords il **oscille fortement** : risque très grand : **sur-apprentissage**.
- $\mathbb{R}_3[X]$ : compromis.
- Réseau dense (4e panneau de la Fig. 3, absent du tableau) : passe lui aussi par les points, en les reliant presque par des segments. Un carnet Colab permet de refaire ces ajustements.
**Preuve (étapes) :** illustration numérique (Fig. 3 : MRE en orange, données en rouge, fonction de régression simulée en bleu).
**Méthodes mobilisées :** moindres carrés dans des espaces de polynômes ; comparaison risque empirique / risque.
**Intuition :** (poly) plus la classe est riche, mieux elle suit les données, et plus le MRE risque de suivre **le bruit** plutôt que la fonction de régression. « Ce n'est pas un énoncé, mais une tendance » : pour des classes finies, l'écart risque / risque empirique est contrôlé par une quantité qui croît avec la taille de la classe et décroît avec $n$.
**Pièges / erreurs classiques :** le tableau compte 3 classes alors que la Fig. 3 en montre 4 ; $d=21$ pour $\mathbb{R}_{20}[X]$ (21 coefficients), $d=4$ pour $\mathbb{R}_3[X]$.

### Méthode 1.2 — Sélection par validation
**Source :** Poly ch.9, Méthode 1.2, p. 11
**Hypothèses :** classes candidates $\mathcal C_1,\dots,\mathcal C_K$ ; en pratique on ne connaît pas la fonction de régression et on ne peut pas calculer le risque.
**Énoncé :**
- On découpe $\mathcal D_n$ en deux parties : un **ensemble d'ajustement** $\mathcal D_{\mathrm{fit}}$ (pour ajuster les règles) et un **ensemble de validation** $\mathcal D_{\mathrm{val}}$ (pour estimer leur risque de généralisation).
- Pour chaque classe $\mathcal C_i$, on construit $\hat g^*_{n,\mathcal C_i}$ qui minimise le **risque empirique sur $\mathcal D_{\mathrm{fit}}$**, puis on évalue
$$\widehat{\mathrm R}^{(\mathrm{val})}_n(\hat g^*_{n,\mathcal C_i}):=\frac1{|\mathcal D_{\mathrm{val}}|}\sum_{(\mathbf x_i,y_i)\in\mathcal D_{\mathrm{val}}}\ell\big(y_i,\hat g^*_{n,\mathcal C_i}(\mathbf x_i)\big).$$
- On sélectionne la classe, et la règle associée, qui **minimise ce risque de validation**.

**Validation croisée à $k$ blocs** (*$k$-fold cross-validation*) : on partage $\mathcal D_n$ en $k$ blocs ; pour chaque bloc, on ajuste les règles sur les $k-1$ autres et on calcule leur risque empirique sur le bloc laissé de côté ; on retient la **moyenne** de ces $k$ risques de validation pour la sélection.

**Justification (exercice 1, PC9), pour la perte 0–1 :** si $g_n$ est une règle construite sur un ensemble d'apprentissage et si l'on dispose de $m$ couples de validation **indépendants** de cet ensemble et de loi $\mathbb P$, l'erreur de validation $\widehat R_{n,m}$ vérifie
$$\mathbb{E}\big[\widehat R_{n,m}\,\big|\,\mathcal D_n\big]=R(g_n),\qquad\mathbb{P}\big(|\widehat R_{n,m}-R(g_n)|\ge\varepsilon\big)\le2e^{-2m\varepsilon^2}\quad\text{pour tout }\varepsilon>0,$$
par l'inégalité de Hoeffding (Section 1.3).
**Preuve (étapes) :** (esquissée dans le poly, détaillée en PC9 ex. 1) 1. Conditionnellement à $\mathcal D_n$, $g_n$ est fixée et les $m$ pertes de validation sont i.i.d. de Bernoulli de paramètre $R(g_n)$ (indépendance validation / apprentissage, prop. 2.5 du ch.8). 2. Sans biais par linéarité. 3. Hoeffding (Th. 1.3) avec $m$ variables à valeurs dans $\{0,1\}$, conditionnellement, puis on intègre.
**Intuition :** (poly) l'ensemble de validation joue, pour la règle ajustée, **le rôle d'un échantillon frais pour une règle fixée** : la règle ayant été choisie sans lui, son risque de validation est une moyenne de variables i.i.d. conditionnellement à la règle ⇒ estimation sans biais. Le risque empirique calculé sur les données d'ajustement n'a pas cette propriété (Prop. 1.1). La validation croisée moyenne sur plusieurs découpages pour réduire la variabilité ; « c'est une **heuristique**, dont l'analyse sort du cadre du cours ».
**Pièges / erreurs classiques :** évaluer sur $\mathcal D_{\mathrm{fit}}$ (biais optimiste) ; la borne est en $m$ (taille de validation), pas en $n$.

### Remarque (§1.2) — Décomposition de l'excès de risque pour une classe, éq. (1)
**Source :** Poly ch.9, §1.2, éq. (1), p. 11–12 (Figure 4 et tableau p. 12)
**Hypothèses :** $g^*_{\mathcal C}\in\mathcal C$ telle que $R(g^*_{\mathcal C})=\inf_{g\in\mathcal C}R(g)$, appelée **oracle de la classe** ; $\hat g_{n,\mathcal C}\in\mathcal C$ un **estimateur** (règle de $\mathcal C$ construite à partir de $\mathcal D_n$).
**Énoncé :**
$$\mathcal E(\hat g_{n,\mathcal C})=R(\hat g_{n,\mathcal C})-R^\star=\underbrace{R(\hat g_{n,\mathcal C})-R(g^*_{\mathcal C})}_{\text{erreur d'estimation}}+\underbrace{R(g^*_{\mathcal C})-R^\star}_{\text{erreur d'approximation}}.\tag{1}$$
On note $\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g_{n,\mathcal C}):=R(\hat g_{n,\mathcal C})-R(g^*_{\mathcal C})$ l'**erreur d'estimation**.
- Les deux termes sont **positifs** : le premier parce que $\hat g_{n,\mathcal C}\in\mathcal C$, le second par définition du risque bayésien.
- Si l'infimum n'est pas atteint, on remplace $R(g^*_{\mathcal C})$ par $\inf_{g\in\mathcal C}R(g)$ dans toute la suite ; seule la valeur de l'infimum intervient.
- **Erreur d'estimation** : reflète la connaissance imparfaite de la loi de $(\mathbf X,Y)$ : on choisit la règle dans $\mathcal C$ au vu de $n$ observations seulement.
- **Erreur d'approximation** : dépend du choix de $\mathcal C$ et de la loi $\mathbb P$, **mais pas des données**.
- **Variation** : si $\mathcal C\subset\mathcal C'$, $\inf_{g\in\mathcal C'}R(g)\le\inf_{g\in\mathcal C}R(g)$ : l'erreur d'approximation **décroît (au sens large)** quand la classe grandit et ne dépend pas de $n$. L'erreur d'estimation **tend** à croître quand la classe grandit et à décroître quand $n$ grandit — « ce second point n'est pas un énoncé général », il sera établi pour les MRE sur classe finie par les bornes de la Section 1.3 (croissantes en $|\mathcal C|$, décroissantes en $n$).

| | erreur d'approximation | erreur d'estimation |
|---|---|---|
| $\mathcal C$ grandit | décroît | tend à croître |
| $n$ grandit | inchangée | tend à décroître |

La somme passe donc en général par un **minimum pour une complexité intermédiaire** (figure 9 du ch.8 : classes trop pauvres = sous-apprentissage, trop riches = sur-apprentissage). La Section 4.6 du ch.8 présente la même décomposition pour le risque moyen.
**Preuve (étapes) :** 1. Ajouter et retrancher $R(g^*_{\mathcal C})$ (identité). 2. Positivité : $\hat g_{n,\mathcal C}\in\mathcal C$ ⇒ $R(\hat g_{n,\mathcal C})\ge\inf_{\mathcal C}R$ ; $R^\star\le R(g)$ pour toute $g$.
**Intuition :** Fig. 4 : flèche bleue $g^{Bayes}\to g^*_{\mathcal C}$ (approximation, hors de la classe), flèche verte $g^*_{\mathcal C}\to\hat g_{n,\mathcal C}$ (estimation, dans la classe).
**Pièges / erreurs classiques :** l'erreur d'estimation est **aléatoire** (fonction de $\mathcal D_n$), l'erreur d'approximation est **déterministe** ; ne pas les intervertir. Ne pas confondre l'oracle $g^*_{\mathcal C}$ (meilleure règle de la classe) avec $g^\star$ (meilleure règle tout court).

### Remarque (§1.2) — Sur-apprentissage : quatre situations
**Source :** Poly ch.9, §1.2, p. 12
**Énoncé :** On compare pour le MRE $\hat g^*_{n,\mathcal C}$ et l'oracle $g^*_{\mathcal C}$ :
$$\text{(a) } R(\hat g^*_{n,\mathcal C})\ll\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C}),\qquad\text{(b) }\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})\ll R(\hat g^*_{n,\mathcal C}),$$
$$\text{(c) } R(g^*_{\mathcal C})\ll R(\hat g^*_{n,\mathcal C}),\qquad\text{(d) }\widehat{\mathrm R}_n(g^*_{\mathcal C})\ll R(g^*_{\mathcal C}).$$
**Il y a sur-apprentissage dans la situation (b)** : la règle apprise est bien meilleure sur les données qui ont servi à la choisir que sur des données nouvelles. La Prop. 1.1 montre que l'inégalité va toujours dans ce sens **en moyenne** (ce qui écarte (a)) et que le risque empirique de l'oracle (règle fixée) est sans biais (ce qui écarte (d) en moyenne). (c) décrit une **erreur d'estimation grande**, qui peut accompagner le sur-apprentissage mais fait intervenir le risque de l'oracle, **inaccessible**.
**Pièges / erreurs classiques :** définir le sur-apprentissage par (c) : non, la définition du poly est (b) (comparaison risque empirique / risque **du même** MRE).

### Proposition 1.1 — Biais optimiste du risque empirique du minimiseur
**Source :** Poly ch.9, Proposition 1.1, p. 13
**Hypothèses :** perte $\ell$ **positive** ; $R(g)<\infty$ pour tout $g\in\mathcal C$ ; $\hat g^*_{n,\mathcal C}$ un MRE (existant et mesurable).
**Énoncé :**
$$\mathbb{E}\Big[\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})\Big]\le\inf_{g\in\mathcal C}R(g)\le\mathbb{E}\big[R(\hat g^*_{n,\mathcal C})\big].$$
De plus, pour toute règle $g\in\mathcal C$ **fixée**, $\mathbb{E}[\widehat{\mathrm R}_n(g)]=R(g)$.
**Preuve (étapes) :**
1. Dernière affirmation : **linéarité de l'espérance**.
2. Pour tout $g\in\mathcal C$, $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})\le\widehat{\mathrm R}_n(g)$ (**définition du minimiseur**) ; donc $\mathbb{E}[\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})]\le\mathbb{E}[\widehat{\mathrm R}_n(g)]=R(g)$ (croissance de l'espérance + point 1).
3. On **passe à l'infimum en $g$** : $\mathbb{E}[\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})]\le\inf_{g\in\mathcal C}R(g)$.
4. Pour chaque réalisation de $\mathcal D_n$, $\hat g^*_{n,\mathcal C}\in\mathcal C$, donc son risque, **calculé à $\mathcal D_n$ fixé** (prop. 2.5 du ch.8), est $\ge\inf_{g\in\mathcal C}R(g)$ ; on **prend l'espérance**.
**Intuition :** (poly) biais **optimiste** : en choisissant la meilleure règle sur les données, on choisit aussi la règle que **le hasard de l'échantillon a le plus favorisée**. Plus la classe est riche, plus ce hasard a de règles parmi lesquelles en favoriser une, et plus l'écart entre $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})$ et $R(\hat g^*_{n,\mathcal C})$ risque d'être grand. Le Th. 1.2 quantifie cet écart.
**Pièges / erreurs classiques :** l'inégalité est **en moyenne** ; sur une réalisation, $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})$ peut dépasser $R(\hat g^*_{n,\mathcal C})$. Conséquence pratique : le risque d'apprentissage est un **estimateur biaisé vers le bas** du risque.

### Théorème 1.1 — No free lunch
**Source :** Poly ch.9, Théorème 1.1, p. 13 (preuve : Compléments §4.1, p. 34 ; version guidée : PC9 ex. 6)
**Hypothèses :** classification binaire $\mathsf Y=\{-1,1\}$, perte 0–1 $\ell(y,y')=\mathbb{1}_{\{y\ne y'\}}$ ; $\mathsf X$ **infini** et muni d'une tribu qui **contient les singletons** (cas de $\mathsf X=\mathbb{R}^d$) ; $\widehat g_n(\cdot)=\hat g(\cdot\,;(\mathbf X_1,Y_1),\dots,(\mathbf X_n,Y_n))$ une règle de classification, c'est-à-dire une **fonction mesurable de $(\mathbf x,\mathcal D_n)$** à valeurs dans $\{-1,1\}$.
**Énoncé :** Pour tout $n\in\mathbb{N}^*$ et tout $\varepsilon>0$, il existe une loi $\mathbb P$ sur $\mathsf X\times\mathsf Y$ telle que $R^\star=0$ et
$$\mathbb{E}[\mathcal E(\widehat g_n)]=\mathbb{E}[R(\widehat g_n)]\ge\frac12-\varepsilon,$$
où l'espérance porte sur l'ensemble d'apprentissage $\mathcal D_n$, formé de $n$ couples indépendants de loi $\mathbb P$.
**Preuve (étapes) :** **démontrée dans les compléments (§4.1)** — hors programme ; résumé :
1. Fixer $n$, $\widehat g_n$, $\varepsilon\in]0,1/2[$ (rien à montrer si $\varepsilon\ge1/2$). Choisir $K$ tel que $(1-1/K)^n\ge1-2\varepsilon$ (possible car $(1-1/K)^n\to1$ quand $K\to\infty$) et $K$ points distincts $a_1,\dots,a_K$ de $\mathsf X$ (**$\mathsf X$ infini**).
2. Pour $\mathbf b\in\{-1,1\}^K$, $\mathbb P_{\mathbf b}$ : $\mathbf X$ uniforme sur $\{a_1,\dots,a_K\}$, $Y=b_j$ si $\mathbf X=a_j$. La règle valant $b_j$ en $a_j$ et $1$ ailleurs est **mesurable** (singletons mesurables) et de risque nul ⇒ $R^\star=0$, $\mathcal E(\widehat g_n)=R(\widehat g_n)$.
3. **Moyenner sur $\mathbf b$** : $\mathbf B$ uniforme sur $\{-1,1\}^K$, $J,J_1,\dots,J_n$ i.i.d. uniformes sur $\{1,\dots,K\}$ indépendants de $\mathbf B$ ; $\frac1{2^K}\sum_{\mathbf b}\mathbb{E}_{\mathbf b}[R(\widehat g_n)]=\mathbb{P}(\widehat g_n(\mathbf X;\mathcal D_n)\ne Y)\ge\mathbb{P}(\widehat g_n(\mathbf X;\mathcal D_n)\ne Y,\ J\notin\{J_1,\dots,J_n\})$.
4. Sur $\{J=j,J_i=j_i\}$ avec $j\notin\{j_1,\dots,j_n\}$ : la prédiction est fonction de $(B_{j_1},\dots,B_{j_n})$, **indépendante** de $Y=B_j$ uniforme ⇒ elles diffèrent avec proba $1/2$. Donc la proba vaut $\frac12(1-\frac1K)^n\ge\frac12-\varepsilon$.
5. **Une moyenne est majorée par le maximum** : il existe $\mathbf b$ avec $\mathbb{E}_{\mathbf b}[R(\widehat g_n)]\ge\frac12-\varepsilon$.
**Commentaires du poly :** la loi $\mathbb P$ **dépend de $n$ et de la règle** : pour chaque taille d'échantillon et chaque règle, on peut trouver un problème où la règle n'apprend rien. Le risque moyen $1/2$ est celui d'une règle qui tire chaque prédiction **à pile ou face**.
**Intuition :** (poly) la loi construite répartit l'attribut uniformément sur un très grand nombre $K$ de points avec un label déterministe mais **sans aucune régularité d'un point à l'autre**. Avec $n$ observations on voit au plus $n$ points ; un nouveau point est, avec probabilité proche de 1 si $K\gg n$, jamais observé, et son label n'est pas relié à ceux observés : aucune règle ne fait mieux que deviner. On rend l'argument rigoureux en moyennant sur tous les étiquetages.
**Pièges / erreurs classiques :** le théorème ne dit pas qu'aucune règle n'est consistante pour une loi **fixée** ; il dit qu'il n'y a pas de garantie **uniforme sur toutes les lois** à $n$ fixé (même avec $R^\star=0$ !).

### Remarque (§1.2) — Interprétation du *no free lunch*
**Source :** Poly ch.9, §1.2, p. 14
**Énoncé :** Il est impossible d'obtenir un résultat sur l'excès de risque $R(\widehat g_n)-R^\star$ **sans hypothèse sur la distribution $\mathbb P$**. Il faut faire une hypothèse ou changer d'objectif :
1. **Approche par modélisation** : hypothèse sur $\mathbb P$ ; on contraint la loi à $\{\mathbb P_\theta:\theta\in\Theta\}$, on estime $\theta$, on obtient $\widehat g_n$ par substitution, on contrôle $\mathcal E(\widehat g_n)=R(\widehat g_n)-R^\star$ sous $\mathbb P_\theta$. Hypothèse/espoir : **erreur de modélisation petite**. Exemples : analyse discriminante linéaire et quadratique, régression gaussienne, classification logistique, classifieur bayésien naïf.
2. **Approche discriminative** : hypothèse sur $g^\star$, **ou changement de métrique**. On contraint les classifieurs à $\mathcal C$, on considère le MRE $\hat g^*_{n,\mathcal C}$ (ou une approximation) et l'on contrôle $\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})=R(\hat g^*_{n,\mathcal C})-R(g^*_{\mathcal C})$. Hypothèse/espoir : **erreur d'approximation petite**, hypothèse sur $g^\star$ donc implicitement sur $\mathbb P$. Exemples : régression des moindres carrés, réseaux de neurones, classification logistique, machines à vecteurs de support (SVM).
La **classification logistique figure dans les deux listes** : même critère comme EMV du modèle logistique et comme MRE pour la perte logistique (Section 1.4).

### Remarque (§1.2) — Résumé : le cadre de la MRE et les trois questions
**Source :** Poly ch.9, §1.2, p. 14
**Énoncé :**
$$\hat g^*_{n,\mathcal C}=\arg\min_{g\in\mathcal C}\Big\{\widehat{\mathrm R}_n(g)=\frac1n\sum_{i=1}^n\ell(Y_i,g(\mathbf X_i))\Big\}.$$
Trois questions liées :
1. **Comment choisir $\mathcal C$ ?** exemples en régression, décomposition approximation/estimation, sur-apprentissage, *no free lunch* ; en pratique validation croisée (PC9 ex. 1).
2. **Comment contrôler l'erreur d'estimation** $R(\hat g^*_{n,\mathcal C})-R(g^*_{\mathcal C})$ ? Section 1.3.
3. **Comment calculer $\hat g^*_{n,\mathcal C}$, et avec quelle précision ?** Section 1.4.

### Remarque (§1.3, non numérotée) — Objectif : contrôler l'erreur d'estimation
**Source :** Poly ch.9, §1.3, p. 14
**Énoncé :** On veut contrôler
$$\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})=R(\hat g^*_{n,\mathcal C})-R(g^*_{\mathcal C}),\qquad\text{où}\qquad\begin{cases}\hat g^*_{n,\mathcal C}=\arg\min_{g\in\mathcal C}\widehat{\mathrm R}_n(g),\\ g^*_{\mathcal C}=\arg\min_{g\in\mathcal C}R(g).\end{cases}$$
On considère *un* minimiseur s'il y en a plusieurs ; on écrit $\inf_{g\in\mathcal C}R(g)$ au lieu de $R(g^*_{\mathcal C})$ si l'infimum n'est pas atteint. Démarche : (i) ramener l'erreur d'estimation à la **déviation uniforme** entre risque et risque empirique (quantité ne dépendant que de la classe) ; (ii) contrôler celle-ci par une **inégalité de concentration**.

### Théorème 1.2 — Lien entre erreur de généralisation et processus empirique
**Source :** Poly ch.9, Théorème 1.2, éq. (2)–(3), p. 15
**Hypothèses :** $\mathcal C$ classe de règles ; $\ell$ perte telle que $R(g)<\infty$ pour tout $g\in\mathcal C$ ; $\hat g^*_{n,\mathcal C}$ un MRE sur $\mathcal C$. Pour (3) : en plus, $\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|$ est une **variable aléatoire intégrable** (vrai si $\mathcal C$ finie et perte bornée).
**Énoncé :**
$$\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})=R(\hat g^*_{n,\mathcal C})-\inf_{g\in\mathcal C}R(g)\le2\sup_{g\in\mathcal C}\Big|\widehat{\mathrm R}_n(g)-R(g)\Big|,\quad\text{p.s.}\tag{2}$$
$$\mathbb{E}\big[\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})\big]\le\mathbb{E}\Big[\sup_{g\in\mathcal C}\Big|\widehat{\mathrm R}_n(g)-R(g)\Big|\Big].\tag{3}$$
**Deux observations à la base de la preuve (p. 15) :**
1. $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})\le\widehat{\mathrm R}_n(g)$ pour tout $g\in\mathcal C$ ;
2. $|\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})-R(\hat g^*_{n,\mathcal C})|\le\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|$, puisque $\hat g^*_{n,\mathcal C}\in\mathcal C$.
**Preuve (étapes) :**
1. Soit $\varepsilon>0$ et $g_\varepsilon\in\mathcal C$ telle que $R(g_\varepsilon)\le\inf_{g\in\mathcal C}R(g)+\varepsilon$ (si l'oracle existe : $g_\varepsilon=g^*_{\mathcal C}$, $\varepsilon=0$).
2. Décomposition en ajoutant/retranchant $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})$, puis **observation 1** ($\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})\le\widehat{\mathrm R}_n(g_\varepsilon)$) et choix de $g_\varepsilon$ ($-\inf R\le -R(g_\varepsilon)+\varepsilon$) :
$$\begin{aligned}R(\hat g^*_{n,\mathcal C})-\inf_{g\in\mathcal C}R(g)&=R(\hat g^*_{n,\mathcal C})-\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})+\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})-\inf_{g\in\mathcal C}R(g)\\&\le R(\hat g^*_{n,\mathcal C})-\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})+\widehat{\mathrm R}_n(g_\varepsilon)-R(g_\varepsilon)+\varepsilon.\end{aligned}$$
3. Chacune des deux différences est majorée par $\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|$ (la première par l'**observation 2**, la seconde car $g_\varepsilon\in\mathcal C$) ⇒ $R(\hat g^*_{n,\mathcal C})-\inf R\le2\sup_{\mathcal C}|\widehat{\mathrm R}_n-R|+\varepsilon$ ; **$\varepsilon$ arbitraire** ⇒ (2).
4. Pour (3) : on prend l'espérance de la même inégalité mais on ne majore par le sup **que le premier terme**. $g_\varepsilon$ est **fixée** ⇒ $\mathbb{E}[\widehat{\mathrm R}_n(g_\varepsilon)]=R(g_\varepsilon)$ (sans biais) : le second terme est d'espérance nulle :
$$\mathbb{E}\big[R(\hat g^*_{n,\mathcal C})\big]-\inf_{g\in\mathcal C}R(g)\le\mathbb{E}\Big[R(\hat g^*_{n,\mathcal C})-\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})\Big]+\varepsilon\le\mathbb{E}\Big[\sup_{g\in\mathcal C}\Big|\widehat{\mathrm R}_n(g)-R(g)\Big|\Big]+\varepsilon,$$
puis $\varepsilon\to0$.
5. Si $\mathcal C$ finie et perte bornée : le sup est un **maximum d'un nombre fini de v.a. bornées** ⇒ mesurable et intégrable.
**Intuition :** (poly) le **facteur 2 disparaît en espérance** parce que l'un des deux termes porte sur une règle fixée, dont le risque empirique est sans biais. Seul le terme portant sur la règle apprise demande un **contrôle uniforme** : on ne sait pas à l'avance quelle règle de $\mathcal C$ sera choisie, il faut donc que le risque empirique soit proche du risque **pour toutes à la fois** (conséquence du choix au vu des données, cf. Prop. 1.1).
**Pièges / erreurs classiques :** (2) est **presque sûre** (avec facteur 2), (3) est **en espérance** (sans facteur 2) — ne pas mélanger. Le sup porte sur **toute la classe**, pas seulement sur $\hat g^*_{n,\mathcal C}$. *(Remarque d'extraction : même schéma « $2\sup$ » que la preuve de consistance des M-estimateurs du ch.7 ; rapprochement non fait explicitement dans ce passage du poly.)*

### Remarque (§1.3) — Type de contrôle
**Source :** Poly ch.9, §1.3, p. 15–16
**Énoncé :** $R(\hat g^*_{n,\mathcal C})$ et donc $\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})$ sont des **variables aléatoires** (fonctions de $\mathcal D_n$). Deux façons de les contrôler :
1. **en espérance** : majorer $\mathbb{E}[\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})]$ ;
2. **en grande probabilité** :
$$\mathbb{P}\big(\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})\le\Delta_{n,\delta}(\mathcal C)\big)\ge1-\delta,$$
où $\Delta_{n,\delta}(\mathcal C)$ dépend explicitement de $n$, du niveau de confiance $\delta$ et de la classe.
Dans les deux cas, d'après le Th. 1.2, il faut étudier les **déviations uniformes** de variables aléatoires par rapport à leurs moyennes.

### Remarque (§1.3) — Contrôle des déviations uniformes, perte 0–1 : la stratégie
**Source :** Poly ch.9, §1.3, p. 16
**Hypothèses :** perte 0–1, pour laquelle $\widehat{\mathrm R}_n(g)=\frac1n\sum_{k=1}^n\mathbb{1}_{\{g(\mathbf X_k)\ne Y_k\}}$ ; $\mathcal C$ **finie**.
**Énoncé :** objectif : contrôler $\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|$ en grande probabilité et en espérance, en deux temps :
1. pour toute règle $g$ **fixée**, $\mathbb{P}(|\widehat{\mathrm R}_n(g)-R(g)|>\varepsilon)$ est faible : **inégalité de concentration** ;
2. la **borne de l'union** donne
$$\mathbb{P}\Big(\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|>\varepsilon\Big)\le\sum_{g\in\mathcal C}\mathbb{P}\big(|\widehat{\mathrm R}_n(g)-R(g)|>\varepsilon\big).$$

### Remarque (§1.3) — Inégalités de concentration : de Markov à Hoeffding
**Source :** Poly ch.9, §1.3, p. 16
**Énoncé :** Une **inégalité de concentration** majore la probabilité qu'une v.a. s'écarte de sa moyenne. Les plus simples (Section 2.1) : si $Z\ge0$, $\mathbb{P}(Z>t)\le\mathbb{E}[Z]/t$ pour tout $t>0$ (**Markov**), ce qui implique, si $Z$ est de variance finie, $\mathbb{P}(|Z-\mathbb{E}[Z]|\ge\varepsilon)\le\mathrm{Var}(Z)/\varepsilon^2$ (**Bienaymé-Tchebychev**). Si $X_1,\dots,X_n$ sont i.i.d. de carré intégrable et $Z=n^{-1}\sum_{i=1}^nX_i$, $\mathrm{Var}(Z)=\mathrm{Var}(X_1)/n$, d'où
$$\mathbb{P}\Big(\Big|\frac1n\sum_{i=1}^nX_i-\mathbb{E}[X_1]\Big|\ge\varepsilon\Big)\le\frac{\mathrm{Var}(X_1)}{n\varepsilon^2}.$$
Cette majoration décroît comme $1/n$. Pour des variables **bornées**, on a une majoration **exponentielle en $n$**.
**Méthodes mobilisées :** Bienaymé-Tchebychev ; variance d'une moyenne de v.a. indépendantes.

### Théorème 1.3 — Inégalité de Hoeffding (outil fondamental)
**Source :** Poly ch.9, Théorème 1.3, p. 16 (démontré comme Corollaire 2.1, §2.4, p. 30 ; complète l'énoncé admis au ch.4, th. 3.1)
**Hypothèses :** $X_1,\dots,X_n$ variables aléatoires **indépendantes** à valeurs dans $[0,1]$ ; $\varepsilon>0$.
**Énoncé :**
$$\mathbb{P}\Big(\Big|\frac1n\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}\Big|\ge\varepsilon\Big)\le2e^{-2n\varepsilon^2},$$
et chacune des deux déviations unilatérales, $\mathbb{P}\big(n^{-1}\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}\ge\varepsilon\big)$ et $\mathbb{P}\big(n^{-1}\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}\le-\varepsilon\big)$, est majorée par $e^{-2n\varepsilon^2}$.
**Preuve (étapes) :** renvoyée à la §2.4 (voir §3 ci-dessous : Chernoff + lemme de Hoeffding + indépendance ; Th. 2.1 avec $a_i=0$, $b_i=1$, $t=n\varepsilon$, $D_n=n$).
**Remarques du poly (p. 17) :**
- Pas besoin que les variables soient **de même loi** : l'**indépendance** suffit.
- Extension à $X_i\in[a_i,b_i]$ : la majoration devient $2\exp\big(-2n^2\varepsilon^2/\sum_{i=1}^n(b_i-a_i)^2\big)$.
- **Attention aux écritures** : parmi $2e^{-2n\varepsilon^2}$, $2e^{-2\varepsilon^2/n}$ et $2e^{-2n\varepsilon}$, **seule la première** est la bonne pour la moyenne. La **deuxième** est correcte pour la déviation de la **somme**, $\mathbb{P}(|\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}|\ge\varepsilon)$ (on retrouve la première en l'appliquant à $n\varepsilon$). La **troisième est fausse** : pour des Bernoulli de paramètre $1/2$ et $\varepsilon=n^{-1/2}$, le **TCL** (th. 1.6 du ch.6) montre que la probabilité tend vers $2(1-\Phi(2))>0$, tandis que $2e^{-2\sqrt n}\to0$.
**Commentaire du poly :** Hoeffding n'exploite **aucune** propriété de la loi autre que le **support** : la borne ne dépend pas de la variance et est la même pour toutes les lois portées par $[0,1]$. Ce caractère **agnostique** est désirable : la loi des pertes $\mathbb{1}_{\{g(\mathbf X_k)\ne Y_k\}}$ est inconnue, mais portée par $\{0,1\}$. En contrepartie, pour certaines lois la moyenne converge beaucoup plus vite que prédit ; les inégalités de **Bennett** et **Bernstein** (qui font intervenir la variance) raffinent.
**Intuition :** (poly) pour une moyenne de $n$ variables indépendantes de variance $v$, le TCL suggère une probabilité de déviation de l'ordre de $e^{-n\varepsilon^2/(2v)}$ pour $\varepsilon$ petit et $n$ grand. Une variable à valeurs dans $[0,1]$ a une variance **au plus $1/4$**, et l'exposant $2n\varepsilon^2=n\varepsilon^2/(2\cdot1/4)$ est celui de ce comportement gaussien **dans le pire cas**. Heuristique seulement : le TCL est asymptotique, Hoeffding est valable **pour tout $n$**.
**Pièges / erreurs classiques :** confusion des trois écritures (ci-dessus) ; oublier le facteur 2 en bilatéral ; appliquer Hoeffding à des variables non bornées ou dépendantes ; l'appliquer au MRE $\hat g^*_{n,\mathcal C}$ directement (les pertes ne sont plus indépendantes : il faut l'union bound).

### Remarque (§1.3) — Structure de la preuve de Hoeffding
**Source :** Poly ch.9, §1.3, p. 17 (détails §2.4 ; PC9 ex. 2 et 3)
**Énoncé :** « La concentration se lit sur le contrôle des moments » ; trois étapes :
1. **Borne de Chernoff.** Un contrôle de la fonction génératrice des moments $\mathbb{E}[\exp(\lambda Z)]$ entraîne la concentration. En particulier, si $\mathbb{E}[\exp(\lambda Z)]\le e^{\lambda^2\sigma^2/2}$ pour tout $\lambda\in\mathbb{R}$, la variable centrée $Z$ est dite **sous-gaussienne**, et ses déviations sont majorées comme celles d'une loi $\mathcal N(0,\sigma^2)$.
2. **Lemme de Hoeffding.** Une variable aléatoire **bornée et centrée** est sous-gaussienne.
3. Si $Z=\sum_{i=1}^nX_i$ avec $X_1,\dots,X_n$ **indépendantes**, alors $\mathbb{E}[\exp(\lambda Z)]=\prod_{i=1}^n\mathbb{E}[\exp(\lambda X_i)]$.

### Lemme 1.1 — Lemme de Hoeffding
**Source :** Poly ch.9, Lemme 1.1, p. 17 (démonstration §2.4, p. 29)
**Hypothèses :** $(\Omega,\mathcal F,\mathbb P)$ espace de probabilité ; $X$ v.a. réelle telle que $\mathbb{P}(X\in[a,b])=1$ et $\mathbb{E}[X]=0$.
**Énoncé :** Pour tout $\lambda\in\mathbb{R}$,
$$\mathbb{E}\big[e^{\lambda X}\big]\le e^{\lambda^2(b-a)^2/8}.$$
Autrement dit $X\in\mathcal G\big((b-a)^2/4\big)$ (sous-gaussienne de facteur $(b-a)^2/4$).
**Preuve (étapes) :** voir §3 (argument de Herbst : $\psi=\log\mathbb{E}[e^{\lambda X}]$, $\psi(0)=0$, $\psi'(0)=0$, $\psi''(\lambda)=\widetilde{\mathrm{Var}}_\lambda(X)\le(b-a)^2/4$, Taylor-Lagrange).
**Forme non centrée (p. 29, PC9 ex. 3) :** si $X\in[a,b]$ p.s., $\psi_X(\lambda)\le\lambda\mathbb{E}[X]+\lambda^2(b-a)^2/8$.
**Intuition :** la variance d'une v.a. dans $[a,b]$ est au plus $(b-a)^2/4$ ; le lemme dit que toute la transformée de Laplace est contrôlée par celle d'une gaussienne de cette variance maximale.
**Pièges / erreurs classiques :** le $8$ au dénominateur (et non $2$) : $e^{\lambda^2\sigma^2/2}$ avec $\sigma^2=(b-a)^2/4$. Hypothèse de **centrage** indispensable dans cette forme.

### Théorème 1.4 — Inégalité de Hoeffding, seconde écriture
**Source :** Poly ch.9, Théorème 1.4, p. 17–18
**Hypothèses :** $X_1,\dots,X_n$ indépendantes à valeurs dans $[0,1]$ ; $\delta\in]0,1[$.
**Énoncé (« écriture équivalente » : on fixe la probabilité d'échec plutôt que l'écart)** : on pose
$$\varepsilon=\sqrt{\frac{\ln(2/\delta)}{2n}}\iff2e^{-2n\varepsilon^2}=\delta.$$
Avec une probabilité supérieure à $1-\delta$,
$$\Big|\frac1n\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}\Big|\le\sqrt{\frac{\ln(2/\delta)}{2n}}.$$
**Preuve (étapes) :** 1. Avec ce choix de $\varepsilon$, le **Th. 1.3** montre que l'événement contraire $\{|n^{-1}\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}|\ge\varepsilon\}$ a une probabilité au plus $\delta$. 2. Passage au complémentaire.
**Remarques du poly (p. 18) :**
- la **précision** $\varepsilon$ = objectif sur la valeur absolue de l'écart moyenne empirique / espérance ;
- la **confiance** $\delta$ = borne de la probabilité avec laquelle on admet que la condition de précision ne soit pas satisfaite ;
- nombre d'observations suffisant : $n\ge\ln(2/\delta)/(2\varepsilon^2)$ ;
- « **La précision coûte cher** » : à confiance donnée, une précision **dix fois meilleure** demande **cent fois plus** d'observations ($n\propto1/\varepsilon^2$).
**Méthodes mobilisées :** inversion d'une borne de probabilité (« résoudre en $\varepsilon$ »).
**Pièges / erreurs classiques :** la dépendance en $\delta$ est **logarithmique** (bon marché), celle en $\varepsilon$ **quadratique** (cher).

### Théorème 1.5 — Déviations uniformes sur une classe finie
**Source :** Poly ch.9, Théorème 1.5, p. 18–19
**Hypothèses :** classification, perte 0–1 ; $|\mathcal C|<\infty$ ; $n\in\mathbb{N}^*$, $\varepsilon>0$.
**Énoncé :**
$$\mathbb{P}\Big(\sup_{g\in\mathcal C}\big\{\widehat{\mathrm R}_n(g)-R(g)\big\}>\varepsilon\Big)\le|\mathcal C|\,e^{-2n\varepsilon^2},$$
$$\mathbb{P}\Big(\sup_{g\in\mathcal C}\Big|\widehat{\mathrm R}_n(g)-R(g)\Big|>\varepsilon\Big)\le2|\mathcal C|\,e^{-2n\varepsilon^2}.$$
**Preuve (étapes) :**
1. Notons $\mathcal C=\{g_j\}_{j=1}^{|\mathcal C|}$. L'événement $\{\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|>\varepsilon\}$ est la **réunion** des événements $\{|\widehat{\mathrm R}_n(g_j)-R(g_j)|>\varepsilon\}$ ; la **borne de l'union** (§2.6) donne
$$\mathbb{P}\Big(\sup_{g\in\mathcal C}\Big|\widehat{\mathrm R}_n(g)-R(g)\Big|>\varepsilon\Big)\le\sum_{j=1}^{|\mathcal C|}\mathbb{P}\Big(\Big|\widehat{\mathrm R}_n(g_j)-R(g_j)\Big|>\varepsilon\Big).$$
2. Pour chaque $j$, la règle $g_j$ est **fixée** ; les $\mathbb{1}_{\{g_j(\mathbf X_k)\ne Y_k\}}$, $k=1,\dots,n$, sont **indépendantes**, à valeurs dans $\{0,1\}$, de loi de **Bernoulli de paramètre $R(g_j)$** ; leur moyenne est $\widehat{\mathrm R}_n(g_j)$.
3. Le **Th. 1.3** majore chaque terme par $2e^{-2n\varepsilon^2}$ ⇒ seconde inégalité.
4. Première inégalité : même raisonnement avec la **déviation unilatérale**, majorée par $e^{-2n\varepsilon^2}$.
**Commentaire du poly :** on utilise la **force** de Hoeffding : valable pour toute loi à support borné ; la loi de Bernoulli de paramètre $R(g_j)$ est inconnue, mais la majoration n'en dépend pas, et elle est donc **uniforme en $j$**.
**Intuition :** la borne de l'union « paie » un facteur $|\mathcal C|$ ; comme la queue de Hoeffding est exponentielle, cela ne coûte qu'un $\log|\mathcal C|$ après inversion.
**Pièges / erreurs classiques :** la borne de l'union **ne suppose aucune indépendance** entre les événements (les $\widehat{\mathrm R}_n(g_j)$ sont calculés sur le même échantillon et sont dépendants) ; ne pas « multiplier » les probabilités.

### Théorème 1.6 — Contrôle en grande probabilité de l'erreur d'estimation
**Source :** Poly ch.9, Théorème 1.6, p. 19
**Hypothèses :** perte à valeurs dans $[0,1]$ (cas de la perte 0–1 en classification) ; classe $\mathcal C$ **finie** ; $\delta\in]0,1[$ ; $\hat g^*_{n,\mathcal C}$ un MRE.
**Énoncé :** Avec une probabilité supérieure à $1-\delta$,
$$\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})=R(\hat g^*_{n,\mathcal C})-R(g^*_{\mathcal C})\le2\sqrt{\frac{\log(2|\mathcal C|/\delta)}{2n}}.$$
**Preuve (étapes) :**
1. **Th. 1.2**, éq. (2) : $\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})\le2\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|$ p.s.
2. **Th. 1.5** — dont la preuve n'utilise que le fait que les pertes $\ell(Y_k,g(\mathbf X_k))$ sont **indépendantes et à valeurs dans $[0,1]$** pour $g$ fixée — avec $\varepsilon=\sqrt{\log(2|\mathcal C|/\delta)/(2n)}$, de sorte que $2|\mathcal C|e^{-2n\varepsilon^2}=\delta$ :
$$\mathbb{P}\Big(\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|\le\sqrt{\frac{\log(2|\mathcal C|/\delta)}{2n}}\Big)\ge1-\delta.$$
3. Sur cet événement, $\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})\le2\sqrt{\log(2|\mathcal C|/\delta)/(2n)}$.
**Extension :** pour une perte bornée à valeurs dans $[0,B]$, on applique le théorème à $\ell/B$ : la borne est **multipliée par $B$**.
**Remarques du poly :**
1. **Dépendance en $|\mathcal C|$** : seulement via $\log|\mathcal C|$. Laisse l'espoir de généraliser à des classes infinies : par ex. (PC9 ex. 7) pour les classifieurs linéaires en dimension $d$, on peut se limiter à une classe de cardinal au plus $2\binom nd$.
2. **Dépendance en $n$** : décroît comme $1/\sqrt n$.
On a ainsi un contrôle du type $\mathbb{P}(\mathcal E^{\mathcal C}_{\mathrm{est}}(\hat g^*_{n,\mathcal C})\le\Delta_{n,\delta}(\mathcal C))\ge1-\delta$ avec $\Delta_{n,\delta}(\mathcal C)=2\sqrt{\log(2|\mathcal C|/\delta)/(2n)}$. Restent : le contrôle **en espérance** et le contrôle pour une classe **infinie**.
**Méthodes mobilisées :** Th. 1.2 + borne de l'union + Hoeffding + inversion en $\delta$.
**Pièges / erreurs classiques :** ne pas oublier le **facteur 2** (venant de (2)) ; c'est $\log(2|\mathcal C|/\delta)$ (bilatéral) et non $\log(|\mathcal C|/\delta)$. Le résultat est **sans hypothèse sur $\mathbb P$** (agnostique) mais ne contrôle que l'erreur d'**estimation**, pas l'excès de risque total (cohérent avec le NFL).

### Remarque (§1.3) — Contrôle en espérance : réduction à l'espérance d'un maximum
**Source :** Poly ch.9, §1.3, p. 19
**Énoncé :** Le Th. 1.2 (éq. (3)) a établi, la classe étant finie (sup = max) :
$$\mathbb{E}\big[R(\hat g^*_{n,\mathcal C})-R(g^*_{\mathcal C})\big]\le\mathbb{E}\Big[\max_{g\in\mathcal C}\Big|\widehat{\mathrm R}_n(g)-R(g)\Big|\Big].$$
Il reste à majorer **l'espérance d'un maximum** de variables aléatoires : inégalité de Pisier pour des variables sous-gaussiennes.

### Théorème 1.7 — Inégalité de Pisier
**Source :** Poly ch.9, Théorème 1.7, p. 20 (démonstration : Compléments §4.4, p. 37 ; PC9 ex. 4)
**Hypothèses :** $Z_1,\dots,Z_m$ v.a. réelles **sous-gaussiennes de même facteur $\sigma^2$** : pour tout $\lambda\in\mathbb{R}$ et tout $i$, $\mathbb{E}[e^{\lambda Z_i}]\le e^{\lambda^2\sigma^2/2}$. **Pas besoin d'indépendance.**
**Énoncé :**
$$\mathbb{E}\Big[\max_{1\le i\le m}|Z_i|\Big]\le\sigma\sqrt{2\log(2m)}.$$
**Preuve (étapes) :** **donnée dans les compléments (§4.4)** :
1. D'abord, sous la seule hypothèse $\mathbb{E}[e^{\lambda Z_i}]\le e^{\lambda^2\sigma^2/2}$ pour $\lambda>0$ : pour $\lambda>0$, **Jensen** (convexité de $t\mapsto e^{\lambda t}$) puis $e^{\lambda\max_iZ_i}=\max_ie^{\lambda Z_i}\le\sum_{i=1}^me^{\lambda Z_i}$ :
$$e^{\lambda\mathbb{E}[\max_iZ_i]}\le\mathbb{E}\big[e^{\lambda\max_iZ_i}\big]\le\sum_{i=1}^m\mathbb{E}\big[e^{\lambda Z_i}\big]\le m\,e^{\lambda^2\sigma^2/2},$$
soit $\mathbb{E}[\max_iZ_i]\le\log(m)/\lambda+\lambda\sigma^2/2$.
2. **Optimisation en $\lambda$** : si $m\ge2$, $\lambda=\sqrt{2\log m}/\sigma$ donne $\sigma\sqrt{2\log m}$ ; si $m=1$, $\lambda\to0$ donne $\mathbb{E}[Z_1]\le0$. (Intégrabilité : $e^{|t|}\le e^t+e^{-t}$ et transformée de Laplace finie en $\pm1$.)
3. Les $2m$ variables $Z_1,\dots,Z_m,-Z_1,\dots,-Z_m$ vérifient toutes l'hypothèse ($\mathbb{E}[e^{\lambda(-Z_i)}]=\mathbb{E}[e^{(-\lambda)Z_i}]\le e^{\lambda^2\sigma^2/2}$, d'où le besoin de « pour tout $\lambda\in\mathbb{R}$ ») et $\max_i|Z_i|=\max(Z_1,\dots,Z_m,-Z_1,\dots,-Z_m)$ ⇒ appliquer le point 2 avec $2m$ : $\mathbb{E}[\max_i|Z_i|]\le\sigma\sqrt{2\log(2m)}$.
**Intuition :** l'espérance du max de $m$ sous-gaussiennes croît seulement comme $\sqrt{\log m}$.
**Pièges / erreurs classiques :** $\log(2m)$ (à cause des valeurs absolues) et non $\log m$ ; l'indépendance n'est **pas** requise.

### Remarque (§1.3) — Application : les déviations $Z_j$ sont sous-gaussiennes de facteur $1/(4n)$
**Source :** Poly ch.9, §1.3, p. 20
**Hypothèses :** perte 0–1 ; $Z_j=\widehat{\mathrm R}_n(g_j)-R(g_j)$, $j\in\{1,\dots,|\mathcal C|\}$.
**Énoncé et calcul :** pour tout $\lambda\in\mathbb{R}$, **par indépendance des couples $(\mathbf X_i,Y_i)$** (et identité de loi),
$$\mathbb{E}\big[e^{\lambda Z_j}\big]=\mathbb{E}\Big[e^{(\lambda/n)\sum_{i=1}^n\{\mathbb{1}_{\{g_j(\mathbf X_i)\ne Y_i\}}-R(g_j)\}}\Big]=\Big(\mathbb{E}\Big[e^{(\lambda/n)\{\mathbb{1}_{\{g_j(\mathbf X_1)\ne Y_1\}}-R(g_j)\}}\Big]\Big)^n\le e^{\lambda^2/(8n)},$$
en utilisant le **lemme de Hoeffding** (Lemme 1.1) pour la variable centrée $\mathbb{1}_{\{g_j(\mathbf X_1)\ne Y_1\}}-R(g_j)$, à valeurs dans $[-R(g_j),1-R(g_j)]$ **de longueur 1** :
$$\mathbb{E}\Big[e^{(\lambda/n)\{\mathbb{1}_{\{g_j(\mathbf X_1)\ne Y_1\}}-R(g_j)\}}\Big]\le e^{\lambda^2/(8n^2)}.$$
Les $Z_j$ sont donc **sous-gaussiennes de facteur $\sigma^2=1/(4n)$** ($e^{\lambda^2/(8n)}=e^{\lambda^2\sigma^2/2}$).
**Méthodes mobilisées :** factorisation de la transformée de Laplace par indépendance ; lemme de Hoeffding appliqué à $\lambda/n$.

### Théorème 1.8 — Borne pour le risque intégré, ou borne en espérance
**Source :** Poly ch.9, Théorème 1.8, p. 20
**Hypothèses :** classification, perte 0–1 ; $|\mathcal C|<\infty$ ; $\hat g^*_{n,\mathcal C}$ un MRE sur $\mathcal C$.
**Énoncé :**
$$\mathbb{E}\big[R(\hat g^*_{n,\mathcal C})-R(g^*_{\mathcal C})\big]\le\sqrt{\frac{\log(2|\mathcal C|)}{2n}}.$$
**Preuve (étapes) :**
1. **Pisier** (Th. 1.7) avec $m=|\mathcal C|$ et $\sigma=1/(2\sqrt n)$ (calcul ci-dessus) :
$$\mathbb{E}\Big[\max_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|\Big]\le(2\sqrt n)^{-1}\sqrt{2\log(2|\mathcal C|)}=\sqrt{\log(2|\mathcal C|)/(2n)}.$$
2. Conclure par l'éq. **(3)** du Th. 1.2.
**Intuition :** même ordre $\sqrt{\log|\mathcal C|/n}$ qu'en grande probabilité, **sans le facteur 2** (grâce à (3)) et sans $\delta$.
**Pièges / erreurs classiques :** utiliser (2) au lieu de (3) ferait apparaître un facteur 2 inutile. Comparer avec la borne obtenue par intégration de la queue (Compléments §4.2) : $\sqrt{(1+\log(2|\mathcal C|))/(2n)}$, un peu moins bonne.

### Remarque (§1.3) — Extension à une classe infinie
**Source :** Poly ch.9, §1.3, p. 20–21
**Énoncé :** Les bornes précédentes sont **vides** si la classe est infinie (cas de la plupart des classes en pratique). Pour les classifieurs **linéaires en dimension $d$** (ici des classifieurs **affines**), on se ramène à une classe finie, de cardinal au plus $2\binom nd$, formée des classifieurs dont l'hyperplan séparateur passe par $d$ points de l'ensemble d'apprentissage. La dépendance logarithmique en le cardinal donne une borne d'ordre
$$2\sqrt{\frac{\log(2|\mathcal C|/\delta)}{2n}}\simeq O\Bigg(\sqrt{\frac{d\log(n)}{n}}\Bigg).$$

### Proposition 1.2 — Classifieurs affines
**Source :** Poly ch.9, Proposition 1.2, p. 21 (démonstration : Compléments §4.6, p. 39–40, à partir d'un lemme combinatoire **admis** ; PC9 ex. 7)
**Hypothèses :** classification binaire sur $\mathsf X=\mathbb{R}^d$, perte 0–1 ; la loi de $\mathbf X$ admet une **densité** par rapport à la mesure de Lebesgue ; $n>d$. Classe des classifieurs affines
$$\mathcal C=\big\{\mathbf x\mapsto2\mathbb{1}_{\{\mathbf a^\top\mathbf x+b\ge0\}}-1\ :\ (\mathbf a,b)\in\mathbb{R}^d\times\mathbb{R}\big\},$$
et $\widehat g_n$ un MRE sur la **classe finie** $\mathcal C_n\subset\mathcal C$, de cardinal au plus $2\binom nd$, des classifieurs dont l'hyperplan passe par $d$ points de l'ensemble d'apprentissage (§4.6) ; $\delta\in]0,1[$.
**Énoncé :** Avec une probabilité supérieure à $1-\delta$,
$$R(\widehat g_n)-\inf_{g\in\mathcal C}R(g)\le\frac{2d}{n}+2\sqrt{\frac{\log\big(\big(2\binom nd+1\big)/\delta\big)}{2(n-d)}}.$$
Comme $\binom nd\le n^d$, le membre de droite est, pour $\delta$ fixé et $n\ge2d$, d'ordre $\sqrt{d\log(n)/n}$.
**Preuve (étapes) :** **hors programme** (Compléments §4.6), résumé :
1. Pour $g\in\mathcal C$ fixée : $R(\widehat g_n)-R(g)=\{R(\widehat g_n)-\widehat{\mathrm R}_n(\widehat g_n)\}+\{\widehat{\mathrm R}_n(\widehat g_n)-\widehat{\mathrm R}_n(g)\}+\{\widehat{\mathrm R}_n(g)-R(g)\}$.
2. Terme du milieu $\le d/n$ (**lemme combinatoire 4.2, admis**).
3. Premier terme $\le\max_{I,z}\{R(h_{I,z})-\widehat{\mathrm R}^I_n(h_{I,z})\}+d/n$ (risque empirique **hors des $d$ points** de $I$, qui sont indépendants de $h_{I,z}$).
4. **Hoeffding unilatéral** sur $n-d$ variables (conditionnement, prop. 2.5 du ch.8) + **borne de l'union** sur au plus $2\binom nd+1$ événements ⇒ $\mathbb{P}(R(\widehat g_n)-R(g)\ge\frac{2d}n+2t)\le(2\binom nd+1)e^{-2(n-d)t^2}$ ; choix de $t$.
5. Passage de $R(g)$ à $\inf_{\mathcal C}R$ par **continuité monotone** de $\mathbb P$.
**Intuition :** une classe infinie mais « de dimension $d$ » se comporte comme une classe finie de taille polynomiale en $n$ ($\approx n^d$), d'où $\log|\mathcal C_n|\approx d\log n$.
**Pièges / erreurs classiques :** la Prop. porte sur le MRE **sur $\mathcal C_n$** (classe finie dépendant des données), pas sur $\mathcal C$ ; le terme $2d/n$ vient du lemme combinatoire et du retrait des $d$ points ; hypothèse de **densité** (points en position générale p.s.) et $n>d$.

### Remarque (§1.3) — Résumé : contrôle de l'erreur d'estimation (les trois questions, suite)
**Source :** Poly ch.9, §1.3, p. 21
**Énoncé :**
1. **Choisir $\mathcal C$** : exemples en régression, décomposition approximation/estimation, sur-apprentissage, *no free lunch*, validation croisée (Section 1.2).
2. **Contrôler $R(\hat g^*_{n,\mathcal C})-R(g^*_{\mathcal C})$** : on la majore par les déviations du **processus empirique** $\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|$. Perte 0–1, $\mathcal C$ finie : variables sous-gaussiennes ⇒ grande probabilité par **Hoeffding**, espérance par **Pisier**, extension à une classe infinie possible.
3. **Calculer $\hat g^*_{n,\mathcal C}$** : section suivante.

### Remarque (§1.4, non numérotée) — En classification, minimiser le risque empirique est difficile
**Source :** Poly ch.9, §1.4, p. 21–22 (Figure 5)
**Énoncé :** La question du calcul du minimiseur se pose dès qu'on quitte les classes finies. Avec la perte 0–1, le MRE résout
$$\hat g^*_{n,\mathcal C}=\arg\min_{g\in\mathcal C}\frac1n\sum_{i=1}^n\mathbb{1}_{\{Y_i\ne g(\mathbf X_i)\}}.$$
La perte 0–1 n'est **ni différentiable, ni convexe**, et le risque empirique, vu comme fonction des paramètres de la règle, est **constant par morceaux** : la MRE est un **problème combinatoire**. Cette section décrit la relaxation convexe, « second moyen de contrôle annoncé en ouverture du chapitre ».
**Figure 5 :** à gauche un ensemble d'apprentissage binaire (un attribut réel) ; à droite, le nombre d'erreurs d'une famille de règles indexée par un paramètre réel : fonction **constante par morceaux**, minima = **paliers**.
**Intuition :** pas de gradient exploitable (dérivée nulle presque partout).

### Remarque (§1.4) — Écriture en fonction de la marge (*spinning*)
**Source :** Poly ch.9, §1.4, p. 22
**Hypothèses :** $\mathsf Y=\{-1,1\}$ ; classifieur $g:\mathsf X\to\{-1,1\}$.
**Énoncé :** $g(\mathbf X)Y$ vaut $1$ si la prédiction est correcte et $-1$ sinon, donc
$$g(\mathbf X)\ne Y\iff-g(\mathbf X)Y>0,$$
et
$$\frac1n\sum_{i=1}^n\mathbb{1}_{\{g(\mathbf X_i)\ne Y_i\}}=\frac1n\sum_{i=1}^n\mathbb{1}_{\{-g(\mathbf X_i)Y_i>0\}}=\frac1n\sum_{i=1}^n\varphi_1(-g(\mathbf X_i)Y_i),\qquad\varphi_1:=\mathbb{1}_{[0,+\infty[}.$$
Les deux dernières écritures coïncident parce que $-g(\mathbf X_i)Y_i$ ne prend que les valeurs $-1$ et $1$ (la différence entre $\{>0\}$ et $\{\ge0\}$ ne joue qu'en 0). Cette réécriture est appelée ***spinning*** dans le cours ; la quantité $Yg(\mathbf X)$ est la **marge** de la prédiction.
**Pièges / erreurs classiques :** $\varphi_1$ est l'indicatrice de $[0,+\infty[$ (fermé en 0) : utile quand $g$ devient réelle (voir (4)).

### Définition 1.2 — Classifieur doux
**Source :** Poly ch.9, Définition 1.2, p. 22
**Hypothèses :** notation $\operatorname{signe}(t)=2\operatorname{heaviside}(t)-1$, avec $\operatorname{heaviside}(t)=1$ si $t>0$ et $0$ sinon (comme au ch.8).
**Énoncé :** On appelle **classifieur doux** (*soft classifier*) toute fonction mesurable $h:\mathsf X\to\mathbb{R}$. Le **classifieur dur** (*hard classifier*) associé à $h$ est $g=\operatorname{signe}(h)$.
**Preuve (étapes) :** —
**Intuition :** l'écriture par la marge garde un sens quand $g$ prend des valeurs réelles quelconques ; $|h(\mathbf x)|$ mesure la « confiance ».
**Pièges / erreurs classiques :** $\operatorname{signe}(0)=-1$ avec cette convention (heaviside$(0)=0$), alors que les classifieurs affines de la Prop. 1.2 et le classifieur bayésien du ch.8 utilisent $\mathbb{1}_{\{\cdot\ge0\}}$ (valeur $+1$ en 0). Sans conséquence sous densité, mais à garder en tête (cas d'égalité de (4)).

### Exemple 1.2 — Classifieurs doux linéaires
**Source :** Poly ch.9, Exemple 1.2, p. 22–23
**Énoncé :**
- **Linéaire, ou affine** : $h_\theta(\mathbf x)=\theta_0+\sum_{i=1}^d\theta_ix^{(i)}$, pour $\mathbf x=(x^{(1)},\dots,x^{(d)})$.
- **Linéaire généralisé** : $h_\theta(\mathbf x)=\theta^\top\Phi(\mathbf x)$, où $\Phi$ est une transformation du vecteur des attributs, par exemple
$$\Phi(\mathbf x)=\Big[1,\{x^{(i)}\}_{i=1}^d,\{x^{(i)}x^{(j)}\}_{i,j=1}^d\Big]^\top\qquad\text{ou}\qquad\Phi(\mathbf x)=\Big[\psi_1(x^{(1)}),\psi_2(x^{(2)}),\dots,\psi_d(x^{(d)})\Big]^\top,$$
pour des fonctions réelles $\psi_1,\dots,\psi_d$.
**Méthodes mobilisées :** plongement de caractéristiques (*feature map*) ; la règle reste **linéaire en $\theta$** (clé de la convexité, Ex. 1.3).
**Intuition :** avec $\Phi$ quadratique, les frontières $\{h_\theta=0\}$ sont des quadriques tout en gardant un problème linéaire en $\theta$.

### Remarque (§1.4) — Contrôle de l'erreur du classifieur dur par la marge, éq. (4)
**Source :** Poly ch.9, éq. (4), p. 23
**Hypothèses :** $h$ classifieur doux.
**Énoncé :**
$$\mathbb{1}_{\{\operatorname{signe}(h(\mathbf x))\ne y\}}\le\varphi_1(-y\,h(\mathbf x)),\qquad\mathbf x\in\mathsf X,\ y\in\{-1,1\}.\tag{4}$$
**Preuve (étapes) :** 1. Si $\operatorname{signe}(h(\mathbf x))\ne y$ : ou bien $h(\mathbf x)>0$ et $y=-1$, ou bien $h(\mathbf x)\le0$ et $y=1$ (définition de signe). 2. Dans les deux cas $-y\,h(\mathbf x)\ge0$, donc $\varphi_1(-yh(\mathbf x))=1$. 3. Sinon le membre de gauche est nul et $\varphi_1\ge0$.
**Cas d'égalité :** l'inégalité est une égalité **sauf lorsque $h(\mathbf x)=0$ et $y=-1$** (prédiction $-1$ correcte, mais $\varphi_1(0)=1$).

### Remarque (§1.4) — Convexifier la perte : les pertes de substitution
**Source :** Poly ch.9, §1.4, p. 23 (tableau et Figure 6)
**Hypothèses (sur $\varphi$) :** $\varphi:\mathbb{R}\to\mathbb{R}$ **convexe**, **croissante**, $\varphi(0)=1$ et $\varphi\ge\varphi_1$, c'est-à-dire $\varphi(z)\ge\mathbb{1}_{\{z\ge0\}}$ pour tout $z\in\mathbb{R}$. Pour une fonction croissante valant 1 en 0, cette dernière condition **se réduit à $\varphi\ge0$ sur $]-\infty,0[$**.
**Énoncé (tableau du poly) :**

| perte | $\varphi(z)$ |
|---|---|
| 0–1 | $\mathbb{1}_{[0,+\infty[}(z)$ |
| charnière (*hinge*) | $\max(1+z,0)$ |
| exponentielle | $\exp(z)$ |
| logistique | $\log_2(1+\exp(z))$ |
| quadratique | $(z+1)^2$ |

- Charnière, exponentielle et logistique **remplissent toutes les conditions**.
- La quadratique est convexe, vaut 1 en 0 et majore $\varphi_1$, mais **n'est pas croissante** : elle décroît sur $]-\infty,-1]$, et **pénalise donc aussi les prédictions correctes de grande marge**.
- Figure 6 : charnière (noir), exponentielle (rouge), logistique (vert) en fonction de $z=-y\,h(\mathbf x)$ ; toutes valent 1 en 0 et majorent la perte 0–1.
**Preuve (étapes) :** (vérifications, partiellement en §2.7) convexité : charnière = max de deux fonctions affines ; exponentielle, logistique, quadratique : dérivée seconde positive ($e^z$, $e^z/((1+e^z)^2\log2)$, $2$). Valeur en 0 : $\max(1,0)=1$, $e^0=1$, $\log_2(2)=1$, $1^2=1$. Positivité sur $]-\infty,0[$ : évidente.
**Pièges / erreurs classiques :** la variable est $z=-y\,h(\mathbf x)$ (**moins** la marge) : une grande marge positive correspond à $z\ll0$ ; $\log_2$ (et non $\log$) pour avoir $\varphi(0)=1$.

### Définition 1.3 — $\varphi$-risque et $\varphi$-risque empirique
**Source :** Poly ch.9, Définition 1.3, p. 23
**Hypothèses :** $\varphi$ perte convexe comme ci-dessus ; $h$ classifieur doux.
**Énoncé :** Le **$\varphi$-risque** de $h$ est
$$R_\varphi(h):=\mathbb{E}[\varphi(-Y\,h(\mathbf X))],$$
et son **$\varphi$-risque empirique** est
$$\widehat{\mathrm R}_{n,\varphi}(h):=\frac1n\sum_{i=1}^n\varphi(-Y_ih(\mathbf X_i)).$$
**Commentaire du poly (p. 24) :** le $\varphi$-risque empirique approche le $\varphi$-risque au même sens que le risque empirique approche le risque : pour $h$ **fixé** tel que $R_\varphi(h)<\infty$, c'en est un **estimateur sans biais et convergent**. Il **majore le risque 0–1** du classifieur dur associé (Prop. 1.3).
**Méthodes mobilisées :** linéarité de l'espérance ; LGN (comme pour la Déf. 1.1).

### Proposition 1.3 — Le $\varphi$-risque majore le risque 0–1
**Source :** Poly ch.9, Proposition 1.3, p. 24
**Hypothèses :** $\varphi$ perte convexe comme ci-dessus (en particulier $\varphi\ge\varphi_1$) ; $\widehat{\mathrm R}_n$ et $R$ = risque empirique et risque **pour la perte 0–1**.
**Énoncé :** Pour tout classifieur doux $h$,
$$\widehat{\mathrm R}_n(\operatorname{signe}(h))\le\widehat{\mathrm R}_{n,\varphi}(h)\qquad\text{et}\qquad R(\operatorname{signe}(h))\le R_\varphi(h).$$
**Preuve (étapes) :**
1. D'après **(4)** et l'hypothèse $\varphi\ge\varphi_1$ : $\mathbb{1}_{\{\operatorname{signe}(h(\mathbf x))\ne y\}}\le\varphi_1(-yh(\mathbf x))\le\varphi(-y\,h(\mathbf x))$ pour tous $\mathbf x$, $y$.
2. On applique cette inégalité aux couples $(\mathbf X_i,Y_i)$ et l'on **moyenne** ⇒ première inégalité.
3. On l'applique au couple $(\mathbf X,Y)$ et l'on **prend l'espérance** (croissance de l'espérance) ⇒ seconde inégalité.
**Intuition :** minimiser une majorante convexe pousse aussi vers le bas le risque 0–1.
**Pièges / erreurs classiques :** la Prop. compare des **risques**, pas des **excès de risque** : un faible $\varphi$-risque garantit un faible risque 0–1 seulement si $\inf R_\varphi$ est lui-même petit ; la comparaison des excès de risque est une **question ouverte** traitée au chapitre suivant.

### Remarque (§1.4) — MRE pour une perte générale
**Source :** Poly ch.9, §1.4, p. 24
**Énoncé :** On cherche un classifieur doux $h$, dans une classe donnée, qui minimise $\widehat{\mathrm R}_{n,\varphi}(h)=n^{-1}\sum_{i=1}^n\varphi(-Y_ih(\mathbf X_i))$, et l'on retient le classifieur dur $\operatorname{signe}(h)$.

### Exemple 1.3 — Cas logistique
**Source :** Poly ch.9, Exemple 1.3, p. 24
**Hypothèses :** perte logistique ; classe des classifieurs doux linéaires généralisés $h_\theta=\theta^\top\Phi(\cdot)$.
**Énoncé :**
$$\widehat{\mathrm R}_{n,\varphi}(h_\theta)=\frac1n\sum_{i=1}^n\log_2\Big(1+e^{-Y_i\theta^\top\Phi(\mathbf X_i)}\Big).$$
Cette fonction est **convexe par rapport à $\theta$** : chaque terme est la composée de la fonction convexe $\varphi$ et de la fonction **linéaire** $\theta\mapsto-Y_i\theta^\top\Phi(\mathbf X_i)$ (Section 2.7). On la minimise par des méthodes d'**optimisation convexe** : algorithme du gradient, algorithme de Newton. Avec $\Phi(\mathbf x)=\mathbf x$, ce critère est, **au facteur $1/\log2$ près**, celui que minimise l'EMV du modèle logistique (ch.8, éq. (12)) : les deux approches conduisent ici à **la même règle**.
**Preuve (étapes) :**
1. $\varphi(z)=\log_2(1+e^z)$ convexe ($\varphi''(z)=e^z/((1+e^z)^2\log2)\ge0$, §2.7).
2. $\theta\mapsto-Y_i\theta^\top\Phi(\mathbf X_i)$ affine (linéaire) ⇒ $\varphi\circ A$ convexe (**stabilité par composition avec une application affine**, §2.7).
3. Moyenne à coefficients positifs de fonctions convexes ⇒ convexe (**stabilité par combinaison positive**, §2.7).
4. $\log_2(1+e^z)=\log(1+e^z)/\log2$ ⇒ même argmin que $\frac1n\sum_i\log(1+\exp(-Y_i\theta^\top\mathbf X_i))$ (critère de l'EMV logistique).
**Méthodes mobilisées :** stabilité de la convexité (composition affine, combinaison positive), dérivée seconde ; identification MRE logistique = EMV conditionnel.
**Intuition :** (poly) la perte convexe remplace une fonction **en escalier**, sans pente exploitable, par une fonction convexe, dont **tout minimum local est global** et que les méthodes de gradient savent minimiser. En contrepartie, elle ne compte plus seulement les erreurs : une erreur de **grande marge coûte cher**, et une prédiction correcte de **faible marge coûte encore quelque chose**. Le minimiseur du risque convexifié n'a donc aucune raison d'être celui du risque 0–1, et il peut en différer légèrement (Figure 7).
**Figure 7 (p. 25) :** à gauche, en fonction du paramètre réel d'une famille de règles : nombre d'erreurs (orange, constant par morceaux) et somme des pertes logistiques (bleu, convexe) ; à droite : labels observés (vert), prédictions des règles minimisant le nombre d'erreurs (rouge) et la perte logistique (bleu) : les deux règles changent de label **en des points voisins, mais distincts**.
**Pièges / erreurs classiques :** « la classification logistique figure dans les deux listes » (modélisation et discriminative) : même critère, deux interprétations.

### Remarque (§1.4) — Trois questions ouvertes (sujet du chapitre suivant)
**Source :** Poly ch.9, §1.4, p. 24–25
**Énoncé :** On a remplacé la perte 0–1 par une perte convexe pour des raisons **computationnelles**. Cela soulève :
1. **Contrôle de l'écart entre $R_\varphi$ et $R$.** Un classifieur de faible risque logistique ou charnière a-t-il un faible risque 0–1 ? La Prop. 1.3 répond dans un sens (majoration du risque par le $\varphi$-risque) mais **ne compare pas les excès de risque**.
2. **Contrôle de l'erreur d'estimation** $R_\varphi(\hat g_{n,\mathcal C,\varphi})-R_\varphi(g^*_{\mathcal C,\varphi})$. En pratique on minimise une approximation empirique du risque convexifié sur une **classe infinie** : peut-on contrôler l'erreur d'estimation pour des classes infinies ?
3. **Contrôle de l'erreur d'optimisation.** Comment minimiser le risque convexifié, et avec quelle précision ?

### Remarque (§1.5) — Le programme des exercices
**Source :** Poly ch.9, §1.5, p. 25–26
**Énoncé :** la feuille comporte **sept exercices** (détail en §4 ci-dessous).

---

## 3. Outils mathématiques

> Poly ch.9, §2 « Les outils mathématiques », p. 27–32. Contenu annoncé : inégalités de Markov et de Bienaymé-Tchebychev → bornes de Chernoff (probabilité de déviation ramenée à la fonction génératrice des moments) → lemme puis inégalité de Hoeffding (dont le ch.4 avait admis l'énoncé) ; puis outils élémentaires : borne de l'union, convexité, calcul d'un risque à règle apprise fixée.

### Remarque (Outils §2.1) — Inégalités de Markov et de Bienaymé-Tchebychev
**Source :** Poly ch.9, Outils §2.1, p. 27
**Hypothèses :** $Z\ge0$ v.a. ; $W$ de carré intégrable.
**Énoncé :** (établies au ch.2, prop. 2.1, rappelées au ch.6, lemme 2.1)
$$\mathbb{P}(Z\ge t)\le\frac{\mathbb{E}[Z]}t\quad(t>0),\qquad\mathbb{P}(|W-\mathbb{E}[W]|\ge\varepsilon)\le\frac{\mathrm{Var}(W)}{\varepsilon^2}\quad(\varepsilon>0).$$
**Preuve (étapes) :** 1. Markov : $t\mathbb{1}_{\{Z\ge t\}}\le Z$ puis espérance. 2. BT : Markov appliquée à $(W-\mathbb{E}[W])^2$ et $t=\varepsilon^2$. 3. Comme $\{Z>t\}\subset\{Z\ge t\}$, la majoration vaut aussi pour $\mathbb{P}(Z>t)$ (forme employée dans le deck).

### Remarque (Outils §2.2) — Pourquoi espérer mieux que $1/n$ : intuition par le TCL
**Source :** Poly ch.9, Outils §2.2, p. 27
**Énoncé :** BT donne une majoration en $1/n$ pour une moyenne. Le **TCL** (th. 1.6 du ch.6) montre, pour des v.a. i.i.d. de variance $v=\mathrm{Var}(X_1)$ finie non nulle,
$$\lim_{n\to\infty}\mathbb{P}\Big(\sum_{i=1}^nX_i-n\mathbb{E}[X_1]>\varepsilon\sqrt n\Big)=1-\Phi(\varepsilon/\sqrt v)\le e^{-\varepsilon^2/(2v)},$$
où la dernière inégalité (valable pour $\varepsilon\ge0$) est la majoration classique de la queue gaussienne (admise, §2.10). On s'attend à une décroissance **exponentielle en $\varepsilon^2/v$**. Simple indication : la limite ne dit rien pour $n$ fixé. Idée : utiliser Markov « de façon plus astucieuse », **appliquée à une exponentielle**.

### Proposition 2.1 — Borne de Chernoff
**Source :** Poly ch.9, Outils, Proposition 2.1, p. 27
**Hypothèses :** $Z$ v.a. réelle intégrable ; $\varepsilon>0$ ; $\lambda>0$ tel que $\mathbb{E}[e^{\lambda Z}]<\infty$.
**Énoncé :**
$$\mathbb{P}(Z-\mathbb{E}[Z]\ge\varepsilon)\le\frac{\mathbb{E}\big[e^{\lambda(Z-\mathbb{E}[Z])}\big]}{e^{\lambda\varepsilon}}.$$
En notant $\psi(\lambda)=\log\mathbb{E}[e^{\lambda(Z-\mathbb{E}[Z])}]$ : $\mathbb{P}(Z-\mathbb{E}[Z]\ge\varepsilon)\le\exp\big(-\sup_{\lambda>0}\{\lambda\varepsilon-\psi(\lambda)\}\big)$.
**Preuve (étapes) :**
1. $t\mapsto e^{\lambda t}$ est **strictement croissante** ($\lambda>0$) ⇒ $\{Z-\mathbb{E}[Z]\ge\varepsilon\}=\{e^{\lambda(Z-\mathbb{E}[Z])}\ge e^{\lambda\varepsilon}\}$.
2. **Inégalité de Markov** appliquée à la variable positive $e^{\lambda(Z-\mathbb{E}[Z])}$ ⇒ première majoration.
3. **Infimum sur $\lambda$** ⇒ seconde.
**Suite (p. 27–28) :** il faut borner la transformée de Laplace (fonction génératrice des moments) $\mathbb{E}[e^{\lambda(Z-\mathbb{E}[Z])}]$ puis optimiser en $\lambda$. Si $Z=\sum_{i=1}^nX_i$ avec des $X_i$ **indépendantes** telles que $\mathbb{E}[e^{\lambda X_i}]<\infty$, les $e^{\lambda(X_i-\mathbb{E}[X_i])}$ sont indépendantes et
$$\mathbb{E}\big[e^{\lambda(Z-\mathbb{E}[Z])}\big]=\prod_{i=1}^n\mathbb{E}\big[e^{\lambda(X_i-\mathbb{E}[X_i])}\big],$$
(si même loi : $(\mathbb{E}[e^{\lambda(X_1-\mathbb{E}[X_1])}])^n$) — il suffit de borner chaque facteur. Le ch.4 (Section 5) a présenté ces bornes sous le nom d'**inégalités de Chernoff**.
**Pièges / erreurs classiques :** seulement $\lambda>0$ pour la déviation supérieure ; pour la déviation inférieure, appliquer à $-Z$.

### Définition 2.1 — Variable sous-gaussienne
**Source :** Poly ch.9, Outils, Définition 2.1, p. 28 (cadre de PC9 ex. 2)
**Hypothèses :** $X$ v.a. réelle **centrée** ; $v>0$.
**Énoncé :** $X$ est **sous-gaussienne de facteur de variance $v$** si
$$\psi_X(\lambda):=\log\mathbb{E}\big[e^{\lambda X}\big]\le\frac{\lambda^2v}2\qquad\text{pour tout }\lambda\in\mathbb{R}.$$
On note $\mathcal G(v)$ l'ensemble de ces variables. $\lambda\mapsto\mathbb{E}[e^{\lambda X}]$ est la **transformée de Laplace** de $X$, et $\psi_X$ sa **fonction génératrice des cumulants**.
**Commentaires du poly :** la définition n'exige pas que la variance de $X$ **soit égale** à $v$, seulement qu'elle soit **majorée** par $v$. Exemples (deux premières questions de PC9 ex. 2) : une gaussienne centrée de variance $v$ est dans $\mathcal G(v)$ ; une variable de **Rademacher** (uniforme sur $\{-1,1\}$) est dans $\mathcal G(1)$.
**Pièges / erreurs classiques :** « pour tout $\lambda\in\mathbb{R}$ » (les deux signes) — c'est ce qui donne la symétrie des déviations ; $X$ doit être centrée.

### Proposition 2.2 — Somme et déviations de variables sous-gaussiennes
**Source :** Poly ch.9, Outils, Proposition 2.2, p. 28
**Hypothèses :** (i) $X_1,\dots,X_n$ **indépendantes**, $X_i\in\mathcal G(v_i)$ ; (ii) $X\in\mathcal G(v)$, $t>0$.
**Énoncé :**
(i) $\sum_{i=1}^nX_i\in\mathcal G\big(\sum_{i=1}^nv_i\big)$.
(ii) $\mathbb{P}(X\ge t)\le e^{-t^2/(2v)}$ et $\mathbb{P}(-X\ge t)\le e^{-t^2/(2v)}$.
**Preuve (étapes) :**
1. (i) Une somme de variables centrées est centrée ; **par indépendance**, $\psi_{\sum_iX_i}(\lambda)=\sum_{i=1}^n\psi_{X_i}(\lambda)\le\lambda^2\sum_{i=1}^nv_i/2$.
2. (ii) **Borne de Chernoff** : pour tout $\lambda>0$, $\mathbb{P}(X\ge t)\le\exp(-\lambda t+\lambda^2v/2)$. Le minimum en $\lambda$ du membre de droite est atteint en $\lambda=t/v$ et vaut $e^{-t^2/(2v)}$.
3. Comme $\psi_{-X}(\lambda)=\psi_X(-\lambda)$, $-X\in\mathcal G(v)$ ⇒ seconde majoration.
**Méthodes mobilisées :** indépendance (log de produit = somme), Chernoff, optimisation d'un trinôme en $\lambda$.
**Intuition :** les déviations d'une sous-gaussienne de facteur $v$ sont majorées comme celles d'une $\mathcal N(0,v)$.

### Lemme 1.1 (démonstration, Outils §2.4) — Lemme de Hoeffding par l'argument de Herbst
**Source :** Poly ch.9, Outils §2.4, Démonstration, p. 28–29
**Hypothèses :** $X\in[a,b]$ presque sûrement, centrée.
**Énoncé :** $\psi(\lambda):=\log\mathbb{E}[e^{\lambda X}]\le\lambda^2(b-a)^2/8$ pour tout $\lambda\in\mathbb{R}$ (= Lemme 1.1).
**Preuve (étapes) :**
1. Pour tout $\lambda$, $e^{\lambda X}$ est **bornée** ⇒ $\psi(\lambda)$ bien définie.
2. **Dérivation sous le signe intégral** (ch.3, prop. 2.2) : pour $k\in\{0,1,2\}$ et $\lambda\in[-L,L]$, la dérivée $k$-ième en $\lambda$ de $e^{\lambda X}$ est $X^ke^{\lambda X}$, **dominée** par la constante $M^ke^{LM}$, $M=\max(|a|,|b|)$ ⇒ $\lambda\mapsto\mathbb{E}[e^{\lambda X}]$ deux fois dérivable, de dérivées $\mathbb{E}[Xe^{\lambda X}]$ et $\mathbb{E}[X^2e^{\lambda X}]$.
3. Calcul :
$$\psi'(\lambda)=\frac{\mathbb{E}[Xe^{\lambda X}]}{\mathbb{E}[e^{\lambda X}]},\qquad\psi''(\lambda)=\frac{\mathbb{E}[X^2e^{\lambda X}]\,\mathbb{E}[e^{\lambda X}]-\mathbb{E}[Xe^{\lambda X}]^2}{\mathbb{E}[e^{\lambda X}]^2}=\mathbb{E}\Big[X^2\frac{e^{\lambda X}}{\mathbb{E}[e^{\lambda X}]}\Big]-\Big(\mathbb{E}\Big[X\frac{e^{\lambda X}}{\mathbb{E}[e^{\lambda X}]}\Big]\Big)^2.$$
4. **Loi basculée** : soit $\widetilde{\mathbb P}_\lambda$ la probabilité de densité $e^{\lambda X}/\mathbb{E}[e^{\lambda X}]$ par rapport à $\mathbb P$. Alors $\psi''(\lambda)$ est **la variance de $X$ sous $\widetilde{\mathbb P}_\lambda$**. Comme $\widetilde{\mathbb P}_\lambda\ll\mathbb P$, $X\in[a,b]$ $\widetilde{\mathbb P}_\lambda$-p.s.
5. **La variance est le minimum en $c$ de $\widetilde{\mathbb E}_\lambda[(X-c)^2]$** ; avec $c=(a+b)/2$ et $|X-(a+b)/2|\le(b-a)/2$ p.s. :
$$\psi''(\lambda)=\widetilde{\mathrm{Var}}_\lambda(X)\le\widetilde{\mathbb E}_\lambda\Big[\Big(X-\frac{a+b}2\Big)^2\Big]\le\frac{(b-a)^2}4.$$
6. $\psi(0)=0$ et $\psi'(0)=\mathbb{E}[X]=0$ ; **Taylor-Lagrange à l'ordre deux** : pour un $\xi$ entre 0 et $\lambda$,
$$\psi(\lambda)=\psi(0)+\lambda\psi'(0)+\frac{\lambda^2}2\psi''(\xi)\le\frac{\lambda^2(b-a)^2}8.$$
**Commentaires du poly :** argument de **Herbst** : étudier le log de la transformée de Laplace, majorer sa dérivée seconde, intégrer deux fois. Démonstrations alternatives : convexité de $x\mapsto e^{\lambda x}$ et cosinus hyperbolique. Intérêt de Herbst : s'étend à des inégalités plus fines (**log-Sobolev**), en établissant une inégalité différentielle intégrée à la façon du lemme de **Gronwall**. **Forme non centrée** (PC9 ex. 3) : si $X\in[a,b]$ p.s., $X-\mathbb{E}[X]$ est centrée dans $[a-\mathbb{E}[X],b-\mathbb{E}[X]]$ (même longueur) ⇒ $\psi_X(\lambda)\le\lambda\mathbb{E}[X]+\lambda^2(b-a)^2/8$.
**Méthodes mobilisées :** dérivation sous l'intégrale (domination), changement de probabilité, variance comme minimum de $c\mapsto\mathbb{E}[(X-c)^2]$, Taylor-Lagrange.
**Pièges / erreurs classiques :** le majorant de la variance d'une v.a. dans $[a,b]$ est $(b-a)^2/4$ (et non $(b-a)^2$) ; c'est lui qui donne le $8$.

### Théorème 2.1 — Inégalité de Hoeffding, variables bornées
**Source :** Poly ch.9, Outils, Théorème 2.1, p. 29–30 (= th. 3.1 du ch.4, qui y était admis)
**Hypothèses :** $X_1,\dots,X_n$ v.a. réelles **indépendantes**, $X_i\in[a_i,b_i]$ p.s. avec $a_i<b_i$ ; $S_n:=\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}$, $D_n:=\sum_{i=1}^n(b_i-a_i)^2$ ; $t>0$.
**Énoncé :**
$$\mathbb{P}(S_n\ge t)\le e^{-2t^2/D_n}\qquad\text{et}\qquad\mathbb{P}(S_n\le-t)\le e^{-2t^2/D_n}.$$
**Preuve (étapes) :**
1. Les $X_i-\mathbb{E}[X_i]$ sont **indépendantes, centrées**, à valeurs dans des intervalles de longueurs $b_i-a_i$ ; **lemme de Hoeffding** ⇒ $X_i-\mathbb{E}[X_i]\in\mathcal G((b_i-a_i)^2/4)$.
2. **Prop. 2.2 (i)** ⇒ $S_n\in\mathcal G(D_n/4)$.
3. **Prop. 2.2 (ii)** ⇒ $\mathbb{P}(S_n\ge t)\le e^{-t^2/(2D_n/4)}=e^{-2t^2/D_n}$, et de même pour $\mathbb{P}(-S_n\ge t)$.
**Preuve « du deck » (sans la notion de sous-gaussienne), variables dans $[0,1]$ :** Chernoff + lemme de Hoeffding donnent $\mathbb{P}(S_n\ge t)\le e^{-\lambda t+n\lambda^2/8}$ pour tout $\lambda>0$ ; le minimum en $\lambda$ de l'exposant est atteint en $\lambda=4t/n$ et vaut $-2t^2/n$.
**Pièges / erreurs classiques :** $D_n$ (somme des carrés des longueurs) n'a rien à voir avec l'échantillon $\mathcal D_n$.

### Corollaire 2.1 — Moyenne de variables à valeurs dans $[0,1]$
**Source :** Poly ch.9, Outils, Corollaire 2.1, p. 30 (= Th. 1.3 des fondamentaux)
**Hypothèses :** $X_1,\dots,X_n$ indépendantes à valeurs dans $[0,1]$ ; $\varepsilon>0$.
**Énoncé :**
$$\mathbb{P}\Big(\frac1n\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}\ge\varepsilon\Big)\le e^{-2n\varepsilon^2},\qquad\mathbb{P}\Big(\Big|\frac1n\sum_{i=1}^n\{X_i-\mathbb{E}[X_i]\}\Big|\ge\varepsilon\Big)\le2e^{-2n\varepsilon^2}.$$
**Preuve (étapes) :**
1. **Th. 2.1** avec $a_i=0$, $b_i=1$ ⇒ $D_n=n$, et $t=n\varepsilon$ : chaque déviation unilatérale a une probabilité au plus $e^{-2n^2\varepsilon^2/n}=e^{-2n\varepsilon^2}$.
2. **Sous-additivité de $\mathbb P$** ⇒ bilatéral avec facteur 2.
(C'est l'application de Chernoff et du lemme de Hoeffding aux variables $X_i$ et $1-X_i$ que décrit le deck.)

### Remarque (Outils §2.5) — Hoeffding pour une loi de Bernoulli : comparaison avec la loi exacte
**Source :** Poly ch.9, Outils §2.5, p. 30–31 (Figure 8)
**Hypothèses :** $Z_1,\dots,Z_n$ i.i.d. Bernoulli$(p)$ ; $\sum_iZ_i\sim$ Binomiale$(n,p)$.
**Énoncé :** On compare la borne $2e^{-2n\varepsilon^2}$ à $\mathbb{P}(|n^{-1}\sum_{i=1}^nZ_i-p|>\varepsilon)$ calculée exactement. **Figure 8** : borne (bleu) et probabilité exacte (points noirs) en fonction de $n$ ; en haut $p=0{,}5$, en bas $p=0{,}1$ ; à gauche $\varepsilon=0{,}25$, à droite $\varepsilon=0{,}05$ (le symbole $\varepsilon$ manque dans les titres des panneaux). **La borne est d'autant plus pessimiste que $p$ est loin de $1/2$** : la variance $p(1-p)$ est alors petite, et Hoeffding, qui ne la voit pas, la remplace par son maximum $1/4$. Bennett et Bernstein corrigent cela.
**Intuition :** Hoeffding = pire cas de variance.

### Remarque (Outils §2.6) — La borne de l'union
**Source :** Poly ch.9, Outils §2.6, p. 30
**Hypothèses :** $(A_j)$ suite finie ou dénombrable d'événements.
**Énoncé :**
$$\mathbb{P}\Big(\bigcup_jA_j\Big)\le\sum_j\mathbb{P}(A_j).$$
**Preuve (étapes) :** **sous-additivité d'une mesure** : on écrit la réunion comme réunion **disjointe** des $B_j=A_j\setminus\bigcup_{k<j}A_k$ ($\sigma$-additivité) et l'on utilise $B_j\subset A_j$ (croissance).
**Application :** avec $A_g=\{|\widehat{\mathrm R}_n(g)-R(g)|>\varepsilon\}$, $g\in\mathcal C$ :
$$\mathbb{P}\Big(\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|>\varepsilon\Big)=\mathbb{P}\Big(\bigcup_{g\in\mathcal C}A_g\Big)\le\sum_{g\in\mathcal C}\mathbb{P}(A_g).$$
**Pièges / erreurs classiques :** la borne ne suppose **aucune indépendance** entre événements, ce qui importe ici : les risques empiriques des différentes règles sont calculés **sur le même échantillon** et sont dépendants.

### Remarque (Outils §2.7) — Convexité
**Source :** Poly ch.9, Outils §2.7, p. 31
**Énoncé :** $\varphi:\mathbb{R}\to\mathbb{R}$ est convexe si $\varphi(tz+(1-t)z')\le t\varphi(z)+(1-t)\varphi(z')$ pour tous $z,z'\in\mathbb{R}$, $t\in[0,1]$. (Le ch.2 a rappelé la **droite d'appui**, lemme 2.2, et **Jensen**, th. 2.2.) Deux propriétés de stabilité (vérifiées directement sur la définition) :
- si $\varphi:\mathbb{R}\to\mathbb{R}$ est convexe et $A:\mathbb{R}^p\to\mathbb{R}$ **affine**, alors $\varphi\circ A$ est convexe sur $\mathbb{R}^p$ (car $A(t\theta+(1-t)\theta')=tA(\theta)+(1-t)A(\theta')$) ;
- une **combinaison linéaire à coefficients positifs** de fonctions convexes est convexe.
Conséquence : le $\varphi$-risque empirique d'un classifieur doux linéaire généralisé, $\theta\mapsto n^{-1}\sum_{i=1}^n\varphi(-Y_i\theta^\top\Phi(\mathbf X_i))$, est **convexe en $\theta$** dès que $\varphi$ est convexe. Les pertes charnière, exponentielle, logistique et quadratique sont convexes : la première est le **maximum de deux fonctions affines**, les trois autres ont une **dérivée seconde positive** ($e^z$, $e^z/((1+e^z)^2\log2)$ et $2$).

### Remarque (Outils §2.8) — Le risque d'une règle apprise
**Source :** Poly ch.9, Outils §2.8, p. 31
**Énoncé :** $R(\widehat g_n)=\mathbb{E}[\ell(Y,\widehat g_n(\mathbf X))\mid\mathcal D_n]$ est une **espérance conditionnelle** ; tous les calculs du chapitre l'évaluent en **« gelant »** l'ensemble d'apprentissage. C'est la **proposition 2.5 du ch.8** : si $U$ et $V$ sont indépendantes et $f$ mesurable positive ou bornée, alors $\mathbb{E}[f(U,V)\mid V]=F(V)$ avec $F(v)=\mathbb{E}[f(U,v)]$. Avec $U=(\mathbf X,Y)$ et $V=\mathcal D_n$ : $R(\widehat g_n)=r(\mathcal D_n)$, où $r(d)$ est le risque de la règle fixée $\hat g(\cdot\,;d)$. Utilisée dans la Prop. 1.1, la PC9 ex. 1 et les preuves des compléments.

### Remarque (Outils §2.9) — Les résultats antérieurs mobilisés
**Source :** Poly ch.9, Outils §2.9, p. 31–32
**Énoncé :** employés tels quels :
- **ch.2** : Markov et Bienaymé-Tchebychev (prop. 2.1), droite d'appui d'une fonction convexe et Jensen (lemme 2.2, th. 2.2), Jensen étant employée dans la preuve de Pisier ;
- **ch.3** : dérivation sous le signe intégral (prop. 2.2), dans la preuve du lemme de Hoeffding ;
- **ch.4** : énoncé de Hoeffding (th. 3.1), démontré ici, et inégalités de Chernoff (Section 5) ;
- **ch.6** : TCL (th. 1.6), seulement dans des remarques et blocs d'intuition ;
- **ch.7** : LGN faible pour v.a. i.i.d. intégrables (th. 2.1). La **LGN uniforme** du ch.7 (th. 1.2) porte sur le même type d'objet que $\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|$ (déviation uniforme sur une famille indexée par un paramètre) ;
- **ch.8** : cadre de l'apprentissage supervisé (cadre 1.1), perte, risque, risque bayésien (déf. 1.2, 1.3, 1.4), prédicteur et classifieur bayésiens (th. 1.1 et 1.2), modèle logistique et son EMV (Section 1.3), probabilité d'erreur conditionnelle et risque moyen (Section 4.4), conditionnement par une variable indépendante (prop. 2.5).

### Remarque (Outils §2.10) — Les résultats admis
**Source :** Poly ch.9, Outils §2.10, p. 32
**Énoncé :** trois énoncés utilisés sans démonstration :
- l'**existence** d'un MRE et la possibilité de le choisir **de façon mesurable** en les données (début de la §1.2) ; immédiates pour une classe finie ;
- le **lemme combinatoire** sur les classifieurs affines (Lemme 4.2, §4.6), admis dans PC9 ex. 7 ;
- la majoration de la **queue gaussienne** $1-\Phi(x)\le e^{-x^2/2}$ pour $x\ge0$ (uniquement dans un bloc d'intuition).

---

## 4. Exercices du poly

> **Aucun fichier « Exercices » n'est fourni parmi les sources de cette extraction pour le chapitre 9.** La seule information présente dans les sources extraites est la §1.5 « Le programme des exercices » (p. 25–26), reproduite ci-dessous, complétée par les résultats d'exercices **cités dans le cours**. Les énoncés et corrigés complets se trouvent dans `content/sources/S9_APM-41033-EP-PC9-enonce.txt` et `S9_APM-41033-EP-PC9-corrige.txt` (PDF : `S9_APM-41033-EP-PC9-*.pdf`), **non extraits ici** ; aucun énoncé ni corrigé n'est inventé.

### Exercice 1 (PC9) — Erreur de validation
**Source :** Poly ch.9, §1.5, p. 25 (et §1.2, p. 11 ; §2.8)
**Description du poly :** étude de l'erreur de validation $\widehat R_{n,m}$ d'une règle $g_n$ construite sur $\mathcal D_n$, calculée sur $m$ couples **indépendants** de $\mathcal D_n$. On montre que $\mathbb{E}[\widehat R_{n,m}\mid\mathcal D_n]=R(g_n)$, que $m\widehat R_{n,m}$ suit, **conditionnellement à $\mathcal D_n$**, une loi **binomiale** de paramètres $m$ et $R(g_n)$, et l'on en tire deux majorations de $\mathbb{P}(|\widehat R_{n,m}-R(g_n)|\ge\varepsilon)$, par **Bienaymé-Tchebychev** puis par **Hoeffding**. Résultat cité en §1.2 : $\mathbb{P}(|\widehat R_{n,m}-R(g_n)|\ge\varepsilon)\le2e^{-2m\varepsilon^2}$ pour tout $\varepsilon>0$.
**Méthodes annoncées :** conditionnement par une variable indépendante (prop. 2.5 du ch.8, §2.8), loi binomiale, Bienaymé-Tchebychev, Hoeffding. *(La forme exacte de la borne BT n'est pas écrite dans les sources extraites.)*

### Exercice 2 (PC9) — Variables sous-gaussiennes
**Source :** Poly ch.9, §1.5, p. 25 (et §2.3)
**Description du poly :** variables sous-gaussiennes de facteur $v$ : la loi $\mathcal N(0,v)$ et la loi de **Rademacher** en sont des exemples ; la classe est **stable par somme de variables indépendantes** ; l'inégalité de **Chernoff** donne $\mathbb{P}(X>t)\vee\mathbb{P}(-X>t)\le e^{-t^2/(2v)}$.
**Méthodes annoncées :** transformée de Laplace, indépendance, borne de Chernoff, optimisation en $\lambda$ (cf. Déf. 2.1, Prop. 2.2).

### Exercice 3 (PC9) — Lemme et inégalité de Hoeffding
**Source :** Poly ch.9, §1.5, p. 25 (et §2.4)
**Description du poly :** démontrer le lemme de Hoeffding par l'étude de la fonction génératrice des cumulants $\psi_X$, dont la dérivée seconde est **la variance d'une loi modifiée**, et en déduire l'inégalité de Hoeffding pour une somme de variables indépendantes bornées. Forme non centrée : $\psi_X(\lambda)\le\lambda\mathbb{E}[X]+\lambda^2(b-a)^2/8$.
**Méthodes annoncées :** argument de Herbst, dérivation sous l'intégrale, Taylor-Lagrange, Chernoff (cf. §3).

### Exercice 4 (PC9) — Inégalité de Pisier et classe de toutes les règles sur un ensemble fini
**Source :** Poly ch.9, §1.5, p. 25 (et §4.4)
**Description du poly :** démontrer l'inégalité de Pisier, en déduire la borne en espérance du Th. 1.8, puis l'appliquer à **la classe de toutes les règles** lorsque l'ensemble des attributs est **fini, de cardinal $K$** : l'excès de risque moyen du MRE est alors d'ordre $\sqrt{K/n}$.
**Méthodes annoncées :** Jensen, majoration du max par la somme, optimisation en $\lambda$ ; $|\mathcal C|=2^K$ ⇒ $\log|\mathcal C|=K\log2$ *(remarque d'extraction : c'est ce qui donne l'ordre $\sqrt{K/n}$ via $\sqrt{\log(2|\mathcal C|)/(2n)}$ ; le poly n'écrit pas ce calcul dans les sources extraites)*.

### Exercice 5 (PC9) — Hyper-rectangles
**Source :** Poly ch.9, §1.5, p. 25
**Description du poly :** appliquer Hoeffding à l'estimation, par un sous-échantillon tiré uniformément, de la proportion des points d'un ensemble fini qui tombent dans un **hyper-rectangle**, puis rendre l'estimation **uniforme sur tous les hyper-rectangles** en se ramenant à une famille finie déterminée par l'échantillon.
**Méthodes annoncées :** Hoeffding, borne de l'union, réduction d'une famille infinie à une famille finie (même idée que la Prop. 1.2).

### Exercice 6 (PC9) — Théorème *no free lunch*
**Source :** Poly ch.9, §1.5, p. 25 (et §4.1)
**Description du poly :** démontrer le Th. 1.1 lorsque l'ensemble des attributs est infini, en **moyennant sur tous les étiquetages** d'un ensemble de $K$ points. (La §4.1 en est la réécriture pour des labels dans $\{-1,1\}$.)
**Méthodes annoncées :** argument probabiliste (moyenne ≤ max), indépendance, $(1-1/K)^n\to1$.

### Exercice 7 (PC9) — Classifieurs par hyperplan
**Source :** Poly ch.9, §1.5, p. 25–26 (et Prop. 1.2, §4.6)
**Description du poly :** expression du risque des classifieurs par hyperplan à l'aide des **fonctions de répartition conditionnelles de $\mathbf a^\top\mathbf X$** ; réduction à au plus $2\binom nd$ classifieurs passant par $d$ points de l'ensemble d'apprentissage ; bornes en probabilité et en espérance de l'excès de risque, qui sont celles de la Prop. 1.2 (borne en espérance par intégration de la queue, comme au Lemme 4.1). Le lemme combinatoire (Lemme 4.2) y est **admis**.
**Méthodes annoncées :** Hoeffding unilatéral, borne de l'union, conditionnement (prop. 2.5 du ch.8), lemme combinatoire admis, intégration de la queue.

---

## 5. Hors programme / compléments

> Poly ch.9, §4 « Les compléments », p. 34–40 — **contenus non exigibles** (« Les contenus de cette partie ne sont pas exigibles »). Annoncé : démonstration du *no free lunch*, bornes PAC du polycopié d'origine (cas réalisable et agnostique), application aux histogrammes, démonstration de Pisier, inégalité de McDiarmid, démonstration de l'extension aux classifieurs affines, références.

### §4.1 — Démonstration du théorème *no free lunch*
**Source :** Poly ch.9, Compléments §4.1, p. 34 (= PC9 ex. 6 réécrit pour labels $\pm1$)
**Idée :** loi $\mathbb P_{\mathbf b}$ : $\mathbf X$ uniforme sur $K$ points distincts $a_1,\dots,a_K$, label $Y=b_j$ en $a_j$ ; on **moyenne sur $\mathbf b$ uniforme** dans $\{-1,1\}^K$ ; un point test non vu a un label indépendant des labels vus.
**Résultat principal :** voir Th. 1.1 (§2) pour les étapes ; identité clé
$$\frac1{2^K}\sum_{\mathbf b\in\{-1,1\}^K}\mathbb{E}_{\mathbf b}[R(\widehat g_n)]=\mathbb{P}(\widehat g_n(\mathbf X;\mathcal D_n)\ne Y)\ge\mathbb{P}(\widehat g_n(\mathbf X;\mathcal D_n)\ne Y,\ J\notin\{J_1,\dots,J_n\})=\frac12\Big(1-\frac1K\Big)^n\ge\frac12-\varepsilon.$$
**Forme plus faible (polycopié d'origine)** : loi fixée une fois pour toutes : pour toute suite de règles et toute suite $(a_n)\to0$, il existe une loi avec $R^\star=0$ et $\mathbb{E}[R(\widehat g_n)]\ge a_n$ pour tout $n$ : **la convergence du risque moyen peut être arbitrairement lente** (preuve : Devroye, Györfi, Lugosi, *A Probabilistic Theory of Pattern Recognition*, ch.7).

### Définition 4.1 — Règle PAC
**Source :** Poly ch.9, Compléments §4.2, Définition 4.1, p. 35
**Énoncé :** $\varepsilon>0$, $\delta\in]0,1[$, $\mathcal C$ famille de règles de classification, $R(g)=\mathbb{P}(g(\mathbf X)\ne Y)$. Une règle $\widehat g_n\in\mathcal C$ construite sur $\mathcal D_n$ est **probablement approximativement correcte** avec précision $\varepsilon$ et confiance $1-\delta$, ou **$(\varepsilon,\delta)$-PAC**, si
$$\mathbb{P}\Big(R(\widehat g_n)-\inf_{g\in\mathcal C}R(g)\ge\varepsilon\Big)\le\delta.$$
**Idée :** cadre de L. Valiant (1984). On exige la précision avec probabilité $\ge1-\delta$ (exiger $\delta=0$ serait excessif : un échantillon peu représentatif peut toujours se produire) mais **pour toutes les lois** de $(\mathbf X,Y)$.

### Théorème 4.1 — Borne PAC élémentaire (cas réalisable)
**Source :** Poly ch.9, Compléments §4.2, Théorème 4.1, p. 35
**Hypothèses :** $|\mathcal C|<\infty$ et $\min_{g\in\mathcal C}R(g)=0$ (cas **réalisable** : le classifieur bayésien est dans la classe, $R^\star=0$) ; $\hat g^*_{n,\mathcal C}$ MRE.
**Résultat principal :** pour tout $n\in\mathbb{N}^*$, $\varepsilon>0$ : $\mathbb{P}(R(\hat g^*_{n,\mathcal C})\ge\varepsilon)\le|\mathcal C|\,e^{-n\varepsilon}$.
**Preuve (résumé) :** $g_0$ de risque nul ⇒ $\widehat{\mathrm R}_n(g_0)=0$ p.s. (positif d'espérance nulle) ⇒ $\widehat{\mathrm R}_n(\hat g^*_{n,\mathcal C})=0$ p.s. ; donc $\{R(\hat g^*_{n,\mathcal C})\ge\varepsilon\}\subset\bigcup_{g:R(g)\ge\varepsilon}\{\widehat{\mathrm R}_n(g)=0\}$ ; borne de l'union et $\mathbb{P}(\widehat{\mathrm R}_n(g)=0)=(1-R(g))^n\le(1-\varepsilon)^n\le e^{-n\varepsilon}$ ($n\widehat{\mathrm R}_n(g)\sim$ Binomiale$(n,R(g))$).
**Conséquences :** MRE $(\varepsilon,\delta)$-PAC dès que $n\ge(\log|\mathcal C|+\log(1/\delta))/\varepsilon$ ; avec le Lemme 4.1 ($C=|\mathcal C|$, $\alpha=n$) : $\mathbb{E}[R(\hat g^*_{n,\mathcal C})]\le(1+\log|\mathcal C|)/n$ — **vitesse $1/n$** et non $1/\sqrt n$.

### Lemme 4.1 — Intégration d'une queue exponentielle
**Source :** Poly ch.9, Compléments §4.2, Lemme 4.1, p. 35–36
**Résultat principal :** $Z\ge0$, $C\ge1$, $\alpha>0$. Si $\mathbb{P}(Z\ge\varepsilon)\le Ce^{-\alpha\varepsilon}$ pour tout $\varepsilon>0$, alors $\mathbb{E}[Z]\le(1+\log C)/\alpha$. Si $\mathbb{P}(Z\ge\varepsilon)\le Ce^{-\alpha\varepsilon^2}$ pour tout $\varepsilon>0$, alors $\mathbb{E}[Z]\le\sqrt{(1+\log C)/\alpha}$.
**Preuve (résumé) :** $\mathbb{E}[Z]=\int_0^\infty\mathbb{P}(Z>t)\,dt\le u+C\int_u^\infty e^{-\alpha t}dt=u+Ce^{-\alpha u}/\alpha$, choix $u=(\log C)/\alpha$ ; second cas : appliquer le premier à $Z^2$ puis Jensen $\mathbb{E}[Z]\le\sqrt{\mathbb{E}[Z^2]}$.

### §4.2 (suite) — Le cas agnostique
**Source :** Poly ch.9, Compléments §4.2, p. 36
**Idée :** aucune hypothèse sur la loi (le classifieur bayésien n'est pas supposé dans la classe) : bornes PAC **agnostiques** ; point de vue différent de la modélisation.
**Résultats principaux :**
- (Hoeffding unilatéral sur $R(g)-\widehat{\mathrm R}_n(g)$ + union) pour tout $\delta\in]0,1[$ :
$$\mathbb{P}\Big(\forall g\in\mathcal C,\ R(g)\le\widehat{\mathrm R}_n(g)+\sqrt{\frac{\log|\mathcal C|+\log(1/\delta)}{2n}}\Big)\ge1-\delta.$$
- (Th. 1.2 + Th. 1.5 avec inégalités larges)
$$\mathbb{P}\Big(R(\hat g^*_{n,\mathcal C})-\inf_{g\in\mathcal C}R(g)\ge\varepsilon\Big)\le\mathbb{P}\Big(\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|\ge\frac\varepsilon2\Big)\le2|\mathcal C|\,e^{-n\varepsilon^2/2},$$
donc MRE $(\varepsilon,\delta)$-PAC dès que $n\ge2\{\log(1/\delta)+\log(2|\mathcal C|)\}/\varepsilon^2$.
- Lemme 4.1 avec $C=2|\mathcal C|$, $\alpha=2n$ : $\mathbb{E}[\sup_{g}|\widehat{\mathrm R}_n(g)-R(g)|]\le\sqrt{(1+\log(2|\mathcal C|))/(2n)}$, un peu moins bon que $\sqrt{\log(2|\mathcal C|)/(2n)}$ (Pisier).
- $\log_2|\mathcal C|$ = nombre de bits pour désigner une règle de $\mathcal C$ (lien avec la théorie de l'information et du codage, « pas fortuit »).

### §4.3 — Application : la classification par histogramme
**Source :** Poly ch.9, Compléments §4.3, p. 36–37
**Idée :** partition $\{Q_1,\dots,Q_m\}$ de $\mathsf X$ (ex. $\mathsf X=[0,1]^d$, $q$ intervalles par axe, $m=q^d$ hypercubes) ; classe $\mathcal C=\{g=\sum_{j=1}^md_j\mathbb{1}_{Q_j}:(d_1,\dots,d_m)\in\{-1,1\}^m\}$, $|\mathcal C|=2^m$. $\widehat{\mathrm R}_n(g)=\sum_{j=1}^m\frac1n\sum_{i=1}^n\mathbb{1}_{\{\mathbf X_i\in Q_j\}}\mathbb{1}_{\{Y_i\ne d_j\}}$ se minimise **cellule par cellule** : **vote majoritaire** dans chaque cellule = MRE.
**Résultat principal :** (Th. 1.6 et 1.8 avec $|\mathcal C|=2^m$)
$$\mathbb{P}\Big(R(\hat g^*_{n,\mathcal C})-\inf_{g\in\mathcal C}R(g)\le2\sqrt{\frac{(m+1)\log2+\log(1/\delta)}{2n}}\Big)\ge1-\delta,\qquad\mathbb{E}\big[R(\hat g^*_{n,\mathcal C})\big]-\inf_{g\in\mathcal C}R(g)\le\sqrt{\frac{(m+1)\log2}{2n}}.$$
L'erreur d'estimation est contrôlée par $m/n$ : il faut **peu de cellules devant $n$** pour que chaque vote majoritaire ait un sens.

### §4.4 — Démonstration de l'inégalité de Pisier
**Source :** Poly ch.9, Compléments §4.4, p. 37 (= PC9 ex. 4)
**Idée / résultat :** voir Th. 1.7 (§2) : Jensen + $\max\le$ somme ⇒ $\mathbb{E}[\max_iZ_i]\le\log(m)/\lambda+\lambda\sigma^2/2$, $\lambda=\sqrt{2\log m}/\sigma$ ⇒ $\sigma\sqrt{2\log m}$ ; appliquer aux $2m$ variables $\pm Z_i$ ⇒ $\mathbb{E}[\max_i|Z_i|]\le\sigma\sqrt{2\log(2m)}$.

### Définition 4.2 — Différences bornées
**Source :** Poly ch.9, Compléments §4.5, Définition 4.2, p. 38
**Énoncé :** $\mathsf A$ espace mesurable. $f:\mathsf A^n\to\mathbb{R}$ mesurable est **à différences bornées** s'il existe $c_1,\dots,c_n$ tels que, pour tout $i$,
$$\sup_{x_1,\dots,x_n,x_i'\in\mathsf A}|f(x_1,\dots,x_n)-f(x_1,\dots,x_{i-1},x_i',x_{i+1},\dots,x_n)|\le c_i.$$

### Théorème 4.2 — Inégalité de McDiarmid
**Source :** Poly ch.9, Compléments §4.5, Théorème 4.2, p. 38
**Idée :** Hoeffding porte sur une moyenne ; pour les classes infinies il faut concentrer $\sup_{g}|\widehat{\mathrm R}_n(g)-R(g)|$ elle-même, qui n'est pas une moyenne mais dépend peu de chaque observation. (Ouvre le chapitre suivant du polycopié d'origine.)
**Résultat principal :** $X_1,\dots,X_n$ indépendantes à valeurs dans $\mathsf A$, $f$ à différences bornées de constantes $c_i$, $G=f(X_1,\dots,X_n)$ ; pour tout $t>0$ :
$$\mathbb{P}(G-\mathbb{E}[G]\ge t)\le\exp\Big(-\frac{2t^2}{\sum_{i=1}^nc_i^2}\Big)\qquad\text{et}\qquad\mathbb{P}(G-\mathbb{E}[G]\le-t)\le\exp\Big(-\frac{2t^2}{\sum_{i=1}^nc_i^2}\Big).$$
Pour $f=n^{-1}\sum x_i$ et $\mathsf A=[0,1]$ : $c_i=1/n$, on retrouve Hoeffding.
**Preuve (résumé) :** martingale de Doob : $H_i(x_1,\dots,x_i):=\int f(x_1,\dots,x_i,u_{i+1},\dots,u_n)\,\mu_{i+1}(du_{i+1})\cdots\mu_n(du_n)$ ($H_n=f$, $H_0=\mathbb{E}[G]$, Fubini), $V_i=H_i(X_{1:i})-H_{i-1}(X_{1:i-1})$, $G-\mathbb{E}[G]=\sum_iV_i$ ; conditionnellement à $X_{1:i-1}$, $V_i$ est centrée dans un intervalle de longueur $\le c_i$ ⇒ **lemme de Hoeffding** : $\mathbb{E}[e^{sV_i}\mid X_1,\dots,X_{i-1}]\le e^{s^2c_i^2/8}$ (prop. 2.5 du ch.8) ; récurrence ⇒ $\mathbb{E}[e^{s(G-\mathbb{E}G)}]\le e^{s^2\sum_ic_i^2/8}$ ; Chernoff avec $s=4t/\sum_ic_i^2$ ; appliquer à $-f$.

### Corollaire 4.1 — Concentration de la déviation uniforme
**Source :** Poly ch.9, Compléments §4.5, Corollaire 4.1, p. 39
**Résultat principal :** $\mathcal C$ finie ou dénombrable, perte 0–1, $\varepsilon>0$ :
$$\mathbb{P}\Big(\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|-\mathbb{E}\Big[\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|\Big]\ge\varepsilon\Big)\le e^{-2n\varepsilon^2}$$
(idem déviation inférieure) ; avec probabilité $\ge1-\delta$ :
$$\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|\le\mathbb{E}\Big[\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|\Big]+\sqrt{\frac{\log(1/\delta)}{2n}}.$$
**Preuve (résumé) :** $f((\mathbf x_1,y_1),\dots)=\sup_g|n^{-1}\sum_i\mathbb{1}_{\{g(\mathbf x_i)\ne y_i\}}-R(g)|$ à différences bornées $c_i=1/n$ (changer un couple modifie chaque moyenne d'au plus $1/n$) ; McDiarmid avec $\sum c_i^2=1/n$.
**Idée :** la déviation uniforme est concentrée autour de sa moyenne **indépendamment de la loi et du cardinal** ; reste à majorer l'espérance (théorie de **Vapnik-Chervonenkis**, hors chapitre).

### §4.6 — Extension aux classifieurs affines (preuve de la Prop. 1.2) et Lemme 4.2
**Source :** Poly ch.9, Compléments §4.6, p. 39–40 (= PC9 ex. 7)
**Idée :** loi de $\mathbf X$ à densité ⇒ p.s. toute famille de $d$ attributs distincts est **affinement indépendante** et définit un unique hyperplan. Pour $I=\{i_1<\dots<i_d\}$, $(\mathbf a_I,b_I)$ choisi mesurablement, $h_{I,z}(\mathbf x):=2\mathbb{1}_{\{z(\mathbf a_I^\top\mathbf x+b_I)\ge0\}}-1$, $z\in\{-1,1\}$ ; $\mathcal C_n$ = ces classifieurs, $|\mathcal C_n|\le2\binom nd$.
**Lemme 4.2 (lemme combinatoire, admis)** : presque sûrement, pour toute $g\in\mathcal C$, $\widehat{\mathrm R}_n(\widehat g_n)\le\widehat{\mathrm R}_n(g)+d/n$. (Faire pivoter/translater un hyperplan jusqu'à ce qu'il passe par $d$ points ne change la classification que de ces $d$ points au plus ; preuve : Devroye–Györfi–Lugosi, ch.4.)
**Preuve de la Prop. 1.2 (résumé) :** décomposition en trois termes ; terme du milieu $\le d/n$ (Lemme 4.2) ; $\widehat{\mathrm R}_n(h)\ge((n-d)/n)\widehat{\mathrm R}^I_n(h)$ et $\widehat{\mathrm R}^I_n\le1$ ⇒ $R(h_{I,z})-\widehat{\mathrm R}_n(h_{I,z})\le R(h_{I,z})-\widehat{\mathrm R}^I_n(h_{I,z})+d/n$ ; d'où
$$R(\widehat g_n)-R(g)\le\max_{I,z}\big\{R(h_{I,z})-\widehat{\mathrm R}^I_n(h_{I,z})\big\}+\big\{\widehat{\mathrm R}_n(g)-R(g)\big\}+\frac{2d}n ;$$
Hoeffding unilatéral sur les $n-d$ couples hors de $I$ (indépendants de $h_{I,z}$, prop. 2.5 du ch.8) : $\le e^{-2(n-d)t^2}$, et $\mathbb{P}(\widehat{\mathrm R}_n(g)-R(g)\ge t)\le e^{-2nt^2}\le e^{-2(n-d)t^2}$ ; union :
$$\mathbb{P}\Big(R(\widehat g_n)-R(g)\ge\frac{2d}n+2t\Big)\le\Big(2\binom nd+1\Big)e^{-2(n-d)t^2},$$
$t=\sqrt{\log((2\binom nd+1)/\delta)/(2(n-d))}$, $\Delta=2d/n+2t$ ; enfin $g_k$ avec $R(g_k)\le\inf R+1/k$ et **continuité monotone** de $\mathbb P$. Borne en espérance (PC9 ex. 7) par intégration de la queue comme au Lemme 4.1.

### §4.7 — Pour aller plus loin
**Source :** Poly ch.9, Compléments §4.7, p. 40
**Idée :** références : M. Ledoux, *The Concentration of Measure Phenomenon* (AMS, 2001) ; S. Boucheron, G. Lugosi, P. Massart, *Concentration Inequalities: A Nonasymptotic Theory of Independence* (OUP, 2013) — argument de Herbst, Bennett, Bernstein, McDiarmid ; premiers chapitres accessibles avec les outils du chapitre.

---

## 6. Liens avec les autres chapitres

**Prérequis :**
- **Ch.2** : inégalités de Markov et Bienaymé-Tchebychev (prop. 2.1), droite d'appui, **Jensen** (lemme 2.2, th. 2.2) — utilisées pour Chernoff et Pisier.
- **Ch.3** : dérivation sous le signe intégral (prop. 2.2) — preuve du lemme de Hoeffding.
- **Ch.4** : énoncé de l'inégalité de Hoeffding (th. 3.1, **admis au ch.4, démontré ici**) ; inégalités de Chernoff (Section 5).
- **Ch.6** : TCL (th. 1.6) — dans les intuitions (exposant gaussien, contre-exemple $2e^{-2n\varepsilon}$).
- **Ch.7** : LGN (th. 2.1) pour la convergence de $\widehat{\mathrm R}_n(g)$ à $g$ fixée ; **LGN uniforme** (th. 1.2) et preuve de consistance des M-estimateurs : même structure « $2\sup$ » que le Th. 1.2 du ch.9 (*remarque d'extraction, non écrite dans le poly :* le MRE minimise une moyenne empirique de pertes, comme un M-estimateur maximise une moyenne empirique ; le poly signale seulement, en §2.9, que la LGN uniforme porte sur le même type d'objet que $\sup_{g\in\mathcal C}|\widehat{\mathrm R}_n(g)-R(g)|$).
- **Ch.8** : tout le cadre (cadre 1.1, déf. 1.1–1.4, th. 1.1–1.2 prédicteur/classifieur bayésien), approche par modélisation (Section 1.3 : LDA/QDA, logistique, linéaire gaussien, bayésien naïf, $k$-ppv), prop. 1.5 (excès de risque du plug-in), prop. 2.5 (conditionnement par une variable indépendante), Section 4.3 (sur-apprentissage en classification), Section 4.4 (risque moyen), Section 4.6 et figure 9 (compromis approximation/estimation), éq. (12) (EMV logistique).

**Suites :**
- **Chapitre suivant** (annoncé §1.4) : les trois questions ouvertes du risque convexifié — comparaison des **excès de risque** $R$ vs $R_\varphi$ (calibration des pertes), **erreur d'estimation pour des classes infinies** (McDiarmid, théorie de Vapnik-Chervonenkis évoquée en §4.5), **erreur d'optimisation** (gradient, Newton).
- Le **lien EMV logistique = MRE logistique** (Ex. 1.3) relie les deux approches : un même critère, deux justifications (modèle vs classe + perte).

---

## 7. Idées de visualisations interactives pertinentes pour ce chapitre

1. **Sur-apprentissage polynomial** : nuage de points simulés autour d'une fonction (type Fig. 3) ; curseur du degré $0\to20$ ; afficher le MRE (moindres carrés), le risque empirique et le risque (estimé sur un grand échantillon test) en fonction du degré → courbes en U (sous-/sur-apprentissage), lien avec le tableau p. 10.
2. **Décomposition approximation / estimation** : schéma de la Fig. 4 animé ($g^\star$, oracle $g^*_{\mathcal C}$, $\hat g_{n,\mathcal C}$) avec curseurs « taille de la classe » et « $n$ » ; barres empilées des deux erreurs.
3. **Hoeffding vs loi binomiale exacte** (Fig. 8) : curseurs $p$, $\varepsilon$, $n$ ; tracer $2e^{-2n\varepsilon^2}$, la probabilité exacte $\mathbb{P}(|\bar Z_n-p|>\varepsilon)$, la borne de Bienaymé-Tchebychev $p(1-p)/(n\varepsilon^2)$ et les formes **fausses** ($2e^{-2n\varepsilon}$ avec $\varepsilon=n^{-1/2}$) pour visualiser le piège des trois écritures.
4. **Calculateur de taille d'échantillon** : entrer $\varepsilon$, $\delta$, $|\mathcal C|$ → $n\ge\ln(2/\delta)/(2\varepsilon^2)$ (Th. 1.4) et $n$ tel que $2\sqrt{\log(2|\mathcal C|/\delta)/(2n)}\le\varepsilon$ (Th. 1.6) ; montrer « précision ×10 ⇒ $n$ ×100 » et la dépendance logarithmique en $|\mathcal C|$ et $\delta$.
5. **Biais optimiste du MRE** (Prop. 1.1) : simulation Monte-Carlo sur une classe finie de seuils (classifieurs $\mathbb{1}_{\{x\ge s\}}$) ; histogramme de $\widehat{\mathrm R}_n(\hat g^*)$ vs $R(\hat g^*)$, comparaison avec $\inf_{\mathcal C}R$ et avec $\sqrt{\log(2|\mathcal C|)/(2n)}$ (Th. 1.8) quand $|\mathcal C|$ varie.
6. **Pertes de substitution** (Fig. 6) : tracer $\varphi_1$, charnière, exponentielle, logistique, quadratique en fonction de $z=-y\,h(\mathbf x)$ ; cocher/décocher ; mettre en évidence la non-monotonie de la quadratique sur $]-\infty,-1]$.
7. **Risque 0–1 en escalier vs risque logistique convexe** (Fig. 5 et 7) : données 1D, famille de seuils indexée par $\theta$ ; tracer le nombre d'erreurs (paliers) et la somme des pertes logistiques ; montrer les deux minimiseurs et les points où ils changent de label.
8. **No free lunch** : $K$ points avec labels aléatoires ; curseurs $n$ et $K$ ; probabilité qu'un point test n'ait pas été vu, $(1-1/K)^n$, et minorant $\frac12(1-1/K)^n$ du risque moyen (moyenné sur les étiquetages) de n'importe quelle règle, comparé à $R^\star=0$.
