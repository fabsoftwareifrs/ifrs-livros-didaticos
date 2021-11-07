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
import { Op } from "sequelize";

// Statuses
export const createStatus = async (_, { input }) => {
  const { isDefault } = input;

  if (isDefault) {
    const found = await Status.findOne({
      where: { isDefault: true },
    });

    if (found) await found.update({ isDefault: false });
  }

  const status = await Status.create(input);
  return status;
};

export const updateStatus = async (_, { id, input }) => {
  const { isDefault } = input;

  const status = await Status.findByPk(id);
  if (!status) throw new UserInputError("Registro não encontrado!");

  if (isDefault) {
    const found = await Status.findOne({
      where: { isDefault: true, id: { [Op.not]: id } },
    });

    if (found) await found.update({ isDefault: false });
  }

  await status.update(input);
  return status;
};

export const deleteStatus = async (_, { id }) => {
  const status = await Status.findByPk(id);

  if (!status) throw new UserInputError("Registro não encontrado!");

  if (status.isDefault)
    throw new UserInputError(
      "Você não pode remover o estado padrão! Defina outro estado como padrão!"
    );

  await status.destroy();
  return status;
};
