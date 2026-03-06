# Plan de Tournage - Les Rules dans Cursor & Claude Code
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

### 1. Introduction (0:00 - 1:00) ⏱️ 1 min

**Slide** : "Les Rules dans Cursor & Claude Code"

**Points à couvrir** :
- Se présenter rapidement
- Le problème : on répète les mêmes instructions à l'IA à chaque session
- Deux outils majeurs pour coder avec Claude : **Cursor** (IDE) et **Claude Code** (CLI)
- Les deux supportent un système de Rules — mais de manière différente
- La promesse : on va voir comment configurer les deux pour qu'ils codent comme vous voulez

**Annotation au stylet** : Dessiner les deux logos côte à côte avec une flèche vers "Rules"

---

### 2. Pourquoi des Rules en équipe ? (1:00 - 2:15) ⏱️ 1:15

**Slide** : "L'importance des Rules en équipe"

**Points à couvrir** :
- Sans rules : chaque développeur donne des instructions différentes à l'IA
- L'IA génère du code incohérent entre les membres de l'équipe
- Avec rules : standards partagés, versionnés dans Git
- Analogie : les rules sont comme un ESLint/Prettier mais pour l'IA
- Point clé : les deux outils lisent `CLAUDE.md` et `AGENTS.md` — c'est la base commune

**Annotation au stylet** :
- Schéma de 3 développeurs sans rules → code chaotique
- Même schéma avec rules au centre → code cohérent
- Écrire "CLAUDE.md = la base commune" en grand

---

### 3. Cursor vs Claude Code — L'architecture (2:15 - 3:45) ⏱️ 1:30

**Slide** : "Deux outils, deux approches"

**Points à couvrir** :

**Cursor** :
- IDE graphique avec interface visuelle
- Rules dans `.cursor/rules/*.mdc`
- Fichiers `.mdc` avec frontmatter YAML (globs, description, alwaysApply)
- 4 types : Always, Intelligently, Specific Files, Manually
- User Rules dans Settings → Rules
- Lit aussi `CLAUDE.md` et `AGENTS.md` automatiquement

**Claude Code** :
- CLI dans le terminal
- Hiérarchie de mémoire à 6 niveaux :
  1. Managed Policy (organisation)
  2. Project CLAUDE.md (racine projet)
  3. Project Rules `.claude/rules/*.md`
  4. User `~/.claude/CLAUDE.md`
  5. Local `CLAUDE.local.md` (personnel, gitignored)
  6. Auto Memory (apprentissage automatique)
- Rules avec frontmatter `paths` pour ciblage conditionnel
- Commande `/memory` pour la mémoire automatique

**Ce qu'ils ont en commun** :
- Les deux lisent `CLAUDE.md` à la racine
- Les deux lisent `AGENTS.md`
- Les deux supportent des rules modulaires dans des sous-dossiers
- Les deux sont versionnables dans Git

**Annotation au stylet** : Deux colonnes avec les architectures, entourer les points communs

---

### 4. Comment créer des Rules (3:45 - 5:30) ⏱️ 1:45

**Slide** : "Créer vos premières Rules"

**Démo live — Cursor** :
1. Ouvrir la Command Palette (Ctrl+Shift+P)
2. Taper "New Cursor Rule"
3. Montrer les 4 types et choisir "Always Apply"
4. Écrire une rule de démo (conventions TypeScript)
5. Montrer le fichier créé dans `.cursor/rules/`

**Démo live — Claude Code** :
1. Ouvrir un terminal avec Claude Code
2. Créer `CLAUDE.md` à la racine — montrer qu'il est lu au démarrage
3. Créer `.claude/rules/code-style.md` avec frontmatter `paths`
4. Montrer la commande `/memory` pour voir les auto-mémoires
5. Montrer `CLAUDE.local.md` pour les préférences perso

**Annotation au stylet** :
- Cursor : encadrer le UI de sélection des types
- Claude Code : entourer le frontmatter `paths` comme équivalent des globs

---

### 5. Le grand comparatif (5:30 - 6:45) ⏱️ 1:15

**Slide** : "Rules vs CLAUDE.md vs AGENTS.md vs Skills"

**Points à couvrir** :

| | Cursor Rules | Claude Code Rules | CLAUDE.md | AGENTS.md | Skills |
|---|---|---|---|---|---|
| **Outil** | Cursor | Claude Code | Les deux | Universel | Cursor |
| **Dossier** | `.cursor/rules/` | `.claude/rules/` | Racine | Racine | `.cursor/skills/` |
| **Format** | `.mdc` + YAML | `.md` + YAML | Markdown | Markdown | `.md` structuré |
| **Ciblage** | globs, 4 types | paths (globs) | Global | Global | @mention |
| **Mémoire auto** | Non | Oui (`/memory`) | Non | Non | Non |

**Message clé** :
- `CLAUDE.md` / `AGENTS.md` = base commune, compatible partout
- `.cursor/rules/` = spécifique Cursor, avec UI intégrée
- `.claude/rules/` = spécifique Claude Code, avec hiérarchie de mémoire
- Les deux coexistent dans un même projet !

