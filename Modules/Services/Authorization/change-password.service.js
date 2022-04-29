const User = require('../../ORM/ambrosial/user.model');

const {generateJWT} = require('../../Authorization/jwt');
const {verifyHash} = require('../../Authorization/hash');

module.exports = {
  
  changePassword: async(request) => {

    let result = {
      status: null,
      message: null
    }

    const changePasswordData = await User.findOne({where: {password: request.password}});

    if(!changePasswordData) {
      result.status = 404;
      result.message = `New password matches previous password, kindly use another.`;
      return result;
    }
  
    let verificationResult = await verifyHash(request.password, changePasswordData.password);

    if(verificationResult) { // set encoding data for JWT
      
      let data = {}
  
      let token = generateJWT(data);
      result.status = 200;
      result.message = token;
      return result;
    }
    else {
      result.status = 401;
      result.message = `Verification failed. Invalid entry.`;
      return result;
    }
  }
}