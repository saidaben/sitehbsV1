const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
 
  
  avatar: {
    type: String,
    default: "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcTPyGNr2qL63Sfugk2Z1-KBEwMGOfycBribew&usqp=CAU",
  },
  username: String,
  email: String,
  password: {
    min: 4,
    required: true,
    type: String,
  },
 
         favoris: {
          type: Schema.Types.ObjectId,
          ref: "User"
          //REF POINTE SUR UNE AUTRECOLLECTION
      },
  
  role: {
    type: String,
    enum: ["admin", "editor", "user"],
    default: "user",
  },
});

// _id : Object_id
// role: {
//  type: String,
//  enum: ["admin", "editor", "user"],
//  default: "user",
// username:String
// email: String
// password: String
// favoris: [article_id]

const userModel = mongoose.model("User", userSchema);

module.exports = userModel;