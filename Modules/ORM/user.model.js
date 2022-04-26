const { DataTypes, Model, Sequelize} = require("sequelize");
const {sequelize} = require('./setup');

class User extends Model {}

User.init(
  {
    userID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: Sequelize.fn('NOW'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: Sequelize.fn('NOW'),
    },
  },
  {
    sequelize,
    modelName: "User",
    tableName: "User",
  }
);

module.exports = User;