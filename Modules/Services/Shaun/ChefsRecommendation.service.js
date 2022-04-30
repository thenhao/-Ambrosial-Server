const RecommendedItem = require("../../ORM/menu-item.model.js");
const MenuFoodItem = require("../../ORM/menu-item.model.js");

module.exports = {

  findChefsRecommendation: async() => {let result = {
      data: null,
      status: null,
      message: null
}

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

}}