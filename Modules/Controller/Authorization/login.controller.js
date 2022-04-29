const Joi = require('joi');
const loginService = require('../../Services/Authorization/login.service');

class LoginController {

  async login(req, res){

    const schema = Joi.object().keys({
      username: Joi.string().trim().required(),
      password: Joi.string().trim().required()
    })  

  
    const loginValidation = schema.validate(req.body);

    if(loginValidation){
      const result = await loginService.login(req.body);
      res.status(result.status);
      return res.send(result.message);
    }
    else if(!loginValidation){
      res.status(400);
      return res.send('Please input data.');
    }
  }
}

module.exports = LoginController;