# Décisions de contenu (consignées par les agents « chapitre »)

## ch6 — Statistiques asymptotiques















1. **Notations des convergences.** Le poly note la convergence en probabilité $\xrightarrow{\mathbb{P}_{n,\theta}\text{-prob}}$ et la convergence en loi $\overset{\mathbb{P}_{n,\theta}}{\Longrightarrow}$ ; ces deux formes sont utilisées partout dans le chapitre (et enregistrées au glossaire). La flèche courte $\Rightarrow$ est tolérée dans les corrections et les options de QCM quand la probabilité sous-jacente est évidente, conformément à l'usage des corrigés de PC.
2. **Variance empirique.** $\hat\sigma_n^2$ (normalisée par $n$) et $S_n^2$ (normalisée par $n-1$) suivent le poly (Ex. 1.6) ; la PC6 Ex. 3 normalise $S_n^2$ par $n$ : signalé dans le cours (section « Notations »), sans incidence asymptotique.
3. **Convention exponentielle / Gamma.** Intensité (poly, PC6, PC7, Examen 2025) : $\mathcal{E}(\theta)$ a pour moyenne $1/\theta$, $\Gamma(2,\theta)$ pour moyenne $2/\theta$. Dans la variante type examen (Weibull), la loi de $X^c$ est écrite explicitement avec sa densité $\theta^{-1}e^{-y/\theta}$ (échelle), comme dans le CC 2022 Ex. 1, pour éviter toute ambiguïté.
4. **Preuves.** Les preuves pas à pas ne sont données que lorsque le poly les donne (Thm 1.1, 1.2, 1.4 (cas continu), 1.5 (sens direct), 1.6, 1.7, 2.1, 2.2, 2.3, Lemmes 1.1, 2.1–2.4, Cor. 1.1, Prop. 1.2, 1.3, Méthode 1.1, Déf. 1.6 (conséquence)). Portmanteau, Lévy (réciproque), Thm 1.4 (cas général), Prop. 1.1 et les compléments sont marqués « admis ». Pour le Thm 1.8 (méthode-δ vectorielle), le poly donne une esquisse (p. 26 et 43) : elle est reproduite en trois étapes et signalée comme esquisse.
5. **Résultats « complément d'extraction ».** Les valeurs non écrites dans le poly mais calculées dans les extractions (cas gaussien $\gamma=2\sigma^4$ ; calcul de $\phi_2'(2/\theta^2)$ dans PC6 Ex. 1 ; applications numériques des IC) sont utilisées dans les exercices et reprises telles quelles ; elles ont été revérifiées à la main.
6. **Examen 2025 (sans corrigé officiel).** Les corrections des items marqués « Examen 2025 » suivent la solution proposée dans `DIAGNOSTIC.md` §2.A (notamment $C=\pi/2$ pour la médiane, $\Sigma=\mathrm{diag}(\sigma^2,2\sigma^4)$, $v_{Mom}=\sigma^2+\frac23\sigma^6+\dots$). Le DL de $v_{Mom}$ a été recalculé : les termes en $\sigma^2$ donnent $4-4+1=1$, ceux en $\sigma^4$ s'annulent ($2-4+2=0$).
7. **CC 2022 Ex. 2 Q7.** La loi de $nT_{1,n}$ est exacte ($\sigma^2\chi^2(1)$ pour tout $n$ dans le modèle gaussien) ; la correction le signale et rappelle qu'en général on invoquerait le Thm 1.4.
8. **PC6 Ex. 6 (Hodges) et §4.5** sont traités comme hors programme (bloc texte dans la section 8 et un exercice « trouver l'erreur » tagué `hors-programme`), conformément au poly (« contenus non exigibles »).
9. **Variante « modèle transformé » (annale `ch6-annale-variante-weibull`).** Créée dans le style de l'Examen 2025 Ex. 2 (DIAGNOSTIC §9) ; les moments utilisés ($\mathbb{E}[(Y-\theta)^4]=9\theta^4$ pour une exponentielle d'échelle $\theta$, densité en la médiane $1/(2\theta)$) ont été vérifiés.
10. **Titres sans LaTeX.** Les champs `title` (viz, exercices, blocs, sections), `label` (fiche, barème) sont rendus en texte brut par le socle : les formules y ont été remplacées par du texte ou des caractères Unicode (θ, μ², X̄ₙ) ; le LaTeX est réservé aux champs `Rich`.

## ch1 — Modèles statistiques
















