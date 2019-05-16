//init node_modules
var env = process.env.NODE_ENV || "dev";
var config = require('./config')[env];
var express = require("express");
var bodyParser = require("body-parser");
var cors = require("cors");
var app = express();

var user = require('./controllers/user.controller.js')

//body parser middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//cors middleware
app.use(cors());

app.use('/user', user);

//setting up server
var server = app.listen(config.server.port, function(){
    var port = server.address().port;
    console.log("App running on port", port);
});