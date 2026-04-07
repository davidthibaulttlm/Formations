# Plan de Tournage — Le Spec-Driven AI Coding
## Capsule Vidéo de 20 minutes (en français)

---

## Informations Générales

- **Durée** : ~20 minutes
- **Format** : Capsule vidéo avec site web interactif + annotations live au stylet
- **Langue** : Français
- **Présentateur** : À l'écran avec partage d'écran
- **Outils** : Cursor IDE, Claude Code (terminal), navigateur web (présentation), stylet pour annotations

---

## Déroulé Détaillé

### 1. Introduction (0:00 — 0:30) ⏱️ 30s

**Slide** : "Le Spec-Driven AI Coding"

**Points à couvrir** :
- Rappel : dans les capsules précédentes, on a vu les Rules (conventions), les Commands/Skills (actions), et les Hooks (garanties)
- Maintenant, on aborde la **méthodologie** de travail avec les agents IA
- La promesse : "Définissez le plan avant de construire la maison"
- Citation clé : "Le code est maintenant bon marché. La clarté est chère."

**Annotation au stylet** : Écrire "Rules → Commands → Hooks → **Méthodologie**" comme progression

---

### 2. Le Problème — Vibe Coding (0:30 — 2:30) ⏱️ 2 min

**Slide** : "Pourquoi le vibe coding ne suffit plus"

**Points à couvrir** :
- **Vibe Coding** : on donne des instructions vagues à l'IA et on espère — "prompt and pray"
  - L'IA produit du code "à peu près correct" qu'il faut constamment corriger et re-prompter
- **Dérive silencieuse** : l'IA fait des choix implicites (librairies, architecture, conventions)
  - Après 3 mois, le projet est un "legacy IA" — de la dette technique invisible
- **Perte de savoir** : sans documentation de l'intention, les features deviennent des mystères
  - Quand le dev d'origine quitte l'équipe, le code existe mais personne ne sait POURQUOI

**Annotation au stylet** :
- Dessiner un cycle vicieux : Prompt vague → Code "à peu près" → Accumulation → Legacy IA
- Écrire "Le code est bon marché. La clarté est chère." en grand

---

### 3. Définition — Qu'est-ce que le SDD ? (2:30 — 4:30) ⏱️ 2 min

**Slide** : "Le Spec-Driven Development"

**Points à couvrir** :
- **Le SDD est une discipline d'ingénierie** : on rédige des spécifications détaillées AVANT d'écrire du code
- Les specs décrivent : quoi faire, comment ça se comporte, quels contrats respecter
- **CE N'EST PAS "une spec par tâche"** — c'est **"l'app entière est spécifiée"**
  - Les specs sont la documentation vivante permanente du système
  - Quand du travail arrive : on met à jour les specs concernées d'abord, puis l'IA implémente contre elles
- Analogie : "La spec est à l'app ce que le plan d'architecte est à l'immeuble. On ne jette pas le plan après la construction — on le met à jour quand on ajoute un étage."
- Le SDD n'est pas nouveau (OpenAPI, SQL DDL, Figma) — mais l'IA le rend bien plus puissant car **la spec EST le prompt**
- Parentage : SDD est le parent en amont de TDD. TDD dit "écris les tests d'abord". SDD dit "écris l'INTENTION d'abord — puis dérive les tests ET le code"

**Annotation au stylet** :
- Dessiner le flux : `Spec existante → Nouveau besoin → Mise à jour spec → Implémentation IA → Spec à jour = doc à jour`
- Entourer "l'app entière est spécifiée" — c'est le concept clé

---

### 4. Les Types de Specs (4:30 — 7:00) ⏱️ 2:30

**Slide** : "Les types de specs dans un projet"

**Points à couvrir** :
- Un projet réel a BEAUCOUP de specs — potentiellement des dizaines
- Tableau des types :
  - **APIs** : OpenAPI / Swagger YAML — contrats d'interface entre services
  - **Base de données** : Schemas (Prisma, SQL DDL, migrations)
  - **UI/UX** : Designs Figma + specs d'interaction
  - **Architecture** : ADRs (Architecture Decision Records) — pourquoi on a choisi X plutôt que Y
  - **Produit** : PRDs (Product Requirements Documents)
  - **Agents IA** : Prompt specs + behavior contracts
  - **Design système** : RFC documents
- Message clé : "Vous avez probablement déjà des specs sans le savoir — votre schema Prisma, votre OpenAPI, vos ADRs. Le SDD, c'est les traiter comme source de vérité et les maintenir activement."

