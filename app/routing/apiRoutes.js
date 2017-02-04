var express = require("express");
var users = require("../data/friends.js")
var app = express();

exports.getfriends = app.get("/api/friends", function(request, response) {
        
  var friend = req.params.users;

  if (friend) {
    console.log(friend);

    for (var i = 0; i < users.length; i++) {
      if (friend === users[i].routeName) {
        res.json(users[i]);
        return;
      }
    }

    res.send("No friends found");
  }
  else {
    res.json(users);
  }
});

exports.postfriends = app.post("/api/friends", function(req, res) {
  var newUser = req.body;
  console.log(newUser);

  users.push(newUser);
  res.json(newUser);
});