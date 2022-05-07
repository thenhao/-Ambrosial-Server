//This must be commented for the other to work
//prisma version:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//This must be commented for the other to work
//sequelize version:
const MenuItem = require("../../ORM/ambrosial/menu-item.model.js");


module.exports = {
    /*
          Argument (data) must contain the following attributes:
          {
          }
          This attribute will be auto generated:
    */

    //1. Create New Menu Item  
    createNewMenuItem: async (menuItemID, src, alt, type, price, category, chefRecommendation) => {

        //   The result object is where we will put the result to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null,
        }

        //What we want:
        //1. Check if menuid exists
        //2. Check if menu item exists
        //3. If exists, return menu results

        // const findMenuItem = await MenuItem.findByPk();
        // if (!findMenuItem) {
        //     result.message = `Menu Item ${menuItemID} is not found in the database.`;
        //     result.status = 404;
        //     return result;
        // }

        try {
            //This must be commented for the other to work
            //Create receipt object (sequelize)
            const addMenuItem = await MenuItem.create({
                //menuItemID: menuItemID,
                src: src,
                alt: alt,
                type: type,
                price: price,
                category: category,
                chefRecommendation: chefRecommendation,

            });

            await addMenuItem.save();

            //This must be commented for the other to work
            //Create receipt object (prisma)
            // const receipt = await prisma.Menu_Item.create({
            //     data: {
            //         src: src,
            //         alt: alt,
            //         type: type,
            //         price: price,
            //         category: category,
            //         chefRecommendation: chefRecommendation,
            // }
            // });

            console.log('New Menu Item is saved to the database');
            //This must be commented for the other to work
            //Create receipt object (prisma)
            //result.data = receipt;
            //This must be commented for the other to work
            //Create receipt object (sequelize)
            result.data = addMenuItem;
            result.status = 200;
            result.message = "New Menu Item creation successful";
            return result;

        } catch (error) {
            console.log(error)
            result.message = `Error in creating Menu Item. Data not saved`;
            result.status = 500;
            return result;
        }
    },

    //2. Get All Menu Items
    findAllMenuItems: async () => {
        let result = {
            message: null,
            status: null,
            data: null
        }

        //This must be commented for the other to work
        //(prisma)
        // const allMenuItems = await prisma.Menu_Item.findMany();

        //This must be commented for the other to work
        // (sequelize)
        const allMenuItems = await MenuItem.findAll({
            order: [
              // Will escape title and validate DESC against a list of valid direction parameters
              ['menuItemID', 'ASC']
            ]
        });

        if (!allMenuItems) {
            result.message = `No Menu Item found`;
            result.status = 404;
            return result;
        }


        result.data = allMenuItems;
        result.status = 200;
        result.message = `All Menu Items retrieval for successfully `;
        return result;

    },

    //3. Update A Menu Item

    updateMenuItem: async (menuItemID, updateMenuItem) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        //This must be commented for the other to work
        //(prisma)
        // const updatedMenuItem = await prisma.Menu_Item.update({
        //     where: {
        //         menuItemId: menuItemID,
        //     },
        //     data: {
        //         src: updateMenuItem.src,
        //         alt: updateMenuItem.alt,
        //         type: updateMenuItem.type,
        //         price: updateMenuItem.price,
        //         category: updateMenuItem.category,
        //         chefRecommendation: updateMenuItem.chefRecommendation,
        //     },
        //     });    

        //This must be commented for the other to work
        //(sequelize)
        const selectMenuItem = await MenuItem.findByPk(menuItemID);

        if (!selectMenuItem) {
            result.message = `Menu Item not yet created.`;
            result.status = 400;
            return result;
        }

        //selectMenuItem.menuItemID = updateMenuItem.menuItemID;
        selectMenuItem.src = updateMenuItem.src;
        selectMenuItem.alt = updateMenuItem.alt;
        selectMenuItem.type = updateMenuItem.type;
        selectMenuItem.price = updateMenuItem.price;
        selectMenuItem.category = updateMenuItem.category;
        selectMenuItem.chefRecommendation = updateMenuItem.chefRecommendation;
        await selectMenuItem.save();

        result.message = `Update menu item successfully.`;
        result.status = 200;
        //This must be commented for the other to work
        //(prisma)
        //result.data = updatedMenuItem;

        //This must be commented for the other to work
        //(sequelize)
        result.data = selectMenuItem;
        return result;
    },


    //4. Delete Menu Item
    deleteMenuItem: async (menuItemID) => {

        let result = {
            message: null,
            status: null,
            data: null
        }

        

        //This must be commented for the other to work
        // (prisma)
        // const deleteMenuItem = await prisma.Menu_Item.delete({
        //     where: {
        //         menuItemId: menuItemID,
        //     },
        //     })

        // const allMenuItems = await prisma.Menu_Item.findMany(); 

        //This must be commented for the other to work
        // (sequelize)
        const removeMenuItem = await MenuItem.findByPk(menuItemID);

        if (!removeMenuItem) {
            result.message = `Menu Item ${menuItemID} is not valid. Please check database.`;
            result.status = 400;
            return result;
        }

        await removeMenuItem.destroy();

        result.message = `Menu Item ${menuItemID} was deleted successfully.`;
        result.status = 200;
        //This must be commented for the other to work
        //(prisma)
        //result.data = allMenuItems;

        //This must be commented for the other to work
        //(sequelize)
        result.data = removeMenuItem;
        return result;
    },


}