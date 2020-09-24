const express = require('express');
const router = express.Router();
const articleModel = require("./../Models/Article");
const userModel = require("./../models/User");
const uploader = require("./../config/cloudinary");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");
const protectEditorRoute = require("./../middlewares/protectEditorRoute");
const exclusifAdminEditor = require ("./../middlewares/exclusifAdminEditor");
// TESTS API POSTMAN
// router.get("/articles", (req, res) => {
//   articleModel.find()
//   .then(dbres => {
//       res.json(dbres)
//   })
// })

// router.post("/articles", (req, res) => {
//   articleModel.create(req.body)
//   .then(dbres => {
//       res.json(" is created")
//   })
// })

// dashboard
// get dashboard midlwar: si t'es en session et que t'es admin je te laisse passer sinon redirige vers s'inscrire
router.get("/dashboard", protectAdminRoute, function (req, res, next) {
  res.render('dashboard/dashboard', {
    title: 'Mon espace de gestion'
  });
});

// get dashboard midlwar: si t'es en session et que t'es editor je te laisse passer sinon redirige vers s'inscrire
router.get("/dashboard-editor", protectEditorRoute, function (req, res, next) {
  res.render('dashboard/dashboard-editor', {
    title: 'Mon espace de gestion'
  });
});



//manage articles
router.get("/dashboard/manage-articles", exclusifAdminEditor,

  (req, res, next) => {
    articleModel
      .find()
      .then((dbRes) =>
        res.render("dashboard/manage-articles", {
          articles: dbRes,
          title: "Gérer les articles",
        })
      )
      .catch(next);
  }
);
// //manage articles editor
// router.get("/dashboard/manage-article-editor", protectEditorRoute,

//   (req, res, next) => {
//     articleModel
//       .find()
//       .then((dbRes) =>
//         res.render("dashboard/manage-article-editor", {
//           articles: dbRes,
//           title: "Gérer les articles",
//         })
//       )
//       .catch(next);
//   }
// );


// /* GET  form creat articles lelement redacteur qui pointe vers la table user  */
router.get('/create-article', exclusifAdminEditor, function (req, res, next) {
 userModel
 .find()
 .then((redacteurs) =>
  res.render("dashboard/form-create-article",{ redacteurs}) 
 )
 .catch(next);

});


router.post('/article', exclusifAdminEditor,   
uploader.single("image"),
(req, res) =>{
  //eclate les clefs de req body et les stocker ds un obj new product qui va contenir le secur url qu'on vas porter a la vue
  const newArticle ={...req.body};
  if (req.file) newArticle.image =req.file.secure_url;

  console.log(req.file);
  console.log(newArticle);

  articleModel.create(newArticle)
  .then(dbRes => {
console.log(dbRes)
  })
  .catch(dbErr =>{
    console.log(dbErr)
  })
  req.flash("success", "l'Article à bien été crée.");
  //si t'es admin redirige vers le dashboard sinn vers le dashboard editor
  if (req.session.currentUser && req.session.currentUser.role === "admin")
  res.redirect("/dashboard");
  else res.redirect("/dashboard-editor");

});



//Afficher tout les article +populate, joint user et article :va chercher l'objet entier corresponsant a redacteur
router.get("/articles", (req, res) => {
  articleModel
    .find()
    .populate("redacteurs")
    .then((dbRes) => {
      console.log(">>>>", dbRes);
      res.render("articles", {
        articles: dbRes
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

// afficher les articles du partage dexperiences solo
router.get("/partagedexperiences", (req, res) => {
  articleModel
    .find()
    .then((dbRes) => {
      console.log(">>>>", dbRes);
      res.render("partagedexperiences", {
        articles: dbRes
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

// afficher les articles de conseils de pro solo
router.get("/conseilsdepro", (req, res) => {
  articleModel
    .find()
    .then((dbRes) => {
      console.log(">>>>", dbRes);
      res.render("conseilsdepro", {
        articles: dbRes
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

// afficher les articles fondamentaux solo
router.get("/fondamentaux", (req, res) => {
  articleModel
    .find()
    .then((dbRes) => {
      console.log(">>>>", dbRes);
      res.render("fondamentaux", {
        articles: dbRes
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

// afficher les articles hors lign en brouillon
router.get("/brouillon", (req, res) => {
  articleModel
    .find()
    .then((dbRes) => {
      console.log(">>>>", dbRes);
      res.render("brouillon", {
        articles: dbRes
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});
// test afficher un  seul article************************************+populate pour recup le redacteur de la table user join ds article

router.get("/art/:id", async (req, res, next) => {
 
  try {
    const article = await articleModel
    .findById(req.params.id)
    .populate("redacteurs");
    // await le resultat d'une action asynchrone
    res.render("art", { article, title: article.titre });
  } catch (dbErr) {
    next(dbErr);
  }
});



router.get("/manage-articles", protectAdminRoute, function (req, res, next) {
  
  res.render('manage-articles', {
    title: 'Manage articles'
  });
});

router.post("/article/delete/:id", protectAdminRoute, (req, res) => {
  console.log(req.params.id); //params psq y'a les : 
  articleModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      console.log(dbRes)
      res.redirect("/dashboard/manage-articles");
    })
    .catch(dbErr => console.error(dbErr))
});

//va chercher le redacteurs qui est lusernam ds la table article joint à la table user
router.get("/article/edit/:id", protectAdminRoute, (req, res) => {
  articleModel
    .findById(req.params.id) //donnee de l url
    .then(article => {
      userModel.find().then((redacteurs) => {
         res.render("dashboard/form-edit-article", {
        article,
        redacteurs,
      });
     
      });

    })
    .catch(dbErr => console.error(dbErr))
});

// router.post("/article/edit/:id", protectAdminRoute, uploader.single("image"), (req, res) => {
//   articleModel
//   .findByIdAndUpdate(req.params.id, req.body)
//     .then(dbRes =>
      
//     res.redirect("/dashboard/manage-articles"))
    
//     .catch(dbErr => console.error(dbErr))

// });

router.post("/article/edit/:id", protectAdminRoute, 
uploader.single("image"), 
(req, res, next) => {
  const updatedArticle = req.body;
// si on a une image pr la passer en secur url pr cloudinary
  if (req.file) updatedArticle.image = req.file.secure_url;
  articleModel
    .findByIdAndUpdate(req.params.id, updatedArticle)
    .then((updatedArticle) => {
      console.log("maj >>> ", updatedArticle);
      req.flash("success", "l'Article à bien été modifiée.");
 
      res.redirect("/dashboard/manage-articles");
    
    })
    .catch(next);
});

module.exports = router;

