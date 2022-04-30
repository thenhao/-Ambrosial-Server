const Joi = require('joi');
//import the service
const PaymentCrudService = require("../../Services/Tianhao/admin.payment-crud.services");
//remove next from req, res
class PaymentCrudController{
    
    async createPayment(req, res, next){
        console.log(typeof req.body);

        const schema = Joi.object().keys({
            receiptId:Joi.number().required(),
            paymentType:Joi.string().required(),
            paymentStatus:Joi.string().required(),
        });

        try{
            schema.validate( req.body );
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await PaymentCrudService.createPayment(req.body);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async updatePayment(req, res, next){
        console.log(typeof req.body);

        const schema = Joi.object().keys({
            receiptId:Joi.number().required(),
            paymentType:Joi.string().required(),
            paymentStatus:Joi.string().required(),
        });

        try{
            schema.validate( req.body );
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await PaymentCrudService.updatePayment(req.body);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async deletePayment(req, res, next){
        console.log(typeof req.params.invoiceID);

        const convertedinvoiceId = parseInt(req.params.invoiceID);

        const schema = Joi.object().keys({
            orderID:Joi.number().required(),
        });

        try{
            schema.validate( convertedinvoiceId );
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await PaymentCrudService.deletePayment(convertedinvoiceId);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async findSpecificPayment(req, res, next){
        console.log(typeof req.params.invoiceID);

        const schema = Joi.object().keys({
            invoiceID: Joi.number().required()
        });

        try{
            schema.validate({ invoiceID:req.params.invoiceID });
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await PaymentCrudService.findSpecificPayment(req.params.invoiceID);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async findAllPayments(req, res, next){
        const result = await PaymentCrudService.findAllPayments();
        res.status(result.status);
        return res.json({data:result.data, status: result.status, message:result.message});
    }


}

module.exports = PaymentCrudController;