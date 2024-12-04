function ensureAuthenticated(req, res, next) {
    if (req.session && req.session.user) {
        // L'utilisateur est authentifié
        return next();
    } else {
        // Rediriger vers la page de connexion avec un message
        res.redirect('/login');
    }
}

module.exports = ensureAuthenticated; 