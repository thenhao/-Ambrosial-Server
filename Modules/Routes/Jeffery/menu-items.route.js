const express = require("express");
const router = express.Router();

const MenuItemController = require('../../Controller/Jeffery/menu-items.controller');//Ensure same as export in other file
// const MenuItem = require("../../ORM/menu-item.model");
// const {authClinic} = require('../../Authorization/auth'); // this is for JWT role auth, please do not remove this!

//Instantiate a new instance of the class

const menuItemController = new MenuItemController();

// POST /createnewrecord
/*
{
    menuItemID:integer (PK),
    src:string (image url),
    alt: string (item description),
    type: string (cuisine),
    price: integer,
    
}
}   Input Method
    "menuItemID": "",
    "src": "",
    "alt": "",
    "type": "",
    "price": ""
}
*/
router.get("/findmenuitem", menuItemController.findAll);
router.post("/newmenuitem", menuItemController.createNewMenuItem);



// router.get('/newrecord', async (req, res) => {
//     const list = await medicalRecordModel.findAll();
//     res.send(list);
// })

module.exports = router;