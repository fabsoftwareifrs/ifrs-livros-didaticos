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

const { Student } = require('@models')

let mutations = {
  
 //Students
 createStudent: async (_, {name, email, matriculation, course_id, class_id}) => {
  var student= await Student.create({name,email, matriculation, course_id, class_id})
  const {id}=student
  student= await Student.findByPk(id,{include:[{association: 'courses' },{association: 'classes' }]})
  return(student)
},
updateStudent: async (_,{id,name,email, matriculation, course_id, class_id}) => {
  const student= await Student.findByPk(id,{include:[{association: 'courses' },{association: 'classes' }]})
  student.update({name,email, matriculation, course_id, class_id})
  return student 
},
deleteStudent: async (_, {id}) => {
  const student= await Student.findByPk(id)
  student.destroy()
  return(true);
},

}

module.exports =  mutations 