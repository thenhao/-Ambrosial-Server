//This must be commented for the other to work
//prisma version:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//This must be commented for the other to work
//sequelize version:
const DistinctOrderList = require("../../ORM/ambrosial/distinct-order-list.model");



module.exports = {
    createDistinctOrder: async(order) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. check if Distinct Order exists
        //2. check if menu item exists
        //3. if exists then create order record

        //This must be commented for the other to work
        //(prisma)
        // const orderList = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNo: order.orderNo
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        
        const orderList = await DistinctOrderList.findAll({
            where: {
                    orderNo: order.orderNo
            }
        });
        
        if(orderList || orderList.length > 0){
            result.message = `Order No ${order.orderNo} has been created`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const distinctOrderRecord = await prisma.Distinct_Order_List.create({
        //     data: {
        //     orderNo: order.orderNo,
        // }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const distinctOrderRecord = await DistinctOrderList.create({
            orderNo:order.orderNo,
        });
        
        result.data = distinctOrderRecord;
        result.status = 200;
        result.message = `Data creation for Distinct Order Record with Order No:${order.orderNo} successful `;
        return result;
    },

    updateDistinctOrder: async(orderNoId, order) =>{
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

        //This must be commented for the other to work
        // (prisma)
        // const orderList = await prisma.Distinct_Order_List.findMany({
        //     where: {
        //         orderNo: order.orderNoOld
        //       }
        //     }
        //   );

        //This must be commented for the other to work
        //(sequelize)

        const orderList = await DistinctOrderList.findAll({
            where: {
              orderNo: order.orderNoOld
            }
          });



        if(!orderList || (orderList.length < 1)){
            result.message = `Order ID ${order.orderNoOld} is not found`;
            result.status = 404;
            return result;
        }

        if(orderList[0].orderNoId !== orderNoId){
            result.message = `Order ID ${orderList.orderNoId} found in database and passed Order ID ${orderNoId} do not match`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)
        // const orderListbyPk = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNoId: orderNoId
        //     }
        //   });
        
        //This must be commented for the other to work
        //(sequelize)
        const orderListbyPk = await DistinctOrderList.findByPk(orderNoId);
        
        //console.log(orderListbyPk);

        if(!orderListbyPk){
            result.message = `Order ID ${orderNoId} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)
        // const updatedDistinctOrderRecord = await prisma.Distinct_Order_List.update({
        //     where: {
        //         orderNoId: orderListbyPk.orderNoId,
        //     },
        //     data: {
        //         orderNo: order.orderNoNew
        //     },
        //   });

        //This must be commented for the other to work
        //(sequelize)
        const updatedDistinctOrderRecord = await orderListbyPk.update({
            orderNo: order.orderNoNew
          });
        

        await updatedDistinctOrderRecord.save();

        
         result.data = updatedDistinctOrderRecord;
         result.status = 200;
         result.message = `Data update for Distinct Order Record with Order ID:${order.orderNoOld} successful `;
         return result;
    },

    deleteDistinctOrder: async(orderNoId) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. if exists then find order record
        //2. if order record found then delete
        
        //This must be commented for the other to work
        // (prisma)
        // const specificDistinctOrderRecord = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNoId: orderNoId
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const specificDistinctOrderRecord = await DistinctOrderList.findByPk(orderNoId);
        
        if(!specificDistinctOrderRecord){
            result.message = `orderNoID ${orderNoId} is not present in the distinct order records`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)
        // const deleteDistinctOrderList = await prisma.Distinct_Order_List.delete({
        //     where: {
        //         orderNoId: orderNoId
        //     },
        // })

        // const updatedDistinctOrderRecords = await prisma.Distinct_Order_List.findMany(); 

        //This must be commented for the other to work
        //(sequelize)
        await specificDistinctOrderRecord.destroy();

        //This must be commented for the other to work
        //(sequelize)
        const updatedDistinctOrderRecords = await DistinctOrderList.findAll();

        result.data = updatedDistinctOrderRecords;
        result.status = 200;
        result.message = `Deletion of order record of orderNoID ${orderNoId} successful `;
        return result;
    },

    findSpecificOrder: async(distinctOrderNoId) =>{
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

        //This must be commented for the other to work
        //(prisma)
        // const distinctOrderList = await prisma.Distinct_Order_List.findUnique({
        //     where:{
        //         orderNoId:distinctOrderNoId
        //     }
        // }); 

        //This must be commented for the other to work
        //(sequelize)
        const distinctOrderList = await DistinctOrderList.findByPk(distinctOrderNoId);
        
        if(!distinctOrderList || (distinctOrderList.length < 1)){
            result.message = `Order ID ${distinctOrderNoId} is not found`;
            result.status = 404;
            return result;
        }


        result.data = distinctOrderList;
        result.status = 200;
        result.message = `Data retrieval for Distinct Order Record with Order No:${distinctOrderNoId} successful `;
        return result;
    },

    findAllOrders: async()=>{
        let result = {
            message:null,
            status: null,
            data: null
        }
        
        //This must be commented for the other to work
        //(prisma)
        //const disitnctOrders = await prisma.Distinct_Order_List.findMany(); 

        //This must be commented for the other to work
        //(sequelize)
        const disitnctOrders = await DistinctOrderList.findAll();

        //What we want:
        //1. check all orders exists
        //2. Include the menu item data inside the check
        //3. If no, return error message.
        
        //check if order exists
        if(!disitnctOrders || (disitnctOrders.length < 1)){
            result.message = `No distinct order records found`;
            result.status = 404;
            return result;
        }

        result.data = disitnctOrders;
        result.status = 200;
        result.message = `Data retrieval for all distinct orders successful `;
        return result;
    }
}