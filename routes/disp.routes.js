const { Router } = require("express");
const { dispGet } = require("../controllers/disp");


const router = Router();

router.get("/",[
    
], dispGet);

// router.post("/", usuariosPost);

// router.put("/:id", usuariosPut);

// router.delete("/", usuariosDelete);

module.exports = router;
