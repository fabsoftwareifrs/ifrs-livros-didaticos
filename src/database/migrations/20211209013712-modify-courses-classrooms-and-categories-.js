"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeConstraint("courses", "external_code");
    await queryInterface.removeConstraint("classes", "external_code");
    await queryInterface.removeConstraint("categories", "external_code");
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn("courses", "external_code", {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.changeColumn("classes", "external_code", {
      type: Sequelize.STRING,
      unique: true,
    });
    await queryInterface.changeColumn("categories", "external_code", {
      type: Sequelize.STRING,
      unique: true,
    });
  },
};
