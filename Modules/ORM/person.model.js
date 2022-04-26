const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('./setup');


class Person extends Model {}

Person.init(
  {
    FIN: {
      type: DataTypes.STRING,
      primaryKey: true,
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
    dateOfBirth: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'date_of_birth'
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
    modelName: "Person",
    tableName: "Person",
  }
);



module.exports = Person;