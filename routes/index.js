var express = require('express');
mailer = require('express-mailer');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('home', { title: 'home' });
});



// get blog
router.get("/blog", function (req, res, next){
  res.render('blog',{title:'Mon blog'});
});

//get article
router.get("/art", function (req, res, next){
  res.render('art',{title:'article'});
});

// get sorties
router.get("/sorties", function (req, res, next){
  res.render('sorties',{title:'trouvez une sortie à Paris'});
});

// get livre
router.get("/livres", function (req, res, next){
  res.render('livres',{title:'trouvez un livre '});
});


// get contact
router.get("/contact", function (req, res, next){
  res.render('contact',{title:'formulaire de contact'});
});

//testtt form contact

router.post('/contact', function(req, res, next){
  mailer.extend(app, {
    from: req.body.email,
    

    host: 'smtp.mailtrap.io',
    secureConnection: false,
    port: 25,
    transportMethod: 'SMTP'
  });

 app.mailer.send('email', {
  
    to: 'benadour.saida@gmail.com',
    subject: req.body.sujet,
    message: req.body.message
  }, function(err){
    if(err){
      console.log('On a une erreur!');return;
    }
    res.send('Email envoyé');
  });
});




module.exports = router;
