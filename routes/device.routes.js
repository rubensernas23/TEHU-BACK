const { Router } = require("express");
const { deviceGet } = require("../controllers/device.controller");

const router = Router();
router.get("/",[
    
], deviceGet);

module.exports = router;
