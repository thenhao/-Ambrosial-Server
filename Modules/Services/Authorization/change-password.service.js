//Prisma
import {PrismaClient} from '@prisma/client';
const prisma = new PrismaClient();

//ORM
// const User = require('../../ORM/ambrosial/user.model');

//Hashing
const {generateHash} = require('../../Authorization/hash');

module.exports = {
  
  changePassword: async(request) => {

    let result = {
      status: null,
      message: null
    }

    //ORM query
    // const changePasswordData = await User.findOne({where: {username: request.username}});

    //Prisma Query
    const changePasswordData = await prisma.User.findUnique({
      where: {
        username: request.username
      }
    });

    if(!changePasswordData) {
      result.status = 404;
      result.message = `User does not exist. Kindly register`;
      return result;
    }

    result.status = 200;
    result.message = `Password has been changed`;
  
    let newHashedPwd = await generateHash(request.password);
    changePasswordData.password = newHashedPwd;
    await changePasswordData.save();
    
    return result;
  }
}