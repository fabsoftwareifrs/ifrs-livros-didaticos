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

const { Loan, Sequelize } = require('@models')

const createLoan = async (_, { input }) => {
  const loan = await Loan.create(input)
  loan.Student = await loan.getStudent()
  loan.Copy = await loan.getCopy()
  loan.Period = await loan.getPeriod()
  return loan
}

const updateLoan = async (_, { id, input }) => {
  const loan = await Loan.findByPk(id)
  await loan.update(input)
  loan.Student = await loan.getStudent()
  loan.Copy = await loan.getCopy()
  loan.Period = await loan.getPeriod()
  return loan
}

const deleteLoan = async (_, { id }) => {
  const loan = await Loan.findByPk(id)
  await loan.destroy()
  return loan
}

const terminateLoan = async (_, { id, input }) => {
  const loan = await Loan.findByPk(id)
  await loan.update({ end: input.end || Sequelize.NOW() })
  loan.Student = await loan.getStudent()
  loan.Copy = await loan.getCopy()
  loan.Period = await loan.getPeriod()
  return loan
}

const cancelTerminateLoan = async (_, { id }) => {
  const loan = await Loan.findByPk(id)
  await loan.update({ end: null })
  loan.Student = await loan.getStudent()
  loan.Copy = await loan.getCopy()
  loan.Period = await loan.getPeriod()
  return loan
}

module.exports = {
  createLoan,
  updateLoan,
  deleteLoan,
  terminateLoan,
  cancelTerminateLoan,
}
