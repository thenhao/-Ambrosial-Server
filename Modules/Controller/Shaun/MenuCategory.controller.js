const Joi = require('joi');
const ViewMenuCategoryService = require('../../Services/Shaun/ViewMenuCategory.service.js');
//import the service

class MenuCategoryController{
    
    async findSpecificMenuCategory(req, res, next){
        console.log(typeof req.params.category);

        const schema = Joi.object().keys({
            menuCategory: Joi.number().required()
        });

        try{
            schema.validate({ menuCategory:req.params.category });
        }catch(error){
            res.status(400);
            return res.json({message:"Item not found"})
        }

        
        const result = await ViewMenuCategoryService.findSpecificMenuCategory(req.params.category);
        res.status(result.status);

       
        return res.json({data:result.data, status: result.status, message:result.message});
    }

    async findAll(res,){
        const result = await ViewMenuCategoryService.findAll();
        res.status(result.status);
        return res.json({data:result.data, status: result.status, message:result.message});
    }
}

module.exports = MenuCategoryController;