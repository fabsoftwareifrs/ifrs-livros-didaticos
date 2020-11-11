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

const { gql } = require('apollo-server-express')

module.exports = gql`
  type AuthResponse {
    token: String!
  }
  type User{
    id: ID!
    name: String!
    login: String!
    password: String
    accessLevel: Int!
  }
  type Category {
    id:ID!
    name:String!
  }
  type Course {
    id: ID!
    name: String!
  }
  type Loan {
    id: ID!
    withdrawDate: String!
    loanDays: Int!
    delivered: Boolean!
    deliveredDate: String
    studentId: Int!
    bookId: Int!
    userId: Int!
    students: Students!
    books: Book!
    users: User!
  }
  type Classes {
    id:ID!
    name:String!
    course_id:Int!
    courses:Course!
  }
  type Students {
    id:ID!
    name:String!
    email:String!
    matriculation:String!
    course_id:Int!
    class_id:Int!
    courses:Course!
    classes:Classes!
  }
  type Book {
    id:ID!
    name:String!
    code:String!
    author:String!
    volume:String!
    quantity:Int!
  }
  type Query {
    hello: String

    users: [User!]
    user(id:ID!): User!

    books: [Book!]
    book(id:ID!): Book!

    categories: [Category!]
    category(id:ID!): Category!

    courses: [Course!]
    course(id:ID!): Course!

    classes: [Classes!]
    class(id:ID!): Classes!

    students: [Students!]
    student(id:ID!): Students!

    loans: [Loan!]
    loan(id:ID!): Loan!
  }
  type Mutation {
    login(login: String!, password: String!): AuthResponse

    mail(from:String!):Boolean!

    createUser(name:String!,login:String!,password:String!,accessLevel:Int!):User!
    updateUser(id:ID,name:String!,login:String!,password:String!,accessLevel:Int!):User!
    deleteUser(id:ID!):Boolean
    
    createBook(name:String,code:String,author:String,volume:String,quantity:Int!):Book!
    updateBook(id: ID,name:String,code:String,author:String,volume:String,quantity:Int!):Book!
    deleteBook(id:ID!):Boolean

    createCategory(name:String!):Category!
    updateCategory(id:ID,name:String!):Category!
    deleteCategory(id:ID!): Boolean

    createCourse(name:String!): Course!
    updateCourse(id:ID,name:String!): Course!
    deleteCourse(id:ID!): Boolean

    createClass(name:String!, course_id:Int!):Classes!
    updateClass(id:ID,name:String!,course_id:Int!):Classes!
    deleteClass(id:ID!): Boolean

    createStudent(name:String!,email:String!,matriculation:String!,course_id:Int!,class_id:Int!):Students!
    updateStudent(id:ID,name:String!,email:String!,matriculation:String!,course_id:Int!,class_id:Int!):Students!
    deleteStudent(id:ID!): Boolean

    createLoan(withdrawDate:String!, loanDays:Int!, delivered:Boolean!, deliveredDate:String, studentId:Int!, bookId:Int!, userId:Int!): Loan!
    updateLoan(id:ID!, withdrawDate:String!, loanDays:Int!, delivered:Boolean!, deliveredDate:String!, studentId:Int!, bookId:Int!, userId:Int!): Loan!
    deleteLoan(id:ID!): Boolean
  }
`