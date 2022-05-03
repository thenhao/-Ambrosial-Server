const Joi = require('joi');
//import the service
const OrderCrudService = require("../../Services/Tianhao/admin.order-crud.service");
//remove next from req, res
class OrderCrudController{
    
    async createOrder(req, res, next){
        console.log(typeof req.body);

        const schema = Joi.object().keys({
            orderNoId:Joi.number().required(),
            menuItemID:Joi.number().required(),
            quantity:Joi.number().required(),
            totalItemPrice:Joi.number().required(),
            tableNo:Joi.number().required(),
            orderStatus:Joi.string().required(),
        });

        try{
            schema.validate( req.body );
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await OrderCrudService.createOrder(req.body);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async updateOrder(req, res, next){
        console.log(typeof req.body);

        const convertedOrderId = parseInt(req.params.orderId);

        const schemaBody = Joi.object().keys({
            //orderID:Joi.number().required(),
            orderNoId:Joi.number().required(),
            menuItemID:Joi.number().required(),
            quantity:Joi.number().required(),
            totalItemPrice:Joi.number().required(),
            tableNo:Joi.number().required(),
            orderStatus:Joi.string().required(),
        });

        const schemaParams = Joi.object().keys({
            orderNoId:Joi.number().required(),
        });

        try{
            schemaBody.validate( req.body );
            schemaParams.validate( {orderNoId:convertedOrderId} );
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await OrderCrudService.updateOrder(convertedOrderId,req.body);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async deleteOrder(req, res, next){
        console.log(typeof req.params.orderId);

        const convertedOrderId = parseInt(req.params.orderId);

        const schema = Joi.object().keys({
            orderId:Joi.number().required(),
        });

        try{
            schema.validate( convertedOrderId );
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await OrderCrudService.deleteOrder(convertedOrderId);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async findSpecificOrder(req, res, next){
        console.log(typeof req.params.orderNo);

        const convertedOrderNo = parseInt(req.params.orderNo);

        const schema = Joi.object().keys({
            orderNo: Joi.number().required()
        });

        try{
            schema.validate({ orderNo:convertedOrderNo });
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await OrderCrudService.findSpecificOrder(convertedOrderNo);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async findAllOrders(req, res, next){
        const result = await OrderCrudService.findAllOrders();
        res.status(result.status);
        return res.json({data:result.data, status: result.status, message:result.message});
    }


}

module.exports = OrderCrudController;