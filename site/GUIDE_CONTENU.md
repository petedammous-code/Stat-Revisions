# Guide de construction d'un chapitre (pour les agents « chapitre »)

Ce document est le **contrat** entre le socle (code, dans `site/src/core`, `site/src/components`, `site/src/pages`, `site/src/sim`) et le contenu d'un chapitre (données, dans `site/src/content/chN/`). Un agent « chapitre » ne modifie **que** `site/src/content/chN/**` (et peut ajouter des entrées de glossaire via `registerGlossary`). Toute demande de nouveau composant va dans `DEMANDES_SOCLE.md` à la racine du dépôt.

## 1. Arborescence d'un chapitre

```
site/src/content/ch6/
  index.ts          ← export default { ...Chapter } (assemble tout)
  cours.ts          ← export const course: CourseSection[]
  exercices.ts      ← export const exercises: Exercise[]
  flashcards.ts     ← export const flashcards: Flashcard[]
  fiche.ts          ← export const summarySheet: SummarySheet
  montecarlo.ts     ← export const monteCarlo: MonteCarloCheck[]
  viz/
    index.ts        ← export const vizs: Viz[]
    lgnTcl.ts       ← une visualisation par fichier
    ...
```

Le registre `site/src/content/index.ts` découvre automatiquement `./ch*/index.ts` : **rien d'autre à enregistrer**.

Types : `site/src/content/types.ts` (lire intégralement). Glossaire : `site/src/content/glossary.ts`.

## 2. Texte riche (`Rich`)

- Maths : `$...$` inline, `$$...$$` display (KaTeX, mode strict : pas de commandes inconnues). Macros disponibles : `\R \N \E \P \Var \Cov \ind \argmax \argmin \Leb \d \Normal \Bern \Bin \Pois \Exp \Unif \xrightarrowP \xrightarrowL \Zs \Zcal \eps \iid \sgn \tr \diag`.
- Dans une chaîne TypeScript, **doubler les antislashs** : `'$\\hat\\theta_n$'`. Préférer les template strings sans interpolation ou les chaînes simples ; attention aux backticks dans les textes.
- Markdown léger : paragraphes (ligne vide), `**gras**`, `*italique*`, listes `- ` ou `1. `, titres `### `, citations `> `, liens internes `[[texte|/ch/ch6/viz]]`.
- Un symbole inline dont le LaTeX correspond exactement à une entrée du glossaire (`\theta`, `I(\theta)`, `L_n`, `\bar X_n`, `H_0`…) reçoit automatiquement une infobulle. Ajoutez les symboles propres au chapitre avec `registerGlossary([...])` dans `index.ts`.
- **Interdit** : notation texte brut pour les maths (« theta_hat », « E[X] » hors `$`).

## 3. Règles de fidélité

