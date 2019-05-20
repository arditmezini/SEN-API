const executeQuery = require('../helper/queryHelper.js');
const validateUser = require("../validations/user.validation.js");
const { validationResult } = require("express-validator/check");
const express = require('express');
const router = express.Router();

//GET 
router.get("", function(req, res){
    var query = "SELECT * FROM [dbo].[User]";
    executeQuery(res,query);
});

//POST
router.post("", validateUser.operation.create_user, function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { Name, Email, Password } = req.body;
    var query = `INSERT INTO [dbo].[User] (Name, Email, Password)
    VALUES ('${Name}',' ${Email}','${Password}')`;
    executeQuery(res,query);
});

//PUT
router.put("/:id", validateUser.operation.update_user, function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { Name, Email, Password } = req.body;
    const id = req.params.id;
    var query = `UPDATE [dbo].[User]
                 SET Name = '${Name}',
                     Email = '${Email}',
                     Password = '${Password}'
                 WHERE Id = '${id}'`;
    executeQuery(res,query);
});

//DELETE
router.delete("/:id", validateUser.operation.delete_user, function(req, res){
    const id = req.params.id; 
    var query = `DELETE FROM [dbo].[User] WHERE Id = ${id}`;
    executeQuery(res, query);
});

module.exports = router;