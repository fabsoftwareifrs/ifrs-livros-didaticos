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
import { Op } from "sequelize";

import { Book, Category, Copy, Status, Sequelize } from "@models";

export const copies = async () => {
  const copies = await Copy.findAll({
    include: [{ model: Book, include: { model: Category } }, { model: Status }],
  });

  return copies;
};

export const availableCopies = async (_, { search, selecteds }) => {
  const copies = await Copy.findAll({
    include: [
      { model: Book, include: { model: Category } },
      { model: Status, required: true, where: { isAvailable: true } },
    ],
    where: {
      [Op.or]: [
        {
          [Op.and]: [
            {
              id: {
                [Op.notIn]: Sequelize.literal(
                  `(SELECT copy_id from loans where end is null)`
                ),
              },
            },
            {
              code: {
                [Op.substring]: search,
              },
            },
          ],
        },
        {
          id: {
            [Op.in]: selecteds,
          },
        },
      ],
    },
    limit: 10 + selecteds.length,
  });

  return copies;
};

export const copiesByBookId = async (_, { bookId, search }) => {
  const options = {
    include: [{ model: Book, include: { model: Category } }, { model: Status }],
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

export const copy = async (_, { id }) => {
  if (id) {
    const copy = await Copy.findByPk(id, {
      include: [
        { model: Book, include: { model: Category } },
        { model: Status },
      ],
    });

    if (!copy) throw new UserInputError("Registro não encontrado!");

    return copy;
  }
};
