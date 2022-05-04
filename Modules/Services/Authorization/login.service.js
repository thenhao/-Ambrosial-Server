//Prisma
// const {PrismaClient} = require('@prisma/client');
// const prisma = new PrismaClient();

//Sequelize
const User = require('../../ORM/ambrosial/user.model');

const {generateJWT} = require('../../Authorization/jwt');
const {verifyHash} = require('../../Authorization/hash');

module.exports = {
  
  login: async(request) => {

    let result = {
      status: null,
      message: null
    }

    //Sequelize query
    const loginData = await User.findOne({where: {username: request.username}});

    //Prisma Query
    // const loginData = await prisma.User.findFirst({
    //   where: {
    //     username: request.username
    //   }
    // });

    if(!loginData) {
      result.status = 404;
      result.message = `User ${request.username} not found.`;
      return result;
    }
  
    let verificationResult = await verifyHash(request.password, loginData.password);

    if(verificationResult) { // set encoding data for JWT
      
      let data = {} //leave empty if no reference
  
      let token = generateJWT(data);
      result.status = 200;
      result.message = `${request.username} has been logged in successfully.`;
      return result;
    }
    else {
      result.status = 401;
      result.message = `Verification failed. Invalid entry.`;
      return result;
    }
  }
}