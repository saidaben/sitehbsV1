module.exports = (req, res, next) => {
  console.log("dev mode is on >>> ");
  req.session.currentUser = {
    _id: "5f318b829dd1046210cc32d6",
    username: "test-user ",
    avatar: "https://nsa40.casimages.com/img/2020/08/20/200820120014245835.png",
    role: "editor",
    email: "test@mail.com",
   
  };
  next();
};

//dev mode pour faciliter le developpement 