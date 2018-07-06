var path = require("path");
var db = require("../models");

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
      // return res.sendStatus(401);
      return res.redirect("/?msg=unauthorized");
  };

  // index route loads index.html Login Page
  app.get("/", function(req, res) {
  if(!req.session.user || !req.cookies){
      res.sendFile(path.join(__dirname, "../public/html/index.html"));
   }
   else if (req.session.user){
      res.redirect("/dashboard");
   }
   else if(req.cookies){
     //need to place else where??
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
  });
  

  //signup page
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
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

  app.get("/explorer", auth, function(req, res) {
    res.sendfile(path.join(__dirname, "../public/html/global.html"));
  })

  app.get("/question", auth, function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/QA.html"));
  });

  app.get("/category", auth, function(req, res) {
    console.log(req.session.userRole);
    if(req.session.user.userRole === "ADMIN"){
      res.sendFile(path.join(__dirname, "../public/html/category.html"));
    }
    else{
       res.redirect("/dashboard");
    }
  });

  app.get("/user_post", auth, function(req, res) {
    if(req.session.user.userRole === "ADMIN"){
      res.sendFile(path.join(__dirname, "../public/html/user-post.html"));
    }
    else{
       res.redirect("/dashboard");
    }
  });

};