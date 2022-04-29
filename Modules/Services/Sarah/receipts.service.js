//Import models for receipts and order
const Receipt = require("../../ORM/ambrosial/receipts.model.js");
const DistinctOrderList = require("../../ORM/ambrosial/distinct-order-list.model");

module.exports = {
    // Method for finding one receipt
    findSpecificReceipt: async (orderNo) => {
        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        // Find order by order ID        
        const order = await DistinctOrderList.findByPk(orderNo);

        // If order does not exist, send error message
        if (!order) {
            result.message = `Order No ${orderNo} is not found`;
            result.status = 404;
            return result;
        }

        // If order exists, return receipt
        result.data = order;
        result.status = 200;
        result.message = `Receipts retrieval specifuc order successful `;
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
    createReceipt: async (orderNo) => {
        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        try {
            //Create receipt object
            const receipt = await Receipt.create({
                orderNo: orderNo,
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
            return result;
        }
    },




    // Method for update receipt
    updateReceipt: async (orderNo, totalPrice) => {
        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        // Find order by order No        
        const receipt = await DistinctOrderList.findByPk(orderNo);

        // If order does not exist, send error message
        if (!receipt) {
            result.message = `Order No ${orderNo} is not found`;
            result.status = 404;
            return result;
        }

        // If order exist, update receipts
        try {
            //Update receipt object
            const receipt = await Receipt.update({
                orderNo: orderNo,
                totalPrice: totalPrice
            });

            await receipt.save();
            console.log('New receipt is saved to the database');
            result.data = receipt;
            result.status = 200;
            result.message = "Receipt update successful";
            return result;

        } catch (error) {
            result.message = `Receipt update unsuccessful`;
            result.status = 500;
            return result;
        }
    },




    // Method for delete receipt
    deleteReceipt: async (orderNo) => {
        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        // Find receipt by order No        
        const receipt = await DistinctOrderList.findByPk(orderNo);

        // If receipt does not exist, send error message
        if (!receipt) {
            result.message = `Order No ${orderNo} is not found`;
            result.status = 404;
            return result;
        }

        // If receipt exist, detele receipt
        try {
            //Create receipt object
            const receipt = await Receipt.delete({
                orderNo: orderNo,
                totalPrice: totalPrice
            });

            await receipt.destroy();
            console.log('Receipt is deleted from the database');
            result.data = receipt;
            result.status = 200;
            result.message = "Receipt deletion successful";
            return result;

        } catch (error) {
            result.message = `Receipt deletion unsuccessful`;
            result.status = 500;
            return result;
        }
    }
}