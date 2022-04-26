const bcrypt = require('bcrypt');

const saltRounds = 10;

async function generateHash(pwd) {

  return await bcrypt.hash(pwd, saltRounds);
};

async function verifyHash(pwd, hashedPwd) {

  return await bcrypt.compare(pwd, hashedPwd);
}

module.exports = {
  generateHash,
  verifyHash
}