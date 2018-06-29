var express = require("express");
var bodyParser = require("body-parser");
// var busboy = require("then-busboy");
var	fileUpload = require('express-fileupload');
var cookieParser = require('cookie-parser');
var session = require('express-session');
var morgan = require('morgan');

var app = express();
var PORT = process.env.PORT || 8080;

app.use(morgan('dev'));

// Requiring our models for syncing
var db = require("./models");

// Sets up the Express app to handle data parsing

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }));
// parse application/json
app.use(bodyParser.json());

// initialize cookie-parser to allow us access the cookies stored in the browser. 
app.use(cookieParser());

// initialize express-session to allow us track the logged-in user across sessions.
app.use(session({
    key: 'user_sid',
    secret: 'somerandonstuffs',
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 600000
    }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user) {
      res.clearCookie('user_sid');        
  }
  next();
});

// app.use(function (req, res, next) {
//   res.status(404).send("Sorry can't find that!")
// });


// Static directory
app.use(express.static("public"));
app.use(fileUpload());

// Routes
// =============================================================
require("./routes/api-routes.js")(app);
require("./routes/html-routes.js")(app);

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
