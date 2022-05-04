//This must be commented for the other to work
//prisma version:
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

//This must be commented for the other to work
//sequelise version: Import models for receipts and order
const DistinctOrderList = require("../../ORM/ambrosial/distinct-order-list.model");
const MenuItem = require("../../ORM/ambrosial/menu-item.model");
const ComputedOrders = require("../../ORM/ambrosial/computed-orders.model");



module.exports = {
    createOrder: async(order) =>{
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

        //This must be commented for the other to work
        //(prisma)
        // const orderList = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNoId: order.orderNoId
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const orderList = await DistinctOrderList.findByPk(order.orderNoId);
        
        if(!orderList){
            result.message = `Order ID ${order.orderNoId} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const menuItemList = await prisma.Menu_Item.findUnique({
        //     where: {
        //         menuItemId: order.menuItemID
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const menuItemList = await MenuItem.findByPk(order.menuItemID);
        
        if(!menuItemList){
            result.message = `menu ${order.menuItemID} is not present in the menu`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const computedOrderRecords = await prisma.Computed_Orders.create({
        //     data: {
        //     orderNoId:order.orderNoId,
        //     menuItemId:order.menuItemID,
        //     quantity:order.quantity,
        //     totalItemPrice:order.totalItemPrice,
        //     tableNo:order.tableNo,
        //     orderStatus:order.orderStatus,
        // }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const computedOrderRecords = await ComputedOrders.create({
            orderNoId:order.orderNoId,
            menuItemID:order.menuItemID,
            quantity:order.quantity,
            totalItemPrice:order.totalItemPrice,
            tableNo:order.tableNo,
            orderStatus:order.orderStatus
        });
        
        result.data = computedOrderRecords;
        result.status = 200;
        result.message = `Data creation for Computed Order Record with Order ID:${order.orderNoId} successful `;
        return result;
    },

    updateOrder: async(orderId,order) =>{
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
        //(prisma)
        // const orderList = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNoId: order.orderNoId
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const orderList = await DistinctOrderList.findByPk(order.orderNoId);
        
        if(!orderList){
            result.message = `Order ID ${order.orderNoId} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const menuItemList = await prisma.Menu_Item.findUnique({
        //     where: {
        //         menuItemId: order.menuItemID
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const menuItemList = await MenuItem.findByPk(order.menuItemID);
        
        if(!menuItemList){
            result.message = `menu ${order.orderNo} is not present in the menu`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const specificOrderRecord = await prisma.Computed_Orders.findUnique({
        //     where: {
        //         orderId: orderId
        //     }
        // });

        //This must be commented for the other to work
        //(sequelize)
        const specificOrderRecord = await ComputedOrders.findByPk(orderId);
        
        if(!specificOrderRecord){
            result.message = `Order Id ${orderId} is not present in the order records`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        //(prisma)
        // const updatedOrderRecord = await prisma.Computed_Orders.update({
        //     where: {
        //         orderId: orderId,
        //     },
        //     data: {
        //         orderNoId:order.orderNoId,
        //         menuItemId:order.menuItemID,
        //         quantity:order.quantity,
        //         totalItemPrice:order.totalItemPrice,
        //         tableNo:order.tableNo,
        //         orderStatus:order.orderStatus,
        //     },
        // });

        //This must be commented for the other to work
        //(sequelize)
        const updatedOrderRecord = await specificOrderRecord.update({ 
            orderNoId:order.orderNoId,
            menuItemID:order.menuItemID,
            quantity:order.quantity,
            totalItemPrice:order.totalItemPrice,
            tableNo:order.tableNo,
            orderStatus:order.orderStatus,
        });

        await updatedOrderRecord.save();
        
        result.data = updatedOrderRecord;
        result.status = 200;
        result.message = `Data creation for Computed Order Record with Order ID:${order.orderNoId} successful `;
        return result;
    },

    deleteOrder: async(orderId) =>{
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
        // const specificOrderRecord = await prisma.Computed_Orders.findUnique({
        //     where: {
        //         orderId: orderId
        //     }
        // });
        

        //This must be commented for the other to work
        // (sequelize)
        const specificOrderRecord = await ComputedOrders.findByPk(orderId);
        
        if(!specificOrderRecord){
            result.message = `orderID ${orderId} is not present in the order records`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)
        // const deleteOrderRecord = await prisma.Computed_Orders.delete({
        //     where: {
        //         orderId: orderId,
        //     },
        // })

        //This must be commented for the other to work
        // (sequelize)
        await specificOrderRecord.destroy();

        //This must be commented for the other to work
        // (prisma)
        //const updatedOrderRecord = await prisma.Computed_Orders.findMany(); 

        //This must be commented for the other to work
        // (sequelize)
        const updatedOrderRecord = await ComputedOrders.findAll();

        result.data = updatedOrderRecord;
        result.status = 200;
        result.message = `Deletion of order record of orderID ${orderId} successful `;
        return result;
    },

    findSpecificOrder: async(orderNo) =>{
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
        // (prisma)
        // const distinctOrderRecord = await prisma.Distinct_Order_List.findMany({
        //     // Returns all distinct order field
        //     where: {
        //         orderNo: orderNo
        //             }
        //         }
        //     );  
                
        //This must be commented for the other to work
        // (sequelize)    
        const distinctOrderRecord = await DistinctOrderList.findAll({
            where:{
                orderNo:orderNo
            }
        });
        
        if(!distinctOrderRecord || (distinctOrderRecord.length < 1)){
            result.message = `Order with ${orderNo} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)  
        // const orderList = await prisma.Distinct_Order_List.findUnique({
        //     where: {
        //         orderNoId:distinctOrderRecord[0].orderNoId
        //     }
        //   });

        //This must be commented for the other to work
        // (sequelize)  
        const orderList = await DistinctOrderList.findByPk(distinctOrderRecord[0].orderNoId);
        
        if(!orderList){
            result.message = `Order ID for ${orderNo} is not found`;
            result.status = 404;
            return result;
        }

        //This must be commented for the other to work
        // (prisma)
        // const computedOrderRecords = await prisma.Computed_Orders.findMany({
        //     // Returns all distinct order field
        //     where: {
        //         orderNoId: orderList.orderNoId
        //             },
        //     include:{
        //         menuItem:true,
        //         distinctOrderList:true
        //     }        
        //         }
        //     );  
        
        //This must be commented for the other to work
        // (sequelize)  
        const computedOrderRecords = await ComputedOrders.findAll({
            where:{
                orderNoId:orderList.orderNoId,
            },
            include:
            [
                {
                    model: MenuItem,
                    required: true
                },
                {
                    model: DistinctOrderList,
                    required: true
                },  
            ]
            
            }
            
            
        );
        
        if(!computedOrderRecords || (computedOrderRecords.length < 1)){
            result.message = `Order(s) with ${orderList.orderNoId} is not found`;
            result.status = 404;
            return result;
        }

        for(let i =0; i < computedOrderRecords.length; i ++){
            //This must be commented for the other to work
            // (prisma)  
            // const menuItemRecord = await prisma.Menu_Item.findUnique({
            //     where: {
            //         menuItemId:computedOrderRecords[i].menuItemId
            //     }
            //   });

            //This must be commented for the other to work
            // (sequelize)  
            const menuItemRecord = await MenuItem.findByPk(computedOrderRecords[i].menuItemID);
            
            if(!menuItemRecord){
                result.message = `Menu item with ${computedOrderRecords[i].menuItemId} is not found`;
                //result.message = `Menu item with ${computedOrderRecords[i].menuItemID} is not found`;
                result.status = 404;
                return result;
            }
        }


        result.data = computedOrderRecords;
        result.status = 200;
        result.message = `Data retrieval for Order Records with Order ID:${orderNo} successful `;
        return result;
    },

    findAllOrders: async()=>{
        let result = {
            message:null,
            status: null,
            data: null
        }

        //This must be commented for the other to work
        // (prisma)
        // const orders = await prisma.Computed_Orders.findMany({
        //     // Returns all menuitem field
        //     include: {
        //         menuItem: true
        //       }
        //     }
        // );
        
        //This must be commented for the other to work
        //  (sequelize)
        const orders = await ComputedOrders.findAll({include: MenuItem});

        //What we want:
        //1. check all orders exists
        //2. Include the menu item data inside the check
        //3. If no, return error message.
        
        //check if order exists
        if(!orders || (orders.length < 1)){
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