var db = require("../models");

module.exports = function(app) {

  
  // Find all categories and return them to the user with res.json
  app.get("/api/category", function(req, res) {
    db.Category.findAll({
     
    }).then(function(result) {
      res.json(result);
    });
  });

  app.get("/api/category/:id", function(req, res) {
    // Find one Category with the id in req.params.id and return them to the user with res.json
    db.Category.findOne({
      where: {
        id: req.params.id
      },
      
    }).then(function(dbCategory) {
      res.json(dbCategory);
    });
  });

  app.post("/api/category", function(req, res) {
    // Create an category with the data available to us in req.body
    
    db.Category.create(req.body).then(function(dbCategory) {
      console.log(dbCategory);
      res.json(dbCategory);
    });
  });

  app.put("api/category/update", function(req, res) {
    // If we are given a category, create the category 
  
      db.Category.create({
        Category: req.body.name,
        CategoryId: req.body.Category_id
      })
        .then(function(dbCategory) {
          return dbCategory.update({
            where: {
              id: req.body.Category_id
            }
          }
           
          );
        })
        .then(function(req, res) {
          req.body.Category.push(req.body);
          res.json("api/category");
          res.json("/category");
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
