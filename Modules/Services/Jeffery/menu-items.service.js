// const FullMedicalRecord = require("../../ORM/fullMedicalRecord.model");
// const Person = require("../../ORM/person.model.js");
// const Clinic = require("../../ORM/clinic.model.js");
// const NextOfKin = require("../../ORM/nextOfKin.model.js");

const MenuItem = require("../../ORM/ambrosial/menu-item.model.js");


module.exports = {
    /*
          Argument (data) must contain the following attributes:
          {
          }
          This attribute will be auto generated:
    */
    createNewMenuItem: async (menuItemID, src, alt, type, price) => {

        //   The result object is where we will put the result to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        //What we want:
        //1. Check if menuid exists
        //2. Check if menu item exists
        //3. If exists, return menu results

        const findMenuItem = await MenuItem.findByPk(menuItemID);

        if (!findMenuItem) {
            result.message = `Menu Item ${menuItemID} is not found in the database.`;
            result.status = 404;
            return result;
        }
        //*** check if need this try
        try {
            const addMenuItem = await MenuItem.create({
                menuItemID: menuItemID,
                src: src,
                name: alt,
                type: type,
                price: price

            });

            await addMenuItem.save();
            console.log('New Menu Item is saved to the database');
            result.data = addMenuItem;
            result.status = 200;
            result.message = "New Menu Item creation successful";
            return result;

        } catch (error) {
            result.message = `Error in creating Menu Item. Data not saved`;
            result.status = 500;
            return result;
        }
    },

    findAllMenuItems: async () => {
        let result = {
            message: null,
            status: null,
            data: null
        }

        const allMenuItems = await MenuItem.findAll();

        if (!allMenuItems) {
            result.message = `No Menu Item found`;
            result.status = 404;
            return result;
        }

        result.data = allMenuItems;
        result.status = 200;
        result.message = `All Menu Items retrieval for successfully `;
        return result;

    }
}