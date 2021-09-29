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
import { Op } from "sequelize";

const paginatePeriods = async (_, { input }) => {
  const options = {
    page: input.page,
    paginate: input.paginate,
  };
  if (input.search !== "") {
    options.where = { name: { [Op.like]: "%" + input.search + "%" } };
  }
  const period = await Period.paginate(options);
  return period;
};
const periods = async () => {
  const periods = await Period.findAll();
  return periods;
};

const period = async (_, { id }) => {
  const period = await Period.findByPk(id);

  if (!period) throw new UserInputError("Registro não encontrado!");

  return period;
};

export default { period, periods, paginatePeriods };
