const { Router } = require("express");
const { clusterGet, clusterPost, clusterDelete, clusterput, clusterlist, clustertable} = require("../controllers/cluster.controller");


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

router.put("/update/:id",[
    
], clustertable);



module.exports = router;
