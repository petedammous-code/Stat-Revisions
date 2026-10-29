# Chapitre 7 — Théorie asymptotique des M- et Z-estimateurs

> **Sources extraites :** `S7_APM41033-Week7-Cours` (poly p. 7–29 : introduction p. 7–8, §1 « Les fondamentaux » p. 9–29), `S7_APM41033-Week7-Maths` (§2 « Les outils mathématiques », p. 30–32), `S7_APM41033-Week7-Compléments` (§4 « Les compléments », p. 34–41, **hors programme d'examen** : « Les contenus de cette partie ne sont pas exigibles »).
> **Pas de fichier « Exercices » pour ce chapitre** dans les sources fournies : la §1.8 du poly (p. 29) décrit seulement le « programme des exercices » (5 exercices de la feuille de la semaine 7). Les énoncés/corrigés existent sous la forme `S7_APM-41033-EP-PC7-enonce` / `S7_APM-41033-EP-PC7-corrige` mais **n'ont pas été extraits ici** (hors du périmètre de cette tâche) ; voir §4.
> **Numérotation du poly :** les éléments encadrés sont numérotés « N.M » où N est la *section* du chapitre : §1 « Les fondamentaux » (Définitions 1.1–1.4, **Cadre 1.1**, Exemples 1.1–1.10, Proposition 1.1, Théorèmes 1.1–1.7, Lemme 1.1, Corollaire 1.1), §2 « Les outils mathématiques » (Théorème 2.1, Lemmes 2.1–2.2), §4 « Les compléments » (Théorèmes 4.1–4.5, Exemple 4.1, Définition 4.1, Lemme 4.1). Il n'y a **pas de §3** dans les fichiers fournis (la §3 « Les exercices » serait la feuille de PC ; la page 33 est absente). Les équations sont numérotées (1)–(11) dans la partie Cours et (12) dans les outils. On cite donc « Poly ch.7, Th. 1.4 », « Poly ch.7, éq. (3) ».
> **Pages :** pagination du poly complet (en-têtes de page). PDF Cours : page PDF $k$ = page poly $k+6$ (p. 7–29) ; PDF Maths = p. 30–32 ; PDF Compléments = p. 34–41.
> **ATTENTION — collisions de numérotation avec les autres chapitres.** Le poly renvoie très souvent à des résultats d'autres chapitres **avec le même numéro** qu'un résultat de ce chapitre. Règle de lecture (vérifiée par le contexte et par la §2.4 du poly) :
> - « théorème 1.6 » invoqué comme **TCL** = Th. 1.6 du **chapitre 6** (≠ Th. 1.6 du ch.7 = normalité asymptotique de l'EMV) ;
> - « lemme 1.1 » invoqué comme **lemme de Slutsky** = Lemme 1.1 du **ch.6** (≠ Lemme 1.1 du ch.7 = maximum isolé) ;
> - « théorème 1.4 » invoqué comme **théorème de transformation continue** = ch.6 (≠ Th. 1.4 du ch.7 = normalité asymptotique des Z-estimateurs) ;
> - « lemme 2.1 » invoqué comme **inégalité de Markov / Bienaymé-Tchebychev** = Lemme 2.1 du **ch.6** (≠ Lemme 2.1 du ch.7 = module de continuité) ;
> - « théorème 1.7 » invoqué comme **méthode-δ** (Ex. 1.10) = Th. 1.7 du **ch.6** (≠ Th. 1.7 du ch.7 = optimalité de l'EMV) ; dans la §4.5 des compléments, la méthode-δ est citée comme « théorème 1.8 » (incohérence interne du poly) ;
> - « définition 1.6 » = **modèle régulier** du **ch.3** (Déf. 1.4 et Cadre 1.1 du ch.7) ; mais la « normalité asymptotique (définition 1.6) » est celle du **ch.6** ;
> - « définition 1.7 » / « théorème 1.1 » à propos de **KL** = ch.2 ; « définition 1.2 » (consistance), « proposition 1.2 » (consistance de $S_n^2$), « proposition 1.3 » (comparaison par variance asymptotique), « définitions 1.9–1.11 » (tests asymptotiques), « exemples 1.5, 1.6, 1.14 » (support uniforme, variance empirique, Student) = **ch.6** ;
> - « proposition 1.2 » (propriétés du score), « proposition 2.1 » (Cauchy-Schwarz), « proposition 2.2 » (dérivation sous l'intégrale) = **ch.3** ;
> - « exemple 1.11 » (EMV du support d'une loi uniforme, vraisemblance non dérivable, cité p. 12) = autre chapitre (ch.2), il n'y a pas d'Exemple 1.11 au ch.7 ;
> - « théorème 2.1 » (LGN pour variables intégrables) = **ch.7**, Outils §2.1 (repris au ch.9 sous le nom « chapitre 7, théorème 2.1 »).
> **Renvois au « polycopié d'origine »** : le poly cite des théorèmes d'un polycopié antérieur (II-2.15, II-2.18, II-2.20, II-3.1, II-3.2, II-3.3, II-3.8) ; ce ne sont pas des numéros du présent poly.

---

## 0. Résumé en 10 lignes (ce qu'il faut retenir pour l'examen)

1. **Cadre** : expériences produit $(\mathsf{X}^n,\mathcal{X}^{\otimes n},\{\mathbb{P}_{n,\theta}:\theta\in\Theta\})$, $\mathbb{P}_{n,\theta}=\mathbb{Q}_\theta^{\otimes n}$, $\Theta\subseteq\mathbb{R}^d$ ; $\theta^\star$ = vraie valeur, $\theta$ = variable muette. **M-estimateur** (Déf. 1.1) : $\widehat{M}_n(\hat\theta_n)=\max_\theta \widehat{M}_n(\theta)$, $\widehat{M}_n(\theta)=\frac1n\sum_i m(\theta,X_i)$, avec $\mathsf{M}_{\theta^\star}(\theta)=\mathbb{E}_{\theta^\star}[m(\theta,X_1)]$ maximale en $\theta^\star$. **Z-estimateur** (Déf. 1.2) : $\widehat{\Psi}_n(\hat\theta_n)=0$, avec $\Psi_{\theta^\star}(\theta^\star)=0$.
2. **EMV = M-estimateur** pour $m=\log q_\theta$ car $\mathsf{M}_{\theta^\star}(\theta)=\mathrm{Ent}(q_{\theta^\star})-\mathrm{KL}(q_{\theta^\star},q_\theta)$ (Ex. 1.1). La moyenne empirique est Z-estimateur ($\psi=x-\theta$) et M-estimateur ($m=-\frac12(x-\theta)^2$) (Ex. 1.2–1.3). Huber, $\arctan$, $\operatorname{signe}$ (médiane) : robustes sans moment d'ordre 2 (Ex. 1.4). **M régulier ⇒ Z** avec $\psi=\nabla m$ si le max est intérieur (Prop. 1.1) ; réciproque fausse.
3. **Consistance (Th. 1.1)** : (H-1) $\sup_\theta|\widehat{M}_n-\mathsf{M}_{\theta^\star}|\to0$ en proba (convergence **uniforme**), (H-2) maximum **isolé** $\sup_{\|\theta-\theta^\star\|\ge\varepsilon}\mathsf{M}_{\theta^\star}(\theta)<\mathsf{M}_{\theta^\star}(\theta^\star)$, (H-3) $\hat\theta_n$ maximise $\widehat{M}_n$ ⇒ consistance. Preuve : $0\le \mathsf{M}_{\theta^\star}(\theta^\star)-\mathsf{M}_{\theta^\star}(\hat\theta_n)\le 2\sup|\widehat M_n-\mathsf M_{\theta^\star}|$.
4. **LGN uniforme (Th. 1.2)** : $K$ compact, $\theta\mapsto\phi(\theta,x)$ continue, $\int\sup_K|\phi|\,d\mathbb{Q}_{\theta^\star}<\infty$ ⇒ (H-1). Preuve : recouvrement fini par boules de rayon $\delta$ + module de continuité $w_\delta$ (Lemme 2.1) + LGN en un nombre fini de points.
5. **Cas compact (Lemme 1.1, Cor. 1.1)** : $\Theta$ compact, $m(\cdot,x)$ continue, domination $\int\sup_\Theta|m|\,d\mathbb{Q}_{\theta^\star}<\infty$, inégalité stricte $\mathsf{M}_{\theta^\star}(\theta)<\mathsf{M}_{\theta^\star}(\theta^\star)$ pour $\theta\ne\theta^\star$ ⇒ tout M-estimateur est consistant. **Z-estimateurs (Th. 1.3)** : même chose avec $\widehat M_n:=-\|\widehat\Psi_n\|$, (Hz-2) $\inf_{\|\theta-\theta^\star\|\ge\varepsilon}\|\Psi_{\theta^\star}(\theta)\|>0$.
6. **Identité clé (3)** : $\sqrt n(\hat\theta_n-\theta^\star)=-\sqrt n\,\widehat\Psi_n(\theta^\star)/(\widehat\Psi_n'(\theta^\star)+R_n)$ : **TCL** au numérateur, **LGN** au dénominateur, reste $R_n\to0$ (consistance + domination), **Slutsky** pour assembler.
7. **Th. 1.4 (Z, scalaire)** : (i) $\mathbb{E}_{\theta^\star}[\psi(\theta^\star,X_1)]=0$, $\mathbb{E}[\psi^2]<\infty$ ; (ii) $\psi$ $C^1$ près de $\theta^\star$, $\sup_{\mathcal V(\theta^\star)}|\psi'|\le g$ intégrable ; (iii) $\mathbb{E}[\psi']\ne0$ ⇒ $\sqrt n(\hat\theta_n-\theta^\star)\Rightarrow\mathcal N(0,v_\psi(\theta^\star))$, $v_\psi(\theta)=\dfrac{\mathbb{E}_\theta[\psi^2(\theta,X_1)]}{(\mathbb{E}_\theta[\psi'(\theta,X_1)])^2}$. **Th. 1.5 (M)** : idem avec $\psi=m'$, $\psi'=m''$. Seule la vitesse $\sqrt n$ donne une limite non dégénérée. $\theta^\star$ doit être **intérieur**.
8. **EMV (Th. 1.6)** : $\psi=\dot\ell$ ; grâce à $\mathbb{I}(\theta)=\mathbb{E}_\theta[\dot\ell^2]=-\mathbb{E}_\theta[\ddot\ell]$ (éq. (10)), $\sqrt n(\hat\theta_n^{\mathrm{MV}}-\theta^\star)\Rightarrow\mathcal N(0,1/\mathbb{I}(\theta^\star))$. Ex. : gaussien $\mathbb{I}=\sigma^{-2}$, Poisson $\mathbb{I}=1/\theta$ (variance asymptotique $\theta^\star$, Ex. 1.8).
9. **Optimalité (Th. 1.7)** : modèle régulier (Cadre 1.1 : (R-1) $q_\theta>0$, (R-2) $C^2$ + domination, (R-3) $0<\mathbb{I}<\infty$), alors $v_\psi(\theta)\ge 1/\mathbb{I}(\theta)$ pour tout Z-estimateur régulier. Preuve : dériver $\int\psi(\tau,x)q_\tau(x)\mu(dx)=0$ ⇒ $\mathbb{E}_\theta[\psi']=-\mathbb{E}_\theta[\psi\dot\ell]$ (éq. (11)) puis **Cauchy-Schwarz**. Égalité ssi $\psi\propto\dot\ell$. (Premier point — normalité de l'EMV sous les seules conditions de régularité — **admis**.)
10. **Illustrations** : Cauchy (Ex. 1.9) : médiane $v=\pi^2/4\simeq2{,}47$ vs EMV $v=1/\mathbb{I}=2$. **Hors régularité** : Pareto (Ex. 1.10), le paramètre $\alpha$ gouverne le support, $\hat\alpha_n=\min X_i$, vitesse $n$ (et non $\sqrt n$), loi limite $n\eta(\hat\alpha_n-\alpha)\Rightarrow\alpha\,\mathcal{E}(1)$ (exponentielle, non gaussienne) ; frontière ($\mathcal N(\theta,1)$, $\Theta=\mathbb{R}_+$, $\theta=0$) : la conclusion du Th. 1.4 tombe.

---

## 1. Notations et symboles

> **Notations particulières du poly à reproduire fidèlement :**
> - **Changement de notation par rapport aux chapitres antérieurs** : l'expérience « à une observation » est $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:\theta\in\Theta\})$ (X **sans empattement**, tribu calligraphique, loi $\mathbb{Q}_\theta$ en lettre ajourée) ; l'expérience à $n$ observations est $(\mathsf{X}^n,\mathcal{X}^{\otimes n},\{\mathbb{P}_{n,\theta}:\theta\in\Theta\})$ avec $\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n}$. Densités notées $q_\theta$ (cours) mais $p_\theta$ dans les compléments (§4.3–4.7).
> - **Deux espérances** : $\mathbb{E}_\theta$ sous $\mathbb{Q}_\theta$ et $\mathbb{E}_{n,\theta}$ sous $\mathbb{P}_{n,\theta}$ ; elles coïncident sur les fonctions d'une seule observation ; notation intégrale $\mathbb{Q}_\theta(f):=\int f(x)\,\mathbb{Q}_\theta(dx)$.
> - **Étoile** : $\theta^\star$ (étoile pleine $\star$) = vraie valeur ; $\theta$ = variable muette. Dans les compléments, $\theta^*_n$ (astérisque) désigne un point intermédiaire de Taylor.
> - **Fonctions limites en police sans empattement** : $\mathsf{M}_{\theta^\star}(\theta)$, $\mathsf{W}_{\theta^\star}(\theta)$ et $\mathsf{\Psi}_{\theta^\star}(\theta)$ (le poly écrit aussi $\Psi$ en sans-serif ; ici on note $\Psi_{\theta^\star}$ pour la compatibilité KaTeX). **Fonctions empiriques avec chapeau large** : $\widehat{M}_n(\theta)$, $\widehat{W}_n(\theta)$, $\widehat{\Psi}_n(\theta)$, $\widehat{\Psi}_n'(\theta)$.
> - Estimateur : $\hat\theta_n$ (petit chapeau) ; EMV : $\hat\theta_n^{\mathrm{MV}}$ ; médiane : $\widehat\theta_n^{\mathrm{med}}$ ; suites d'estimateurs écrites $\{\hat\theta_n,\ n\in\mathbb{N}\}$.
> - Dérivées **toujours par rapport à $\theta$** : $\nabla f(\theta,x)=\nabla_\theta f(\theta,x)$ ; en dimension 1 : $\psi'(\theta,x)$, $\psi''(\theta,x)$, $m'(\theta,x)$, $m''(\theta,x)$.
> - Log-densité $\ell(\theta,x):=\log q_\theta(x)$, **score** $\dot\ell(\theta,x)=\partial_\theta\log q_\theta(x)$ (point), dérivée seconde $\ddot\ell(\theta,x)$ (deux points) ; **information de Fisher** en lettre ajourée $\mathbb{I}(\theta)$, inverse $\mathbb{I}^{-1}(\theta)$.
> - Attention : $\ell_n$ désigne la log-vraisemblance **non normalisée** $\ell_n(\theta)=\sum\log q_\theta(X_k)$ dans l'Ex. 1.10 (Pareto), mais la log-vraisemblance **normalisée** $\ell_n(\theta):=n^{-1}\sum\log p_\theta(X_i)$ dans les compléments (Th. 4.3, §4.5, Lemme 4.1).
> - **$\mathrm{Ent}(q)$** dans l'Ex. 1.1 désigne $\int(\log q)\,q\,d\mu$, c'est-à-dire **l'opposé** de l'entropie de Shannon usuelle (convention du poly, à ne pas « corriger »).
> - Convergences : en probabilité $\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}$ ; en loi $\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}$.
> - Lois : $\mathcal{N}(\mu,\sigma^2)$, $\mathcal{P}\mathrm{oi}(\theta)$, $\mathcal{E}(1)$ (exponentielle), $\mathrm{Gamma}(2,\theta)$, $\chi^2(d)$ et son quantile $\chi^2_{1-\alpha}(d)$, quantile gaussien $z_{1-\alpha/2}$.
> - Statistiques d'ordre $X_{k:n}$ ($X_{(n+1)/2:n}$, $X_{n/2:n}$…) ; $\operatorname{signe}$ (écrit « signe » en français dans le texte, « sign » dans la figure 2).
> - Intérieur de $\Theta$ : $\Theta^o$ ; voisinage $\mathcal{V}(\theta^\star)$ ; boule $\mathrm{B}(\theta,\delta)$ ; $\mathrm{diam}(\Theta)$ ; mesure de Lebesgue $\mathrm{Leb}$.
> - Hypothèses étiquetées : (H-1), (H-2), (H-3) (Th. 1.1) ; (Hz-1), (Hz-2), (Hz-3) (Th. 1.3) ; (R-1), (R-2), (R-3) (Cadre 1.1).
> - Vectoriel (compléments) : $\mathrm{J}_\psi(\theta^\star)$ (jacobienne moyenne), $G_\psi$, $G_m$, $U_m$, hessienne $\mathrm{H}_m$, $\mathrm{H}_\ell$, information observée $\mathbb{I}_n(\theta)$, $\mathrm{I}_d$ identité, $[\cdot]^{-\top}$.

| Symbole LaTeX | Signification | Première apparition |
|---|---|---|
| $m(\theta,x)$ | fonction objectif (M-estimation) | Intro, p. 7 ; Déf. 1.1, p. 9 |
| $\psi(\theta,x)$ | fonction d'influence (Z-estimation), à valeurs dans $\mathbb{R}^d$ | Intro, p. 7 ; Déf. 1.2, p. 10 |
| $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:\theta\in\Theta\})$ | expérience statistique à une observation | §1.1, p. 9 |
| $\Theta\subseteq\mathbb{R}^d$ | espace des paramètres | §1.1, p. 9 |
| $(\mathsf{X}^n,\mathcal{X}^{\otimes n},\{\mathbb{P}_{n,\theta}\})$, $\mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n}$ | expérience produit | §1.1, p. 9 |
| $X_i:(x_1,\dots,x_n)\mapsto x_i$ | statistiques canoniques | §1.1, p. 9 |
| $\mathbb{E}_\theta$, $\mathbb{E}_{n,\theta}$ | espérance sous $\mathbb{Q}_\theta$, sous $\mathbb{P}_{n,\theta}$ | §1.1, p. 9 |
| $\mathbb{Q}_\theta(f):=\int f(x)\mathbb{Q}_\theta(dx)$ | intégrale de $f$ sous $\mathbb{Q}_\theta$ | §1.1, p. 9 |
| $\theta^\star$ | vraie valeur du paramètre (indice de la loi $\mathbb{P}_{n,\theta^\star}$) | §1.1, p. 9 (intro p. 8) |
| $\nabla f(\theta,x)$, $\psi'(\theta,x)$, $\psi''(\theta,x)$ | dérivées par rapport à $\theta$ | §1.1, p. 9 |
| $\phi_n$, $\beta_{\phi_n}$ | suite de tests, fonctions puissance (rappel ch.6) | §1.2, p. 9 |
| $T_n=\sqrt n(\bar X_n-\mu_0)/S_n^2$ | statistique de Student asymptotique (telle qu'écrite p. 9) | §1.2, p. 9 |
| $\widehat\sigma_n^2=n^{-1}\sum(X_i-\bar X_n)^2$, $\gamma=\mathbb{E}[(X_1-\mu)^4]-\sigma^4$ | variance empirique non corrigée, sa variance asymptotique | §1.2, p. 9 |
| $\mathsf{M}_{\theta^\star}(\theta):=\mathbb{E}_{\theta^\star}[m(\theta,X_1)]$ | fonction objectif limite (déterministe) | Déf. 1.1, p. 9 |
| $\widehat{M}_n(\theta):=\frac1n\sum_{i=1}^n m(\theta,X_i)$ | fonction objectif empirique (aléatoire) | Déf. 1.1, p. 9 |
| $\{\hat\theta_n,\ n\in\mathbb{N}\}$ | suite d'estimateurs | Déf. 1.1, p. 9 |
| $Z_n:=(X_1,\dots,X_n)$ | observation | p. 9 |
| $\Psi_{\theta^\star}(\theta):=\mathbb{E}_{\theta^\star}[\psi(\theta,X_1)]$ | équation d'estimation limite (sans-serif dans le poly) | Déf. 1.2, p. 10 |
| $\widehat\Psi_n(\theta):=\frac1n\sum_{i=1}^n\psi(\theta,X_i)$ | équation d'estimation empirique | Déf. 1.2, p. 10 |
| $q_\theta$, $\mathbb{Q}_\theta=q_\theta\cdot\mu$ | densité, modèle dominé par $\mu$ | Ex. 1.1, p. 10 |
| $\mathrm{Ent}(q_{\theta^\star})=\int(\log q_{\theta^\star})q_{\theta^\star}d\mu$ | « entropie » (convention du poly) | Ex. 1.1, p. 10 |
| $\mathrm{KL}(q_{\theta^\star},q_\theta)$ | divergence de Kullback-Leibler | Ex. 1.1, p. 10 |
| $\hat\theta_n^{\mathrm{MV}}\in\operatorname*{arg\,max}_\theta\widehat M_n(\theta)$ | estimateur du maximum de vraisemblance | Ex. 1.1, p. 10 |
| $q$, $q_\theta(x)=q(x-\theta)$, $\mathrm{Leb}$ | modèle de translation | Ex. 1.2, p. 10 |
| $\bar X_n$ | moyenne empirique | Ex. 1.2, p. 10 |
| $\delta>0$ | paramètre de la perte de Huber | Ex. 1.4, p. 11 |
| $\gamma$ (impaire croissante) | $\psi(\theta,x)=\gamma(x-\theta)$ (exercice 5) | Ex. 1.4, p. 12 |
| $\Theta^o$ | intérieur de $\Theta$ | Prop. 1.1, p. 12 |
| $T_n$, $g(\theta)$ | estimateur et fonction du paramètre (déf. de consistance) | §1.4, p. 12 |
| (H-1), (H-2), (H-3) | hypothèses de consistance des M-estimateurs | Th. 1.1, p. 13 |
| $\eta$ | marge $\mathsf{M}_{\theta^\star}(\theta^\star)-\sup_{\Vert\theta-\theta^\star\Vert\ge\varepsilon}\mathsf{M}_{\theta^\star}(\theta)>0$ | preuve Th. 1.1, p. 13 |
| $K$, $\phi(\theta,x)$ | compact contenant $\Theta$, fonction de la LGN uniforme | Th. 1.2, p. 14 |
| $\widehat W_n(\theta)$, $\mathsf{W}_{\theta^\star}(\theta)$ | moyenne empirique et espérance de $\phi(\theta,\cdot)$ | Th. 1.2, p. 14 |
| $w_\delta(x)$ | module de continuité | preuve Th. 1.2, p. 15 ; Lemme 2.1, éq. (12), p. 30 |
| $\mathrm{B}(\theta^{(\ell)},\delta)$, $\theta^{(1)},\dots,\theta^{(L)}$ | boules du recouvrement fini | preuve Th. 1.2, p. 15 |
| $\theta_\varepsilon$ | point où le max est atteint hors de la boule | preuve Lemme 1.1, p. 16 |
| $\sigma^2:=\int x^2q(x)dx$, $\mathrm{diam}(\Theta)$ | variance, diamètre | Ex. 1.5, p. 17 |
| (Hz-1), (Hz-2), (Hz-3) | hypothèses de consistance des Z-estimateurs | Th. 1.3, p. 18 |
| $\alpha_n$ | normalisation | §1.5, p. 18 |
| $r(t,x):=\int_0^1\{\psi'(\theta^\star+wt,x)-\psi'(\theta^\star,x)\}dw$ | reste intégral de Taylor, éq. (2) | §1.5, p. 19 |
| $R_n:=\frac1n\sum r(\hat\theta_n-\theta^\star,X_i)$ | reste moyen | §1.5, p. 19 |
| $\mathcal{V}(\theta^\star)$, $g(x)$ | voisinage, fonction dominante | §1.5, p. 19 ; Th. 1.4, p. 20 |
| $v_\psi(\theta)$ | variance asymptotique du Z-estimateur | Th. 1.4, p. 20 |
| $R_\delta(x):=\sup_{\lvert t\rvert\le\delta}\lvert r(t,x)\rvert$ | sup du reste | preuve Th. 1.4, p. 20 |
| $R_n(t)=R_n^{(1)}+R_n^{(2)}(t)$ | décomposition du reste | preuve Th. 1.4, éq. (5), p. 20 |
| $\delta_n$, $\Delta_n:=\hat\theta_n-\theta^\star$ | suite de rayons, erreur | preuve Th. 1.4, p. 20–21 |
| $\ell(\theta,x):=\log q_\theta(x)$ | log-densité | Déf. 1.3, p. 22 |
| $\dot\ell(\theta,x)$, $\ddot\ell(\theta,x)$ | score, dérivée seconde de la log-densité | Déf. 1.3, p. 22 |
| $\mathbb{I}(\theta)$ | information de Fisher | Déf. 1.4, p. 23 |
| (R-1), (R-2), (R-3) ; $g$, $h$ | conditions de régularité ; fonctions dominantes | Cadre 1.1, p. 24–25 |
| $\widehat\theta_n^{\mathrm{med}}$ | médiane empirique | Ex. 1.9, p. 26 |
| $N=49$ | taille de l'échantillon simulé (Cauchy) | Ex. 1.9, p. 26 |
| $\theta=(\alpha,\eta)\in\mathbb{R}_+^\star\times\mathbb{R}_+^\star$ | paramètre du modèle de Pareto | Ex. 1.10, p. 28 |
| $\ell_n(\theta)$ | log-vraisemblance (non normalisée dans l'Ex. 1.10) | Ex. 1.10, p. 28 |
| $\hat\alpha_n$, $\hat\eta_n$ | EMV de Pareto | Ex. 1.10, p. 28 |
| $W_n:=n\eta\log(\hat\alpha_n/\alpha)$, $U_n:=W_n/(n\eta)$, $r_n=n\eta$ | variables de la loi limite de Pareto | Ex. 1.10, p. 28 |
| $\mathcal{E}(1)$ | loi exponentielle de paramètre 1 | Ex. 1.10, p. 28 |
| $\theta_n=\theta^\star+h/\sqrt n$ | alternatives locales (exercice 1) | §1.8, p. 29 |
| $V[\gamma]$ | variance asymptotique (exercice 5) | §1.8, p. 29 |
| $(\mathsf{Z}_n,\mathcal{Z}_n,\mathbb{P}_n)$ | espace de probabilité de la LGN | Th. 2.1, p. 30 |
| $\varphi(x):=\sup_{\theta\in K}\lvert\phi(\theta,x)\rvert$ | enveloppe (fonction dominante) | preuve Lemme 2.1, p. 31 |
| $f$, $I$, $a$, $r(t)$ | Taylor avec reste intégral | Lemme 2.2, p. 31 |
| $\rho_n$ | erreur d'optimisation (version approchée) | Th. 4.1, p. 34 |
| $p_\theta$, $\ell_n(\theta)=n^{-1}\sum\log p_\theta(X_i)$ | densité et log-vraisemblance normalisée (compléments) | Th. 4.3, p. 36 |
| $\mathrm{J}_\psi$, $G_\psi$, $G_m$, $U_m$, $\mathrm{H}_m$, $\mathrm{H}_\ell$ | objets du cas vectoriel | Th. 4.4, p. 37 |
| $S_{n,\alpha}$, $\tilde S_{n,\alpha}$, $\check S_{n,\alpha}$, $\breve S_{n,\alpha}$ | régions de confiance asymptotiques | §4.5, p. 38 |
| $\mathbb{I}_n(\theta):=-\frac1n\sum\mathrm{H}_\ell(\theta,X_i)$ | information de Fisher observée (en $\hat\theta_n^{\mathrm{MV}}$) | §4.5, p. 38 |
| $\sigma_g^2(\theta)=(\nabla g)^\top\mathbb{I}^{-1}\nabla g$ | variance asymptotique de $g(\hat\theta_n^{\mathrm{MV}})$ | §4.5, p. 38 |
| $\widetilde\theta_n$ | estimateur « un pas » du score de Fisher | Th. 4.5, p. 40 |
| $F$, $Q(p)$, $k_n$ | f.d.r., quantile, rang de la statistique d'ordre | §4.8, p. 40 |

---

## 2. Cours — contenu principal

### Remarque (introduction, non numérotée) — Des estimateurs définis par un problème d'optimisation
**Source :** Poly ch.7, introduction, p. 7–8
**Hypothèses :** situation du chapitre 2 : fonction objectif $m$ ou fonction d'influence $\psi$ données.
**Énoncé :** Le M-estimateur maximise $\theta\mapsto n^{-1}\sum_{i=1}^n m(\theta,X_i)$ ; le Z-estimateur annule $\theta\mapsto n^{-1}\sum_{i=1}^n\psi(\theta,X_i)$. Ces fonctions de $\theta$ sont **aléatoires** ; la LGN dit qu'elles s'approchent, **en chaque point** $\theta$, d'une fonction déterministe maximale (ou nulle) en la vraie valeur. Il reste à passer de la convergence des **fonctions** à celle de leurs **points de maximum / zéros**. Le chapitre établit consistance et normalité asymptotique à partir d'hypothèses sur $m$ ou $\psi$, et non sur l'estimateur (souvent sans expression explicite). Plan annoncé : consistance = convergence uniforme + caractère isolé du max/zéro ; loi limite = développement au premier ordre de l'équation d'estimation (TCL au numérateur, LGN au dénominateur, Slutsky) ; variance $\mathbb{E}_\theta[\psi^2]/(\mathbb{E}_\theta[\psi'])^2$ ; pour la vraisemblance elle vaut $1/\mathbb{I}$, et Cauchy-Schwarz montre l'efficacité asymptotique de l'EMV parmi les Z-estimateurs ; Cauchy (médiane vs EMV) et Pareto (perte de $\sqrt n$ et de la gaussianité hors régularité).
**Preuve (étapes) :** — (texte de présentation)
**Intuition :** « Deux courbes » : la courbe limite avec un pic en $\theta^\star$ et la courbe empirique qui oscille autour. Si l'oscillation est **partout** petite et que le pic est **franc**, le sommet empirique est proche de $\theta^\star$ ; une courbe limite presque plate près de son max laisse le sommet empirique dériver loin. Le poly précise que « l'image des deux courbes est une image : la démonstration n'y recourt pas ».
**Pièges / erreurs classiques :** la LGN ponctuelle ne suffit pas (voir §1.4).

### Remarque (§1.1, non numérotée) — Le cadre et les notations
**Source :** Poly ch.7, §1.1, p. 9
**Hypothèses :** suite d'expériences statistiques produit (au sens de la définition 1.1 — du ch.6).
**Énoncé :** On se donne $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta:\theta\in\Theta\})$, $\Theta\subseteq\mathbb{R}^d$, et pour tout $n\in\mathbb{N}$
$$\big(\mathsf{X}^n,\mathcal{X}^{\otimes n},\{\mathbb{P}_{n,\theta}:\theta\in\Theta\}\big),\qquad \mathbb{P}_{n,\theta}:=\mathbb{Q}_\theta^{\otimes n},$$
avec les statistiques canoniques $X_i:(x_1,\dots,x_n)\mapsto x_i$ ; sous $\mathbb{P}_{n,\theta}$, $X_1,\dots,X_n$ sont i.i.d. de loi $\mathbb{Q}_\theta$. $\mathbb{E}_\theta$ = espérance sous $\mathbb{Q}_\theta$, $\mathbb{E}_{n,\theta}$ = sous $\mathbb{P}_{n,\theta}$ ; on écrit indifféremment $\mathbb{E}_\theta[f(X_1)]$ ou $\mathbb{Q}_\theta(f):=\int f(x)\mathbb{Q}_\theta(dx)$. $\theta^\star$ = valeur « vraie », sous laquelle on calcule ; $\theta$ = variable muette des fonctions qu'on maximise ou annule ; tout le calcul différentiel porte sur $\theta$.
**Preuve (étapes) :** —
**Intuition :** séparer clairement « où l'on évalue la loi » ($\theta^\star$) et « la variable d'optimisation » ($\theta$).
**Pièges / erreurs classiques :** confondre $\mathsf{M}_{\theta^\star}(\theta)$ (fonction de $\theta$, indexée par $\theta^\star$) avec une fonction de $\theta^\star$.

