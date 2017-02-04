var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

var PORT = 8080;

var api = require("./app/routing/apiRoutes.js");
var routes = require("./app/routing/htmlRoutes.js");

app.use("/api/:friends?", api.getfriends);
app.use("/api/friends", api.postfriends);
app.use("/", routes.home);
app.use("/survey", routes.survey);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
