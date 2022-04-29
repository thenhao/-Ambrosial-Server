const express = require('express');
const router = express.Router();

const RegisterController = require('../../Controller/Authorization/register.controller');
const registerController = new RegisterController();

router.post('/login', registerController.register);

module.exports = router;