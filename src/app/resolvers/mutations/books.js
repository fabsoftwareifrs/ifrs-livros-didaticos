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
import csvParser from "csv-parser";

import { Book, Category, Copy, sequelize } from "@models";

export const createBook = async (_, { input }) => {
  const { quantity, ...rest } = input;
  const book = await Book.create(rest);

  const status = await Status.findOne({ where: { isDefault: true } });
  if (!status)
    throw new Error("É necessário cadastrar um estado padrão para o exemplar!");

  if (quantity && quantity > 0) {
    for (let i = 0; i < quantity; i++) {
      await Copy.create({
        statusId: status.id,
        bookId: book.id,
      });
    }
  }

  book.Category = await book.getCategory();
  return book;
};

export const importBooks = async (_, { input }) => {
  const { file } = input;
  const { createReadStream, mimetype } = await file;

  if (!["application/vnd.ms-excel", "text/csv"].includes(mimetype))
    throw new UserInputError("Formato de arquivo inválido!");

  const books = await new Promise((resolve, reject) => {
    const books = [];
    const stream = createReadStream();
    stream
      .pipe(
        csvParser({
          headers: ["name", "author", "volume", "category"],
          skipLines: 1,
          separator: ",",
        })
      )
      .on("error", (error) => reject(error))
      .on("data", (row) => books.push(row))
      .on("end", () => resolve(books));
  });

  return await sequelize.transaction(async (t) => {
    for (const book of books) {
      const { category: categoryName, ...rest } = book;

      const category = await Category.findOne({
        where: {
          name: categoryName.trim().toUpperCase(),
        },
      });

      if (!category) throw new Error("Categoria não encontrada!");

      await Book.create(
        {
          ...rest,
          categoryId: category.id,
        },
        { transaction: t }
      );
    }
    return true;
  });
};

export const updateBook = async (_, { id, input }) => {
  const book = await Book.findByPk(id);

  if (!book) throw new UserInputError("Registro não encontrado!");

  await book.update(input);
  book.Category = await book.getCategory();

  return book;
};

export const deleteBook = async (_, { id }) => {
  const book = await Book.findByPk(id);

  if (!book) throw new UserInputError("Registro não encontrado!");

  await book.destroy();
  return book;
};
