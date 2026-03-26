# Plan de Tournage — Les /Commands & Skills dans Cursor & Claude Code
## Capsule Vidéo de 10 minutes (en français)

---

## Informations Générales

- **Durée** : ~10 minutes
- **Format** : Capsule vidéo avec site web interactif + annotations live au stylet
- **Langue** : Français
- **Présentateur** : À l'écran avec partage d'écran
- **Outils** : Cursor IDE, Claude Code (terminal), navigateur web (présentation), stylet pour annotations

---

## Déroulé Détaillé

### 1. Introduction (0:00 — 0:50) ⏱️ 50s

**Slide** : "Les /Commands & Skills — Cursor & Claude Code"

**Points à couvrir** :
- Ouvrir avec une promesse orientée valeur : "Aujourd'hui, on réduit la friction équipe avec Rules/Commands/Skills"
- Rappel : dans la capsule précédente, on a vu les Rules — des instructions persistantes
- Les Commands = des prompts sauvegardés et réutilisables
- Les Skills = des capacités modulaires chargées selon la tâche
- Standard ouvert **Agent Skills** (agentskills.io) — fonctionne dans Cursor, Claude Code, Codex

**Annotation au stylet** : Dessiner Rules → Commands → Skills comme une progression

---

### 2. Définitions de base (0:50 — 1:25) ⏱️ 35s

**Slide** : "C'est quoi une Command ? C'est quoi une Skill ?"

**Points à couvrir** :
- **Command** : prompt sauvegardé, déclenchement manuel via `/nom`
- **Skill** : capacité modulaire (`SKILL.md` + fichiers), invocation auto ou manuelle
- Donner 1 exemple clair de chaque :
  - Command : `/lint`
  - Skill : "generate-component" avec templates/scripts
- Message ultra simple à dire : "Command = raccourci manuel, Skill = capacité spécialisée"

**Annotation au stylet** : Tableau 2 colonnes "Command" vs "Skill"

---

### 3. Les irritants concrets (1:25 — 2:25) ⏱️ 1 min

**Slide** : "Pourquoi s'en servir en équipe ?"

**Points à couvrir** :
- Parler d'irritants vécus avant de parler implémentation :
  1. **Variabilité d'équipe** : chacun travaille avec l'IA à sa façon, conventions cassées
  2. **Prompt répétitif** : "roule le linter, corrige, assure que le CI passe" retapé sans arrêt
  3. **Explosion des rules** : trop de rules = contexte plus lourd, plus lent, plus cher, maintenance difficile
- Solutions associées :
  - Rules/Commands/Skills versionnés dans Git = pratique équipe officielle
  - Une commande ` /lint ` supprime un rituel répétitif
  - Migrer certaines rules vers des skills pour chargement dynamique et meilleure scalabilité

**Annotation au stylet** : Trois irritants -> trois solutions

---

### 4. Les Commandes Built-in (2:25 — 3:35) ⏱️ 1:10

**Slide** : "Commandes intégrées — Cursor vs Claude Code"

**Points à couvrir** :

**Cursor — commandes intégrées** :
- `/plan` — passer en mode planification
- `/ask` — poser une question sans modifier de fichiers
- `/model` — changer de modèle
- `/compress` — compresser le contexte
- `/commands` — gérer les commandes custom
- `/rules` — voir les rules actives
- `/help` — aide
- `/mcp list` — lister les serveurs MCP
- Aussi : `/auto-run`, `/sandbox`, `/max-mode`, `/new-chat`, `/vim`

**Claude Code — commandes intégrées** :
- `/compact` — compresser l'historique (équivalent `/compress`)
- `/cost` — voir les tokens et coûts de la session
- `/context` — visualiser l'utilisation de la fenêtre de contexte
- `/init` — initialiser un projet avec CLAUDE.md
- `/config` — ouvrir les paramètres
- `/model` — changer de modèle
- `/review` — demander une review de code
- `/doctor` — vérifier l'installation
- `/mcp` — gérer les serveurs MCP
- Aussi : `/clear`, `/help`, `/rename`, `/resume`, `/add-dir`, `/permissions`, `/login`, `/logout`

**Annotation au stylet** : Entourer les commandes équivalentes entre les deux outils (`/compact` ↔ `/compress`, `/model` ↔ `/model`)

