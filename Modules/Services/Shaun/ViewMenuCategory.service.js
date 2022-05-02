//This must be commented for the other to work
//prisma version:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


//This must be commented for the other to work
//sequelise version: Import models for receipts and order
const MenuItem = require("../../ORM/ambrosial/menu-item.model.js");



module.exports = {
    findSpecificMenuCategory: async(category) =>{
        console.log (category);
        
        let result = {
            message:null,
            status: null,
            data: null
        }

        //This must be commented for the other to work
        // (prisma)
        // const menuItem = await prisma.Menu_Item.findMany({

        //     where: {
        //         category: category
        //       }
        //     }
        //   );
       
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
       
       //This must be commented for the other to work
        //(prisma)
        // const foodCategory = await prisma.Menu_Item.findMany();

       const foodCategory = await MenuItem.findAll();

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