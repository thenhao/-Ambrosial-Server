const menuCategoryItem = require("../../ORM/menu-item.model.js");
const type = require("../../ORM/menu-item.model.js");
const MenuItem = require("../../ORM/ambrosial/menu-item.model.js");



module.exports = {
    findSpecificMenuCategory: async(type) =>{
        
        let result = {
            message:null,
            status: null,
            data: null
        }

       
        const menuItem = await MenuItem.findByFk(menuItem);
        
        

        
        if(!menuItem){
            result.message = `Selected Menu Item ${menuItem} is not found`;
            result.status = 404;
            return result;
        }

        const category = await type.findByFk(menuCategoryItem.FIN);

        if(!type){
            result.message = `Category  ${menuCategoryItem.FIN} not found`;
            result.status = 404;
            return result;
        }

    },

    findAll: async()=>{
        let result = {
            message:null,
            status: null,
            data: null
        }
        
       const foodCategory = await foodCategory.findAll({include: type});

      if(!foodCategory){
            result.message = `No such categories found`;
            result.status = 404;
            return result;
        }

        result.data = foodCategory;
        result.status = 200;
        result.message = `All food items are as found `;

       ;
        return result;
    }
}