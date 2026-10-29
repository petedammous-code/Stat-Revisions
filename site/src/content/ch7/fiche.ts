import type { SummarySheet } from '../types'

export const summarySheet: SummarySheet = {
  definitions: [
    { label: 'Cadre et notations (§1.1)', text: '$\\mathbb{P}_{n,\\theta}=\\mathbb{Q}_\\theta^{\\otimes n}$ ; $\\theta^\\star$ vraie valeur, $\\theta$ variable muette ; dérivées en $\\theta$ : $\\psi\'$, $m\'$, $m\'\'$ ; fonctions limites $\\mathsf{M}_{\\theta^\\star}$, $\\Psi_{\\theta^\\star}$, empiriques $\\widehat{M}_n$, $\\widehat\\Psi_n$ ; $\\Theta^o$ intérieur ; $\\mathbb{I}$ information (lettre ajourée).', source: 'Poly ch.7, §1.1' },
    { label: 'Déf. 1.1 — M-estimateur', text: '$\\widehat{M}_n(\\hat\\theta_n)=\\max_\\theta\\widehat{M}_n(\\theta)$, $\\widehat{M}_n(\\theta)=\\frac1n\\sum_im(\\theta,X_i)$, avec $\\mathsf{M}_{\\theta^\\star}(\\theta)=\\mathbb{E}_{\\theta^\\star}[m(\\theta,X_1)]$ fini et maximal en $\\theta^\\star$.', source: 'Poly ch.7, Déf. 1.1' },
    { label: 'Déf. 1.2 — Z-estimateur', text: '$\\widehat\\Psi_n(\\hat\\theta_n)=0$, $\\widehat\\Psi_n(\\theta)=\\frac1n\\sum_i\\psi(\\theta,X_i)$, avec $\\psi$ intégrable et $\\Psi_{\\theta^\\star}(\\theta^\\star)=\\mathbb{E}_{\\theta^\\star}[\\psi(\\theta^\\star,X_1)]=0$ (centrage).', source: 'Poly ch.7, Déf. 1.2' },
    { label: 'Exemples 1.1–1.4', text: 'EMV : $m=\\log q_\\theta$, $\\mathsf{M}_{\\theta^\\star}=\\mathrm{Ent}-\\mathrm{KL}$. Moyenne : $\\psi=x-\\theta$ ou $m=-\\frac12(x-\\theta)^2$. Robustes (sans moment d’ordre 2) : Huber $m=-\\delta^2(\\sqrt{1+((\\theta-x)/\\delta)^2}-1)$, $\\psi=\\arctan(x-\\theta)$, $\\psi=\\operatorname{signe}(x-\\theta)$ (médiane).', source: 'Poly ch.7, Ex. 1.1–1.4' },
    { label: 'Déf. 1.3 — Score', text: '$\\ell(\\theta,x)=\\log q_\\theta(x)$, $\\dot\\ell=\\partial_\\theta\\ell$, $\\ddot\\ell=\\partial_\\theta^2\\ell$.', source: 'Poly ch.7, Déf. 1.3' },
    { label: 'Déf. 1.4 — Information de Fisher', text: '$\\mathbb{I}(\\theta)=\\mathbb{E}_\\theta[\\dot\\ell^2]=-\\mathbb{E}_\\theta[\\ddot\\ell]$ (éq. (10), modèle régulier). $\\mathcal{N}(\\theta,\\sigma^2)$ : $\\sigma^{-2}$ ; Poisson : $1/\\theta$ ; $\\mathcal{E}(\\theta)$ : $1/\\theta^2$ ; $\\Gamma(2,\\theta)$ : $2/\\theta^2$ ; Cauchy : $1/2$ ; $LN(\\theta,\\theta)$ : $(1+2\\theta)/(2\\theta^2)$.', source: 'Poly ch.7, Déf. 1.4, Ex. 1.6–1.7 ; PC7 Ex. 2–3' },
    { label: 'Cadre 1.1 — Modèle régulier (scalaire)', text: '$\\Theta$ ouvert ; (R-1) $q_\\theta>0$ ; (R-2) $C^2$ en $\\theta$ avec $\\sup_{\\mathcal{V}}\\{|\\dot\\ell|^2+|\\ddot\\ell|\\}\\le h$, $\\sup_{\\mathcal{V}}q_\\theta\\le g$, $\\int(1+h)g\\,\\mathrm{d}\\mu<\\infty$ ; (R-3) $0<\\mathbb{I}<\\infty$. Exclut les supports dépendant de $\\theta$.', source: 'Poly ch.7, Cadre 1.1' },
    { label: 'Déf. 4.1 — Efficacité asymptotique (hors programme)', text: '$\\widehat\\theta_{n,1}$ plus efficace que $\\widehat\\theta_{n,2}$ si $v_1\\le v_2$ partout, strictement en un point ; efficace dans une classe si aucune suite de la classe n’est plus efficace.', source: 'Poly ch.7, Compléments, Déf. 4.1' },
  ],
  theorems: [
    { label: 'Prop. 1.1 — M régulier ⇒ Z', hypotheses: ['$m(\\cdot,x)$ différentiable sur $\\Theta^o$', 'maximum de $\\widehat{M}_n$ atteint en $\\hat\\theta_n\\in\\Theta^o$'], text: '$\\widehat\\Psi_n(\\hat\\theta_n)=\\nabla\\widehat{M}_n(\\hat\\theta_n)=0$ avec $\\psi=\\nabla m$. Réciproque fausse.', source: 'Poly ch.7, Prop. 1.1' },
    { label: 'Thm 1.1 — Consistance des M-estimateurs', hypotheses: ['(H-1) $\\sup_\\theta|\\widehat{M}_n-\\mathsf{M}_{\\theta^\\star}|\\to0$ en probabilité', '(H-2) $\\sup_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\mathsf{M}_{\\theta^\\star}<\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)$', '(H-3) $\\hat\\theta_n\\in\\Theta$ maximise $\\widehat{M}_n$'], text: '$\\hat\\theta_n\\to\\theta^\\star$ en $\\mathbb{P}_{n,\\theta^\\star}$-probabilité. Clé : $0\\le\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)-\\mathsf{M}_{\\theta^\\star}(\\hat\\theta_n)\\le2\\sup|\\widehat{M}_n-\\mathsf{M}_{\\theta^\\star}|$.', source: 'Poly ch.7, Thm 1.1' },
    { label: 'Thm 1.2 — LGN uniforme', hypotheses: ['$K$ compact, $\\Theta\\subseteq K$', '$\\phi(\\cdot,x)$ continue sur $K$', '$\\int\\sup_K|\\phi|\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}<\\infty$'], text: '$\\sup_K|\\widehat W_n-\\mathsf{W}_{\\theta^\\star}|\\to0$ en probabilité. Preuve : module de continuité $w_\\delta$ (Lemme 2.1), recouvrement fini, LGN en $L$ points.', source: 'Poly ch.7, Thm 1.2' },
    { label: 'Lemme 1.1 et Cor. 1.1 — Cas compact', hypotheses: ['$\\Theta$ compact', '$m(\\cdot,x)$ continue', '$\\int\\sup_\\Theta|m|\\,\\mathrm{d}\\mathbb{Q}_{\\theta^\\star}<\\infty$', '$\\mathsf{M}_{\\theta^\\star}(\\theta)<\\mathsf{M}_{\\theta^\\star}(\\theta^\\star)$ si $\\theta\\ne\\theta^\\star$'], text: 'Maximum unique + continuité sur un compact ⇒ isolé (Lemme 1.1) ; tout M-estimateur est consistant (Cor. 1.1). EMV : compact + continuité de $\\log q_\\theta$ + domination + identifiabilité.', source: 'Poly ch.7, Lemme 1.1, Cor. 1.1' },
    { label: 'Thm 1.3 — Consistance des Z-estimateurs', hypotheses: ['(Hz-1) $\\sup_\\theta\\|\\widehat\\Psi_n-\\Psi_{\\theta^\\star}\\|\\to0$ en probabilité', '(Hz-2) $\\Psi_{\\theta^\\star}(\\theta^\\star)=0$, $\\inf_{\\|\\theta-\\theta^\\star\\|\\ge\\varepsilon}\\|\\Psi_{\\theta^\\star}\\|>0$', '(Hz-3) $\\widehat\\Psi_n(\\hat\\theta_n)=0$'], text: '$\\hat\\theta_n$ consistant (Thm 1.1 avec $\\widehat{M}_n=-\\|\\widehat\\Psi_n\\|$). Alternative en dimension 1 pour $\\psi$ monotone : argument de monotonie (PC7 Ex. 5).', source: 'Poly ch.7, Thm 1.3' },
    { label: 'Thm 1.4 — Normalité asymptotique des Z-estimateurs', hypotheses: ['$\\hat\\theta_n$ consistant, $\\theta^\\star\\in\\Theta^o$', '(i) $\\mathbb{E}[\\psi(\\theta^\\star,X_1)]=0$, $\\mathbb{E}[\\psi^2]<\\infty$', '(ii) $\\psi(\\cdot,x)$ $C^1$ sur $\\mathcal{V}(\\theta^\\star)$, $\\sup_{\\mathcal{V}}|\\psi\'|\\le g$ intégrable', '(iii) $\\mathbb{E}[\\psi\'(\\theta^\\star,X_1)]\\ne0$'], text: '$\\sqrt n(\\hat\\theta_n-\\theta^\\star)\\Rightarrow\\mathcal{N}(0,v_\\psi(\\theta^\\star))$, $v_\\psi=\\mathbb{E}[\\psi^2]/(\\mathbb{E}[\\psi\'])^2$. Preuve : Taylor reste intégral, LGN, Markov, consistance, TCL, Slutsky. Ne couvre pas la médiane.', source: 'Poly ch.7, Thm 1.4' },
    { label: 'Thm 1.5 — Normalité asymptotique des M-estimateurs', hypotheses: ['$\\hat\\theta_n$ consistant à valeurs dans $\\Theta^o$', '$m$ $C^2$ près de $\\theta^\\star$, $|m\'\'|\\le g$ intégrable', '$\\mathbb{E}[m\']=0$, $0<\\mathbb{E}[m\'^2]<\\infty$', '$\\mathbb{E}[m\'\']\\ne0$'], text: '$\\sqrt n(\\hat\\theta_n-\\theta^\\star)\\Rightarrow\\mathcal{N}\\big(0,\\mathbb{E}[m\'^2]/(\\mathbb{E}[m\'\'])^2\\big)$ (Prop. 1.1 + Thm 1.4 avec $\\psi=m\'$).', source: 'Poly ch.7, Thm 1.5' },
    { label: 'Thm 1.6 — Normalité asymptotique de l’EMV', hypotheses: ['Hypothèses du Thm 1.4 pour $\\psi=\\dot\\ell$', 'identité (10)'], text: '$\\sqrt n(\\hat\\theta_n^{\\mathrm{MV}}-\\theta^\\star)\\Rightarrow\\mathcal{N}(0,1/\\mathbb{I}(\\theta^\\star))$. Vectoriel (compléments) : $\\mathcal{N}(0,\\mathbb{I}^{-1})$.', source: 'Poly ch.7, Thm 1.6 ; Thm 4.4' },
    { label: 'Thm 1.7 — Optimalité asymptotique de l’EMV', hypotheses: ['modèle régulier (Cadre 1.1), $\\Theta$ ouvert', '$\\psi$ vérifiant le Thm 1.4'], text: '(1) $\\sqrt n(\\hat\\theta_n^{\\mathrm{MV}}-\\theta)\\Rightarrow\\mathcal{N}(0,1/\\mathbb{I})$ (admis) ; (2) $v_\\psi\\ge1/\\mathbb{I}$ : (11) $\\mathbb{E}[\\psi\']=-\\mathbb{E}[\\psi\\dot\\ell]$ puis Cauchy-Schwarz ; égalité ssi $\\psi\\propto\\dot\\ell$.', source: 'Poly ch.7, Thm 1.7' },
    { label: 'Médiane (Ex. 1.9, §4.8)', hypotheses: ['loi symétrique autour de $\\theta^\\star$, densité continue et $>0$ en $\\theta^\\star$'], text: '$\\sqrt n(\\widehat\\theta_n^{\\mathrm{med}}-\\theta^\\star)\\Rightarrow\\mathcal{N}(0,1/(4q_{\\theta^\\star}(\\theta^\\star)^2))$ (statistiques d’ordre, admis). Gaussien $\\frac\\pi2\\sigma^2$ ; Cauchy $\\pi^2/4$ vs EMV $2$ ($8/\\pi^2\\approx0{,}81$).', source: 'Poly ch.7, Ex. 1.9, §4.8' },
    { label: 'Ex. 1.10 — Pareto (hors régularité)', hypotheses: ['support $[\\alpha,\\infty[$ dépendant du paramètre'], text: '$\\hat\\alpha_n=\\min X_i$, $n\\eta\\log(\\hat\\alpha_n/\\alpha)\\sim\\mathcal{E}(1)$, $n\\eta(\\hat\\alpha_n-\\alpha)\\Rightarrow\\alpha\\mathcal{E}(1)$ : vitesse $n$, limite non gaussienne.', source: 'Poly ch.7, Ex. 1.10' },
    { label: 'PC7 Ex. 4 — Bord de Θ', hypotheses: ['$\\mathcal{N}(\\theta,1)$, $\\Theta=\\mathbb{R}_+$'], text: '$\\hat\\theta_n=\\max(\\bar X_n,0)$ ; $\\mathcal{N}(0,1)$ pour $\\theta>0$ ; en $\\theta=0$, loi de $\\max(Z,0)$ (atome $1/2$ en 0).', source: 'PC7 Ex. 4 ; Poly ch.7, §4.9' },
    { label: 'Outils — Thm 2.1, Lemmes 2.1–2.2', hypotheses: ['Thm 2.1 : i.i.d. **intégrables**', 'Lemme 2.1 : $K$ compact, continuité, domination uniforme', 'Lemme 2.2 : $f$ $C^1$ sur un intervalle ouvert'], text: 'LGN sans moment d’ordre 2 (admise) ; $\\mathsf{W}_{\\theta^\\star}$ continue et $\\int w_\\delta\\to0$ (convergence dominée, Heine) ; $f(a+t)=f(a)+f\'(a)t+r(t)t$, $r(t)=\\int_0^1\\{f\'(a+wt)-f\'(a)\\}\\mathrm{d}w\\to0$.', source: 'Poly ch.7, Outils §2' },
  ],
  methods: [
    {
      title: 'Consistance d’un M-estimateur sans forme explicite',
      steps: [
        'Identifier $m$ et vérifier que $\\mathsf{M}_{\\theta^\\star}$ est maximale en $\\theta^\\star$ (pour l’EMV : $\\mathrm{Ent}-\\mathrm{KL}$, identifiabilité).',
        'Si $\\Theta$ est compact : continuité de $m(\\cdot,x)$ + domination $\\int\\sup_\\Theta|m|<\\infty$ + maximum strict ⇒ Cor. 1.1.',
        'Sinon : établir directement (H-1) (borne uniforme, comme l’Ex. 1.5 avec $\\mathrm{diam}(\\Theta)$) et (H-2), puis Thm 1.1.',
        'Z-estimateur monotone en dimension 1 : argument de monotonie + LGN en $\\theta^\\star\\pm\\varepsilon$ (PC7 Ex. 5).',
      ],
    },
    {
      title: 'Normalité asymptotique d’un Z-estimateur scalaire',
      steps: [
        'Centrage $\\mathbb{E}_{\\theta^\\star}[\\psi(\\theta^\\star,X_1)]=0$ ; consistance établie.',
        'Vérifier (i) $\\mathbb{E}[\\psi^2]<\\infty$, (ii) $C^1$ + domination locale de $\\psi\'$, (iii) $\\mathbb{E}[\\psi\']\\ne0$, $\\theta^\\star\\in\\Theta^o$.',
        'Calculer $v_\\psi=\\mathbb{E}[\\psi^2]/(\\mathbb{E}[\\psi\'])^2$ (le signe de $\\psi\'$ disparaît au carré).',
        'IC : $[\\hat\\theta_n\\pm z_{1-\\alpha/2}\\sqrt{v_\\psi(\\hat\\theta_n)/n}]$ par Slutsky.',
      ],
    },
    {
      title: 'Loi limite d’un EMV (examen)',
      steps: [
        'Vérifier la régularité (support indépendant de $\\theta$, $C^2$, information finie non nulle) et que $\\theta^\\star$ est intérieur.',
        'Calculer $\\mathbb{I}(\\theta)=-\\mathbb{E}_\\theta[\\ddot\\ell]$ (souvent plus court) ou $\\mathbb{E}_\\theta[\\dot\\ell^2]$.',
        'Conclure $\\sqrt n(\\hat\\theta_n-\\theta)\\Rightarrow\\mathcal{N}(0,1/\\mathbb{I}(\\theta))$ (Thm 1.6) ; contrôler par la méthode-δ si l’EMV est explicite.',
        'Comparer à tout autre estimateur : $v\\ge1/\\mathbb{I}$ (Thm 1.7) ; efficacité relative $(1/\\mathbb{I})/v$.',
      ],
    },
    {
      title: 'Avant d’appliquer les Thm 1.4–1.7 : garde-fous',
      steps: [
        'Le support dépend-il de $\\theta$ (uniforme, Pareto, exponentielle translatée) ? Alors vitesse $n$, loi non gaussienne : calcul direct via la loi du min/max.',
        '$\\theta^\\star$ est-il au bord de $\\Theta$ ? Alors pas de normalité (PC7 Ex. 4).',
        '$\\psi$ est-elle dérivable (médiane) ? Sinon passer par les statistiques d’ordre ($1/(4f(\\theta)^2)$).',
        'L’estimateur est-il dans la classe des Z-estimateurs réguliers ? (Hodges : super-efficacité possible en dehors.)',
      ],
    },
  ],
  pitfalls: [
    'LGN ponctuelle ⇒ consistance de l’argmax : **faux** ; il faut la convergence **uniforme** (H-1) et un maximum **isolé** (H-2).',
    'Maximum unique ≠ maximum isolé hors d’un compact.',
    'Oublier le carré de la pente dans $v_\\psi$, ou la condition $\\mathbb{E}[\\psi\']\\ne0$.',
    'Écrire $\\mathcal{N}(0,1/(n\\mathbb{I}))$ pour la loi limite de $\\sqrt n(\\hat\\theta_n-\\theta)$ ; $\\mathbb{I}$ est l’information d’une observation.',
    'Appliquer le Thm 1.4 à la médiane ($\\operatorname{signe}$ non dérivable) ou au bord de $\\Theta$.',
    'Appliquer Cramér-Rao ou le Thm 1.6–1.7 à un modèle dont le support dépend de $\\theta$ (Pareto : vitesse $n$).',
    'Croire que l’EMV bat **tout** estimateur asymptotiquement normal (conjecture de Fisher fausse : Hodges).',
    'Confondre les homonymes : TCL = ch.6 Thm 1.6, Slutsky = ch.6 Lemme 1.1, méthode-δ = ch.6 Thm 1.7 ; ch.7 Thm 1.6 = EMV, Thm 1.7 = optimalité.',
    'Convention Gamma en intensité : $\\mathbb{E}[X]=2/\\theta$ pour $\\Gamma(2,\\theta)$ ; l’EMV $2/\\bar X_n$ est biaisé ($\\theta/(2n-1)$, Jensen).',
    'Log-normale $(\\theta,\\theta)$ : l’EMV n’est pas $\\bar Y_n$ (paramètres liés) ; ne pas oublier le jacobien $1/x$ (sans effet sur l’EMV).',
  ],
}
