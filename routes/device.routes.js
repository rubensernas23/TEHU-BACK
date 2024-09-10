const { Router } = require("express");
const { 
    devicesGet, 
    deviceGet, 
    devicePut, 
    getLastDevices,
    getLastDevicesHome, 
    getStatistics, 
    getAllFromTable,
    createDevice,
    getDevicesByCompanyId,
    getDynamicTableData
} = require("../controllers/device.controller");

const router = Router();
router.get("/",[
    
], devicesGet);

router.get("/data/:did/:company_id", deviceGet);

router.put("/update", devicePut);
router.post("/create", createDevice);


router.get("/last/online/", getLastDevices);
router.get("/last/other", getLastDevicesHome);

router.get('/get-table-data/:deviceName', getAllFromTable)

router.get("/statistics", [
    
], getStatistics);

router.get('/info/dev/', getDevicesByCompanyId);
router.get('/info/dynamic-table/', getDynamicTableData);

module.exports = router;
