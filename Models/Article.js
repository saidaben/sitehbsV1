const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const articleSchema = new Schema({
  titre: String,
  sous_titre: String,
  date: Date,
  contenu: String,
  auteur: String,
  image: {
    type: String,
    default: "https://nsa40.casimages.com/img/2020/09/23/200923125056541420.jpg",
  },

  // commentaires: [{
  //   id_user: {
  //     type: Schema.Types.ObjectId,
  //     ref: "User"
  //   },

  //   message: String,

  //   date: Date,
  // }],

  // id_user: [{
  //   type: Schema.Types.ObjectId,
  //   date: Date,
  //   raison: String,
  // }, ],

  categorie: {
    type: String,
    enum: ["Partage d éxpérience", "Conseils de professionnel", "Les fondamentaux", "Brouillons"],
  },

  redacteurs: {
    type: Schema.Types.ObjectId,
    ref: "User"
    //REF POINTE SUR UNE AUTRECOLLECTION
},
});

// commentaires: [{
//    - auteur: ObjectId(user)
//    - message: String,
//    - date: Date
// }]
// signaler:[{
//     -auteur: Object_id (user)
//    - date: Date,
//    - raison: String
// }]
// catégorie: String (enum: partage_d_éxpérience, conseils_de_professionnel)


const articleModel = mongoose.model("Article", articleSchema);

module.exports = articleModel;