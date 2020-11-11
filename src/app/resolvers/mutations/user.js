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

const { User } = require('@models')

let mutations = {
  
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
}

module.exports = { mutations }