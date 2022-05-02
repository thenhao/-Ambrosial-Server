const express = require("express");
const router = express.Router();

const MenuItemsController = require('../../Controller/Jeffery/menu-items.controller');//Ensure same as export in other file

//Instantiate a new instance of the class
const menuItemsController = new MenuItemsController();

//1. Create New Menu Item  
router.post("/new-mi", menuItemsController.createNewMenuItem);
//2. Get All Menu Items
router.get("/findall-mi", menuItemsController.findAllMenuItems);
//3. Update A Menu Item
router.put("/update-mi/:menuItemID", menuItemsController.updateMenuItem);
//4. Delete A Menu Item
router.delete("/delete-mi/:menuItemID", menuItemsController.deleteMenuItem);


module.exports = router;