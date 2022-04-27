const {Sequelize} = require('sequelize');
//for Regina, created for prisma
//postgres://bjdhdvfkorbxgj:f21ee80e3cc9e58ae8febb7cf9c91961144d014892e5a475ea9c2f00f20128ea@ec2-3-223-213-207.compute-1.amazonaws.com:5432/da0394ou3o9iv1
const sequelize = new Sequelize('postgres://oqazhoytgosxyf:cabd20776584b50ed0ae958c83596783a4defe788b07eb31360d3fd1ea4c74a1@ec2-3-209-124-113.compute-1.amazonaws.com:5432/da78k66u3kbdtu', {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = {sequelize};