var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var cors = require("cors");

//body parser middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//cors middleware
app.use(cors());

//controllers
var userCtrl = require('./controllers/user.controller.js')
app.use('/user', userCtrl);

module.exports = app;