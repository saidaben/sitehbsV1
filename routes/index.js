var express = require('express');
mailer = require('express-mailer');
var router = express.Router();
const nodemailer = require("nodemailer");
const mail_host = "smtp.mailtrap.io";
const mail_host_port = 2525;
const mail_user_address = "702903e55e-2a5d53@inbox.mailtrap.io";
const mail_user_name = "ce790ede60f497";
const mail_user_pass = "da89864210cda2";

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'home'
  });
});

// get blog
router.get("/blog", function (req, res, next) {
  res.render('blog', {
    title: 'Mon blog'
  });
});

//get article
router.get("/art", function (req, res, next) {
  res.render('art', {
    title: 'article'
  });
});

// get sorties
router.get("/sorties", function (req, res, next) {
  res.render('sorties', {
    title: 'trouvez une sortie à Paris',
    js: ["sortie"]
  });
});

// get livre
router.get("/livres", function (req, res, next) {
  res.render('livres', {
    title: 'trouvez un livre',
    js: ["livre"]
  });
});

// get contact
router.get("/contact", function (req, res, next) {
  res.render('contact', {
    title: 'formulaire de contact'
  });
});

//get mentions legales
router.get("/mentionslegales", function (req, res, next) {
  res.render('mentionslegales', {
    title: 'Mentions Legales'
  });
});

// ************ formulaire de contact
async function sendMail(infos) {
  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: mail_host,
    port: mail_host_port,
    secure: false, // true for 465, false for other ports
    auth: {
      user: mail_user_name, // generated ethereal user
      pass: mail_user_pass, // generated ethereal password
    },
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: ` ${infos.email} `, //  address de la prsn
    to: mail_user_address, // mon email denvoi
    subject: infos.sujet, // Subject 
    text: infos.message, // plain text body
    html: `<div>${infos.message}</div>`, // html body
  });

}

router.post("/contact", async (req, res, next) => {
  console.log(req.body);
  sendMail(req.body)
    .then(() => {
      // console.log("mail: ");
      req.flash("success", "Votre message nous à été envoyé. Il sera traité rapidement .");
      res.redirect("/contact");
    })
    .catch((err) => {
      console.error("erreur:", err);
      res.status(500).json("/contact");
    });
});



module.exports = router;