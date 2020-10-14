require("dotenv").config(); //recup les info de config 
require("./config/mongodb"); // database initial setup
require("./helpers/hbs"); // utils for hbs templates

// base dependencies

const express = require("express"); //permet de creer un objet 
const app = express(); //lexecution d'express
const hbs = require("hbs");
var nodemailer = require('nodemailer'); //pr le formulaire de contact

// app.use(favicon(__dirname + 'favicon.ico'));

const createError = require("http-errors");
const cookieParser = require("cookie-parser");
const flash = require("connect-flash");
//pr connecter notre appli à mongodb
const mongoose = require("mongoose");
//pr stocker les donneés en sessions id
const session = require("express-session");
const MongoStore = require("connect-mongo")(session);

//activer ou desactiv le devmode
const dev_mode = false;
//morgan est un middleware qui nous permet de consigner facilement les requêtes et les erreurs sur la console
const logger = require("morgan");
//pr les dates 
const moment = require("moment");


// config logger (pour debug)
app.use(logger("dev"));

// initial config on choisi le moteur de template hbs
app.set("view engine", "hbs");
//ou son les views
app.set("views", __dirname + "/views");
//recup les img
app.use(express.static("public"));
//on lui indique ou sont les partials
hbs.registerPartials(__dirname + "/views/partials");

//recup valeur posté ds un objet req.body 
app.use(express.json()); //async
app.use(express.urlencoded({
  extended: false
})); //synchrone




app.use(cookieParser()); //recup les cookies sous forme dobj req.cookie

// configurer la session pr garder les info en memoirs vive apres install connect flash et express session
app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
);

// config de la SESSION 
// app.use(
//   session({
//     secret: process.env.SESSION_SECRET,
//     cookie: {
//       maxAge: 60000
//     }, // en millisec
//     store: new MongoStore({
//       mongooseConnection: mongoose.connection,
//       ttl: 24 * 60 * 60, // 1 jours
//     }),
//     saveUninitialized: true,
//     resave: true,
//   })
// );

app.use(flash());

// import de middlewares customs
if (dev_mode === true) {
  app.use(require("./middlewares/devMode")); // active le mode dev pour éviter les deconnexions
  app.use(require("./middlewares/debugSessionInfos")); // affiche le contenu de la session
}
app.use(require("./middlewares/exposeLoginStatus")); // expose le status de connexion aux templates
app.use(require("./middlewares/exposeFlashMessage")); // affiche les messages dans le template

// config des routers 
app.use(require("./routes/index"));
app.use(require("./routes/articles"));
app.use(require("./routes/auth"));
app.use(require("./routes/users"));

// below, site_url is used in partials/shop_head.hbs to perform ajax request (var instead of hardcoded)
//on lui indique ou ecouter
app.locals.site_url = process.env.SITE_URL;



// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// erreur 500
app.use(function (error, req, res, next) {
  res.send('Sorry...Cette page est inexistante', 500);

});

// //  500 en custom 
// app.use(function(error, req, res, next) {
//   res.status(500);
// res.render('500.hbs', {title:'500: Cette page est inexistante', error: error});
// });


// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};
  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;