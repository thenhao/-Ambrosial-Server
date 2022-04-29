const express = require('express');
const router = express.Router();

const ChangePasswordController = require('../../Controller/Authorization/change-password.controller');
const changePasswordController = new ChangePasswordController();

router.post('/changepassword', changePasswordController.changePassword);

module.exports = router;