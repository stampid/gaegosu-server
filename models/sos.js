"use strict";

module.exports = (sequelize, DataTypes) => {
  const Sos = sequelize.define(
    "Sos",
    {
      locationX: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      locationY: {
        allowNull: false,
        type: DataTypes.FLOAT
      },
      content: {
        allowNull: false,
        type: DataTypes.STRING
      },
      animalType: {
        allowNull: false,
        type: DataTypes.STRING
      },
      status: {
        allowNull: false,
        type: DataTypes.BOOLEAN
      }
    },
    {}
  );
  Sos.associate = function(models) {
    // associations can be defined here
    Sos.belongsTo(models.Sos, { foreignKey: "creator" });
  };
  return Sos;
};
