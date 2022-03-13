const express = require("express");
const router = express.Router();

const commentCtrl = require("../controllers/comment");
const auth = require("../middleware/auth");

//DIFFERENTE ROUTES POUR LES COMMENTAIRES, COMPRENNANTS LE MIDDLEWARE D'AUTHENTIFICATION
router.post("/", auth, commentCtrl.createComment);
router.get("/:id", auth, commentCtrl.getAllComment);
router.delete("/:id", auth, commentCtrl.deleteComment);

module.exports = router;