---

### 5. Les Commandes Custom (3:35 — 5:00) ⏱️ 1:25

**Slide** : "Créer vos propres commandes"

**Points à couvrir** :

**Cursor** :
- Fichiers Markdown dans `.cursor/commands/` (projet) ou `~/.cursor/commands/` (global)
- Créés via `/commands` dans le chat ou manuellement
- Le nom du fichier = le nom de la commande
- Contenu = le prompt envoyé à l'IA (commande = prompt sauvegardé)

**Claude Code** :
- Fichiers Markdown dans `.claude/commands/` (projet) ou `~/.claude/commands/` (perso)
- Frontmatter YAML : `description`, `argument-hint`, `allowed-tools`, `model`
- Variables dynamiques : `$ARGUMENTS`, `$0`-`$N`, `${CLAUDE_SESSION_ID}`
- Injection de contexte dynamique : `` !`commande` `` — la sortie shell remplace le placeholder
- **Note importante** : dans Claude Code, les commandes custom convergent vers les Skills (invocables aussi en slash commands) ; ce n'est pas une dépréciation universelle de toutes les plateformes agentiques

**Démo live** :
1. Montrer un fichier `.cursor/commands/lint.md`
2. Montrer un fichier `.claude/commands/lint.md` avec frontmatter et `$ARGUMENTS`
3. Invoquer `/lint` dans Cursor et `/lint src/` dans Claude Code

**Annotation au stylet** : Entourer le frontmatter de Claude Code comme différenciateur, montrer que Cursor est plus simple (juste du Markdown)

---

### 6. Les Skills — Le Standard Ouvert (5:00 — 5:50) ⏱️ 50s

**Slide** : "Skills — Un standard ouvert"

**Points à couvrir** :
- Publié en décembre 2025 sur **agentskills.io** par Anthropic
- Standard ouvert qui fonctionne dans Claude Code, Cursor, Codex et d'autres
- Différence clé avec les commandes :
  - **Commandes** = vous les déclenchez manuellement avec `/nom`
  - **Skills** = l'IA peut les découvrir et les utiliser automatiquement quand c'est pertinent
- Une skill = un dossier avec un `SKILL.md` + fichiers optionnels
- Dans Claude Code : convergence commandes custom -> skills ; ailleurs, commandes toujours valides
- Cursor v2.4 (janvier 2026) a introduit les Skills + un outil de migration `/migrate-to-skills`

**Annotation au stylet** : Dessiner le logo agentskills.io, montrer la portabilité entre outils

---

### 7. Anatomie d'une Skill (5:50 — 6:30) ⏱️ 40s

**Slide** : "Anatomie d'un SKILL.md"

**Points à couvrir** :

**Structure du dossier** :
```
my-skill/
├── SKILL.md           ← Obligatoire
├── scripts/           ← Scripts exécutables
├── references/        ← Documentation chargée à la demande
└── assets/            ← Templates, configs
```

**Frontmatter YAML** :
- `name` : identifiant de la skill (lettres minuscules, chiffres, tirets)
- `description` : ce que fait la skill — **critique** pour le déclenchement automatique
- `disable-model-invocation` : `true` pour forcer l'invocation manuelle uniquement
- `allowed-tools` : outils autorisés sans confirmation
- `model` : modèle à utiliser
- `context: fork` : exécuter dans un sous-agent isolé
- `agent` : type de sous-agent (`Explore`, `Plan`, `general-purpose`)

**Point clé à expliciter** :
- Dans la boucle agentique, l'IA ne charge pas tout le contenu détaillé de toutes les skills
- Le frontmatter (surtout `name` + `description`) guide la décision d'invocation
- Donc la description doit inclure des intentions et cas d'usage concrets

**Annotation au stylet** : Dessiner le dossier, entourer `description` comme élément critique

---

### 8. Comment l'IA décide d'appeler une skill (6:30 — 7:05) ⏱️ 35s

**Slide** : "Boucle agentique — Décision d'invocation"

**Points à couvrir** :
- Différence majeure vs rules : l'activation d'une skill est une **décision dynamique**
- Pour la découverte, l'IA voit surtout le frontmatter de `SKILL.md`
- La décision d'invoquer/installer la skill se fait pendant la boucle agentique
- Si la skill n'est pas pertinente, elle n'est pas chargée (économie de contexte)
- Conséquence : la qualité de `name` + `description` influence directement l'activation

