const { Router } = require("express");
const { userGet, userPost, userPut, getSubordinateUsers, userDelete, listRol, userInfo, userCreatePost } = require("../controllers/user.controller");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.get("/", [
    validarJWT
], userGet);

router.post("/", userPost);

router.post("/create", [
    validarJWT
], userCreatePost);

router.put("/", [validarJWT], userPut);

router.get("/currency", [
    validarJWT
], userInfo);

router.get("/list/:id", getSubordinateUsers);

router.get("/list/:id/:rol", listRol);

// router.delete("/", userDelete);
router.delete("/:id", userDelete);

module.exports = router;
