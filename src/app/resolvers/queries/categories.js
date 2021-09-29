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

import { UserInputError } from "apollo-server-express";

import { Category } from "@models";
import { Op } from "sequelize";

const paginateCategories = async (_, { input }) => {
  const options = {
    order: [["name", "ASC"]],
    page: input.page,
    paginate: input.paginate,
  };
  if (input.search !== "") {
    options.where = { name: { [Op.like]: "%" + input.search + "%" } };
  }
  const category = await Category.paginate(options);
  return category;
};

const categories = async () => {
  const categories = await Category.findAll();
  return categories;
};

const category = async (_, { id }) => {
  const category = await Category.findByPk(id);

  if (!category) throw new UserInputError("Registro não encontrado!");

  return category;
};

export default { paginateCategories, categories, category };
