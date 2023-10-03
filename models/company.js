const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const company = db.define("company", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: false,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
company.sync().then(() => {
  return Promise.all([
    company.findOrCreate({
        where: {
          id: 0,
        },
        defaults: {
          name: "RRM",
        },
    }),
    company.findOrCreate({
      where: {
        id: 1,
      },
      defaults: {
        name: "Tehu",
      },
    }),
  ]);
}).then(([company1]) => {
}).catch((error) => {
    console.error("Error al buscar o crear company:", error);
});
  
module.exports = company;