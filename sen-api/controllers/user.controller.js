const validateUser = require("../validations/user.validation.js");
const userService = require('../services/user.service.js');
const validateRequest = require('../helper/validationHelper.js');
const express = require('express');
const router = express.Router();

// User API
router.get("", getAll);
router.post("", validateUser.operation.create_user, create);
router.put("/:id", validateUser.operation.update_user, update);
router.delete("/:id", validateUser.operation.delete_user, deleteUser);
module.exports = router;

async function getAll(req, res){
    try {
        var users = await userService.getAllUsers();
        return res.status(200)
            .json({ status: 200, data: users, message:"Users succesfully retrived"});
    } catch(e) {
        return res.status(400)
            .json({ status: 400, message: e.message });
    }
};

async function create(req, res){
    var [isValid, errors] = validateRequest(req, res);
    if(isValid){
        try {
            await userService.createUser(req);
            return res.status(201)
                .json({ status: 200, message: "Succesfully created user"});
        } catch (e) {
            return res.status(400)
                .json({ status: 400, message: "User creation failed"});
        }
    } else{
        return res.status(422)
            .json({ status:422, errors : errors, message: "User creation failed validation"});
    }
};

async function update(req, res){
    var [isValid, errors] = validateRequest(req, res);
    if(isValid) {
        try {
            await userService.updateUser(req);
            return res.status(201)
                .json({ status: 200, message: "Succesfully updated user"});
        } catch(e) {
            return res.status(400)
                .json({ status: 400, message: "User udpdate failed"});
        }
    } else {
        return res.status(422)
            .json({ status: 422, errors: errors, message: "User update failed validation"});
    }
};

async function deleteUser (req, res){
    var [isValid, errors] = validateRequest(req, res);
    if(isValid){
        try {
            await userService.deleteUser(req);
            return res.status(201)
                .json({ status: 200, message: "Succesgully deleted user"});
        } catch(e) {
            return res.status(400)
                .json({ status: 400, message: "User delete failed"});
        }
    } else {
        return res.status(422)
            .json({ status: 422, errors: errors, message: "User delete failed validation"});
    }
};