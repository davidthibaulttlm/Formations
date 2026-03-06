---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
---

# Standards de Tests

## Structure
- Utiliser `describe` / `it` (pas `test`)
- Nommer les tests en français : `it('devrait afficher le titre')`
- Un fichier de test par composant/module, dans le même dossier
- Nommer les fichiers : `NomDuFichier.test.ts(x)`

## Bonnes Pratiques
- Tester le comportement, pas l'implémentation
- Mocker les appels API — ne jamais appeler de vrais endpoints
- Utiliser `screen.getByRole()` plutôt que `getByTestId()` quand possible
- Chaque test doit être indépendant (pas de dépendance entre tests)

## Template de Test

```tsx
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, it, expect, vi } from 'vitest';

import { TaskCard } from './TaskCard';

describe('TaskCard', () => {
  const defaultProps = {
    title: 'Ma tâche',
    onComplete: vi.fn(),
  };

  it('devrait afficher le titre de la tâche', () => {
    render(<TaskCard {...defaultProps} />);

    expect(screen.getByText('Ma tâche')).toBeInTheDocument();
  });

  it('devrait appeler onComplete au clic sur Terminer', async () => {
    const user = userEvent.setup();
    render(<TaskCard {...defaultProps} />);

    await user.click(screen.getByRole('button', { name: /terminer/i }));

    expect(defaultProps.onComplete).toHaveBeenCalledWith('Ma tâche');
  });
});
```

## Coverage
- Objectif : > 80% de couverture sur les modules critiques
- Lancer : `npm test -- --coverage`
