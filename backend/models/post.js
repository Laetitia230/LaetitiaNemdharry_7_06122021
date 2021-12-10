"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Post extends Model {
    static associate(models) {
      models.Post.belongsTo(models.User, {
        // FONCTION QUI RELIS LE MODEL POST AU MODEL USER, MAIS AUSSI A LA SUPPRESSION EN CASCADE
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      });
      models.Post.hasMany(models.Comment);
      models.Post.hasMany(models.Like);
    }
  }
  Post.init(
    {
      message: { type: DataTypes.STRING, allowNull: false },
      picture: { type: DataTypes.STRING, allowNull: true },
      video: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "Post",
    }
  );
  return Post;
};
