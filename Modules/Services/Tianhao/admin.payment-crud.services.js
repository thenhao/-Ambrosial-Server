const DistinctOrderList = require("../../ORM/ambrosial/distinct-order-list.model");
const Receipt = require("../../ORM/ambrosial/receipts.model");
const PaymentInvoice = require("../../ORM/ambrosial/payment-invoice.model");



module.exports = {
    createPayment: async(payment) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. check if order records exists
        //2. check if menu item exists
        //3. if exists then create order record

        const receiptRecord = await Receipt.findByPk(payment.receiptId);
        
        if(!receiptRecord){
            result.message = `Receipt ID ${payment.receiptId} is not found`;
            result.status = 404;
            return result;
        }


        const distinctOrderListRecord = await DistinctOrderList.findByPk(receiptRecord.orderNoId);
        
        if(!distinctOrderListRecord){
            result.message = `Distinct Order List Record ${receiptRecord.orderNoId} is not present in the table`;
            result.status = 404;
            return result;
        }


        const paymentRecords = await PaymentInvoice.create({

            receiptID:payment.receiptId,
            paymentType:payment.paymentType,
            paymentStatus:payment.paymentStatus,
        });
        
        //result.data = paymentRecords;
        result.status = 200;
        result.message = `Data creation for Payment with Order ID:${receiptRecord.orderNoId} successful `;
        return result;
    },

    updatePayment: async(payment) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. check if order records exists
        //2. check if menu item exists
        //3. if exists then find order record
        //4. if order record found then update

        const receiptList = await Receipt.findAll({
            where: {
                receiptID: payment.receiptId
            }
          });



        if(!receiptList || (receiptList.length < 1)){
            result.message = `receipt ID ${payment.receiptId} is not found`;
            result.status = 404;
            return result;
        }

        const orderList = await DistinctOrderList.findByPk(receiptList[0].orderNoId);
        
        //console.log(orderList);

        if(!orderList){
            result.message = `Order ID ${receiptList[0].orderNoId} is not found`;
            result.status = 404;
            return result;
        }

        const PaymentRecord = await PaymentInvoice.findAll({
            where:{
                receiptID:payment.receiptId
            }
        });

        if(!PaymentRecord || (PaymentRecord.length < 1)){
            result.message = `Payment Record with ${PaymentRecord[0].receiptID} is not found`;
            result.status = 404;
            return result;
        }

        const specificPaymentRecord = await PaymentInvoice.findByPk(PaymentRecord[0].receiptID);

        const updatedPaymentRecord = await specificPaymentRecord.update({
            receiptID:payment.receiptId,
            paymentType:payment.paymentType,
            paymentStatus:payment.paymentStatus,
        });
        

        await updatedPaymentRecord.save();
        
        result.data = updatedPaymentRecord;
        result.status = 200;
        result.message = `Data update for Payment Record with Order ID:${receiptList[0].orderNoId} successful `;
        return result;
    },

    deletePayment: async(invoiceID) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. if exists then find order record
        //2. if order record found then delete

        const specificPaymentRecord = await PaymentInvoice.findByPk(invoiceID);
        
        if(!specificPaymentRecord){
            result.message = `invoiceID ${invoiceID} is not present in the payment records`;
            result.status = 404;
            return result;
        }

        await specificPaymentRecord.destroy();

        const updatedPaymentRecord = await PaymentInvoice.findAll();

        result.data = updatedPaymentRecord;
        result.status = 200;
        result.message = `Deletion of payment record of invoice ID ${invoiceID} successful `;
        return result;
    },

    findSpecificPayment: async(invoiceID) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. check if orderNo exists in the order list
        const paymentLogs = await PaymentInvoice.findByPk(invoiceID);
        
        if(!paymentLogs){
            result.message = `Invoice ID ${invoiceID} is not found`;
            result.status = 404;
            return result;
        }

        const receiptLog = await Receipt.findByPk(paymentLogs.receiptID);

        if(!receiptLog){
            result.message = `No such receipt ${paymentLogs.receiptID} found`;
            result.status = 404;
            return result;
        }

        const orderLogRecords = await DistinctOrderList.findAll({
            where:{
                orderNoId:receiptLog.orderNoId
            }
        });
        
        if(!orderLogRecords || (orderLogRecords.length < 1)){
            result.message = `No such order with orderNoId: ${receiptLog.orderNoId} found`;
            result.status = 404;
            return result;
        }

        const orderLog = await DistinctOrderList.findByPk(orderLogRecords[0].orderNoId);

        if(!orderLog){
            result.message = `No such order with orderNo: ${orderLogRecords[0].orderNoId} found`;
            result.status = 404;
            return result;
        }

        result.data = paymentLogs;
        result.status = 200;
        result.message = `Data retrieval for payment invoice with ID:${invoiceID} for order ${orderLog.orderNo} successful `;
        return result;
    },

    findAllPayments: async()=>{
        let result = {
            message:null,
            status: null,
            data: null
        }
        
        const paymentLogs = await PaymentInvoice.findAll({include: Receipt});

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

        result.data = paymentLogs;
        result.status = 200;
        result.message = `Data retrieval for all payments successful `;
        return result;
    }
}