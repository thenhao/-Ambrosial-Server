const express = require("express");
const router = express.Router();

const MenuItemsController = require('../../Controller/Jeffery/menu-items.controller');//Ensure same as export in other file
// const MenuItem = require("../../ORM/menu-item.model");
// const {authClinic} = require('../../Authorization/auth'); // this is for JWT role auth, please do not remove this!

//Instantiate a new instance of the class
const menuItemsController = new MenuItemsController();

// POST /createnewrecord
/*
{
    menuItemID:integer (PK),
    src:string (image url),
    alt: string (item description),
    type: string (breakfast, lunch, dinner, dessert, beverage, etc),
    price: integer,
    "category": string (cuisine),
    "chefRecommendation": boolean ("yes or not"),
}
}   Input Method
    "menuItemID": "",
    "src": "",
    "alt": "",
    "type": "",
    "price": "",
    "category": "",
    "chefRecommendation": "",

}
*/

//1. Create New Menu Item  
router.post("/new-mi", menuItemsController.createNewMenuItem);
//2. Get All Menu Items
router.get("/findall-mi", menuItemsController.findAllMenuItems);
//3. Update A Menu Item
router.put("/update-mi/:menuItemID", menuItemsController.updateMenuItem);


// router.get('/newrecord', async (req, res) => {
//     const list = await medicalRecordModel.findAll();
//     res.send(list);
// })

module.exports = router;