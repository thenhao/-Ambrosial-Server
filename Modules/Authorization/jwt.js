const jwt = require('jsonwebtoken');

function generateJWT(data) {
  return jwt.sign(data, 'a');
}

function verifyJWT(jwtToken) {
  return jwt.verify(jwtToken, 'a')
}

module.exports = {
  verifyJWT,
  generateJWT
}