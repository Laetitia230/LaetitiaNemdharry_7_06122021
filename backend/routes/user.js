const express = require("express");
const router = express.Router();
const userCtrl = require("../controllers/user");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-configs");

//DIFFERENTE ROUTES POUR LES UTILISATEURS, COMPRENNANTS LES DIFFERENTS MIDDLEWARE UTILES ET D'AUTHENTIFICATION
router.post("/signup", userCtrl.signup);
router.post("/login", userCtrl.login);
router.get("/:id", auth, userCtrl.me);
router.put("/:id", auth, multer, userCtrl.editUser);
router.delete("/:id", auth, userCtrl.deleteUser);
router.get("/", auth, userCtrl.getAllUser);

module.exports = router;
