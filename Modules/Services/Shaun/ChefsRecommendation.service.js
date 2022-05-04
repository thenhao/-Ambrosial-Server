//This must be commented for the other to work
//prisma version:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const MenuFoodItem = require("../../ORM/ambrosial/menu-item.model");

module.exports = {

    findChefsRecommendation: async() => {
      let result = {
        data: null,
        status: null,
        message: null
      }

      //This must be commented for the other to work
      // (prisma)
      // const menuFoodItem = await prisma.Menu_Item.findMany({
      //     // Returns all distinct order field
      //     where: {
      //         chefRecommendation: true
      //       }
      //     }
      //   );

      //This must be commented for the other to work
      // (sequelize)
      const menuFoodItem = await MenuFoodItem.findAll({
                  where:{
                      chefRecommendation:true
                  }
                });

      if (!menuFoodItem){
        result.status = 404;
        result.message = `This menu item does not exist`
        return result;
      }

      result.data = menuFoodItem;
      result.status = 200;
      result.message = `Menu item successfully found`;
      return result;
  }

}