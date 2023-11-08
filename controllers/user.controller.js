const { response } = require('express');

const user = require('../models/user');
const bcrypt = require('bcrypt');
const rol = require("../models/rol");
const jwt = require('jsonwebtoken');
const sendPassEmail = require('../helpers/sendPassEmail ');

const userPost = async (req, res = response) => {
  const { name, position, phone, email, password, authenticated, rolId, subordinateId, identificationType, identificationNumber, company } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      position,
      phone,
      email,
      password: hashedPassword,
      authenticated,
      rolId,
      subordinateId,
      identificationType,
      identificationNumber,
      company
    });

    res.json({
      msg: 'Usuario creado correctamente',
      user: {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        position: newUser.position,
        rolId: newUser.rolId,
        identificationType: newUser.identificationType,
        identificationNumber: newUser.identificationNumber,
        company: newUser.company
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.errors,
    });
  }
};

const userCreatePost = async (req, res = response) => {
  const { name, position, phone, email, password, authenticated, rolId, identificationType, identificationNumber, company } = req.body;
  console.log(req.body);
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ msg: 'Token de autenticación no proporcionado' });
  }
  const userload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
  console.log('USUARIO',req.user.company);
  const userId= userload.uid

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await user.create({
      name,
      position,
      phone,
      email,
      password: hashedPassword,
      authenticated,
      rolId,
      identificationType,
      identificationNumber,
      company: req.user.company,
      subordinateId : userId
    });

    res.json({
      msg: 'Usuario creado correctamente',
      user: {
        id: newUser.id,
        name: newUser.name,
        phone: newUser.phone,
        email: newUser.email,
        position: newUser.position,
        rolId: newUser.rolId,
        identificationType: newUser.identificationType,
        identificationNumber: newUser.identificationNumber,
        subordinateId: userId,
        company: newUser.company
      }
    });
    sendPassEmail(email, password, newUser.id)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.errors,
    });
  }
};

const userGet = async (req, res = response) => {
  try {
    const users = await user.findAll({
      attributes: ['id', 'name', 'phone', 'email', 'rolId', 'position', 'identificationType', 'identificationNumber', 'company'],
    });

    const roleIds = users.map(user => user.rolId);
    console.log('roleIdsroleIds', roleIds);
    const roles = await rol.findAll({
      where: {
        id: roleIds
      },
      attributes: ['id', 'Name']
    });

    const formattedUsers = users.map(user => {
      const role = roles.find(role => role.id === user.rolId);
      const { id, name, phone, email, position, identificationType, identificationNumber, company, rolId } = user;
      return {
        id,
        name,
        phone,
        email,
        position,
        identificationType,
        identificationNumber,
        company,
        rolId: rolId,
        roleName: role ? role.Name : null // Incluye el nombre del rol como 'roleName'
      };
    });

    res.json({ users: formattedUsers });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: error.errors });
  }
};

const getSubordinateUsers = async (req, res = response) => {
  const subordinateId = req.params.id;

  try {
    // Buscar usuarios que tengan subordinateId igual a la ID proporcionada
    const users = await user.findAll({
      where: {
        subordinateId: subordinateId
      },
      attributes: ['id', 'name', 'phone', 'email', 'rolId', 'company', 'identificationNumber'] // Seleccionar los campos deseados
    });

    // Obtener los nombres de los roles asociados a los usuarios
    const roleIds = users.map(user => user.rolId);
    const roles = await rol.findAll({
      where: {
        id: roleIds
      },
      attributes: ['id', 'Name']
    });

    // Asociar los nombres de los roles a los usuarios
    const usersWithRoles = users.map(user => {
      const role = roles.find(role => role.id === user.rolId);
      return {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        company: user.company,
        identificationNumber: user.identificationNumber,
        rol: role ? role.Name : null
      };
    });

    res.json({
      users: usersWithRoles
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.errors,
    });
  }
};

const userPut = async (req, res = response) => {
  const id =  req.user.id
  console.log('el id del usuario es : ', id);
  try {
    // Obtener los datos actualizados del usuario del cuerpo de la solicitud
    const { name, position, phone, email, password, authenticated, rol } = req.body;

    // Buscar el usuario existente en la base de datos
    const existingUser = await user.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    // Actualizar los campos del usuario con los nuevos valores proporcionados
    existingUser.name = name;
    existingUser.position = position;
    existingUser.phone = phone;
    existingUser.email = email;
    existingUser.authenticated = authenticated;
    existingUser.rol = rol;

    // Verificar si se proporcionó un nuevo password y hashearlo
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      existingUser.password = hashedPassword;
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
      msg: error.errors,
    });
  }
};

const userDelete = async (req, res = response) => {
  const id = req.params.id;

  try {
    // Buscar el usuario existente en la base de datos
    const existingUser = await user.findByPk(id);

    if (!existingUser) {
      return res.status(404).json({ msg: 'El usuario no existe' });
    }

    // Eliminar el usuario de la base de datos
    await existingUser.destroy();

    res.json({
      msg: 'Usuario eliminado correctamente',
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.errors
    });
  }
};

const listRol = async (req, res = response) => {
  try {
    const subordinateId = req.params.rol; // Obtén el rol de los parámetros de la solicitud

    const users = await user.findAll({
      where: {
        rolId: subordinateId, // Filtra por el rol requerido
      },
      attributes: ['id', 'name', 'phone', 'email', 'rolId', 'position', 'identificationType', 'identificationNumber', 'company'],
    });
    const roleIds = users.map(user => user.rolId);
    const roles = await rol.findAll({
      where: {
        id: roleIds
      },
      attributes: ['id', 'Name']
    });

    const usersRoles = users.map(user => {
      const role = roles.find(role => role.id === user.rolId);
      return {
        id: user.id,
        name: user.name,
        phone: user.phone,
        email: user.email,
        company: user.company,
        rol: role ? role.Name : null
      };
    });

    res.json({
      users: usersRoles
    });

    // Resto del código de formateo o respuesta...

  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al obtener los usuarios' });
  }
};

const userInfo = async (req, res = response) => {
  try {
    
    const token = req.header('token');
    if (!token) {
      return res.status(401).json({ msg: 'Token de autenticación no proporcionado' });
    }
    const userload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    console.log(userload.uid);
    const userId= userload.uid
    
    const currency = await user.findByPk(userId, {
      attributes: ['id', 'name', 'phone', 'email', 'rolId', 'position', 'identificationType', 'identificationNumber', 'company'],
    });
    if (!currency) {
      return res.status(404).json({ msg: 'Usuario no encontrado' });
    }

    const formattedUser = {
      id: currency.id,
      name: currency.name,
      phone: currency.phone,
      email: currency.email,
      position: currency.position,
      identificationType: currency.identificationType,
      identificationNumber: currency.identificationNumber,
      company: currency.company,
    };
    res.json({ user: formattedUser });
  } catch (error) {
    console.log(error);
    res.status(500).json({ msg: 'Hubo un error al obtener el usuario' });
  }
};

module.exports = {
    userGet,
    userPost,
    userPut,
    userDelete,
    getSubordinateUsers,
    listRol,
    userInfo,
    userCreatePost
}