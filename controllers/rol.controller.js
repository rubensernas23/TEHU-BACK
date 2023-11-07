const { response } = require('express');
const rol = require('../models/rol');
const bcrypt = require('bcrypt');

const rolGet = async (req, res = response) => {
    const rols = await rol.findAll();
    res.json({
      rols
    })
}

/* const userPost = async (req, res = response) => {
    
    const { Name, Cargo, Phone, Email, Password, authenticated, id_rol } = req.body
    try {
        const hashedPassword = await bcrypt.hash(Password, 10);
        const newUser = await user.create({ Name, Cargo, Phone, Email, Password: hashedPassword, authenticated, id_rol });
        res.json({
            msg: 'Usuario creado correctamente',
            user: newUser,
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Hubo un error al crear el usuario',
        });
    }
};

const userPut = async (req, res = response) => {
    const id = req.params.id;
  
    try {
      // Obtener los datos actualizados del usuario del cuerpo de la solicitud
      const { Name, Cargo, Phone, Email, Password, authenticated, id_rol } = req.body;
  
      // Buscar el usuario existente en la base de datos
      const existingUser = await user.findByPk(id);
  
      if (!existingUser) {
        return res.status(404).json({ msg: 'El usuario no existe' });
      }
  
      // Actualizar los campos del usuario con los nuevos valores proporcionados
      existingUser.Name = Name;
      existingUser.Cargo = Cargo;
      existingUser.Phone = Phone;
      existingUser.Email = Email;
      existingUser.authenticated = authenticated;
      existingUser.id_rol = id_rol;
  
      // Verificar si se proporcionó un nuevo password y hashearlo
      if (Password) {
        const hashedPassword = await bcrypt.hash(Password, 10);
        existingUser.Password = hashedPassword;
      }
  
      // Guardar los cambios en la base de datos
      await existingUser.save();
  
      res.json({
        msg: 'Usuario actualizado correctamente',
        user: existingUser,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        msg: 'Hubo un error al actualizar el usuario',
      });
    }
  };
const userDelete = (req, res = response) => {
    res.json({
        msg: 'delete API - Controlador'
    })
} */

module.exports = {
    rolGet,
   /*  userPost,
    userPut,
    userDelete
*/
}