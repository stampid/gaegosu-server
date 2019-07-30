"use strict";

module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define(
    "Comment",
    {
      creator: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      board: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
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
