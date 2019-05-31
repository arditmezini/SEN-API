const { validationResult } = require("express-validator/check");

module.exports = function(req, res){
    const errors = validationResult(req);
    var isValid = true;
    
    if (!errors.isEmpty()) {
      isValid = false;
    }

    return [isValid, errors.array()];
}