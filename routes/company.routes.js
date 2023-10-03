const { Router } = require("express");
const { companyGet, companyCreatePost } = require("../controllers/company.controller");
const { validarJWT } = require("../middlewares/validar-jwt");


const router = Router();
router.get("/",[
], companyGet);

router.get("/create",[
    validarJWT
], companyCreatePost);

module.exports = router;