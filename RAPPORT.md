# RAPPORT — Site de révision APM-41033 « Statistiques »

## 1. Résultat

Site statique interactif (Vite + TypeScript + KaTeX + Plotly), sans backend, construit à partir du poly (9 chapitres : Cours, Outils mathématiques, Exercices, Compléments), des 9 PC (énoncés et corrigés) et des deux annales du dépôt (Examen 2025 sans corrigé, CC MAP433 2022 avec solutions).

Aucune réponse ne demande de taper une formule : QCM, vrai/faux justifié, preuve à remettre dans l'ordre (glisser-déposer ou ▲▼), « trouver l'erreur » (clic sur la ligne), calcul guidé (choix de l'expression suivante), associations (glisser-déposer ou clic-clic), applications numériques (seule saisie : un nombre, avec tolérance), exercices type annale (indices 1-2-3, correction rédigée, barème, auto-évaluation), flashcards (dont « quelle hypothèse manque ? »). Un test automatique vérifie qu'aucun exercice hors application numérique ne contient de champ de saisie.

| | Total |
|---|---|
| Chapitres | 9 / 9 |
| Blocs définition / théorème / proposition sourcés | 263 |
| Dont avec preuve pas à pas | 127 |
| Exemples traités pas à pas | 141 |
| Visualisations manipulables | 60 |
| Exercices interactifs | 375 (dont 72 tirés directement des annales) |
| Flashcards | 183 (dont 49 « quelle hypothèse manque ? ») |
| Vérifications Monte-Carlo de résultats du poly | 59 |
| Tests automatiques | 186 |

## 2. Ce qui est fait, chapitre par chapitre

Classement par rentabilité pour l'examen (PLAN.md). Chaque chapitre : cours en sections dépliables (intuition → définitions et théorèmes sourcés « Poly ch.N, … » avec hypothèses → preuves pas à pas → exemples → méthodes → « À l'examen » → compléments hors programme), visualisations, entraînement, type annale, flashcards, fiche, tests Monte-Carlo. Chaque chapitre a été construit par un agent puis contrôlé par un vérificateur indépendant (voir REVUE.md).

| Ch. | Titre | Rentabilité | PC | Sections | Résultats sourcés (preuves) | Exemples | Viz | Exercices | Annales réelles | Flashcards | Monte-Carlo |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 6 | Statistiques asymptotiques | ●●●●● | PC6, PC7 | 8 | 39 (21) | 17 | 7 | 43 | 9 | 23 (6 hyp.) | 6 |
| 8 | Introduction à l’apprentissage statistique | ●●●●● | PC8 | 11 | 35 (19) | 10 | 6 | 40 | 8 | 21 (6 hyp.) | 6 |
| 5 | Optimalité en théorie des tests | ●●●●○ | PC5, PC4 | 9 | 25 (10) | 15 | 7 | 42 | 8 | 18 (5 hyp.) | 7 |
| 3 | Bases de la théorie de la décision | ●●●●○ | PC3, PC7 | 10 | 27 (10) | 24 | 6 | 37 | 5 | 19 (5 hyp.) | 7 |
| 4 | Régions de confiance et tests | ●●●●○ | PC4, PC2 | 11 | 24 (7) | 24 | 7 | 45 | 9 | 20 (5 hyp.) | 6 |
| 1 | Modèles statistiques | ●●●○○ | PC1, PC3, PC4 | 11 | 37 (18) | 15 | 7 | 44 | 14 | 23 (6 hyp.) | 7 |
| 9 | Approche discriminative et minimisation du risque empirique | ●●●○○ | PC9 | 9 | 30 (19) | 8 | 8 | 42 | 7 | 19 (5 hyp.) | 7 |
| 2 | Estimation ponctuelle | ●●●○○ | PC2, PC7 | 10 | 22 (11) | 18 | 6 | 43 | 10 | 22 (6 hyp.) | 6 |
| 7 | Théorie asymptotique des M- et Z-estimateurs | ●●○○○ | PC7 | 9 | 24 (12) | 10 | 6 | 39 | 2 | 18 (5 hyp.) | 7 |

### Chapitre 6 — Statistiques asymptotiques

