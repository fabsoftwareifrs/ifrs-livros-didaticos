'use strict'

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('loans', 'delivered')
    await queryInterface.removeColumn('loans', 'user_id')
    await queryInterface.removeColumn('loans', 'book_id')
    await queryInterface.addColumn('loans', 'copy_id', {
      type: Sequelize.INTEGER,
      references: {
        model: 'copies',
        key: 'id',
      },
      after: 'student_id',
    })

    await queryInterface.addColumn('loans', 'start', {
      allowNull: false,
      type: Sequelize.DATEONLY,
      defaultValue: new Date(),
      after: 'copy_id',
    })
    await queryInterface.addColumn('loans', 'end', {
      allowNull: true,
      type: Sequelize.DATEONLY,
      after: 'start',
    }) /**/
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn('loans', 'end')
    await queryInterface.removeColumn('loans', 'start')
    await queryInterface.removeColumn('loans', 'copy_id')
    await queryInterface.addColumn('loans', 'delivered', {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    })
    await queryInterface.addColumn('loans', 'book_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'books', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
    await queryInterface.addColumn('loans', 'user_id', {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: 'users', key: 'id' },
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    })
  },
}
