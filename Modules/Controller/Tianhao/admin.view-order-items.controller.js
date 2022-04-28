const Joi = require('joi');
//import the service
const adminViewOrderItemsService = require("../../Services/Tianhao/admin.view-order-items.service");
//remove next from req, res
class AdminViewOrderItemsController{
    
    async findSpecificOrder(req, res, next){
        console.log(typeof req.params.orderID);

        const schema = Joi.object().keys({
            orderID: Joi.number().required()
        });

        try{
            schema.validate({ orderID:req.params.orderID });
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await adminViewOrderItemsService.findSpecificOrder(req.params.orderID);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async findAllOrders(req, res, next){
        const result = await adminViewOrderItemsService.findAllOrders();
        res.status(result.status);
        return res.json({data:result.data, status: result.status, message:result.message});
    }
}

module.exports = AdminViewOrderItemsController;