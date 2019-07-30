"use strict";

module.exports = (sequelize, DataTypes) => {
  const Board = sequelize.define(
    "Board",
    {
      creator: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      title: {
        allowNull: false,
        type: DataTypes.STRING(20)
      },
      content: {
        allowNull: true,
        type: DataTypes.STRING(100)
      },
      photo: {
        allowNull: true,
        type: DataTypes.STRING
      },
      boardName: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Board.associate = function(models) {
    // associations can be defined here
    Board.belongsTo(models.User, { foreignKey: "creator" });
    Board.hasMany(models.Comment);
    Board.hasMany(models.Like);
  };
  return Board;
};
