# PC 7 — Comparer des tests par leur puissance locale (approche de Pitman, contiguïté) ; normalité asymptotique de l'EMV ; Z-estimateurs robustes de translation

> **Sources extraites :** `S7_APM-41033-EP-PC7-enonce` (énoncé, 7 p., Exercices 1 à 5, Figures 1 à 4) et `S7_APM-41033-EP-PC7-corrige` (corrigé officiel, paginé p. 8 à 26, Figures 5 à 7). Toutes les formules ont été vérifiées visuellement sur les deux PDF.
> **Convention de citation :** « Énoncé PC7, p. N » / « Corrigé PC7, p. N » pour la PC ; « Poly ch.7, Th. 1.4 », « Poly ch.6, Lemme 1.1 »… pour le cours (numérotation de `content/extraction/ch7.md`, `ch6.md`, `ch3.md`, `ch2.md`).
> **Code couleur du corrigé officiel :** les passages imprimés en **bleu** dans le corrigé (p. 9, 11–12, 13, 14, 20, 22) sont des compléments ou des commentaires qui vont au-delà de la question ; ils sont signalés ci-dessous par *[Complément du corrigé, en bleu]*.
> **Remarques de l'extracteur :** tout ajout qui ne figure pas dans le corrigé officiel (justification intermédiaire non écrite, correction de coquille, application numérique, vérification croisée) est explicitement marqué *[Extracteur]*.
> **Renvois à l'ancien polycopié :** l'énoncé et le corrigé citent des numéros d'un « polycopié d'origine » (Définition I-4.16, Théorème IV.5-41, Théorème IV-5.30, théorème II-2.15) qui ne sont **pas** ceux du poly actuel : voir la table de correspondance du §0.4.

---

## 0. Chapitres du poly mobilisés et rappels donnés en tête d'énoncé

### 0.1 Chapitres mobilisés

