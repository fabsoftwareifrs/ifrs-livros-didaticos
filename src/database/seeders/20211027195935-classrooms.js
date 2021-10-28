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
    const courses = (
      await queryInterface.sequelize.query(`SELECT * FROM courses`)
    )[0];

    const classrooms = [
      {
        course: "Técnico em Administração",
        name: "1º ADMIN",
      },
      {
        course: "Técnico em Administração",
        name: "2º ADMIN",
      },
      {
        course: "Técnico em Administração",
        name: "3º ADMIN",
      },
      {
        course: "Técnico em Agropecuária",
        name: "1º AGRO A",
      },
      {
        course: "Técnico em Agropecuária",
        name: "1º AGRO B",
      },
      {
        course: "Técnico em Agropecuária",
        name: "2º AGRO A",
      },
      {
        course: "Técnico em Agropecuária",
        name: "2º AGRO B",
      },
      {
        course: "Técnico em Agropecuária",
        name: "3º AGRO A",
      },
      {
        course: "Técnico em Agropecuária",
        name: "3º AGRO B",
      },
      {
        course: "Técnico em Informática para Internet",
        name: "1º INFO",
      },
      {
        course: "Técnico em Informática para Internet",
        name: "2º INFO",
      },
      {
        course: "Técnico em Informática para Internet",
        name: "3º INFO",
      },
      {
        course: "Técnico em Meio Ambiente",
        name: "1º M. AMB",
      },
      {
        course: "Técnico em Meio Ambiente",
        name: "2º M. AMB",
      },
      {
        course: "Técnico em Meio Ambiente",
        name: "3º M. AMB",
      },
      {
        course: "Técnico em Viticultura e Enologia",
        name: "1º VIT",
      },
      {
        course: "Técnico em Viticultura e Enologia",
        name: "2º VIT",
      },
      {
        course: "Técnico em Viticultura e Enologia",
        name: "3º VIT",
      },
    ];

    return queryInterface.bulkInsert(
      "classes",
      classrooms.map(({ name, course }) => ({
        name,
        course_id: courses.find(({ name: courseName }) => courseName === course)
          .id,
        created_at: new Date(),
        updated_at: new Date(),
      }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("classes", null, {});
  },
};
