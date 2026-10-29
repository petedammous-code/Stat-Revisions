# Stat-Révisions — APM-41033 « Statistiques » (École polytechnique)

Site de révision **interactif** construit à partir du poly, des PC et des annales du cours. Aucune formule à taper : QCM, vrai/faux justifié, preuves à remettre dans l'ordre, « trouver l'erreur », calculs guidés, associations par glisser-déposer, applications numériques, exercices type annale avec indices progressifs et auto-évaluation, flashcards, visualisations à curseurs, examen blanc chronométré, révision ciblée, fiches imprimables, tableau de bord.

## Lancer le site en local

```bash
cd site
npm ci
npm run dev
```

Puis ouvrir l'adresse affichée (par défaut http://localhost:5173/).

## Vérifier (types, tests, build)

```bash
cd site
npm run check
```

Les tests vérifient que tout le KaTeX compile, que chaque exercice respecte les règles de son format (une seule bonne réponse, explications…), que les simulations Monte-Carlo retrouvent les résultats du poly et que les composants se rendent sans champ de saisie de formule.

## Déploiement

`.github/workflows/tests.yml` s'exécute à chaque push ; `.github/workflows/deploy.yml` déploie sur GitHub Pages à chaque push sur `main` si les tests passent (Settings → Pages → Source : « GitHub Actions »).

## État

Les 9 chapitres sont complets (375 exercices, 60 visualisations, 183 flashcards). Bilan détaillé, points à vérifier et URL de déploiement : `RAPPORT.md`.

## Organisation du dépôt

- `*.pdf` : poly (Cours, Outils mathématiques, Exercices, Compléments), PC (énoncés, corrigés), annales.
- `content/sources/` : conversion texte des PDF ; `content/extraction/` : extraction structurée par chapitre et par PC.
- `DIAGNOSTIC.md` : analyse des annales (format, typologie, pièges, priorités) ; `PLAN.md` ; `DECISIONS.md` ; `REVUE.md` ; `RAPPORT.md`.
- `site/` : le site (Vite + TypeScript + KaTeX + Plotly). Code dans `site/src/core`, `site/src/components`, `site/src/pages`, `site/src/sim` ; **contenu séparé** dans `site/src/content/chN/` (un dossier par chapitre). Guide : `site/GUIDE_CONTENU.md`.
