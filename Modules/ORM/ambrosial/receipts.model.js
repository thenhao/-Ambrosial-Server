const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('../setup');

const DistinctOrderList = require("./distinct-order-list.model");

class Receipt extends Model {}

Receipt.init(
  {
    receiptID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    totalPrice: {
        type: DataTypes.DECIMAL(10, 2),
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
  DistinctOrderList,
    {
      foreignKey: 'orderNo'
    },
  );

module.exports = Receipt;