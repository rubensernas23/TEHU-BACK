const { DataTypes, Sequelize } = require("sequelize");
const db = require("../db/connection");
const device = require("../models/device");
const topicos = require("../models/topicos");
const device_data = require("../models/device_data");
const WebSocket = require('ws');

const wss = new WebSocket.Server({ port: 5000 });

const brokerReady = (broker) => {
  let  client_id = ''
  broker.on("ready", () => {
    console.log("Broker mosca is ready..", process.env.PORT2);
  });

  broker.on("clientConnected", async (client) => {
    client_id  = client.id.replace(/-/g, '_');
    const searchDevice = await device.findOne({ where: { name: client_id} });
    if (!searchDevice) {
      device_data(client_id)
      const newdevice = {
        name: client_id,
        status: true,
        online: true,
        type: 1
      };
      const createNewdevice = await device.create(newdevice);
    }
  });

  broker.on("published", async (packet) => {
    const topicName = packet.topic
    const payload = packet.payload
    const cleanedDataString = payload.replace(/nan/g, 'null');
    const dataObject = JSON.parse(cleanedDataString)
    console.log("dataObject", dataObject);
    const valuesToInsert = {
      topic: topicName,
      temp1: dataObject.temp1,
      h: dataObject.h,
      temp2: dataObject.temp2,
      temp3: dataObject.temp3,
      lat: dataObject.lat,
      lon: dataObject.lon,
      rssi: dataObject.rssi,
      bat: dataObject.bat,
    };
    const frs = await device_data(client_id).create(valuesToInsert)


    wss.clients.forEach(client => {
      if (client.readyState === WebSocket.OPEN) {
        const message = {
          temp2: dataObject.temp2,
          client_id: client_id
        };
        client.send(JSON.stringify(message));
      }
    });
  });
};

module.exports = brokerReady;