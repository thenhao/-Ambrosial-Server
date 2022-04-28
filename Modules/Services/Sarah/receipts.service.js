const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

async function main() {
    const allReceipts = await prisma.user.findMany()
    console.log(allReceipts)

    const specificReceipt = await prisma.user.findOne({where: orderNo})
    console.log(specificReceipt)
  }
  
  main()
    .catch((e) => {
      throw e
    })
    .finally(async () => {
      await prisma.$disconnect()
    })

/*
//Import models for receipts and order
const Receipt = require("../../ORM/ambrosial/receipts.model.js");
const Order = require("../../ORM/ambrosial/order.model.js");

module.exports = {
    // Method for finding one receipt
    findOneReceipt: async(orderNo) => {
        // Define the result object that will to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        // Find order by order ID        
        const order = await Order.findByPk(orderNo);

        // If order does not exist, send error message
        if(!order){
            result.message = `Order ID ${orderNo} is not found`;
            result.status = 404;
            return result;
        }
    },

    // Method for finding all receipts
    findAllReceipts: async() => {
        // Define the result object that will to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        // Find all receipts
        const receipts = await Receipt.findAll();

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
*/