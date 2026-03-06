# Présentation — Les Rules (Cursor & Claude Code)

Site de présentation statique pour la formation. Hébergeable sur **GitHub Pages**.

## Hébergement sur GitHub Pages

### 1. Activer GitHub Pages (obligatoire avant le premier déploiement)

Sans cette étape, le workflow échoue avec : *"Get Pages site failed. Please verify that the repository has Pages enabled and configured to build using GitHub Actions"*.

1. Sur GitHub, ouvre ton dépôt.
2. Va dans **Settings** → **Pages** (menu de gauche).
3. Dans **Build and deployment** :
   - **Source** : choisis **GitHub Actions** (pas « Deploy from a branch »).
4. Enregistre (aucun bouton à cliquer si tu as juste changé le menu déroulant).
5. Relance le workflow : **Actions** → **Deploy presentation to GitHub Pages** → **Run workflow**.

### 2. Déploiement automatique

Un workflow est défini dans `.github/workflows/deploy-presentation.yml` :

- Il se déclenche à chaque push sur `main` ou `master` qui modifie `rules/presentation/` (ou le workflow lui-même).
- Tu peux aussi le lancer à la main : onglet **Actions** → **Deploy presentation to GitHub Pages** → **Run workflow**.

### 3. Structure du dépôt

Le workflow suppose que la présentation se trouve dans **`rules/presentation/`** à la racine du dépôt.

- Si ton dépôt est **Formations** (racine = contenu de Formations), c’est déjà le cas.
- Si ta racine contient un dossier **Formations** (ex. dépôt `marketing_agents`), modifie dans le workflow la ligne `path:` de l’étape « Upload artifact » en :
  ```yaml
  path: 'Formations/rules/presentation'
  ```

### 4. URL du site

**Important :** le contenu de `rules/presentation/` est déployé **à la racine** du site. Ne pas ajouter `/rules/presentation` à l’URL.

| ✅ Bonne URL | ❌ Mauvaise URL (404) |
|--------------|------------------------|
| `https://<username>.github.io/<repo>/` | `https://<username>.github.io/<repo>/rules/presentation` |

Exemple pour le dépôt `formations` :  
**👉 `https://davidthibaulttlm.github.io/formations/`**
