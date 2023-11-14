const { Router } = require("express");
const { userGet, userPost, userPut, getSubordinateUsers, userDelete, listRol, userInfo, userCreatePost, userDetails } = require("../controllers/user.controller");

const { validarJWT } = require("../middlewares/validar-jwt");

const router = Router();

router.post("/", userPost);

router.get("/", [
    validarJWT
], userGet);

router.get("/list/:id", getSubordinateUsers);

router.put("/", [validarJWT], userPut);

router.get("/:id", [validarJWT], userDetails);

router.get("/currency", [
    validarJWT
], userInfo);

router.get("/list/:id/:rol", listRol);


router.post("/create", [
    validarJWT
], userCreatePost);

router.delete("/delete/:id", userDelete);

module.exports = router;
