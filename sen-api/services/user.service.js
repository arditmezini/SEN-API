const sql = require('../helper/queryHelper.js');

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser
}

async function getAllUsers() {
    try {
        return await sql("SELECT * FROM [dbo].[User]").then(data => {
            return data;
        });
    } catch(err) {
        throw Error("Error while retriving users...");
    }
}

async function createUser(req) {
    const { Name, Email, Password } = req.body;
    try {
        return await sql("INSERT INTO [dbo].[User] (Name, Email, Password) VALUES (@name, @email, @password)",
        { name: Name, email: Email, password: Password}).then(data => {
            return data;
        });  
    } catch(e) {
        throw Error("Error while creating user...")
    }
}

async function updateUser(req) {
    const { Name, Email, Password } = req.body;
    const id = req.params.id;

    try {
        return await sql("UPDATE [dbo].[User] SET Name = @name, Email = @email, Password = @password WHERE Id = @id",
        { name: Name, email: Email, password: Password, id: id}).then(data => {
            return data;
        })
    } catch(e) {
        throw Error("Error while updating user...");
    }
    
}

async function deleteUser(req) {
    const id = req.params.id;

    try {
        return await sql("DELETE FROM [dbo].[User] WHERE Id = @id", { id: id}).then(data => {
            return data;
        });
    } catch(e) {
        throw Error("Error while deleting user...")
    }
}