const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const bcrypt = require("bcrypt");
const uploader = require("./../config/cloudinary");
const protectRoute = require("./../middlewares/protectPrivateRoute");
const protectAdminRoute = require("./../middlewares/protectAdminRoute");

//grace a middlwar = fonction req res next permet d'intercaller des actions
//next gestion erreur qui va mener au prochain midlwar heberge ds ww


//on cherches tout les users pr afficher les info et on populate pr afficher les fav
router.get("/profile", protectRoute, (req, res) => {
  userModel
    .find()
    .populate("favoris")
    .then((dbRes) => {
      res.render("profile", {
        title: 'mon profile',
        favoris: dbRes,
      });

    });
});



router.get("/dashboard/manage-users", protectAdminRoute, (req, res, next) => {

  // lire tous les users en db, puis render dans une vue avec une table qui liste tous les users
  userModel
    .find()
    .then((dbRes) => {
      console.log("tout mes users >>> ", dbRes);
      res.render("dashboard/manage-users", {
        users: dbRes,
        title: "Gérer les utilisateurs",
      });
    })
    .catch(next);
});

// lien dans mon form donc un get
router.get("/users/edit/:id", protectAdminRoute, (req, res, next) => {
  // récupère un user par id puis render un formulaire d'édition des roles
  userModel
    .findById(req.params.id)
    .then((dbRes) => {
      //console.log("find one user by id >>> ", dbRes);
      res.render("dashboard/form-edit-user", {
        user: dbRes,
        title: "Editer un utilisateur",
      });
    })
    .catch(next);
});


router.post("/profile/edit/infos/:id", protectRoute,
  uploader.single("avatar"),
  (req, res, next) => {
    const updatedUserInfos = req.body; // on stocke les infos postées dans cette constante
    if (
      // on vérifie la présence de tous les champs requis
      !updatedUserInfos.username ||
      !updatedUserInfos.email
    ) {
      req.flash("warning", "veuillez remplir les champs.");
    }

    if (req.file) updatedUserInfos.avatar = req.file.secure_url;
    // check la doc : https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    userModel // on update l'user par son id en fournissant les données postées
      .findByIdAndUpdate(req.params.id, updatedUserInfos, {
        new: true
      }) // attention à l'option new: true
      .then((updatedUser) => {
        req.session.currentUser = updatedUser;
        req.flash("success", "Profil mis à jours.");
        res.redirect("/profile");
      })
      .catch(next);
  }
);

router.post("/profile/edit/password/:id", protectRoute, (req, res, next) => {
  const updatedUserInfos = req.body; //  infos postées ici
  if (
    // on vérifie la présence de tous les champs requis
    !updatedUserInfos.oldPassword ||
    !updatedUserInfos.password
  ) {
    req.flash("warning", "Veuillez remplir tous les champs.");
  }
  userModel // re recup l'user par son id 
    .findById(req.params.id) // pour pouvoir comparer l'ancien mot de passe
    .then((user) => {
      //   vérifie que oldPassword est correct on compare avc compareSnc le mdp en bdd hashé et l'autre plein 
      const checkOldPassword = bcrypt.compareSync(
        updatedUserInfos.oldPassword, // password provenant du form "texte plein"
        user.password // password stocké en bdd (encrypté)
      ); // compareSync retourne true || false

      if (checkOldPassword === false) {
        // si le oldPassword renseigné n'est pas le bon
        req.flash("warning", "Mots de passe erroné.");
      } else {
        // sinn correct donc 
        const salt = bcrypt.genSaltSync(10); // on génère un sel pour renforcer le hashage
        const hashed = bcrypt.hashSync(updatedUserInfos.password, salt); // on encrypte le new mdp

        user.password = hashed; //  remplace le mdp plein par le hash
        user.save(); // et enfin on update le document user récupéré de la bdd avec les nouvelles infos
        req.flash("success", "mot de passe mis à jours.");
        //enfin on redirige
        res.redirect("/profile");
      }
    })
    .catch(next);
});

//modifier les roles 
router.post("/users/edit/:id", protectAdminRoute, (req, res, next) => {
  //  mettre à jour un user en utilisant son id (req.params)
  userModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => {
      console.log("edit one user >>>> ", dbRes);
      req.flash("success", "Le role de l'utilisateur à été mis à jour.");
      res.redirect("/dashboard/manage-users");
    })
    .catch(next);
});


//suppr le users et redirige vers deconnexion qui destroy la session
router.post("/users/delete/:id", (req, res, next) => {

  userModel
    .findByIdAndDelete(req.params.id)
    .then((dbRes) => {
      //console.log("delete one users >>> ", dbRes);
      req.flash("success", "Profil supprimé.");
      if (req.session.currentUser && req.session.currentUser.role === "admin")
        res.redirect("/dashboard");
      else
        res.redirect("/deconnexion");
    })
    .catch(next);
});

//afficher les gens de role utilisateurs
router.get("/dashboard/manage-utilisateurs", protectAdminRoute, (req, res, next) => {

  // lire tous les users en db, puis render dans une vue avec une table qui liste tous les users
  userModel
    .find()
    .then((dbRes) => {
      console.log("tout mes users >>> ", dbRes);
      res.render("dashboard/manage-utilisateurs", {
        users: dbRes,
        title: "Gérer les utilisateurs",
      });
    })
    .catch(next);
});

//afficher les gens de role editeurs
router.get("/dashboard/manage-editeurs", protectAdminRoute, (req, res, next) => {

  // lire tous les users en db, puis render dans une vue avec une table qui liste tous les users
  userModel
    .find()
    .then((dbRes) => {
      console.log("tout mes users >>> ", dbRes);
      res.render("dashboard/manage-editeurs", {
        users: dbRes,
        title: "Gérer les editeurs",
      });
    })
    .catch(next);
});
module.exports = router;