const Joi = require('joi');
const CurrentVisitService = require('../../Services/Regina/clinicCurrentVisit.service');

class CurrentVisitController {

  async createVisitRecord(req, res){

    const schema = Joi.object().keys({
      clinicID: Joi.number().required(),
      fin: Joi.string().min(9).max(9).trim().required(),
      issueMC: Joi.boolean().required(),
      mcID: Joi.number().required(),
      nextOfKinID: Joi.number().required(),
      currentDiagnosis: Joi.string().required()
    });
   
    const dataValidation = schema.validate(req.body);

    if(dataValidation){
      const result = await CurrentVisitService.createVisitRecord(req.body);
      res.status(result.status);
      return res.json({data: result.data, status: result.status, message: result.message});
    }
    else if(!dataValidation){
      res.status(400);
      return res.json({message: "Incorrect request data."});
    } 
  }
}

module.exports = CurrentVisitController;