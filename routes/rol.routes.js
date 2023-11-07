const { Router } = require("express");
const { rolGet } = require("../controllers/rol.controller");


const router = Router();
router.get("/",[
    
], rolGet);

module.exports = router;
