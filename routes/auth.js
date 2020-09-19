const express = require("express");
const router = new express.Router();
const bcrypt = require("bcrypt");//librairie ds node npm 
const userModel = require("./../models/User");
const uploader = require("./../config/cloudinary");
// uploader est un middleware, cad une fonction qui s'insère entre une requête http et une réponse http




// TESTS API POSTMAN
// router.get("/sinscrire", (req, res) => {
//   userModel.find()
//   .then(dbres => {
//       res.json(dbres)
//   })
// })

// router.post("/sinscrire", (req, res) => {
//   userModel.create(req.body)
//   .then(dbres => {
//       res.json(" is created")
//   })
// })

router.get("/sinscrire", (req, res) => {
  res.render("sinscrire", { title: "Inscription" });
});

router.get("/sidentifier", (req, res) => {
  res.render("sidentifier", { title: "Connexion" });
});



router.post("/sidentifier", (req, res, next) => {
  const userInfos = req.body; //
  // check que mail et mdp sont renseignés
  if (!userInfos.email || !userInfos.password) {
    // la regle d or :never trust user input 
    // si non : retourner message warning au client
    req.flash("warning", "Attention, email et password sont requis !");
    res.redirect("/sidentifier");
  }
  // si oui : vérifier que mail et mdp correspondent en bdd
  // 1 - récupérer l'utilisateur avec le mail fourni
  userModel
    .findOne({ email: userInfos.email })
    .then((user) => {
      if (!user) {
        // vaut null si pas d'user trouvé pour ce mail
        // si non .. retiourner une erreur au client
        req.flash("error", "Identifiants incorrects");
        res.redirect("/sidentifier");
      }
      // si oui comparer le mdp crypté stocké en bdd avec la chaîne en clair envoyée depuis le formulaire
      const checkPassword = bcrypt.compareSync(
        userInfos.password, // password provenant du form "texte plein"
        user.password // password stocké en bdd (encrypté)
      ); // checkPassword vaut true || false

      // si le mdp est incorrect: retourner message error sur sidentifier
      if (checkPassword === false) {
        req.flash("error", "Identifiants incorrects");
        res.redirect("/sidentifier");
      
      }
      
      // else{
      //   formData.append("username", "Groucho");
      //   formData.append("accountnum", 123456);
      // }
      // si oui : stocker les infos de l'user en session pour lui permettre de naviguer jusqu'au signout
      const { _doc: clone } = { ...user }; // je clone l'user
      delete clone.password; // je supprime le mdp du clone (pas besoin de le stocker ailleurs qu'en bdd)
      req.session.currentUser = clone; // j'inscris le clone dans la session (pour maintenir un état de connexion)
     

  //si t'es admin redirige vers le dashboard sinn vers le dashboard editor sinn pr user redirige profil
  if (req.session.currentUser && req.session.currentUser.role === "admin")
  res.redirect("/dashboard");
  if (req.session.currentUser && req.session.currentUser.role === "editor")
 res.redirect("/dashboard-editor");
     else  
     res.redirect("/profile"); 
    })
    .catch(next);
});

//insère les new user en bdd
router.post("/sinscrire",uploader.single("avatar"), (req, res, next) => {
  const user = req.body;
console.log(req.body,"gggggg")
  if (req.file) {
    // si un fichier a été uploadé
    user.avatar = req.file.secure_url; // on l'associe à user
  }
console.log("....",user)
  if (!user.username || !user.password || !user.email) {
    //  retourner un message d'erreur : remplir tous les champs requis + redirect
    req.flash("warning", "Merci de remplir tous les champs requis.");
    res.redirect("/sinscrire");
  } else {
    userModel
      .findOne({ email: user.email })
      .then((dbRes) => {
        if (dbRes) {
          // todo retourner message d'erreur : email déjà pris + redirect
          req.flash("warning", "Désolé, cet email n'est pas disponible.");
          res.redirect("/sinscrire");
        }
      })
      .catch(next);

    // si le programme est lu jusqu'ici, on converti le mot de passe en chaîne cryptée
    const salt = bcrypt.genSaltSync(10);
    const hashed = bcrypt.hashSync(user.password, salt);
    // console.log("password crypté >>>", hashed);
    user.password = hashed; // on remplace le mot de passe "en clair" par sa version cryptée

    // finalement on insère le nouvel utilisateur en base de données
    userModel
      .create(user)
      .then((dbRes) => {
        req.flash("success", "Inscription validée !");
        res.redirect("/sidentifier");
      })
      .catch(next);
  }
});

router.get("/deconnexion", (req, res) => {
  req.session.destroy(() => res.redirect("/sidentifier"));
});
module.exports = router;
