const express = require("express");
const router = express.Router();

const likeCtrl = require("../controllers/like");
const auth = require("../middleware/auth");

//DIFFERENTE ROUTES POUR LES LIKES, COMPRENNANTS LE MIDDLEWARE D'AUTHENTIFICATION
router.post("/", auth, likeCtrl.like);
router.get("/:id", auth, likeCtrl.likeCounter);
router.get("/user/:id", auth, likeCtrl.getLikeUserId);

module.exports = router;
