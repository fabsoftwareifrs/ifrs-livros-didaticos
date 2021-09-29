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

import { User } from "@models";
import { Op } from "sequelize";

const paginateUsers = async (_, { input }) => {
  const options = {
    order: [["name", "ASC"]],
    page: input.page,
    paginate: input.paginate,
  };
  if (input.search !== "") {
    options.where = {
      [Op.or]: [
        { name: { [Op.like]: "%" + input.search + "%" } },
        { login: { [Op.like]: "%" + input.search + "%" } },
        { access_level: { [Op.like]: "%" + input.search + "%" } },
      ],
    };
  }
  const user = await User.paginate(options);
  return user;
};

const users = async () => {
  const users = await User.findAll();
  return users;
};

const user = async (_, { id }) => {
  const user = await User.findByPk(id);

  if (!user) throw new UserInputError("Registro não encontrado!");

  return user;
};

export default { user, users, paginateUsers };
