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

const {Category, Course, Classes, Student, Books, Loan, User} = require('../../models')
const {sendMessage}= require('./contacts')
let mutations = {
  //Mail
  mail: async (_, { from }) => {
    const mail= await sendMessage(_,{from})
    return mail
  },

  //Users
  createUser: async (_, {name, login, password, accessLevel}) => {
    const user= await User.create({ name, login, password, accessLevel })
    return(user)
  },

  updateUser: async (_, {id, name, login, password, accessLevel}) => {
    const user= await User.findByPk(id)
    user.update({name, login, password, accessLevel})
    return user 
  },

  deleteUser: async (_, {id}) => {
    const user= await User.findByPk(id)
    const {name, login, password, accessLevel}=user
    user.destroy()
    return(true);
  },

  //Books
  createBook: async (_, {name,code,author,volume,quantity}) => {
    const book = await Books.create({name,code,author,volume,quantity})
    return(book)
  },
  updateBook: async (_, {id,name,code,author,volume,quantity}) => {
    const book = await Books.findByPk(id)
    category.update({name,code,author,volume,quantity})
    return book
  },
  deleteBook: async (_, {id}) => {
    const book = await Books.findByPk(id)
    book.destroy()
    return(true);
  },
  
  //Categories
  createCategory: async (_, {name}) => {
    const category = await Category.create({name})
    return(category)
  },
  updateCategory: async (_, {id,name}) => {
    const category = await Category.findByPk(id)
    category.update({name})
    return category 
  },
  deleteCategory: async (_, {id}) => {
    const category = await Category.findByPk(id)
    const {name} = category
    category.destroy()
    return(true);
  },

  //Courses
  createCourse: async (_, {name}) => {
    const course = await Course.create({name})
    return(course)
  },
  updateCourse: async (_, {id,name}) => {
    const course = await Course.findByPk(id)
    course.update({name})
    return course 
  },
  deleteCourse: async (_, {id}) => {
    const course = await Course.findByPk(id)
    const {name} = course
    course.destroy()
    return(true);
  },

  //Classes
  createClass: async (_, {name,course_id}) => {
    var classe= await Classes.create({name,course_id})
    const {id}=classe
    classe= await Classes.findByPk(id,{include:{association: 'courses' }})
    return(classe)
  },
  updateClass: async (_,{id,name,course_id}) => {
    const classe= await Classes.findByPk(id,{include:{association: 'courses' }})
    classe.update({name,course_id})
    return classe 
  },
  deleteClass: async (_, {id}) => {
    const classe= await Classes.findByPk(id)
    classe.destroy()
    return(true);
  },

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
  //require('./user'),
  //require('./loan')        
]

modules.forEach((module) => {
  mutations = { ...mutations, ...module }
})

module.exports = { ...mutations }
