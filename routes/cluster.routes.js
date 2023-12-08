const { Router } = require("express");
const { clusterGet, clusterDelete, clusterput, clusterlist, clusterusers, clusterPost} = require("../controllers/cluster.controller");


const router = Router();
router.get("/",[
    
], clusterGet);

router.post("/create/",[
    
], clusterPost);

router.delete("/delete/:id",[
    
], clusterDelete);

router.put("/update/",[
    
], clusterput);

router.get("/list/:id", [
    
], clusterlist);

router.get("/users/:id", [
    
], clusterusers);




module.exports = router;
