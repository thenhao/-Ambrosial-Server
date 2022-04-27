const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('../setup');


class DistinctOrderList extends Model {}

DistinctOrderList.init(
  {
    orderNo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    modelName: "DistinctOrderList",
    tableName: "DistinctOrderList",
  }
);


module.exports = DistinctOrderList;