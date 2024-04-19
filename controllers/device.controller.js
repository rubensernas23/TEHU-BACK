const { response } = require('express');
const device = require('../models/device');

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
        const {id, name, status, type, online} = req.body
        const query = await device.update({name, status, type, online }, {
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

module.exports = {
    devicesGet,
    deviceGet,
    devicePut
}
