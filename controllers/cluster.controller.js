const { response } = require('express');
const cluster = require('../models/cluster');

const clusterGet = async (req, res = response) => {
    const clusters = await cluster.findAll();
    res.json({
        clusters
    })
}

module.exports = {
    clusterGet,
}
