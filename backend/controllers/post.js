const { Post } = require("../models");
const { User } = require("../models");
const { Like } = require("../models");
const { Comment } = require("../models");

// RECUPERATION DE TOUT LES POSTS
exports.getAllPost = (req, res, next) => {
  Post.findAll({
    include: [
      {
        model: User,
        attributes: ["pseudo", "photo", "id"],
      },
      {
        model: Comment,
        attributes: ["message", "UserId", "updatedAt"],
      },
      {
        model: Like,
      },
    ],
  })
    .then((post) => res.status(200).json(post))
    .catch((error) => res.status(404).json({ error }));
};

// CREATION D'UN POST ...
exports.createPost = (req, res, next) => {
  const test = req.file;

  if (test == null) {
    //...SANS IMAGE
    Post.create({
      UserId: req.body.UserId,
      message: req.body.message,
      video: req.body.video,
    })
      .then(() =>
        res.status(201).json({ message: "Le post a été créé sans image" })
      )
      .catch((error) => res.status(500).json({ error }));
  } else {
    Post.create({
      //...AVEC UNE IMAGE
      UserId: req.body.UserId,
      message: req.body.message,
      picture: `${req.protocol}://${req.get("host")}/images/${
        req.file.filename
      }`,
      video: req.body.video,
    })
      .then(() =>
        res.status(201).json({ message: "Le post a été créé avec une image" })
      )
      .catch((error) => res.status(500).json({ error }));
  }
};

//SUPPRESSION D'UN POST
exports.deletePost = (req, res, next) => {
  Post.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "post suprrimé" }))
    .catch((error) => res.status(400).json({ error }));
};

// RECUPERATION DES POSTS D'UN USER
exports.getPostByUserId = (req, res, next) => {
  Post.findAll({ where: { UserId: req.params.id } })
    .then((postId) => res.status(200).json(postId))
    .catch((error) => res.status(404).json({ error }));
};
