# Chapitre 2 — Estimation ponctuelle

> **Sources extraites :** `S2_APM41033-Week2-Cours` (poly p. 7–28, « Les fondamentaux », §1.1 à §1.5), `S2_APM41033-Week2-Maths` (« Les outils mathématiques », §2, p. 29–32), `S2_APM41033-Week2-Exercices` (« Les exercices », §3, p. 33–51, **avec corrigés** p. 39–51), `S2_APM41033-Week2-Compléments` (« Les compléments », §4, p. 52–59, **hors programme d'examen**).
> **Numérotation du poly (à respecter) :** les éléments encadrés sont numérotés « N.M » où N est la *section* du chapitre : §1 (cours) → Définition 1.1 à 1.8, Exemple 1.1 à 1.15, Méthode 1.1–1.2, Proposition 1.1 à 1.3, Théorème 1.1 ; §2 (outils) → Proposition 2.1, Définition 2.1–2.2, Théorème 2.1–2.2, Lemme 2.1 à 2.3 ; §4 (compléments) → Exemple 4.1 à 4.7, Théorème 4.1. Les « Définition 1 », « Définition 2 », « Définition 3 » (sans point) cités dans le texte sont les définitions **non encadrées du chapitre 1** (1 = modèle dominé, 2 = identifiabilité, 3 = statistique).
> **Attention aux homonymies de renvois :** dans le fascicule d'exercices, « Théorème 1.1 » renvoie au **théorème de Cochran du chapitre 1**, alors que le Théorème 1.1 *du chapitre 2* est la positivité de la divergence de Kullback-Leibler. De même « Lemme 2.1 du chapitre 1 » (vecteur gaussien à coordonnées indépendantes) ≠ Lemme 2.1 du chapitre 2 (convergence en probabilité et fonction continue). Les renvois « Section 2 / Section 4 » du texte désignent souvent les outils / compléments **du chapitre 1**.
> Le type « Méthode » (Méthode 1.1, Méthode 1.2) est un encadré propre au poly ; il est conservé tel quel.

---

## 0. Résumé en 10 lignes (ce qu'il faut retenir pour l'examen)

1. Un **estimateur** de $g(\theta)$ est *n'importe quelle* statistique (application mesurable des observations, sans $\theta$) à valeurs dans un espace contenant $g(\Theta)$ ; $-1$ est un (très mauvais) estimateur d'un paramètre positif, $\theta$ n'en est pas un (Déf. 1.1, Ex. 1.1). La qualité (biais, EQM, consistance) se juge ensuite.
2. **Méthode des moments** : choisir $d$ fonctions $T_j$ intégrables, calculer $e_j(\theta)=\mathbb{E}_\theta[T_j(X_1)]$, résoudre $e_j(\vartheta)=n^{-1}\sum_i T_j(X_i)$ ; l'estimateur dépend du choix des $T_j$ et n'existe que si le système a une solution unique dans $\Theta$ (Méthode 1.1, Ex. 1.4 : $\hat\theta_{n,1}=1/\bar X_n$, $\hat\theta_{n,2}=(2/\overline{X^2}_n)^{1/2}$ ; Ex. 1.5 : $\hat a_n,\hat b_n=\bar X_n\mp\sqrt{3V_n}$).
3. Les moments empiriques convergent (Bienaymé-Tchebychev $\mathbb{P}_\theta(|\cdot|\ge\varepsilon)\le\sigma^2(\theta)/(n\varepsilon^2)$, LGN) ; si $e$ est injective d'inverse continue en $e(\theta)$, $\hat\theta_n=e^{-1}(\cdot)\to\theta$ en probabilité (Prop. 1.1 + Lemme 2.1).
4. **Z-estimateur** : zéro de $\Psi_n(\vartheta)=n^{-1}\sum_i\boldsymbol\psi(\vartheta,X_i)$ avec $\mathbb{E}_\theta[\boldsymbol\psi(\theta,X_1)]=0$ ; la médiane ($\psi=\mathrm{signe}(x-\theta)$) est un Z-estimateur mais pas un estimateur des moments (Déf. 1.3, Ex. 1.6).
5. **Vraisemblance** $\mathrm{L}_n(\vartheta)=\prod_i q_\vartheta(X_i)$, **log-vraisemblance normalisée** $\ell_n(\vartheta)=n^{-1}\sum_i\log q_\vartheta(X_i)$ ; EMV $\hat\theta_n^{\mathrm{MV}}\in\operatorname*{arg\,max}_\vartheta \mathrm{L}_n(\vartheta)$ ; ne dépend pas de la mesure dominante (Déf. 1.4–1.5).
6. **Méthode 1.2** : cas régulier → annuler $\nabla_\vartheta\ell_n$ (équations de vraisemblance) **puis vérifier le maximum global** (concavité) et traiter les cas sans point critique ; cas non régulier (uniforme) → étude directe, ne pas dériver ($\hat\theta_n^{\mathrm{MV}}=X_{n:n}$ pour $\mathcal{U}([0,\theta])$).
7. EMV classiques : exponentiel $1/\bar X_n$ ; Bernoulli et Poisson $\bar X_n$ (= EMM) ; gaussien $(\bar X_n,\,n^{-1}\sum_i(X_i-\bar X_n)^2)$ (variance **biaisée**, facteur $(n-1)/n$) ; Laplace : médiane (non unique si $n$ pair).
8. L'EMV peut **ne pas exister** (Ex. 1.12, Poisson si $\bar X_n=0$) ou **ne pas être unique** (Laplace, $n$ pair) ; il est **invariant par reparamétrisation** : $\widehat{G(\theta)}=G(\hat\theta_n^{\mathrm{MV}})$ (Prop. 1.2).
9. **Kullback-Leibler** $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)=\int_{f_0>0}f_0\log(f_0/f_1)\,\mathrm{d}\mu\ge0$, $=0\iff\mathbb{P}_0=\mathbb{P}_1$ (Jensen, Th. 1.1) ; non symétrique. Sous $\mathbb{P}_{\theta^\star}$, $\ell_n(\vartheta)\to M_{\theta^\star}(\vartheta)=M_{\theta^\star}(\theta^\star)-\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\vartheta)$, maximale **uniquement** en $\theta^\star$ si le modèle est identifiable (Prop. 1.3) — d'où l'heuristique de consistance de l'EMV.
10. **M-estimateur** : $\hat\theta_n\in\operatorname*{arg\,max}_\vartheta M_n(\vartheta)=n^{-1}\sum_i m(\vartheta,X_i)$ avec $M_{\theta^\star}$ maximale en $\theta^\star$ ; EMV ($m=\log q_\vartheta$), moindres carrés ($m=-(x-\vartheta)^2$), médiane ($m=-|x-\vartheta|$) (Déf. 1.8, Ex. 1.15). Exos-types : régression linéaire gaussienne (EMV = moindres carrés, Cochran, IC pour $\sigma^2$), mélange (EMV ≠ EMM, seuillage, biais), famille exponentielle (EMV = EMM associé à $T$).

---

## 1. Notations et symboles

| Symbole LaTeX | Signification | Première apparition |
|---|---|---|
| $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ | modèle statistique paramétrique (espace des observations en police sans empattement $\mathsf{Z}$, tribu calligraphique $\mathcal{Z}$) | Déf. 1.1, p. 8 |
| $g:\Theta\to\mathbb{R}^q$, $g(\theta)$ | fonction du paramètre à estimer | Déf. 1.1, p. 8 |
| $T$, $T(Z)$ | estimateur ponctuel (statistique) ; $T(Z)$ sa valeur aléatoire | Déf. 1.1, p. 8 |
| $\mathcal{B}(\mathbb{R}^q)$ | tribu borélienne | Déf. 1.1, p. 8 |
| $\mathcal{E}(\theta)$ | loi exponentielle d'**intensité** $\theta$ (moyenne $1/\theta$, variance $1/\theta^2$) | §1.1 / Ex. 1.1, p. 8 |
| $\mathbb{R}_+^\ast$ | réels strictement positifs (poly : $\mathbb{R}^*_+$) | Ex. 1.1, p. 8 |
| $\bar X_n=n^{-1}\sum_{i=1}^nX_i$ | moyenne empirique | Ex. 1.1, p. 8 |
| $\mathbb{E}_\theta[T(Z)]-g(\theta)$ | biais | p. 8 |
| $\mathbb{E}_\theta\big[\lVert T(Z)-g(\theta)\rVert^2\big]$ | erreur quadratique moyenne | p. 8 |
| $T_n(Z)$ | suite d'estimateurs indexée par $n$ (consistance : $T_n(Z)\to g(\theta)$) | p. 8 |
| $\mathcal{B}\mathrm{er}(p)$, $\mathcal{P}\mathrm{oi}(\lambda)$, $\mathcal{U}([a,b])$, $\mathcal{N}(\mu,\sigma^2)$ | lois de Bernoulli, Poisson, uniforme, gaussienne | Ex. 1.2, 1.3, 1.5, p. 9–12 |
| $\mathcal{P}(E)$ | tribu de toutes les parties de $E$ | Ex. 1.2, p. 9 |
| $\hat p_n$, $\hat\theta_n$, $\hat\lambda_n$ | estimateurs construits à partir de $n$ observations | Ex. 1.2, p. 9 |
| $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\ \theta\in\Theta\})$ | modèle d'**une** observation ; $\mathbb{Q}_\theta$ loi d'une observation | Déf. 1.2, p. 9 |
| $\mathbb{P}_\theta:=\mathbb{Q}_\theta^{\otimes n}$ | loi des observations (du $n$-échantillon) | Méthode 1.1, p. 10 |
| $\vartheta$ (« vartheta ») | **variable libre** (inconnue des équations, argument de $\mathrm{L}_n$) ≠ $\theta$ vraie valeur | Déf. 1.2, p. 9 |
| $e(\theta)=\mathbb{E}_\theta[T(X_1)]$, $e_j(\theta)$ | moment exact associé à $T$ (resp. $T_j$) | Déf. 1.2 / Méthode 1.1, p. 9–10 |
| $n^{-1}\sum_{i=1}^nT(X_i)$ | moment empirique associé à $T$ | Déf. 1.2, p. 9 |
| $\tilde T$, $\tilde e$ | seconde fonction de moment et son moment exact | Ex. 1.4, p. 11 |
| $q_\theta$ | densité de $\mathbb{Q}_\theta$ par rapport à la mesure dominante ($\mu$ ou $\mathrm{Leb}$) | Ex. 1.4, éq. (1), p. 10 |
| $\mathrm{Leb}$ | mesure de Lebesgue sur $\mathbb{R}$ | Ex. 1.4, p. 10 |
| $\mathbb{1}_A$ | indicatrice de $A$ (double barre dans le poly) | éq. (1), p. 10 |
| $\mathrm{e}$ | constante d'Euler (le poly écrit $\mathrm{e}$ droit : $\theta\mathrm{e}^{-\theta x}$) | p. 10 |
| $\hat\theta_{n,1}$, $\hat\theta_{n,2}$ | deux estimateurs des moments du modèle exponentiel | Ex. 1.4, éq. (2), p. 11 |
| $q_1,q_3$, $\mathrm{IQR}=q_3-q_1$ | quartiles, écart interquartile (boîtes à moustaches) | Remarque, p. 11–12 |
| $\overline{X^2}_n:=n^{-1}\sum_iX_i^2$ | moyenne empirique des carrés | Ex. 1.5, p. 12 |
| $V_n:=\overline{X^2}_n-\bar X_n^2$ | variance empirique **non corrigée** | Ex. 1.5, p. 12 |
| $s,p$ ; $\hat s_n,\hat p_n$ | somme et produit $a+b$, $ab$ (changement d'inconnues) | Ex. 1.5, p. 12 |
| $X_{1:n}\le\dots\le X_{n:n}$ | statistiques d'ordre (notées $X_{(1)}\le\dots\le X_{(n)}$ au ch. 1) ; $X_{n:n}=\max_iX_i$ | Ex. 1.5 / 1.6, p. 12–15 |
| $\sigma^2(\theta)=\mathrm{Var}_\theta(T(X_1))$ | variance de la fonction de moment | Prop. 1.1, p. 13 |
| $\xrightarrow{\mathbb{P}_\theta\text{-prob}}$ | convergence en probabilité sous $\mathbb{P}_\theta$ | Prop. 1.1, p. 13 ; Déf. 2.1 |
| $\mathbf{T}=(T_1,\dots,T_d)$ | vecteur des fonctions de moment (gras) | éq. (3), p. 14 |
| $\boldsymbol\psi=(\psi_1,\dots,\psi_d)^\top$, $\psi(\vartheta,x)$ | fonction d'estimation (gras si vectorielle) | éq. (3), Déf. 1.3, p. 14 |
| $\Psi_n(\vartheta):=n^{-1}\sum_i\boldsymbol\psi(\vartheta,X_i)$ | fonction aléatoire dont le Z-estimateur est un zéro | Déf. 1.3, p. 14 |
| $\mathbf{0}_{d\times1}$ | vecteur nul de $\mathbb{R}^d$ | Déf. 1.3, p. 14 |
| $f$ | densité paire de référence (modèle de translation $q_\theta(x)=f(x-\theta)$) | Ex. 1.6, p. 14 |
| $\mathrm{signe}(z)$ | $-1$ si $z<0$, $0$ si $z=0$, $1$ si $z>0$ | Ex. 1.6, p. 14 |
| $\mathrm{med}(X_1,\dots,X_n)$ | médiane empirique ($X_{m+1:n}$ si $n=2m+1$, $\tfrac12(X_{m:n}+X_{m+1:n})$ si $n=2m$) | Ex. 1.6, p. 15 |
| $q_\theta\cdot\mu$ | loi de densité $q_\theta$ par rapport à $\mu$ | Déf. 1.4, p. 15 |
| $\mathrm{L}_n(\vartheta,X_1,\dots,X_n)$, $\mathrm{L}_n(\vartheta)$ | **vraisemblance** (L **droit**, romain, dans le poly) | Déf. 1.4, p. 16 |
| $\hat\theta_n^{\mathrm{MV}}$ | estimateur du maximum de vraisemblance (EMV) | Déf. 1.4, p. 16 |
| $\operatorname*{arg\,max}_{\vartheta\in\Theta}$ | ensemble des points de maximum | Déf. 1.4, p. 16 |
| $\ell_n(\vartheta,X_1,\dots,X_n)$ | log-vraisemblance **normalisée** $=\frac1n\log\mathrm{L}_n$ ; convention $\log0=-\infty$ | Déf. 1.5, p. 16 |
| $\log$ | logarithme **népérien** (le poly évite « ln » pour ne pas confondre avec $\mathrm{L}_n$, $\ell_n$) | Remarque, p. 16 |
| $S_n:=\sum_iX_i=n\bar X_n$ | nombre de 1 observés (Bernoulli) | Ex. 1.8, p. 17 |
| $\nabla_\vartheta\ell_n$, $\mathring\Theta$ | gradient en $\vartheta$, intérieur de $\Theta$ | Déf. 1.6, p. 18 |
| $\hat\theta_n^{\mathrm{rv}}$ | racine de l'équation de vraisemblance | Déf. 1.6, p. 18 |
| $(m,v)$ | variable libre du modèle gaussien (moyenne, variance) | Ex. 1.10, p. 19 |
| $S_n^2$ | variance empirique **corrigée** $\frac1{n-1}\sum_i(X_i-\bar X_n)^2$ (théorème de Gosset) | Remarque, p. 19 |
| $\hat\sigma^2_{\mathrm{MV}}$ | EMV de $\sigma^2$ | Remarque, p. 19 |
| $q_0$ | densité « en $\lvert x\rvert^{-1/2}$ » de l'Ex. 1.12 | Ex. 1.12, p. 21 |
| $\varphi(\vartheta)=\sum_i\lvert X_i-\vartheta\rvert$ | fonction à minimiser (Laplace) | Ex. 1.13, p. 22 |
| $G:\Theta\to\Xi:=G(\Theta)$, $\{\mathbb{Q}_\xi,\ \xi\in\Xi\}$, $\mathbb{Q}_\xi:=\mathbb{P}_{G^{-1}(\xi)}$ | reparamétrisation (attention : ici $\mathbb{Q}_\xi$ = loi reparamétrée, pas loi d'une observation) | Prop. 1.2, p. 23 |
| $\widetilde{\mathrm{L}}_n$, $\hat\xi_n$ | vraisemblance et EMV du modèle reparamétré | Prop. 1.2, p. 23 |
| $\tau=1/\theta$, $\hat\tau_n$ | espérance de la loi exponentielle et son EMV | Ex. 1.14, p. 23 |
| $\theta^\star$ | **paramètre « hypothèse »** (vraie valeur, on travaille sous $\mathbb{P}_{\theta^\star}$) | §1.4, p. 24 |
| $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)$ | divergence de Kullback-Leibler ; convention $\log(1/0)=+\infty$ | Déf. 1.7, p. 24 |
| $f_0,f_1$ | densités de $\mathbb{P}_0,\mathbb{P}_1$ par rapport à $\mu$ | Déf. 1.7, p. 24 |
| $A:=\{f_0>0\}$, $Y:=f_1(X)/f_0(X)$ | objets de la preuve du Th. 1.1 | p. 24 |
| $M_{\theta^\star}(\vartheta):=\mathbb{E}_{\theta^\star}[\log q_\vartheta(X_1)]$ | limite de $\ell_n(\vartheta)$ (puis $\mathbb{E}_{\theta^\star}[m(\vartheta,X_1)]$ pour un M-estimateur) | Prop. 1.3, p. 25 ; Déf. 1.8 |
| $\mathrm{Ent}(\mathbb{Q}_{\theta^\star})=\int q_{\theta^\star}\log q_{\theta^\star}\,\mathrm{d}\mu$ | « entropie » au sens du poly (= **opposé** de l'entropie de Shannon) ; dépend de $\mu$ | p. 25 |
| $\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\cdot)$ | fonction $\vartheta\mapsto\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\vartheta)$ | p. 25 |
| $m(\vartheta,x)$, $M_n(\vartheta)=n^{-1}\sum_im(\vartheta,X_i)$ | critère d'un M-estimateur et sa version empirique | Déf. 1.8, p. 26 |
| $F_{\theta^\star}(t)=\mathbb{P}_{\theta^\star}(X_1\le t)$ | fonction de répartition | Ex. 1.15, p. 27 |
| $\mathbb{P}(\cdot)$, $\mathbb{E}[\cdot]$, $\mathrm{Var}$ | probabilité / espérance génériques (outils) | Prop. 2.1, p. 29 |
| $Y_n\xrightarrow{\mathbb{P}\text{-prob}}y$ | convergence en probabilité | Déf. 2.1, p. 29 |
| $c_t$ | pente d'une droite d'appui en $t$ | Lemme 2.2, p. 30 |
| $[A(Z),B(Z)]$, $\alpha$ | intervalle de confiance, niveau $1-\alpha$ | Déf. 2.2, p. 32 |
| $\mathbf{Y}$, $\mathbf{X}=[\mathbf{1}\ \underline{\mathbf{x}}]$, $\mathbf{1}$, $\underline{\mathbf{x}}$, $\beta$ | notations matricielles de l'Exercice 1 ($\underline{\mathbf{x}}$ **souligné** dans le poly) ; transposée notée $^T$ dans les exercices | Exercices, p. 34 |
| $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$ | écriture du poly (exercices) pour la loi de densité $p_\theta$ | Exercices, p. 34 |
| $P:=\mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$, $F=\mathrm{Im}(\mathbf{X})$ | projecteur orthogonal sur le sous-espace des régresseurs | Corrigé Ex. 1, p. 40 |
| $q^{n-2}_{\alpha/2}$, $q^{n-2}_{1-\alpha/2}$ | quantiles de $\chi^2(n-2)$ | Corrigé Ex. 1, p. 41 |
| $N_a:=\sum_i\mathbb{1}_{X_i\in[0,a]}$, $f_\theta$, $F_\theta$, $p_\theta$ | mélange uniforme (Ex. 2) | Exercices, p. 34 ; corrigé p. 42–43 |
| $\hat\theta_n^{(1)}$, $\hat\theta_n^{(2)}$, $\hat\theta_n$, $\tilde\theta_n$, $x\vee y$ | estimateurs (seuillés / non seuillés) du mélange ; $\vee$ = max | Ex. 2, p. 35 ; corrigé p. 42 |
| $q_\eta(x)=h(x)\exp(\eta T(x)-A(\eta))$, $A$, $\Xi$, $G(\eta)$ | modèle exponentiel canonique, log-partition, espace des paramètres naturels | Ex. 3, p. 36 |
| $p_\theta(x)=h(x)\exp(\varphi(\theta)T(x)-B(\theta))$ | famille exponentielle générale ($\varphi$, à ne pas confondre avec le $\phi$ de l'Ex. 5) | Ex. 3, p. 36 |
| $\bar T_n=n^{-1}\sum_kT(X_k)$ | moyenne empirique de la statistique $T$ | Corrigé Ex. 3, p. 46 |
| $Z=X_0\wedge X_1$, $I$, $N_\delta$, $\bar Z_n$ | durée de vie du système, indicatrice de la cause (Ex. 4) ; $\wedge$ = min | Ex. 4, p. 38 ; corrigé p. 48–49 |
| $g_v$, $J$, $M=I_n-\phi J$, $\Sigma$ | densité $\mathcal{N}(0,v)$, matrice de décalage, etc. (Ex. 5, auto-régressif) | Corrigé Ex. 5, p. 50–51 |

**Notations particulières à signaler :**
- **$\vartheta$ vs $\theta$ vs $\theta^\star$** : le poly distingue systématiquement la *variable libre* $\vartheta$ (argument de $e(\cdot)$, $\mathrm{L}_n(\cdot)$, $\ell_n(\cdot)$, $M_n(\cdot)$) du paramètre $\theta$ sous lequel on calcule ; à partir du §1.4, la vraie valeur est notée $\theta^\star$ (étoile pleine, `\star`). Les exercices écrivent la variable libre $\vartheta=(b_1,b_2,v)$, $(a,v)$, $(l_0,l_1)$.
- **$\mathrm{L}_n$ droit** (romain) pour la vraisemblance ; **$\ell_n$** (ell) pour la log-vraisemblance *normalisée par $n$* (attention : $\ell_n=\frac1n\log\mathrm{L}_n$, pas $\log\mathrm{L}_n$).
- **$\mathbb{Q}_\theta$** = loi d'une observation sur $(\mathsf{X},\mathcal{X})$, **$\mathbb{P}_\theta=\mathbb{Q}_\theta^{\otimes n}$** = loi de l'échantillon ; mais **dans la Prop. 1.2**, $\mathbb{Q}_\xi$ désigne la loi du modèle reparamétré.
- Exposant **MV** (maximum de vraisemblance) : $\hat\theta_n^{\mathrm{MV}}$ ; exposant **rv** (racine de vraisemblance) : $\hat\theta_n^{\mathrm{rv}}$.
- **Statistiques d'ordre** notées $X_{k:n}$ au chapitre 2 (et non $X_{(k)}$ comme au chapitre 1).
- La loi exponentielle est paramétrée par l'**intensité** : $\mathcal{E}(\theta)$ de densité $\theta\mathrm{e}^{-\theta x}\mathbb{1}_{\mathbb{R}_+}(x)$, $\mathbb{E}_\theta[X_1^k]=k!/\theta^k$.
- **$\mathrm{Ent}$** du poly est l'**opposé** de l'entropie de Shannon.
- Dans les exercices, la transposée est notée $^T$ (cours : $^\top$) et le vecteur des $x_i$ est **souligné** : $\underline{\mathbf{x}}$.
- $\mathrm{signe}(0)=0$ (convention explicite).

---

## 2. Cours — contenu principal

### Remarque (introduction) — Comment construire un estimateur ?
**Source :** Poly ch.2, introduction « Comment construire un estimateur ? », p. 7
**Hypothèses :** un modèle statistique est fixé.
**Énoncé :** Au chapitre 1, les estimateurs ont été trouvés au cas par cas (proportion empirique pour Bernoulli, correction affine pour les réponses randomisées, droite des moindres carrés pour la tendance de température), en remarquant que le paramètre s'exprimait à l'aide d'une moyenne approchable par les observations. Le chapitre 2 présente **deux procédés systématiques** :
1. la **méthode des moments** : égaler des moyennes théoriques (fonctions du paramètre) à leurs contreparties empiriques ;
2. le **maximum de vraisemblance** : retenir la valeur du paramètre qui maximise la densité des observations vue comme fonction du paramètre.

Les deux méthodes **ne coïncident pas en général**, et **aucune ne garantit à elle seule** que l'estimateur obtenu est bon (la qualité est l'objet des chapitres suivants). Canevas commun : intuition, définition, exemples, propriétés, généralisation (Z-estimateurs pour les moments, M-estimateurs pour le maximum de vraisemblance). L'étude du maximum de vraisemblance mène à la **divergence de Kullback-Leibler**.
**Preuve (étapes) :** sans objet.
**Intuition :** construire ≠ évaluer : une méthode de construction fournit un candidat.

### Définition 1.1 — Estimateur ponctuel
**Source :** Poly ch.2, Définition 1.1, p. 8
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle statistique paramétrique ; $g:\Theta\to\mathbb{R}^q$ une fonction.
**Énoncé :** Un **estimateur ponctuel** $T$ de $g(\theta)$ est une statistique à valeurs dans un espace mesurable contenant $g(\Theta)$, typiquement $(\mathbb{R}^q,\mathcal{B}(\mathbb{R}^q))$ : une application mesurable
$$T:(\mathsf{Z},\mathcal{Z})\to(\mathbb{R}^q,\mathcal{B}(\mathbb{R}^q)).$$
*Note de bas de page 1 :* on impose parfois à un estimateur de $g(\theta)$ de prendre ses valeurs dans $g(\Theta)$ lui-même ; cette restriction apporte peu conceptuellement et exclut des estimateurs admissibles dans la théorie classique ; **le poly ne la retient pas**.
**Preuve (étapes) :** sans objet (définition).
**Intuition :** comme toute statistique (Définition 3 du ch. 1), un estimateur ne dépend **que des observations** : le paramètre inconnu n'intervient pas dans son expression. C'est la **seule** contrainte. Estimer ponctuellement = répondre par une seule valeur (nombre ou vecteur) ; la cible peut être une fonction du paramètre, p. ex. la variance $1/\theta^2$ d'une loi exponentielle d'intensité $\theta$.
**Pièges / erreurs classiques :** croire qu'un estimateur doit être « bon » ou à valeurs dans $\Theta$ ; écrire un « estimateur » qui contient $\theta$.

### Exemple 1.1 — Qu'est-ce qui est un estimateur ?
**Source :** Poly ch.2, Exemple 1.1, p. 8
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon du modèle exponentiel $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{E}(\theta),\ \theta\in\mathbb{R}_+^\ast\}\big)$ ; on veut estimer $\theta$.
**Énoncé :** Parmi $X_1,\ \bar X_n,\ \theta,\ 1,\ -1$, **quatre sont des estimateurs** de $\theta$ : $X_1$, $\bar X_n$, la constante $1$ et la constante $-1$ (fonctions mesurables des observations). **$\theta$ n'en est pas un** : c'est la quantité inconnue, non calculable à partir des données. Rien n'interdit à $-1$ d'être un estimateur d'un paramètre strictement positif : c'est un très mauvais estimateur, mais c'en est un.
**Preuve (étapes) :** 1. Une constante est une application mesurable (tribu image triviale). 2. $X_1$ et $\bar X_n$ sont des fonctions mesurables (projection, somme) de $Z$. 3. $\theta$ n'est pas une fonction de $Z$.
**Méthodes mobilisées :** application directe de la Déf. 1.1.
**Intuition :** la définition sépare la *construction* de l'*évaluation*.

