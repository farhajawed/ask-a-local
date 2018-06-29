var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // index route loads index.html Login Page
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });


  //signup page
  app.get("/signup", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/signup.html"));
  });

  //home page
  app.get("/home", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/home.html"));
  });

  //Make new post page
  app.get("/post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/post.html"));
  });

  //Make new post page
  app.get("/view-post", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/view-post.html"));
  });

};
