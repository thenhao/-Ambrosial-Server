//const {authSupervisor} = require('../../Authorization/auth'); // for JWT role auth
const express = require("express");
//to bring in the controller for supervisor under my folder
const DistinctOrderCrudController = require("../../Controller/Tianhao/admin.distinct-order-list-crud.controller");
const router = express.Router();

//Instantiate a new instance of the class
const distinctOrderCrudController = new DistinctOrderCrudController();

router.post("/createdistinctorder", distinctOrderCrudController.createDistinctOrder);
router.put("/updatedistinctorder/:orderNoId", distinctOrderCrudController.updateDistinctOrder);
router.delete("/deletedistinctOrder/:orderNoId", distinctOrderCrudController.deleteDistinctOrder);
router.get("/viewdistinctorder", distinctOrderCrudController.findAllOrders);
router.get("/viewspecificdistinctorder/:distinctOrderNoId", distinctOrderCrudController.findSpecificOrder);

module.exports = router;