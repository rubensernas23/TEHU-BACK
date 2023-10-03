const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const Company = require("./company");
const Device = require("./device");

const cluster = db.define("cluster", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  companyId: {
    type: DataTypes.INTEGER,
    references: {
        model: Company,
        key: 'id',
    },
  },
  deviceId: {
    type: DataTypes.INTEGER,
    references: {
        model: Device,
        key: 'id',
    },
  }
});

cluster.belongsTo(Company, { foreignKey: 'companyId' });
cluster.belongsTo(Device, { foreignKey: 'deviceId' });

cluster.sync()
  
module.exports = cluster;