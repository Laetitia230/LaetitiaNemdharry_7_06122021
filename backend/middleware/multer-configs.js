const multer = require("multer");
const fs = require('fs');
const MYME_TYPES = {
  "image/jpg": "jpg",
  "image/jpeg": "jpg",
  "image/png": "png",
};

fs.mkdir("./images", function(image) {
  if(!image || (image && image.code === 'EEXIST')){
    console.log("Dossier déjà existant!")
  } else {
    console.log("Votre dossier à bien été crée.")
  }
});

const storage = multer.diskStorage({
  destination: (req, file, callback) => {
    callback(null, "images");
  },
  filename: (req, file, callback) => {
    const name = file.originalname.split(".")[0].split(" ").join("_");
    const extension = MYME_TYPES[file.mimetype];
    callback(null, name + "_" + Date.now() + "." + extension);
  },
});

module.exports = multer({ storage }).single("file");
