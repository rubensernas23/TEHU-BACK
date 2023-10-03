const { response } = require('express');
const device = require('../models/device');

const deviceGet = async (req, res = response) => {
    const devices = await device.findAll();
    res.json({
        devices
    })
}

module.exports = {
    deviceGet,
}
