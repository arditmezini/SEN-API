const { validationResult } = require("express-validator/check");

module.exports = function(req, res){
    const errors = validationResult(req);
    var isValid = true;
    
    if (!errors.isEmpty()) {
      res.status(422).json({ errors: errors.array() });
      isValid = false;
    }
    return isValid;
}