**Annotation au stylet** :
- Dessiner un tableau à 2 colonnes : Contexte | Format de spec
- Entourer Prisma et OpenAPI : "Vous avez déjà ces specs !"

---

### 5. Le Layering — La Pyramide des Specs (7:00 — 9:00) ⏱️ 2 min

**Slide** : "La pyramide des specs"

**Points à couvrir** :
- Les specs existent à plusieurs niveaux — l'IA a besoin de TOUS les niveaux
- **Niveau Projet** (en haut, le plus stable) :
  - `CLAUDE.md` / Rules = architecture, stack, conventions
  - ADRs, Schemas DB, OpenAPI spec globale
  - Se met à jour rarement
- **Niveau Module / Domaine** (au milieu) :
  - Un dossier par domaine métier : `coaching-plans/`, `user-management/`, `billing/`
  - Chaque module a ses propres specs : modèles, API, règles métier
- **Niveau Feature / Changement** (en bas, le plus fréquent) :
  - La spec d'une feature ou d'un changement spécifique
  - Requirements, Design, Tasks
- "Sans le niveau Projet, l'IA réinvente l'architecture. Sans le niveau Module, elle ignore les règles métier. Sans le niveau Feature, elle improvise l'implémentation."

**Annotation au stylet** :
- Dessiner la pyramide à 3 niveaux avec des exemples dans chaque
- Écrire "L'IA lit de haut en bas" avec une flèche descendante

---

### 6. Organiser le Projet pour le SDD (9:00 — 10:30) ⏱️ 1:30

**Slide** : "Organisation du projet"

**Points à couvrir** :
- Montrer la structure de dossier recommandée :
  - `CLAUDE.md` à la racine (spec projet)
  - `docs/adrs/` pour les décisions architecturales
  - `docs/api/openapi.yaml` pour le contrat API
  - `prisma/schema.prisma` pour la DB
  - `src/features/` organisé par domaine métier avec `SPEC.md` par module
  - `.specs/` pour les specs de changements en cours (WIP)
- **2 catégories de specs** :
  - **Specs permanentes** : `SPEC.md`, `schema.prisma`, `openapi.yaml`, ADRs — état actuel du système
  - **Specs de changement** : dans `.specs/` — temporaires, archivées après merge
- Organiser par feature (pas par couche technique) = meilleur scope pour l'IA

**Annotation au stylet** :
- Dessiner l'arborescence de fichiers
- Séparer visuellement "permanentes" vs "changements" avec deux couleurs

---

### 7. Connecter les Specs à l'IA (10:30 — 12:00) ⏱️ 1:30

**Slide** : "Comment l'IA découvre les specs"

