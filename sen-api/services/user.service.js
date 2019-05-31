const sql = require('../helper/queryHelper.js');

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}

async function getAllUsers() {
    return await sql("SELECT * FROM [dbo].[User]").then(data => {
        return data;
    });
}

async function createUser(req, res) {
    const { Name, Email, Password } = req.body;
    return await sql("INSERT INTO [dbo].[User] (Name, Email, Password) VALUES (@name, @email, @password)",
        { name: Name, email: Email, password: Password}).then(data => {
            return data;
    })
}

async function updateUser(req, res) {
    const { Name, Email, Password } = req.body;
    const id = req.params.id;
    return await sql("UPDATE [dbo].[User] SET Name = @name, Email = @email, Password = @password WHERE Id = @id",
        { name: Name, email: Email, password: Password, id: id}).then(data => {
            return data;
        })
}

async function deleteUser(req, res) {
    const id = req.params.id;
    return await sql("DELETE FROM [dbo].[User] WHERE Id = @id", { id: id}).then(data => {
        return data;
    })
}