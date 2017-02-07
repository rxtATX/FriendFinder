var express = require("express");
var app = express();

var database = require("../data/database.js");
var friends = database.data;

exports.getfriends = app.get("/api/database", function(req, res) {

    res.json(friends);
  
});

exports.postfriends = app.post("/api", function(req, res) {
  var newUser = req.body;
  friends.push(newUser);
  res.json(friends);
});
