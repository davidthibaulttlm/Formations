---
paths:
  - "src/api/**/*.ts"
---

# Conventions API

## Structure des Routes
- Chaque ressource dans son propre fichier : `src/api/routes/tasks.ts`
- Utiliser le router Express
- Verbes REST : GET (liste/détail), POST (création), PUT (mise à jour), DELETE (suppression)
- Réponses JSON cohérentes avec le format ci-dessous

## Format de Réponse

### Succès
```json
{
  "success": true,
  "data": { ... }
}
```

### Erreur
```json
{
  "success": false,
  "error": {
    "code": "TASK_NOT_FOUND",
    "message": "La tâche demandée n'existe pas"
  }
}
```

## Validation
- Valider les entrées avec Zod
- Valider AVANT toute logique métier
- Retourner 400 avec les détails des erreurs de validation

## Gestion d'Erreurs
- Utiliser un middleware d'erreur centralisé
- Ne jamais exposer les erreurs internes au client
- Logger les erreurs complètes côté serveur
- Codes HTTP : 200 (OK), 201 (Created), 400 (Bad Request), 404 (Not Found), 500 (Server Error)
