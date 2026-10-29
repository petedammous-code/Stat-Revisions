import type { CourseSection } from '../types'

/** Sections 5 à 10 du cours : modèle régulier et information de Fisher, Cramér-Rao, outils, méthodes types, examen, compléments. */
export const coursePart2: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 5. Modèle régulier, score, information de Fisher
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s5-fisher',
    title: '5. Modèle régulier, score et information de Fisher',
    role: 'definitions',
    intro: 'On cherche une borne inférieure valable pour **tous** les estimateurs sans biais à la fois. Un calcul heuristique la fournit ; il **dicte les hypothèses** (dérivations sous l’intégrale, moments d’ordre 2) qui définissent le modèle régulier, le score et l’information de Fisher.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch3-heuristique',
        type: 'remarque',
        label: 'Remarque (§1.7)',
        title: 'Une borne inférieure pour la variance : le calcul heuristique',
        source: 'Poly ch.3, §1.7, p. 18',
        hypotheses: [
          'Modèle dominé $\\{p_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\}$, $\\Theta$ **ouvert** de $\\mathbb{R}$.',
          '$T$ sans biais de $\\theta$.',
          'Dérivations sous l’intégrale **admises provisoirement**.',
        ],
        statement: `$$\\mathrm{Var}_\\theta(T(Z))\\ \\ge\\ \\frac{1}{\\mathrm{Var}_\\theta\\big(\\frac{\\partial}{\\partial\\theta}\\log p_\\theta(Z)\\big)},\\qquad\\text{et, pour }T\\text{ sans biais de }g(\\theta):\\quad\\mathrm{Var}_\\theta(T(Z))\\ \\ge\\ \\frac{\\{g'(\\theta)\\}^2}{\\mathrm{Var}_\\theta\\big(\\frac{\\partial}{\\partial\\theta}\\log p_\\theta(Z)\\big)}.$$`,
        intuition: 'Résultat remarquable : une borne inférieure fixée **par le modèle seul**, alors que la statistique fournit d’ordinaire des bornes supérieures sur l’erreur d’un estimateur particulier. Le calcul n’est **pas** une preuve (dérivations admises) : la preuve rigoureuse est le Thm 1.1.',
        proof: [
          { text: '$\\theta=\\mathbb{E}_\\theta[T(Z)]=\\int_{\\mathsf{Z}}T(z)p_\\theta(z)\\,\\mu(\\mathrm{d}z)$.', justification: '$T$ sans biais.' },
          { text: '$1=\\int T(z)\\frac{\\partial}{\\partial\\theta}p_\\theta(z)\\,\\mu(\\mathrm{d}z)$.', justification: 'Dériver en $\\theta$ (1re dérivation sous l’intégrale, **admise** ; elle dépend de l’estimateur).' },
          { text: '$1=\\int(T(z)-\\theta)\\big(\\frac{\\partial}{\\partial\\theta}\\log p_\\theta(z)\\big)p_\\theta(z)\\,\\mu(\\mathrm{d}z)=\\mathbb{E}_\\theta\\big[(T(Z)-\\theta)\\frac{\\partial}{\\partial\\theta}\\log p_\\theta(Z)\\big]$.', justification: 'Soustraire $\\theta\\int\\partial_\\theta p_\\theta\\,\\mathrm{d}\\mu=\\theta\\,\\partial_\\theta\\int p_\\theta\\,\\mathrm{d}\\mu=0$ (2e dérivation sous l’intégrale, elle dépend du modèle) ; $\\partial_\\theta p_\\theta=(\\partial_\\theta\\log p_\\theta)p_\\theta$.' },
          { text: '$1\\le\\mathbb{E}_\\theta[(T(Z)-\\theta)^2]\\cdot\\mathbb{E}_\\theta\\big[\\big(\\frac{\\partial}{\\partial\\theta}\\log p_\\theta(Z)\\big)^2\\big]=\\mathrm{Var}_\\theta(T(Z))\\cdot\\mathrm{Var}_\\theta\\big(\\frac{\\partial}{\\partial\\theta}\\log p_\\theta(Z)\\big)$.', justification: 'Élever au carré, **Cauchy-Schwarz** ; $T$ sans biais ; la dérivée de la log-vraisemblance est d’espérance nulle (étape 3).' },
          { text: 'Même calcul pour $g(\\theta)$ : $g\'(\\theta)=\\mathbb{E}_\\theta\\big[(T(Z)-g(\\theta))\\frac{\\partial}{\\partial\\theta}\\log p_\\theta(Z)\\big]$, d’où la seconde borne.', justification: 'Remplacer $\\theta$ par $g(\\theta)$ dans l’identité d’absence de biais.' },
        ],
        pitfalls: ['Le calcul dicte **trois** besoins : régularité du **modèle** (dériver $\\int p_\\theta$), régularité de l’**estimateur** (dériver $\\int Tp_\\theta$), moments d’ordre 2 (Cauchy-Schwarz).'],
      },
      {
        kind: 'theorem',
        id: 'ch3-def-1-6',
        type: 'definition',
        label: 'Définition 1.6',
        title: 'Modèle régulier',
        source: 'Poly ch.3, Déf. 1.6, p. 19',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\{p_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\})$ modèle paramétrique, **$\\Theta$ ouvert de $\\mathbb{R}^d$**.'],
        statement: `Le modèle est **régulier** s’il vérifie :

- **(i)** il est dominé par une mesure $\\sigma$-finie $\\mu$, $\\mathbb{P}_\\theta=p_\\theta\\cdot\\mu$ ; on pose $\\ell(\\theta,z):=\\log p_\\theta(z)$ (éq. (2)) ;
- **(ii)** pour $\\mu$-presque tout $z$, $\\theta\\mapsto p_\\theta(z)$ est **deux fois continûment différentiable** sur $\\Theta$ ;
- **(iii)** pour tout $\\theta_0\\in\\Theta$, il existe un voisinage $\\mathcal{V}_0$ de $\\theta_0$ et $h_0,h_1\\ge0$ mesurables avec $\\int_{\\mathsf{Z}}\\{1+h_1(z)\\}h_0(z)\\,\\mu(\\mathrm{d}z)<\\infty$ (éq. (3)) et, pour tout $\\theta\\in\\mathcal{V}_0$ et $\\mu$-p.t. $z$ (éq. (4)) :
  $\\lVert\\nabla_\\theta\\ell(\\theta,z)\\rVert^2\\le h_1(z)$, $\\lVert\\mathrm{H}_\\ell(\\theta,z)\\rVert\\le h_1(z)$, $p_\\theta(z)\\le h_0(z)$ ;
- **(iv)** pour tout $\\theta$, la matrice $\\mathbb{E}_\\theta[\\mathrm{H}_\\ell(\\theta,Z)]$ (bien définie par (iii)) est **inversible**.`,
        intuition: 'La densité dépend assez régulièrement de $\\theta$ pour qu’on la dérive, **et** pour que la dérivation s’échange avec l’intégrale (dominations locales + Prop. 2.2). Toutes les conditions portent sur $\\theta\\mapsto p_\\theta(z)$, pas sur $z\\mapsto p_\\theta(z)$.',
        pitfalls: ['$\\Theta$ doit être **ouvert** : Bernoulli s’écrit sur $]0,1[$, pas $[0,1]$.', 'La condition porte sur $\\lVert\\nabla_\\theta\\ell\\rVert^2$ (au carré) mais sur $\\lVert\\mathrm{H}_\\ell\\rVert$ (non au carré).', 'En exercice, la régularité est le plus souvent **admise** (« régularité admise » dans l’Examen 2025).', 'Version allégée des slides (suffisante pour Cramér-Rao) : différentiabilité continue de $\\theta\\mapsto p_\\theta(z)$, $\\nabla_\\theta\\int p_\\theta\\,\\mathrm{d}\\mu=\\int\\nabla_\\theta p_\\theta\\,\\mathrm{d}\\mu=0$, et $\\int\\lVert\\nabla_\\theta\\ell\\rVert^2p_\\theta\\,\\mathrm{d}\\mu<\\infty$. La Déf. 1.6, plus forte, donne **en outre** l’expression par la hessienne (Prop. 1.2 (ii)).'],
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-12',
        title: 'Exemple 1.12 — Quels modèles sont réguliers ?',
        source: 'Poly ch.3, Ex. 1.12, p. 20',
        setup: 'Réguliers (affirmé) : exponentiel $\\{\\mathcal{E}(\\theta),\\theta>0\\}$, gaussien $\\{\\mathcal{N}(\\mu,\\sigma^2)\\}$, Bernoulli sur $]0,1[$, Poisson, géométrique sur $]0,1[$. Montrer que l’uniforme $\\{\\mathcal{U}([0,\\theta]),\\theta>0\\}$ ne l’est pas.',
        steps: [
          { text: '$p_\\theta(x)=\\theta^{-1}\\mathbb{1}_{[0,\\theta]}(x)$.', justification: 'Densité de l’uniforme par rapport à Lebesgue.' },
          { text: 'Pour $x>0$ fixé, $\\theta\\mapsto p_\\theta(x)$ vaut $0$ sur $]0,x[$ et $1/\\theta$ sur $[x,+\\infty[$ : elle saute de $0$ à $1/x$ en $\\theta=x$.', justification: 'Regarder la dépendance **en le paramètre**, à $x$ fixé.' },
          { text: 'Elle est discontinue en $\\theta=x$ : (ii) est en défaut, et déjà la simple différentiabilité.', justification: 'Une fonction discontinue n’est pas dérivable.' },
        ],
        conclusion: 'Un modèle dont le **support dépend du paramètre** n’est en général pas régulier. Conséquence : Cramér-Rao ne s’y applique pas (Ex. 1.16, PC3 Ex. 3).',
      },
      {
        kind: 'theorem',
        id: 'ch3-def-1-7',
        type: 'definition',
        label: 'Définition 1.7',
        title: 'Log-vraisemblance et score',
        source: 'Poly ch.3, Déf. 1.7, p. 20',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\{p_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\})$ modèle régulier.'],
        statement: 'Pour $\\theta\\in\\Theta$, $z\\in\\mathsf{Z}$ : **log-vraisemblance** $\\ell(\\theta,z):=\\log p_\\theta(z)$ et **score** $S(\\theta,z):=\\nabla_\\theta\\ell(\\theta,z)\\in\\mathbb{R}^d$.',
        intuition: 'En dimension 1, le score est la **pente** de la log-vraisemblance en $\\theta$. En moyenne sous $\\mathbb{P}_\\theta$ il est nul (compensation entre observations) ; ce qui reste est sa **dispersion** : des valeurs souvent grandes = observations discriminantes = paramètre facile à cerner. C’est ce que mesure l’information de Fisher.',
      },
      {
        kind: 'theorem',
        id: 'ch3-def-1-8',
        type: 'definition',
        label: 'Définition 1.8',
        title: 'Information de Fisher',
        source: 'Poly ch.3, Déf. 1.8, p. 20',
        hypotheses: ['Modèle régulier $(\\mathsf{Z},\\mathcal{Z},\\{p_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\})$.'],
        statement: `$\\mathbb{I}:\\Theta\\to\\mathrm{Mat}_d(\\mathbb{R})$,

$$\\mathbb{I}(\\theta):=\\mathbb{E}_\\theta\\big[\\nabla_\\theta\\ell(\\theta,Z)\\,\\nabla_\\theta\\ell(\\theta,Z)^\\top\\big]=\\mathbb{E}_\\theta\\big[S(\\theta,Z)S(\\theta,Z)^\\top\\big].$$

Bien définie et indépendante de la mesure dominante (Lemme 2.1). Le score étant centré, $\\mathbb{I}(\\theta)$ est la **matrice de covariance du score** ; en dimension 1, $\\mathbb{I}(\\theta)=\\mathbb{E}_\\theta\\big[\\big(\\frac{\\partial}{\\partial\\theta}\\ell(\\theta,Z)\\big)^2\\big]=\\mathrm{Var}_\\theta(S(\\theta,Z))$.`,
        intuition: 'Dispersion du score = pouvoir discriminant des données. Point d’histoire : R. A. Fisher (1890–1962) l’introduit dans ses articles de 1922 et 1925 sur le maximum de vraisemblance.',
        pitfalls: ['$\\mathbb{I}$ dépend du **modèle**, nombre d’observations inclus : ne pas confondre $\\mathbb{I}_1$ (une observation) et l’information du $n$-échantillon.'],
      },
      {
        kind: 'theorem',
        id: 'ch3-prop-1-2',
        type: 'proposition',
        label: 'Proposition 1.2',
        title: 'Score centré, information par la hessienne, additivité',
        source: 'Poly ch.3, Prop. 1.2, p. 21 (preuve p. 21–22)',
        hypotheses: ['$(\\mathsf{Z},\\mathcal{Z},\\{p_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\})$ modèle **régulier** (Déf. 1.6).', 'Pour (iii) : deux modèles réguliers de **même** $\\Theta$, observations **indépendantes** (modèle produit).'],
        statement: `- **(i)** Score centré : $\\mathbb{E}_\\theta\\big[\\nabla_\\theta\\ell(\\theta,Z)\\big]=0$ pour tout $\\theta$ (éq. (6)).
- **(ii)** $\\mathbb{I}(\\theta)=-\\mathbb{E}_\\theta\\big[\\mathrm{H}_\\ell(\\theta,Z)\\big]$ (éq. (7)).
- **(iii)** Additivité : l’information du modèle produit $\\{\\mathbb{P}_{1,\\theta}\\otimes\\mathbb{P}_{2,\\theta}\\}$ vaut $\\mathbb{I}_{12}=\\mathbb{I}_1+\\mathbb{I}_2$. Pour un $n$-échantillon du modèle régulier $\\mathcal{M}$ : $\\mathbb{I}_{\\mathcal{M}^n}(\\theta)=n\\,\\mathbb{I}_{\\mathcal{M}}(\\theta)$.`,
        intuition: '(i) le score est en moyenne nul ; (ii) l’information est la **courbure moyenne** (changée de signe) de la log-vraisemblance ; (iii) des observations indépendantes **additionnent** leur information.',
        proof: [
          { text: '$\\nabla_\\theta\\ell(\\theta,z)=\\frac1{p_\\theta(z)}\\nabla_\\theta p_\\theta(z)$ (éq. (8)).', justification: 'Dérivée du logarithme, pour $\\mu$-p.t. $z$.' },
          { text: '$\\mathrm{H}_\\ell(\\theta,z)=\\frac1{p_\\theta(z)}\\mathrm{H}_p(\\theta,z)-\\nabla_\\theta\\ell(\\theta,z)\\nabla_\\theta\\ell(\\theta,z)^\\top$ (éq. (9)).', justification: 'Dériver (8) : dérivée d’un quotient, puis réutiliser (8).' },
          { text: '(i) $\\mathbb{E}_\\theta[\\nabla_\\theta\\ell(\\theta,Z)]=\\int\\nabla_\\theta\\ell\\,p_\\theta\\,\\mathrm{d}\\mu=\\int\\nabla_\\theta p_\\theta\\,\\mathrm{d}\\mu\\overset{(*)}{=}\\nabla_\\theta\\int p_\\theta\\,\\mathrm{d}\\mu=\\nabla_\\theta1=0$.', justification: '(8) puis interversion $(*)$, justifiée à l’étape 5.' },
          { text: '(ii) $\\mathbb{E}_\\theta[\\mathrm{H}_\\ell(\\theta,Z)]=\\int\\mathrm{H}_p(\\theta,z)\\,\\mu(\\mathrm{d}z)-\\int\\nabla_\\theta\\ell\\nabla_\\theta\\ell^\\top p_\\theta\\,\\mathrm{d}\\mu\\overset{(**)}{=}0-\\mathbb{I}(\\theta)$.', justification: 'Intégrer (9) contre $p_\\theta\\mu$ ; $\\int\\mathrm{H}_p\\,\\mathrm{d}\\mu$ est la hessienne de $\\theta\\mapsto\\int p_\\theta\\,\\mathrm{d}\\mu=1$, donc nulle (interversion $(**)$, étape 6).' },
          { text: 'Justification de $(*)$ : $\\lVert\\nabla_\\theta p_\\theta(z)\\rVert=\\lVert\\nabla_\\theta\\ell\\rVert p_\\theta\\le(1+\\lVert\\nabla_\\theta\\ell\\rVert^2)p_\\theta\\le\\{1+h_1(z)\\}h_0(z)$ sur $\\mathcal{V}_0$, intégrable par (3).', justification: '$x\\le1+x^2$, dominations (4), puis Prop. 2.2 (dérivation sous l’intégrale) coordonnée par coordonnée.' },
          { text: 'Justification de $(**)$ : $\\lVert\\mathrm{H}_p\\rVert\\le(\\lVert\\mathrm{H}_\\ell\\rVert+\\lVert\\nabla_\\theta\\ell\\rVert^2)p_\\theta\\le2h_1h_0$, intégrable.', justification: '(9), identité $\\lVert aa^\\top\\rVert=\\lVert a\\rVert^2$ (Frobenius), (4) ; Prop. 2.2 sur chaque coordonnée de $\\nabla_\\theta p_\\theta$.' },
          { text: '(iii) $\\ell_{12}(\\theta,(z_1,z_2))=\\ell_1(\\theta,z_1)+\\ell_2(\\theta,z_2)$, donc $\\mathrm{H}_{\\ell_{12}}=\\mathrm{H}_{\\ell_1}+\\mathrm{H}_{\\ell_2}$ ; espérance sous $\\mathbb{P}_{1,\\theta}\\otimes\\mathbb{P}_{2,\\theta}$ et (ii) : $\\mathbb{I}_{12}=\\mathbb{I}_1+\\mathbb{I}_2$. Le cas du $n$-échantillon s’obtient par récurrence.', justification: 'Log d’un produit de densités (indépendance) ; linéarité de l’espérance ; facteurs identiques.' },
        ],
        pitfalls: ['(ii) exige les hypothèses fortes de la Déf. 1.6.', 'Ne pas oublier le **signe moins** dans (ii).', 'L’additivité exige l’**indépendance** et le **même** paramètre ; en régression (PC3 Ex. 2) les lois diffèrent : pas de factorisation $n\\mathbb{I}_1$, on calcule directement.'],
      },
      {
        kind: 'text',
        id: 'ch3-s5-remarques-info',
        title: 'Remarques (p. 21–22) — une caractéristique du modèle, définie positive, toujours le même schéma',
        text: `- **Caractéristique du modèle** : notation complète $\\mathbb{I}(\\mathcal{M},\\theta)$ ; $\\mathbb{I}_1(\\theta)$ ou $\\mathbb{I}_{\\mathcal{M}}(\\theta)$ pour une observation, $\\mathbb{I}_{\\mathcal{M}^n}(\\theta)=n\\,\\mathbb{I}_{\\mathcal{M}}(\\theta)$ pour le $n$-échantillon.
- **Définie positive** : $\\nabla_\\theta\\ell\\nabla_\\theta\\ell^\\top$ est symétrique positive, donc $\\mathbb{I}(\\theta)$ aussi ; par (7) et la condition (iv), elle est **inversible**, donc **définie positive** : c’est ce qui donne un sens à $\\mathbb{I}(\\theta)^{-1}$ dans Cramér-Rao.
- **Schéma de calcul** (toujours le même) : (1) écrire la densité ; (2) prendre le log ; (3) dériver ; (4) calculer soit la **variance du score**, soit **l’espérance de la dérivée seconde changée de signe** (souvent plus court).`,
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-13',
        title: 'Exemple 1.13 — Information du modèle exponentiel',
        source: 'Poly ch.3, Ex. 1.13, p. 22 ; Examen 2025 Ex. 1 Q1',
        setup: '$\\{\\mathcal{E}(\\theta),\\ \\theta\\in\\mathbb{R}_+^*\\}$, $\\theta$ **intensité**, une observation.',
        steps: [
          { text: '$p_\\theta(z)=\\theta e^{-\\theta z}\\mathbb{1}_{\\mathbb{R}_+}(z)$.', justification: 'Densité par rapport à Lebesgue.' },
          { text: '$\\ell(\\theta,z)=\\log\\theta-\\theta z$ pour $z>0$.', justification: 'Logarithme.' },
          { text: '$S(\\theta,z)=1/\\theta-z$ ; $\\mathbb{E}_\\theta[S(\\theta,Z)]=1/\\theta-\\mathbb{E}_\\theta[Z]=0$.', justification: 'Dériver en $\\theta$ ; $\\mathbb{E}_\\theta[Z]=1/\\theta$ (vérification de (6)).' },
          { text: '$\\mathbb{I}(\\theta)=\\mathrm{Var}_\\theta(1/\\theta-Z)=\\mathrm{Var}_\\theta(Z)=1/\\theta^2$.', justification: 'Déf. 1.8 (variance du score) ; une constante ne change pas la variance. Variante : $\\partial^2_\\theta\\ell=-1/\\theta^2$, d’où $-\\mathbb{E}_\\theta[\\partial^2_\\theta\\ell]=1/\\theta^2$.' },
        ],
        conclusion: 'Information décroissante en $\\theta$. Attention : dans PC3 Ex. 5, la densité est $\\theta^{-1}e^{-x/\\theta}$ ($\\theta$ = moyenne), l’information vaut alors aussi $1/\\theta^2$ mais pour une autre paramétrisation.',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-14',
        title: 'Exemple 1.14 — Information du modèle de Poisson',
        source: 'Poly ch.3, Ex. 1.14, p. 23',
        setup: '$\\{\\mathcal{P}\\mathrm{oi}(\\theta),\\ \\theta\\in\\mathbb{R}_+^*\\}$, une observation, mesure de comptage sur $\\mathbb{N}$.',
        steps: [
          { text: '$p_\\theta(z)=e^{-\\theta}\\theta^z/z!$, $\\ell(\\theta,z)=-\\theta+z\\log\\theta-\\log(z!)$.', justification: 'Densité par rapport au comptage ; logarithme.' },
          { text: '$S(\\theta,z)=z/\\theta-1$, d’espérance $\\mathbb{E}_\\theta[Z]/\\theta-1=0$.', justification: 'Dérivée ; $\\mathbb{E}_\\theta[Z]=\\theta$.' },
          { text: '$\\mathbb{I}(\\theta)=\\mathrm{Var}_\\theta(Z/\\theta-1)=\\mathrm{Var}_\\theta(Z)/\\theta^2=1/\\theta$.', justification: '$\\mathrm{Var}_\\theta(Z)=\\theta$.' },
        ],
        conclusion: 'Pour le $n$-échantillon : $n/\\theta$ (additivité, Prop. 1.2 (iii)).',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-15',
        title: 'Exemple 1.15 — Information du modèle de Bernoulli (par la dérivée seconde)',
        source: 'Poly ch.3, Ex. 1.15, p. 23',
        setup: '$\\{\\mathcal{B}\\mathrm{er}(\\theta),\\ \\theta\\in\\,]0,1[\\}$, $p_\\theta(x)=\\theta^x(1-\\theta)^{1-x}$ par rapport au comptage sur $\\{0,1\\}$.',
        steps: [
          { text: '$\\ell(\\theta,x)=x\\log\\theta+(1-x)\\log(1-\\theta)$, $\\partial_\\theta\\ell=\\frac x\\theta-\\frac{1-x}{1-\\theta}$.', justification: 'Logarithme puis dérivée.' },
          { text: '$\\partial_\\theta^2\\ell(\\theta,x)=-\\frac x{\\theta^2}-\\frac{1-x}{(1-\\theta)^2}$.', justification: 'Seconde dérivation.' },
          { text: '$\\mathbb{I}_1(\\theta)=-\\theta\\,\\partial_\\theta^2\\ell(\\theta,1)-(1-\\theta)\\,\\partial_\\theta^2\\ell(\\theta,0)=\\frac1\\theta+\\frac1{1-\\theta}=\\frac1{\\theta(1-\\theta)}$.', justification: 'Prop. 1.2 (ii) ; espérance d’une fonction d’une Bernoulli.' },
        ],
        conclusion: 'Pour un $n$-échantillon $\\mathbb{I}(\\theta)=n/(\\theta(1-\\theta))$. Information **minimale** en $\\theta=1/2$, là où l’incertitude est maximale. Le calcul par la dérivée seconde est ici plus court.',
      },
      {
        kind: 'viz',
        id: 'ch3-s5-viz-fisher',
        vizId: 'ch3-fisher-courbure',
        caption: 'Log-vraisemblances normalisées de plusieurs échantillons : leur pente en $\\theta^\\star$ (le score) fluctue autour de $0$, leur courbure moyenne vaut $\\mathbb{I}(\\theta^\\star)$ ; la parabole $-\\frac12\\mathbb{I}(\\theta^\\star)(\\theta-\\theta^\\star)^2$ épouse $-\\mathrm{KL}(\\theta^\\star,\\theta)$.',
      },
      {
        kind: 'text',
        id: 'ch3-s5-kl',
        title: 'Intuition (p. 23–24, non rigoureuse) — information de Fisher = courbure de Kullback-Leibler',
        text: `Soit $\\theta^\\star$ la vraie valeur et $\\mathrm{KL}(\\theta^\\star,\\theta):=\\mathbb{E}_{\\theta^\\star}\\big[\\log\\frac{p_{\\theta^\\star}(Z)}{p_\\theta(Z)}\\big]$ (ch.2, Déf. 1.7) : positive, nulle seulement en $\\theta=\\theta^\\star$ si le modèle est identifiable. Donc $\\theta\\mapsto\\mathrm{KL}(\\theta^\\star,\\theta)$ est minimale en $\\theta^\\star$, de gradient nul (= score centré), et

$$\\nabla_\\theta^2\\mathrm{KL}(\\theta^\\star,\\theta)\\big|_{\\theta=\\theta^\\star}=-\\mathbb{E}_{\\theta^\\star}\\big[\\mathrm{H}_\\ell(\\theta^\\star,Z)\\big]=\\mathbb{I}(\\theta^\\star).$$

Grande information = KL qui remonte vite = lois voisines faciles à distinguer = paramètre facile à estimer ; cohérent avec $\\mathbb{I}$ au **dénominateur** de Cramér-Rao. (Dérivations sous l’intégrale non justifiées : « n’est pas une démonstration ».)`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 6. Cramér-Rao et efficacité
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s6-cramer-rao',
    title: '6. Borne de Cramér-Rao et efficacité',
    role: 'preuves',
    intro: 'La régularité du modèle justifie la dérivation de $\\int p_\\theta$ ; celle de $\\int Tp_\\theta$ dépend de l’estimateur et devient une hypothèse (estimateur régulier). Sous ces deux régularités, on démontre la borne, puis ses trois lectures (scalaire, matricielle, $n$-échantillon), et l’on définit l’efficacité.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch3-def-1-9',
        type: 'definition',
        label: 'Définition 1.9',
        title: 'Estimateur régulier',
        source: 'Poly ch.3, Déf. 1.9 et Remarque, p. 24',
        hypotheses: ['Modèle régulier, $\\Theta$ ouvert de $\\mathbb{R}^d$ ; $T:(\\mathsf{Z},\\mathcal{Z})\\to\\mathbb{R}$ estimateur de $g:\\Theta\\to\\mathbb{R}$.'],
        statement: `$T$ est **régulier** si

- **(i)** $\\mathbb{E}_\\theta[\\{T(Z)\\}^2]<\\infty$ pour tout $\\theta\\in\\Theta$ ;
- **(ii)** $\\theta\\mapsto\\mathbb{E}_\\theta[T(Z)]$ est différentiable sur $\\Theta$ et $\\nabla_\\theta\\mathbb{E}_\\theta[T(Z)]=\\int_{\\mathsf{Z}}T(z)\\nabla_\\theta p_\\theta(z)\\,\\mu(\\mathrm{d}z)$ (éq. (10)).`,
        intuition: 'Condition suffisante (Prop. 2.2) : localement, $\\lVert\\nabla_\\theta p_\\theta(z)\\rVert\\le h(z)$ avec $\\int|T|h\\,\\mathrm{d}\\mu<\\infty$. Vérification fastidieuse : **admise dans les exercices**.',
        pitfalls: ['Cramér-Rao demande **deux** régularités : du modèle (Déf. 1.6) **et** de l’estimateur (Déf. 1.9).'],
      },
      {
        kind: 'theorem',
        id: 'ch3-thm-1-1',
        type: 'theoreme',
        label: 'Théorème 1.1',
        title: 'Borne de Cramér-Rao',
        source: 'Poly ch.3, Thm 1.1, p. 24 (preuve p. 24–25)',
        hypotheses: [
          '$(\\mathsf{Z},\\mathcal{Z},\\{p_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\})$ modèle **régulier** (Déf. 1.6), $\\Theta$ ouvert de $\\mathbb{R}^d$.',
          '$g:\\Theta\\to\\mathbb{R}$ **dérivable**, à valeurs réelles.',
          '$T$ estimateur **sans biais** de $g(\\theta)$.',
          '$T$ **régulier** (Déf. 1.9).',
        ],
        statement: `Pour tout $\\theta\\in\\Theta$,

$$\\mathrm{Var}_\\theta(T(Z))\\ \\ge\\ \\big(\\nabla_\\theta g(\\theta)\\big)^\\top\\,\\mathbb{I}(\\theta)^{-1}\\,\\nabla_\\theta g(\\theta).$$`,
        intuition: 'La covariance entre l’erreur $T-g(\\theta)$ et le score vaut le gradient de $g$ ; Cauchy-Schwarz transforme cette identité en inégalité. Aucun estimateur sans biais régulier ne fait mieux que la borne, fixée par le modèle. Point d’histoire : C. R. Rao la publie en 1945, à 25 ans (avec Rao-Blackwell) ; H. Cramér indépendamment en 1946.',
        proof: [
          { text: '$\\nabla_\\theta g(\\theta)=\\nabla_\\theta\\mathbb{E}_\\theta[T(Z)]=\\int T(z)\\nabla_\\theta p_\\theta(z)\\,\\mu(\\mathrm{d}z)=\\int T(z)\\nabla_\\theta\\ell(\\theta,z)p_\\theta(z)\\,\\mu(\\mathrm{d}z)=\\mathbb{E}_\\theta[T(Z)\\nabla_\\theta\\ell(\\theta,Z)]$.', justification: '$T$ sans biais, puis $T$ régulier (éq. (10)), puis (8) : $\\nabla_\\theta p_\\theta=p_\\theta\\nabla_\\theta\\ell$.' },
          { text: '$\\nabla_\\theta g(\\theta)=\\mathbb{E}_\\theta\\big[\\{T(Z)-g(\\theta)\\}\\nabla_\\theta\\ell(\\theta,Z)\\big]$.', justification: 'Score centré (Prop. 1.2 (i)) : $\\mathbb{E}_\\theta[g(\\theta)\\nabla_\\theta\\ell(\\theta,Z)]=0$.' },
          { text: 'Pour $u\\in\\mathbb{R}^d$ : $\\{\\nabla_\\theta g(\\theta)^\\top u\\}^2=\\big(\\mathbb{E}_\\theta[\\{T(Z)-g(\\theta)\\}\\nabla_\\theta\\ell(\\theta,Z)^\\top u]\\big)^2\\le\\mathbb{E}_\\theta[\\{T(Z)-g(\\theta)\\}^2]\\,\\mathbb{E}_\\theta[\\{\\nabla_\\theta\\ell(\\theta,Z)^\\top u\\}^2]$.', justification: 'Produit scalaire avec $u$ ; **Cauchy-Schwarz** (Prop. 2.1), les deux variables étant de carré intégrable ($T$ régulier, modèle régulier).' },
          { text: '$u^\\top\\nabla_\\theta g\\nabla_\\theta g^\\top u\\le\\mathrm{Var}_\\theta(T(Z))\\cdot u^\\top\\mathbb{I}(\\theta)u$ pour tout $u\\in\\mathbb{R}^d$.', justification: '$T$ sans biais : $\\mathbb{E}_\\theta[\\{T-g(\\theta)\\}^2]=\\mathrm{Var}_\\theta(T)$ ; identité $\\{a^\\top u\\}^2=u^\\top(aa^\\top)u$ et définition (5) de $\\mathbb{I}$.' },
          { text: 'Avec $u=\\mathbb{I}(\\theta)^{-1}\\nabla_\\theta g(\\theta)$ : $\\big(\\nabla_\\theta g^\\top\\mathbb{I}^{-1}\\nabla_\\theta g\\big)^2\\le\\mathrm{Var}_\\theta(T(Z))\\cdot\\big(\\nabla_\\theta g^\\top\\mathbb{I}^{-1}\\nabla_\\theta g\\big)$.', justification: 'Choix licite car $\\mathbb{I}(\\theta)$ est inversible (Déf. 1.6 (iv)) ; $\\mathbb{I}^{-1}\\mathbb{I}\\mathbb{I}^{-1}=\\mathbb{I}^{-1}$ (symétrie).' },
          { text: 'Si $\\nabla_\\theta g^\\top\\mathbb{I}^{-1}\\nabla_\\theta g=0$ la borne est triviale ; sinon on divise par ce facteur $>0$.', justification: '$\\mathbb{I}(\\theta)^{-1}$ est définie positive, donc ce facteur est $\\ge0$.' },
        ],
        pitfalls: ['Vérifier **sans biais** et **les deux régularités** avant d’appliquer.', 'Ne pas l’appliquer au modèle uniforme (non régulier, Ex. 1.16).', 'Ne pas l’appliquer à un estimateur **biaisé** (EMV $1/\\bar X_n$ de l’exponentielle, $\\mathbb{E}_\\theta[1/\\bar X_n]=\\frac n{n-1}\\theta$).', 'Utiliser l’information **du $n$-échantillon** (facteur $n$).', 'En dimension $d$, utiliser $\\mathbb{I}(\\theta)^{-1}$ (inverse de matrice) et non l’inverse des termes diagonaux.'],
      },
      {
        kind: 'theorem',
        id: 'ch3-cor-1-1',
        type: 'corollaire',
        label: 'Corollaire 1.1',
        title: 'Cas unidimensionnel',
        source: 'Poly ch.3, Cor. 1.1, p. 25',
        hypotheses: ['$\\Theta$ ouvert de $\\mathbb{R}$ ; hypothèses du Thm 1.1 (modèle régulier, $g$ dérivable, $T$ sans biais et régulier).'],
        statement: '$$\\mathrm{Var}_\\theta(T(Z))\\ge\\frac{\\{g\'(\\theta)\\}^2}{\\mathbb{I}(\\theta)},\\qquad\\mathbb{I}(\\theta)=\\mathrm{Var}_\\theta\\Big(\\frac{\\partial}{\\partial\\theta}\\ell(\\theta,Z)\\Big).$$',
        intuition: 'Cas $d=1$ du théorème ($\\nabla_\\theta g=g\'$, $\\mathbb{I}^{-1}=1/\\mathbb{I}$) : la forme la plus utilisée en exercice.',
      },
      {
        kind: 'theorem',
        id: 'ch3-cor-1-2',
        type: 'corollaire',
        label: 'Corollaire 1.2',
        title: 'Estimation d’un paramètre vectoriel',
        source: 'Poly ch.3, Cor. 1.2, p. 25 (preuve p. 26)',
        hypotheses: ['Modèle régulier, $\\Theta$ ouvert de $\\mathbb{R}^d$.', '$T(Z)$ estimateur sans biais et régulier de $\\theta$ au sens où **chaque** $\\lambda^\\top T(Z)$, $\\lambda\\in\\mathbb{R}^d$, est sans biais et régulier pour $\\lambda^\\top\\theta$.'],
        statement: '$\\mathrm{Var}_\\theta(T(Z))\\ge\\mathbb{I}(\\theta)^{-1}$ au sens de Loewner : la matrice symétrique $\\mathrm{Var}_\\theta(T(Z))-\\mathbb{I}(\\theta)^{-1}$ est **positive**.',
        intuition: 'Inégalité matricielle : toute direction $\\lambda$ est minorée. En particulier $\\mathrm{Var}_\\theta(T_j)\\ge[\\mathbb{I}(\\theta)^{-1}]_{jj}$ (et **non** $1/\\mathbb{I}_{jj}$) : PC3 Ex. 2 Q2–Q3.',
        proof: [
          { text: 'Fixer $\\lambda\\in\\mathbb{R}^d$ et $g:\\theta\\mapsto\\lambda^\\top\\theta$, dérivable de gradient $\\lambda$.', justification: 'Fonction linéaire.' },
          { text: '$\\mathrm{Var}_\\theta(\\lambda^\\top T(Z))\\ge\\lambda^\\top\\mathbb{I}(\\theta)^{-1}\\lambda$.', justification: 'Thm 1.1 appliqué à l’estimateur sans biais et régulier $\\lambda^\\top T(Z)$ de $g(\\theta)$.' },
          { text: '$\\mathrm{Var}_\\theta(\\lambda^\\top T(Z))=\\lambda^\\top\\mathrm{Var}_\\theta(T(Z))\\lambda$.', justification: 'Bilinéarité de la covariance.' },
          { text: 'Donc $\\lambda^\\top\\{\\mathrm{Var}_\\theta(T(Z))-\\mathbb{I}(\\theta)^{-1}\\}\\lambda\\ge0$ pour tout $\\lambda$.', justification: 'Définition d’une matrice symétrique positive (Outils p. 30).' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch3-cor-1-3',
        type: 'corollaire',
        label: 'Corollaire 1.3',
        title: 'Borne de Cramér-Rao pour un n-échantillon',
        source: 'Poly ch.3, Cor. 1.3, p. 26',
        hypotheses: ['$(X_1,\\dots,X_n)$ $n$-échantillon du modèle **régulier** $\\{q_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\}$.', '$g:\\Theta\\to\\mathbb{R}$ dérivable ; $T_n(X_1,\\dots,X_n)$ estimateur **sans biais et régulier** de $g(\\theta)$.'],
        statement: `Avec $\\mathbb{I}_1(\\theta):=\\mathbb{E}_\\theta\\big[\\nabla_\\theta\\ell_1(\\theta,X_1)\\nabla_\\theta\\ell_1(\\theta,X_1)^\\top\\big]$, $\\ell_1(\\theta,x):=\\log q_\\theta(x)$ :

$$\\mathrm{Var}_\\theta\\big(T_n(X_1,\\dots,X_n)\\big)\\ge\\frac1n\\,\\nabla_\\theta g(\\theta)^\\top\\,\\mathbb{I}_1(\\theta)^{-1}\\,\\nabla_\\theta g(\\theta).$$`,
        intuition: 'Thm 1.1 appliqué au modèle du $n$-échantillon + additivité $\\mathbb{I}_{\\mathcal{M}^n}=n\\mathbb{I}_1$ (Prop. 1.2 (iii)), d’où $\\mathbb{I}_{\\mathcal{M}^n}^{-1}=\\frac1n\\mathbb{I}_1^{-1}$. Message clé : dans un modèle régulier, la variance d’un estimateur sans biais — donc son risque quadratique — est **au moins d’ordre $n^{-1}$**.',
        proof: [
          { text: 'Le modèle du $n$-échantillon est régulier, d’information $\\mathbb{I}_{\\mathcal{M}^n}(\\theta)=n\\,\\mathbb{I}_1(\\theta)$.', justification: 'Prop. 1.2 (iii) (additivité, par récurrence).' },
          { text: '$\\mathrm{Var}_\\theta(T_n)\\ge\\nabla_\\theta g^\\top(n\\mathbb{I}_1)^{-1}\\nabla_\\theta g=\\frac1n\\nabla_\\theta g^\\top\\mathbb{I}_1^{-1}\\nabla_\\theta g$.', justification: 'Thm 1.1 appliqué à ce modèle ; $(nA)^{-1}=\\frac1nA^{-1}$.' },
        ],
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-16',
        title: 'Exemple 1.16 — Vitesse d’estimation et modèles non réguliers',
        source: 'Poly ch.3, Ex. 1.16, p. 26 ; question courte 9',
        setup: '$\\mathrm{Var}(\\bar X_n)$ et $\\mathrm{Var}(S_n^2)$ (gaussien) sont d’ordre $n^{-1}$ : compatibles avec Cramér-Rao, dont la dépendance en $n$ ne peut pas être améliorée. Que dire du modèle uniforme ?',
        steps: [
          { text: '$T_n^{(1)}=\\frac{n+1}nX_{n:n}$ est sans biais ; $\\mathrm{Var}_\\theta(T_n^{(1)})=\\frac{(n+1)^2}{n^2}\\cdot\\frac{n\\theta^2}{n+2}-\\theta^2=\\frac{\\theta^2}{n(n+2)}$.', justification: 'Moments de $X_{n:n}$ (Ex. 1.9) ; PC3 Ex. 1 Q4.' },
          { text: 'Cette variance décroît en $n^{-2}$ : elle passerait sous toute borne d’ordre $1/n$.', justification: '$n(n+2)\\sim n^2$.' },
          { text: 'Pas de contradiction : le modèle uniforme n’est pas régulier (Ex. 1.12), Cramér-Rao ne s’applique pas.', justification: 'Vérifier les hypothèses d’un théorème avant de l’appliquer.' },
        ],
        conclusion: 'Piège classique d’examen : « Vrai ou faux : contredit Cramér-Rao » → **faux**. L’Exercice 3 (PC3 Ex. 3) construit une borne **sans régularité** et retrouve la vitesse $n^{-2}$.',
      },
      {
        kind: 'viz',
        id: 'ch3-s6-viz-cr',
        vizId: 'ch3-cramer-rao',
        caption: '$n\\,\\mathrm{Var}_\\theta(T_n)$ empirique contre la borne $1/\\mathbb{I}_1(\\theta)$ : égalité pour $\\bar X_n$ (Bernoulli, Poisson, gaussien) ; au-dessus pour l’estimateur sans biais $\\frac{n-1}{n\\bar X_n}$ de l’exponentielle ; l’uniforme passe sous la « borne formelle » car il n’est pas régulier.',
      },
      {
        kind: 'theorem',
        id: 'ch3-def-1-10',
        type: 'definition',
        label: 'Définition 1.10',
        title: 'Efficacité',
        source: 'Poly ch.3, Déf. 1.10, p. 26–27',
        hypotheses: ['Modèle régulier, $g:\\Theta\\to\\mathbb{R}$ dérivable.', '$T$ estimateur **sans biais et régulier** de $g(\\theta)$.'],
        statement: '$T$ est **efficace** si sa variance atteint la borne de Cramér-Rao **pour tout** $\\theta\\in\\Theta$ : $\\mathrm{Var}_\\theta(T(Z))=\\big(\\nabla_\\theta g(\\theta)\\big)^\\top\\mathbb{I}(\\theta)^{-1}\\nabla_\\theta g(\\theta)$.',
        intuition: 'Conséquence : un estimateur efficace est **E.S.B.V.M.** (sa variance minore celle de tout autre estimateur sans biais **régulier**).',
        pitfalls: ['La **réciproque est fausse** : un estimateur peut être de variance minimale sans atteindre la borne.', 'L’égalité doit valoir **pour tout** $\\theta$.', 'L’existence d’un estimateur efficace n’est pas garantie : elle caractérise les **familles exponentielles** (Thm 4.1, compléments).'],
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-17',
        title: 'Exemple 1.17 — Bernoulli : la fréquence empirique est efficace',
        source: 'Poly ch.3, Ex. 1.17, p. 27',
        setup: '$n$-échantillon de Bernoulli, $\\Theta=\\,]0,1[$.',
        steps: [
          { text: '$\\mathbb{I}(\\theta)=n/(\\theta(1-\\theta))$, donc borne pour l’estimation sans biais de $\\theta$ : $\\theta(1-\\theta)/n$.', justification: 'Ex. 1.15 + additivité ; Cor. 1.3 avec $g\'=1$.' },
          { text: '$\\mathrm{Var}_\\theta(\\bar X_n)=\\mathrm{Var}_\\theta(X_1)/n=\\theta(1-\\theta)/n$.', justification: 'Indépendance.' },
        ],
        conclusion: '$\\bar X_n$ (sans biais) atteint la borne pour tout $\\theta$ : **efficace**, donc **E.S.B.V.M.**',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-18',
        title: 'Exemple 1.18 — Poisson : l’EMV est efficace',
        source: 'Poly ch.3, Ex. 1.18, p. 27',
        setup: '$\\mathcal{M}^n=\\{\\mathcal{P}\\mathrm{oi}(\\theta)^{\\otimes n},\\ \\theta\\in\\mathbb{R}_+^*\\}$.',
        steps: [
          { text: '$\\mathbb{I}(\\mathcal{M},\\theta)=1/\\theta$, donc $\\mathbb{I}(\\mathcal{M}^n,\\theta)=n/\\theta$.', justification: 'Ex. 1.14 puis additivité.' },
          { text: 'EMV $\\hat\\theta_n=\\bar X_n$, sans biais.', justification: 'Ch.2 ; linéarité de l’espérance.' },
          { text: '$\\mathrm{Var}_\\theta(\\hat\\theta_n)=\\theta/n=1/\\mathbb{I}(\\mathcal{M}^n,\\theta)$.', justification: 'Variance d’une moyenne i.i.d. ; $\\mathrm{Var}_\\theta(X_1)=\\theta$.' },
        ],
        conclusion: 'L’EMV est **efficace**.',
      },
      {
        kind: 'example',
        id: 'ch3-ex-1-19',
        title: 'Exemple 1.19 — Gaussien à variance connue : la moyenne est efficace',
        source: 'Poly ch.3, Ex. 1.19, p. 27',
        setup: '$n$-échantillon de $\\{\\mathcal{N}(\\theta,\\sigma_0^2),\\ \\theta\\in\\mathbb{R}\\}$, $\\sigma_0^2>0$ **connue**.',
        steps: [
          { text: '$\\ell_1(\\theta,x)=-\\frac{(x-\\theta)^2}{2\\sigma_0^2}-\\log\\sqrt{2\\pi\\sigma_0^2}$, $\\partial_\\theta\\ell_1=\\frac{x-\\theta}{\\sigma_0^2}$, $\\partial^2_\\theta\\ell_1=-\\frac1{\\sigma_0^2}$.', justification: 'Log de la densité gaussienne, deux dérivations.' },
          { text: '$\\mathbb{I}_1(\\theta)=1/\\sigma_0^2$, $\\mathbb{I}(\\theta)=n/\\sigma_0^2$.', justification: 'Prop. 1.2 (ii) (dérivée seconde constante) et (iii).' },
          { text: '$\\mathrm{Var}_\\theta(\\bar X_n)=\\sigma_0^2/n=\\mathbb{I}(\\theta)^{-1}$.', justification: 'Variance d’une moyenne i.i.d.' },
        ],
        conclusion: '$\\bar X_n$ est **efficace**. Dérivée seconde constante $\\Rightarrow$ information indépendante de $\\theta$. (Examen 2025 Ex. 2 Q3 : $\\hat\\mu_{ML}=\\bar Y_n$ atteint $\\sigma^2/n$.)',
      },
      {
        kind: 'text',
        id: 'ch3-s6-efficacite-asymptotique',
        title: 'Remarque (p. 27) — existence d’un estimateur efficace, efficacité asymptotique',
        text: 'L’existence d’un estimateur efficace n’est **pas garantie** (elle caractérise les familles exponentielles, Thm 4.1). Exemple : dans $\\mathcal{E}(\\theta)$ (intensité), l’estimateur sans biais $\\frac{n-1}{n\\bar X_n}$ a pour variance $\\frac{\\theta^2}{n-2}>\\frac{\\theta^2}n$ : il n’atteint pas la borne. Au chapitre 7, on verra que l’EMV est **asymptotiquement efficace** : $\\sqrt n(\\hat\\theta_n-\\theta)\\Rightarrow\\mathcal{N}(0,\\mathbb{I}_1(\\theta)^{-1})$, même quand aucun estimateur n’atteint la borne à $n$ fixé.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 7. Outils mathématiques
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s7-outils',
    title: '7. Outils mathématiques : Cauchy-Schwarz, dérivation sous l’intégrale, matrices',
    role: 'preuves',
    intro: 'Les quatre outils qui font tourner les preuves du chapitre (Poly ch.3, « Les outils mathématiques », p. 29–32).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch3-prop-2-1',
        type: 'proposition',
        label: 'Proposition 2.1',
        title: 'Inégalité de Cauchy-Schwarz',
        source: 'Poly ch.3, Outils, Prop. 2.1, p. 29',
        hypotheses: ['$U$, $V$ variables réelles de **carré intégrable** sur un même espace probabilisé.'],
        statement: '$UV$ est intégrable et $\\big(\\mathbb{E}[UV]\\big)^2\\le\\mathbb{E}[U^2]\\,\\mathbb{E}[V^2]$, avec égalité **ssi** il existe $(\\alpha,\\beta)\\ne(0,0)$ tel que $\\alpha U+\\beta V=0$ p.s.',
        intuition: 'C’est elle qui transforme une identité en inégalité dans Cramér-Rao (avec $U=T(Z)-g(\\theta)$, $V=\\nabla_\\theta\\ell(\\theta,Z)^\\top u$) ; le **cas d’égalité** (colinéarité p.s.) caractérise les estimateurs efficaces (Thm 4.1). Version covariance : $\\mathrm{Cov}(U,V)^2\\le\\mathrm{Var}(U)\\mathrm{Var}(V)$ (variables centrées, PC3 Ex. 3 Q1).',
        proof: [
          { text: '$|UV|\\le(U^2+V^2)/2$, donc $UV$ est intégrable.', justification: '$(|U|-|V|)^2\\ge0$.' },
          { text: 'Si $\\mathbb{E}[V^2]=0$ : $V=0$ p.s., les deux membres sont nuls ; $(\\alpha,\\beta)=(0,1)$ convient.', justification: 'Variable positive d’espérance nulle.' },
          { text: 'Sinon $\\varphi(t):=\\mathbb{E}[(U+tV)^2]=\\mathbb{E}[U^2]+2t\\mathbb{E}[UV]+t^2\\mathbb{E}[V^2]\\ge0$ pour tout $t$ : discriminant $4(\\mathbb{E}[UV])^2-4\\mathbb{E}[U^2]\\mathbb{E}[V^2]\\le0$.', justification: 'Trinôme positif de coefficient dominant $>0$.' },
          { text: 'Égalité $\\iff$ discriminant nul $\\iff$ $\\exists t_0$, $\\varphi(t_0)=0$ $\\iff$ $U+t_0V=0$ p.s.', justification: 'Racine double ; espérance nulle d’un carré.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch3-prop-2-2',
        type: 'proposition',
        label: 'Proposition 2.2',
        title: 'Dérivation sous le signe intégral',
        source: 'Poly ch.3, Outils, Prop. 2.2, p. 29–30',
        hypotheses: [
          '$(E,\\mathcal{E},\\mu)$ espace mesuré, $I$ intervalle **ouvert** de $\\mathbb{R}$, $f(t,\\cdot)$ $\\mu$-intégrable pour tout $t\\in I$, $\\phi(t):=\\int f(t,x)\\,\\mu(\\mathrm{d}x)$.',
          'Il existe $A\\in\\mathcal{E}$ avec $\\mu(A^c)=0$ tel que, pour $x\\in A$, $t\\mapsto f(t,x)$ est dérivable sur $I$.',
          'Il existe $h$ $\\mu$-intégrable avec $|\\partial_tf(t,x)|\\le h(x)$ pour tout $x\\in A$, $t\\in I$ (domination **indépendante de $t$**).',
        ],
        statement: '$\\phi$ est dérivable sur $I$ et $\\phi\'(t)=\\int\\frac{\\partial f}{\\partial t}(t,x)\\,\\mu(\\mathrm{d}x)$.',
        intuition: 'Trois usages dans le chapitre : domination de $\\lVert\\nabla_\\theta p_\\theta\\rVert$ (score centré), de $\\lVert\\mathrm{H}_p\\rVert$ (information par la hessienne), de $|T|\\lVert\\nabla_\\theta p_\\theta\\rVert$ (estimateur régulier). C’est l’unique raison des dominations locales de la Déf. 1.6 (iii).',
        proof: [
          { text: '$\\frac{\\phi(t+h)-\\phi(t)}h=\\int_A\\frac{f(t+h,x)-f(t,x)}h\\,\\mu(\\mathrm{d}x)$.', justification: '$\\mu(A^c)=0$, linéarité de l’intégrale.' },
          { text: '$|f(t+h,x)-f(t,x)|/|h|=|\\partial_tf(s,x)|\\le h(x)$ pour un $s$ entre $t$ et $t+h$.', justification: 'Accroissements finis ; majorant indépendant du pas.' },
          { text: 'Le taux d’accroissement converge ponctuellement vers $\\partial_tf(t,x)$.', justification: 'Dérivabilité de $t\\mapsto f(t,x)$ sur $A$.' },
          { text: 'Conclusion.', justification: 'Convergence dominée.' },
        ],
        pitfalls: ['Le poly utilise la même lettre $h$ pour le pas et la fonction dominante.'],
      },
      {
        kind: 'text',
        id: 'ch3-s7-matrices',
        title: 'Définitions (Outils, p. 30) — hessienne, Frobenius, matrices positives',
        text: `- Vecteurs **colonne** ; hessienne $\\mathrm{H}_F(\\theta,z):=\\big[\\frac{\\partial^2F}{\\partial\\theta^{(i)}\\partial\\theta^{(j)}}(\\theta,z)\\big]_{i,j}$, symétrique si les dérivées secondes sont continues.
- Norme de Frobenius $\\lVert A\\rVert^2:=\\mathrm{Tr}(A^\\top A)=\\sum_{i,j}a_{ij}^2$ ; identité $\\lVert aa^\\top\\rVert=\\lVert a\\rVert^2$ (Tr cyclique, $a^\\top a$ scalaire).
- $A$ symétrique est **positive** ($A\\ge0$) si $u^\\top Au\\ge0$ pour tout $u$, **définie positive** si $>0$ pour $u\\ne0$ ; $A\\ge B$ ssi $A-B\\ge0$ : **ordre partiel** (sens de $\\mathrm{Var}_\\theta(T)\\ge\\mathbb{I}(\\theta)^{-1}$). Une matrice symétrique définie positive est inversible, d’inverse définie positive.`,
      },
      {
        kind: 'theorem',
        id: 'ch3-prop-2-3',
        type: 'proposition',
        label: 'Proposition 2.3',
        title: 'Décomposition biais-variance vectorielle',
        source: 'Poly ch.3, Outils, Prop. 2.3, p. 30–31',
        hypotheses: ['$g:\\Theta\\to\\mathbb{R}^p$ mesurable ; $T$ estimateur de $g$ avec $\\mathbb{E}_\\theta[\\lVert T(Z)\\rVert_2^2]<\\infty$ pour tout $\\theta$.'],
        statement: `$$\\mathbb{E}_\\theta\\big[(T(Z)-g(\\theta))(T(Z)-g(\\theta))^\\top\\big]=\\mathrm{Var}_\\theta(T(Z))+\\big(\\mathbb{E}_\\theta[T(Z)]-g(\\theta)\\big)\\big(\\mathbb{E}_\\theta[T(Z)]-g(\\theta)\\big)^\\top.$$

En prenant la trace : $\\mathbb{E}_\\theta[\\lVert T(Z)-g(\\theta)\\rVert_2^2]=\\mathbb{E}_\\theta[\\lVert T(Z)-\\mathbb{E}_\\theta[T(Z)]\\rVert_2^2]+\\lVert\\mathbb{E}_\\theta[T(Z)]-g(\\theta)\\rVert_2^2$, qui redonne la Prop. 1.1 pour $p=1$.`,
        intuition: 'Même décomposition qu’en scalaire, avec des produits extérieurs.',
        proof: [
          { text: '$T(Z)-g(\\theta)=\\big(T(Z)-\\mathbb{E}_\\theta[T(Z)]\\big)+\\big(\\mathbb{E}_\\theta[T(Z)]-g(\\theta)\\big)$.', justification: 'Insérer l’espérance.' },
          { text: 'Développer $(\\cdot)(\\cdot)^\\top$ en quatre termes.', justification: 'Bilinéarité du produit extérieur.' },
          { text: 'Le premier donne la covariance, le second (déterministe) le terme de biais, les termes croisés sont d’espérance nulle.', justification: '$\\mathbb{E}_\\theta[T(Z)-\\mathbb{E}_\\theta[T(Z)]]=0$ et le facteur de biais est déterministe.' },
        ],
      },
      {
        kind: 'theorem',
        id: 'ch3-lem-2-1',
        type: 'lemme',
        label: 'Lemme 2.1',
        title: 'L’information de Fisher est bien définie',
        source: 'Poly ch.3, Outils, Lemme 2.1, p. 31–32',
        hypotheses: ['Modèle régulier $(\\mathsf{Z},\\mathcal{Z},\\{p_\\theta\\cdot\\mu,\\ \\theta\\in\\Theta\\})$.'],
        statement: '$\\mathbb{I}(\\theta)=\\mathbb{E}_\\theta[\\nabla_\\theta\\ell(\\theta,Z)\\nabla_\\theta\\ell(\\theta,Z)^\\top]$ est bien définie, à coefficients finis, et **ne dépend pas du choix de la mesure de domination**.',
        intuition: 'Changer de mesure dominante multiplie la densité par un facteur indépendant de $\\theta$, qui disparaît en dérivant le log.',
        proof: [
          { text: '$\\mathbb{E}_{\\theta_0}[\\lVert\\nabla_\\theta\\ell\\nabla_\\theta\\ell^\\top\\rVert]=\\mathbb{E}_{\\theta_0}[\\lVert\\nabla_\\theta\\ell(\\theta_0,Z)\\rVert^2]\\le\\int h_1h_0\\,\\mathrm{d}\\mu<\\infty$.', justification: '$\\lVert aa^\\top\\rVert=\\lVert a\\rVert^2$ et dominations (3)–(4) ; chaque coefficient est majoré par la norme de Frobenius.' },
          { text: 'Soit $\\nu$ une autre mesure dominante, $\\mathbb{P}_\\theta=q_\\theta\\cdot\\nu$ ; poser $\\lambda:=\\mu+\\nu$.', justification: '$\\mu$ et $\\nu$ sont dominées par $\\lambda$.' },
          { text: 'Il existe $r\\ge0$ **indépendante de $\\theta$** avec $p_\\theta(z)=r(z)q_\\theta(z)$ pour $\\lambda$-p.t. $z$.', justification: 'Radon-Nikodym (ch.1, Thm 2.1).' },
          { text: '$\\nabla_\\theta\\log p_\\theta=\\nabla_\\theta\\log q_\\theta$ : on substitue dans (5).', justification: '$\\log r$ ne dépend pas de $\\theta$.' },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 8. Méthodes types et exercices de la PC3
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s8-methodes',
    title: '8. Méthodes types et exercices de la PC3',
    role: 'methodes',
    intro: 'Les deux méthodes que l’examen demande (borne de Cramér-Rao ; biais / risque / admissibilité), puis les exercices de la PC3 (= Exercices 1–5 du poly) traités pas à pas.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch3-meth-cr',
        type: 'methode',
        label: 'Méthode type',
        title: 'Calculer la borne de Cramér-Rao et conclure sur l’efficacité',
        source: 'Poly ch.3, Remarque p. 22, Thm 1.1, Cor. 1.1–1.3 ; DIAGNOSTIC §5.4',
        statement: `1. **Densité** d’une observation $q_\\theta(x)$ ; **log** $\\ell_1(\\theta,x)=\\log q_\\theta(x)$ (écarter les termes sans $\\theta$).
2. **Score** $\\partial_\\theta\\ell_1(\\theta,x)$ ; vérifier $\\mathbb{E}_\\theta[S]=0$ (contrôle de calcul).
3. **Information** $\\mathbb{I}_1(\\theta)=\\mathrm{Var}_\\theta(S)$ ou $-\\mathbb{E}_\\theta[\\partial_\\theta^2\\ell_1]$ (souvent plus court) ; puis $\\mathbb{I}(\\theta)=n\\,\\mathbb{I}_1(\\theta)$ (additivité, observations indépendantes).
4. **Borne** : « le modèle étant régulier (admis), pour tout estimateur **sans biais et régulier** $T$ de $g(\\theta)$ : $\\mathrm{Var}_\\theta(T)\\ge\\frac{g'(\\theta)^2}{n\\,\\mathbb{I}_1(\\theta)}$ (Cor. 1.3) » ; et, $T$ étant sans biais, $R(\\theta,T)=\\mathrm{Var}_\\theta(T)$ (Prop. 1.1).
5. **Comparer** à la variance d’un candidat : égalité pour tout $\\theta$ ⇒ efficace ⇒ E.S.B.V.M. ; si le candidat est biaisé (EMV $1/\\bar X_n$), la borne ne s’applique pas directement.
6. En dimension $d$ : inverser la matrice $\\mathbb{I}(\\theta)$ et calculer $\\nabla g^\\top\\mathbb{I}^{-1}\\nabla g$ (PC3 Ex. 2).`,
        intuition: 'Chaque étape vaut des points : la vérification « score centré », la mention « sans biais et régulier », le facteur $n$.',
        pitfalls: ['Oublier le facteur $n$ ; écrire $1/\\mathbb{I}_{11}$ au lieu de $[\\mathbb{I}^{-1}]_{11}$ ; appliquer la borne à un estimateur biaisé ou à un modèle non régulier ; confondre paramétrisation intensité et moyenne de l’exponentielle.'],
      },
      {
        kind: 'theorem',
        id: 'ch3-meth-risque',
        type: 'methode',
        label: 'Méthode type',
        title: 'Biais, risque quadratique, admissibilité',
        source: 'Poly ch.3, Déf. 1.1–1.4, Prop. 1.1, Ex. 1.8–1.9 ; DIAGNOSTIC §5.6',
        statement: `1. **Loi exacte** de l’estimateur : Gosset ($\\bar X_n$ gaussienne, $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$), additivité Gamma ($\\sum X_i$), loi de $X_{n:n}$ ($nx^{n-1}/\\theta^n$).
2. **Biais** $b(\\theta,T)=\\mathbb{E}_\\theta[T]-g(\\theta)$ (une fonction de $\\theta$).
3. **Risque** $R(\\theta,T)=\\mathrm{Var}_\\theta(T)+b(\\theta,T)^2$ (Prop. 1.1), ou calcul direct en développant le carré.
4. **Comparer** : étudier le signe de $R(\\theta,T_1)-R(\\theta,T_2)$ **pour tout** $\\theta$ (pas en un point).
5. **Inadmissibilité** : exhiber $T^*$ avec $R(\\theta,T^*)\\le R(\\theta,T)$ partout et $<$ en au moins un $\\theta$ (Déf. 1.4) ; famille à un paramètre ($aX_{n:n}$, $c\\sum(X_i-\\bar X_n)^2$, $\\gamma T$) : minimiser le trinôme en le coefficient, et vérifier que le minimiseur ne dépend pas de $\\theta$.`,
        intuition: 'Astuce CC 2022 : écrire $\\bar X_n=\\mu+\\sigma G/\\sqrt n$, $G\\sim\\mathcal{N}(0,1)$, et développer avec $\\mathbb{E}[G^3]=0$, $\\mathbb{E}[G^4]=3$.',
        pitfalls: ['Le carré du biais ; « sans biais » $\\ne$ « meilleur » ; l’inadmissibilité est **transitive** (PC3 Ex. 1).'],
      },
      {
        kind: 'example',
        id: 'ch3-pc3-ex1-q2',
        title: 'PC3 Ex. 1 Q2–Q3 — Construire un estimateur sans biais par une primitive',
        source: 'PC3 Ex. 1 Q2–Q3 ; Poly ch.3, Exercice 1',
        setup: '$n$-échantillon de $\\mathcal{U}([0,\\theta])$ ; $g$ différentiable avec $\\lim_{\\theta\\to0^+}\\theta g(\\theta)=0$. Peut-on choisir $T$ pour que $\\hat\\theta_n^{(1)}=n^{-1}\\sum_iT(X_i)$ soit sans biais de $g(\\theta)$ ? Et $\\tilde T$ pour que $\\hat\\theta_n^{(2)}=\\tilde T(X_{n:n})$ le soit ?',
        steps: [
          { text: '$\\mathbb{E}_\\theta[\\hat\\theta_n^{(1)}]=\\mathbb{E}_\\theta[T(X_1)]=\\theta^{-1}\\int_0^\\theta T(x)\\,\\mathrm{d}x$ ; on veut $\\int_0^\\theta T(x)\\,\\mathrm{d}x=\\theta g(\\theta)$ pour tout $\\theta>0$.', justification: 'Linéarité, même loi, densité $\\theta^{-1}\\mathbb{1}_{[0,\\theta]}$.' },
          { text: '$\\theta\\mapsto\\theta g(\\theta)$ est une primitive de $T$ nulle en $0$ : $T(x)=(xg(x))\'=g(x)+xg\'(x)$.', justification: 'Hypothèse $\\lim_{0^+}\\theta g(\\theta)=0$ (constante d’intégration nulle) ; dériver.' },
          { text: 'Avec la densité $nx^{n-1}/\\theta^n$ de $X_{n:n}$ : on veut $n\\theta^{-n}\\int_0^\\theta\\tilde T(x)x^{n-1}\\,\\mathrm{d}x=g(\\theta)$, donc $\\tilde T(x)x^{n-1}=(x^ng(x)/n)\'$, $\\tilde T(x)=g(x)+\\frac xng\'(x)$.', justification: 'Même raisonnement ; la primitive $x^ng(x)/n$ s’annule en $0$.' },
          { text: 'Pour $g(\\theta)=\\theta$ : $\\hat\\theta_n^{(1)}=\\frac2n\\sum_iX_i$ (risque $\\frac{\\theta^2}{3n}$) et $\\hat\\theta_n^{(2)}=\\frac{n+1}nX_{n:n}$ (risque $\\frac{\\theta^2}{n(n+2)}$) : $\\hat\\theta_n^{(1)}$ inadmissible pour $n>1$.', justification: '$\\mathrm{Var}_\\theta(2X_1)=4\\theta^2/12$ ; Ex. 1.9 ; $n(n+2)>3n$ dès que $n>1$.' },
        ],
        conclusion: 'Réponse à Q2 : **oui** (le texte du poly §1.12, qui affirme le contraire, est incohérent avec son propre corrigé). Puis $\\frac{n+2}{n+1}X_{n:n}$ (risque $\\frac{\\theta^2}{(n+1)^2}$) domine $\\hat\\theta_n^{(2)}$ : inadmissibilité **transitive**.',
      },
      {
        kind: 'example',
        id: 'ch3-pc3-ex2',
        title: 'PC3 Ex. 2 — Régression linéaire gaussienne : information matricielle et bornes',
        source: 'PC3 Ex. 2 Q1–Q4 ; Poly ch.3, Exercice 2',
        setup: '$Y_i\\sim\\mathcal{N}(\\beta_1+\\beta_2x_i,\\sigma^2)$ indépendants, $\\sigma^2$ connu, deux $x_i$ distincts ; $\\mathbf{Y}=(Y_1,\\dots,Y_n)^\\top$, $\\mathbf{X}=[\\mathbf{1}\\ \\mathbf{x}]$, $\\theta=(\\beta_1,\\beta_2)^\\top$.',
        steps: [
          { text: '$\\ell_n(\\theta;\\mathbf{Y})=-\\frac n2\\log(2\\pi\\sigma^2)-\\frac1{2\\sigma^2}\\lVert\\mathbf{Y}-\\mathbf{X}\\theta\\rVert^2$, $\\nabla_\\theta\\ell_n=\\frac1{\\sigma^2}\\mathbf{X}^\\top(\\mathbf{Y}-\\mathbf{X}\\theta)$.', justification: 'Densité de $\\mathcal{N}(\\mathbf{X}\\theta,\\sigma^2\\mathrm{I}_n)$ ; gradient d’une forme quadratique.' },
          { text: '$\\mathbb{I}(\\beta_1,\\beta_2)=\\sigma^{-4}\\mathbf{X}^\\top\\mathbb{E}_\\theta[(\\mathbf{Y}-\\mathbf{X}\\theta)(\\mathbf{Y}-\\mathbf{X}\\theta)^\\top]\\mathbf{X}=\\frac1{\\sigma^2}\\mathbf{X}^\\top\\mathbf{X}=\\frac n{\\sigma^2}\\begin{pmatrix}1&\\bar x\\\\ \\bar x&\\frac1n\\sum_ix_i^2\\end{pmatrix}$.', justification: 'Déf. 1.8 (covariance du score) ; $\\mathbb{E}_\\theta[(\\mathbf{Y}-\\mathbf{X}\\theta)(\\cdot)^\\top]=\\sigma^2\\mathrm{I}_n$ (indépendance). Variante : hessienne constante $-\\mathbf{X}^\\top\\mathbf{X}/\\sigma^2$.' },
          { text: 'Borne pour $\\beta_1$ : $\\nabla g=(1,0)^\\top$, $[\\mathbb{I}^{-1}]_{11}=\\sigma^2\\frac{\\sum_ix_i^2}{n\\sum_i(x_i-\\bar x)^2}$.', justification: 'Thm 1.1 ; inverse $2\\times2$ (comatrice transposée / déterminant $n\\sum_i(x_i-\\bar x)^2>0$).' },
          { text: '$\\beta_2$ connu : $\\tilde{\\mathbb{I}}(\\beta_1)=-\\mathbb{E}[\\partial^2_{\\beta_1}\\tilde\\ell_n]=n/\\sigma^2$, borne $\\sigma^2/n$, plus petite (égale ssi $\\bar x=0$).', justification: 'Cor. 1.1 dans le sous-modèle ; $\\sum_ix_i^2=\\sum_i(x_i-\\bar x)^2+n\\bar x^2$.' },
          { text: 'Borne pour $\\beta_1\\beta_2$ : $\\nabla g=(\\beta_2,\\beta_1)^\\top$, $\\frac{\\sigma^2}{n\\sum_i(x_i-\\bar x)^2}\\big(\\beta_2^2\\sum_ix_i^2-2\\beta_1\\beta_2\\sum_ix_i+n\\beta_1^2\\big)$.', justification: 'Thm 1.1 avec $g$ non linéaire.' },
        ],
        conclusion: 'Piège : la borne pour $\\beta_1$ dans le modèle complet est $[\\mathbb{I}^{-1}]_{11}$, **pas** $1/\\mathbb{I}_{11}=\\sigma^2/n$ (borne quand $\\beta_2$ est connu). Connaître $\\beta_2$ ne peut qu’aider. Lien Examen 2025 Ex. 4 Q11 : l’estimateur des moindres carrés atteint la borne $\\sigma^2(\\mathbf{X}^\\top\\mathbf{X})^{-1}$, il est **efficace**.',
      },
      {
        kind: 'example',
        id: 'ch3-pc3-ex3',
        title: 'PC3 Ex. 3 — Une borne de type Cramér-Rao sans régularité',
        source: 'PC3 Ex. 3 Q1–Q6 ; Poly ch.3, Exercice 3',
        setup: 'Modèle dominé $\\{p_\\theta\\cdot\\mu\\}$, $\\Theta\\subset\\mathbb{R}$, $T$ sans biais de $g$ de carré intégrable. On fixe $\\theta$, $\\theta-\\delta\\in\\Theta$ avec $\\{p_\\theta=0\\}\\subseteq\\{p_{\\theta-\\delta}=0\\}$, et $\\Psi(z)=\\frac{p_{\\theta-\\delta}(z)}{p_\\theta(z)}-1$ si $p_\\theta(z)>0$, $0$ sinon.',
        steps: [
          { text: 'Pour toute $\\Psi$ avec $0<\\mathrm{Var}_\\theta(\\Psi)<\\infty$ : $\\mathrm{Var}_\\theta(T)\\ge\\mathrm{Cov}_\\theta(T,\\Psi)^2/\\mathrm{Var}_\\theta(\\Psi)$.', justification: 'Cauchy-Schwarz (Prop. 2.1) appliqué aux variables centrées.' },
          { text: 'Avec $A_\\alpha=\\{p_\\alpha>0\\}$ et $A_{\\theta-\\delta}\\subset A_\\theta$ : $\\mathbb{E}_\\theta[\\Psi]=\\int(p_{\\theta-\\delta}-p_\\theta)\\mathbb{1}_{A_\\theta}\\,\\mathrm{d}\\mu=1-1=0$.', justification: '$p_{\\theta-\\delta}\\mathbb{1}_{A_\\theta}=p_{\\theta-\\delta}\\mathbb{1}_{A_{\\theta-\\delta}}$ ; densités de probabilité.' },
          { text: '$\\mathrm{Cov}_\\theta(T,\\Psi)=\\mathbb{E}_\\theta[T\\Psi]=\\int T(p_{\\theta-\\delta}\\mathbb{1}_{A_{\\theta-\\delta}}-p_\\theta\\mathbb{1}_{A_\\theta})\\,\\mathrm{d}\\mu=g(\\theta-\\delta)-g(\\theta)$.', justification: '$\\Psi$ centrée ; $T$ sans biais sous $\\mathbb{P}_{\\theta-\\delta}$ **et** sous $\\mathbb{P}_\\theta$.' },
          { text: '$\\mathrm{Var}_\\theta(T)\\ge\\frac{(g(\\theta)-g(\\theta-\\delta))^2}{\\int_{A_\\theta}(1-p_{\\theta-\\delta}/p_\\theta)^2p_\\theta\\,\\mathrm{d}\\mu}$ ; en divisant par $\\delta^2$ et $\\delta\\to0$ ($\\Theta$ ouvert, $g$ dérivable, limite/intégrale permutables) : Cramér-Rao.', justification: 'Combinaison ; convergence dominée (conditions de la Déf. 1.6).' },
          { text: 'Uniforme, $g(\\theta)=\\theta$, $\\delta\\in\\,]0,\\theta[$ : dénominateur $\\theta^n/(\\theta-\\delta)^n-1$ ; avec $\\delta=c\\theta/n$ : $\\mathrm{Var}_\\theta(T)\\ge\\frac{\\theta^2}{n^2}\\tau_n(c)$, $\\tau_n(c)=\\frac{c^2}{(1-c/n)^{-n}-1}\\to\\frac{c^2}{e^c-1}$.', justification: 'Intégrale sur le pavé $[0,\\theta-\\delta]^n$ ; $(1-c/n)^{-n}\\to e^c$.' },
        ],
        conclusion: 'Sans aucune régularité, la variance des estimateurs sans biais de $\\theta$ est d’ordre $\\theta^2/n^2$ : la vitesse $n^{-2}$ de $\\frac{n+1}nX_{n:n}$ (risque $\\frac{\\theta^2}{n(n+2)}$) est la bonne, à une constante $\\approx1{,}54$ près.',
      },
      {
        kind: 'viz',
        id: 'ch3-s8-viz-hcr',
        vizId: 'ch3-borne-sans-regularite',
        caption: '$c\\mapsto\\tau_n(c)$ pour le $n$ choisi et sa limite $c^2/(e^c-1)$ (maximum $\\approx0{,}648$ en $c\\approx1{,}59$), et le rapport $n/((n+2)\\tau_n(c))$ entre le risque de $\\frac{n+1}nX_{n:n}$ et la borne.',
      },
      {
        kind: 'example',
        id: 'ch3-pc3-ex4',
        title: 'PC3 Ex. 4 — Estimateurs linéaires : avec et sans contrainte de biais',
        source: 'PC3 Ex. 4 Q1–Q2 ; Poly ch.3, Exercice 4',
        setup: 'Translation-échelle $p_\\theta(x)=\\frac1\\sigma q(\\frac{x-\\theta}\\sigma)$, $q$ de moyenne $0$ et variance $1$, $\\sigma$ connu ; $\\hat\\theta_n(\\underline{a}_n)=\\sum_ia_{i,n}X_i$.',
        steps: [
          { text: '$\\mathbb{E}_\\theta[\\hat\\theta_n(\\underline{a}_n)]=\\theta\\sum_ka_k$, $\\mathrm{Var}_\\theta=\\sigma^2\\sum_ka_k^2$, $R=\\theta^2(\\sum_ka_k-1)^2+\\sigma^2\\sum_ka_k^2$.', justification: '$X_k\\overset{d}{=}\\theta+\\sigma Y_k$ ; indépendance ; Prop. 1.1.' },
          { text: 'Sans biais ($\\sum_ka_k=1$) : Cauchy-Schwarz ou Lagrange ($2a_i+\\lambda=0$, $\\lambda=-2/n$) donnent $a_k=1/n$, risque $\\sigma^2/n$.', justification: 'Ex. 1.11.' },
          { text: 'Sans contrainte : $\\partial_{a_i}R=2\\theta^2(\\sum_ka_k-1)+2\\sigma^2a_i=0$ ; hessienne $2\\sigma^2I+2\\theta^2\\mathbf{1}\\mathbf{1}^\\top$ définie positive : unique minimum.', justification: 'Stricte convexité.' },
          { text: 'Sommer sur $i$ : $\\sum_ka_k=\\frac{n\\theta^2}{\\sigma^2+n\\theta^2}$, puis $a_i=\\frac{\\theta^2}{\\sigma^2+n\\theta^2}$, risque $\\frac{\\sigma^2\\theta^2}{\\sigma^2+n\\theta^2}<\\frac{\\sigma^2}n$.', justification: 'Réinjecter dans l’équation du gradient.' },
        ],
        conclusion: 'Classe plus grande ⇒ optimum plus bas (rétrécissement de $\\bar X_n$ vers $0$). Mais les poids **dépendent de $\\theta$** inconnu : c’est une **borne inférieure**, pas un estimateur utilisable.',
      },
      {
        kind: 'example',
        id: 'ch3-pc3-ex5',
        title: 'PC3 Ex. 5 — Statistiques d’ordre exponentielles : un estimateur biaisé qui domine X̄ₙ',
        source: 'PC3 Ex. 5 Q1–Q6 ; Poly ch.3, Exercice 5',
        setup: 'Densité $f_\\theta(x)=\\theta^{-1}e^{-x/\\theta}\\mathbb{1}_{\\mathbb{R}_+}(x)$ (**$\\theta$ = moyenne**). Espacements $Z_1=nX_{1:n}$, $Z_k=(n-k+1)(X_{k:n}-X_{k-1:n})$ ; $\\hat\\theta_n(\\underline{a}_n)=\\sum_ia_{i,n}X_{i:n}$.',
        steps: [
          { text: 'Densité jointe des statistiques d’ordre : $n!\\,p_\\theta(y_1,\\dots,y_n)\\mathbb{1}_{\\{0\\le y_1<\\dots<y_n\\}}$.', justification: 'Décomposition selon la permutation qui ordonne ($n!$ termes égaux), fonction muette.' },
          { text: '$(Z_1,\\dots,Z_n)$ i.i.d. de densité $f_\\theta$ (moyenne $\\theta$, variance $\\theta^2$).', justification: 'Changement de variables de jacobien $n!$ et $\\sum_ky_k=\\sum_jz_j$.' },
          { text: '$\\hat\\theta_n(\\underline{a}_n)=\\sum_jm_{j,n}Z_j$, $m_{j,n}=\\frac1{n-j+1}\\sum_{i\\ge j}a_{i,n}$ ; $R=\\theta^2(\\sum_jm_{j,n}-1)^2+\\theta^2\\sum_jm_{j,n}^2$.', justification: 'Interversion des sommes ; indépendance des $Z_j$ ; Prop. 1.1.' },
          { text: 'Sans biais : $m_{j,n}=1/n$, $a_{i,n}=1/n$ ($\\bar X_n$, risque $\\theta^2/n$) ; sans contrainte : $m_{j,n}=a_{i,n}=\\frac1{n+1}$ (risque $\\frac{\\theta^2}{n+1}$).', justification: 'Comme PC3 Ex. 4 avec $\\sigma^2=\\theta^2$ ; inversion $a_{j,n}=(n-j+1)m_{j,n}-(n-j)m_{j+1,n}$.' },
        ],
        conclusion: 'Ici les poids optimaux **ne dépendent pas de $\\theta$** : $\\frac1{n+1}\\sum_iX_i$ est un vrai estimateur, biaisé, qui domine $\\bar X_n$ — pourtant efficace (borne $\\theta^2/n$) parmi les sans biais. Efficace $\\ne$ admissible.',
      },
      {
        kind: 'example',
        id: 'ch3-pc7-ex2-q2',
        title: 'PC7 Ex. 2 Q2 — Biais et risque de l’EMV de Γ(2, θ)',
        source: 'PC7 Ex. 2 Q2',
        setup: 'Modèle $\\Gamma(2,\\theta)$ (intensité), EMV $\\hat\\theta_n=2/\\bar X_n=2n/\\sum_iX_i$.',
        steps: [
          { text: '$\\sum_iX_i\\sim\\Gamma(2n,\\theta)$.', justification: 'Additivité des lois Gamma (indépendance).' },
          { text: '$\\mathbb{E}_\\theta[\\hat\\theta_n]=2n\\int_0^\\infty\\frac1x\\frac{\\theta^{2n}x^{2n-1}}{\\Gamma(2n)}e^{-\\theta x}\\,\\mathrm{d}x=\\frac{2n}{2n-1}\\theta$ : biais $\\frac\\theta{2n-1}>0$.', justification: 'Transfert ; on reconnaît $\\Gamma(2n-1)/\\theta^{2n-1}$.' },
          { text: '$\\mathbb{E}_\\theta[\\hat\\theta_n^2]=\\frac{4n^2\\theta^2}{(2n-1)(2n-2)}$, d’où $R(\\theta,\\hat\\theta_n)=\\theta^2\\frac{n+1}{(2n-1)(n-1)}$ ($n\\ge2$).', justification: 'Même calcul avec $x^{-2}$ ; Prop. 1.1.' },
        ],
        conclusion: '$n\\,R(\\theta,\\hat\\theta_n)\\to\\theta^2/2=1/\\mathbb{I}_1(\\theta)$ avec $\\mathbb{I}_1(\\theta)=2/\\theta^2$ : l’EMV, biaisé à $n$ fixé, atteint la borne **asymptotiquement** (ch.7). Jensen : $\\mathbb{E}[1/\\bar X_n]\\ne1/\\mathbb{E}[\\bar X_n]$.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 9. À l’examen
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s9-examen',
    title: '9. À l’examen : ce qui tombe et la rédaction attendue',
    role: 'liens-examen',
    intro: 'Le ch.3 pèse ≈ 10 % de l’Examen 2025 et ≈ 15 % du CC 2022 (DIAGNOSTIC §8) : calculs courts et standard, donc très rentables.',
    blocks: [
      {
        kind: 'text',
        id: 'ch3-s9-2025-ex1',
        title: 'Examen 2025 Ex. 1 Q1 — Borne de Cramér-Rao, modèle exponentiel (≈ 1 pt)',
        text: `Énoncé : $n$-échantillon de $p_\\theta(x)=\\theta e^{-\\theta x}$, régularité admise ; « borne de Cramér-Rao pour un estimateur régulier sans biais de $\\theta$ ».

**Rédaction attendue** : $\\ell_1(\\theta,x)=\\log\\theta-\\theta x$ ; score $\\frac1\\theta-x$, centré car $\\mathbb{E}_\\theta[X]=1/\\theta$ ; $\\mathbb{I}_1(\\theta)=\\mathrm{Var}_\\theta(X)=1/\\theta^2$ (ou $-\\mathbb{E}_\\theta[\\partial^2_\\theta\\ell_1]=1/\\theta^2$) ; additivité (Prop. 1.2 (iii)) : $\\mathbb{I}(\\theta)=n/\\theta^2$ ; Cor. 1.3 avec $g'=1$ : pour tout $T$ **sans biais et régulier**,

$$\\mathbb{E}_\\theta[(T-\\theta)^2]=\\mathrm{Var}_\\theta(T)\\ge\\frac{\\theta^2}n.$$

**Remarque qui rapporte** : l’EMV $1/\\bar X_n$ est **biaisé** ($\\mathbb{E}_\\theta[1/\\bar X_n]=\\frac n{n-1}\\theta$) : la borne ne s’applique pas à lui directement ; sa variance asymptotique $\\theta^2$ atteint la borne asymptotiquement (ch.6 Ex. 1.7, ch.7).`,
      },
      {
        kind: 'text',
        id: 'ch3-s9-2025-ex2',
        title: 'Examen 2025 Ex. 2 Q3–Q4 et Ex. 4 Q11 — biais, variance, efficacité (≈ 1,25 pt)',
        text: `Modèle log-normal, $Y_i=\\ln X_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$.

- **Q3** : $\\hat\\mu_{ML}=\\bar Y_n\\sim\\mathcal{N}(\\mu,\\sigma^2/n)$ : biais nul, variance $\\sigma^2/n$ = borne de Cramér-Rao pour $\\mu$ (efficace).
- **Q4** : $(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ (Gosset) ; $\\widehat{\\sigma^2}_{ML}=\\frac{n-1}nS_n^2$ : biais $-\\sigma^2/n$, variance $\\frac{2(n-1)\\sigma^4}{n^2}$, risque $\\frac{(2n-1)\\sigma^4}{n^2}<\\frac{2\\sigma^4}{n-1}=R(\\theta,S_n^2)$ (Ex. 1.8) : l’estimateur sans biais est inadmissible.
- **Ex. 4 Q11** (réponse courte) : en régression gaussienne, $\\hat\\beta$ est de variance minimale parmi les estimateurs sans biais : BLUE (Gauss-Markov) parmi les linéaires sans biais, et il atteint la borne $\\sigma^2(Z^\\top Z)^{-1}$ : **efficace** (PC3 Ex. 2, Ex. 1.11, Déf. 1.10).`,
      },
      {
        kind: 'text',
        id: 'ch3-s9-cc2022',
        title: 'CC 2022 Ex. 2 Q2–Q4 — deux estimateurs de μ² (≈ 2 pts)',
        text: `$X_i\\sim\\mathcal{N}(\\mu,\\sigma^2)$, $T_{1,n}=\\bar X_n^2$, $T_{2,n}=\\bar X_n^2-\\frac1nS_n^2$ ; rappel $\\mathbb{E}[G^4]=3$.

- **Q2** : $\\mathbb{E}[\\bar X_n^2]=\\mu^2+\\sigma^2/n$ : biais $\\sigma^2/n$ ; $\\mathbb{E}[(\\bar X_n^2-\\mu^2)^2]=\\mathbb{E}[(\\bar X_n-\\mu)^4]+4\\mu^2\\frac{\\sigma^2}n=3\\frac{\\sigma^4}{n^2}+4\\mu^2\\frac{\\sigma^2}n$ (moment d’ordre 3 nul).
- **Q3** : $\\mathbb{E}[T_{2,n}]=\\mu^2$ : **sans biais** ; risque (non traité par le corrigé) $4\\mu^2\\frac{\\sigma^2}n+2\\frac{\\sigma^4}{n^2}+\\frac{2\\sigma^4}{n^2(n-1)}$ par indépendance de $\\bar X_n$ et $S_n^2$ (Gosset).
- **Q4** : $R(T_{1,n})-R(T_{2,n})=\\frac{\\sigma^4}{n^2}\\cdot\\frac{n-3}{n-1}$ : pour $n\\ge4$, $T_{2,n}$ fait strictement mieux pour **tout** $\\theta$ : $T_{1,n}$ est **inadmissible** (pour $n=3$, risques égaux ; $n=2$, $T_{1,n}$ meilleur).`,
      },
      {
        kind: 'text',
        id: 'ch3-s9-pieges',
        title: 'Pièges relevés dans les annales et les corrigés (DIAGNOSTIC §6)',
        text: `- **Hypothèses de Cramér-Rao** : modèle régulier (support indépendant de $\\theta$ !), $\\Theta$ ouvert, estimateur **sans biais et régulier**, $g$ dérivable. L’uniforme n’est pas régulier ; l’EMV $1/\\bar X_n$ de l’exponentielle est biaisé.
- **Facteur $n$** : borne $\\frac{g'(\\theta)^2}{n\\,\\mathbb{I}_1(\\theta)}$ pour un $n$-échantillon.
- **Multidimensionnel** : $[\\mathbb{I}^{-1}]_{jj}$, pas $1/\\mathbb{I}_{jj}$ (PC3 Ex. 2).
- **Conventions exponentielle / Gamma** : intensité (poly, Examen 2025) contre moyenne/échelle (PC3 Ex. 5, CC 2022) ; écrire la densité utilisée.
- **Biais de l’EMV de la variance** : $\\widehat{\\sigma^2}_{ML}=\\frac{n-1}nS_n^2$, biais $-\\sigma^2/n$.
- **Admissibilité** : comparer les risques **pour tout** $\\theta$ ; admissible $\\ne$ bon ; sans biais $\\ne$ meilleur ; efficace $\\ne$ admissible (PC3 Ex. 5).
- **Le risque est une fonction**, pas un nombre ; le **carré** du biais.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 10. Compléments hors programme
  // -------------------------------------------------------------------------
  {
    id: 'ch3-s10-hp',
    title: '10. Compléments (non exigibles) : règles de décision, minimax et Bayes, Th. 4.1, rétrécissement',
    role: 'complements',
    scope: 'hors-programme',
    intro: 'Section « 4 Les compléments » du poly (p. 44–47), « non exigibles ». Résumés concis.',
    blocks: [
      {
        kind: 'text',
        id: 'ch3-s10-decision',
        title: 'Déf. 4.1 — Risque d’une règle de décision ; les tests comme règles de décision',
        scope: 'hors-programme',
        text: 'Espace d’actions $(\\mathsf{A},\\mathcal{A})$, perte $\\ell:\\Theta\\times\\mathsf{A}\\to\\mathbb{R}_+$, règle $\\delta:\\mathsf{Z}\\to\\mathsf{A}$ mesurable, risque $R_\\ell(\\theta,\\delta)=\\mathbb{E}_\\theta[\\ell(\\theta,\\delta(Z))]$ (éq. (15)). Estimation : $\\mathsf{A}=\\mathbb{R}^p$. Tests : $\\mathsf{A}=\\{0,1\\}$, perte 0-1 : risque $\\beta_\\phi(\\theta)$ sur $\\Theta_0$ et $1-\\beta_\\phi(\\theta)$ sur $\\Theta_1$ (repris au ch.4).',
      },
      {
        kind: 'text',
        id: 'ch3-s10-minimax',
        title: 'Approches minimax et bayésienne',
        scope: 'hors-programme',
        text: 'Minimax : $\\overline{R}_\\ell(\\delta)=\\sup_\\theta R_\\ell(\\theta,\\delta)$, risque minimax $\\inf_\\delta\\overline{R}_\\ell(\\delta)$ (sûr mais parfois conservateur). Bayésien : loi a priori $\\Pi$, risque intégré $R_\\ell(\\Pi,\\delta)=\\int R_\\ell(\\theta,\\delta)\\,\\Pi(\\mathrm{d}\\theta)$, risque de Bayes $\\inf_\\delta R_\\ell(\\Pi,\\delta)$. Les deux agrégations rétablissent un **ordre total** et excluent l’estimateur constant ; le risque intégré réapparaît en apprentissage statistique (ch.8).',
      },
      {
        kind: 'theorem',
        id: 'ch3-prop-4-1',
        type: 'proposition',
        label: 'Proposition 4.1',
        title: 'Fonctions estimables sans biais dans le modèle binomial',
        source: 'Poly ch.3, Compléments, Prop. 4.1, p. 45',
        scope: 'hors-programme',
        hypotheses: ['Modèle $\\mathrm{Bin}(n,\\theta)$, $\\Theta=[0,1[$.'],
        statement: '$g$ admet un estimateur sans biais **ssi** $g$ est un polynôme de degré $\\le n$ ; il est alors **unique**.',
        intuition: '$\\Phi:T\\mapsto(\\theta\\mapsto\\mathbb{E}_\\theta[T])$ est linéaire entre deux espaces de dimension $n+1$, injective (le polynôme $\\sum_k\\binom nkT(k)t^k$, $t=\\theta/(1-\\theta)$, est nul sur $[0,\\infty[$), donc bijective. (NB : l’Ex. 1.5 prend $\\Theta=\\,]0,1]$.)',
      },
      {
        kind: 'theorem',
        id: 'ch3-thm-4-1',
        type: 'theoreme',
        label: 'Théorème 4.1',
        title: 'Existence d’un estimateur efficace',
        source: 'Poly ch.3, Compléments, Thm 4.1, p. 46',
        scope: 'hors-programme',
        hypotheses: ['Modèle régulier, $\\Theta\\subseteq\\mathbb{R}$ ouvert.'],
        statement: 'Il existe un estimateur efficace $T^*$ de $\\theta$ **ssi** $p_\\theta(z)=h(z)\\exp\\big(A(\\theta)T^*(z)+B(\\theta)\\big)$ avec $A$, $B$ différentiables (famille exponentielle).',
        intuition: 'Efficacité $\\iff$ égalité dans Cauchy-Schwarz $\\iff$ score colinéaire à $T-\\theta$ ; on intègre en $\\theta$. Le score centré impose $B\'(\\theta)=-\\theta A\'(\\theta)$, d’où $\\nabla_\\theta\\ell=A\'(\\theta)\\{T^*(Z)-\\theta\\}$ : l’estimateur efficace, s’il existe, est l’EMV. (Preuve esquissée dans le poly.)',
      },
      {
        kind: 'text',
        id: 'ch3-s10-equivariance',
        title: 'Estimation équivariante du paramètre de translation',
        scope: 'hors-programme',
        text: '$p_\\theta(x)=p(x-\\theta)$, perte $w(u-v)$. Estimateurs équivariants : $T(x_1+c,\\dots,x_n+c)=T(x_1,\\dots,x_n)+c$ (éq. (16)). Alors $R_w(\\theta,T)=R_w(0,T)$ : **le risque ne dépend pas de $\\theta$**, il suffit de minimiser un nombre.',
      },
      {
        kind: 'text',
        id: 'ch3-s10-retrecissement',
        title: 'Estimateur à rétrécissement : analyse complète',
        scope: 'hors-programme',
        text: '$T_\\gamma=\\gamma T$, $\\upsilon(\\theta)=\\mathrm{Var}_\\theta(T)$ : $R(\\theta,T_\\gamma)=(\\gamma-1)^2g(\\theta)^2+\\gamma^2\\upsilon(\\theta)$. $\\gamma>1$ : inadmissible (battu par $T$). Si $g(\\theta)^2\\le\\upsilon(\\theta)$ pour tout $\\theta$ : $T_\\gamma$ préférable à $T$ pour tout $\\gamma\\in[0,1]$. Sinon, $R(\\theta,T_\\gamma)\\le\\upsilon(\\theta)$ ssi $\\gamma\\ge\\gamma_{\\min}(\\theta)=\\frac{g(\\theta)^2-\\upsilon(\\theta)}{g(\\theta)^2+\\upsilon(\\theta)}$ : seuil dépendant de $\\theta$, non calculable en pratique.',
      },
      {
        kind: 'text',
        id: 'ch3-s10-bruits',
        title: 'Le paramètre de translation : quatre lois de bruit',
        scope: 'hors-programme',
        text: 'Suite de l’Ex. 1.1. Bruit uniforme $\\mathbb{1}_{[-1/2,1/2]}$ : moyenne $1/(12n)$, médiane $\\approx1/(4n)$, mais la **demi-somme des extrêmes** est de loin la meilleure (variance d’ordre $n^{-2}$, non-régularité). Bruit de Cauchy : moyenne et demi-somme sans espérance ($\\bar X_n$ a la même loi de Cauchy pour tout $n$) ; seule la **médiane** reste raisonnable.',
      },
    ],
  },
]
