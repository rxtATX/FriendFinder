// Requiring NPMs
var express = require("express");
var app = express();
// Calling exports from other files.
var database = require("../data/database.js");
var friends = database.data;
//Exports the function which will pull from the /api URL the JSON object with all its indexes to display on page.
exports.getfriends = app.get("/api", function(req, res) {
	res.json(friends);
});
//Exports the function which will add a new JSON object to the whole database within the /api URL.
exports.postfriends = app.post("/api", function(req, res) {
	var newUser = req.body;
	friends.push(newUser);
});