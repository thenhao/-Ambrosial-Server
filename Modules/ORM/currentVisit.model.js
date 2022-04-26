const { DataTypes, Model} = require("sequelize");
const {sequelize} = require('./setup');
const Clinic = require('./clinic.model');
const Person = require('./person.model');
const MC = require('./mc.model');
const NextOfKin = require("./nextOfKin.model");

class CurrentVisit extends Model {}

CurrentVisit.init(
  {
    regNo: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
      field: 'reg_no'
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
    issueMC: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      field: 'issue_mc'
    },
    mcID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'mc_ID'
    },
    nextOfKinID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'next_of_kin_ID'
    },
    currentDiagnosis: {
      type: DataTypes.STRING,
      allowNull: false,
      field: 'current_diagnosis'
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
    modelName: "CurrentVisit",
    tableName: "CurrentVisit",
  }
);

CurrentVisit.belongsTo(
  Clinic,
  {
    foreignKey: 'clinicID'
  }
);

CurrentVisit.belongsTo(
  Person,
  {
    foreignKey: 'FIN'
  }
);

CurrentVisit.belongsTo(
  MC,
  {
    foreignKey: 'mcID'
  }
);

CurrentVisit.belongsTo(
  NextOfKin,
  {
    foreignKey: 'nextOfKinID'
  }
);

module.exports = CurrentVisit;