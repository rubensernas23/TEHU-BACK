const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const company = db.define("company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

company.sync()

module.exports = company;