### Remarque — Trois mesures de qualité (annonce) et intuition
**Source :** Poly ch.2, §1.1, p. 8
**Hypothèses :** $T$ estimateur de $g(\theta)$ ; $(T_n)$ suite d'estimateurs.
**Énoncé :** Trois mesures seront introduites :
- le **biais** $\mathbb{E}_\theta[T(Z)]-g(\theta)$ (compare l'estimateur à sa cible en moyenne) ;
- l'**erreur quadratique moyenne** $\mathbb{E}_\theta\big[\lVert T(Z)-g(\theta)\rVert^2\big]$ ;
- la **consistance** : convergence de $T_n(Z)$ vers $g(\theta)$ quand $n\to\infty$.

Biais et EQM : théorie de la décision (cours 3 et 4) ; consistance : comportement asymptotique (cours 6 et 7). Ils apparaissent dès ce chapitre, notamment dans l'Exercice 2 (PC2), où le biais de deux estimateurs concurrents est calculé.
**Preuve (étapes) :** sans objet.
**Intuition (encadré « Intuition », p. 8) :** « Un estimateur n'est pas nécessairement *bon*. » La définition ne demande qu'une chose, qu'il soit calculable à partir des données ; une méthode de construction fournit un candidat, c'est l'étude de son biais, de son EQM et de son comportement quand $n$ grandit qui dit s'il faut le retenir.

### Exemple 1.2 — Modèle de Bernoulli : un premier estimateur des moments
**Source :** Poly ch.2, Exemple 1.2, p. 9
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon du modèle $\big(\{0,1\},\mathcal{P}(\{0,1\}),\{\mathcal{B}\mathrm{er}(p),\ p\in[0,1]\}\big)$.
**Énoncé :** Le candidat naturel est la proportion empirique de 1, i.e. $\bar X_n=n^{-1}\sum_{i=1}^nX_i$, car $\mathbb{E}_p[X_1]=p$ : le paramètre est une espérance, on l'estime par sa version empirique
$$\hat p_n:=\bar X_n .$$
C'est l'estimateur du chapitre 1 (Section 1.8).
**Preuve (étapes) :** 1. $\mathbb{E}_p[X_1]=0\cdot(1-p)+1\cdot p=p$. 2. On remplace l'espérance par la moyenne empirique.
**Méthodes mobilisées :** méthode des moments avec $T(x)=x$.
**Intuition :** schéma général : choisir $T$, calculer $e(\theta)=\mathbb{E}_\theta[T(X_1)]$, résoudre en $\vartheta$ l'équation $e(\vartheta)=n^{-1}\sum_{i=1}^nT(X_i)$, solution notée $\hat\theta_n$.

### Définition 1.2 — Méthode des moments, cas simple
**Source :** Poly ch.2, Définition 1.2, p. 9
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon d'un modèle paramétrique $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\ \theta\in\Theta\})$ avec $\Theta\subseteq\mathbb{R}$ ; $T:\mathsf{X}\to\mathbb{R}$ mesurable telle que $\mathbb{E}_\theta[\lvert T(X_1)\rvert]<\infty$ pour tout $\theta\in\Theta$.
**Énoncé :** On appelle **moment exact** associé à $T$ la fonction $e:\theta\mapsto e(\theta):=\mathbb{E}_\theta[T(X_1)]$, et **moment empirique** associé à $T$ la statistique $n^{-1}\sum_{i=1}^nT(X_i)$. On considère l'équation, d'inconnue $\vartheta\in\Theta$,
$$e(\vartheta)=\frac1n\sum_{i=1}^nT(X_i).$$
Lorsqu'elle admet une **solution unique**, celle-ci est notée $\hat\theta_n$ et appelée l'**estimateur des moments associé à $T$** : c'est la valeur du paramètre qui égale moment exact et moment empirique.
**Preuve (étapes) :** sans objet.
**Intuition :** « une espérance s'approche par une moyenne empirique ».
**Pièges / erreurs classiques :** l'estimateur n'est défini que si la solution existe, est unique **et appartient à $\Theta$**.

### Exemple 1.3 — Modèles exponentiel et de Poisson : deux applications
**Source :** Poly ch.2, Exemple 1.3, p. 9
**Hypothèses :** (1) $n$-échantillon de $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{E}(\theta),\ \theta\in\mathbb{R}_+^\ast\}\big)$ ; (2) $n$-échantillon de $\big(\mathbb{N},\mathcal{P}(\mathbb{N}),\{\mathcal{P}\mathrm{oi}(\lambda),\ \lambda\in\mathbb{R}_+^\ast\}\big)$.
**Énoncé :**
1. *Modèle exponentiel.* $\mathbb{E}_\theta[X_1]=1/\theta$ : le paramètre se déduit d'une espérance par une fonction inversible. On retient $\hat\theta_n$ tel que $1/\hat\theta_n=\bar X_n$, soit
$$\hat\theta_n=1/\bar X_n,$$
défini dès que $\bar X_n>0$, ce qui a lieu $\mathbb{P}_\theta$-presque sûrement.
2. *Modèle de Poisson, moment d'ordre 2.* Rien n'oblige à utiliser le moment d'ordre 1 : comme $\mathbb{E}_\lambda[X_1^2]=\mathrm{Var}_\lambda(X_1)+\mathbb{E}_\lambda[X_1]^2=\lambda+\lambda^2$, on peut retenir $\hat\lambda_n$ tel que $\hat\lambda_n^2+\hat\lambda_n=n^{-1}\sum_{i=1}^nX_i^2$, i.e. l'unique racine dans $\mathbb{R}_+$ de cette équation du second degré :
$$\hat\lambda_n=\frac12\Big(-1+\sqrt{1+4\,n^{-1}\textstyle\sum_{i=1}^nX_i^2}\Big).$$
Cette racine vaut $0$ exactement lorsque toutes les observations sont nulles, événement de probabilité $\mathrm{e}^{-n\lambda}>0$. Comme $\Theta=\mathbb{R}_+^\ast$, l'estimateur n'est alors **pas défini** ; il le serait si l'on adjoignait $\lambda=0$ (masse de Dirac en 0). Le premier estimateur des moments, $\bar X_n$, rencontre exactement la même limite.
**Preuve (étapes) :** 1. (Exponentiel) $\mathbb{E}_\theta[X_1]=1/\theta$ (lemme des moments de la loi exponentielle, ch. 1) ; $e(\vartheta)=1/\vartheta=\bar X_n$ a pour solution unique $1/\bar X_n$ si $\bar X_n>0$ ; $\bar X_n>0$ p.s. car $X_1>0$ p.s. (loi à densité sur $\mathbb{R}_+$). 2. (Poisson) $\mathrm{Var}_\lambda(X_1)=\lambda$, $\mathbb{E}_\lambda[X_1]=\lambda$ ; on résout $\vartheta^2+\vartheta-c=0$ avec $c=\overline{X^2}_n\ge0$ : discriminant $1+4c$, racines $\frac{-1\pm\sqrt{1+4c}}2$, seule $\frac{-1+\sqrt{1+4c}}2\ge0$. 3. Elle est nulle ssi $c=0$ ssi tous les $X_i=0$, de probabilité $(\mathrm{e}^{-\lambda})^n$ par indépendance.
**Méthodes mobilisées :** méthode des moments (ordre 1 et ordre 2), résolution d'une équation du second degré.
**Intuition :** le paramètre n'a pas besoin d'être lui-même une espérance ; il suffit qu'il s'en déduise par une fonction inversible.
**Pièges / erreurs classiques :** oublier les événements de probabilité positive où l'estimateur sort de $\Theta$.

### Méthode 1.1 — Méthode des moments
**Source :** Poly ch.2, Méthode 1.1, p. 10
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon d'un modèle paramétrique $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\ \theta\in\Theta\})$, $\Theta\subseteq\mathbb{R}^d$ ; on note $\mathbb{P}_\theta:=\mathbb{Q}_\theta^{\otimes n}$ la loi des observations.
**Énoncé :**
1. Choisir $d$ fonctions mesurables $T_j:\mathsf{X}\to\mathbb{R}$, $j\in\{1,\dots,d\}$, telles que
$$\mathbb{E}_\theta[\lvert T_j(X_1)\rvert]=\int_{\mathsf{X}}\lvert T_j(x)\rvert\,\mathbb{Q}_\theta(\mathrm{d}x)<\infty,\qquad\theta\in\Theta.$$
2. Calculer les **moments exacts** : $e_j(\theta):=\mathbb{E}_\theta[T_j(X_1)]$ pour tout $\theta$ et tout $j$.
3. Les $e_j(\theta)$ ne sont pas connus (puisque $\theta$ ne l'est pas) ; on les estime par les **moments empiriques** $n^{-1}\sum_{i=1}^nT_j(X_i)$.
4. Résoudre, par rapport à $\vartheta$, le système de $d$ équations à $d$ inconnues
$$\forall j\in\{1,\dots,d\}\qquad\frac1n\sum_{i=1}^nT_j(X_i)=e_j(\vartheta).$$

En supposant que ce système admette une **solution unique** $\hat\theta_n$ dans $\Theta$, on appelle $\hat\theta_n$ l'**estimateur des moments de $\theta$ associé aux fonctions $T_j$**, $j=1,\dots,d$.
**Preuve (étapes) :** sans objet (procédure).
**Intuition :** autant d'équations que d'inconnues ; on égalise théorique et empirique.
**Pièges / erreurs classiques (commentaire p. 10) :** (a) ni l'existence ni l'unicité ne sont automatiques, et la solution peut exister **sans appartenir à $\Theta$** (Poisson, toutes observations nulles) ; (b) le résultat **dépend des $T_j$ choisies** : un modèle admet en général **plusieurs** estimateurs des moments.

### Exemple 1.4 — Modèle exponentiel : deux estimateurs des moments
**Source :** Poly ch.2, Exemple 1.4, p. 10–11
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon de $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{E}(\theta),\ \theta\in\Theta:=\mathbb{R}_+^\ast\}\big)$, densité par rapport à $\mathrm{Leb}$
$$q_\theta(x):=\theta\mathrm{e}^{-\theta x}\mathbb{1}_{\mathbb{R}_+}(x).\tag{1}$$
**Énoncé :** (Modèle de base des systèmes à événements discrets : arrivées, pannes, durées de survie.)
- **Absence de mémoire :** pour tous $a,b>0$, $\mathbb{P}_\theta(X_1\ge a+b\mid X_1\ge a)=\dfrac{\mathrm{e}^{-(a+b)\theta}}{\mathrm{e}^{-a\theta}}=\mathbb{P}_\theta(X_1\ge b)$.
- **Moments :** $\mathbb{E}_\theta[X_1^k]=\dfrac{k!}{\theta^k}$, $k\in\mathbb{N}^\ast$ (IPP successives ou fonction génératrice des moments ; lemme du ch. 1).
- Avec $T(x)=x$ et $\tilde T(x)=x^2$ :
$$e(\theta)=\mathbb{E}_\theta[T(X_1)]=\int_0^{+\infty}x\,\theta\exp(-\theta x)\,\mathrm{d}x=\frac1\theta,\qquad\tilde e(\theta)=\mathbb{E}_\theta[\tilde T(X_1)]=\int_0^{+\infty}x^2\,\theta\exp(-\theta x)\,\mathrm{d}x=\frac2{\theta^2}.$$
- Équations : $e(\vartheta)=\dfrac1\vartheta=\dfrac1n\sum_{i=1}^nX_i$ et $\tilde e(\vartheta)=\dfrac2{\vartheta^2}=\dfrac1n\sum_{i=1}^nX_i^2$. Sous $\vartheta>0$ et dès que les observations ne sont pas toutes nulles ($\mathbb{P}_\theta$-p.s.), solutions uniques :
$$\hat\theta_{n,1}:=\frac1{n^{-1}\sum_{i=1}^nX_i},\qquad\hat\theta_{n,2}:=\Big(\frac2{n^{-1}\sum_{i=1}^nX_i^2}\Big)^{1/2}.\tag{2}$$
**Preuve (étapes) :** 1. $\mathbb{P}_\theta(X_1\ge t)=\mathrm{e}^{-\theta t}$ (intégration de la densité) ⇒ absence de mémoire par définition de la probabilité conditionnelle. 2. Moments par intégration par parties. 3. $1/\vartheta=c>0$ ⇒ $\vartheta=1/c$ ; $2/\vartheta^2=c'>0$ et $\vartheta>0$ ⇒ $\vartheta=\sqrt{2/c'}$ (stricte monotonie de $\vartheta\mapsto1/\vartheta$ et $\vartheta\mapsto2/\vartheta^2$ sur $\mathbb{R}_+^\ast$).
**Méthodes mobilisées :** méthode des moments (deux choix de $T$), calcul de moments par IPP.
**Remarque (p. 11) :** il y a **deux** estimateurs des moments, et il y en aurait autant que de fonctions $T$ admissibles : on ne dit pas « l'estimateur des moments » mais « un estimateur des moments » ou « l'estimateur des moments *associé au moment $T$* ». Ils ne se valent pas. Biais et EQM de $\hat\theta_{n,1}$ (ch. 1, lois Gamma, Section 4) :
$$\mathbb{E}_\theta[\hat\theta_{n,1}]=\frac{n\theta}{n-1}\ (n\ge2),\qquad\mathbb{E}_\theta[(\hat\theta_{n,1}-\theta)^2]=\frac{(n+2)\theta^2}{(n-1)(n-2)}\ (n\ge3).$$
*Figure (p. 11) :* boîtes à moustaches de $\hat\theta_{n,1}$ et $\hat\theta_{n,2}$ sur de nombreux échantillons simulés sous $\mathbb{P}_\theta$, $\theta=1$ : les deux se concentrent autour de la vraie valeur, mais **$\hat\theta_{n,2}$ est nettement plus dispersé** que $\hat\theta_{n,1}$.
**Remarque (boîte à moustaches, p. 11–12) :** la boîte va du premier quartile $q_1$ au troisième $q_3$, coupée par la médiane ; hauteur $\mathrm{IQR}=q_3-q_1$. Convention de Tukey : moustache supérieure jusqu'à la plus grande valeur $\le q_3+1{,}5\,\mathrm{IQR}$, inférieure jusqu'à la plus petite valeur $\ge q_1-1{,}5\,\mathrm{IQR}$, au-delà points isolés. Pour des données gaussiennes, la boîte couvre ≈ 50 % et les moustaches ≈ 99,3 % des valeurs. Position de la médiane vs vraie valeur ↔ biais ; hauteur de la boîte et longueur des moustaches ↔ dispersion.
**Intuition :** utiliser un moment d'ordre plus élevé ($x^2$) introduit plus de variabilité.
**Pièges / erreurs classiques :** parler de « l'» estimateur des moments sans préciser $T$.

### Exemple 1.5 — Loi uniforme sur $[a,b]$ : deux moments nécessaires
**Source :** Poly ch.2, Exemple 1.5, p. 12–13
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon de la loi uniforme sur $[a,b]$, $\theta=(a,b)\in\Theta:=\{(a,b)\in\mathbb{R}^2,\ a<b\}$, densité $q_\theta(x)=\frac1{b-a}\mathbb{1}_{[a,b]}(x)$ ; $n\ge2$ pour la conclusion.
**Énoncé :** Avec $T(x)=x$, $\tilde T(x)=x^2$ :
$$e(\theta)=\mathbb{E}_\theta[X_1]=\frac{a+b}2,\qquad\tilde e(\theta)=\mathbb{E}_\theta[X_1^2]=\frac{b^3-a^3}{3(b-a)}=\frac{a^2+ab+b^2}3.$$
Système : $\dfrac{a+b}2=\bar X_n$, $\dfrac{a^2+ab+b^2}3=\overline{X^2}_n:=\dfrac1n\sum_{i=1}^nX_i^2$. Avec $s=a+b$, $p=ab$ ($a^2+ab+b^2=s^2-p$) :
$$\hat s_n=2\bar X_n,\qquad\hat p_n=\hat s_n^2-3\,\overline{X^2}_n,$$
et $\hat a_n,\hat b_n$ sont les racines de $t^2-\hat s_nt+\hat p_n=0$. Avec $V_n:=\overline{X^2}_n-\bar X_n^2=n^{-1}\sum_i(X_i-\bar X_n)^2\ge0$, le discriminant vaut
$$\hat s_n^2-4\hat p_n=4\bar X_n^2-4\big(4\bar X_n^2-3\overline{X^2}_n\big)=12\big(\overline{X^2}_n-\bar X_n^2\big)=12V_n\ge0,$$
d'où
$$\hat a_n=\bar X_n-\sqrt{3V_n},\qquad\hat b_n=\bar X_n+\sqrt{3V_n}.$$
Pour $n\ge2$, les observations ne sont pas toutes égales $\mathbb{P}_\theta$-p.s., donc $V_n>0$, $\hat a_n<\hat b_n$ et $(\hat a_n,\hat b_n)\in\Theta$ : solution unique dans $\Theta$ (la contrainte $a<b$ impose l'ordre des racines). Le nombre d'équations doit être au moins égal au nombre d'inconnues.
**Preuve (étapes) :** 1. Moments : intégrales élémentaires ; $b^3-a^3=(b-a)(a^2+ab+b^2)$. 2. Changement d'inconnues $(a,b)\mapsto(s,p)$ (relations de Viète) : système triangulaire en $(s,p)$ ($s$ puis $p$). 3. Discriminant $=12V_n\ge0$ ⇒ racines réelles. 4. $V_n>0$ p.s. pour $n\ge2$ (loi à densité ⇒ $X_1\ne X_2$ p.s.) ⇒ racines distinctes, ordonnées par $a<b$.
**Méthodes mobilisées :** méthode des moments en dimension 2, changement d'inconnues somme/produit, discriminant.
**Remarque (p. 12–13) :** l'intervalle $[\hat a_n,\hat b_n]$ **ne contient pas nécessairement toutes les observations** : c'est le cas dès que $X_{n:n}-\bar X_n>\sqrt{3V_n}$. Exemple : $n=10$, neuf observations ≈ 0 et une ≈ 1 : $\bar X_n\simeq0{,}1$, $V_n\simeq0{,}09$, $\hat b_n\simeq0{,}1+0{,}27\simeq0{,}62$ alors que $X_{n:n}\simeq1$. La méthode des moments n'utilise que les deux premiers moments empiriques et ignore la contrainte $a\le X_i\le b$. Le maximum de vraisemblance, lui, retiendra $[X_{1:n},X_{n:n}]$ (renvoi à l'Exemple 1.11).
*Illustration / animation (p. 13) :* comparer $[\hat a_n,\hat b_n]$ et $[X_{1:n},X_{n:n}]$ sur des répétitions, fréquence d'échec du premier.
**Intuition :** un paramètre de dimension 2 demande deux moments.
**Pièges / erreurs classiques :** oublier de vérifier que l'estimateur est dans $\Theta$ ; croire que l'estimateur des moments respecte le support.

### Proposition 1.1 — Convergence des moments empiriques
**Source :** Poly ch.2, Proposition 1.1, p. 13
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon de $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\ \theta\in\Theta\})$ ; $T:\mathsf{X}\to\mathbb{R}$ mesurable, $\mathbb{E}_\theta[\lvert T(X_1)\rvert]<\infty$ pour tout $\theta$ ; $e(\theta)=\mathbb{E}_\theta[T(X_1)]$.
**Énoncé :**
(i) Si de plus $\mathbb{E}_\theta[T(X_1)^2]<\infty$, alors, avec $\sigma^2(\theta):=\mathrm{Var}_\theta(T(X_1))=\int_{\mathsf{X}}\{T(x)-e(\theta)\}^2\,\mathbb{Q}_\theta(\mathrm{d}x)$, pour tout $\varepsilon>0$,
$$\mathbb{P}_\theta\Big(\Big\lvert\frac1n\sum_{i=1}^nT(X_i)-e(\theta)\Big\rvert\ge\varepsilon\Big)\le\frac{\sigma^2(\theta)}{n\varepsilon^2}.$$
(ii) Dans tous les cas, $n^{-1}\sum_{i=1}^nT(X_i)\xrightarrow{\mathbb{P}_\theta\text{-prob}}e(\theta)$ (loi faible des grands nombres).
En particulier, si pour tout $n$ l'estimateur des moments $\hat\theta_n$ associé à $T$ est défini $\mathbb{P}_\theta$-p.s., alors $e(\hat\theta_n)=n^{-1}\sum_{i=1}^nT(X_i)$ p.s., de sorte que $\mathbb{P}_\theta(\lvert e(\hat\theta_n)-e(\theta)\rvert\ge\varepsilon)\le\sigma^2(\theta)/(n\varepsilon^2)$ sous l'hypothèse de (i), et $e(\hat\theta_n)\xrightarrow{\mathbb{P}_\theta\text{-prob}}e(\theta)$.
**Preuve (étapes) :**
1. Sous $\mathbb{P}_\theta$, les $T(X_1),\dots,T(X_n)$ sont i.i.d. d'espérance $e(\theta)$ (fonctions mesurables de variables i.i.d.).
2. (i) La moyenne empirique a pour variance $\sigma^2(\theta)/n$ (**par indépendance** : variance d'une somme = somme des variances) ; on applique l'**inégalité de Bienaymé-Tchebychev** (Proposition 2.1).
3. (ii) **Loi faible des grands nombres** pour des v.a. i.i.d. intégrables (Théorème 2.1) ; sous l'hypothèse de (i), elle découle aussi directement de la borne de (i) (qui tend vers 0).
4. Dernière affirmation : par **définition de $\hat\theta_n$**, $e(\hat\theta_n)$ égale le moment empirique.
**Intuition :** une moyenne empirique se concentre autour de l'espérance qu'elle estime.
**Remarque (p. 13) :** la proposition porte sur **$e(\hat\theta_n)$, pas sur $\hat\theta_n$**. Pour conclure sur $\hat\theta_n$, il faut inverser $e$ : si $e$ est **injective** et si $e^{-1}:e(\Theta)\to\Theta$ est **continue au point $e(\theta)$**, alors $\hat\theta_n=e^{-1}\big(n^{-1}\sum_{i=1}^nT(X_i)\big)\xrightarrow{\mathbb{P}_\theta\text{-prob}}\theta$ (**Lemme 2.1**). C'est le cas si $\Theta$ est un intervalle et $e$ continue strictement monotone ; ex. : modèle exponentiel, $e(\theta)=1/\theta$ et $\hat\theta_{n,1}=1/\bar X_n\xrightarrow{\mathbb{P}_\theta\text{-prob}}\theta$. Consistance et vitesse (LGN, TCL) : suite du cours.
**Pièges / erreurs classiques :** confondre convergence du moment et convergence de l'estimateur ; oublier l'hypothèse de moment d'ordre 2 pour la borne quantitative.

### Remarque — Généralisation : les Z-estimateurs (équation (3))
**Source :** Poly ch.2, §1.2 « Généralisation : les Z-estimateurs », p. 14
**Hypothèses :** fonctions de moment $\mathbf{T}=(T_1,\dots,T_d)$.
**Énoncé :** L'estimateur des moments associé à $\mathbf{T}$ est la solution du système de $d$ équations
$$\frac1n\sum_{i=1}^n\boldsymbol\psi(\vartheta,X_i)=0,\qquad\text{avec}\quad\boldsymbol\psi(\vartheta,x):=\mathbf{T}(x)-\mathbb{E}_\vartheta[\mathbf{T}(X_1)].\tag{3}$$
On considère des **fonctions d'estimation** $\boldsymbol\psi$ plus générales, qui ne s'écrivent pas comme différence entre une statistique et son espérance ; la **seule propriété utilisée** est que **son espérance s'annule au vrai paramètre**.
**Preuve (étapes) :** réécriture de la Méthode 1.1.
**Intuition :** passer d'« égaler des moments » à « annuler une moyenne empirique centrée ».

### Définition 1.3 — Z-estimateur
**Source :** Poly ch.2, Définition 1.3, p. 14
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon de $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\ \theta\in\Theta\})$, $\Theta\subseteq\mathbb{R}^d$ ; $\psi_j:\Theta\times\mathsf{X}\to\mathbb{R}$, $j\in\{1,\dots,d\}$, mesurables, telles que pour tout $\theta\in\Theta$ et tout $j$, $\mathbb{E}_\theta[\lvert\psi_j(\theta,X_1)\rvert]<\infty$ et
$$\mathbb{E}_\theta\big[\boldsymbol\psi(\theta,X_1)\big]=\mathbf{0}_{d\times1},\qquad\boldsymbol\psi:=(\psi_1,\dots,\psi_d)^\top.$$
**Énoncé :** On appelle **Z-estimateur associé à $\boldsymbol\psi$** tout estimateur $\hat\theta_n$ vérifiant
$$\Psi_n(\hat\theta_n)=0,\qquad\text{où}\quad\Psi_n(\vartheta):=\frac1n\sum_{i=1}^n\boldsymbol\psi(\vartheta,X_i).$$
**Preuve (étapes) :** sans objet.
**Intuition :** la lettre Z rappelle que l'estimateur est un **zéro** de la fonction aléatoire $\Psi_n$. Un estimateur des moments est un Z-estimateur (fonction d'estimation (3)). Une partie des propriétés de convergence se démontre directement pour les Z-estimateurs (LGN, TCL) — suite du cours.
**Pièges / erreurs classiques :** noter que l'espérance est prise **sous $\theta$ en $\theta$** (même valeur) ; la définition dit « tout estimateur » : pas d'unicité requise.

### Exemple 1.6 — Modèle de translation : moyenne empirique et médiane empirique
**Source :** Poly ch.2, Exemple 1.6, p. 14–15
**Hypothèses :** $f$ densité de probabilité sur $\mathbb{R}$ (par rapport à $\mathrm{Leb}$) **paire** : $f(x)=f(-x)$. $(X_1,\dots,X_n)$ $n$-échantillon du modèle de translation
$$\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{q_\theta\cdot\mathrm{Leb},\ \theta\in\Theta=\mathbb{R}\}\big),\qquad q_\theta(x):=f(x-\theta),$$
p. ex. $f(x)=(2\pi)^{-1/2}\mathrm{e}^{-x^2/2}$.
**Énoncé :**
1. *Moyenne empirique.* Si $\int_{\mathbb{R}}\lvert x\rvert f(x)\,\mathrm{d}x<\infty$ et $\psi(\theta,x)=x-\theta$ :
$$\mathbb{E}_\theta[X_1-\theta]=\int_{\mathbb{R}}(x-\theta)f(x-\theta)\,\mathrm{d}x=\int_{\mathbb{R}}zf(z)\,\mathrm{d}z=0.$$
L'équation $n^{-1}\sum_{i=1}^n(X_i-\vartheta)=0$ a pour unique solution $\hat\theta_n=\bar X_n$ : Z-estimateur associé à $\psi$, et aussi estimateur des moments associé à $T(x)=x$ (car $\mathbb{E}_\theta[X_1]=\theta$).
2. *Médiane empirique.* $\psi(\theta,x)=\mathrm{signe}(x-\theta)$. Aucune hypothèse de moment (fonction bornée) et
$$\mathbb{E}_\theta[\mathrm{signe}(X_1-\theta)]=\int_{\mathbb{R}}\mathrm{signe}(z)f(z)\,\mathrm{d}z=\int_0^{+\infty}f(z)\,\mathrm{d}z-\int_{-\infty}^0f(z)\,\mathrm{d}z=0.$$
Avec les statistiques d'ordre $X_{1:n}\le\dots\le X_{n:n}$ : pour $\vartheta$ distinct des observations, $\sum_{i=1}^n\mathrm{signe}(X_i-\vartheta)$ = (nb d'observations $>\vartheta$) − (nb d'observations $<\vartheta$). Observations deux à deux distinctes $\mathbb{P}_\theta$-p.s. (loi à densité). Si $n=2m+1$, l'équation $\sum_i\mathrm{signe}(X_i-\vartheta)=0$ a pour **unique** solution $\vartheta=X_{m+1:n}$ (médiane empirique) ; si $n=2m$, ses solutions sont **tous les points de $]X_{m:n},X_{m+1:n}[$**, dont la médiane empirique $\frac12(X_{m:n}+X_{m+1:n})$. Dans les deux cas, $\mathrm{med}(X_1,\dots,X_n)$ est un Z-estimateur associé à $\psi$.

**Conclusion :** la moyenne empirique est un estimateur des moments ; la médiane empirique est un Z-estimateur **qui n'est pas un estimateur des moments** : $(\theta,x)\mapsto\mathrm{signe}(x-\theta)$ ne s'écrit pas $T(x)-\mathbb{E}_\theta[T(X_1)]$.
**Preuve (étapes) :** 1. Changement de variable $z=x-\theta$ (invariance de $\mathrm{Leb}$ par translation). 2. **Parité de $f$** : $\int zf(z)\,\mathrm{d}z=0$ (fonction impaire intégrable) et $\int_0^\infty f=\int_{-\infty}^0f=\frac12$. 3. Comptage des signes ; la fonction $\vartheta\mapsto\sum_i\mathrm{signe}(X_i-\vartheta)$ décroît par sauts de 2 en chaque observation (passant par la valeur intermédiaire au point d'observation). 4. Cas $n$ impair/pair.
**Méthodes mobilisées :** Z-estimation, changement de variables, parité, statistiques d'ordre.
**Intuition :** une fonction d'estimation bornée ne demande aucun moment (robustesse).
**Pièges / erreurs classiques :** pour $n$ pair, le Z-estimateur n'est pas unique (intervalle ouvert ici ; intervalle **fermé** pour l'EMV de Laplace, Ex. 1.13).

### Remarque — Intuitions du maximum de vraisemblance (deux exemples)
**Source :** Poly ch.2, §1.3, encadrés « Intuition », p. 15
**Hypothèses :** (a) modèle gaussien $\{\mathcal{N}(\mu,1)^{\otimes n},\ \mu\in\mathbb{R}\}$ pour des tailles en cm : 180, 170, 155, 172, 183, 194, 164… ; (b) modèle uniforme $\{\mathcal{U}([0,\theta])^{\otimes n},\ \theta\in\mathbb{R}_+^\ast\}$, observations 8, 7, 11, 17, 2, 5, 14…
**Énoncé :**
(a) Est-il vraisemblable que $\mu=10$ ? $\mu=200$ ? Sous $\mathcal{N}(10,1)$, 170 est à 160 écarts-types, densité $(2\pi)^{-1/2}\mathrm{e}^{-12\,800}$ : possible au sens strict, mais si peu vraisemblable qu'on ne le retiendrait pas. Avec une observation, $\mu\mapsto(2\pi)^{-1/2}\exp(-(X_1-\mu)^2/2)$ est maximale en $\mu=X_1$. Avec plusieurs observations indépendantes, la densité du vecteur est $\prod_{i=1}^n(2\pi)^{-1/2}\exp(-(X_i-\mu)^2/2)$, maximale lorsque $\sum_{i=1}^n(X_i-\mu)^2$ est minimal, i.e. en $\mu=\bar X_n$ (calcul de l'Ex. 1.10).
(b) $\theta=5$ est **impossible** (une observation vaut $17>5$, densité $\theta^{-1}\mathbb{1}_{[0,\theta]}(17)=0$). $\theta=100$ est possible mais donne la densité $100^{-n}$. $\theta=17$ (plus grande observation) donne $17^{-n}$, la plus grande : toute valeur $<17$ annule la densité, toute valeur $>17$ la diminue. Une seule observation renseigne déjà ($\theta\ge$ observation).
**Preuve (étapes) :** calculs directs de densités.
**Intuition :** dans les deux cas, on ne regarde que la **densité des observations vue comme fonction du paramètre** : c'est la vraisemblance.

