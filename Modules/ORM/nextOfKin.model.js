const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('./setup');

class NextOfKin extends Model {}

NextOfKin.init(
    {
      nextOfKinID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        allowNull: false,
        field: 'next_of_kin_ID'
      },
      nextOfKinName: {
        type: DataTypes.STRING,
        allowNull: false,
        field: 'next_of_kin_name'
      },
        nextOfKinContact: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'next_of_kin_contact'
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
      modelName: "NextOfKin",
      tableName: "nextOfKin",
    }
  );

module.exports = NextOfKin;