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
  type Category {
    id:ID!
    name:String!
  }
  type Course {
    id:ID!
    name:String!
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

  type Book {
      id:ID!
      name:String!
      code:String!
      author:String!
      volume:String!
      quantity:Integer!
  }
  type Query {
    hello: String

    categories: [Category!]
    category(id:ID!): Category!

    courses: [Course!]
    course(id:ID!): Course!

    classes: [Classes!]
    class(id:ID!): Classes!

    students: [Students!]
    student(id:ID!): Students!
  }
  type Mutation {
    login(login: String!, password: String!): AuthResponse

    createBooks(name:String,code:String,author:String,volume:String,quantity:Integer!):Books!
    updateBooks(id: ID,name:String,code:String,author:String,volume:String,quantity:Integer!):Books!
    deleteBooks(id:ID!)

    createCategory(name:String!):Category!
    updateCategory(id:ID,name:String!):Category!
    deleteCategory(id:ID!): Boolean

    createCourse(name:String!):Course!
    updateCourse(id:ID,name:String!):Course!
    deleteCourse(id:ID!): Boolean

    createClass(name:String!, course_id:Int!):Classes!
    updateClass(id:ID,name:String!,course_id:Int!):Classes!
    deleteClass(id:ID!): Boolean

    createStudent(name:String!,email:String!,matriculation:String!,course_id:Int!,class_id:Int!):Students!
    updateStudent(id:ID,name:String!,email:String!,matriculation:String!,course_id:Int!,class_id:Int!):Students!
    deleteStudent(id:ID!): Boolean
  }
`