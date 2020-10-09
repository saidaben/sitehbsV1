module.exports = function protectPrivateRoute(req, res, next) {
    if (req.session.currentUser) next();
    else {
    
    req.flash("warning", "Vous devez créer un compte pour avoir accès à cette fonctionnalité");
    res.redirect("/sinscrire");}
};
//fonction qu'on va appeler apres pr protèger les routes accessible pr les prsn connectés uniquement