### Définition 1.4 — Vraisemblance et estimateur du maximum de vraisemblance
**Source :** Poly ch.2, Définition 1.4, p. 15–16
**Hypothèses :** $(\mathsf{X},\mathcal{X})$ espace mesurable, $\mu$ mesure $\sigma$-finie sur $(\mathsf{X},\mathcal{X})$, $(X_1,\dots,X_n)$ $n$-échantillon du **modèle dominé** $(\mathsf{X},\mathcal{X},\{q_\theta\cdot\mu,\ \theta\in\Theta\})$, où $q_\theta$ est la densité de $\mathbb{Q}_\theta$ par rapport à $\mu$.
**Énoncé :** On appelle **fonction de vraisemblance** (ou vraisemblance) associée au $n$-échantillon l'application
$$\vartheta\in\Theta\mapsto\mathrm{L}_n(\vartheta,X_1,\dots,X_n):=\prod_{i=1}^nq_\vartheta(X_i).$$
On appelle **estimateur du maximum de vraisemblance** tout estimateur $\hat\theta_n^{\mathrm{MV}}$ vérifiant
$$\mathrm{L}_n(\hat\theta_n^{\mathrm{MV}},X_1,\dots,X_n)=\max_{\vartheta\in\Theta}\mathrm{L}_n(\vartheta,X_1,\dots,X_n),\quad\text{i.e.}\quad\hat\theta_n^{\mathrm{MV}}\in\operatorname*{arg\,max}_{\vartheta\in\Theta}\mathrm{L}_n(\vartheta,X_1,\dots,X_n).$$
Quand il n'y a pas de confusion, on note $\mathrm{L}_n(\vartheta)$.
**Preuve (étapes) :** sans objet.
**Intuition :** la vraisemblance est la densité du $n$-échantillon (produit des densités, ch. 1 Section 1.7), évaluée aux observations, vue comme fonction du paramètre.
**Remarques (p. 16) :**
- $\vartheta$ parcourt $\Theta$ : paramètre **libre**, distinct de la valeur inconnue sous laquelle les observations ont été tirées (explicité au §1.4).
- La vraisemblance **dépend de la mesure dominante $\mu$**, mais deux mesures dominantes donnent des densités qui diffèrent d'un **facteur multiplicatif indépendant du paramètre** (ch. 1, Section 2) : **les points de maximum, donc l'estimateur, n'en dépendent pas**.
- *Note 2 (experte, hors programme) :* pour des versions **fixées** des densités. Une densité n'est définie qu'à un négligeable près ; en modifiant chaque densité sur un négligeable dépendant du paramètre, on peut déplacer les maxima au point de faire perdre la consistance à l'EMV dans un modèle gaussien (Baraud & Birgé, *Annals of Statistics*, 2018, prop. 1) ; les versions continues utilisées dans le cours écartent la difficulté.
**Pièges / erreurs classiques :** l'EMV n'est pas forcément unique (« tout estimateur ») ni forcément existant ; la vraisemblance n'est **pas** une densité en $\vartheta$.

### Définition 1.5 — Log-vraisemblance normalisée
**Source :** Poly ch.2, Définition 1.5, p. 16
**Hypothèses :** celles de la Définition 1.4.
**Énoncé :** La **log-vraisemblance normalisée** est l'application
$$\vartheta\in\Theta\mapsto\ell_n(\vartheta,X_1,\dots,X_n):=\frac1n\log\mathrm{L}_n(\vartheta,X_1,\dots,X_n)=\frac1n\sum_{i=1}^n\log q_\vartheta(X_i),$$
avec la convention $\log0=-\infty$.
**Remarque (p. 16) :** $\log$ = logarithme **népérien** ; on écrit $\log$ plutôt que $\ln$ pour ne pas confondre avec $\mathrm{L}_n$ et $\ell_n$.
**Conséquence :** le logarithme étant strictement croissant sur $\mathbb{R}_+^\ast$ (et la convention $\log0=-\infty$ prolongeant cette monotonie à $\mathbb{R}_+$), $\mathrm{L}_n$ et $\ell_n$ ont les **mêmes points de maximum** :
$$\hat\theta_n^{\mathrm{MV}}\in\operatorname*{arg\,max}_{\vartheta\in\Theta}\ell_n(\vartheta,X_1,\dots,X_n).$$
**Preuve (étapes) :** 1. $\log$ strictement croissante ⇒ $\mathrm{L}_n(\vartheta)\le\mathrm{L}_n(\vartheta')\iff\ell_n(\vartheta)\le\ell_n(\vartheta')$ (division par $n>0$ conserve l'ordre). 2. Log d'un produit = somme des logs.
**Intuition :** le log transforme le produit en somme (calculs plus simples) ; la normalisation par $n$ fait de $\ell_n$ une **moyenne empirique**, ce qui sert à comprendre le comportement quand $n$ augmente (§1.4).

### Exemple 1.7 — Modèle exponentiel (EMV)
**Source :** Poly ch.2, Exemple 1.7, p. 17
**Hypothèses :** $n$-échantillon de $\big(\mathbb{R}_+,\mathcal{B}(\mathbb{R}_+),\{\mathcal{E}(\theta),\ \theta\in\Theta=\mathbb{R}_+^\ast\}\big)$, densité $q_\theta(x)=\theta\mathrm{e}^{-\theta x}\mathbb{1}_{\mathbb{R}_+}(x)$.
**Énoncé :** Les observations étant positives, pour tout $\vartheta>0$,
$$\mathrm{L}_n(\vartheta)=\prod_{i=1}^n\vartheta\mathrm{e}^{-\vartheta X_i}=\vartheta^n\exp\Big(-\vartheta\sum_{i=1}^nX_i\Big)>0,\qquad\ell_n(\vartheta)=\log\vartheta-\vartheta\bar X_n.$$
$\ell_n$ est dérivable sur $\mathbb{R}_+^\ast$, $\ell_n'(\vartheta)=1/\vartheta-\bar X_n$, $\ell_n''(\vartheta)=-1/\vartheta^2<0$ : **strictement concave**. Dès que $\bar X_n>0$ ($\mathbb{P}_\theta$-p.s.), unique point critique $\vartheta=1/\bar X_n$, maximum global. Ainsi
$$\hat\theta_n^{\mathrm{MV}}=\frac1{\bar X_n}=\hat\theta_{n,1}:$$
l'EMV coïncide avec le premier estimateur des moments de l'Exemple 1.4.
**Preuve (étapes) :** 1. Produit des densités (indépendance ⇒ densité produit). 2. Passage au log et division par $n$. 3. Dérivée $\ell_n'$ strictement décroissante, nulle en $1/\bar X_n$ ⇒ $>0$ avant, $<0$ après ⇒ $\ell_n$ croît puis décroît ⇒ maximum global unique (cf. Lemme 2.3).
**Méthodes mobilisées :** calcul d'EMV par annulation du score (dérivée de $\ell_n$) + vérification par concavité.
**Intuition :** l'intensité estimée est l'inverse de la durée moyenne.

### Exemple 1.8 — Modèle de Bernoulli (EMV)
**Source :** Poly ch.2, Exemple 1.8, p. 17
**Hypothèses :** $n$-échantillon de $\big(\{0,1\},\mathcal{P}(\{0,1\}),\{\mathcal{B}\mathrm{er}(p),\ p\in\Theta=[0,1]\}\big)$, dominé par la mesure de comptage sur $\{0,1\}$, densité $q_p(x)=p^x(1-p)^{1-x}$ avec $0^0=1$. On note $S_n:=\sum_{i=1}^nX_i=n\bar X_n$.
**Énoncé :** Pour $\vartheta\in[0,1]$,
$$\mathrm{L}_n(\vartheta)=\prod_{i=1}^n\vartheta^{X_i}(1-\vartheta)^{1-X_i}=\vartheta^{S_n}(1-\vartheta)^{n-S_n}.$$
Trois cas :
- $S_n=0$ : $\mathrm{L}_n(\vartheta)=(1-\vartheta)^n$ strictement décroissante, maximum en $\vartheta=0$ seulement ;
- $S_n=n$ : $\mathrm{L}_n(\vartheta)=\vartheta^n$, maximum en $\vartheta=1$ seulement ;
- $0<S_n<n$ : $\mathrm{L}_n(0)=\mathrm{L}_n(1)=0$ et $\mathrm{L}_n>0$ sur $]0,1[$, où
$$\ell_n(\vartheta)=\bar X_n\log\vartheta+(1-\bar X_n)\log(1-\vartheta),\quad\ell_n'(\vartheta)=\frac{\bar X_n}\vartheta-\frac{1-\bar X_n}{1-\vartheta},\quad\ell_n''(\vartheta)=-\frac{\bar X_n}{\vartheta^2}-\frac{1-\bar X_n}{(1-\vartheta)^2}<0.$$
$\ell_n$ strictement concave sur $]0,1[$, unique point critique $\vartheta=\bar X_n$, maximum global.

Dans les trois cas, l'EMV **existe, est unique** et vaut
$$\hat\theta_n^{\mathrm{MV}}=\bar X_n,$$
qui est aussi l'estimateur des moments associé à $T(x)=x$. (Comportement de la log-vraisemblance quand $n$ augmente : compléments, Ex. 4.4.)
**Preuve (étapes) :** 1. Densité produit. 2. Disjonction de cas selon $S_n$ (bords de $\Theta$ fermé). 3. Cas intérieur : concavité stricte + point critique ⇒ maximum global (Lemme 2.3).
**Méthodes mobilisées :** EMV par annulation du score, étude des cas au bord, concavité.
**Pièges / erreurs classiques :** oublier les cas $S_n\in\{0,n\}$ où le log n'est pas défini / le maximum est au bord.

### Exemple 1.9 — Loi de Poisson : à vous
**Source :** Poly ch.2, Exemple 1.9, p. 17–18
**Hypothèses :** $\theta\in\Theta=\mathbb{R}_+^\ast$ ; loi de Poisson de densité par rapport à la mesure de comptage $\mu$ sur $\mathbb{N}$ : $q_\theta(x)=\mathrm{e}^{-\theta}\dfrac{\theta^x}{x!}$, $x\in\mathbb{N}$ ; $(X_1,\dots,X_n)$ $n$-échantillon.
**Énoncé :** (Exercice proposé : écrire la vraisemblance, passer à $\ell_n$, isoler les termes dépendant du paramètre, étudier la fonction ; la version en ligne propose 3 niveaux : Poisson, uniforme, Pareto.) Pour $\vartheta>0$,
$$\mathrm{L}_n(\vartheta)=\prod_{i=1}^n\mathrm{e}^{-\vartheta}\frac{\vartheta^{X_i}}{X_i!}=\frac1{\prod_{i=1}^nX_i!}\exp\big(-n\vartheta+n\bar X_n\log\vartheta\big),\qquad\ell_n(\vartheta)=-\frac1n\log\Big(\prod_{i=1}^nX_i!\Big)-\vartheta+\bar X_n\log\vartheta.$$
La fonction à maximiser est $\vartheta\mapsto-\vartheta+\bar X_n\log\vartheta$. Si $\bar X_n>0$ : strictement concave sur $\mathbb{R}_+^\ast$, dérivée $-1+\bar X_n/\vartheta$ nulle en $\vartheta=\bar X_n$ seulement :
$$\hat\theta_n^{\mathrm{MV}}=\bar X_n=n^{-1}\sum_{i=1}^nX_i.$$
Si $\bar X_n=0$ (toutes observations nulles, probabilité $\mathrm{e}^{-n\theta}>0$), $\vartheta\mapsto-\vartheta$ n'a **pas de maximum** sur $\mathbb{R}_+^\ast$ : l'EMV **n'est pas défini**.
**Preuve (étapes) :** 1. Densité produit. 2. Le terme $-\frac1n\log\prod X_i!$ ne dépend pas de $\vartheta$ (ne change pas l'argmax). 3. Concavité stricte ($-\bar X_n/\vartheta^2<0$) + point critique. 4. Cas $\bar X_n=0$ : fonction strictement décroissante sur un ouvert, borne sup non atteinte.
**Méthodes mobilisées :** EMV par annulation du score ; élimination des termes constants.
**Remarque (p. 18) :** sur les modèles de Bernoulli et de Poisson, l'EMV coïncide (lorsqu'il est défini) avec l'estimateur des moments associé à $T(x)=x$, puisque le paramètre est l'espérance d'une observation : phénomène typique des **familles exponentielles** (Exercice 3, PC2).

### Définition 1.6 — Équations de vraisemblance
**Source :** Poly ch.2, Définition 1.6, p. 18
**Hypothèses :** $\Theta\subseteq\mathbb{R}^d$ ; $\vartheta\mapsto\ell_n(\vartheta,X_1,\dots,X_n)$ différentiable sur l'intérieur de $\Theta$.
**Énoncé :** Le système de $d$ équations
$$\nabla_\vartheta\,\ell_n(\vartheta,X_1,\dots,X_n)=0,\qquad\vartheta\in\mathring\Theta,$$
est appelé **équation de vraisemblance** si $d=1$ et **système d'équations de vraisemblance** si $d>1$. Tout estimateur $\hat\theta_n^{\mathrm{rv}}$ solution est appelé **racine de l'équation de vraisemblance**.
**Preuve (étapes) / commentaires (p. 18–19) :**
1. Si le maximum de $\ell_n$ (ou de $\mathrm{L}_n$) est atteint en un **point intérieur** de $\Theta$ où $\ell_n$ est différentiable, l'EMV est une racine (en un maximum intérieur, le gradient s'annule — condition du premier ordre).
2. Là où $\mathrm{L}_n>0$, $\mathrm{L}_n$ et $\ell_n$ ont les mêmes points critiques : $\nabla\ell_n=\nabla\mathrm{L}_n/(n\mathrm{L}_n)$ (dérivation de $\log$).
3. **La réciproque est fausse** : le système fournit tous les points critiques (maxima et minima locaux) ; une racine n'est pas nécessairement un maximum global.
4. L'EMV s'obtient donc soit par optimisation, soit en résolvant un système (souvent non linéaire) **puis en vérifiant** que la solution est un maximum. Hors modèles simples (Poisson), pas de forme explicite (Cauchy, compléments Ex. 4.6).
**Intuition :** condition nécessaire du premier ordre, pas suffisante.
**Pièges / erreurs classiques :** « toute racine de l'équation de vraisemblance est un EMV » est **faux** ; l'équation n'a pas de sens si le maximum est au bord ou si $\ell_n$ n'est pas dérivable (uniforme).

### Exemple 1.10 — Moyenne et variance d'une gaussienne
**Source :** Poly ch.2, Exemple 1.10, p. 19
**Hypothèses :** $(X_1,\dots,X_n)$, $n\ge2$, $n$-échantillon du modèle gaussien $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{N}(\mu,\sigma^2),\ (\mu,\sigma^2)\in\Theta=\mathbb{R}\times\mathbb{R}_+^\ast\}\big)$, densité $q_{(\mu,\sigma^2)}(x)=(2\pi\sigma^2)^{-1/2}\exp\Big(-\dfrac{(x-\mu)^2}{2\sigma^2}\Big)$.
**Énoncé :** Pour $\vartheta=(m,v)\in\mathbb{R}\times\mathbb{R}_+^\ast$,
$$\ell_n\big((m,v),X_1,\dots,X_n\big)=-\frac12\log(2\pi v)-\frac1{2nv}\sum_{i=1}^n(X_i-m)^2,$$
et les équations de vraisemblance sont
$$\begin{cases}\dfrac{\partial\ell_n}{\partial m}\big((m,v),X_1,\dots,X_n\big)=\dfrac1{nv}\displaystyle\sum_{i=1}^n(X_i-m)=0,\\[2mm]\dfrac{\partial\ell_n}{\partial v}\big((m,v),X_1,\dots,X_n\big)=-\dfrac1{2v}+\dfrac1{2nv^2}\displaystyle\sum_{i=1}^n(X_i-m)^2=0.\end{cases}$$
Unique solution $m=\bar X_n$, $v=n^{-1}\sum_{i=1}^n(X_i-\bar X_n)^2$, dès que les observations ne sont pas toutes égales ($\mathbb{P}_\theta$-p.s. pour $n\ge2$). C'est le **maximum global**, et
$$\hat\theta_n^{\mathrm{MV}}=\Big(\bar X_n,\ \frac1n\sum_{i=1}^n(X_i-\bar X_n)^2\Big).$$
**Preuve (étapes) — maximisation en deux temps :**
1. À $v$ fixé, $m\mapsto\ell_n((m,v))$ est quadratique strictement concave, maximale en $m=\bar X_n$ (minimisation de $\sum_i(X_i-m)^2$).
2. On reporte : $v\mapsto\ell_n((\bar X_n,v))=-\frac12\log(2\pi v)-\frac S{2v}$ avec $S:=n^{-1}\sum_{i=1}^n(X_i-\bar X_n)^2>0$ ; dérivée $(S-v)/(2v^2)$, $>0$ pour $v<S$, $<0$ pour $v>S$ : maximum en $v=S$ seulement.
3. Pour tout $(m,v)$ : $\ell_n((m,v))\le\ell_n((\bar X_n,v))\le\ell_n((\bar X_n,S))$, avec égalité ssi $(m,v)=(\bar X_n,S)$ ⇒ existence et unicité.
4. $S>0$ p.s. : loi à densité ⇒ $X_1\ne X_2$ p.s.
**Méthodes mobilisées :** système d'équations de vraisemblance, maximisation en deux temps (profil), étude de signe de la dérivée.
**Remarque (p. 19) :** l'EMV de $\sigma^2$ est la variance empirique **non corrigée** $n^{-1}\sum_{i=1}^n(X_i-\bar X_n)^2=\frac{n-1}nS_n^2$, et non la variance corrigée $S_n^2$ du théorème de Gosset (ch. 1, Section 1.5) ; d'après ce théorème, $\mathbb{E}_\theta[\hat\sigma^2_{\mathrm{MV}}]=\frac{n-1}n\sigma^2$ : **l'EMV est biaisé**. La régression linéaire gaussienne (Exercice 1) conduit au même calcul avec $n-2$ au lieu de $n-1$.
**Pièges / erreurs classiques :** dériver par rapport à $\sigma$ au lieu de $v=\sigma^2$ (possible, mais c'est alors l'autre paramétrisation — cf. Prop. 1.2) ; oublier de vérifier le maximum global ; confondre $S_n^2$ et $\hat\sigma^2_{\mathrm{MV}}$.

