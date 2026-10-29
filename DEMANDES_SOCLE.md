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
## ch3









1. **Taille du bundle.** Avec ch1, ch2, ch3 et ch6, le bundle principal dépasse la limite d’avertissement (`chunkSizeWarningLimit: 6000` kB, ≈ 6,05 Mo) : `npm run build` passe mais affiche l’avertissement. Demande : charger les chapitres en `import()` dynamique (glob non `eager`) ou relever la limite.
2. **Abscisses catégorielles dans `barTrace` / `pointsTrace`.** Les helpers typent `x: number[]` ; pour un diagramme en barres par estimateur (noms en abscisse), ch3 surcharge `x` après coup (`{ ...barTrace(...), x: NAMES }`). Demande : accepter `(number | string)[]` en abscisse.
## Remontées du chapitre 7








1. **Traces à abscisses catégorielles.** `barTrace` et `pointsTrace` sont typés `x: number[]` ; pour un diagramme en barres par estimateur (« moyenne / médiane / Huber »), ch7 surcharge `x` après coup (`{ ...barTrace([], [], …), x: names }`). Demande : accepter `(number | string)[]` pour `x`.
2. **Histogramme et valeurs hors cadre.** `histogram(xs, bins, lo, hi)` (sim/stats) range les valeurs hors de `[lo, hi]` dans les classes extrêmes, ce qui crée de faux pics pour les lois à queues lourdes (Cauchy). ch7 utilise un helper local `histDensity` qui les ignore (en normalisant par l'effectif total) ; une option `{ clip: 'drop' }` dans le socle serait utile à d'autres chapitres.
3. **Masquer / afficher un contrôle.** Pour les curseurs qui ne concernent qu'une option (ε, τ du mélange contaminé), ch7 manipule `root.style.display` ; un `SliderHandle.setVisible(bool)` éviterait ce contournement.
## Remontées du chapitre 5






1. **Titres Plotly invisibles.** Avec `plotly.js-dist-min` 4.x, `layout.title: 'texte'` et `xaxis: { title: 'texte' }` ne sont plus affichés (il faut `{ text: 'texte' }`). Les visualisations de ch1, ch2, ch6 (et le patron du guide) utilisent la forme chaîne : leurs titres de figure et d'axes n'apparaissent pas. Demande : normaliser dans `plot()` (`core/plot.ts`) les champs `title` de type chaîne en `{ text }` (layout et axes), et corriger l'exemple du guide. Contournement ch5 : `title: { text: … }` partout.
2. **Glossaire global.** `registerGlossary` est global : un même symbole nu (`\gamma`, `T(Z)`, `\nu`) peut avoir des sens différents selon les chapitres (ch6 enregistre `\gamma` = variance limite ; au ch5 c'est le coefficient de randomisation). Demande : permettre un glossaire par chapitre (priorité au chapitre courant) ou une clé de portée. Contournement ch5 : formes indexées ($\gamma_\alpha$) et `{\gamma}`.
3. **Légende Plotly et titre d'axe x.** La légende horizontale (`y: -0.2`) chevauche le titre de l'axe des abscisses quand la légende tient sur une ligne longue ; ch5 force `legend.y = -0.3` au cas par cas. Demande : marge basse ou position de légende adaptative dans `themeLayout()`.
4. **Répertoire scratchpad partagé.** Les agents chapitre écrivent leurs scripts Playwright dans le même scratchpad (`shot.cjs` écrasé par un autre agent pendant la vérification) : préconiser des noms préfixés par le chapitre dans les consignes.
## Remontées du chapitre 8






1. **Frontières de décision 2D.** Les viz LDA/QDA et $k$-PPV tracent la frontière $\{\phi=0\}$ avec une trace Plotly brute `type: 'contour'` (`contours: { start: 0, end: 0, coloring: 'lines' }`) et les zones de décision avec `type: 'heatmap'`. Demande : helpers `contourLevelTrace(xs, ys, z, level, name, color, dash)` et `heatmapTrace(xs, ys, z, colorscale)` dans `core/plot.ts` (contournement : `ch8/viz/outils2d.ts`).
2. **Repère orthonormé.** Avec `yaxis.scaleanchor: 'x'`, Plotly élargit l’axe des abscisses dans une zone de figure large et peu haute (frontières déformées, nuage minuscule). Contournement : pas de `scaleanchor`, `minHeight` plus grand. Demande : option `vizFrame(container, { aspect: 1 })` (zone carrée) pour les figures 2D où l’orthonormalité compte.
## Remontées du chapitre 9





1. **Tableaux Markdown.** `lightMarkdown` ne reconnaît pas la syntaxe `| a | b |` ; le poly ch.9 contient trois tableaux (classes en régression p. 10, variation des erreurs p. 12, pertes p. 23), rendus ici en listes. Demande : support minimal des tableaux (ligne d'en-tête + séparateur `|---|`) dans `richToHtml`.
2. **Indicatrice ajourée.** `\mathbb{1}` passe KaTeX mais s'affiche comme un 1 ordinaire (les polices AMS n'ont pas de chiffres ajourés) : « $2\mathbb{1}_{\{\cdot\}}-1$ » se lit « 21 − 1 ». Demande : macro `\1` / `\ind` rendue par un glyphe distinctif (par ex. `\mathbb{1}` remplacé par `\mathbf{1}` ou `𝟙` via `\text{𝟙}` si la police le permet) et note dans le guide. Contournement ch9 : `\mathbf{1}` partout.
3. **Calculs coûteux dans les visualisations.** Plusieurs vizs du ch9 (k-ppv, biais optimiste, fléau de la dimension) recalculent des simulations lourdes à chaque mouvement de curseur ; ch9 utilise un `debounced()` local (`ch9/viz/outils.ts`). Demande : un helper partagé `debounce` dans `core/ui.ts` (ou une option `onChangeEnd` de `slider`, déclenchée au relâchement).
4. **Taille du bundle.** Avec ch9, le bundle principal dépasse la limite `chunkSizeWarningLimit` (6000 kB) : avertissement de build (non bloquant). Demande : découpage dynamique (`import()`) des chapitres dans `src/content/index.ts`, ou relèvement de la limite.
## ch4


1. **Titres Plotly invisibles.** Avec `plotly.js-dist-min` 4.x, `layout.title` et `xaxis.title` / `yaxis.title` donnés sous forme de **chaîne** ne s’affichent pas (format retiré depuis Plotly 3 ; il faut `{ text: '…' }`). Les visualisations de ch6 (et sans doute ch1, ch2) passent des chaînes : leurs titres de figure et d’axes sont absents. Demande : dans `core/plot.ts`, normaliser `title`, `xaxis.title`, `yaxis.title` (chaîne → `{ text }`) avant `Plotly.react`, ou documenter `{ text }` dans le guide. Contournement ch4 : `{ text: … }` partout.
2. **Glossaire : collisions de symboles entre chapitres.** `\mathbb{Q}` (ch1 : loi d’une observation) et `\mathrm{Gamma}(p,\lambda)` (ch1 : convention d’intensité) ont un autre sens au ch.4 (loi du pivot ; convention d’échelle du CC 2022). `registerGlossary` déduplique par clé mais l’index LaTeX est global : la dernière variante enregistrée gagne. Demande : glossaire **par chapitre** (priorité aux entrées du chapitre courant) ou option `scope: slug`. Contournement ch4 : écrire `\mathbb Q` (avec espace) et ajouter `\,` pour désactiver l’infobulle.
3. **Segmented à options variables.** Pour changer la liste des options d’un `segmented` (méthodes disponibles selon le modèle dans `ch4-couverture-ic`), ch4 remplace le nœud DOM. Demande : `SegmentedHandle.setOptions(options, value)`.
