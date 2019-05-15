//init node_modules
var env = process.env.NODE_ENV || "dev";
var config = require('./config')[env];
var express = require("express");
var sql = require("mssql");
var bodyParser = require("body-parser");
var cors = require("cors")
var app = express();

//body parser middleware
app.use(bodyParser.json());

//cors middleware
app.use(cors());

//setting up server
var server = app.listen(config.server.port, function(){
    var port = server.address().port;
    console.log("App running on port", port);
});

var executeQuery = function(res, query){     
    sql.connect(config.database , function (err) {
        if (err) {   
            console.log("Error while connecting database :- " + err);
            res.send(err);
        }
        else {
            // create Request object
            var request = new sql.Request();
            // query to the database
            request.query(query, function (err, resp) {
                if (err) {
                    console.log("Error while querying database :- " + err);
                    res.send(resp);
                }
                else {
                    res.send(resp.recordsets);
                }
                sql.close(); 
            });
        }
    });      
}

//GET 
app.get("/api/user", function(req, res){
    var query = "SELECT * FROM [User]";
    executeQuery(res,query);
});

//POST
app.post("/api/user", function(req, res){
    var query = `INSERT INTO [User](Name, Email, Password)
    VALUES (${req.body.Name}, ${req.body.Email},${req.body.Password})`;
    executeQuery(res,query);
});

//PUT
app.put("/api/user/:id", function(req, res){
    var query = `UPDATE [User]
                 SET Name = ${req.body.Name},
                     Email = ${req.body.Email},
                     Password = ${req.body.Password}
                 WHERE Id = ${req.params.id}`;
    executeQuery(res,query);
});

//DELETE
app.delete("/api/user/:id",function(req, res){
    var query = `DELETE FROM [User] WHERE Id = ${req.params.id}`;
    executeQuery(res, query);
});