- **Exercices** (43) : 10 QCM, 6 V/F, 5 ordonner, 5 erreur, 5 étape suiv., 4 associer, 4 num., 4 annale.
- **Visualisations** : LGN et TCL : la loi de la moyenne empirique quand n grandit ; Consistance : trajectoires de la moyenne empirique et bande μ ± ε ; Lemme de Slutsky : limite constante, et le contre-exemple du couple ; Variance empirique : consistance et loi limite gaussienne de variance γ ; Méthode-δ : linéariser g autour de μ, cas dégénéré (dérivée nulle) ; Intervalles de confiance asymptotiques : couverture réelle à n fini ; Proportion : intervalles de Wald, de Wilson et par stabilisation de la variance.
- **Fiche** : 13 définitions, 20 résultats avec hypothèses, 6 méthodes, 11 pièges.

### Chapitre 8 — Introduction à l’apprentissage statistique

- **Exercices** (40) : 11 QCM, 6 V/F, 4 ordonner, 4 erreur, 4 étape suiv., 3 associer, 4 num., 4 annale.
- **Visualisations** : Classifieur de Bayes en dimension 1 : η(x), seuil 1/2 et risque de Bayes ; Excès de risque d’un classifieur plug-in : formule (4) et majoration (13) ; Régression quadratique : le théorème de Pythagore du Th. 1.1 ; LDA, QDA et régression logistique : frontières de décision estimées ; k plus proches voisins sur données 2D : frontière, erreur d’apprentissage et de test ; Risque empirique et risque réel d’une règle plug-in quand n augmente.
- **Fiche** : 13 définitions, 16 résultats avec hypothèses, 5 méthodes, 13 pièges.

### Chapitre 5 — Optimalité en théorie des tests

- **Exercices** (42) : 10 QCM, 6 V/F, 4 ordonner, 4 erreur, 5 étape suiv., 4 associer, 5 num., 4 annale.
- **Visualisations** : Neyman-Pearson : acheter la région où le rapport de vraisemblance est le plus grand ; Fonction puissance du test U.P.P. unilatéral ; Rapport de vraisemblance monotone : t ↦ ψ(t;θ)/ψ(t;θ′) ; Pas de test U.P.P. bilatéral : trois fonctions puissance qui se croisent ; Test randomisé : atteindre la taille exacte α avec une statistique discrète ; Taille d’effet : l’effet détectable décroît en 1/√n ; Modèle uniforme : deux tests U.P.P. de même puissance mais de décisions différentes.
- **Fiche** : 11 définitions, 11 résultats avec hypothèses, 5 méthodes, 10 pièges.

### Chapitre 3 — Bases de la théorie de la décision

- **Exercices** (37) : 10 QCM, 5 V/F, 4 ordonner, 3 erreur, 4 étape suiv., 3 associer, 4 num., 4 annale.
- **Visualisations** : Translation : moyenne, médiane ou demi-somme des extrêmes ? ; Biais² + variance = risque quadratique, en direct ; Admissibilité : comparer des fonctions de risque θ ↦ R(θ, T) ; Information de Fisher : dispersion du score, courbure de la log-vraisemblance ; Cramér-Rao : variance de l’estimateur contre la borne $1/(n\,\mathbb{I}_1(\theta))$ ; Une borne sans régularité : $\tau_n(c)$ dans le modèle uniforme.
- **Fiche** : 12 définitions, 15 résultats avec hypothèses, 4 méthodes, 11 pièges.

### Chapitre 4 — Régions de confiance et tests

- **Exercices** (45) : 12 QCM, 6 V/F, 4 ordonner, 5 erreur, 5 étape suiv., 3 associer, 5 num., 5 annale.
- **Visualisations** : Cent intervalles de confiance : qui est aléatoire ? ; Le choix de $A_\alpha$ : symétrique en probabilité ou le plus court ? ; Proportion sans pivot : Bienaymé-Tchebychev contre Hoeffding ; Région de rejet, erreurs de 1re et 2e espèce, fonction puissance ; Dualité : l’intervalle de confiance est l’ensemble des valeurs non rejetées ; La p-valeur, une aire sous la loi de la statistique sous H₀ ; Loi de la p-valeur : uniforme sous H₀, concentrée près de 0 sous H₁.
- **Fiche** : 10 définitions, 16 résultats avec hypothèses, 4 méthodes, 14 pièges.

### Chapitre 1 — Modèles statistiques

- **Exercices** (44) : 12 QCM, 6 V/F, 5 ordonner, 4 erreur, 6 étape suiv., 3 associer, 4 num., 4 annale.
- **Visualisations** : Un modèle statistique = un espace d’observations et une famille de lois ; Lois usuelles : densités, paramètres et échantillons simulés ; Mélange gaussien : deux paramètres distincts, une seule loi (non-identifiabilité) ; Changement de variables : la densité de φ(X) par la fonction muette ; Réponses randomisées : confidentialité contre variance ; Statistiques d’ordre : loi de X₍ₖ₎, du maximum, et F(X₍ₖ₎) ~ Beta(k, n−k+1) ; Théorème de Gosset : indépendance de X̄ₙ et S²ₙ, lois χ²(n−1) et t(n−1).
- **Fiche** : 14 définitions, 16 résultats avec hypothèses, 5 méthodes, 11 pièges.

