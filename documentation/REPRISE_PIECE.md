# Reprise : Classe Piece

## Contexte rapide

On est en train de construire la logique serveur de Red-Tetris.
La classe `Piece` est dans `code/src/server/class/Piece.ts`.
L'interface est dans `code/src/server/interface/I_Piece.ts`.
Les formes sont dans `code/src/server/class/Shapes.ts`.

---

## Décisions architecturales prises

- **Constructor privé + factory static `Piece.spawn(shape, boardWidth)`** : on ne veut pas qu'on puisse créer une pièce à une position arbitraire de l'extérieur.
- **Point de référence = coin haut-gauche de la bounding box** (standard Tetris) : `x + col`, `y + row` pour le rendu.
- **Les dimensions du terrain sont passées en paramètre** aux méthodes qui en ont besoin, la pièce ne les stocke pas (Single Responsibility).
- **Plan : faire une version CLI** avant la version web pour valider la logique de jeu indépendamment du rendu.

---

## État actuel du code (ce qui existe)

### `I_Piece.ts` — interface actuelle
```
PieceShape = 'I' | 'J' | 'L' | 'O' | 'S' | 'T' | 'Z'
Matrix = number[][]
Rotations = [Matrix, Matrix, Matrix, Matrix]

interface I_Piece {
  readonly shape: PieceShape
  orientation: 0 | 1 | 2 | 3
  x: number
  y: number
  getMatrix(): Matrix
  rotate(): void
}
```

### `Piece.ts` — classe actuelle
- Implémente `I_Piece`
- `getMatrix()` fonctionne
- `rotate()` fonctionne (cycle 0→1→2→3→0)
- **Pas exportée** (manque `export`)
- Contient du code mort (throw après return)
- Pas de factory static, pas de clone, pas de collision

### `Shapes.ts` — état actuel
- Contient les 7 formes avec leurs 4 rotations
- **Pas typé** : TypeScript n'enforce pas que toutes les pièces sont là et que chaque valeur a 4 rotations

---

## Ce qu'il reste à faire (dans l'ordre)

### Étape 1 — Créer `I_Board.ts`
Fichier : `code/src/server/interface/I_Board.ts`

L'interface du terrain dont la pièce a besoin pour ses méthodes.
Elle doit contenir au minimum :
- `width: number` — nombre de colonnes
- `height: number` — nombre de lignes
- `grid: number[][]` — la grille elle-même (pour détecter les collisions avec les cellules occupées)

Sans ça, impossible d'écrire les méthodes de déplacement et collision.

### Étape 2 — Typer `Shapes.ts`
Ajouter une annotation de type explicite sur l'export :
```
Record<PieceShape, Rotations>
```
Cela garantit que chaque clé est une pièce valide et chaque valeur a exactement 4 matrices.
Les types `PieceShape` et `Rotations` sont déjà dans `I_Piece.ts`, il faut juste les importer.

### Étape 3 — Enrichir `I_Piece.ts`
Ajouter dans l'interface :
- `clone(): I_Piece` — crée une copie indépendante de la pièce
- `moveLeft(board: I_Board): void` — décrémente x si pas de collision/bord
- `moveRight(board: I_Board): void` — incrémente x si pas de collision/bord
- `moveDown(board: I_Board): void` — incrémente y si pas de collision/bord
- `hasCollision(board: I_Board): boolean` — vérifie si la pièce overlape une cellule occupée ou dépasse les bords
- Modifier `rotate(board: I_Board): void` — n'effectue la rotation que si elle ne cause pas de collision

Et retirer les attributs `x` et `y` publiquement mutables → les rendre `readonly` ou les encapsuler (selon ce qu'on décide).

### Étape 4 — Réécrire `Piece.ts`
- Passer le constructor en `private`
- Ajouter `static spawn(shape: PieceShape, boardWidth: number): Piece`
  - Place la pièce à `y = 0`, `x = Math.floor((boardWidth - largeur_matrice) / 2)`
- Implémenter `clone()` : retourne `new Piece(...)` avec les mêmes valeurs
- Implémenter `hasCollision(board)` : itère la matrice, vérifie chaque cellule `=== 1` contre les bords et la grille
- Implémenter `moveLeft`, `moveRight`, `moveDown` : tente via clone → vérifie collision → applique si ok
- Implémenter `rotate(board)` : tente via clone → vérifie collision → applique si ok
- Ajouter `export` devant `class Piece`
- Supprimer les `throw new Error` après les `return` (code mort)

### Étape 5 — Tests unitaires
70% de couverture obligatoire. Pour `Piece`, tester :
- `spawn` place bien la pièce au bon endroit
- `rotate` cycle correctement et ne dépasse pas le bord
- `moveLeft/Right/Down` bornés par les dimensions
- `hasCollision` détecte bien les cas limites
- `clone` retourne un objet indépendant (modifier le clone ne change pas l'original)

---

## Ordre de reprise recommandé

```
1. Créer I_Board.ts (juste l'interface, 5 lignes)
2. Typer Shapes.ts (juste ajouter l'annotation)
3. Enrichir I_Piece.ts (ajouter les signatures)
4. Réécrire Piece.ts (implémenter tout)
5. Écrire les tests
```

---

## Question ouverte (à trancher au retour)

Constructor privé → est-ce qu'on veut qu'une pièce puisse être créée **sans** `spawn` (ex: pour les tests) ?
Options :
- A) Constructor entièrement privé, tests passent par `spawn` avec un board mock
- B) Constructor privé mais avec une surcharge ou un second static `fromRaw(shape, x, y)` pour les tests uniquement
