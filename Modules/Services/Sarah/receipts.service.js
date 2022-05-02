//Import models for receipts and order
const Receipt = require("../../ORM/ambrosial/receipts.model.js");
const DistinctOrderList = require("../../ORM/ambrosial/distinct-order-list.model");
//const req = require("express/lib/request");

module.exports = {
    // Method for finding one receipt
    findSpecificReceipt: async (orderNoId) => {
        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        // Find order by order ID        
        const order = await DistinctOrderList.findByPk(orderNoId);

        // If order does not exist, send error message
        if (!order) {
            result.message = `Order Number ${orderNoId} is not found`;
            result.status = 404;
            return result;
        }

        // If order exists, return receipt
        result.data = order;
        result.status = 200;
        result.message = `Receipts retrieval for specific order successful `;
        return result;
    },




    // Method for finding all receipts
    findAllReceipts: async () => {
        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        // Find all receipts
        const allReceipts = await Receipt.findAll();


        // If receipts do not exist, send error message
        if (!allReceipts) {
            result.message = `No receipts found`;
            result.status = 404;
            return result;
        }

        // If receipts exist, return all receipts
        result.data = allReceipts;
        result.status = 200;
        result.message = `Receipts retrieval for all orders successful `;
        return result;
    },




    // Method for create receipt
    createReceipt: async (orderNoId, totalPrice) => {

        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        // const order = await DistinctOrderList.findByPk(orderNoId);

        // if(!order){
        //     result.message = `Order with order number of ${orderNoId} was not found.`;
        //     result.status = 404;
        //     return result;
        // }

        try {
            //Create receipt object
            const receipt = await Receipt.create({
                orderNoId: orderNoId,
                totalPrice: totalPrice
            });

            await receipt.save();
            console.log('Receipt is saved to the database');
            result.data = receipt;
            result.status = 200;
            result.message = "Receipt creation successful";
            return result;

        } catch (error) {
            result.message = `Receipt creation unsuccessful`;
            result.status = 500;
            console.log(error)
            return result;
        }
    },




    // Method for update receipt
    updateReceipt: async (receiptID, newReceipt) => {

        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        // Find receipt by receipt ID        
        const specificReceipt = await Receipt.findByPk(receiptID);

        //If receipt does not exist, send error message
        if (!specificReceipt) {
            result.message = `Receipt Number ${receiptID} is not found`;
            result.status = 404;
            return result;
        }

        // If order exist, update receipt
        try {
            //Update receipt object

            specificReceipt.orderNoId = newReceipt.orderNoId,
                specificReceipt.totalPrice = newReceipt.totalPrice,


                await specificReceipt.save();

            console.log('Updated receipt is saved to the database');
            result.data = newReceipt;
            result.status = 200;
            result.message = "Receipt update successful";
            return result;

        } catch (error) {
            result.message = `Receipt update unsuccessful`;
            result.status = 500;
            console.log(error)
            return result;
        }
    },




    // Method for delete receipt

    deleteReceipt: async (receiptID) => {
        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        // Find receipt by receipt ID        
        const specificReceipt = await Receipt.findByPk(receiptID);

        // If receipt does not exist, send error message

        if (!specificReceipt) {
            result.message = `Receipt ID ${receiptID} is not found`;
            result.status = 404;
            return result;
        }

        // If receipt exist, delete receipt
        try {
            //Create receipt object
            await specificReceipt.destroy();

            const allReceipts = await Receipt.findAll();

            console.log('Receipt is deleted from the database');
            result.data = allReceipts;
            result.status = 200;
            result.message = "Receipt deletion successful";
            return result;

        } catch (error) {
            result.message = `Receipt deletion unsuccessful`;
            result.status = 500;
            console.log(error)
            return result;
        }
    }
}