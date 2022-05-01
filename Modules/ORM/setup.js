const {Sequelize} = require('sequelize');
//for Regina, created for prisma
//postgres://bjdhdvfkorbxgj:f21ee80e3cc9e58ae8febb7cf9c91961144d014892e5a475ea9c2f00f20128ea@ec2-3-223-213-207.compute-1.amazonaws.com:5432/da0394ou3o9iv1

const sequelize = new Sequelize('postgres://ewjsdoixvpdifh:ddb937710577b50385a013604346e38da96036269ee49c51195f04c546ba96a0@ec2-3-218-171-44.compute-1.amazonaws.com:5432/daa90j9j7cfvbb', {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = {sequelize};