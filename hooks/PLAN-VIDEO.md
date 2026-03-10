# Plan de Tournage — Les Hooks dans Cursor & Claude Code
## Capsule Vidéo de 15 minutes (en français)

---

## Informations Générales

- **Durée** : ~15 minutes
- **Format** : Capsule vidéo avec site web interactif + annotations live au stylet
- **Langue** : Français
- **Présentateur** : À l'écran avec partage d'écran
- **Outils** : Cursor IDE, Claude Code (terminal), navigateur web (présentation), stylet pour annotations

---

## Déroulé Détaillé

### 1. Introduction (0:00 — 1:00) ⏱️ 1 min

**Slide** : "Les Hooks — Cursor & Claude Code"

**Points à couvrir** :
- Rappel : dans les capsules précédentes, on a vu les Rules (conventions) et les Commands/Skills (actions et workflows)
- Problème : les Rules sont des **suggestions** — l'IA peut les ignorer
- Parfois on a besoin de **garanties** : formater le code, bloquer une commande dangereuse, auditer les actions
- Les Hooks = des scripts qui s'exécutent **à chaque fois**, de façon déterministe, à des moments précis du cycle de l'agent
- Disponible dans Cursor (oct. 2025, beta) et Claude Code — avec compatibilité croisée

**Annotation au stylet** : Dessiner une timeline agent avec des points d'accroche (hooks) avant et après chaque action

---

### 2. Qu'est-ce qu'un Hook ? — Le Concept (1:00 — 3:00) ⏱️ 2 min

**Slide** : "Qu'est-ce qu'un Hook ?"

**Points à couvrir** :
- Un hook est un **processus externe** (script shell, endpoint HTTP, prompt LLM, ou sous-agent) que l'outil exécute automatiquement à un moment précis du cycle de l'agent
- Analogie : middleware/intercepteur — comme un middleware Express qui intercepte les requêtes HTTP, un hook intercepte les actions de l'IA
- Communication : l'outil envoie du **JSON** au hook (via stdin ou HTTP) → le hook traite → le hook répond (autoriser, bloquer, modifier)
- Différence fondamentale avec les Rules :
  - **Rules** = instructions que l'IA *devrait* suivre (probabiliste — elle peut oublier)
  - **Hooks** = code qui s'exécute *systématiquement* (déterministe — garanti à 100%)
- Cas d'usage typiques :
  - Formater automatiquement après chaque modification de fichier
  - Bloquer les commandes destructrices (`rm -rf`, `DROP TABLE`)
  - Scanner le code pour des secrets ou du PII avant chaque commit
  - Auditer toutes les actions de l'agent dans un log
  - Injecter du contexte au démarrage d'une session

**Annotation au stylet** :
- Dessiner le schéma : `Agent veut agir → Hook intercepte → ✅ Autoriser / ❌ Bloquer / 📝 Modifier`
- Écrire en grand : "Rules = suggestion | Hooks = garantie"

---

### 3. Le Cycle de Vie — Les Événements (3:00 — 5:30) ⏱️ 2:30

**Slide** : "Quand les hooks se déclenchent"

**Points à couvrir** :

**Les grandes catégories d'événements** (communs aux deux outils) :

1. **Session** : `SessionStart` / `SessionEnd` — au lancement et à la fin de la session
2. **Avant une action** (Pre) : `PreToolUse`, `beforeShellExecution`, `beforeReadFile`, `beforeSubmitPrompt` — intervenir AVANT que l'action ne se produise. **Peut bloquer l'action.**
3. **Après une action** (Post) : `PostToolUse`, `afterFileEdit`, `afterShellExecution` — réagir APRÈS l'action. Idéal pour formater, logger, valider.
4. **Sous-agents** : `SubagentStart` / `SubagentStop` — contrôler le lancement de sous-agents
5. **Contexte** : `PreCompact` — observer avant la compaction du contexte

