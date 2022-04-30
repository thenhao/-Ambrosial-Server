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

        const orderList = await DistinctOrderList.findByPk(order.orderNo);
        
        if(orderList){
            result.message = `Order No ${order.orderNo} has been created`;
            result.status = 404;
            return result;
        }

        const distinctOrderRecord = await DistinctOrderList.create({
            orderNo:order.orderNo,
        });
        
        result.data = distinctOrderRecord;
        result.status = 200;
        result.message = `Data creation for Distinct Order Record with Order No:${order.orderNo} successful `;
        return result;
    },

    updateDistinctOrder: async(order) =>{
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

        const orderListbyPk = await DistinctOrderList.findByPk(orderList[0].orderNoId);
        
        console.log(orderListbyPk);

        if(!orderListbyPk){
            result.message = `Order ID ${order.orderNo} is not found`;
            result.status = 404;
            return result;
        }

        const updatedDistinctOrderRecord = await orderListbyPk.update({
            orderNo: order.orderNoNew
          });
        

        await updatedDistinctOrderRecord.save();
        
         result.data = updatedDistinctOrderRecord;
         result.status = 200;
         result.message = `Data update for Distinct Order Record with Order ID:${order.orderNoOld} successful `;
         return result;
    },

    deleteDistinctOrder: async(orderNo) =>{
        //The result object is where we will put the result to be sent to the client
        let result = {
            message:null,
            status: null,
            data: null
        }

        //What we want:
        //1. if exists then find order record
        //2. if order record found then delete

        const specificDistinctOrderRecord = await DistinctOrderList.findByPk(orderNo);
        
        if(!specificDistinctOrderRecord){
            result.message = `orderID ${orderNo} is not present in the order records`;
            result.status = 404;
            return result;
        }

        await specificDistinctOrderRecord.destroy();

        const updatedDistinctOrderRecord = await DistinctOrderList.findAll();

        result.data = updatedDistinctOrderRecord;
        result.status = 200;
        result.message = `Deletion of order record of orderID ${orderNo} successful `;
        return result;
    },

    findSpecificOrder: async(distinctOrderNo) =>{
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
        const distinctOrderRecord = await DistinctOrderList.findAll({
            where:{
                orderNo:distinctOrderNo
            }
        });
        
        if(!distinctOrderRecord || (distinctOrderRecord.length < 1)){
            result.message = `Order with ${distinctOrderNo} is not found`;
            result.status = 404;
            return result;
        }

        const distinctOrderList = await DistinctOrderList.findByPk(distinctOrderRecord[0].orderNoId);
        
        if(!distinctOrderList){
            result.message = `Order ID ${distinctOrderNo} is not found`;
            result.status = 404;
            return result;
        }


        result.data = distinctOrderList;
        result.status = 200;
        result.message = `Data retrieval for Distinct Order Record with Order ID:${distinctOrderRecord[0].orderNoId} successful `;
        return result;
    },

    findAllOrders: async()=>{
        let result = {
            message:null,
            status: null,
            data: null
        }
        
        const disitnctOrders = await DistinctOrderList.findAll();

        //What we want:
        //1. check all orders exists
        //2. Include the menu item data inside the check
        //3. If no, return error message.
        
        //check if order exists
        if(!disitnctOrders){
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