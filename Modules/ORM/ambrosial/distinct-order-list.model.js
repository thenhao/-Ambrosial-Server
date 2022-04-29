const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('../setup');


class DistinctOrderList extends Model {}

DistinctOrderList.init(
  {
    orderNoId: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    orderNo: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
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
    modelName: "DistinctOrderList",
    tableName: "DistinctOrderList",
  }
);


module.exports = DistinctOrderList;