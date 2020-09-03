module.exports = function protectPrivateRoute(req, res, next) {
    if (req.session.currentUser) next();
    else res.redirect("/sinscrire");
};
//fonction qu'on va appeler apres pr protèger les routes accessible pr les prsn connectés uniquement