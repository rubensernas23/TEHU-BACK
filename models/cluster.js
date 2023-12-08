const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const Company = require("./company");
const company = require("./company");

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
  devices: {
    type: DataTypes.STRING,
  },
  users:{
    type: DataTypes.STRING,
  },
});

cluster.belongsTo(Company, { foreignKey: 'companyId' });

cluster.sync()
  
module.exports = cluster;