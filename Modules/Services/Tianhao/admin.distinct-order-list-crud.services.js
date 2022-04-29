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

        const orderList = await DistinctOrderList.findOne({
            where: {
              orderNo: order.orderNoOld
            }
          });
        
        if(!orderList){
            result.message = `Order ID ${order.orderNoOld} is not found`;
            result.status = 404;
            return result;
        }

        // const orderListbyPk = await DistinctOrderList.findByPk(orderList.orderNo);

        // if(!orderListbyPk){
        //     result.message = `Order ID ${order.orderNo} is not found`;
        //     result.status = 404;
        //     return result;
        // }

        // const updatedDistinctOrderRecord = await orderListbyPk.update({
        //     orderNo: order.orderNoNew
        //   });
        

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
}