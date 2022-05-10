//This must be commented for the other to work
//prisma version:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//This must be commented for the other to work
//sequelise version: Import models for receipts and order
const DistinctOrderList = require("../../ORM/ambrosial/distinct-order-list.model");
const Receipt = require("../../ORM/ambrosial/receipts.model");
const PaymentInvoice = require("../../ORM/ambrosial/payment-invoice.model");



module.exports = {
    createPayment: async (payment) => {
        //The result object is where we will put the result to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        //What we want:
        //1. check if order records exists
        //2. check if menu item exists
        //3. if exists then create order record

        //This must be commented for the other to work
        //(prisma)
        // const receiptRecord = await prisma.Receipt.findUnique({
        //     where: {
        //         receiptId: payment.receiptId
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const receiptRecord = await Receipt.findByPk(payment.receiptId);

        if (!receiptRecord) {
            result.message = `Receipt ID ${payment.receiptId} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const distinctOrderListRecord = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNoId: receiptRecord.orderNoId
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const distinctOrderListRecord = await DistinctOrderList.findByPk(receiptRecord.orderNoId);

        if (!distinctOrderListRecord) {
            result.message = `Distinct Order List Record ${receiptRecord.orderNoId} is not present in the table`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const paymentRecords = await prisma.Payment_Invoice.create({
        //     data: {
        //         receiptId:payment.receiptId,
        //         paymentType:payment.paymentType,
        //         paymentStatus:payment.paymentStatus,
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const paymentRecords = await PaymentInvoice.create({

            receiptID: payment.receiptId,
            paymentType: payment.paymentType,
            paymentStatus: payment.paymentStatus,
        });

        result.data = paymentRecords;
        result.status = 200;
        result.message = `Data creation for Payment with Order ID:${receiptRecord.orderNoId} successful `;
        return result;
    },

    updatePayment: async (invoiceID, payment) => {
        //The result object is where we will put the result to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        //What we want:
        //1. check if order records exists
        //2. check if menu item exists
        //3. if exists then find order record
        //4. if order record found then update

        //This must be commented for the other to work
        //(prisma)
        // const receiptList = await prisma.Receipt.findMany({
        //     where: {
        //         receiptId: payment.receiptId
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const receiptList = await Receipt.findAll({
            where: {
                receiptID: payment.receiptId
            }
        });



        if (!receiptList || (receiptList.length < 1)) {
            result.message = `receipt ID ${payment.receiptId} is not found`;
            result.status = 404;
            return result;
        }


        //This must be commented for the other to work
        //(prisma)
        // const orderList = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNoId: receiptList[0].orderNoId
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const orderList = await DistinctOrderList.findByPk(receiptList[0].orderNoId);

        //console.log(orderList);

        if (!orderList) {
            result.message = `Order ID ${receiptList[0].orderNoId} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)
        // const PaymentRecord = await prisma.Payment_Invoice.findMany({
        //     where:{
        //         receiptId:payment.receiptId
        //     }
        // }); 

        //This must be commented for the other to work
        // (sequelize)
        const PaymentRecord = await PaymentInvoice.findAll({
            where: {
                receiptID: payment.receiptId
            }
        });

        if (!PaymentRecord || (PaymentRecord.length < 1)) {
            result.message = `Payment Record with ${payment.receiptId} is not found`;
            result.status = 404;
            return result;
        }

        //console.log(PaymentRecord[0]);
        console.log(typeof PaymentRecord[0].paymentInvoiceID);
        console.log(typeof invoiceID);
        //prisma
        // if(PaymentRecord[0].paymentInvoiceId !== invoiceID){

        //sequelize
        if (PaymentRecord[0].paymentInvoiceID !== invoiceID) {
            result.message = `Invoice ID ${invoiceID} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const specificPaymentRecord = await prisma.Payment_Invoice.findUnique({
        //     where: {
        //         paymentInvoiceId: PaymentRecord[0].paymentInvoiceId
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const specificPaymentRecord = await PaymentInvoice.findByPk(invoiceID);

        if (!specificPaymentRecord || (specificPaymentRecord.length < 1)) {
            result.message = `Payment Record with ${invoiceID} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const updatedPaymentRecord = await prisma.Payment_Invoice.update({
        //     where: {
        //         paymentInvoiceId: PaymentRecord[0].paymentInvoiceId,
        //     },
        //     data: {
        //             receiptId:payment.receiptId,
        //             paymentType:payment.paymentType,
        //             paymentStatus:payment.paymentStatus,
        //     },
        // });

        //This must be commented for the other to work
        //(sequelize)
        const updatedPaymentRecord = await specificPaymentRecord.update({
            receiptID: payment.receiptId,
            paymentType: payment.paymentType,
            paymentStatus: payment.paymentStatus,
        });


        await updatedPaymentRecord.save();

        result.data = updatedPaymentRecord;
        result.status = 200;
        result.message = `Data update for Payment Record with Order ID:${receiptList[0].orderNoId} successful `;
        return result;
    },

    deletePayment: async (invoiceID) => {
        //The result object is where we will put the result to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        //What we want:
        //1. if exists then find order record
        //2. if order record found then delete

        //This must be commented for the other to work
        // (prisma)
        // const specificPaymentRecord = await prisma.Payment_Invoice.findUnique({
        //     where: {
        //         paymentInvoiceId: invoiceID
        //     }
        // });


        //This must be commented for the other to work
        // (sequelize)
        const specificPaymentRecord = await PaymentInvoice.findByPk(invoiceID);

        if (!specificPaymentRecord) {
            result.message = `invoiceID ${invoiceID} is not present in the payment records`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)
        // const deleteOrderRecord = await prisma.Payment_Invoice.delete({
        //     where: {
        //         paymentInvoiceId: invoiceID,
        //     },
        // })

        //This must be commented for the other to work
        // (sequelize)
        await specificPaymentRecord.destroy();

        //This must be commented for the other to work
        // (prisma)
        //const updatedPaymentRecord = await prisma.Payment_Invoice.findMany(); 

        //This must be commented for the other to work
        // (sequelize)
        const updatedPaymentRecord = await PaymentInvoice.findAll();

        result.data = updatedPaymentRecord;
        result.status = 200;
        result.message = `Deletion of payment record of invoice ID ${invoiceID} successful `;
        return result;
    },

    findSpecificPayment: async (invoiceID) => {
        //The result object is where we will put the result to be sent to the client
        let result = {
            message: null,
            status: null,
            data: null
        }

        //What we want:
        //1. check if orderNo exists in the order list
        //This must be commented for the other to work
        // (prisma)  
        // const paymentLogs = await prisma.Payment_Invoice.findUnique({
        //     where: {
        //         paymentInvoiceId:invoiceID
        //     }
        //   });

        //This must be commented for the other to work
        // (sequelize)  
        const paymentLogs = await PaymentInvoice.findByPk(invoiceID);

        if (!paymentLogs) {
            result.message = `Invoice ID ${invoiceID} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)  
        // const receiptLog = await prisma.Receipt.findUnique({
        //     where: {
        //         receiptId:paymentLogs.receiptId
        //     }
        //   });

        //This must be commented for the other to work
        // (sequelize) 
        const receiptLog = await Receipt.findByPk(paymentLogs.receiptID);

        if (!receiptLog) {
            result.message = `No such receipt ${paymentLogs.receiptId} found`;
            //result.message = `No such receipt ${paymentLogs.receiptID} found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)
        // const orderLogRecords = await prisma.Distinct_Order_List.findMany({
        //     where: {
        //         orderNoId: receiptLog.orderNoId
        //       }
        //     }
        // );

        //This must be commented for the other to work
        //  (sequelize)
        const orderLogRecords = await DistinctOrderList.findAll({
            where: {
                orderNoId: receiptLog.orderNoId
            }
        });

        if (!orderLogRecords) {
            result.message = `No such order with orderNoId: ${receiptLog.orderNoId} found`;
            result.status = 404;
            return result;
        }

        if(orderLogRecords.length < 1) {
            result.message = `Transaction success.No payment record(s) found`;
            result.status = 200;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)  
        // const orderLog = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNoId:orderLogRecords[0].orderNoId
        //     }
        //   });

        //This must be commented for the other to work
        // (sequelize) 
        const orderLog = await DistinctOrderList.findByPk(orderLogRecords[0].orderNoId);

        if (!orderLog) {
            result.message = `No such order with orderNo: ${orderLogRecords[0].orderNoId} found`;
            result.status = 404;
            return result;
        }

        result.data = paymentLogs;
        result.status = 200;
        result.message = `Data retrieval for payment invoice with ID:${invoiceID} for order ${orderLog.orderNo} successful `;
        return result;
    },

    findAllPayments: async () => {
        let result = {
            message: null,
            status: null,
            data: null
        }

        //This must be commented for the other to work
        // (prisma)
        // const paymentLogs = await prisma.Payment_Invoice.findMany({
        //     // Returns all receipt field
        //     include: {
        //         receipt: true
        //       }
        //     }
        // );

        //This must be commented for the other to work
        //  (sequelize)
        const paymentLogs = await PaymentInvoice.findAll({
            include: [
                {
                    model: Receipt,
                    include: DistinctOrderList
                }
            ]
        });

        //What we want:
        //1. check all orders exists
        //2. Include the menu item data inside the check
        //3. If no, return error message.

        //check if payment exists
        if (!paymentLogs) {
            result.message = `No payment records found`;
            result.status = 404;
            return result;
        }

        if(paymentLogs.length < 1) {
            result.message = `Transaction success.No payment record(s) found`;
            result.status = 200;
            return result;
        }

        result.data = paymentLogs;
        result.status = 200;
        result.message = `Data retrieval for all payments successful `;
        return result;
    }
}