module.exports = function exposeLoginStatus(req, res, next) {
  if (!req.session.currentUser) {
    // il n'y pas d'user correspondant à ce client stocké en session
    res.locals.currentUser = undefined; // les variables suivantes sont dispos pour le template
    res.locals.isLoggedIn = false;
    res.locals.isAdmin = false;
    res.locals.isEditor = false;

  } else {
    // l'user correspondant à ce client est bien stocké en session
    res.locals.currentUser = req.session.currentUser;
    res.locals.isLoggedIn = true;
    //on defini le role des current user pour pouvoir gérer les connexions 
    res.locals.isAdmin = req.session.currentUser.role === "admin";
    res.locals.isEditor = req.session.currentUser.role === "editor";
    res.locals.isUser = req.session.currentUser.role === "user";

  }
  next();
};
