var env = process.env.NODE_ENV || "dev";
var config = require('../config')[env];
const bcrypt = require('bcryptjs');
const sql = require('../helper/queryHelper.js');
const tokenService = require('./token.service.js');

module.exports = {
    getAllUsers,
    createUser,
    updateUser,
    deleteUser, 
    loginUser, 
    findUserByUsername
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
    const { FirstName, LastName, Username, Email, Password } = req.body;
    var hashPassword = bcrypt.hashSync(Password, config.jwt.salt_length);
    try {
        var user =  await sql("INSERT INTO [dbo].[User] (FirstName, LastName, Username, Email, Password) VALUES (@fistName, @lastName, @usename, @email, @password)",
        { fistName: FirstName, lastName: LastName, usename:Username, email: Email, password: hashPassword}).then(data => {
            return data;
        });  

        return await tokenService.signIn(user.Id);
    } catch(e) {
        throw Error("Error while creating user...")
    }
}

async function updateUser(req) {
    const { FirstName, LastName, Username, Email } = req.body;
    const id = req.params.id;

    try {
        return await sql("UPDATE [dbo].[User] SET FirstName = @fistName, LastName = @lastName, Username = @usename, Email = @email WHERE Id = @id",
        { fistName: FirstName, lastName: LastName, usename:Username, email: Email, id: id}).then(data => {
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

async function loginUser(req){
    const { Username, Password } = req.body;
    try {
        var user = await findUserByUsername(Username);
        var passValid = bcrypt.compareSync(Password, user[0].Password);
        if(!passValid)
            throw Error('Invalid username/password...')
       
        return tokenService.signIn(user[0].Id);
    } catch (error) {
        throw Error('Error while logging in user...');
    }
}

async function findUserByUsername(username){
    try {
        return await sql("SELECT TOP 1 * FROM [dbo].[User] WHERE [Username] = @username", { username: username}).then(data => {
            return data;
        });
    } catch (error) {
        throw Error("Error while retriving single user...");
    }
}