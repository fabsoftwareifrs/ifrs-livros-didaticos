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
directive @isAuthorized(roles: [Int!]) on FIELD_DEFINITION

  

  type AuthResponse {
    token: String!
    user:User!
  }
  type User{
    id: ID!
    name: String!
    lastName: String!
    login: String!
    accessLevel: Int!
  }
  type PaginateUser {
    docs:[User!]
    pages:Int!
    total:Int!
  }
  type Category {
    id:ID!
    name:String!
  }
  type Course {
    id: ID!
    name: String!
  }
  type PaginateCourse {
    docs:[Course!]
    pages:Int!
    total:Int!
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
  type PaginateBook {
    docs:[Book!]
    pages:Int!
    total:Int!
  }
  type PaginateCategory {
    docs:[Category!]
    pages:Int!
    total:Int!
  }
  
  type Query {
    hello: String

    paginateUsers(page:Int!,limit:Int!): PaginateUser!
    users: [User!]
    user(id:ID!): User!

    paginateBooks(page:Int!,limit:Int!): PaginateBook!
    books: [Book!]
    book(id:ID!): Book!

    paginateCategories(page:Int!,limit:Int!): PaginateCategory!
    categories: [Category!]
    category(id:ID!): Category!

    paginateCourses(page:Int!,limit:Int!): PaginateCourse!
    courses: [Course!]
    course(id:ID!): Course!

    classes: [Classes!]
    classRoom(id:ID!): Classes!

    students: [Students!]
    student(id:ID!): Students!

    loans: [Loan!]
    loan(id:ID!): Loan!

  }

  type Mutation {
    login(login: String!, password: String!): AuthResponse 

    mail(from:String!):Boolean! @isAuthorized(roles: [1])

    createUser(name:String!,login:String!,password:String!,accessLevel:Int!):User! @isAuthorized(roles: [1])
    updateUser(id:ID,name:String!,login:String!,password:String,accessLevel:Int!):User! @isAuthorized(roles: [1])
    deleteUser(id:ID!):Boolean @isAuthorized(roles: [1])

    createBook(name:String,code:String,author:String,volume:String,quantity:Int!):Book! @isAuthorized(roles: [1])
    updateBook(id: ID,name:String,code:String,author:String,volume:String,quantity:Int!):Book! @isAuthorized(roles: [1])
    deleteBook(id:ID!):Boolean @isAuthorized(roles: [1])

    createCategory(name:String!):Category! @isAuthorized(roles: [1])
    updateCategory(id:ID,name:String!):Category! @isAuthorized(roles: [1])
    deleteCategory(id:ID!): Boolean @isAuthorized(roles: [1])

    createCourse(name:String!): Course! @isAuthorized(roles: [1])
    updateCourse(id:ID,name:String!): Course! @isAuthorized(roles: [1])
    deleteCourse(id:ID!): Boolean @isAuthorized(roles: [1])

    createClass(name:String!, course_id:Int!):Classes! @isAuthorized(roles: [1])
    updateClass(id:ID,name:String!,course_id:Int!):Classes! @isAuthorized(roles: [1])
    deleteClass(id:ID!): Boolean @isAuthorized(roles: [1])

    createStudent(name:String!,email:String!,matriculation:String!,course_id:Int!,class_id:Int!):Students! @isAuthorized(roles: [1])
    updateStudent(id:ID,name:String!,email:String!,matriculation:String!,course_id:Int!,class_id:Int!):Students! @isAuthorized(roles: [1])
    deleteStudent(id:ID!): Boolean @isAuthorized(roles: [1])

    createLoan(withdrawDate:String!, loanDays:Int!, delivered:Boolean!, deliveredDate:String, studentId:Int!, bookId:Int!, userId:Int!): Loan! @isAuthorized(roles: [1])
    updateLoan(id:ID!, withdrawDate:String!, loanDays:Int!, delivered:Boolean!, deliveredDate:String!, studentId:Int!, bookId:Int!, userId:Int!): Loan! @isAuthorized(roles: [1])
    deleteLoan(id:ID!): Boolean @isAuthorized(roles: [1])


  }
`
