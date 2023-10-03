const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const user = require("./user");


const lab = db.define("lab", {
  Name: {
    type: DataTypes.STRING,
  }
});

lab.belongsTo(user, {
  foreignKey: {
    name: "id_user",
    allowNull: false,
  },
});

lab.sync()

module.exports = lab;
