// Requiring NPMs
var express = require("express");
var app = express();
var path = require("path");
var router = express.Router();

//Exporting the URLs which will display the content of the file within the directories listed within each function.
exports.home = app.get("/", function(request, response) {
        
    response.sendFile(path.join(__dirname + "/../public/home.html"));
});
exports.survey = app.get("/survey", function(request, response) {
        
    response.sendFile(path.join(__dirname + "/../public/survey.html"));
});