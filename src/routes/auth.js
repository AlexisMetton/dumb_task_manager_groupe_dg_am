const express = require('express');
const router = express.Router();
const users = require('../models/user')

// Placeholder routes for authentication
router.get('/login', (req, res) => {
    res.render('auth/login', { 
        error: null,
        user: req.session.user || null 
    });
});

router.post('/login', (req, res) => {
    users.authenticate(req.body.username, req.body.password, (user) => {
        if (user.connected) {
            req.session.user = user;
            res.redirect('/?userId=' + user.id)
        }
    })
})
router.get('/user/register', (req, res) => {
    let username = req.query.username;
    var password = req.query.password;
    let email = req.query.email;
    users.create({ username, password, email }, (err, user) => {
        if (user) {
            res.redirect('auth/login');
        } else {
            res.redirect('/')
        }
    })
})
router.get('/register', (req, res) => {
    res.render('auth/register', { 
        error: null,
        user: req.session.user || null 
    });
});

module.exports = router;
