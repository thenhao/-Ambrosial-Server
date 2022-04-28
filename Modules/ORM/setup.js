const {Sequelize} = require('sequelize');
//for Regina, created for prisma
//postgres://bjdhdvfkorbxgj:f21ee80e3cc9e58ae8febb7cf9c91961144d014892e5a475ea9c2f00f20128ea@ec2-3-223-213-207.compute-1.amazonaws.com:5432/da0394ou3o9iv1
const sequelize = new Sequelize('postgres://cyckzdbkuiefxw:2212d06490232346bc459e61e26a56bde4dac52e25e20feacc3b2e01642eb1d7@ec2-3-211-6-217.compute-1.amazonaws.com:5432/d38t9blqhpu6i1', {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = {sequelize};