# Local Setup Guide - CVCraft

Guide complet pour cloner et configurer CVCraft sur votre PC (Windows, Mac, ou Linux).

## Prérequis

Avant de commencer, assurez-vous d'avoir installé :

### 1. Node.js (v18 ou plus récent)
- Téléchargez depuis : https://nodejs.org/
- Vérifiez l'installation :
  ```bash
  node --version
  npm --version
  ```

### 2. Git
- Téléchargez depuis : https://git-scm.com/
- Vérifiez l'installation :
  ```bash
  git --version
  ```

### 3. PostgreSQL (v12 ou plus récent)

#### Option A : Installation locale (recommandée pour le développement)
- **Windows** : https://www.postgresql.org/download/windows/
- **Mac** : https://www.postgresql.org/download/macosx/
  - Ou via Homebrew : `brew install postgresql`
- **Linux** : `sudo apt install postgresql postgresql-contrib` (Ubuntu/Debian)

Vérifiez l'installation :
```bash
psql --version
```

#### Option B : Service cloud gratuit (plus facile)
- **Neon** (recommandé) : https://neon.tech/ - Base de données PostgreSQL gratuite et hébergée
- **Supabase** : https://supabase.com/ - Alternative gratuite
- **Railway** : https://railway.app/ - Service avec tier gratuit

## Installation du Projet

### Étape 1 : Clonez le repository
```bash
git clone https://github.com/JeanJAKK/cvcraft.git
cd cvcraft
```

### Étape 2 : Installez les dépendances
```bash
npm install
```

### Étape 3 : Configurez la base de données

#### Option A : PostgreSQL local

1. **Démarrez PostgreSQL**
   - **Windows** : PostgreSQL devrait s'exécuter comme service automatiquement
   - **Mac** : `brew services start postgresql`
   - **Linux** : `sudo systemctl start postgresql`

2. **Créez une base de données**
   ```bash
   psql -U postgres
   ```
   
   Dans le terminal PostgreSQL :
   ```sql
   CREATE DATABASE cvcraft;
   \q
   ```

3. **Trouvez votre connection string**
   ```bash
   postgresql://postgres:YOUR_PASSWORD@localhost:5432/cvcraft
   ```

#### Option B : Neon (plus facile)

1. Créez un compte gratuit : https://neon.tech/
2. Créez un nouveau projet
3. Copiez la connection string qui ressemble à :
   ```
   postgresql://user:password@ep-xxx.us-east-1.neon.tech/cvcraft
   ```

### Étape 4 : Créez le fichier `.env`

À la racine du projet, créez un fichier `.env` :

```bash
# Database
DATABASE_URL=postgresql://postgres:YOUR_PASSWORD@localhost:5432/cvcraft

# Session
SESSION_SECRET=votre_clé_secrète_aléatoire_ici_au_moins_32_caractères
```

**⚠️ Important :**
- Remplacez `YOUR_PASSWORD` par votre mot de passe PostgreSQL
- Remplacez la connection string si vous utilisez Neon
- `SESSION_SECRET` doit être une chaîne aléatoire longue (au moins 32 caractères)

Pour générer une `SESSION_SECRET` aléatoire :
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Étape 5 : Initialisez la base de données

```bash
npm run db:push
```

Cette commande crée automatiquement toutes les tables nécessaires.

### Étape 6 : Démarrez l'application

```bash
npm run dev
```

Vous devriez voir :
```
> rest-express@1.0.0 dev
> NODE_ENV=development tsx server/index-dev.ts
11:00:00 AM [express] serving on port 5000
```

### Étape 7 : Ouvrez l'application

Allez à : **http://localhost:5000**

## Dépannage

### Erreur : "DATABASE_URL is not defined"
- Vérifiez que le fichier `.env` existe à la racine du projet
- Vérifiez que `DATABASE_URL` est présent dans le fichier
- Redémarrez le serveur : `npm run dev`

### Erreur : "Connection refused"
- PostgreSQL n'est pas en cours d'exécution
- **Windows** : Ouvrez Services.msc et démarrez PostgreSQL
- **Mac** : `brew services start postgresql`
- **Linux** : `sudo systemctl start postgresql`

### Erreur : "password authentication failed"
- Vérifiez que le mot de passe dans `DATABASE_URL` est correct
- Réinitialisez le mot de passe PostgreSQL si nécessaire

### Erreur : "Port 5000 already in use"
- Un autre service utilise le port 5000
- **Windows** : `netstat -ano | findstr :5000` puis tuez le processus
- **Mac/Linux** : `lsof -i :5000` puis `kill -9 <PID>`

### L'application se charge très lentement
- Cela peut être normal la première fois (Vite compile le code)
- Les recharges suivantes seront plus rapides

## Scripts disponibles

```bash
# Démarrer l'application en développement
npm run dev

# Pousser les changements de schéma à la base de données
npm run db:push

# Pousser avec force (supprime les données)
npm run db:push --force

# Générer les migrations Drizzle
npm run db:generate
```

## Structure du Projet

```
cvcraft/
├── client/           # Frontend React/TypeScript
│   ├── src/
│   │   ├── pages/    # Pages (home, builder, templates)
│   │   ├── components/
│   │   └── lib/      # Utilitaires (PDF export, etc)
├── server/           # Backend Express
│   ├── routes.ts     # API endpoints
│   ├── storage.ts    # Logique de données
│   └── index-dev.ts  # Serveur de développement
├── shared/
│   └── schema.ts     # Types et schémas partagés
├── .env              # Variables d'environnement (créer)
└── drizzle.config.ts # Configuration Drizzle ORM
```

## Déploiement

Pour déployer sur Replit :

1. Créez un compte Replit : https://replit.com/
2. Importez depuis GitHub : https://docs.replit.com/hosting/deploying-web-servers
3. La base de données PostgreSQL sera créée automatiquement
4. Appuyez sur "Run" ou "Deploy"

Votre app sera accessible via : `https://cvcraft-yourusername.replit.dev`

## Ressources

- **Replit Documentation** : https://docs.replit.com/
- **PostgreSQL Documentation** : https://www.postgresql.org/docs/
- **Neon Documentation** : https://neon.tech/docs/
- **Drizzle ORM** : https://orm.drizzle.team/docs/
- **React Documentation** : https://react.dev/

## Support

Si vous rencontrez un problème :

1. Vérifiez que tous les prérequis sont installés
2. Vérifiez le fichier `.env`
3. Consultez la section "Dépannage" ci-dessus
4. Vérifiez les logs du serveur pour les erreurs

---

**Version :** 1.0.0  
**Dernière mise à jour :** Novembre 2025
