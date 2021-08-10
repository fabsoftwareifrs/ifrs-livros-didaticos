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
    await queryInterface.removeColumn("loans", "delivered");
    await queryInterface.removeColumn("loans", "user_id");
    await queryInterface.removeColumn("loans", "book_id");
    await queryInterface.addColumn("loans", "copy_id", {
      type: Sequelize.INTEGER,
      references: {
        model: "copies",
        key: "id",
      },
      after: "student_id",
    });

    await queryInterface.addColumn("loans", "start", {
      allowNull: false,
      type: Sequelize.DATEONLY,
      defaultValue: new Date(),
      after: "copy_id",
    });
    await queryInterface.addColumn("loans", "end", {
      allowNull: true,
      type: Sequelize.DATEONLY,
      after: "start",
    }); /**/
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("loans", "end");
    await queryInterface.removeColumn("loans", "start");
    await queryInterface.removeColumn("loans", "copy_id");
    await queryInterface.addColumn("loans", "delivered", {
      allowNull: false,
      type: Sequelize.BOOLEAN,
    });
    await queryInterface.addColumn("loans", "book_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: "books", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
    await queryInterface.addColumn("loans", "user_id", {
      allowNull: false,
      type: Sequelize.INTEGER,
      references: { model: "users", key: "id" },
      onUpdate: "CASCADE",
      onDelete: "CASCADE",
    });
  },
};
