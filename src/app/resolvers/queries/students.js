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

const { Student, Course, Classes } = require("@models");
const { Op } = require("sequelize");

const paginateStudents = async (_, { input }) => {
  const options = {
    order: [["name", "ASC"]],
    page: input.page,
    paginate: input.paginate,
    include: [{ model: Course }, { model: Classes }],
    limit: [0 + (input.page - 1) * input.paginate, input.paginate * input.page],
  };
  if (input.search !== "") {
    options.where = {
      [Op.or]: [
        { name: { [Op.like]: "%" + input.search + "%" } },
        { email: { [Op.like]: "%" + input.search + "%" } },
        { matriculation: { [Op.like]: "%" + input.search + "%" } },
        { "$Course.name$": { [Op.like]: "%" + input.search + "%" } },
        { "$Class.name$": { [Op.like]: "%" + input.search + "%" } },
      ],
    };
  }
  const student = await Student.findAndCountAll(options);
  return { docs: student.rows, total: student.count };
};
const students = async () =>
  await Student.findAll({
    include: [{ model: Course }, { model: Classes }],
  });
const student = async (_, { id }) =>
  await Student.findByPk(id, {
    include: [{ model: Course }, { model: Classes }],
  });

module.exports = { students, student, paginateStudents };
