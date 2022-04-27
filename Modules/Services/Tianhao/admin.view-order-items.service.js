const MenuItem = require("../../ORM/ambrosial/menu-item.model");
const Order = require("../../ORM/ambrosial/computed-orders.model");



module.exports = {
    findSpecificOrder: async(orderId) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. check if order records exists
        //2. check if menu item exists
        //3. if exists then return order results

        const orderRecords = await Order.findByPk(orderId);
        
        if(!orderRecords){
            result.message = `Order ID ${orderId} is not found`;
            result.status = 404;
            return result;
        }

        const menuRecords = await MenuItem.findByPk(orderRecords.menuItemID);
        
        if(!menuRecords){
            result.message = `menu item ${orderRecords.menuItemID} is not found`;
            result.status = 404;
            return result;
        }


        result.data = orderRecords;
        result.status = 200;
        result.message = `Data retrieval for orderRecords with ID:${orderId} successful `;
        return result;
    },

    findAllOrders: async()=>{
        let result = {
            message:null,
            status: null,
            data: null
        }
        
        const orders = await Order.findAll({include: MenuItem});

        //What we want:
        //1. check all orders exists
        //2. Include the menu item data inside the check
        //3. If no, return error message.
        
        //check if order exists
        if(!orders){
            result.message = `No order records found`;
            result.status = 404;
            return result;
        }

        result.data = orders;
        result.status = 200;
        result.message = `Data retrieval for all orders successful `;
        return result;
    }
}