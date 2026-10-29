import type { Exercise } from '../types'

/** Exercices type annale (rédaction complète). */
export const exercisesPart3: Exercise[] = [
  {
    id: 'ch4-annale-2025-ex1-pvaleur',
    type: 'annale',
    title: 'Examen 2025 Ex. 1 Q2–Q3 — test du modèle exponentiel et p-valeur',
    source: 'Examen 2025 Ex. 1 Q2–Q3 (corrigé proposé : DIAGNOSTIC §2.A)',
    origin: 'annale',
    difficulty: 2,
    tags: ['p-valeur', 'test-unilateral', 'pivot', 'chi2', 'cours'],
    durationMin: 20,
    statement: `Soit un $n$-échantillon du modèle $\\big(\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}_+),\\{p_\\theta\\cdot\\mathrm{Leb},\\ \\theta>0\\}\\big)$, $p_\\theta(x)=\\theta e^{-\\theta x}$ (exponentielle d’**intensité** $\\theta$). Soient $0<\\theta_0<\\theta_1$ et $\\alpha\\in\\,]0,1[$ ; on note $T(Z)=\\sum_{i=1}^nX_i$.

**Rappels du sujet.** La loi $\\Gamma(a,b)$ (intensité $b$) a pour densité $\\frac{b^a}{\\Gamma(a)}x^{a-1}e^{-bx}$ ; si $X\\sim\\Gamma(a,b)$ et $Y\\sim\\Gamma(a\',b)$ sont indépendantes, $X+Y\\sim\\Gamma(a+a\',b)$ ; $\\chi^2(p)=\\Gamma(p/2,1/2)$.

**Q2 (admis, ch.5).** Le test de Neyman-Pearson de $H_0:\\theta=\\theta_0$ contre $H_1:\\theta=\\theta_1$ s’écrit $\\phi^\\star(Z)=\\mathbb{1}_{\\{T(Z)<d_\\alpha\\}}$.

**(a)** Montrer que $2\\theta_0T(Z)\\sim\\chi^2(2n)$ sous $\\mathbb{P}_{\\theta_0}$ et exprimer $d_\\alpha$ à l’aide d’un quantile du $\\chi^2$ pour que $\\phi^\\star$ soit de taille $\\alpha$.

**(b)** Calculer la fonction puissance $\\theta\\mapsto\\mathbb{P}_\\theta(T(Z)<d_\\alpha)$ ; en déduire que $\\phi^\\star$ est aussi de niveau $\\alpha$ pour $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$.

**Q3.** (a) Définir la $p$-valeur associée à la famille $\\{\\phi^\\star_\\alpha\\}_{\\alpha\\in\\,]0,1[}$ et en donner l’expression ici. (b) Quel est l’intérêt de la $p$-valeur ? Que signifie une $p$-valeur de 3 % ? (c) La $p$-valeur est-elle la probabilité d’être sous $\\Theta_0$ ? sous $\\Theta_1$ ? (d) Quelle est la loi de $\\hat\\alpha(Z)$ sous $\\mathbb{P}_{\\theta_0}$ ?`,
    hints: [
      '(a) $X_i\\sim\\Gamma(1,\\theta_0)$ sous $\\mathbb{P}_{\\theta_0}$ ; un changement d’échelle $cY$ divise le taux par $c$ ; additivité à taux fixé. Attention au sens : une grande intensité donne de **petites** observations, d’où une région $\\{T<d\\}$ et un quantile d’ordre $\\alpha$ (pas $1-\\alpha$).',
      '(b) Sous $\\mathbb{P}_\\theta$, c’est $2\\theta T(Z)$ qui suit $\\chi^2(2n)$ : réécrire $\\{T<d_\\alpha\\}=\\{2\\theta T<2\\theta d_\\alpha\\}$. Pour l’hypothèse composite, la taille est le sup de la puissance sur $\\Theta_0$.',
      'Q3 : vérifier les deux conditions de la Déf. 2.4 (niveau $\\alpha$ ; régions emboîtées, $\\alpha\\mapsto\\chi^2_\\alpha(2n)$ croissante), puis inverser la f.d.r. continue. (d) Prop. 2.2 avec la condition (2).',
    ],
    correction: `**Q2(a).** Sous $\\mathbb{P}_{\\theta_0}$, $X_i\\sim\\mathcal{E}(\\theta_0)=\\Gamma(1,\\theta_0)$. Pour $c>0$, si $Y\\sim\\Gamma(a,b)$ alors $cY\\sim\\Gamma(a,b/c)$ (changement de variable) ; avec $c=2\\theta_0$ : $2\\theta_0X_i\\sim\\Gamma(1,1/2)=\\chi^2(2)$. Les $X_i$ étant indépendants, l’additivité des lois Gamma de même taux donne

$$2\\theta_0T(Z)=\\sum_{i=1}^n2\\theta_0X_i\\sim\\Gamma(n,1/2)=\\chi^2(2n)\\quad\\text{sous }\\mathbb{P}_{\\theta_0}.$$

Alors $\\mathbb{P}_{\\theta_0}(T(Z)<d)=F_{\\chi^2(2n)}(2\\theta_0d)$ ; la f.d.r. étant continue et strictement croissante, la taille vaut $\\alpha$ si et seulement si $2\\theta_0d_\\alpha=\\chi^2_\\alpha(2n)$ :

$$d_\\alpha=\\frac{\\chi^2_\\alpha(2n)}{2\\theta_0}.$$

**Q2(b).** Sous $\\mathbb{P}_\\theta$, le même argument donne $2\\theta T(Z)\\sim\\chi^2(2n)$ (pivot $G(Z,\\theta)=2\\theta T(Z)$, Déf. 1.2). Donc

$$\\beta(\\theta)=\\mathbb{P}_\\theta(T(Z)<d_\\alpha)=\\mathbb{P}_\\theta\\big(2\\theta T(Z)<2\\theta d_\\alpha\\big)=F_{\\chi^2(2n)}\\Big(\\frac\\theta{\\theta_0}\\chi^2_\\alpha(2n)\\Big),$$

fonction **croissante** de $\\theta$. Pour $H_0:\\theta\\le\\theta_0$, la taille vaut $\\overline{\\alpha}(\\phi^\\star)=\\sup_{\\theta\\le\\theta_0}\\beta(\\theta)=\\beta(\\theta_0)=\\alpha$ (Déf. 2.3) : le test est de niveau (et de taille) $\\alpha$. Comme $d_\\alpha$ ne dépend pas de $\\theta_1$, c’est le même test pour toute alternative $\\theta_1>\\theta_0$ (UPP, ch.5).

**Q3(a).** Pour une famille $\\{\\phi_\\alpha\\}$ de tests purs (a) **de niveau $\\alpha$** pour tout $\\alpha$ et (b) à régions de rejet **emboîtées** ($\\mathcal{R}_\\alpha\\subset\\mathcal{R}_{\\alpha\'}$ pour $\\alpha\\le\\alpha\'$), la $p$-valeur est $\\hat\\alpha(Z):=\\inf\\{\\alpha\\in[0,1],\\ Z\\in\\mathcal{R}_\\alpha\\}$ (Poly ch.4, Déf. 2.4) : le plus petit niveau auquel on rejette $H_0$. Ici $\\mathcal{R}_\\alpha=\\{2\\theta_0T(Z)<\\chi^2_\\alpha(2n)\\}$ est de niveau $\\alpha$ (Q2) et $\\alpha\\mapsto\\chi^2_\\alpha(2n)$ est croissante, donc (b) est vérifiée. Comme $\\chi^2_\\alpha(2n)>x\\iff\\alpha>F_{\\chi^2(2n)}(x)$ (f.d.r. continue strictement croissante),

$$\\hat\\alpha(Z)=\\inf\\{\\alpha:\\ \\chi^2_\\alpha(2n)>2\\theta_0T(Z)\\}=F_{\\chi^2(2n)}\\big(2\\theta_0T(Z)\\big)=\\mathbb{P}_{\\theta_0}\\big(T(Z\')\\le T(Z)\\big),$$

où $Z\'$ est une copie indépendante : la probabilité, **sous $H_0$**, d’observer une statistique au moins aussi défavorable à $H_0$ (ici, aussi petite) que celle observée.

**Q3(b).** La $p$-valeur résume en un seul nombre la décision du test à **tous** les niveaux : on rejette $H_0$ pour tout $\\alpha>\\hat\\alpha(Z)$ et l’on échoue à la rejeter pour tout $\\alpha<\\hat\\alpha(Z)$ ; c’est pourquoi on la publie plutôt que la seule décision. Une $p$-valeur de 3 % : on rejette $H_0$ au niveau 5 % mais pas au niveau 1 % ; sous $H_0$, une observation au moins aussi extrême ne se produirait que dans environ 3 % des répétitions. Plus elle est petite, plus les données sont défavorables à $H_0$.

**Q3(c).** **Ni l’un ni l’autre.** Le paramètre $\\theta$ est déterministe : « $\\mathbb{P}(\\theta\\in\\Theta_0)$ » n’a pas de sens dans ce cadre. La $p$-valeur est une probabilité **portant sur l’observation**, calculée sous $\\mathbb{P}_{\\theta_0}$ (Poly ch.4, §2.8 point 1) ; ce n’est pas non plus la probabilité de se tromper en rejetant.

**Q3(d).** La famille vérifie $\\mathbb{P}_{\\theta_0}(Z\\in\\mathcal{R}_\\alpha)=\\alpha$ pour tout $\\alpha\\in\\,]0,1[$ (Q2(a)) : par la Prop. 2.2 (condition (2)), $\\hat\\alpha(Z)\\sim\\mathcal{U}(]0,1[)$ sous $\\mathbb{P}_{\\theta_0}$ (directement : $F(Y)$ est uniforme si $Y$ a une f.d.r. $F$ continue). Sous $H_1$, la $p$-valeur se concentre près de 0 ; pour $\\theta<\\theta_0$, elle est seulement dominée : $\\mathbb{P}_\\theta(\\hat\\alpha\\le u)\\le u$.`,
    bareme: [
      { label: 'Q2(a) loi χ²(2n) et seuil d_α', points: 0.75 },
      { label: 'Q2(b) puissance croissante, taille pour H₀ composite', points: 0.5 },
      { label: 'Q3(a) définition et expression de la p-valeur', points: 0.75 },
      { label: 'Q3(b) intérêt et lecture de 3 %', points: 0.5 },
      { label: 'Q3(c) ni Θ₀ ni Θ₁', points: 0.25 },
      { label: 'Q3(d) loi uniforme sous H₀ (Prop. 2.2)', points: 0.25 },
    ],
  },
  {
    id: 'ch4-annale-cc2022-ex3-translatee',
    type: 'annale',
    title: 'CC 2022 Ex. 3 Q5, Q7–Q9 — intervalles par pivots pour l’exponentielle translatée',
    source: 'CC MAP433 2022 Ex. 3 Q5, Q7–Q9 (corrigé officiel complété)',
    origin: 'annale',
    difficulty: 3,
    tags: ['pivot', 'ic-pivot', 'gamma', 'statistiques-ordre'],
    durationMin: 25,
    statement: `Convention **d’échelle** du sujet : $\\mathrm{Gamma}(p,\\lambda)\\,$ (échelle $\\lambda$) a pour densité $\\frac{\\lambda^{-p}}{\\Gamma(p)}x^{p-1}e^{-x/\\lambda}$ ; $\\mathrm{Gqf}_p$ est la fonction quantile de $\\mathrm{Gamma}(p,1)$. Soit un $n$-échantillon ($n\\ge2$) de densité $f_\\theta(x)=\\lambda^{-1}e^{-(x-a)/\\lambda}\\mathbb{1}_{[a,+\\infty[}(x)$, $\\theta=(a,\\lambda)\\in\\mathbb{R}\\times\\mathbb{R}_+^*$. On note $X_{1:n}\\le\\dots\\le X_{n:n}$ les statistiques d’ordre,

$$T_1:=\\sum_{i=1}^n(X_{i:n}-X_{1:n}),\\qquad T_2:=X_{1:n}.$$

**Admis (Q4, Q6).** $T_1$ et $T_2$ sont indépendantes ; $T_1\\sim\\mathrm{Gamma}(n-1,\\lambda)$ ; $T_2-a$ suit la loi exponentielle de paramètre d’échelle $\\lambda/n$.

**Q5.** Construire, à l’aide de $T_1$, un intervalle de confiance de niveau de couverture $1-\\alpha$ pour $\\lambda$.

**Q7.** Montrer « sans calcul » que $F_n(a):=\\dfrac{T_2-a}{(n-1)^{-1}T_1}$ est une fonction pivotale.

**Q8 (bonus).** Montrer que la densité de $F_n(a)$ est $t\\mapsto n\\big(1+\\frac{nt}{n-1}\\big)^{-n}\\mathbb{1}_{[0,+\\infty[}(t)$.

**Q9.** En déduire un intervalle de confiance de niveau $1-\\alpha$ pour $a$. Proposer un choix explicite des constantes.`,
    hints: [
      'Q5 : un changement d’échelle transforme $T_1\\sim\\mathrm{Gamma}(n-1,\\lambda)$ en une variable de loi $\\mathrm{Gamma}(n-1,1)$ : c’est le pivot ; attention à l’inversion des inégalités ($\\lambda$ au dénominateur).',
      'Q7 : écrire $F_n(a)=(n-1)\\frac{(T_2-a)/\\lambda}{T_1/\\lambda}$ ; les deux variables $(T_2-a)/\\lambda$ et $T_1/\\lambda$ ont des lois qui ne dépendent pas de $\\theta$, et elles sont indépendantes. Q8 : pour $t\\ge0$, calculer $\\mathbb{P}(F_n(a)>t)=\\mathbb{P}\\big(U>\\frac{tV}{n-1}\\big)$ en intégrant d’abord en $U$ (survie exponentielle), puis reconnaître $\\int_0^\\infty\\frac{v^{n-2}}{(n-2)!}e^{-sv}\\,\\mathrm{d}v=s^{-(n-1)}$ ; dériver.',
      'Q9 : choisir $0\\le c_1<c_2$ avec $\\int_{c_1}^{c_2}n(1+\\frac{nt}{n-1})^{-n}\\mathrm{d}t=1-\\alpha$ et résoudre en $a$. La densité est **décroissante** : l’intervalle le plus court prend $c_1=0$ ; la fonction de survie est $(1+\\frac{nt}{n-1})^{-(n-1)}$.',
    ],
    correction: `**Q5.** Si $Y\\sim\\mathrm{Gamma}(p,\\lambda)$ (échelle), alors $Y/\\lambda\\sim\\mathrm{Gamma}(p,1)$ (changement de variable). Donc, sous $\\mathbb{P}_\\theta$, $G_1(Z;\\lambda):=T_1/\\lambda\\sim\\mathrm{Gamma}(n-1,1)$, loi qui ne dépend pas de $\\theta=(a,\\lambda)$ : **fonction pivotale** (Poly ch.4, Déf. 1.2). Avec $a_\\alpha:=\\mathrm{Gqf}_{n-1}(\\alpha/2)$ et $b_\\alpha:=\\mathrm{Gqf}_{n-1}(1-\\alpha/2)$ (f.d.r. continue), $\\mathbb{P}_\\theta(a_\\alpha\\le T_1/\\lambda\\le b_\\alpha)=1-\\alpha$ pour tout $\\theta$, et comme toutes les quantités sont positives,

$$a_\\alpha\\le\\frac{T_1}\\lambda\\le b_\\alpha\\iff\\frac{T_1}{b_\\alpha}\\le\\lambda\\le\\frac{T_1}{a_\\alpha}.$$

Par la Prop. 1.1 (Méthode 1.1), $\\big[T_1/b_\\alpha,\\ T_1/a_\\alpha\\big]$ est un intervalle de confiance de niveau de couverture $1-\\alpha$ pour $\\lambda$.

**Q7.** On écrit $F_n(a)=(n-1)\\dfrac{U}{V}$ avec $U:=(T_2-a)/\\lambda$ et $V:=T_1/\\lambda$. Sous $\\mathbb{P}_\\theta$ : $U$ suit la loi exponentielle d’échelle $1/n$ (car $T_2-a$ est exponentielle d’échelle $\\lambda/n$), $V\\sim\\mathrm{Gamma}(n-1,1)$ (Q5), et $U$, $V$ sont indépendantes (fonctions de $T_2$ et de $T_1$, indépendantes). La loi du couple $(U,V)$ est donc le produit de deux lois qui ne dépendent pas de $\\theta$ ; $F_n(a)$ en est une fonction mesurable fixe, donc sa loi ne dépend pas de $\\theta$. Comme $F_n(a)$ dépend des observations **et** du paramètre $a$, c’est une **fonction pivotale** pour $a$ (Déf. 1.2), et non une statistique.

**Q8 (bonus).** Gardons $U$ (densité $ne^{-nu}\\mathbb{1}_{u\\ge0}$) et $V$ (densité $\\frac{v^{n-2}}{(n-2)!}e^{-v}\\mathbb{1}_{v>0}$), indépendantes. Comme $T_2\\ge a$ p.s., $F_n(a)\\ge0$. Pour $t\\ge0$, par indépendance et Fubini-Tonelli (intégrande positive),

$$\\mathbb{P}_\\theta(F_n(a)>t)=\\mathbb{P}\\Big(U>\\frac{tV}{n-1}\\Big)=\\int_0^\\infty e^{-\\frac{ntv}{n-1}}\\frac{v^{n-2}}{(n-2)!}e^{-v}\\,\\mathrm{d}v=\\Big(1+\\frac{nt}{n-1}\\Big)^{-(n-1)},$$

en reconnaissant $\\int_0^\\infty\\frac{v^{n-2}}{(n-2)!}e^{-sv}\\,\\mathrm{d}v=s^{-(n-1)}$ (densité Gamma) avec $s=1+\\frac{nt}{n-1}$. Cette fonction de survie est de classe $C^1$ sur $[0,+\\infty[$ ; en dérivant, $F_n(a)$ a pour densité $t\\mapsto(n-1)\\frac{n}{n-1}\\big(1+\\frac{nt}{n-1}\\big)^{-n}=n\\big(1+\\frac{nt}{n-1}\\big)^{-n}$ sur $[0,+\\infty[$. (Le corrigé officiel passe par la fonction muette : intégrale double contre la densité produit de $(T_1,T_2)$, changement de variable $t=(n-1)(t_2-a)/t_1$ à $t_1$ fixé, puis intégration en $t_1$ ; même résultat.)

**Q9.** On choisit $0\\le c_1<c_2$ tels que $\\int_{c_1}^{c_2}n\\big(1+\\frac{nt}{n-1}\\big)^{-n}\\mathrm{d}t=1-\\alpha$. Alors, pour tout $\\theta$, $\\mathbb{P}_\\theta\\big(c_1\\le F_n(a)\\le c_2\\big)=1-\\alpha$, et (en multipliant par $T_1/(n-1)>0$)

$$c_1\\le\\frac{(n-1)(T_2-a)}{T_1}\\le c_2\\iff T_2-\\frac{c_2T_1}{n-1}\\le a\\le T_2-\\frac{c_1T_1}{n-1}.$$

$\\big[T_2-\\frac{c_2T_1}{n-1},\\ T_2-\\frac{c_1T_1}{n-1}\\big]$ est un IC de niveau $1-\\alpha$ pour $a$ (Prop. 1.1). (Le corrigé officiel écrit $T_2-c_2T_1$ : coquille, le facteur $1/(n-1)$ manque.)

*Choix explicite.* En intégrant la densité, $\\mathbb{P}(F_n(a)>t)=\\big(1+\\frac{nt}{n-1}\\big)^{-(n-1)}$. La densité étant **décroissante**, l’intervalle le plus court s’obtient avec $c_1=0$ (on sait d’ailleurs que $a\\le X_{1:n}=T_2$ p.s.) et $c_2=c$ tel que $(1+\\frac{nc}{n-1})^{-(n-1)}=\\alpha$, soit $c=\\frac{n-1}n(\\alpha^{-1/(n-1)}-1)$. On obtient

$$\\Big[X_{1:n}-\\frac{\\alpha^{-1/(n-1)}-1}{n}\\,T_1,\\ X_{1:n}\\Big],$$

analogue de l’intervalle optimal $[X_{n:n},X_{n:n}\\alpha^{-1/n}]$ de PC4 Ex. 3 (on place $A_\\alpha$ là où la densité du pivot est maximale).`,
    bareme: [
      { label: 'Q5 pivot T₁/λ et inversion', points: 0.5 },
      { label: 'Q7 pivot par indépendance de deux pivots', points: 0.5 },
      { label: 'Q8 (bonus) densité de Fₙ(a) par la fonction de survie', points: 0.5 },
      { label: 'Q9 résolution en a (facteur 1/(n−1))', points: 0.5 },
      { label: 'Q9 choix explicite des constantes', points: 0.25 },
    ],
  },
  {
    id: 'ch4-annale-cc2022-ex4-fieller',
    type: 'annale',
    title: 'CC 2022 Ex. 4 Q8–Q9 — région de confiance de Fieller',
    source: 'CC MAP433 2022 Ex. 4 Q7–Q9 (corrigé officiel)',
    origin: 'annale',
    difficulty: 3,
    tags: ['region-confiance', 'fisher', 'regression', 'dualite'],
    durationMin: 25,
    statement: `Modèle de régression linéaire simple gaussienne : $Y\\sim\\mathcal{N}(X\\beta,\\sigma^2\\mathrm{I}_n)$, $X=[\\mathbf{1},x]$ de rang 2, $n\\ge3$, $\\beta=(\\beta_0,\\beta_1)$ avec $\\beta_1\\ne0$. On s’intéresse à $\\phi:=-\\beta_0/\\beta_1$ (abscisse où la droite s’annule). On note $\\hat\\beta=(\\hat\\beta_0,\\hat\\beta_1)$ l’estimateur des moindres carrés, $H$ la projection sur $\\mathrm{Vect}(X)$, $S^2:=\\frac1{n-2}\\|(\\mathrm{I}_n-H)Y\\|^2$, $u:=x-\\bar x\\mathbf{1}$, $\\delta:=\\bar x-\\phi$ et $w(\\delta):=\\frac1n+\\frac{\\delta^2}{\\|u\\|^2}$. On note $\\mathrm{f}_{1-\\alpha}(1,n-2)$ le quantile d’ordre $1-\\alpha$ de la loi de Fisher $\\mathrm{F}(1,n-2)$.

**Admis (Q3–Q7).** $(n-2)S^2/\\sigma^2\\sim\\chi^2(n-2)$ ; $\\bar Y-\\delta\\hat\\beta_1\\sim\\mathcal{N}(0,\\sigma^2w(\\delta))$ et cette variable est indépendante de $S^2$ ; $\\hat\\beta_1\\sim\\mathcal{N}(\\beta_1,\\sigma^2/\\|u\\|^2)$, indépendant de $S^2$.

**Q8.** Montrer que $T^2(\\delta):=\\dfrac{(\\bar Y-\\delta\\hat\\beta_1)^2}{S^2w(\\delta)}$ suit la loi $\\mathrm{F}(1,n-2)$.

**Q9.** En déduire une région de confiance de niveau $1-\\alpha$ pour $\\delta$ de la forme $\\{\\delta\\in\\mathbb{R}:\\ A\\delta^2+B\\delta+C\\le0\\}$ ; expliciter $A$, $B$, $C$. À quelle condition est-ce un intervalle borné ? Interpréter cette condition à l’aide du test de Student de $H_0:\\beta_1=0$.`,
    hints: [
      'Q8 : normaliser le numérateur par $\\sigma\\sqrt{w(\\delta)}$ et le dénominateur par $\\sigma^2$ ; le carré d’une $\\mathcal{N}(0,1)$ est un $\\chi^2(1)$ ; définition de la loi de Fisher (Déf. 3.2), indépendance.',
      'Q9 : $T^2(\\delta)$, vue comme fonction de $(Z,\\theta)$ via $\\delta=\\delta(\\theta)$, est un pivot ; prendre $A_\\alpha=[0,\\mathrm{f}_{1-\\alpha}(1,n-2)]$ et développer l’inégalité en $\\delta$.',
      'Q9 : la région contient toujours $\\delta=\\bar Y/\\hat\\beta_1$. Un trinôme $\\le0$ définit un intervalle borné ssi son coefficient dominant est $>0$ ; et $\\mathrm{f}_{1-\\alpha}(1,k)=\\big(\\mathrm{t}^{(k)}_{1-\\alpha/2}\\big)^2$.',
    ],
    correction: `**Q8.** Posons $N:=\\dfrac{\\bar Y-\\delta\\hat\\beta_1}{\\sigma\\sqrt{w(\\delta)}}\\sim\\mathcal{N}(0,1)$ et $V:=\\dfrac{(n-2)S^2}{\\sigma^2}\\sim\\chi^2(n-2)$, **indépendantes** (admis, conséquence du théorème de Cochran : $\\bar Y-\\delta\\hat\\beta_1$ est fonction de $HY$, $S^2$ de $(\\mathrm{I}_n-H)Y$). Alors $N^2\\sim\\chi^2(1)$ est indépendante de $V$ et

$$T^2(\\delta)=\\frac{N^2/1}{V/(n-2)}\\sim\\mathrm{F}(1,n-2)$$

par définition de la loi de Fisher (Poly ch.4, Déf. 3.2). (De façon équivalente, $T(\\delta)=N/\\sqrt{V/(n-2)}\\sim\\mathrm{t}(n-2)$ et $T^2\\sim\\mathrm{F}(1,n-2)$.)

**Q9.** Comme $\\delta=\\bar x+\\beta_0/\\beta_1$ est une fonction de $\\theta$, $G(Z,\\theta):=T^2(\\delta(\\theta))$ est une **fonction pivotale** de loi $\\mathrm{F}(1,n-2)$ pour tout $\\theta$. Avec $A_\\alpha=[0,F]$, $F:=\\mathrm{f}_{1-\\alpha}(1,n-2)$, la Prop. 1.1 donne la région de niveau $1-\\alpha$ : $\\mathcal{C}(Z)=\\{\\delta:\\ T^2(\\delta)\\le F\\}$. Or ($S^2w(\\delta)>0$)

$$T^2(\\delta)\\le F\\iff(\\bar Y-\\delta\\hat\\beta_1)^2\\le FS^2\\Big(\\frac1n+\\frac{\\delta^2}{\\|u\\|^2}\\Big)\\iff A\\delta^2+B\\delta+C\\le0,$$

$$A=\\hat\\beta_1^2-\\frac{FS^2}{\\|u\\|^2},\\qquad B=-2\\bar Y\\hat\\beta_1,\\qquad C=\\bar Y^2-\\frac{FS^2}n.$$

La région contient $\\delta=\\bar Y/\\hat\\beta_1$ (le membre de gauche s’y annule), donc elle est non vide. Si $A>0$, c’est le segment entre les deux racines : **intervalle borné**. Si $A<0$, c’est le complémentaire d’un intervalle ouvert (réunion de deux demi-droites) ou $\\mathbb{R}$ tout entier ; si $A=0$, une demi-droite ou $\\mathbb{R}$.

*Interprétation.* $A>0\\iff\\dfrac{\\hat\\beta_1^2}{S^2/\\|u\\|^2}>F=\\big(\\mathrm{t}^{(n-2)}_{1-\\alpha/2}\\big)^2\\iff\\dfrac{|\\hat\\beta_1|}{S/\\|u\\|}>\\mathrm{t}^{(n-2)}_{1-\\alpha/2}$. Sous $\\beta_1=0$, $\\hat\\beta_1/(S/\\|u\\|)\\sim\\mathrm{t}(n-2)$ (pivot de Student de la pente, Ex. 2.15) : la région de Fieller est un intervalle borné **si et seulement si le test de Student de $H_0:\\beta_1=0$ rejette au niveau $\\alpha$** (dualité, §2.6). Si la pente n’est pas significativement non nulle, on ne peut pas localiser l’abscisse $\\phi{}$ : la région est non bornée, ce qui est cohérent. On en déduit une région pour $\\phi=\\bar x-\\delta$.`,
    bareme: [
      { label: 'Q8 normalisation, indépendance, loi de Fisher', points: 0.5 },
      { label: 'Q9 pivot et coefficients A, B, C', points: 0.5 },
      { label: 'Q9 condition A > 0 et lien avec le test de Student', points: 0.5 },
    ],
  },
  {
    id: 'ch4-annale-pc4-ex1',
    type: 'annale',
    title: 'PC4 Ex. 1 — modèle exponentiel : test, puissance, p-valeur, intervalles',
    source: 'PC4 Ex. 1 (Poly ch.4, Exercice 1, corrigé p. 46–49)',
    origin: 'pc',
    difficulty: 2,
    tags: ['pivot', 'test-unilateral', 'puissance', 'p-valeur', 'ic-pivot', 'chi2'],
    durationMin: 40,
    statement: `Soit $Z=(X_1,\\dots,X_n)$ un $n$-échantillon du modèle $\\big(\\mathbb{R}_+,\\mathcal{B}(\\mathbb{R}_+),\\{\\mathcal{E}(1/\\theta),\\ \\theta>0\\}\\big)$, où $\\mathcal{E}(\\lambda)$ est la loi exponentielle d’intensité $\\lambda$ : ici **$\\theta$ est l’espérance**, densité $p_\\theta(x)=\\theta^{-1}e^{-x/\\theta}$. Soient $\\alpha\\in\\,]0,1[$ et $\\theta_0>0$. Données : $\\theta_0=2$, $\\alpha=5$ %, $n=10$, $\\sum_ix_i=28{,}1$ ; $\\chi^2_{0{,}025}(20)\\approx9{,}59$, $\\chi^2_{0{,}975}(20)\\approx34{,}17$, $F_{\\chi^2(20)}(28{,}1)\\approx0{,}893$.

1. Test de $H_0:\\theta=\\theta_0$ contre $H_1:\\theta>\\theta_0$. (a) Montrer que $2\\theta^{-1}\\sum_iX_i\\sim\\chi^2(2n)$ sous $\\mathbb{P}_\\theta$. (b) Proposer un estimateur de $\\theta$ (EMV, moments). (c) En déduire un test de niveau $\\alpha$. (d) Fonction puissance et taille. (e) $p$-valeur ; conclusion numérique.
2. Test de $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$ : région de rejet de niveau $\\alpha$, puissance, $p$-valeur.
3. Intervalles de confiance : (a) IC bilatéral exact de niveau $1-\\alpha$ ; (b) bornes de confiance unilatérales ; (c) application numérique.`,
    hints: [
      '1(a) Exponentielle = Gamma de forme 1 ; changement d’échelle puis additivité à taux fixé. 1(b) Annuler la dérivée de la log-vraisemblance et vérifier le maximum global.',
      '1(c)–(d) $\\theta$ est une **échelle** : sous $H_1$ les observations sont plus grandes, on rejette pour les grandes valeurs de $\\frac2{\\theta_0}\\sum X_i$ ; pour la puissance, faire apparaître le pivot $\\frac2\\theta\\sum X_i$ sous $\\mathbb{P}_\\theta$.',
      '2 : monotonie de la puissance ⇒ même test. 3 : inverser l’encadrement (le grand quantile donne la petite borne).',
    ],
    correction: `**1(a).** $X_i\\sim\\mathcal{E}(1/\\theta)=\\Gamma(1,1/\\theta)$ (forme, taux). Si $Y\\sim\\Gamma(a,b)$ et $c>0$, $cY\\sim\\Gamma(a,b/c)$ ; avec $c=2/\\theta$, $2X_i/\\theta\\sim\\Gamma(1,1/2)=\\chi^2(2)$. Les $X_i$ sont indépendants et les lois Gamma de même taux s’additivent : $2\\theta^{-1}\\sum_iX_i\\sim\\Gamma(n,1/2)=\\chi^2(2n)$ sous $\\mathbb{P}_\\theta$. Cette loi ne dépend pas de $\\theta$ : **fonction pivotale** (Déf. 1.2).

**1(b).** Log-vraisemblance normalisée $\\theta\\mapsto-\\log\\theta-\\bar X_n/\\theta$, de limite $-\\infty$ en $0^+$ et en $+\\infty$, de dérivée $-1/\\theta+\\bar X_n/\\theta^2$ nulle au seul point $\\bar X_n$ : $\\hat\\theta_n^{\\mathrm{MV}}=\\bar X_n$, qui est aussi l’estimateur des moments ($\\mathbb{E}_\\theta[X_1]=\\theta$).

**1(c).** $\\bar X_n$ est proche de $\\theta_0$ sous $H_0$ et plus grand sous $H_1$ : on rejette pour les grandes valeurs. Sous $\\mathbb{P}_{\\theta_0}$, $\\frac2{\\theta_0}\\sum_iX_i\\sim\\chi^2(2n)$ (pivot évalué en $\\theta_0$ : c’est une **statistique**) ; la f.d.r. étant continue, le test

$$\\mathcal{R}=\\Big\\{z\\in\\mathbb{R}_+^n:\\ \\frac2{\\theta_0}\\sum_iz_i\\ge\\chi^2_{1-\\alpha}(2n)\\Big\\}$$

est de taille exactement $\\alpha$ (Méthode 2.1).

**1(d).** Pour tout $\\theta$, $\\beta(\\theta)=\\mathbb{P}_\\theta\\big(\\frac2\\theta\\sum_iX_i\\ge\\frac{\\theta_0}\\theta\\chi^2_{1-\\alpha}(2n)\\big)=\\mathbb{P}\\big(\\chi^2(2n)\\ge\\frac{\\theta_0}\\theta\\chi^2_{1-\\alpha}(2n)\\big)$, croissante en $\\theta$. $H_0$ simple : taille $=\\beta(\\theta_0)=\\alpha$. Pour $\\theta>\\theta_0$ fixé, $\\beta(\\theta)\\to1$ quand $n\\to\\infty$ (A.N. $n=10$, $\\alpha=5$ % : en $\\theta=4$, $\\beta=\\mathbb{P}(\\chi^2(20)\\ge\\tfrac12\\chi^2_{0{,}95}(20))=\\mathbb{P}(\\chi^2(20)\\ge15{,}71)\\approx0{,}73$).

**1(e).** Pour $\\alpha<\\alpha\'$, $\\chi^2_{1-\\alpha}(2n)>\\chi^2_{1-\\alpha\'}(2n)$ : régions emboîtées. La $p$-valeur (Déf. 2.4, Prop. 2.1) est

$$\\hat\\alpha(Z)=\\mathbb{P}\\Big(\\chi^2(2n)\\ge\\frac2{\\theta_0}\\sum_iX_i\\Big)=\\mathbb{P}(\\chi^2(20)\\ge28{,}1)\\approx1-0{,}893=0{,}107.$$

On **échoue à rejeter** $H_0$ au niveau 5 % (on la rejetterait au niveau 11 %).

**2.** Région $\\{\\frac2{\\theta_0}\\sum_iz_i\\ge d\\}$ ; puissance $\\theta\\mapsto\\mathbb{P}(\\chi^2(2n)\\ge d\\,\\theta_0/\\theta)$ **croissante**, donc la taille vaut $\\sup_{\\theta\\le\\theta_0}\\beta(\\theta)=\\mathbb{P}(\\chi^2(2n)\\ge d)$ et le niveau $\\alpha$ impose $d=\\chi^2_{1-\\alpha}(2n)$ : **même test** qu’en 1, **même $p$-valeur**.

**3(a).** $\\mathbb{P}_\\theta\\big(\\chi^2_{\\alpha/2}(2n)\\le\\frac2\\theta\\sum_iX_i\\le\\chi^2_{1-\\alpha/2}(2n)\\big)=1-\\alpha$ ; en inversant (quantités positives),

$$\\mathbb{P}_\\theta\\Big(\\frac{2\\sum_iX_i}{\\chi^2_{1-\\alpha/2}(2n)}\\le\\theta\\le\\frac{2\\sum_iX_i}{\\chi^2_{\\alpha/2}(2n)}\\Big)=1-\\alpha\\quad\\text{pour tout }\\theta\\quad(\\text{Prop. 1.1}).$$

**3(b).** Borne supérieure : $\\mathbb{P}_\\theta\\big(\\frac2\\theta\\sum X_i\\ge\\chi^2_\\alpha(2n)\\big)=1-\\alpha$ donne $\\theta\\in\\,]-\\infty,\\frac{2\\sum X_i}{\\chi^2_\\alpha(2n)}]$ ; borne inférieure : $\\mathbb{P}_\\theta\\big(\\frac2\\theta\\sum X_i\\le\\chi^2_{1-\\alpha}(2n)\\big)=1-\\alpha$ donne $\\theta\\in[\\frac{2\\sum X_i}{\\chi^2_{1-\\alpha}(2n)},+\\infty[$.

**3(c).** $2\\sum_ix_i=56{,}2$ : $\\mathrm{IC}_{95\\,\\%}(\\theta)=\\big[\\frac{56{,}2}{34{,}17},\\frac{56{,}2}{9{,}59}\\big]\\approx[1{,}64;5{,}86]$. Cohérence avec le test : $\\theta_0=2$ n’est pas rejeté et appartient à l’intervalle.`,
    bareme: [
      { label: '1(a) pivot χ²(2n)', points: 0.75 },
      { label: '1(b) EMV et moments', points: 0.5 },
      { label: '1(c) région de rejet de niveau α', points: 0.75 },
      { label: '1(d) puissance et taille', points: 0.75 },
      { label: '1(e) p-valeur et conclusion', points: 0.75 },
      { label: '2 hypothèse composite', points: 0.5 },
      { label: '3 IC bilatéral, bornes unilatérales, A.N.', points: 1 },
    ],
  },
  {
    id: 'ch4-annale-pc4-ex2',
    type: 'annale',
    title: 'PC4 Ex. 2 — modèle gaussien « à savoir faire » : test bilatéral, Gosset par Cochran, test de Student',
    source: 'PC4 Ex. 2 (Poly ch.4, Exercice 2, corrigé p. 49–50)',
    origin: 'pc',
    difficulty: 2,
    tags: ['test-bilateral', 'gosset', 'student', 'p-valeur', 'cours'],
    durationMin: 35,
    statement: `Soit $\\sigma^2>0$ **connu** et $Z=(X_1,\\dots,X_n)$ un $n$-échantillon de $\\{\\mathcal{N}(\\mu,\\sigma^2),\\ \\mu\\in\\mathbb{R}\\}$ ; $\\mu_0\\in\\mathbb{R}$, $H_0:\\mu=\\mu_0$ contre $H_1:\\mu\\ne\\mu_0$. Pour $c>0$, $\\phi_c(Z)=\\mathbb{1}_{\\{T(Z)\\ge c\\}}$ avec $T(Z)=\\sqrt n|\\bar X_n-\\mu_0|/\\sigma$.

1. Fonction puissance à $c$ fixé, à l’aide de $\\Phi$.
2. Taille en fonction de $c$ ; valeur critique d’un test de niveau $\\alpha$.
3. $p$-valeur.

Variance désormais **inconnue** : $\\theta=(\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*$.

4. Montrer que $\\bar X_n$ et $S_n^2$ sont indépendantes (indication : projection orthogonale $\\Pi$ sur $\\mathbb{R}\\mathbf{1}$).
5. Montrer que $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$.
6. Loi de $\\sqrt n(\\bar X_n-\\mu_0)/S_n$ sous $\\mathbb{P}_\\theta$.
7–9. Pour $\\tilde\\phi_c=\\mathbb{1}_{\\{\\tilde T(Z)\\ge c\\}}$, $\\tilde T(Z)=\\sqrt n|\\bar X_n-\\mu_0|/S_n$ : taille, valeur critique d’un test de niveau $\\alpha$, $p$-valeur.`,
    hints: [
      'Q1 : sous $\\mathbb{P}_\\mu$, $T(Z)$ a la loi de $|m+W|$, $W\\sim\\mathcal{N}(0,1)$, $m=\\sqrt n(\\mu-\\mu_0)/\\sigma$ ; découper $\\{|m+W|\\ge c\\}$ en deux queues.',
      'Q4–Q5 : $\\bar X_n=n^{-1}\\mathbf{1}^\\top\\Pi Z$, $S_n^2=(n-1)^{-1}\\|(\\mathrm{I}_n-\\Pi)Z\\|^2$ ; théorème de Cochran pour $\\mathbb{R}^n=\\mathbb{R}\\mathbf{1}\\oplus(\\mathbb{R}\\mathbf{1})^\\perp$.',
      'Q6 : décomposer en $\\frac{\\sqrt n(\\bar X_n-\\mu)/\\sigma+\\sqrt n(\\mu-\\mu_0)/\\sigma}{S_n/\\sigma}$ ; Student **non centrale** (Déf. 3.2). Q7–Q9 : sous $H_0$ elle est centrée ; parité de la densité de Student.',
    ],
    correction: `**Q1.** Sous $\\mathbb{P}_\\mu$, $\\bar X_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$, donc $T(Z)$ a la loi de $\\big|\\frac{\\sqrt n}\\sigma(\\mu-\\mu_0)+W\\big|$ avec $W\\sim\\mathcal{N}(0,1)$. Pour $c>0$ :

$$\\beta_c(\\mu)=\\mathbb{P}\\Big(\\Big|\\frac{\\sqrt n}\\sigma(\\mu-\\mu_0)+W\\Big|\\ge c\\Big)=1-\\Phi\\Big(\\frac{\\sqrt n}\\sigma(\\mu_0-\\mu)+c\\Big)+\\Phi\\Big(\\frac{\\sqrt n}\\sigma(\\mu_0-\\mu)-c\\Big).$$

**Q2.** $H_0$ simple : $\\overline{\\alpha}_c=\\beta_c(\\mu_0)=1-\\Phi(c)+\\Phi(-c)=2(1-\\Phi(c))$ (symétrie). Niveau $\\alpha$ : $2(1-\\Phi(c_\\alpha))=\\alpha$, soit $c_\\alpha=z_{1-\\alpha/2}$ (taille exactement $\\alpha$).

**Q3.** $\\alpha\\mapsto z_{1-\\alpha/2}$ est décroissante : régions emboîtées ; $\\hat\\alpha(Z)$ vérifie $T(Z)=z_{1-\\hat\\alpha(Z)/2}$, d’où $\\hat\\alpha(Z)=2\\big(1-\\Phi(T(Z))\\big)$ (Déf. 2.4, Prop. 2.1).

**Q4.** Avec $\\Pi$ la projection orthogonale sur $\\mathbb{R}\\mathbf{1}$ : $\\Pi Z=\\bar X_n\\mathbf{1}$, donc $\\bar X_n=n^{-1}\\mathbf{1}^\\top\\Pi Z$, et $S_n^2=(n-1)^{-1}\\|(\\mathrm{I}_n-\\Pi)Z\\|^2$. Sous $\\mathbb{P}_\\theta$, $Z\\sim\\mathcal{N}_n(\\mu\\mathbf{1},\\sigma^2\\mathrm{I}_n)$ ; le vecteur $(\\Pi Z,(\\mathrm{I}_n-\\Pi)Z)$, image linéaire de $Z$, est gaussien, de covariance croisée $\\sigma^2\\Pi(\\mathrm{I}_n-\\Pi)=0$ : par le **théorème de Cochran** (décorrélation ⇔ indépendance pour un vecteur gaussien), $\\Pi Z$ et $(\\mathrm{I}_n-\\Pi)Z$ sont indépendants, donc leurs fonctions $\\bar X_n$ et $S_n^2$ aussi.

**Q5.** $(\\mathrm{I}_n-\\Pi)\\mu\\mathbf{1}=0$ et $(\\mathrm{I}_n-\\Pi)$ est la projection sur un sous-espace de dimension $n-1$ : par Cochran, $\\|(\\mathrm{I}_n-\\Pi)Z\\|^2/\\sigma^2\\sim\\chi^2(n-1)$, i.e. $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ (théorème de **Gosset**).

**Q6.** $\\frac{\\sqrt n(\\bar X_n-\\mu_0)}{S_n}=\\frac{\\sqrt n(\\bar X_n-\\mu_0)/\\sigma}{\\sqrt{[(n-1)S_n^2/\\sigma^2]/(n-1)}}$ ; le numérateur suit $\\mathcal{N}(\\sqrt n(\\mu-\\mu_0)/\\sigma,1)$, le dénominateur est la racine d’un $\\chi^2(n-1)/(n-1)$ **indépendant** (Q4–Q5) : loi de **Student non centrale** à $n-1$ degrés de liberté, de paramètre de non-centralité $\\gamma=\\sqrt n(\\mu-\\mu_0)/\\sigma$ (Déf. 3.2).

**Q7.** Sous $H_0$ ($\\gamma=0$), loi $\\mathrm{t}(n-1)$, pour tout $\\sigma^2$ ; par parité, $\\overline{\\alpha}_c=2(1-F_{\\mathrm{t}(n-1)}(c))$ (le sup sur $\\Theta_0=\\{\\mu_0\\}\\times\\mathbb{R}_+^*$ ne dépend pas de $\\sigma^2$).

**Q8.** $c_\\alpha=\\mathrm{t}^{(n-1)}_{1-\\alpha/2}$ ; tout $c\\ge c_\\alpha$ donne un test de niveau $\\alpha$, mais $c_\\alpha$ est la **plus petite** valeur qui le garantit, donc celle qui **maximise la puissance** parmi ces tests : c’est le **test de Student** (Ex. 2.11).

**Q9.** Comme en Q3 : $\\hat\\alpha(Z)=2\\big(1-F_{\\mathrm{t}(n-1)}(\\tilde T(Z))\\big)$.`,
    bareme: [
      { label: 'Q1 fonction puissance', points: 0.75 },
      { label: 'Q2 taille et valeur critique', points: 0.5 },
      { label: 'Q3 p-valeur bilatérale', points: 0.5 },
      { label: 'Q4 indépendance par Cochran', points: 0.75 },
      { label: 'Q5 loi χ²(n−1)', points: 0.5 },
      { label: 'Q6 Student non centrale', points: 0.5 },
      { label: 'Q7–Q9 test de Student et p-valeur', points: 0.75 },
    ],
  },
]
