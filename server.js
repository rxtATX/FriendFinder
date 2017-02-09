//Requires NPMs
var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");
//Port required by Heroku
var PORT = 5000;
//Brings in the get and post routes as well as the static pages for the web app.
var api = require("./app/routing/apiRoutes.js");
var routes = require("./app/routing/htmlRoutes.js");
//Parses the contents of the web app to ensure it's easier to use.
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));
//Imports the URLs from the routing folder.
app.use("/", api.getfriends);
app.use("/", api.postfriends);
app.use("/", routes.home);
app.use("/", routes.survey);
//Allows the server to call into the directory with the front-end JS.
app.use(express.static(path.join(__dirname, "app")));
//Heroku's hosting port.
app.listen(process.env.PORT || 5000, function() {
    console.log("App listening on PORT " + PORT);
});