### Remarque (§1.2, non numérotée) — Ce que le chapitre précédent a établi sur les tests
**Source :** Poly ch.7, §1.2, p. 9
**Hypothèses :** test de $H_0:\theta\in\Theta_0$ contre $H_1:\theta\in\Theta_1$, suite de tests $\{\phi_n,\ n\in\mathbb{N}\}$ de fonctions puissance $\beta_{\phi_n}$.
**Énoncé (rappels du ch.6, déf. 1.9–1.11) :**
- taille asymptotique : $\sup_{\theta\in\Theta_0}\limsup_n\beta_{\phi_n}(\theta)$ ;
- niveau asymptotique $\alpha$ : $\limsup_n\beta_{\phi_n}(\theta)\le\alpha$ pour tout $\theta\in\Theta_0$ ;
- consistance : $\liminf_n\beta_{\phi_n}(\theta)=1$ pour tout $\theta\in\Theta_1$.
Le test de Student asymptotique, de statistique $T_n=\sqrt n(\bar X_n-\mu_0)/S_n^2$ (sic), fournit une suite consistante de niveau asymptotique $\alpha$ pour $\mu=\mu_0$ dès que le second moment existe (exemple 1.14 du ch.6). Normalité asymptotique de $\widehat\sigma_n^2=n^{-1}\sum_{i=1}^n(X_i-\bar X_n)^2$ (moment d'ordre 4) : $\sqrt n(\widehat\sigma_n^2-\sigma^2)\overset{\mathbb{P}_n}{\Longrightarrow}\mathcal N(0,\gamma)$, $\gamma=\mathbb{E}[(X_1-\mu)^4]-\sigma^4$ (exemple 1.6 du ch.6), d'où la consistance de $S_n^2$ (proposition 1.2 du ch.6).
**Preuve (étapes) :** rappels, pas de preuve.
**Intuition :** —
**Pièges / erreurs classiques :** le poly écrit bien « $/S_n^2$ » (vérifié sur le PDF p. 9) ; la statistique de Student usuelle divise par $S_n=\sqrt{S_n^2}$ : **coquille probable** du poly, à signaler plutôt qu'à reproduire comme formule de référence.

### Définition 1.1 — M-estimateur
**Source :** Poly ch.7, Définition 1.1, p. 9
**Hypothèses :** $m:\Theta\times\mathsf{X}\to\mathbb{R}$ mesurable (« fonction objectif ») telle que
- pour tous $\theta,\theta^\star\in\Theta$ : $\mathbb{E}_{\theta^\star}[|m(\theta,X_1)|]<\infty$ ;
- pour tout $\theta^\star\in\Theta$, la fonction $\theta\mapsto\mathsf{M}_{\theta^\star}(\theta):=\mathbb{E}_{\theta^\star}[m(\theta,X_1)]$ admet un maximum au point $\theta=\theta^\star$.
**Énoncé :** On appelle **M-estimateur associé à $m$** toute suite d'estimateurs $\{\hat\theta_n,\ n\in\mathbb{N}\}$ à valeurs dans $\Theta$ telle que
$$\widehat{M}_n(\hat\theta_n)=\max_{\theta\in\Theta}\widehat{M}_n(\theta),\qquad\text{où}\quad \widehat{M}_n(\theta):=\frac1n\sum_{i=1}^n m(\theta,X_i).$$
**Preuve (étapes) :** —
**Intuition :** $\widehat M_n$ est une **fonction aléatoire** (elle dépend de $Z_n:=(X_1,\dots,X_n)$) ; c'est la suite de ces fonctions, et non une suite de nombres, dont il faut contrôler le comportement asymptotique. $\widehat M_n(\theta)$ est la version empirique (moyenne) de l'espérance $\mathsf{M}_{\theta^\star}(\theta)$.
**Pièges / erreurs classiques :** la condition « max en $\theta^\star$ » porte sur la fonction **limite** $\mathsf{M}_{\theta^\star}$ pour **tout** $\theta^\star$ ; c'est une propriété de $m$ vis-à-vis du modèle, pas de l'échantillon. Le maximum de $\mathsf M_{\theta^\star}$ n'est pas supposé unique dans la définition (l'unicité/isolement intervient en (H-2)).

