const { Like, sequelize } = require("../models");
const { Post } = require("../models");
const { User } = require("../models");
const { QueryTypes } = require("sequelize");

// CREATION OU SUPPRESSION D'UN LIKE
exports.like = async (req, res, next) => {
  const { PostId } = req.body;
  const { UserId } = req.body;

  const foundLike = await Like.findOne({
    where: { PostId, UserId },
  });

  if (!foundLike) {
    Like.create({ PostId, UserId })
      .then(() => res.status(201).json({ message: "post liké" }))
      .catch((error) => res.status(500).json({ error }));
  } else {
    Like.destroy({ where: { PostId, UserId } })
      .then((like) => res.status(200).json({ message: "post disliké" }))
      .catch((error) => res.status(400).json({ error }));
  }

  Like.findAll({ where: { PostId } })
    .then((likes) => res.json({ like: likes.length }))
    .catch((error) => res.status(404).json({ error }));
};

// RECUPERATION DU COMPTEUR DE LIKE D'UN POST
exports.likeCounter = async (req, res, next) => {
  await Like.findAll({ where: { PostId: req.params.id } })
    .then((like) => res.status(200).json({ like: like.length }))
    .catch((error) => res.status(404).json({ error }));
};

// RECUPERATION DES POSTS LIKER PAR UN USER
exports.getLikeUserId = async (req, res, next) => {
  await sequelize
    .query(
      "SELECT u.id as user,l.id as like_id,p.message,p.id,p.picture,p.video,p.updatedAt,u.photo, u.pseudo FROM groupomania.likes as l INNER JOIN groupomania.posts as p ON l.PostId=p.id INNER JOIN groupomania.users as u ON u.id=p.UserId WHERE l.UserId=?",
      {
        replacements: [req.params.id],
        type: QueryTypes.SELECT,
      }
    )
    .then((like) => res.status(200).json(like))
    .catch((error) => res.status(404).json({ error }));
};
