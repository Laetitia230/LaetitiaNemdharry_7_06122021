const { User } = require("../models");
const { Comment } = require("../models");

// RECUPERATION DE TOUT LES COMMENTAIRES
exports.getAllComment = async (req, res, next) => {
  await Comment.findAll({
    where: { PostId: req.params.id },
    include: {
      model: User,
      attributes: ["pseudo", "photo", "id"],
    },
  })
    .then((comment) => res.status(200).json(comment))
    .catch((error) => res.status(404).json({ error }));
};

// CREATION D'UN COMMENTAIRE
exports.createComment = (req, res) => {
  Comment.create({
    UserId: req.body.UserId,
    PostId: req.body.PostId,
    message: req.body.message,
  })
    .then(() => res.status(201).json({ message: "commentaire créé" }))
    .catch((error) => res.status(400).json({ error }));
};

// SUPPRESSION D'UN COMMENTAIRE
exports.deleteComment = async (req, res, next) => {
  await Comment.destroy({ where: { id: req.params.id } })
    .then(() => res.status(200).json({ message: "commentaire suprrimé" }))
    .catch((error) => res.status(400).json({ error }));
};
