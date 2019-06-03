const operation = require("../validations/user.validation.js").operation;
const userService = require('../services/user.service.js');
const validateRequest = require('../helper/validationHelper.js');
const authorization = require('../common/authorization.js');
const express = require('express');
const router = express.Router();

// User API
router.get("", authorization, getAll);
router.post("", operation.create_user, create);
router.post("/login", operation.login_user, login);
router.put("/:id", operation.update_user, update);
router.delete("/:id", operation.delete_user, deleteUser);
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
            var user = await userService.createUser(req);
            return res.status(201)
                .json({ token: user, message: "Succesfully created user"});
        } catch (e) {
            return res.status(400)
                .json({ status: 400, message: "User creation failed"});
        }
    } else{
        return res.status(422)
            .json({ status:422, errors : errors, message: "User creation failed validation"});
    }
};

async function login(req, res){
    var [isValid, errors] = validateRequest(req, res);
    if (isValid) {
        try {
            var user = await userService.loginUser(req);
            return res.status(201)
                .json({ token: user, message: "User succesfully login"})
        } catch (error) {
            return res.status(400)
                .json({ status: 400, message: "User login failed"});
        }
    } else {
        return res.status(400)
            .json({ status: 400, errors: errors, message: "User login failed validation"});
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
                .json({ status: 400, message: "User update failed"});
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
                .json({ status: 200, message: "Succesfully deleted user"});
        } catch(e) {
            return res.status(400)
                .json({ status: 400, message: "User delete failed"});
        }
    } else {
        return res.status(422)
            .json({ status: 422, errors: errors, message: "User delete failed validation"});
    }
};