import type { CourseSection } from '../types'

/** Sections 5 à 7 du cours : formalisme des tests et fonction puissance, Neyman-Pearson et tests gaussiens, p-valeur. */
export const coursePart2: CourseSection[] = [
  // -------------------------------------------------------------------------
  // 5. Tests : formalisme, puissance, taille, niveau
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s5-tests',
    title: '5. Tests d’hypothèses : formalisme, fonction puissance, taille et niveau',
    role: 'definitions',
    intro:
      'Un test répond à une **question binaire** sur le paramètre (« $\\theta$ est-il inférieur ou supérieur à $\\theta_0$ ? ») en contrôlant la probabilité de se tromper. Exemple du poly : les visites quotidiennes d’un site sont modélisées par une loi de Poisson de paramètre $\\lambda$ ; $\\lambda_0$ (avant modification) est connu ; la question statistique devient « a-t-on $\\lambda\\le\\lambda_0$ ou $\\lambda>\\lambda_0$ ? ». Le passage de la question pratique à la question statistique relève de la modélisation, et il faut s’ancrer dans les cas d’usage pour percevoir l’**asymétrie des erreurs**.',
    blocks: [
      {
        kind: 'text',
        id: 'ch4-s5-preuve-stat',
        title: 'La notion de preuve statistique (§2.1, Remarque 2)',
        text: 'En 2019, plus de 800 scientifiques ont cosigné dans *Nature* l’appel « Scientists rise up against statistical significance ». Ce qui est en cause n’est pas la théorie (exacte) mais son **usage** : un seuil conventionnel (5 %) traité comme frontière entre le vrai et le faux. Les limites d’interprétation sont reprises en section 7 (§2.8 du poly).',
      },
      {
        kind: 'theorem',
        id: 'ch4-def-2-1',
        type: 'definition',
        label: 'Définition 2.1',
        title: 'Test pur, région de rejet, région d’acceptation',
        source: 'Poly ch.4, Déf. 2.1, p. 19–20 (§2.2)',
        hypotheses: [
          '$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ modèle statistique.',
          '$(\\Theta_0,\\Theta_1)$ **partition** de $\\Theta$ ; $H_0:\\theta\\in\\Theta_0$ (hypothèse nulle) contre $H_1:\\theta\\in\\Theta_1$ (hypothèse alternative).',
        ],
        statement: `Un **test pur** de $H_0$ contre $H_1$ est une fonction **mesurable** $\\phi:\\mathsf{Z}\\to\\{0,1\\}$. On convient que

- si $\\phi(Z)=1$, on **rejette** $H_0$ ;
- si $\\phi(Z)=0$, on **ne rejette pas** $H_0$.

$\\mathcal{R}:=\\{z\\in\\mathsf{Z},\\ \\phi(z)=1\\}$ est la **région de rejet** (ou région critique) et $\\mathcal{A}:=\\mathsf{Z}\\setminus\\mathcal{R}$ la **région d’acceptation**.`,
        intuition: 'Une statistique à valeurs dans $\\{0,1\\}$ qui encode la décision. Le test comme règle de décision (actions $\\{0,1\\}$, perte à deux constantes) est le cadre du ch.3 §4.',
        pitfalls: [
          'L’usage dit parfois « accepter $H_0$ » ; la formulation recommandée par le poly est « **ne pas rejeter** $H_0$ », voire « **on échoue à rejeter** $H_0$ » : la construction contrôle en priorité la probabilité de rejeter à tort, donc « ne pas rejeter » n’établit rien.',
        ],
      },
      {
        kind: 'text',
        id: 'ch4-s5-vocabulaire',
        title: 'Hypothèses simples ou composites ; statistique de test et valeur critique (p. 20)',
        text: `- Si $\\Theta_0$ ou $\\Theta_1$ est un **singleton**, l’hypothèse est **simple** ; sinon **composite**. Si les deux hypothèses ne recouvrent pas $\\Theta$ (deux valeurs particulières), on **restreint le modèle** à $\\Theta_0\\cup\\Theta_1$.
- Trois tests courants pour $\\Theta\\subseteq\\mathbb{R}$ : $H_0:\\theta=\\theta_0$ contre $H_1:\\theta=\\theta_1$ (simple contre simple) ; $H_0:\\theta=\\theta_0$ contre $H_1:\\theta\\ne\\theta_0$ (simple contre composite) ; $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$ (composite contre composite).
- Région de rejet fréquente : $\\mathcal{R}=\\{z\\in\\mathsf{Z},\\ T(z)\\ge c\\}$ ; $T(Z)$ est la **statistique de test**, $c$ la **valeur critique**.
- **Convention** : si $T(Z)$ est à densité, $\\{T\\ge c\\}$ et $\\{T>c\\}$ ne changent ni la région (à un négligeable près) ni la taille ; si $T(Z)$ est **discrète**, les seuils diffèrent d’une unité, et le poly adopte l’**inégalité large** partout, **sauf** PC4 Ex. 4 et Ex. 6 où l’énoncé impose l’inégalité **stricte**.`,
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-1',
        title: 'Exemple 2.1 — Traduire une exigence pratique en contrainte de niveau',
        source: 'Poly ch.4, Ex. 2.1, p. 20',
        setup: 'Modèle $\\{\\mathcal{N}(\\theta,1),\\ \\theta\\in\\mathbb{R}\\}$, $n$-échantillon. Question : l’espérance est-elle $\\le\\theta_0=2$ ? On veut que l’erreur « répondre *non* alors que l’espérance est bien $\\le\\theta_0$ » ait probabilité au plus $\\alpha$.',
        steps: [
          { text: 'Partition $\\Theta_0:=]-\\infty,2]$, $\\Theta_1:=]2,+\\infty[$ ; test $H_0:\\theta\\in\\Theta_0$ contre $H_1:\\theta\\in\\Theta_1$.', justification: 'L’erreur qu’on veut contrôler fixe $H_0$ : « alors que l’espérance est bien $\\le\\theta_0$ ».' },
          { text: 'Règle naturelle $\\phi(Z):=\\mathbb{1}_{\\{\\bar X_n\\ge c_\\alpha\\}}$, de région de rejet $\\mathcal{R}=\\{(x_1,\\dots,x_n),\\ n^{-1}\\sum_ix_i\\ge c_\\alpha\\}$.', justification: 'L’événement $\\{\\bar X_n\\ge c_\\alpha\\}$ correspond à « on répond *non* ».' },
          { text: 'Contrainte : $\\mathbb{P}_\\theta(\\bar X_n\\ge c_\\alpha)\\le\\alpha$ **pour tout $\\theta\\in\\Theta_0$**.', justification: '« Pour tout $\\theta\\in\\Theta_0$ » est l’écho de « alors que l’espérance est bien $\\le\\theta_0$ ».' },
        ],
        conclusion: 'On attend $c_\\alpha$ un peu au-dessus de $\\theta_0$ ; l’Ex. 2.4 donne $c_\\alpha=\\theta_0+z_{1-\\alpha}/\\sqrt n$. Exemple 2.2 (sondage) : même mise en place avec $\\mathcal{B}\\mathrm{er}(\\theta)$, $H_0:\\theta\\le\\theta_0$, statistique $S_n=\\sum_iX_i$ (nombre de suffrages favorables) et $\\phi(Z)=\\mathbb{1}_{\\{S_n\\ge c\\}}$.',
      },
      {
        kind: 'theorem',
        id: 'ch4-def-2-2',
        type: 'definition',
        label: 'Définition 2.2',
        title: 'Fonction puissance ; erreurs de première et de seconde espèce',
        source: 'Poly ch.4, Déf. 2.2, p. 21 (§2.3)',
        hypotheses: ['Modèle statistique paramétrique ; $\\phi$ test pur de $H_0:\\theta\\in\\Theta_0$ contre $H_1:\\theta\\in\\Theta_1$.'],
        statement: `La **fonction puissance** de $\\phi$ est

$$\\beta_\\phi:\\Theta\\to[0,1],\\qquad\\theta\\longmapsto\\mathbb{P}_\\theta(\\phi(Z)=1)=\\mathbb{P}_\\theta(Z\\in\\mathcal{R}).$$

- **Erreur de première espèce** : rejeter $H_0$ alors qu’elle est satisfaite ; sa probabilité sous $\\mathbb{P}_\\theta$, $\\theta\\in\\Theta_0$, est le **risque de première espèce** $\\beta_\\phi(\\theta)$.
- **Erreur de seconde espèce** : ne pas rejeter $H_0$ alors qu’elle est fausse ; sa probabilité sous $\\mathbb{P}_\\theta$, $\\theta\\in\\Theta_1$, est le **risque de seconde espèce** $1-\\beta_\\phi(\\theta)$.`,
        intuition: 'La fonction puissance rassemble les deux exigences : on la veut **petite sur $\\Theta_0$** et **grande sur $\\Theta_1$**.',
        pitfalls: ['La « puissance » au sens strict ne concerne que $\\theta\\in\\Theta_1$ ; sur $\\Theta_0$, $\\beta_\\phi$ est un risque d’erreur.'],
      },
      {
        kind: 'theorem',
        id: 'ch4-def-2-3',
        type: 'definition',
        label: 'Définition 2.3',
        title: 'Taille et niveau d’un test ; préordre sur les tests',
        source: 'Poly ch.4, Déf. 2.3, p. 21',
        hypotheses: ['$\\phi$ test pur ; $\\alpha\\in\\,]0,1[$.'],
        statement: `La **taille** de $\\phi$ est

$$\\overline{\\alpha}(\\phi):=\\sup_{\\theta\\in\\Theta_0}\\beta_\\phi(\\theta).$$

Le test est **de niveau $\\alpha$** si $\\overline{\\alpha}(\\phi)\\le\\alpha$.

**Préordre** : si $\\beta_{\\phi_1}(\\theta)\\le\\beta_{\\phi_2}(\\theta)$ pour tout $\\theta\\in\\Theta_0$ et $\\beta_{\\phi_1}(\\theta)\\ge\\beta_{\\phi_2}(\\theta)$ pour tout $\\theta\\in\\Theta_1$, alors $\\phi_1$ est **préférable** à $\\phi_2$.`,
        intuition: 'La taille est le risque de première espèce **maximal** : un **nombre attaché au test**. Le niveau est une **contrainte** qu’on lui impose : un test de taille 3 % est de niveau 5 %, et aussi de niveau 3 %. Le préordre, comme l’ordre partiel sur les risques du ch.3, ne compare pas deux tests dont les fonctions puissance **se croisent**.',
        pitfalls: ['Confondre taille et niveau.', 'Pour $H_0$ simple $\\{\\theta_0\\}$, la taille est $\\beta_\\phi(\\theta_0)$.', 'Niveau $\\alpha$ ne signifie pas « $H_0$ vraie avec probabilité $\\alpha$ ».'],
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-3',
        title: 'Exemple 2.3 — Moyenne gaussienne, variance connue : calcul de la fonction puissance',
        source: 'Poly ch.4, Ex. 2.3, p. 22',
        setup: '$Z=(X_1,\\dots,X_n)$ $n$-échantillon de $\\{\\mathcal{N}(\\theta,\\sigma^2),\\ \\theta\\in\\mathbb{R}\\}$, $\\sigma^2$ connue ; $H_0:\\theta\\le0$ contre $H_1:\\theta>0$ ; $T(Z):=\\sqrt n\\bar X_n/\\sigma$ et $\\phi_c(Z):=\\mathbb{1}_{\\{T(Z)\\ge c\\}}$.',
        steps: [
          { text: '$\\beta_{\\phi_c}(\\theta)=\\mathbb{P}_\\theta\\big(\\sqrt n\\bar X_n/\\sigma\\ge c\\big)=\\mathbb{P}_\\theta\\Big(\\frac{\\sqrt n(\\bar X_n-\\theta)}{\\sigma}\\ge c-\\frac{\\sqrt n\\theta}{\\sigma}\\Big)$.', justification: 'Centrage-réduction sous $\\mathbb{P}_\\theta$ (on soustrait $\\sqrt n\\theta/\\sigma$ des deux côtés).' },
          { text: '$\\sqrt n(\\bar X_n-\\theta)/\\sigma\\sim\\mathcal{N}(0,1)$ sous $\\mathbb{P}_\\theta$, donc $\\beta_{\\phi_c}(\\theta)=1-\\Phi\\big(c-\\sqrt n\\theta/\\sigma\\big)$.', justification: 'Loi de $\\bar X_n$ ; définition de $\\Phi$.' },
          { text: '$\\Phi$ croissante $\\Rightarrow$ $\\theta\\mapsto\\beta_{\\phi_c}(\\theta)$ strictement croissante ; le sup sur $\\theta\\le0$ est atteint en $\\theta=0$ : $\\overline{\\alpha}(\\phi_c)=1-\\Phi(c)$.', justification: 'Monotonie de la puissance ; Déf. 2.3.' },
          { text: '$1-\\Phi(c)=\\alpha\\iff c=z_{1-\\alpha}$ : le test est de niveau $\\alpha$ et même de **taille exactement $\\alpha$**.', justification: '$\\Phi$ continue strictement croissante.' },
        ],
        conclusion: 'La taille décroît quand $c$ croît ; le choix $c=0$ donnerait une taille $1/2$. Figure p. 22 : la taille se lit comme une **aire** sous la densité de $T(Z)$ sous $\\mathbb{P}_0$ (aire $0{,}05$ à droite de $z_{0{,}95}\\simeq1{,}645$). Plus le paramètre est grand, plus on rejette : propriété attendue d’un bon test unilatéral.',
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-4',
        title: 'Exemple 2.4 — Deux valeurs critiques : taille et puissance varient ensemble',
        source: 'Poly ch.4, Ex. 2.4, p. 23',
        setup: 'Cadre de l’Ex. 2.1 ($\\mathcal{N}(\\theta,1)$), $\\Theta_0=]-\\infty,\\theta_0]$ ; deux réels $c_1>c_2$ et $\\phi_i(Z):=\\mathbb{1}_{\\{\\bar X_n\\ge c_i\\}}$.',
        steps: [
          { text: '$c_1>c_2\\Rightarrow\\mathcal{R}_1=\\{\\bar X_n\\ge c_1\\}\\subset\\mathcal{R}_2=\\{\\bar X_n\\ge c_2\\}$, donc $\\beta_{\\phi_1}(\\theta)\\le\\beta_{\\phi_2}(\\theta)$ pour **tout** $\\theta\\in\\Theta$.', justification: 'Inclusion des régions de rejet, croissance de la probabilité.' },
          { text: '$\\beta_{\\phi_i}(\\theta)=1-\\Phi((c_i-\\theta)\\sqrt n)$ et $\\overline{\\alpha}(\\phi_i)=1-\\Phi((c_i-\\theta_0)\\sqrt n)$.', justification: '$\\bar X_n\\sim\\mathcal{N}(\\theta,1/n)$ ; croissance en $\\theta$, sup en $\\theta_0$.' },
          { text: 'Sur $\\Theta_0$, $\\phi_1$ rejette moins souvent à tort ; sur $\\Theta_1$, $\\phi_1$ est moins puissant : les deux tests ne sont **pas comparables** au sens du préordre.', justification: 'Lecture de l’inégalité sur chacune des deux parties de la partition.' },
          { text: 'A.N. $\\theta_0=2$, $n=50$, $\\alpha=5$ % : $c_1=\\theta_0+z_{0{,}95}/\\sqrt n=2+1{,}645/\\sqrt{50}=2{,}23$ ; en $\\theta=\\theta_0$, la puissance vaut exactement la taille, $0{,}05$.', justification: 'Résolution de $1-\\Phi((c_1-\\theta_0)\\sqrt n)=0{,}05$.' },
        ],
        conclusion: 'Quand la valeur critique **diminue**, la région de rejet s’agrandit : la taille **et** la puissance croissent ensemble, les risques de première et de seconde espèce varient **en sens contraire**. Le test idéal (puissance $0$ sur $\\Theta_0$, $1$ sur $\\Theta_1$) est impossible dès que $\\Theta_0$ et $\\Theta_1$ sont adjacents : $\\beta_\\phi$ est continue et ne peut sauter de $0$ à $1$ en $\\theta_0$.',
      },
      {
        kind: 'viz',
        id: 'ch4-s5-viz-puissance',
        vizId: 'ch4-puissance',
        caption: 'Aires rouge (taille), verte (puissance) et orange (seconde espèce) ; passer en « $c$ libre » et baisser $c$ : rouge et vert grandissent ensemble.',
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-5',
        title: 'Exemple 2.5 — Sondage : taille du test et seuil entier',
        source: 'Poly ch.4, Ex. 2.5, p. 23–24 ; Outils, Lemme 3.1',
        setup: 'Cadre de l’Ex. 2.2 : $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$, $S_n=\\sum_iX_i\\sim\\mathrm{Bin}(n,\\theta)$ sous $\\mathbb{P}_\\theta$, $\\phi(Z)=\\mathbb{1}_{\\{S_n\\ge c\\}}$.',
        steps: [
          { text: '*Croissance en $\\theta$.* Pour tout $c$ et $0\\le\\theta\\le\\vartheta\\le1$ : $\\mathbb{P}_\\theta(S_n\\ge c)\\le\\mathbb{P}_\\vartheta(S_n\\ge c)$.', justification: 'Couplage (Lemme 3.1, ci-dessous).' },
          { text: '*Taille.* $\\overline{\\alpha}(\\phi)=\\sup_{\\theta\\le\\theta_0}\\mathbb{P}_\\theta(S_n\\ge c)=\\mathbb{P}_{\\theta_0}(S_n\\ge c)$.', justification: 'La croissance donne le sup au bord $\\theta_0$.' },
          { text: '*Seuil.* $c_\\alpha:=\\min\\{k\\in\\{0,\\dots,n+1\\},\\ \\mathbb{P}_{\\theta_0}(S_n\\ge k)\\le\\alpha\\}$ (non vide car $\\mathbb{P}_{\\theta_0}(S_n\\ge n+1)=0$) ; $\\phi_\\alpha=\\mathbb{1}_{\\{S_n\\ge c_\\alpha\\}}$ est de niveau $\\alpha$, de taille **en général strictement inférieure** à $\\alpha$.', justification: '$S_n$ entière : la taille ne prend qu’un nombre fini de valeurs ; on prend le plus petit entier assurant le niveau.' },
          { text: '*Puissance $\\ge$ taille.* Pour $\\theta\\in\\Theta_1$, $\\beta_{\\phi_\\alpha}(\\theta)=\\mathbb{P}_\\theta(S_n\\ge c_\\alpha)\\ge\\mathbb{P}_{\\theta_0}(S_n\\ge c_\\alpha)=\\overline{\\alpha}(\\phi_\\alpha)$.', justification: 'Croissance en $\\theta$ appliquée à $\\theta_0<\\theta$.' },
        ],
        conclusion: 'Figure p. 24 ($n=30$, $\\theta=0{,}1;0{,}2;0{,}3;0{,}4$) : les fonctions $c\\mapsto\\mathbb{P}_\\theta(S_n\\ge c)$ sont des escaliers qui **ne se croisent pas**. Dans le cas discret on perd un peu de taille (donc de puissance) ; remède : tests **randomisés** (ch.5). **Piège** : prendre $\\{S_n>c\\}$ au lieu de $\\{S_n\\ge c\\}$ décale le seuil d’une unité.',
      },
      {
        kind: 'theorem',
        id: 'ch4-lem-3-1',
        type: 'lemme',
        label: 'Lemme 3.1 (Outils)',
        title: 'Couplage de deux lois binomiales',
        source: 'Poly ch.4, Outils, Lemme 3.1, p. 38',
        hypotheses: ['$0\\le\\theta\\le\\vartheta\\le1$, $n\\ge1$.'],
        statement: 'Il existe, sur un même espace de probabilité, $A\\sim\\mathrm{Bin}(n,\\theta)$ et $B\\sim\\mathrm{Bin}(n,\\vartheta)$ avec $A\\le B$ presque sûrement. En conséquence, pour tout $c\\in\\mathbb{R}$, $\\mathbb{P}(\\mathrm{Bin}(n,\\theta)\\ge c)\\le\\mathbb{P}(\\mathrm{Bin}(n,\\vartheta)\\ge c)$.',
        intuition: '**Coupler** deux lois, c’est les réaliser sur un même espace pour les comparer trajectoire par trajectoire. Sert à établir la croissance de la fonction puissance dans le modèle binomial (Ex. 2.5, PC4 Ex. 6).',
        proof: [
          { text: '$U_1,\\dots,U_n$ i.i.d. $\\mathcal{U}([0,1])$ ; $A:=\\sum_i\\mathbb{1}_{\\{U_i\\le\\theta\\}}$, $B:=\\sum_i\\mathbb{1}_{\\{U_i\\le\\vartheta\\}}$.', justification: 'Construction explicite sur un même espace.' },
          { text: 'Les $\\mathbb{1}_{\\{U_i\\le\\theta\\}}$ sont indépendantes de loi $\\mathcal{B}\\mathrm{er}(\\theta)$, donc $A\\sim\\mathrm{Bin}(n,\\theta)$ ; de même $B\\sim\\mathrm{Bin}(n,\\vartheta)$.', justification: '$\\mathbb{P}(U_i\\le\\theta)=\\theta$ ; indépendance des $U_i$.' },
          { text: '$\\theta\\le\\vartheta\\Rightarrow\\mathbb{1}_{\\{U_i\\le\\theta\\}}\\le\\mathbb{1}_{\\{U_i\\le\\vartheta\\}}$ pour tout $i$, d’où $A\\le B$ et $\\{A\\ge c\\}\\subset\\{B\\ge c\\}$. $\\square$', justification: 'Inclusion d’événements, croissance de la probabilité.' },
        ],
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 6. Neyman-Pearson, méthode, tests gaussiens, dualité
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s6-neyman-pearson',
    title: '6. L’approche de Neyman-Pearson, la méthode de construction et les tests gaussiens',
    role: 'methodes',
    intro:
      'Minimiser la taille demande une région de rejet petite, maximiser la puissance une région grande : objectifs contradictoires. La règle de **Neyman-Pearson** tranche par une **dissymétrie** : on fixe le niveau, puis on maximise la puissance. Le choix de $H_0$ devient crucial.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch4-np-principe',
        type: 'remarque',
        label: 'Principe (§2.4)',
        title: 'L’approche de Neyman-Pearson',
        source: 'Poly ch.4, §2.4, p. 25',
        hypotheses: ['Deux objectifs contradictoires : taille petite ($\\mathcal{R}$ petite) et puissance grande sur $\\Theta_1$ ($\\mathcal{R}$ grande).'],
        statement: `On se donne un niveau $\\alpha\\in\\,]0,1[$ typiquement petit ($5$ %, $10^{-3}$, $10^{-6}$ selon les applications), on ne retient que les **tests de niveau $\\alpha$**, et l’on cherche parmi eux à **maximiser la fonction puissance sur $\\Theta_1$**.

Conséquences : le risque de première espèce est contrôlé en priorité ; la **seule décision forte est de rejeter $H_0$**. Ne pas rejeter ne prouve rien ($H_0$ vraie, ou données insuffisantes). Deux heuristiques pour choisir $H_0$ :

- **mettre en $H_0$ l’hypothèse qui est en notre défaveur** : pour établir l’efficacité d’un médicament, $H_0$ = « le médicament est inefficace » ;
- **mettre en $H_0$ l’hypothèse la plus dangereuse** : sécurité sismique d’un site de centrale, $H_0$ = « le site présente un risque ».`,
        intuition: 'La dissymétrie correspond à des erreurs de gravités différentes : dépistage (déclarer sain un malade / malade un bien-portant), antidopage (laisser passer un dopé / accuser un innocent), physique (manquer une découverte / annoncer une découverte sans preuve). Deux groupes aux intérêts opposés partiront souvent d’hypothèses nulles **inversées** (industriels / associations de consommateurs).',
        pitfalls: ['On ne peut pas minimiser simultanément les deux erreurs (question courte n°7) : elles varient en sens contraire avec $\\mathcal{R}$.'],
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-6-2-7',
        title: 'Exemples 2.6–2.7 — Échanger H₀ et H₁ : trois régions',
        source: 'Poly ch.4, Ex. 2.6 et 2.7, p. 25–26',
        setup: 'Modèle $\\mathcal{N}(\\theta,1)$, $n$-échantillon. Comparer le test de $H_0:\\theta\\le\\theta_0$ et celui de l’hypothèse échangée $H_0\':\\theta>\\theta_0$.',
        steps: [
          { text: 'Pour $H_0:\\theta\\le\\theta_0$ contre $H_1:\\theta>\\theta_0$ : $\\mathcal{R}=\\{\\sqrt n(\\bar X_n-\\theta_0)\\ge z_{1-\\alpha}\\}$, de taille $\\alpha$.', justification: 'Ex. 2.3 transposé au seuil $\\theta_0$.' },
          { text: 'Pour $H_0\':\\theta>\\theta_0$ : $\\phi=\\mathbb{1}_{\\{\\bar X_n\\le c\\}}$, puissance $\\Phi(\\sqrt n(c-\\theta))$ décroissante en $\\theta$, taille $\\sup_{\\theta>\\theta_0}\\Phi(\\sqrt n(c-\\theta))=\\Phi(\\sqrt n(c-\\theta_0))$.', justification: 'Le sup **n’est pas atteint** ($\\theta_0\\notin\\Theta_0\'$) mais vaut la limite quand $\\theta\\downarrow\\theta_0$.' },
          { text: 'Taille $\\alpha$ $\\iff\\sqrt n(c-\\theta_0)=z_\\alpha=-z_{1-\\alpha}$ : $\\mathcal{R}\'=\\{\\sqrt n(\\bar X_n-\\theta_0)\\le-z_{1-\\alpha}\\}$.', justification: 'Symétrie des quantiles gaussiens.' },
          { text: 'Les deux régions **ne sont pas complémentaires** : pour $-z_{1-\\alpha}<\\sqrt n(\\bar X_n-\\theta_0)<z_{1-\\alpha}$, **aucun** des deux tests ne rejette son hypothèse nulle.', justification: 'Comparaison des seuils.' },
          { text: 'Ex. 2.7 ($\\Theta=\\{0,\\theta_1\\}$, $0<\\theta_1<2z_{1-\\alpha}/\\sqrt n$) : trois régions pour $\\bar X_n$ ; dans la région intermédiaire $\\theta_1-z_{1-\\alpha}/\\sqrt n<\\bar X_n<z_{1-\\alpha}/\\sqrt n$, on conclut $\\theta=0$ si l’on a mis $\\theta=0$ en $H_0$, et $\\theta=\\theta_1$ sinon.', justification: 'Règle de Neyman-Pearson : sans preuve suffisante, on conserve l’hypothèse nulle.' },
        ],
        conclusion: 'La contradiction n’est qu’apparente : les deux procédures ne répondent pas à la même question (elles ne protègent pas la même hypothèse). Interpréter un non-rejet comme une preuve de $H_0$ est l’erreur à éviter.',
      },
      {
        kind: 'theorem',
        id: 'ch4-meth-2-1',
        type: 'methode',
        label: 'Méthode 2.1',
        title: 'Construction d’un test de niveau α',
        source: 'Poly ch.4, Méthode 2.1, p. 26 (§2.5)',
        hypotheses: ['Modèle et hypothèses $H_0$, $H_1$ fixés.'],
        statement: `- (0) Choisir le **niveau** $\\alpha\\in\\,]0,1[$ : c’est le seul seuil que l’on fixe.
- (1) Choisir une **statistique de test** $T(Z)$, en fonction de $H_0$ et du modèle.
- (2) Choisir la **forme de la région de rejet**, en fonction de $H_1$ : $\\{T(Z)\\ge c_\\alpha\\}$ pour une alternative **unilatérale**, $\\{|T(Z)-t_0|\\ge c_\\alpha\\}$ pour une alternative **bilatérale** ; le test est $\\phi_\\alpha(Z)=\\mathbb{1}_{\\{T(Z)\\in\\mathcal{R}_\\alpha\\}}$.
- (3) Choisir $c_\\alpha$ pour que la taille soit au plus $\\alpha$ : $\\sup_{\\theta\\in\\Theta_0}\\mathbb{P}_\\theta(T(Z)\\ge c_\\alpha)\\le\\alpha$. Il faut **connaître la loi de $T(Z)$ sous $H_0$**.
- (4) Éventuellement, calculer la fonction puissance $\\beta_{\\phi_\\alpha}$.
- (5) Éventuellement, calculer la $p$-valeur $\\hat\\alpha(Z)$.
- (6) Conclure numériquement.`,
        intuition: 'L’étape (1) est la seule où le choix n’est pas dicté par la construction ; la réponse générale (rapport de vraisemblance, lemme de Neyman-Pearson) est au ch.5. À l’étape (3), le seuil se calibre **à la frontière** de $\\Theta_0$ quand la puissance est monotone.',
        pitfalls: ['Le sens de la région suit $H_1$, pas $H_0$ : pour une intensité $\\theta$, $H_1:\\theta>\\theta_0$ conduit à rejeter pour les **petites** valeurs de $\\sum_iX_i$ (Examen 2025 Ex. 1 Q2).'],
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-8-2-9',
        title: 'Exemples 2.8–2.9 — Bruit d’aéroport : riverains contre aéroport',
        source: 'Poly ch.4, Ex. 2.8 et 2.9, p. 27',
        setup: 'Seuil légal $\\mu_0=80$ dB ; $n$ mesures, $n$-échantillon de $\\mathcal{N}(\\mu,\\sigma^2)$, $\\sigma^2$ connue. Données : $n=100$, $\\bar X_n=82$ dB, $\\sigma=10$. Les riverains veulent établir que le bruit dépasse le seuil ; l’aéroport, qu’il ne le dépasse pas.',
        steps: [
          { text: '*Riverains.* Seule décision forte = rejeter $H_0$ : $H_0:\\mu\\le\\mu_0$ contre $H_1:\\mu>\\mu_0$.', justification: 'On met en $H_0$ l’assertion contraire à ce que l’on veut établir (§2.4).' },
          { text: 'Statistique $T(Z):=\\sqrt n(\\bar X_n-\\mu_0)/\\sigma$, de loi $\\mathcal{N}(0,1)$ sous $\\mathbb{P}_{\\mu_0}$ ; rejet pour les grandes valeurs, $\\mathcal{R}_\\alpha=\\{T(Z)\\ge z_{1-\\alpha}\\}$, de taille exactement $\\alpha$.', justification: 'Méthode 2.1 ; $\\beta(\\mu)=1-\\Phi(c-\\sqrt n(\\mu-\\mu_0)/\\sigma)$ croissante, sup en $\\mu_0$ (Ex. 2.3). Ni $\\bar X_n$ ni $\\bar X_n-\\mu_0$ ne conviendraient aussi bien : leur loi dépend encore de $n$ et $\\sigma$.' },
          { text: 'A.N. : $T(Z)=10\\times(82-80)/10=2$. Niveau 5 % : $2\\ge z_{0{,}95}=1{,}645$, **on rejette** $H_0$ (rejet dès $\\bar X_n\\ge81{,}645$). Niveau 0,1 % : $2<z_{0{,}999}=3{,}090$, **on échoue à rejeter** $H_0$.', justification: 'Comparaison au quantile.' },
          { text: '*Aéroport.* $H_0:\\mu\\ge\\mu_0$ contre $H_1:\\mu<\\mu_0$ ; $\\mathcal{R}\'_\\alpha=\\{T(Z)\\le-z_{1-\\alpha}\\}$ (taille $\\Phi(c\')$ atteinte en $\\mu_0$). Avec $T(Z)=2>-1{,}645$, l’aéroport **échoue à rejeter** son $H_0$ à tous les niveaux usuels.', justification: 'Même calcul ; $\\mu\\mapsto c\'-\\sqrt n(\\mu-\\mu_0)/\\sigma$ décroissante.' },
        ],
        conclusion: 'Au niveau 5 %, les riverains ont établi statistiquement le dépassement ; au niveau 0,1 %, ils n’ont rien établi — **ce qui ne signifie pas que le seuil est respecté**. L’aéroport n’a rien établi. La $p$-valeur des riverains vaut $1-\\Phi(2)\\approx0{,}023$, entre 0,1 % et 5 %.',
      },
      {
        kind: 'text',
        id: 'ch4-s6-pivot-test',
        title: 'Construire un test à partir d’un pivot (§2.6) — la dualité',
        text: `Si $G$ est pivotale, on peut trouver $t^-_\\alpha$, $t^+_\\alpha$ tels que $\\mathbb{P}_\\theta(G(Z,\\theta)\\in[t^-_\\alpha,t^+_\\alpha])\\ge1-\\alpha$ pour tout $\\theta$ ; alors $\\hat I_\\alpha:=\\{\\theta,\\ G(Z,\\theta)\\in[t^-_\\alpha,t^+_\\alpha]\\}$ est une région de confiance de niveau $1-\\alpha$. Pour tester $H_0:\\theta=\\theta_0$, il est naturel de **rejeter lorsque $\\theta_0\\notin\\hat I_\\alpha$**, c’est-à-dire lorsque $G(Z,\\theta_0)\\notin[t^-_\\alpha,t^+_\\alpha]$ ; sous $H_0$, cet événement a probabilité au plus $\\alpha$ (passage au complémentaire) : le test est de niveau $\\alpha$.

C’est le **pont** entre régions de confiance et tests (formalisé dans les compléments, section 11). La région est souvent **implicite** ; les Ex. 2.10–2.12 sont les cas classiques où la résolution est explicite. Passage exact pour les tests **bilatéraux** ; aux tests unilatéraux correspondent des **bornes** de confiance.`,
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-10',
        title: 'Exemple 2.10 — Test bilatéral sur la moyenne, variance connue',
        source: 'Poly ch.4, Ex. 2.10, p. 28–29 ; PC4 Ex. 2 Q1–Q2',
        setup: '$n$-échantillon de $\\{\\mathcal{N}(\\mu,\\sigma^2),\\ \\mu\\in\\mathbb{R}\\}$, $\\sigma^2$ connue ; $H_0:\\mu=\\mu_0$ contre $H_1:\\mu\\ne\\mu_0$. Construire un test de taille $\\alpha$ et calculer sa puissance.',
        steps: [
          { text: '$G(Z;\\mu):=\\sqrt n(\\bar X_n-\\mu)/\\sigma$ est pivotale de loi $\\mathcal{N}(0,1)$ ; $\\mathbb{P}_{\\mu_0}(|G(Z;\\mu_0)|<z_{1-\\alpha/2})=1-\\alpha$.', justification: 'Ex. 1.4 ; symétrie de $\\mathcal{N}(0,1)$.' },
          { text: '$\\phi_\\alpha(Z):=\\mathbb{1}_{\\{|G(Z;\\mu_0)|\\ge z_{1-\\alpha/2}\\}}$ est de niveau et de taille $\\alpha$ ; $\\mathcal{A}_\\alpha=\\{\\mu_0-z_{1-\\alpha/2}\\sigma/\\sqrt n<\\bar x_n<\\mu_0+z_{1-\\alpha/2}\\sigma/\\sqrt n\\}$.', justification: '$H_0$ simple : taille $=\\beta(\\mu_0)$ ; passage au complémentaire.' },
          { text: '$\\beta(\\mu)=1-\\mathbb{P}_\\mu\\Big(\\frac{\\mu_0-\\mu}{\\sigma/\\sqrt n}-z_{1-\\alpha/2}<\\frac{\\bar X_n-\\mu}{\\sigma/\\sqrt n}<\\frac{\\mu_0-\\mu}{\\sigma/\\sqrt n}+z_{1-\\alpha/2}\\Big)$.', justification: 'Complémentaire du rejet, puis **recentrage en $\\mu$** (la vraie valeur, pas $\\mu_0$).' },
          { text: '$\\beta(\\mu)=1-\\Phi\\Big(\\frac{\\mu_0-\\mu}{\\sigma/\\sqrt n}+z_{1-\\alpha/2}\\Big)+\\Phi\\Big(\\frac{\\mu_0-\\mu}{\\sigma/\\sqrt n}-z_{1-\\alpha/2}\\Big)$ ; en $\\mu=\\mu_0$ on retrouve $1-\\Phi(z_{1-\\alpha/2})+\\Phi(-z_{1-\\alpha/2})=\\alpha$.', justification: '$(\\bar X_n-\\mu)/(\\sigma/\\sqrt n)\\sim\\mathcal{N}(0,1)$ sous $\\mathbb{P}_\\mu$.' },
        ],
        conclusion: '$\\mu\\mapsto\\beta(\\mu)$ atteint son **minimum en $\\mu_0$**, où elle vaut $\\alpha$, et tend vers $1$ quand $n\\to\\infty$ pour tout $\\mu\\ne\\mu_0$ (figure p. 29 : « cuvettes » pour $n=20,50,100$, plus étroites quand $n$ croît). Test « à savoir faire » (PC4 Ex. 2). **Piège** : seuil $z_{1-\\alpha/2}$ et non $z_{1-\\alpha}$ (sinon la taille vaut $2\\alpha$).',
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-11',
        title: 'Exemple 2.11 — Test de Student (variance inconnue) et puissance par la Student non centrale',
        source: 'Poly ch.4, Ex. 2.11, p. 29 ; PC4 Ex. 2 Q6–Q9',
        setup: '$n\\ge2$, $n$-échantillon de $\\{\\mathcal{N}(\\mu,\\sigma^2),\\ (\\mu,\\sigma^2)\\in\\mathbb{R}\\times\\mathbb{R}_+^*\\}$ ; $H_0:\\mu=\\mu_0$ contre $H_1:\\mu\\ne\\mu_0$ ($H_0$ est **composite** : $\\sigma^2$ est libre).',
        steps: [
          { text: '$G(Z;\\mu):=\\frac{\\bar X_n-\\mu}{S_n/\\sqrt n}\\sim\\mathrm{t}(n-1)$ : pivot ; sous $H_0$, $\\mathbb{P}_{\\mu_0,\\sigma^2}\\big(-\\mathrm{t}^{(n-1)}_{1-\\alpha/2}<G(Z;\\mu_0)<\\mathrm{t}^{(n-1)}_{1-\\alpha/2}\\big)=1-\\alpha$ pour **tout** $\\sigma^2>0$.', justification: 'Théorème de Gosset ; parité de la densité de Student.' },
          { text: '**Test de Student** : $\\phi_\\alpha(Z):=\\mathbb{1}_{\\{|G(Z;\\mu_0)|\\ge\\mathrm{t}^{(n-1)}_{1-\\alpha/2}\\}}$, de taille $\\alpha$ (le sup sur $\\Theta_0=\\{\\mu_0\\}\\times\\mathbb{R}_+^*$ vaut $\\alpha$).', justification: 'La loi du pivot ne dépend pas de $\\sigma^2$ : la taille est uniforme en $\\sigma^2$.' },
          { text: 'Puissance : $\\frac{\\bar X_n-\\mu_0}{S_n/\\sqrt n}=\\frac{\\sqrt n(\\bar X_n-\\mu)/\\sigma+\\sqrt n(\\mu-\\mu_0)/\\sigma}{S_n/\\sigma}$, numérateur $\\sim\\mathcal{N}(\\sqrt n(\\mu-\\mu_0)/\\sigma,1)$, dénominateur $=\\sqrt{\\chi^2(n-1)/(n-1)}$ **indépendant**.', justification: 'Décomposition algébrique ; indépendance $\\bar X_n\\perp S_n^2$ (Gosset).' },
          { text: 'Sous $\\mathbb{P}_{(\\mu,\\sigma^2)}$, la statistique suit la **loi de Student non centrale** à $n-1$ degrés de liberté et de paramètre de non-centralité $\\sqrt n(\\mu-\\mu_0)/\\sigma$.', justification: 'Déf. 3.2 (Outils).' },
        ],
        conclusion: 'La puissance ne s’exprime plus avec la loi de Student centrée : sous $H_1$, $\\mu_0$ n’est plus l’espérance de $\\bar X_n$. PC4 Ex. 2 Q8 : $c_\\alpha=\\mathrm{t}^{(n-1)}_{1-\\alpha/2}$ est la **plus petite** valeur garantissant le niveau, donc celle qui **maximise la puissance** parmi les tests de cette forme. $p$-valeur : $2(1-F_{\\mathrm{t}(n-1)}(\\tilde T(Z)))$.',
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-12',
        title: 'Exemple 2.12 — Test sur la variance',
        source: 'Poly ch.4, Ex. 2.12, p. 29',
        setup: '$n\\ge2$, $n$-échantillon de $\\mathcal{N}(\\mu,\\sigma^2)$, $(\\mu,\\sigma^2)$ inconnus ; $\\sigma_0^2>0$ ; $H_0:\\sigma^2=\\sigma_0^2$ contre $H_1:\\sigma^2\\ne\\sigma_0^2$.',
        steps: [
          { text: '$G(Z;\\sigma^2):=(n-1)S_n^2/\\sigma^2\\sim\\chi^2(n-1)$ : pivot (Ex. 1.6).', justification: 'Gosset.' },
          { text: 'Sous $H_0$, pour tout $\\mu$ : $\\mathbb{P}_{\\mu,\\sigma_0^2}\\Big(\\chi^2_{\\alpha/2}(n-1)<\\frac{(n-1)S_n^2}{\\sigma_0^2}<\\chi^2_{1-\\alpha/2}(n-1)\\Big)=1-\\alpha$.', justification: 'F.d.r. continue du $\\chi^2$.' },
          { text: '$\\phi_\\alpha(Z):=\\mathbb{1}_{\\{(n-1)S_n^2/\\sigma_0^2\\notin\\,]\\chi^2_{\\alpha/2}(n-1),\\chi^2_{1-\\alpha/2}(n-1)[\\}}$ est de niveau et de taille $\\alpha$.', justification: 'Passage au complémentaire.' },
        ],
        conclusion: 'Le $\\chi^2$ n’étant pas symétrique, les deux quantiles **ne sont pas opposés** et la région de rejet n’est pas symétrique autour de $\\sigma_0^2$. Les Ex. 2.10–2.12 forment le « triptyque » gaussien ; versions à deux échantillons (deux moyennes : Student à $n+p-2$ degrés ; deux variances : Fisher) en PC4 Ex. 5.',
      },
      {
        kind: 'viz',
        id: 'ch4-s6-viz-dualite',
        vizId: 'ch4-dualite',
        caption: 'Les $\\mu_0$ dont la $p$-valeur dépasse $\\alpha$ forment exactement l’intervalle de confiance.',
      },
    ],
  },
  // -------------------------------------------------------------------------
  // 7. p-valeur et interprétation
  // -------------------------------------------------------------------------
  {
    id: 'ch4-s7-pvaleur',
    title: '7. La p-valeur : définition, calcul, loi sous H₀, interprétation',
    role: 'definitions',
    intro:
      'Le niveau $\\alpha$ est ma **tolérance** à l’erreur de première espèce : en la diminuant, je rejette de moins en moins. Pour une famille de tests dont les régions de rejet décroissent avec $\\alpha$, il existe un niveau à partir duquel je cesse de rejeter, fonction des observations : la **$p$-valeur**. Elle résume en un seul nombre la réponse du test **à tous les niveaux** — c’est pourquoi on la publie.',
    blocks: [
      {
        kind: 'theorem',
        id: 'ch4-def-2-4',
        type: 'definition',
        label: 'Définition 2.4',
        title: 'p-valeur',
        source: 'Poly ch.4, Déf. 2.4, p. 30 (§2.7)',
        hypotheses: [
          '$(\\mathsf{Z},\\mathcal{Z},\\{\\mathbb{P}_\\theta,\\ \\theta\\in\\Theta\\})$ modèle statistique ; $\\{\\phi_\\alpha,\\ \\alpha\\in[0,1]\\}$ famille de tests purs.',
          '(a) Pour tout $\\alpha\\in[0,1]$, $\\phi_\\alpha$ est **de niveau $\\alpha$** : $\\overline{\\alpha}(\\phi_\\alpha)=\\sup_{\\theta\\in\\Theta_0}\\beta_{\\phi_\\alpha}(\\theta)\\le\\alpha$.',
          '(b) Régions **emboîtées** : pour $0\\le\\alpha\\le\\alpha\'<1$, $\\mathcal{R}_\\alpha\\subset\\mathcal{R}_{\\alpha\'}$, où $\\mathcal{R}_\\alpha:=\\{z,\\ \\phi_\\alpha(z)=1\\}$.',
        ],
        statement: `La **$p$-valeur** de l’observation $Z$ pour cette famille est

$$\\hat\\alpha(Z):=\\inf\\{\\alpha\\in[0,1],\\ Z\\in\\mathcal{R}_\\alpha\\}.$$

$H_0$ est **rejetée pour tout niveau $\\alpha>\\hat\\alpha(Z)$** et n’est pas rejetée pour tout $\\alpha<\\hat\\alpha(Z)$.`,
        intuition: 'La $p$-valeur est la **plus petite taille de test** conduisant à rejeter $H_0$ sur l’observation disponible. Plus elle est faible, plus les données sont défavorables à $H_0$. La condition (b) donne son sens à l’infimum (augmenter la tolérance agrandit la région de rejet). Une $p$-valeur de 2 % : rejet pour tout $\\alpha>2$ % (donc à 5 %), échec à rejeter pour tout $\\alpha<2$ % (donc à 1 %).',
        pitfalls: [
          'La $p$-valeur dépend de la **famille** de tests choisie (unilatérale ou bilatérale, statistique).',
          'En $\\alpha=\\hat\\alpha(Z)$ exactement, la décision dépend de la convention (inégalité large ou stricte).',
        ],
      },
      {
        kind: 'theorem',
        id: 'ch4-prop-2-1',
        type: 'proposition',
        label: 'Proposition 2.1',
        title: 'Calcul pratique de la p-valeur',
        source: 'Poly ch.4, Prop. 2.1, p. 30',
        hypotheses: [
          '$\\{\\phi_\\alpha,\\ \\alpha\\in[0,1]\\}$ famille de tests purs de niveau $\\alpha$, de la forme $\\phi_\\alpha(Z)=\\mathbb{1}_{\\{T(Z)\\ge c_\\alpha\\}}$.',
          '$\\alpha\\mapsto c_\\alpha$ **décroissante** sur $[0,1]$.',
        ],
        statement: `La famille vérifie la condition (b) de la Déf. 2.4 et

$$\\hat\\alpha(Z)=\\inf\\{\\alpha\\in\\,]0,1[\\,,\\ T(Z)\\ge c_\\alpha\\}.$$`,
        intuition: 'En pratique, si $c_\\alpha=F_0^{\\leftarrow}(1-\\alpha)$ où $F_0$ est la f.d.r. (continue, strictement croissante) de $T(Z)$ sous la frontière de $H_0$, on obtient $\\hat\\alpha(Z)=1-F_0(T(Z))$ : la **probabilité, sous $H_0$, d’observer une statistique au moins aussi extrême** que celle observée (déduit des Ex. 2.13 et des corrigés de PC4).',
        proof: [
          { text: 'Pour $\\alpha\\le\\alpha\'$, la décroissance de $\\alpha\\mapsto c_\\alpha$ donne $c_{\\alpha\'}\\le c_\\alpha$.', justification: 'Hypothèse de décroissance.' },
          { text: 'Donc $\\mathcal{R}_\\alpha=\\{z,\\ T(z)\\ge c_\\alpha\\}\\subset\\{z,\\ T(z)\\ge c_{\\alpha\'}\\}=\\mathcal{R}_{\\alpha\'}$ : la condition (b) est vérifiée.', justification: '$T(z)\\ge c_\\alpha\\ge c_{\\alpha\'}$.' },
          { text: 'L’expression de $\\hat\\alpha(Z)$ est la Déf. 2.4 réécrite avec $\\mathcal{R}_\\alpha=\\{T(Z)\\ge c_\\alpha\\}$. $\\square$', justification: 'Substitution.' },
        ],
        pitfalls: ['La formule « $1-F_0(T)$ » suppose $F_0$ continue et strictement croissante ; dans le cas **discret**, attention à la convention : avec $\\{T>c\\}$, $\\hat\\alpha=\\mathbb{P}_0(T\\ge t_{\\mathrm{obs}})$, pas $\\mathbb{P}_0(T>t_{\\mathrm{obs}})$ (PC4 Ex. 4 et 6).'],
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-13',
        title: 'Exemple 2.13 — p-valeur pour la moyenne d’une gaussienne',
        source: 'Poly ch.4, Ex. 2.13, p. 30',
        setup: '$\\mathcal{N}(\\theta,\\sigma^2)$, $\\sigma^2$ connue ; $H_0:\\theta\\le0$ contre $H_1:\\theta>0$ ; $\\phi_\\alpha=\\mathbb{1}_{\\{T(Z)\\ge z_{1-\\alpha}\\}}$, $T(Z)=\\sqrt n\\bar X_n/\\sigma$, de niveau $\\alpha$ (Ex. 2.3).',
        steps: [
          { text: '$\\alpha\\mapsto z_{1-\\alpha}$ est décroissante : la Prop. 2.1 s’applique.', justification: '$\\Phi$ croissante.' },
          { text: 'Pour $\\alpha\\in\\,]0,1[$ : $T(Z)\\ge z_{1-\\alpha}\\iff\\Phi(T(Z))\\ge1-\\alpha\\iff\\alpha\\ge1-\\Phi(T(Z))$.', justification: '$\\Phi$ continue et strictement croissante.' },
          { text: 'L’infimum de ces $\\alpha$ est $\\hat\\alpha(Z)=1-\\Phi(\\sqrt n\\bar X_n/\\sigma)$.', justification: 'Prop. 2.1.' },
        ],
        conclusion: 'Elle ne dépend de l’observation qu’à travers $\\bar X_n$. Pour $n=100$, $\\sigma=1$ : $\\hat\\alpha=0{,}999$ si $\\bar X_n=-0{,}3$ ($T=-3$) ; $0{,}159$ si $\\bar X_n=0{,}1$ ($T=1$) ; $1{,}35\\cdot10^{-3}$ si $\\bar X_n=0{,}3$ ($T=3$). Bilatéral (PC4 Ex. 2 Q3) : $\\hat\\alpha(Z)=2(1-\\Phi(T(Z)))$ avec $T(Z)=\\sqrt n|\\bar X_n-\\mu_0|/\\sigma$.',
      },
      {
        kind: 'viz',
        id: 'ch4-s7-viz-aire',
        vizId: 'ch4-pvaleur-aire',
        caption: 'La $p$-valeur est l’aire, sous la loi de $T(Z)$ sous $H_0$, de la zone « au moins aussi extrême » que l’observation.',
      },
      {
        kind: 'theorem',
        id: 'ch4-prop-2-2',
        type: 'proposition',
        label: 'Proposition 2.2',
        title: 'Loi de la p-valeur sous l’hypothèse nulle',
        source: 'Poly ch.4, Prop. 2.2, p. 31',
        hypotheses: [
          'Modèle paramétrique ; $(\\Theta_0,\\Theta_1)$ partition de $\\Theta$.',
          '$\\{\\phi_\\alpha,\\ \\alpha\\in[0,1]\\}$ famille de tests purs vérifiant (a) **et** (b) de la Déf. 2.4 ; $\\hat\\alpha(Z)$ la $p$-valeur associée.',
        ],
        statement: `Pour tout $\\theta\\in\\Theta_0$,

$$\\mathbb{P}_\\theta\\big(\\hat\\alpha(Z)\\le u\\big)\\le u\\qquad\\text{pour tout }u\\in[0,1]\\qquad(1)$$

($\\hat\\alpha(Z)$ est **stochastiquement dominée** par $\\mathcal{U}([0,1])$). Si de plus

$$\\mathbb{P}_\\theta(Z\\in\\mathcal{R}_\\alpha)=\\alpha\\qquad\\text{pour tout }\\alpha\\in\\,]0,1[\\qquad(2)$$

alors $\\mathbb{P}_\\theta(\\hat\\alpha(Z)\\le u)=u$ pour tout $u\\in\\,]0,1[$ : $\\hat\\alpha(Z)$ suit la **loi uniforme** sur $]0,1[$.`,
        intuition: 'Sous $H_0$ avec un niveau atteint, la $p$-valeur est uniforme : elle ne porte **aucune information** (cohérent, $H_0$ est vraie). Sous l’alternative, les petites $p$-valeurs deviennent fréquentes (figure p. 31 : $10^5$ $p$-valeurs, histogramme plat pour $\\theta=\\theta_0=2$, concentré près de 0 pour $\\theta=2{,}1$). C’est ce contraste qui autorise à lire une petite $p$-valeur comme une **indication défavorable à $H_0$, et rien de plus**.',
        proof: [
          { text: 'Soient $\\theta\\in\\Theta_0$, $u\\in[0,1]$ et $v\\in\\,]u,1[$. Si $\\hat\\alpha(Z)\\le u<v$, il existe $\\alpha<v$ tel que $Z\\in\\mathcal{R}_\\alpha$.', justification: 'Définition de l’infimum.' },
          { text: 'Par (b), $\\mathcal{R}_\\alpha\\subset\\mathcal{R}_v$, donc $Z\\in\\mathcal{R}_v$ : $\\{\\hat\\alpha(Z)\\le u\\}\\subset\\{Z\\in\\mathcal{R}_v\\}$.', justification: 'Régions emboîtées.' },
          { text: '$\\mathbb{P}_\\theta(\\hat\\alpha(Z)\\le u)\\le\\mathbb{P}_\\theta(Z\\in\\mathcal{R}_v)\\le\\overline{\\alpha}(\\phi_v)\\le v$.', justification: 'Croissance de la probabilité ; $\\theta\\in\\Theta_0$ ; condition (a).' },
          { text: 'Valable pour tout $v>u$ : on fait tendre $v\\downarrow u$, d’où (1).', justification: 'Passage à la limite dans une inégalité large.' },
          { text: '*Cas d’égalité.* $\\{Z\\in\\mathcal{R}_u\\}\\subset\\{\\hat\\alpha(Z)\\le u\\}$, donc $\\mathbb{P}_\\theta(\\hat\\alpha(Z)\\le u)\\ge\\mathbb{P}_\\theta(Z\\in\\mathcal{R}_u)=u$ sous (2) ; avec (1), égalité. $\\square$', justification: 'Définition de l’infimum ($u$ est un niveau qui rejette) ; hypothèse (2).' },
        ],
        pitfalls: [
          '« Sous $H_0$, la $p$-valeur suit **toujours** exactement la loi uniforme » est **faux** (question courte n°9) : seulement $\\mathbb{P}_\\theta(\\hat\\alpha\\le u)\\le u$ en général.',
          'Domination stricte quand le niveau n’est pas atteint : statistique **discrète** (sondage), ou $\\theta$ à l’intérieur d’une hypothèse composite.',
        ],
      },
      {
        kind: 'viz',
        id: 'ch4-s7-viz-loi',
        vizId: 'ch4-loi-pvaleur',
        caption: 'Au bord $\\theta=\\theta_0$ (cas continu) l’histogramme est plat ; sous $H_1$ il s’effondre vers 0 ; en discret il n’est jamais plat.',
      },
      {
        kind: 'text',
        id: 'ch4-s7-ce-que-dit',
        title: 'Ce qu’un test dit et ce qu’il ne dit pas (§2.8, p. 32)',
        text: `1. **La $p$-valeur n’est pas la probabilité que $H_0$ soit vraie.** Elle est calculée *sous* $H_0$ : probabilité portant sur l’observation, le paramètre étant fixé. « La probabilité que $H_0$ soit vraie » n’a pas de sens dans ce cours ($\\theta$ déterministe).
2. Deux conclusions qui semblent contradictoires ne le sont pas nécessairement (Ex. 2.7, aéroport) : elles répondent à des questions différentes.
3. La seule décision significative est de **rejeter $H_0$** (seule dont la probabilité d’erreur est contrôlée).
4. Nomenclature : « rejeter $H_0$ » et « **échouer à rejeter** $H_0$ », plutôt que « rejeter » et « accepter ».
5. Plus $\\alpha$ est petit, plus la conclusion « on rejette » est assurée.
6. $\\alpha$ est un niveau de tolérance au risque de première espèce : une **convention**, choisie selon les conséquences d’une erreur, pas une constante universelle.

Complément au point 3 : une conclusion « statistiquement significative » **ne dit rien de l’ampleur de l’effet** (Ex. 2.14).`,
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-14',
        title: 'Exemple 2.14 — Signification statistique et taille d’effet',
        source: 'Poly ch.4, Ex. 2.14, p. 32',
        setup: 'Modèle de l’Ex. 2.8, $\\mu_0=80$ dB, $\\sigma=10$, $H_0:\\mu\\le\\mu_0$ ; $T(Z)=\\sqrt n(\\bar X_n-\\mu_0)/\\sigma$ et $p$-valeur $1-\\Phi(T(Z))$. Comparer deux jeux de données.',
        steps: [
          { text: '$n=4$, $\\bar X_n=88$ dB : $T(Z)=2\\times8/10=1{,}6$, $p$-valeur $1-\\Phi(1{,}6)=0{,}055$ : on **échoue à rejeter** $H_0$ au niveau 5 %.', justification: 'Formule de l’Ex. 2.13 transposée.' },
          { text: '$n=10^4$, $\\bar X_n=80{,}2$ dB : $T(Z)=100\\times0{,}2/10=2$, $p$-valeur $1-\\Phi(2)=0{,}023$ : on **rejette** $H_0$ au niveau 5 %.', justification: 'Même formule.' },
        ],
        conclusion: 'Conclusion « significative » pour un dépassement de $0{,}2$ dB (inaudible), non significative pour $8$ dB. La $p$-valeur **mêle** l’ampleur de l’écart et la quantité de données. Une conclusion complète rapporte, outre la $p$-valeur, **l’estimation de l’effet et un intervalle de confiance** pour cet effet.',
      },
      {
        kind: 'example',
        id: 'ch4-ex-2-15',
        title: 'Exemple 2.15 — Étendue de la banquise arctique : IC et test de nullité de la pente',
        source: 'Poly ch.4, Ex. 2.15, p. 33–34 (lois admises : PC2 Ex. 1)',
        setup: 'Régression linéaire gaussienne $Y_i=\\beta_0+\\beta_1t_i+\\sigma\\varepsilon_i$, $\\varepsilon_i$ i.i.d. $\\mathcal{N}(0,1)$, $t_i=\\text{année}_i-1979$ ; moindres carrés $(\\hat\\beta_0,\\hat\\beta_1)$, $\\hat\\sigma^2=\\frac1{n-2}\\sum_i(Y_i-\\hat\\beta_0-\\hat\\beta_1t_i)^2$ ; $ns=\\sum_i(t_i-\\bar t)^2$.',
        steps: [
          { text: '$\\hat\\beta_1\\sim\\mathcal{N}(\\beta_1,\\sigma^2/(ns))$, $(n-2)\\hat\\sigma^2/\\sigma^2\\sim\\chi^2(n-2)$, indépendant de $(\\hat\\beta_0,\\hat\\beta_1)$.', justification: 'Admis (PC2 Ex. 1 : Cochran).' },
          { text: '$G(Z;\\beta_1):=\\sqrt{ns}(\\hat\\beta_1-\\beta_1)/\\hat\\sigma\\sim\\mathrm{t}(n-2)$ : pivot.', justification: '$\\mathcal{N}(0,1)$ divisée par la racine d’un $\\chi^2(n-2)/(n-2)$ indépendant (définition de Student).' },
          { text: 'IC : $\\mathbb{P}_\\theta\\big(\\beta_1\\in[\\hat\\beta_1\\pm\\hat\\sigma\\,\\mathrm{t}^{(n-2)}_{1-\\alpha/2}/\\sqrt{ns}]\\big)=1-\\alpha$ ; sur les données, à 95 % : $[-0{,}11;-0{,}07]$ (millions de km² par an).', justification: 'Méthode 1.1, $A_\\alpha$ symétrique.' },
          { text: 'Test de $H_0:\\beta_1=0$ : test **dual**, $\\phi_\\alpha=\\mathbb{1}_{\\{0\\notin\\text{IC}\\}}=\\mathbb{1}_{\\{|G(Z;0)|\\ge\\mathrm{t}^{(n-2)}_{1-\\alpha/2}\\}}$, de niveau $\\alpha$ ; $p$-valeur observée $1{,}76\\cdot10^{-10}$.', justification: 'Dualité §2.6.' },
        ],
        conclusion: 'Interprétation **ainsi et pas autrement** : *si la pente était nulle et si le modèle était exact*, une pente estimée aussi éloignée de zéro n’aurait qu’une chance sur dix milliards de se produire. Elle ne dit **pas** que la probabilité que la pente soit nulle vaut $10^{-10}$, ni rien de la validité du modèle (indépendance des erreurs, ici discutable). L’intervalle $[-0{,}11;-0{,}07]$ donne l’ordre de grandeur de la décroissance annuelle, ce que la $p$-valeur ne donne pas.',
      },
    ],
  },
]
