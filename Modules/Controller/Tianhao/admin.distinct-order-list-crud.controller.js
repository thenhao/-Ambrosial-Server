const Joi = require('joi');
//import the service
const DistinctOrderCrudService = require("../../Services/Tianhao/admin.distinct-order-list-crud.services");
//remove next from req, res
class DistinctOrderCrudController{
    
    async createDistinctOrder(req, res, next){
        console.log(typeof req.body);

        const schema = Joi.object().keys({
            orderNo:Joi.number().required(),
        });

        try{
            schema.validate( req.body );
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await DistinctOrderCrudService.createDistinctOrder(req.body);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async updateDistinctOrder(req, res, next){
        console.log(typeof req.body);

        const schema = Joi.object().keys({
            orderNoOld:Joi.number().required(),
            orderNoNew:Joi.number().required(),
        });

        try{
            schema.validate( req.body );
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await DistinctOrderCrudService.updateDistinctOrder(req.body);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async deleteDistinctOrder(req, res, next){
        console.log(typeof req.params.orderNo);

        const convertedOrderNo = parseInt(req.params.orderNo);

        const schema = Joi.object().keys({
            orderNo:Joi.number().required(),
        });

        try{
            schema.validate( convertedOrderNo );
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        //use the service layer
        const result = await DistinctOrderCrudService.deleteDistinctOrder(convertedOrderNo);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }


}

module.exports = DistinctOrderCrudController;