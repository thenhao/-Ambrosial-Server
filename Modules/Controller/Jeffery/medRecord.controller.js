const Joi = require('joi');
const medRecordService = require("../../Services/Jeffery/medRecord.service");

//Using Function
// const NewMedRecordController = async (req, res) => {
  
//     try{
//       const created = await medRecordService(req.body);
//       res.send(created);
//     }catch(e){
//       console.error("creaed new patient encountered error", e);      
//       res.sendStatus(500); // internal server error      
//     }
    
// }

//Using Class
class MedRecordController{
    
  async createNewMedRecord(req, res){

    const {clinicID, FIN, medicalHistory, nextOfKinID} = req.body;

    const schema = Joi.object().keys({
        clinicID: Joi.number().required(),
        FIN: Joi.string().trim().required(),
        medicalHistory: Joi.string().required(),
        nextOfKinID: Joi.number().required(),

    });

    const validation = schema.validate(req.body);
    if (validation) {
        const result = await medRecordService.createNewMedRecord(clinicID, FIN, medicalHistory, nextOfKinID);
        res.json({data:result.data, status: result.status, message:result.message})
    } else if (!validation) {
        res.status(400).json({message: "Incorrect request data"})
    }



      // console.log(typeof req.params.FIN);

      // const schema = Joi.object().keys({
      //     FIN: Joi.number().required()
      // });

      // try{
      //     schema.validate({ FIN:req.params.FIN });
      // }catch(error){
      //     res.status(400);
      //     return res.json({message:"Incorrect request data"})
      // }

      // // //use the service layer
      // const result = await medRecordService.createNewMedRecord(req.params.FIN);
      // res.status(result.status);

      // //return the result from the service
      // return res.json({data:result.data, status: result.status, message:result.message});
  }
    async findAll(req, res){
      const result = await medRecordService.findAll();
      res.status(result.status);
      return res.json({data:result.data, status: result.status, message:result.message});
  }
}
module.exports = MedRecordController;