### Définition 1.2 — Z-estimateur
**Source :** Poly ch.7, Définition 1.2, p. 10
**Hypothèses :** $\psi:\Theta\times\mathsf{X}\to\mathbb{R}^d$ mesurable (« fonction d'influence ») telle que
- pour tous $\theta,\theta^\star\in\Theta$ : $\mathbb{E}_{\theta^\star}[\|\psi(\theta,X_1)\|]<\infty$ ;
- pour tout $\theta^\star\in\Theta$, la fonction $\theta\mapsto\Psi_{\theta^\star}(\theta):=\mathbb{E}_{\theta^\star}[\psi(\theta,X_1)]$ s'annule au point $\theta=\theta^\star$.
**Énoncé :** On appelle **Z-estimateur associé à $\psi$** toute suite d'estimateurs $\{\hat\theta_n,\ n\in\mathbb{N}\}$ à valeurs dans $\Theta$ telle que
$$\widehat\Psi_n(\hat\theta_n)=0,\qquad\text{où}\quad\widehat\Psi_n(\theta):=\frac1n\sum_{i=1}^n\psi(\theta,X_i).$$
**Preuve (étapes) :** —
**Intuition :** « Z » pour *zero* : on résout une équation d'estimation empirique, version empirique de l'équation $\Psi_{\theta^\star}(\theta)=0$ satisfaite par la vraie valeur. L'EMV est « le M-estimateur de référence » et relève de toute la théorie du chapitre.
**Pièges / erreurs classiques :** $\psi$ est à valeurs dans $\mathbb{R}^d$ (autant d'équations que d'inconnues). La condition de **centrage** $\Psi_{\theta^\star}(\theta^\star)=0$ est essentielle (elle donne un TCL centré au numérateur de (3)).

### Exemple 1.1 — L'estimateur du maximum de vraisemblance est un M-estimateur
**Source :** Poly ch.7, Exemple 1.1, p. 10
**Hypothèses :** modèle dominé $\mathbb{Q}_\theta=q_\theta\cdot\mu$ avec $q_\theta(x)>0$ pour tout $(\theta,x)\in\Theta\times\mathsf{X}$ ; $m(\theta,x):=\log q_\theta(x)$ ; les deux intégrales ci-dessous sont supposées finies.
**Énoncé :** Pour tous $\theta^\star,\theta\in\Theta$,
$$\begin{aligned}\mathsf{M}_{\theta^\star}(\theta)&=\mathbb{E}_{\theta^\star}[\log q_\theta(X_1)]=\mathbb{E}_{\theta^\star}[\log q_{\theta^\star}(X_1)]+\mathbb{E}_{\theta^\star}\Big[\log\frac{q_\theta(X_1)}{q_{\theta^\star}(X_1)}\Big]\\&=\int(\log q_{\theta^\star}(x))\,q_{\theta^\star}(x)\mu(dx)-\int\log\Big(\frac{q_{\theta^\star}(x)}{q_\theta(x)}\Big)q_{\theta^\star}(x)\mu(dx)\\&=\mathrm{Ent}(q_{\theta^\star})-\mathrm{KL}(q_{\theta^\star},q_\theta).\end{aligned}$$
Le premier terme ne dépend pas de $\theta$ ; le second est positif (théorème 1.1 du ch.2) ; donc $\theta\mapsto\mathsf{M}_{\theta^\star}(\theta)$ atteint son maximum en $\theta=\theta^\star$, **unique** dès que le modèle est identifiable ($\mathrm{KL}(q_{\theta^\star},q_\theta)=0\iff\theta=\theta^\star$). Comme $\widehat M_n(\theta)=\frac1n\sum_{i=1}^n\log q_\theta(X_i)$, le M-estimateur associé est l'EMV : $\hat\theta_n^{\mathrm{MV}}\in\operatorname*{arg\,max}_{\theta\in\Theta}\widehat M_n(\theta)$.
**Méthodes mobilisées :** ajout/retrait de $\log q_{\theta^\star}$ ; positivité de la divergence de Kullback-Leibler ; identifiabilité pour l'unicité.
**Preuve (étapes) :**
1. Écrire $\log q_\theta=\log q_{\theta^\star}+\log(q_\theta/q_{\theta^\star})$ (licite car $q_\theta>0$).
2. Prendre l'espérance sous $\mathbb{Q}_{\theta^\star}$ (linéarité, intégrales finies).
3. Reconnaître $\mathrm{KL}$ (définition 1.7 du ch.2).
4. $\mathrm{KL}\ge0$ ⇒ max en $\theta^\star$ ; identifiabilité ⇒ max unique.
**Intuition :** maximiser la vraisemblance moyenne revient asymptotiquement à minimiser la divergence KL à la vraie loi.
**Pièges / erreurs classiques :** $\mathrm{Ent}$ est ici $\int q\log q$ (signe opposé à l'entropie usuelle). La condition $q_\theta>0$ partout exclut les modèles à support dépendant de $\theta$ (cf. Ex. 1.10).

### Exemple 1.2 — Paramètre de translation : la moyenne empirique comme Z-estimateur
**Source :** Poly ch.7, Exemple 1.2, p. 10
**Hypothèses :** $q$ densité sur $\mathbb{R}$ avec $\int_{\mathbb{R}}x\,q(x)dx=0$ et $\int_{\mathbb{R}}x^2q(x)dx<\infty$ ; modèle $\mathbb{Q}_\theta=q_\theta\cdot\mathrm{Leb}$, $\Theta:=\mathbb{R}$, $q_\theta(x):=q(x-\theta)$.
**Énoncé :** $\mathbb{E}_\theta[X_1]=\int x\,q(x-\theta)dx=\theta$. Avec $\psi(\theta,x):=x-\theta$ : $\Psi_{\theta^\star}(\theta)=\mathbb{E}_{\theta^\star}[X_1-\theta]=\theta^\star-\theta$, qui ne s'annule qu'en $\theta=\theta^\star$. Comme $\widehat\Psi_n(\theta)=\bar X_n-\theta$, l'unique solution de $\widehat\Psi_n(\theta)=0$ est $\hat\theta_n:=\bar X_n$.
**Méthodes mobilisées :** construction d'un Z-estimateur par l'équation de moments ; calcul d'espérance par changement de variable.
**Preuve (étapes) :** calcul direct (changement de variable $x\mapsto x-\theta$ et $\int xq=0$).
**Intuition :** la méthode des moments est un cas particulier de Z-estimation.
**Pièges / erreurs classiques :** l'hypothèse de moment d'ordre 2 n'est pas nécessaire à la définition (seul $\mathbb{E}|X|<\infty$ l'est), mais elle sert à la normalité asymptotique.

### Exemple 1.3 — Paramètre de translation : la moyenne empirique comme M-estimateur
**Source :** Poly ch.7, Exemple 1.3, p. 11 (avec Figure 1)
**Hypothèses :** cadre de l'Ex. 1.2 ; $m(\theta,x):=-\frac12(x-\theta)^2$.
**Énoncé :** Pour tous $\theta^\star,\theta$,
$$\mathsf{M}_{\theta^\star}(\theta)=-\frac12\mathbb{E}_{\theta^\star}\big[(X_1-\theta)^2\big]=-\frac12\int(x+\theta^\star-\theta)^2q(x)dx=-\frac12\int x^2q(x)dx-\frac12(\theta^\star-\theta)^2,$$
qui atteint son maximum au seul point $\theta=\theta^\star$. La fonction $\theta\mapsto\widehat M_n(\theta)=-\frac1{2n}\sum_{k=1}^n(X_k-\theta)^2$ est strictement concave et son unique maximum est $\bar X_n$ : **la moyenne empirique est à la fois le Z-estimateur associé à $\psi(\theta,x)=x-\theta$ et le M-estimateur associé à $m(\theta,x)=-\frac12(x-\theta)^2$.**
**Méthodes mobilisées :** changement de variable, développement du carré (terme croisé nul car $\int xq=0$), stricte concavité.
**Preuve (étapes) :**
1. Changement de variable $x\mapsto x+\theta^\star$.
2. Développer $(x+(\theta^\star-\theta))^2$ ; terme croisé $2(\theta^\star-\theta)\int xq=0$.
3. Maximum en $\theta=\theta^\star$ par lecture directe.
4. $\widehat M_n$ quadratique strictement concave, dérivée nulle en $\bar X_n$.
**Intuition :** **Figure 1** (modèle $\mathcal{N}(\theta,1)$, $\theta^\star=2$) : en bleu $\theta\mapsto\mathsf{M}_{\theta^\star}(\theta)$, en noir $\theta\mapsto\widehat M_n(\theta)$ pour trois valeurs de $n$, en rouge les points $(\hat\theta_n,\widehat M_n(\hat\theta_n))$. Intuition du poly : la coïncidence n'est pas un hasard : $\psi(\theta,x)=\partial_\theta m(\theta,x)$, et annuler la dérivée d'une fonction strictement concave revient à la maximiser — lien général énoncé en Prop. 1.1, valable seulement sous une hypothèse de régularité.
**Pièges / erreurs classiques :** le choix $m=-(x-\theta)^2$ suppose un moment d'ordre deux ; sinon on passe aux fonctions robustes (Ex. 1.4), « point de départ de la statistique robuste ».

### Exemple 1.4 — Paramètre de translation sans moment d'ordre deux
**Source :** Poly ch.7, Exemple 1.4, p. 11–12 (avec Figure 2)
**Hypothèses :** cadre de l'Ex. 1.2 mais avec $\int x^2q(x)dx=+\infty$ et $q$ symétrique : $q(x)=q(-x)$ pour tout $x\in\mathbb{R}$.
**Énoncé :** Restent admissibles :
- pour $\delta>0$, la **perte de Huber** (M-estimateur) : $$m(\theta,x)=-\delta^2\Big(\sqrt{1+\{(\theta-x)/\delta\}^2}-1\Big);$$
- les fonctions d'influence (Z-estimateurs) : $$\psi(\theta,x)=\arctan(x-\theta),\qquad\psi(\theta,x)=\operatorname{signe}(x-\theta);$$ la seconde donne la **médiane empirique**.
Ces trois fonctions sont bornées en $x$, ou de dérivée bornée, ce qui suffit à assurer l'intégrabilité quel que soit le comportement des queues de $q$. L'exercice 5 de la feuille étudie la famille $\psi(\theta,x)=\gamma(x-\theta)$, $\gamma$ impaire croissante, dont ces exemples sont des cas particuliers.
**Méthodes mobilisées :** choix de fonctions d'influence bornées ; symétrie de $q$ pour le centrage.
**Preuve (étapes) :** pas de preuve détaillée dans le poly (affirmation d'admissibilité ; le centrage $\Psi_{\theta^\star}(\theta^\star)=0$ découle de l'imparité de $\psi$ et de la symétrie de $q$ — justification implicite).
**Intuition :** **Figure 2** : à gauche, Huber ($\delta=1$, trait plein) comparée aux moindres carrés $-\frac12(\theta-x)^2$ (pointillés) : Huber est quadratique près de 0 et linéaire à l'infini ; à droite, $\arctan(x-\theta)$ et $\operatorname{signe}(x-\theta)$ (traits pleins, bornés) et $x-\theta$ (pointillés, non borné, donne la moyenne).
**Pièges / erreurs classiques :** la forme écrite est la « pseudo-Huber » lisse (racine), pas la Huber par morceaux ; elle est désignée « perte de Huber » dans le poly. La médiane ($\operatorname{signe}$) n'est **pas** différentiable en $\theta$ : le Th. 1.4 ne s'y applique pas.

### Proposition 1.1 — Un M-estimateur régulier est un Z-estimateur
**Source :** Poly ch.7, Proposition 1.1, p. 12
**Hypothèses :** pour tout $x\in\mathsf{X}$, $\theta\mapsto m(\theta,x)$ est différentiable sur $\Theta^o$ ; $\psi(\theta,x):=\nabla m(\theta,x)$ ; $\theta\mapsto\widehat M_n(\theta)$ atteint son maximum en un point $\hat\theta_n\in\Theta^o$.
**Énoncé :**
$$\widehat\Psi_n(\hat\theta_n)=\frac1n\sum_{i=1}^n\nabla m(\hat\theta_n,X_i)=\nabla\widehat M_n(\hat\theta_n)=0,$$
c'est-à-dire que $\hat\theta_n$ est un Z-estimateur associé à $\psi$.
**Preuve (étapes) :**
1. Le gradient d'une fonction différentiable s'annule en tout point **intérieur** où elle atteint un maximum (condition du premier ordre).
2. Différentiation terme à terme d'une somme finie : $\nabla\widehat M_n(\theta)=n^{-1}\sum_{i=1}^n\nabla m(\theta,X_i)$. □
**Intuition :** maximiser une fonction régulière = annuler son gradient (au moins au point de maximum intérieur).
**Pièges / erreurs classiques :** **la réciproque est fausse**, et les deux classes ne sont pas comparables en général : (a) si $m$ n'est pas régulière, un M-estimateur n'est pas nécessairement un Z-estimateur (EMV du support d'une loi uniforme, vraisemblance non dérivable — « exemple 1.11 », autre chapitre) ; (b) si $\widehat\Psi_n(\theta)=0$ a plusieurs solutions, celles qui correspondent à des extrema locaux ou points selle ne maximisent pas $\widehat M_n$. Le maximum doit être **intérieur** ($\Theta^o$).

### Remarque (§1.4, non numérotée) — Pourquoi les outils du ch.6 ne suffisent pas ; consistance
**Source :** Poly ch.7, §1.4, p. 12–13
**Hypothèses :** —
**Énoncé :** Rappel (déf. 1.2 du ch.6) : $\{T_n\}$ est **consistante** pour $g:\Theta\to\mathbb{R}^d$ si $\mathbb{P}_{n,\theta}(\|T_n-g(\theta)\|>\varepsilon)\to0$ pour tout $\theta\in\Theta$ et tout $\varepsilon>0$. Les techniques du ch.6 (calcul explicite de la loi, LGN + continuité pour une fonction continue d'une moyenne empirique, Bienaymé-Tchebychev sur un moment de l'erreur) **ne s'appliquent à aucun** estimateur de ce chapitre (pas de forme explicite). La LGN sert, mais appliquée aux **fonctions** $\widehat M_n$ et $\widehat\Psi_n$, et dans une version ne demandant que l'intégrabilité (Outils §2.1).
**Intuition (encadré du poly, « Consistance des M-estimateurs ») :** à $\theta^\star$ et $\theta$ fixés, la LGN donne $\widehat M_n(\theta)\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}\mathsf{M}_{\theta^\star}(\theta)$. Il est tentant d'en conclure $\hat\theta_n\to\theta^\star$ mais c'est **incomplet** : convergence **simple** (un $\theta$ à la fois) ; rien n'empêche $\widehat M_n$ de prendre, loin de $\theta^\star$, des valeurs plus grandes que $\widehat M_n(\theta^\star)$ sur des événements de probabilité ne tendant pas vers 0. Le Th. 1.1 remplace la convergence simple par une convergence **uniforme** et ajoute que le maximum limite est **isolé**. L'énoncé est écrit pour des fonctions aléatoires quelconques $\widehat M_n$ et des fonctions mesurables quelconques $\mathsf M_{\theta^\star}$ (le cas moyenne empirique/espérance en est un cas particulier).
**Preuve (étapes) :** —
**Pièges / erreurs classiques :** « LGN ponctuelle ⇒ consistance de l'argmax » est **faux** en général.

### Théorème 1.1 — Consistance des M-estimateurs généraux
**Source :** Poly ch.7, Théorème 1.1, p. 13–14
**Hypothèses :** pour tout $n$, $\theta\mapsto\widehat M_n(\theta)$ fonction aléatoire sur $\Theta$ ; pour tout $\theta^\star\in\Theta$, $\theta\mapsto\mathsf{M}_{\theta^\star}(\theta)$ mesurable sur $\Theta$ ;
- **(H-1)** pour tout $\theta^\star\in\Theta$, $$\sup_{\theta\in\Theta}\big|\widehat M_n(\theta)-\mathsf{M}_{\theta^\star}(\theta)\big|\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}0;$$
- **(H-2)** pour tout $\theta^\star\in\Theta$ et tout $\varepsilon>0$, $$\sup_{\|\theta-\theta^\star\|\ge\varepsilon}\mathsf{M}_{\theta^\star}(\theta)<\mathsf{M}_{\theta^\star}(\theta^\star);$$
- **(H-3)** $\{\hat\theta_n\}$ est à valeurs dans $\Theta$ et $\widehat M_n(\hat\theta_n)\ge\widehat M_n(\theta)$ pour tout $\theta\in\Theta$.
**Énoncé :** la suite $\{\hat\theta_n\}$ est consistante :
$$\text{pour tout }\theta^\star\in\Theta\text{ et tout }\varepsilon>0,\qquad\lim_{n\to\infty}\mathbb{P}_{n,\theta^\star}\big(\|\hat\theta_n-\theta^\star\|>\varepsilon\big)=0.$$
**Preuve (étapes) :**
1. *Marge* : soient $\theta^\star$, $\varepsilon>0$. Par (H-2), $\eta:=\mathsf{M}_{\theta^\star}(\theta^\star)-\sup_{\|\theta-\theta^\star\|\ge\varepsilon}\mathsf{M}_{\theta^\star}(\theta)>0$, et $\mathsf{M}_{\theta^\star}(\theta)\le\mathsf{M}_{\theta^\star}(\theta^\star)-\eta$ pour tout $\theta$ avec $\|\theta-\theta^\star\|\ge\varepsilon$.
2. *Inclusion d'événements* (car $\hat\theta_n\in\Theta$) : $\{\|\hat\theta_n-\theta^\star\|\ge\varepsilon\}\subseteq\{\mathsf{M}_{\theta^\star}(\hat\theta_n)\le\mathsf{M}_{\theta^\star}(\theta^\star)-\eta\}$, d'où $\mathbb{P}_{n,\theta^\star}(\|\hat\theta_n-\theta^\star\|\ge\varepsilon)\le\mathbb{P}_{n,\theta^\star}(\mathsf{M}_{\theta^\star}(\theta^\star)-\mathsf{M}_{\theta^\star}(\hat\theta_n)\ge\eta)$.
3. *Décomposition en trois termes* : $\mathsf{M}_{\theta^\star}(\theta^\star)-\mathsf{M}_{\theta^\star}(\hat\theta_n)\ge0$ ($\mathsf M_{\theta^\star}$ max en $\theta^\star$) et
$$\mathsf{M}_{\theta^\star}(\theta^\star)-\mathsf{M}_{\theta^\star}(\hat\theta_n)=\underbrace{\mathsf{M}_{\theta^\star}(\theta^\star)-\widehat M_n(\theta^\star)}_{(a)}+\underbrace{\widehat M_n(\theta^\star)-\widehat M_n(\hat\theta_n)}_{(b)}+\underbrace{\widehat M_n(\hat\theta_n)-\mathsf{M}_{\theta^\star}(\hat\theta_n)}_{(c)}.$$
4. *Majoration* : $(b)\le0$ par (H-3) ; $(a)$ et $(c)$ sont chacun $\le\sup_{\theta\in\Theta}|\widehat M_n(\theta)-\mathsf{M}_{\theta^\star}(\theta)|$. Donc $0\le\mathsf{M}_{\theta^\star}(\theta^\star)-\mathsf{M}_{\theta^\star}(\hat\theta_n)\le2\sup_\theta|\widehat M_n(\theta)-\mathsf{M}_{\theta^\star}(\theta)|$.
5. *Conclusion* : $\mathbb{P}_{n,\theta^\star}(\|\hat\theta_n-\theta^\star\|\ge\varepsilon)\le\mathbb{P}_{n,\theta^\star}\big(\sup_\theta|\widehat M_n(\theta)-\mathsf M_{\theta^\star}(\theta)|\ge\eta/2\big)\xrightarrow[n\to\infty]{}0$ par (H-1). □
**Intuition :** l'écart uniforme contrôle la perte de valeur de la fonction limite au point estimé ; la marge $\eta$ (maximum isolé) transforme une petite perte de valeur en petite distance à $\theta^\star$.
**Pièges / erreurs classiques :** (H-2) n'est **pas** l'unicité du maximum : il faut que le max soit **isolé** (un sup strictement inférieur hors de toute boule) — sur un non-compact, une suite $\theta_k\to\infty$ avec $\mathsf M(\theta_k)\to\mathsf M(\theta^\star)$ casse (H-2). (H-1) et (H-2) ne sont pas vérifiables directement : voir Th. 1.2 et Lemme 1.1.
**Complément, hors programme (encadré p. 14) :** (H-3) suppose que $\hat\theta_n$ maximise **exactement** $\widehat M_n$ ; en pratique on n'a qu'une solution numérique approchée ; le polycopié d'origine énonce le théorème sous une hypothèse plus faible, reprise en §4.1 (Th. 4.1).

### Théorème 1.2 — Loi des grands nombres uniforme
**Source :** Poly ch.7, Théorème 1.2, p. 14–15
**Hypothèses :** $K$ sous-ensemble **compact** de $\mathbb{R}^d$, $\Theta\subseteq K$, $\phi:K\times\mathsf{X}\to\mathbb{R}$ ;
- (i) pour tout $x\in\mathsf{X}$, $\theta\mapsto\phi(\theta,x)$ est continue sur $K$ ;
- (ii) pour tout $\theta^\star\in\Theta$, $\displaystyle\int\sup_{\theta\in K}|\phi(\theta,x)|\,\mathbb{Q}_{\theta^\star}(dx)<\infty$.
On pose, pour $\theta\in K$, $\theta^\star\in\Theta$, $n\ge1$ : $\widehat W_n(\theta):=\frac1n\sum_{i=1}^n\phi(\theta,X_i)$, $\mathsf{W}_{\theta^\star}(\theta):=\mathbb{E}_{\theta^\star}[\phi(\theta,X_1)]$.
**Énoncé :** pour tout $\theta^\star\in\Theta$,
$$\sup_{\theta\in K}\big|\widehat W_n(\theta)-\mathsf{W}_{\theta^\star}(\theta)\big|\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}0.$$
**Contexte :** condition suffisante pour (H-1) lorsque $\widehat M_n(\theta)=n^{-1}\sum_{k=1}^n m(\theta,X_k)$ et $\mathsf M_{\theta^\star}(\theta)=\mathbb{E}_{\theta^\star}[m(\theta,X_1)]$, « à condition que l'espace des paramètres soit compact ».
**Preuve (étapes) :**
1. *Module de continuité* : $w_\delta(x):=\sup_{\{\theta,\vartheta\in K:\ \|\theta-\vartheta\|\le\delta\}}|\phi(\theta,x)-\phi(\vartheta,x)|$. Par le Lemme 2.1 (Outils), sous (i)–(ii), $\mathsf W_{\theta^\star}$ est continue sur $K$ et $\int w_\delta\,d\mathbb{Q}_{\theta^\star}\to0$ quand $\delta\to0^+$. Fixer $\delta>0$ tel que $\int w_\delta(x)\mathbb{Q}_{\theta^\star}(dx)\le\varepsilon/4$.
2. *Recouvrement fini* (compacité de $K$) : il existe $L\in\mathbb{N}$ et $\theta^{(1)},\dots,\theta^{(L)}\in K$ tels que $K\subseteq\bigcup_{\ell=1}^L\mathrm{B}(\theta^{(\ell)},\delta)$ ; alors $\sup_{\theta\in K}|\widehat W_n-\mathsf W_{\theta^\star}|=\max_{1\le\ell\le L}\sup_{\theta\in\mathrm{B}(\theta^{(\ell)},\delta)\cap K}|\widehat W_n(\theta)-\mathsf W_{\theta^\star}(\theta)|$.
3. *Inégalité triangulaire* pour $\theta\in\mathrm{B}(\theta^{(\ell)},\delta)\cap K$ :
$$|\widehat W_n(\theta)-\mathsf W_{\theta^\star}(\theta)|\le|\widehat W_n(\theta)-\widehat W_n(\theta^{(\ell)})|+|\widehat W_n(\theta^{(\ell)})-\mathsf W_{\theta^\star}(\theta^{(\ell)})|+|\mathsf W_{\theta^\star}(\theta^{(\ell)})-\mathsf W_{\theta^\star}(\theta)|.$$
4. *Troisième terme* (sans aléa) : pour $\|\theta-\theta^{(\ell)}\|\le\delta$, $|\mathsf W_{\theta^\star}(\theta^{(\ell)})-\mathsf W_{\theta^\star}(\theta)|\le\mathbb{E}_{\theta^\star}[|\phi(\theta^{(\ell)},X_1)-\phi(\theta,X_1)|]\le\mathbb{E}_{\theta^\star}[w_\delta(X_1)]\le\varepsilon/4$.
5. *Premier terme* : $\sup_{\theta\in\mathrm{B}(\theta^{(\ell)},\delta)\cap K}|\widehat W_n(\theta)-\widehat W_n(\theta^{(\ell)})|\le\frac1n\sum_{i=1}^n w_\delta(X_i)$, majoration indépendante de $\ell$. Les $w_\delta(X_i)$ sont i.i.d. intégrables ($w_\delta\le2\sup_{\theta\in K}|\phi(\theta,\cdot)|$) ; **LGN faible (Th. 2.1)** : $\frac1n\sum w_\delta(X_i)\to\mathbb{E}_{\theta^\star}[w_\delta(X_1)]\le\varepsilon/4$ en proba, d'où $\lim_n\mathbb{P}_{n,\theta^\star}(n^{-1}\sum w_\delta(X_i)\ge\varepsilon/2)=0$.
6. *Second terme* : LGN appliquée en chacun des $L$ points (nombre **fini**) : $\max_{1\le\ell\le L}|\widehat W_n(\theta^{(\ell)})-\mathsf W_{\theta^\star}(\theta^{(\ell)})|\to0$ en proba.
7. *Rassemblement* :
$$\mathbb{P}_{n,\theta^\star}\Big(\sup_{\theta\in K}|\widehat W_n(\theta)-\mathsf W_{\theta^\star}(\theta)|\ge\varepsilon\Big)\le\mathbb{P}_{n,\theta^\star}\Big(\frac1n\sum_{i=1}^nw_\delta(X_i)\ge\frac\varepsilon2\Big)+\mathbb{P}_{n,\theta^\star}\Big(\max_{1\le\ell\le L}|\widehat W_n(\theta^{(\ell)})-\mathsf W_{\theta^\star}(\theta^{(\ell)})|\ge\frac\varepsilon4\Big)\to0.$$ □
**Intuition (encadré p. 16) :** la compacité intervient **deux fois** : (1) recouvrement fini par des boules de rayon $\delta$ ⇒ ramène un sup sur un continuum à un max sur une liste finie (LGN terme à terme) ; (2) théorème de Heine ⇒ continuité uniforme de $\theta\mapsto\phi(\theta,x)$ ⇒ module de continuité $\to0$, ce qui contrôle l'intérieur de chaque boule. Sans compacité, le nombre de boules explose et la seconde majoration tombe.
**Pièges / erreurs classiques :** l'hypothèse (ii) est une **domination uniforme** ($\sup_\theta$ **dans** l'intégrale), plus forte que $\sup_\theta\int|\phi|$. Le poly utilise la lettre $\phi$ (phi droit) pour la fonction, à ne pas confondre avec les tests $\phi_n$ de la §1.2 ni avec l'enveloppe $\varphi$ du Lemme 2.1.

### Lemme 1.1 — Maximum isolé sur un compact
**Source :** Poly ch.7, Lemme 1.1, p. 16
**Hypothèses :** $\Theta$ compact de $\mathbb{R}^d$ et, pour tout $\theta^\star\in\Theta$ : (i) $\theta\mapsto\mathsf{M}_{\theta^\star}(\theta)$ continue sur $\Theta$ ; (ii) pour tout $\theta\in\Theta$, $\theta\ne\theta^\star$ : $\mathsf{M}_{\theta^\star}(\theta)<\mathsf{M}_{\theta^\star}(\theta^\star)$.
**Énoncé :** l'hypothèse (H-2) du Th. 1.1 est vérifiée.
**Preuve (étapes) :**
1. $\Theta\setminus\mathrm{B}(\theta^\star,\varepsilon)$ est fermé dans le compact $\Theta$, donc compact.
2. S'il est vide, le sup vaut $-\infty$ : rien à démontrer.
3. Sinon, la fonction continue $\mathsf M_{\theta^\star}$ y atteint son maximum en un point $\theta_\varepsilon\ne\theta^\star$ (théorème des bornes atteintes) et $\sup_{\|\theta-\theta^\star\|\ge\varepsilon}\mathsf{M}_{\theta^\star}(\theta)=\mathsf{M}_{\theta^\star}(\theta_\varepsilon)<\mathsf{M}_{\theta^\star}(\theta^\star)$ par (ii). □
**Intuition :** sur un compact, « maximum unique » + continuité ⇒ « maximum isolé » ; c'est la compacité qui empêche le sup d'être approché à l'infini.
**Pièges / erreurs classiques :** sans compacité, unicité stricte ponctuelle ⇏ (H-2).

