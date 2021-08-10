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

const { Classes, Course } = require("@models");
const { Op } = require("sequelize");

const paginateClasses = async (_, { input }) => {
  const options = {
    page: input.page,
    paginate: input.paginate,
    include: { model: Course },
    limit: [0 + (input.page - 1) * input.paginate, input.paginate * input.page],
  };
  if (input.search !== "") {
    options.where = {
      [Op.or]: [
        { name: { [Op.like]: "%" + input.search + "%" } },
        { "$Course.name$": { [Op.like]: "%" + input.search + "%" } },
      ],
    };
  }
  const classes = await Classes.findAndCountAll(options);
  return { docs: classes.rows, total: classes.count };
};
const classes = async () =>
  await Classes.findAll({ include: { model: Course } });
const classRoom = async (_, { id }) =>
  await Classes.findByPk(id, { include: { model: Course } });

module.exports = { classes, classRoom, paginateClasses };
