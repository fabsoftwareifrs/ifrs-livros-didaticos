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

import { Book, Category, Copy } from "@models";
import { Op } from "sequelize";

const copies = async () => {
  const copies = await Copy.findAll({
    include: [{ model: Book, include: { model: Category } }],
  });

  return copies;
};

const availableCopies = async () => {
  const copies = await Copy.findAll({
    include: [{ model: Book, include: { model: Category } }],
    where: { status: "AVAILABLE" },
  });

  return copies;
};

const copiesByBookId = async (_, { bookId, search }) => {
  const options = {
    include: [{ model: Book, include: { model: Category } }],
    where: { bookId },
  };
  if (search !== "") {
    options.where = {
      [Op.and]: [bookId, { code: { [Op.like]: "%" + search + "%" } }],
    };
  }
  const copies = await Copy.findAll(options);
  return copies;
};

const copy = async (_, { id }) => {
  const copy = await Copy.findByPk(id, {
    include: [{ model: Book, include: { model: Category } }],
  });

  if (!copy) throw new UserInputError("Registro não encontrado!");

  return copy;
};

export default { availableCopies, copies, copiesByBookId, copy };
