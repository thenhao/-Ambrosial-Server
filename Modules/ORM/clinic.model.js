const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('./setup');

class Clinic extends Model {}

Clinic.init(
  {
    ID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: new Date(),
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      defaultValue: new Date(),
    },
  },
  {
    sequelize,
    modelName: "Clinic",
    tableName: "Clinic",
  }
);

module.exports = Clinic;