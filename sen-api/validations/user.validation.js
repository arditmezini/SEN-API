const { check } = require("express-validator/check");

exports.operation = {
    create_user:[
        check("FirstName").isString().isLength({ min : 3, max: 50}),
        check("LastName").isString().isLength({ min:3, max:50}),
        check("Username").isString().isLength({ min:3, max:50}),
        check("Email").isEmail(),
        check("Password")
            .isLength({ min:6 , max: 50})
            .withMessage("Password length is not correct.")
    ],
    update_user:[
        check("FirstName").isString().isLength({ min : 3, max: 50}),
        check("LastName").isString().isLength({ min:3, max:50}),
        check("Username").isString().isLength({ min:3, max:50}),
        check("Email").isEmail(),
        check("Password").isLength({ min:6 , max: 50})
    ],
    delete_user:[
        
    ],
    login_user:[
        check("Username").isLength({ min:3, max:50}),
        check("Password").isLength({ min:6 , max: 50})
    ]
};