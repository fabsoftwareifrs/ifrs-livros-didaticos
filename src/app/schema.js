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
    nome:String!
  }
  type Course {
    id:ID!
    name:String!
  }
  type Record {
    id:ID!
    student:String!
    book:String!
    user:String!
    bookStatus:String!
    recordType:String!
  }
  type Query {
    hello: String

    categories: [Category!]
    category(id:ID!): Category!

    courses: [Course!]
    course(id:ID!): Course!

    records: [Record!]
    record(id:ID!): Record!
  }
  type Mutation {
    login(login: String!, password: String!): AuthResponse

    createCategory(nome:String!):Category!
    updateCategory(id:ID,nome:String!):Category!
    deleteCategory(id:ID!): Boolean

    createCourse(name:String!): Course!
    updateCourse(id:ID,name:String!): Course!
    deleteCourse(id:ID!): Boolean

    createRecord(student:String!,book:String!,user:String!,bookStatus:String!,recordType:String!): Record!
    updateRecord(id:ID,student:String!,book:String!,user:String!,bookStatus:String!,recordType:String!): Record!
    deleteRecord(id:ID!): Boolean
  }
`