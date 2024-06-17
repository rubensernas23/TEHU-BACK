const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const device = db.define("device", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  nameour: {
    type: DataTypes.STRING,
  },
  status: {
    type: DataTypes.BOOLEAN
  },
  type: {
    type: DataTypes.INTEGER
  },
  online: {
    type: DataTypes.BOOLEAN
  },
  lgn_end: {
    type: DataTypes.STRING
  },
  lat_end: {
    type: DataTypes.STRING
  },
  origin: {
    type: DataTypes.STRING
  },
  company_id: {
    type: DataTypes.STRING
  },
  destination: {
    type: DataTypes.STRING
  },
});

device.sync()
  
module.exports = device;