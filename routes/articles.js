const express = require('express');
const router = express.Router();
const articleModel = require("./../Models/Article");
const userModel = require("./../models/User");
const uploader = require("./../config/cloudinary");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");
const protectEditorRoute = require("./../middlewares/protectEditorRoute");
const exclusifAdminEditor = require("./../middlewares/exclusifAdminEditor");
const protectRoute = require("./../middlewares/protectPrivateRoute");

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



// /* GET  form creat articles lelement redacteur qui pointe vers la table user  */
router.get('/create-article', exclusifAdminEditor, function (req, res, next) {
  userModel
    .find()
    .then((redacteurs) =>
      res.render("dashboard/form-create-article", {
        redacteurs
      })
    )
    .catch(next);

});


router.post('/article', exclusifAdminEditor,
  uploader.single("image"),
  (req, res) => {
    //eclate les clefs de req body et les stocker ds un obj new product qui va contenir le secur url qu'on vas porter a la vue
    const newArticle = {
      ...req.body
    };
    if (req.file) newArticle.image = req.file.secure_url;

    // console.log(req.file);
    // console.log(newArticle);

    articleModel.create(newArticle)
      .then(dbRes => {
        // console.log(dbRes)
      })
      .catch(dbErr => {
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
      // console.log(">>>>", dbRes);
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
      // console.log(">>>>", dbRes);
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
      // console.log(">>>>", dbRes);
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
      // console.log(">>>>", dbRes);
      res.render("fondamentaux", {
        articles: dbRes
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

// afficher les articles hors lign en brouillon
router.get("/brouillon", exclusifAdminEditor, (req, res) => {
  articleModel
    .find()
    .then((dbRes) => {
      // console.log(">>>>", dbRes);
      res.render("brouillon", {
        articles: dbRes
      });
    })
    .catch((dbErr) => {
      console.log(dbErr);
    });
});

router.get("/art/:id", async (req, res, next) => {

  try {
    const article = await articleModel
      .findById(req.params.id)
      .populate("redacteurs");
    // await le resultat d'une action asynchrone
    res.render("art", {
      article,
      title: article.titre
    });
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
  // console.log(req.params.id); //params psq y'a les : 
  articleModel
    .findByIdAndDelete(req.params.id)
    .then(dbRes => {
      // console.log(dbRes)
      req.flash("success", "l'Article à bien été supprimé.");
      res.redirect("/dashboard/manage-articles");
    })
    .catch(dbErr => console.error(dbErr))
});

//va chercher le redacteurs qui est lusernam ds la table article joint à la table user
router.get("/article/edit/:id", exclusifAdminEditor, (req, res) => {
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

// edit des articles 
router.post("/article/edit/:id", exclusifAdminEditor,
  uploader.single("image"),
  (req, res, next) => {
    const updatedArticle = req.body;
    // si on a met a jours une image pr la passer en secur url pr cloudinary
    if (req.file) updatedArticle.image = req.file.secure_url;
    articleModel
      .findByIdAndUpdate(req.params.id, updatedArticle)
      .then((updatedArticle) => {
        // console.log("maj >>> ", updatedArticle);
        req.flash("success", "l'article a bien été modifié.");

        res.redirect("/dashboard/manage-articles");

      })
      .catch(next);
  });

//manage articles partage dexperience
router.get("/dashboard/manage-partagedexperiences", exclusifAdminEditor,

  (req, res, next) => {
    articleModel
      .find()
      .then((dbRes) =>
        res.render("dashboard/manage-partagedexperiences", {
          articles: dbRes,
          title: "Gérer les partages d'expériences",
        })
      )
      .catch(next);
  }
);

//manage articles conseil de pro
router.get("/dashboard/manage-conseilsdeprofessionnels", exclusifAdminEditor,

  (req, res, next) => {
    articleModel
      .find()
      .then((dbRes) =>
        res.render("dashboard/manage-conseilsdeprofessionnels", {
          articles: dbRes,
          title: "Gérer les conseils de professionnels",
        })
      )
      .catch(next);
  }
);

//manage articles les fonda
router.get("/dashboard/manage-fondamentaux", exclusifAdminEditor,

  (req, res, next) => {
    articleModel
      .find()
      .then((dbRes) =>
        res.render("dashboard/manage-fondamentaux", {
          articles: dbRes,
          title: "Gérer les fondamentaux",
        })
      )
      .catch(next);
  }
);

//manage les brouillons
router.get("/dashboard/manage-brouillons", exclusifAdminEditor,

  (req, res, next) => {
    articleModel
      .find()
      .then((dbRes) =>
        res.render("dashboard/manage-brouillons", {
          articles: dbRes,
          title: "Gérer les brouillons",
        })
      )
      .catch(next);
  }
);

//ajouter des articles en fav (lien donc get)
router.get("/article/favoris/:id", protectRoute, async (req, res, next) => {
  //lart
  const articlefavId = req.params.id;
  //l'user co
  const idUser = req.session.currentUser._id;

  try {
    try {
      const userHasFavorite = await userModel.findOne({
        //cherche l utilisateur et le fav dedans 
        $and: [{
          _id: idUser
        }, {
          favoris: {
            $in: articlefavId
          }
        }]
      });
      //si il y est on suppr 
      let query = userHasFavorite ? {
        $pull: {
          favoris: articlefavId
        }

        //sinn on l'insert ds le tableau
      } : {
        $push: {
          favoris: articlefavId
        }
      };

      const updated = await userModel.findByIdAndUpdate(idUser, query, {
        new: true
      });

      // console.log("added", updated);
      //on mentionne a l'utilisateur et on redirige 
      req.flash("success", "Vos favoris ont été mis à jours");
      res.redirect("/articles-archives");
    } catch (err) {
      console.error(err)
    }

    // console.log(userHasFavorite);

  } catch (Err) {
    next(Err)
  }
});


//article archives favoris qui vient ds user 
router.get("/articles-archives", protectRoute,

  (req, res, next) => {
    userModel
    .findById(req.session.currentUser._id)
    .populate("favoris")
    .then((dbRes) => {
      console.log(dbRes);
      res.render("articles-archives", {
        title: 'mon profile',

        favoris: dbRes.favoris,

      });

    });
});



module.exports = router;