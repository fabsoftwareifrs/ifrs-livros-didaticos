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

import { Book, Category } from "@models";
import { Op } from "sequelize";

const paginateBooks = async (_, { input }) => {
  const options = {
    page: input.page,
    paginate: input.paginate,
    include: { model: Category },
    limit: [0 + (input.page - 1) * input.paginate, input.paginate * input.page],
  };
  if (input.search !== "") {
    options.where = {
      [Op.or]: [
        { name: { [Op.like]: "%" + input.search + "%" } },
        { author: { [Op.like]: "%" + input.search + "%" } },
        { volume: { [Op.like]: "%" + input.search + "%" } },
        { "$Category.name$": { [Op.like]: "%" + input.search + "%" } },
      ],
    };
  }
  const book = await Book.findAndCountAll(options);
  return { docs: book.rows, total: book.count };
};

const books = async () => {
  const books = await Book.findAll({
    include: { model: Category },
  });

  return books;
};

const book = async (_, { id }) => {
  const book = await Book.findByPk(id, {
    include: { model: Category },
  });

  if (!book) throw new UserInputError("Registro não encontrado!");

  return book;
};

export default { paginateBooks, books, book };
