module.exports = (req, res, next) => {
  console.log("dev mode is on >>> ");
  req.session.currentUser = {
    _id: "5f748bfcddd452281cfa6673",
    username: "saida ",
    avatar: "https://nsa40.casimages.com/img/2020/08/20/200820120014245835.png",
    role: "admin",
    email: "benadour.saida@gmail.com",
   
  };
  next();
};

//dev mode pour faciliter le developpement 