**Message à marteler** :
- "Le frontmatter n'est pas décoratif : c'est la clé de sélection de la skill."

**Annotation au stylet** : Schéma "Demande utilisateur -> Match frontmatter -> Invocation (ou non)"

---

### 9. Skills en Action — Cursor vs Claude Code (7:05 — 7:45) ⏱️ 40s

**Slide** : "Skills dans les deux outils"

**Points à couvrir** :

**Cursor** :
- Emplacements : `.cursor/skills/`, `.agents/skills/`, `~/.cursor/skills/`
- Compatible aussi avec `.claude/skills/` et `.codex/skills/`
- Découverte automatique au démarrage
- Invocation manuelle via `/` dans le chat Agent
- Visible dans Settings → Rules → Agent Decides
- Migration : `/migrate-to-skills` convertit les rules dynamiques et commandes

**Claude Code** :
- Emplacements : `.claude/skills/` (projet), `~/.claude/skills/` (perso)
- Niveaux de priorité : Enterprise > Personal > Project
- Contrôle d'invocation :
  - Par défaut : l'utilisateur ET l'IA peuvent invoquer
  - `disable-model-invocation: true` : utilisateur uniquement (ex: `/deploy`)
  - `user-invocable: false` : IA uniquement (connaissances de fond)
- Découverte automatique dans les sous-répertoires (monorepos)
- Budget de contexte pour les descriptions (~2% de la fenêtre)

**Démo live** : Montrer une même skill dans les deux outils

**Annotation au stylet** : Tableau comparatif des emplacements

---

### 10. Skills Bundled — Claude Code (7:45 — 8:10) ⏱️ 25s

**Slide** : "Skills intégrées — Claude Code"

**Points à couvrir** :

5 skills livrées avec Claude Code, disponibles dans chaque session :

1. **`/batch`** — Orchestrer des changements à grande échelle en parallèle
   - Décompose le travail en 5-30 unités indépendantes
   - Un agent par unité dans un git worktree isolé
   - Chaque agent implémente, teste et ouvre une PR
   - Ex: `/batch migrate src/ from Solid to React`

2. **`/simplify`** — Nettoyer le code récemment modifié
   - Lance 3 agents en parallèle (réutilisation, qualité, efficacité)
   - Agrège les résultats et applique les corrections

3. **`/debug`** — Diagnostiquer la session courante
   - Lit les logs de debug de la session

4. **`/loop`** — Exécuter un prompt à intervalle régulier
   - Ex: `/loop 5m check if the deploy finished`

5. **`/claude-api`** — Charger la référence API Claude
   - S'active aussi automatiquement quand le code importe `anthropic`

**Annotation au stylet** : Encadrer `/batch` comme la plus puissante, montrer le flux parallèle

---

### 11. Commandes deprecated ? Clarifier le scope (8:10 — 8:40) ⏱️ 30s

**Slide** : "Deprecated, mais où exactement ?"

**Points à couvrir** :
- La convergence Commands -> Skills concerne surtout **Claude Code**
- Dans Claude Code : les skills peuvent être invoquées en slash commands
- Ailleurs : les commandes peuvent rester supportées longtemps
- Une commande reste un prompt sauvegardé et réutilisable, ce n'est pas un anti-pattern

**Message clé** :
- Ne pas généraliser "commands deprecated" à tout l'écosystème agentique

**Annotation au stylet** : Deux colonnes "Claude Code" vs "Autres outils"

---

### 12. Custom Modes — Cursor (8:40 — 9:00) ⏱️ 20s

**Slide** : "Modes personnalisés — Cursor"

**Points à couvrir** :
- Fonctionnalité complémentaire aux commands et skills
- Au-delà d'Agent et Ask : créez vos propres modes
- Accessible via Settings → Features → Chat → Custom modes
- Chaque mode définit : nom, icône, raccourci clavier, outils activés, instructions
- Exemples de modes utiles :
  - **Teach** : explications détaillées
  - **Refactor** : améliorer la structure sans nouvelles fonctionnalités
  - **Plan** : plans d'implémentation sans modifications
  - **Debug** : investigation approfondie avant correction
  - **Review** : analyse qualité sans résolution automatique
