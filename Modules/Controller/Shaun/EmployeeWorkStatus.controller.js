//As a Clinic Assistant, I am able to create a MC for the person by using his FIN

//Import workerStatusUpdate
const workerStatusUpdate = require("../../Services/Shaun/workerStatusUpdate.service.js");

//Import Joi
const Joi = require("joi");

//For post request
class EmployeeWorkStatuscontroller {

  async updateEmployeeWorkStatus(req, res) {
    const schema = Joi.object().keys({
      isWorkingToday: Joi.boolean(),
      fin: Joi.string().trim().required(),
      mcStartDate: Joi.date().required(),
    });

    const validation = schema.validate(req.body);
    if (validation) {
      const result = await workerStatusUpdate.updateEmployeeWorkStatus(req.body.isWorkingToday,req.body.fin,req.body.mcStartDate);
      res.json({
        data: result.data,
        status: result.status,
        message: result.message,
      });
    } else if (!validation) {
      res.status(400).json({ message: "Incorrect request data" });
    }
  }
}

module.exports = EmployeeWorkStatuscontroller;
