var db = require("../models");
const encrypt = require("../encryption/encryption");
module.exports = function(app) {
 
// Authentication and Authorization Middleware
var auth = function(req, res, next) {
    if (req.session.user)
    {
      return next();
    }
    else
    return res.redirect("/?msg=unauthorized");
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
      return res.json(false);
    }
    else{
      var deCrypyPw = encrypt.decrypt(dbPost.password);
      if(deCrypyPw!==req.body.password){
        res.json(false);
    }
    return res.json(dbPost);
   }
  });       
});
 
// PUT route for updating token
app.put("/", function(req, res) {
  var randomToken = "t" + Math.random();
  db.User.update({
      token:randomToken
    }, {
      where: {
        id: req.body.id
      }
    }).then(function(result) {
        res.cookie("token",randomToken);
        req.session.user = req.body;
        req.session.user.email= req.body.email;
        req.session.user.id = req.body.id;
        res.json(result);
    });  
});


app.post("/signup",function(req,res){
  db.User.create({
    username: req.body.username,
    email:req.body.email,
    password:encrypt.encrypt(req.body.password)
  }).then(function(dbUser){
    res.json(true);
  }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
})

// Logout endpoint
app.get('/logout',auth,function (req, res) {
  res.clearCookie("token");
  res.send("success");
  req.session.destroy();

});

//session user
app.get("/user",auth,function(req, res) {
      res.json(req.session.user);
 });


 app.get("/user/:id", auth,function(req, res) {
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});

app.get("/api/categories",auth,function(req, res) {
    db.Category.findAll({})
      .then(function(result) {
        res.json(result);
      });
   });
  
   //need to refactor this function
   app.post("/api/posts", function(req, res) {
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
      image: img_name,
      UserId : req.session.user.id
    }).
    then(function(result) {
      res.redirect("/view-post?post_id="+result.id);
    })
  });
 }
}); 

  //need to refactor this function
app.post("/update/profile", function(req, res) {
  var file = req.files.uploaded_image;
  var img_name=file.name;
  res.set('Content-Type', 'text/plain');
  if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                               
    file.mv('public/images/upload_images/'+file.name, function(err) {

    if (err){
      return res.status(500).send(err);
  }
  db.User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    location: req.body.location,
    bio: req.body.bio,
    image: img_name
  },{
    where: {
      id: req.session.user.id
    }
  }).
  then(function(result) {
    res.redirect("/dashboard");
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

app.get("/api/posts/user/:id",function(req, res) {
  db.Post.findAll({
    order: [
          ['createdAt','DESC']
    ],
    where: {
      UserId: req.params.id
    },
    include: [db.Category]
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

  app.get("/api/posts/user/:id/title/:title",function(req, res) {
    db.Post.findAll({
      where: {
        title: {
          $like: '%' + req.params.title + '%'
        },
        UserId: req.params.id
      },
      include: [db.Category]
    }).then(function(dbPost) {
      res.json(dbPost);
    });
  });
}