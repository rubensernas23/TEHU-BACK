const { Router } = require("express");
const { devicesGet, deviceGet, devicePut, getLastDevices } = require("../controllers/device.controller");

const router = Router();
router.get("/",[
    
], devicesGet);

router.get("/:did", deviceGet);

router.put("/update", devicePut);

router.get("/last/online/", getLastDevices);

module.exports = router;
