var path = require("path");

// Routes
// =============================================================
module.exports = function(app) {

  // index route loads index.html
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../public/html/index.html"));
  });

  // route for Home-Page
  app.get('/', sessionChecker, (req, res) => {
    res.redirect('/login');
  });

  // route for user's dashboard
  app.get('/dashboard', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.sendFile(__dirname + '/public/dashboard.html');
    } else {
        res.redirect('/login');
    }
  });

  // route for user logout
  app.get('/logout', (req, res) => {
    if (req.session.user && req.cookies.user_sid) {
        res.clearCookie('user_sid');
        res.redirect('/');
    } else {
        res.redirect('/login');
    }
  });
};
