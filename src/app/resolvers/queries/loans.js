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

import { Book, Copy, Loan, Period, Status, Student } from "@models";
import sequelize from "sequelize";
import { Op } from "sequelize";

export const paginateLoans = async (_, { input, late }) => {
  const options = {
    include: [
      { model: Student },
      { model: Copy, include: [{ model: Book }, { model: Status }] },
      { model: Period },
    ],
    limit: [0 + (input.page - 1) * input.paginate, input.paginate * input.page],
  };
  let where = {};
  let allWhere = {};
  if (late) {
    where = {
      [Op.and]: [
        { end: null },
        { "$Period.end$": { [Op.lt]: sequelize.fn("CURRENT_DATE") } },
      ],
    };
  } else {
    where = {
      [Op.or]: [
        { end: { [Op.ne]: null } },
        { "$Period.end$": { [Op.gt]: sequelize.fn("CURRENT_DATE") } },
      ],
    };
  }
  if (input.search !== "") {
    allWhere = {
      [Op.and]: [
        where,
        {
          [Op.or]: [
            { "$Period.name$": { [Op.like]: "%" + input.search + "%" } },
            { "$Copy.code$": { [Op.like]: "%" + input.search + "%" } },
            { "$Student.name$": { [Op.like]: "%" + input.search + "%" } },
          ],
        },
      ],
    };
  } else {
    allWhere = where;
  }

  options.where = allWhere;
  const loan = await Loan.findAndCountAll(options);
  return { docs: loan.rows, total: loan.count };
};

export const loans = async () => {
  const loans = await Loan.findAll({
    include: [{ model: Student }, { model: Copy }, { model: Period }],
  });

  return loans;
};

export const loan = async (_, { id }) => {
  const loan = await Loan.findByPk(id, {
    include: [
      { model: Student },
      { model: Period },
      { model: Copy, include: { model: Status } },
    ],
  });

  if (!loan) throw new UserInputError("Registro não encontrado!");

  return loan;
};

export const getAllLoansByPeriodId = async (
  _,
  { periodId, pagination, late }
) => {
  const { paginate, page } = pagination;

  let where = {};
  if (late) {
    where = {
      [Op.and]: [
        { end: null },
        { "$Period.end$": { [Op.lt]: sequelize.fn("CURRENT_DATE") } },
      ],
    };
  }

  const loan = await Loan.findAndCountAll({
    include: [
      { model: Student },
      { model: Copy, include: [{ model: Book }, { model: Status }] },
      { model: Period },
    ],
    limit: [0 + (page - 1) * paginate, paginate * page],
    where: {
      periodId,
      ...where,
    },
  });
  return { docs: loan.rows, total: loan.count };
};

export const getLoanByCode = async (_, { code }) => {
  const copy = await Copy.findOne({
    where: {
      code,
    },
  });

  if (!copy) throw new UserInputError("Registro não encontrado!");

  const loan = await Loan.findOne({
    include: [
      { model: Student },
      { model: Period },
      { model: Copy, include: [{ model: Status }, { model: Book }] },
    ],
    where: { copyId: copy.id, end: null },
  });

  if (!loan) throw new UserInputError("Este exemplar já foi devolvido!");

  return loan;
};
