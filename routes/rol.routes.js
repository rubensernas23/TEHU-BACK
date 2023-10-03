const { Router } = require("express");
const { rolGet } = require("../controllers/rol.controller");


const router = Router();
router.get("/",[
    
], rolGet);

// router.post("/", usuariosPost);

// router.put("/:id", usuariosPut);

// router.delete("/", usuariosDelete);

module.exports = router;
