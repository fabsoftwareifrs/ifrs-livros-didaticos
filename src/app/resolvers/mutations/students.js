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

const { Student } = require("@models");

// Students
const createStudent = async (_, { input }) => {
  var student = await Student.create(input);

  student.Course = await student.getCourse();
  student.Classes = await student.getClass();

  return student;
};

const updateStudent = async (_, { id, input }) => {
  const student = await Student.findByPk(id);
  await student.update(input);
  student.Course = await student.getCourse();
  student.Classes = await student.getClass();
  return student;
};

const deleteStudent = async (_, { id }) => {
  const student = await Student.findByPk(id);
  await student.destroy();
  return student;
};

module.exports = { createStudent, updateStudent, deleteStudent };