- À venir : fichier `.cursor/modes.json` pour partager en équipe

**Annotation au stylet** : Montrer le menu des modes dans Cursor

---

### 13. Le Grand Comparatif (9:00 — 9:25) ⏱️ 25s

**Slide** : "Commands vs Skills vs Rules vs Modes"

**Tableau comparatif** :

|  | Commands | Skills | Rules | Modes |
|---|---|---|---|---|
| **Type** | Action directe | Capacité intelligente | Instruction persistante | Environnement de travail |
| **Déclenchement** | Manuel (`/nom`) | Auto ou manuel | Automatique | Sélection utilisateur |
| **Cursor** | `.cursor/commands/` | `.cursor/skills/` | `.cursor/rules/` | Settings |
| **Claude Code** | `.claude/commands/` | `.claude/skills/` | `.claude/rules/` | — |
| **Versionné Git** | ✓ | ✓ | ✓ | Bientôt |
| **Standard ouvert** | Non | Oui (agentskills.io) | Non | Non |
| **Sous-agents** | Non | Oui (`context: fork`) | Non | Non |

**Message clé** : Ces quatre mécanismes sont complémentaires, pas en compétition

**Nuance de dépréciation** :
- "Commands deprecated" concerne surtout l'évolution de Claude Code
- Le concept de commande reste pertinent dans d'autres technologies agentiques

**Annotation au stylet** : Dessiner un schéma en couches : Rules (base) → Commands (actions) → Skills (intelligence) → Modes (environnement)

---

### 14. Bonnes Pratiques (9:25 — 9:50) ⏱️ 25s

**Slide** : "Les 6 règles d'or"

1. **Partir d'un irritant réel** — Ex: lint CI, review PR, migration répétitive
2. **Pour du nouveau, privilégier les skills** — Garder les commands pour les raccourcis manuels simples
3. **Skill ensuite** — Quand il faut scripts/assets/references + activation auto
4. **Description = découverte** — C'est le signal principal d'invocation automatique
5. **Versionner dans Git** — Crée une façon officielle et partagée d'utiliser l'IA en équipe
6. **SKILL.md < 500 lignes** — Mettre le détail dans `references/` pour le chargement à la demande

**Annotation au stylet** : Cocher chaque point comme une checklist

---

### 15. Conclusion & Récapitulatif (9:50 — 10:00) ⏱️ 10s

**Slide** : "Récapitulatif"

- Les **Commands** = des prompts sauvegardés, simples et rapides à invoquer
- Les **Skills** = des capacités modulaires, chargées selon la tâche
- **Standard ouvert** Agent Skills — fonctionne dans Cursor ET Claude Code
- Dans Claude Code, les commandes custom convergent vers les skills
- Les commands, skills, rules et modes sont **complémentaires**

**Call to action** : "Choisissez un irritant de votre équipe et automatisez-le aujourd'hui avec une commande ou une skill."

---

## Checklist Avant Tournage

- [ ] Projet de démo ouvert dans Cursor avec des commands et skills en place
- [ ] Claude Code installé et fonctionnel dans un terminal
- [ ] Exemples de skills dans `.cursor/skills/` et `.claude/skills/`
- [ ] Commandes custom dans `.cursor/commands/` et `.claude/commands/`
- [ ] Site de présentation ouvert dans le navigateur
- [ ] Stylet chargé et fonctionnel
- [ ] Tester les annotations sur la tablette/écran
- [ ] Vérifier que le partage d'écran capture les trois fenêtres (browser, Cursor, terminal)
- [ ] Micro vérifié
- [ ] Faire un dry run de 2 minutes pour le timing

## Notes de Production

- Alterner entre la présentation web, Cursor ET le terminal Claude Code
- Utiliser les annotations au stylet surtout pour les schémas comparatifs
- Garder un ton dynamique et concret — éviter le jargon excessif
- Penser à zoomer sur les parties de code importantes
- Montrer que les skills sont le même standard dans les deux outils — portabilité
- Bien insister sur la différence Commands (action manuelle) vs Skills (découverte intelligente)
- Montrer `/batch` en action si possible — c'est la skill la plus impressionnante
