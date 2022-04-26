const {Sequelize} = require('sequelize');
//
//const sequelize = new Sequelize('postgres://czrhtxaxrmwyxv:e70ab5cb4a4a63699238999e6fb3df947e920547b399c6163a911c95f90782a1@ec2-18-210-191-5.compute-1.amazonaws.com:5432/d84tq21cltsr8i', {
const sequelize = new Sequelize('postgres://kyvvadixaytlla:d80d2c4bd9f8ca772fb567ac59bb32efca47dd259d26b2b2143bb4f610e0917a@ec2-3-209-124-113.compute-1.amazonaws.com:5432/dfg7g3vq9nfrv7', {
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false
    }
  }
});

module.exports = {sequelize};