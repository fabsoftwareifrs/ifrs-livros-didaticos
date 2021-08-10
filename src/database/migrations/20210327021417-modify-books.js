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

"use strict";

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("books", "quantity");
    await queryInterface.removeColumn("books", "code");
    await queryInterface.addColumn("books", "category_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "categories",
        key: "id",
      },
      after: "volume",
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("books", "quantity", {
      type: Sequelize.INTEGER,
      after: "volume",
    });
    await queryInterface.addColumn("books", "code", {
      type: Sequelize.STRING,
      after: "quantity",
    });
    await queryInterface.removeColumn("books", "category_id");
  },
};
