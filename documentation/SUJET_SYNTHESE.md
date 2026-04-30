# Red-Tetris V5.2 — Synthèse exhaustive du sujet

---

## Vue d'ensemble

Tetris **multijoueur en réseau**, **full stack JavaScript uniquement** (TypeScript autorisé).
Pas de persistance de données. Tout vit en mémoire côté serveur.

---

## Contraintes techniques — LES PLUS IMPORTANTES

### Ce qui est INTERDIT
| Interdit | Pourquoi / Note |
|----------|-----------------|
| `this` côté **client** | Programmation fonctionnelle obligatoire côté client |
| `<TABLE>` en HTML | Utiliser grid ou flexbox |
| jQuery ou toute lib de manipulation DOM | Pas de manipulation DOM directe |
| Canvas | Interdit explicitement |
| SVG | Interdit explicitement |
| Credentials/API keys dans le repo | Utiliser `.env` + `.gitignore` → sinon **projet invalidé** |

### Ce qui est OBLIGATOIRE côté client
- **Aucun usage du mot-clé `this`** — tout doit être fonctionnel (fonctions pures, closures, arrow functions)
- Exception unique : `this` autorisé pour créer des sous-classes de `Error`
- Layouts en **CSS Grid ou Flexbox** uniquement
- SPA (Single Page Application) — aucun rechargement de page

### Ce qui est OBLIGATOIRE côté serveur
- Code **orienté objet avec prototypes** (ou classes ES6)
- Minimum 3 classes définies : **`Player`**, **`Piece`**, **`Game`**
- Tourne sur **Node.js**
- Doit servir `index.html`, `bundle.js` et les assets statiques via HTTP

---

## Stack technologique

| Couche | Technologie |
|--------|-------------|
| Backend | **Node.js** |
| Temps réel | **Socket.io** (bidirectionnel) |
| Frontend | **React** recommandé (ou Vue) |
| State management | **Redux** recommandé |
| Async Redux | `redux-thunk` ou `redux-promise` |
| Utilitaires fonctionnels | `lodash`, `ramda` (optionnels) |
| Immutabilité | `Immutable.js` ou ES spread (optionnel) |
| Bundler | Fourni par le boilerplate |
| Tests | Fourni par le boilerplate |

> **TypeScript autorisé** — c'est un superset strict de JS qui compile en JS standard.
> **pnpm** : non mentionné dans le sujet, vérifie que le boilerplate l'accepte.

---

## Architecture générale

```
Browser (React SPA)
    |
    | HTTP  →  index.html + bundle.js (chargement initial)
    | Socket.io  →  communication bidirectionnelle temps réel
    |
Node.js Server
    - Gère les Game, Player, Piece
    - Distribue les pièces
    - Met à jour les spectres
    - Boucle asynchrone via socket.io
```

---

## URL / Routing

Format d'URL :
```
http://<server_ip>:<port>/<room>/<player_name>
```

- `room` : nom de la partie à rejoindre
- `player_name` : pseudo du joueur
- Utiliser **`BrowserRouter`** ou **`MemoryRouter`** pour la gestion des routes

> **Différence avec les versions précédentes :** ce n'est pas du hash-routing (`#room:player`), c'est une vraie route URL.

---

## Gameplay — Règles exactes

### La grille
- **10 colonnes × 20 lignes** par joueur
- Chaque joueur a **sa propre grille**

### Les pièces (Tetriminos)
- 7 formes originales (I, O, T, S, Z, J, L) avec leurs règles de rotation officielles
- La séquence de pièces est **générée côté serveur**
- **Tous les joueurs d'une même partie reçoivent les mêmes pièces dans le même ordre** — même si à des moments différents

### Mouvements disponibles
| Touche | Action |
|--------|--------|
| ← → | Déplacement horizontal |
| ↑ | Rotation |
| ↓ | Soft drop (chute accélérée) |
| Espace | Hard drop (chute instantanée) |

### Physique des pièces
- Les pièces tombent à **vitesse constante**
- Quand une pièce touche le tas existant, elle ne se fige qu'au **frame suivant** (permet les ajustements de dernière seconde)

