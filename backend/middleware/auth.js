const jwt = require("jsonwebtoken");
require("dotenv").config();

//MIDDLEWARE POUR L'AUTENTIFICATION ET LA VALIDATION DE L'UTILISATEUR OU D'UN ADMINISTRATEUR
module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decodedToken = jwt.verify(token, process.env.TOKEN_SECRET);
    const userId = decodedToken.id;
    const admin = decodedToken.isAdmin;

    if (!admin) {
      if (req.body.id && req.body.id !== userId) {
        throw "Invalid user ID or not Admin !";
      } else {
        next();
      }
    } else {
      next();
    }
  } catch (error) {
    res.status(401).json({
      error: error | "requête non authentifiée !",
    });
  }
};
