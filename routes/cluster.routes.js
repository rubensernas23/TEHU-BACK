const { Router } = require("express");
const { clusterGet } = require("../controllers/cluster.controller");


const router = Router();
router.get("/",[
    
], clusterGet);

module.exports = router;
