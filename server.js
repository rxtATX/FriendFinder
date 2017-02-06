var express = require("express");
var app = express();
var path = require("path");
var bodyParser = require("body-parser");

var PORT = 8080;

var api = require("./app/routing/apiRoutes.js");
var routes = require("./app/routing/htmlRoutes.js");

var data = [{
  routeName: "rachel",
  name: "Rachel Greene",
  answersArray: [],
  photo: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTY3OTc1Mjk2Nl5BMl5BanBnXkFtZTgwMjI3ODU0MDE@._V1_SY1000_CR0,0,978,1000_AL_.jpg",
}, {
  routeName: "ross",
  name: "Ross Gellar",
  answersArray: [],
  photo: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjA1MzEwMTk5M15BMl5BanBnXkFtZTgwNDk2ODU0MDE@._V1_SY1000_CR0,0,978,1000_AL_.jpg",
}, {
  routeName: "chandler",
  name: "Chandler Bing",
  answersArray: [],
  photo: "https://images-na.ssl-images-amazon.com/images/M/MV5BMTcwNTk0MDQyNV5BMl5BanBnXkFtZTgwMTk1ODU0MDE@._V1_SY1000_CR0,0,802,1000_AL_.jpg",
}, {
  routeName: "pheobe",
  name: "Pheobe Buffay",
  answersArray: [],
  photo: "https://images-na.ssl-images-amazon.com/images/M/MV5BMzUxMDgwMDMxN15BMl5BanBnXkFtZTgwMjE3ODU0MDE@._V1_SY1000_CR0,0,767,1000_AL_.jpg",
}, {
  routeName: "joey",
  name: "Joey Tribbiani",
  answersArray: [],
  photo: "https://images-na.ssl-images-amazon.com/images/M/MV5BMjEwODY1ODk5N15BMl5BanBnXkFtZTgwNzA3ODU0MDE@._V1_SY1000_CR0,0,993,1000_AL_.jpg",
}];

app.use("/", api.getfriends);
app.use("/", api.postfriends);
app.use("/", routes.home);
app.use("/", routes.survey);

app.use(express.static(path.join(__dirname, "app")));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.text());
app.use(bodyParser.json({ type: "application/vnd.api+json" }));

app.listen(PORT, function() {
  console.log("App listening on PORT " + PORT);
});
