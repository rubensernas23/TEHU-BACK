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
  // id_data: {
  //   type: DataTypes.INTEGER,
  // }
});

device.sync()
  
module.exports = device;