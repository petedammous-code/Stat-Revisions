import type { CourseSection } from '../types'

/** Sections 5 à 9 : hypothèse bilatérale, interprétation, méthodes types / examen, compléments hors programme. */
export const coursePart2: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 5. Hypothèse bilatérale
  // -------------------------------------------------------------------------
  {
    id: 'ch5-s5-bilateral',
    title: '5. Hypothèse bilatérale : il n’existe pas de test U.P.P.',
    role: 'preuves',
    intro:
      'Le test le plus courant en pratique — $\\theta=\\theta_0$ contre $\\theta\\ne\\theta_0$ — n’admet **pas** de test U.P.P. : le meilleur test contre une alternative à droite rejette pour les grandes valeurs de la statistique, le meilleur contre une alternative à gauche pour les petites, et l’unicité (Th. 1.2) interdit de faire les deux. La notion d’optimalité U.P.P. est **trop exigeante** ; on l’affaiblit en se restreignant aux tests sans biais (U.M.P.U.).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch5-prop-1-1',
        type: 'proposition',
        label: 'Proposition 1.1',
        title: 'Absence de test U.P.P. pour une hypothèse bilatérale',
        source: 'Poly ch.5, Prop. 1.1, éq. (3), p. 22',
        hypotheses: [
          '$Z=(X_1,\\dots,X_n)$ $n$-échantillon d’une **famille exponentielle** $p_\\theta(x)=h(x)\\exp\\big(\\varphi(\\theta)T(x)-\\psi(\\theta)\\big)$ par rapport à une mesure $\\mu$, avec $h,\\varphi,T,\\psi$ scalaires.',
          '$\\theta\\mapsto\\varphi(\\theta)$ **strictement croissante**.',
          '**Absence d’atome** : $\\mathbb{P}_\\theta\\big(\\sum_{i=1}^nT(X_i)=c\\big)=0$ pour tout $\\theta\\in\\Theta$ et tout $c\\in\\mathbb{R}$.',
          '$\\alpha\\in\\,]0,1[$.',
        ],
        statement: `Il n’existe pas de test U.P.P.($\\alpha$) pour

$$H_0:\\theta=\\theta_0\\quad\\text{contre}\\quad H_1:\\theta\\ne\\theta_0.\\qquad\\text{(3)}$$`,
        intuition: 'Aucun test ne peut être le meilleur à la fois à droite et à gauche sans perdre de la puissance de chaque côté. Le test bilatéral usuel ($|\\bar X_n-\\theta_0|$ grand) est un **compromis** : il n’est pas U.P.P., seulement U.M.P.U. (Exercice 5).',
        proof: [
          { text: 'Notons $T_n(z):=\\sum_{i=1}^nT(x_i)$. Pour $\\theta_1\\ne\\theta_0$, le rapport de vraisemblance vaut $\\exp\\big((\\varphi(\\theta_1)-\\varphi(\\theta_0))T_n(z)-n(\\psi(\\theta_1)-\\psi(\\theta_0))\\big)$ : strictement croissant en $T_n(z)$ si $\\theta_1>\\theta_0$, strictement décroissant si $\\theta_1<\\theta_0$.', justification: 'Produit des densités ($h$ se simplifie) ; $\\varphi$ strictement croissante.' },
          { text: 'Le Th. 1.1 donne, pour $\\theta=\\theta_0$ contre $\\theta=\\theta_1$, un U.P.P.($\\alpha$) de la forme $\\phi_+(z)=\\mathbb{1}_{\\{T_n(z)>d^+_\\alpha\\}}$ si $\\theta_1>\\theta_0$, $\\phi_-(z)=\\mathbb{1}_{\\{T_n(z)<d^-_\\alpha\\}}$ si $\\theta_1<\\theta_0$, seuils fixés par la taille $\\alpha$ sous $\\mathbb{P}_{\\theta_0}$.', justification: 'Méthode 1.2 ; l’absence d’atome assure que ces tests sont purs.' },
          { text: '*Par l’absurde*, soit $\\phi^\\star$ U.P.P.($\\alpha$) pour (3). Il est U.P.P.($\\alpha$) pour **chacun** des tests simples $\\theta=\\theta_0$ contre $\\theta=\\theta_1$, quel que soit $\\theta_1\\ne\\theta_0$.', justification: 'De niveau $\\alpha$ et de puissance maximale en chaque $\\theta_1\\ne\\theta_0$ (Déf. 1.2).' },
          { text: 'Avec $\\theta_1>\\theta_0$ : $\\phi^\\star=\\phi_+$ $\\mathbb{P}_{\\theta_0}$-p.s. ; avec $\\theta_1<\\theta_0$ : $\\phi^\\star=\\phi_-$ $\\mathbb{P}_{\\theta_0}$-p.s.', justification: 'Unicité, Th. 1.2.' },
          { text: 'Or $\\phi_+$ et $\\phi_-$ diffèrent sur $\\{T_n>d^+_\\alpha\\}$ et sur $\\{T_n<d^-_\\alpha\\}$, tous deux de probabilité $\\alpha>0$ sous $\\mathbb{P}_{\\theta_0}$ : contradiction.', justification: 'Sur $\\{T_n>d^+_\\alpha\\}$, $\\phi_+=1$ et $\\phi_-=0$ ; un ensemble de probabilité $\\alpha>0$ n’est pas négligeable.' },
        ],
        pitfalls: ['Croire que le test bilatéral $\\mathbb{1}_{\\{|\\bar X_n-\\theta_0|>c\\}}$ est U.P.P. : il est dominé par $\\phi_+$ à droite et par $\\phi_-$ à gauche.'],
      },
      {
        kind: 'example',
        id: 'ch5-ex-1-6',
        title: 'Exemple 1.6 — Le cas gaussien',
        source: 'Poly ch.5, Ex. 1.6, p. 22–23',
        setup: '$n$-échantillon de $\\{\\mathcal{N}(\\theta,1),\\ \\theta\\in\\mathbb{R}\\}$ ; $H_0:\\theta=\\theta_0$ contre $H_1:\\theta\\ne\\theta_0$.',
        steps: [
          { text: '$p_\\theta(z)=\\frac1{\\sqrt{2\\pi}}e^{-z^2/2}\\exp(\\theta z-\\theta^2/2)$ : famille exponentielle avec $h(z)=(2\\pi)^{-1/2}e^{-z^2/2}$, $T(z)=z$, $\\varphi(\\theta)=\\theta$ (strictement croissante), $\\psi(\\theta)=\\theta^2/2$.', justification: 'Développement du carré.' },
          { text: '$\\mathbb{P}_\\theta(\\sum_iX_i=c)=0$ pour tout $c$.', justification: '$\\sum_iX_i$ est à densité : hypothèse d’absence d’atome de la Prop. 1.1.' },
          { text: '$\\phi_+(Z)=\\mathbb{1}_{\\{\\sum_iX_i>n\\theta_0+\\sqrt n\\,z_{1-\\alpha}\\}}$ et $\\phi_-(Z)=\\mathbb{1}_{\\{\\sum_iX_i<n\\theta_0-\\sqrt n\\,z_{1-\\alpha}\\}}$.', justification: 'Sous $\\mathbb{P}_{\\theta_0}$, $\\sum_iX_i\\sim\\mathcal{N}(n\\theta_0,n)$.' },
          { text: 'Ces deux tests diffèrent : **il n’existe pas de test U.P.P.($\\alpha$)** pour $\\theta=\\theta_0$ contre $\\theta\\ne\\theta_0$.', justification: 'Prop. 1.1.' },
        ],
        conclusion: 'Deux affaiblissements possibles : (a) se restreindre aux **tests sans biais** $\\to$ optimalité **U.M.P.U.** (Exercice 5 ci-dessous, compléments §9) ; (b) mesurer la performance par la **vitesse de séparation** (hors cours).',
      },
      {
        kind: 'viz',
        id: 'ch5-s5-viz-bilateral',
        vizId: 'ch5-bilateral',
        caption: 'Les fonctions puissance des tests à droite ($\\phi^{\\star,1}$) et à gauche ($\\phi^{\\star,2}$) se croisent en $\\theta_0$ : chacun est optimal de son côté et **biaisé** de l’autre (puissance $<\\alpha$). Le test bilatéral $\\phi^{\\star,3}$ (courbe en U, tangente horizontale en $\\theta_0$) est un compromis, dominé de chaque côté.',
      },
      {
        kind: 'example',
        id: 'ch5-ex-exo5',
        title: 'Exercice 5 du poly (PC5 Ex. 2) — Pas de U.P.P. bilatéral ; le test bilatéral est sans biais',
        source: 'Poly ch.5, Exercice 5 (corrigé p. 39–42) ; PC5 Ex. 2',
        setup: '$n$-échantillon de $\\mathcal{N}(\\theta,1)$, niveau $\\alpha\\in\\,]0,1/2[$, $H_0:\\theta=\\theta_0$ contre $H_1:\\theta\\ne\\theta_0$. Un test est **sans biais de niveau $\\alpha$** s’il est de niveau $\\alpha$ et si $\\beta_\\phi(\\theta)\\ge\\alpha$ pour tout $\\theta\\in\\Theta_1$ ; **U.M.P.U.($\\alpha$)** s’il est uniformément plus puissant parmi les tests sans biais (définition de l’énoncé = Déf. 4.2 des compléments).',
        steps: [
          { text: '**Q1.** $r(z)=\\exp\\big(-\\frac n2(\\theta_1-\\theta_0)^2+(\\theta_1-\\theta_0)\\sum_i(x_i-\\theta_0)\\big)$. Si $\\theta_1>\\theta_0$ : $\\phi^{\\star,1}(Z)=\\mathbb{1}_{\\{\\bar X_n>\\theta_0+z_{1-\\alpha}/\\sqrt n\\}}$ ; si $\\theta_1<\\theta_0$ : $\\phi^{\\star,2}(Z)=\\mathbb{1}_{\\{\\bar X_n<\\theta_0-z_{1-\\alpha}/\\sqrt n\\}}$. Aucun ne dépend de $\\theta_1$.', justification: 'Th. 1.1 ; sous $\\mathbb{P}_{\\theta_0}$, $\\sum_i(X_i-\\theta_0)\\sim\\mathcal{N}(0,n)$ (seuil $\\sqrt n\\,z_{1-\\alpha}$ sur la somme) ; $z_\\alpha=-z_{1-\\alpha}$ car $\\alpha<1/2$.' },
          { text: 'Puissances ($W\\sim\\mathcal{N}(0,1)$) : $\\beta_{\\phi^{\\star,1}}(\\theta)=\\mathbb{P}\\big(W>\\sqrt n(\\theta_0-\\theta)+z_{1-\\alpha}\\big)$, $\\beta_{\\phi^{\\star,2}}(\\theta)=\\mathbb{P}\\big(W<\\sqrt n(\\theta_0-\\theta)-z_{1-\\alpha}\\big)$ : $=\\alpha$ en $\\theta_0$ mais $<\\alpha$ de l’autre côté : **biaisés** pour l’alternative bilatérale.', justification: 'Centrage-réduction sous $\\mathbb{P}_\\theta$ : $\\sqrt n(\\bar X_n-\\theta)\\sim\\mathcal{N}(0,1)$.' },
          { text: '**Q2–Q3.** $\\phi^{\\star,1}$ est U.P.P.($\\alpha$) pour $\\theta\\le\\theta_0$ (ou $=\\theta_0$) contre $\\theta>\\theta_0$.', justification: 'Rapport monotone croissant en $\\bar X_n$ (Ex. 1.4) et Th. 1.3, ou : optimal pour chaque $\\theta_1>\\theta_0$ et indépendant de $\\theta_1$.' },
          { text: '**Q4.** Pas de U.P.P. pour (4) : sinon il serait égal p.s. à $\\phi^{\\star,1}$ et à $\\phi^{\\star,2}$, qui diffèrent sur un ensemble de probabilité $\\alpha$ sous $\\mathbb{P}_{\\theta_0}$.', justification: 'Th. 1.2 (unicité), comme dans la Prop. 1.1.' },
          { text: '**Q5.** $\\phi^{\\star,3}(Z)=\\mathbb{1}_{\\{|\\bar X_n-\\theta_0|>z_{1-\\alpha/2}/\\sqrt n\\}}$, de puissance $\\beta_{\\phi^{\\star,3}}(\\theta)=1-\\Phi\\big(z_{1-\\alpha/2}+\\sqrt n(\\theta_0-\\theta)\\big)+\\Phi\\big(-z_{1-\\alpha/2}+\\sqrt n(\\theta_0-\\theta)\\big)$.', justification: 'Niveau $\\alpha$ : quantile $z_{1-\\alpha/2}$ (bilatéral), pas $z_{1-\\alpha}$.' },
          { text: '**Q6.** Un U.P.P.($\\alpha$) est sans biais : il domine le test constant $\\bar\\phi\\equiv\\alpha$, de puissance $\\alpha$ partout.', justification: 'Déf. 1.2 appliquée à $\\bar\\phi\\in\\mathcal{K}_\\alpha(\\Theta_0)$ (Prop. 4.1).' },
          { text: '**Q7.** Si $\\beta_\\phi(\\theta_0)\\le\\alpha$ et $\\beta_\\phi\\ge\\alpha$ au voisinage de $\\theta_0$, alors $\\beta_\\phi(\\theta_0)=\\alpha$ et $\\beta\'_\\phi(\\theta_0)=0$ (5).', justification: 'Convergence dominée : $\\beta_\\phi$ continue et dérivable ; $\\theta_0$ est un minimum local (condition du premier ordre). La continuité seule ne donne pas la dérivée nulle.' },
          { text: '**Q8.** $\\beta_{\\phi^{\\star,3}}(\\theta_0)=\\alpha$ et $\\beta\'_{\\phi^{\\star,3}}(\\theta_0)=0$, et $\\beta_{\\phi^{\\star,3}}\\ge\\alpha$ partout : $\\phi^{\\star,3}$ est sans biais.', justification: 'La dérivée fait intervenir $f_{0,1}(z_{1-\\alpha/2})-f_{0,1}(-z_{1-\\alpha/2})=0$ ($f_{0,1}$ paire).' },
          { text: '**Q9.** $\\phi^{\\star,3}$ maximise $I_\\theta(\\phi)=\\int\\phi\\,(f_{3,\\theta}-\\kappa_{1,\\theta}f_1-\\kappa_{2,\\theta}f_2)$ et, pour toute $\\phi$ vérifiant (5), $I_\\theta(\\phi)=\\beta_\\phi(\\theta)-\\kappa_{1,\\theta}\\alpha$ : donc $\\phi^{\\star,3}$ est **U.M.P.U.($\\alpha$)**.', justification: 'Neyman-Pearson à deux contraintes ; $\\kappa_{1,\\theta},\\kappa_{2,\\theta}$ choisis par convexité de l’exponentielle (la corde passe par $(\\pm C_\\theta,e^{\\pm C_\\theta})$).' },
        ],
        conclusion: 'Numérique ($n=10$, $\\theta_0=0$, $\\alpha=0{,}05$) : en $\\theta=0{,}5$, $\\beta_{\\phi^{\\star,1}}\\approx0{,}475$, $\\beta_{\\phi^{\\star,2}}\\approx0{,}0006$, $\\beta_{\\phi^{\\star,3}}\\approx0{,}353$. Pièges : les tests unilatéraux sont **biaisés** pour l’alternative bilatérale ; seuil bilatéral $z_{1-\\alpha/2}$ ; les coefficients $\\kappa_{1,\\theta},\\kappa_{2,\\theta}$ dépendent de $\\theta$ mais la région de rejet de $\\phi^{\\star,3}$ n’en dépend pas (même mécanisme que « le test ne dépend pas de $\\theta_1$ »).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 6. Interpréter un test
  // -------------------------------------------------------------------------
  {
    id: 'ch5-s6-interpretation',
    title: '6. Interpréter un test U.P.P. : décision, p-valeur, taille d’effet',
    role: 'intuition',
    intro: 'L’optimalité ne change pas la lecture d’un test (§1.10, p. 23–24) : seule la décision de rejet est « forte », la $p$-valeur résume la décision à tous les niveaux, et la conclusion d’un test se lit toujours **avec la taille d’effet à côté**.',
    blocks: [
      {
        kind: 'text',
        id: 'ch5-s6-decision',
        title: 'Comment interpréter la décision d’un test (§1.10, p. 23)',
        text: `- *Si j’accepte $H_0$, ai-je prouvé $H_0$ ?* **Certainement pas.** On a seulement **échoué à rejeter** $H_0$ : pas assez d’information statistique pour la rejeter. Aucune contradiction à échouer à rejeter $H_0:\\mu\\le\\mu_0$ (contre $\\mu>\\mu_0$) **et** à échouer à rejeter $H_0:\\mu>\\mu_0$ (contre $\\mu\\le\\mu_0$) : les deux tests ne sont pas construits sur la même hypothèse nulle.
- *Si je rejette $H_0$, ai-je prouvé $H_1$ ?* **Non**, mais on a tiré une conclusion statistique : sous $H_0$, la probabilité d’observer ce que l’on a observé est inférieure à $\\alpha$ ; on a des raisons de croire que l’on n’est pas sous $H_0$. Le modèle lui-même peut être incorrect, ou $\\theta\\ne\\theta_0$ peut ne pas impliquer $\\theta=\\theta_1$.

Asymétrie des hypothèses : seule la décision de rejet est « forte ».`,
      },
      {
        kind: 'example',
        id: 'ch5-ex-pvaleur-upp',
        title: 'La p-valeur du test U.P.P. gaussien (§1.10)',
        source: 'Poly ch.5, §1.10 « La p-valeur du test U.P.P. », p. 23 ; Poly ch.4, Déf. 2.4 et Ex. 2.13',
        setup: 'Modèle gaussien de variance connue (Ex. 1.3) ; famille de tests U.P.P. $\\phi^\\star_\\alpha(Z)=\\mathbb{1}_{\\{\\bar X_n>\\mu_0+\\sigma z_{1-\\alpha}/\\sqrt n\\}}$, $\\alpha\\in\\,]0,1[$.',
        steps: [
          { text: 'Quand $\\alpha\\downarrow0$, $z_{1-\\alpha}\\uparrow+\\infty$ et le seuil croît : les régions de rejet sont **emboîtées** ($\\mathcal{R}_\\alpha\\subseteq\\mathcal{R}_{\\alpha\'}$ pour $\\alpha\\le\\alpha\'$).', justification: 'Monotonie de $\\alpha\\mapsto z_{1-\\alpha}$ ; c’est l’hypothèse de la définition de la $p$-valeur (ch.4, Déf. 2.4).' },
          { text: 'La valeur de $\\alpha$ où la décision bascule égalise seuil et moyenne observée : $\\mu_0+\\sigma z_{1-\\hat\\alpha(Z)}/\\sqrt n=\\bar X_n$.', justification: '$\\hat\\alpha(Z)=\\inf\\{\\alpha:Z\\in\\mathcal{R}_\\alpha\\}$.' },
          { text: '$\\hat\\alpha(Z)=1-\\Phi\\Big(\\frac{\\sqrt n(\\bar X_n-\\mu_0)}\\sigma\\Big)$.', justification: '$\\Phi(z_\\beta)=\\beta$.' },
        ],
        conclusion: 'C’est la $p$-valeur déjà calculée au chapitre 4 (Ex. 2.13) : l’optimalité ne change pas sa lecture ; elle dit seulement de quelle famille de tests elle est issue. (Examen 2025 Ex. 1 Q3 : même démarche pour le test de Neyman-Pearson du modèle exponentiel, $\\hat\\alpha(Z)=F_{\\chi^2(2n)}(2\\theta_0\\sum_iX_i)$.)',
      },
      {
        kind: 'text',
        id: 'ch5-s6-taille-effet',
        title: 'Statistiquement significatif, et taille d’effet (§1.10, p. 23–24)',
        text: `Significativité statistique et importance de l’effet sont deux choses différentes (chapitre 4, Ex. 2.14 : un dépassement de 8 dB sur $n=4$ observations ne conduit pas à rejeter, un dépassement de 0,2 dB sur $n=10^4$ y conduit). Contre-exemple cité par le poly (D. Raoult, devant les députés, 2020) : « *Moins il y a de gens quand c’est significatif, et plus c’est significatif. Tout essai qui comporte plus de 10 000 personnes est un essai qui cherche à démontrer des choses qui n’existent pas.* »

**Énoncé correct** : moins il y a de participants lorsqu’un résultat est significatif, plus l’effet doit être grand pour avoir été détecté ; un essai qui nécessite plus de 10 000 personnes cherche à détecter des **effets petits**. Lecture directe de

$$\\beta_{\\phi^\\star}(\\mu_1)=1-\\Phi\\big(z_{1-\\alpha}-\\sqrt n\\,m/\\sigma\\big),\\qquad m=\\mu_1-\\mu_0 :$$

fixer la puissance impose $z_{1-\\alpha}-\\sqrt n\\,m/\\sigma=$ constante, donc **à niveau et puissance fixés, la taille d’effet $m$ détectable décroît en $n^{-1/2}$**.

Les tests sont précieux (risque de 1re espèce contrôlé, optimalité) et dangereux (décision binaire, muette sur l’ampleur de l’écart) : **la conclusion d’un test se lit toujours avec la taille d’effet à côté.**`,
      },
      {
        kind: 'viz',
        id: 'ch5-s6-viz-effet',
        vizId: 'ch5-taille-effet',
        caption: 'Effet minimal détectable $m_{\\min}(n)=\\sigma(z_{1-\\alpha}+z_{\\pi})/\\sqrt n$ à puissance $\\pi$ fixée : il décroît en $n^{-1/2}$. Un grand essai ne « fabrique » pas d’effets, il en détecte de petits.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 7. Méthodes types et À l'examen
  // -------------------------------------------------------------------------
  {
    id: 'ch5-s7-examen',
    title: '7. Méthodes types et « À l’examen »',
    role: 'liens-examen',
    intro: 'Le chapitre 5 fournit à chaque annale un exercice « test U.P.P. » très codifié (CC 2022 Ex. 1 entier, ≈ 4 pts ; Examen 2025 Ex. 1 Q2, ≈ 1,5 pt) et une question de cours (énoncer Neyman-Pearson avec ses hypothèses). La rédaction attendue est toujours la même.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch5-meth-redaction',
        type: 'methode',
        label: 'Méthode type',
        title: 'Rédiger « montrer le RVM » puis « construire le test U.P.P.(α) »',
        source: 'Synthèse Poly ch.5 (Déf. 1.4–1.5, Th. 1.1, 1.3, 1.4, Méthodes 1.1–1.3) ; DIAGNOSTIC §5.1–5.3',
        statement: `**A. Rapport de vraisemblance monotone.**
1. Écrire la densité du $n$-échantillon $p_\\theta(z)=\\prod_iq_\\theta(x_i)$ et la **factoriser** $h(z)\\,\\psi(T(z);\\theta)$ : tout ce qui ne dépend pas de $\\theta$ dans $h$, nommer $T$ (souvent $\\sum x_i$, $\\sum x_i^c$, $\\sum x_i^2$, $\\max x_i$).
2. Pour $\\theta>\\theta'$, calculer $t\\mapsto\\psi(t;\\theta)/\\psi(t;\\theta')$ (en général $e^{t[a(\\theta)-a(\\theta')]}\\times$ constante) et dire **strictement croissante** ou **strictement décroissante** selon le signe de $a(\\theta)-a(\\theta')$.
3. Conclure : « famille à RVM croissant (resp. décroissant) en $T$, Déf. 1.4 (resp. 1.5) ».

**B. Test U.P.P.($\\alpha$) de $\\theta\\le\\theta_0$ contre $\\theta>\\theta_0$.**
1. Vérifier les trois conditions de la Méthode 1.3 (scalaire, unilatéral, RVM) et que $T(Z)$ est **à densité** (sinon randomiser).
2. Écrire $\\phi(Z)=\\mathbb{1}_{\\{T(Z)>d_\\alpha\\}}$ (RVM croissant) ou $\\mathbb{1}_{\\{T(Z)<d_\\alpha\\}}$ (décroissant), **seuil calibré en $\\theta_0$**.
3. Identifier la **loi de $T(Z)$ sous $\\mathbb{P}_{\\theta_0}$** (additivité Gamma, $\\chi^2$, binomiale…) et exprimer $d_\\alpha$ par un quantile.
4. Citer : « par le Th. 1.3 (resp. 1.4), ce test est U.P.P.($\\alpha$) et sa fonction puissance est croissante, donc sa taille vaut $\\beta_\\phi(\\theta_0)=\\alpha$ ».
5. Si demandé, puissance $\\beta_\\phi(\\theta)=\\mathbb{P}_\\theta(T>d_\\alpha)$ via un pivot de loi fixe ($T/\\theta$, $\\theta T$…).

**C. Neyman-Pearson $\\theta_0$ contre $\\theta_1$** : $r(z)$ → fonction monotone de $T$ (préciser le sens selon $\\theta_1\\gtrless\\theta_0$) → $\\{r>c_\\alpha\\}=\\{T\\gtrless d_\\alpha\\}$ → absence d’atome → seuil sous $\\mathbb{P}_{\\theta_0}$ → « taille exactement $\\alpha$ et U.P.P.($\\alpha$) par le Th. 1.1 » → remarquer si le seuil ne dépend pas de $\\theta_1$ (U.P.P. contre l’alternative composite).`,
        intuition: 'Chaque étape vaut des points : la factorisation explicite, le mot « strictement », l’absence d’atome, la loi sous $\\theta_0$, le nom du théorème.',
        pitfalls: ['Sens du rejet inversé (échelle vs intensité) ; seuil calculé sous $\\theta_1$ ; oubli de « taille exactement $\\alpha$ » ; oubli de l’hypothèse d’absence d’atome dans l’énoncé de Neyman-Pearson.'],
      },
      {
        kind: 'text',
        id: 'ch5-s7-exam2025',
        title: 'Ce qui est tombé — Examen 2025 Ex. 1 Q2 (≈ 1,5 pt) et Ex. 4 Q4, Q12',
        text: `**Ex. 1 Q2** (modèle $p_\\theta(x)=\\theta e^{-\\theta x}$, **intensité**) : test de Neyman-Pearson de niveau $\\alpha$ de $\\theta=\\theta_0$ contre $\\theta=\\theta_1>\\theta_0$, seuil via un quantile Gamma.

- $r(z)=(\\theta_1/\\theta_0)^n\\exp\\big(-(\\theta_1-\\theta_0)\\sum_ix_i\\big)$, **strictement décroissant** en $T(z)=\\sum_ix_i$ ;
- $T(Z)$ à densité : pas d’atome ; $\\{r>c_\\alpha\\}=\\{T<d_\\alpha\\}$ ;
- sous $\\mathbb{P}_{\\theta_0}$, $T\\sim\\Gamma(n,\\theta_0)$, $2\\theta_0T\\sim\\chi^2(2n)$, d’où $d_\\alpha=\\dfrac{\\chi^2_\\alpha(2n)}{2\\theta_0}$ (quantile d’ordre $\\alpha$, pas $1-\\alpha$) ;
- seuil indépendant de $\\theta_1$ : U.P.P. aussi pour $\\theta\\le\\theta_0$ contre $\\theta>\\theta_0$ (RVM décroissant, Th. 1.4).

**Piège** : ne pas rejeter pour les grandes valeurs de $\\sum X_i$ — une grande intensité donne de **petites** observations. La Q3 enchaîne sur la $p$-valeur : $\\hat\\alpha(Z)=F_{\\chi^2(2n)}(2\\theta_0\\sum_iX_i)$.

**Ex. 4 Q4 et Q12 (questions sur les DM/EN : Q4 en QCM, Q12 question ouverte)** : le test d’égalité des variances de deux échantillons gaussiens par **rapport de vraisemblance généralisé** conduit à $S_X^2/S_Y^2\\sim F(n-1,p-1)$ sous $H_0$ ; tester un sous-modèle d’une régression multiple (effet conjoint de deux variables) se fait par le **test de Fisher** $F=\\frac{(SCR_0-SCR)/2}{SCR/(n-p)}\\sim F(2,n-p)$ — c’est l’Exercice 6 du poly (PC5 Ex. 4), complément §9.`,
      },
      {
        kind: 'text',
        id: 'ch5-s7-cc2022',
        title: 'Ce qui est tombé — CC 2022 Ex. 1 : test U.P.P. dans le modèle de Weibull (≈ 4 pts)',
        text: `$p_\\theta(x)=\\frac c\\theta x^{c-1}e^{-x^c/\\theta}\\mathbb{1}_{\\mathbb{R}_+}(x)$, $c>0$ connu ; $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$. Convention du sujet : $\\mathrm{Gamma}(p,\\lambda)$ **d’échelle** $\\lambda$, $\\mathrm{Gqf}_n$ et $\\mathrm{Gcdf}_n$ quantile et f.d.r. de $\\mathrm{Gamma}(n,1)$.

- **Q1** (0,75) : $X^c$ suit la loi exponentielle d’échelle $\\theta$ (changement de variable $y=x^c$).
- **Q2** (1) : $h(z)=c^n\\prod x_i^{c-1}$, $T(z)=\\sum_ix_i^c$, $\\psi(t;\\theta)=\\exp(-t/\\theta-n\\ln\\theta)$ ; pour $\\theta>\\theta'$, $\\psi(t;\\theta)/\\psi(t;\\theta')=\\exp\\big(t\\frac{\\theta-\\theta'}{\\theta\\theta'}-n\\ln(\\theta/\\theta')\\big)$ strictement **croissante**.
- **Q3** (1,25) : $\\phi(z)=\\mathbb{1}_{\\{T(z)>c_\\alpha\\}}$ ; sous $\\mathbb{P}_{\\theta_0}$, $T/\\theta_0\\sim\\mathrm{Gamma}(n,1)$, donc le seuil est $\\theta_0\\,\\mathrm{Gqf}_n(1-\\alpha)$ (Th. 1.3).
- **Q4** (1) : $\\beta_\\phi(\\theta)=1-\\mathrm{Gcdf}_n\\big(\\theta_0\\mathrm{Gqf}_n(1-\\alpha)/\\theta\\big)$, croissante, $=\\alpha$ en $\\theta_0$.

Jumeau direct : Exercice 1 du poly / PC5 Ex. 1 (c’est le cas $c=1$).`,
      },
      {
        kind: 'text',
        id: 'ch5-s7-questions-cours',
        title: 'Questions de cours à savoir énoncer (DIAGNOSTIC §4)',
        text: `- **Neyman-Pearson (Th. 1.1)** avec ses trois hypothèses (modèle dominé à deux points, **absence d’atome**, $\\alpha\\in\\,]0,1[$), les deux conclusions (taille **exactement** $\\alpha$ ; U.P.P. et puissance $\\ge\\alpha$), et la preuve par l’inégalité clé $(\\phi^\\star-\\phi)(p_{\\theta_1}-c_\\alpha p_{\\theta_0})\\ge0$.
- **Unicité (Th. 1.2)** : presque partout hors de la frontière, et p.s. sous $\\mathbb{P}_{\\theta_0}$ et $\\mathbb{P}_{\\theta_1}$.
- **RVM et test unilatéral** : Déf. 1.4/1.5 (factorisation, **stricte** monotonie), Th. 1.3/1.4 ($T(Z)$ à densité ; puissance croissante), Méthode 1.3 (trois conditions). **Prop. 1.1** : pas d’U.P.P. bilatéral.
- **Test pur, fonction puissance, taille, niveau** (Déf. 1.1) ; **U.P.P.** (Déf. 1.2) ; la $p$-valeur du test U.P.P. (§1.10).`,
      },
      {
        kind: 'text',
        id: 'ch5-s7-pieges',
        title: 'Pièges relevés dans les annales et les corrigés (DIAGNOSTIC §6)',
        text: `- **Conventions** : « exponentielle de paramètre $\\theta$ » = intensité dans la convention générale du poly (ch.1 : $\\mathcal{E}(\\theta)=\\Gamma(1,\\theta)$) et l’Examen 2025 ($\\theta e^{-\\theta x}$), **moyenne/échelle** dans la PC4 Ex. 1, la PC5 Ex. 1 (= Exercice 1 du poly ch.5) et le CC 2022 ($\\theta^{-1}e^{-x/\\theta}$). Le sens de la monotonie et la direction de la région de rejet **s’inversent**. Relire l’en-tête du sujet et écrire la densité utilisée.
- **Sens de la région de rejet** : on rejette du côté où la statistique rend $H_1$ plus vraisemblable ; le seuil se calibre toujours à la **borne** $\\theta_0$.
- **Niveau / taille / puissance** : un test U.P.P. est de taille exactement $\\alpha$, sauf exception (exponentielle translatée, PC5 Ex. 3 : puissance 1). Risque de 2e espèce $=1-\\beta_\\phi$.
- **Seuil sous $H_0$** : Ex. 1.1, $X>z_{1-\\alpha}-1$ et non $X>z_{1-\\alpha}$.
- **Statistique discrète** : la taille d’un test pur ne peut prendre qu’un ensemble discret de valeurs ; pour la taille exacte, randomiser ($\\gamma_\\alpha$).
- **Unicité** : « coïncident partout » est faux ; et elle tombe en présence d’atomes (uniforme, exponentielle translatée).
- **Bilatéral** : quantile $z_{1-\\alpha/2}$ ; le test bilatéral n’est **pas** U.P.P. (il est U.M.P.U.).
- **Interprétation** : ne pas rejeter $\\ne$ prouver $H_0$ ; significatif $\\ne$ important (taille d’effet) ; la $p$-valeur n’est pas la probabilité de $H_0$.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 8. Compléments I : randomisation
  // -------------------------------------------------------------------------
  {
    id: 'ch5-s8-randomisation',
    title: '8. Compléments (hors programme) I : statistiques discrètes, tests randomisés, non-unicité',
    role: 'complements',
    scope: 'hors-programme',
    intro: 'Section « 4 Les compléments » du poly (p. 47–55) : « Les contenus de cette partie ne sont pas exigibles. » Ils sont néanmoins mobilisés par la PC5 (Ex. 3 exponentielle translatée, Ex. 5 monotonie en le niveau, Ex. 6 temps d’attente géométriques) : à connaître pour comprendre ce qui se passe quand l’absence d’atome tombe.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch5-def-4-1',
        type: 'definition',
        label: 'Définition 4.1',
        title: 'Test randomisé',
        source: 'Poly ch.5, Compléments, Déf. 4.1, p. 48',
        scope: 'hors-programme',
        hypotheses: ['$\\phi:\\mathsf{Z}\\to[0,1]$ mesurable (fonction critique).'],
        statement: 'Étant donnée $Z$, on simule une Bernoulli de paramètre $\\phi(Z)$, indépendamment de $Z$ ; on garde $H_0$ si le tirage vaut 0, on la rejette s’il vaut 1. Partition de $\\mathsf{Z}$ : $\\mathsf{Z}_1=\\{\\phi=1\\}$ (rejet), $\\mathsf{Z}_0=\\{\\phi=0\\}$ (acceptation), $\\mathsf{Z}_p=\\{0<\\phi<1\\}$ (issue non déterminée par les observations). La fonction puissance reste $\\beta_\\phi(\\theta)=\\mathbb{E}_\\theta[\\phi(Z)]$.',
        intuition: 'Pourquoi : la preuve du Th. 1.1 utilise $\\mathbb{E}_{\\theta_0}[\\phi^\\star]=\\alpha$ ; dès que la statistique est discrète, aucun test pur n’a une taille exactement $\\alpha$ pour $\\alpha$ arbitraire. Pile ou face truqué quand l’observation tombe sur la valeur critique : « acheter une fraction de pixel ». Procédé artificiel, pratiquement jamais employé, mais indispensable pour énoncer Neyman-Pearson sans restriction.',
      },
      {
        kind: 'theorem',
        id: 'ch5-thm-4-1',
        type: 'theoreme',
        label: 'Théorème 4.1',
        title: 'Neyman-Pearson, forme générale (avec randomisation)',
        source: 'Poly ch.5, Compléments, Th. 4.1, éq. (10)–(11), p. 50–51',
        scope: 'hors-programme',
        hypotheses: ['$\\nu$ $\\sigma$-finie ; modèle $\\{p_\\theta\\cdot\\nu,\\ \\theta\\in\\{\\theta_0,\\theta_1\\}\\}$, $\\theta_0\\ne\\theta_1$, **sans hypothèse sur les atomes**.', '$\\alpha\\in\\,]0,1[$.'],
        statement: `Il existe $c_\\alpha>0$ et $\\gamma_\\alpha\\in[0,1]$ tels que

$$\\phi^\\star(z):=\\begin{cases}1&\\text{si }p_{\\theta_1}(z)>c_\\alpha p_{\\theta_0}(z),\\\\\\gamma_\\alpha&\\text{si }p_{\\theta_1}(z)=c_\\alpha p_{\\theta_0}(z),\\\\0&\\text{si }p_{\\theta_1}(z)<c_\\alpha p_{\\theta_0}(z),\\end{cases}$$

vérifie $\\mathbb{E}_{\\theta_0}[\\phi^\\star(Z)]=\\alpha$. Les conclusions des Th. 1.1 et 1.2 valent : $\\phi^\\star$ est U.P.P.($\\alpha$), $\\mathbb{E}_{\\theta_1}[\\phi^\\star]\\ge\\alpha$, et tout U.P.P. vaut $1$ sur $\\{p_{\\theta_1}>c_\\alpha p_{\\theta_0}\\}$ et $0$ sur $\\{p_{\\theta_1}<c_\\alpha p_{\\theta_0}\\}$ $\\nu$-p.p. (Le Th. 1.1 est le cas $\\gamma_\\alpha=0$.)`,
        intuition: 'Seule l’existence de $(c_\\alpha,\\gamma_\\alpha)$ est nouvelle ; l’inégalité clé (1) reste valable. **L’unicité est perdue** : la frontière $\\{p_{\\theta_1}=c_\\alpha p_{\\theta_0}\\}$ n’est plus négligeable. Lecture graphique : $1-\\alpha=(1-\\gamma)F(c)+\\gamma F(c^-)$, $\\gamma_\\alpha$ écrit $1-\\alpha$ comme **barycentre** des deux valeurs de $F$ de part et d’autre du saut.',
        proof: [
          { text: '$\\bar F(c):=\\mathbb{P}_{\\theta_0}(p_{\\theta_1}(Z)>c\\,p_{\\theta_0}(Z))$ est décroissante, continue à droite, $\\bar F(c^-)=\\mathbb{P}_{\\theta_0}(p_{\\theta_1}(Z)\\ge c\\,p_{\\theta_0}(Z))$, saut $=\\mathbb{P}_{\\theta_0}(p_{\\theta_1}=c\\,p_{\\theta_0})$.', justification: 'Outils, Prop. 2.1.' },
          { text: '$\\bar F(0^-)=1$ et $\\lim_{+\\infty}\\bar F=0$ : il existe $c_\\alpha\\ge0$ avec $\\bar F(c_\\alpha)\\le\\alpha\\le\\bar F(c_\\alpha^-)$ (11).', justification: 'Fonction quantile (inverse généralisée), Outils p. 26.' },
          { text: '$\\gamma_\\alpha:=0$ si $\\bar F(c_\\alpha)=\\alpha$, sinon $\\gamma_\\alpha:=\\dfrac{\\alpha-\\bar F(c_\\alpha)}{\\bar F(c_\\alpha^-)-\\bar F(c_\\alpha)}\\in[0,1]$.', justification: 'Bien défini et dans $[0,1]$ par (11).' },
          { text: '$\\mathbb{E}_{\\theta_0}[\\phi^\\star(Z)]=\\bar F(c_\\alpha)+\\gamma_\\alpha\\big(\\bar F(c_\\alpha^-)-\\bar F(c_\\alpha)\\big)=\\alpha$ ; l’optimalité se démontre comme au Th. 1.1.', justification: 'Linéarité ; inégalité clé (1) inchangée.' },
        ],
      },
      {
        kind: 'example',
        id: 'ch5-ex-4-1',
        title: 'Exemple 4.1 — Modèle de Poisson : d’un test pur à un test randomisé',
        source: 'Poly ch.5, Compléments, Ex. 4.1, p. 49',
        scope: 'hors-programme',
        setup: '$n$-échantillon $\\mathrm{Poi}(\\theta)$, $0<\\theta_0<\\theta_1$ ; $T(Z):=\\sum_iX_i\\sim\\mathrm{Poi}(n\\theta)$.',
        steps: [
          { text: 'Rapport $(\\theta_1/\\theta_0)^{T(z)}\\exp(-n(\\theta_1-\\theta_0))$, strictement croissant en $T$ ; $T$ entière : atomes.', justification: 'Log-vraisemblance $-n\\theta+\\log(\\theta)T(Z)-\\sum_i\\log(X_i!)$.' },
          { text: 'Test pur $\\mathbb{1}_{\\{T>c_\\alpha\\}}$, $c_\\alpha:=\\inf\\{c\\in\\mathbb{N}:\\mathbb{P}_{\\theta_0}(T>c)\\le\\alpha\\}$. Numérique : $\\theta_0=0{,}01$, $n=100$, $T\\sim\\mathrm{Poi}(1)$ : $\\mathbb{P}(T>2)\\simeq0{,}080$, $\\mathbb{P}(T>3)\\simeq0{,}019$ ; pour $\\alpha=0{,}05$, $c_\\alpha=3$ et la taille vaut $0{,}019$.', justification: 'Le test pur est de niveau $\\alpha$ mais sa taille est bien inférieure.' },
          { text: 'Test randomisé : rejet si $T>3$, rejet avec probabilité $\\gamma_\\alpha$ si $T=3$, avec $\\gamma_\\alpha=\\dfrac{\\alpha-\\mathbb{P}_{\\theta_0}(T>c_\\alpha)}{\\mathbb{P}_{\\theta_0}(T=c_\\alpha)}\\approx0{,}5$.', justification: 'Taille $\\mathbb{P}(T>3)+\\gamma\\,\\mathbb{P}(T=3)=\\alpha$ ; $\\gamma\\in[0,1[$ car $\\mathbb{P}(T>c_\\alpha)\\le\\alpha<\\mathbb{P}(T>c_\\alpha-1)$.' },
        ],
        conclusion: 'Le test randomisé dépense tout le budget $\\alpha=0{,}05$ ; le test pur n’en dépense que $0{,}019$.',
      },
      {
        kind: 'example',
        id: 'ch5-ex-4-2',
        title: 'Exemple 4.2 — Sondage : le test U.P.P. est randomisé',
        source: 'Poly ch.5, Compléments, Ex. 4.2, p. 51–52',
        scope: 'hors-programme',
        setup: '$n$-échantillon $\\mathcal{B}\\mathrm{er}(\\theta)$, $T(Z):=\\sum_iX_i\\sim\\mathrm{Bin}(n,\\theta)$ ; $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$.',
        steps: [
          { text: 'Rapport monotone croissant en $T$ (Ex. 1.5), $T$ discrète : la version randomisée du Th. 1.3 donne $\\phi(z)=1$ si $T>d$, $\\gamma$ si $T=d$, $0$ si $T<d$.', justification: 'Preuve du Th. 1.3 en remplaçant le Th. 1.1 par le Th. 4.1.' },
          { text: '$d_{\\alpha,\\theta_0}=\\inf\\{c:\\ \\mathbb{P}_{\\theta_0}(T>c)\\le\\alpha\\}$, $\\gamma_{\\alpha,\\theta_0}=\\dfrac{\\alpha-\\mathbb{P}_{\\theta_0}(T>d_{\\alpha,\\theta_0})}{\\mathbb{P}_{\\theta_0}(T=d_{\\alpha,\\theta_0})}$.', justification: 'Condition de taille en $\\theta_0$.' },
          { text: 'Numérique : $\\theta_0=1/2$, $n=1000$, $\\alpha=0{,}05$ : $d_{\\alpha,\\theta_0}=526$, $\\gamma_{\\alpha,\\theta_0}=0{,}4832$.', justification: 'Calcul binomial exact.' },
        ],
        conclusion: 'Sauf valeurs exceptionnelles de $\\alpha$, le test U.P.P. est randomisé. Même formule en Poisson : $\\alpha=\\sum_{j>d}e^{-n\\theta_0}(n\\theta_0)^j/j!+\\gamma\\,e^{-n\\theta_0}(n\\theta_0)^d/d!$.',
      },
      {
        kind: 'viz',
        id: 'ch5-s8-viz-randomise',
        vizId: 'ch5-randomise',
        caption: 'Statistique discrète sous $H_0$ : la taille du test pur saute d’une valeur à l’autre ; la randomisation sur l’atome $T=d_\\alpha$ (barre orange) permet d’atteindre exactement $\\alpha$. Préréglages : Ex. 4.1 (Poisson) et Ex. 4.2 (sondage, $d=526$, $\\gamma=0{,}4832$).',
      },
      {
        kind: 'example',
        id: 'ch5-ex-exo4',
        title: 'Exercice 4 du poly (PC5 Ex. 3) — Exponentielle translatée : U.P.P. non unique, puissance 1',
        source: 'Poly ch.5, Exercice 4 (corrigé p. 38–39) ; PC5 Ex. 3',
        scope: 'hors-programme',
        setup: '$n$-échantillon de densité $p_\\theta(x)=e^{-(x-\\theta)}\\mathbb{1}_{]\\theta,\\infty[}(x)$, $\\theta_0<\\theta_1$, $H_0:\\theta=\\theta_0$ contre $H_1:\\theta=\\theta_1$ ; $X_{1:n}:=\\min_iX_i$.',
        steps: [
          { text: '$\\mathrm{L}_n(\\theta)=\\exp(n\\theta-\\sum_ix_i)\\mathbb{1}_{\\{\\theta<x_{1:n}\\}}$ ; pour $x_{1:n}>\\theta_0$ : $r=e^{n(\\theta_1-\\theta_0)}$ si $x_{1:n}>\\theta_1$, $r=0$ si $\\theta_0<x_{1:n}\\le\\theta_1$.', justification: 'Produit d’indicatrices = indicatrice du minimum.' },
          { text: '$r(Z)$ ne prend que deux valeurs : atomes, Th. 4.1. Selon $c$ : forme $\\phi_1$ ($1$ si $X_{1:n}>\\theta_1$, ${\\gamma}$ sinon) ou $\\phi_2$ (${\\gamma}$ si $X_{1:n}>\\theta_1$, $0$ sinon).', justification: '$\\phi=\\mathbb{1}_{\\{r>c\\}}+\\gamma\\mathbb{1}_{\\{r=c\\}}$ avec $c=0$ ou $0<c\\le e^{n(\\theta_1-\\theta_0)}$.' },
          { text: '$\\mathbb{P}_{\\theta_0}(X_{1:n}>\\theta_1)=e^{-n(\\theta_1-\\theta_0)}$. Si $\\alpha\\ge e^{-n(\\theta_1-\\theta_0)}$ : forme $\\phi_1$, $\\gamma=\\frac{\\alpha e^{n(\\theta_1-\\theta_0)}-1}{e^{n(\\theta_1-\\theta_0)}-1}$ ; sinon $\\phi_\\alpha=\\alpha e^{n(\\theta_1-\\theta_0)}\\mathbb{1}_{\\{X_{1:n}>\\theta_1\\}}$ (seuil $c=e^{n(\\theta_1-\\theta_0)}$).', justification: 'Indépendance : $\\{X_{1:n}>\\theta_1\\}=\\bigcap_i\\{X_i>\\theta_1\\}$ ; condition de taille $\\alpha$.' },
          { text: 'Cas $\\phi_1$ : puissance $\\mathbb{P}_{\\theta_1}(X_{1:n}>\\theta_1)=1$. Le test pur $\\mathbb{1}_{\\{X_{1:n}>\\theta_1\\}}$, de taille $e^{-n(\\theta_1-\\theta_0)}<\\alpha$ et de puissance 1, est **aussi** U.P.P.($\\alpha$).', justification: 'Sous $\\mathbb{P}_{\\theta_1}$, $X_{1:n}>\\theta_1$ p.s. ; aucun test ne fait mieux que 1.' },
        ],
        conclusion: 'Exception à la règle « U.P.P. $\\Rightarrow$ taille exactement $\\alpha$ » : quand la puissance vaut 1, la contrainte de taille devient inutile (Exercice 2 Q3 / PC5 Ex. 5). Règle déconcertante du test (9) : il peut rejeter sur des données **impossibles sous $H_1$**. Numérique ($\\alpha=0{,}05$) : $n=5$, $\\theta_1-\\theta_0=1$ : forme $\\phi_1$, $\\gamma\\approx0{,}0436$ ; $\\theta_1-\\theta_0=0{,}5$ : forme $\\phi_2$, $\\gamma\\approx0{,}609$. (Coquille du corrigé PC5 : le seuil est $c=e^{n(\\theta_1-\\theta_0)}$, pas $e^{-n(\\theta_1-\\theta_0)}$.)',
      },
      {
        kind: 'example',
        id: 'ch5-ex-exo7',
        title: 'Exemple 4.5 et Exercice 7 — Modèle uniforme : deux tests U.P.P. distincts',
        source: 'Poly ch.5, Compléments, Ex. 4.5, p. 54–55 ; Exercice 7 (corrigé p. 46)',
        scope: 'hors-programme',
        setup: '$n$-échantillon $\\mathcal{U}([0,\\theta])$, $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$ ; $X_{n:n}:=\\max_iX_i$.',
        steps: [
          { text: 'Pour $\\theta_1>\\theta_0$ : $r=(\\theta_0/\\theta_1)^n$ si $x_{n:n}\\le\\theta_0$, $+\\infty$ si $\\theta_0<x_{n:n}\\le\\theta_1$ : croissant en $x_{n:n}$ mais **pas strictement**.', justification: '$p_\\theta(z)=\\theta^{-n}\\mathbb{1}_{[0,\\theta]}(x_{n:n})$ : la Déf. 1.4 n’est pas satisfaite.' },
          { text: 'Sous $\\mathbb{P}_{\\theta_0}$, $r(Z)=(\\theta_0/\\theta_1)^n$ p.s. : Th. 4.1 avec $c=(\\theta_0/\\theta_1)^n$ et $\\gamma=\\alpha$, d’où $\\phi\'=1$ si $X_{n:n}>\\theta_0$, $\\alpha$ sinon : U.P.P.($\\alpha$), indépendant de $\\theta_1$.', justification: 'Condition de taille $\\alpha=0+\\gamma\\cdot1$ ; argument « ne dépend pas de $\\theta_1$ » ; $\\beta_{\\phi\'}(\\theta)=\\alpha$ pour $\\theta\\le\\theta_0$.' },
          { text: 'Le test pur $\\phi=\\mathbb{1}_{\\{X_{n:n}>\\theta_0(1-\\alpha)^{1/n}\\}}$ est de taille $\\alpha$ et $\\beta_\\phi(\\theta)=1-(1-\\alpha)(\\theta_0/\\theta)^n=\\beta_{\\phi\'}(\\theta)$ pour $\\theta>\\theta_0$.', justification: 'F.d.r. de $X_{n:n}$ sous $\\mathbb{P}_{\\theta_0}$ : $(x/\\theta_0)^n$ sur $[0,\\theta_0]$.' },
        ],
        conclusion: 'Deux U.P.P.($\\alpha$) de même fonction puissance **sans coïncider** : l’unicité tombe parce que $\\{r(Z)=c\\}=\\{X_{n:n}\\le\\theta_0\\}$ n’est **pas négligeable** — c’est l’absence d’atome (et la stricte monotonie) qui fait défaut. Le modèle uniforme échappe aux énoncés généraux, comme à Cramér-Rao, parce que le support dépend du paramètre.',
      },
      {
        kind: 'viz',
        id: 'ch5-s8-viz-uniforme',
        vizId: 'ch5-uniforme',
        caption: 'Modèle uniforme : le test pur $\\phi$ et le test randomisé $\\phi\'$ ont la même fonction puissance mais ne prennent pas les mêmes décisions sur les mêmes échantillons.',
      },
      {
        kind: 'text',
        id: 'ch5-s8-exo2-exo3',
        title: 'Exercices 2 et 3 du poly (PC5 Ex. 5 et Ex. 6)',
        scope: 'hors-programme',
        text: `**Exercice 2 — Monotonie en le niveau (PC5 Ex. 5).** Pour le test de Neyman-Pearson général $\\phi_\\alpha$ : (Q1) $\\alpha_1<\\alpha_2\\Rightarrow c_{\\alpha_1}\\ge c_{\\alpha_2}$ ($c_\\alpha=F^{-1}_{r,0}(1-\\alpha)$, fonction quantile croissante) ; (Q2) le risque de 2e espèce décroît avec le niveau : $\\phi_{\\alpha_1}$ est de niveau $\\alpha_2$, donc dominé par $\\phi_{\\alpha_2}$ ; (Q3) en cas d’égalité des puissances, $\\phi_{\\alpha_1}$ est U.P.P.($\\alpha_2$), l’intégration de $(\\phi_{\\alpha_1}-\\phi_{\\alpha_2})(p_1-c_{\\alpha_2}p_0)=0$ donne $0=c_{\\alpha_2}(\\alpha_1-\\alpha_2)$, donc $c_{\\alpha_2}=0$ et la puissance vaut 1 : il existe un test de taille $<\\alpha_2$ et de puissance 1. C’est la propriété qui fonde la $p$-valeur (régions emboîtées).

**Exercice 3 — Temps d’attente géométriques (PC5 Ex. 6).** On observe jusqu’au $n$-ième succès ; $Y_i$ (nombres d’échecs) i.i.d. géométriques, $T=\\sum_iY_i$ binomiale négative. Pour $\\theta_1<\\theta_2$, le rapport $(\\theta_2/\\theta_1)^n\\exp\\big((\\log(1-\\theta_2)-\\log(1-\\theta_1))T\\big)$ est **strictement décroissant** en $T$ : pour $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$, on rejette quand $T$ est **petit** : $\\phi_\\alpha=\\mathbb{1}_{\\{T<c\\}}+\\gamma\\mathbb{1}_{\\{T=c\\}}$, $\\mathbb{P}_{\\theta_0}(T<c)+\\gamma\\,\\mathbb{P}_{\\theta_0}(T=c)=\\alpha$. Numérique ($n=5$, $\\theta_0=0{,}5$, $\\alpha=0{,}05$) : $\\mathbb{P}(T=0)=0{,}03125$, $\\mathbb{P}(T=1)=0{,}078125$, donc $c_\\alpha=1$ et $\\gamma_\\alpha=0{,}24$. (Coquille du corrigé : la condition équivalente s’écrit $\\alpha=\\gamma\\,\\mathbb{P}(T\\le c)+(1-\\gamma)\\mathbb{P}(T<c)$.)`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 9. Compléments II
  // -------------------------------------------------------------------------
  {
    id: 'ch5-s9-complements',
    title: '9. Compléments (hors programme) II : familles exponentielles, U.M.P.U., rapport de vraisemblance généralisé',
    role: 'complements',
    scope: 'hors-programme',
    intro: 'Suite des compléments (p. 47–56), non exigibles : critère de monotonie des familles exponentielles, tests sans biais, rapport de vraisemblance généralisé (test de Fisher, ANOVA — utilisé dans les QCM DM/EN de l’Examen 2025), variance et précision gaussiennes, filtre adapté, au-delà de l’optimalité U.P.P.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch5-prop-fam-exp',
        type: 'proposition',
        label: 'Complément (p. 48)',
        title: 'Familles exponentielles à rapport de vraisemblance monotone',
        source: 'Poly ch.5, Compléments, p. 48',
        scope: 'hors-programme',
        hypotheses: ['$n$-échantillon d’une famille exponentielle $p_\\theta(x)=h(x)\\exp\\big(\\varphi(\\theta)T(x)-\\psi(\\theta)\\big)$, $T$ scalaire.'],
        statement: 'Le rapport $\\dfrac{p^{\\otimes n}_\\theta}{p^{\\otimes n}_{\\theta\'}}=\\exp\\Big((\\varphi(\\theta)-\\varphi(\\theta\'))\\sum_iT(x_i)-n\\psi(\\theta)+n\\psi(\\theta\')\\Big)$ : le modèle est à rapport monotone en $\\sum_iT(X_i)$ **si et seulement si** $\\varphi$ est monotone ; $\\varphi$ strictement croissante $\\Rightarrow$ croissant en $\\sum_iT(X_i)$ ; strictement décroissante $\\Rightarrow$ croissant en $-\\sum_iT(X_i)$.',
        intuition: 'Couvre gaussien, Bernoulli, Poisson, exponentiel ; la statistique n’est pas toujours la somme des observations : $\\sum_iX_i^2$ pour la variance d’une gaussienne centrée, $-\\sum_iX_i^2$ pour la précision.',
      },
      {
        kind: 'theorem',
        id: 'ch5-def-4-2',
        type: 'definition',
        label: 'Définition 4.2 et Proposition 4.1',
        title: 'Test sans biais ; un test U.P.P. est sans biais',
        source: 'Poly ch.5, Compléments, Déf. 4.2 et Prop. 4.1, p. 52',
        scope: 'hors-programme',
        hypotheses: ['$\\alpha\\in\\,]0,1[$ ; $\\phi$ test de niveau $\\alpha$.'],
        statement: 'Un test de niveau $\\alpha$ est **sans biais** si $\\beta_\\phi(\\theta)\\ge\\alpha$ pour tout $\\theta\\in\\Theta_1$ (il rejette plus souvent quand $H_0$ est fausse que quand elle est vraie). **Prop. 4.1** : un test U.P.P.($\\alpha$) est sans biais. Un test **U.M.P.U.($\\alpha$)** est uniformément plus puissant parmi les seuls tests sans biais de niveau $\\alpha$ ; un U.P.P. est U.M.P.U.',
        intuition: 'La notion survit là où U.P.P. échoue : dans le modèle gaussien, le test bilatéral usuel est U.M.P.U. (Exercice 5, §5).',
        proof: [
          { text: 'Le test constant $\\psi\\equiv\\alpha$ est de niveau $\\alpha$, de puissance $\\beta_\\psi\\equiv\\alpha$.', justification: '$\\mathbb{E}_\\theta[\\alpha]=\\alpha$.' },
          { text: '$\\phi$ U.P.P. domine $\\psi$ sur $\\Theta_1$ : $\\beta_\\phi(\\theta)\\ge\\alpha$.', justification: 'Déf. 1.2.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch5-def-4-3',
        type: 'definition',
        label: 'Définition 4.3',
        title: 'Rapport de vraisemblance généralisé',
        source: 'Poly ch.5, Compléments, Déf. 4.3, p. 52–53',
        scope: 'hors-programme',
        hypotheses: ['$n$-échantillon d’un modèle dominé, vraisemblance $\\mathrm{L}_n(\\theta;X_1,\\dots,X_n):=\\prod_iq_\\theta(X_i)$, partition $\\Theta=\\Theta_0\\cup\\Theta_1$.'],
        statement: `$$\\Lambda_n:=\\frac{\\sup_{\\theta\\in\\Theta_0}\\mathrm{L}_n(\\theta;X_1,\\dots,X_n)}{\\sup_{\\theta\\in\\Theta}\\mathrm{L}_n(\\theta;X_1,\\dots,X_n)}\\le1.$$

On rejette $H_0$ si $\\Lambda_n\\le c_{n,\\alpha}$, avec $\\mathbb{P}_\\theta(\\Lambda_n\\le c_{n,\\alpha})\\le\\alpha$ pour tout $\\theta\\in\\Theta_0$.`,
        intuition: 'Proche de 1 sous $H_0$, s’en éloigne sous $H_1$. **Ex. 4.3** (exponentiel de moyenne $\\theta$, $\\theta=\\theta_0$ contre $\\theta\\ne\\theta_0$) : $\\Lambda_n=g(\\bar X_n/\\theta_0)$ avec $g(t)=(et)^ne^{-nt}$, maximale en $t=1$ : on rejette si $n\\bar X_n/\\theta_0\\le Q_n(\\alpha/2)$ ou $\\ge Q_n(1-\\alpha/2)$, $Q_n$ fonction quantile de $\\mathrm{Gamma}(n,1)$. Comportement asymptotique : partie asymptotique du cours.',
        pitfalls: ['À ne pas confondre avec $r(z)$ (Déf. 1.3) : $\\Lambda_n$ rejette pour les **petites** valeurs.'],
      },
      {
        kind: 'example',
        id: 'ch5-ex-exo6',
        title: 'Exercice 6 du poly (PC5 Ex. 4) — Modèle linéaire gaussien, test de Fisher, ANOVA',
        source: 'Poly ch.5, Exercice 6 (corrigé p. 44–45) ; PC5 Ex. 4',
        scope: 'hors-programme',
        setup: '$\\mathbf{Y}\\sim\\mathcal{N}(X\\beta,\\sigma^2I_n)$, $X$ ($n\\times p$) de rang plein, $\\beta\\in\\mathbb{R}^p$, $\\sigma^2>0$ ; $H_0:\\beta_{r+1}=\\dots=\\beta_p=0$ ; $X_0$ les $r$ premières colonnes.',
        steps: [
          { text: 'EMV : $\\hat\\beta=(X^\\top X)^{-1}X^\\top\\mathbf{Y}$, $\\hat\\sigma^2=\\frac1n\\|\\mathbf{Y}-X\\hat\\beta\\|^2$, $\\sup_\\Theta\\mathrm{L}_n=(2\\pi)^{-n/2}\\hat\\sigma^{-n}e^{-n/2}$.', justification: 'Moindres carrés (équations normales), puis maximisation en $\\sigma^2$.' },
          { text: 'Sous $H_0$, $n\\hat\\sigma_0^2=\\|(I_n-\\Pi_0)\\mathbf{Y}\\|^2=n\\hat\\sigma^2+\\mathbf{Y}^\\top M\\mathbf{Y}$, $M:=\\Pi-\\Pi_0$.', justification: 'Projecteurs orthogonaux sur des espaces emboîtés, Pythagore.' },
          { text: '$\\Lambda=\\big(\\hat\\sigma^2/(\\hat\\sigma^2+\\frac1n\\mathbf{Y}^\\top M\\mathbf{Y})\\big)^{n/2}$, fonction décroissante de $F=\\frac{n-p}{p-r}\\cdot\\frac{\\mathbf{Y}^\\top M\\mathbf{Y}}{n\\hat\\sigma^2}$ : on rejette si $F>k_\\alpha$.', justification: 'Rejet pour $\\Lambda$ petit $\\iff$ $F$ grand.' },
          { text: 'Sous $H_0$, $n\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-p)$ et $\\mathbf{Y}^\\top M\\mathbf{Y}/\\sigma^2\\sim\\chi^2(p-r)$ indépendantes : $F\\sim$ Fisher$(p-r,n-p)$.', justification: 'Théorème de Cochran ; $(I_n-\\Pi)(\\Pi-\\Pi_0)=0$.' },
        ],
        conclusion: 'Avec $r$ groupes codés en régression ($H_0:\\mu_1=\\dots=\\mu_r$) : **ANOVA à un facteur**, Fisher$(r-1,n-r)$ ; par exemple 3 groupes de 10, quantile $0{,}95$ de Fisher$(2,27)\\approx3{,}354$. C’est le test de Fisher de l’Examen 2025 Ex. 4 Q12 (iii) ; la Q4 (égalité de deux variances, $F(n-1,p-1)$) relève aussi du rapport de vraisemblance généralisé.',
      },
      {
        kind: 'text',
        id: 'ch5-s9-variance-filtre',
        title: 'Variance et précision d’une gaussienne (Ex. 4.4) ; détection d’un signal (p. 53–55)',
        scope: 'hors-programme',
        text: `**Ex. 4.4.** $\\mathcal{N}(0,\\theta)$ : $T(z)=\\sum_ix_i^2$, $\\psi(t;\\theta)=\\theta^{-n/2}e^{-t/(2\\theta)}$, rapport strictement croissant en $T$. Hypothèses simples $\\theta_0<\\theta_1$ : $d_\\alpha=\\theta_0\\chi^2_{1-\\alpha}(n)$ ; $H_0:\\theta\\ge\\theta_0$ contre $H_1:\\theta<\\theta_0$ : on rejette si $T<\\theta_0\\chi^2_\\alpha(n)$. **Précision** $\\mathcal{N}(0,\\theta^{-2})$ : rapport croissant en $-\\sum_iX_i^2$ (augmenter la précision, c’est diminuer la variance).

**Filtre adapté.** $X_i$ gaussiennes indépendantes de variance $\\sigma^2$ connue, moyennes nulles sous $H_0$, égales à $m_i$ (connues) sous $H_1$ : $r$ est strictement croissant en $\\sum_im_iX_i$ et le test rejette si $\\sum_im_iX_i>z_{1-\\alpha}\\sigma\\sqrt{\\sum_im_i^2}$ — corrélation entre l’observation et le signal recherché.`,
      },
      {
        kind: 'text',
        id: 'ch5-s9-au-dela',
        title: 'Au-delà de l’optimalité U.P.P. ; une généalogie (p. 56)',
        scope: 'hors-programme',
        text: `U.P.P. est trop exigeant dès que l’alternative n’est pas unilatérale. Trois voies : (1) **restreindre la classe** (tests sans biais, U.M.P.U.) ; (2) approche **bayésienne** (agréger la fonction de risque — perte 0-1, risque $\\beta_\\phi$ sur $\\Theta_0$ et $1-\\beta_\\phi$ sur $\\Theta_1$ — par une loi a priori) ; (3) changer la question : **vitesse de séparation**, optimalité **minimax** (Lehmann et Romano). Prolongements dans le cours : **tests asymptotiques** (chapitre 6) et **tests multiples**.

*Point d’histoire* : Francis Galton, Karl Pearson, puis **Egon Pearson** et **Jerzy Neyman** qui formulent entre 1928 et 1933 l’approche des tests et le théorème du chapitre ; R. A. Fisher s’opposait à eux sur le sens d’un test.`,
      },
    ],
  },
]
