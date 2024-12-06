# **Documentation Technique : Task Manager Application**

Bienvenue dans le projet **Task Manager Application** ! Ce document fournit toutes les informations nécessaires pour permettre à un nouveau développeur de s'intégrer rapidement et de travailler efficacement sur ce projet.

---

## **Présentation du projet**

Ce repositorty est un fork du projet suivant : [Voir le dépôt sur GitHub](https://github.com/Aherbeth/dumb_task_manager). Il s'agit d'un développement qui reccueillait énornmément de problèmes d'architecture, de sécurité, etc. Notre travail a été d'améliorer ce projet en ajoutant toutes les bonnes pratiques et fonctionnalités nécessaire afin de sécuriser et améliorer le code. vous pouvez consulter nos analyses du dépôt initial dans le dossier "Docs".


Task Manager Application est une application web permettant :
- Aux utilisateurs de gérer leurs tâches (ajouter, modifier, supprimer).
- Aux administrateurs de gérer les utilisateurs (ajouter des rôles, supprimer des utilisateurs).

L'architecture repose sur **Node.js**, **Express.js**, et **MySQL**, avec une gestion sécurisée des sessions et des tokens JWT pour l'authentification.

---

## **Configuration initiale**

### **Prérequis**
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
│       ├── adminController.test.js
│       ├── authController.test.js
│       └── tasksController.test.js
└── views/
    ├── dashboard.ejs
    ├── login.ejs
    ├── register.ejs
    └── admin.ejs

```
---

## **Fonctionnalités**

### Utilisateurs

- **Inscription** avec vérification du champs emails.
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
- **Frontend** : Tailwind
- **Base de données** : MySQL
- **Tests** : Jest, Supertest
- **Authentification** : Sessions (Express-session) et Tokens JWT
- **CI/CD** : GitHub Actions

---

## Détails techniques
### Base de données
- **Configuration** : Définie dans `src/config/db.js`
- **Tables** : 
   - **users** : Contient les données utilisateurs.
   - **tasks** : Contient les données des tâches associés à chaque utilisateur.

La base de données et les tables sont créées automatiquement au lancement du `npm run start` si elles n'existent pas au démarrage.

### Middlewares
- **Middleware `authenticate.js`** : Avant d'accéder à une page utilisateur on vérifie si l'utilisateur est bien connecté.
- **Middleware `authorizeAdmin.js`** : Avant d'accéder à l'administration, on vérifie si l'utilisateur a bien le rôle `ROLE_ADMIN`.

### Sécurité
Les sessions sont configurées avec les paramètres suivants :
- **httpOnly** : Empêche les scripts d'accéder au cookie.
- **samesite : strict** : Protège contre les attaquess CSRF.
- **maxAge** : Expiration après 2 heures.
- **secure: false** : Il faudra le mettre sur `true` si vous décidez de mettre en ligne le projet. Cela permettra que le cookie soit transmis seulement sur des connexions sécurisées (HTTPS). Puisque nous travaillons en local nous pouvons le laiser à `false`.

Les tokens JWT sont signés avec une clé secrète (`JWT_SECRET`) présent dans le fichier `.env`. Il a aussi une durée avant expiration de 2 heures.

### Tests des modèles et routes
Les tests couvrent toutes les fonctionnalités des : 
- **Modèles** : Vérification des opérations travaillant avec la base de données (comme des requêtes d'ajout, de récupération, de modification ou de suppression).
- **Contrôleurs** : Validation des fonctionnalités et de la logique métier.
- **Middlewares** : Test pout la validation d'accès à des ressources protégées.

**Comment lancer des tests**
```bash
npm test // Permet de lancer tous les tests
```
```bash
npm test:routes // Permet de lancer les tests sur le code des controllers
```
```bash
npm test:models // Permet de lancer tous les tests sur le code des modèles
```

--- 

### Tests End to End
On exécute Cypress afin de couvrir les fonctionnalités des : 
- **Index** : Vérification des links présent sur la page.
- **Login** : Vérification des links et du formulaire de login.
- **Register** : Vérification des links et du formulaire d'inscription.
- **Tasks** : Vérification de l'existance des tâches, de leur ajout et de leur suppression.

**Comment lancer des tests**
```bash
npm run test:e2e
```

---

## CI/CD avec GitHub Actions
### Workflow 1 : Tests des Modèles et Routes
Ce workflow exécute les tests unitaires et fonctionnels des modèles et des routes. Il est déclenché lors de chaque push, ou pull request sur `develop` et `main.`
Vous pouvez trouver les paramètres de ce workflow dans le dossier `.github/workflows/tests.yml`

### Workflow 2 : Tests End-to-End (E2E)
Ce workflow exécute des tests avec Cypress sur les pages `index.js`, `login.js`, `register.js` et `tasks.js`. Il est déclenché lors de chaque push, ou pull request sur `develop` et `main.`
Vous pouvez trouver les paramètres de ce workflow dans le dossier `.github/workflows/testsEndToEnd.yml`

---

## Ajout d'une nouvelle fonctionnalités
### 1. Créer une branche
```bash
git checkout -b feature/nom-fonctionnalite
```

### 2. Développer votre fonctionnalité et votre test

### 3. Envoyer vos modifications sur GitHub
```bash
git commit -m "Ajout de ma fonctionnalité"
git push origin feature/nom-fonctionnalite
```

### 4. Créer un Pull Request sur GitHub

--- 

## Bonnes pratiques
- Respectez l'architecture existante.
- Ajoutez des commentaires explicatifs si nécessaire.
- Assurez-vous que tous les tests passent avant de soumettre une Pull Request.