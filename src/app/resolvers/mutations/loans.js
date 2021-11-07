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
import { Copy, Loan, Status, Sequelize } from "@models";

export const createLoan = async (_, { input }) => {
  const { copyId } = input;

  const copy = await Copy.findByPk(copyId, {
    include: [{ model: Status }],
  });

  if (copy.isLoaned) throw new Error("Esse exemplar já está emprestado!");

  if (!copy.Status.isAvailable)
    throw new Error("Esse exemplar não pode ser emprestado!");

  const loan = await Loan.create(input);
  loan.Student = await loan.getStudent();
  loan.Copy = await loan.getCopy();
  loan.Period = await loan.getPeriod();

  return loan;
};

export const updateLoan = async (_, { id, input }) => {
  const loan = await Loan.findByPk(id);

  if (!loan) throw new UserInputError("Registro não encontrado!");

  await loan.update(input);
  loan.Student = await loan.getStudent();
  loan.Copy = await loan.getCopy();
  loan.Period = await loan.getPeriod();
  return loan;
};

export const deleteLoan = async (_, { id }) => {
  const loan = await Loan.findByPk(id);

  if (!loan) throw new UserInputError("Registro não encontrado!");

  //loan.Copy = await loan.getCopy();
  //await loan.Copy.update({ status: Status.AVAILABLE });
  await loan.destroy();
  return loan;
};

export const terminateLoan = async (_, { id, input }) => {
  const loan = await Loan.findByPk(id);

  if (!loan) throw new UserInputError("Registro não encontrado!");

  await loan.update({ end: input.end || Sequelize.NOW() });
  loan.Student = await loan.getStudent();
  loan.Copy = await loan.getCopy();
  // await loan.Copy.update({ status: Status.AVAILABLE });
  loan.Period = await loan.getPeriod();
  return loan;
};

export const cancelTerminateLoan = async (_, { id }) => {
  const loan = await Loan.findByPk(id);

  if (!loan) throw new UserInputError("Registro não encontrado!");

  await loan.update({ end: null });
  loan.Student = await loan.getStudent();
  loan.Copy = await loan.getCopy();
  //await loan.Copy.update({ status: Status.LOANED });
  loan.Period = await loan.getPeriod();
  return loan;
};