### Complétion de lignes
- Compléter **N lignes** → les adversaires reçoivent **N-1 lignes de pénalité indestructibles** au bas de leur grille
- Pas de système de score dans la partie obligatoire
- **Le dernier joueur encore en vie gagne**

### Modes supportés
- **Solo** (1 joueur seul dans une room) : supporté
- **Multijoueur** : plusieurs joueurs dans la même room
- **Plusieurs parties simultanées** : supporté

---

## Gestion des rooms / joueurs

- Le **premier joueur** à rejoindre une room devient **host**
- Le host contrôle le **démarrage** et le **redémarrage** de la partie
- Si le host quitte, **un joueur restant prend le rôle de host**
- Une fois la partie démarrée, **aucun nouveau joueur ne peut rejoindre** jusqu'au prochain round
- Les joueurs qui arrivent en cours de partie deviennent **spectateurs**

---

## Vue "Spectrum" des adversaires

- Chaque joueur voit le **nom** et le **spectre** de ses adversaires
- Le spectre = **la hauteur de la colonne la plus haute de chaque colonne** (pas la grille complète)
- Le spectre se met à jour **en temps réel**

---

## Tests — Exigences exactes

| Métrique | Seuil minimum |
|----------|---------------|
| Statements (instructions) | **≥ 70%** |
| Functions (fonctions) | **≥ 70%** |
| Lines (lignes) | **≥ 70%** |
| Branches (chemins d'exécution) | **≥ 50%** |

- Le boilerplate fourni inclut un pipeline de tests et des exemples
- Les tests doivent être **automatisables** (pipeline CI)

> **Conséquence architecturale :** la logique de jeu (rotation, collision, pénalité) doit être dans des **fonctions pures testables**, séparées du rendu et des sockets.

---

## Boilerplate fourni

Le sujet fournit un boilerplate officiel sur GitHub : `red_tetris_boilerplate`

Il gère :
- Le lancement du serveur
- Le build des bundles JS pour le navigateur
- L'exécution des tests et la couverture

> Lire le README du boilerplate avant de partir de zéro.

---

## Partie bonus (évaluée SEULEMENT si la partie obligatoire est complète)

- Système de score
- Persistance des scores
- Nouveaux modes de jeu (pièces invisibles, gravité accrue, etc.)
- Explorer **FRP (Functional Reactive Programming)** avec `flyd`

---

## Points critiques à ne pas oublier

1. **Pas de `this` côté client** — c'est une contrainte architecturale majeure, pas juste stylistique
2. **Pas de Canvas, pas de SVG** — le rendu Tetris doit être fait en HTML/CSS pur (divs, grid/flex)
3. **Séquence de pièces commune** à tous les joueurs d'une room — logique serveur
4. **Spectre ≠ grille complète** — c'est juste la hauteur par colonne
5. **Host change** si le host se déconnecte — gérer ce cas
6. **Jamais de credentials dans le repo** — sinon projet invalidé automatiquement
7. **70% de couverture de tests** — tester dès le début, pas à la fin
8. **URL type `/room/player`** et non `#room:player`

---

## Structure de projet recommandée

```
red-tetris/
├── src/
│   ├── client/              # Code fonctionnel (JAMAIS de this)
│   │   ├── components/      # Composants React
│   │   ├── reducers/        # Redux reducers (fonctions pures)
│   │   ├── actions/         # Redux actions
│   │   └── index.tsx        # Point d'entrée
│   ├── server/              # Code OOP (classes Player, Piece, Game)
│   │   ├── Game.ts
│   │   ├── Player.ts
│   │   ├── Piece.ts
│   │   └── index.ts
│   └── shared/              # Constantes, logique pure partagée
│       ├── tetrominos.ts    # Formes et rotations
│       └── gameLogic.ts     # Fonctions pures (collision, lignes, etc.)
├── test/
│   ├── client/
│   └── server/
├── .env                     # Variables d'environnement (gitignored)
├── .gitignore
└── package.json
```

---

*Synthèse réalisée à partir du sujet officiel Red-Tetris V5.2*
