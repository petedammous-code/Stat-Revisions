import type { CourseSection } from '../types'

/** Sections 1 à 4 : intuition et notations, M- et Z-estimateurs, consistance, outils mathématiques. */
export const coursePart1: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 1. Intuition et notations
  // -------------------------------------------------------------------------
  {
    id: 'ch7-s1-intuition',
    title: '1. Intuition et notations : des estimateurs définis par un problème d’optimisation',
    role: 'intuition',
    intro:
      'Au chapitre 6, l’estimateur était une **fonction explicite** d’une moyenne empirique ; LGN, TCL, continuité et méthode-δ suffisaient. Ici l’estimateur n’a en général **pas d’expression** : il maximise une fonction aléatoire (M-estimateur, EMV) ou annule une équation aléatoire (Z-estimateur, médiane). On établit consistance et normalité asymptotique à partir d’hypothèses sur la **fonction** $m$ ou $\\psi$, et non sur l’estimateur.',
    blocks: [
      {
        kind: 'text',
        id: 'ch7-s1-deux-courbes',
        title: 'L’image des « deux courbes » (Poly ch.7, introduction p. 7–8)',
        text: `Le M-estimateur maximise $\\theta\\mapsto\\frac1n\\sum_{i=1}^n m(\\theta,X_i)$ ; le Z-estimateur annule $\\theta\\mapsto\\frac1n\\sum_{i=1}^n\\psi(\\theta,X_i)$. Ces fonctions de $\\theta$ sont **aléatoires**. La LGN dit qu’elles s’approchent, **en chaque point** $\\theta$, d’une fonction déterministe maximale (ou nulle) en la vraie valeur. Il reste à passer de la convergence des **fonctions** à celle de leurs **points de maximum / zéros**.

Deux courbes : la courbe limite, avec un pic en $\\theta^\\star$, et la courbe empirique qui oscille autour. Si l’oscillation est **partout** petite et que le pic est **franc**, le sommet empirique est proche de $\\theta^\\star$ ; si la courbe limite est presque plate près de son maximum, le sommet empirique peut dériver loin. (« L’image des deux courbes est une image : la démonstration n’y recourt pas. »)

Plan du chapitre :

- **consistance** = convergence **uniforme** + caractère **isolé** du maximum / du zéro (§3) ;
- **loi limite** = développement au premier ordre de l’équation d’estimation : TCL au numérateur, LGN au dénominateur, Slutsky (§5) ; variance $\\mathbb{E}_\\theta[\\psi^2]/(\\mathbb{E}_\\theta[\\psi'])^2$ ;
- pour la vraisemblance, elle vaut $1/\\mathbb{I}(\\theta)$, et **Cauchy-Schwarz** montre que l’EMV est asymptotiquement optimal parmi les Z-estimateurs (§6–7) ;
- illustrations : Cauchy (médiane contre EMV), Pareto (perte de la vitesse $\\sqrt n$ et de la gaussianité hors régularité).`,
      },
      {
        kind: 'viz',
        id: 'ch7-s1-viz-courbes',
        vizId: 'ch7-criteres-empiriques',
        caption: 'Les « deux courbes » : $\\theta\\mapsto\\widehat{M}_n(\\theta)$ (aléatoire) et $\\theta\\mapsto\\mathsf{M}_{\\theta^\\star}(\\theta)$ (déterministe). Faites croître $n$ et observez l’écart uniforme et le point de maximum.',
      },
      {
        kind: 'text',
        id: 'ch7-s1-notations',
        title: 'Notations du poly (§1.1, p. 9) — à reproduire telles quelles',
        text: `- **Expérience à une observation** $(\\mathsf{X},\\mathcal{X},\\{\\mathbb{Q}_\\theta:\\theta\\in\\Theta\\})$, $\\Theta\\subseteq\\mathbb{R}^d$ ; **expérience produit** $(\\mathsf{X}^n,\\mathcal{X}^{\\otimes n},\\{\\mathbb{P}_{n,\\theta}:\\theta\\in\\Theta\\})$ avec $\\mathbb{P}_{n,\\theta}:=\\mathbb{Q}_\\theta^{\\otimes n}$ ; statistiques canoniques $X_i:(x_1,\\dots,x_n)\\mapsto x_i$, i.i.d. de loi $\\mathbb{Q}_\\theta$ sous $\\mathbb{P}_{n,\\theta}$ ; $Z_n:=(X_1,\\dots,X_n)$.
- **Deux espérances** : $\\mathbb{E}_\\theta$ sous $\\mathbb{Q}_\\theta$ et $\\mathbb{E}_{n,\\theta}$ sous $\\mathbb{P}_{n,\\theta}$ (elles coïncident sur les fonctions d’une seule observation) ; notation intégrale $\\mathbb{Q}_\\theta(f):=\\int f(x)\\,\\mathbb{Q}_\\theta(\\mathrm{d}x)$.
- **Étoile** : $\\theta^\\star$ est la valeur « vraie », sous laquelle on calcule ; $\\theta$ est la **variable muette** des fonctions qu’on maximise ou annule. Tout le calcul différentiel porte sur $\\theta$ : $\\nabla f(\\theta,x)=\\nabla_\\theta f(\\theta,x)$, et en dimension 1 $\\psi'(\\theta,x)$, $m'(\\theta,x)$, $m''(\\theta,x)$.
- **Fonctions limites** en police sans empattement : $\\mathsf{M}_{\\theta^\\star}(\\theta)$, $\\mathsf{W}_{\\theta^\\star}(\\theta)$, $\\Psi_{\\theta^\\star}(\\theta)$ (le poly écrit aussi $\\Psi$ sans empattement) ; **fonctions empiriques** avec chapeau large : $\\widehat{M}_n(\\theta)$, $\\widehat W_n(\\theta)$, $\\widehat\\Psi_n(\\theta)$, $\\widehat\\Psi_n'(\\theta)$.
- **Estimateurs** : $\\hat\\theta_n$ ; EMV $\\hat\\theta_n^{\\mathrm{MV}}$ ; médiane $\\widehat\\theta_n^{\\mathrm{med}}$ ; suites $\\{\\hat\\theta_n,\\ n\\in\\mathbb{N}\\}$.
- **Vraisemblance** : log-densité $\\ell(\\theta,x):=\\log q_\\theta(x)$, score $\\dot\\ell(\\theta,x)$ (un point), dérivée seconde $\\ddot\\ell(\\theta,x)$ (deux points), **information de Fisher en lettre ajourée** $\\mathbb{I}(\\theta)$.
- **Convergences** : en probabilité $\\xrightarrow{\\mathbb{P}_{n,\\theta^\\star}\\text{-prob}}$, en loi $\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}$ (notations du ch.6).
- **Topologie** : intérieur $\\Theta^o$, voisinage $\\mathcal{V}(\\theta^\\star)$, boule $\\mathrm{B}(\\theta,\\delta)$, diamètre $\\mathrm{diam}(\\Theta)$.
- **Hypothèses étiquetées** : (H-1)–(H-3) (Thm 1.1), (Hz-1)–(Hz-3) (Thm 1.3), (R-1)–(R-3) (Cadre 1.1).
- $\\mathrm{Ent}(q)=\\int(\\log q)\\,q\\,\\mathrm{d}\\mu$ est l’**opposé** de l’entropie de Shannon usuelle (convention du poly, Ex. 1.1).`,
      },
      {
        kind: 'text',
        id: 'ch7-s1-collisions',
        title: 'Attention aux homonymies de numérotation',
        text: `Le poly renvoie souvent à des résultats d’autres chapitres **de même numéro** qu’un résultat du ch.7. Sur ce site, on écrit toujours le chapitre :

- « TCL » = Poly **ch.6**, Thm 1.6 (≠ ch.7 Thm 1.6 = normalité de l’EMV) ;
- « lemme de Slutsky » = Poly **ch.6**, Lemme 1.1 (≠ ch.7 Lemme 1.1 = maximum isolé) ;
- « transformation continue » = Poly **ch.6**, Thm 1.4 (≠ ch.7 Thm 1.4 = normalité des Z-estimateurs) ;
- « Markov / Bienaymé-Tchebychev » = Poly **ch.6**, Lemme 2.1 (≠ ch.7 Lemme 2.1 = module de continuité) ;
- « méthode-δ » = Poly **ch.6**, Thm 1.7 (≠ ch.7 Thm 1.7 = optimalité de l’EMV) ;
- « modèle régulier » = Poly **ch.3**, Déf. 1.6 (réécrit ici en Cadre 1.1) ; Kullback-Leibler et sa positivité = Poly **ch.2**.`,
      },
      {
        kind: 'text',
        id: 'ch7-s1-rappels-tests',
        title: 'Rappels du ch.6 sur les tests asymptotiques (§1.2, p. 9)',
        text: `Pour $H_0:\\theta\\in\\Theta_0$ contre $H_1:\\theta\\in\\Theta_1$ et une suite de tests $\\{\\phi_n\\}$ de fonctions puissance $\\beta_{\\phi_n}$ : taille asymptotique $\\sup_{\\theta\\in\\Theta_0}\\limsup_n\\beta_{\\phi_n}(\\theta)$ ; niveau asymptotique $\\alpha$ si $\\limsup_n\\beta_{\\phi_n}(\\theta)\\le\\alpha$ sur $\\Theta_0$ ; consistance si $\\liminf_n\\beta_{\\phi_n}(\\theta)=1$ sur $\\Theta_1$ (Poly ch.6, Déf. 1.9–1.11). Le test de Student asymptotique est consistant de niveau asymptotique $\\alpha$ dès que le second moment existe (Poly ch.6, Ex. 1.14) ; $\\sqrt n(\\hat\\sigma_n^2-\\sigma^2)\\overset{\\mathbb{P}_n}{\\Longrightarrow}\\mathcal{N}(0,\\gamma)$ avec $\\gamma=\\mathbb{E}[(X_1-\\mu)^4]-\\sigma^4$ (Poly ch.6, Ex. 1.6).

*Coquille signalée* : le poly (p. 9) écrit $T_n=\\sqrt n(\\bar X_n-\\mu_0)/S_n^2$ ; la statistique de Student divise par $S_n=\\sqrt{S_n^2}$.

**Ce que les outils du ch.6 ne savent pas faire** (§1.4) : calcul explicite de la loi, « LGN + continuité » sur une fonction d’une moyenne, Bienaymé-Tchebychev sur l’erreur : **aucune** de ces techniques ne s’applique à un estimateur sans forme explicite. La LGN sert encore, mais appliquée aux **fonctions** $\\widehat{M}_n$ et $\\widehat\\Psi_n$, et dans une version qui ne demande que l’intégrabilité (Thm 2.1).`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 2. M- et Z-estimateurs
  // -------------------------------------------------------------------------
  {
    id: 'ch7-s2-definitions',
    title: '2. M-estimateurs et Z-estimateurs : définitions et exemples',
    role: 'definitions',
    intro:
      'Deux façons de définir un estimateur : maximiser une moyenne empirique de fonctions objectif (Déf. 1.1) ou annuler une moyenne empirique de fonctions d’influence (Déf. 1.2). L’EMV, la moyenne, la médiane et l’estimateur de Huber entrent tous dans ce cadre.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch7-def-1-1',
        type: 'definition',
        label: 'Définition 1.1',
        title: 'M-estimateur',
        source: 'Poly ch.7, Déf. 1.1, p. 9',
        hypotheses: [
          '$m:\\Theta\\times\\mathsf{X}\\to\\mathbb{R}$ mesurable (« fonction objectif »).',
          'Pour tous $\\theta,\\theta^\\star\\in\\Theta$ : $\\mathbb{E}_{\\theta^\\star}[|m(\\theta,X_1)|]<\\infty$.',
          'Pour tout $\\theta^\\star\\in\\Theta$, $\\theta\\mapsto\\mathsf{M}_{\\theta^\\star}(\\theta):=\\mathbb{E}_{\\theta^\\star}[m(\\theta,X_1)]$ admet un maximum au point $\\theta=\\theta^\\star$.',
        ],
        statement: `On appelle **M-estimateur associé à $m$** toute suite d’estimateurs $\\{\\hat\\theta_n,\\ n\\in\\mathbb{N}\\}$ à valeurs dans $\\Theta$ telle que

$$\\widehat{M}_n(\\hat\\theta_n)=\\max_{\\theta\\in\\Theta}\\widehat{M}_n(\\theta),\\qquad\\widehat{M}_n(\\theta):=\\frac1n\\sum_{i=1}^n m(\\theta,X_i).$$`,
        intuition: '$\\widehat{M}_n$ est une **fonction aléatoire** (elle dépend de $Z_n$) : c’est la suite de ces fonctions, et non une suite de nombres, qu’il faut contrôler. $\\widehat{M}_n(\\theta)$ est la version empirique (moyenne) de l’espérance $\\mathsf{M}_{\\theta^\\star}(\\theta)$.',
        pitfalls: [
          'La condition « maximum en $\\theta^\\star$ » porte sur la fonction **limite**, pour **tout** $\\theta^\\star$ : c’est une propriété de $m$ vis-à-vis du modèle, pas de l’échantillon.',
          'L’unicité du maximum n’est pas demandée ici ; elle (et plus : l’isolement) intervient en (H-2).',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch7-def-1-2',
        type: 'definition',
        label: 'Définition 1.2',
        title: 'Z-estimateur',
        source: 'Poly ch.7, Déf. 1.2, p. 10',
        hypotheses: [
          '$\\psi:\\Theta\\times\\mathsf{X}\\to\\mathbb{R}^d$ mesurable (« fonction d’influence »), autant d’équations que d’inconnues.',
          'Pour tous $\\theta,\\theta^\\star$ : $\\mathbb{E}_{\\theta^\\star}[\\|\\psi(\\theta,X_1)\\|]<\\infty$.',
          'Pour tout $\\theta^\\star$, $\\theta\\mapsto\\Psi_{\\theta^\\star}(\\theta):=\\mathbb{E}_{\\theta^\\star}[\\psi(\\theta,X_1)]$ s’annule en $\\theta=\\theta^\\star$ (**centrage**).',
        ],
        statement: `On appelle **Z-estimateur associé à $\\psi$** toute suite $\\{\\hat\\theta_n\\}$ à valeurs dans $\\Theta$ telle que

$$\\widehat\\Psi_n(\\hat\\theta_n)=0,\\qquad\\widehat\\Psi_n(\\theta):=\\frac1n\\sum_{i=1}^n\\psi(\\theta,X_i).$$`,
        intuition: '« Z » pour *zero* : on résout la version empirique de l’équation $\\Psi_{\\theta^\\star}(\\theta)=0$ satisfaite par la vraie valeur. La méthode des moments en est un cas particulier.',
        pitfalls: ['Le **centrage** $\\Psi_{\\theta^\\star}(\\theta^\\star)=0$ est essentiel : c’est lui qui rend centré le TCL du numérateur de l’identité (3).', 'Un zéro peut ne pas exister (médiane : $\\psi$ discontinue) ou ne pas être unique (médiane avec $n$ pair) : PC7 Ex. 5 Q1 utilise un « zéro généralisé » (changement de signe).'],
      },
      {
        kind: 'example',
        id: 'ch7-ex-1-1',
        title: 'Exemple 1.1 — L’EMV est un M-estimateur',
        source: 'Poly ch.7, Ex. 1.1, p. 10',
        setup: 'Modèle dominé $\\mathbb{Q}_\\theta=q_\\theta\\cdot\\mu$ avec $q_\\theta(x)>0$ pour tout $(\\theta,x)$ ; $m(\\theta,x):=\\log q_\\theta(x)$ ; les intégrales ci-dessous sont supposées finies. Montrer que $\\mathsf{M}_{\\theta^\\star}$ est maximale en $\\theta^\\star$.',
        steps: [
          {
            text: '$\\log q_\\theta=\\log q_{\\theta^\\star}+\\log(q_\\theta/q_{\\theta^\\star})$.',
            justification: 'Licite car $q_\\theta>0$ partout.',
          },
          {
            text: '$\\mathsf{M}_{\\theta^\\star}(\\theta)=\\mathbb{E}_{\\theta^\\star}[\\log q_{\\theta^\\star}(X_1)]+\\mathbb{E}_{\\theta^\\star}\\Big[\\log\\frac{q_\\theta(X_1)}{q_{\\theta^\\star}(X_1)}\\Big]=\\int(\\log q_{\\theta^\\star})\\,q_{\\theta^\\star}\\,\\mathrm{d}\\mu-\\int\\log\\Big(\\frac{q_{\\theta^\\star}}{q_\\theta}\\Big)q_{\\theta^\\star}\\,\\mathrm{d}\\mu$.',
            justification: 'Linéarité de l’espérance sous $\\mathbb{Q}_{\\theta^\\star}$ (intégrales finies).',
          },
          {
            text: '$\\mathsf{M}_{\\theta^\\star}(\\theta)=\\mathrm{Ent}(q_{\\theta^\\star})-\\mathrm{KL}(q_{\\theta^\\star},q_\\theta)$.',
            justification: 'Définition de la divergence de Kullback-Leibler (Poly ch.2, Déf. 1.7).',
          },
          {
            text: 'Le premier terme ne dépend pas de $\\theta$ et $\\mathrm{KL}\\ge0$ : le maximum est atteint en $\\theta=\\theta^\\star$, **unique** si le modèle est identifiable.',
            justification: 'Positivité de KL (Poly ch.2, Thm 1.1) ; $\\mathrm{KL}(q_{\\theta^\\star},q_\\theta)=0\\iff\\theta=\\theta^\\star$ sous identifiabilité.',
          },
        ],
        conclusion: 'Comme $\\widehat{M}_n(\\theta)=\\frac1n\\sum_i\\log q_\\theta(X_i)$, le M-estimateur associé est l’EMV : $\\hat\\theta_n^{\\mathrm{MV}}\\in\\argmax_{\\theta}\\widehat{M}_n(\\theta)$. Maximiser la vraisemblance moyenne revient asymptotiquement à **minimiser la divergence KL** à la vraie loi. La condition $q_\\theta>0$ partout exclut les modèles dont le support dépend de $\\theta$ (Ex. 1.10).',
      },
      {
        kind: 'example',
        id: 'ch7-ex-1-2-1-3',
        title: 'Exemples 1.2 et 1.3 — La moyenne empirique est à la fois Z- et M-estimateur',
        source: 'Poly ch.7, Ex. 1.2 et 1.3, p. 10–11 (Figure 1)',
        setup: 'Modèle de translation : $q$ densité sur $\\mathbb{R}$ avec $\\int xq(x)\\,\\mathrm{d}x=0$ et $\\int x^2q(x)\\,\\mathrm{d}x<\\infty$, $q_\\theta(x):=q(x-\\theta)$, $\\Theta=\\mathbb{R}$. On considère $\\psi(\\theta,x):=x-\\theta$ et $m(\\theta,x):=-\\frac12(x-\\theta)^2$.',
        steps: [
          {
            text: '$\\mathbb{E}_\\theta[X_1]=\\int xq(x-\\theta)\\,\\mathrm{d}x=\\theta$, donc $\\Psi_{\\theta^\\star}(\\theta)=\\theta^\\star-\\theta$, qui ne s’annule qu’en $\\theta^\\star$.',
            justification: 'Changement de variable $x\\mapsto x-\\theta$ et $\\int xq=0$.',
          },
          {
            text: '$\\widehat\\Psi_n(\\theta)=\\bar X_n-\\theta$ a l’unique zéro $\\hat\\theta_n=\\bar X_n$ : Z-estimateur (Ex. 1.2).',
            justification: 'Résolution directe de l’équation d’estimation empirique.',
          },
          {
            text: '$\\mathsf{M}_{\\theta^\\star}(\\theta)=-\\frac12\\int(x+\\theta^\\star-\\theta)^2q(x)\\,\\mathrm{d}x=-\\frac12\\int x^2q(x)\\,\\mathrm{d}x-\\frac12(\\theta^\\star-\\theta)^2$.',
            justification: 'Changement de variable $x\\mapsto x+\\theta^\\star$, développement du carré : le terme croisé $(\\theta^\\star-\\theta)\\int xq$ est nul.',
          },
          {
            text: 'Maximum au seul point $\\theta^\\star$ ; $\\widehat{M}_n(\\theta)=-\\frac1{2n}\\sum_k(X_k-\\theta)^2$ est strictement concave, de maximum $\\bar X_n$ : M-estimateur (Ex. 1.3).',
            justification: 'Lecture directe ; dérivée de $\\widehat{M}_n$ nulle en $\\bar X_n$, dérivée seconde $-1<0$.',
          },
        ],
        conclusion: 'Ce n’est pas un hasard : $\\psi=\\partial_\\theta m$, et annuler la dérivée d’une fonction strictement concave revient à la maximiser (Prop. 1.1). **Figure 1** du poly ($\\mathcal{N}(\\theta,1)$, $\\theta^\\star=2$) : courbe limite bleue, courbes empiriques noires pour trois $n$, points de maximum rouges. Le choix $m=-(x-\\theta)^2$ suppose un moment d’ordre 2.',
      },
      {
        kind: 'example',
        id: 'ch7-ex-1-4',
        title: 'Exemple 1.4 — Translation sans moment d’ordre deux : Huber, arctan, signe',
        source: 'Poly ch.7, Ex. 1.4, p. 11–12 (Figure 2)',
        setup: 'Cadre de l’Ex. 1.2 mais $\\int x^2q(x)\\,\\mathrm{d}x=+\\infty$, et $q$ **symétrique** : $q(x)=q(-x)$. La moyenne n’est plus utilisable (pas de normalité asymptotique, voire pas de LGN).',
        steps: [
          {
            text: 'Perte de Huber (M-estimateur), $\\delta>0$ : $m(\\theta,x)=-\\delta^2\\Big(\\sqrt{1+\\{(\\theta-x)/\\delta\\}^2}-1\\Big)$, quadratique près de 0, linéaire à l’infini.',
            justification: 'Forme lisse (« pseudo-Huber ») appelée « perte de Huber » dans le poly ; dérivée bornée en $x$.',
          },
          {
            text: 'Fonctions d’influence bornées (Z-estimateurs) : $\\psi(\\theta,x)=\\arctan(x-\\theta)$ et $\\psi(\\theta,x)=\\operatorname{signe}(x-\\theta)$ ; la seconde donne la **médiane empirique**.',
            justification: 'Bornées en $x$ : l’intégrabilité est assurée quelles que soient les queues de $q$.',
          },
          {
            text: 'Centrage : $\\Psi_{\\theta^\\star}(\\theta^\\star)=\\int\\psi(\\theta^\\star,x)q(x-\\theta^\\star)\\,\\mathrm{d}x=\\int\\gamma(u)q(u)\\,\\mathrm{d}u=0$ pour $\\psi(\\theta,x)=\\gamma(x-\\theta)$, $\\gamma$ impaire.',
            justification: 'Justification implicite du poly : $\\gamma q$ est impaire (imparité de $\\gamma$, symétrie de $q$) et intégrable.',
          },
        ],
        conclusion: '**Point de départ de la statistique robuste.** La PC7 Ex. 5 étudie la famille $\\psi(\\theta,x)=\\gamma(x-\\theta)$, $\\gamma$ impaire croissante : $\\gamma_0=\\operatorname{signe}$ (médiane), $\\gamma_\\infty(x)=x$ (moyenne), $\\gamma_k$ (Huber tronquée). Attention : $\\operatorname{signe}$ n’est **pas** dérivable : le Thm 1.4 ne s’applique pas à la médiane.',
      },
      {
        kind: 'viz',
        id: 'ch7-s2-viz-z',
        vizId: 'ch7-z-estimateur',
        caption: 'Fonctions d’influence en action : $\\theta\\mapsto\\widehat\\Psi_n(\\theta)$ pour $\\psi=\\gamma(x-\\theta)$ (signe, identité, Huber, arctan) et son zéro, avec la courbe limite $\\Psi_{\\theta^\\star}$.',
      },
      {
        kind: 'theorem',
        id: 'ch7-prop-1-1',
        type: 'proposition',
        label: 'Proposition 1.1',
        title: 'Un M-estimateur régulier est un Z-estimateur',
        source: 'Poly ch.7, Prop. 1.1, p. 12',
        hypotheses: [
          'Pour tout $x\\in\\mathsf{X}$, $\\theta\\mapsto m(\\theta,x)$ est différentiable sur $\\Theta^o$ ; on pose $\\psi(\\theta,x):=\\nabla m(\\theta,x)$.',
          '$\\theta\\mapsto\\widehat{M}_n(\\theta)$ atteint son maximum en un point $\\hat\\theta_n\\in\\Theta^o$ (**intérieur**).',
        ],
        statement: '$$\\widehat\\Psi_n(\\hat\\theta_n)=\\frac1n\\sum_{i=1}^n\\nabla m(\\hat\\theta_n,X_i)=\\nabla\\widehat{M}_n(\\hat\\theta_n)=0,$$\n\nc’est-à-dire que $\\hat\\theta_n$ est un Z-estimateur associé à $\\psi=\\nabla m$.',
        intuition: 'Maximiser une fonction régulière, c’est (au point de maximum intérieur) annuler son gradient.',
        proof: [
          {
            text: '$\\nabla\\widehat{M}_n(\\theta)=\\frac1n\\sum_{i=1}^n\\nabla m(\\theta,X_i)=\\widehat\\Psi_n(\\theta)$.',
            justification: 'Différentiation terme à terme d’une somme finie.',
          },
          {
            text: '$\\nabla\\widehat{M}_n(\\hat\\theta_n)=0$.',
            justification: 'Condition du premier ordre : le gradient d’une fonction différentiable s’annule en tout point **intérieur** où elle atteint un maximum.',
          },
        ],
        pitfalls: [
          '**La réciproque est fausse** et les deux classes ne sont pas comparables : (a) si $m$ n’est pas régulière, un M-estimateur n’est pas un Z-estimateur (EMV du support d’une loi uniforme, vraisemblance non dérivable, Poly ch.2) ; (b) si $\\widehat\\Psi_n=0$ a plusieurs solutions, celles qui sont des minima locaux ou des points selle ne maximisent pas $\\widehat{M}_n$.',
          'Le maximum doit être **intérieur** : un EMV atteint au bord (PC7 Ex. 4, $\\hat\\theta_n=0$ quand $\\bar X_n<0$) n’annule pas le score.',
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 3. Consistance
  // -------------------------------------------------------------------------
  {
    id: 'ch7-s3-consistance',
    title: '3. Consistance : convergence uniforme et maximum isolé',
    role: 'preuves',
    intro:
      'À $\\theta^\\star$ et $\\theta$ fixés, la LGN donne $\\widehat{M}_n(\\theta)\\to\\mathsf{M}_{\\theta^\\star}(\\theta)$ en probabilité. Il est tentant d’en conclure $\\hat\\theta_n\\to\\theta^\\star$ : c’est **incomplet**. La convergence est simple (un $\\theta$ à la fois) : rien n’empêche $\\widehat{M}_n$ de prendre, loin de $\\theta^\\star$, des valeurs plus grandes que $\\widehat{M}_n(\\theta^\\star)$ sur des événements de probabilité ne tendant pas vers 0. Le Thm 1.1 remplace la convergence simple par une convergence **uniforme** et exige que le maximum limite soit **isolé**.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch7-thm-1-1',
        type: 'theoreme',
        label: 'Théorème 1.1',
        title: 'Consistance des M-estimateurs (cas général)',
        source: 'Poly ch.7, Thm 1.1, p. 13–14',
        hypotheses: [
          'Pour tout $n$, $\\theta\\mapsto\\widehat{M}_n(\\theta)$ est une fonction aléatoire sur $\\Theta$ ; pour tout $\\theta^\\star$, $\\theta\\mapsto\\mathsf{M}_{\\theta^\\star}(\\theta)$ est mesurable.',
          '**(H-1)** Pour tout $\\theta^\\star\\in\\Theta$ : $\\sup_{\\theta\\in\\Theta}|\\widehat{M}_n(\\theta)-\\mathsf{M}_{\\theta^\\star}(\\theta)|\\xrightarrow{\\mathbb{P}_{n,\\theta^\\star}\\text{-prob}}0$ (convergence **uniforme**).',
          '**(H-2)** Pour tout $\\theta^\\star$ et tout $\\varepsilon>0$ : $\\sup_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\mathsf{M}_{\\theta^\\star}(\\theta)<\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)$ (maximum **isolé**).',
          '**(H-3)** $\\{\\hat\\theta_n\\}$ est à valeurs dans $\\Theta$ et $\\widehat{M}_n(\\hat\\theta_n)\\ge\\widehat{M}_n(\\theta)$ pour tout $\\theta\\in\\Theta$.',
        ],
        statement: 'La suite $\\{\\hat\\theta_n\\}$ est consistante : pour tout $\\theta^\\star\\in\\Theta$ et tout $\\varepsilon>0$,\n\n$$\\lim_{n\\to\\infty}\\mathbb{P}_{n,\\theta^\\star}\\big(\\|\\hat\\theta_n-\\theta^\\star\\|>\\varepsilon\\big)=0.$$',
        intuition: 'L’écart uniforme contrôle la **perte de valeur** de la fonction limite au point estimé ; la marge $\\eta$ (maximum isolé) transforme une petite perte de valeur en petite **distance** à $\\theta^\\star$. L’énoncé vaut pour des fonctions aléatoires quelconques, le cas « moyenne empirique / espérance » en est un cas particulier.',
        proof: [
          {
            text: 'Soient $\\theta^\\star$ et $\\varepsilon>0$. Poser $\\eta:=\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)-\\sup_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\mathsf{M}_{\\theta^\\star}(\\theta)>0$ ; alors $\\mathsf{M}_{\\theta^\\star}(\\theta)\\le\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)-\\eta$ dès que $\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon$.',
            justification: '(H-2) : la marge $\\eta$ est strictement positive.',
          },
          {
            text: '$\\{\\|\\hat\\theta_n-\\theta^\\star\\|\\ge\\varepsilon\\}\\subseteq\\{\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)-\\mathsf{M}_{\\theta^\\star}(\\hat\\theta_n)\\ge\\eta\\}$.',
            justification: 'Étape précédente appliquée à $\\theta=\\hat\\theta_n$, licite car $\\hat\\theta_n\\in\\Theta$ (H-3).',
          },
          {
            text: '$\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)-\\mathsf{M}_{\\theta^\\star}(\\hat\\theta_n)=\\underbrace{\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)-\\widehat{M}_n(\\theta^\\star)}_{(a)}+\\underbrace{\\widehat{M}_n(\\theta^\\star)-\\widehat{M}_n(\\hat\\theta_n)}_{(b)}+\\underbrace{\\widehat{M}_n(\\hat\\theta_n)-\\mathsf{M}_{\\theta^\\star}(\\hat\\theta_n)}_{(c)}$, et ce terme est $\\ge0$.',
            justification: 'Ajout et retrait de $\\widehat{M}_n(\\theta^\\star)$ et $\\widehat{M}_n(\\hat\\theta_n)$ ; positivité car $\\mathsf{M}_{\\theta^\\star}$ est maximale en $\\theta^\\star$.',
          },
          {
            text: '$(b)\\le0$, et $(a),(c)\\le\\sup_\\theta|\\widehat{M}_n(\\theta)-\\mathsf{M}_{\\theta^\\star}(\\theta)|$, d’où $0\\le\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)-\\mathsf{M}_{\\theta^\\star}(\\hat\\theta_n)\\le2\\sup_\\theta|\\widehat{M}_n(\\theta)-\\mathsf{M}_{\\theta^\\star}(\\theta)|$.',
            justification: '(H-3) pour $(b)$ ; majoration de chaque écart ponctuel par l’écart uniforme pour $(a)$ et $(c)$.',
          },
          {
            text: '$\\mathbb{P}_{n,\\theta^\\star}(\\|\\hat\\theta_n-\\theta^\\star\\|\\ge\\varepsilon)\\le\\mathbb{P}_{n,\\theta^\\star}\\big(\\sup_\\theta|\\widehat{M}_n(\\theta)-\\mathsf{M}_{\\theta^\\star}(\\theta)|\\ge\\eta/2\\big)\\xrightarrow[n\\to\\infty]{}0$.',
            justification: 'Inclusion des étapes 2 et 4, croissance de la probabilité, puis (H-1) avec le seuil $\\eta/2$.',
          },
        ],
        pitfalls: [
          '(H-2) n’est **pas** l’unicité du maximum : sur un non-compact, une suite $\\theta_k\\to\\infty$ avec $\\mathsf{M}_{\\theta^\\star}(\\theta_k)\\to\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)$ casse (H-2) bien que le maximum soit unique.',
          '(H-1) et (H-2) ne sont pas vérifiables directement : on utilise le Thm 1.2 (pour (H-1)) et le Lemme 1.1 (pour (H-2)), réunis dans le Cor. 1.1.',
          'Complément (encadré p. 14, hors programme) : en pratique $\\hat\\theta_n$ n’est qu’un maximum **approché** ; le Thm 4.1 affaiblit (H-3).',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch7-thm-1-2',
        type: 'theoreme',
        label: 'Théorème 1.2',
        title: 'Loi des grands nombres uniforme',
        source: 'Poly ch.7, Thm 1.2, p. 14–15',
        hypotheses: [
          '$K$ sous-ensemble **compact** de $\\mathbb{R}^d$, $\\Theta\\subseteq K$, $\\phi:K\\times\\mathsf{X}\\to\\mathbb{R}$.',
          '(i) Pour tout $x\\in\\mathsf{X}$, $\\theta\\mapsto\\phi(\\theta,x)$ est **continue** sur $K$.',
          '(ii) Pour tout $\\theta^\\star\\in\\Theta$, $\\int\\sup_{\\theta\\in K}|\\phi(\\theta,x)|\\,\\mathbb{Q}_{\\theta^\\star}(\\mathrm{d}x)<\\infty$ (domination **uniforme** : le sup est **dans** l’intégrale).',
        ],
        statement: 'Avec $\\widehat W_n(\\theta):=\\frac1n\\sum_{i=1}^n\\phi(\\theta,X_i)$ et $\\mathsf{W}_{\\theta^\\star}(\\theta):=\\mathbb{E}_{\\theta^\\star}[\\phi(\\theta,X_1)]$, pour tout $\\theta^\\star\\in\\Theta$ :\n\n$$\\sup_{\\theta\\in K}\\big|\\widehat W_n(\\theta)-\\mathsf{W}_{\\theta^\\star}(\\theta)\\big|\\xrightarrow{\\mathbb{P}_{n,\\theta^\\star}\\text{-prob}}0.$$',
        intuition: 'Condition suffisante pour (H-1) quand $\\widehat{M}_n$ est une moyenne empirique, « à condition que l’espace des paramètres soit compact ». La compacité sert **deux fois** : recouvrement fini par des boules de rayon $\\delta$ (un sup sur un continuum devient un max sur une liste finie) et théorème de Heine (continuité uniforme, d’où un module de continuité qui tend vers 0).',
        proof: [
          {
            text: 'Soit $\\varepsilon>0$. Module de continuité $w_\\delta(x):=\\sup_{\\theta,\\vartheta\\in K,\\ \\|\\theta-\\vartheta\\|\\le\\delta}|\\phi(\\theta,x)-\\phi(\\vartheta,x)|$ ; fixer $\\delta>0$ tel que $\\int w_\\delta\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}\\le\\varepsilon/4$.',
            justification: 'Lemme 2.1 (Outils) : sous (i)–(ii), $\\int w_\\delta\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}\\to0$ quand $\\delta\\to0^+$, et $\\mathsf{W}_{\\theta^\\star}$ est continue.',
          },
          {
            text: 'Il existe $\\theta^{(1)},\\dots,\\theta^{(L)}\\in K$ avec $K\\subseteq\\bigcup_{\\ell=1}^L\\mathrm{B}(\\theta^{(\\ell)},\\delta)$ ; alors $\\sup_K|\\widehat W_n-\\mathsf{W}_{\\theta^\\star}|=\\max_{\\ell\\le L}\\sup_{\\theta\\in\\mathrm{B}(\\theta^{(\\ell)},\\delta)\\cap K}|\\widehat W_n(\\theta)-\\mathsf{W}_{\\theta^\\star}(\\theta)|$.',
            justification: 'Compacité de $K$ : recouvrement fini (Borel-Lebesgue).',
          },
          {
            text: 'Pour $\\theta\\in\\mathrm{B}(\\theta^{(\\ell)},\\delta)\\cap K$ : $|\\widehat W_n(\\theta)-\\mathsf{W}_{\\theta^\\star}(\\theta)|\\le|\\widehat W_n(\\theta)-\\widehat W_n(\\theta^{(\\ell)})|+|\\widehat W_n(\\theta^{(\\ell)})-\\mathsf{W}_{\\theta^\\star}(\\theta^{(\\ell)})|+|\\mathsf{W}_{\\theta^\\star}(\\theta^{(\\ell)})-\\mathsf{W}_{\\theta^\\star}(\\theta)|$.',
            justification: 'Inégalité triangulaire.',
          },
          {
            text: 'Troisième terme : $\\le\\mathbb{E}_{\\theta^\\star}[|\\phi(\\theta^{(\\ell)},X_1)-\\phi(\\theta,X_1)|]\\le\\mathbb{E}_{\\theta^\\star}[w_\\delta(X_1)]\\le\\varepsilon/4$.',
            justification: 'Inégalité de Jensen $|\\mathbb{E}[\\cdot]|\\le\\mathbb{E}[|\\cdot|]$, puis définition de $w_\\delta$ (car $\\|\\theta-\\theta^{(\\ell)}\\|\\le\\delta$) ; terme sans aléa.',
          },
          {
            text: 'Premier terme : $\\le\\frac1n\\sum_{i=1}^nw_\\delta(X_i)$ (indépendant de $\\ell$) ; comme $\\frac1n\\sum_iw_\\delta(X_i)\\to\\mathbb{E}_{\\theta^\\star}[w_\\delta(X_1)]\\le\\varepsilon/4$ en probabilité, $\\mathbb{P}_{n,\\theta^\\star}(\\frac1n\\sum_iw_\\delta(X_i)\\ge\\varepsilon/2)\\to0$.',
            justification: 'Définition de $w_\\delta$ ; les $w_\\delta(X_i)$ sont i.i.d. intégrables ($w_\\delta\\le2\\sup_K|\\phi|$, (ii)) : LGN faible pour variables intégrables (Thm 2.1).',
          },
          {
            text: 'Second terme : $\\max_{\\ell\\le L}|\\widehat W_n(\\theta^{(\\ell)})-\\mathsf{W}_{\\theta^\\star}(\\theta^{(\\ell)})|\\to0$ en probabilité.',
            justification: 'LGN (Thm 2.1) en chacun des $L$ points, nombre **fini** : le max de $L$ suites qui tendent vers 0 en probabilité y tend aussi (sous-additivité).',
          },
          {
            text: '$\\mathbb{P}_{n,\\theta^\\star}\\big(\\sup_K|\\widehat W_n-\\mathsf{W}_{\\theta^\\star}|\\ge\\varepsilon\\big)\\le\\mathbb{P}_{n,\\theta^\\star}\\big(\\frac1n\\sum_iw_\\delta(X_i)\\ge\\frac\\varepsilon2\\big)+\\mathbb{P}_{n,\\theta^\\star}\\big(\\max_\\ell|\\widehat W_n(\\theta^{(\\ell)})-\\mathsf{W}_{\\theta^\\star}(\\theta^{(\\ell)})|\\ge\\frac\\varepsilon4\\big)\\to0$.',
            justification: 'Rassemblement : les trois termes sont $<\\varepsilon/2$, $<\\varepsilon/4$ et $\\le\\varepsilon/4$ hors de deux événements de probabilité $\\to0$.',
          },
        ],
        pitfalls: [
          '(ii) est une domination **uniforme** ($\\int\\sup_K|\\phi|<\\infty$), plus forte que $\\sup_K\\int|\\phi|<\\infty$.',
          'Sans compacité, le nombre de boules explose et le contrôle de l’intérieur des boules tombe (voir Thm 4.2 pour un substitut, hors programme).',
          'Le poly note $\\phi$ (phi droit) la fonction ; ne pas confondre avec les tests $\\phi_n$ ni avec l’enveloppe $\\varphi$ du Lemme 2.1.',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch7-lem-1-1',
        type: 'lemme',
        label: 'Lemme 1.1',
        title: 'Maximum isolé sur un compact',
        source: 'Poly ch.7, Lemme 1.1, p. 16',
        hypotheses: [
          '$\\Theta$ compact de $\\mathbb{R}^d$.',
          '(i) Pour tout $\\theta^\\star$, $\\theta\\mapsto\\mathsf{M}_{\\theta^\\star}(\\theta)$ est continue sur $\\Theta$.',
          '(ii) Pour tout $\\theta\\ne\\theta^\\star$ : $\\mathsf{M}_{\\theta^\\star}(\\theta)<\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)$.',
        ],
        statement: 'L’hypothèse (H-2) du Thm 1.1 est vérifiée.',
        intuition: 'Sur un compact, « maximum unique » + continuité ⇒ « maximum isolé » : la compacité empêche le sup d’être approché à l’infini.',
        proof: [
          { text: '$\\Theta\\setminus\\mathrm{B}(\\theta^\\star,\\varepsilon)$ est compact.', justification: 'Fermé dans le compact $\\Theta$.' },
          { text: 'S’il est vide, $\\sup_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\mathsf{M}_{\\theta^\\star}(\\theta)=-\\infty<\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)$.', justification: 'Convention $\\sup\\emptyset=-\\infty$ : rien à démontrer.' },
          {
            text: 'Sinon, $\\mathsf{M}_{\\theta^\\star}$ y atteint son maximum en un $\\theta_\\varepsilon\\ne\\theta^\\star$, et $\\sup_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\mathsf{M}_{\\theta^\\star}(\\theta)=\\mathsf{M}_{\\theta^\\star}(\\theta_\\varepsilon)<\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)$.',
            justification: 'Théorème des bornes atteintes (fonction continue sur un compact), puis (ii).',
          },
        ],
        pitfalls: ['Sans compacité, l’unicité stricte ponctuelle n’entraîne pas (H-2).'],
      },
      {
        kind: 'theorem',
        id: 'ch7-cor-1-1',
        type: 'corollaire',
        label: 'Corollaire 1.1',
        title: 'Consistance d’un M-estimateur, cas compact',
        source: 'Poly ch.7, Cor. 1.1, p. 16',
        hypotheses: [
          '$\\Theta$ **compact** de $\\mathbb{R}^d$.',
          '(i) Pour tout $x$, $\\theta\\mapsto m(\\theta,x)$ est continue sur $\\Theta$.',
          '(ii) Pour tout $\\theta^\\star$, $\\int\\sup_{\\theta\\in\\Theta}|m(\\theta,x)|\\,\\mathbb{Q}_{\\theta^\\star}(\\mathrm{d}x)<\\infty$ (domination).',
          '(iii) Pour tous $\\theta\\ne\\theta^\\star$ : $\\mathsf{M}_{\\theta^\\star}(\\theta)<\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)$ (identifiabilité stricte).',
        ],
        statement: 'Toute suite $\\{\\hat\\theta_n\\}$ de M-estimateurs associés à $m$ (Déf. 1.1) est consistante.',
        intuition: 'Énoncé « clé en main » : continuité + domination + maximum strict, sur un compact.',
        proof: [
          { text: '(i)+(ii) sont les hypothèses du Thm 1.2 avec $K=\\Theta$, $\\phi=m$ : d’où (H-1).', justification: 'Loi des grands nombres uniforme (Thm 1.2).' },
          { text: '$\\theta\\mapsto\\mathsf{M}_{\\theta^\\star}(\\theta)$ est continue ; avec (iii), (H-2) est vérifiée.', justification: 'Lemme 2.1 (continuité par convergence dominée), puis Lemme 1.1.' },
          { text: '(H-3) est vérifiée.', justification: 'C’est la définition même d’un M-estimateur (Déf. 1.1).' },
          { text: 'Conclusion : $\\{\\hat\\theta_n\\}$ est consistante.', justification: 'Thm 1.1.' },
        ],
        pitfalls: ['La continuité de $\\mathsf{M}_{\\theta^\\star}$ n’est pas une hypothèse : elle **découle** de (i)+(ii) (Lemme 2.1).', 'Pour l’EMV : $m=\\log q_\\theta$, (iii) = identifiabilité (Ex. 1.1) ; la consistance de l’EMV en découle dès que $\\Theta$ est compact, $\\theta\\mapsto\\log q_\\theta(x)$ continue et $\\int\\sup_\\Theta|\\log q_\\theta|\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}<\\infty$ (§1.7, p. 23).'],
      },
      {
        kind: 'example',
        id: 'ch7-ex-1-5',
        title: 'Exemple 1.5 — Consistance des moindres carrés dans un modèle de translation',
        source: 'Poly ch.7, Ex. 1.5, p. 17',
        setup: 'Modèle de translation de l’Ex. 1.2 ($\\int xq=0$, $\\sigma^2:=\\int x^2q(x)\\,\\mathrm{d}x<\\infty$), $\\Theta$ **segment borné** de $\\mathbb{R}$, $m(\\theta,x):=-(x-\\theta)^2$. Vérifier (H-1)–(H-3).',
        steps: [
          {
            text: '$\\mathsf{M}_{\\theta^\\star}(\\theta)=-\\int(x-\\theta)^2q(x-\\theta^\\star)\\,\\mathrm{d}x=-\\sigma^2-(\\theta^\\star-\\theta)^2$ ; $\\widehat{M}_n(\\theta)=-\\frac1n\\sum_i(X_i-\\theta)^2$ a l’unique maximum $\\bar X_n$.',
            justification: 'Calcul de l’Ex. 1.3 (au facteur $\\frac12$ près) ; parabole strictement concave.',
          },
          {
            text: '$\\widehat{M}_n(\\theta)-\\mathsf{M}_{\\theta^\\star}(\\theta)=-\\Big\\{\\frac1n\\sum_{i=1}^n(X_i-\\theta^\\star)^2-\\sigma^2\\Big\\}+2(\\theta-\\theta^\\star)\\Big\\{\\frac1n\\sum_{i=1}^nX_i-\\theta^\\star\\Big\\}$.',
            justification: 'Écrire $X_i-\\theta=(X_i-\\theta^\\star)+(\\theta^\\star-\\theta)$ et développer le carré (attention au signe $+2(\\theta-\\theta^\\star)$).',
          },
          {
            text: '$\\sup_{\\theta\\in\\Theta}|\\widehat{M}_n(\\theta)-\\mathsf{M}_{\\theta^\\star}(\\theta)|\\le\\Big|\\frac1n\\sum_i(X_i-\\theta^\\star)^2-\\sigma^2\\Big|+2\\,\\mathrm{diam}(\\Theta)\\,\\Big|\\frac1n\\sum_iX_i-\\theta^\\star\\Big|$.',
            justification: 'Inégalité triangulaire et $|\\theta-\\theta^\\star|\\le\\mathrm{diam}(\\Theta)$ : c’est le caractère **borné** de $\\Theta$ qui rend la borne uniforme.',
          },
          {
            text: 'Les deux termes tendent vers 0 en $\\mathbb{P}_{n,\\theta^\\star}$-probabilité : (H-1).',
            justification: 'Sous $\\mathbb{P}_{n,\\theta^\\star}$, les $X_i-\\theta^\\star$ sont i.i.d. de densité $q$, centrés, de variance $\\sigma^2$ : LGN faible appliquée deux fois.',
          },
          {
            text: '(H-2) et (H-3) sont vérifiées ; donc $\\{\\bar X_n\\}$ est consistante.',
            justification: '(H-2) : Lemme 1.1 ($\\mathsf{M}_{\\theta^\\star}$ continue, strictement maximale en $\\theta^\\star$ sur le compact $\\Theta$) ; (H-3) : définition de $\\hat\\theta_n$ ; conclusion par le Thm 1.1.',
          },
        ],
        conclusion: 'Le poly souligne qu’employer ici le théorème général est « évidemment maladroit » ($\\bar X_n$ est explicite et la LGN suffit) : le Thm 1.1 prend son sens quand l’estimateur **n’a pas d’expression explicite** (le cas le plus fréquent).',
      },
      {
        kind: 'theorem',
        id: 'ch7-thm-1-3',
        type: 'theoreme',
        label: 'Théorème 1.3',
        title: 'Consistance des Z-estimateurs',
        source: 'Poly ch.7, Thm 1.3, p. 17–18',
        hypotheses: [
          'Pour tout $n$, $\\theta\\mapsto\\widehat\\Psi_n(\\theta)$ fonction aléatoire à valeurs dans $\\mathbb{R}^d$ ; $\\theta\\mapsto\\Psi_{\\theta^\\star}(\\theta)$ mesurable.',
          '**(Hz-1)** Pour tout $\\theta^\\star$ : $\\sup_{\\theta\\in\\Theta}\\|\\widehat\\Psi_n(\\theta)-\\Psi_{\\theta^\\star}(\\theta)\\|\\xrightarrow{\\mathbb{P}_{n,\\theta^\\star}\\text{-prob}}0$.',
          '**(Hz-2)** Pour tout $\\theta^\\star$ : $\\Psi_{\\theta^\\star}(\\theta^\\star)=0$ et, pour tout $\\varepsilon>0$, $\\inf_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\|\\Psi_{\\theta^\\star}(\\theta)\\|>0$ (zéro **isolé**).',
          '**(Hz-3)** $\\{\\hat\\theta_n\\}$ à valeurs dans $\\Theta$ et $\\widehat\\Psi_n(\\hat\\theta_n)=0$.',
        ],
        statement: 'La suite $\\{\\hat\\theta_n\\}$ est consistante.',
        intuition: '**Annuler $\\widehat\\Psi_n$, c’est maximiser $-\\|\\widehat\\Psi_n\\|$** : $-\\|\\widehat\\Psi_n\\|\\le0$ avec égalité exactement aux zéros. Le zéro de la fonction limite doit être isolé : sa norme reste minorée hors de toute boule autour de $\\theta^\\star$.',
        proof: [
          { text: 'Poser $\\widehat{M}_n(\\theta):=-\\|\\widehat\\Psi_n(\\theta)\\|$ et $\\mathsf{M}_{\\theta^\\star}(\\theta):=-\\|\\Psi_{\\theta^\\star}(\\theta)\\|$ ; il suffit de vérifier (H-1)–(H-3).', justification: 'Réduction au Thm 1.1.' },
          {
            text: '$|\\widehat{M}_n(\\theta)-\\mathsf{M}_{\\theta^\\star}(\\theta)|=\\big|\\|\\Psi_{\\theta^\\star}(\\theta)\\|-\\|\\widehat\\Psi_n(\\theta)\\|\\big|\\le\\|\\widehat\\Psi_n(\\theta)-\\Psi_{\\theta^\\star}(\\theta)\\|$, donc (Hz-1) ⇒ (H-1).',
            justification: 'Seconde inégalité triangulaire, puis passage au sup en $\\theta$.',
          },
          {
            text: '$\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)=0$ et $\\sup_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\mathsf{M}_{\\theta^\\star}(\\theta)=-\\inf_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\|\\Psi_{\\theta^\\star}(\\theta)\\|<0$ : (H-2).',
            justification: '(Hz-2).',
          },
          { text: '$\\widehat{M}_n(\\hat\\theta_n)=0\\ge\\widehat{M}_n(\\theta)$ pour tout $\\theta$ : (H-3).', justification: '(Hz-3) et positivité de la norme.' },
          { text: 'Le Thm 1.1 conclut.', justification: 'Thm 1.1.' },
        ],
        pitfalls: [
          '(Hz-2) est plus fort que « $\\theta^\\star$ est l’unique zéro ».',
          'Remarque p. 18 : le Thm 1.2 appliqué coordonnée par coordonnée à $\\phi=\\psi_j$ donne (Hz-1) si $\\Theta$ est compact, $\\theta\\mapsto\\psi(\\theta,x)$ continue et $\\int\\sup_\\Theta\\|\\psi(\\theta,x)\\|\\,\\mathbb{Q}_{\\theta^\\star}(\\mathrm{d}x)<\\infty$.',
          'Alternative sans convergence uniforme, en dimension 1 et pour $\\psi$ monotone : l’argument de **monotonie** de la PC7 Ex. 5 (LGN en deux points $\\theta^\\star\\pm\\varepsilon$ suffit).',
        ],
      },
      {
        kind: 'example',
        id: 'ch7-ex-pc7-ex5-consistance',
        title: 'PC7 Ex. 5 Q3–Q4 — Consistance d’un Z-estimateur monotone, sans convergence uniforme',
        source: 'PC7 Ex. 5 Q1–Q4 (corrigé p. 23–24)',
        setup: '$f$ densité symétrique, $q_\\theta(x)=f(x-\\theta)$, $\\psi(\\theta,x)=\\gamma(x-\\theta)$ avec $\\gamma$ impaire, croissante, $\\lim_{-\\infty}\\gamma<0<\\lim_{+\\infty}\\gamma$, $\\int|\\gamma(x-\\theta)|f(x)\\,\\mathrm{d}x<\\infty$ (**H1**) ; $\\Psi_0$ strictement monotone sur $[-\\delta,\\delta]$ (**H2**). $\\Psi_n(\\theta):=\\frac1n\\sum_k\\gamma(X_k-\\theta)$ et $\\hat\\theta_n$ un point de changement de signe de $\\Psi_n$. Soit $\\varepsilon\\in\\,]0,\\delta[$.',
        steps: [
          {
            text: '$\\Psi_n$ est décroissante, de limites $>0$ en $-\\infty$ et $<0$ en $+\\infty$ ; donc $\\{\\hat\\theta_n<\\theta_0-\\varepsilon\\}\\subseteq\\{\\Psi_n(\\theta_0-\\varepsilon)\\le0\\}$.',
            justification: 'Somme de fonctions décroissantes de $\\theta$ ; à droite du changement de signe, $\\Psi_n\\le0$ (Q1, inclusion (8)).',
          },
          {
            text: '$\\Psi_{\\theta_0}(\\theta_0-\\varepsilon)>0$.',
            justification: '$\\Psi_{\\theta_0}(\\theta)=\\Psi_0(\\theta-\\theta_0)$ s’annule en $\\theta_0$ (imparité de $\\gamma f$, Q2) et est strictement décroissante sur $[\\theta_0-\\delta,\\theta_0+\\delta]$ (H2).',
          },
          {
            text: '$\\lim_n\\mathbb{P}_{n,\\theta_0}\\big(\\Psi_n(\\theta_0-\\varepsilon)>\\Psi_{\\theta_0}(\\theta_0-\\varepsilon)/2\\big)=1$.',
            justification: 'LGN faible pour variables i.i.d. **intégrables** (Poly ch.7, Thm 2.1) appliquée aux $\\gamma(X_k-\\theta_0+\\varepsilon)$ (H1).',
          },
          {
            text: 'Sur cet événement, $\\Psi_n(\\theta_0-\\varepsilon)>0$, donc $\\hat\\theta_n\\ge\\theta_0-\\varepsilon$ : $\\mathbb{P}_{n,\\theta_0}(\\hat\\theta_n<\\theta_0-\\varepsilon)\\to0$.',
            justification: 'Contraposée de l’inclusion de l’étape 1 ; décomposition selon $\\hat\\theta_n\\gtrless\\theta_0-\\varepsilon$.',
          },
          {
            text: 'Symétriquement $\\mathbb{P}_{n,\\theta_0}(\\hat\\theta_n>\\theta_0+\\varepsilon)\\to0$ ; d’où la consistance.',
            justification: 'Même raisonnement avec $\\Psi_{\\theta_0}(\\theta_0+\\varepsilon)<0$ et $\\{\\hat\\theta_n>\\theta_0+\\varepsilon\\}\\subseteq\\{\\Psi_n(\\theta_0+\\varepsilon)\\ge0\\}$ ; un $\\varepsilon<\\delta$ suffit.',
          },
        ],
        conclusion: 'Aucune convergence uniforme n’est nécessaire : la **monotonie** remplace (Hz-1). La LGN ne demande que l’intégrabilité : la médiane ($\\gamma_0$ bornée) est consistante même pour une loi de Cauchy, sans moment.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 4. Outils mathématiques
  // -------------------------------------------------------------------------
  {
    id: 'ch7-s4-outils',
    title: '4. Outils mathématiques : LGN intégrable, module de continuité, Taylor avec reste intégral',
    role: 'outils',
    intro: 'Section 2 du poly (p. 30–32) : les trois outils techniques utilisés dans les preuves du chapitre, et la liste des résultats admis.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch7-thm-2-1',
        type: 'theoreme',
        label: 'Théorème 2.1 (Outils)',
        title: 'LGN faible pour variables i.i.d. intégrables',
        source: 'Poly ch.7, Outils, Thm 2.1, p. 30',
        hypotheses: [
          'Pour tout $n$, $(\\mathsf{Z}_n,\\mathcal{Z}_n,\\mathbb{P}_n)$ espace de probabilité ; $X_1,\\dots,X_n$ réelles, **indépendantes, de même loi**.',
          '$\\sup_n\\mathbb{E}_n[|X_1|]<\\infty$ (intégrabilité ; **pas** de moment d’ordre 2).',
        ],
        statement: '$$\\frac1n\\sum_{k=1}^nX_k-\\mathbb{E}_n[X_1]\\xrightarrow{\\mathbb{P}_n\\text{-prob}}0.$$',
        intuition: '**Admise** (c’est le Thm 4.2 des compléments du ch.6). La LGN du ch.6 (Thm 1.2) supposait un moment d’ordre 2 ; ici on l’applique à $w_\\delta$, $\\psi\'(\\theta^\\star,\\cdot)$, $R_\\delta$, qui ne sont qu’**intégrables**. Forme d’usage : $\\frac1n\\sum_kf(Y_k)\\to\\mathbb{E}[f(Y_1)]$ en probabilité pour $f$ intégrable.',
        pitfalls: ['Ne pas exiger de moment d’ordre 2 pour la LGN (c’est le TCL qui en demande un).'],
      },
      {
        kind: 'theorem',
        id: 'ch7-lem-2-1',
        type: 'lemme',
        label: 'Lemme 2.1 (Outils)',
        title: 'Module de continuité d’une famille dominée',
        source: 'Poly ch.7, Outils, Lemme 2.1 et éq. (12), p. 30–31',
        hypotheses: [
          '$K$ compact de $\\mathbb{R}^d$, $\\Theta\\subseteq K$, $\\phi:K\\times\\mathsf{X}\\to\\mathbb{R}$, $\\theta\\mapsto\\phi(\\theta,x)$ continue sur $K$ pour tout $x$.',
          'Pour tout $\\theta^\\star$, $\\int\\sup_{\\theta\\in K}|\\phi(\\theta,x)|\\,\\mathbb{Q}_{\\theta^\\star}(\\mathrm{d}x)<\\infty$.',
        ],
        statement: 'Avec $w_\\delta(x):=\\sup_{\\theta,\\vartheta\\in K,\\ \\|\\theta-\\vartheta\\|\\le\\delta}|\\phi(\\theta,x)-\\phi(\\vartheta,x)|$ (éq. (12)) : pour tout $\\theta^\\star$, $\\theta\\mapsto\\mathsf{W}_{\\theta^\\star}(\\theta)=\\int\\phi(\\theta,x)\\,\\mathbb{Q}_{\\theta^\\star}(\\mathrm{d}x)$ est **continue** sur $K$ et $\\lim_{\\delta\\to0^+}\\int w_\\delta\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}=0$.',
        intuition: 'Transforme la continuité ponctuelle (à $x$ fixé), « qui ne dit rien en moyenne », en deux énoncés **en moyenne**.',
        proof: [
          { text: 'Enveloppe $\\varphi(x):=\\sup_{\\theta\\in K}|\\phi(\\theta,x)|$, finie et intégrable.', justification: 'Fonction continue sur un compact bornée ; intégrabilité par hypothèse.' },
          { text: 'Si $\\theta_n\\to\\theta$ dans $K$ : $\\phi(\\theta_n,x)\\to\\phi(\\theta,x)$ et $|\\phi(\\theta_n,x)|\\le\\varphi(x)$, donc $\\mathsf{W}_{\\theta^\\star}(\\theta_n)\\to\\mathsf{W}_{\\theta^\\star}(\\theta)$.', justification: 'Continuité en $\\theta$, puis convergence dominée.' },
          { text: '$\\lim_{\\delta\\to0^+}w_\\delta(x)=0$ pour tout $x$.', justification: 'Théorème de Heine : $\\theta\\mapsto\\phi(\\theta,x)$ est uniformément continue sur le compact $K$.' },
          { text: '$w_\\delta\\le2\\varphi$ et $\\int w_{\\delta_n}\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}\\to0$ pour toute suite $\\delta_n\\to0$.', justification: 'Convergence dominée (domination par $2\\varphi$ intégrable) ; $\\delta\\mapsto w_\\delta(x)$ croissante.' },
        ],
        pitfalls: ['Homonymie : le « lemme 2.1 » invoqué dans la preuve du Thm 1.4 et l’Ex. 1.10 est celui du **ch.6** (Markov), pas celui-ci.'],
      },
      {
        kind: 'theorem',
        id: 'ch7-lem-2-2',
        type: 'lemme',
        label: 'Lemme 2.2 (Outils)',
        title: 'Formule de Taylor avec reste intégral à l’ordre un',
        source: 'Poly ch.7, Outils, Lemme 2.2, p. 31',
        hypotheses: ['$f:I\\to\\mathbb{R}$ continûment différentiable sur un intervalle ouvert $I$, $a\\in I$, $[a,a+t]\\subseteq I$.'],
        statement: '$$f(a+t)=f(a)+f\'(a)\\,t+r(t)\\,t,\\qquad r(t):=\\int_0^1\\{f\'(a+wt)-f\'(a)\\}\\,\\mathrm{d}w,$$\n\net $\\lim_{t\\to0}r(t)=0$.',
        intuition: 'Le reste est **exact** (pas un simple $o(\\cdot)$) : on peut le contrôler **uniformément en $x$**. Appliqué à $f=\\psi(\\cdot,x)$, $a=\\theta^\\star$, il donne les équations (1)–(2) du §1.5.',
        proof: [
          { text: '$\\int_0^1f\'(a+wt)\\,t\\,\\mathrm{d}w=\\int_a^{a+t}f\'(s)\\,\\mathrm{d}s=f(a+t)-f(a)$.', justification: 'Changement de variable $s=a+wt$ et théorème fondamental de l’analyse.' },
          { text: 'Retrancher $f\'(a)t=\\int_0^1f\'(a)\\,t\\,\\mathrm{d}w$ donne la formule.', justification: 'Linéarité de l’intégrale.' },
          { text: '$|r(t)|\\le\\sup_{|s-a|\\le|t|}|f\'(s)-f\'(a)|\\to0$.', justification: 'Continuité de $f\'$ en $a$.' },
        ],
      },
      {
        kind: 'text',
        id: 'ch7-s4-admis',
        title: 'Résultats antérieurs mobilisés et résultats admis (§2.4–2.5, p. 31–32)',
        text: `**Employés tels quels** : ch.2 (définitions des M- et Z-estimateurs, KL et sa positivité) ; ch.3 (modèle régulier, score, information de Fisher, $\\mathbb{E}[\\dot\\ell]=0$ et $\\mathbb{I}=-\\mathbb{E}[\\ddot\\ell]$, Cauchy-Schwarz, dérivation sous l’intégrale) ; ch.6 (consistance, Markov, TCL, Slutsky, transformation continue, méthode-δ, normalité asymptotique, comparaison par variance asymptotique, vocabulaire des tests asymptotiques).

**Admis** dans le chapitre :

1. la LGN pour variables i.i.d. intégrables (Thm 2.1) ;
2. le **premier point du Thm 1.7** (normalité asymptotique de l’EMV sous les seules conditions de régularité du Cadre 1.1) ;
3. la loi limite de la **médiane empirique** (Ex. 1.9), qui relève des statistiques d’ordre (rappelée en §9).`,
      },
    ],
  },
]