1. **Double numérotation du poly.** Les blocs reprennent la numérotation de l'extraction : encadrés « N.M » (Déf. 1.1, Thm 1.1–1.3, Prop. 2.1–2.9, Lemme 1.1, Lemme 2.1, Cor. 2.1, Thm 2.1) et définitions non encadrées numérotées en continu (Déf. 1 : dominé, Déf. 2 : identifiabilité, Déf. 3 : statistique, Déf. 4, Déf. 5, Déf. 6, Déf. 7, Déf. 8–14). La « Formule (1) » (densité produit) est présentée comme un bloc `proposition` étiqueté « Formule (1) ».
2. **Conventions exponentielle / Gamma.** Intensité (poly, PC1, Examen 2025) partout dans le cours ; les énoncés en convention d'**échelle** (CC 2022 Ex. 1 et 3, PC3 Ex. 5) sont reproduits tels quels avec la densité écrite explicitement et un rappel « convention d'échelle » dans l'exercice.
3. **Statistiques d'ordre.** La densité jointe des statistiques d'ordre, la loi de $X_{(k)}$, la loi Beta de $F(X_{(k)})$ et les espacements exponentiels ne figurent pas dans le cours du poly (seulement Ex. 1.8 et Ex. 1.13) ; ils sont intégrés en section 9 (scope programme) car ils tombent aux annales (CC 2022 Ex. 3, Examen 2025 Ex. 3 Q6), sourcés « PC3 Ex. 5 » et « CC 2022 Ex. 3 ».
4. **Preuves.** Preuves pas à pas données pour : Lemme 1.1, Déf. 7, Ex. 1.6, Ex. 1.10, Remarque (mesurabilité des statistiques d'ordre), Thm 1.1 (Cochran, version générale du poly), Thm 1.3 (Gosset), Prop. 2.1, 2.3, 2.4, 2.5, 2.6, 2.7, 2.8, 2.9, Lemme 2.1, Cor. 2.1, Déf. 8 (f.c. et moments), fonction Gamma, densité jointe des statistiques d'ordre. Admis / cités : Thm 1.2 (cas particulier), Thm 2.1 (Radon–Nikodym), Déf. 12 (densité de Student), Ex. 1.12–1.13 (esquisses marquées « extracteur »), existence de la mesure produit.
5. **Réponses randomisées.** La minoration $\mathrm{Var}(\mathrm{RR}_1)\ge q(1-q)$ est justifiée par l'encadrement de $p=\theta q+(1-\theta)(1-q)$ entre $\min(q,1-q)$ et $\max(q,1-q)$ (justification de l'extracteur, le poly énonce l'inégalité sans détail).
6. **Examen 2025 (sans corrigé officiel).** La correction de l'annale `ch1-annale-2025-ex2-q1-q5` suit DIAGNOSTIC §2.A (biais $-\sigma^2/n$, variance $2(n-1)\sigma^4/n^2$, IC $[n\widehat{\sigma^2}_{ML}/\chi^2_{1-\alpha/2}(n-1),\,n\widehat{\sigma^2}_{ML}/\chi^2_{\alpha/2}(n-1)]$) ; Ex. 3 Q6 est traité en QCM (loi Beta de $F(X_{(k)})$).
7. **CC 2022 Ex. 4 Q1 (EMV)** relève du ch.2 et n'est pas repris ; seules Q2, Q3, Q7 (vecteurs gaussiens, Cochran) figurent dans l'annale `ch1-annale-cc2022-gosset-cochran`, avec Ex. 2 Q1.
8. **QCM « mesure dominante ».** L'option « $\mathcal{B}\mathrm{er}(1/2)$ / $\mathcal{N}(0,1)$ » est mathématiquement une mesure dominante valable ; elle est marquée fausse avec une explication qui le dit, la question demandant les mesures **usuelles** (comptage, Lebesgue) de la question courte 7 du poly.
9. **Titres de sections.** Les titres commençant par « N. » sont transformés en liste ordonnée par `richInline` (voir DEMANDES_SOCLE) : les sections de ch1 sont titrées « N · … » pour contourner le problème.
10. **Hors programme.** Section 11 (compléments §4 du poly) en `scope: 'hors-programme'`, blocs concis ; la Prop. 4.1 (biais de $1/\bar X_n$) y est rattachée bien que l'application p. 31 des Outils l'évoque.

## ch2 — Estimation ponctuelle
















1. **Numérotation et sources.** Les éléments encadrés sont cités « Poly ch.2, Déf./Ex./Prop./Méthode N.M, p. X » (numérotation de l'extraction `ch2.md`) ; les outils en « (Outils) » (Prop. 2.1, Déf. 2.1–2.2, Thm 2.1–2.2, Lemmes 2.1–2.3) ; les compléments Ex. 4.1–4.7 et Thm 4.1 en `scope: 'hors-programme'`. Les homonymies de renvois (« Théorème 1.1 » = Cochran du ch.1 dans le fascicule d'exercices ; « Lemme 2.1 du ch.1 ») sont signalées dans le cours.
2. **Notations.** Vraisemblance $\mathrm{L}_n$ (L droit) et log-vraisemblance **normalisée** $\ell_n=\frac1n\log\mathrm{L}_n$ comme dans le poly ; les corrigés de PC/annales qui écrivent $\log\mathrm{L}_n$ sans $\frac1n$ sont signalés (même argmax). Trois lettres distinguées partout : $\vartheta$ (variable libre), $\theta$ (valeur de calcul), $\theta^\star$ (vraie valeur, §1.4). Exponentielle et Gamma en **intensité**. Statistiques d'ordre $X_{k:n}$ ; les variantes `X_{n:n}`, `X_{1:n}` étant déjà au glossaire via ch6 (clé `Xordre`), ch2 enregistre une clé distincte `Xkn` pour `X_{k:n}`, `X_{m:n}`, `X_{m+1:n}`.
3. **Ex. 1.5 (application numérique).** L'extraction écrit « $\hat b_n\simeq0{,}1+0{,}27\simeq0{,}62$ » ; la valeur $\sqrt{3V_n}=\sqrt{0{,}27}\approx0{,}52$ est la bonne et donne bien $0{,}62$ : le cours et l'exercice numérique écrivent $0{,}1+\sqrt{0{,}27}$.
4. **Examen 2025 (sans corrigé officiel).** L'annale `ch2-annale-2025-lognormale` reformule les Q1, Q2 et Q9(a) de l'Ex. 2 (partie « estimation ponctuelle » du problème) avec la correction proposée dans `DIAGNOSTIC.md` §2.A, plus une question de comparaison EMV / moments ; les QCM de l'Ex. 4 (Q1, Q2, Q9, Q10) sont repris tels quels comme QCM (réponses du DIAGNOSTIC).
5. **CC 2022 Ex. 4 Q1.** Le corrigé officiel laisse la question vide : la correction donnée (`ch2-etape-regression-emv`, `ch2-annale-regression`) suit la rédaction de PC2 Ex. 1 Q2 (maximisation en deux temps) avec les notations $(\beta_0,\beta_1)$ du CC dans l'exercice « étape suivante » et $(\beta_1,\beta_2)$ de la PC dans l'annale.
6. **PC2 Ex. 2 (mélange).** Coquille de l'énoncé (« $1$ si $x\ge1$ » lue $x\ge b$) corrigée ; la non-existence de l'EMV dans l'ouvert $]0,1[$ quand $N_a/n\le a/b$ et le prolongement du modèle à $[0,1]$ suivent le complément du poly (p. 42) plutôt que le corrigé de la PC (« le maximum est atteint en $\theta=0$ »). Les biais sont ceux du corrigé (non seuillés sans biais, seuillés biaisés).
7. **PC2 Ex. 5 (AR(1)).** Dénominateur $\sum_{k=1}^nX_{k-1}^2$ (correction du poly), le corrigé 2025 de la PC étant signalé comme coquille.
8. **PC2 Ex. 3.** La notation $\varphi$ (énoncé) est retenue pour la famille exponentielle générale (le corrigé écrit $\phi$) ; coquilles du corrigé (facteur $h$ dupliqué, $|g|$ pour $h$) non reproduites.
9. **Preuves.** Preuves pas à pas données lorsque le poly les donne : Prop. 1.1, Prop. 1.2, Thm 1.1, Prop. 1.3, Prop. 2.1, Thm 2.1 (cas carré intégrable, cas général admis), Lemmes 2.1–2.3, Thm 2.2, Déf. 1.5 (conséquence). Les exemples du poly (1.1 à 1.15) et les trois exercices de PC sont traités en `ExampleBlock` avec étapes justifiées.
10. **Monte-Carlo.** Les six vérifications utilisent les formules exactes du poly/PC (biais et EQM de $1/\bar X_n$, $\mathbb{E}[X_{n:n}]$, $\chi^2(n-2)$, absence de biais du mélange non seuillé, $\mathbb{E}[\ell_n(\vartheta)]=M_{\theta^\star}(\vartheta)$) ; pour l'uniforme on teste la différence $\mathbb{E}[2\bar X_n]-\mathbb{E}[X_{n:n}]=\theta/(n+1)$ (variance MC plus faible).
11. **Section 10 (compléments).** `role: 'complements'` et `scope: 'hors-programme'` pour toute la section ; contenu résumé (pas d'exercice dessus), conformément au poly (« non exigibles »).
## ch3 — Bases de la théorie de la décision














1. **Numérotation et sources.** Éléments encadrés cités « Poly ch.3, Déf./Prop./Thm/Cor./Ex. N.M, p. X » (numérotation de `ch3.md`) ; outils en « Outils, Prop. 2.1–2.3, Lemme 2.1 » ; compléments (Déf. 4.1, Prop. 4.1, Thm 4.1, rétrécissement, équivariance) en section 10 `scope: 'hors-programme'`. Les remarques non numérotées (§1.5 ordre partiel, §1.6 restriction de la classe, §1.7 calcul heuristique) sont des blocs `definition`/`remarque` étiquetés « Définition (§1.5, non numérotée) », « Remarque (§1.7) ».
2. **Notations.** Information de Fisher en lettre ajourée $\mathbb{I}(\theta)$ (poly) partout dans le chapitre, et non $I(\theta)$ du glossaire de base ; clés de glossaire distinctes `IFisherPoly`, `IFisherUne`, `IFisherN`. Hessienne $\mathrm{H}_\ell$ (H droit), risque $R(\theta,T)$ (paramètre puis estimateur, y compris pour PC3 Ex. 4 dont le corrigé inverse l’ordre), statistiques d’ordre $X_{k:n}$. Notation de transposée $^\top$ (poly) et non $^T$ (feuille de PC). Densité de base de PC3 Ex. 4 notée $q$ (feuille de PC), $p_\theta$ pour la densité translatée.
3. **PC3 Ex. 1 Q2.** Le poly §1.12 affirme qu’aucun estimateur sans biais de la forme $n^{-1}\sum T(X_i)$ n’existe ; le corrigé en construit un ($T=g+xg'$) : on suit le corrigé (réponse « oui ») et l’incohérence est signalée dans le cours.
4. **PC3 Ex. 5 Q5.** Formule d’inversion $a_{j,n}=(n-j+1)m_{j,n}-(n-j)m_{j+1,n}$ (correction de l’extracteur) ; la formule erronée du poly n’est pas reproduite (signalée dans la fiche).
5. **PC3 Ex. 3 Q6.** On travaille avec $0<c<n$ (corrigé) et non $0<c\le n$ (énoncé). Les valeurs numériques $\sup_c\tau_n(c)\approx0{,}648$ et le rapport $\approx1{,}54$ viennent des résultats numériques de l’extraction (non dans le poly).
6. **Examen 2025 Ex. 1 Q1 (sans corrigé officiel).** Correction selon DIAGNOSTIC §2.A ; l’annale `ch3-annale-2025-ex1` ajoute deux prolongements marqués « variante » dans l’énoncé (biais de l’EMV $1/\bar X_n$ ; estimateur sans biais $\frac{n-1}{n\bar X_n}$ de variance $\theta^2/(n-2)$, non efficace), calculs de l’auteur vérifiés par Monte-Carlo.
7. **CC 2022 Ex. 2 Q3–Q4.** Le corrigé officiel omet le risque de $T_{2,n}$ et la Q4 ; on suit le complément du DIAGNOSTIC §2.B ($R(T_1)-R(T_2)=\frac{\sigma^4}{n^2}\frac{n-3}{n-1}$, inadmissibilité pour $n\ge4$).
8. **Examen 2025 Ex. 4 Q11** (réponse courte) traitée en QCM (efficacité / BLUE de l’estimateur des moindres carrés), réponse du DIAGNOSTIC.
9. **Ex. 1.6 (pertes)** rendu comme bloc `theorem` de type `exemple` (pas d’étapes) ; points d’histoire (Fisher, Rao) intégrés en une phrase dans l’intuition de la Déf. 1.8 et du Thm 1.1.
10. **Visualisations hors poly.** L’estimateur de Laplace $(n\bar X_n+1)/(n+2)$ (viz admissibilité, Bernoulli) et la famille $c\,S_n^2$ (optimum $c=\frac{n-1}{n+1}$) ne sont pas dans le poly ; ils sont signalés comme variantes dans le texte de la visualisation. La « borne formelle » $\theta^2/n$ dans l’uniforme (viz Cramér-Rao) est explicitement marquée comme non applicable.
## ch7 — Théorie asymptotique des M- et Z-estimateurs












1. **Notations.** Fonctions limites $\mathsf{M}_{\theta^\star}$, $\mathsf{W}_{\theta^\star}$ en sans-serif comme le poly ; l'équation d'estimation limite est écrite $\Psi_{\theta^\star}$ (Ψ ordinaire) pour la compatibilité KaTeX (le poly la met en sans-serif) ; information de Fisher en lettre ajourée $\mathbb{I}$ (convention du ch.7, distincte du $I(\theta)$ du glossaire de base). Glossaire ch7 enregistré sous des clés `ch7-*` sans redéfinir les variantes LaTeX déjà présentes (`\theta^\star`, `\psi(\theta,x)`, `\hat\theta_n^{\mathrm{MV}}` restent celles de ch2/socle).
2. **Homonymies de numérotation.** Toute citation précise le chapitre (« TCL = Poly ch.6, Thm 1.6 », « Slutsky = ch.6, Lemme 1.1 », « méthode-δ = ch.6, Thm 1.7 », « Markov = ch.6, Lemme 2.1 ») ; un encart du §1 les liste.
3. **Coquille signalée, non reproduite comme formule de référence** : la statistique de Student du §1.2 (« $/S_n^2$ ») ; le cours renvoie à $/S_n$.
4. **Examen 2025 Ex. 2 Q7.** Le corrigé du ch.6 (TCL multivarié + Slutsky) reste la référence ; l'annale du ch.7 (`ch7-annale-2025`) reformule Q7 par l'information de Fisher et le Thm 1.6 en version vectorielle (compléments §4.4, hors programme), présenté comme vérification de cohérence $\Sigma=\mathbb{I}^{-1}$. En Q10, l'argument « $\hat\mu_{Mom}$ ne peut pas faire mieux que l'EMV » étend le Thm 1.7 (énoncé scalaire) au cas d'un Z-estimateur d'un paramètre de dimension 2 : signalé comme lecture du Thm 4.4 / Déf. 4.1, la comparaison numérique des variances suffisant de toute façon.
5. **PC7 Ex. 1 (Pitman, contiguïté, Lindeberg-Feller)** : hors du poly actuel ; résumé en section 9 (hors programme, pentes $2q(0)$ et $1/\sigma_q$, rapport $\sqrt{2/\pi}$), sans exercice dédié. PC7 Ex. 2–5 sont exploités en exercices et annales (`origin: 'pc'`).
6. **Médiane.** Toujours présentée comme non couverte par le Thm 1.4 ; le calcul formel $\operatorname{signe}'=2\delta_0$ du corrigé PC7 (Q6) est repris en le qualifiant de formel.
7. **Numérotation PC7 Ex. 2.** On suit l'énoncé (Q1–Q5) et non le corrigé (décalé) ; la consistance (Q3, non traitée séparément par le corrigé) est rédigée par LGN + continuité.
8. **Valeurs numériques non présentes dans le corrigé officiel** (IC log-normale $\bar T_n=2$, $\mathbb{P}(\hat\theta_n=0)=\Phi(-1)$, EQM Gamma $n=5$, $V[\gamma_k]$ contaminé) : reprises de l'extraction (marquées « Extracteur ») et vérifiées numériquement (quadrature dans `viz/common.ts`, Monte-Carlo).
9. **Ex. 1.4 (Huber).** La forme lisse « pseudo-Huber » du poly est conservée sous le nom « perte de Huber » ; l'estimateur de Huber de la PC7 ($\gamma_k$ tronquée) est distingué dans le texte.
10. **Visualisations.** Six vizs ; l'outil partagé `viz/common.ts` (quadrature, lois de translation, $V[\gamma_k]$, EMV de Cauchy par score de Fisher itéré depuis la médiane) est aussi utilisé par `montecarlo.ts`. La viz « Z-estimateur » apparaît deux fois dans le cours (§2 et §5, blocs distincts).
## ch5 — Optimalité en théorie des tests











1. **Numérotation et sources.** Reprise de la numérotation de l'extraction (Déf. 1.1–1.5, Cadre 1.1, Th. 1.1–1.4, Méthodes 1.1–1.3, Prop. 1.1, Ex. 1.1–1.6, Outils Prop. 2.1 / Lemme 2.1, compléments Déf. 4.1–4.3, Th. 4.1, Prop. 4.1, Ex. 4.1–4.5). Les « Exercices 1–7 » du poly sont cités avec leur équivalent PC5 (énoncé PC5 : Ex. 1 = Exo 1, Ex. 2 = Exo 5, Ex. 3 = Exo 4, Ex. 4 = Exo 6, Ex. 5 = Exo 2, Ex. 6 = Exo 3), en suivant la numérotation de l'**énoncé** de la PC (le corrigé est décalé).
2. **Preuve du Th. 1.3.** Esquissée dans le cours (p. 20) et complète dans les compléments (p. 47) : le théorème étant au programme, la preuve complète en trois temps est donnée dans le bloc du Th. 1.3 (programme), avec la source « Compléments p. 47 ».
3. **Compléments et PC5.** Les compléments du poly (randomisation, Th. 4.1, sans biais/U.M.P.U., rapport généralisé, Ex. 4.x) sont en `scope: 'hors-programme'` (sections 8 et 9), bien que mobilisés par les PC5 Ex. 3, 4, 5, 6 ; les exercices qui en dépendent sont tagués `hors-programme`. Exception : l'Exercice 5 / PC5 Ex. 2 (pas d'U.P.P. bilatéral, test sans biais) reste dans la section 5 (programme), la notion « sans biais » étant définie dans l'énoncé même de l'exercice.
4. **Rapport de vraisemblance généralisé et Examen 2025 Ex. 4 Q4/Q12.** Le DIAGNOSTIC rattache ces QCM DM/EN (test de Fisher, égalité des variances) au ch.5 compléments ; ils sont traités en section 7 (« À l'examen ») et en un QCM `origin: 'annale'` tagué `hors-programme`, sans en faire un contenu exigible.
5. **Coquilles des corrigés PC5** (relevées dans l'extraction) : seuil $c=e^{n(\theta_1-\theta_0)}$ (et non $e^{-n(\theta_1-\theta_0)}$) en Ex. 3 Q4 ; condition de taille du test géométrique $\alpha=\gamma\mathbb{P}(T\le c)+(1-\gamma)\mathbb{P}(T<c)$ en Ex. 6 Q4 ; seuil $\sqrt n\,q_{1-\alpha}$ sur la somme en Ex. 2 Q1. Elles sont corrigées dans le cours et exploitées comme exercices « trouver l'erreur ».
6. **Examen 2025 Ex. 1 Q2–Q3 (sans corrigé officiel).** La correction suit la solution proposée dans DIAGNOSTIC §2.A (rapport décroissant en $\sum X_i$, $d_\alpha=\chi^2_\alpha(2n)/(2\theta_0)$, $p$-valeur $F_{\chi^2(2n)}(2\theta_0\sum X_i)$), recontrôlée à la main.
7. **CC 2022 Ex. 1.** Convention d'**échelle** du sujet conservée dans l'annale (densité écrite, $\mathrm{Gqf}_n$, $\mathrm{Gcdf}_n$) ; le cours rappelle que c'est le cas $c$ quelconque de l'Exercice 1 du poly.
8. **Valeurs numériques recalculées** (scipy) : PC4 Ex. 4 randomisé $\gamma\approx0{,}036$ ; Ex. 4.1 $\gamma\approx0{,}506$ (« $\approx0{,}5$ » dans le poly) ; Ex. 4.2 $d=526$, $\gamma=0{,}4832$ ; puissance PC5 Ex. 1 en $\theta=2$ : $0{,}735$ ; $\phi^{\star,3}$ en $\theta=0{,}5$ ($n=10$) : $0{,}353$ ; Ex. 1.3 ($n=5$, $m=1$) : $0{,}723$.
9. **Variante d'annale.** « Loi de Rayleigh » (`origin: 'variante'`) créée dans le style CC 2022 Ex. 1 / Examen 2025 Ex. 1 ; résultats vérifiés ($T/\theta\sim\chi^2(2n)$, même puissance $0{,}735$ que PC5 Ex. 1).
10. **Glossaire.** Le glossaire étant global, les symboles propres au chapitre ont été enregistrés avec des formes précises ($\beta_\phi(\theta)$, $\overline{\alpha}(\phi)$, $\mathcal{K}_\alpha(\Theta_0)$, $r(z)$, $c_\alpha$, $d_\alpha$, $\phi^\star$, $\gamma_\alpha$…) ; le coefficient de randomisation « $\gamma$ » nu (déjà enregistré par ch6 comme variance limite) est écrit $\gamma_\alpha$ ou `{\gamma}` pour éviter une infobulle erronée ; les définitions de $T(Z)$ et $\nu$ ont été rédigées de façon compatible avec leur usage dans ch1–ch2.
11. **Titres Plotly.** Les titres de figures et d'axes sont passés sous la forme `{ text: … }` (Plotly 4 ignore les titres en chaîne simple) ; voir DEMANDES_SOCLE.
## ch8 — Introduction à l’apprentissage statistique











1. **Numérotation et sources.** Reprise de l’extraction `ch8.md` : encadrés « Cadre 1.1–1.4 », « Méthode 1.1 », Déf. 1.1–1.5, Prop. 1.1–1.5, Th. 1.1–1.2, formules (4)–(13) ; Outils cités « Outils, Prop. 2.x » ; le « Théorème et définition 2.1 » (espérance conditionnelle $L^1$) est distingué du « Théorème 2.1 » ($\mathrm{L}^2$ hilbertien) malgré la collision de numérotation du poly. Les remarques non numérotées sont citées par page (« Remarque p. 16 »).
2. **Notations.** Attributs en gras $\mathbf{X}$, $\mathbf{x}$ dans le cours (poly) ; les énoncés repris de la PC8 et des annales gardent $X$, $x$ non gras, comme leurs sources. Codage $\{-1,1\}$ partout ; les coquilles « 0 » pour « −1 » de la PC8 (labels, $\delta_{\{0\}}$, $F_0$, $\mathbb{1}_{\{Y_k=0\}}$) sont corrigées silencieusement. Notation $\pi_1$, $\pi_{-1}$ conservée dans les exercices tirés de PC8 Ex. 3, $p$ dans le cours.
3. **Glossaire.** Les variantes LaTeX nues `\eta` et `\mathbf{X}` ne sont **pas** enregistrées : le ch.2 les utilise pour le paramètre naturel d’une famille exponentielle et une matrice de plan ; seules des formes composées ($\eta(\mathbf{x})$, $\eta(X)$, $\mathbf{x}$, $(\mathbf{X},Y)$…) reçoivent l’infobulle « fonction de régression / attributs ».
4. **Lemme 2.2 et majoration (13).** Le Lemme 2.2 (Outils) est placé en section 4, juste avant le Th. 1.2 dont il est l’outil ; la majoration (13) (= Compléments Prop. 4.2 = PC8 Ex. 7) est présentée en section 7 comme bloc **au programme** (scope programme), car elle sert à la Prop. 1.5 et tombe à l’examen (Examen 2025 Ex. 3 Q3), bien que sa preuve soit placée dans les compléments du poly.
5. **Coquilles du corrigé PC8 non reproduites** : $g$ pour $g^\star$ et « $\le$ » pour « $<$ » (Ex. 2 Q1), cas permutés (Ex. 2 Q4), $\ln(\pi/2)$ pour $\ln(2\pi)$ et erreurs de signe de la Solution 2 (Ex. 3 Q3–Q4), $\hat\mu\hat\mu^\top$ au numérateur (Ex. 3 Q5), « $\eta=\mathbb{E}[Y\mid X]$ » (Ex. 6 Q3, transformé en vrai-faux), « $R(g)$ » pour « $R(g)-R(g^\star_c)$ » (Ex. 1 Sol. 2). Ex. 3 Q4 : la covariance est obtenue par la « maximisation en deux temps » (Solution 1) ; la Solution 2 (calcul différentiel matriciel) n’est pas reproduite.
6. **Annales sans corrigé officiel.** Examen 2025 Ex. 3 Q1–Q5 et CC 2022 Ex. 5 : corrections rédigées d’après DIAGNOSTIC §2.A/§2.B et la preuve du poly. Q6–Q9 de l’Examen 2025 (loi Beta, biais-variance des $k$-PPV, fléau de la dimension) relèvent du ch.1/ch.9 et ne sont que mentionnées en section 10. Barèmes : ceux du DIAGNOSTIC pour les annales, estimés pour les PC.
7. **k plus proches voisins.** Le poly ne fait que citer les $k$-PPV parmi les méthodes modélisant $Y\mid\mathbf{X}$ (p. 18) ; ils sont traités (texte, viz, QCM) car ils tombent à l’Examen 2025 Ex. 3 Q4–Q5, avec la source correspondante.
8. **Exemple « signal + bruit » et Monte-Carlo de Pythagore** : variante explicitement marquée (`Variante (illustration du Th. 1.1…)`), non présente telle quelle dans le poly.
9. **Visualisations.** Six viz : Bayes 1D (préréglages Ex. 1.6 et PC8 Ex. 5 ; les uniformes sont paramétrées par moyenne et écart-type), excès de risque / majoration (13), Pythagore (Th. 1.1), LDA/QDA/logistique 2D (scénarios inspirés de la Figure 1 de PC8 ; logistique avec ordonnée à l’origine et pénalité ridge $10^{-3}$ pour éviter la divergence en cas de séparabilité), $k$-PPV 2D (deux gaussiennes ou « XOR »), risque empirique vs risque réel quand $n$ augmente (LDA/QDA 1D, risque conditionnel calculé exactement par $\Phi$, modèle bien / mal spécifié, règle « par cœur »).
10. **Compléments** (§4 du poly) en section 11, `scope: 'hors-programme'`, résumés ; aucun exercice ne porte sur eux sauf le Monte-Carlo de l’Ex. 4.1.
## ch9 — Approche discriminative et minimisation du risque empirique










1. **Numérotation et collisions.** Les éléments sont cités avec la numérotation de l'extraction `ch9.md` (Déf. 1.1–1.3, Prop. 1.1–1.3, Th. 1.1–1.8, Lemme 1.1, Méthodes 1.1–1.2 ; Outils Prop. 2.1–2.2, Déf. 2.1, Th. 2.1, Cor. 2.1 ; Compléments Déf. 4.1–4.2, Th. 4.1–4.2, Lemmes 4.1–4.2, Cor. 4.1). Les renvois du poly à d'autres chapitres de même numéro (Th. 1.2 du ch.8, LGN Th. 2.1 du ch.7, TCL Th. 1.6 du ch.6, Prop. 2.5 du ch.8…) sont toujours écrits « du ch.N ». Éq. (1)–(4) affichées avec `\qquad(1)` (pas de `\tag`).
2. **Notations.** Celles du poly : $\widehat{\mathrm R}_n$ (R droit), $\hat g^*_{n,\mathcal C}$ (MRE), $g^*_{\mathcal C}$ (oracle), étoile pleine pour le bayésien, $\mathcal D_n$, $\mathbf X$ / $\mathsf X$, labels $\{-1,1\}$, $\operatorname{signe}(0)=-1$. Les exercices tirés de la PC9 gardent les notations de la PC ($R_n(g)$, $D_n$ italique, labels $\{0,1\}$, $g^\star_{\mathcal C}$), signalées dans le cours et la fiche.
3. **Indicatrice.** Le poly écrit l'indicatrice avec un 1 ajouré ; en KaTeX, `\mathbb{1}` s'affiche comme un « 1 » ordinaire (illisible : « 21_{…} − 1 »). Toutes les indicatrices du ch.9 utilisent `\mathbf{1}` (comme la macro `\ind` du socle).
4. **Tableaux.** Le Markdown léger ne gère pas les tableaux : les tableaux du poly (p. 10, p. 12, p. 23) sont rendus en listes (voir DEMANDES_SOCLE).
5. **No free lunch.** La preuve (Compléments §4.1, hors programme) est donnée pas à pas dans le bloc du Th. 1.1 (programme), car c'est l'exercice 6 de la PC9 ; l'intuition le signale. Elle suit la rédaction rigoureuse du poly (tirage uniforme de l'étiquetage) plutôt que celle, plus informelle, du corrigé de la PC.
6. **Examen 2025 Ex. 3 Q8–Q9** (sans corrigé officiel) : correction de DIAGNOSTIC §2.A, avec les résultats de Q3 et Q7 admis dans l'énoncé de l'annale. Les k plus proches voisins relèvent du ch.8 pour leur définition ; Q8–Q9 (compromis, choix de $k$, fléau de la dimension) sont rattachées au ch.9 comme le fait DIAGNOSTIC §7.
7. **PC9 Ex. 4 Q2(b).** Le corrigé obtient $\sqrt{\log M/(2n)}$ (déviation unilatérale) ; le poly (Th. 1.8) donne $\sqrt{\log(2|\mathcal C|)/(2n)}$ : les deux sont mentionnés, l'étape-suivante utilise la forme du poly. Q4(b) : la borne finale du corrigé ($2\sqrt{A/(2n)}$, coquille du facteur 2) n'est pas reproduite ; on donne la borne du Th. 1.8 avec $|\mathcal C|=2^K$.
8. **Visualisations adaptées au poly.** Le compromis approximation / estimation utilise le classifieur par histogramme (Compléments §4.3) car il permet de calculer exactement l'erreur d'approximation ; le « choix de $k$ » des $k$-ppv est présenté comme une application de la Méthode 1.2 (validation) ; le fléau de la dimension combine la distance au plus proche voisin, la vitesse $n^{-1/(d+2)}$ (Examen 2025 Q9) et la borne de l'histogramme à $q^d$ cellules. Deux visualisations supplémentaires (biais optimiste / Th. 1.8 sur une classe finie emboîtée ; no free lunch) illustrent la Prop. 1.1 et le Th. 1.1.
9. **Annale « classifieur par histogramme ».** Exercice de type examen blanc (DIAGNOSTIC §9 point 3), marqué `origin: 'variante'`, construit sur les Compléments §4.3 et les Th. 1.2, 1.5, 1.6, 1.8 (seuls résultats du programme utilisés).
10. **Monte-Carlo.** Pour les inégalités (Hoeffding, Prop. 1.1 + Th. 1.8, Pisier), `observed` = violation positive et `expected` = 0 ; le lemme de Hoeffding pour une Bernoulli centrée est vérifié de façon exacte sur une grille (pas d'aléa).
## ch4 — Régions de confiance et tests







1. **Numérotation et sources.** Le cours du ch.4 n’a pas de théorème numéroté : les résultats démontrés sont les Prop. 1.1, 2.1, 2.2 (preuves pas à pas), les Méthodes 1.1 et 2.1 sont des blocs `methode`, les outils sont cités « Outils, Déf. 3.1 / Prop. 3.1 / Thm 3.1 / Cor. 3.1 / Lemme 3.1 / Déf. 3.2 », les remarques non numérotées par leur page (« Qui est aléatoire ? » p. 9, « Le choix de $A_\alpha$ » p. 12, §2.4, §2.6, §2.8). Le théorème de Gosset est présenté comme « Rappel (ch.1, Thm 1.3) » avec une preuve par Cochran reprise de PC4 Ex. 2 Q4–Q5.
2. **Notations.** Celles du poly : $\phi$ droit pour les tests, taille $\overline{\alpha}(\phi)$, $p$-valeur $\hat\alpha(Z)$, quantiles $z_\beta$ (jamais $\Phi^{-1}$), $\mathrm{t}^{(k)}_\beta$, $\chi^2_\beta(k)$, $\mathrm{f}_{1-\alpha}(k_1,k_2)$, régions calligraphiques. La loi du pivot est écrite `\mathbb Q` (avec une espace) : `\mathbb{Q}` est déjà au glossaire (clé `modeleQ` de ch1, « loi d’une observation ») ; la variante avec espace, normalisée différemment, porte l’infobulle propre au ch.4 sans écraser celle de ch1. Même astuce `\mathrm{Gamma}(p,\lambda)\,` dans les énoncés du CC 2022 (convention d’échelle) pour ne pas afficher l’infobulle de ch1 (convention d’intensité).
3. **Conventions exponentielle / Gamma.** Cours : intensité (poly). PC4 Ex. 1 : modèle $\mathcal{E}(1/\theta)$, $\theta$ espérance (rappelé dans chaque item). CC 2022 Ex. 1 et 3 : convention d’échelle reproduite telle quelle, densité réécrite dans l’énoncé. Le poly écrit « Gamma de paramètres (1, 2) » (échelle) dans le corrigé de l’Ex. 1 : on écrit $\Gamma(1,1/2)$ (forme, taux), conclusion $\chi^2(2)$ identique.
4. **Coquilles corrigées (signalées dans les exercices).** PC4 Ex. 1 Q3(c) : borne $56{,}2/9{,}59\approx5{,}86$ (le corrigé de PC écrit 5,79 ; le poly a 5,86). PC4 Ex. 5 Q5 : la $p$-valeur bilatérale est $\approx0{,}99$, la valeur $0{,}4960$ du corrigé et du poly est celle du test unilatéral (exercice « trouver l’erreur »). PC4 Ex. 7 Q3 : « par indépendance des $R_i$ » remplacé par l’argument d’échangeabilité. CC 2022 Ex. 3 Q9 : facteur $1/(n-1)$ rétabli. PC4 Ex. 4 : l’inégalité stricte imposée par l’énoncé est conservée ($p$-valeur $\mathbb{P}(\mathrm{Poi}(10)\ge T)$).
5. **PC4 Ex. 6 (choix de $H_0$ du point de vue des plaignants).** L’énoncé suggère $H_0:\theta\ge\theta_0$ mais le corrigé du poly garde $H_0:\theta\le\theta_0$ ; le site présente la version du corrigé ($p$-valeur 0,0172) et signale l’ambiguïté en une phrase, sans enseigner le calcul alternatif (absent du poly).
6. **Examen 2025 (sans corrigé officiel).** L’annale `ch4-annale-2025-ex1-pvaleur` suit la correction proposée du DIAGNOSTIC §2.A ; la Q2 (Neyman-Pearson, ch.5) est **admise** et remplacée par deux questions propres au ch.4 (loi $\chi^2(2n)$ du pivot, monotonie de la puissance et taille pour $H_0$ composite) ; ajout d’une Q3(d) (loi uniforme de la $p$-valeur, Prop. 2.2).
7. **CC 2022 Ex. 3 Q9.** Choix explicite des constantes ajouté (non demandé par le corrigé) : la fonction de survie de $F_n(a)$ s’obtient en intégrant la densité donnée (Q8), d’où l’IC le plus court $[X_{1:n}-(\alpha^{-1/(n-1)}-1)T_1/n,\ X_{1:n}]$ ; justification par l’analogie avec PC4 Ex. 3 (densité monotone).
8. **CC 2022 Ex. 4 (Fieller).** Quantile noté $\mathrm{f}_{1-\alpha}(1,n-2)$ (notation du poly) au lieu de $F^\alpha_{1,n-2}$ du sujet ; Q3–Q7 admises. Ajout de l’équivalence « intervalle borné ⇔ le test de Student de $\beta_1=0$ rejette » (dualité), déjà dans le DIAGNOSTIC.
9. **Exercices 5–7 de PC4 (bonus).** Résumés dans un bloc texte du cours (section 9) et utilisés pour des items courts (QCM deux échantillons, trouver l’erreur Wilcoxon et $p$-valeur 0,496) plutôt que traités en entier, conformément au statut « bonus » du poly.
10. **Visualisations.** Titres d’axes et de figures Plotly passés sous la forme `{ text: … }` (les titres en chaîne ne s’affichent pas avec la version de Plotly du socle, voir DEMANDES_SOCLE). La viz « longueur minimale » couvre à la fois le pivot $\chi^2(n-1)$ (Ex. 1.6) et le pivot $X_{n:n}/\theta$ (PC4 Ex. 3).
11. **Hors programme.** Section 11 (compléments §5 du poly : dualité générale, tests par inégalités de déviation, Chernoff, renvoi au ch.5) en `scope: 'hors-programme'`, blocs concis, sans exercice dédié.

## Passe de cohérence finale

1. **Log-vraisemblance.** L’entrée commune `elln` du glossaire suit désormais le poly ch.2 (Déf. 1.5) : $\ell_n=\frac1n\log\mathrm{L}_n$ (normalisée), en signalant que la PC7 et le poly ch.7 (Ex. 1.10) écrivent $\ell_n$ sans le facteur $\frac1n$. Dans les exercices tirés de la PC7 (ch.6, ch.7), la forme non normalisée est écrite $\log\mathrm{L}_n$ (ch.6, et indices du ch.7) ou explicitement annoncée « $\ell_n:=\log\mathrm{L}_n$, non normalisée, notation de la PC7 » (ch.7, dont le poly emploie lui-même les deux conventions).
2. **Tests $\phi$.** L’entrée commune `phi` (« fonction critique ») est supprimée : $\phi$/$\varphi$ désigne aussi un difféomorphisme (ch.1), une fonction convexe ou un paramètre naturel (ch.2, ch.5), une fonction de la méthode-δ (ch.6), une fonction mesurable ou l’indice du plus proche voisin (ch.8), une perte convexe (ch.9). L’infobulle « test » n’est plus enregistrée qu’avec la portée du chapitre : `\phi`, `\phi_n` aux ch.4 et ch.5 ; `\phi_n` seul aux ch.6 et ch.7. Au ch.4, le $\phi=-\beta_0/\beta_1$ de Fieller est écrit `\phi{}` pour ne pas recevoir l’infobulle « test » (même contournement que `{\gamma}` au ch.5) ; idem `\alpha{}` pour le paramètre de Pareto (ch.7) et de Weibull (ch.2), afin d’éviter l’infobulle « niveau ».
3. **Convergence en loi (ch.6).** `\Rightarrow` et `\Longrightarrow` seuls ne portent plus l’infobulle « convergence en loi » (ce sont des implications dans 32 cas sur 32) ; seules les flèches surmontées de la probabilité la portent.
4. **Information de Fisher.** Lettre ajourée $\mathbb{I}(\theta)$ partout (poly ch.3 Déf. 1.8, ch.7 Déf. 1.4), y compris au ch.6 et dans le bloc Pitman du ch.7 ; l’entrée commune `Ifisher` reconnaît $\mathbb{I}(\theta)$, $\mathbb{I}_1(\theta)$, $\mathbb{I}_n(\theta)$ (et garde $I(\theta)$ par compatibilité).
5. **Statistiques d’ordre extrêmes.** $X_{n:n}$, $X_{1:n}$ ont l’infobulle « statistiques d’ordre » aux ch.2 (entrée `Xkn`), ch.3, ch.4, ch.5 et ch.6. **Pas au ch.9**, où $X_{1:n}$ désigne le design $(X_1,\dots,X_n)$ (« conditionner par $X_{1:n}$ »). Au ch.8, la notation $X_{(n)}:=X_{\varphi_n(X)}$ (plus proche voisin) est celle du **CC 2022 Ex. 5** (et non de l’Examen 2025) ; le conflit avec la statistique d’ordre $X_{(n)}=\max_iX_i$ du ch.1 est signalé là où elle est définie.
6. **Prérequis et PC associées.** Les prérequis affichés suivent les encadrés « résultats antérieurs mobilisés » du poly (ch.4 : ch1–3 ; ch.5 : ch2–4, p. 28 citant aussi la vraisemblance du ch.2 ; ch.7 : ch2, ch3, ch6 ; ch.8 : ch1, ch2, ch6, ch7 ; ch.9 : ch2, ch3, ch4, ch6, ch7, ch8). Règle unique pour « PC associées » : la PC de la semaine **puis** toute feuille de PC dont au moins un exercice du chapitre est tiré (ch.1 : PC1, PC3, PC4 ; ch.2 : PC2, PC7 ; ch.3 : PC3, PC7 ; ch.4 : PC4, PC2 ; ch.5 : PC5, PC4 ; ch.6 : PC6, PC7).
7. **Examen 2025 Ex. 2 Q10 (ch.6).** Aligné sur le ch.7 : $v_{ML}=\sigma^2=(\mathbb{I}^{-1})_{11}$, efficacité asymptotique présentée comme extension vectorielle hors programme du Thm 1.7 (scalaire), licite car $\mathbb{I}(\mu,\sigma^2)$ est diagonale ; le classement $v_{ML}\le v_{Mom}$, $v_{ML}<v_{Med}$ vient de la comparaison directe des variances (Prop. 1.3), la médiane n’étant pas un Z-estimateur régulier.
8. **Nouvelles questions d’annale entraînées.** Examen 2025 Ex. 3 Q6–Q7 (`ch9-etape-2025-q6-q7`, avec l’effet de bord $B(x,t)\subset\mathcal X$ en étape propre ; le distracteur « exposant $1/d$ puis espérance » proposé par l’audit n’a **pas** été retenu, car $\mathbb E[\mathfrak R_k]\le(\mathbb E[U_k]/(c_-v_d))^{1/d}$ est vrai par Jensen) ; CC 2022 Ex. 4 Q4–Q6 (`ch1-etape-cc2022-ex4-q4-q6` ; le distracteur « Cov nulle par Cochran » n’a pas été retenu, car $\bar Y$ et $\hat\beta_1$, fonctions des projections sur les droites orthogonales $\mathbb R\mathbf 1$ et $\mathbb R u$, sont bien indépendantes) ; Examen 2025 Ex. 4 Q3 (`ch2-qcm-2025-ex4-q3`), Q7 (`ch1-qcm-2025-ex4-q7-acp`, rattachée au ch.1 pour la matrice de covariance) et Q12 (`ch5-assoc-2025-ex4-q12`, `ch5-qcm-2025-ex4-q12-conjoint`, $Ne12$ codée comme variable qualitative à $K$ modalités comme dans le DIAGNOSTIC). Les items Ex. 4 portent le tag `hors-programme` (questions sur les DM/EN, exclues de l’examen blanc, conformément à ch.5 §4). CC 2022 Ex. 3 Q8 (bonus) n’est plus « admise » dans `ch4-annale-cc2022-ex3-translatee` : la densité de $F_n(a)$ est obtenue par la fonction de survie $\mathbb P(U>tV/(n-1))=(1+\frac{nt}{n-1})^{-(n-1)}$ (transformée de Laplace d’une Gamma), la route du corrigé (fonction muette, changement de variable) étant mentionnée.
9. **Socle.** Révision ciblée : un item raté ou partiel à la dernière tentative est reproposé immédiatement (`dueItems` retient `due ≤ now` **ou** `lastOutcome < 1`), l’intervalle de répétition espacée ne s’appliquant qu’aux réussites. Numérique : champ `type="text"` + `inputmode="decimal"`, virgule ou point acceptés, valeurs affichées arrondies selon la tolérance (une décimale de plus que l’ordre de grandeur de la tolérance) avec virgule décimale. Associer : une puce placée se sélectionne (toucher/clic) pour être déplacée, un second toucher la renvoie dans la réserve ; puces et cases utilisables au clavier (Entrée/Espace). Ordonner : le glisser tactile ne démarre que sur la poignée ⋮⋮ (défilement de la page préservé ailleurs) ; boutons ▲▼ d’au moins 28 px (40×36 px sur écran tactile).
