# Chapitre 6 — Statistiques asymptotiques

> **Sources extraites :** `S6_APM41033-Week6-Cours` (poly p. 7–35 : introduction p. 7–8, §1 « Les fondamentaux » p. 9–35), `S6_APM41033-Week6-Maths` (§2 « Les outils mathématiques », p. 36–41), `S6_APM41033-Week6-Compléments` (§4 « Les compléments », p. 43–46, **hors programme d'examen**).
> **Pas de fichier « Exercices » dans le poly pour la semaine 6.** Le poly (§1.13, p. 35) décrit « la feuille de la semaine » (7 exercices) ; ces exercices sont ceux de la **PC6** (`S6_APM-41033-EP-PC6-enonce`, 6 p., et `S6_APM-41033-EP-PC6-corrige`, p. 7–27). La section 4 ci-dessous reprend leurs énoncés et corrigés, cités « Énoncé PC6, p. N » et « Corrigé PC6, p. N ». Quand un calcul n'est pas écrit dans le corrigé et a été complété ici, c'est signalé « *(complément d'extraction)* ».
> **Numérotation du poly :** les encadrés sont numérotés « N.M » avec N = section : §1 (Définitions 1.1–1.11, Théorèmes 1.1–1.8, Propositions 1.1–1.3, Lemme 1.1, Corollaire 1.1, **Méthode 1.1**, Exemples 1.1–1.14), §2 Outils (Définitions 2.1–2.4, Propositions 2.1–2.2, Théorèmes 2.1–2.3, Lemmes 2.1–2.4), §4 Compléments (Théorèmes 4.1–4.4). Équations numérotées (1)–(5) : (1) fonction caractéristique gaussienne, (2) décomposition de la variance empirique, (3) $\sigma^{-2}S_n^2\to1$, (4) TCL de Bernoulli, (5) pivot de Wilson. Figures 1–5.
> **Les remarques ne sont pas numérotées dans le poly** : elles sont repérées ici par leur section et leur page, p. ex. « Remarque (§1.6, p. 20) ». L'encadré « Méthode 1.1 » est un type d'encadré propre au poly, conservé tel quel.
> **Pages :** pagination du poly complet (en-têtes) ; PDF Cours : page PDF $k$ = page poly $k+6$.
> **Renvois du poly au « polycopié d'origine »** (théorèmes IV-5.26, IV-5.30, IV-5.36, IV-5.39, IV-5.17, IV-5.20) : ce sont des références à un autre document ; ils servent à signaler les résultats **admis**.

---

## 0. Résumé en 10 lignes (ce qu'il faut retenir pour l'examen)

1. **Cadre** : une *suite d'expériences statistiques* $\{(\mathsf{Z}_n,\mathcal{Z}_n,\{\mathbb{P}_{n,\theta}:\theta\in\Theta\}):n\in\mathbb{N}\}$ avec **le même** $\Theta\subseteq\mathbb{R}^d$ (Déf. 1.1) ; cas typique : $n$-échantillon, $\mathbb{P}_{n,\theta}=\mathbb{Q}_\theta^{\otimes n}$ (Ex. 1.1).
2. **Consistance** (Déf. 1.2) : $\forall\theta,\forall\varepsilon>0$, $\mathbb{P}_{n,\theta}(\|T_n(Z_n)-g(\theta)\|\ge\varepsilon)\to0$, noté $T_n(Z_n)\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}g(\theta)$. Ni impliquée par, ni impliquant l'absence de biais asymptotique (Déf. 1.3). Exemple : $X_{n:n}$ pour $\mathcal{U}([0,\theta])$, $\mathbb{P}_{n,\theta}(\lvert\hat\theta_n-\theta\rvert>\varepsilon)=(1-\varepsilon/\theta)^n$ (Ex. 1.2).
3. **Schéma de consistance** : **LGN faible** (Th. 1.2, variables décorrélées, $n^{-2}\sum\mathrm{Var}_n(X_k)\to0$, preuve Bienaymé + Bienaymé-Tchebychev) pour la moyenne empirique, puis **théorème de continuité** (Th. 1.1 ; $\varphi$ continue **aux points de $g(\Theta)$** seulement). Ex. 1.3 : $1/\bar X_n$ consistant pour $\mathcal{E}(\theta)$.
4. **Convergence en loi** (Déf. 1.4) : $\mathbb{E}_n[f(Y_n)]\to\int f\,\mathrm{d}\mu$ pour toute $f$ continue bornée, noté $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$. Caractérisations : **Portmanteau** (Th. 1.3 : $f$ lipschitziennes bornées ; pavés de frontière $\mu$-négligeable ; en 1D, fonctions de répartition aux points de continuité) et **Lévy** (Th. 1.5 : fonctions caractéristiques). **Transformation continue** (Th. 1.4 : $\varphi$ continue sur un ensemble de $\mu$-mesure 1).
5. **TCL** (Th. 1.6) : $Q$ de carré intégrable, moyenne $\mu$, covariance $\Sigma$ $\Rightarrow$ $\sqrt n(\bar X_n-\mu)\overset{\mathbb{P}_n}{\Longrightarrow}\mathcal{N}(0,\Sigma)$. Preuve (cas $\ell=1$) : réduction, $\varphi_n(t)=\psi(t/\sqrt n)^n$, Taylor ordre 2 (Lemme 2.3), $(1+a_n)^n\to e^c$ (Lemme 2.4), Lévy. IC $\sigma$ connu : $\bar X_n\pm z_{1-\alpha/2}\sigma/\sqrt n$ (Cor. 1.1).
6. **Slutsky** (Lemme 1.1) : $X_n\Rightarrow\mu$, $Y_n\Rightarrow\delta_c$ ($c$ **constante**) $\Rightarrow$ $X_n+Y_n\Rightarrow X+c$, $Y_nX_n\Rightarrow cX$, $X_n/Y_n\Rightarrow X/c$ ($c\ne0$). Convergence en loi vers une constante $\Leftrightarrow$ en probabilité. $U_n\Rightarrow\nu$ et $V_n\to0$ en proba $\Rightarrow U_n+V_n\Rightarrow\nu$. Application : TCL de la variance empirique, variance limite $\gamma=\int(x-\mu)^4Q(\mathrm{d}x)-\sigma^4$ (Ex. 1.6).
7. **Méthode-δ** (Th. 1.7/1.8) : $r_n(T_n-\theta)\Rightarrow G$, $r_n\uparrow\infty$, $g$ dérivable en $\theta$ $\Rightarrow$ $r_n(g(T_n)-g(\theta))\Rightarrow\dot g(\theta)G$ ; en gaussien $\mathcal{N}(0,\dot g(\theta)^2\sigma^2)$, vectoriel $\mathcal{N}(0,J_g\Sigma J_g^\top)$. Si $\dot g(\theta)=0$ : limite dégénérée, autre échelle ($r_n^2$, loi $\chi^2(1)$, Ex. 1.8). Ex. 1.7 : EMV exponentiel, $\sqrt n(\hat\theta_n-\theta)\Rightarrow\mathcal{N}(0,\theta^2)$.
8. **Normalité asymptotique** (Déf. 1.6) $\sqrt n(T_n-g(\theta))\Rightarrow\mathcal{N}(0,\Sigma(\theta))$ $\Rightarrow$ consistance. **Pivot asymptotique** (Déf. 1.7, Ex. 1.10) $\sqrt n(T_n-g(\theta))/\sqrt{v(\theta)}$ ; **région de niveau asymptotique** $1-\alpha$ : $\inf_\theta\liminf_n\mathbb{P}_{n,\theta}(g(\theta)\in C_n)\ge1-\alpha$ (Déf. 1.8). **Méthode 1.1** : $v$ continue $\Rightarrow$ $\hat\theta_n\pm z_{1-\alpha/2}\sqrt{v(\hat\theta_n)/n}$.
9. **Proportion** : trois IC — **Wilson** (résoudre l'inégalité du pivot, trinôme, Ex. 1.11), **Wald** (Slutsky, $\bar X_n\pm z_{1-\alpha/2}\sqrt{\bar X_n(1-\bar X_n)/n}$, Ex. 1.12, dégénéré si $\bar X_n\in\{0,1\}$), **stabilisation de la variance** ($g(\theta)=\arcsin\sqrt\theta$, variance $1/4$, Ex. 1.13). **Comparaison** : à niveau égal, rapport des longueurs $\to\sqrt{v_1(\theta)/v_2(\theta)}$ (Prop. 1.3).
10. **Tests asymptotiques** : taille asymptotique $\sup_{\Theta_0}\limsup_n\beta_{\phi_n}$, niveau asymptotique $\alpha$ si $\le\alpha$, **consistance** $\liminf_n\beta_{\phi_n}(\theta)=1$ sur $\Theta_1$ (Déf. 1.9–1.11). **Student asymptotique** (Ex. 1.14) : $T_n=\sqrt n(\bar X_n-\mu_0)/S_n\Rightarrow\mathcal{N}(0,1)$ sous $H_0$ pour **toute** loi de carré intégrable, rejet $\lvert T_n\rvert>z_{1-\alpha/2}$ ; consistance par un seuil auxiliaire $M$ (deux passages à la limite, $n$ puis $M$).

---

## 1. Notations et symboles

> **Notations particulières du poly à reproduire fidèlement :**
> - Espaces d'observations en **lettres sans empattement** indexées par $n$ : $\mathsf{Z}_n$, $\mathsf{X}$, $\mathsf{X}^n$, $\mathsf{Y}_n$ ; tribus en calligraphique $\mathcal{Z}_n$, $\mathcal{X}$, $\mathcal{X}^{\otimes n}$, $\mathcal{Y}_n$ ; probabilités en lettres ajourées **doublement indexées** $\mathbb{P}_{n,\theta}$ (expérience $n$, paramètre $\theta$), $\mathbb{E}_{n,\theta}$, $\mathrm{Var}_{n,\theta}$ ; loi d'une observation $\mathbb{Q}_\theta$ (et $Q$ sans paramètre).
> - Quand il n'y a pas de paramètre (énoncés probabilistes) : $(\mathsf{Y}_n,\mathcal{Y}_n,\mathbb{P}_n)$, $\mathbb{E}_n$, $\mathrm{Var}_n$ ; sur un espace fixe (Outils) : $(\Omega,\mathcal{F},\mathbb{P})$.
> - **Convergence en probabilité** notée avec la probabilité au-dessus de la flèche : $T_n(Z_n)\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}g(\theta)$, $X_n\xrightarrow{\mathbb{P}_n\text{-prob}}X$, $X_n\xrightarrow{\mathbb{P}\text{-prob}}X$.
> - **Convergence en loi** notée par une **double flèche** surmontée de la probabilité : $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$ ou $Y_n\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}Y$ (et $X_n\Longrightarrow X$ sur espace fixe).
> - Dérivée d'une fonction réelle notée par un **point** : $\dot g(\theta)$, $\dot\varphi(\theta^{-1})$ (mais $g'$ dans l'Ex. 1.8 et l'Ex. 1.13) ; matrice jacobienne $J_g(\theta)$.
> - Quantile de $\mathcal{N}(0,1)$ : $z_u$ (quantile d'ordre $u$), donc $z_{1-\alpha/2}$ ; fonction de répartition $\Phi$.
> - Statistiques d'ordre : $X_{n:n}=\max(X_1,\dots,X_n)$, $X_{1:n}=\min$ (corrigé PC6).
> - Deux variances empiriques : $\hat\sigma_n^2$ (normalisée par $n$) et $S_n^2$ (normalisée par $n-1$, « corrigée ») — **attention** : dans la PC6, Exercice 3, $S_n^2$ est normalisée par $n$.
> - Loi exponentielle $\mathcal{E}(\lambda)$ paramétrée par l'**intensité** (densité $\lambda e^{-\lambda x}$, moyenne $1/\lambda$) : $\mathcal{E}(\theta^{-1})$ a pour moyenne $\theta$.
> - Fonction indicatrice $\mathbb{1}_A$ ; mesure de Lebesgue $\mathrm{Leb}$ ; $\mathbb{N}^\star$, $\mathbb{R}_+^\star$.

| Symbole | Signification | Première apparition |
|---|---|---|
| $\{(\mathsf{Z}_n,\mathcal{Z}_n,\{\mathbb{P}_{n,\theta}:\theta\in\Theta\}):n\in\mathbb{N}\}$ | suite d'expériences statistiques, $\Theta\subseteq\mathbb{R}^d$ indépendant de $n$ | Déf. 1.1, p. 9 |
| $Z_n$ | observation de la $n$-ième expérience | Déf. 1.1, p. 9 |
| $\mathbb{P}_{n,\theta}$, $\mathbb{E}_{n,\theta}$, $\mathrm{Var}_{n,\theta}$ | loi, espérance, variance dans la $n$-ième expérience | Déf. 1.1, p. 9 |
| $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:\theta\in\Theta\})$ | expérience d'une observation | Ex. 1.1, p. 9 |
| $\mathsf{Z}_n:=\mathsf{X}^n$, $\mathcal{Z}_n:=\mathcal{X}^{\otimes n}$, $\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n}$ | suite d'expériences produit ($n$-échantillons) | Ex. 1.1, p. 9 |
| $X_i:\mathsf{X}^n\to\mathsf{X}$, $(x_1,\dots,x_n)\mapsto x_i$ | statistiques canoniques | Ex. 1.1, p. 9 |
| $\mathsf{Z}:=\mathsf{X}^{\mathbb{N}}$, $\mathcal{Z}:=\mathcal{X}^{\otimes\mathbb{N}}$, $\mathbb{P}_\theta$ | produit infini (hors programme) | Prop. 1.1, p. 10 |
| $g:\Theta\to\mathbb{R}^\ell$ | fonction du paramètre à estimer | Déf. 1.2, p. 10 |
| $T_n:(\mathsf{Z}_n,\mathcal{Z}_n)\to(\mathbb{R}^\ell,\mathcal{B}(\mathbb{R}^\ell))$ | $n$-ième estimateur | Déf. 1.2, p. 10 |
| $T_n(Z_n)\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}g(\theta)$ | consistance (convergence en probabilité) | Déf. 1.2, p. 10 |
| $\lVert\cdot\rVert$ | norme euclidienne | Déf. 1.2, p. 10 |
| $\hat\theta_n=X_{n:n}$ | EMV du support de $\mathcal{U}([0,\theta])$ | Ex. 1.2, p. 11 |
| $\bar X_n:=n^{-1}\sum_{k=1}^nX_k$ | moyenne empirique | p. 13 |
| $(\mathsf{Y}_n,\mathcal{Y}_n,\mathbb{P}_n)$, $\mathbb{E}_n$ | suite d'espaces de probabilité (énoncés probabilistes) | Déf. 1.4, p. 14 |
| $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$ | convergence en loi | Déf. 1.4, p. 14 |
| $L_f$ | constante de Lipschitz de $f$ | Th. 1.3, p. 14 |
| $\partial A$ | frontière de $A$ | Th. 1.3, p. 14 |
| $\mu_\varphi(A):=\mu(\varphi^{-1}(A))$ | mesure image de $\mu$ par $\varphi$ | Th. 1.4, p. 17 |
| $t\mapsto\mathbb{E}[e^{\mathrm{i}t^\top Y}]$ | fonction caractéristique | Déf. 1.5, p. 17 |
| $A^\top$ | transposée | p. 17 |
| $\mathcal{N}_d(\mu,\Sigma)$, $\mathcal{N}(0,\Sigma)$ | loi gaussienne (vectorielle) | éq. (1), p. 17 |
| $\varphi_n(t)$, $\psi(u)$ | fonctions caractéristiques de $\sqrt n\bar Y_n$ et de $Y_1$ (preuve du TCL) | p. 18–19 |
| $\Phi$ | fonction de répartition de $\mathcal{N}(0,1)$ | p. 19 |
| $z_u$ | quantile d'ordre $u$ de $\mathcal{N}(0,1)$ | Cor. 1.1, p. 19 |
| $\delta_c$ | masse de Dirac en $c$ | Lemme 1.1, p. 20 |
| $\mu\otimes\delta_c$ | loi produit | p. 20 |
| $\hat\sigma_n^2:=n^{-1}\sum_i(X_i-\bar X_n)^2$ | variance empirique (non corrigée) | p. 21 |
| $S_n^2:=(n-1)^{-1}\sum_i(X_i-\bar X_n)^2=\frac{n}{n-1}\hat\sigma_n^2$ | variance empirique corrigée | p. 21 |
| $\gamma:=\int(x-\mu)^4Q(\mathrm{d}x)-\sigma^4$ | variance limite de $\sqrt n(\hat\sigma_n^2-\sigma^2)$ | Ex. 1.6, p. 21 |
| $\sigma^2\chi^2(1)$ | loi de $\sigma^2W$, $W\sim\chi^2(1)$ | Ex. 1.6, p. 22 |
| $D_g$ | domaine (intervalle ouvert / ouvert) de $g$ | Th. 1.7, p. 23 |
| $\dot g(\theta)$ | dérivée de $g$ en $\theta$ | Th. 1.7, p. 23 |
| $r_n$ | vitesse (suite croissante $\to+\infty$) | Th. 1.7, p. 23 |
| $\varepsilon(h)$ | reste du développement au 1er ordre | preuve Th. 1.7, p. 23 |
| $J_g(\theta)$ | matrice jacobienne | Th. 1.8, p. 25 |
| $\Sigma(\theta)$, $v(\theta)$ | covariance / variance asymptotique | Déf. 1.6, p. 26 |
| $G_n:\mathsf{Z}_n\times\Theta\to\mathbb{R}^p$ | fonction asymptotiquement pivotale | Déf. 1.7, p. 27 |
| $L$ | loi limite du pivot asymptotique | Déf. 1.7, p. 27 |
| $\mathcal{C}_n(Z_n)$ | région de confiance (asymptotique) | Déf. 1.8, p. 27 |
| $\mathcal{C}_{n,\alpha}(\hat\theta_n)$ | IC asymptotique de la Méthode 1.1 | Méth. 1.1, p. 28 |
| $\tilde G_n$, $W_n$, $Y_n$ | pivot de Wald, $\sqrt{\bar X_n(1-\bar X_n)}$, version tronquée | Ex. 1.12, p. 29–30 |
| $\beta_\phi(\theta):=\mathbb{P}_\theta(\phi=1)$ | fonction puissance | §1.12, p. 32 |
| $\Theta_0$, $\Theta_1$, $H_0$, $H_1$ | hypothèses | Déf. 1.9, p. 33 |
| $T_n=\sqrt n(\bar X_n-\mu_0)/S_n$ | statistique de Student | Ex. 1.14, p. 33 |
| $R_{n,\alpha}$ | région de rejet | Ex. 1.14, p. 33 |
| $\xrightarrow{\mathbb{P}\text{-prob}}$ | convergence en probabilité sur $(\Omega,\mathcal{F},\mathbb{P})$ | Déf. 2.1, p. 36 |
| $\mathrm{Cov}(X_k,X_\ell)$ | covariance | Déf. 2.2, p. 38 |
| $\mathrm{Log}$ | logarithme complexe principal | Lemme 2.4, p. 39 |
| $\tilde\theta_n$, $a_n$, $b$ | estimateur de Hodges, seuil, facteur | §4.5, p. 45 |
| $\ell_n(\theta;X_1,\dots,X_n)$ | log-vraisemblance (PC6, Ex. 2 et 7) | Énoncé PC6, p. 5 |

---

## 2. Cours — contenu principal

### Remarque (Introduction, p. 7–8) — Pourquoi faire tendre $n$ vers l'infini
**Source :** Poly ch.6, introduction et « Pourquoi faire tendre $n$ vers l'infini », p. 7–8
**Hypothèses :** —
**Énoncé :** Les chapitres 1–5 travaillaient à $n$ fixé avec des calculs **exacts** (biais, EQM, taille, puissance, niveau de confiance) ; ces calculs sont l'exception : dès que l'estimateur n'est pas une moyenne empirique dans un modèle gaussien, la loi de la statistique n'est pas explicite. Deux questions restent ouvertes : (i) comparer deux estimateurs dont l'EQM n'est pas calculable et construire une région de confiance sans loi explicite ; (ii) choisir le seuil d'un test quand la loi de la statistique est inconnue. Idée : remplacer la loi exacte par une **loi limite** quand $n\to\infty$, qui ne dépend du modèle que par quelques caractéristiques (espérance, variance) et qui est le plus souvent gaussienne. Deux propriétés recherchées sur un estimateur : **consistance** et **normalité asymptotique** (erreur remise à l'échelle $\sqrt n$ $\Rightarrow$ gaussienne dont la variance mesure la précision). LGN et TCL les donnent pour une moyenne empirique ; théorème de continuité, lemme de Slutsky et méthode-δ les transportent à toute fonction régulière d'une moyenne empirique.
**Preuve (étapes) :** —
**Intuition :** LGN : $\bar X_n$ s'approche de l'espérance ; TCL : l'écart est d'ordre $\sigma/\sqrt n$ et, divisé par cette quantité, se comporte comme $\mathcal{N}(0,1)$. Toute l'information utile sur la loi des observations se réduit à espérance et variance.
**Pièges / erreurs classiques :** Les garanties ne valent **qu'à la limite** : un test de niveau asymptotique $\alpha$ ne dit rien de sa taille pour le $n$ dont on dispose ; une région de niveau asymptotique $1-\alpha$ peut couvrir avec une probabilité sensiblement différente à $n$ fixé (exemple de la proportion, §1.10 et Compléments §4.4).

### Définition 1.1 — Suite d'expériences statistiques
**Source :** Poly ch.6, Définition 1.1, p. 9
**Hypothèses :** $\Theta\subseteq\mathbb{R}^d$.
**Énoncé :** Une *suite d'expériences statistiques* est une famille
$$\{(\mathsf{Z}_n,\mathcal{Z}_n,\{\mathbb{P}_{n,\theta}:\theta\in\Theta\}):n\in\mathbb{N}\},\qquad\Theta\subseteq\mathbb{R}^d,$$
c'est-à-dire la donnée, pour chaque $n\in\mathbb{N}$, d'une expérience statistique $(\mathsf{Z}_n,\mathcal{Z}_n,\{\mathbb{P}_{n,\theta}:\theta\in\Theta\})$ dont l'espace des paramètres $\Theta$ **ne dépend pas de $n$**. On note $Z_n$ l'observation de la $n$-ième expérience, $\mathbb{E}_{n,\theta}$ l'espérance et $\mathrm{Var}_{n,\theta}$ la variance sous $\mathbb{P}_{n,\theta}$.
**Preuve (étapes) :** — (définition)
**Intuition :** Quand $n$ change, l'espace des observations change ; on se donne donc une *suite* d'expériences. Le paramètre inconnu est commun à toutes : c'est ce qui donne un sens à « estimer $\theta$ d'autant mieux que $n$ est grand ». Dans la quasi-totalité du cours, la $n$-ième expérience est celle d'un $n$-échantillon.
**Pièges / erreurs classiques :** La définition ne suppose **ni indépendance ni identité des lois** : elle couvre aussi les observations dépendantes ou non identiquement distribuées (exercice 6 de la semaine 1, exercice 5 de la semaine 2).

### Exemple 1.1 — Suite de $n$-échantillons
**Source :** Poly ch.6, Exemple 1.1, p. 9
**Hypothèses :** $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:\theta\in\Theta\})$ expérience statistique, $\Theta\subseteq\mathbb{R}^d$.
**Énoncé :** La suite d'expériences statistiques **produit** associée est définie, pour tout $n\in\mathbb{N}$, par
$$\mathsf{Z}_n:=\mathsf{X}^n,\qquad\mathcal{Z}_n:=\mathcal{X}^{\otimes n},\qquad\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n},\quad\theta\in\Theta.$$
On définit sur chaque $\mathsf{X}^n$ les *statistiques canoniques* $X_i:\mathsf{X}^n\to\mathsf{X}$, $X_i:(x_1,\dots,x_n)\mapsto x_i$, $i\in\{1,\dots,n\}$. Pour $(n,\theta)$ fixés, sous $\mathbb{P}_{n,\theta}$, $X_1,\dots,X_n$ sont indépendantes et, pour tout $i$, le modèle induit par $X_i$ est $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:\theta\in\Theta\})$.
**Preuve (étapes) :** — (construction ; indépendance par définition de la mesure produit)
**Intuition :** C'est le cadre i.i.d. habituel, écrit de façon à faire varier $n$.
**Pièges / erreurs classiques :** Les variables $X_i$ « changent d'espace » avec $n$ : la convergence presque sûre n'a donc pas de sens dans ce cadre (voir Prop. 1.1 et Outils §2.1).

