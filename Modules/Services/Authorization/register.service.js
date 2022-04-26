const User = require('../../ORM/user.model');

const {generateHash} = require('../../Authorization/hash');

module.exports = {

  register: async(request) => {
    let result = {
      status: null,
      message: null
    }

    const registerData = await User.findOne({where: {username: request.username}}); // searches for the data
    
    if(registerData) {
      result.status = 409;
      result.message = `Username already exists.`;
      return result;
    }

    let hashedPwd = await generateHash(request.password); // function to generate hash

    await User.create({role: request.role, username: request.username, password: hashedPwd});
    
    result.status = 200;
    result.message = `User ${request.username} registered.`; //This hides the hashed pwd
    return result;
  }
}