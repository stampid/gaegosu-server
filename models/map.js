"use strict";
module.exports = (sequelize, DataTypes) => {
  const Map = sequelize.define(
    "Map",
    {
      title: {
        allowNull: false,
        type: DataTypes.STRING
      },
      roadAddress: {
        allowNull: false,
        type: DataTypes.STRING
      },
      phone: {
        allowNull: false,
        type: DataTypes.STRING
      },
      locationX: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      locationY: {
        allowNull: false,
        type: DataTypes.DOUBLE
      }
    },
    {}
  );
  Map.associate = function(models) {
    // associations can be defined here
  };
  return Map;
};
