module.exports = (req, res, next) => {
  console.log("dev mode is on >>> ");
  req.session.currentUser = {
    _id: "5f318b829dd1046210cc32d6",
    username: "test-user ",
    avatar: "https://cdn.onlinewebfonts.com/img_258083.png",
    role: "admin",
    email: "test@mail.com",
   
  };
  next();
};
