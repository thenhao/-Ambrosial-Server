const Joi = require('joi');
const changePasswordService = require('../../Services/Authorization/change-password.service');

class ChangePasswordController {

  async changePassword(req, res){

    const schema = Joi.object().keys({
      password: Joi.string().trim().required()
    })  

  
    const newPasswordValidation = schema.validate(req.body);

    if(newPasswordValidation){
      const result = await changePasswordService.changePassword(req.body);
      res.status(result.status);
      return res.send(result.message);
    }
    else if(!newPasswordValidation){
      res.status(400);
      return res.send('Please input a new password.');
    }
  }
}

module.exports = ChangePasswordController;