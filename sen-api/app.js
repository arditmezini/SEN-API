const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const expressValidator = require('express-validator')

//body parser middleware
app.use(bodyParser.urlencoded({extended : true}));
app.use(bodyParser.json());

//cors middleware
app.use(cors());

//validation middleware
app.use(expressValidator())

//controllers
var userCtrl = require('./controllers/user.controller.js')
app.use('/user', userCtrl);

module.exports = app;