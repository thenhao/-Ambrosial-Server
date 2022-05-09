//routes
const app = require("./Modules/Routes/index.js");
//ORM/Databse
// const Clinic = require('./Modules/ORM/clinic.model');
// const Company = require('./Modules/ORM/company.model');
// const EmployeeRecord = require('./Modules/ORM/empRecord.model');
// const MC = require('./Modules/ORM/mc.model');
// const CurrentVisit = require('./Modules/ORM/currentVisit.model');
// const Person = require('./Modules/ORM/person.model');
// const NextOfKin = require("./Modules/ORM/nextOfKin.model");
// const FullMedicalRecord = require("./Modules/ORM/fullMedicalRecord.model");
// const User = require("./Modules/ORM/user.model.js");

const { config } = require('dotenv');
config({ path: '.env' })

const User = require("./Modules/ORM/ambrosial/user.model");
const DistinctOrderList = require("./Modules/ORM/ambrosial/distinct-order-list.model");
const MenuItem = require("./Modules/ORM/ambrosial/menu-item.model");
const ComputedOrders = require("./Modules/ORM/ambrosial/computed-orders.model");
const Receipt = require("./Modules/ORM/ambrosial/receipts.model");
const PaymentInvoice = require("./Modules/ORM/ambrosial/payment-invoice.model");



//Sync database
User.sync();
DistinctOrderList.sync();
MenuItem.sync();
ComputedOrders.sync();
Receipt.sync();
PaymentInvoice.sync();


app.get('/', (req, res) => {
    res.json("Test");
})

//port number
const PORT = process.env.PORT || 5000;

const HOST = process.env.YOUR_HOST || '0.0.0.0';

//app to run at this port number
app.listen(PORT, HOST, () => {
    console.log(`Listening on port ${PORT}...`);
});