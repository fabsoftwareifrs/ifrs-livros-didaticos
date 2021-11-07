"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("copies", "status");
    await queryInterface.addColumn("copies", "external_code", {
      type: Sequelize.STRING,
      after: "code",
    });
    await queryInterface.addColumn("copies", "status_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: {
        model: "statuses",
        key: "id",
      },
      after: "external_code",
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("copies", "status_id");
    await queryInterface.removeColumn("copies", "external_code");
    await queryInterface.addColumn("copies", "status", {
      allowNull: false,
      type: Sequelize.STRING,
      defaultValue: "AVAILABLE",
      after: "code",
    });
  },
};
