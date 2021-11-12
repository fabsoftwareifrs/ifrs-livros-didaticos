"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("loans", "observation");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("loans", {
      fields: ["observation"],
      type: "unique",
      name: "observation",
    });
  },
};
