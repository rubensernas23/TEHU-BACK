const { response } = require('express');
const device = require('../models/device');
const WebSocket = require('ws');

/* const wss = new WebSocket.Server({ port: 8080 });

// Manejar eventos de publicación MQTT
const handleMQTTPublishedEvent = (broker) => {
    broker.on("published", async (packet) => {
        // Insertar datos en la base de datos

        // Después de la inserción, enviar datos al cliente a través de WebSocket
        wss.clients.forEach(client => {
            if (client.readyState === WebSocket.OPEN) {
                const message = {
                    temp2: dataObject.temp2 // Suponiendo que aquí están los datos que deseas enviar
                };
                client.send(JSON.stringify(message));
            }
        });
    });
} */

const devicesGet = async (req, res = response) => {
    const devices = await device.findAll();

    res.json({
        devices
    })
}

const deviceGet = async (req, res = response) => {
    const did = req.params.did
    console.log(did);
   /*  const devices = await device.findByPk(did, {
        attributes: ['id', 'name','status']
    }); */
    const device_info = await device.findByPk(did);

    if (!device_info) {
        return res.status(404).json({ msg: 'Usuario no encontrado' });
    }
  
    res.json({
        device_info
    })
}

const devicePut = async (req, res ) => {
    try {
        const {id, name, status, type, online, origin, destination, destinationLatLng, company_id} = req.body
        let lat_end = null;
        let lgn_end = null
        if(destinationLatLng) {
            lat_end =  destinationLatLng.lat;
            lgn_end = destinationLatLng.lng
        }
        const query = await device.update({name, status, type, online, origin, destination, company_id, lat_end, lgn_end }, {
            where: {
                id: id
            }
        })
        if (query){
            res.json({
                msg: "El device se actualizo correctamente.",
            })
        } else {
            res.json({
                msg: "Error en las IDs de device",
            })
        }
    } catch(error){
        res.status(500).json({
         msg: error.errors
        })
    }
}

const getLastDevices = async (req, res = response) => {
    const company_id = req.header('company_id');

    try {
        const devices = await device.findAll({
            attributes: ['id', 'name', 'company_id', 'online', 'origin', 'destination'],
            where: {
                company_id: company_id,
                online: 1
            },
            limit: 4,
        });
        res.json({
            devices
        })

    } catch(error){
        res.status(500).json({
         msg: error.errors
        })
    }
}

const getLastDevicesHome = async (req, res = response) => {
    const company_id = req.header('company_id');

    try {
        const devices = await device.findAll({
            attributes: ['id', 'name', 'company_id', 'online', 'status'],
            where: {
                company_id: company_id,
            },
            limit: 8,
        });
        res.json({
            devices
        })

    } catch(error){
        res.status(500).json({
         msg: error.errors
        })
    }
}

module.exports = {
    devicesGet,
    deviceGet,
    devicePut,
    getLastDevices,
    getLastDevicesHome
}
