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
  status: {
    type: DataTypes.BOOLEAN
  },
  type: {
    type: DataTypes.INTEGER
  },
  online: {
    type: DataTypes.BOOLEAN
  },
  origin: {
    type: DataTypes.STRING
  },
  destination: {
    type: DataTypes.STRING
  },
  lgn_start: {
    type: DataTypes.STRING
  },
  lat_start: {
    type: DataTypes.STRING
  },
  lgn_end: {
    type: DataTypes.STRING
  },
  lat_end: {
    type: DataTypes.STRING
  },
});

device.sync()
  
module.exports = device;