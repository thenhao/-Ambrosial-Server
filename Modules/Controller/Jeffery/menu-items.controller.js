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

  //1. Create New Menu Item
  async createNewMenuItem(req, res, next) {

    const { menuItemID, src, alt, type, price, category, chefRecommendation } = req.body;

    const schema = Joi.object().keys({
      menuItemID: Joi.number().required(),
      src: Joi.string().required(),
      alt: Joi.string().required(),
      type: Joi.string().required(),
      price: Joi.number().precision(2).required(),
      category: Joi.string().required(),
      chefRecommendation: Joi.boolean().required(),
    });

    const validation = schema.validate(req.body);
    if (validation) {
      const result = await menuItemsService.createNewMenuItem(menuItemID, src, alt, type, price, category, chefRecommendation);
      res.json({ data: result.data, status: result.status, message: result.message })
    } else if (!validation) {
      res.status(400).json({ message: "Incorrect request data" })
    }



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

  //2. Get All Menu Items

  async findAllMenuItems(req, res, next) {
    const result = await menuItemsService.findAllMenuItems();
    res.status(result.status);
    return res.json({ data: result.data, status: result.status, message: result.message });
  }

  //3. Update Menu Item

  async updateMenuItem(req, res, next) {

    console.log(`Updating menu Item ${req.params.menuItemID} with`, req.body);

    if (Object.entries(req.body).length === 0 || !req.params.menuItemID) {
      res.status(400);
      return (res.json({
        message: `invalid updating request`,
      }))
    };


    try {
      //If error, change the require body to the individual variable
      let result = await menuItemsService.updateMenuItem(req.params.menuItemID, req.body);

      res.status(result.status);

      return res.json({ data: result.data, status: result.status, message: result.message });

    } catch (err) {

      console.log(err);
      res.status(500)

      return (res.json({
        message: err
      }));
    };

  };




  //4. Delete Menu Item
  // async deleteMenuItems(req, res, next) {
  //   const result = await menuItemsService.findAllMenuItems(menuItemID);
  //   res.status(result.status);
  //   return res.json({ data: result.data, status: result.status, message: result.message });
  // }

  async deleteMenuItem(req, res, next) {

    console.log(`Request to delete recipe id ${req.params.menuItemID}`);

    const result = await menuItemsService.deleteMenuItem(req.params.menuItemID);

    res.status(result.status);

    return res.json({ data: result.data, message: result.message });
  }




}
module.exports = MenuItemsController;