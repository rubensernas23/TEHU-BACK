const {response} = require('express');
const dispositivos = require('../models/dispositivos');
const topicos = require('../models/topicos');


const dispGet = async (req, res = response) => {
    const disp = await dispositivos.findAll()
    const top = await topicos.findAll()
    res.json({
        disp,
        top
    })

}
const dispPost = (req, res = response) => {
    let {nombre, edad} = req.body
    res.json({
        msg: 'post API - Controlador',
        nombre,
        edad
    })
}
const dispPut = (req, res = response) => {
    const id = req.params.id
    res.json({
        msg: 'put API - Controlador',
        id
    })
}
const dispDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    })
}

module.exports = {
    dispGet,
    dispPost,
    dispPut,
    dispDelete
}