**Annotation au stylet** : Dessiner un Venn diagram Cursor ↔ Claude Code avec CLAUDE.md au centre

---

### 6. Exemples Pratiques (6:45 - 7:45) ⏱️ 1 min

**Slide** : "Exemples concrets — Cursor vs Claude Code"

**Démo live** : Ouvrir le projet de démo et montrer côte à côte :

1. **Cursor** : `.cursor/rules/code-style.mdc` avec frontmatter `globs`
   - Montrer comment il s'active automatiquement sur les fichiers `.tsx`

2. **Claude Code** : `.claude/rules/code-style.md` avec frontmatter `paths`
   - Montrer le même contenu, format légèrement différent

3. **Commun** : Le `CLAUDE.md` à la racine, lu par les deux outils

**Annotation au stylet** : Entourer les différences de format entre les deux

---

### 7. Migration depuis un CLAUDE.md monolithique (7:45 - 8:30) ⏱️ 0:45

**Slide** : "Votre CLAUDE.md est devenu un monstre ?"

**Points à couvrir** :
- Signe d'alerte : CLAUDE.md de plus de 300 lignes
- Problème : trop d'instructions = l'IA en ignore certaines (limite ~150-200 instructions)
- Solution en 3 étapes :
  1. **Identifier les catégories** : style, tests, API, architecture
  2. **Extraire** dans le dossier rules de votre outil :
     - Cursor → `.cursor/rules/`
     - Claude Code → `.claude/rules/`
     - Ou les deux si votre équipe utilise les deux !
  3. **Garder** dans CLAUDE.md uniquement l'essentiel (stack, commandes, fichiers clés)

**Annotation au stylet** :
- Dessiner un gros bloc "CLAUDE.md 500 lignes"
- Flèches vers les deux dossiers de rules

**Avant** :
```
CLAUDE.md (500 lignes)  ← tout mélangé
```

**Après** :
```
CLAUDE.md (50 lignes — stack + commandes)
.cursor/rules/          ← pour Cursor
├── code-style.mdc
├── testing.mdc
└── api-patterns.mdc
.claude/rules/          ← pour Claude Code
├── code-style.md
├── testing.md
└── api-patterns.md
```

---

### 8. User-Level Rules (8:30 - 9:15) ⏱️ 0:45

**Slide** : "Vos préférences personnelles partout"

**Points à couvrir** :

**Cursor** :
- Cursor Settings → Rules → User Rules
- S'appliquent à TOUS vos projets dans Cursor
- Priorité : Team Rules > Project Rules > User Rules

**Claude Code** :
- Fichier `~/.claude/CLAUDE.md`
- S'applique à tous vos projets dans Claude Code
- Bonus : `CLAUDE.local.md` pour les préférences perso d'un projet (auto-gitignored)
- Commande `/memory` pour voir/gérer la mémoire automatique

**Exemples communs** :
- "Réponds en français"
- "Sois concis, pas d'explications sauf si demandé"
- "Préfère les early returns"
- Ne PAS y mettre des règles spécifiques à un projet

**Annotation au stylet** : Schéma User Rules → s'applique à Projet A, B, C (pour les deux outils)

---

### 9. Bonnes Pratiques (9:15 - 9:45) ⏱️ 0:30

**Slide** : "Les 7 bonnes pratiques"

1. **Versionner** les rules dans Git → l'équipe en profite
2. **Commencer petit** → ajouter une rule quand l'agent fait 2× la même erreur
3. **Être spécifique** → "Use named exports" plutôt que "Write clean code"
4. **Inclure le pourquoi** → l'IA suit mieux quand elle comprend la raison
5. **Garder sous 500 lignes** par fichier de rule
6. **Penser multi-outils** → CLAUDE.md comme base commune, rules spécifiques en complément
7. **Tester** → vérifier que l'agent respecte réellement les rules dans les deux outils

**Annotation au stylet** : Cocher chaque point comme une checklist

---

### 10. Conclusion & Récapitulatif (9:45 - 10:00) ⏱️ 0:15

**Slide** : "Récapitulatif"

- Les rules = la clé pour un workflow IA cohérent, quel que soit l'outil
- `CLAUDE.md` + `AGENTS.md` = la base commune entre Cursor et Claude Code
- Rules modulaires dans `.cursor/rules/` ET/OU `.claude/rules/`
- User Rules / `~/.claude/CLAUDE.md` pour vos préférences personnelles
- Les deux outils coexistent dans un même projet

**Call to action** : "Créez votre première rule dès aujourd'hui !"

---

## Checklist Avant Tournage

- [ ] Projet de démo ouvert dans Cursor avec les rules en place
- [ ] Claude Code installé et fonctionnel dans un terminal
- [ ] Vérifier que Claude Code lit bien le CLAUDE.md du projet de démo
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
- Montrer les similitudes AVANT les différences (message positif)
- Bien insister sur CLAUDE.md comme point de convergence des deux outils
