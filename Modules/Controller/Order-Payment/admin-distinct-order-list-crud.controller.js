const Joi = require('joi');
//import the service
const DistinctOrderCrudService = require("../../Services/Order-Payment/admin-distinct-order-list-crud.services");
//remove next from req, res
class DistinctOrderCrudController {

    async createDistinctOrder(req, res, next) {
        console.log(typeof req.body);

        const schema = Joi.object().keys({
            orderNo: Joi.number().required(),
        });

        try {
            schema.validate(req.body);
        } catch (error) {
            res.status(400);
            return res.json({ message: "Incorrect request data" })
        }

        //use the service layer
        const result = await DistinctOrderCrudService.createDistinctOrder(req.body);
        res.status(result.status);

        //return the result from the service
        return res.json({ data: result.data, status: result.status, message: result.message });
    }

    async updateDistinctOrder(req, res, next) {
        console.log(typeof req.body);

        const convertedOrderNoId = parseInt(req.params.orderNoId);

        const schemaBody = Joi.object().keys({
            orderNoOld: Joi.number().required(),
            orderNoNew: Joi.number().required(),
        });

        const schemaParams = Joi.object().keys({
            convertedOrderNoId: Joi.number().required(),
        });

        try {
            schemaBody.validate(req.body);
            schemaParams.validate(convertedOrderNoId);
        } catch (error) {
            res.status(400);
            return res.json({ message: "Incorrect request data" })
        }

        //use the service layer
        const result = await DistinctOrderCrudService.updateDistinctOrder(convertedOrderNoId, req.body);
        res.status(result.status);

        //return the result from the service
        return res.json({ data: result.data, status: result.status, message: result.message });
    }

    async deleteDistinctOrder(req, res, next) {
        console.log(typeof req.params.orderNoId);

        const convertedOrderNoId = parseInt(req.params.orderNoId);

        const schema = Joi.object().keys({
            orderNo: Joi.number().required(),
        });

        try {
            schema.validate(convertedOrderNoId);
        } catch (error) {
            res.status(400);
            return res.json({ message: "Incorrect request data" })
        }

        //use the service layer
        const result = await DistinctOrderCrudService.deleteDistinctOrder(convertedOrderNoId);
        res.status(result.status);

        //return the result from the service
        return res.json({ data: result.data, status: result.status, message: result.message });
    }

    async findSpecificOrder(req, res, next) {
        console.log(typeof req.params.distinctOrderNoId);

        const convertedDistinctOrderNoId = parseInt(req.params.distinctOrderNoId);

        const schema = Joi.object().keys({
            orderNoId: Joi.number().required()
        });

        try {
            schema.validate({ orderNoId: convertedDistinctOrderNoId });
        } catch (error) {
            res.status(400);
            return res.json({ message: "Incorrect request data" })
        }

        //use the service layer
        const result = await DistinctOrderCrudService.findSpecificOrder(convertedDistinctOrderNoId);
        res.status(result.status);

        //return the result from the service
        return res.json({ data: result.data, status: result.status, message: result.message });
    }

    async findAllOrders(req, res, next) {
        const result = await DistinctOrderCrudService.findAllOrders();
        res.status(result.status);
        return res.json({ data: result.data, status: result.status, message: result.message });
    }


}

module.exports = DistinctOrderCrudController;