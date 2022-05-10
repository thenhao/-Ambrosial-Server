const Joi = require('joi');
const ViewMenuCategoryService = require('../../Services/Chef-Recommendation/view-menu-category.service.js');
//import the service

class MenuCategoryController {

    async findSpecificMenuCategory(req, res, next) {
        console.log(typeof req.params.category);

        const schema = Joi.object().keys({
            menuCategory: Joi.string().required()
        });

        try {
            schema.validate({ menuCategory: req.params.category });
        } catch (error) {
            res.status(400);
            return res.json({ message: "Item not found" })
        }


        const result = await ViewMenuCategoryService.findSpecificMenuCategory(req.params.category);
        res.status(result.status);


        return res.json({ data: result.data, status: result.status, message: result.message });
    }

    async findAll(req, res, next) {
        const result = await ViewMenuCategoryService.findAll();
        res.status(result.status);
        return res.json({ data: result.data, status: result.status, message: result.message });
    }
}

module.exports = MenuCategoryController;