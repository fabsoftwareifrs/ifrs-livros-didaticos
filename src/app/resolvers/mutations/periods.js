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

import { Period } from "@models";

const createPeriod = async (_, { input }) => {
  if (input.start > input.end) {
    throw new UserInputError("Data de início maior que data final.");
  }
  const period = await Period.create(input);
  return period;
};

const updatePeriod = async (_, { id, input }) => {
  if (input.start > input.end) {
    throw new UserInputError("Data de início maior que data final.");
  }
  const period = await Period.findByPk(id);

  if (!period) throw new UserInputError("Registro não encontrado!");

  await period.update(input);
  return period;
};

const deletePeriod = async (_, { id }) => {
  const period = await Period.findByPk(id);

  if (!period) throw new UserInputError("Registro não encontrado!");

  await period.destroy();
  return period;
};

export default { createPeriod, updatePeriod, deletePeriod };
