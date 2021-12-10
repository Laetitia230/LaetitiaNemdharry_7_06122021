"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      // UN USER PEUT AVOIR PLUSIEUR POST, COMMENT ET LIKE
      models.User.hasMany(models.Post);
      models.User.hasMany(models.Comment);
      models.User.hasMany(models.Like);
    }
  }
  User.init(
    {
      email: { type: DataTypes.STRING, allowNull: false, unique: true },
      pseudo: { type: DataTypes.STRING, allowNull: false, unique: true },
      password: { type: DataTypes.STRING, allowNull: false },
      photo: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue:
          "https://thumbs.dreamstime.com/b/%C3%ADcone-do-avatar-s%C3%ADmbolo-liso-isolado-no-branco-124920496.jpg",
      },
      bio: { type: DataTypes.STRING(500), allowNull: true },
      isAdmin: { type: DataTypes.STRING, allowNull: true },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
