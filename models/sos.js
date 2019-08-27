"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sos = sequelize.define(
    "Sos",
    {
      creator: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      locationX: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      locationY: {
        allowNull: false,
        type: DataTypes.DOUBLE
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      },
      photo: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Sos.associate = function(models) {
    // associations can be defined here
    Sos.belongsTo(models.User, { foreignKey: "creator" });
  };
  return Sos;
};
