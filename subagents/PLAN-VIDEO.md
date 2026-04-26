# Plan de Tournage — Les sous-agents : déléguer intelligemment
## Capsule Vidéo d’environ 16 minutes (en français)

---

## Informations Générales

- **Durée** : environ 16 minutes (~15 min 30 s de contenu + marge)
- **Format** : Capsule vidéo avec site web interactif + annotations live au stylet
- **Langue** : Français
- **Présentateur** : À l’écran avec partage d’écran
- **Outils** : Cursor IDE, Claude Code (terminal), navigateur web (présentation), stylet pour annotations
- **Références vérifiées (2026)** — relire les pages le jour J pour les détails qui évoluent (champs YAML, agents intégrés, priorité des définitions) :
  - [Cursor — Subagents](https://cursor.com/docs/agent/subagents) (isolation de contexte, parallélisme, agents intégrés Explore / Bash / Browser, `.cursor/agents/`, premier plan vs arrière-plan, reprise d’agent)
  - [Anthropic — Create custom subagents (Claude Code)](https://docs.anthropic.com/en/docs/claude-code/sub-agents) (Explore, Plan, general-purpose, `/agents`, `.claude/agents/`, coût / outils)
  - [Cursor — Agent best practices](https://www.cursor.com/blog/agent-best-practices) (découpage de tâches, délégation)

---

## Déroulé détaillé

### 1. Introduction (0:00 — 0:50) ⏱️ 50 s

**Slide** : « Les sous-agents — Cursor & Claude Code »

**Points à couvrir** :

- Suite logique après Rules, Commands/Skills, Hooks et Spec-driven : **comment exécuter** le plan sans saturer une seule conversation.
- Promesse en une phrase : **déléguer des morceaux de travail à des assistants spécialisés**, chacun avec son propre contexte, pour aller plus vite et rester lucide.
- Les deux outils du cours : **Cursor** (agent dans l’IDE) et **Claude Code** (agent en terminal) — même idée, vocabulaires proches (Task, sous-agents, agents personnalisés).

**Annotation au stylet** : schéma « conversation principale → flèches → plusieurs bulles (sous-agents) → retour synthèse ».

---

### 2. Le problème — une seule conversation ne suffit pas (0:50 — 2:10) ⏱️ 1 min 20

**Slide** : « Pourquoi déléguer ? »

**Points à couvrir** :

- **Exploration bruyante** : recherche dans le dépôt, gros logs shell, captures navigateur — tout cela **encombre** le fil principal si tout reste dans le même contexte.
- **Séquence obligée** : sans parallélisme, on attend la fin d’une étape pour lancer la suivante ; sur un chantier large, le temps humain explose.
- **Tout faire avec le même prompt** : l’agent mélange recherche, design, implémentation et vérif — **moins de clarté**, plus d’erreurs et de « oubli » des contraintes métier.

**Annotation au stylet** : entourer « bruit dans le contexte » et « file d’attente séquentielle ».

---

### 3. Les trois avantages structurants (2:10 — 3:40) ⏱️ 1 min 30

**Slide** : « Parallélisme · Isolation · Spécialisation »

**Points à couvrir** :

1. **Isolation du contexte** : le sous-agent travaille dans **sa** fenêtre de contexte ; **en général**, le parent reçoit surtout une **synthèse ou un résumé structuré** — les intermédiaires volumineux ne polluent pas la conversation principale (le détail exact dépend de l’outil et du mode ; aligné doc Cursor & Anthropic).
2. **Parallélisme** : plusieurs délégations en parallèle (ex. **aligner le contrat OpenAPI** sur le code **et** mettre à jour le **README** d’intégration) quand les travaux sont **indépendants** — débit plus élevé (Cursor : plusieurs appels Task dans un même message ; Claude Code : Task en parallèle selon configuration).
3. **Spécialisation** : prompt système, outils et modèle **adaptés au rôle** (exploration en lecture seule, audit sécurité, exécution de tests) — même équipe, **comportements différents** selon la tâche.

**Annotation au stylet** : triangle ou trois colonnes avec un exemple concret par colonne.

---

### 4. Mécanisme commun — parent, délégation, retour (3:40 — 4:50) ⏱️ 1 min 10

**Slide** : « Comment ça marche ? »

**Points à couvrir** :

- Le **parent** formule une sous-tâche avec le **contexte nécessaire** dans le message de délégation — les sous-agents **reprennent à zéro** : pas d’historique implicite de la conversation parent (principe général ; le parent doit transmettre l’essentiel).
- Le sous-agent **exécute** (lecture, commandes, éditions selon les droits), puis **rend compte** au parent (**souvent** une synthèse ; selon l’outil, plus de détail peut remonter).
- Modes utiles (Cursor, doc officielle) : **premier plan** (bloquant, résultat immédiat) vs **arrière-plan** (non bloquant, suivi / reprise) — à verbaliser comme choix de productivité, pas gadget.

**Annotation au stylet** : flux « prompt ciblé → sous-agent → résumé structuré ».

---

### 5. Cursor — ce que vous devez retenir (4:50 — 6:40) ⏱️ 1 min 50

**Slide** : « Sous-agents dans Cursor »

**Points à couvrir** :

- **Agents intégrés** (sans config) : **Explore** (exploration, modèle rapide, recherches parallèles), **Bash** (sorties shell isolées), **Browser** (DOM / captures bruitées filtrées côté sous-agent) — *voir doc Cursor*.
- **Agents personnalisés** : fichiers Markdown + frontmatter YAML dans **`.cursor/agents/`** (projet) ou **`~/.cursor/agents/`** (utilisateur) ; champs clés : `name`, `description`, `model`, `readonly`, `is_background`.
- **Interop** : Cursor lit aussi **`.claude/agents/`** et **`.codex/agents/`** pour la compatibilité ; en cas de conflit de noms, **`.cursor/`** prime (doc Cursor).
- **Invocation** : délégation **automatique** selon la tâche et la `description` ; invocation **explicite** type `/verifier` dans le chat (doc Cursor).
- **Nuance coût** : plusieurs sous-agents = **plusieurs contextes** = usage tokens **multiplié** — à dire en une phrase pour rester honnêtes (tableau « bénéfice / contrepartie » de la doc Cursor).

**Annotation au stylet** : lister Explore / Bash / Browser ; entourer `description` comme levier de déclenchement.

---

### 6. Claude Code — ce que vous devez retenir (6:40 — 8:30) ⏱️ 1 min 50

**Slide** : « Sous-agents dans Claude Code »

**Points à couvrir** :

- **Outil Task** : l’agent parent lance un sous-agent typé (`Explore`, `Plan`, `general-purpose`, etc.) avec un prompt dédié ; option **arrière-plan** et **reprise** d’un agent (aligné usage courant + doc Anthropic sur les sous-agents).
- **Intégrés** : **Explore** (Haiku, lecture seule, thoroughness quick / medium / very thorough), **Plan** (mode plan, recherche sans écriture), **general-purpose** (outils complets pour tâches longues) — *doc Anthropic*.
- **Création** : commande **`/agents`** (bibliothèque, outils, modèle, couleur UI, mémoire persistante optionnelle) ; fichiers projet dans **`.claude/agents/`** (à versionner pour l’équipe).
- **Priorité des définitions** : rappel simplifié **managed > CLI `--agents` > projet > user > plugin** — confirmer l’ordre exact sur le [tableau officiel](https://docs.anthropic.com/en/docs/claude-code/sub-agents) au moment du tournage.
- **Distinction** : pour plusieurs agents qui **dialoguent entre sessions**, pointer **agent teams** (doc Anthropic) — hors scope détaillé de cette capsule, mais une phrase évite la confusion.

**Annotation au stylet** : « Explore = chercher sans écrire », « general-purpose = quand il faut modifier ».

---

### 7. Démo live — Cursor (8:30 — 9:10) ⏱️ 40 s

**Slide** : « Démo — Cursor »

**Démo live — ordre suggéré** :

1. Ouvrir le projet de démo dans Cursor ; montrer **`.cursor/agents/`** avec **un** fichier court (ex. `verifier.md`).
2. Montrer le frontmatter : `name`, **`description`** (phrases concrètes de routage), `readonly` si agent de vérif.
3. Dans le chat Agent : invoquer **`/verifier`** (ou le nom défini) **ou** poser une tâche qui déclenche une délégation automatique selon la `description`.
4. En une phrase : le gros du bruit (grep, gros fichiers) reste **hors** du fil principal ; ce qui remonte, **c’est surtout le résumé** (selon le flux affiché dans votre build).

**Annotation au stylet** : entourer `description` dans le fichier ; flèche « bruit → sous-agent ».

---

### 8. Démo live — Claude Code (9:10 — 9:50) ⏱️ 40 s

**Slide** : « Démo — Claude Code »

**Démo live — ordre suggéré** :

1. Terminal : lancer **`claude`** dans le dépôt ; confirmer que la session voit le projet.
2. Taper **`/agents`** : parcourir la bibliothèque (liste, types) — montrer où vivent les définitions **`.claude/agents/`** (versionner dans Git).
3. Lancer une tâche **Explore** ou **Task** ciblée (ex. « cartographier les appels à `X` sans modifier les fichiers ») pour illustrer **lecture seule** vs agent complet.
4. Mentionner **reprise** d’agent en arrière-plan si vous l’utilisez en prod (une phrase).

**Annotation au stylet** : « Explore = pas d’écriture » à côté du terminal.

---

### 9. Cursor et Claude Code — convergence pratique (9:50 — 10:40) ⏱️ 50 s

**Slide** : « Un concept, deux écosystèmes »

**Points à couvrir** :

- Même **intention produit** : sous-traiter le bruit et paralléliser.
- **Convergence des chemins** : `.claude/agents/` utilisable depuis Cursor ; bonne pratique équipe : **documenter** où vit la vérité (souvent `.cursor/agents/` + miroir ou convention interne).
- **Différences** : noms d’agents, UI, détails des modes — pas besoin de tout énumérer ; renvoyer à la doc pour les détails.

**Annotation au stylet** : deux colonnes « Cursor » / « Claude Code » avec « = isolation + Task » au milieu.

---

### 10. Patterns utiles (10:40 — 12:00) ⏱️ 1 min 20

**Slide** : « Trois patterns »

**Onglets / blocs** (comme la slide « exemples » des Hooks) :

1. **Vérificateur (sceptique)** : après une feature « terminée », sous-agent **lecture seule** + tests / checks — réduit les faux « done » (inspiré du pattern « verification » Cursor).
2. **Orchestration** : plan court → implémentation → vérif ; chaque phase peut être un sous-agent ou une étape — lien avec la capsule **Spec-driven** (tâches atomiques + délégation).
3. **Parallèle** : deux consignes **indépendantes et nommées** dans **le même** message utilisateur — ex. « Mettez à jour **`openapi.yaml`** pour refléter le nouveau endpoint **et** réécrire la section **Installation** du `README.md`. » Cela encourage l’exécution simultanée lorsque l’outil le permet (voir doc Cursor sur le parallélisme).

**Annotation au stylet** : pour chaque pattern, un exemple métier (auth, API, doc).

---

### 11. Sous-agents ou Skills ? (12:00 — 12:45) ⏱️ 45 s

**Slide** : « Quand ne pas sur-déléguer »

**Points à couvrir** :

- Reprendre la grille Cursor : sous-agents quand il faut **isolation**, **parallèle** ou **expertise multi-étapes** ; **skills** pour actions **courtes**, **répétables**, un seul contexte suffit (doc Cursor).
- Anti-patterns communs (doc Cursor) : **trop** d’agents génériques, **descriptions vagues**, prompts **interminables** — « mieux vaut 2–3 agents focalisés ».

**Annotation au stylet** : barre « Skill » vs « Sous-agent » avec exemples rapides.

---

### 12. Bonnes pratiques (12:45 — 13:45) ⏱️ 1 min

**Slide** : « Six règles d’or »

1. **Une responsabilité** par sous-agent (pas de « helper général »).
2. **`description` = signal de routage** — investir 2 minutes pour déclencher au bon moment (**précise**, pas une tartine de texte dans le corps du prompt).
3. **Prompts courts et testables** dans le corps du fichier agent.
4. **Versionner** les définitions d’équipe (`.cursor/agents/`, `.claude/agents/`).
5. **Mesurer coût / latence** : parallèle utile, mais pas systématique sur des micro-tâches.
6. **Commencer par les intégrés** (Explore, Bash, Browser / Explore, Plan) avant d’empiler des customs.

**Annotation au stylet** : checklist.

---

### 13. Conclusion (13:45 — 14:20) ⏱️ 35 s

**Slide** : « Récapitulatif »

- Déléguer = **protéger** le contexte principal, **accélérer** par le parallèle, **renforcer** la qualité par la spécialisation.
- Cursor et Claude Code : **même discipline**, chemins et outils **légèrement différents**.
- Liens avec le reste de la série : Rules/Skills posent le *quoi* ; les sous-agents aident sur le *comment exécuter sans saturer*.

**Call to action** : « Créez un agent « vérif » en lecture seule et utilisez-le après votre prochaine feature. »

---

### 14. Ressources (14:20 — 16:00) ⏱️ ~1 min 40 (dont marge)

**Slide** : « Pour aller plus loin »

- [Cursor — Subagents](https://cursor.com/docs/agent/subagents)
- [Anthropic — Sub-agents (Claude Code)](https://docs.anthropic.com/en/docs/claude-code/sub-agents)
- [Cursor — Agent best practices](https://www.cursor.com/blog/agent-best-practices)
- [Claude Code — Tools reference](https://code.claude.com/docs/en/tools-reference) (Task, etc.)

---

## Structure des Slides (site web)

| # | Slide | Type | Durée |
|---|--------|------|--------|
| 1 | Hero — Les sous-agents | Titre | 50 s |
| 2 | Pourquoi déléguer ? | Problème | 1 min 20 |
| 3 | Parallélisme · Isolation · Spécialisation | Concept | 1 min 30 |
| 4 | Comment ça marche ? | Flux | 1 min 10 |
| 5 | Cursor | Technique | 1 min 50 |
| 6 | Claude Code | Technique | 1 min 50 |
| 7 | Démo — Cursor | Démo | 40 s |
| 8 | Démo — Claude Code | Démo | 40 s |
| 9 | Un concept, deux écosystèmes | Synthèse | 50 s |
| 10 | Trois patterns | Exemples (onglets) | 1 min 20 |
| 11 | Sous-agents ou Skills ? | Décision | 45 s |
| 12 | Six règles d’or | Conseils | 1 min |
| 13 | Conclusion | Récap | 35 s |
| 14 | Ressources | Liens | marge |

**Total cible : ~16 minutes — 14 slides**

---

## Checklist Avant Tournage

- [ ] Cursor à jour ; dossier `.cursor/agents/` avec **un** agent custom court (ex. `verifier`)
- [ ] Claude Code installé ; `claude` fonctionnel ; **`/agents`** ouvert une fois pour la démo
- [ ] Exemple de prompt montrant **deux** tâches parallèles **nommées** : **OpenAPI** (`openapi.yaml`) + **README** (section concrète)
- [ ] Projet de démo avec un fichier volumineux ou des logs pour illustrer « bruit » vs sous-agent
- [ ] Site de présentation ouvert dans le navigateur
- [ ] Stylet chargé et fonctionnel
- [ ] Partage d’écran : navigateur + Cursor + terminal
- [ ] Micro vérifié
- [ ] Dry run **3 minutes** : slides 3, 5, 6, **7, 8**, 10 (patterns parallèle)

## Notes de Production

- Capsule un peu plus longue qu’une mouture « moins de 15 minutes » : le **gain** est la **double démo** (slides 7–8) ; garder les digressions courtes sur les flags avancés.
- Toujours ramener à **trois idées** : isolation, parallélisme, spécialisation.
- Insister sur le **coût tokens** quand on parallélise trop ou qu’on crée trop de sous-agents génériques.
- Mentionner **nested subagents** uniquement si pertinent : Cursor doc (2.5+) ; en mode Plan Claude Code, nuances de nesting selon doc Anthropic — **une phrase** pour éviter l’erreur.
- Cohérence visuelle avec les autres capsules : **même thème sombre**, mêmes classes UI (cartes, tableaux, onglets).
- **Exactitude** : valider chemins, champs YAML et ordre de priorité Claude Code sur la doc du jour avant enregistrement.
