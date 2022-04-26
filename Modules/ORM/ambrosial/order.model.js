const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('../setup');

const MenuItem = require("./menu-item.model");

class Order extends Model {}

Order.init(
  {
    orderID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
        type: DataTypes.INTEGER,
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
    modelName: "Order",
    tableName: "Order",
  }
);

Order.belongsTo(
    MenuItem,
    {
      foreignKey: 'menuItemID'
    }
  );

module.exports = Order;