1. Notations, définitions, hypothèses = celles du poly (extraction `content/extraction/chN.md`). Chaque `TheoremBlock`, `ExampleBlock`, `Exercise`, `Flashcard` a un champ `source` précis : `'Poly ch.6, Thm 1.7'`, `'PC6 Ex. 1 Q3'`, `'Examen 2025 Ex. 2 Q7'`, `'CC MAP433 2022 Ex. 2'`, `'Variante (style PC6 Ex. 2)'`.
2. Tout ce qui vient des « Compléments » du poly ou qui n'est pas dans le poly : `scope: 'hors-programme'` et/ou mention « Hors programme / complément » dans le texte.
3. Définir chaque symbole avant usage : dans la première section du cours, un bloc `text` « Notations » ou des définitions explicites ; les notations récurrentes vont au glossaire.
4. Style « comme un cours » : chaque section = intuition → définitions/théorèmes sourcés (avec hypothèses listées dans `hypotheses`) → preuve pas à pas (`proof: ProofStep[]`, chaque étape avec sa `justification`) → exemples (`ExampleBlock` avec `steps`) → lien examen (bloc `text` « À l'examen »).
5. Insérer des visualisations dans le cours avec des blocs `{ kind: 'viz', id, vizId }` là où elles éclairent une notion.

## 4. Exercices : zéro saisie de formule

Types (voir `types.ts`) : `qcm`, `vrai-faux`, `ordonner`, `trouver-erreur`, `etape-suivante`, `associer`, `numerique`, `annale`. Règles vérifiées par les tests :

- `qcm` : ≥ 3 options, **exactement une** `correct: true`, **chaque** option a une `explanation` (> 10 caractères) qui dit pourquoi c'est juste / faux et quelle erreur classique c'est.
- `vrai-faux` : 3 à 5 `justifications`, exactement une correcte ; `explanation` recommandée sur chacune.
- `ordonner` : ≥ 3 `steps` **dans le bon ordre**, toutes distinctes ; `explanation` finale.
- `trouver-erreur` : ≥ 3 `lines`, `faultyIndex` valide, `explanation` (pourquoi c'est faux + version juste).
- `etape-suivante` : ≥ 2 `steps`, chaque étape ≥ 2 `choices` avec exactement un correct ; les distracteurs sont des erreurs plausibles (signe, facteur 1/n, oubli d'hypothèse…).
- `associer` : ≥ 3 paires, éléments distincts des deux côtés (aucune ambiguïté).
- `numerique` : `answer`, `tolerance` > 0, `explanation` ; la seule saisie clavier autorisée.
- `annale` : `statement` complet, `hints` (1 à 3, progressifs), `correction` rédigée comme attendu à l'examen (citer les théorèmes avec hypothèses), `bareme` (points par question), `durationMin`.
- Tous : `id` unique dans le chapitre (préfixer par `ch6-`), `title`, `source`, `origin` (`annale` | `pc` | `variante` | `poly`), `difficulty` 1–3, `tags` (notions ; ajouter le tag `'cours'` pour les items « question de cours » utilisables dans l'exercice 1 de l'examen blanc).

Volume attendu par chapitre : **≥ 25 exercices** dont ≥ 6 QCM, ≥ 4 vrai-faux, ≥ 3 ordonner, ≥ 3 trouver-erreur, ≥ 3 étape-suivante, ≥ 2 associer, ≥ 2 numériques, ≥ 2 annales (dont au moins une issue d'une vraie annale si le chapitre y figure). Priorité des sources : annales > PC > variantes (marquées `origin: 'variante'`).

## 5. Flashcards

≥ 12 cartes : définitions, théorèmes **avec hypothèses exactes**, méthodes, et ≥ 3 cartes `kind: 'hypothese-manquante'` (énoncé tronqué d'une hypothèse ; `choices` avec exactement un correct).

## 6. Visualisations

Une `Viz` = `{ id, title, description, source?, mount(container) }`. Utiliser :

```ts
import { vizFrame, slider, button, segmented, toggle } from '../../../core/ui'
import { plot, lineTrace, barTrace, areaTrace, pointsTrace, vline, COLORS } from '../../../core/plot'
import { makeRng, normal, exponential, sample } from '../../../sim/rng'
import { histogram, normalPdf, linspace, mean } from '../../../sim/stats'

export const vizLgn: Viz = {
  id: 'ch6-lgn-tcl',
  title: 'LGN et TCL : moyenne empirique quand n augmente',
  description: 'Curseur $n$ ; bouton « Tirer un échantillon » ; la gaussienne limite est superposée.',
  source: 'Poly ch.6, Thm 1.2 et 1.5',
  mount(container) {
    const { controls, plot: plotEl, info } = vizFrame(container)
    let n = 30
    const rng = makeRng(42)
    const handle = plot(plotEl, [], { title: '…' })
    const draw = () => { /* calcule traces, puis handle.update(traces, layout) ; info.innerHTML = richToHtml('…') */ }
    controls.append(slider({ label: '$n$', min: 1, max: 500, step: 1, value: n, onChange: (v) => { n = v; draw() } }).root)
    controls.append(button('Tirer un échantillon', draw))
    draw()
    return () => handle.destroy()
  },
}
```

Règles : toujours un curseur ou un bouton ; `info` explique ce qu'on voit avec les notations du poly ; `mount` renvoie la fonction de nettoyage ; pas de `Math.random()` (utiliser `makeRng`, éventuellement réensemencé par un compteur pour « tirer un échantillon »). Texte des légendes en français. ≥ 4 visualisations par chapitre, adaptées au contenu réel.

## 7. Tests Monte-Carlo

`monteCarlo: MonteCarloCheck[]` (≥ 3) : chaque entrée vérifie numériquement un résultat du poly (ex. couverture d'un IC asymptotique ≈ 0.95, variance de l'EMV ≈ 1/(nI(θ)), biais de la variance empirique = −σ²/n). `run(rng)` doit être déterministe et rapide (< 2 s), avec une `tolerance` réaliste (3–4 écarts types Monte-Carlo).

## 8. Fiche de synthèse

`summarySheet` : toutes les définitions et tous les théorèmes du chapitre (avec `hypotheses`), les méthodes types (étapes), les pièges (du diagnostic et des corrigés).

## 9. Vérification locale avant de rendre

```bash
cd site && npm run typecheck && npm test && npm run build
```

Les tests vérifient : KaTeX compilable partout, règles structurelles ci-dessus, Monte-Carlo, rendu de chaque exercice sans champ de saisie (sauf `numerique`). **Un chapitre n'est terminé que si ces trois commandes passent.**

## 10. Retours d'expérience du prototype (ch6) — à appliquer

- **Modèle à suivre** : `site/src/content/ch6/` (structure, style, volume). Les gros fichiers peuvent être découpés (`cours-part1.ts`, `cours-part2.ts` agrégés dans `cours.ts` ; idem pour `exercices.ts`).
- **Titres et étiquettes** : `title`, `label` (blocs, fiche, barème), titres de sections et de viz sont désormais rendus par `richInline` : le LaTeX `$…$` y est accepté mais gardez-les courts ; l'Unicode (θ, μ², X̄ₙ) reste une bonne option.
- **Tests** : le cache Vitest est désactivé dans la config ; avec N chapitres chargés le nombre de tests augmente (20 tests = aucun chapitre chargé → vérifier l'`export default` de `index.ts`). Pour voir les `console.log` des tests : `npx vitest run --reporter=verbose`.
- **KaTeX strict** : pas de caractères accentués dans `$…$` (même dans `\text{}`), pas de `\tag`, pas de `\label`. Passent : `\mathbb{1}`, `\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}`, `\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}`, `\begin{pmatrix}`, `\begin{cases}`, `\begin{aligned}`.
- **Patron Rich** : une formule display `$$…$$` seule sur sa ligne, entourée de lignes vides ; dans les template strings, éviter `${` ; doubler les antislashs ; apostrophes typographiques « ’ » dans les chaînes simples pour éviter l'échappement.
- **Patron viz** : `slider({ log: true, min: 0, max: 3, … })` prend min/max en log10 ; `segmented` et `toggle` acceptent le LaTeX dans les labels ; `vizFrame(container, { plots: 2 })` renvoie `plots[0]`, `plots[1]` pour deux figures côte à côte ; `segmentsTrace` / `segmentsByColor` dans `core/plot.ts` pour les IC ; recalculer `info.innerHTML = richToHtml(...)` à chaque `draw()`.
- **Monte-Carlo** : viser < 0,5 s par vérification ; tolérance = 3–4 écarts-types Monte-Carlo, biais à n fini commenté ; éviter les statistiques à forte kurtosis (ou élargir la tolérance).
- **Sources** : le poly utilise deux numérotations (éléments encadrés « N.M » et définitions non encadrées « Définition k ») : reproduire celle de l'extraction, avec la page (« Poly ch.6, Thm 1.7, p. 23 »).
- **Ajouts du socle après ch1/ch2** : `richInline` ne fait plus de blocs (un titre « 2. … » reste un titre ; le plan du chapitre n'a plus de numérotation automatique : numérotez vos titres de section « 1. », « 2. », …) ; `slider({ integer: true })` arrondit (utile avec `log`) ; `SliderHandle.configure({ min, max, step, label, value })` reconfigure un curseur ; `segmented(...).setValue(v)` ; `boxTrace`, `rugTrace` dans `core/plot.ts`.
- **Démarrage dans un worktree** : si `git log --oneline -1` ne montre pas le commit indiqué dans la consigne, faites `git reset --hard <hash>` (votre branche de worktree vous appartient) avant toute chose : le worktree peut avoir été créé depuis `main`, qui ne contient pas le site.
