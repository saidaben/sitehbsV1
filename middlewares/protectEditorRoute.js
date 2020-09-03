module.exports = function protectEditorRoute(req, res, next) {
    if (req.session.currentUser && req.session.currentUser.role === "editor") next();
    else res.redirect("/sinscrire");
};

//fonction pr protéger les routes accessible uniquement à l'éditeur