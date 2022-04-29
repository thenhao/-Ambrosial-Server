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

        const orderList = await DistinctOrderList.findByPk(order.orderNo);
        
        if(!orderList){
            result.message = `Order ID ${orderNo} is not found`;
            result.status = 404;
            return result;
        }


        const menuItemList = await MenuItem.findByPk(order.menuItemID);
        
        if(!menuItemList){
            result.message = `menu ${order.orderNo} is not present in the menu`;
            result.status = 404;
            return result;
        }


        const computedOrderRecords = await ComputedOrders.create({
            orderNo:order.orderNo,
            menuItemID:order.menuItemID,
            quantity:order.quantity,
            totalItemPrice:order.totalItemPrice,
            tableNo:order.tableNo,
            orderStatus:order.orderStatus
        });
        
        result.data = computedOrderRecords;
        result.status = 200;
        result.message = `Data creation for Computed Order Record with Order ID:${order.orderNo} successful `;
        return result;
    },

    updateOrder: async(order) =>{
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

        const orderList = await DistinctOrderList.findByPk(order.orderNo);
        
        if(!orderList){
            result.message = `Order ID ${orderNo} is not found`;
            result.status = 404;
            return result;
        }


        const menuItemList = await MenuItem.findByPk(order.menuItemID);
        
        if(!menuItemList){
            result.message = `menu ${order.orderNo} is not present in the menu`;
            result.status = 404;
            return result;
        }

        const specificOrderRecord = await ComputedOrders.findByPk(order.orderID);
        
        if(!specificOrderRecord){
            result.message = `menu ${order.orderNo} is not present in the order records`;
            result.status = 404;
            return result;
        }

        const updatedOrderRecord = await specificOrderRecord.update({ 
            orderNo:order.orderNo,
            menuItemID:order.menuItemID,
            quantity:order.quantity,
            totalItemPrice:order.totalItemPrice,
            tableNo:order.tableNo,
            orderStatus:order.orderStatus,
        });

        await updatedOrderRecord.save();
        
        result.data = updatedOrderRecord;
        result.status = 200;
        result.message = `Data creation for Computed Order Record with Order ID:${order.orderNo} successful `;
        return result;
    },

    deleteOrder: async(orderID) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. if exists then find order record
        //2. if order record found then delete

        const specificOrderRecord = await ComputedOrders.findByPk(orderID);
        
        if(!specificOrderRecord){
            result.message = `orderID ${orderID} is not present in the order records`;
            result.status = 404;
            return result;
        }

        await specificOrderRecord.destroy();

        const updatedOrderRecord = await ComputedOrders.findAll();

        result.data = updatedOrderRecord;
        result.status = 200;
        result.message = `Deletion of order record of orderID ${orderID} successful `;
        return result;
    },
}