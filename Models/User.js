const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema({
 
  
  avatar: {
    type: String,
    default: "https://nsa40.casimages.com/img/2020/08/20/200820120014245835.png",
  },
  username: String,
  email: String,

  date_inscription:{
    type: Date,
    default: Date.now
  },
  
  password: {
    min: 4,
    required: true,
    type: String,
  },
 
         favoris: {
          type: Schema.Types.ObjectId,
          ref: "Article"
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