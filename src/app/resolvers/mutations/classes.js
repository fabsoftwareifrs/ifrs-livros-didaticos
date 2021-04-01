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

const { Classes } = require('@models')

// Classes
const createClass = async (_, { input }) => {
  var classe = await Classes.create(input)
  classe.Course = await classe.getCourse()
  return classe
}

const updateClass = async (_, { id, input }) => {
  const classe = await Classes.findByPk(id)
  await classe.update(input)
  classe.Course = await classe.getCourse()
  return classe
}
const deleteClass = async (_, { id }) => {
  const classe = await Classes.findByPk(id)
  classe.destroy()
  return classe
}

module.exports = { createClass, updateClass, deleteClass }
