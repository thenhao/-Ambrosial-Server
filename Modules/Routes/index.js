const express = require("express");
const app = express();
app.use(express.json());

//Authorization
const register = require('../Routes/Authorization/register.route');
app.use(register);

const login = require('../Routes/Authorization/login.route');
app.use(login);

const changePassword = require('../Routes/Authorization/change-password.route');
app.use(changePassword);

//Jeffery
//*******************routes import**********************
//***place here****
const menuItemRoute = require('../Routes/Jeffery/menu-items.route');

//*******************routes use**********************
//***place here****
app.use(menuItemRoute);


// //Regina
// //*******************routes import**********************
// const createCurrentVisit = require("../Routes/Regina/clinicCurrentVisit.route");
// //*******************routes use**********************
// app.use(createCurrentVisit);

// Sarah
// Import route for receipts
const receipts = require("../Routes/Sarah/receipts.route");
// Use route for receipts
app.use(receipts);


//Shaun
//*******************routes import**********************
//const employeeWorking = require("../Routes/Shaun/isEmployeeAtWork.route");
const menuCategory = require("../Routes/Shaun/MenuCategory.route");
const chefRecommendation = require("../Routes/Shaun/chefsRecommendation.route");
//*******************routes use**********************
app.use(menuCategory);
app.use(chefRecommendation);


// //Tianhao
// //*******************routes import**********************
const orderCrud = require("./Tianhao/admin.order-crud.routes");
// //*******************routes use**********************
app.use(orderCrud);

const distinctOrderCrud = require("./Tianhao/admin.distinct-order-list-crud.routes");
app.use(distinctOrderCrud);

module.exports = app;
