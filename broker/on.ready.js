const { DataTypes, Sequelize } = require("sequelize");
const db = require("../db/connection");
const device = require("../models/device");
const topicos = require("../models/topicos");
const device_data = require("../models/device_data");

const brokerReady = (broker) => {
  // este evento se ejcuta cuando el server esta on
  broker.on("ready", () => {
    console.log("Broker mosca is ready..", process.env.PORT2);
  });

  broker.on("clientConnected", async (cliente) => {
    //console.log(cliente);
    //console.log("dispositivo con id: ", cliente);
    /* const searchDevice = await device.findOne({ where: { name: cliente.id } });
    if (!searchDevice) {
      //device_data(cliente.id)
      const newdevice = {
        name: cliente.id,
        status: true,
        type: 0,
        online: 0
      };
      const createNewdevice = await device.create(newdevice);
    } */
  });

  broker.on("published", async (packet) => {
    //console.log('packet', packet);
    /* const topicName = packet.topic;
    const dataTopic = await JSON.parse(packet.payload);
    const { id } = dataTopic;

    const tableName = id;
    const valuesToInsert = {
      id: dataTopic.id,
      topic: topicName,
      id_device: JSON.parse(packet.payload).id,
      data: packet.payload
    };

    const frs = await device_data(id).create(valuesToInsert) */
  });
};

module.exports = brokerReady;