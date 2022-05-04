// Import Joi for validation
const Joi = require('joi');

// Import the service for receipts
const receiptsService = require("../../Services/Sarah/receipts.service.js");

// Create class for controller for receipts
class ReceiptsController {
    // Function to find one receipt
    async findSpecificReceipt(req, res) {
        // Define validation for req.body
        const schema = Joi.object().keys({
            orderNoId: Joi.number().required()
        });

        const convertedOrderNoIdToInt = parseInt(req.params.orderNoId);

        // Implement validation, else throw an error
        try {
            schema.validate({ orderNoId: convertedOrderNoIdToInt });
        } catch (error) {
            res.status(400);
            return res.json({ message: "Incorrect request data" })
        }

        // Use receipts service layer
        const result = await receiptsService.findSpecificReceipt(convertedOrderNoIdToInt);
        res.status(result.status);

        // Return the result from the service
        return res.json({ data: result.data, status: result.status, message: result.message });
    }




    // Function to find all receipts
    async findAllReceipts(req, res) {
        // Use receipts service layer
        const result = await receiptsService.findAllReceipts();
        res.status(result.status);
        // Return the result from the service
        return res.json({ data: result.data, status: result.status, message: result.message });
    }




    // Function to create receipts
    async createReceipt(req, res) {
        const { orderNoId, totalPrice } = req.body;

        // Define validation for req.body
        const schema = Joi.object().keys({
            orderNoId: Joi.number().required(),
            totalPrice: Joi.number().precision(2).required()
        });

        // Implement validation, else throw an error
        const validation = schema.validate(req.body);
        if (validation) {
            const result = await receiptsService.createReceipt(orderNoId, totalPrice);
            res.json({ data: result.data, status: result.status, message: result.message })
            console.log(result.data)
        } else if (!validation) {
            res.status(400).json({ message: result.message })
        }
    }



    // Function to update one receipt
    async updateReceipt(req, res) {

        const convertedReceiptIdToInt = parseInt(req.params.receiptID);

        // Define validation for req.body
        const schema = Joi.object().keys({
            orderNoId: Joi.number().required(),
            totalPrice: Joi.number().precision(2).required()
        });

        // Use receipts service layer
        const validation = schema.validate(req.body);
        if (validation) {//
            const result = await receiptsService.updateReceipt(convertedReceiptIdToInt, req.body);
            res.json({ data: result.data, status: result.status, message: result.message })
        } else if (!validation) {
            res.status(400).json({ message: result.message })
        }
    }




    // Function to delete one receipt
    async deleteReceipt(req, res) {

        const convertedReceiptIdToInt = parseInt(req.params.receiptID);
        // Define validation for req.params
        const schema = Joi.object().keys({
            receiptID: Joi.number().required()
        });

        // Use receipts service layer
        const result = await receiptsService.deleteReceipt(convertedReceiptIdToInt);
        res.status(result.status);

        // Return the result from the service
        return res.json({ data: result.data, status: result.status, message: result.message });
    }
}

module.exports = ReceiptsController;