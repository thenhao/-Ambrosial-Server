//Import models for receipts and order
const Receipt = require("../../ORM/receipt.model.js");
const Order = require("../../ORM/order.model.js");

module.exports = {
    // Method for finding one receipt
    findOneReceipt: async(orderId) => {
        // Define the result object that will to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        // Find order by order ID        
        const order = await Order.findByPk(orderId);

        // If order does not exist, send error message
        if(!order){
            result.message = `Order ID ${orderId} is not found`;
            result.status = 404;
            return result;
        }
    },

    // Method for finding all receipts
    findAll: async() => {
        // Define the result object that will to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        // Find all receipts
        const receipts = await Receipts.findAll();

        // If receipts do not exist, send error message
        if(!receipts){
            result.message = `No receipts found`;
            result.status = 404;
            return result;
        }

        // If receipts exist, return all receipts
        result.data = receipts;
        result.status = 200;
        result.message = `Receipts retrieval for all orders successful `;
        return result;
    }
}