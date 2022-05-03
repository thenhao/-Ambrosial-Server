//This must be commented for the other to work
//prisma version:
// const { PrismaClient } = require('@prisma/client');
// const prisma = new PrismaClient();

//This must be commented for the other to work
//sequelise version: Import models for receipts and order
const Receipt = require("../../ORM/ambrosial/receipts.model.js");
const DistinctOrderList = require("../../ORM/ambrosial/distinct-order-list.model");


module.exports = {
    // Method for finding one receipt
    findSpecificReceipt: async (orderNoId) => {
        // Define the result object that will to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        //This must be commented for the other to work
        //  (prisma)
        // const order = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNoId: orderNoId
        //     }
        //   });

        //This must be commented for the other to work
        // Find order by order ID (sequelize)        
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

        //This must be commented for the other to work
        // (prisma)
        // const allReceipts = await prisma.Receipt.findMany({
        //     // Returns all distinct order field
        //     include: {
        //         distinctOrderList: true
        //       }
        //     }
        //   );

        //This must be commented for the other to work
        // Find all receipts (sequelize)  
        const allReceipts = await Receipt.findAll({ include: DistinctOrderList });


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

            //This must be commented for the other to work
            // (prisma)
            // const receipt = await prisma.Receipt.create({
            //     data: {
            //     orderNoId: orderNoId,
            //     totalItemPrice: totalPrice
            // }
            // });



            //This must be commented for the other to work
            //Create receipt object (sequelize)
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

        //This must be commented for the other to work
        // (prisma)  
        // const specificReceipt = await prisma.Receipt.findUnique({
        //     where: {
        //         receiptId: receiptID
        //     }
        //   });

        //This must be commented for the other to work
        // Find receipt by receipt ID (sequelize)     
        const specificReceipt = await Receipt.findByPk(receiptID);

        //If receipt does not exist, send error message
        if (!specificReceipt) {
            result.message = `Receipt Number ${receiptID} is not found`;
            result.status = 404;
            return result;
        }

        // If order exist, update receipt
        try {
            //This must be commented for the other to work  
            //Update receipt object (sequelize) 

            specificReceipt.orderNoId = newReceipt.orderNoId,
                specificReceipt.totalPrice = newReceipt.totalPrice,


                await specificReceipt.save();

            //This must be commented for the other to work
            //update receipt (prisma)
            // const updatedReceipt = await prisma.Receipt.update({
            //     where: {
            //         receiptId: receiptID,
            //     },
            //     data: {
            //         orderNoId: newReceipt.orderNoId,
            //         totalItemPrice: newReceipt.totalPrice
            //     },
            //   });

            console.log('Updated receipt is saved to the database');
            //This must be commented for the other to work
            // (prisma)
            //result.data = updatedReceipt;

            //This must be commented for the other to work
            // (sequelize)
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

        //This must be commented for the other to work
        // (prisma)  
        // const specificReceipt = await prisma.Receipt.findUnique({
        //     where: {
        //         receiptId: receiptID
        //     }
        //   });

        //This must be commented for the other to work
        // (sequelize)
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

            //This must be commented for the other to work
            // (prisma)
            // const deleteReceipt = await prisma.Receipt.delete({
            //     where: {
            //         receiptId: receiptID,
            //     },
            //   })

            // const allReceipts = await prisma.Receipt.findMany({
            // // Returns all distinct order field
            // include: {
            //             distinctOrderList: true
            //         }
            //     }
            // );  

            //This must be commented for the other to work
            // (sequelize)
            //Delete receipt object
            await specificReceipt.destroy();

            //Return all receipts from database    
            const allReceipts = await Receipt.findAll({ include: DistinctOrderList });

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