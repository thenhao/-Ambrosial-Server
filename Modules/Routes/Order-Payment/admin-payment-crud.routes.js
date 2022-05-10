//const {authSupervisor} = require('../../Authorization/auth'); // for JWT role auth
const express = require("express");
//to bring in the controller for supervisor under my folder
const PaymentCrudController = require("../../Controller/Order-Payment/admin-payment-crud.controller");
const router = express.Router();

//Instantiate a new instance of the class
const paymentCrudController = new PaymentCrudController();

router.post("/createpayment", paymentCrudController.createPayment);
router.put("/updatepayment/:invoiceID", paymentCrudController.updatePayment);
router.delete("/deletepayment/:invoiceID", paymentCrudController.deletePayment);
router.get("/viewpaymentlogs", paymentCrudController.findAllPayments);
router.get("/viewpaymentlogs/:invoiceID", paymentCrudController.findSpecificPayment);

module.exports = router;