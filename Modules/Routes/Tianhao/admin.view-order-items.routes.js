//const {authSupervisor} = require('../../Authorization/auth'); // for JWT role auth
const express = require("express");
//to bring in the controller for supervisor under my folder
const AdminViewOrderItemsController = require("../../Controller/Tianhao/admin.view-order-items.controller");
const router = express.Router();

//Instantiate a new instance of the class
const adminViewOrderItemsController = new AdminViewOrderItemsController();

//user story: As a Supervisor, I am able to view all historical MC of the person by using his employee ID

router.get("/vieworderitems", adminViewOrderItemsController.findAllOrders);
router.get("/vieworderitems/:orderNo", adminViewOrderItemsController.findSpecificOrder);

module.exports = router;