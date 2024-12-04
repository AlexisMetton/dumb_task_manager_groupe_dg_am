const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const db = new sqlite3.Database(path.join(__dirname, '../config/tasks.sqlite'), (err) => {
    if (err) {
        console.error('Erreur lors de la connexion à la base de données:', err);
    }
});


const User = {
    create: (user, callback) => {
        const query = 'INSERT INTO users (username, password, email) VALUES (?, ?, ?)';
        const params = [user.username, user.password, user.email];
        db.run(query, params, function (err) {
            callback(null, { id: this.lastID, ...user });
        });
    },

    getAll: (callback) => {
        db.all('SELECT * FROM users', [], (err, results) => {
            callback(results)
        })
    },

    findByUsername: (username, callback) => {
        console.log(username)
        const query = 'SELECT * FROM users WHERE username = ?';
        db.get(query, [username], (err, user) => {
            callback(err, user)
        });
    },

    authenticate: (username, password, callback) => {
        console.log(username);
        db.get("SELECT * FROM users WHERE username = ?", [username], (err, user) => {
            if (err) {
                console.error("Erreur lors de l'authentification:", err);
                return callback(null);
            }

            if (!user) {
                return callback(null);
            }

            if (user.password == password) {
                return callback({ 
                    connected: true, 
                    id: user.id,
                    username: user.username,
                    isAdmin: user.isAdmin,
                    email: user.email
                });
            } else {
                return callback({ connected: false });
            }
        });
    },

    // Récupération d'un utilisateur par ID
    findById: (id, callback) => {
        const query = 'SELECT * FROM users WHERE id = ' + id;
        db.get(query, [], (err, user) => {
            return user
        });
    }
};

module.exports = User;
