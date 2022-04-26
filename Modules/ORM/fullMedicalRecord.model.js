const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('./setup');
const Person = require('./person.model');
const NextOfKin = require("./nextOfKin.model");
const Clinic = require("./clinic.model");

class FullMedicalRecord extends Model {}

FullMedicalRecord.init(
  {
    recordID: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'record_ID'
    },
    clinicID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'clinic_ID'
    },
    FIN: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    medicalHistory: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'medical_history'
    },
    visitHistory: {
      type: DataTypes.DATE,
      allowNull: false,
      field: 'visit_history',
      defaultValue: new Date(),
    },
    nextOfKinID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'next_of_kin_ID'
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
    modelName: "FullMedicalRecord",
    tableName: "FullMedicalRecord",
  }
);

FullMedicalRecord.belongsTo(
  Clinic,
  {
    foreignKey: 'clinicID'
  }
);

FullMedicalRecord.belongsTo(
    Person,
    {
      foreignKey: 'FIN'
    }
  );

FullMedicalRecord.belongsTo(
  NextOfKin,
  {
    foreignKey: 'nextOfKinID'
  }
);

module.exports = FullMedicalRecord;