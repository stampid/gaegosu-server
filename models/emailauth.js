"use strict";
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
    {}
  );
  EmailAuth.associate = function(models) {
    // associations can be defined here
  };
  return EmailAuth;
};
