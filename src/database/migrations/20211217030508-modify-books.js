"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addConstraint("books", {
      fields: ["isbn"],
      type: "unique",
      name: "isbn",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("books", "isbn");
  },
};
