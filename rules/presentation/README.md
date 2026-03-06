# Présentation — Les Rules (Cursor & Claude Code)

Site de présentation statique pour la formation. Hébergeable sur **GitHub Pages**.

## Hébergement sur GitHub Pages

### 1. Activer GitHub Pages (une seule fois)

1. Sur GitHub, ouvre ton dépôt.
2. Va dans **Settings** → **Pages** (menu de gauche).
3. Dans **Build and deployment** :
   - **Source** : choisis **GitHub Actions** (et non « Deploy from a branch »).

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

Une fois le déploiement terminé :

- **Dépôt public** : `https://<username>.github.io/<repo>/`
- **Dépôt avec un custom domain** : l’URL configurée dans **Settings → Pages**.

Exemple : si le dépôt s’appelle `Formations`, l’URL sera  
`https://ton-username.github.io/Formations/`.
