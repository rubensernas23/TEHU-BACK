const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const Company = require("./company");

const Temperature = db.define("temperature", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  min: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  max: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Company,
      key: 'id'
    }
  }
});

Temperature.sync();

module.exports = Temperature;
