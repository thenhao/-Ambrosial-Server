const Joi = require('joi');
const menuItemsService = require("../../Services/Jeffery/menu-items.service");

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
class MenuItemsController {

  async createNewMenuItem(req, res) {

    const { menuItemID, src, alt, type, price } = req.body;

    const schema = Joi.object().keys({
      menuItemID: Joi.number().required(),
      src: Joi.string().trim().required(),
      alt: Joi.string().required(),
      type: Joi.string().required(),
      price: Joi.number().required(),
    });

    const validation = schema.validate(req.body);
    if (validation) {
      const result = await menuItemsService.createNewMenuItem(menuItemID, src, alt, type, price);
      res.json({ data: result.data, status: result.status, message: result.message })
    } else if (!validation) {
      res.status(400).json({ message: "Incorrect request data" })
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
  async findAll(req, res) {
    const result = await menuItemsService.findAll();
    res.status(result.status);
    return res.json({ data: result.data, status: result.status, message: result.message });
  }
}
module.exports = MenuItemsController;