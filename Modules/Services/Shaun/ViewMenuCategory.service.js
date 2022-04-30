
const MenuItem = require("../../ORM/ambrosial/menu-item.model.js");



module.exports = {
    findSpecificMenuCategory: async(category) =>{
        console.log (category);
        
        let result = {
            message:null,
            status: null,
            data: null
        }

       
        const menuItem = await MenuItem.findAll({
            where:{
                category:category
            }
    
});
        
        

        
        if(!menuItem){
            result.message = `Selected Menu Item ${menuItem} is not found`;
            result.status = 404;
            return result;
        }

        result.data = menuItem;
        result.status = 200;
        result.message = `All menu items are shown `;
        return result

       

    },

    findAll: async()=>{
        let result = {
            message:null,
            status: null,
            data: null
        }
        
       const foodCategory = await MenuItem.findAll({include: category});

      if(!foodCategory){
            result.message = `No such categories found`;
            result.status = 404;
            return result;
        }

        result.data = foodCategory;
        result.status = 200;
        result.message = `All food items are as found `;

        return result;
    }
}