var db = require("../models");

module.exports = function(app) {

  var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/dashboard');
    } else {
        next();
    }    
  };

  

  // route for user signup
  app.route('/signup')
  .get(sessionChecker, (req, res) => {
      res.sendFile(__dirname + '/public/signup.html');
  })
  .post((req, res) => {
      User.create({
          username: req.body.username,
          email: req.body.email,
          password: req.body.password
      })
      .then(user => {
          req.session.user = user.dataValues;
          res.redirect('/dashboard');
      })
      .catch(error => {
          res.redirect('/signup');
      });
  });

  // route for user Login
  app.route('/login')
  .get(sessionChecker, (req, res) => {
      res.sendFile(__dirname + '/public/login.html');
  })
  .post((req, res) => {
      var username = req.body.username,
          password = req.body.password;

      User.findOne({ where: { username: username } }).then(function (user) {
          if (!user) {
              res.redirect('/login');
          } else if (!user.validPassword(password)) {
              res.redirect('/login');
          } else {
              req.session.user = user.dataValues;
              res.redirect('/dashboard');
          }
      });
  });



  //FOR REFERENCE
  // // GET route for getting all of the posts
  // app.get("/api/posts/", function(req, res) {
  //   db.Post.findAll({})
  //     .then(function(dbPost) {
  //       res.json(dbPost);
  //     });
  // });

};
