"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("courses", "external_code", {
      type: Sequelize.STRING,
      unique: true,
      after: "name",
    });
    await queryInterface.addColumn("classes", "external_code", {
      type: Sequelize.STRING,
      unique: true,
      after: "course_id",
    });
    await queryInterface.addColumn("categories", "external_code", {
      type: Sequelize.STRING,
      unique: true,
      after: "name",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("categories", "external_code");
    await queryInterface.removeColumn("classes", "external_code");
    await queryInterface.removeColumn("courses", "external_code");
  },
};
