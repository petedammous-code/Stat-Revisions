import type { GlossaryEntry } from './types'

/**
 * Glossaire des symboles : un symbole inline dont le LaTeX correspond EXACTEMENT
 * à l'une des variantes `tex` reçoit une infobulle rappelant sa définition.
 * Les agents « chapitre » peuvent enrichir ce glossaire via `registerGlossary`.
 */
export const GLOSSARY: GlossaryEntry[] = [
  {
    key: 'Theta',
    tex: ['\\Theta'],
    name: 'Espace des paramètres',
    definition: 'Ensemble $\\Theta \\subset \\mathbb{R}^d$ des valeurs possibles du paramètre $\\theta$ (modèle paramétrique).',
    source: 'Poly ch.1, Déf. 1.1',
  },
  {
    key: 'theta',
    tex: ['\\theta'],
    name: 'Paramètre',
    definition: 'Paramètre inconnu du modèle, $\\theta \\in \\Theta$ ; il indexe la loi $P_\\theta$ des observations.',
    source: 'Poly ch.1, Déf. 1.1',
  },
  {
    key: 'theta0',
    tex: ['\\theta_0', '\\theta^\\star', '\\theta^*'],
    name: 'Vraie valeur du paramètre',
    definition: 'Valeur du paramètre sous laquelle les données ont été générées (ou valeur testée sous $H_0$ selon le contexte).',
    source: 'Poly ch.1–4',
  },
  {
    key: 'Ptheta',
    tex: ['P_\\theta', '\\mathbb{P}_\\theta', 'P_{\\theta}'],
    name: 'Loi des observations sous θ',
    definition: 'Probabilité sur l’espace des observations $(\\mathsf{Z},\\mathcal{Z})$ associée au paramètre $\\theta$ : $\\{P_\\theta,\\ \\theta\\in\\Theta\\}$ est la famille du modèle.',
    source: 'Poly ch.1, Déf. 1.1',
  },
  {
    key: 'Etheta',
    tex: ['\\mathbb{E}_\\theta', 'E_\\theta', '\\mathbb{E}_{\\theta}'],
    name: 'Espérance sous P_θ',
    definition: 'Espérance calculée lorsque les observations suivent la loi $P_\\theta$.',
    source: 'Poly ch.1',
  },
  {
    key: 'modele',
    tex: ['(\\mathsf{Z},\\mathcal{Z},\\{P_\\theta,\\theta\\in\\Theta\\})', '(\\mathsf{Z},\\mathcal{Z},\\mathcal{C})'],
    name: 'Modèle statistique',
    definition: 'Donnée d’un espace mesurable $(\\mathsf{Z},\\mathcal{Z})$ (espace des observations) et d’une famille $\\mathcal{C}$ de probabilités sur cet espace.',
    source: 'Poly ch.1, Déf. 1.1',
  },
  {
    key: 'Ln',
    tex: ['L_n', 'L_n(\\theta)', 'L_n(\\theta;Z)', 'L_n(\\theta; Z)'],
    name: 'Vraisemblance',
    definition: 'Vraisemblance de l’échantillon : $L_n(\\theta) = \\prod_{i=1}^n p_\\theta(X_i)$ dans un modèle dominé (densité $p_\\theta$ par rapport à la mesure dominante).',
    source: 'Poly ch.2',
  },
  {
    key: 'elln',
    tex: ['\\ell_n', '\\ell_n(\\theta)'],
    name: 'Log-vraisemblance (normalisée)',
    definition: '$\\ell_n(\\vartheta)=\\frac1n\\log\\mathrm{L}_n(\\vartheta)=\\frac1n\\sum_{i=1}^n\\log q_\\vartheta(X_i)$ (log-vraisemblance normalisée, Poly ch.2 Déf. 1.5) ; certains corrigés de PC et le poly ch.7 (Ex. 1.10) écrivent $\\ell_n$ sans le facteur $\\frac1n$ (même argmax).',
    source: 'Poly ch.2, Déf. 1.5',
  },
  {
    key: 'Ifisher',
    tex: ['\\mathbb{I}(\\theta)', '\\mathbb{I}_1(\\theta)', '\\mathbb{I}_n(\\theta)', 'I(\\theta)', 'I_n(\\theta)', 'I_1(\\theta)'],
    name: 'Information de Fisher',
    definition: 'Dans un modèle régulier, $\\mathbb{I}(\\theta) = \\mathbb{E}_\\theta\\big[\\nabla_\\theta \\log p_\\theta(X)\\,\\nabla_\\theta \\log p_\\theta(X)^\\top\\big]$ (lettre ajourée, comme le poly) ; pour un $n$-échantillon, $\\mathbb{I}_n(\\theta) = n\\,\\mathbb{I}(\\theta)$.',
    source: 'Poly ch.3, Déf. 1.8 ; ch.7, Déf. 1.4',
  },
  {
    key: 'thetahat',
    tex: ['\\hat\\theta_n', '\\hat{\\theta}_n', '\\widehat\\theta_n', '\\widehat{\\theta}_n'],
    name: 'Estimateur',
    definition: 'Statistique $\\hat\\theta_n = T(X_1,\\dots,X_n)$ à valeurs dans $\\Theta$, utilisée pour estimer $\\theta$ (souvent l’EMV).',
    source: 'Poly ch.1–2',
  },
  {
    key: 'biais',
    tex: ['b(\\theta)', 'b_\\theta(\\hat\\theta_n)', '\\mathrm{Biais}_\\theta'],
    name: 'Biais',
    definition: 'Biais d’un estimateur $T$ de $g(\\theta)$ : $\\mathbb{E}_\\theta[T] - g(\\theta)$. L’estimateur est sans biais si ce biais est nul pour tout $\\theta$.',
    source: 'Poly ch.2',
  },
  {
    key: 'risque',
    tex: ['R(\\theta, T)', 'R(\\theta,T)', 'R_T(\\theta)'],
    name: 'Risque quadratique',
    definition: '$R(\\theta,T) = \\mathbb{E}_\\theta\\big[(T - g(\\theta))^2\\big] = \\mathrm{Biais}^2 + \\mathrm{Var}_\\theta(T)$.',
    source: 'Poly ch.2–3',
  },
  {
    key: 'Xbar',
    tex: ['\\bar X_n', '\\bar{X}_n', '\\overline{X}_n', '\\overline X_n'],
    name: 'Moyenne empirique',
    definition: '$\\bar X_n = \\frac1n \\sum_{i=1}^n X_i$.',
    source: 'Poly ch.1',
  },
  {
    key: 'Sn2',
    tex: ['S_n^2', 'S^2_n'],
    name: 'Variance empirique',
    definition: 'Variance empirique (version sans biais) : $S_n^2 = \\frac{1}{n-1}\\sum_{i=1}^n (X_i - \\bar X_n)^2$ (la convention exacte est rappelée dans chaque énoncé).',
    source: 'Poly ch.1–2',
  },
  {
    key: 'alpha',
    tex: ['\\alpha'],
    name: 'Niveau',
    definition: 'Niveau (risque de première espèce toléré) d’un test ou $1-\\alpha$ niveau de confiance d’une région de confiance.',
    source: 'Poly ch.4',
  },
  {
    key: 'H0',
    tex: ['H_0'],
    name: 'Hypothèse nulle',
    definition: 'Hypothèse $H_0 : \\theta \\in \\Theta_0$ que l’on cherche à rejeter ; l’erreur de première espèce est de la rejeter à tort.',
    source: 'Poly ch.4',
  },
  {
    key: 'H1',
    tex: ['H_1'],
    name: 'Hypothèse alternative',
    definition: 'Hypothèse $H_1 : \\theta \\in \\Theta_1$ (avec $\\Theta_0 \\cap \\Theta_1 = \\emptyset$).',
    source: 'Poly ch.4',
  },
  {
    key: 'puissance',
    tex: ['\\beta(\\theta)', '\\beta_\\varphi(\\theta)', '\\beta_n(\\theta)'],
    name: 'Fonction puissance',
    definition: '$\\beta(\\theta) = \\mathbb{E}_\\theta[\\varphi]$ : probabilité de rejeter $H_0$ sous $P_\\theta$. Niveau sur $\\Theta_0$, puissance sur $\\Theta_1$.',
    source: 'Poly ch.4',
  },
  {
    key: 'pvaleur',
    tex: ['\\hat p', 'p\\text{-valeur}', '\\mathrm{pval}'],
    name: 'p-valeur',
    definition: 'Plus petit niveau $\\alpha$ auquel on rejette $H_0$ au vu des données ; ce n’est PAS la probabilité que $H_0$ soit vraie.',
    source: 'Poly ch.4',
  },
  {
    key: 'convP',
    tex: ['\\xrightarrow{\\ \\mathbb{P}\\ }', '\\xrightarrow{P}', '\\xrightarrow{\\mathbb{P}}'],
    name: 'Convergence en probabilité',
    definition: '$X_n \\to X$ en probabilité si $\\forall \\varepsilon>0,\\ \\mathbb{P}(|X_n - X|>\\varepsilon) \\to 0$.',
    source: 'Poly ch.6',
  },
  {
    key: 'convL',
    tex: ['\\xrightarrow{\\ \\mathcal{L}\\ }', '\\xrightarrow{\\mathcal{L}}', '\\xrightarrow{d}', '\\rightsquigarrow'],
    name: 'Convergence en loi',
    definition: '$X_n \\to X$ en loi si $\\mathbb{E}[f(X_n)] \\to \\mathbb{E}[f(X)]$ pour toute $f$ continue bornée.',
    source: 'Poly ch.6',
  },
]

