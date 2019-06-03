var env = process.env.NODE_ENV || "dev";
var config = require('../config')[env];
var jwt = require('jsonwebtoken');

module.exports = {
    signIn
}

async function signIn(userId){
    return await jwt.sign( {id: userId }, config.jwt.secretKey, { expiresIn: config.jwt.expireIn});
}
