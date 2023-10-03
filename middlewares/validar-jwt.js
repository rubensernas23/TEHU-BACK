const { response, request } = require("express");
const jwt = require("jsonwebtoken");
const usuario = require("../models/user");



const validarJWT = async (req = request, res = response, next) => {
  // accediendo a los headers de la peticion....
  const token = req.header("token");

  if (!token) {
    return res.status(401).json({
      msg: "no hay token en la peticion",
    });
  }
    //   importante usar un trycarch para validar el JWT
  try {

    const payload = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
    req.uid = payload.uid
    
    const user = await usuario.findOne({ where: { id : payload.uid } });
    
    if (!user) {
        return res.json({
            msg: 'el usuario no se encuentra en la base de datos..'
        })
    }
    req.user = user

    next();
  } catch (error) {
    console.log(error);
    return res.status(401).json({
        msg: "token no valido",
      });
  }
};

module.exports = {
  validarJWT,
};
