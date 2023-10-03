const { Router } = require("express");
const {check} = require('express-validator');
const {  loginPost, loginPostValidate, loginCodeValidate, loginSendCode} = require("../controllers/login.controller");
const { validarCampos } = require("../middlewares/validar-campos");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post("/",[
    check('email', 'el correo es obligatorio').isEmail().not(),
    validarCampos
], loginPost);

router.post("/token",[
    validarJWT
], loginPostValidate);

router.post("/code",[
    validarJWT
], loginCodeValidate);

router.post("/send-code",[
    validarJWT
], loginSendCode);




module.exports = router;