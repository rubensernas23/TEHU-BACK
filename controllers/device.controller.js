const { response } = require('express');
const device = require('../models/device');
const { Op } = require('sequelize');
const device_data = require("../models/device_data");
const deviceData = require('../models/device_data');



const { sequelize } = require('../db/connection'); 
const { QueryTypes } = require('sequelize');


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
    const company_id = req.header('company_id');
    try {
    
        if (!company_id) {
          return res.status(400).json({
            msg: 'El parámetro company_id es obligatorio',
          });
        }    
        const devices = await device.findAll({
          where: {
            company_id: company_id
          }
        });
    
        res.json({
          devices
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            msg: 'Error al obtener dispositivos',
        });
    }
    
};

const deviceGet = async (req, res = response) => {
    const did = req.params.did
    const company_id = req.params.company_id

    const device_info = await device.findOne({
        where: {
          id: did,
          company_id: company_id // Filtro adicional por company_id
        },
        attributes: ['id', 'name', 'status'] // Especifica las columnas que deseas retornar
    });
  
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

const getDevicesByCompanyId = async (req, res) => {
  try {
    const company_id = req.header('company_id');
    const type = req.header('type');
    const online = req.header('online');

    console.log("company_id", company_id);
    

    if (!company_id) {
      return res.status(400).json({
        msg: 'El parámetro company_id es obligatorio',
      });
    }

    const whereClause = { company_id };

    if (type) {
      if (type.startsWith('!')) {
        whereClause.type = { [Op.ne]: type.substring(1) };
      } else {
        whereClause.type = type;
      }
    }

    if (online !== undefined) {
      whereClause.online = online === 'true';
    }

    const devices = await device.findAll({ where: whereClause });

    // Verificar si se encontraron dispositivos
    if (devices.length === 0) {
      return res.status(404).json({
        msg: 'No se encontraron dispositivos para los filtros especificados',
      });
    }

    // Devolver los dispositivos filtrados
    res.json(devices);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      msg: 'Error al obtener dispositivos',
    });
  }
};

const getDynamicTableData = async (req, res) => {
  
    const deviceName = req.header('base_name');
    const modelName = `${deviceName}s`;
    const startDate = req.header('start_date'); // "2024-09-05 21:29:09" obtenido desde un header
    const endDate = req.header('end_date'); // "2024-09-05 22:13:23" obtenido desde un header
    const DeviceModel = deviceData(modelName);

    try {
     
        const whereClause = {};
    
        if (startDate && endDate) {
          whereClause.updatedAt = { // Cambia 'createdAt' por el nombre de tu campo de fecha
            [Op.between]: [startDate, endDate]
          };
        }

        const data = await DeviceModel.findAll({
            attributes: ['id', 'temp2', 'bat', 'updatedAt'],
            where: whereClause,
          });

        res.json({
            data
        });
    } catch (error) {
        res.status(500).json({
            message: `Error retrieving data from ${modelName}: ${error.message}`
        });
    }
};

module.exports = {
    devicesGet,
    deviceGet,
    devicePut,
    getLastDevices,
    getLastDevicesHome,
    getStatistics,
    getAllFromTable,
    createDevice,
    getDevicesByCompanyId,
    getDynamicTableData
}
