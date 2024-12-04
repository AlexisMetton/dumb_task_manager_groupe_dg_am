const Task = require('../models/task');

module.exports = {
    getAllByUser: async (req, res) => {
        try {
            const tasks = await Task.getAllByUser(req.user.id);
            res.render('dashboard', { tasks, user: req.user });
        } catch (err) {
            res.status(500).send('Erreur lors de la récupération des tâches.');
        }
    },

    createTask: async (req, res) => {
        const { title, description, completed = false } = req.body;
        try {
            const task = await Task.create({ title, description, completed, user_id: req.user.id });
            res.redirect('/tasks');
        } catch (err) {
            res.status(500).send('Erreur lors de la création de la tâche.');
        }
    },

    updateTask: async (req, res) => {
        const { id } = req.params;
        const { title, description, completed } = req.body;
        try {
            const task = await Task.update(id, { title, description, completed });
            res.json(task);
        } catch (err) {
            res.status(404).send(err.message);
        }
    },

    deleteTask: async (req, res) => {
        const { id } = req.params;
        try {
            await Task.delete(id);
            res.redirect('/tasks');
        } catch (err) {
            res.status(404).send(err.message);
        }
    },
};
