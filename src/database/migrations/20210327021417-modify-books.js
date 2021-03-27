'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('books', 'quantity')
    await queryInterface.removeColumn('books', 'code')
    await queryInterface.addColumn('books', 'category_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'categories',
        key: 'id',
      },
      after: 'volume',
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn('books', 'quantity', {
      type: Sequelize.INTEGER,
      after: 'volume',
    })
    await queryInterface.addColumn('books', 'code', {
      type: Sequelize.STRING,
      after: 'quantity',
    })
    await queryInterface.removeColumn('books', 'category_id')
  },
}