### Exemple 1.11 — Modèle uniforme : une vraisemblance non dérivable
**Source :** Poly ch.2, Exemple 1.11, p. 19–20
**Hypothèses :** $n$-échantillon de $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathcal{U}([0,\theta]),\ \theta\in\Theta=\mathbb{R}_+^\ast\}\big)$, densité $q_\theta(x)=\frac1\theta\mathbb{1}_{[0,\theta]}(x)$.
**Énoncé :** Les observations étant positives p.s., « $X_i\in[0,\vartheta]$ pour tout $i$ » équivaut à $X_{n:n}\le\vartheta$, où $X_{n:n}=\max_{1\le i\le n}X_i$. Donc
$$\mathrm{L}_n(\vartheta)=\frac1{\vartheta^n}\prod_{i=1}^n\mathbb{1}_{[0,\vartheta]}(X_i)=\vartheta^{-n}\mathbb{1}_{[0,\vartheta]}(X_{n:n})=\vartheta^{-n}\mathbb{1}_{[X_{n:n},+\infty[}(\vartheta).$$
Nulle pour $\vartheta<X_{n:n}$, strictement décroissante sur $[X_{n:n},+\infty[$ : maximum $X_{n:n}^{-n}$ atteint en $\vartheta=X_{n:n}$ seulement,
$$\hat\theta_n^{\mathrm{MV}}=X_{n:n}.$$
$\mathrm{L}_n$ n'est **pas dérivable** en $X_{n:n}$ et $\ell_n=-\infty$ sur $]0,X_{n:n}[$ : **l'équation de vraisemblance n'a pas de sens**, le maximum se détermine directement.
*Figure (p. 20) :* $\vartheta\mapsto\mathrm{L}_n(\vartheta)$ pour $n=5$ et $n=10$ : saut en $X_{n:n}$ puis décroissance en $\vartheta^{-n}$, d'autant plus rapide que $n$ est grand. *Animation :* comparer le saut de la vraisemblance uniforme en $X_{n:n}$ au pic lisse de la vraisemblance exponentielle en $\bar Y_n$ quand $n$ augmente.
**Preuve (étapes) :** 1. Produit d'indicatrices = indicatrice de l'intersection. 2. Étude directe : $0$ à gauche, $\vartheta^{-n}$ décroissante à droite.
**Méthodes mobilisées :** EMV par étude directe de la fonction (cas non régulier, Méthode 1.2 cas 2), statistique d'ordre.
**Intuition :** toute valeur $<X_{n:n}$ est impossible, toute valeur $>X_{n:n}$ dilue la densité.
**Pièges / erreurs classiques :** dériver $\vartheta^{-n}$ et conclure qu'il n'y a pas de point critique donc pas de maximum ; oublier l'indicatrice.

### Méthode 1.2 — Explicitation de l'estimateur du maximum de vraisemblance
**Source :** Poly ch.2, Méthode 1.2, p. 21
**Hypothèses :** modèle dominé ; lorsque c'est possible.
**Énoncé :**
1. Écrire la densité $q_\vartheta$ par rapport à la mesure dominante, puis $\mathrm{L}_n(\vartheta)=\prod_{i=1}^nq_\vartheta(X_i)$.
2. **Cas 1, modèles « réguliers »** (gaussien, Poisson, exponentiel, Gamma, Bernoulli) : la vraisemblance est strictement positive et dérivable sur l'intérieur de $\Theta$.
   a. Écrire $\ell_n(\vartheta)=n^{-1}\log\mathrm{L}_n(\vartheta)$.
   b. Trouver les points critiques (résoudre les équations de vraisemblance ; un système si $d>1$).
   c. Vérifier que le point critique retenu est un **maximum global** (par concavité, ou étude directe), et **traiter les valeurs des observations pour lesquelles il n'y a pas de point critique**.
3. **Cas 2, modèles non réguliers** (uniforme, par exemple) : la vraisemblance n'est pas dérivable, ou s'annule sur une partie de $\Theta$. Déterminer le maximum **directement**, par une étude de la fonction ; **ne pas essayer de différencier**.

Exemples 1.7 à 1.10 : cas 1 ; Exemple 1.11 : cas 2.
**Preuve (étapes) :** sans objet (procédure).
**Intuition :** recette d'examen.
**Pièges / erreurs classiques :** sauter l'étape 2c.

### Exemple 1.12 — L'estimateur du maximum de vraisemblance n'est pas toujours défini
**Source :** Poly ch.2, Exemple 1.12, p. 21
**Hypothèses :** $q_0$ densité par rapport à $\mathrm{Leb}$ définie par
$$q_0(x)=\frac{\mathrm{e}^{-|x|/2}}{2\sqrt{2\pi|x|}},\qquad x\in\mathbb{R}\setminus\{0\},$$
prolongée par $0$ en $x=0$ ; $(X_1,\dots,X_n)$ $n$-échantillon du modèle de translation $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{q_0(\cdot-\theta)\cdot\mathrm{Leb},\ \theta\in\Theta=\mathbb{R}\}\big)$.
**Énoncé :** $q_0$ est une densité : $\int_{\mathbb{R}}q_0\,\mathrm{dLeb}=\int_0^{+\infty}(2\pi x)^{-1/2}\mathrm{e}^{-x/2}\,\mathrm{d}x=1$ (intégrale de la densité $\chi^2(1)$). La vraisemblance $\mathrm{L}_n(\vartheta)=\prod_{i=1}^nq_0(X_i-\vartheta)$ vérifie $\lim_{\vartheta\to X_i}\mathrm{L}_n(\vartheta)=+\infty$ pour tout $i$ : elle **n'est pas majorée**, $\operatorname*{arg\,max}_{\vartheta\in\Theta}\mathrm{L}_n(\vartheta)=\emptyset$, et **l'EMV n'est pas défini** pour ce modèle.
**Preuve (étapes) :** 1. Parité ⇒ $\int_{\mathbb{R}}q_0=2\int_0^\infty\frac{\mathrm{e}^{-x/2}}{2\sqrt{2\pi x}}\mathrm{d}x=\int_0^\infty(2\pi x)^{-1/2}\mathrm{e}^{-x/2}\mathrm{d}x=1$ (densité $\chi^2(1)$). 2. Observations deux à deux distinctes $\mathbb{P}_\theta$-p.s. (loi à densité). 3. Quand $\vartheta\to X_i$ : $q_0(X_i-\vartheta)\to+\infty$ (singularité en $|x|^{-1/2}$) tandis que les autres facteurs $\to q_0(X_j-X_i)\in]0,+\infty[$ (continuité de $q_0$ hors de 0) ⇒ produit $\to+\infty$.
**Méthodes mobilisées :** étude directe de la vraisemblance, contre-exemple.
**Intuition :** une densité non bornée permet de « coller » le paramètre sur une observation.
**Pièges / erreurs classiques :** croire que l'EMV existe toujours.

### Exemple 1.13 — Modèle de Laplace : non-unicité du maximum de vraisemblance
**Source :** Poly ch.2, Exemple 1.13, p. 21–22
**Hypothèses :** $n$-échantillon du modèle de Laplace $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{q_\theta\cdot\mathrm{Leb},\ \theta\in\Theta=\mathbb{R}\}\big)$, $q_\theta(x)=\frac12\exp(-|x-\theta|)$.
**Énoncé :**
$$\ell_n(\vartheta)=-\log2-\frac1n\sum_{i=1}^n|X_i-\vartheta|,$$
maximiser $\ell_n$ revient à minimiser $\varphi:\vartheta\mapsto\sum_{i=1}^n|X_i-\vartheta|$, continue, convexe, affine par morceaux, dérivable hors des observations avec
$$\varphi'(\vartheta)=-\sum_{i=1}^n\mathrm{signe}(X_i-\vartheta),$$
constante par morceaux : pour $\vartheta\in]X_{k:n},X_{k+1:n}[$, $\varphi'(\vartheta)=k-(n-k)=2k-n$, $<0$ si $k<n/2$, $>0$ si $k>n/2$.
- $n=2m+1$ impair : $\varphi$ décroît strictement sur $]-\infty,X_{m+1:n}]$, croît strictement sur $[X_{m+1:n},+\infty[$ : minimum unique, $\hat\theta_n^{\mathrm{MV}}=X_{m+1:n}$, la médiane empirique.
- $n=2m$ pair : $\varphi$ décroît strictement sur $]-\infty,X_{m:n}]$, est **constante** sur $[X_{m:n},X_{m+1:n}]$ (dérivée $2m-n=0$), croît strictement sur $[X_{m+1:n},+\infty[$ : **infinité de solutions**, tout point de l'intervalle **fermé** $[X_{m:n},X_{m+1:n}]$ est un EMV ; la médiane $\frac12(X_{m:n}+X_{m+1:n})$ en est un parmi d'autres.

*Figure (p. 22) :* $\vartheta\mapsto\sum_i|X_i-\vartheta|$ pour un échantillon de Laplace, $\theta=1$, $n=50$ (plateau) et $n=51$ (minimiseur unique). *Animation (p. 23) :* plateau pour $n$ pair, point unique pour $n$ impair.
**Preuve (étapes) :** 1. Log de la densité produit. 2. Dérivée de $|X_i-\vartheta|$ en $\vartheta$ : $-\mathrm{signe}(X_i-\vartheta)$ hors de $X_i$. 3. Comptage : sur $]X_{k:n},X_{k+1:n}[$, $k$ observations $<\vartheta$ (contribuent $+1$) et $n-k$ observations $>\vartheta$ (contribuent $-1$). 4. Fonction continue + signe de la dérivée par morceaux ⇒ monotonie par morceaux.
**Méthodes mobilisées :** EMV par étude directe (fonction convexe affine par morceaux), statistiques d'ordre.
**Intuition :** la médiane minimise la somme des écarts absolus.
**Pièges / erreurs classiques :** intervalle **fermé** ici (EMV) vs intervalle **ouvert** $]X_{m:n},X_{m+1:n}[$ pour le Z-estimateur (Ex. 1.6), (le poly énonce les deux intervalles tels quels ; vérification directe [ajout extracteur] : pour $n=2m$, $\sum_i\mathrm{signe}(X_i-X_{m:n})=m-(m-1)=1\neq0$, donc les extrémités ne sont pas des zéros de $\Psi_n$, alors qu'elles minimisent bien $\varphi$ par continuité).

### Proposition 1.2 — Invariance par reparamétrisation
**Source :** Poly ch.2, Proposition 1.2, p. 23
**Hypothèses :** $\{\mathbb{P}_\theta,\ \theta\in\Theta\}$ modèle paramétrique dominé ; $G:\Theta\to\Xi:=G(\Theta)$ bijection de $\Theta$ sur son image ; modèle reparamétré $\{\mathbb{Q}_\xi,\ \xi\in\Xi\}$, $\mathbb{Q}_\xi:=\mathbb{P}_{G^{-1}(\xi)}$.
**Énoncé :** Si $\hat\theta_n^{\mathrm{MV}}$ est un EMV pour $\{\mathbb{P}_\theta,\ \theta\in\Theta\}$, alors $\hat\xi_n:=G(\hat\theta_n^{\mathrm{MV}})$ est un EMV pour $\{\mathbb{Q}_\xi,\ \xi\in\Xi\}$. De plus, l'ensemble des EMV du modèle reparamétré est **l'image par $G$** de celui du modèle initial.
**Preuve (étapes) :**
1. Notons $\widetilde{\mathrm{L}}_n$ la vraisemblance du modèle reparamétré. Pour $\xi\in\Xi$, $\mathbb{Q}_\xi$ a pour densité celle de $\mathbb{P}_{G^{-1}(\xi)}$ (définition de $\mathbb{Q}_\xi$), donc $\widetilde{\mathrm{L}}_n(\xi,X_1,\dots,X_n)=\mathrm{L}_n(G^{-1}(\xi),X_1,\dots,X_n)$.
2. Pour tout $\xi$, avec $\vartheta=G^{-1}(\xi)\in\Theta$ :
$$\widetilde{\mathrm{L}}_n(\xi,X_1,\dots,X_n)=\mathrm{L}_n(\vartheta,X_1,\dots,X_n)\le\mathrm{L}_n(\hat\theta_n^{\mathrm{MV}},X_1,\dots,X_n)=\widetilde{\mathrm{L}}_n\big(G(\hat\theta_n^{\mathrm{MV}}),X_1,\dots,X_n\big)$$
(inégalité : définition de l'EMV) ⇒ $G(\hat\theta_n^{\mathrm{MV}})$ maximise $\widetilde{\mathrm{L}}_n$.
3. La même chaîne lue dans l'autre sens à l'aide de $G^{-1}$ montre que tout maximum de $\widetilde{\mathrm{L}}_n$ est l'image par $G$ d'un maximum de $\mathrm{L}_n$. □
**Intuition :** reparamétrer = renommer les lois ; le « meilleur » élément de la famille ne change pas.
**Pièges / erreurs classiques :** [ajout extracteur] cette invariance n'a **pas** d'équivalent pour le biais (ex. : $\hat\sigma_n$ et $\hat\sigma_n^2$ ne peuvent pas être tous deux sans biais) ; $G$ doit être une **bijection** (dans le poly).

### Exemple 1.14 — Reparamétrisations des modèles gaussien et exponentiel
**Source :** Poly ch.2, Exemple 1.14, p. 23
**Hypothèses :** (1) modèle gaussien, $n\ge2$ ; (2) modèle exponentiel.
**Énoncé :**
1. Paramétré par $\theta=(\mu,\sigma^2)\in\Theta=\mathbb{R}\times\mathbb{R}_+^\ast$, l'EMV est $(\hat\mu_n,\hat\sigma_n^2)=\big(\bar X_n,\ n^{-1}\sum_{i=1}^n(X_i-\bar X_n)^2\big)$ (Ex. 1.10). Paramétré par $\xi=(\mu,\sigma)\in\Xi=\mathbb{R}\times\mathbb{R}_+^\ast$, image par la bijection $G:(\mu,\sigma^2)\mapsto(\mu,\sqrt{\sigma^2})$ ; **sans nouveau calcul** :
$$\hat\mu_n=\bar X_n,\qquad\hat\sigma_n=\Big(\frac1n\sum_{i=1}^n(X_i-\bar X_n)^2\Big)^{1/2}.$$
2. Modèle exponentiel : EMV de l'intensité $\theta$ = $1/\bar X_n$ (Ex. 1.7). Paramétré par l'espérance $\tau=1/\theta\in\mathbb{R}_+^\ast$ (bijection $G:\theta\mapsto1/\theta$), l'EMV de $\tau$ est $\hat\tau_n=\bar X_n$.
**Preuve (étapes) :** application directe de la Prop. 1.2 ($G$ bijective de $\Theta$ sur $\Xi$).
**Méthodes mobilisées :** invariance de l'EMV par reparamétrisation.

### Remarque — §1.4 Comprendre le maximum de vraisemblance : deux paramètres à ne pas confondre
**Source :** Poly ch.2, §1.4, p. 23–24
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon du modèle dominé $(\mathsf{X},\mathcal{X},\{q_\theta\cdot\mu,\ \theta\in\Theta\})$.
**Énoncé :** Pourquoi maximiser la vraisemblance conduit-il vers la vraie valeur ? Deux faits : (1) $\ell_n$ est une moyenne empirique, donc converge vers une fonction limite ; (2) cette limite atteint son maximum au vrai paramètre (divergence de Kullback-Leibler). On distingue :
- $\theta^\star\in\Theta$ : paramètre **« hypothèse »**, valeur sous laquelle les observations sont tirées ; on travaille sous $\mathbb{P}_{\theta^\star}$ ;
- $\vartheta\in\Theta$ : paramètre **libre**, variable de $\mathrm{L}_n(\vartheta)$ par rapport à laquelle on maximise.

Les espérances sont prises sous $\mathbb{P}_{\theta^\star}$ (densité $q_{\theta^\star}$).
**La log-vraisemblance normalisée converge :** pour $\vartheta$ fixé, $\ell_n(\vartheta)=n^{-1}\sum_{i=1}^n\log q_\vartheta(X_i)$ est la moyenne de v.a. i.i.d. sous $\mathbb{P}_{\theta^\star}$ ; la LGN (si intégrables) donne la limite $\mathbb{E}_{\theta^\star}[\log q_\vartheta(X_1)]$. En écrivant $\log q_\vartheta=\log(q_\vartheta/q_{\theta^\star})+\log q_{\theta^\star}$, apparaît l'espérance sous $\mathbb{P}_{\theta^\star}$ du log d'un rapport de densités : au signe près, la divergence de Kullback-Leibler entre $\mathbb{Q}_{\theta^\star}$ et $\mathbb{Q}_\vartheta$.
**Preuve (étapes) :** sans objet (motivation).
**Intuition :** $\vartheta$ = « candidat », $\theta^\star$ = « vérité ».

### Définition 1.7 — Divergence de Kullback-Leibler
**Source :** Poly ch.2, Définition 1.7, p. 24
**Hypothèses :** $\mathbb{P}_0$, $\mathbb{P}_1$ deux probabilités sur $(\mathsf{X},\mathcal{X})$, de densités $f_0$, $f_1$ par rapport à une mesure $\sigma$-finie $\mu$.
**Énoncé :**
$$\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1):=\int_{\{x\in\mathsf{X}:\ f_0(x)>0\}}f_0(x)\log\frac{f_0(x)}{f_1(x)}\,\mu(\mathrm{d}x),$$
avec la convention $\log(1/0)=+\infty$.
**Remarques (p. 24) :**
- L'intégrale est **toujours bien définie**, à valeurs dans $]-\infty,+\infty]$ : la partie négative de l'intégrande est $\mu$-intégrable (démontré dans les compléments, §4) ; $\mathrm{KL}$ **ne dépend pas de $\mu$** (compléments, Th. 4.1 (iii)).
- Si $X\sim\mathbb{P}_0$, alors $f_0(X)>0$ p.s. et
$$\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)=\mathbb{E}\Big[\log\frac{f_0(X)}{f_1(X)}\Big].$$
- **Ce n'est pas une distance** : pas symétrique en $(\mathbb{P}_0,\mathbb{P}_1)$, pas d'inégalité triangulaire. Elle a cependant la propriété essentielle (Th. 1.1).
**Preuve (étapes) :** sans objet.
**Intuition :** mesure à quel point $\mathbb{P}_1$ explique mal des données tirées sous $\mathbb{P}_0$.
**Pièges / erreurs classiques :** intégrer sur tout $\mathsf{X}$ au lieu de $\{f_0>0\}$ ; croire à la symétrie.

### Théorème 1.1 — Positivité de la divergence de Kullback-Leibler
**Source :** Poly ch.2, Théorème 1.1, p. 24–25
**Hypothèses :** $\mathbb{P}_0$, $\mathbb{P}_1$ probabilités sur $(\mathsf{X},\mathcal{X})$, de densités $f_0$, $f_1$ par rapport à une mesure $\sigma$-finie $\mu$.
**Énoncé :** $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)\in[0,+\infty]$, et $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)=0$ si et seulement si $\mathbb{P}_0=\mathbb{P}_1$, c'est-à-dire si et seulement si $f_0=f_1$ $\mu$-presque partout.
**Preuve (étapes) :**
1. *Mise en place.* $A:=\{x\in\mathsf{X}:\ f_0(x)>0\}$ ; $\mathbb{P}_0(A)=\int_Af_0\,\mathrm{d}\mu=1$. Soit $X\sim\mathbb{P}_0$ : p.s. $X\in A$ ; on pose $Y:=f_1(X)/f_0(X)\in[0,+\infty[$. Par le **théorème de transfert**, $\mathbb{E}[Y]=\int_Af_1\,\mathrm{d}\mu=\mathbb{P}_1(A)\le1$ : $Y$ est intégrable, et par définition $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)=\int_Af_0\log(f_0/f_1)\,\mathrm{d}\mu=\mathbb{E}[-\log Y]$ (avec $-\log0=+\infty$).
2. *Premier cas : $\mathbb{P}(Y=0)>0$.* L'intégrande vaut $+\infty$ sur $\{f_0>0,\ f_1=0\}$, de $\mathbb{P}_0$-probabilité $\mathbb{P}(Y=0)>0$, donc de $\mu$-mesure $>0$. La partie négative étant $\mu$-intégrable, $\mathrm{KL}=+\infty$ : l'inégalité est vraie.
3. *Second cas : $\mathbb{P}(Y=0)=0$.* $Y$ est p.s. dans $]0,+\infty[$ où $-\log$ est **strictement convexe**, et $Y$ intégrable. **Inégalité de Jensen** (Théorème 2.2) :
$$\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)=\mathbb{E}[-\log Y]\ge-\log\mathbb{E}[Y]=-\log\mathbb{P}_1(A)\ge0,$$
la dernière inégalité car $\mathbb{P}_1(A)\le1$.
4. *Cas d'égalité, sens direct.* Si $\mathbb{P}_0=\mathbb{P}_1$, $f_0=f_1$ $\mu$-p.p. et $\mathrm{KL}=\int_Af_0\log1\,\mathrm{d}\mu=0$.
5. *Réciproque.* Si $\mathrm{KL}=0$, on est dans le second cas et les deux inégalités sont des égalités : (a) $\mathbb{P}_1(A)=1$ donc $\mathbb{E}[Y]=1$ ; (b) égalité dans Jensen avec $-\log$ strictement convexe ⇒ $Y$ p.s. constante égale à $\mathbb{E}[Y]=1$. Donc $f_1=f_0$ $\mathbb{P}_0$-p.s., i.e. $\mu$-p.p. sur $A$. Puis $\int_{A^c}f_1\,\mathrm{d}\mu=1-\int_Af_1\,\mathrm{d}\mu=1-\int_Af_0\,\mathrm{d}\mu=0$, donc $f_1=0=f_0$ $\mu$-p.p. sur $A^c$. Finalement $f_0=f_1$ $\mu$-p.p., et $\mathbb{P}_0=\mathbb{P}_1$. □
**Intuition :** Jensen appliqué à $-\log$ ; la « distance » est nulle seulement entre lois identiques.
**Pièges / erreurs classiques :** oublier le cas $\mathbb{P}(Y=0)>0$ (Jensen ne s'applique pas directement) ; oublier que $\mathbb{P}_1(A)$ peut être $<1$.

### Proposition 1.3 — Limite de la log-vraisemblance normalisée
**Source :** Poly ch.2, Proposition 1.3, p. 25
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon du modèle dominé $(\mathsf{X},\mathcal{X},\{q_\theta\cdot\mu,\ \theta\in\Theta\})$, $\theta^\star\in\Theta$ ; pour tout $\vartheta\in\Theta$, $\mathbb{E}_{\theta^\star}\big[\lvert\log q_\vartheta(X_1)\rvert\big]<\infty$. On pose
$$M_{\theta^\star}:\Theta\to\mathbb{R},\qquad M_{\theta^\star}(\vartheta):=\mathbb{E}_{\theta^\star}\big[\log q_\vartheta(X_1)\big].$$
**Énoncé :**
(i) Pour tout $\vartheta\in\Theta$, $\ell_n(\vartheta,X_1,\dots,X_n)\xrightarrow{\mathbb{P}_{\theta^\star}\text{-prob}}M_{\theta^\star}(\vartheta)$.
(ii) Pour tout $\vartheta\in\Theta$, $\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\vartheta)$ est **finie** et
$$M_{\theta^\star}(\vartheta)=M_{\theta^\star}(\theta^\star)-\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\vartheta)\le M_{\theta^\star}(\theta^\star).$$
(iii) Si le modèle est **identifiable** (Définition 2 du ch. 1), alors $M_{\theta^\star}(\vartheta)<M_{\theta^\star}(\theta^\star)$ pour tout $\vartheta\ne\theta^\star$ : $M_{\theta^\star}$ admet un **maximum unique, atteint en $\theta^\star$**.
**Preuve (étapes) :**
1. (i) Sous $\mathbb{P}_{\theta^\star}$, les $\log q_\vartheta(X_i)$ sont **indépendantes, de même loi et intégrables** (hypothèse) ; la **loi faible des grands nombres** (Théorème 2.1) donne la convergence de leur moyenne $\ell_n(\vartheta)$ vers $M_{\theta^\star}(\vartheta)$.
2. (ii) $q_{\theta^\star}(X_1)>0$ p.s. sous $\mathbb{P}_{\theta^\star}$ car $\mathbb{P}_{\theta^\star}(q_{\theta^\star}(X_1)=0)=\int_{\{q_{\theta^\star}=0\}}q_{\theta^\star}\,\mathrm{d}\mu=0$ ; de même $q_\vartheta(X_1)>0$ p.s., sans quoi $\lvert\log q_\vartheta(X_1)\rvert=+\infty$ avec probabilité $>0$, contredisant l'intégrabilité.
3. Donc $\log\big(q_{\theta^\star}(X_1)/q_\vartheta(X_1)\big)=\log q_{\theta^\star}(X_1)-\log q_\vartheta(X_1)$ est p.s. finie et intégrable, d'espérance $M_{\theta^\star}(\theta^\star)-M_{\theta^\star}(\vartheta)$ (**linéarité**).
4. Par le **théorème de transfert**, cette espérance vaut $\int_{\{q_{\theta^\star}>0\}}q_{\theta^\star}\log(q_{\theta^\star}/q_\vartheta)\,\mathrm{d}\mu=\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\vartheta)$, donc finie, et $\ge0$ par le **Théorème 1.1**.
5. (iii) Identifiable et $\vartheta\ne\theta^\star$ ⇒ $\mathbb{Q}_\vartheta\ne\mathbb{Q}_{\theta^\star}$ ⇒ $\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\vartheta)>0$ (**cas d'égalité** du Th. 1.1) ⇒ par (ii) $M_{\theta^\star}(\vartheta)<M_{\theta^\star}(\theta^\star)$. □
**Remarque (p. 25) :** $M_{\theta^\star}(\theta^\star)=\int_{\mathsf{X}}q_{\theta^\star}\log q_{\theta^\star}\,\mathrm{d}\mu$ est notée $\mathrm{Ent}(\mathbb{Q}_{\theta^\star})$ dans le chapitre d'origine du polycopié (« entropie ») ; c'est l'**opposé de l'entropie de Shannon** et, contrairement à la divergence, elle **dépend de la mesure dominante**. La décomposition (ii) s'écrit $M_{\theta^\star}=-\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\cdot)+\mathrm{Ent}(\mathbb{Q}_{\theta^\star})$ : à une constante près, la limite de la log-vraisemblance est l'opposé de la divergence entre la vraie loi et la loi candidate.
**Intuition (encadré, p. 25–26) :** $\hat\theta_n^{\mathrm{MV}}$ maximise $\ell_n$, qui converge vers $M_{\theta^\star}$, maximale en $\theta^\star$ et seulement en $\theta^\star$ ; on s'attend donc à $\hat\theta_n^{\mathrm{MV}}\to\theta^\star$ : **consistance de l'EMV**. Ce raisonnement est **heuristique** : la proposition donne la convergence **pour chaque $\vartheta$ fixé**, alors que la convergence du point de maximum demande une approximation **uniforme en $\vartheta$** (au moins au voisinage de $\theta^\star$), ce qui requiert des hypothèses supplémentaires (loi uniforme des grands nombres) — cours 6 et 7. Bernoulli traité en détail dans les compléments (Ex. 4.4). *Animation :* $\ell_n$ et sa limite dans le modèle de Bernoulli, l'écart vertical en $\vartheta$ étant $\mathrm{KL}(\mathcal{B}\mathrm{er}(\theta^\star),\mathcal{B}\mathrm{er}(\vartheta))$.
**Pièges / erreurs classiques :** conclure la consistance de l'EMV à partir de la seule convergence ponctuelle ; oublier l'hypothèse d'intégrabilité (elle échoue pour $\mathcal{U}([0,\theta])$ avec $\vartheta<\theta^\star$, cf. compléments) ; oublier l'identifiabilité pour l'unicité.

### Définition 1.8 — M-estimateur
**Source :** Poly ch.2, Définition 1.8, p. 26
**Hypothèses :** $(X_1,\dots,X_n)$ $n$-échantillon de $(\mathsf{X},\mathcal{X},\{\mathbb{Q}_\theta,\ \theta\in\Theta\})$ ; $m:\Theta\times\mathsf{X}\to\mathbb{R}$, $(\vartheta,x)\mapsto m(\vartheta,x)$, mesurable en $x$, avec $\mathbb{E}_{\theta^\star}[\lvert m(\vartheta,X_1)\rvert]<\infty$ pour tous $\vartheta,\theta^\star\in\Theta$. Pour tout $\theta^\star$, on pose $M_{\theta^\star}(\vartheta):=\mathbb{E}_{\theta^\star}[m(\vartheta,X_1)]$ et l'on **suppose** que $M_{\theta^\star}$ atteint son maximum au point $\theta^\star$.
**Énoncé :** $M_{\theta^\star}$ n'est pas connue mais s'estime par
$$M_n(\vartheta):=\frac1n\sum_{i=1}^nm(\vartheta,X_i),\qquad\vartheta\in\Theta,$$
qui vérifie $M_n(\vartheta)\xrightarrow{\mathbb{P}_{\theta^\star}\text{-prob}}M_{\theta^\star}(\vartheta)$ pour tous $\vartheta,\theta^\star$ (LGN). On appelle **M-estimateur associé à $m$** toute solution de
$$\hat\theta_n\in\operatorname*{arg\,max}_{\vartheta\in\Theta}M_n(\vartheta).$$
**Preuve (étapes) :** la convergence de $M_n(\vartheta)$ est la LGN (Th. 2.1) appliquée aux $m(\vartheta,X_i)$ i.i.d. intégrables.
**Remarques (p. 26–27) :**
- Sous l'hypothèse d'intégrabilité de la Prop. 1.3, **l'EMV est le M-estimateur associé à $m(\vartheta,x)=\log q_\vartheta(x)$**, avec $M_{\theta^\star}=M_{\theta^\star}(\theta^\star)-\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\cdot)$, maximale en $\theta^\star$ par positivité de la divergence.
- Souvent pas de solution explicite : procédure numérique.
- Problème de minimisation : changer $m$ en $-m$.
- Si $\Theta$ est ouvert et $\vartheta\mapsto m(\vartheta,x)$ différentiable pour tout $x$, un M-estimateur vérifie $n^{-1}\sum_{i=1}^n\nabla_\vartheta m(\hat\theta_n,X_i)=0$ : c'est un **Z-estimateur** associé à $\boldsymbol\psi=\nabla_\vartheta m$, sous réserve que $\mathbb{E}_{\theta^\star}[\nabla_\vartheta m(\theta^\star,X_1)]=0$ — vrai lorsqu'on peut **dériver sous l'espérance**, puisque $M_{\theta^\star}$ est maximale en $\theta^\star$.
- Il existe des Z-estimateurs qui ne dérivent d'aucun problème d'optimisation, et des M-estimateurs associés à des $m$ non différentiables, qui ne sont donc pas des Z-estimateurs au sens ci-dessus.
**Intuition :** rien dans le mécanisme « maximiser une moyenne empirique dont la limite est maximale en $\theta^\star$ » n'est propre au log de la densité.
**Pièges / erreurs classiques :** l'hypothèse « $M_{\theta^\star}$ atteint son maximum en $\theta^\star$ » fait partie de la définition et doit être vérifiée.

### Exemple 1.15 — Moindres carrés et médiane pour le paramètre de translation
**Source :** Poly ch.2, Exemple 1.15, p. 27
**Hypothèses :** modèle de translation de l'Ex. 1.6 : $f$ densité paire, $q_\theta(x)=f(x-\theta)$, $\Theta=\mathbb{R}$. Sous $\mathbb{P}_{\theta^\star}$, $X_1-\theta^\star$ a pour densité $f$ (loi symétrique).
**Énoncé :**
1. *Moindres carrés.* Si $\sigma^2:=\int_{\mathbb{R}}x^2f(x)\,\mathrm{d}x<\infty$ et $m(\vartheta,x):=-(x-\vartheta)^2$ : comme $\mathbb{E}_{\theta^\star}[X_1]=\theta^\star$ et $\mathrm{Var}_{\theta^\star}(X_1)=\sigma^2$,
$$M_{\theta^\star}(\vartheta)=-\mathbb{E}_{\theta^\star}\big[(X_1-\vartheta)^2\big]=-(\theta^\star-\vartheta)^2-\sigma^2,$$
maximum unique en $\theta^\star$. Le M-estimateur maximise $M_n(\vartheta)=-n^{-1}\sum_{i=1}^n(X_i-\vartheta)^2$, quadratique strictement concave, d'unique maximum $\hat\theta_n=\bar X_n$ : **estimateur des moindres carrés** (minimisation de $n^{-1}\sum_i(X_i-\vartheta)^2$). $\vartheta\mapsto m(\vartheta,x)$ est dérivable de dérivée $2(x-\vartheta)$ : $\bar X_n$ est aussi le Z-estimateur associé à $\psi(\vartheta,x)=x-\vartheta$. **La moyenne empirique est à la fois estimateur des moments, Z-estimateur et M-estimateur.**
2. *Médiane.* Si $\int_{\mathbb{R}}\lvert x\rvert f(x)\,\mathrm{d}x<\infty$ et $m(\vartheta,x):=-\lvert x-\vartheta\rvert$. La fonction $g:\vartheta\mapsto\mathbb{E}_{\theta^\star}\lvert X_1-\vartheta\rvert$ vérifie $g(\vartheta)=g(2\theta^\star-\vartheta)$ (symétrie de la loi de $X_1-\theta^\star$) et, pour $\theta^\star\le\vartheta$,
$$g(\vartheta)-g(\theta^\star)=\mathbb{E}_{\theta^\star}\Big[\int_{\theta^\star}^{\vartheta}\big(\mathbb{1}_{\{X_1<t\}}-\mathbb{1}_{\{X_1>t\}}\big)\,\mathrm{d}t\Big]=\int_{\theta^\star}^{\vartheta}\big(2F_{\theta^\star}(t)-1\big)\,\mathrm{d}t\ge0,$$
où $F_{\theta^\star}$ (fonction de répartition de $X_1$) est continue et vérifie $F_{\theta^\star}(t)\ge F_{\theta^\star}(\theta^\star)=1/2$ pour $t\ge\theta^\star$. Donc $M_{\theta^\star}=-g$ atteint son maximum en $\theta^\star$. Le M-estimateur maximise $M_n(\vartheta)=-n^{-1}\sum_{i=1}^n\lvert X_i-\vartheta\rvert$, dont les maxima ont été déterminés à l'Ex. 1.13 : **la médiane empirique est un M-estimateur**, unique si $n$ impair. $\vartheta\mapsto\lvert x-\vartheta\rvert$ n'est pas dérivable en $x$ : ce M-estimateur ne s'obtient pas en annulant un gradient ; c'est cependant un Z-estimateur associé à $\psi(\vartheta,x)=\mathrm{signe}(x-\vartheta)$ (Ex. 1.6).
**Preuve (étapes) :**
1. (MC) Décomposition biais-variance : $\mathbb{E}[(X_1-\vartheta)^2]=\mathrm{Var}(X_1)+(\mathbb{E}X_1-\vartheta)^2$.
2. (Médiane) Identité $\lvert x-\vartheta\rvert-\lvert x-\theta^\star\rvert=\int_{\theta^\star}^{\vartheta}(\mathbb{1}_{\{x<t\}}-\mathbb{1}_{\{x>t\}})\,\mathrm{d}t$, valable pour tout réel $x$ (si $\theta^\star\le\vartheta$).
3. Espérance de l'intégrale = intégrale de l'espérance (**théorème de Fubini**, intégrande bornée sur un intervalle borné) ; $\mathbb{P}(X_1<t)-\mathbb{P}(X_1>t)=F_{\theta^\star}(t)-(1-F_{\theta^\star}(t))$ (**continuité de $F$** : $\mathbb{P}(X_1=t)=0$).
4. $F_{\theta^\star}(\theta^\star)=1/2$ par symétrie et $F$ croissante ⇒ intégrande $\ge0$ ; le cas $\vartheta<\theta^\star$ s'en déduit par la symétrie $g(\vartheta)=g(2\theta^\star-\vartheta)$.
**Méthodes mobilisées :** M-estimation, moindres carrés, Fubini, symétrie.
**Intuition :** moyenne ↔ perte quadratique ; médiane ↔ perte absolue.
**Pièges / erreurs classiques :** la médiane ne demande qu'un moment d'ordre 1 (pour que $m$ soit intégrable), les moindres carrés un moment d'ordre 2.

### Remarque — §1.5 En pratique : programme des exercices
**Source :** Poly ch.2, §1.5, p. 27–28
**Hypothèses :** —
**Énoncé :** Exercices traités en petite classe (PC2) :

| Exercice | Notions du cours | Rappels |
|---|---|---|
| Exo 1 – Modèle linéaire gaussien | EMV, équations de vraisemblance | Vecteurs gaussiens, th. de Cochran, loi du $\chi^2$ |
| Exo 2 – Coefficient de mélange | EMV et EMM comparés | Loi binomiale, biais |
| Exo 3 – Famille exponentielle | EMV = EMM, invariance | Dérivation sous l'intégrale, convexité |

- L'Exercice 1 poursuit l'Exercice 4 (PC1) (régression linéaire gaussienne, sujet récurrent). Questions 5–6 : la loi de $\hat\sigma^2$ et son indépendance avec $(\hat\beta_1,\hat\beta_2)$ résultent du **théorème de Cochran** (ch. 1, Théorème 1.1) : $\mathbf{Y}-\mathbf{X}\beta\sim\mathcal{N}(0,\sigma^2I_n)$, $\hat\beta$ est fonction de la projection orthogonale de $\mathbf{Y}$ sur $\mathrm{Im}(\mathbf{X})$ (dimension 2), $n\hat\sigma^2=\lVert\mathbf{Y}-\mathbf{X}\hat\beta\rVert^2$ est le carré de la norme de la projection sur l'orthogonal (dimension $n-2$) ; indépendance des projections et $n\hat\sigma^2/\sigma^2\sim\chi^2(n-2)$. Question 7 : intervalle de confiance pour $\sigma^2$ (Déf. 2.2).
- L'Exercice 2 compare EMV et estimateur des moments sur un mélange de deux uniformes (biais, dispersion, simulations). *Animation :* l'estimateur seuillé prend souvent la valeur 0 quand $n$ est petit.
- L'Exercice 3 étudie les familles exponentielles (EMV = estimateur des moments).
- Exercices bonus : durée de vie (ne mobilise que le ch. 1) et modèle auto-régressif (première vraisemblance hors du cadre du $n$-échantillon), avec guide de lecture.

**Notions de probabilités clés à revoir :** espérance et variance, indépendance, loi des grands nombres, inégalité de Bienaymé-Tchebychev, fonctions convexes et inégalité de Jensen, vecteurs gaussiens et théorème de Cochran.
**Preuve (étapes) :** sans objet.

---

## 3. Outils mathématiques

> Section « 2 Les outils mathématiques » du poly (p. 29–32) : deux inégalités, la loi faible des grands nombres, fonctions convexes (Jensen), rappels des résultats du ch. 1 utilisés, définition minimale d'un intervalle de confiance.

### Proposition 2.1 — Inégalités de Markov et de Bienaymé-Tchebychev
**Source :** Poly ch.2, Outils, Proposition 2.1, p. 29
**Hypothèses :** (i) $Y$ v.a. réelle **positive** ; (ii) $Z$ v.a. réelle avec $\mathbb{E}[Z^2]<\infty$, $\mu=\mathbb{E}[Z]$.
**Énoncé :**
(i) (Markov) Pour tout $\delta>0$, $\mathbb{P}(Y\ge\delta)\le\mathbb{E}[Y]/\delta$.
(ii) (Bienaymé-Tchebychev) Pour tout $\delta>0$,
$$\mathbb{P}(\lvert Z-\mu\rvert\ge\delta)\le\frac{\mathrm{Var}(Z)}{\delta^2}.$$
**Preuve (étapes) :**
1. (i) $\delta\,\mathbb{1}_{\{Y\ge\delta\}}\le Y$ en tout point (car $Y\ge0$) ; on prend l'espérance (**croissance de l'espérance**) : $\delta\,\mathbb{P}(Y\ge\delta)\le\mathbb{E}[Y]$.
2. (ii) On applique (i) à la variable positive $(Z-\mu)^2$ et au seuil $\delta^2$ : $\mathbb{P}(\lvert Z-\mu\rvert\ge\delta)=\mathbb{P}\big((Z-\mu)^2\ge\delta^2\big)\le\mathbb{E}[(Z-\mu)^2]/\delta^2$. □
**Remarque (p. 29) :** appliquée à $\bar Y_n=n^{-1}\sum_{i=1}^nY_i$ (i.i.d., variance $\sigma^2$, donc $\mathrm{Var}(\bar Y_n)=\sigma^2/n$) : $\mathbb{P}(\lvert\bar Y_n-\mathbb{E}[Y_1]\rvert\ge\delta)\le\sigma^2/(n\delta^2)$ — forme utilisée dans la Prop. 1.1. La borne n'est pas précise (elle peut dépasser 1) mais est explicite et ne demande qu'un moment d'ordre 2.
**Intuition :** contrôler les queues par les moments.
**Pièges / erreurs classiques :** Markov exige $Y\ge0$.