La PC 7 est la petite classe de la **semaine 7**, associée au **chapitre 7 « Théorie asymptotique des M- et Z-estimateurs »** : le poly ch.7, §1.8 « Le programme des exercices » (p. 29), décrit exactement ces cinq exercices. Mais elle mobilise **massivement le chapitre 6** (statistique asymptotique : TCL, Slutsky, méthode-δ, tests asymptotiques, Portmanteau), le **chapitre 3** (modèle régulier, information de Fisher, biais et risque quadratique) et le **chapitre 2** (calcul d'EMV). L'Exercice 1 fait aussi appel aux notions de **fonction puissance** et de test **uniformément le plus puissant** (ch.4–5, PC5) et introduit des outils **absents du poly actuel** (théorème de Lindeberg-Feller, contiguïté).

| Exercice | Notions du ch.7 mobilisées | Notions des autres chapitres |
|---|---|---|
| Exo 1 (comparaison de tests, Pitman) ((⋆) puis (⋆⋆⋆)) | modèle régulier (Cadre 1.1), score et information de Fisher (Déf. 1.3, Déf. 1.4, éq. (10)), alternatives locales $\theta_n=\theta^\star+h/\sqrt n$ annoncées en §1.8 | ch.6 : TCL (Th. 1.6), Slutsky (Lemme 1.1), transformation continue (Th. 1.4, cas général admis), Portmanteau (Th. 1.3), consistance de la variance empirique (Prop. 1.2), niveau asymptotique (Déf. 1.10), suite de tests consistante (Déf. 1.11), test de Student asymptotique (Ex. 1.14) ; ch.3 : modèle régulier (Déf. 1.6), score centré et $I(\theta)=-\mathbb{E}_\theta[\ddot\ell]$ ; fonction puissance et test UPP (ch.4–5) ; **hors poly actuel** : Lindeberg-Feller, contiguïté, convergence dominée (outil d'intégration) |
| Exo 2 (Gamma$(2,\theta)$) (⋆) | Th. 1.6 (normalité asymptotique de l'EMV), Déf. 1.4 (information de Fisher) | ch.2 : EMV (Déf. 1.4, Méthode 1.2) ; ch.3 : biais (Déf. 1.1), risque quadratique (Déf. 1.3), décomposition biais-variance (Prop. 1.1) ; ch.6 : LGN, TCL, Slutsky, méthode-δ (Th. 1.7), intervalle de confiance asymptotique (Méthode 1.1) |
| Exo 3 (log-normale $(\theta,\theta)$) (⋆) | (vérification possible par le Th. 1.6 — non faite dans le corrigé) | ch.2 : EMV ; changement de variable (densité d'une loi image) ; ch.6 : TCL, méthode-δ (Th. 1.7), Slutsky, IC asymptotique |
| Exo 4 ($\mathrm{N}(\theta,1)$, $\Theta=\mathbb{R}_+$) (⋆) | remarque (a) après le Th. 1.4 (p. 21 : hypothèses locales, points **intérieurs**), Compléments §4.9 (frontière) | ch.2 : EMV sous contrainte ; ch.6 : Slutsky, convergence en probabilité |
| Exo 5 (Z-estimateurs $\psi(\theta,x)=\gamma(x-\theta)$) (⋆⋆⋆) | Déf. 1.2 (Z-estimateur), Ex. 1.2 (moyenne), Ex. 1.4 ($\gamma$ impaire croissante, médiane), consistance (ici par **monotonie**, pas par le Th. 1.3), **Th. 1.4** (normalité asymptotique des Z-estimateurs) et sa forme faible $\sqrt n\,\widehat\Psi_n(\hat\theta_n)\to0$, Th. 2.1 (LGN i.i.d. intégrables), §4.9 point 3 | ch.2 : médiane / moyenne comme Z-estimateurs (Ex. 1.6) ; statistiques d'ordre ; théorème des valeurs intermédiaires ; statistique robuste (contamination) |

### 0.2 Rappels et conventions donnés dans l'énoncé

- **Test uniformément le plus puissant (préambule de l'Exo 1, Énoncé p. 1).** Si $\phi_n$, $\phi_n^\star$ sont deux tests de fonctions puissance respectives $\beta_n$ et $\beta_n^\star$, on dit que $\phi_n^\star$ est *uniformément le plus puissant au niveau $\alpha$* si $\sup_{\theta\in\Theta_0}\beta_n^\star(\theta)\le\alpha$ et, pour tout test $\phi_n$ de niveau $\alpha$, $\beta_n^\star(\theta)\ge\beta_n(\theta)$ pour $\theta\in\Theta_1$. « Ces conditions sont difficiles à vérifier en pratique ; on décide donc d'établir la comparaison sur les fonctions puissance asymptotiques. »
- **Cadre de l'Exo 1.** $\Theta$ ouvert de $\mathbb{R}$, $\{\mathbb{Q}_\theta=q_\theta\cdot\mathrm{d}\nu,\ \theta\in\Theta\}$ famille de lois sur $\mathsf{X}\in\mathcal{B}(\mathbb{R})$ muni de sa tribu borélienne $\mathcal{X}$ ; modèle **régulier** (« voir Polycopié Définition I-4.16 » = Poly ch.3, Déf. 1.6 / Poly ch.7, Cadre 1.1). Notations :
$$\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n},\qquad\bar X_n:=\frac1n\sum_{k=1}^nX_k,\qquad S_n^2:=\frac1n\sum_{k=1}^n(X_k-\bar X_n)^2.$$
  **Attention :** $S_n^2$ est ici la variance empirique **non corrigée** (facteur $1/n$), alors que l'Ex. 1.14 du Poly ch.6 utilise $1/(n-1)$ ; asymptotiquement sans importance.
- **Note de bas de page 1 (Énoncé p. 1).** Les conditions « $q$ symétrique, continue, $q(0)>0$ » « entrainent que la médiane est unique et vaut zero, et que la fonction de répartition $F$ est strictement croissante dans un voisinage de 0 ».
- **Note de bas de page 2 (Énoncé p. 1) — sens de la convergence en loi sous une suite de paramètres.** La convergence $\sqrt n(U_n-\mu(\theta_n))\overset{\mathbb{P}_{n,\theta_n}}{\Longrightarrow}\mathrm{N}(0,\sigma^2)$ signifie : pour toute fonction continue et bornée $f$,
$$\lim_n\mathbb{E}_{n,\theta_n}\Big[f\big(\sqrt n\,(U_n-\mu(\theta_n))\big)\Big]=\int f(x)\frac1{\sigma\sqrt{2\pi}}\exp(-0.5\sigma^{-2}x^2)\,\mathrm{d}x.$$
- **Note de bas de page 3 (Énoncé p. 3).** Résultat sur les tailles d'échantillon : « voir par exemple Chapitre 13, E.L. Lehmann and J.P. Romano, *Testing Statistical Hypotheses* » (résultat **admis**).
- **Convention de la loi Gamma (Exo 2, Énoncé p. 3)** — paramétrisation forme / **intensité** : pour $(a,b)\in\mathbb{R}_+^*\times\mathbb{R}_+^*$, $\Gamma(a,b)$ est la loi de densité par rapport à la mesure de Lebesgue
$$x\mapsto\frac1{\Gamma(a)}b^ax^{a-1}\mathrm{e}^{-bx}\mathbb{1}_{\mathbb{R}_+^*}(x).$$
  On rappelle que l'espérance d'une loi $\Gamma(a,b)$ est $a/b$ et sa variance $a/b^2$. **Additivité :** si $X\sim\Gamma(a,b)$, $Y\sim\Gamma(a',b)$ et $X,Y$ indépendantes, alors $X+Y\sim\Gamma(a+a',b)$.
- **Loi log-normale (Exo 3, Énoncé p. 4).** Une variable aléatoire $X$ à valeurs dans $\mathbb{R}_+^*$ suit une loi log-normale de paramètre $(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*$ si $Y=\log(X)$ est normale de moyenne $\mu$ et de variance $\sigma^2$ (modèle de Black-Scholes-Merton, voir PC1). Densité (Corrigé p. 20) :
$$f(x)=\frac1{\sqrt{2\pi}\,\sigma x}\,\mathrm{e}^{-(\log(x)-\mu)^2/2\sigma^2}\mathbb{1}_{\{x>0\}}.$$
- **Quantiles.** $z_{1-\alpha}$ (resp. $z_{1-\alpha/2}$) quantile d'ordre $1-\alpha$ (resp. $1-\alpha/2$) de $\mathrm{N}(0,1)$ ; $\Phi$ fonction de répartition de $\mathrm{N}(0,1)$ ; $\Phi^{-1}(u)$ quantile d'ordre $u$ (Exo 3).

### 0.3 Notations propres à la PC (à reproduire telles quelles)

| Notation | Signification | Où |
|---|---|---|
| $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\theta\in\Theta\})$, $\mathbb{Q}_\theta=q_\theta\cdot\mathrm{d}\nu$ | expérience à une observation (X sans empattement, loi en lettre ajourée, mesure dominante $\nu$) | Exo 1 |
| $\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n}$, $\mathbb{E}_{n,\theta}$ | loi et espérance de l'échantillon | partout |
| $\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}$, $\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}$ | convergence en loi / en probabilité sous $\mathbb{P}_{n,\theta}$ (le paramètre peut dépendre de $n$ : $\overset{\mathbb{P}_{n,\theta_n}}{\Longrightarrow}$) | partout |
| $\mathrm{N}(m,s^2)$ (N romain) ; parfois $\mathcal{N}(0,1)$ | loi normale ; les deux graphies coexistent dans le corrigé | partout |
| $\phi_n$, $\phi_n^\star$, $\beta_n$, $\beta_n^\star$ | tests et fonctions puissance | Exo 1 |
| $\phi_{n,1}:=\mathbb{1}_{\{M_n\ge t_n\}}$, $\phi_{n,2}$ ; $\mathcal{R}_{n,1}$, $\mathcal{R}_{n,2}$, $\mathcal{R}_n$ (calligraphique) | tests et zones de rejet | Exo 1 |
| $M_n$, $T_n$, $B_n:=n^{-1}\sum_k\mathbb{1}_{X_k\ge\theta_0}$ | statistique du signe, statistique de Student, fréquence empirique | Exo 1 |
| $F$, $\sigma_q^2$, $\sigma^2(\theta):=F(\theta_0-\theta)(1-F(\theta_0-\theta))$ | f.d.r. et variance de $q$ ; variance de Bernoulli | Exo 1 Q1 |
| $\theta_n=\theta_0+h_n/\sqrt n$, $h_n\to h>0$ | alternatives locales de Pitman, éq. (1) | Exo 1 |
| $U_n$, $\mu(\theta)$, $\sigma$, $C_n$, $\mu'(\theta_0)$ | statistique générique, son centrage, son écart-type limite, estimateur de $\sigma$, « pente » $\mu'(\theta_0)/\sigma$ | Exo 1 Q2–Q6 |
| $I(\theta_0)$ (I **droit**, non ajouré) | information de Fisher de $q_{\theta_0}\cdot\mathrm{d}\nu$ (Exo 1) ; le corrigé de l'Exo 2 écrit $\mathbb{I}(\theta)$ (ajouré, comme le Poly ch.7) | Exo 1, Exo 2 |
| $L_n(x_1,\dots,x_n):=\prod_k q_{\theta_n}(x_k)/q_{\theta_0}(x_k)$ | **rapport de vraisemblance** (et non la vraisemblance !) | Exo 1 Q3(c) |
| $\Delta_n(x)$, $\mathcal{V}_0$, $h$ | reste de Taylor, voisinage de $\theta_0$, fonction dominante (attention : $h$ désigne aussi la limite de $h_n$) | Exo 1 Q3 |
| $Y_{n,k}$, $\sigma_g^2(\theta)$, $D_g(\theta)$ | tableau triangulaire, variance et moment d'ordre $2+\delta$ de $g$ | Exo 1 Q5 |
| $N_i(\theta)$, $\sigma_i$, $\mu_i'$ | taille d'échantillon nécessaire au test $i$, ses constantes | Exo 1, fin |
| $Z_n:=(X_1,\dots,X_n)$ | observation | Exo 2, 3 |
| $\mathrm{L}_n(\theta,Z_n)$ (L romain), $\ell_n(\theta,Z_n)$, $\dot\ell_n$, $\ddot\ell_n$ | vraisemblance, log-vraisemblance (non normalisée), dérivées en $\theta$ ; $\ddot l(\theta,x)$ dans $\mathbb{I}(\theta)$ | Exo 2 |
| $\hat\theta_n$, $b(\hat\theta_n)$, $EQM(\hat\theta_n)$, $\widehat{I}_n$ | EMV, biais, erreur quadratique moyenne, intervalle de confiance aléatoire | Exo 2 |
| $\mathbb{Q}_\theta$ (Exo 3) | **loi normale de paramètres $(\theta,\theta)$** (loi de $Y_i=\log X_i$, et non de $X_i$) | Exo 3 |
| $Y_i=\log(X_i)$, $\bar T_n:=\frac1n\sum Y_i^2$, $\sigma^2(\theta)$, $\sigma_0^2(\theta)$, $\varphi(z)=\sqrt{\frac14+z}$, $G\sim\mathrm{N}(0,1)$ | variables transformées, statistique suffisante, variances asymptotiques, fonction de la méthode-δ | Exo 3 |
| $\hat\theta_n^{\mathrm{MV}}$ (énoncé) / $\hat\theta_n$ (corrigé) | EMV | Exo 4 |
| $S_n^2:=n^{-1}\sum_kX_k^2$ (Exo 4 !) | **moment empirique d'ordre 2 non centré** — différent du $S_n^2$ de l'Exo 1 | Exo 4 |
| $f$, $q_\theta(x):=f(x-\theta)$, $\mathrm{Leb}$ | densité symétrique, modèle de translation | Exo 5 |
| $\gamma$, $\gamma_0=\mathrm{signe}$, $\gamma_\infty(x)=x$, $\gamma_k$, $\gamma_1(x)=\mathrm{signe}(x)(\lvert x\rvert\wedge1)$ | fonctions d'influence | Exo 5 |
| $\Psi_n(\theta)$ (**sans chapeau**, contrairement au $\widehat\Psi_n$ du Poly ch.7) ; $\psi_n$ (minuscule, coquille du corrigé Q5) | équation d'estimation empirique | Exo 5 |
| $\Psi_{\theta_0}(\theta):=\mathbb{Q}_{\theta_0}(\gamma(\cdot-\theta))$, $\Psi_0$ | équation d'estimation limite ; $\Psi_{\theta_0}(\theta)=\Psi_0(\theta-\theta_0)$ | Exo 5 |
| **H1**, **H2**, **H3** ; éq. (4)–(9) | hypothèses et équations numérotées de l'Exo 5 | Exo 5 |
| $V[\gamma]$ | variance asymptotique du Z-estimateur associé à $\gamma$ | Exo 5 |
| $\mathbb{Q}_0[\gamma^2]$, $\mathbb{E}_0[\dot\gamma(X_1)]$, $\dot\gamma$ | intégrales sous $\mathbb{Q}_0=f\cdot\mathrm{Leb}$ ; $\dot\gamma$ = dérivée de $\gamma$ (notée aussi $\gamma'$) | Exo 5 |
| $X_{k:n}$ | statistiques d'ordre | Exo 5 |

### 0.4 Correspondance des renvois (« polycopié d'origine » → poly actuel)

| Renvoi dans la PC | Contenu | Poly actuel |
|---|---|---|
| « Polycopié Définition I-4.16 » (Énoncé p. 1) | modèle régulier | Poly ch.3, Déf. 1.6 ; version scalaire Poly ch.7, Cadre 1.1 |
| « Polycopié, Théorème IV.5-41 » (Énoncé p. 2, Corrigé p. 14) | théorème de Lindeberg-Feller (TCL pour tableaux triangulaires) | **absent du poly actuel** (le TCL du Poly ch.6, Th. 1.6, ne couvre que le cas i.i.d. à loi fixe) |
| « Théorème IV-5.30 » (Corrigé p. 13) | transformation continue lorsque la fonction n'est continue que sur un ensemble de mesure 1 | Poly ch.6, Th. 1.4 (cas général **admis**, cf. ch.6 Outils §2.6) |
| « théorème II-2.15 du cours » (Corrigé p. 24) | normalité asymptotique des Z-estimateurs sous l'hypothèse $\sqrt n\,\widehat\Psi_n(\hat\theta_n)\to0$ en probabilité | Poly ch.7, **Th. 1.4** (cas scalaire) et encadré « complément » p. 21 (forme faible) |
| « PC2/Ex1/qu6 » (Corrigé p. 12, en bleu) | $A$ de classe $C^\infty$ pour une famille exponentielle canonique | dans l'extraction `pc2.md`, ce résultat se trouve à l'**Exercice 3** de la PC2 (famille exponentielle), question sur la différentiabilité de $G=\exp(A)$ *[Extracteur : le numéro « Ex1 » du corrigé semble erroné]* |
| « Exemple 1.14 » / test de Student (implicite, Exo 1 Q1(b)) | test de Student asymptotique | Poly ch.6, Ex. 1.14 |

### 0.5 Coquilles et décalages relevés dans les documents de la PC

1. **Exo 2 — décalage de numérotation énoncé / corrigé.** L'énoncé a 5 questions (EMV ; biais et risque ; consistance ; normalité asymptotique ; IC). Le corrigé n'en a que 4 : son item « 3. » (« Nous présentons trois solutions ») traite la **normalité asymptotique** (Q4 de l'énoncé) et son item « 4. » traite l'**IC** (Q5 de l'énoncé). La consistance (Q3) n'est traitée qu'implicitement, dans l'item 4 : « la normalité asymptotique de $\hat\theta_n$ entraine (par Slutsky) que $\hat\theta_n\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\theta$ ». **Dans ce fichier on suit la numérotation de l'énoncé.**
2. **Exo 1 Q6(b), Corrigé p. 15** : « $\sqrt n\big(\frac{T_n-\theta}{S_n}\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1)$ » — lire $\sqrt n\,\frac{\bar X_n-\theta}{S_n}$ (et non $T_n$, qui contient déjà $\sqrt n$) ; de même « $\sqrt n(T_n-\mu(\theta_0))>C_nZ_{1-\alpha}$ » doit se lire $\sqrt n(\bar X_n-\mu(\theta_0))>C_nz_{1-\alpha}$ *[Extracteur]*.
3. **Exo 1 Q1(a)** : l'énoncé définit $\phi_{n,1}:=\mathbb{1}_{\{M_n\ge t_n\}}$ (inégalité large), le corrigé utilise la zone $\{2M_n>z_{1-\alpha}\}$ (stricte) ; sans effet asymptotique car la loi limite $\mathrm{N}(0,1/4)$ ne charge pas les points *[Extracteur]*.
4. **Exo 1 Q3(b), Corrigé p. 12** : le développement écrit $\ln q_{\theta_n}-\ln q_{\theta_0}=(\theta_n-\theta_0)\partial_\theta\ln q_{\theta_0}+\frac12(\theta_n-\theta_0)^2\partial_\theta^2\ln q_{\theta_0}+\frac12(\theta_n-\theta_0)^2\int_0^1(\dots)\,\mathrm{d}t$ ; la formule de Taylor exacte avec reste intégral porte un poids $(1-t)$ (soit $(\theta_n-\theta_0)^2\int_0^1(1-t)(\dots)\,\mathrm{d}t$). La majoration utilisée ensuite (par le $\sup$ sur $0\le t\le\delta_n$) reste valable avec le bon poids *[Extracteur]*.
5. **Exo 5 Q5, Corrigé p. 24** : « $\psi_n(\hat\theta_n)=0$ » — lire $\Psi_n(\hat\theta_n)=0$. Par ailleurs la dérivée en $\theta$ de $\psi(\theta,x)=\gamma(x-\theta)$ est $-\gamma'(x-\theta)$ ; le corrigé écrit $\int\gamma'(x-\theta_0)f(x-\theta_0)\,\mathrm{Leb}(\mathrm{d}x)$ sans le signe moins, ce qui est sans conséquence puisque ce terme apparaît **au carré** dans la variance *[Extracteur]*.
6. **Exo 5 Q7(b), Corrigé p. 25** : au dénominateur de $\lim_{\tau\to+\infty}V[\gamma_k]$, le corrigé écrit $(1-\varepsilon)^2\big(\int_{\mathbb{R}}\mathbb{1}_{\{\lvert x\rvert\le k\}}f(x)\,\mathrm{d}x\big)^2$ : il faut lire $f=f_{\mathrm{N}(0,1)}$ (la composante contaminée ne contribue plus à la limite) *[Extracteur]*.
7. **Exo 5, commentaire final (Corrigé p. 25)** : « l'estimation $L^1$ ($k=+\infty$) » — $k=+\infty$ correspond à $\gamma_\infty(x)=x$, c'est-à-dire à la **moyenne empirique / moindres carrés** (estimation $L^2$) ; l'estimation $L^1$ correspond à $\gamma_0$ (médiane). Coquille probable *[Extracteur]*.
8. **Exo 4, énoncé** : « contraindre le paramètre à être strictement positif » alors que $\Theta:=\mathbb{R}_+$ contient $0$ (et la Q3 étudie précisément $\theta=0$) : lire « positif » *[Extracteur]*.
9. **Exo 5 Q1(c)i** : le corrigé donne, pour $n$ pair, « toute valeur dans $\big]X_{n/2:n},X_{n/2+1:n}\big[$ » (intervalle ouvert) ; le Poly ch.7 (Ex. 1.9) écrit l'intervalle fermé $[X_{n/2:n},X_{n/2+1:n}]$ (cohérent avec la Q1 qui autorise toute valeur de $[\sup\{\Psi_n>0\},\inf\{\Psi_n<0\}]$).
10. **Texte extrait par pdftotext** : $\Theta$ de l'Exo 2 est $\mathbb{R}_+^*$ (et non $\mathbb{R}_+$) ; $\Theta$ de l'Exo 3 est $\mathbb{R}_*^+$ (vérifié sur le PDF).

---

## 1. Exercices

### Exercice 1 — Comparaison de deux tests : signe contre Student, approche de Pitman ((⋆) puis (⋆⋆⋆))
**Source :** Énoncé PC7, p. 1–3 (Figures 1–2 p. 3–4) ; Corrigé PC7, p. 8–17 (Figures 5–6).
**Objectif (énoncé, en italique) :** « comparer la performance de deux statistiques de test pour un même test d'hypothèses. » Q1 est (⋆) ; la suite (approche de Pitman, contiguïté) est (⋆⋆⋆) — le Poly ch.7, §1.8, la qualifie de « nettement plus difficile ».

#### Énoncé complet

*Préambule.* Voir §0.2 (définition du test uniformément le plus puissant au niveau $\alpha$ ; on compare plutôt les fonctions puissance **asymptotiques**).

Soit $\Theta$ un ouvert de $\mathbb{R}$, et $\{\mathbb{Q}_\theta=q_\theta\cdot\mathrm{d}\nu,\ \theta\in\Theta\}$ une famille de lois sur $\mathsf{X}\in\mathcal{B}(\mathbb{R})$ muni de sa tribu borélienne $\mathcal{X}$. On suppose que ce modèle est régulier (voir Polycopié Définition I-4.16). Soit $\theta_0\in\Theta$. On souhaite tester
$$H_0:\theta=\theta_0,\qquad H_1:\theta>\theta_0.$$
On dispose d'une suite de $n$-échantillons du modèle $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\theta\in\Theta\})$. On note
$$\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n},\qquad\bar X_n:=\frac1n\sum_{k=1}^nX_k,\qquad S_n^2:=\frac1n\sum_{k=1}^n(X_k-\bar X_n)^2.$$

1. Dans cette question, le modèle statistique est un modèle de translation : soit $q\cdot\mathrm{dLeb}$ une loi sur $\mathbb{R}$, on considère la famille de densités $q_\theta:x\mapsto q(x-\theta)$. On suppose de plus la densité $q$ symétrique par rapport à l'origine, continue et telle que $q(0)>0$ (note 1, §0.2) et de variance $\sigma_q^2$ inconnue. On définit les statistiques
$$M_n:=\sqrt n\left(\frac1n\sum_{k=1}^n\mathbb{1}_{\{X_k\ge\theta_0\}}-\frac12\right),\qquad T_n:=\sqrt n\,\frac{(\bar X_n-\theta_0)}{S_n}.$$
   (a) Montrer que l'on peut choisir une suite $\{t_n,\ n\in\mathbb{N}\}$ de telle sorte que la suite de tests $\phi_{n,1}:=\mathbb{1}_{\{M_n\ge t_n\}}$ soit de niveau asymptotique $\alpha$ et soit consistante.
   (b) Construire une suite de tests $\{\phi_{n,2},\ n\in\mathbb{N}\}$ basée sur la statistique de test $T_n$ de niveau asymptotique $\alpha$ et consistante.

*Transition.* L'exemple précédent montre que pour comparer des tests, la consistance du test ne suffit pas. Nous considérons ci-dessous l'approche de Pitman, qui consiste à comparer la puissance locale des tests : étudier la suite $\{\beta_n(\theta_n),\ n\in\mathbb{N}\}$ où
$$\theta_n>\theta_0,\qquad\theta_n=\theta_0+h_n/\sqrt n\quad\text{avec}\quad\lim_nh_n=h>0.\tag{1}$$
Soit $\{U_n,\ n\in\mathbb{N}\}$ une suite de statistiques. Nous supposons qu'il existe une fonction $\mu:\Theta\to\mathbb{R}$ et $\sigma>0$ tels que (note 2, §0.2)
$$\sqrt n\,\big(U_n-\mu(\theta_n)\big)\overset{\mathbb{P}_{n,\theta_n}}{\Longrightarrow}\mathrm{N}(0,\sigma^2);\qquad\sqrt n\,\big(U_n-\mu(\theta_0)\big)\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,\sigma^2).\tag{2}$$
Nous supposons que $\mu$ est dérivable en $\theta_0$ de dérivée $\mu'(\theta_0)$ strictement positive. Pour tout $n>0$, nous considérons le test sur $(\mathsf{X}^n,\mathcal{X}^{\otimes n},\{\mathbb{P}_{n,\theta},\theta\in\Theta\})$ de zone de rejet
$$\mathcal{R}_n:=\big\{\sqrt n\,\big(U_n-\mu(\theta_0)\big)>C_nz_{1-\alpha}\big\}$$
où $z_{1-\alpha}$ est le quantile d'ordre $1-\alpha$ d'une loi $\mathrm{N}(0,1)$ et $\{C_n,\ n\in\mathbb{N}\}$ est une suite de statistiques telle que
$$\forall\varepsilon>0,\qquad\lim_n\mathbb{P}_{n,\theta_0}\big(\lvert C_n-\sigma\rvert>\varepsilon\big)=0.\tag{3}$$

2. Montrer que $\lim_n\mathbb{P}_{n,\theta_0}(\mathcal{R}_n)=\alpha$.
3. L'objectif de cette question est de montrer que pour toute suite déterministe $\{\theta_n,\ n\ge0\}$ de $\Theta_1$ telle que $\lim_n\sqrt n(\theta_n-\theta_0)=h$, on a
$$\lim_n\mathbb{P}_{n,\theta_n}\big(\lvert C_n-\sigma\rvert>\varepsilon\big)=0.$$
   (a) Montrer que pour toute suite positive $\{\delta_n,\ n\ge0\}$ telle que $\lim_n\delta_n=0$,
$$\lim_n\frac1n\mathbb{E}_{n,\theta_0}\left[\sup_{0\le t\le\delta_n}\left\lvert\sum_{k=1}^n\partial_\theta^2\log q_{\theta_0+t}(X_k)-\sum_{k=1}^n\partial_\theta^2\log q_{\theta_0}(X_k)\right\rvert\right]=0.$$
   (b) En utilisant la question précédente, montrer que
$$\prod_{k=1}^n\frac{q_{\theta_n}(X_k)}{q_{\theta_0}(X_k)}\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\exp\Big(h\,\mathrm{N}(0,I(\theta_0))-\frac{h^2}2I(\theta_0)\Big)$$
   où $I(\theta_0)$ est l'information de Fisher associée à la loi $q_{\theta_0}\cdot\mathrm{d}\nu$. *On observera que l'espérance de la loi limite est 1.*
   (c) En déduire que pour tout $A_n\in\mathcal{X}^{\otimes n}$, $\lim_n\mathbb{P}_{n,\theta_0}(A_n)=0$ entraîne $\lim_n\mathbb{P}_{n,\theta_n}(A_n)=0$. *On dit que la famille de loi $\{\mathbb{P}_{n,\theta_n},n\ge1\}$ est **contiguë** à la famille $\{\mathbb{P}_{n,\theta_0},n\ge1\}$.*
   (d) Conclure.
4. Montrer que
$$\lim_n\mathbb{P}_{n,\theta_n}(\mathcal{R}_n)=1-\Phi\left(z_{1-\alpha}-h\frac{\mu'(\theta_0)}\sigma\right).$$
   *Ce résultat caractérise le comportement de la fonction puissance à droite de $\theta_0$. Un test sera d'autant meilleur que $\mu'(\theta_0)/\sigma$ est grand, la puissance asymptotique locale augmentant plus rapidement avec $h$.*
5. Nous terminons par un jeu de conditions suffisantes pour vérifier la condition (2) dans le cas où
$$U_n:=\frac1n\sum_{k=1}^ng(X_k),\qquad\mu(\theta):=\int g(x)q_\theta(x)\,\mathrm{d}\nu(x)$$
   sous les conditions que
   (a) $\sigma_g^2(\theta):=\int(g(x)-\mu(\theta))^2q_\theta(x)\,\mathrm{d}\nu(x)$ existe dans un voisinage de $\theta_0$ et est continue en $\theta_0$ ;
   (b) il existe $\delta>0$ tel que $D_g(\theta):=\int(g(x)-\mu(\theta))^{2+\delta}q_\theta(x)\,\mathrm{d}\nu(x)$ existe dans un voisinage de $\theta_0$ et est continue en $\theta_0$.

   En appliquant les conditions de Lindeberg-Feller (voir Polycopié, Théorème IV.5-41), montrer que la condition (2) est vérifiée avec $\sigma^2=\sigma_g^2(\theta_0)$.
6. Appliquons ce résultat à l'exemple du test sur le paramètre de translation (voir question 1) ; en supposant que la loi $q\,\mathrm{d}\nu$ possède un moment d'ordre $2+\delta$ pour $\delta>0$.
   (a) Pour le test $\phi_{n,1}$, quelle est la pente $\mu'(\theta_0)/\sigma$ ?
   (b) Pour le test $\phi_{n,2}$, quelle est la pente $\mu'(\theta_0)/\sigma$ ?

   Dans le cas où $\theta_0=0$, le ratio des pentes (test $\phi_{n,1}$ divisé par test $\phi_{n,2}$) donne — **Gaussienne** : $\sqrt{2/\pi}\approx0.798$.

   (c) Que donne-t-il lorsque $q=\frac12\mathrm{N}(-a,\tau^2)+\frac12\mathrm{N}(a,\tau^2)$ pour $a,\tau>0$. Quel test est préférable ? Voir figure 1.
   (d) Que donne-t-il lorsque $q=\frac12\mathrm{N}(0,1)+\frac12\mathrm{N}(0,\tau^2)$ pour $\tau>0$. Quel test est préférable ? Voir figure 2.

*Conclusion de l'énoncé (p. 3).* Une autre conséquence du résultat de la question 4 est de donner un ordre de grandeur de la taille de l'échantillon nécessaire pour atteindre une puissance $\beta>\alpha$ donnée en un point $\theta\in\Theta_1$. On peut montrer (note 3) que si $N_i(\theta)$ est la taille de l'échantillon nécessaire pour que le test $i$ ait une puissance d'au moins $\beta$ contre $\theta\in\Theta_1$, alors
$$\lim_{\theta\downarrow\theta_0}\frac{N_1(\theta)}{N_2(\theta)}=\left(\frac{\sigma_1\,\mu_2'(\theta_0)}{\sigma_2\,\mu_1'(\theta_0)}\right)^2.$$

*Figures de l'énoncé.* **Figure 1** — « Cas du mélange de gaussienne avec $a>0$, et $\tau=1$. A gauche, l'évolution du ratio des pentes en fonction de $u:=a^2/\tau^2$ ; à droite, deux exemples de densité pour des valeurs de $a$ différentes ($a=1.5$ et $a=3$) et $\tau^2=1$. » (Courbe de gauche : décroissante de $\approx0.8$ en $u=0$ à $\approx0.07$ en $u=7$ ; à droite, densités bimodales, d'autant plus creuses en 0 que $a$ est grand.) **Figure 2** — « Cas du mélange de gaussiennes centrées et de variances différentes. A gauche, l'évolution du ratio des pentes en fonction de $\tau$ ; à droite deux exemples de densité pour des valeurs de $\tau$ différentes ($\tau^2=4$ et $\tau^2=16$). » (Courbe de gauche : $\approx3.1$ pour $\tau$ proche de $0.1$, minimum $\approx0.8$ en $\tau=1$, $\approx1.45$ en $\tau=4$ ; à droite, densités pointues à queues lourdes.) Les Figures 5 et 6 du corrigé reproduisent les Figures 1 et 2.

#### Corrigé complet question par question

Notations du corrigé : $F$ est la fonction de répartition de la loi $q$ ; $q_\theta(\cdot):=q(\cdot-\theta)$.

**Q1(a) — Test du signe : niveau asymptotique et consistance (Corrigé p. 8–9).**

▶ *Définition du test.*
1. Sous $\mathbb{P}_{n,\theta_0}$, $\mathbb{1}_{X_k\ge\theta_0}$ suit une loi de Bernoulli de paramètre de succès
$$\int_{\theta_0}^{+\infty}q_{\theta_0}(x)\,\mathrm{d}x=\int_{\theta_0}^{+\infty}q(x-\theta_0)\,\mathrm{d}x=\int_0^\infty q(y)\,\mathrm{d}y=1-F(0)$$
   (changement de variable $y=x-\theta_0$).
2. Puisque la médiane de $q$ est 0 (note 1 : symétrie, continuité, $q(0)>0$), $F(0)=1/2$. Les $\mathbb{1}_{X_k\ge\theta_0}$ sont i.i.d. (**indépendance** sous $\mathbb{P}_{n,\theta_0}$) de moyenne $1/2$ et de variance $1/4$ ; **par le théorème central limite** (Poly ch.6, Th. 1.6) :
$$M_n\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,1/4).$$
3. En observant que sous $\mathbb{P}_{n,\theta}$ pour $\theta>\theta_0$, la médiane des $X_i$ est $\theta$ (donc les grandes valeurs de $M_n$ sont en faveur de $H_1$), on en déduit une zone de rejet de la forme
$$\mathcal{R}_{n,1}:=\{(x_1,\dots,x_n)\in\mathbb{R}^n:\ 2M_n>z_{1-\alpha}\}.$$
4. Avec ce choix du seuil critique, $2M_n\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,1)$ (transformation continue) et, la loi limite ne chargeant pas $z_{1-\alpha}$ (**Portmanteau**, Poly ch.6, Th. 1.3),
$$\lim_n\mathbb{P}_{n,\theta_0}(2M_n>z_{1-\alpha})=\mathbb{P}(U>z_{1-\alpha})=\alpha,\qquad U\sim\mathrm{N}(0,1),$$
   de sorte que le test est de niveau asymptotique $\alpha$. **En conclusion, $t_n:=z_{1-\alpha}/2$.**

▶ *Vérification de la consistance.*
5. Posons $B_n:=n^{-1}\sum_{k=1}^n\mathbb{1}_{X_k\ge\theta_0}$. Pour $\theta\in\mathbb{R}$,
$$\mathbb{P}_{n,\theta}(X_k\ge\theta_0)=\int_{\theta_0}^{+\infty}q_\theta(x)\,\mathrm{d}x=\int_{\theta_0}^\infty q(x-\theta)\,\mathrm{d}x=\int_{\theta_0-\theta}^\infty q(x)\,\mathrm{d}x=1-F(\theta_0-\theta),$$
   donc, **par le TCL pour des v.a. i.i.d.** (Bernoulli),
$$\sqrt n\left(\frac{B_n-(1-F(\theta_0-\theta))}{\sqrt{F(\theta_0-\theta)(1-F(\theta_0-\theta))}}\right)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1).$$
6. Pour $\theta>\theta_0$ dans un voisinage de $\theta_0$, on a l'inégalité **stricte** $F(\theta_0-\theta)<F(0)=1/2$ (conséquence de $q(0)>0$ et $q$ continue : $F$ strictement croissante au voisinage de 0) ; et puisque la fonction de répartition est monotone, cela reste vrai pour tout $\theta>\theta_0$. Donc $\lim_n\sqrt n\,(F(\theta_0-\theta)-1/2)=-\infty$.
7. En notant $\sigma^2(\theta):=F(\theta_0-\theta)(1-F(\theta_0-\theta))$ :
$$\begin{aligned}\mathbb{P}_{n,\theta}(2M_n>z_{1-\alpha})&=\mathbb{P}_{n,\theta}\Big(B_n-1/2>\frac{z_{1-\alpha}}{2\sqrt n}\Big)\\&=\mathbb{P}_{n,\theta}\Big(B_n-1+F(\theta_0-\theta)>F(\theta_0-\theta)-1/2+\frac{z_{1-\alpha}}{2\sqrt n}\Big)\\&=\mathbb{P}_{n,\theta}\left(\sqrt n\Big(\frac{B_n-1+F(\theta_0-\theta)}{\sigma(\theta)}\Big)>\sqrt n\,\frac{F(\theta_0-\theta)-1/2}{\sigma(\theta)}+\frac{z_{1-\alpha}}{2\sigma(\theta)}\right).\end{aligned}$$
8. *[Complément du corrigé, en bleu]* « Le terme qui précède dépend de $n$ à la fois via la loi de la v.a., et via la borne de l'intervalle ; pour appliquer la convergence en loi, on se ramène à un intervalle qui ne bouge pas avec $n$ — c'est l'objectif des calculs qui suivent. »
9. Soit $C>0$ ; il existe $N_C$ tel que pour tout $n\ge N_C$, $\sqrt n\,\frac{F(\theta_0-\theta)-1/2}{\sigma(\theta)}<-C$ (point 6) ; cela entraîne que pour tout $n\ge N_C$
$$\mathbb{P}_{n,\theta}\big(2\sqrt n\,(B_n-1/2)>z_{1-\alpha}\big)\ge\mathbb{P}_{n,\theta}\left(\sqrt n\Big(\frac{B_n-1+F(\theta_0-\theta)}{\sigma(\theta)}\Big)>\frac{z_{1-\alpha}}{2\sigma(\theta)}-C\right).$$
10. La **convergence en loi** (point 5, Portmanteau) entraîne
$$\lim_n\mathbb{P}_{n,\theta}\big(2\sqrt n\,(B_n-1/2)>z_{1-\alpha}\big)\ge1-\Phi\Big(\frac{z_{1-\alpha}}{2\sigma(\theta)}-C\Big),$$
   et ce pour tout $C>0$ ; donc lorsque $C\to+\infty$, $\lim_n\mathbb{P}_{n,\theta}\big(2\sqrt n\,(B_n-1/2)>z_{1-\alpha}\big)=1$, ce qui conclut la preuve de la consistance (Poly ch.6, Déf. 1.11).

**Q1(b) — Test de Student : niveau asymptotique et consistance (Corrigé p. 9–10).**

▶ *Construction du test.*
1. Sous $\mathbb{P}_{n,\theta_0}$, les v.a. $X_k$ sont i.i.d. d'espérance $\theta_0$ (symétrie de $q$) et de variance $\sigma_q^2$ ; **par le TCL**, $\sqrt n\,\sigma_q^{-1}(\bar X_n-\theta_0)\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,1)$.
2. En observant que $S_n^2=\frac1n\sum_{k=1}^nX_k^2-(\bar X_n)^2$, la **loi des grands nombres faible** (appliquée à $X_k$ et $X_k^2$) et la continuité donnent $S_n^2\xrightarrow{\mathbb{P}_{n,\theta_0}\text{-prob}}\sigma_q^2$ (cf. Poly ch.6, Prop. 1.2).
3. Par la **stabilité de la convergence en probabilité par une application continue** ($u\mapsto\sqrt u$), puis par le **lemme de Slutsky** (Poly ch.6, Lemme 1.1 (iii)) : $T_n\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,1)$.
4. On propose le test de zone de rejet
$$\mathcal{R}_{n,2}:=\Big\{(x_1,\dots,x_n),\ \sqrt n\,\frac{\bar x_n-\theta_0}{s_n}>z_{1-\alpha}\Big\}.$$
   En exploitant la convergence en loi de la statistique de test, $\lim_n\mathbb{P}_{n,\theta_0}(T_n>z_{1-\alpha})=\alpha$, ce qui établit le niveau asymptotique.

