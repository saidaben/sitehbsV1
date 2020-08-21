const express = require("express");
const router = new express.Router();
const userModel = require("./../models/User");
const bcrypt = require("bcrypt");
const uploader = require("./../config/cloudinary");
 const protectRoute = require("./../middlewares/protectPrivateRoute");
 const protectAdminRoute = require("./../middlewares/protectAdminRoute");

//grace a middlwar = fonction req res next permet d'intercaller des actions
//next gestion erreur qui va mener au prochain midlwar heberge ds ww


router.get("/profile", protectRoute, (req, res) => {
  res.render("profile", { title: 'mon profile' }
    
  );
});

router.get("/dashboard/manage-users",protectAdminRoute, (req, res, next) => {
  
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
router.get("/users/edit/:id",protectAdminRoute, (req, res, next) => {
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


router.post(
  "/profile/edit/infos/:id",protectRoute,
  uploader.single("avatar"),
  (req, res, next) => {
    const updatedUserInfos = req.body; // on stocke les infos postées dans cette constante
    if (
      // on vérifie la présence de tous les champs requis
      !updatedUserInfos.username ||
      !updatedUserInfos.email
    ) {
      // todo => return message erreur
    }

    if (req.file) updatedUserInfos.avatar = req.file.secure_url;
    // check la doc : https://mongoosejs.com/docs/api.html#model_Model.findByIdAndUpdate
    userModel // on update l'user par son id en fournissant les données postées
      .findByIdAndUpdate(req.params.id, updatedUserInfos, { new: true }) // attention à l'option new: true
      .then((updatedUser) => {
        req.session.currentUser = updatedUser;
        res.redirect("/profile");
      })
      .catch(next);
  }
);

router.post("/profile/edit/password/:id",protectRoute, (req, res, next) => {
  const updatedUserInfos = req.body; // on stocke les infos postées dans cette constante
  if (
    // on vérifie la présence de tous les champs requis
    !updatedUserInfos.oldPassword ||
    !updatedUserInfos.password
  ) {
    // todo => return message erreur
  }
  userModel // on cherche l'user par son id
    .findById(req.params.id) // pour pouvoir comparer l'ancien pot de passe
    .then((user) => {
      // si la promesse est tenue, on vérifie que oldPassword est correct
      const checkOldPassword = bcrypt.compareSync(
        updatedUserInfos.oldPassword, // password provenant du form "texte plein"
        user.password // password stocké en bdd (encrypté)
      ); // compareSync retourne true || false

      if (checkOldPassword === false) {
        // si le oldPassword renseigné n'est pas le bon
        // todo => return message erreur
      } else {
        // si oldPassword renseigné est correct
        const salt = bcrypt.genSaltSync(10); // on génère un sel pour renforcer le hashage
        const hashed = bcrypt.hashSync(updatedUserInfos.password, salt); // encrypte nouveau password

        user.password = hashed; // on remplace le mot de passe "en clair" par le hash
        user.save(); // et enfin on update le document user récupéré de la bdd avec les nouvelles infos
        res.redirect("/profile");
      }
    })
    .catch(next);
});

//modifier les roles 
router.post("/users/edit/:id",protectAdminRoute, (req, res, next) => {
  //  mettre à jour un user en utilisant son id (req.params)
  userModel
    .findByIdAndUpdate(req.params.id, req.body)
    .then(dbRes => {
      console.log("edit one user >>>> ", dbRes);
      res.redirect("/dashboard/manage-users");
    })
    .catch(next);
});

//suppr le users
router.post("/users/delete/:id",protectAdminRoute, (req, res, next) => {
 
  userModel
    .findByIdAndDelete(req.params.id)
    .then((dbRes) => {
      //console.log("delete one users >>> ", dbRes);
      res.redirect("/dashboard/manage-users");
    })
    .catch(next);
});

module.exports = router;
