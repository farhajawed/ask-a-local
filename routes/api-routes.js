var db = require("../models");

module.exports = function(app) {

  app.post("/home", function(req, res) {
    console.log("Received data", req.files);
    var file = req.files.uploaded_image;
		var img_name=file.name;
    console.log(file);
    console.log(img_name);
    res.set('Content-Type', 'text/plain');
    if(file.mimetype == "image/jpeg" ||file.mimetype == "image/png"||file.mimetype == "image/gif" ){
                                 
      file.mv('public/images/upload_images/'+file.name, function(err) {

        if (err){
          return res.status(500).send(err);
        }
        
         db.User.create({
          email: req.body.email,
          username: req.body.username,
          password: req.body.password,
          image: img_name
        }).then(function(){
      
               res.redirect("/home");
        })
      });
    }
  }); 

  app.get("/api/categories", function(req, res) {
    db.Category.findAll({})
      .then(function(result) {
        res.json(result);
      });
   });
  
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
      image: img_name
    }).
    then(function(result) {
      res.redirect("/view-post?post_id="+result.id);
    })
  });
 }
}); 



 app.get("/api/posts", function(req, res) {
  db.Post.findAll({include: [ db.Category ] },{})
    .then(function(dbPost) {
    res.json(dbPost);
  });
});

app.get("/api/posts/:id", function(req, res) {
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