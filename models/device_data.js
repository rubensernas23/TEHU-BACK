const { DataTypes, Sequelize } = require("sequelize");
const db = require("../db/connection");

const device_data = (modelName) => {
  const model = db.define(
    modelName,
    {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      topic: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.STRING, // Cambia esto según el tipo de datos correcto
      },
      id_device: {
        type: DataTypes.STRING, // Cambia esto según el tipo de datos correcto
      }
    },
    {
      timestamps: true, // Habilita timestamps (createdAt y updatedAt)
    }
  );

  // Sincroniza el modelo aquí dentro de la función
  model.sync();

  return model;
};

module.exports = device_data;
