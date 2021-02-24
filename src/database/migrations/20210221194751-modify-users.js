'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'login', {
      allowNull: false,
      type: Sequelize.STRING,
      unique: true
    });
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.changeColumn('users', 'login', {
      allowNull: false,
      type: Sequelize.STRING,
      unique: false
    });
  }
};