▶ *Consistance du test.* Soit $\theta>\theta_0$. Le corrigé donne **deux méthodes**.

*Méthode 1.*
$$\begin{aligned}\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})&=\mathbb{P}_{n,\theta}\Big(\sqrt n\,\frac{\bar X_n-\theta_0}{\sigma_q}>z_{1-\alpha}\frac{S_n}{\sigma_q}\Big)\\&=\mathbb{P}_{n,\theta}\Big(\sqrt n\,\frac{\bar X_n-\theta}{\sigma_q}-z_{1-\alpha}\Big(\frac{S_n}{\sigma_q}-1\Big)>z_{1-\alpha}+\sqrt n\,\frac{\theta_0-\theta}{\sigma_q}\Big).\end{aligned}$$
Sous $\mathbb{P}_{n,\theta}$, $S_n$ converge en probabilité vers $\sigma_q$ et $\sqrt n\frac{\bar X_n-\theta}{\sigma_q}$ converge en loi vers $\mathcal{N}(0,1)$ *(le corrigé imprime $\sqrt n\frac{\bar X_n-\theta_0}{\sigma_q}$, lire $\theta$)*. **Par Slutsky**, $W_n:=\sqrt n\frac{\bar X_n-\theta}{\sigma_q}-z_{1-\alpha}\big(\frac{S_n}{\sigma_q}-1\big)$ converge en loi vers $\mathcal{N}(0,1)$. Comme $\sqrt n(\theta_0-\theta)/\sigma_q\to-\infty$, pour tout $M>0$ (raisonnement analogue à Q1(a)) :
$$\lim_n\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})\ge\lim_n\mathbb{P}_{n,\theta}(W_n>z_{1-\alpha}-M)=1-\Phi(z_{1-\alpha}-M),$$
et le terme de droite tend vers 1 quand $M\to+\infty$.

*Méthode 2.*
$$\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})=\mathbb{P}_{n,\theta}\Big(\frac{\bar X_n-\theta_0}{S_n}-\frac{\theta-\theta_0}{\sigma_q}>\frac{z_{1-\alpha}}{\sqrt n}-\frac{\theta-\theta_0}{\sigma_q}\Big).$$
Il existe $N$ tel que pour tout $n\ge N$, $z_{1-\alpha}/\sqrt n-(\theta-\theta_0)/\sigma_q\le-(\theta-\theta_0)/(2\sigma_q)$, d'où
$$\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})\ge\mathbb{P}_{n,\theta}\Big(\frac{\bar X_n-\theta_0}{S_n}-\frac{\theta-\theta_0}{\sigma_q}>-\frac{\theta-\theta_0}{2\sigma_q}\Big),\qquad n\ge N.$$
Sous $\mathbb{P}_{n,\theta}$, $W_n:=\frac{\bar X_n-\theta_0}{S_n}-\frac{\theta-\theta_0}{\sigma_q}$ converge en probabilité vers 0 (**LGN** : $\bar X_n\to\theta$, $S_n\to\sigma_q$, puis **continuité**) ; donc
$$\lim_n\mathbb{P}_{n,\theta}\Big(W_n>-\frac{\theta-\theta_0}{2\sigma_q}\Big)\ge\lim_n\mathbb{P}_{n,\theta}\Big(\lvert W_n\rvert<\frac{\theta-\theta_0}{2\sigma_q}\Big)=1,$$
dont on déduit $\lim_n\mathbb{P}_{n,\theta}(T_n>z_{1-\alpha})=1$.

