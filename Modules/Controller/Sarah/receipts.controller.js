// Import Joi for validation
const Joi = require('joi');

// Import the service for receipts
const receiptsService = require("../../Services/Sarah/receipts.service.js");

// Create class for controller for receipts
class ReceiptsController {
    // Function to find one receipt
    async findOneReceipt(req, res){
        // Define validation for req.body
        const schema = Joi.object().keys({
            orderId: Joi.number().required()
        });

        // Implement validation, else throw an error
        try{
            schema.validate({ orderId:req.params.orderId });
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        // Use receipts service layer
        const result = await receiptsService.findOneReceipt(req.params.orderId);
        res.status(result.status);

        // Return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    // Function to find all receipts
    async findAllReceipts(req, res){
        // Use receipts service layer
        const result = await receiptsService.findAll();
        res.status(result.status);
        // Return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }
}

module.exports = ReceiptsController;