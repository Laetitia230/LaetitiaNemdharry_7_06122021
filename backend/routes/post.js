const express = require("express");
const router = express.Router();

const postCtrl = require("../controllers/post");
const auth = require("../middleware/auth");
const multer = require("../middleware/multer-configs");

//DIFFERENTE ROUTES POUR LES POSTS, COMPRENNANTS LES DIFFERENTS MIDDLEWARE UTILES ET D'AUTHENTIFICATION
router.get("/", auth, postCtrl.getAllPost);
router.post("/", auth, multer, postCtrl.createPost);
router.delete("/:id", auth, postCtrl.deletePost);
router.get("/:id", auth, postCtrl.getPostByUserId);

module.exports = router;
