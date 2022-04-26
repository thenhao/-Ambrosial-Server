const { verifyJWT } = require('./jwt');

function authClinic(req, res, next) {
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

    if(decoded.role === 'clinic'){
      next();
    }
    else{
      return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');
    }
  }
  catch(err) {
    res.status(401).send('Invalid Token')
  }
}


function authSupervisor(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) {
    return res.status(401).send('Access Denied: No Token Provided!');  
  }

  const jwtToken = authHeader.split(' ')[1];

  if (!jwtToken){
    return res.status(401).send('Access Denied: No Token Provided!');
  }

  try {
    const decoded = verifyJWT(jwtToken);

    if(decoded.role === 'supervisor'){
      next();
    }
    else{
      return res.status(401).send('Access Denied: You dont have correct privilege to perform this operation');
    }
  }
  catch(err) {
    res.status(401).send('Invalid Token')
  }
}

module.exports = {
  authClinic,
  authSupervisor
}