### Corollaire 1.1 — Consistance d'un M-estimateur, cas compact
**Source :** Poly ch.7, Corollaire 1.1, p. 16
**Hypothèses :** $\Theta$ compact de $\mathbb{R}^d$ et
- (i) pour tout $x\in\mathsf{X}$, $\theta\mapsto m(\theta,x)$ continue sur $\Theta$ ;
- (ii) pour tout $\theta^\star\in\Theta$, $\displaystyle\int\sup_{\theta\in\Theta}|m(\theta,x)|\,\mathbb{Q}_{\theta^\star}(dx)<\infty$ ;
- (iii) pour tous $\theta,\theta^\star\in\Theta$ avec $\theta\ne\theta^\star$, $\mathsf{M}_{\theta^\star}(\theta)<\mathsf{M}_{\theta^\star}(\theta^\star)$.
**Énoncé :** toute suite $\{\hat\theta_n\}$ de M-estimateurs associés à $m$ (au sens de la Déf. 1.1) est consistante.
**Preuve (étapes) :**
1. (i)+(ii) = hypothèses du Th. 1.2 avec $K=\Theta$, $\phi=m$ ⇒ (H-1).
2. Le Lemme 2.1 (Outils) assure la continuité de $\theta\mapsto\mathsf M_{\theta^\star}(\theta)$ ; avec (iii), le Lemme 1.1 donne (H-2).
3. (H-3) est la définition même d'un M-estimateur.
4. Le Th. 1.1 conclut. □
**Intuition :** énoncé « directement vérifiable » : continuité + domination + identifiabilité stricte sur un compact.
**Pièges / erreurs classiques :** la continuité de $\mathsf M_{\theta^\star}$ n'est pas une hypothèse : elle **découle** de (i)+(ii) par convergence dominée (Lemme 2.1).

### Exemple 1.5 — Consistance de l'estimateur des moindres carrés dans un modèle de translation
**Source :** Poly ch.7, Exemple 1.5, p. 17
**Hypothèses :** modèle de translation de l'Ex. 1.2 ($\int xq=0$, $\sigma^2:=\int x^2q(x)dx<\infty$) ; $\Theta$ **segment borné** de $\mathbb{R}$ ; $m(\theta,x):=-(x-\theta)^2$.
**Énoncé :** $\mathsf{M}_{\theta^\star}(\theta)=-\int(x-\theta)^2q(x-\theta^\star)dx=-\sigma^2-(\theta^\star-\theta)^2$ ; $\theta\mapsto\widehat M_n(\theta)=-n^{-1}\sum_{i=1}^n(X_i-\theta)^2$ a l'unique maximum $\hat\theta_n=\bar X_n$. Convergence uniforme établie **directement** : en écrivant $X_i-\theta=(X_i-\theta^\star)+(\theta^\star-\theta)$,
$$\begin{aligned}\widehat M_n(\theta)-\mathsf{M}_{\theta^\star}(\theta)&=-\frac1n\sum_{i=1}^n\{(X_i-\theta^\star)+(\theta^\star-\theta)\}^2+\sigma^2+(\theta-\theta^\star)^2\\&=-\Big\{\frac1n\sum_{i=1}^n(X_i-\theta^\star)^2-\sigma^2\Big\}+2(\theta-\theta^\star)\Big\{\frac1n\sum_{i=1}^nX_i-\theta^\star\Big\},\end{aligned}$$
d'où
$$\sup_{\theta\in\Theta}\big|\widehat M_n(\theta)-\mathsf{M}_{\theta^\star}(\theta)\big|\le\Big|\frac1n\sum_{i=1}^n(X_i-\theta^\star)^2-\sigma^2\Big|+2\,\mathrm{diam}(\Theta)\Big|\frac1n\sum_{i=1}^nX_i-\theta^\star\Big|.$$
Sous $\mathbb{P}_{n,\theta^\star}$, les $X_i-\theta^\star$ sont i.i.d. de densité $q$, centrées, de variance $\sigma^2$ ; la LGN faible donne la convergence en probabilité vers 0 des deux termes, donc (H-1). (H-2) résulte du Lemme 1.1 ; (H-3) de la définition de $\hat\theta_n$ : **$\{\bar X_n\}$ est consistante.**
**Méthodes mobilisées :** vérification des hypothèses du Th. 1.1 ; développement du carré ; borne uniforme par le diamètre ; LGN (deux fois) ; Lemme 1.1.
**Preuve (étapes) :** voir énoncé (chaque étape est justifiée : développement algébrique ; inégalité triangulaire et $|\theta-\theta^\star|\le\mathrm{diam}(\Theta)$ ; LGN ; Lemme 1.1 pour (H-2) car $\mathsf M_{\theta^\star}$ continue et strictement maximale en $\theta^\star$ sur le compact $\Theta$).
**Intuition :** le caractère **borné** de $\Theta$ est essentiel : il transforme le facteur $|\theta-\theta^\star|$ en constante, donc une convergence simple en convergence uniforme.
**Pièges / erreurs classiques :** le poly souligne qu'employer le théorème général ici est « évidemment maladroit » ($\bar X_n$ explicite, consistance directe par la LGN) : le Th. 1.1 prend son sens quand l'estimateur n'a pas d'expression explicite (cas le plus fréquent). Le signe : $+2(\theta-\theta^\star)$ (et non $-$).

### Remarque (non numérotée) — Consistance des Z-estimateurs : principe
**Source :** Poly ch.7, §1.4 « Consistance des Z-estimateurs », p. 17
**Énoncé :** la consistance des Z-estimateurs se déduit de celle des M-estimateurs par changement de fonction objectif : **annuler $\widehat\Psi_n$, c'est maximiser $-\|\widehat\Psi_n\|$**.
**Preuve (étapes) :** voir Th. 1.3.
**Intuition :** $-\|\widehat\Psi_n\|\le0$ avec égalité exactement aux zéros.
**Pièges / erreurs classiques :** —

### Théorème 1.3 — Consistance des Z-estimateurs
**Source :** Poly ch.7, Théorème 1.3, p. 18
**Hypothèses :** pour tout $n$, $\theta\mapsto\widehat\Psi_n(\theta)$ fonction aléatoire sur $\Theta$ à valeurs dans $\mathbb{R}^d$ ; pour tout $\theta^\star$, $\theta\mapsto\Psi_{\theta^\star}(\theta)$ mesurable ;
- **(Hz-1)** pour tout $\theta^\star\in\Theta$, $\displaystyle\sup_{\theta\in\Theta}\big\|\widehat\Psi_n(\theta)-\Psi_{\theta^\star}(\theta)\big\|\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}0$ ;
- **(Hz-2)** pour tout $\theta^\star\in\Theta$, $\Psi_{\theta^\star}(\theta^\star)=0$ et, pour tout $\varepsilon>0$, $\displaystyle\inf_{\|\theta-\theta^\star\|\ge\varepsilon}\|\Psi_{\theta^\star}(\theta)\|>0$ ;
- **(Hz-3)** $\{\hat\theta_n\}$ à valeurs dans $\Theta$ et $\widehat\Psi_n(\hat\theta_n)=0$.
**Énoncé :** la suite $\{\hat\theta_n\}$ est consistante.
**Preuve (étapes) :**
1. Poser $\widehat M_n(\theta):=-\|\widehat\Psi_n(\theta)\|$ et $\mathsf{M}_{\theta^\star}(\theta):=-\|\Psi_{\theta^\star}(\theta)\|$ ; vérifier (H-1)–(H-3) du Th. 1.1.
2. (H-1) : par la **seconde inégalité triangulaire**, $|\widehat M_n(\theta)-\mathsf M_{\theta^\star}(\theta)|=\big|\|\Psi_{\theta^\star}(\theta)\|-\|\widehat\Psi_n(\theta)\|\big|\le\|\widehat\Psi_n(\theta)-\Psi_{\theta^\star}(\theta)\|$ ; donc (Hz-1) ⇒ (H-1).
3. (H-2) : par (Hz-2), $\mathsf M_{\theta^\star}(\theta^\star)=0$ et $\sup_{\|\theta-\theta^\star\|\ge\varepsilon}\mathsf M_{\theta^\star}(\theta)=-\inf_{\|\theta-\theta^\star\|\ge\varepsilon}\|\Psi_{\theta^\star}(\theta)\|<0=\mathsf M_{\theta^\star}(\theta^\star)$.
4. (H-3) : $\widehat M_n(\hat\theta_n)=0\ge\widehat M_n(\theta)$ pour tout $\theta$, par (Hz-3).
5. Le Th. 1.1 conclut. □
**Remarque (p. 18) :** le Th. 1.2 appliqué coordonnée par coordonnée à $\phi=\psi_j$, $1\le j\le d$, donne (Hz-1) lorsque $\Theta$ est compact, $\theta\mapsto\psi(\theta,x)$ continue et $\int\sup_{\theta\in\Theta}\|\psi(\theta,x)\|\,\mathbb{Q}_{\theta^\star}(dx)<\infty$.
**Intuition :** le zéro de la fonction limite doit être **isolé** : la norme de $\Psi_{\theta^\star}$ reste minorée hors de toute boule autour de $\theta^\star$.
**Pièges / erreurs classiques :** (Hz-2) est plus fort que « $\theta^\star$ est l'unique zéro ».

