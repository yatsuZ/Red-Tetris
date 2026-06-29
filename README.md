# Red-Tetris

Premier projet post tronc commun de 42.
Objectif : développer un jeu Tetris multijoueur en réseau en JavaScript Full Stack.

---

## Dépendances système requises

Avant de lancer quoi que ce soit, il faut avoir installé sur la machine :

| Outil | Version minimale | Installation |
|-------|-----------------|--------------|
| **Node.js** | >= 20.x (LTS) | https://nodejs.org ou via `nvm` |
| **pnpm** | 10.33.0 | `npm install -g pnpm@10.33.0` |
| **make** | n'importe | fourni par défaut sur Linux/macOS |

### Installer Node.js via nvm (recommandé)

```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.7/install.sh | bash
# relancer le terminal, puis :
nvm install --lts
nvm use --lts
```

### Installer pnpm

```bash
npm install -g pnpm@10.33.0
```

---

## Installation du projet

```bash
make install
```

Cette commande installe toutes les dépendances Node du projet via pnpm.

---

## Commandes disponibles

| Commande | Description |
|----------|-------------|
| `make install` | Installe les dépendances |
| `make dev` | Lance le serveur ET le client en mode développement |
| `make dev_server` | Lance uniquement le serveur |
| `make dev_client` | Lance uniquement le client (Vite) |
| `make test` | Lance les tests (Vitest) |

---

## Configuration

Copier le fichier `.env.template` en `.env` dans le dossier `code/` et remplir les valeurs :

```bash
cp .env.template code/.env
```

---

## Stack technique

- **Backend** : Node.js + Fastify + Socket.io
- **Frontend** : React 19 + TypeScript (sans `this` côté client)
- **Tests** : Vitest + coverage V8 (objectif : 70% de couverture)
- **Build** : Vite 8
- **Gestionnaire de paquets** : pnpm 10.33.0
