const { response } = require("express");
const { generarJWT } = require("../helpers/generar-jwt");
const usuario = require("../models/user");
const bcrypt = require('bcrypt');
const senCodeEmail = require("../helpers/sendCodeEmail");


const loginPost = async (req, res = response) => {
  const { email, password } = req.body;
 
  try {
    const user = await usuario.findOne({ where: { email } });
    if (!user) {
      console.log("El correo no se encuentra en la base de datos.");
      return res.status(400).json({
        msg: "El correo no existe."
      });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(400).json({
        msg: "La contraseña es inválida."
      });
    }

    const token = await generarJWT(user.id);

    if (user.authenticated !== "1") {
      senCodeEmail(email)
    }
    
    return res.json({
      token,
      authenticated: user.authenticated,
      id: user.id
    });


  } catch (error) {
    return res.status(500).json({
      msg: error
    });
  }
};

const loginCodeValidate = async (req, res = response) => {
  const { email, code} = req.user
  try {
    if (code === req.body.code) {
      console.log('validando el codigo...');
      const user = await usuario.findOne({ where: { email } });
      user.authenticated = true
      user.save()
      res.json({
        msg: true
      })
    } else {
      return res.status(400).json({
        msg: "El código es incorrecto"
      });
    }
  } catch (error) {
    return res.status(500).json({
      msg: "Ocurrió un error al validar el código."
    });
  }
};

const loginSendCode = async (req, res = response) => {

  try {
    await senCodeEmail(req.user.email)
    res.json({
      msg: 'Código enviado'
    })
  } catch (error) {
    res.status.apply(500).json({
      msg: 'Hubo un error al eviar el código de verificación'
    })
  }

};


const loginPostValidate = async (req, res = response) => {

  res.json({
    msg: true
  })
};


module.exports = {
  loginPostValidate,
  loginPost,
  loginCodeValidate,
  loginSendCode
};
