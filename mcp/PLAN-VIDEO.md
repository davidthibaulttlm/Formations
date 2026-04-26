# Plan de Tournage — MCP (Model Context Protocol)
## Capsule Vidéo d’environ 18 minutes (en français)

---

## Informations Générales

- **Durée** : ~18 minutes
- **Format** : Capsule vidéo avec site web interactif + annotations live au stylet
- **Langue** : Français
- **Présentateur** : À l’écran avec partage d’écran
- **Outils** : Cursor IDE, terminal (Node ou Python), navigateur web (présentation + spec MCP), stylet pour annotations

---

## Références & standards (recherche)

Les points ci-dessous s’alignent sur la **spécification MCP** publiée sur [modelcontextprotocol.io](https://modelcontextprotocol.io/specification/latest) (messages **JSON-RPC 2.0**, connexions **avec état**, négociation des capacités) et sur les guides des **SDK officiels** (TypeScript : [`@modelcontextprotocol/server`](https://github.com/modelcontextprotocol/typescript-sdk), transports **stdio** et **Streamable HTTP**).

---

## Déroulé Détaillé

### 1. Introduction (0:00 — 0:50) ⏱️ 50 s

**Slide** : « MCP — Model Context Protocol »

**Points à couvrir** :

- Rappel de la série : Rules, Commands/Skills, Hooks, Spec-Driven — aujourd’hui : **brancher l’IA sur vos données et vos systèmes** de façon standardisée.
- Promesse : comprendre **ce qu’est** le MCP, **comment ça fonctionne**, et **écrire un serveur MCP** de A à Z.
- Le MCP est un **protocole ouvert** (pas un produit unique) — plusieurs hôtes (Cursor, Claude Desktop, etc.) parlent le même langage avec les serveurs.

**Annotation au stylet** : Rules → Skills → Hooks → Spec → **MCP (connexion monde extérieur)**

---

### 2. Le problème — intégrations fragmentées (0:50 — 2:20) ⏱️ 1 min 30

**Slide** : « Pourquoi le MCP existe »

**Points à couvrir** :

- Avant : un connecteur **par** outil, **par** API, souvent du JSON ad hoc et de la maintenance dupliquée.
- Besoin : un **contrat unique** entre l’application LLM (hôte) et les extensions (serveurs) — comme le **LSP** a standardisé les éditeurs pour les langages.
- Le MCP : **contexte** (données), **outils** (actions), **prompts** (gabarits) — toujours via les mêmes primitives protocolaires.

**Annotation au stylet** : Dessiner « N intégrations » → une **prise MCP standard**

---

### 3. Définition — Qu’est-ce que le MCP ? (2:20 — 4:00) ⏱️ 1 min 40

**Slide** : « Model Context Protocol »

**Points à couvrir** :

- Protocole ouvert pour connecter des **applications LLM** à des **sources de données**, **APIs** et **outils**.
- Couche applicative : échange de messages **JSON-RPC 2.0** (UTF-8), sessions **avec état**, annonce et négociation des **capacités** (capabilities).
- Inspiré du **Language Server Protocol** — même idée : écosystème d’outils interopérables.
- Citations utiles à l’écran : spec officielle [modelcontextprotocol.io/specification/latest](https://modelcontextprotocol.io/specification/latest).

**Annotation au stylet** : Écrire **JSON-RPC** + **stateful** + **capabilities**

---

### 4. Architecture — Hôte, client, serveur (4:00 — 5:40) ⏱️ 1 min 40

**Slide** : « Les trois rôles »

**Points à couvrir** :

- **Hôte** : l’application (IDE, chat…) qui **orchestr**e, impose les politiques de **sécurité** et le **consentement** utilisateur.
- **Client MCP** : morceau dans l’hôte qui **ouvre une session** vers un serveur (un client par connexion serveur typiquement).
- **Serveur MCP** : processus ou service qui **expose** ressources, outils, prompts.
- Message clé : la **confiance** et les autorisations sont du côté **hôte** — le protocole ne remplace pas une revue de sécurité.

**Annotation au stylet** : Schéma Hôte → Client(s) → Serveur(s)

---

### 5. Primitives côté serveur (5:40 — 7:30) ⏱️ 1 min 50

**Slide** : « Ressources, outils, prompts »

**Points à couvrir** :

- **Resources** : données adressables (URI), lecture pour enrichir le contexte — « ce que le modèle peut consulter ».
- **Tools** : actions invocables par le modèle (souvent avec **approbation** utilisateur dans l’hôte) — « ce que le modèle peut déclencher ».
- **Prompts** : modèles de messages / workflows réutilisables — « ce que l’utilisateur ou le client peut instancier ».
- Renvoi vers la doc conceptuelle MCP (*server concepts*) pour les nuances (templates de ressources, métadonnées, etc.).

**Annotation au stylet** : Tableau 3 colonnes : lire | agir | modèle de prompt

---

### 6. Capacités côté client (optionnel mais utile) (7:30 — 8:30) ⏱️ 1 min

**Slide** : « Ce que le serveur peut demander au client »

**Points à couvrir** :

- **Sampling** : le serveur peut demander des complétions LLM via le client (boucles agentiques) — **sous contrôle** utilisateur.
- **Roots** : ancres (fichiers, URIs) pour limiter la portée des accès.
- **Elicitation** : demander des infos complémentaires à l’utilisateur via l’hôte.

**Annotation au stylet** : Flèche « serveur → client » pour sampling / elicitation

---

### 7. Transports & cycle de vie (8:30 — 10:00) ⏱️ 1 min 30

**Slide** : « stdio vs HTTP streamable »

**Points à couvrir** :

- **stdio** : processus local lancé par l’hôte (stdin/stdout) — cas le plus courant pour Cursor / Claude Desktop.
- **Streamable HTTP** : serveur distant, sessions **stateful** ou **stateless** selon configuration (ID de session, reprise…).
- Séquence typique : `initialize` → négociation des capacités → opérations (`tools/list`, `tools/call`, `resources/read`, etc.).
- Les détails exacts des méthodes : renvoyer à la spec **Base Protocol** / **Lifecycle** sur modelcontextprotocol.io.

**Annotation au stylet** : Deux boîtes « local stdio » | « réseau HTTP »

---

### 8. Sécurité & confiance (10:00 — 11:15) ⏱️ 1 min 15

**Slide** : « Pouvoir = responsabilité »

**Points à couvrir** (aligné sur la spec *Security and Trust & Safety*) :

- **Consentement** explicite : l’utilisateur doit comprendre données exposées et outils invoqués.
- **Outils = exécution** : traiter les descriptions d’outils comme **non fiables** si le serveur n’est pas de confiance.
- **Données** : pas d’exfiltration sans consentement ; contrôles d’accès côté hôte.
- **Sampling** : approbation des requêtes LLM initiées par le serveur.

**Annotation au stylet** : Liste courte « consentement / confiance serveur / limiter roots »

---

### 9. Créer un serveur — Vue d’ensemble (11:15 — 12:30) ⏱️ 1 min 15

**Slide** : « Les 3 étapes (SDK TypeScript) »

**Points à couvrir** :

1. Instancier un **`McpServer`** (nom, version, `instructions` optionnelles pour guider l’usage).
2. Enregistrer **tools** / **resources** / **prompts** (schémas d’entrée : **Zod v4** ou autre *Standard Schema* avec le SDK actuel).
3. Choisir un **transport** (`StdioServerTransport` local ou `NodeStreamableHTTPServerTransport` pour HTTP) puis `server.connect(transport)`.

**Scaffolding** : mentionner le dépôt **create-typescript-server** / CLI officielle pour démarrer un squelette ([github.com/modelcontextprotocol/create-typescript-server](https://github.com/modelcontextprotocol/create-typescript-server)).

**Annotation au stylet** : 1 → 2 → 3 avec « connect » à la fin

---

### 10. Exemple concret — Outil + stdio (12:30 — 14:30) ⏱️ 2 min

**Slide** : « Minimal viable server »

**Points à couvrir** :

- Exemple **registerTool** : nom, `title`, `description`, `inputSchema`, handler async qui retourne `content` (+ `structuredContent` si schéma de sortie).
- Rappel : `instructions` au niveau serveur pour les workflows (ex. « toujours lister X avant Y ») — ne pas dupliquer les descriptions d’outils.
- Montrer dans l’IDE : `package.json`, script `node dist/index.js` ou `tsx src/index.ts`, dépendances `@modelcontextprotocol/server`, `zod`.

**Onglets vidéo / site** : onglet **TypeScript** (principal) | **Python** (mention rapide du SDK Python MCP si temps — `mcp` sur PyPI, même concepts).

**Annotation au stylet** : Entourer `inputSchema` + retour `content`

---

### 11. Brancher l’hôte — Cursor & Claude (14:30 — 15:45) ⏱️ 1 min 15

**Slide** : « Configuration »

**Points à couvrir** :

- **Cursor** : `.cursor/mcp.json` (projet) et `~/.cursor/mcp.json` (global), fusion des deux ; clés `command` / `args` / `env` ; URLs pour MCP distant ; redémarrage souvent nécessaire après changement.
- **Claude Desktop** : fichier de config MCP (chemin plateforme-dépendant) avec commande + args pour lancer le binaire/serveur stdio.
- Ne jamais committer de secrets : **variables d’environnement** pour les tokens.

**Liens** : docs Cursor MCP + cookbook « building MCP server » ; doc Anthropic / MCP.

**Annotation au stylet** : `mcpServers` { `command`, `args`, `env` }

---

### 12. Bonnes pratiques (15:45 — 16:45) ⏱️ 1 min

**Slide** : « 7 règles d’or »

1. **Descriptions d’outils claires** — le modèle s’appuie dessus pour choisir et appeler.
2. **Schémas stricts** — valider toutes les entrées (Zod / JSON Schema).
3. **Idempotent quand possible** — documenter effets de bord et risques.
4. **Timeouts & erreurs** — messages d’erreur exploitables par l’agent.
5. **Principe du moindre privilège** — exposer seulement les ressources nécessaires.
6. **stdio propre** — pas de logs parasites sur stdout (cassent le JSON-RPC).
7. **Versionner & documenter** — nom de serveur, version, changelog pour les équipes.

**Annotation au stylet** : Cocher chaque point

---

### 13. Conclusion (16:45 — 17:25) ⏱️ 40 s

**Slide** : « Récapitulatif »

- MCP = **protocole ouvert** (JSON-RPC, capacités, transports stdio/HTTP).
- **Serveur** : resources, tools, prompts ; **hôte** : sécurité et consentement.
- Construction : **McpServer** + transport + `connect`.
- S’inscrit dans votre stack agents : même discipline que Rules/Skills — **contrat explicite** avec l’extérieur.

**Call to action** : « Scaffoldez un serveur, exposez un seul outil utile, branchez-le dans Cursor. »

---

### 14. Ressources (17:25 — 18:00) ⏱️ 35 s

**Slide** : « Pour aller plus loin »

- Spécification MCP : https://modelcontextprotocol.io/specification/latest  
- Documentation & apprentissage : https://modelcontextprotocol.io/  
- SDK TypeScript : https://github.com/modelcontextprotocol/typescript-sdk  
- Scaffolding : https://github.com/modelcontextprotocol/create-typescript-server  
- Anthropic — annonce MCP : https://www.anthropic.com/news/model-context-protocol  
- Cursor — MCP : https://cursor.com/docs/context/mcp et cookbook serveur  

---

## Structure des Slides (pour la présentation web)

| # | Slide | Type | Durée |
|---|-------|------|-------|
| 1 | Hero — MCP | Titre | 50 s |
| 2 | Le problème — intégrations | Problème | 1 min 30 |
| 3 | Définition — protocole ouvert | Concept | 1 min 40 |
| 4 | Architecture — hôte / client / serveur | Concept | 1 min 40 |
| 5 | Primitives — resources, tools, prompts | Types | 1 min 50 |
| 6 | Capacités client — sampling, roots | Concept | 1 min |
| 7 | Transports — stdio & HTTP | Technique | 1 min 30 |
| 8 | Sécurité & confiance | Conseils | 1 min 15 |
| 9 | Créer un serveur — 3 étapes | Workflow | 1 min 15 |
| 10 | Exemple — outil + stdio (onglets) | Exemples | 2 min |
| 11 | Brancher Cursor & Claude | Configuration | 1 min 15 |
| 12 | Bonnes pratiques | Conseils | 1 min |
| 13 | Conclusion | Récap | 40 s |
| 14 | Ressources | Liens | 35 s |

**Total : ~18 minutes — 14 slides**

---

## Checklist Avant Tournage

- [ ] Node.js LTS installé ; démo `npx` / exécution du serveur stdio OK
- [ ] Projet minimal MCP (un tool) prêt dans un dossier de démo
- [ ] Cursor : `.cursor/mcp.json` de test (sans secrets) prêt à montrer
- [ ] Onglet navigateur : spec MCP + présentation locale
- [ ] Site de présentation ouvert dans le navigateur
- [ ] Stylet chargé
- [ ] Partage d’écran : navigateur + IDE + terminal
- [ ] Micro vérifié
- [ ] Dry run 2 minutes sur les sections 9–11 (code + config)

## Notes de Production

- Insister sur la différence **hôte** (politique de confiance) vs **serveur** (capacités).
- Montrer **un** flux complet : code → lancement → apparition de l’outil dans Cursor.
- Rappeler **stdout propre** en stdio — erreur fréquente des débutants.
- Relier à la capsule **Hooks** (`beforeMCPExecution` / `afterMCPExecution`) pour les équipes Cursor.
- Ton concret : le MCP est technique, mais l’objectif est **interopérabilité** et **sécurité**, pas le jargon.
