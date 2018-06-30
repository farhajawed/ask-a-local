var db = require("../models");
const encrypt = require("./encryption.js");
module.exports = function(app) {
 

// Authentication and Authorization Middleware
var auth = function(req, res, next) {
    if (req.session.user)
    {
      console.log(req.session.user);
      return next();
    }
    else
   
      return res.sendStatus(401);
};

 // Login endpoint
app.post('/', function (req, res) {
  db.User.findOne({
    where: {
      email: req.body.email
    }
  })
  .then(function(dbPost) {
    if(!dbPost){
      res.send("login failed");
    }
    else{
      var deCrypyPw = encrypt.decrypt(dbPost.password);
      if(deCrypyPw!==req.body.password){
        res.send("login failed");
      }
      else{
        console.log(dbPost.email);
        var randomToken = "t" + Math.random();
        db.User.update({
          token:randomToken
        }, {
          where: {
            id: dbPost.id
          }
        }).then(function(result) {
            res.cookie("token",randomToken);
            req.session.user = dbPost;
            req.session.user.email= dbPost.email;
            req.session.user.id = dbPost.id;
            res.redirect("/dashboard?email="+req.session.user.email);
        });
      }
      }
    });       
});
 

 
app.post("/signup",function(req,res){
  console.log(req.body);
  db.User.create({
    username: req.body.username,
    email:req.body.email,
    password:encrypt.encrypt(req.body.password)
  }).then(function(dbUser){
    res.redirect("/");
  })
})

// Logout endpoint
app.get('/logout', function (req, res) {
  res.clearCookie("token");
  req.session.destroy();
  res.send("logout success!");
});

  app.get("/api/categories",auth,function(req, res) {
    db.Category.findAll({})
      .then(function(result) {
        res.json(result);
      });
   });
  
  app.post("/api/posts",function(req, res) {
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
      UserId:req.session.user.id,
      image: img_name
    }).
    then(function(result) {
      res.redirect("/view-post?post_id="+result.id);
    })
  });
 }
}); 



 app.get("/api/posts", auth,function(req, res) {
  db.Post.findAll({include: [ db.Category ] },{})
    .then(function(dbPost) {
    res.json(dbPost);
  });
});

app.get("/api/posts/:id", auth,function(req, res) {
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