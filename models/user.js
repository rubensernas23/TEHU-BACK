const { DataTypes } = require("sequelize");
const db = require("../db/connection");
const rol = require("./rol");
const Company = require("./company");

const user = db.define("user", {
    name: {
      type: DataTypes.STRING,
    },
    phone: {
        type: DataTypes.STRING,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        unique: true
    },
    position: {
      type: DataTypes.STRING,
    },
    authenticated: {
        type: DataTypes.STRING,
    },
    password: {
        type: DataTypes.STRING,
    },
    code: {
        type: DataTypes.STRING,
    },
    subordinateId: {
        type: DataTypes.STRING,
      },
    identificationType: {
        type: DataTypes.STRING,
      },
    identificationNumber: {
        type: DataTypes.STRING,
        unique: true
    },
    rolId: {
        type: DataTypes.INTEGER,
        references: {
            model: rol,
            key: 'id',
        },
    },
    companyId: {
        type: DataTypes.INTEGER,
        references: {
            model: Company,
            key: 'id',
        },
    },
});

user.belongsTo(Company, { foreignKey: 'companyId' });
user.belongsTo(rol, { foreignKey: 'rolId' });

user.sync()

module.exports = user;
