const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('../setup');

const Receipt = require("./receipts.model");

class PaymentInvoice extends Model {}

PaymentInvoice.init(
  {
    paymentInvoiceID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
    },
    receiptID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      unique: true
    },
    paymentType: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    paymentStatus: {
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
    modelName: "PaymentInvoice",
    tableName: "PaymentInvoice",
  }
);

PaymentInvoice.belongsTo(
    Receipt,
    {
      foreignKey: 'receiptID'
    }
  );

module.exports = PaymentInvoice;