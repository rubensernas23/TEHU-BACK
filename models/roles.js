const { DataTypes } = require("sequelize");
const db = require("../db/connection");

const roles = db.define("roles",  {
    user_id: {
      type: DataTypes.INTEGER,
    },
    name: {
      type: DataTypes.STRING,
    },
    id_roles: {
      type: DataTypes.INTEGER,
    },
});

roles.sync()

module.exports = roles;