### Définition 2.1 — Convergence en probabilité
**Source :** Poly ch.2, Outils, Définition 2.1, p. 29
**Hypothèses :** $(Y_n)_{n\in\mathbb{N}}$ suite de vecteurs aléatoires de $\mathbb{R}^k$, $y\in\mathbb{R}^k$.
**Énoncé :** $Y_n$ **converge en probabilité** vers $y$, noté $Y_n\xrightarrow{\mathbb{P}\text{-prob}}y$, si pour tout $\varepsilon>0$, $\lim_{n\to\infty}\mathbb{P}(\lVert Y_n-y\rVert\ge\varepsilon)=0$. Sous $\mathbb{P}_\theta$, on écrit $Y_n\xrightarrow{\mathbb{P}_\theta\text{-prob}}y$.
**Preuve (étapes) :** sans objet.
**Intuition :** mode de convergence de tous les résultats du chapitre ; repris et comparé aux autres modes plus tard.
**Pièges / erreurs classiques :** la limite ici est une **constante** $y$.

### Théorème 2.1 — Loi faible des grands nombres
**Source :** Poly ch.2, Outils, Théorème 2.1, p. 30
**Hypothèses :** $(Y_n)_{n\in\mathbb{N}^\ast}$ v.a. réelles **indépendantes, de même loi, intégrables**.
**Énoncé :**
$$\frac1n\sum_{i=1}^nY_i\xrightarrow{\mathbb{P}\text{-prob}}\mathbb{E}[Y_1].$$
**Preuve (étapes) :**
1. Si $\mathbb{E}[Y_1^2]<\infty$ : la moyenne a pour espérance $\mathbb{E}[Y_1]$ (linéarité) et pour variance $\mathrm{Var}(Y_1)/n$ (**indépendance**) ; **Bienaymé-Tchebychev** : $\mathbb{P}\big(\lvert n^{-1}\sum_iY_i-\mathbb{E}[Y_1]\rvert\ge\varepsilon\big)\le\mathrm{Var}(Y_1)/(n\varepsilon^2)\to0$.
2. Cas seulement intégrable : argument de **troncature** ou **théorème de continuité de Lévy** — **preuve admise ici**, démontrée dans l'annexe du polycopié (chapitre sur les convergences). □
**Intuition :** la moyenne empirique se concentre autour de l'espérance.

### Lemme 2.1 — Convergence en probabilité et fonction continue
**Source :** Poly ch.2, Outils, Lemme 2.1, p. 30
**Hypothèses :** $D\subseteq\mathbb{R}^k$, $h:D\to\mathbb{R}^m$, $y\in D$ point où $h$ est **continue**, $(Y_n)$ vecteurs aléatoires p.s. à valeurs dans $D$, $Y_n\xrightarrow{\mathbb{P}\text{-prob}}y$.
**Énoncé :** $h(Y_n)\xrightarrow{\mathbb{P}\text{-prob}}h(y)$.
**Preuve (étapes) :**
1. Soit $\varepsilon>0$. **Continuité de $h$ en $y$** : il existe $\eta>0$ tel que $z\in D$, $\lVert z-y\rVert<\eta$ ⇒ $\lVert h(z)-h(y)\rVert<\varepsilon$.
2. Donc, à un négligeable près, $\{\lVert h(Y_n)-h(y)\rVert\ge\varepsilon\}\subseteq\{\lVert Y_n-y\rVert\ge\eta\}$ (contraposée).
3. $\mathbb{P}(\lVert h(Y_n)-h(y)\rVert\ge\varepsilon)\le\mathbb{P}(\lVert Y_n-y\rVert\ge\eta)\to0$. □
**Intuition :** sert à passer de la convergence de $e(\hat\theta_n)$ à celle de $\hat\theta_n=e^{-1}(\cdot)$.
**Pièges / erreurs classiques :** il suffit de la continuité **au point limite** $y$.

### Lemme 2.2 — Droite d'appui d'une fonction convexe
**Source :** Poly ch.2, Outils, Lemme 2.2, p. 30–31
**Hypothèses :** $I$ intervalle **ouvert** de $\mathbb{R}$, $\phi:I\to\mathbb{R}$ convexe.
**Énoncé :** Pour tout $t\in I$, il existe $c_t\in\mathbb{R}$ tel que
$$\phi(t)+c_t(y-t)\le\phi(y)\qquad\text{pour tout }y\in I.$$
Si $\phi$ est strictement convexe, l'inégalité est stricte pour $y\ne t$. Si $\phi$ est dérivable en $t$, on peut prendre $c_t=\phi'(t)$.
**Preuve (étapes) :**
1. Pour $s<t<u$ dans $I$, $t=\lambda s+(1-\lambda)u$ avec $\lambda=(u-t)/(u-s)\in]0,1[$ ; **convexité** : $\phi(t)\le\lambda\phi(s)+(1-\lambda)\phi(u)$, qui se réarrange en
$$\frac{\phi(t)-\phi(s)}{t-s}\le\frac{\phi(u)-\phi(t)}{u-t}.$$
2. Toute pente de corde à gauche de $t$ est $\le$ toute pente à droite ; même argument : la pente à droite $u\mapsto(\phi(u)-\phi(t))/(u-t)$ est croissante sur $I\cap]t,+\infty[$, la pente à gauche croissante sur $I\cap]-\infty,t[$.
3. On pose $c_t:=\inf\{(\phi(u)-\phi(t))/(u-t):\ u\in I,\ u>t\}$ : réel car l'ensemble est non vide ($I$ ouvert) et minoré par toute pente à gauche.
4. Pour $u>t$ : $\phi(u)\ge\phi(t)+c_t(u-t)$ (définition de l'inf). Pour $s<t$ : la pente à gauche minore toutes les pentes à droite, donc leur inf $c_t$, d'où $\phi(s)\ge\phi(t)+c_t(s-t)$.
5. Si $\phi$ dérivable en $t$ : l'inf de la fonction croissante $u\mapsto(\phi(u)-\phi(t))/(u-t)$ est sa limite en $t^+$, soit $\phi'(t)$.
6. Stricte convexité : les inégalités entre pentes sont strictes ; pour $u>t$, la pente en $u$ est strictement supérieure à la pente en tout point de $]t,u[$, elle-même $\ge c_t$ ; symétriquement pour $s<t$. □
**Intuition :** une fonction convexe est au-dessus de ses tangentes (droites d'appui).

### Théorème 2.2 — Inégalité de Jensen
**Source :** Poly ch.2, Outils, Théorème 2.2, p. 31
**Hypothèses :** $I$ intervalle ouvert de $\mathbb{R}$, $\phi:I\to\mathbb{R}$ convexe, $Y$ v.a. réelle avec $\mathbb{P}(Y\in I)=1$ et $\mathbb{E}[\lvert Y\rvert]<\infty$.
**Énoncé :** $\mathbb{E}[Y]\in I$, $\mathbb{E}[\phi(Y)]$ est bien définie dans $]-\infty,+\infty]$, et
$$\phi(\mathbb{E}[Y])\le\mathbb{E}[\phi(Y)].$$
Si $\phi$ est strictement convexe, l'inégalité est **stricte** dès que $Y$ n'est pas p.s. constante, i.e. dès que $\mathbb{P}(Y\ne\mathbb{E}[Y])>0$.
**Preuve (étapes) :**
1. $t:=\mathbb{E}[Y]\in I$ : si $a>-\infty$ est l'extrémité gauche de $I$, $Y-a>0$ p.s., donc $\mathbb{E}[Y-a]>0$ (une v.a. positive d'espérance nulle est nulle p.s.) ; idem à droite.
2. **Lemme 2.2** : il existe $c$ avec $\phi(t)+c(Y-t)\le\phi(Y)$ p.s.
3. Le membre de gauche est intégrable ⇒ la partie négative de $\phi(Y)$ est intégrable ⇒ $\mathbb{E}[\phi(Y)]\in]-\infty,+\infty]$ bien défini.
4. **Croissance de l'espérance** : $\phi(t)=\mathbb{E}[\phi(t)+c(Y-t)]\le\mathbb{E}[\phi(Y)]$.
5. Stricte convexité : l'inégalité du lemme est stricte sur $\{Y\ne t\}$ ; la v.a. positive $\phi(Y)-\phi(t)-c(Y-t)$ est $>0$ sur cet événement de probabilité $>0$, donc d'espérance $\mathbb{E}[\phi(Y)]-\phi(t)>0$. □
**Intuition :** « l'image de la moyenne est sous la moyenne des images » pour $\phi$ convexe ; ingrédient de $\mathrm{KL}\ge0$ (avec $\phi=-\log$).
**Pièges / erreurs classiques :** sens de l'inégalité (inversé pour une fonction concave : $\mathbb{E}[\log Y]\le\log\mathbb{E}[Y]$).

### Lemme 2.3 — Maximum d'une fonction strictement concave
**Source :** Poly ch.2, Outils, Lemme 2.3, p. 31–32
**Hypothèses :** $I$ intervalle ouvert de $\mathbb{R}$, $\psi:I\to\mathbb{R}$ strictement concave ($-\psi$ strictement convexe).
**Énoncé :** $\psi$ admet **au plus un** point de maximum sur $I$. Si $\psi$ est dérivable en $t$ avec $\psi'(t)=0$, alors $t$ est l'**unique point de maximum global**. Si $\psi$ est deux fois dérivable avec $\psi''<0$ sur $I$, elle est strictement concave.
**Preuve (étapes) :**
1. Si $t_1\ne t_2$ étaient deux maxima, la **stricte concavité** donnerait $\psi\big(\frac{t_1+t_2}2\big)>\frac12\psi(t_1)+\frac12\psi(t_2)=\max\psi$ : absurde.
2. Si $\psi'(t)=0$ : **Lemme 2.2** appliqué à $-\psi$ avec $c_t=-\psi'(t)=0$ : $-\psi(y)>-\psi(t)$ pour $y\ne t$, i.e. $\psi(y)<\psi(t)$.
3. Si $\psi''<0$ : $\psi'$ strictement décroissante ; pour $s<u$, $\lambda\in]0,1[$, $t=\lambda s+(1-\lambda)u$, l'**inégalité des accroissements finis** donne $\psi(t)-\psi(s)>\psi'(t)(t-s)$ et $\psi(u)-\psi(t)<\psi'(t)(u-t)$ ; comme $\lambda(t-s)=(1-\lambda)(u-t)$, en multipliant la première par $\lambda$, la seconde par $1-\lambda$ et en soustrayant : $\psi(t)>\lambda\psi(s)+(1-\lambda)\psi(u)$. □
**Intuition :** justifie, dans tous les exemples, le passage « point critique ⇒ maximum global ».

### Remarque — Résultats du chapitre 1 utilisés dans ce chapitre
**Source :** Poly ch.2, Outils, « Résultats du chapitre 1 utilisés », p. 32
**Hypothèses :** —
**Énoncé :** Utilisés sans être redémontrés (énoncés/démontrés au ch. 1) :
- **Densité d'un $n$-échantillon** : modèle dominé par $\mu$, densités $q_\theta$ ⇒ $n$-échantillon dominé par $\mu^{\otimes n}$, densité $\prod_{i=1}^nq_\theta(x_i)$ (Section 1.7, éq. (1)) — c'est la fonction dont la vraisemblance est l'évaluation aux observations.
- **Modèle dominé, densités, Radon-Nikodym** : la mesure dominante n'est pas unique ; deux densités relatives à deux mesures dominantes diffèrent d'un facteur indépendant du paramètre (Section 4) ⇒ EMV indépendant de ce choix.
- **Statistiques d'ordre et médiane empirique** (Section 1.5) : modèles uniforme et de Laplace, Z-estimateur médiane.
- **Théorème de transfert, fonction muette, changement de variables** (Section 2) : moments exacts, KL comme espérance.
- **Lois exponentielle et Gamma** : $\mathbb{E}_\theta[X_1^k]=k!/\theta^k$, lois Gamma (moments, additivité), biais et EQM de $\hat\theta_{n,1}$.
- **Vecteurs gaussiens, loi du $\chi^2$, théorèmes de Cochran et de Gosset** (Section 2, Section 1.9) : Exercice 1 ; régression linéaire gaussienne à deux coefficients (Section 4).
**Preuve (étapes) :** voir ch. 1.

### Définition 2.2 — Intervalle de confiance (définition minimale)
**Source :** Poly ch.2, Outils, Définition 2.2, p. 32
**Hypothèses :** $(\mathsf{Z},\mathcal{Z},\{\mathbb{P}_\theta,\ \theta\in\Theta\})$ modèle paramétrique, $g:\Theta\to\mathbb{R}$, $\alpha\in]0,1[$.
**Énoncé :** Un **intervalle de confiance de niveau $1-\alpha$** pour $g(\theta)$ est un intervalle aléatoire $[A(Z),B(Z)]$, dont les bornes $A$, $B$ sont des statistiques à valeurs dans $\mathbb{R}\cup\{-\infty,+\infty\}$, tel que
$$\mathbb{P}_\theta\big(A(Z)\le g(\theta)\le B(Z)\big)\ge1-\alpha\qquad\text{pour tout }\theta\in\Theta.$$
**Remarques (p. 32) :** la probabilité porte sur l'**intervalle** (aléatoire), pas sur $g(\theta)$ (inconnu mais fixé) : quelle que soit la valeur du paramètre, la procédure capture $g(\theta)$ avec probabilité $\ge1-\alpha$. Procédé courant (**fonction pivotale**) : trouver une v.a. fonction des observations et de $g(\theta)$ dont la loi sous $\mathbb{P}_\theta$ ne dépend pas de $\theta$ ; ses quantiles d'ordre $\alpha/2$ et $1-\alpha/2$ l'encadrent avec probabilité $1-\alpha$, puis on résout l'encadrement en $g(\theta)$. Exercice 1 : $n\hat\sigma^2/\sigma^2\sim\chi^2(n-2)$ joue ce rôle pour $g(\theta)=\sigma^2$. Notion développée au chapitre suivant.
**Preuve (étapes) :** sans objet.
**Pièges / erreurs classiques :** « $\sigma^2$ a une probabilité $1-\alpha$ d'être dans l'intervalle » est un abus : c'est l'intervalle qui est aléatoire ; l'inégalité doit valoir **pour tout $\theta$**.

---

## 4. Exercices du poly

> Section « 3 Les exercices » (p. 33–51). Conventions de la feuille : $\mathrm{Leb}$ et $\mathrm{Leb}^{\otimes n}$ mesures de Lebesgue sur $\mathbb{R}$ et $\mathbb{R}^n$ ; $\mathcal{N}(\mu,\sigma^2)$ gaussienne ; vecteurs **colonnes** ; $a^T$ transposée. Les corrigés (§3.4, p. 39–51) « reprennent, en les complétant, ceux distribués avec la feuille de PC » ; la variable de la vraisemblance y est notée $\vartheta$.

### 4.1 Questions courtes : avez-vous assimilé le chapitre ? (p. 33)

Le poly donne les questions et la référence ; **il ne donne pas de réponses rédigées**. Les réponses ci-dessous sont déduites du cours (signalées comme telles).

1. *$n$-échantillon de $\{\mathcal{E}(\theta),\ \theta\in\mathbb{R}_+^\ast\}$. Parmi $X_1$, $\bar X_n$, $\theta$ et la constante 1, lesquels sont des estimateurs de $\theta$ ? Lesquels sont de bons estimateurs ? (Ex. 1.1)* — Réponse déduite : $X_1$, $\bar X_n$, $1$ sont des estimateurs ; $\theta$ non. Aucun n'est « bon » pour $\theta$ tel quel : $\bar X_n$ estime $1/\theta$ ; un bon estimateur de $\theta$ est $1/\bar X_n$ (Ex. 1.4, 1.7).
2. *Principe de la méthode des moments ; un modèle admet-il un seul estimateur des moments ? (Méthode 1.1, Ex. 1.4)* — Réponse déduite : égaler moments exacts $e_j(\vartheta)$ et moments empiriques ; non, il en existe un par choix de fonctions $T_j$ (ex. $\hat\theta_{n,1}$, $\hat\theta_{n,2}$).
3. *Uniforme sur $[a,b]$ : combien de fonctions de moment, pourquoi ? $[\hat a_n,\hat b_n]$ contient-il toujours les observations ? (Ex. 1.5)* — Réponse déduite : deux (paramètre de dimension 2) ; non (dès que $X_{n:n}-\bar X_n>\sqrt{3V_n}$).
4. *« estimateur des moments », « Z-estimateur », « M-estimateur » : lesquels s'appliquent à la médiane empirique ? (Ex. 1.6, 1.15)* — Réponse déduite : Z-estimateur ($\psi=\mathrm{signe}(x-\theta)$) et M-estimateur ($m=-|x-\vartheta|$), pas estimateur des moments.
5. *Vrai ou faux : la vraisemblance dépend du choix de la mesure dominante ; l'EMV aussi. (Déf. 1.4)* — Réponse déduite : vrai pour la vraisemblance (à un facteur indépendant de $\vartheta$ près), faux pour l'EMV.
6. *Vrai ou faux : l'EMV existe toujours et est unique. (Ex. 1.12, 1.13)* — Réponse déduite : faux (non-existence Ex. 1.12 ; non-unicité Laplace $n$ pair).
7. *$\mathcal{U}([0,\theta])$ : comment détermine-t-on l'EMV ? Pourquoi ne pas écrire l'équation de vraisemblance ? (Ex. 1.11, Méthode 1.2)* — Réponse déduite : étude directe de $\vartheta\mapsto\vartheta^{-n}\mathbb{1}_{[X_{n:n},+\infty[}(\vartheta)$ ⇒ $X_{n:n}$ ; la vraisemblance n'est pas dérivable en son maximum et s'annule à gauche.
8. *Vrai ou faux : toute racine des équations de vraisemblance est un EMV. (Déf. 1.6)* — Réponse déduite : faux (points critiques = maxima ou minima locaux).
9. *Modèle gaussien : l'EMV de $\sigma^2$ est la variance empirique non corrigée ; celui de $\sigma$ ? Quel résultat ? (Prop. 1.2)* — Réponse déduite : $\hat\sigma_n=\big(n^{-1}\sum_i(X_i-\bar X_n)^2\big)^{1/2}$, par invariance par reparamétrisation.
10. *Pourquoi $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)\ge0$ ? Vers quoi converge $\ell_n(\vartheta)$ sous $\mathbb{P}_{\theta^\star}$ et pourquoi la limite est-elle maximale en $\theta^\star$ seulement si le modèle est identifiable ? (Th. 1.1, Prop. 1.3)* — Réponse déduite : Jensen avec $-\log$ strictement convexe ; $\ell_n(\vartheta)\to M_{\theta^\star}(\vartheta)=M_{\theta^\star}(\theta^\star)-\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\vartheta)$ ; KL nulle ssi lois égales, et l'identifiabilité donne lois égales ⇒ paramètres égaux.

### 4.2 Exercice 1 — Modèle linéaire gaussien (⋆⋆) [Groupe 1, traité en PC]
**Source :** Poly ch.2, Exercices, Exercice 1, p. 34 ; corrigé p. 39–41.
**Objectif (p. 33) :** poursuit l'Exercice 4 (PC1) : montrer que l'estimateur des moindres carrés est l'EMV, déterminer sa loi et celle de l'estimateur de la variance (Cochran pour Q5–6 ; IC, Déf. 2.2, pour Q7).

**Énoncé complet.** Soient $x_1,\dots,x_n$ des réels. On considère le modèle statistique
$$\Big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\Big\{p_\theta\cdot\mathrm{dLeb}^{\otimes n}:=\bigotimes_{i=1}^n\mathcal{N}(\beta_1+\beta_2x_i,\sigma^2)\ :\ \theta:=(\beta_1,\beta_2,\sigma^2)\in\mathbb{R}^2\times\mathbb{R}_+^\ast\Big\}\Big).$$
On note $\mathbf{1}:=(1,\dots,1)^T$ et $\underline{\mathbf{x}}:=(x_1,\dots,x_n)^T$. On suppose qu'il existe au moins deux indices $i\ne j$ tels que $x_i\ne x_j$. Notations :
$$\mathbf{Y}:=\begin{pmatrix}Y_1\\ \vdots\\ Y_n\end{pmatrix}\in\mathbb{R}^n,\qquad\mathbf{X}:=\begin{bmatrix}\mathbf{1}&\underline{\mathbf{x}}\end{bmatrix}\in\mathbb{R}^{n\times2},\qquad\beta:=\begin{pmatrix}\beta_1\\ \beta_2\end{pmatrix}\in\mathbb{R}^2.$$
1. Montrer que $\mathbf{X}^T\mathbf{X}$ est inversible. *Remarque : puisque $u^T\mathbf{X}^T\mathbf{X}u\ge0$ pour tout $u\in\mathbb{R}^2$, on en déduit que la matrice est définie positive.*
2. Déterminer les EMV $(\hat\beta_1,\hat\beta_2,\hat\sigma^2)$ de $(\beta_1,\beta_2,\sigma^2)$.
3. Déterminer la loi de $(\hat\beta_1,\hat\beta_2)$ sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$.
4. Montrer que, sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, $\hat\beta_1$ et $\hat\beta_2$ sont indépendants si et seulement si $n^{-1}\sum_{i=1}^nx_i=0$.
   *Remarque :* le modèle dépend de $x_1,\dots,x_n$ via les $\beta_1+\beta_2x_i$, i.e. les lignes de $\mathbf{X}\beta$. Sans pré-traitement, rien n'impose $n^{-1}\sum_ix_i=0$. Néanmoins,
$$\beta_1\mathbf{1}+\beta_2\underline{\mathbf{x}}=\Big(\beta_1+\beta_2n^{-1}\sum_{i=1}^nx_i\Big)\mathbf{1}+\beta_2\Big(\underline{\mathbf{x}}-n^{-1}\sum_{i=1}^nx_i\mathbf{1}\Big)=\tilde\beta_1\mathbf{1}+\beta_2\underline{\tilde{\mathbf{x}}}=\begin{bmatrix}\mathbf{1}&\underline{\tilde{\mathbf{x}}}\end{bmatrix}\begin{pmatrix}\tilde\beta_1\\ \beta_2\end{pmatrix},\quad\underline{\tilde{\mathbf{x}}}=\underline{\mathbf{x}}-n^{-1}\sum_{i=1}^nx_i\mathbf{1}=\underline{\mathbf{x}}-\frac{\mathbf{1}^T\underline{\mathbf{x}}}{\mathbf{1}^T\mathbf{1}}\mathbf{1},$$
   on peut paramétrer le modèle de façon équivalente par $(\tilde\beta_1,\beta_2,\sigma^2)$ avec une matrice d'expérience $[\mathbf{1}\ \underline{\tilde{\mathbf{x}}}]$ à colonnes **orthogonales** (c'est le sens de $n^{-1}\sum_i\tilde x_i=0$).
