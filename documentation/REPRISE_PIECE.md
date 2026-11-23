# Reprise : Piece et Board

## Contexte rapide

Logique serveur de Red-Tetris, dans `code/src/server/` :

| Fichier                                        | Contenu                                                                                            |
| ---------------------------------------------- | -------------------------------------------------------------------------------------------------- |
| `class/Piece.ts`                               | Classe `Piece`                                                                                     |
| `class/Board.ts`                               | Classe `Board` (terrain)                                                                           |
| `interface/IPiece.ts`                          | `IPiece`, `PieceData`, `PieceShape`, `Matrix`, `MatrixBin`, `Rotations`, `Position`                |
| `interface/IBoard.ts`                          | `IBoard`, `BoardData`, `CellMatrix`                                                                |
| `constant/Shapes.ts`                           | `SHAPES` (7 formes + `.`, 4 rotations chacune), `ALL_SHAPES`, `ORIENTATION_SYMBOLS`                |
| `constant/Board.ts`                            | `CellType`, `LineState`, `CollisionState`, `MethodResult`, `BoardInitError`, dimensions par défaut |
| `utils/boardState.ts`                          | `allLinesAre`, `isBoardEmpty`, `isBoardFull`                                                       |
| `utils/showBoard.ts`, `utils/showCollision.ts` | Affichage debug en console                                                                         |

Tests dans `code/test/`, couverture à 100 %.

---

## Décisions architecturales prises

- **Pas de factory `spawn` dans Piece** : le constructeur est public (`new Piece(shape, position, orientation)`), c'est le Board qui décide où une pièce peut apparaître (`canSpawnPiece`).
- **La pièce ne connaît pas le terrain** : toute vérification de collision passe par le Board (`canAddPiece`).
- **Point de référence = coin haut-gauche de la matrice de la pièce.**
- **Position** : `x` = ligne, `y` = colonne (⚠️ inverse de l'habitude, renommage en `row` / `col` prévu).
- **Board avec bordures** : `realHeight = height + 4` (zone tampon au-dessus), `realWidth = width + 2` (murs). Défaut 20 × 10.
- **Board créé via `Board.create(height, width)`** (constructeur privé), ou `Board.fromData(data)` pour reconstruire / cloner.
- **Les méthodes renvoient un `MethodResult`** (`SUCCESS`, `FAIL`, `ERROR`) plutôt que de lever des erreurs, sauf `Board.create` et `addPiece` hors grille.
- **Plan : faire une version CLI** (`src/CLI/`) avant la version web pour valider la logique de jeu indépendamment du rendu.

---

## État actuel

### `Piece`

- `toData()`, `clone()`, `getMatrix()`, `getWidth()`, `getHeight()`
- `rotate()` : cycle 0 → 1 → 2 → 3 → 0, **sans vérification de collision**

### `Board`

- Création / accès : `create`, `fromData`, `initGrid`, `clone`, `toData`, `getMatrix`
- Pièces : `canSpawnPiece`, `canAddPiece` (renvoie aussi une matrice de `CollisionState`), `addPiece`
- Lignes : `clearLine(s)`, `stateLine(s)`, `createPartialLine`, `lineCellRise` (ligne de pénalité), `lineCellFall` (gravité des lignes)
- Colonnes : `highestPointColumn`, `highestPointsColumns`

---

## Ce qu'il reste à faire

1. **Déplacements de la pièce** (`shift` gauche / droite, `fall`, rotation sûre) : ils ont besoin du Board pour éviter les sorties de terrain et les collisions. À placer côté Board ou dans une future classe `Game`, en testant sur un clone avant d'appliquer.
2. **Version CLI jouable** dans `src/CLI/`.
3. Classes `Game`, `Player` et service `GameManager` (fichiers vides pour l'instant).
