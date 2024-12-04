const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');

module.exports = {
    login: async (req, res) => {
        const { username, password } = req.body;
        try {
            const user = await User.findByUsername(username);

            if (!user) {
                return res.status(400).send('Invalid username or password.');
            }

            const isPasswordValid = await bcrypt.compare(password, user.password);

            if (isPasswordValid) {
                const token = jwt.sign(
                    { id: user.id, username: user.username, roles: user.roles },
                    process.env.JWT_SECRET,
                    { expiresIn: '2h' }
                );

                req.session.token = token;

                req.session.user = { id: user.id, username: user.username, roles: user.roles };
                res.redirect('/tasks');
            } else {
                res.status(400).send('Invalid username or password.');
            }
        } catch (err) {
            res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    },
    register: async (req, res) => {
        const { username, password, email } = req.body;
        
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            return res.status(400).json({ message: 'Veuillez renseigner une adresse email valide.' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        try {
            const existingUser = await User.findByUsernameOrEmail(username, email);

            if (existingUser) {
                return res.status(400).json({ message: 'Le nom d\'utilisateur ou l\'email existe déjà.' });
            }

            const user = await User.create({ username, password: hashedPassword, email });

            const token = jwt.sign(
                { id: user.id, username: user.username, roles: user.roles },
                process.env.JWT_SECRET,
                { expiresIn: '2h' }
            );

            req.session.token = token;

            req.session.user = { id: user.id, username: user.username, roles: user.roles || ['ROLE_USER'] };
            console.log('Session created:', req.session); 
            res.redirect('/tasks');
        } catch (err) {
            res.status(500).json({ message: 'Erreur interne du serveur.' });
        }
    },
    logout: (req, res) => {
        req.session.destroy((err) => {
            if (err) return res.status(500).send('Error logging out.');
            res.redirect('/login');
        });
    },
};
