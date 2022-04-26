const EmployeeRecord = require("../../ORM/empRecord.model.js");
const Person = require("../../ORM/person.model.js");
const MC = require("../../ORM/mc.model.js");

/*checks:
-employee record find fin
-see if it equals person table fin (exists or not)
-findall where the fin exist in the MC */

module.exports = {
  updateEmployeeWorkStatus: async (isWorkingToday, fin, mcStartDate) => {
    //The result object is where we will put the result to be sent to the client
    let result = {
      message: null,
      status: null,
      data: null,
    };

    //What we want:
    //1. check if employee record and person exists
    //1a. check if employee exists
    //2. If yes, proceed with person
    //2a. check if person exists
    //3. If yes, proceed with finding mc
    //3a. check if mc exists
    //4. If no, return error message.
    const person = await Person.findByPk(fin);

    if (!person) {
      result.message = `No such person with FIN ${fin} found`;
      result.status = 404;
      return result;
    }
    const mc = await MC.findAll({
      where: { FIN: fin, mcStartDate: mcStartDate }
    });

    if (!mc) {
      result.message = `No MC for ${fin} found`;
      result.status = 404;
      return result;
    }
    const employeeRecord = await EmployeeRecord.findOne({
      where: { FIN: fin },
    });

    if (!employeeRecord) {
      result.message = `Employee with ${fin} is not found`;
      result.status = 404;
      return result;
    }
    employeeRecord.isWorkingToday = isWorkingToday;
    await employeeRecord.save();
    
    result.data = employeeRecord;
    result.status = 200;
    result.message = `Employee record of:${fin} successfully updated `;
    return result;
  }
};
