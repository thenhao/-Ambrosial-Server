const express = require('express');
const router = express.Router();

const RegisterController = require('../../Controller/Authorization/registerController');
const registerController = new RegisterController();

router.post('/register', registerController.register);

module.exports = router;