var db = require("../models");

module.exports = function(app) {

  var sessionChecker = (req, res, next) => {
    if (req.session.user && req.cookies.user_sid) {
        res.redirect('/home');
    } else {
        next();
    }    
  };

    app.post("/",(req, res) => {
    var email = req.body.email,
        password = req.body.password;

    db.User.findOne({ where: { email: email } }).then(function (user) {
        console.log(user.dataValues.password);

        if(user.dataValues.password === password && user.dataValues.email === email){
          
          var token = "t" + Math.random();
          db.User.update({token: token}).then(function(){
            res.end();
          })

          res.cookie("token", token);
          req.session.user = user;
        } else{
          res.redirect('/');
        }
        
    });
  });

  
    app.post("/signup",(req, res) => {
        db.User.create({
            email: req.body.email,
            username: req.body.username,
            password: req.body.password
        })
        .then(user => {
            req.session.user = user.dataValues;
            res.redirect('/');
        })
        .catch(error => {
            res.redirect('/signup');
        });
    });

  
  app.get('/home', (req, res) => {
    if (req.session.user && req.cookies.token) {
        res.sendFile(__dirname +'../public/html/home.html');
    } else {
        res.redirect('/');
    }
  });

  app.get('/logout', (req, res) => {
        res.clearCookie('token');
        req.session.destroy();
        res.redirect('/');
  });

  app.get("/api/categories", function(req, res) {
    db.Category.findAll({})
      .then(function(result) {
        res.json(result);
      });
   });
  
  app.post("/api/posts", sessionChecker, function(req, res) {
    console.log("Received data", req.files);
    var file = req.files.uploaded_image;
		var img_name=file.name;
    res.set('Content-Type', 'text/plain');
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
      file.mv('public/images/upload_images/'+file.name, function(err) {

      if (err){
        return res.status(500).send(err);
    }
    db.Post.create({
      title: req.body.title,
      body:req.body.body,
      CategoryId:req.body.category,
      image: img_name
    }).
    then(function(result) {
      res.redirect("/view-post?post_id="+result.id);
    })
  });
 }
}); 



 app.get("/api/posts", sessionChecker, function(req, res) {
  db.Post.findAll({include: [ db.Category ] },{})
    .then(function(dbPost) {
    res.json(dbPost);
  });
});

app.get("/api/posts/:id", sessionChecker, function(req, res) {
  db.Post.findOne({
    where: {
      id: req.params.id
    },
    include: [db.Category]
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});


}