/** Entrées ajoutées par les chapitres, avec leur portée (slug du chapitre). */
const extra: { entry: GlossaryEntry; chapter: string }[] = []

/**
 * Ajoute des entrées de glossaire propres à un chapitre. Une même écriture LaTeX peut avoir
 * des sens différents selon les chapitres (ex. γ) : la recherche privilégie le chapitre affiché.
 */
export function registerGlossary(entries: GlossaryEntry[], chapter = ''): void {
  for (const e of entries) {
    if (!extra.some((g) => g.entry.key === e.key && g.chapter === chapter)) extra.push({ entry: e, chapter })
  }
}

let scope = ''
/** Fixe le chapitre courant (appelé par la page chapitre avant le rendu). */
export function setGlossaryScope(chapter: string): void {
  scope = chapter
}

function normalizeTex(t: string): string {
  return t.replace(/\s+/g, '').replace(/\\left|\\right/g, '')
}

/**
 * Retrouve l'entrée dont une variante LaTeX correspond exactement au symbole.
 * Priorité : chapitre courant, puis glossaire commun, puis autres chapitres.
 */
export function findGlossaryEntry(tex: string): GlossaryEntry | undefined {
  const n = normalizeTex(tex)
  const match = (e: GlossaryEntry) => e.tex.some((t) => normalizeTex(t) === n)
  if (scope) {
    const own = extra.find((g) => g.chapter === scope && match(g.entry))
    if (own) return own.entry
  }
  const core = GLOSSARY.find(match)
  if (core) return core
  if (scope) return undefined // symbole d'un autre chapitre : pas d'infobulle potentiellement trompeuse
  return extra.find((g) => match(g.entry))?.entry
}

/** Toutes les entrées (le même `key` peut exister dans plusieurs chapitres). */
export function allGlossary(): GlossaryEntry[] {
  return [...GLOSSARY, ...extra.map((g) => g.entry)]
}

/** Entrée par clé, en privilégiant le chapitre courant. */
export function glossaryByKey(key: string): GlossaryEntry | undefined {
  return extra.find((g) => g.chapter === scope && g.entry.key === key)?.entry ?? GLOSSARY.find((g) => g.key === key) ?? extra.find((g) => g.entry.key === key)?.entry
}
