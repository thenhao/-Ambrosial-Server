const { verifyJWT } = require('./jwt');

function authUser(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Access Denied: No Token Provided!');  
  }

  const jwtToken = authHeader.split(' ')[1]; // splits 'bearer' from JWT token entry, index 1 refers to JWT token value (refer to Postman)

  if (!jwtToken){
    return res.status(401).send('Access Denied: No Token Provided!');
  }

  try {
    const decoded = verifyJWT(jwtToken);
    next();
  }
  catch(err) {
    res.status(401).send('Invalid Token')
  }
}


module.exports = {
  authUser
}