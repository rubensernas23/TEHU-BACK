const { Router } = require("express");
const { devicesGet, deviceGet, devicePut, getLastDevices,
    getLastDevicesHome, getStatistics } = require("../controllers/device.controller");

const router = Router();
router.get("/",[
    
], devicesGet);

router.get("/:did", deviceGet);

router.put("/update", devicePut);

router.get("/last/online/", getLastDevices);
router.get("/last/other", getLastDevicesHome);
router.get("/statistics", getStatistics);

module.exports = router;