### Chapitre 9 — Approche discriminative et minimisation du risque empirique

- **Exercices** (42) : 9 QCM, 6 V/F, 4 ordonner, 4 erreur, 6 étape suiv., 3 associer, 5 num., 5 annale.
- **Visualisations** : Sur-apprentissage : MRE dans les polynômes de degré p, risque empirique, risque et validation ; Compromis approximation / estimation : classifieur par histogramme à m cellules ; Choisir k pour les k plus proches voisins : apprentissage, validation, risque ; Biais optimiste du MRE et borne en √(log|C|/n) sur une classe finie ; No free lunch : K points, étiquettes sans régularité, aucune règle n’apprend ; Inégalité de Hoeffding : déviations de la moyenne empirique de variables bornées ; Fléau de la dimension : le plus proche voisin s’éloigne, les échantillons nécessaires explosent ; Convexifier la perte 0-1 : pertes de substitution, risque en escalier contre φ-risque convexe.
- **Fiche** : 10 définitions, 18 résultats avec hypothèses, 6 méthodes, 12 pièges.

### Chapitre 2 — Estimation ponctuelle

- **Exercices** (43) : 12 QCM, 6 V/F, 5 ordonner, 4 erreur, 6 étape suiv., 3 associer, 3 num., 4 annale.
- **Visualisations** : Vraisemblance et log-vraisemblance ℓₙ(ϑ) d’un échantillon tiré ; Méthode des moments : moment exact contre moment empirique (modèle exponentiel) ; EMV non régulier : vraisemblance en escalier de l’uniforme contre pic lisse de l’exponentielle ; Modèle de Laplace : EMV = médiane, unique ou non selon la parité de n ; Log-vraisemblance ℓₙ, limite M_θ⋆ et divergence de Kullback-Leibler ; Régression linéaire gaussienne : EMV = moindres carrés, résidus et loi χ²(n−2) de nσ̂²/σ².
- **Fiche** : 14 définitions, 13 résultats avec hypothèses, 5 méthodes, 13 pièges.

### Chapitre 7 — Théorie asymptotique des M- et Z-estimateurs

- **Exercices** (39) : 9 QCM, 6 V/F, 4 ordonner, 4 erreur, 5 étape suiv., 3 associer, 4 num., 4 annale.
- **Visualisations** : Critère empirique et critère limite : convergence uniforme et argmax ; Z-estimateur : la fonction d’estimation Ψ̂ₙ(θ) et son zéro ; Normalité asymptotique de l’EMV : √n(θ̂ₙ − θ⋆) contre N(0, 1/𝕀(θ⋆)) ; Moyenne, médiane, Huber : robustesse sous contamination ; Efficacité asymptotique relative : variances V[γₖ] et borne 1/𝕀 ; Hors régularité : support dépendant du paramètre (Pareto) et vraie valeur au bord.
- **Fiche** : 8 définitions, 13 résultats avec hypothèses, 4 méthodes, 10 pièges.


## 3. Modes transverses