5. Déterminer la loi de $\hat\sigma^2$ sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$.
6. Montrer que, sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, $\hat\sigma^2$ et $(\hat\beta_1,\hat\beta_2)$ sont indépendants.
7. Soit $\alpha\in]0,1[$. Proposer un intervalle de confiance de niveau $1-\alpha$ pour $\sigma^2$.

**Corrigé complet (p. 39–41).** Notations : $\bar Y:=n^{-1}\sum_iY_i$, $\bar x:=n^{-1}\sum_ix_i$ ; variable libre $\vartheta=(b_1,b_2,v)\in\Theta=\mathbb{R}^2\times\mathbb{R}_+^\ast$, $b:=(b_1,b_2)^T$. On suppose **$n\ge3$** (hypothèse implicite, nécessaire pour que l'estimateur de la variance soit p.s. défini).

*Préliminaire.* Sous $p_\theta\cdot\mathrm{Leb}^{\otimes n}$, les $Y_i$ sont indépendantes, $Y_i\sim\mathcal{N}(\beta_1+\beta_2x_i,\sigma^2)$ ; densité jointe = produit (ch. 1, Section 1.7, éq. (1)) :
$$p_\theta(y_1,\dots,y_n)=\prod_{i=1}^n\frac1{\sqrt{2\pi\sigma^2}}\exp\Big(-\frac{(y_i-\beta_1-\beta_2x_i)^2}{2\sigma^2}\Big)=\frac1{(2\pi\sigma^2)^{n/2}}\exp\Big(-\frac1{2\sigma^2}\lVert y-\mathbf{X}\beta\rVert^2\Big).$$
Un vecteur de coordonnées gaussiennes indépendantes est gaussien (Lemme 2.1 **du ch. 1**) : $\mathbf{Y}\sim\mathcal{N}(\mathbf{X}\beta,\sigma^2I_n)$.

1. $$\mathbf{X}^T\mathbf{X}=\begin{pmatrix}n&\sum_{i=1}^nx_i\\ \sum_{i=1}^nx_i&\sum_{i=1}^nx_i^2\end{pmatrix},\qquad\det(\mathbf{X}^T\mathbf{X})=n\sum_{i=1}^nx_i^2-\Big(\sum_{i=1}^nx_i\Big)^2=n\sum_{i=1}^n(x_i-\bar x)^2,$$
   (car $\sum_i(x_i-\bar x)^2=\sum_ix_i^2-n\bar x^2$). Ce déterminant est $\ge0$, nul ssi $x_i=\bar x$ pour tout $i$, exclu : il est $>0$, la matrice est inversible. Comme $u^T\mathbf{X}^T\mathbf{X}u=\lVert\mathbf{X}u\rVert^2\ge0$, elle est symétrique positive, et inversible donc **définie positive**. Explicitement
$$(\mathbf{X}^T\mathbf{X})^{-1}=\frac1{n\sum_{i=1}^n(x_i-\bar x)^2}\begin{pmatrix}\sum_{i=1}^nx_i^2&-\sum_{i=1}^nx_i\\ -\sum_{i=1}^nx_i&n\end{pmatrix}.$$
   « Deux $x_i$ distincts » ⇔ colonnes $\mathbf{1}$ et $\underline{\mathbf{x}}$ linéairement indépendantes : $F:=\mathrm{Im}(\mathbf{X})=\mathrm{Vect}(\mathbf{1},\underline{\mathbf{x}})$ est de dimension 2.
2. $\mathrm{L}_n(\vartheta)=p_\vartheta(Y_1,\dots,Y_n)>0$ et
$$\ell_n(\vartheta)=-\frac12\log(2\pi v)-\frac1{2nv}\lVert\mathbf{Y}-\mathbf{X}b\rVert^2,\qquad\vartheta=(b,v)\in\mathbb{R}^2\times\mathbb{R}_+^\ast.$$
   Différentiable sur $\Theta$ ouvert (cas régulier de la Méthode 1.2) ; équations de vraisemblance :
$$\nabla_b\ell_n(\vartheta)=\frac1{nv}\mathbf{X}^T(\mathbf{Y}-\mathbf{X}b)=0,\qquad\frac{\partial\ell_n}{\partial v}(\vartheta)=-\frac1{2v}+\frac1{2nv^2}\lVert\mathbf{Y}-\mathbf{X}b\rVert^2=0.$$
   On maximise **en deux temps** (comme Ex. 1.10).
   *Maximisation en $b$ à $v$ fixé :* minimiser $J(b):=\lVert\mathbf{Y}-\mathbf{X}b\rVert^2$, quadratique, gradient $\nabla J(b)=-2\mathbf{X}^T(\mathbf{Y}-\mathbf{X}b)$, hessienne $2\mathbf{X}^T\mathbf{X}$ définie positive (Q1) ⇒ strictement convexe, unique minimum caractérisé par les **équations normales** $\mathbf{X}^T\mathbf{X}b=\mathbf{X}^T\mathbf{Y}$ :
$$\hat\beta:=\begin{pmatrix}\hat\beta_1\\ \hat\beta_2\end{pmatrix}=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y}.$$
   Les équations normales s'écrivent $nb_1+b_2\sum_ix_i=\sum_iY_i$ et $b_1\sum_ix_i+b_2\sum_ix_i^2=\sum_ix_iY_i$ ; la première donne $b_1=\bar Y-b_2\bar x$, et en reportant :
$$\hat\beta_2=\frac{\sum_{i=1}^n(x_i-\bar x)(Y_i-\bar Y)}{\sum_{i=1}^n(x_i-\bar x)^2},\qquad\hat\beta_1=\bar Y-\hat\beta_2\bar x.$$
   $P:=\mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T$ est symétrique, $P^2=P$, $P\mathbf{X}=\mathbf{X}$, image $F$ : projection orthogonale sur $F$ ; $I_n-P$ projection orthogonale sur $F^\perp$ (dimension $n-2$). Ainsi $\mathbf{X}\hat\beta=P\mathbf{Y}$, $\mathbf{Y}-\mathbf{X}\hat\beta=(I_n-P)\mathbf{Y}$, $J(\hat\beta)=\lVert(I_n-P)\mathbf{Y}\rVert^2$.
   *Maximisation en $v$ :* $S:=n^{-1}\lVert(I_n-P)\mathbf{Y}\rVert^2$ ; $v\mapsto\ell_n(\hat\beta,v)=-\frac12\log(2\pi v)-S/(2v)$ a pour dérivée $(S-v)/(2v^2)$ ; si $S>0$, maximum en $v=S$ seulement. Pour tout $(b,v)$ : $\ell_n(b,v)\le\ell_n(\hat\beta,v)\le\ell_n(\hat\beta,S)$, égalité ssi $(b,v)=(\hat\beta,S)$. L'EMV existe, est unique :
$$(\hat\beta_1,\hat\beta_2,\hat\sigma^2)\quad\text{avec}\quad\hat\sigma^2:=\frac1n\sum_{i=1}^n(Y_i-\hat\beta_1-\hat\beta_2x_i)^2=\frac1n\lVert\mathbf{Y}-\mathbf{X}\hat\beta\rVert^2=\frac1n\lVert(I_n-P)\mathbf{Y}\rVert^2.$$
   Si $S=0$, $v\mapsto\ell_n(\hat\beta,v)\to+\infty$ en $0$ : pas de maximum. $S>0$ p.s. dès $n\ge3$ (Q5) ; pour $n=2$, $F=\mathbb{R}^2$, $P=I_2$, $S=0$ toujours : EMV non défini. $(\hat\beta_1,\hat\beta_2)$ est l'estimateur des **moindres carrés** de l'Ex. 4 (PC1) : en modèle gaussien, **moindres carrés et maximum de vraisemblance coïncident** pour les coefficients (cas général : compléments, Ex. 4.7). L'EMV de $\sigma^2$ divise par $n$, non par $n-2$.
3. $\hat\beta=A\mathbf{Y}$, $A:=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\in\mathbb{R}^{2\times n}$. Image linéaire d'un vecteur gaussien (Prop. 2.4 **du ch. 1**) :
$$\hat\beta\sim\mathcal{N}\big(A\mathbf{X}\beta,\ \sigma^2AA^T\big)=\mathcal{N}\big(\beta,\ \sigma^2(\mathbf{X}^T\mathbf{X})^{-1}\big),$$
   car $A\mathbf{X}=I_2$ et $AA^T=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{X}(\mathbf{X}^T\mathbf{X})^{-1}=(\mathbf{X}^T\mathbf{X})^{-1}$. En particulier $\mathbb{E}_\theta[\hat\beta]=\beta$ (**sans biais**). Avec Q1 :
$$\mathrm{Var}_\theta(\hat\beta_1)=\frac{\sigma^2\sum_{i=1}^nx_i^2}{n\sum_{i=1}^n(x_i-\bar x)^2},\quad\mathrm{Var}_\theta(\hat\beta_2)=\frac{\sigma^2}{\sum_{i=1}^n(x_i-\bar x)^2},\quad\mathrm{Cov}_\theta(\hat\beta_1,\hat\beta_2)=-\frac{\sigma^2\sum_{i=1}^nx_i}{n\sum_{i=1}^n(x_i-\bar x)^2}=-\frac{\sigma^2\bar x}{\sum_{i=1}^n(x_i-\bar x)^2}.$$
4. $(\hat\beta_1,\hat\beta_2)$ est un vecteur gaussien : coordonnées indépendantes ssi décorrélées (Prop. 2.6 **du ch. 1**), i.e. $\mathrm{Cov}_\theta(\hat\beta_1,\hat\beta_2)=0$, i.e. (comme $\sigma^2>0$ et $\sum_i(x_i-\bar x)^2>0$) $\bar x=0$. Avec la paramétrisation centrée, l'estimateur de $\tilde\beta_1=\beta_1+\beta_2\bar x$ est $\hat\beta_1+\hat\beta_2\bar x=\bar Y$, indépendant de $\hat\beta_2$.
5. $\mathbf{Y}\sim\mathcal{N}(\mathbf{X}\beta,\sigma^2I_n)$, $\mathbb{R}^n=F\oplus F^\perp$ (dimensions 2 et $n-2$). **Théorème de Cochran** (Th. 1.1 **du ch. 1**) : $\lVert P_{F^\perp}(\mathbf{Y}-\mathbf{X}\beta)\rVert^2/\sigma^2\sim\chi^2(n-2)$. Or $\mathbf{X}\beta\in F$ donc $P_{F^\perp}(\mathbf{X}\beta)=0$ et $P_{F^\perp}(\mathbf{Y}-\mathbf{X}\beta)=(I_n-P)\mathbf{Y}$ :
$$\frac{n\hat\sigma^2}{\sigma^2}=\frac{\lVert(I_n-P)\mathbf{Y}\rVert^2}{\sigma^2}\sim\chi^2(n-2),$$
   i.e. $\hat\sigma^2$ a la loi de $\frac{\sigma^2}nU$, $U\sim\chi^2(n-2)=\mathrm{Gamma}\big(\frac{n-2}2,\frac12\big)$, soit la loi $\mathrm{Gamma}\big(\frac{n-2}2,\frac n{2\sigma^2}\big)$. Comme $\mathbb{E}[U]=n-2$ : $\mathbb{E}_\theta[\hat\sigma^2]=\frac{n-2}n\sigma^2$ — **biaisé** ; $\frac n{n-2}\hat\sigma^2=\frac1{n-2}\lVert\mathbf{Y}-\mathbf{X}\hat\beta\rVert^2$ est **sans biais**. La loi $\chi^2(n-2)$ ayant une densité dès $n\ge3$, $\mathbb{P}_\theta(\hat\sigma^2=0)=0$ (achève Q2).
6. Cochran donne aussi l'indépendance de $P\mathbf{Y}$ et $(I_n-P)\mathbf{Y}$. $\hat\sigma^2=n^{-1}\lVert(I_n-P)\mathbf{Y}\rVert^2$ est fonction mesurable de $(I_n-P)\mathbf{Y}$ ; $\hat\beta$ est fonction mesurable de $P\mathbf{Y}$ car $\mathbf{X}^TP=(P\mathbf{X})^T=\mathbf{X}^T$ donne $\hat\beta=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^T\mathbf{Y}=(\mathbf{X}^T\mathbf{X})^{-1}\mathbf{X}^TP\mathbf{Y}$. Des fonctions mesurables de v.a. indépendantes sont indépendantes. (Variante : Corollaire 2.1 du ch. 1 appliqué à $\mathbf{Y}-\mathbf{X}\beta\sim\mathcal{N}(0,\sigma^2I_n)$ et aux projecteurs $P$, $I_n-P$ de produit nul.)
7. $n\hat\sigma^2/\sigma^2\sim\chi^2(n-2)$ quel que soit $\theta$ (fonction pivotale, cf. Déf. 2.2). Quantiles $q^{n-2}_{\alpha/2}$, $q^{n-2}_{1-\alpha/2}$ de $\chi^2(n-2)$ : bien définis ($0<q^{n-2}_{\alpha/2}<q^{n-2}_{1-\alpha/2}$) car la loi a une densité $>0$ sur $\mathbb{R}_+^\ast$ (f.d.r. continue strictement croissante), et
$$\mathbb{P}_\theta\Big(q^{n-2}_{\alpha/2}\le\frac{n\hat\sigma^2}{\sigma^2}\le q^{n-2}_{1-\alpha/2}\Big)=1-\frac\alpha2-\frac\alpha2=1-\alpha.$$
   Comme $\sigma^2>0$ et $\hat\sigma^2>0$ p.s., on résout :
$$\mathbb{P}_\theta\Big(\frac{n\hat\sigma^2}{q^{n-2}_{1-\alpha/2}}\le\sigma^2\le\frac{n\hat\sigma^2}{q^{n-2}_{\alpha/2}}\Big)=1-\alpha.$$
   $\big[n\hat\sigma^2/q^{n-2}_{1-\alpha/2},\ n\hat\sigma^2/q^{n-2}_{\alpha/2}\big]$ est un IC de niveau $1-\alpha$ pour $\sigma^2$ (niveau exactement $1-\alpha$). D'autres choix de quantiles (p. ex. $0$ et $q^{n-2}_{1-\alpha}$) donnent d'autres IC de même niveau (comparaison au chapitre suivant).

**Méthodes mobilisées :** densité d'un vecteur d'observations indépendantes (produit) ; équations de vraisemblance ; **maximisation en deux temps** (profil en $b$ puis en $v$) ; équations normales / moindres carrés ; projection orthogonale ; image linéaire d'un vecteur gaussien ; indépendance ⇔ décorrélation dans un vecteur gaussien ; **théorème de Cochran** ; lois $\chi^2$/Gamma ; calcul de biais ; **fonction pivotale** pour un IC.
**Pièges :** $\hat\sigma^2$ divise par $n$ (biaisé), l'estimateur sans biais par $n-2$ ; pour $n=2$ l'EMV n'existe pas ; « Théorème 1.1 » = Cochran **du ch. 1**.

### 4.3 Exercice 2 — Estimation d'un coefficient de mélange (⋆) [Groupe 1, traité en PC]
**Source :** Poly ch.2, Exercices, Exercice 2, p. 34–35 ; corrigé p. 41–44.
**Objectif :** comparer, sur un mélange de deux uniformes, EMV et estimateur des moments (Méthodes 1.1 et 1.2) : estimateurs différents, biais et dispersion comparés numériquement.

**Énoncé complet.** Soit un $n$-échantillon $(X_1,\dots,X_n)$ du modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{f_\theta\cdot\mathrm{Leb},\ \theta\in]0,1[\}\big)$ où
$$f_\theta(x)=\frac\theta a\mathbb{1}_{[0,a]}(x)+\frac{1-\theta}b\mathbb{1}_{[0,b]}(x),$$
$a$, $b$ connus, $0<a<b$. La fonction de répartition vaut
$$x\mapsto\begin{cases}0&x\le0,\\ \Big(\dfrac\theta a+\dfrac{1-\theta}b\Big)x&0\le x\le a,\\ \theta+\dfrac{1-\theta}bx&a\le x\le b,\\ 1&x\ge b.\end{cases}$$
1. Exprimer la vraisemblance à l'aide de $N_a:=\sum_{i=1}^n\mathbb{1}_{X_i\in[0,a]}$.
2. En déduire l'EMV de $\theta$, noté $\hat\theta_n^{(1)}$.
3. Par la méthode des moments (d'ordre 1), proposer un estimateur $\hat\theta_n^{(2)}$.

▶ *Analyses numériques* (mesures simulées sous $f_{0.2}$, $a=1$, $b=3$). Figure 1 : [gauche] deux réalisations de $\theta\mapsto L(\theta,X_1,\dots,X_n)$ pour $n=10$ et $n=200$ ; [centre] deux réalisations de la fonction aléatoire dont l'estimateur des moments est un zéro ; [droite] biais de $\hat\theta_n^{(1)}$ en fonction de $\theta$ pour $n=10$ et $200$. Figure 2 : boîtes à moustaches de $N=5000$ réalisations pour $n=10$ et $n=200$ de $\hat\theta_n$ (MV-1), $\hat\theta_n^{(1)}$ (MV-2), $\tilde\theta_n$ (Mom-1), $\hat\theta_n^{(2)}$ (Mom-2), avec
$$\hat\theta_n:=\frac{b(N_a/n)-a}{b-a},\qquad\tilde\theta_n:=\frac{b-2n^{-1}\sum_{i=1}^nX_i}{b-a}.$$

**Corrigé complet (p. 41–44).** Modèle dominé par $\mathrm{Leb}$.
*Préliminaire.* $F_\theta(t)=0$ pour $t\le0$, $=1$ pour $t\ge b$ ; pour $0\le t\le a$, $F_\theta(t)=\int_0^t\big(\frac\theta a+\frac{1-\theta}b\big)\mathrm{d}x=\big(\frac\theta a+\frac{1-\theta}b\big)t$ ; pour $a\le t\le b$, $F_\theta(t)=F_\theta(a)+\int_a^t\frac{1-\theta}b\mathrm{d}x=\theta+\frac{1-\theta}bt$. $f_\theta\cdot\mathrm{Leb}$ est le **mélange**, de poids $\theta$ et $1-\theta$, des uniformes sur $[0,a]$ et $[0,b]$.
1. Pour tout $x$ : $f_\vartheta(x)=\big(\frac\vartheta a+\frac{1-\vartheta}b\big)\mathbb{1}_{[0,a]}(x)+\frac{1-\vartheta}b\mathbb{1}_{]a,b]}(x)$. Sous $\mathbb{P}_\theta$, observations dans $[0,b]$ p.s. ; $N_a$ dans $[0,a]$, $n-N_a$ dans $]a,b]$ :
$$\mathrm{L}_n(\vartheta)=\prod_{i=1}^nf_\vartheta(X_i)=\Big(\frac\vartheta a+\frac{1-\vartheta}b\Big)^{N_a}\Big(\frac{1-\vartheta}b\Big)^{n-N_a},\qquad\vartheta\in]0,1[.$$
   Elle ne dépend des observations que par $N_a$.
2. Sur $]0,1[$, $\mathrm{L}_n>0$ et
$$\ell_n(\vartheta)=\frac{N_a}n\log\Big(\frac\vartheta a+\frac{1-\vartheta}b\Big)+\Big(1-\frac{N_a}n\Big)\log\frac{1-\vartheta}b.$$
   Comme $\frac\vartheta a+\frac{1-\vartheta}b=\frac{a+\vartheta(b-a)}{ab}$,
$$\ell_n'(\vartheta)=\frac{N_a}n\frac{b-a}{a+\vartheta(b-a)}-\frac{n-N_a}n\frac1{1-\vartheta}=\frac{bN_a-na-n\vartheta(b-a)}{n(1-\vartheta)\big(a+\vartheta(b-a)\big)}.$$
   Dénominateur $>0$ sur $]0,1[$ ; numérateur affine strictement décroissant en $\vartheta$, nul en
$$\hat\theta_n:=\frac{bN_a-na}{n(b-a)}=\frac{b(N_a/n)-a}{b-a}.$$
   Comme $0\le N_a/n\le1$ : $\hat\theta_n\le1$ (égalité ssi $N_a=n$) et $\hat\theta_n>0$ ssi $N_a/n>a/b$. Trois cas :
   - $0<\hat\theta_n<1$ ($a/b<N_a/n<1$) : $\ell_n'>0$ sur $]0,\hat\theta_n[$, $<0$ sur $]\hat\theta_n,1[$ : EMV existe, unique, $=\hat\theta_n$.
   - $\hat\theta_n\le0$ ($N_a/n\le a/b$) : $\ell_n'<0$ sur $]0,1[$, $\ell_n$ strictement décroissante, borne sup (limite en 0) non atteinte : **pas d'EMV** dans $\Theta=]0,1[$.
   - $\hat\theta_n=1$ ($N_a=n$) : $\ell_n'>0$, strictement croissante, borne sup non atteinte : pas d'EMV.

   $f_0$ et $f_1$ sont les densités des uniformes sur $[0,b]$ et $[0,a]$ : le modèle se **prolonge à $[0,1]$**, où $\mathrm{L}_n$ est continue ; sur $[0,1]$ le maximum est atteint en un point unique, $\hat\theta_n\vee0=\max(\hat\theta_n,0)$ (qui vaut 1 si $N_a=n$). Estimateur retenu :
$$\hat\theta_n^{(1)}:=\hat\theta_n\vee0,$$
   EMV du modèle prolongé à $[0,1]$, égal à celui du modèle initial sur $\{0<\hat\theta_n<1\}$. Cet événement a une probabilité $\to1$ : $N_a=\sum_i\mathbb{1}_{\{X_i\in[0,a]\}}$ est une somme de Bernoulli indépendantes de paramètre
$$p_\theta:=\mathbb{P}_\theta(X_1\in[0,a])=F_\theta(a)=\theta+(1-\theta)\frac ab\in]a/b,1[,$$
   donc $N_a\sim\mathrm{Bin}(n,p_\theta)$ et la LGN (Th. 2.1) donne $N_a/n\xrightarrow{\mathbb{P}_\theta\text{-prob}}p_\theta$ ; comme $a/b<p_\theta<1$, $\mathbb{P}_\theta(N_a/n\le a/b)\to0$ et $\mathbb{P}_\theta(N_a=n)=p_\theta^n\to0$.
   *Remarque sur le biais.* $\mathbb{E}_\theta[N_a]=np_\theta$ ⇒
$$\mathbb{E}_\theta[\hat\theta_n]=\frac{bp_\theta-a}{b-a}=\frac{b\theta+(1-\theta)a-a}{b-a}=\theta:$$
   l'estimateur **non seuillé** $\hat\theta_n$ est **sans biais**. En revanche $\hat\theta_n^{(1)}\ge\hat\theta_n$, avec inégalité stricte sur $\{\hat\theta_n<0\}$, de probabilité $>0$ (contient $\{N_a=0\}$, de probabilité $(1-p_\theta)^n>0$) : $\mathbb{E}_\theta[\hat\theta_n^{(1)}]>\theta$, biais $=\mathbb{E}_\theta[-\hat\theta_n\mathbb{1}_{\{\hat\theta_n<0\}}]>0$. Par la loi binomiale de $N_a$ :
$$\mathbb{E}_\theta\big[\hat\theta_n^{(1)}\big]=\frac1{b-a}\sum_{k>na/b}\Big(\frac{bk}n-a\Big)\binom nk p_\theta^k(1-p_\theta)^{n-k},$$
   formule tracée sur la figure 1 (droite).
3. Moment exact associé à $T(x)=x$ :
$$e(\theta):=\mathbb{E}_\theta[X_1]=\int_{\mathbb{R}}xf_\theta(x)\,\mathrm{d}x=\theta\int_0^a\frac xa\,\mathrm{d}x+(1-\theta)\int_0^b\frac xb\,\mathrm{d}x=\theta\frac a2+(1-\theta)\frac b2,$$
   soit $e(\theta)=\frac b2-\theta\frac{b-a}2$. L'équation $e(\vartheta)=\bar X_n$ a une unique solution réelle
$$\tilde\theta_n:=\frac{b-2\bar X_n}{b-a},$$
   qui n'appartient pas nécessairement à $]0,1[$ : $\tilde\theta_n\in]0,1[$ ssi $a/2<\bar X_n<b/2$. Rien n'impose cela à $n$ fixé (ex. : toutes les observations $<a/2$, probabilité $F_\theta(a/2)^n>0$, alors $\tilde\theta_n\ge1$). L'estimateur des moments au sens de la Déf. 1.2 n'est défini que sur $\{a/2<\bar X_n<b/2\}$, de probabilité $\to1$ car $\bar X_n\xrightarrow{\mathbb{P}_\theta\text{-prob}}e(\theta)\in]a/2,b/2[$ (Prop. 1.1). On retient l'estimateur **seuillé**
$$\hat\theta_n^{(2)}:=\begin{cases}0&\text{si }\tilde\theta_n\le0,\\ 1&\text{si }\tilde\theta_n\ge1,\\ \tilde\theta_n&\text{sinon.}\end{cases}$$
   *Biais :* $\mathbb{E}_\theta[\tilde\theta_n]=(b-2e(\theta))/(b-a)=\theta$ : $\tilde\theta_n$ sans biais, $\hat\theta_n^{(2)}$ pas en général.

*Analyses numériques* ($a=1$, $b=3$) :
- Densité constante par morceaux à $\theta$ fixé ; à $x$ fixé, croissante en $\theta$ sur $[0,a]$, décroissante sur $]a,b]$.
- $n_{\max}=200$ réalisations sous $\theta_{\mathrm{true}}=0{,}2$. Pour $n=10$ : $N_a/n=0{,}30\le a/b$, $\hat\theta_n=(3\times0{,}30-1)/2=-0{,}05<0$ : vraisemblance décroissante sur $]0,1[$, maximum sur $[0,1]$ au bord $\theta=0$. Pour $n=200$ : $N_a/n=0{,}525$, $\hat\theta_n=(3\times0{,}525-1)/2=0{,}2875$, maximum intérieur, différent de $\theta_{\mathrm{true}}$.
- Fonction $\vartheta\mapsto e(\vartheta)-\bar X_n=\vartheta a/2+(1-\vartheta)b/2-\bar X_n$ (aléatoire via $\bar X_n$) : pour $n=10$ le zéro est négatif ; pour $n=200$ l'estimateur existe, unique, différent de $\theta_{\mathrm{true}}$.
- Biais $\theta\mapsto\mathbb{E}_\theta[\hat\theta_n^{(1)}]-\theta$ : positif, plus faible pour $n$ grand.
- $N=5000$ répétitions : MV-2 et Mom-2 (seuillés) dans $[0,1]$ ; le seuillage intervient fréquemment pour $n=10$ ; pour $n=200$, il n'intervient plus (sur ces réalisations) que pour l'estimateur des moments.

**Méthodes mobilisées :** vraisemblance d'un mélange (dépend de $N_a$ seul), **EMV par annulation du score** + étude de signe + cas au bord, **prolongement du modèle à $[0,1]$ / seuillage**, loi binomiale, LGN, **méthode des moments** d'ordre 1, calcul de **biais** (sans biais avant seuillage, biaisé après).
**Pièges :** l'EMV peut ne pas exister dans l'ouvert $]0,1[$ ; seuiller introduit un biais ; EMV ≠ EMM ici.

### 4.4 Exercice 3 — Famille exponentielle de densités (⋆⋆⋆) [Groupe 1, traité en PC]
**Source :** Poly ch.2, Exercices, Exercice 3, p. 36–37 ; corrigé p. 44–47.
**Objectif :** définir les familles exponentielles et établir que l'EMV est un estimateur des moments (observé pour Bernoulli, Poisson) ; la dernière question fait jouer l'invariance (Prop. 1.2). Q2(b)(c) : Hölder, dérivation sous l'intégrale par convergence dominée.

**Énoncé complet.** $(\mathsf{X},\mathcal{X})$ espace mesurable ($\mathsf{X}=\mathbb{R}^k$ ou $\mathbb{N}^k$), $\mu$ $\sigma$-finie, $T:\mathsf{X}\to\mathbb{R}$ et $h:\mathsf{X}\to\mathbb{R}_+$ mesurables. **Modèle exponentiel canonique** associé à $(T,h)$ : densités par rapport à $\mu$
$$x\mapsto q_\eta(x)=h(x)\exp\big(\eta T(x)-A(\eta)\big),\qquad x\in\mathsf{X},\tag{4}$$
$$A(\eta):=\log\int h(x)\exp(\eta T(x))\,\mu(\mathrm{d}x).\tag{5}$$
**Espace des paramètres naturels** : $\Xi:=\{\eta\in\mathbb{R}:\ \lvert A(\eta)\rvert<\infty\}$. Plus généralement, **famille exponentielle** : densités $x\mapsto p_\theta(x)=h(x)\exp(\varphi(\theta)T(x)-B(\theta))$ par rapport à $\mu$ $\sigma$-finie sur $\mathbb{R}$ ou $\mathbb{N}$, valeurs admissibles $\Theta:=\{\theta\in\mathbb{R}:\ \int h(x)\exp(\varphi(\theta)T(x))\,\mu(\mathrm{d}x)<\infty\}$.
1. Les lois suivantes sont-elles dans la famille exponentielle ; canoniques ?
   (a) exponentielle $p_\eta(x)=\eta\exp(-\eta x)\mathbb{1}_{\mathbb{R}_+}(x)$ sur $\mathbb{R}$ (préciser l'espace des paramètres naturels) ;
   (b) $\mathcal{N}(\eta,1)$ sur $\mathbb{R}$ (idem) ;
   (c) $\alpha>0$ fixé : Weibull d'échelle $\lambda>0$, $q_\lambda(x)=\frac\alpha\lambda\big(\frac x\lambda\big)^{\alpha-1}\exp(-(x/\lambda)^\alpha)$, $x>0$ (idem) ;
   (d) Poisson : $\varphi(\theta)=\log\theta$, $B(\theta)=\theta$, $T(x)=x$, $h(x)=1/x!$ ; préciser le modèle canonique ;
   (e) binomiale : $\varphi(\theta)=\log\frac\theta{1-\theta}$, $B(\theta)=-n\log(1-\theta)$, $T(x)=x$, $h(x)=\binom nx$ ; préciser le modèle canonique.
2. Propriétés des modèles canoniques.
   (a) Si l'espace des paramètres est ouvert, $A$ régulière et dérivée/intégrale permutables : relation entre $A'(\eta)$, $A''(\eta)$ et espérance/variance de $T(X)$ sous $q_\eta$ ?
   (b) Montrer que $\eta\mapsto A(\eta)$ est convexe et que $\Xi$ est convexe.
   (c) On suppose $\Xi$ intervalle ouvert ; $G(\eta):=\int h(x)\exp(\eta T(x))\,\mu(\mathrm{d}x)$. Montrer que $G$ est $C^\infty$ sur $\Xi$ et $G^{(k)}(\eta)=\int h(x)T^k(x)\exp(\eta T(x))\,\mu(\mathrm{d}x)$.
   (d) $n$-échantillon du modèle canonique : i. estimateur des moments associé à $T$ ; ii. EMV. Que remarque-t-on ?
3. Modèle exponentiel général, $\Theta$ intervalle ouvert, $\varphi$ difféomorphisme de $\Theta$ sur $\Xi$ ; $n$-échantillon de $(\mathsf{X},\mathcal{X},\{p_\theta\cdot\mu:\ \theta\in\Theta\})$. Déterminer l'estimateur solution des équations de vraisemblance (utiliser la paramétrisation canonique).

**Corrigé complet (p. 44–47).** On note $G(\eta):=\int h(x)\exp(\eta T(x))\,\mu(\mathrm{d}x)\in[0,+\infty]$, $A=\log G$ ($\log0=-\infty$, $\log(+\infty)=+\infty$).
1. (a) $\mathsf{X}=\mathbb{R}$, $\mu=\mathrm{Leb}$, $h=\mathbb{1}_{\mathbb{R}_+}$, $T(x)=-x$ : $G(\eta)=\int_0^{+\infty}\mathrm{e}^{-\eta x}\mathrm{d}x=1/\eta$ si $\eta>0$, $+\infty$ sinon : $\Xi=]0,+\infty[$, $A(\eta)=-\log\eta$, $h(x)\exp(\eta T(x)-A(\eta))=\eta\mathrm{e}^{-\eta x}\mathbb{1}_{\mathbb{R}_+}(x)$ : **canonique**.
   (b) $\frac1{\sqrt{2\pi}}\exp\big(-\frac{(x-\eta)^2}2\big)=\frac1{\sqrt{2\pi}}\mathrm{e}^{-x^2/2}\exp\big(\eta x-\frac{\eta^2}2\big)$ ; $\mu=\mathrm{Leb}$, $h(x)=(2\pi)^{-1/2}\mathrm{e}^{-x^2/2}$, $T(x)=x$ ; $x^2-2\eta x=(x-\eta)^2-\eta^2$ ⇒ $G(\eta)=\mathrm{e}^{\eta^2/2}$ : $\Xi=\mathbb{R}$, $A(\eta)=\eta^2/2$, **canonique**.
   (c) Pour $x>0$ : $q_\lambda(x)=\alpha x^{\alpha-1}\lambda^{-\alpha}\exp(-\lambda^{-\alpha}x^\alpha)=h(x)\exp(\varphi(\lambda)T(x)-B(\lambda))$ avec $h(x)=\alpha x^{\alpha-1}\mathbb{1}_{]0,+\infty[}(x)$, $T(x)=-x^\alpha$, $\varphi(\lambda)=\lambda^{-\alpha}$, $B(\lambda)=\alpha\log\lambda$ : famille exponentielle **non canonique en $\lambda$** (sauf $\alpha=1$, lois exponentielles). Canonique via $\eta=\lambda^{-\alpha}$ : changement de variable $u=x^\alpha$ ⇒ $G(\eta)=\int_0^{+\infty}\alpha x^{\alpha-1}\mathrm{e}^{-\eta x^\alpha}\mathrm{d}x=\int_0^{+\infty}\mathrm{e}^{-\eta u}\mathrm{d}u$ $=1/\eta$ si $\eta>0$, $+\infty$ sinon : $\Xi=]0,+\infty[$, $A(\eta)=-\log\eta$.
   (d) $p_\theta(k)=\mathrm{e}^{-\theta}\frac{\theta^k}{k!}=\frac1{k!}\exp(k\log\theta-\theta)$ : $h(k)=1/k!$, $T(k)=k$, $\varphi(\theta)=\log\theta$, $B(\theta)=\theta$, $\Theta=]0,+\infty[$. Canonique : $\eta=\log\theta\in\mathbb{R}$, $G(\eta)=\sum_{k\in\mathbb{N}}\mathrm{e}^{\eta k}/k!=\exp(\mathrm{e}^\eta)<\infty$, $\Xi=\mathbb{R}$, $A(\eta)=\mathrm{e}^\eta=B(\mathrm{e}^\eta)$, $q_\eta(k)=\frac1{k!}\exp(\eta k-\mathrm{e}^\eta)$.
   (e) $p_\theta(k)=\binom nk\theta^k(1-\theta)^{n-k}=\binom nk\exp\big(k\log\frac\theta{1-\theta}+n\log(1-\theta)\big)$ : $h(k)=\binom nk$, $T(k)=k$, $\varphi(\theta)=\log(\theta/(1-\theta))$, $B(\theta)=-n\log(1-\theta)$, $\Theta=]0,1[$, $\mu$ comptage sur $\{0,\dots,n\}$. Canonique : $\eta=\log(\theta/(1-\theta))$, $\theta=\mathrm{e}^\eta/(1+\mathrm{e}^\eta)$ ; $G(\eta)=\sum_{k=0}^n\binom nk\mathrm{e}^{\eta k}=(1+\mathrm{e}^\eta)^n$, $\Xi=\mathbb{R}$, $A(\eta)=n\log(1+\mathrm{e}^\eta)=B\big(\mathrm{e}^\eta/(1+\mathrm{e}^\eta)\big)$.
2. (a) Si on peut dériver deux fois sous l'intégrale : $G'(\eta)=\int hT\mathrm{e}^{\eta T}\mathrm{d}\mu$, $G''(\eta)=\int hT^2\mathrm{e}^{\eta T}\mathrm{d}\mu$ ; comme $q_\eta=h\mathrm{e}^{\eta T}/G(\eta)$ :
$$A'(\eta)=\frac{G'(\eta)}{G(\eta)}=\int Tq_\eta\,\mathrm{d}\mu=\mathbb{E}_\eta[T(X)],\qquad A''(\eta)=\frac{G''(\eta)}{G(\eta)}-\Big(\frac{G'(\eta)}{G(\eta)}\Big)^2=\mathbb{E}_\eta[T(X)^2]-\mathbb{E}_\eta[T(X)]^2=\mathrm{Var}_\eta(T(X)).$$
   (c) justifie ces dérivations quand $\Xi$ est un intervalle ouvert.
   (b) Si $\Xi=\emptyset$, rien à montrer. Sinon, $\eta_0\in\Xi$ : $0<G(\eta_0)<\infty$ impose $\mu(\{h>0\})>0$ ; pour tout $\eta$, $h\mathrm{e}^{\eta T}>0$ sur $\{h>0\}$ ⇒ $G(\eta)>0$, $A(\eta)>-\infty$ : $\Xi=\{\eta:\ A(\eta)<+\infty\}$. Pour $\eta_1,\eta_2\in\Xi$, $\lambda\in]0,1[$, **inégalité de Hölder** (exposants conjugués $1/\lambda$ et $1/(1-\lambda)$) appliquée à $(h\mathrm{e}^{\eta_1T})^\lambda$ et $(h\mathrm{e}^{\eta_2T})^{1-\lambda}$ :
$$G(\lambda\eta_1+(1-\lambda)\eta_2)=\int\big(h\mathrm{e}^{\eta_1T}\big)^\lambda\big(h\mathrm{e}^{\eta_2T}\big)^{1-\lambda}\mathrm{d}\mu\le\Big(\int h\mathrm{e}^{\eta_1T}\mathrm{d}\mu\Big)^\lambda\Big(\int h\mathrm{e}^{\eta_2T}\mathrm{d}\mu\Big)^{1-\lambda}=G(\eta_1)^\lambda G(\eta_2)^{1-\lambda}<\infty;$$
   en passant au log : $A(\lambda\eta_1+(1-\lambda)\eta_2)\le\lambda A(\eta_1)+(1-\lambda)A(\eta_2)<+\infty$ ⇒ $\Xi$ convexe et $A$ convexe.
   (c) $\eta\in\Xi$, $\Xi$ ouvert ⇒ $\exists\varepsilon>0$, $\eta\pm\varepsilon\in\Xi$. De $\mathrm{e}^{\varepsilon\lvert T\rvert}\le\mathrm{e}^{\varepsilon T}+\mathrm{e}^{-\varepsilon T}$ :
$$\int h\,\mathrm{e}^{\varepsilon\lvert T\rvert}\mathrm{e}^{\eta T}\,\mathrm{d}\mu\le G(\eta+\varepsilon)+G(\eta-\varepsilon)<\infty.\tag{6}$$
   Pour $m\ge0$, $C_m:=\sup_{u\ge0}u^m\mathrm{e}^{-\varepsilon u/2}<\infty$ et $\lvert T\rvert^m\mathrm{e}^{\varepsilon\lvert T\rvert/2}\le C_m\mathrm{e}^{\varepsilon\lvert T\rvert}$ ; avec (6) :
$$\int h\,\lvert T\rvert^m\mathrm{e}^{\varepsilon\lvert T\rvert/2}\mathrm{e}^{\eta T}\,\mathrm{d}\mu<\infty,\qquad m\in\mathbb{N}.\tag{7}$$
   Donc $h\lvert T\rvert^m\mathrm{e}^{\eta T}$ intégrable ; on pose $G_m(\eta):=\int hT^m\mathrm{e}^{\eta T}\mathrm{d}\mu$, $G_0=G$. Pour $0<\lvert s\rvert\le\varepsilon/2$ :
$$\frac{G_m(\eta+s)-G_m(\eta)}s=\int hT^m\mathrm{e}^{\eta T}\frac{\mathrm{e}^{sT}-1}s\,\mathrm{d}\mu.$$
   L'intégrande converge vers $hT^{m+1}\mathrm{e}^{\eta T}$ ; **accroissements finis** pour $u\mapsto\mathrm{e}^u$ : $\lvert\mathrm{e}^{sT(x)}-1\rvert\le\lvert s\rvert\lvert T(x)\rvert\mathrm{e}^{\lvert s\rvert\lvert T(x)\rvert}$, donc $\big\lvert hT^m\mathrm{e}^{\eta T}\frac{\mathrm{e}^{sT}-1}s\big\rvert\le h\lvert T\rvert^{m+1}\mathrm{e}^{\varepsilon\lvert T\rvert/2}\mathrm{e}^{\eta T}$, intégrable par (7), indépendante de $s$. **Convergence dominée** (le long de toute suite $s_j\to0$) : $G_m'(\eta)=G_{m+1}(\eta)$. Par récurrence, $G$ est $C^\infty$ et $G^{(k)}=G_k$. $G>0$ sur $\Xi$ ⇒ $A=\log G$ est $C^\infty$, $A'=G'/G$, $A''=G''/G-(G'/G)^2$ (formules de (a) établies).
   (d) i. $e(\eta)=\mathbb{E}_\eta[T(X_1)]=\int Tq_\eta\,\mathrm{d}\mu=G'(\eta)/G(\eta)=A'(\eta)$ (bien défini par (7)). Estimateur des moments associé à $T$ : la solution $\eta\in\Xi$ (si elle existe et est unique) de
$$A'(\eta)=\bar T_n,\qquad\bar T_n:=\frac1n\sum_{k=1}^nT(X_k).$$
   ii. Densité du $n$-échantillon par rapport à $\mu^{\otimes n}$ : $(x_1,\dots,x_n)\mapsto\prod_{k=1}^nh(x_k)\exp\big(\eta\sum_{k=1}^nT(x_k)-nA(\eta)\big)$ ; sur $\Xi$,
$$\ell_n(\eta)=\frac1n\sum_{k=1}^n\log h(X_k)+\eta\bar T_n-A(\eta),$$
   $\log h(X_k)$ fini p.s. ($\mathbb{P}_\eta(h(X_1)=0)=\int_{\{h=0\}}q_\eta\,\mathrm{d}\mu=0$). Par (c), $\ell_n$ est $C^\infty$, $\ell_n'(\eta)=\bar T_n-A'(\eta)$, $\ell_n''(\eta)=-A''(\eta)=-\mathrm{Var}_\eta(T(X_1))\le0$. Variance nulle ssi $T$ constante $q_\eta\cdot\mu$-p.s., i.e. $\mu$-p.p. sur $\{h>0\}$ (indépendant de $\eta$) : cas dégénéré, $A$ affine, $q_\eta$ indépendant de $\eta$, modèle non identifiable, tout point maximise. Sinon $\ell_n''<0$ : $\ell_n$ **strictement concave** sur $\Xi$, $A'$ continue strictement croissante ; par le **Lemme 2.3**, l'équation $A'(\eta)=\bar T_n$ a au plus une solution, qui (si elle existe) est l'unique EMV ; elle existe ssi $\bar T_n\in A'(\Xi)$ (intervalle ouvert) ; sinon pas de maximum sur $\Xi$ (un maximum intérieur serait un point critique). **Remarque : l'équation de vraisemblance est l'équation des moments** : dans un modèle exponentiel canonique, l'EMV et l'estimateur des moments associé à $T$ existent simultanément et **coïncident** (Bernoulli Ex. 1.8, Poisson Ex. 1.9, gaussien Ex. 1.10).
3. $\int p_\theta\,\mathrm{d}\mu=1$ impose $\mathrm{e}^{B(\theta)}=\int h\mathrm{e}^{\varphi(\theta)T}\mathrm{d}\mu=G(\varphi(\theta))$, i.e. $B=A\circ\varphi$ sur $\Theta$. $\varphi$ difféomorphisme ⇒ dérivable, $\varphi'\ne0$, $B'=(A'\circ\varphi)\varphi'$. Densité de l'échantillon : $\prod_kh(x_k)\exp\big(\varphi(\theta)\sum_kT(x_k)-nB(\theta)\big)$, et
$$\tilde\ell_n(\theta)=\frac1n\sum_{k=1}^n\log h(X_k)+\varphi(\theta)\bar T_n-B(\theta)=\ell_n(\varphi(\theta)).$$
   Équation de vraisemblance $\tilde\ell_n'(\theta)=\varphi'(\theta)\bar T_n-B'(\theta)=0$, soit (division par $\varphi'(\theta)\ne0$)
$$\frac{B'(\theta)}{\varphi'(\theta)}=\bar T_n\quad\text{soit}\quad A'(\varphi(\theta))=\bar T_n.$$
   Solution $\hat\theta_n=\varphi^{-1}(\hat\eta_n)$ où $\hat\eta_n$ résout $A'(\eta)=\bar T_n$ dans $\Xi$ ; existence/unicité équivalentes. $\tilde\ell_n=\ell_n\circ\varphi$ avec $\varphi$ bijective : les maxima de $\tilde\ell_n$ sont les images réciproques par $\varphi$ de ceux de $\ell_n$ — **invariance par reparamétrisation** (Prop. 1.2). Poisson : $A'(\eta)=\mathrm{e}^\eta$ ⇒ $\hat\theta_n=\mathrm{e}^{\hat\eta_n}=\bar X_n$ (Ex. 1.9) ; binomiale à $m$ essais (le $n$ de 1(e)) : $A'(\eta)=m\mathrm{e}^\eta/(1+\mathrm{e}^\eta)$ ⇒ $\hat\theta_n=\bar X_n/m$.

**Conclusion du poly (p. 37) :** (i) les modèles exponentiels s'écrivent sous forme de facteurs séparables en $x$ et en le paramètre $\varphi(\theta)$ (ou $\eta$) ; (ii) la représentation n'est pas unique, y compris le paramètre canonique ($\eta T(x)=(\lambda\eta)(T(x)/\lambda)$) ; (iii) version simplifiée : en général paramètre vectoriel, $\sum_{j=1}^q\varphi_j(\theta)T_j(x)$ ; ex. $\mathcal{N}_d(\mu,\Sigma)$, $\Sigma$ inversible :
$$\exp\Big(-\frac12(x-\mu)^T\Sigma^{-1}(x-\mu)\Big)\propto\exp\Big(-\frac12\big(x^T\Sigma^{-1}x-2\mu^T\Sigma^{-1}x\big)\Big)=\exp\Big(-\frac12\mathrm{Tr}\big(\Sigma^{-1}xx^T\big)+\mu^T\Sigma^{-1}x\Big)=\exp\Big(-\frac12\big\langle\Sigma^{-1},xx^T\big\rangle+\big\langle\Sigma^{-1}\mu,x\big\rangle\Big),$$
famille exponentielle canonique de dimension $q>1$ ; (iv) la plupart des modèles pratiques sont exponentiels (gaussien, log-normal, exponentiel, gamma, Bernoulli, Poisson…), chapitre « Famille exponentielle » du polycopié.

**Méthodes mobilisées :** mise sous forme exponentielle (identification de $h$, $T$, $\varphi$, $B$), calcul de la log-partition $A$, **dérivation sous l'intégrale (convergence dominée)**, **inégalité de Hölder** (convexité), **méthode des moments**, **EMV par annulation du score** + concavité stricte (Lemme 2.3), **invariance par reparamétrisation**.
**Pièges :** $A'$ = espérance, $A''$ = variance ; EMV n'existe que si $\bar T_n\in A'(\Xi)$ (ex. Poisson avec $\bar X_n=0$).

### 4.5 Exercice 4 — Durée de vie (⋆⋆) [Groupe 2, bonus]
**Source :** Poly ch.2, Exercices, Exercice 4, p. 38 ; corrigé p. 48–49.
**Guide de lecture (p. 37) :** ne demande que le ch. 1 (modèle, identifiabilité) et des calculs sur la loi exponentielle ; l'observation supplémentaire de la cause de chaque panne rend identifiable un modèle qui ne l'était pas ; le corrigé se termine par l'EMV du modèle enrichi.

**Énoncé complet.** Un système ne fonctionne que si deux machines fonctionnent. Durées de vie des deux machines : lois exponentielles de paramètres $\lambda_0$, $\lambda_1>0$, indépendantes.
1. Montrer que $X\sim\mathcal{E}(\lambda)$ ssi $\forall x>0$, $\mathbb{P}(X>x)=\exp(-\lambda x)$.
Modèle : $\big(\mathbb{R}_+^2,\mathcal{B}(\mathbb{R}_+^2),\{\mathbb{P}_\theta=\mathcal{E}(\lambda_0)\otimes\mathcal{E}(\lambda_1),\ \theta=(\lambda_0,\lambda_1)\in(\mathbb{R}_+^\star)^2\}\big)$.
2. Probabilité que le système ne tombe pas en panne avant $t$ ; loi de la durée de vie $Z$ du système. Le système tombe en panne : probabilité que ce soit dû à la machine 1.
3. $I=1$ si la panne est due à la machine 1, $0$ sinon. Calculer $\mathbb{P}_\theta(Z>t;I=\delta)$ pour $t\ge0$, $\delta\in\{0,1\}$. En déduire que $Z$ et $I$ sont indépendantes.
4. $n$ systèmes identiques indépendants, durées de vie $Z_1,\dots,Z_n$.
   (a) Écrire le modèle. $\lambda_0,\lambda_1$ identifiables ?
   (b) On observe $(Z_i,I_i)$, $I_i\in\{0,1\}$. Écrire le modèle. Identifiables ?

**Corrigé complet (p. 48–49).** $X_0$, $X_1$ durées de vie, indépendantes, $\mathcal{E}(\lambda_0)$, $\mathcal{E}(\lambda_1)$.
1. Si $X\sim\mathcal{E}(\lambda)$, $\mathbb{P}(X>x)=\int_x^{+\infty}\lambda\mathrm{e}^{-\lambda t}\mathrm{d}t=\mathrm{e}^{-\lambda x}$. Réciproquement, $F_X(x)=1-\mathrm{e}^{-\lambda x}$ pour $x>0$ ; **continuité à droite** : $F_X(0)=\lim_{x\downarrow0}F_X(x)=0$, et $F_X$ croissante positive ⇒ $F_X=0$ sur $]-\infty,0]$. $F_X$ coïncide avec la f.d.r. de $\mathcal{E}(\lambda)$ ; la f.d.r. caractérise la loi.
2. $Z=X_0\wedge X_1=\min(X_0,X_1)$. Pour $t>0$, par **indépendance** et Q1 : $\mathbb{P}_\theta(Z>t)=\mathbb{P}_\theta(X_0>t)\mathbb{P}_\theta(X_1>t)=\mathrm{e}^{-(\lambda_0+\lambda_1)t}$ ⇒ $Z\sim\mathcal{E}(\lambda_0+\lambda_1)$. $(X_0,X_1)$ a une densité, la diagonale est $\mathrm{Leb}^{\otimes2}$-négligeable : $\mathbb{P}_\theta(X_0=X_1)=0$. Panne due à la machine 1 sur $\{X_1<X_0\}$ :
$$\mathbb{P}_\theta(X_1<X_0)=\int_0^{+\infty}\lambda_1\mathrm{e}^{-\lambda_1x_1}\Big(\int_{x_1}^{+\infty}\lambda_0\mathrm{e}^{-\lambda_0x_0}\mathrm{d}x_0\Big)\mathrm{d}x_1=\int_0^{+\infty}\lambda_1\mathrm{e}^{-(\lambda_0+\lambda_1)x_1}\mathrm{d}x_1=\frac{\lambda_1}{\lambda_0+\lambda_1}$$
   (**Fubini** sur la densité produit).
3. $I=\mathbb{1}_{\{X_1<X_0\}}$. Pour $t\ge0$ :
$$\mathbb{P}_\theta(Z>t,I=1)=\mathbb{P}_\theta(t<X_1<X_0)=\int_t^{+\infty}\lambda_1\mathrm{e}^{-\lambda_1x_1}\mathrm{e}^{-\lambda_0x_1}\mathrm{d}x_1=\frac{\lambda_1}{\lambda_0+\lambda_1}\mathrm{e}^{-(\lambda_0+\lambda_1)t}=\mathbb{P}_\theta(I=1)\mathbb{P}_\theta(Z>t),$$
   et symétriquement $\mathbb{P}_\theta(Z>t,I=0)=\frac{\lambda_0}{\lambda_0+\lambda_1}\mathrm{e}^{-(\lambda_0+\lambda_1)t}=\mathbb{P}_\theta(I=0)\mathbb{P}_\theta(Z>t)$. Par complémentaire, $\mathbb{P}_\theta(Z\le t,I=\delta)=\mathbb{P}_\theta(I=\delta)\mathbb{P}_\theta(Z\le t)$ pour $t\ge0$ (et trivialement pour $t<0$). Les classes $\{\{Z\le t\},\ t\in\mathbb{R}\}$ et $\{\{I=0\},\{I=1\}\}$ sont stables par intersection finie et engendrent $\sigma(Z)$, $\sigma(I)$ : **lemme de classe monotone** ⇒ $Z$ et $I$ indépendantes.
4. (a) $Z_1,\dots,Z_n$ i.i.d. $\mathcal{E}(\lambda_0+\lambda_1)$ : modèle
$$\Big(\mathbb{R}_+^n,\mathcal{B}(\mathbb{R}_+^n),\big\{\mathcal{E}(\lambda_0+\lambda_1)^{\otimes n},\ \theta=(\lambda_0,\lambda_1)\in(\mathbb{R}_+^\ast)^2\big\}\Big),$$
   dominé par $\mathrm{Leb}^{\otimes n}$, densité $\prod_{i=1}^n(\lambda_0+\lambda_1)\mathrm{e}^{-(\lambda_0+\lambda_1)z_i}\mathbb{1}_{\mathbb{R}_+}(z_i)$. La loi ne dépend de $\theta$ que via $\lambda_0+\lambda_1$ : pour $0<\tau<\lambda_1$, $(\lambda_0,\lambda_1)$ et $(\lambda_0+\tau,\lambda_1-\tau)$ donnent la même loi : **non identifiable** (seule la somme l'est).
   (b) Pour $A\in\mathcal{B}(\mathbb{R}_+)$, $\delta\in\{0,1\}$, par indépendance (Q3) :
$$\mathbb{P}_\theta(Z\in A,I=\delta)=\int_A(\lambda_0+\lambda_1)\mathrm{e}^{-(\lambda_0+\lambda_1)z}\mathrm{d}z\times\frac{\lambda_\delta}{\lambda_0+\lambda_1}=\int_A\lambda_\delta\mathrm{e}^{-(\lambda_0+\lambda_1)z}\mathrm{d}z.$$
   Densité par rapport à $\mu:=\mathrm{Leb}\otimes\nu$ ($\nu$ comptage sur $\{0,1\}$) : $q_\theta(z,\delta)=\lambda_\delta\mathrm{e}^{-(\lambda_0+\lambda_1)z}\mathbb{1}_{\mathbb{R}_+}(z)$. Modèle : $n$-échantillon de $\big(\mathbb{R}_+\times\{0,1\},\mathcal{B}(\mathbb{R}_+)\otimes\mathcal{P}(\{0,1\}),\{q_\theta\cdot\mu,\ \theta\in\Theta\}\big)$, i.e. $\big((\mathbb{R}_+\times\{0,1\})^n,(\mathcal{B}(\mathbb{R}_+)\otimes\mathcal{P}(\{0,1\}))^{\otimes n},\{(q_\theta\cdot\mu)^{\otimes n},\ \theta\in\Theta\}\big)$. **Identifiable** : même loi ⇒ même loi de $I_1$ et de $Z_1$ ⇒ $\frac{\lambda_1}{\lambda_0+\lambda_1}=\frac{\lambda_1'}{\lambda_0'+\lambda_1'}$ et $\mathcal{E}(\lambda_0+\lambda_1)=\mathcal{E}(\lambda_0'+\lambda_1')$ ⇒ $\lambda_0+\lambda_1=\lambda_0'+\lambda_1'$ (espérance $1/\lambda$) ⇒ $\lambda_1=\lambda_1'$ puis $\lambda_0=\lambda_0'$.

*Complément : estimation dans le second modèle.* $N_\delta:=\sum_{i=1}^n\mathbb{1}_{\{I_i=\delta\}}$ ($N_0+N_1=n$), $\bar Z_n:=n^{-1}\sum_iZ_i>0$ p.s. Pour $\vartheta=(l_0,l_1)$ :
$$\mathrm{L}_n(\vartheta)=\prod_{i=1}^nl_{I_i}\mathrm{e}^{-(l_0+l_1)Z_i}=l_0^{N_0}l_1^{N_1}\mathrm{e}^{-(l_0+l_1)n\bar Z_n},\qquad\ell_n(\vartheta)=\frac{N_0}n\log l_0+\frac{N_1}n\log l_1-(l_0+l_1)\bar Z_n.$$
Somme de deux fonctions d'une variable $l_\delta\mapsto\frac{N_\delta}n\log l_\delta-l_\delta\bar Z_n$ : si $N_\delta>0$, strictement concave, dérivée $N_\delta/(nl_\delta)-\bar Z_n$ nulle en $l_\delta=N_\delta/(n\bar Z_n)$ seulement (Lemme 2.3) ; si $N_\delta=0$, $l_\delta\mapsto-l_\delta\bar Z_n$ strictement décroissante, pas de maximum. Sur $\{N_0>0,N_1>0\}$ (probabilité $\to1$ car $\mathbb{P}_\theta(N_\delta=0)=(1-\mathbb{P}_\theta(I=\delta))^n\to0$), l'EMV existe, est unique :
$$\hat\lambda_\delta=\frac{N_\delta}{\sum_{i=1}^nZ_i},\qquad\delta\in\{0,1\}:$$
nombre de pannes imputables à la machine $\delta$ rapporté à la durée totale de fonctionnement observée.
**Méthodes mobilisées :** caractérisation par la fonction de survie, minimum d'exponentielles indépendantes, Fubini, **indépendance via classes stables par intersection (classe monotone)**, **identifiabilité**, densité par rapport à une mesure produit $\mathrm{Leb}\otimes\nu$, **EMV par séparation des variables + annulation du score**.

### 4.6 Exercice 5 — Modèle auto-régressif (⋆⋆) [Groupe 2, bonus]
**Source :** Poly ch.2, Exercices, Exercice 5, p. 38 ; corrigé p. 50–51.
**Guide de lecture (p. 37–38) :** écrire la densité d'observations ni indépendantes ni de même loi à partir des lois conditionnelles successives, puis maximiser ; suppose acquis l'EMV gaussien (Ex. 1.10) et les vecteurs gaussiens ; à traiter après l'Exercice 1 (maximisation en deux temps).

**Énoncé complet.** $\theta:=(\phi,\sigma^2)\in\Theta:=\mathbb{R}\times\mathbb{R}_+^\star$. Observation $Z=(X_1,\dots,X_n)$ qui, sous $p_\theta\cdot\mathrm{dLeb}^{\otimes n}$, vérifie : pour tout $1\le k\le n$, la loi conditionnelle de $X_k$ sachant $(X_1,\dots,X_{k-1})$ est $\mathcal{N}(\phi X_{k-1},\sigma^2)$ ; convention $X_0=0$.
1. Écrire le modèle statistique engendré par $Z$.
2. Déterminer l'EMV de $\theta=(\phi,\sigma^2)$.

**Corrigé complet (p. 50–51).** Les observations ne sont ni indépendantes ni de même loi : la vraisemblance s'étend à tout modèle dominé (densité de l'observation vue comme fonction du paramètre ; cf. compléments, Ex. 4.7). $g_v(u):=(2\pi v)^{-1/2}\exp(-u^2/(2v))$ densité de $\mathcal{N}(0,v)$. On suppose **$n\ge2$** (avec $X_1\sim\mathcal{N}(0,\sigma^2)$ seule, $\phi$ n'intervient pas).
1. Montrons que sous $\mathbb{P}_\theta$, $Z$ a pour densité par rapport à $\mathrm{Leb}^{\otimes n}$ (avec $x_0:=0$)
$$p_\theta(x_1,\dots,x_n):=\prod_{k=1}^ng_{\sigma^2}(x_k-\phi x_{k-1})=\frac1{(2\pi\sigma^2)^{n/2}}\exp\Big(-\frac1{2\sigma^2}\sum_{k=1}^n(x_k-\phi x_{k-1})^2\Big).\tag{8}$$
   *Méthode de la fonction muette.* $f_1,\dots,f_n$ mesurables bornées. $\mathbb{E}_\theta[f_n(X_n)\mid X_1,\dots,X_{n-1}]=\int_{\mathbb{R}}f_n(x_n)g_{\sigma^2}(x_n-\phi X_{n-1})\,\mathrm{d}x_n=:\tilde f_{n-1}(X_{n-1})$ p.s. (fonction mesurable bornée). **Conditionnement successif** :
$$\mathbb{E}_\theta\Big[\prod_{k=1}^nf_k(X_k)\Big]=\mathbb{E}_\theta\Big[\prod_{k=1}^{n-1}f_k(X_k)\,\mathbb{E}_\theta\big[f_n(X_n)\mid X_1,\dots,X_{n-1}\big]\Big]=\mathbb{E}_\theta\Big[\prod_{k=1}^{n-2}f_k(X_k)\,\big(f_{n-1}\tilde f_{n-1}\big)(X_{n-1})\Big],$$
   même forme avec $n-1$ facteurs. En itérant, et puisque $X_1\sim\mathcal{N}(\phi X_0,\sigma^2)=\mathcal{N}(0,\sigma^2)$ :
$$\mathbb{E}_\theta\Big[\prod_{k=1}^nf_k(X_k)\Big]=\int_{\mathbb{R}^n}\prod_{k=1}^nf_k(x_k)\prod_{k=1}^ng_{\sigma^2}(x_k-\phi x_{k-1})\,\mathrm{d}x_1\cdots\mathrm{d}x_n=\int_{\mathbb{R}^n}\prod_{k=1}^nf_k(x_k)\,p_\theta(x)\,\mathrm{d}x.$$
   Avec $f_k=\mathbb{1}_{A_k}$ : $\mathbb{P}_\theta(Z\in A_1\times\dots\times A_n)=\int_{A_1\times\dots\times A_n}p_\theta\,\mathrm{dLeb}^{\otimes n}$ ; avec $A_k=\mathbb{R}$, $p_\theta$ est d'intégrale 1. Égalité sur les pavés (classe stable par intersection engendrant $\mathcal{B}(\mathbb{R}^n)$) ⇒ égalité des lois (**classe monotone**). Modèle :
$$\Big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\big\{p_\theta\cdot\mathrm{Leb}^{\otimes n},\ \theta=(\phi,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^\ast\big\}\Big).$$
   *Lecture matricielle.* $M:=I_n-\phi J$, $J$ matrice de décalage ($(Jx)_k=x_{k-1}$, $x_0=0$) : $M$ triangulaire inférieure, 1 sur la diagonale, $-\phi$ sur la sous-diagonale, $(Mx)_k=x_k-\phi x_{k-1}$. $\sum_k(x_k-\phi x_{k-1})^2=\lVert Mx\rVert^2=x^TM^TMx$ avec
$$M^TM=\begin{pmatrix}1+\phi^2&-\phi&0&\cdots&0\\ -\phi&1+\phi^2&-\phi&\ddots&\vdots\\ 0&-\phi&\ddots&\ddots&0\\ \vdots&\ddots&\ddots&1+\phi^2&-\phi\\ 0&\cdots&0&-\phi&1\end{pmatrix}.$$
   $\det M=1$ ⇒ $\Sigma:=(M^TM)^{-1}=M^{-1}(M^{-1})^T$ symétrique définie positive de déterminant 1 et $p_\theta(x)=(2\pi\sigma^2)^{-n/2}\exp(-x^T(\sigma^2\Sigma)^{-1}x/2)$ : densité de $\mathcal{N}(0,\sigma^2\Sigma)$ (Prop. 2.7 du ch. 1) : $Z$ vecteur gaussien centré de covariance $\sigma^2\Sigma$. $J$ nilpotente ($J^n=0$) ⇒ $A:=M^{-1}=\sum_{j=0}^{n-1}\phi^jJ^j$, triangulaire inférieure, $A_{kj}=\phi^{k-j}$ pour $k\ge j$.
   *Représentation par un bruit gaussien.* $\xi_1,\dots,\xi_n$ i.i.d. $\mathcal{N}(0,1)$, $X_0=0$, $X_k=\phi X_{k-1}+\sigma\xi_k$ : $(X_1,\dots,X_{k-1})$ fonction de $(\xi_1,\dots,\xi_{k-1})$, indépendante de $\xi_k$ ⇒ loi conditionnelle $\mathcal{N}(\phi X_{k-1},\sigma^2)$ : réalise le modèle. En itérant, $X_k=\sigma\sum_{j=1}^k\phi^{k-j}\xi_j$, $Z=\sigma A\xi$, $\xi\sim\mathcal{N}(0,I_n)$, et (Prop. 2.4 du ch. 1) $Z\sim\mathcal{N}(0,\sigma^2AA^T)=\mathcal{N}(0,\sigma^2\Sigma)$.
2. Pour $\vartheta=(a,v)\in\Theta$, d'après (8) :
$$\ell_n(\vartheta)=-\frac12\log(2\pi v)-\frac1{2nv}Q(a),\qquad Q(a):=\sum_{k=1}^n(X_k-aX_{k-1})^2=\sum_{k=1}^nX_k^2-2a\sum_{k=1}^nX_kX_{k-1}+a^2\sum_{k=1}^nX_{k-1}^2.$$
   Comme à l'exercice 1 : $D:=\sum_{k=1}^nX_{k-1}^2=\sum_{k=1}^{n-1}X_k^2$ ; $X_1\ne0$ p.s. (densité), donc $D>0$ p.s. pour $n\ge2$. À $v$ fixé, minimiser le trinôme $Q$ (coefficient dominant $D>0$) :
$$\hat\phi_n:=\frac{\sum_{k=1}^nX_kX_{k-1}}{\sum_{k=1}^nX_{k-1}^2}=\frac{\sum_{k=2}^nX_kX_{k-1}}{\sum_{k=1}^{n-1}X_k^2}.$$
   $S:=Q(\hat\phi_n)/n$ ; $Q(\hat\phi_n)=0$ ssi $X_k=\hat\phi_nX_{k-1}$ pour tout $k$, ce qui impose $X_1=0$ : $S>0$ p.s. $v\mapsto\ell_n(\hat\phi_n,v)=-\frac12\log(2\pi v)-S/(2v)$, dérivée $(S-v)/(2v^2)$ : maximum en $v=S$ seulement. $\ell_n(a,v)\le\ell_n(\hat\phi_n,v)\le\ell_n(\hat\phi_n,S)$, égalité ssi $(a,v)=(\hat\phi_n,S)$. P.s., l'EMV existe, est unique :
$$\big(\hat\phi_n,\hat\sigma_n^2\big)\quad\text{avec}\quad\hat\sigma_n^2:=\frac1n\sum_{k=1}^n\big(X_k-\hat\phi_nX_{k-1}\big)^2.$$
   $\hat\phi_n$ est le coefficient des moindres carrés de la régression sans constante de $X_k$ sur $X_{k-1}$ : formule de l'exercice 1 où $x_i$ est remplacé par l'observation précédente (aléatoire). Cette dépendance distingue les séries temporelles de la régression : la loi de $\hat\phi_n$ ne s'obtient plus par Cochran (hors cadre du chapitre).
   *Note du poly :* le corrigé distribué en 2025 donnait $\hat\phi_n$ avec le dénominateur $\sum_{k=1}^nX_k^2$ ; l'annulation de la dérivée de $Q$ conduit à $\sum_{k=1}^nX_{k-1}^2$. La représentation par bruit y était écrite avec $\xi_k$ de loi $\mathcal{N}(0,1)$ puis $\mathcal{N}(0,\sigma^2)$ ; ici $\xi_k\sim\mathcal{N}(0,1)$ et facteur $\sigma$ explicite.
**Méthodes mobilisées :** densité d'un processus par **conditionnements successifs** (fonction muette, classe monotone), vecteur gaussien (lecture matricielle), **maximisation en deux temps** (trinôme en $a$, puis $v$), moindres carrés.

---

## 5. Hors programme / compléments

> Section « 4 Les compléments » (p. 52–59) : **« Les contenus de cette partie ne sont pas exigibles »** ; ils prolongent les fondamentaux sur des modèles moins standards et donnent les énoncés complets de résultats dont seule une partie a été utilisée. Extraction concise.

### Exemple 4.1 — Estimateur des moments du modèle de Cauchy (méthode des moments sans moments)
**Source :** Poly ch.2, Compléments, Exemple 4.1, p. 52 — *hors programme*
**Idée :** la méthode des moments n'exige pas de moments : il suffit d'une fonction $T$ **bornée** dont l'espérance dépend du paramètre de façon inversible.
**Résultat :** modèle $\big(\mathbb{R},\mathcal{B}(\mathbb{R}),\{\mathrm{Cauchy}(\theta),\ \theta\in\Theta=\mathbb{R}\}\big)$, $q_\theta(x)=\dfrac1{\pi\big(1+(x-\theta)^2\big)}$ ; aucun moment d'ordre $k\ge1$ ($\int\lvert x\rvert^kq_\theta=+\infty$). Avec $T(x)=\mathrm{signe}(x)$ et $F(t)=\frac1\pi\arctan(t)+\frac12$ (f.d.r. de Cauchy(0)) :
$$e(\theta)=\mathbb{E}_\theta[\mathrm{signe}(X_1)]=\mathbb{P}_\theta(X_1>0)-\mathbb{P}_\theta(X_1<0)=1-2F(-\theta)=\frac2\pi\arctan(\theta),$$
bijection continue strictement croissante de $\mathbb{R}$ sur $]-1,1[$, d'inverse $y\mapsto\tan(\pi y/2)$. Avec $Y_i:=\mathrm{signe}(X_i)$, si $\bar Y_n\in]-1,1[$ (observations pas toutes de même signe) :
$$\hat\theta_n:=\tan\Big(\frac\pi2\bar Y_n\Big)=\tan\Big(\frac\pi{2n}\sum_{i=1}^n\mathrm{signe}(X_i)\Big).$$
Prop. 1.1 : $\bar Y_n\to e(\theta)$ en probabilité ; $\mathbb{P}(\lvert\bar Y_n\rvert=1)=F(-\theta)^n+(1-F(-\theta))^n\to0$ ; par l'argument du Lemme 2.1 ($e^{-1}$ continue sur $]-1,1[$), $\hat\theta_n\xrightarrow{\mathbb{P}_\theta\text{-prob}}\theta$, quelle que soit la valeur donnée à $\hat\theta_n$ sur $\{\lvert\bar Y_n\rvert=1\}$.
**Méthodes :** méthode des moments avec $T$ bornée, inversion de $e$, Lemme 2.1.

### Exemple 4.2 — Estimateur des moments du modèle de translation et d'échelle
**Source :** Poly ch.2, Compléments, Exemple 4.2, p. 52–53 — *hors programme*
**Idée :** loi de référence connue $q$, décalage et changement d'unité inconnus ; deux fonctions de moment, système explicite.
**Résultat :** $q$ densité sur $\mathbb{R}$ avec $\int xq(x)\,\mathrm{d}x=0$, $m_2:=\int x^2q(x)\,\mathrm{d}x\in]0,+\infty[$ (gaussienne : $m_2=1$ ; Laplace $\frac12\mathrm{e}^{-|x|}$ : $m_2=2$). $q_\theta(x):=\frac1\sigma q\big(\frac{x-m}\sigma\big)$, $\theta=(m,\sigma^2)\in\mathbb{R}\times\mathbb{R}_+^\ast$, $\sigma=\sqrt{\sigma^2}$. Sous $\mathbb{P}_\theta$, $X_1\overset{\mathcal{L}}{=}m+\sigma Z$, $Z\sim q$ : $\mathbb{E}_\theta[X_1]=m$, $\mathrm{Var}_\theta(X_1)=\sigma^2m_2$, $\mathbb{E}_\theta[X_1^2]=\sigma^2m_2+m^2$. Avec $T_1(x)=x$, $T_2(x)=x^2$ : système $m=\frac1n\sum_iX_i$, $\sigma^2m_2+m^2=\frac1n\sum_iX_i^2$ ; $e:(m,\sigma^2)\mapsto(m,\sigma^2m_2+m^2)$ injective d'inverse $(e_1,e_2)\mapsto\big(e_1,(e_2-e_1^2)/m_2\big)$, jacobienne $\begin{pmatrix}1&0\\ 2m&m_2\end{pmatrix}$ de déterminant $m_2>0$. Solution unique, dans $\Theta$ dès que $V_n>0$ ($\mathbb{P}_\theta$-p.s. pour $n\ge2$) :
$$\hat m_n=\frac1n\sum_{i=1}^nX_i,\qquad\hat\sigma_n^2=\frac1{n\,m_2}\sum_{i=1}^n(X_i-\hat m_n)^2.$$
Cas gaussien ($m_2=1$) : coïncide avec l'EMV de l'Ex. 1.10. L'hypothèse $\int x^4q<\infty$ (chapitre d'origine, slides) ne sert pas à la construction, mais à la loi limite de $\hat\sigma_n^2$ (TCL sur les $X_i^2$).

### Exemple 4.3 — Médiane et écart absolu médian comme Z-estimateurs
**Source :** Poly ch.2, Compléments, Exemple 4.3, p. 53–54 — *hors programme*
**Idée :** fonctions d'estimation **bornées** ⇒ estimateurs **robustes** aux valeurs aberrantes.
**Résultat :** $q_\theta(x)=\frac1\sigma q\big(\frac{x-m}\sigma\big)$, $\theta=(m,\sigma)\in\mathbb{R}\times\mathbb{R}_+^\ast$, $q$ paire de f.d.r. $Q$ continue, $Q(0)=1/2$ ; $a>0$ tel que $Q(a)=3/4$ (gaussienne : $a\simeq0{,}6745$). Fonctions d'estimation
$$\psi_1(\theta,x):=\mathrm{signe}(x-m),\qquad\psi_2(\theta,x):=\mathrm{signe}\Big(\frac{\lvert x-m\rvert}\sigma-a\Big),$$
d'espérances nulles : $\mathbb{E}_\theta[\psi_1]=\int\mathrm{signe}(z)q(z)\,\mathrm{d}z=0$ (parité) et
$$\mathbb{E}_\theta[\psi_2(\theta,X_1)]=2\int_0^{+\infty}\mathrm{signe}(z-a)q(z)\,\mathrm{d}z=2\Big(-\big(Q(a)-\tfrac12\big)+\big(1-Q(a)\big)\Big)=3-4Q(a)=0.$$
Pour $n$ impair et observations distinctes : $\hat m_n=\mathrm{med}(X_1,\dots,X_n)$ ; la seconde équation égalise les nombres d'indices avec $\lvert X_i-\hat m_n\rvert>a\sigma$ et $<a\sigma$, d'où (écarts p.s. distincts)
$$\hat\sigma_n=\frac1a\,\mathrm{med}\big(\lvert X_1-\hat m_n\rvert,\dots,\lvert X_n-\hat m_n\rvert\big),$$
estimateur **MAD** (*median absolute deviation*), très utilisé en statistique robuste : remplacer une observation par une valeur arbitrairement grande ne le modifie que de façon bornée (contrairement à l'écart-type empirique).

### Exemple 4.4 — Log-vraisemblance et divergence dans le modèle de Bernoulli
**Source :** Poly ch.2, Compléments, Exemple 4.4, p. 54–55 — *hors programme*
**Idée :** illustrer explicitement la Prop. 1.3.
**Résultat :** $\theta^\star\in]0,1[$, $\vartheta\in]0,1[$ : $\ell_n(\vartheta)=\bar X_n\log\vartheta+(1-\bar X_n)\log(1-\vartheta)$ ; $\log q_\vartheta(X_1)$ bornée donc intégrable ;
$$M_{\theta^\star}(\vartheta)=\theta^\star\log\vartheta+(1-\theta^\star)\log(1-\vartheta),$$
dérivée $\theta^\star/\vartheta-(1-\theta^\star)/(1-\vartheta)$ nulle en $\theta^\star$, dérivée seconde $<0$ : strictement concave, maximum unique en $\theta^\star$ (Lemme 2.3).
$$\mathrm{KL}\big(\mathcal{B}\mathrm{er}(\theta^\star),\mathcal{B}\mathrm{er}(\vartheta)\big)=M_{\theta^\star}(\theta^\star)-M_{\theta^\star}(\vartheta)=\theta^\star\log\frac{\theta^\star}\vartheta+(1-\theta^\star)\log\frac{1-\theta^\star}{1-\vartheta}>0\ (\vartheta\ne\theta^\star).$$
$\log q_\vartheta(X_1)=X_1\log\frac\vartheta{1-\vartheta}+\log(1-\vartheta)$, de variance $\theta^\star(1-\theta^\star)\big(\log\frac\vartheta{1-\vartheta}\big)^2$ ; Bienaymé-Tchebychev :
$$\mathbb{P}_{\theta^\star}\big(\lvert\ell_n(\vartheta)-M_{\theta^\star}(\vartheta)\rvert\ge\delta\big)\le\frac{\theta^\star(1-\theta^\star)\big(\log\frac\vartheta{1-\vartheta}\big)^2}{n\delta^2}.$$
Borne qui se dégrade quand $\vartheta\to0$ ou $1$ ; convergence en fait uniforme sur tout $[a,b]\subset]0,1[$ (suite du cours). *Figure :* $\theta^\star=1/3$, 50 mesures, $\bar x_n=0{,}4$ ($n=5$), $0{,}3$ ($n=10$), $0{,}32$ ($n=50$) : maximum de chaque $\ell_n$ en $\bar x_n$, se rapprochant de $\theta^\star$.

### Exemple 4.5 — EMV pour des durées de vie censurées
**Source :** Poly ch.2, Compléments, Exemple 4.5, p. 55–56 — *hors programme*
**Idée :** observations censurées : pas de densité par rapport à $\mathrm{Leb}$, mais modèle dominé par $\mu:=\mathrm{Leb}+\delta_\tau$.
**Résultat :** $X_i^\ast:=\min(X_i,\tau)$, $\tau>0$ connu, $X_i$ i.i.d. $\mathcal{E}(\theta)$. Densité $q_\theta^\ast(x):=\theta\mathrm{e}^{-\theta x}\mathbb{1}_{\{x<\tau\}}+\mathrm{e}^{-\theta\tau}\mathbb{1}_{\{x=\tau\}}$ sur $[0,\tau]$. $N_n^-:=\{i:\ X_i^\ast<\tau\}$ (pannes observées), $N_n^+:=\{i:\ X_i^\ast=\tau\}$ (censurées) :
$$\mathrm{L}_n(\vartheta,X_1^\ast,\dots,X_n^\ast)=\vartheta^{\mathrm{card}N_n^-}\exp\Big(-\vartheta\sum_{i\in N_n^-}X_i^\ast\Big)\mathrm{e}^{-\vartheta\tau\,\mathrm{card}N_n^+}=\vartheta^{\mathrm{card}N_n^-}\exp\Big(-\vartheta\sum_{i=1}^nX_i^\ast\Big).$$
Si $\mathrm{card}N_n^-\ge1$, $\vartheta\mapsto\frac{\mathrm{card}N_n^-}n\log\vartheta-\vartheta\bar X_n^\ast$ strictement concave :
$$\hat\theta_n^{\mathrm{MV}}=\frac{\mathrm{card}N_n^-}{\sum_{i=1}^nX_i^\ast}$$
(nombre de pannes observées / durée totale de fonctionnement observée). Si toutes censurées (probabilité $\mathrm{e}^{-n\theta\tau}>0$) : pas d'EMV.

### Exemple 4.6 — Équation de vraisemblance du modèle de Cauchy et méthode de gradient
**Source :** Poly ch.2, Compléments, Exemple 4.6, p. 56–57 — *hors programme*
**Idée :** EMV non explicite, calcul numérique.
**Résultat :**
$$\mathrm{L}_n(\vartheta)=\frac1{\pi^n}\prod_{i=1}^n\frac1{1+(X_i-\vartheta)^2},\qquad\ell_n(\vartheta)=-\log\pi-\frac1n\sum_{i=1}^n\log\big(1+(X_i-\vartheta)^2\big).$$
$\ell_n$ continue, $\to-\infty$ quand $\lvert\vartheta\rvert\to\infty$ : un EMV **existe**. Équation $\ell_n'(\vartheta)=\frac2n\sum_{i=1}^n\frac{X_i-\vartheta}{1+(X_i-\vartheta)^2}=0$ : pas de solution explicite, éventuellement **plusieurs** solutions (pas toutes des maxima). Méthode de gradient : $\vartheta^{(k+1)}=\vartheta^{(k)}+\gamma\,\ell_n'(\vartheta^{(k)})$, $\gamma>0$ ; $\ell_n(\vartheta^{(k)})$ croît pour un pas assez petit mais peut converger vers un maximum **local** ; le point de départ (p. ex. la médiane empirique, Z-estimateur consistant) est déterminant. *Figure :* $n=25$, $\theta^\star=2$ : le maximum de vraisemblance n'est pas $\theta^\star$.

### Exemple 4.7 — Régression linéaire gaussienne et moindres carrés ($p+1$ coefficients)
**Source :** Poly ch.2, Compléments, Exemple 4.7, p. 57–58 — *hors programme*
**Idée :** la vraisemblance s'étend à tout modèle dominé (observations indépendantes non identiquement distribuées).
**Résultat :** $x_1,\dots,x_n\in\mathbb{R}^d$ connus, $\varphi_0,\dots,\varphi_p:\mathbb{R}^d\to\mathbb{R}$ connues ; modèle $\big(\mathbb{R}^n,\mathcal{B}(\mathbb{R}^n),\{p_\theta\cdot\mathrm{Leb}^{\otimes n},\ \theta\in\Theta\}\big)$,
$$p_\theta(y_1,\dots,y_n):=\frac1{(2\pi\sigma^2)^{n/2}}\exp\Big(-\frac1{2\sigma^2}\sum_{k=1}^n\Big\{y_k-\sum_{\ell=0}^p\beta_\ell\varphi_\ell(x_k)\Big\}^2\Big),\quad\theta=(\beta_0,\dots,\beta_p,\sigma^2)\in\mathbb{R}^{p+1}\times\mathbb{R}_+^\ast.$$
Matrice de régression $\Phi$ ($n\times(p+1)$, $\Phi_{k,\ell}=\varphi_\ell(x_k)$) : $\ell_n(b,v)=-\frac12\log(2\pi v)-\frac1{2nv}\lVert\mathbf{Y}-\Phi b\rVert^2$. À $v$ fixé, maximiser en $b$ ⇔ minimiser $J_n(b):=\lVert\mathbf{Y}-\Phi b\rVert^2$ : **EMV = moindres carrés** pour $\beta$. Gradient $\nabla J_n(b)=-2\Phi^\top(\mathbf{Y}-\Phi b)$, **équations normales** $\Phi^\top\Phi b=\Phi^\top\mathbf{Y}$ ; si $\Phi^\top\Phi$ inversible (⇔ rang $p+1$, impose $n\ge p+1$) :
$$\hat\beta_n:=(\Phi^\top\Phi)^{-1}\Phi^\top\mathbf{Y},\qquad\hat\sigma_n^2:=\frac1n\lVert\mathbf{Y}-\Phi\hat\beta_n\rVert^2$$
($>0$ p.s. dès $n>p+1$). Cochran : $\hat\beta_n\sim\mathcal{N}\big(\beta,\sigma^2(\Phi^\top\Phi)^{-1}\big)$, $n\hat\sigma_n^2/\sigma^2\sim\chi^2(n-p-1)$, indépendants. Cas $p=1$, $\varphi_0=1$, $\varphi_1(x)=x$ : tendance linéaire du ch. 1 et Exercice 1.

### Remarque — L'intégrale de Kullback-Leibler est bien définie
**Source :** Poly ch.2, Compléments, « La divergence de Kullback-Leibler : énoncé complet », p. 58 — *hors programme*
**Résultat :** la partie négative $\big(f_0\log(f_0/f_1)\big)^-$ n'est non nulle que si $0<f_0<f_1$ ; avec $\log y\le y$ pour $y\ge1$ :
$$\int_{\{f_0>0\}}\big(f_0\log(f_0/f_1)\big)^-\,\mathrm{d}\mu=\int f_0\log\frac{f_1}{f_0}\mathbb{1}_{\{0<f_0<f_1\}}\,\mathrm{d}\mu\le\int f_0\frac{f_1}{f_0}\mathbb{1}_{\{0<f_0<f_1\}}\,\mathrm{d}\mu\le\int f_1\,\mathrm{d}\mu=1.$$
Donc $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)$ est toujours définie et $>-\infty$ (et $\ge0$ par le Th. 1.1).

### Théorème 4.1 — Propriétés de la divergence de Kullback-Leibler
**Source :** Poly ch.2, Compléments, Théorème 4.1, p. 58–59 — *hors programme*
**Énoncé :** $\mathbb{P}_0$, $\mathbb{P}_1$ probabilités sur $(\mathsf{X},\mathcal{X})$, $\mu$ $\sigma$-finie les dominant (densités $f_0$, $f_1$ ; on peut toujours prendre $\mu=\mathbb{P}_0+\mathbb{P}_1$).
(i) Si $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)<+\infty$, alors $\mathbb{P}_0\ll\mathbb{P}_1$.
(ii) $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)\in[0,+\infty]$, nulle ssi $\mathbb{P}_0=\mathbb{P}_1$.
(iii) $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)$ ne dépend pas du choix de $\mu$.
**Preuve (résumé) :** (i) si $\mathbb{P}_1(A)=0<\mathbb{P}_0(A)$, l'intégrande vaut $+\infty$ sur $A\cap\{f_0>0\}$ de $\mu$-mesure $>0$ ⇒ $\mathrm{KL}=+\infty$ ; contraposée. (ii) = Th. 1.1. (iii) si $\mathrm{KL}=+\infty$ pour une mesure dominante, $\mathbb{P}_0\not\ll\mathbb{P}_1$ (propriété indépendante de $\mu$) ⇒ infinie pour toute autre ; si $\mathbb{P}_0\ll\mathbb{P}_1$, Radon-Nikodym : $\tilde f_0=\mathrm{d}\mathbb{P}_0/\mathrm{d}\mathbb{P}_1$, $f_0=\tilde f_0f_1$ $\mu$-p.p., d'où
$$\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)=\int_{\{\tilde f_0f_1>0\}}\tilde f_0f_1\log\tilde f_0\,\mathrm{d}\mu=\int_{\{\tilde f_0>0\}}\tilde f_0\log\tilde f_0\,\mathbb{P}_1(\mathrm{d}x)=\int_{\mathsf{X}}\tilde f_0\log\tilde f_0\,\mathrm{d}\mathbb{P}_1,\qquad\tilde f_0=\frac{\mathrm{d}\mathbb{P}_0}{\mathrm{d}\mathbb{P}_1},$$
(convention $0\log0=0$) : expression sans $\mu$.
**Remarque (p. 59) :** $\mathrm{KL}(\mathbb{Q}_{\theta^\star},\mathbb{Q}_\vartheta)=+\infty$ signifie que des observations possibles sous $\theta^\star$ sont impossibles sous $\vartheta$ : la vraisemblance en $\vartheta$ est alors nulle avec probabilité $\to1$ et $\vartheta$ est éliminé par le MV. Cas de $\mathcal{U}([0,\theta])$ pour $\vartheta<\theta^\star$, où l'hypothèse d'intégrabilité de la Prop. 1.3 n'est pas satisfaite.

