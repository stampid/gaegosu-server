import crypto from "crypto";

("use strict");

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      nickName: {
        allowNull: false,
        type: DataTypes.STRING(12),
        unique: true
      },
      email: {
        allowNull: true,
        type: DataTypes.STRING,
        unique: true
      },
      password: {
        allowNull: true,
        type: DataTypes.STRING
      },
      profileImage: {
        allowNull: true,
        type: DataTypes.STRING
      },
      provider: {
        allowNull: true,
        type: DataTypes.STRING
      },
      admin: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      }
    },
    {
      hooks: {
        beforeCreate: data => {
          if (data.password.length) {
            const shasum = crypto.createHash("sha1");
            shasum.update(data.password);
            data.password = shasum.digest("hex");
          }
        },
        beforeFind: data => {
          if (data.where.password.length) {
            const shasum = crypto.createHash("sha1");
            shasum.update(data.where.password);
            data.where.password = shasum.digest("hex");
          }
        }
      }
    }
  );
  User.asshociate = function(models) {
    // associations can be defined here
    User.hasMany(models.Pet);
    User.hasMany(models.Board);
    User.hasMany(models.Comment);
    User.hasMany(models.Like);
    User.hasMany(models.Sos);
  };
  return User;
};
