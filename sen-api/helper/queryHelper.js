var env = process.env.NODE_ENV || "dev";
var config = require('../config')[env];
var sql = require("mssql");

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

module.exports = executeQuery;