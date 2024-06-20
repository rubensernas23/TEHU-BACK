const { Router } = require("express");
const {
  getAllTemperatures,
  getTemperaturesByCompanyId,
  createTemperature
} = require("../controllers/temperature.controller");

const router = Router();

router.get("/", getAllTemperatures);

router.get("/company/:companyId", getTemperaturesByCompanyId);

router.post("/create", createTemperature);

module.exports = router;
