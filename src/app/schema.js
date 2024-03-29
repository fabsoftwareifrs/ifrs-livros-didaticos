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

import { gql } from "apollo-server-express";

export default gql`
  scalar Date
  scalar Upload

  directive @isAuthorized(roles: [Int!]!) on FIELD_DEFINITION

  enum Role {
    ADMIN
  }

  enum Status {
    MISPLACED
    LOANED
    AVAILABLE
  }

  interface Authentication {
    token: String!
  }

  interface Login {
    email: String!
    password: String!
  }

  type Auth implements Authentication {
    token: String!
    user: User
    role: Role!
  }

  type AuthResponse {
    token: String!
    user: User!
  }

  type Book {
    id: ID!
    name: String!
    author: String!
    volume: String!
    year: Int
    isbn: String
    category: Category!
  }

  type Category {
    id: ID!
    name: String!
    externalCode: String
  }

  type Classes {
    id: ID!
    name: String!
    course: Course!
    externalCode: String
  }

  type Copy {
    id: ID!
    code: String!
    book: Book!
    Status: Status!
    isLoaned: Boolean!
  }

  type Course {
    id: ID!
    name: String!
    externalCode: String
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
    observation: String
  }

  type Period {
    id: ID!
    name: String!
    start: Date!
    end: Date!
  }

  type Status {
    id: ID!
    name: String!
    description: String
    isAvailable: Boolean!
    isDefault: Boolean!
  }

  type Student {
    id: ID!
    name: String!
    email: String!
    matriculation: String!
    course: Course!
    classes: Classes!
  }

  type User {
    id: ID!
    name: String!
    login: String!
    accessLevel: Int!
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

  type PaginateClasses {
    docs: [Classes!]
    pages: Int!
    total: Int!
  }

  type PaginateCourse {
    docs: [Course!]
    pages: Int!
    total: Int!
  }

  type PaginateLoans {
    docs: [Loan!]
    pages: Int!
    total: Int!
  }

  type PaginatePeriods {
    docs: [Period!]
    pages: Int!
    total: Int!
  }

  type PaginateStatuses {
    docs: [Status!]
    pages: Int!
    total: Int!
  }

  type PaginateStudents {
    docs: [Student!]
    pages: Int!
    total: Int!
  }

  type PaginateUser {
    docs: [User!]
    pages: Int!
    total: Int!
  }

  type mailResponse {
    response: String!
  }

  input AuthInput {
    login: String!
    password: String!
  }

  input BookInput {
    name: String
    author: String
    volume: String
    year: Int
    isbn: String
    categoryId: Int
    quantity: Int
  }

  input BookImportInput {
    file: Upload!
  }

  input TesteInput {
    code: String
  }

  input CategoryInput {
    name: String!
    externalCode: String
    teste: [TesteInput]
  }

  input ClassInput {
    name: String!
    courseId: Int!
    externalCode: String
  }

  input CopyInput {
    bookId: Int!
    statusId: Int
  }

  input CourseInput {
    name: String!
    externalCode: String
  }

  input LoanInput {
    studentId: Int!
    copiesIds: [String!]
    periodId: Int!
  }

  input PeriodInput {
    name: String!
    start: Date!
    end: Date!
  }

  input StatusInput {
    name: String!
    description: String
    isAvailable: Boolean!
    isDefault: Boolean!
  }

  input StudentInput {
    name: String!
    email: String!
    matriculation: String!
    courseId: Int!
    classId: Int!
  }

  input StudentImportInput {
    file: Upload!
  }

  input UserInput {
    name: String!
    login: String!
    password: String!
    accessLevel: Int!
  }

  input PaginateInput {
    page: Int!
    paginate: Int!
    search: String!
  }

  input TerminateLoanInput {
    end: Date
    statusId: Int!
    observation: String
  }

  type Query {
    hello: String

    paginateBooks(input: PaginateInput!): PaginateBook!
    books: [Book!]
    book(id: ID!): Book!

    paginateCategories(input: PaginateInput!): PaginateCategory!
    categories: [Category!]
    category(id: ID!): Category!

    paginateClasses(input: PaginateInput!): PaginateClasses!
    classes: [Classes!]
    classesByCourseId(courseId: Int!): [Classes!]!
    classRoom(id: ID!): Classes!

    copies: [Copy!]!
    availableCopies(search: String, selecteds: [String]): [Copy!]!
    copiesByBookId(bookId: Int!, search: String!): [Copy!]!
    copy(id: ID!): Copy!

    paginateCourses(input: PaginateInput!): PaginateCourse!
    courses: [Course!]
    course(id: ID!): Course!

    paginateLoans(
      periodId: Int!
      input: PaginateInput!
      late: Boolean!
    ): PaginateLoans!
    loans: [Loan!]
    loan(id: ID!): Loan!
    getAllLoansByPeriodId(
      periodId: Int!
      pagination: PaginateInput!
      late: Boolean = false
    ): PaginateLoans!

    getLoanByCode(code: String!): Loan!

    paginatePeriods(input: PaginateInput!): PaginatePeriods!
    periods: [Period!]
    period(id: ID!): Period!

    paginateStatuses(input: PaginateInput!): PaginateStatuses!
    getAllStatuses: [Status!]!
    getStatusById(id: ID!): Status!

    paginateStudents(input: PaginateInput!): PaginateStudents!
    searchStudents(search: String, selected: String): [Student!]!
    students: [Student!]
    student(id: ID!): Student!

    paginateUsers(input: PaginateInput!): PaginateUser!
    users: [User!]
    user(id: ID!): User!
  }

  type Mutation {
    login(input: AuthInput): AuthResponse

    warnMail(loans: [Int]!): mailResponse! @isAuthorized(roles: [1])

    lateMail(loans: [Int]!): mailResponse! @isAuthorized(roles: [1])

    createUser(input: UserInput): User! @isAuthorized(roles: [1])
    updateUser(id: ID, input: UserInput): User! @isAuthorized(roles: [1])
    deleteUser(id: ID!): User! @isAuthorized(roles: [1])

    createBook(input: BookInput): Book! @isAuthorized(roles: [1])
    importBooks(input: BookImportInput): Boolean! @isAuthorized(roles: [1])
    updateBook(id: ID, input: BookInput): Book! @isAuthorized(roles: [1])
    deleteBook(id: ID!): Book! @isAuthorized(roles: [1])

    createCategory(input: CategoryInput): Category! @isAuthorized(roles: [1])
    updateCategory(id: ID, input: CategoryInput): Category!
      @isAuthorized(roles: [1])
    deleteCategory(id: ID!): Category! @isAuthorized(roles: [1])

    createClass(input: ClassInput): Classes! @isAuthorized(roles: [1])
    updateClass(id: ID, input: ClassInput): Classes! @isAuthorized(roles: [1])
    deleteClass(id: ID!): Classes! @isAuthorized(roles: [1])

    createCopy(input: CopyInput): Copy! @isAuthorized(roles: [1])
    updateCopy(id: ID, input: CopyInput): Copy! @isAuthorized(roles: [1])
    deleteCopy(id: ID!): Copy! @isAuthorized(roles: [1])

    createCourse(input: CourseInput): Course! @isAuthorized(roles: [1])
    updateCourse(id: ID, input: CourseInput): Course! @isAuthorized(roles: [1])
    deleteCourse(id: ID!): Course! @isAuthorized(roles: [1])

    createLoan(input: LoanInput): [Loan]! @isAuthorized(roles: [1])
    deleteLoan(id: ID!): Loan! @isAuthorized(roles: [1])
    terminateLoan(id: ID!, input: TerminateLoanInput): Loan!
      @isAuthorized(roles: [1])
    cancelTerminateLoan(id: ID!): Loan! @isAuthorized(roles: [1])

    createPeriod(input: PeriodInput): Period! @isAuthorized(roles: [1])
    updatePeriod(id: ID, input: PeriodInput): Period! @isAuthorized(roles: [1])
    deletePeriod(id: ID!): Period! @isAuthorized(roles: [1])

    createStatus(input: StatusInput): Status! @isAuthorized(roles: [1])
    updateStatus(id: ID, input: StatusInput): Status! @isAuthorized(roles: [1])
    deleteStatus(id: ID!): Status! @isAuthorized(roles: [1])

    createStudent(input: StudentInput): Student! @isAuthorized(roles: [1])
    importStudents(input: StudentImportInput): Boolean!
      @isAuthorized(roles: [1])
    updateStudent(id: ID, input: StudentInput): Student!
      @isAuthorized(roles: [1])
    deleteStudent(id: ID!): Student! @isAuthorized(roles: [1])
  }
`;
