module.exports = function exclusifAdminEditor(req, res, next) {
    if (req.session.currentUser && req.session.currentUser.role === "editor" || "admin") next();

    else {
        req.flash("warning", "Vous devez avoir des droits pour l'accès à cette fonctionnalité");
        res.redirect("/sinscrire");
    }
};

// si la personne en session est editor ou admin la route est autorisé sinn rediriger vers sinscrire