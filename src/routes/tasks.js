// @ts-nocheck

const express = require('express');
const router = express.Router();
const ensureAuthenticated = require('../middleware/authMiddleware');
const tasks = require('../models/task');

router.get('/', ensureAuthenticated, (req, res) => {
    tasks.getAllByUser(req.session.user.id, (err, tasks) => {
        if (err) {
            return res.render('task/tasks', { 
                error: 'Erreur lors de la récupération des tâches',
                tasks: [],
                user: req.session.user || null 
            });
        }
        res.render('task/tasks', { 
            tasks: tasks,
            error: null,
            user: req.session.user || null 
        });
    });
});

router.get('/delete/:id', ensureAuthenticated, (req, res) => {
    const taskId = req.params.id;
    
    tasks.delete(taskId, (err) => {
        if (err) {
            return res.render('task/tasks', { 
                error: 'Erreur lors de la suppression',
                user: req.session.user || null 
            });
        }
        res.redirect('/tasks');
    });
});

router.post('/', ensureAuthenticated, (req, res) => {
    const { title, description } = req.body;
    const userId = req.session.user.id;
    
    tasks.create({ user_id: userId, title, description, completed: 0 }, (err, task) => {
        if (err) {
            return res.render('task/tasks', { 
                error: 'Erreur lors de la création de la tâche',
                user: req.session.user || null 
            });
        }
        res.redirect('/tasks');
    });
});

router.put('/:id', ensureAuthenticated, (req, res) => {
    const taskId = req.params.id;
    const { completed } = req.body;
    
    tasks.update(taskId, { completed }, (err, updatedTask) => {
        if (err) {
            return res.status(500).json({ 
                error: 'Erreur lors de la mise à jour',
                user: req.session.user || null 
            });
        }
        res.json(updatedTask);
    });
});

router.get('/edit/:id', ensureAuthenticated, (req, res) => {
    const taskId = req.params.id;
    
    tasks.getAllByUser(req.session.user.id, (err, allTasks) => {
        if (err) {
            return res.render('task/tasks', { 
                error: 'Erreur lors de la récupération de la tâche',
                user: req.session.user || null 
            });
        }
        const task = allTasks.find(t => t.id === parseInt(taskId));
        if (!task) {
            return res.render('task/tasks', { 
                error: 'Tâche non trouvée',
                user: req.session.user || null 
            });
        }
        res.render('task/edit-task', { 
            task: task,
            error: null,
            user: req.session.user || null 
        });
    });
});

module.exports = router;
