import type { SummarySheet } from '../types'

export const summarySheet: SummarySheet = {
  definitions: [
    { label: 'Test pur, fonction critique (§1.1)', text: 'Test pur $\\phi:\\mathsf{Z}\\to\\{0,1\\}$ (rejet si $\\phi(Z)=1$), région de rejet $\\mathcal{R}=\\{\\phi=1\\}$ ; plus généralement fonction critique $\\phi:\\mathsf{Z}\\to[0,1]$ (test randomisé, Déf. 4.1).', source: 'Poly ch.5, §1.1' },
    { label: 'Déf. 1.1 — Puissance, taille, niveau', text: '$\\beta_\\phi(\\theta)=\\mathbb{E}_\\theta[\\phi(Z)]$ ; taille $\\overline{\\alpha}(\\phi)=\\sup_{\\Theta_0}\\beta_\\phi$ ; niveau $\\alpha$ si $\\overline{\\alpha}(\\phi)\\le\\alpha$ ; $\\mathcal{K}_\\alpha(\\Theta_0)$ ensemble des tests de niveau $\\alpha$. Le niveau ne dépend que des lois de $\\Theta_0$.', source: 'Poly ch.5, Déf. 1.1' },
    { label: 'Déf. 1.2 — Test U.P.P.(α)', text: '$\\phi\\in\\mathcal{K}_\\alpha(\\Theta_0)$ et $\\beta_\\phi(\\theta)=\\sup_{\\psi\\in\\mathcal{K}_\\alpha(\\Theta_0)}\\beta_\\psi(\\theta)$ pour tout $\\theta\\in\\Theta_1$.', source: 'Poly ch.5, Déf. 1.2' },
    { label: 'Déf. 1.3 — Rapport de vraisemblance', text: '$r(z)=p_{\\theta_1}(z)/p_{\\theta_0}(z)$ là où $p_{\\theta_0}(z)>0$ ; régions $\\{p_{\\theta_1}(z)>c\\,p_{\\theta_0}(z)\\}$.', source: 'Poly ch.5, Déf. 1.3' },
    { label: 'Cadre 1.1 — Absence d’atome', text: '$\\mathbb{P}_\\theta(p_{\\theta_1}(Z)=c\\,p_{\\theta_0}(Z))=0$ pour tout $c\\ge0$, $\\theta\\in\\Theta$ ; vraie si $r(Z)$ à densité, fausse en discret.', source: 'Poly ch.5, Cadre 1.1' },
    { label: 'Déf. 1.4–1.5 — Rapport de vraisemblance monotone', text: '$p_\\theta(z)=h(z)\\,\\psi(T(z);\\theta)$ (2) et, pour $\\theta>\\theta\'$, $t\\mapsto\\psi(t;\\theta)/\\psi(t;\\theta\')$ **strictement** croissante (Déf. 1.4) ou strictement décroissante (Déf. 1.5).', source: 'Poly ch.5, Déf. 1.4–1.5' },
    { label: 'Outils — Fonction de survie, quantile', text: '$\\bar F(c)=\\mathbb{P}(Y>c)$ décroissante, continue à droite, $\\bar F(c^-)-\\bar F(c)=\\mathbb{P}(Y=c)$ (Prop. 2.1) ; $F^{-1}(u)=\\inf\\{c:F(c)\\ge u\\}$.', source: 'Poly ch.5, Outils, Prop. 2.1, p. 26' },
    { label: 'Outils — Lois géométrique et binomiale négative', text: '$\\mathbb{P}_\\theta(Y=k)=\\theta(1-\\theta)^k$, $k\\in\\mathbb{N}$ (nombre d’échecs) ; $\\sum_{i\\le n}Y_i$ : $\\binom{n+k-1}{k}\\theta^n(1-\\theta)^k$.', source: 'Poly ch.5, Outils, p. 27–28' },
    { label: 'Déf. 4.1 — Test randomisé (hors programme)', text: 'Étant donnée $Z$, rejet avec probabilité $\\phi(Z)$ via une Bernoulli indépendante ; zones $\\mathsf{Z}_1$, $\\mathsf{Z}_0$, $\\mathsf{Z}_p$.', source: 'Poly ch.5, Déf. 4.1' },
    { label: 'Déf. 4.2 — Test sans biais, U.M.P.U. (hors programme)', text: 'Sans biais : niveau $\\alpha$ et $\\beta_\\phi\\ge\\alpha$ sur $\\Theta_1$ ; U.M.P.U. : U.P.P. parmi les tests sans biais.', source: 'Poly ch.5, Déf. 4.2 ; PC5 Ex. 2' },
    { label: 'Déf. 4.3 — Rapport généralisé (hors programme)', text: '$\\Lambda_n=\\sup_{\\Theta_0}\\mathrm{L}_n/\\sup_\\Theta\\mathrm{L}_n\\le1$ ; rejet si $\\Lambda_n\\le c_{n,\\alpha}$ (petit). Modèle linéaire : test de Fisher $F\\sim F(p-r,n-p)$ sous $H_0$.', source: 'Poly ch.5, Déf. 4.3, Exercice 6' },
  ],
  theorems: [
    { label: 'Th. 1.1 — Neyman-Pearson', hypotheses: ['$\\mathbb{P}_\\theta=p_\\theta\\cdot\\nu$, $\\nu$ $\\sigma$-finie, $\\Theta=\\{\\theta_0,\\theta_1\\}$', 'Absence d’atome (Cadre 1.1)', '$\\alpha\\in\\,]0,1[$'], text: '(i) $\\exists c_\\alpha>0$ : $\\phi^\\star=\\mathbb{1}_{\\{p_{\\theta_1}>c_\\alpha p_{\\theta_0}\\}}$ de taille exactement $\\alpha$ (TVI sur $\\bar F$). (ii) $\\phi^\\star$ U.P.P.($\\alpha$), $\\mathbb{E}_{\\theta_1}[\\phi^\\star]\\ge\\alpha$. Preuve : $(\\phi^\\star-\\phi)(p_{\\theta_1}-c_\\alpha p_{\\theta_0})\\ge0$ intégrée, taille exacte, $c_\\alpha>0$ ; test constant $\\psi\\equiv\\alpha$.', source: 'Poly ch.5, Th. 1.1' },
    { label: 'Th. 1.2 — Unicité', hypotheses: ['Hypothèses du Th. 1.1', '$\\phi^{\\star\\star}$ U.P.P.($\\alpha$)'], text: '$\\phi^{\\star\\star}=1$ sur $\\{p_{\\theta_1}>c_\\alpha p_{\\theta_0}\\}$, $0$ sur $\\{p_{\\theta_1}<c_\\alpha p_{\\theta_0}\\}$, $\\nu$-p.p. ; $=\\phi^\\star$ $\\mathbb{P}_{\\theta_0}$- et $\\mathbb{P}_{\\theta_1}$-p.s.', source: 'Poly ch.5, Th. 1.2' },
    { label: 'Lemme 2.1 — Monotonie', hypotheses: ['RVM croissant en $T$', '$\\varphi$ croissante, $\\mathbb{E}_\\theta|\\varphi\\circ T|<\\infty$'], text: '$\\theta\\mapsto\\mathbb{E}_\\theta[\\varphi\\circ T(Z)]$ croissante (dominance stochastique).', source: 'Poly ch.5, Outils, Lemme 2.1' },
    { label: 'Th. 1.3 — U.P.P. unilatéral, cas croissant', hypotheses: ['RVM croissant en $T$ (Déf. 1.4)', '$T(Z)$ à densité sous chaque $\\mathbb{P}_\\theta$', '$\\theta_0\\in\\Theta$, $\\alpha\\in\\,]0,1[$'], text: '$\\phi_{\\theta_0}=\\mathbb{1}_{\\{T>d_\\alpha\\}}$, $\\mathbb{P}_{\\theta_0}(T>d_\\alpha)=\\alpha$ : U.P.P.($\\alpha$) pour $\\theta\\le\\theta_0$ contre $\\theta>\\theta_0$ ; puissance croissante. Preuve en 3 temps (NP point par point, Lemme 2.1, inclusion des classes).', source: 'Poly ch.5, Th. 1.3' },
    { label: 'Th. 1.4 — U.P.P. unilatéral, cas décroissant', hypotheses: ['RVM décroissant en $T$ (Déf. 1.5)', '$T(Z)$ à densité', '$\\alpha\\in\\,]0,1[$'], text: '$\\mathbb{1}_{\\{T<d_\\alpha\\}}$, $\\mathbb{P}_{\\theta_0}(T<d_\\alpha)=\\alpha$ : U.P.P. pour $\\theta\\le\\theta_0$ contre $\\theta>\\theta_0$ ; puissance croissante (changement $T\\to-T$).', source: 'Poly ch.5, Th. 1.4' },
    { label: 'Méthode 1.3 — Trois conditions', hypotheses: ['Paramètre scalaire', 'Hypothèse unilatérale', 'RVM strict en $T$ (et $T(Z)$ à densité pour un test pur)'], text: 'Test $\\mathbb{1}_{\\{T>d_\\alpha\\}}$ ou $\\mathbb{1}_{\\{T<d_\\alpha\\}}$ selon le sens, taille exactement $\\alpha$ en $\\theta_0$.', source: 'Poly ch.5, Méthode 1.3' },
    { label: 'Prop. 1.1 — Pas d’U.P.P. bilatéral', hypotheses: ['$n$-échantillon d’une famille exponentielle $h(x)e^{\\varphi(\\theta)T(x)-\\psi(\\theta)}$', '$\\varphi$ strictement croissante', '$\\sum_iT(X_i)$ sans atome', '$\\alpha\\in\\,]0,1[$'], text: 'Aucun test U.P.P.($\\alpha$) pour $\\theta=\\theta_0$ contre $\\theta\\ne\\theta_0$ : il serait égal p.s. à $\\phi_+$ et $\\phi_-$ (Th. 1.2), qui diffèrent avec probabilité $\\alpha$. Gaussien : Ex. 1.6.', source: 'Poly ch.5, Prop. 1.1' },
    { label: 'Ex. 1.3 — Gaussien, variance connue', hypotheses: ['$\\mathcal{N}(\\mu,\\sigma^2)$, $\\sigma$ connu, $\\mu_0<\\mu_1$'], text: '$\\phi^\\star=\\mathbb{1}_{\\{\\bar X_n>\\mu_0+z_{1-\\alpha}\\sigma/\\sqrt n\\}}$, puissance $1-\\Phi(z_{1-\\alpha}-\\sqrt n\\,m/\\sigma)$, seuil indépendant de $\\mu_1$ ; $p$-valeur $1-\\Phi(\\sqrt n(\\bar X_n-\\mu_0)/\\sigma)$.', source: 'Poly ch.5, Ex. 1.3, §1.10' },
    { label: 'Exercice 1 / PC5 Ex. 1 — Exponentiel de moyenne θ', hypotheses: ['$p_\\theta(x)=\\theta^{-1}e^{-x/\\theta}$'], text: 'RVM croissant en $\\sum x_i$ ; U.P.P. : $\\mathbb{1}_{\\{\\sum X_i>\\frac{\\theta_0}2\\chi^2_{1-\\alpha}(2n)\\}}$ ($2\\sum X_i/\\theta_0\\sim\\chi^2(2n)$). Intensité ($\\theta e^{-\\theta x}$, Examen 2025) : rejet si $\\sum X_i<\\chi^2_\\alpha(2n)/(2\\theta_0)$.', source: 'Poly ch.5, Exercice 1 ; Examen 2025 Ex. 1 Q2' },
    { label: 'Th. 4.1 — NP général (hors programme)', hypotheses: ['Deux hypothèses simples, sans hypothèse sur les atomes', '$\\alpha\\in\\,]0,1[$'], text: '$\\exists(c_\\alpha,\\gamma_\\alpha)$ : rejet si $r>c_\\alpha$, avec probabilité $\\gamma_\\alpha$ si $r=c_\\alpha$ ; taille $\\alpha$, U.P.P. ; unicité perdue. Version randomisée du Th. 1.3 (Ex. 4.2 : $d=526$, $\\gamma=0{,}4832$).', source: 'Poly ch.5, Th. 4.1, Ex. 4.1–4.2' },
    { label: 'Prop. 4.1 — U.P.P. ⇒ sans biais (hors programme)', hypotheses: ['$\\phi$ U.P.P.($\\alpha$)'], text: '$\\beta_\\phi\\ge\\alpha$ sur $\\Theta_1$ (comparaison au test constant). Le test bilatéral gaussien est U.M.P.U., non U.P.P. (Exercice 5).', source: 'Poly ch.5, Prop. 4.1' },
  ],
  methods: [
    {
      title: 'Test de Neyman-Pearson (deux hypothèses simples)',
      steps: ['Écrire $r(z)=p_{\\theta_1}(z)/p_{\\theta_0}(z)$ (densité produit).', 'Vérifier l’absence d’atome (statistique à densité).', 'Exprimer $r=\\tilde r(T)$ avec $\\tilde r$ strictement monotone ; sens du rejet selon $\\theta_1\\gtrless\\theta_0$.', 'Seuil $d_\\alpha$ par la loi de $T$ **sous $\\mathbb{P}_{\\theta_0}$** (taille exacte).', 'Citer le Th. 1.1 ; remarquer si le seuil ne dépend pas de $\\theta_1$.'],
    },
    {
      title: 'Montrer qu’une famille est à rapport de vraisemblance monotone',
      steps: ['Densité du $n$-échantillon et factorisation $h(z)\\psi(T(z);\\theta)$.', 'Pour $\\theta>\\theta\'$, calculer $\\psi(t;\\theta)/\\psi(t;\\theta\')$.', 'Conclure « strictement croissante / décroissante » (Déf. 1.4 / 1.5) en donnant le signe.'],
    },
    {
      title: 'Test U.P.P. unilatéral et fonction puissance',
      steps: ['Trois conditions (Méthode 1.3) + $T(Z)$ à densité.', 'Région $\\{T>d_\\alpha\\}$ ou $\\{T<d_\\alpha\\}$ (tableau des quatre cas, p. 21).', 'Loi de $T$ sous $\\theta_0$ (additivité Gamma, pivot $\\chi^2$) → quantile.', 'Th. 1.3/1.4 : U.P.P., puissance croissante, taille $\\alpha$.', 'Puissance $\\beta(\\theta)=\\mathbb{P}_\\theta(T>d_\\alpha)$ via un pivot de loi fixe ($T/\\theta$, $\\theta T$).'],
    },
    {
      title: 'Statistique discrète (randomisation, compléments)',
      steps: ['$d_\\alpha=\\inf\\{c:\\mathbb{P}_{\\theta_0}(T>c)\\le\\alpha\\}$.', '$\\gamma_\\alpha=(\\alpha-\\mathbb{P}_{\\theta_0}(T>d_\\alpha))/\\mathbb{P}_{\\theta_0}(T=d_\\alpha)$.', 'Rejet si $T>d_\\alpha$, avec probabilité $\\gamma_\\alpha$ si $T=d_\\alpha$ (renverser si rejet pour $T$ petit).'],
    },
    {
      title: 'Montrer qu’il n’existe pas de test U.P.P. (bilatéral)',
      steps: ['Par l’absurde, supposer $\\phi^\\star$ U.P.P. pour $\\theta\\ne\\theta_0$.', 'Il est U.P.P. contre chaque $\\theta_1>\\theta_0$ et chaque $\\theta_1<\\theta_0$.', 'Unicité (Th. 1.2) : $\\phi^\\star=\\phi_+=\\phi_-$ p.s.', 'Contradiction sur un ensemble de probabilité $\\alpha>0$ sous $\\mathbb{P}_{\\theta_0}$.'],
    },
  ],
  pitfalls: [
    '**Seuil sous $H_0$** : Ex. 1.1, $X>z_{1-\\alpha}-1$ et non $X>z_{1-\\alpha}$ ; ne jamais calculer le seuil sous $\\theta_1$.',
    '**Convention échelle / intensité** : $\\theta^{-1}e^{-x/\\theta}$ (PC5 Ex. 1, CC 2022) $\\Rightarrow$ rejet pour $\\sum X_i$ grand ; $\\theta e^{-\\theta x}$ (Examen 2025) $\\Rightarrow$ rejet pour $\\sum X_i$ **petit**, seuil $\\chi^2_\\alpha(2n)/(2\\theta_0)$.',
    '**Taille ≠ niveau** : la preuve de Neyman-Pearson utilise la taille **exacte** ; en discret, un test pur n’a en général qu’une taille $<\\alpha$ (PC4 Ex. 4 : $0{,}049$).',
    '**Unicité** presque partout seulement ; elle tombe en présence d’atomes (uniforme, exponentielle translatée).',
    '**Stricte monotonie** du rapport : l’uniforme (rapport croissant au sens large) sort de la Déf. 1.4.',
    '**Région de rejet** : pas toujours une queue (Ex. 1.2, variances différentes) ; le critère est « $r$ grand ».',
    '**Bilatéral** : quantile $z_{1-\\alpha/2}$ ; le test bilatéral n’est pas U.P.P. ; les tests unilatéraux sont biaisés pour l’alternative bilatérale.',
    '**Exception** : un U.P.P. de puissance 1 peut avoir une taille $<\\alpha$ (exponentielle translatée, PC5 Ex. 3 et 5).',
    '**Interprétation** : ne pas rejeter $\\ne$ prouver $H_0$ ; la $p$-valeur n’est pas $\\mathbb{P}(H_0)$ ; significatif $\\ne$ important (taille d’effet en $n^{-1/2}$).',
    '**Rapport généralisé** $\\Lambda_n$ : rejet pour les **petites** valeurs, contrairement à $r$.',
  ],
}
