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

const {Category, Course,Classes,Student} = require("../../models")



let queries = {
  categories: ()=> Category.findAll(),
  category: (_, {id}) => Category.findByPk(id),

  courses: ()=> Course.findAll(),
  course: (_, {id}) => Course.findByPk(id),

  classes: ()=> Classes.findAll({include:{association: 'courses' }}),
  class: (_, {id}) => Classes.findByPk(id,{include:{association: 'courses' }}),

  students: ()=> Student.findAll({include:[{association: 'courses' },{association: 'classes' }]}),
  student: (_, {id}) => Student.findByPk(id,{include:[{association: 'courses' },{association: 'classes' }]}),
}

const modules = []

modules.forEach((module) => {
  queries = { ...queries, ...module }
})

module.exports = { ...queries }
