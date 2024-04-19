const { Router } = require("express");
const { devicesGet, deviceGet, devicePut } = require("../controllers/device.controller");

const router = Router();
router.get("/",[
    
], devicesGet);

router.get("/:did", deviceGet);

router.put("/update", devicePut);


module.exports = router;