### Proposition 1.1 — Produit infini d'expériences statistiques (*complément hors programme*)
**Source :** Poly ch.6, Proposition 1.1, p. 10 (dans un encadré « Complément, hors programme »)
**Hypothèses :** $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:\theta\in\Theta\})$ expérience statistique.
**Énoncé :** Posons $\mathsf{Z}:=\mathsf{X}^{\mathbb{N}}$, $\mathcal{Z}:=\mathcal{X}^{\otimes\mathbb{N}}$ (suites à valeurs dans $\mathsf{X}$ munies de la $\sigma$-algèbre produit) et $X_k(z):=x_k$ où $z=\{x_n,n\in\mathbb{N}\}$. Il existe sur $(\mathsf{Z},\mathcal{Z})$ une famille de probabilités $\{\mathbb{P}_\theta:\theta\in\Theta\}$ telle que, pour tout $\theta\in\Theta$, tout $n\in\mathbb{N}$ et tout $C_n\in\mathcal{X}^{\otimes n}$,
$$\mathbb{P}_\theta((X_1,\dots,X_n)\in C_n)=\mathbb{Q}_\theta^{\otimes n}(C_n).$$
De façon équivalente, pour tout $n$, le modèle induit par $(X_1,\dots,X_n)$ est $(\mathsf{X}^n,\mathcal{X}^{\otimes n},\{\mathbb{Q}_\theta^{\otimes n}:\theta\in\Theta\})$. On dit que $\{X_k,k\in\mathbb{N}^*\}$ est un *échantillon* du modèle $\{\mathbb{Q}_\theta:\theta\in\Theta\}$.
**Preuve (étapes) :** **Admise** — repose sur le théorème d'extension de Carathéodory.
**Intuition :** Une seule probabilité $\mathbb{P}_\theta$ gouverne toutes les statistiques à la fois. Le poly utilise indifféremment les deux écritures ; les énoncés sont écrits dans celle de la Déf. 1.1, plus générale.
**Pièges / erreurs classiques :** —

### Définition 1.2 — Suite d'estimateurs consistante
**Source :** Poly ch.6, Définition 1.2, p. 10
**Hypothèses :** Suite d'expériences statistiques paramétriques $\{(\mathsf{Z}_n,\mathcal{Z}_n,\{\mathbb{P}_{n,\theta}:\theta\in\Theta\}):n\in\mathbb{N}\}$, $\Theta\subseteq\mathbb{R}^d$ ; $g:\Theta\to\mathbb{R}^\ell$ ; estimateurs $T_n:(\mathsf{Z}_n,\mathcal{Z}_n)\to(\mathbb{R}^\ell,\mathcal{B}(\mathbb{R}^\ell))$.
**Énoncé :** La suite $\{T_n,n\in\mathbb{N}^*\}$ est dite *consistante* pour $g$ si
$$\forall\theta\in\Theta,\quad\forall\varepsilon>0,\qquad\lim_{n\to\infty}\mathbb{P}_{n,\theta}\big(\|T_n(Z_n)-g(\theta)\|\ge\varepsilon\big)=0.$$
On écrit alors $T_n(Z_n)\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}g(\theta)$.
**Preuve (étapes) :** — (définition)
**Intuition :** L'erreur devient petite « en probabilité » : la probabilité qu'elle dépasse un seuil fixé tend vers 0.
**Pièges / erreurs classiques :** Norme euclidienne de $\mathbb{R}^\ell$. La convergence est demandée **pour chaque** $\theta$, **sans aucune uniformité** en $\theta$.

### Définition 1.3 — Suite d'estimateurs asymptotiquement sans biais
**Source :** Poly ch.6, Définition 1.3, p. 10
**Hypothèses :** Cadre de la Déf. 1.2 ($T_n$ intégrable pour que l'espérance ait un sens).
**Énoncé :** $\{T_n,n\in\mathbb{N}^*\}$ est *asymptotiquement sans biais* pour $g$ si
$$\forall\theta\in\Theta,\qquad\lim_{n\to\infty}\mathbb{E}_{n,\theta}[T_n(Z_n)]=g(\theta).$$
**Preuve (étapes) :** — (définition)
**Intuition (poly, p. 10–11) :** Les deux propriétés **ne se déduisent pas l'une de l'autre**. L'absence de biais asymptotique ne porte que sur l'espérance et laisse la dispersion libre : une suite d'espérance $\to g(\theta)$ mais de variance qui ne diminue pas n'est pas consistante. Inversement la consistance ne dit rien de l'espérance, qui peut ne pas exister. Aucune des deux ne renseigne sur la **vitesse** : la Déf. 1.2 est satisfaite par une erreur d'ordre $1/\sqrt n$ comme d'ordre $1/\ln n$ ; c'est la normalité asymptotique (§1.8) qui quantifie.
**Pièges / erreurs classiques :** Confondre « consistant » et « asymptotiquement sans biais ».

### Exemple 1.2 — Support d'une loi uniforme
**Source :** Poly ch.6, Exemple 1.2, p. 11
**Hypothèses :** Suite de modèles $\big\{(\mathbb{R}_+^n,\mathcal{B}(\mathbb{R}_+^n),\{\mathcal{U}^{\otimes n}([0,\theta]):\theta\in\Theta:=\mathbb{R}_+^*\}):n\in\mathbb{N}^\star\big\}$ ; EMV $\hat\theta_n:=\max(X_1,\dots,X_n)=X_{n:n}$.
**Énoncé :** $\{\hat\theta_n,n\in\mathbb{N}^\star\}$ est une suite **consistante** d'estimateurs de $\theta$, et elle est **asymptotiquement sans biais**.
**Preuve (étapes) :**
1. Soit $\theta>0$. Par définition $\mathbb{P}_{n,\theta}(\hat\theta_n\le\theta)=1$, donc pour $\varepsilon\in\,]0,\theta[$ : $\mathbb{P}_{n,\theta}(\lvert\hat\theta_n-\theta\rvert>\varepsilon)=\mathbb{P}_{n,\theta}(\hat\theta_n<\theta-\varepsilon)=\mathbb{P}_{n,\theta}(X_1<\theta-\varepsilon,\dots,X_n<\theta-\varepsilon)$ (le max est $<a$ ssi tous le sont).
2. $=\prod_{i=1}^n\mathbb{P}_{n,\theta}(X_i<\theta-\varepsilon)=(1-\varepsilon/\theta)^n$ (**par indépendance** des statistiques canoniques sous $\mathbb{P}_{n,\theta}$, puis loi uniforme).
3. $(1-\varepsilon/\theta)^n\to0$ pour $\varepsilon\in\,]0,\theta[$ ; pour $\varepsilon\ge\theta$ la probabilité est nulle. D'où la consistance.
4. Biais (calcul fait à l'exercice 1 de la feuille de la semaine 3) : $\mathbb{E}_{n,\theta}[\hat\theta_n]=\frac{n}{n+1}\theta\to\theta$ : asymptotiquement sans biais.
**Méthodes mobilisées :** loi du maximum par indépendance ; définition de la consistance ; calcul d'espérance d'une statistique d'ordre.
**Intuition :** L'histogramme de $\hat\theta_n$ se resserre contre $\theta$. La bonne échelle n'est **pas** $1/\sqrt n$ : $\mathbb{P}_{n,\theta}(\theta-\hat\theta_n>\varepsilon)=(1-\varepsilon/\theta)^n$ est petit dès que $\varepsilon$ est d'ordre $1/n$ ; c'est $n(\theta-\hat\theta_n)$ qui a une loi limite (Ex. 1.5).
**Pièges / erreurs classiques :** Écrire $\lvert\hat\theta_n-\theta\rvert$ alors que $\hat\theta_n\le\theta$ p.s. : l'erreur est toujours du même signe.

### Remarque (§1.2, p. 11) — Illustration / animation de la consistance
**Source :** Poly ch.6, encadré « Illustration / animation », p. 11
**Énoncé :** Pour $\mathcal{U}([0,\theta])$ et $\hat\theta_n=X_{n:n}$, l'histogramme de 2 000 réalisations se resserre contre $\theta$ quand $n$ grandit, et la fréquence des réalisations hors de la bande $[\theta-\varepsilon,\theta+\varepsilon]$ tend vers 0. On peut changer de modèle (exponentiel, Poisson), d'estimateur (maximum de vraisemblance ou moments) et faire croître $n$ de 5 à 2 000.

### Théorème 1.1 — Théorème de continuité
**Source :** Poly ch.6, Théorème 1.1, p. 12
**Hypothèses :** Suite d'expériences statistiques ; $\{T_n\}$ suite **consistante** d'estimateurs de $g(\theta)$, $g:\Theta\to\mathbb{R}^\ell$, $T_n:(\mathsf{Z}_n,\mathcal{Z}_n)\to(\mathbb{R}^\ell,\mathcal{B}(\mathbb{R}^\ell))$ ; $\varphi:\mathbb{R}^\ell\to\mathbb{R}^q$ **continue en tout point de $g(\Theta)$**.
**Énoncé :** $\{\varphi(T_n),n\in\mathbb{N}\}$ est une suite consistante d'estimateurs de $\varphi\circ g$. (Le poly écrit « $\{\varphi(T_n)_n,n\in\mathbb{N}\}$ », coquille.)
**Preuve (étapes) :**
1. Soient $\theta\in\Theta$, $\varepsilon>0$. $\varphi$ continue en $g(\theta)$ : il existe $\delta>0$ tel que $\|u-g(\theta)\|\le\delta\Rightarrow\|\varphi(u)-\varphi(g(\theta))\|<\varepsilon$ (**définition de la continuité**).
2. Donc $\{\|\varphi(T_n)-\varphi\circ g(\theta)\|\ge\varepsilon\}\subseteq\{\|T_n-g(\theta)\|>\delta\}$ (contraposée sur l'événement complémentaire).
3. $\mathbb{P}_{n,\theta}(\|\varphi(T_n)-\varphi\circ g(\theta)\|\ge\varepsilon)\le\mathbb{P}_{n,\theta}(\|T_n-g(\theta)\|>\delta)\to0$ (**croissance de la probabilité**, puis **consistance** de $T_n$).
**Intuition :** Toute fonction continue d'un estimateur consistant estime la même fonction de la quantité estimée. « Le résultat le plus économique du chapitre, et celui dont on se sert le plus souvent. »
**Pièges / erreurs classiques :** La continuité n'est requise **qu'aux points de $g(\Theta)$**, pas partout (cf. $u\mapsto1/u$ dans l'Ex. 1.3).

### Remarque (§1.3, p. 12) — Version « vecteurs aléatoires » du théorème de continuité
**Source :** Poly ch.6, Remarque suivant le Th. 1.1, p. 12
**Énoncé :** Version utilisée dans les preuves : si $X_n\xrightarrow{\mathbb{P}_n\text{-prob}}X$ et si $\varphi$ est continue en tout point d'un ensemble $C$ tel que $\mathbb{P}(X\in C)=1$, alors $\varphi(X_n)\xrightarrow{\mathbb{P}_n\text{-prob}}\varphi(X)$. Énoncée dans les Outils (Th. 2.1), se démontre de la même façon.

### Remarque (§1.3, p. 12) — Estimateurs fonctions d'une moyenne empirique
**Source :** Poly ch.6, « Application : les estimateurs construits sur une moyenne empirique », p. 12
**Énoncé :** Beaucoup d'estimateurs s'écrivent $\varphi\big(\frac1n\sum_{k=1}^nX_k\big)$ : par construction les estimateurs des moments (chapitre 2), et après calcul nombre d'EMV. Leur consistance résulte de deux ingrédients : le théorème de continuité 1.1 et la consistance de la moyenne empirique (loi faible des grands nombres).

### Théorème 1.2 — Loi faible des grands nombres pour des variables décorrélées
**Source :** Poly ch.6, Théorème 1.2, p. 12–13
**Hypothèses :** $\{(\mathsf{Z}_n,\mathcal{Z}_n,\mathbb{P}_n):n\in\mathbb{N}^\star\}$ suite d'espaces probabilisés ;
- sous $\mathbb{P}_n$, les v.a.r. $X_1,\dots,X_n$ sont **décorrélées** ;
- pour tout $k\in\{1,\dots,n\}$, $\mathbb{E}_n[X_k^2]<\infty$ ;
- $\displaystyle\lim_{n\to\infty}\frac1{n^2}\sum_{k=1}^n\mathrm{Var}_n(X_k)=0$.

**Énoncé :**
$$\lim_{n\to\infty}\mathbb{E}_n\Big[\Big(\frac1n\sum_{k=1}^n\{X_k-\mathbb{E}_n[X_k]\}\Big)^2\Big]=0,\qquad\frac1n\sum_{k=1}^n\{X_k-\mathbb{E}_n[X_k]\}\xrightarrow{\mathbb{P}_n\text{-prob}}0.$$
**Preuve (étapes) :**
1. $\mathbb{E}_n\big[\big(\frac1n\sum_k\{X_k-\mathbb{E}_n[X_k]\}\big)^2\big]=\mathrm{Var}_n\big(\frac1n\sum_kX_k\big)=\frac1{n^2}\sum_{k=1}^n\mathrm{Var}_n(X_k)$ (**lemme de Bienaymé**, Lemme 2.2, variables décorrélées de carré intégrable), qui tend vers 0 **par hypothèse** : convergence $L^2$.
2. Pour $\varepsilon>0$ : $\mathbb{P}_n\big(\big\lvert\frac1n\sum_k\{X_k-\mathbb{E}_n[X_k]\}\big\rvert\ge\varepsilon\big)\le\frac1{\varepsilon^2}\mathbb{E}_n\big[\big(\frac1n\sum_k\{X_k-\mathbb{E}_n[X_k]\}\big)^2\big]$ (**inégalité de Bienaymé-Tchebychev**, Lemme 2.1) $\to0$.
**Intuition :** La moyenne de $n$ variables non corrélées a une variance qui décroît ; Tchebychev transforme la convergence $L^2$ en convergence en probabilité.
**Pièges / erreurs classiques :** Cas $n$-échantillon d'une loi $Q$ de carré intégrable : variables indépendantes donc décorrélées, de même variance $\sigma^2$, $n^{-2}\sum_{k=1}^n\sigma^2=\sigma^2/n\to0$ ; on obtient $\bar X_n\xrightarrow{\mathbb{P}_n\text{-prob}}\int x\,Q(\mathrm{d}x)$, $\bar X_n:=n^{-1}\sum_{k=1}^nX_k$. Le carré intégrable **n'est pas nécessaire** dans le cas i.i.d. (LGN pour variables seulement intégrables, admise, Compléments §4.2). Décorrélé $\not\Rightarrow$ indépendant.

### Remarque (§1.3, p. 13) — Illustration / animation de la loi des grands nombres
**Source :** Poly ch.6, encadré « Illustration / animation », p. 13
**Énoncé :** On suit $\bar X_n$ d'une seule suite d'observations au fil de $n$, puis d'une seconde : chacune se stabilise autour de $\mu$ (convergence **presque sûre**). On tire ensuite cent valeurs de $\bar X_n$ à $n$ fixé, sans tracer les trajectoires : leur dispersion se resserre quand $n$ augmente (convergence **en probabilité**). Deux questions demandent le nombre de réalisations tirées et le mode de convergence illustré.

### Exemple 1.3 — Paramètre d'une loi exponentielle (consistance)
**Source :** Poly ch.6, Exemple 1.3, p. 13
**Hypothèses :** Suite de $n$-échantillons du modèle $(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{E}(\theta):\theta\in\Theta:=\mathbb{R}_+^*\})$ ; EMV $T_n(Z_n):=\big(\frac1n\sum_{k=1}^nX_k\big)^{-1}$, $Z_n:=(X_1,\dots,X_n)$.
**Énoncé :** $\{T_n,n\in\mathbb{N}\}$ est une suite consistante d'estimateurs de $\theta$.
**Preuve (étapes) :**
1. Sous $\mathcal{E}(\theta)$ : espérance $1/\theta$, variance $1/\theta^2$ (finie).
2. **LGN faible** (Th. 1.2) : $\bar X_n\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\mathbb{E}_{n,\theta}[X_1]=1/\theta$.
3. $\varphi:u\mapsto1/u$ continue sur $\mathbb{R}_+^\star$, qui contient $\{1/\theta:\theta\in\Theta\}$ ; **théorème de continuité** 1.1 : $\varphi(\bar X_n)\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\varphi(1/\theta)=\theta$.
**Méthodes mobilisées :** LGN + théorème de continuité.
**Intuition :** Schéma à retenir : la LGN traite la moyenne empirique, le théorème de continuité traite la fonction appliquée.
**Pièges / erreurs classiques :** L'étape délicate est de vérifier la continuité de $\varphi$ **au point limite** et non partout : $u\mapsto1/u$ n'est pas continue en 0, mais 0 n'est pas une valeur possible de $1/\theta$.

### Définition 1.4 — Convergence en loi
**Source :** Poly ch.6, Définition 1.4, p. 14
**Hypothèses :** $\{(\mathsf{Y}_n,\mathcal{Y}_n,\mathbb{P}_n):n\in\mathbb{N}^*\}$ suite d'espaces de probabilité, $Y_n:(\mathsf{Y}_n,\mathcal{Y}_n)\to(\mathbb{R}^d,\mathcal{B}(\mathbb{R}^d))$, $\mu$ probabilité sur $(\mathbb{R}^d,\mathcal{B}(\mathbb{R}^d))$.
**Énoncé :** $\{Y_n\}$ *converge en loi* vers $\mu$ si, pour toute fonction **continue bornée** $f:\mathbb{R}^d\to\mathbb{R}$,
$$\lim_{n\to\infty}\mathbb{E}_n[f(Y_n)]=\int f(y)\,\mu(\mathrm{d}y).$$
On note $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$. Si $\mu$ est la loi d'un vecteur $Y$, on écrit aussi $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}Y$ ; seule la loi de $Y$ intervient.
**Preuve (étapes) :** — (définition)
**Intuition :** La consistance ne donne pas la vitesse ; on compare la **loi** de l'erreur remise à l'échelle à une loi limite. Les variables vivant sur des espaces qui changent avec $n$, la convergence porte sur les lois. En pratique on passe par Portmanteau (Th. 1.3) ou Lévy (Th. 1.5) plutôt que par la définition.
**Pièges / erreurs classiques :** L'espace sur lequel $Y$ est défini n'a pas d'importance ; on ne peut pas parler de « $Y_n-Y$ petit ».

### Théorème 1.3 — Portmanteau, version simple
**Source :** Poly ch.6, Théorème 1.3, p. 14
**Hypothèses :** $\{(\mathsf{Y}_n,\mathcal{Y}_n,\mathbb{P}_n)\}$, $Y_n:(\mathsf{Y}_n,\mathcal{Y}_n)\to(\mathbb{R}^d,\mathcal{B}(\mathbb{R}^d))$, $\mu$ loi sur $\mathbb{R}^d$.
**Énoncé :** Équivalence de :
- (i) $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$ ;
- (ii) pour toute $f:\mathbb{R}^d\to\mathbb{R}$ **bornée et lipschitzienne** ($\lvert f(x)-f(y)\rvert\le L_f\|x-y\|$), $\lim_n\mathbb{E}_n[f(Y_n)]=\int f(x)\,\mu(\mathrm{d}x)$ ;
- (iii) pour tout pavé $A=\prod_{i=1}^d\,]a_i,b_i]$ dont la frontière vérifie $\mu(\partial A)=0$, $\lim_n\mathbb{P}_n(Y_n\in A)=\mu(A)$.
**Preuve (étapes) :** **Admise** (théorème IV-5.26 du polycopié d'origine).
**Intuition :** (ii) sert dans les preuves ; (iii) permet d'identifier une loi limite par calcul de probabilités. En dimension 1 : $\mathbb{P}_n(Y_n\le t)\to\mu(]-\infty,t])$ en tout point $t$ où la fonction de répartition de $\mu$ est continue.
**Pièges / erreurs classiques :** La convergence des fonctions de répartition n'est exigée qu'aux **points de continuité** de la f.d.r. limite.

### Exemple 1.4 — Suite de lois uniformes de support $\{1/n,\dots,1\}$
**Source :** Poly ch.6, Exemple 1.4, p. 15
**Hypothèses :** $\mathsf{Y}_n:=\{1/n,\dots,(n-1)/n,1\}$, $\mathcal{Y}_n:=\mathcal{P}(\mathsf{Y}_n)$, $\mathbb{P}_n(\{k/n\}):=1/n$, $Y_n(x)=x$.
**Énoncé :** $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\mathcal{U}([0,1])$.
**Preuve (étapes) :**
1. Pour $t\in[0,1]$, $\mathbb{P}_n(Y_n\le t)=\lfloor nt\rfloor/n\to t$ (encadrement $nt-1<\lfloor nt\rfloor\le nt$) ; $0$ pour $t<0$, $1$ pour $t>1$.
2. La f.d.r. de $\mathcal{U}([0,1])$ est continue sur $\mathbb{R}$ : **Portmanteau** 1.3 (iii) conclut.
**Méthodes mobilisées :** convergence des fonctions de répartition + Portmanteau.
**Intuition :** Appliquée à $f$ continue sur $[0,1]$, la définition redonne la convergence des **sommes de Riemann** : $\mathbb{E}_n[f(Y_n)]=\frac1n\sum_{k=1}^nf(k/n)\to\int_0^1f(x)\,\mathrm{d}x$.

### Exemple 1.5 — Support d'une loi uniforme : la loi limite de l'erreur
**Source :** Poly ch.6, Exemple 1.5, p. 15 (Figures 1–2, p. 16)
**Hypothèses :** Suite de modèles $\big\{((\mathbb{R}_+^*)^n,(\mathcal{B}(\mathbb{R}_+^*))^{\otimes n},\{\mathbb{P}_{n,\theta}:\theta\in\Theta:=\mathbb{R}_+^*\}):n\in\mathbb{N}^\star\big\}$, $\mathbb{P}_{n,\theta}=(\theta^{-1}\mathbb{1}_{[0,\theta]}\cdot\mathrm{Leb})^{\otimes n}$ ; EMV $\hat\theta_n=X_{n:n}$.
**Énoncé :** Pour tout $\theta\in\Theta$,
$$n\big(\theta-\hat\theta_n\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{E}(\theta^{-1}).$$
**Preuve (étapes) :**
1. Ex. 1.2 : $\mathbb{P}_{n,\theta}(\theta-\hat\theta_n>\varepsilon)=(1-\varepsilon/\theta)^n$ pour $\varepsilon\in\,]0,\theta[$.
2. Pour $x>0$, prendre $\varepsilon=x/n$ (licite dès que $n>x/\theta$) : $\lim_n\mathbb{P}_{n,\theta}(n(\theta-\hat\theta_n)>x)=\lim_n(1-\frac{x}{n\theta})^n=e^{-x/\theta}$ (**limite classique** $(1+a/n)^n\to e^a$).
3. $x\mapsto1-e^{-x/\theta}$ prolongée par 0 sur $\mathbb{R}_-$ est la f.d.r. de $\mathcal{E}(\theta^{-1})$, continue sur $\mathbb{R}$ ; comme $\mathbb{P}_{n,\theta}(n(\theta-\hat\theta_n)\le x)=1-\mathbb{P}_{n,\theta}(n(\theta-\hat\theta_n)>x)$ et $\mathbb{P}_{n,\theta}(\theta-\hat\theta_n\ge0)=1$, la convergence des f.d.r. a lieu en tout point.
4. **Portmanteau** 1.3 conclut.
**Méthodes mobilisées :** calcul de la f.d.r. du maximum, changement d'échelle $\varepsilon=x/n$, Portmanteau.
**Intuition :** La vitesse se lit dans le facteur à mettre devant l'erreur pour obtenir une limite non dégénérée : ici $n$, pas $\sqrt n$ ; l'erreur est d'ordre $1/n$, bien plus petite que $1/\sqrt n$. La limite **n'est pas gaussienne** : le modèle uniforme n'est pas régulier (chapitre 3) ; la normalité asymptotique est le cas le plus fréquent, pas la règle.
**Pièges / erreurs classiques :** $\mathcal{E}(\theta^{-1})$ est d'**intensité** $\theta^{-1}$, de moyenne $\theta$ (densité $x\mapsto\theta^{-1}e^{-x/\theta}$, Figure 2). Figure 1 : 50 trajectoires $n\mapsto\hat\theta_n$ ($n\le200$, $X_i\sim\mathcal{U}([0,2])$) montrent la consistance, et celles de $n(2-\hat\theta_n)$ une dispersion qui ne se réduit plus (signe d'une loi limite non dégénérée). Figure 2 : histogramme de $N=5000$ réplications de $n(\theta-\hat\theta_n)$, $n=200$, $\theta=2$, et la densité de $\mathcal{E}(\theta^{-1})$.

### Théorème 1.4 — Transformation continue
**Source :** Poly ch.6, Théorème 1.4, p. 17
**Hypothèses :** $\{(\mathsf{Y}_n,\mathcal{Y}_n,\mathbb{P}_n)\}$, $Y_n$ à valeurs dans $\mathbb{R}^d$, $\mu$ loi sur $\mathbb{R}^d$, $\varphi:\mathbb{R}^d\to\mathbb{R}^m$ **continue en tout point d'un ensemble $C$ tel que $\mu(C)=1$** ; $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$.
**Énoncé :** $\varphi(Y_n)\overset{\mathbb{P}_n}{\Longrightarrow}\mu_\varphi$, où $\mu_\varphi(A):=\mu(\varphi^{-1}(A))$ pour $A\in\mathcal{B}(\mathbb{R}^m)$.
**Preuve (étapes) :**
1. Cas $\varphi$ continue sur $\mathbb{R}^d$ : pour $f$ continue bornée sur $\mathbb{R}^m$, $f\circ\varphi$ est continue bornée ; la convergence en loi donne $\mathbb{E}_n[f\circ\varphi(Y_n)]\to\int f\circ\varphi\,\mathrm{d}\mu=\int f\,\mathrm{d}\mu_\varphi$ (**théorème de transfert**).
2. Cas général ($\varphi$ continue seulement sur $C$, $\mu(C)=1$) : **admis** (fermés + Portmanteau ; théorème IV-5.30 du polycopié d'origine).
**Intuition :** Une fonction continue préserve la convergence en loi ; la limite est la loi image.
**Pièges / erreurs classiques :** Le cas $\varphi$ discontinue sur un ensemble $\mu$-négligeable sert souvent (quotients : $x\mapsto1/x$ continue sur $\mathbb{R}^*$, de mesure 1 pour $\mathcal{N}(0,1)$).

### Définition 1.5 — Fonction caractéristique
**Source :** Poly ch.6, Définition 1.5, p. 17, et éq. (1)
**Hypothèses :** $Y$ vecteur aléatoire à valeurs dans $\mathbb{R}^d$ défini sur $(\mathsf{Y},\mathcal{Y},\mathbb{P})$ ; vecteurs colonnes.
**Énoncé :** La fonction caractéristique de $Y$ est $t\mapsto\mathbb{E}\big[e^{\mathrm{i}t^\top Y}\big]$, $t\in\mathbb{R}^d$. Elle est définie pour tout $t$ ($\lvert e^{\mathrm{i}t^\top Y}\rvert=1$) et **caractérise la loi**. Si $Y\sim\mathcal{N}_d(\mu,\Sigma)$,
$$\mathbb{E}\big[e^{\mathrm{i}t^\top Y}\big]=\exp\big(\mathrm{i}t^\top\mu-\tfrac12t^\top\Sigma t\big),\tag{1}$$
en particulier $t\mapsto\exp(-t^2/2)$ est la fonction caractéristique de $\mathcal{N}(0,1)$.
**Preuve (étapes) :** — (rappels)

### Théorème 1.5 — Théorème de Lévy
**Source :** Poly ch.6, Théorème 1.5, p. 17
**Hypothèses :** $\{(\mathsf{Y}_n,\mathcal{Y}_n,\mathbb{P}_n)\}$, $Y_n$ à valeurs dans $\mathbb{R}^d$, $\mu$ loi sur $\mathbb{R}^d$.
**Énoncé :** $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$ si et seulement si
$$\mathbb{E}_n\big[\exp(\mathrm{i}t^\top Y_n)\big]\xrightarrow[n\to\infty]{}\int\exp(\mathrm{i}t^\top y)\,\mu(\mathrm{d}y)\qquad\text{pour tout }t\in\mathbb{R}^d.$$
**Preuve (étapes) :**
1. Sens direct : immédiat, $y\mapsto\cos(t^\top y)$ et $y\mapsto\sin(t^\top y)$ sont continues bornées (**définition** de la convergence en loi).
2. Réciproque : **admise** (théorème IV-5.36 du polycopié d'origine).
**Intuition :** Caractérisation utilisée pour démontrer le TCL et Slutsky.

### Théorème 1.6 — Théorème de la limite centrale, cas $\ell\ge1$
**Source :** Poly ch.6, Théorème 1.6, p. 18 (preuve p. 18–19)
**Hypothèses :** $Q$ loi sur $(\mathsf{X}:=\mathbb{R}^\ell,\mathcal{X}:=\mathcal{B}(\mathbb{R}^\ell))$ **admettant un moment d'ordre 2**, d'espérance $\mu$ et de matrice de covariance $\Sigma$ ($\ell\times\ell$) ; suite de $n$-échantillons $\{(\mathsf{X}^n,\mathcal{X}^{\otimes n},\mathbb{P}_n:=Q^{\otimes n}):n\in\mathbb{N}^\star\}$.
**Énoncé :**
$$\sqrt n\Big(\frac1n\sum_{k=1}^nX_k-\mu\Big)=\frac1{\sqrt n}\sum_{k=1}^n(X_k-\mu)\overset{\mathbb{P}_n}{\Longrightarrow}\mathcal{N}(0,\Sigma).$$
**Preuve (étapes) :** faite dans le cas $\ell=1$, $\sigma^2:=\mathrm{Var}_Q(X_1)>0$. Le cas $\ell\ge1$ s'en déduit par **Cramér-Wold** (Outils §2.4) ; le cas $\sigma^2=0$ est immédiat ($\sqrt n(\bar X_n-\mu)=0$ $\mathbb{P}_n$-p.s.) ; cas général : théorème IV-5.39 du polycopié d'origine.
1. *Réduction.* $Y_i:=\sigma^{-1}(X_i-\mu)$, $\bar Y_n:=n^{-1}\sum_iY_i$, de sorte que $\frac{\sqrt n}{\sigma}\big(\frac1n\sum_iX_i-\mu\big)=\sqrt n\,\bar Y_n$. Sous $\mathbb{P}_n$, les $Y_i$ sont i.i.d., centrées, de variance 1. Il suffit de montrer $\sqrt n\bar Y_n\Rightarrow\mathcal{N}(0,1)$, puis de multiplier par $\sigma$ (**transformation continue** 1.4).
2. *Ce qu'il faut démontrer.* $\varphi_n(t):=\mathbb{E}_n[\exp(\mathrm{i}t\sqrt n\bar Y_n)]$ ; par (1) et **Lévy** 1.5, il suffit que $\lim_n\varphi_n(t)=\exp(-t^2/2)$ pour tout $t$.
3. *Réduction à $Y_1$.* Par **indépendance et identité des lois** : $\varphi_n(t)=\mathbb{E}_n\big[\exp\big(\mathrm{i}\frac{t}{\sqrt n}\sum_kY_k\big)\big]=\psi\big(\frac t{\sqrt n}\big)^n$, $\psi(u):=\mathbb{E}_n[\exp(\mathrm{i}uY_1)]$.
4. *Développement.* $Y_1$ de carré intégrable : **Lemme 2.3** : $\psi(u)=1+\mathrm{i}u\,\mathbb{E}_n[Y_1]-\frac{u^2}2\mathbb{E}_n[Y_1^2]+o(u^2)$. Avec $\mathbb{E}_n[Y_1]=0$, $\mathbb{E}_n[Y_1^2]=1$, $u=t/\sqrt n$ : $\psi(t/\sqrt n)=1-\frac{t^2}{2n}+o(n^{-1})$.
5. *Limite.* **Lemme 2.4** (puissances $n$-ièmes, $na_n\to-t^2/2$) : $\lim_n\varphi_n(t)=\lim_n\big(1-\frac{t^2}{2n}+o(n^{-1})\big)^n=\exp(-t^2/2)$.
**Intuition :** Seuls les termes d'ordre 0, 1, 2 du développement de la fonction caractéristique survivent à l'élévation à la puissance $n$ (argument divisé par $\sqrt n$) : la loi limite ne dépend du modèle que par $\mu$ et $\Sigma$, d'où l'universalité du TCL.
**Pièges / erreurs classiques :** Hypothèse = **moment d'ordre 2** (pas seulement intégrabilité). Ce qui converge est la **loi** à $n$ fixé, pas les trajectoires (animation p. 18).

### Remarque (§1.5, p. 18) — Illustration / animation du TCL
**Source :** Poly ch.6, encadré « Illustration / animation », p. 18
**Énoncé :** La trajectoire de $\bar X_n$ de l'animation précédente, transformée en $\sqrt n(\bar X_n-\mu)/\sigma$, ne se stabilise plus ; une seconde trajectoire oscille différemment. On tire 400 suites sans tracer leurs trajectoires et l'on regarde, à un instant $n$ que l'on fait avancer, l'histogramme des valeurs transformées : il épouse la densité de $\mathcal{N}(0,1)$. Ce qui converge est la loi à $n$ fixé, non les trajectoires.

### Corollaire 1.1 — Intervalle de confiance asymptotique pour l'espérance, écart-type connu
**Source :** Poly ch.6, Corollaire 1.1, p. 19
**Hypothèses :** Cadre du Th. 1.6 avec $\ell=1$, $\sigma^2>0$ **connu** ; $\alpha\in\,]0,1[$.
**Énoncé :** L'intervalle
$$\Big[\frac1n\sum_{k=1}^nX_k-z_{1-\alpha/2}\frac{\sigma}{\sqrt n},\ \frac1n\sum_{k=1}^nX_k+z_{1-\alpha/2}\frac{\sigma}{\sqrt n}\Big]$$
est un intervalle de confiance de niveau asymptotique $1-\alpha$ pour $\mu$, $z_u$ quantile d'ordre $u$ de $\mathcal{N}(0,1)$.
**Preuve (étapes) :**
1. **TCL** : $\frac{\sqrt n}{\sigma}\big(\frac1n\sum_kX_k-\mu\big)\overset{\mathbb{P}_n}{\Longrightarrow}\mathcal{N}(0,1)$.
2. Le pavé $]a,b]$ a une frontière de mesure nulle pour $\mathcal{N}(0,1)$ : **Portmanteau** 1.3 donne $\lim_n\mathbb{P}_n\big(a\frac{\sigma}{\sqrt n}\le\frac1n\sum_kX_k-\mu\le b\frac{\sigma}{\sqrt n}\big)=\Phi(b)-\Phi(a)$.
3. Prendre $b=-a=z_{1-\alpha/2}$ : $\Phi(b)-\Phi(a)=1-\alpha$.
**Intuition :** Version asymptotique de l'IC gaussien du chapitre 4, valable pour **toute** loi de carré intégrable.
**Pièges / erreurs classiques :** Quand $\sigma$ est inconnu, on le remplace par un estimateur consistant : justification par **Slutsky** (Lemme 1.1 (iii)).

### Lemme 1.1 — Lemme de Slutsky
**Source :** Poly ch.6, Lemme 1.1, p. 20 (preuve p. 20–21)
**Hypothèses :** $\{(\mathsf{Z}_n,\mathcal{Z}_n,\mathbb{P}_n):n\in\mathbb{N}\}$ ; $X_n$, $Y_n$ v.a. **réelles** sur $(\mathsf{Z}_n,\mathcal{Z}_n)$ ; $\mu$ probabilité sur $(\mathbb{R},\mathcal{B}(\mathbb{R}))$ ; $X_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$ et $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\delta_c$, **$c$ constante**.
**Énoncé :** Avec $X\sim\mu$ :
- (i) $X_n+Y_n\overset{\mathbb{P}_n}{\Longrightarrow}X+c$ ;
- (ii) $Y_nX_n\overset{\mathbb{P}_n}{\Longrightarrow}cX$ ;
- (iii) si $c\ne0$ et $\mathbb{P}_n(Y_n\ne0)=1$ pour tout $n$, $Y_n^{-1}X_n\overset{\mathbb{P}_n}{\Longrightarrow}c^{-1}X$.
**Preuve (étapes) :**
1. *Étape 1.* Écrire $\begin{pmatrix}X_n\\Y_n\end{pmatrix}=\underbrace{\begin{pmatrix}0\\Y_n-c\end{pmatrix}}_{U_n}+\underbrace{\begin{pmatrix}X_n\\c\end{pmatrix}}_{V_n}$. Par hypothèse et Remarque 1 ci-dessous, $Y_n\xrightarrow{\mathbb{P}_n\text{-prob}}c$, donc $U_n\xrightarrow{\mathbb{P}_n\text{-prob}}0$.
2. *Étape 2.* $V_n\overset{\mathbb{P}_n}{\Longrightarrow}\nu:=\mu\otimes\delta_c$ **par les fonctions caractéristiques** : pour $t_1,t_2\in\mathbb{R}$, $\mathbb{E}_n[\exp(\mathrm{i}t_1X_n)\exp(\mathrm{i}t_2c)]=\exp(\mathrm{i}t_2c)\,\mathbb{E}_n[\exp(\mathrm{i}t_1X_n)]\to\exp(\mathrm{i}t_2c)\int\exp(\mathrm{i}t_1x)\,\mu(\mathrm{d}x)$ (**Lévy** en dimension 1 appliqué à $X_n$) ; c'est la fonction caractéristique de $\mu\otimes\delta_c$ en $(t_1,t_2)$ ; **Lévy en dimension 2** conclut.
3. *Étape 3.* Si $U_n\to0$ en probabilité et $V_n\Rightarrow\nu$, alors $U_n+V_n\Rightarrow\nu$. Pour $f$ lipschitzienne bornée de constante $L_f$ et tout $\delta>0$ :
$$\Big\lvert\mathbb{E}_n[f(U_n+V_n)]-\int f\,\mathrm{d}\nu\Big\rvert\le L_f\delta+2\|f\|_\infty\mathbb{P}_n(\|U_n\|\ge\delta)+\Big\lvert\mathbb{E}_n[f(V_n)]-\int f\,\mathrm{d}\nu\Big\rvert$$
(**inégalité triangulaire**, puis séparation des événements $\{\|U_n\|<\delta\}$ et $\{\|U_n\|\ge\delta\}$). À $\delta$ fixé les deux derniers termes $\to0$ ; le premier est arbitrairement petit. **Portmanteau** 1.3 (ii) conclut.
4. *Étape 4.* Donc $(X_n,Y_n)\overset{\mathbb{P}_n}{\Longrightarrow}\mu\otimes\delta_c$. **Transformation continue** 1.4 avec $(x,y)\mapsto x+y$, $(x,y)\mapsto xy$ (continues sur $\mathbb{R}^2$) et $(x,y)\mapsto x/y$, continue sur $C:=\mathbb{R}\times\mathbb{R}^*$ avec $(\mu\otimes\delta_c)(C)=\delta_c(\mathbb{R}^*)=1$ si $c\ne0$. Les lois images sont celles de $X+c$, $cX$, $c^{-1}X$.
**Intuition :** Ce qui converge vers une constante se comporte, à la limite, comme cette constante, même combiné à une suite qui converge en loi. Utilisé dans presque toutes les démonstrations de la fin du chapitre.
**Pièges / erreurs classiques :** La limite de $Y_n$ doit être une **constante** (déterministe). La clé est la convergence en loi du **couple** $(X_n,Y_n)$ ; la convergence en loi de chaque composante ne suffit pas en général (Outils, contre-exemple $Y_n=(-1)^nX_n$).

### Remarque (§1.6, p. 20) — Trois remarques sur le lemme de Slutsky
**Source :** Poly ch.6, « Remarques » suivant le Lemme 1.1, p. 20
**Énoncé :**
1. La convergence en loi vers une masse de Dirac entraîne la convergence en probabilité : $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\delta_c\iff Y_n\xrightarrow{\mathbb{P}_n\text{-prob}}c$. En effet, par Portmanteau, $\mathbb{P}_n(\lvert Y_n-c\rvert>\varepsilon)=1-\mathbb{P}_n(c-\varepsilon<Y_n\le c+\varepsilon)\to1-\delta_c(]c-\varepsilon,c+\varepsilon])=0$ (frontière $\{c\pm\varepsilon\}$ de mesure nulle pour $\delta_c$).
2. La démonstration établit au passage un énoncé utilisé seul : si $U_n\overset{\mathbb{P}_n}{\Longrightarrow}\nu$ et $V_n\xrightarrow{\mathbb{P}_n\text{-prob}}0$, alors $U_n+V_n\overset{\mathbb{P}_n}{\Longrightarrow}\nu$.
3. Dans un IC asymptotique, si $\sigma$ n'est pas connu, on peut le remplacer par un estimateur consistant : c'est l'assertion (iii).

