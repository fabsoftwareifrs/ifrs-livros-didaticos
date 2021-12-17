"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("classes", {
      fields: ["name"],
      type: "unique",
      name: "name",
    });
    await queryInterface.addConstraint("statuses", {
      fields: ["name"],
      type: "unique",
      name: "name",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("classes", "name");
    await queryInterface.removeConstraint("statuses", "name");
  },
};
