const bcrypt = require('bcryptjs')

'use strict';


module.exports = {
  up: async (queryInterface, Sequelize) => {

    const password_hash = await bcrypt.hash('admin', 8)

    return queryInterface.bulkInsert('users', [{
      name: 'admin',
      login: 'admin@admin.com',
      password_hash,
      access_level: 1,
      created_at: new Date(),
      updated_at: new Date()
    }]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
