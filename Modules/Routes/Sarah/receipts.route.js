// JWT role authentication for Admin
// const {authAdmin} = require('../../Authorization/auth');

// Import express and use express router
const express = require('express');
const router = express.Router();

// Import controller
const ReceiptsController = require('../../Controller/Sarah/receipts.controller.js');
const receiptsController = new ReceiptsController();

// Use CRUD Method for receipts
router.get('/receipts', receiptsController.findAllReceipts);
router.get("/receipts/:orderNoId", receiptsController.findSpecificReceipt);
router.post('/createreceipt', receiptsController.createReceipt);
router.put('/updatereceipt/:receiptID', receiptsController.updateReceipt);
router.delete('/deletereceipt/:receiptID', receiptsController.deleteReceipt);

module.exports = router;