### Remarque (§1.6, p. 21) — Slutsky vectoriel et matriciel
**Source :** Poly ch.6, Remarque p. 21
**Énoncé :** Le lemme de Slutsky s'étend au cas vectoriel et matriciel ; énoncé et démonstration (procédé de Cramér-Wold) dans les Compléments (§4.1, Th. 4.1). C'est cette forme qu'on utilise sans la nommer quand $T_n$ est à valeurs dans $\mathbb{R}^\ell$.

### Exemple 1.6 — Théorème de la limite centrale pour la variance empirique
**Source :** Poly ch.6, Exemple 1.6, p. 21–22 (éq. (2))
**Hypothèses :** Suite de $n$-échantillons $(\mathbb{R}^n,(\mathcal{B}(\mathbb{R}))^{\otimes n},\mathbb{P}_n:=Q^{\otimes n})$ d'une loi $Q$ sur $\mathbb{R}$ telle que $\int x^4\,Q(\mathrm{d}x)<\infty$ ; $\mu:=\int x\,Q(\mathrm{d}x)$, $\sigma^2:=\mathrm{Var}_Q(X_1)$. Notations : $\hat\sigma_n^2:=\frac1n\sum_{i=1}^n(X_i-\bar X_n)^2$, $S_n^2:=\frac1{n-1}\sum_{i=1}^n(X_i-\bar X_n)^2=\frac{n}{n-1}\hat\sigma_n^2$.
**Énoncé :**
$$\sqrt n\big(\hat\sigma_n^2-\sigma^2\big)\overset{\mathbb{P}_n}{\Longrightarrow}\mathcal{N}(0,\gamma),\qquad\gamma:=\int(x-\mu)^4\,Q(\mathrm{d}x)-\sigma^4,$$
et la même convergence vaut pour $S_n^2$.
**Preuve (étapes) :**
1. *a) Autre expression.* En développant, $\hat\sigma_n^2=n^{-1}\sum_i(X_i-\mu)^2-(\bar X_n-\mu)^2$, d'où
$$\sqrt n\big(\hat\sigma_n^2-\sigma^2\big)=\frac1{\sqrt n}\sum_{i=1}^n\big\{(X_i-\mu)^2-\sigma^2\big\}-\sqrt n\big(\bar X_n-\mu\big)^2.\tag{2}$$
2. *b) Premier terme : TCL.* $Z_i:=(X_i-\mu)^2-\sigma^2$ i.i.d., $\mathbb{E}_n[Z_1]=0$, $\mathrm{Var}_n(Z_1)=\int(x-\mu)^4Q(\mathrm{d}x)-\sigma^4=\gamma<\infty$ (**moment d'ordre 4**). **TCL** 1.6 : $n^{-1/2}\sum_iZ_i\Rightarrow\mathcal{N}(0,\gamma)$.
3. *c) Second terme $\to0$ en probabilité.* **TCL** : $\sqrt n(\bar X_n-\mu)\Rightarrow\mathcal{N}(0,\sigma^2)$ ; **transformation continue** avec $x\mapsto x^2$ : $n(\bar X_n-\mu)^2\Rightarrow\sigma^2\chi^2(1)$ (loi de $\sigma^2W$, $W\sim\chi^2(1)$). **Slutsky (ii)** avec la suite déterministe $Y_n=n^{-1/2}\to0$ : $\sqrt n(\bar X_n-\mu)^2=\frac1{\sqrt n}\,n(\bar X_n-\mu)^2\Rightarrow0$, donc $\to0$ en probabilité (**convergence en loi vers une constante**).
4. *d) Conclusion.* Reporter b), c) dans (2) et appliquer la **Remarque 2** après Slutsky : $\sqrt n(\hat\sigma_n^2-\sigma^2)\Rightarrow\mathcal{N}(0,\gamma)$.
5. *Cas $S_n^2$.* $\sqrt n(S_n^2-\hat\sigma_n^2)=\sqrt n\,\hat\sigma_n^2/(n-1)$ ; $\hat\sigma_n^2\to\sigma^2$ en probabilité (**LGN + continuité**), donc par **Slutsky** $\sqrt n(S_n^2-\hat\sigma_n^2)\to0$ en probabilité, d'où la même loi limite.
**Méthodes mobilisées :** décomposition en terme principal + terme négligeable ; TCL ; transformation continue ; Slutsky.
**Intuition :** La variance empirique n'est pas une moyenne empirique mais en diffère par un terme négligeable à l'échelle $\sqrt n$.
**Pièges / erreurs classiques :** Il faut un **moment d'ordre 4**. Dans le cas gaussien $\gamma=3\sigma^4-\sigma^4=2\sigma^4$ *(complément d'extraction, non écrit dans le poly)*.

### Proposition 1.2 — Consistance de la variance empirique
**Source :** Poly ch.6, Proposition 1.2, p. 22–23 (éq. (3))
**Hypothèses :** Suite de $n$-échantillons d'une loi $Q$ sur $\mathbb{R}$ **de carré intégrable**, de variance $\sigma^2>0$ (pas de moment d'ordre 4 requis).
**Énoncé :**
$$\hat\sigma_n^2\xrightarrow{\mathbb{P}_n\text{-prob}}\sigma^2,\qquad S_n^2\xrightarrow{\mathbb{P}_n\text{-prob}}\sigma^2,\qquad\sigma^{-2}S_n^2\xrightarrow{\mathbb{P}_n\text{-prob}}1.\tag{3}$$
**Preuve (étapes) :**
1. **LGN faible** 1.2 appliquée à $\{X_i\}$ et $\{X_i^2\}$ : $\big(\bar X_n,\frac1n\sum_iX_i^2\big)\xrightarrow{\mathbb{P}_n\text{-prob}}(\mu,\sigma^2+\mu^2)$, la convergence du couple résultant de celle des composantes (**Prop. 2.1**).
2. $\hat\sigma_n^2=n^{-1}\sum_iX_i^2-\bar X_n^2$ ; **théorème de continuité en probabilité** (Th. 2.1) avec $(u,w)\mapsto w-u^2$ : $\hat\sigma_n^2\to\sigma^2+\mu^2-\mu^2=\sigma^2$.
3. $S_n^2=\frac n{n-1}\hat\sigma_n^2$ et $n/(n-1)\to1$ : $S_n^2\to\sigma^2$ ; division par $\sigma^2>0$ : $\sigma^{-2}S_n^2\to1$.
**Intuition :** Sert pour le test de Student asymptotique (Ex. 1.14).
**Pièges / erreurs classiques :** La LGN 1.2 appliquée à $X_i^2$ demande $\mathbb{E}[X_i^4]<\infty$ ; dans le cas i.i.d. seulement intégrable, c'est la LGN admise des Compléments (Th. 4.2) qui couvre $\{X_i^2\}$ quand $Q$ est seulement de carré intégrable *(remarque d'extraction : le poly cite la LGN 1.2 sans relever ce point)*.

### Théorème 1.7 — Méthode-δ, cas scalaire
**Source :** Poly ch.6, Théorème 1.7, p. 23
**Hypothèses :**
- $g:D_g\to\mathbb{R}$ définie sur un **intervalle ouvert** $D_g$ de $\mathbb{R}$ et **dérivable au point** $\theta\in D_g$, de dérivée $\dot g(\theta)$ ;
- $\{T_n\}$ v.a., $T_n$ définie sur $(\mathsf{X}_n,\mathcal{X}_n,\mathbb{P}_n)$, avec $\mathbb{P}_n(T_n\in D_g)=1$ pour tout $n$ ;
- $r_n(T_n-\theta)\overset{\mathbb{P}_n}{\Longrightarrow}G$ pour une suite **croissante** $\{r_n\}$ de réels **strictement positifs**, $r_n\to+\infty$.

**Énoncé :**
$$r_n\big(g(T_n)-g(\theta)\big)\overset{\mathbb{P}_n}{\Longrightarrow}\dot g(\theta)\,G,\qquad r_n\big(g(T_n)-g(\theta)\big)-r_n\dot g(\theta)(T_n-\theta)\xrightarrow{\mathbb{P}_n\text{-prob}}0.$$
**Preuve (étapes) :**
1. *Convergence en probabilité de $T_n-\theta$.* $r_n(T_n-\theta)$ converge en loi et $r_n^{-1}\to0$ : **Slutsky (ii)** donne $T_n-\theta=r_n^{-1}(r_n\{T_n-\theta\})\xrightarrow{\mathbb{P}_n\text{-prob}}0$.
2. *Développement de $g$.* Pour $h\ne0$ avec $\theta+h\in D_g$, $\varepsilon(h):=\frac{g(\theta+h)-g(\theta)}h-\dot g(\theta)$, $\varepsilon(0):=0$, prolongé par 0 hors de $\{h:\theta+h\in D_g\}$ : $\varepsilon$ est continue en 0, nulle en 0 (**dérivabilité** en $\theta$), et $g(\theta+h)=g(\theta)+\dot g(\theta)h+h\varepsilon(h)$.
3. $\mathbb{P}_n$-p.s. (car $\mathbb{P}_n(T_n\in D_g)=1$) : $r_n(g(T_n)-g(\theta))=\dot g(\theta)\,r_n(T_n-\theta)+r_n(T_n-\theta)\,\varepsilon(T_n-\theta)$.
4. *Passage à la limite.* **Continuité en probabilité** (Th. 2.1, $\varepsilon$ continue en 0) : $\varepsilon(T_n-\theta)\to0$ en probabilité ; **Slutsky** au produit : $R_n:=r_n(T_n-\theta)\varepsilon(T_n-\theta)\to0$ en probabilité (seconde assertion).
5. $\dot g(\theta)\{r_n(T_n-\theta)\}\Rightarrow\dot g(\theta)G$ (**transformation continue** 1.4) ; ajouter $R_n$ ne change pas la limite (**Remarque 2** après Slutsky).
**Intuition :** Traduction asymptotique d'une approximation au premier ordre : $g(T_n)-g(\theta)\approx\dot g(\theta)(T_n-\theta)$ ; le reste multiplié par $r_n$ tend vers 0 en probabilité. Gain : la loi limite de $g(T_n)$ s'obtient sans nouveau calcul, **la variance asymptotique est multipliée par $\dot g(\theta)^2$**. Perte : si $\dot g(\theta)=0$, la limite est dégénérée et la bonne échelle n'est plus $r_n$.
**Pièges / erreurs classiques :** Cas typique $r_n=\sqrt n$, $G\sim\mathcal{N}(0,\sigma^2)$ $\Rightarrow$ $\mathcal{N}(0,\dot g(\theta)^2\sigma^2)$. Ne pas oublier de vérifier $\mathbb{P}_n(T_n\in D_g)=1$ et la dérivabilité **au point** $\theta$ (la vraie valeur).

