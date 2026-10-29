import type { CourseSection } from '../types'

/** Sections 5 à 9 : normalité asymptotique, EMV, optimalité et hors-régularité, méthodes et examen, compléments. */
export const coursePart2: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 5. Normalité asymptotique des Z- et M-estimateurs
  // -------------------------------------------------------------------------
  {
    id: 'ch7-s5-normalite',
    title: '5. Normalité asymptotique des Z- et M-estimateurs (cas scalaire)',
    role: 'preuves',
    intro:
      'Une fois la consistance acquise, on cherche $\\alpha_n\\to\\infty$ telle que $\\alpha_n(\\hat\\theta_n-\\theta^\\star)$ ait une limite non dégénérée : ce sera $\\alpha_n=\\sqrt n$ et une gaussienne centrée. L’outil : un développement au premier ordre de l’équation d’estimation autour de $\\theta^\\star$ (cas $d=1$ ; le cas vectoriel est en §9).',
    blocks: [
      {
        kind: 'text',
        id: 'ch7-s5-identite',
        title: 'L’identité clé (3) et les trois convergences (§1.5, p. 18–19)',
        text: `Soit $\\{\\hat\\theta_n\\}$ une suite **consistante** de Z-estimateurs ($\\widehat\\Psi_n(\\hat\\theta_n)=0$), $\\theta\\mapsto\\psi(\\theta,x)$ de classe $C^1$ près de $\\theta^\\star$. Taylor avec reste intégral (Lemme 2.2) :

$$\\psi(\\theta,x)=\\psi(\\theta^\\star,x)+\\psi'(\\theta^\\star,x)(\\theta-\\theta^\\star)+r(\\theta-\\theta^\\star,x)(\\theta-\\theta^\\star),\\qquad r(t,x):=\\int_0^1\\{\\psi'(\\theta^\\star+wt,x)-\\psi'(\\theta^\\star,x)\\}\\,\\mathrm{d}w.$$

En $\\theta=\\hat\\theta_n$, $x=X_i$, puis en moyennant : $0=\\widehat\\Psi_n(\\theta^\\star)+\\{\\widehat\\Psi_n'(\\theta^\\star)+R_n\\}(\\hat\\theta_n-\\theta^\\star)$ avec $R_n:=\\frac1n\\sum_ir(\\hat\\theta_n-\\theta^\\star,X_i)$, d’où

$$\\sqrt n\\big(\\hat\\theta_n-\\theta^\\star\\big)=\\frac{-\\sqrt n\\,\\widehat\\Psi_n(\\theta^\\star)}{\\widehat\\Psi_n'(\\theta^\\star)+R_n}.\\qquad(3)$$

- **Numérateur — TCL** (Poly ch.6, Thm 1.6) : centrage $\\mathbb{E}_{\\theta^\\star}[\\psi(\\theta^\\star,X_1)]=0$ et $\\mathbb{E}_{\\theta^\\star}[\\psi^2]<\\infty$ donnent $\\sqrt n\\,\\widehat\\Psi_n(\\theta^\\star)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}(0,\\mathbb{E}_{\\theta^\\star}[\\psi^2(\\theta^\\star,X_1)])$.
- **Dénominateur — LGN** (Thm 2.1) : $\\widehat\\Psi_n'(\\theta^\\star)\\to\\mathbb{E}_{\\theta^\\star}[\\psi'(\\theta^\\star,X_1)]$, supposée **non nulle**.
- **Reste** : $R_n\\to0$ en probabilité par **consistance** + **domination** de $\\psi'$ (convergence dominée puis Markov).
- **Slutsky** assemble.

**Intuition (encadré p. 19)** : erreur = (écart entre équation empirique et théorique au vrai paramètre) / (pente de l’équation d’estimation). Plus $\\Psi_{\\theta^\\star}$ traverse zéro avec une **pente raide**, moins une perturbation déplace la solution : d’où la pente **au carré** au dénominateur de la variance.

*Attention* : (3) suppose $\\hat\\theta_n$ dans le voisinage de validité et un dénominateur non nul ; **la preuve du Thm 1.4 ne fait pas cette division**.`,
      },
      {
        kind: 'viz',
        id: 'ch7-s5-viz-z',
        vizId: 'ch7-z-estimateur',
        caption: 'L’identité (3) en direct : numérateur $-\\sqrt n\\,\\widehat\\Psi_n(\\theta^\\star)$, pente $\\widehat\\Psi_n\'(\\theta^\\star)$ et erreur $\\sqrt n(\\hat\\theta_n-\\theta^\\star)$ affichés sous la figure.',
      },
      {
        kind: 'theorem',
        id: 'ch7-thm-1-4',
        type: 'theoreme',
        label: 'Théorème 1.4',
        title: 'Normalité asymptotique des Z-estimateurs, cas scalaire',
        source: 'Poly ch.7, Thm 1.4, p. 20–21 (éq. (4)–(9))',
        hypotheses: [
          '$\\Theta\\subseteq\\mathbb{R}$ ; $\\{\\hat\\theta_n\\}$ suite **consistante** de Z-estimateurs associés à $\\psi:\\Theta\\times\\mathsf{X}\\to\\mathbb{R}$ ; $\\theta^\\star\\in\\Theta^o$ (**intérieur**).',
          '(i) $\\mathbb{E}_{\\theta^\\star}[\\psi(\\theta^\\star,X_1)]=0$ et $\\mathbb{E}_{\\theta^\\star}[\\psi^2(\\theta^\\star,X_1)]<\\infty$.',
          '(ii) Il existe un voisinage $\\mathcal{V}(\\theta^\\star)\\subseteq\\Theta$ sur lequel $\\theta\\mapsto\\psi(\\theta,x)$ est **continûment différentiable** pour tout $x$, et $g$ mesurable avec $\\sup_{\\theta\\in\\mathcal{V}(\\theta^\\star)}|\\psi\'(\\theta,x)|\\le g(x)$, $\\mathbb{E}_{\\theta^\\star}[g(X_1)]<\\infty$.',
          '(iii) $\\mathbb{E}_{\\theta^\\star}[\\psi\'(\\theta^\\star,X_1)]\\ne0$.',
        ],
        statement: 'Pour tout $\\theta^\\star\\in\\Theta^o$,\n\n$$\\sqrt n\\big(\\hat\\theta_n-\\theta^\\star\\big)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}\\big(0,v_\\psi(\\theta^\\star)\\big),\\qquad v_\\psi(\\theta):=\\frac{\\mathbb{E}_\\theta[\\psi^2(\\theta,X_1)]}{\\big(\\mathbb{E}_\\theta[\\psi\'(\\theta,X_1)]\\big)^2}.$$',
        intuition: 'TCL au numérateur, LGN au dénominateur, reste négligeable grâce à consistance + domination ; Slutsky assemble. Variance = (variance de $\\psi$) / (pente moyenne)$^2$.',
        proof: [
          {
            text: 'Pour $[\\theta^\\star-\\delta,\\theta^\\star+\\delta]\\subseteq\\mathcal{V}(\\theta^\\star)$, $R_\\delta(x):=\\sup_{|t|\\le\\delta}|r(t,x)|\\le2g(x)$ et $R_\\delta(x)\\to0$ quand $\\delta\\to0$ ; donc $\\lim_{\\delta\\to0}\\mathbb{E}_{\\theta^\\star}[R_\\delta(X_1)]=0$ (4).',
            justification: '(ii) : chaque terme de l’intégrande de $r$ est $\\le g$ ; continuité de $\\psi\'(\\cdot,x)$ en $\\theta^\\star$ ; convergence dominée.',
          },
          {
            text: 'Pour $\\theta^\\star+t\\in\\mathcal{V}(\\theta^\\star)$ : $\\widehat\\Psi_n(\\theta^\\star+t)=\\frac1n\\sum_i\\psi(\\theta^\\star,X_i)+t\\,\\mathbb{E}_{\\theta^\\star}[\\psi\'(\\theta^\\star,X_1)]+t\\,R_n(t)$ (5), avec $R_n(t)=R_n^{(1)}+R_n^{(2)}(t)$, $R_n^{(1)}:=\\frac1n\\sum_i\\{\\psi\'(\\theta^\\star,X_i)-\\mathbb{E}_{\\theta^\\star}[\\psi\'(\\theta^\\star,X_1)]\\}$, $R_n^{(2)}(t):=\\frac1n\\sum_ir(t,X_i)$.',
            justification: 'Taylor avec reste intégral (Lemme 2.2) appliqué à chaque observation, puis moyenne ; on fait apparaître la pente **théorique**.',
          },
          {
            text: '$R_n^{(1)}\\xrightarrow{\\mathbb{P}_{n,\\theta^\\star}\\text{-prob}}0$ (6).',
            justification: 'Les $\\psi\'(\\theta^\\star,X_i)$ sont i.i.d. intégrables (dominés par $g$, (ii)) : LGN faible (Thm 2.1).',
          },
          {
            text: 'Pour toute suite $\\delta_n\\downarrow0$ : $\\sup_{|t|\\le\\delta_n}|R_n^{(2)}(t)|\\le\\frac1n\\sum_iR_{\\delta_n}(X_i)$, d’espérance $\\mathbb{E}_{\\theta^\\star}[R_{\\delta_n}(X_1)]\\to0$ ; donc $\\sup_{|t|\\le\\delta_n}|R_n^{(2)}(t)|\\to0$ en probabilité (7).',
            justification: 'Inégalité de Markov (Poly **ch.6**, Lemme 2.1) et (4).',
          },
          {
            text: 'Avec $\\Delta_n:=\\hat\\theta_n-\\theta^\\star$ et $\\delta_n\\to0$ tel que $\\mathbb{P}_{n,\\theta^\\star}(|\\Delta_n|\\ge\\delta_n)\\to0$ : $\\mathbb{P}(|R_n^{(2)}(\\Delta_n)|\\ge\\varepsilon)\\le\\mathbb{P}(\\sup_{|t|\\le\\delta_n}|R_n^{(2)}(t)|\\ge\\varepsilon)+\\mathbb{P}(|\\Delta_n|\\ge\\delta_n)$, d’où $R_n(\\Delta_n)\\to0$ en probabilité (8).',
            justification: '**Consistance** (existence de $\\delta_n$, quitte à la diminuer pour rester dans $\\mathcal{V}(\\theta^\\star)$) ; (6)–(7) ; on évalue le reste au point **aléatoire** $\\Delta_n$.',
          },
          {
            text: 'Sur $\\{|\\Delta_n|\\le\\delta_n\\}$ (probabilité $\\to1$) : $0=\\frac1{\\sqrt n}\\sum_i\\psi(\\theta^\\star,X_i)+\\sqrt n(\\hat\\theta_n-\\theta^\\star)\\{\\mathbb{E}_{\\theta^\\star}[\\psi\'(\\theta^\\star,X_1)]+R_n(\\Delta_n)\\}$ (9).',
            justification: '(5) avec $t=\\Delta_n$, $\\widehat\\Psi_n(\\hat\\theta_n)=0$, multiplié par $\\sqrt n$ : **identité sans division**.',
          },
          {
            text: '$\\frac1{\\sqrt n}\\sum_i\\psi(\\theta^\\star,X_i)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}(0,\\mathbb{E}_{\\theta^\\star}[\\psi^2(\\theta^\\star,X_1)])$.',
            justification: 'TCL (Poly **ch.6**, Thm 1.6) : variables i.i.d. centrées de carré intégrable, par (i).',
          },
          {
            text: 'L’accolade de (9) tend en probabilité vers $\\mathbb{E}_{\\theta^\\star}[\\psi\'(\\theta^\\star,X_1)]\\ne0$.',
            justification: '(8) et (iii).',
          },
          {
            text: '$\\sqrt n(\\hat\\theta_n-\\theta^\\star)\\Rightarrow-\\mathcal{N}(0,\\mathbb{E}[\\psi^2])/\\mathbb{E}[\\psi\']=\\mathcal{N}(0,v_\\psi(\\theta^\\star))$.',
            justification: 'Lemme de Slutsky (Poly **ch.6**, Lemme 1.1) et transformation continue (Poly **ch.6**, Thm 1.4) appliquée à $(u,c)\\mapsto-u/c$ au voisinage de $c\\ne0$ ; symétrie de la gaussienne centrée.',
          },
        ],
        pitfalls: [
          'Hypothèses **locales** : seulement en $\\theta^\\star$ **intérieur**. Au bord la conclusion tombe : $\\mathcal{N}(\\theta,1)$ avec $\\Theta=\\mathbb{R}_+$, en $\\theta=0$ la loi limite est celle de $\\max(Z,0)$ (PC7 Ex. 4).',
          '(ii) n’est **pas** vérifiée par $\\psi(\\theta,x)=\\operatorname{signe}(x-\\theta)$ : la normalité de la médiane relève des statistiques d’ordre (§9), pas du Thm 1.4.',
          'La **consistance est une hypothèse** du théorème : à établir à part (Thm 1.1, 1.3, Cor. 1.1, monotonie, ou forme explicite).',
          'Ne pas oublier le **carré** au dénominateur de $v_\\psi$, ni la condition $\\mathbb{E}[\\psi\']\\ne0$.',
          'Complément (encadré p. 21, hors programme) : la preuve n’utilise $\\widehat\\Psi_n(\\hat\\theta_n)=0$ qu’à travers (9) ; elle vaut si $\\sqrt n\\,\\widehat\\Psi_n(\\hat\\theta_n)\\to0$ en probabilité (solutions approchées).',
        ],
      },
      {
        kind: 'text',
        id: 'ch7-s5-vitesse',
        title: 'n^(−1/2) est le bon ordre de grandeur de l’erreur (encadré p. 21)',
        text: 'Sous la conclusion du Thm 1.4, pour une autre normalisation $\\alpha_n\\to\\infty$ : $\\alpha_n(\\hat\\theta_n-\\theta^\\star)=(\\alpha_n/\\sqrt n)\\cdot\\sqrt n(\\hat\\theta_n-\\theta^\\star)$ tend vers 0 en probabilité si $\\alpha_n/\\sqrt n\\to0$ (Slutsky), et devient arbitrairement grande ($\\liminf_n\\mathbb{P}(|\\alpha_n(\\hat\\theta_n-\\theta^\\star)|\\ge M)>0$ pour tout $M$) si $\\alpha_n/\\sqrt n\\to\\infty$. **Seule la normalisation $\\sqrt n$ donne une limite non dégénérée** dans le cas régulier. Dans les modèles non réguliers (Ex. 1.10) la bonne vitesse est $n$.',
      },
      {
        kind: 'theorem',
        id: 'ch7-rem-centrage-m',
        type: 'remarque',
        label: 'Remarque (§1.6)',
        title: 'Centrage de m′ en θ⋆',
        source: 'Poly ch.7, §1.6 (Intuition), p. 21–22',
        hypotheses: ['$\\theta^\\star$ **intérieur** à $\\Theta$.', 'Permutation dérivation / espérance licite (domination du type Poly ch.3, Prop. 2.2).'],
        statement: '$\\theta^\\star$ maximise $\\theta\\mapsto\\mathsf{M}_{\\theta^\\star}(\\theta)$, donc\n\n$$\\mathbb{E}_{\\theta^\\star}[m\'(\\theta^\\star,X_1)]=\\partial_\\theta\\mathbb{E}_{\\theta^\\star}[m(\\theta,X_1)]\\big|_{\\theta=\\theta^\\star}=0,$$\n\net $\\psi:=m\'$ vérifie la condition de centrage de la Déf. 1.2. La loi limite des M-estimateurs s’obtient de celle des Z-estimateurs par $\\psi=m\'$.',
        intuition: 'Condition du premier ordre en un maximum intérieur, passée sous l’espérance. « La permutation n’est pas gratuite. »',
      },
      {
        kind: 'theorem',
        id: 'ch7-thm-1-5',
        type: 'theoreme',
        label: 'Théorème 1.5',
        title: 'Normalité asymptotique des M-estimateurs, cas scalaire',
        source: 'Poly ch.7, Thm 1.5, p. 22',
        hypotheses: [
          '$\\Theta\\subseteq\\mathbb{R}$ ; $\\{\\hat\\theta_n\\}$ suite **consistante** de M-estimateurs associés à $m$, **à valeurs dans $\\Theta^o$** ; $\\theta^\\star\\in\\Theta^o$.',
          '(i) Il existe $\\mathcal{V}(\\theta^\\star)\\subseteq\\Theta$ sur lequel $\\theta\\mapsto m(\\theta,x)$ est **deux fois continûment différentiable** pour tout $x$, et $g$ avec $\\sup_{\\theta\\in\\mathcal{V}(\\theta^\\star)}|m\'\'(\\theta,x)|\\le g(x)$, $\\mathbb{E}_{\\theta^\\star}[g(X_1)]<\\infty$.',
          '(ii) $\\mathbb{E}_{\\theta^\\star}[m\'(\\theta^\\star,X_1)]=0$ et $0<\\mathbb{E}_{\\theta^\\star}[m\'(\\theta^\\star,X_1)^2]<\\infty$.',
          '(iii) $\\mathbb{E}_{\\theta^\\star}[m\'\'(\\theta^\\star,X_1)]\\ne0$.',
        ],
        statement: '$$\\sqrt n\\big(\\hat\\theta_n-\\theta^\\star\\big)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}\\left(0,\\frac{\\mathbb{E}_{\\theta^\\star}[m\'(\\theta^\\star,X_1)^2]}{\\{\\mathbb{E}_{\\theta^\\star}[m\'\'(\\theta^\\star,X_1)]\\}^2}\\right).$$',
        intuition: 'Variance « sandwich » scalaire : $\\mathbb{E}[m\'^2]/(\\mathbb{E}[m\'\'])^2$.',
        proof: [
          { text: 'Poser $\\psi(\\theta,x):=m\'(\\theta,x)$, d’où $\\psi\'=m\'\'$.', justification: 'Définition.' },
          { text: 'Comme $\\hat\\theta_n\\in\\Theta^o$ maximise $\\widehat{M}_n$, $\\widehat\\Psi_n(\\hat\\theta_n)=0$ : $\\{\\hat\\theta_n\\}$ est une suite consistante de Z-estimateurs associés à $\\psi$.', justification: 'Prop. 1.1 (maximum **intérieur**).' },
          { text: '(i), (ii), (iii) sont exactement (ii), (i), (iii) du Thm 1.4 pour ce $\\psi$.', justification: '$C^2$ de $m$ = $C^1$ de $\\psi$ ; domination de $m\'\'$ = domination de $\\psi\'$.' },
          { text: 'Conclusion.', justification: 'Thm 1.4.' },
        ],
        pitfalls: ['« À valeurs dans $\\Theta^o$ » est indispensable pour utiliser la Prop. 1.1.', '(ii) contient la condition $>0$ (variance non nulle).'],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 6. L'EMV
  // -------------------------------------------------------------------------
  {
    id: 'ch7-s6-emv',
    title: '6. Application à l’EMV : score, information de Fisher, loi limite 1/𝕀(θ⋆)',
    role: 'definitions',
    intro: 'L’EMV est le M-estimateur associé à la log-vraisemblance et, lorsqu’elle est dérivable avec un maximum intérieur, le Z-estimateur associé au **score**. Les Thm 1.4–1.5 s’y appliquent, et la variance asymptotique prend une forme remarquable grâce à l’identité (10).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch7-def-1-3',
        type: 'definition',
        label: 'Définition 1.3',
        title: 'Fonction score',
        source: 'Poly ch.7, Déf. 1.3, p. 22 (rappel du ch.3)',
        hypotheses: ['Modèle dominé $\\mathbb{Q}_\\theta=q_\\theta\\cdot\\mu$, $\\Theta\\subseteq\\mathbb{R}$.'],
        statement: 'Pour $\\theta\\in\\Theta$, $x\\in\\mathsf{X}$ : $\\ell(\\theta,x):=\\log q_\\theta(x)$. Lorsqu’elle existe, $\\dot\\ell(\\theta,x):=\\partial_\\theta\\log q_\\theta(x)$ est la **fonction score** ; on note $\\ddot\\ell(\\theta,x):=\\partial_\\theta^2\\log q_\\theta(x)$.',
        intuition: 'Sensibilité de la log-densité au paramètre. Notation pointée ($\\dot\\ell$, $\\ddot\\ell$), pas $\\ell\'$.',
      },
      {
        kind: 'theorem',
        id: 'ch7-def-1-4',
        type: 'definition',
        label: 'Définition 1.4 et éq. (10)',
        title: 'Information de Fisher',
        source: 'Poly ch.7, Déf. 1.4 et éq. (10), p. 23 (propriétés : Poly ch.3, Prop. 1.2)',
        hypotheses: ['Modèle **régulier** (Poly ch.3, Déf. 1.6 ; Cadre 1.1 ci-dessous).'],
        statement: '$$\\mathbb{I}(\\theta):=\\mathbb{E}_\\theta\\big[\\{\\dot\\ell(\\theta,X_1)\\}^2\\big]=\\int(\\dot\\ell(\\theta,x))^2\\,\\mathbb{Q}_\\theta(\\mathrm{d}x).$$\n\nDans un modèle régulier, le score est centré, $\\mathbb{E}_\\theta[\\dot\\ell(\\theta,X_1)]=0$, et\n\n$$\\mathbb{I}(\\theta)=\\mathbb{E}_\\theta\\big[(\\dot\\ell(\\theta,X_1))^2\\big]=-\\mathbb{E}_\\theta\\big[\\ddot\\ell(\\theta,X_1)\\big].\\qquad(10)$$',
        intuition: '« Variance du score » car le score est centré. (10) se démontre en dérivant deux fois $\\int q_\\theta\\,\\mathrm{d}\\mu=1$ sous l’intégrale (ch.3) ; c’est elle qui simplifie la variance de l’EMV.',
        pitfalls: ['(10) requiert la régularité (permutation dérivée / intégrale).', '$\\mathbb{I}(\\theta)$ est l’information d’**une** observation ; celle de l’échantillon vaut $n\\,\\mathbb{I}(\\theta)$.'],
      },
      {
        kind: 'example',
        id: 'ch7-ex-1-6-1-7',
        title: 'Exemples 1.6 et 1.7 — Information de Fisher gaussienne et de Poisson',
        source: 'Poly ch.7, Ex. 1.6 et 1.7, p. 23',
        setup: '(a) $\\mathbb{Q}_\\theta=\\mathcal{N}(\\theta,\\sigma^2)$, $\\sigma^2$ connu. (b) $\\mathbb{Q}_\\theta=\\mathcal{P}\\mathrm{oi}(\\theta)$, $\\theta\\in\\mathbb{R}_+^*$.',
        steps: [
          {
            text: '(a) $\\ell(\\theta,x)=-\\frac12\\log(2\\pi\\sigma^2)-\\frac1{2\\sigma^2}(x-\\theta)^2$, $\\dot\\ell(\\theta,x)=\\frac{x-\\theta}{\\sigma^2}$, $\\ddot\\ell(\\theta,x)=-\\frac1{\\sigma^2}$, d’où $\\mathbb{I}(\\theta)=\\sigma^{-2}$.',
            justification: 'Dérivations directes ; $-\\mathbb{E}[\\ddot\\ell]=1/\\sigma^2$ (ou $\\mathbb{E}[(X-\\theta)^2]/\\sigma^4=1/\\sigma^2$).',
          },
          {
            text: '(b) $\\ell(\\theta,x)=x\\log\\theta-\\theta-\\log(x!)$, $\\dot\\ell(\\theta,x)=\\frac{x-\\theta}\\theta$, $\\ddot\\ell(\\theta,x)=-\\frac x{\\theta^2}$.',
            justification: 'Log de la fonction de masse $\\theta^xe^{-\\theta}/x!$.',
          },
          {
            text: '(b) $\\mathbb{E}_\\theta[\\dot\\ell^2]=\\mathrm{Var}_\\theta(X_1)/\\theta^2=1/\\theta$ et $-\\mathbb{E}_\\theta[\\ddot\\ell]=\\mathbb{E}_\\theta[X_1]/\\theta^2=1/\\theta$ : $\\mathbb{I}(\\theta)=1/\\theta$.',
            justification: '$\\mathbb{E}_\\theta[X_1]=\\mathrm{Var}_\\theta(X_1)=\\theta$ ; les deux expressions de (10) coïncident.',
          },
        ],
        conclusion: 'Plus le bruit est faible, plus l’information est grande (cas gaussien). Autres valeurs à connaître : $\\mathcal{E}(\\theta)$ (intensité) $\\mathbb{I}=1/\\theta^2$ ; $\\mathrm{Gamma}(2,\\theta)$ $\\mathbb{I}=2/\\theta^2$ (PC7 Ex. 2) ; Cauchy $\\mathbb{I}=1/2$ (§9) ; log-normale $(\\theta,\\theta)$ $\\mathbb{I}=(1+2\\theta)/(2\\theta^2)$ (PC7 Ex. 3).',
      },
      {
        kind: 'text',
        id: 'ch7-s6-consistance-emv',
        title: 'Consistance de l’EMV (§1.7, p. 23)',
        text: 'L’EMV est le M-estimateur pour $m=\\ell$ (Ex. 1.1) et, si le modèle est identifiable, $\\mathsf{M}_{\\theta^\\star}(\\theta)=\\mathrm{Ent}(q_{\\theta^\\star})-\\mathrm{KL}(q_{\\theta^\\star},q_\\theta)$ est maximale **au seul point** $\\theta^\\star$. Le Cor. 1.1 donne la consistance de $\\{\\hat\\theta_n^{\\mathrm{MV}}\\}$ dès que $\\Theta$ est **compact**, que $\\theta\\mapsto\\log q_\\theta(x)$ est continue pour tout $x$ et que $\\int\\sup_{\\theta\\in\\Theta}|\\log q_\\theta(x)|\\,\\mathbb{Q}_{\\theta^\\star}(\\mathrm{d}x)<\\infty$. Version non compacte : Thm 4.3 (hors programme). **À l’examen**, quand l’EMV est explicite, on montre plus simplement la consistance par LGN + continuité (ch.6) ou comme conséquence de la normalité asymptotique.',
      },
      {
        kind: 'theorem',
        id: 'ch7-thm-1-6',
        type: 'theoreme',
        label: 'Théorème 1.6',
        title: 'Normalité asymptotique du maximum de vraisemblance',
        source: 'Poly ch.7, Thm 1.6, p. 23–24',
        hypotheses: [
          'Hypothèses du Thm 1.4 appliquées à $\\psi=\\dot\\ell$ : EMV **consistant**, maximum **intérieur**, score $C^1$ au voisinage de $\\theta^\\star$ avec $|\\ddot\\ell|$ dominée par une fonction intégrable, $\\mathbb{E}_{\\theta^\\star}[\\ddot\\ell(\\theta^\\star,X_1)]\\ne0$, $\\mathbb{E}[\\dot\\ell^2]<\\infty$.',
          'Identité (10) : $\\mathbb{I}(\\theta^\\star)=\\mathbb{E}[\\dot\\ell^2]=-\\mathbb{E}[\\ddot\\ell]$ (modèle régulier).',
        ],
        statement: 'Pour tout $\\theta^\\star\\in\\Theta^o$,\n\n$$\\sqrt n\\big(\\hat\\theta_n^{\\mathrm{MV}}-\\theta^\\star\\big)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}\\left(0,\\frac1{\\mathbb{I}(\\theta^\\star)}\\right).$$',
        intuition: 'La précision asymptotique de l’EMV est donnée par l’information de Fisher : $\\hat\\theta_n^{\\mathrm{MV}}\\approx\\mathcal{N}(\\theta^\\star,1/(n\\mathbb{I}(\\theta^\\star)))$.',
        proof: [
          {
            text: 'Le Thm 1.4 avec $\\psi=\\dot\\ell$, $\\psi\'=\\ddot\\ell$ donne $\\sqrt n(\\hat\\theta_n^{\\mathrm{MV}}-\\theta^\\star)\\Rightarrow\\mathcal{N}\\Big(0,\\dfrac{\\mathbb{E}_{\\theta^\\star}[(\\dot\\ell(\\theta^\\star,X_1))^2]}{\\{\\mathbb{E}_{\\theta^\\star}[\\ddot\\ell(\\theta^\\star,X_1)]\\}^2}\\Big)$.',
            justification: 'L’EMV est le Z-estimateur associé au score quand la log-vraisemblance est dérivable et le maximum intérieur (Prop. 1.1).',
          },
          {
            text: '$v_{\\dot\\ell}(\\theta^\\star)=\\mathbb{I}(\\theta^\\star)/\\mathbb{I}(\\theta^\\star)^2=1/\\mathbb{I}(\\theta^\\star)$.',
            justification: 'Identité (10) : numérateur $=\\mathbb{I}(\\theta^\\star)$, dénominateur $=(-\\mathbb{I}(\\theta^\\star))^2$.',
          },
        ],
        pitfalls: ['C’est la variance de la loi limite de $\\sqrt n(\\hat\\theta_n-\\theta^\\star)$ qui vaut $1/\\mathbb{I}$ ; la variance « approchée » de $\\hat\\theta_n$ est $1/(n\\mathbb{I}(\\theta^\\star))$.', 'Ne s’applique pas si le support dépend de $\\theta$ (Ex. 1.10) ni au bord de $\\Theta$ (PC7 Ex. 4).'],
      },
      {
        kind: 'viz',
        id: 'ch7-s6-viz-emv',
        vizId: 'ch7-emv-normalite',
        caption: 'Histogramme de $\\sqrt n(\\hat\\theta_n^{\\mathrm{MV}}-\\theta^\\star)$ sur des échantillons répétés et densité de $\\mathcal{N}(0,1/\\mathbb{I}(\\theta^\\star))$ : Poisson, Gamma$(2,\\theta)$, log-normale $(\\theta,\\theta)$, Cauchy (EMV calculé numériquement).',
      },
      {
        kind: 'example',
        id: 'ch7-ex-1-8',
        title: 'Exemple 1.8 — Modèle de Poisson : deux routes, même résultat',
        source: 'Poly ch.7, Ex. 1.8, p. 24',
        setup: 'Suite de $n$-échantillons de $\\mathcal{P}\\mathrm{oi}(\\theta)$, $\\Theta=\\mathbb{R}_+^*$. Déterminer l’EMV et sa loi limite.',
        steps: [
          {
            text: '$\\frac1n\\sum_i\\ell(\\theta,X_i)=\\bar X_n\\log\\theta-\\theta-\\frac1n\\log\\big(\\prod_iX_i!\\big)$ ; dérivée $\\bar X_n/\\theta-1=0\\iff\\theta=\\bar X_n$.',
            justification: 'Log-vraisemblance normalisée ; annulation du score.',
          },
          {
            text: 'Dérivée seconde $-\\bar X_n/\\theta^2<0$ : $\\hat\\theta_n^{\\mathrm{MV}}=\\bar X_n$ est l’unique maximum, **dès que $\\bar X_n>0$**.',
            justification: 'Stricte concavité ; si $\\bar X_n=0$ (probabilité $e^{-n\\theta}>0$) le maximum n’est pas atteint dans $\\mathbb{R}_+^*$.',
          },
          {
            text: 'Route 1 : $\\sqrt n(\\bar X_n-\\theta^\\star)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}(0,\\theta^\\star)$.',
            justification: 'TCL (ch.6, Thm 1.6) avec $\\mathrm{Var}_\\theta(X_1)=\\theta$.',
          },
          {
            text: 'Route 2 : $\\mathbb{I}(\\theta^\\star)=1/\\theta^\\star$, donc $\\mathbb{I}^{-1}(\\theta^\\star)=\\theta^\\star$ : même loi limite.',
            justification: 'Thm 1.6 et Ex. 1.7 — sans utiliser l’expression explicite de l’EMV.',
          },
        ],
        conclusion: 'La théorie générale retrouve le calcul explicite ; elle prend tout son intérêt quand l’EMV n’a pas de forme close (Cauchy, Ex. 1.9).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 7. Optimalité et hors-régularité
  // -------------------------------------------------------------------------
  {
    id: 'ch7-s7-optimalite',
    title: '7. Optimalité asymptotique de l’EMV ; médiane contre EMV ; hors des modèles réguliers',
    role: 'preuves',
    intro: '$v_\\psi$ dépend du choix de $\\psi$. Deux Z-estimateurs d’un même paramètre se comparent par leurs variances asymptotiques (Poly ch.6, Prop. 1.3) : la plus petite donne, pour $n$ grand, les intervalles de confiance asymptotiques les plus courts. Existe-t-il un plus petit élément ? Oui, sous les conditions de régularité : la variance $1/\\mathbb{I}$ de l’EMV.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch7-cadre-1-1',
        type: 'definition',
        label: 'Cadre 1.1',
        title: 'Conditions de régularité, cas scalaire',
        source: 'Poly ch.7, Cadre 1.1, p. 24–25 (réécriture scalaire de Poly ch.3, Déf. 1.6)',
        hypotheses: [
          '$\\Theta$ **ouvert** de $\\mathbb{R}$, $\\mathbb{Q}_\\theta=q_\\theta\\cdot\\mu$ modèle dominé.',
          '**(R-1)** Pour tout $\\theta$ et $\\mu$-presque tout $x$ : $q_\\theta(x)>0$.',
          '**(R-2)** Pour $\\mu$-p.t. $x$, $\\theta\\mapsto q_\\theta(x)$ est $C^2$ sur $\\Theta$ ; pour tout $\\theta^\\star$ il existe $\\mathcal{V}(\\theta^\\star)$ et $g,h\\ge0$ mesurables avec $\\sup_{\\mathcal{V}(\\theta^\\star)}\\{|\\dot\\ell(\\theta,x)|^2+|\\ddot\\ell(\\theta,x)|\\}\\le h(x)$, $\\sup_{\\mathcal{V}(\\theta^\\star)}q_\\theta(x)\\le g(x)$ et $\\int(1+h)g\\,\\mathrm{d}\\mu<\\infty$.',
          '**(R-3)** Pour tout $\\theta$ : $0<\\mathbb{E}_\\theta[\\dot\\ell^2(\\theta,X_1)]<\\infty$ (information existante et inversible).',
        ],
        statement: 'Un modèle vérifiant (R-1)–(R-3) est dit **régulier**.',
        intuition: 'Support indépendant de $\\theta$, régularité $C^2$, dominations locales permettant de dériver sous l’intégrale, information non dégénérée.',
        pitfalls: ['(R-1)/(R-2) imposent que le support de $\\mathbb{Q}_\\theta$ **ne dépende pas de $\\theta$** : c’est ce qui échoue pour $\\mathcal{U}([0,\\theta])$ et Pareto (Ex. 1.10).'],
      },
      {
        kind: 'theorem',
        id: 'ch7-thm-1-7',
        type: 'theoreme',
        label: 'Théorème 1.7',
        title: 'Optimalité asymptotique du maximum de vraisemblance',
        source: 'Poly ch.7, Thm 1.7 et éq. (11), p. 25–26',
        hypotheses: [
          'Suite de $n$-échantillons d’un **modèle régulier** $\\{q_\\theta\\cdot\\mu:\\theta\\in\\Theta\\}$, $\\Theta$ **ouvert** de $\\mathbb{R}$ (Cadre 1.1).',
          'Pour le point 2 : $\\{\\hat\\theta_n\\}$ suite consistante de Z-estimateurs associés à $\\psi$ vérifiant les hypothèses du Thm 1.4, de variance asymptotique $v_\\psi$.',
        ],
        statement: '1. Pour tout $\\theta\\in\\Theta$, $\\sqrt n\\big(\\hat\\theta_n^{\\mathrm{MV}}-\\theta\\big)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}\\big(0,1/\\mathbb{I}(\\theta)\\big)$ (**admis**).\n2. Pour tout $\\theta\\in\\Theta$, $v_\\psi(\\theta)\\ge\\dfrac1{\\mathbb{I}(\\theta)}$.\n\nPour un modèle régulier, **l’EMV est asymptotiquement optimal (asymptotiquement efficace) dans la classe des Z-estimateurs**.',
        intuition: '(11) dit que la pente moyenne de l’équation d’estimation est, au signe près, la **covariance** entre la fonction d’influence et le score (tous deux centrés). Égalité dans Cauchy-Schwarz ⇔ $\\psi(\\theta,\\cdot)\\propto\\dot\\ell(\\theta,\\cdot)$ ; $v_\\psi$ est inchangée si l’on multiplie $\\psi$ par une constante : le score est, à cela près, la fonction d’influence optimale (« une lecture du cas d’égalité, et non une démonstration de l’unicité »).',
        proof: [
          {
            text: 'Pour tout $\\tau\\in\\Theta$ : $\\int\\psi(\\tau,x)\\,q_\\tau(x)\\,\\mu(\\mathrm{d}x)=0$ ; la dérivée en $\\tau=\\theta$ de cette fonction (constante) est nulle.',
            justification: 'Centrage d’une fonction d’influence (Déf. 1.2), valable pour **toute** valeur du paramètre.',
          },
          {
            text: '$0=\\int[\\psi\'(\\theta,x)q_\\theta(x)+\\psi(\\theta,x)\\partial_\\theta q_\\theta(x)]\\,\\mu(\\mathrm{d}x)=\\int[\\psi\'(\\theta,x)+\\psi(\\theta,x)\\dot\\ell(\\theta,x)]\\,q_\\theta(x)\\,\\mu(\\mathrm{d}x)$.',
            justification: 'Dérivation sous le signe intégral (Poly ch.3, Prop. 2.2, licite sous le Cadre 1.1 et la domination du Thm 1.4) ; $\\partial_\\theta q_\\theta=q_\\theta\\,\\dot\\ell(\\theta,\\cdot)$ par (R-1).',
          },
          {
            text: '$\\mathbb{E}_\\theta[\\psi\'(\\theta,X_1)]=-\\mathbb{E}_\\theta[\\psi(\\theta,X_1)\\,\\dot\\ell(\\theta,X_1)]$ (11).',
            justification: 'Réécriture de l’étape précédente en espérances sous $\\mathbb{Q}_\\theta$.',
          },
          {
            text: '$(\\mathbb{E}_\\theta[\\psi\'(\\theta,X_1)])^2\\le\\mathbb{E}_\\theta[\\psi^2(\\theta,X_1)]\\ \\mathbb{E}_\\theta[\\dot\\ell^2(\\theta,X_1)]$.',
            justification: 'Inégalité de Cauchy-Schwarz (Poly ch.3, Prop. 2.1) appliquée à (11).',
          },
          {
            text: '$v_\\psi(\\theta)^{-1}=\\dfrac{(\\mathbb{E}_\\theta[\\psi\'])^2}{\\mathbb{E}_\\theta[\\psi^2]}\\le\\mathbb{E}_\\theta[\\dot\\ell^2]=\\mathbb{I}(\\theta)$, d’où $v_\\psi(\\theta)\\ge1/\\mathbb{I}(\\theta)$.',
            justification: 'Division par $\\mathbb{E}_\\theta[\\psi^2]>0$ (sinon $\\psi=0$ p.s. et (11) donnerait $\\mathbb{E}[\\psi\']=0$, contredisant (iii) du Thm 1.4).',
          },
        ],
        pitfalls: [
          'Optimalité **dans la classe des Z-estimateurs réguliers** seulement : l’estimateur de Hodges (ch.6 §4.5) est asymptotiquement normal avec $v<1/\\mathbb{I}$ en un point (conjecture de Fisher fausse en général, §9).',
          'Borne sur la **variance asymptotique**, pas sur la variance à $n$ fixé (c’est Cramér-Rao, ch.3, même technique : dériver une identité de centrage puis Cauchy-Schwarz).',
          'Le Thm 1.7 du ch.7 n’est **pas** la méthode-δ (Thm 1.7 du ch.6).',
          'Premier point **admis** (§2.5) : le contrôle du reste $R_n$ est fourni par la domination (R-2).',
        ],
      },
      {
        kind: 'viz',
        id: 'ch7-s7-viz-efficacite',
        vizId: 'ch7-efficacite-relative',
        caption: 'Borne $1/\\mathbb{I}$ et variances asymptotiques $V[\\gamma_k]$ des estimateurs de Huber, de la médiane ($k\\to0$) à la moyenne ($k\\to\\infty$), pour plusieurs lois de translation.',
      },
      {
        kind: 'example',
        id: 'ch7-ex-1-9',
        title: 'Exemple 1.9 — Médiane empirique et EMV dans le modèle de Cauchy',
        source: 'Poly ch.7, Ex. 1.9, p. 26–27 (Figures 3 et 4) ; calculs en §4.8',
        setup: 'Modèle $\\{q_\\theta\\cdot\\mathrm{Leb}:\\theta\\in\\mathbb{R}\\}$, $q_\\theta(x):=\\frac1{\\pi(1+(x-\\theta)^2)}$. Aucun moment : la moyenne empirique n’estime pas $\\theta$. Comparer la médiane $\\widehat\\theta_n^{\\mathrm{med}}$ et l’EMV $\\hat\\theta_n^{\\mathrm{MV}}\\in\\argmin_\\theta\\sum_i\\log(1+(X_i-\\theta)^2)$ (sans forme explicite).',
        steps: [
          {
            text: 'Médiane : $\\sqrt n(\\widehat\\theta_n^{\\mathrm{med}}-\\theta^\\star)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}\\big(0,1/\\{4(q_{\\theta^\\star}(\\theta^\\star))^2\\}\\big)$ avec $q_{\\theta^\\star}(\\theta^\\star)=1/\\pi$, soit $v=\\pi^2/4\\simeq2{,}47$.',
            justification: 'Loi limite des statistiques d’ordre (**admise**, §9), **pas** le Thm 1.4 ($\\operatorname{signe}$ n’est pas dérivable).',
          },
          {
            text: 'Score : $\\dot\\ell(\\theta,x)=\\frac{2(x-\\theta)}{1+(x-\\theta)^2}$, borné.',
            justification: 'Dérivation de $-\\log\\pi-\\log(1+(x-\\theta)^2)$.',
          },
          {
            text: '$\\mathbb{I}(\\theta^\\star)=\\int\\frac{4u^2}{(1+u^2)^2}\\frac{\\mathrm{d}u}{\\pi(1+u^2)}=\\frac4\\pi\\int_{-\\pi/2}^{\\pi/2}\\sin^2t\\cos^2t\\,\\mathrm{d}t=\\frac12$.',
            justification: 'Changement de variable $u=x-\\theta$ puis $u=\\tan t$ ; $2\\sin t\\cos t=\\sin2t$ (§4.8) ; indépendante de $\\theta$ (modèle de translation).',
          },
          {
            text: 'EMV : $\\sqrt n(\\hat\\theta_n^{\\mathrm{MV}}-\\theta^\\star)\\Rightarrow\\mathcal{N}(0,1/\\mathbb{I})=\\mathcal{N}(0,2)$.',
            justification: 'Thm 1.6–1.7 (modèle régulier).',
          },
          {
            text: 'Efficacité relative $\\frac{1/\\mathbb{I}}{\\pi^2/4}=\\frac8{\\pi^2}\\simeq0{,}81$ : la médiane demande $\\simeq1{,}23\\,n$ observations pour la précision de l’EMV avec $n$.',
            justification: 'Comparaison par variance asymptotique (ch.6, Prop. 1.3) ; cohérent avec l’optimalité de l’EMV (Thm 1.7), même si la médiane, Z-estimateur non dérivable, n’entre pas littéralement dans sa classe.',
          },
        ],
        conclusion: 'Sur $N=49$ observations simulées avec $\\theta^\\star=2$ : $\\widehat\\theta_n^{\\mathrm{med}}=1{,}7717$, $\\hat\\theta_n^{\\mathrm{MV}}=1{,}7813$. **Figure 4** : $10^4$ réalisations de $\\sqrt n(\\hat\\theta_n-\\theta^\\star)$, $n=499$ : l’histogramme de l’EMV est plus resserré. L’écart est **modeste** ; la médiane, calculable sans optimisation, reste raisonnable (et sert de point de départ au score de Fisher, §9).',
      },
      {
        kind: 'viz',
        id: 'ch7-s7-viz-mediane',
        vizId: 'ch7-mediane-moyenne',
        caption: 'Moyenne, médiane et Huber sous contamination : la moyenne s’effondre quand $\\varepsilon\\tau^2$ grandit, la médiane et Huber restent stables (PC7 Ex. 5 Q7).',
      },
      {
        kind: 'example',
        id: 'ch7-ex-1-10',
        title: 'Exemple 1.10 — Modèle de Pareto : le paramètre gouverne le support',
        source: 'Poly ch.7, Ex. 1.10, p. 28',
        setup: 'Densité $q_\\theta(x)=\\eta\\alpha^\\eta x^{-(1+\\eta)}\\mathbb{1}_{[\\alpha,+\\infty[}(x)$, $\\theta=(\\alpha,\\eta)\\in\\mathbb{R}_+^\\star\\times\\mathbb{R}_+^\\star$. Ni la vitesse $\\sqrt n$ ni la loi gaussienne ne subsistent.',
        steps: [
          {
            text: 'Pour $\\alpha\\le\\min_iX_i$ : $\\ell_n(\\theta)=n\\log\\eta+n\\eta\\log\\alpha-(1+\\eta)\\sum_k\\log X_k$ (non normalisée), et $\\ell_n=-\\infty$ sinon.',
            justification: 'Produit des densités ; l’indicatrice s’annule dès que $\\alpha>\\min X_i$.',
          },
          {
            text: '$\\hat\\alpha_n=\\min(X_1,\\dots,X_n)$, $\\hat\\eta_n=\\big(\\frac1n\\sum_k\\log(X_k/\\hat\\alpha_n)\\big)^{-1}$.',
            justification: 'À $\\eta$ fixé, $\\ell_n$ est **croissante** en $\\alpha{}$ là où elle est finie (pas d’annulation du score en $\\alpha{}$) ; puis $\\partial_\\eta\\ell_n=0$.',
          },
          {
            text: 'Pour $t\\ge\\alpha$ : $\\mathbb{P}_{n,\\theta}(\\hat\\alpha_n\\ge t)=\\mathbb{P}_{n,\\theta}(X_1\\ge t)^n=(\\alpha/t)^{n\\eta}$ : $\\hat\\alpha_n$ suit une Pareto d’indice $n\\eta$.',
            justification: 'Indépendance : le minimum dépasse $t$ ssi toutes les observations le dépassent.',
          },
          {
            text: 'Pour $n\\eta>2$ : $\\mathbb{E}[\\hat\\alpha_n-\\alpha]=\\frac\\alpha{n\\eta-1}$, $\\mathrm{Var}(\\hat\\alpha_n)=\\frac{n\\eta\\alpha^2}{(n\\eta-2)(n\\eta-1)^2}$ : EQM en $O(n^{-2})$, d’où la consistance.',
            justification: 'Moments d’une loi de Pareto ; inégalité de Markov appliquée à $(\\hat\\alpha_n-\\alpha)^2$.',
          },
          {
            text: '$W_n:=n\\eta\\log(\\hat\\alpha_n/\\alpha)$ vérifie $\\mathbb{P}(W_n\\le x)=1-e^{-x}$ : $W_n\\sim\\mathcal{E}(1)$ **exactement** pour tout $n$.',
            justification: 'Prendre $t=\\alpha e^{x/(n\\eta)}$ dans la loi du minimum.',
          },
          {
            text: '$n\\eta(\\hat\\alpha_n-\\alpha)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\alpha\\,\\mathcal{E}(1)$.',
            justification: 'Méthode-δ (Poly **ch.6**, Thm 1.7) en 0 avec vitesse $r_n=n\\eta$ et $u\\mapsto\\alpha e^u$, de dérivée $\\alpha{}$ en 0.',
          },
        ],
        conclusion: 'Vitesse $n$ (et non $\\sqrt n$), cohérente avec l’EQM en $O(n^{-2})$ ; loi limite **exponentielle**, non gaussienne ; $\\hat\\alpha_n\\ge\\alpha$ toujours (biais positif). Ni la borne de Cramér-Rao ni le Thm 1.7 ne s’appliquent : (R-1)–(R-2) sont violées. Même phénomène pour $\\mathcal{U}([0,\\theta])$ (ch.6, Ex. 1.5).',
      },
      {
        kind: 'example',
        id: 'ch7-ex-pc7-ex4',
        title: 'PC7 Ex. 4 — N(θ,1) avec Θ = ℝ₊ : la vraie valeur au bord',
        source: 'PC7 Ex. 4 (corrigé p. 22) ; Poly ch.7, remarque (a) après le Thm 1.4 et §4.9',
        setup: 'Suite de $n$-échantillons de $\\mathcal{N}(\\theta,1)$, $\\Theta:=\\mathbb{R}_+$ (le paramètre est contraint à être positif).',
        steps: [
          {
            text: '$\\ell_n(\\theta)=-\\frac n2\\ln(2\\pi)-\\frac12\\sum_k(X_k-\\theta)^2$ est une parabole concave de sommet $\\bar X_n$ ; sur $\\mathbb{R}_+$ : $\\hat\\theta_n=\\max(\\bar X_n,0)$.',
            justification: 'Si $\\bar X_n<0$, $\\ell_n$ est décroissante sur $\\mathbb{R}_+$ : maximum au **bord** (le score n’est pas nul).',
          },
          {
            text: 'Pour $\\theta>0$ : $\\sqrt n(\\hat\\theta_n-\\theta)=\\sqrt n(\\bar X_n-\\theta)-\\sqrt n\\bar X_n\\mathbb{1}_{\\{\\bar X_n<0\\}}$ et le second terme tend vers 0 en probabilité.',
            justification: '$\\mathbb{P}_{n,\\theta}(\\bar X_n<0)=\\Phi(-\\sqrt n\\theta)\\to0$ (LGN).',
          },
          {
            text: 'Donc $\\sqrt n(\\hat\\theta_n-\\theta)\\overset{\\mathbb{P}_{n,\\theta}}{\\Longrightarrow}\\mathcal{N}(0,1)$ pour $\\theta>0$.',
            justification: '$\\sqrt n(\\bar X_n-\\theta)\\sim\\mathcal{N}(0,1)$ exactement ; lemme de Slutsky.',
          },
          {
            text: 'En $\\theta=0$ : $\\sqrt n\\hat\\theta_n=\\sqrt n\\bar X_n\\mathbb{1}_{\\{\\bar X_n\\ge0\\}}$ a la loi de $\\max(Z,0)$, $Z\\sim\\mathcal{N}(0,1)$, pour tout $n$.',
            justification: '$\\sqrt n\\bar X_n\\sim\\mathcal{N}(0,1)$ sous $\\mathbb{P}_{n,0}$ et $\\{\\sqrt n\\bar X_n\\ge0\\}=\\{\\bar X_n\\ge0\\}$.',
          },
        ],
        conclusion: 'En $\\theta=0$ la loi limite **n’est pas gaussienne**, n’est pas centrée (moyenne $1/\\sqrt{2\\pi}\\approx0{,}40$) et **charge 0 avec masse $1/2$**. Le Thm 1.4 (hypothèses locales en $\\theta^\\star\\in\\Theta^o$) ne dit rien au bord.',
      },
      {
        kind: 'viz',
        id: 'ch7-s7-viz-hors',
        vizId: 'ch7-hors-regularite',
        caption: 'Hors régularité : Pareto (vitesse $n$, limite exponentielle) et paramètre au bord (atome de masse $1/2$ en 0).',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 8. Méthodes types et examen
  // -------------------------------------------------------------------------
  {
    id: 'ch7-s8-examen',
    title: '8. Méthodes types et « À l’examen »',
    role: 'liens-examen',
    intro: 'D’après le DIAGNOSTIC (§7–8), le ch.7 pèse ≈ 6 % de l’Examen 2025 : seuls servent l’énoncé $\\sqrt n(\\hat\\theta^{\\mathrm{MV}}_n-\\theta)\\Rightarrow\\mathcal{N}(0,1/\\mathbb{I}(\\theta))$, l’**optimalité asymptotique** de l’EMV et la **loi limite de la médiane**. Les théorèmes généraux de consistance (Thm 1.1–1.5) n’ont jamais été demandés, mais leurs hypothèses font de bonnes questions de cours.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch7-meth-z',
        type: 'methode',
        label: 'Méthode type',
        title: 'Normalité asymptotique d’un Z-estimateur scalaire (recette tirée des preuves du poly)',
        source: 'Synthèse du Poly ch.7 (Déf. 1.2, Thm 1.3, 1.4, 1.6) ; PC7 Ex. 5 Q5',
        statement: `1. **Centrage** : vérifier $\\mathbb{E}_{\\theta^\\star}[\\psi(\\theta^\\star,X_1)]=0$ (définition 1.2 ; symétrie + imparité pour une translation).
2. **Consistance** : Thm 1.3 (ou Thm 1.1 / Cor. 1.1 côté M), monotonie (PC7 Ex. 5), ou directement si l’estimateur est explicite (LGN + continuité).
3. **Hypothèses du Thm 1.4** : (i) $\\mathbb{E}[\\psi^2]<\\infty$ ; (ii) $C^1$ + domination locale de $\\psi'$ ; (iii) $\\mathbb{E}[\\psi']\\ne0$ ; et $\\theta^\\star$ **intérieur**.
4. **Calcul** : $v_\\psi(\\theta^\\star)=\\mathbb{E}_{\\theta^\\star}[\\psi^2(\\theta^\\star,X_1)]/(\\mathbb{E}_{\\theta^\\star}[\\psi'(\\theta^\\star,X_1)])^2$ ; pour l’EMV $v=1/\\mathbb{I}(\\theta^\\star)$ ($\\mathbb{I}$ par $\\mathbb{E}[\\dot\\ell^2]$ ou, plus court, $-\\mathbb{E}[\\ddot\\ell]$).
5. **IC asymptotique** : remplacer $v(\\theta^\\star)$ par $v(\\hat\\theta_n)$ (consistance + continuité + Slutsky), $\\big[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\sqrt{v(\\hat\\theta_n)/n}\\big]$.
6. **Garde-fou** : si le support dépend du paramètre ou si $\\theta^\\star$ est au bord de $\\Theta$, **ne pas** appliquer les Thm 1.4–1.7 (Ex. 1.10, PC7 Ex. 4).`,
        intuition: 'Chaque étape vaut des points : nommer le théorème et vérifier son hypothèse clé en une phrase.',
      },
      {
        kind: 'theorem',
        id: 'ch7-meth-emv',
        type: 'methode',
        label: 'Méthode type',
        title: 'La chaîne complète pour un EMV explicite (PC7 Ex. 2–3, Examen 2025)',
        source: 'PC7 Ex. 2 et Ex. 3 ; Poly ch.7 Thm 1.6 ; Poly ch.6 Thm 1.7 et Méthode 1.1',
        statement: `1. **EMV** : log-vraisemblance, annulation du score, maximum global (stricte concavité ou étude de signe).
2. **Consistance** : LGN sur la statistique exhaustive + continuité, ou « asymptotiquement normal ⇒ consistant ».
3. **Normalité asymptotique** — trois routes équivalentes (PC7 Ex. 2) : (a) Slutsky « LGN × TCL » ; (b) **Thm 1.6** avec $\\mathbb{I}(\\theta)$ ; (c) **méthode-δ** sur la moyenne empirique. Vérifier que les trois donnent $1/\\mathbb{I}(\\theta)$.
4. **IC** par pivot + plug-in (Slutsky).
5. **Comparaison** : toute autre méthode (moments, médiane) a une variance asymptotique $\\ge1/\\mathbb{I}$ si c’est un Z-estimateur régulier (Thm 1.7).`,
        intuition: 'La route (b) est la plus courte quand $\\ddot\\ell$ ne dépend pas de $x$ (Gamma : $\\ddot\\ell=-2/\\theta^2$).',
      },
      {
        kind: 'text',
        id: 'ch7-s8-exam2025',
        title: 'Ce qui est tombé — Examen 2025 Ex. 2 Q7–Q8 et Q10 (log-normale, ≈ 2 pts)',
        text: `Modèle $Y_i=\\ln X_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$ i.i.d., $\\theta=(\\mu,\\sigma^2)$, régularité admise.

- **Q7** (normalité asymptotique de $\\hat\\theta_{ML}$) : traitée au ch.6 par TCL multivarié + Slutsky ; **cohérence attendue avec le ch.7** : la covariance limite $\\mathrm{diag}(\\sigma^2,2\\sigma^4)$ est $\\mathbb{I}(\\theta)^{-1}$ avec $\\mathbb{I}(\\mu,\\sigma^2)=\\mathrm{diag}(1/\\sigma^2,1/(2\\sigma^4))$ (version vectorielle du Thm 1.6, compléments §4.4, hors programme).
- **Q8** (médiane) : $\\hat\\mu_{Med}=\\ln\\tilde X_n=\\mathrm{med}(Y_i)$ ; TCL du quantile rappelé par le sujet avec $\\alpha=1/2$, $f(\\mu)=1/\\sqrt{2\\pi\\sigma^2}$ : $\\sqrt n(\\hat\\mu_{Med}-\\mu)\\Rightarrow\\mathcal{N}(0,\\frac\\pi2\\sigma^2)$, $C=\\pi/2$. C’est la formule $1/(4q_{\\theta^\\star}(\\theta^\\star)^2)$ de l’Ex. 1.9 / §4.8.
- **Q10** (comparaison) : $v_{ML}=\\sigma^2=1/\\mathbb{I}(\\mu)$ — l’EMV est **asymptotiquement efficace** (Thm 1.7 ; énoncé en dimension 1, il s’étend à $\\theta=(\\mu,\\sigma^2)$ — hors programme — avec la borne $(\\mathbb{I}^{-1})_{11}=\\sigma^2$, puisque $\\mathbb{I}$ est diagonale) — $<v_{Med}=\\frac\\pi2\\sigma^2$ (efficacité relative $2/\\pi\\approx0{,}64$) ; $v_{Mom}=\\sigma^2+\\frac23\\sigma^6+\\dots$ : $\\approx v_{ML}$ quand $\\sigma\\to0$, explose comme $\\frac14e^{4\\sigma^2}$ quand $\\sigma\\to\\infty$. La médiane est **robuste** (fonction d’influence bornée, aucune hypothèse de moment).

**Rédaction attendue** : « Le modèle est régulier (admis) ; par le Thm 1.6 du ch.7, $\\sqrt n(\\hat\\mu_{ML}-\\mu)\\Rightarrow\\mathcal{N}(0,1/\\mathbb{I}(\\mu))$ avec $\\mathbb{I}(\\mu)=1/\\sigma^2$ ; par le Thm 1.7, aucun Z-estimateur régulier ne fait mieux. » (La médiane n’est pas un Z-estimateur régulier : pour elle, comparer directement $\\frac\\pi2\\sigma^2>\\sigma^2$.) Citer **le bon chapitre** pour chaque théorème (TCL et méthode-δ : ch.6).`,
      },
      {
        kind: 'text',
        id: 'ch7-s8-pc7',
        title: 'Ce que la PC7 entraîne',
        text: `- **Ex. 2 — Gamma$(2,\\theta)$** (intensité) : $\\hat\\theta_n=2/\\bar X_n$, biais $\\theta/(2n-1)>0$, EQM en $1/n$, $\\mathbb{I}(\\theta)=2/\\theta^2$, $\\sqrt n(\\hat\\theta_n-\\theta)\\Rightarrow\\mathcal{N}(0,\\theta^2/2)$ par **trois routes**, IC $[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\hat\\theta_n/\\sqrt{2n}]$.
- **Ex. 3 — log-normale $(\\theta,\\theta)$** : $\\hat\\theta_n=-\\frac12+\\sqrt{\\frac14+\\frac1n\\sum Y_i^2}$, variance asymptotique $\\frac{2\\theta^2}{1+2\\theta}=1/\\mathbb{I}(\\theta)<\\theta$ (mieux que $\\bar Y_n$).
- **Ex. 4 — bord de $\\Theta$** : $\\max(Z,0)$ en $\\theta=0$.
- **Ex. 5 — robustesse** : $V[\\gamma]=\\int\\gamma^2f/(\\int\\gamma'f)^2$ ; gaussien : $V[\\gamma_\\infty]=\\sigma^2$, $V[\\gamma_0]=\\pi\\sigma^2/2$, $k\\mapsto V[\\gamma_k]$ décroissante ; contaminé ($\\varepsilon=0{,}01$, $\\tau=10$) : $V[\\gamma_\\infty]=1{,}99$ explose avec $\\tau$, $V[\\gamma_k]$ reste bornée (minimum $\\approx1{,}06$ vers $k\\approx2$).
- **Ex. 1 — Pitman** (★★★, au-delà du poly) : pente $\\mu'(\\theta_0)/\\sigma$ ; signe : $2q(0)$, Student : $1/\\sigma_q$ ; cas gaussien rapport $\\sqrt{2/\\pi}\\approx0{,}80$ (voir §9).`,
      },
      {
        kind: 'text',
        id: 'ch7-s8-pieges',
        title: 'Pièges relevés (DIAGNOSTIC §6 et corrigés PC7)',
        text: `- **Convergence simple ≠ uniforme** : « LGN en chaque $\\theta$ ⇒ consistance de l’argmax » est faux ; il faut (H-1) **et** (H-2).
- **Maximum unique ≠ maximum isolé** hors d’un compact.
- **Carré** au dénominateur de $v_\\psi$ ; condition $\\mathbb{E}[\\psi']\\ne0$.
- **$1/\\mathbb{I}(\\theta)$ et non $1/(n\\mathbb{I}(\\theta))$** pour la loi limite de $\\sqrt n(\\hat\\theta_n-\\theta)$ ; $\\mathbb{I}$ = information d’**une** observation.
- **Médiane** : Z-estimateur **non couvert** par le Thm 1.4 ($\\operatorname{signe}$ non dérivable) ; sa variance $1/(4f(\\theta)^2)$ vient des statistiques d’ordre.
- **Support dépendant de $\\theta$** (uniforme, Pareto) : vitesse $n$, limite non gaussienne ; ni Cramér-Rao ni Thm 1.6–1.7.
- **Bord de $\\Theta$** : hypothèses locales en $\\theta^\\star\\in\\Theta^o$ ; au bord, limite $\\max(Z,0)$.
- **Optimalité** limitée aux Z-estimateurs **réguliers** (Hodges) et aux variances **asymptotiques** (≠ Cramér-Rao à $n$ fixé).
- **Gamma en intensité** : $\\mathbb{E}[X]=2/\\theta$ pour $\\Gamma(2,\\theta)$ ; $\\mathbb{E}[1/\\bar X_n]\\ne1/\\mathbb{E}[\\bar X_n]$ (Jensen) d’où le biais.
- **Homonymies** : TCL, Slutsky, méthode-δ = ch.6 ; ne pas écrire « par le Thm 1.7 » pour la méthode-δ dans une copie sur le ch.7.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 9. Compléments hors programme
  // -------------------------------------------------------------------------
  {
    id: 'ch7-s9-hp',
    title: '9. Compléments (hors programme) : solutions approchées, cas non compact, cas vectoriel, efficacité, score de Fisher, Cauchy, Pitman',
    role: 'complements',
    scope: 'hors-programme',
    intro: 'Section « 4 Les compléments » du poly (p. 34–41) : « Les contenus de cette partie ne sont pas exigibles. » Résumés concis.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch7-thm-4-1-4-2',
        type: 'theoreme',
        label: 'Théorèmes 4.1 et 4.2',
        title: 'Consistance avec solutions approchées ; cas non compact',
        source: 'Poly ch.7, Compléments §4.1–4.2, Thm 4.1 et 4.2, p. 34–35',
        scope: 'hors-programme',
        hypotheses: [
          'Thm 4.1 : (H-1), (H-2) et, au lieu de (H-3), des v.a. $\\rho_n\\ge0$ avec $\\rho_n\\to0$ en probabilité et $\\liminf_n\\mathbb{P}_{n,\\theta^\\star}(\\widehat{M}_n(\\hat\\theta_n)\\ge\\widehat{M}_n(\\theta^\\star)-\\rho_n)=1$.',
          'Thm 4.2 : $\\Theta=\\mathbb{R}^d$ ; $m(\\cdot,x)$ continue ; domination sur tout compact ; maximum strict ; $\\int\\sup_{\\|\\theta\\|\\ge a}|m|\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}<\\infty$ ; $\\sup_{\\|\\theta\\|>b}m(\\theta,x)\\to-\\infty$ quand $b\\to\\infty$.',
        ],
        statement: 'Sous ces hypothèses, toute suite de M-estimateurs (au sens approché) est consistante. Preuve du Thm 4.2 : par convergence monotone et LGN, $\\sup_{\\|\\theta\\|>b}\\widehat{M}_n(\\theta)<\\widehat{M}_n(\\theta^\\star)-\\rho_n$ avec probabilité $\\to1$ pour $b$ grand : l’estimateur reste dans le compact $\\overline{\\mathrm{B}(0,b)}$, où l’on applique le Cor. 1.1.',
        intuition: 'Exemple 4.1 : $m(\\theta,x)=-|x-\\theta|$ (médiane) vérifie (i)–(v) dès que $F$ est symétrique intégrable avec $F(\\eta)>1/2$ pour $\\eta>0$ : **la médiane empirique est consistante sans moment d’ordre deux**. Thm 4.3 : version pour l’EMV ($\\Theta$ compact, continuité, domination de $\\sup_\\Theta|\\log p_\\theta|$, identifiabilité).',
      },
      {
        kind: 'theorem',
        id: 'ch7-thm-4-4',
        type: 'theoreme',
        label: 'Théorème 4.4',
        title: 'Loi limite des Z-estimateurs, cas vectoriel (forme sandwich)',
        source: 'Poly ch.7, Compléments §4.4, Thm 4.4, p. 36–37',
        scope: 'hors-programme',
        hypotheses: [
          '$\\psi(\\cdot,x)$ $C^1$ sur $\\mathcal{V}(\\theta^\\star)$, dérivées dominées par $g$ intégrable ; $\\mathrm{J}_\\psi(\\theta^\\star):=\\big[\\int\\partial_{\\theta^{(s)}}\\psi_r(\\theta^\\star,x)\\,\\mathbb{Q}_{\\theta^\\star}(\\mathrm{d}x)\\big]_{r,s}$ **inversible**.',
          '$\\int\\|\\psi(\\theta^\\star,x)\\|^2\\mathbb{Q}_{\\theta^\\star}(\\mathrm{d}x)<\\infty$, $\\int\\psi(\\theta^\\star,x)\\mathbb{Q}_{\\theta^\\star}(\\mathrm{d}x)=0$ ; $\\{\\hat\\theta_n\\}$ consistante, $\\sqrt n\\,\\widehat\\Psi_n(\\hat\\theta_n)\\to0$ en probabilité.',
        ],
        statement: '$$\\sqrt n(\\hat\\theta_n-\\theta^\\star)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}\\Big(0,[\\mathrm{J}_\\psi(\\theta^\\star)]^{-1}G_\\psi(\\theta^\\star)[\\mathrm{J}_\\psi(\\theta^\\star)]^{-\\top}\\Big),\\qquad G_\\psi:=\\int\\psi\\psi^\\top\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}.$$\n\nPour l’EMV d’un modèle régulier, $G_\\ell=\\mathbb{I}$ et $\\mathrm{J}_\\ell=-\\mathbb{I}$ : $\\sqrt n(\\hat\\theta_n^{\\mathrm{MV}}-\\theta^\\star)\\Rightarrow\\mathcal{N}(0,\\mathbb{I}^{-1}(\\theta^\\star))$.',
        intuition: 'Le quotient devient un produit par l’inverse d’une jacobienne ; en dimension 1 on retrouve $v_\\psi$. C’est ce qui justifie la cohérence $\\Sigma=\\mathbb{I}(\\theta)^{-1}$ dans l’Examen 2025 Q7.',
      },
      {
        kind: 'text',
        id: 'ch7-s9-regions',
        title: '§4.5 — Régions de confiance asymptotiques fondées sur l’EMV',
        scope: 'hors-programme',
        text: `Modèle régulier de dimension $d$, $\\chi^2_{1-\\alpha}(d)$ quantile de $\\chi^2(d)$. Quatre régions de niveau asymptotique $1-\\alpha$ :

- information au point courant : $n(\\hat\\theta_n^{\\mathrm{MV}}-\\theta)^\\top\\mathbb{I}(\\theta)(\\hat\\theta_n^{\\mathrm{MV}}-\\theta)\\le\\chi^2_{1-\\alpha}(d)$ ;
- information à l’estimateur (Wald) : remplacer $\\mathbb{I}(\\theta)$ par $\\mathbb{I}(\\hat\\theta_n^{\\mathrm{MV}})$ (ellipsoïde ; continuité + Slutsky) ;
- **information observée** $\\mathbb{I}_n(\\theta):=-\\frac1n\\sum_i\\mathrm{H}_\\ell(\\theta,X_i)$ évaluée en $\\hat\\theta_n^{\\mathrm{MV}}$ ;
- **rapport de vraisemblance** : $2n\\,\\ell_n(\\hat\\theta_n^{\\mathrm{MV}})-2n\\,\\ell_n(\\theta^\\star)\\Rightarrow\\chi^2(d)$ (Taylor à l’ordre 2 autour du maximum).

Pour $g(\\theta)$ : IC $\\big[g(\\hat\\theta_n^{\\mathrm{MV}})\\pm z_{1-\\alpha/2}\\sigma_g(\\hat\\theta_n^{\\mathrm{MV}})/\\sqrt n\\big]$, $\\sigma_g^2=(\\nabla g)^\\top\\mathbb{I}^{-1}\\nabla g$ (méthode-δ).`,
      },
      {
        kind: 'text',
        id: 'ch7-s9-efficacite',
        title: '§4.6 — Efficacité asymptotique (Déf. 4.1) et conjecture de Fisher',
        scope: 'hors-programme',
        text: 'Parmi les suites asymptotiquement normales **en tout $\\theta$** (avec $v$ continue, $>0$), $\\widehat\\theta_{n,1}$ est **plus efficace** que $\\widehat\\theta_{n,2}$ si $v_1\\le v_2$ partout avec inégalité stricte en un point ; une suite est **asymptotiquement efficace dans une classe** si aucune suite de la classe n’est plus efficace (Déf. 4.1). **Conjecture de Fisher (1922)** : (1) l’EMV a pour variance asymptotique $1/\\mathbb{I}$ — vrai (Thm 1.7) ; (2) toute suite asymptotiquement normale a $v\\ge1/\\mathbb{I}$ — **faux** en général : contre-exemple de l’**estimateur de Hodges** (ch.6, §4.5), super-efficace en 0 mais de risque quadratique arbitrairement mauvais au voisinage de 0. Comparer en un point n’est pas une notion d’optimalité satisfaisante ; il faut comparer les risques sur des voisinages.',
      },
      {
        kind: 'theorem',
        id: 'ch7-thm-4-5',
        type: 'theoreme',
        label: 'Lemme 4.1 et Théorème 4.5',
        title: 'Méthode du score de Fisher : un pas de Newton suffit',
        source: 'Poly ch.7, Compléments §4.7, Lemme 4.1 et Thm 4.5, p. 39–40',
        scope: 'hors-programme',
        hypotheses: ['Modèle régulier ; $\\{\\hat\\theta_n\\}$ suite **asymptotiquement normale** (par exemple la médiane pour Cauchy).'],
        statement: 'Avec $\\nabla\\ell_n(\\theta):=\\frac1n\\sum_i\\nabla\\ell(\\theta,X_i)$ et $\\mathbb{I}_n$ l’information observée,\n\n$$\\widetilde\\theta_n:=\\hat\\theta_n+\\mathbb{I}_n(\\hat\\theta_n)^{-1}\\nabla\\ell_n(\\hat\\theta_n)\\quad\\text{vérifie}\\quad\\sqrt n(\\widetilde\\theta_n-\\theta^\\star)\\overset{\\mathbb{P}_{n,\\theta^\\star}}{\\Longrightarrow}\\mathcal{N}(0,\\mathbb{I}^{-1}(\\theta^\\star)).$$',
        intuition: 'Lemme 4.1 : $\\sqrt n\\{\\nabla\\ell_n(\\hat\\theta_n)-\\nabla\\ell_n(\\theta^\\star)+\\mathbb{I}(\\theta^\\star)(\\hat\\theta_n-\\theta^\\star)\\}\\to0$ en probabilité (linéarisation de l’équation de vraisemblance). Un estimateur explicite mais sous-optimal (médiane, $v=\\pi^2/4$) devient efficace ($v=2$) après un seul pas de Newton.',
      },
      {
        kind: 'text',
        id: 'ch7-s9-cauchy',
        title: '§4.8 — Loi limite des quantiles empiriques (admise) et Cauchy en détail',
        scope: 'hors-programme',
        text: `Si $F$ est dérivable en $Q(p)$ avec $F'(Q(p))>0$ et $\\sqrt n(k_n/n-p)\\to0$ :

$$\\sqrt n\\big(X_{k_n:n}-Q(p)\\big)\\Longrightarrow\\mathcal{N}\\Big(0,\\frac{p(1-p)}{[F'(Q(p))]^2}\\Big).$$

Pour $p=1/2$ et une loi symétrique autour de $\\theta^\\star$ : $\\sqrt n(\\widehat\\theta_n^{\\mathrm{med}}-\\theta^\\star)\\Rightarrow\\mathcal{N}(0,1/\\{4q_{\\theta^\\star}(\\theta^\\star)^2\\})$ ; Cauchy : $\\pi^2/4$ ; gaussienne $\\mathcal{N}(\\mu,\\sigma^2)$ : $\\frac\\pi2\\sigma^2$ (c’est le rappel de l’Examen 2025). Efficacité relative pour Cauchy $8/\\pi^2\\simeq0{,}81$.`,
      },
      {
        kind: 'text',
        id: 'ch7-s9-au-dela',
        title: '§4.9 — Trois façons de sortir du cadre régulier',
        scope: 'hors-programme',
        text: '1. **Le paramètre gouverne le support** (uniforme, Pareto) : $\\theta\\mapsto p_\\theta(x)$ discontinue, vitesse $n$, loi limite exponentielle. 2. **La vraie valeur est sur la frontière** ($\\mathcal{N}(\\theta,1)$, $\\Theta=\\mathbb{R}_+$, PC7 Ex. 4) : limite $\\max(W,0)$. 3. **La fonction d’influence n’est pas régulière** (médiane) : l’estimateur reste consistant (Ex. 4.1) et asymptotiquement normal (§4.8), par les statistiques d’ordre ou la monotonie (PC7 Ex. 5). « L’absence de régularité de $\\psi$ n’est donc pas une absence de régularité du modèle, et elle se contourne. »',
      },
      {
        kind: 'text',
        id: 'ch7-s9-pitman',
        title: 'PC7 Ex. 1 — Comparer deux tests par leur puissance locale (approche de Pitman)',
        scope: 'hors-programme',
        text: `Deux suites de tests (signe $\\phi_{n,1}$ et Student $\\phi_{n,2}$) de $H_0:\\theta=\\theta_0$ contre $H_1:\\theta>\\theta_0$ dans un modèle de translation sont **toutes deux** consistantes de niveau asymptotique $\\alpha$ : la consistance ne suffit pas à les départager. Le long d’alternatives locales $\\theta_n=\\theta_0+h_n/\\sqrt n$, $h_n\\to h>0$, si $\\sqrt n(U_n-\\mu(\\theta_n))\\Rightarrow\\mathcal{N}(0,\\sigma^2)$ sous $\\mathbb{P}_{n,\\theta_n}$ et sous $\\mathbb{P}_{n,\\theta_0}$, et $C_n\\to\\sigma$ :

$$\\lim_n\\mathbb{P}_{n,\\theta_n}(\\mathcal{R}_n)=1-\\Phi\\Big(z_{1-\\alpha}-h\\frac{\\mu'(\\theta_0)}\\sigma\\Big).$$

Outils (au-delà du poly) : rapport de vraisemblance $\\prod_kq_{\\theta_n}(X_k)/q_{\\theta_0}(X_k)\\Rightarrow\\exp(h\\mathcal{N}(0,\\mathbb{I}(\\theta_0))-\\frac{h^2}2\\mathbb{I}(\\theta_0))$, d’espérance 1, d’où la **contiguïté** ; Lindeberg-Feller. Pentes : signe $2q(0)$, Student $1/\\sigma_q$ ; gaussien : rapport $\\sqrt{2/\\pi}\\approx0{,}80$, soit $\\pi/2\\approx1{,}57$ fois plus d’observations pour le test du signe. Le signe gagne pour des lois pointues à queues lourdes (mélange d’échelles), Student pour des lois creuses en 0 (mélange bimodal).`,
      },
    ],
  },
]
