const executeQuery = require('../helper/queryHelper.js');
const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator/check');

//GET 
router.get("", function(req, res){
    var query = "SELECT * FROM [User]";
    executeQuery(res,query);
});

//POST
router.post("",[
    check("Name").isString().isLength({ min : 3, max: 50}),
    check("Email").isEmail(),
    check("Passoword").isLength({ min:6 , max: 50})
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { Name, Email, Password } = req.body;
    var query = `INSERT INTO [User](Name, Email, Password)
    VALUES (${Name}, ${Email},${Password})`;
    executeQuery(res,query);
});

//PUT
router.put("/:id",[
    check("Name").isString().isLength({ min : 3, max: 50}),
    check("Email").isEmail(),
    check("Passoword").isLength({ min:6 , max: 50})
], function(req, res){
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }

    const { Name, Email, Password } = req.body;
    const { id } = req.params.id;
    var query = `UPDATE [User]
                 SET Name = ${Name},
                     Email = ${Email},
                     Password = ${Password}
                 WHERE Id = ${id}`;
    executeQuery(res,query);
});

//DELETE
router.delete("/:id",function(req, res){
    const { id } = req.params.id; 
    var query = `DELETE FROM [User] WHERE Id = ${id}`;
    executeQuery(res, query);
});

module.exports = router;