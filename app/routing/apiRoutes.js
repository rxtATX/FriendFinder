var express = require("express");
var app = express();

var server = require("../../server");
var data = server.data;

exports.getfriends = app.get("/api/:data?", function(req, res) {
  var friendSelected = req.params.data;
  if (friendSelected) {

    for (var i = 0; i < data.length; i++) {
      if (friendSelected === data[i].routeName) {
        res.json(data[i]);
        return;
     }
    }
    
    res.send("No friends found");
  }
  else {
    res.json(data);
  }
});

exports.postfriends = app.post("/api", function(req, res) {
  var newUser = req.body;
  data.push(newUser);
  res.json(newUser);
});
