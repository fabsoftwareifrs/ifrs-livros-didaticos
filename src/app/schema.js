/*---------------------------------------------------------------------------------------------
 *  Copyright (c) 2020 Fábrica de Sotware IFRS. All rights reserved.
 *  Licensed under the MIT License. See LICENSE in the project root for license information.
 *--------------------------------------------------------------------------------------------*/

const { gql } = require('apollo-server-express')

module.exports = gql`
  type AuthResponse {
    token: String!
  }
  type Category {
    id:ID!
    nome:String!
  }
  type Query {
    hello: String
    categories: [Category!]
    category(id:ID!): Category!
  }
  type Mutation {
    login(login: String!, password: String!): AuthResponse
    createCategory(nome:String!):Category!
    updateCategory(id:ID,nome:String!):Category!
    deleteCategory(id:ID!): Boolean
  }
`