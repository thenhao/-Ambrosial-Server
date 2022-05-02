const {Sequelize} = require('sequelize');
//for Regina, created for prisma
//postgres://bjdhdvfkorbxgj:f21ee80e3cc9e58ae8febb7cf9c91961144d014892e5a475ea9c2f00f20128ea@ec2-3-223-213-207.compute-1.amazonaws.com:5432/da0394ou3o9iv1

const sequelize = new Sequelize('postgres://sebrsygbbcdzpq:9961016b6a95d1f7f43f2de9dca6d85fd0deb3eccff08794c3939a37056228ca@ec2-18-210-64-223.compute-1.amazonaws.com:5432/d58pbi1bjhk976', {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = {sequelize};