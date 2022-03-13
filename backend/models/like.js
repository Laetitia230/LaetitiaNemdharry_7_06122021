"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      models.Like.belongsTo(models.User, {
        // FONCTION QUI RELIS LE MODEL LIKE AU MODEL USER, MAIS AUSSI A LA SUPPRESSION EN CASCADE
        foreignKey: {
          allowNull: false,
        },
        onDelete: "CASCADE",
      }),
        models.Like.belongsTo(models.Post, {
          // FONCTION QUI RELIS LE MODEL LIKE AU MODEL POST, MAIS AUSSI A LA SUPPRESSION EN CASCADE
          foreignKey: {
            allowNull: false,
          },
          onDelete: "CASCADE",
        });
    }
  }
  Like.init(
    {},
    {
      sequelize,
      modelName: "Like",
    }
  );
  return Like;
};
