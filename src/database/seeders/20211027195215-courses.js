/*
 * This file is part of LMS Livros Didáticos.
 *
 * LMS Livros Didáticos is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published by
 * the Free Software Foundation, either version 3 of the License.
 *
 * LMS Livros Didáticos is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with Foobar.  If not, see <https://www.gnu.org/licenses/>
 */

("use strict");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert("courses", [
      {
        name: "Técnico em Administração",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Técnico em Agropecuária",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Técnico em Informática para Internet",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Técnico em Meio Ambiente",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        name: "Técnico em Viticultura e Enologia",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("courses", null, {});
  },
};