### Exemple 1.7 — EMV du paramètre d'une loi exponentielle
**Source :** Poly ch.6, Exemple 1.7, p. 24
**Hypothèses :** $\mathcal{E}(\theta)$ de densité $x\mapsto\theta\exp(-\theta x)$ sur $\mathbb{R}_+$, espérance $1/\theta$, variance $1/\theta^2$ ; suite de $n$-échantillons, $\theta\in\mathbb{R}_+^*$ ; EMV $\hat\theta_n:=\bar X_n^{-1}$, $\bar X_n:=\frac1n\sum_{k=1}^nX_k$.
**Énoncé :** $\{\hat\theta_n\}$ est consistante et
$$\sqrt n\big(\hat\theta_n-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,\theta^2).$$
**Preuve (étapes) :**
1. $\varphi(u):=1/u$, $u>0$. Consistance : Ex. 1.3.
2. **TCL** : $\sqrt n(\bar X_n-\theta^{-1})\Rightarrow\mathcal{N}(0,\mathrm{Var}_{n,\theta}(X_1))=\mathcal{N}(0,\theta^{-2})$.
3. $\varphi$ dérivable en $\theta^{-1}\in D_\varphi:=\mathbb{R}_+^*$, $\dot\varphi(\theta^{-1})=-\theta^2$ ; $\mathbb{P}_{n,\theta}(\bar X_n\in\mathbb{R}_+^*)=1$.
4. **Méthode-δ** 1.7 : $\sqrt n(\hat\theta_n-\theta)=\sqrt n(\varphi(\bar X_n)-\varphi(\theta^{-1}))\Rightarrow\dot\varphi(\theta^{-1})\mathcal{N}(0,\theta^{-2})=\mathcal{N}(0,\theta^4\cdot\theta^{-2})=\mathcal{N}(0,\theta^2)$.
**Méthodes mobilisées :** EMV fonction d'une moyenne empirique ; TCL ; méthode-δ.
**Intuition :** Variance asymptotique $\theta^2=1/I(\theta)$ (information de Fisher d'une observation, $\theta^{-2}$ ; cf. PC6 Exercice 1).
**Pièges / erreurs classiques :** Calculer $\dot\varphi$ **au point limite** $\theta^{-1}$ (pas en $\theta$) : $\dot\varphi(u)=-1/u^2$ donne $-\theta^2$.

### Remarque (§1.7, p. 24) — Illustration / animation : TCL pour l'EMV
**Source :** Poly ch.6, encadré « Illustration / animation », p. 24
**Énoncé :** Renvoi à l'animation de la semaine 3 « Pourquoi l'EMV trouve-t-il le bon paramètre ? », étape « M-estimation » : pour un modèle de Bernoulli ou de Poisson, on suit 400 estimateurs quand $n$ grandit, rassemblés en boîtes à moustaches pour $n=64$, 512 et 4 096, puis on change d'échelle en $\sqrt n$ ; les boîtes cessent de se resserrer et l'histogramme des erreurs $\sqrt n(\hat\theta_n-\theta)$ prend la forme de la gaussienne limite.

### Exemple 1.8 — Lois limites de $X_n^2$ et de $1/X_n$
**Source :** Poly ch.6, Exemple 1.8, p. 24–25
**Hypothèses :** $r_n(X_n-\mu)\overset{\mathbb{P}_n}{\Longrightarrow}\mathcal{N}(0,\sigma^2)$, $\sigma^2>0$, $\{r_n\}$ croissante, positive, $\to\infty$.
**Énoncé et preuve (étapes) :**
1. *$X_n^2$, $\mu\ne0$.* $g(x)=x^2$, $g'(\mu)=2\mu\ne0$ ; **méthode-δ** : $r_n(X_n^2-\mu^2)\Rightarrow\mathcal{N}(0,4\mu^2\sigma^2)$.
2. *$X_n^2$, $\mu=0$.* $g'(0)=0$ : la méthode-δ ne donne que $r_nX_n^2\xrightarrow{\mathbb{P}_n\text{-prob}}0$ (vitesse trop lente). À la vitesse $r_n^2$ : **transformation continue** avec $x\mapsto x^2$ et $\sigma^{-1}r_nX_n\Rightarrow\mathcal{N}(0,1)$ :
$$\sigma^{-2}r_n^2X_n^2=(\sigma^{-1}r_nX_n)^2\overset{\mathbb{P}_n}{\Longrightarrow}\chi^2(1).$$
3. *$1/X_n$* (on suppose $\mathbb{P}_n(X_n=0)=0$), *$\mu\ne0$.* **Méthode-δ** avec $g(x)=1/x$ dérivable en $\mu$ : $r_n\big(\frac1{X_n}-\frac1\mu\big)\Rightarrow\mathcal{N}\big(0,\frac{\sigma^2}{\mu^4}\big)$.
4. *$1/X_n$, $\mu=0$.* **Transformation continue** avec $x\mapsto1/x$, continue sur $C:=\mathbb{R}^*$, de mesure 1 pour $\mathcal{N}(0,1)$ : $\frac{\sigma}{r_nX_n}\overset{\mathbb{P}_n}{\Longrightarrow}\frac1X$, $X\sim\mathcal{N}(0,1)$.
**Méthodes mobilisées :** méthode-δ ; changement d'échelle quand la dérivée s'annule ; théorème de transformation continue (version « continue sur un ensemble de mesure 1 »).
**Intuition :** Quand la dérivée s'annule, l'approximation au premier ordre ne contient plus d'information ; la loi limite apparaît à une **autre échelle** ($r_n^2$) et avec une **autre forme** ($\chi^2$, non gaussienne). Même phénomène à l'exercice 6 (Hodges).
**Pièges / erreurs classiques :** Appliquer aveuglément la méthode-δ en un point où $\dot g=0$ et conclure à une « gaussienne de variance nulle ».

### Théorème 1.8 — Méthode-δ, cas vectoriel
**Source :** Poly ch.6, Théorème 1.8, p. 25–26
**Hypothèses :**
- $D_g$ ouvert de $\mathbb{R}^p$ ;
- $g:D_g\to\mathbb{R}^m$ **différentiable au point** $\theta\in D_g$, de matrice jacobienne $J_g(\theta)$ ;
- $T_n$ vecteurs aléatoires sur $(\mathsf{X}_n,\mathcal{X}_n,\mathbb{P}_n)$, $\mathbb{P}_n(T_n\in D_g)=1$ ;
- $r_n(T_n-\theta)\overset{\mathbb{P}_n}{\Longrightarrow}\mathrm{T}$, $\{r_n\}$ croissante, strictement positive, $\to+\infty$.

**Énoncé :**
$$r_n\big(g(T_n)-g(\theta)\big)\overset{\mathbb{P}_n}{\Longrightarrow}J_g(\theta)\,\mathrm{T},\qquad r_n\big(g(T_n)-g(\theta)\big)-r_nJ_g(\theta)(T_n-\theta)\xrightarrow{\mathbb{P}_n\text{-prob}}0.$$
En particulier, si $r_n=\sqrt n$ et $\mathrm{T}\sim\mathcal{N}(0,\Sigma)$ :
$$\sqrt n\big(g(T_n)-g(\theta)\big)\overset{\mathbb{P}_n}{\Longrightarrow}\mathcal{N}\big(0,J_g(\theta)\,\Sigma\,J_g(\theta)^\top\big).$$
**Preuve (étapes) :** **Esquissée** dans le poly : celle du cas scalaire, en remplaçant $h\varepsilon(h)$ par un reste $R(h)$ avec $\|R(h)\|=o(\|h\|)$ et Slutsky par sa forme vectorielle (Compléments §4.1 ; détail p. 43 : $r_n(g(T_n)-g(\theta))-J_g(\theta)\{r_n(T_n-\theta)\}=r_n\|T_n-\theta\|\tilde R(T_n-\theta)$, $\tilde R$ continue et nulle en 0, $r_n\|T_n-\theta\|\Rightarrow\|\mathrm{T}\|$, produit $\to0$ en probabilité).
**Intuition :** La dérivée devient la jacobienne ; la covariance se transforme comme pour une application linéaire.
**Pièges / erreurs classiques :** Dimensions : $J_g(\theta)$ est $m\times p$, la covariance limite est $m\times m$. La différentiabilité (Déf. 2.4) est plus forte que l'existence des dérivées partielles.

### Définition 1.6 — Normalité asymptotique
**Source :** Poly ch.6, Définition 1.6, p. 26
**Hypothèses :** Suite de modèles $\{(\mathsf{Z}_n,\mathcal{Z}_n,\{\mathbb{P}_{n,\theta}:\theta\in\Theta\}):n\in\mathbb{N}^\star\}$, $g:\Theta\to\mathbb{R}^\ell$, $T_n:\mathsf{Z}_n\to\mathbb{R}^\ell$.
**Énoncé :** $\{T_n\}$ est *asymptotiquement normale* si, pour tout $\theta\in\Theta$,
$$\sqrt n\big(T_n(Z_n)-g(\theta)\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,\Sigma(\theta)),$$
où $\Sigma(\theta)$ est une matrice symétrique positive $\ell\times\ell$, la *matrice de covariance asymptotique* (*variance asymptotique* $v(\theta)$ si $\ell=1$).
**Preuve (étapes) :** — (définition). **Conséquence (p. 26) : asymptotiquement normale $\Rightarrow$ consistante** : $T_n(Z_n)-g(\theta)=\frac1{\sqrt n}\sqrt n(T_n(Z_n)-g(\theta))\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}0$ par **Slutsky** ($1/\sqrt n\to0$) et convergence en loi vers une constante.
**Intuition :** La loi exacte de $T_n-g(\theta)$ est hors d'atteinte en général, mais $\sqrt n\{T_n-g(\theta)\}$ converge souvent vers une gaussienne non dégénérée. La variance asymptotique joue, dans le monde asymptotique, le rôle de l'EQM à $n$ fixé : lecture $\hat\theta_n\approx\theta+\sqrt{v(\theta)/n}\,\xi$, $\xi\approx\mathcal{N}(0,1)$ (approximation exacte seulement à la limite). Pour l'EMV des modèles réguliers, $v(\theta)$ est l'inverse de l'information de Fisher (chapitre 3).
**Pièges / erreurs classiques :** La normalisation est $\sqrt n$ **par définition** ; l'Ex. 1.5 (vitesse $n$, limite exponentielle) n'est **pas** asymptotiquement normal.

### Exemple 1.9 — EMV dans un modèle exponentiel
**Source :** Poly ch.6, Exemple 1.9, p. 26
**Hypothèses :** Celles de l'Ex. 1.7.
**Énoncé :** Ex. 1.7 donne $\sqrt n(\hat\theta_n-\theta)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,\theta^2)$ pour tout $\theta\in\mathbb{R}_+^*$ : la suite des EMV est asymptotiquement normale, de variance asymptotique $v(\theta)=\theta^2$.
**Méthodes mobilisées :** TCL + méthode-δ.

### Définition 1.7 — Fonction asymptotiquement pivotale
**Source :** Poly ch.6, Définition 1.7, p. 27
**Hypothèses :** Suite de modèles $\{(\mathsf{Z}_n,\mathcal{Z}_n,\{\mathbb{P}_{n,\theta}:\theta\in\Theta\}):n\in\mathbb{N}\}$ ; $G_n:\mathsf{Z}_n\times\Theta\to\mathbb{R}^p$ mesurables.
**Énoncé :** $\{G_n\}$ est *asymptotiquement pivotale de loi* $L$ s'il existe une probabilité $L$ sur $(\mathbb{R}^p,\mathcal{B}(\mathbb{R}^p))$ telle que, pour tous $\theta,\vartheta\in\Theta$ et tout $A\in\mathcal{B}(\mathbb{R}^p)$,
$$\lim_{n\to\infty}\mathbb{P}_{n,\theta}(G_n(Z_n,\theta)\in A)=\lim_{n\to\infty}\mathbb{P}_{n,\vartheta}(G_n(Z_n,\vartheta)\in A)=L(A).$$
**Preuve (étapes) :** — (définition)
**Intuition :** Version asymptotique de la fonction pivotale du chapitre 4 : on demande seulement que la **loi limite** ne dépende pas du paramètre.
**Pièges / erreurs classiques :** $G_n$ dépend de $\theta$ (comme un pivot), mais sa loi limite non.

### Exemple 1.10 — Pivot asymptotique issu de la normalité asymptotique
**Source :** Poly ch.6, Exemple 1.10, p. 27
**Hypothèses :** $T_n:\mathsf{Z}_n\to\mathbb{R}$ asymptotiquement normale : $\forall\theta$, $\sqrt n(T_n(Z_n)-g(\theta))\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,v(\theta))$, $v(\theta)>0$.
**Énoncé :** $G_n(Z_n;\theta):=\frac{\sqrt n}{\sqrt{v(\theta)}}(T_n(Z_n)-g(\theta))$ définit une suite de fonctions asymptotiquement pivotales, de loi $L=\mathcal{N}(0,1)$.
**Preuve (étapes) :**
1. À $\theta$ fixé, **transformation continue** (multiplication par la constante $v(\theta)^{-1/2}$) : $G_n(Z_n;\theta)\Rightarrow\mathcal{N}(0,1)$.
2. La limite ne dépend pas de $\theta$ ; la définition est satisfaite pour tout borélien dont la frontière est de mesure nulle sous $\mathcal{N}(0,1)$, donc pour tout borélien, puisque $\mathcal{N}(0,1)$ ne charge aucun point et que la convergence des f.d.r. en tout point entraîne celle des probabilités des $]a,b]$, qui engendrent $\mathcal{B}(\mathbb{R})$ (argument du poly, **Portmanteau**).
**Méthodes mobilisées :** normalisation par l'écart-type asymptotique ; transformation continue.
**Pièges / erreurs classiques :** *(remarque d'extraction)* l'argument « pour tout borélien » du poly est rapide : la convergence en loi ne donne en général $\mathbb{P}_n(G_n\in A)\to L(A)$ que pour $A$ de frontière $L$-négligeable ; en pratique on n'utilise que des intervalles.

### Définition 1.8 — Région de confiance de niveau asymptotique $1-\alpha$
**Source :** Poly ch.6, Définition 1.8, p. 27
**Hypothèses :** Suite de modèles statistiques, $g:\Theta\to\mathbb{R}^p$, $\alpha\in\,]0,1[$, $\{\mathcal{C}_n(Z_n)\}\subset\mathcal{B}(\mathbb{R}^p)$ ensembles aléatoires.
**Énoncé :** $\{\mathcal{C}_n(Z_n)\}$ définit une suite de régions de confiance au niveau asymptotique $1-\alpha$ pour $g$ si
$$\inf_{\theta\in\Theta}\ \liminf_{n\to\infty}\ \mathbb{P}_{n,\theta}\big(g(\theta)\in \mathcal{C}_n(Z_n)\big)\ge1-\alpha.$$
**Preuve (étapes) :** — (définition)
**Intuition :** On passe d'abord à la limite en $n$ à $\theta$ fixé, **puis** on prend l'infimum sur $\Theta$.
**Pièges / erreurs classiques :** L'ordre $\inf_\theta\liminf_n$ (et non $\liminf_n\inf_\theta$) : aucune garantie uniforme. La définition **ne dit rien de la couverture pour un $n$ donné** — « c'est sa limite principale ».

### Méthode 1.1 — Intervalle de confiance asymptotique, cas où $\theta\mapsto v(\theta)$ est continue
**Source :** Poly ch.6, Méthode 1.1, p. 28
**Hypothèses :** $\sqrt n(\hat\theta_n-\theta)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,v(\theta))$, $v(\theta)>0$, $\theta\mapsto v(\theta)$ **continue** sur $\Theta$.
**Énoncé :**
- $G_n:(Z_n;\theta)\mapsto\sqrt n(\hat\theta_n-\theta)/\sqrt{v(\theta)}$ est asymptotiquement pivotale de loi $\mathcal{N}(0,1)$ (Ex. 1.10) ;
- la normalité asymptotique entraîne la consistance ; $v$ continue : **théorème de continuité** 1.1 donne $v(\hat\theta_n)\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}v(\theta)>0$ ; **Slutsky** fournit une seconde fonction asymptotiquement pivotale
$$\sqrt n\,\frac{\hat\theta_n-\theta}{\sqrt{v(\hat\theta_n)}}\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,1);$$
- d'où l'intervalle de confiance de niveau asymptotique $1-\alpha$
$$\mathcal{C}_{n,\alpha}(\hat\theta_n)=\Big[\hat\theta_n\pm z_{1-\alpha/2}\sqrt{\frac{v(\hat\theta_n)}n}\Big].$$
**Preuve (étapes) :** incluse dans l'énoncé (Ex. 1.10 ; normalité asymptotique $\Rightarrow$ consistance ; continuité ; Slutsky (iii) ; Portmanteau sur $[-z_{1-\alpha/2},z_{1-\alpha/2}]$).
**Intuition :** L'intérêt du second pivot : ses bornes sont **calculables**. Le premier fait intervenir $v(\theta)$ inconnu et ne se résout en $\theta$ que si $\lvert G_n\rvert\le z_{1-\alpha/2}$ s'inverse explicitement. Remplacer $v(\theta)$ par $v(\hat\theta_n)$ ne change pas la loi limite (Slutsky) mais change la couverture à $n$ fixé (seconde source d'erreur) — c'est exactement la différence Wald / Wilson.
**Pièges / erreurs classiques :** Il faut $v$ **continue** et $v(\theta)>0$. L'Exercice 1 (PC6) construit trois IC asymptotiques dont un qui n'utilise pas la continuité de $v$.

### Remarque (§1.10, p. 28) — Le modèle de Bernoulli : TCL et pivot (éq. (4)–(5))
**Source :** Poly ch.6, « Trois intervalles de confiance pour une proportion », p. 28
**Hypothèses :** Suite de $n$-échantillons de $\{\mathcal{B}\mathrm{er}(\theta):\theta\in\Theta:=\,]0,1[\}$, $\bar X_n:=n^{-1}\sum_{k=1}^nX_k$.
**Énoncé :** Par le **TCL** 1.6, pour tout $\theta\in\Theta$,
$$\sqrt n\big(\bar X_n-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,\theta(1-\theta)),\tag{4}$$
d'où la fonction asymptotiquement pivotale
$$G_n:(X_1,\dots,X_n;\theta)\mapsto\sqrt n\,\frac{\bar X_n-\theta}{\sqrt{\theta(1-\theta)}},\qquad G_n\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,1).\tag{5}$$
Trois façons de s'en servir donnent trois intervalles (Ex. 1.11–1.13).

