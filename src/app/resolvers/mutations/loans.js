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

const { Loan } = require('@models')

const createLoan = async (_, { input }) => {
  const loan = await Loan.create(input)
  loan.student = await loan.getStudent()
  loan.copy = await loan.getCopy()
  loan.period = await loan.getPeriod()
  console.log(loan.start)
  return loan
}

const updateLoan = async (_, { id, input }) => {
  const loan = await Loan.findByPk(id)
  await loan.update(input)
  loan.student = await loan.getStudent()
  loan.copy = await loan.getCopy()
  loan.period = await loan.getPeriod()
  return loan
}

const deleteLoan = async (_, { id }) => {
  const loan = await Loan.findByPk(id)
  await loan.destroy()
  return loan
}

module.exports = { createLoan, updateLoan, deleteLoan }
