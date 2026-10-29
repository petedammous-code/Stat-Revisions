import type { CourseSection } from '../types'

/** Sections 7 à 9 : convexification, méthodes types et examen, compléments hors programme. */
export const coursePart3: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 7. Convexification
  // -------------------------------------------------------------------------
  {
    id: 'ch9-s7-convexification',
    title: '7. Convexifier la perte : classifieurs doux et φ-risque',
    role: 'definitions',
    intro:
      'Troisième question : **calculer** le MRE. Avec la perte 0-1, c’est un problème combinatoire. On remplace la perte 0-1 par une perte **convexe** qui la majore, et les règles à valeurs dans $\\{-1,1\\}$ par des **classifieurs doux** à valeurs réelles : le problème devient convexe, et le risque obtenu majore le risque 0-1.',
    blocks: [
      {
        kind: 'text',
        id: 'ch9-s7-combinatoire',
        title: 'En classification, minimiser le risque empirique est difficile (§1.4, p. 21–22, Fig. 5)',
        text: `Avec la perte 0-1, le MRE résout $\\hat g^*_{n,\\mathcal C}=\\arg\\min_{g\\in\\mathcal C}\\frac1n\\sum_{i=1}^n\\mathbf{1}_{\\{Y_i\\ne g(\\mathbf X_i)\\}}$. La perte 0-1 n’est **ni différentiable, ni convexe**, et le risque empirique, vu comme fonction des paramètres de la règle, est **constant par morceaux** (Fig. 5 : nombre d’erreurs d’une famille de règles indexée par un paramètre réel, minima en **paliers**). Pas de gradient exploitable : la MRE est un **problème combinatoire**.

**Écriture par la marge** (*spinning*, p. 22). Pour $\\mathsf Y=\\{-1,1\\}$ et $g:\\mathsf X\\to\\{-1,1\\}$, $g(\\mathbf X)Y$ vaut $1$ si la prédiction est correcte et $-1$ sinon, donc $g(\\mathbf X)\\ne Y\\iff-g(\\mathbf X)Y>0$ et

$$\\frac1n\\sum_{i=1}^n\\mathbf{1}_{\\{g(\\mathbf X_i)\\ne Y_i\\}}=\\frac1n\\sum_{i=1}^n\\mathbf{1}_{\\{-g(\\mathbf X_i)Y_i>0\\}}=\\frac1n\\sum_{i=1}^n\\varphi_1(-g(\\mathbf X_i)Y_i),\\qquad\\varphi_1:=\\mathbf{1}_{[0,+\\infty[}.$$

Les deux dernières écritures coïncident car $-g(\\mathbf X_i)Y_i\\in\\{-1,1\\}$ (la différence entre $>0$ et $\\ge0$ ne joue qu’en $0$). La quantité $Y\\,g(\\mathbf X)$ est la **marge** de la prédiction ; l’écriture garde un sens quand $g$ prend des valeurs réelles.`,
      },
      {
        kind: 'theorem',
        id: 'ch9-def-1-2',
        type: 'definition',
        label: 'Définition 1.2',
        title: 'Classifieur doux, classifieur dur',
        source: 'Poly ch.9, Déf. 1.2, p. 22',
        hypotheses: ['$\\operatorname{signe}(t)=2\\operatorname{heaviside}(t)-1$ avec $\\operatorname{heaviside}(t)=1$ si $t>0$ et $0$ sinon (convention du ch.8).'],
        statement: 'On appelle **classifieur doux** (*soft classifier*) toute fonction mesurable $h:\\mathsf X\\to\\mathbb R$. Le **classifieur dur** (*hard classifier*) associé à $h$ est $g=\\operatorname{signe}(h)$.',
        intuition: 'Le signe de $h(\\mathbf x)$ donne la prédiction, $|h(\\mathbf x)|$ mesure la « confiance ».',
        pitfalls: ['Avec cette convention $\\operatorname{signe}(0)=-1$, alors que les classifieurs affines de la Prop. 1.2 et le classifieur bayésien du ch.8 utilisent $\\mathbf{1}_{\\{\\cdot\\ge0\\}}$ (valeur $+1$ en $0$) : sans conséquence sous densité, mais c’est le cas d’égalité de (4).'],
      },
      {
        kind: 'example',
        id: 'ch9-ex-1-2',
        title: 'Exemple 1.2 — Classifieurs doux linéaires et linéaires généralisés',
        source: 'Poly ch.9, Ex. 1.2, p. 22–23',
        setup: 'Deux familles de classifieurs doux paramétrées par $\\theta$.',
        steps: [
          {
            text: '**Linéaire, ou affine** : $h_\\theta(\\mathbf x)=\\theta_0+\\sum_{i=1}^d\\theta_ix^{(i)}$ pour $\\mathbf x=(x^{(1)},\\dots,x^{(d)})$.',
            justification: 'Frontière $\\{h_\\theta=0\\}$ : un hyperplan affine.',
          },
          {
            text: '**Linéaire généralisé** : $h_\\theta(\\mathbf x)=\\theta^\\top\\Phi(\\mathbf x)$, par exemple $\\Phi(\\mathbf x)=[1,\\{x^{(i)}\\}_{i=1}^d,\\{x^{(i)}x^{(j)}\\}_{i,j=1}^d]^\\top$ ou $\\Phi(\\mathbf x)=[\\psi_1(x^{(1)}),\\dots,\\psi_d(x^{(d)})]^\\top$.',
            justification: 'Transformation des attributs (*feature map*) : avec $\\Phi$ quadratique, les frontières sont des quadriques.',
          },
          {
            text: 'Dans les deux cas, $\\theta\\mapsto h_\\theta(\\mathbf x)$ est **linéaire** en $\\theta$.',
            justification: 'C’est la clé de la convexité du $\\varphi$-risque empirique (Ex. 1.3).',
          },
        ],
        conclusion: 'On garde un problème linéaire en $\\theta$ tout en autorisant des frontières non linéaires en $\\mathbf x$.',
      },
      {
        kind: 'theorem',
        id: 'ch9-eq-4',
        type: 'proposition',
        label: 'Éq. (4)',
        title: 'L’erreur du classifieur dur est contrôlée par la marge',
        source: 'Poly ch.9, éq. (4), p. 23',
        hypotheses: ['$h$ classifieur doux ; $\\mathbf x\\in\\mathsf X$, $y\\in\\{-1,1\\}$.'],
        statement: '$$\\mathbf{1}_{\\{\\operatorname{signe}(h(\\mathbf x))\\ne y\\}}\\le\\varphi_1(-y\\,h(\\mathbf x)).\\qquad(4)$$\n\nC’est une égalité **sauf lorsque $h(\\mathbf x)=0$ et $y=-1$** (prédiction $-1$ correcte, mais $\\varphi_1(0)=1$).',
        proof: [
          {
            text: 'Si $\\operatorname{signe}(h(\\mathbf x))\\ne y$ : ou bien $h(\\mathbf x)>0$ et $y=-1$, ou bien $h(\\mathbf x)\\le0$ et $y=1$.',
            justification: 'Définition de signe : $\\operatorname{signe}(h)=1$ ssi $h>0$.',
          },
          { text: 'Dans les deux cas $-y\\,h(\\mathbf x)\\ge0$, donc $\\varphi_1(-y\\,h(\\mathbf x))=1$.', justification: '$\\varphi_1=\\mathbf{1}_{[0,+\\infty[}$.' },
          { text: 'Sinon le membre de gauche est nul et $\\varphi_1\\ge0$.', justification: 'Une indicatrice est positive.' },
        ],
      },
      {
        kind: 'text',
        id: 'ch9-s7-pertes',
        title: 'Les pertes de substitution (tableau et Fig. 6, p. 23)',
        text: `**Conditions sur $\\varphi:\\mathbb R\\to\\mathbb R$** : $\\varphi$ **convexe**, **croissante**, $\\varphi(0)=1$ et $\\varphi\\ge\\varphi_1$, c’est-à-dire $\\varphi(z)\\ge\\mathbf{1}_{\\{z\\ge0\\}}$ pour tout $z$. Pour une fonction croissante valant 1 en 0, la dernière condition se réduit à $\\varphi\\ge0$ sur $]-\\infty,0[$. La variable est $z=-y\\,h(\\mathbf x)$ (**moins** la marge) : une grande marge positive correspond à $z\\ll0$.

- **0-1** : $\\varphi_1(z)=\\mathbf{1}_{[0,+\\infty[}(z)$ ;
- **charnière** (*hinge*) : $\\varphi(z)=\\max(1+z,0)$ ;
- **exponentielle** : $\\varphi(z)=\\exp(z)$ ;
- **logistique** : $\\varphi(z)=\\log_2(1+\\exp(z))$ ;
- **quadratique** : $\\varphi(z)=(z+1)^2$.

Charnière, exponentielle et logistique **remplissent toutes les conditions**. La quadratique est convexe, vaut 1 en 0 et majore $\\varphi_1$, mais **n’est pas croissante** : elle décroît sur $]-\\infty,-1]$ et **pénalise aussi les prédictions correctes de grande marge**.

**Vérifications (Outils §2.7).** Convexité : la charnière est le maximum de deux fonctions affines ; exponentielle, logistique et quadratique ont une dérivée seconde positive ($e^z$, $e^z/((1+e^z)^2\\log2)$, $2$). Valeur en 0 : $\\max(1,0)=1$, $e^0=1$, $\\log_2(2)=1$, $1^2=1$ — d’où le $\\log_2$ (et non $\\log$) dans la perte logistique.`,
      },
      {
        kind: 'viz',
        id: 'ch9-s7-viz-pertes',
        vizId: 'ch9-pertes-convexes',
        caption: 'À gauche, toutes les pertes valent 1 en $z=0$ et majorent la perte 0-1 ; la quadratique remonte pour $z<-1$. À droite, le risque 0-1 en paliers contre le $\\varphi$-risque convexe.',
      },
      {
        kind: 'theorem',
        id: 'ch9-def-1-3',
        type: 'definition',
        label: 'Définition 1.3',
        title: 'φ-risque et φ-risque empirique',
        source: 'Poly ch.9, Déf. 1.3, p. 23',
        hypotheses: ['$\\varphi$ perte convexe vérifiant les conditions ci-dessus ; $h$ classifieur doux.'],
        statement: `Le **$\\varphi$-risque** de $h$ est $R_\\varphi(h):=\\mathbb E[\\varphi(-Y\\,h(\\mathbf X))]$, et son **$\\varphi$-risque empirique** est

$$\\widehat{\\mathrm R}_{n,\\varphi}(h):=\\frac1n\\sum_{i=1}^n\\varphi(-Y_ih(\\mathbf X_i)).$$`,
        intuition: 'Le $\\varphi$-risque empirique approche le $\\varphi$-risque au même sens que le risque empirique approche le risque : pour $h$ **fixé** avec $R_\\varphi(h)<\\infty$, c’en est un estimateur **sans biais et convergent** (linéarité, LGN). On cherche alors $h$, dans une classe donnée, qui minimise $\\widehat{\\mathrm R}_{n,\\varphi}(h)$, et l’on retient le classifieur dur $\\operatorname{signe}(h)$.',
      },
      {
        kind: 'theorem',
        id: 'ch9-prop-1-3',
        type: 'proposition',
        label: 'Proposition 1.3',
        title: 'Le φ-risque majore le risque 0-1',
        source: 'Poly ch.9, Prop. 1.3, p. 24',
        hypotheses: [
          '$\\varphi$ perte convexe comme ci-dessus, en particulier $\\varphi\\ge\\varphi_1$.',
          '$\\widehat{\\mathrm R}_n$ et $R$ : risque empirique et risque **pour la perte 0-1**.',
        ],
        statement: 'Pour tout classifieur doux $h$,\n\n$$\\widehat{\\mathrm R}_n(\\operatorname{signe}(h))\\le\\widehat{\\mathrm R}_{n,\\varphi}(h)\\qquad\\text{et}\\qquad R(\\operatorname{signe}(h))\\le R_\\varphi(h).$$',
        intuition: 'Minimiser une majorante convexe pousse aussi vers le bas le risque 0-1.',
        proof: [
          {
            text: '$\\mathbf{1}_{\\{\\operatorname{signe}(h(\\mathbf x))\\ne y\\}}\\le\\varphi_1(-y\\,h(\\mathbf x))\\le\\varphi(-y\\,h(\\mathbf x))$ pour tous $\\mathbf x$, $y$.',
            justification: 'Éq. (4), puis hypothèse $\\varphi\\ge\\varphi_1$.',
          },
          { text: 'On applique l’inégalité aux couples $(\\mathbf X_i,Y_i)$ et l’on moyenne : première inégalité.', justification: 'Une moyenne d’inégalités terme à terme.' },
          { text: 'On l’applique au couple $(\\mathbf X,Y)$ et l’on prend l’espérance : seconde inégalité.', justification: 'Croissance de l’espérance.' },
        ],
        pitfalls: ['La Prop. compare des **risques**, pas des **excès de risque** : un faible $\\varphi$-risque garantit un faible risque 0-1 seulement si $\\inf R_\\varphi$ est lui-même petit ; la comparaison des excès de risque est une question ouverte (chapitre suivant).'],
      },
      {
        kind: 'example',
        id: 'ch9-ex-1-3',
        title: 'Exemple 1.3 — Cas logistique : un problème convexe, la même règle que l’EMV logistique',
        source: 'Poly ch.9, Ex. 1.3, p. 24 (Fig. 7) ; Outils §2.7',
        setup: 'Perte logistique $\\varphi(z)=\\log_2(1+e^z)$, classe des classifieurs doux linéaires généralisés $h_\\theta=\\theta^\\top\\Phi(\\cdot)$ : $\\widehat{\\mathrm R}_{n,\\varphi}(h_\\theta)=\\frac1n\\sum_{i=1}^n\\log_2\\big(1+e^{-Y_i\\theta^\\top\\Phi(\\mathbf X_i)}\\big)$.',
        steps: [
          { text: '$\\varphi$ est convexe : $\\varphi\'\'(z)=e^z/((1+e^z)^2\\log2)\\ge0$.', justification: 'Dérivée seconde positive.' },
          {
            text: '$\\theta\\mapsto-Y_i\\theta^\\top\\Phi(\\mathbf X_i)$ est linéaire, donc $\\theta\\mapsto\\varphi(-Y_i\\theta^\\top\\Phi(\\mathbf X_i))$ est convexe.',
            justification: 'Stabilité de la convexité par composition avec une application affine (Outils §2.7).',
          },
          { text: '$\\theta\\mapsto\\widehat{\\mathrm R}_{n,\\varphi}(h_\\theta)$ est convexe.', justification: 'Combinaison à coefficients positifs de fonctions convexes (Outils §2.7).' },
          {
            text: 'Avec $\\Phi(\\mathbf x)=\\mathbf x$ : $\\log_2(1+e^z)=\\log(1+e^z)/\\log2$, donc même argmin que $\\frac1n\\sum_i\\log(1+\\exp(-Y_i\\theta^\\top\\mathbf X_i))$, le critère de l’EMV logistique (éq. (12) du ch.8).',
            justification: 'Multiplier un critère par la constante $1/\\log2>0$ ne change pas son minimiseur.',
          },
        ],
        conclusion: 'On minimise par des méthodes d’**optimisation convexe** (gradient, Newton) : tout minimum local est global. Les deux approches (modélisation et discriminative) conduisent ici à **la même règle**. En contrepartie, la perte convexe ne compte plus seulement les erreurs : une erreur de **grande marge coûte cher** et une prédiction correcte de **faible marge** coûte encore quelque chose ; le minimiseur du risque convexifié peut différer légèrement de celui du risque 0-1 (Fig. 7 : les deux règles changent de label en des points voisins mais distincts).',
      },
      {
        kind: 'text',
        id: 'ch9-s7-questions',
        title: 'Trois questions ouvertes (sujet du chapitre suivant, p. 24–25)',
        text: `On a remplacé la perte 0-1 par une perte convexe pour des raisons **computationnelles**. Cela soulève :

1. **Contrôle de l’écart entre $R_\\varphi$ et $R$** : la Prop. 1.3 répond dans un sens (majoration) mais **ne compare pas les excès de risque**.
2. **Contrôle de l’erreur d’estimation** $R_\\varphi(\\hat g_{n,\\mathcal C,\\varphi})-R_\\varphi(g^*_{\\mathcal C,\\varphi})$ pour des **classes infinies** (celles que l’on utilise en pratique).
3. **Contrôle de l’erreur d’optimisation** : comment minimiser le risque convexifié, et avec quelle précision ?`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 8. Méthodes types et examen
  // -------------------------------------------------------------------------
  {
    id: 'ch9-s8-examen',
    title: '8. Méthodes types et « À l’examen » : choix de k, fléau de la dimension, bornes ERM',
    role: 'liens-examen',
    intro:
      'Le chapitre 9 a pesé environ 12 % de l’Examen 2025 (Ex. 3 Q8–Q9 : décomposition biais / variance des $k$ plus proches voisins, choix de $k$, grande dimension) et 0 % du CC 2022 (DIAGNOSTIC §8). Hoeffding, les bornes sur classe finie, le *no free lunch* et la convexification ne sont jamais tombés mais sont plausibles en question de cours (DIAGNOSTIC §4 item 13) et dans l’exercice d’apprentissage de l’examen blanc (§9 point 3 : « ERM sur classe finie avec Hoeffding », classifieur par histogramme).',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch9-meth-borne-finie',
        type: 'methode',
        label: 'Méthode type',
        title: 'Majorer l’erreur d’estimation d’un MRE sur une classe finie',
        source: 'Synthèse de Poly ch.9, Th. 1.2, 1.3, 1.5, 1.6, 1.8 ; PC9 Ex. 4 et 7',
        statement: `1. **Décomposer** (ajout / retrait) : $R(\\hat g^*_{n,\\mathcal C})-R(g^*_{\\mathcal C})=\\{R(\\hat g^*)-\\widehat{\\mathrm R}_n(\\hat g^*)\\}+\\{\\widehat{\\mathrm R}_n(\\hat g^*)-\\widehat{\\mathrm R}_n(g^*_{\\mathcal C})\\}+\\{\\widehat{\\mathrm R}_n(g^*_{\\mathcal C})-R(g^*_{\\mathcal C})\\}$ ; le terme du milieu est $\\le0$ (définition du MRE).
2. **Premier terme** : majorer par $\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|$ car $\\hat g^*\\in\\mathcal C$ (la règle dépend des données : **pas** de Hoeffding direct). **Troisième terme** : règle **fixée** — sans biais (espérance) ou Hoeffding (probabilité).
3. **Grande probabilité** : pour chaque $g$ fixée, les pertes sont i.i.d. dans $[0,1]$ ⇒ Hoeffding $2e^{-2n\\varepsilon^2}$ ; **borne de l’union** (aucune indépendance requise) ⇒ $2|\\mathcal C|e^{-2n\\varepsilon^2}$ ; résoudre $2|\\mathcal C|e^{-2n\\varepsilon^2}=\\delta$ ⇒ Th. 1.6 : $2\\sqrt{\\log(2|\\mathcal C|/\\delta)/(2n)}$.
4. **Espérance** : (3) du Th. 1.2 (sans facteur 2) ; lemme de Hoeffding ⇒ les $\\widehat{\\mathrm R}_n(g)-R(g)$ sont sous-gaussiennes de facteur $1/(4n)$ ; Pisier ⇒ Th. 1.8 : $\\sqrt{\\log(2|\\mathcal C|)/(2n)}$. Variante : intégrer la queue $\\mathbb E[U]=\\int_0^\\infty\\mathbb P(U>\\varepsilon)\\,\\mathrm d\\varepsilon$ en majorant la probabilité par 1 près de 0 (PC9 Ex. 4 Q4b).
5. **Conclure** avec la décomposition (1) : excès de risque = estimation + approximation ; commenter : $\\log|\\mathcal C|$, $1/\\sqrt n$, aucune hypothèse sur $\\mathbb P$.`,
        intuition: 'Chaque étape vaut des points : nommer l’inégalité, vérifier ses hypothèses (indépendance, variables bornées, règle **fixée**), écrire la borne avec son facteur 2 et son $\\log(2|\\mathcal C|)$.',
        pitfalls: ['Appliquer Hoeffding au MRE ; oublier le facteur 2 de (2) ; écrire $\\log|\\mathcal C|$ au lieu de $\\log(2|\\mathcal C|)$ en bilatéral ; confondre borne en probabilité et en espérance.'],
      },
      {
        kind: 'theorem',
        id: 'ch9-meth-hoeffding',
        type: 'methode',
        label: 'Méthode type',
        title: 'Utiliser Hoeffding : taille d’échantillon et forme « δ »',
        source: 'Poly ch.9, Th. 1.3–1.4 ; PC9 Ex. 1 Q4 et Ex. 5 Q1–Q2',
        statement: `1. Écrire la quantité comme une **moyenne de variables indépendantes bornées** (indicatrices : proportion empirique, erreur de validation, risque empirique d’une règle fixée).
2. Vérifier : indépendance (éventuellement **conditionnellement** à $\\mathcal D_n$, en « gelant » la règle), support $[a,b]$ (longueur $b-a$).
3. Appliquer $\\mathbb P(|\\bar Z-\\mathbb E\\bar Z|\\ge\\varepsilon)\\le2e^{-2n\\varepsilon^2}$ (ou $2e^{-2n^2\\varepsilon^2/\\sum(b_i-a_i)^2}$).
4. **Inverser** : $2e^{-2n\\varepsilon^2}\\le\\delta\\iff n\\ge\\ln(2/\\delta)/(2\\varepsilon^2)$, ou $\\varepsilon=\\sqrt{\\ln(2/\\delta)/(2n)}$ ; comparer à Bienaymé-Tchebychev $n\\ge1/(4\\delta\\varepsilon^2)$.
5. Si un conditionnement a été utilisé, intégrer (tour des espérances) : la borne ne dépend pas de la valeur conditionnante.`,
        pitfalls: ['$2e^{-2n\\varepsilon}$ et $2e^{-2\\varepsilon^2/n}$ ne sont pas des bornes pour la moyenne.', 'Exemple-type : $\\varepsilon=\\delta=0{,}05$ ⇒ $n\\ge738$ (Hoeffding) contre $2000$ (BT).'],
      },
      {
        kind: 'theorem',
        id: 'ch9-meth-knn',
        type: 'methode',
        label: 'Méthode type',
        title: 'Analyse biais / variance des k plus proches voisins et choix de k (Examen 2025 Ex. 3 Q8–Q9)',
        source: 'Examen 2025 Ex. 3 Q8–Q9 ; DIAGNOSTIC §2.A et §5.12 ; Poly ch.9, éq. (1)',
        hypotheses: [
          '(H1) support $\\mathcal X$ compact ; (H2) $0<c_-\\le p_X\\le c_+$ ; (H3) $\\eta$ $L$-lipschitzienne.',
          'Résultats des questions précédentes (admis) : $U_k(x)=F_x(\\mathfrak R_k(x))\\sim\\mathrm{Beta}(k,n-k+1)$, $\\mathbb E_n[\\mathfrak R_k(x)^d]\\le\\frac{k}{c_-v_d(n+1)}$ (Q7) ; borne plug-in $R(\\hat g)-R^\\star\\le2\\mathbb E|\\eta(X)-\\hat\\eta(X)|$ (Q3).',
        ],
        statement: `1. **Conditionner par le design** $X_{1:n}$ : $\\bar\\eta_k(x):=\\mathbb E_n[\\hat\\eta_{n,k}(x)\\mid X_{1:n}]=\\frac1k\\sum_{i\\in N_k(x)}\\eta(X_i)$ et $\\mathbb E_n[(\\hat\\eta_{n,k}-\\eta)^2]=\\underbrace{\\mathbb E_n[(\\hat\\eta_{n,k}-\\bar\\eta_k)^2]}_{\\text{variance}}+\\underbrace{\\mathbb E_n[(\\bar\\eta_k-\\eta)^2]}_{\\text{biais}^2}$ (terme croisé nul).
2. **Variance** : conditionnellement, moyenne de $k$ Bernoulli indépendantes, $\\le\\frac1{4k}$.
3. **Biais** : $|\\bar\\eta_k(x)-\\eta(x)|\\le L\\,\\mathfrak R_k(x)$ (H3) ; pour $d\\ge2$, Jensen avec $u\\mapsto u^{2/d}$ **concave** : $\\mathbb E_n[\\mathfrak R_k^2]\\le(\\mathbb E_n[\\mathfrak R_k^d])^{2/d}\\le\\big(\\frac{k}{c_-v_d(n+1)}\\big)^{2/d}$ (Q7).
4. Bilan : $\\mathbb E_n[(\\hat\\eta_{n,k}(x)-\\eta(x))^2]\\le C_d\\big((k/n)^{2/d}+1/k\\big)$, $C_d=\\max\\big(L^2/(c_-v_d)^{2/d},1/4\\big)$.
5. **Excès de risque** (Q9) : plug-in + Cauchy-Schwarz : $\\mathbb E_n[R(\\hat g_{n,k})]-R^\\star\\le2\\sqrt{C_d}\\sqrt{(k/n)^{2/d}+1/k}$.
6. **Choix de $k$** : minimiser $\\varphi(k)=(k/n)^{2/d}+1/k$ : $k^\\star=(d/2)^{d/(d+2)}n^{2/(d+2)}\\asymp n^{2/(d+2)}$, $\\varphi(k^\\star)\\asymp n^{-2/(d+2)}$, donc excès de risque $\\lesssim n^{-1/(d+2)}$.
7. **Grande dimension** : pour une précision $\\varepsilon$ il faut $n\\asymp\\varepsilon^{-(d+2)}$ : **fléau de la dimension**. Comparer à $n^{-1/2}$ (paramétrique) et à $\\sqrt{\\log|\\mathcal C|/n}$ (MRE sur classe finie).`,
        intuition: 'C’est la décomposition (1) du ch.9 transposée : **petit $k$** = estimation bruitée (variance $1/k$, sur-apprentissage) ; **grand $k$** = moyenne sur une boule trop grande (biais $(k/n)^{1/d}$, sous-apprentissage). L’optimum équilibre les deux termes.',
        pitfalls: [
          'Jensen dans le **bon sens** : $u\\mapsto u^{2/d}$ est concave pour $d\\ge2$, donc $\\mathbb E[Z^{2/d}]\\le(\\mathbb E Z)^{2/d}$.',
          'Conditionner par $X_{1:n}$ avant de calculer la variance ; ne pas oublier le double aléa (point test et $\\mathcal D_n$).',
          'Pour $d=1$, utiliser directement $\\mathbb E[U_k^2]=\\frac{k(k+1)}{(n+1)(n+2)}$.',
        ],
      },
      {
        kind: 'viz',
        id: 'ch9-s8-viz-fleau',
        vizId: 'ch9-fleau-dimension',
        caption: 'Fléau de la dimension : en grande dimension le plus proche voisin n’est guère plus proche qu’un point quelconque, et la taille d’échantillon nécessaire explose comme $\\varepsilon^{-(d+2)}$.',
      },
      {
        kind: 'text',
        id: 'ch9-s8-exam2025',
        title: 'Ce qui est tombé — Examen 2025 Ex. 3 Q8–Q9 (≈ 2,5 pts sur 20)',
        text: `Cadre : classification binaire $Y\\in\\{-1,1\\}$, $\\eta(x)=\\mathbb P(Y=1\\mid X=x)$, $\\hat\\eta_{n,k}(x)=\\frac1k\\sum_{i\\in N_k(x)}\\mathbf 1\\{Y_i=1\\}$, $\\hat g_{n,k}=2\\mathbf 1\\{\\hat\\eta_{n,k}\\ge1/2\\}-1$, rayon $\\mathfrak R_k(x)$ du $k$-ième voisin, $F_x(t)=\\mathbb P(X\\in B(x,t))$, $v_d$ volume de la boule unité.

- **Q8 (★★★, ≈ 1,25 pt)** : $\\mathbb E_n[(\\hat\\eta_{n,k}(x)-\\eta(x))^2]\\le C_d\\big((k/n)^{2/d}+1/k\\big)$ avec $C_d$ explicite — conditionnement par le design, variance $\\le1/(4k)$, biais $\\le L\\,\\mathfrak R_k$, Jensen, Q7.
- **Q9 (★★★, ≈ 1,25 pt)** : borne sur $\\mathbb E_n[R(\\hat g_{n,k})]-R^\\star$, $k$ optimal $\\asymp n^{2/(d+2)}$, vitesse $n^{-1/(d+2)}$, commentaire sur la grande dimension.

**Rédaction attendue** : annoncer la décomposition biais / variance et la justifier (espérance conditionnelle, terme croisé nul) ; citer (H3) pour le biais et Q7 pour le rayon ; dire **dans quel sens** va Jensen et pourquoi ; pour Q9, citer la borne plug-in (Q3) puis Cauchy-Schwarz ; dériver $\\varphi(k)$, donner $k^\\star$ et la vitesse, puis **commenter** : compromis (sous-/sur-apprentissage), dégradation avec $d$, comparaison aux vitesses paramétriques et aux bornes $\\sqrt{\\log|\\mathcal C|/n}$ du ch.9.`,
      },
      {
        kind: 'text',
        id: 'ch9-s8-peut-tomber',
        title: 'Ce qui peut tomber (questions de cours et examen blanc)',
        text: `- **Énoncer** l’inégalité de Hoeffding (hypothèses : indépendance, variables bornées ; pas besoin de même loi) et sa forme « $\\delta$ » ; calculer un $n$ suffisant.
- **Énoncer et démontrer** le Th. 1.2 (les deux observations, le facteur 2 qui disparaît en espérance) et la Prop. 1.1 (biais optimiste).
- **Définir** risque empirique, MRE, oracle, erreurs d’approximation et d’estimation ; dire comment elles varient avec $\\mathcal C$ et $n$ ; définir le sur-apprentissage (situation (b)).
- **Borne sur classe finie** (Th. 1.5–1.6, 1.8) : enchaînement Hoeffding + union + Th. 1.2 ; Pisier.
- **Erreur de validation** (PC9 Ex. 1) : loi binomiale conditionnelle, BT puis Hoeffding.
- **Classifieur par histogramme** (Compléments §4.3, cité par DIAGNOSTIC §9) : MRE = vote majoritaire, $|\\mathcal C|=2^m$, borne $\\sqrt{(m+1)\\log2/(2n)}$, choix de $m$.
- **Interpréter** le *no free lunch* ; expliquer pourquoi on convexifie et ce que garantit la Prop. 1.3.`,
      },
      {
        kind: 'text',
        id: 'ch9-s8-pieges',
        title: 'Pièges relevés (poly, PC9, DIAGNOSTIC §6)',
        text: `- **Règle fixée vs règle apprise** : $\\widehat{\\mathrm R}_n(g)$ est sans biais pour $g$ fixée, pas pour $\\hat g^*_{n,\\mathcal C}$ (biais optimiste) ; Hoeffding ne s’applique pas directement au MRE.
- **Double aléa** : $R(\\widehat g_n)$ est une variable aléatoire ; on conditionne par $\\mathcal D_n$ (« geler ») puis on intègre.
- **Facteurs** : 2 dans (2) mais pas dans (3) ; $\\log(2|\\mathcal C|)$ en bilatéral ; $(b-a)^2/8$ dans le lemme de Hoeffding ; $\\sigma^2=1/(4n)$ pour les $Z_j$ ; $\\log(2m)$ dans Pisier.
- **Trois écritures** : $2e^{-2n\\varepsilon^2}$ (moyenne), $2e^{-2\\varepsilon^2/n}$ (somme), $2e^{-2n\\varepsilon}$ (fausse).
- **Borne de l’union** : aucune indépendance requise ; ne pas multiplier les probabilités.
- **Sous-gaussienne** : centrée, pour tout $\\lambda\\in\\mathbb R$ ; variance seulement **majorée** par $v$ ; facteurs additifs pour une somme indépendante.
- **No free lunch** : interdit une garantie **uniforme** en la loi, pas la consistance pour une loi fixée ; nécessite $\\mathsf X$ infini.
- **Convexification** : la Prop. 1.3 compare des risques, pas des excès de risque ; la quadratique n’est pas croissante ; $\\log_2$ dans la logistique ; $z=-y\\,h(\\mathbf x)$.
- **Notations des énoncés** : la PC9 écrit $R_n(g)$ (sans chapeau), $D_n$ (italique), des labels dans $\\{0,1\\}$ et $g^\\star_{\\mathcal C}$ pour l’oracle ; les redéfinir en tête de copie.`,
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 9. Compléments hors programme
  // -------------------------------------------------------------------------
  {
    id: 'ch9-s9-complements',
    title: '9. Compléments (hors programme) : PAC, histogrammes, McDiarmid, classifieurs affines',
    role: 'complements',
    scope: 'hors-programme',
    intro: 'Section « 4 Les compléments » du poly (p. 34–40) : « Les contenus de cette partie ne sont pas exigibles. » Résumés concis ; la démonstration du *no free lunch* (§4.1) et celle de Pisier (§4.4) figurent déjà en §3 et §6.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch9-def-4-1',
        type: 'definition',
        label: 'Définition 4.1',
        title: 'Règle probablement approximativement correcte (PAC)',
        source: 'Poly ch.9, Compléments §4.2, Déf. 4.1, p. 35',
        scope: 'hors-programme',
        statement: 'Pour $\\varepsilon>0$, $\\delta\\in]0,1[$ et une famille $\\mathcal C$ de règles de classification, une règle $\\widehat g_n\\in\\mathcal C$ construite sur $\\mathcal D_n$ est **$(\\varepsilon,\\delta)$-PAC** si $\\mathbb P\\big(R(\\widehat g_n)-\\inf_{g\\in\\mathcal C}R(g)\\ge\\varepsilon\\big)\\le\\delta$, **pour toutes les lois** de $(\\mathbf X,Y)$.',
        intuition: 'Cadre de L. Valiant (1984). Exiger $\\delta=0$ serait excessif : un échantillon peu représentatif peut toujours se produire.',
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-4-1',
        type: 'theoreme',
        label: 'Théorème 4.1 et Lemme 4.1',
        title: 'Borne PAC dans le cas réalisable ; intégration d’une queue exponentielle',
        source: 'Poly ch.9, Compléments §4.2, Th. 4.1 et Lemme 4.1, p. 35–36',
        scope: 'hors-programme',
        hypotheses: ['Th. 4.1 : $|\\mathcal C|<\\infty$ et $\\min_{g\\in\\mathcal C}R(g)=0$ (cas **réalisable**).', 'Lemme 4.1 : $Z\\ge0$, $C\\ge1$, $\\alpha>0$.'],
        statement: `**Th. 4.1** : $\\mathbb P(R(\\hat g^*_{n,\\mathcal C})\\ge\\varepsilon)\\le|\\mathcal C|e^{-n\\varepsilon}$ ; le MRE est $(\\varepsilon,\\delta)$-PAC dès que $n\\ge(\\log|\\mathcal C|+\\log(1/\\delta))/\\varepsilon$, et $\\mathbb E[R(\\hat g^*_{n,\\mathcal C})]\\le(1+\\log|\\mathcal C|)/n$ : **vitesse $1/n$** et non $1/\\sqrt n$.

**Lemme 4.1** : si $\\mathbb P(Z\\ge\\varepsilon)\\le Ce^{-\\alpha\\varepsilon}$ pour tout $\\varepsilon>0$, alors $\\mathbb E[Z]\\le(1+\\log C)/\\alpha$ ; si $\\mathbb P(Z\\ge\\varepsilon)\\le Ce^{-\\alpha\\varepsilon^2}$, alors $\\mathbb E[Z]\\le\\sqrt{(1+\\log C)/\\alpha}$.`,
        intuition: 'Preuve du Th. 4.1 : une règle de risque nul a un risque empirique nul p.s., donc le MRE aussi ; $\\{R(\\hat g^*)\\ge\\varepsilon\\}\\subset\\bigcup_{g:R(g)\\ge\\varepsilon}\\{\\widehat{\\mathrm R}_n(g)=0\\}$ et $\\mathbb P(\\widehat{\\mathrm R}_n(g)=0)=(1-R(g))^n\\le e^{-n\\varepsilon}$. Lemme 4.1 : $\\mathbb E[Z]=\\int_0^\\infty\\mathbb P(Z>t)\\,\\mathrm dt\\le u+Ce^{-\\alpha u}/\\alpha$ avec $u=\\log C/\\alpha$ ; second cas via $Z^2$ et Jensen. **Cas agnostique** : avec probabilité $\\ge1-\\delta$, $R(g)\\le\\widehat{\\mathrm R}_n(g)+\\sqrt{(\\log|\\mathcal C|+\\log(1/\\delta))/(2n)}$ pour tout $g\\in\\mathcal C$ ; le MRE est $(\\varepsilon,\\delta)$-PAC dès que $n\\ge2\\{\\log(1/\\delta)+\\log(2|\\mathcal C|)\\}/\\varepsilon^2$ ; $\\log_2|\\mathcal C|$ est le nombre de bits pour désigner une règle de la classe.',
      },
      {
        kind: 'text',
        id: 'ch9-s9-histogrammes',
        title: '§4.3 — La classification par histogramme',
        scope: 'hors-programme',
        text: `Partition $\\{Q_1,\\dots,Q_m\\}$ de $\\mathsf X$ (ex. $\\mathsf X=[0,1]^d$, $q$ intervalles par axe, $m=q^d$ hypercubes) ; classe $\\mathcal C=\\{g=\\sum_{j=1}^md_j\\mathbf{1}_{Q_j}:(d_1,\\dots,d_m)\\in\\{-1,1\\}^m\\}$, $|\\mathcal C|=2^m$. Le risque empirique $\\widehat{\\mathrm R}_n(g)=\\sum_{j=1}^m\\frac1n\\sum_{i=1}^n\\mathbf{1}_{\\{\\mathbf X_i\\in Q_j\\}}\\mathbf{1}_{\\{Y_i\\ne d_j\\}}$ se minimise **cellule par cellule** : le MRE est le **vote majoritaire** dans chaque cellule. Par les Th. 1.6 et 1.8 avec $|\\mathcal C|=2^m$ :

$$\\mathbb P\\Big(R(\\hat g^*_{n,\\mathcal C})-\\inf_{g\\in\\mathcal C}R(g)\\le2\\sqrt{\\frac{(m+1)\\log2+\\log(1/\\delta)}{2n}}\\Big)\\ge1-\\delta,\\qquad\\mathbb E\\big[R(\\hat g^*_{n,\\mathcal C})\\big]-\\inf_{g\\in\\mathcal C}R(g)\\le\\sqrt{\\frac{(m+1)\\log2}{2n}}.$$

L’erreur d’estimation est contrôlée par $m/n$ : il faut **peu de cellules devant $n$** pour que chaque vote ait un sens ; avec $m=q^d$, c’est une autre forme du fléau de la dimension (visualisation de la §3).`,
      },
      {
        kind: 'theorem',
        id: 'ch9-thm-4-2',
        type: 'theoreme',
        label: 'Théorème 4.2 et Corollaire 4.1',
        title: 'Inégalité de McDiarmid (différences bornées) et concentration de la déviation uniforme',
        source: 'Poly ch.9, Compléments §4.5, Déf. 4.2, Th. 4.2, Cor. 4.1, p. 38–39',
        scope: 'hors-programme',
        hypotheses: [
          '$X_1,\\dots,X_n$ indépendantes à valeurs dans $\\mathsf A$.',
          '$f:\\mathsf A^n\\to\\mathbb R$ à **différences bornées** : changer la $i$-ème coordonnée modifie $f$ d’au plus $c_i$ (Déf. 4.2).',
        ],
        statement: `Pour $G=f(X_1,\\dots,X_n)$ et tout $t>0$ : $\\mathbb P(G-\\mathbb E[G]\\ge t)\\le\\exp\\big(-2t^2/\\sum_{i=1}^nc_i^2\\big)$, et de même pour $\\mathbb P(G-\\mathbb E[G]\\le-t)$. Pour $f=n^{-1}\\sum x_i$ sur $[0,1]$ ($c_i=1/n$) on retrouve Hoeffding.

**Cor. 4.1** ($\\mathcal C$ finie ou dénombrable, perte 0-1) : avec probabilité $\\ge1-\\delta$, $\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|\\le\\mathbb E\\big[\\sup_{g\\in\\mathcal C}|\\widehat{\\mathrm R}_n(g)-R(g)|\\big]+\\sqrt{\\log(1/\\delta)/(2n)}$.`,
        intuition: 'Preuve : martingale de Doob $H_i$, accroissements $V_i$ centrés conditionnellement dans un intervalle de longueur $\\le c_i$, lemme de Hoeffding conditionnel, récurrence puis Chernoff. La déviation uniforme est concentrée autour de sa moyenne **indépendamment de la loi et du cardinal** (chaque couple change chaque moyenne d’au plus $1/n$) ; reste à majorer l’espérance : théorie de Vapnik-Chervonenkis, hors chapitre.',
      },
      {
        kind: 'text',
        id: 'ch9-s9-affines',
        title: '§4.6 — Preuve de la Prop. 1.2 (classifieurs affines) et lemme combinatoire (admis)',
        scope: 'hors-programme',
        text: `Sous densité, toute famille de $d$ attributs distincts définit p.s. un unique hyperplan ; $h_{I,z}(\\mathbf x):=2\\mathbf{1}_{\\{z(\\mathbf a_I^\\top\\mathbf x+b_I)\\ge0\\}}-1$, $|I|=d$, $z\\in\\{-1,1\\}$ : $|\\mathcal C_n|\\le2\\binom nd$. **Lemme 4.2 (admis)** : p.s., pour toute $g\\in\\mathcal C$, $\\widehat{\\mathrm R}_n(\\widehat g_n)\\le\\widehat{\\mathrm R}_n(g)+d/n$. Preuve de la Prop. 1.2 : décomposition $R(\\widehat g_n)-R(g)=\\{R(\\widehat g_n)-\\widehat{\\mathrm R}_n(\\widehat g_n)\\}+\\{\\widehat{\\mathrm R}_n(\\widehat g_n)-\\widehat{\\mathrm R}_n(g)\\}+\\{\\widehat{\\mathrm R}_n(g)-R(g)\\}$ ; terme du milieu $\\le d/n$ ; premier terme $\\le\\max_{I,z}\\{R(h_{I,z})-\\widehat{\\mathrm R}^I_n(h_{I,z})\\}+d/n$ en retirant les $d$ points de $I$ (le risque empirique hors de $I$ porte sur des points **indépendants** de $h_{I,z}$) ; Hoeffding unilatéral sur $n-d$ variables et union sur au plus $2\\binom nd+1$ événements : $\\mathbb P\\big(R(\\widehat g_n)-R(g)\\ge\\frac{2d}n+2t\\big)\\le(2\\binom nd+1)e^{-2(n-d)t^2}$ ; choix de $t$ puis continuité monotone de $\\mathbb P$ pour passer à $\\inf_{\\mathcal C}R$. C’est la PC9 Ex. 7 (labels $\\{0,1\\}$, $L^\\star=\\inf_{\\mathcal C}R$).

**Pour aller plus loin (§4.7)** : M. Ledoux, *The Concentration of Measure Phenomenon* ; S. Boucheron, G. Lugosi, P. Massart, *Concentration Inequalities* (Herbst, Bennett, Bernstein, McDiarmid) ; Devroye–Györfi–Lugosi pour la forme faible du *no free lunch* (vitesse arbitrairement lente pour une loi fixée).`,
      },
    ],
  },
]
