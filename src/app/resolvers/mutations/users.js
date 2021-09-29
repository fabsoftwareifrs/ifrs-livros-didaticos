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

const createUser = async (_, { input }) => {
  const user = await User.create(input);
  return user;
};

const updateUser = async (_, { id, input }) => {
  const user = await User.findByPk(id);

  if (!user) throw new UserInputError("Registro não encontrado!");

  await user.update(input);

  return user;
};

const deleteUser = async (_, { id }) => {
  const user = await User.findByPk(id);

  if (!user) throw new UserInputError("Registro não encontrado!");

  await user.destroy();
  return user;
};

export default { createUser, updateUser, deleteUser };
