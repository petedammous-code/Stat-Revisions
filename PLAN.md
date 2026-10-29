# PLAN — Site de révision APM-41033 « Statistiques »

Fondé sur `DIAGNOSTIC.md` (annales : Examen 2025 + CC MAP433 2022) et les extractions `content/extraction/`.

## 1. Priorisation des chapitres (rentabilité pour l'examen)

| Rang | Chapitre | Poids estimé 2025 | examWeight | Pourquoi |
|---|---|---|---|---|
| 1 | ch.6 Statistiques asymptotiques | ≈ 18 % | 5 | Cœur du problème d'estimation : consistance, TCL (multivarié), Slutsky, méthode-δ, IC asymptotiques. Méthode stéréotypée, très rentable. **Chapitre prototype.** |
| 2 | ch.8 Introduction à l'apprentissage statistique | ≈ 17 % | 5 | Un problème entier à chaque session ; Bayes / excès de risque / plug-in = cours récité. |
| 3 | ch.5 Optimalité en théorie des tests | ≈ 10 % | 4 | Neyman-Pearson et RVM à chaque session ; marche à suivre en 5 étapes. |
| 4 | ch.3 Bases de la théorie de la décision | ≈ 10 % | 4 | Cramér-Rao (question de cours), biais/variance/risque, admissibilité. |
| 5 | ch.4 Régions de confiance et tests | ≈ 10 % | 4 | p-valeur (définition + interprétation), IC par pivot, vocabulaire niveau/puissance. |
| 6 | ch.1 Modèles statistiques | ≈ 9 % (22 % en 2022) | 3 | Gosset/Cochran, changement de variables, statistiques d'ordre : outils transversaux. |
| 7 | ch.9 Approche discriminative / ERM | ≈ 12 % | 3 | Questions difficiles (biais-variance k-NN, fléau de la dimension) ; Hoeffding plausible en cours. |
| 8 | ch.2 Estimation ponctuelle | ≈ 6 % | 3 | EMV et moments : point d'entrée de tout problème. |
| 9 | ch.7 M- et Z-estimateurs | ≈ 6 % | 2 | Normalité asymptotique de l'EMV, efficacité, médiane. |

## 2. Modules par chapitre (identiques pour tous)

1. **Cours interactif** (`cours.ts`) : sections dépliables — Intuition → Notations → Définitions & théorèmes sourcés (hypothèses listées) → Preuves pas à pas → Exemples traités → Méthodes types → « À l'examen » → Hors programme (compléments, concis).
2. **Visualisations** (`viz/`) : ≥ 4 par chapitre, curseurs + « tirer un échantillon ».
3. **Entraînement** (`exercices.ts`) : ≥ 25 exercices, 8 formats, zéro saisie de formule ; sources annales > PC > variantes.
4. **Type annale** : ≥ 2 exercices rédactionnels avec indices progressifs, correction type examen, barème, auto-évaluation.
5. **Flashcards** (`flashcards.ts`) : ≥ 12 cartes dont « quelle hypothèse manque ? ».
6. **Fiche de synthèse** (`fiche.ts`) : imprimable.
7. **Tests Monte-Carlo** (`montecarlo.ts`) : ≥ 3 vérifications numériques de résultats du poly.

## 3. Visualisations prévues par chapitre

| Ch. | Visualisations |
|---|---|
| 1 | Lois usuelles (curseurs, superposition) ; modèle statistique = famille de lois ; statistiques d'ordre ; Gosset (indépendance $\bar X_n$ / $S_n^2$) |
| 2 | Log-vraisemblance et EMV (n, échantillon) ; méthode des moments ; EMV non dérivable (uniforme) ; régression linéaire |
| 3 | Biais² + variance = risque (comparaison d'estimateurs) ; information de Fisher = courbure ; Cramér-Rao vs variance empirique ; admissibilité |
| 4 | 100 IC simulés et couverture ; région de rejet, erreurs I/II, puissance ; p-valeur comme aire ; IC exact vs asymptotique |
| 5 | Neyman-Pearson : rapport de vraisemblance et seuil ; fonction puissance d'un test UPP ; RVM ; absence de test UPP bilatéral |
| 6 | LGN/TCL ; Slutsky ; méthode-δ (linéarisation) ; IC asymptotique vs exact ; convergence de la variance empirique |
| 7 | M-estimateur : critère empirique → limite ; variance asymptotique de l'EMV vs $1/I(\theta)$ ; médiane vs moyenne (robustesse) |
| 8 | Classifieur de Bayes et $\eta(x)$ ; excès de risque ; plug-in ; k-NN sur données 2D ; LDA/QDA |
| 9 | Compromis approximation/estimation ; Hoeffding ; choix de $k$ ; fléau de la dimension ; convexification (hinge, logistique) |

## 4. Modes transverses

- **Examen blanc** (3 h, 20 pts) : Ex.1 cours (4 pts) · Ex.2–3 problèmes type annale (6 pts chacun) · Ex.4 QCM (4 pts). Versions 1 h 30 et 45 min.
- **Révision ciblée** : items échus (répétition espacée), notions les plus ratées, puis jamais vus (chapitres rentables d'abord).
- **Fiches** imprimables ; **Tableau de bord** par chapitre et par type.

## 5. Workflows

1. Extraction (terminée) → 2. Socle + prototype ch.6 → 3. Construction ch.1–5, 7–9 en parallèle → 4. Vérification croisée (agent ≠ constructeur) → 5. Intégration, cohérence, `RAPPORT.md`.
