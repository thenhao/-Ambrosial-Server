//const {authSupervisor} = require('../../Authorization/auth'); // for JWT role auth
const express = require("express");
//to bring in the controller for supervisor under my folder
const OrderCrudController = require("../../Controller/Tianhao/admin.order-crud.controller");
const router = express.Router();

//Instantiate a new instance of the class
const orderCrudController = new OrderCrudController();

router.post("/createorder", orderCrudController.createOrder);
router.put("/updateorder", orderCrudController.updateOrder);
router.delete("/deleteOrder/:orderID", orderCrudController.deleteOrder);
router.get("/vieworderitems", orderCrudController.findAllOrders);
router.get("/vieworderitems/:orderNo", orderCrudController.findSpecificOrder);


module.exports = router;