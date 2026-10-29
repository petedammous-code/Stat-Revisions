import type { CourseSection } from '../types'

/** Sections 5 à 10 : invariance, Kullback-Leibler et M-estimateurs, outils, exercices types (PC2), examen, compléments. */
export const coursePart2: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 5. Invariance par reparamétrisation
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s5-invariance',
    title: '5. Invariance de l’EMV par reparamétrisation',
    role: 'preuves',
    intro:
      'Reparamétrer un modèle, c’est renommer ses lois : le « meilleur » élément de la famille ne change pas. L’EMV du nouveau paramètre est donc l’image de l’EMV de l’ancien, **sans nouveau calcul**. Cette propriété n’a pas d’équivalent pour le biais.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch2-prop-1-2',
        type: 'proposition',
        label: 'Proposition 1.2',
        title: 'Invariance par reparamétrisation',
        source: 'Poly ch.2, Prop. 1.2, p. 23',
        hypotheses: [
          '$\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\}$ modèle paramétrique dominé.',
          '$G:\\Theta\\to\\Xi:=G(\\Theta)$ **bijection** de $\\Theta$ sur son image.',
          'Modèle reparamétré $\\{\\mathbb{Q}_\\xi,\\xi\\in\\Xi\\}$ avec $\\mathbb{Q}_\\xi:=\\mathbb{P}_{G^{-1}(\\xi)}$ (attention : ici $\\mathbb{Q}_\\xi$ est la loi reparamétrée, pas la loi d’une observation).',
        ],
        statement: 'Si $\\hat\\theta_n^{\\mathrm{MV}}$ est un EMV pour $\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\}$, alors $\\hat\\xi_n:=G(\\hat\\theta_n^{\\mathrm{MV}})$ est un EMV pour $\\{\\mathbb{Q}_\\xi,\\xi\\in\\Xi\\}$. De plus, l’ensemble des EMV du modèle reparamétré est **l’image par $G$** de celui du modèle initial.',
        intuition: 'On écrit parfois $\\widehat{G(\\theta)}=G(\\hat\\theta_n^{\\mathrm{MV}})$ : l’EMV « commute » avec les fonctions bijectives du paramètre.',
        proof: [
          { text: 'Notons $\\widetilde{\\mathrm{L}}_n$ la vraisemblance du modèle reparamétré. Pour $\\xi\\in\\Xi$, $\\mathbb{Q}_\\xi$ a pour densité celle de $\\mathbb{P}_{G^{-1}(\\xi)}$, donc $\\widetilde{\\mathrm{L}}_n(\\xi,X_1,\\dots,X_n)=\\mathrm{L}_n(G^{-1}(\\xi),X_1,\\dots,X_n)$.', justification: 'Définition de $\\mathbb{Q}_\\xi$ et de la vraisemblance (Déf. 1.4).' },
          { text: 'Pour tout $\\xi$, avec $\\vartheta=G^{-1}(\\xi)\\in\\Theta$ : $\\widetilde{\\mathrm{L}}_n(\\xi)=\\mathrm{L}_n(\\vartheta)\\le\\mathrm{L}_n(\\hat\\theta_n^{\\mathrm{MV}})=\\widetilde{\\mathrm{L}}_n\\big(G(\\hat\\theta_n^{\\mathrm{MV}})\\big)$.', justification: 'Inégalité : définition de l’EMV ; dernière égalité : étape 1 avec $\\xi=G(\\hat\\theta_n^{\\mathrm{MV}})$. Donc $G(\\hat\\theta_n^{\\mathrm{MV}})$ maximise $\\widetilde{\\mathrm{L}}_n$.' },
          { text: 'La même chaîne lue dans l’autre sens à l’aide de $G^{-1}$ montre que tout maximum de $\\widetilde{\\mathrm{L}}_n$ est l’image par $G$ d’un maximum de $\\mathrm{L}_n$.', justification: 'Symétrie des rôles de $G$ et $G^{-1}$ (bijection).' },
        ],
        pitfalls: ['Cette invariance n’a **pas** d’équivalent pour le biais : $\\hat\\sigma_n$ et $\\hat\\sigma_n^2$ ne peuvent pas être tous deux sans biais (Jensen).', '$G$ doit être une **bijection** dans l’énoncé du poly.'],
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-14',
        title: 'Exemple 1.14 — Reparamétrisations des modèles gaussien et exponentiel',
        source: 'Poly ch.2, Ex. 1.14, p. 23',
        setup: '(1) Modèle gaussien, $n\\ge2$, paramétré par $(\\mu,\\sigma)$ au lieu de $(\\mu,\\sigma^2)$. (2) Modèle exponentiel paramétré par l’espérance $\\tau=1/\\theta$.',
        steps: [
          { text: '(1) Paramétré par $\\theta=(\\mu,\\sigma^2)$, l’EMV est $(\\bar X_n,\\frac1n\\sum_i(X_i-\\bar X_n)^2)$ (Ex. 1.10). Avec la bijection $G:(\\mu,\\sigma^2)\\mapsto(\\mu,\\sqrt{\\sigma^2})$ de $\\Theta$ sur $\\Xi=\\mathbb{R}\\times\\mathbb{R}_+^\\ast$ : $\\hat\\mu_n=\\bar X_n$, $\\hat\\sigma_n=\\big(\\frac1n\\sum_i(X_i-\\bar X_n)^2\\big)^{1/2}$.', justification: 'Prop. 1.2 : image de l’EMV par $G$, sans nouveau calcul.' },
          { text: '(2) EMV de l’intensité : $1/\\bar X_n$ (Ex. 1.7). Avec $G:\\theta\\mapsto1/\\theta$ (bijection de $\\mathbb{R}_+^\\ast$ sur lui-même), l’EMV de $\\tau=1/\\theta$ est $\\hat\\tau_n=\\bar X_n$.', justification: 'Prop. 1.2.' },
        ],
        conclusion: 'À l’examen : « par invariance de l’EMV par reparamétrisation (Prop. 1.2 ch.2), l’EMV de $g(\\theta)$ est $g(\\hat\\theta_n^{\\mathrm{MV}})$ » — à citer tel quel (Examen 2025 Ex. 2 Q2 : passage de $\\sigma^2$ à $\\sigma$ ; PC2 Ex. 3 Q3 : paramétrisation canonique).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 6. Kullback-Leibler et M-estimateurs
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s6-kullback',
    title: '6. Comprendre le maximum de vraisemblance : divergence de Kullback-Leibler et M-estimateurs',
    role: 'preuves',
    intro:
      'Pourquoi maximiser la vraisemblance conduit-il vers la vraie valeur ? Deux faits : (1) $\\ell_n$ est une **moyenne empirique**, donc converge vers une fonction limite ; (2) cette limite atteint son maximum **au vrai paramètre**, et seulement là si le modèle est identifiable : c’est la positivité de la divergence de Kullback-Leibler. On distingue désormais $\\theta^\\star$ (vraie valeur, on travaille sous $\\mathbb{P}_{\\theta^\\star}$) et $\\vartheta$ (paramètre libre).',
    blocks: [
      {
        kind: 'text',
        id: 'ch2-s6-motivation',
        title: 'La log-vraisemblance normalisée converge (§1.4, p. 23–24)',
        text: `Pour $\\vartheta$ fixé, $\\ell_n(\\vartheta)=\\frac1n\\sum_{i=1}^n\\log q_\\vartheta(X_i)$ est la moyenne de v.a. i.i.d. sous $\\mathbb{P}_{\\theta^\\star}$ ; la LGN (si elles sont intégrables) donne la limite $\\mathbb{E}_{\\theta^\\star}[\\log q_\\vartheta(X_1)]$. En écrivant

$$\\log q_\\vartheta=\\log\\frac{q_\\vartheta}{q_{\\theta^\\star}}+\\log q_{\\theta^\\star},$$

apparaît l’espérance sous $\\mathbb{P}_{\\theta^\\star}$ du log d’un rapport de densités : au signe près, la **divergence de Kullback-Leibler** entre $\\mathbb{Q}_{\\theta^\\star}$ et $\\mathbb{Q}_\\vartheta$. $\\vartheta$ = « candidat », $\\theta^\\star$ = « vérité ».`,
      },
      {
        kind: 'theorem',
        id: 'ch2-def-1-7',
        type: 'definition',
        label: 'Définition 1.7',
        title: 'Divergence de Kullback-Leibler',
        source: 'Poly ch.2, Déf. 1.7, p. 24',
        hypotheses: ['$\\mathbb{P}_0$, $\\mathbb{P}_1$ deux probabilités sur $(\\mathsf{X},\\mathcal{X})$, de densités $f_0$, $f_1$ par rapport à une mesure $\\sigma$-finie $\\mu$.'],
        statement: `$$\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1):=\\int_{\\{x\\in\\mathsf{X}:\\ f_0(x)>0\\}}f_0(x)\\log\\frac{f_0(x)}{f_1(x)}\\,\\mu(\\mathrm{d}x),$$

avec la convention $\\log(1/0)=+\\infty$. Si $X\\sim\\mathbb{P}_0$, alors $f_0(X)>0$ p.s. et $\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1)=\\mathbb{E}\\big[\\log\\frac{f_0(X)}{f_1(X)}\\big]$.`,
        intuition: 'Mesure à quel point $\\mathbb{P}_1$ explique mal des données tirées sous $\\mathbb{P}_0$. L’intégrale est **toujours bien définie**, à valeurs dans $]-\\infty,+\\infty]$ (la partie négative de l’intégrande est $\\mu$-intégrable, compléments) et $\\mathrm{KL}$ **ne dépend pas de $\\mu$** (Thm 4.1 (iii), compléments).',
        pitfalls: ['**Ce n’est pas une distance** : pas symétrique en $(\\mathbb{P}_0,\\mathbb{P}_1)$, pas d’inégalité triangulaire. Elle a cependant la propriété essentielle du Thm 1.1.', 'Intégrer sur tout $\\mathsf{X}$ au lieu de $\\{f_0>0\\}$ ; oublier la convention $\\log(1/0)=+\\infty$ (supports non emboîtés : $\\mathrm{KL}=+\\infty$).'],
      },
      {
        kind: 'theorem',
        id: 'ch2-thm-1-1',
        type: 'theoreme',
        label: 'Théorème 1.1',
        title: 'Positivité de la divergence de Kullback-Leibler',
        source: 'Poly ch.2, Thm 1.1, p. 24–25',
        hypotheses: ['$\\mathbb{P}_0$, $\\mathbb{P}_1$ probabilités sur $(\\mathsf{X},\\mathcal{X})$, de densités $f_0$, $f_1$ par rapport à une mesure $\\sigma$-finie $\\mu$.'],
        statement: '$\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1)\\in[0,+\\infty]$, et $\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1)=0$ si et seulement si $\\mathbb{P}_0=\\mathbb{P}_1$, c’est-à-dire si et seulement si $f_0=f_1$ $\\mu$-presque partout.',
        intuition: 'Jensen appliqué à $-\\log$ (strictement convexe) ; la « distance » est nulle seulement entre lois identiques. (Attention à l’homonymie : dans le fascicule d’exercices, « Théorème 1.1 » désigne le théorème de Cochran **du ch.1**.)',
        proof: [
          { text: '*Mise en place.* $A:=\\{f_0>0\\}$, $\\mathbb{P}_0(A)=\\int_Af_0\\,\\mathrm{d}\\mu=1$. Soit $X\\sim\\mathbb{P}_0$ : p.s. $X\\in A$ ; posons $Y:=f_1(X)/f_0(X)\\in[0,+\\infty[$. Alors $\\mathbb{E}[Y]=\\int_Af_1\\,\\mathrm{d}\\mu=\\mathbb{P}_1(A)\\le1$ : $Y$ est intégrable, et $\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1)=\\mathbb{E}[-\\log Y]$ (avec $-\\log0=+\\infty$).', justification: 'Théorème de transfert ; définition de $\\mathrm{KL}$ comme intégrale sur $A$.' },
          { text: '*Premier cas : $\\mathbb{P}(Y=0)>0$.* L’intégrande vaut $+\\infty$ sur $\\{f_0>0,f_1=0\\}$, de $\\mathbb{P}_0$-probabilité $\\mathbb{P}(Y=0)>0$, donc de $\\mu$-mesure $>0$ : $\\mathrm{KL}=+\\infty$ et l’inégalité est vraie.', justification: 'La partie négative étant $\\mu$-intégrable (compléments), l’intégrale vaut $+\\infty$.' },
          { text: '*Second cas : $\\mathbb{P}(Y=0)=0$.* $Y$ est p.s. dans $]0,+\\infty[$ où $-\\log$ est strictement convexe, et $Y$ intégrable : $\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1)=\\mathbb{E}[-\\log Y]\\ge-\\log\\mathbb{E}[Y]=-\\log\\mathbb{P}_1(A)\\ge0$.', justification: 'Inégalité de Jensen (Thm 2.2) pour $\\phi=-\\log$ ; dernière inégalité car $\\mathbb{P}_1(A)\\le1$.' },
          { text: '*Cas d’égalité, sens direct.* Si $\\mathbb{P}_0=\\mathbb{P}_1$, alors $f_0=f_1$ $\\mu$-p.p. et $\\mathrm{KL}=\\int_Af_0\\log1\\,\\mathrm{d}\\mu=0$.', justification: 'Unicité de la densité à un négligeable près.' },
          { text: '*Réciproque.* Si $\\mathrm{KL}=0$, on est dans le second cas et les deux inégalités sont des égalités : (a) $\\mathbb{P}_1(A)=1$ donc $\\mathbb{E}[Y]=1$ ; (b) égalité dans Jensen avec $-\\log$ strictement convexe $\\Rightarrow$ $Y$ p.s. constante égale à $\\mathbb{E}[Y]=1$. Donc $f_1=f_0$ $\\mu$-p.p. sur $A$ ; puis $\\int_{A^c}f_1\\,\\mathrm{d}\\mu=1-\\int_Af_1\\,\\mathrm{d}\\mu=1-\\int_Af_0\\,\\mathrm{d}\\mu=0$, donc $f_1=0=f_0$ $\\mu$-p.p. sur $A^c$. Finalement $f_0=f_1$ $\\mu$-p.p. et $\\mathbb{P}_0=\\mathbb{P}_1$.', justification: 'Cas d’égalité de Jensen (Thm 2.2 : stricte convexité $\\Rightarrow$ $Y$ p.s. constante) ; une fonction positive d’intégrale nulle est nulle p.p.' },
        ],
        pitfalls: ['Oublier le cas $\\mathbb{P}(Y=0)>0$ (Jensen ne s’applique pas directement à $-\\log Y$ avec $Y$ pouvant être nul).', 'Oublier que $\\mathbb{P}_1(A)$ peut être $<1$ : c’est pourquoi on a $-\\log\\mathbb{P}_1(A)\\ge0$ et non $=0$.'],
      },
      {
        kind: 'theorem',
        id: 'ch2-prop-1-3',
        type: 'proposition',
        label: 'Proposition 1.3',
        title: 'Limite de la log-vraisemblance normalisée',
        source: 'Poly ch.2, Prop. 1.3, p. 25',
        hypotheses: [
          '$(X_1,\\dots,X_n)$ $n$-échantillon du modèle dominé $(\\mathsf{X},\\mathcal{X},\\{q_\\theta\\cdot\\mu,\\theta\\in\\Theta\\})$, $\\theta^\\star\\in\\Theta$.',
          '**Intégrabilité** : pour tout $\\vartheta\\in\\Theta$, $\\mathbb{E}_{\\theta^\\star}[|\\log q_\\vartheta(X_1)|]<\\infty$ ; on pose $M_{\\theta^\\star}(\\vartheta):=\\mathbb{E}_{\\theta^\\star}[\\log q_\\vartheta(X_1)]$.',
          'Pour (iii) : le modèle est **identifiable** (Définition 2 du ch.1).',
        ],
        statement: `(i) Pour tout $\\vartheta\\in\\Theta$, $\\ell_n(\\vartheta,X_1,\\dots,X_n)\\xrightarrow{\\mathbb{P}_{\\theta^\\star}\\text{-prob}}M_{\\theta^\\star}(\\vartheta)$.

(ii) Pour tout $\\vartheta\\in\\Theta$, $\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)$ est **finie** et

$$M_{\\theta^\\star}(\\vartheta)=M_{\\theta^\\star}(\\theta^\\star)-\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)\\le M_{\\theta^\\star}(\\theta^\\star).$$

(iii) Si le modèle est identifiable, $M_{\\theta^\\star}(\\vartheta)<M_{\\theta^\\star}(\\theta^\\star)$ pour tout $\\vartheta\\ne\\theta^\\star$ : $M_{\\theta^\\star}$ admet un **maximum unique, atteint en $\\theta^\\star$**.`,
        intuition: '$\\hat\\theta_n^{\\mathrm{MV}}$ maximise $\\ell_n$, qui converge vers $M_{\\theta^\\star}$, maximale en $\\theta^\\star$ et seulement là : on s’attend à $\\hat\\theta_n^{\\mathrm{MV}}\\to\\theta^\\star$ (**consistance de l’EMV**). Ce raisonnement est **heuristique** : la proposition donne la convergence **pour chaque $\\vartheta$ fixé**, alors que la convergence du point de maximum demande une approximation **uniforme en $\\vartheta$** (loi uniforme des grands nombres, chapitres 6–7).',
        proof: [
          { text: '(i) Sous $\\mathbb{P}_{\\theta^\\star}$, les $\\log q_\\vartheta(X_i)$ sont indépendantes, de même loi et intégrables ; leur moyenne $\\ell_n(\\vartheta)$ converge en probabilité vers $M_{\\theta^\\star}(\\vartheta)$.', justification: 'Loi faible des grands nombres (Thm 2.1, Outils).' },
          { text: '(ii) $q_{\\theta^\\star}(X_1)>0$ p.s. sous $\\mathbb{P}_{\\theta^\\star}$ car $\\mathbb{P}_{\\theta^\\star}(q_{\\theta^\\star}(X_1)=0)=\\int_{\\{q_{\\theta^\\star}=0\\}}q_{\\theta^\\star}\\,\\mathrm{d}\\mu=0$ ; de même $q_\\vartheta(X_1)>0$ p.s., sans quoi $|\\log q_\\vartheta(X_1)|=+\\infty$ avec probabilité $>0$.', justification: 'Hypothèse d’intégrabilité.' },
          { text: 'Donc $\\log\\big(q_{\\theta^\\star}(X_1)/q_\\vartheta(X_1)\\big)=\\log q_{\\theta^\\star}(X_1)-\\log q_\\vartheta(X_1)$ est p.s. finie et intégrable, d’espérance $M_{\\theta^\\star}(\\theta^\\star)-M_{\\theta^\\star}(\\vartheta)$.', justification: 'Linéarité de l’espérance.' },
          { text: 'Cette espérance vaut $\\int_{\\{q_{\\theta^\\star}>0\\}}q_{\\theta^\\star}\\log(q_{\\theta^\\star}/q_\\vartheta)\\,\\mathrm{d}\\mu=\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)$ : finie, et $\\ge0$.', justification: 'Théorème de transfert, puis Théorème 1.1.' },
          { text: '(iii) Identifiable et $\\vartheta\\ne\\theta^\\star$ $\\Rightarrow$ $\\mathbb{Q}_\\vartheta\\ne\\mathbb{Q}_{\\theta^\\star}$ $\\Rightarrow$ $\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)>0$ $\\Rightarrow$ par (ii), $M_{\\theta^\\star}(\\vartheta)<M_{\\theta^\\star}(\\theta^\\star)$.', justification: 'Définition de l’identifiabilité (injectivité de $\\theta\\mapsto\\mathbb{Q}_\\theta$), puis cas d’égalité du Thm 1.1.' },
        ],
        pitfalls: [
          '**Entropie (Remarque p. 25).** $M_{\\theta^\\star}(\\theta^\\star)=\\int q_{\\theta^\\star}\\log q_{\\theta^\\star}\\,\\mathrm{d}\\mu=:\\mathrm{Ent}(\\mathbb{Q}_{\\theta^\\star})$ est l’**opposé** de l’entropie de Shannon et **dépend de la mesure dominante** (contrairement à $\\mathrm{KL}$). Décomposition : $M_{\\theta^\\star}=-\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\cdot)+\\mathrm{Ent}(\\mathbb{Q}_{\\theta^\\star})$.',
          'Conclure la consistance de l’EMV à partir de la seule convergence ponctuelle ; oublier l’hypothèse d’intégrabilité (elle échoue pour $\\mathcal{U}([0,\\theta])$ avec $\\vartheta<\\theta^\\star$ : $\\mathrm{KL}=+\\infty$, compléments) ; oublier l’identifiabilité pour l’unicité.',
        ],
      },
      {
        kind: 'viz',
        id: 'ch2-s6-viz-kl',
        vizId: 'ch2-kullback-leibler',
        caption: 'Modèle de Bernoulli (Ex. 4.4) : $\\ell_n$ et sa limite $M_{\\theta^\\star}$ ; l’écart vertical en $\\vartheta$ est $\\mathrm{KL}(\\mathcal{B}\\mathrm{er}(\\theta^\\star),\\mathcal{B}\\mathrm{er}(\\vartheta))$. À droite, l’asymétrie de la divergence.',
      },
      {
        kind: 'theorem',
        id: 'ch2-def-1-8',
        type: 'definition',
        label: 'Définition 1.8',
        title: 'M-estimateur',
        source: 'Poly ch.2, Déf. 1.8, p. 26',
        hypotheses: [
          '$(X_1,\\dots,X_n)$ $n$-échantillon de $(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta,\\theta\\in\\Theta\\})$.',
          '$m:\\Theta\\times\\mathsf{X}\\to\\mathbb{R}$ mesurable en $x$, avec $\\mathbb{E}_{\\theta^\\star}[|m(\\vartheta,X_1)|]<\\infty$ pour tous $\\vartheta,\\theta^\\star\\in\\Theta$ ; $M_{\\theta^\\star}(\\vartheta):=\\mathbb{E}_{\\theta^\\star}[m(\\vartheta,X_1)]$.',
          '**Hypothèse à vérifier** : pour tout $\\theta^\\star$, $M_{\\theta^\\star}$ atteint son maximum au point $\\theta^\\star$.',
        ],
        statement: `$M_{\\theta^\\star}$ n’est pas connue mais s’estime par $M_n(\\vartheta):=\\frac1n\\sum_{i=1}^nm(\\vartheta,X_i)$, qui vérifie $M_n(\\vartheta)\\xrightarrow{\\mathbb{P}_{\\theta^\\star}\\text{-prob}}M_{\\theta^\\star}(\\vartheta)$ pour tous $\\vartheta,\\theta^\\star$ (LGN). On appelle **M-estimateur associé à $m$** toute solution de

$$\\hat\\theta_n\\in\\argmax_{\\vartheta\\in\\Theta}M_n(\\vartheta).$$`,
        intuition: 'Rien dans le mécanisme « maximiser une moyenne empirique dont la limite est maximale en $\\theta^\\star$ » n’est propre au log de la densité. Sous l’hypothèse d’intégrabilité de la Prop. 1.3, **l’EMV est le M-estimateur associé à $m(\\vartheta,x)=\\log q_\\vartheta(x)$**, avec $M_{\\theta^\\star}=M_{\\theta^\\star}(\\theta^\\star)-\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\cdot)$, maximale en $\\theta^\\star$ par positivité de la divergence.',
        pitfalls: [
          'Problème de minimisation : changer $m$ en $-m$ ; souvent pas de solution explicite (procédure numérique).',
          '**Lien avec les Z-estimateurs (p. 26–27).** Si $\\Theta$ est ouvert et $\\vartheta\\mapsto m(\\vartheta,x)$ différentiable, un M-estimateur vérifie $\\frac1n\\sum_i\\nabla_\\vartheta m(\\hat\\theta_n,X_i)=0$ : c’est un **Z-estimateur** associé à $\\boldsymbol\\psi=\\nabla_\\vartheta m$, sous réserve que $\\mathbb{E}_{\\theta^\\star}[\\nabla_\\vartheta m(\\theta^\\star,X_1)]=0$ (vrai lorsqu’on peut dériver sous l’espérance, car $M_{\\theta^\\star}$ est maximale en $\\theta^\\star$). Il existe des Z-estimateurs qui ne dérivent d’aucune optimisation, et des M-estimateurs à $m$ non différentiable (médiane) qui ne sont pas des Z-estimateurs au sens ci-dessus.',
        ],
      },
      {
        kind: 'example',
        id: 'ch2-ex-1-15',
        title: 'Exemple 1.15 — Moindres carrés et médiane pour le paramètre de translation',
        source: 'Poly ch.2, Ex. 1.15, p. 27',
        setup: 'Modèle de translation de l’Ex. 1.6 : $f$ densité paire, $q_\\theta(x)=f(x-\\theta)$, $\\Theta=\\mathbb{R}$. Sous $\\mathbb{P}_{\\theta^\\star}$, $X_1-\\theta^\\star$ a pour densité $f$ (loi symétrique).',
        steps: [
          { text: '*Moindres carrés.* Si $\\sigma^2:=\\int x^2f(x)\\,\\mathrm{d}x<\\infty$ et $m(\\vartheta,x):=-(x-\\vartheta)^2$ : $M_{\\theta^\\star}(\\vartheta)=-\\mathbb{E}_{\\theta^\\star}[(X_1-\\vartheta)^2]=-(\\theta^\\star-\\vartheta)^2-\\sigma^2$, maximum unique en $\\theta^\\star$.', justification: 'Décomposition biais-variance : $\\mathbb{E}[(X_1-\\vartheta)^2]=\\mathrm{Var}(X_1)+(\\mathbb{E}X_1-\\vartheta)^2$ avec $\\mathbb{E}_{\\theta^\\star}[X_1]=\\theta^\\star$, $\\mathrm{Var}_{\\theta^\\star}(X_1)=\\sigma^2$.' },
          { text: 'Le M-estimateur maximise $M_n(\\vartheta)=-\\frac1n\\sum_i(X_i-\\vartheta)^2$, quadratique strictement concave, d’unique maximum $\\hat\\theta_n=\\bar X_n$ : **estimateur des moindres carrés**. Comme $\\partial_\\vartheta m=2(x-\\vartheta)$, $\\bar X_n$ est aussi le Z-estimateur associé à $\\psi(\\vartheta,x)=x-\\vartheta$.', justification: 'Minimisation de $\\frac1n\\sum_i(X_i-\\vartheta)^2$ ; dérivation de $m$.' },
          { text: '*Médiane.* Si $\\int|x|f(x)\\,\\mathrm{d}x<\\infty$ et $m(\\vartheta,x):=-|x-\\vartheta|$ : la fonction $g:\\vartheta\\mapsto\\mathbb{E}_{\\theta^\\star}|X_1-\\vartheta|$ vérifie $g(\\vartheta)=g(2\\theta^\\star-\\vartheta)$ et, pour $\\theta^\\star\\le\\vartheta$, $g(\\vartheta)-g(\\theta^\\star)=\\mathbb{E}_{\\theta^\\star}\\Big[\\int_{\\theta^\\star}^{\\vartheta}\\big(\\mathbb{1}_{\\{X_1<t\\}}-\\mathbb{1}_{\\{X_1>t\\}}\\big)\\,\\mathrm{d}t\\Big]=\\int_{\\theta^\\star}^{\\vartheta}\\big(2F_{\\theta^\\star}(t)-1\\big)\\,\\mathrm{d}t\\ge0$.', justification: 'Identité $|x-\\vartheta|-|x-\\theta^\\star|=\\int_{\\theta^\\star}^{\\vartheta}(\\mathbb{1}_{\\{x<t\\}}-\\mathbb{1}_{\\{x>t\\}})\\,\\mathrm{d}t$ ; **Fubini** (intégrande bornée sur un intervalle borné) ; $\\mathbb{P}(X_1<t)-\\mathbb{P}(X_1>t)=2F_{\\theta^\\star}(t)-1$ par continuité de $F$ ; $F_{\\theta^\\star}(t)\\ge F_{\\theta^\\star}(\\theta^\\star)=\\frac12$ pour $t\\ge\\theta^\\star$ (symétrie, croissance) ; le cas $\\vartheta<\\theta^\\star$ s’en déduit par la symétrie de $g$.' },
          { text: 'Donc $M_{\\theta^\\star}=-g$ atteint son maximum en $\\theta^\\star$. Le M-estimateur maximise $M_n(\\vartheta)=-\\frac1n\\sum_i|X_i-\\vartheta|$, dont les maxima ont été déterminés à l’Ex. 1.13 : **la médiane empirique est un M-estimateur**, unique si $n$ impair.', justification: 'Ex. 1.13 (fonction convexe affine par morceaux).' },
        ],
        conclusion: '**La moyenne empirique est à la fois estimateur des moments, Z-estimateur et M-estimateur.** La médiane est un M-estimateur (perte absolue) et un Z-estimateur ($\\psi=\\mathrm{signe}(x-\\vartheta)$, Ex. 1.6) mais **pas** un estimateur des moments ; $\\vartheta\\mapsto|x-\\vartheta|$ n’étant pas dérivable en $x$, ce M-estimateur ne s’obtient pas en annulant un gradient. Moyenne $\\leftrightarrow$ perte quadratique (moment d’ordre 2 requis) ; médiane $\\leftrightarrow$ perte absolue (moment d’ordre 1 suffit).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 7. Outils mathématiques
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s7-outils',
    title: '7. Outils mathématiques : inégalités, LGN, convexité et Jensen, intervalle de confiance',
    role: 'preuves',
    intro:
      'Section « Les outils mathématiques » du poly (p. 29–32) : les deux inégalités de concentration, la loi faible des grands nombres, le lemme de passage à la limite par une fonction continue (qui fait passer de $e(\\hat\\theta_n)$ à $\\hat\\theta_n$), les fonctions convexes et l’inégalité de Jensen (ingrédient de $\\mathrm{KL}\\ge0$), le lemme qui justifie « point critique $\\Rightarrow$ maximum global », et la définition minimale d’un intervalle de confiance.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch2-prop-2-1',
        type: 'proposition',
        label: 'Proposition 2.1 (Outils)',
        title: 'Inégalités de Markov et de Bienaymé-Tchebychev',
        source: 'Poly ch.2, Outils, Prop. 2.1, p. 29',
        hypotheses: ['(i) $Y$ v.a. réelle **positive**.', '(ii) $Z$ v.a. réelle avec $\\mathbb{E}[Z^2]<\\infty$, $\\mu=\\mathbb{E}[Z]$.'],
        statement: `(i) (Markov) Pour tout $\\delta>0$, $\\mathbb{P}(Y\\ge\\delta)\\le\\mathbb{E}[Y]/\\delta$.

(ii) (Bienaymé-Tchebychev) Pour tout $\\delta>0$, $\\mathbb{P}(|Z-\\mu|\\ge\\delta)\\le\\dfrac{\\mathrm{Var}(Z)}{\\delta^2}$.`,
        intuition: 'Contrôler les queues par les moments. Appliquée à $\\bar Y_n$ (i.i.d., variance $\\sigma^2$, donc $\\mathrm{Var}(\\bar Y_n)=\\sigma^2/n$) : $\\mathbb{P}(|\\bar Y_n-\\mathbb{E}[Y_1]|\\ge\\delta)\\le\\sigma^2/(n\\delta^2)$, forme utilisée dans la Prop. 1.1. La borne n’est pas précise (elle peut dépasser 1) mais est explicite et ne demande qu’un moment d’ordre 2.',
        proof: [
          { text: '(i) $\\delta\\,\\mathbb{1}_{\\{Y\\ge\\delta\\}}\\le Y$ en tout point (car $Y\\ge0$) ; en prenant l’espérance, $\\delta\\,\\mathbb{P}(Y\\ge\\delta)\\le\\mathbb{E}[Y]$.', justification: 'Croissance de l’espérance.' },
          { text: '(ii) Appliquer (i) à la variable positive $(Z-\\mu)^2$ et au seuil $\\delta^2$ : $\\mathbb{P}(|Z-\\mu|\\ge\\delta)=\\mathbb{P}((Z-\\mu)^2\\ge\\delta^2)\\le\\mathbb{E}[(Z-\\mu)^2]/\\delta^2$.', justification: 'Égalité d’événements $\\{|Z-\\mu|\\ge\\delta\\}=\\{(Z-\\mu)^2\\ge\\delta^2\\}$.' },
        ],
        pitfalls: ['Markov exige $Y\\ge0$.'],
      },
      {
        kind: 'theorem',
        id: 'ch2-def-2-1',
        type: 'definition',
        label: 'Définition 2.1 (Outils)',
        title: 'Convergence en probabilité',
        source: 'Poly ch.2, Outils, Déf. 2.1, p. 29',
        hypotheses: ['$(Y_n)_{n\\in\\mathbb{N}}$ suite de vecteurs aléatoires de $\\mathbb{R}^k$, $y\\in\\mathbb{R}^k$ **constante**.'],
        statement: '$Y_n$ **converge en probabilité** vers $y$, noté $Y_n\\xrightarrow{\\mathbb{P}\\text{-prob}}y$, si pour tout $\\varepsilon>0$, $\\lim_{n\\to\\infty}\\mathbb{P}(\\|Y_n-y\\|\\ge\\varepsilon)=0$. Sous $\\mathbb{P}_\\theta$, on écrit $Y_n\\xrightarrow{\\mathbb{P}_\\theta\\text{-prob}}y$.',
        intuition: 'Mode de convergence de tous les résultats du chapitre ; comparé aux autres modes au [[chapitre 6|/ch/ch6/cours]].',
        pitfalls: ['La limite est ici une **constante** $y$.'],
      },
      {
        kind: 'theorem',
        id: 'ch2-thm-2-1',
        type: 'theoreme',
        label: 'Théorème 2.1 (Outils)',
        title: 'Loi faible des grands nombres',
        source: 'Poly ch.2, Outils, Thm 2.1, p. 30',
        hypotheses: ['$(Y_n)_{n\\in\\mathbb{N}^\\ast}$ v.a. réelles **indépendantes, de même loi, intégrables**.'],
        statement: '$$\\frac1n\\sum_{i=1}^nY_i\\xrightarrow{\\mathbb{P}\\text{-prob}}\\mathbb{E}[Y_1].$$',
        intuition: 'La moyenne empirique se concentre autour de l’espérance.',
        proof: [
          { text: 'Si $\\mathbb{E}[Y_1^2]<\\infty$ : la moyenne a pour espérance $\\mathbb{E}[Y_1]$ et pour variance $\\mathrm{Var}(Y_1)/n$ ; $\\mathbb{P}\\big(|\\frac1n\\sum_iY_i-\\mathbb{E}[Y_1]|\\ge\\varepsilon\\big)\\le\\mathrm{Var}(Y_1)/(n\\varepsilon^2)\\to0$.', justification: 'Linéarité, indépendance (variance de la somme), Bienaymé-Tchebychev (Prop. 2.1).' },
          { text: 'Cas seulement intégrable : argument de troncature ou théorème de continuité de Lévy — **admis ici**.', justification: 'Démontré dans l’annexe du polycopié (chapitre sur les convergences).' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch2-lem-2-1',
        type: 'lemme',
        label: 'Lemme 2.1 (Outils)',
        title: 'Convergence en probabilité et fonction continue',
        source: 'Poly ch.2, Outils, Lemme 2.1, p. 30',
        hypotheses: ['$D\\subseteq\\mathbb{R}^k$, $h:D\\to\\mathbb{R}^m$, $y\\in D$ point où $h$ est **continue**.', '$(Y_n)$ vecteurs aléatoires p.s. à valeurs dans $D$, $Y_n\\xrightarrow{\\mathbb{P}\\text{-prob}}y$.'],
        statement: '$h(Y_n)\\xrightarrow{\\mathbb{P}\\text{-prob}}h(y)$.',
        intuition: 'Sert à passer de la convergence de $e(\\hat\\theta_n)$ à celle de $\\hat\\theta_n=e^{-1}(\\cdot)$ (Remarque après la Prop. 1.1). Il suffit de la continuité **au point limite** $y$. (Attention à l’homonymie : « Lemme 2.1 du ch.1 » = vecteur gaussien à coordonnées indépendantes.)',
        proof: [
          { text: 'Soit $\\varepsilon>0$. Il existe $\\eta>0$ tel que $z\\in D$, $\\|z-y\\|<\\eta$ $\\Rightarrow$ $\\|h(z)-h(y)\\|<\\varepsilon$.', justification: 'Continuité de $h$ en $y$.' },
          { text: 'Donc, à un négligeable près, $\\{\\|h(Y_n)-h(y)\\|\\ge\\varepsilon\\}\\subseteq\\{\\|Y_n-y\\|\\ge\\eta\\}$.', justification: 'Contraposée de l’implication précédente.' },
          { text: '$\\mathbb{P}(\\|h(Y_n)-h(y)\\|\\ge\\varepsilon)\\le\\mathbb{P}(\\|Y_n-y\\|\\ge\\eta)\\to0$.', justification: 'Croissance de la probabilité, puis convergence en probabilité de $Y_n$.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch2-lem-2-2',
        type: 'lemme',
        label: 'Lemme 2.2 (Outils)',
        title: 'Droite d’appui d’une fonction convexe',
        source: 'Poly ch.2, Outils, Lemme 2.2, p. 30–31',
        hypotheses: ['$I$ intervalle **ouvert** de $\\mathbb{R}$, $\\phi:I\\to\\mathbb{R}$ convexe.'],
        statement: 'Pour tout $t\\in I$, il existe $c_t\\in\\mathbb{R}$ tel que $\\phi(t)+c_t(y-t)\\le\\phi(y)$ pour tout $y\\in I$. Si $\\phi$ est strictement convexe, l’inégalité est stricte pour $y\\ne t$. Si $\\phi$ est dérivable en $t$, on peut prendre $c_t=\\phi\'(t)$.',
        intuition: 'Une fonction convexe est au-dessus de ses tangentes (droites d’appui).',
        proof: [
          { text: 'Pour $s<t<u$ dans $I$, $t=\\lambda s+(1-\\lambda)u$ avec $\\lambda=\\frac{u-t}{u-s}\\in]0,1[$ ; la convexité $\\phi(t)\\le\\lambda\\phi(s)+(1-\\lambda)\\phi(u)$ se réarrange en $\\frac{\\phi(t)-\\phi(s)}{t-s}\\le\\frac{\\phi(u)-\\phi(t)}{u-t}$.', justification: 'Définition de la convexité ; inégalité des pentes.' },
          { text: 'Toute pente de corde à gauche de $t$ est $\\le$ toute pente à droite ; la pente à droite $u\\mapsto\\frac{\\phi(u)-\\phi(t)}{u-t}$ est croissante sur $I\\cap]t,+\\infty[$, la pente à gauche croissante sur $I\\cap]-\\infty,t[$.', justification: 'Même argument des trois pentes.' },
          { text: 'On pose $c_t:=\\inf\\{\\frac{\\phi(u)-\\phi(t)}{u-t}:u\\in I,u>t\\}$ : réel car l’ensemble est non vide ($I$ ouvert) et minoré par toute pente à gauche.', justification: 'Borne inférieure d’un ensemble non vide minoré.' },
          { text: 'Pour $u>t$ : $\\phi(u)\\ge\\phi(t)+c_t(u-t)$ (définition de l’inf). Pour $s<t$ : la pente à gauche minore toutes les pentes à droite, donc leur inf $c_t$, d’où $\\phi(s)\\ge\\phi(t)+c_t(s-t)$.', justification: 'Multiplication par $u-t>0$, resp. par $s-t<0$ (renverse le sens).' },
          { text: 'Si $\\phi$ est dérivable en $t$, l’inf de la fonction croissante $u\\mapsto\\frac{\\phi(u)-\\phi(t)}{u-t}$ est sa limite en $t^+$, soit $\\phi\'(t)$. Stricte convexité : inégalités strictes entre pentes, donc inégalité stricte pour $y\\ne t$.', justification: 'Limite d’une fonction monotone ; pentes strictement ordonnées.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch2-thm-2-2',
        type: 'theoreme',
        label: 'Théorème 2.2 (Outils)',
        title: 'Inégalité de Jensen',
        source: 'Poly ch.2, Outils, Thm 2.2, p. 31',
        hypotheses: ['$I$ intervalle ouvert de $\\mathbb{R}$, $\\phi:I\\to\\mathbb{R}$ **convexe**.', '$Y$ v.a. réelle avec $\\mathbb{P}(Y\\in I)=1$ et $\\mathbb{E}[|Y|]<\\infty$.'],
        statement: `$\\mathbb{E}[Y]\\in I$, $\\mathbb{E}[\\phi(Y)]$ est bien définie dans $]-\\infty,+\\infty]$, et

$$\\phi(\\mathbb{E}[Y])\\le\\mathbb{E}[\\phi(Y)].$$

Si $\\phi$ est strictement convexe, l’inégalité est **stricte** dès que $Y$ n’est pas p.s. constante, i.e. dès que $\\mathbb{P}(Y\\ne\\mathbb{E}[Y])>0$.`,
        intuition: '« L’image de la moyenne est sous la moyenne des images » pour $\\phi$ convexe ; ingrédient de $\\mathrm{KL}\\ge0$ (avec $\\phi=-\\log$). Sens inversé pour une fonction concave : $\\mathbb{E}[\\log Y]\\le\\log\\mathbb{E}[Y]$.',
        proof: [
          { text: '$t:=\\mathbb{E}[Y]\\in I$ : si $a>-\\infty$ est l’extrémité gauche de $I$, $Y-a>0$ p.s. donc $\\mathbb{E}[Y-a]>0$ ; idem à droite.', justification: 'Une v.a. positive d’espérance nulle est nulle p.s.' },
          { text: 'Il existe $c$ avec $\\phi(t)+c(Y-t)\\le\\phi(Y)$ p.s.', justification: 'Lemme 2.2 (droite d’appui en $t$).' },
          { text: 'Le membre de gauche est intégrable, donc la partie négative de $\\phi(Y)$ est intégrable et $\\mathbb{E}[\\phi(Y)]\\in]-\\infty,+\\infty]$ est bien définie.', justification: 'Domination de $\\phi(Y)^-$ par une v.a. intégrable.' },
          { text: '$\\phi(t)=\\mathbb{E}[\\phi(t)+c(Y-t)]\\le\\mathbb{E}[\\phi(Y)]$.', justification: 'Croissance de l’espérance.' },
          { text: 'Stricte convexité : l’inégalité du lemme est stricte sur $\\{Y\\ne t\\}$ ; la v.a. positive $\\phi(Y)-\\phi(t)-c(Y-t)$ est $>0$ sur cet événement de probabilité $>0$, donc d’espérance $\\mathbb{E}[\\phi(Y)]-\\phi(t)>0$.', justification: 'Espérance strictement positive d’une v.a. positive non p.s. nulle.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch2-lem-2-3',
        type: 'lemme',
        label: 'Lemme 2.3 (Outils)',
        title: 'Maximum d’une fonction strictement concave',
        source: 'Poly ch.2, Outils, Lemme 2.3, p. 31–32',
        hypotheses: ['$I$ intervalle ouvert de $\\mathbb{R}$, $\\psi:I\\to\\mathbb{R}$ **strictement concave** ($-\\psi$ strictement convexe).'],
        statement: '$\\psi$ admet **au plus un** point de maximum sur $I$. Si $\\psi$ est dérivable en $t$ avec $\\psi\'(t)=0$, alors $t$ est l’**unique point de maximum global**. Si $\\psi$ est deux fois dérivable avec $\\psi\'\'<0$ sur $I$, elle est strictement concave.',
        intuition: 'Justifie, dans tous les exemples, le passage « point critique $\\Rightarrow$ maximum global » (étape 2c de la Méthode 1.2) : c’est l’argument à **écrire** à l’examen (« $\\ell_n\'\'<0$ donc $\\ell_n$ strictement concave, l’unique point critique est le maximum global »).',
        proof: [
          { text: 'Si $t_1\\ne t_2$ étaient deux maxima, $\\psi\\big(\\frac{t_1+t_2}2\\big)>\\frac12\\psi(t_1)+\\frac12\\psi(t_2)=\\max\\psi$ : absurde.', justification: 'Stricte concavité.' },
          { text: 'Si $\\psi\'(t)=0$ : Lemme 2.2 appliqué à $-\\psi$ avec $c_t=-\\psi\'(t)=0$ donne $-\\psi(y)>-\\psi(t)$ pour $y\\ne t$, i.e. $\\psi(y)<\\psi(t)$.', justification: 'Droite d’appui horizontale (cas strict).' },
          { text: 'Si $\\psi\'\'<0$ : $\\psi\'$ strictement décroissante ; pour $s<u$, $\\lambda\\in]0,1[$, $t=\\lambda s+(1-\\lambda)u$ : $\\psi(t)-\\psi(s)>\\psi\'(t)(t-s)$ et $\\psi(u)-\\psi(t)<\\psi\'(t)(u-t)$ ; comme $\\lambda(t-s)=(1-\\lambda)(u-t)$, en combinant : $\\psi(t)>\\lambda\\psi(s)+(1-\\lambda)\\psi(u)$.', justification: 'Inégalité des accroissements finis, puis combinaison linéaire à coefficients $\\lambda$ et $1-\\lambda$.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch2-def-2-2',
        type: 'definition',
        label: 'Définition 2.2 (Outils)',
        title: 'Intervalle de confiance (définition minimale)',
        source: 'Poly ch.2, Outils, Déf. 2.2, p. 32',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\theta\\in\\Theta\\})$ modèle paramétrique, $g:\\Theta\\to\\mathbb{R}$, $\\alpha\\in]0,1[$.'],
        statement: `Un **intervalle de confiance de niveau $1-\\alpha$** pour $g(\\theta)$ est un intervalle aléatoire $[A(Z),B(Z)]$, dont les bornes $A$, $B$ sont des statistiques à valeurs dans $\\mathbb{R}\\cup\\{-\\infty,+\\infty\\}$, tel que

$$\\mathbb{P}_\\theta\\big(A(Z)\\le g(\\theta)\\le B(Z)\\big)\\ge1-\\alpha\\qquad\\text{pour tout }\\theta\\in\\Theta.$$`,
        intuition: 'La probabilité porte sur l’**intervalle** (aléatoire), pas sur $g(\\theta)$ (inconnu mais fixé). Procédé courant (**fonction pivotale**) : trouver une v.a. fonction des observations et de $g(\\theta)$ dont la loi sous $\\mathbb{P}_\\theta$ ne dépend pas de $\\theta$ ; ses quantiles d’ordre $\\alpha/2$ et $1-\\alpha/2$ l’encadrent avec probabilité $1-\\alpha$ ; on résout l’encadrement en $g(\\theta)$. PC2 Ex. 1 Q7 : $n\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-2)$ joue ce rôle pour $\\sigma^2$. Notion développée au [[chapitre 4|/ch/ch4/cours]].',
        pitfalls: ['« $\\sigma^2$ a une probabilité $1-\\alpha$ d’être dans l’intervalle » est un abus : c’est l’intervalle qui est aléatoire ; l’inégalité doit valoir **pour tout $\\theta$**.'],
      },
      {
        kind: 'text',
        id: 'ch2-s7-ch1',
        title: 'Résultats du chapitre 1 utilisés sans redémonstration (p. 32)',
        text: `- **Densité d’un $n$-échantillon** : modèle dominé par $\\mu$ $\\Rightarrow$ $n$-échantillon dominé par $\\mu^{\\otimes n}$, densité $\\prod_{i=1}^nq_\\theta(x_i)$ (c’est la fonction dont la vraisemblance est l’évaluation aux observations).
- **Modèle dominé, Radon-Nikodym** : deux densités relatives à deux mesures dominantes diffèrent d’un facteur indépendant du paramètre $\\Rightarrow$ EMV indépendant de ce choix.
- **Statistiques d’ordre et médiane empirique** (modèles uniforme et de Laplace).
- **Théorème de transfert, fonction muette, changement de variables** : moments exacts, $\\mathrm{KL}$ comme espérance, densité d’un modèle transformé ($\\ln X$, $X^c$).
- **Lois exponentielle et Gamma** : $\\mathbb{E}_\\theta[X_1^k]=k!/\\theta^k$, additivité, biais et EQM de $1/\\bar X_n$.
- **Vecteurs gaussiens, $\\chi^2$, théorèmes de Cochran et de Gosset** : PC2 Ex. 1 (régression), remarque de l’Ex. 1.10.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 8. Exercices types (PC2)
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s8-methodes',
    title: '8. Méthodes types : régression linéaire gaussienne, mélange, famille exponentielle (PC2)',
    role: 'methodes',
    intro:
      'Les trois exercices de la PC2 (= Exercices 1 à 3 du poly, p. 33–37) sont les **exercices types** du chapitre : (1) régression linéaire gaussienne : EMV = moindres carrés, lois exactes par Cochran, IC pour $\\sigma^2$ (sujet **récurrent** : CC 2022 Ex. 4, Examen 2025 Ex. 4 Q1–Q2, Q9–Q10) ; (2) mélange uniforme : EMV $\\ne$ EMM, cas au bord et seuillage, biais ; (3) famille exponentielle : EMV = EMM associé à $T$, invariance. Les exercices bonus (durée de vie, auto-régressif) sont résumés.',
    blocks: [
      {
        kind: 'example',
        id: 'ch2-pc2-ex1',
        title: 'PC2 Ex. 1 — Modèle linéaire gaussien : l’EMV est l’estimateur des moindres carrés',
        source: 'PC2 Ex. 1 Q1–Q7 ; Poly ch.2, Exercice 1, corrigé p. 39–41',
        setup: `Modèle $\\Big(\\mathbb{R}^n,\\mathcal{B}(\\mathbb{R}^n),\\big\\{p_\\theta\\cdot\\mathrm{dLeb}^{\\otimes n}:=\\bigotimes_{i=1}^n\\mathcal{N}(\\beta_1+\\beta_2x_i,\\sigma^2),\\ \\theta=(\\beta_1,\\beta_2,\\sigma^2)\\in\\mathbb{R}^2\\times\\mathbb{R}_+^\\ast\\big\\}\\Big)$, $x_1,\\dots,x_n$ réels **connus** avec au moins deux $x_i$ distincts. Notations : $\\mathbf{Y}=(Y_1,\\dots,Y_n)^T$, $\\mathbf{X}=[\\mathbf{1}\\ \\underline{\\mathbf{x}}]\\in\\mathbb{R}^{n\\times2}$, $\\beta=(\\beta_1,\\beta_2)^T$, $\\bar x=\\frac1n\\sum_ix_i$ ; variable libre $\\vartheta=(b,v)$. On suppose $n\\ge3$.`,
        steps: [
          { text: '**Q1.** $\\mathbf{X}^T\\mathbf{X}=\\begin{pmatrix}n&\\sum_ix_i\\\\ \\sum_ix_i&\\sum_ix_i^2\\end{pmatrix}$, $\\det(\\mathbf{X}^T\\mathbf{X})=n\\sum_ix_i^2-(\\sum_ix_i)^2=n\\sum_i(x_i-\\bar x)^2>0$ : inversible ; comme $u^T\\mathbf{X}^T\\mathbf{X}u=\\|\\mathbf{X}u\\|^2\\ge0$, elle est définie positive.', justification: 'Cauchy-Schwarz (cas d’égalité = colinéarité de $\\mathbf{1}$ et $\\underline{\\mathbf{x}}$, exclue par l’hypothèse « deux $x_i$ distincts ») ; $F:=\\mathrm{Im}(\\mathbf{X})$ est de dimension 2.' },
          { text: '**Q2.** $\\ell_n(b,v)=-\\frac12\\log(2\\pi v)-\\frac1{2nv}\\|\\mathbf{Y}-\\mathbf{X}b\\|^2$ ; équations de vraisemblance $\\frac1{nv}\\mathbf{X}^T(\\mathbf{Y}-\\mathbf{X}b)=0$ et $-\\frac1{2v}+\\frac1{2nv^2}\\|\\mathbf{Y}-\\mathbf{X}b\\|^2=0$. *À $v$ fixé* : minimiser $J(b)=\\|\\mathbf{Y}-\\mathbf{X}b\\|^2$, strictement convexe (hessienne $2\\mathbf{X}^T\\mathbf{X}$ définie positive), unique minimum donné par les **équations normales** $\\mathbf{X}^T\\mathbf{X}b=\\mathbf{X}^T\\mathbf{Y}$ : $\\hat\\beta=(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T\\mathbf{Y}$, soit $\\hat\\beta_2=\\dfrac{\\sum_i(x_i-\\bar x)(Y_i-\\bar Y)}{\\sum_i(x_i-\\bar x)^2}$, $\\hat\\beta_1=\\bar Y-\\hat\\beta_2\\bar x$. *Puis en $v$* : $S:=\\frac1n\\|\\mathbf{Y}-\\mathbf{X}\\hat\\beta\\|^2$, dérivée $\\frac{S-v}{2v^2}$, maximum en $v=S$. EMV : $(\\hat\\beta_1,\\hat\\beta_2,\\hat\\sigma^2)$ avec $\\hat\\sigma^2=\\frac1n\\sum_i(Y_i-\\hat\\beta_1-\\hat\\beta_2x_i)^2$.', justification: 'Maximisation en deux temps (Ex. 1.10) ; $\\ell_n(b,v)\\le\\ell_n(\\hat\\beta,v)\\le\\ell_n(\\hat\\beta,S)$ ; $S>0$ p.s. pour $n\\ge3$ (Q5). **EMV = moindres carrés** pour les coefficients (PC1 Ex. 4) ; $\\hat\\sigma^2$ divise par $n$, pas par $n-2$. Pour $n=2$, $S=0$ : pas d’EMV.' },
          { text: '**Géométrie.** $P:=\\mathbf{X}(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T$ est la projection orthogonale sur $F=\\mathrm{Vect}(\\mathbf{1},\\underline{\\mathbf{x}})$ ; $\\mathbf{X}\\hat\\beta=P\\mathbf{Y}$ et $\\hat\\sigma^2=\\frac1n\\|(I_n-P)\\mathbf{Y}\\|^2$ (partie de $\\mathbf{Y}$ non expliquée par les colonnes de $\\mathbf{X}$).', justification: '$P$ symétrique, $P^2=P$, $P\\mathbf{X}=\\mathbf{X}$ ; $I_n-P$ projette sur $F^\\perp$ (dimension $n-2$).' },
          { text: '**Q3.** $\\hat\\beta=A\\mathbf{Y}$ avec $A=(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^T$ ; $\\mathbf{Y}\\sim\\mathcal{N}(\\mathbf{X}\\beta,\\sigma^2I_n)$ donc $\\hat\\beta\\sim\\mathcal{N}\\big(\\beta,\\sigma^2(\\mathbf{X}^T\\mathbf{X})^{-1}\\big)$ : **sans biais**, $\\mathrm{Var}(\\hat\\beta_2)=\\frac{\\sigma^2}{\\sum_i(x_i-\\bar x)^2}$, $\\mathrm{Cov}(\\hat\\beta_1,\\hat\\beta_2)=-\\frac{\\sigma^2\\bar x}{\\sum_i(x_i-\\bar x)^2}$.', justification: 'Image linéaire d’un vecteur gaussien (ch.1 Prop. 2.4) : $A\\mathbf{X}=I_2$, $AA^T=(\\mathbf{X}^T\\mathbf{X})^{-1}$.' },
          { text: '**Q4.** $\\hat\\beta_1$ et $\\hat\\beta_2$ indépendants ssi $\\mathrm{Cov}=0$ ssi $\\bar x=0$. Paramétrisation centrée $\\tilde\\beta_1=\\beta_1+\\beta_2\\bar x$, $\\underline{\\tilde{\\mathbf{x}}}=\\underline{\\mathbf{x}}-\\bar x\\mathbf{1}$ : colonnes orthogonales, estimateur de $\\tilde\\beta_1$ égal à $\\bar Y$, indépendant de $\\hat\\beta_2$.', justification: 'Vecteur gaussien : indépendance $\\iff$ décorrélation (ch.1 Prop. 2.6).' },
          { text: '**Q5.** $\\mathbf{X}\\beta\\in F$ donc $(I_n-P)\\mathbf{Y}=(I_n-P)(\\mathbf{Y}-\\mathbf{X}\\beta)$ : par Cochran, $\\dfrac{n\\hat\\sigma^2}{\\sigma^2}=\\dfrac{\\|(I_n-P)\\mathbf{Y}\\|^2}{\\sigma^2}\\sim\\chi^2(n-2)$. Donc $\\mathbb{E}_\\theta[\\hat\\sigma^2]=\\frac{n-2}n\\sigma^2$ (**biaisé**) ; $\\frac1{n-2}\\|\\mathbf{Y}-\\mathbf{X}\\hat\\beta\\|^2$ est sans biais.', justification: 'Théorème de Cochran (ch.1 Thm 1.1) avec $F^\\perp$ de dimension $n-2$ ; $\\chi^2(n-2)=\\Gamma(\\frac{n-2}2,\\frac12)$ d’espérance $n-2$.' },
          { text: '**Q6.** $\\hat\\sigma^2$ est fonction de $(I_n-P)\\mathbf{Y}$, $\\hat\\beta=(\\mathbf{X}^T\\mathbf{X})^{-1}\\mathbf{X}^TP\\mathbf{Y}$ est fonction de $P\\mathbf{Y}$ ; Cochran donne l’indépendance de $P\\mathbf{Y}$ et $(I_n-P)\\mathbf{Y}$, donc celle de $\\hat\\sigma^2$ et $\\hat\\beta$.', justification: 'Projections sur des sous-espaces orthogonaux d’un vecteur $\\mathcal{N}(\\cdot,\\sigma^2I_n)$ ; fonctions mesurables de v.a. indépendantes.' },
          { text: '**Q7.** $n\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-2)$ quel que soit $\\theta$ : **fonction pivotale**. Avec les quantiles $q^{n-2}_{\\alpha/2}<q^{n-2}_{1-\\alpha/2}$ de $\\chi^2(n-2)$ : $\\mathbb{P}_\\theta\\big(q^{n-2}_{\\alpha/2}\\le n\\hat\\sigma^2/\\sigma^2\\le q^{n-2}_{1-\\alpha/2}\\big)=1-\\alpha$, d’où l’IC de niveau $1-\\alpha$ pour $\\sigma^2$ : $\\Big[\\dfrac{n\\hat\\sigma^2}{q^{n-2}_{1-\\alpha/2}},\\ \\dfrac{n\\hat\\sigma^2}{q^{n-2}_{\\alpha/2}}\\Big]$.', justification: 'Déf. 2.2 ; résolution de l’encadrement en $\\sigma^2$ (les quantiles **s’inversent** : borne inférieure avec $q_{1-\\alpha/2}$).' },
        ],
        conclusion: '**Pièges :** degrés de liberté $n-2$ (pas $n-1$ ni $n$) ; $\\hat\\sigma^2$ biaisé (facteur $(n-2)/n$) ; indépendance de $\\hat\\beta_1$, $\\hat\\beta_2$ seulement si $\\bar x=0$ ; décorrélation $\\Rightarrow$ indépendance **uniquement** pour un vecteur gaussien ; « Théorème 1.1 » du fascicule = Cochran du ch.1. Application numérique (hors corrigé) : $n=10$, $\\alpha=5\\,\\%$, $\\chi^2(8)$ : $q_{0{,}025}\\approx2{,}180$, $q_{0{,}975}\\approx17{,}535$, IC $[10\\hat\\sigma^2/17{,}535;\\ 10\\hat\\sigma^2/2{,}180]$.',
      },
      {
        kind: 'viz',
        id: 'ch2-s8-viz-regression',
        vizId: 'ch2-regression-lineaire',
        caption: 'Nuage $(x_i,Y_i)$, droite des moindres carrés (= EMV), résidus ; à droite, la loi $\\chi^2(n-2)$ de $n\\hat\\sigma^2/\\sigma^2$ retrouvée par simulation.',
      },
      {
        kind: 'example',
        id: 'ch2-pc2-ex2',
        title: 'PC2 Ex. 2 — Mélange de deux uniformes : EMV et estimateur des moments ne coïncident pas',
        source: 'PC2 Ex. 2 Q1–Q3 ; Poly ch.2, Exercice 2, corrigé p. 41–44',
        setup: '$n$-échantillon de $\\{f_\\theta\\cdot\\mathrm{Leb},\\theta\\in]0,1[\\}$, $f_\\theta(x)=\\frac\\theta a\\mathbb{1}_{[0,a]}(x)+\\frac{1-\\theta}b\\mathbb{1}_{[0,b]}(x)$, $0<a<b$ connus (mélange de poids $\\theta$ et $1-\\theta$ de $\\mathcal{U}([0,a])$ et $\\mathcal{U}([0,b])$). F.d.r. : $F_\\theta(t)=(\\frac\\theta a+\\frac{1-\\theta}b)t$ sur $[0,a]$, $\\theta+\\frac{1-\\theta}bt$ sur $[a,b]$ (coquille de l’énoncé : « $1$ si $x\\ge1$ » se lit $x\\ge b$). $N_a:=\\sum_i\\mathbb{1}_{\\{X_i\\in[0,a]\\}}$.',
        steps: [
          { text: '**Q1.** $f_\\vartheta(x)=\\big(\\frac\\vartheta a+\\frac{1-\\vartheta}b\\big)\\mathbb{1}_{[0,a]}(x)+\\frac{1-\\vartheta}b\\mathbb{1}_{]a,b]}(x)$, donc $\\mathrm{L}_n(\\vartheta)=\\Big(\\frac\\vartheta a+\\frac{1-\\vartheta}b\\Big)^{N_a}\\Big(\\frac{1-\\vartheta}b\\Big)^{n-N_a}$ : la vraisemblance ne dépend des observations que par $N_a$.', justification: 'Densité produit ; observations p.s. dans $[0,b]$ et $\\ne a$.' },
          { text: '**Q2.** $\\ell_n(\\vartheta)=\\frac{N_a}n\\log\\big(\\frac\\vartheta a+\\frac{1-\\vartheta}b\\big)+\\big(1-\\frac{N_a}n\\big)\\log\\frac{1-\\vartheta}b$ ; $\\ell_n\'(\\vartheta)=\\dfrac{bN_a-na-n\\vartheta(b-a)}{n(1-\\vartheta)(a+\\vartheta(b-a))}$, dénominateur $>0$ sur $]0,1[$, numérateur affine strictement décroissant, nul en $\\hat\\theta_n:=\\dfrac{b(N_a/n)-a}{b-a}$.', justification: '$\\frac\\vartheta a+\\frac{1-\\vartheta}b=\\frac{a+\\vartheta(b-a)}{ab}$ ; dérivée du premier log $\\frac{b-a}{a+\\vartheta(b-a)}$, du second $-\\frac1{1-\\vartheta}$.' },
          { text: 'Trois cas : si $0<\\hat\\theta_n<1$ ($a/b<N_a/n<1$), $\\ell_n$ croît puis décroît : EMV unique $=\\hat\\theta_n$ ; si $\\hat\\theta_n\\le0$ ($N_a/n\\le a/b$), $\\ell_n$ strictement décroissante sur $]0,1[$ : **pas d’EMV dans $]0,1[$** (borne sup en $0$ non atteinte) ; si $N_a=n$, strictement croissante : pas d’EMV. On **prolonge le modèle à $[0,1]$** ($f_0$, $f_1$ densités de $\\mathcal{U}([0,b])$, $\\mathcal{U}([0,a])$) et on retient $\\hat\\theta_n^{(1)}:=\\hat\\theta_n\\vee0$.', justification: 'Étude de signe de $\\ell_n\'$ ; sur le fermé $[0,1]$, $\\mathrm{L}_n$ continue atteint son maximum en un point unique. $\\mathbb{P}_\\theta(a/b<N_a/n<1)\\to1$ par la LGN ($N_a/n\\to p_\\theta:=\\theta+(1-\\theta)\\frac ab\\in]a/b,1[$).' },
          { text: '*Biais.* $N_a\\sim\\mathrm{Bin}(n,p_\\theta)$ donc $\\mathbb{E}_\\theta[\\hat\\theta_n]=\\frac{bp_\\theta-a}{b-a}=\\theta$ : l’estimateur **non seuillé** est sans biais ; mais $\\hat\\theta_n^{(1)}\\ge\\hat\\theta_n$ avec inégalité stricte sur $\\{\\hat\\theta_n<0\\}$ (probabilité $>0$) : $\\mathbb{E}_\\theta[\\hat\\theta_n^{(1)}]>\\theta$, **biais positif**, d’autant plus faible que $n$ est grand.', justification: 'Linéarité de l’espérance ; $\\{N_a=0\\}\\subset\\{\\hat\\theta_n<0\\}$ a pour probabilité $(1-p_\\theta)^n>0$.' },
          { text: '**Q3.** Moment d’ordre 1 : $e(\\theta)=\\mathbb{E}_\\theta[X_1]=\\theta\\frac a2+(1-\\theta)\\frac b2=\\frac b2-\\theta\\frac{b-a}2$ ; l’équation $e(\\vartheta)=\\bar X_n$ a pour unique solution réelle $\\tilde\\theta_n:=\\dfrac{b-2\\bar X_n}{b-a}$, dans $]0,1[$ ssi $a/2<\\bar X_n<b/2$ — pas garanti à $n$ fixé (toutes observations $<a/2$ : probabilité $F_\\theta(a/2)^n>0$). On retient l’estimateur **seuillé** $\\hat\\theta_n^{(2)}:=0$ si $\\tilde\\theta_n\\le0$, $1$ si $\\tilde\\theta_n\\ge1$, $\\tilde\\theta_n$ sinon.', justification: 'Espérance d’un mélange = mélange des espérances ($\\mathbb{E}[\\mathcal{U}([0,c])]=c/2$) ; $\\tilde\\theta_n$ sans biais ($\\mathbb{E}_\\theta[\\bar X_n]=e(\\theta)$), $\\hat\\theta_n^{(2)}$ biaisé en général ; $\\bar X_n\\to e(\\theta)\\in]a/2,b/2[$ (Prop. 1.1) donc le seuillage disparaît asymptotiquement.' },
        ],
        conclusion: '**EMV $\\ne$ EMM** ici (le modèle n’est pas exponentiel au sens de l’Ex. 3). Analyse numérique ($a=1$, $b=3$, $\\theta=0{,}2$) : pour $n=10$, $N_a/n=0{,}30\\le1/3$ donne $\\hat\\theta_n=-0{,}05$ et $\\hat\\theta_n^{(1)}=0$ (maximum au bord) ; pour $n=200$, $N_a/n=0{,}525$ donne $\\hat\\theta_n^{(1)}=0{,}2875\\ne0{,}2$. Sur 5000 répétitions, le seuillage intervient souvent pour $n=10$, presque plus pour $n=200$ (boîtes à moustaches MV-1/MV-2/Mom-1/Mom-2 ; attention aux échelles).',
      },
      {
        kind: 'example',
        id: 'ch2-pc2-ex3',
        title: 'PC2 Ex. 3 — Famille exponentielle : l’EMV est l’estimateur des moments associé à T',
        source: 'PC2 Ex. 3 Q1–Q3 ; Poly ch.2, Exercice 3, corrigé p. 44–47',
        setup: '**Modèle exponentiel canonique** associé à $(T,h)$ : $q_\\eta(x)=h(x)\\exp(\\eta T(x)-A(\\eta))$ avec $A(\\eta)=\\log\\int h\\,\\mathrm{e}^{\\eta T}\\,\\mathrm{d}\\mu$ ; espace des paramètres naturels $\\Xi=\\{\\eta:|A(\\eta)|<\\infty\\}$. **Famille exponentielle** générale : $p_\\theta(x)=h(x)\\exp(\\varphi(\\theta)T(x)-B(\\theta))$. On note $G(\\eta)=\\int h\\,\\mathrm{e}^{\\eta T}\\,\\mathrm{d}\\mu=\\mathrm{e}^{A(\\eta)}$ et $\\bar T_n=\\frac1n\\sum_kT(X_k)$.',
        steps: [
          { text: '**Q1 (exemples).** $\\mathcal{E}(\\eta)$ : $h=\\mathbb{1}_{\\mathbb{R}_+}$, $T(x)=-x$ (**signe !**), $A(\\eta)=-\\log\\eta$, $\\Xi=]0,+\\infty[$ : canonique. $\\mathcal{N}(\\eta,1)$ : $h(x)=(2\\pi)^{-1/2}\\mathrm{e}^{-x^2/2}$, $T(x)=x$, $A(\\eta)=\\eta^2/2$, $\\Xi=\\mathbb{R}$ : canonique. Weibull d’échelle $\\lambda$ ($\\alpha{}$ fixé) : $h(x)=\\alpha x^{\\alpha-1}$, $T(x)=-x^\\alpha$, $\\varphi(\\lambda)=\\lambda^{-\\alpha}$, $B(\\lambda)=\\alpha\\log\\lambda$ : exponentielle **non canonique** en $\\lambda$ (canonique via $\\eta=\\lambda^{-\\alpha}$). Poisson : $h=1/x!$, $T(x)=x$, $\\varphi(\\theta)=\\log\\theta$, $B(\\theta)=\\theta$ ; canonique avec $\\eta=\\log\\theta$, $A(\\eta)=\\mathrm{e}^\\eta$, $\\Xi=\\mathbb{R}$. Binomiale : $h=\\binom nx$, $T(x)=x$, $\\varphi(\\theta)=\\log\\frac\\theta{1-\\theta}$, $B(\\theta)=-n\\log(1-\\theta)$ ; canonique avec $A(\\eta)=n\\log(1+\\mathrm{e}^\\eta)$.', justification: 'Mise sous forme exponentielle : identifier $h$, $T$, $\\varphi$, $B$ ; calcul de $G$ (intégrale, complétion du carré, série exponentielle, binôme de Newton).' },
          { text: '**Q2(a).** Si l’on peut dériver sous l’intégrale : $A\'(\\eta)=\\frac{G\'(\\eta)}{G(\\eta)}=\\int Tq_\\eta\\,\\mathrm{d}\\mu=\\mathbb{E}_\\eta[T(X)]$ et $A\'\'(\\eta)=\\frac{G\'\'}{G}-\\big(\\frac{G\'}G\\big)^2=\\mathrm{Var}_\\eta(T(X))$.', justification: '$q_\\eta=h\\mathrm{e}^{\\eta T}/G(\\eta)$ ; dérivée de $\\log G$.' },
          { text: '**Q2(b).** Pour $\\eta_1,\\eta_2\\in\\Xi$, $\\lambda\\in]0,1[$ : $G(\\lambda\\eta_1+(1-\\lambda)\\eta_2)=\\int(h\\mathrm{e}^{\\eta_1T})^\\lambda(h\\mathrm{e}^{\\eta_2T})^{1-\\lambda}\\mathrm{d}\\mu\\le G(\\eta_1)^\\lambda G(\\eta_2)^{1-\\lambda}$ : $A$ **convexe** et $\\Xi$ **convexe**.', justification: 'Inégalité de Hölder (exposants conjugués $1/\\lambda$, $1/(1-\\lambda)$) ; $A>-\\infty$ partout car $\\mu(\\{h>0\\})>0$.' },
          { text: '**Q2(c).** Si $\\Xi$ est un intervalle **ouvert**, $G$ est $C^\\infty$ et $G^{(k)}(\\eta)=\\int hT^k\\mathrm{e}^{\\eta T}\\mathrm{d}\\mu$ : pour $\\eta\\pm\\varepsilon\\in\\Xi$, $\\mathrm{e}^{\\varepsilon|T|}\\le\\mathrm{e}^{\\varepsilon T}+\\mathrm{e}^{-\\varepsilon T}$ donne $\\int h\\,\\mathrm{e}^{\\varepsilon|T|}\\mathrm{e}^{\\eta T}\\mathrm{d}\\mu<\\infty$, puis $|T|^m\\mathrm{e}^{\\varepsilon|T|/2}\\le C_m\\mathrm{e}^{\\varepsilon|T|}$ ; accroissements finis : $|\\frac{\\mathrm{e}^{sT}-1}s|\\le|T|\\mathrm{e}^{|s||T|}$ pour $|s|\\le\\varepsilon/2$.', justification: 'Convergence dominée (domination indépendante de $s$) puis récurrence sur $k$ ; l’ouverture de $\\Xi$ fournit la marge $\\pm\\varepsilon$.' },
          { text: '**Q2(d).** (i) Estimateur des moments associé à $T$ : solution $\\eta\\in\\Xi$ de $A\'(\\eta)=\\bar T_n$. (ii) EMV : $\\ell_n(\\eta)=\\frac1n\\sum_k\\log h(X_k)+\\eta\\bar T_n-A(\\eta)$, $\\ell_n\'(\\eta)=\\bar T_n-A\'(\\eta)$, $\\ell_n\'\'(\\eta)=-\\mathrm{Var}_\\eta(T(X_1))<0$ (hors cas dégénéré) : $\\ell_n$ **strictement concave**, l’équation de vraisemblance **est l’équation des moments** $A\'(\\eta)=\\bar T_n$. L’EMV existe ssi $\\bar T_n\\in A\'(\\Xi)$ (intervalle ouvert) et il est alors unique.', justification: 'Lemme 2.3 ; $A\'$ continue strictement croissante. Si $\\mathrm{Var}_\\eta(T)=0$ : $T$ constante, $q_\\eta$ indépendant de $\\eta$, modèle non identifiable.' },
          { text: '**Q3.** Modèle général, $\\varphi$ difféomorphisme de $\\Theta$ sur $\\Xi$ : $B=A\\circ\\varphi$ (normalisation), $\\tilde\\ell_n(\\theta)=\\ell_n(\\varphi(\\theta))$, équation de vraisemblance $\\frac{B\'(\\theta)}{\\varphi\'(\\theta)}=\\bar T_n$, i.e. $A\'(\\varphi(\\theta))=\\bar T_n$ : $\\hat\\theta_n=\\varphi^{-1}(\\hat\\eta_n)$.', justification: 'Dérivée d’une composée ; invariance par reparamétrisation (Prop. 1.2). Poisson : $A\'(\\eta)=\\mathrm{e}^\\eta$ $\\Rightarrow$ $\\hat\\theta_n=\\bar X_n$ ; binomiale à $m$ essais : $\\hat\\theta_n=\\bar X_n/m$.' },
        ],
        conclusion: '**Conclusion :** dans un modèle exponentiel canonique, l’EMV et l’estimateur des moments associé à $T$ existent simultanément et **coïncident** (Bernoulli, Poisson, gaussien, exponentiel : $T(x)=-x$ redonne $1/\\bar X_n$). La représentation n’est pas unique ($\\eta T=(\\lambda\\eta)(T/\\lambda)$) ; en général le paramètre est vectoriel ($\\sum_j\\varphi_j(\\theta)T_j(x)$, ex. $\\mathcal{N}_d(\\mu,\\Sigma)$). Pièges : $\\Xi$ défini par $|A|<\\infty$ ; stricte convexité de $A$ $\\Rightarrow$ unicité, pas existence.',
      },
      {
        kind: 'text',
        id: 'ch2-s8-bonus',
        title: 'Exercices bonus (groupe 2) : durée de vie et modèle auto-régressif',
        text: `**PC2 Ex. 4 — Durée de vie.** Machines de durées $X_0\\sim\\mathcal{E}(\\lambda_0)$, $X_1\\sim\\mathcal{E}(\\lambda_1)$ indépendantes ; système en série $Z=X_0\\wedge X_1\\sim\\mathcal{E}(\\lambda_0+\\lambda_1)$ (produit des survies) ; $\\mathbb{P}_\\theta(I=1)=\\mathbb{P}_\\theta(X_1<X_0)=\\frac{\\lambda_1}{\\lambda_0+\\lambda_1}$ (Fubini) ; $Z$ et $I$ sont **indépendantes** (classe monotone). Observer seulement $Z_1,\\dots,Z_n$ : modèle **non identifiable** (seule $\\lambda_0+\\lambda_1$ l’est) ; observer $(Z_i,I_i)$ : densité $q_\\theta(z,\\delta)=\\lambda_\\delta\\mathrm{e}^{-(\\lambda_0+\\lambda_1)z}$ par rapport à $\\mathrm{Leb}\\otimes$ comptage, modèle **identifiable**, EMV $\\hat\\lambda_\\delta=N_\\delta/\\sum_iZ_i$ sur $\\{N_0>0,N_1>0\\}$ (séparation des variables + annulation du score).

**PC2 Ex. 5 — Auto-régressif AR(1).** Loi conditionnelle de $X_k$ sachant le passé : $\\mathcal{N}(\\phi X_{k-1},\\sigma^2)$, $X_0=0$. Densité par conditionnements successifs (fonction muette) : $p_\\theta(x)=(2\\pi\\sigma^2)^{-n/2}\\exp\\big(-\\frac1{2\\sigma^2}\\sum_k(x_k-\\phi x_{k-1})^2\\big)$ — première vraisemblance **hors du cadre du $n$-échantillon** (observations ni indépendantes ni de même loi). Maximisation en deux temps : $\\hat\\phi_n=\\dfrac{\\sum_{k=1}^nX_kX_{k-1}}{\\sum_{k=1}^nX_{k-1}^2}$ (le corrigé 2025 de la PC avait le dénominateur $\\sum_kX_k^2$ : **coquille**, corrigée dans le poly) et $\\hat\\sigma_n^2=\\frac1n\\sum_k(X_k-\\hat\\phi_nX_{k-1})^2$ : régression sans constante de $X_k$ sur $X_{k-1}$ ; la loi de $\\hat\\phi_n$ ne s’obtient plus par Cochran (régresseur aléatoire).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 9. À l'examen
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s9-examen',
    title: '9. À l’examen : ce qui tombe et la rédaction attendue',
    role: 'liens-examen',
    intro:
      'D’après le diagnostic des annales (Examen 2025 et CC MAP433 2022), le chapitre 2 pèse ≈ 6 % des points en propre mais ouvre chaque problème d’estimation : l’EMV (Q2) et l’estimateur des moments (Q9(a)) de l’Examen 2025 Ex. 2, l’EMV de la régression (CC 2022 Ex. 4 Q1 ; QCM 2025 Ex. 4 Q1, Q2, Q9, Q10). La rédaction attendue est stéréotypée : la connaître fait gagner du temps pour la suite.',
    blocks: [
      {
        kind: 'text',
        id: 'ch2-s9-annales',
        title: 'Questions d’annales relevant du chapitre (DIAGNOSTIC §2)',
        text: `- **Examen 2025 Ex. 2 Q2** (≈ 0,75 pt) : EMV $(\\hat\\mu_{ML},\\widehat{\\sigma^2}_{ML})$ de la loi log-normale. Attendu : $\\log\\mathrm{L}_n=-\\sum_i\\ln X_i-\\frac n2\\ln(2\\pi\\sigma^2)-\\frac1{2\\sigma^2}\\sum_i(Y_i-\\mu)^2$ avec $Y_i=\\ln X_i$ ; le premier terme est **constant en $\\theta$** ; on est ramené à l’EMV gaussien des $Y_i$ (Ex. 1.10 : équations de vraisemblance + stricte concavité en $m$, étude de $v\\mapsto-\\frac12\\log v-\\frac S{2v}$) : $\\hat\\mu_{ML}=\\bar Y_n$, $\\widehat{\\sigma^2}_{ML}=\\frac1n\\sum_i(Y_i-\\bar Y_n)^2=\\frac{n-1}nS_n^2$.
- **Examen 2025 Ex. 2 Q9(a)** (≈ 0,5 pt) : estimateur des moments de $(\\mu,\\sigma^2)$ associé à $T_1(x)=x$, $T_2(x)=x^2$ (log-normale). Attendu : $m_k=\\mathbb{E}[X^k]=\\mathrm{e}^{k\\mu+k^2\\sigma^2/2}$ (transformée de Laplace rappelée), $\\ln m_1=\\mu+\\frac{\\sigma^2}2$, $\\ln m_2=2\\mu+2\\sigma^2$, inversion : $\\hat\\mu_{Mom}=2\\ln\\hat m_1-\\frac12\\ln\\hat m_2$, $\\widehat{\\sigma^2}_{Mom}=\\ln\\frac{\\hat m_2}{\\hat m_1^2}$ ($>0$ par Cauchy-Schwarz, p.s. pour $n\\ge2$). C’est l’Ex. 1.5 (deux moments pour deux paramètres).
- **CC 2022 Ex. 4 Q1** (≈ 0,75 pt, laissée vide dans le corrigé officiel) : EMV $\\hat\\beta=(X^\\top X)^{-1}X^\\top Y$ et $\\hat\\sigma^2=\\frac1n\\|Y-X\\hat\\beta\\|^2$ en régression simple. Rédaction type : PC2 Ex. 1 Q2 (maximiser en $\\beta$ à $\\sigma^2$ fixé : équations normales ; puis en $\\sigma^2$).
- **Examen 2025 Ex. 4 (QCM, 0,25 pt chacun, $-0{,}5$ par erreur)** : Q1 « EMV de $\\beta_2$ » $\\to$ $\\dfrac{\\sum_i(t_i-\\bar t)(X_i-\\bar X)}{\\sum_i(t_i-\\bar t)^2}$ ; Q2 « degrés de liberté de $\\hat\\sigma^2$ » $\\to$ $n-2$ ; Q9 « moindres carrés $Y=Z\\beta+\\varepsilon$ » $\\to$ $(Z^\\top Z)^{-1}Z^\\top Y$ ; Q10 « loi de $\\hat\\beta$ » $\\to$ $\\mathcal{N}(\\beta,\\sigma^2(Z^\\top Z)^{-1})$. Ne répondre que si l’on est sûr.
- **Questions de cours probables (DIAGNOSTIC §4, item 9)** : énoncer la Déf. 1.4 (vraisemblance, EMV), la Déf. 1.6 (équations de vraisemblance) et la Prop. 1.2 (invariance) ; la méthode des moments (Déf. 1.2, cas à deux moments).`,
      },
      {
        kind: 'text',
        id: 'ch2-s9-redaction',
        title: 'Rédaction type « Déterminer l’EMV » (DIAGNOSTIC §5.5)',
        text: `1. **Modèle et densité** : préciser la mesure dominante et $q_\\vartheta$ ; pour un modèle transformé ($\\ln X$, $X^c$), écrire la densité du modèle induit ou remarquer que le jacobien est **constant en $\\theta$**.
2. **Vraisemblance et log-vraisemblance** : $\\mathrm{L}_n(\\vartheta)=\\prod_iq_\\vartheta(X_i)$ « par indépendance » ; $\\ell_n$ ; écarter les termes constants en $\\vartheta$ (« $C$ ne dépend pas de $\\vartheta$ »).
3. **Équations de vraisemblance** $\\nabla_\\vartheta\\ell_n=0$ sur $\\mathring\\Theta$ ; résoudre.
4. **Maximum global** : « $\\ell_n\'\'<0$ donc $\\ell_n$ est strictement concave, l’unique point critique est le maximum global (Lemme 2.3) », ou étude de signe de la dérivée, ou maximisation en deux temps (gaussien, régression), ou $\\ell_n\\to-\\infty$ au bord.
5. **Cas particuliers** : valeurs des observations sans point critique (Poisson $\\bar X_n=0$ : pas d’EMV) ; paramètre au bord ($\\Theta=\\mathbb{R}_+$ : $\\max(\\bar X_n,0)$, PC7 Ex. 4) ; modèle non régulier : étude directe ($X_{n:n}$).
6. **Reparamétrisation** : « par invariance (Prop. 1.2 ch.2), l’EMV de $g(\\theta)$ est $g(\\hat\\theta_n^{\\mathrm{MV}})$ ».
7. **Ne pas confondre** : $\\hat\\sigma^2_{\\mathrm{MV}}$ (diviseur $n$) et $S_n^2$ (diviseur $n-1$) ; EMV et estimateur des moments (ils ne coïncident que dans les familles exponentielles pour la statistique $T$ canonique).

**Rédaction type « Estimateur des moments »** : choisir $T_j$, vérifier l’intégrabilité, calculer $e_j(\\theta)$, écrire le système $e_j(\\vartheta)=\\frac1n\\sum_iT_j(X_i)$, le résoudre en vérifiant **unicité et appartenance à $\\Theta$**, puis consistance par LGN + Lemme 2.1 (ch.2) ou Thm 1.1 (ch.6) et normalité (ch.6) par TCL + méthode-δ **vectorielle** si deux moments (DIAGNOSTIC §6, piège 9).`,
      },
      {
        kind: 'text',
        id: 'ch2-s9-pieges',
        title: 'Pièges relevés dans les copies et les corrigés',
        text: `- Dériver $\\vartheta^{-n}$ pour l’uniforme et conclure à l’absence de maximum : la vraisemblance s’annule à gauche de $X_{n:n}$ et n’est pas dérivable en son maximum.
- Oublier de vérifier que la racine est un maximum **global** ; oublier les cas au bord (Bernoulli $S_n\\in\\{0,n\\}$, mélange $N_a/n\\le a/b$).
- Écrire $\\ell_n=\\log\\mathrm{L}_n$ au lieu de $\\frac1n\\log\\mathrm{L}_n$ n’est pas grave pour l’argmax, mais la normalisation compte pour la limite $M_{\\theta^\\star}$.
- Parler de « l’» estimateur des moments sans préciser $T$ ; croire que l’intervalle des moments $[\\hat a_n,\\hat b_n]$ contient les observations.
- Confondre $\\theta$, $\\vartheta$ et $\\theta^\\star$ dans la Prop. 1.3 ; prendre l’espérance de $\\boldsymbol\\psi(\\vartheta,X_1)$ sous $\\mathbb{P}_\\theta$ avec $\\vartheta\\ne\\theta$ dans la Déf. 1.3.
- Croire que $\\mathrm{KL}$ est symétrique, ou conclure la consistance de l’EMV de la seule convergence ponctuelle $\\ell_n(\\vartheta)\\to M_{\\theta^\\star}(\\vartheta)$.
- Régression : degrés de liberté $n-2$ ; $\\hat\\sigma^2$ biaisé ; inversion des quantiles dans l’IC pour $\\sigma^2$ ; décorrélation $\\Rightarrow$ indépendance seulement pour un vecteur **gaussien**.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 10. Hors programme
  // -------------------------------------------------------------------------
  {
    id: 'ch2-s10-complements',
    title: '10. Compléments (non exigibles) : Cauchy, échelle, MAD, Bernoulli, censure, régression générale, KL',
    role: 'complements',
    scope: 'hors-programme',
    intro:
      'Section « Les compléments » du poly (p. 52–59) : « les contenus de cette partie ne sont pas exigibles ». Ils prolongent les fondamentaux sur des modèles moins standards et donnent les énoncés complets de résultats dont une partie seulement a été utilisée. Résumé concis.',
    blocks: [
      {
        kind: 'text',
        id: 'ch2-s10-ex41-43',
        scope: 'hors-programme',
        title: 'Ex. 4.1–4.3 — Méthode des moments sans moments, translation-échelle, médiane et MAD',
        text: `**Ex. 4.1 (Cauchy).** $q_\\theta(x)=\\frac1{\\pi(1+(x-\\theta)^2)}$ n’a aucun moment, mais la méthode des moments n’exige pas de moments : avec $T(x)=\\mathrm{signe}(x)$ **bornée**, $e(\\theta)=\\mathbb{E}_\\theta[\\mathrm{signe}(X_1)]=\\frac2\\pi\\arctan\\theta$, bijection continue de $\\mathbb{R}$ sur $]-1,1[$ ; $\\hat\\theta_n=\\tan\\big(\\frac\\pi{2n}\\sum_i\\mathrm{signe}(X_i)\\big)$ si les observations ne sont pas toutes de même signe (probabilité $\\to1$), consistant par Prop. 1.1 + Lemme 2.1.

**Ex. 4.2 (translation et échelle).** $q_\\theta(x)=\\frac1\\sigma q\\big(\\frac{x-m}\\sigma\\big)$ avec $q$ centrée de moment d’ordre 2 égal à $m_2$ : $\\hat m_n=\\bar X_n$, $\\hat\\sigma_n^2=\\frac1{nm_2}\\sum_i(X_i-\\bar X_n)^2$ (jacobienne de $e$ de déterminant $m_2>0$) ; cas gaussien ($m_2=1$) : coïncide avec l’EMV.

**Ex. 4.3 (médiane et MAD).** Fonctions d’estimation **bornées** $\\psi_1=\\mathrm{signe}(x-m)$, $\\psi_2=\\mathrm{signe}\\big(\\frac{|x-m|}\\sigma-a\\big)$ avec $Q(a)=3/4$ ($a\\simeq0{,}6745$ pour la gaussienne) : $\\hat m_n=\\mathrm{med}(X_i)$, $\\hat\\sigma_n=\\frac1a\\mathrm{med}(|X_i-\\hat m_n|)$ (*median absolute deviation*), **robustes** aux valeurs aberrantes.`,
      },
      {
        kind: 'text',
        id: 'ch2-s10-ex44-46',
        scope: 'hors-programme',
        title: 'Ex. 4.4–4.6 — Bernoulli explicite, durées censurées, Cauchy et montée de gradient',
        text: `**Ex. 4.4 (Bernoulli).** $M_{\\theta^\\star}(\\vartheta)=\\theta^\\star\\log\\vartheta+(1-\\theta^\\star)\\log(1-\\vartheta)$, strictement concave, maximum unique en $\\theta^\\star$ ; $\\mathrm{KL}(\\mathcal{B}\\mathrm{er}(\\theta^\\star),\\mathcal{B}\\mathrm{er}(\\vartheta))=\\theta^\\star\\log\\frac{\\theta^\\star}\\vartheta+(1-\\theta^\\star)\\log\\frac{1-\\theta^\\star}{1-\\vartheta}$ ; Bienaymé-Tchebychev : $\\mathbb{P}_{\\theta^\\star}(|\\ell_n(\\vartheta)-M_{\\theta^\\star}(\\vartheta)|\\ge\\delta)\\le\\frac{\\theta^\\star(1-\\theta^\\star)(\\log\\frac\\vartheta{1-\\vartheta})^2}{n\\delta^2}$, borne qui se dégrade quand $\\vartheta\\to0$ ou $1$ (convergence en fait uniforme sur tout $[a,b]\\subset]0,1[$).

**Ex. 4.5 (censure).** $X_i^\\ast=\\min(X_i,\\tau)$, $X_i\\sim\\mathcal{E}(\\theta)$ : pas de densité par rapport à $\\mathrm{Leb}$, mais modèle dominé par $\\mu=\\mathrm{Leb}+\\delta_\\tau$ ; $\\mathrm{L}_n(\\vartheta)=\\vartheta^{\\mathrm{card}N_n^-}\\exp(-\\vartheta\\sum_iX_i^\\ast)$ et $\\hat\\theta_n^{\\mathrm{MV}}=\\mathrm{card}N_n^-/\\sum_iX_i^\\ast$ (pannes observées / durée totale observée) si au moins une panne est observée.

**Ex. 4.6 (Cauchy).** $\\ell_n(\\vartheta)=-\\log\\pi-\\frac1n\\sum_i\\log(1+(X_i-\\vartheta)^2)$ : un EMV **existe** ($\\ell_n\\to-\\infty$ à l’infini) mais l’équation de vraisemblance n’a pas de solution explicite et peut avoir **plusieurs** racines ; montée de gradient $\\vartheta^{(k+1)}=\\vartheta^{(k)}+\\gamma\\ell_n\'(\\vartheta^{(k)})$, qui peut converger vers un maximum **local** : le point de départ (médiane empirique, consistante) est déterminant.`,
      },
      {
        kind: 'text',
        id: 'ch2-s10-ex47-thm41',
        scope: 'hors-programme',
        title: 'Ex. 4.7 et Thm 4.1 — Régression à p+1 coefficients, propriétés complètes de KL',
        text: `**Ex. 4.7.** Régression gaussienne $\\mathbf{Y}\\sim\\mathcal{N}(\\Phi\\beta,\\sigma^2I_n)$ avec $\\Phi_{k,\\ell}=\\varphi_\\ell(x_k)$ ($n\\times(p+1)$) : la vraisemblance s’étend à tout modèle dominé ; EMV = moindres carrés $\\hat\\beta_n=(\\Phi^\\top\\Phi)^{-1}\\Phi^\\top\\mathbf{Y}$ (équations normales, rang $p+1$), $\\hat\\sigma_n^2=\\frac1n\\|\\mathbf{Y}-\\Phi\\hat\\beta_n\\|^2$ ; Cochran : $\\hat\\beta_n\\sim\\mathcal{N}(\\beta,\\sigma^2(\\Phi^\\top\\Phi)^{-1})$, $n\\hat\\sigma_n^2/\\sigma^2\\sim\\chi^2(n-p-1)$, indépendants.

**KL bien définie.** La partie négative de l’intégrande n’est non nulle que si $0<f_0<f_1$ et $\\int(f_0\\log(f_0/f_1))^-\\,\\mathrm{d}\\mu\\le\\int f_1\\,\\mathrm{d}\\mu=1$ (via $\\log y\\le y$) : $\\mathrm{KL}>-\\infty$ toujours.

**Thm 4.1.** (i) $\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1)<+\\infty\\Rightarrow\\mathbb{P}_0\\ll\\mathbb{P}_1$ ; (ii) $\\mathrm{KL}\\in[0,+\\infty]$, nulle ssi $\\mathbb{P}_0=\\mathbb{P}_1$ ; (iii) $\\mathrm{KL}$ ne dépend pas de $\\mu$ : si $\\mathbb{P}_0\\ll\\mathbb{P}_1$, $\\mathrm{KL}(\\mathbb{P}_0,\\mathbb{P}_1)=\\int\\tilde f_0\\log\\tilde f_0\\,\\mathrm{d}\\mathbb{P}_1$ avec $\\tilde f_0=\\mathrm{d}\\mathbb{P}_0/\\mathrm{d}\\mathbb{P}_1$ (Radon-Nikodym). $\\mathrm{KL}(\\mathbb{Q}_{\\theta^\\star},\\mathbb{Q}_\\vartheta)=+\\infty$ signifie que des observations possibles sous $\\theta^\\star$ sont impossibles sous $\\vartheta$ : la vraisemblance en $\\vartheta$ est nulle avec probabilité $\\to1$ (cas de $\\mathcal{U}([0,\\theta])$ pour $\\vartheta<\\theta^\\star$, où l’hypothèse d’intégrabilité de la Prop. 1.3 échoue).`,
      },
    ],
  },
]
