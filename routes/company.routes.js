const { Router } = require("express");
const { companyGet, companyCreatePost, getCompany } = require("../controllers/company.controller");
const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/",[
], companyGet);

router.get("/:id",[
    
], getCompany);

router.get("/create",[
    validarJWT
], companyCreatePost);

module.exports = router;