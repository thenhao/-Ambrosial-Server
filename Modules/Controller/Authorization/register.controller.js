const Joi = require('joi');
const registerService = require('../../Services/Authorization/register.service');

class RegisterController {
  
  async register(req, res){

    const schema = Joi.object().keys({
      role: Joi.string().trim().required(),
      username: Joi.string().trim().required(),
      password: Joi.string().trim().required()
    })
   
    const registerValidation = schema.validate(req.body);

    if(registerValidation){
      const result = await registerService.register(req.body);
      res.status(result.status);
      return res.json({data: result.data, status: result.status, message: result.message});
    }
    else if(!registerValidation){
      res.status(400);
      return res.send('Please input data.');
    }
  }
}

module.exports = RegisterController;