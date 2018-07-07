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
      username: req.body.username
    }
  })
  .then(function(dbPost) {
    if(!dbPost){
      return res.json("invalid");
    }
    else if(dbPost && dbPost.enabled==0){
      return res.json("disabled");
    }
    else{
      var deCrypyPw = encrypt.decrypt(dbPost.password);
      if(deCrypyPw!==req.body.password){
        return res.json("invalid");
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
        req.session.user.username= req.body.username;
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
  req.session.destroy();
  return res.json("success");

});

//session user
app.get("/user",auth,function(req, res) {
      res.json(req.session.user);
 });

//********gets all users [only admin has access]
  app.get("/api/users",auth,function(req, res) {
    if(req.session.user.userRole==="ADMIN"){
        db.User.findAll( 
        {where: {userRole: "USER"},order: [['username', 'ASC']]})
          .then(function(dbUser) {
          res.json(dbUser);
        });
    }
   else{
     res.redirect("/dashboard");
   }
  });


//get users by id
 app.get("/user/:id", auth,function(req, res) {
  db.User.findOne({
    where: {
      id: req.params.id
    }
  }).then(function(dbUser) {
    res.json(dbUser);
  });
});


//posts with image : submission by form
app.post("/api/posts", function(req, res) {
  var img_name = null;
  if(JSON.stringify(req.files) !== '{}'){
    var file = req.files.uploaded_image;
    img_name=file.name;
    res.set('Content-Type', 'text/plain');
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){                        
      file.mv('public/images/upload_images/'+file.name, function(err) {
      if (err){
        // return res.status(500).send(err);
        img_name = null;
      }
    });
 }}
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

//updates user profile photo: submission by form
app.post("/upload/image", function(req, res) {
  var file = req.files.uploaded_image;
  var img_name=file.name;
  res.set('Content-Type', 'text/plain');
  if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){                      
    file.mv('public/images/upload_images/'+file.name, function(err) {
    if (err){
      return res.status(500).send(err);
     }
    db.User.update({
      image: img_name
    },{
      where: {
        id: req.session.user.id
      }
    }).
    then(function(result) {
      console.log(result);
      res.redirect("/dashboard");
    })
  });
 }
}); 

//updates user by id
app.put("/update/user/:id",function(req,res){
  var userId = req.params.id;
  db.User.update({
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    location: req.body.location,
    bio: req.body.bio,
  },{
    where:{
      id: userId
    }
  }).then(function(dbUser){
    res.json(dbUser);
  }).catch(function(err) {
      console.log(err);
      res.json(err);
    });
})

// PUT route for updating posts by id
app.put("/api/posts/:id", function(req, res) {
  var postId = req.params.id;
  db.Post.update({
      body:req.body.body,
      CategoryId:req.body.category
  },
  {
      where: {
        id: postId
      }
    })
    .then(function(dbPost) {
      console.log(dbPost);
      res.json(dbPost);
    });
});

//gets all posts ordered by post update date 
app.get("/api/posts", auth,function(req, res) {
  db.Post.findAll({include: [ db.Category ] ,order: [['updatedAt', 'DESC']]})
    .then(function(dbPost) {
    res.json(dbPost);
  });
});

app.get("api/posts/:postId/comments", auth, function(req, res){
  var postId = req.params.postId
  db.Commments.findAll({
    where: {
      postId: postId
    }
  }).then(function(results){
    res.json(results);
  })
});

app.get("/api/post/category/:category", auth, (req, res)=> {
  var category = req.params.category;
  db.Post.findAll({where: {category: category}},{order: [['createdAt', 'DESC']]}).then((dbPost)=> {
    res.json(dbPost);
  });
});

//gets a post by post id
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

//*******gets posts by user id
app.get("/api/posts/user/:id",function(req, res) {
  db.Post.findAll({
    order: [
          ['updatedAt','DESC']
    ],
    where: {
      UserId: req.params.id
    },
    include: [db.Category]
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

//gets a post by user id and post id
app.get("/api/posts/:postId/user/:id",function(req, res) {
  db.Post.findOne({
    where: {
      UserId: req.params.id,
      id:req.params.postId
    }
  }).then(function(dbPost) {
    res.json(dbPost);
  });
});

//gets posts by title
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

  //deletes a post by id
  app.delete("/api/posts/:id", function(req, res) {
    db.Post.destroy({
      where: {
        id: req.params.id
      }
    })
      .then(function(dbPost) {
        res.json(dbPost);
      });
  })

  // PUT route for updating posts
  app.put("/api/posts/:id", function(req, res) {
    var postId = req.params.id;
    db.Post.update({
        body:req.body.body,
        CategoryId:req.body.category
    },
    {
        where: {
          id: postId
        }
      })
      .then(function(dbPost) {
        console.log(dbPost);
        res.json(dbPost);
      });
  });

  //****post counts by user id
  app.get("/api/post_count/user/:id",auth,function(req,res){
    db.Post.findAll({
        attributes: [
          'UserId',
          [db.sequelize.fn('COUNT', db.sequelize.col('UserId')), 'post_count'],
        ],
        group: ['UserId'],
        having: {
                'UserId': {
                  $eq: req.params.id
              },
         }
      }).then(function(dbCount){
          res.json(dbCount);
    });
  });

  //put route for enabling/disabling a user
app.put("/en-dis/user/:id",function(req,res){
    db.User.update({
      enabled: req.body.enabled
    },{
      where:{
        id: req.params.id
      }
    }).then(function(dbUser){
      res.json(dbUser);
    }).catch(function(err) {
        res.json(err);
      });
  });

  //gets users by username
  app.get("/api/users/username/:username",function(req, res) {
    db.User.findAll({
      where: {
        username: {
          $like: '%' + req.params.username + '%'
        },
        userRole:"USER"
      }
    }).then(function(dbUser) {
      res.json(dbUser);
    });
  });

  //get posts by update date and user id
  app.get("/api/posts/userId/:id/date/:date",function(req, res) {
      db.Post.findAll(
        {
          include: [ db.Category ],
          where:
               [db.sequelize.where(db.sequelize.fn('date', db.sequelize.col('updatedAt')), '=', req.params.date),
                {
                  UserId: req.params.id
                }],order: [['updatedAt', 'ASC']]
        }
      ).then(function(dbUser) {
        res.json(dbUser);
      });
    });
}


 
 
