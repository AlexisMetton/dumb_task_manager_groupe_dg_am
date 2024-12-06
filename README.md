# **Task Manager Application**

Task Manager Application est une application web permettant de gérer des tâches avec différentes fonctionnalités pour les utilisateurs authentifiés et les administrateurs. Elle utilise Node.js, Express.js, MySQL et une architecture sécurisée basée sur des sessions et des tokens JWT.

---

## **Fonctionnalités**

### Utilisateurs

- **Inscription** avec validation des emails.
- **Connexion** avec création de sessions et génération de tokens JWT.
- **Gestion des tâches** :
  - Création, modification et suppression de tâches.
  - Visualisation des tâches propres à l'utilisateur connecté.

### Administrateurs

- **Gestion des utilisateurs** :
  - Liste des utilisateurs avec leurs rôles.
  - Mise à jour des rôles des utilisateurs.
  - Suppression des utilisateurs.

---

## **Technologies utilisées**

- **Backend** : Node.js, Express.js
- **Base de données** : MySQL
- **Tests** : Jest, Supertest
- **Authentification** : Sessions (Express-session) et Tokens JWT
- **CI/CD** : GitHub Actions

---

## **Configuration du projet**

### Prérequis

1. **Node.js** (version 16 ou supérieure)
2. **MySQL** (version 8 ou supérieure)
3. **npm** (installé avec Node.js)

### Installation

1. Clonez ce dépôt :
   ```bash
   git clone https://github.com/AlexisMetton/dumb_task_manager_groupe_dg_am.git
   cd dumb_task_manager_groupe_dg_am
   ```
2. Installer les dépendances
   ```bash
   npm install
   ```
3. Configurer le fichier .env
   ```bash
    HOST=localhost
    DB_USER=root
    DB_PASSWORD=password
    DB_PORT=3306
    DATABASE=task_manager
    JWT_SECRET=your-secret-key
    SECRET=your-session-secret
    ... // voir le .env.example
   ```
4. Démarrer l'application
   ```bash
    npm run start
   ```
5. Pour lancer des tests
   ```bash
    npm test
   ```

---

## **Configuration du projet**
```
src/
├── app.js
├── config/
│   └── db.js
├── controllers/
│   ├── adminController.js
│   ├── authController.js
│   └── tasksController.js
├── middlewares/
│   ├── authenticate.js
│   └── authorizeAdmin.js
├── models/
│   ├── task.js
│   └── user.js
├── routes/
│   ├── admin.js
│   ├── auth.js
│   └── tasks.js
├── tests/
│   ├── models/
│   │   ├── task.test.js
│   │   └── user.test.js
│   └── routes/
│       ├── admin.test.js
│       ├── auth.test.js
│       └── tasks.test.js
└── views/
    ├── dashboard.ejs
    ├── login.ejs
    ├── register.ejs
    └── admin.ejs

```
