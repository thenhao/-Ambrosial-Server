var cors = require('cors');

const express = require("express");
const app = express();
app.use(express.json());

const corsOptions = {
    //origin:'http://localhost:3000', 
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}

app.use(cors(corsOptions));

//Authorization
const register = require('../Routes/Authorization/register.route');
app.use(register);

const login = require('../Routes/Authorization/login.route');
app.use(login);

const changePassword = require('../Routes/Authorization/change-password.route');
app.use(changePassword);

//Menu-Item
//*******************routes import*******************
const menuItemRoute = require('./Menu-Item/menu-items.route');
//*******************routes use*******************
app.use(menuItemRoute);

// Receipt
//*******************routes import*******************
const receipts = require("./Receipt/receipts.route");
//*******************routes use*******************
app.use(receipts);


//Chef-Recommendation
//*******************routes import*******************
const menuCategory = require("./Chef-Recommendation/view-menu-category.route");
const chefRecommendation = require("./Chef-Recommendation/chef-recommendation.route");
//*******************routes use*******************
app.use(menuCategory);
app.use(chefRecommendation);


//Order-Payment
//*******************routes import*******************
const orderCrud = require("./Order-Payment/admin-order-crud.routes");
const distinctOrderCrud = require("./Order-Payment/admin-distinct-order-list-crud.routes");
const paymentCrud = require("./Order-Payment/admin-payment-crud.routes");
//*******************routes use*******************
app.use(orderCrud);
app.use(distinctOrderCrud);
app.use(paymentCrud);



module.exports = app;
