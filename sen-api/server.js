//init node_modules
var env = process.env.NODE_ENV || "dev";
var config = require('./config')[env];
var app = require('./app');

//setting up server
var server = app.listen(config.server.port, function(){
    var port = server.address().port;
    console.log("App running on port", port);
});