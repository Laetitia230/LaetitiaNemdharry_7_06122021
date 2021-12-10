const bcrypt = require("bcrypt");
const { User } = require("../models");
const { Post } = require("../models");
const { Comment } = require("../models");
const jwt = require("jsonwebtoken");
const schemajoi = require("../middleware/joischema");
require("dotenv").config();
const fs = require("fs");

//CREATION DE L'UTILISATEUR
exports.signup = (req, res, next) => {
  const resultSchema = schemajoi.validate(req.body);
  let verifyAdmin = false;
  if (resultSchema.value.pseudo === process.env.ADMIN_SECRET) {
    //CONDITION POUR LA CREATION D'UN COMPTE ADMINISTRATEUR
    verifyAdmin = true;
  }
  if (!resultSchema.error) {
    bcrypt.hash(resultSchema.value.password, 10).then((hash) => {
      User.create({
        email: resultSchema.value.email,
        password: hash,
        pseudo: resultSchema.value.pseudo,
        isAdmin: verifyAdmin,
      })
        .then(() => res.status(201).json({ message: "utilisateur créé !" }))
        .catch((error) => res.status(400).json({ error }));
    });
  } else {
    res.status(402).json({ error: resultSchema.error.details });
  }
};

//CONNEXION DE L'UTILISATEUR
exports.login = (req, res, next) => {
  User.findOne({ where: { email: req.body.email } })
    .then((user) => {
      if (!user) {
        return res.json({ error: "Utilisateur non trouvé !" }).status(404);
      }
      bcrypt
        .compare(req.body.password, user.password)
        .then((valid) => {
          if (!valid) {
            return res.json({ error2: "Mot de passe incorrect !" }).status(400);
          }
          res.status(200).json({
            id: user.id,
            pseudo: user.pseudo,
            isAdmin: user .isAdmin,
            token: jwt.sign(
              { id: user.id, isAdmin: user.isAdmin },
              process.env.TOKEN_SECRET,
              {
                expiresIn: "24h",
              }
            ),
          });
        })
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};

// RECUPERER UN UTILISATEUR
exports.me = (req, res, next) => {
  User.findOne({
    attributes: ["id", "email", "pseudo", "bio", "photo", "createdAt"],
    where: { id: req.params.id },
    include: [
      {
        model: Post,
      },
    ],
  })
    .then((me) => res.status(200).json(me))
    .catch((error) => res.status(404).json({ error }));
};

// MODIFIER UN UTILISATEUR
exports.editUser = (req, res, next) => {
  const test = req.file;
  if (test) {
    //CONDITION SI L'IMAGE EST MODIFIÉ
    User.findOne({ where: { id: req.params.id } })
      .then((res2) => {
        const filename = res2.photo.split("/images/")[1];
        fs.unlink(`images/${filename}`, () => {
          User.update(
            {
              bio: req.body.bio,
              photo: `${req.protocol}://${req.get("host")}/images/${
                req.file.filename
              }`,
            },
            { where: { id: req.params.id } }
          )
            .then(() =>
              res
                .status(200)
                .json({ message: "l'utilisateur a été edité avec image" })
            )
            .catch((error) => res.status(400).json({ error }));
        });
      })
      .catch((error) => res.status(500).json({ error }));
  } else {
    User.update(
      {
        bio: req.body.bio,
      },
      { where: { id: req.params.id } }
    )
      .then(() =>
        res
          .status(201)
          .json({ message: "l'utilisateur a été edité sans image" })
      )
      .catch((error) => res.status(500).json({ error }));
  }
};

// SUPPRIMER UN UTILISATEUR
exports.deleteUser = (req, res, next) => {
  User.findOne({ where: { id: req.params.id } })
    .then((user) => {
      const filename = user.photo.split("/images/")[1];
      fs.unlink(`images/${filename}`, () => {
        User.destroy({ where: { id: req.params.id } })
          .then(() =>
            res.status(200).json({
              message: " tou-tou !! l'utilisateur a été syupprimé !! ",
            })
          )
          .catch((error) => res.status(400).json({ error }));
      });
    })
    .catch((error) => res.status(500).json({ error }));
};

// RECUPERATION DE TOUT LES UTILISATEURS
exports.getAllUser = (req, res, next) => {
  User.findAll({
    include: [
      {
        model: Post,
        attributes: ["id"],
      },
      {
        model: Comment,
        attributes: ["id"],
      },
    ],
  })
    .then((users) => res.status(200).json(users))
    .catch((error) => res.status(404).json({ error }));
};
