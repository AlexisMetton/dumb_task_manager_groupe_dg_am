const express = require('express');
const router = express.Router();
const users = require('../models/user');


router.get('/', (req, res) => {
    users.getAll((err, users) => {
        res.render('admin', { users: users });
    });
});

module.exports = router;