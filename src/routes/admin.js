const express = require('express');
const adminController = require('../controllers/adminController');
const authorizeAdmin = require('../middlewares/authorizeAdmin');
const router = express.Router();

router.use(authorizeAdmin);

router.get('/', adminController.listUsers);
router.post('/update-roles', adminController.updateRoles);
router.post('/delete/:userId', adminController.deleteUser);

module.exports = router;
