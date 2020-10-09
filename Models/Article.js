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




const articleModel = mongoose.model("Article", articleSchema);

module.exports = articleModel;