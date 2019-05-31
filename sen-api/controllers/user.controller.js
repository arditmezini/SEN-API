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
    res.send(await userService.getAllUsers());
};

async function create(req, res){
    if(validateRequest(req, res))
        res.send(await userService.createUser(req, res));
};

async function update(req, res){
    if(validateRequest(req, res)) 
        res.send(await userService.updateUser(req, res));
};

async function deleteUser (req, res){
    if(validateRequest(req, res))
        res.send(await userService.deleteUser(req, res));
};