var env = process.env.NODE_ENV || "dev";
var config = require('../config')[env];
var jwt = require('jsonwebtoken');

module.exports = function(req, res, next){
    
    var token = req.headers['x-access-token'];
    var msg = { auth: false, message: 'No token provided.' };
    if(!token)
        return res.status(500).json({msg});

    jwt.verify(token, config.jwt.secretKey, function(err, decoded){
        var msg = { auth: false, message: 'Failed to authenticate token.' };
        if(err)
            return res.status(500).json({ msg });

        res.userId = decoded.id;
        next();
    });
}