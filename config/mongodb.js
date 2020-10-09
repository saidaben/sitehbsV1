// on connecte notre appli back a la bdd

//dependance pr connecter notre apli a la bdd
const mongoose = require("mongoose");

// clef a ajouter ds le .env
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});

mongoose.connection.on("connected", () => {
  console.log("yay mongodb connected :)")
});

mongoose.connection.on("error", () => {
  console.log("nay db error sorry :(")
});

