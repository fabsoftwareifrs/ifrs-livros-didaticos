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
  scalar Date

  directive @isAuthorized(roles: [Int!]!) on FIELD_DEFINITION

  enum Role {
    ADMIN
  }

  enum Status {
    MISPLACED
    LOANED
    AVAILABLE
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type User {
    id: ID!
    name: String!
    lastName: String!
    login: String!
    accessLevel: Int!
  }

  type PaginateUser {
    docs: [User!]
    pages: Int!
    total: Int!
  }

  type Category {
    id: ID!
    name: String!
  }
  type Course {
    id: ID!
    name: String!
  }

  type PaginateCourse {
    docs: [Course!]
    pages: Int!
    total: Int!
  }

  type Loan {
    id: ID!
    start: Date!
    end: Date
    delivered: Boolean!
    late: Boolean!
    student: Student!
    copy: Copy!
    user: User!
    period: Period!
  }

  type PaginateLoans {
    docs: [Loan!]
    pages: Int!
    total: Int!
  }

  type Period {
    id: ID!
    name: String!
    start: Date!
    end: Date!
  }

  type PaginatePeriods {
    docs: [Period!]
    pages: Int!
    total: Int!
  }

  type Classes {
    id: ID!
    name: String!
    course: Course
  }

  type PaginateClasses {
    docs: [Classes!]
    pages: Int!
    total: Int!
  }

  type PaginateStudents {
    docs: [Student!]
    pages: Int!
    total: Int!
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    matriculation: String!
    course: Course!
    classes: Classes!
  }

  type Book {
    id: ID!
    name: String!
    author: String!
    volume: String!
    copies: [Copy!]!
    category: Category!
  }

  type Copy {
    id: ID!
    code: String!
    book: Book!
    status: Status!
  }

  type PaginateBook {
    docs: [Book!]
    pages: Int!
    total: Int!
  }
  type PaginateCategory {
    docs: [Category!]
    pages: Int!
    total: Int!
  }

  input BookInput {
    name: String
    author: String
    volume: String
  }

  input CopyInput {
    status: Status!
    bookId: Int!
  }

  input UserInput {
    name: String!
    login: String!
    password: String!
    accessLevel: Int!
  }

  input CourseInput {
    name: String!
  }

  input CategoryInput {
    name: String!
  }

  input ClassInput {
    name: String!
    courseId: Int!
  }

  input StudentInput {
    name: String!
    email: String!
    matriculation: String!
    courseId: Int!
    classId: Int!
  }

  input LoanInput {
    studentId: Int!
    copyId: Int!
    periodId: Int!
  }

  input PeriodInput {
    name: String!
    start: Date!
    end: Date!
  }

  input AuthInput {
    login: String!
    password: String!
  }

  type Query {
    hello: String

    paginateUsers(page: Int!, limit: Int!): PaginateUser!
    users: [User!]
    user(id: ID!): User!

    paginateBooks(page: Int!, limit: Int!): PaginateBook!
    books: [Book!]!
    book(id: ID!): Book!

    paginateCategories(page: Int!, limit: Int!): PaginateCategory!
    categories: [Category!]
    category(id: ID!): Category!

    paginateCourses(page: Int!, limit: Int!): PaginateCourse!
    courses: [Course!]
    course(id: ID!): Course!

    copies: [Copy!]!
    copiesByBookId(bookId: Int!): [Copy!]!

    paginateClasses(page: Int!, limit: Int!): PaginateClasses!
    classes: [Classes!]
    classRoom(id: ID!): Classes!

    paginateStudents(page: Int!, limit: Int!): PaginateStudents!
    students: [Student!]
    student(id: ID!): Student!

    paginateLoans(page: Int!, limit: Int!): PaginateLoans!
    loans: [Loan!]
    loan(id: ID!): Loan!

    paginatePeriods(page: Int!, limit: Int!): PaginatePeriods!
    periods: [Period!]
    period(id: ID!): Period!
  }

  type Mutation {
    login(input: AuthInput): AuthResponse

    mail(from: String!): Boolean! @isAuthorized(roles: [1])

    createUser(input: UserInput): User!
    updateUser(id: ID, input: UserInput): User! @isAuthorized(roles: [1])
    deleteUser(id: ID!): User! @isAuthorized(roles: [1])

    createBook(input: BookInput): Book!
    updateBook(id: ID, input: BookInput): Book! @isAuthorized(roles: [1])
    deleteBook(id: ID!): Book! @isAuthorized(roles: [1])

    createCopy(input: CopyInput): Copy!
    updateCopy(id: ID, input: CopyInput): Copy!
    deleteCopy(id: ID!): Copy!

    createCategory(input: CategoryInput): Category!
    updateCategory(id: ID, input: CategoryInput): Category!
      @isAuthorized(roles: [1])
    deleteCategory(id: ID!): Category! @isAuthorized(roles: [1])

    createCourse(input: CourseInput): Course!
    updateCourse(id: ID, input: CourseInput): Course! @isAuthorized(roles: [1])
    deleteCourse(id: ID!): Course! @isAuthorized(roles: [1])

    createClass(input: ClassInput): Classes!
    updateClass(id: ID, input: ClassInput): Classes! @isAuthorized(roles: [1])
    deleteClass(id: ID!): Classes! @isAuthorized(roles: [1])

    createStudent(input: StudentInput): Student!
    updateStudent(id: ID, input: StudentInput): Student!
      @isAuthorized(roles: [1])
    deleteStudent(id: ID!): Student! @isAuthorized(roles: [1])

    createLoan(input: LoanInput): Loan!
    updateLoan(id: ID!, input: LoanInput): Loan! @isAuthorized(roles: [1])
    deleteLoan(id: ID!): Loan! @isAuthorized(roles: [1])

    createPeriod(input: PeriodInput): Period!
    updatePeriod(id: ID, input: PeriodInput): Period! @isAuthorized(roles: [1])
    deletePeriod(id: ID!): Period! @isAuthorized(roles: [1])
  }
`
