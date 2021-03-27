'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('periods', 'start', {
      type: Sequelize.DATEONLY,
    })
    await queryInterface.changeColumn('periods', 'end', {
      type: Sequelize.DATEONLY,
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('periods', 'start', {
      type: Sequelize.DATE,
    })
    await queryInterface.changeColumn('periods', 'end', {
      type: Sequelize.DATE,
    })
  },
}
