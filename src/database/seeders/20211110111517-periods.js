"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "periods",
      [
        {
          name: "2021",
          start: "2021-07-10 08:12:32",
          end: "2022-02-20 00:00:00",
          created_at: new Date(),
          updated_at: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("periods", null, {});
  },
};
