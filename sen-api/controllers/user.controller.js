var executeQuery = require('../helper/queryHelper.js');
var express = require('express');
var router = express.Router();

//GET 
router.get("", function(req, res){
    var query = "SELECT * FROM [User]";
    executeQuery(res,query);
});

//POST
router.post("", function(req, res){
    var query = `INSERT INTO [User](Name, Email, Password)
    VALUES (${req.body.Name}, ${req.body.Email},${req.body.Password})`;
    executeQuery(res,query);
});

//PUT
router.put("/:id", function(req, res){
    var query = `UPDATE [User]
                 SET Name = ${req.body.Name},
                     Email = ${req.body.Email},
                     Password = ${req.body.Password}
                 WHERE Id = ${req.params.id}`;
    executeQuery(res,query);
});

//DELETE
router.delete("/:id",function(req, res){
    var query = `DELETE FROM [User] WHERE Id = ${req.params.id}`;
    executeQuery(res, query);
});

module.exports = router;