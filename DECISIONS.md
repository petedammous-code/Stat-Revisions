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
