const User = require('../models/user');

module.exports = {
    listUsers: async (req, res) => {
        try {
            const users = await User.getAll();
            res.render('admin', { users });
        } catch (err) {
            res.status(500).send('Erreur lors de la récupération des utilisateurs.');
        }
    },

    deleteUser: async (req, res) => {
        const { userId } = req.params;
        try {
            await User.delete(userId);
            res.redirect('/admin');
        } catch (err) {
            res.status(500).send('Error deleting user.');
        }
    },

    updateRoles: async (req, res) => {
        const { userId } = req.params;
        const { roles } = req.body;
        try {
            await User.updateRoles(userId, roles);
            res.redirect('/admin');
        } catch (err) {
            res.status(500).send('Error updating roles.');
        }
    },
};
