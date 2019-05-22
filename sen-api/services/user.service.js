const executeQuery = require('../helper/queryHelper.js');
const { validationResult } = require("express-validator/check");

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}

async function getAllUsers(res) {
    var query = "SELECT * FROM [dbo].[User]";
    await executeQuery(res,query);
}

async function createUser(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ errors: errors.array() });
    }
    const { Name, Email, Password } = req.body;
    var query = `INSERT INTO [dbo].[User] (Name, Email, Password)
    VALUES ('${Name}',' ${Email}','${Password}')`;
    await executeQuery(res,query);
}

async function updateUser(req, res) {
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
    await executeQuery(res,query);
}

async function deleteUser(req, res) {
    const id = req.params.id; 
    var query = `DELETE FROM [dbo].[User] WHERE Id = ${id}`;
    await executeQuery(res, query);
}