"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      content: {
        allowNull: false,
        type: DataTypes.STRING
      },
      boardName: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Comment.associate = function(models) {
    Comment.belongsTo(models.Board, { foreignKey: "board" });
    Comment.belongsTo(models.User, { foreignKey: "creator" });
    // associations can be defined here
  };
  return Comment;
};
