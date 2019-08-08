"use strict";
module.exports = (sequelize, DataTypes) => {
  const Rate = sequelize.define(
    "Rate",
    {
      hospital: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      user: {
        allowNull: false,
        type: DataTypes.INTEGER
      },
      rating: {
        allowNull: false,
        type: DataTypes.INTEGER
      }
    },
    {}
  );
  Rate.associate = function(models) {
    // associations can be defined here
    Rate.belongsTo(models.User, { foreignKey: "user" });
    Rate.belongsTo(models.Map, { foreignKey: "hospital" });
  };
  return Rate;
};
