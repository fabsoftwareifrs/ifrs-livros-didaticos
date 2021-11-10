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

// Categories
const createCategory = async (_, { input }) => {
  const { teste, ...rest } = input;
  console.log(teste);
  const category = await Category.create(rest);
  return category;
};

const updateCategory = async (_, { id, input }) => {
  const category = await Category.findByPk(id);

  if (!category) throw new UserInputError("Registro não encontrado!");

  await category.update(input);
  return category;
};

const deleteCategory = async (_, { id }) => {
  const category = await Category.findByPk(id);

  if (!category) throw new UserInputError("Registro não encontrado!");

  await category.destroy();
  return category;
};

export default { createCategory, updateCategory, deleteCategory };
