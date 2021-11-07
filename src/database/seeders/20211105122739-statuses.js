"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "statuses",
      [
        {
          name: "Bom",
          description: "O exemplar está íntegro",
          is_available: true,
          is_default: true,
          created_at: new Date(),
          updated_at: new Date(),
        },
        {
          name: "Extraviado",
          description: "O exemplar não foi encontrado",
          is_available: false,
          is_default: false,
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("statuses", null, {});
  },
};
