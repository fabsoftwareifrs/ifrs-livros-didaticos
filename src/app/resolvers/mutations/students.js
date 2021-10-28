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

import { Classes, Course, Student, sequelize } from "@models";
import students from "../queries/students";

// Students
export const createStudent = async (_, { input }) => {
  var student = await Student.create(input);

  student.Course = await student.getCourse();
  student.Classes = await student.getClass();

  return student;
};

export const importStudents = async (_, { input }) => {
  const { file } = input;
  const { createReadStream, mimetype } = await file;

  if (!["application/vnd.ms-excel", "text/csv"].includes(mimetype))
    throw new UserInputError("Formato de arquivo inválido!");

  const students = await new Promise((resolve, reject) => {
    const students = [];
    const stream = createReadStream();
    stream
      .pipe(
        csvParser({
          headers: ["name", "email", "matriculation", "course", "class"],
          skipLines: 1,
          separator: ",",
        })
      )
      .on("error", (error) => reject(error))
      .on("data", (row) => students.push(row))
      .on("end", () => resolve(students));
  });

  console.log(students);

  return await sequelize.transaction(async (t) => {
    for (const student of students) {
      const { course: courseName, class: classroomName, ...rest } = student;

      const course = await Course.findOne({
        where: {
          name: courseName.trim().toUpperCase(),
        },
      });

      if (!course) throw new Error("Curso não encontrado!");

      const classRoom = await Classes.findOne({
        where: {
          name: classroomName.trim().toUpperCase(),
        },
      });

      if (!classRoom) throw new Error("Turma não encontrada!");

      await Student.create(
        {
          ...rest,
          courseId: course.id,
          classId: classRoom.id,
        },
        { transaction: t }
      );
    }
    return true;
  });
};

export const updateStudent = async (_, { id, input }) => {
  const student = await Student.findByPk(id);

  if (!student) throw new UserInputError("Registro não encontrado!");

  await student.update(input);
  student.Course = await student.getCourse();
  student.Classes = await student.getClass();
  return student;
};

export const deleteStudent = async (_, { id }) => {
  const student = await Student.findByPk(id);

  if (!student) throw new UserInputError("Registro não encontrado!");

  await student.destroy();
  return student;
};
