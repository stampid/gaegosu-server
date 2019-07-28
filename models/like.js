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
    Like.belongsTo(models.User, { foreignKey: "userId" });
    Like.belongsTo(models.Board, { foreignKey: "boardsId" });
    // associations can be defined here
  };
  return Like;
};
