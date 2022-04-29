// JWT role authentication for Admin
// const {authAdmin} = require('../../Authorization/auth');

// Import express and use express router
const express = require('express');
const router = express.Router();

// Import controller
const ReceiptsController = require('../../Controller/Sarah/receipts.controller.js');
const receiptsController = new ReceiptsController();

// Use CRUD Method for receipts
router.get('/receipts', receiptsController.findAll);
router.get("/receipts/:orderNo", receiptsController.findByPk);
router.post('/createreceipt', receiptsController.createReceipt);
router.put('/updatereceipt/:orderNo', receiptsController.updateReceipt);
router.delete('/deletereceipt/:orderNo', receiptsController.deleteReceipt);

module.exports = router;