---

## 6. Liens avec les autres chapitres

**Prérequis (chapitre 1 — Modèles statistiques) :**
- modèle statistique, modèle **dominé** (Définition 1), **identifiabilité** (Définition 2, utilisée dans la Prop. 1.3 (iii) et l'Exercice 4), **statistique** (Définition 3, base de la Déf. 1.1) ;
- **$n$-échantillon** et densité produit (Section 1.7, éq. (1)) : définition même de $\mathrm{L}_n$ ;
- théorème de Radon-Nikodym, non-unicité de la mesure dominante (EMV indépendant de $\mu$, Th. 4.1 (iii)) ;
- statistiques d'ordre, médiane (Section 1.5) ;
- lois exponentielle/Gamma (moments $k!/\theta^k$, biais et EQM de $1/\bar X_n$) ;
- vecteurs gaussiens, $\chi^2$, **théorèmes de Cochran et de Gosset** (Exercice 1, Remarque de l'Ex. 1.10) ;
- Exercice 4 (PC1) : moindres carrés en régression linéaire — poursuivi en Exercice 1 (PC2) ;
- premiers estimateurs du chapitre 1 (Bernoulli, réponses randomisées) : réinterprétés comme estimateurs des moments.

**Suites :**
- **Chapitre 3 / cours 3–4 (théorie de la décision)** : biais, erreur quadratique moyenne, comparaison d'estimateurs (annoncés p. 8 ; biais calculés dès l'Ex. 1.10, l'Exercice 1 Q5 et l'Exercice 2).
- **Chapitre suivant : estimation par région / intervalles de confiance** (Déf. 2.2 donnée a minima ; fonction pivotale de l'Exercice 1 Q7).
- **Cours 6–7 (asymptotique)** : consistance (via LGN, Lemme 2.1, loi uniforme des grands nombres pour l'EMV), vitesse et normalité asymptotique (TCL, delta-méthode) des estimateurs des moments, Z- et M-estimateurs ; consistance de l'EMV dont la Prop. 1.3 ne donne que l'heuristique.
- **Chapitre « Famille exponentielle »** du polycopié : prolonge l'Exercice 3 (EMV = EMM).
- Statistique robuste (médiane, MAD), séries temporelles (Ex. 5), régression générale (Ex. 4.7), optimisation numérique (Ex. 4.6).

---

## 7. Idées de visualisations interactives pertinentes pour ce chapitre

1. **Méthode des moments, exponentielle** : curseurs $\theta$, $n$, nombre de répétitions ; boîtes à moustaches simulées de $\hat\theta_{n,1}=1/\bar X_n$ et $\hat\theta_{n,2}=(2/\overline{X^2}_n)^{1/2}$ (reproduit la figure p. 11) + affichage du biais théorique $n\theta/(n-1)$.
2. **Uniforme sur $[a,b]$** : tirer un échantillon, afficher les points, l'intervalle des moments $[\bar X_n\mp\sqrt{3V_n}]$ et l'intervalle $[X_{1:n},X_{n:n}]$ ; compteur de la fréquence où l'intervalle des moments ne contient pas toutes les observations (animation p. 13).
3. **Vraisemblance vs log-vraisemblance** : pour un modèle au choix (Bernoulli, Poisson, exponentiel, gaussien), tracer $\vartheta\mapsto\mathrm{L}_n(\vartheta)$ et $\ell_n(\vartheta)$ sur le même échantillon, point de maximum mis en évidence ; montrer que l'argmax coïncide.
4. **Uniforme vs exponentielle** : saut de $\mathrm{L}_n$ en $X_{n:n}$ (décroissance en $\vartheta^{-n}$) comparé au pic lisse de la vraisemblance exponentielle quand $n$ augmente (animation p. 20).
5. **Laplace, $n$ pair / impair** : fonction $\vartheta\mapsto\sum_i\lvert X_i-\vartheta\rvert$, plateau $[X_{m:n},X_{m+1:n}]$ pour $n$ pair, point unique pour $n$ impair ; bouton « ajouter une observation ».
6. **Convergence de $\ell_n$ vers $M_{\theta^\star}$ (Bernoulli)** : curseurs $\theta^\star$, $n$ ; tracer $\ell_n$ et $M_{\theta^\star}$, l'écart vertical $M_{\theta^\star}(\theta^\star)-M_{\theta^\star}(\vartheta)=\mathrm{KL}(\mathcal{B}\mathrm{er}(\theta^\star),\mathcal{B}\mathrm{er}(\vartheta))$ affiché au survol ; bande Bienaymé-Tchebychev.
7. **Asymétrie de KL** : deux gaussiennes / deux Bernoulli réglables, afficher $\mathrm{KL}(\mathbb{P}_0,\mathbb{P}_1)$ et $\mathrm{KL}(\mathbb{P}_1,\mathbb{P}_0)$ ; cas $+\infty$ (supports non emboîtés, uniformes).
8. **Mélange uniforme (Exercice 2)** : $a$, $b$, $\theta$, $n$ réglables ; vraisemblance en fonction de $N_a$, estimateur seuillé $\hat\theta_n\vee0$, estimateur des moments seuillé ; boîtes à moustaches MV-1/MV-2/Mom-1/Mom-2 et fréquence de seuillage à 0 (animation p. 28/35) ; courbe du biais binomial.
9. **Régression linéaire gaussienne (Exercice 1)** : nuage $(x_i,Y_i)$, droite des moindres carrés = EMV, résidus ; histogramme simulé de $n\hat\sigma^2/\sigma^2$ superposé à la densité $\chi^2(n-2)$ ; couverture empirique de l'IC $[n\hat\sigma^2/q_{1-\alpha/2},\,n\hat\sigma^2/q_{\alpha/2}]$.
10. **Cauchy et gradient (compléments)** : $\ell_n$ multimodale, trajectoire de la montée de gradient selon le point de départ (médiane vs point arbitraire) — marqué « hors programme ».
11. **Moyenne vs médiane (moments, Z, M-estimateurs)** : tableau à cocher indiquant quel qualificatif s'applique à $\bar X_n$, $\mathrm{med}$, $1/\bar X_n$, MAD ; avec simulation sous gaussienne/Laplace/Cauchy montrant la robustesse de la médiane.