- **Examen blanc** (`#/examen`) au format réel de l'Examen 2025 (DIAGNOSTIC §1, §9) : 3 h, 20 points — Ex. 1 questions de cours (4 pts), Ex. 2 problème d'estimation et de tests (7 pts, tiré des ch.1–7, vraies annales en priorité), Ex. 3 problème d'apprentissage (6 pts, ch.8–9), Ex. 4 QCM / réponses courtes (3 pts, 12 items, −0,5 par QCM faux, plancher 0). Page de rappels de l'examen 2025 en tête. Chronomètre ; aucune indication de justesse avant la correction finale ; items hors programme exclus. Versions 1 h 30 et 45 min.
- **Révision ciblée** (`#/revision`) : répétition espacée simple (un raté revient tout de suite, un succès de plus en plus tard), puis notions les plus ratées, puis items jamais vus des chapitres les plus rentables.
- **Fiches de synthèse** (`#/fiches` et onglet « Fiche » de chaque chapitre) : définitions, théorèmes avec hypothèses exactes, méthodes types, pièges ; bouton « Imprimer / PDF » (feuille de style d'impression dédiée).
- **Tableau de bord** (`#/dashboard`) : progression par chapitre et par type d'exercice, points faibles par notion, historique des examens blancs, export JSON et réinitialisation.
- Progression en `localStorage` (protégée par try/catch), thème clair/sombre persistant, mise en page téléphone vérifiée (390 px).

## 4. Qualité et tests

- **Typage** TypeScript strict : `npm run typecheck`.
- **186 tests** (Vitest) : chaque formule KaTeX de tout le contenu compile en mode strict ; règles de chaque format (exactement une bonne réponse par QCM / étape, une explication par option, étapes distinctes, ligne fautive valide, associations sans doublon, tolérance > 0, annales avec indices, correction et barème) ; sources présentes ; identifiants uniques ; 59 vérifications Monte-Carlo de résultats du poly (couverture d'IC, variance de l'EMV vs 1/(nI(θ)), méthode-δ, taille et puissance de tests, Hoeffding…) ; rendu de chacun des 375 exercices **sans aucun champ de saisie** (hors applications numériques) ; composants (QCM, glisser-déposer, calcul guidé…), stockage, routeur, glossaire par chapitre.
- **Navigateur** (Chromium/Playwright) : balayage des 59 pages × 2 thèmes à 390 px (téléphone) : 0 erreur d'exécution, 0 erreur KaTeX, 0 graphe vide, 0 débordement horizontal ; parcours utilisateur complet joué (bonne puis mauvaise réponse pour chaque format, glisser-déposer réel, flashcards, tableau de bord, révision ciblée, thème persistant, examen blanc).
- **Vérification indépendante** : 9 vérificateurs (un par chapitre, distinct du constructeur) puis une passe de cohérence entre chapitres (3 auditeurs : notations et renvois, couverture des annales, parcours navigateur ; 28 corrections appliquées, contre-vérifiées). Toutes les questions de l'Examen 2025 et du CC 2022 inventoriées dans DIAGNOSTIC.md sont désormais entraînées par au moins un exercice.

## 5. Points à vérifier

- **`REVUE.md`** : remarques des vérificateurs indépendants, chapitre par chapitre ([Corrigé] / [À vérifier] / [Manque]), et de la passe de cohérence finale.
- **`DECISIONS.md`** : choix faits en cas de doute (notation ambiguë, coquille d'un corrigé, convention), toujours dans le sens le plus fidèle au poly.
- **Corrections non officielles** : l'Examen 2025 n'a pas de corrigé dans le dépôt ; ses solutions (DIAGNOSTIC §2.A et exercices « annale » correspondants) ont été rédigées et revérifiées par les agents, mais ne sont pas officielles. Le CC 2022 a un corrigé partiel (Ex. 2 Q3–Q4 et Ex. 4 Q1 complétés).
- **Barèmes** : estimés (aucun barème officiel dans les annales).
- **Conventions Gamma** : le poly et l'Examen 2025 utilisent l'intensité ; le CC 2022 l'échelle — signalé partout où cela compte.

## 6. Déploiement — URL GitHub Pages

- `.github/workflows/tests.yml` : à chaque push, typecheck + tests (structure, KaTeX, Monte-Carlo, composants) + build.
- `.github/workflows/deploy.yml` : à chaque push sur `main`, mêmes vérifications puis déploiement sur GitHub Pages.
- **URL (une fois la branche fusionnée dans `main` et Pages activé)** : https://petedammous-code.github.io/Stat-Revisions/
- Activation (une seule fois) : GitHub → dépôt → Settings → Pages → Source : « GitHub Actions ».
- Le travail est sur la branche `claude/bold-pascal-79c26c` ; il n'a pas été fusionné dans `main`.

## 7. Lancer le site en local

```bash
cd site
npm ci
npm run dev
```

Puis ouvrir http://localhost:5173/. Vérifications complètes :

```bash
cd site
npm run check
```

## 8. Organisation (pour ajouter ou corriger du contenu)

- Contenu **séparé du code** : un dossier par chapitre `site/src/content/chN/` (`cours*.ts`, `exercices*.ts`, `flashcards.ts`, `fiche.ts`, `montecarlo.ts`, `viz/`). Corriger une explication ou ajouter un QCM ne touche aucun code.
- Contrat et patrons : `site/GUIDE_CONTENU.md`. Les tests signalent toute formule KaTeX invalide, QCM à deux bonnes réponses, source manquante, etc.
- Sources : `content/extraction/` (extraction structurée du poly et des PC), `DIAGNOSTIC.md` (annales), `PLAN.md` (priorités).
