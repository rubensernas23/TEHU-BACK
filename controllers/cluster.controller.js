const { response } = require('express');
const cluster = require('../models/cluster');

const clusterlist = async (req, res = response) => {
    try {
        const id = req.params.id
        const query = await cluster.findAll({
        where: {
            companyId: id,
            
        },
        attributes: ['id', 'name','devices']
        })
        //console.log(list);
        const list = []
        query.forEach((item) => {
            const arreglo = JSON.parse(item.devices);  // Convierte la cadena en un arreglo de JavaScript
            const devices_count = arreglo.length;

            console.log(devices_count);
            list.push({
                "id": item.id,
                "name": item.name,
                "devices_count": devices_count
            })
            
        })
        res.json({
            list
        })
    }catch(error){
        res.status(500).json({
            msg: error.errors,
        })
    }    
}
const clusterusers = async (req, res = response) => {
    try {
        const id = req.params.id
        const query = await cluster.findAll({
        where: {
           companyId: id,
            
        },
        attributes: ['id', 'name','devices']
        })
        //console.log(query);
        const list = []
        query.forEach((item) => {
            //console.log(hola);
            const cadena = item.devices
            const c = cadena.replace('[', '');
            const c1 = c.replace(']', '');
            const arr = c1.split(',');
            const devices_count = arr.length;
            //console.log(devices_count);
            
            
            list.push({
                "id": item.id,
                "name": item.name,
                //"devices": item.devices,
                "devices_count": devices_count
                //"users_count": users_count
            })

        })
       // console.log(users);
        res.json({
           list
        })
    }catch(error){
        res.status(500).json({
            msg: error.errors,
        })
    }    
}

const clusterGet = async (req, res = response) => {
    try {
        const clusters = await cluster.findAll();
        res.json({
            clusters
        })
    }catch(error){
        res.status(500).json({
            msg: error.errors
        })
    }
}
const clusterPost = async (req, res = response) => {

    try {
        const {name, companyId, users, devices} = req.body 
        
        const newCluster = await cluster.create({
            name, 
            companyId, 
            devices,
            users
        })
        res.json({
            msg: "Se creo exitosamente.",
            data: newCluster
        })
    } catch(error){
        res.status(500).json({
            msg: error.errors
        })
    }
}


const clusterput = async (req, res ) => {
    try {
        const {id, name, devices, users} = req.body
        const query = await cluster.update({name, devices, users }, {
            where: {
                id: id
            }
        })
        if (query){
            res.json({
                msg: "El grupo se actualizo correctamente.",
            })
        } else {
            res.json({
                msg: "Error en las IDs de compañia o dispositivo",
            })
        }
    } catch(error){
        res.status(500).json({
         msg: error.errors
        })
    }
}

const clusterDelete = async (req, res = response) => {
   try {
        const id = req.params.id
        const existingcluster = await cluster.findByPk(id)
        if(!existingcluster){
            return res.status(400).json({msg: "El grupo no exíste."})
        }
        await existingcluster.destroy()
        res.json({
            msg: "El grupo se elimino correctamente."
        })
    } catch(error){
        res.status(500).json({
            msg: error.errors
        })
    }
}  


module.exports = {
    clusterGet,
    clusterPost,
    clusterDelete,
    clusterput,
    clusterlist,
    clusterusers,
  
    
}
    
