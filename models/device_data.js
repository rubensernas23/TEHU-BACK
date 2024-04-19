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
      temp1: {
        type: DataTypes.STRING, 
      },
      h: {
        type: DataTypes.STRING, 
      },
      temp2: {
        type: DataTypes.STRING, 
      },
      temp3: {
        type: DataTypes.STRING, 
      },
      lat: {
        type: DataTypes.STRING, 
      },
      lon: {
        type: DataTypes.STRING, 
      },
      rssi: {
        type: DataTypes.STRING, 
      },
      bat:{
        type: DataTypes.STRING, 
      },
      topic: {
        type: DataTypes.STRING,
      },
      data: {
        type: DataTypes.STRING, 
      },
      id_device: {
        type: DataTypes.STRING, 
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
