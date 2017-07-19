var express = require("express");
var bodyParser = require("body-parser");
var methodOverride = require("method-override");

var session  = require('express-session');
//var cookieParser = require('cookie-parser');
//var morgan = require('morgan');
var passport = require('passport');
var flash    = require('connect-flash');



var db = require("./models");

var PORT = process.env.PORT || 3000;

var app = express();

app.use(express.static(process.cwd() + "/public"));


app.use(bodyParser.urlencoded({ extended: false }));

app.use(methodOverride("_method"));

var exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

var eventXRoutes = require("./controllers/events_controllers.js");
app.use(eventXRoutes);

db.sequelize.sync().then(function() {
    app.listen(PORT, function() {
        console.log("App listening on PORT " + PORT);
    });
});

