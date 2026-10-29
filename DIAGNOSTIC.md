# Diagnostic des annales — APM-41033

> **Sources dépouillées intégralement** : `Année 2025.txt` (Examen 2025 APM 41033, sans corrigé, format actuel) et `CCfinal.txt` (Contrôle de connaissances MAP433, promotion 2022, avec solutions). Têtes de chapitre et « programme des exercices » des 9 chapitres du poly (fichiers `S{1..9}_APM41033-Week{1..9}-Cours.txt`) et énoncés des 9 PC (`S{1..9}_APM-41033-EP-PC{1..9}-enonce.txt`) lus pour la correspondance. Les PDF ont été ouverts pour vérifier les formules ambiguës (densité de Weibull du CC 2022, énoncés 2025 Ex. 2 Q8–Q9 et Ex. 3 Q4–Q9).
>
> **Conventions de citation** : « Poly ch.N, Déf./Thm/Prop./Ex. N.M » renvoie à la numérotation **interne** du chapitre N du poly (chaque chapitre recommence sa numérotation à 1.1). « PCk Ex. j » renvoie à l'exercice j de la feuille de la semaine k.
>
> **Notations du poly reproduites** : modèle $(\mathsf{Z},\mathcal{Z},\{P_\theta,\theta\in\Theta\})$ ; $n$-échantillon d'un modèle $(\mathsf{X},\mathcal{X},\{Q_\theta\})$, $P_{n,\theta}=Q_\theta^{\otimes n}$ ; $\mathbb{E}_\theta$, $\mathrm{Var}_\theta$ ; vraisemblance $L_n(\vartheta)$, log-vraisemblance normalisée $\ell_n(\vartheta)=\tfrac1n\log L_n(\vartheta)$ ; score $S(\theta,z)=\nabla_\theta\ell(\theta,z)$ avec $\ell(\theta,z)=\log p_\theta(z)$ ; information de Fisher $I(\theta)$ ; fonction puissance $\beta_\phi(\theta)=\mathbb{E}_\theta[\phi(Z)]$ ; taille $\alpha(\phi)=\sup_{\Theta_0}\beta_\phi$ ; $p$-valeur $\hat\alpha(Z)$ ; convergence en loi $\overset{P_{n,\theta}}{\Longrightarrow}$, en probabilité $\overset{P_{n,\theta}-\mathrm{prob}}{\longrightarrow}$ ; $z_\beta$, $\chi^2_\beta(k)$ : quantiles d'ordre $\beta$ de $\mathcal N(0,1)$ et de $\chi^2(k)$. **Convention Gamma du poly** : $\mathrm{Gamma}(p,\lambda)$ a pour densité $\frac{\lambda^p}{\Gamma(p)}x^{p-1}e^{-\lambda x}$ (paramètre d'**intensité** $\lambda$, $\mathbb{E}=p/\lambda$) ; $\chi^2(\nu)=\mathrm{Gamma}(\nu/2,1/2)$ ; $\mathcal E(\lambda)=\mathrm{Gamma}(1,\lambda)$. L'examen 2025 note $\Gamma(a,b)$ avec la **même** convention (intensité $b$). Le CC 2022 utilise la convention **d'échelle** (voir §6).

---

## 1. Format et durée de l'examen

### 1.1 Structure exacte de l'Examen 2025 (format actuel)

| Exercice | Nature | Durée indicative (sujet) | Nb de questions | Chapitres |
|---|---|---|---|---|
| **Ex. 1** | Questions de cours sur le modèle exponentiel $p_\theta(x)=\theta e^{-\theta x}$ | « ne pas passer plus de ~20 min » | 3 (dont Q3 en 3 sous-questions) | ch.3 (Cramér-Rao), ch.5 (Neyman-Pearson), ch.4 (p-valeur) |
| **Ex. 2** | Problème : statistique de la loi log-normale | ~65–70 min | 10 (Q9 en 3 sous-questions) | ch.1, 2, 3, 4, 6, 7 |
| **Ex. 3** | Problème : apprentissage statistique (classifieur de Bayes, plug-in, $k$ plus proches voisins) | ~55–60 min | 9 | ch.8, ch.9 (+ Exploration Numérique) |
| **Ex. 4** | QCM / questions à réponses courtes sur les DM et EN (régression linéaire simple et multiple, deux échantillons gaussiens, tests multiples, ACP, LDA/QDA/logistique) | « 15–20 min » | 12 (7 QCM à réponse unique + 5 réponses courtes) | PC1 Ex.4, PC2 Ex.1, PC3 Ex.2, PC4 Ex.5, ch.8 §1.3, DM1, EN1–EN3 |

- **Durée** : 3 h. Quatre exercices indépendants.
- **Consignes** : « Toutes les réponses doivent être justifiées, sauf dans l'exercice 4 » ; dans l'Ex. 4, réponses libres en 1–2 phrases (~20 mots par phrase), **ne pas rendre le sujet**, répondre sur la copie « Q0 – (a) », **une seule réponse valide par QCM, toute réponse erronée au QCM rapporte $-0{,}5$** (donc : ne pas répondre au hasard). Si erreur dans le sujet : l'indiquer et poursuivre.
- **Rappels fournis** (page 2 du sujet) : loi $\Gamma(a,b)$ (intensité) avec espérance $a/b$, variance $a/b^2$, additivité ; $\chi^2(p)=\Gamma(p/2,1/2)$ ; loi Beta et lien $\mathbb P(\mathrm{Bin}(n,p)\ge k)=\mathbb P(\mathrm{Beta}(k,n-k+1)\le p)$ ; transformée de Laplace $\mathbb E[e^{t\xi}]=e^{t^2/2}$ ; $\mathrm{Var}(\xi^2)=2$ ; **TCL pour le quantile empirique** $\sqrt n(\hat q_\alpha-q_\alpha)\overset{d}{\to}\mathcal N\big(0,\tfrac{\alpha(1-\alpha)}{f(q_\alpha)^2}\big)$ ; **TCL multivarié**. Ces rappels sont des indices : chacun sert dans une question précise (voir §2).
- **Barème** : absent du sujet. Estimation raisonnée ci-dessous (sur 20) : Ex. 1 ≈ 4 pts, Ex. 2 ≈ 7 pts, Ex. 3 ≈ 6 pts, Ex. 4 ≈ 3 pts (12 items à 0,25 pt) — cohérent avec les durées indicatives (20 min / 65 min / 55 min / 20 min).

**Répartition du temps recommandée (3 h = 180 min)** : lecture complète du sujet et des rappels 5 min → Ex. 1 : 20 min → Ex. 4 : 15 min (le faire **tôt**, c'est du rendement sûr et il demande peu de rédaction) → Ex. 2 : 65 min → Ex. 3 : 60 min → relecture 15 min. Dans les problèmes, les questions sont très largement indépendantes (les résultats à démontrer sont donnés) : **admettre et avancer** plutôt que bloquer.

### 1.2 Différences avec le CC MAP433 (promotion 2022)

| | CC MAP433 2022 | Examen APM 41033 2025 |
|---|---|---|
| Structure | 5 exercices « problèmes » (test UPP Weibull ; estimateurs de $\mu^2$ ; exponentielle translatée et statistiques d'ordre ; régression linéaire simple / région de confiance de Fieller ; 1-plus-proche-voisin) | 1 exercice de cours + 2 problèmes + 1 QCM DM/EN |
| Questions de cours explicites | aucune (intégrées aux problèmes) | Ex. 1 entier (CR, Neyman-Pearson, p-valeur) |
| QCM | aucun | Ex. 4 avec points négatifs |
| Apprentissage statistique | Ex. 5 (borne de Cover-Hart $R^\star\le\lim R(\hat h_n)\le 2R^\star(1-R^\star)$) | Ex. 3, plus long et plus proche du poly (Thm 1.2 ch.8, borne plug-in, $k$-NN, compromis biais/variance, fléau de la dimension) |
| Convention Gamma | **échelle** ($\mathbb E=p\lambda$), explicitement « différente du polycopié » | **intensité** (celle du poly) |
| Références au poly | « théorème IV.3.24 », « corollaire IV.3.9 » (ancien poly MAP433 : Gosset, Cochran) | poly APM 41033 (Thm 1.3 et 1.1 du ch.1) |
| Corrigé | fourni (avec quelques lacunes : Ex. 2 Q3 risque et Q4 non traités, Ex. 4 Q1 vide, décalages de numérotation) | non fourni |
| Durée | non indiquée dans le document | 3 h |

Le **contenu mathématique est très proche** : mêmes modèles fétiches (exponentiel/Gamma, gaussien, régression linéaire gaussienne, statistiques d'ordre), mêmes outils (Gosset/Cochran, pivot, Slutsky, méthode-δ, Neyman-Pearson, RVM). Ce qui change : l'examen 2025 teste **explicitement le cours** et le **vocabulaire** (interprétation de la p-valeur), et donne plus de poids à l'**apprentissage statistique** (ch.8–9) et aux **DM/EN**.

---

## 2. Inventaire exhaustif des exercices d'annales

Chaque question : énoncé résumé → chapitre(s) du poly → méthode attendue → difficulté (★ facile, ★★ standard, ★★★ difficile) → poids estimé → corrigé (officiel pour le CC 2022, **non officiel et rédigé par nos soins** pour 2025).

### 2.A — Examen 2025 (sans corrigé officiel ; solutions proposées, fidèles au poly)

#### Exercice 1 : Questions de cours — modèle exponentiel (≈ 4 pts)

Modèle : $n$-échantillon de $\big(\mathbb R_+,\mathcal B(\mathbb R_+),\{p_\theta\cdot\mathrm{Leb},\theta>0\}\big)$, $p_\theta(x)=\theta e^{-\theta x}$, régularité admise.

**Q1. Borne de Cramér-Rao pour un estimateur régulier sans biais de $\theta$.** — ch.3 (Ex. 1.13, Prop. 1.2 (iii), Cor. 1.1 et 1.3, Déf. 1.3 + Prop. 1.1). ★. ≈ 1 pt.
*Méthode* : calcul du score et de l'information de Fisher d'une observation, additivité, énoncé du corollaire $n$-échantillon, puis « sans biais ⇒ risque quadratique = variance ».
*Solution* : $\ell(\theta,x)=\log\theta-\theta x$, score $S(\theta,x)=\tfrac1\theta-x$, d'espérance nulle ($\mathbb E_\theta[X]=1/\theta$). $I_1(\theta)=\mathrm{Var}_\theta(S)=\mathrm{Var}_\theta(X)=1/\theta^2$ (ou $-\mathbb E_\theta[\partial^2_\theta\ell]=1/\theta^2$). Par additivité (Prop. 1.2 (iii)) $I_n(\theta)=n/\theta^2$. Par le Corollaire 1.3 (avec $g=\mathrm{Id}$, $g'=1$) : pour tout estimateur $T$ régulier sans biais de $\theta$,
$$\mathbb E_\theta\big[(T-\theta)^2\big]=\mathrm{Var}_\theta(T)\ \ge\ \frac{1}{I_n(\theta)}=\frac{\theta^2}{n}.$$
*Remarque à placer* : l'EMV $1/\bar X_n$ est biaisé ($\mathbb E_\theta[1/\bar X_n]=\tfrac{n}{n-1}\theta$, Maths ch.1), la borne ne s'applique donc pas à lui directement ; la variance asymptotique $\theta^2$ de $\sqrt n(\hat\theta_n-\theta)$ (ch.6 Ex. 1.7) atteint la borne asymptotiquement (ch.7 Thm 1.7).

**Q2. Test de Neyman-Pearson de niveau $\alpha$ de $H_0:\theta=\theta_0$ contre $H_1:\theta=\theta_1$, $\theta_1>\theta_0$ ; seuil via un quantile Gamma.** — ch.5 (Déf. 1.3, Cadre 1.1, Thm 1.1 ; Méthode « marche à suivre » §1.6) ; ch.1 Maths (additivité Gamma). ★★. ≈ 1,5 pt.
*Méthode* : écrire le rapport de vraisemblance, montrer qu'il est **décroissant** en $T(Z)=\sum X_i$, région de rejet $\{T<d_\alpha\}$, loi de $T$ sous $P_{\theta_0}$ par additivité, seuil par quantile.
*Solution* : $r(z)=\dfrac{p_{\theta_1}(z)}{p_{\theta_0}(z)}=\Big(\dfrac{\theta_1}{\theta_0}\Big)^n\exp\big(-(\theta_1-\theta_0)\textstyle\sum_i x_i\big)$, fonction strictement décroissante de $T(z)=\sum_i x_i$ car $\theta_1>\theta_0$. Le rapport n'a pas d'atome ($T(Z)$ est à densité), donc le Thm 1.1 s'applique : $\{r(Z)>c_\alpha\}=\{T(Z)<d_\alpha\}$ et le test de Neyman-Pearson est
$$\phi^\star(Z)=\mathbf 1\{T(Z)<d_\alpha\},\qquad P_{\theta_0}(T(Z)<d_\alpha)=\alpha .$$
Sous $P_{\theta_0}$, $X_i\sim\mathcal E(\theta_0)=\Gamma(1,\theta_0)$, donc par additivité $T(Z)\sim\Gamma(n,\theta_0)$, et $\theta_0T(Z)\sim\Gamma(n,1)$ (équivalent : $2\theta_0T(Z)\sim\Gamma(n,1/2)=\chi^2(2n)$). En notant $g_{n,\alpha}$ le quantile d'ordre $\alpha$ de $\Gamma(n,1)$ :
$$d_\alpha=\frac{g_{n,\alpha}}{\theta_0}=\frac{\chi^2_\alpha(2n)}{2\theta_0}.$$
Le test est de taille exactement $\alpha$ et UPP($\alpha$) (Thm 1.1 (ii)) ; comme le seuil ne dépend pas de $\theta_1$, il est UPP($\alpha$) pour $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ (famille à RVM décroissant en $T$, Thm 1.4 ch.5).
*Piège* : ne pas rejeter pour les **grandes** valeurs de $\sum X_i$ : une grande intensité $\theta$ donne de **petites** observations.

**Q3(a). Définition de la p-valeur et expression ici.** — ch.4 Déf. 2.4, Prop. 2.1 ; ch.5 §1.10. ★★. ≈ 0,75 pt.
*Solution* : pour une famille de tests purs $\{\phi_\alpha\}_{\alpha\in[0,1]}$ (a) de niveau $\alpha$ et (b) à régions de rejet emboîtées $R_\alpha\subset R_{\alpha'}$ pour $\alpha\le\alpha'$, la p-valeur est $\hat\alpha(Z):=\inf\{\alpha\in[0,1]:Z\in R_\alpha\}$ : le plus petit niveau auquel on rejette $H_0$ au vu de $Z$. Ici $R_\alpha=\{\theta_0T(Z)<g_{n,\alpha}\}$ ; $\alpha\mapsto g_{n,\alpha}$ est croissante donc (b) est vérifiée, et
$$\hat\alpha(Z)=\inf\{\alpha:\ g_{n,\alpha}>\theta_0T(Z)\}=F_{\Gamma(n,1)}\big(\theta_0T(Z)\big)=P_{\theta_0}\big(T(Z')\le T(Z)\big)=F_{\chi^2(2n)}\big(2\theta_0\textstyle\sum_iX_i\big),$$
soit la probabilité, **sous $H_0$**, d'observer une statistique au moins aussi défavorable à $H_0$ (ici : aussi petite) que celle observée.

**Q3(b). Intérêt et interprétation ; que signifie une p-valeur de 3 % ?** — ch.4 §2.7 (« Comment s'en servir »), Prop. 2.2. ★. ≈ 0,5 pt.
*Solution* : la p-valeur résume en un nombre la décision du test à **tous** les niveaux : on rejette $H_0$ pour tout $\alpha>\hat\alpha(Z)$ et on échoue à rejeter pour tout $\alpha<\hat\alpha(Z)$ ; c'est pourquoi on la publie plutôt que la seule décision. Une p-valeur de 3 % signifie : on rejette $H_0$ au niveau 5 % mais pas au niveau 1 % ; sous $H_0$, une observation au moins aussi extrême que celle obtenue ne se produirait que dans 3 % des répétitions. Sous $H_0$ (niveau atteint), $\hat\alpha(Z)\sim\mathcal U([0,1])$ (Prop. 2.2) ; sous $H_1$ elle se concentre près de 0. Plus elle est petite, plus les données sont défavorables à $H_0$.

**Q3(c). Est-ce « la probabilité d'être sous $\Theta_0$ » ? sous $\Theta_1$ ?** — ch.4 §2.8 point 1 ; ch.5 §1.10. ★. ≈ 0,25 pt.
*Solution* : **Ni l'un ni l'autre.** Le paramètre $\theta$ est déterministe : « $P(\theta\in\Theta_0)$ » n'a pas de sens dans ce cadre (fréquentiste). La p-valeur est une probabilité **portant sur l'observation**, calculée **sous $H_0$** (sous $P_{\theta_0}$) ; ce n'est pas non plus $1-$ probabilité de $\Theta_1$, ni la probabilité de se tromper en rejetant.

#### Exercice 2 : Statistique pour la loi log-normale (≈ 7 pts)

Modèle : $n$-échantillon de $\big(\mathbb R,\mathcal B(\mathbb R),\{LN(\mu,\sigma^2),\theta=(\mu,\sigma^2)\in\Theta=\mathbb R\times\mathbb R_+^*\}\big)$, $X=e^{\mu+\sigma\xi}$, $\xi\sim\mathcal N(0,1)$, régularité admise. Notation : $Y_i:=\ln X_i\sim\mathcal N(\mu,\sigma^2)$ i.i.d. (modèle induit, ch.1 Déf. 5).

**Q1. Support $S$ et densité $p_{\mu,\sigma}(x)=\dfrac{e^{-(\ln x-\mu)^2/2\sigma^2}}{x\sqrt{2\pi\sigma^2}}\mathbf 1_S(x)$.** — ch.1 (théorème de transfert / fonction muette, Outils) ; identique à PC7 Ex. 3 Q1. ★. ≈ 0,5 pt.
*Méthode* : fonction muette + changement de variable $x=e^y$.
*Solution* : $S=\,]0,+\infty[$ (exponentielle d'un réel). Pour $h$ mesurable bornée, $\mathbb E[h(X)]=\mathbb E[h(e^{\mu+\sigma\xi})]=\int_{\mathbb R}h(e^y)\frac{1}{\sqrt{2\pi\sigma^2}}e^{-(y-\mu)^2/2\sigma^2}\,dy$ ; $y=\ln x$, $dy=dx/x$ : $=\int_0^{+\infty}h(x)\frac{1}{x\sqrt{2\pi\sigma^2}}e^{-(\ln x-\mu)^2/2\sigma^2}\,dx$, d'où la densité par identification (vraie pour toute $h$).

**Q2. EMV $(\hat\mu_{ML},\widehat{\sigma^2}_{ML})$.** — ch.2 Déf. 1.4–1.6, Ex. 1.10 (gaussienne), Prop. 1.2 (invariance) ; PC7 Ex. 3. ★★. ≈ 0,75 pt.
*Méthode* : log-vraisemblance, remarquer que le facteur $\prod X_i^{-1}$ ne dépend pas de $\theta$, se ramener à l'EMV gaussien des $Y_i$ (annulation du score + vérification du maximum global comme dans l'Ex. 1.10).
*Solution* : $\log L_n(\mu,\sigma^2)=-\sum_i\ln X_i-\frac n2\ln(2\pi\sigma^2)-\frac{1}{2\sigma^2}\sum_i(Y_i-\mu)^2$. Le premier terme est constant en $\theta$ ; le reste est la log-vraisemblance du $n$-échantillon gaussien $(Y_i)$. D'après l'Ex. 1.10 ch.2 (équations de vraisemblance $\sum(Y_i-m)=0$, $-\frac1{2v}+\frac{1}{2v^2n}\sum(Y_i-m)^2=0$ ; stricte concavité en $m$ à $v$ fixé, puis étude de $v\mapsto-\frac12\log v-\frac{S}{2v}$) :
$$\hat\mu_{ML}=\bar Y_n=\frac1n\sum_{i=1}^n\ln X_i,\qquad \widehat{\sigma^2}_{ML}=\frac1n\sum_{i=1}^n(\ln X_i-\bar Y_n)^2=\frac{n-1}{n}S_n^2,$$
avec $S_n^2=\frac1{n-1}\sum(Y_i-\bar Y_n)^2$, défini et unique dès que les $Y_i$ ne sont pas tous égaux ($P_\theta$-p.s. pour $n\ge2$).

**Q3. Biais et variance de $\hat\mu_{ML}$.** — ch.1 Thm 1.3 (Gosset (i)) ; ch.3 Déf. 1.1. ★. ≈ 0,5 pt.
*Solution* : $\bar Y_n\sim\mathcal N(\mu,\sigma^2/n)$ : biais nul, $\mathrm{Var}_\theta(\hat\mu_{ML})=\sigma^2/n$ (= borne de Cramér-Rao pour $\mu$ : efficace).

**Q4. Biais et variance de $\widehat{\sigma^2}_{ML}$.** — ch.1 Thm 1.3 (ii) ; ch.3 Ex. 1.4, Ex. 1.8. ★. ≈ 0,5 pt.
*Solution* : $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$, d'espérance $n-1$ et de variance $2(n-1)$. Donc $\mathbb E_\theta[\widehat{\sigma^2}_{ML}]=\frac{\sigma^2}{n}(n-1)$, biais $=-\sigma^2/n$ (sous-estimation), et $\mathrm{Var}_\theta(\widehat{\sigma^2}_{ML})=\frac{\sigma^4}{n^2}\cdot2(n-1)=\frac{2(n-1)\sigma^4}{n^2}$. (Risque quadratique $=\frac{2(n-1)\sigma^4}{n^2}+\frac{\sigma^4}{n^2}=\frac{(2n-1)\sigma^4}{n^2}<\frac{2\sigma^4}{n-1}=R(S_n^2)$, cf. Ex. 1.8 ch.3 : l'estimateur sans biais est inadmissible.)

**Q5. IC non asymptotique bilatéral pour $\sigma^2$ de niveau $1-\alpha$.** — ch.4 Déf. 1.2, Prop. 1.1, Méthode 1.1, Ex. 1.6 ; PC2 Ex. 1 Q7. ★. ≈ 0,5 pt.
*Méthode* : pivot $\chi^2$, résolution de l'encadrement en $\sigma^2$.
*Solution* : $G(Z;\sigma^2)=n\widehat{\sigma^2}_{ML}/\sigma^2=(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$ pour tout $\theta$ : pivot. $P_\theta\big(\chi^2_{\alpha/2}(n-1)\le G\le\chi^2_{1-\alpha/2}(n-1)\big)=1-\alpha$, d'où
$$\left[\frac{n\,\widehat{\sigma^2}_{ML}}{\chi^2_{1-\alpha/2}(n-1)}\ ,\ \frac{n\,\widehat{\sigma^2}_{ML}}{\chi^2_{\alpha/2}(n-1)}\right].$$

**Q6. Consistance de $(\hat\mu_{ML},\widehat{\sigma^2}_{ML})$.** — ch.6 Déf. 1.2, Thm 1.2 (LGN), Thm 1.1 (continuité), Prop. 1.2. ★. ≈ 0,5 pt.
*Solution* : LGN pour $(Y_i)$ et $(Y_i^2)$ (moments finis) : $\bar Y_n\to\mu$ et $\frac1n\sum Y_i^2\to\sigma^2+\mu^2$ en $P_{n,\theta}$-probabilité ; théorème de continuité appliqué à $(u,w)\mapsto w-u^2$ : $\widehat{\sigma^2}_{ML}\to\sigma^2$. La convergence du couple découle de celle des composantes.

**Q7. Normalité asymptotique du vecteur, moyenne et covariance limite.** — ch.6 Thm 1.6 (TCL multivarié, rappelé dans le sujet), Ex. 1.6 (TCL variance empirique), Lemme 1.1 (Slutsky), Déf. 1.6 ; ch.7 Thm 1.6/1.7. ★★. ≈ 0,75 pt.
*Méthode* : centrer, TCL multivarié sur $W_i=(Y_i-\mu,\ (Y_i-\mu)^2-\sigma^2)$, corriger le terme $\sqrt n(\bar Y_n-\mu)^2\to0$ par Slutsky.
*Solution* : $\widehat{\sigma^2}_{ML}=\frac1n\sum(Y_i-\mu)^2-(\bar Y_n-\mu)^2$, donc
$$\sqrt n\begin{pmatrix}\hat\mu_{ML}-\mu\\ \widehat{\sigma^2}_{ML}-\sigma^2\end{pmatrix}=\frac1{\sqrt n}\sum_{i=1}^nW_i-\begin{pmatrix}0\\ \sqrt n(\bar Y_n-\mu)^2\end{pmatrix}.$$
Les $W_i$ sont i.i.d. centrés de covariance $\Sigma$ : $\mathrm{Var}(Y-\mu)=\sigma^2$ ; $\mathrm{Cov}(Y-\mu,(Y-\mu)^2)=\mathbb E[(Y-\mu)^3]=0$ (symétrie) ; $\mathrm{Var}((Y-\mu)^2)=\sigma^4\mathrm{Var}(\xi^2)=2\sigma^4$ (rappel). TCL multivarié : $\frac1{\sqrt n}\sum W_i\Rightarrow\mathcal N(0,\Sigma)$. Second terme : $\sqrt n(\bar Y_n-\mu)^2=\frac{1}{\sqrt n}\big(\sqrt n(\bar Y_n-\mu)\big)^2\to0$ en probabilité (transformation continue + Slutsky (ii)). Slutsky (i) vectoriel :
$$\sqrt n\big(\hat\theta_{ML}-\theta\big)\overset{P_{n,\theta}}{\Longrightarrow}\mathcal N\!\left(\begin{pmatrix}0\\0\end{pmatrix},\begin{pmatrix}\sigma^2&0\\0&2\sigma^4\end{pmatrix}\right).$$
*Variante exacte* : par Gosset, $\sqrt n(\bar Y_n-\mu)\sim\mathcal N(0,\sigma^2)$ exactement et indépendamment de $\widehat{\sigma^2}_{ML}$ ; $\sqrt n(\widehat{\sigma^2}_{ML}-\sigma^2)\Rightarrow\mathcal N(0,2\sigma^4)$ par TCL sur $\chi^2(n-1)$ + Slutsky ; l'indépendance donne la loi jointe. *Cohérence* : $\Sigma=I(\theta)^{-1}$ avec $I(\mu,\sigma^2)=\mathrm{diag}(1/\sigma^2,1/(2\sigma^4))$ (Thm 1.6 ch.7).

**Q8. Médiane $\tilde X_n$ ($n$ impair) : estimateur naturel $\hat\mu_{Med}$ et TCL $\sqrt n(\hat\mu_{Med}-\mu)\overset{d}\to\mathcal N(0,C\sigma^2)$.** — ch.2 Ex. 1.6 (médiane = Z-estimateur), ch.3 Ex. 1.1, ch.7 Ex. 1.9 et Compléments §4.8 (loi limite de la médiane) ; rappel du sujet (TCL du quantile empirique) ; ch.6 Thm 1.7 (méthode-δ). ★★. ≈ 0,75 pt.
*Méthode* : la médiane de $LN(\mu,\sigma^2)$ est $e^\mu$ (car $\ln$ est croissante et la médiane de $\mathcal N(\mu,\sigma^2)$ est $\mu$) ; prendre $\hat\mu_{Med}=\ln\tilde X_n$ = médiane des $Y_i$ ; appliquer le TCL du quantile avec $\alpha=1/2$.
*Solution* : $\hat\mu_{Med}:=\ln\tilde X_n=\mathrm{med}(Y_1,\dots,Y_n)$. Rappel avec $\alpha=\tfrac12$, $q_{1/2}=\mu$, $f(\mu)=\frac1{\sqrt{2\pi\sigma^2}}$ :
$$\sqrt n(\hat\mu_{Med}-\mu)\overset{d}{\longrightarrow}\mathcal N\Big(0,\ \frac{1/4}{1/(2\pi\sigma^2)}\Big)=\mathcal N\Big(0,\frac{\pi}{2}\sigma^2\Big),\qquad C=\frac\pi2\approx1{,}57 .$$
(Variante : TCL du quantile sur $\tilde X_n$ autour de $e^\mu$, variance $\frac{\pi\sigma^2e^{2\mu}}{2}$, puis méthode-δ avec $\ln$, dérivée $e^{-\mu}$ : même résultat. Le décalage d'indice entre $X_{\lfloor n/2\rfloor:n}$ et $X_{(n+1)/2:n}$ ne change pas la limite, cf. ch.7 Compl. §4.8.) C'est l'analogue de la comparaison moyenne/médiane pour un bruit gaussien de l'Ex. 1.1 ch.3 ($1/n$ contre $\pi/(2n)$).

**Q9(a). Estimateur des moments de $(\mu,\sigma^2)$ associé à $T_1(x)=x$, $T_2(x)=x^2$.** — ch.2 Déf. 1.2, Ex. 1.5 (deux moments) ; PC6 Ex. 1. ★★. ≈ 0,5 pt.
*Méthode* : moments exacts par la transformée de Laplace rappelée, inversion du système.
*Solution* : $m_{k,\theta}=\mathbb E_\theta[X^k]=\mathbb E[e^{k\mu+k\sigma\xi}]=e^{k\mu+k^2\sigma^2/2}$. Donc $\ln m_1=\mu+\sigma^2/2$, $\ln m_2=2\mu+2\sigma^2$, d'où $\sigma^2=\ln m_2-2\ln m_1$ et $\mu=2\ln m_1-\tfrac12\ln m_2$. En substituant les moments empiriques :
$$\hat\mu_{Mom}=2\ln\hat m_1-\tfrac12\ln\hat m_2,\qquad\widehat{\sigma^2}_{Mom}=\ln\hat m_2-2\ln\hat m_1=\ln\frac{\hat m_2}{\hat m_1^2}\ \ (>0\text{ par Cauchy-Schwarz, p.s. pour }n\ge2).$$

**Q9(b). Normalité asymptotique de $(\hat m_1,\hat m_2)$ et matrice de covariance limite en fonction de $\sigma^2,m_1,m_2$.** — ch.6 Thm 1.6 (TCL multivarié). ★★. ≈ 0,5 pt.
*Solution* : TCL multivarié pour les vecteurs i.i.d. $(X_i,X_i^2)$ (moments d'ordre 4 finis : $m_4<\infty$) : $\sqrt n\big((\hat m_1,\hat m_2)-(m_1,m_2)\big)\Rightarrow\mathcal N(0,\Sigma)$ avec $\Sigma_{11}=m_2-m_1^2$, $\Sigma_{12}=m_3-m_1m_2$, $\Sigma_{22}=m_4-m_2^2$. Avec $m_k=e^{k\mu+k^2\sigma^2/2}$ on a $m_2=m_1^2e^{\sigma^2}$, $m_3=m_1m_2e^{2\sigma^2}$, $m_4=m_2^2e^{4\sigma^2}$, donc
$$\Sigma=\begin{pmatrix}m_1^2(e^{\sigma^2}-1)&m_1m_2(e^{2\sigma^2}-1)\\ m_1m_2(e^{2\sigma^2}-1)&m_2^2(e^{4\sigma^2}-1)\end{pmatrix}.$$

**Q9(c). Normalité asymptotique de $\hat\mu_{Mom}$ ; formule exacte et DL de la variance limite quand $\sigma^2\to0$.** — ch.6 Thm 1.8 (méthode-δ vectorielle). ★★★. ≈ 0,75 pt.
*Méthode* : $\hat\mu_{Mom}=g(\hat m_1,\hat m_2)$, $g(a,b)=2\ln a-\tfrac12\ln b$, $\nabla g=(2/m_1,-1/(2m_2))$, variance $v=\nabla g^\top\Sigma\nabla g$.
*Solution* :
$$v_{Mom}(\sigma^2)=\frac{4}{m_1^2}\Sigma_{11}-\frac{2}{m_1m_2}\Sigma_{12}+\frac{1}{4m_2^2}\Sigma_{22}=4\big(e^{\sigma^2}-1\big)-2\big(e^{2\sigma^2}-1\big)+\tfrac14\big(e^{4\sigma^2}-1\big),$$
et $\sqrt n(\hat\mu_{Mom}-\mu)\Rightarrow\mathcal N(0,v_{Mom}(\sigma^2))$. DL en $s=\sigma^2\to0$ : les termes en $s$ ($4-4+1=1$) et en $s^2$ ($2-4+2=0$) donnent
$$v_{Mom}(\sigma^2)=\sigma^2+\tfrac23\sigma^6+\tfrac32\sigma^8+O(\sigma^{10}).$$
Quand $\sigma^2\to\infty$, $v_{Mom}\sim\tfrac14e^{4\sigma^2}$ : explosion exponentielle.

**Q10. Comparaison asymptotique de $\hat\mu_{ML},\hat\mu_{Med},\hat\mu_{Mom}$ selon $\sigma\to0$ ou $\sigma\to\infty$.** — ch.6 §1.11 Prop. 1.3 ; ch.7 Thm 1.7, Ex. 1.9, Compl. §4.8 ; PC7 Ex. 5 (robustesse). ★★. ≈ 0,5 pt.
*Solution* : variances asymptotiques $v_{ML}=\sigma^2$ (borne de Cramér-Rao $1/I(\mu)$ : l'EMV est asymptotiquement efficace, Thm 1.7 ch.7), $v_{Med}=\tfrac\pi2\sigma^2\approx1{,}57\sigma^2$ (efficacité relative constante $2/\pi\approx0{,}64$), $v_{Mom}=\sigma^2+\tfrac23\sigma^6+\dots$. Classement : l'EMV est **toujours** le meilleur. Quand $\sigma\to0$ : $v_{Mom}\approx v_{ML}<v_{Med}$ (les moments sont quasi efficaces, la médiane perd 36 %). Quand $\sigma\to\infty$ : $v_{ML}<v_{Med}\ll v_{Mom}$ (les moments empiriques de la log-normale, à queue lourde, ont une variance qui explose). Intérêts : EMV optimal et explicite ; médiane robuste (fonction d'influence bornée, pas d'hypothèse de moment, insensible aux valeurs aberrantes) ; moments simples mais inadaptés aux queues lourdes.

#### Exercice 3 : Apprentissage statistique — classifieur de Bayes, plug-in, $k$-NN (≈ 6 pts)

Cadre : classification binaire $Y\in\{-1,1\}$, $\eta(x)=\mathbb P(Y=1|X=x)$, $R(g)=\mathbb P(g(X)\ne Y)$ ; hypothèses (H1) support $\mathcal X$ compact, (H2) $0<c_-\le p_X\le c_+$, $F_x(t)=\mathbb P(X\in B(x,t))$, (H3) $\eta$ $L$-lipschitzienne.

**Q1. Montrer que le classifieur bayésien est $g^*(x)=2\,\mathbf 1\{\eta(x)\ge1/2\}-1$.** — ch.8 Thm 1.2 (preuve du poly) ; PC8 Ex. 2 Q1–2. ★★. ≈ 0,75 pt.
*Solution (preuve du poly)* : par conditionnement, pour tout $g$, $R(g)=\mathbb E[\mathbf 1\{g(X)=-1\}\eta(X)+\mathbf 1\{g(X)=1\}(1-\eta(X))]=\mathbb E[\mathbf 1\{g(X)=-1\}(2\eta(X)-1)]+\mathbb E[1-\eta(X)]$. Le second terme ne dépend pas de $g$ ; le premier est minimal en prenant $g(x)=-1$ exactement là où $2\eta(x)-1<0$, i.e. $g=g^*$. D'où $R(g^*)\le R(g)$ et $R^*=\mathbb E[\min(\eta(X),1-\eta(X))]$.

**Q2. $R(g)-R^*=\mathbb E\big[|2\eta(X)-1|\mathbf 1\{g(X)\ne g^*(X)\}\big]$.** — ch.8 Thm 1.2 (4) ; PC8 Ex. 2 Q3, Ex. 7 Q1. ★★. ≈ 0,5 pt.
*Solution* : de la formule précédente, $R(g)-R(g^*)=\mathbb E[D\,(2\eta(X)-1)]$ avec $D=\mathbf 1\{g(X)=-1\}-\mathbf 1\{g^*(X)=-1\}\in\{-1,0,1\}$, nul ssi $g(X)=g^*(X)$ ; si $D=1$ alors $\eta\ge1/2$ et $D(2\eta-1)=|2\eta-1|$ ; si $D=-1$ alors $\eta<1/2$ et $D(2\eta-1)=|2\eta-1|$. Donc $D(2\eta-1)=|2\eta-1|\mathbf 1\{g\ne g^*\}$.

**Q3. Plug-in $\hat g=2\mathbf 1\{\hat\eta\ge1/2\}-1$ : $R(\hat g)-R^*\le2\mathbb E|\eta(X)-\hat\eta(X)|$.** — ch.8 Prop. 1.5 (inégalité (13)), Compl. §4.7 ; PC8 Ex. 2 Q4 et Ex. 7 Q2. ★★. ≈ 0,5 pt.
*Solution* : par Q2, $R(\hat g)-R^*=2\mathbb E[|\eta-\tfrac12|\mathbf 1\{\hat g\ne g^*\}]$. Sur $\{\hat g\ne g^*\}$, $\eta$ et $\hat\eta$ sont de part et d'autre de $1/2$, donc $|\eta(X)-\tfrac12|\le|\eta(X)-\hat\eta(X)|$ ; d'où la borne. (Rédaction PC8 Ex. 2 Q4 : deux cas $\hat\eta\ge\frac12>\eta$ et $\eta\ge\frac12>\hat\eta$.)

**Q4. $\hat g_{n,k}$ est le plug-in de $\hat\eta_{n,k}(x)=\frac1k\sum_{i\in N_k(x)}\mathbf 1\{Y_i=1\}$.** — ch.8 §1.3 (approche « modéliser $Y|X$ », $k$-NN cité) ; EN. ★. ≈ 0,25 pt.
*Solution* : $\hat g_{n,k}(x)=1$ ssi au moins la moitié des $k$ voisins ont $Y_i=1$ ssi $\frac1k\sum_{i\in N_k(x)}\mathbf 1\{Y_i=1\}\ge\frac12$ ssi $\hat\eta_{n,k}(x)\ge1/2$.

**Q5. Illustration graphique ($k=3$, $n=10$, $d=2$) avec prédictions en quelques points.** — EN. ★. ≈ 0,25 pt.
*Attendu* : nuage de 10 points étiquetés $\pm$ dans le plan ; pour 2–3 points test, tracer le cercle de rayon $\mathfrak R_3(x)$ contenant exactement 3 points, compter les labels, prédire le label majoritaire ; frontière de décision par morceaux (cellules de Voronoï d'ordre $k$), non linéaire.

**Q6. $\mathbb P_n(\mathfrak R_k(x)\le t)=\sum_{j=k}^n\binom nj F_x(t)^j(1-F_x(t))^{n-j}$ ; loi de $U_k(x)=F_x(\mathfrak R_k(x))$.** — rappels Binomiale/Beta ; ch.1 (statistiques d'ordre, cf. PC3 Ex. 5). ★★. ≈ 0,75 pt.
*Solution* : $\{\mathfrak R_k(x)\le t\}=\{\text{au moins }k\text{ des }X_i\text{ tombent dans }B(x,t)\}$ ; $N_t:=\sum_i\mathbf 1\{X_i\in B(x,t)\}\sim\mathrm{Bin}(n,F_x(t))$ par indépendance ; d'où la formule. Puis, $F_x$ étant continue strictement croissante (densité strictement positive sur le support), $\mathbb P_n(U_k(x)\le u)=\mathbb P_n(\mathfrak R_k(x)\le F_x^{-1}(u))=\mathbb P(\mathrm{Bin}(n,u)\ge k)=\mathbb P(\mathrm{Beta}(k,n-k+1)\le u)$ (rappel). Donc $U_k(x)\sim\mathrm{Beta}(k,n-k+1)$, $\mathbb E_n[U_k(x)]=\frac{k}{n+1}$. (Analogue : $F(X_{k:n})\sim\mathrm{Beta}(k,n-k+1)$ pour les statistiques d'ordre.)

**Q7. Encadrement $\frac{1}{c_+v_d}\frac{k}{n+1}\le\mathbb E_n[\mathfrak R_k(x)^d]\le\frac{1}{c_-v_d}\frac{k}{n+1}$.** — (H2). ★★. ≈ 0,5 pt.
*Solution* : par (H2), $c_-\,v_dt^d\le F_x(t)=\int_{B(x,t)}p_X\le c_+v_dt^d$ (borne inférieure valable lorsque $B(x,t)\subset\mathcal X$ ; l'énoncé passe sous silence l'effet de bord). En $t=\mathfrak R_k(x)$ : $c_-v_d\mathfrak R_k^d\le U_k\le c_+v_d\mathfrak R_k^d$, soit $\frac{U_k}{c_+v_d}\le\mathfrak R_k^d\le\frac{U_k}{c_-v_d}$ ; on prend l'espérance et on utilise $\mathbb E_n[U_k]=k/(n+1)$.

**Q8. Décomposition biais/variance : $\mathbb E_n[(\hat\eta_{n,k}(x)-\eta(x))^2]\le C_d\big((k/n)^{2/d}+1/k\big)$, avec $C_d$ explicite.** — ch.3 Prop. 1.1 (biais-variance) ; ch.9 §1 (erreur d'approximation / d'estimation) ; (H3). ★★★. ≈ 1,25 pt.
*Méthode* : conditionner par le design $X_{1:n}$ ; variance d'une moyenne de $k$ Bernoulli ; biais contrôlé par la lipschitzianité et le rayon ; Jensen pour passer de $\mathbb E[\mathfrak R_k^2]$ à $(\mathbb E[\mathfrak R_k^d])^{2/d}$.
*Solution* : conditionnellement à $X_{1:n}$, les $Y_i$ sont indépendants de lois $\mathrm{Ber}(\eta(X_i))$ (sur $\{-1,1\}$), donc $\bar\eta_k(x):=\mathbb E_n[\hat\eta_{n,k}(x)|X_{1:n}]=\frac1k\sum_{i\in N_k(x)}\eta(X_i)$ et
$$\mathbb E_n\big[(\hat\eta_{n,k}-\eta(x))^2\big]=\underbrace{\mathbb E_n\big[(\hat\eta_{n,k}-\bar\eta_k)^2\big]}_{\text{variance}}+\underbrace{\mathbb E_n\big[(\bar\eta_k-\eta(x))^2\big]}_{\text{biais}^2},$$
le terme croisé étant nul (espérance conditionnelle). Variance : $\mathrm{Var}(\hat\eta_{n,k}|X_{1:n})=\frac1{k^2}\sum_{i\in N_k}\eta(X_i)(1-\eta(X_i))\le\frac1{4k}$. Biais : $|\bar\eta_k(x)-\eta(x)|\le\frac1k\sum_{i\in N_k}|\eta(X_i)-\eta(x)|\le L\,\mathfrak R_k(x)$ (H3), donc biais$^2\le L^2\mathbb E_n[\mathfrak R_k^2]$. Pour $d\ge2$, $u\mapsto u^{2/d}$ est concave : Jensen donne $\mathbb E_n[\mathfrak R_k^2]=\mathbb E_n[(\mathfrak R_k^d)^{2/d}]\le(\mathbb E_n[\mathfrak R_k^d])^{2/d}\le\big(\frac{k}{c_-v_d(n+1)}\big)^{2/d}$ (Q7). D'où
$$\mathbb E_n\big[(\hat\eta_{n,k}(x)-\eta(x))^2\big]\le\frac{L^2}{(c_-v_d)^{2/d}}\Big(\frac kn\Big)^{2/d}+\frac1{4k}\le C_d\Big(\Big(\frac kn\Big)^{2/d}+\frac1k\Big),\qquad C_d=\max\Big(\frac{L^2}{(c_-v_d)^{2/d}},\frac14\Big).$$
(Pour $d=1$, utiliser directement $\mathbb E[U_k^2]=\frac{k(k+1)}{(n+1)(n+2)}\le2(k/n)^2$.)

**Q9. Borne sur $\mathbb E_n[R(\hat g_{n,k})]-R^*$, $k$ optimal, grande dimension.** — Q3 + Q8 ; ch.9 §1 (compromis), fléau de la dimension. ★★★. ≈ 1,25 pt.
*Solution* : Q3 conditionnellement à $D_n$, puis espérance et Fubini (intégrande positif) : $\mathbb E_n[R(\hat g_{n,k})]-R^*\le2\,\mathbb E\big[\mathbb E_n|\hat\eta_{n,k}(X)-\eta(X)|\big]\le2\sqrt{\mathbb E\,\mathbb E_n[(\hat\eta_{n,k}(X)-\eta(X))^2]}$ (Jensen/Cauchy-Schwarz) $\le2\sqrt{C_d}\sqrt{(k/n)^{2/d}+1/k}$, la borne de Q8 étant uniforme en $x$. Minimisation de $\varphi(k)=(k/n)^{2/d}+1/k$ : $\varphi'(k)=0\iff k^{1+2/d}=\frac d2n^{2/d}\iff k^\star=(d/2)^{d/(d+2)}n^{2/(d+2)}\asymp n^{2/(d+2)}$, et $\varphi(k^\star)\asymp n^{-2/(d+2)}$, d'où
$$\mathbb E_n[R(\hat g_{n,k^\star})]-R^*\ \lesssim\ n^{-1/(d+2)} .$$
Grande dimension : la vitesse $n^{-1/(d+2)}$ se dégrade avec $d$ (pour une précision $\varepsilon$ il faut $n\asymp\varepsilon^{-(d+2)}$ observations) : **fléau de la dimension**. À comparer aux vitesses paramétriques $n^{-1/2}$ (ch.6–7) et à $\sqrt{\log|\mathcal C|/n}$ pour l'ERM sur classe finie (ch.9 Thm 1.6–1.8).

#### Exercice 4 : QCM et réponses courtes sur EN/DM (≈ 3 pts, $-0{,}5$ par QCM faux)

*Nota* : les fichiers DM/EN ne font pas partie des sources fournies ; les réponses ci-dessous s'appuient sur le poly et les PC correspondantes (PC1 Ex. 4, PC2 Ex. 1, PC3 Ex. 2, PC4 Ex. 5, ch.8 §1.3, PC8 Ex. 3, ch.4 §1.4 Bonferroni).

| Q | Thème | Réponse attendue | Source | Poids |
|---|---|---|---|---|
| 1 (QCM) | EMV de $\beta_2$ en régression simple $N(\beta_1+\beta_2t_i,\sigma^2)$ | **(b)** $\hat\beta_2=\dfrac{\sum_i(t_i-\bar t)(X_i-\bar X)}{\sum_i(t_i-\bar t)^2}$ | PC2 Ex. 1 Q2 ; CC 2022 Ex. 4 Q1 | 0,25 |
| 2 (QCM) | Degrés de liberté de $\hat\sigma^2$ (somme des carrés des résidus) | **(c)** $n-2$ (Cochran : $n\hat\sigma^2/\sigma^2\sim\chi^2(n-2)$, projection sur $\mathrm{Vect}(\mathbf 1,t)^\perp$) | PC2 Ex. 1 Q5 ; ch.2 §1.5 | 0,25 |
| 3 (libre) | Résidus standardisés si le modèle est adapté | Ils doivent ressembler à un bruit blanc $\mathcal N(0,1)$ : centrés, variance constante, sans structure en fonction de $t_i$ ou des valeurs ajustées, QQ-plot gaussien. Mauvais ajustement : tendance/courbure résiduelle (non-linéarité), « entonnoir » (hétéroscédasticité), queues lourdes/points aberrants, autocorrélation | EN1 ; ch.4 §2.9 (banquise) | 0,25 |
| 4 (QCM) | Test d'égalité des variances par RVG dans le modèle à deux échantillons | **(c)** loi de Fisher ($S_X^2/S_Y^2\sim F(n-1,p-1)$ sous $H_0$) | PC4 Ex. 5 Q6–8 ; ch.5 Compl. (RVG) | 0,25 |
| 5 (QCM) | Statistique de comparaison des moyennes à variances égales | **(d)** $t=\dfrac{\bar X_n-\bar Y_p}{s_p\sqrt{1/n+1/p}}$, $s_p^2$ variance combinée (pooled), loi $t(n+p-2)$ | PC4 Ex. 5 Q2–3 | 0,25 |
| 6 (libre) | Pourquoi corriger pour les tests multiples ; exemple | À niveau $\alpha$ chacun, $m$ tests indépendants sous $H_0$ rejettent au moins une fois avec probabilité $1-(1-\alpha)^m\to1$ (inflation du risque de première espèce global / faux positifs). Exemple : **Bonferroni**, niveau $\alpha/m$ par test, garantit par sous-additivité un niveau global $\le\alpha$ | ch.4 §1.4 (Intuition après Ex. 1.7) | 0,25 |
| 7 (libre) | ACP : objectif et clé mathématique | (1) Réduire la dimension en projetant les données centrées sur un sous-espace de petite dimension conservant le maximum de variance. (2) Diagonalisation de la matrice de covariance empirique $\frac1nX^\top X$ (ou SVD de $X$) : les composantes principales sont les vecteurs propres associés aux plus grandes valeurs propres | EN3 | 0,25 |
| 8 (libre) | LDA vs QDA vs régression logistique | (1) LDA : $X\mid Y=i\sim\mathcal N(\mu_i,\Sigma)$, covariance **commune**, frontière linéaire ; QDA : $\mathcal N(\mu_i,\Sigma_i)$, covariances **distinctes**, frontière quadratique ; logistique : modélise seulement $\mathbb P(Y=1\mid X)=\mathrm{sigm}(\theta^\top X)$, aucune hypothèse sur la loi de $X$ (approche discriminative/conditionnelle). (2) QDA meilleure que LDA quand les classes ont des dispersions/orientations différentes (covariances très différentes, bruit hétéroscédastique), si $n$ est assez grand pour estimer $\Sigma_i$ | ch.8 §1.3 ; PC8 Ex. 3 | 0,25 |
| 9 (QCM) | Estimateur des moindres carrés, $Y=Z\beta+\varepsilon$ | **(a)** $\hat\beta=(Z^\top Z)^{-1}Z^\top Y$ (sous $\mathrm{rang}(Z)=p$) | DM1 ; PC2 Ex. 1 ; CC 2022 Ex. 4 Q1 | 0,25 |
| 10 (QCM) | Loi de $\hat\beta$ dans le cas gaussien | **(b)** $\hat\beta\sim\mathcal N(\beta,\sigma^2(Z^\top Z)^{-1})$ | PC2 Ex. 1 Q3 ; CC 2022 Ex. 4 Q2 | 0,25 |
| 11 (libre) | $\hat\beta$ parmi les estimateurs sans biais | Il est de variance minimale : BLUE (Gauss-Markov) parmi les estimateurs linéaires sans biais ; dans le cas gaussien il atteint la borne de Cramér-Rao $\sigma^2(Z^\top Z)^{-1}$ : **efficace** | PC3 Ex. 2 ; ch.3 Ex. 1.11, Déf. 1.10 | 0,25 |
| 12 (libre) | Tester (i) l'effet de $Vx$ sur $O_3$, (ii) l'effet de la nébulosité $Ne12$, (iii) l'effet conjoint de $Vx$ et $T12$ | (i) $H_0:\beta_{Vx}=0$ vs $\ne0$ : test de Student $t=\hat\beta_{Vx}/\widehat{se}(\hat\beta_{Vx})\sim t(n-p)$ ; (ii) $Ne12$ qualitative à $K$ modalités codée par indicatrices : $H_0$ : tous ses coefficients nuls, test de Fisher (modèles emboîtés, $F\sim F(K-1,n-p)$) ; (iii) $H_0:\beta_{Vx}=\beta_{T12}=0$ : test de Fisher global de sous-modèle, $F=\frac{(SCR_0-SCR)/2}{SCR/(n-p)}\sim F(2,n-p)$ | DM1 ; PC5 Ex. 4 (RVG, Fisher, ANOVA) | 0,25 |

### 2.B — Contrôle de connaissances MAP433 (promotion 2022), avec corrigé

Convention de l'énoncé : $\mathrm{Gamma}(p,\lambda)$ **d'échelle** $\lambda$ ($f_{p,\lambda}(x)=\frac{\lambda^{-p}}{\Gamma(p)}e^{-x/\lambda}x^{p-1}$, $\mathbb E=p\lambda$, $\mathrm{Var}=p\lambda^2$, $\chi^2(n)=\mathrm{Gamma}(n/2,2)$) ; $\mathrm{Gcdf}_p$, $\mathrm{Gqf}_p$ : f.d.r. et quantile de $\mathrm{Gamma}(p,1)$. **Barème absent** : estimation à 20 pts répartis 4 / 4,5 / 5 / 4 / 2,5 selon la longueur.

#### Exercice 1 — Test UPP dans le modèle de Weibull (≈ 4 pts)

Modèle : $n$-échantillon de $p_\theta(x)=\frac c\theta x^{c-1}e^{-x^c/\theta}\mathbf 1_{\mathbb R_+}(x)$, $c>0$ connu, $\Theta=\mathbb R_+^*$ ; test $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$.

| Q | Énoncé | Chapitres | Méthode | Diff. | Pts | Corrigé (étapes) |
|---|---|---|---|---|---|---|
| 1 | $(X_i)^c\sim\mathcal E$ de paramètre d'échelle $\theta$ ($q_\theta(y)=\theta^{-1}e^{-y/\theta}$) | ch.1 (modèle induit, fonction muette) | changement de variable $y=x^c$ | ★ | 0,75 | Pour $h$ borélienne bornée, $\mathbb E_\theta[h(X^c)]=\int_0^\infty h(x^c)\theta^{-1}cx^{c-1}e^{-x^c/\theta}dx=\int_0^\infty h(y)\theta^{-1}e^{-y/\theta}dy$ (par $y=x^c$, $dy=cx^{c-1}dx$) |
| 2 | Famille à RVM | ch.5 Déf. 1.4 | factorisation $p_\theta(z)=h(z)\psi(T(z);\theta)$, monotonie du rapport | ★★ | 1 | $p_\theta(x_{1:n})=\theta^{-n}c^n\prod x_i^{c-1}e^{-\sum x_i^c/\theta}$ ; $T(z)=\sum x_i^c$, $h(z)=c^n\prod x_i^{c-1}$, $\psi(t;\theta)=\exp(-t/\theta-n\ln\theta)$ ; pour $\theta>\theta'$, $\psi(t;\theta)/\psi(t;\theta')=\exp\big(t\frac{\theta-\theta'}{\theta\theta'}-n\ln(\theta/\theta')\big)$ strictement **croissante** en $t$ |
| 3 | Test UPP($\alpha$), constantes via $\mathrm{Gqf}_n$ | ch.5 Thm 1.3 ; ch.1 Maths (additivité Gamma) | région $\{T>c\}$, loi de $T$ sous $P_{\theta_0}$ | ★★ | 1,25 | $\phi(z)=\mathbf 1\{T(z)>c\}$ avec $P_{\theta_0}(T>c)=\alpha$ ; sous $P_{\theta_0}$, $T\sim\mathrm{Gamma}(n,\theta_0)$ (somme de $n$ Gamma$(1,\theta_0)$ par Q1), donc $T/\theta_0\sim\mathrm{Gamma}(n,1)$ et $c=\theta_0\,\mathrm{Gqf}_n(1-\alpha)$ |
| 4 | Fonction puissance $\theta\mapsto1-\mathrm{Gcdf}_n(\theta_0\mathrm{Gqf}_n(1-\alpha)/\theta)$ | ch.4 Déf. 2.2 ; ch.5 Thm 1.3 (ii) | pivot $T/\theta$ | ★ | 1 | $\beta_\phi(\theta)=P_\theta(T>\theta_0\mathrm{Gqf}_n(1-\alpha))=P_\theta(T/\theta>\theta_0\mathrm{Gqf}_n(1-\alpha)/\theta)=1-\mathrm{Gcdf}_n(\theta_0\mathrm{Gqf}_n(1-\alpha)/\theta)$ car $T/\theta\sim\mathrm{Gamma}(n,1)$ ; croissante en $\theta$, vaut $\alpha$ en $\theta_0$ |

*Jumeau direct* : PC5 Ex. 1 (exponentielle $\theta^{-1}e^{-x/\theta}$, mêmes 4 étapes) ; PC4 Ex. 1 ($2\theta^{-1}\sum X_i\sim\chi^2(2n)$).

#### Exercice 2 — Deux estimateurs de $\mu^2$ dans le modèle gaussien (≈ 4,5 pts)

$T_{1,n}=\bar X_n^2$, $T_{2,n}=\bar X_n^2-\frac1nS_n^2$, $S_n^2=\frac1{n-1}\sum(X_i-\bar X_n)^2$ ; rappel $\mathbb E[Y^4]=3$ pour $Y\sim\mathcal N(0,1)$.

| Q | Énoncé | Chapitres | Méthode | Diff. | Pts | Corrigé (étapes) |
|---|---|---|---|---|---|---|
| 1(a,b,c) | Loi de $\bar X_n$ ; indépendance de $S_n^2$ et $\bar X_n$, loi Gamma de $(n-1)S_n^2/\sigma^2$ ; $\mathbb E[S_n^2]=\sigma^2$, $\mathbb E[S_n^4]=\sigma^4(1+\frac2{n-1})$ | ch.1 Thm 1.3 (Gosset) | citer Gosset (« théorème IV.3.24 » dans l'ancien poly) ; moments du $\chi^2$ | ★ | 1 | (a) $\bar X_n\sim\mathcal N(\mu,\sigma^2/n)$ ; (b) $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)=\mathrm{Gamma}(\frac{n-1}2,2)$ (convention du CC ; le corrigé écrit par coquille « $/2$ » au lieu de « $/\sigma^2$ ») ; (c) $\mathbb E[S_n^4]=\frac{\sigma^4}{(n-1)^2}\mathbb E[(\chi^2_{n-1})^2]=\frac{\sigma^4}{(n-1)^2}\big((n-1)^2+2(n-1)\big)$ |
| 2 | Biais et risque quadratique de $T_{1,n}$ | ch.3 Déf. 1.1, 1.3, Prop. 1.1 | $\mathbb E[\bar X_n^2]=\mu^2+\sigma^2/n$ ; développement $(\bar X_n-\mu+\mu)^2-\mu^2$, moment d'ordre 4 gaussien | ★★ | 0,75 | Biais $=\sigma^2/n$. $\mathbb E[(\bar X_n^2-\mu^2)^2]=\mathbb E[(\{\bar X_n-\mu\}^2+2\mu\{\bar X_n-\mu\})^2]=\mathbb E[(\bar X_n-\mu)^4]+4\mu^2\sigma^2/n$ (moment d'ordre 3 nul) $=3\frac{\sigma^4}{n^2}+4\mu^2\frac{\sigma^2}{n}$ |
| 3 | Biais et risque de $T_{2,n}$ | ch.3 ; ch.1 (indépendance Gosset) | linéarité ; variance d'une différence de termes indépendants | ★★ | 0,75 | Corrigé : $\mathbb E[T_{2,n}]=\mu^2+\frac{\sigma^2}n-\frac1n\mathbb E[S_n^2]=\mu^2$ : **sans biais**. *Le corrigé omet le risque* ; complément : $R(T_{2,n})=\mathrm{Var}(\bar X_n^2)+\frac1{n^2}\mathrm{Var}(S_n^2)$ (indépendance) $=\big(4\mu^2\frac{\sigma^2}{n}+2\frac{\sigma^4}{n^2}\big)+\frac{2\sigma^4}{n^2(n-1)}$, en utilisant $\mathbb E[\bar X_n^4]=\mu^4+6\mu^2\sigma^2/n+3\sigma^4/n^2$ |
| 4 | $T_{1,n}$ admissible pour le risque quadratique ? | ch.3 Déf. 1.4, Ex. 1.8–1.9 | comparer les deux fonctions de risque pour tout $\theta$ | ★★ | 0,5 | *Non traitée dans le corrigé.* $R(T_{1,n})-R(T_{2,n})=\frac{\sigma^4}{n^2}\big(1-\frac2{n-1}\big)=\frac{\sigma^4}{n^2}\frac{n-3}{n-1}$ : pour $n\ge4$, $T_{2,n}$ fait strictement mieux pour **tout** $\theta$, donc $T_{1,n}$ est **inadmissible** (pour $n=3$ risques égaux ; $n=2$ : $T_{1,n}$ meilleur) |
| 5 | Consistance de $T_{1,n}$, $T_{2,n}$ | ch.6 Déf. 1.2, Thm 1.2, Lemme 1.1 ; Maths (Markov) | Markov + risque $\to0$ ; LGN + Slutsky | ★ | 0,5 | $P(\vert T_{1,n}-\mu^2\vert \ge\varepsilon)\le\varepsilon^{-2}\mathbb E[(T_{1,n}-\mu^2)^2]\to0$. $T_{2,n}=T_{1,n}-\frac1nS_n^2$ avec $S_n^2\to\sigma^2$ (LGN) donc $S_n^2/n\to0$ ; Slutsky ⇒ $T_{2,n}\to\mu^2$ |
| 6 | $\mu\ne0$ : loi limite de $\sqrt n(T_{1,n}-\mu^2)$ et $\sqrt n(T_{2,n}-\mu^2)$ | ch.6 Thm 1.6, Thm 1.7 (méthode-δ), Lemme 1.1 | méthode-δ avec $g(x)=x^2$ ; Slutsky | ★★ | 0,5 | TCL : $\sqrt n(\bar X_n-\mu)\Rightarrow\mathcal N(0,\sigma^2)$ ; δ-méthode $g'(\mu)=2\mu\ne0$ : $\sqrt n(T_{1,n}-\mu^2)\Rightarrow\mathcal N(0,4\mu^2\sigma^2)$. $\sqrt n(T_{2,n}-\mu^2)=\sqrt n(T_{1,n}-\mu^2)-S_n^2/\sqrt n$, second terme $\to0$ en proba : même limite |
| 7 | $\mu=0$ : loi limite de $nT_{1,n}$ et $nT_{2,n}$ ; commenter | ch.6 Thm 1.4 (transformation continue), Lemme 1.1 ; Maths ($\chi^2$) | vitesse $n$ au lieu de $\sqrt n$ car $g'(0)=0$ | ★★ | 0,5 | $nT_{1,n}=(\frac1{\sqrt n}\sum X_i)^2\sim\sigma^2\chi^2(1)$ **exactement** ; $nT_{2,n}=nT_{1,n}-S_n^2\Rightarrow\sigma^2(\chi^2(1)-1)$ par Slutsky. Commentaire : la méthode-δ dégénère ($g'(0)=0$), la loi limite n'est plus gaussienne et la vitesse passe à $1/n$ ; $T_{2,n}$ est centré en loi limite alors que $T_{1,n}$ reste positif |

*Jumeaux* : PC3 Ex. 1 (risque, admissibilité), PC6 Ex. 1 et Ex. 4 (consistance, δ-méthode), ch.6 Ex. 1.8 (loi limite de $X_n^2$), PC7 Ex. 2 (chaîne complète sur $\Gamma(2,\theta)$).

#### Exercice 3 — Exponentielle translatée $\mathcal E(a,\lambda)$, statistiques d'ordre, IC (≈ 5 pts)

Densité $f_\theta(x)=\lambda^{-1}e^{-(x-a)/\lambda}\mathbf 1_{[a,\infty[}(x)$, $\theta=(a,\lambda)$ ; $U_1=nX_{1:n}$, $U_k=(n-k+1)(X_{k:n}-X_{(k-1):n})$ ; identité (3) $\sum u_i=nu_1+\sum_{i\ge2}(n-i+1)(u_i-u_{i-1})$.

| Q | Énoncé | Chapitres | Méthode | Diff. | Pts | Corrigé (étapes) |
|---|---|---|---|---|---|---|
| 1 | $\mathbb E_\theta[h(X_{1:n},\dots,X_{n:n})]=\sum_{\tau\in\mathfrak S_n}\mathbb E_\theta[h(X_{\tau_1},\dots,X_{\tau_n})\mathbf 1\{X_{\tau_1}<\dots<X_{\tau_n}\}]$ | ch.1 Maths (statistiques d'ordre) ; PC3 Ex. 5 | partition selon la permutation ordonnante $\sigma(Z)$ | ★★ | 0,5 | $\mathbb E[h(X_{\sigma_1(Z)},\dots)]=\sum_\tau\mathbb E[h(X_{\tau_1},\dots)\mathbf 1\{\tau=\sigma(Z)\}]$ et $\{\tau=\sigma(Z)\}=\{X_{\tau_1}<\dots<X_{\tau_n}\}$ p.s. |
| 2 | Densité jointe des statistiques d'ordre $n!\,p_\theta(y)\mathbf 1\{a\le y_1<\dots<y_n\}$ | idem | échangeabilité : $(X_{\tau_1},\dots,X_{\tau_n})\overset{d}=(X_1,\dots,X_n)$ | ★ | 0,5 | chaque terme de la somme vaut $\int h(y)p_\theta(y)\mathbf 1\{y_1<\dots<y_n\}dy$ ; $n!$ termes |
| 3 | $(U_1,\dots,U_n)$ indépendantes ; lois | ch.1 (changement de variables, fonction muette) ; PC3 Ex. 5 Q2 | changement de variables $u_1=ny_1$, $u_k=(n-k+1)(y_k-y_{k-1})$, jacobien $n!$, identité (3) | ★★★ | 1 | $\mathbb E[h(U)]=\int h(u)\lambda^{-n}e^{-\lambda^{-1}(u_1-na)}\mathbf 1\{u_1>na\}\prod_{i\ge2}e^{-u_i/\lambda}\mathbf 1_{\mathbb R_+}(u_i)\,du$ : densité produit ⇒ indépendance ; $U_1\sim\mathcal E(na,\lambda)$, $U_2,\dots,U_n\sim\mathcal E(0,\lambda)=\mathrm{Gamma}(1,\lambda)$ |
| 4 | $T_1=\sum_i(X_{i:n}-X_{1:n})$ indépendante de $X_{1:n}$, de loi $\mathrm{Gamma}(n-1,\lambda)$ | idem ; additivité Gamma | (3) : $T_1=\sum_{i\ge2}U_i$ | ★ | 0,5 | somme de $n-1$ Gamma$(1,\lambda)$ indépendantes, indépendante de $U_1$ |
| 5 | IC pour $\lambda$ de couverture $1-\alpha$ via $T_1$ | ch.4 Déf. 1.2, Prop. 1.1, Méthode 1.1 | pivot $T_1/\lambda\sim\mathrm{Gamma}(n-1,1)$ | ★ | 0,5 | $a_\alpha=\mathrm{Gqf}_{n-1}(\alpha/2)$, $b_\alpha=\mathrm{Gqf}_{n-1}(1-\alpha/2)$ ; $[T_1/b_\alpha,T_1/a_\alpha]$ |
| 6 | $T_2=X_{1:n}\sim\mathcal E(a,\lambda/n)$ | ch.1 | $X_{1:n}=U_1/n$, changement de variable | ★ | 0,25 | $\mathbb E[h(U_1/n)]=\int h(v)\frac n\lambda e^{-\frac n\lambda(v-a)}\mathbf 1\{v\ge a\}dv$ |
| 7 | $F_n(a)=(T_2-a)/\{(n-1)^{-1}T_1\}$ pivotale « sans calcul » | ch.4 Déf. 1.2 | rapport de deux pivots indépendants | ★★ | 0,5 | $(T_2-a)/\lambda\sim\mathcal E(0,1)$ indépendante de $T_1/\lambda\sim\mathrm{Gamma}(n-1,1)$ ; le quotient ne dépend plus de $(a,\lambda)$ |
| 8 (bonus) | Densité de $F_n(a)$ : $t\mapsto n(1+\frac{nt}{n-1})^{-n}\mathbf 1_{[0,\infty[}(t)$ | Maths | intégration de la densité jointe, $\int_0^\infty\frac{v^{n-1}}{\Gamma(n)}e^{-v/s}dv=s^n$ | ★★★ | 0,5 | $\mathbb E[h(F_n(a))]=\int_a^\infty\int_0^\infty h\big(\tfrac{(n-1)(t_2-a)}{t_1}\big)\frac n\lambda e^{-\frac n\lambda(t_2-a)}\frac{t_1^{n-2}}{(n-2)!\lambda^{n-1}}e^{-t_1/\lambda}dt_1dt_2$, changement $t=(n-1)(t_2-a)/t_1$, puis intégration en $t_1$ |
| 9 | IC pour $a$ via $F_n(a)$ | ch.4 Prop. 1.1 | choisir $0<c_1<c_2$ avec $\int_{c_1}^{c_2}n(1+\frac{nt}{n-1})^{-n}dt=1-\alpha$ et résoudre en $a$ | ★★ | 0,75 | $c_1\le\frac{(n-1)(T_2-a)}{T_1}\le c_2\iff a\in\big(T_2-\tfrac{c_2T_1}{n-1},T_2-\tfrac{c_1T_1}{n-1}\big)$ (le corrigé écrit $(T_2-c_2T_1,T_2-c_1T_1)$ en omettant le facteur $1/(n-1)$ : coquille) |

*Jumeaux* : PC3 Ex. 5 (quasi identique, $a=0$), PC5 Ex. 4 (exponentielle translatée, test UPP), PC4 Ex. 3 (pivot $X_{n:n}/\theta$), ch.6 Ex. 1.5 (loi limite du support).

#### Exercice 4 — Régression linéaire simple gaussienne, région de confiance de Fieller (≈ 4 pts)

$Y\sim\mathcal N(X\beta,\sigma^2I_n)$, $X=[\mathbf 1,x]$ de rang 2, $H=X(X^\top X)^{-1}X^\top$ ; $\hat\beta=(X^\top X)^{-1}X^\top Y$, $\hat\sigma^2=\frac1n\|(I_n-H)Y\|^2$, $S^2=\frac n{n-2}\hat\sigma^2$ ; $\phi=-\beta_0/\beta_1$, $\delta=\bar x-\phi$ ; $u=x-\bar x\mathbf 1$, $w(\delta)=\frac1n+\frac{\delta^2}{\|u\|^2}$.

| Q | Énoncé | Chapitres | Méthode | Diff. | Pts | Corrigé (étapes) |
|---|---|---|---|---|---|---|
| 1 | EMV $\hat\beta=(X^\top X)^{-1}X^\top Y$ (formules explicites) et $\hat\sigma^2$ | ch.2 Ex. 1.10/Ex. 1.15 ; PC2 Ex. 1 Q2 | maximiser en $\beta$ (moindres carrés, équations normales) puis en $\sigma^2$ | ★★ | 0,75 | *Le corrigé laisse la Q1 vide.* Rédaction type : $\log L=-\frac n2\log(2\pi\sigma^2)-\frac1{2\sigma^2}\Vert Y-X\beta\Vert ^2$ ; à $\sigma^2$ fixé, minimiser $\Vert Y-X\beta\Vert ^2$ : $X^\top(Y-X\beta)=0\Rightarrow\hat\beta=(X^\top X)^{-1}X^\top Y$ ; avec $X^\top X=\begin{pmatrix}n&n\bar x\\n\bar x&\Vert x\Vert ^2\end{pmatrix}$ on obtient $\hat\beta_1=\frac{\sum Y_i(x_i-\bar x)}{\sum(x_i-\bar x)^2}$, $\hat\beta_0=\bar Y-\hat\beta_1\bar x$ ; puis $\partial_{\sigma^2}=0\Rightarrow\hat\sigma^2=\frac1n\Vert Y-X\hat\beta\Vert ^2=\frac1n\Vert (I_n-H)Y\Vert ^2$ |
| 2 | $\hat\beta$ vecteur gaussien : moyenne, covariance | ch.1 Maths (vecteurs gaussiens) ; PC2 Ex. 1 Q3 | image linéaire d'un gaussien | ★ | 0,5 | $\hat\beta\sim\mathcal N\big(\beta,\sigma^2(X^\top X)^{-1}\big)$ |
| 3 | $\hat\sigma^2$ et $\hat\beta$ indépendants ; loi de $\hat\sigma^2$ | ch.1 Thm 1.1 (Cochran) ; PC2 Ex. 1 Q5–6 | $\hat\beta$ fonction de $HY$, $n\hat\sigma^2=\Vert (I-H)Y\Vert ^2$, $\mathrm{Vect}(X)\perp\mathrm{Vect}(X)^\perp$ | ★★ | 0,5 | $n\hat\sigma^2/\sigma^2\sim\chi^2(n-2)$, indépendant de $\hat\beta$ ; $(n-2)S^2/\sigma^2\sim\chi^2(n-2)$ |
| 4 | $\mathbb E_\theta[\bar Y-\delta\hat\beta_1]=0$ | ch.3 (biais) | $\mathbb E[\hat\beta_1]=\beta_1$, $\mathbb E[\bar Y]=\beta_0+\beta_1\bar x$ | ★ | 0,25 | $\beta_0+\beta_1\bar x-\delta\beta_1=\beta_0+\beta_1\phi=0$ |
| 5 | $\mathrm{Cov}_\theta(\bar Y,\hat\beta_1)=0$ | Maths (covariance de formes linéaires) | $\bar Y=\frac1n\mathbf 1^\top Y$, $\hat\beta_1=\frac{u^\top Y}{\Vert u\Vert ^2}$ | ★ | 0,25 | $\mathrm{Cov}=\frac{\sigma^2\mathbf 1^\top u}{n\Vert u\Vert ^2}=0$ car $\mathbf 1^\top u=0$ |
| 6 | $\mathrm{Var}_\theta(\bar Y-\delta\hat\beta_1)=\sigma^2w(\delta)$ | Maths | décorrélation (Q5) | ★ | 0,25 | $\frac{\sigma^2}{n}+\delta^2\frac{\sigma^2}{\Vert u\Vert ^2}$ |
| 7 | $\bar Y-\delta\hat\beta_1\sim\mathcal N(0,\sigma^2w(\delta))$, indépendante de $S^2$ | ch.1 Thm 1.1 (Cochran, « corollaire IV.3.9 ») | $\bar Y-\delta\hat\beta_1=v^\top Y$ avec $v\in\mathrm{Vect}(X)$ donc $(I-H)v=0$ | ★★ | 0,5 | combinaison linéaire gaussienne ; $v^\top Y$ fonction de $HY$, $S^2$ fonction de $(I-H)Y$ : indépendance par Cochran |
| 8 | $T^2(\delta)=\frac{(\bar Y-\delta\hat\beta_1)^2}{S^2w(\delta)}\sim F(1,n-2)$ | Maths ch.4 (loi de Fisher) | quotient $\mathcal N(0,1)^2$ / $\chi^2(n-2)/(n-2)$ indépendants | ★ | 0,25 | $T(\delta)=\frac{\bar Y-\delta\hat\beta_1}{\sigma\sqrt{w(\delta)}}\cdot\frac1{\sqrt{S^2/\sigma^2}}$ ; $T\sim t(n-2)$, $T^2\sim F(1,n-2)$ |
| 9 | Région de confiance $A\delta^2+B\delta+C\le0$ ; condition pour un intervalle | ch.4 Prop. 1.1 ; Compl. ch.4 (dualité) | pivot $T^2(\delta)$, quantile $F^\alpha_{1,n-2}$ d'ordre $1-\alpha$, développer | ★★★ | 0,75 | $(\bar Y-\delta\hat\beta_1)^2\le F^\alpha_{1,n-2}S^2(\frac1n+\frac{\delta^2}{\Vert u\Vert ^2})$ ⇒ $A=\hat\beta_1^2-\frac{S^2F^\alpha_{1,n-2}}{\Vert u\Vert ^2}$, $B=-2\bar Y\hat\beta_1$, $C=\bar Y^2-\frac{S^2F^\alpha_{1,n-2}}n$. C'est un intervalle borné ssi $A>0$, i.e. ssi $\hat\beta_1^2/(S^2/\Vert u\Vert ^2)>F^\alpha_{1,n-2}$ : ssi le test de Student de $\beta_1=0$ rejette au niveau $\alpha$ (sinon : complémentaire d'un intervalle ou $\mathbb R$ entier — région de Fieller) |

*Jumeaux* : PC1 Ex. 4, PC2 Ex. 1, PC3 Ex. 2, PC4 Ex. 5, PC5 Ex. 4 ; ch.4 §2.9 (banquise).

#### Exercice 5 — Classifieur du plus proche voisin : $R^\star\le\lim_n\mathbb P(Y\ne\hat h_n(X))\le2R^\star(1-R^\star)$ (≈ 2,5 pts)

$\hat h_n(x)=Y_{\varphi_n(x)}$, $\varphi_n(x)=\arg\min_i\|x-X_i\|$ ; $\eta(X)=\mathbb P(Y=1|X)$, $r^\star=\min(\eta,1-\eta)$, $R^\star=\mathbb E[r^\star(X)]$ ; admis : $X_{(n)}\to X$ en probabilité, $\eta$ continue.

| Q | Énoncé | Chapitres | Méthode | Diff. | Pts | Corrigé (étapes) |
|---|---|---|---|---|---|---|
| 1 | $r^\star(1-r^\star)=\eta(1-\eta)$ | ch.8 Thm 1.2 (5) | disjonction $\eta\le1/2$ / $\eta>1/2$ | ★ | 0,25 | immédiat dans les deux cas |
| 2 | $\mathbb P(Y=-1,Y_i=1,\varphi_n(X)=i\mid X,X_{1:n})=(1-\eta(X))\eta(X_i)\mathbf 1\{\varphi_n(X)=i\}$ | ch.8 Déf. 1.5, Maths (espérance conditionnelle) ; PC8 Ex. 4 | indépendance des couples, $\varphi_n(X)$ mesurable par rapport à $(X,X_{1:n})$ | ★★ | 0,5 | $\mathbb E[\mathbf 1_{Y=-1}\mathbf 1_{Y_i=1}\mathbf 1_{\varphi_n(X)=i}\mid X,X_{1:n}]=\mathbb E[\mathbf 1_{Y=-1}\mid X]\,\mathbb E[\mathbf 1_{Y_i=1}\mid X_i]\,\mathbf 1_{\varphi_n(X)=i}$ |
| 3–4 | $\mathbb P(Y=-1,\hat h_n(X)=1\mid \cdot)=(1-\eta(X))\eta(X_{(n)})$ ; symétrique | idem | sommer sur $i$, $\eta(X_{(n)})=\sum_i\eta(X_i)\mathbf 1\{\varphi_n(X)=i\}$ | ★ | 0,5 | somme des termes de Q2 ; « même adaptation » pour Q4 |
| 5 | $\lim\mathbb E[\eta(X_{(n)})]=\mathbb E[\eta(X)]$ | Maths (convergence dominée) | continuité de $\eta$ + $X_{(n)}\to X$ + bornée par 1 | ★ | 0,25 | convergence dominée pour la convergence en probabilité |
| 6 | $\lim\mathbb P(Y\ne\hat h_n(X))=2\mathbb E[r^\star(1-r^\star)]$ | ch.8 | somme des deux probabilités d'erreur, Q1, convergence dominée | ★★ | 0,5 | $\mathbb E[\eta(X_{(n)})(1-\eta(X))]+\mathbb E[\eta(X)(1-\eta(X_{(n)}))]\to2\mathbb E[\eta(1-\eta)]$ |
| 7 | $\le2R^\star(1-R^\star)$ et conclusion | ch.8 Déf. 1.4 | $\mathbb E[r^{\star2}]\ge(\mathbb E r^\star)^2$ (Jensen/variance $\ge0$) ; $R^\star\le R(h)$ pour tout $h$ | ★ | 0,5 | $2(\mathbb E r^\star-\mathbb E r^{\star2})\le2(\mathbb Er^\star-(\mathbb Er^\star)^2)$ ; minoration par optimalité du classifieur de Bayes |

*Jumeaux* : PC8 Ex. 2 (risque bayésien, excès de risque), Ex. 4 (espérance conditionnelle), Ex. 7 ; ch.8 Prop. 1.5 (convergence dominée sur le double aléa).

---

## 3. Typologie des exercices qui tombent

Fréquence = nombre d'occurrences sur les 2 sujets (9 exercices, ~70 questions).

| Type d'exercice | Fréquence (2022 / 2025) | Poids estimé | Chapitres | PC d'entraînement |
|---|---|---|---|---|
| **Test UPP par rapport de vraisemblance monotone** (factorisation, monotonie, seuil par quantile Gamma/χ², fonction puissance) | 1 / 1 (CC Ex. 1 ; Ex. 1 Q2) | 4 pts / 1,5 pt | ch.5 (+ ch.1 Maths Gamma) | PC5 Ex. 1, Ex. 3, Ex. 4, Ex. 7 ; PC4 Ex. 1, Ex. 4 |
| **Neyman-Pearson deux hypothèses simples** | 0 / 1 (+ implicite CC Ex. 1) | 1,5 pt | ch.5 | PC5 Ex. 1 Q1, Ex. 2, Ex. 5 ; PC4 Ex. 4 |
| **p-valeur : définition, calcul, interprétation** | 0 / 1 | 1,5 pt | ch.4 §2.7–2.8, ch.5 §1.10 | PC4 Ex. 1, 2, 4, 6 |
| **Borne de Cramér-Rao / information de Fisher / efficacité** | 0 / 1 (+ QCM Q11) | 1,25 pt | ch.3 | PC3 Ex. 2, Ex. 3 ; PC6 Ex. 1 Q3 |
| **EMV : calcul (annulation du score + maximum global), biais, variance, invariance** | 1 / 1 (CC Ex. 4 Q1 ; Ex. 2 Q2–4) | 0,75 / 1,75 | ch.2, ch.3, ch.1 (Gosset) | PC2 Ex. 1–3 ; PC7 Ex. 2, 3 ; PC3 Ex. 1 |
| **Méthode des moments** (y compris 2 moments, inversion) | 0 / 1 | 0,5 pt + suite | ch.2 | PC6 Ex. 1 ; ch.2 Ex. 1.5 ; PC2 Ex. 2 |
| **Biais / risque quadratique / admissibilité** | 1 / 1 (CC Ex. 2 Q2–4 ; Ex. 2 Q3–4) | 2 / 1 | ch.3 | PC3 Ex. 1, 4, 5 ; PC7 Ex. 2 |
| **Théorèmes de Gosset / Cochran, modèle linéaire gaussien** | 2 / 1 (CC Ex. 2 Q1, Ex. 4 ; Ex. 2 Q3–5 ; QCM) | 5 / 2 | ch.1 §1.9, ch.2 | PC1 Ex. 3, 4 ; PC2 Ex. 1 ; PC3 Ex. 2 ; PC4 Ex. 2, 5 ; PC5 Ex. 4 |
| **Intervalle / région de confiance par pivot** (χ², Gamma, Fisher, Fieller) | 2 / 1 (CC Ex. 3 Q5, 9 ; Ex. 4 Q9 ; Ex. 2 Q5) | 2 / 0,5 | ch.4 §1 | PC4 Ex. 1, 3, 5 ; PC2 Ex. 1 Q7 ; PC6 Ex. 1 |
| **Statistiques d'ordre, changement de variables, modèle induit** | 1 / (1 : Ex. 3 Q6) | 3 / 0,75 | ch.1 | PC1 Ex. 2, 3 ; PC3 Ex. 5 ; PC4 Ex. 3 ; PC5 Ex. 4, 7 |
| **Consistance** (LGN, Markov/Tchebychev, continuité, Slutsky) | 1 / 1 | 0,5 / 0,5 | ch.6 | PC6 Ex. 1, 2, 4 ; PC7 Ex. 2, 3, 5 |
| **Normalité asymptotique : TCL (multivarié), méthode-δ (scalaire/vectorielle), Slutsky** | 1 / 1 (CC Ex. 2 Q6–7 ; Ex. 2 Q7–9) | 1 / 2,75 | ch.6 | PC6 Ex. 1, 4 ; PC7 Ex. 2, 3 ; ch.6 Ex. 1.6–1.8 |
| **Comparaison d'estimateurs par variance asymptotique, efficacité asymptotique de l'EMV, médiane** | 0 / 1 | 1,25 pt | ch.6 §1.11, ch.7 | PC7 Ex. 1, 5 ; PC6 Ex. 1, 6 ; ch.7 Ex. 1.9 |
| **Classifieur de Bayes, fonction de régression, excès de risque, plug-in** | 1 / 1 (CC Ex. 5 ; Ex. 3 Q1–3) | 2,5 / 1,75 | ch.8 | PC8 Ex. 1, 2, 5, 7 |
| **Analyse d'un algorithme d'apprentissage** ($k$-NN / 1-NN : biais-variance, bornes, dimension) | 1 / 1 | 2,5 / 4,25 | ch.8, ch.9 | PC8 Ex. 3 (LDA), PC9 Ex. 1, 4, 7 ; EN |
| **QCM / réponses courtes DM-EN** (régression multiple, tests de Student/Fisher, tests multiples, ACP, LDA/QDA/logistique, diagnostic de résidus) | 0 / 1 | 3 pts | ch.1–5 + ch.8 + DM/EN | PC2 Ex. 1, PC3 Ex. 2, PC4 Ex. 5, PC5 Ex. 4, PC8 Ex. 3 |

**Ce qui n'est jamais tombé** (mais figure dans le poly) : inégalité de Hoeffding et bornes ERM sur classe finie (ch.9 Thm 1.3–1.8), no free lunch, convexification / φ-risque (ch.9 §1.4), divergence de Kullback-Leibler (ch.2 §1.4), théorèmes généraux de consistance des M/Z-estimateurs (ch.7 Thm 1.1–1.5), intervalle de Wilson/Wald, tests asymptotiques (Student asymptotique).

---

## 4. Questions de cours récurrentes (à savoir énoncer tels quels)

Les items marqués ● sont tombés tels quels ; ○ sont utilisés implicitement dans les problèmes et susceptibles d'être demandés.

1. ● **Borne de Cramér-Rao** — ch.3 Thm 1.1 : modèle régulier, $\Theta$ ouvert, $g$ dérivable, $T$ sans biais **et régulier** : $\mathrm{Var}_\theta(T)\ge\nabla g(\theta)^\top I(\theta)^{-1}\nabla g(\theta)$ ; Cor. 1.1 (cas scalaire $g'(\theta)^2/I(\theta)$), Cor. 1.3 ($n$-échantillon : $\frac1n\nabla g^\top I_1^{-1}\nabla g$). Définitions associées : score (Déf. 1.7), information de Fisher $I(\theta)=\mathbb E_\theta[SS^\top]=\mathrm{Var}_\theta(S)=-\mathbb E_\theta[H_\ell]$ (Déf. 1.8, Prop. 1.2), additivité $I_n=nI_1$, efficacité (Déf. 1.10). Exemples à connaître par cœur : $I(\theta)=1/\theta^2$ (exponentiel), $1/\theta$ (Poisson), $1/(\theta(1-\theta))$ (Bernoulli), $\mathrm{diag}(1/\sigma^2,1/(2\sigma^4))$ (gaussien).
2. ● **Théorème de Neyman-Pearson** — ch.5 Thm 1.1 : deux hypothèses simples, absence d'atome du rapport de vraisemblance ; (i) existence de $c_\alpha$ tel que $\phi^\star=\mathbf 1\{p_{\theta_1}>c_\alpha p_{\theta_0}\}$ soit de taille exactement $\alpha$ ; (ii) $\phi^\star$ UPP($\alpha$) et $\beta_{\phi^\star}(\theta_1)\ge\alpha$. Preuve à savoir refaire (inégalité clé $(\phi^\star-\phi)(p_{\theta_1}-c_\alpha p_{\theta_0})\ge0$). Thm 1.2 : unicité p.s.
3. ● **p-valeur** — ch.4 Déf. 2.4 (famille emboîtée, $\hat\alpha(Z)=\inf\{\alpha:Z\in R_\alpha\}$), Prop. 2.1 (calcul pratique : $\inf\{\alpha:T(Z)\ge c_\alpha\}$), Prop. 2.2 (sous $H_0$, dominée stochastiquement par $\mathcal U([0,1])$, uniforme si le niveau est atteint), §2.8 (six erreurs d'interprétation).
4. ○ **Famille à rapport de vraisemblance monotone et test UPP unilatéral** — ch.5 Déf. 1.4/1.5 (factorisation $p_\theta(z)=h(z)\psi(T(z);\theta)$, $t\mapsto\psi(t;\theta)/\psi(t;\theta')$ strictement monotone pour $\theta>\theta'$), Thm 1.3/1.4 ($T(Z)$ à densité ; $\phi=\mathbf 1\{T>d_\alpha\}$ ou $\mathbf 1\{T<d_\alpha\}$, $P_{\theta_0}(\cdot)=\alpha$ ; puissance croissante), Méthode 1.3 (trois conditions : paramètre scalaire, hypothèse unilatérale, RVM). Prop. 1.1 : pas de test UPP bilatéral dans une famille exponentielle.
5. ○ **Test pur, fonction puissance, taille, niveau, erreurs de 1re/2e espèce** — ch.4 Déf. 2.1–2.3 ; ch.5 Déf. 1.1–1.2 (UPP).
6. ○ **Théorème de Gosset** — ch.1 Thm 1.3 : $\bar X_n\sim\mathcal N(\mu,\sigma^2/n)$, $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$, indépendance, $\sqrt n(\bar X_n-\mu)/S_n\sim t(n-1)$. **Théorème de Cochran** — Thm 1.1/1.2 : projections orthogonales d'un vecteur $\mathcal N(\mu,\sigma^2I_n)$ indépendantes, normes $\chi^2(d_i)$.
7. ○ **Région de confiance, fonction pivotale, construction** — ch.4 Déf. 1.1, Déf. 1.2, Prop. 1.1, Méthode 1.1 ; interprétation fréquentiste (« qui est aléatoire ? »).
8. ○ **Biais, risque, décomposition biais-variance, admissibilité** — ch.3 Déf. 1.1–1.4, Prop. 1.1.
9. ○ **EMV, équations de vraisemblance, invariance par reparamétrisation** — ch.2 Déf. 1.4–1.6, Prop. 1.2. **Méthode des moments** — Déf. 1.2 et cas à deux moments (Ex. 1.5).
10. ○ **Consistance, normalité asymptotique, variance asymptotique** — ch.6 Déf. 1.2, 1.6 ; **LGN** Thm 1.2 ; **TCL** Thm 1.6 ; **Slutsky** Lemme 1.1 ; **méthode-δ** Thm 1.7 (scalaire, $\sqrt n(g(T_n)-g(\theta))\Rightarrow g'(\theta)G$) et Thm 1.8 (vectorielle, $J_g\Sigma J_g^\top$) ; **théorème de continuité** Thm 1.1 ; **transformation continue** Thm 1.4 ; pivot asymptotique et IC asymptotique (Déf. 1.7–1.8, Méthode 1.1) ; comparaison par variance asymptotique (Prop. 1.3).
11. ○ **Normalité asymptotique et optimalité asymptotique de l'EMV** — ch.7 Thm 1.6–1.7 ($\sqrt n(\hat\theta^{MV}_n-\theta)\Rightarrow\mathcal N(0,1/I(\theta))$, $v_\psi\ge1/I$ pour tout Z-estimateur régulier) ; loi limite de la médiane (Ex. 1.9, Compl. §4.8 : $1/(4q_{\theta}(\theta)^2)$).
12. ● **Classifieur de Bayes, fonction de régression, excès de risque** — ch.8 Déf. 1.2–1.5, Thm 1.2 (avec preuve), Prop. 1.5 et inégalité $R(\tilde g)-R^\star\le2\mathbb E|\eta-\tilde\eta|$.
13. ○ **Minimisation du risque empirique, décomposition approximation/estimation, sur-apprentissage, Hoeffding** — ch.9 Déf. 1.1, Thm 1.2–1.3, Thm 1.6/1.8 (bornes en $\sqrt{\log|\mathcal C|/n}$).

---

## 5. Méthodes attendues et rédaction type

### 5.1 « Montrer que la famille est à rapport de vraisemblance monotone »
1. Écrire la densité du $n$-échantillon $p_\theta(z)=\prod_iq_\theta(x_i)$ et la **factoriser** sous la forme $h(z)\,\psi(T(z);\theta)$ : isoler tout ce qui ne dépend pas de $\theta$ dans $h$, nommer la statistique $T(z)$ (souvent $\sum x_i$, $\sum x_i^c$, $\sum x_i^2$, $\max x_i$).
2. Pour $\theta>\theta'$, calculer $t\mapsto\psi(t;\theta)/\psi(t;\theta')$ et montrer qu'il est **strictement monotone** (en général une exponentielle $e^{t\,[a(\theta)-a(\theta')]}$ : le signe de $a(\theta)-a(\theta')$ donne le sens). Dire explicitement « croissant » ou « décroissant ».
3. Conclure : « la famille est à RVM croissant (resp. décroissant) en $T$ au sens de la Déf. 1.4 (resp. 1.5) ch.5 ».

### 5.2 « Construire un test UPP($\alpha$) pour $H_0:\theta\le\theta_0$ contre $H_1:\theta>\theta_0$ »
1. Vérifier les trois conditions de la Méthode 1.3 ch.5 : paramètre scalaire, hypothèse unilatérale, RVM en $T$ ; vérifier que $T(Z)$ est à densité (pas d'atome) — sinon tests randomisés (Compl.).
2. Écrire la fonction critique : $\phi(Z)=\mathbf 1\{T(Z)>d_\alpha\}$ si RVM croissant ($\mathbf 1\{T<d_\alpha\}$ si décroissant), **le seuil étant calibré à la borne $\theta_0$** : $P_{\theta_0}(T(Z)>d_\alpha)=\alpha$.
3. Identifier la **loi de $T(Z)$ sous $P_{\theta_0}$** (additivité Gamma/χ², Gosset, binomiale…), construire le pivot ($\theta_0T$, $2\theta_0T$, $T/\theta_0$ selon la convention) et exprimer $d_\alpha$ par un quantile : « $d_\alpha=g_{n,1-\alpha}/\theta_0$ où $g_{n,\beta}$ est le quantile d'ordre $\beta$ de $\Gamma(n,1)$ ».
4. Citer le théorème : « par le Thm 1.3 ch.5, ce test est UPP($\alpha$) et sa fonction puissance est croissante, donc sa taille vaut $\beta_\phi(\theta_0)=\alpha$ ».
5. Si demandé : fonction puissance $\beta_\phi(\theta)=P_\theta(T>d_\alpha)=1-F_{\text{pivot}}(\theta d_\alpha)$ en utilisant que $\theta T$ a une loi fixe sous $P_\theta$.

### 5.3 « Test de Neyman-Pearson de $\theta_0$ contre $\theta_1$ »
Rapport $r(z)=p_{\theta_1}(z)/p_{\theta_0}(z)$ → fonction monotone de $T(z)$ (préciser le sens selon $\theta_1\gtrless\theta_0$) → région $\{r>c_\alpha\}=\{T\gtrless d_\alpha\}$ → absence d'atome → seuil par quantile sous $P_{\theta_0}$ → « de taille exactement $\alpha$ et UPP($\alpha$) par le Thm 1.1 ch.5 ». Remarquer si le seuil ne dépend pas de $\theta_1$ (⇒ UPP pour l'alternative composite).

### 5.4 « Calculer la borne de Cramér-Rao »
Densité → $\ell(\theta,x)=\log q_\theta(x)$ → score $\partial_\theta\ell$ (vérifier $\mathbb E_\theta[S]=0$) → $I_1(\theta)=\mathrm{Var}_\theta(S)$ ou $-\mathbb E_\theta[\partial^2_\theta\ell]$ (plus court) → $I_n=nI_1$ → borne $\frac{g'(\theta)^2}{nI_1(\theta)}$ en précisant « pour tout estimateur **sans biais et régulier** de $g(\theta)$, dans un modèle régulier » → comparer à la variance d'un estimateur candidat (efficace ?) ; en dimension $d$, inverser la matrice $I(\theta)$ et prendre $\nabla g^\top I^{-1}\nabla g$ (PC3 Ex. 2).

### 5.5 « Déterminer l'EMV »
Log-vraisemblance (écarter les termes constants en $\theta$) → **équations de vraisemblance** $\nabla_\vartheta\ell_n=0$ → résoudre → **vérifier que c'est un maximum global** (stricte concavité, étude de signe de la dérivée, ou $\ell_n\to-\infty$ au bord) → cas non dérivable (uniforme : $X_{n:n}$) ou contraint (PC7 Ex. 4) → invoquer l'**invariance** (Prop. 1.2 ch.2) pour une reparamétrisation. Pour un modèle « transformé » ($\ln X$, $X^c$), passer au modèle induit (ch.1 Déf. 5) : les vraisemblances diffèrent d'un facteur indépendant de $\theta$.

### 5.6 « Biais et risque quadratique »
Identifier la loi exacte de l'estimateur (Gosset : $\bar X_n$ gaussienne, $(n-1)S_n^2/\sigma^2\sim\chi^2(n-1)$ ; Gamma pour $\sum X_i$ ; Beta/loi de $X_{n:n}$ pour l'uniforme) → $\mathbb E_\theta[T]-g(\theta)$ → $R=\mathrm{Var}+\text{biais}^2$ (Prop. 1.1 ch.3) → pour comparer deux estimateurs, tracer/encadrer $R_1(\theta)-R_2(\theta)$ **pour tout $\theta$** ; conclure à l'inadmissibilité si domination uniforme et stricte en un point (Déf. 1.4). Astuce CC 2022 : écrire $\bar X_n=\mu+\sigma G/\sqrt n$ et développer avec $\mathbb E[G^3]=0$, $\mathbb E[G^4]=3$.

### 5.7 « IC non asymptotique par pivot »
Exhiber $G(Z;\theta)$ dont la loi $Q$ ne dépend pas de $\theta$ → nommer $Q$ et ses quantiles → choisir $A_\alpha$ avec $Q(A_\alpha)\ge1-\alpha$ (bilatéral symétrique $[q_{\alpha/2},q_{1-\alpha/2}]$ ou unilatéral) → **résoudre en $\theta$** l'appartenance (attention au sens des inégalités lors d'une inversion : $\sigma^2$, $\lambda$) → écrire « $C(Z)=\{\dots\}$ est une région de confiance de niveau de couverture $1-\alpha$ (Prop. 1.1 ch.4) ». Ne jamais écrire « $P(\theta\in[a,b])=1-\alpha$ » avec des bornes numériques.

### 5.8 « IC asymptotique par méthode-δ » (Méthode 1.1 ch.6)
TCL : $\sqrt n(\bar T_n-e(\theta))\Rightarrow\mathcal N(0,\sigma^2(\theta))$ → $\hat\theta_n=g(\bar T_n)$ avec $g=e^{-1}$ dérivable, $g'\ne0$ → méthode-δ : $\sqrt n(\hat\theta_n-\theta)\Rightarrow\mathcal N(0,v(\theta))$, $v=g'(e(\theta))^2\sigma^2(\theta)$ → consistance de $v(\hat\theta_n)$ (continuité) → Slutsky : $\sqrt n(\hat\theta_n-\theta)/\sqrt{v(\hat\theta_n)}\Rightarrow\mathcal N(0,1)$ → $\big[\hat\theta_n\pm z_{1-\alpha/2}\sqrt{v(\hat\theta_n)/n}\big]$, « de niveau **asymptotique** $1-\alpha$ ». Variantes : stabilisation de la variance (Ex. 1.13 ch.6), résolution directe de l'inégalité (PC6 Ex. 1).

### 5.9 « Consistance »
Soit Markov/Tchebychev avec un risque quadratique $\to0$ ; soit LGN sur les moments empiriques puis théorème de continuité ($e^{-1}$ continue) ; soit « asymptotiquement normal ⇒ consistant » (Slutsky avec $1/\sqrt n$). Pour une différence/somme : Slutsky.

### 5.10 « Normalité asymptotique d'un vecteur » (Ex. 2 Q7, Q9)
Centrer les moyennes empiriques, écrire le vecteur $W_i$, calculer sa matrice de covariance $\Sigma$ (moments), **TCL multivarié**, puis méthode-δ vectorielle avec la jacobienne $J_g$ : covariance limite $J_g\Sigma J_g^\top$. Pour la variance empirique : décomposition $\hat\sigma^2_n=\frac1n\sum(X_i-\mu)^2-(\bar X_n-\mu)^2$ et Slutsky (Ex. 1.6 ch.6).

### 5.11 « Classifieur de Bayes et excès de risque » (ch.8)
Conditionner par $X$ : $R(g)=\mathbb E[\mathbf 1_{g(X)=-1}\eta(X)+\mathbf 1_{g(X)=1}(1-\eta(X))]$ → réécrire $=\mathbb E[\mathbf 1_{g(X)=-1}(2\eta-1)]+\mathbb E[1-\eta]$ → différence de deux classifieurs $=\mathbb E[D(2\eta-1)]$, $D\in\{-1,0,1\}$ → étude de cas. Plug-in : sur $\{\tilde g\ne g^\star\}$, $|\eta-\tfrac12|\le|\eta-\tilde\eta|$. Pour une règle apprise : **conditionner par $D_n$**, Fubini-Tonelli, convergence dominée (bornes par 1).

### 5.12 « Décomposition biais/variance d'un estimateur de régression » (Ex. 3 Q8)
Conditionner par le design $X_{1:n}$ : $\mathbb E[(\hat\eta-\eta)^2]=\mathbb E[\mathrm{Var}(\hat\eta|X_{1:n})]+\mathbb E[(\mathbb E[\hat\eta|X_{1:n}]-\eta)^2]$ ; variance $\le\frac1{4k}$ (Bernoulli), biais $\le L\times$ (distance aux voisins) (Lipschitz) ; contrôle du rayon via la loi Beta de $F_x(\mathfrak R_k)$ et Jensen ; optimiser en $k$.

---

## 6. Pièges et erreurs classiques

1. **Conventions Gamma.** Poly et Examen 2025 : $\Gamma(a,b)$ avec **intensité** $b$ ($\mathbb E=a/b$, $\chi^2(p)=\Gamma(p/2,1/2)$, $\mathcal E(\theta)=\Gamma(1,\theta)$). CC 2022 : paramètre **d'échelle** ($\mathbb E=p\lambda$, $\chi^2(n)=\mathrm{Gamma}(n/2,2)$, $Y/\lambda\sim\mathrm{Gamma}(p,1)$). Toujours relire l'en-tête du sujet et écrire la densité utilisée. De même, « exponentielle de paramètre $\theta$ » signifie intensité $\theta$ dans le poly et l'Examen 2025 Ex. 1 ($\theta e^{-\theta x}$), mais **échelle** dans PC4 Ex. 1 / PC5 Ex. 1 / CC 2022 ($\theta^{-1}e^{-x/\theta}$) : le sens de la monotonie du RVM et la direction de la région de rejet s'inversent.
2. **Sens de la région de rejet.** Pour $H_1:\theta>\theta_0$ on rejette du côté où la statistique rend $H_1$ plus vraisemblable : grandes valeurs de $\sum X_i$ si $\theta$ est une échelle, **petites** valeurs si $\theta$ est une intensité. Le seuil se calibre toujours à la **borne** $\theta_0$ de $H_0$.
3. **Niveau / taille / puissance.** Taille $=\sup_{\Theta_0}\beta_\phi$ (un nombre attaché au test) ; niveau $\alpha$ = contrainte $\alpha(\phi)\le\alpha$ ; puissance $=\beta_\phi(\theta)$ pour $\theta\in\Theta_1$ ; risque de 2e espèce $=1-\beta_\phi$. Un test UPP est de taille exactement $\alpha$ (sauf exception PC5 Ex. 4). Ne pas confondre « niveau $\alpha$ » et « $P(H_0\text{ vraie})=\alpha$ ».
4. **p-valeur.** Ce n'est ni $P(H_0)$ ni $P(H_1)$ ni la probabilité de se tromper ; c'est une probabilité sur l'observation **sous $H_0$**, le plus petit niveau de rejet. « Ne pas rejeter » ≠ « accepter/prouver $H_0$ » (vocabulaire recommandé : « on échoue à rejeter »). Significatif ≠ effet important (taille d'effet, Ex. 2.14 ch.4).
5. **Hypothèses de régularité** pour Cramér-Rao : modèle régulier (support indépendant de $\theta$ !), $\Theta$ ouvert, estimateur **sans biais et régulier**. Le modèle uniforme $\mathcal U([0,\theta])$ n'est pas régulier (vitesse $1/n$, loi limite exponentielle, ch.6 Ex. 1.5 ; Pareto PC6 Ex. 2). L'EMV $1/\bar X_n$ de l'exponentielle est biaisé : la borne ne borne pas sa variance à $n$ fixé.
6. **Biais de l'EMV de la variance** : $\widehat{\sigma^2}_{ML}=\frac{n-1}nS_n^2$, biais $-\sigma^2/n$ ; en régression simple, $n\hat\sigma^2/\sigma^2\sim\chi^2(n-2)$ (et non $n-1$) ; en régression multiple $\chi^2(n-p)$.
7. **Méthode-δ dégénérée** : si $g'(\theta)=0$ (CC 2022 Ex. 2 Q7, $\mu=0$), la vitesse n'est plus $\sqrt n$ et la loi limite n'est plus gaussienne ($\chi^2$) ; réécrire explicitement.
8. **Slutsky** demande une limite **constante** pour l'un des deux termes ; la convergence en loi jointe ne découle pas des convergences marginales en général (sauf indépendance ou constante).
9. **Méthode des moments à deux paramètres** : il faut autant d'équations que d'inconnues ; vérifier que la solution est dans $\Theta$ ($\widehat{\sigma^2}_{Mom}>0$ par Cauchy-Schwarz) ; la variance asymptotique se calcule par la méthode-δ **vectorielle** (jacobienne, pas une simple dérivée).
10. **Interprétation d'un IC** : la probabilité porte sur l'intervalle aléatoire, pas sur $\theta$ ; $[0,2]$ numérique « contient $\theta$ avec probabilité 0,95 » est un non-sens. Niveau asymptotique ≠ couverture à $n$ fini (Wald vs Wilson).
11. **Inversion d'inégalités** dans les IC pour $\sigma^2$ ou un paramètre d'échelle : $a\le\frac{c}{\sigma^2}\le b\iff\frac cb\le\sigma^2\le\frac ca$.
12. **Indépendance via Cochran** : vérifier que les deux statistiques sont fonctions de projections sur des sous-espaces **orthogonaux** (ex. $v\in\mathrm{Vect}(X)$ et $(I-H)Y$) ; $\bar X_n$ et $S_n^2$ ne sont indépendantes que dans le cas gaussien.
13. **Statistiques d'ordre** : jacobien $n!$ ; densité jointe $n!\,p_\theta(y)\mathbf 1\{y_1<\dots<y_n\}$ ; $F(X_{k:n})\sim\mathrm{Beta}(k,n-k+1)$.
14. **Apprentissage** : ne pas oublier le double aléa (point de test $(X,Y)$ **et** $D_n$) ; $R(\hat g_n)$ est une variable aléatoire, on majore $\mathbb E_n[R(\hat g_n)]$ ; excès de risque $\ge0$ par optimalité de Bayes ; sur $\{\eta=1/2\}$ le classifieur de Bayes n'est pas unique.
15. **QCM à points négatifs** : $-0{,}5$ par erreur ; ne répondre que si l'on est sûr ; une seule réponse valide.
16. **Notations du sujet ≠ poly** : $\mathrm{Gqf}_n$, $\mathrm{Gcdf}_n$, $\mathfrak R_k(x)$, $F_x$, $\mathbb E_n$ vs $\mathbb E$ ; les redéfinir en tête de copie.

---

## 7. Correspondance chapitre ↔ type d'exercice ↔ PC

| Ch. | Titre | Types d'exercices d'examen observés / probables | Annales | PC qui l'entraînent |
|---|---|---|---|---|
| 1 | Modèles statistiques | Modèle induit et changement de variables (loi de $X^c$, $\ln X$) ; densité jointe des statistiques d'ordre ; théorèmes de Gosset et de Cochran (lois de $\bar X_n$, $S_n^2$, $\hat\beta$, $\hat\sigma^2$) ; vecteurs gaussiens | CC Ex. 1 Q1, Ex. 2 Q1, Ex. 3 Q1–6, Ex. 4 Q2–3, 7 ; 2025 Ex. 2 Q1, 3–5, Ex. 3 Q6 | PC1 Ex. 1–4 ; PC3 Ex. 5 ; PC4 Ex. 2 Q4–6 |
| 2 | Estimation ponctuelle | EMV (score, maximum global, invariance, cas non dérivable) ; méthode des moments (1 ou 2 moments) ; régression linéaire | CC Ex. 4 Q1 ; 2025 Ex. 2 Q2, Q9(a), Ex. 4 Q1, Q9 | PC2 Ex. 1, 2, 3 ; PC6 Ex. 1 Q1 ; PC7 Ex. 2–4 |
| 3 | Théorie de la décision | Biais, variance, risque quadratique, admissibilité ; score, information de Fisher, Cramér-Rao, efficacité | CC Ex. 2 Q2–4 ; 2025 Ex. 1 Q1, Ex. 2 Q3–4, Ex. 4 Q11 | PC3 Ex. 1–5 ; PC7 Ex. 2 Q2 |
| 4 | Régions de confiance et tests | IC par pivot (χ², Gamma, Fisher) ; région de confiance quadratique (Fieller) ; test pur, taille, puissance, p-valeur ; interprétation | CC Ex. 1 Q4, Ex. 3 Q5, 7, 9, Ex. 4 Q8–9 ; 2025 Ex. 1 Q3, Ex. 2 Q5, Ex. 4 Q6 | PC4 Ex. 1–7 ; PC2 Ex. 1 Q7 |
| 5 | Optimalité des tests | Neyman-Pearson ; RVM et test UPP unilatéral ; fonction puissance ; absence de test UPP bilatéral ; RVG/Fisher | CC Ex. 1 Q2–4 ; 2025 Ex. 1 Q2, Ex. 4 Q4, Q12 | PC5 Ex. 1–7 ; PC4 Ex. 4 |
| 6 | Statistiques asymptotiques | Consistance ; TCL (multivarié) ; Slutsky ; méthode-δ ; loi limite de $\hat\sigma^2$ ; IC asymptotique ; comparaison par variance asymptotique | CC Ex. 2 Q5–7 ; 2025 Ex. 2 Q6–10 | PC6 Ex. 1–7 ; PC7 Ex. 2–3 |
| 7 | M- et Z-estimateurs | Normalité asymptotique de l'EMV, $1/I(\theta)$, efficacité asymptotique ; médiane empirique vs EMV ; robustesse | 2025 Ex. 2 Q7–8, Q10 | PC7 Ex. 1–5 |
| 8 | Introduction à l'apprentissage statistique | Classifieur de Bayes (preuve), excès de risque, borne plug-in $2\mathbb E\vert \eta-\hat\eta\vert $, convergence du risque d'une règle apprise ; LDA/QDA/logistique ; 1-NN / $k$-NN | CC Ex. 5 ; 2025 Ex. 3 Q1–5, Ex. 4 Q8 | PC8 Ex. 1–7 |
| 9 | Approche discriminative / ERM | Compromis biais-variance / approximation-estimation, choix de $k$, fléau de la dimension ; (non tombé : Hoeffding, bornes sur classe finie, no free lunch, convexification) | 2025 Ex. 3 Q8–9 | PC9 Ex. 1–7 |
| DM/EN | Régression multiple, tests de Student/Fisher, tests multiples, résidus, deux échantillons, ACP | QCM | 2025 Ex. 4 | PC2 Ex. 1, PC3 Ex. 2, PC4 Ex. 5, PC5 Ex. 4 |

---

## 8. Priorisation des chapitres par rentabilité

Poids estimés en % des points de l'Examen 2025 (format actuel), en attribuant chaque question au chapitre dont elle mobilise l'outil principal ; le CC 2022 est utilisé comme second indicateur de récurrence.

| Rang | Chapitre | Poids 2025 | Poids CC 2022 | Argument |
|---|---|---|---|---|
| 1 | **ch.6 Statistiques asymptotiques** | ≈ 18 % | ≈ 10 % | Cœur du problème « estimation » (consistance, TCL multivarié, δ-méthode vectorielle, Slutsky, comparaison de variances asymptotiques) ; chaque question vaut cher et la méthode est **toujours la même** : très rentable à automatiser. |
| 2 | **ch.8 Apprentissage statistique** | ≈ 17 % | ≈ 12 % | Un problème entier à chaque fois ; les trois premières questions (Bayes, excès de risque, plug-in) sont du cours **récité** (Thm 1.2 + PC8 Ex. 2/7) : points quasi garantis. |
| 3 | **ch.5 Optimalité des tests** | ≈ 10 % | ≈ 20 % | Neyman-Pearson et RVM tombent à chaque session (cours 2025, problème 2022) ; marche à suivre en 5 étapes (§5.2). |
| 4 | **ch.3 Théorie de la décision** | ≈ 10 % | ≈ 15 % | Cramér-Rao (question de cours 2025), biais/variance/risque (les deux sujets), admissibilité (2022). Calculs courts et standard. |
| 5 | **ch.4 Régions de confiance et tests** | ≈ 10 % | ≈ 17 % | p-valeur (3 sous-questions 2025), IC par pivot (toujours une question), interprétations — où l'on perd bêtement des points de vocabulaire. |
| 6 | **ch.1 Modèles statistiques** (Gosset/Cochran, changement de variables, statistiques d'ordre) | ≈ 9 % | ≈ 22 % | Outil transversal plutôt que sujet en soi ; très présent en 2022 (ordre, régression). Gosset et Cochran doivent être **cités** sans hésiter. |
| 7 | **ch.9 ERM** | ≈ 12 % (Ex. 3 Q8–9) | 0 % | Les questions les plus difficiles de 2025 (biais-variance du $k$-NN, choix de $k$) ; rentabilité moyenne : coûteuses en temps, mais le raisonnement est générique. Hoeffding/bornes finies jamais tombés mais plausibles en question de cours. |
| 8 | **ch.2 Estimation ponctuelle** | ≈ 6 % | ≈ 4 % | EMV et moments : indispensables comme **point d'entrée** des problèmes (une erreur en Q2 se propage), mais peu de points propres. |
| 9 | **ch.7 M/Z-estimateurs** | ≈ 6 % | 0 % | Seuls l'énoncé $\sqrt n(\hat\theta^{MV}-\theta)\Rightarrow\mathcal N(0,1/I)$, l'optimalité asymptotique et la loi limite de la médiane servent ; les théorèmes généraux de consistance (Thm 1.1–1.5) n'ont jamais été demandés. |
| — | **DM/EN (QCM)** | ≈ 15 % | 0 % | Rendement maximal par minute (15–20 min pour 3 pts) ; réviser régression multiple (DM1), tests de Student/Fisher, Bonferroni, ACP, LDA/QDA/logistique, lecture de résidus. |

**Lecture** : ch.6 + ch.8 + ch.5 + ch.3 + ch.4 ≈ 65 % des points avec des méthodes stéréotypées ; y ajouter les réflexes du ch.1 (Gosset/Cochran) et le QCM couvre ≈ 90 %. Les compléments « hors programme » ne sont jamais tombés.

---

## 9. Recommandations pour l'examen blanc du site

**Structure (calquée sur 2025)** — 4 exercices indépendants, 3 h, 20 points, barème affiché :

1. **Exercice 1 — Questions de cours (4 pts, 20 min)** sur un modèle régulier à un paramètre tiré parmi {exponentiel (intensité), Poisson, Bernoulli, $\mathcal N(\theta,1)$, $\mathcal N(0,\theta)$} : (a) information de Fisher et borne de Cramér-Rao pour $g(\theta)$ donné (1 pt) ; (b) test de Neyman-Pearson ou test UPP unilatéral par RVM avec seuil explicite par quantile (1,5 pt) ; (c) p-valeur : définition, expression, interprétation d'une valeur numérique, ce qu'elle n'est pas (1,5 pt). Variante : énoncé + preuve du Thm de Neyman-Pearson, ou énoncé de Gosset/Cochran.

2. **Exercice 2 — Problème d'estimation (7 pts, 65 min), 9–10 questions** sur un modèle « transformé » du gaussien/exponentiel (log-normale, Weibull $X^c$, Pareto $\ln(X/\alpha)$, $\Gamma(2,\theta)$, exponentielle translatée) : densité par changement de variable → EMV (score + maximum global) → biais/variance exacts via Gosset ou Gamma → IC exact par pivot → consistance → normalité asymptotique (TCL multivarié + Slutsky) → estimateur concurrent (médiane ou moments) → δ-méthode vectorielle → comparaison des variances asymptotiques et discussion (robustesse, queues lourdes). Inclure une question d'admissibilité ou de δ-méthode dégénérée (CC 2022 Ex. 2).

3. **Exercice 3 — Problème d'apprentissage (6 pts, 55 min), 8–9 questions** : classifieur de Bayes (preuve), excès de risque, borne plug-in (3 questions de cours, 1,75 pt) ; puis analyse d'une méthode : $k$-NN avec autre hypothèse (Hölder), classifieur par histogramme (ch.9 Compl. §4.3), LDA (PC8 Ex. 3), 1-NN (Cover-Hart), ou ERM sur classe finie avec Hoeffding (ch.9 Thm 1.6–1.8) ; terminer par le choix d'un hyperparamètre et le comportement en grande dimension.

4. **Exercice 4 — QCM / réponses courtes (3 pts, 15–20 min), 12 items à 0,25 pt, $-0{,}5$ par QCM faux** : 7 QCM (EMV des moindres carrés, degrés de liberté, loi de $\hat\beta$, statistique de Student à variances égales, test de Fisher pour les variances, BLUE/efficacité, p-valeur uniforme sous $H_0$) + 5 réponses courtes (résidus standardisés, tests multiples/Bonferroni, ACP, LDA vs QDA vs logistique, formulation $H_0/H_1$ + statistique pour un effet dans une régression multiple).

**Barème et correction** : attribuer des points aux **justifications** (citation du théorème avec ses hypothèses : « par Gosset », « par Slutsky (iii) », « le rapport est sans atome ») ; pénaliser la confusion niveau/puissance et les interprétations fausses de la p-valeur ; accepter les résultats admis pour avancer. Prévoir une **grille de temps** et un **avertissement sur les conventions Gamma/exponentielle** en tête de sujet, reproduisant la page de rappels de 2025 (Gamma, Beta/Binomiale, Laplace gaussienne, TCL quantile, TCL multivarié) — ces rappels sont eux-mêmes des indices à apprendre à décoder.

**Entraînement conseillé avant l'examen blanc** : PC5 Ex. 1 + PC4 Ex. 1 (tests Gamma), PC7 Ex. 2–3 + PC6 Ex. 1 (chaîne estimation complète), PC2 Ex. 1 + PC3 Ex. 2 + PC4 Ex. 5 (modèle linéaire gaussien), PC8 Ex. 2–3–7 et PC9 Ex. 4 (apprentissage), CC 2022 en entier (3 h chrono).
