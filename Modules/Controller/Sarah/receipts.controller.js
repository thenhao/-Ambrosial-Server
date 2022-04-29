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
            orderNo: Joi.number().required()
        });

        // Implement validation, else throw an error
        try {
            schema.validate({ orderNo: req.params.orderNo });
        } catch (error) {
            res.status(400);
            return res.json({ message: "Incorrect request data" })
        }

        // Use receipts service layer
        const result = await receiptsService.findSpecificReceipt(req.params.orderNo);
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
        // Define validation for req.body
        const schema = Joi.object().keys({
            orderNo: Joi.number().required(),
            totalPrice: Joi.number().required()
        });

        // Implement validation, else throw an error
        try {
            schema.validate({ orderNo: req.params.orderNo });
        } catch (error) {
            res.status(400);
            return res.json({ message: "Incorrect request data" })
        }

        const validation = schema.validate(req.body);
        if (validation) {
            const result = await receiptsService.createReceipt(orderNo, totalPrice);
            res.json({ data: result.data, status: result.status, message: result.message })
        } else if (!validation) {
            res.status(400).json({ message: result.message })
        }
    }



    // Function to update one receipt
    async updateReceipt(req, res) {
        // Define validation for req.body
        const schema = Joi.object().keys({
            orderNo: Joi.number().required(),
            totalPrice: Joi.number().required()
        });

        // Implement validation, else throw an error
        try {
            schema.validate({ orderNo: req.params.orderNo });
        } catch (error) {
            res.status(400);
            return res.json({ message: "Incorrect request data" })
        }

        // Use receipts service layer
        const validation = schema.validate(req.body);
        if (validation) {
            const result = await receiptsService.updateReceipt(orderNo, totalPrice);
            res.json({ data: result.data, status: result.status, message: result.message })
        } else if (!validation) {
            res.status(400).json({ message: result.message })
        }
    }




    // Function to delete one receipt
    async deleteReceipt(req, res) {
        // Define validation for req.body
        const schema = Joi.object().keys({
            orderNo: Joi.number().required()
        });

        // Implement validation, else throw an error
        try {
            schema.validate({ orderNo: req.params.orderNo });
        } catch (error) {
            res.status(400);
            return res.json({ message: "Incorrect request data" })
        }

        // Use receipts service layer
        const result = await receiptsService.deleteReceipt(req.params.orderNo);
        res.status(result.status);

        // Return the result from the service
        return res.json({ data: result.data, status: result.status, message: result.message });
    }
}

module.exports = ReceiptsController;