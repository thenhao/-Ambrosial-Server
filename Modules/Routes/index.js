const express = require("express");
const app = express();
app.use(express.json());

//Authorization
const register = require('../Routes/Authorization/register.routes');
app.use(register);

const login = require('../Routes/Authorization/login.routes');
app.use(login);

//Jeffery
//*******************routes import**********************
//***place here****
const medRecordRoute = require('../Routes/Jeffery/medRecord.route');

//*******************routes use**********************
//***place here****
app.use(medRecordRoute);


//Regina
//*******************routes import**********************
//const createCurrentVisit = require("../Routes/Regina/clinicCurrentVisit.route");
//*******************routes use**********************
//app.use(createCurrentVisit);

// Sarah
// Import route for receipts
//const receipts = require("../Routes/Sarah/receipts.route");
// Use route for receipts
//app.use(receipts);

//Shaun
//*******************routes import**********************
//const employeeWorking = require("../Routes/Shaun/isEmployeeAtWork.route");
//*******************routes use**********************
//app.use(employeeWorking);

//Tianhao
//*******************routes import**********************
//const supervisorViewMC = require("./Tianhao/supervisor.viewmc.routes");
//*******************routes use**********************
//app.use(supervisorViewMC);

module.exports = app;
