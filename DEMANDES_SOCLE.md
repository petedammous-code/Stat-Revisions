# Demandes au socle (remontées par les agents « chapitre »)

## Remontées du chapitre 6

1. **Cache de transformation de Vitest.** Vitest 5 garde un cache persistant `site/node_modules/.vitest-cache` indexé par le contenu des fichiers. Le registre `src/content/index.ts` (inchangé) y est stocké avec son `import.meta.glob` déjà développé : après l'ajout d'un nouveau dossier `chN/`, `npm test` continue de voir **0 chapitre** (20 tests au lieu de 36) tant que ce cache n'est pas supprimé. Demande : désactiver ce cache dans `vite.config.ts` (`test.cache: false` ou équivalent) ou ajouter `rm -rf node_modules/.vitest-cache` au script `npm test`, et le documenter dans `GUIDE_CONTENU.md`. Contournement utilisé : `rm -rf node_modules/.vitest-cache node_modules/.vite`.
2. **Titres rendus en texte brut.** `viz.title` (`components/viz.ts`), `ex.title` (`components/common.ts`), `section.title` (TOC du cours), `TheoremBlock.title/label`, `ExampleBlock.title`, `TextBlock.title`, les `label` de `SummarySheet` (`pages/fiches.ts`) et les `label` du barème des annales sont insérés via `innerHTML` sans `richToHtml` : un `$…$` y apparaît tel quel. Demande : passer ces champs par `richToHtml` (en supprimant le `<p>` englobant), ou préciser dans le guide qu'ils doivent rester sans LaTeX. Pour ch6, tous les titres/labels ont été réécrits sans LaTeX.
3. **Figures multiples dans une visualisation.** `vizFrame` ne fournit qu'une zone `plot`. Pour les figures côte à côte (méthode-δ, Slutsky, Wald/Wilson), ch6 crée deux `div` enfants avec une grille CSS en ligne et deux poignées `plot`. Demande : option `vizFrame(container, { plots: 2 })` renvoyant un tableau de zones, avec le style de grille dans `styles.css`.
4. **Segments verticaux (IC).** Pas de helper pour tracer des segments ; ch6 utilise une trace `scatter` en mode `lines` avec des `null` séparateurs. Demande : `segmentsTrace(xs, y0s, y1s, name, color)` dans `core/plot.ts`.
5. **Console de test silencieuse.** Les `console.log` dans les tests ne sont pas affichés par le reporter par défaut, ce qui complique le débogage du registre ; une note dans le guide (« utiliser `--reporter=verbose` et écrire dans un fichier ») suffirait.

## Remontées du chapitre 1


1. **Titres de sections numérotés.** `richInline` passe par `lightMarkdown` : un titre de section « 2. Modèle statistique… » est reconnu comme item de liste ordonnée (`^(\d+)[.)]\s+`) et rendu `<ol><li>…</li></ol>`, ce qui affiche « 1. » pour toutes les sections (visible aussi dans le prototype ch6 : plan du chapitre « 1. 1. Intuition… », « 2. 1. Modes de convergence… »). Demande : dans `richInline`, ne pas appliquer la détection de listes/titres (traiter la chaîne comme une seule ligne `inline`), ou documenter dans le guide d'éviter « N. » en tête de titre. Contournement ch1 : titres « N · … ».
2. **Curseurs dépendants.** Plusieurs visualisations (lois usuelles, changement de variables) doivent reconstruire leurs curseurs quand la loi/transformation change ; `slider` ne propose pas de `setRange`/`destroy`. Contournement : un conteneur `div.viz-controls` imbriqué vidé et re-rempli. Demande : `SliderHandle.setRange(min, max, step)` ou un helper `controlsGroup()`.
3. **Échelle logarithmique du curseur n.** Avec `log: true`, la valeur affichée par défaut est `v.toPrecision(3)` ; un `format` est nécessaire pour afficher un entier. Demande : option `integer: true` arrondissant la valeur réelle avant `onChange` et l'affichage.

## Remontées du chapitre 2


1. **Double numérotation du plan.** Le plan du cours (`components/cours.ts`) est un `<ol>` et les titres de sections commencent par leur numéro (« 1. Intuition… ») : l'affichage donne « 1. 1. Intuition… » (déjà le cas pour ch6). Demande : `list-style: none` sur `.toc ol` ou bien numérotation automatique et titres sans numéro dans le guide.
2. **Curseurs reconfigurables.** `slider()` ne permet pas de changer `min/max/step/label` après création : pour les visualisations à choix de modèle (log-vraisemblance, Kullback-Leibler) ch2 reconstruit le curseur avec `controls.replaceChild`. Demande : `SliderHandle.configure({ min, max, step, label })`, et un `set(value)` sur `segmented`.
3. **Boîtes à moustaches.** Les traces Plotly `type: 'box'` fonctionnent telles quelles (viz « méthode des moments ») ; un helper `boxTrace(values, name, color)` dans `core/plot.ts` éviterait de dupliquer les options (`boxpoints`, `marker`).
4. **Marqueurs « tick » pour les observations.** Pour afficher un échantillon sur l'axe des abscisses, ch2 utilise `pointsTrace` avec `symbol: 'line-ns-open'` ; un helper `rugTrace(xs, y, name, color)` serait utile à plusieurs chapitres (uniforme, Laplace, statistiques d'ordre).
