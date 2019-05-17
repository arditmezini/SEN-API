const { check } = require("express-validator/check");

exports.operation = {
    create_user:[
        check("Name").isString().isLength({ min : 3, max: 50}),
        check("Email").isEmail(),
        check("Passoword")
            .isLength({ min:6 , max: 50})
            .withMessage("Password length is not correct.")
    ],
    update_user:[
        check("Name").isString().isLength({ min : 3, max: 50}),
        check("Email").isEmail(),
        check("Passoword").isLength({ min:6 , max: 50})
    ],
    delete_user:[
        
    ]
}