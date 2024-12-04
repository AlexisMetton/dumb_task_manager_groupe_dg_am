const express = require('express');
const router = express.Router();
const { isAuthenticated } = require('../middlewares/authenticate');
const tasksController = require('../controllers/tasksController');

// Middleware pour protéger toutes les routes de /tasks
router.use(isAuthenticated);

// Routes pour les tâches
router.get('/', tasksController.getAllByUser);
router.post('/', tasksController.createTask);
router.put('/:id', tasksController.updateTask);
router.delete('/:id', tasksController.deleteTask);

module.exports = router;
