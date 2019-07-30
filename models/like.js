"use strict";

module.exports = (sequelize, DataTypes) => {
  const Like = sequelize.define(
    "Like",
    {
      boardName: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Like.associate = function(models) {
    Like.belongsTo(models.User, { foreignKey: "user" });
    Like.belongsTo(models.Board, { foreignKey: "board" });
    // associations can be defined here
  };
  return Like;
};
