const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('../setup');

const DistinctOrderList = require("./distinct-order-list.model");
const MenuItem = require("./menu-item.model");

class ComputedOrders extends Model {}

ComputedOrders.init(
  {
    orderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
  },
    menuItemID: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    totalItemPrice: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false,
    },
    tableNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    orderStatus: {
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
    modelName: "ComputedOrders",
    tableName: "ComputedOrders",
  }
);

ComputedOrders.belongsTo(
    MenuItem,
    {
      foreignKey: 'menuItemID'
    },
    DistinctOrderList,
    {
      foreignKey: 'orderNo'
    },
  );

module.exports = ComputedOrders;