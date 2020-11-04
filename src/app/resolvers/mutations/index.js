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

const {Category, Course, Loan} = require('../../models')

let mutations = {
  
  //Categories
  createCategory: async (_, {nome}) => {
    const category= await Category.create({nome})
    
    return(category)
  },
  updateCategory: async (_, {id,nome}) => {
    const category= await Category.findByPk(id)
    category.update({nome})
    return category 
  },
  deleteCategory: async (_, {id}) => {
    const category= await Category.findByPk(id)
    const {nome}=category
    category.destroy()
    return(true);
  },

  //Courses
  createCourse: async (_, {name}) => {
    const course= await Course.create({name})
    return(course)
  },
  updateCourse: async (_, {id,name}) => {
    const course= await Course.findByPk(id)
    course.update({name})
    return course 
  },
  deleteCourse: async (_, {id}) => {
    const course= await Course.findByPk(id)
    const {name}=course
    course.destroy()
    return(true);
  },

  //Loans
  createLoan: async (_, {withdrawDate, loanDays, delivered, deliveredDate, studentId, bookId, userId}) => {
    const loan= await Loan.create({ withdrawDate, loanDays, delivered, deliveredDate, studentId, bookId, userId })
    return(loan)
  },

  updateLoan: async (_, {id, withdrawDate, loanDays, delivered, deliveredDate, studentId, bookId, userId}) => {
    const loan= await Record.findByPk(id)
    loan.update({withdrawDate, loanDays, delivered, deliveredDate, studentId, bookId, userId})
    return loan 
  },

  deleteLoan: async (_, {id}) => {
    const loan= await Loan.findByPk(id)
    const {withdrawDate, loanDays, delivered, deliveredDate, studentId, bookId, userId}=loan
    loan.destroy()
    return(true);
  },

}

const modules = [
  require('./auth'),
  //require('./loan')        
]

modules.forEach((module) => {
  mutations = { ...mutations, ...module }
})

module.exports = { ...mutations }