**Q2 — Niveau asymptotique du test générique $\mathcal{R}_n$ (Corrigé p. 11).**
1. Par la condition (2) et par (3) : $\sqrt n(U_n-\mu(\theta_0))\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,\sigma^2)$ et $C_n\xrightarrow{\mathbb{P}_{n,\theta_0}\text{-prob}}\sigma$.
2. **Par Slutsky** ($\sigma>0$) : $\sqrt n\Big(\dfrac{U_n-\mu(\theta_0)}{C_n}\Big)\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,1)$.
3. Par suite ($\mathrm{N}(0,1)$ ne charge pas $z_{1-\alpha}$),
$$\lim_n\mathbb{P}_{n,\theta_0}\Big(\sqrt n\Big(\frac{U_n-\mu(\theta_0)}{C_n}\Big)>z_{1-\alpha}\Big)=\mathbb{P}(U>z_{1-\alpha})=\alpha,\qquad U\sim\mathrm{N}(0,1).$$
   Cela établit le niveau asymptotique du test. *[Extracteur : on passe de $\mathcal{R}_n$ à l'événement divisé par $C_n$ sur $\{C_n>0\}$, de probabilité tendant vers 1 par (3).]*

**Q3(a) — Continuité uniforme en moyenne de la dérivée seconde de la log-densité (Corrigé p. 11–12).**
1. **Inégalité triangulaire** puis **linéarité de l'espérance et identité des lois** :
$$\begin{aligned}&\frac1n\mathbb{E}_{n,\theta_0}\left[\sup_{0\le t\le\delta_n}\left\lvert\sum_{k=1}^n\partial_\theta^2\log q_{\theta_0+t}(X_k)-\sum_{k=1}^n\partial_\theta^2\log q_{\theta_0}(X_k)\right\rvert\right]\\&\quad\le\frac1n\sum_{k=1}^n\mathbb{E}_{n,\theta_0}\left[\sup_{0\le t\le\delta_n}\big\lvert\partial_\theta^2\log q_{\theta_0+t}(X_k)-\partial_\theta^2\log q_{\theta_0}(X_k)\big\rvert\right]\\&\quad\le\int_{\mathsf{X}}\sup_{0\le t\le\delta_n}\big\lvert\partial_\theta^2\log q_{\theta_0+t}(x)-\partial_\theta^2\log q_{\theta_0}(x)\big\rvert\,q_{\theta_0}(x)\,\mathrm{d}\nu(x).\end{aligned}$$
2. Appliquons le **théorème de convergence dominée**. Soit $\mathcal{V}_0\subset\Theta$ un voisinage ouvert de $\theta_0$ ; on peut supposer que $\theta_0+t\in\mathcal{V}_0$ pour tout $0\le t\le\delta_n$ ($\delta_n\to0$). Comme le modèle est **régulier** (domination (R-2) du Cadre 1.1), il existe $h$ mesurable positive telle que
$$\sup_{\theta\in\mathcal{V}_0}\big\lvert\partial_\theta^2\log q_\theta(x)\big\rvert\le h(x),\qquad\int h(x)q_{\theta_0}(x)\,\mathrm{d}\nu(x)<\infty$$
   (l'intégrande est donc dominé par $2h$).
3. Pour tout $x$, $\theta\mapsto\partial_\theta^2\log q_\theta(x)$ est **continue** (régularité $C^2$), donc **uniformément continue sur tout compact** (Heine) ; ce qui entraîne $\lim_n\sup_{0\le t\le\delta_n}\big\lvert\partial_\theta^2\log q_{\theta_0+t}(x)-\partial_\theta^2\log q_{\theta_0}(x)\big\rvert=0$.
4. **Par convergence dominée** : $\lim_n\int_{\mathsf{X}}\sup_{0\le t\le\delta_n}\lvert\dots\rvert\,q_{\theta_0}(x)\,\mathrm{d}\nu(x)=0$, ce qui conclut. (Comparer avec le Lemme 2.1 et l'éq. (4) du Poly ch.7.)
5. *[Complément du corrigé, en bleu]* Vérification sur les **familles exponentielles canoniques** $q_\theta(x)=h(x)\exp(\theta T(x)-A(\theta))$ : $\log q_\theta(x)=\log h(x)+\theta T(x)-A(\theta)$, donc $\partial_\theta^2\log q_\theta(x)=-A''(\theta)$ (ne dépend pas de $x$) et
$$\frac1n\mathbb{E}_{n,\theta_0}\left[\sup_{0\le t\le\delta_n}\left\lvert\sum_{k=1}^n\partial_\theta^2\log q_{\theta_0+t}(X_k)-\sum_{k=1}^n\partial_\theta^2\log q_{\theta_0}(X_k)\right\rvert\right]=\sup_{0\le t\le\delta_n}\big\lvert A''(\theta_0+t)-A''(\theta_0)\big\rvert,$$
   qui tend vers 0 car $\theta\mapsto A(\theta)$ est de classe $C^\infty$ (« établi en PC2/Ex1/qu6 », cf. §0.4). Dans le cas gaussien où $\ln q_\theta(x)=C-0.5(x-\theta)^2\sigma^{-2}-0.5\ln\sigma^2$, $A''(\theta)=\sigma^{-2}$ pour tout $\theta$.

**Q3(b) — Loi limite du rapport de vraisemblance sous $H_0$ (Corrigé p. 12).**
1. La condition de régularité ((R-1) : $q_\theta>0$) permet de prendre le logarithme :
$$\prod_{k=1}^n\frac{q_{\theta_n}(X_k)}{q_{\theta_0}(X_k)}=\exp\left(\sum_{k=1}^n\{\ln q_{\theta_n}(X_k)-\ln q_{\theta_0}(X_k)\}\right).$$
2. **Développement de Taylor à l'ordre 2 avec reste intégral** (voir §0.5 point 4 pour le poids) :
$$\ln q_{\theta_n}(x)-\ln q_{\theta_0}(x)=(\theta_n-\theta_0)\partial_\theta\ln q_{\theta_0}(x)+\frac12(\theta_n-\theta_0)^2\partial_\theta^2\ln q_{\theta_0}(x)+\frac12(\theta_n-\theta_0)^2\int_0^1\big(\partial_\theta^2\ln q_{(1-t)\theta_0+t\theta_n}(x)-\partial_\theta^2\ln q_{\theta_0}(x)\big)\,\mathrm{d}t.$$
3. Avec $\theta_n=\theta_0+h_n/\sqrt n$, $h_n>0$, $\lim_nh_n=h>0$ :
$$\ln q_{\theta_n}(x)-\ln q_{\theta_0}(x)=\frac{h_n}{\sqrt n}\partial_\theta\ln q_{\theta_0}(x)+\frac12\frac{h_n^2}n\partial_\theta^2\ln q_{\theta_0}(x)+\Delta_n(x),\qquad\Delta_n(x):=\frac12\frac{h_n^2}n\int_0^1\big(\partial_\theta^2\ln q_{(1-t)\theta_0+t\theta_n}(x)-\partial_\theta^2\ln q_{\theta_0}(x)\big)\,\mathrm{d}t.$$
4. En sommant :
$$\sum_{k=1}^n\{\ln q_{\theta_n}(X_k)-\ln q_{\theta_0}(X_k)\}=\frac{h_n}{\sqrt n}\sum_{k=1}^n\partial_\theta\ln q_{\theta_0}(X_k)+\frac12\frac{h_n^2}n\sum_{k=1}^n\partial_\theta^2\ln q_{\theta_0}(X_k)+\sum_{k=1}^n\Delta_n(X_k).$$
5. *Reste.* **D'après la question 3(a)** (avec $\delta_n=h_n/\sqrt n$) :
$$\mathbb{E}_{n,\theta_0}\left[\left\lvert\sum_{k=1}^n\Delta_n(X_k)\right\rvert\right]\le\frac{h_n^2}{2n}\mathbb{E}_{n,\theta_0}\left[\sup_{0\le t\le h_n/\sqrt n}\left\lvert\sum_{k=1}^n\{\partial_\theta^2\ln q_{\theta_0+t}(X_k)-\partial_\theta^2\ln q_{\theta_0}(X_k)\}\right\rvert\right]\to0,$$
   entraînant (**inégalité de Markov**) $\sum_{k=1}^n\Delta_n(X_k)\xrightarrow{\mathbb{P}_{n,\theta_0}\text{-prob}}0$.
6. *Termes principaux.* Dans un modèle régulier (Poly ch.3, Prop. 1.2 ; Poly ch.7, éq. (10)) :
$$\mathbb{E}_{n,\theta_0}[\partial_\theta\ln q_{\theta_0}(X_k)]=0,\qquad\mathbb{E}_{n,\theta_0}\big[(\partial_\theta\ln q_{\theta_0}(X_k))^2\big]=-\mathbb{E}_{n,\theta_0}\big[\partial_\theta^2\ln q_{\theta_0}(X_k)\big]=I(\theta_0).$$
   **Le TCL** donne $\frac1{\sqrt n}\sum_k\partial_\theta\ln q_{\theta_0}(X_k)\Rightarrow\mathrm{N}(0,I(\theta_0))$, **la loi faible des grands nombres** donne $\frac1n\sum_k\partial_\theta^2\ln q_{\theta_0}(X_k)\to-I(\theta_0)$ en probabilité, $h_n\to h$, et **le lemme de Slutsky** assemble :
$$\sum_{k=1}^n\{\ln q_{\theta_n}(X_k)-\ln q_{\theta_0}(X_k)\}\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}h\,\mathrm{N}(0,I(\theta_0))-\frac{h^2}2I(\theta_0).$$
7. On conclut en appliquant la **stabilité par transformation continue** $x\mapsto\exp(x)$ de la convergence en loi (Poly ch.6, Th. 1.4).

**Q3(c) — Contiguïté (Corrigé p. 13).**
1. Notons $L_n(x_1,\dots,x_n):=\prod_{k=1}^n\frac{q_{\theta_n}(x_k)}{q_{\theta_0}(x_k)}$. Observons que $\mathbb{E}_{n,\theta_0}[L_n(X_1,\dots,X_n)]=1$ (c'est l'intégrale de la densité $\prod_kq_{\theta_n}(x_k)$, qui vaut 1 ; (R-1) assure $q_{\theta_0}>0$).
2. *Changement de mesure.* Pour tout $y>0$,
$$\begin{aligned}\mathbb{P}_{n,\theta_n}(A_n)&=\int_{A_n}\prod_{k=1}^nq_{\theta_n}(x_k)\,\nu(\mathrm{d}x_1)\cdots\nu(\mathrm{d}x_n)=\int_{A_n}L_n(x_1,\dots,x_n)\prod_{k=1}^nq_{\theta_0}(x_k)\,\nu(\mathrm{d}x_1)\cdots\nu(\mathrm{d}x_n)\\&=\mathbb{E}_{n,\theta_0}\big[\mathbb{1}_{A_n}L_n(X_1,\dots,X_n)\big]=\mathbb{E}_{n,\theta_0}\big[\mathbb{1}_{A_n}\big(\mathbb{1}_{L_n\le y}+\mathbb{1}_{L_n>y}\big)L_n(X_1,\dots,X_n)\big]\\&\le y\,\mathbb{P}_{n,\theta_0}(A_n)+\mathbb{E}_{n,\theta_0}\big[\mathbb{1}_{L_n(X_1,\dots,X_n)>y}L_n(X_1,\dots,X_n)\big].\end{aligned}$$
3. Puisque $\mathbb{E}_{n,\theta_0}[L_n]=1$ :
$$\mathbb{E}_{n,\theta_0}\big[\mathbb{1}_{L_n>y}L_n\big]=1-\mathbb{E}_{n,\theta_0}\big[\mathbb{1}_{L_n\le y}L_n\big].$$
4. Pour tout $y>0$, $u\mapsto\mathbb{1}_{u\le y}u$ est une fonction **bornée**, et ses points de discontinuité $\mathcal{D}$ vérifient $\mathbb{P}(W\in\mathcal{D})=0$ où, sous $\mathbb{P}$, $W\sim\exp\big(h\,\mathrm{N}(0,I(\theta_0))-\frac{h^2}2I(\theta_0)\big)$ (loi à densité, $\mathcal{D}=\{y\}$). Par suite (« voir Théorème IV-5.30 » = **transformation continue**, Poly ch.6, Th. 1.4, cas général admis, et Q3(b)) :
$$\lim_n\mathbb{E}_{n,\theta_0}\big[\mathbb{1}_{L_n(X_1,\dots,X_n)\le y}L_n(X_1,\dots,X_n)\big]=\mathbb{E}[\mathbb{1}_{W\le y}W].$$
5. Notons que $\mathbb{E}[W]=1$. *[Complément du corrigé, en bleu]* $\ln W$ suit une loi normale $\mathrm{N}(-h^2I(\theta_0)/2;\ h^2I(\theta_0))$, i.e. $W$ est une loi log-normale de paramètres $s_1=-h^2I(\theta_0)/2$ et $s_2=h^2I(\theta_0)$ ; la moyenne de cette loi est $\exp(s_1+s_2/2)$, soit ici $\exp(0)=1$.
6. Soit $\varepsilon>0$. Choisissons $y$ tel que $\mathbb{E}[\mathbb{1}_{W\le y}W]\ge1-\varepsilon$ (possible puisque $\mathbb{E}[W]=1$ ; *[Extracteur : par convergence monotone, $\mathbb{E}[\mathbb{1}_{W\le y}W]\uparrow\mathbb{E}[W]=1$ quand $y\uparrow\infty$]*). D'une part,
$$\lim_n\mathbb{E}_{n,\theta_0}\big[\mathbb{1}_{L_n>y}L_n\big]\le1-(1-\varepsilon)=\varepsilon.$$
   D'autre part, $\lim_n\mathbb{P}_{n,\theta_0}(A_n)=0$ par hypothèse. En conséquence, $\lim_n\mathbb{P}_{n,\theta_n}(A_n)\le\varepsilon$, et ce pour tout $\varepsilon>0$ : $\lim_n\mathbb{P}_{n,\theta_n}(A_n)=0$.

**Q3(d) — Conclusion (Corrigé p. 13).** On applique Q3(c) avec $A_n\leftarrow\{\lvert C_n-\sigma\rvert>\varepsilon\}$. Puisque, par hypothèse (3), $\lim_n\mathbb{P}_{n,\theta_0}(\lvert C_n-\sigma\rvert>\varepsilon)=0$, alors $\lim_n\mathbb{P}_{n,\theta_n}(\lvert C_n-\sigma\rvert>\varepsilon)=0$.

**Q4 — Puissance asymptotique locale (Corrigé p. 14).**
1. On a d'une part $C_n-\sigma\xrightarrow{\mathbb{P}_{n,\theta_n}\text{-prob}}0$ (Q3(d)), et d'autre part $\sqrt n\,(U_n-\mu(\theta_n))\overset{\mathbb{P}_{n,\theta_n}}{\Longrightarrow}\mathrm{N}(0,\sigma^2)$ (condition (2)).
2. **Par Slutsky** (noter que $\lim_n\mathbb{P}_{n,\theta_n}(C_n>0)=1$ donc on peut diviser par $C_n$) :
$$\sqrt n\,\frac{U_n-\mu(\theta_0)}{C_n}=\sqrt n\,\frac{U_n-\mu(\theta_n)}{C_n}+\sqrt n\,\frac{\mu(\theta_n)-\mu(\theta_0)}{C_n}\overset{\mathbb{P}_{n,\theta_n}}{\Longrightarrow}\mathrm{N}(0,1)+\frac{h\mu'(\theta_0)}\sigma.$$
   *[Extracteur : le second terme converge en probabilité vers $h\mu'(\theta_0)/\sigma$ car $\sqrt n(\mu(\theta_n)-\mu(\theta_0))=h_n\frac{\mu(\theta_n)-\mu(\theta_0)}{\theta_n-\theta_0}\to h\mu'(\theta_0)$ par **dérivabilité** de $\mu$ en $\theta_0$ et (1).]*
3. *[Complément du corrigé, en bleu]* « On observera que seule l'existence de la dérivée à droite de $\mu$ en $\theta_0$ est requise. On peut donc affaiblir l'hypothèse. »
4. On en déduit (Portmanteau ; la loi $\mathrm{N}(h\mu'(\theta_0)/\sigma,1)$ ne charge pas $z_{1-\alpha}$) :
$$\lim_n\mathbb{P}_{n,\theta_n}\big(\sqrt n\,(U_n-\mu(\theta_0))>C_nz_{1-\alpha}\big)=1-\Phi\left(z_{1-\alpha}-h\frac{\mu'(\theta_0)}\sigma\right).$$

**Q5 — Conditions suffisantes pour (2) via Lindeberg-Feller (Corrigé p. 14).**
1. Écrire $\sqrt n\,(U_n-\mu(\theta_n))=\sum_{k=1}^nY_{n,k}$ avec $Y_{n,k}:=\frac1{\sqrt n}(g(X_k)-\mu(\theta_n))$, et vérifier les conditions du **théorème de Lindeberg-Feller** (Polycopié, Théorème IV.5-41 — absent du poly actuel, cf. §0.4). Sous $\mathbb{P}_{n,\theta_n}$, les v.a. $\{Y_{n,k}\}_{k\le n}$ sont i.i.d. (centrées, car $\mathbb{E}_{\theta_n}[g(X_k)]=\mu(\theta_n)$) et de carré intégrable.
2. *Condition (i)* — en utilisant la condition (a) (« (A) » dans le corrigé) :
$$\sum_{k=1}^n\mathrm{Var}_{n,\theta_n}(Y_{n,k})=\frac1n\sum_{k=1}^n\sigma_g^2(\theta_n)=\sigma_g^2(\theta_n)\to\sigma_g^2(\theta_0)$$
   (**continuité** de $\sigma_g^2$ en $\theta_0$ et $\theta_n\to\theta_0$).
3. *Condition (ii)* (condition de Lindeberg) — en utilisant la condition (b) (« (B) »), pour tout $\varepsilon>0$ (sur $\{\lvert Y_{n,k}\rvert>\varepsilon\}$, $\lvert Y_{n,k}\rvert^2\le\varepsilon^{-\delta}\lvert Y_{n,k}\rvert^{2+\delta}$) :
$$\begin{aligned}\sum_{k=1}^n\mathbb{E}_{n,\theta_n}\Big[\lvert Y_{n,k}\rvert^2\mathbb{1}_{\lvert Y_{n,k}\rvert>\varepsilon}\Big]&\le\varepsilon^{-\delta}\sum_{k=1}^n\mathbb{E}_{n,\theta_n}\Big[\lvert Y_{n,k}\rvert^{2+\delta}\Big]\le\varepsilon^{-\delta}n^{-1-\delta/2}\sum_{k=1}^n\mathbb{E}_{n,\theta_n}\Big[\lvert g(X_k)-\mu(\theta_n)\rvert^{2+\delta}\Big]\\&\le\varepsilon^{-\delta}n^{-\delta/2}D_g(\theta_n)\sim\varepsilon^{-\delta}n^{-\delta/2}D_g(\theta_0)\to0.\end{aligned}$$
4. *Conclusion.* Le théorème de Lindeberg entraîne $\sqrt n\,(U_n-\mu(\theta_n))\overset{\mathbb{P}_{n,\theta_n}}{\Longrightarrow}\mathrm{N}(0,\sigma_g^2(\theta_0))$. *[Extracteur : la seconde convergence de (2), sous $\mathbb{P}_{n,\theta_0}$, est le cas particulier $\theta_n\equiv\theta_0$ (ou le TCL i.i.d. usuel).]*

**Q6(a) — Pente du test du signe $\phi_{n,1}$ (Corrigé p. 14–15).**
1. On a établi en Q1(a) que pour tout $\theta$,
$$\sqrt n\left(\frac{B_n-(1-F(\theta_0-\theta))}{\sqrt{(1-F(\theta_0-\theta))F(\theta_0-\theta)}}\right)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1).$$
2. Cela conduit à poser ($U_n=B_n$, $g=\mathbb{1}_{[\theta_0,+\infty[}$)
$$\mu(\theta):=1-F(\theta_0-\theta),\qquad\text{d'où}\quad\mu'(\theta_0)=q(0);$$
   puis
$$\sigma:=\lim_n\sqrt{(1-F(\theta_0-\theta_n))F(\theta_0-\theta_n)}=\sqrt{(1-F(0))F(0)}=1/2,\qquad C_n:=\sigma.$$
3. Avec ces conventions, on vérifie (a) que la zone de rejet $\mathcal{R}_{n,1}$ correspond bien à $\sqrt n(U_n-\mu(\theta_0))>C_nz_{1-\alpha}$ (en effet $\sqrt n(B_n-1/2)>z_{1-\alpha}/2\iff2M_n>z_{1-\alpha}$) ; (b) que l'on a la convergence en probabilité (3) ($C_n$ est constant).
4. **Pente :** $\dfrac{\mu'(\theta_0)}\sigma=2q(0)$ *[Extracteur : valeur qui découle immédiatement des deux quantités du corrigé, utilisée en Q6(c)–(d)]*.

**Q6(b) — Pente du test de Student $\phi_{n,2}$ (Corrigé p. 15).**
1. On a établi en Q1(b) que pour tout $\theta$, $\sqrt n\,\frac{\bar X_n-\theta}{S_n}\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1)$ (coquille du corrigé : « $T_n$ », cf. §0.5).
2. Cela conduit à poser ($U_n=\bar X_n$, $g(x)=x$)
$$\mu(\theta):=\theta,\qquad\text{d'où}\quad\mu'(\theta_0)=1;\qquad\sigma:=\sigma_q,\qquad C_n:=S_n.$$
3. On vérifie (a) que $\mathcal{R}_{n,2}$ correspond bien à $\sqrt n(\bar X_n-\mu(\theta_0))>C_nz_{1-\alpha}$ ; (b) la convergence en probabilité (3) ($S_n\to\sigma_q$, Q1(b)).
4. **Pente :** $\dfrac{\mu'(\theta_0)}\sigma=\dfrac1{\sigma_q}$.

*Cas gaussien (énoncé, $\theta_0=0$).* Ratio $=\sqrt{2/\pi}\approx0.798$. *[Extracteur : pour $q=\mathrm{N}(0,\sigma^2)$, $q(0)=1/(\sigma\sqrt{2\pi})$ donc $2q(0)\cdot\sigma_q=2/\sqrt{2\pi}=\sqrt{2/\pi}$ ; le test de Student est préférable.]*

**Q6(c) — Mélange bimodal $q=\frac12\mathrm{N}(-a,\tau^2)+\frac12\mathrm{N}(a,\tau^2)$ (Corrigé p. 15–16).**
- ▶ *Test de la médiane :*
$$\mu'(\theta_0)=\frac1{2\sqrt{2\pi}\tau}\Big(\exp(-(0+a)^2/(2\tau^2))+\exp(-(0-a)^2/(2\tau^2))\Big)=\frac1{\sqrt{2\pi}\tau}\exp(-a^2/(2\tau^2)),\qquad\sigma=1/2,$$
  donc la pente est $\sqrt{\dfrac2\pi}\,\dfrac1\tau\exp\Big(-\dfrac{a^2}{2\tau^2}\Big)$.
- ▶ *Test de la moyenne :* $\mu'(\theta_0)=1$, $\sigma^2=\tau^2+a^2$ (variance d'un mélange centré : $\tau^2$ + variance des centres), donc la pente est $\dfrac1{\sqrt{a^2+\tau^2}}$.
- ▶ *En conclusion*, le rapport des pentes est
$$\sqrt{\frac2\pi}\sqrt{1+\frac{a^2}{\tau^2}}\ \exp\Big(-\frac{a^2}{2\tau^2}\Big).$$
- La figure 5 [gauche] montre l'évolution de $u\mapsto\sqrt{1+u}\exp(-u/2)\sqrt2/\sqrt\pi$, indiquant que lorsque le ratio $a/\tau$ devient grand, le ratio est très faible : **supériorité du test de la moyenne**. La figure 5 [droite] montre la densité du mélange pour deux valeurs du rapport $a/\tau$ : la densité étant d'autant plus plate autour de l'origine que $a/\tau$ est grand, l'estimateur de la médiane souffre quand $a/\tau$ est grand (sa pente est proportionnelle à $q(0)$).

**Q6(d) — Mélange d'échelle $q=\frac12\mathrm{N}(0,1)+\frac12\mathrm{N}(0,\tau^2)$ (Corrigé p. 16–17).**
- ▶ *Test de la médiane :* $\mu'(\theta_0)=\dfrac1{2\sqrt{2\pi}}\Big(1+\dfrac1\tau\Big)$, $\sigma=1/2$, donc la pente est $\dfrac1{\sqrt{2\pi}}\Big(1+\dfrac1\tau\Big)$.
- ▶ *Test de la moyenne :* $\mu'(\theta_0)=1$, $\sigma^2=\frac12(1+\tau^2)$, donc la pente est $\sqrt2\,\dfrac1{\sqrt{1+\tau^2}}$.
- ▶ *En conclusion*, le rapport des pentes est
$$\frac1{2\sqrt\pi}\sqrt{1+\tau^2}\Big(1+\frac1\tau\Big).$$
- La figure 6 [gauche] montre l'évolution de $\tau\mapsto\sqrt{1+\tau^2}(1+1/\tau)/(2\sqrt\pi)$, indiquant que le ratio est **minimal lorsque $\tau=1$** (ce n'est plus un mélange !) ; qu'il devient très grand lorsque les deux variances sont très déséquilibrées : **supériorité du test de la médiane**. La figure 6 [droite] montre la densité du mélange pour deux valeurs de $\tau$ : la densité est d'autant plus dispersée autour de zéro que $\tau$ est très différent de 1, et l'estimateur de la moyenne sera troublé par des réalisations $X_1,\dots,X_n$ très dispersées.

*Fin de l'énoncé (tailles d'échantillon).* Le résultat $\lim_{\theta\downarrow\theta_0}N_1(\theta)/N_2(\theta)=\big(\sigma_1\mu_2'(\theta_0)/(\sigma_2\mu_1'(\theta_0))\big)^2$ est **admis** (Lehmann-Romano) ; ce n'est pas une question.

#### Méthodes mobilisées
- Loi de Bernoulli d'une indicatrice + changement de variable dans une intégrale ; médiane d'une loi symétrique.
- **TCL** (Bernoulli et moyenne empirique) ; **LGN faible** ; **continuité** de la convergence en probabilité.
- **Lemme de Slutsky** (quotient par $S_n$ ou $C_n$ ; somme avec un terme convergeant en probabilité).
- **Portmanteau** : passage de la convergence en loi aux probabilités d'événements $\{\cdot>z\}$.
- **Seuil auxiliaire $C$ ou $M$ et double passage à la limite** (d'abord $n\to\infty$, puis $C\to\infty$) pour la consistance (même technique que le Poly ch.6, Ex. 1.14) ; méthode alternative par convergence en probabilité vers 0 et minoration $\mathbb{P}(W_n>-c)\ge\mathbb{P}(\lvert W_n\rvert<c)$.
- **Théorème de convergence dominée** + continuité uniforme sur un compact (Heine) + domination du modèle régulier.
- **Développement de Taylor à l'ordre 2 avec reste intégral** de la log-vraisemblance ; identités du score ($\mathbb{E}[\dot\ell]=0$, $I=\mathbb{E}[\dot\ell^2]=-\mathbb{E}[\ddot\ell]$) ; **inégalité de Markov**.
- **Transformation continue** ($\exp$ ; fonction bornée $u\mapsto\mathbb{1}_{u\le y}u$ discontinue sur un ensemble négligeable).
- **Changement de mesure par le rapport de vraisemblance** ($\mathbb{P}_{n,\theta_n}(A)=\mathbb{E}_{n,\theta_0}[\mathbb{1}_AL_n]$), troncature à niveau $y$ ; moyenne d'une loi log-normale.
- **Contiguïté** (transfert des convergences en probabilité de $\mathbb{P}_{n,\theta_0}$ à $\mathbb{P}_{n,\theta_n}$).
- **Théorème de Lindeberg-Feller** (conditions de variance et de Lindeberg via un moment d'ordre $2+\delta$, type Lyapunov).
- Calcul de pentes de Pitman $\mu'(\theta_0)/\sigma$ ; densité et variance d'un mélange gaussien.

#### Pièges relevés / remarques du corrigé
- **La consistance ne suffit pas** à comparer deux tests : les deux suites de Q1 sont consistantes et de même niveau asymptotique (cf. Poly ch.6, intuition après la Déf. 1.11 et Exercice 3 de la PC6).
- Pour la consistance, on **ne peut pas** remplacer la loi de la statistique par sa loi limite : sous $H_1$, la borne de l'intervalle dépend de $n$ en même temps que la loi (passage en bleu p. 9). D'où le seuil $C$ (ou $M$) fixé, puis $C\to\infty$.
- Sous $\mathbb{P}_{n,\theta_n}$ (paramètre **dépendant de $n$**), les théorèmes limites usuels (TCL i.i.d. à loi fixe, LGN) **ne s'appliquent pas directement** : d'où la contiguïté (Q3) pour transférer (3), et Lindeberg-Feller (Q5) pour (2).
- La contiguïté repose de façon cruciale sur $\mathbb{E}[W]=1$ (aucune masse « perdue à l'infini »).
- La division par $C_n$ requiert $\mathbb{P}_{n,\theta_n}(C_n>0)\to1$.
- Seule l'existence de la **dérivée à droite** de $\mu$ en $\theta_0$ est nécessaire en Q4 (passage en bleu).
- **Interprétation :** la puissance locale limite $1-\Phi(z_{1-\alpha}-h\mu'(\theta_0)/\sigma)$ est croissante en la **pente** $\mu'(\theta_0)/\sigma$ ; le test de la médiane a une pente $2q(0)$ (dépend de la densité **en 0**), le test de Student $1/\sigma_q$ (dépend de la **variance**). Médiane meilleure pour les lois à queues lourdes / pointues en 0 (Q6(d)), moyenne meilleure pour les lois gaussiennes ou creuses en 0 (Q6(c)).
- Le ratio de Q6(d) est minimal ($=\sqrt{2/\pi}$) en $\tau=1$ (cas gaussien) : dans le cas gaussien, le test de Student gagne toujours.
- Les notations $h$ (limite de $h_n$) et $h$ (fonction dominante en Q3(a)) coexistent dans le corrigé.
- $S_n^2$ est la variance empirique **non corrigée** (§0.2).

#### Résultats numériques
- $z_{0.95}\approx1.645$ (niveau unilatéral $\alpha=5\,\%$) ; seuil du test du signe $t_n=z_{1-\alpha}/2\approx0.822$ *[Extracteur]*.
- Cas gaussien : ratio des pentes $\sqrt{2/\pi}\approx0.798$ (énoncé). *[Extracteur]* D'après la formule de Lehmann-Romano, $N_{\text{signe}}/N_{\text{Student}}\to(1/0.798)^2=\pi/2\approx1.571$ : il faut environ 57 % d'observations de plus au test du signe pour la même puissance locale.
- *[Extracteur]* Q6(c), $\tau=1$ : $u=a^2=2.25$ ($a=1.5$) donne un ratio $\approx0.467$ ; $u=9$ ($a=3$) donne $\approx0.028$ ; $u=1$ : $\approx0.684$ ; $u=4$ : $\approx0.241$ ; $u=7$ : $\approx0.068$ (conforme à la Figure 1).
- *[Extracteur]* Q6(d) : $\tau=2$ ($\tau^2=4$) : ratio $\approx0.946$ ; $\tau=4$ ($\tau^2=16$) : ratio $\approx1.454$ ; le ratio vaut 1 pour $\tau\approx2.236$ (et $\tau\approx0.447$) — au-delà, le test du signe est préférable. Le ratio est invariant par $\tau\leftrightarrow1/\tau$.
- Puissance locale : avec $\alpha=5\,\%$, $h\mu'(\theta_0)/\sigma=1.645$ donne une puissance limite $1-\Phi(0)=1/2$ *[Extracteur]*.

---

### Exercice 2 — Modèle Gamma$(2,\theta)$ : EMV, biais, risque, consistance, normalité asymptotique, IC ((⋆))
**Source :** Énoncé PC7, p. 3–4 ; Corrigé PC7, p. 18–19. Poly ch.7, §1.8 : « la chaîne complète ».

#### Énoncé complet
Pour $(a,b)\in\mathbb{R}_+^*\times\mathbb{R}_+^*$, on appelle $\Gamma(a,b)$ la loi de densité par rapport à la mesure de Lebesgue donnée par
$$x\mapsto\frac1{\Gamma(a)}b^ax^{a-1}\mathrm{e}^{-bx}\mathbb{1}_{\mathbb{R}_+^*}(x).$$
On rappelle que l'espérance d'une loi $\Gamma(a,b)$ est $a/b$ et que sa variance est $a/b^2$. Enfin, si $X\sim\Gamma(a,b)$, $Y\sim\Gamma(a',b)$ et $X,Y$ sont indépendantes, alors $X+Y\sim\Gamma(a+a',b)$.

Soit une suite de $n$-échantillons du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\Gamma(2,\theta):\theta\in\mathbb{R}_+^*\}\big)$.
1. Calculer l'estimateur du maximum de vraisemblance du paramètre $\theta$.
2. Calculer le biais et le risque quadratique de l'estimateur du maximum de vraisemblance.
3. Montrer que l'estimateur du maximum de vraisemblance est consistant.
4. Prouver la normalité asymptotique de l'estimateur du maximum de vraisemblance.
5. Donner un intervalle de confiance asymptotique de niveau $(1-\alpha)$ pour le paramètre $\theta$.

#### Corrigé complet question par question
Notons $Z_n:=(X_1,\dots,X_n)$. (Rappel §0.5 : le corrigé numérote 1, 2, 3, 4 ; son item 3 = Q4, son item 4 = Q5.)

**Q1 — EMV (Corrigé p. 18).**
1. Par **indépendance** (densité produit), la vraisemblance est
$$\theta\mapsto\mathrm{L}_n(\theta,Z_n)=\theta^{2n}\Big(\prod_{i=1}^nX_i\Big)\mathrm{e}^{-\theta\sum_{i=1}^nX_i}$$
   (le facteur $1/\Gamma(2)^n=1$).
2. La log-vraisemblance et ses dérivées :
$$\ell_n(\theta,Z_n)=C+2n\ln(\theta)-\theta\sum_{i=1}^nX_i,\qquad\dot\ell_n(\theta,Z_n)=\frac{2n}\theta-\sum_{i=1}^nX_i,\qquad\ddot\ell_n(\theta,Z_n)=-\frac{2n}{\theta^2},$$
   où $C$ ne dépend pas de $\theta$.
3. **Annulation du score** ; $\ddot\ell_n<0$ (**stricte concavité**) garantit que le point critique est l'unique maximum :
$$\hat\theta_n:=\frac{2n}{\sum_{i=1}^nX_i}=\frac2{\bar X_n},\qquad\bar X_n:=\frac1n\sum_{i=1}^nX_i.$$

**Q2 — Biais et risque quadratique (Corrigé p. 18).**
1. Sous $\mathbb{P}_{n,\theta}$, $X_i\sim\Gamma(2,\theta)$ et $X_1,\dots,X_n$ sont indépendants ; donc, **en utilisant le rappel (additivité)**, $\sum_{i=1}^nX_i\sim\Gamma(2n,\theta)$.
2. Calcul direct (**théorème de transfert**) :
$$\mathbb{E}_{n,\theta}[\hat\theta_n]=2n\int_0^\infty\frac1x\,\frac{\theta^{2n}x^{2n-1}}{\Gamma(2n)}\mathrm{e}^{-\theta x}\,\mathrm{d}x=\frac{2n}{2n-1}\theta$$
   *[Extracteur : on reconnaît $\frac{\theta^{2n}}{\Gamma(2n)}\Gamma(2n-1)\theta^{-(2n-1)}=\frac{\theta}{2n-1}$.]*
3. Donc le biais de $\hat\theta_n$ est
$$b(\hat\theta_n):=\mathbb{E}_{n,\theta}[\hat\theta_n-\theta]=\frac1{2n-1}\theta\quad(>0).$$
4. De même $\mathbb{E}_{n,\theta}[\hat\theta_n^2]=\dfrac{4n^2}{(2n-1)(2n-2)}\theta^2$, et donc (**décomposition biais-variance**, Poly ch.3, Prop. 1.1)
$$EQM(\hat\theta_n):=\mathbb{E}_{n,\theta}[(\hat\theta_n-\theta)^2]=\mathrm{Var}_\theta(\hat\theta_n)+b(\hat\theta_n)^2=\theta^2\left(\frac{4n^2}{(2n-1)^2(2n-2)}+\frac1{(2n-1)^2}\right).$$
5. On remarque ainsi une **décroissance en $1/n$** compatible avec une vitesse pour le TCL classique en $\sqrt n$.
6. *[Extracteur]* Simplification : $EQM(\hat\theta_n)=\theta^2\dfrac{n+1}{(2n-1)(n-1)}$ (valable pour $n\ge2$ ; pour $n=1$, $\mathbb{E}[\hat\theta_1^2]=+\infty$). Et $n\,EQM(\hat\theta_n)\to\theta^2/2$, la variance asymptotique trouvée en Q4.

**Q3 — Consistance.** Le corrigé ne la traite pas séparément : dans son item 4 (Q5), il note que « la normalité asymptotique de $\hat\theta_n$ entraine (par Slutsky) que $\hat\theta_n\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\theta$ » (en effet $\hat\theta_n-\theta=n^{-1/2}\cdot\sqrt n(\hat\theta_n-\theta)$, produit d'une suite tendant vers 0 et d'une suite convergeant en loi). *[Extracteur — deux autres routes directes : (i) **LGN** $\bar X_n\to2/\theta$ en probabilité puis **continuité** de $x\mapsto2/x$ en $2/\theta$ ; (ii) $EQM(\hat\theta_n)\to0$ et **inégalité de Markov** appliquée à $(\hat\theta_n-\theta)^2$.]*

**Q4 — Normalité asymptotique : trois solutions (Corrigé p. 18–19, item « 3. »).**

*Solution 1 (Slutsky : une partie LGN, une partie TCL).* On remarque
$$\sqrt n\big(\hat\theta_n-\theta\big)=\frac\theta{\bar X_n}\times\sqrt n\Big(\frac2\theta-\bar X_n\Big).$$
Par la **LGN** et la **continuité**, $\theta/\bar X_n\to\theta^2/2$ en probabilité ; par le **TCL usuel** ($\mathbb{E}_\theta[X_1]=2/\theta$, $\mathrm{Var}_\theta(X_1)=2/\theta^2$), $\sqrt n(2/\theta-\bar X_n)\Rightarrow\mathrm{N}(0,2/\theta^2)$ ; **Slutsky** :
$$\sqrt n\big(\hat\theta_n-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\frac{\theta^2}2\mathrm{N}(0,2/\theta^2)=\mathrm{N}(0,\theta^2/2).$$

*Solution 2 (théorème sur l'EMV).* Le modèle est **régulier**, on peut donc appliquer le résultat sur la normalité asymptotique de l'EMV (Poly ch.7, **Th. 1.6** / Th. 1.7) et calculer l'information de Fisher
$$\mathbb{I}(\theta):=-\int\ddot l(\theta,x)\,\mathbb{Q}_\theta(\mathrm{d}x)=2/\theta^2$$
(car $\ddot l(\theta,x)=-2/\theta^2$ ne dépend pas de $x$). On obtient $\sqrt n(\hat\theta_n-\theta)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,\theta^2/2)=\mathrm{N}(0,1/\mathbb{I}(\theta))$.

*Solution 3 (méthode delta).* Par le **TCL pour des v.a. i.i.d. admettant un moment d'ordre 2**,
$$\sqrt n\Big(\bar X_n-\frac2\theta\Big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,2/\theta^2).$$
Or $\hat\theta_n=g(\bar X_n)$ avec $g(x)=2/x$, de classe $C^1$ sur $\mathbb{R}_+^\star$, donc en $2/\theta$. Par la **méthode delta** (Poly ch.6, Th. 1.7) :
$$\sqrt n\big(\hat\theta_n-g(2/\theta)\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}\Big(0,\frac2{\theta^2}\big(g'(2/\theta)\big)^2\Big),$$
soit encore ($g(2/\theta)=\theta$, $g'(2/\theta)=-\theta^2/2$) $\sqrt n(\hat\theta_n-\theta)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,\theta^2/2)$.

**Q5 — Intervalle de confiance asymptotique (Corrigé p. 19, item « 4. »).**
1. Notons $z_{1-\alpha/2}$ le quantile d'ordre $1-\alpha/2$ de $\mathrm{N}(0,1)$. Par Q4 et Portmanteau,
$$\lim_n\mathbb{P}_{n,\theta}\left(-z_{1-\alpha/2}\le\sqrt n\frac{\big(\hat\theta_n-\theta\big)}{\theta/\sqrt2}\le z_{1-\alpha/2}\right)=1-\alpha.$$
2. La normalité asymptotique entraîne (**par Slutsky**) $\hat\theta_n\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}\theta$ (Q3). **Par Slutsky** (remplacer $\theta$ par $\hat\theta_n$ au dénominateur) :
$$\lim_n\mathbb{P}_{n,\theta}\left(-z_{1-\alpha/2}\le\sqrt n\frac{\big(\hat\theta_n-\theta\big)}{\hat\theta_n/\sqrt2}\le z_{1-\alpha/2}\right)=1-\alpha.$$
3. D'où l'intervalle aléatoire
$$\widehat{I}_n=\left[\hat\theta_n\pm z_{1-\alpha/2}\frac{\hat\theta_n}{\sqrt{2n}}\right],\qquad\lim_n\mathbb{P}_{n,\theta}(\theta\in\widehat{I}_n)=1-\alpha.$$

#### Méthodes mobilisées
- Calcul d'EMV par **annulation du score** + stricte concavité de la log-vraisemblance.
- **Additivité des lois Gamma** (indépendance) ; calcul de moments inverses $\mathbb{E}[S^{-1}]$, $\mathbb{E}[S^{-2}]$ par reconnaissance d'une densité Gamma ; **décomposition biais-variance**.
- Consistance déduite de la normalité asymptotique (Slutsky).
- Normalité asymptotique par **trois routes** : Slutsky (LGN + TCL), **théorème de normalité asymptotique de l'EMV** (information de Fisher), **méthode-δ**.
- **IC asymptotique par pivot + Slutsky** (variance estimée par plug-in), cf. Poly ch.6, Méthode 1.1.

#### Pièges relevés / remarques du corrigé
- Paramétrisation Gamma en **intensité** : $\mathbb{E}[X]=2/\theta$ (et non $2\theta$).
- L'EMV est **biaisé** (biais positif $\theta/(2n-1)$) mais asymptotiquement sans biais ; l'EQM décroît en $1/n$.
- $\mathbb{E}[1/\bar X_n]\ne1/\mathbb{E}[\bar X_n]$ (Jensen) : d'où le biais.
- Les trois solutions donnent la même variance $\theta^2/2=1/\mathbb{I}(\theta)$ : l'EMV atteint la borne asymptotique (Poly ch.7, Th. 1.7).
- Dans l'IC, on remplace $\theta$ par $\hat\theta_n$ dans l'écart-type : justification par Slutsky (consistance + continuité).
- Décalage de numérotation énoncé / corrigé (§0.5).

#### Résultats numériques
- $\mathbb{I}(\theta)=2/\theta^2$ ; variance asymptotique $\theta^2/2$ ; biais $\theta/(2n-1)$.
- *[Extracteur]* $n=5$, $\theta=1$ : $\mathbb{E}[\hat\theta_5]=10/9\approx1.111$, $EQM=6/36\approx0.167$ (comparer à $\theta^2/(2n)=0.1$).
- *[Extracteur]* Application : $n=50$, $\bar X_n=0.8$ $\Rightarrow$ $\hat\theta_n=2.5$ ; IC à 95 % ($z_{0.975}\approx1.96$) : $2.5\pm1.96\times2.5/\sqrt{100}=2.5\pm0.49$, soit $[2.01;\,2.99]$.

---

### Exercice 3 — Loi log-normale de paramètre $(\theta,\theta)$ ((⋆))
**Source :** Énoncé PC7, p. 4 ; Corrigé PC7, p. 20–21. Poly ch.7, §1.8 : « les deux composantes du couple habituel sont liées ».

#### Énoncé complet
Une variable aléatoire $X$ à valeurs dans $\mathbb{R}_+^*$ suit une loi log-normale de paramètre $(\mu,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^*$ si la variable $Y=\log(X)$ est normale de moyenne $\mu$ et variance $\sigma^2$. Cette distribution est très couramment utilisée pour modéliser le prix des actifs financiers (c'est la base du modèle très couramment utilisé de Black-Scholes-Merton ; voir PC1).

Soit une suite de $n$-échantillons de la famille de loi log-normale de paramètre $(\theta,\theta)$, $\theta\in\Theta:=\mathbb{R}_*^+$.
1. Déterminer l'estimateur du maximum de vraisemblance de $\theta$.
2. Prouver la normalité asymptotique de l'estimateur du maximum de vraisemblance.
3. Construire un intervalle de confiance de probabilité de couverture asymptotique $1-\alpha$.

#### Corrigé complet question par question
Notons $Z_n:=(X_1,\dots,X_n)$ ; et $\mathbb{Q}_\theta$ la loi normale de paramètres $(\theta,\theta)$ (loi de $Y_i=\log X_i$).

**Q1 — EMV (Corrigé p. 20).**
1. La loi log-normale de paramètre $(\mu,\sigma^2)$ a pour densité
$$f(x)=\frac1{\sqrt{2\pi}\,\sigma x}\mathrm{e}^{-(\log(x)-\mu)^2/2\sigma^2}\mathbb{1}_{\{x>0\}}.$$
2. *[Complément du corrigé, en bleu] — Comment établir cette expression (méthode de la fonction muette).* Soit $h$ mesurable positive. On a
$$\mathbb{E}[h(X)]=\mathbb{E}[h(\exp(Y))]=\frac1{\sqrt{2\pi}\sigma}\int h(\exp(y))\exp(-0.5(y-\mu)^2/\sigma^2)\,\mathrm{d}y=\frac1{\sqrt{2\pi}\sigma}\int_{\mathbb{R}^+}h(z)\,z^{-1}\exp(-0.5(\ln z-\mu)^2/\sigma^2)\,\mathrm{d}z$$
   (**changement de variable** $z=\exp(y)$). Cette relation étant vraie pour toute $h$ mesurable positive, on identifie la densité $x\mapsto(\sqrt{2\pi}\sigma x)^{-1}\exp(-(\log(x)-\mu)^2/2\sigma^2)\mathbb{1}_{\mathbb{R}_+}(x)$.
3. *Log-vraisemblance* en posant $Y_i=\log(X_i)$ (avec $\mu=\sigma^2=\theta$) :
$$\theta\mapsto\ell_n(\theta;Z_n)=-\frac n2\log(\theta)-\sum_{i=1}^n\frac{(Y_i-\theta)^2}{2\theta}+C=-\frac n2\log(\theta)-\sum_{i=1}^n\frac{Y_i^2}{2\theta}-\frac{n\theta}2+C,$$
   où $C$ désigne une constante (par rapport à $\theta$) dont la valeur peut changer à chaque utilisation (elle absorbe $-\sum\log X_i$ et le terme croisé $\sum Y_i$).
4. *Score :*
$$2\dot\ell_n(\theta,Z_n)=-\frac n\theta+\sum_{i=1}^n\frac{Y_i^2}{\theta^2}-n=-\left(\frac{\theta^2+\theta-\frac1n\sum_{i=1}^nY_i^2}{\theta^2/n}\right).$$
5. *Étude de signe.* Si les $y_i$ sont non tous nuls, le numérateur $\theta^2+\theta-\frac1n\sum Y_i^2$ a une racine $\theta_+$ strictement positive et une racine $\theta_-$ strictement négative ; le score est strictement positif sur $(0,\theta_+)$ et strictement négatif sur $(\theta_+,+\infty)$. L'EMV est donc **uniquement défini** et vaut, avec $Y_i=\log(X_i)$ :
$$\hat\theta_n=-\frac12+\sqrt{\frac14+\frac1n\sum_{i=1}^nY_i^2}.$$

**Q2 — Normalité asymptotique (Corrigé p. 20–21).**
1. On pose $\bar T_n:=\frac1n\sum_{i=1}^nY_i^2$. On a $\int y^2\,\mathbb{Q}_\theta(\mathrm{d}y)=\theta+\theta^2=\theta(1+\theta)$ (variance + carré de la moyenne).
2. En notant $G\sim\mathrm{N}(0,1)$ (donc $Y_i\overset{\mathcal L}{=}\theta+\sqrt\theta G$, $\mathbb{E}[G^2]=1$, $\mathbb{E}[G^4]=3$, moments impairs nuls), la variance de $Y_i^2$ sous $\mathbb{Q}_\theta$ est
$$\mathbb{E}\Big[(\theta+\sqrt\theta G)^4\Big]-\Big(\int y^2\,\mathbb{Q}_\theta(\mathrm{d}y)\Big)^2=\theta^4+6\theta^3\mathbb{E}[G^2]+\theta^2\mathbb{E}[G^4]-(\theta+\theta^2)^2=\theta^4+6\theta^3+3\theta^2-\theta^2-\theta^4-2\theta^3=4\theta^3+2\theta^2=2\theta^2(2\theta+1).$$
3. **Le TCL** assure que
$$\sqrt n\big(\bar T_n-(\theta+\theta^2)\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,\sigma^2(\theta)),\qquad\sigma^2(\theta):=2\theta^2(1+2\theta).$$
4. **Méthode delta** avec $\varphi(z)=\sqrt{\frac14+z}$ (on a $\hat\theta_n=\varphi(\bar T_n)-\frac12$ et $\varphi(\theta+\theta^2)=\theta+\frac12$) :
$$\sqrt n(\hat\theta_n-\theta)=\sqrt n\big(\varphi(\bar T_n)-\varphi(\theta+\theta^2)\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,\sigma_0^2(\theta)),$$
   avec ($\varphi'(z)=\frac1{2\sqrt{1/4+z}}$, donc $\varphi'(\theta+\theta^2)=\frac1{1+2\theta}$)
$$\sigma_0^2(\theta):=\varphi'(\theta+\theta^2)^2\sigma^2(\theta)=\frac{2\theta^2}{1+2\theta}.$$
5. (On remarque en particulier que la variance asymptotique $\sigma_0^2(\theta)$ est **inférieure** à celle de l'estimateur de la moyenne empirique (des $Y_i$), qui vaut $\theta$.)
6. *[Extracteur — vérification par le Poly ch.7, Th. 1.6 :]* pour une observation, $\dot\ell(\theta,y)=-\frac1{2\theta}+\frac{y^2}{2\theta^2}-\frac12$, d'où $\mathbb{I}(\theta)=\mathrm{Var}_\theta(Y^2)/(4\theta^4)=\frac{1+2\theta}{2\theta^2}$ et $1/\mathbb{I}(\theta)=\sigma_0^2(\theta)$ : la méthode-δ redonne bien la variance $1/\mathbb{I}$ de l'EMV.

**Q3 — Intervalle de confiance (Corrigé p. 21).**
1. On déduit du **lemme de Slutsky** (consistance de $\hat\theta_n$, déduite de Q2, et **continuité** de $\sigma_0$) que
$$\sqrt n(\hat\theta_n-\theta)/\sigma_0(\hat\theta_n)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1).$$
2. On note $\Phi^{-1}(u)$ le quantile d'ordre $u$ de $\mathrm{N}(0,1)$. L'intervalle de confiance asymptotique de couverture $1-\alpha$ est donc
$$\left[\hat\theta_n\pm\sigma_0(\hat\theta_n)\frac{\Phi^{-1}(1-\alpha/2)}{\sqrt n}\right],\qquad\sigma_0(\hat\theta_n)=\frac{\sqrt2\,\hat\theta_n}{\sqrt{1+2\hat\theta_n}}.$$

#### Méthodes mobilisées
- **Densité d'une loi image** par la méthode de la fonction muette et changement de variable $z=e^y$.
- Calcul d'EMV par **annulation du score** et **étude de signe** d'un trinôme (racine positive unique).
- Moments gaussiens ($\mathbb{E}[G^4]=3$) ; **TCL** pour la statistique $\bar T_n=\frac1n\sum Y_i^2$.
- **Méthode-δ** (Poly ch.6, Th. 1.7) avec $\varphi(z)=\sqrt{1/4+z}$.
- **IC par pivot asymptotique + Slutsky** (plug-in de $\sigma_0(\hat\theta_n)$).

#### Pièges relevés / remarques du corrigé
- Les deux paramètres du couple habituel sont **liés** ($\mu=\sigma^2=\theta$) : la log-vraisemblance n'est pas celle d'un modèle de translation ; l'EMV n'est **pas** $\bar Y_n$.
- L'EMV ne dépend des données qu'à travers $\bar T_n=\frac1n\sum(\log X_i)^2$ (le terme $\sum Y_i$ disparaît dans la constante).
- Ne pas oublier le jacobien $1/x$ dans la densité log-normale (il est constant en $\theta$, donc sans effet sur l'EMV).
- Variance asymptotique $\frac{2\theta^2}{1+2\theta}<\theta$ : l'EMV fait mieux que l'estimateur naïf $\bar Y_n$ (qui estime aussi $\theta$).
- « Si les $y_i$ sont non tous nuls » : événement de probabilité 1.

#### Résultats numériques
- *[Extracteur]* $\theta=1$ : $\sigma^2(1)=6$, $\sigma_0^2(1)=2/3\approx0.667$ (contre $1$ pour $\bar Y_n$) ; $\theta=0.5$ : $\sigma_0^2=0.25$ (contre $0.5$).
- *[Extracteur]* Si $\bar T_n=2$ : $\hat\theta_n=-0.5+\sqrt{2.25}=1$ ; IC à 95 % pour $n=100$ : $1\pm1.96\times\sqrt{2/3}/10\approx1\pm0.16$.

---

### Exercice 4 — Modèle $\mathrm{N}(\theta,1)$ avec $\Theta=\mathbb{R}_+$ : paramètre à la frontière ((⋆))
**Source :** Énoncé PC7, p. 4 ; Corrigé PC7, p. 22. Poly ch.7 : remarque (a) après le Th. 1.4 (p. 21) et Compléments §4.9 point 2 (p. 41).

#### Énoncé complet
Soit une suite de $n$-échantillons du modèle $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathrm{N}(\theta,1):\theta\in\Theta:=\mathbb{R}_+\})$. *Attention, l'originalité de cet exercice est de contraindre le paramètre à être strictement positif* (sic, cf. §0.5 point 8).
1. Déterminer l'estimateur du maximum de vraisemblance $\hat\theta_n^{\mathrm{MV}}$.
2. Montrer que pour tout $\theta>0$,
$$\sqrt n(\hat\theta_n^{\mathrm{MV}}-\theta)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1).$$
3. Déterminer la loi limite lorsque $\theta=0$.

#### Corrigé complet question par question

**Q1 — EMV sous contrainte (Corrigé p. 22).**
1. La log-vraisemblance est
$$\theta\mapsto\ell_n(\theta):=-\frac n2\ln(2\pi)-\frac12\sum_{k=1}^n(X_k-\theta)^2=-\frac n2\ln(2\pi)-\frac n2S_n^2-\frac n2\theta^2+n\theta\bar X_n,$$
   en ayant posé $\bar X_n:=n^{-1}\sum_{k=1}^nX_k$, $S_n^2:=n^{-1}\sum_{k=1}^nX_k^2$ (**moment d'ordre 2 non centré**).
2. Il s'agit d'une **forme quadratique** (concave) qui tend vers $-\infty$ quand $\lvert\theta\rvert\to+\infty$ ; sur $\mathbb{R}$, elle atteint son maximum en $\bar X_n$. Sur $\Theta=\mathbb{R}_+$, deux cas (si $\bar X_n<0$, $\ell_n$ est décroissante sur $\mathbb{R}_+$, maximum au bord) :
$$\hat\theta_n:=\begin{cases}\bar X_n&\text{si }\bar X_n\ge0\\0&\text{si }\bar X_n<0\end{cases}$$
   c'est-à-dire $\hat\theta_n=\max(\bar X_n,0)$.

**Q2 — Normalité asymptotique pour $\theta>0$ (Corrigé p. 22).**
1. Soit $\theta>0$. Décomposition :
$$\sqrt n(\hat\theta_n-\theta)=\sqrt n(\bar X_n-\theta)-\sqrt n\bar X_n\mathbb{1}_{\{\bar X_n<0\}}.$$
2. Or $\mathbb{1}_{\{\bar X_n<0\}}\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}0$ (**LGN** : $\bar X_n\to\theta>0$) et donc $\sqrt n\bar X_n\mathbb{1}_{\{\bar X_n<0\}}\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}0$ *[Extracteur : $\mathbb{P}_{n,\theta}(\sqrt n\bar X_n\mathbb{1}_{\{\bar X_n<0\}}\ne0)\le\mathbb{P}_{n,\theta}(\bar X_n<0)=\Phi(-\sqrt n\theta)\to0$]*.
3. Comme $\sqrt n(\bar X_n-\theta)\sim\mathrm{N}(0,1)$ (loi **exacte**, modèle gaussien), on déduit du **lemme de Slutsky** que $\sqrt n(\hat\theta_n-\theta)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathrm{N}(0,1)$.

**Q3 — Loi limite pour $\theta=0$ (Corrigé p. 22).**
1. Lorsque $\theta=0$,
$$\sqrt n(\hat\theta_n-\theta)=\sqrt n\bar X_n\mathbb{1}_{\bar X_n\ge0}\overset{\mathcal L}{=}Z\mathbb{1}_{Z\ge0},$$
   où $Z\sim\mathrm{N}(0,1)$, puisque $\sqrt n\bar X_n\sim\mathrm{N}(0,1)$ sous $\mathbb{P}_{n,0}$ (et $\{\sqrt n\bar X_n\ge0\}=\{\bar X_n\ge0\}$). La loi est donc, pour tout $n$ (et a fortiori à la limite), celle de $Z\mathbb{1}_{Z\ge0}=\max(Z,0)$.
2. *[Complément du corrigé, en bleu]* Par construction, $\hat\theta_n\ge0=\theta$ ; on retrouve que la loi limite est restreinte à $\mathbb{R}_+$.
3. Le Poly ch.7 (§4.9) précise : loi limite **non gaussienne**, qui **charge 0 avec masse $1/2$** (mélange $\frac12\delta_0+$ la partie positive de $\mathrm{N}(0,1)$).

#### Méthodes mobilisées
- Calcul d'EMV **sous contrainte** (maximisation d'une parabole concave sur $\mathbb{R}_+$ : maximum intérieur ou au bord).
- Décomposition $\hat\theta_n=\bar X_n-\bar X_n\mathbb{1}_{\{\bar X_n<0\}}$ ; **convergence en probabilité d'une indicatrice** (LGN) ; **lemme de Slutsky**.
- Loi exacte de $\sqrt n\bar X_n$ dans le modèle gaussien ; loi d'une fonction ($\max(\cdot,0)$) d'une gaussienne.

#### Pièges relevés / remarques du corrigé
- **La conclusion du Th. 1.4 (et du Th. 1.6) du Poly ch.7 tombe au bord** : les hypothèses de ces théorèmes sont locales et ne valent qu'aux points **intérieurs** $\theta^\star\in\Theta^o$. Ici, en $\theta=0$, la loi limite n'est **pas** gaussienne et n'est **pas centrée**.
- Pour $\theta>0$ fixé, la contrainte ne joue asymptotiquement aucun rôle (la probabilité que $\bar X_n<0$ est exponentiellement petite).
- Ne pas confondre $S_n^2$ (ici moment non centré) avec la variance empirique.
- L'énoncé dit « strictement positif » mais $\Theta=\mathbb{R}_+$ (§0.5).

#### Résultats numériques
- *[Extracteur]* Sous $\theta=0$ : $\mathbb{P}_{n,0}(\hat\theta_n=0)=1/2$ pour tout $n$ ; la loi limite $\max(Z,0)$ a pour moyenne $1/\sqrt{2\pi}\approx0.399$ et pour variance $\frac12-\frac1{2\pi}\approx0.341$.
- *[Extracteur]* Sous $\theta>0$ : $\mathbb{P}_{n,\theta}(\hat\theta_n=0)=\Phi(-\sqrt n\theta)$ ; par exemple $\theta=0.1$, $n=100$ : $\Phi(-1)\approx0.159$ ; $n=400$ : $\Phi(-2)\approx0.023$.

---

### Exercice 5 — Z-estimateurs de translation $\psi(\theta,x)=\gamma(x-\theta)$ : existence, consistance par monotonie, normalité asymptotique, robustesse ((⋆⋆⋆))
**Source :** Énoncé PC7, p. 5–7 (Figures 3–4) ; Corrigé PC7, p. 23–26 (Figure 7). Poly ch.7, Ex. 1.4 et §1.8.

#### Énoncé complet
Soit $f$ une densité par rapport à la mesure de Lebesgue sur $\mathbb{R}$ telle que $f(x)=f(-x)$ pour tout $x\in\mathbb{R}$. Pour $\theta\in\mathbb{R}$ et $x\in\mathbb{R}$, nous notons $q_\theta(x):=f(x-\theta)$. Soit

> **H1** $\gamma:\mathbb{R}\to\mathbb{R}$ une fonction impaire, croissante (au sens large) et telle que
> $$\lim_{x\to-\infty}\gamma(x)<0,\qquad\lim_{x\to+\infty}\gamma(x)>0,\tag{4}$$
> $$\int_{\mathbb{R}}\lvert\gamma(x-\theta)\rvert f(x)\,\mathrm{Leb}(\mathrm{d}x)<+\infty,\qquad\text{pour tout }\theta\in\mathbb{R}.$$

Considérons une suite de $n$-échantillons du modèle $(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathbb{Q}_\theta=q_\theta\cdot\mathrm{Leb}:\theta\in\mathbb{R}\})$. Nous étudions les Z-estimateurs associés à
$$\psi(\theta,x)=\gamma(x-\theta).$$
Soit une suite de fonctions aléatoires $\{\Psi_n,\ n\ge1\}$ définies sur $\Theta$ par :
$$\theta\mapsto\Psi_n(\theta):=\frac1n\sum_{k=1}^n\gamma(X_k-\theta)=-\frac1n\sum_{k=1}^n\gamma(\theta-X_k).$$
La figure 3 montre la fonction $\Psi_n$ pour différentes valeurs de $n$, dans le cas où $\gamma$ est égale à $\gamma_0=\mathrm{signe}(x)$ (gauche), $\gamma_\infty(x)=x$ (centre) et $\gamma_1(x)=\mathrm{signe}(x)(\lvert x\rvert\wedge1)$ (droite), et $f$ est une densité gaussienne centrée réduite ; en trait épais, on trace aussi la fonction $\Psi_{\theta_0}$ (pour $\theta_0=2$) où
$$\theta\mapsto\Psi_{\theta_0}(\theta):=\mathbb{Q}_{\theta_0}(\gamma(\cdot-\theta))=\int\gamma(x-\theta)\,q_{\theta_0}(x)\,\mathrm{Leb}(\mathrm{d}x)=\int\gamma(x-\theta)f(x-\theta_0)\,\mathrm{Leb}(\mathrm{d}x)=\int\gamma(x+\theta_0-\theta)f(x)\,\mathrm{Leb}(\mathrm{d}x).$$
Noter que la condition **H1** justifie l'existence de $\Psi_\theta$ pour tout $\theta$.

1. Montrer que pour tout $n\ge1$, tout $\theta_0\in\mathbb{R}$,
$$\mathbb{P}_{n,\theta_0}\Big(\exists\hat\theta_n\ \text{tq}\ \Psi_n\ge0\ \text{sur}\ \big]-\infty,\hat\theta_n\big[\ \text{et}\ \Psi_n\le0\ \text{sur}\ \big]\hat\theta_n,+\infty\big[\Big)=1.$$
   (a) Montrer que si $\gamma$ est continue, il existe $\hat\theta_n$ tel que $\Psi_n(\hat\theta_n)=0$.
   (b) Montrer que si $\gamma$ est strictement croissante et continue, alors $\hat\theta_n$ est unique.
   (c) Étudier les cas où $\gamma$ est une des fonctions suivantes :
$$\gamma_0(x)=\mathrm{signe}(x),\qquad\gamma_\infty(x)=x,\qquad\gamma_k(x)=\begin{cases}x&\lvert x\rvert\le k\\k\,\mathrm{signe}(x)&\lvert x\rvert>k\end{cases}.\tag{5}$$

Dans la suite, on fait l'hypothèse suivante.

> **H2** Il existe $\delta>0$ telle que la fonction $\theta\mapsto\Psi_0(\theta)=\int\gamma(x-\theta)f(x)\,\mathrm{dLeb}(x)$ soit strictement monotone sur $[-\delta,\delta]$.

2. Montrer que pour tout $\theta_0\in\mathbb{R}$, $\theta_0$ est l'unique solution de l'équation $\Psi_{\theta_0}(\theta)=0$.
3. Soit $\theta_0\in\mathbb{R}$ et $\varepsilon\in\,]0,\delta[$. Montrer que sous $\mathbb{P}_{n,\theta_0}$,
$$\hat\theta_n<\theta_0-\varepsilon\implies\Psi_n(\theta_0-\varepsilon)\leqslant0.$$
   En déduire que $\lim_{n\to\infty}\mathbb{P}_{n,\theta_0}(\hat\theta_n<\theta_0-\varepsilon)=0$.
4. Montrer que $\{\hat\theta_n,\ n\in\mathbb{N}\}$ est une suite consistante d'estimateurs de $\theta$.

On fait maintenant l'hypothèse supplémentaire suivante.

> **H3** $\gamma$ est $C^1$ et
> $$\int\gamma^2(x)f(x)\,\mathrm{Leb}(\mathrm{d}x)<\infty,\qquad\int\gamma'(x)f(x)\,\mathrm{Leb}(\mathrm{d}x)>0,\tag{6}$$
> $$\forall\delta>0,\qquad\int\sup_{\lvert y-x\rvert\le\delta}\lvert\gamma'(y)\rvert f(x)\,\mathrm{Leb}(\mathrm{d}x)<\infty.\tag{7}$$

5. Montrer que la suite d'estimateurs $\{\hat\theta_n,\ n\in\mathbb{N}\}$ est asymptotiquement normale et déterminer sa distribution asymptotique. Dans la suite, on notera $V[\gamma]$ la variance limite. *Pour la normalité asymptotique, on peut juste supposer que $\gamma$ est « continue, $C^1$ par morceaux, et vérifie (6)-(7) ».*

On compare l'efficacité relative des estimateurs $\{\hat\theta_n,\ n\in\mathbb{N}\}$ obtenus avec $\gamma=\gamma_\infty$ d'une part, et $\gamma=\gamma_k$ pour $k>0$ d'autre part (voir Eq. 5).

6. On considère tout d'abord le cas où $f$ est la densité de la loi $\mathrm{N}(0,\sigma^2)$. Comparer l'efficacité relative en fonction de $k$ : sur la figure 4 (gauche), on représente la variance asymptotique $V[\gamma_k]$ en fonction de $k$ — on a pris $\sigma^2=1$.
7. Déterminer la variance asymptotique dans le cas où
$$f(x)=(1-\varepsilon)\phi(x)+\varepsilon\tau^{-1}\phi(\tau^{-1}x),$$
   $\phi$ est la densité d'une Gaussienne centrée réduite (observer que dans ce cas, $\tau^{-1}\phi(\tau^{-1}x)$ est une Gaussienne centrée de variance $\tau^2$). Sur la figure 4 (droite), on représente la variance asymptotique $V[\gamma_k]$ en fonction de $k$ — on a pris $\varepsilon=0.01$ et $\tau=10$.
   Ce type de modèles est utilisé en statistiques robustes pour modéliser la présence de données aberrantes : $\varepsilon$ est la probabilité de contamination, qui est en général très petite, et $\tau$ est l'écart-type des données « contaminées » que l'on prend très grand. Commenter l'intérêt de prendre la fonction $\gamma_k$ ($k<\infty$) plutôt que $\gamma_\infty$.

*Figures de l'énoncé.* **Figure 3** — « (gauche) cas $\gamma_0$, (centre) cas $\gamma_\infty$, (droite) cas $\gamma_k$ avec $k=1$. Pour chacun des cas, on trace $\theta\mapsto\Psi_n(\theta)$ pour $n=2,10,100$ et on trace $\theta\mapsto\Psi_{\theta_0}(\theta)$ en trait épais. On a pris $f\equiv\mathrm{N}(0,1)$ et $\theta_0=2$. » (Gauche : fonctions en escalier décroissantes à valeurs dans $[-1,1]$, avec un palier nul pour $n=2$ ; centre : droites décroissantes ; droite : courbes continues décroissantes bornées par $\pm1$.) **Figure 4** — « [gauche] : pas de contamination (cas $\sigma^2=1$). [droite] : $\varepsilon=0.01$ et $\tau=10$. » (Gauche : $k\mapsto V[\gamma_k]$ décroît de $\approx1.57$ en $k\to0$ jusqu'à un plateau $\approx1.0$ dès $k\approx3$ ; droite : décroît de $\approx1.6$ jusqu'à un minimum $\approx1.05$ vers $k\approx2$, puis remonte à $\approx1.5$ en $k=10$.)

#### Corrigé complet question par question

**Q1 — Existence d'un « zéro généralisé » (Corrigé p. 23).**
1. Soit $n\ge1$ et $\theta_0\in\mathbb{R}$. Puisque $\gamma$ est **croissante**, la fonction $\theta\mapsto\Psi_n(\theta)$ est **décroissante** $\mathbb{P}_{n,\theta_0}$-p.s. ; de plus (imparité de $\gamma$ et (4))
$$\lim_{\theta\to-\infty}\Psi_n(\theta)=-\lim_{-\infty}\gamma>0,\qquad\lim_{\theta\to+\infty}\Psi_n(\theta)=-\lim_{+\infty}\gamma<0.$$
2. Donc $\hat\theta_n:=\sup\{\theta\in\mathbb{R}:\Psi_n(\theta)>0\}$ est **fini**. Il répond à la question, comme toute valeur dans l'intervalle
$$\big[\sup\{\theta\in\mathbb{R}:\Psi_n(\theta)>0\},\ \inf\{\theta\in\mathbb{R};\Psi_n(\theta)<0\}\big].$$
3. Le cas $\gamma=\gamma_0$ et $n$ pair est un exemple où $\hat\theta_n$ n'est **pas unique** (figure 3, gauche).
- **(a)** La **continuité** de $\gamma$ assure la continuité de $\Psi_n$ et donc, par le **théorème des valeurs intermédiaires**, il existe $\hat\theta_n$ tel que $\Psi_n(\hat\theta_n)=0$ (figure 3, centre ou droite).
- **(b)** La **croissance stricte** de $\gamma$ assure la décroissance stricte de $\Psi_n$, donc l'**unicité** de $\hat\theta_n$. Le cas $\gamma=\gamma_\infty$ est un exemple où $\hat\theta_n$ est l'unique racine (figure 3, centre).
- **(c)** i. *Cas $\gamma(x)=\mathrm{signe}(x)$* : $\hat\theta_n$ est la **médiane empirique** : $X_{(n+1)/2:n}$ si $n$ est impair et toute valeur dans $\big]X_{n/2:n},X_{n/2+1:n}\big[$ si $n$ est pair. ii. *Cas $\gamma(x)=x$* : $\hat\theta_n=\bar X_n$ est la **moyenne empirique**. iii. *Cas mixte ($\gamma_k$)* : la fonction $\gamma$ est continue, $\hat\theta_n$ est une racine de $\Psi_n$ mais rien n'assure que $\hat\theta_n$ soit unique ($\gamma_k$ n'est pas strictement croissante : constante hors de $[-k,k]$).

**Q2 — $\theta_0$ est l'unique zéro de $\Psi_{\theta_0}$ (Corrigé p. 23).**
1. *Existence :*
$$\Psi_{\theta_0}(\theta_0)=\int_{\mathbb{R}}\gamma(x-\theta_0)f(x-\theta_0)\,\mathrm{Leb}(\mathrm{d}x)=\int_{\mathbb{R}}\gamma(x)f(x)\,\mathrm{Leb}(\mathrm{d}x)=0,$$
   car $\gamma f$ est **impaire** et $\int\lvert\gamma\rvert f\,\mathrm{dLeb}<\infty$ par hypothèse **H1**. Ainsi, une racine existe.
2. *Unicité :* pour tout $\theta_0$, $\theta\mapsto\Psi_{\theta_0}(\theta)=\Psi_0(\theta-\theta_0)$ est monotone (au sens large) et **strictement monotone** sur $[-\delta,\delta]$ autour de $0$ (**H2**) ; cette racine est donc unique.

**Q3 — Contrôle de $\{\hat\theta_n<\theta_0-\varepsilon\}$ (Corrigé p. 23–24).**
Soient $\theta_0$ et $\varepsilon>0$ fixés. Par définition de $\hat\theta_n$ (soit la borne sup, soit toute valeur de l'intervalle, voir Q1), on a sous $\mathbb{P}_{n,\theta_0}$ :
$$\{\hat\theta_n<\theta_0-\varepsilon\}\subseteq\{\Psi_n(\theta_0-\varepsilon)\le0\}.\tag{8}$$
*Étape 1. Montrons que $\Psi_{\theta_0}(\theta_0-\varepsilon)>0$.* La fonction $\theta\mapsto\Psi_{\theta_0}(\theta)$ est strictement décroissante sur $[\theta_0-\delta,\theta_0+\delta]$ (H2 et Q2) et s'annule en $\theta_0$ ; comme $\varepsilon\in\,]0,\delta[$, $\Psi_{\theta_0}(\theta_0-\varepsilon)>0$.

*Étape 2. Établissons la limite demandée.* Puisque
$$\Psi_n(\theta_0-\varepsilon)-\Psi_{\theta_0}(\theta_0-\varepsilon)=\frac1n\sum_{k=1}^n\{\gamma(X_k-\theta_0+\varepsilon)-\Psi_{\theta_0}(\theta_0-\varepsilon)\},$$
par la **loi faible des grands nombres** (Poly ch.7, Th. 2.1 : variables i.i.d. **intégrables**) :
$$\lim_{n\to\infty}\mathbb{P}_{n,\theta_0}\big(\lvert\Psi_n(\theta_0-\varepsilon)-\Psi_{\theta_0}(\theta_0-\varepsilon)\rvert>\Psi_{\theta_0}(\theta_0-\varepsilon)/2\big)=0,$$
dont on déduit
$$\lim_n\mathbb{P}_{n,\theta_0}\big(\Psi_n(\theta_0-\varepsilon)>\Psi_{\theta_0}(\theta_0-\varepsilon)/2\big)=1.\tag{9}$$
Les hypothèses de la LGN sont vérifiées : sous $\mathbb{P}_{n,\theta_0}$, les v.a. $X_1,\dots,X_n$ sont indépendantes et la condition d'intégrabilité est vraie par (4) (seconde ligne de H1).

*Conclusion.* De la relation
$$\mathbb{P}_{n,\theta_0}\big(\Psi_n(\theta_0-\varepsilon)>\Psi_{\theta_0}(\theta_0-\varepsilon)/2\big)=\mathbb{P}_{n,\theta_0}\big(\Psi_n(\theta_0-\varepsilon)>\Psi_{\theta_0}(\theta_0-\varepsilon)/2,\ \hat\theta_n\ge\theta_0-\varepsilon\big)+\mathbb{P}_{n,\theta_0}\big(\Psi_n(\theta_0-\varepsilon)>\Psi_{\theta_0}(\theta_0-\varepsilon)/2,\ \hat\theta_n<\theta_0-\varepsilon\big),$$
où le second terme est **nul** par (8) (sur $\{\hat\theta_n<\theta_0-\varepsilon\}$, $\Psi_n(\theta_0-\varepsilon)\le0<\Psi_{\theta_0}(\theta_0-\varepsilon)/2$), puis un passage à la limite quand $n\to+\infty$ et (9) :
$$1=\lim_n\mathbb{P}_{n,\theta_0}\big(\Psi_n(\theta_0-\varepsilon)>\Psi_{\theta_0}(\theta_0-\varepsilon)/2,\ \hat\theta_n\ge\theta_0-\varepsilon\big)=\lim_n\mathbb{P}_{n,\theta_0}\big(\hat\theta_n\ge\theta_0-\varepsilon\big),$$
c'est-à-dire $\lim_n\mathbb{P}_{n,\theta_0}(\hat\theta_n<\theta_0-\varepsilon)=0$.

**Q4 — Consistance (Corrigé p. 24).**
En mimant le raisonnement de la question précédente *[Extracteur : avec $\Psi_{\theta_0}(\theta_0+\varepsilon)<0$ et l'inclusion $\{\hat\theta_n>\theta_0+\varepsilon\}\subseteq\{\Psi_n(\theta_0+\varepsilon)\ge0\}$]*, on montre que $\lim_n\mathbb{P}_{n,\theta_0}(\hat\theta_n\le\theta_0+\varepsilon)=1$. On en déduit
$$\lim_n\mathbb{P}_{n,\theta_0}\big(\lvert\hat\theta_n-\theta_0\rvert>\varepsilon\big)=0$$
*[Extracteur : pour $\varepsilon\in\,]0,\delta[$, ce qui suffit]*, ce qui établit la consistance de la suite $\{\hat\theta_n,\ n\ge1\}$.

**Q5 — Normalité asymptotique (Corrigé p. 24).**
Vérifions les hypothèses du « théorème II-2.15 du cours » (= Poly ch.7, **Th. 1.4**, avec sa forme faible : il suffit que $\sqrt n\,\widehat\Psi_n(\hat\theta_n)\to0$ en probabilité), qui donne des conditions suffisantes pour la normalité asymptotique des Z-estimateurs. La consistance est acquise (Q4).
1. *Centrage* (hyp. (i)) : par Q2, $\Psi_{\theta_0}(\theta_0)=0$.
2. *Pente non nulle* (hyp. (iii)) : par H3 et (6),
$$\int\gamma'(x-\theta_0)f(x-\theta_0)\,\mathrm{Leb}(\mathrm{d}x)=\int\gamma'(x)f(x)\,\mathrm{Leb}(\mathrm{d}x)>0.$$
3. *Moment d'ordre 2* (hyp. (i)) : par (6),
$$\int\gamma^2(x-\theta_0)f(x-\theta_0)\,\mathrm{Leb}(\mathrm{d}x)=\int\gamma^2(x)f(x)\,\mathrm{Leb}(\mathrm{d}x)<\infty.$$
4. *Régularité et domination* (hyp. (ii)) : par H3, pour tout $x$, $\theta\mapsto\gamma(x-\theta)$ est $C^1$ ; en posant $g(x):=\sup_{\lvert\theta-\theta_0\rvert\le\delta}\lvert\gamma'(x-\theta)\rvert$, on a (**changement de variable** $x\to x+\theta_0$)
$$\int g(x)f(x-\theta_0)\,\mathrm{Leb}(\mathrm{d}x)=\int\sup_{\lvert\theta-\theta_0\rvert\le\delta}\lvert\gamma'(x+\theta_0-\theta)\rvert f(x)\,\mathrm{Leb}(\mathrm{d}x),$$
   et le terme de droite est fini par (7).
5. *Équation d'estimation* : puisque $\Psi_n(\hat\theta_n)=0$ pour tout $n$ (le corrigé écrit $\psi_n$), $\sqrt n\,\Psi_n(\hat\theta_n)\xrightarrow{\mathbb{P}_{n,\theta_0}\text{-prob}}0$. Toutes les hypothèses sont vérifiées.
6. *Conclusion.* Par application du théorème, la variance asymptotique est
$$V[\gamma]=\frac{\mathbb{Q}_{\theta_0}[\gamma^2(\cdot-\theta_0)]}{\big(\mathbb{Q}_{\theta_0}[\gamma'(\cdot-\theta_0)]\big)^2}=\frac{\mathbb{Q}_0[\gamma^2]}{\big(\mathbb{Q}_0[\gamma']\big)^2}=\frac{\int\gamma^2(x)f(x)\,\mathrm{Leb}(\mathrm{d}x)}{\big(\int\gamma'(x)f(x)\,\mathrm{Leb}(\mathrm{d}x)\big)^2},\qquad\sqrt n(\hat\theta_n-\theta_0)\overset{\mathbb{P}_{n,\theta_0}}{\Longrightarrow}\mathrm{N}(0,V[\gamma]).$$
   On remarque que la variance asymptotique **ne dépend pas de $\theta_0$** (invariance par translation). On la note $V[\gamma]$. (C'est la formule $v_\psi=\mathbb{E}[\psi^2]/(\mathbb{E}[\psi'])^2$ du Poly ch.7, Th. 1.4, avec $\psi'(\theta,x)=-\gamma'(x-\theta)$ ; le signe disparaît au carré.)

**Q6 — Cas gaussien $f=\mathrm{N}(0,\sigma^2)$ (Corrigé p. 25).**
- **(a) Cas $\gamma_\infty$.** $\gamma(x)=x$, $\gamma'=1$, donc $V[\gamma_\infty]=\sigma^2$ (variance de la moyenne empirique).
- **(b) Cas $\gamma_0$.** Les hypothèses sur $\gamma$ ne sont **pas** satisfaites pour cet exemple (discontinuité en 0). Néanmoins, on peut prouver (calcul **formel**) : la dérivée de $\mathrm{signe}(x)$ est $2\delta_0$. On a donc $\mathbb{E}_0[\gamma^2(X_1)]=1$ et $\mathbb{E}_0[\dot\gamma(X_1)]=\int_{\mathbb{R}}f(x)\,2\delta_0(\mathrm{d}x)=2f(0)=\sqrt{2/\pi\sigma^2}$. On en déduit
$$V[\gamma_0]=\frac{\pi\sigma^2}2.$$
- **(c) Cas $\gamma_k$.** ($\gamma_k^2(x)=(\lvert x\rvert\wedge k)^2$, $\gamma_k'=\mathbb{1}_{\{\lvert x\rvert<k\}}$ p.p. ; $\gamma_k$ continue, $C^1$ par morceaux : hypothèse allégée de Q5.)
$$V[\gamma_k]=\frac{\int_{\mathbb{R}}(\lvert x\rvert\wedge k)^2f(x)\,\mathrm{d}x}{\big(\int_{\mathbb{R}}\mathbb{1}_{\{\lvert x\rvert<k\}}f(x)\,\mathrm{d}x\big)^2}.$$
  On a
$$\lim_{k\to0}V[\gamma_k]=V[\gamma_0],\qquad\lim_{k\to\infty}V[\gamma_k]=V[\gamma_\infty].$$
  On peut vérifier numériquement que la fonction $k\mapsto V[\gamma_k]$ est **décroissante** (figure 4 (gauche)) : sans contamination, la moyenne ($k=\infty$) est la meilleure.

**Q7 — Cas contaminé $f\equiv(1-\varepsilon)\mathcal{N}(0,1)+\varepsilon\mathcal{N}(0,\tau^2)$ (Corrigé p. 25–26).**
- **(a) Cas $\gamma_\infty$.** Lorsque $\gamma(x)=x$,
$$\frac{\int_{\mathbb{R}}x^2f(x)\,\mathrm{d}x}{\big(\int_{\mathbb{R}}f(x)\,\mathrm{d}x\big)^2}=(1-\varepsilon)\times1+\varepsilon\times\tau^2,$$
  donc $V[\gamma_\infty]=(1-\varepsilon)+\varepsilon\tau^2$. En particulier, $\lim_{\tau\to+\infty}V[\gamma_\infty]=+\infty$.
- **(b) Cas $\gamma_k$.** On a
$$\lim_{\tau\to+\infty}V[\gamma_k]=\frac{(1-\varepsilon)\int_{\mathbb{R}}(\lvert x\rvert\wedge k)^2f_{\mathrm{N}(0,1)}(x)\,\mathrm{d}x+\varepsilon k^2}{(1-\varepsilon)^2\big(\int_{\mathbb{R}}\mathbb{1}_{\{\lvert x\rvert\le k\}}f(x)\,\mathrm{d}x\big)^2}<+\infty$$
  (au dénominateur, lire $f=f_{\mathrm{N}(0,1)}$, cf. §0.5), qui résulte du fait que (voir figure 7)
$$\lim_{\tau\to\infty}\frac1{\sqrt{2\pi}\tau}\int_{-a}^a\exp(-0.5x^2/\tau^2)\,\mathrm{d}x=0$$
  (la composante contaminée met une masse $\to0$ sur tout compact : sa contribution au numérateur tend vers $\varepsilon k^2$, au dénominateur vers 0).
- *Commentaire du corrigé.* L'estimation robuste ($k$ fini) du paramètre de décalage $\theta$ est plus intéressante que l'estimation « $L^1$ » ($k=+\infty$ ; lire $L^2$, cf. §0.5) si les données sont polluées par des données prenant de grandes valeurs, si les variables ne sont pas $L^1$, ··· On remarque que (pour $k$ fini) $\lim_{\varepsilon\to0^+}\lim_{\tau\to+\infty}V[\gamma_k]$ est la variance $V[\gamma_k]$ trouvée à la question précédente, ce qui assure que la variance asymptotique de l'estimateur robuste est **peu perturbée** en présence d'un faible nombre ($\varepsilon$ petit) de valeurs même très aberrantes ($\tau$ grand).
- *Figure 7 du corrigé* : « Densité gaussienne, pour différentes valeurs de l'écart-type $\tau$ » ($\tau=2,4,7,10$) : la densité s'aplatit (pic $\approx0.2$ pour $\tau=2$, $\approx0.04$ pour $\tau=10$).

#### Méthodes mobilisées
- **Monotonie** de $\Psi_n$ (somme de fonctions décroissantes en $\theta$) + limites en $\pm\infty$ ⇒ existence d'un point de changement de signe ; **théorème des valeurs intermédiaires** ; stricte monotonie ⇒ unicité.
- Identification de Z-estimateurs classiques : **médiane empirique** ($\gamma_0$), **moyenne empirique** ($\gamma_\infty$), estimateur de **Huber** ($\gamma_k$).
- **Imparité + symétrie** ⇒ centrage $\Psi_{\theta_0}(\theta_0)=0$ ; invariance par translation $\Psi_{\theta_0}(\theta)=\Psi_0(\theta-\theta_0)$.
- **Consistance par monotonie** (inclusion d'événements (8) + **LGN faible** en un seul point $\theta_0\pm\varepsilon$, sans convergence uniforme) — alternative au Th. 1.3 du Poly ch.7.
- **Théorème de normalité asymptotique des Z-estimateurs** (Poly ch.7, Th. 1.4) : vérification des hypothèses (centrage, moment d'ordre 2, $C^1$ + domination, pente non nulle).
- Calcul de variances asymptotiques « sandwich » $V[\gamma]=\int\gamma^2f/(\int\gamma'f)^2$ ; dérivée au sens des distributions ($\mathrm{signe}'=2\delta_0$, calcul formel) ; modèle de **contamination** et passage à la limite $\tau\to\infty$.

#### Pièges relevés / remarques du corrigé
- $\hat\theta_n$ défini par $\Psi_n(\hat\theta_n)=0$ peut **ne pas exister** (si $\gamma$ discontinue, ex. médiane) ou **ne pas être unique** ($\gamma_0$ avec $n$ pair ; $\gamma_k$) : d'où la définition généralisée de Q1 (changement de signe).
- **Sens de l'inclusion (8)** : comme $\Psi_n$ est **décroissante**, $\hat\theta_n<\theta_0-\varepsilon$ force $\Psi_n(\theta_0-\varepsilon)\le0$ ; alors que la limite $\Psi_{\theta_0}(\theta_0-\varepsilon)$ est $>0$ — contradiction asymptotique.
- La LGN ne demande que l'**intégrabilité** (H1), pas de moment d'ordre 2. *[Extracteur : la consistance vaut donc même pour des lois sans moment (Cauchy) avec $\gamma$ bornée.]*
- **H2** est indispensable pour l'unicité du zéro de $\Psi_{\theta_0}$. *[Extracteur : par exemple, pour $\gamma_0$, si $f$ est nulle sur un voisinage de 0, $\Psi_0$ est constante près de 0 et la médiane n'est pas identifiable.]*
- La normalité asymptotique de la médiane ($\gamma_0$) **ne relève pas** du Th. 1.4 (pas de dérivabilité) ; le calcul $V[\gamma_0]=\pi\sigma^2/2$ via $\mathrm{signe}'=2\delta_0$ est formel. *[Extracteur : il redonne la variance asymptotique $1/(4f(0)^2)$ de la médiane empirique, Poly ch.7 Ex. 1.9 / §4.8.]*
- La variance $V[\gamma]$ ne dépend pas de $\theta_0$.
- **Message principal (robustesse)** : sans contamination, $\gamma_\infty$ (moyenne) est optimale (EMV gaussien), mais une **fonction d'influence bornée** ($\gamma_k$, $k<\infty$) perd très peu ($V[\gamma_k]\to1$ vite quand $k$ croît) ; avec contamination, $V[\gamma_\infty]$ explose ($\varepsilon\tau^2$) tandis que $V[\gamma_k]$ reste bornée uniformément en $\tau$.
- Coquilles : $\psi_n$ pour $\Psi_n$, signe de la dérivée, « $L^1$ » pour $k=+\infty$, $f$ au dénominateur de Q7(b) (§0.5).

#### Résultats numériques
- $V[\gamma_\infty]=\sigma^2$ ; $V[\gamma_0]=\pi\sigma^2/2\approx1.571\,\sigma^2$ ; efficacité relative de la médiane par rapport à la moyenne dans le cas gaussien : $2/\pi\approx0.637$ *[Extracteur pour le rapport]*.
- *[Extracteur — calcul numérique de $V[\gamma_k]$, $\sigma^2=1$, cohérent avec la Figure 4 gauche]* : $k=0.5$ : $\approx1.263$ ; $k=1$ : $\approx1.107$ ; $k=1.345$ : $\approx1.053$ ; $k=1.5$ : $\approx1.037$ ; $k=2$ : $\approx1.010$ ; $k=3$ : $\approx1.0004$.
- *[Extracteur — cas contaminé $\varepsilon=0.01$, $\tau=10$, cohérent avec la Figure 4 droite]* : $V[\gamma_\infty]=0.99+0.01\times100=1.99$ ; $V[\gamma_0]=1/(4f(0)^2)\approx1.599$ ; $V[\gamma_k]$ : $k=0.5$ : $\approx1.290$ ; $k=1$ : $\approx1.137$ ; $k=1.5$ : $\approx1.073$ ; $k=2$ : $\approx1.057$ (minimum, vers $k\approx2$) ; $k=3$ : $\approx1.083$ ; $k=5$ : $\approx1.190$ ; $k=10$ : $\approx1.516$.

---

## 2. Synthèse des méthodes de la PC

| Méthode | Exercices où elle apparaît | Résultat du poly utilisé |
|---|---|---|
| TCL i.i.d. (Bernoulli, moyenne, $Y_i^2$, score) | Exo 1 (Q1, Q3(b)), Exo 2 (Q4), Exo 3 (Q2) | Poly ch.6, Th. 1.6 |
| Loi faible des grands nombres (intégrabilité seule) | Exo 1 (Q1(b), Q3(b)), Exo 2 (Q4 sol. 1), Exo 4 (Q2), Exo 5 (Q3) | Poly ch.6, Th. 1.2 ; Poly ch.7, Th. 2.1 |
| Lemme de Slutsky (somme, produit, quotient) | Exo 1 (Q1(b), Q2, Q3(b), Q4), Exo 2 (Q3–Q5), Exo 3 (Q3), Exo 4 (Q2) | Poly ch.6, Lemme 1.1 |
| Transformation continue / continuité en probabilité | Exo 1 (Q1(b), Q3(b) avec $\exp$, Q3(c) avec $u\mapsto\mathbb{1}_{u\le y}u$), Exo 3 (Q3) | Poly ch.6, Th. 1.4 (cas général admis, « IV-5.30 ») et Th. 2.1 |
| Portmanteau (convergence en loi ⇒ probabilités) | Exo 1 (Q1, Q2, Q4), Exo 2 (Q5) | Poly ch.6, Th. 1.3 |
| Seuil auxiliaire $C$ / $M$, double passage à la limite (consistance d'un test) | Exo 1 (Q1(a), Q1(b) méthode 1) | Poly ch.6, Ex. 1.14, Déf. 1.11 |
| Niveau asymptotique d'une suite de tests | Exo 1 (Q1, Q2) | Poly ch.6, Déf. 1.10 |
| Convergence dominée + continuité uniforme sur un compact | Exo 1 (Q3(a)) | domination (R-2) du Cadre 1.1 (Poly ch.7) ; cf. Lemme 2.1 et éq. (4) du Poly ch.7 |
| Taylor avec reste intégral (ordre 2 pour la log-vraisemblance ; ordre 1 dans le Th. 1.4) | Exo 1 (Q3(b)) ; implicitement Exo 5 (Q5) | Poly ch.7, Lemme 2.2 |
| Identités du score : $\mathbb{E}[\dot\ell]=0$, $I=\mathbb{E}[\dot\ell^2]=-\mathbb{E}[\ddot\ell]$ | Exo 1 (Q3(b)), Exo 2 (Q4 sol. 2), Exo 3 (vérif. *[Extracteur]*) | Poly ch.3, Prop. 1.2 ; Poly ch.7, éq. (10) |
| Changement de mesure par rapport de vraisemblance ; contiguïté | Exo 1 (Q3(c)–(d)) | hors poly actuel |
| Théorème de Lindeberg-Feller (tableaux triangulaires) | Exo 1 (Q5) | hors poly actuel (« IV.5-41 ») |
| Pente de Pitman $\mu'(\theta_0)/\sigma$, puissance locale $1-\Phi(z_{1-\alpha}-h\mu'/\sigma)$ | Exo 1 (Q4, Q6) | hors poly (annoncé en Poly ch.7, §1.8) |
| Calcul d'EMV par annulation du score + concavité / étude de signe | Exo 2 (Q1), Exo 3 (Q1) | Poly ch.2, Déf. 1.4, Déf. 1.6, Méthode 1.2 |
| EMV sous contrainte (maximum au bord) | Exo 4 (Q1) | Poly ch.2, Déf. 1.4 |
| Biais, risque quadratique, décomposition biais-variance | Exo 2 (Q2) | Poly ch.3, Déf. 1.1, Déf. 1.3, Prop. 1.1 |
| Additivité des lois Gamma, moments inverses | Exo 2 (Q2) | rappel de l'énoncé |
| Méthode-δ | Exo 2 (Q4 sol. 3), Exo 3 (Q2) | Poly ch.6, Th. 1.7 |
| Normalité asymptotique de l'EMV via l'information de Fisher | Exo 2 (Q4 sol. 2) | Poly ch.7, Th. 1.6 (et Th. 1.7 pour l'optimalité) ; Déf. 1.4 |
| Intervalle de confiance asymptotique par pivot + plug-in (Slutsky) | Exo 2 (Q5), Exo 3 (Q3) | Poly ch.6, Méthode 1.1, Déf. 1.8 |
| Densité d'une loi image (fonction muette, changement de variable) | Exo 3 (Q1) | Outils du Poly ch.1 |
| Non-validité de la normalité asymptotique au bord de $\Theta$ | Exo 4 (Q3) | Poly ch.7, remarque (a) après le Th. 1.4 ; §4.9 |
| Existence / unicité d'un Z-estimateur par monotonie et TVI | Exo 5 (Q1) | Poly ch.7, Déf. 1.2, Ex. 1.4 |
| Consistance d'un Z-estimateur par monotonie (LGN ponctuelle) | Exo 5 (Q3–Q4) | Poly ch.7, Th. 2.1 (alternative au Th. 1.3) ; §4.9 point 3 |
| Normalité asymptotique d'un Z-estimateur, variance sandwich $\mathbb{E}[\psi^2]/(\mathbb{E}[\psi'])^2$ | Exo 5 (Q5–Q7) | Poly ch.7, Th. 1.4 (« II-2.15 ») |
| Robustesse : fonctions d'influence bornées, modèle de contamination | Exo 5 (Q6–Q7) | Poly ch.7, Ex. 1.4 |

---

## 3. Idées de reformulation en exercices interactifs sans saisie de formule

### Exercice 1 — Signe contre Student, approche de Pitman
1. **QCM (pentes).** « Pour le test du signe $\phi_{n,1}$ dans le modèle de translation, la pente $\mu'(\theta_0)/\sigma$ vaut : (A) $q(0)$ ; (B) $2q(0)$ ✔ ; (C) $1/\sigma_q$ ; (D) $q(0)/\sigma_q$. » Variante pour Student : réponse $1/\sigma_q$. Puis **associer** chaque loi ($\mathrm{N}(0,1)$ ; mélange bimodal avec $a/\tau$ grand ; mélange d'échelle avec $\tau=4$) au test préférable (Student ; Student ; signe).
2. **Preuve à ordonner (contiguïté, Q3(c)).** Étapes mélangées : « écrire $\mathbb{P}_{n,\theta_n}(A_n)=\mathbb{E}_{n,\theta_0}[\mathbb{1}_{A_n}L_n]$ » ; « couper selon $\{L_n\le y\}$ et $\{L_n>y\}$ » ; « majorer par $y\,\mathbb{P}_{n,\theta_0}(A_n)+\mathbb{E}_{n,\theta_0}[\mathbb{1}_{L_n>y}L_n]$ » ; « utiliser $\mathbb{E}_{n,\theta_0}[L_n]=1$ » ; « passer à la limite par transformation continue, $\mathbb{E}[\mathbb{1}_{W\le y}W]$ » ; « choisir $y$ tel que $\mathbb{E}[\mathbb{1}_{W\le y}W]\ge1-\varepsilon$ grâce à $\mathbb{E}[W]=1$ » ; « conclure $\limsup\le\varepsilon$ ». Distracteur : « appliquer le TCL sous $\mathbb{P}_{n,\theta_n}$ ».
3. **Trouver l'erreur (consistance, Q1).** Raisonnement erroné proposé : « sous $H_1$, $2M_n\Rightarrow\mathrm{N}(0,1)$ donc $\mathbb{P}_{n,\theta}(2M_n>z_{1-\alpha})\to\alpha$ ». L'erreur : sous $\mathbb{P}_{n,\theta}$, $\theta>\theta_0$, le centrage est $1-F(\theta_0-\theta)\ne1/2$ et $M_n$ dérive vers $+\infty$ ; il faut le seuil auxiliaire $C$.
4. **Application numérique / vrai-faux.** « Dans le cas gaussien, pour une même puissance locale, le test du signe demande environ (A) 20 % ; (B) 57 % ✔ ; (C) 100 % d'observations en plus » ($\pi/2\approx1.57$). Vrai/faux : « Deux suites de tests consistantes de même niveau asymptotique ont même puissance locale de Pitman » (Faux). « La puissance locale limite vaut $1/2$ quand $h\mu'(\theta_0)/\sigma=z_{1-\alpha}$ » (Vrai).

### Exercice 2 — Gamma$(2,\theta)$
1. **Associer** chacune des trois preuves de la normalité asymptotique à son outil-clé : Solution 1 ↔ Slutsky (LGN × TCL) ; Solution 2 ↔ Th. 1.6 et $\mathbb{I}(\theta)=2/\theta^2$ ; Solution 3 ↔ méthode-δ avec $g(x)=2/x$, $g'(2/\theta)=-\theta^2/2$.
2. **QCM + vrai/faux (biais).** « Le biais de $\hat\theta_n=2/\bar X_n$ est : (A) $0$ ; (B) $\theta/(2n-1)$ ✔ ; (C) $-\theta/(2n-1)$ ; (D) $2\theta/n$. » Vrai/faux : « $\hat\theta_n$ est biaisé mais asymptotiquement sans biais » (Vrai) ; « $\mathbb{E}[\hat\theta_n]=2/\mathbb{E}[\bar X_n]$ » (Faux, Jensen).
3. **Application numérique (IC).** « $n=50$, $\bar X_n=0.8$, $\alpha=5\,\%$ : l'IC asymptotique $\hat\theta_n\pm z_{0.975}\hat\theta_n/\sqrt{2n}$ est : (A) $[2.01;2.99]$ ✔ ; (B) $[2.15;2.85]$ ; (C) $[1.52;3.48]$. » Variante « étape suivante » : après avoir écrit le pivot avec $\theta/\sqrt2$, quelle justification permet de remplacer $\theta$ par $\hat\theta_n$ ? (Slutsky + consistance.)

### Exercice 3 — Log-normale $(\theta,\theta)$
1. **Étape suivante à choisir.** Après « $\sqrt n(\bar T_n-(\theta+\theta^2))\Rightarrow\mathrm{N}(0,2\theta^2(1+2\theta))$ », que faire ? (A) Slutsky ; (B) méthode-δ avec $\varphi(z)=\sqrt{1/4+z}$ ✔ ; (C) LGN ; (D) Lindeberg. Puis QCM : $\varphi'(\theta+\theta^2)$ vaut $1/(1+2\theta)$.
2. **QCM (EMV).** « L'EMV de $\theta$ est : (A) $\bar Y_n$ ; (B) $\frac1n\sum Y_i^2$ ; (C) $-\frac12+\sqrt{\frac14+\frac1n\sum Y_i^2}$ ✔ ; (D) $\sqrt{\frac1n\sum Y_i^2}$. » Vrai/faux : « l'EMV a une variance asymptotique plus petite que $\bar Y_n$ » (Vrai : $2\theta^2/(1+2\theta)<\theta$).
3. **Application numérique.** « $\theta=1$ : la variance asymptotique de l'EMV vaut (A) $1$ ; (B) $2/3$ ✔ ; (C) $6$ ; (D) $1/2$. » Et « $\bar T_n=2$ donne $\hat\theta_n=$ (A) $1$ ✔ ; (B) $\sqrt2$ ; (C) $1.5$. »

### Exercice 4 — $\mathrm{N}(\theta,1)$, $\Theta=\mathbb{R}_+$
1. **QCM (loi limite en $\theta=0$).** (A) $\mathrm{N}(0,1)$ ; (B) loi de $\lvert Z\rvert$ ; (C) loi de $\max(Z,0)$ ✔ ; (D) $\delta_0$. Puis « quelle est la masse en 0 ? » (A) 0 ; (B) 1/4 ; (C) 1/2 ✔.
2. **Vrai/faux (hypothèses du Th. 1.4).** « Le Th. 1.4 s'applique en tout $\theta\in\Theta$ » (Faux : seulement aux points intérieurs) ; « pour $\theta>0$, $\sqrt n\bar X_n\mathbb{1}_{\{\bar X_n<0\}}\to0$ en probabilité » (Vrai) ; « en $\theta=0$, la loi limite est centrée » (Faux, moyenne $1/\sqrt{2\pi}$).
3. **Application numérique.** « $\theta=0.1$, $n=100$ : $\mathbb{P}(\hat\theta_n=0)\approx$ (A) $0.5$ ; (B) $0.16$ ✔ ; (C) $0.02$. »

### Exercice 5 — Z-estimateurs robustes
1. **Associer** $\gamma_0$, $\gamma_\infty$, $\gamma_k$ à : l'estimateur (médiane / moyenne / Huber), l'existence d'une racine exacte (non garantie / oui / oui), l'unicité (non pour $n$ pair / oui / non garantie), la variance gaussienne ($\pi\sigma^2/2$ / $\sigma^2$ / entre les deux).
2. **Preuve à ordonner (consistance, Q3).** Étapes : « $\Psi_n$ décroissante donc $\{\hat\theta_n<\theta_0-\varepsilon\}\subseteq\{\Psi_n(\theta_0-\varepsilon)\le0\}$ » ; « H2 donne $\Psi_{\theta_0}(\theta_0-\varepsilon)>0$ » ; « LGN : $\Psi_n(\theta_0-\varepsilon)\to\Psi_{\theta_0}(\theta_0-\varepsilon)$ en probabilité » ; « donc $\mathbb{P}(\Psi_n(\theta_0-\varepsilon)>\Psi_{\theta_0}(\theta_0-\varepsilon)/2)\to1$ » ; « décomposer selon $\hat\theta_n\gtrless\theta_0-\varepsilon$ et conclure ». **Trouver l'erreur** : version avec l'inclusion inversée $\{\hat\theta_n<\theta_0-\varepsilon\}\subseteq\{\Psi_n(\theta_0-\varepsilon)\ge0\}$.
3. **Application numérique / QCM (robustesse).** Contamination $\varepsilon=0.01$, $\tau=10$ : « $V[\gamma_\infty]$ vaut (A) $1.01$ ; (B) $1.99$ ✔ ; (C) $100$ » ; « parmi $k\in\{0.5;2;10\}$, quel $k$ minimise $V[\gamma_k]$ ? » ($k=2$, $\approx1.06$). Vrai/faux : « sans contamination, $k\mapsto V[\gamma_k]$ est décroissante » (Vrai) ; « $V[\gamma]$ dépend de $\theta_0$ » (Faux).
