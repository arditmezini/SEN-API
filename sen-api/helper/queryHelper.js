var env = process.env.NODE_ENV || "dev";
var config = require('../config')[env];
var sql = require("mssql");

module.exports = executeQuery;

async function executeQuery(res, query){     
    await sql.connect(config.database , function (err) {
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
                    resp.recordsets = [].concat(...resp.recordsets);
                    res.send(resp);
                }
                sql.close(); 
            });
        }
    });      
}