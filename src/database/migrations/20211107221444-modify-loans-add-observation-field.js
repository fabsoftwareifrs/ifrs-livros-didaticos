"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("loans", "observation", {
      type: Sequelize.STRING,
      unique: true,
      after: "end",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("loans", "observation");
  },
};
