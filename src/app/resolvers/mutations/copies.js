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

import { Copy } from "@models";

const createCopy = async (_, { input }) => {
  const copy = await Copy.create(input);
  return copy;
};

const updateCopy = async (_, { id, input }) => {
  const copy = await Copy.findByPk(id);

  if (!copy) throw new UserInputError("Registro não encontrado!");

  await copy.update(input);
  return copy;
};

const deleteCopy = async (_, { id }) => {
  const copy = await Copy.findByPk(id);

  if (!copy) throw new UserInputError("Registro não encontrado!");

  await copy.destroy();
  return copy;
};

export default { createCopy, updateCopy, deleteCopy };
