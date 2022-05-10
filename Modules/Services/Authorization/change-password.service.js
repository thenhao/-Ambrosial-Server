//Prisma
// const {PrismaClient} = require('@prisma/client');
// const prisma = new PrismaClient();

//Sequelize
const User = require('../../ORM/ambrosial/user.model');

//Hashing
const { generateHash, verifyHash } = require('../../Authorization/hash');

module.exports = {

  changePassword: async (request) => {

    let result = {
      status: null,
      message: null
    }

    //Sequelize query
    const changePasswordData = await User.findOne({ where: { username: request.username } });

    //Prisma Query
    // const changePasswordData = await prisma.User.findFirst({
    //   where: {
    //     username: request.username
    //   }
    // });

    if (!changePasswordData) {
      result.status = 404;
      result.message = `User does not exist. Kindly register`;
      return result;
    }

    let passwordVerification = await verifyHash(request.password, changePasswordData.password);

    if (!passwordVerification) {

      let newHashedPwd = await generateHash(request.password);

      //Sequelize
      const updatedPasswordData = await changePasswordData.update({
        password: newHashedPwd,
      });
      await updatedPasswordData.save();

      //Prisma
      // await prisma.User.update({
      //   where: {
      //     username: request.username,
      //   },
      //   data: {
      //     password: newHashedPwd,
      //   },
      // })

      result.status = 200;
      result.message = `Password has been changed`;

      return result;
    }
    else {
      result.status = 409;
      result.message = `Updated password is the same as the previous password. Kindly use a different password.`

      return result;
    }
  }
}