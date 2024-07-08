const { response } = require('express');
const device = require('../models/device');
const devicedata = require('../models/device_data');
const WebSocket = require('ws');
const { sequelize } = require('../db/connection'); 
const { QueryTypes } = require('sequelize');
const device_data = require("../models/device_data");

const deviceData = require('../models/device_data');


// Función para crear un nuevo dispositivo
const createDevice = async (req, res) => {
  const { name, nameour, status, type, online, lgn_end, lat_end, origin, company_id, destination } = req.body;

  try {
    const searchDevice = await device.findOne({ where: { name: name} });
    if (!searchDevice){
        console.log(searchDevice);
        const newDevice = await device.create({
          name,
          nameour,
          status,
          type,
          online,
          lgn_end,
          lat_end,
          origin,
          company_id,
          destination,
        });
        device_data(name)    
        res.status(200).json(newDevice);
    } else {
        res.status(201).json({
            msg: "The device already exists!"
        });
    }
   
  } catch (error) {
    // Manejo de errores
    console.error('Error creating device:', error);
    res.status(500).json({ error: 'Error creating device' });
  }
};

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
        const {id, name, nameour, status, type, online, origin, destination, destinationLatLng, company_id} = req.body
        let lat_end = null;
        let lgn_end = null
        if(destinationLatLng) {
            lat_end =  destinationLatLng.lat;
            lgn_end = destinationLatLng.lng
        }
        const query = await device.update({name, nameour, status, type, online, origin, destination, company_id, lat_end, lgn_end }, {
            where: {
                id: id
            }
        })
        if (query){
            res.json({
                msg: "El device se actualizo correctamente.",
                status: 200
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
            where: {
                company_id: company_id,
                online: 1
            },
            limit: 4,
        });
        res.status(200).json({
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
            attributes: ['id', 'name', 'company_id', 'type'],
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

const getAllFromTable = async (req, res) => {
    const deviceName = req.params.deviceName;
    const modelName = `${deviceName}s`;
    const DeviceModel = deviceData(modelName);

    try {
        const deviceData = await DeviceModel.findAll({
            attributes: ['id', 'temp2', 'bat', 'updatedAt'],
        });

        res.json({
            deviceData
        });
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving data from ${modelName}: ${error.message}`
        });
    }
};

const getStatistics = async (req, res = response) => {
    res.json({
        "msg": "hele"
    })
}

module.exports = {
    devicesGet,
    deviceGet,
    devicePut,
    getLastDevices,
    getLastDevicesHome,
    getStatistics,
    getAllFromTable,
    createDevice
}
