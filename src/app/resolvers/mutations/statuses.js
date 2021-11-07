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

import { Status } from "@models";

// Statuses
export const createStatus = async (_, { input }) => {
  console.log(input);
  const status = await Status.create(input);
  return status;
};

export const updateStatus = async (_, { id, input }) => {
  const status = await Status.findByPk(id);

  if (!status) throw new UserInputError("Registro não encontrado!");

  await status.update(input);
  return status;
};

export const deleteStatus = async (_, { id }) => {
  const status = await Status.findByPk(id);

  if (!status) throw new UserInputError("Registro não encontrado!");

  await status.destroy();
  return status;
};
