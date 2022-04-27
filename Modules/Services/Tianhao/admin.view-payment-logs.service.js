const Order = require("../../ORM/ambrosial/computed-orders.model");
const Receipt = require("../../ORM/ambrosial/receipt.model");
const PaymentLogs = require("../../ORM/ambrosial/payment-invoice.model");

/*checks:
-employee record find fin
-see if it equals person table fin (exists or not)
-findall where the fin exist in the MC */

module.exports = {
    findSpecificPayment: async(invoiceID) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. check if order records exists

        const paymentLogs = await PaymentLogs.findByPk(invoiceID);
        
        if(!paymentLogs){
            result.message = `Order ID ${invoiceID} is not found`;
            result.status = 404;
            return result;
        }

        const receiptLogs = await Receipt.findByPk(paymentLogs.receiptID);

        if(!receiptLogs){
            result.message = `No such receipt ${paymentLogs.receiptID} found`;
            result.status = 404;
            return result;
        }

        const orderLogs = await Order.findByPk(receiptLogs.orderID);

        if(!orderLogs){
            result.message = `No such order with id ${receiptLogs.orderID} found`;
            result.status = 404;
            return result;
        }

        result.data = paymentLogs;
        result.status = 200;
        result.message = `Data retrieval for orderRecords with ID:${invoiceID} successful `;
        return result;
    },

    findAllPayments: async()=>{
        let result = {
            message:null,
            status: null,
            data: null
        }
        
        const paymentLogs = await PaymentLogs.findAll({include: Receipt});

        //What we want:
        //1. check all orders exists
        //2. Include the menu item data inside the check
        //3. If no, return error message.
        
        //check if order exists
        if(!paymentLogs){
            result.message = `No payment records found`;
            result.status = 404;
            return result;
        }

        result.data = orders;
        result.status = 200;
        result.message = `Data retrieval for all payments successful `;
        return result;
    }
}