### Remarque (§1.5, non numérotée) — L'identité clé et les trois convergences (heuristique)
**Source :** Poly ch.7, §1.5, p. 18–19 — équations (1), (2), (3)
**Hypothèses :** cas scalaire $d=1$, $\Theta\subseteq\mathbb{R}$ (le cas vectoriel est en §4.4) ; $\{\hat\theta_n\}$ suite **consistante** de Z-estimateurs associés à $\psi$ ($\widehat\Psi_n(\hat\theta_n)=0$) ; $\theta\mapsto\psi(\theta,x)$ continûment différentiable au voisinage de $\theta^\star$.
**Énoncé :** On cherche $\alpha_n\to\infty$ telle que $\alpha_n(\hat\theta_n-\theta^\star)$ converge en loi vers une limite non dégénérée ; ce sera $\alpha_n=\sqrt n$ et une gaussienne centrée. Taylor avec reste intégral (Lemme 2.2) :
$$\psi(\theta,x)=\psi(\theta^\star,x)+\psi'(\theta^\star,x)(\theta-\theta^\star)+r(\theta-\theta^\star,x)(\theta-\theta^\star),\tag{1}$$
$$r(t,x):=\int_0^1\{\psi'(\theta^\star+wt,x)-\psi'(\theta^\star,x)\}\,dw.\tag{2}$$
En appliquant (1) en $\theta=\hat\theta_n$, $x=X_i$ et en sommant :
$$0=\widehat\Psi_n(\hat\theta_n)=\widehat\Psi_n(\theta^\star)+\big\{\widehat\Psi_n'(\theta^\star)+R_n\big\}(\hat\theta_n-\theta^\star),\qquad R_n:=\frac1n\sum_{i=1}^nr(\hat\theta_n-\theta^\star,X_i),$$
puis, en multipliant par $\sqrt n$ et en divisant par l'accolade :
$$\sqrt n\big(\hat\theta_n-\theta^\star\big)=\frac{-\sqrt n\,\widehat\Psi_n(\theta^\star)}{\widehat\Psi_n'(\theta^\star)+R_n}.\tag{3}$$
Les trois convergences :
- **Numérateur** : comme $\mathbb{E}_{\theta^\star}[\psi(\theta^\star,X_1)]=0$, $\sqrt n\,\widehat\Psi_n(\theta^\star)=\sqrt n\big(\frac1n\sum\psi(\theta^\star,X_i)-\mathbb{E}_{\theta^\star}[\psi(\theta^\star,X_1)]\big)$ ; si $\mathbb{E}_{\theta^\star}[\psi^2(\theta^\star,X_1)]<\infty$, **TCL** (th. 1.6 du ch.6) : $\sqrt n\,\widehat\Psi_n(\theta^\star)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\big(0,\mathbb{E}_{\theta^\star}[\psi^2(\theta^\star,X_1)]\big)$.
- **Dénominateur** : $\widehat\Psi_n'(\theta^\star)=n^{-1}\sum_{k=1}^n\psi'(\theta^\star,X_k)$ ; si $\mathbb{E}_{\theta^\star}[|\psi'(\theta^\star,X_1)|]<\infty$, **LGN faible** (Th. 2.1) : $\widehat\Psi_n'(\theta^\star)\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}\mathbb{E}_{\theta^\star}[\psi'(\theta^\star,X_1)]$, supposée **non nulle**.
- **Reste** : montrer $R_n\to0$ en proba. Pour $\delta>0$, $\{|R_n|\ge\varepsilon\}\subseteq\{|R_n|\ge\varepsilon,\ |\hat\theta_n-\theta^\star|\le\delta\}\cup\{|\hat\theta_n-\theta^\star|>\delta\}$ ; le second a une probabilité $\to0$ (**consistance**) ; sur le premier, $|R_n|\le\frac1n\sum_i\sup_{|\theta-\theta^\star|\le\delta}|\psi'(\theta,X_i)-\psi'(\theta^\star,X_i)|$. Sous la **domination** $\sup_{\theta\in\mathcal V(\theta^\star)}|\psi'(\theta,x)|\le g(x)$, $\mathbb{E}_{\theta^\star}[g(X_1)]<\infty$, la **convergence dominée** donne $\lim_{\delta\to0}\mathbb{E}_{\theta^\star}[\sup_{|\theta-\theta^\star|\le\delta}|\psi'(\theta,X_1)-\psi'(\theta^\star,X_1)|]=0$ ; choisir $\delta$ petit puis **Markov** rend la probabilité du premier événement arbitrairement petite.
**Preuve (étapes) :** il s'agit d'une heuristique ; la preuve rigoureuse est celle du Th. 1.4.
**Intuition (encadré p. 19) :** l'erreur = (écart entre équation empirique et théorique au vrai paramètre) / (pente de l'équation d'estimation). Plus $\theta\mapsto\Psi_{\theta^\star}(\theta)$ traverse zéro avec une **pente raide**, moins une perturbation déplace la solution : c'est pourquoi la pente au carré est au dénominateur de la variance asymptotique $\mathbb{E}[\psi^2]/(\mathbb{E}[\psi'])^2$.
**Pièges / erreurs classiques :** l'écriture (3) suppose que $\hat\theta_n$ est dans le voisinage de validité du développement et que le dénominateur ne s'annule pas ; **la démonstration du Th. 1.4 ne fait pas cette division** et procède autrement. (Dans l'encadré, le poly écrit $\mathbb{E}^\star_\theta$ pour $\mathbb{E}_{\theta^\star}$.)

### Théorème 1.4 — Normalité asymptotique des Z-estimateurs, cas scalaire
**Source :** Poly ch.7, Théorème 1.4, p. 20–21 — équations (4)–(9)
**Hypothèses :** $\Theta\subseteq\mathbb{R}$ ; $\{\hat\theta_n\}$ suite **consistante** de Z-estimateurs associés à $\psi:\Theta\times\mathsf{X}\to\mathbb{R}$ ; pour tout $\theta^\star\in\Theta^o$ :
- (i) $\mathbb{E}_{\theta^\star}[\psi(\theta^\star,X_1)]=0$ et $\mathbb{E}_{\theta^\star}[\psi^2(\theta^\star,X_1)]<\infty$ ;
- (ii) il existe un voisinage $\mathcal V(\theta^\star)\subseteq\Theta$ de $\theta^\star$ tel que, pour tout $x\in\mathsf X$, $\theta\mapsto\psi(\theta,x)$ soit **continûment différentiable** sur $\mathcal V(\theta^\star)$, et une fonction mesurable $g$ telle que $$\sup_{\theta\in\mathcal V(\theta^\star)}|\psi'(\theta,x)|\le g(x)\ \text{ pour tout }x\in\mathsf X,\qquad\mathbb{E}_{\theta^\star}[g(X_1)]<\infty;$$
- (iii) $\mathbb{E}_{\theta^\star}[\psi'(\theta^\star,X_1)]\ne0$.
**Énoncé :** pour tout $\theta^\star\in\Theta^o$,
$$\sqrt n\big(\hat\theta_n-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\big(0,v_\psi(\theta^\star)\big),\qquad v_\psi(\theta):=\frac{\mathbb{E}_\theta[\psi^2(\theta,X_1)]}{\big(\mathbb{E}_\theta[\psi'(\theta,X_1)]\big)^2}.$$
**Preuve (étapes) :**
1. *Contrôle du reste intégral.* Pour $\delta>0$ avec $[\theta^\star-\delta,\theta^\star+\delta]\subseteq\mathcal V(\theta^\star)$ : $R_\delta(x):=\sup_{|t|\le\delta}|r(t,x)|\le2g(x)$ (par (ii), chaque terme de l'intégrande de (2) est $\le g$) et $\lim_{\delta\to0}R_\delta(x)=0$ (continuité de $\theta\mapsto\psi'(\theta,x)$ en $\theta^\star$). **Convergence dominée** : $$\lim_{\delta\to0}\mathbb{E}_{\theta^\star}[R_\delta(X_1)]=0.\tag{4}$$
2. *Développement de l'équation empirique.* En appliquant (1) à chaque observation, pour tout $t$ tel que $\theta^\star+t\in\mathcal V(\theta^\star)$ : $$\widehat\Psi_n(\theta^\star+t)=\frac1n\sum_{i=1}^n\psi(\theta^\star,X_i)+t\,\mathbb{E}_{\theta^\star}[\psi'(\theta^\star,X_1)]+t\,R_n(t),\tag{5}$$ où $R_n(t):=R_n^{(1)}+R_n^{(2)}(t)$, $R_n^{(1)}:=\frac1n\sum_{i=1}^n\{\psi'(\theta^\star,X_i)-\mathbb{E}_{\theta^\star}[\psi'(\theta^\star,X_1)]\}$, $R_n^{(2)}(t):=\frac1n\sum_{i=1}^nr(t,X_i)$.
3. *Premier reste.* Les $\psi'(\theta^\star,X_i)$ sont i.i.d. intégrables par (ii) ; **LGN faible (Th. 2.1)** : $$R_n^{(1)}\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}0.\tag{6}$$
4. *Second reste, uniformément sur une boule qui rétrécit.* Pour toute suite $\delta_n\downarrow0$ : $\sup_{|t|\le\delta_n}|R_n^{(2)}(t)|\le n^{-1}\sum_{i=1}^nR_{\delta_n}(X_i)$ et $\mathbb{E}_{n,\theta^\star}[n^{-1}\sum R_{\delta_n}(X_i)]=\mathbb{E}_{\theta^\star}[R_{\delta_n}(X_1)]$ ; **inégalité de Markov** (lemme 2.1 du ch.6) et (4) : $$\sup_{|t|\le\delta_n}\big|R_n^{(2)}(t)\big|\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}0.\tag{7}$$
5. *Évaluation au point aléatoire $\Delta_n:=\hat\theta_n-\theta^\star$.* Par **consistance**, il existe $\delta_n\to0$ avec $\lim_n\mathbb{P}_{n,\theta^\star}(|\Delta_n|\ge\delta_n)=0$ ; quitte à la diminuer, $[\theta^\star-\delta_n,\theta^\star+\delta_n]\subseteq\mathcal V(\theta^\star)$. Pour tout $\varepsilon>0$ : $\mathbb{P}_{n,\theta^\star}(|R_n^{(2)}(\Delta_n)|\ge\varepsilon)\le\mathbb{P}_{n,\theta^\star}(\sup_{|t|\le\delta_n}|R_n^{(2)}(t)|\ge\varepsilon)+\mathbb{P}_{n,\theta^\star}(|\Delta_n|\ge\delta_n)$, donc $R_n^{(2)}(\Delta_n)\to0$ en proba et, avec (6), $$R_n(\Delta_n)\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}0.\tag{8}$$
6. *Identité sans division.* Sur $\{|\Delta_n|\le\delta_n\}$ (probabilité $\to1$), (5) avec $t=\Delta_n$ et $\widehat\Psi_n(\hat\theta_n)=0$, multipliée par $\sqrt n$ : $$0=\frac1{\sqrt n}\sum_{i=1}^n\psi(\theta^\star,X_i)+\sqrt n\big(\hat\theta_n-\theta^\star\big)\big\{\mathbb{E}_{\theta^\star}[\psi'(\theta^\star,X_1)]+R_n(\Delta_n)\big\}.\tag{9}$$
7. *TCL* (th. 1.6 du ch.6) et (i) : $\frac1{\sqrt n}\sum_{i=1}^n\psi(\theta^\star,X_i)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\big(0,\mathbb{E}_{\theta^\star}[\psi^2(\theta^\star,X_1)]\big)$.
8. *Dénominateur* : par (8) et (iii), l'accolade de (9) converge en proba vers $\mathbb{E}_{\theta^\star}[\psi'(\theta^\star,X_1)]\ne0$.
9. *Conclusion* : **lemme de Slutsky** (lemme 1.1 du ch.6) et **théorème de transformation continue** (th. 1.4 du ch.6) appliqué à $(u,c)\mapsto-u/c$ au voisinage de $c=\mathbb{E}_{\theta^\star}[\psi'(\theta^\star,X_1)]$ : $\sqrt n(\hat\theta_n-\theta^\star)\Rightarrow-\,\mathcal N(0,\mathbb{E}[\psi^2])/\mathbb{E}[\psi']=\mathcal N(0,v_\psi(\theta^\star))$. □
**Intuition :** TCL au numérateur, LGN au dénominateur, reste négligeable grâce à consistance + domination ; Slutsky assemble. Variance = (variance de $\psi$) / (pente moyenne)$^2$.
**Pièges / erreurs classiques :**
- **Deux remarques sur les hypothèses (encadré p. 21)** : (a) le jeu d'hypothèses est **local** (au voisinage de chaque $\theta^\star$ **intérieur**), ce qui exclut les points de la frontière quand $\Theta$ n'est pas ouvert ; l'exercice 4 montre sur $\mathcal N(\theta,1)$ avec $\Theta=\mathbb{R}_+$ que la conclusion tombe en $\theta=0$. (b) L'hypothèse (ii) de différentiabilité n'est **pas** vérifiée par $\psi(\theta,x)=\operatorname{signe}(x-\theta)$, donc pas par la médiane empirique ; sa normalité asymptotique s'établit par la loi des statistiques d'ordre (§4.8).
- La **consistance** est une **hypothèse** du théorème (à établir séparément, Th. 1.1/1.3).
- Ne pas oublier le carré au dénominateur de $v_\psi$, ni la condition $\mathbb{E}[\psi']\neq0$.
- **Complément, hors programme (encadré p. 21)** : la preuve n'utilise $\widehat\Psi_n(\hat\theta_n)=0$ qu'à travers (9) ; elle vaut sous l'hypothèse plus faible $\sqrt n\,\widehat\Psi_n(\hat\theta_n)\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}0$ (solutions approchées) — forme du théorème II-2.15 du polycopié d'origine.

### Remarque (non numérotée) — $n^{-1/2}$ est le bon ordre de grandeur de l'erreur
**Source :** Poly ch.7, encadré « Intuition » après le Th. 1.4, p. 21
**Hypothèses :** conclusion du Th. 1.4 ; $\alpha_n\to\infty$ une autre normalisation.
**Énoncé :** $\alpha_n(\hat\theta_n-\theta^\star)=(\alpha_n/\sqrt n)\cdot\sqrt n(\hat\theta_n-\theta^\star)$ tend vers 0 en probabilité si $\alpha_n/\sqrt n\to0$, et devient arbitrairement grande, au sens où $\liminf_n\mathbb{P}_{n,\theta^\star}(|\alpha_n(\hat\theta_n-\theta^\star)|\ge M)>0$ pour tout $M$, si $\alpha_n/\sqrt n\to\infty$. Seule la normalisation $\sqrt n$ donne une limite non dégénérée.
**Preuve (étapes) :** Slutsky (produit d'une suite convergeant en loi par une suite déterministe tendant vers 0) ; pour le second cas, argument esquissé seulement.
**Intuition :** l'erreur est de l'ordre de $1/\sqrt n$.
**Pièges / erreurs classiques :** dans les modèles non réguliers (Ex. 1.10) la bonne vitesse est $n$.

### Remarque (§1.6, non numérotée) — Centrage de $m'$ en $\theta^\star$
**Source :** Poly ch.7, §1.6 (Intuition), p. 21–22
**Hypothèses :** permutation dérivation/espérance licite (hypothèse de domination, du type de la proposition 2.2 du ch.3) ; $\theta^\star$ **intérieur** à $\Theta$.
**Énoncé :** $\theta^\star$ maximise $\theta\mapsto\mathsf M_{\theta^\star}(\theta)=\mathbb{E}_{\theta^\star}[m(\theta,X_1)]$, donc
$$\mathbb{E}_{\theta^\star}[m'(\theta^\star,X_1)]=\partial_\theta\mathbb{E}_{\theta^\star}[m(\theta,X_1)]\big|_{\theta=\theta^\star}=0,$$
et $\psi:=m'$ vérifie la condition de centrage de la Déf. 1.2. La loi limite des M-estimateurs s'obtient de celle des Z-estimateurs par $\psi=m'$.
**Preuve (étapes) :** condition du premier ordre en un max intérieur + dérivation sous l'espérance.
**Intuition :** —
**Pièges / erreurs classiques :** « la permutation n'est pas gratuite ».

### Théorème 1.5 — Normalité asymptotique des M-estimateurs, cas scalaire
**Source :** Poly ch.7, Théorème 1.5, p. 22
**Hypothèses :** $\Theta\subseteq\mathbb{R}$ ; $\{\hat\theta_n\}$ suite **consistante** de M-estimateurs associés à $m:\Theta\times\mathsf X\to\mathbb{R}$, **à valeurs dans $\Theta^o$** ; pour tout $\theta^\star\in\Theta^o$ :
- (i) il existe $\mathcal V(\theta^\star)\subseteq\Theta$ tel que, pour tout $x$, $\theta\mapsto m(\theta,x)$ soit **deux fois continûment différentiable** sur $\mathcal V(\theta^\star)$, et $g$ mesurable avec $\sup_{\theta\in\mathcal V(\theta^\star)}|m''(\theta,x)|\le g(x)$ pour tout $x$, $\mathbb{E}_{\theta^\star}[g(X_1)]<\infty$ ;
- (ii) $\mathbb{E}_{\theta^\star}[m'(\theta^\star,X_1)]=0$ et $0<\mathbb{E}_{\theta^\star}[m'(\theta^\star,X_1)^2]<\infty$ ;
- (iii) $\mathbb{E}_{\theta^\star}[m''(\theta^\star,X_1)]\ne0$.
**Énoncé :** pour tout $\theta^\star\in\Theta^o$,
$$\sqrt n\big(\hat\theta_n-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\left(0,\frac{\mathbb{E}_{\theta^\star}[m'(\theta^\star,X_1)^2]}{\{\mathbb{E}_{\theta^\star}[m''(\theta^\star,X_1)]\}^2}\right).$$
**Preuve (étapes) :**
1. Poser $\psi(\theta,x):=m'(\theta,x)$, d'où $\psi'=m''$.
2. Comme $\hat\theta_n\in\Theta^o$ maximise $\widehat M_n$, la **Prop. 1.1** donne $\widehat\Psi_n(\hat\theta_n)=0$ : $\{\hat\theta_n\}$ est une suite consistante de Z-estimateurs associés à $\psi$.
3. (i), (ii), (iii) sont exactement (i), (ii), (iii) du **Th. 1.4** pour ce $\psi$ ($C^2$ de $m$ = $C^1$ de $\psi$ ; domination de $m''$ = domination de $\psi'$).
4. Conclusion du Th. 1.4. □
**Intuition :** variance « sandwich » scalaire : $\mathbb{E}[m'^2]/(\mathbb{E}[m''])^2$.
**Pièges / erreurs classiques :** hypothèse « à valeurs dans $\Theta^o$ » indispensable pour la Prop. 1.1 ; (ii) contient $>0$ (variance non nulle).

### Remarque (§1.7, non numérotée) — Application à l'EMV
**Source :** Poly ch.7, §1.7, p. 22
**Énoncé :** L'EMV est le M-estimateur associé à la log-vraisemblance et, lorsque celle-ci est dérivable, le Z-estimateur associé au score. Les Th. 1.4–1.5 s'y appliquent et la variance asymptotique prend une forme remarquable.

### Définition 1.3 — Fonction score
**Source :** Poly ch.7, Définition 1.3, p. 22 (rappel du ch.3)
**Hypothèses :** modèle dominé $\mathbb{Q}_\theta=q_\theta\cdot\mu$, $\Theta\subseteq\mathbb{R}$.
**Énoncé :** pour $\theta\in\Theta$, $x\in\mathsf X$ : $\ell(\theta,x):=\log q_\theta(x)$. Lorsqu'elle existe, la dérivée
$$\dot\ell(\theta,x):=\partial_\theta\log q_\theta(x)$$
s'appelle **fonction score** (ou score de Fisher). On note $\ddot\ell(\theta,x):=\partial_\theta^2\log q_\theta(x)$.
**Preuve (étapes) :** —
**Intuition :** sensibilité de la log-densité au paramètre.
**Pièges / erreurs classiques :** notation pointée $\dot\ell$, $\ddot\ell$ (et non $\ell'$).

### Définition 1.4 — Information de Fisher
**Source :** Poly ch.7, Définition 1.4, p. 23
**Hypothèses :** modèle régulier (définition 1.6 du ch.3), $\theta\in\Theta$.
**Énoncé :** l'information de Fisher est la variance du score :
$$\mathbb{I}(\theta):=\mathbb{E}_\theta\Big[\big\{\dot\ell(\theta,X_1)\big\}^2\Big]=\int\big(\dot\ell(\theta,x)\big)^2\,\mathbb{Q}_\theta(dx).$$
**Propriétés utilisées (proposition 1.2 du ch.3), p. 23 :** dans un modèle régulier, le score est centré, $\mathbb{E}_\theta[\dot\ell(\theta,X_1)]=\int\dot\ell(\theta,x)\,\mathbb{Q}_\theta(dx)=0$, et
$$\mathbb{I}(\theta)=\mathbb{E}_\theta\Big[\big(\dot\ell(\theta,X_1)\big)^2\Big]=-\mathbb{E}_\theta\big[\ddot\ell(\theta,X_1)\big].\tag{10}$$
**Preuve (étapes) :** admise ici (renvoi au ch.3, dérivation sous le signe intégral de $\int q_\theta d\mu=1$).
**Intuition :** « variance du score » car le score est centré.
**Pièges / erreurs classiques :** l'égalité (10) requiert la régularité (permutation dérivée/intégrale) ; elle est ce qui simplifie la variance de l'EMV.

### Exemple 1.6 — Information de Fisher du modèle gaussien
**Source :** Poly ch.7, Exemple 1.6, p. 23
**Hypothèses :** $\mathbb{Q}_\theta=\mathcal N(\theta,\sigma^2)$, $\sigma^2$ connu.
**Énoncé :**
$$\ell(\theta,x)=-\frac12\log(2\pi\sigma^2)-\frac1{2\sigma^2}(x-\theta)^2,\qquad\dot\ell(\theta,x)=\frac{x-\theta}{\sigma^2},\qquad\ddot\ell(\theta,x)=-\frac1{\sigma^2},$$
d'où $\mathbb{I}(\theta)=\sigma^{-2}$.
**Méthodes mobilisées :** calcul du score par dérivation de la log-densité ; information via $-\mathbb{E}[\ddot\ell]$ (éq. (10)).
**Preuve (étapes) :** dérivations directes ; $-\mathbb{E}[\ddot\ell]=1/\sigma^2$ (ou $\mathbb{E}[(X-\theta)^2]/\sigma^4=1/\sigma^2$).
**Intuition :** plus le bruit est faible, plus l'information est grande.
**Pièges / erreurs classiques :** —

### Exemple 1.7 — Information de Fisher du modèle de Poisson
**Source :** Poly ch.7, Exemple 1.7, p. 23
**Hypothèses :** $\mathbb{Q}_\theta=\mathcal P\mathrm{oi}(\theta)$, $\theta\in\mathbb{R}_+^*$.
**Énoncé :**
$$\ell(\theta,x)=x\log\theta-\theta-\log(x!),\qquad\dot\ell(\theta,x)=\frac{x-\theta}\theta,\qquad\ddot\ell(\theta,x)=-\frac x{\theta^2},$$
et comme $\mathbb{E}_\theta[X_1]=\theta$, $\mathrm{Var}_\theta(X_1)=\theta$, les deux expressions de (10) donnent $\mathbb{I}(\theta)=1/\theta$.
**Méthodes mobilisées :** score ; vérification des deux formules de l'information : $\mathbb{E}[(X-\theta)^2]/\theta^2=\theta/\theta^2$ et $\mathbb{E}[X]/\theta^2=1/\theta$.
**Preuve (étapes) :** calcul direct.
**Intuition :** —
**Pièges / erreurs classiques :** loi notée $\mathcal P\mathrm{oi}$.

### Remarque (non numérotée) — Consistance de l'EMV
**Source :** Poly ch.7, §1.7, p. 23
**Hypothèses :** EMV = M-estimateur pour $m(\theta,x)=\ell(\theta,x)$ (Ex. 1.1) ; modèle identifiable.
**Énoncé :** pour tout $\theta^\star$, $\mathsf M_{\theta^\star}(\theta)=\mathrm{Ent}(q_{\theta^\star})-\mathrm{KL}(q_{\theta^\star},q_\theta)$ est maximale au seul point $\theta^\star$. Le **Corollaire 1.1** donne la consistance de $\{\hat\theta_n^{\mathrm{MV}}\}$ dès que $\Theta$ est **compact**, que $\theta\mapsto\log q_\theta(x)$ est continue pour tout $x$ et que $\int\sup_{\theta\in\Theta}|\log q_\theta(x)|\,\mathbb{Q}_{\theta^\star}(dx)<\infty$ pour tout $\theta^\star$. Énoncés précis (compact et non compact) : compléments §4.3.
**Méthodes mobilisées :** Ex. 1.1 + Cor. 1.1 (identifiabilité ⇒ (iii)).
**Preuve (étapes) :** application directe du Cor. 1.1.
**Intuition :** —
**Pièges / erreurs classiques :** compacité requise dans cette version.

### Remarque (non numérotée) — Normalité asymptotique de l'EMV (calcul)
**Source :** Poly ch.7, §1.7, p. 23–24
**Énoncé :** lorsque la log-vraisemblance est dérivable et le maximum intérieur, l'EMV est le Z-estimateur associé à $\psi(\theta,x)=\dot\ell(\theta,x)$. Le Th. 1.4 donne, si ses hypothèses sont vérifiées,
$$\sqrt n\big(\hat\theta_n^{\mathrm{MV}}-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\left(0,\frac{\mathbb{E}_{\theta^\star}\big[(\dot\ell(\theta^\star,X_1))^2\big]}{\big\{\mathbb{E}_{\theta^\star}[\ddot\ell(\theta^\star,X_1)]\big\}^2}\right),$$
et l'identité (10) fait disparaître l'une des espérances : numérateur $=\mathbb{I}(\theta^\star)$, dénominateur $=\mathbb{I}(\theta^\star)^2$.

### Théorème 1.6 — Normalité asymptotique du maximum de vraisemblance
**Source :** Poly ch.7, Théorème 1.6, p. 24
**Hypothèses :** hypothèses du Th. 1.4 appliquées à $\psi=\dot\ell$ (en particulier consistance de l'EMV, score $C^1$ dominé, $\mathbb{E}[\ddot\ell]\ne0$) ; identité (10).
**Énoncé :** pour tout $\theta^\star\in\Theta^o$,
$$\sqrt n\big(\hat\theta_n^{\mathrm{MV}}-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\left(0,\frac1{\mathbb{I}(\theta^\star)}\right).$$
**Preuve (étapes) :**
1. Th. 1.4 avec $\psi=\dot\ell$, $\psi'=\ddot\ell$.
2. Par (10), $v_{\dot\ell}(\theta^\star)=\mathbb{I}(\theta^\star)/\mathbb{I}(\theta^\star)^2=1/\mathbb{I}(\theta^\star)$.
**Intuition :** la précision asymptotique de l'EMV est donnée par l'information de Fisher.
**Pièges / erreurs classiques :** c'est la variance de $\sqrt n(\hat\theta-\theta^\star)$ qui vaut $1/\mathbb{I}$ ; la variance « approximative » de $\hat\theta_n$ est $1/(n\mathbb{I}(\theta^\star))$.

### Exemple 1.8 — Modèle de Poisson
**Source :** Poly ch.7, Exemple 1.8, p. 24
**Hypothèses :** suite de $n$-échantillons du modèle de Poisson, $\theta\in\Theta:=\mathbb{R}_+^*$, fonction de masse $x\mapsto\theta^xe^{-\theta}/x!$ sur $\mathbb{N}$.
**Énoncé :** la log-vraisemblance normalisée s'écrit
$$\theta\mapsto\frac1n\sum_{i=1}^n\ell(\theta,X_i)=\bar X_n\log\theta-\theta-\frac1n\log\Big(\prod_{i=1}^nX_i!\Big);$$
strictement concave sur $\mathbb{R}_+^*$ dès que $\bar X_n>0$, de maximum unique $\bar X_n$, donc $\hat\theta_n^{\mathrm{MV}}=\bar X_n$. Par le **TCL** directement ($\mathrm{Var}_\theta(X_1)=\theta$) : $\sqrt n(\hat\theta_n^{\mathrm{MV}}-\theta^\star)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N(0,\theta^\star)$. Le **Th. 1.6** donne le même résultat sans l'expression explicite : $\mathbb{I}(\theta^\star)=1/\theta^\star$, donc $\mathbb{I}^{-1}(\theta^\star)=\theta^\star$.
**Méthodes mobilisées :** calcul d'EMV par annulation du score / stricte concavité ; TCL ; Th. 1.6 et information de Fisher (Ex. 1.7) ; vérification de cohérence.
**Preuve (étapes) :**
1. Dérivée : $\bar X_n/\theta-1=0\iff\theta=\bar X_n$.
2. Dérivée seconde $-\bar X_n/\theta^2<0$ (concavité stricte si $\bar X_n>0$).
3. TCL.
4. Comparaison avec $1/\mathbb{I}$.
**Intuition :** deux routes, même résultat : la théorie générale retrouve le calcul explicite.
**Pièges / erreurs classiques :** si $\bar X_n=0$ (probabilité $e^{-n\theta}$, non nulle), le maximum n'est pas atteint dans $\mathbb{R}_+^*$ — d'où la précision « dès que $\bar X_n>0$ ».

### Remarque (non numérotée) — Comparer des Z-estimateurs par leur variance asymptotique
**Source :** Poly ch.7, §1.7 « Optimalité de l'EMV », p. 24
**Énoncé :** $v_\psi(\theta)$ dépend du choix de $\psi$. Deux Z-estimateurs d'un même paramètre se comparent par leurs variances asymptotiques (proposition 1.3 du ch.6) : la plus petite donne, pour $n$ grand, les intervalles de confiance asymptotiques les plus courts. Question : existe-t-il un plus petit élément ? Oui sous les conditions de régularité (Cadre 1.1).

### Cadre 1.1 — Conditions de régularité, cas scalaire
**Source :** Poly ch.7, Cadre 1.1, p. 24–25 (réécriture scalaire de la définition 1.6 du ch.3 ; appelé « conditions de régularité 1.1 » dans le texte)
**Hypothèses / Énoncé :** $\Theta$ **ouvert** de $\mathbb{R}$, $\mathbb{Q}_\theta=q_\theta\cdot\mu$ modèle dominé ; on suppose :
- **(R-1)** pour tout $\theta\in\Theta$ et $\mu$-presque tout $x\in\mathsf X$, $q_\theta(x)>0$ ;
- **(R-2)** pour $\mu$-presque tout $x$, $\theta\mapsto q_\theta(x)$ est deux fois continûment différentiable sur $\Theta$, et pour tout $\theta^\star\in\Theta$ il existe un voisinage $\mathcal V(\theta^\star)$ et deux fonctions mesurables positives $g$ et $h$ telles que, pour $\mu$-p.t. $x$, $$\sup_{\theta\in\mathcal V(\theta^\star)}\Big\{\big|\dot\ell(\theta,x)\big|^2+\big|\ddot\ell(\theta,x)\big|\Big\}\le h(x),\qquad\sup_{\theta\in\mathcal V(\theta^\star)}q_\theta(x)\le g(x),$$ et $\int(1+h(x))\,g(x)\,\mu(dx)<\infty$ ;
- **(R-3)** pour tout $\theta\in\Theta$, $0<\mathbb{E}_\theta\big[\dot\ell^{\,2}(\theta,X_1)\big]<\infty$ : l'information de Fisher existe et est inversible.
**Preuve (étapes) :** — (cadre d'hypothèses)
**Intuition :** support indépendant de $\theta$, régularité $C^2$, dominations locales permettant de dériver sous l'intégrale, information non dégénérée.
**Pièges / erreurs classiques :** (R-1)/(R-2) impliquent que le support de $\mathbb{Q}_\theta$ ne dépend pas de $\theta$ ; c'est ce qui échoue pour Uniforme$[0,\theta]$ et Pareto (Ex. 1.10).

### Théorème 1.7 — Optimalité asymptotique du maximum de vraisemblance
**Source :** Poly ch.7, Théorème 1.7, p. 25 — équation (11)
**Hypothèses :** suite de $n$-échantillons d'un **modèle régulier** $\{q_\theta\cdot\mu:\theta\in\Theta\}$, $\Theta$ **ouvert** de $\mathbb{R}$ (Cadre 1.1). Pour le second point : $\{\hat\theta_n\}$ suite consistante de Z-estimateurs associés à $\psi$ vérifiant les hypothèses du Th. 1.4, de variance asymptotique $v_\psi$.
**Énoncé :**
1. pour tout $\theta\in\Theta$, $$\sqrt n\big(\hat\theta_n^{\mathrm{MV}}-\theta\big)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal N\left(0,\frac1{\mathbb{I}(\theta)}\right);$$
2. pour tout $\theta\in\Theta$, $$v_\psi(\theta)\ge\frac1{\mathbb{I}(\theta)}.$$
Autrement dit, pour un modèle régulier, **l'EMV est asymptotiquement optimal (asymptotiquement efficace) dans la classe des Z-estimateurs.**
**Preuve (étapes) — second point (démontré dans le poly, par Cauchy-Schwarz) :**
1. *Centrage pour tout paramètre* : par définition d'une fonction d'influence, $\int\psi(\tau,x)\,q_\tau(x)\,\mu(dx)=0$ pour tout $\tau\in\Theta$ ; la dérivée en $\tau=\theta$ de cette fonction constante est nulle.
2. *Dérivation sous le signe intégral* (licite sous le Cadre 1.1 et la domination du Th. 1.4, par la proposition 2.2 du ch.3) : $$0=\int[\psi'(\theta,x)q_\theta(x)+\psi(\theta,x)\partial_\theta q_\theta(x)]\mu(dx)=\int\big[\psi'(\theta,x)+\psi(\theta,x)\dot\ell(\theta,x)\big]q_\theta(x)\,\mu(dx),$$ en utilisant $\partial_\theta q_\theta=q_\theta\,\dot\ell(\theta,\cdot)$, valable par (R-1). Donc $$\mathbb{E}_\theta[\psi'(\theta,X_1)]=-\mathbb{E}_\theta\big[\psi(\theta,X_1)\,\dot\ell(\theta,X_1)\big].\tag{11}$$
3. *Cauchy-Schwarz* (proposition 2.1 du ch.3) : $(\mathbb{E}_\theta[\psi'(\theta,X_1)])^2\le\mathbb{E}_\theta[\{\psi(\theta,X_1)\}^2]\ \mathbb{E}_\theta[\{\dot\ell(\theta,X_1)\}^2]$.
4. *Division* par $\mathbb{E}_\theta[\psi^2(\theta,X_1)]$, strictement positif puisque $\mathbb{E}_\theta[\psi'(\theta,X_1)]\ne0$ (sinon $\psi=0$ p.s. et (11) donnerait $\mathbb{E}[\psi']=0$) : $$v_\psi(\theta)^{-1}=\frac{(\mathbb{E}_\theta[\psi'(\theta,X_1)])^2}{\mathbb{E}_\theta[\{\psi(\theta,X_1)\}^2]}\le\mathbb{E}_\theta\big[\{\dot\ell(\theta,X_1)\}^2\big]=\mathbb{I}(\theta).$$ □
**Premier point : ADMIS** dans le poly (liste des résultats admis, §2.5). Le texte (p. 26) explique qu'il faut rendre rigoureux, sous les **seules** conditions de régularité, le raisonnement du Th. 1.6 ; le point délicat est le contrôle du reste $R_n$ de la preuve du Th. 1.4, fourni par la domination (R-2). Énoncé général pour $\Theta\subseteq\mathbb{R}^d$ : compléments §4.4 (théorème II-3.3 du polycopié d'origine).
**Intuition (encadré p. 26) :** (11) dit que la pente moyenne de l'équation d'estimation est, au signe près, la **covariance** entre la fonction d'influence et le score (les deux sont centrées sous $\mathbb{Q}_\theta$). Égalité dans Cauchy-Schwarz ⇔ $\psi(\theta,\cdot)$ proportionnelle à $\dot\ell(\theta,\cdot)$ ; $v_\psi$ est inchangée si l'on multiplie $\psi$ par une constante non nulle : le score est donc, à cette indétermination près, la seule fonction d'influence optimale. Le poly précise : « C'est une lecture du cas d'égalité, et non une démonstration de l'unicité. »
**Pièges / erreurs classiques :** l'optimalité est **dans la classe des Z-estimateurs réguliers** seulement (cf. estimateur de Hodges, §4.6). Il s'agit d'une borne sur la **variance asymptotique**, pas sur la variance à $n$ fixé (Cramér-Rao, ch.3). Le Th. 1.7 du ch.7 n'est pas la « méthode-δ » (Th. 1.7 du ch.6).

### Exemple 1.9 — Médiane empirique et maximum de vraisemblance dans le modèle de Cauchy
**Source :** Poly ch.7, Exemple 1.9, p. 26–27 (Figures 3 et 4)
**Hypothèses :** suite de $n$-échantillons du modèle $(\mathbb{R},\mathcal B(\mathbb{R}),\{q_\theta\cdot\mathrm{Leb}:\theta\in\mathbb{R}\})$, $$q_\theta(x):=\frac1{\pi(1+(x-\theta)^2)},\quad x\in\mathbb{R}.$$
**Énoncé :** le modèle n'a **de moment d'aucun ordre**, donc la moyenne empirique n'estime pas $\theta$. On compare
- la médiane empirique : $\widehat\theta_n^{\mathrm{med}}:=X_{(n+1)/2:n}$ si $n$ impair, $\widehat\theta_n^{\mathrm{med}}\in[X_{n/2:n},X_{n/2+1:n}]$ si $n$ pair ;
- l'EMV : $\hat\theta_n^{\mathrm{MV}}\in\operatorname*{arg\,min}_{\theta\in\mathbb{R}}\sum_{i=1}^n\log\big(1+(X_i-\theta)^2\big)$, sans expression explicite.
Sur $N=49$ observations simulées avec $\theta^\star=2$ : $\widehat\theta_n^{\mathrm{med}}=1{,}7717$ et $\hat\theta_n^{\mathrm{MV}}=1{,}7813$. Pour tout $\theta^\star\in\mathbb{R}$ :
$$\sqrt n\big(\widehat\theta_n^{\mathrm{med}}-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\left(0,\frac1{4(q_{\theta^\star}(\theta^\star))^2}\right),\qquad\sqrt n\big(\hat\theta_n^{\mathrm{MV}}-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\left(0,\frac1{\mathbb{I}(\theta^\star)}\right).$$
La première vient de la loi limite des statistiques d'ordre (pas du Th. 1.4, car $\psi=\operatorname{signe}(x-\theta)$ n'est pas différentiable ; rappel en §4.8). Pour Cauchy :
$$\dot\ell(\theta,x)=\frac{2(x-\theta)}{1+(x-\theta)^2},\qquad q_{\theta^\star}(\theta^\star)=\frac1\pi,\qquad\mathbb{I}(\theta^\star)=\int\big(\dot\ell(\theta^\star,x)\big)^2q_{\theta^\star}(x)dx=\frac12$$
(calcul en §4.8). Variances asymptotiques : $\pi^2/4\simeq2{,}47$ (médiane) et $2$ (EMV), en accord avec le Th. 1.7.
**Méthodes mobilisées :** EMV comme M-estimateur (minimisation de $-\log$-vraisemblance) ; normalité asymptotique de l'EMV (Th. 1.6/1.7) ; loi limite des quantiles empiriques (admise) ; calcul de l'information de Fisher (changement de variable trigonométrique, §4.8) ; comparaison par variance asymptotique.
**Preuve (étapes) :** la loi limite de la médiane est **admise** (§2.5) ; $\mathbb{I}=1/2$ calculé en §4.8.
**Intuition :** **Figure 3** : à gauche, les 49 observations (bleu) — avec des points très éloignés (queues lourdes) — et la densité $q_{\theta^\star}$ (rouge) ; à droite, l'opposé de la log-vraisemblance, dont le minimum définit $\hat\theta_n^{\mathrm{MV}}$. **Figure 4** : histogrammes de $10^4$ réalisations de $\sqrt n(\widehat\theta_n-\theta^\star)$, $n=499$, médiane (bleu) vs EMV (rouge), avec les densités $\mathcal N(0,\pi^2/4)$ et $\mathcal N(0,2)$ : l'histogramme rouge est plus resserré.
**Pièges / erreurs classiques :** ne pas utiliser la moyenne empirique (pas de LGN : la moyenne d'un échantillon de Cauchy suit encore une loi de Cauchy) ; la médiane n'est pas couverte par le Th. 1.4 ; l'écart d'efficacité est modeste ($8/\pi^2\simeq0{,}81$).

### Remarque (non numérotée) — Ce qui se passe hors des modèles réguliers
**Source :** Poly ch.7, §1.7, p. 28
**Énoncé :** les conditions de régularité demandent en particulier que le support de $\mathbb{Q}_\theta$ ne dépende pas de $\theta$ (sinon $\theta\mapsto q_\theta(x)$ n'est pas continue). Dès que le paramètre gouverne le support, **ni la vitesse $\sqrt n$ ni la loi limite gaussienne ne subsistent**. Premier exemple : estimation du support d'une loi uniforme (exemple 1.5 du ch.6) ; second : modèle de Pareto (exercice 2 de la feuille de la semaine 6), Ex. 1.10.

### Exemple 1.10 — Modèle de Pareto
**Source :** Poly ch.7, Exemple 1.10, p. 28
**Hypothèses :** suite de $n$-échantillons du modèle de densité
$$q_\theta(x)=\eta\alpha^\eta\frac1{x^{1+\eta}}\mathbb{1}_{[\alpha,+\infty[}(x),\qquad\theta=(\alpha,\eta)\in\mathbb{R}_+^\star\times\mathbb{R}_+^\star.$$
**Énoncé :**
- *Log-vraisemblance* : pour $\eta>0$ et $\alpha\le\min(X_1,\dots,X_n)$, $$\ell_n(\theta)=n\log\eta+n\eta\log\alpha-(1+\eta)\sum_{k=1}^n\log X_k,$$ et $\ell_n(\theta)=-\infty$ si $\alpha>\min(X_1,\dots,X_n)$. À $\eta$ fixé, croissante en $\alpha$ sur l'intervalle où elle est finie, d'où l'EMV $$\hat\alpha_n:=\min(X_1,\dots,X_n),\qquad\hat\eta_n:=\Big(\frac1n\sum_{k=1}^n\log\frac{X_k}{\hat\alpha_n}\Big)^{-1}.$$
- *Loi exacte de $\hat\alpha_n$* : pour $t\ge\alpha$, $$\mathbb{P}_{n,\theta}(\hat\alpha_n\ge t)=(\mathbb{P}_{n,\theta}(X_1\ge t))^n=\Big(\frac\alpha t\Big)^{n\eta},$$ i.e. $\hat\alpha_n$ suit une loi de Pareto d'échelle $\alpha$ et d'indice $n\eta$.
- *Biais et variance* (pour $n\eta>2$) : $$\mathbb{E}_{n,\theta}[\hat\alpha_n-\alpha]=\frac\alpha{n\eta-1},\qquad\mathrm{Var}_{n,\theta}(\hat\alpha_n)=\frac{n\eta\,\alpha^2}{(n\eta-2)(n\eta-1)^2},$$ donc une erreur quadratique moyenne en $O(n^{-2})$.
- *Consistance* (Markov appliqué à $(\hat\alpha_n-\alpha)^2$) : $\mathbb{P}_{n,\theta}(|\hat\alpha_n-\alpha|\ge\varepsilon)\le\varepsilon^{-2}\mathbb{E}_{n,\theta}[(\hat\alpha_n-\alpha)^2]=O(n^{-2})$.
- *Loi limite* : avec $t=\alpha\exp\{x/(n\eta)\}$, $x\ge0$ : $\mathbb{P}_{n,\theta}\big(n\eta\log\frac{\hat\alpha_n}\alpha\le x\big)=1-e^{-x}$, i.e. $W_n:=n\eta\log(\hat\alpha_n/\alpha)$ suit **exactement** $\mathcal E(1)$ pour tout $n$. Avec $U_n:=W_n/(n\eta)$ : $\hat\alpha_n=\alpha e^{U_n}$ et $n\eta U_n\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal E(1)$ ; la **méthode-δ** (th. 1.7 du ch.6) au point 0, vitesse $r_n=n\eta$, fonction $u\mapsto\alpha e^u$ de dérivée $\alpha$ en 0, donne $$n\eta\,(\hat\alpha_n-\alpha)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\alpha\,\mathcal E(1).$$
La vitesse est $n$ (et non $\sqrt n$), cohérente avec l'EQM en $O(n^{-2})$ ; la loi limite est exponentielle, non gaussienne. **La borne de Cramér-Rao et le Th. 1.7 ne s'appliquent ni l'un ni l'autre.**
**Méthodes mobilisées :** calcul d'EMV par monotonie (et non par annulation du score pour $\alpha$) puis annulation de la dérivée en $\eta$ ; loi du minimum via indépendance ($\mathbb{P}(\min\ge t)=\mathbb{P}(X_1\ge t)^n$) ; moments d'une loi de Pareto ; inégalité de Markov ; calcul de f.d.r. par changement de variable ; méthode-δ avec vitesse $r_n=n\eta$.
**Preuve (étapes) :**
1. Log-vraisemblance (produit des densités, indicatrices ⇒ $-\infty$ si $\alpha>\min X_i$).
2. Monotonie en $\alpha$ (coefficient $n\eta\log\alpha$ croissant) ⇒ $\hat\alpha_n=\min$.
3. $\partial_\eta\ell_n=n/\eta+n\log\hat\alpha_n-\sum\log X_k=0$ ⇒ $\hat\eta_n$.
4. Indépendance ⇒ loi du min.
5. Moments de Pareto d'indice $n\eta$ ⇒ biais, variance.
6. Markov ⇒ consistance.
7. f.d.r. de $W_n$ ⇒ $\mathcal E(1)$ exacte.
8. Méthode-δ ⇒ loi limite.
**Intuition :** quand le paramètre fixe le bord du support, le minimum s'en approche à distance $\sim1/n$ (et non $1/\sqrt n$) : vitesse $n$, plus rapide que la vitesse $\sqrt n$ des modèles réguliers, et loi limite non gaussienne.
**Pièges / erreurs classiques :** ne pas appliquer Th. 1.4/1.7 ni Cramér-Rao (support dépendant de $\theta$, (R-1)–(R-2) violées) ; $\hat\alpha_n\ge\alpha$ toujours (biais positif) ; ici $\ell_n$ est **non normalisée**.

### Remarque (§1.8, non numérotée) — Le programme des exercices
**Source :** Poly ch.7, §1.8, p. 29
**Énoncé :** voir §4 ci-dessous (cinq exercices de la feuille de la semaine).

### Synthèse (ajout de l'extracteur, non présent tel quel dans le poly) — Carte des hypothèses et des résultats du §1
**Source :** reformulation des Th. 1.1–1.7, Cor. 1.1, Lemme 1.1, Prop. 1.1 du poly ch.7 (aucun résultat nouveau).

| Objectif | Résultat du poly | Hypothèses à vérifier | Outil central de la preuve |
|---|---|---|---|
| Consistance d'un M-estimateur (général) | Th. 1.1 | (H-1) convergence uniforme en proba ; (H-2) max isolé ; (H-3) $\hat\theta_n$ maximise $\widehat M_n$ | décomposition (a)+(b)+(c), marge $\eta$ |
| Obtenir (H-1) | Th. 1.2 (LGN uniforme) | $K$ compact, $\phi(\cdot,x)$ continue, $\int\sup_K\lvert\phi\rvert\,d\mathbb{Q}_{\theta^\star}<\infty$ | recouvrement fini, module de continuité (Lemme 2.1), LGN (Th. 2.1) |
| Obtenir (H-2) | Lemme 1.1 | $\Theta$ compact, $\mathsf M_{\theta^\star}$ continue, inégalité stricte hors de $\theta^\star$ | bornes atteintes sur un compact |
| Consistance « clé en main » | Cor. 1.1 | $\Theta$ compact, $m(\cdot,x)$ continue, domination uniforme, $\mathsf M_{\theta^\star}(\theta)<\mathsf M_{\theta^\star}(\theta^\star)$ | Th. 1.1 + Th. 1.2 + Lemme 1.1 |
| Consistance d'un Z-estimateur | Th. 1.3 | (Hz-1), (Hz-2) zéro isolé, (Hz-3) | Th. 1.1 avec $\widehat M_n=-\Vert\widehat\Psi_n\Vert$ |
| Passer de M à Z | Prop. 1.1 | $m(\cdot,x)$ différentiable, max **intérieur** | condition du premier ordre |
| Normalité d'un Z-estimateur ($d=1$) | Th. 1.4 | consistance ; (i) centrage + $L^2$ ; (ii) $C^1$ + domination de $\psi'$ ; (iii) $\mathbb{E}[\psi']\ne0$ ; $\theta^\star\in\Theta^o$ | Taylor reste intégral, LGN, Markov, TCL, Slutsky |
| Normalité d'un M-estimateur ($d=1$) | Th. 1.5 | consistance, valeurs dans $\Theta^o$ ; $C^2$ + domination de $m''$ ; $\mathbb{E}[m']=0$, $0<\mathbb{E}[m'^2]<\infty$ ; $\mathbb{E}[m'']\ne0$ | Prop. 1.1 + Th. 1.4 |
| Normalité de l'EMV | Th. 1.6 | hypothèses du Th. 1.4 pour $\psi=\dot\ell$ ; identité (10) | Th. 1.4 + $\mathbb{I}=\mathbb{E}[\dot\ell^2]=-\mathbb{E}[\ddot\ell]$ |
| Optimalité de l'EMV | Th. 1.7 | modèle régulier (Cadre 1.1), $\Theta$ ouvert ; $\psi$ vérifiant le Th. 1.4 | éq. (11) + Cauchy-Schwarz (1er point admis) |

**Recette d'examen tirée des démonstrations du poly** (pour un Z-estimateur scalaire $\hat\theta_n$ associé à $\psi$) :
1. vérifier le **centrage** $\mathbb{E}_{\theta^\star}[\psi(\theta^\star,X_1)]=0$ (définition 1.2) ;
2. établir la **consistance** (Th. 1.3, ou Th. 1.1 / Cor. 1.1 côté M, ou directement si l'estimateur est explicite) ;
3. vérifier (i) $\mathbb{E}[\psi^2]<\infty$, (ii) $C^1$ + domination locale de $\psi'$, (iii) $\mathbb{E}[\psi']\ne0$, et que $\theta^\star$ est **intérieur** ;
4. calculer $v_\psi(\theta^\star)=\mathbb{E}_{\theta^\star}[\psi^2(\theta^\star,X_1)]/(\mathbb{E}_{\theta^\star}[\psi'(\theta^\star,X_1)])^2$ ; pour l'EMV, $v=1/\mathbb{I}(\theta^\star)$ (calculer $\mathbb{I}$ par $\mathbb{E}[\dot\ell^2]$ ou $-\mathbb{E}[\ddot\ell]$) ;
5. pour un intervalle de confiance asymptotique, remplacer $v(\theta^\star)$ par un estimateur consistant (Slutsky, cf. ch.6 et compléments §4.5) ;
6. si le support dépend du paramètre ou si $\theta^\star$ est au bord de $\Theta$, **ne pas** appliquer les Th. 1.4–1.7 (Ex. 1.10, exercice 4).

---

## 3. Outils mathématiques

> Section 2 du poly « Les outils mathématiques » (p. 30–32) : LGN sous la seule intégrabilité, lemme de continuité (cœur de la LGN uniforme), Taylor avec reste intégral, rappels des chapitres antérieurs, liste des résultats admis.

### Théorème 2.1 — Loi faible des grands nombres, variables i.i.d. intégrables
**Source :** Poly ch.7, Outils, Théorème 2.1, p. 30
**Hypothèses :** pour tout $n\in\mathbb{N}$, $(\mathsf{Z}_n,\mathcal{Z}_n,\mathbb{P}_n)$ espace de probabilité ; $X_1,\dots,X_n$ variables aléatoires réelles sur $(\mathsf Z_n,\mathcal Z_n)$, indépendantes, de même loi, avec $\sup_n\mathbb{E}_n[|X_1|]<\infty$.
**Énoncé :**
$$\frac1n\sum_{k=1}^nX_k-\mathbb{E}_n[X_1]\xrightarrow{\mathbb{P}_n\text{-prob}}0.$$
**Preuve (étapes) :** **admise** (c'est le théorème 4.2 des compléments du ch.6, déjà admis).
**Intuition :** la LGN du ch.6 (th. 1.2 du ch.6) supposait des variables décorrélées donc un moment d'ordre 2 ; ici les fonctions auxquelles on l'applique ($w_\delta$, $\psi'(\theta^\star,\cdot)$, $R_\delta$) ne sont qu'**intégrables**. Forme d'usage : si $X_k=f(Y_k)$ pour un $n$-échantillon $(Y_k)$ et $f$ mesurable intégrable, $\mathbb{E}_n[X_1]$ ne dépend pas de $n$ et $n^{-1}\sum_kf(Y_k)\xrightarrow{\mathbb{P}_n\text{-prob}}\mathbb{E}[f(Y_1)]$.
**Pièges / erreurs classiques :** ne pas exiger de moment d'ordre 2 pour la LGN. *(Remarque de l'extracteur : dans tout le chapitre la loi des $X_k$ ne dépend pas de $n$ ; pour un tableau triangulaire dont la loi varie avec $n$, une condition d'uniforme intégrabilité est en général nécessaire — l'énoncé est reproduit ici tel quel.)*

### Lemme 2.1 — Module de continuité d'une famille dominée
**Source :** Poly ch.7, Outils, Lemme 2.1, p. 30–31 — équation (12)
**Hypothèses :** $K$ compact de $\mathbb{R}^d$, $\Theta\subseteq K$, $\phi:K\times\mathsf X\to\mathbb{R}$ ; pour tout $x$, $\theta\mapsto\phi(\theta,x)$ continue sur $K$ ; pour tout $\theta^\star\in\Theta$, $\int\sup_{\theta\in K}|\phi(\theta,x)|\,\mathbb{Q}_{\theta^\star}(dx)<\infty$. Pour $\delta>0$, $x\in\mathsf X$ :
$$w_\delta(x):=\sup_{\{\theta,\vartheta\in K:\ \|\theta-\vartheta\|\le\delta\}}|\phi(\theta,x)-\phi(\vartheta,x)|.\tag{12}$$
**Énoncé :** pour tout $\theta^\star\in\Theta$, la fonction $\theta\mapsto\mathsf W_{\theta^\star}(\theta):=\int\phi(\theta,x)\mathbb{Q}_{\theta^\star}(dx)$ est **continue** sur $K$, et
$$\lim_{\delta\to0^+}\int_{\mathsf X}w_\delta(x)\,\mathbb{Q}_{\theta^\star}(dx)=0.$$
**Preuve (étapes) :**
1. Enveloppe $\varphi(x):=\sup_{\theta\in K}|\phi(\theta,x)|$ : finie (fonction continue sur un compact bornée) et intégrable par hypothèse.
2. *Continuité de $\mathsf W_{\theta^\star}$* : si $\theta_n\to\theta$ dans $K$, $\phi(\theta_n,x)\to\phi(\theta,x)$ (continuité) et $|\phi(\theta_n,x)|\le\varphi(x)$ ; **convergence dominée** ⇒ $\mathsf W_{\theta^\star}(\theta_n)\to\mathsf W_{\theta^\star}(\theta)$.
3. *Module de continuité* : **théorème de Heine** ⇒ $\theta\mapsto\phi(\theta,x)$ uniformément continue sur $K$, donc $\lim_{\delta\to0^+}w_\delta(x)=0$ pour tout $x$.
4. $w_\delta\le2\varphi$ pour tout $\delta$ et $\delta\mapsto w_\delta(x)$ croissante ; **convergence dominée** sur toute suite $\delta_n\to0$ ⇒ $\int w_{\delta_n}d\mathbb{Q}_{\theta^\star}\to0$. □
**Intuition :** transforme la continuité ponctuelle (à $x$ fixé), « qui ne dit rien en moyenne », en deux énoncés **en moyenne**.
**Pièges / erreurs classiques :** collision de numérotation avec le « lemme 2.1 » du ch.6 (Markov/Bienaymé-Tchebychev), cité tel quel dans les preuves du Th. 1.4 et de l'Ex. 1.10.

### Lemme 2.2 — Formule de Taylor avec reste intégral à l'ordre un
**Source :** Poly ch.7, Outils, Lemme 2.2, p. 31
**Hypothèses :** $f:I\to\mathbb{R}$ continûment différentiable sur un intervalle ouvert $I$ de $\mathbb{R}$, $a\in I$, $t$ tel que $a+t\in I$ et $[a,a+t]\subseteq I$.
**Énoncé :**
$$f(a+t)=f(a)+f'(a)\,t+r(t)\,t,\qquad r(t):=\int_0^1\{f'(a+wt)-f'(a)\}\,dw,$$
et $\lim_{t\to0}r(t)=0$.
**Preuve (étapes) :**
1. Changement de variable $s=a+wt$ : $\int_0^1f'(a+wt)\,t\,dw=\int_a^{a+t}f'(s)ds=f(a+t)-f(a)$ (théorème fondamental de l'analyse).
2. Retrancher $f'(a)t=\int_0^1f'(a)\,t\,dw$.
3. Continuité de $f'$ en $a$ : $|r(t)|\le\sup_{|s-a|\le|t|}|f'(s)-f'(a)|\to0$. □
**Intuition :** reste **exact** (et non un simple $o(\cdot)$), ce qui permet de le contrôler **uniformément en $x$**. Appliqué à $f=\psi(\cdot,x)$, $a=\theta^\star$, il donne (1) et (2).
**Pièges / erreurs classiques :** —

### Remarque (§2.4) — Les résultats antérieurs mobilisés
**Source :** Poly ch.7, Outils §2.4, p. 31
**Énoncé :** employés tels quels :
- **Ch.2** : définitions des M- et Z-estimateurs (définitions 1.8 et 1.3 du ch.2) ; divergence de Kullback-Leibler et sa positivité (définition 1.7, théorème 1.1 du ch.2) ; limite de la log-vraisemblance normalisée (proposition 1.3 du ch.2).
- **Ch.3** : modèle régulier (définition 1.6) ; score et information de Fisher (définitions 1.7 et 1.8) ; leurs propriétés (proposition 1.2) ; inégalité de Cauchy-Schwarz (proposition 2.1) ; dérivation sous le signe intégral (proposition 2.2).
- **Ch.6** : consistance (définition 1.2) ; inégalités de Markov et Bienaymé-Tchebychev (lemme 2.1) ; TCL (théorème 1.6) ; lemme de Slutsky (lemme 1.1) ; transformation continue (théorème 1.4) ; méthode-δ (théorème 1.7) ; normalité asymptotique (définition 1.6) ; comparaison par variance asymptotique (proposition 1.3) ; vocabulaire asymptotique des tests (définitions 1.9, 1.10, 1.11).

### Remarque (§2.5) — Les résultats admis
**Source :** Poly ch.7, Outils §2.5, p. 32
**Énoncé :** trois énoncés utilisés sans démonstration :
1. la LGN pour variables i.i.d. intégrables (Th. 2.1), déjà admise au ch.6 ;
2. le **premier point du Th. 1.7** (normalité asymptotique de l'EMV sous les seules conditions de régularité 1.1, sans hypothèse supplémentaire) ; la démonstration reprend celle du Th. 1.4 en tirant de (R-2) le contrôle du reste — théorème II-3.3 du polycopié d'origine ;
3. la loi limite de la médiane empirique (Ex. 1.9), relevant des statistiques d'ordre (rappelée en §4.8).

---

## 4. Exercices du poly

> **Aucun fichier « Exercices » n'est fourni pour le chapitre 7** (contrairement aux chapitres 1–5). La seule information présente dans les sources extraites est la §1.8 « Le programme des exercices » (p. 29), reproduite ci-dessous. Les énoncés et corrigés complets se trouvent dans `content/sources/S7_APM-41033-EP-PC7-enonce.txt` et `S7_APM-41033-EP-PC7-corrige.txt` (PDF : `S7_APM-41033-EP-PC7-*.pdf`), **non extraits ici** ; aucun énoncé ni corrigé n'est inventé.

### Exercice 1 (feuille de la semaine 7) — Deux suites de tests consistantes ; alternatives locales
**Source :** Poly ch.7, §1.8, p. 29
**Description du poly :** problème en deux temps. Première question : pour un modèle de translation, construire deux suites de tests consistantes et de même niveau asymptotique, l'une fondée sur une **fréquence de signes**, l'autre sur la **statistique de Student** (exemple 1.14 du ch.6) ; la consistance ne suffit donc pas à départager deux tests. Suite (« nettement plus difficile ») : comparer les deux suites par leurs fonctions puissance le long d'alternatives $\theta_n=\theta^\star+h/\sqrt n$ ; introduit la **distance de Hellinger**, la **différentiabilité en moyenne quadratique** et la **contiguïté**.
**Méthodes annoncées :** tests asymptotiques (ch.6), TCL, alternatives locales.

### Exercice 2 — Modèle $\mathrm{Gamma}(2,\theta)$ : la chaîne complète
**Source :** Poly ch.7, §1.8, p. 29
**Description du poly :** EMV, biais et risque quadratique à $n$ fixé, consistance, normalité asymptotique, intervalle de confiance asymptotique.
**Méthodes annoncées :** calcul d'EMV, Th. 1.6 / information de Fisher, Slutsky pour l'IC.

### Exercice 3 — Modèle log-normal de paramètre $(\theta,\theta)$
**Source :** Poly ch.7, §1.8, p. 29
**Description du poly :** les deux composantes du couple habituel sont liées ; normalité asymptotique de l'EMV puis intervalle de confiance asymptotique.

### Exercice 4 — $\mathcal N(\theta,1)$ avec $\Theta=\mathbb{R}_+$ (paramètre à la frontière)
**Source :** Poly ch.7, §1.8, p. 29 (et remarque p. 21, §4.9 p. 41)
**Description du poly :** la normalité asymptotique vaut pour $\theta>0$ (Th. 1.4) ; le Th. 1.4 ne dit rien des points de la frontière ; la loi limite en $\theta=0$ n'est pas gaussienne. D'après §4.9 : $\hat\theta_n^{\mathrm{MV}}=\max(\bar X_n,0)$ et, en $\theta=0$, la loi limite est celle de $\max(W,0)$, $W\sim\mathcal N(0,1)$, qui charge 0 avec masse $1/2$.

### Exercice 5 — Z-estimateurs de translation $\psi(\theta,x)=\gamma(x-\theta)$, $\gamma$ impaire croissante
**Source :** Poly ch.7, §1.8, p. 29 (et Ex. 1.4)
**Description du poly :** existence, consistance et normalité asymptotique ; comparaison des variances asymptotiques $V[\gamma]$ d'une loi gaussienne à un **mélange gaussien contaminé** : justification quantitative des fonctions d'influence **bornées** en statistique robuste. D'après §4.9, l'argument de **monotonie** de cet exercice permet de traiter la médiane sans différentiabilité.

---

## 5. Hors programme / compléments

> Poly ch.7, §4 « Les compléments », p. 34–41 — **contenus non exigibles** (« Les contenus de cette partie ne sont pas exigibles »). Annoncé : définition générale des M- et Z-estimateurs couvrant les solutions approchées, consistance sans compacité, consistance de l'EMV, lois limites vectorielles, régions de confiance, efficacité asymptotique et conjecture de Fisher, méthode du score de Fisher, calculs détaillés du modèle de Cauchy.

### Théorème 4.1 — Consistance des M-estimateurs, version approchée
**Source :** Poly ch.7, Compléments §4.1, Théorème 4.1, p. 34
**Idée :** en pratique le maximum de $\widehat M_n$ est calculé numériquement ; on n'a qu'une solution approchée dont on sait borner l'erreur. C'est la définition du polycopié d'origine.
**Résultat principal :** on remplace (H-3) par : il existe des v.a. positives $\{\rho_n\}$ et des v.a. $\{\hat\theta_n\}$ à valeurs dans $\Theta$ telles que, pour tout $\theta^\star\in\Theta$,
$$\lim_{n\to\infty}\mathbb{P}_{n,\theta^\star}(\rho_n\ge\varepsilon)=0\ \ \text{pour tout }\varepsilon>0,\qquad\liminf_{n\to\infty}\mathbb{P}_{n,\theta^\star}\Big(\widehat M_n(\hat\theta_n)\ge\widehat M_n(\theta^\star)-\rho_n\Big)=1.$$
Sous (H-1), (H-2) et cette hypothèse, $\{\hat\theta_n\}$ est consistante.
**Preuve (résumé) :** seul change le terme (b) $=\widehat M_n(\theta^\star)-\widehat M_n(\hat\theta_n)$, qui n'est plus négatif :
$$\widehat M_n(\theta^\star)-\widehat M_n(\hat\theta_n)\le\rho_n+\Big\{\widehat M_n(\theta^\star)-\widehat M_n(\hat\theta_n)-\rho_n\Big\}\mathbb{1}_{\{\widehat M_n(\theta^\star)-\rho_n>\widehat M_n(\hat\theta_n)\}};$$
le premier terme $\to0$ en probabilité, le second est nul sur un événement de probabilité $\to1$.
**Version Z :** remplacer $\widehat\Psi_n(\hat\theta_n)=0$ par $\lim_{n}\mathbb{P}_{n,\theta^\star}\big(\Vert\widehat\Psi_n(\hat\theta_n)\Vert\ge\varepsilon\big)=0$ pour tout $\varepsilon>0$ ; le Th. 1.3 vaut sous cette forme.

### Théorème 4.2 — Consistance d'un M-estimateur, cas non compact
**Source :** Poly ch.7, Compléments §4.2, Théorème 4.2, p. 35
**Idée :** se passer de la compacité lorsque la fonction objectif décroît vers $-\infty$ assez vite à l'infini, ce qui confine l'estimateur dans un compact avec probabilité $\to1$.
**Hypothèses :** $\Theta=\mathbb{R}^d$ ;
- (i) pour tout $x$, $\theta\mapsto m(\theta,x)$ continue sur $\mathbb{R}^d$ ;
- (ii) pour tout compact $K\subseteq\mathbb{R}^d$ et tout $\theta^\star$, $\int\sup_{\theta\in K}|m(\theta,x)|\,\mathbb{Q}_{\theta^\star}(dx)<\infty$ ;
- (iii) pour tous $\theta\ne\theta^\star$, $\mathsf M_{\theta^\star}(\theta)<\mathsf M_{\theta^\star}(\theta^\star)$ ;
- (iv) pour tout $\theta^\star$, il existe $a>0$ tel que $\int\sup_{\Vert\theta\Vert\ge a}|m(\theta,x)|\,\mathbb{Q}_{\theta^\star}(dx)<\infty$ ;
- (v) pour tout $x$, $\lim_{b\to\infty}\sup_{\Vert\theta\Vert>b}m(\theta,x)=-\infty$.
**Résultat principal :** toute suite de M-estimateurs associés à $m$, au sens du Th. 4.1, est consistante.
**Preuve (résumé) :**
1. $b\mapsto\sup_{\Vert\theta\Vert>b}m(\theta,x)$ décroît vers $-\infty$ (v) ; **convergence monotone** (licite par (iv)) : $\lim_{b\to\infty}\int\{\sup_{\Vert\theta\Vert>b}m(\theta,x)\}\mathbb{Q}_{\theta^\star}(dx)=-\infty$.
2. Choisir $b>\Vert\theta^\star\Vert$ avec $\int\{\sup_{\Vert\theta\Vert>b}m\}\,d\mathbb{Q}_{\theta^\star}<\mathsf M_{\theta^\star}(\theta^\star)$.
3. **LGN** : $\sup_{\Vert\theta\Vert>b}\widehat M_n(\theta)-\widehat M_n(\theta^\star)\le\frac1n\sum_{i=1}^n\{\sup_{\Vert\theta\Vert>b}m(\theta,X_i)-m(\theta^\star,X_i)\}\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}\int\{\sup_{\Vert\theta\Vert>b}m\}\,d\mathbb{Q}_{\theta^\star}-\mathsf M_{\theta^\star}(\theta^\star)<0$, d'où $\lim_n\mathbb{P}_{n,\theta^\star}\big(\sup_{\Vert\theta\Vert>b}\widehat M_n(\theta)-\widehat M_n(\theta^\star)+\rho_n\ge0\big)=0$.
4. Avec $K:=\overline{\mathrm B(0,b)}$ compact : $\{\hat\theta_n\notin K\}\subseteq\{\widehat M_n(\hat\theta_n)<\widehat M_n(\theta^\star)-\rho_n\}\cup\{\sup_{\Vert\theta\Vert>b}\widehat M_n(\theta)\ge\widehat M_n(\theta^\star)-\rho_n\}$, donc $\limsup_n\mathbb{P}_{n,\theta^\star}(\hat\theta_n\notin K)=0$.
5. Appliquer le Cor. 1.1 (version approchée) à $\hat\theta_n\mathbb{1}_K(\hat\theta_n)$, qui coïncide avec $\hat\theta_n$ avec probabilité $\to1$.

### Exemple 4.1 — La médiane empirique comme M-estimateur
**Source :** Poly ch.7, Compléments §4.2, Exemple 4.1, p. 35–36
**Cadre :** $F$ f.d.r. sur $\mathbb{R}$ avec $\int|x|F(dx)<\infty$, $F(x)=1-F(-x)$ pour tout $x$, $F(\eta)>1/2$ pour tout $\eta>0$ ; $\Theta=\mathbb{R}$, $\mathbb{Q}_\theta$ de f.d.r. $x\mapsto F(x-\theta)$ ; $m(\theta,x)=-|x-\theta|$ (M-estimateur = médiane empirique).
**Vérification des hypothèses du Th. 4.2 :** (i) continuité claire ; $|m(\theta,x)|\le|\theta|+|x|$ donne (ii) et (iv) ; $\sup_{\Vert\theta\Vert>b}m(\theta,x)\le|x|-b$ donne (v) ; pour (iii), « un calcul élémentaire » donne
$$\mathsf M_{\theta^\star}(\theta^\star)-\mathsf M_{\theta^\star}(\theta)=2\int_0^{|\theta-\theta^\star|}\big(|\theta-\theta^\star|-x\big)F(dx),$$
strictement positif dès que $\theta\ne\theta^\star$ puisque $F(\eta)>1/2$ pour tout $\eta>0$ (calcul non détaillé dans le poly).
**Résultat principal :** la médiane empirique est consistante, **sans hypothèse de moment d'ordre deux**.
**Méthodes mobilisées :** vérification des hypothèses (i)–(v) du Th. 4.2 ; majorations élémentaires.

### Théorème 4.3 — Consistance du maximum de vraisemblance, cas compact
**Source :** Poly ch.7, Compléments §4.3, Théorème 4.3, p. 36
**Idée :** traduction du Cor. 1.1 (et du Th. 4.2) à $m(\theta,x)=\log p_\theta(x)$.
**Hypothèses :** modèle dominé $\mathbb{Q}_\theta=p_\theta\cdot\mu$, $\Theta$ compact de $\mathbb{R}^d$ ; (i) $\theta\mapsto\log p_\theta(x)$ continue pour tout $x$ ; (ii) $\int\sup_{\theta\in\Theta}|\log p_\theta(x)|\,\mathbb{Q}_{\theta^\star}(dx)<\infty$ pour tout $\theta^\star$ ; (iii) pour tous $\theta\ne\theta^\star$, $\mathbb{Q}_\theta\ne\mathbb{Q}_{\theta^\star}$ (identifiabilité).
**Résultat principal :** pour tout $\theta^\star$, $\theta\mapsto\int\log p_\theta(x)\mathbb{Q}_{\theta^\star}(dx)$ a un maximum unique en $\theta^\star$, et toute suite $\{\hat\theta_n^{\mathrm{MV}}\}$ telle que $\lim_n\mathbb{P}_{n,\theta^\star}\big(\ell_n(\hat\theta_n^{\mathrm{MV}})\ge\ell_n(\theta^\star)\big)=1$, où $\ell_n(\theta):=n^{-1}\sum_{i=1}^n\log p_\theta(X_i)$, est consistante.
**Version non compacte :** ajouter, comme au Th. 4.2, l'intégrabilité de $\sup_{\Vert\theta\Vert\ge a}\log p_\theta$ pour un $a>0$ et $\lim_{b\to\infty}\sup_{\Vert\theta\Vert\ge b}\log p_\theta(x)=-\infty$ pour $\mu$-presque tout $x$ (théorèmes II-3.1 et II-3.2 du polycopié d'origine).

### Théorème 4.4 — Loi limite des Z-estimateurs, cas vectoriel
**Source :** Poly ch.7, Compléments §4.4, Théorème 4.4, p. 36–37
**Idée :** les preuves de la §1.5 s'étendent à $\Theta\subseteq\mathbb{R}^d$ : le quotient devient un produit par l'inverse d'une matrice jacobienne ; la variance asymptotique devient une matrice de covariance.
**Hypothèses :** $\psi:\Theta\times\mathsf X\to\mathbb{R}^d$ ; pour tout $\theta^\star\in\Theta^o$ :
- (i) $\theta\mapsto\psi(\theta,x)$ continûment différentiable sur $\mathcal V(\theta^\star)$, et $$\mathrm J_\psi(\theta^\star):=\left[\int\frac{\partial\psi_r}{\partial\theta^{(s)}}(\theta^\star,x)\,\mathbb{Q}_{\theta^\star}(dx)\right]_{1\le r,s\le d};$$
- (ii) $g$ mesurable avec $\sup_{\theta\in\mathcal V(\theta^\star)}\sum_{i=1}^d\Vert\partial\psi/\partial\theta^{(i)}(\theta,x)\Vert\le g(x)$, $\int g\,d\mathbb{Q}_{\theta^\star}<\infty$ ; $\mathrm J_\psi(\theta^\star)$ **inversible** ;
- (iii) $\int\Vert\psi(\theta^\star,x)\Vert^2\mathbb{Q}_{\theta^\star}(dx)<\infty$ et $\int\psi(\theta^\star,x)\mathbb{Q}_{\theta^\star}(dx)=0$ ;
- $\{\hat\theta_n\}$ consistante avec $\sqrt n\,\widehat\Psi_n(\hat\theta_n)\xrightarrow{\mathbb{P}_{n,\theta^\star}\text{-prob}}0$.
**Résultat principal :**
$$\sqrt n\big(\hat\theta_n-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\Big(0,[\mathrm J_\psi(\theta^\star)]^{-1}G_\psi(\theta^\star)[\mathrm J_\psi(\theta^\star)]^{-\top}\Big),\qquad G_\psi(\theta^\star):=\int\psi(\theta^\star,x)\psi(\theta^\star,x)^\top\mathbb{Q}_{\theta^\star}(dx).$$
**M-estimateurs** ($\psi=\nabla m$, différentiabilité seconde et domination, $\sqrt n\,\nabla\widehat M_n(\hat\theta_n)\to0$ en proba) :
$$\sqrt n\big(\hat\theta_n-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\big(0,U_m(\theta^\star)G_m(\theta^\star)U_m(\theta^\star)^\top\big),$$
$$G_m(\theta^\star):=\int\nabla m(\theta^\star,x)(\nabla m(\theta^\star,x))^\top\mathbb{Q}_{\theta^\star}(dx),\qquad U_m(\theta^\star):=\left(\int\mathrm H_m(\theta^\star,x)\,\mathbb{Q}_{\theta^\star}(dx)\right)^{-1}$$
(théorèmes II-2.18 et II-2.20 du polycopié d'origine).
**EMV** ($m=\ell$, modèle régulier) : $\mathbb{I}(\theta)=\int\nabla\ell(\theta,x)(\nabla\ell(\theta,x))^\top\mathbb{Q}_\theta(dx)=-\int\mathrm H_\ell(\theta,x)\mathbb{Q}_\theta(dx)$, donc $G_\ell=\mathbb{I}$, $U_\ell=-\mathbb{I}^{-1}$ et
$$\sqrt n\big(\hat\theta_n^{\mathrm{MV}}-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\big(0,\mathbb{I}^{-1}(\theta^\star)\big).$$
**Remarque :** forme « sandwich » ; en dimension 1 on retrouve $v_\psi=\mathbb{E}[\psi^2]/(\mathbb{E}[\psi'])^2$. Pas de preuve écrite dans le poly.

### §4.5 — Trois pivots asymptotiques et les régions de confiance associées
**Source :** Poly ch.7, Compléments §4.5, p. 37–38
**Idée :** la normalité asymptotique de l'EMV fournit des régions de confiance asymptotiques (définition 1.8 du ch.6). Modèle régulier de dimension $d$, $\chi^2_{1-\alpha}(d)$ quantile d'ordre $1-\alpha$ de $\chi^2(d)$.
**Résultats :**
1. *Information au point courant* : $n(\hat\theta_n^{\mathrm{MV}}-\theta)^\top\mathbb{I}(\theta)(\hat\theta_n^{\mathrm{MV}}-\theta)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\chi^2(d)$, d'où $\lim_n\mathbb{P}_{n,\theta}(\theta\in S_{n,\alpha})=1-\alpha$ pour $$S_{n,\alpha}:=\Big\{\theta\in\Theta:\ n(\hat\theta_n^{\mathrm{MV}}-\theta)^\top\mathbb{I}(\theta)(\hat\theta_n^{\mathrm{MV}}-\theta)\le\chi^2_{1-\alpha}(d)\Big\}$$ — rarement employée (dépendance de $\mathbb{I}$ en $\theta$).
2. *Information à l'estimateur* : si $\theta\mapsto\mathbb{I}(\theta)$ est continue, consistance + Slutsky : $\sqrt n\,\mathbb{I}^{1/2}(\hat\theta_n^{\mathrm{MV}})(\hat\theta_n^{\mathrm{MV}}-\theta)\Rightarrow\mathcal N(0,\mathrm I_d)$ ; région $$\tilde S_{n,\alpha}:=\Big\{\theta\in\Theta:\ n(\hat\theta_n^{\mathrm{MV}}-\theta)^\top\mathbb{I}(\hat\theta_n^{\mathrm{MV}})(\hat\theta_n^{\mathrm{MV}}-\theta)\le\chi^2_{1-\alpha}(d)\Big\},$$ ellipsoïde centré en $\hat\theta_n^{\mathrm{MV}}$.
3. *Information observée* : $\mathbb{I}_n(\theta):=-\frac1n\sum_{i=1}^n\mathrm H_\ell(\theta,X_i)$ ; $\mathbb{I}_n(\hat\theta_n^{\mathrm{MV}})$ = information de Fisher observée ; dans un modèle régulier, $\mathbb{I}_n(\hat\theta_n)\to\mathbb{I}(\theta^\star)$ en proba pour toute suite consistante, donc $\sqrt n\,\mathbb{I}_n^{1/2}(\hat\theta_n^{\mathrm{MV}})(\hat\theta_n^{\mathrm{MV}}-\theta^\star)\Rightarrow\mathcal N(0,\mathrm I_d)$ ; la région $\check S_{n,\alpha}$ (remplacer $\mathbb{I}(\hat\theta_n^{\mathrm{MV}})$ par $\mathbb{I}_n(\hat\theta_n^{\mathrm{MV}})$ dans $\tilde S_{n,\alpha}$) est de niveau asymptotique $1-\alpha$ et ne dépend que de la log-vraisemblance et de sa hessienne en $\hat\theta_n^{\mathrm{MV}}$.
4. *Rapport de vraisemblance* : $\ell_n(\theta)=\ell_n(\hat\theta_n^{\mathrm{MV}})-\frac12(\hat\theta_n^{\mathrm{MV}}-\theta)^\top\mathbb{I}_n(\theta_n^*)(\hat\theta_n^{\mathrm{MV}}-\theta)$ pour un $\theta_n^*\in[\theta,\hat\theta_n^{\mathrm{MV}}]$, d'où $$2n\,\ell_n(\hat\theta_n^{\mathrm{MV}})-2n\,\ell_n(\theta^\star)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\chi^2(d),\qquad\breve S_{n,\alpha}:=\Big\{\theta\in\Theta:\ 2n\,\ell_n(\hat\theta_n^{\mathrm{MV}})-2n\,\ell_n(\theta)\le\chi^2_{1-\alpha}(d)\Big\},$$ définie par les seules valeurs de la vraisemblance.
5. *Fonction du paramètre* : si $g:\mathbb{R}^d\to\mathbb{R}$ est différentiable en $\theta^\star$, la méthode-δ (citée « théorème 1.8 ») donne l'IC asymptotique $$\left[g(\hat\theta_n^{\mathrm{MV}})-\frac{z_{1-\alpha/2}\,\sigma_g(\hat\theta_n^{\mathrm{MV}})}{\sqrt n},\ g(\hat\theta_n^{\mathrm{MV}})+\frac{z_{1-\alpha/2}\,\sigma_g(\hat\theta_n^{\mathrm{MV}})}{\sqrt n}\right],\qquad\sigma_g^2(\theta):=(\nabla g(\theta))^\top\mathbb{I}^{-1}(\theta)\nabla g(\theta),$$ où $\mathbb{I}$ peut être remplacée par l'information observée.
**Méthodes mobilisées :** Slutsky, continuité de $\mathbb{I}$, Taylor à l'ordre 2 de $\ell_n$ autour de son maximum, méthode-δ.

### Définition 4.1 — Estimateur asymptotiquement efficace (et conjecture de Fisher)
**Source :** Poly ch.7, Compléments §4.6, Définition 4.1, p. 38–39
**Cadre :** suites asymptotiquement normales en **tout** $\theta\in\Theta$ ($\sqrt n(\hat\theta_n-\theta)\Rightarrow\mathcal N(0,v(\theta))$, $v(\theta)>0$, $\theta\mapsto v(\theta)$ continue).
**Énoncé :** $\widehat\theta_{n,1}$ est **plus efficace** que $\widehat\theta_{n,2}$ si $v_1(\theta)\le v_2(\theta)$ pour tout $\theta\in\Theta$ et s'il existe $\tilde\theta$ avec $v_1(\tilde\theta)<v_2(\tilde\theta)$. Une suite est **asymptotiquement efficace dans une classe** s'il n'existe dans cette classe aucune suite plus efficace qu'elle.
**Commentaires du poly :**
- la normalité en tout point exclut les estimateurs constants $\hat\theta_n=\tilde\theta$ (risque nul en $\tilde\theta$, catastrophique ailleurs) ;
- relecture du Th. 1.7 : dans un modèle régulier, l'EMV est asymptotiquement efficace dans la classe des Z-estimateurs réguliers ;
- **conjecture de Fisher (1922)** : (1) l'EMV a pour variance asymptotique $1/\mathbb{I}(\theta)$ — **vrai** (Th. 1.7) ; (2) **toute** suite asymptotiquement normale a $v(\theta)\ge1/\mathbb{I}(\theta)$ — **faux en général**, vrai seulement dans la classe des Z-estimateurs réguliers ;
- contre-exemple : **estimateur de Hodges** (ch.6, §4.5) dans $\mathcal N(\theta,1)$ : asymptotiquement normal, variance asymptotique partout $\le$ celle de la moyenne empirique, strictement plus petite en $\theta=0$, mais risque quadratique arbitrairement mauvais au voisinage de 0 ;
- conclusion : comparer en un point n'est pas une notion d'optimalité satisfaisante ; il faut comparer les risques sur des voisinages (hors du cadre du cours).

### Lemme 4.1 — Linéarisation de l'équation de vraisemblance
**Source :** Poly ch.7, Compléments §4.7, Lemme 4.1, p. 39–40
**Hypothèses :** modèle $\{p_\theta\cdot\mu\}$ régulier ; $\{\hat\theta_n\}$ suite asymptotiquement normale.
**Résultat :** pour tout $\theta^\star$ et tout $\varepsilon>0$,
$$\lim_{n\to\infty}\mathbb{P}_{n,\theta^\star}\Big(\sqrt n\,\Big\Vert\nabla\ell_n(\hat\theta_n)-\big\{\nabla\ell_n(\theta^\star)-\mathbb{I}(\theta^\star)(\hat\theta_n-\theta^\star)\big\}\Big\Vert\ge\varepsilon\Big)=0,\qquad\nabla\ell_n(\theta):=n^{-1}\sum_{i=1}^n\nabla\ell(\theta,X_i).$$
**Preuve (résumé) :**
1. Taylor avec reste intégral pour $\theta\mapsto\nabla\ell(\theta,X_i)$ entre $\theta^\star$ et $\hat\theta_n$ : $\nabla\ell_n(\hat\theta_n)=\nabla\ell_n(\theta^\star)-\mathbb{I}_n(\theta^\star)(\hat\theta_n-\theta^\star)+\Delta_n(\hat\theta_n-\theta^\star)$, $\Delta_n:=-\int_0^1\{\mathbb{I}_n(\theta^\star+w(\hat\theta_n-\theta^\star))-\mathbb{I}_n(\theta^\star)\}dw$.
2. $\mathbb{I}_n(\hat\theta_n)\to\mathbb{I}(\theta^\star)$ (§4.5) ⇒ $\Delta_n\to0$ en proba.
3. $\sqrt n(\hat\theta_n-\theta^\star)$ converge en loi ⇒ (Slutsky) $\sqrt n\,\Delta_n(\hat\theta_n-\theta^\star)\to0$.
4. LGN : $\mathbb{I}_n(\theta^\star)\to\mathbb{I}(\theta^\star)$ ⇒ $\sqrt n\{\mathbb{I}_n(\theta^\star)-\mathbb{I}(\theta^\star)\}(\hat\theta_n-\theta^\star)\to0$.

### Théorème 4.5 — Méthode du score de Fisher
**Source :** Poly ch.7, Compléments §4.7, Théorème 4.5, p. 40
**Idée :** l'EMV est efficace mais parfois coûteux (Cauchy : optimisation numérique) alors qu'un autre estimateur est explicite (médiane) ; **un pas de Newton** sur l'équation de vraisemblance, à partir d'un estimateur asymptotiquement normal quelconque, suffit à récupérer la variance optimale.
**Résultat principal :** modèle régulier, $\{\hat\theta_n\}$ asymptotiquement normale ;
$$\widetilde\theta_n:=\hat\theta_n+\mathbb{I}_n(\hat\theta_n)^{-1}\nabla\ell_n(\hat\theta_n)\quad\text{vérifie}\quad\sqrt n\big(\widetilde\theta_n-\theta^\star\big)\overset{\mathbb{P}_{n,\theta^\star}}{\Longrightarrow}\mathcal N\big(0,\mathbb{I}^{-1}(\theta^\star)\big).$$
Le point de départ peut être n'importe quel M- ou Z-estimateur consistant et asymptotiquement normal, sans souci de sa variance (théorème II-3.8 du polycopié d'origine). Preuve non écrite (s'appuie sur le Lemme 4.1).

### §4.8 — Le modèle de Cauchy en détail
**Source :** Poly ch.7, Compléments §4.8, p. 40–41 (reprise de l'Ex. 1.9, $q_\theta(x)=\pi^{-1}(1+(x-\theta)^2)^{-1}$)
**Information de Fisher :** score $\dot\ell(\theta,x)=\partial_\theta\{-\log\pi-\log(1+(x-\theta)^2)\}=\dfrac{2(x-\theta)}{1+(x-\theta)^2}$ ; changement de variable $u=x-\theta$ puis $u=\tan t$ :
$$\mathbb{I}(\theta)=\int_{\mathbb{R}}\frac{4u^2}{(1+u^2)^2}\cdot\frac1{\pi(1+u^2)}\,du=\frac4\pi\int_{-\pi/2}^{\pi/2}\sin^2t\cos^2t\,dt=\frac1\pi\int_{-\pi/2}^{\pi/2}\sin^2(2t)\,dt=\frac12.$$
Indépendante de $\theta$ (attendu pour un modèle de translation) ; variance asymptotique de l'EMV $=2$.
**Loi limite des quantiles empiriques (admise) :** $F$ f.d.r., $p\in]0,1[$, $Q(p)$ quantile d'ordre $p$ ; si $F$ est dérivable en $Q(p)$ avec $F'(Q(p))>0$, pour toute suite d'entiers $k_n$ avec $\sqrt n(k_n/n-p)\to0$ :
$$\sqrt n\big(X_{k_n:n}-Q(p)\big)\Longrightarrow\mathcal N\left(0,\frac{p(1-p)}{[F'(Q(p))]^2}\right).$$
Pour $p=1/2$ et une loi symétrique autour de $\theta^\star$ : $Q(1/2)=\theta^\star$, $F'=q_{\theta^\star}$, d'où $\sqrt n(\widehat\theta_n^{\mathrm{med}}-\theta^\star)\Rightarrow\mathcal N\big(0,1/\{4(q_{\theta^\star}(\theta^\star))^2\}\big)$ ; pour Cauchy $q_{\theta^\star}(\theta^\star)=1/\pi$, variance $\pi^2/4$.
**Efficacité relative :**
$$\frac{1/\mathbb{I}(\theta^\star)}{1/\{4(q_{\theta^\star}(\theta^\star))^2\}}=\frac2{\pi^2/4}=\frac8{\pi^2}\simeq0{,}81 :$$
la médiane demande environ $n/0{,}81\simeq1{,}23\,n$ observations pour la précision asymptotique de l'EMV avec $n$ observations. Écart visible mais modeste (Figure 4) ; la médiane, calculable sans optimisation, reste raisonnable et sert de point de départ à la méthode du score (§4.7).
**Méthodes mobilisées :** changement de variable trigonométrique ; identité $2\sin t\cos t=\sin 2t$ ; loi limite des statistiques d'ordre ; comparaison par efficacité relative.

### §4.9 — Au-delà des modèles réguliers
**Source :** Poly ch.7, Compléments §4.9, p. 41
**Idée :** trois façons dont la conclusion du Th. 1.7 peut tomber.
1. **Le paramètre gouverne le support.** Uniforme sur $[0,\theta]$ : $\hat\theta_n=\max(X_1,\dots,X_n)$ et $n(\theta-\hat\theta_n)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\mathcal E(\theta^{-1})$ (exemple 1.5 du ch.6) ; Pareto : $n\eta(\hat\alpha_n-\alpha)\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}\alpha\,\mathcal E(1)$ (Ex. 1.10). $\theta\mapsto p_\theta(x)$ discontinue, (R-2) fausse, vitesse $n$, loi limite exponentielle : erreur d'un ordre de grandeur plus petit que dans le cas régulier.
2. **La vraie valeur est sur la frontière.** $\mathcal N(\theta,1)$ avec $\Theta=\mathbb{R}_+$ (exercice 4) : $\hat\theta_n^{\mathrm{MV}}=\max(\bar X_n,0)$ ; normalité asymptotique pour $\theta>0$ ; en $\theta=0$, loi limite de $\max(W,0)$, $W\sim\mathcal N(0,1)$, non gaussienne, masse $1/2$ en 0.
3. **La fonction d'influence n'est pas régulière.** Médiane, $\psi(\theta,x)=\operatorname{signe}(x-\theta)$, différentiable en $\theta$ pour aucun $x$ ; l'estimateur reste consistant (Ex. 4.1) et asymptotiquement normal (§4.8), mais ni la consistance ni la loi limite ne s'obtiennent par les théorèmes du chapitre : statistiques d'ordre, ou argument de monotonie (exercice 5). « L'absence de régularité de $\psi$ n'est donc pas une absence de régularité du modèle, et elle se contourne. »

---

## 6. Liens avec les autres chapitres

**Prérequis :**
- **Chapitre 2 (Estimation ponctuelle)** : définitions originales des M- et Z-estimateurs (déf. 1.8 et 1.3 du ch.2), méthode des moments, EMV, divergence de Kullback-Leibler et sa positivité (déf. 1.7, th. 1.1), limite de la log-vraisemblance normalisée (prop. 1.3), exemple de l'EMV du support uniforme (vraisemblance non dérivable).
- **Chapitre 3 (Théorie de la décision)** : modèle régulier (déf. 1.6), score et information de Fisher (déf. 1.7, 1.8), propriétés (prop. 1.2 : score centré, $\mathbb{I}=-\mathbb{E}[\ddot\ell]$), Cauchy-Schwarz (prop. 2.1), dérivation sous l'intégrale (prop. 2.2), borne de Cramér-Rao (version à $n$ fixé de l'optimalité ; le Th. 1.7 en est l'analogue asymptotique, et la même technique — dériver une identité de centrage puis Cauchy-Schwarz — y est utilisée).
- **Chapitre 6 (Statistiques asymptotiques)** : consistance, normalité asymptotique, LGN, TCL, Slutsky, transformation continue, méthode-δ, Markov/Bienaymé-Tchebychev, comparaison par variance asymptotique, tests asymptotiques (taille/niveau asymptotique, consistance), test de Student asymptotique, exemple du support uniforme (vitesse $n$), estimateur de Hodges (§4.5 du ch.6), LGN pour variables intégrables (th. 4.2 des compléments du ch.6).
- **Chapitres 4–5 (tests)** : vocabulaire des tests repris en §1.2 et dans l'exercice 1.

**Suites :**
- **Chapitre 8 (Introduction à l'apprentissage statistique)** : estimation par maximum de vraisemblance des paramètres de modèles génératifs/discriminatifs (régression logistique, etc.) ; consistance de l'EMV invoquée.
- **Chapitre 9 (Approche discriminative et minimisation du risque empirique)** : le minimiseur du risque empirique est un M-estimateur ; le ch.9 cite explicitement « la loi des grands nombres (chapitre 7, théorème 2.1) » pour $\widehat R_n(g)\to R(g)$, et souligne (comme ici) que la LGN ponctuelle ne suffit pas pour la règle choisie au vu des données — analogue direct de la nécessité de la convergence **uniforme** (Th. 1.1–1.2).
- Régions de confiance asymptotiques (Wald, information observée, rapport de vraisemblance) : prolongements des IC du ch.6 (compléments §4.5).

---

## 7. Idées de visualisations interactives pertinentes pour ce chapitre

1. **« Deux courbes » (Intuition p. 8, Figure 1)** : tracer $\mathsf M_{\theta^\star}(\theta)$ et $\widehat M_n(\theta)$ pour un échantillon simulé (gaussien, Cauchy…) ; curseur $n$ ; afficher $\sup_\theta|\widehat M_n-\mathsf M_{\theta^\star}|$ et le point $(\hat\theta_n,\widehat M_n(\hat\theta_n))$ ; option « pic plat » (fonction limite presque plate) pour voir le sommet empirique dériver.
2. **Contre-exemple convergence simple vs uniforme** : animation où $\widehat M_n$ converge ponctuellement mais présente une « bosse » mobile loin de $\theta^\star$ ; montrer que l'argmax ne converge pas tant que (H-1)/(H-2) échouent.
3. **Recouvrement fini et module de continuité (Th. 1.2)** : compact $K=[a,b]$, curseur $\delta$, boules $\mathrm B(\theta^{(\ell)},\delta)$, bande $\pm w_\delta$ autour de $\widehat W_n$ ; visualiser la décomposition en trois termes.
4. **Galerie de fonctions $m$ et $\psi$ (Figure 2)** : Huber (curseur $\delta$), moindres carrés, $\arctan$, $\operatorname{signe}$, $x-\theta$ ; sur données contaminées (curseur de proportion de contamination / queues lourdes), afficher l'estimateur obtenu par chaque $\psi$.
5. **Identité clé (3) en direct** : pour $\psi$ choisi, tracer $\theta\mapsto\widehat\Psi_n(\theta)$ et $\Psi_{\theta^\star}(\theta)$, la tangente en $\theta^\star$ ; montrer qu'une pente plus raide réduit le déplacement du zéro ; afficher numérateur (TCL), dénominateur (LGN), reste $R_n$.
6. **Histogrammes de $\sqrt n(\hat\theta_n-\theta^\star)$ (Figure 4)** : Monte-Carlo médiane vs EMV pour Cauchy (et gaussien, Laplace) ; superposer $\mathcal N(0,v_\psi)$ ; afficher le rapport d'efficacité $8/\pi^2\simeq0{,}81$ et le $n$ équivalent ($\times1{,}23$).
7. **Inégalité $v_\psi\ge1/\mathbb{I}$ (Th. 1.7)** : famille $\psi_\lambda=\lambda\,\dot\ell+(1-\lambda)\,\psi_0$ ; tracer $v_{\psi_\lambda}$ et la borne $1/\mathbb{I}$, et la « corrélation » $\mathbb{E}[\psi\dot\ell]$ (cas d'égalité de Cauchy-Schwarz).
8. **Hors régularité : Pareto / uniforme (Ex. 1.10)** : comparer les échelles $\sqrt n$ et $n$ ; histogramme de $n\eta(\hat\alpha_n-\alpha)$ vs densité de $\alpha\,\mathcal E(1)$ ; log-log de l'EQM ($O(n^{-2})$ vs $O(n^{-1})$).
9. **Paramètre à la frontière (exercice 4)** : $\mathcal N(\theta,1)$, $\Theta=\mathbb{R}_+$, curseur $\theta\to0$ : loi de $\sqrt n(\max(\bar X_n,0)-\theta)$ passant de gaussienne à $\max(W,0)$ (atome $1/2$ en 0).
10. **(Compléments) Un pas de Newton (Th. 4.5)** : partir de la médiane de Cauchy, effectuer un pas du score de Fisher, comparer les histogrammes avant/après.
