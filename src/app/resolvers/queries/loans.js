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

import { Loan, Student, Copy, Period, Book } from "@models";
import sequelize from "sequelize";
import { Op } from "sequelize";

const paginateLoans = async (_, { input, late }) => {
  const options = {
    include: [
      { model: Student },
      { model: Copy, include: { model: Book } },
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

const loans = async () => {
  const loans = await Loan.findAll({
    include: [{ model: Student }, { model: Copy }, { model: Period }],
  });

  return loans;
};

const loan = async (_, { id }) => {
  const loan = await Loan.findByPk(id, {
    include: [{ model: Student }, { model: Copy }, { model: Period }],
  });

  if (!loan) throw new UserInputError("Registro não encontrado!");

  return loan;
};

export default { loan, loans, paginateLoans };
