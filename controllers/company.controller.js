const { response } = require('express');
const company = require('../models/company');
const device = require('../models/device');

const companyGet = async (req, res = response) => {
    const companies = await company.findAll();
    res.json({
        companies
    })
}

const companyCreatePost = async (req, res = response) => {
  const { name  } = req.body;
  const token = req.header('token');
  if (!token) {
    return res.status(401).json({ msg: 'Token de autenticación no proporcionado' });
  }
  const userload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
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
    sendPassEmail(email, password)
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.errors,
    });
  }
};

const getCompany = async (req, res = response) => {
  const id = req.params.id
  const token = req.header('token');
  
  if (!token) {
    return res.status(401).json({ msg: 'Token de autenticación no proporcionado' });
  }


  try {
    const companies = await company.findByPk(id)

    const deviceCount = await device.count({
      where: {
        company_id: id,
      },
    });
    res.json({
      companies,
      deviceCount,
      notifications_alerts: "1550",
      positive_alerts: "1472",
      negative_alerts: "78",
      positive_alerts_percentage: "95",
      negative_alerts_percentage: "5"
    })
  } catch (error) {
    console.log(error);
    res.status(500).json({
      msg: error.errors,
    });
  } 
}

module.exports = {
  companyGet,
  companyCreatePost,
  getCompany
}