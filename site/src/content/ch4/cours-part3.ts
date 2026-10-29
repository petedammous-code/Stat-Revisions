import type { CourseSection } from '../types'

/** Sections 8 à 11 du cours : outils (quantiles, lois), exercices de PC4 traités, « À l’examen », compléments hors programme. */
export const coursePart3: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 8. Outils mathématiques
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s8-outils',
    title: '8. Outils : fonction quantile, lois de Student non centrale et de Fisher',
    role: 'definitions',
    intro:
      'Tout le chapitre se lit à travers des **quantiles** ($z_{1-\\alpha/2}$, $\\mathrm{t}^{(n-1)}_{1-\\alpha/2}$, $\\chi^2_{\\alpha/2}(n-1)$, $c_\\alpha$). La définition par l’inverse généralisée fonctionne même quand la fonction de répartition n’est pas inversible (lois discrètes : sondage, Poisson, vaccination).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch4-def-3-1',
        type: 'definition',
        label: 'Définition 3.1 (Outils)',
        title: 'Fonction de répartition et fonction quantile',
        source: 'Poly ch.4, Outils, Déf. 3.1, p. 35',
        hypotheses: ['$\\mathbb{Q}$ loi de probabilité sur $(\\mathbb{R},\\mathcal{B}(\\mathbb{R}))$.'],
        statement: `La **fonction de répartition** de $\\mathbb{Q}$ est $F:t\\mapsto\\mathbb{Q}(]-\\infty,t])$ : croissante, continue à droite, de limites $0$ en $-\\infty$ et $1$ en $+\\infty$. Sa **fonction quantile** (inverse généralisée) est définie pour $\\beta\\in\\,]0,1[$ par

$$F^{\\leftarrow}(\\beta):=\\inf\\{t\\in\\mathbb{R},\\ F(t)\\ge\\beta\\},$$

et $F^{\\leftarrow}(\\beta)$ est le **quantile d’ordre $\\beta$** de $\\mathbb{Q}$.`,
        intuition: 'Question courte n°10 : la définition a un sens même si $F$ a des sauts ou des paliers (lois discrètes) ; c’est elle qui donne le seuil $c_\\alpha$ des tests discrets.',
      },
      {
        kind: 'theorem',
        id: 'ch4-prop-3-1',
        type: 'proposition',
        label: 'Proposition 3.1 (Outils)',
        title: 'Propriété caractéristique du quantile',
        source: 'Poly ch.4, Outils, Prop. 3.1, p. 35',
        hypotheses: ['Notations de la Déf. 3.1 ; $t\\in\\mathbb{R}$, $\\beta\\in\\,]0,1[$.'],
        statement: `$$F^{\\leftarrow}(\\beta)\\le t\\iff\\beta\\le F(t).$$

En particulier, si $U\\sim\\mathcal{U}([0,1])$, alors $F^{\\leftarrow}(U)$ a pour loi $\\mathbb{Q}$ (méthode d’inversion).`,
        proof: [
          { text: 'Posons $E_\\beta:=\\{s\\in\\mathbb{R},\\ F(s)\\ge\\beta\\}$ et $a:=F^{\\leftarrow}(\\beta)=\\inf E_\\beta$. $E_\\beta$ est non vide et minoré, et stable par passage à un point plus grand.', justification: '$F\\to1$ en $+\\infty$ avec $\\beta<1$ ; $F\\to0$ en $-\\infty$ avec $\\beta>0$ ; $F$ croissante.' },
          { text: 'Il existe $(s_k)\\subset E_\\beta$ décroissant vers $a$ ; alors $F(a)=\\lim_kF(s_k)\\ge\\beta$, donc $a\\in E_\\beta$ (l’infimum est atteint).', justification: '**Continuité à droite** de $F$.' },
          { text: 'Si $\\beta\\le F(t)$, alors $t\\in E_\\beta$, donc $a\\le t$.', justification: 'Définition de l’infimum.' },
          { text: 'Réciproquement, si $a\\le t$, alors $F(t)\\ge F(a)\\ge\\beta$.', justification: 'Croissance de $F$ et étape 2.' },
          { text: 'Pour tout $t$, $\\mathbb{P}(F^{\\leftarrow}(U)\\le t)=\\mathbb{P}(U\\le F(t))=F(t)$. $\\square$', justification: 'Équivalence précédente ($U\\in\\,]0,1[$ p.s.) puis loi uniforme.' },
        ],
        pitfalls: ['Si $F$ est continue et strictement croissante (gaussienne, Student, $\\chi^2$, Fisher), $F^{\\leftarrow}$ est l’inverse usuel et $F(F^{\\leftarrow}(\\beta))=\\beta$ ; sinon seulement $F(F^{\\leftarrow}(\\beta))\\ge\\beta$ — d’où les tailles $<\\alpha$ des tests discrets.'],
      },
      {
        kind: 'text',
        id: 'ch4-s8-conventions',
        title: 'Conventions d’écriture des quantiles (Outils p. 36)',
        text: `- **$\\mathcal{N}(0,1)$** : f.d.r. $\\Phi$, quantile $z_\\beta$, $\\Phi(z_\\beta)=\\beta$ ; symétrie $z_{1-\\beta}=-z_\\beta$. On n’écrit pas $\\Phi^{-1}$.
- **Student $\\mathrm{t}(k)$** : f.d.r. $F_{\\mathrm{t}(k)}$, quantile $\\mathrm{t}^{(k)}_\\beta$ ; densité paire, $\\mathrm{t}^{(k)}_{1-\\beta}=-\\mathrm{t}^{(k)}_\\beta$.
- **$\\chi^2(k)$** : f.d.r. $F_{\\chi^2(k)}$, quantile $\\chi^2_\\beta(k)$ ; loi portée par $\\mathbb{R}_+$, **non symétrique** : les deux quantiles d’un intervalle bilatéral ne sont pas opposés.
- Figure p. 36 : quantile d’ordre $0{,}10$ lu sur la f.d.r. (on part de l’ordonnée $\\alpha$, on lit l’abscisse) et sur la densité (aire à gauche $=\\alpha$).`,
      },
      {
        kind: 'theorem',
        id: 'ch4-def-3-2',
        type: 'definition',
        label: 'Définition 3.2 (Outils)',
        title: 'Loi de Student non centrale, loi de Fisher',
        source: 'Poly ch.4, Outils, Déf. 3.2, p. 37 (= rappels C et D de PC4)',
        hypotheses: ['$k,k_1,k_2$ entiers $\\ge1$, $\\delta\\in\\mathbb{R}$.', 'Rappel (ch.1, Déf. 12) : si $N\\sim\\mathcal{N}(0,1)$ et $U\\sim\\chi^2(k)$ sont **indépendantes**, $N/\\sqrt{U/k}\\sim\\mathrm{t}(k)$.'],
        statement: `- Si $N\\sim\\mathcal{N}(\\delta,1)$ et $U\\sim\\chi^2(k)$ sont **indépendantes**, la loi de $N/\\sqrt{U/k}$ est la **loi de Student non centrale** à $k$ degrés de liberté et de paramètre de non-centralité $\\delta$ (pour $\\delta=0$ : $\\mathrm{t}(k)$).
- Si $U_1\\sim\\chi^2(k_1)$ et $U_2\\sim\\chi^2(k_2)$ sont **indépendantes**, la loi de $(U_1/k_1)/(U_2/k_2)$ est la **loi de Fisher** $\\mathrm{F}(k_1,k_2)$.`,
        intuition: 'La Student non centrale donne la **puissance du test de Student** (Ex. 2.11) ; la loi de Fisher donne le pivot du **rapport de deux variances gaussiennes** (PC4 Ex. 5) et la région de Fieller (CC 2022 Ex. 4). Si $T\\sim\\mathrm{t}(k)$, alors $T^2\\sim\\mathrm{F}(1,k)$ ($N^2\\sim\\chi^2(1)$).',
      },
      {
        kind: 'text',
        id: 'ch4-s8-prerequis',
        title: 'Résultats des chapitres 1 à 3 utilisés sans redémonstration (Outils p. 38)',
        text: 'Statistique et estimateur (bornes d’IC et statistiques de test sont des statistiques) ; définition minimale d’IC (ch.2) ; lois $\\chi^2$, Student, Gamma, théorèmes de **Cochran** et **Gosset** (ch.1) ; régression linéaire gaussienne (ch.1 §4, ch.2 §4) ; loi de $X_{n:n}$ dans le modèle uniforme (ch.1, ch.3 Ex. 1.9) ; inégalité de **Bienaymé-Tchebychev** et loi des grands nombres (ch.2) ; $S_n^2$ sans biais (ch.3 Ex. 1.4) ; le test comme règle de décision et l’ordre partiel sur les risques (ch.3 §4 et §1.5).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 9. Exercices de la PC4 traités
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s9-pc4',
    title: '9. Exercices types de la PC4 (poly §4) : exponentiel, uniforme, Poisson, deux échantillons, vaccination, Wilcoxon',
    role: 'exemples',
    intro:
      'Les sept exercices de la PC4 sont les Exercices 1–7 du poly ch.4 (corrigés p. 46–54). Groupe 1 (Ex. 1–3) traité en PC, Groupe 2 (Ex. 4–7) en bonus. L’Exercice 2 (test bilatéral gaussien, redémonstration de Gosset par Cochran, test de Student) est traité en sections 3 et 6.',
    blocks: [
      {
        kind: 'example',
        id: 'ch4-pc4-ex1',
        title: 'PC4 Ex. 1 — Modèle exponentiel : pivot χ²(2n), test unilatéral, puissance, p-valeur, IC',
        source: 'PC4 Ex. 1 ; Poly ch.4, Exercice 1 (corrigé p. 46–49)',
        setup: '$n$-échantillon de $\\{\\mathcal{E}(1/\\theta),\\ \\theta>0\\}$ : $\\theta$ est l’**espérance**, densité $p_\\theta(x)=\\theta^{-1}e^{-x/\\theta}$. Données : $\\theta_0=2$, $\\alpha=5$ %, $n=10$, $\\sum_ix_i=28{,}1$. Tester $H_0:\\theta=\\theta_0$ (puis $\\theta\\le\\theta_0$) contre $H_1:\\theta>\\theta_0$, et donner un IC.',
        steps: [
          { text: '$X_i\\sim\\mathcal{E}(1/\\theta)=\\Gamma(1,1/\\theta)$, donc $2X_i/\\theta\\sim\\Gamma(1,1/2)=\\chi^2(2)$, et par indépendance $2\\theta^{-1}\\sum_iX_i\\sim\\Gamma(n,1/2)=\\chi^2(2n)$ : **pivot**.', justification: 'Changement d’échelle d’une Gamma (taux divisé par $2/\\theta$) ; additivité des Gamma de même taux (rappel A) ; $\\chi^2(p)=\\Gamma(p/2,1/2)$ (rappel B).' },
          { text: 'EMV : log-vraisemblance normalisée $-\\log\\theta-\\bar X_n/\\theta$, dérivée $-1/\\theta+\\bar X_n/\\theta^2$ nulle en $\\bar X_n$, limites $-\\infty$ au bord : $\\hat\\theta_n^{\\mathrm{MV}}=\\bar X_n$ (= estimateur des moments).', justification: 'Annulation du score et maximum global.' },
          { text: 'Test : $\\mathcal{R}=\\{2\\theta_0^{-1}\\sum_iz_i\\ge\\chi^2_{1-\\alpha}(2n)\\}$, de taille exactement $\\alpha$ ($H_0$ simple).', justification: 'Sous $\\mathbb{P}_{\\theta_0}$, la statistique $2\\theta_0^{-1}\\sum_iX_i$ suit $\\chi^2(2n)$ ; grandes valeurs sous $H_1$ (échelle).' },
          { text: 'Puissance : $\\beta(\\theta)=\\mathbb{P}\\big(\\chi^2(2n)\\ge\\frac{\\theta_0}{\\theta}\\chi^2_{1-\\alpha}(2n)\\big)$, **croissante** en $\\theta$ ; donc pour $H_0:\\theta\\le\\theta_0$, la taille vaut $\\beta(\\theta_0)=\\alpha$ : **même test**.', justification: 'Réécrire avec le pivot $2\\theta^{-1}\\sum_iX_i$ sous $\\mathbb{P}_\\theta$ ; monotonie ⇒ sup au bord.' },
          { text: '$p$-valeur : $\\hat\\alpha(Z)=\\mathbb{P}\\big(\\chi^2(2n)\\ge\\frac2{\\theta_0}\\sum_iX_i\\big)=\\mathbb{P}(\\chi^2(20)\\ge28{,}1)\\simeq10{,}7$ % : on **échoue à rejeter** $H_0$ à 5 % (on rejetterait à 11 %).', justification: 'Régions emboîtées ($\\chi^2_{1-\\alpha}$ décroît en $\\alpha$), Prop. 2.1.' },
          { text: 'IC bilatéral exact : $\\Big[\\frac{2\\sum_iX_i}{\\chi^2_{1-\\alpha/2}(2n)},\\ \\frac{2\\sum_iX_i}{\\chi^2_{\\alpha/2}(2n)}\\Big]=\\Big[\\frac{56{,}2}{34{,}17},\\frac{56{,}2}{9{,}59}\\Big]\\approx[1{,}64;5{,}86]$.', justification: 'Méthode 1.1 ; inversion : le **grand** quantile donne la **petite** borne ($\\theta$ au dénominateur).' },
          { text: 'Bornes unilatérales : supérieure $2\\sum_iX_i/\\chi^2_\\alpha(2n)\\approx56{,}2/10{,}85\\approx5{,}18$ ; inférieure $2\\sum_iX_i/\\chi^2_{1-\\alpha}(2n)\\approx56{,}2/31{,}41\\approx1{,}79$.', justification: 'Choix $A_\\alpha=[\\chi^2_\\alpha(2n),+\\infty[$ puis $A_\\alpha=[0,\\chi^2_{1-\\alpha}(2n)]$.' },
        ],
        conclusion: 'Cohérence test / IC : on ne rejette pas $\\theta_0=2$ et $2\\in[1{,}64;5{,}86]$. Coquille du corrigé de PC : la borne $5{,}79$ est fausse, c’est $56{,}2/9{,}59\\approx5{,}86$. Jumeaux d’annales : CC 2022 Ex. 1 (Weibull, $\\sum_iX_i^c$, puissance par le pivot $T/\\theta$) et Examen 2025 Ex. 1 Q2 (intensité : rejet pour les **petites** valeurs).',
      },
      {
        kind: 'example',
        id: 'ch4-pc4-ex3',
        title: 'PC4 Ex. 3 — Loi uniforme : l’intervalle le plus court n’est pas symétrique',
        source: 'PC4 Ex. 3 ; Poly ch.4, Exercice 3 (corrigé p. 50)',
        setup: '$n$-échantillon de $\\{\\mathcal{U}([0,\\theta]),\\ \\theta>0\\}$, $X_{n:n}=\\max_iX_i$. Montrer que $X_{n:n}/\\theta$ est pivotale et trouver l’IC de couverture $1-\\alpha$ de longueur minimale.',
        steps: [
          { text: 'Pour $x\\in[0,1]$ : $\\mathbb{P}_\\theta(X_{n:n}/\\theta\\le x)=\\mathbb{P}_\\theta\\big(\\bigcap_i\\{X_i\\le\\theta x\\}\\big)=x^n$ (0 si $x<0$, 1 si $x>1$) : pivot de densité $nx^{n-1}$.', justification: 'Le max est $\\le a$ ssi toutes les observations le sont ; **indépendance**.' },
          { text: '$I:=[X_{n:n},\\ X_{n:n}\\alpha^{-1/n}]$ : $\\mathbb{P}_\\theta(\\theta\\in I)=\\mathbb{P}_\\theta(X_{n:n}/\\theta\\in[\\alpha^{1/n},1])=1-\\alpha$.', justification: 'Choix $A_\\alpha=[\\alpha^{1/n},1]$, puis résolution en $\\theta$.' },
          { text: 'Parmi $I_{a,b}=[X_{n:n}/a,X_{n:n}/b]$ : niveau $(a\\wedge1)^n-(b\\vee0)^n\\ge1-\\alpha$ ; on peut se restreindre à $0\\le b<a\\le1$ avec $a^n\\ge1-\\alpha+b^n$.', justification: 'Le pivot est dans $[0,1]$ : couvrir au-delà est inutile.' },
          { text: 'Longueur normalisée $\\ell=1/b-1/a\\ge\\frac1a\\Big(\\frac1{(1-a^{-n}(1-\\alpha))^{1/n}}-1\\Big)$, **décroissante** en $a$ : minimale pour $a=1$, puis $b=\\alpha^{1/n}$ et $\\ell=\\alpha^{-1/n}-1$.', justification: 'Optimisation sous contrainte, monotonie.' },
        ],
        conclusion: 'L’intervalle optimal $[X_{n:n},X_{n:n}\\alpha^{-1/n}]$ est **entièrement décalé d’un côté** (on sait $\\theta\\ge X_{n:n}$ p.s.) : la densité $nx^{n-1}$ est croissante, il faut placer $A_\\alpha$ contre $1$. A.N. $n=10$, $\\alpha=5$ % : $\\alpha^{-1/10}\\approx1{,}349$, et pour $X_{10:10}=3$, IC $\\approx[3;4{,}05]$. La minimalité est démontrée **dans la famille** $I_{a,b}$.',
      },
      {
        kind: 'example',
        id: 'ch4-pc4-ex4',
        title: 'PC4 Ex. 4 — Poisson, simple contre simple : niveau ≠ taille, p-valeur discrète',
        source: 'PC4 Ex. 4 ; Poly ch.4, Exercice 4 (corrigé p. 50–51)',
        setup: '$n$-échantillon de $\\mathrm{Poi}(\\theta)$, $n=10$, $H_0:\\theta=1$ contre $H_1:\\theta=2$ ; région de rejet $\\{T>c\\}$ (inégalité **stricte** imposée), $T(Z)=\\sum_iX_i$.',
        steps: [
          { text: '$\\sum_iX_i\\sim\\mathrm{Poi}(n\\theta)$ : sous $H_0$, $T\\sim\\mathrm{Poi}(10)$ ; sous $H_1$, $T\\sim\\mathrm{Poi}(20)$.', justification: 'Fonctions génératrices : $\\prod_ie^{-\\theta(1-s)}=e^{-n\\theta(1-s)}$, qui caractérise la loi.' },
          { text: 'Rejet pour les grandes valeurs ; $c_\\alpha=\\min\\{c:\\ \\mathbb{P}_1(T>c)\\le\\alpha\\}$ ; $F_{\\mathrm{Poi}(10)}(14)\\simeq0{,}917$, $F_{\\mathrm{Poi}(10)}(15)\\simeq0{,}951$, d’où $c_{5\\,\\%}=15$.', justification: 'Calibrage discret par l’inverse généralisée (Déf. 3.1).' },
          { text: 'Taille $\\mathbb{P}(\\mathrm{Poi}(10)>15)\\simeq0{,}049<5$ % : **niveau et taille diffèrent**.', justification: 'Statistique entière : la taille ne prend qu’un nombre fini de valeurs.' },
          { text: 'Puissance en $\\theta=2$ : $\\mathbb{P}(\\mathrm{Poi}(20)>15)\\simeq0{,}8435$ ; risque de seconde espèce $\\simeq0{,}157$.', justification: 'Déf. 2.2.' },
          { text: '$p$-valeur : $\\hat\\alpha(Z)=\\mathbb{P}(\\mathrm{Poi}(10)>T(Z)-1)=\\mathbb{P}(\\mathrm{Poi}(10)\\ge T(Z))$ ; $T=18$ : $0{,}0143$ (rejet à 5 %) ; $T=13$ : $0{,}2084$ (non-rejet).', justification: 'La plus petite région de rejet contenant $T(Z)$ correspond à $c=T(Z)-1$.' },
        ],
        conclusion: 'Avec $T=13$ on ne rejette pas : ou bien $H_0$ est vraie, ou bien $H_1$ est vraie et l’on se trompe avec probabilité $\\simeq15{,}7$ % — « ne pas rejeter » ne prouve pas $H_0$. Piège d’une unité : $\\mathbb{P}(\\mathrm{Poi}(10)>18)$ n’est **pas** la $p$-valeur. Simple contre simple : préparation au lemme de Neyman-Pearson (ch.5).',
      },
      {
        kind: 'text',
        id: 'ch4-pc4-ex5-7',
        title: 'PC4 Ex. 5–7 (bonus) — deux échantillons, vaccination, Wilcoxon : l’essentiel',
        text: `**Ex. 5 — Deux échantillons gaussiens** ($n$ mesures $\\mathcal{N}(\\mu_0,\\sigma^2)$, $p$ mesures $\\mathcal{N}(\\mu_1,\\sigma^2)$). Variance poolée $S^2_{n,p}=\\frac1{n+p-2}\\big(\\sum_i(X_i-\\hat\\mu_{0,n})^2+\\sum_j(Y_j-\\hat\\mu_{1,p})^2\\big)$ ; pivot $\\sqrt{\\frac{np}{n+p}}\\frac{(\\hat\\mu_{0,n}-\\hat\\mu_{1,p})-(\\mu_0-\\mu_1)}{S_{n,p}}\\sim\\mathrm{t}(n+p-2)$ (Cochran) ; IC $\\big[\\hat\\mu_{0,n}-\\hat\\mu_{1,p}\\pm\\mathrm{t}^{(n+p-2)}_{1-\\alpha/2}\\sqrt{\\frac{n+p}{np}}S_{n,p}\\big]$ ; test **dual** de $H_0:\\mu_0=\\mu_1$. Correcteurs du concours ($n=p=120$, moyennes $75$ et $74{,}99$) : statistique $\\approx0{,}01$, $p$-valeur bilatérale $\\approx0{,}99$ (le corrigé annonce $0{,}4960$, qui est la valeur **unilatérale**) : non-rejet. Variances différentes : $\\frac{\\sigma_1^2}{\\sigma_0^2}\\cdot\\frac{(n-1)^{-1}\\sum_i(X_i-\\hat\\mu_{0,n})^2}{(p-1)^{-1}\\sum_j(Y_j-\\hat\\mu_{1,p})^2}\\sim\\mathrm{F}(n-1,p-1)$ ; test de $H_0:\\sigma_0^2\\le\\sigma_1^2$ par $\\{\\text{rapport}\\ge\\mathrm{f}_{1-\\alpha}(n-1,p-1)\\}$, de taille $\\alpha$ (égalité au bord), $p$-valeur $1-F_{n-1,p-1}(T(Z))$. (Examen 2025 Ex. 4 Q4–Q5.)

**Ex. 6 — Vaccination** ($p_0=1/310\\,000$, $n=300\\,533$, 4 cas). $H_0:p\\le p_0$ (risque accepté) ; par **couplage**, $p\\mapsto\\mathbb{P}_p(S_n>c)$ croît, donc la taille vaut $\\mathbb{P}_{p_0}(S_n>c)$. Avec $\\mathbb{P}_{p_0}(S_n>3)=0{,}0172$ et $\\mathbb{P}_{p_0}(S_n>4)=0{,}0032$ : $c_{0{,}05}=3$ (rejet, $4>3$), $c_{0{,}01}=4$ (non-rejet) ; $p$-valeur $\\mathbb{P}_{p_0}(S_n>3)\\approx0{,}0172$. Approximation de Poisson $\\theta_0=np_0\\approx0{,}97$ : même $p$-valeur. *Choix de $H_0$* : les plaignants (« le nombre moyen dépasse $\\theta_0$ sauf preuve du contraire ») devraient mettre $H_0:\\theta\\ge\\theta_0$ ; le corrigé garde $H_0:\\theta\\le\\theta_0$ (ambiguïté signalée, voir DECISIONS).

**Ex. 7 — Wilcoxon** (seul test non paramétrique). Sous $H_0:F_X=F_Y$, par **échangeabilité** le vecteur des rangs est uniforme sur $\\mathcal{S}_N$ ($N=n+m$) : $W_{n,m}=\\sum_{i\\le n}R_i$ est **libre** ; $\\mathbb{E}_0[W]=n(N+1)/2$, $\\mathrm{Var}_0(W)=nm(N+1)/12$ (les $R_i$ ne sont pas indépendants : $\\mathrm{Cov}_0(R_1,R_2)=-\\mathrm{Var}_0(R_1)/(N-1)$, car $\\sum_iR_i$ est constante). Test par **Bienaymé-Tchebychev** : rejet si $|W-n(N+1)/2|\\ge\\sqrt{nm(N+1)/(12\\alpha)}$ — très conservatif (pour $n=m=10$ et $\\alpha=5$ %, $\\varepsilon_\\alpha\\approx59{,}2$ alors que $|W-105|\\le50$ : il ne rejette jamais).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 10. À l'examen
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s10-examen',
    title: '10. Méthodes types et « À l’examen »',
    role: 'liens-examen',
    intro: 'Le ch.4 pèse environ 10 % des points de l’Examen 2025 et 17 % du CC 2022 (DIAGNOSTIC §8) : $p$-valeur, IC par pivot et interprétations — c’est là que l’on perd « bêtement » des points de vocabulaire.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch4-meth-ic-pivot',
        type: 'methode',
        label: 'Méthode type',
        title: 'Rédiger un IC non asymptotique par pivot',
        source: 'Poly ch.4, Méthode 1.1, Prop. 1.1 ; DIAGNOSTIC §5.7',
        statement: `1. **Exhiber** $G(Z;\\theta)$ et **justifier sa loi** par un théorème nommé : « par le théorème de Gosset, $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ pour tout $\\theta$ » ; « par additivité des lois Gamma de même taux » ; « par Cochran ».
2. Dire explicitement : « cette loi ne dépend pas de $\\theta$ : $G$ est une **fonction pivotale** ».
3. Choisir $A_\\alpha$ (symétrique en probabilité par défaut ; unilatéral si on demande une borne ; décalé si la densité est monotone).
4. **Résoudre en $\\theta$** en surveillant le sens des inégalités (inversion pour $\\sigma^2$, $\\lambda$, $\\theta$ au dénominateur).
5. Conclure : « $\\mathcal{C}(Z)=[\\dots]$ est une région de confiance de niveau de couverture $1-\\alpha$ (Prop. 1.1) » — jamais « $\\mathbb{P}(\\theta\\in[1{,}6;5{,}9])=0{,}95$ ».`,
        pitfalls: ['Quantiles inversés ; $\\chi^2(n)$ au lieu de $\\chi^2(n-1)$ (ou $n-2$ en régression simple) ; oubli de dire « pour tout $\\theta$ ».'],
      },
      {
        kind: 'theorem',
        id: 'ch4-meth-test',
        type: 'methode',
        label: 'Méthode type',
        title: 'Rédiger un test de niveau α et sa p-valeur',
        source: 'Poly ch.4, Méthode 2.1, Déf. 2.3, Déf. 2.4, Prop. 2.1 ; DIAGNOSTIC §4 et §6',
        statement: `1. Poser $H_0$ et $H_1$ (l’hypothèse à établir va en $H_1$) et écrire la **forme** de $\\mathcal{R}_\\alpha$ selon $H_1$ (unilatérale / bilatérale, grandes ou petites valeurs selon que $\\theta$ est une échelle ou une intensité).
2. Donner la **loi de $T(Z)$ sous $\\mathbb{P}_{\\theta_0}$** (pivot évalué en $\\theta_0$) et calibrer $c_\\alpha$ par un quantile **à la frontière** $\\theta_0$.
3. Si $H_0$ est composite, montrer la **monotonie** de $\\theta\\mapsto\\beta_\\phi(\\theta)$ (réécriture par le pivot ; couplage dans le cas binomial) pour conclure que la taille vaut $\\beta_\\phi(\\theta_0)$.
4. **Puissance** : $\\beta_\\phi(\\theta)=\\mathbb{P}_\\theta(T\\in\\mathcal{R}_\\alpha)$ réécrit avec le pivot sous $\\mathbb{P}_\\theta$.
5. **$p$-valeur** : vérifier l’emboîtement, puis $\\hat\\alpha(Z)$ = probabilité, sous $\\mathbb{P}_{\\theta_0}$, que $T(Z\')$ soit au moins aussi extrême que $T(Z)$ ($Z\'$ copie indépendante de $Z$) ; en discret, compter la valeur observée.
6. **Conclure en mots** : « on rejette $H_0$ au niveau 5 % », « on échoue à rejeter $H_0$ » ; interpréter.`,
      },
      {
        kind: 'text',
        id: 'ch4-s10-annales',
        title: 'Ce qui est tombé (DIAGNOSTIC §2, §7)',
        text: `- **Examen 2025 Ex. 1 Q3 (≈ 1,5 pt)** — modèle exponentiel $\\theta e^{-\\theta x}$, test de Neyman-Pearson $\\{T<d_\\alpha\\}$, $T=\\sum_iX_i$. (a) Définition de la $p$-valeur (famille de niveau $\\alpha$, emboîtée, infimum) et expression $\\hat\\alpha(Z)=F_{\\chi^2(2n)}(2\\theta_0\\sum_iX_i)$ ; (b) interprétation d’une $p$-valeur de 3 % (rejet à 5 %, pas à 1 % ; uniforme sous $H_0$, concentrée près de 0 sous $H_1$) ; (c) « est-ce la probabilité d’être sous $\\Theta_0$ ? sous $\\Theta_1$ ? » — **ni l’une ni l’autre**.
- **Examen 2025 Ex. 2 Q5 (≈ 0,5 pt)** — IC exact pour $\\sigma^2$ (log-normale) : pivot $n\\widehat{\\sigma^2}_{ML}/\\sigma^2\\sim\\chi^2(n-1)$.
- **Examen 2025 Ex. 4 Q4–Q6** — test de Fisher d’égalité des variances, statistique de Student à variances égales (PC4 Ex. 5), **correction de Bonferroni** pour les tests multiples (Ex. 1.7).
- **CC 2022 Ex. 1 Q4** — fonction puissance du test UPP Weibull $\\beta(\\theta)=1-\\mathrm{Gcdf}_n(\\theta_0\\mathrm{Gqf}_n(1-\\alpha)/\\theta)$ par le pivot $T/\\theta\\sim\\mathrm{Gamma}(n,1)$ (convention **d’échelle**).
- **CC 2022 Ex. 3 Q5, Q7, Q9** — exponentielle translatée : IC pour $\\lambda$ par $T_1/\\lambda\\sim\\mathrm{Gamma}(n-1,1)$, pivot $F_n(a)=(T_2-a)/\\{(n-1)^{-1}T_1\\}$ « sans calcul » (rapport de deux pivots indépendants), IC pour $a$.
- **CC 2022 Ex. 4 Q8–Q9** — région de **Fieller** : $T^2(\\delta)\\sim\\mathrm{F}(1,n-2)$, région quadratique $A\\delta^2+B\\delta+C\\le0$, intervalle borné ssi le test de Student de $\\beta_1=0$ rejette.

**Rédaction attendue** : nommer le théorème qui donne la loi du pivot, écrire « pour tout $\\theta$ », distinguer taille et niveau, dire « on échoue à rejeter », ne jamais attribuer une probabilité à $\\theta$ ou à $H_0$.`,
      },
      {
        kind: 'text',
        id: 'ch4-s10-pieges',
        title: 'Pièges relevés dans les annales et les corrigés (DIAGNOSTIC §6)',
        text: `- **Conventions** : exponentielle d’**intensité** (poly, Examen 2025) contre **échelle** (PC4 Ex. 1, CC 2022) : le sens de la région de rejet s’inverse. Toujours réécrire la densité utilisée.
- **Sens de la région de rejet** : du côté où la statistique rend $H_1$ plus vraisemblable ; seuil calibré à la **frontière** $\\theta_0$ de $H_0$.
- **Taille / niveau / puissance** : taille $=\\sup_{\\Theta_0}\\beta_\\phi$ (un nombre) ; niveau = contrainte ; puissance sur $\\Theta_1$ ; risque de seconde espèce $1-\\beta_\\phi$. Cas discret : taille $<\\alpha$.
- **$p$-valeur** : ni $\\mathbb{P}(H_0)$, ni $\\mathbb{P}(H_1)$, ni la probabilité de se tromper ; « ne pas rejeter » $\\ne$ « prouver $H_0$ » ; significatif $\\ne$ effet important.
- **Interprétation d’un IC** : la probabilité porte sur l’intervalle aléatoire ; $[0,2]$ numérique « contient $\\theta$ avec probabilité 0,95 » est un non-sens.
- **Inversion d’inégalités** : $a\\le c/\\sigma^2\\le b\\iff c/b\\le\\sigma^2\\le c/a$.
- **Bilatéral** : quantile $z_{1-\\alpha/2}$ (sinon taille $2\\alpha$) ; $p$-valeur $2(1-\\Phi(T))$.
- **Bonferroni** : $I_1\\times I_2$ est de niveau **au moins** $1-\\alpha$ ; on ne multiplie pas les niveaux sans indépendance.
- **Régression** : $n\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-2)$, pas $n-1$.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 11. Compléments hors programme
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s11-hp',
    title: '11. Compléments (hors programme) : dualité générale, tests par inégalité de déviation, Chernoff',
    role: 'complements',
    scope: 'hors-programme',
    intro: 'Section 5 « Les compléments » du poly (p. 55–58), explicitement **non exigible**. Résumés concis.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch4-hp-dualite',
        type: 'proposition',
        label: 'Résultat (compléments)',
        title: 'Dualité générale entre régions de confiance et tests',
        source: 'Poly ch.4, Compléments, Ex. 5.1 et p. 55–56 (non numéroté)',
        scope: 'hors-programme',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta\\})$, $g:\\Theta\\to\\mathbb{R}^q$ ; pour $\\nu\\in\\mathbb{R}^q$, $\\Theta_0^\\nu:=\\{\\theta,\\ g(\\theta)=\\nu\\}$.'],
        statement: `- *Des tests à la région* : si pour tout $\\nu$, $\\phi_\\nu$ est un test de niveau $\\alpha$ de $H_0:g(\\theta)=\\nu$, la région $S(z):=\\{\\nu,\\ \\phi_\\nu(z)=0\\}$ (valeurs non rejetées) vérifie $\\inf_\\theta\\mathbb{P}_\\theta(g(\\theta)\\in S(Z))=1-\\sup_\\nu\\sup_{\\theta\\in\\Theta_0^\\nu}\\mathbb{P}_\\theta(\\phi_\\nu(Z)=1)\\ge1-\\alpha$.
- *De la région aux tests* : si $S\'$ est de niveau $1-\\alpha$, $\\phi\'_\\nu(z):=\\mathbb{1}_{\\{\\nu\\notin S\'(z)\\}}$ est de niveau $\\alpha$ pour $H_0:g(\\theta)=\\nu$.

Ex. 5.1 : le test dual de l’IC de Student est le test de Student, et réciproquement.`,
        intuition: 'Une région de confiance = l’ensemble des valeurs que l’observation ne permet pas de rejeter ; un test = savoir si une valeur appartient à cette région. Chaque $\\theta$ appartient à $\\Theta_0^{g(\\theta)}$ et à lui seul.',
      },
      {
        kind: 'text',
        id: 'ch4-hp-deviation',
        title: 'Construire un test par une inégalité de déviation ; Ex. 5.2–5.3',
        scope: 'hors-programme',
        text: `Pour $H_0:g(\\theta)\\le g_0$, $\\mathcal{R}=\\{T(z)\\ge c\\}$, et une inégalité $\\mathbb{P}_\\theta(T(Z)-g(\\theta)>\\varepsilon)\\le\\gamma_\\theta(\\varepsilon)$ : comme $g_0-g(\\theta)\\ge0$ sur $\\Theta_0$, la taille est majorée par $\\gamma(c-g_0):=\\sup_{\\Theta_0}\\gamma_\\theta(c-g_0)$ ; $c_\\alpha=g_0+y_\\alpha$, $y_\\alpha:=\\inf\\{\\varepsilon,\\ \\gamma(\\varepsilon)\\le\\alpha\\}$. Tchebychev : $y_\\alpha=v(\\Theta_0)/\\sqrt{n\\alpha}$ ; Hoeffding : $y_\\alpha=(b-a)\\sqrt{\\log(1/\\alpha)/(2n)}$.

**Ex. 5.2–5.3 (proportion, $H_0:\\theta\\le1/2$)** : $\\mathcal{R}_\\alpha=\\{\\bar x_n\\ge\\frac12+\\frac1{2\\sqrt{n\\alpha}}\\}$ (Tchebychev) et $\\{\\bar x_n\\ge\\frac12+\\sqrt{\\frac1{2n}\\log\\frac1\\alpha}\\}$ (Hoeffding). Comme $\\log u<u/2$ pour tout $u>0$, $\\log(1/\\alpha)<1/(2\\alpha)$ : **sur ce modèle**, le test de Hoeffding a la plus petite valeur critique, donc il est toujours plus puissant — pas une règle générale.`,
      },
      {
        kind: 'theorem',
        id: 'ch4-hp-chernoff',
        type: 'theoreme',
        label: 'Théorème 5.1 et Prop. 5.1',
        title: 'Inégalité de Chernoff (et pour des sommes)',
        source: 'Poly ch.4, Compléments, Thm 5.1 et Prop. 5.1, p. 57–58',
        scope: 'hors-programme',
        hypotheses: ['$Y$ réelle avec $\\varphi_Y(\\lambda)=\\mathbb{E}[e^{\\lambda Y}]<\\infty$ pour tout $\\lambda$ ; $\\psi_Y=\\log\\varphi_Y$.'],
        statement: 'Transformée de Cramér $h_Y(a):=\\sup_{\\lambda\\ge0}\\{a\\lambda-\\psi_Y(\\lambda)\\}$ pour $a\\ge0$ (et l’analogue avec $\\lambda\\le0$) ; pour $a\\ge0$, $\\mathbb{P}(Y\\ge a)\\le e^{-h_Y(a)}$. Pour $Y_1,\\dots,Y_n$ i.i.d. : $h_{\\bar Y_n}=nh_Y$, donc $\\mathbb{P}(\\bar Y_n\\ge a)\\le e^{-nh_Y(a)}$.',
        intuition: 'Markov appliqué à $e^{\\lambda Y}$ ($\\mathbb{1}_{\\{Y\\ge a\\}}\\le e^{\\lambda(Y-a)}$), puis optimisation en $\\lambda$ ; pour une somme, $\\varphi_{\\bar Y_n}(\\lambda)=\\varphi_Y(\\lambda/n)^n$. C’est l’outil de la preuve de Hoeffding. (Le poly contient une petite incohérence de signe dans la définition de $h_Y$ pour $a\\le0$, sans incidence.)',
      },
      {
        kind: 'text',
        id: 'ch4-hp-suite',
        title: 'Ce que le chapitre 5 reprendra',
        scope: 'hors-programme',
        text: '(1) Le choix de la statistique de test : **lemme de Neyman-Pearson** (rapport des vraisemblances), qui donne pour simple contre simple le **test le plus puissant** de niveau $\\alpha$. L’énigme des pixels du poly en est l’image : budget = niveau $\\alpha$, coût d’un pixel = probabilité sous $H_0$, gain = probabilité sous $H_1$, solution = acheter les pixels par ordre décroissant du rapport gain/coût. (2) Cas discret : la taille est $<\\alpha$ ; remède : **tests randomisés** (fonction critique à valeurs dans $[0,1]$).',
      },
    ],
  },
]
