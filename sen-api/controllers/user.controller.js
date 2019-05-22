const validateUser = require("../validations/user.validation.js");
const userService = require('../services/user.service.js');
const express = require('express');
const router = express.Router();

router.get("", getAll);
router.post("", validateUser.operation.create_user, create);
router.put("/:id", validateUser.operation.update_user, update);
router.delete("/:id", validateUser.operation.delete_user, deleteUser);
module.exports = router;

async function getAll(req, res){
    await userService.getAllUsers(res);
};

async function create(req, res){
    await userService.createUser(req, res);
};

async function update(req, res){
    await userService.updateUser(req, res);
};

async function deleteUser (req, res){
    await userService.deleteUser(req, res);
};