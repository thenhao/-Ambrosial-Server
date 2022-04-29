const express = require('express');
const router = express.Router();

const LoginController = require('../../Controller/Authorization/login.controller');
const loginController = new LoginController();

router.post('/login', loginController.login);

module.exports = router;