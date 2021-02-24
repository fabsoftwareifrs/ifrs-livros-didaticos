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

require('dotenv').config()
const { ApolloError } = require('apollo-server-express')

const { User } = require('@models')
const jwt = require('jsonwebtoken')


const getAuthenticatedUser = async (authorization) => {
  try {
    const token = authorization

    if (!token) return null

    const { id } = await jwt.verify(token, process.env.AUTH_SECRET)

    const user = await User.findOne({ where: { id } })
    return user
  } catch (e) {
    throw new ApolloError(e.message, 'JWT')
  }
}

module.exports = { getAuthenticatedUser }
