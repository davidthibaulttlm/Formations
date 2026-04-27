# Plan de Tournage — Choisir un modèle (OpenAI & Anthropic)
## Capsule vidéo cible **&lt; 15 minutes** (en français)

> **Emplacement** : ce fichier est le plan de **cette** capsule uniquement.  
> **Ne pas** éditer `spec_driven/PLAN-VIDEO.md` (capsule Spec-Driven) pour ce sujet.

---

## Informations générales

- **Durée cible** : **12–14 min** (marge pour rester **&lt; 15 min**)
- **Périmètre** : **Uniquement OpenAI et Anthropic** (pas d’autres fournisseurs dans le script ni à l’écran)
- **Format** : Site de présentation (`model_arena/presentation/index.html`, même thème que les autres capsules) + tableaux à l’écran + stylet si utile
- **Principe données** : chiffres **uniquement** issus de sources nommées (pages de tarification API, docs modèles), date de prise en compte affichée (« à jour au … »). Pas d’invention de métriques.

---

## Objectif pédagogique

À la fin, le spectateur sait **quel type de modèle utiliser pour quel type de tâche** (coût, latence, raisonnement long, contexte, risque d’erreur) et **pourquoi**, en restant dans le cadre API / produits documentés OpenAI & Anthropic.

---

## Déroulé proposé

### 1. Introduction (0:00 — 1:00) ⏱️ ~1 min

- Problème : « gros modèle partout » = coût et lenteur inutiles ; « petit modèle partout » = erreurs sur tâches difficiles
- Annonce : grille de décision **OpenAI vs Anthropic** (et **au sein** de chaque famille : raisonnement / non-raisonnement, taille de contexte)
- Rappel : **ChatGPT / Claude.app** ≠ **API** (tarifs et limites diffèrent) — la capsule parle **surtout API** sauf mention explicite

**Slide** : titre + 3 bullets

---

### 2. Les quatre critères (cadre) (1:00 — 2:30) ⏱️ ~1 min 30

Présenter **sans chiffres inventés** les dimensions à comparer :

| Critère | Ce qu’on montre | Source type |
|--------|------------------|-------------|
| **Coût** | Prix public input/output (et cache si applicable) | Pages tarifs API OpenAI & Anthropic |
| **Vitesse** | Latence / débit **si** vous avez des mesures (bench public ou vos mesures datées) ; sinon « à mesurer sur votre charge » | Doc + éventuellement courbe de l’outil de bench utilisé |
| **Qualité / adéquation** | Tâches (code, rédaction, raisonnement, long contexte) — pas un seul score « vérité » | System cards, docs modèles, éventuellement classements publics **cités** |
| **Fiabilité / garde-fous** | Tool use, structured output, limites connues | Documentation |

**Slide** : tableau 2×2 ou 4 colonnes + une phrase : *« Les chiffres viennent des pages que je cite en bas d’écran. »*

---

### 3. OpenAI — famille de modèles (2:30 — 5:00) ⏱️ ~2 min 30

- Lire **sur la doc officielle** la distinction : modèles **généraux** vs **raisonnement** (série **o*** / équivalent documenté au moment du tournage)
- Pour chaque **famille** que tu affiches : nom API, rôle (rapide / équilibré / raisonnement profond), **prix** copiés depuis la page tarifs (date)
- Message : *raisonnement* = plus de temps / tokens possibles → **pas** pour les micro-tâches interactives

**Slide** : 1 ligne = 1 famille + colonne prix (montants exacts + URL en petit)

---

### 4. Anthropic — famille de modèles (5:00 — 7:15) ⏱️ ~2 min 15

- Même structure : **Sonnet / Opus / Haiku** (ou noms à jour sur la doc), effort de raisonnement si la doc le documente
- Tarifs **API** depuis la page Anthropic officielle (date)
- Quand privilégier Anthropic côté **usage** (ex. long document, style, politique d’usage) — **faits** issus de la doc, pas d’opinion non sourcée

**Slide** : tableau parallèle à OpenAI (même colonnes pour comparaison lisible)

---

### 5. Matrice « tâche → modèle » (7:15 — 10:00) ⏱️ ~2 min 45

Scénarios types (adapter les noms aux modèles **actuels** dans la doc) :

- **Petit changement localisé dans le code** → modèle **rapide / moins cher** (Haiku ou équivalent OpenAI « mini ») *si* le contexte est petit
- **Refactor multi-fichiers / architecture** → modèle **plus fort** + contexte large
- **Raisonnement math / logique / debug insoluble** → modèle **raisonnement** (o-série ou Extended thinking côté Claude **selon doc**)
- **Grosse base de code / doc** → modèle avec **grande fenêtre** + résumer en amont si besoin

**Slide** : grille 4 lignes (scénario → choix → **pourquoi** en une phrase)

---

### 6. Pièges à éviter (10:00 — 11:30) ⏱️ ~1 min 30

- Comparer **API** et **abonnement consumer** sans les confondre
- **Output tokens** souvent plus chers — un long JSON / longue réponse coûte plus qu’un court « oui »
- Le « meilleur modèle » sur un benchmark **n’est pas** forcément le meilleur pour **votre** latence et **votre** budget

**Slide** : 3 icônes « erreur courante »

---

### 7. Conclusion + ressources (11:30 — 12:45) ⏱️ ~1 min 15

- Règle d’or : **choisir d’abord la contrainte** (budget, délai, risque d’erreur), puis le modèle
- CTA : « Mettez à jour une fois par trimestre les prix depuis les pages officielles »
- **Ressources** (affichage 20–30 s) : liens vers tarifs OpenAI, tarifs Anthropic, pages modèles — **pas** de liste lue mot à mot

**Buffer** : garder **~1–2 min** pour débordements (Q&A interne ou répétition d’un tableau)

---

## Tableau des slides (indicatif)

| # | Segment | Durée |
|---|---------|--------|
| 1 | Intro | ~1 min |
| 2 | Quatre critères + sources | ~1 min 30 |
| 3 | OpenAI (familles + prix) | ~2 min 30 |
| 4 | Anthropic (familles + prix) | ~2 min 15 |
| 5 | Matrice tâche → modèle | ~2 min 45 |
| 6 | Pièges | ~1 min 30 |
| 7 | Conclusion + liens | ~1 min 15 |

**Total indicatif** : **~12 min 45** + marge **&lt; 15 min**

---

## Checklist avant tournage

- [ ] Pages tarifs OpenAI & Anthropic ouvertes + **date** notée pour l’overlay
- [ ] Liste des **noms de modèles API** exacts (copier-coller depuis la doc du jour)
- [ ] Décision : montrer ou non un **bench tiers** — si oui, logo + URL + date
- [ ] Slides : pas de tableau « arena » avec des scores **non** sourcés
- [ ] Dry run **10 min** avec chronomètre

## Notes de production

- Langage sobre : « on compare des **produits documentés** », pas « X est le meilleur au monde »
- Si une métrique manque : afficher **N/D** plutôt qu’une estimation
- Cohérence visuelle avec les autres capsules : réutiliser `rules/presentation`-style (variables CSS du repo) quand la démo HTML existe
