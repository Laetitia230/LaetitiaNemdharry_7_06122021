"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comment extends Model {
    static associate(models) {
      models.Comment.belongsTo(models.User, {
        // FONCTION QUI RELIS LE MODEL COMMENT AU MODEL USER, MAIS AUSSI A LA SUPPRESSION EN CASCADE
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Comment.belongsTo(models.Post, {
          // FONCTION QUI RELIS LE MODEL COMMENT AU MODEL POST, MAIS AUSSI A LA SUPPRESSION EN CASCADE
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        });
    }
  }
  Comment.init(
    {
      message: { type: DataTypes.STRING, allowNull: false },
    },
    {
      sequelize,
      modelName: "Comment",
    }
  );
  return Comment;
};
