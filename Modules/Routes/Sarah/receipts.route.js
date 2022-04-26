// JWT role authentication for Admin
const {authAdmin} = require('../../Authorization/auth');

// Import express and use express router
const express = require('express');
const router = express.Router();

// Import controller
const ReceiptsController = require('../../Controller/Sarah/receipts.controller.js');
const receiptsController = new ReceiptsController();

// Use Read Method for finding all receipts
// Use Read Method for finding one receipt
router.get('/receipts', authAdmin, receiptsController.findAllReceipts);
router.get("/receipts/:orderId", authAdmin, receiptsController.findOneReceipt);

module.exports = router;