const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('../setup');

const Order = require("./order-model");

class Receipt extends Model {}

Receipt.init(
  {
    receiptID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderID: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
        type: DataTypes.INTEGER,
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
    modelName: "Receipt",
    tableName: "Receipt",
  }
);

Receipt.belongsTo(
    Order,
    {
      foreignKey: 'orderID'
    }
  );

module.exports = Receipt;