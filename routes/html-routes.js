var path = require("path");
var db = require("../models");
const encrypt = require("./encryption.js")
// Routes
// =============================================================
module.exports = function(app) {

  var auth = function(req, res, next) {
    if (req.session.user)
    {
      console.log(req.session.user.email);
      return next();
    }
    else
      return res.sendStatus(401);
  };

  // index route loads index.html Login Page
  app.get("/", function(req, res) {
    if (req.session.user){
      res.redirect("/dashboard?email="+req.session.user.email);
    }
    if (req.cookies){
      db.User.findOne({
        where: {
          token: req.cookies.token
        }
      })
      .then(function(dbUser) {
        if(dbUser){
          req.session.user = dbUser;
          return res.redirect("/");
        }
      });
     }
   else{
      res.sendFile(path.join(__dirname, "../public/html/index.html"));
   }
  });
  

  //signup page
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  //home page
  app.get("/home", auth,function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
  });

  //Make new post page
  app.get("/post", auth,function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/post.html"));
  });

  //Make new post page
  app.get("/view-post", auth,function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/view-post.html"));
  });


  app.get("/dashboard", auth, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/dashboard.html"));
  });


};
