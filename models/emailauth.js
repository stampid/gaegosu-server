import crypto from "crypto";

("use strict");

module.exports = (sequelize, DataTypes) => {
  const EmailAuth = sequelize.define(
    "EmailAuth",
    {
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      randomWord: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {
      hooks: {
        beforeCreate: (data, option) => {
          const shasum = crypto.createHash("sha1");
          shasum.update(data.email);
          data.email = shasum.digest("hex");
        },
        beforeFind: (data, option) => {
          const shasum = crypto.createHash("sha1");
          shasum.update(data.where.email);
          data.where.email = shasum.digest("hex");
        },
        beforeBulkDestroy: (data, option) => {
          const shasum = crypto.createHash("sha1");
          shasum.update(data.where.email);
          data.where.email = shasum.digest("hex");
        }
      }
    }
  );
  EmailAuth.associate = function(models) {
    // associations can be defined here
  };
  return EmailAuth;
};
