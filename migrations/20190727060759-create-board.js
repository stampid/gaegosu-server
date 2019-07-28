"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("Boards", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING(20)
      },
      content: {
        allowNull: true,
        type: Sequelize.STRING(100)
      },
      photo: {
        allowNull: true,
        type: Sequelize.STRING
      },
      creator: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      boardName: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Boards");
  }
};
