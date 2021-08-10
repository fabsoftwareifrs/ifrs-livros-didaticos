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

const { Book } = require("@models");

const createBook = async (_, { input }) => {
  const book = await Book.create(input);
  book.Category = await book.getCategory();
  return book;
};
const updateBook = async (_, { id, input }) => {
  const book = await Book.findByPk(id);
  await book.update(input);
  book.Category = await book.getCategory();
  return book;
};
const deleteBook = async (_, { id }) => {
  const book = await Book.findByPk(id);
  book.destroy();
  return book;
};

module.exports = { createBook, updateBook, deleteBook };