### Exemple 1.11 — Intervalle de Wilson
**Source :** Poly ch.6, Exemple 1.11, p. 29
**Hypothèses :** Modèle de Bernoulli ci-dessus ; pivot (5) ; $\alpha\in\,]0,1[$.
**Énoncé :** La région de confiance de niveau asymptotique $1-\alpha$ associée au pivot (5) admet les trois écritures équivalentes
$$\begin{aligned}
&\Big\{\theta\in\Theta:\ -z_{1-\alpha/2}\le\sqrt n\,\frac{\bar X_n-\theta}{\sqrt{\theta(1-\theta)}}\le z_{1-\alpha/2}\Big\}\\
&=\Big\{\theta\in\Theta:\ n\big(\bar X_n-\theta\big)^2\le z_{1-\alpha/2}^2\,\theta(1-\theta)\Big\}\\
&=\Bigg[\bar X_n+\frac{z_{1-\alpha/2}^2}{2n}\pm z_{1-\alpha/2}\sqrt{\frac{\bar X_n(1-\bar X_n)}n+\frac{z_{1-\alpha/2}^2}{4n^2}}\Bigg]\Big(1+\frac{z_{1-\alpha/2}^2}n\Big)^{-1},
\end{aligned}$$
la dernière intersectée avec $\Theta$. C'est l'*intervalle de Wilson*.
**Preuve (étapes) :**
1. Première écriture : région associée au pivot.
2. Deuxième : **élévation au carré**, $\lvert u\rvert\le z\iff u^2\le z^2$ pour $z\ge0$.
3. Avec $z:=z_{1-\alpha/2}$, la condition s'écrit $(n+z^2)\theta^2-(2n\bar X_n+z^2)\theta+n\bar X_n^2\le0$ : **trinôme** en $\theta$ de coefficient dominant $>0$.
4. Discriminant : $(2n\bar X_n+z^2)^2-4(n+z^2)n\bar X_n^2=4nz^2\bar X_n(1-\bar X_n)+z^4\ge0$.
5. L'ensemble solution est le segment entre les deux racines : $\dfrac{\bar X_n+\frac{z^2}{2n}\pm z\sqrt{\frac{\bar X_n(1-\bar X_n)}n+\frac{z^2}{4n^2}}}{1+\frac{z^2}n}$ (division du numérateur et du dénominateur par $2n$).
**Méthodes mobilisées :** inversion directe du pivot ; résolution d'une inéquation du second degré.
**Intuition :** On n'estime pas la variance : on résout l'inégalité du pivot en $\theta$. Intervalle centré en $\big(\bar X_n+\frac{z^2}{2n}\big)/\big(1+\frac{z^2}n\big)$, légèrement tiré vers $1/2$.
**Pièges / erreurs classiques :** Ne pas oublier l'intersection avec $\Theta$. L'intervalle reste d'étendue $>0$ même si $\bar X_n\in\{0,1\}$ (terme $z^2/(4n^2)$).

### Exemple 1.12 — Intervalle de Wald
**Source :** Poly ch.6, Exemple 1.12, p. 29–30
**Hypothèses :** Modèle de Bernoulli ; pivot (5).
**Énoncé :** Slutsky appliqué à (5) fournit une seconde fonction asymptotiquement pivotale
$$\tilde G_n:(X_1,\dots,X_n;\theta)\mapsto\frac{\sqrt n\big(\bar X_n-\theta\big)}{\sqrt{\bar X_n(1-\bar X_n)}},\qquad\tilde G_n\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,1),$$
et les régions de confiance de niveau asymptotique $1-\alpha$ qui en découlent sont les intervalles
$$\bar X_n\pm z_{1-\alpha/2}\frac{\sqrt{\bar X_n(1-\bar X_n)}}{\sqrt n}.$$
C'est l'*intervalle de Wald*.
**Preuve (étapes) :**
1. $\theta\mapsto\sqrt{\theta(1-\theta)}$ continue et $>0$ sur $]0,1[$ ; $\bar X_n\to\theta$ en probabilité (**LGN** 1.2) ; **continuité** 1.1 : $W_n:=\sqrt{\bar X_n(1-\bar X_n)}\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\sqrt{\theta(1-\theta)}>0$, en particulier $\mathbb{P}_{n,\theta}(W_n=0)\to0$.
2. $W_n$ peut s'annuler : convention $\tilde G_n:=0$ si $\bar X_n\in\{0,1\}$ ; poser $Y_n:=W_n$ sur $\{W_n>0\}$, $Y_n:=1$ ailleurs, de sorte que $\mathbb{P}_{n,\theta}(Y_n\ne0)=1$ et $Y_n\to\sqrt{\theta(1-\theta)}$ en probabilité.
3. **Slutsky (iii)** : $\sqrt n(\bar X_n-\theta)/Y_n\Rightarrow\mathcal{N}(0,1)$.
4. $\tilde G_n$ coïncide avec cette variable hors d'un événement de probabilité $\to0$ : leur différence $\to0$ en probabilité ; **Remarque 2** après Slutsky : même loi limite.
5. $\lvert\tilde G_n\rvert\le z_{1-\alpha/2}$ se résout immédiatement en $\theta$.
**Méthodes mobilisées :** LGN + continuité + Slutsky (estimation de la variance asymptotique, « plug-in ») ; traitement de l'événement où le dénominateur s'annule.
**Intuition :** C'est la Méthode 1.1 avec $v(\theta)=\theta(1-\theta)$.
**Pièges / erreurs classiques :** **Dégénéré** si $\bar X_n=0$ (ou 1) : intervalle réduit à $\{0\}$ qui ne contient pas $\theta$. Pour $\theta=0{,}025$, $n=100$ : $\mathbb{P}(\bar X_n=0)=(1-\theta)^{100}\approx0{,}08$ (Figures 3–4 ; Compléments §4.4).

### Exemple 1.13 — Stabilisation de la variance
**Source :** Poly ch.6, Exemple 1.13, p. 30
**Hypothèses :** Modèle de Bernoulli ; $g$ dérivable sur $\Theta$ avec $g'(\theta)\ne0$ pour tout $\theta$.
**Énoncé :**
1. **Méthode-δ** appliquée à (4) : $\sqrt n\big(g(\bar X_n)-g(\theta)\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}\big(0,[g'(\theta)]^2\theta(1-\theta)\big)$.
2. Si $[g'(\theta)]^2\theta(1-\theta)=k^2$ ($k>0$ constante, pour tout $\theta$), la variance asymptotique ne dépend plus de $\theta$ et $\big[g(\bar X_n)-z_{1-\alpha/2}\frac k{\sqrt n},\ g(\bar X_n)+z_{1-\alpha/2}\frac k{\sqrt n}\big]$ est un IC de niveau asymptotique $1-\alpha$ pour $g(\theta)$.
3. Avec $k=1/2$ : $g'(\theta)=\frac{1/2}{\sqrt{\theta(1-\theta)}}$, soit $g(\theta)=\arcsin(\sqrt\theta)$, et
$$\sqrt n\Big(\arcsin\sqrt{\bar X_n}-\arcsin\sqrt\theta\Big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}(0,1/4).$$
4. $g$ croissante, de réciproque $u\mapsto\sin^2u$ sur $[0,\pi/2]$ : IC de niveau asymptotique $1-\alpha$ pour $\theta$
$$\Big[\sin^2\Big(\arcsin\sqrt{\bar X_n}-\frac{z_{1-\alpha/2}}{2\sqrt n}\Big),\ \sin^2\Big(\arcsin\sqrt{\bar X_n}+\frac{z_{1-\alpha/2}}{2\sqrt n}\Big)\Big],$$
les arguments du sinus étant au préalable ramenés à $[0,\pi/2]$.
**Preuve (étapes) :** méthode-δ (étape 1) ; résolution de l'équation différentielle $g'(\theta)=k/\sqrt{\theta(1-\theta)}$ (étape 3 ; on vérifie $\frac{\mathrm{d}}{\mathrm{d}\theta}\arcsin\sqrt\theta=\frac1{2\sqrt\theta\sqrt{1-\theta}}$) ; inversion par monotonie (étape 4).
**Méthodes mobilisées :** méthode-δ ; stabilisation de la variance ; inversion d'une bijection croissante.
**Intuition :** Évite d'estimer la variance asymptotique (pas de seconde source d'erreur).
**Pièges / erreurs classiques :** Demande de résoudre une équation différentielle : **possible seulement en dimension un**. Second exemple : Exercice 1 (modèle exponentiel, $g=\ln$). Ramener les arguments à $[0,\pi/2]$ avant d'appliquer $\sin^2$.

### Remarque (§1.10, p. 30–31) — Figures 3 et 4 : Wald contre Wilson
**Source :** Poly ch.6, p. 30–31 (commentées dans Compléments §4.4)
**Énoncé :** Cinquante IC de Wald et de Wilson de niveau $0{,}95$, $n=100$ : pour $\theta=0{,}25$ (Figure 4) les deux intervalles sont pratiquement confondus ; pour $\theta=0{,}025$ (Figure 3) l'intervalle de Wald est dégénéré dès que $\bar X_n=0$, ce qui arrive avec une probabilité non négligeable.

### Proposition 1.3 — Comparaison par la variance asymptotique
**Source :** Poly ch.6, Proposition 1.3, p. 32
**Hypothèses :** $\hat\theta_{n,1}$, $\hat\theta_{n,2}$ deux suites d'estimateurs de $\theta$, asymptotiquement normales de variances asymptotiques $v_1$, $v_2$ **continues et strictement positives** sur $\Theta$, avec $v_1(\theta)<v_2(\theta)$ pour tout $\theta\in\Theta$.
**Énoncé :** Pour $i=1,2$, $\mathcal{C}_{n,\alpha}(\hat\theta_{n,i}):=\Big[\hat\theta_{n,i}\pm z_{1-\alpha/2}\sqrt{\frac{v_i(\hat\theta_{n,i})}n}\Big]$ sont des IC de niveau asymptotique $1-\alpha$ pour $\theta$, et pour tout $\theta\in\Theta$
$$\frac{\lvert \mathcal{C}_{n,\alpha}(\hat\theta_{n,1})\rvert}{\lvert \mathcal{C}_{n,\alpha}(\hat\theta_{n,2})\rvert}\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\sqrt{\frac{v_1(\theta)}{v_2(\theta)}}<1$$
(rapport des longueurs). On dit que la précision de $\hat\theta_{n,1}$ est *asymptotiquement meilleure* que celle de $\hat\theta_{n,2}$.
**Preuve (étapes) :**
1. Premier point : **Méthode 1.1**.
2. Longueur de $\mathcal{C}_{n,\alpha}(\hat\theta_{n,i})$ : $2z_{1-\alpha/2}\sqrt{v_i(\hat\theta_{n,i})/n}$ ; rapport $=\sqrt{v_1(\hat\theta_{n,1})/v_2(\hat\theta_{n,2})}$.
3. Chaque suite est consistante (normalité asymptotique) et $v_i$ continue, $>0$ : **continuité** 1.1 : $v_i(\hat\theta_{n,i})\to v_i(\theta)>0$ en probabilité.
4. **Continuité** appliquée au couple (Prop. 2.1) et à $(u_1,u_2)\mapsto\sqrt{u_1/u_2}$, continue en $(v_1(\theta),v_2(\theta))$.
**Intuition :** À niveau asymptotique fixé, l'estimateur de plus petite variance asymptotique donne, pour $n$ grand, un intervalle plus court d'un facteur $\sqrt{v_1/v_2}$ ; atteindre une précision donnée demande $v_1(\theta)/v_2(\theta)$ fois moins d'observations.
**Pièges / erreurs classiques :** Critère **ponctuel en $\theta$** et **limite** : l'estimateur de Hodges (Exercice 6, Compléments §4.5) a une variance asymptotique partout au moins aussi bonne que l'EMV, strictement meilleure en un point, mais un mauvais comportement à $n$ fixé. Notation du poly (vérifiée sur le PDF) : la longueur d'un intervalle est notée entre barres verticales, $\lvert\mathcal{C}\rvert$.

### Remarque (§1.12, p. 32) — Rappel : fonction puissance
**Source :** Poly ch.6, §1.12, p. 32
**Énoncé :** Rappel du chapitre 4 : la fonction puissance d'un test de fonction critique $\phi\in\{0,1\}$ est $\theta\mapsto\beta_\phi(\theta):=\mathbb{P}_\theta(\phi=1)$. Lorsque la loi de la statistique de test n'est pas explicite, on ne sait pas calculer $\beta_{\phi_n}$ à $n$ fixé : taille et niveau sont remplacés par leurs versions asymptotiques.

### Définition 1.9 — Taille asymptotique
**Source :** Poly ch.6, Définition 1.9, p. 33
**Hypothèses :** Test $H_0:\theta\in\Theta_0$ contre $H_1:\theta\in\Theta_1$ ; suite de tests $\{\phi_n\}$.
**Énoncé :** La *taille asymptotique* de $\{\phi_n\}$ est $\displaystyle\sup_{\theta\in\Theta_0}\limsup_{n\to\infty}\beta_{\phi_n}(\theta)$.

### Définition 1.10 — Niveau asymptotique
**Source :** Poly ch.6, Définition 1.10, p. 33
**Énoncé :** $\{\phi_n,n\in\mathbb{N}^*\}$ est *de niveau asymptotique* $\alpha$ si
$$\forall\theta\in\Theta_0,\qquad\limsup_{n\to\infty}\beta_{\phi_n}(\theta)\le\alpha,$$
c'est-à-dire si sa taille asymptotique est $\le\alpha$.
**Pièges / erreurs classiques :** Encore une fois : limite **à $\theta$ fixé** puis sup ; rien d'uniforme, rien à $n$ fixé.

### Définition 1.11 — Suite de tests consistante
**Source :** Poly ch.6, Définition 1.11, p. 33
**Énoncé :** $\{\phi_n\}$ est *consistante* si
$$\text{pour tout }\theta\in\Theta_1,\qquad\liminf_{n\to\infty}\beta_{\phi_n}(\theta)=1.$$
**Intuition (p. 33) :** Niveau asymptotique et consistance se partagent les deux hypothèses comme niveau et puissance au chapitre 4 : sur $H_0$ on borne la probabilité de rejeter à tort ; sur $H_1$ la probabilité de rejeter tend vers 1. Une suite consistante de niveau asymptotique $\alpha$ finit par distinguer toute valeur de l'alternative — sans dire **à quel $n$**. Deux suites peuvent être consistantes et de même niveau asymptotique et se comporter très différemment au $n$ dont on dispose (Exercice 3 ; comparaison au chapitre suivant).
**Pièges / erreurs classiques :** Consistance ≠ « bonne puissance à $n$ fixé ».

### Exemple 1.14 — Test de Student asymptotique
**Source :** Poly ch.6, Exemple 1.14, p. 33–34
**Hypothèses :** $n$-échantillons de $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathbb{Q}_\theta:\theta=(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*\})$, chaque $\mathbb{Q}_\theta$ **de carré intégrable**, d'espérance $\mu:=\int x\,\mathbb{Q}_\theta(\mathrm{d}x)$ et de variance $\sigma^2:=\int x^2\mathbb{Q}_\theta(\mathrm{d}x)-\mu^2>0$ (**pas d'hypothèse gaussienne**) ; $\mu_0\in\mathbb{R}$.
**Énoncé :** Pour tester $H_0:\mu=\mu_0$ contre $H_1:\mu\ne\mu_0$, statistique
$$T_n:=\sqrt n\,\frac{\bar X_n-\mu_0}{S_n},\qquad\bar X_n:=\frac1n\sum_{i=1}^nX_i,\qquad S_n^2:=\frac1{n-1}\sum_{i=1}^n\big(X_i-\bar X_n\big)^2,$$
région de rejet $R_{n,\alpha}:=\{(x_1,\dots,x_n)\in\mathbb{R}^n:\lvert T_n\rvert>z_{1-\alpha/2}\}$. Cette suite de tests est **de taille asymptotique $\alpha$** et **consistante**.
**Preuve (étapes) :**
1. *Loi limite sous $H_0$.* $\theta=(\mu_0,\sigma^2)$. **TCL** : $\frac{\sqrt n}\sigma(\bar X_n-\mu_0)\Rightarrow\mathcal{N}(0,1)$ ; **Prop. 1.2** : $\sigma^{-2}S_n^2\to1$, donc $\sigma^{-1}S_n\to1$ en probabilité (**continuité** avec $u\mapsto\sqrt u$) ; **Slutsky (iii)** au quotient : $T_n=\frac{\sqrt n(\bar X_n-\mu_0)/\sigma}{S_n/\sigma}\Rightarrow\mathcal{N}(0,1)$.
2. *Taille asymptotique.* $\mathcal{N}(0,1)$ ne charge pas $\pm z_{1-\alpha/2}$ ; **Portmanteau** : $\beta_{\phi_n}(\theta)=\mathbb{P}_{n,\theta}(\lvert T_n\rvert>z_{1-\alpha/2})\to\mathbb{P}(\lvert U\rvert>z_{1-\alpha/2})=\alpha$, $U\sim\mathcal{N}(0,1)$ (définition du quantile + **symétrie**). Taille asymptotique $=\alpha$.
3. *Consistance.* $\theta=(\mu,\sigma^2)$, $\mu\ne\mu_0$. Décomposition $T_n=\frac{\sqrt n(\bar X_n-\mu)}{S_n}+\frac{\sqrt n(\mu-\mu_0)}{S_n}$ ; région d'acceptation : $-z_{1-\alpha/2}-\frac{\sqrt n(\mu-\mu_0)}{S_n}\le\frac{\sqrt n(\bar X_n-\mu)}{S_n}\le z_{1-\alpha/2}-\frac{\sqrt n(\mu-\mu_0)}{S_n}$.
4. Cas $\mu-\mu_0>0$ : $S_n\to\sigma>0$ en probabilité et $\sqrt n(\mu-\mu_0)\to+\infty$, donc pour tout $M>0$, $\lim_n\mathbb{P}_{n,\theta}\big(\frac{\sqrt n(\mu-\mu_0)}{S_n}\ge M\big)=1$.
5. Pour tout $M>0$ : $\limsup_n\mathbb{P}_{n,\theta}(\lvert T_n\rvert\le z_{1-\alpha/2})\le\limsup_n\mathbb{P}_{n,\theta}\big(\frac{\sqrt n(\bar X_n-\mu)}{S_n}\le z_{1-\alpha/2}-M\big)=\mathbb{P}(U\le z_{1-\alpha/2}-M)$ (en utilisant $\sqrt n(\bar X_n-\mu)/S_n\Rightarrow\mathcal{N}(0,1)$ comme au point 1, **Portmanteau**).
6. Faire $M\to+\infty$ : $\lim_n\mathbb{P}_{n,\theta}(\lvert T_n\rvert\le z_{1-\alpha/2})=0$, soit $\lim_n\beta_{\phi_n}(\theta)=1$. Cas $\mu-\mu_0<0$ : même raisonnement en minorant $-\sqrt n(\mu-\mu_0)/S_n$.
**Méthodes mobilisées :** TCL ; consistance de $S_n^2$ ; continuité ; Slutsky (quotient) ; Portmanteau ; seuil auxiliaire $M$ et double passage à la limite.
**Intuition :** Le test de Student du chapitre 1 supposait des observations gaussiennes (loi exacte de Student) ; sans cette hypothèse la loi exacte est inconnue, mais la loi limite $\mathcal{N}(0,1)$ est la même pour **toutes** les lois de carré intégrable.
**Pièges / erreurs classiques :** La consistance **ne s'obtient pas en remplaçant $T_n$ par sa loi limite** : sous $H_1$ la loi de $T_n$ se déplace vers l'infini (terme $\sqrt n(\mu-\mu_0)/S_n$). D'où le seuil $M$ et les deux passages à la limite, d'abord en $n$ puis en $M$ : les bornes de la région d'acceptation bougent avec $n$ en même temps que la loi ; oublier l'un des deux mouvements rend le raisonnement faux. Même soin à l'Exercice 3.

### Remarque (§1.13, p. 35) — Le programme des exercices
**Source :** Poly ch.6, §1.13, p. 35
**Énoncé :** La feuille comporte sept exercices (repris en section 4) :
- **Ex. 1** : modèle exponentiel, estimateurs des moments pour $T_1(x)=x$ et $T_2(x)=x^2$ ; consistance, normalité asymptotique, comparaison par variances asymptotiques (§1.11) ; trois IC asymptotiques (Slutsky ; stabilisation de la variance, Ex. 1.13 ; résolution directe de l'inégalité du pivot sans utiliser la continuité de $v$).
- **Ex. 2** : Pareto translaté, non régulier : EMV du paramètre de translation d'erreur d'ordre $1/n$ et de loi limite exponentielle (comme Ex. 1.5).
- **Ex. 3** : deux suites de tests consistantes et de même niveau asymptotique pour le même jeu d'hypothèses (fréquence de signes ; Student, Ex. 1.14).
- **Ex. 4** : Poisson, chaîne complète : LGN, TCL, méthode-δ pour $\theta\mapsto e^{-\theta}$, IC asymptotique.
- **Ex. 5** : LGN faible appliquée au calcul de la limite d'une série.
- **Ex. 6** : estimateur de Hodges (Compléments §4.5).
- **Ex. 7** : existence d'une suite consistante de racines des équations de vraisemblance, modèle de mélange.

---

## 3. Outils mathématiques

> Section « 2 Les outils mathématiques » du poly (p. 36–41) : modes de convergence et leurs liens, inégalités de Markov / Bienaymé-Tchebychev, lemme de Bienaymé, deux lemmes pour la preuve du TCL, procédé de Cramér-Wold, différentiabilité, liste des résultats admis. Sur un espace fixe, les objets sont définis sur $(\Omega,\mathcal{F},\mathbb{P})$.

### Définition 2.1 — Convergence en probabilité
**Source :** Poly ch.6, Outils, Définition 2.1, p. 36
**Hypothèses :** $\{X_n\}$ et $X$ vecteurs aléatoires à valeurs dans $\mathbb{R}^d$, **définis sur un même espace** $(\Omega,\mathcal{F},\mathbb{P})$.
**Énoncé :** $X_n\xrightarrow{\mathbb{P}\text{-prob}}X$ si pour tout $\varepsilon>0$, $\lim_{n\to\infty}\mathbb{P}(\|X_n-X\|>\varepsilon)=0$.
**Preuve (étapes) :** — (définition)
**Intuition :** La Déf. 1.2 (consistance) est cette définition, écrite pour une limite constante $g(\theta)$ sous $\mathbb{P}_{n,\theta}$ ; une limite constante permet de travailler sur des espaces qui changent avec $n$.
**Pièges / erreurs classiques :** La convergence en loi (Déf. 1.4), elle, ne demande pas que les variables soient sur un même espace.

### Proposition 2.1 — Convergence d'un vecteur et de ses coordonnées
**Source :** Poly ch.6, Outils, Proposition 2.1, p. 36
**Hypothèses :** $\{X_n\}$, $\{Y_n\}$ à valeurs dans $\mathbb{R}^d$, $\mathbb{R}^p$ ; $X$, $Y$ ; tous sur le même espace.
**Énoncé :** $(X_n,Y_n)\xrightarrow{\mathbb{P}\text{-prob}}(X,Y)$ si et seulement si $X_n\xrightarrow{\mathbb{P}\text{-prob}}X$ et $Y_n\xrightarrow{\mathbb{P}\text{-prob}}Y$.
**Preuve (étapes) :** conséquence directe des inégalités $\|x_1-x_2\|\le\|(x_1,y_1)-(x_2,y_2)\|\le\|x_1-x_2\|+\|y_1-y_2\|$ (puis inclusions d'événements / sous-additivité).
**Intuition :** En probabilité, couple $\iff$ composantes.
**Pièges / erreurs classiques :** **Faux pour la convergence en loi** : si $X_n\sim\mathcal{N}(0,1)$ et $Y_n:=(-1)^nX_n$, chaque composante converge en loi vers $\mathcal{N}(0,1)$, mais pas le couple, car $\mathbb{E}[f(X_n+Y_n)]$ vaut alternativement $\mathbb{E}[f(2X_n)]$ et $f(0)$. C'est pourquoi la preuve de Slutsky établit la convergence en loi **du couple**.

### Théorème 2.1 — Théorème de continuité, convergence en probabilité
**Source :** Poly ch.6, Outils, Théorème 2.1, p. 36–37
**Hypothèses :** $\{X_n\}$, $X$ à valeurs dans $\mathbb{R}^d$ sur $(\Omega,\mathcal{F},\mathbb{P})$ ; $\varphi:\mathbb{R}^d\to\mathbb{R}^m$ continue en tout point d'un ensemble $C$ avec $\mathbb{P}(X\in C)=1$ ; $X_n\xrightarrow{\mathbb{P}\text{-prob}}X$.
**Énoncé :** $\varphi(X_n)\xrightarrow{\mathbb{P}\text{-prob}}\varphi(X)$. En particulier, si $X_n\xrightarrow{\mathbb{P}\text{-prob}}c$ (constante) et $\varphi$ continue en $c$, alors $\varphi(X_n)\xrightarrow{\mathbb{P}\text{-prob}}\varphi(c)$.
**Preuve (étapes) :**
1. Soit $\varepsilon>0$. Pour $\delta>0$, $B_\delta$ := ensemble des $x$ pour lesquels il existe $y$ avec $\|x-y\|\le\delta$ et $\|\varphi(x)-\varphi(y)\|\ge\varepsilon$. Si $x\notin B_\delta$ et $\|\varphi(x_n)-\varphi(x)\|\ge\varepsilon$, alors $\|x_n-x\|>\delta$.
2. D'où $\mathbb{P}(\|\varphi(X_n)-\varphi(X)\|\ge\varepsilon)\le\mathbb{P}(X\in B_\delta)+\mathbb{P}(\|X_n-X\|>\delta)$ (**sous-additivité**).
3. Le second terme $\to0$ (convergence en probabilité).
4. $\mathbb{P}(X\in B_\delta\cap C^c)=0$ ; $(B_\delta)_\delta$ décroissante en $\delta$ et $\varphi$ continue sur $C$ : $\lim_{\delta\to0}\mathbb{P}(X\in B_\delta\cap C)=0$ (**continuité monotone** de la probabilité ; $\bigcap_\delta B_\delta\cap C=\emptyset$).
5. Cas constant : $X=c$, $C=\{c\}$.
**Intuition :** Version « vecteurs aléatoires » du Th. 1.1, utilisée dans toutes les preuves (méthode-δ, Prop. 1.2…).

### Théorème 2.2 — Convergence en probabilité et convergence en loi
**Source :** Poly ch.6, Outils, Théorème 2.2, p. 37
**Hypothèses :** $\{X_n\}$, $X$ sur $(\Omega,\mathcal{F},\mathbb{P})$ à valeurs dans $\mathbb{R}^d$.
**Énoncé :**
- (i) $X_n\xrightarrow{\mathbb{P}\text{-prob}}X$ entraîne $X_n\Longrightarrow X$ ;
- (ii) si $c$ est une constante, $X_n\xrightarrow{\mathbb{P}\text{-prob}}c$ si et seulement si $X_n\Longrightarrow c$.
**Preuve (étapes) :**
1. (i) Soit $f$ lipschitzienne bornée de constante $L_f$ ; pour $\varepsilon>0$, $\lvert\mathbb{E}[f(X_n)]-\mathbb{E}[f(X)]\rvert\le\varepsilon L_f+2\|f\|_\infty\mathbb{P}(\|X_n-X\|\ge\varepsilon)$ (séparation selon $\|X_n-X\|<\varepsilon$ ou $\ge\varepsilon$). Second terme $\to0$, premier arbitrairement petit ; **Portmanteau** (ii) conclut.
2. (ii) Sens direct : (i). Réciproque : **première remarque** suivant le lemme de Slutsky.
**Intuition :** Hiérarchie : p.s. $\Rightarrow$ proba $\Rightarrow$ loi ; et loi vers une constante $\Rightarrow$ proba.
**Pièges / erreurs classiques :** La convergence **presque sûre** ($\mathbb{P}(\lim_nX_n=X)=1$) entraîne la convergence en probabilité donc en loi ; elle **n'intervient pas** dans ce chapitre (espaces qui changent avec $n$) ; elle apparaît dans la loi forte (Compléments §4.2).

### Proposition 2.2 — Convergence des moments et convergence en probabilité
**Source :** Poly ch.6, Outils, Proposition 2.2, p. 37
**Hypothèses :** $\{X_n\}$, $X$ sur $(\Omega,\mathcal{F},\mathbb{P})$ ; il existe $p>0$ tel que $\lim_n\mathbb{E}[\|X_n-X\|^p]=0$.
**Énoncé :** $X_n\xrightarrow{\mathbb{P}\text{-prob}}X$.
**Preuve (étapes) :** **Inégalité de Markov** appliquée à $\|X_n-X\|^p$ : $\mathbb{P}(\|X_n-X\|>\varepsilon)\le\mathbb{E}[\|X_n-X\|^p]/\varepsilon^p\to0$.
**Intuition :** Convergence $L^p$ $\Rightarrow$ convergence en probabilité (cas $p=2$ : consistance via EQM $\to0$, cf. PC6 Ex. 2 Q7).

### Lemme 2.1 — Inégalités de Markov et de Bienaymé-Tchebychev
**Source :** Poly ch.6, Outils, Lemme 2.1, p. 38
**Hypothèses :** $Y$ v.a.r. **positive** sur $(\Omega,\mathcal{F},\mathbb{P})$ ; $a>0$. Pour la seconde : $W$ v.a.r. de carré intégrable, $\varepsilon>0$.
**Énoncé :**
$$\mathbb{P}(Y\ge a)\le\frac{\mathbb{E}[Y]}a,\qquad\mathbb{P}(\lvert W-\mathbb{E}[W]\rvert\ge\varepsilon)\le\frac{\mathrm{Var}(W)}{\varepsilon^2}.$$
**Preuve (étapes) :**
1. $a\mathbb{1}_{\{Y\ge a\}}\le Y$ et **croissance de l'espérance**.
2. Appliquer à $Y:=(W-\mathbb{E}[W])^2$, $a:=\varepsilon^2$.

### Définition 2.2 — Variables décorrélées
**Source :** Poly ch.6, Outils, Définition 2.2, p. 38
**Hypothèses :** $X_1,\dots,X_n$ v.a.r. de carré intégrable sur $(\Omega,\mathcal{F},\mathbb{P})$.
**Énoncé :** Elles sont *décorrélées* si pour tout $1\le k\ne\ell\le n$, $\mathrm{Cov}(X_k,X_\ell):=\mathbb{E}[(X_k-\mathbb{E}[X_k])(X_\ell-\mathbb{E}[X_\ell])]=0$.
**Pièges / erreurs classiques :** Indépendantes et de carré intégrable $\Rightarrow$ décorrélées ; **la réciproque est fausse**.

### Lemme 2.2 — Lemme de Bienaymé
**Source :** Poly ch.6, Outils, Lemme 2.2, p. 38
**Hypothèses :** $X_1,\dots,X_n$ v.a.r. de carré intégrable et décorrélées.
**Énoncé :** $\mathrm{Var}\big(\sum_{k=1}^nX_k\big)=\sum_{k=1}^n\mathrm{Var}(X_k)$.
**Preuve (étapes) :** En développant le carré, $\mathrm{Var}(\sum_kX_k)=\sum_k\mathbb{E}[(X_k-\mathbb{E}[X_k])^2]+\sum_{1\le k\ne\ell\le n}\mathbb{E}[(X_k-\mathbb{E}[X_k])(X_\ell-\mathbb{E}[X_\ell])]$ ; la seconde somme est nulle **par décorrélation**.

### Lemme 2.3 — Développement d'une fonction caractéristique à l'ordre deux
**Source :** Poly ch.6, Outils, Lemme 2.3, p. 38–39
**Hypothèses :** $Y$ v.a.r. **de carré intégrable**, $\psi:u\mapsto\mathbb{E}[e^{\mathrm{i}uY}]$.
**Énoncé :** $\psi$ est deux fois dérivable sur $\mathbb{R}$, avec
$$\psi'(u)=\mathrm{i}\,\mathbb{E}\big[Ye^{\mathrm{i}uY}\big],\qquad\psi''(u)=-\mathbb{E}\big[Y^2e^{\mathrm{i}uY}\big],$$
$\psi''$ continue, et $\psi(u)=1+\mathrm{i}u\,\mathbb{E}[Y]-\frac{u^2}2\mathbb{E}[Y^2]+o(u^2)$ quand $u\to0$.
**Preuve (étapes) :**
1. Taux d'accroissement : $\frac{\psi(u+h)-\psi(u)}h=\mathbb{E}\big[e^{\mathrm{i}uY}\frac{e^{\mathrm{i}hY}-1}h\big]$ et $\big\lvert\frac{e^{\mathrm{i}hY}-1}h\big\rvert\le\lvert Y\rvert$ (car $\lvert e^{\mathrm{i}v}-1\rvert\le\lvert v\rvert$).
2. $Y$ intégrable : **convergence dominée** $\Rightarrow$ $\psi'(u)=\mathrm{i}\mathbb{E}[Ye^{\mathrm{i}uY}]$.
3. Même argument pour $u\mapsto\mathbb{E}[Ye^{\mathrm{i}uY}]$ avec la domination $\lvert Y\rvert\cdot\lvert Y\rvert=Y^2$ intégrable : $\psi''(u)=-\mathbb{E}[Y^2e^{\mathrm{i}uY}]$ ; continuité de $\psi''$ par **convergence dominée** (même domination).
4. **Taylor-Young** en 0 : $\psi(u)=\psi(0)+u\psi'(0)+\frac{u^2}2\psi''(0)+o(u^2)$, avec $\psi(0)=1$, $\psi'(0)=\mathrm{i}\mathbb{E}[Y]$, $\psi''(0)=-\mathbb{E}[Y^2]$.

### Lemme 2.4 — Puissances $n$-ièmes
**Source :** Poly ch.6, Outils, Lemme 2.4, p. 39
**Hypothèses :** $\{a_n\}$ suite de complexes avec $na_n\to c\in\mathbb{C}$.
**Énoncé :** $(1+a_n)^n\to e^c$.
**Preuve (étapes) :**
1. $na_n\to c$ $\Rightarrow$ $a_n\to0$, donc $\lvert a_n\rvert\le1/2$ pour $n$ grand.
2. Sur $\{\lvert z\rvert\le1/2\}$, le logarithme complexe principal vérifie $\mathrm{Log}(1+z)=z+r(z)$ avec $\lvert r(z)\rvert\le\lvert z\rvert^2$.
3. $n\,\mathrm{Log}(1+a_n)=na_n+nr(a_n)$, $\lvert nr(a_n)\rvert\le n\lvert a_n\rvert^2=(n\lvert a_n\rvert)^2/n\to0$ (car $n\lvert a_n\rvert\to\lvert c\rvert$).
4. Donc $n\,\mathrm{Log}(1+a_n)\to c$ et, par **continuité de l'exponentielle**, $(1+a_n)^n=\exp(n\,\mathrm{Log}(1+a_n))\to e^c$.
**Intuition :** Dans la preuve du TCL : $a_n:=\psi(t/\sqrt n)-1=-t^2/(2n)+o(n^{-1})$, $na_n\to-t^2/2$.
**Pièges / erreurs classiques :** Le reste $o(n^{-1})$ est **complexe** : on ne peut pas se contenter du logarithme réel.

### Théorème 2.3 — Procédé de Cramér-Wold
**Source :** Poly ch.6, Outils, Théorème 2.3, p. 39–40
**Hypothèses :** $\{(\mathsf{Y}_n,\mathcal{Y}_n,\mathbb{P}_n)\}$, $Y_n$ et $Y$ à valeurs dans $\mathbb{R}^d$.
**Énoncé :** $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}Y$ si et seulement si $t^\top Y_n\overset{\mathbb{P}_n}{\Longrightarrow}t^\top Y$ pour tout $t\in\mathbb{R}^d$.
**Preuve (étapes) :**
1. La fonction caractéristique de $Y$ en $t$ est celle de la v.a.r. $t^\top Y$ en $1$.
2. ($\Rightarrow$) Pour tous $t\in\mathbb{R}^d$, $u\in\mathbb{R}$ : $\mathbb{E}_n[e^{\mathrm{i}ut^\top Y_n}]\to\mathbb{E}[e^{\mathrm{i}ut^\top Y}]$ ; **Lévy en dimension 1** : $t^\top Y_n\Rightarrow t^\top Y$.
3. ($\Leftarrow$) Avec $u=1$ : $\mathbb{E}_n[e^{\mathrm{i}t^\top Y_n}]\to\mathbb{E}[e^{\mathrm{i}t^\top Y}]$ pour tout $t$ ; **Lévy en dimension $d$**.
**Intuition :** Ramène un énoncé vectoriel au cas réel. Pour le TCL : il suffit que $t^\top\sqrt n(\bar X_n-\mu)\Rightarrow\mathcal{N}(0,t^\top\Sigma t)$ pour tout $t$, i.e. le TCL scalaire pour les v.a.r. $t^\top X_k$ (variance $t^\top\Sigma t$). Seul le cas $t^\top\Sigma t=0$ est à part : la variable est nulle p.s., de limite $\delta_0=\mathcal{N}(0,0)$.

### Définition 2.3 — Matrice jacobienne
**Source :** Poly ch.6, Outils, Définition 2.3, p. 40
**Hypothèses :** $g$ d'un ouvert de $\mathbb{R}^p$ dans $\mathbb{R}^m$, de composantes $g_1,\dots,g_m$ : $g:(y_1,\dots,y_p)^\top\mapsto(g_1(y_1,\dots,y_p),\dots,g_m(y_1,\dots,y_p))^\top$.
**Énoncé :** Si les dérivées partielles existent en $y$, la *matrice jacobienne* ($m$ lignes, $p$ colonnes) est
$$J_g(y)=\begin{pmatrix}\dfrac{\partial g_1}{\partial y_1}&\cdots&\dfrac{\partial g_1}{\partial y_p}\\\vdots&\ddots&\vdots\\\dfrac{\partial g_m}{\partial y_1}&\cdots&\dfrac{\partial g_m}{\partial y_p}\end{pmatrix}.$$

### Définition 2.4 — Fonction différentiable
**Source :** Poly ch.6, Outils, Définition 2.4, p. 40
**Énoncé :** $g:\mathbb{R}^p\to\mathbb{R}^m$ est *différentiable* au point $y$ si $g(y+h)=g(y)+J_g(y)h+\varepsilon(h)$ avec $\|\varepsilon(h)\|=o(\|h\|)$.
**Pièges / erreurs classiques :** Dérivées partielles **continues** $\Rightarrow$ différentiable ; la réciproque est fausse (et l'existence seule des dérivées partielles ne suffit pas). Pour $p=m=1$ : différentiabilité en $\theta$ = dérivabilité, $J_g$ se réduit à $\dot g(\theta)$.

### Remarque (Outils §2.6, p. 40–41) — Les résultats admis
**Source :** Poly ch.6, Outils, §2.6, p. 40–41
**Énoncé :** Résultats utilisés sans démonstration (références au polycopié d'origine) :
- Théorème de Portmanteau 1.3 (IV-5.26) ;
- Théorème de Lévy 1.5, **sens réciproque** (IV-5.36) ;
- Théorème de transformation continue 1.4 quand $\varphi$ n'est continue que sur un ensemble de mesure 1 (IV-5.30) — le cas $\varphi$ continue partout est démontré ;
- Construction du produit infini (Prop. 1.1), via Carathéodory ;
- plus : LGN faible i.i.d. seulement intégrable et loi forte (Compléments §4.2), théorème de Berry-Esseen (§4.3).

---

## 4. Exercices du poly

> **Source :** feuille d'exercices de la semaine 6 = **PC6** (Énoncé PC6, p. 1–6 ; Corrigé PC6, p. 7–27). Difficulté indiquée par le poly : (*) facile, (**) moyen, (***) difficile. Notation des corrigés : $\mathbb{P}_{n,\theta}:=(p_\theta\cdot\mathrm{Leb})^{\otimes n}$, $z_{1-\alpha/2}$ quantile de $\mathcal{N}(0,1)$ (noté $t_{1-\rho/2}$ dans l'Ex. 2), $\mathrm{N}(0,1)$ parfois écrit en romain.

### Exercice 1 (*) — Intervalles de confiance asymptotiques pour la loi exponentielle
**Énoncé (Énoncé PC6, p. 1) :** Suite de $n$-échantillons du modèle $(\mathbb{R}_\star^+,\mathcal{B}(\mathbb{R}_\star^+),\{p_\theta\cdot\mathrm{Leb},\theta\in\Theta:=\mathbb{R}_\star^+\})$, $p_\theta:x\mapsto\theta\exp(-\theta x)\mathbb{1}_{\mathbb{R}^+}(x)$. Rappels : $\mathbb{E}_\theta[X]=\frac1\theta$, $\mathbb{E}_\theta[X^2]=\frac2{\theta^2}$, $\mathrm{Var}_\theta(X^2)=\frac{20}{\theta^4}$.
1. Construire les estimateurs des moments $\hat\theta_n^{(1)}$ et $\hat\theta_n^{(2)}$ associés à $T_1(x)=x$ et $T_2(x)=x^2$.
2. Montrer que, pour $i=1,2$, $\{\hat\theta_n^{(i)}\}$ est consistante et asymptotiquement normale. Quel estimateur semble préférable asymptotiquement ?
3. La loi exponentielle est dans la famille exponentielle (PC2) : densité $x\mapsto h(x)\exp(T(x)\theta-A(\theta))$ avec $T(x)=-x$, $A(\theta)=-\ln\theta$ ; $\hat\theta_n^{(1)}$ est aussi l'EMV. Calculer l'information de Fisher d'une observation ; comparer à la variance asymptotique de $\hat\theta_n^{(1)}$.
4. Proposer trois IC asymptotiques de niveau $1-\alpha$ à l'aide de cet estimateur : par Slutsky, par méthode-δ (stabilisation de la variance), et par une méthode exploitable dans ce cas précis. (Figure 1 : les IC sont de la forme $[\hat\theta_n^{(1)}y_{\inf},\hat\theta_n^{(1)}y_{\sup}]$, tracés en fonction de $z_{1-\alpha/2}/\sqrt n\in[0,0{,}25]$.)

**Corrigé (Corrigé PC6, p. 7–10) :**
- *Rappels.* Par **intégration par parties** : $\mathbb{E}_{n,\theta}[X_1]=\theta\int_0^\infty xe^{-\theta x}\mathrm{d}x=1/\theta$, $\mathbb{E}_{n,\theta}[X_1^2]=2/\theta^2$, $\mathbb{E}_{n,\theta}[X_1^4]=24/\theta^4$, donc $\mathrm{Var}_{n,\theta}(X_1^2)=24/\theta^4-4/\theta^4=20/\theta^4$.
1. Équations des moments : $\frac1\theta=\frac1n\sum_kX_k$ et $\frac2{\theta^2}=\frac1n\sum_kX_k^2$, d'où
$$\hat\theta_n^{(1)}=\frac1{n^{-1}\sum_{i=1}^nX_i},\qquad\hat\theta_n^{(2)}=\sqrt{\frac2{n^{-1}\sum_{i=1}^nX_i^2}}.$$
2. $\hat\theta_n^{(1)}=\phi_1(n^{-1}\sum X_i)$, $\hat\theta_n^{(2)}=\phi_2(n^{-1}\sum X_i^2)$, $\phi_1(t)=1/t$, $\phi_2(t)=\sqrt{2/t}$ sur $\mathbb{R}_\star^+$. **LGN** : $\frac1n\sum X_k\to\frac1\theta$, $\frac1n\sum X_k^2\to\frac2{\theta^2}$ en probabilité ; **continuité** : $\phi_1(\cdot)\to\theta$, $\phi_2(\cdot)\to\theta$ : consistance. **TCL** : $\sqrt n(\frac1n\sum X_i-\frac1\theta)\Rightarrow\mathcal{N}(0,\frac1{\theta^2})$ ; **méthode-δ** ($\phi_1'(1/\theta)=-\theta^2$) : $\sqrt n(\hat\theta_n^{(1)}-\theta)\Rightarrow\mathcal{N}(0,\theta^2)$. **TCL** : $\sqrt n(\frac1n\sum X_i^2-\frac2{\theta^2})\Rightarrow\mathcal{N}(0,\frac{20}{\theta^4})$ ; **méthode-δ** avec $\phi_2$ ($\phi_2'(2/\theta^2)^2=\theta^6/16$) :
$$\sqrt n\big(\hat\theta_n^{(2)}-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}\big(0,\tfrac54\theta^2\big).$$
Les deux convergent à vitesse $\sqrt n$ ; la variance asymptotique de $\hat\theta_n^{(1)}$ ($\theta^2$) est inférieure à celle de $\hat\theta_n^{(2)}$ ($\frac54\theta^2$) : **$\hat\theta_n^{(1)}$ semble préférable** (Prop. 1.3).
3. Log-vraisemblance d'une observation $\theta\mapsto\ln\theta-\theta X_1$ ; dérivées $\frac1\theta-X_1$ et $-\frac1{\theta^2}$ ; $I_1(\theta):=-\mathbb{E}_\theta[(\ln p_\theta(X))'']=\frac1{\theta^2}$. La variance asymptotique de $\hat\theta_n^{(1)}$ est **l'inverse de l'information de Fisher** d'une observation.
4. *Méthode 1 (Slutsky).* $\sqrt n(\hat\theta_n^{(1)})^{-1}(\hat\theta_n^{(1)}-\theta)\Rightarrow\mathcal{N}(0,1)$ ; $\mathbb{P}(W\in[-z_{1-\alpha/2},z_{1-\alpha/2}])=1-\alpha$ ; d'où
$$\lim_n\mathbb{P}_{n,\theta}\Big(\theta\in\Big[\hat\theta_n^{(1)}\big(1-\tfrac{z_{1-\alpha/2}}{\sqrt n}\big);\ \hat\theta_n^{(1)}\big(1+\tfrac{z_{1-\alpha/2}}{\sqrt n}\big)\Big]\Big)=1-\alpha.$$
*Méthode 2 (stabilisation de la variance).* Pour $g$ de classe $C^1$ : $\sqrt n(g(\hat\theta_n^{(1)})-g(\theta))\Rightarrow\mathcal{N}(0,(g'(\theta))^2\theta^2)$ ; variance constante égale à 1 pour $g(\theta)=A+\ln\theta$ ($A=0$) : $\sqrt n(\ln\hat\theta_n^{(1)}-\ln\theta)\Rightarrow\mathcal{N}(0,1)$, IC pour $\ln\theta$ puis, par bijection,
$$\Big[\hat\theta_n^{(1)}\exp\big(-\tfrac{z_{1-\alpha/2}}{\sqrt n}\big);\ \hat\theta_n^{(1)}\exp\big(\tfrac{z_{1-\alpha/2}}{\sqrt n}\big)\Big].$$
*Méthode 3 (inversion directe du pivot).* $\sqrt n(\hat\theta_n^{(1)}-\theta)/\theta\Rightarrow\mathcal{N}(0,1)$, donc $\lim_n\mathbb{P}_{n,\theta}\big(-z_{1-\alpha/2}\le\sqrt n(\hat\theta_n^{(1)}/\theta-1)\le z_{1-\alpha/2}\big)=1-\alpha$, d'où
$$\Bigg[\frac{\hat\theta_n^{(1)}}{1+\frac{z_{1-\alpha/2}}{\sqrt n}},\ \frac{\hat\theta_n^{(1)}}{1-\frac{z_{1-\alpha/2}}{\sqrt n}}\Bigg].$$
*Analyse numérique.* Les trois IC sont de la forme $[\hat\theta_n^{(1)}y_{\inf},\hat\theta_n^{(1)}y_{\sup}]$ ; Figure 4 du corrigé : $y_{\inf}$, $y_{\sup}$ et $y_{\sup}-y_{\inf}$ en fonction de $x=z_{1-\alpha/2}/\sqrt n\in[0,1/2]$ ; Figure 5 : fréquence de couverture de $\theta=2$ sur 2000 IC à 95 % en fonction de $n$ (observations $\mathcal{E}(2)$). Conclusion du corrigé : ici l'approche par Slutsky reste préférable à la méthode-δ ; en général la méthode 2 n'introduit pas d'aléa supplémentaire (pas d'estimation de la variance limite) mais demande de trouver et d'inverser $g$ ; la méthode 3 demande d'inverser une fonction, pas toujours explicitement possible.

**Méthodes mobilisées :** méthode des moments ; LGN + théorème de continuité (consistance) ; TCL + méthode-δ (normalité asymptotique) ; comparaison par variance asymptotique ; information de Fisher (dérivée seconde) ; IC asymptotiques par Slutsky, par stabilisation de la variance ($g=\ln$), par inversion du pivot.

### Exercice 2 (*) — Statistiques asymptotiques pour le modèle non régulier de Pareto translaté
**Énoncé (Énoncé PC6, p. 1–2) :** Loi de Pareto (queues lourdes), densité par rapport à Lebesgue
$$x\mapsto p_\theta(x)=\eta\,\alpha^\eta x^{-(\eta+1)}\mathbb{1}_{[\alpha,+\infty[}(x),\qquad\theta:=(\alpha,\eta)\in\mathbb{R}_*^+\times\mathbb{R}_*^+.$$
Rappels : $\mathbb{E}_\theta[X]=\frac\eta{\eta-1}\alpha$, $\mathrm{Var}_\theta(X)=\frac\eta{(\eta-1)^2(\eta-2)}\alpha^2$ ; sous $\mathbb{P}_\theta$, $\ln(X_1/\alpha)\sim\mathcal{E}(\eta)$, d'espérance $1/\eta$ et de variance $1/\eta^2$. Suite de $n$-échantillons.
*Première partie : $\alpha$ connu* (modèle régulier).
1. Déterminer l'EMV $\hat\eta_n$ de $\eta$.
2. Montrer que $\{\hat\eta_n\}$ est consistante.
3. Montrer que $\{\hat\eta_n\}$ est asymptotiquement normale.
4. Construire un IC de probabilité de couverture asymptotique $1-\rho$ pour $\eta$.
*Seconde partie : $\alpha$ inconnu.*
5. Déterminer l'EMV $(\hat\alpha_n,\hat\eta_n)$ de $(\alpha,\eta)$.
6. Montrer que $\mathbb{P}_{n,\theta}(\hat\alpha_n>y)=(\alpha/y)^{n\eta}$ pour $y\ge\alpha$. Déterminer moyenne et variance de $\hat\alpha_n$ ($n$ assez grand), l'erreur quadratique et un équivalent quand $n\to\infty$ ; commenter.
7. Montrer que $\{\hat\alpha_n\}$ est consistante pour $\alpha$ ; en déduire que $\{\hat\eta_n\}$ est consistante pour $\eta$.
8. Déterminer la loi de $n\eta\ln(\hat\alpha_n/\alpha)$ sous $\mathbb{P}_{n,\theta}$. En déduire une fonction pivotale asymptotique pour $\alpha$ et un IC de couverture asymptotique $1-\beta$.

**Corrigé (Corrigé PC6, p. 11–13) :**
1. $L_n(\eta,Z_n)=\eta^n\alpha^{n\eta}\big(\prod_iX_i\big)^{-(\eta+1)}\mathbb{1}_{\{X_{1:n}>\alpha\}}$, $X_{1:n}:=\min_iX_i$. Sur $\{X_{1:n}>\alpha\}$ : $\ell_n(\eta)=n\ln\eta+n\eta\ln\alpha-(\eta+1)\sum_i\ln X_i$, $\dot\ell_n(\eta)=\frac n\eta-\sum_i\ln(X_i/\alpha)$, $\ddot\ell_n(\eta)=-\frac n{\eta^2}<0$. $\ell_n\to-\infty$ en $0$ et en $+\infty$ (car $X_i>\alpha$) ; **stricte concavité** $\Rightarrow$ maximum unique, **annulation du score** :
$$\hat\eta_n:=\Big(\frac1n\sum_{i=1}^n\ln(X_i/\alpha)\Big)^{-1}.$$
2. $\ln(X_1/\alpha)\sim\mathcal{E}(\eta)$ (**fonction muette** + changement de variable), d'espérance $1/\eta$ ; **LGN** : $\frac1n\sum\ln(X_i/\alpha)\to1/\eta$ en probabilité ; **continuité** de $u\mapsto1/u$ sur $\mathbb{R}_\star^+$ : consistance.
3. *Méthode 1.* **TCL** : $\sqrt n\big(\frac1n\sum\ln(X_i/\alpha)-\frac1\eta\big)\Rightarrow\mathcal{N}(0,\frac1{\eta^2})$ ; **méthode-δ** avec $t\mapsto1/t$ : $\sqrt n(\hat\eta_n-\eta)\Rightarrow\mathcal{N}(0,\eta^2)$. *Méthode 2* (vue en PC7) : normalité asymptotique de l'EMV en modèle régulier, $I(\eta)=-\int\ddot\ell_1(\eta,x)p_\eta(x)\mathrm{d}x=\eta^{-2}$ (information d'**une** observation), d'où $\mathcal{N}(0,\eta^2)$.
4. **Slutsky** : $\sqrt n\frac{\hat\eta_n-\eta}{\hat\eta_n}\Rightarrow\mathcal{N}(0,1)$ ; avec $t_{1-\rho/2}$ quantile de $\mathcal{N}(0,1)$ :
$$\eta\in\Big[\hat\eta_n\big(1-\tfrac{t_{1-\rho/2}}{\sqrt n}\big);\ \hat\eta_n\big(1+\tfrac{t_{1-\rho/2}}{\sqrt n}\big)\Big].$$
Variante avec le pivot $\sqrt n(\hat\eta_n-\eta)/\eta$ : $\eta\in\big[\hat\eta_n(1+\frac{t_{1-\rho/2}}{\sqrt n})^{-1},\hat\eta_n(1-\frac{t_{1-\rho/2}}{\sqrt n})^{-1}\big]$ (comparer à l'Exercice 1).
5. $L_n(\alpha,\eta,Z_n)\le L_n(\min X_i,\eta,Z_n)$ pour tout $\eta>0$ (la vraisemblance croît en $\alpha$ sur $]0,X_{1:n}]$ et s'annule au-delà), donc
$$\hat\alpha_n=X_{1:n},\qquad\hat\eta_n^{(2)}=\Big(\frac1n\sum_{i=1}^n\ln(X_i/\hat\alpha_n)\Big)^{-1}.$$
6. Pour $y>\alpha$ : $\mathbb{P}_{n,\theta}(\hat\alpha_n>y)=\mathbb{P}_{n,\theta}(X_1>y)^n=(\alpha/y)^{n\eta}$ (**loi du minimum**, indépendance). Densité $y\mapsto n\eta\alpha^{n\eta}y^{-(n\eta+1)}\mathbb{1}_{\{y>\alpha\}}$ : **Pareto de paramètres $(\alpha,n\eta)$**. Pour $n\eta>2$ : $\mathbb{E}_{n,\theta}[\hat\alpha_n]=\frac{n\eta}{n\eta-1}\alpha$, $\mathrm{Var}_{n,\theta}(\hat\alpha_n)=\frac{n\eta}{(n\eta-2)(n\eta-1)^2}\alpha^2$. **Décomposition biais-variance** : $\mathbb{E}_{n,\theta}[(\hat\alpha_n-\alpha)^2]=b_n(\theta)^2+\mathrm{Var}_{n,\theta}(\hat\alpha_n)=O(n^{-2})\to0$. *(Complément d'extraction : $b_n=\frac{\alpha}{n\eta-1}$ et l'EQM vaut exactement $\frac{2\alpha^2}{(n\eta-1)(n\eta-2)}\sim\frac{2\alpha^2}{n^2\eta^2}$.)* Commentaire : vitesse $1/n^2$ pour l'EQM, bien meilleure que $1/n$ en modèle régulier.
7. **Markov** (ordre 2) : $\mathbb{P}_{n,\theta}(\lvert\hat\alpha_n-\alpha\rvert\ge\varepsilon)\le\varepsilon^{-2}\mathbb{E}_{n,\theta}[(\hat\alpha_n-\alpha)^2]=O(n^{-2})\to0$ : consistance de $\hat\alpha_n$. (La consistance de $\hat\eta_n^{(2)}$ en découle — le corrigé ne détaille pas cette déduction.)
8. *Méthode 1.* $\mathbb{P}_{n,\theta}(n\eta\ln(\hat\alpha_n/\alpha)\le x)=\mathbb{P}_{n,\theta}(\hat\alpha_n\le\alpha e^{x/(n\eta)})=1-e^{-x}$ : $n\eta\ln(\hat\alpha_n/\alpha)\sim\mathcal{E}(1)$ (**pivot exact** si $\eta$ connu). $\eta$ inconnu : remplacer par $\hat\eta_n^{(2)}$ consistant, **Slutsky** : $n\hat\eta_n^{(2)}\ln(\hat\alpha_n/\alpha)\Rightarrow\mathcal{E}(1)$ : asymptotiquement pivotale. *Méthode 2.* $\hat\alpha_n\sim$ Pareto$(\alpha,n\eta)$ donc (rappel) $\ln(\hat\alpha_n/\alpha)\sim\mathcal{E}(n\eta)$ et $n\eta\ln(\hat\alpha_n/\alpha)\sim\mathcal{E}(1)$. *IC* : choisir $0\le a<b$ avec $\mathbb{P}(a\le U\le b)=1-\beta$, $U\sim\mathcal{E}(1)$ :
$$\alpha\in\Big[\hat\alpha_ne^{-b/(n\hat\eta_n^{(2)})},\ \hat\alpha_ne^{-a/(n\hat\eta_n^{(2)})}\Big]$$
(couverture $\to1-\beta$). Le choix $a=0$, $b=t_{1-\beta}$ (quantile d'ordre $1-\beta$ de $\mathcal{E}(1)$) donne l'intervalle le plus étroit. Longueur en $O(1/n)$, EQM en $O(1/n^2)$ : vitesse $n$, et $\{n(\hat\alpha_n-\alpha)\}$ converge en loi. Modèle **non régulier** en $\alpha$ (en modèle régulier : vitesse $\sqrt n$, IC de longueur $1/\sqrt n$).

**Méthodes mobilisées :** calcul d'EMV par annulation du score et stricte concavité ; EMV d'un paramètre de support (maximisation de l'indicatrice, $\hat\alpha_n=X_{1:n}$) ; loi du minimum ; LGN + continuité ; TCL + méthode-δ ; information de Fisher ; Slutsky ; décomposition biais-variance ; Markov ; pivot exact $\mathcal{E}(1)$ puis pivot asymptotique.
**Lien cours :** même phénomène que l'Ex. 1.5 (support de l'uniforme : vitesse $n$, limite exponentielle).

### Exercice 3 (*) — Non unicité d'une suite de tests consistante
**Énoncé (Énoncé PC6, p. 2–3) :** $\Theta$ ouvert de $\mathbb{R}$, $\theta_0\in\Theta$ ; tester $H_0:\theta=\theta_0$ contre $H_1:\theta>\theta_0$. $n$-échantillons d'un **modèle de translation** : $q\cdot\mathrm{dLeb}$ loi sur $\mathbb{R}$, $q_\theta:x\mapsto q(x-\theta)$ ; $q$ **symétrique** par rapport à l'origine, **continue**, $q(0)>0$, de variance $\sigma_q^2$ inconnue (note : ces conditions entraînent que la médiane est unique et vaut 0 et que la f.d.r. $F$ est strictement croissante au voisinage de 0). Statistiques
$$M_n:=2\sqrt n\Big(B_n-\frac12\Big),\quad T_n:=\sqrt n\,\frac{\bar X_n-\theta_0}{S_n},\quad B_n:=\frac1n\sum_{k=1}^n\mathbb{1}_{\{X_k\ge\theta_0\}},\quad\bar X_n:=\frac1n\sum_{k=1}^nX_k,\quad S_n^2:=\frac1n\sum_{k=1}^n(X_k-\bar X_n)^2$$
(**attention : $S_n^2$ normalisée par $n$ ici**), $\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n}$.
1. Montrer qu'on peut choisir $\{t_n\}$ telle que $\phi_{n,1}:=\mathbb{1}_{\{M_n\ge t_n\}}$ soit de niveau asymptotique $\alpha$ et consistante ($\liminf_n\mathbb{P}_{n,\theta}(\phi_{n,1}=1)=1$ pour $\theta>\theta_0$). Étapes : proposer $t_n$ ; pour $\theta>\theta_0$, exprimer espérance et variance de $\mathbb{1}_{\{X_k\ge\theta_0\}}$ via $\theta_0$ et la f.d.r. $F$ de $q$, observer le signe de $\mathbb{P}_{n,\theta}(X_k\ge\theta_0)-1/2$ ; vérifier la consistance.
2. Construire une suite de tests $\{\phi_{n,2}\}$ fondée sur $T_n$, de niveau asymptotique $\alpha$ et consistante.
Conclusion : pas d'unicité d'une suite de tests consistante ; comparaison en PC7.

**Corrigé (Corrigé PC6, p. 14–16) :** Notations $e(\theta):=1-F(\theta_0-\theta)$, $v(\theta):=F(\theta_0-\theta)(1-F(\theta_0-\theta))=(1-e(\theta))e(\theta)$.
1. *Définition du test.* Sous $\mathbb{P}_{n,\theta_0}$, $\mathbb{1}_{\{X_k\ge\theta_0\}}\sim$ Bernoulli de paramètre $\int_{\theta_0}^{+\infty}q(x-\theta_0)\mathrm{d}x=\int_0^\infty q(y)\mathrm{d}y=1-F(0)=\frac12$ (médiane 0) : espérance $1/2$, variance $1/4$. **TCL** : $M_n\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathcal{N}(0,1)$. La médiane des $X_i$ sous $\mathbb{P}_{n,\theta}$ est $\theta$ ; vu la forme de $H_1$, zone de rejet $R_{n,1}:=\{2\sqrt n(n^{-1}\sum_k\mathbb{1}_{x_k\ge\theta_0}-1/2)>s\}$ avec $s=z_{1-\alpha}$ : $\lim_n\mathbb{P}_{n,\theta_0}(M_n>z_{1-\alpha})=\mathbb{P}(U>z_{1-\alpha})=\alpha$ : niveau asymptotique $\alpha$. Donc $t_n:=z_{1-\alpha}$.
*Consistance.* $\mathbb{P}_{n,\theta}(X_k\ge\theta_0)=\int_{\theta_0-\theta}^\infty q(x)\mathrm{d}x=1-F(\theta_0-\theta)=e(\theta)$ ; **TCL** : $\sqrt n\frac{B_n-e(\theta)}{\sqrt{v(\theta)}}\Rightarrow\mathcal{N}(0,1)$. Pour $\theta>\theta_0$ : $F(\theta_0-\theta)<F(0)=\frac12$ (strictement près de $\theta_0$ grâce à $q(0)>0$ et $q$ continue, puis pour tout $\theta>\theta_0$ par monotonie de $F$), donc $\sqrt n(\frac12-e(\theta))\to-\infty$. Réécriture :
$$\mathbb{P}_{n,\theta}\big(2\sqrt n(B_n-\tfrac12)>z_{1-\alpha}\big)=\mathbb{P}_{n,\theta}\Big(\sqrt n\frac{B_n-e(\theta)}{\sqrt{v(\theta)}}>\sqrt n\frac{1/2-e(\theta)}{\sqrt{v(\theta)}}+\frac{z_{1-\alpha}}{2\sqrt{v(\theta)}}\Big).$$
La borne bouge avec $n$ : pour $M>0$, il existe $N_M$ tel que $\sqrt n\frac{1/2-e(\theta)}{\sqrt{v(\theta)}}<-M$ pour $n\ge N_M$, d'où la minoration par $\mathbb{P}_{n,\theta}\big(\sqrt n\frac{B_n-e(\theta)}{\sqrt{v(\theta)}}>\frac{z_{1-\alpha}}{2\sqrt{v(\theta)}}-M\big)$ ; **convergence en loi** : $\lim_n\mathbb{P}_{n,\theta}(M_n>z_{1-\alpha})\ge1-\Phi\big(\frac{z_{1-\alpha}}{2\sqrt{v(\theta)}}-M\big)$ pour tout $M$ ; $M\to+\infty$ : limite $=1$. Consistance.
2. *Construction.* Sous $\mathbb{P}_{n,\theta_0}$, $X_k$ i.i.d. d'espérance $\theta_0$, variance $\sigma_q^2$ : **TCL** $\sqrt n\sigma_q^{-1}(\bar X_n-\theta_0)\Rightarrow\mathcal{N}(0,1)$ ; $S_n^2=\frac1n\sum X_k^2-\bar X_n^2\to\sigma_q^2$ (**LGN**) ; **continuité** puis **Slutsky** : $T_n\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathcal{N}(0,1)$. Zone de rejet $R_{n,2}:=\{\sqrt n\frac{\bar X_n-\theta_0}{S_n}>z_{1-\alpha}\}$, $\lim_n\mathbb{P}_{n,\theta_0}(T_n>z_{1-\alpha})=\alpha$ : niveau asymptotique $\alpha$.
*Consistance.* Pour $\theta>\theta_0$, $\sqrt n\frac{\bar X_n-\theta}{S_n}\Rightarrow\mathcal{N}(0,1)$ et $\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})=\mathbb{P}_{n,\theta}\big(\sqrt n\frac{\bar X_n-\theta}{S_n}>z_{1-\alpha}+\sqrt n\frac{\theta_0-\theta}{S_n}\big)$. Comme $\lim_n\mathbb{P}_{n,\theta}(\sigma_q-\varepsilon\le S_n\le\sigma_q+\varepsilon)=1$, on minore par $\mathbb{P}_{n,\theta}\big(\sqrt n\frac{\bar X_n-\theta}{S_n}>z_{1-\alpha}+\sqrt n\frac{\theta_0-\theta}{\sigma_q+\varepsilon}\big)\ge\mathbb{P}_{n,\theta}\big(\sqrt n\frac{\bar X_n-\theta}{S_n}>z_{1-\alpha}-M\big)$ pour $n$ grand ; d'où $\lim_n\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})\ge1-\Phi(z_{1-\alpha}-M)\to1$ ($M\to\infty$).

**Méthodes mobilisées :** test du signe (statistique de Bernoulli), TCL sous $H_0$ pour calibrer le seuil, quantile $z_{1-\alpha}$ (test unilatéral) ; consistance par seuil auxiliaire $M$ et double passage à la limite ($n$ puis $M$) ; Student asymptotique (TCL + LGN + continuité + Slutsky).
**Lien cours :** Ex. 1.14 (version unilatérale) ; Déf. 1.10–1.11.

### Exercice 4 (*) — Statistique asymptotique dans un modèle de Poisson
**Énoncé (Énoncé PC6, p. 3) :** $n$-échantillons de $(\mathbb{N},\mathcal{P}(\mathbb{N}),\{p_\theta\cdot\mu,\theta\in\Theta:=\mathbb{R}_\star^+\})$, $p_\theta:k\mapsto\frac{\theta^k}{k!}\exp(-\theta)$, $\mu$ mesure de comptage ; $\bar X_n:=n^{-1}\sum_{i=1}^nX_i$.
1. Montrer que $\{\bar X_n\}$ est une suite d'estimateurs de $\theta$ asymptotiquement normale.
2. Estimer $g(\theta)=\mathbb{P}_{n,\theta}(X_1=0)=\exp(-\theta)$ : montrer que $\{\exp(-\bar X_n)\}$ est consistante et asymptotiquement normale.
3. Construire un IC asymptotique pour $g$.

**Corrigé (Corrigé PC6, p. 17) :** (le corrigé écrit $\mathbb{P}_{n,\theta}:=(p_\theta\cdot\mathrm{Leb})^{\otimes n}$, coquille : la mesure dominante est la mesure de comptage.)
1. $X_i$ i.i.d. $\mathcal{P}(\theta)$, $\mathbb{E}=\mathrm{Var}=\theta$ ; **TCL** : $\sqrt n(\bar X_n-\theta)\Rightarrow\mathcal{N}(0,\theta)$ ; variance asymptotique $\sigma^2(\theta):=\theta$.
2. **LGN** : $\bar X_n\to\theta$ en probabilité ; **continuité** de l'exponentielle : consistance de $g(\bar X_n)$. $g$ différentiable, $g'(\theta)=-e^{-\theta}$ ; **méthode-δ** :
$$\sqrt n\big(g(\bar X_n)-g(\theta)\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{N}\big(0,\theta e^{-2\theta}\big).$$
(éq. (4) du corrigé)
3. $\gamma:\theta\mapsto\sqrt\theta\,e^{-\theta}$ continue sur $\mathbb{R}_+^*$ : $\gamma(\bar X_n)\to\gamma(\theta)$ en probabilité ; **Slutsky** : $G_n:=\sqrt n\,\gamma(\bar X_n)^{-1}(e^{-\bar X_n}-e^{-\theta})\Rightarrow\mathcal{N}(0,1)$, asymptotiquement pivotale. IC de niveau asymptotique $1-\alpha$ pour $e^{-\theta}$ :
$$\Big[e^{-\bar X_n}-\gamma(\bar X_n)\frac{z_{1-\alpha/2}}{\sqrt n};\ e^{-\bar X_n}+\gamma(\bar X_n)\frac{z_{1-\alpha/2}}{\sqrt n}\Big].$$

**Méthodes mobilisées :** TCL ; LGN + continuité ; méthode-δ ($\theta\mapsto e^{-\theta}$) ; Slutsky (variance asymptotique estimée, Méthode 1.1).

### Exercice 5 (*) — LGN faible et limite de série
**Énoncé (Énoncé PC6, p. 3) :** Soit $g:\mathbb{R}\to\mathbb{R}$ continue et bornée. Montrer que
$$e^{-n\lambda}\sum_{k=0}^\infty g\Big(\frac kn\Big)\frac{(n\lambda)^k}{k!}\xrightarrow[n\to\infty]{}g(\lambda).$$
**Corrigé (Corrigé PC6, p. 18) :** Modèle de Poisson de paramètre $\lambda>0$ : sous $\mathbb{P}_{n,\lambda}$, $X_1+\dots+X_n\sim\mathcal{P}(n\lambda)$ (**somme de Poisson indépendantes**), donc $e^{-n\lambda}\sum_kg(k/n)\frac{(n\lambda)^k}{k!}=\mathbb{E}_{n,\lambda}\big[g\big(\frac{X_1+\dots+X_n}n\big)\big]$. **LGN faible** : $\bar X_n\to\lambda$ en probabilité, donc en loi vers $\delta_\lambda$ (Th. 2.2) ; par **définition de la convergence en loi** ($g$ continue bornée), $\mathbb{E}_{n,\lambda}[g(\bar X_n)]\to g(\lambda)$.
**Méthodes mobilisées :** représentation probabiliste d'une série (théorème de transfert) ; LGN ; convergence en probabilité $\Rightarrow$ en loi ; définition de la convergence en loi.

### Exercice 6 (**) — Estimateur de Hodges
**Énoncé (Énoncé PC6, p. 4) :** $n$-échantillons de $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta\cdot\mathrm{Leb},\theta\in\Theta:=\mathbb{R}\})$, $p_\theta:x\mapsto\frac1{\sqrt{2\pi}}\exp(-0{,}5(x-\theta)^2)$ (gaussien, variance connue).
1. Montrer que l'EMV de $\theta$ est asymptotiquement normal.
2. Soit $b\ne1$ et $\{a_n\}$ positifs avec $a_n\to0$ et $\sqrt na_n\to\infty$. On considère $\tilde\theta_n=\bar X_n\mathbb{1}_{\{\lvert\bar X_n\rvert\ge a_n\}}+b\bar X_n\mathbb{1}_{\{\lvert\bar X_n\rvert<a_n\}}$, $\bar X_n:=n^{-1}\sum_iX_i$. Montrer que $\{\tilde\theta_n\}$ est asymptotiquement normale (cas $\theta=0$ et $\theta\ne0$).
3. Commenter (Figure 2 : $\theta\mapsto n\mathbb{E}_{n,\theta}[(\tilde\theta_n-\theta)^2]$ pour $a_n=n^{-1/4}$, $b=0{,}25$, $n=100,250,500$ ; forte oscillation au voisinage de 0 ; pour l'EMV cette quantité vaut constamment 1).

**Corrigé (Corrigé PC6, p. 18–21) :**
- *Efficacité de $\bar X_n$.* Log-vraisemblance $\theta\mapsto-\frac12\sum_i(X_i-\theta)^2$ (à une constante près), dérivée seconde $-n$, $I_n(\theta)=-\mathbb{E}_{n,\theta}[\partial_\theta^2\ell]=n$ ; $\bar X_n$ sans biais de variance $1/n=I_n(\theta)^{-1}$ : borne de Cramér-Rao atteinte, **efficace**.
1. EMV $=\bar X_n$ et $\sqrt n(\bar X_n-\theta)\sim\mathcal{N}(0,1)$ **exactement**.
2. *Cas $\theta=0$.* $\tilde\theta_n=b\bar X_n+(1-b)\bar X_n\mathbb{1}_{\{\lvert\bar X_n\rvert\ge a_n\}}$ ; sous $\mathbb{P}_{n,0}$, $\sqrt n\tilde\theta_n$ a même loi que $bU+(1-b)U\mathbb{1}_{\{\lvert U\rvert\ge\sqrt na_n\}}$, $U\sim\mathcal{N}(0,1)$. Pour $H$ continue bornée : $\mathbb{E}[H(U\mathbb{1}_{\{\lvert U\rvert\ge\sqrt na_n\}})]=H(0)+\mathbb{E}[(H(U)-H(0))\mathbb{1}_{\{\lvert U\rvert\ge\sqrt na_n\}}]\to H(0)$ (**convergence dominée**, $\sqrt na_n\to\infty$) : $U\mathbb{1}_{\{\lvert U\rvert\ge\sqrt na_n\}}\Rightarrow\delta_0$, donc $\to0$ en probabilité ; **Slutsky** : $\sqrt n\tilde\theta_n\Rightarrow bU\sim\mathcal{N}(0,b^2)$.
*Cas $\theta\ne0$.* $\sqrt n(\tilde\theta_n-\theta)=\sqrt n(\bar X_n-\theta)+(b-1)\sqrt n\bar X_n\mathbb{1}_{\{\lvert\bar X_n\rvert<a_n\}}$ ; premier terme $\sim\mathcal{N}(0,1)$. Pour $H$ continue bornée par $C$ : $\mathbb{E}_{n,\theta}[H(\sqrt n\bar X_n\mathbb{1}_{\{\lvert\bar X_n\rvert<a_n\}})]=H(0)+\mathbb{E}_{n,\theta}[(H(\sqrt n\bar X_n)-H(0))\mathbb{1}_{\{\lvert\bar X_n\rvert<a_n\}}]$, second terme majoré par $(C+1)\mathbb{P}_{n,\theta}(\lvert\bar X_n\rvert<a_n)$ *(le corrigé écrit $C+1$ ; $2C$ suffit)* ; $\mathbb{P}_{n,\theta}(\lvert\bar X_n\rvert<a_n)=\mathbb{P}(\sqrt n(-a_n-\theta)<U<\sqrt n(a_n-\theta))\to0$ (si $\theta>0$, $\sqrt n(a_n-\theta)\to-\infty$ ; si $\theta<0$, $\sqrt n(-a_n-\theta)\to+\infty$). Donc second terme $\Rightarrow\delta_0$, et par **Slutsky** $\sqrt n(\tilde\theta_n-\theta)\Rightarrow\mathcal{N}(0,1)$. Bilan : variance asymptotique $v(0)=b^2$, $v(\theta)=1$ pour $\theta\ne0$.
3. *Conclusion 1.* Estimateur asymptotiquement normal de variance asymptotique égale, et strictement inférieure en au moins un point (si $\lvert b\rvert<1$), à celle de l'EMV : contre-exemple à une conjecture de Fisher ; selon le critère des variances asymptotiques on préférerait $\tilde\theta_n$.
*Conclusion 2.* Le maximum de $\theta\mapsto nR(\tilde\theta_n,\theta)$ croît avec $n$. $\tilde\theta_n$ ne prend jamais de valeur dans $]ba_n,a_n[$ (si $\lvert\bar X_n\rvert\ge a_n$ alors $\lvert\tilde\theta_n\rvert\ge a_n$ ; sinon $\lvert\tilde\theta_n\rvert<ba_n$). Au milieu $\tau_n=(b+1)a_n/2$ : $R(\tilde\theta_n,\tau_n)=\mathbb{E}_{n,\tau_n}[(\tilde\theta_n-\tau_n)^2]\ge\big(\frac{1-b}2a_n\big)^2$, d'où $\lim_nnR(\tilde\theta_n,\tau_n)\ge\frac{(1-b)^2}4\lim_nna_n^2=+\infty$ avec $\tau_n\to0$. On ne peut donc pas avoir $\limsup_n\sup_{\theta\in V_0}nR(\tilde\theta_n,\theta)<1$ sur un voisinage $V_0$ de 0 : pour un critère de variabilité uniformément meilleure au voisinage de tout point, on ne préfère pas $\tilde\theta_n$.

**Méthodes mobilisées :** information de Fisher et borne de Cramér-Rao ; décomposition sur des événements ; convergence en loi vers une Dirac via fonctions test + convergence dominée ; Slutsky ; minoration du risque par un argument géométrique (« trou » $]ba_n,a_n[$).
**Lien cours :** Prop. 1.3 et ses limites ; Compléments §4.5 (super-efficacité).

### Exercice 7 (***) — Suite consistante d'estimateurs, racines des équations de vraisemblance
**Énoncé (Énoncé PC6, p. 4–5) :** Modèle $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:=p_\theta\cdot\mu,\theta\in\Theta\})$, $\mu$ $\sigma$-finie, $\Theta$ intervalle ouvert de $\mathbb{R}$ :
- **Ha** pour tout $x$, $\theta\mapsto p_\theta(x)$ est $C^1$ sur $\Theta$ ; et $p_\theta(x)>0$ pour tous $x,\theta$ ;
- **Hb** pour tous $\theta,\theta_0$, $\int\lvert\log(p_{\theta_0}(x)/p_\theta(x))\rvert p_{\theta_0}(x)\,\mathrm{d}\mu(x)<\infty$ ;
- **Hc** le modèle est identifiable.

Log-vraisemblance $\ell_n(\theta;X_1,\dots,X_n):=\sum_{i=1}^n\log p_\theta(X_i)$ ; équations de vraisemblance $\sum_{i=1}^n\frac{\partial\log p_\theta(X_i)}{\partial\theta}=0$ (1). Objectif : une suite consistante $\{\tilde\theta_n\}$ telle que, pour $n$ assez grand, $\tilde\theta_n$ soit racine de (1). Soient $\theta_0\in\Theta$, $\varepsilon>0$ avec $]\theta_0-\varepsilon,\theta_0+\varepsilon[\subset\Theta$.
1. $S_n:=\{x\in\mathsf{X}^n:\ell_n(\theta_0,x)>\ell_n(\theta_0-\varepsilon,x)\text{ et }\ell_n(\theta_0,x)>\ell_n(\theta_0+\varepsilon,x)\}$ : montrer $\lim_n\mathbb{P}_{n,\theta_0}((X_1,\dots,X_n)\in S_n)=1$.
2. Montrer que si $x\in S_n$, il existe $\tilde\theta_n\in\,]\theta_0-\varepsilon,\theta_0+\varepsilon[$ avec $\frac{\partial\ell_n}{\partial\theta}(\tilde\theta_n,x)=0$.
3. Soit $\{\hat\theta_n\}$ consistante. On pose $\tilde\theta_n:=$ la (ou une des) racine(s) de $\theta\mapsto\partial_\theta\ell_n(\theta,X_1,\dots,X_n)$ la plus proche de $\hat\theta_n$ si elle existe, $\hat\theta_n$ sinon. Montrer que $\{\tilde\theta_n\}$ est consistante.
Puis $\Theta:=\,]0,1[$, $f_0,f_1$ densités sur $\mathbb{R}$ avec $\int\lvert f_0-f_1\rvert>0$, $p_\theta(x):=(1-\theta)f_0(x)+\theta f_1(x)$.
4. Interpréter. 5. Écrire les équations de vraisemblance. 6. Montrer l'existence d'une suite consistante de racines. 7. (Subsidiaire) un algorithme de recherche de racines ? (Figure 3 : mélange $f_i\equiv\mathcal{N}(\mu_i,\sigma_i^2)$, $\theta^\star=0{,}3$, $\mu_0=-2$, $\mu_1=3$, $\sigma_0^2=2$, $\sigma_1^2=1$, $n=500$ ; densité, histogramme, trajectoire de l'algorithme EM initialisé en $\theta_1=0{,}5$.)

**Corrigé (Corrigé PC6, p. 22–27) :**
1. $\ell_n(\theta_0)-\ell_n(\theta_0-\varepsilon)=\sum_k\log\frac{p_{\theta_0}(X_k)}{p_{\theta_0-\varepsilon}(X_k)}$. Par **Hb** et la **LGN** : $\frac1n\sum_k\log\frac{p_{\theta_0}(X_k)}{p_{\theta_0-\varepsilon}(X_k)}\to e(\theta_0):=\int\log\frac{p_{\theta_0}}{p_{\theta_0-\varepsilon}}p_{\theta_0}\,\mathrm{d}\mu=-\int\log\frac{p_{\theta_0-\varepsilon}}{p_{\theta_0}}p_{\theta_0}\,\mathrm{d}\mu>0$ (**inégalité de Jensen**, stricte par **identifiabilité** Hc : divergence de Kullback-Leibler). Avec $\delta$ bien choisi ($\delta<e(\theta_0)$), $\lim_n\mathbb{P}_{n,\theta_0}(0<n^{-1}\sum\log\frac{p_{\theta_0}}{p_{\theta_0-\varepsilon}}(X_k))=1$. Idem pour $\theta_0+\varepsilon$ ; d'où $\mathbb{P}_{n,\theta_0}(S_n)\to1$.
2. $x\in S_n$ : $\theta\mapsto\ell_n(\theta,x)$ est $C^1$ (Ha) ; **accroissements finis** : il existe $\theta_1(x)$, $\theta_2(x)$ dans $]\theta_0-\varepsilon,\theta_0+\varepsilon[$ avec $\partial_\theta\ell_n(\theta_1(x),x)>0$ et $\partial_\theta\ell_n(\theta_2(x),x)<0$ ; **valeurs intermédiaires** : il existe $\tilde\theta(x)$ entre les deux avec $\partial_\theta\ell_n(\tilde\theta(x),x)=0$. *Construction par dichotomie* : $f(t):=\partial_\theta\ell_n(t,x)$, $a_0:=\theta_1(x)$, $b_0:=\theta_2(x)$, $f(a_0)f(b_0)<0$ ; $c_j:=(a_j+b_j)/2$ ; si $f(a_j)f(c_j)\le0$ alors $(a_{j+1},b_{j+1})=(a_j,c_j)$, sinon $(c_j,b_j)$ ; on garde $f(a_j)f(b_j)\le0$ ; $\lvert b_j-a_j\rvert$ divisé par 2 à chaque pas, $a_j\to a_\infty$ ; $\lim f(a_j)f(b_j)=f(a_\infty)^2\ge0$ et $\le0$ donc $f(a_\infty)=0$. *Mesurabilité* : si $a_0,b_0$ sont mesurables en $x$, chaque $a_j$, $b_j$ l'est par récurrence (indicatrices d'événements mesurables, composition avec $(\theta,x)\mapsto\partial_\theta\ell_n(\theta,x)$ mesurable), donc $a_\infty$ aussi.
3. Pour $\theta_0$ et $\varepsilon$ convenables, $\lim_n\mathbb{P}_{n,\theta_0}(\exists\check\theta_n^{(\varepsilon,\theta_0)}\in\,]\theta_0-\varepsilon,\theta_0+\varepsilon[,\ \partial_\theta\ell_n(\check\theta_n^{(\varepsilon,\theta_0)})=0)=1$, et de même pour tout $\varepsilon'\in\,]0,\varepsilon[$. Pour $\delta\in\,]0,\varepsilon[$ : $\lvert\tilde\theta_n-\theta_0\rvert\le\lvert\tilde\theta_n-\hat\theta_n\rvert+\lvert\hat\theta_n-\theta_0\rvert\le\lvert\check\theta_n^{(\delta/3,\theta_0)}-\hat\theta_n\rvert+\lvert\hat\theta_n-\theta_0\rvert\le\lvert\check\theta_n^{(\delta/3,\theta_0)}-\theta_0\rvert+2\lvert\hat\theta_n-\theta_0\rvert$ (la racine la plus proche de $\hat\theta_n$ est plus proche que $\check\theta_n^{(\delta/3,\theta_0)}$ ; **inégalité triangulaire**). Donc $\mathbb{P}_{n,\theta_0}(\lvert\tilde\theta_n-\theta_0\rvert\ge\delta)\le\mathbb{P}_{n,\theta_0}(\lvert\check\theta_n^{(\delta/3,\theta_0)}-\theta_0\rvert\ge\delta/2)+\mathbb{P}_{n,\theta_0}(2\lvert\hat\theta_n-\theta_0\rvert\ge\delta/2)$ ; second terme $\to0$ (**consistance** de $\hat\theta_n$) ; premier terme : $\lvert\check\theta_n^{(\delta/3,\theta_0)}-\theta_0\rvert\le\delta/3$ sur $S_n$, et $\mathbb{P}(S_n)\to1$ (question 1). Consistance.
4. Modèle de **mélange** : on lance une pièce de probabilité $\theta$ de faire 1 ; si 1, l'observation suit $f_1$, sinon $f_0$ (voir PC1/exo 3/q. 8 et PC2/exo 6).
5. $\ell_n(\theta)=\sum_i\log(\theta f_1(X_i)+(1-\theta)f_0(X_i))$ ; équation : $\displaystyle\sum_{i=1}^n\frac{f_1(X_i)-f_0(X_i)}{\theta f_1(X_i)+(1-\theta)f_0(X_i)}=0$.
6. $\mu$ := Lebesgue sur $\mathsf{X}:=\{x:f_0(x)+f_1(x)>0\}$. **Ha** : $p_\theta(x)>0$ (une des deux densités est $>0$) et $\theta\mapsto p_\theta(x)$ affine donc $C^1$. **Hb** : $(f_0+f_1)\min(\theta,1-\theta)\le p_\theta\le f_0+f_1$, d'où $\min(\theta,1-\theta)\le\frac{p_\theta(x)}{p_{\theta'}(x)}\le\frac1{\min(\theta',1-\theta')}$ et $\int\lvert\log\frac{p_\theta}{p_{\theta'}}\rvert p_\theta\le\log\max\big(\frac1{\min(\theta,1-\theta)},\frac1{\min(\theta',1-\theta')}\big)<\infty$. **Hc** : $\mu\{p_\theta\ne p_{\theta'}\}=\mu\{(\theta-\theta')(f_0-f_1)\ne0\}=\mu\{f_0\ne f_1\}>0$ car $\int\lvert f_0-f_1\rvert\,\mathrm{d}\mu\ne0$. La question 3 s'applique : il existe une suite consistante de racines.
7. *Algorithme EM (un algorithme Majoration-Minoration).* a) Si $\ell(\theta)=\ln\int F(u,\theta)\mu(\mathrm{d}u)$ ($F\ge0$ mesurable), **Jensen** (concavité de $\ln$) : $\ell(\theta)-\ell(\theta')\ge\int\ln\frac{F(u,\theta)}{F(u,\theta')}\frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\mu(\mathrm{d}u)$. b) $G(\theta,\theta'):=\int\ln F(u,\theta)\frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\mu(\mathrm{d}u)+\ell(\theta')-\int\ln F(u,\theta')\frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\mu(\mathrm{d}u)$ vérifie $G(\theta',\theta')=\ell(\theta')$, $\ell(\theta)\ge G(\theta,\theta')$ ; itération $\theta_{k+1}\in\arg\max_\theta G(\theta,\theta_k)=\arg\max_\theta\mathbb{E}_{\theta_k}[\ln F(V,\theta)]$, où sous $\mathbb{P}_{\theta'}$ la loi de $V$ est proportionnelle à $v\mapsto F(v,\theta')$. c) Avec $f_{j,i}:=f_j(x_i)$, $U=\{0,1\}^n$, $\mu$ comptage : $F(u,\theta)=\prod_{i=1}^n(\theta f_{1,i})^{u_i}((1-\theta)f_{0,i})^{1-u_i}$ (variables latentes $U_i$ i.i.d. Bernoulli($\theta$)). d) Sous $\mathbb{P}_{\theta}$, les $V_i$ sont indépendantes, $V_i\sim$ Bernoulli de paramètre $\theta f_{1,i}/(\theta f_{1,i}+(1-\theta)f_{0,i})$ ; $\mathbb{E}_{\theta_k}[\ln F(V,\theta)]=\ln\theta\sum_i\mathbb{E}_{\theta_k}[V_i]+\ln(1-\theta)\sum_i\mathbb{E}_{\theta_k}[1-V_i]+C$, maximisé en
$$\theta_{k+1}=\frac1n\sum_{i=1}^n\frac{\theta_kf_{1,i}}{\theta_kf_{1,i}+(1-\theta_k)f_{0,i}}.$$
(éq. (5) du corrigé)
Application numérique (Figure 6) : paramètres de la Figure 3, initialisation $\theta_1=0{,}5$, limite $\lim_k\theta_k=0{,}279$ (proche de $\theta^\star=0{,}3$).

**Méthodes mobilisées :** LGN appliquée au log-rapport de vraisemblance ; inégalité de Jensen stricte + identifiabilité (Kullback-Leibler) ; accroissements finis + théorème des valeurs intermédiaires ; dichotomie et mesurabilité ; inégalité triangulaire + consistance d'un estimateur préliminaire ; vérification d'hypothèses sur un modèle de mélange ; algorithme EM / MM.
**Lien :** prépare la théorie asymptotique des Z-estimateurs (chapitre 7).

---

## 5. Hors programme / compléments

> **Hors programme / complément.** Section « 4 Les compléments » du poly (p. 43–46) : « Les contenus de cette partie ne sont pas exigibles. » Extraction concise. (La Proposition 1.1, produit infini, est aussi un complément hors programme ; voir §2.)

### Théorème 4.1 — Opérations sur les limites, cas vectoriel (Slutsky vectoriel)
**Source :** Poly ch.6, Compléments, Théorème 4.1, p. 43
**Idée :** Étendre Slutsky à des vecteurs / matrices (sert pour la méthode-δ vectorielle et la normalité asymptotique dans $\mathbb{R}^\ell$).
**Résultat principal :** $X_n$, $Y_n$ sur $(\mathsf{Z}_n,\mathcal{Z}_n,\mathbb{P}_n)$ à valeurs dans $\mathbb{R}^d$, $\mathbb{R}^p$ ; $X\sim\mu$.
- (i) Si $d=p$, $X_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$ et $X_n-Y_n\xrightarrow{\mathbb{P}_n\text{-prob}}0$, alors $Y_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$.
- (ii) Si $c\in\mathbb{R}^p$, $X_n\overset{\mathbb{P}_n}{\Longrightarrow}\mu$ et $Y_n\xrightarrow{\mathbb{P}_n\text{-prob}}c$, alors $(X_n,Y_n)\overset{\mathbb{P}_n}{\Longrightarrow}\mu\otimes\delta_c$.
- En particulier, si $A_n$ matrices aléatoires $m\times d$ avec $A_n\xrightarrow{\mathbb{P}_n\text{-prob}}A$ déterministe, alors $A_nX_n\overset{\mathbb{P}_n}{\Longrightarrow}AX$.
**Preuve (résumé) :** (i) = étape 3 de la preuve du Lemme 1.1 (seules des normes interviennent) ; (ii) = étapes 1–2 (décomposition $(X_n,Y_n)=(0,Y_n-c)+(X_n,c)$, fonction caractéristique $\exp(\mathrm{i}t_2^\top c)\mathbb{E}_n[\exp(\mathrm{i}t_1^\top X_n)]$, Lévy en dimension $d+p$, puis (i)) ; dernière affirmation : (ii) appliqué à $(X_n,A_n)$ puis transformation continue de $(x,M)\mapsto Mx$. Application : preuve de la méthode-δ vectorielle (reste $r_n\|T_n-\theta\|\tilde R(T_n-\theta)\to0$ en probabilité).

### Théorème 4.2 — LGN faible, variables i.i.d. intégrables
**Source :** Poly ch.6, Compléments, Théorème 4.2, p. 44
**Résultat principal :** $\{X_k\}$ i.i.d. réelles **intégrables** sur $(\Omega,\mathcal{F},\mathbb{P})$ : $\frac1n\sum_{k=1}^nX_k\xrightarrow{\mathbb{P}\text{-prob}}\mathbb{E}[X_1]$. Admis (IV-5.17 du polycopié d'origine) ; preuve par **troncature**.

### Théorème 4.3 — Loi forte des grands nombres
**Source :** Poly ch.6, Compléments, Théorème 4.3, p. 44
**Résultat principal :** Mêmes hypothèses : $\mathbb{P}\big(\lim_{n\to\infty}\frac1n\sum_{k=1}^nX_k=\mathbb{E}[X_1]\big)=1$. Admis (IV-5.20) ; preuve par **Borel-Cantelli**. Une suite d'estimateurs convergeant p.s. vers $g(\theta)$ sous $\mathbb{P}_\theta$ pour tout $\theta$ est dite **fortement consistante** — notion qui n'a de sens que dans le cadre du produit infini (Prop. 1.1), pas dans celui de la Déf. 1.1 (espace qui change avec $n$).

### Théorème 4.4 — Berry-Esseen
**Source :** Poly ch.6, Compléments, §4.3, Théorème 4.4, p. 44
**Idée :** Le TCL donne une convergence, pas une erreur d'approximation. La f.d.r. limite étant continue, la convergence des f.d.r. est uniforme en $x$ (**théorème de Polya**) ; Berry-Esseen contrôle l'erreur.
**Résultat principal :** $\{X_k\}$ i.i.d., $\mathbb{E}[\lvert X_1\rvert^3]<\infty$, $\mu:=\mathbb{E}[X_1]$, $\sigma^2:=\mathrm{Var}(X_1)>0$ : il existe une constante universelle $C$ telle que, pour tout $x\in\mathbb{R}$ et $n\in\mathbb{N}^*$,
$$\Big\lvert\mathbb{P}\Big(\sqrt n\,\frac{\bar X_n-\mu}{\sigma}\le x\Big)-\Phi(x)\Big\rvert\le\frac{C}{\sqrt n}\,\frac{\mathbb{E}[\lvert X_1-\mu\rvert^3]}{\sigma^3}.$$
Admis. $C=0{,}4784$ convient ; faux pour $C<0{,}4097$. Erreur en $1/\sqrt n$, constante grande pour des lois très dissymétriques.

### §4.4 — L'intervalle de Wilson et l'intervalle de Wald
**Source :** Poly ch.6, Compléments, §4.4, p. 44–45 (Figures 3–4)
**Idée :** Même niveau asymptotique, comportements différents à $n$ fini.
**Résultat principal :** $n=100$, cinquante échantillons. $\theta=0{,}25$ : intervalles pratiquement confondus, couverture proche de $0{,}95$. $\theta=0{,}025$ : $\mathbb{P}(\text{aucun succès})=(1-\theta)^{100}\approx0{,}08$, alors $\bar X_n=0$ et l'intervalle de Wald est réduit à $\{0\}$ (ne contient pas $\theta$) ; celui de Wilson reste d'étendue $>0$ (terme $z_{1-\alpha/2}^2/(4n^2)$). Explication : l'approximation gaussienne de $\sqrt n(\bar X_n-\theta)$ ($n\bar X_n$ binomiale) est mauvaise près de 0 ou 1 ; Berry-Esseen : pour $\mathcal{B}\mathrm{er}(\theta)$, $\mathbb{E}[\lvert X_1-\theta\rvert^3]/\sigma^3=\big(\theta(1-\theta)^3+(1-\theta)\theta^3\big)/(\theta(1-\theta))^{3/2}\to\infty$ quand $\theta\to0$. Wald ajoute le remplacement de $\theta(1-\theta)$ par $\bar X_n(1-\bar X_n)$, ce qui aggrave l'écart ; **Wilson est en général préférable**.

### §4.5 — L'estimateur de Hodges
**Source :** Poly ch.6, Compléments, §4.5, p. 45–46 (Figure 5)
**Idée :** Limite du critère de comparaison par variance asymptotique (Prop. 1.3) : **super-efficacité**.
**Résultat principal :** Modèle gaussien de variance connue $p_\theta(x)=\frac1{\sqrt{2\pi}}\exp(-\frac12(x-\theta)^2)$, $\Theta=\mathbb{R}$ ; EMV $\bar X_n$, $\sqrt n(\bar X_n-\theta)\sim\mathcal{N}(0,1)$ exactement, variance asymptotique 1 = borne de Cramér-Rao. Pour $b\ne1$, $a_n\to0$, $\sqrt na_n\to\infty$ :
$$\tilde\theta_n:=\bar X_n\mathbb{1}_{\{\lvert\bar X_n\rvert\ge a_n\}}+b\bar X_n\mathbb{1}_{\{\lvert\bar X_n\rvert<a_n\}},\qquad v(\theta)=\begin{cases}b^2&\text{si }\theta=0,\\1&\text{si }\theta\ne0.\end{cases}$$
Pour $\lvert b\rvert<1$ : variance asymptotique partout $\le1$, $<1$ en 0. Intuition : si $\theta=0$, $\bar X_n$ est à distance $\sim1/\sqrt n\ll a_n$ de 0, l'estimateur vaut $b\bar X_n$ ; si $\theta\ne0$, il vaut $\bar X_n$ ; la variance asymptotique ne voit jamais la transition. Mais pour $\theta$ de l'ordre de $a_n$, l'EQM est bien plus grande que celle de $\bar X_n$ : Figure 5, $\theta\mapsto n\mathbb{E}_{n,\theta}[(\tilde\theta_n-\theta)^2]$ pour $a_n=n^{-1/4}$, $b=0{,}25$ ($n=100,250,500$) dépasse largement 1 près de 0 et son maximum croît avec $n$. Les critères qui en rendent compte reposent sur une forme d'**uniformité en $\theta$** (borne inférieure locale asymptotique, risque maximal sur un voisinage de taille $1/\sqrt n$) et sortent du cadre du chapitre.

---

## 6. Liens avec les autres chapitres

**Prérequis :**
- **Ch.1 (Modèles statistiques)** : expérience statistique, $n$-échantillon, modèle produit ; modèle gaussien, $\bar X_n$, $S_n^2$, test et statistique de Student (loi exacte $t(n-1)$ sous hypothèse gaussienne) — l'Ex. 1.14 en est la version asymptotique sans hypothèse gaussienne ; l'exercice 6 de la semaine 1 et l'exercice 5 de la semaine 2 donnent des suites d'expériences non i.i.d.
- **Ch.2 (Estimation ponctuelle)** : estimateurs des moments (fonctions d'une moyenne empirique : cadre naturel LGN + continuité + TCL + méthode-δ), EMV (exponentiel, uniforme, Pareto) ; familles exponentielles (PC2) ; modèles de mélange (PC2, exo 6).
- **Ch.3 (Théorie de la décision)** : biais, EQM, décomposition biais-variance ; modèle régulier, **information de Fisher** et borne de Cramér-Rao — la variance asymptotique de l'EMV des modèles réguliers est $I(\theta)^{-1}$ (Ex. 1.7/1.9, PC6 Ex. 1, 2, 6) ; modèle uniforme non régulier (vitesse $n$, Ex. 1.2/1.5) ; exercice 1 de la semaine 3 ($\mathbb{E}_{n,\theta}[X_{n:n}]=\frac n{n+1}\theta$).
- **Ch.4 (Régions de confiance et tests)** : fonction pivotale (ici version asymptotique, Déf. 1.7), régions de confiance (Déf. 1.8), IC gaussien à $\sigma$ connu, inégalités de déviation (Bienaymé-Tchebychev), fonction puissance, taille, niveau (Déf. 1.9–1.10).
- **Ch.5 (Optimalité des tests)** : niveau/puissance ; ici remplacés par niveau asymptotique / consistance.

**Suites :**
- **Ch.7 (Théorie asymptotique des M- et Z-estimateurs)** : applique LGN, TCL, Slutsky, méthode-δ aux estimateurs définis comme maximiseurs / racines (non fonctions explicites d'une moyenne) ; consistance des M- et Z-estimateurs, LGN uniforme, **normalité asymptotique de l'EMV** de variance $I(\theta)^{-1}$ et son optimalité asymptotique (annoncée ici : « on retrouvera dans $v(\theta)$ … l'inverse de l'information de Fisher ») ; PC6 Ex. 7 (racines consistantes des équations de vraisemblance) en est un avant-goût ; comparaison des suites de tests consistantes (annoncée p. 33 et dans PC6 Ex. 3 : « nous verrons en PC7 »).
- **Ch.8–9 (apprentissage statistique, minimisation du risque empirique)** : LGN et inégalités de concentration réutilisées pour contrôler l'écart risque empirique / risque.

---

## 7. Idées de visualisations interactives pertinentes pour ce chapitre

1. **Consistance de $X_{n:n}$ (uniforme)** : histogramme de 2 000 réalisations de $\hat\theta_n$ avec curseur $n\in[5,2000]$, bande $[\theta-\varepsilon,\theta+\varepsilon]$ et fréquence hors bande comparée à $(1-\varepsilon/\theta)^n$ ; bascule « échelle $n(\theta-\hat\theta_n)$ » superposant la densité $\mathcal{E}(\theta^{-1})$ (Ex. 1.2/1.5, Figures 1–2).
2. **LGN : p.s. vs en probabilité** : une ou deux trajectoires $n\mapsto\bar X_n$, puis nuage de 100 valeurs à $n$ fixé qui se resserre ; question « quel mode de convergence est illustré ? » (animation p. 13).
3. **TCL interactif** : choix de la loi (Bernoulli$(\theta)$ avec $\theta$ petit, exponentielle, uniforme, Poisson), histogramme de 400 valeurs de $\sqrt n(\bar X_n-\mu)/\sigma$ vs densité $\mathcal{N}(0,1)$, avec affichage de l'écart de f.d.r. et de la borne de Berry-Esseen $0{,}4784\,\rho/(\sigma^3\sqrt n)$.
4. **Méthode-δ visuelle** : tracé de $g$ et de sa tangente en $\theta$, nuage de $T_n$ projeté par $g$ ; curseur sur $\theta$ montrant la dégénérescence quand $\dot g(\theta)=0$ ($g(x)=x^2$ en $\mu=0$ : passage à l'échelle $r_n^2$ et loi $\chi^2(1)$, Ex. 1.8).
5. **Wald vs Wilson vs arcsin** : 50 intervalles empilés (style Figures 3–4) avec curseurs $\theta\in\,]0,1[$, $n$, $\alpha$ ; courbe de probabilité de couverture **exacte** (calcul binomial) des trois IC en fonction de $\theta$ — met en évidence l'effondrement de Wald près de 0.
6. **Trois IC pour l'exponentiel (PC6 Ex. 1)** : $y_{\inf}$, $y_{\sup}$ en fonction de $z/\sqrt n$ pour Slutsky, $\ln$, inversion ; couverture simulée en fonction de $n$.
7. **Test de Student asymptotique / test du signe** : fonction puissance simulée $\mu\mapsto\beta_{\phi_n}(\mu)$ pour plusieurs $n$ et plusieurs lois (gaussienne, Laplace, Student à 3 ddl), montrant niveau $\to\alpha$ et consistance ; comparaison avec le test du signe (PC6 Ex. 3).
8. **Estimateur de Hodges** : courbe $\theta\mapsto n\,\mathbb{E}_{n,\theta}[(\tilde\theta_n-\theta)^2]$ (calcul exact gaussien ou Monte-Carlo) avec curseurs $n$, $b$, exposant de $a_n$ ; ligne $y=1$ de l'EMV ; trou $]ba_n,a_n[$ des valeurs jamais prises (Figure 5).
9. **Slutsky : contre-exemple du couple** : $X_n\sim\mathcal{N}(0,1)$, $Y_n=(-1)^nX_n$ — histogrammes marginaux stables mais loi de $X_n+Y_n$ qui alterne entre $\mathcal{N}(0,4)$ et $\delta_0$.
10. **Algorithme EM pour le mélange (PC6 Ex. 7)** : densité du mélange, histogramme, trajectoire $\theta_k$ de l'itération $\theta_{k+1}=\frac1n\sum_i\frac{\theta_kf_{1,i}}{\theta_kf_{1,i}+(1-\theta_k)f_{0,i}}$ depuis une initialisation réglable.