**Spécifiques à Claude Code** (plus riche) :
- `UserPromptSubmit` — intercepter le prompt de l'utilisateur avant traitement
- `PermissionRequest` — quand une boîte de dialogue de permission apparaît
- `PostToolUseFailure` — quand un outil échoue (traitement d'erreur)
- `Notification` — quand Claude Code envoie une notification
- `TaskCompleted` — quand une tâche est marquée comme terminée
- `TeammateIdle` — quand un coéquipier agent est inactif (agent teams)
- `InstructionsLoaded` — quand un CLAUDE.md ou une rule est chargé
- `ConfigChange` — quand la configuration change
- `WorktreeCreate` / `WorktreeRemove` — gestion des worktrees Git

**Spécifiques à Cursor** :
- `afterAgentResponse` / `afterAgentThought` — tracker les réponses de l'agent
- `beforeTabFileRead` / `afterTabFileEdit` — hooks pour les complétions Tab (inline)
- `beforeMCPExecution` / `afterMCPExecution` — contrôler l'exécution des outils MCP

**Point clé** : Claude Code a ~18 événements, Cursor en a ~16. Les noms diffèrent légèrement (camelCase vs PascalCase) mais les concepts sont identiques.

**Annotation au stylet** :
- Dessiner une timeline du cycle agent : `Session Start → Prompt → Tool Use → File Edit → Shell → ... → Stop → Session End`
- Placer des crochets (hooks) avant et après chaque étape
- Entourer Pre/Post comme les deux grandes familles

---

### 4. Configuration — Où et Comment (5:30 — 7:30) ⏱️ 2 min

**Slide** : "Configurer les Hooks"

**Points à couvrir** :

**Cursor** — fichier `hooks.json` :
- Projet : `.cursor/hooks.json`
- Global (user) : `~/.cursor/hooks.json`
- Format :
  ```json
  {
    "version": 1,
    "hooks": {
      "afterFileEdit": [
        { "command": ".cursor/hooks/format.sh" }
      ]
    }
  }
  ```
- Cursor surveille le fichier et recharge automatiquement
- Le script doit être exécutable (`chmod +x`)
- Pour les hooks projet, les chemins partent de la racine du projet

**Claude Code** — dans `settings.json` :
- Projet (partagé) : `.claude/settings.json`
- User (global) : `~/.claude/settings.json`
- Local (personnel, gitignored) : `.claude/settings.local.json`
- Managed policy : pour les organisations (admin-controlled)
- Format :
  ```json
  {
    "hooks": {
      "PostToolUse": [
        {
          "matcher": "Write|Edit",
          "hooks": [
            {
              "type": "command",
              "command": ".claude/hooks/format.sh"
            }
          ]
        }
      ]
    }
  }
  ```
- Commande interactive : `/hooks` pour gérer sans éditer le JSON
- Les hooks sont capturés au démarrage (snapshot) — les modifications mid-session nécessitent un review

**Différence structurelle clé** :
- Cursor : un objet `hooks` avec des arrays directes de commandes
- Claude Code : un objet `hooks` avec des arrays de **matcher groups** contenant chacun un array `hooks`
- Le `matcher` de Claude Code est un regex qui filtre sur le nom de l'outil (`Bash`, `Edit|Write`, `mcp__.*`)

**Annotation au stylet** :
- Montrer les deux formats côte à côte
- Entourer le `matcher` comme différence clé
- Écrire les chemins de fichiers pour chaque outil

---

### 5. Types de Hooks (7:30 — 9:30) ⏱️ 2 min

**Slide** : "Les 4 types de hooks"

**Points à couvrir** :

**1. Command (les deux outils)** :
- Le plus courant — un script shell qui reçoit du JSON sur stdin
- Retourne un code de sortie : `0` = OK, `2` = bloquer l'action
- Peut retourner du JSON sur stdout pour modifier le comportement
- Exemples : bash, python, node, bun
- Timeout configurable (défaut : 600s pour Claude Code)

**2. Prompt (les deux outils)** :
- Envoie un prompt à un LLM pour une évaluation oui/non
- Pas besoin d'écrire du code — juste du langage naturel
- Utilise un modèle rapide pour l'évaluation
- Retourne `{ ok: boolean, reason?: string }`
- Exemple : `"Does this command look safe to execute? Only allow read-only operations."`
- Placeholder `$ARGUMENTS` remplacé par l'input JSON du hook

**3. HTTP (Claude Code uniquement)** :
- Envoie un POST avec le JSON de l'événement à une URL
- Idéal pour intégrer des services externes (API de compliance, logging centralisé)
- Supporte les headers avec variables d'environnement (`$MY_TOKEN`)
- Même format de réponse JSON que les command hooks

**4. Agent (Claude Code uniquement)** :
- Lance un sous-agent multi-tour avec accès aux outils (Read, Grep, Glob)
- Pour des vérifications complexes nécessitant de lire des fichiers, analyser du code
- Timeout par défaut : 60s
- Le plus puissant mais le plus coûteux (consomme des tokens)

**Démo live** : Montrer un hook command simple dans les deux outils, et un hook prompt dans Claude Code

**Annotation au stylet** :
- Pyramide du plus simple au plus puissant : Command → Prompt → HTTP → Agent
- Entourer Command comme "le 80% des cas"

---

### 6. Exemple Concret : Auto-Format avec Prettier (9:30 — 11:00) ⏱️ 1:30

**Slide** : "Exemple — Formater automatiquement"

**Points à couvrir** :
- Problème : l'IA écrit du code qui n'est pas formaté selon vos conventions
- Solution : un hook `PostToolUse` / `afterFileEdit` qui lance Prettier après chaque modification
- L'IA ne peut PAS oublier — le hook s'exécute systématiquement

**Démo live — Claude Code** :
```json
{
  "hooks": {
    "PostToolUse": [
      {
        "matcher": "Write|Edit",
        "hooks": [
          {
            "type": "command",
            "command": "jq -r '.tool_input.file_path' | xargs npx prettier --write 2>/dev/null; exit 0"
          }
        ]
      }
    ]
  }
}
```
- Le `matcher` filtre sur les outils `Write` et `Edit` uniquement
- `jq` extrait le chemin du fichier depuis le JSON reçu sur stdin
- `npx prettier --write` formate le fichier en place
- `exit 0` garantit que le hook ne bloque jamais l'agent

**Démo live — Cursor** :
```json
{
  "version": 1,
  "hooks": {
    "afterFileEdit": [
      {
        "command": ".cursor/hooks/format.sh"
      }
    ]
  }
}
```
Avec le script `.cursor/hooks/format.sh` :
```bash
#!/bin/bash
INPUT=$(cat)
FILE=$(echo "$INPUT" | jq -r '.file')
npx prettier --write "$FILE" 2>/dev/null
exit 0
```

- Montrer en live : modifier un fichier avec l'agent → le fichier est automatiquement formaté
- Comparer les formats JSON : Cursor plus direct, Claude Code avec matcher groups

**Annotation au stylet** :
- Dessiner le flux : `Agent modifie fichier → Hook PostToolUse → Prettier → Fichier formaté`
- Entourer "exit 0" et expliquer : fail-open par défaut

---

### 7. Exemple Concret : Bloquer les Commandes Dangereuses (11:00 — 12:30) ⏱️ 1:30

**Slide** : "Exemple — Sécurité : bloquer rm -rf"

**Points à couvrir** :
- Problème : l'agent peut exécuter des commandes destructrices
- Solution : un hook `PreToolUse` / `beforeShellExecution` qui bloque les commandes dangereuses AVANT exécution

**Démo live — Claude Code** :
```bash
#!/bin/bash
# .claude/hooks/block-rm.sh
COMMAND=$(jq -r '.tool_input.command')

if echo "$COMMAND" | grep -q 'rm -rf'; then
  jq -n '{
    hookSpecificOutput: {
      hookEventName: "PreToolUse",
      permissionDecision: "deny",
      permissionDecisionReason: "Commande destructrice bloquée par un hook"
    }
  }'
else
  exit 0
fi
```
Configuration :
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "command",
            "command": ".claude/hooks/block-rm.sh"
          }
        ]
      }
    ]
  }
}
```

**Démo live — Cursor** :
```json
{
  "version": 1,
  "hooks": {
    "beforeShellExecution": [
      {
        "command": ".cursor/hooks/block-rm.sh",
        "matcher": "rm -rf"
      }
    ]
  }
}
```
- Cursor supporte un `matcher` regex directement sur la commande
- Le code de sortie `2` = bloquer l'action (équivalent de `permission: "deny"`)

- Montrer en live : demander à l'agent de supprimer un dossier → le hook bloque
- L'agent reçoit un message expliquant pourquoi l'action a été refusée et peut s'adapter

**Alternative avec un hook Prompt** (Claude Code) :
```json
{
  "hooks": {
    "PreToolUse": [
      {
        "matcher": "Bash",
        "hooks": [
          {
            "type": "prompt",
            "prompt": "Does this command look safe? Block destructive operations like rm -rf, DROP TABLE, or format commands."
          }
        ]
      }
    ]
  }
}
```
- Pas besoin d'écrire de code — juste du langage naturel
- Utilise un modèle rapide pour évaluer en quelques secondes

**Annotation au stylet** :
- Dessiner : `Agent veut rm -rf → Hook PreToolUse → ❌ BLOQUÉ → Agent reçoit le message`
- Comparer les 3 approches : Script (précis), Prompt (facile), Exit code 2 (Cursor)

---

### 8. Compatibilité Croisée (12:30 — 13:15) ⏱️ 45s

**Slide** : "Interopérabilité Cursor ↔ Claude Code"

**Points à couvrir** :
- Cursor supporte nativement le chargement des hooks Claude Code
- Les noms d'événements sont mappés automatiquement :
  - Claude Code `PreToolUse` → Cursor `preToolUse`
  - Claude Code `PostToolUse` → Cursor `postToolUse`
  - Claude Code `SessionStart` → Cursor `sessionStart`
- Cursor lit les hooks depuis les fichiers Claude Code settings
- Cela signifie : un seul jeu de hooks peut fonctionner dans les deux outils
- Contrairement aux Rules (où il fallait dupliquer), les hooks sont plus portables

**Annotation au stylet** :
- Tableau de mapping : `Claude Code (PascalCase) ↔ Cursor (camelCase)`
- Écrire "1 hook = 2 outils" en grand

---

### 9. Bonnes Pratiques (13:15 — 14:15) ⏱️ 1 min

**Slide** : "Les 6 règles d'or des Hooks"

1. **Fail-open par défaut** — Si votre hook échoue, l'agent continue. Terminez toujours par `exit 0` pour les hooks non-critiques. Réservez `exit 2` pour les blocages intentionnels.
2. **Rapides et légers** — Un hook lent ralentit tout l'agent. Gardez les hooks sous 5 secondes. Utilisez `timeout` pour les limiter.
3. **Hooks projet dans Git** — Placez les hooks de sécurité dans `.claude/settings.json` ou `.cursor/hooks.json` pour que l'équipe en profite.
4. **Commencer par Command** — Les hooks command couvrent 80% des besoins. N'utilisez prompt/agent que quand le script ne suffit pas.
5. **Tester avec des logs** — Redirigez la sortie vers un fichier de log (`>> /tmp/hooks.log`) pendant le développement.
6. **Matcher précis** — Filtrez avec des regex précis (`Write|Edit` plutôt que `.*`) pour éviter de ralentir l'agent sur chaque action.

**Annotation au stylet** : Cocher chaque point comme une checklist

---

### 10. Conclusion & Récapitulatif (14:15 — 14:45) ⏱️ 30s

**Slide** : "Récapitulatif"

- Les **Hooks** = du code qui s'exécute de façon **déterministe** à des moments clés du cycle de l'agent
- Contrairement aux Rules (suggestions), les hooks sont **garantis** à chaque exécution
- 4 types : **Command** (scripts), **Prompt** (LLM), **HTTP** (services), **Agent** (sous-agents) — les deux premiers dans les deux outils
- Exemples pratiques : auto-format, blocage de commandes, audit, sécurité
- Cursor et Claude Code partagent les mêmes concepts — avec **compatibilité croisée**
- Combinés avec les Rules, Commands et Skills, les hooks complètent l'arsenal pour maîtriser l'IA

**Call to action** : "Créez votre premier hook de formatage dès aujourd'hui !"

---

### 11. Ressources (14:45 — 15:00) ⏱️ 15s

**Slide** : "Pour aller plus loin"

- Cursor Hooks Docs : https://cursor.com/docs/agent/hooks
- Claude Code Hooks Reference : https://code.claude.com/docs/en/hooks
- Claude Code Hooks Guide : https://code.claude.com/docs/en/hooks-guide
- Cursor Third-Party Hooks : https://cursor.com/docs/reference/third-party-hooks
- Blog Anthropic — How to Configure Hooks : https://claude.com/blog/how-to-configure-hooks
- aiorg.dev — 20+ Hook Examples : https://aiorg.dev/blog/claude-code-hooks
- SmartScope — Hooks Complete Guide : https://smartscope.blog/en/generative-ai/claude/claude-code-hooks-guide/
- aiengineerguide.com — Cursor Lifecycle Hooks : https://aiengineerguide.com/blog/cursor-agent-lifecycle-hooks/

---

## Structure des Slides (pour la présentation web)

| # | Slide | Type | Durée |
|---|-------|------|-------|
| 1 | Hero — Les Hooks | Titre | 15s |
| 2 | Le Problème — Les limites des Rules | Problème | 45s |
| 3 | Qu'est-ce qu'un Hook ? | Concept | 2 min |
| 4 | Le Cycle de Vie — Les Événements | Concept | 2:30 |
| 5 | Configuration — Cursor vs Claude Code | Technique | 2 min |
| 6 | Les 4 Types de Hooks | Concept | 2 min |
| 7 | Exemple — Auto-format avec Prettier | Démo | 1:30 |
| 8 | Exemple — Bloquer les commandes dangereuses | Démo | 1:30 |
| 9 | Compatibilité croisée | Technique | 45s |
| 10 | Bonnes Pratiques | Conseils | 1 min |
| 11 | Conclusion | Récap | 30s |
| 12 | Ressources | Liens | 15s |

**Total : ~15 minutes — 12 slides**

---

## Checklist Avant Tournage

- [ ] Projet de démo ouvert dans Cursor avec `.cursor/hooks.json` configuré
- [ ] Claude Code installé avec `.claude/settings.json` contenant des hooks
- [ ] Script `format.sh` fonctionnel avec Prettier installé dans le projet
- [ ] Script `block-rm.sh` fonctionnel pour la démo sécurité
- [ ] `jq` installé et accessible dans le PATH
- [ ] Site de présentation ouvert dans le navigateur
- [ ] Stylet chargé et fonctionnel
- [ ] Tester les annotations sur la tablette/écran
- [ ] Vérifier que le partage d'écran capture les trois fenêtres (browser, Cursor, terminal)
- [ ] Micro vérifié
- [ ] Faire un dry run de 2 minutes pour le timing
- [ ] Tester que les hooks se déclenchent bien dans les deux outils avant tournage

## Notes de Production

- Alterner entre la présentation web, Cursor ET le terminal Claude Code
- Utiliser les annotations au stylet surtout pour le schéma du cycle de vie et les flux Pre/Post
- **Bien insister sur la différence Rules vs Hooks dès le début** — c'est LE concept clé
- Montrer les démos en live — le format JSON et les exit codes sont visuellement parlants
- Garder un ton dynamique et concret — les hooks sont techniques, il faut rester accessible
- Penser à zoomer sur les parties JSON importantes
- Montrer la compatibilité croisée comme un avantage pratique
- Bien expliquer le concept de `matcher` comme un filtre regex
- Montrer le `/hooks` interactif de Claude Code — plus accessible que l'édition JSON manuelle
