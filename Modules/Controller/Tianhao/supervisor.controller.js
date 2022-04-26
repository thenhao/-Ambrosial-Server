const Joi = require('joi');
//import the service
const supervisorService = require("../../Services/Tianhao/supervisor.service.js");

class SupervisorController{
    
    async findSpecificEmployee(req, res, next){
        console.log(typeof req.params.employeeID);

        const schema = Joi.object().keys({
            employeeID: Joi.number().required()
        });

        try{
            schema.validate({ employeeID:req.params.employeeID });
        }catch(error){
            res.status(400);
            return res.json({message:"Incorrect request data"})
        }

        // //use the service layer
        const result = await supervisorService.findSpecificEmployee(req.params.employeeID);
        res.status(result.status);

        //return the result from the service
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async findAll(req, res, next){
        const result = await supervisorService.findAll();
        res.status(result.status);
        return res.json({data:result.data, status: result.status, message:result.message});
    }
}

module.exports = SupervisorController;