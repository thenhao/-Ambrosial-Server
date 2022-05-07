const {Sequelize} = require('sequelize');
//for Regina, created for prisma
//postgres://bjdhdvfkorbxgj:f21ee80e3cc9e58ae8febb7cf9c91961144d014892e5a475ea9c2f00f20128ea@ec2-3-223-213-207.compute-1.amazonaws.com:5432/da0394ou3o9iv1

const sequelize = new Sequelize('postgres://pdbesvgyddzjsb:a3c4a032c94026ac1c51f6cb65c9232b2f07333e0fd3cf3c39e124406ad7b852@ec2-3-224-164-189.compute-1.amazonaws.com:5432/d546ge4t3ftvkd', {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = {sequelize};