**Points à couvrir** :
- Le problème : avec des dizaines de specs, charger tout = gaspillage de tokens
- Solution en 3 tiers (callback aux capsules précédentes !) :
  - **Tier 1 — CLAUDE.md** (~5-10 lignes, toujours chargé) : pointeur léger + index des specs
  - **Tier 2 — Rule agent-decided** (chargée conditionnellement) : workflow SDD complet
  - **Tier 3 — Skill on-demand** (chargée à l'invocation) : loop complet explore > spec > implement > validate
- "Ne chargez que ce dont l'IA a besoin, quand elle en a besoin. Le CLAUDE.md est la table des matières, pas le livre entier."

**Annotation au stylet** :
- Dessiner la pyramide inversée du coût contexte
- Écrire les 3 tiers avec leur coût : Léger → Moyen → Riche

---

### 8. Le Workflow SDD au Quotidien (12:00 — 14:00) ⏱️ 2 min

**Slide** : "Le workflow en 4 phases"

**Points à couvrir** :
- Quand un nouveau besoin arrive, le workflow concret :
  1. **Explorer** : L'IA lit le code ET les specs existantes. "Ne PAS écrire de code."
  2. **Spécifier** : Mettre à jour les specs ou créer une spec de changement dans `.specs/`
     - Requirements (Le Quoi) : problème, critères d'acceptation, contraintes, hors-scope
     - Design (Le Comment) : architecture, modèle de données, contrats API
     - Tasks (Le Plan) : tâches atomiques, max 3 fichiers, dépendances, definition of done
  3. **Implémenter** : Déléguer chaque tâche à un sous-agent avec contexte propre. Commit après chaque tâche.
  4. **Valider** : Review, tests, et **mettre à jour les specs permanentes**
- Insister sur la phase 4 : "La boucle se ferme quand les specs permanentes sont à jour."

**Annotation au stylet** :
- Dessiner le cycle en 4 phases avec une flèche circulaire
- Entourer la phase 4 : "Boucler = mettre à jour les specs permanentes"

---

### 9. Exemple Concret — Ajouter l'Authentification (14:00 — 16:00) ⏱️ 2 min

**Slide** : "Exemple — Ajouter l'authentification par email"

**Points à couvrir** :
- Fil rouge : on ajoute l'auth par email à une app existante
- **Avant** : `user-management/SPEC.md` sans auth, `schema.prisma` basique, pas de routes auth
- **Après le workflow SDD** :
  - `.specs/feat--email-auth/requirements.md` : user stories, acceptance criteria
  - `.specs/feat--email-auth/design.md` : architecture, modèle Session, endpoints
  - `.specs/feat--email-auth/tasks.md` : 5 tâches atomiques
  - Mise à jour de `SPEC.md`, `schema.prisma`, `openapi.yaml`
- Montrer les deux outils :
  - **Cursor** : Plan Mode → Agent Mode → Task tool
  - **Claude Code** : Shift+Tab Plan Mode → sous-agents

**Annotation au stylet** :
- Dessiner "Avant" et "Après" côte à côte
- Montrer les fichiers créés/mis à jour

---

### 10. Notation EARS pour les Requirements (16:00 — 17:00) ⏱️ 1 min

**Slide** : "Écrire des requirements avec EARS"

**Points à couvrir** :
- EARS = Easy Approach to Requirements Syntax (popularisé par AWS Kiro)
- 5 patterns :
  - **Ubiquitaire** : `LE SYSTÈME DOIT [capacité]`
  - **Événementiel** : `QUAND [événement] LE SYSTÈME DOIT [réponse]`
  - **État** : `TANT QUE [état actif] LE SYSTÈME DOIT [comportement]`
  - **Conditionnel** : `SI [condition] LE SYSTÈME DOIT [action]`
  - **Complexe** : combinaison des précédents
- Exemple concret :
  - `QUAND un utilisateur soumet le formulaire d'inscription AVEC un email valide, LE SYSTÈME DOIT créer un compte et retourner un token JWT`
  - `SI l'utilisateur échoue 5 tentatives de connexion, LE SYSTÈME DOIT verrouiller le compte pendant 15 minutes`

**Annotation au stylet** :
- Écrire les 5 patterns EARS avec des exemples
- Entourer QUAND / SI / TANT QUE comme mots-clés

---

### 11. Implémenter avec des Sous-agents (17:00 — 18:00) ⏱️ 1 min

**Slide** : "Déléguer aux sous-agents"

**Points à couvrir** :
- Schéma du flux :
  - Specs à jour → Agent principal lit → Délègue Task 1, 2, 3 à des sous-agents
  - Chaque sous-agent : contexte frais + specs pertinentes → implémente → teste → commit
- Pourquoi des sous-agents ?
  - Contexte propre par tâche (pas de dégradation)
  - Chaque sous-agent reçoit les specs du module concerné
  - Parallélisation possible
  - Commits atomiques et réversibles
- Commande Claude Code : `"Read .specs/feat--email-auth/ and implement. Use subagents for each task. Commit after each task."`
- Cursor : Task tool dans Agent Mode

**Annotation au stylet** :
- Dessiner l'agent principal au centre avec des flèches vers les sous-agents
- Écrire "1 tâche = 1 sous-agent = 1 commit"

---

### 12. Vibe Coding vs SDD (18:00 — 18:45) ⏱️ 45s

**Slide** : "Quand utiliser quoi ?"

**Points à couvrir** :
- **Vibe Coding** : prototypes, exploration, petites features isolées, projets perso, apprentissage
- **SDD** : production, features complexes, équipe, systèmes critiques, projets long terme
- L'approche hybride : "Vibe-codez pour découvrir les besoins, puis formalisez en spec avant la production"
- SDD et TDD sont complémentaires, pas en compétition

**Annotation au stylet** :
- Deux colonnes : Vibe Coding | SDD avec les cas d'usage

---

### 13. Bonnes Pratiques (18:45 — 19:30) ⏱️ 45s

**Slide** : "Les 8 règles d'or"

1. **Spec = source de vérité** — L'app entière est spécifiée. Le code est dérivé des specs
2. **Maintenir la pyramide** — Projet + Module + Feature. Tous les niveaux
3. **Organiser par domaine** — Un dossier par feature métier
4. **Permanentes vs changements** — `SPEC.md` par module + `.specs/` pour les WIP
5. **Boucler la boucle** — Après implémentation, mettre à jour les specs permanentes
6. **Contexte en 3 tiers** — CLAUDE.md (pointeur) + Rule (workflow) + Skill (loop)
7. **Tâches atomiques** — Max 3 fichiers, definition of done, commit par tâche
8. **La spec est le prompt** — Plus elle est précise, meilleur est le code

**Annotation au stylet** : Cocher chaque point comme une checklist

---

### 14. Conclusion (19:30 — 19:50) ⏱️ 20s

**Slide** : "Récapitulatif"

- Le code est bon marché. La clarté est chère. Le SDD investit dans la clarté.
- Les specs documentent TOUT le système : API, DB, ADRs, PRDs, modules, features
- La pyramide : Projet > Module > Feature
- Workflow : Explorer → Spécifier → Implémenter → Boucler
- Combiné avec Rules, Commands/Skills et Hooks = workflow complet

**Call to action** : "Commencez par créer un SPEC.md pour votre module principal."

---

### 15. Ressources (19:50 — 20:00) ⏱️ 10s

**Slide** : "Pour aller plus loin"

- GitHub Spec Kit : https://github.com/github/spec-kit
- AWS Kiro Spec Writing Guide : https://kiro.dev/docs/specs
- Weaverse SDD Standard : https://github.com/Weaverse/spec-driven-development
- Blog SDD with Claude Code : https://gahmed.com/blog/spec-driven-development-claude-code/
- OpenAPI Specification : https://spec.openapis.org/oas/latest.html
- ADR GitHub : https://adr.github.io/

---

## Structure des Slides (pour la présentation web)

| # | Slide | Type | Durée |
|---|-------|------|-------|
| 1 | Hero — Le Spec-Driven AI Coding | Titre | 30s |
| 2 | Le Problème — Vibe Coding | Problème | 2 min |
| 3 | Qu'est-ce que le SDD ? | Concept | 2 min |
| 4 | Les types de specs | Types | 2:30 |
| 5 | La pyramide des specs (Layering) | Concept | 2 min |
| 6 | Organiser le projet | Configuration | 1:30 |
| 7 | Connecter les specs à l'IA | Configuration | 1:30 |
| 8 | Le workflow en 4 phases | Exemples | 2 min |
| 9 | Exemple — Authentification | Exemples (tabs) | 2 min |
| 10 | Notation EARS | Exemples | 1 min |
| 11 | Sous-agents | Concept | 1 min |
| 12 | Vibe Coding vs SDD | Versus | 45s |
| 13 | Bonnes Pratiques | Conseils | 45s |
| 14 | Conclusion | Récap | 20s |
| 15 | Ressources | Liens | 10s |

**Total : ~20 minutes — 15 slides**

---

## Checklist Avant Tournage

- [ ] Projet de démo ouvert dans Cursor avec des `SPEC.md` par module
- [ ] Claude Code installé et fonctionnel dans un terminal
- [ ] Dossier `.specs/` avec un exemple de feature spec (requirements, design, tasks)
- [ ] `CLAUDE.md` avec le pointeur vers les specs
- [ ] `schema.prisma` et `openapi.yaml` prêts comme exemples de specs permanentes
- [ ] Site de présentation ouvert dans le navigateur
- [ ] Stylet chargé et fonctionnel
- [ ] Tester les annotations sur la tablette/écran
- [ ] Vérifier que le partage d'écran capture les trois fenêtres (browser, Cursor, terminal)
- [ ] Micro vérifié
- [ ] Faire un dry run de 2 minutes pour le timing

## Notes de Production

- Alterner entre la présentation web, Cursor ET le terminal Claude Code
- Utiliser les annotations au stylet surtout pour la pyramide des specs et le workflow en 4 phases
- **Bien insister sur "l'app entière est spécifiée" dès le début** — c'est LE concept clé
- Montrer que les specs existantes (Prisma, OpenAPI) sont déjà du SDD sans le savoir
- Garder un ton dynamique et concret — le SDD peut paraître abstrait, il faut rester accessible
- Penser à zoomer sur les structures de dossiers et les exemples de specs
- Montrer le lien avec les capsules précédentes (Rules = spec projet, Skills = workflow SDD)
- Bien expliquer la différence entre specs permanentes et specs de changement
