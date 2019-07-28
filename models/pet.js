"use strict";

module.exports = (sequelize, DataTypes) => {
  const Pet = sequelize.define(
    "Pet",
    {
      name: {
        allowNull: false,
        type: DataTypes.STRING(12)
      },
      animal: {
        allowNull: false,
        type: DataTypes.STRING
      },
      breeds: {
        allowNull: false,
        type: DataTypes.STRING
      },
      profileImage: {
        allowNull: false,
        type: DataTypes.STRING
      }
    },
    {}
  );
  Pet.associate = function(models) {
    // associations can be defined here
    Pet.belongsTo(models.User, { foreignKey: "owner" });
  };
  return Pet;
};
