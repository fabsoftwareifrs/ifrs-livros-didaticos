"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("books", "year", {
      allowNull: true,
      type: Sequelize.INTEGER,
      after: "category_id",
    });
    await queryInterface.addColumn("books", "isbn", {
      allowNull: true,
      type: Sequelize.STRING,
      after: "year",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("books", "isbn");
    await queryInterface.removeColumn("books", "year");
  },
};
