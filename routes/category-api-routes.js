var db = require("../models");
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

  // Find all categories and return them to the user with res.json
  app.get("/api/categories",auth,function(req, res) {
    db.Category.findAll(
      {
        order: [
          ['name', 'ASC']
        ]
      })
      .then(function(result) {
        res.json(result);
      });
  });


  app.get("/api/category/:id",auth, function(req, res) {
    // Find one Category with the id in req.params.id and return them to the user with res.json
    db.Category.findOne({
      where: {
        id: req.params.id
      },
      
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.post("/api/category", auth,function(req, res) {
    // Create an category with the data available to us in req.body
    db.Category.create(req.body).then(function(dbCategory) {
      // console.log(dbCategory);
      res.json(dbCategory);
    }).catch(function(err) {
      // console.log(err);
      res.json(err);
    });
  });

 
  // PUT route for updating posts
  app.put("/api/category/:id", function(req, res) {
    db.Category.update({
       name: req.body.name
    },
    {
      where: {
        id: req.params.id
      }
   }).then(function(dbCategory) {
    //  console.log(dbCategory);
      res.json(dbCategory);
    }).catch(function(err) {
      // console.log(err);
      res.json(err);
    });
  });


  app.delete("/api/category/:id", function(req, res) {
    // Delete the Catgegory with the id available to us in req.params.id
    db.Category.destroy({
      where: {
        id: req.params.id
      }
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

};
