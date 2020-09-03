module.exports = function exclusifAdminEditor(req, res, next) {
    if (req.session.currentUser && req.session.currentUser.role === "editor" || "admin") next();
    else res.redirect("/sinscrire");
};

//si la personne en session est editor ou admin la route est autorisé sinn rediriger vers s'inscrire