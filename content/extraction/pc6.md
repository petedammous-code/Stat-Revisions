# PC 6 — Statistiques asymptotiques : consistance, normalité asymptotique, intervalles de confiance et tests asymptotiques (exponentiel, Pareto translaté, test du signe et de Student, Poisson, LGN et séries, estimateur de Hodges, racines des équations de vraisemblance)

> **Sources extraites :** `S6_APM-41033-EP-PC6-enonce` (6 p., énoncés p. 1–6, **pas de section « Rappels » séparée** : les rappels sont donnés dans le corps de chaque exercice) et `S6_APM-41033-EP-PC6-corrige` (21 p. de PDF, « Solutions », **p. 7–27** dans la pagination imprimée ; page PDF $k$ = page imprimée $k+6$). Toutes les formules ont été vérifiées visuellement sur les PDF. Les valeurs numériques ajoutées ici (applications numériques, lecture des figures) ont été recalculées (scipy) et sont signalées *(complément d'extraction)*.
> **Convention de citation :** « PC6 Ex. k Q. m ». Les résultats de cours sont cités « Poly ch.N, Déf./Th./Prop./Lemme/Ex. N.M » d'après les extractions `ch2.md`, `ch3.md`, `ch4.md`, `ch6.md`, `ch7.md`.
> **Rapport avec le poly :** le poly ch.6 **n'a pas de fichier « Exercices »** ; sa §1.13 (p. 35, « Le programme des exercices ») décrit exactement ces sept exercices comme « la feuille de la semaine ». Le corrigé officiel de la PC est donc la seule correction disponible. `ch6.md` §4 en contient un résumé ; **le présent fichier fait foi** pour la PC.
> **Passages en bleu du corrigé** (analyse numérique de l'Ex. 1, remarques de l'Ex. 2 Q3 et Q8, « Conclusion 1/2 » de l'Ex. 6, construction de la racine par dichotomie et question 7 de l'Ex. 7, etc.) : ce sont des compléments/commentaires du corrigé ; ils sont reproduits et signalés **(bleu)**.
> Quand un calcul n'est **pas** écrit dans le corrigé et a été complété ici, c'est signalé *(complément d'extraction)*. Rien n'a été inventé dans les corrigés officiels.

---

## 0. Chapitres du poly mobilisés et rappels donnés en tête d'énoncé

### 0.1 Rappels donnés dans l'énoncé (reproduits fidèlement)

**A. Loi exponentielle (Ex. 1, p. 1).** Modèle exponentiel $p_\theta:x\mapsto\theta\exp(-\theta x)\mathbb{1}_{\mathbb{R}_+}(x)$, $\theta\in\Theta:=\mathbb{R}^+_\star$. « On rappelle que »
$$\mathbb{E}_\theta[X]=\frac1\theta,\qquad\mathbb{E}_\theta\big[X^2\big]=\frac2{\theta^2},\qquad\mathrm{Var}_\theta(X^2)=\frac{20}{\theta^4}.$$
Le corrigé (p. 7) **démontre** ce rappel par intégration par parties : $\mathbb{E}_{n,\theta}[T_1(X_1)]=\theta\int_0^{+\infty}xe^{-\theta x}\mathrm{d}x=\frac1\theta$, $\mathbb{E}_{n,\theta}[T_2(X_1)]=\theta\int_0^{+\infty}x^2e^{-\theta x}\mathrm{d}x=\frac2{\theta^2}$, et $\mathbb{E}_{n,\theta}\big[X_1^4\big]=\theta\int_0^{+\infty}x^4e^{-\theta x}\mathrm{d}x=\frac{24}{\theta^4}$, donc $\mathrm{Var}_{n,\theta}\big(X_1^2\big)=\frac{24}{\theta^4}-\frac{4}{\theta^4}=\frac{20}{\theta^4}$.

**B. Famille exponentielle (Ex. 1 Q3, renvoi à la PC2).** Densité de la forme
$$x\mapsto h(x)\ \exp(T(x)\theta-A(\theta)),$$
ici $T(x)=-x$ et $A(\theta)=-\ln\theta$. « Nous avons établi en PC2 que $\hat\theta^{(1)}_n$ était aussi l'estimateur MV. »

**C. Loi de Pareto (Ex. 2, p. 2).** Densité par rapport à la mesure de Lebesgue
$$x\mapsto p_\theta(x)=\eta\,\alpha^\eta\,x^{-(\eta+1)}\,\mathbb{1}_{[\alpha,+\infty[}(x),\qquad\theta:=(\alpha,\eta)\in\mathbb{R}_*^+\times\mathbb{R}_*^+ .$$
« On rappelle que »
$$\mathbb{E}_\theta[X]=\frac{\eta}{\eta-1}\alpha,\qquad\mathrm{Var}_\theta(X)=\frac{\eta}{(\eta-1)^2(\eta-2)}\alpha^2\ ;$$
« de plus, sous $\mathbb{P}_\theta$, $\ln(X_1/\alpha)\sim\mathcal{E}(\eta)$ ; l'espérance et la variance d'une v.a. $\mathcal{E}(\eta)$ sont $1/\eta$ et $1/\eta^2$. »

> ⚠ **Convention exponentielle :** $\mathcal{E}(\eta)$ est paramétrée par son **intensité** (taux) : densité $x\mapsto\eta e^{-\eta x}\mathbb{1}_{\mathbb{R}_+}(x)$, moyenne $1/\eta$. Même convention que le modèle exponentiel de l'Ex. 1 ($p_\theta$, moyenne $1/\theta$) et que $\mathcal{E}(1)$ (Ex. 2 Q8), $\mathcal{E}(2)$ (Figure 5 du corrigé).
> ⚠ Les moments de Pareto rappelés n'existent que pour $\eta>1$ (espérance) et $\eta>2$ (variance) ; l'énoncé ne le précise pas, le corrigé le précise pour $\hat\alpha_n$ (« pour tout $n$ tel que $n\eta>2$ »).

**D. Modèle de translation (Ex. 3, note de bas de page 1, p. 3).** Hypothèses sur $q$ : symétrique par rapport à l'origine, continue, $q(0)>0$, variance $\sigma_q^2$ inconnue. Note 1 : « ces conditions entrainent que la médiane est unique et vaut zero, et que la fonction de répartition $F$ est strictement croissante dans un voisinage de 0. »

**E. Notation des quantiles (Figure 1, Ex. 1).** « On a noté $z_{1-\alpha/2}$ le quantile d'ordre $1-\alpha/2$ d'une loi $\mathcal{N}(0,1)$. »

**Figures de l'énoncé** (utiles pour des exercices visuels) :
- **Figure 1** (Ex. 1) : « Les intervalles de confiance asymptotiques sont de la forme $[\hat\theta^{(1)}_ny_{\inf},\hat\theta^{(1)}_ny_{\sup}]$. On trace les intervalles $[y_{\inf},y_{\sup}]$ en fonction de $z_{1-\alpha/2}/\sqrt n\in[0,0.25]$. » Trois bandes superposées (méthode 1 rose, méthode 2 bleue/pointillés, méthode 3 verte), toutes égales à 1 en 0 ; la bande de la méthode 3 est la plus haute.
- **Figure 2** (Ex. 6) : $\theta\mapsto n\mathbb{E}_{n,\theta}\big[(\tilde\theta_n-\theta)^2\big]$ pour $n=100,250,500$, $a_n=n^{-1/4}$, $b=0.25$, avec la droite $y=1$ (EMV). « On observera la forte oscillation au voisinage de 0. »
- **Figure 3** (Ex. 7) : « On prend $f_i\equiv\mathcal{N}(\mu_i,\sigma_i^2)$ ; $\theta_\star=0.3$, $\mu_0=-2$, $\mu_1=3$, $\sigma_0^2=2$, $\sigma_1^2=1$, $n=500$. (gauche) densité mélange $x\mapsto p_{\theta_\star}(x)$ ; (centre) histogramme non normalisé de $n=500$ observations ; (droite) En rouge, une trajectoire de l'algorithme Expectation Maximization, initialisée en $\theta_1=0.5$ ; en bleu, la valeur $\theta_\star$. »

### 0.2 Notations particulières de la feuille (à reproduire telles quelles) et correspondance avec le poly

| Notation PC 6 | Signification | Notation du poly ch.6 |
|---|---|---|
| $(\mathbb{R}^+_\star,\mathcal{B}(\mathbb{R}^+_\star),\{p_\theta\cdot\mathrm{Leb},\theta\in\Theta:=\mathbb{R}^+_\star\})$ | modèle dominé décrit par la densité $p_\theta$ par rapport à $\mathrm{Leb}$ | $\{\mathbb{Q}_\theta\}$, $q_\theta$ |
| $\mathbb{P}_{n,\theta}:=(p_\theta\cdot\mathrm{Leb})^{\otimes n}$ (Ex. 1) ; $\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n}$ (Ex. 3) | loi du $n$-échantillon | idem (Ex. 1.1) |
| $\mathbb{E}_{n,\theta}$, $\mathrm{Var}_{n,\theta}$ ; parfois $\mathbb{E}_\theta$, $\mathrm{Var}_\theta$, $\mathbb{E}_\eta$, $\mathbb{P}_{n,\eta}$ (Ex. 2, $\alpha$ connu) | espérance, variance sous $\mathbb{P}_{n,\theta}$ | idem |
| $\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}$ | convergence en loi sous $\mathbb{P}_{n,\theta}$ | Déf. 1.4 |
| $\xrightarrow{\mathbb{P}_{n,\theta}-\mathrm{prob}}$ | convergence en probabilité sous $\mathbb{P}_{n,\theta}$ | Déf. 1.2, Déf. 2.1 |
| $\mathrm{N}(0,\sigma^2)$ (droit, corrigé) / $\mathcal{N}(0,1)$ (énoncé) | loi gaussienne | $\mathcal{N}$ |
| $\mathcal{E}(\eta)$, $\mathcal{P}(n\lambda)$ | exponentielle d'**intensité** $\eta$ ; Poisson | idem |
| $T_1(x)=x$, $T_2(x)=x^2$ ; $\hat\theta^{(1)}_n$, $\hat\theta^{(2)}_n$ | moments utilisés ; estimateurs des moments associés | $\hat\theta_{n,1}$, $\hat\theta_{n,2}$ (ch.2 Ex. 1.4) |
| $\phi_1(t)=1/t$, $\phi_2(t)=\sqrt{2/t}$ | fonctions de la moyenne empirique (Ex. 1) | $\varphi$ (Ex. 1.3, 1.7) |
| $I_1(\theta)$ (Ex. 1), $I(\eta)$ (Ex. 2), $I_n(\theta)$ (Ex. 6) | information de Fisher d'**une** observation / de $n$ observations | $\mathbb{I}(\theta)$ (ch.3, ch.7) |
| $z_{1-\alpha/2}$, $z_{1-\alpha}$ | quantiles de $\mathrm{N}(0,1)$ | idem |
| $t_{1-\rho}$ (Ex. 2 Q4) | quantile d'ordre $1-\rho$ de $\mathrm{N}(0,1)$ | $z_{1-\rho}$ |
| $t_{1-\beta}$ (Ex. 2 Q8) | quantile d'ordre $1-\beta$ de $\mathcal{E}(1)$ — **même lettre $t$ pour deux lois différentes** | — |
| $Z_n:=(X_1,\cdots,X_n)$ ; $X_{1:n}:=\min_iX_i$ | observation ; minimum (statistique d'ordre) | $X_{1:n}$ |
| $\mathrm{L}_n(\eta,Z_n)$, $\ell_n$, $\dot\ell_n$, $\ddot\ell_n$ (Ex. 2) | vraisemblance, log-vraisemblance **non normalisée**, dérivées en $\eta$ | $L_n$, $\ell_n$ |
| $\hat\eta_n$ puis $\hat\eta^{(2)}_n$ (Ex. 2 Q5) | EMV de $\eta$ ($\alpha$ connu) / EMV de $\eta$ quand $\alpha$ inconnu ($\alpha$ remplacé par $\hat\alpha_n$) — l'énoncé écrit $\hat\eta_n$ dans les deux cas | — |
| $b_n(\theta)$ (Ex. 2 Q6) | biais de $\hat\alpha_n$ | $b(\theta)$ (ch.3 Déf. 1.1) |
| $F$, $e(\theta)$, $v(\theta)$ (Ex. 3) | f.d.r. de $q$ ; $e(\theta):=1-F(\theta_0-\theta)$, $v(\theta):=(1-e(\theta))e(\theta)$ | — |
| $M_n$, $B_n$, $T_n$, $S_n^2$ (Ex. 3) | statistique du signe, fréquence de signes, statistique de Student, **variance empirique normalisée par $n$** | $S_n^2$ normalisée par $n-1$ dans l'Ex. 1.14 ! |
| $\phi_{n,1}$, $\phi_{n,2}$ ; $\mathcal{R}_{n,1}$, $\mathcal{R}_{n,2}$ | tests ; zones de rejet | $\phi_n$, $R_{n,\alpha}$ |
| $\Phi$ | f.d.r. de $\mathrm{N}(0,1)$ | idem |
| $\mu$ (Ex. 4) | **mesure de comptage** sur $\mathbb{N}$ (pas une moyenne) | — |
| $\overline{X}_n$ / $\bar X_n$ | moyenne empirique (les deux graphies coexistent) | $\bar X_n$ |
| $\sigma^2(\theta):=\theta$, $\gamma(\theta):=\sqrt\theta\exp(-\theta)$, $G_n$ (Ex. 4) | variance asymptotique, écart-type asymptotique de $g(\bar X_n)$, pivot asymptotique | $v(\theta)$, $G_n$ (Déf. 1.7) |
| $H$ (Ex. 6) | fonction test continue bornée | $f$ (Déf. 1.4) |
| $R(\tilde\theta_n,\theta)$ (Ex. 6) | risque quadratique $\mathbb{E}_{n,\theta}[(\tilde\theta_n-\theta)^2]$ | ch.3 Déf. 1.3 |
| $\tau_n$, $\mathcal{V}_0$ (Ex. 6) | suite de paramètres $(b+1)a_n/2$ ; voisinage de 0 | — |
| $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:=p_\theta\cdot\mu\})$, $\mathbf{x}=(x_1,\dots,x_n)\in\mathsf{X}^n$ (Ex. 7) | modèle, point de $\mathsf{X}^n$ en **gras** | $\mathsf{X}$ |
| **Ha**, **Hb**, **Hc** (Ex. 7) | hypothèses : régularité $C^1$ et positivité ; intégrabilité du log-rapport ; identifiabilité | — |
| $\ell_n(\theta;X_1,\dots,X_n):=\sum_{i=1}^n\log p_\theta(X_i)$ (Ex. 7) | log-vraisemblance **non normalisée** (≠ ch.2 où $\ell_n$ est normalisée par $1/n$) | ch.2 Déf. 1.5 |
| $\partial_\theta\ell_n(\cdot,\mathbf{x})\vert_{t}$ | dérivée en $\theta$ évaluée en $t$ | — |
| $\check\theta^{(\varepsilon,\theta_0)}_n$ (Ex. 7) | racine construite dans $]\theta_0-\varepsilon,\theta_0+\varepsilon[$ | — |
| $e(\theta_0)$ (Ex. 7) | $\int\log\frac{p_{\theta_0}}{p_{\theta_0-\varepsilon}}\,p_{\theta_0}\,\mathrm{d}\mu$ = divergence de Kullback-Leibler (≠ $e(\theta)$ de l'Ex. 3 !) | $\mathrm{KL}$ (ch.2 Déf. 1.7) |
| $f_{0,i}:=f_0(x_i)$, $f_{1,i}:=f_1(x_i)$, $F(u,\theta)$, $G(\theta,\theta')$, $\mathsf{U}=\{0,1\}^n$ (Ex. 7 Q7) | notations de l'algorithme MM/EM | — |
| $\ln$ et $\log$ | logarithme népérien (les deux graphies coexistent) | idem |

### 0.3 Chapitres et résultats du poly mobilisés

La PC6 mobilise **principalement le ch.6 « Statistiques asymptotiques »**, mais aussi les ch.2 (estimation : moments, EMV, KL), ch.3 (biais-variance, Fisher, Cramér-Rao), ch.4 (pivots, tests) et anticipe le ch.7 (normalité asymptotique de l'EMV, « sera vu en PC7 »).

| Résultat du poly | Où il sert dans la PC6 |
|---|---|
| Poly ch.6, Déf. 1.1 / Ex. 1.1 (suite d'expériences, $n$-échantillons) | cadre de tous les exercices |
| Poly ch.6, Déf. 1.2 (consistance) | Ex. 1 Q2, 2 Q2/Q7, 4 Q2, 7 Q3/Q6 |
| Poly ch.6, Th. 1.1 et Th. 2.1 (théorème de continuité, convergence en probabilité) | Ex. 1 Q2, 2 Q2, 3 Q2, 4 Q2–Q3 |
| Poly ch.6, Th. 1.2 (LGN faible) ; Compléments Th. 4.2 (LGN i.i.d. intégrables) | Ex. 1, 2, 3, 4, 5, 7 Q1 |
| Poly ch.6, Déf. 1.4 (convergence en loi) ; Th. 1.3 (Portmanteau) | Ex. 3 (niveau, consistance), 5, 6 |
| Poly ch.6, Th. 1.4 (transformation continue) | Ex. 1 Q4 (bijection $\ln$), 6 |
| Poly ch.6, Th. 1.6 (TCL) | Ex. 1, 2, 3, 4, 6 |
| Poly ch.6, Lemme 1.1 (Slutsky) et Remarques | Ex. 1 Q4, 2 Q4/Q8, 3 Q2, 4 Q3, 6 Q2 |
| Poly ch.6, Th. 1.7 (méthode-δ scalaire) | Ex. 1 Q2/Q4, 2 Q3, 4 Q2 |
| Poly ch.6, Ex. 1.7 / Ex. 1.9 (EMV exponentiel, $\mathcal{N}(0,\theta^2)$) | Ex. 1 Q2 (identique) |
| Poly ch.6, Déf. 1.6 (normalité asymptotique) | Ex. 1, 2, 4, 6 |
| Poly ch.6, Déf. 1.7 (fonction asymptotiquement pivotale), Ex. 1.10 | Ex. 1 Q4, 2 Q4/Q8, 4 Q3 |
| Poly ch.6, Déf. 1.8 (région de confiance de niveau asymptotique), Méthode 1.1 | Ex. 1 Q4, 2 Q4, 4 Q3 |
| Poly ch.6, Ex. 1.11–1.13 (Wilson, Wald, stabilisation de la variance) | Ex. 1 Q4 (même trilogie pour l'exponentiel) |
| Poly ch.6, Prop. 1.3 (comparaison par la variance asymptotique) | Ex. 1 Q2, 6 Q3 |
| Poly ch.6, Ex. 1.2 / Ex. 1.5 (support de l'uniforme : vitesse $n$, limite exponentielle) | Ex. 2 Q6–Q8 (même phénomène) |
| Poly ch.6, Déf. 1.9–1.11 (taille, niveau asymptotique, consistance d'une suite de tests) | Ex. 3 |
| Poly ch.6, Ex. 1.14 (test de Student asymptotique, seuil auxiliaire $M$) | Ex. 3 Q2 (version unilatérale), Q1 (même technique) |
| Poly ch.6, Th. 2.2 (proba ⇒ loi ; loi vers une constante ⇔ proba) | Ex. 5, 6 (note 2 du corrigé) |
| Poly ch.6, Lemme 2.1 (Markov, Bienaymé-Tchebychev), Prop. 2.2 ($L^p$ ⇒ proba) | Ex. 2 Q7 |
| Poly ch.6, Compléments §4.5 (estimateur de Hodges) — *hors programme* | Ex. 6 |
| Poly ch.2, Déf. 1.2 / Méthode 1.1 (méthode des moments), Ex. 1.4 (deux estimateurs des moments du modèle exponentiel) | Ex. 1 Q1 |
| Poly ch.2, Déf. 1.4, Déf. 1.6, Méthode 1.2 (EMV, équations de vraisemblance), Lemme 2.3 (maximum d'une fonction strictement concave) | Ex. 2 Q1/Q5, 6 Q1, 7 Q5 |
| Poly ch.2, Déf. 1.7, Th. 1.1 (divergence de Kullback-Leibler, positivité, cas d'égalité), Prop. 1.3 (limite de la log-vraisemblance normalisée), Th. 2.2 (Jensen) | Ex. 7 Q1, Q7 |
| Poly ch.3, Prop. 1.1 (décomposition biais-variance) | Ex. 2 Q6 |
| Poly ch.3, Déf. 1.6 (modèle régulier), Déf. 1.8 / Prop. 1.2 (information de Fisher, formule par la dérivée seconde) | Ex. 1 Q3, 2 Q3, 6 |
| Poly ch.3, Cor. 1.3 (Cramér-Rao pour un $n$-échantillon), Déf. 1.10 (efficacité) | Ex. 6 (préambule) |
| Poly ch.4, Déf. 1.2 (fonction pivotale), Prop. 1.1 / Méthode 1.1 (région de confiance par un pivot) | Ex. 2 Q8 (pivot exact $\mathcal{E}(1)$) |
| Poly ch.4, Déf. 2.1–2.3 (test, puissance, taille, niveau) | Ex. 3 |
| Poly ch.1, Déf. 2 (identifiabilité) | Ex. 7 (Hc, Q6) |
| Poly ch.7, Th. 1.6 (normalité asymptotique de l'EMV, variance $1/\mathbb{I}$) ; Ex. 1.10 (Pareto) ; Déf. 4.1 (conjecture de Fisher, Hodges) | Ex. 1 Q3, 2 Q3 « méthode 2 (sera vu en PC7) », 2 Q5–Q8, 6 Q3, 7 |

### 0.4 Tableau des exercices

| Ex. | Titre (énoncé) | Difficulté | Modèle | Thèmes |
|---|---|---|---|---|
| 1 | Intervalles de confiance asymptotiques pour la loi exponentielle | (*) | $\mathcal{E}(\theta)$ | moments, consistance, TCL + δ, Fisher, 3 IC asymptotiques |
| 2 | Statistiques asymptotiques pour le modèle non régulier de Pareto translaté | (*) | Pareto $(\alpha,\eta)$ | EMV, δ-méthode, IC ; EMV de support, loi du min, vitesse $n$, pivot $\mathcal{E}(1)$ |
| 3 | Non unicité d'une suite de tests consistante | (*) | translation $q(\cdot-\theta)$ symétrique | test du signe, test de Student asymptotique, niveau asymptotique, consistance |
| 4 | Statistique asymptotique dans un modèle de Poisson | (*) | $\mathcal{P}(\theta)$ | TCL, δ-méthode pour $e^{-\theta}$, Slutsky, IC |
| 5 | LGN faible et limite de série | (*) | $\mathcal{P}(\lambda)$ (outil) | représentation probabiliste d'une série, LGN, convergence en loi |
| 6 | Estimateur de Hodges | (**) | $\mathcal{N}(\theta,1)$ | super-efficacité, convergence en loi vers une Dirac, Slutsky, risque non uniforme |
| 7 | Suite consistante d'estimateurs, racines des équations de vraisemblance | (***) | général puis mélange $(1-\theta)f_0+\theta f_1$ | KL + LGN, valeurs intermédiaires, dichotomie, mesurabilité, EM/MM |

### 0.5 Coquilles et imprécisions relevées dans les documents de la PC (à corriger dans le contenu pédagogique)

1. **Ex. 1, analyse numérique (bleu, p. 10)** : « Sur la figure 4, on affiche la fréquence associée à ces comptes » → il s'agit de la **Figure 5** (la Figure 4 trace les bornes).
2. **Ex. 2 Q5** : le corrigé note $\hat\eta^{(2)}_n$ l'EMV de $\eta$ quand $\alpha$ est inconnu ; l'énoncé l'appelle $\hat\eta_n$ (même lettre qu'en Q1–Q4, où $\alpha$ est connu).
3. **Ex. 2 Q8** : le corrigé écrit $\mathbb{P}_{n,\theta}\big(\alpha\in[\hat\alpha_ne^{-b/(n\hat\eta^{(2)}_n)},\hat\alpha_ne^{-a/(n\hat\eta^{(2)}_n)}]\big)=1-\beta$ ; l'égalité n'est **exacte** que si $\eta$ est connu (pivot exact) ; avec $\hat\eta^{(2)}_n$ c'est une **limite** quand $n\to\infty$ (couverture asymptotique $1-\beta$, comme le demande l'énoncé). Coquille « $\hat\alpha_n$ suis une loi de Pareto ».
4. **Ex. 2** : $t_{1-\rho}$ (Q4) désigne un quantile **gaussien**, $t_{1-\beta}$ (Q8) un quantile de **$\mathcal{E}(1)$** — même lettre.
5. **Ex. 3 Q1** : l'énoncé définit $\phi_{n,1}:=\mathbb{1}_{\{M_n\ge t_n\}}$ (inégalité large), le corrigé rejette quand $M_n>z_{1-\alpha}$ (stricte) — sans incidence asymptotique ($\mathrm{N}(0,1)$ ne charge pas $z_{1-\alpha}$).
6. **Ex. 3** : $S_n^2:=\frac1n\sum(X_k-\bar X_n)^2$ (normalisée par $n$), alors que l'Ex. 1.14 du poly normalise par $n-1$ — sans incidence asymptotique.
7. **Ex. 4** : le corrigé écrit « Notons $\mathbb{P}_{n,\theta}:=(p_\theta\cdot\mathrm{Leb})^{\otimes n}$ » → la mesure dominante est la **mesure de comptage** $\mu$ : $\mathbb{P}_{n,\theta}:=(p_\theta\cdot\mu)^{\otimes n}$. La consistance y est écrite sous la forme d'une convergence en loi vers une constante, $g(\overline{X}_n)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}g(\theta)$ (équivalente à la convergence en probabilité, Poly ch.6 Th. 2.2 (ii)).
8. **Ex. 6 Q3** : « La figure 3 montre le comportement de l'erreur quadratique » → c'est la figure (non numérotée) placée en tête de la p. 20 du corrigé, identique à la **Figure 2** de l'énoncé (la Figure 3 de l'énoncé concerne l'Ex. 7).
9. **Ex. 6 Conclusion 1 (bleu)** : « variance asymptotique égale et même strictement inférieure en au moins une valeur » n'est vrai que si $\lvert b\rvert<1$ (l'énoncé suppose seulement $b\ne1$ ; si $\lvert b\rvert>1$, $v(0)=b^2>1$).
10. **Ex. 6 Q2** : majorant « $(C+1)\mathbb{P}_{n,\theta}(\lvert\overline{X}_n\rvert<a_n)$ » : $2C$ suffit (sans incidence).
11. **Ex. 7 Q1** : « $\lim_n\mathbb{P}_{n,\theta_0}(0<\dots)>\lim_n\mathbb{P}_{n,\theta_0}(e(\theta_0)-\delta<\dots<e(\theta_0)+\delta)=1$ » → lire **$\ge$** (une probabilité ne peut dépasser 1).
12. **Ex. 7 Q2 (bleu)** : « $f$ est continue sur $]a,b[$ », « majorée par $b$ » → lire $]\theta_0-\varepsilon,\theta_0+\varepsilon[$ et $b_0$ ; note 3 : « vrai pour $n=0$ » → lire $j=0$. Le corrigé note la racine tantôt $\tilde\theta(\mathbf{x})$, tantôt $\tilde\theta_n(\mathbf{x})$, tantôt $\check\theta_n(\mathbf{x})$.
13. **Ex. 7 Q4** : renvoi « Voir PC1/exo3/qu8 et PC2/exo6 » : dans les feuilles 2025 extraites, la loi mélange est traitée en **PC1 Ex. 5 Q8** (complément « Loi mélange ») et l'estimation d'un coefficient de mélange en **PC2 Ex. 2** (la PC2 n'a que 5 exercices) — renvoi d'une ancienne numérotation *(remarque d'extraction)*.
14. **Ex. 7 Q7 d) (bleu)** : « $V_i$ suit une loi de Bernoulli de paramètre $\theta f\,f_{1,i}/\{\dots\}$ » → lire $\theta f_{1,i}/\{\theta f_{1,i}+(1-\theta)f_{0,i}\}$ ; les variables latentes sont notées $U_i$ en c) et $V_i$ en b)/d).

---

## 1. Exercices

### Exercice 1 — Intervalles de confiance asymptotiques pour la loi exponentielle ((*))

**Source :** Énoncé PC6, p. 1 ; Corrigé PC6, p. 7–10.

**Énoncé complet.** Soit une suite de $n$-échantillons du modèle statistique
$$\big(\mathbb{R}^+_\star,\ \mathcal{B}(\mathbb{R}^+_\star),\ \{p_\theta\cdot\mathrm{Leb},\ \theta\in\Theta:=\mathbb{R}^+_\star\}\big)$$
où (modèle exponentiel)
$$p_\theta:x\mapsto\theta\exp(-\theta x)\mathbb{1}_{\mathbb{R}_+}(x).$$
On rappelle que
$$\mathbb{E}_\theta[X]=\frac1\theta,\qquad\mathbb{E}_\theta\big[X^2\big]=\frac2{\theta^2},\qquad\mathrm{Var}_\theta(X^2)=\frac{20}{\theta^4}.$$
1. Construire les estimateurs de moments $\hat\theta^{(1)}_n$ et $\hat\theta^{(2)}_n$ associés aux fonctions $T_1(x)=x$ et $T_2(x)=x^2$.
2. Montrer que, pour $i=1,2$, les suites d'estimateurs $\{\hat\theta^{(i)}_n,n\in\mathbb{N}\}$ sont consistantes et asymptotiquement normales. Quel estimateur semble préférable d'un point de vue asymptotique ?
3. La loi exponentielle est un exemple de loi dans la famille dite *exponentielle* (voir PC2) i.e. sa densité est de la forme
$$x\mapsto h(x)\ \exp(T(x)\theta-A(\theta))$$
où ici $T(x)=-x$ et $A(\theta)=-\ln\theta$. Nous avons établi en PC2 que $\hat\theta^{(1)}_n$ était aussi l'estimateur MV. Calculer la (matrice d')information de Fisher de la loi d'une observation. Comment se compare-t-elle à la variance asymptotique de $\hat\theta^{(1)}_n$ ?
4. Proposer trois façons de construire des intervalles de confiance asymptotiques de niveau $1-\alpha$ à l'aide de l'estimateur identifié à la question précédente : on envisagera une méthode exploitant Slutsky, une méthode exploitant la méthode-$\delta$ (technique de *stabilisation de la variance*) et une méthode qui s'avère exploitable dans ce cas précis. *Voir la figure 1.*

**Corrigé complet question par question.** Notons $\mathbb{P}_{n,\theta}:=(p_\theta\cdot\mathrm{Leb})^{\otimes n}$. *(Démonstration du rappel : voir §0.1 A.)*

**Q1.** En utilisant le rappel, les estimateurs des moments associés aux statistiques $T_1(X)$ et $T_2(X)$ sont respectivement solutions des équations en $\theta$
$$\frac1\theta=\frac1n\sum_{k=1}^nX_k,\qquad\frac2{\theta^2}=\frac1n\sum_{k=1}^nX_k^2 .$$
Donc
$$\hat\theta^{(1)}_n=\frac1{n^{-1}\sum_{i=1}^nX_i}\qquad\text{et}\qquad\hat\theta^{(2)}_n=\sqrt{\frac2{n^{-1}\sum_{i=1}^nX_i^2}}.$$
*(Justification de l'unicité, Poly ch.2 Ex. 1.4 : $\vartheta\mapsto1/\vartheta$ et $\vartheta\mapsto2/\vartheta^2$ sont strictement monotones sur $\mathbb{R}^+_\star$, et les observations sont p.s. non toutes nulles.)*

**Q2.**
1. *Écriture comme fonction d'une moyenne empirique.*
$$\hat\theta^{(1)}_n=\phi_1\Big(n^{-1}\sum_{i=1}^nX_i\Big),\qquad\hat\theta^{(2)}_n=\phi_2\Big(n^{-1}\sum_{i=1}^nX_i^2\Big),$$
avec $\phi_1(t)=1/t$ définie sur $\mathbb{R}^+_\star$ et $\phi_2(t)=\sqrt{2/t}$ définie sur $\mathbb{R}^+_\star$. Sous $\mathbb{P}_{n,\theta}$, $X_1,\dots,X_n$ sont i.i.d. d'espérance $1/\theta$ et de variance $1/\theta^2$ : la LGN faible et le TCL s'appliquent.
2. *Consistance.* **Par la LGN** (Poly ch.6 Th. 1.2) :
$$\frac1n\sum_{k=1}^nX_k\xrightarrow{\mathbb{P}_{n,\theta}-\mathrm{prob}}\frac1\theta,\qquad\frac1n\sum_{k=1}^nX_k^2\xrightarrow{\mathbb{P}_{n,\theta}-\mathrm{prob}}\frac2{\theta^2},$$
et **la convergence en probabilité est stable par transformation continue** (Poly ch.6 Th. 1.1) :
$$\phi_1\Big(\frac1n\sum_{k=1}^nX_k\Big)\xrightarrow{\mathbb{P}_{n,\theta}-\mathrm{prob}}\phi_1\Big(\frac1\theta\Big)=\theta,\qquad\phi_2\Big(\frac1n\sum_{k=1}^nX_k^2\Big)\xrightarrow{\mathbb{P}_{n,\theta}-\mathrm{prob}}\phi_2\Big(\frac2{\theta^2}\Big)=\theta,$$
ce qui prouve la consistance pour $i=1,2$.
3. *Normalité asymptotique de $\hat\theta^{(1)}_n$.* **Par le TCL** (Poly ch.6 Th. 1.6) :
$$\sqrt n\Big(\frac1n\sum_{i=1}^nX_i-\frac1\theta\Big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\Big(0,\frac1{\theta^2}\Big).$$
**Méthode-δ** (Poly ch.6 Th. 1.7) avec $\phi_1$ dérivable sur $\mathbb{R}^+_\star$ :
$$\sqrt n\Big(\phi_1\Big(\frac1n\sum_{i=1}^nX_i\Big)-\phi_1\Big(\frac1\theta\Big)\Big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\Big(0,\frac1{\theta^2}\Big(\phi_1'\Big(\frac1\theta\Big)\Big)^2\Big),$$
soit, avec $\phi_1'(1/\theta)=-\theta^2$ :
$$\sqrt n\big(\hat\theta^{(1)}_n-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\big(0,\theta^2\big).$$
(C'est exactement l'Ex. 1.7 / Ex. 1.9 du Poly ch.6.)
4. *Normalité asymptotique de $\hat\theta^{(2)}_n$.* **TCL** (les $X_i^2$ sont i.i.d. de variance $20/\theta^4$, rappel) :
$$\sqrt n\Big(\frac1n\sum_{i=1}^nX_i^2-\frac2{\theta^2}\Big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\Big(0,\frac{20}{\theta^4}\Big).$$
**Méthode-δ** avec $\phi_2(x)=\sqrt{2/x}$ dérivable sur $\mathbb{R}^+_\star$ :
$$\sqrt n\Big(\phi_2\Big(\frac1n\sum_{i=1}^nX_i^2\Big)-\phi_2\Big(\frac2{\theta^2}\Big)\Big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\Big(0,\frac{20}{\theta^4}\Big(\phi_2'\Big(\frac2{\theta^2}\Big)\Big)^2\Big),$$
autrement dit
$$\sqrt n\big(\hat\theta^{(2)}_n-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\Big(0,\frac54\theta^2\Big).$$
*(Complément d'extraction, calcul non écrit dans le corrigé : $\phi_2'(t)=-\frac{\sqrt2}{2}t^{-3/2}$, donc $\phi_2'(2/\theta^2)=-\frac{\sqrt2}2\cdot\frac{\theta^3}{2\sqrt2}=-\frac{\theta^3}4$, $(\phi_2')^2=\frac{\theta^6}{16}$ et $\frac{20}{\theta^4}\cdot\frac{\theta^6}{16}=\frac54\theta^2$.)*
5. *Comparaison.* Les deux estimateurs sont asymptotiquement gaussiens, ils convergent vers $\theta$ à la vitesse $\sqrt n$, mais la variance asymptotique de $\hat\theta^{(1)}_n$ ($\theta^2$) est inférieure à celle de $\hat\theta^{(2)}_n$ ($\frac54\theta^2$). La loi de $\hat\theta^{(1)}_n$ est donc asymptotiquement plus concentrée autour de $\theta$ : **$\hat\theta^{(1)}_n$ semble préférable** (critère de Poly ch.6 Prop. 1.3 : rapport des longueurs d'IC $\to\sqrt{v_1/v_2}=2/\sqrt5\approx0.894$, *complément d'extraction*).

**Q3.** La log-vraisemblance d'une observation est
$$\theta\mapsto\ln(\theta)-\theta X_1$$
sur $\theta>0$, et $-\infty$ sinon. Dérivées première et seconde :
$$\frac1\theta-X_1,\qquad-\frac1{\theta^2}.$$
En utilisant que $I_1(\theta):=-\mathbb{E}_\theta\big[(\ln p_\theta(X))''\big]$ où la dérivée est prise en $\theta$ (Poly ch.3 Prop. 1.2, formule par la dérivée seconde) :
$$I_1(\theta)=\frac1{\theta^2}.$$
**La variance asymptotique dans le TCL pour $\hat\theta^{(1)}_n$ est donc l'inverse de l'information de Fisher d'une observation** : $\theta^2=I_1(\theta)^{-1}$ (cohérent avec Poly ch.7 Th. 1.6, normalité asymptotique de l'EMV).

**Q4.** Notons $z_{1-\alpha/2}$ le quantile d'ordre $1-\alpha/2$ de $\mathrm{N}(0,1)$.

*Méthode 1 (Slutsky).* $\hat\theta^{(1)}_n\to\theta$ en probabilité (Q2) ; **par le lemme de Slutsky** (Poly ch.6 Lemme 1.1 (iii)) appliqué à $\sqrt n(\hat\theta^{(1)}_n-\theta)\Rightarrow\mathrm{N}(0,\theta^2)$ et à $\hat\theta^{(1)}_n\to\theta$ :
$$\sqrt n\big(\hat\theta^{(1)}_n\big)^{-1}\big(\hat\theta^{(1)}_n-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1).$$
Puisque $\mathbb{P}(W\in[-z_{1-\alpha/2},z_{1-\alpha/2}])=1-\alpha$ pour $W\sim\mathrm{N}(0,1)$, on déduit de la convergence en loi (Portmanteau, $\mathrm{N}(0,1)$ ne charge pas les bornes) :
$$\lim_n\mathbb{P}_{n,\theta}\Big(\sqrt n\big(\hat\theta^{(1)}_n\big)^{-1}\big(\hat\theta^{(1)}_n-\theta\big)\in\big[-z_{1-\alpha/2},z_{1-\alpha/2}\big]\Big)=1-\alpha,$$
soit de façon équivalente
$$\lim_n\mathbb{P}_{n,\theta}\Big(\theta\in\Big[\hat\theta^{(1)}_n\Big(1-\frac{z_{1-\alpha/2}}{\sqrt n}\Big);\ \hat\theta^{(1)}_n\Big(1+\frac{z_{1-\alpha/2}}{\sqrt n}\Big)\Big]\Big)=1-\alpha.$$
(C'est la **Méthode 1.1** du Poly ch.6 avec $v(\theta)=\theta^2$ : analogue de l'intervalle de Wald, Ex. 1.12.)

*Méthode 2 (méthode-δ, stabilisation de la variance).* Soit $g$ une fonction $C^1$ sur $\mathbb{R}^+_\star$. **Par la méthode-δ** :
$$\sqrt n\big(g(\hat\theta^{(1)}_n)-g(\theta)\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\big(0,(g'(\theta))^2\theta^2\big).$$
On choisit $g$ telle que la variance limite soit la constante 1 : $g'(\theta)=1/\theta$, ce qui donne $g(\theta)=A+\ln\theta$ (disons $A=0$). Par suite
$$\sqrt n\big(\ln\hat\theta^{(1)}_n-\ln\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1),$$
d'où un IC asymptotique pour $\ln\theta$ :
$$\lim_n\mathbb{P}_{n,\theta}\Big(\sqrt n\big(\ln\hat\theta^{(1)}_n-\ln\theta\big)\in\big[-z_{1-\alpha/2},z_{1-\alpha/2}\big]\Big)=1-\alpha,$$
puis, **par la bijection** $\theta\mapsto\ln\theta$, un IC asymptotique pour $\theta$ :
$$\Big[\hat\theta^{(1)}_n\exp\Big(-\frac{z_{1-\alpha/2}}{\sqrt n}\Big);\ \hat\theta^{(1)}_n\exp\Big(\frac{z_{1-\alpha/2}}{\sqrt n}\Big)\Big].$$
(Analogue de Poly ch.6 Ex. 1.13, où $g=\arcsin\sqrt{\cdot}$ pour Bernoulli ; le poly cite explicitement cet exercice, $g=\ln$.)

*Méthode 3 (inversion directe du pivot, exploitable « dans ce cas précis »).* On a aussi (normalisation par l'écart-type asymptotique **exact** $\theta$, Poly ch.6 Ex. 1.10)
$$\sqrt n\,\frac{\hat\theta^{(1)}_n-\theta}{\theta}\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1),$$
dont on déduit que
$$\lim_n\mathbb{P}_{n,\theta}\Big(-z_{1-\alpha/2}\le\sqrt n\Big(\frac{\hat\theta^{(1)}_n}\theta-1\Big)\le z_{1-\alpha/2}\Big)=1-\alpha.$$
En résolvant en $\theta$ (pour $z_{1-\alpha/2}/\sqrt n<1$), un troisième IC asymptotique est
$$\left[\frac{\hat\theta^{(1)}_n}{1+\frac{z_{1-\alpha/2}}{\sqrt n}},\ \frac{\hat\theta^{(1)}_n}{1-\frac{z_{1-\alpha/2}}{\sqrt n}}\right].$$
(Analogue de l'intervalle de Wilson, Poly ch.6 Ex. 1.11 : on résout l'inégalité du pivot sans estimer la variance.)

*Analyse numérique* **(bleu, p. 9–10)**. Dans cet exemple, les trois IC sont de la forme $[\hat\theta^{(1)}_ny_{\inf},\hat\theta^{(1)}_ny_{\sup}]$ pour trois expressions différentes de $y_{\inf},y_{\sup}$ **indépendantes de l'estimateur**. Figure 4 [gauche] : $y_{\inf}$ des trois méthodes en fonction de $x=z_{1-\alpha/2}/\sqrt n\in[0,1/2]$ ; [centre] : $y_{\sup}$ ; [droite] : $y_{\sup}-y_{\inf}$. « Dans cet exemple, l'approche par Slutsky reste préférable à celle par méthode-δ. Néanmoins, pour des situations moins triviales que l'estimation de l'espérance d'une loi exponentielle : l'avantage de la méthode 2 est qu'elle n'introduit pas un aléa supplémentaire (celui de l'approximation de la variance limite par Slutsky) dans le calcul de l'Intervalle de Confiance ; d'un autre côté, elle nécessite de savoir trouver la transformation $g$ et l'inverser. Quant à la méthode 3, elle reste faisable ici mais là aussi elle nécessite d'inverser une fonction et la solution exacte n'est pas toujours accessible. » Simulation (Figure 5) : 2000 réalisations de $\hat\theta^{(1)}_n$ sous $\mathbb{P}_{n,2}$ ; pour chaque méthode, 2000 IC de niveau 95 % ; on affiche la fréquence de ceux qui contiennent $\theta=2$ en fonction de $n$ (observations i.i.d. $\mathcal{E}(2)$).

**Méthodes mobilisées :** méthode des moments (deux choix de $T$) ; calcul de moments par intégration par parties ; LGN + théorème de continuité (consistance) ; TCL + méthode-δ (normalité asymptotique) ; comparaison par la variance asymptotique ; information de Fisher par la dérivée seconde ; IC asymptotique par Slutsky (variance estimée) ; IC par stabilisation de la variance ($g=\ln$) puis bijection ; IC par inversion exacte du pivot asymptotique.

**Pièges relevés / remarques du corrigé :**
- Dans la méthode-δ, $\phi'$ est évaluée **au point limite de la moyenne empirique** ($1/\theta$ ou $2/\theta^2$), pas en $\theta$.
- Il y a **plusieurs** estimateurs des moments (un par fonction $T$) ; utiliser un moment d'ordre plus élevé ($x^2$) augmente la variance asymptotique.
- La méthode 3 exige $z_{1-\alpha/2}/\sqrt n<1$ pour que la borne supérieure soit finie et positive *(remarque d'extraction)*.
- Les trois IC ont **le même niveau asymptotique** mais des comportements différents à $n$ fini : l'asymptotique ne dit rien de la couverture à $n$ donné (Poly ch.6 Déf. 1.8).
- La variance asymptotique de l'EMV est $I_1(\theta)^{-1}$ : **c'est la variance de $\sqrt n(\hat\theta_n-\theta)$**, pas de $\hat\theta_n$.

**Résultats numériques :**
- Variances asymptotiques : $v_1(\theta)=\theta^2$, $v_2(\theta)=\frac54\theta^2$ ; $I_1(\theta)=\theta^{-2}$ ; $\mathbb{E}_\theta[X^4]=24/\theta^4$.
- Bornes $[y_{\inf},y_{\sup}]$ en fonction de $x=z_{1-\alpha/2}/\sqrt n$ *(complément d'extraction, recalculées ; cohérentes avec la Figure 4)* :

| $x$ | Méthode 1 (Slutsky) $[1-x,1+x]$ | Méthode 2 ($\ln$) $[e^{-x},e^{x}]$ | Méthode 3 (inversion) $[\frac1{1+x},\frac1{1-x}]$ |
|---|---|---|---|
| $0.1$ | $[0.900;\ 1.100]$ | $[0.905;\ 1.105]$ | $[0.909;\ 1.111]$ |
| $0.196$ ($n=100$, 95 %) | $[0.804;\ 1.196]$ | $[0.822;\ 1.217]$ | $[0.836;\ 1.244]$ |
| $0.25$ | $[0.750;\ 1.250]$ | $[0.779;\ 1.284]$ | $[0.800;\ 1.333]$ |
| $0.5$ | $[0.500;\ 1.500]$ | $[0.607;\ 1.649]$ | $[0.667;\ 2.000]$ |

  Longueurs relatives à $x=0.5$ : 1 (méthode 1) ; $\approx1.042$ (méthode 2) ; $\approx1.333$ (méthode 3) — la méthode 1 donne l'intervalle le plus court, la méthode 3 le plus long et le plus décalé vers le haut (Figure 4 droite).
- Exemple *(complément d'extraction)* : $n=100$, $\hat\theta^{(1)}_n=2$, $\alpha=5\%$ ($z_{0.975}\approx1.960$) : méthode 1 $[1.608;\ 2.392]$ ; méthode 2 $[1.644;\ 2.433]$ ; méthode 3 $[1.672;\ 2.488]$.
- Figure 5 (lecture graphique) : couverture empirique des trois méthodes autour de 94–96 % dès $n\gtrsim200$ ; pour les petits $n$, la **méthode 3** (tirets-points noirs) descend vers $\approx90\%$, la méthode 1 (trait bleu) reste vers 95 %.

---

### Exercice 2 — Statistiques asymptotiques pour le modèle non régulier de Pareto translaté ((*))

**Source :** Énoncé PC6, p. 2 ; Corrigé PC6, p. 11–13.

**Énoncé complet.** La loi de Pareto est couramment utilisée pour modéliser des variables à queues lourdes. Cette loi a pour densité
$$x\mapsto p_\theta(x)=\eta\,\alpha^\eta\,x^{-(\eta+1)}\,\mathbb{1}_{[\alpha,+\infty[}(x),\qquad\theta:=(\alpha,\eta)\in\mathbb{R}_*^+\times\mathbb{R}_*^+,$$
par rapport à la mesure de Lebesgue. On rappelle que
$$\mathbb{E}_\theta[X]=\frac{\eta}{\eta-1}\alpha,\qquad\mathrm{Var}_\theta(X)=\frac{\eta}{(\eta-1)^2(\eta-2)}\alpha^2\ ;$$
de plus, sous $\mathbb{P}_\theta$, $\ln(X_1/\alpha)\sim\mathcal{E}(\eta)$ ; l'espérance et la variance d'une v.a. $\mathcal{E}(\eta)$ sont $1/\eta$ et $1/\eta^2$.

Soit une suite de $n$-échantillons, d'un modèle $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta\cdot\mathrm{Leb},\theta\in\Theta:=\mathbb{R}_*^+\times\mathbb{R}_*^+\})$. Dans la première partie de l'exercice, on suppose $\alpha$ connu. On peut alors vérifier que le modèle est régulier.
1. Déterminer l'estimateur $\hat\eta_n$ du maximum de vraisemblance de $\eta$.
2. Montrer que la suite d'estimateurs $\{\hat\eta_n,n\in\mathbb{N}\}$ est consistante.
3. Montrer que la suite d'estimateurs $\{\hat\eta_n,n\in\mathbb{N}\}$ est asymptotiquement normale.
4. Construire un intervalle de confiance de probabilité de couverture asymptotique $1-\rho$ pour le paramètre $\eta$.

On suppose maintenant que $\alpha$ est aussi un paramètre inconnu.

5. Déterminer l'estimateur du maximum de vraisemblance de $(\alpha,\eta)$ ; on le notera $(\hat\alpha_n,\hat\eta_n)$.
6. Montrer que, pour tout $\theta=(\alpha,\eta)$, nous avons
$$\mathbb{P}_{n,\theta}(\hat\alpha_n>y)=\Big(\frac\alpha y\Big)^{n\eta},\qquad\forall y\ge\alpha.$$
Déterminer la moyenne et la variance de $\hat\alpha_n$ (on prendra $n$ suffisamment grand) sous $\mathbb{P}_{n,\theta}$. En déduire l'erreur quadratique de cet estimateur et en donner un équivalent lorsque $n\to\infty$ ; commenter.
7. Montrer que $\{\hat\alpha_n,n\ge1\}$ est une suite d'estimateurs consistante pour $\alpha$. En déduire que $\{\hat\eta_n,n\ge1\}$ est une suite d'estimateurs consistante pour $\eta$.
8. Déterminer la loi de $n\eta\ln(\hat\alpha_n/\alpha)$ sous $\mathbb{P}_{n,\theta}$. En déduire une **fonction pivotale asymptotique** pour $\alpha$. Construire un intervalle de confiance de probabilité de couverture asymptotique $(1-\beta)$ du paramètre $\alpha$.

**Corrigé complet question par question.** Soit $Z_n:=(X_1,\cdots,X_n)$.

**Q1.**
1. *Vraisemblance* (produit des densités, **indépendance**) :
$$\eta\mapsto\mathrm{L}_n(\eta,Z_n)=\eta^n\alpha^{n\eta}\Big(\prod_{i=1}^nX_i\Big)^{-(\eta+1)}\mathbb{1}_{\{X_{1:n}>\alpha\}},\qquad X_{1:n}:=\min_iX_i .$$
2. *Log-vraisemblance et dérivées*, pour tout $Z_n$ tel que $X_{1:n}>\alpha$ :
$$\begin{aligned}
\eta\mapsto\ell_n(\eta,Z_n)&=n\ln(\eta)+n\eta\ln(\alpha)-(\eta+1)\sum_{i=1}^n\ln(X_i)\\
\eta\mapsto\dot\ell_n(\eta,Z_n)&=\frac n\eta-\sum_{i=1}^n\ln(X_i/\alpha)\\
\eta\mapsto\ddot\ell_n(\eta,Z_n)&=-\frac n{\eta^2}<0.
\end{aligned}$$
3. *Comportement aux bords.* Lorsque $\eta\to0$, $\ell_n(\eta,Z_n)\to-\infty$ ; lorsque $\eta\to+\infty$, $\eta\mapsto\ell_n(\eta,Z_n)$ se comporte comme $\eta\mapsto-\eta\sum_{i=1}^n\ln(X_i/\alpha)$ qui tend vers $-\infty$ puisque $X_i>\alpha$.
4. *Conclusion.* $\ell_n$ est **strictement concave** ($\ddot\ell_n<0$), donc le maximum existe et est unique (Poly ch.2 Lemme 2.3), donné par **l'annulation du score** :
$$\hat\eta_n:=\Big(\frac1n\sum_{i=1}^n\ln(X_i/\alpha)\Big)^{-1}.$$

**Q2.** On démontre (par la technique « de la fonction muette » combinée avec un changement de variable) que $\ln(X_1/\alpha)\sim\mathcal{E}(\eta)$, donc d'espérance $1/\eta$. **La LGN faible** assure
$$\frac1n\sum_{i=1}^n\ln(X_i/\alpha)\xrightarrow{\mathbb{P}_{n,\eta}-\mathrm{prob}}1/\eta,$$
puis on a la consistance **par stabilité de cette limite sous transformation par la fonction continue** $u\mapsto1/u$ définie sur $\mathbb{R}^+_\star$ (Poly ch.6 Th. 1.1).
*(Complément d'extraction — la fonction muette : pour $h$ mesurable bornée, $\mathbb{E}_\theta[h(\ln(X_1/\alpha))]=\int_\alpha^{+\infty}h(\ln(x/\alpha))\eta\alpha^\eta x^{-(\eta+1)}\mathrm{d}x$ ; avec $u=\ln(x/\alpha)$, $x=\alpha e^u$, $\mathrm{d}x=\alpha e^u\mathrm{d}u$ : $=\int_0^{+\infty}h(u)\,\eta e^{-\eta u}\mathrm{d}u$.)*

**Q3.** Deux façons de répondre.

*Méthode 1 (méthode-δ).* **Par le TCL** pour des variables i.i.d. de variance finie :
$$\sqrt n\Big(\frac1n\sum_{i=1}^n\ln(X_i/\alpha)-\mathbb{E}_\eta[\ln(X_1/\alpha)]\Big)\overset{\mathbb{P}_{n,\eta}}{\Longrightarrow}\mathrm{N}\big(0,\mathrm{Var}_\eta(\ln(X_1/\alpha))\big),$$
soit, puisque $\ln(X_1/\alpha)\sim\mathcal{E}(\eta)$ sous $\mathbb{P}_\eta$,
$$\sqrt n\Big(\frac1n\sum_{i=1}^n\ln(X_i/\alpha)-\frac1\eta\Big)\overset{\mathbb{P}_{n,\eta}}{\Longrightarrow}\mathrm{N}\Big(0,\frac1{\eta^2}\Big).$$
Puisque $g:t\mapsto1/t$ est $C^1$ sur $\mathbb{R}^+_\star$, **la méthode-δ** entraîne ($g'(1/\eta)^2=\eta^4$)
$$\sqrt n\,(\hat\eta_n-\eta)\overset{\mathbb{P}_{n,\eta}}{\Longrightarrow}\mathrm{N}(0,\eta^2).$$

*Méthode 2 (sera vu en PC7)* : résultat du cours sur la normalité asymptotique de l'EMV, puisque le modèle est régulier ($\alpha$ connu, le paramètre du modèle est $\eta$ ; Poly ch.7 Th. 1.6). Information de Fisher **associée à une seule observation (bleu)**, par la formule qui exploite la dérivée seconde de la log-vraisemblance :
$$I(\eta):=-\int\ddot\ell_1(\eta,x)\,p_\eta(x)\,\mathrm{d}x=\eta^{-2}.$$
« **Attention, nous avons $n=1$ puisque c'est l'information associée à une seule observation** » **(bleu)**. Ainsi
$$\sqrt n(\hat\eta_n-\eta)\overset{\mathbb{P}_{n,\eta}}{\Longrightarrow}\mathrm{N}(0,\eta^2).$$

**Q4.** De la normalité asymptotique et **du lemme de Slutsky** ($\hat\eta_n\to\eta$ en probabilité, Q2), on déduit une fonction pivotale asymptotique
$$\sqrt n\,\frac{\hat\eta_n-\eta}{\hat\eta_n}\overset{\mathbb{P}_{n,\eta}}{\Longrightarrow}\mathrm{N}(0,1).$$
Soit $t_{1-\rho}$ le quantile d'ordre $1-\rho$ de $\mathrm{N}(0,1)$. Pour un intervalle bilatéral symétrique :
$$\eta\in\Big[\hat\eta_n\Big(1-\frac{t_{1-\rho/2}}{\sqrt n}\Big);\ \hat\eta_n\Big(1+\frac{t_{1-\rho/2}}{\sqrt n}\Big)\Big].\tag{2}$$
On aurait également pu utiliser la fonction pivotale asymptotique
$$\sqrt n\,\frac{\hat\eta_n-\eta}{\eta}\overset{\mathbb{P}_{n,\eta}}{\Longrightarrow}\mathrm{N}(0,1),$$
qui conduit à l'intervalle
$$\eta\in\Big[\hat\eta_n\Big(1+\frac{t_{1-\rho/2}}{\sqrt n}\Big)^{-1},\ \hat\eta_n\Big(1-\frac{t_{1-\rho/2}}{\sqrt n}\Big)^{-1}\Big].\tag{3}$$
Voir l'exercice 1 pour une comparaison analogue des IC (2) et (3) (méthodes 1 et 3).

**Q5.** On a $\mathrm{L}_n(\alpha,\eta,Z_n)\le\mathrm{L}_n(\min X_i,\eta,Z_n)$ pour tout $\eta$ positif *(justification, complément d'extraction : à $\eta$ fixé, $\alpha\mapsto\alpha^{n\eta}\mathbb{1}_{\{\alpha\le X_{1:n}\}}$ est croissante sur $]0,X_{1:n}]$ et nulle au-delà ; cf. Poly ch.7 Ex. 1.10)*. Donc
$$\hat\alpha_n=X_{1:n}\qquad\text{et}\qquad\hat\eta^{(2)}_n=\Big(\frac1n\sum_{i=1}^n\ln(X_i/\hat\alpha_n)\Big)^{-1}.$$
(Maximisation **en deux temps** : d'abord en $\alpha$ par monotonie — **pas** par annulation du score —, puis en $\eta$ comme en Q1 avec $\alpha$ remplacé par $\hat\alpha_n$.)

**Q6.**
1. *Loi du minimum* (« calcul standard ») : pour $y>\alpha$ (puisque $\hat\alpha_n\ge\alpha$, vu que $X_k\ge\alpha$ pour tout $k$), **par indépendance et identité des lois**
$$\mathbb{P}_{n,\theta}(\hat\alpha_n>y)=\mathbb{P}_{n,\theta}(X_1>y)^n=\Big(\frac\alpha y\Big)^{n\eta}.$$
*(Complément d'extraction : $\mathbb{P}_\theta(X_1>y)=\int_y^{+\infty}\eta\alpha^\eta x^{-(\eta+1)}\mathrm{d}x=(\alpha/y)^\eta$.)*
2. *Densité* (dérivation de la f.d.r.) :
$$y\mapsto n\eta\,\alpha^{n\eta}\,y^{-(n\eta+1)}\mathbb{1}_{\{y>\alpha\}},$$
**on reconnaît une loi de Pareto de paramètres $(\alpha,n\eta)$**.
3. *Moyenne et variance* (rappel avec $\eta\leftarrow n\eta$), pour tout $n$ tel que $n\eta>2$ :
$$\mathbb{E}_{n,\theta}[\hat\alpha_n]=\frac{n\eta}{n\eta-1}\alpha,\qquad\mathrm{Var}_{n,\theta}(\hat\alpha_n)=\frac{n\eta}{(n\eta-2)(n\eta-1)^2}\alpha^2.$$
4. *Erreur quadratique* : **décomposition biais-variance** (Poly ch.3 Prop. 1.1) :
$$\mathbb{E}_{n,\theta}\big[(\hat\alpha_n-\alpha)^2\big]=\big(b_n(\theta)^2+\mathrm{Var}_{n,\theta}(\hat\alpha_n)\big)=O(n^{-2})\to0.$$
*(Complément d'extraction, calcul exact non écrit dans le corrigé : $b_n(\theta)=\frac{\alpha}{n\eta-1}>0$ et*
$$\mathbb{E}_{n,\theta}\big[(\hat\alpha_n-\alpha)^2\big]=\frac{\alpha^2}{(n\eta-1)^2}+\frac{n\eta\,\alpha^2}{(n\eta-2)(n\eta-1)^2}=\frac{2\alpha^2}{(n\eta-1)(n\eta-2)}\underset{n\to\infty}{\sim}\frac{2\alpha^2}{n^2\eta^2}.)$$
*Commentaire* (donné par le corrigé en fin de Q8, **bleu**) : l'EQM est en $O(1/n^2)$, alors que dans un modèle régulier elle est en $1/n$ : la vitesse de convergence de $\hat\alpha_n$ est $n$ et non $\sqrt n$ ; le biais est positif ($\hat\alpha_n\ge\alpha$ toujours).

**Q7.**
1. *Consistance de $\hat\alpha_n$.* **Par l'inégalité de Markov** (appliquée à $(\hat\alpha_n-\alpha)^2$ ; Poly ch.6 Lemme 2.1, Prop. 2.2), pour tout $\varepsilon>0$ :
$$\mathbb{P}_{n,\theta}(\lvert\hat\alpha_n-\alpha\rvert\ge\varepsilon)\le\frac1{\varepsilon^2}\mathbb{E}_{n,\theta}\big[(\hat\alpha_n-\alpha)^2\big]=O(n^{-2})\to0.$$
« La suite d'estimateurs est donc consistante » **(bleu)**.
2. *Consistance de $\hat\eta^{(2)}_n$* : **non détaillée dans le corrigé.** *(Complément d'extraction : $\frac1n\sum_i\ln(X_i/\hat\alpha_n)=\frac1n\sum_i\ln(X_i/\alpha)-\ln(\hat\alpha_n/\alpha)$ ; le premier terme tend vers $1/\eta$ en probabilité (LGN, Q2), le second vers $0$ (consistance de $\hat\alpha_n$ et continuité de $\ln$ en $1$) ; la somme tend vers $1/\eta$ en probabilité, puis continuité de $u\mapsto1/u$ en $1/\eta>0$.)*

**Q8.**
*Méthode 1.* On vérifie que $n\eta\ln(\hat\alpha_n/\alpha)$ est **pivotale** en calculant sa fonction de répartition : pour $x\ge0$,
$$\mathbb{P}_{n,\theta}\big(n\eta\ln(\hat\alpha_n/\alpha)\le x\big)=\mathbb{P}_{n,\theta}\big(\hat\alpha_n\le\alpha\exp(x/(n\eta))\big)=1-\exp(-x)$$
(par Q6 avec $y=\alpha e^{x/(n\eta)}$). Donc $n\eta\ln(\hat\alpha_n/\alpha)\sim\mathcal{E}(1)$ **exactement, pour tout $n$**. Puisque $\eta$ est inconnu, on le remplace par son estimateur $\hat\eta^{(2)}_n$, qui est consistant ; **par Slutsky** ($\hat\eta^{(2)}_n/\eta\to1$ en probabilité) :
$$n\hat\eta^{(2)}_n\ln(\hat\alpha_n/\alpha)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal{E}(1).$$
La fonction $n\hat\eta^{(2)}_n\ln(\hat\alpha_n/\alpha)$ est donc **asymptotiquement pivotale** (Poly ch.6 Déf. 1.7).

*Méthode 2.* Sous $\mathbb{P}_{n,\theta}$, $\hat\alpha_n$ suit une loi de Pareto de paramètre $(\alpha,n\eta)$ (Q6). D'après le rappel, $\ln(\hat\alpha_n/\alpha)$ suit une loi exponentielle de paramètre $n\eta$ ; enfin $n\eta\ln(\hat\alpha_n/\alpha)$ suit une loi exponentielle de paramètre 1 (changement d'échelle).

*Intervalle de confiance.* On choisit $0\le a<b$ tels que $\mathbb{P}(a\le U\le b)=1-\beta$ pour $U\sim\mathcal{E}(1)$. Cela donne l'intervalle (couverture $\to1-\beta$ ; voir §0.5 point 3)
$$\mathbb{P}_{n,\theta}\Big(\alpha\in\Big[\hat\alpha_ne^{-b/(n\hat\eta^{(2)}_n)},\ \hat\alpha_ne^{-a/(n\hat\eta^{(2)}_n)}\Big]\Big)=1-\beta.$$
*(Inversion : $a\le n\hat\eta^{(2)}_n\ln(\hat\alpha_n/\alpha)\le b\iff\hat\alpha_ne^{-b/(n\hat\eta^{(2)}_n)}\le\alpha\le\hat\alpha_ne^{-a/(n\hat\eta^{(2)}_n)}$, par croissance de $\ln$.)* Le choix $a=0$ et $b=t_{1-\beta}$, le quantile d'ordre $1-\beta$ de $\mathcal{E}(1)$, **donne l'intervalle le plus étroit** *(raison, complément d'extraction : la densité de $\mathcal{E}(1)$ est décroissante, donc l'intervalle de probabilité $1-\beta$ le plus court est $[0,t_{1-\beta}]$ ; avec $a=0$ la borne supérieure est $\hat\alpha_n$ lui-même, cohérent avec $\alpha\le\hat\alpha_n$ p.s.)*.

*Commentaires (bleu, p. 13).* « Il est facile de vérifier que la longueur de cet intervalle de confiance est en $O(1/n)$. On a vu aussi que l'EQM de $\hat\alpha_n$ est en $O(1/n^2)$. On s'attend donc à ce que la vitesse pour la convergence de l'estimateur soit en $n$ : on peut en effet montrer que $\{n(\hat\alpha_n-\alpha),n\ge0\}$ converge en loi. Ici, le modèle n'est pas régulier (pour le paramètre $\alpha$). Dans un modèle régulier, la vitesse de convergence de l'estimateur est en $\sqrt n$, et les tailles des intervalles de confiance décroissent en $1/\sqrt n$. » *(La loi limite est $n\eta(\hat\alpha_n-\alpha)\Rightarrow\alpha\,\mathcal{E}(1)$, Poly ch.7 Ex. 1.10 ; même phénomène que le support de l'uniforme, Poly ch.6 Ex. 1.5.)*

**Méthodes mobilisées :** calcul d'EMV par annulation du score + stricte concavité + comportement aux bords ; fonction muette + changement de variable ; LGN + continuité (consistance) ; TCL + méthode-δ ; normalité asymptotique de l'EMV via l'information de Fisher (dérivée seconde) ; Slutsky (pivot asymptotique, IC « Wald » et IC par inversion) ; EMV d'un paramètre de support par monotonie ($\hat\alpha_n=X_{1:n}$) ; loi du minimum par indépendance ; reconnaissance d'une loi (Pareto $(\alpha,n\eta)$) ; décomposition biais-variance ; inégalité de Markov ; pivot exact $\mathcal{E}(1)$ puis pivot asymptotique (remplacement de $\eta$ par un estimateur consistant) ; IC de longueur minimale.

**Pièges relevés / remarques du corrigé :**
- L'EMV de $\alpha$ ne s'obtient **pas** par annulation d'une dérivée : la vraisemblance est discontinue en $\alpha=X_{1:n}$ (indicatrice).
- Le modèle est **régulier en $\eta$** ($\alpha$ connu) mais **non régulier en $\alpha$** (support dépendant du paramètre) : ni Cramér-Rao, ni la normalité asymptotique de l'EMV ne s'appliquent à $\hat\alpha_n$ ; vitesse $n$, loi limite exponentielle.
- Information de Fisher : **d'une seule observation** ($n=1$) dans la variance asymptotique.
- Moments de $\hat\alpha_n$ seulement pour $n\eta>2$ (« $n$ suffisamment grand »).
- Le pivot $n\eta\ln(\hat\alpha_n/\alpha)$ est **exact** ; il ne devient asymptotique que parce qu'on remplace $\eta$ par $\hat\eta^{(2)}_n$.
- Deux pivots asymptotiques pour $\eta$ (normalisation par $\hat\eta_n$ ou par $\eta$) donnent deux IC différents de même niveau asymptotique.

**Résultats numériques :**
- $\mathbb{E}[\mathcal{E}(\eta)]=1/\eta$, $\mathrm{Var}=1/\eta^2$ ; variance asymptotique de $\hat\eta_n$ : $\eta^2$ ; $I(\eta)=\eta^{-2}$.
- Quantile de $\mathcal{E}(1)$ : $t_{1-\beta}=-\ln\beta$ ; pour $\beta=5\%$, $t_{0.95}=\ln 20\approx2.996$ *(complément d'extraction)*. IC le plus étroit : $\big[\hat\alpha_ne^{-2.996/(n\hat\eta^{(2)}_n)},\ \hat\alpha_n\big]$.
- EQM exacte $\frac{2\alpha^2}{(n\eta-1)(n\eta-2)}$ *(complément d'extraction)*.

---

### Exercice 3 — Non unicité d'une suite de tests consistante ((*))

**Source :** Énoncé PC6, p. 2–3 ; Corrigé PC6, p. 14–16.

**Énoncé complet.** Soit $\Theta$ un ouvert de $\mathbb{R}$ et $\theta_0\in\Theta$. On souhaite tester
$$H_0:\theta=\theta_0,\qquad H_1:\theta>\theta_0 .$$
On dispose d'une suite de $n$-échantillons du modèle $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\theta\in\Theta\})$. Le modèle statistique est un modèle de translation : soit $q\cdot\mathrm{dLeb}$ une loi sur $\mathbb{R}$, on considère la famille de densités $q_\theta:x\mapsto q(x-\theta)$. On suppose de plus la densité $q$ symétrique par rapport à l'origine, continue et telle que $q(0)>0$ [note 1 : ces conditions entraînent que la médiane est unique et vaut zéro, et que la fonction de répartition $F$ est strictement croissante dans un voisinage de 0] et de variance $\sigma_q^2$ inconnue. On définit les statistiques
$$M_n:=2\sqrt n\Big(B_n-\frac12\Big),\qquad T_n:=\sqrt n\,\frac{(\bar X_n-\theta_0)}{S_n},$$
où $B_n$, $\bar X_n$ et $S_n^2$ sont définis par
$$B_n:=\frac1n\sum_{k=1}^n\mathbb{1}_{\{X_k\ge\theta_0\}},\qquad\bar X_n:=\frac1n\sum_{k=1}^nX_k,\qquad S_n^2:=\frac1n\sum_{k=1}^n(X_k-\bar X_n)^2 .$$
On note $\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n}$.
1. Montrer que l'on peut choisir une suite $\{t_n,n\in\mathbb{N}\}$ de telle sorte que la suite de tests $\phi_{n,1}:=\mathbb{1}_{\{M_n\ge t_n\}}$ soit de niveau asymptotique $\alpha$ et soit consistante, i.e. pour tout $\theta>\theta_0$, $\liminf_n\mathbb{P}_{n,\theta}(\phi_{n,1}=1)=1$. On pourra considérer les étapes suivantes :
   - Proposer une valeur de $t_n$ garantissant un test de niveau asymptotique $\alpha$.
   - Pour $\theta>\theta_0$, exprimer l'espérance et la variance de la v.a. $\mathbb{1}_{\{X_k\ge\theta_0\}}$ sous $\mathbb{P}_{n,\theta}$, à l'aide de $\theta_0$ et de la fonction de répartition $F$ de la loi $q$. Observer le signe de $\mathbb{P}_{n,\theta}(X_k\ge\theta_0)-1/2$.
   - Vérifier la consistance de la suite de tests.
2. Construire une suite de tests $\{\phi_{n,2},n\in\mathbb{N}\}$ basée sur la statistique de test $T_n$ de niveau asymptotique $\alpha$ et consistante.

Il n'y a donc pas unicité d'une suite de tests consistante pour un jeu d'hypothèses donné. Nous verrons en PC7 une façon de comparer ces tests.

**Corrigé complet question par question.** Notons $F$ la fonction de répartition de la loi $q$ ; $q_\theta(\cdot):=q(\cdot-\theta)$. On écrit
$$e(\theta):=1-F(\theta_0-\theta),\qquad v(\theta):=F(\theta_0-\theta)\big(1-F(\theta_0-\theta)\big)=(1-e(\theta))\,e(\theta).$$

**Q1. ▶ Définition du test.**
1. *Loi de l'indicatrice sous $H_0$.* Sous $\mathbb{P}_{n,\theta_0}$, $\mathbb{1}_{X_k\ge\theta_0}$ suit une loi de Bernoulli de paramètre de succès
$$\int_{\theta_0}^{+\infty}q_{\theta_0}(x)\,\mathrm{d}x=\int_{\theta_0}^{+\infty}q(x-\theta_0)\,\mathrm{d}x=\int_0^\infty q(y)\,\mathrm{d}y=1-F(0)$$
(**changement de variable** $y=x-\theta_0$). Puisque la médiane de $q$ est 0, $F(0)=1/2$ : la Bernoulli est de paramètre $1/2$, d'espérance $1/2$ et de variance $1/4$.
2. *Loi limite sous $H_0$.* **Par le TCL** ($\sqrt n(B_n-1/2)/\sqrt{1/4}=M_n$) :
$$M_n\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,1).$$
3. *Forme de la zone de rejet.* Sous $\mathbb{P}_{n,\theta}$, la médiane des $X_i$ est $\theta$ ; vu la forme de $H_1$ ($\theta>\theta_0$), on rejette quand il y a « trop » d'observations au-dessus de $\theta_0$ :
$$\mathcal{R}_{n,1}:=\Big\{(x_1,\cdots,x_n)\in\mathbb{R}^n:\ 2\sqrt n\Big(n^{-1}\sum_{k=1}^n\mathbb{1}_{x_k\ge\theta_0}-1/2\Big)>s\Big\}.$$
4. *Seuil.* Pour assurer la condition de niveau, $s=z_{1-\alpha}$, quantile d'ordre $1-\alpha$ de $\mathrm{N}(0,1)$. Avec ce choix (**convergence en loi**, $\mathrm{N}(0,1)$ ne charge pas $z_{1-\alpha}$) :
$$\lim_n\mathbb{P}_{n,\theta_0}(M_n>z_{1-\alpha})=\mathbb{P}(U>z_{1-\alpha})=\alpha,\qquad U\sim\mathrm{N}(0,1),$$
de sorte que le test est de niveau **asymptotique** $\alpha$ (Poly ch.6 Déf. 1.10 ; $\Theta_0=\{\theta_0\}$). **En conclusion, $t_n:=z_{1-\alpha}$** (constant).

**Q1. ▶ Consistance du test.**
1. *TCL sous $\mathbb{P}_{n,\theta}$.* Pour $\theta\in\mathbb{R}$,
$$\mathbb{P}_{n,\theta}(X_k\ge\theta_0)=\int_{\theta_0}^{+\infty}q_\theta(x)\,\mathrm{d}x=\int_{\theta_0}^\infty q(x-\theta)\,\mathrm{d}x=\int_{\theta_0-\theta}^\infty q(x)\,\mathrm{d}x=1-F(\theta_0-\theta)=e(\theta),$$
donc $\mathbb{1}_{\{X_k\ge\theta_0\}}$ est de Bernoulli d'espérance $e(\theta)$ et de variance $v(\theta)$, et **par le TCL pour des v.a. i.i.d.**
$$\sqrt n\Big(\frac{B_n-e(\theta)}{\sqrt{v(\theta)}}\Big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1).$$
2. *Signe de $e(\theta)-1/2$.* Pour $\theta>\theta_0$ dans un voisinage de $\theta_0$, on a l'inégalité stricte $F(\theta_0-\theta)<F(0)=1/2$ (conséquence de l'hypothèse $q(0)>0$ et $q$ continue : $F$ strictement croissante près de 0) ; **la fonction de répartition étant monotone**, cela reste vrai pour tout $\theta>\theta_0$. Donc $e(\theta)>1/2$, i.e. $\mathbb{P}_{n,\theta}(X_k\ge\theta_0)-1/2>0$, et
$$\lim_n\sqrt n\,(1/2-e(\theta))=-\infty.$$
3. *Réécriture centrée.*
$$\begin{aligned}
\mathbb{P}_{n,\theta}\big(2\sqrt n(B_n-1/2)>z_{1-\alpha}\big)&=\mathbb{P}_{n,\theta}\Big(B_n-1/2>\frac{z_{1-\alpha}}{2\sqrt n}\Big)
=\mathbb{P}_{n,\theta}\Big(B_n-e(\theta)>1/2-e(\theta)+\frac{z_{1-\alpha}}{2\sqrt n}\Big)\\
&=\mathbb{P}_{n,\theta}\Big(\sqrt n\Big(\frac{B_n-e(\theta)}{\sqrt{v(\theta)}}\Big)>\sqrt n\,\frac{(1/2-e(\theta))}{\sqrt{v(\theta)}}+\frac{z_{1-\alpha}}{2\sqrt{v(\theta)}}\Big).
\end{aligned}$$
4. *Seuil auxiliaire $M$* **(bleu : « Le terme qui précède dépend de $n$ à la fois via la loi de la v.a., et via la borne de l'intervalle ; pour appliquer la convergence en loi, on se ramène à un intervalle qui ne bouge pas avec $n$ »)**. Soit $M>0$ ; il existe $N_M$ tel que pour tout $n\ge N_M$, $\sqrt n\,\frac{1/2-e(\theta)}{\sqrt{v(\theta)}}<-M$ ; donc pour tout $n\ge N_M$
$$\mathbb{P}_{n,\theta}\big(2\sqrt n(B_n-1/2)>z_{1-\alpha}\big)\ge\mathbb{P}_{n,\theta}\Big(\sqrt n\Big(\frac{B_n-e(\theta)}{\sqrt{v(\theta)}}\Big)>\frac{z_{1-\alpha}}{2\sqrt{v(\theta)}}-M\Big)$$
(**inclusion d'événements**).
5. *Passage à la limite en $n$.* **La convergence en loi** entraîne (avec $\Phi$ la f.d.r. de $\mathrm{N}(0,1)$)
$$\lim_n\mathbb{P}_{n,\theta}(M_n>z_{1-\alpha})=\lim_n\mathbb{P}_{n,\theta}\big(2\sqrt n(B_n-1/2)>z_{1-\alpha}\big)\ge1-\Phi\Big(\frac{z_{1-\alpha}}{2\sqrt{v(\theta)}}-M\Big),$$
et ce pour tout $M>0$.
6. *Passage à la limite en $M$.* Quand $M\to+\infty$ : $\lim_n\mathbb{P}_{n,\theta}\big(2\sqrt n(B_n-1/2)>z_{1-\alpha}\big)\ge1$, dont on déduit
$$\lim_n\mathbb{P}_{n,\theta}\big(2\sqrt n(B_n-1/2)>z_{1-\alpha}\big)=1 .$$
Cela conclut la preuve de la consistance (Poly ch.6 Déf. 1.11).

**Q2. ▶ Construction du test.**
1. *TCL sous $H_0$.* Sous $\mathbb{P}_{n,\theta_0}$, les $X_k$ sont i.i.d. d'espérance $\theta_0$ (symétrie de $q$) et de variance $\sigma_q^2$ :
$$\sqrt n\,\sigma_q^{-1}(\bar X_n-\theta_0)\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,1).$$
2. *Consistance de $S_n^2$.* En observant que $S_n^2=\frac1n\sum_{k=1}^nX_k^2-(\bar X_n)^2$, **par la loi faible des grands nombres** (appliquée à $X_k$ et $X_k^2$) et continuité :
$$S_n^2\xrightarrow{\mathbb{P}_{n,\theta_0}-\mathrm{prob}}\sigma_q^2 .$$
3. *Slutsky.* **Stabilité de la convergence en probabilité par une application continue** ($u\mapsto\sqrt u$, donc $S_n/\sigma_q\to1$), **puis lemme de Slutsky** (quotient) :
$$T_n\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,1).$$
4. *Zone de rejet* :
$$\mathcal{R}_{n,2}:=\Big\{(X_1,\cdots,X_n),\ \sqrt n\,\frac{\bar X_n-\theta_0}{S_n}>z_{1-\alpha}\Big\}.$$
En exploitant la convergence en loi de la statistique de test, $\lim_n\mathbb{P}_{n,\theta_0}(T_n>z_{1-\alpha})=\alpha$, ce qui établit le **niveau asymptotique** du test.

**Q2. ▶ Consistance du test.**
1. Pour $\theta>\theta_0$, en procédant comme précédemment (TCL + LGN + Slutsky sous $\mathbb{P}_{n,\theta}$) :
$$\sqrt n\,\frac{\bar X_n-\theta}{S_n}\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1).$$
2. *Réécriture* :
$$\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})=\mathbb{P}_{n,\theta}\Big(\sqrt n\,\frac{\bar X_n-\theta}{S_n}>z_{1-\alpha}+\sqrt n\,\frac{\theta_0-\theta}{S_n}\Big).$$
3. *Contrôle de $S_n$.* La convergence en probabilité de $S_n^2$ vers $\sigma_q^2$ sous $\mathbb{P}_{n,\theta}$ entraîne que pour tout $\varepsilon>0$, $\lim_n\mathbb{P}_{n,\theta}(\sigma_q-\varepsilon\le S_n\le\sigma_q+\varepsilon)=1$ ; sur cet événement, $\sqrt n\frac{\theta_0-\theta}{S_n}\le\sqrt n\frac{\theta_0-\theta}{\sigma_q+\varepsilon}$ (car $\theta_0-\theta<0$), donc
$$\begin{aligned}
\lim_n\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})&\ge\lim_n\mathbb{P}_{n,\theta}\Big(\sqrt n\,\frac{\bar X_n-\theta}{S_n}>z_{1-\alpha}+\sqrt n\,\frac{\theta_0-\theta}{\sigma_q+\varepsilon}\Big)\\
&\ge\lim_n\mathbb{P}_{n,\theta}\Big(\sqrt n\,\frac{\bar X_n-\theta}{S_n}>z_{1-\alpha}-M\Big),
\end{aligned}$$
et ce pour tout $M>0$ (raisonnement analogue à la question 1 : $\sqrt n\frac{\theta_0-\theta}{\sigma_q+\varepsilon}<-M$ pour $n$ grand).
4. *Double passage à la limite.* Pour tout $M>0$, $\lim_n\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})\ge1-\Phi(z_{1-\alpha}-M)$, et le terme de droite tend vers 1 quand $M\to+\infty$. Le terme de gauche vaut donc 1 : **consistance**.

**Méthodes mobilisées :** test du signe (statistique de Bernoulli) ; changement de variable dans une intégrale ; TCL sous $H_0$ pour calibrer le seuil ; quantile $z_{1-\alpha}$ pour un test **unilatéral** ; niveau asymptotique via la convergence en loi (Portmanteau) ; consistance par **seuil auxiliaire $M$ et double passage à la limite** ($n$ puis $M$) ; monotonie de la f.d.r. ; test de Student asymptotique : TCL + LGN ($S_n^2=\overline{X^2}_n-\bar X_n^2$) + continuité + Slutsky (Poly ch.6 Ex. 1.14, version unilatérale).

**Pièges relevés / remarques du corrigé :**
- Sous $H_1$, la loi de la statistique se **décale vers $+\infty$** : on ne peut pas remplacer directement $M_n$ ou $T_n$ par leur loi limite ; la borne de l'événement bouge avec $n$ en même temps que la loi (remarque bleue). D'où le seuil $M$.
- $H_1$ unilatérale ⇒ quantile $z_{1-\alpha}$ (et non $z_{1-\alpha/2}$).
- Le test du signe ne demande **aucun moment** (seulement la médiane) ; le test de Student demande une variance finie ($\sigma_q^2<\infty$). Les deux sont consistants et de même niveau asymptotique : **la consistance ne suffit pas à départager deux tests** (comparaison en PC7).
- $S_n^2$ est ici normalisée par $n$ (ch.6 Ex. 1.14 : par $n-1$) — sans effet asymptotique.
- *(Remarque d'extraction)* Si $q$ est à support borné et $\theta-\theta_0$ grand, on peut avoir $F(\theta_0-\theta)=0$, donc $v(\theta)=0$ : le TCL est dégénéré, mais alors $B_n=1$ p.s., $M_n=\sqrt n\to+\infty$ et le test rejette quand même ; le corrigé ne traite pas ce cas.

**Résultats numériques :**
- Sous $H_0$ : $\mathbb{1}_{\{X_k\ge\theta_0\}}\sim$ Bernoulli$(1/2)$, espérance $1/2$, variance $1/4$.
- Seuils usuels *(complément d'extraction)* : $z_{0.95}\approx1.645$ ($\alpha=5\%$) ; $z_{0.99}\approx2.326$.
- Exemple *(complément d'extraction)* : $n=100$, 60 observations $\ge\theta_0$ : $M_n=2\cdot10\cdot(0.6-0.5)=2>1.645$ ⇒ rejet à 5 %.

---

### Exercice 4 — Statistique asymptotique dans un modèle de Poisson ((*))

**Source :** Énoncé PC6, p. 3 ; Corrigé PC6, p. 17.

**Énoncé complet.** Soit une suite de $n$-échantillons du modèle statistique $(\mathbb{N},\mathcal{P}(\mathbb{N}),\{p_\theta\cdot\mu,\theta\in\Theta:=\mathbb{R}^+_\star\})$ où (modèle de Poisson)
$$p_\theta:k\mapsto\frac{\theta^k}{k!}\exp(-\theta),$$
et $\mu$ est la mesure de comptage sur $\mathbb{N}$. On pose $\overline{X}_n:=n^{-1}\sum_{i=1}^nX_i$.
1. Montrer que la suite $\{\overline{X}_n,n\in\mathbb{N}\}$ est une suite d'estimateurs de $\theta$ asymptotiquement normale.
2. On cherche à estimer la probabilité $g(\theta)=\mathbb{P}_{n,\theta}(X_1=0)=\exp(-\theta)$. Montrer que $\{\exp(-\bar X_n),n\ge0\}$ est une suite consistante et asymptotiquement normale d'estimateurs de $g$.
3. Construire un intervalle de confiance asymptotique pour $g$.

**Corrigé complet question par question.** Notons $\mathbb{P}_{n,\theta}:=(p_\theta\cdot\mu)^{\otimes n}$ (le corrigé écrit $\mathrm{Leb}$ : coquille, §0.5 point 7).

**Q1.** Sous $\mathbb{P}_{n,\theta}$, $X_1,\cdots,X_n$ sont i.i.d. de loi de Poisson de paramètre $\theta>0$ ; donc $\mathbb{E}_{n,\theta}[X_1]=\theta$ et $\mathrm{Var}_{n,\theta}(X_1)=\theta$. **D'après le TCL** :
$$\sqrt n\big(\overline{X}_n-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,\theta).$$
La suite d'estimateurs est asymptotiquement normale, de variance asymptotique $\sigma^2(\theta):=\theta$.

**Q2.**
1. *Consistance.* Sous $\mathbb{P}_{n,\theta}$, $X_1\sim\mathcal{P}(\theta)$, donc $\mathbb{P}_{n,\theta}(X_1=0)=\exp(-\theta)$. **Par la LGN**, $\overline{X}_n\xrightarrow{\mathbb{P}_{n,\theta}-\mathrm{prob}}\mathbb{E}_{n,\theta}[X_1]=\theta$. La consistance est assurée **par la continuité de la fonction exponentielle** : $g(\overline{X}_n)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}g(\theta)$ (convergence en loi vers une constante ⇔ en probabilité, Poly ch.6 Th. 2.2).
2. *Normalité asymptotique.* $g:\theta\mapsto\exp(-\theta)$ est différentiable sur $\Theta$, $g'(\theta)=-\exp(-\theta)$. **Par la méthode-δ** :
$$\sqrt n\big(g(\bar X_n)-g(\theta)\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\big(0,(g'(\theta))^2\,\sigma^2(\theta)\big).$$
Or $(g'(\theta))^2\sigma^2(\theta)=\exp(-2\theta)\theta$. Ainsi
$$\sqrt n\big(g(\bar X_n)-g(\theta)\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\big(0,\exp(-2\theta)\theta\big).\tag{4}$$

**Q3.**
1. *Estimation de l'écart-type asymptotique.* **Par la LGN et la continuité** de $\gamma:\theta\mapsto\sqrt\theta\exp(-\theta)$ sur $\mathbb{R}^+_*$, pour tout $\theta\in\Theta$ :
$$\gamma(\overline{X}_n)\xrightarrow{\mathbb{P}_{n,\theta}-\mathrm{prob}}\gamma(\theta).$$
2. *Slutsky.* Cette convergence et (4) entraînent **par le lemme de Slutsky** ($\gamma(\theta)>0$) :
$$\sqrt n\,\gamma^{-1}(\overline{X}_n)\big(e^{-\overline{X}_n}-e^{-\theta}\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1).$$
Ainsi $G_n(X_1,\dots,X_n;\theta):=\sqrt n\,\gamma^{-1}(\overline{X}_n)\big(e^{-\overline{X}_n}-e^{-\theta}\big)$ est **asymptotiquement pivotale**.
3. *IC.* Soit $\alpha\in(0,1)$ et $z_{1-\alpha/2}$ le quantile d'ordre $1-\alpha/2$ de $\mathrm{N}(0,1)$. Un IC de niveau asymptotique $1-\alpha$ pour $\mathbb{P}_{n,\theta}(X_1=0)=\exp(-\theta)$ est
$$\Big[e^{-\overline{X}_n}-\gamma(\overline{X}_n)\frac{z_{1-\alpha/2}}{\sqrt n}\ ;\ e^{-\overline{X}_n}+\gamma(\overline{X}_n)\frac{z_{1-\alpha/2}}{\sqrt n}\Big].$$
(C'est la Méthode 1.1 du Poly ch.6 appliquée à $g(\bar X_n)$, $v(\theta)=\theta e^{-2\theta}$ continue.)

**Méthodes mobilisées :** TCL ; LGN + théorème de continuité (consistance d'une fonction de l'estimateur) ; méthode-δ ($\theta\mapsto e^{-\theta}$) ; Slutsky avec écart-type asymptotique estimé ; fonction asymptotiquement pivotale ; IC asymptotique (« plug-in », type Wald).

**Pièges relevés / remarques du corrigé :**
- La variance asymptotique de $e^{-\bar X_n}$ est $(g'(\theta))^2\sigma^2(\theta)=\theta e^{-2\theta}$ (ne pas oublier le carré de $g'$, ni $\sigma^2(\theta)=\theta$).
- $\gamma$ est l'**écart-type** asymptotique ($\sqrt{\theta}e^{-\theta}$), pas la variance.
- *(Remarque d'extraction)* L'IC peut déborder de $[0,1]$ pour $n$ petit ; et si $\overline{X}_n=0$ (probabilité $e^{-n\theta}$), $\gamma(0)=0$ et l'IC est réduit au point $\{1\}$ — même dégénérescence que l'intervalle de Wald (Poly ch.6 Ex. 1.12).

**Résultats numériques :** *(complément d'extraction)* $n=100$, $\overline{X}_n=2$, $\alpha=5\%$ : $e^{-2}\approx0.1353$, $\gamma(2)=\sqrt2e^{-2}\approx0.1914$, demi-largeur $1.96\times0.1914/10\approx0.0375$, IC $\approx[0.0978;\ 0.1728]$.

---

### Exercice 5 — LGN faible et limite de série ((*))

**Source :** Énoncé PC6, p. 3 ; Corrigé PC6, p. 18.

**Énoncé complet.** Soit $g:\mathbb{R}\to\mathbb{R}$ une fonction continue et bornée. Montrer que
$$e^{-n\lambda}\sum_{k=0}^\infty g\Big(\frac kn\Big)\frac{(n\lambda)^k}{k!}\to_{n\to\infty}g(\lambda).$$

**Corrigé complet.**
1. *Représentation probabiliste.* Soit une suite de $n$-échantillons d'un modèle statistique de Poisson de paramètre $\lambda>0$. Sous $\mathbb{P}_{n,\lambda}$, $X_1+X_2+\cdots+X_n\sim\mathcal{P}(n\lambda)$ (**somme de Poisson indépendantes**), donc (**théorème de transfert** pour une loi discrète)
$$e^{-n\lambda}\sum_{k=0}^\infty g\Big(\frac kn\Big)\frac{(n\lambda)^k}{k!}=\mathbb{E}_{n,\lambda}\Big[g\Big(\frac{X_1+X_2+\cdots+X_n}n\Big)\Big].$$
2. *LGN.* **Par la loi faible des grands nombres**,
$$\frac{X_1+X_2+\cdots+X_n}n\xrightarrow{\mathbb{P}_{n,\lambda}-\mathrm{prob}}\mathbb{E}_{n,\lambda}(X_1)=\lambda .$$
3. *Conclusion.* La convergence en probabilité entraîne la convergence en loi vers $\delta_\lambda$ (Poly ch.6 Th. 2.2 (i)) ; donc **par définition de la convergence en loi** (Poly ch.6 Déf. 1.4, $g$ continue bornée), $\mathbb{E}_{n,\lambda}\big[g\big(\frac{X_1+X_2+\cdots+X_n}n\big)\big]$ tend vers $g(\lambda)$.

**Méthodes mobilisées :** interprétation d'une série comme une espérance (théorème de transfert) ; stabilité de la loi de Poisson par somme indépendante ; LGN faible ; convergence en probabilité ⇒ convergence en loi ; définition de la convergence en loi par les fonctions continues bornées.

**Pièges relevés / remarques :**
- Il faut $g$ **continue et bornée** : c'est exactement la classe de fonctions de la définition de la convergence en loi (sans borne, l'espérance pourrait ne pas converger).
- *(Remarque d'extraction)* Même schéma que la preuve probabiliste du théorème de Weierstrass (polynômes de Bernstein, avec une binomiale à la place de la Poisson) ; les opérateurs $g\mapsto e^{-n\lambda}\sum_kg(k/n)\frac{(n\lambda)^k}{k!}$ sont les opérateurs de Szász–Mirakyan — rien de cela n'est dans le corrigé.

**Résultats numériques :** *(complément d'extraction, calcul exact)* Avec $g=\cos$ et $\lambda=1$ : la série vaut $\mathrm{Re}\exp\big(n(e^{\mathrm{i}/n}-1)\big)$ ; $n=1$ : $0.4208$ ; $n=10$ : $0.5153$ ; $n=100$ : $0.5376$ ; $n=1000$ : $0.5400$ ; limite $\cos1\approx0.5403$.

---

### Exercice 6 — Estimateur de Hodges ((**))

**Source :** Énoncé PC6, p. 4 ; Corrigé PC6, p. 18–21. Lien : Poly ch.6 Compléments §4.5 (*hors programme*), Poly ch.7 Déf. 4.1 (conjecture de Fisher).

**Énoncé complet.** Soit une suite de $n$-échantillons du modèle statistique $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{p_\theta\cdot\mathrm{Leb},\theta\in\Theta:=\mathbb{R}\})$ où (modèle gaussien variance connue)
$$p_\theta:x\mapsto\frac1{\sqrt{2\pi}}\exp(-0.5(x-\theta)^2).$$
1. Montrer que l'estimateur du maximum de vraisemblance de $\theta$ est asymptotiquement normal.
2. Soit un réel $b\ne1$ et une suite $\{a_n,n\in\mathbb{N}\}$ de nombres positifs tels que $\lim_{n\to\infty}a_n=0$ et $\lim_{n\to\infty}\sqrt na_n=\infty$. On considère la suite d'estimateurs :
$$\tilde\theta_n=\overline{X}_n\mathbb{1}_{\{\lvert\overline{X}_n\rvert\ge a_n\}}+b\overline{X}_n\mathbb{1}_{\{\lvert\overline{X}_n\rvert<a_n\}}$$
où $\overline{X}_n:=n^{-1}\sum_{i=1}^nX_i$. Montrer que cette suite d'estimateurs est asymptotiquement normale ; on distinguera le cas $\theta=0$ et $\theta\ne0$.
3. Commenter. *Voir la figure 2.* (Figure 2 : « le comportement de l'erreur quadratique (multipliée par $n$) de cet estimateur : $\theta\mapsto n\mathbb{E}_{n,\theta}\big[(\tilde\theta_n-\theta)^2\big]$. On a pris $a_n=n^{-1/4}$ et $b=0.25$. On observera la forte oscillation au voisinage de 0. Pour l'estimateur du maximum de vraisemblance, la même quantité $\theta\mapsto n\mathbb{E}_\theta\big[(\overline{X}_n-\theta)^2\big]$ est constante et vaut 1. »)

**Corrigé complet question par question.**

*Préambule — Efficacité de l'estimateur $\bar X_n$ de $\theta$.* L'information de Fisher (associée à $n$ observations) est $n$ : la log-vraisemblance $\ell(X_1,\cdots,X_n,\theta)$ vaut, à une constante additive près,
$$\theta\mapsto-\frac12\sum_{i=1}^n(X_i-\theta)^2,$$
de dérivée seconde $\theta\mapsto-n$. Il vient
$$I_n(\theta)=-\mathbb{E}_{n,\theta}\big[\partial^2_\theta\ell(X_1,\cdots,X_n,\theta)\big]=n.$$
Sous $\mathbb{P}_{n,\theta}$, $\overline{X}_n$ est sans biais ; son EQM est égale à sa variance, $1/n$, qui est aussi l'inverse de l'information de Fisher. **La borne de Cramér-Rao est atteinte : l'estimateur est efficace** (Poly ch.3 Cor. 1.3, Déf. 1.10).

**Q1.** L'estimateur du maximum de vraisemblance est $\overline{X}_n$ ; la loi de $\sqrt n(\overline{X}_n-\theta)$ **est** une gaussienne centrée réduite (exactement, pour tout $n$ : somme de gaussiennes indépendantes). En particulier asymptotiquement normale, de variance asymptotique 1.

**Q2. • Cas $\theta=0$.**
1. *Réécriture.* $\tilde\theta_n=b\overline{X}_n+(1-b)\overline{X}_n\mathbb{1}_{\lvert\overline{X}_n\rvert\ge a_n}$, donc
$$\sqrt n\big(\tilde\theta_n-0\big)=b\sqrt n\,\overline{X}_n+(1-b)\sqrt n\,\overline{X}_n\mathbb{1}_{\lvert\overline{X}_n\rvert\ge a_n}.$$
2. *Égalité en loi.* Sous $\mathbb{P}_{n,0}$, $\sqrt n\overline{X}_n\sim\mathrm{N}(0,1)$, donc $\sqrt n\tilde\theta_n$ a même loi que
$$bU+(1-b)U\mathbb{1}_{\lvert U\rvert\ge\sqrt na_n},\qquad U\sim\mathrm{N}(0,1).$$
3. *Le second terme tend en loi (donc en probabilité, note 2) vers 0.* Soit $H$ continue et bornée :
$$\mathbb{E}\Big[H\big(U\mathbb{1}_{\lvert U\rvert\ge\sqrt na_n}\big)\Big]=H(0)\,\mathbb{P}\big(\lvert U\rvert<\sqrt na_n\big)+\mathbb{E}\Big[H(U)\mathbb{1}_{\lvert U\rvert\ge\sqrt na_n}\Big]=H(0)+\mathbb{E}\Big[(H(U)-H(0))\mathbb{1}_{\lvert U\rvert\ge\sqrt na_n}\Big].$$
Puisque $\sqrt na_n\to+\infty$, **par le théorème de convergence dominée** (domination par $2\|H\|_\infty$, indicatrice $\to0$ ponctuellement) le second terme tend vers 0, tandis que le premier vaut $H(0)=\int H(x)\delta_0(\mathrm{d}x)$. Donc $U\mathbb{1}_{\lvert U\rvert\ge\sqrt na_n}\Longrightarrow\delta_0$ (masse de Dirac en zéro).
4. *Slutsky* :
$$bU+(1-b)U\mathbb{1}_{\lvert U\rvert\ge\sqrt na_n}\Longrightarrow bU\sim\mathrm{N}(0,b^2).$$
Donc $\sqrt n\,\tilde\theta_n\overset{\mathbb{P}_{n,0}}{\Longrightarrow}\mathrm{N}(0,b^2)$.

*Note 2 du corrigé (p. 19) — convergence en loi vers une constante ⇒ en probabilité.* La convergence en probabilité entraîne toujours la convergence en loi ; la réciproque est vraie lorsque la limite est une constante (un Dirac). Preuve : supposons $U_n\overset{\mathbb{P}_n}{\Longrightarrow}\delta_c$. Pour tout $\varepsilon>0$,
$$\mathbb{P}_n(\lvert U_n-c\rvert\ge\varepsilon)=1-\mathbb{P}_n(\lvert U_n-c\rvert<\varepsilon)=1-\mathbb{P}_n(c-\varepsilon<U_n<c+\varepsilon).$$
Par la convergence en loi, $\mathbb{P}_n(U_n\in A)\to\delta_c(A)$ pour tout borélien $A$ tel que $\delta_c(\partial A)=0$ (**Portmanteau**). Ici $A=]c-\varepsilon,c+\varepsilon[$, $\partial A=\{c-\varepsilon\}\cup\{c+\varepsilon\}$ et $\delta_c(\{c-\varepsilon\})=\delta_c(\{c+\varepsilon\})=0$, donc $\lim_n\mathbb{P}_n(c-\varepsilon<U_n<c+\varepsilon)=\delta_c(]c-\varepsilon,c+\varepsilon[)=1$. On en déduit $\lim_n\mathbb{P}_n(\lvert U_n-c\rvert\ge\varepsilon)=0$. (C'est Poly ch.6 Th. 2.2 (ii).)

**Q2. • Cas $\theta\ne0$.**
1. *Réécriture.* $\tilde\theta_n=\overline{X}_n+(b-1)\overline{X}_n\mathbb{1}_{\lvert\overline{X}_n\rvert<a_n}$, donc
$$\sqrt n\big(\tilde\theta_n-\theta\big)=\sqrt n\big(\overline{X}_n-\theta\big)+(b-1)\sqrt n\,\overline{X}_n\mathbb{1}_{\lvert\overline{X}_n\rvert<a_n}.$$
2. Premier terme : $\sqrt n(\overline{X}_n-\theta)\sim\mathrm{N}(0,1)$ sous $\mathbb{P}_{n,\theta}$ pour tout $\theta\in\mathbb{R}$. On montre que le second terme tend vers zéro en loi (donc en probabilités) ; **par Slutsky** on en déduira
$$\sqrt n\big(\tilde\theta_n-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1).$$
3. *Second terme.* Soit $H$ continue bornée, majorée par $C$ :
$$\begin{aligned}
\mathbb{E}_{n,\theta}\Big[H\big(\sqrt n\,\overline{X}_n\mathbb{1}_{\lvert\overline{X}_n\rvert<a_n}\big)\Big]&=\mathbb{E}_{n,\theta}\Big[H\big(\sqrt n\,\overline{X}_n\big)\mathbb{1}_{\lvert\overline{X}_n\rvert<a_n}\Big]+H(0)\big(1-\mathbb{P}_{n,\theta}(\lvert\overline{X}_n\rvert<a_n)\big)\\
&=H(0)+\mathbb{E}_{n,\theta}\Big[\big(H(\sqrt n\,\overline{X}_n)-H(0)\big)\mathbb{1}_{\lvert\overline{X}_n\rvert<a_n}\Big].
\end{aligned}$$
Le second terme est majoré par $(C+1)\mathbb{P}_{n,\theta}(\lvert\overline{X}_n\rvert<a_n)$.
4. *Cette probabilité tend vers 0.* Sous $\mathbb{P}_{n,\theta}$, $\overline{X}_n\sim\mathrm{N}(\theta,1/n)$, donc
$$\mathbb{P}_{n,\theta}(\lvert\overline{X}_n\rvert<a_n)=\mathbb{P}\big(\sqrt n(-a_n-\theta)<U<\sqrt n(a_n-\theta)\big),\qquad U\sim\mathrm{N}(0,1).$$
Si $\theta>0$, $\lim_n\sqrt n(a_n-\theta)=-\infty$ ; si $\theta<0$, $\lim_n\sqrt n(-a_n-\theta)=+\infty$ (car $a_n\to0$). Dans tous les cas, **par le théorème de convergence dominée**, la probabilité tend vers zéro. Cela conclut la preuve.

*Bilan* *(formulation d'extraction)* : $\{\tilde\theta_n\}$ est asymptotiquement normale de variance asymptotique $v(0)=b^2$ et $v(\theta)=1$ pour $\theta\ne0$.

**Q3.** L'EMV est $\overline{X}_n$ ; sous $\mathbb{P}_{n,\theta}$, la loi de $\sqrt n(\overline{X}_n-\theta)$ est une gaussienne centrée réduite, donc en particulier $n\mathbb{E}_{n,\theta}\big[(\overline{X}_n-\theta)^2\big]=1$. On a exhibé un autre estimateur, $\tilde\theta_n$, qui est **biaisé**, et a une variance asymptotique arbitrairement petite lorsque le paramètre visé est 0 ; et sinon, une variance asymptotique égale à 1. La figure montre $\theta\mapsto n\mathbb{E}_{n,\theta}\big[(\tilde\theta_n-\theta)^2\big]$ pour $a_n=n^{-1/4}$, $b=0.25$ : forte oscillation au voisinage de 0 ; pour l'EMV la même quantité est constante égale à 1.

- **Conclusion 1 (bleu).** On peut trouver un estimateur asymptotiquement normal, dont la variance asymptotique est égale et même strictement inférieure en au moins une valeur du paramètre à celle de l'estimateur MV (si $\lvert b\rvert<1$, §0.5 point 9). C'est un **contre-exemple à une des conjectures de Fisher** (Poly ch.7 Déf. 4.1). En conséquence, si le critère de comparaison est la comparaison des variances asymptotiques, on préférera l'estimateur modifié $\tilde\theta_n$ à l'estimateur MV.
- **Conclusion 2 (bleu).** Néanmoins, les courbes $\theta\mapsto nR(\tilde\theta_n,\theta)$ montrent que **le maximum est une fonction croissante de $n$**. Argument :
  1. *Trou dans les valeurs prises.* $\tilde\theta_n$ vaut soit $\bar X_n$ si $\lvert\bar X_n\rvert\ge a_n$, et alors $\lvert\tilde\theta_n\rvert\ge a_n$ ; soit $b\bar X_n$ si $\lvert\bar X_n\rvert<a_n$, et alors $\lvert\tilde\theta_n\rvert<ba_n$. **L'estimateur ne prend jamais de valeurs dans $]ba_n,a_n[$** (pour $0\le b<1$).
  2. *Minoration géométrique du risque au milieu du trou.* En $\theta=(b+1)a_n/2$ :
$$R\big(\tilde\theta_n,(b+1)a_n/2\big)=\mathbb{E}_{n,(b+1)a_n/2}\Big[\Big(\tilde\theta_n-\frac{(b+1)}2a_n\Big)^2\Big]\ge\Big(\frac{(1-b)}2a_n\Big)^2,$$
  car la distance entre $\tilde\theta_n$ et le milieu $(b+1)a_n/2$ est au moins la demi-longueur de l'intervalle.
  3. *Conséquence.*
$$\lim_nn\,R\big(\tilde\theta_n,(b+1)a_n/2\big)\ge\frac{(1-b)^2}4\lim_nna_n^2=+\infty .$$
  4. Puisque $\lim_na_n=0$, la suite $\tau_n=(b+1)a_n/2$ vérifie $\lim_n\tau_n=0$ et $\lim_nnR(\tilde\theta_n,\tau_n)=+\infty$. Donc on ne peut pas avoir
$$\lim_n\sup_{\theta\in\mathcal{V}_0}n\,R(\tilde\theta_n,\theta)<1$$
  pour un voisinage $\mathcal{V}_0$ de zéro. Si le critère de comparaison repose sur une **variabilité uniformément meilleure dans le voisinage de tout point**, on ne pourra pas préférer $\tilde\theta_n$.

**Méthodes mobilisées :** information de Fisher par la dérivée seconde, borne de Cramér-Rao, efficacité ; décomposition d'un estimateur sur des événements (indicatrices) ; égalité en loi ($\sqrt n\bar X_n\sim\mathrm{N}(0,1)$ exactement) ; convergence en loi vers une Dirac par fonctions test continues bornées + **convergence dominée** ; convergence en loi vers une constante ⇒ en probabilité (Portmanteau) ; **lemme de Slutsky** ; calcul de $\mathbb{P}(\lvert\bar X_n\rvert<a_n)$ par centrage-réduction ; minoration du risque par un argument géométrique (trou $]ba_n,a_n[$) ; comparaison ponctuelle vs uniforme.

**Pièges relevés / remarques du corrigé :**
- Les deux régimes $a_n\to0$ **et** $\sqrt na_n\to\infty$ sont essentiels : à $\theta=0$, $\bar X_n$ est à distance $\sim1/\sqrt n\ll a_n$ de 0 (on garde $b\bar X_n$) ; à $\theta\ne0$, $\lvert\bar X_n\rvert\to\lvert\theta\rvert>a_n$ (on garde $\bar X_n$).
- La variance asymptotique est un critère **ponctuel** ($\theta$ fixé, puis $n\to\infty$) ; elle ne voit pas les $\theta$ de l'ordre de $a_n$ (qui dépendent de $n$). Super-efficacité ponctuelle ≠ meilleur estimateur.
- $\tilde\theta_n$ est biaisé ; l'EMV est efficace à $n$ fixé.
- Conclusion 1 nécessite $\lvert b\rvert<1$ ; le trou $]ba_n,a_n[$ suppose $0\le b<1$ *(remarque d'extraction)*.

**Résultats numériques :**
- Figure ($a_n=n^{-1/4}$, $b=0.25$) — valeurs recalculées par intégration exacte *(complément d'extraction)*, cohérentes avec la lecture graphique :

| $n$ | $a_n$ | $ba_n$ | $\tau_n=(b+1)a_n/2$ | $\max_\theta nR(\tilde\theta_n,\theta)$ (atteint en $\lvert\theta\rvert\approx$) | $nR$ en $\theta=0$ | minorant $\frac{(1-b)^2}4na_n^2$ |
|---|---|---|---|---|---|---|
| 100 | 0.316 | 0.079 | 0.198 | $\approx3.83$ ($0.31$) | $\approx0.080$ | $1.41$ |
| 250 | 0.251 | 0.063 | 0.157 | $\approx5.75$ ($0.23$) | $\approx0.064$ | $2.22$ |
| 500 | 0.211 | 0.053 | 0.132 | $\approx8.04$ ($0.19$) | $\approx0.063$ | $3.14$ |

- Variance asymptotique en 0 : $b^2=0.0625$ ; ailleurs 1 ; EMV : $nR\equiv1$.

---

### Exercice 7 — Suite consistante d'estimateurs, racines des équations de vraisemblance ((***))

**Source :** Énoncé PC6, p. 4–6 ; Corrigé PC6, p. 22–27.

**Énoncé complet.** Soit un modèle statistique $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:=p_\theta\cdot\mu,\theta\in\Theta\})$ où $\mu$ est une mesure $\sigma$-finie sur $\mathcal{X}$, $\Theta$ est un intervalle ouvert de $\mathbb{R}$ et la densité $p_\theta$ vérifie
- **Ha** pour tout $x\in\mathsf{X}$, $\theta\mapsto p_\theta(x)$ est continûment différentiable sur $\Theta$ ; et pour tout $x\in\mathsf{X}$ et $\theta\in\Theta$, $p_\theta(x)>0$.
- **Hb** pour tout $\theta,\theta_0\in\Theta$, $\int\lvert\log(p_{\theta_0}(x)/p_\theta(x))\rvert\,p_{\theta_0}(x)\,\mathrm{d}\mu(x)<\infty$.
- **Hc** le modèle est identifiable.

Soit une suite de $n$-échantillons de ce modèle statistique. Pour tout $n\in\mathbb{N}^*$, la log-vraisemblance de l'observation $Z=(X_1,\dots,X_n)$ est donnée par :
$$\ell_n(\theta;X_1,\dots,X_n):=\sum_{i=1}^n\log p_\theta(X_i).$$
Les équations de vraisemblance associées sont données par
$$\sum_{i=1}^n\frac{\partial\log p_\theta(X_i)}{\partial\theta}=0.\tag{1}$$
L'objectif de cet exercice est d'établir l'existence d'une suite consistante d'estimateurs $\{\tilde\theta_n,n\ge1\}$ de $\theta$, et telle que pour tout $n$ assez grand, $\tilde\theta_n$ est une racine des équations de vraisemblance (1).

Soient $\theta_0\in\Theta$ et $\varepsilon>0$ tels que $]\theta_0-\varepsilon,\theta_0+\varepsilon[\subset\Theta$.
1. On pose
$$S_n=\{\mathbf{x}=(x_1,\dots,x_n)\in\mathsf{X}^n:\ \ell_n(\theta_0,\mathbf{x})>\ell_n(\theta_0-\varepsilon,\mathbf{x})\quad\text{et}\quad\ell_n(\theta_0,\mathbf{x})>\ell_n(\theta_0+\varepsilon,\mathbf{x})\}.$$
Montrer que $\lim_{n\to\infty}\mathbb{P}_{n,\theta_0}((X_1,\dots,X_n)\in S_n)=1$.
2. Montrer que si $\mathbf{x}\in S_n$, il existe $\tilde\theta_n\in\,]\theta_0-\varepsilon,\theta_0+\varepsilon[$ tel que
$$\frac{\partial\ell_n}{\partial\theta}(\tilde\theta_n,\mathbf{x})=0 .$$
3. Soit $\{\hat\theta_n,n\in\mathbb{N}\}$ une suite consistante d'estimateurs de $\theta$. On définit la suite $\{\tilde\theta_n,n\ge0\}$ par
$$\tilde\theta_n:=\begin{cases}\text{la (ou une des) racine(s) de }\theta\mapsto\partial_\theta\ell_n(\theta,X_1,\cdots,X_n)\text{, la plus proche de }\hat\theta_n&\text{si elle existe}\\ \hat\theta_n&\text{sinon}\end{cases}$$
Montrer que $\{\tilde\theta_n,n\ge1\}$ est une suite consistante d'estimateurs de $\theta$.

Prenons $\Theta:=\,]0,1[$. Soient $f_0$ et $f_1$ deux densités par rapport à la mesure de Lebesgue sur $\mathbb{R}$ telles que $\int\lvert f_0(x)-f_1(x)\rvert\,\mathrm{d}x>0$. On considère
$$p_\theta(x):=(1-\theta)f_0(x)+\theta f_1(x).$$
4. Interpréter ce modèle.
5. Écrire les équations de vraisemblance.
6. Montrer l'existence d'une suite consistante d'estimateurs $\{\tilde\theta_n,n\in\mathbb{N}\}$ de $\theta$ telle que pour $n$ assez grand, $\tilde\theta_n$ est une racine des eqs. de vraisemblance.
7. (Question subsidiaire !) un algorithme de recherche de racines ? *Voir la figure 3.*

Le corrigé détaille la question 7 en quatre sous-questions (bleu, p. 25–26) :
- a) Soit $\ell$ une fonction telle que pour tout $\theta\in\Theta$, $\ell(\theta)=\ln\int F(u,\theta)\,\mu(\mathrm{d}u)$ où $u\in\mathsf{U}\subseteq\mathbb{R}^m$, $F$ est une fonction mesurable à valeur dans $\mathbb{R}^+$ et $\mu$ une mesure positive $\sigma$-finie sur $\mathsf{U}$. Montrer que pour tout $\theta,\theta'\in\Theta$,
$$\ell(\theta)-\ell(\theta')\ge\int\ln\Big(\frac{F(u,\theta)}{F(u,\theta')}\Big)\ \frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\,\mu(\mathrm{d}u).$$
- b) En déduire un algorithme itératif de type MM pour la maximisation de $\theta\mapsto\ell(\theta)$.
- c) Retour à l'exercice : on considère les observations fixées ; on note $f_{0,i}:=f_0(x_i)$ et $f_{1,i}:=f_1(x_i)$. Montrer que la log-vraisemblance des observations s'écrit sous la forme $\ln\int F(u,\theta)\,\mu(\mathrm{d}u)$ avec $\mathsf{U}=\{0,1\}^n$, $\mu$ la mesure de comptage sur $\mathsf{U}$ et
$$F(u,\theta)=\prod_{i=1}^n(\theta f_{1,i})^{u_i}\ ((1-\theta)f_{0,i})^{1-u_i}\qquad\text{où }u:=(u_1,\cdots,u_n)\in\{0,1\}^n.$$
- d) En déduire un algorithme itératif du calcul de l'estimateur du maximum de vraisemblance de la proportion $\theta$.

**Corrigé complet question par question.**

**Q1.**
1. *Écriture comme somme.*
$$\ell_n(\theta_0,X_1,\cdots,X_n)-\ell_n(\theta_0-\varepsilon,X_1,\cdots,X_n)=\sum_{k=1}^n\log\frac{p_{\theta_0}(X_k)}{p_{\theta_0-\varepsilon}(X_k)}.$$
2. *LGN* (les termes sont i.i.d. et **intégrables par Hb**) :
$$\frac1n\sum_{k=1}^n\log\frac{p_{\theta_0}(X_k)}{p_{\theta_0-\varepsilon}(X_k)}\xrightarrow{\mathbb{P}_{n,\theta_0}-\mathrm{prob}}e(\theta_0):=\int\log\frac{p_{\theta_0}(x)}{p_{\theta_0-\varepsilon}(x)}\,p_{\theta_0}(x)\,\mathrm{d}\mu(x)=-\int\log\frac{p_{\theta_0-\varepsilon}(x)}{p_{\theta_0}(x)}\,p_{\theta_0}(x)\,\mathrm{d}\mu(x)>0,$$
où la dernière inégalité vient de **l'inégalité de Jensen** (concavité de $\log$), **stricte grâce à l'identifiabilité** (Hc) : $e(\theta_0)$ est la divergence de Kullback-Leibler $\mathrm{KL}(\mathbb{Q}_{\theta_0},\mathbb{Q}_{\theta_0-\varepsilon})$, $>0$ car $\mathbb{Q}_{\theta_0-\varepsilon}\ne\mathbb{Q}_{\theta_0}$ (Poly ch.2 Th. 1.1, Prop. 1.3).
3. *Traduction.* Pour tout $\delta>0$,
$$\lim_n\mathbb{P}_{n,\theta_0}\Big(e(\theta_0)-\delta<n^{-1}\sum_{k=1}^n\log\frac{p_{\theta_0}(X_k)}{p_{\theta_0-\varepsilon}(X_k)}<e(\theta_0)+\delta\Big)=1,$$
dont on déduit, pour $\delta$ bien choisi ($\delta<e(\theta_0)$, **inclusion d'événements**), que
$$\lim_n\mathbb{P}_{n,\theta_0}\Big(0<n^{-1}\sum_{k=1}^n\log\frac{p_{\theta_0}(X_k)}{p_{\theta_0-\varepsilon}(X_k)}\Big)\ge\lim_n\mathbb{P}_{n,\theta_0}\Big(e(\theta_0)-\delta<n^{-1}\sum_{k=1}^n\log\frac{p_{\theta_0}(X_k)}{p_{\theta_0-\varepsilon}(X_k)}<e(\theta_0)+\delta\Big)=1$$
(le corrigé écrit « $>$ », coquille). Ainsi $\lim_n\mathbb{P}_{n,\theta_0}\big(\ell_n(\theta_0,X_1,\cdots,X_n)>\ell_n(\theta_0-\varepsilon,X_1,\cdots,X_n)\big)=1$.
4. De même, $\lim_n\mathbb{P}_{n,\theta_0}\big(\ell_n(\theta_0,X_1,\cdots,X_n)>\ell_n(\theta_0+\varepsilon,X_1,\cdots,X_n)\big)=1$. L'intersection de deux événements de probabilité tendant vers 1 est de probabilité tendant vers 1 *(précision d'extraction : $\mathbb{P}(A\cap B)\ge1-\mathbb{P}(A^c)-\mathbb{P}(B^c)$)*. Ce qui conclut.

**Q2.**
1. *Existence.* Fixons $\mathbf{x}=(x_1,\cdots,x_n)\in S_n$. **Par Ha**, $\theta\mapsto\ell_n(\theta,\mathbf{x})$ est $C^1$ sur $]\theta_0-\varepsilon,\theta_0+\varepsilon[$ ; **le théorème des accroissements finis** entraîne l'existence de $\theta_1(\mathbf{x})$ et $\theta_2(\mathbf{x})$ dans $]\theta_0-\varepsilon,\theta_0+\varepsilon[$ tels que
$$\partial_\theta\ell_n(\cdot,\mathbf{x})\vert_{\theta_1(\mathbf{x})}>0,\qquad\partial_\theta\ell_n(\cdot,\mathbf{x})\vert_{\theta_2(\mathbf{x})}<0$$
*(précision d'extraction : $\theta_1(\mathbf{x})\in\,]\theta_0-\varepsilon,\theta_0[$ car $\ell_n(\theta_0,\mathbf{x})-\ell_n(\theta_0-\varepsilon,\mathbf{x})>0$ ; $\theta_2(\mathbf{x})\in\,]\theta_0,\theta_0+\varepsilon[$ car $\ell_n(\theta_0+\varepsilon,\mathbf{x})-\ell_n(\theta_0,\mathbf{x})<0$)*. Par suite, **par le théorème des valeurs intermédiaires** (dérivée continue), il existe $\tilde\theta(\mathbf{x})\in\,]\theta_0-\varepsilon,\theta_0+\varepsilon[$ tel que $\partial_\theta\ell_n(\cdot,\mathbf{x})\vert_{\tilde\theta(\mathbf{x})}=0$. Nous venons de montrer que
$$(\mathbf{x}\in S_n)\Longrightarrow\Big(\exists\tilde\theta_n(\mathbf{x})\in\,]\theta_0-\varepsilon,\theta_0+\varepsilon[\,,\ \partial_\theta\ell_n(\cdot,\mathbf{x})\vert_{\tilde\theta(\mathbf{x})}=0\Big).$$
2. *• Construction d'une telle racine (bleu) — dichotomie.* Soit $\mathbf{x}$ fixé ; $f(t):=\partial_\theta\ell_n(\cdot,\mathbf{x})\vert_t$ ; $a_0:=\theta_1(\mathbf{x})$ ; $b_0:=\theta_2(\mathbf{x})$. $f$ est continue et $f(a_0)f(b_0)<0$. On construit $\{a_j\}$, $\{b_j\}$ par : (i) étant donnés $a_j$ et $b_j$ ; (ii) on calcule $c_j:=(a_j+b_j)/2$ ; (iii) si $f(a_j)f(c_j)\le0$, on pose $a_{j+1}=a_j$ et $b_{j+1}=c_j$ ; (iv) sinon on pose $a_{j+1}=c_j$ et $b_{j+1}=b_j$.
   - Par construction $f(a_j)f(b_j)\le0$ pour tout $j\ge0$ (note 3 : vrai pour $j=0$ ; si $f(a_0)f(c_1)>0$, $f(c_1)$ et $f(a_0)$ ont même signe donc $f(c_1)$ et $f(b_0)$ sont de signes différents, on pose $a_1=c_1$, $b_1=b_0$ ; sinon $a_1=a_0$, $b_1=c_1$ ; puis récurrence).
   - $(a_j)_j$ est croissante, majorée par $b_0$, donc converge vers $a_\infty$.
   - $\lvert a_{j+1}-b_{j+1}\rvert=\lvert a_j-b_j\rvert/2$, donc $\lim_j\lvert a_j-b_j\rvert=0$ et (continuité de $f$) $\lim_jf(b_j)=\lim_jf(a_j+(b_j-a_j))=f(a_\infty)$.
   - $f(a_j)f(b_j)\le0$ pour tout $j$ ⇒ $\lim_jf(a_j)f(b_j)\le0$ ; mais aussi $\lim_jf(a_j)f(b_j)=(f(a_\infty))^2\ge0$. Donc $f(a_\infty)=0$ : on a construit $\check\theta_n(\mathbf{x})$ avec $\partial_\theta\ell_n(\cdot,\mathbf{x})\vert_{\theta=\check\theta_n(\mathbf{x})}=0$.
3. *• Cette racine est-elle une fonction mesurable de $\mathbf{x}$ ? (bleu)* On note $a_j(\mathbf{x})$, $b_j(\mathbf{x})$. Si $\mathbf{x}\mapsto a_0(\mathbf{x})$ et $\mathbf{x}\mapsto b_0(\mathbf{x})$ sont mesurables, on montre **par récurrence** que $\mathbf{x}\mapsto a_j(\mathbf{x})$ et $\mathbf{x}\mapsto b_j(\mathbf{x})$ le sont pour tout $j\ge1$ ; **par passage à la limite**, $\mathbf{x}\mapsto a_\infty(\mathbf{x})$ aussi. Initialisation :
$$a_1(\mathbf{x})=a_0(\mathbf{x})\mathbb{1}_{\partial_\theta\ell_n(a_0(\mathbf{x}),\mathbf{x})\,\partial_\theta\ell_n(c_1(\mathbf{x}),\mathbf{x})\le0}+c_1(\mathbf{x})\mathbb{1}_{\partial_\theta\ell_n(a_0(\mathbf{x}),\mathbf{x})\,\partial_\theta\ell_n(c_1(\mathbf{x}),\mathbf{x})>0}.$$
$a_0,b_0$ mesurables ⇒ $c_1$ mesurable ⇒ $\mathbf{x}\mapsto(c_1(\mathbf{x}),\mathbf{x})$ et $\mathbf{x}\mapsto(a_0(\mathbf{x}),\mathbf{x})$ mesurables ; $(\theta,\mathbf{x})\mapsto\partial_\theta\ell_n(\theta,\mathbf{x})$ mesurable ⇒ **par stabilité par composition**, $\mathbf{x}\mapsto\partial_\theta\ell_n(a_0(\mathbf{x}),\mathbf{x})$ et $\mathbf{x}\mapsto\partial_\theta\ell_n(c_1(\mathbf{x}),\mathbf{x})$ mesurables, donc les indicatrices aussi, et $a_1$ est mesurable.
*(Le corrigé ne justifie pas la mesurabilité de $a_0=\theta_1(\mathbf{x})$, $b_0=\theta_2(\mathbf{x})$ : elle est supposée.)*

**Q3.**
1. *Racine localisée avec probabilité → 1.* Soit $\theta_0\in\Theta$. Par Q1–Q2, il existe $\varepsilon>0$ tel que
$$\lim_n\mathbb{P}_{n,\theta_0}\Big(\exists\check\theta^{(\varepsilon,\theta_0)}_n\in\,]\theta_0-\varepsilon,\theta_0+\varepsilon[\,,\ \partial_\theta\ell_n(\cdot,X_1,\cdots,X_n)\vert_{\theta=\check\theta^{(\varepsilon,\theta_0)}_n}=0\Big)=1.$$
Le raisonnement reste inchangé pour tout $\varepsilon'\in\,]0,\varepsilon[$ : on peut aussi définir $\check\theta^{(\varepsilon',\theta_0)}_n$.
2. *But.* Montrer que $\forall\delta>0$, $\lim_n\mathbb{P}_{n,\theta_0}(\lvert\tilde\theta_n-\theta_0\rvert>\delta)=0$. Il suffit de le faire pour $\delta\in\,]0,\varepsilon[$ (monotonie en $\delta$).
3. *Inégalités triangulaires.* Soit $\delta\in\,]0,\varepsilon[$ :
$$\begin{aligned}
\lvert\tilde\theta_n-\theta_0\rvert&\le\lvert\tilde\theta_n-\hat\theta_n\rvert+\lvert\hat\theta_n-\theta_0\rvert\\
&\le\lvert\check\theta^{(\delta/3,\theta_0)}_n-\hat\theta_n\rvert+\lvert\hat\theta_n-\theta_0\rvert\\
&\le\lvert\check\theta^{(\delta/3,\theta_0)}_n-\theta_0\rvert+2\lvert\hat\theta_n-\theta_0\rvert,
\end{aligned}$$
où l'avant-dernière inégalité utilise que **la distance entre la racine la plus proche de $\hat\theta_n$ et $\hat\theta_n$ est inférieure ou égale à la distance entre l'autre racine $\check\theta^{(\delta/3,\theta_0)}_n$ et $\hat\theta_n$** (définition de $\tilde\theta_n$).
4. *Sous-additivité.*
$$\mathbb{P}_{n,\theta_0}\big(\lvert\tilde\theta_n-\theta_0\rvert\ge\delta\big)\le\mathbb{P}_{n,\theta_0}\big(\lvert\check\theta^{(\delta/3,\theta_0)}_n-\theta_0\rvert\ge\delta/2\big)+\mathbb{P}_{n,\theta_0}\big(2\lvert\hat\theta_n-\theta_0\rvert\ge\delta/2\big).$$
5. *Second terme.* $\{\hat\theta_n\}$ consistante ⇒ $\lim_n\mathbb{P}_{n,\theta_0}\big(2\lvert\hat\theta_n-\theta_0\rvert>\delta/2\big)=0$.
6. *Premier terme.* Par définition, $\lvert\check\theta^{(\delta/3,\theta_0)}_n-\theta_0\rvert\le\delta/3<\delta/2$ sur $\{(X_1,\cdots,X_n)\in S_n\}$ (ensemble $S_n$ construit avec $\varepsilon=\delta/3$) ; donc, **par la question 1**,
$$\lim_n\mathbb{P}_{n,\theta_0}\big(\lvert\check\theta^{(\delta/3,\theta_0)}_n-\theta_0\rvert\ge\delta/2\big)=\lim_n\mathbb{P}_{n,\theta_0}\big(\lvert\check\theta^{(\delta/3,\theta_0)}_n-\theta_0\rvert\ge\delta/2,\ (X_1,\cdots,X_n)\in S_n\big)=0 .$$
*(Détail d'extraction : la première égalité vient de $\mathbb{P}_{n,\theta_0}(S_n^c)\to0$ (question 1) ; le dernier événement est vide puisque $\lvert\check\theta^{(\delta/3,\theta_0)}_n-\theta_0\rvert\le\delta/3<\delta/2$ sur $S_n$.)*
7. *Conclusion* : $\lim_n\mathbb{P}_{n,\theta_0}(\lvert\tilde\theta_n-\theta_0\rvert\ge\delta)=0$ : **consistance**. De plus, sur $S_n$, une racine existe, donc pour $n$ grand $\tilde\theta_n$ est une racine de (1) avec probabilité $\to1$.

**Q4.** C'est un **modèle de mélange** : on tire une pièce ayant une probabilité $\theta$ de faire 1. Si elle tombe sur 1, on tire l'observation suivant la loi $f_1$ ; si elle tombe sur 0, on la tire selon la loi $f_0$. (Renvoi du corrigé : « Voir PC1/exo3/qu8 et PC2/exo6 », cf. §0.5 point 13.)

**Q5.** La log-vraisemblance d'un échantillon s'écrit
$$\ell_n(\theta,X_1,\cdots,X_n):=\sum_{i=1}^n\log\big(\theta f_1(X_i)+(1-\theta)f_0(X_i)\big).$$
Donc l'équation de la vraisemblance s'écrit
$$\sum_{i=1}^n\frac{f_1(X_i)-f_0(X_i)}{\theta f_1(X_i)+(1-\theta)f_0(X_i)}=0 .$$

**Q6.** Notons $\mu$ la mesure de Lebesgue sur l'ensemble $\mathsf{X}:=\{x\in\mathbb{R}:f_0(x)+f_1(x)>0\}$ muni de la tribu borélienne. Vérifions **Ha, Hb, Hc**.
- **Ha.** Pour tout $x\in\mathsf{X}$ et tout $\theta\in\,]0,1[$, $p_\theta(x)>0$ car c'est le cas d'au moins une des deux densités $f_0(x)$ ou $f_1(x)$. De plus, pour tout $x\in\mathsf{X}$, $\theta\mapsto p_\theta(x)$ est continûment dérivable (affine en $\theta$).
- **Hb.** En utilisant
$$(f_0(x)+f_1(x))\min(\theta,1-\theta)\le\theta f_1(x)+(1-\theta)f_0(x)\le(f_0(x)+f_1(x)),$$
on a, pour tout $\theta\ne\theta'\in\,]0,1[$ et tout $x\in\mathsf{X}$,
$$\min(\theta,(1-\theta))\le\frac{\theta f_1(x)+(1-\theta)f_0(x)}{\theta'f_1(x)+(1-\theta')f_0(x)}\le\frac1{\min(\theta',(1-\theta'))}.$$
Donc
$$\int\Big\lvert\log\frac{\theta f_1(x)+(1-\theta)f_0(x)}{\theta'f_1(x)+(1-\theta')f_0(x)}\Big\rvert\,(\theta f_1(x)+(1-\theta)f_0(x))\,\mathrm{d}x\le\log\Big(\max\Big(\frac1{\min(\theta,(1-\theta))},\frac1{\min(\theta',(1-\theta'))}\Big)\Big)<+\infty .$$
- **Hc.** Le modèle est identifiable car
$$\mu\{x:p_\theta(x)\ne p_{\theta'}(x)\}=\mu\{x:(\theta-\theta')(f_0(x)-f_1(x))\ne0\}=\mu\{x:f_0(x)-f_1(x)\ne0\},$$
et la mesure de ce dernier ensemble n'est pas nulle car $\int\lvert f_0(x)-f_1(x)\rvert\,\mu(\mathrm{d}x)\ne0$.
- ▶ Le modèle satisfait donc les hypothèses de la première partie. **La question 3** (*le corrigé ne précise pas quelle suite consistante $\hat\theta_n$ utiliser ; par exemple, si $f_0,f_1$ ont des espérances finies et distinctes, l'estimateur des moments $\hat\theta_n=(\bar X_n-m_0)/(m_1-m_0)$, $m_j:=\int xf_j(x)\mathrm{d}x$, est consistant par LGN — remarque d'extraction*) assure l'existence d'une suite consistante de racines des équations de vraisemblance.

**Q7 (subsidiaire, bleu). L'algorithme EM : un exemple d'algorithme Majoration-Minoration (MM).**

*a)* On écrit
$$\ell(\theta)-\ell(\theta')=\ln\int F(u,\theta)\mu(\mathrm{d}u)-\ln\int F(u,\theta')\mu(\mathrm{d}u)=\ln\int\frac{F(u,\theta)}{F(u,\theta')}\ \frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\,\mu(\mathrm{d}u),$$
puis on applique **Jensen avec la fonction concave $t\mapsto\ln t$** (sous la probabilité de densité $u\mapsto F(u,\theta')/\int F(v,\theta')\mu(\mathrm{d}v)$) :
$$\ell(\theta)-\ell(\theta')\ge\int\ln\Big(\frac{F(u,\theta)}{F(u,\theta')}\Big)\ \frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\,\mu(\mathrm{d}u).$$

*b)* Pour tout $\theta,\theta'$ :
$$\ell(\theta)\ge\int\ln F(u,\theta)\,\frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\mu(\mathrm{d}u)+\ell(\theta')-\int\ln F(u,\theta')\,\frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\mu(\mathrm{d}u).$$
La fonction
$$G(\theta,\theta'):=\int\ln F(u,\theta)\,\frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\mu(\mathrm{d}u)+\ell(\theta')-\int\ln F(u,\theta')\,\frac{F(u,\theta')}{\int F(v,\theta')\mu(\mathrm{d}v)}\mu(\mathrm{d}u)$$
vérifie $G(\theta',\theta')=\ell(\theta')$ et $\ell(\theta)\ge G(\theta,\theta')$ pour tout $\theta,\theta'$ (**minorante qui touche en $\theta'$**). Algorithme MM : suite $(\theta_k)_k$ définie par
$$\theta_{k+1}\in\mathrm{argmax}_{\theta\in\Theta}G(\theta,\theta_k)\in\mathrm{argmax}_{\theta\in\Theta}\int\ln F(u,\theta)\,\frac{F(u,\theta_k)}{\int F(v,\theta_k)\mu(\mathrm{d}v)}\mu(\mathrm{d}u)\in\mathrm{argmax}_{\theta\in\Theta}\mathbb{E}_{\theta_k}[\ln F(V,\theta)],$$
où sous $\mathbb{P}_{\theta'}$ la loi de la v.a. $V$ est proportionnelle à $v\mapsto F(v,\theta')$. Il reste à vérifier — au cas par cas, selon l'expression de $F$ — que $\theta_{k+1}$ est bien défini.
*(Conséquence non écrite dans le corrigé : $\ell(\theta_{k+1})\ge G(\theta_{k+1},\theta_k)\ge G(\theta_k,\theta_k)=\ell(\theta_k)$ — la vraisemblance croît le long des itérations ; complément d'extraction.)*

*c)* On peut écrire
$$\prod_{i=1}^n\{\theta f_{1,i}+(1-\theta)f_{0,i}\}=\prod_{i=1}^n\mathbb{E}_\theta\Big[f_{1,i}^{U_i}\,f_{0,i}^{(1-U_i)}\Big]=\mathbb{E}_\theta\Big[\prod_{i=1}^nf_{1,i}^{U_i}\,f_{0,i}^{(1-U_i)}\Big]$$
où sous $\mathbb{P}_\theta$ les v.a. $(U_i)_{1\le i\le n}$ sont i.i.d. Bernoulli de paramètre $\theta$ (**indépendance** pour échanger produit et espérance). La log-vraisemblance s'écrit donc
$$\ln\mathbb{E}_\theta\Big[\prod_{i=1}^nf_{1,i}^{U_i}\,f_{0,i}^{(1-U_i)}\Big]=\ln\sum_{(u_1,\cdots,u_n)\in\{0,1\}^n}\prod_{i=1}^nf_{1,i}^{u_i}\,f_{0,i}^{(1-u_i)}\,\theta^{u_i}(1-\theta)^{1-u_i},$$
d'où la forme demandée.

*d)* Il faut identifier la loi des v.a. $(V_i)_{1\le i\le n}$ sous $\mathbb{P}_\theta$. La forme produit de $u\mapsto F(u;\theta)$ entraîne que les $V_i$ sont **indépendantes** et que $V_i$ suit une loi de Bernoulli de paramètre $\theta f_{1,i}/\{\theta f_{1,i}+(1-\theta)f_{0,i}\}$ (probabilité a posteriori que l'observation $i$ vienne de $f_1$). Il vient
$$\begin{aligned}
\mathbb{E}_{\theta_k}[\ln F(V,\theta)]&=\sum_{i=1}^n\mathbb{E}_{\theta_k}\big[V_i\ln(\theta f_{1,i})+(1-V_i)\ln((1-\theta)f_{0,i})\big]\\
&=\ln\theta\sum_{i=1}^n\mathbb{E}_{\theta_k}[V_i]+\ln(1-\theta)\sum_{i=1}^n\mathbb{E}_{\theta_k}[1-V_i]+C
\end{aligned}$$
où $C$ ne dépend pas de $\theta$. L'optimisation en $\theta$ *(détail d'extraction : fonction strictement concave en $\theta$, annulation de la dérivée $\frac{A}{\theta}-\frac{n-A}{1-\theta}$ avec $A=\sum_i\mathbb{E}_{\theta_k}[V_i]$)* conduit à
$$\theta_{k+1}=\frac1n\sum_{i=1}^n\mathbb{E}_{\theta_k}[V_i]=\frac1n\sum_{i=1}^n\frac{\theta_kf_{1,i}}{\{\theta_kf_{1,i}+(1-\theta_k)f_{0,i}\}}.\tag{5}$$

*Application numérique (p. 27).* $f_i\equiv\mathcal{N}(\mu_i,\sigma_i^2)$ ; on simule $(X_1,\cdots,X_n)$ i.i.d. de loi $x\mapsto p_{\theta_\star}(x)$ avec $\theta_\star=0.3$, $\mu_0=-2$, $\mu_1=3$, $\sigma_0^2=2$, $\sigma_1^2=1$, $n=500$. Figure 6 (gauche) : densité $x\mapsto p_{\theta_\star}(x)$ ; (centre) histogramme non normalisé des $n$ observations ; (droite) suite $(\theta_k)_k$ donnée par (5), initialisée en $\theta_1=0.5$. **La valeur limite est $\lim_k\theta_k=0.279$.**

**Méthodes mobilisées :** log-vraisemblance comme somme i.i.d. ; LGN appliquée au log-rapport de vraisemblance ; inégalité de Jensen stricte + identifiabilité (positivité stricte de la divergence de Kullback-Leibler) ; théorème des accroissements finis + théorème des valeurs intermédiaires ; dichotomie (construction d'une racine) ; mesurabilité par récurrence et passage à la limite ; inégalité triangulaire + définition « racine la plus proche » + consistance d'un estimateur préliminaire ; sous-additivité ; vérification d'hypothèses sur un modèle de mélange (encadrement de $p_\theta$) ; variables latentes ; algorithme MM/EM (Jensen, minorante tangente).

**Pièges relevés / remarques du corrigé :**
- Le résultat est **local** : il ne dit pas que l'EMV (maximum global) est consistant, ni quelle racine choisir ; d'où le recours à un estimateur préliminaire consistant $\hat\theta_n$ et à la « racine la plus proche ».
- Hb assure l'intégrabilité nécessaire à la LGN ; Hc rend l'inégalité de Jensen **stricte**.
- La mesurabilité de la racine construite n'est pas automatique (point traité en bleu, et seulement à partir de $a_0,b_0$ supposés mesurables).
- Le rapport $p_\theta/p_{\theta'}$ est borné grâce à $\min(\theta,1-\theta)>0$ : c'est là que $\Theta=\,]0,1[$ **ouvert** sert.
- EM : la valeur limite numérique ($0.279$) est l'EMV pour **cet** échantillon, pas $\theta_\star=0.3$ : écart d'ordre $1/\sqrt n$ *(remarque d'extraction)*.
- Ne pas confondre $e(\theta_0)$ (KL, Ex. 7) et $e(\theta)$ (Ex. 3).

**Résultats numériques :** $\theta_\star=0.3$, $\mu_0=-2$, $\mu_1=3$, $\sigma_0^2=2$, $\sigma_1^2=1$, $n=500$, $\theta_1=0.5$ ; $\lim_k\theta_k=0.279$ ; d'après la Figure 6 (droite), la suite descend de $0.5$ à $\approx0.29$ dès la 2ᵉ itération et est stabilisée vers $0.279$ en 3–4 itérations (lecture graphique).

---

## 2. Synthèse des méthodes de la PC

| Méthode | Exercices où elle apparaît | Résultat du poly utilisé |
|---|---|---|
| **Méthode des moments** (choix de $T$, inversion de $e(\theta)$) | 1 Q1 | Poly ch.2, Déf. 1.2, Méthode 1.1, Ex. 1.4 |
| Calcul de moments par intégration par parties | 1 (rappel) | Poly ch.2, Ex. 1.4 ; ch.1 (lois exponentielle/Gamma) |
| **EMV par annulation du score** + stricte concavité + bords | 2 Q1, 6 Q1, 7 Q5 | Poly ch.2, Déf. 1.4, Déf. 1.6, Méthode 1.2, Lemme 2.3 |
| **EMV d'un paramètre de support** par monotonie ($\hat\alpha_n=X_{1:n}$) | 2 Q5 | Poly ch.2, Ex. 1.11 (uniforme) ; ch.7, Ex. 1.10 |
| Fonction muette / changement de variable (loi d'une transformée) | 2 Q2, 3 Q1 | Poly ch.1 (théorème de transfert) |
| **Loi du minimum** par indépendance ; reconnaissance d'une loi | 2 Q6 | Poly ch.1 §1.5 ; ch.6 Ex. 1.2 (maximum) |
| **LGN faible** | 1, 2, 3, 4, 5, 7 | Poly ch.6, Th. 1.2 ; Compléments Th. 4.2 |
| **Théorème de continuité** (consistance de $\varphi(\bar X_n)$) | 1 Q2, 2 Q2/Q7, 3 Q2, 4 Q2–Q3 | Poly ch.6, Th. 1.1, Th. 2.1 |
| **TCL** | 1, 2, 3, 4, 6 | Poly ch.6, Th. 1.6 |
| **Méthode-δ** | 1 Q2/Q4, 2 Q3, 4 Q2 | Poly ch.6, Th. 1.7 ; Ex. 1.7 |
| **Lemme de Slutsky** (variance estimée, quotient, somme avec un terme $\to0$) | 1 Q4, 2 Q4/Q8, 3 Q2, 4 Q3, 6 Q2 | Poly ch.6, Lemme 1.1 et Remarques |
| Comparaison par la **variance asymptotique** | 1 Q2, 6 Q3 | Poly ch.6, Prop. 1.3 |
| **Information de Fisher** (dérivée seconde), variance asymptotique $=1/I$ | 1 Q3, 2 Q3, 6 | Poly ch.3, Déf. 1.8, Prop. 1.2 ; ch.7, Th. 1.6 |
| Borne de **Cramér-Rao**, efficacité | 6 (préambule) | Poly ch.3, Th. 1.1, Cor. 1.3, Déf. 1.10 |
| **Fonction asymptotiquement pivotale** | 1 Q4, 2 Q4/Q8, 4 Q3 | Poly ch.6, Déf. 1.7, Ex. 1.10 |
| **IC asymptotique « plug-in »** (Slutsky, type Wald) | 1 Q4 (m. 1), 2 Q4 (2), 4 Q3 | Poly ch.6, Méthode 1.1, Ex. 1.12 |
| **Stabilisation de la variance** ($g=\ln$) puis bijection | 1 Q4 (m. 2) | Poly ch.6, Ex. 1.13 |
| **Inversion directe du pivot** (type Wilson) | 1 Q4 (m. 3), 2 Q4 (3) | Poly ch.6, Ex. 1.11 |
| **Pivot exact** $\mathcal{E}(1)$, IC de longueur minimale | 2 Q8 | Poly ch.4, Déf. 1.2, Prop. 1.1, Méthode 1.1 |
| **Décomposition biais-variance** | 2 Q6 | Poly ch.3, Prop. 1.1 |
| **Inégalité de Markov** (EQM → 0 ⇒ consistance) | 2 Q7 | Poly ch.6, Lemme 2.1, Prop. 2.2 |
| Vitesse $n$ / modèle non régulier | 2 Q6–Q8 | Poly ch.6, Ex. 1.5 ; ch.7, Ex. 1.10 |
| **Test asymptotique** : seuil par loi limite sous $H_0$, niveau asymptotique | 3 Q1–Q2 | Poly ch.6, Déf. 1.9–1.10, Ex. 1.14 |
| **Consistance d'un test** par seuil auxiliaire $M$, double limite ($n$ puis $M$) | 3 Q1–Q2 | Poly ch.6, Déf. 1.11, Ex. 1.14 |
| Test du **signe** (Bernoulli, médiane) | 3 Q1 | — (comparaison en PC7 / ch.7) |
| **Représentation probabiliste d'une série** (transfert) | 5 | Poly ch.1 (transfert) ; somme de Poisson indépendantes |
| Proba ⇒ loi ; **loi vers une constante ⇔ proba** | 4 Q2, 5, 6 (note 2) | Poly ch.6, Th. 2.2 ; Portmanteau Th. 1.3 |
| Convergence en loi vers $\delta_0$ par fonctions test + **convergence dominée** | 6 Q2 | Poly ch.6, Déf. 1.4 |
| Minoration géométrique du risque, critère uniforme vs ponctuel | 6 Q3 | Poly ch.6, Compléments §4.5 ; ch.7, Déf. 4.1 |
| **KL > 0** par Jensen strict + identifiabilité | 7 Q1 | Poly ch.2, Déf. 1.7, Th. 1.1, Th. 2.2, Prop. 1.3 ; ch.1, Déf. 2 |
| Accroissements finis + **valeurs intermédiaires**, dichotomie | 7 Q2 | — (analyse réelle) |
| Mesurabilité par récurrence / composition | 7 Q2 | — |
| Estimateur préliminaire consistant + « racine la plus proche » | 7 Q3 | Poly ch.7, Th. 1.3 (consistance des Z-estimateurs) |
| Vérification d'hypothèses sur un **mélange** | 7 Q6 | Poly ch.1, Ex. 1.7 ; PC1 Ex. 5 Q8, PC2 Ex. 2 |
| Algorithme **MM / EM** (Jensen, variables latentes) | 7 Q7 | — (hors poly) |

---

## 3. Idées de reformulation en exercices interactifs (sans saisie de formule)

### Exercice 1 — IC asymptotiques pour la loi exponentielle
1. **QCM (Q2)** : « La variance asymptotique de $\hat\theta^{(2)}_n=\sqrt{2/\overline{X^2}_n}$ est : (a) $\theta^2$ ; (b) $\frac54\theta^2$ ✔ ; (c) $\frac{20}{\theta^4}$ ; (d) $5\theta^2$. » Puis **vrai/faux** : « $\hat\theta^{(1)}_n$ est préférable car sa variance asymptotique est plus petite » (V) ; « La méthode-δ demande $\phi_2'$ évaluée en $\theta$ » (F : en $2/\theta^2$) ; « $\theta^2=I_1(\theta)^{-1}$ » (V).
2. **Associer** chaque méthode à son IC et à son outil : Slutsky ↔ $[\hat\theta(1-x);\hat\theta(1+x)]$ ; stabilisation de la variance ($g=\ln$) ↔ $[\hat\theta e^{-x};\hat\theta e^{x}]$ ; inversion du pivot ↔ $[\hat\theta/(1+x);\hat\theta/(1-x)]$ (avec $x=z_{1-\alpha/2}/\sqrt n$).
3. **Application numérique + lecture de figure** : « $n=100$, $\hat\theta^{(1)}_n=2$, $\alpha=5\%$. Quel est l'IC de la méthode 3 ? » (a) $[1.608;\ 2.392]$ ; (b) $[1.644;\ 2.433]$ ; (c) $[1.672;\ 2.488]$ ✔ ; (d) $[1.80;\ 2.20]$. Variante : « À $x=0.5$, quelle méthode donne l'IC le plus court ? » (méthode 1 ✔, longueur 1 contre 1.04 et 1.33).

### Exercice 2 — Pareto translaté
1. **Étape suivante à choisir (Q5)** : « $\mathrm{L}_n(\alpha,\eta)=\eta^n\alpha^{n\eta}(\prod X_i)^{-(\eta+1)}\mathbb{1}_{\{\alpha\le X_{1:n}\}}$. Pour maximiser en $\alpha$ : » (a) annuler $\partial_\alpha\ell_n$ ; (b) remarquer que $\alpha\mapsto\alpha^{n\eta}$ croît puis l'indicatrice s'annule ⇒ $\hat\alpha_n=X_{1:n}$ ✔ ; (c) $\hat\alpha_n=\bar X_n(\eta-1)/\eta$ (c'est un estimateur des moments, pas l'EMV).
2. **Preuve à ordonner (Q6–Q8)** : « $\mathbb{P}(\hat\alpha_n>y)=\mathbb{P}(X_1>y)^n$ (indépendance) » → « $=(\alpha/y)^{n\eta}$ » → « $\hat\alpha_n\sim$ Pareto$(\alpha,n\eta)$ » → « $\mathbb{P}(n\eta\ln(\hat\alpha_n/\alpha)\le x)=1-e^{-x}$ » → « pivot exact $\mathcal{E}(1)$ » → « remplacer $\eta$ par $\hat\eta^{(2)}_n$ (Slutsky) » → « IC $[\hat\alpha_ne^{-t_{1-\beta}/(n\hat\eta^{(2)}_n)},\ \hat\alpha_n]$ ». Distracteur : « TCL ⇒ $\sqrt n(\hat\alpha_n-\alpha)$ asymptotiquement normal ».
3. **QCM / vrai-faux (vitesse)** : « L'EQM de $\hat\alpha_n$ est équivalente à : $\frac{\alpha^2}{n\eta^2}$ / $\frac{2\alpha^2}{n^2\eta^2}$ ✔ / $\frac{\alpha}{n\eta}$ » ; « Le modèle est régulier en $\alpha$ » (F) ; « La longueur de l'IC pour $\alpha$ décroît en $1/n$ » (V) ; « Avec $\beta=5\%$, $t_{0.95}$ de $\mathcal{E}(1)$ vaut $\approx3.00$ » (V, $=\ln20$).

### Exercice 3 — Deux tests consistants
1. **QCM (Q1)** : « Sous $H_0$, $\mathbb{1}_{\{X_k\ge\theta_0\}}$ suit : Bernoulli$(1/2)$ ✔ / Bernoulli$(F(\theta_0))$ / $\mathrm{N}(0,1)$ » ; « Le seuil $t_n$ est : $z_{1-\alpha/2}$ / $z_{1-\alpha}$ ✔ / $z_\alpha$ ». **Application numérique** : $n=100$, 60 observations $\ge\theta_0$ : $M_n=2$ ; rejet à 5 % ? (oui ✔, $2>1.645$).
2. **Trouver l'erreur (consistance)** : présenter le raisonnement fautif « Sous $\mathbb{P}_{n,\theta}$, $M_n\Rightarrow\mathrm{N}(0,1)$, donc $\mathbb{P}_{n,\theta}(M_n>z_{1-\alpha})\to\alpha$ et le test n'est pas consistant » ; l'erreur : sous $H_1$, $M_n$ n'est pas centrée ($e(\theta)>1/2$), la statistique part à $+\infty$ ; il faut centrer en $e(\theta)$ et utiliser le seuil auxiliaire $M$.
3. **Preuve à ordonner (consistance)** : « réécrire l'événement en centrant en $e(\theta)$ » → « $\sqrt n(1/2-e(\theta))\to-\infty$ » → « pour $n\ge N_M$, minorer par $\mathbb{P}(\cdot>\frac{z_{1-\alpha}}{2\sqrt{v(\theta)}}-M)$ » → « TCL ⇒ limite $\ge1-\Phi(\dots-M)$ » → « $M\to+\infty$ ». **Vrai/faux** : « Le test du signe exige $\sigma_q^2<\infty$ » (F) ; « Deux tests consistants de même niveau asymptotique sont équivalents » (F).

### Exercice 4 — Poisson
1. **QCM (Q2)** : « Variance asymptotique de $e^{-\bar X_n}$ : $\theta$ / $e^{-2\theta}$ / $\theta e^{-2\theta}$ ✔ / $\theta e^{-\theta}$ ».
2. **Application numérique (Q3)** : « $n=100$, $\bar X_n=2$, $\alpha=5\%$ : l'IC pour $e^{-\theta}$ est » (a) $[0.098;\ 0.173]$ ✔ ; (b) $[0.128;\ 0.142]$ ; (c) $[0.060;\ 0.211]$.
3. **Associer** chaque outil à son étape : TCL ↔ $\sqrt n(\bar X_n-\theta)\Rightarrow\mathrm{N}(0,\theta)$ ; méthode-δ ↔ loi limite de $e^{-\bar X_n}$ ; LGN + continuité ↔ $\gamma(\bar X_n)\to\gamma(\theta)$ ; Slutsky ↔ pivot $G_n\Rightarrow\mathrm{N}(0,1)$. **Vrai/faux** : « si $\bar X_n=0$, l'IC est réduit à $\{1\}$ » (V).

### Exercice 5 — LGN et série
1. **Preuve à ordonner** : « $X_1+\dots+X_n\sim\mathcal{P}(n\lambda)$ » → « la série vaut $\mathbb{E}_{n,\lambda}[g(\bar X_n)]$ » → « LGN : $\bar X_n\to\lambda$ en probabilité » → « donc en loi vers $\delta_\lambda$ » → « $g$ continue bornée ⇒ $\mathbb{E}[g(\bar X_n)]\to g(\lambda)$ ».
2. **QCM** : « Quelle hypothèse sur $g$ est utilisée de façon essentielle ? » continue et bornée ✔ / dérivable / intégrable / monotone.
3. **Application numérique** : « Avec $g=\cos$, $\lambda=1$, la série vaut $0.5153$ pour $n=10$ ; quelle est sa limite ? » $\cos1\approx0.540$ ✔ / $1$ / $e^{-1}$.

### Exercice 6 — Hodges
1. **QCM (Q2)** : « Variance asymptotique de $\tilde\theta_n$ en $\theta=0$ : $1$ / $b$ / $b^2$ ✔ / $0$ » ; « en $\theta\ne0$ : $1$ ✔ / $b^2$ ».
2. **Lecture de figure / vrai-faux** : « Pour $n=500$, $a_n=n^{-1/4}$, $b=0.25$, le maximum de $\theta\mapsto nR(\tilde\theta_n,\theta)$ vaut environ : 1 / 3.8 / 8 ✔ » ; « Ce maximum croît avec $n$ » (V) ; « $\tilde\theta_n$ prend des valeurs dans $]ba_n,a_n[$ » (F) ; « $\tilde\theta_n$ contredit la borne de Cramér-Rao à $n$ fixé » (F : il est biaisé).
3. **Trouver l'erreur** : « $\sqrt n\tilde\theta_n$ a même loi que $bU+(1-b)U\mathbb{1}_{\{\lvert U\rvert\ge\sqrt na_n\}}$ ; comme $\mathbb{1}_{\{\lvert U\rvert\ge\sqrt na_n\}}\to1$, la limite est $U$ » — erreur : $\sqrt na_n\to+\infty$ donc l'indicatrice $\to0$, la limite est $bU$. **Étape suivante** : « pour montrer $U\mathbb{1}_{\{\lvert U\rvert\ge\sqrt na_n\}}\Rightarrow\delta_0$, on utilise : TCL / convergence dominée ✔ / Markov ».

### Exercice 7 — Racines des équations de vraisemblance
1. **Preuve à ordonner (Q1–Q2)** : « $\frac1n(\ell_n(\theta_0)-\ell_n(\theta_0-\varepsilon))=\frac1n\sum\log\frac{p_{\theta_0}}{p_{\theta_0-\varepsilon}}(X_k)$ » → « LGN (Hb) ⇒ limite $\mathrm{KL}(\mathbb{Q}_{\theta_0},\mathbb{Q}_{\theta_0-\varepsilon})$ » → « Jensen strict + identifiabilité ⇒ $>0$ » → « $\mathbb{P}(S_n)\to1$ » → « accroissements finis : dérivée $>0$ à gauche, $<0$ à droite » → « valeurs intermédiaires ⇒ racine dans $]\theta_0-\varepsilon,\theta_0+\varepsilon[$ ».
2. **Associer** chaque hypothèse à son rôle : Ha ↔ dérivée continue (valeurs intermédiaires) ; Hb ↔ intégrabilité pour la LGN ; Hc ↔ Jensen **strict** ($\mathrm{KL}>0$) ; consistance de $\hat\theta_n$ ↔ choix de la « racine la plus proche ».
3. **Application numérique / QCM (Q7)** : « L'itération EM pour le mélange est : (a) $\theta_{k+1}=\frac1n\sum_i\frac{\theta_kf_{1,i}}{\theta_kf_{1,i}+(1-\theta_k)f_{0,i}}$ ✔ ; (b) $\theta_{k+1}=\frac1n\sum_i\frac{f_{1,i}}{f_{0,i}+f_{1,i}}$ ; (c) $\theta_{k+1}=\theta_k+\frac1n\sum_i\frac{f_{1,i}-f_{0,i}}{p_{\theta_k}(x_i)}$. » Puis « Avec $\theta_\star=0.3$, $n=500$, départ $\theta_1=0.5$, la limite observée est : $0.3$ / $0.279$ ✔ / $0.5$ » et **vrai/faux** : « la limite d'EM est exactement $\theta_\star$ » (F : c'est l'EMV de l'échantillon) ; « la vraisemblance croît le long des itérations MM » (V).
