var express = require('express');
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




module.exports = router;
