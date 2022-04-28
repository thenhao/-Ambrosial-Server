const DistinctOrderList = require("../../ORM/ambrosial/distinct-order-list.model");
const MenuItem = require("../../ORM/ambrosial/menu-item.model");
const ComputedOrders = require("../../ORM/ambrosial/computed-orders.model");



module.exports = {
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

        const orderList = await DistinctOrderList.findByPk(orderNo);
        
        if(!orderList){
            result.message = `Order ID ${orderNo} is not found`;
            result.status = 404;
            return result;
        }

        const computedOrderRecords = await ComputedOrders.findAll({where:{orderNo:orderList.orderNo}});
        
        if(!computedOrderRecords){
            result.message = `Order(s) with ${orderList.orderNo} is not found`;
            result.status = 404;
            return result;
        }

        for(let i =0; i < computedOrderRecords.length; i ++){
            
            const menuItemRecord = await MenuItem.findByPk(computedOrderRecords[i].menuItemID);
            
            if(!menuItemRecord){
                result.message = `Menu item with ${computedOrderRecords[i].menuItemID} is not found`;
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
        
        const orders = await ComputedOrders.findAll({include: MenuItem});

        //What we want:
        //1. check all orders exists
        //2. Include the menu item data inside the check
        //3. If no, return error message.
        
        //check if order exists
        if(!orders){
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